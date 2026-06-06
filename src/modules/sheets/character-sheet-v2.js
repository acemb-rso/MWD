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
  MWD_SKILLS,
  getOwnedSkillSpecializationKeys,
  getStoredSkillSpecializationKeys,
  getSkillSpecializationDefs,
  normalizeStoredSkillSpecializationKeys,
} from "../mwd/skills.js";
import {
  ATTRIBUTE_KEYS,
  EDGE_POOL_KEYS,
  PURCHASE_TYPES,
  commitPurchase,
  evaluateBuild,
  getAvailablePurchases,
  getCharacterXpState,
  previewPurchase,
} from "../advancement/character-advancement.js";
import { notifyRollError } from "../roll/roll-errors.js";
import { buildCriticalStatusSummary } from "../mwd/machine-summary.js";
import { buildBattlemechMovementActionChoices } from "../mwd/battlemech-movement-actions.js";
import { buildBattlemechMeleeProfiles } from "../mwd/battlemech-melee-actions.js";
import { buildBattlemechRangedAttackGroups } from "../mwd/battlemech-ranged-actions.js";
import {
  buildMachineCriticalRepairIssues,
  buildMachineEwActionChoices,
} from "../mwd/machine-quick-actions.js";
import { buildBattleArmorSheetContext } from "../mwd/battle-armor.js";
import { resolvePersonalCritRemedyIntent } from "../mwd/personal-crit-intents.js";
import {
  getQualityCategoryLabel,
  getQualityTierLabel,
  normalizeQualityTraitSystem,
} from "../mwd/traits.js";
import { getOwnedWeaponAttackDragData } from "../roll/weapon-attack-actions.js";
import {
  buildPersonalCombatDashboardContext,
  buildPersonalConditionMonitors,
  buildPersonalActiveCriticalsContext,
  buildPersonalInventoryContext,
  buildPersonalSpeedContext,
} from "./actor-sheet-support.js";

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

function getActorItems(actor = null) {
  const items = actor?.items;
  if (!items) return [];
  if (Array.isArray(items)) return items;
  if (Array.isArray(items.contents)) return items.contents;
  if (typeof items[Symbol.iterator] === "function") return Array.from(items);
  return [];
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
  return await foundry.applications.api.DialogV2.prompt({
    window: { title },
    content,
    ok: {
      label: confirmLabel,
      callback: (_event, button) => String(button.form.elements.selection?.value ?? choices[0]?.value ?? "").trim(),
    },
  });
}

export class CharacterSheetV2 extends BaseActorSheetV2 {
  #pendingScrollRestore = null;
  #expandedInventoryRows = new Set();
  #inventoryAttackDragController = null;
  #linkedMechHookId = null;
  #advancementOpen = false;

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
      personalCritRemedy: CharacterSheetV2.prototype._onPersonalCritRemedy,
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
      openAssignedMech: CharacterSheetV2.prototype._onOpenAssignedMech,
      mechAttack: CharacterSheetV2.prototype._onMechAttack,
      mechMovement: CharacterSheetV2.prototype._onMechMovement,
      mechRoll: CharacterSheetV2.prototype._onMechRoll,
      openAdvancementMode: CharacterSheetV2.prototype._onOpenAdvancementMode,
      closeAdvancementMode: CharacterSheetV2.prototype._onCloseAdvancementMode,
      commitAdvancementPurchase: CharacterSheetV2.prototype._onCommitAdvancementPurchase,
      openAdvancementDialog: CharacterSheetV2.prototype._onOpenAdvancementDialog,
      addKnowledgeSkill: CharacterSheetV2.prototype._onAddKnowledgeSkill,
      removeKnowledgeSkill: CharacterSheetV2.prototype._onRemoveKnowledgeSkill,
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
    ctx.conditionMonitors = buildPersonalConditionMonitors(this.actor, {
      editable: this.isEditable,
    });
    const combatSnapshot = PersonalCombatTracker.getSnapshot(this.actor, { token: sheetToken });

