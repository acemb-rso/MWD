// src/modules/sheets/vehicle-sheet-v2.js
// Purpose: Layout-driven AppV2 vehicle sheet that prepares semantic view models for dumb templates.
// How it fits: Serves as the base vehicle-scale V2 sheet and the reuse target for BattleMech sheets.

import { MWD } from "../core/config.js";
import { SYSTEM_NAME, TEMPLATES_PATH, startCase } from "../core/constants.js";
import { buildCombatAwarenessPreview } from "../combat/combat-awareness-preview.js";
import { getActiveStatusSummaries, openTokenStatusDialog } from "../dialog/token-status-dialog.js";
import { LayoutRegistry } from "../layout/layout-registry.js";
import { getActiveMachineCrits } from "../mwd/critical-hits.js";
import { getMachineCritRemedy } from "../mwd/machine-crit-remedies.js";
import { buildMachineEwPanel, resolveMachineEwActionTarget } from "../mwd/machine-ew-panel.js";
import { describeMachineCriticalEffect } from "../mwd/machine-crit-effects.js";
import {
  getMachineConditionLabel,
  getMachineConditionModifier,
  getMachineDegradationLocationPriority,
  getMachineReliabilityThreshold,
  MACHINE_CONDITION_LABELS,
  MACHINE_CONDITION_STAGES,
  normalizeMachineDegradationState,
} from "../mwd/machine-degradation.js";
import {
  buildMachineDegradationEffectSummary,
  getMachineMovementEffects,
  getMachineRuleState,
} from "../mwd/machine-state-effects.js";
import {
  appendMachineHardpoint,
  assignMachineHardpointOccupant,
  doesHardpointAcceptItem,
  getAssignedMachineItemIds,
  getHardpointCompatibilityError,
  getConfiguredMachineHardpoints,
  normalizeMachineHardpoints,
  rawHardpointsArray,
  reconcileMachineHardpoints,
  removeMachineHardpointById,
  updateMachineHardpointSettings,
} from "../mwd/machine-hardpoints.js";
import { getMachineLocationLabel } from "../mwd/machine-hit-locations.js";
import { buildRemainingMonitorTrack } from "../mwd/machine-summary.js";
import { buildMachineMovementFields, buildMachineMovementSummaryParts } from "../mwd/machine-movement.js";
import { buildVehicleMovementActionChoices } from "../mwd/vehicle-movement-actions.js";
import {
  buildMachineCriticalRepairIssues,
  buildMachineEwActionChoices,
} from "../mwd/machine-quick-actions.js";
import { MWD_SKILLS } from "../mwd/skills.js";
import { buildVehicleProfileSummary, VEHICLE_FLIGHT_SUBTYPES, VEHICLE_MOVEMENT_PROFILES, VEHICLE_TERRAIN_CLASSES } from "../mwd/vehicle-profiles.js";
import { buildVehicleRangedWeapons, performVehicleRangedAttack } from "../mwd/vehicle-ranged-actions.js";
import { buildMachineMeleeProfiles, performMachineMeleeAttack } from "../mwd/battlemech-melee-actions.js";
import {
  buildChargeActionChoices,
  buildControlChargeIntentChoices,
  performChargeAttack,
} from "../mwd/charge-attack-actions.js";
import { buildVehicleStrainModel } from "../mwd/vehicle-strain.js";
import { resolveBattlemechJumpProfile } from "../mwd/battlemech-mobility.js";
import { getSkillDef } from "../mwd/skills.js";
import { cachePendingTokenPosition } from "../mwd/token-measurement.js";
import { resolveMachineSceneToken } from "../mwd/machine-token-resolution.js";
import { resolveMachineOperator } from "../mwd/machine-operator.js";
import { normalizeMachineWeaponGroups, pruneWeaponGroupsToMountedItems } from "../mwd/machine-weapon-group-state.js";
import { buildMachineStealthModel } from "../mwd/machine-stealth.js";
import { notifyRollError } from "../roll/roll-errors.js";
import { Misc } from "../utils/misc.js";
import { BaseActorSheetV2 } from "./base-actor-sheet-v2.js";
import { SelectActor } from "../dialog/select-actor.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { buildAssetModuleSummary } from "../mwd/asset-module-effects.js";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function compactList(values = []) {
  return values
    .map(value => String(value ?? "").trim())
    .filter(Boolean);
}

function getPilotSkillRating(actor = null, skillKey = "") {
  const key = String(skillKey ?? "").trim();
  if (!actor || !key) return 0;
  return Math.max(0, toNumber(
    actor.getSkillRating?.(key)
      ?? actor.system?.skills?.[key]?.rating,
    0
  ));
}

