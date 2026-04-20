// src/modules/sheets/vehicle-sheet-v2.js
// Purpose: Layout-driven AppV2 vehicle sheet that prepares semantic view models for dumb templates.
// How it fits: Serves as the base vehicle-scale V2 sheet and the reuse target for BattleMech sheets.

import { ANARCHY } from "../config.js";
import { SYSTEM_NAME, TEMPLATES_PATH } from "../constants.js";
import { openTokenStatusDialog } from "../dialog/token-status-dialog.js";
import { LayoutRegistry } from "../layout/layout-registry.js";
import { getActiveMachineCrits } from "../mwd/critical-hits.js";
import { getMachineCritRemedy } from "../mwd/machine-crit-remedies.js";
import { buildMachineEwPanel, resolveMachineEwActionTarget } from "../mwd/machine-ew-panel.js";
import { prepareMachineRemedyRoll } from "../mwd/machine-intents.js";
import { describeMachineCriticalEffect } from "../mwd/machine-crit-effects.js";
import {
  getMachineConditionLabel,
  getMachineConditionModifier,
  getMachineDegradationLocationPriority,
  getMachineReliabilityThreshold,
  normalizeMachineDegradationState,
} from "../mwd/machine-degradation.js";
import {
  buildMachineDegradationEffectSummary,
  getMachineMovementEffects,
  getMachineRuleState,
} from "../mwd/machine-state-effects.js";
import {
  doesHardpointAcceptItem,
  getAssignedMachineItemIds,
  getHardpointCompatibilityError,
  getConfiguredMachineHardpoints,
  rawHardpointsArray,
} from "../mwd/machine-hardpoints.js";
import { getMachineLocationLabel } from "../mwd/machine-hit-locations.js";
import { buildRemainingMonitorTrack } from "../mwd/machine-summary.js";
import { buildMachineMovementFields, buildMachineMovementSummaryParts } from "../mwd/machine-movement.js";
import { getSkillDef } from "../mwd/skills.js";
import { notifyRollError } from "../roll/roll-errors.js";
import { BaseActorSheetV2 } from "./base-actor-sheet-v2.js";
import { SelectActor } from "../dialog/select-actor.js";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function compactList(values = []) {
  return values
    .map(value => String(value ?? "").trim())
    .filter(Boolean);
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

function startCase(value = "") {
  return String(value ?? "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase());
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
      front: Object.freeze({ top: "13%", left: "50%" }),
      side: Object.freeze({ top: "40%", left: "18%" }),
      turret: Object.freeze({ top: "33%", left: "50%" }),
      core: Object.freeze({ top: "57%", left: "50%" }),
      rear: Object.freeze({ top: "83%", left: "50%" }),
      rotor: Object.freeze({ top: "17%", left: "79%" }),
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
      ewAcquire: VehicleSheetV2.prototype._onEwAcquire,
      ewTarget: VehicleSheetV2.prototype._onEwTarget,
      toggleStatuses: VehicleSheetV2.prototype._onToggleStatuses,
      machineCritRemedy: VehicleSheetV2.prototype._onMachineCritRemedy,
      assignPilot: VehicleSheetV2.prototype._onAssignPilot,
      removePilot: VehicleSheetV2.prototype._onRemovePilot,
      openPilot: VehicleSheetV2.prototype._onOpenPilot,
    }
  }, { inplace: false });

  #expandedInventoryRows = new Set();
  #hardpointDragController = null;

  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    ctx._mwdThemeClass = game.system?.mwd?.styles?.selectCssClass?.() ?? "";
    ctx.layout = await LayoutRegistry.get(this.constructor.LAYOUT_ID ?? VehicleSheetV2.LAYOUT_ID);
    ctx.vehicleSheet = {
      summaryStats: this._buildSummaryStats(),
      summaryActions: this._buildSummaryActions(),
      alerts: this._buildAlerts(),
      statusAction: {
        label: "Statuses",
        disabled: !this._resolveStatusToken(this.getPersistentActor() ?? this.actor),
        reason: "Statuses require a token for this actor on the current scene.",
      },
      ewPanel: this._buildEwPanel(),
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
    try { data = TextEditor.getDragEventData(event); } catch (_) {}
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
  }

  _buildSummaryStats() {
    const attributes = this.actor.system?.attributes ?? {};
    const structure = this.actor.system?.monitors?.structure ?? {};
    const movementParts = buildMachineMovementSummaryParts({
      actorType: this.actor.type,
      movement: this.actor.system?.movement,
      legacyMoves: this.actor.system?.moves,
      jumpProfile: this.actor.system?.mwd?.mobility?.jumping ?? null,
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
      jumpProfile: this.actor.system?.mwd?.mobility?.jumping ?? null,
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
        conditionValue,
        conditionLabel: getMachineConditionLabel(conditionValue),
        conditionModifier: getMachineConditionModifier(conditionValue),
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
      summaryEffects: machineState.effectTexts ?? [],
      movementEffects,
      locations,
    };
  }

  _buildConditionMonitors() {
    const structure = this.actor.system?.monitors?.structure ?? this.actor.system?.mwd?.monitors?.structure ?? {};
    return [
      buildRemainingMonitorTrack({ id: "structure", label: "Structure", kind: "structure", monitor: structure, editable: this.isEditable }),
    ];
  }

  _buildVehicleSections() {
    const buckets = this.actor.system?.mwd?.items ?? {};
    return {
      slots: this._buildHardpointSlotSection(),
      upgrades: this._buildRecordSection({
        sectionId: "upgrades",
        itemType: "vehicleUpgrade",
        addLabel: "Add Upgrade",
        emptyLabel: "No vehicle upgrades installed.",
        items: buckets.vehicleUpgrades ?? [],
      }),
      modules: this._buildRecordSection({
        sectionId: "modules",
        itemType: "assetModule",
        addLabel: "Add Module",
        emptyLabel: "No asset modules assigned.",
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

  _buildHardpointSlotSection() {
    const configuredHardpoints = getConfiguredMachineHardpoints(this.actor);
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
    const configured = getConfiguredMachineHardpoints(this.actor);
    const loadout = Array.from(this.actor.system?.mwd?.loadout?.hardpoints ?? []);
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
    return ANARCHY?.mwd?.hardpointType ?? ANARCHY?.mwd?.hardpoint?.type ?? {};
  }

  _getHardpointSizeLabels() {
    return ANARCHY?.mwd?.hardpointSize ?? ANARCHY?.mwd?.hardpoint?.size ?? {};
  }

  _getHardpointLocationLabels() {
    return ANARCHY?.mwd?.hardpointLocation ?? ANARCHY?.mwd?.hardpoint?.location ?? {};
  }

  _getAvailableHardpointLocations() {
    return this.actor?.type === "battlemech"
      ? ["arms", "head", "torso"]
      : ["turret"];
  }

  _getCompatibleHardpointItems(hardpoint, { includeAssignedItem = false } = {}) {
    const assignedItemIds = getAssignedMachineItemIds(this.actor);
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

  async _handleHardpointItemDrop(event, data = null) {
    const hardpointSlot = event?.target?.closest?.(".mwd-record[data-hardpoint-id]");
    if (!hardpointSlot) return false;

    const hardpointId = String(hardpointSlot.dataset?.hardpointId ?? "").trim();
    if (!hardpointId) return false;

    const hardpoint = getConfiguredMachineHardpoints(this.actor).find(entry => entry.id === hardpointId);
    if (!hardpoint) return false;

    if (String(hardpoint?.itemId ?? "").trim()) {
      ui.notifications?.warn("That hardpoint is already filled.");
      return true;
    }

    const droppedItem = await this._resolveDroppedHardpointItem(data);
    if (!droppedItem) return false;

    const compatibilityError = getHardpointCompatibilityError(hardpoint, droppedItem);
    if (compatibilityError) {
      ui.notifications?.warn(compatibilityError);
      return true;
    }

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
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

    await this._setHardpointOccupant(hardpointId, targetItemId);
    this.render({ force: true });
    return true;
  }

  async _resolveDroppedHardpointItem(data = null) {
    if (!data) return null;
    if (data?.type !== "Item") return null;

    const dropped = data?.uuid
      ? await fromUuid(data.uuid).catch(() => null)
      : null;
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

  async _setHardpointOccupant(hardpointId = "", itemId = "") {
    const normalizedHardpointId = String(hardpointId ?? "").trim();
    if (!normalizedHardpointId) return;

    const normalizedItemId = String(itemId ?? "").trim();
    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const hardpoints = foundry.utils.deepClone(rawHardpointsArray(actorWriteTarget));
    let changed = false;

    for (const hardpoint of hardpoints) {
      const currentId = String(hardpoint?.itemId ?? "").trim();
      if (normalizedItemId && currentId === normalizedItemId && String(hardpoint?.id ?? "").trim() !== normalizedHardpointId) {
        hardpoint.itemId = "";
        changed = true;
      }
      if (String(hardpoint?.id ?? "").trim() === normalizedHardpointId) {
        const nextValue = normalizedItemId || "";
        if (currentId !== nextValue) {
          hardpoint.itemId = nextValue;
          changed = true;
        }
      }
    }

    if (changed) {
      await actorWriteTarget.update({ "system.mwd.hardpoints": hardpoints });
    }
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
    return Array.from(this.actor?.items ?? []).filter(item => {
      const canonicalType = String(item?.canonicalType ?? item?.type ?? "").trim();
      return canonicalType === "mechWeapon";
    });
  }

  _buildHardpointSlotRecord(hardpoint, index = 0) {
    const slotId = String(hardpoint?.id ?? `hardpoint-${index + 1}`).trim();
    const type = String(hardpoint?.type ?? "").trim();
    const size = String(hardpoint?.size ?? "").trim();
    const location = String(hardpoint?.location ?? "").trim() || this._getDefaultHardpointLocation();
    const typeLabels = this._getHardpointTypeLabels();
    const sizeLabels = this._getHardpointSizeLabels();
    const locationLabels = this._getHardpointLocationLabels();
    const itemId = String(hardpoint?.itemId ?? "").trim();
    const item = itemId ? this.actor?.items?.get?.(itemId) ?? null : null;
    const profile = typeof item?.getCombatProfile === "function" ? item.getCombatProfile() : null;
    const accordionId = `slot:${slotId}`;
    const compatibleItems = this._getCompatibleHardpointItems(hardpoint);
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
          { label: "Ready", value: compatibleItems.length ? String(compatibleItems.length) : "0", tone: compatibleItems.length ? "green" : "orange" },
        ]),
        detailTags: buildDetailTags(["Open Hardpoint", typeLabel, sizeLabel]),
        detailRows: buildDetailRows([
          { label: "Location", value: locationLabel },
          { label: "Accepts", value: `${sizeLabel} ${typeLabel} weapons` },
          { label: "Assigned Item", value: "Empty" },
          { label: "Compatible Items", value: compatibleItems.length ? String(compatibleItems.length) : "None" },
        ]),
        detailText: compatibleItems.length
          ? "Drag a compatible weapon here, create a new weapon for this slot, or mount an existing item."
          : "This mount is open, but there are no compatible weapons currently available to assign.",
        createHardpointItem: {
          hardpointId: slotId,
          itemType: "mechWeapon",
          label: "Create Weapon for Slot",
        },
        assignHardpointItem: compatibleItems.length
          ? {
              hardpointId: slotId,
              label: compatibleItems.length === 1 ? "Mount Existing Weapon" : "Choose Existing Weapon",
            }
          : null,
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
      clearHardpointItem: {
        hardpointId: slotId,
        label: "Unmount Item",
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
          { label: "Heat", value: toNumber(system.mobility.jumping.heat, 0) },
          { label: "AR Bonus", value: toNumber(system.mobility.jumping.attackRatingBonus, 0) },
          { label: "DR Bonus", value: toNumber(system.mobility.jumping.defenseRatingBonus, 0) },
          { label: "DFA", value: system.mobility.jumping.dfaEnabled ? "Enabled" : "Disabled" },
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
        system.mobility?.jumping?.enabled ? "Jumping" : "",
        system.weaponCategory ?? system.category ?? "",
      ]),
      detailRows,
      detailText: toSnippet(notes),
      equipped: Boolean(system.equipped),
      isPrimary: Boolean(system.isPrimary),
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

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const hardpoints = foundry.utils.deepClone(rawHardpointsArray(actorWriteTarget));
    const options = this._buildHardpointOptions();
    hardpoints.push({
      id: foundry.utils.randomID?.() ?? `hardpoint-${hardpoints.length + 1}`,
      type: options.types[0]?.value ?? "energy",
      size: options.sizes[0]?.value ?? "small",
      location: this._getDefaultHardpointLocation(),
      itemId: "",
    });

    await actorWriteTarget.update({ "system.mwd.hardpoints": hardpoints });
    this.render({ force: true });
  }

  async _onDeleteHardpoint(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!this.isEditable) return;

    const index = Number(
      target?.dataset?.hardpointIndex
      ?? target?.closest?.("[data-hardpoint-index]")?.dataset?.hardpointIndex
      ?? event?.target?.closest?.("[data-hardpoint-index]")?.dataset?.hardpointIndex
    );
    if (!Number.isInteger(index) || index < 0) return;

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const hardpoints = foundry.utils.deepClone(rawHardpointsArray(actorWriteTarget));
    const removed = hardpoints[index] ?? null;
    hardpoints.splice(index, 1);

    const removedItemId = String(removed?.itemId ?? "").trim();
    if (removedItemId) {
      await actorWriteTarget.deleteEmbeddedDocuments("Item", [removedItemId]);
    }
    await actorWriteTarget.update({ "system.mwd.hardpoints": hardpoints });
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

    const actorWriteTarget = this.getPersistentActor() ?? this.actor;
    const hardpoint = rawHardpointsArray(actorWriteTarget).find(entry =>
      String(entry?.id ?? "").trim() === hardpointId
    );
    if (!hardpoint) return;

    const existingCount = actorWriteTarget.items.filter(item => (item.canonicalType ?? item.type) === "mechWeapon").length;
    const defaultDamageType = ["penetrating", "concussive", "energy", "thermal", "electrical"].includes(String(hardpoint?.type ?? "").trim())
      ? String(hardpoint.type).trim()
      : "penetrating";
    const created = await actorWriteTarget.createEmbeddedDocuments("Item", [{
      name: `Mech Weapon ${existingCount + 1}`,
      type: "mechWeapon",
      system: {
        size: String(hardpoint?.size ?? "").trim() || "small",
        damageType: defaultDamageType,
      },
    }]);

    await this._setHardpointOccupant(hardpointId, created?.[0]?.id ?? "");
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

    const hardpoint = getConfiguredMachineHardpoints(this.actor).find(entry => entry.id === hardpointId);
    if (!hardpoint) return;

    const itemId = await this._promptHardpointAssignment(hardpoint);
    if (!itemId) return;

    await this._setHardpointOccupant(hardpointId, itemId);
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

    await this._deleteMountedHardpointItem(hardpointId);
    await this._setHardpointOccupant(hardpointId, "");
    this.render({ force: true });
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

    const rollApi = game.mwd?.roll ?? game.system?.mwd?.roll;
    if (!rollApi?.execute) {
      ui.notifications?.error("MWD roll system not initialized.");
      return false;
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
      },
      event,
    });

    if (result) {
      return true;
    }

    return Boolean(result);
  }

  async _onMachineCritRemedy(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const machineActor = this.getPersistentActor() ?? this.actor;
    const request = await prepareMachineRemedyRoll({
      machineActorUuid: target?.dataset?.machineActorUuid ?? machineActor.uuid,
      critId: target?.dataset?.critId ?? "",
      remedyKey: target?.dataset?.remedyKey ?? "",
    }, {
      gmOverride: Boolean(game.user?.isGM),
    });

    if (!request.ok) {
      ui.notifications?.warn(request.reason ?? "Unable to launch that machine remedy.");
      return false;
    }

    const rollApi = game.mwd?.roll ?? game.system?.mwd?.roll;
    if (!rollApi?.execute) {
      ui.notifications?.error("MWD roll system not initialized.");
      return false;
    }

    await rollApi.execute({
      actor: request.actor,
      payload: request.payload,
      event,
    });
    return true;
  }

  async _onEwAcquire(event, _target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    return this.#launchMachineEwIntent("acquire", event);
  }

  async _onEwTarget(event, _target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    return this.#launchMachineEwIntent("targeting", event);
  }

  _resolveStatusToken(actor = this.actor) {
    return this.getSheetTokenDocument?.()
      ?? actor?.token?.document
      ?? actor?.token
      ?? actor?.getActiveTokens?.(true, true)?.[0]?.document
      ?? actor?.getActiveTokens?.(true, true)?.[0]
      ?? Array.from(canvas?.tokens?.placeables ?? [])
        .find(token => token?.actor?.id && token.actor.id === actor?.id)?.document
      ?? null;
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

  async #launchMachineEwIntent(intent, event) {
    const actor = this.getPersistentActor?.() ?? this.actor;
    const token = this._resolveStatusToken(actor);
    const rollApi = game.mwd?.roll ?? game.system?.mwd?.roll;
    if (!rollApi?.execute) return false;

    const panel = buildMachineEwPanel({ actor, token });
    const targetRow = resolveMachineEwActionTarget(panel, intent);
    if (!targetRow) {
      const verb = intent === "targeting" ? "generate targeting data" : "acquire";
      ui.notifications?.warn(`No targeted token is ready to ${verb}.`);
      return false;
    }

    try {
      await rollApi.execute({
        actor,
        payload: {
          intent,
          sourceTokenId: token?.id ?? null,
          targetTokenId: targetRow.targetTokenId,
          targetTokenUuid: targetRow.targetTokenUuid,
        },
        event,
      });
      return true;
    } catch (error) {
      console.error(`MWD | Failed to launch EW ${intent}`, error);
      const label = intent === "targeting" ? "targeting" : "acquire";
      notifyRollError(error, `Unable to launch ${label} roll.`);
      return false;
    }
  }
}
