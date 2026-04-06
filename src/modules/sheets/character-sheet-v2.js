// src/modules/sheets/character-sheet-v2.js
// Purpose: Defines helper or exported constant `getNum`.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { TEMPLATES_PATH, SYSTEM_NAME } from "../constants.js";
import { BaseActorSheetV2 } from "./base-actor-sheet-v2.js";
import { LayoutRegistry } from "../layout/layout-registry.js";
import { EDGE_POOL_GROUPS } from "../constants.js";
import { openTokenStatusDialog } from "../dialog/token-status-dialog.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import {
  evaluateActorLifeModules,
  getLifeModuleCatalogEntry,
  getLifeModuleGrantSelectionFields,
  getLifeModuleTypeLabel,
  listLifeModuleCatalogEntriesByType,
  normalizeLifeModuleItemSystem,
} from "../mwd/life-modules.js";
import {
  buildSkillDisplay,
  getOwnedSkillSpecializationKeys,
  getStoredSkillSpecializationKeys,
  getSkillSpecializationDefs,
  normalizeStoredSkillSpecializationKeys,
} from "../mwd/skills.js";
import { notifyRollError } from "../roll/roll-errors.js";
import {
  getQualityCategoryLabel,
  getQualityTierLabel,
  normalizeQualityTraitSystem,
} from "../mwd/traits.js";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function stripHtml(value) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toSnippet(value, max = 180) {
  const plain = stripHtml(value);
  if (!plain) return "";
  if (plain.length <= max) return plain;
  return `${plain.slice(0, Math.max(0, max - 3)).trim()}...`;
}

function compactList(values = []) {
  return values
    .map(value => String(value ?? "").trim())
    .filter(Boolean);
}

function buildSummaryStats(stats = []) {
  return stats
    .filter(stat => stat && stat.value !== undefined && stat.value !== null && String(stat.value).trim() !== "")
    .map(stat => ({
      label: String(stat.label ?? "").trim(),
      value: String(stat.value ?? "").trim(),
      emphasis: stat.emphasis ?? ""
    }));
}

function buildDetailTags(tags = []) {
  return compactList(tags).map(label => ({ label }));
}

function buildDetailRows(rows = []) {
  return rows
    .filter(row => row && row.value !== undefined && row.value !== null && String(row.value).trim() !== "")
    .map(row => ({
      label: String(row.label ?? "").trim(),
      value: String(row.value ?? "").trim()
    }));
}

const ARMOR_MODIFIER_LABELS = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical",
};

const GEAR_CATEGORY_LABELS = {
  audiovisual: "Audiovisual Gear",
  communication: "Communication Gear",
  computing: "Computing Gear",
  espionage: "Espionage Gear",
  hostileEnvironment: "Hostile Environment Gear",
  medical: "Medical Gear",
  optical: "Optical Gear",
  power: "Power Gear",
  repairSalvage: "Repair/Salvage Gear",
  survival: "Survival Gear",
  surveillance: "Surveillance Gear",
};

function formatSignedValue(value) {
  const numeric = Number(value ?? 0) || 0;
  return numeric > 0 ? `+${numeric}` : `${numeric}`;
}

function buildArmorModifierSummary({ defenseBonus = 0, mitigationByType = {} } = {}) {
  const summary = [];
  const defense = Number(defenseBonus ?? 0) || 0;
  if (defense !== 0) summary.push(`Defense ${formatSignedValue(defense)}`);

  for (const [key, label] of Object.entries(ARMOR_MODIFIER_LABELS)) {
    const value = Number(mitigationByType?.[key] ?? 0) || 0;
    if (value !== 0) summary.push(`${label} ${formatSignedValue(value)}`);
  }

  return summary.join(" | ");
}

function formatBandValues(bands = {}, order = ["close", "near", "far", "extreme"]) {
  return order
    .map(key => {
      const value = toNumber(bands?.[key], 0);
      return `${key.charAt(0).toUpperCase() + key.slice(1)} ${value}`;
    })
    .join(" | ");
}

function formatCompactBandValues(bands = {}) {
  return ["close", "near", "far", "extreme"]
    .map(key => `${key.charAt(0).toUpperCase()}${toNumber(bands?.[key], 0)}`)
    .join(" ");
}

