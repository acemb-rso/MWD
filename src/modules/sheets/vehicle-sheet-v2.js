// src/modules/sheets/vehicle-sheet-v2.js
// Purpose: Layout-driven AppV2 vehicle sheet that prepares semantic view models for dumb templates.
// How it fits: Serves as the base vehicle-scale V2 sheet and the reuse target for BattleMech sheets.

import { SYSTEM_NAME, TEMPLATES_PATH } from "../constants.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { openTokenStatusDialog } from "../dialog/token-status-dialog.js";
import { LayoutRegistry } from "../layout/layout-registry.js";
import { getActiveMachineCrits } from "../mwd/critical-hits.js";
import { getMachineCritRemedy } from "../mwd/machine-crit-remedies.js";
import { prepareMachineRemedyRoll } from "../mwd/machine-intents.js";
import {
  getMachineConditionLabel,
  getMachineConditionModifier,
  getMachineDegradationLocationPriority,
  getMachineReliabilityThreshold,
  normalizeMachineDegradationState,
} from "../mwd/machine-degradation.js";
import { getMachineLocationLabel } from "../mwd/machine-hit-locations.js";
import { buildRemainingMonitorTrack } from "../mwd/machine-summary.js";
import { buildMachineMovementFields, buildMachineMovementSummaryParts } from "../mwd/machine-movement.js";
import { getSkillDef } from "../mwd/skills.js";
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
  mechWeapon: "BattleMech Weapon",
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
      machineWeaponAttack: VehicleSheetV2.prototype._onMachineWeaponAttack,
      toggleStatuses: VehicleSheetV2.prototype._onToggleStatuses,
      machineCritRemedy: VehicleSheetV2.prototype._onMachineCritRemedy,
      assignPilot: VehicleSheetV2.prototype._onAssignPilot,
      removePilot: VehicleSheetV2.prototype._onRemovePilot,
      openPilot: VehicleSheetV2.prototype._onOpenPilot,
    }
  }, { inplace: false });

  #expandedInventoryRows = new Set();

  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    ctx._mwdThemeClass = game.system?.mwd?.styles?.selectCssClass?.() ?? "";
    ctx.layout = await LayoutRegistry.get(this.constructor.LAYOUT_ID ?? VehicleSheetV2.LAYOUT_ID);
    ctx.vehicleSheet = {
      summaryStats: this._buildSummaryStats(),
      alerts: this._buildAlerts(),
      statusAction: {
        label: "Statuses",
        disabled: !this._resolveStatusToken(this.getPersistentActor() ?? this.actor),
        reason: "Statuses require a token for this actor on the current scene.",
      },
      activeCrits: this._buildActiveCrits(),
      attributes: this._buildAttributeCards(),
      movement: this._buildMovementCards(),
      degradation: this._buildDegradationPanel(),
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

  _buildSummaryStats() {
    const attributes = this.actor.system?.attributes ?? {};
    const structure = this.actor.system?.monitors?.structure ?? {};
    const movementParts = buildMachineMovementSummaryParts({
      actorType: this.actor.type,
      movement: this.actor.system?.movement,
      legacyMoves: this.actor.system?.moves,
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
      weapons: this._buildRecordSection({
        sectionId: "weapons",
        itemType: "vehicleWeapon",
        addLabel: "Add Weapon",
        emptyLabel: "No vehicle weapons configured.",
        items: buckets.vehicleWeapons ?? [],
      }),
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
    await actorWriteTarget.deleteEmbeddedDocuments("Item", [item.id]);
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

  _buildActiveCrits() {
    const actor = this.getPersistentActor?.() ?? this.actor;
    const degradation = this._buildDegradationPanel();
    const locationIndex = new Map((degradation.locations ?? []).map(location => [location.key, location]));
    return getActiveMachineCrits(actor).map(crit => {
      const remedy = getMachineCritRemedy(crit.remedyKey);
      const location = locationIndex.get(String(crit.locationKey ?? "").trim()) ?? null;
      const remedySkillKey = String(crit.remedySkillKey ?? remedy.skillKey ?? "").trim();
      const remedySkillLabel = getSkillDef(remedySkillKey)?.label ?? startCase(remedySkillKey);
      const remedyDn = toNumber(crit.remedyBaseDn ?? remedy.baseDn, 0) + toNumber(location?.conditionModifier ?? 0, 0);
      return {
        id: crit.id,
        label: crit.label ?? startCase(crit.key),
        locationLabel: crit.locationLabel ?? startCase(crit.locationKey),
        detail: compactList([
          Array.isArray(crit.gates) && crit.gates.length ? `Gates: ${crit.gates.join(", ")}` : "",
          Array.isArray(crit.mods) && crit.mods.length ? `Mods: ${crit.mods.join(", ")}` : "",
          crit.escalationKey ? `Escalates: ${crit.escalationKey}` : "",
        ]).join(" | "),
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
}
