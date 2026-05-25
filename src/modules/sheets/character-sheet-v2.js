// src/modules/sheets/character-sheet-v2.js


import { TEMPLATES_PATH, SYSTEM_NAME, EDGE_POOL_GROUPS } from "../constants.js";
import { MWD } from "../config.js";
import { BaseActorSheetV2 } from "./base-actor-sheet-v2.js";
import { LayoutRegistry } from "../layout/layout-registry.js";
import { openTokenStatusDialog } from "../dialog/token-status-dialog.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { buildCombatAwarenessPreview } from "../combat/combat-awareness-preview.js";
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
import { buildCriticalStatusSummary } from "../mwd/machine-summary.js";
import { buildBattlemechMovementActionChoices } from "../mwd/battlemech-movement-actions.js";
import { buildBattlemechMeleeProfiles } from "../mwd/battlemech-melee-actions.js";
import { buildBattlemechRangedAttackGroups } from "../mwd/battlemech-ranged-actions.js";
import {
  buildMachineCriticalRepairIssues,
  buildMachineEwActionChoices,
} from "../mwd/machine-quick-actions.js";
import { activatePendingEvadeFromCombatMenu } from "../chat/chat-actions.js";
import {
  getQualityCategoryLabel,
  getQualityTierLabel,
  normalizeQualityTraitSystem,
} from "../mwd/traits.js";
import {
  getOwnedWeaponAttackDragData,
  launchOwnedWeaponAttack,
} from "../roll/weapon-attack-actions.js";

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

const ARMOR_MODIFIER_LABELS = MWD.mwd.armorMitigationType;
const GEAR_CATEGORY_LABELS = MWD.item.gear.categoryLabels;
const CONSUMABLE_CATEGORY_LABELS = MWD.item.consumable.categoryLabels;

function formatSignedValue(value) {
  const numeric = Number(value ?? 0) || 0;
  return numeric > 0 ? `+${numeric}` : `${numeric}`;
}

