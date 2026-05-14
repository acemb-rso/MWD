// src/modules/sheets/battlemech-sheet-v2.js
// Purpose: Layout-driven flagship BattleMech sheet built on the reusable vehicle V2 sheet patterns.
// How it fits: Surfaces prepared BattleMech data through semantic context and V2-native action wiring.

import { MWD } from "../config.js";
import { SYSTEM_NAME, TEMPLATES_PATH, startCase } from "../constants.js";
import { notifyRollError } from "../roll/roll-errors.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { buildMachineMovementSummaryParts } from "../mwd/machine-movement.js";
import {
  buildBattlemechMovementActionChoices,
  performBattlemechMovementAction,
} from "../mwd/battlemech-movement-actions.js";
import { buildCriticalStatusSummary, buildIntegritySummary, buildRemainingMonitorTrack } from "../mwd/machine-summary.js";
import {
  buildBattlemechHeatModel,
  resolveBattlemechPendingHeat,
  setBattlemechPendingHeat,
} from "../mwd/machine-heat.js";
import {
  BATTLEMECH_HEAT_PROFILES,
  getBattlemechHeatProfile,
} from "../mwd/battlemech-heat-profiles.js";
import { getConfiguredMachineHardpoints } from "../mwd/machine-hardpoints.js";
import {
  buildBattlemechMeleeProfiles,
  performBattlemechMeleeAttack,
} from "../mwd/battlemech-melee-actions.js";
import {
  buildBattlemechRangedAttackGroups,
  performBattlemechRangedAttack,
} from "../mwd/battlemech-ranged-actions.js";
import {
  buildMachineCriticalRepairIssues,
  buildMachineEwActionChoices,
  performMachineCriticalRepair,
  performMachineElectronicWarfare,
  performMachinePilotingCheck,
} from "../mwd/machine-quick-actions.js";
import { BattlemechLoadout } from "../mwd/battlemech-loadout.js";
import { normalizeMachineWeaponGroups } from "../mwd/machine-weapon-group-state.js";
import { VehicleSheetV2 } from "./vehicle-sheet-v2.js";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

// Foundry stores arrays-of-objects as plain objects keyed by index after the
// first save. Always coerce to a real array before mutating.
function readWeaponGroups(actor) {
  const raw = foundry.utils.deepClone(actor?.system?.mwd?.weaponGroups);
  return normalizeMachineWeaponGroups(raw);
}

function compactList(values = []) {
  return values
    .map(value => String(value ?? "").trim())
    .filter(Boolean);
}


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

function getMovementActionChoices(actor) {
  const directChoices = typeof actor?.getMovementActionChoices === "function"
    ? actor.getMovementActionChoices()
    : [];
  if (Array.isArray(directChoices) && directChoices.length) return directChoices;

  const preparedChoices = actor?.system?.quickActions?.movement;
  if (Array.isArray(preparedChoices) && preparedChoices.length) return preparedChoices;

  return buildBattlemechMovementActionChoices(actor);
}

async function performMovementAction(actor, options = {}) {
  if (typeof actor?.performMovementAction === "function") {
    return actor.performMovementAction(options);
  }
  return performBattlemechMovementAction(actor, options);
}

function buildDetailRows(rows = []) {
  return rows
    .filter(row => row && row.value !== undefined && row.value !== null && String(row.value).trim() !== "")
    .map(row => ({
      label: String(row.label ?? "").trim(),
      value: String(row.value ?? "").trim()
    }));
}

function formatRangeBandLabel(value = "") {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) return "";
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function formatAttackRatings(bands = {}) {
  return ["close", "near", "far", "extreme"]
    .map(band => `${formatRangeBandLabel(band)} ${toNumber(bands?.[band], 0)}`)
    .join(" | ");
}

function getQuickActionLabel(key = "") {
  const labels = MWD?.actor?.vehicle?.quickActions ?? {};
  return String(labels?.[key] ?? startCase(key)).trim() || startCase(key);
}

export class BattlemechSheetV2 extends VehicleSheetV2 {
  static LAYOUT_ID = "battlemech";

