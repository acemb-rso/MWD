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
      } else if (attackKind === "ranged") {
        const selectedGroup = await this.#promptWeaponGroup(actor);
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

  async #promptWeaponGroup(actor) {
    const groups = Array.from(actor.system?.weaponGroups ?? []).filter(group => Array.isArray(group?.weaponIds) && group.weaponIds.length > 0);
    if (!groups.length) return null;
    if (groups.length === 1) return groups[0];

    const defaultGroup = groups.find(group => group?.isPrimary) ?? groups[0];
    const content = `<form class="mwd-quick-select">${groups.map(group => `
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

    return groups.find(group => group.id === selectedId) ?? defaultGroup;
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