function formatRangeBandLabel(rangeKey = "") {
  const value = String(rangeKey ?? "").trim().toLowerCase();
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function promptSelectOption({ title, label, options = [], confirmLabel = "Select" } = {}) {
  const choices = Array.isArray(options) ? options.filter(option => option?.value) : [];
  if (!choices.length) return "";
  if (choices.length === 1) return String(choices[0].value ?? "").trim();

  const content = `<form class="mwd-quick-select"><div class="mwd-field"><label>${escapeHtml(label)}</label><select name="selection">${choices.map(option => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label ?? option.value)}</option>`).join("")}</select></div></form>`;
  return await Dialog.prompt({
    title,
    content,
    label: confirmLabel,
    callback: html => String(html.find('select[name="selection"]').val() ?? choices[0]?.value ?? "").trim()
  });
}

export class CharacterSheetV2 extends BaseActorSheetV2 {
  #openCombatMenuId = null;
  #combatMenuOutsideHandler = null;
  #pendingScrollRestore = null;
  #expandedInventoryRows = new Set();

  static PARTS = {
    sheet: {
      get template() {
        return `${TEMPLATES_PATH}/v2/actor/character-sheet.hbs`;
      },
    }

  };

  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ["character-sheet", SYSTEM_NAME, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
    window: { minWidth: 450, minHeight: 740, resizable: true},
    position: { width: 980, height: 900 },
    actions: { 
      ...super.DEFAULT_OPTIONS.actions,
      edgeSet: CharacterSheetV2.prototype._onEdgeSet,
      toggleCombatMenu: CharacterSheetV2.prototype._onToggleCombatMenu,
      toggleStatuses: CharacterSheetV2.prototype._onToggleStatuses,
      combatSpend: CharacterSheetV2.prototype._onCombatSpend,
      combatReduceBurn: CharacterSheetV2.prototype._onCombatReduceBurn,
      combatOverloadCheck: CharacterSheetV2.prototype._onCombatOverloadCheck,
      combatAttack: CharacterSheetV2.prototype._onCombatAttack,
      createOwnedItem: CharacterSheetV2.prototype._onCreateOwnedItem,
      addSkillSpecialization: CharacterSheetV2.prototype._onAddSkillSpecialization,
      removeSkillSpecialization: CharacterSheetV2.prototype._onRemoveSkillSpecialization,
      createLifeModuleItem: CharacterSheetV2.prototype._onCreateLifeModuleItem,
      editOwnedItem: CharacterSheetV2.prototype._onEditOwnedItem,
      deleteOwnedItem: CharacterSheetV2.prototype._onDeleteOwnedItem,
      toggleInventoryAccordion: CharacterSheetV2.prototype._onToggleInventoryAccordion,
      toggleOwnedItemEquipped: CharacterSheetV2.prototype._onToggleOwnedItemEquipped,
      setOwnedItemPrimary: CharacterSheetV2.prototype._onSetOwnedItemPrimary,
      adjustGearQuantity: CharacterSheetV2.prototype._onAdjustGearQuantity,
      attackWeapon: CharacterSheetV2.prototype._onAttackWeapon
    }
  });

    /** @override */
  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    const sheetToken = this.getSheetTokenDocument?.() ?? null;
    ctx._mwdThemeClass = game.system.mwd.styles.selectCssClass();
    ctx.layout = await LayoutRegistry.get("character");

    // Character-only Edge console context
    const cap = this.actor.getEdgeCap?.() ?? Number(this.actor.system?.attributes?.edge?.value ?? 0);
    const editable = !!this.isEditable;

    const GROUP_LABELS = { physical: "Physical", mental: "Mental", social: "Social" };
        const POOL_LABELS = {
          grit: "Grit",
          insight: "Insight",
          legend: "Legend",
          chaos: "Chaos",
          rumor: "Rumor",
          credibility: "Credibility"
        };

    // Use actor helper to get grouped pools in canonical order
    const summary = this.actor.getEdgePoolSummary
      ? this.actor.getEdgePoolSummary({ groups: EDGE_POOL_GROUPS })
      : { cap, hasPools: false, groups: [], pools: [] };

    // Build a render-ready console model
   ctx.edgeConsole = {
      cap,
      editable,
      capPips: Array.from({ length: Math.max(0, cap) }, (_, i) => i + 1),
      groups: (summary.groups ?? []).map(g => ({
        id: g.id,
        label: GROUP_LABELS[g.id] ?? g.id,
        pools: (g.pools ?? []).map(p => {
          const value = Number(p.effectiveValue ?? 0);
          const max = Number(p.effectiveMax ?? 0);

          // Precompute pip buttons so HBS needs no math helpers and never calls range() with bad args
          const pips = Array.from({ length: Math.max(0, max) }, (_, i) => {
            const n = i + 1;
            return { n, filled: n <= value };
          });
          
          const shortKey = String(p.key ?? "").split(".").pop();

          return {
            key: p.key,
            label: POOL_LABELS[shortKey] ?? shortKey ?? p.key,
            value,
            max,
            rating: Number(p.rating ?? 0),
            ratingBonus: Number(p.ratingBonus ?? 0),
            effectiveRating: Number(p.effectiveRating ?? p.rating ?? 0),
            isCapped: Number(p.effectiveRating ?? p.rating ?? 0) > Number(p.cap ?? cap),
            pips,

            // Paths for edit-mode inputs
            pathRating: `system.counters.edgePools.${p.key}.rating`,
            pathValue: `system.counters.edgePools.${p.key}.value`,

            // Keep the roll payload if you want pool-name click to route through BaseActorSheetV2 roll handler
            roll: JSON.stringify({ intent: "edge", pool: p.key })
          };
        })
      }))
    };
    // Interleaved 3x2 render order:
    // [Grit][Insight][Legend]
    // [Chaos][Rumor][Credibility]
    const order = ["grit", "insight", "legend", "chaos", "rumor", "credibility"];

    const poolByShortKey = new Map();
    for (const g of ctx.edgeConsole.groups ?? []) {
      for (const p of g.pools ?? []) {
        const shortKey = String(p.key ?? "").split(".").pop(); // grit/chaos/...
        if (shortKey) poolByShortKey.set(shortKey, p);
        p.domain = g.id;
      }
    }

ctx.edgeConsole.poolsOrdered = order
  .map(k => poolByShortKey.get(k))
  .filter(Boolean);


    /* -------------------------------------------- */
    /* Condition Monitors (character)               */
    /* -------------------------------------------- */
    const sys = this.actor.system ?? {};
    const monitors = sys.monitors ?? {};

    const TRACKS = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue",  label: "Fatigue",  kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor",    label: "Armor",    kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ];

    const getNum = (obj, path, d = 0) => {
      const v = foundry.utils.getProperty(obj, path);
      const n = Number(v);
      return Number.isFinite(n) ? n : d;
    };

    ctx.conditionMonitors = TRACKS.map(t => {
      const m = monitors?.[t.id] ?? {};
      const max = Math.max(0, getNum(m, "max", 0));
      const value = Math.min(Math.max(0, getNum(m, "value", 0)), max);

      return {
        id: t.id,
        label: t.label,
        kind: t.kind,
        editable: !!this.isEditable,
        value,
        max,
        segments: Array.from({ length: max }, (_, i) => {
          const n = i + 1;
          return { value: n, filled: n <= value };
        }),
        status: t.status
          ? { label: t.status.label, value: getNum(m, t.status.path, 0) }
          : null
      };
    });
    const burn = Number(this.actor.system?.burn?.value ?? 0);
    const burnDisplayMax = 10;
    const burnThreshold = 6;
    const burnFilled = Math.min(burn, burnDisplayMax);

    ctx.burnOverflow = Math.max(0, burn - burnDisplayMax);
    ctx.burnPenalty = Math.floor(burn / 2);
    ctx.burnPips = Array.from({ length: burnDisplayMax }, (_, i) => {
      const pipValue = i + 1;
      return {
        pipValue,
        filled: pipValue <= burnFilled,
        threshold: pipValue === burnThreshold
      };
    });

    ctx.combat = {
      roll: {
        initiative: JSON.stringify({ intent: "initiative" }),
        overload: JSON.stringify({ intent: "overload" })
      }
    };

    ctx.burn = {
      value: burn,
      penalty: Math.floor(burn / 2),
      overflow: Math.max(0, burn - 10),
      canOverloadCheck: burn >= 6,
      overloaded: !!this.actor.system?.burn?.overloaded
    };

    const combatSnapshot = PersonalCombatTracker.getSnapshot(this.actor, { token: sheetToken });
    ctx.combatDashboard = {
      targeting: combatSnapshot.targeting,
      rollImpact: combatSnapshot.rollImpact,
      states: combatSnapshot.states,
      effects: combatSnapshot.effects,
      activation: combatSnapshot.activation,
      inactiveReason: combatSnapshot.inactiveReason
    };

    const combatActions = PersonalCombatTracker.buildActionModel(this.actor, combatSnapshot);
    const menuIds = new Set((combatActions.menus ?? []).map(menu => menu.id));
    if (this.#openCombatMenuId && !menuIds.has(this.#openCombatMenuId)) {
      this.#openCombatMenuId = null;
    }

    ctx.combatActions = {
      ...combatActions,
      menus: (combatActions.menus ?? []).map(menu => ({
        ...menu,
        isOpen: menu.id === this.#openCombatMenuId
      }))
    };

    const loadout = this.actor.getPersonalCombatLoadout?.() ?? null;
    ctx.personalInventory = {
      warnings: [...(loadout?.warnings ?? [])],
      weapons: (loadout?.weapons ?? []).map(weapon => {
        const accordionId = this.#inventoryAccordionId("weapons", weapon.id);
        const usesPayloads = String(weapon?.category ?? "").trim().toLowerCase() !== "melee";
        const payloadTracked = Boolean(weapon?.sourceState?.isTracked);
        const payloadName = String(weapon?.payloadLabel ?? "").trim() || "Unloaded";
        const payloadCount = usesPayloads && payloadTracked
          ? `${toNumber(weapon?.sourceState?.current, 0)}/${toNumber(weapon?.sourceState?.max, 0)}`
          : "";
        const payloadDetail = usesPayloads
          ? (payloadTracked ? `${payloadName} ${payloadCount}` : payloadName)
          : "";
        const payloadTag = usesPayloads
          ? (payloadTracked ? `Payload ${payloadCount}` : `Payload ${payloadName}`)
          : "";
        const cqBands = formatBandValues(weapon.attackRatingBand);
        const cqBandsCompact = formatCompactBandValues(weapon.attackRatingBand);
        const detailRows = buildDetailRows([
          { label: "Skill", value: weapon.skillDef?.label ?? weapon.skill ?? "" },
          { label: "Category", value: weapon.category ?? "" },
          { label: "Damage Type", value: weapon.damageTypeLabel ?? weapon.damageType ?? "" },
          { label: "Max Range", value: formatRangeBandLabel(weapon.range?.max ?? weapon.defaultRangeBand ?? "") },
          { label: "CQ Bands", value: cqBands },
          { label: "Payload", value: payloadDetail },
          { label: "Traits", value: compactList(weapon.traits ?? []).join(", ") }
        ]);

        return {
          id: weapon.id,
          accordionId,
          isExpanded: this.#expandedInventoryRows.has(accordionId),
          name: weapon.name,
          img: weapon.img,
          subtitle: weapon.skillDef?.label ?? weapon.category ?? "",
          summaryStats: buildSummaryStats([
            { label: "DV", value: toNumber(weapon.damage, 0), emphasis: "strong" },
            { label: "AP", value: toNumber(weapon.ap, 0) },
            { label: "Type", value: weapon.damageTypeLabel ?? weapon.damageType ?? "" },
            { label: "CQ", value: cqBandsCompact }
          ]),
          detailTags: buildDetailTags([
            weapon.equipped ? "Equipped" : "",
            weapon.isPrimary ? "Primary" : "",
            payloadTag,
            ...compactList(weapon.traits ?? [])
          ]),
          detailRows,
          detailText: toSnippet(weapon.notes),
          equipped: !!weapon.equipped,
          isPrimary: !!weapon.isPrimary,
          attackRoll: JSON.stringify({
            intent: "attack",
            weaponId: weapon.id,
            payloadId: weapon?.payloadState?.activePayloadId ?? "",
            edge: { pool: "physical.grit", allowed: ["pre", "post"] },
            tags: ["combat", "attack"]
          })
        };
      }),
      armor: (loadout?.armor ?? []).map(armor => {
        const activeArmor = loadout?.activeArmor?.id === armor.id ? loadout.activeArmor : null;
        const accordionId = this.#inventoryAccordionId("armor", armor.id);
        const reinforcedMax = toNumber(activeArmor?.traitState?.reinforced?.max ?? armor?.traitState?.reinforced?.max, 0);
        const reinforcedLabel = reinforcedMax > 0
          ? `${toNumber(activeArmor?.traitState?.reinforced?.current ?? armor?.traitState?.reinforced?.current, 0)}/${reinforcedMax}`
          : "";
        const modifierSummary = buildArmorModifierSummary({
          defenseBonus: armor.defenseBonus,
          mitigationByType: activeArmor?.mitigationByType ?? activeArmor?.typedMitigation ?? armor.mitigationByType ?? {}
        });

        return {
          id: armor.id,
          accordionId,
          isExpanded: this.#expandedInventoryRows.has(accordionId),
          name: armor.name,
          img: armor.img,
          subtitle: armor.tags?.length ? armor.tags.join(", ") : "Armor",
          summaryStats: buildSummaryStats([
            { label: "Rating", value: toNumber(activeArmor?.ratingCurrent ?? armor.rating, 0), emphasis: "strong" },
            { label: "Res", value: toNumber(activeArmor?.baseMitigation ?? activeArmor?.baseResistance, 0) },
            { label: "Def", value: toNumber(armor.defenseBonus, 0) },
            { label: "Dur", value: `${toNumber(activeArmor?.durability?.current ?? armor.durability?.current, 0)}/${toNumber(activeArmor?.durability?.max ?? armor.durability?.max, 0)}` }
          ]),
          detailTags: buildDetailTags([
            armor.equipped ? "Equipped" : "",
            armor.isPrimary ? "Primary" : "",
            reinforcedLabel ? `Reinforced ${reinforcedLabel}` : "",
            ...compactList(armor.traits ?? [])
          ]),
          detailRows: buildDetailRows([
            { label: "Modifiers", value: modifierSummary },
            { label: "Traits", value: compactList(armor.traits ?? []).join(", ") },
            { label: "Tags", value: compactList(armor.tags ?? []).join(", ") }
          ]),
          detailText: toSnippet(armor.notes),
          equipped: !!armor.equipped,
          isPrimary: !!armor.isPrimary,
        };
      }),
      gear: (ctx.items?.gear ?? []).map(item => {
        const accordionId = this.#inventoryAccordionId("gear", item.id);
        const quantity = Math.max(0, Math.trunc(toNumber(item.system?.quantity ?? 1, 1)));
        const rating = Math.max(0, Math.trunc(toNumber(item.system?.rating ?? 0, 0)));
        const tags = compactList(item.system?.tags ?? []);
        const category = String(item.system?.category ?? "").trim();
        const categoryLabel = GEAR_CATEGORY_LABELS[category] ?? category;
        return {
          id: item.id,
          itemType: "gear",
          isGear: true,
          accordionId,
          isExpanded: this.#expandedInventoryRows.has(accordionId),
          name: item.name,
          img: item.img,
          subtitle: categoryLabel || "Gear",
          summaryStats: buildSummaryStats([
            { label: "Qty", value: quantity, emphasis: "strong" },
            { label: "Rating", value: rating }
          ]),
          detailTags: buildDetailTags([
            ...tags,
            item.system?.inactive ? "Inactive" : ""
          ]),
          detailRows: buildDetailRows([
            { label: "Quantity", value: quantity },
            { label: "Rating", value: rating },
            { label: "Source", value: item.system?.sourceReference ?? "" },
            { label: "Category", value: categoryLabel },
            { label: "Tags", value: tags.join(", ") }
          ]),
          detailText: toSnippet(item.system?.description),
          quantity,
          canAdjustQuantity: this.isEditable
        };
      })
    };

    /* -------------------------------------------- */
    /* Bio                                          */
    /* -------------------------------------------- */

    ctx.bio = {
      faction:         sys.biography?.faction         ?? "",
      age:             sys.biography?.age             ?? "",
      rank:            sys.biography?.rank            ?? "",
      height:          sys.biography?.height          ?? "",
      weight:          sys.biography?.weight          ?? "",
      xpTotal:         sys.counters?.xp?.total        ?? 0,
      xpSpent:         sys.counters?.xp?.value        ?? 0,
      experienceLevel: sys.biography?.experienceLevel ?? "green",
      enrichedHistory: await foundry.applications.ux.TextEditor.implementation.enrichHTML(
        sys.biography?.history ?? "",
        { async: true, secrets: this.actor.isOwner, relativeTo: this.actor }
      )
    };

    const lifeModuleEvaluation = evaluateActorLifeModules(this.actor);
    ctx.skillsDisplay = buildSkillDisplay(this.actor?.system ?? {}, {
      bonusBySkill: lifeModuleEvaluation.bonusBySkill
    });
    ctx.lifeModules = lifeModuleEvaluation.slotStates.map(slot => {
      const itemState = slot.state;
      return {
        moduleType: slot.moduleType,
        label: slot.label,
        hasCatalogEntries: slot.availableEntries.length > 0,
        emptyState: slot.availableEntries.length > 0
          ? `Add ${slot.label}`
          : `No ${slot.label} catalog entries configured`,
        item: itemState ? {
          id: itemState.itemId,
          name: itemState.label,
          img: itemState.item.img,
          bonusLabels: [...(itemState.selectedChoiceLabels ?? [])],
          warningLabels: [...(itemState.warningLabels ?? [])],
          isActive: itemState.isActive,
          statusLabel: itemState.isActive ? "Active" : "Inactive",
          statusReason: itemState.inactiveReason
        } : null
      };
    });

    const qualityCategoryOrder = ["positive", "negative", "narrative"];
    const qualityTierOrder = ["major", "minor"];
    const qualities = [...(ctx.items?.quality ?? [])]
      .sort((left, right) => {
        const leftSystem = normalizeQualityTraitSystem(left.system ?? {});
        const rightSystem = normalizeQualityTraitSystem(right.system ?? {});
        const categoryDelta = qualityCategoryOrder.indexOf(leftSystem.category) - qualityCategoryOrder.indexOf(rightSystem.category);
        if (categoryDelta !== 0) return categoryDelta;
        const tierDelta = qualityTierOrder.indexOf(leftSystem.tier) - qualityTierOrder.indexOf(rightSystem.tier);
        if (tierDelta !== 0) return tierDelta;
        return String(left.name ?? "").localeCompare(String(right.name ?? ""));
      });

    ctx.qualityGroups = qualityCategoryOrder.map(category => ({
      id: category,
      label: getQualityCategoryLabel(category),
      records: qualities
        .filter(item => normalizeQualityTraitSystem(item.system ?? {}).category === category)
        .map(item => {
          const system = normalizeQualityTraitSystem(item.system ?? {});
          const accordionId = this.#inventoryAccordionId("quality", item.id);
          return {
            id: item.id,
            accordionId,
            isExpanded: this.#expandedInventoryRows.has(accordionId),
            name: item.name,
            img: item.img,
            subtitle: `${getQualityTierLabel(system.tier)} ${getQualityCategoryLabel(system.category)}`,
            summaryStats: buildSummaryStats([
              { label: "Tier", value: getQualityTierLabel(system.tier), emphasis: "strong" },
              { label: "Activation", value: system.activation || "passive" },
              { label: "Effects", value: String(system.effects?.length ?? 0) },
            ]),
            detailTags: buildDetailTags([
              system.inactive ? "Inactive" : "",
              ...(system.tags ?? []),
            ]),
            detailRows: buildDetailRows([
              { label: "Category", value: getQualityCategoryLabel(system.category) },
              { label: "Tier", value: getQualityTierLabel(system.tier) },
              { label: "Activation", value: system.activation || "passive" },
              { label: "Prerequisites", value: String(system.prerequisites?.length ?? 0) },
              { label: "Effects", value: String(system.effects?.length ?? 0) },
              { label: "Tags", value: compactList(system.tags ?? []).join(", ") },
            ]),
            detailText: toSnippet(item.system?.description),
          };
        }),
    }));

    return ctx;
  }

 _onRender(context, options) {
  super._onRender(context, options);
  this.#syncCombatMenuOutsideHandler();
  this.#restoreScrollPosition();
 }

 async close(options = {}) {
  this.#removeCombatMenuOutsideHandler();
  return super.close(options);
 }

 requestCombatDashboardRefresh() {
  this.#renderPreservingScroll({ force: true });
 }

 async _onEdgeSet(event, target) {
  event.preventDefault();
  event.stopPropagation();

  if (!this.isEditable) return;

  const el =
    target?.closest?.("[data-edge-pool][data-edge-value]") ??
    event?.target?.closest?.("[data-edge-pool][data-edge-value]");
  if (!el) return;

  const poolKey = String(el.dataset.edgePool ?? "").trim();
  const clicked = Number(el.dataset.edgeValue ?? NaN);
  if (!poolKey || !Number.isFinite(clicked)) return;

  const pool = this.actor.getEdgePool(poolKey);
  if (!pool?.hasPools) return;

  let next = clicked;

  // Toggle behavior: clicking the last filled pip clears it
  if (clicked === pool.effectiveValue) {
    next = clicked - 1;
  }

  // right click (or context menu) clears entirely
  if (event.button === 2 || event.type === "contextmenu") next = 0;

  // UX helpers
 if (event.altKey) next = 0;
  if (event.shiftKey) next = pool.effectiveMax;

  return this.actor.setEdgePoolValue(poolKey, next);
}

 async _onToggleCombatMenu(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  const menuId = String(
    target?.dataset?.combatMenu
    ?? event?.target?.closest?.("[data-combat-menu]")?.dataset?.combatMenu
    ?? ""
  ).trim();

  if (!menuId) return;

  this.#openCombatMenuId = this.#openCombatMenuId === menuId ? null : menuId;
  this.#renderPreservingScroll(false);
 }

 #syncCombatMenuOutsideHandler() {
  this.#removeCombatMenuOutsideHandler();

  if (!this.#openCombatMenuId) return;

  this.#combatMenuOutsideHandler = (event) => {
    const root = this._getRootElement();
    if (!root) return;

    const target = event.target;
    if (!(target instanceof Node)) return;

    if (target.closest?.(".mwd-combat-menu")) return;
    if (!root.contains(target)) {
      this.#closeCombatMenu();
      return;
    }

    this.#closeCombatMenu();
  };

  document.addEventListener("click", this.#combatMenuOutsideHandler);
 }

 #removeCombatMenuOutsideHandler() {
  if (!this.#combatMenuOutsideHandler) return;
  document.removeEventListener("click", this.#combatMenuOutsideHandler);
  this.#combatMenuOutsideHandler = null;
 }

 #getPrimaryScroller() {
  const root = this._getRootElement();
  if (!root) return null;

  return root.querySelector(".mwd-scroll-area")
    ?? root.querySelector(".csb-tab-panels");
 }

 #captureScrollPosition() {
  const scroller = this.#getPrimaryScroller();
  if (!(scroller instanceof HTMLElement)) {
    this.#pendingScrollRestore = null;
    return;
  }

  this.#pendingScrollRestore = {
    top: scroller.scrollTop,
    left: scroller.scrollLeft
  };
 }

 #restoreScrollPosition() {
  const pending = this.#pendingScrollRestore;
  if (!pending) return;

  const scroller = this.#getPrimaryScroller();
  if (!(scroller instanceof HTMLElement)) return;

  scroller.scrollTop = pending.top;
  scroller.scrollLeft = pending.left;

  requestAnimationFrame(() => {
    const nextScroller = this.#getPrimaryScroller();
    if (!(nextScroller instanceof HTMLElement)) return;
    nextScroller.scrollTop = pending.top;
    nextScroller.scrollLeft = pending.left;
  });

  this.#pendingScrollRestore = null;
 }

 #renderPreservingScroll(renderOptions = false) {
  this.#captureScrollPosition();
  this.render(renderOptions);
 }

 #closeCombatMenu({ rerender = true } = {}) {
  if (!this.#openCombatMenuId) return;
  this.#openCombatMenuId = null;
  if (rerender) this.#renderPreservingScroll(false);
 }

  async _onToggleStatuses(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  const token = this.getSheetTokenDocument?.()
    ?? PersonalCombatTracker.getSnapshot(actorWriteTarget, { token: this.getSheetTokenDocument?.() ?? null })?.tokenDocument
    ?? PersonalCombatTracker.getSnapshot(this.actor, { token: this.getSheetTokenDocument?.() ?? null })?.tokenDocument
    ?? null;
  if (!token) {
    ui.notifications?.warn("Statuses require a token for this actor on the current scene.");
    return;
  }

  return openTokenStatusDialog({
    actor: actorWriteTarget,
    token
  });
 }

 async _onCombatSpend(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  const resource = String(target?.dataset?.resource ?? "").trim();
  const cost = Math.max(0, Number(target?.dataset?.cost ?? 0));
  const actionId = String(target?.dataset?.combatAction ?? "").trim();
  const actionLabel = String(target?.dataset?.combatLabel ?? "").trim();
  const actionCostLabel = String(target?.dataset?.combatCostLabel ?? "").trim();
  if (!resource || !cost || !actionId) return;

  try {
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const result = await PersonalCombatTracker.spendResource(actorWriteTarget, {
      token: this.getSheetTokenDocument?.()
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor),
      resource,
      cost,
      actionId,
      actionLabel,
      actionCostLabel
    });

    if (!result?.ok) {
      ui.notifications?.warn(result?.reason ?? "Unable to spend action.");
      return;
    }

    this.#closeCombatMenu({ rerender: false });
    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Failed to spend combat action", error);
    ui.notifications?.error("Unable to spend action.");
  }
 }

 async _onCombatReduceBurn(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  try {
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const result = await PersonalCombatTracker.reduceBurn(actorWriteTarget, {
      token: this.getSheetTokenDocument?.()
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor)
    });

    if (!result?.ok) {
      ui.notifications?.warn(result?.reason ?? "Unable to reduce Burn.");
      return;
    }

    this.#closeCombatMenu({ rerender: false });
    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Failed to reduce Burn", error);
    ui.notifications?.error("Unable to reduce Burn.");
  }
 }

 async _onCombatOverloadCheck(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  const raw = target?.dataset?.roll ?? event?.target?.closest?.("[data-roll]")?.dataset?.roll;
  if (!raw) return;

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch (error) {
    console.warn("MWD | Invalid overload payload", raw, error);
    return;
  }

  try {
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const result = await game.mwd?.roll?.execute?.({ actor: actorWriteTarget, payload, event });
    this.#closeCombatMenu({ rerender: false });
    if (!result) {
      this.#renderPreservingScroll(false);
      return;
    }
    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Failed to launch overload check", error);
    ui.notifications?.error("Unable to launch overload check.");
  }
 }

 async _onCombatAttack(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  const token = this.getSheetTokenDocument?.()
    ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
    ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor);

  const snapshot = PersonalCombatTracker.getSnapshot(actorWriteTarget, { token });
  if (!snapshot.hasCombatant) {
    ui.notifications?.warn("No combatant on the current scene.");
    return;
  }
  if (!snapshot.isCurrentTurn) {
    ui.notifications?.warn("Only available during your activation.");
    return;
  }
  if (snapshot.overloaded) {
    ui.notifications?.warn("Overloaded actors can only recover Burn.");
    return;
  }
  const activationCap = 3 + Math.floor((
    Math.max(0, Number(actorWriteTarget.system?.attributes?.reflexes?.value ?? 0))
    + Math.max(0, Number(actorWriteTarget.system?.attributes?.willpower?.value ?? 0))
  ) / 2);
  const saCapacityRemaining = Math.max(0, activationCap - Math.max(0, Number(snapshot.state?.saSpentThisActivation ?? 0)));
  if (saCapacityRemaining < 2) {
    ui.notifications?.warn("Activation SA cap reached.");
    return;
  }

  const payload = {
    intent: "attack",
    mode: "auto",
    fallback: "unarmed",
    edge: { pool: "physical.grit", allowed: ["pre", "post"] },
    tags: ["combat", "attack"]
  };

  try {
    const result = await game.mwd?.roll?.execute?.({ actor: actorWriteTarget, payload, event });
    this.#closeCombatMenu({ rerender: false });
    if (!result) {
      this.#renderPreservingScroll(false);
      return;
    }

    const spend = await PersonalCombatTracker.spendResource(actorWriteTarget, {
      token,
      resource: "sa",
      cost: 2,
      actionId: "attack",
      actionLabel: "Attack",
      actionCostLabel: "2 SA"
    });

    if (!spend?.ok) {
      ui.notifications?.warn(spend?.reason ?? "Unable to spend attack action.");
    }

    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Failed to launch attack", error);
    notifyRollError(error, "Unable to launch attack.");
  }
}

 async _onAddSkillSpecialization(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable || !this.editing) return;

  const skillKey = String(target?.dataset?.skillKey ?? "").trim();
  if (!skillKey) return;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  const rawKeys = getStoredSkillSpecializationKeys(actorWriteTarget.system ?? {}, skillKey);
  const ownedKeys = getOwnedSkillSpecializationKeys(actorWriteTarget.system ?? {}, skillKey);
  const choices = getSkillSpecializationDefs(skillKey)
    .filter(entry => !ownedKeys.includes(entry.key));

  if (choices.length === 0) return;

  let selectedKey = choices[0]?.key ?? "";
  if (choices.length > 1) {
    const content = `<form class="mwd-quick-select"><div class="mwd-field"><label>Specialization</label><select name="specialization">${choices.map(choice => `<option value="${choice.key}">${choice.label}</option>`).join("")}</select></div></form>`;
    selectedKey = await Dialog.prompt({
      title: "Add Skill Specialization",
      content,
      label: "Add",
      callback: html => html.find('select[name="specialization"]').val() ?? choices[0]?.key ?? ""
    });
  }

  const nextKeys = normalizeStoredSkillSpecializationKeys(
    rawKeys.concat([selectedKey])
  );

  await actorWriteTarget.update({
    [`system.skills.${skillKey}.specializations`]: nextKeys
  });
  this.#renderPreservingScroll({ force: true });
 }

 async _onRemoveSkillSpecialization(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable || !this.editing) return;

  const skillKey = String(target?.dataset?.skillKey ?? "").trim();
  const specializationKey = String(target?.dataset?.specializationKey ?? "").trim();
  if (!skillKey || !specializationKey) return;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  const nextKeys = normalizeStoredSkillSpecializationKeys(
    getStoredSkillSpecializationKeys(actorWriteTarget.system ?? {}, skillKey)
      .filter(key => key !== specializationKey)
  );

  await actorWriteTarget.update({
    [`system.skills.${skillKey}.specializations`]: nextKeys
  });
  this.#renderPreservingScroll({ force: true });
 }

 async _onCreateLifeModuleItem(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  if (!this.isEditable) return;

  const moduleType = String(target?.dataset?.moduleType ?? "").trim();
  if (!moduleType) return;

  const actor = this.getPersistentActor() ?? this.actor;
  const entries = listLifeModuleCatalogEntriesByType(moduleType);
  if (!entries.length) {
    ui.notifications?.warn(`No ${getLifeModuleTypeLabel(moduleType)} life modules are configured in game settings.`);
    return;
  }

  const selectedCatalogId = await promptSelectOption({
    title: `Choose ${getLifeModuleTypeLabel(moduleType)} Life Module`,
    label: "Life Module",
    confirmLabel: "Create",
    options: entries.map(entry => ({
      value: entry.id,
      label: entry.label
    }))
  });
  if (!selectedCatalogId) return;

  const catalogEntry = getLifeModuleCatalogEntry(selectedCatalogId);
  if (!catalogEntry) {
    ui.notifications?.warn("That life module catalog entry no longer exists.");
    return;
  }

  const grantFields = getLifeModuleGrantSelectionFields(catalogEntry, {});
  const selectedGrants = {};

  for (const grant of grantFields.filter(field => field.hasMultipleChoices)) {
    const selectedGrant = await promptSelectOption({
      title: `Choose Bonus for ${catalogEntry.label}`,
      label: grant.label,
      confirmLabel: "Apply",
      options: grant.options.map(option => ({
        value: option.value,
        label: option.label
      }))
    });
    if (!selectedGrant) return;
    selectedGrants[grant.id] = selectedGrant;
  }

  await actor.createEmbeddedDocuments("Item", [{
    name: catalogEntry.label,
    type: "lifeModule",
    system: normalizeLifeModuleItemSystem({
      moduleType,
      catalogId: catalogEntry.id,
      selectedGrants
    })
  }]);
  this.#renderPreservingScroll({ force: true });
 }

 async _onCreateOwnedItem(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  const itemType = String(target?.dataset?.itemType ?? "").trim();
  if (!itemType) return;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  const existingCount = actorWriteTarget.items.filter(item => item.type === itemType).length;
  const label = itemType === "personalWeapon"
    ? "Personal Weapon"
    : itemType === "armor"
      ? "Armor"
      : itemType.charAt(0).toUpperCase() + itemType.slice(1);

  await actorWriteTarget.createEmbeddedDocuments("Item", [{
    name: `${label} ${existingCount + 1}`,
    type: itemType
  }]);

  this.#renderPreservingScroll({ force: true });
 }

 async _onEditOwnedItem(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  const item = this.#getOwnedItemFromTarget(target, event);
  item?.sheet?.render(true);
 }

 async _onDeleteOwnedItem(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  const item = this.#getOwnedItemFromTarget(target, event);
  if (!item) return;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  await actorWriteTarget.deleteEmbeddedDocuments("Item", [item.id]);
  this.#renderPreservingScroll({ force: true });
 }

 async _onToggleInventoryAccordion(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  const accordionId = String(
    target?.dataset?.accordionId
    ?? target?.closest?.("[data-accordion-id]")?.dataset?.accordionId
    ?? event?.target?.closest?.("[data-accordion-id]")?.dataset?.accordionId
    ?? ""
  ).trim();

  if (!accordionId) return;

  if (this.#expandedInventoryRows.has(accordionId)) {
    this.#expandedInventoryRows.delete(accordionId);
  } else {
    this.#expandedInventoryRows.add(accordionId);
  }

  this.#renderPreservingScroll(false);
 }

 async _onToggleOwnedItemEquipped(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  const item = this.#getOwnedItemFromTarget(target, event);
  if (!item) return;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  await actorWriteTarget.setOwnedItemEquipped?.(item.id, !item.system?.equipped);
  this.#renderPreservingScroll({ force: true });
 }

 async _onSetOwnedItemPrimary(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  const item = this.#getOwnedItemFromTarget(target, event);
  if (!item) return;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  await actorWriteTarget.setOwnedItemPrimary?.(item.id, !item.system?.isPrimary);
  this.#renderPreservingScroll({ force: true });
 }

 async _onAdjustGearQuantity(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  const item = this.#getOwnedItemFromTarget(target, event);
  if (!item || item.canonicalType !== "gear") return;

  const delta = Math.trunc(Number(
    target?.dataset?.delta
    ?? target?.closest?.("[data-delta]")?.dataset?.delta
    ?? event?.target?.closest?.("[data-delta]")?.dataset?.delta
    ?? 0
  ) || 0);
  if (!delta) return;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  const targetItem = actorWriteTarget.items.get(item.id) ?? item;
  const nextQuantity = Math.max(0, Math.trunc(Number(targetItem.system?.quantity ?? 1) || 0) + delta);

  await targetItem.update({ "system.quantity": nextQuantity });
  this.#renderPreservingScroll({ force: true });
 }

 async _onAttackWeapon(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  const raw = target?.dataset?.roll ?? event?.target?.closest?.("[data-roll]")?.dataset?.roll;
  if (!raw) return;

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch (error) {
    console.warn("MWD | Invalid attack payload", raw, error);
    return;
  }

  try {
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const result = await game.mwd?.roll?.execute?.({ actor: actorWriteTarget, payload, event });
    if (!result) return;
    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Failed to launch weapon attack", error);
    notifyRollError(error, "Unable to attack with that weapon.");
  }
}

 #getOwnedItemFromTarget(target, event) {
  const itemId = String(
    target?.dataset?.itemId
    ?? target?.closest?.("[data-item-id]")?.dataset?.itemId
    ?? event?.target?.closest?.("[data-item-id]")?.dataset?.itemId
    ?? ""
  ).trim();

  if (!itemId) return null;
  return this.actor.items.get(itemId) ?? null;
 }

 #inventoryAccordionId(section, itemId) {
  return `${String(section ?? "").trim()}:${String(itemId ?? "").trim()}`;
 }


}