function buildQuantityTrackedInventoryRecord({
  item,
  accordionId,
  itemType,
  defaultSubtitle,
  categoryLabels = {},
  ratingLabel = "Rating",
  typeLabel = "",
  isEditable = false,
  isExpanded = false,
} = {}) {
  const quantity = Math.max(0, Math.trunc(toNumber(item?.system?.quantity ?? 1, 1)));
  const rating = Math.max(0, Math.trunc(toNumber(item?.system?.rating ?? 0, 0)));
  const tags = compactList(item?.system?.tags ?? []);
  const category = String(item?.system?.category ?? "").trim();
  const categoryLabel = categoryLabels[category] ?? category;

  return {
    id: item.id,
    itemType,
    isGear: itemType === "gear",
    isConsumable: itemType === "consumable",
    accordionId,
    isExpanded,
    name: item.name,
    img: item.img,
    subtitle: categoryLabel || defaultSubtitle,
    summaryStats: buildSummaryStats([
      { label: "Qty", value: quantity, emphasis: "strong" },
      { label: ratingLabel, value: rating }
    ]),
    detailTags: buildDetailTags([
      typeLabel,
      ...tags,
      item?.system?.inactive ? "Inactive" : ""
    ]),
    detailRows: buildDetailRows([
      { label: "Quantity", value: quantity },
      { label: ratingLabel, value: rating },
      { label: "Source", value: item?.system?.sourceReference ?? "" },
      { label: "Category", value: categoryLabel },
      { label: "Tags", value: tags.join(", ") }
    ]),
    detailText: toSnippet(item?.system?.description),
    quantity,
    canAdjustQuantity: isEditable
  };
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

function getBattlemechMovementChoices(actor) {
  const preparedChoices = actor?.system?.quickActions?.movement;
  if (Array.isArray(preparedChoices) && preparedChoices.length) return preparedChoices;
  return buildBattlemechMovementActionChoices(actor);
}

function getMachineActionService() {
  return game.mwd?.machineActions ?? game.system?.mwd?.machineActions ?? null;
}

async function executeMachineAction(actor, request = {}) {
  const service = getMachineActionService();
  if (!service?.execute) throw new Error("MWD machine action service not initialized.");
  return service.execute(actor, request);
}

function getActorIdentityKeys(actor = null) {
  const keys = new Set();
  if (!actor) return keys;

  const push = (value) => {
    const normalized = String(value ?? "").trim();
    if (normalized) keys.add(normalized);
  };

  push(actor.id);
  push(actor.uuid);
  push(actor.actor?.id);
  push(actor.actor?.uuid);
  push(actor.baseActor?.id);
  push(actor.baseActor?.uuid);
  return keys;
}

async function resolvePilotActorDocument(machineActor = null) {
  const pilotUuid = String(
    machineActor?.system?.pilot?.uuid
    ?? machineActor?.system?.mwd?.pilot?.uuid
    ?? ""
  ).trim();
  if (!pilotUuid || typeof fromUuid !== "function") return null;

  try {
    const resolved = await fromUuid(pilotUuid);
    return resolved?.actor ?? resolved?.baseActor ?? resolved ?? null;
  } catch (_error) {
    return null;
  }
}

async function machineIsAssignedToPilot(machineActor = null, pilotActor = null) {
  const pilotUuid = String(
    machineActor?.system?.pilot?.uuid
    ?? machineActor?.system?.mwd?.pilot?.uuid
    ?? ""
  ).trim();
  if (!pilotActor) return false;

  const identityKeys = getActorIdentityKeys(pilotActor);
  if (identityKeys.has(pilotUuid)) return true;

  const resolvedPilot = await resolvePilotActorDocument(machineActor);
  if (!resolvedPilot) return false;

  for (const key of getActorIdentityKeys(resolvedPilot)) {
    if (identityKeys.has(key)) return true;
  }
  return false;
}

function getAssignedMachineCandidates() {
  const candidates = [];
  const seen = new Set();

  const addCandidate = ({ actor = null, uuid = "", source = "actor" } = {}) => {
    const machineActor = actor ?? null;
    const normalizedUuid = String(uuid ?? machineActor?.uuid ?? "").trim();
    if (!machineActor || !normalizedUuid || seen.has(normalizedUuid)) return;
    if (machineActor.type !== "battlemech" && machineActor.type !== "vehicle") return;
    seen.add(normalizedUuid);
    candidates.push({ actor: machineActor, uuid: normalizedUuid, source });
  };

  for (const actor of game.actors?.contents ?? []) {
    addCandidate({ actor, uuid: actor?.uuid, source: "actor" });
  }

  for (const scene of game.scenes?.contents ?? []) {
    const tokenDocs = scene?.tokens?.contents ?? scene?.tokens ?? [];
    for (const tokenDoc of tokenDocs) {
      if (tokenDoc?.isLinked) continue;
      addCandidate({ actor: tokenDoc?.actor ?? null, uuid: tokenDoc?.uuid, source: "token" });
    }
  }

  return candidates;
}

async function resolveAssignedMachineFromTarget(target = null) {
  const machineUuid = String(target?.dataset?.mechUuid ?? "").trim();
  if (machineUuid && typeof fromUuid === "function") {
    try {
      const resolved = await fromUuid(machineUuid);
      return resolved?.actor ?? resolved?.baseActor ?? resolved ?? null;
    } catch (_error) {
      // Fall through to actor-id lookup.
    }
  }

  const machineId = String(target?.dataset?.mechId ?? "").trim();
  return machineId ? game.actors.get(machineId) ?? null : null;
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
  #inventoryAttackDragController = null;
  #linkedMechHookId = null;

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
      combatAction: CharacterSheetV2.prototype._onCombatAction,
      combatSpend: CharacterSheetV2.prototype._onCombatSpend,
      combatAssist: CharacterSheetV2.prototype._onCombatAssist,
      combatEvade: CharacterSheetV2.prototype._onCombatEvade,
      combatInterrupt: CharacterSheetV2.prototype._onCombatInterrupt,
      combatReduceBurn: CharacterSheetV2.prototype._onCombatReduceBurn,
      combatOverloadCheck: CharacterSheetV2.prototype._onCombatOverloadCheck,
      combatAttack: CharacterSheetV2.prototype._onCombatAttack,
      removeActivationAction: CharacterSheetV2.prototype._onRemoveActivationAction,
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
      attackWeapon: CharacterSheetV2.prototype._onAttackWeapon,
      openAssignedMech: CharacterSheetV2.prototype._onOpenAssignedMech,
      mechAttack: CharacterSheetV2.prototype._onMechAttack,
      mechMovement: CharacterSheetV2.prototype._onMechMovement,
      mechRoll: CharacterSheetV2.prototype._onMechRoll,
    }
  }, { inplace: false });

    /** @override */
  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    const sheetToken = this.getSheetTokenDocument?.() ?? null;
    ctx._mwdThemeClass = game.system.mwd.styles.selectCssClass();
    ctx.layout = await LayoutRegistry.get("character");

    // Character-only Edge console context
    const cap = this.actor.getEdgeCap();
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
    ctx.combatAwarenessPreview = buildCombatAwarenessPreview(this.actor, {
      sourceToken: sheetToken,
    });

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

    const loadout = this.actor.getPersonalCombatLoadout();
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
            attackUuid: weapon.uuid ?? "",
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
        return buildQuantityTrackedInventoryRecord({
          item,
          accordionId,
          itemType: "gear",
          defaultSubtitle: "Gear",
          categoryLabels: GEAR_CATEGORY_LABELS,
          ratingLabel: "Rating",
          isEditable: this.isEditable,
          isExpanded: this.#expandedInventoryRows.has(accordionId),
        });
      }),
      // Consumables deliberately share the same quantity-tracked record model as
      // gear so stock editing and linked-source authoring stay transferable.
      consumables: (ctx.items?.consumable ?? []).map(item => {
        const accordionId = this.#inventoryAccordionId("consumables", item.id);
        return buildQuantityTrackedInventoryRecord({
          item,
          accordionId,
          itemType: "consumable",
          defaultSubtitle: "Consumable",
          categoryLabels: CONSUMABLE_CATEGORY_LABELS,
          ratingLabel: "Potency",
          typeLabel: "Consumable",
          isEditable: this.isEditable,
          isExpanded: this.#expandedInventoryRows.has(accordionId),
        });
      })
    };

    /* -------------------------------------------- */
    /* Bio                                          */
    /* -------------------------------------------- */

    ctx.bio = {
      fields:          ctx.bio?.fields          ?? {},
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

    ctx.assignedMech = await this._buildAssignedMech();

    return ctx;
  }

  async _buildAssignedMech() {
    const characterActor = this.getPersistentActor?.() ?? this.actor;
    const weightClassLabels = MWD.mwd.weightClass;
    const linkedMachines = [];

    for (const candidate of getAssignedMachineCandidates()) {
      if (await machineIsAssignedToPilot(candidate.actor, characterActor)) {
        linkedMachines.push(candidate);
      }
    }

    const mechs = linkedMachines.map(({ actor: a, uuid }) => {
        const isMech = a.type === "battlemech";
        const structure = a.system?.monitors?.structure ?? {};
        const armor = a.system?.monitors?.armor ?? {};
        const heat = a.system?.mwd?.heat ?? {};
        const heatStatus = a.system?.mwd?.heatStatus ?? {};
        const crits = a.system?.mwd?.crits ?? [];
        const buildReadOnlyTrack = (id, label, kind, data) => {
          const value = Math.max(0, toNumber(data.value, 0));
          const max = Math.max(0, toNumber(data.max, 0));
          return {
            id, label, kind, value, max,
            resistance: toNumber(data.resistance?.default, 0),
            segments: Array.from({ length: max }, (_, i) => {
              const v = i + 1;
              return { value: v, filled: v <= value };
            }),
          };
        };

        const heatCurrent = Math.max(0, toNumber(heat.current, 0));
        const heatTrackLength = Math.max(0, toNumber(heat.trackLength ?? heat.max, 0));
        const heatThresholds = heat.thresholds ?? {};
        const heatDisplayMax = Math.max(
          heatTrackLength,
          heatCurrent,
          toNumber(heatThresholds.shutdown ?? heatThresholds.danger, 0)
        );
        const heatModel = isMech ? {
          current: heatCurrent,
          trackLength: heatTrackLength,
          displayMax: heatDisplayMax,
          status: heatStatus.label ?? heatStatus.code ?? "safe",
          segments: Array.from({ length: heatDisplayMax }, (_, i) => {
              const v = i + 1;
              return {
                value: v,
              filled: v <= heatCurrent,
              breakpoint: compactList([
                v === toNumber(heatThresholds.runningHot, 0) ? "runningHot" : "",
                v === toNumber(heatThresholds.overheated, 0) ? "overheated" : "",
                v === toNumber(heatThresholds.shutdown, 0) ? "shutdown" : "",
              ]).join(" "),
            };
          }),
        } : null;

        const critStatus = buildCriticalStatusSummary(crits);

        const conditionMonitors = isMech
          ? [buildReadOnlyTrack("structure", "Structure", "wound", structure), buildReadOnlyTrack("armor", "Armor", "armor", armor)]
          : [buildReadOnlyTrack("structure", "Structure", "wound", structure)];

        const hasRangedGroups = buildBattlemechRangedAttackGroups(a)
          .some(group => group.isAttackLegal && group.isAvailableThisActivation);
        const hasMeleeProfiles = isMech && buildBattlemechMeleeProfiles(a).length > 0;
        const movementChoices = getBattlemechMovementChoices(a);
        const enabledMovementChoices = movementChoices.filter(choice => !choice.disabled);
        const enabledEwActions = isMech ? buildMachineEwActionChoices(a) : [];

        const mechQuickActions = isMech ? [
          {
            label: "Movement",
            hint: enabledMovementChoices.length ? enabledMovementChoices.map(choice => choice.label).join(" / ") : "No movement actions available",
            handler: "mechMovement",
            disabled: enabledMovementChoices.length === 0,
            dataset: { mechUuid: uuid, mechId: a.id },
          },
          { label: "Ranged", hint: "Prompt for a weapon group", handler: "mechAttack", disabled: !hasRangedGroups, dataset: { attackKind: "ranged", mechUuid: uuid, mechId: a.id } },
          { label: "Melee", hint: "Prompt for a melee profile", handler: "mechAttack", disabled: !hasMeleeProfiles, dataset: { attackKind: "melee", mechUuid: uuid, mechId: a.id } },
          { label: "Piloting", hint: "Vehicle handling test", handler: "mechRoll", disabled: false, dataset: { rollKind: "piloting", mechUuid: uuid, mechId: a.id } },
          { label: "EW", hint: enabledEwActions.length ? "Choose an EW action" : "No EW actions available", handler: "mechRoll", disabled: enabledEwActions.length === 0, dataset: { rollKind: "sensor", mechUuid: uuid, mechId: a.id } },
          { label: "Repair", hint: "Choose a crit or repairable status", handler: "mechRoll", disabled: false, dataset: { rollKind: "repair", mechUuid: uuid, mechId: a.id } },
        ] : [];

        const armorMax = Math.max(0, toNumber(armor.max, 0));
        const armorRemaining = Math.min(armorMax, Math.max(0, toNumber(armor.value, 0)));
        const structureMax = Math.max(0, toNumber(structure.max, 0));
        const structureRemaining = Math.min(structureMax, Math.max(0, toNumber(structure.value, 0)));

        return {
          id: a.id,
          uuid,
          name: a.name,
          typeLabel: isMech ? "BattleMech" : "Vehicle",
          isMech,
          weightLabel: weightClassLabels[a.system?.mwd?.weightClass] ?? "",
            summaryStats: buildSummaryStats([
              ...(isMech ? [{ label: "Armor", value: `${armorRemaining} / ${armorMax}` }] : []),
              { label: "Structure", value: `${structureRemaining} / ${structureMax}` },
              { label: "Heat", value: isMech ? String(heatCurrent) : null },
              { label: "Status", value: critStatus.count > 0 ? critStatus.value : "OK" },
            ]),
          conditionMonitors,
          heat: heatModel,
          critCount: crits.length,
          quickActions: mechQuickActions,
        };
      });

    return { mechs, hasMech: mechs.length > 0 };
  }

  async _onOpenAssignedMech(event, target) {
    const mech = await resolveAssignedMachineFromTarget(target);
    if (mech) mech.sheet.render(true, { focus: true });
  }

  async _onMechAttack(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    const mech = await resolveAssignedMachineFromTarget(target);
    if (!mech) return;
    const attackKind = String(target?.dataset?.attackKind ?? "").trim();
    const groupId = String(target?.dataset?.groupId ?? "").trim();
    const operatorActorUuid = this.actor?.uuid ?? "";
    try {
      if (attackKind === "melee") {
        const selectedProfile = await this.#promptAssignedMechMeleeProfile(mech);
        if (selectedProfile) await executeMachineAction(mech, {
          kind: "attack",
          attackKind: "melee",
          profile: selectedProfile,
          operatorActorUuid,
        });
      } else {
        const selectedGroup = groupId
          ? { id: groupId }
          : await this.#promptAssignedMechRangedGroup(mech);
        if (selectedGroup?.id) await executeMachineAction(mech, {
          kind: "attack",
          attackKind: "ranged",
          groupId: selectedGroup.id,
          operatorActorUuid,
        });
      }
    } catch (error) {
      notifyRollError(error, "Unable to launch BattleMech attack.");
    }
  }

  async _onMechMovement(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    const mech = await resolveAssignedMachineFromTarget(target);
    if (!mech) return;

    const selectedAction = await this.#promptAssignedMechMovementAction(mech);
    if (!selectedAction) return;

    try {
      await executeMachineAction(mech, {
        kind: "movement",
        movementKind: selectedAction.id,
        operatorActorUuid: this.actor?.uuid ?? "",
      });
    } catch (error) {
      notifyRollError(error, "Unable to record BattleMech movement.");
    }
  }

  async _onMechRoll(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    const mech = await resolveAssignedMachineFromTarget(target);
    if (!mech) return;
    const rollKind = String(target?.dataset?.rollKind ?? "").trim();
    const operatorActorUuid = this.actor?.uuid ?? "";
    try {
      if (rollKind === "piloting") {
        await executeMachineAction(mech, { kind: "piloting", operatorActorUuid });
      } else if (rollKind === "sensor") {
        const selectedAction = await this.#promptAssignedMechEwAction(mech);
        if (selectedAction) await executeMachineAction(mech, {
          kind: "ew",
          action: selectedAction,
          operatorActorUuid,
        });
      } else if (rollKind === "repair") {
        const selectedIssue = await this.#promptAssignedMechCriticalRepairIssue(mech);
        if (selectedIssue) await executeMachineAction(mech, {
          kind: "repair",
          issue: selectedIssue,
          operatorActorUuid,
        });
      }
    } catch (error) {
      notifyRollError(error, "Unable to launch BattleMech check.");
    }
  }

  async #promptAssignedMechMovementAction(mech) {
    const choices = getBattlemechMovementChoices(mech);
    const selectableChoices = choices.filter(choice => !choice.disabled);
    if (!selectableChoices.length) {
      ui.notifications?.warn("No movement actions are currently available.");
      return null;
    }

    const defaultChoice = selectableChoices[0];
    const content = `<form class="mwd-quick-select">${choices.map(choice => `
      <label class="quick-select-option${choice.disabled ? " is-disabled" : ""}" title="${foundry.utils.escapeHTML(choice.reason || choice.hint || "")}">
        <input type="radio" name="movement-action" value="${choice.id}" ${choice.id === defaultChoice.id ? "checked" : ""} ${choice.disabled ? "disabled" : ""}>
        <span>${foundry.utils.escapeHTML(choice.label)}</span>
        <small>${foundry.utils.escapeHTML(`${choice.cost} SA${choice.heat > 0 ? ` | +${choice.heat} Heat` : ""}${choice.hint ? ` | ${choice.hint}` : ""}`)}</small>
      </label>`).join("")}</form>`;

    const selectedId = await foundry.applications.api.DialogV2.wait({
      window: { title: "Movement" },
      content,
      rejectClose: false,
      buttons: [
        {
          action: "select",
          label: "Move",
          icon: "fa-solid fa-person-running",
          default: true,
          callback: (_event, button) => button.form?.elements["movement-action"]?.value ?? defaultChoice.id,
        },
      ],
    });

    return selectableChoices.find(choice => choice.id === selectedId) ?? defaultChoice;
  }

  async #promptAssignedMechRangedGroup(mech) {
    const groups = buildBattlemechRangedAttackGroups(mech);
    const selectableGroups = groups.filter(group =>
      Array.isArray(group?.weaponIds)
      && group.weaponIds.length > 0
      && group.isAttackLegal
      && group.isAvailableThisActivation
    );
    if (!selectableGroups.length) {
      ui.notifications?.warn(MWD.actor.vehicle.quickActions.errors.noRanged);
      return null;
    }
    if (selectableGroups.length === 1) return selectableGroups[0];

    const defaultGroup = selectableGroups[0];
    const content = `<form class="mwd-quick-select">${selectableGroups.map(group => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${foundry.utils.escapeHTML(String(group.id ?? ""))}" ${group.id === defaultGroup.id ? "checked" : ""}>
        <span>${foundry.utils.escapeHTML(String(group.name ?? ""))}</span>
      </label>`).join("")}</form>`;

    const selectedId = await foundry.applications.api.DialogV2.wait({
      window: { title: MWD.actor.vehicle.quickActions.selectWeaponGroup },
      content,
      rejectClose: false,
      buttons: [
        {
          action: "select",
          label: MWD.common.roll.button,
          icon: "fa-solid fa-dice",
          default: true,
          callback: (_event, button) => button.form?.elements["weapon-group"]?.value ?? defaultGroup.id,
        },
      ],
    });

    return selectableGroups.find(group => group.id === selectedId) ?? defaultGroup;
  }

  async #promptAssignedMechEwAction(mech) {
    const actions = buildMachineEwActionChoices(mech, { includeDisabled: true });
    const selectableActions = actions.filter(action => !action.disabled);
    if (!selectableActions.length) {
      ui.notifications?.warn(MWD.actor.vehicle.quickActions.errors.noSensorSweep);
      return null;
    }

    const defaultAction = selectableActions[0];
    const content = `<form class="mwd-quick-select">${actions.map(action => `
      <label class="quick-select-option${action.disabled ? " is-disabled" : ""}" title="${foundry.utils.escapeHTML(String(action.reason ?? ""))}">
        <input type="radio" name="ew-action" value="${foundry.utils.escapeHTML(String(action.id ?? ""))}" ${action.id === defaultAction.id ? "checked" : ""} ${action.disabled ? "disabled" : ""}>
        <span>${foundry.utils.escapeHTML(String(action.label ?? ""))}</span>
        <small>${foundry.utils.escapeHTML(String(action.disabled ? action.reason : action.hint ?? ""))}</small>
      </label>`).join("")}</form>`;

    const selectedId = await foundry.applications.api.DialogV2.wait({
      window: { title: "Electronic Warfare" },
      content,
      rejectClose: false,
      buttons: [
        {
          action: "select",
          label: MWD.common.roll.button,
          icon: "fa-solid fa-dice",
          default: true,
          callback: (_event, button) => button.form?.elements["ew-action"]?.value ?? defaultAction.id,
        },
      ],
    });

    return selectableActions.find(action => action.id === selectedId) ?? defaultAction;
  }

  async #promptAssignedMechCriticalRepairIssue(mech) {
    const issues = buildMachineCriticalRepairIssues(mech);
    if (!issues.length) {
      ui.notifications?.warn("No active criticals or repairable statuses are available.");
      return null;
    }
    if (issues.length === 1) return issues[0];

    const defaultIssue = issues[0];
    const content = `<form class="mwd-quick-select">${issues.map(issue => `
      <label class="quick-select-option">
        <input type="radio" name="repair-issue" value="${foundry.utils.escapeHTML(`${issue.issueKind}:${issue.issueId}`)}" ${issue.issueKind === defaultIssue.issueKind && issue.issueId === defaultIssue.issueId ? "checked" : ""}>
        <span>${foundry.utils.escapeHTML(String(issue.label ?? ""))}</span>
        <small>${foundry.utils.escapeHTML(`${issue.remedyLabel ?? ""} | ${issue.remedySummary || `DN ${issue.totalDn}`}`)}</small>
      </label>`).join("")}</form>`;

    const selectedKey = await foundry.applications.api.DialogV2.wait({
      window: { title: MWD.actor.vehicle.quickActions.emergencyRepair },
      content,
      rejectClose: false,
      buttons: [
        {
          action: "select",
          label: MWD.common.roll.button,
          icon: "fa-solid fa-dice",
          default: true,
          callback: (_event, button) => button.form?.elements["repair-issue"]?.value ?? `${defaultIssue.issueKind}:${defaultIssue.issueId}`,
        },
      ],
    });

    return issues.find(issue => `${issue.issueKind}:${issue.issueId}` === selectedKey) ?? defaultIssue;
  }

  async #promptAssignedMechMeleeProfile(mech) {
    const profiles = buildBattlemechMeleeProfiles(mech);
    if (!profiles.length) {
      ui.notifications?.warn(MWD.actor.vehicle.quickActions.errors.noMelee);
      return null;
    }
    if (profiles.length === 1) return profiles[0];

    const defaultProfile = profiles[0];
    const content = `<form class="mwd-quick-select">${profiles.map(profile => `
      <label class="quick-select-option">
        <input type="radio" name="melee-profile" value="${foundry.utils.escapeHTML(String(profile.id ?? ""))}" ${profile.id === defaultProfile.id ? "checked" : ""}>
        <span>${foundry.utils.escapeHTML(String(profile.name ?? ""))}</span>
      </label>`).join("")}</form>`;

    const selectedId = await foundry.applications.api.DialogV2.wait({
      window: { title: MWD.actor.vehicle.quickActions.selectMeleeProfile },
      content,
      rejectClose: false,
      buttons: [
        {
          action: "select",
          label: MWD.common.roll.button,
          icon: "fa-solid fa-dice",
          default: true,
          callback: (_event, button) => button.form?.elements["melee-profile"]?.value ?? defaultProfile.id,
        },
      ],
    });

    return profiles.find(profile => profile.id === selectedId) ?? defaultProfile;
  }

  _onRender(context, options) {
   super._onRender(context, options);
    this.#syncCombatMenuOutsideHandler();
    this.#restoreScrollPosition();
    this.#bindInventoryAttackDrag();
    this.#bindLinkedMechHook();
  }

  async close(options = {}) {
    this.#removeCombatMenuOutsideHandler();
    this.#teardownInventoryAttackDrag();
    if (this.#linkedMechHookId !== null) {
      Hooks.off("updateActor", this.#linkedMechHookId);
      this.#linkedMechHookId = null;
    }
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

 #bindLinkedMechHook() {
    if (this.#linkedMechHookId !== null) return;
    const characterActor = this.getPersistentActor?.() ?? this.actor;
    const characterIdentityKeys = getActorIdentityKeys(characterActor);
    this.#linkedMechHookId = Hooks.on("updateActor", (actor, changed) => {
      if (actor.type !== "battlemech" && actor.type !== "vehicle") return;

      const changedPilotUuid = String(changed?.system?.pilot?.uuid ?? changed?.system?.mwd?.pilot?.uuid ?? "").trim();
      const currentPilotUuid = String(actor.system?.pilot?.uuid ?? actor.system?.mwd?.pilot?.uuid ?? "").trim();
      const pilotChanged = changedPilotUuid !== "";
      const isRelevantCurrentPilot = characterIdentityKeys.has(currentPilotUuid);
      const isRelevantChangedPilot = characterIdentityKeys.has(changedPilotUuid);

      if (!pilotChanged && !isRelevantCurrentPilot) return;
      if (pilotChanged || isRelevantCurrentPilot || isRelevantChangedPilot) {
        this.render();
      }
    });
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

  async _onToggleStatuses(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (this.#notifyUnavailableAction(target, event, "Statuses are not available right now.")) return;

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

  if (this.#notifyUnavailableAction(target, event, "That combat action is not available right now.")) return;

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

 async _onCombatAction(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (this.#notifyUnavailableAction(target, event, "That combat action is not available right now.")) return;
  if (!this.isEditable) return;

  const actionId = String(target?.dataset?.combatAction ?? "").trim();
  if (!actionId) return;

  try {
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const metadata = await this.#getCombatActionMetadata(actionId);
    if (!metadata) return;

    const result = await PersonalCombatTracker.executeAction(actorWriteTarget, {
      token: this.getSheetTokenDocument?.()
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor),
      actionId,
      metadata
    });

    if (!result?.ok) {
      ui.notifications?.warn(result?.reason ?? "Unable to perform action.");
      return;
    }

    this.#closeCombatMenu({ rerender: false });
    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Failed to perform combat action", error);
    ui.notifications?.error("Unable to perform action.");
  }
 }

 async _onRemoveActivationAction(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (!this.isEditable) return;

  const logIndex = Number(target?.dataset?.logIndex ?? -1);
  if (!Number.isInteger(logIndex) || logIndex < 0) return;

  try {
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const result = await PersonalCombatTracker.removeActivationLogEntry(actorWriteTarget, {
      token: this.getSheetTokenDocument?.()
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor),
      index: logIndex
    });

    if (!result?.ok) {
      ui.notifications?.warn(result?.reason ?? "Unable to remove action.");
      return;
    }

    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Failed to remove activation action", error);
    ui.notifications?.error("Unable to remove action.");
  }
 }

 async _onCombatReduceBurn(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (this.#notifyUnavailableAction(target, event, "Burn recovery is not available right now.")) return;

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

 async _onCombatAssist(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (this.#notifyUnavailableAction(target, event, "Assist is not available right now.")) return;
  if (!this.isEditable) return;

  try {
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const token = this.getSheetTokenDocument?.()
      ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
      ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor);
    const snapshot = PersonalCombatTracker.getSnapshot(actorWriteTarget, { token });

    if (!snapshot.hasCombatant) {
      ui.notifications?.warn("No combatant on the current scene.");
      return;
    }
    if (snapshot.isCurrentTurn) {
      ui.notifications?.warn("Only outside your activation.");
      return;
    }

    const assistTarget = await this.#promptAssistTarget(snapshot);
    if (!assistTarget) return;

    const result = await PersonalCombatTracker.executeAction(actorWriteTarget, {
      token,
      actionId: "assist",
      metadata: {
        targetCombatantId: assistTarget.combatantId,
        targetActorUuid: assistTarget.actorUuid,
        targetTokenUuid: assistTarget.tokenUuid,
        targetName: assistTarget.name
      }
    });

    if (!result?.ok) {
      ui.notifications?.warn(result?.reason ?? "Unable to assist.");
      return;
    }

    await this.#createAssistChatCard({
      actor: actorWriteTarget,
      token,
      target: assistTarget,
      costLabel: result.costLabel
    });

    this.#closeCombatMenu({ rerender: false });
    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Failed to assist", error);
    ui.notifications?.error("Unable to assist.");
  }
 }

 async _onCombatEvade(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (this.#notifyUnavailableAction(target, event, "Evade is not available right now.")) return;
  if (!this.isEditable) return;

  try {
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const token = this.getSheetTokenDocument?.()
      ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
      ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor);
    const result = await activatePendingEvadeFromCombatMenu(actorWriteTarget, { token });
    if (!result?.ok) {
      ui.notifications?.warn(result?.reason ?? "Unable to activate Evade.");
      return;
    }

    this.#closeCombatMenu({ rerender: false });
    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Failed to activate Evade", error);
    ui.notifications?.error("Unable to activate Evade.");
  }
 }

 async _onCombatInterrupt(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (this.#notifyUnavailableAction(target, event, "Interrupt is not available right now.")) return;
  if (!this.isEditable) return;

  try {
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const token = this.getSheetTokenDocument?.()
      ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
      ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor);
    const snapshot = PersonalCombatTracker.getSnapshot(actorWriteTarget, { token });
    const preparedInterrupt = PersonalCombatTracker.getPreparedInterrupt(snapshot);

    if (!snapshot.hasCombatant) {
      ui.notifications?.warn("No combatant on the current scene.");
      return;
    }
    if (snapshot.isCurrentTurn) {
      ui.notifications?.warn("Only outside your activation.");
      return;
    }
    if (!preparedInterrupt) {
      ui.notifications?.warn("Prepare an interrupt first.");
      return;
    }

    const confirmed = await this.#confirmInterrupt(preparedInterrupt);
    if (!confirmed) return;

    const result = await PersonalCombatTracker.executeAction(actorWriteTarget, {
      token,
      actionId: "interrupt",
      metadata: preparedInterrupt
    });

    if (!result?.ok) {
      ui.notifications?.warn(result?.reason ?? "Unable to interrupt.");
      return;
    }

    await PersonalCombatTracker.clearPreparedInterrupt(actorWriteTarget, { token });
    await this.#createInterruptChatCard({
      actor: actorWriteTarget,
      token,
      preparedInterrupt,
      costLabel: result.costLabel
    });

    this.#closeCombatMenu({ rerender: false });
    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Failed to interrupt", error);
    ui.notifications?.error("Unable to interrupt.");
  }
 }

 async _onCombatOverloadCheck(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (this.#notifyUnavailableAction(target, event, "Overload check is not available right now.")) return;

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

 async _onCombatAttack(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (this.#notifyUnavailableAction(target, event, "Attack is not available right now.")) return;

  if (!this.isEditable) return;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  const token = this.getSheetTokenDocument?.()
    ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
    ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor);
  const actionId = String(target?.dataset?.combatAction ?? "attack").trim() || "attack";
  const actionLabel = String(target?.dataset?.combatLabel ?? (actionId === "opportunity" ? "Opportunity" : "Attack")).trim() || "Attack";
  const isOpportunity = actionId === "opportunity";

  const snapshot = PersonalCombatTracker.getSnapshot(actorWriteTarget, { token });
  const hasAim = Boolean(snapshot.state?.actionState?.aim);
  if (!snapshot.hasCombatant) {
    ui.notifications?.warn("No combatant on the current scene.");
    return;
  }
  if (isOpportunity && snapshot.isCurrentTurn) {
    ui.notifications?.warn("Only outside your activation.");
    return;
  }
  if (!isOpportunity && !snapshot.isCurrentTurn) {
    ui.notifications?.warn("Only available during your activation.");
    return;
  }
  if (!isOpportunity && snapshot.overloaded) {
    ui.notifications?.warn("Overloaded actors can only recover Burn.");
    return;
  }
  if (!isOpportunity) {
    const activationCap = 3 + Math.floor((
      Math.max(0, Number(actorWriteTarget.system?.attributes?.reflexes?.value ?? 0))
      + Math.max(0, Number(actorWriteTarget.system?.attributes?.willpower?.value ?? 0))
    ) / 2);
    const saCapacityRemaining = Math.max(0, activationCap - Math.max(0, Number(snapshot.state?.saSpentThisActivation ?? 0)));
    if (saCapacityRemaining < 2) {
      ui.notifications?.warn("Activation SA cap reached.");
      return;
    }
  }

  const payload = {
    intent: "attack",
    mode: "auto",
    fallback: "unarmed",
    edge: { pool: "physical.grit", allowed: ["pre", "post"] },
    tags: isOpportunity ? ["combat", "attack", "reaction", "opportunity"] : ["combat", "attack"],
    aim: hasAim ? { active: true } : null,
    sourceTokenId: token?.id ?? null
  };

  try {
    const result = await game.mwd?.roll?.execute?.({ actor: actorWriteTarget, payload, event });
    this.#closeCombatMenu({ rerender: false });
    if (!result) {
      this.#renderPreservingScroll(false);
      return;
    }
    if (hasAim) {
      await PersonalCombatTracker.clearAim(actorWriteTarget, { token });
    }

    const spend = isOpportunity
      ? await PersonalCombatTracker.executeAction(actorWriteTarget, {
        token,
        actionId: "opportunity"
      })
      : await PersonalCombatTracker.spendResource(actorWriteTarget, {
        token,
        resource: "sa",
        cost: 2,
        actionId: "attack",
        actionLabel: "Attack",
        actionCostLabel: "2 SA",
        actionCategory: "complex"
      });

    if (!spend?.ok) {
      ui.notifications?.warn(spend?.reason ?? `Unable to spend ${actionLabel} action.`);
    }

    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error(`MWD | Failed to launch ${actionLabel}`, error);
    notifyRollError(error, `Unable to launch ${actionLabel}.`);
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
    selectedKey = await foundry.applications.api.DialogV2.prompt({
      window: { title: "Add Skill Specialization" },
      content,
      ok: {
        label: "Add",
        callback: (_event, button) => button.form.elements.specialization?.value ?? choices[0]?.key ?? ""
      }
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
      : itemType === "consumable"
        ? "Consumable"
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
  // Both gear and consumables use the same quantity stepper so authors can
  // adjust expendable stock directly from the character inventory.
  if (!item || !["gear", "consumable"].includes(String(item.canonicalType ?? item.type ?? "").trim())) return;

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

  if (this.#notifyUnavailableAction(target, event, "Equip that weapon before attacking.")) return;

  const item = this.#getOwnedItemFromTarget(target, event);
  if (!item?.isPersonalWeapon?.()) return;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  const token = this.getSheetTokenDocument?.()
    ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
    ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor);
  const result = await launchOwnedWeaponAttack({ weapon: item, event, token });
  if (!result) return;

  this.#renderPreservingScroll({ force: true });
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

 #bindInventoryAttackDrag() {
  const root = this._getRootElement?.();
  if (!root) return;

  this.#teardownInventoryAttackDrag();

  const controller = new AbortController();
  this.#inventoryAttackDragController = controller;

  root.addEventListener("dragstart", event => {
    const control = event.target?.closest?.("[data-weapon-attack-uuid]");
    if (!control || !root.contains(control)) return;

    const item = this.#getOwnedItemFromTarget(control, event);
    const dragData = item ? getOwnedWeaponAttackDragData(item) : null;
    if (!dragData) {
      event.preventDefault();
      return;
    }

    event.stopPropagation();
    event.dataTransfer?.setData("text/plain", JSON.stringify(dragData));
    if (event.dataTransfer) event.dataTransfer.effectAllowed = "copy";
  }, { signal: controller.signal });
 }

 #teardownInventoryAttackDrag() {
  this.#inventoryAttackDragController?.abort();
  this.#inventoryAttackDragController = null;
 }

 async #getCombatActionMetadata(actionId) {
  if (actionId !== "prepare") return {};

  const content = `
    <form class="mwd-quick-select">
      <div class="mwd-field">
        <label>Trigger</label>
        <input type="text" name="condition" placeholder="When..." />
      </div>
      <div class="mwd-field">
        <label>Scope</label>
        <input type="text" name="scope" placeholder="What you will do" />
      </div>
    </form>`;

  const result = await Dialog.prompt({
    title: "Prepare Interrupt",
    content,
    label: "Prepare",
    callback: html => ({
      condition: String(html.find('input[name="condition"]').val() ?? "").trim(),
      scope: String(html.find('input[name="scope"]').val() ?? "").trim()
    })
  });

  return result ? result : null;
 }

 async #confirmInterrupt(preparedInterrupt = {}) {
  const condition = String(preparedInterrupt?.condition ?? "").trim();
  const scope = String(preparedInterrupt?.scope ?? "").trim();
  const content = `
    <div class="mwd-quick-select">
      <p><strong>Trigger:</strong> ${escapeHtml(condition || "Unspecified trigger")}</p>
      <p><strong>Scope:</strong> ${escapeHtml(scope || "Unspecified response")}</p>
    </div>`;

  const result = await Dialog.confirm({
    title: "Resolve Interrupt",
    content,
    yes: () => true,
    no: () => false
  });

  return Boolean(result);
 }

 #getCombatants(combat) {
  if (!combat?.combatants) return [];
  if (typeof combat.combatants.values === "function") return Array.from(combat.combatants.values());
  return Array.from(combat.combatants ?? []);
 }

 #getAssistTargetChoices(snapshot) {
  const currentCombatantId = String(snapshot?.combatant?.id ?? "").trim();
  return this.#getCombatants(snapshot?.combat)
    .filter(combatant => combatant && String(combatant.id ?? "").trim() !== currentCombatantId)
    .map(combatant => {
      const tokenDoc = combatant.token?.document ?? combatant.token ?? null;
      const actor = combatant.actor ?? tokenDoc?.actor ?? null;
      const name = String(combatant.name ?? tokenDoc?.name ?? actor?.name ?? "Combatant").trim() || "Combatant";
      return {
        combatantId: String(combatant.id ?? "").trim(),
        actorUuid: actor?.uuid ?? null,
        tokenUuid: tokenDoc?.uuid ?? null,
        name
      };
    })
    .filter(choice => choice.combatantId && choice.name)
    .sort((left, right) => left.name.localeCompare(right.name));
 }

 async #promptAssistTarget(snapshot) {
  const choices = this.#getAssistTargetChoices(snapshot);
  if (!choices.length) {
    ui.notifications?.warn("No other combatants are available to assist.");
    return null;
  }

  const content = `
    <form class="mwd-quick-select">
      <div class="mwd-field">
        <label>Assist</label>
        <select name="combatant">
          ${choices.map(choice => `<option value="${escapeHtml(choice.combatantId)}">${escapeHtml(choice.name)}</option>`).join("")}
        </select>
      </div>
    </form>`;

  const selectedId = await Dialog.prompt({
    title: "Assist Combatant",
    content,
    label: "Assist",
    callback: html => String(html.find('select[name="combatant"]').val() ?? choices[0]?.combatantId ?? "").trim()
  });

  if (!selectedId) return null;
  return choices.find(choice => choice.combatantId === selectedId) ?? null;
 }

 async #createAssistChatCard({ actor, token = null, target = null, costLabel = "" } = {}) {
  const actorName = String(actor?.name ?? "Ally").trim() || "Ally";
  const targetName = String(target?.name ?? "an ally").trim() || "an ally";
  const cost = String(costLabel ?? "").trim();
  const content = `
    <div class="mwd-chat-card mwd-chat-card--assist">
      <h3>Assist</h3>
      <p><strong>${escapeHtml(actorName)}</strong> assists <strong>${escapeHtml(targetName)}</strong>.</p>
      ${cost ? `<p><small>Cost: ${escapeHtml(cost)}</small></p>` : ""}
    </div>`;

  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor, token: token?.object ?? token }),
    content
  });
 }

 async #createInterruptChatCard({ actor, token = null, preparedInterrupt = null, costLabel = "" } = {}) {
  const actorName = String(actor?.name ?? "Combatant").trim() || "Combatant";
  const condition = String(preparedInterrupt?.condition ?? "").trim();
  const scope = String(preparedInterrupt?.scope ?? "").trim();
  const cost = String(costLabel ?? "").trim();
  const content = `
    <div class="mwd-chat-card mwd-chat-card--interrupt">
      <h3>Interrupt</h3>
      <p><strong>${escapeHtml(actorName)}</strong> resolves a prepared interrupt.</p>
      ${condition ? `<p><strong>Trigger:</strong> ${escapeHtml(condition)}</p>` : ""}
      ${scope ? `<p><strong>Scope:</strong> ${escapeHtml(scope)}</p>` : ""}
      ${cost ? `<p><small>Cost: ${escapeHtml(cost)}</small></p>` : ""}
    </div>`;

  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor, token: token?.object ?? token }),
    content
  });
 }

 #notifyUnavailableAction(target, event, fallback = "That action is not available right now.") {
  const el =
    target?.closest?.("[data-action-disabled='true']")
    ?? event?.target?.closest?.("[data-action-disabled='true']");
  if (!el) return false;

  const reason = String(el.dataset?.actionReason ?? fallback).trim() || fallback;
  ui.notifications?.warn(reason);
  return true;
 }

 #inventoryAccordionId(section, itemId) {
  return `${String(section ?? "").trim()}:${String(itemId ?? "").trim()}`;
 }


}
