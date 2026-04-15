// src/modules/sheets/battlemech-sheet-v2.js
// Purpose: Layout-driven flagship BattleMech sheet built on the reusable vehicle V2 sheet patterns.
// How it fits: Surfaces prepared BattleMech data through semantic context and V2-native action wiring.

import { ANARCHY } from "../config.js";
import { SYSTEM_NAME, TEMPLATES_PATH } from "../constants.js";
import { notifyRollError } from "../roll/roll-errors.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { VehicleSheetV2 } from "./vehicle-sheet-v2.js";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
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
    }
  }, { inplace: false });

  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    ctx.battlemechSheet = {
      heat: this._buildHeatModel(),
      quickActions: this._buildQuickActions(),
      weaponGroups: this._buildWeaponGroups(),
      hardpoints: this._buildHardpoints(),
      chassisFields: this._buildChassisFields(),
    };
    return ctx;
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

    const buildTrack = (id, label, kind, data) => ({
      id,
      label,
      kind,
      editable: Boolean(this.isEditable),
      value: Math.max(0, toNumber(data.value, 0)),
      max: Math.max(0, toNumber(data.max, 0)),
      segments: Array.from({ length: Math.max(0, toNumber(data.max, 0)) }, (_, index) => {
        const segmentValue = index + 1;
        return {
          value: segmentValue,
          filled: segmentValue <= Math.max(0, toNumber(data.value, 0)),
        };
      }),
      status: {
        label: "Resist",
        value: toNumber(data.resistance?.default, 0),
      },
    });

    return [
      buildTrack("structure", "Structure", "wound", structure),
      buildTrack("armor", "Armor", "armor", armor),
    ];
  }

  _buildSummaryStats() {
    const loadout = this.actor.system?.mwd?.loadout ?? {};
    const heat = this.actor.system?.mwd?.heat ?? {};
    const heatStatus = this.actor.system?.mwd?.heatStatus ?? {};

    return buildSummaryStats([
      { label: "Weight", value: startCase(this.actor.system?.mwd?.weightClass ?? "medium"), emphasis: "strong" },
      { label: "Tonnage", value: toNumber(this.actor.system?.mwd?.tonnage, 0) },
      { label: "Mounts", value: `${toNumber(loadout?.mountPoints?.used, 0)} / ${toNumber(loadout?.mountPoints?.total, 0)}` },
      { label: "Heat", value: `${toNumber(heat.current, 0)} / ${toNumber(heat.max, 0)}` },
      { label: "Status", value: heatStatus.label ?? startCase(heatStatus.code ?? "safe") },
    ]);
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
      weapons: this._buildRecordSection({
        sectionId: "weapons",
        itemType: "mechWeapon",
        addLabel: "Add Weapon",
        emptyLabel: "No BattleMech weapons configured.",
        items: buckets.mechWeapons ?? [],
      }),
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
    const heat = this.actor.system?.mwd?.heat ?? {};
    const heatStatus = this.actor.system?.mwd?.heatStatus ?? {};
    const current = Math.max(0, toNumber(heat.current, 0));
    const max = Math.max(0, toNumber(heat.max, 0));
    const thresholds = heat.thresholds ?? {};

    return {
      label: "Heat",
      current,
      max,
      editable: Boolean(this.isEditable),
      status: heatStatus.label ?? startCase(heatStatus.code ?? "safe"),
      thresholds: {
        runningHot: toNumber(thresholds.runningHot, 0),
        overheated: toNumber(thresholds.overheated, 0),
        shutdown: toNumber(thresholds.shutdown, 0),
      },
      segments: Array.from({ length: max }, (_, index) => {
        const value = index + 1;
        return {
          value,
          filled: value <= current,
          breakpoint: compactList([
            value === toNumber(thresholds.runningHot, 0) ? "runningHot" : "",
            value === toNumber(thresholds.overheated, 0) ? "overheated" : "",
            value === toNumber(thresholds.shutdown, 0) ? "shutdown" : "",
          ]).join(" "),
        };
      }),
    };
  }

  _buildQuickActions() {
    const quickActions = this.actor.system?.quickActions ?? {};
    const primaryGroup = quickActions.primaryWeaponGroup ?? null;
    const hasRangedGroups = Array.isArray(this.actor.system?.weaponGroups) && this.actor.system.weaponGroups.length > 0;
    const hasMeleeProfiles = Array.isArray(this.actor.system?.meleeProfiles) && this.actor.system.meleeProfiles.length > 0;

    return [
      {
        label: getQuickActionLabel("primaryWeapons"),
        hint: primaryGroup?.name ?? "Primary weapon group",
        handler: "mechAttack",
        disabled: !primaryGroup,
        dataset: { attackKind: "primary" }
      },
      {
        label: getQuickActionLabel("rangedAttack"),
        hint: "Prompt for a weapon group",
        handler: "mechAttack",
        disabled: !hasRangedGroups,
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
        label: getQuickActionLabel("dodgeCheck"),
        hint: "Piloting response",
        handler: "mechRoll",
        disabled: false,
        dataset: { rollKind: "dodge" }
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

  _buildWeaponGroups() {
    const groups = Array.isArray(this.actor.system?.mwd?.weaponGroupDetails)
      ? this.actor.system.mwd.weaponGroupDetails
      : [];

    return groups.map(group => ({
      id: group.id,
      name: group.name,
      subtitle: (group.weapons ?? []).map(weapon => weapon.name).join(", "),
      summaryStats: buildSummaryStats([
        { label: "Weapons", value: Array.isArray(group.weapons) ? group.weapons.length : 0, emphasis: "strong" },
        { label: "Missing", value: Array.isArray(group.missingWeaponIds) ? group.missingWeaponIds.length : 0 },
      ]),
      detailTags: buildDetailTags([
        group.isPrimary ? "Primary" : "",
        ...(Array.isArray(group.weapons) ? group.weapons.map(weapon => weapon.system?.weaponCategory ?? "") : []),
      ]),
      detailRows: buildDetailRows([
        { label: "Weapon Names", value: (group.weapons ?? []).map(weapon => weapon.name).join(", ") },
        { label: "Missing IDs", value: (group.missingWeaponIds ?? []).join(", ") },
      ]),
      action: {
        label: "Attack Group",
        dataset: {
          attackKind: "group",
          groupId: group.id,
        }
      }
    }));
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

    try {
      if (attackKind === "group" && groupId) {
        await this.#rollWeaponGroup(actor, groupId);
      } else if (attackKind === "primary") {
        const primaryGroup = (actor.system?.weaponGroups ?? []).find(group => group?.isPrimary) ?? null;
        if (primaryGroup?.id) await this.#rollWeaponGroup(actor, primaryGroup.id);
        else await actor.rollRangedAttack?.();
      } else if (attackKind === "melee") {
        await actor.rollMeleeAttack?.();
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
      if (rollKind === "dodge") await actor.rollDodge?.();
      else if (rollKind === "piloting") await actor.rollPilotingCheck?.();
      else if (rollKind === "sensor") await actor.rollSensorSweep?.();
      else if (rollKind === "repair") await actor.rollEmergencyRepair?.();
    } catch (error) {
      console.error("MWD | Failed to launch BattleMech check", error);
      notifyRollError(error, "Unable to launch that BattleMech check.");
    }
  }

  async #rollWeaponGroup(actor, groupId) {
    const group = Array.from(actor.system?.weaponGroups ?? []).find(entry => String(entry?.id ?? "").trim() === String(groupId ?? "").trim()) ?? null;
    if (!group) {
      ui.notifications?.warn("That weapon group is no longer available.");
      return;
    }

    const weapons = Array.from(group.weaponIds ?? [])
      .map(id => actor.items.get(id))
      .filter(Boolean);
    if (!weapons.length) {
      ui.notifications?.warn("That weapon group has no attached weapons.");
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
      const snapshot = PersonalCombatTracker.getSnapshot?.(actor, { token }) ?? null;
      if (snapshot?.hasCombatant) {
        const spend = await PersonalCombatTracker.spendResource(actor, {
          token,
          resource: "sa",
          cost: 2,
          actionId: "attack",
          actionLabel: "Attack",
          actionCostLabel: "2 SA",
          actionCategory: "complex"
        });
        if (!spend?.ok) ui.notifications?.warn(spend?.reason ?? "Unable to record attack action.");
      }
    }
  }
}