    const burn = Number(this.actor.system?.burn?.value ?? 0);
    const burnDisplayMax = 10;
    const burnThreshold = combatSnapshot.burn?.threshold ?? this.actor.overloadThreshold;
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
      canOverloadCheck: combatSnapshot.burn?.canOverloadCheck ?? false,
      overloaded: !!this.actor.system?.burn?.overloaded
    };
    ctx.combatDashboard = buildPersonalCombatDashboardContext(combatSnapshot, { actor: this.actor });
    ctx.activePersonalCriticals = buildPersonalActiveCriticalsContext(this.actor);
    ctx.personalSpeed = buildPersonalSpeedContext(this.actor);
    ctx.battleArmor = buildBattleArmorSheetContext(this.actor);
    ctx.combatAwarenessPreview = buildCombatAwarenessPreview(this.actor, {
      sourceToken: sheetToken,
    });

    ctx.combatActions = this._buildCombatActionsContext(
      PersonalCombatTracker.buildActionModel(this.actor, combatSnapshot)
    );

    ctx.personalInventory = buildPersonalInventoryContext(this.actor, {
      items: ctx.items,
      isEditable: this.isEditable,
      isExpanded: accordionId => this.#expandedInventoryRows.has(accordionId),
      inventoryAccordionId: (section, itemId) => this.#inventoryAccordionId(section, itemId),
      armorModifierLabels: ARMOR_MODIFIER_LABELS,
      gearCategoryLabels: GEAR_CATEGORY_LABELS,
      consumableCategoryLabels: CONSUMABLE_CATEGORY_LABELS,
    });

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
      xpAvailable:     Math.max(0, Number(sys.counters?.xp?.total ?? 0) - Number(sys.counters?.xp?.value ?? 0)),
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

    ctx.knowledgeSkills = (Array.isArray(sys.knowledgeSkills) ? sys.knowledgeSkills : [])
      .map(label => String(label ?? "").trim())
      .filter(Boolean)
      .map(label => ({ label }));
    ctx.advancement = this.#buildAdvancementContext();

    ctx.assignedMech = await this._buildAssignedMech();

    return ctx;
  }

  #buildAdvancementContext() {
    const actor = this.getPersistentActor?.() ?? this.actor;
    const system = actor?.system ?? {};
    const xp = getCharacterXpState(actor);
    const build = evaluateBuild(actor, {
      tier: system?.biography?.experienceLevel ?? "green",
    });
    const negativeTraits = getActorItems(actor)
      .filter(item => (item?.canonicalType ?? item?.type) === "quality")
      .filter(item => normalizeQualityTraitSystem(item.system ?? {}).category === "negative");
    return {
      open: this.#advancementOpen,
      xp,
      build,
      negativeTraits,
    };
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
    this.#restoreScrollPosition();
    this.#bindInventoryAttackDrag();
    this.#bindLinkedMechHook();
  }

  async close(options = {}) {
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

 async _onPersonalCritRemedy(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  if (!this.isEditable) return;

  const critId = String(target?.dataset?.critId ?? "").trim();
  const remedyKey = String(target?.dataset?.remedyKey ?? "").trim();
  if (!critId) return;

  try {
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const result = await resolvePersonalCritRemedyIntent({
      actor: actorWriteTarget,
      token: this.getSheetTokenDocument?.()
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actorWriteTarget)
        ?? PersonalCombatTracker.getCurrentSceneTokenDocument(this.actor),
      critId,
      remedyKey,
    });
    if (!result?.ok) {
      ui.notifications?.warn(result?.reason ?? "Unable to remedy personal critical.");
      return;
    }
    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Failed to remedy personal critical", error);
    ui.notifications?.error("Unable to remedy personal critical.");
  }
}

 _onOpenAdvancementMode(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  this.#advancementOpen = true;
  this.#renderPreservingScroll({ force: true });
 }

 _onCloseAdvancementMode(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  this.#advancementOpen = false;
  this.#renderPreservingScroll({ force: true });
 }

 #advancementIntentFromTarget(target = null) {
  return {
    type: String(target?.dataset?.purchaseType ?? "").trim(),
    target: String(target?.dataset?.purchaseTarget ?? "").trim(),
    to: target?.dataset?.purchaseTo,
    label: String(target?.dataset?.purchaseLabel ?? "").trim(),
    specializationKey: String(target?.dataset?.specializationKey ?? "").trim(),
    specializationLabel: String(target?.dataset?.specializationLabel ?? "").trim(),
  };
 }

 async _onOpenAdvancementDialog(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  if (!this.isEditable) return;
  const dialogType = String(target?.dataset?.dialog ?? "").trim();
  if (!dialogType) return;
  const actor = this.getPersistentActor?.() ?? this.actor;
  const allPurchases = getAvailablePurchases(actor);
  switch (dialogType) {
    case "attribute": return this.#openAdvancementCheckboxDialog(actor, "Raise Attribute", allPurchases.filter(p => p.intent.type === PURCHASE_TYPES.attribute));
    case "skill": return this.#openAdvancementCheckboxDialog(actor, "Raise Skill", allPurchases.filter(p => p.intent.type === PURCHASE_TYPES.skill));
    case "edgePool": return this.#openAdvancementCheckboxDialog(actor, "Raise Edge Pool", allPurchases.filter(p => p.intent.type === PURCHASE_TYPES.edgePool));
    case "specialization": return this.#openSpecializationPickerDialog(actor);
    case "traitAdd": return this.#openTraitAddDialog(actor);
    case "traitRemove": return this.#openTraitRemoveDialog(actor);
  }
 }

 async #openAdvancementCheckboxDialog(actor, title, previews) {
  if (!previews.length) {
   ui.notifications?.info(`No available purchases for ${title}.`);
   return;
  }
  const xp = getCharacterXpState(actor);
  const rows = previews.map(p => {
   const cls = p.legal ? "" : " mwd-adv-dialog__row--disabled";
   const disabledAttr = p.legal ? "" : " data-initially-disabled disabled";
   return `<label class="mwd-adv-dialog__row${cls}" title="${escapeHtml(p.errors.join(" "))}">
    <input type="checkbox" name="sel" value="${escapeHtml(p.intent.target)}" data-cost="${p.cost}" data-to="${p.intent.to}" data-type="${escapeHtml(p.intent.type)}"${disabledAttr}>
    <span class="mwd-adv-dialog__name">${escapeHtml(p.label)}</span>
    <span class="mwd-adv-dialog__cost">${p.cost} XP</span>
   </label>`;
  }).join("");
  const content = `<div class="mwd-adv-dialog">
   <div class="mwd-adv-dialog__xp-bar">
    <span><strong>${xp.available}</strong> XP available</span>
   </div>
   <div class="mwd-adv-dialog__rows">${rows}</div>
  </div>`;

  let intents;
  try {
   intents = await foundry.applications.api.DialogV2.prompt({
    window: { title },
    position: { width: 480 },
    content,
    ok: {
     label: "Purchase",
     callback: (_event, button) => {
      const checked = Array.from(button.form.querySelectorAll("input[type=checkbox]:checked"));
      return checked.map(inp => ({ type: inp.dataset.type, target: inp.value, to: Number(inp.dataset.to) }));
     },
    },
   });
  } catch { return; }

  if (!Array.isArray(intents) || !intents.length) return;
  for (const intent of intents) {
   try {
    await commitPurchase(actor, intent);
   } catch (error) {
    console.error("MWD | Advancement purchase failed", error);
    ui.notifications?.warn(error?.message ?? "Unable to commit advancement purchase.");
    break;
   }
  }
  this.#renderPreservingScroll({ force: true });
 }

 async #openSpecializationPickerDialog(actor) {
  const system = actor?.system ?? {};
  const eligible = MWD_SKILLS.flatMap(skill => {
   const rating = Math.max(0, Number(system?.skills?.[skill.code]?.rating ?? 0) || 0);
   if (rating < 2) return [];
   const ownedKeys = getOwnedSkillSpecializationKeys(system, skill.code);
   const available = getSkillSpecializationDefs(skill.code).filter(c => !ownedKeys.includes(c.key));
   if (!available.length) return [];
   const hasSpec = ownedKeys.length > 0;
   const type = hasSpec ? PURCHASE_TYPES.specializationChange : PURCHASE_TYPES.specializationAdd;
   const cost = hasSpec ? 2 : 4;
   return [{ code: skill.code, label: skill.label, type, cost, action: hasSpec ? "Change" : "Add" }];
  });

  if (!eligible.length) {
   ui.notifications?.info("No skills eligible for specialization. Skills need rating 2+ and available specialization choices.");
   return;
  }

  const optionHtml = eligible.map(s =>
   `<option value="${escapeHtml(s.code)}" data-type="${escapeHtml(s.type)}">${escapeHtml(s.label)} — ${s.action} (${s.cost} XP)</option>`
  ).join("");
  const content = `<div class="mwd-adv-dialog"><div class="mwd-field"><label>Skill</label><select name="skillCode">${optionHtml}</select></div></div>`;

  let picked;
  try {
   picked = await foundry.applications.api.DialogV2.prompt({
    window: { title: "Manage Specialization" },
    position: { width: 360 },
    content,
    ok: {
     label: "Continue",
     callback: (_event, button) => {
      const sel = button.form.elements.skillCode;
      const opt = sel?.options?.[sel.selectedIndex];
      return { code: String(sel?.value ?? "").trim(), type: String(opt?.dataset?.type ?? PURCHASE_TYPES.specializationAdd).trim() };
     },
    },
   });
  } catch { return; }

  if (!picked?.code) return;
  let intent = { type: picked.type, target: picked.code };
  try {
   intent = await this.#promptSpecializationIntent(intent);
   if (!intent?.specializationKey) return;
   const actorWriteTarget = this.getPersistentActor?.() ?? this.actor;
   await commitPurchase(actorWriteTarget, intent);
   this.#renderPreservingScroll({ force: true });
  } catch (error) {
   console.error("MWD | Specialization purchase failed", error);
   ui.notifications?.warn(error?.message ?? "Unable to commit specialization.");
  }
 }

 async #openTraitAddDialog(actor) {
  const xp = getCharacterXpState(actor);
  const cost = previewPurchase(actor, { type: PURCHASE_TYPES.traitAdd, target: "Positive Trait" }).cost;
  const content = `<div class="mwd-adv-dialog">
   <div class="mwd-adv-dialog__xp-bar">
    <span>Cost: <strong>${cost} XP</strong></span>
    <span><strong>${xp.available}</strong> XP available</span>
   </div>
   <div class="mwd-field"><label>Trait Name</label><input type="text" name="traitName" placeholder="e.g., Quick Reflexes" autofocus></div>
  </div>`;

  let traitName;
  try {
   traitName = await foundry.applications.api.DialogV2.prompt({
    window: { title: "Buy Positive Trait" },
    position: { width: 360 },
    content,
    ok: {
     label: "Purchase",
     callback: (_event, button) => String(button.form.elements.traitName?.value ?? "").trim(),
    },
   });
  } catch { return; }

  if (!traitName) return;
  try {
   await commitPurchase(actor, { type: PURCHASE_TYPES.traitAdd, target: traitName, label: traitName });
   this.#renderPreservingScroll({ force: true });
  } catch (error) {
   console.error("MWD | Trait add failed", error);
   ui.notifications?.warn(error?.message ?? "Unable to buy positive trait.");
  }
 }

 async #openTraitRemoveDialog(actor) {
  const negTraits = getActorItems(actor)
   .filter(item => (item?.canonicalType ?? item?.type) === "quality")
   .filter(item => normalizeQualityTraitSystem(item.system ?? {}).category === "negative");

  if (!negTraits.length) {
   ui.notifications?.info("No negative traits to remove.");
   return;
  }

  const xp = getCharacterXpState(actor);
  const rows = negTraits.map(item => {
   const preview = previewPurchase(actor, { type: PURCHASE_TYPES.traitRemove, target: item.uuid ?? item.id });
   const cls = preview.legal ? "" : " mwd-adv-dialog__row--disabled";
   const disabledAttr = preview.legal ? "" : " data-initially-disabled disabled";
   return `<label class="mwd-adv-dialog__row${cls}" title="${escapeHtml(preview.errors.join(" "))}">
    <input type="checkbox" name="sel" value="${escapeHtml(item.uuid ?? item.id)}" data-cost="${preview.cost}"${disabledAttr}>
    <span class="mwd-adv-dialog__name">${escapeHtml(item.name ?? "Trait")}</span>
    <span class="mwd-adv-dialog__cost">${preview.cost} XP</span>
   </label>`;
  }).join("");

  const content = `<div class="mwd-adv-dialog">
   <div class="mwd-adv-dialog__xp-bar">
    <span><strong>${xp.available}</strong> XP available</span>
   </div>
   <div class="mwd-adv-dialog__rows">${rows}</div>
  </div>`;

  let targets;
  try {
   targets = await foundry.applications.api.DialogV2.prompt({
    window: { title: "Remove Negative Trait" },
    position: { width: 420 },
    content,
    ok: {
     label: "Remove Selected",
     callback: (_event, button) => Array.from(button.form.querySelectorAll("input[type=checkbox]:checked")).map(inp => inp.value),
    },
   });
  } catch { return; }

  if (!Array.isArray(targets) || !targets.length) return;
  for (const target of targets) {
   try {
    await commitPurchase(actor, { type: PURCHASE_TYPES.traitRemove, target });
   } catch (error) {
    console.error("MWD | Trait remove failed", error);
    ui.notifications?.warn(error?.message ?? "Unable to remove negative trait.");
    break;
   }
  }
  this.#renderPreservingScroll({ force: true });
 }

 async #promptSpecializationIntent(intent) {
  if (intent.type !== PURCHASE_TYPES.specializationAdd && intent.type !== PURCHASE_TYPES.specializationChange) return intent;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  const ownedKeys = getOwnedSkillSpecializationKeys(actorWriteTarget.system ?? {}, intent.target);
  const choices = getSkillSpecializationDefs(intent.target)
    .filter(choice => !ownedKeys.includes(choice.key));
  if (!choices.length) return intent;

  const content = `<form class="mwd-quick-select"><div class="mwd-field"><label>Specialization</label><select name="specialization">${choices.map(choice => `<option value="${escapeHtml(choice.key)}">${escapeHtml(choice.label)}</option>`).join("")}</select></div></form>`;
  const selectedKey = await foundry.applications.api.DialogV2.prompt({
    window: { title: intent.type === PURCHASE_TYPES.specializationChange ? "Change Specialization" : "Add Specialization" },
    content,
    ok: {
      label: "Select",
      callback: (_event, button) => String(button.form.elements.specialization?.value ?? choices[0]?.key ?? "").trim()
    }
  });
  const selected = choices.find(choice => choice.key === selectedKey) ?? choices[0];
  return {
    ...intent,
    specializationKey: selected?.key ?? "",
    specializationLabel: selected?.label ?? "",
  };
 }

 async _onCommitAdvancementPurchase(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  if (!this.isEditable) return;

  const actorWriteTarget = this.getPersistentActor() ?? this.actor;
  let intent = this.#advancementIntentFromTarget(target);
  if (!intent.type) return;
  if (intent.type === PURCHASE_TYPES.traitAdd) {
    const root = target?.closest?.(".mwd-advancement") ?? event?.target?.closest?.(".mwd-advancement");
    const input = root?.querySelector?.("input[name='mwdTraitName']");
    const label = String(input?.value ?? "").trim();
    if (label) {
      intent.target = label;
      intent.label = label;
    }
  }

  try {
    intent = await this.#promptSpecializationIntent(intent);
    await commitPurchase(actorWriteTarget, intent);
    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Advancement purchase failed", error);
    ui.notifications?.warn(error?.message ?? "Unable to commit advancement purchase.");
  }
 }

 async _onAddKnowledgeSkill(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  if (!this.isEditable) return;

  const root = target?.closest?.(".mwd-advancement") ?? event?.target?.closest?.(".mwd-advancement");
  const input = root?.querySelector?.("input[name='mwdKnowledgeSkill']");
  const label = String(input?.value ?? "").trim();
  if (!label) return;

  try {
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    await commitPurchase(actorWriteTarget, {
      type: PURCHASE_TYPES.knowledgeSkillAdd,
      target: label,
      label,
    });
    if (input) input.value = "";
    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Add Knowledge Skill failed", error);
    ui.notifications?.warn(error?.message ?? "Unable to add Knowledge Skill.");
  }
 }

 async _onRemoveKnowledgeSkill(event, target) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  if (!this.isEditable) return;

  const label = String(target?.dataset?.knowledgeSkill ?? "").trim();
  if (!label) return;

  try {
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    await commitPurchase(actorWriteTarget, {
      type: PURCHASE_TYPES.knowledgeSkillRemove,
      target: label,
      label,
    });
    this.#renderPreservingScroll({ force: true });
  } catch (error) {
    console.error("MWD | Remove Knowledge Skill failed", error);
    ui.notifications?.warn(error?.message ?? "Unable to remove Knowledge Skill.");
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
  if (ownedKeys.length > 0) {
    ui.notifications?.warn("A skill can only have one specialization.");
    return;
  }
  if (Number(actorWriteTarget.system?.skills?.[skillKey]?.rating ?? 0) < 2) {
    ui.notifications?.warn("Specializations require skill rating 2+.");
    return;
  }
  const choices = getSkillSpecializationDefs(skillKey);

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