function buildTrainedPilotSkillGroups(pilotActor = null) {
  const groups = new Map([
    ["strength", { label: "Strength", skills: [] }],
    ["reflexes", { label: "Reflexes", skills: [] }],
    ["intelligence", { label: "Intelligence", skills: [] }],
    ["guts", { label: "Guts", skills: [] }],
    ["charisma", { label: "Charisma", skills: [] }],
  ]);

  for (const skill of MWD_SKILLS) {
    const rating = getPilotSkillRating(pilotActor, skill.code);
    if (rating <= 0) continue;
    const group = groups.get(skill.attribute);
    if (!group) continue;
    group.skills.push({ ...skill, rating });
  }

  return Array.from(groups.values()).filter(group => group.skills.length);
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

function getMachineActionService() {
  return game.mwd?.machineActions ?? game.system?.mwd?.machineActions ?? null;
}

async function executeMachineAction(actor, request = {}) {
  const service = getMachineActionService();
  if (!service?.execute) throw new Error("MWD machine action service not initialized.");
  return service.execute(actor, request);
}

const HARDPOINT_TYPE_CODES = Object.freeze({
  energy: "ENG",
  ballistic: "BAL",
  missile: "MSL",
  omni: "OMNI",
});

function buildSummaryStats(stats = []) {
  return stats
    .map(stat => {
      const data = stat ?? {};
      return {
        ...data,
        label: String(data.label ?? "").trim(),
        value: String(data.value ?? "").trim(),
        emphasis: data.emphasis ?? "",
        title: String(data.title ?? "").trim(),
        tone: String(data.tone ?? "").trim(),
        parts: Array.isArray(data.parts)
          ? data.parts
            .filter(part => part && part.value !== undefined && part.value !== null && String(part.value).trim() !== "")
            .map(part => ({
              label: String(part.label ?? "").trim(),
              value: String(part.value ?? "").trim(),
              tone: String(part.tone ?? "").trim(),
              title: String(part.title ?? "").trim(),
            }))
          : [],
      };
    })
    .filter(stat => stat.value !== "" || stat.parts.length)
    .map(stat => ({
      ...stat,
      hasParts: stat.parts.length > 0,
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

function getHardpointTypeCode(type = "") {
  const normalized = String(type ?? "").trim().toLowerCase();
  if (HARDPOINT_TYPE_CODES[normalized]) return HARDPOINT_TYPE_CODES[normalized];
  return startCase(normalized).slice(0, 3).toUpperCase() || "SLOT";
}

function formatRangeSummary(range = {}) {
  const orderedKeys = ["close", "near", "far", "extreme", "max"];
  const entries = orderedKeys
    .filter(key => range?.[key] !== undefined && range?.[key] !== null && String(range[key]).trim() !== "")
    .map(key => {
      const value = range[key];
      if (key === "max") return `Max ${startCase(value)}`;
      return `${startCase(key)} ${toNumber(value, 0)}`;
    });
  return entries.join(" | ");
}

const VEHICLE_ATTRIBUTE_LABELS = Object.freeze({
  handling: "Handling",
  system: "System",
  chassis: "Chassis",
  reliability: "Reliability",
});

const ITEM_TYPE_LABELS = Object.freeze({
  mechWeapon: "Machine Weapon",
  vehicleWeapon: "Vehicle Weapon",
  personalWeapon: "Personal Weapon",
  assetModule: "Asset Module",
  vehicleUpgrade: "Vehicle Upgrade",
  mechEquipment: "Mech Equipment",
  gear: "Gear",
  quality: "Trait",
  skill: "Skill",
});

function getActorJumpProfile(actor = null) {
  return actor?.type === "battlemech"
    ? resolveBattlemechJumpProfile(actor)
    : actor?.system?.mwd?.mobility?.jumping ?? null;
}

const DEGRADATION_LAYOUTS = Object.freeze({
  battlemech: Object.freeze({
    artPath: "systems/mwd/img/mek/misc/repair/location_mek.png",
    mode: "silhouette",
    positions: Object.freeze({
      head: Object.freeze({ top: "9%", left: "50%" }),
      torso: Object.freeze({ top: "40%", left: "50%" }),
      arms: Object.freeze({ top: "34%", left: "18%" }),
      legs: Object.freeze({ top: "75%", left: "50%" }),
    }),
  }),
  vehicle: Object.freeze({
    artPath: "",
    mode: "schematic",
    positions: Object.freeze({
      body: Object.freeze({ top: "51%", left: "50%" }),
      turret: Object.freeze({ top: "29%", left: "50%" }),
      mobility: Object.freeze({ top: "77%", left: "50%" }),
    }),
  }),
});

function getDegradationTone({ condition = 0, destroyed = false, stress = 0 } = {}) {
  if (destroyed) return "dark-red";
  if (Number(condition ?? 0) >= 4) return "red";
  if (Number(condition ?? 0) >= 3) return "orange";
  if (Number(condition ?? 0) >= 2) return "yellow";
  if (Number(stress ?? 0) > 0) return "green";
  return "";
}

export class VehicleSheetV2 extends BaseActorSheetV2 {
  static LAYOUT_ID = "vehicle";

  static PARTS = {
    sheet: {
      get template() {
        return `${TEMPLATES_PATH}/v2/actor/vehicle-sheet.hbs`;
      },
    }
  };

  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ["vehicle-sheet", SYSTEM_NAME, "actor-sheet-v2", "mwd-vehicle-sheet", "mwd-sheet"],
    window: { minWidth: 520, minHeight: 720, resizable: true },
    position: { width: 940, height: 900 },
    actions: {
      ...super.DEFAULT_OPTIONS.actions,
      createOwnedItem: VehicleSheetV2.prototype._onCreateOwnedItem,
      editOwnedItem: VehicleSheetV2.prototype._onEditOwnedItem,
      deleteOwnedItem: VehicleSheetV2.prototype._onDeleteOwnedItem,
      toggleInventoryAccordion: VehicleSheetV2.prototype._onToggleInventoryAccordion,
      addHardpoint: VehicleSheetV2.prototype._onAddHardpoint,
      deleteHardpoint: VehicleSheetV2.prototype._onDeleteHardpoint,
      createHardpointItem: VehicleSheetV2.prototype._onCreateHardpointItem,
      assignHardpointItem: VehicleSheetV2.prototype._onAssignHardpointItem,
      clearHardpointItem: VehicleSheetV2.prototype._onClearHardpointItem,
      machineWeaponAttack: VehicleSheetV2.prototype._onMachineWeaponAttack,
      vehicleAttack: VehicleSheetV2.prototype._onVehicleAttack,
      vehicleMeleeAttack: VehicleSheetV2.prototype._onVehicleMeleeAttack,
      vehicleChargeAttack: VehicleSheetV2.prototype._onVehicleChargeAttack,
      vehicleMovement: VehicleSheetV2.prototype._onVehicleMovement,
      vehicleRoll: VehicleSheetV2.prototype._onVehicleRoll,
      openStrainDialog: VehicleSheetV2.prototype._onOpenStrainDialog,
      ewAcquire: VehicleSheetV2.prototype._onEwAcquire,
      ewTarget: VehicleSheetV2.prototype._onEwTarget,
      machineEwAction: VehicleSheetV2.prototype._onMachineEwAction,
      signatureGoDark: VehicleSheetV2.prototype._onSignatureGoDark,
      toggleStatuses: VehicleSheetV2.prototype._onToggleStatuses,
      machineCritRemedy: VehicleSheetV2.prototype._onMachineCritRemedy,
      toggleAssetModuleActive: VehicleSheetV2.prototype._onToggleAssetModuleActive,
      assignPilot: VehicleSheetV2.prototype._onAssignPilot,
      removePilot: VehicleSheetV2.prototype._onRemovePilot,
      openPilot: VehicleSheetV2.prototype._onOpenPilot,
    }
  }, { inplace: false });

  #expandedInventoryRows = new Set();
  #hardpointDragController = null;
  #hardpointConfigController = null;
  #ewHookIds = [];

  async close(options = {}) {
    this.#teardownEwHooks();
    this.#hardpointConfigController?.abort();
    this.#hardpointDragController?.abort();
    return super.close(options);
  }

  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    ctx._mwdThemeClass = game.system?.mwd?.styles?.selectCssClass?.() ?? "";
    ctx.layout = await LayoutRegistry.get(this.constructor.LAYOUT_ID ?? VehicleSheetV2.LAYOUT_ID);
    const actor = this.getPersistentActor?.() ?? this.actor;
    const token = this.getSheetTokenDocument?.() ?? this._resolveStatusToken(actor);
    const activeStatuses = getActiveStatusSummaries(actor);
    ctx.combatAwarenessPreview = buildCombatAwarenessPreview(actor, {
      sourceToken: token,
    });

    ctx.vehicleSheet = {
      summaryStats: this._buildSummaryStats(),
      summaryActions: this._buildSummaryActions(),
      alerts: this._buildAlerts(),
      quickActions: this._buildQuickActions(),
      strain: this._buildStrainModel(),
      movementProfile: this._buildMovementProfilePanel(),
      crewPanel: this._buildCrewPanel(),
      statusAction: {
        label: "Statuses",
        activeStatuses,
        summaryTitle: activeStatuses.map(status => status.label).join(", "),
        disabled: !this._resolveStatusToken(actor),
        reason: "Statuses require a token for this actor on the current scene.",
      },
      ewPanel: this._buildEwPanel(),
      signature: this._buildSignaturePanel(actor),
      activeCrits: this._buildActiveCrits(),
      attributes: this._buildAttributeCards(),
      movement: this._buildMovementCards(),
      degradation: this._buildDegradationPanel(),
      hardpoints: this._buildMachineHardpoints(),
      hardpointOptions: this._buildHardpointOptions(),
      sections: this._buildVehicleSections(),
      pilotPanel: await this._buildPilotPanel(),
    };
    ctx.conditionMonitors = this._buildConditionMonitors();
    return ctx;
  }

  async _buildPilotPanel() {
    const actor = this.getPersistentActor?.() ?? this.actor;
    const pilotUuid = String(actor.system?.pilot?.uuid ?? "").trim();
    let pilotActor = null;
    if (pilotUuid) {
      try { pilotActor = await fromUuid(pilotUuid); } catch (_) {}
    }
    return {
      uuid: pilotUuid,
      linked: !!pilotActor,
      name: pilotActor?.name ?? null,
      id: pilotActor?.id ?? null,
      canEdit: !!this.isEditable,
    };
  }

  _buildSignaturePanel(actor = null) {
    const stealth = actor?.system?.mwd?.stealth ?? {};
    const model = buildMachineStealthModel(actor);
    const counters = Array.isArray(model.counteredBy) && model.counteredBy.length
      ? model.counteredBy.join(", ")
      : "None";
    return {
      enabled: Boolean(stealth.enabled),
      rating: Math.max(0, toNumber(stealth.rating, 0)),
      mode: model.mode,
      modeOptions: ["passive", "active", "suppressed"].map(mode => ({
        value: mode,
        label: startCase(mode),
        selected: model.mode === mode,
      })),
      detectionCap: String(stealth.detectionCap ?? ""),
      signature: String(stealth.signature ?? ""),
      notes: String(stealth.notes ?? ""),
      effectiveRating: model.effectiveRating,
      baseRating: model.baseRating,
      contributionRating: model.contributionRating,
      revealedLabel: model.revealed ? "Yes" : "No",
      revealPenalty: model.revealPenalty,
      emissionRating: model.emission?.effectiveEmissionRating ?? 0,
      authoredEmissionRating: model.emission?.authoredEmissionRating ?? 0,
      transientEmissionRating: model.emission?.transientEmissionRating ?? 0,
      statusEmissionRating: model.emission?.statusEmissionRating ?? 0,
      counters,
      parts: model.parts.map(part => ({
        label: part.label,
        value: Number(part.value ?? 0),
        displayValue: `${Number(part.value ?? 0) >= 0 ? "+" : ""}${Number(part.value ?? 0) || 0}`,
      })),
    };
  }

  async _onAssignPilot(event, target) {
    if (!this.isEditable) return;
    const characters = (game.actors?.contents ?? []).filter(a => a.type === "character");
    if (!characters.length) {
      ui.notifications?.warn("No character actors found in this world.");
      return;
    }
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    await SelectActor.selectActor(
      "Assign Pilot",
      characters,
      async (actor) => actorWriteTarget.update({ "system.pilot.uuid": actor.uuid }),
    );
  }

  async _onRemovePilot(event, target) {
    if (!this.isEditable) return;
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    await actorWriteTarget.update({ "system.pilot.uuid": "" });
  }

  async _onOpenPilot(event, target) {
    const actor = this.getPersistentActor?.() ?? this.actor;
    const uuid = String(actor.system?.pilot?.uuid ?? "").trim();
    if (!uuid) return;
    const pilot = await fromUuid(uuid).catch(() => null);
    if (pilot) pilot.sheet.render(true, { focus: true });
  }

  async _onDrop(event) {
    if (!this.isEditable) return super._onDrop?.(event);
    let data;
    try { data = (foundry.applications.ux.TextEditor?.implementation ?? TextEditor).getDragEventData(event); } catch (_) {}
    if (await this._handleHardpointItemDrop(event, data)) {
      return;
    }
    if (data?.type === "Actor") {
      const dropped = await fromUuid(data.uuid).catch(() => null);
      if (dropped?.type === "character") {
        const actorWriteTarget = this.getPersistentActor() ?? this.actor;
        await actorWriteTarget.update({ "system.pilot.uuid": dropped.uuid });
        return;
      }
    }
    return super._onDrop?.(event);
  }

  _onRender(context, options) {
    super._onRender?.(context, options);
    this.#bindHardpointDragDrop();
    this.#bindHardpointConfigChanges();
    this.#bindEwHooks();
  }

  _buildSummaryStats() {
    const attributes = this.actor.system?.attributes ?? {};
    const structure = this.actor.system?.monitors?.structure ?? {};
    const movementParts = buildMachineMovementSummaryParts({
      actorType: this.actor.type,
      movement: this.actor.system?.movement,
      legacyMoves: this.actor.system?.moves,
      jumpProfile: getActorJumpProfile(this.actor),
      movementEffects: getMachineMovementEffects(this.actor),
    });

    return buildSummaryStats([
      { label: "Handling", value: toNumber(attributes.handling?.value, 0), emphasis: "strong" },
      { label: "Move", parts: movementParts },
      { label: "System", value: toNumber(attributes.system?.value, 0) },
      { label: "Chassis", value: toNumber(attributes.chassis?.value, 0) },
      { label: "Reliability", value: toNumber(attributes.reliability?.value ?? attributes.condition?.value, 0) },
      { label: "Structure", value: `${toNumber(structure.value, 0)} / ${toNumber(structure.max, 0)}` },
    ]);
  }

  _buildAlerts() {
    return [];
  }

  _buildSummaryActions() {
    return [];
  }

  _buildQuickActions() {
    if (this.actor.type !== "vehicle") return [];
    const actor = this.getPersistentActor?.() ?? this.actor;
    const rangedWeapons = buildVehicleRangedWeapons(actor);
    const meleeProfiles = buildMachineMeleeProfiles(actor);
    const movementChoices = buildVehicleMovementActionChoices(actor);
    const enabledMovementChoices = movementChoices.filter(choice => !choice.disabled);
    const enabledEwActions = buildMachineEwActionChoices(actor, {
      token: this._resolveStatusToken(actor),
    });

    return [
      {
        label: "Movement",
        hint: enabledMovementChoices.length
          ? "Move action"
          : "No moves",
        handler: "vehicleMovement",
        disabled: enabledMovementChoices.length === 0,
        dataset: {},
      },
      {
        label: "Mounted Fire",
        hint: rangedWeapons.length
          ? "Ranged attack"
          : "No weapons",
        handler: "vehicleAttack",
        disabled: rangedWeapons.length === 0,
        dataset: {},
      },
      {
        label: "Melee",
        hint: meleeProfiles.length
          ? "Melee attack"
          : "No profiles",
        handler: "vehicleMeleeAttack",
        disabled: meleeProfiles.length === 0,
        dataset: {},
      },
      {
        label: "Maneuvers",
        hint: "Charge attack",
        handler: "vehicleChargeAttack",
        disabled: false,
        dataset: {},
      },
      {
        label: "Piloting Check",
        hint: "Piloting check",
        handler: "vehicleRoll",
        disabled: false,
        dataset: { rollKind: "piloting" },
      },
      {
        label: "Electronic Warfare",
        hint: enabledEwActions.length ? "EW action" : "No EW actions",
        handler: "vehicleRoll",
        disabled: enabledEwActions.length === 0,
        dataset: { rollKind: "sensor" },
      },
      {
        label: "Repair",
        hint: "Repair action",
        handler: "vehicleRoll",
        disabled: false,
        dataset: { rollKind: "repair" },
      },
    ];
  }

  _buildStrainModel() {
    if (this.actor.type !== "vehicle") return null;
    const strain = buildVehicleStrainModel(this.actor);
    const thresholds = strain.thresholds ?? {};
    return {
      ...strain,
      editable: Boolean(this.isEditable),
      segments: Array.from({ length: strain.max }, (_, index) => {
        const value = index + 1;
        const band = value >= thresholds.critical
          ? "critical"
          : value >= thresholds.overstressed
            ? "overstressed"
            : value >= thresholds.strained
              ? "strained"
              : "normal";
        return {
          value,
          filled: value <= strain.value,
          current: value === strain.value,
          band,
          bandLabel: startCase(band),
        };
      }),
    };
  }

  _buildMovementProfilePanel() {
    if (this.actor.type !== "vehicle") return null;
    const profile = buildVehicleProfileSummary(this.actor.system ?? {});
    const profileOptions = Object.values(VEHICLE_MOVEMENT_PROFILES).map(definition => ({
      value: definition.key,
      label: definition.label,
      selected: definition.key === profile.key,
    }));
    const flightSubtypeOptions = Object.entries(VEHICLE_FLIGHT_SUBTYPES).map(([value, label]) => ({
      value,
      label,
      selected: value === profile.flightSubtype,
    }));
    const terrainOptions = VEHICLE_TERRAIN_CLASSES.map(value => ({
      value,
      label: startCase(value),
    }));
    return {
      ...profile,
      profileOptions,
      flightSubtypeOptions,
      terrainOptions,
      favoredTerrainText: profile.favoredTerrain.map(startCase).join(", "),
      adverseTerrainText: profile.adverseTerrain.map(startCase).join(", "),
      affordanceText: profile.affordances.map(startCase).join(", "),
      profilePath: "system.mwd.movementProfile",
      flightSubtypePath: "system.mwd.flightSubtype",
      favoredTerrainPath: "system.mwd.favoredTerrain",
      adverseTerrainPath: "system.mwd.adverseTerrain",
    };
  }

  _buildCrewPanel() {
    const crew = this.actor.system?.mwd?.crew ?? {};
    return {
      count: toNumber(crew.count, 1),
      effectiveCount: toNumber(crew.effectiveCount ?? crew.count, 1),
      injuryLevel: toNumber(crew.injuryLevel, 0),
      bailedOut: Boolean(crew.bailedOut),
      countPath: "system.mwd.crew.count",
      effectiveCountPath: "system.mwd.crew.effectiveCount",
      injuryLevelPath: "system.mwd.crew.injuryLevel",
      bailedOutPath: "system.mwd.crew.bailedOut",
      summary: compactList([
        `${toNumber(crew.effectiveCount ?? crew.count, 1)} / ${toNumber(crew.count, 1)} effective`,
        toNumber(crew.injuryLevel, 0) > 0 ? `Injury ${toNumber(crew.injuryLevel, 0)}` : "",
        crew.bailedOut ? "Bailed Out" : "",
      ]).join(" | "),
    };
  }

  _buildEwPanel() {
    const actor = this.getPersistentActor?.() ?? this.actor;
    const token = this._resolveStatusToken(actor);
    return buildMachineEwPanel({ actor, token });
  }

  _buildAttributeCards() {
    const attributes = this.actor.system?.attributes ?? {};
    return Object.entries(VEHICLE_ATTRIBUTE_LABELS).map(([key, label]) => ({
      key,
      label,
      value: toNumber(attributes?.[key]?.value, 0),
      path: `system.attributes.${key}.value`,
    }));
  }

  _buildMovementCards() {
    return buildMachineMovementFields({
      actorType: this.actor.type,
      movement: this.actor.system?.movement,
      legacyMoves: this.actor.system?.moves,
      editing: this.editing,
      jumpProfile: getActorJumpProfile(this.actor),
      movementEffects: getMachineMovementEffects(this.actor),
    });
  }

  _buildDegradationPanel() {
    const normalizedSystem = normalizeMachineDegradationState(
      foundry.utils.deepClone(this.actor.system ?? {}),
      this.actor.type,
    );
    const attributes = normalizedSystem.attributes ?? {};
    const mwd = normalizedSystem.mwd ?? {};
    const reliability = toNumber(attributes.reliability?.value ?? attributes.condition?.value, 0);
    const threshold = getMachineReliabilityThreshold(reliability);
    const shock = toNumber(mwd.shock?.value, 0);
    const spendable = toNumber(mwd.reliabilitySpendable?.value, reliability);
    const machineState = getMachineRuleState(this.actor);
    const movementEffects = getMachineMovementEffects(this.actor);
    const layout = DEGRADATION_LAYOUTS[this.actor.type] ?? DEGRADATION_LAYOUTS.vehicle;
    const priority = getMachineDegradationLocationPriority(this.actor.type);
    const entries = Object.entries(mwd.locations ?? {}).sort(([leftKey], [rightKey]) => {
      const leftIndex = priority.indexOf(leftKey);
      const rightIndex = priority.indexOf(rightKey);
      const safeLeft = leftIndex >= 0 ? leftIndex : Number.MAX_SAFE_INTEGER;
      const safeRight = rightIndex >= 0 ? rightIndex : Number.MAX_SAFE_INTEGER;
      if (safeLeft !== safeRight) return safeLeft - safeRight;
      return String(leftKey).localeCompare(String(rightKey));
    });
    const conditionOptions = Object.entries(MACHINE_CONDITION_LABELS).map(([value, label]) => ({
      value: Number(value),
      label,
    }));

    const locations = entries.map(([key, location]) => {
      const conditionValue = toNumber(location?.condition, 0);
      const stress = toNumber(location?.stress, 0);
      const destroyed = Boolean(location?.destroyed);
      const tone = getDegradationTone({ condition: conditionValue, destroyed, stress });
      const position = layout.positions[key] ?? { top: "50%", left: "50%" };
      return {
        key,
        label: getMachineLocationLabel(key),
        stress,
        stressPath: `system.mwd.locations.${key}.stress`,
        conditionValue,
        conditionPath: `system.mwd.locations.${key}.condition`,
        conditionLabel: getMachineConditionLabel(conditionValue),
        conditionModifier: getMachineConditionModifier(conditionValue),
        conditionOptions: conditionOptions.map(opt => ({ ...opt, selected: opt.value === conditionValue })),
        destroyed,
        effectSummary: buildMachineDegradationEffectSummary(this.actor.type, key, location),
        enabled: location?.enabled !== false,
        tone,
        style: `--pin-top:${position.top}; --pin-left:${position.left};`,
        stressLabel: stress > 0 ? `Stress ${stress}` : "Stress 0",
      };
    });

    return {
      mode: layout.mode,
      artPath: layout.artPath,
      reliability,
      spendable,
      shock,
      threshold,
      shockPath: "system.mwd.shock.value",
      spendablePath: "system.mwd.reliabilitySpendable.value",
      summaryEffects: machineState.effectTexts ?? [],
      movementEffects,
      locations,
    };
  }

  _buildConditionMonitors() {
    const structure = this.actor.system?.monitors?.structure ?? this.actor.system?.mwd?.monitors?.structure ?? {};
    const armor = this.actor.system?.monitors?.armor ?? {};
    return [
      buildRemainingMonitorTrack({ id: "structure", label: "Structure", kind: "structure", monitor: structure, editable: this.isEditable }),
      buildRemainingMonitorTrack({ id: "armor", label: "Armor", kind: "armor", monitor: armor, editable: this.isEditable }),
    ];
  }

  _buildVehicleSections() {
    const buckets = Misc.classify(this.actor.items);
    return {
      slots: this._buildHardpointSlotSection(),
      upgrades: this._buildRecordSection({
        sectionId: "upgrades",
        itemType: "vehicleUpgrade",
        addLabel: "Add Upgrade",
        emptyLabel: "No vehicle upgrades installed.",
        items: buckets.vehicleUpgrade ?? [],
      }),
      modules: this._buildRecordSection({
        sectionId: "modules",
        itemType: "assetModule",
        addLabel: "Add Module",
        emptyLabel: "No asset modules assigned.",
        items: buckets.assetModule ?? [],
      }),
      gear: this._buildRecordSection({
        sectionId: "gear",
        itemType: "gear",
        addLabel: "Add Gear",
        emptyLabel: "No stored gear or consumables.",
        items: [
          ...(buckets.gear ?? []),
          ...(buckets.consumable ?? []),
        ],
      }),
    };
  }

  _buildHardpointSlotSection() {
    const actor = this.getPersistentActor?.() ?? this.actor;
    const configuredHardpoints = getConfiguredMachineHardpoints(actor);
    const slotRecords = configuredHardpoints.map((hardpoint, index) =>
      this._buildHardpointSlotRecord(hardpoint, index)
    );

    return {
      sectionId: "slots",
      itemType: "",
      addLabel: "",
      emptyLabel: "No hardpoint slots configured.",
      records: slotRecords,
    };
  }

  _buildMachineHardpoints() {
    const actor = this.getPersistentActor?.() ?? this.actor;
    const configured = getConfiguredMachineHardpoints(actor);
    const loadout = Array.from(actor.system?.mwd?.loadout?.hardpoints ?? []);
    const slottedItemById = new Map(this._getHardpointSlottableItems()
      .map(item => [String(item?.id ?? "").trim(), item])
      .filter(([id]) => id));
    const loadoutById = new Map(loadout.map((hardpoint, index) => [
      String(hardpoint?.id ?? `hardpoint-${index + 1}`),
      hardpoint,
    ]));
    const typeLabels = this._getHardpointTypeLabels();
    const sizeLabels = this._getHardpointSizeLabels();
    const locationLabels = this._getHardpointLocationLabels();
    const hardpointOptions = this._buildHardpointOptions();

    return configured.map((hardpoint, index) => {
      const id = String(hardpoint?.id ?? `hardpoint-${index + 1}`);
      const occupancy = loadoutById.get(id) ?? {};
      const type = String(hardpoint?.type ?? occupancy?.type ?? "energy").trim() || "energy";
      const size = String(hardpoint?.size ?? occupancy?.size ?? "small").trim() || "small";
      const location = String(hardpoint?.location ?? occupancy?.location ?? "").trim()
        || this._getDefaultHardpointLocation();
      const occupiedByName = String(
        slottedItemById.get(String(hardpoint?.itemId ?? "").trim())?.name
        ?? occupancy?.occupiedByName
        ?? ""
      ).trim();

      return {
        id,
        index,
        itemId: String(hardpoint?.itemId ?? "").trim(),
        type,
        size,
        location,
        typeLabel: typeLabels[type] ?? startCase(type),
        sizeLabel: sizeLabels[size] ?? startCase(size),
        locationLabel: locationLabels[location] ?? startCase(location),
        occupiedByName,
        occupancyLabel: occupiedByName || "Open",
        typeOptions: hardpointOptions.types.map(option => ({ ...option, selected: option.value === type })),
        sizeOptions: hardpointOptions.sizes.map(option => ({ ...option, selected: option.value === size })),
        locationOptions: hardpointOptions.locations.map(option => ({ ...option, selected: option.value === location })),
      };
    });
  }

  _buildHardpointOptions() {
    return {
      types: Object.entries(this._getHardpointTypeLabels()).map(([value, label]) => ({ value, label })),
      sizes: Object.entries(this._getHardpointSizeLabels()).map(([value, label]) => ({ value, label })),
      locations: this._getAvailableHardpointLocations().map(value => ({
        value,
        label: this._getHardpointLocationLabels()[value] ?? startCase(value),
      })),
    };
  }

  _getHardpointTypeLabels() {
    return MWD?.mwd?.hardpointType ?? MWD?.mwd?.hardpoint?.type ?? {};
  }

  _getHardpointSizeLabels() {
    return MWD?.mwd?.hardpointSize ?? MWD?.mwd?.hardpoint?.size ?? {};
  }

  _getHardpointLocationLabels() {
    return MWD?.mwd?.hardpointLocation ?? MWD?.mwd?.hardpoint?.location ?? {};
  }

  _getAvailableHardpointLocations() {
    return this.actor?.type === "battlemech"
      ? ["arms", "head", "torso"]
      : ["front", "side", "rear", "turret"];
  }

  async _commitEditsToActor() {
    await super._commitEditsToActor();
    await this._persistStagedHardpointFields();
  }

  _getCompatibleHardpointItems(hardpoint, { includeAssignedItem = false } = {}) {
    const actor = this.getPersistentActor?.() ?? this.actor;
    const assignedItemIds = getAssignedMachineItemIds(actor);
    const currentItemId = String(hardpoint?.itemId ?? "").trim();
    return this._getHardpointSlottableItems().filter(item => {
      const itemId = String(item?.id ?? "").trim();
      if (!itemId) return false;
      if (!includeAssignedItem && assignedItemIds.has(itemId) && itemId !== currentItemId) return false;
      return doesHardpointAcceptItem(hardpoint, item);
    });
  }

  #bindHardpointDragDrop() {
    const root = this._getRootElement?.();
    if (!root) return;

    this.#hardpointDragController?.abort();
    const controller = new AbortController();
    this.#hardpointDragController = controller;

    root.addEventListener("dragstart", event => {
      const record = event.target?.closest?.(".mwd-record[data-item-id][draggable='true']");
      if (!record || !root.contains(record)) return;

      const item = this._getOwnedItemFromTarget(record, event);
      const dragData = item?.toDragData?.() ?? (item?.uuid ? {
        type: "Item",
        uuid: item.uuid,
      } : null);
      if (!dragData) {
        event.preventDefault();
        return;
      }

      event.stopPropagation();
      event.dataTransfer?.setData("text/plain", JSON.stringify(dragData));
      if (event.dataTransfer) event.dataTransfer.effectAllowed = "copyMove";
    }, { signal: controller.signal });

    root.addEventListener("dragover", event => {
      const hardpointSlot = event.target?.closest?.(".mwd-record[data-hardpoint-id]");
      if (!hardpointSlot || !root.contains(hardpointSlot)) return;
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
    }, { signal: controller.signal });
  }

  #bindHardpointConfigChanges() {
    const root = this._getRootElement?.();
    if (!root) return;

    this.#hardpointConfigController?.abort();
    const controller = new AbortController();
    this.#hardpointConfigController = controller;

    root.addEventListener("change", event => {
      const field = event.target?.closest?.("[data-hardpoint-field]");
      if (!field || !root.contains(field)) return;
      void this.#onHardpointConfigChange(field);
    }, { signal: controller.signal });
  }

  async #onHardpointConfigChange(field) {
    if (!this.isEditable) return;

    const row = field?.closest?.("[data-hardpoint-config][data-hardpoint-id]");
    const hardpointId = String(row?.dataset?.hardpointId ?? "").trim();
    if (!row || !hardpointId) return;

    const settings = this._collectHardpointRowSettings(row);
    if (!settings) return;

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const result = updateMachineHardpointSettings(
      rawHardpointsArray(actorWriteTarget),
      hardpointId,
      settings,
      { defaultLocation: this._getDefaultHardpointLocation() },
    );
    if (!result.changed) return;

    await actorWriteTarget.update({ "system.mwd.hardpoints": result.hardpoints });
  }

  async _handleHardpointItemDrop(event, data = null) {
    const hardpointSlot = event?.target?.closest?.(".mwd-record[data-hardpoint-id]");
    if (!hardpointSlot) return false;

    const hardpointId = String(hardpointSlot.dataset?.hardpointId ?? "").trim();
    if (!hardpointId) return false;

    const persistedHardpoints = await this._persistStagedHardpointFields();

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const hardpoint = persistedHardpoints.find(entry => entry.id === hardpointId);
    if (!hardpoint) return false;

    if (String(hardpoint?.itemId ?? "").trim()) {
      ui.notifications?.warn("That hardpoint is already filled.");
      return true;
    }

    const droppedItem = await this._resolveDroppedHardpointItem(data);
    if (!droppedItem) {
      if (String(data?.type ?? "").trim() === "Item") {
        ui.notifications?.warn("That item could not be mounted into this hardpoint.");
        return true;
      }
      return false;
    }

    const compatibilityError = getHardpointCompatibilityError(hardpoint, droppedItem);
    if (compatibilityError) {
      ui.notifications?.warn(compatibilityError);
      return true;
    }

    let targetItemId = String(droppedItem?.id ?? "").trim();
    const isOwnedByActor = droppedItem?.parent === actorWriteTarget || droppedItem?.actor === actorWriteTarget;

    if (!isOwnedByActor) {
      const sourceData = foundry.utils.deepClone(droppedItem.toObject?.() ?? droppedItem ?? {});
      delete sourceData._id;
      const created = await actorWriteTarget.createEmbeddedDocuments("Item", [sourceData]);
      targetItemId = String(created?.[0]?.id ?? "").trim();
    }

    if (!targetItemId) {
      ui.notifications?.warn("That item could not be mounted.");
      return true;
    }

    await this._setHardpointOccupant(hardpointId, targetItemId, { hardpoints: persistedHardpoints });
    this.render({ force: true });
    return true;
  }

  async _resolveDroppedHardpointItem(data = null) {
    if (!data) return null;
    if (data?.type !== "Item") return null;

    const itemDocumentClass = CONFIG?.Item?.documentClass ?? globalThis.Item ?? null;
    if (typeof itemDocumentClass?.fromDropData === "function") {
      const resolved = await itemDocumentClass.fromDropData(data).catch(() => null);
      if (resolved) return resolved;
    }

    const actor = this.getPersistentActor?.() ?? this.actor;
    const itemId = String(data?.itemId ?? data?._id ?? data?.id ?? "").trim();
    const actorId = String(data?.actorId ?? data?.parentId ?? "").trim();
    if (itemId && actorId && actorId === String(actor?.id ?? "").trim()) {
      const owned = actor?.items?.get?.(itemId) ?? null;
      if (owned) return owned;
    }

    const dropped = data?.uuid
      ? await fromUuid(data.uuid).catch(() => null)
      : null;
    if (!dropped && data?.data && typeof itemDocumentClass === "function") {
      return new itemDocumentClass(data.data, { parent: actor });
    }
    if (!dropped) return null;

    return dropped;
  }

  async _promptHardpointAssignment(hardpoint) {
    const compatibleItems = this._getCompatibleHardpointItems(hardpoint);
    if (!compatibleItems.length) return "";
    if (compatibleItems.length === 1) return compatibleItems[0].id ?? "";

    const content = `<form class="mwd-quick-select">${compatibleItems.map((item, index) => `
      <label class="quick-select-option">
        <input type="radio" name="slot-item" value="${item.id}" ${index === 0 ? "checked" : ""}>
        <span>${item.name}</span>
      </label>`).join("")}</form>`;

    return await Dialog.prompt({
      title: "Assign Hardpoint Item",
      content,
      label: "Assign",
      callback: html => html.find('input[name="slot-item"]:checked').val() ?? compatibleItems[0].id,
    });
  }

  async _setHardpointOccupant(hardpointId = "", itemId = "", { hardpoints = null } = {}) {
    const normalizedHardpointId = String(hardpointId ?? "").trim();
    if (!normalizedHardpointId) return;

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const result = assignMachineHardpointOccupant(
      hardpoints ?? rawHardpointsArray(actorWriteTarget),
      normalizedHardpointId,
      itemId,
      { defaultLocation: this._getDefaultHardpointLocation() },
    );

    if (result.changed) {
      await actorWriteTarget.update({ "system.mwd.hardpoints": result.hardpoints });
    }

    await this._sanitizeMountedWeaponGroups(actorWriteTarget);
  }

  async _deleteMountedHardpointItem(hardpointId = "") {
    const normalizedHardpointId = String(hardpointId ?? "").trim();
    if (!normalizedHardpointId) return;

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const hardpoint = getConfiguredMachineHardpoints(actorWriteTarget).find(entry => entry.id === normalizedHardpointId);
    const itemId = String(hardpoint?.itemId ?? "").trim();
    if (!itemId) return;

    const item = actorWriteTarget.items?.get?.(itemId) ?? null;
    if (!item) return;

    await actorWriteTarget.deleteEmbeddedDocuments("Item", [itemId]);
  }

  _getHardpointSlottableItems() {
    const actor = this.getPersistentActor?.() ?? this.actor;
    return Array.from(actor?.items ?? []).filter(item => {
      const canonicalType = String(item?.canonicalType ?? item?.type ?? "").trim();
      return canonicalType === "mechWeapon";
    });
  }

  _buildHardpointSlotRecord(hardpoint, index = 0) {
    const actor = this.getPersistentActor?.() ?? this.actor;
    const slotId = String(hardpoint?.id ?? `hardpoint-${index + 1}`).trim();
    const type = String(hardpoint?.type ?? "").trim();
    const size = String(hardpoint?.size ?? "").trim();
    const location = String(hardpoint?.location ?? "").trim() || this._getDefaultHardpointLocation();
    const typeLabels = this._getHardpointTypeLabels();
    const sizeLabels = this._getHardpointSizeLabels();
    const locationLabels = this._getHardpointLocationLabels();
    const itemId = String(hardpoint?.itemId ?? "").trim();
    const item = itemId ? actor?.items?.get?.(itemId) ?? null : null;
    const profile = typeof item?.getCombatProfile === "function" ? item.getCombatProfile() : null;
    const accordionId = `slot:${slotId}`;
    const typeLabel = typeLabels[type] ?? startCase(type);
    const sizeLabel = sizeLabels[size] ?? startCase(size);
    const locationLabel = locationLabels[location] ?? startCase(location);

    if (!item) {
      return {
        id: "",
        hardpointId: slotId,
        accordionId,
        className: "is-hardpoint-slot is-empty-hardpoint",
        mediaClassName: "is-slot-placeholder",
        isExpanded: this.#expandedInventoryRows.has(accordionId),
        isEmptyHardpoint: true,
        slotTypeCode: getHardpointTypeCode(type),
        slotSizeCode: sizeLabel.slice(0, 1).toUpperCase() || "S",
        slotOpenLabel: "Open",
        img: "systems/mwd/img/default/Default_Weapon.svg",
        name: `Empty ${typeLabel} ${sizeLabel} Slot`,
        subtitle: `${locationLabel} mount available`,
        summaryStats: buildSummaryStats([
          { label: "Mount", value: `${typeLabel} ${sizeLabel}`, emphasis: "strong" },
          { label: "Status", value: "Open", tone: "green" },
        ]),
        detailTags: buildDetailTags(["Open Hardpoint", typeLabel, sizeLabel]),
        detailRows: buildDetailRows([
          { label: "Location", value: locationLabel },
          { label: "Accepts", value: `${sizeLabel} ${typeLabel} weapons` },
          { label: "Assigned Weapon", value: "Empty" },
        ]),
        detailText: "Drag a matching mech weapon item onto this slot, or create one directly for this slot.",
        createHardpointItem: {
          hardpointId: slotId,
          itemType: "mechWeapon",
          label: "Create Weapon for Slot",
        },
      };
    }

    const canonicalType = item?.canonicalType ?? item?.type ?? "";
    const itemTypeLabel = ITEM_TYPE_LABELS[canonicalType] ?? startCase(canonicalType || "item");
    const notes = item?.system?.notes ?? item?.system?.description ?? item?.system?.references?.description ?? "";

    return {
      id: item.id ?? "",
      hardpointId: slotId,
      accordionId,
      className: "is-hardpoint-slot is-occupied-hardpoint",
      isExpanded: this.#expandedInventoryRows.has(accordionId),
      name: item.name ?? itemTypeLabel,
      img: item.img ?? "icons/svg/item-bag.svg",
      subtitle: `${itemTypeLabel} | ${locationLabel}`,
      summaryStats: profile
        ? buildSummaryStats([
            { label: "DV", value: toNumber(profile.damage, 0), emphasis: "strong" },
            { label: "AP", value: toNumber(profile.ap, 0) },
            { label: "Type", value: profile.damageTypeLabel ?? profile.damageType ?? "" },
          ])
        : buildSummaryStats([
            { label: "Type", value: itemTypeLabel, emphasis: "strong" },
            { label: "Slot", value: sizeLabels[size] ?? startCase(size) },
          ]),
      detailTags: buildDetailTags([
        "Mounted",
        typeLabel,
      ]),
      detailRows: buildDetailRows([
        { label: "Slot Type", value: typeLabel },
        { label: "Slot Size", value: sizeLabel },
        { label: "Location", value: locationLabel },
        { label: "Assigned Item", value: item.name ?? itemTypeLabel },
      ]),
      detailText: toSnippet(notes),
      suppressDeleteButton: true,
      clearHardpointItem: {
        hardpointId: slotId,
        label: "Empty Slot",
        hint: "Delete the attached weapon and leave this slot open.",
        icon: "fa-trash-can",
        buttonClassName: "is-danger",
        inlineLabel: "Empty Slot",
      },
      machineAttack: canonicalType === "mechWeapon"
        ? { label: "Attack", itemId: item.id ?? "" }
        : null,
    };
  }

  _buildRecordSection({ sectionId = "", itemType = "", addLabel = "", emptyLabel = "", items = [] } = {}) {
    return {
      sectionId,
      itemType,
      addLabel: String(addLabel ?? "").trim(),
      emptyLabel: String(emptyLabel ?? "Nothing here yet.").trim(),
      records: Array.from(items ?? []).map(item => this._buildItemRecord(item, { sectionId })),
    };
  }

  _buildItemRecord(item, { sectionId = "" } = {}) {
    const system = item?.system ?? {};
    const canonicalType = item?.canonicalType ?? item?.type ?? "";
    const profile = typeof item?.getCombatProfile === "function" ? item.getCombatProfile() : null;
    const assetModuleSummary = canonicalType === "assetModule" ? buildAssetModuleSummary(item) : null;
    const activationMode = String(system.activation?.mode ?? "passive").trim() || "passive";
    const supportsModuleActivation = canonicalType === "assetModule" && ["toggle", "mode"].includes(activationMode);
    const moduleActive = Boolean(system.activation?.active);
    const moduleReady = canonicalType === "assetModule" && !system.inactive;
    const accordionId = `${String(sectionId ?? "").trim()}:${String(item?.id ?? "").trim()}`;
    const itemTypeLabel = ITEM_TYPE_LABELS[canonicalType] ?? startCase(canonicalType || "item");
    const notes = system.notes ?? system.description ?? system.references?.description ?? "";
    const quantity = system.quantity;
    const summaryStats = profile
      ? buildSummaryStats([
        { label: "DV", value: toNumber(profile.damage, 0), emphasis: "strong" },
        { label: "AP", value: toNumber(profile.ap, 0) },
        { label: "Type", value: profile.damageTypeLabel ?? profile.damageType ?? "" },
      ])
      : canonicalType === "assetModule" && system?.mobility?.jumping?.enabled
        ? buildSummaryStats([
          { label: "Type", value: itemTypeLabel },
          { label: "Jump", value: toNumber(system.mobility.jumping.movement, 0), emphasis: "strong" },
          { label: "Heat", value: toNumber(system.mobility.jumping.heat, 0) },
        ])
      : buildSummaryStats([
        { label: "Type", value: itemTypeLabel },
        ...(quantity !== undefined ? [{ label: "Qty", value: toNumber(quantity, 0) }] : []),
      ]);
    const detailRows = profile
      ? buildDetailRows([
        { label: "Skill", value: profile.skillDef?.label ?? profile.skill ?? "" },
        { label: "Category", value: profile.category ?? system.weaponCategory ?? system.category ?? "" },
        { label: "Range", value: formatRangeSummary(profile.range) },
      ])
      : canonicalType === "assetModule" && system?.mobility?.jumping?.enabled
        ? buildDetailRows([
          { label: "Category", value: system.category ?? itemTypeLabel },
          { label: "Activation", value: startCase(activationMode) },
          { label: "Heat", value: toNumber(system.mobility.jumping.heat, 0) },
          { label: "AR Bonus", value: toNumber(system.mobility.jumping.attackRatingBonus, 0) },
          { label: "DR Bonus", value: toNumber(system.mobility.jumping.defenseRatingBonus, 0) },
          { label: "DFA", value: system.mobility.jumping.dfaEnabled ? "Enabled" : "Disabled" },
          { label: "Effects", value: assetModuleSummary?.summary ?? "" },
        ])
      : canonicalType === "assetModule"
        ? buildDetailRows([
          { label: "Category", value: system.category ?? itemTypeLabel },
          { label: "Activation", value: startCase(activationMode) },
          { label: "Effects", value: assetModuleSummary?.summary ?? "" },
        ])
      : buildDetailRows([
        { label: "Category", value: system.category ?? itemTypeLabel },
        { label: "Quantity", value: quantity !== undefined ? toNumber(quantity, 0) : "" },
      ]);

    return {
      id: item?.id ?? "",
      accordionId,
      isExpanded: this.#expandedInventoryRows.has(accordionId),
      name: item?.name ?? itemTypeLabel,
      img: item?.img ?? "icons/svg/item-bag.svg",
      subtitle: profile?.skillDef?.label ?? system.category ?? itemTypeLabel,
      summaryStats,
      detailTags: buildDetailTags([
        system.equipped ? "Equipped" : "",
        system.isPrimary ? "Primary" : "",
        canonicalType === "assetModule" ? (moduleReady ? "Ready" : "Inactive") : "",
        supportsModuleActivation ? (moduleActive ? "Active" : "Standby") : "",
        system.mobility?.jumping?.enabled ? "Jumping" : "",
        system.weaponCategory ?? system.category ?? "",
      ]),
      detailRows,
      detailText: toSnippet(assetModuleSummary?.summary || notes),
      equipped: Boolean(system.equipped),
      isPrimary: Boolean(system.isPrimary),
      supportsModuleActivation,
      moduleActive,
      moduleReady,
      canAdjustQuantity: false,
      machineAttack: ["mechWeapon", "vehicleWeapon"].includes(canonicalType)
        ? {
          label: "Attack",
          itemId: item?.id ?? "",
        }
        : null,
    };
  }

  async _onCreateOwnedItem(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!this.isEditable) return;

    const itemType = String(target?.dataset?.itemType ?? "").trim();
    if (!itemType) return;

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const label = ITEM_TYPE_LABELS[itemType] ?? startCase(itemType);
    const existingCount = actorWriteTarget.items.filter(item => item.type === itemType).length;
    await actorWriteTarget.createEmbeddedDocuments("Item", [{
      name: `${label} ${existingCount + 1}`,
      type: itemType
    }]);

    this.render({ force: true });
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
    const assignedHardpoint = getConfiguredMachineHardpoints(actorWriteTarget).find(hardpoint =>
      String(hardpoint?.itemId ?? "").trim() === String(item?.id ?? "").trim()
    );
    await actorWriteTarget.deleteEmbeddedDocuments("Item", [item.id]);
    if (assignedHardpoint?.id) {
      await this._setHardpointOccupant(assignedHardpoint.id, "");
    }
    this.render({ force: true });
  }

  async _onToggleAssetModuleActive(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!this.isEditable) return;

    const item = this.#getOwnedItemFromTarget(target, event);
    if (!item || (item.canonicalType ?? item.type) !== "assetModule") return;
    if (item.system?.inactive) {
      ui.notifications?.warn("Inactive modules cannot be activated.");
      return;
    }

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const token = resolveMachineSceneToken(actorWriteTarget);
    const snapshot = PersonalCombatTracker.getSnapshot?.(actorWriteTarget, { token }) ?? null;
    if (snapshot?.hasCombatant) {
      const spend = await PersonalCombatTracker.spendResource(actorWriteTarget, {
        token,
        resource: "fa",
        cost: 1,
        actionId: "assetModuleToggle",
        actionLabel: `Toggle ${item.name}`,
        actionCostLabel: "1 FA",
        actionCategory: "free",
      });
      if (!spend?.ok) {
        ui.notifications?.warn(spend?.reason ?? `Unable to toggle ${item.name}.`);
        return;
      }
    }

    const ownedItem = actorWriteTarget.items?.get?.(item.id) ?? item;
    await ownedItem.update({
      "system.activation.active": !Boolean(item.system?.activation?.active),
    });
    this.render({ force: true });
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

    this.render({ force: false });
  }

  async _onAddHardpoint(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!this.isEditable) return;

    const persistedHardpoints = await this._persistStagedHardpointFields();

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const options = this._buildHardpointOptions();
    const hardpoints = appendMachineHardpoint(persistedHardpoints, {
      id: foundry.utils.randomID?.(),
      type: options.types[0]?.value ?? "energy",
      size: options.sizes[0]?.value ?? "small",
      location: this._getDefaultHardpointLocation(),
    }, {
      defaultLocation: this._getDefaultHardpointLocation(),
      idFactory: index => foundry.utils.randomID?.() ?? `hardpoint-${index + 1}`,
    });

    await actorWriteTarget.update({ "system.mwd.hardpoints": hardpoints });
    this.render({ force: true });
  }

  async _onDeleteHardpoint(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!this.isEditable) return;

    const hardpointId = String(
      target?.dataset?.hardpointId
      ?? target?.closest?.("[data-hardpoint-id]")?.dataset?.hardpointId
      ?? event?.target?.closest?.("[data-hardpoint-id]")?.dataset?.hardpointId
      ?? ""
    ).trim();
    if (!hardpointId) return;

    const persistedHardpoints = await this._persistStagedHardpointFields();

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const { hardpoints, removed } = removeMachineHardpointById(persistedHardpoints, hardpointId, {
      defaultLocation: this._getDefaultHardpointLocation(),
    });
    if (!removed) return;

    const removedItemId = String(removed?.itemId ?? "").trim();
    if (removedItemId) {
      await actorWriteTarget.deleteEmbeddedDocuments("Item", [removedItemId]);
    }
    await actorWriteTarget.update({ "system.mwd.hardpoints": hardpoints });
    await this._sanitizeMountedWeaponGroups(actorWriteTarget);
    this.render({ force: true });
  }

  async _onCreateHardpointItem(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!this.isEditable) return;

    const hardpointId = String(
      target?.dataset?.hardpointId
      ?? target?.closest?.("[data-hardpoint-id]")?.dataset?.hardpointId
      ?? ""
    ).trim();
    if (!hardpointId) return;

    const persistedHardpoints = await this._persistStagedHardpointFields();

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const hardpoint = persistedHardpoints.find(entry =>
      String(entry?.id ?? "").trim() === hardpointId
    );
    if (!hardpoint) return;

    const existingCount = actorWriteTarget.items.filter(item => (item.canonicalType ?? item.type) === "mechWeapon").length;
    const defaultDamageType = ["penetrating", "concussive", "energy"].includes(String(hardpoint?.type ?? "").trim())
      ? String(hardpoint.type).trim()
      : "energy";
    const created = await actorWriteTarget.createEmbeddedDocuments("Item", [{
      name: `Mech Weapon ${existingCount + 1}`,
      type: "mechWeapon",
      system: {
        size: String(hardpoint?.size ?? "").trim() || "small",
        damageType: defaultDamageType,
      },
    }]);

    await this._setHardpointOccupant(hardpointId, created?.[0]?.id ?? "", { hardpoints: persistedHardpoints });
    created?.[0]?.sheet?.render?.(true);
    this.render({ force: true });
  }

  async _onAssignHardpointItem(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!this.isEditable) return;

    const hardpointId = String(
      target?.dataset?.hardpointId
      ?? target?.closest?.("[data-hardpoint-id]")?.dataset?.hardpointId
      ?? ""
    ).trim();
    if (!hardpointId) return;

    const persistedHardpoints = await this._persistStagedHardpointFields();

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const hardpoint = persistedHardpoints.find(entry => entry.id === hardpointId);
    if (!hardpoint) return;

    const itemId = await this._promptHardpointAssignment(hardpoint);
    if (!itemId) return;

    await this._setHardpointOccupant(hardpointId, itemId, { hardpoints: persistedHardpoints });
    this.render({ force: true });
  }

  async _onClearHardpointItem(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!this.isEditable) return;

    const hardpointId = String(
      target?.dataset?.hardpointId
      ?? target?.closest?.("[data-hardpoint-id]")?.dataset?.hardpointId
      ?? ""
    ).trim();
    if (!hardpointId) return;

    const persistedHardpoints = await this._persistStagedHardpointFields();

    await this._deleteMountedHardpointItem(hardpointId);
    await this._setHardpointOccupant(hardpointId, "", { hardpoints: persistedHardpoints });
    this.render({ force: true });
  }

  _collectStagedHardpointFields() {
    const root = this._getRootElement?.();
    if (!(root instanceof HTMLElement)) return [];

    return Array.from(root.querySelectorAll("[data-hardpoint-config][data-hardpoint-id]"))
      .map(row => {
        const id = String(row.dataset?.hardpointId ?? "").trim();
        if (!id) return null;

        const settings = this._collectHardpointRowSettings(row);
        return settings ? { id, ...settings } : null;
      })
      .filter(Boolean);
  }

  _collectHardpointRowSettings(row = null) {
    if (!(row instanceof HTMLElement)) return null;

    const settings = {};
    for (const field of row.querySelectorAll("[data-hardpoint-field]")) {
      if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) continue;
      if (field.disabled) continue;

      const fieldName = String(field.dataset?.hardpointField ?? "").trim();
      if (!["type", "size", "location"].includes(fieldName)) continue;
      settings[fieldName] = field.value;
    }

    return Object.keys(settings).length ? settings : null;
  }

  async _persistStagedHardpointFields() {
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const current = rawHardpointsArray(actorWriteTarget);
    const defaultLocation = this._getDefaultHardpointLocation();
    const normalizedCurrent = normalizeMachineHardpoints(current, { defaultLocation });
    if (!this.isEditable) return normalizedCurrent;

    const stagedHardpoints = this._collectStagedHardpointFields();
    if (!stagedHardpoints.length) return normalizedCurrent;

    const next = reconcileMachineHardpoints(current, stagedHardpoints, { defaultLocation });

    if (JSON.stringify(next) === JSON.stringify(normalizedCurrent)) return normalizedCurrent;
    await actorWriteTarget.update({ "system.mwd.hardpoints": next });
    return next;
  }

  async _sanitizeMountedWeaponGroups(actor = this.getPersistentActor() ?? this.actor) {
    const actorWriteTarget = actor ?? this.actor;
    const mountedItemIds = getConfiguredMachineHardpoints(actorWriteTarget)
      .map(hardpoint => String(hardpoint?.itemId ?? "").trim())
      .filter(Boolean);
    const currentGroups = normalizeMachineWeaponGroups(foundry.utils.deepClone(actorWriteTarget?.system?.mwd?.weaponGroups));
    const pruned = pruneWeaponGroupsToMountedItems(currentGroups, mountedItemIds);
    if (!pruned.changed) return;
    await actorWriteTarget.update({ "system.mwd.weaponGroups": pruned.groups });
  }

  _buildActiveCrits() {
    const actor = this.getPersistentActor?.() ?? this.actor;
    const degradation = this._buildDegradationPanel();
    const locationIndex = new Map((degradation.locations ?? []).map(location => [location.key, location]));
    return getActiveMachineCrits(actor).map(crit => {
      const remedy = getMachineCritRemedy(crit.remedyKey);
      const effect = describeMachineCriticalEffect(crit);
      const location = locationIndex.get(String(crit.locationKey ?? "").trim()) ?? null;
      const remedySkillKey = String(crit.remedySkillKey ?? remedy.skillKey ?? "").trim();
      const remedySkillLabel = getSkillDef(remedySkillKey)?.label ?? startCase(remedySkillKey);
      const remedyDn = toNumber(crit.remedyBaseDn ?? remedy.baseDn, 0) + toNumber(location?.conditionModifier ?? 0, 0);
      return {
        id: crit.id,
        label: crit.label ?? startCase(crit.key),
        locationLabel: crit.locationLabel ?? startCase(crit.locationKey),
        detail: compactList([
          effect.statusLabel ? `Status: ${effect.statusLabel}` : "",
          effect.scopeSummary,
          effect.automationMode === "engine" ? "Automated" : "Reminder Only",
          crit.escalationKey ? `Escalates: ${crit.escalationKey}` : "",
        ]).join(" | "),
        effectSummary: effect.effectText,
        remedyLabel: remedy.label,
        remedySummary: remedySkillLabel
          ? `Reliability + ${remedySkillLabel} vs DN ${remedyDn}${location ? ` (${location.conditionLabel})` : ""}`
          : "",
        remedyKey: remedy.key,
        remediable: remedy.remediable !== false,
        machineActorUuid: actor?.uuid ?? "",
      };
    });
  }

  async _onToggleStatuses(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (target?.dataset?.actionDisabled === "true") {
      ui.notifications?.warn(target?.dataset?.actionReason || "Statuses are not available right now.");
      return false;
    }

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const token = this._resolveStatusToken(actorWriteTarget);
    if (!token) {
      ui.notifications?.warn("Statuses require a token for this actor on the current scene.");
      return false;
    }

    return openTokenStatusDialog({
      actor: actorWriteTarget,
      token,
    });
  }

  async _onMachineWeaponAttack(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const actor = this.getPersistentActor() ?? this.actor;
    const itemId = String(target?.dataset?.itemId ?? "").trim();
    const item = itemId ? actor.items?.get?.(itemId) : null;
    if (!item) {
      ui.notifications?.warn("That weapon is no longer available.");
      return false;
    }

    const token = this._resolveStatusToken(actor);
    const result = await executeMachineAction(actor, {
      kind: "attack",
      sourceType: "mechWeapon",
      sourceId: item.id,
      token,
      event,
    });

    if (result?.ok) {
      return true;
    }

    if (result?.userMessage || result?.reason) ui.notifications?.warn(result.userMessage ?? result.reason);
    return false;
  }

  async _onMachineCritRemedy(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const machineActor = this.getPersistentActor() ?? this.actor;
    const result = await executeMachineAction(machineActor, {
      kind: "repair",
      issueKind: target?.dataset?.issueKind ?? "crit",
      issueId: target?.dataset?.critId ?? "",
      critId: target?.dataset?.critId ?? "",
      remedyKey: target?.dataset?.remedyKey ?? "",
      event,
    });
    if (!result?.ok) ui.notifications?.warn(result?.userMessage ?? result?.reason ?? "Unable to launch that machine remedy.");
    return Boolean(result?.ok);
  }

  async _onEwAcquire(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    return this.#launchMachineEwIntent("acquire", event, target);
  }

  async _onVehicleAttack(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    const actor = this.getPersistentActor() ?? this.actor;
    const token = this._resolveStatusToken(actor);
    try {
      const weapons = buildVehicleRangedWeapons(actor);
      if (!weapons.length) {
        ui.notifications?.warn("No mounted ranged weapons available.");
        return;
      }

      const selectedWeapon = weapons.length === 1
        ? weapons[0]
        : await this.#promptVehicleRangedWeapon(weapons);
      if (!selectedWeapon) return;

      await performVehicleRangedAttack(actor, {
        weaponId: selectedWeapon.id,
        token,
      });
    } catch (error) {
      console.error("MWD | Failed to launch vehicle mounted attack", error);
      notifyRollError(error, "Unable to launch that vehicle attack.");
    }
  }

  async _onVehicleMeleeAttack(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    const actor = this.getPersistentActor() ?? this.actor;
    try {
      const profiles = buildMachineMeleeProfiles(actor);
      if (!profiles.length) {
        ui.notifications?.warn(MWD.actor.vehicle.quickActions.errors.noMelee);
        return;
      }

      const selectedProfile = profiles.length === 1
        ? profiles[0]
        : await this.#promptMeleeProfile(profiles);
      if (!selectedProfile) return;

      await performMachineMeleeAttack(actor, { profile: selectedProfile });
    } catch (error) {
      console.error("MWD | Failed to launch vehicle melee attack", error);
      notifyRollError(error, "Unable to launch that vehicle melee attack.");
    }
  }

  async _onVehicleChargeAttack(event, _target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    const actor = this.getPersistentActor() ?? this.actor;
    try {
      const token = this._resolveStatusToken(actor);
      const choices = buildChargeActionChoices(actor, { token });
      const enabledChoices = choices.filter(c => !c.disabled);
      if (!enabledChoices.length) {
        ui.notifications?.warn("No charge modes available. Move with Reposition or Redline before charging.");
        return;
      }

      const mode = await this.#promptVehicleChargeMode(choices);
      if (!mode) return;

      let controlIntent = "prone";
      if (mode === "control") {
        controlIntent = await this.#promptVehicleControlIntent();
        if (!controlIntent) return;
      }

      await performChargeAttack(actor, { mode, controlIntent, token });
    } catch (error) {
      console.error("MWD | Failed to launch vehicle charge attack", error);
      notifyRollError(error, "Unable to launch that charge attack.");
    }
  }

  async #promptVehicleChargeMode(choices) {
    const enabledChoices = choices.filter(c => !c.disabled);
    if (!enabledChoices.length) return null;
    if (enabledChoices.length === 1) return enabledChoices[0].id;

    const firstEnabled = enabledChoices[0];
    const content = `<form class="mwd-quick-select">${choices.map((choice, i) => `
      <label class="quick-select-option ${choice.disabled ? "is-disabled" : ""}" title="${foundry.utils.escapeHTML(choice.reason ?? "")}">
        <input type="radio" name="charge-mode" value="${foundry.utils.escapeHTML(choice.id)}" ${choice.id === firstEnabled.id ? "checked" : ""} ${choice.disabled ? "disabled" : ""}>
        <span>${foundry.utils.escapeHTML(choice.label)}</span>
        ${choice.disabled ? `<em style="opacity:0.6; font-size:0.85em;">${foundry.utils.escapeHTML(choice.reason ?? "")}</em>` : ""}
      </label>`).join("")}</form>`;

    return foundry.applications.api.DialogV2.wait({
      window: { title: "Choose Charge Mode" },
      content,
      rejectClose: false,
      buttons: [
        {
          action: "select",
          label: "Confirm",
          icon: "fa-solid fa-bolt",
          default: true,
          callback: (_event, button) => button.form?.elements["charge-mode"]?.value ?? firstEnabled.id,
        },
      ],
    });
  }

  async #promptVehicleControlIntent() {
    const choices = buildControlChargeIntentChoices();
    const content = `<form class="mwd-quick-select">${choices.map((choice, i) => `
      <label class="quick-select-option">
        <input type="radio" name="control-intent" value="${foundry.utils.escapeHTML(choice.id)}" ${i === 0 ? "checked" : ""}>
        <span>${foundry.utils.escapeHTML(choice.label)}</span>
      </label>`).join("")}</form>`;

    return foundry.applications.api.DialogV2.wait({
      window: { title: "Control Charge — Intended Outcome" },
      content,
      rejectClose: false,
      buttons: [
        {
          action: "select",
          label: "Confirm",
          icon: "fa-solid fa-dice",
          default: true,
          callback: (_event, button) => button.form?.elements["control-intent"]?.value ?? choices[0]?.id ?? null,
        },
      ],
    });
  }

  async #promptVehicleRangedWeapon(weapons = []) {
    if (!weapons.length) return null;
    if (weapons.length === 1) return weapons[0];

    const defaultWeapon = weapons[0];
    const content = `<form class="mwd-quick-select">${weapons.map(weapon => `
      <label class="quick-select-option">
        <input type="radio" name="ranged-weapon" value="${foundry.utils.escapeHTML(String(weapon.id ?? ""))}" ${weapon.id === defaultWeapon.id ? "checked" : ""}>
        <span>${foundry.utils.escapeHTML(String(weapon.name ?? ""))}</span>
        ${weapon.hint ? `<small>${foundry.utils.escapeHTML(weapon.hint)}</small>` : ""}
      </label>`).join("")}</form>`;

    const selectedId = await foundry.applications.api.DialogV2.wait({
      window: { title: "Mounted Fire" },
      content,
      rejectClose: false,
      buttons: [
        {
          action: "select",
          label: MWD.common.roll.button,
          icon: "fa-solid fa-dice",
          default: true,
          callback: (_event, button) => button.form?.elements["ranged-weapon"]?.value ?? defaultWeapon.id,
        },
      ],
    });

    return weapons.find(w => w.id === selectedId) ?? defaultWeapon;
  }

  async #promptMeleeProfile(profiles = []) {
    if (!profiles.length) return null;
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

    return profiles.find(p => p.id === selectedId) ?? defaultProfile;
  }

  async _onVehicleMovement(event, _target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const actor = this.getPersistentActor() ?? this.actor;
    const choices = buildVehicleMovementActionChoices(actor);
    const selectableChoices = choices.filter(choice => !choice.disabled);
    if (!selectableChoices.length) {
      ui.notifications?.warn("No vehicle movement actions are currently available.");
      return;
    }

    const defaultChoice = selectableChoices[0];
    const content = `<form class="mwd-quick-select">${choices.map(choice => `
      <label class="quick-select-option${choice.disabled ? " is-disabled" : ""}" title="${foundry.utils.escapeHTML(choice.reason || choice.hint || "")}">
        <input type="radio" name="vehicle-movement-action" value="${choice.id}" ${choice.id === defaultChoice.id ? "checked" : ""} ${choice.disabled ? "disabled" : ""}>
        <span>${foundry.utils.escapeHTML(choice.label)}</span>
        <small>${foundry.utils.escapeHTML(`${choice.cost} SA${choice.strain > 0 ? ` | +${choice.strain} Strain` : ""}${choice.hint ? ` | ${choice.hint}` : ""}`)}</small>
      </label>`).join("")}</form>`;

    const selectedId = await foundry.applications.api.DialogV2.wait({
      window: { title: "Vehicle Movement" },
      content,
      rejectClose: false,
      buttons: [
        {
          action: "select",
          label: "Move",
          icon: "fa-solid fa-gauge-high",
          default: true,
          callback: (_event, button) => button.form?.elements["vehicle-movement-action"]?.value ?? defaultChoice.id,
        },
      ],
    });

    if (!selectedId) return;
    const selectedAction = selectableChoices.find(choice => choice.id === selectedId) ?? defaultChoice;
    try {
      await executeMachineAction(actor, {
        kind: "movement",
        movementKind: selectedAction.id,
      });
    } catch (error) {
      console.error("MWD | Failed to record vehicle movement", error);
      notifyRollError(error, "Unable to record that vehicle movement.");
    }
  }

  async _onVehicleRoll(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const actor = this.getPersistentActor() ?? this.actor;
    const rollKind = String(target?.dataset?.rollKind ?? "").trim();
    try {
      if (rollKind === "piloting") {
        const selection = await this._promptMachinePilotCheck(actor);
        if (selection) await executeMachineAction(actor, { kind: "piloting", ...selection });
      }
      else if (rollKind === "sensor") {
        const token = this._resolveStatusToken(actor);
        const selectedAction = await this.#promptVehicleEwAction(actor, { token });
        if (selectedAction) await executeMachineAction(actor, {
          kind: "ew",
          action: selectedAction,
          token,
        });
      } else if (rollKind === "repair") {
        const selectedIssue = await this.#promptVehicleCriticalRepairIssue(actor);
        if (selectedIssue) await executeMachineAction(actor, {
          kind: "repair",
          issue: selectedIssue,
        });
      }
    } catch (error) {
      console.error("MWD | Failed to launch vehicle check", error);
      notifyRollError(error, "Unable to launch that vehicle check.");
    }
  }

  async _promptMachinePilotCheck(actor) {
    const MACHINE_ATTRS = [
      { key: "handling",    label: "Handling" },
      { key: "system",      label: "System" },
      { key: "chassis",     label: "Chassis" },
      { key: "reliability", label: "Reliability" },
    ];
    const operator = await resolveMachineOperator({ machineActor: actor });
    const pilotActor = operator?.actor ?? null;
    if (!pilotActor) {
      ui.notifications?.warn(operator?.reason || "Machine checks require a linked pilot or operator.");
      return null;
    }

    const skillGroups = buildTrainedPilotSkillGroups(pilotActor);
    const defaultSkillKey = skillGroups
      .flatMap(group => group.skills)
      .find(skill => skill.code === "piloting")?.code
      ?? "";
    const attrOptions = MACHINE_ATTRS.map(a => {
      const val = Number(actor.system?.attributes?.[a.key]?.value ?? 0);
      return `<label class="mwd-pilot-check__attr">
        <input type="radio" name="machineAttr" value="${foundry.utils.escapeHTML(a.key)}" ${a.key === "handling" ? "checked" : ""}>
        <span class="mwd-pilot-check__attr-card">
          <span class="mwd-pilot-check__attr-name">${foundry.utils.escapeHTML(a.label)}</span>
          <span class="mwd-pilot-check__attr-value">${val}</span>
        </span>
      </label>`;
    }).join("");
    const skillOptions = skillGroups.map(group => {
      const opts = group.skills.map(s => `<option value="${foundry.utils.escapeHTML(s.code)}" ${s.code === defaultSkillKey ? "selected" : ""}>${foundry.utils.escapeHTML(s.label)} (${s.rating})</option>`).join("");
      return `<optgroup label="${foundry.utils.escapeHTML(group.label)}">${opts}</optgroup>`;
    }).join("");
    const noSkillOption = `<option value="" ${defaultSkillKey ? "" : "selected"}>No Skill (0)</option>`;
    const content = `<form class="mwd-quick-select mwd-skill-check-form mwd-pilot-check">
      <section class="mwd-pilot-check__section">
        <div class="mwd-pilot-check__heading">
          <span>Machine Attribute</span>
          <small>${foundry.utils.escapeHTML(actor?.name ?? "Machine")}</small>
        </div>
        <div class="mwd-pilot-check__attr-grid">${attrOptions}</div>
      </section>
      <section class="mwd-pilot-check__section">
        <div class="mwd-pilot-check__heading">
          <span>Skill</span>
          <small>${foundry.utils.escapeHTML(pilotActor?.name ?? "Pilot")}</small>
        </div>
        <label class="mwd-pilot-check__select">
          <select name="skillKey">${noSkillOption}${skillOptions}</select>
        </label>
      </section>
    </form>`;

    const result = await foundry.applications.api.DialogV2.wait({
      window: { title: MWD.actor.vehicle.quickActions.pilotingCheck },
      content,
      rejectClose: false,
      buttons: [
        {
          action: "roll",
          label: MWD.common.roll.button,
          icon: "fa-solid fa-dice",
          default: true,
          callback: (_event, button) => ({
            machineAttributeKey: button.form?.elements["machineAttr"]?.value ?? "handling",
            skillKey: button.form?.elements["skillKey"]?.value ?? defaultSkillKey,
            operatorActorUuid: pilotActor.uuid ?? operator?.uuid ?? "",
          }),
        },
      ],
    });

    return result ? {
      ...result,
      skillKey: String(result.skillKey ?? "").trim() || "none",
    } : null;
  }

  async #promptVehicleEwAction(actor, { token = null } = {}) {
    const actions = buildMachineEwActionChoices(actor, { token, includeDisabled: true });
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

  async #promptVehicleCriticalRepairIssue(actor) {
    const issues = buildMachineCriticalRepairIssues(actor);
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

  async _onOpenStrainDialog(event, _target) {
    event?.preventDefault?.();
    if (!this.isEditable) return;

    const actor = this.getPersistentActor() ?? this.actor;
    const strain = buildVehicleStrainModel(actor);
    const content = `
      <form class="mwd-heat-dialog" style="display:grid; gap:0.75rem;">
        <label style="display:grid; gap:0.25rem;">
          <span style="font-weight:700; text-transform:uppercase; letter-spacing:0.08em;">Current Strain</span>
          <input type="number" name="currentStrain" value="${strain.value}" min="0" max="${strain.max}" step="1" />
        </label>
        <label style="display:grid; gap:0.25rem;">
          <span style="font-weight:700; text-transform:uppercase; letter-spacing:0.08em;">Pending Strain</span>
          <input type="number" name="pendingStrain" value="${strain.pendingGenerated}" min="0" step="1" />
        </label>
        <p style="margin:0; opacity:0.8;">Redline adds pending strain. Resolve it here when the vehicle's operational stress should take effect.</p>
      </form>
    `;

    await foundry.applications.api.DialogV2.wait({
      window: { title: `${actor.name ?? "Vehicle"} Strain` },
      position: { width: 420 },
      content,
      buttons: [
        {
          action: "apply",
          label: "Apply",
          icon: "fa-solid fa-check",
          default: true,
          callback: async (_event, button) => {
            const currentInput = button?.form?.elements?.namedItem?.("currentStrain");
            const pendingInput = button?.form?.elements?.namedItem?.("pendingStrain");
            const currentStrain = Math.max(0, Number(currentInput?.value ?? strain.value) || 0);
            const pendingStrain = Math.max(0, Number(pendingInput?.value ?? strain.pendingGenerated) || 0);
            await actor.update({
              "system.mwd.strain.value": currentStrain,
              "system.mwd.strain.pendingGenerated": pendingStrain,
            });
            return true;
          },
        },
        {
          action: "resolve",
          label: "Resolve Pending",
          icon: "fa-solid fa-gauge-high",
          callback: async (_event, button) => {
            const currentInput = button?.form?.elements?.namedItem?.("currentStrain");
            const pendingInput = button?.form?.elements?.namedItem?.("pendingStrain");
            await actor.update({
              "system.mwd.strain.value": Math.max(0, Number(currentInput?.value ?? strain.value) || 0),
              "system.mwd.strain.pendingGenerated": Math.max(0, Number(pendingInput?.value ?? strain.pendingGenerated) || 0),
            });
            await executeMachineAction(actor, {
              kind: "resolvePendingStrain",
              reason: "strain dialog",
            });
            return true;
          },
        },
        {
          action: "cancel",
          label: "Cancel",
          icon: "fa-solid fa-xmark",
          callback: () => false,
        },
      ],
      close: () => false,
    });
  }

  async _onEwTarget(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    return this.#launchMachineEwIntent("targeting", event, target);
  }

  async _onMachineEwAction(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const actor = this.getPersistentActor?.() ?? this.actor;
    const actionId = String(target?.dataset?.actionId ?? "").trim();
    if (!actionId) return false;

    try {
      const result = await executeMachineAction(actor, {
        kind: "ew",
        actionId,
        token: this._resolveStatusToken(actor),
        targetTokenId: String(target?.dataset?.targetTokenId ?? "").trim(),
        targetTokenUuid: String(target?.dataset?.targetTokenUuid ?? "").trim(),
        event,
      });
      if (!result?.ok) {
        ui.notifications?.warn(result?.userMessage ?? result?.reason ?? "Unable to launch that EW action.");
        return false;
      }
      this.#renderEwState();
      return true;
    } catch (error) {
      console.error("MWD | Failed to launch machine EW action", error);
      notifyRollError(error, "Unable to launch that EW action.");
      return false;
    }
  }

  async _onSignatureGoDark(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const actor = this.getPersistentActor?.() ?? this.actor;
    const result = await executeMachineAction(actor, {
      kind: "action",
      actionId: "goDark",
      token: this._resolveStatusToken(actor),
      event,
    });
    if (!result?.ok) {
      ui.notifications?.warn(result?.userMessage ?? result?.reason ?? "Unable to go dark.");
      return false;
    }
    this.render(false);
    return true;
  }

  _resolveStatusToken(actor = this.actor) {
    return resolveMachineSceneToken(actor, {
      sheetToken: this.getSheetTokenDocument?.() ?? null,
    });
  }

  _getDefaultHardpointLocation() {
    return this._getAvailableHardpointLocations()[0] ?? "torso";
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

  async #launchMachineEwIntent(intent, event, target) {
    const actor = this.getPersistentActor?.() ?? this.actor;
    const token = this._resolveStatusToken(actor);

    const panel = buildMachineEwPanel({ actor, token });
    const explicitTargetTokenUuid = String(target?.dataset?.targetTokenUuid ?? "").trim();
    const explicitTargetTokenId = String(target?.dataset?.targetTokenId ?? "").trim();
    const targetRow = explicitTargetTokenUuid || explicitTargetTokenId
      ? (panel.rows ?? []).find(row =>
        (explicitTargetTokenUuid && row?.targetTokenUuid === explicitTargetTokenUuid)
        || (explicitTargetTokenId && row?.targetTokenId === explicitTargetTokenId)
      ) ?? null
      : resolveMachineEwActionTarget(panel, intent);
    if (!targetRow) {
      const verb = intent === "targeting" ? "generate targeting data" : "acquire";
      ui.notifications?.warn(`No targeted token is ready to ${verb}.`);
      return false;
    }

    const isEligible = intent === "targeting" ? targetRow.canTarget : targetRow.canAcquire;
    if (!isEligible) {
      ui.notifications?.warn(intent === "targeting"
        ? "That target is not ready for targeting data yet."
        : "That target cannot advance its detection state right now.");
      return false;
    }

    try {
      const result = await executeMachineAction(actor, {
        kind: "ew",
        intent,
        token,
        targetTokenId: targetRow.targetTokenId,
        targetTokenUuid: targetRow.targetTokenUuid,
        event,
      });
      if (!result?.ok) {
        ui.notifications?.warn(result?.userMessage ?? result?.reason ?? "Unable to launch that EW action.");
        return false;
      }
      this.#renderEwState();
      return true;
    } catch (error) {
      console.error(`MWD | Failed to launch EW ${intent}`, error);
      const label = intent === "targeting" ? "targeting" : "acquire";
      notifyRollError(error, `Unable to launch ${label} roll.`);
      return false;
    }
  }

  #bindEwHooks() {
    if (this.#ewHookIds.length) return;

    this.#ewHookIds = [
      ["targetToken", Hooks.on("targetToken", user => {
        if (user?.id !== game.user?.id) return;
        this.#renderEwState();
      })],
      ["updateToken", Hooks.on("updateToken", (tokenDocument, changed) => {
        if (!this.#didTokenPositionChange(changed)) return;
        if (!this.#isRelevantEwToken(tokenDocument)) return;
        cachePendingTokenPosition(tokenDocument, changed);
        this.#renderEwState();
      })],
      ["updateCombatant", Hooks.on("updateCombatant", (combatant, changed) => {
        if (!this.#isRelevantEwCombatant(combatant)) return;
        if (!this.#didCombatantEwStateChange(changed)) return;
        this.#renderEwState();
      })],
      ["createCombatant", Hooks.on("createCombatant", combatant => {
        if (!this.#isRelevantEwCombatant(combatant)) return;
        this.#renderEwState();
      })],
      ["deleteCombatant", Hooks.on("deleteCombatant", combatant => {
        if (!this.#isRelevantEwCombatant(combatant)) return;
        this.#renderEwState();
      })],
      ["updateCombat", Hooks.on("updateCombat", combat => {
        if (!this.#isTrackedCombat(combat)) return;
        this.#renderEwState();
      })],
      ["deleteCombat", Hooks.on("deleteCombat", combat => {
        if (!this.#isTrackedCombat(combat)) return;
        this.#renderEwState();
      })],
    ];
  }

  #teardownEwHooks() {
    for (const [hookName, hookId] of this.#ewHookIds) {
      Hooks.off(hookName, hookId);
    }
    this.#ewHookIds = [];
  }

  #renderEwState() {
    if (!this.rendered) return;
    this._captureScrollPosition();
    this.render({ force: false });
  }

  #isTrackedCombat(combat) {
    return Boolean(combat?.id && combat.id === game.combat?.id);
  }

  #isRelevantEwToken(token) {
    const tokenId = String(token?.id ?? token?.document?.id ?? "").trim();
    if (!tokenId) return false;

    const sheetToken = this._resolveStatusToken(this.getPersistentActor?.() ?? this.actor);
    const sheetTokenId = String(sheetToken?.id ?? sheetToken?.document?.id ?? "").trim();
    if (sheetTokenId && tokenId === sheetTokenId) return true;

    const targetedTokenIds = new Set(
      Array.from(game.user?.targets ?? [])
        .map(targetToken => String(targetToken?.id ?? targetToken?.document?.id ?? "").trim())
        .filter(Boolean)
    );
    return targetedTokenIds.has(tokenId);
  }

  #isRelevantEwCombatant(combatant) {
    if (!combatant) return false;

    const sheetToken = this._resolveStatusToken(this.getPersistentActor?.() ?? this.actor);
    const sheetTokenId = String(sheetToken?.id ?? sheetToken?.document?.id ?? "").trim();
    const combatantTokenId = String(combatant?.tokenId ?? combatant?.token?.id ?? combatant?.token?.document?.id ?? "").trim();
    if (!combatantTokenId) return false;
    if (sheetTokenId && combatantTokenId === sheetTokenId) return true;

    const targetedTokenIds = new Set(
      Array.from(game.user?.targets ?? [])
        .map(targetToken => String(targetToken?.id ?? targetToken?.document?.id ?? "").trim())
        .filter(Boolean)
    );
    return targetedTokenIds.has(combatantTokenId);
  }

  #didCombatantEwStateChange(changed) {
    return this.#didChangedPathTouch(changed, "flags.mwd.targeting")
      || this.#didChangedPathTouch(changed, "flags.mwd.ewState")
      || this.#didChangedPathTouch(changed, "flags.mwd.personalCombat")
      || this.#didChangedPathTouch(changed, "tokenId");
  }

  #didChangedPathTouch(changed, path) {
    if (foundry.utils.hasProperty(changed, path)) return true;
    const prefix = `${path}.`;
    return Object.keys(changed ?? {}).some(key => key === path || key.startsWith(prefix));
  }

  #didTokenPositionChange(changed) {
    return foundry.utils.hasProperty(changed, "x")
      || foundry.utils.hasProperty(changed, "y")
      || foundry.utils.hasProperty(changed, "elevation");
  }
}
