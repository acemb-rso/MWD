// src/modules/sheets/battlemech-sheet-v2.js
// Purpose: Layout-driven flagship BattleMech sheet built on the reusable vehicle V2 sheet patterns.
// How it fits: Surfaces prepared BattleMech data through semantic context and V2-native action wiring.

import { ANARCHY } from "../config.js";
import { SYSTEM_NAME, TEMPLATES_PATH } from "../constants.js";
import { notifyRollError } from "../roll/roll-errors.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { buildMachineMovementSummaryParts } from "../mwd/machine-movement.js";
import { buildCriticalStatusSummary, buildIntegritySummary, buildRemainingMonitorTrack } from "../mwd/machine-summary.js";
import {
  buildBattlemechHeatModel,
  resolveBattlemechPendingHeat,
  setBattlemechPendingHeat,
} from "../mwd/machine-heat.js";
import { getConfiguredMachineHardpoints } from "../mwd/machine-hardpoints.js";
import { prepareBattlemechWeaponGroups } from "../mwd/battlemech-weapon-groups.js";
import { VehicleSheetV2 } from "./vehicle-sheet-v2.js";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

// Foundry stores arrays-of-objects as plain objects keyed by index after the
// first save. Always coerce to a real array before mutating.
function readWeaponGroups(actor) {
  const raw = foundry.utils.deepClone(actor?.system?.mwd?.weaponGroups);
  return Array.isArray(raw) ? raw : Object.values(raw ?? {});
}

function compactList(values = []) {
  return values
    .map(value => String(value ?? "").trim())
    .filter(Boolean);
}