  static PARTS = {
    sheet: {
      get template() {
        return `${TEMPLATES_PATH}/v2/actor/battlemech-sheet.hbs`;
      },
    }
  };

  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ["battlemech-sheet", SYSTEM_NAME, "actor-sheet-v2", "mwd-battlemech-sheet", "mwd-sheet"],
    position: { width: 980, height: 940 },
    actions: {
      ...super.DEFAULT_OPTIONS.actions,
      mechAttack: BattlemechSheetV2.prototype._onMechAttack,
      mechMovement: BattlemechSheetV2.prototype._onMechMovement,
      mechRoll: BattlemechSheetV2.prototype._onMechRoll,
      heatDangerCheck: BattlemechSheetV2.prototype._onHeatDangerCheck,
      openHeatDialog: BattlemechSheetV2.prototype._onOpenHeatDialog,
      addWeaponGroup: BattlemechSheetV2.prototype._onAddWeaponGroup,
      deleteWeaponGroup: BattlemechSheetV2.prototype._onDeleteWeaponGroup,
      toggleWeaponGroupHardpoint: BattlemechSheetV2.prototype._onToggleWeaponGroupHardpoint,
    }
  }, { inplace: false });

  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    ctx.battlemechSheet = {
      heat: this._buildHeatModel(),
      quickActions: this._buildQuickActions(),
      weaponGroupSummary: this._buildWeaponGroupSummary(),
      weaponGroups: this._buildWeaponGroups(),
      hardpoints: this._buildHardpoints(),
      chassisFields: this._buildChassisFields(),
    };
    return ctx;
  }

  _onRender(context, options) {
    super._onRender(context, options);
    const root = this._getRootElement();
    if (!root) return;
    root.querySelectorAll(".mwd-battlemech-groups__name-input").forEach(input => {
      input.addEventListener("change", e => this.#onWeaponGroupNameChange(e));
    });
    root.querySelectorAll("[data-heat-profile-select]").forEach(select => {
      select.addEventListener("change", e => this.#onHeatProfileChange(e));
    });
  }

  async #onWeaponGroupNameChange(event) {
    if (!this.isEditable) return;
    const input = event.target;
    const newName = String(input?.value ?? "").trim();
    if (!newName) return;
    const groupId = String(
      input.closest?.("[data-group-id]")?.dataset?.groupId ?? ""
    ).trim();
    if (!groupId) return;

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const weaponGroups = readWeaponGroups(actorWriteTarget);
    const group = weaponGroups.find(g => String(g?.id ?? "").trim() === groupId);
    if (!group || group.name === newName) return;
    group.name = newName;
    await actorWriteTarget.update({ "system.mwd.weaponGroups": weaponGroups });
  }

  #onHeatProfileChange(event) {
    if (!this.isEditable) return;

    const select = event?.target;
    if (!(select instanceof HTMLSelectElement)) return;

    const profile = getBattlemechHeatProfile(select.value);
    if (!profile) return;

    const root = this._getRootElement();
    if (!root) return;

    const setNumberField = (name, value) => {
      const field = root.querySelector(`[name="${name}"]`);
      if (!(field instanceof HTMLInputElement)) return;
      field.value = String(value);
      field.dispatchEvent(new Event("input", { bubbles: true }));
      field.dispatchEvent(new Event("change", { bubbles: true }));
    };

    setNumberField("system.monitors.heat.max", profile.trackLength);
    setNumberField("system.mwd.heat.thresholds.runningHot", profile.thresholds.runningHot);
    setNumberField("system.mwd.heat.thresholds.overheated", profile.thresholds.overheated);
    setNumberField("system.mwd.heat.thresholds.shutdown", profile.thresholds.shutdown);
  }

  _buildChassisFields() {
    const tonnage = toNumber(this.actor.system?.mwd?.tonnage, 0);
    const weightClass = this.actor.system?.mwd?.weightClass ?? "medium";
    const weightClassLabels = MWD.mwd.weightClass;

    return [
      {
        label: "Tonnage",
        path: "system.mwd.tonnage",
        isNumber: true,
        value: tonnage,
        displayValue: String(tonnage),
      },
      {
        label: weightClassLabels.label,
        path: "system.mwd.weightClass",
        isSelect: true,
        value: weightClass,
        displayValue: weightClassLabels[weightClass] ?? startCase(weightClass),
        options: Object.entries(weightClassLabels)
          .filter(([key]) => key !== "label")
          .map(([key, label]) => ({ value: key, label, selected: weightClass === key })),
      },
    ];
  }

  _buildConditionMonitors() {
    const structure = this.actor.system?.monitors?.structure ?? {};
    const armor = this.actor.system?.monitors?.armor ?? {};

    return [
      buildRemainingMonitorTrack({ id: "structure", label: "Structure", kind: "structure", monitor: structure, editable: this.isEditable }),
      buildRemainingMonitorTrack({ id: "armor", label: "Armor", kind: "armor", monitor: armor, editable: this.isEditable }),
    ];
  }

  _buildSummaryStats() {
    const armor = this.actor.system?.monitors?.armor ?? {};
    const structure = this.actor.system?.monitors?.structure ?? {};
    const heat = buildBattlemechHeatModel(this.actor);
    const heatSummaryLabel = heat.status.toUpperCase();
    const integrity = buildIntegritySummary({ armor, structure });
    const critStatus = buildCriticalStatusSummary(this.actor.system?.mwd?.crits ?? []);
    const movementParts = buildMachineMovementSummaryParts({
      actorType: this.actor.type,
      movement: this.actor.system?.movement,
      legacyMoves: this.actor.system?.moves,
      jumpProfile: this.actor.system?.mwd?.mobility?.jumping ?? null,
    });

    return buildSummaryStats([
      { label: "Weight", value: startCase(this.actor.system?.mwd?.weightClass ?? "medium"), emphasis: "strong" },
      { label: "Move", parts: movementParts },
      { label: "Tonnage", value: toNumber(this.actor.system?.mwd?.tonnage, 0) },
      { label: "Integrity", parts: integrity.parts, title: integrity.title },
      { label: "Heat", value: `${heat.current} ${heatSummaryLabel}`, title: heat.status },
      { label: "Pending Heat", value: String(heat.pendingGenerated), tone: heat.pendingGenerated > 0 ? "orange" : "" },
      { label: "Status", value: critStatus.value, title: critStatus.title, tone: critStatus.count > 0 ? "red" : "" },
    ]);
  }

  _buildSummaryActions() {
    return [];
  }

  _buildAlerts() {
    const loadout = this.actor.system?.mwd?.loadout ?? {};
    return [
      ...(Array.isArray(loadout.errors) ? loadout.errors.map(text => ({ tone: "danger", text })) : []),
      ...(Array.isArray(loadout.warnings) ? loadout.warnings.map(text => ({ tone: "warning", text })) : []),
    ];
  }

  _buildVehicleSections() {
    const buckets = this.actor.system?.mwd?.items ?? {};
    return {
      slots: this._buildHardpointSlotSection(),
      equipment: this._buildRecordSection({
        sectionId: "equipment",
        itemType: "mechEquipment",
        addLabel: "Add Equipment",
        emptyLabel: "No BattleMech equipment installed.",
        items: buckets.mechEquipment ?? [],
      }),
      modules: this._buildRecordSection({
        sectionId: "modules",
        itemType: "assetModule",
        addLabel: "Add Module",
        emptyLabel: "No asset modules installed.",
        items: buckets.assetModules ?? [],
      }),
      gear: this._buildRecordSection({
        sectionId: "gear",
        itemType: "gear",
        addLabel: "Add Gear",
        emptyLabel: "No stored gear.",
        items: buckets.gear ?? [],
      }),
    };
  }

  _buildHeatModel() {
    const heat = buildBattlemechHeatModel(this.actor);
    const thresholds = heat.thresholds ?? {};
    const profileCode = String(this.actor.system?.mwd?.heat?.profileCode ?? "").trim();

    return {
      label: "Heat",
      current: heat.current,
      trackLength: heat.trackLength,
      displayMax: heat.displayMax,
      dissipation: heat.dissipation,
      effectiveDissipation: heat.effectiveDissipation,
      coolingImpaired: heat.coolingImpaired,
      pendingGenerated: heat.pendingGenerated,
      editable: Boolean(this.isEditable),
      profileCode,
      profileOptions: BATTLEMECH_HEAT_PROFILES.map(profile => ({
        value: profile.code,
        label: profile.tier,
        selected: profile.code === profileCode,
        trackLength: profile.trackLength,
        thresholds: profile.thresholds,
      })),
      status: heat.status,
      thresholds: {
        runningHot: toNumber(thresholds.runningHot, 0),
        overheated: toNumber(thresholds.overheated, 0),
        shutdown: toNumber(thresholds.shutdown, 0),
        hot: toNumber(thresholds.hot, 0),
        overheat: toNumber(thresholds.overheat, 0),
        danger: toNumber(thresholds.danger, 0),
      },
      penalties: {
        movementPenalty: heat.penalties.movementPenalty,
        rangedDicePenalty: heat.penalties.rangedDicePenalty,
        dangerLevel: heat.penalties.dangerLevel,
      },
      dangerChecks: heat.dangerChecks,
      dangerActions: heat.inDanger && heat.dangerChecks ? [
        {
          label: "Shutdown Check",
          hint: `Roll ${toNumber(heat.dangerChecks.shutdownPool, 0)}d6 vs DN ${toNumber(heat.dangerChecks.shutdownDN, 0)}`,
          dataset: {
            checkKind: "shutdown",
            dn: toNumber(heat.dangerChecks.shutdownDN, 0),
          },
        },
        {
          label: "Explosion Check",
          hint: `Roll ${toNumber(heat.dangerChecks.explosionPool, 0)}d6 vs DN ${toNumber(heat.dangerChecks.explosionDN, 0)}`,
          dataset: {
            checkKind: "explosion",
            dn: toNumber(heat.dangerChecks.explosionDN, 0),
          },
        },
      ] : [],
      volatile: heat.volatile,
      inDanger: heat.inDanger,
      segments: Array.from({ length: heat.displayMax }, (_, index) => {
        const value = index + 1;
        const hotStart = toNumber(thresholds.runningHot, 0);
        const overheatStart = toNumber(thresholds.overheated, 0);
        const dangerStart = toNumber(thresholds.shutdown, 0);
        const band = value >= dangerStart
          ? "danger"
          : value >= overheatStart
            ? "overheat"
            : value >= hotStart
              ? "hot"
              : "safe";

        return {
          value,
          filled: value <= heat.current,
          current: value === heat.current,
          band,
          bandLabel: startCase(band),
        };
      }),
    };
  }

  async _onOpenHeatDialog(event, _target) {
    event?.preventDefault?.();
    if (!this.isEditable) return;

    const actor = this.getPersistentActor() ?? this.actor;
    await this.#openHeatDialog(actor);
  }

  _buildQuickActions() {
    const actor = this.getPersistentActor() ?? this.actor;
    const preparedGroups = this._getPreparedRangedWeaponGroups(actor);
    const availableRangedGroups = preparedGroups.filter(group => group.isAttackLegal && group.isAvailableThisActivation);
    const hasMeleeProfiles = actor.type === "battlemech"
      || (Array.isArray(actor.system?.meleeProfiles) && actor.system.meleeProfiles.length > 0);
    const movementChoices = getMovementActionChoices(actor);
    const enabledMovementChoices = movementChoices.filter(choice => !choice.disabled);
    const enabledEwActions = buildMachineEwActionChoices(actor, {
      token: this.getSheetTokenDocument?.() ?? this._resolveStatusToken(actor),
    });

    return [
      {
        label: "Movement",
        hint: enabledMovementChoices.length
          ? enabledMovementChoices.map(choice => choice.label).join(" / ")
          : "No movement actions available",
        handler: "mechMovement",
        disabled: enabledMovementChoices.length === 0,
        dataset: {}
      },
      {
        label: getQuickActionLabel("rangedAttack"),
        hint: availableRangedGroups.length > 0
          ? "Prompt for a ready weapon group"
          : "No ready ranged weapon groups",
        handler: "mechAttack",
        disabled: availableRangedGroups.length === 0,
        dataset: { attackKind: "ranged" }
      },
      {
        label: getQuickActionLabel("meleeAttack"),
        hint: "Prompt for a melee profile",
        handler: "mechAttack",
        disabled: !hasMeleeProfiles,
        dataset: { attackKind: "melee" }
      },
      {
        label: getQuickActionLabel("pilotingCheck"),
        hint: "Vehicle handling test",
        handler: "mechRoll",
        disabled: false,
        dataset: { rollKind: "piloting" }
      },
      {
        label: "EW",
        hint: enabledEwActions.length ? "Choose an EW action" : "No EW actions available",
        handler: "mechRoll",
        disabled: enabledEwActions.length === 0,
        dataset: { rollKind: "sensor" }
      },
      {
        label: getQuickActionLabel("emergencyRepair"),
        hint: "Choose a crit or repairable status",
        handler: "mechRoll",
        disabled: false,
        dataset: { rollKind: "repair" }
      },
    ];
  }

  _buildWeaponGroupSummary() {
    const actor = this.getPersistentActor() ?? this.actor;
    const computedLoadout = new BattlemechLoadout(actor).compute();
    const mountPoints = computedLoadout?.mountPoints ?? actor.system?.mwd?.loadout?.mountPoints ?? {};
    const total = toNumber(mountPoints.total, 0);
    const used = toNumber(mountPoints.used, 0);

    return {
      total,
      used,
      remaining: Math.max(0, toNumber(mountPoints.remaining, total - used)),
    };
  }

  _buildLoadedHardpointChoices(actor) {
    const typeLabels = MWD?.mwd?.hardpointType ?? {};
    const sizeLabels = MWD?.mwd?.hardpointSize ?? {};
    const locationLabels = MWD?.mwd?.hardpointLocation ?? {};

    return getConfiguredMachineHardpoints(actor).map((hardpoint, index) => {
      const itemId = String(hardpoint?.itemId ?? "").trim();
      if (!itemId) return null;

      const item = actor.items?.get?.(itemId) ?? null;
      if (!item) return null;

      const locationLabel = locationLabels[hardpoint.location] ?? startCase(hardpoint.location);
      const typeLabel = typeLabels[hardpoint.type] ?? startCase(hardpoint.type);
      const sizeLabel = sizeLabels[hardpoint.size] ?? startCase(hardpoint.size);
      const hardpointName = `${locationLabel} ${typeLabel} ${sizeLabel}`.trim();

      return {
        hardpointId: String(hardpoint?.id ?? `hardpoint-${index + 1}`).trim(),
        itemId,
        itemName: String(item?.name ?? "Mounted Weapon").trim() || "Mounted Weapon",
        hardpointName,
        chipLabel: `${item?.name ?? "Mounted Weapon"} | ${hardpointName}`,
        detailLabel: `${hardpointName}: ${item?.name ?? "Mounted Weapon"}`,
      };
    }).filter(Boolean);
  }

  _buildWeaponGroups() {
    const actor = this.getPersistentActor() ?? this.actor;
    const groups = this._getPreparedRangedWeaponGroups(actor);
    const loadedHardpoints = this._buildLoadedHardpointChoices(actor);
    const groupNameById = new Map(groups.map(group => [group.id, group.name]));
    const owningGroupByItemId = new Map();

    for (const group of groups) {
      for (const weaponId of Array.from(group.weaponIds ?? [])) {
        const normalizedId = String(weaponId ?? "").trim();
        if (!normalizedId || owningGroupByItemId.has(normalizedId)) continue;
        owningGroupByItemId.set(normalizedId, group.id);
      }
    }

    return groups.map(group => {
      const groupWeaponIds = Array.from(group.weaponIds ?? []).map(weaponId => String(weaponId ?? "").trim()).filter(Boolean);
      const bundledHardpoints = loadedHardpoints.filter(choice => groupWeaponIds.includes(choice.itemId));
      const bundleChoices = loadedHardpoints.map(choice => {
        const selected = groupWeaponIds.includes(choice.itemId);
        const ownerGroupId = owningGroupByItemId.get(choice.itemId) ?? "";
        const assignedElsewhere = Boolean(ownerGroupId && ownerGroupId !== group.id);
        return {
          ...choice,
          selected,
          assignedElsewhere,
          disabled: assignedElsewhere,
          title: selected
            ? `Remove ${choice.itemName} from ${group.name}`
            : assignedElsewhere
              ? `${choice.itemName} is already bundled in ${groupNameById.get(ownerGroupId) ?? "another group"}`
              : `Add ${choice.itemName} to ${group.name}`,
        };
      });

      return {
        id: group.id,
        index: group.index,
        name: group.name,
        subtitle: bundledHardpoints.length
          ? bundledHardpoints.map(choice => choice.itemName).join(", ")
          : (group.memberWeapons ?? []).map(weapon => weapon.name).join(", "),
        summaryStats: buildSummaryStats([
          { label: "Weapons", value: Array.isArray(group.memberWeapons) ? group.memberWeapons.length : 0, emphasis: "strong" },
          { label: "Damage", value: toNumber(group.attackSummary?.damage, 0) },
          { label: "AP", value: toNumber(group.attackSummary?.ap, 0) },
          { label: "Heat", value: toNumber(group.attackSummary?.heat, 0) },
        ]),
        detailTags: buildDetailTags([
          group.attackSummary?.damageTypeLabel ?? "",
          group.isAttackLegal
            ? (group.isAvailableThisActivation ? "Ready" : "Used")
            : "Blocked",
        ]),
        detailRows: buildDetailRows([
          { label: "Weapon Names", value: (group.memberWeapons ?? []).map(weapon => weapon.name).join(", ") },
          { label: "Bundled Hardpoints", value: bundledHardpoints.map(choice => choice.detailLabel).join(" | ") },
          { label: "Range Cap", value: formatRangeBandLabel(group.attackSummary?.rangeCap ?? "") },
          { label: "Attack Ratings", value: formatAttackRatings(group.attackSummary?.attackRatings ?? {}) },
          { label: "Missing IDs", value: (group.missingWeaponIds ?? []).join(", ") },
          { label: "Warnings", value: (group.compatibilityWarnings ?? []).join(" | ") },
          { label: "Status", value: group.disableReason || (group.isAvailableThisActivation ? "Ready to fire" : "Already fired this activation") },
        ]),
        bundleChoices,
        bundleHelp: loadedHardpoints.length
          ? "Bundle mounted slot weapons here. Only attached slot weapons appear."
          : "Mount weapons into loadout slots first, then bundle the mounted slot weapons here.",
        action: {
          label: group.isAttackLegal && group.isAvailableThisActivation ? "Attack Group" : "Unavailable",
          disabled: !(group.isAttackLegal && group.isAvailableThisActivation),
          title: group.disableReason || "Attack Group",
          dataset: {
            attackKind: "group",
            groupId: group.id,
          }
        }
      };
    });
  }

  _buildHardpoints() {
    const loadout = this.actor.system?.mwd?.loadout ?? {};
    const typeLabels = MWD?.mwd?.hardpointType ?? {};
    const sizeLabels = MWD?.mwd?.hardpointSize ?? {};
    const locationLabels = MWD?.mwd?.hardpointLocation ?? {};

    return Array.from(loadout.hardpoints ?? []).map(hardpoint => ({
      id: hardpoint.id,
      name: `${typeLabels[hardpoint.type] ?? startCase(hardpoint.type)} ${sizeLabels[hardpoint.size] ?? startCase(hardpoint.size)}`,
      subtitle: locationLabels[hardpoint.location] ?? startCase(hardpoint.location),
      summaryStats: buildSummaryStats([
        { label: "Type", value: typeLabels[hardpoint.type] ?? startCase(hardpoint.type), emphasis: "strong" },
        { label: "Size", value: sizeLabels[hardpoint.size] ?? startCase(hardpoint.size) },
      ]),
      detailTags: buildDetailTags([
        hardpoint.occupiedByName ? `Occupied by ${hardpoint.occupiedByName}` : "Open",
      ]),
      detailRows: buildDetailRows([
        { label: "Location", value: locationLabels[hardpoint.location] ?? startCase(hardpoint.location) },
        { label: "Assigned Group", value: hardpoint.occupiedByName ?? "Unassigned" },
      ]),
    }));
  }

  async _onMechAttack(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const actor = this.getPersistentActor() ?? this.actor;
    const attackKind = String(target?.dataset?.attackKind ?? "").trim();
    const groupId = String(target?.dataset?.groupId ?? "").trim();

    try {
      if (attackKind === "group" && groupId) {
        await this.#rollWeaponGroup(actor, groupId);
      } else if (attackKind === "ranged") {
        const preparedGroups = this._getPreparedRangedWeaponGroups(actor);
        const selectedGroup = await this.#promptWeaponGroup(actor, preparedGroups);
        if (selectedGroup?.id) await this.#rollWeaponGroup(actor, selectedGroup.id);
      } else if (attackKind === "melee") {
        await this.#rollMeleeAttack(actor);
      } else {
        await actor.rollRangedAttack?.();
      }
    } catch (error) {
      console.error("MWD | Failed to launch BattleMech attack", error);
      notifyRollError(error, "Unable to launch that BattleMech attack.");
    }
  }

  async _onMechMovement(event, _target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const actor = this.getPersistentActor() ?? this.actor;
    const selectedAction = await this.#promptMovementAction(actor);
    if (!selectedAction) return;

    try {
      await performMovementAction(actor, { movementKind: selectedAction.id });
    } catch (error) {
      console.error("MWD | Failed to record BattleMech movement", error);
      notifyRollError(error, "Unable to record that BattleMech movement.");
    }
  }

  async _onMechRoll(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const actor = this.getPersistentActor() ?? this.actor;
    const rollKind = String(target?.dataset?.rollKind ?? "").trim();

    try {
      if (rollKind === "piloting") {
        await performMachinePilotingCheck(actor);
      } else if (rollKind === "sensor") {
        const selectedAction = await this.#promptMachineEwAction(actor);
        if (selectedAction) await performMachineElectronicWarfare(actor, { action: selectedAction });
      } else if (rollKind === "repair") {
        const selectedIssue = await this.#promptMachineCriticalRepairIssue(actor);
        if (selectedIssue) await performMachineCriticalRepair(actor, { issue: selectedIssue });
      }
    } catch (error) {
      console.error("MWD | Failed to launch BattleMech check", error);
      notifyRollError(error, "Unable to launch that BattleMech check.");
    }
  }

  async _onHeatDangerCheck(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const actor = this.getPersistentActor() ?? this.actor;
    const checkKind = String(target?.dataset?.checkKind ?? "").trim();
    if (!["shutdown", "explosion"].includes(checkKind)) {
      ui.notifications?.warn("Unknown heat danger check.");
      return;
    }

    const heat = buildBattlemechHeatModel(actor);
    if (!heat.inDanger || !heat.dangerChecks) {
      ui.notifications?.warn("Heat danger checks are only available while the BattleMech is in Danger heat.");
      return;
    }

    const dn = checkKind === "shutdown"
      ? toNumber(heat.dangerChecks.shutdownDN, 1)
      : toNumber(heat.dangerChecks.explosionDN, 1);
    const rollApi = game.mwd?.roll ?? game.system?.mwd?.roll;
    if (!rollApi?.execute) {
      ui.notifications?.error("MWD roll system not initialized.");
      return;
    }

    try {
      await rollApi.execute({
        actor,
        event,
        payload: {
          intent: "heatDangerCheck",
          checkKind,
          dn,
          tags: ["machine", "heat", "danger", checkKind],
          edge: { allowed: [] },
          sourceTokenId: (this.getSheetTokenDocument?.() ?? this._resolveStatusToken(actor))?.id ?? null,
        },
      });
    } catch (error) {
      console.error("MWD | Failed to launch BattleMech heat danger check", error);
      notifyRollError(error, "Unable to launch that heat danger check.");
    }
  }

  async _onAddWeaponGroup(event, _target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!this.isEditable) return;

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const weaponGroups = readWeaponGroups(actorWriteTarget);
    weaponGroups.push({
      id: foundry.utils.randomID?.() ?? `group-${weaponGroups.length + 1}`,
      name: MWD?.mwd?.loadout?.newGroup ?? `Weapon Group ${weaponGroups.length + 1}`,
      weaponIds: [],
    });

    await actorWriteTarget.update({ "system.mwd.weaponGroups": weaponGroups });
    this.render({ force: true });
  }

  async _onDeleteWeaponGroup(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!this.isEditable) return;

    const groupId = String(
      target?.dataset?.groupId
      ?? target?.closest?.("[data-group-id]")?.dataset?.groupId
      ?? event?.target?.closest?.("[data-group-id]")?.dataset?.groupId
      ?? ""
    ).trim();
    if (!groupId) return;

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const weaponGroups = readWeaponGroups(actorWriteTarget);
    const groupIndex = weaponGroups.findIndex(group => String(group?.id ?? "").trim() === groupId);
    if (groupIndex < 0) return;

    weaponGroups.splice(groupIndex, 1);
    await actorWriteTarget.update({ "system.mwd.weaponGroups": weaponGroups });
    this.render({ force: true });
  }

  async _onToggleWeaponGroupHardpoint(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!this.isEditable) return;

    const groupId = String(
      target?.dataset?.groupId
      ?? target?.closest?.("[data-group-id]")?.dataset?.groupId
      ?? event?.target?.closest?.("[data-group-id]")?.dataset?.groupId
      ?? ""
    ).trim();
    const hardpointId = String(
      target?.dataset?.hardpointId
      ?? target?.closest?.("[data-hardpoint-id]")?.dataset?.hardpointId
      ?? event?.target?.closest?.("[data-hardpoint-id]")?.dataset?.hardpointId
      ?? ""
    ).trim();
    if (!groupId || !hardpointId) return;

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const hardpoint = getConfiguredMachineHardpoints(actorWriteTarget)
      .find(entry => String(entry?.id ?? "").trim() === hardpointId) ?? null;
    const itemId = String(hardpoint?.itemId ?? "").trim();
    if (!itemId) {
      ui.notifications?.warn("Only loaded hardpoints can be bundled into a weapon group.");
      return;
    }

    const weaponGroups = readWeaponGroups(actorWriteTarget);
    const group = weaponGroups.find(entry => String(entry?.id ?? "").trim() === groupId) ?? null;
    if (!group) return;

    group.weaponIds = Array.isArray(group.weaponIds)
      ? group.weaponIds.map(id => String(id ?? "").trim()).filter(Boolean)
      : [];

    const selected = group.weaponIds.includes(itemId);
    const owner = weaponGroups.find(entry =>
      String(entry?.id ?? "").trim() !== groupId
      && Array.isArray(entry?.weaponIds)
      && entry.weaponIds.map(id => String(id ?? "").trim()).includes(itemId)
    ) ?? null;

    if (!selected && owner) {
      ui.notifications?.warn(`${actorWriteTarget.items?.get?.(itemId)?.name ?? "That weapon"} is already bundled in ${owner.name ?? "another group"}.`);
      return;
    }

    group.weaponIds = selected
      ? group.weaponIds.filter(id => id !== itemId)
      : [...group.weaponIds, itemId];

    this._captureScrollPosition();
    await actorWriteTarget.update({ "system.mwd.weaponGroups": weaponGroups });
    target?.closest?.(".mwd-weapon-group-editor__choice")?.classList?.toggle("is-selected", !selected);
    this.render({ force: false });
  }

  async #rollWeaponGroup(actor, groupId) {
    const token = this.getSheetTokenDocument?.() ?? this._resolveStatusToken(actor);
    return performBattlemechRangedAttack(actor, { groupId, token });
  }

  async #rollMeleeAttack(actor) {
    const profiles = buildBattlemechMeleeProfiles(actor);
    if (!profiles.length) {
      ui.notifications?.warn(MWD.actor.vehicle.quickActions.errors.noMelee);
      return;
    }

    const selectedProfile = await this.#promptMeleeProfile(profiles);
    if (!selectedProfile) return;

    await performBattlemechMeleeAttack(actor, { profile: selectedProfile });
  }

  async #promptMeleeProfile(profiles) {
    const selectableProfiles = Array.isArray(profiles) ? profiles : [];
    if (!selectableProfiles.length) return null;
    if (selectableProfiles.length === 1) return selectableProfiles[0];

    const defaultProfile = selectableProfiles[0];
    const content = `<form class="mwd-quick-select">${selectableProfiles.map(profile => `
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

    return selectableProfiles.find(profile => profile.id === selectedId) ?? defaultProfile;
  }

  async #promptWeaponGroup(actor, preparedGroups = null) {
    const groups = Array.isArray(preparedGroups) && preparedGroups.length
      ? preparedGroups
      : this._getPreparedRangedWeaponGroups(actor);
    const selectableGroups = groups.filter(group =>
      Array.isArray(group?.weaponIds)
      && group.weaponIds.length > 0
      && group.isAttackLegal
      && group.isAvailableThisActivation
    );
    if (!selectableGroups.length) return null;
    if (selectableGroups.length === 1) return selectableGroups[0];

    const defaultGroup = selectableGroups[0];
    const content = `<form class="mwd-quick-select">${selectableGroups.map(group => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${group.id}" ${group.id === defaultGroup.id ? "checked" : ""}>
        <span>${group.name}</span>
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

  async #promptMovementAction(actor) {
    const choices = getMovementActionChoices(actor);
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

  async #promptMachineEwAction(actor) {
    const token = this.getSheetTokenDocument?.() ?? this._resolveStatusToken(actor);
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

  async #promptMachineCriticalRepairIssue(actor) {
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

  _getPreparedRangedWeaponGroups(actor) {
    const token = this.getSheetTokenDocument?.() ?? this._resolveStatusToken(actor);
    return buildBattlemechRangedAttackGroups(actor, { token });
  }

  async #openHeatDialog(actor) {
    const heat = buildBattlemechHeatModel(actor);
    const content = `
      <form class="mwd-heat-dialog" style="display:grid; gap:0.75rem;">
        <label style="display:grid; gap:0.25rem;">
          <span style="font-weight:700; text-transform:uppercase; letter-spacing:0.08em;">Current Heat</span>
          <input type="number" name="currentHeat" value="${heat.current}" min="0" step="1" />
        </label>
        <label style="display:grid; gap:0.25rem;">
          <span style="font-weight:700; text-transform:uppercase; letter-spacing:0.08em;">Pending Heat</span>
          <input type="number" name="pendingHeat" value="${heat.pendingGenerated}" min="0" step="1" />
        </label>
        <p style="margin:0; opacity:0.8;">Use pending heat for movement surcharges or GM adjustments. Resolve it here when you need an out-of-band heat cycle.</p>
      </form>
    `;

    await foundry.applications.api.DialogV2.wait({
      window: {
        title: `${actor.name ?? "BattleMech"} Heat`,
      },
      position: {
        width: 420,
      },
      content,
      buttons: [
        {
          action: "apply",
          label: "Apply",
          icon: "fa-solid fa-check",
          default: true,
          callback: async (_event, button) => {
            try {
              await this.#applyHeatDialogValues(actor, button?.form);
              return true;
            } catch (error) {
              console.error("MWD | Failed to apply heat dialog changes", error);
              ui.notifications?.error("Unable to apply heat changes.");
              return false;
            }
          },
        },
        {
          action: "resolve",
          label: "Resolve Pending Heat",
          icon: "fa-solid fa-fire",
          callback: async (_event, button) => {
            try {
              await this.#applyHeatDialogValues(actor, button?.form);
              await this.#resolvePendingHeat(actor, "heat dialog");
              return true;
            } catch (error) {
              console.error("MWD | Failed to resolve heat from dialog", error);
              ui.notifications?.error("Unable to resolve pending heat.");
              return false;
            }
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

  async #applyHeatDialogValues(actor, form) {
    const currentInput = form?.elements?.namedItem?.("currentHeat");
    const pendingInput = form?.elements?.namedItem?.("pendingHeat");
    const currentHeat = Math.max(0, Number(currentInput?.value ?? actor.system?.monitors?.heat?.value ?? 0) || 0);
    const pendingHeat = Math.max(0, Number(pendingInput?.value ?? actor.system?.mwd?.heat?.pendingGenerated ?? 0) || 0);

    await actor.setMonitorValue?.("heat", currentHeat);
    await setBattlemechPendingHeat(actor, pendingHeat, { reason: "heat dialog" });
  }

  async #resolvePendingHeat(actor, source = "sheet control") {
    const token = this.getSheetTokenDocument?.() ?? this._resolveStatusToken(actor);
    const snapshot = PersonalCombatTracker.getSnapshot?.(actor, { token }) ?? null;
    const activation = snapshot?.hasCombatant && snapshot?.isCurrentTurn ? snapshot.activation : null;

    await resolveBattlemechPendingHeat(actor, {
      source,
      activation,
      postDangerCard: true,
    });
  }

}