function startCase(value = "") {
  return String(value ?? "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase());
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
  const labels = ANARCHY?.actor?.vehicle?.quickActions ?? {};
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
      mechRoll: BattlemechSheetV2.prototype._onMechRoll,
      openHeatDialog: BattlemechSheetV2.prototype._onOpenHeatDialog,
      addWeaponGroup: BattlemechSheetV2.prototype._onAddWeaponGroup,
      deleteWeaponGroup: BattlemechSheetV2.prototype._onDeleteWeaponGroup,
      togglePrimaryWeaponGroup: BattlemechSheetV2.prototype._onTogglePrimaryWeaponGroup,
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

  _buildChassisFields() {
    const tonnage = toNumber(this.actor.system?.mwd?.tonnage, 0);
    const weightClass = this.actor.system?.mwd?.weightClass ?? "medium";
    const WEIGHT_CLASS_LABELS = { light: "Light", medium: "Medium", heavy: "Heavy", assault: "Assault" };

    return [
      {
        label: "Tonnage",
        path: "system.mwd.tonnage",
        isNumber: true,
        value: tonnage,
        displayValue: String(tonnage),
      },
      {
        label: "Weight Class",
        path: "system.mwd.weightClass",
        isSelect: true,
        value: weightClass,
        displayValue: WEIGHT_CLASS_LABELS[weightClass] ?? startCase(weightClass),
        options: [
          { value: "light",   label: "Light",   selected: weightClass === "light" },
          { value: "medium",  label: "Medium",  selected: weightClass === "medium" },
          { value: "heavy",   label: "Heavy",   selected: weightClass === "heavy" },
          { value: "assault", label: "Assault", selected: weightClass === "assault" },
        ],
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
    const quickActions = actor.system?.quickActions ?? {};
    const primaryGroup = preparedGroups.find(group => group.isPrimary) ?? null;
    const availableRangedGroups = preparedGroups.filter(group => group.isAttackLegal && group.isAvailableThisActivation);
    const hasMeleeProfiles = Array.isArray(this.actor.system?.meleeProfiles) && this.actor.system.meleeProfiles.length > 0;
    const primaryHint = primaryGroup?.isAttackLegal && primaryGroup?.isAvailableThisActivation
      ? primaryGroup.name
      : (primaryGroup?.disableReason || "No ready primary ranged group");

    return [
      {
        label: getQuickActionLabel("primaryWeapons"),
        hint: primaryHint,
        handler: "mechAttack",
        disabled: !(primaryGroup?.isAttackLegal && primaryGroup?.isAvailableThisActivation),
        dataset: { attackKind: "primary" }
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
        label: getQuickActionLabel("sensorSweep"),
        hint: "Perception or technician",
        handler: "mechRoll",
        disabled: !Boolean(quickActions.hasSensorSweep),
        dataset: { rollKind: "sensor" }
      },
      {
        label: getQuickActionLabel("emergencyRepair"),
        hint: "Technician quick check",
        handler: "mechRoll",
        disabled: false,
        dataset: { rollKind: "repair" }
      },
    ];
  }

  _buildWeaponGroupSummary() {
    const actor = this.getPersistentActor() ?? this.actor;
    const mountPoints = actor.system?.mwd?.loadout?.mountPoints ?? {};
    const total = toNumber(mountPoints.total, 0);
    const used = toNumber(mountPoints.used, 0);

    return {
      total,
      used,
      remaining: Math.max(0, toNumber(mountPoints.remaining, total - used)),
    };
  }

  _buildLoadedHardpointChoices(actor) {
    const typeLabels = ANARCHY?.mwd?.hardpointType ?? {};
    const sizeLabels = ANARCHY?.mwd?.hardpointSize ?? {};
    const locationLabels = ANARCHY?.mwd?.hardpointLocation ?? {};

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
      const unloadedMembers = groupWeaponIds
        .filter(weaponId => !bundledHardpoints.some(choice => choice.itemId === weaponId))
        .map(weaponId => actor.items?.get?.(weaponId)?.name ?? weaponId)
        .filter(Boolean);
      const bundleChoices = loadedHardpoints.map(choice => {
        const selected = groupWeaponIds.includes(choice.itemId);
        const ownerGroupId = owningGroupByItemId.get(choice.itemId) ?? "";
        const assignedElsewhere = Boolean(ownerGroupId && ownerGroupId !== group.id);
        return {
          ...choice,
          selected,
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
        isPrimary: Boolean(group.isPrimary),
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
          group.isPrimary ? "Primary" : "",
          group.attackSummary?.damageTypeLabel ?? "",
          group.isAttackLegal
            ? (group.isAvailableThisActivation ? "Ready" : "Used")
            : "Blocked",
        ]),
        detailRows: buildDetailRows([
          { label: "Weapon Names", value: (group.memberWeapons ?? []).map(weapon => weapon.name).join(", ") },
          { label: "Bundled Hardpoints", value: bundledHardpoints.map(choice => choice.detailLabel).join(" | ") },
          { label: "Unloaded Members", value: unloadedMembers.join(", ") },
          { label: "Range Cap", value: formatRangeBandLabel(group.attackSummary?.rangeCap ?? "") },
          { label: "Attack Ratings", value: formatAttackRatings(group.attackSummary?.attackRatings ?? {}) },
          { label: "Missing IDs", value: (group.missingWeaponIds ?? []).join(", ") },
          { label: "Warnings", value: (group.compatibilityWarnings ?? []).join(" | ") },
          { label: "Status", value: group.disableReason || (group.isAvailableThisActivation ? "Ready to fire" : "Already fired this activation") },
        ]),
        bundleChoices,
        bundleHelp: loadedHardpoints.length
          ? "Select the loaded hardpoints that should fire together in this group."
          : "Load weapons into hardpoints on the Loadout tab before bundling them here.",
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
    const typeLabels = ANARCHY?.mwd?.hardpointType ?? {};
    const sizeLabels = ANARCHY?.mwd?.hardpointSize ?? {};
    const locationLabels = ANARCHY?.mwd?.hardpointLocation ?? {};

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
    const preparedGroups = this._getPreparedRangedWeaponGroups(actor);

    try {
      if (attackKind === "group" && groupId) {
        await this.#rollWeaponGroup(actor, groupId);
      } else if (attackKind === "primary") {
        const primaryGroup = preparedGroups.find(group => group?.isPrimary) ?? null;
        if (primaryGroup?.id) await this.#rollWeaponGroup(actor, primaryGroup.id);
        else await actor.rollRangedAttack?.();
      } else if (attackKind === "ranged") {
        const selectedGroup = await this.#promptWeaponGroup(actor, preparedGroups);
        if (selectedGroup?.id) await this.#rollWeaponGroup(actor, selectedGroup.id);
      } else if (attackKind === "melee") {
        const selectedProfile = await this.#promptMeleeProfile(actor);
        if (selectedProfile?.weaponId) await this.#rollWeapon(actor, selectedProfile.weaponId);
        else await actor.rollMeleeAttack?.();
      } else {
        await actor.rollRangedAttack?.();
      }
    } catch (error) {
      console.error("MWD | Failed to launch BattleMech attack", error);
      notifyRollError(error, "Unable to launch that BattleMech attack.");
    }
  }

  async _onMechRoll(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const actor = this.getPersistentActor() ?? this.actor;
    const rollKind = String(target?.dataset?.rollKind ?? "").trim();

    try {
      if (rollKind === "piloting") await actor.rollPilotingCheck?.();
      else if (rollKind === "sensor") await actor.rollSensorSweep?.();
      else if (rollKind === "repair") await actor.rollEmergencyRepair?.();
    } catch (error) {
      console.error("MWD | Failed to launch BattleMech check", error);
      notifyRollError(error, "Unable to launch that BattleMech check.");
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
      name: ANARCHY?.mwd?.loadout?.newGroup ?? `Weapon Group ${weaponGroups.length + 1}`,
      weaponIds: [],
      isPrimary: weaponGroups.length === 0,
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

  async _onTogglePrimaryWeaponGroup(event, target) {
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
    let changed = false;

    for (const group of weaponGroups) {
      const nextPrimary = String(group?.id ?? "").trim() === groupId;
      if (Boolean(group?.isPrimary) !== nextPrimary) {
        group.isPrimary = nextPrimary;
        changed = true;
      }
    }

    if (!changed) return;
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

    await actorWriteTarget.update({ "system.mwd.weaponGroups": weaponGroups });
    this.render({ force: true });
  }

  async #rollWeaponGroup(actor, groupId) {
    const group = this._getPreparedRangedWeaponGroups(actor)
      .find(entry => String(entry?.id ?? "").trim() === String(groupId ?? "").trim()) ?? null;
    if (!group) {
      ui.notifications?.warn("That weapon group is no longer available.");
      return;
    }
    if (!group.isAttackLegal || !group.isAvailableThisActivation) {
      ui.notifications?.warn(group.disableReason || "That weapon group cannot attack right now.");
      return;
    }

    const rollApi = game.mwd?.roll ?? game.system?.mwd?.roll;
    if (!rollApi?.execute) {
      await actor.rollRangedAttack?.();
      return;
    }

    const token = this._resolveStatusToken(actor);
    const result = await rollApi.execute({
      actor,
      payload: {
        intent: "attack",
        weaponGroupId: group.id,
        edge: { pool: "physical.grit", allowed: ["pre", "post"] },
        tags: ["combat", "attack", "machine", "groupFire"],
        sourceTokenId: token?.id ?? null,
      }
    });

    if (result) {
      return true;
    }
  }

  async #rollWeapon(actor, weaponId) {
    const item = weaponId ? actor.items?.get?.(weaponId) : null;
    if (!item) {
      ui.notifications?.warn("That weapon is no longer available.");
      return;
    }

    const rollApi = game.mwd?.roll ?? game.system?.mwd?.roll;
    if (!rollApi?.execute) {
      await actor.rollRangedAttack?.();
      return;
    }

    const token = this._resolveStatusToken(actor);
    const result = await rollApi.execute({
      actor,
      payload: {
        intent: "attack",
        weaponId: item.id,
        edge: { pool: "physical.grit", allowed: ["pre", "post"] },
        tags: ["combat", "attack", "machine"],
        sourceTokenId: token?.id ?? null,
      }
    });

    if (result) {
      return true;
    }
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

    const defaultGroup = selectableGroups.find(group => group?.isPrimary) ?? selectableGroups[0];
    const content = `<form class="mwd-quick-select">${selectableGroups.map(group => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${group.id}" ${group.id === defaultGroup.id ? "checked" : ""}>
        <span>${group.name}${group.isPrimary ? ` (${ANARCHY.actor.vehicle.quickActions.primaryLabel})` : ""}</span>
      </label>`).join("")}</form>`;

    const selectedId = await Dialog.prompt({
      title: ANARCHY.actor.vehicle.quickActions.selectWeaponGroup,
      content,
      label: ANARCHY.common.roll.button,
      callback: html => html.find('input[name="weapon-group"]:checked').val() ?? defaultGroup.id,
    });

    return selectableGroups.find(group => group.id === selectedId) ?? defaultGroup;
  }

  _getPreparedRangedWeaponGroups(actor) {
    const token = this.getSheetTokenDocument?.() ?? this._resolveStatusToken(actor);
    const snapshot = PersonalCombatTracker.getSnapshot?.(actor, { token }) ?? null;
    const usedWeaponGroupIds = snapshot?.isCurrentTurn
      ? PersonalCombatTracker.getUsedWeaponGroupIds?.(actor, { token, snapshot }) ?? []
      : [];

    return prepareBattlemechWeaponGroups(actor, { usedWeaponGroupIds });
  }

  async #promptMeleeProfile(actor) {
    const profiles = Array.from(actor.system?.meleeProfiles ?? []);
    if (!profiles.length) return null;
    if (profiles.length === 1) return profiles[0];

    const defaultProfile = profiles[0];
    const content = `<form class="mwd-quick-select">${profiles.map(profile => `
      <label class="quick-select-option">
        <input type="radio" name="melee-profile" value="${profile.id}" ${profile.id === defaultProfile.id ? "checked" : ""}>
        <span>${profile.name}</span>
      </label>`).join("")}</form>`;

    const selectedId = await Dialog.prompt({
      title: ANARCHY.actor.vehicle.quickActions.selectMeleeProfile,
      content,
      label: ANARCHY.common.roll.button,
      callback: html => html.find('input[name="melee-profile"]:checked').val() ?? defaultProfile.id,
    });

    return profiles.find(profile => profile.id === selectedId) ?? defaultProfile;
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
