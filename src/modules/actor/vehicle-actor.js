// src/modules/actor/vehicle-actor.js
// Purpose: References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { ACTOR_ATTRIBUTE_SETS, ICONS_PATH, TEMPLATE } from "../constants.js";
import { AnarchyBaseActor } from "./base-actor.js";
import { normalizeMachineMonitorResistance } from "../mwd/machine-monitors.js";
import { normalizeMachineDegradationState } from "../mwd/machine-degradation.js";
import { normalizeMachineMovement } from "../mwd/machine-movement.js";
import { getMachineRuntimeAttributeAdjustments } from "../mwd/machine-state-effects.js";
import { getSkillDef } from "../mwd/skills.js";
import { buildMachineEwPanel, resolveMachineEwActionTarget } from "../mwd/machine-ew-panel.js";
import { getMountedMachineItems } from "../mwd/machine-hardpoints.js";
import { getMachineRepairIssues } from "../mwd/machine-repair-issues.js";
import { prepareMachineRemedyRoll } from "../mwd/machine-intents.js";
import { resolveMachineSceneToken } from "../mwd/machine-token-resolution.js";
import { buildVehicleMovementActionChoices, performVehicleMovementAction } from "../mwd/vehicle-movement-actions.js";
import { normalizeVehicleMovementProfile } from "../mwd/vehicle-profiles.js";
import { buildVehicleStrainModel, normalizeVehicleStrainState } from "../mwd/vehicle-strain.js";

function getMachineRollApi() {
  return game.mwd?.roll ?? game.system?.mwd?.roll ?? null;
}

function resolveMachineToken(actor) {
  return resolveMachineSceneToken(actor);
}

function forcedDeletion() {
  return foundry.data.operators.ForcedDeletion;
}

export class VehicleActor extends AnarchyBaseActor {

  prepareDerivedData() {
    this._prepareMwdAttributes();
    this._prepareMwdVehicleProfile();
    this._prepareMwdDegradation();
    this._prepareMwdCrew();
    this._prepareMwdStrain();
    this._prepareMwdMovement();
    this._prepareMwdMonitors();
    this._prepareMwdItems();
    super.prepareDerivedData();
    this.system.skills = this._prepareSkillMap();
    this.system.quickActions = {
      hasMountedWeapons: getMountedMachineItems(this, { canonicalType: TEMPLATE.itemType.mechWeapon }).length > 0,
      hasSensorSweep: Boolean(this.system.skills.perception || this.system.skills.technician || this.system.skills.gunnery),
      movement: this.getMovementActionChoices(),
      strain: buildVehicleStrainModel(this),
      movementProfile: this.system.mwd?.movementProfile ?? "tracked",
    };
  }

  static get defaultIcon() {
    return `${ICONS_PATH}/default/Default_Vehicle.svg`
  }

  static get initiative() {
    return AnarchyBaseActor.initiative
  }

  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    }
  }

  getAttributes() { return ACTOR_ATTRIBUTE_SETS[this.type] ?? ACTOR_ATTRIBUTE_SETS[TEMPLATE.actorTypes.vehicle]; }

  getPhysicalAgility() { return TEMPLATE.actorAttributes.handling }

  getDamageMonitor(damageType) {
    damageType = this.resolveDamageType(damageType);
    switch (damageType) {
      case TEMPLATE.monitors.physical: return TEMPLATE.monitors.structure
      case TEMPLATE.monitors.fatigue: return undefined
    }
    return super.getDamageMonitor(damageType)
  }

  getRightToDefend() {
    return CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER
  }

  async _migrateHandlingToAttribute(actor) {
    const fromAttribute = this.system.attributes.handling?.value ?? 0
    const fromOldField = this.system.handling
    if (fromOldField && fromAttribute < fromOldField) {
      await this.update({
        "system.handling": forcedDeletion(),
        "system.attributes.handling.value": fromOldField
      })
    }
  }

  _prepareMwdAttributes() {
    const mwd = this.system.mwd = this.system.mwd ?? {};

    const defaults = {
      [TEMPLATE.actorAttributes.handling]: { value: 0 },
      [TEMPLATE.actorAttributes.system]: { value: 0 },
      [TEMPLATE.actorAttributes.reliability]: { value: 0 },
      [TEMPLATE.actorAttributes.condition]: { value: 0 },
      [TEMPLATE.actorAttributes.chassis]: { value: 0 },
    };

    const mergedAttributes = foundry.utils.mergeObject(
      foundry.utils.duplicate(defaults),
      this.system.attributes ?? {},
      { inplace: false, recursive: true }
    );

    this.system.attributes = mergedAttributes;
    mwd.attributes = foundry.utils.mergeObject(
      foundry.utils.duplicate(defaults),
      mwd.attributes ?? {},
      { inplace: false, recursive: true }
    );

    Object.entries(mwd.attributes).forEach(([key, data]) => {
      if (mergedAttributes[key]?.value === undefined) {
        mergedAttributes[key] = mergedAttributes[key] ?? {};
        mergedAttributes[key].value = data?.value ?? 0;
      }
    });

    const adjustments = getMachineRuntimeAttributeAdjustments(this);
    for (const [key, delta] of Object.entries(adjustments)) {
      if (!delta) continue;
      mergedAttributes[key] = mergedAttributes[key] ?? { value: 0 };
      mergedAttributes[key].value = Math.max(0, Number(mergedAttributes[key]?.value ?? 0) + Number(delta ?? 0));
      mwd.attributes[key] = mwd.attributes[key] ?? {};
      mwd.attributes[key].value = mergedAttributes[key].value;
    }
  }

  _prepareMwdDegradation() {
    normalizeMachineDegradationState(this.system, this.type);
  }

  _prepareMwdVehicleProfile() {
    if (this.type !== TEMPLATE.actorTypes.vehicle) return;
    normalizeVehicleMovementProfile(this.system);
  }

  _prepareMwdCrew() {
    const mwd = this.system.mwd = this.system.mwd ?? {};
    const crew = mwd.crew = mwd.crew ?? {};
    const count = Math.max(0, Number(crew.count ?? 1) || 0);
    crew.count = count;
    crew.effectiveCount = Math.max(0, Number(crew.effectiveCount ?? count) || 0);
    crew.injuryLevel = Math.max(0, Number(crew.injuryLevel ?? 0) || 0);
    crew.bailedOut = Boolean(crew.bailedOut);
  }

  _prepareMwdStrain() {
    normalizeVehicleStrainState(this.system, this.type);
  }

  _prepareMwdMovement() {
    const movement = normalizeMachineMovement(this.system.movement, {
      actorType: this.type,
      legacyMoves: this.system.moves,
    });

    this.system.movement = movement;
    this.system.moves = movement.ground ?? Math.max(0, Number(this.system.moves ?? 0) || 0);
  }

  _prepareMwdMonitors() {
    const mwd = this.system.mwd = this.system.mwd ?? {};
    const monitors = this.system.monitors = this.system.monitors ?? {};

    // --- Armor ---
    // Machine armor is a damage buffer, not innate resistance. Keep any legacy
    // stored resistance from affecting generic monitor helpers by normalizing it
    // to zero during actor preparation.
    const defaultArmorMax = this.type === TEMPLATE.actorTypes.battlemech ? 15 : 12;
    const armorMax = Math.max(0, Number(monitors.armor?.max ?? defaultArmorMax));

    monitors.armor = foundry.utils.mergeObject(
      { value: 0, max: armorMax, resistance: AnarchyBaseActor.normalizeResistance(monitors.armor?.resistance) },
      monitors.armor ?? {},
      { inplace: false, recursive: true }
    );
    monitors.armor.resistance = normalizeMachineMonitorResistance(monitors.armor.resistance);

    // --- Structure ---
    const structureDefaults = {
      value: monitors.structure?.value ?? 0,
      max: monitors.structure?.max ?? (this.type === TEMPLATE.actorTypes.battlemech ? 18 : 15),
      resistance: AnarchyBaseActor.normalizeResistance(monitors.structure?.resistance),
    };

    monitors.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(structureDefaults),
      monitors.structure ?? {},
      { inplace: false, recursive: true }
    );
    monitors.structure.resistance = normalizeMachineMonitorResistance(monitors.structure.resistance);

    mwd.monitors = mwd.monitors ?? {};
    mwd.monitors.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(structureDefaults),
      mwd.monitors.structure ?? {},
      { inplace: false, recursive: true }
    );

    if (this.type === TEMPLATE.actorTypes.battlemech) {
      const heatDefaults = {
        value: monitors.heat?.value ?? mwd.heat?.current ?? 0,
        max: monitors.heat?.max ?? mwd.heat?.hardMax ?? 10,
        resistance: AnarchyBaseActor.normalizeResistance(monitors.heat?.resistance),
      };

      monitors.heat = foundry.utils.mergeObject(
        foundry.utils.duplicate(heatDefaults),
        monitors.heat ?? {},
        { inplace: false, recursive: true }
      );

      mwd.monitors.heat = foundry.utils.mergeObject(
        foundry.utils.duplicate(heatDefaults),
        mwd.monitors.heat ?? {},
        { inplace: false, recursive: true }
      );
    }
  }

  _prepareMwdItems() {
    const mwd = this.system.mwd = this.system.mwd ?? {};

    const schemaItemTypes = {
      skills: ['skill'],
      traits: ['trait', TEMPLATE.itemType.quality],
      lifeModules: ['lifeModule'],
      cues: ['cue'],
      dispositions: ['disposition'],
      // Consumables ride the same inventory rail as general gear for the
      // legacy actor-side item catalog until those callers move to explicit
      // canonical buckets.
      gear: ['gear', 'consumable'],
      assetModules: ['assetModule'],
      vehicleUpgrades: ['vehicleUpgrade'],
      mechEquipment: ['mechEquipment'],
      personalWeapons: ['personalWeapon', 'weapon'],
      vehicleWeapons: ['vehicleWeapon'],
      mechWeapons: ['mechWeapon'],
      weaponGroups: ['weaponGroup'],
    };

    mwd.items = Object.fromEntries(
      Object.entries(schemaItemTypes).map(([key, types]) => [
        key,
        this.items.filter(it => types.includes(it.type)),
      ])
    );
  }

  getMovementActionChoices() {
    return buildVehicleMovementActionChoices(this);
  }

  async performMovementAction({ movementKind = "", operatorActorUuid = "" } = {}) {
    return performVehicleMovementAction(this, { movementKind, operatorActorUuid });
  }

  async rollRangedAttack({ weaponId = "", operatorActorUuid = "" } = {}) {
    const weapons = getMountedMachineItems(this, { canonicalType: TEMPLATE.itemType.mechWeapon });
    if (!weapons.length) {
      ui.notifications?.warn("No mounted vehicle weapons available.");
      return;
    }

    const requestedWeapon = weaponId
      ? weapons.find(weapon => String(weapon?.id ?? "").trim() === String(weaponId ?? "").trim()) ?? null
      : null;
    const selectedWeapon = requestedWeapon ?? await this._promptMountedWeapon(weapons);
    if (!selectedWeapon) return;

    const rollApi = getMachineRollApi();
    if (!rollApi?.execute) {
      ui.notifications?.error("MWD roll system not initialized.");
      return;
    }

    const token = resolveMachineToken(this);
    await rollApi.execute({
      actor: this,
      payload: {
        intent: "attack",
        sourceType: "mechWeapon",
        sourceId: selectedWeapon.id,
        weaponId: selectedWeapon.id,
        edge: { pool: "physical.grit", allowed: ["pre", "post"] },
        tags: ["combat", "attack", "machine", "vehicleMounted"],
        sourceTokenId: token?.id ?? null,
        operatorActorUuid: String(operatorActorUuid ?? "").trim(),
      },
    });
  }

  async rollPilotingCheck({ operatorActorUuid = "" } = {}) {
    await this._rollQuickSkill(this.system.skills?.piloting, {
      operatorActorUuid,
      machineAttributeKey: TEMPLATE.actorAttributes.handling,
      quickAction: { title: "Piloting Check" },
    });
  }

  async rollElectronicWarfare({ operatorActorUuid = "" } = {}) {
    const token = resolveMachineToken(this);
    const panel = buildMachineEwPanel({ actor: this, token });
    const actions = [
      {
        id: "acquire",
        intent: "acquire",
        label: "Acquire Target",
        hint: "Advance detection state on the first eligible targeted token.",
        disabled: !panel.canAcquireAny,
      },
      {
        id: "targeting",
        intent: "targeting",
        label: "Generate Fire Solution",
        hint: "Create targeting data for the first eligible targeted token.",
        disabled: !panel.canTargetAny,
      },
    ].filter(action => !action.disabled);

    if (!actions.length) {
      ui.notifications?.warn("EW actions require an eligible targeted token and an available sensor action.");
      return;
    }

    const selectedAction = actions.length === 1 ? actions[0] : await this._promptElectronicWarfareAction(actions);
    if (!selectedAction) return;

    const targetRow = resolveMachineEwActionTarget(panel, selectedAction.intent);
    if (!targetRow) {
      ui.notifications?.warn("No targeted token is ready for that EW action.");
      return;
    }

    const rollApi = getMachineRollApi();
    if (!rollApi?.execute) {
      ui.notifications?.error("MWD roll system not initialized.");
      return;
    }

    await rollApi.execute({
      actor: this,
      payload: {
        intent: selectedAction.intent,
        sourceTokenId: token?.id ?? null,
        targetTokenId: targetRow.targetTokenId,
        targetTokenUuid: targetRow.targetTokenUuid,
        operatorActorUuid: String(operatorActorUuid ?? "").trim(),
      },
    });
  }

  async rollSensorSweep(options = {}) {
    return this.rollElectronicWarfare(options);
  }

  async rollEmergencyRepair({ operatorActorUuid = "" } = {}) {
    const issues = getMachineRepairIssues(this);
    if (!issues.length) {
      ui.notifications?.warn("No active criticals or repairable statuses are available.");
      return;
    }

    const selectedIssue = issues.length === 1 ? issues[0] : await this._promptRepairIssue(issues);
    if (!selectedIssue) return;

    const request = await prepareMachineRemedyRoll({
      machineActorUuid: this.uuid,
      issueKind: selectedIssue.issueKind,
      issueId: selectedIssue.issueId,
      critId: selectedIssue.issueKind === "crit" ? selectedIssue.issueId : "",
      statusId: selectedIssue.issueKind === "status" ? selectedIssue.issueId : "",
      remedyKey: selectedIssue.remedyKey,
      operatorActorUuid: String(operatorActorUuid ?? "").trim(),
    }, {
      gmOverride: Boolean(game.user?.isGM),
    });

    if (!request.ok) {
      ui.notifications?.warn(request.reason ?? "Unable to launch the repair action.");
      return;
    }

    const rollApi = getMachineRollApi();
    if (!rollApi?.execute) {
      ui.notifications?.error("MWD roll system not initialized.");
      return;
    }

    await rollApi.execute({ actor: request.actor, payload: request.payload });
  }

  _prepareSkillMap() {
    return {
      gunnery: this._resolveSkill("gunnery"),
      piloting: this._resolveSkill("piloting"),
      perception: this._resolveSkill("perception"),
      technician: this._resolveSkill("technician"),
    };
  }

  _resolveSkill(code) {
    const skill = this.items.find(it => it.type === TEMPLATE.itemType.skill && it.system.code === code);
    if (skill) return skill;

    const skillDef = getSkillDef(code);
    if (!skillDef) return undefined;

    return {
      name: skillDef.label ?? code,
      system: {
        code,
        attribute: skillDef.attribute,
        value: 0,
      },
    };
  }

  async _rollQuickSkill(skill, options = {}) {
    const rollApi = getMachineRollApi();
    if (!rollApi?.execute) {
      ui.notifications?.error("MWD roll system not initialized.");
      return;
    }

    await rollApi.execute({
      actor: this,
      payload: {
        intent: "skill",
        key: skill?.system?.code ?? "",
        attrKey: skill?.system?.attribute ?? this.getPhysicalAgility(),
        ...(options.machineAttributeKey ? { machineAttributeKey: options.machineAttributeKey } : {}),
        ...(options.operatorActorUuid ? { operatorActorUuid: String(options.operatorActorUuid).trim() } : {}),
        quickAction: options.quickAction ?? null,
        edge: { allowed: ["pre", "post"] },
        tags: ["machine", "vehicle", "skill"],
      },
    });
  }

  async _promptMountedWeapon(weapons) {
    const selectable = Array.isArray(weapons) ? weapons.filter(Boolean) : [];
    if (!selectable.length) return null;
    if (selectable.length === 1) return selectable[0];

    const defaultWeapon = selectable[0];
    const content = `<form class="mwd-quick-select">${selectable.map(weapon => `
      <label class="quick-select-option">
        <input type="radio" name="vehicle-weapon" value="${weapon.id}" ${weapon.id === defaultWeapon.id ? "checked" : ""}>
        <span>${weapon.name}</span>
      </label>`).join("")}</form>`;

    const selectedId = await Dialog.prompt({
      title: "Select Mounted Weapon",
      content,
      label: "Attack",
      callback: html => html.find('input[name="vehicle-weapon"]:checked').val() ?? defaultWeapon.id,
    });

    return selectable.find(weapon => weapon.id === selectedId) ?? defaultWeapon;
  }

  async _promptElectronicWarfareAction(actions) {
    const defaultAction = actions[0];
    const content = `<form class="mwd-quick-select">${actions.map(action => `
      <label class="quick-select-option">
        <input type="radio" name="ew-action" value="${action.id}" ${action.id === defaultAction.id ? "checked" : ""}>
        <span>${action.label}</span>
        <small>${action.hint}</small>
      </label>`).join("")}</form>`;

    const selectedId = await Dialog.prompt({
      title: "Electronic Warfare",
      content,
      label: "Roll",
      callback: html => html.find('input[name="ew-action"]:checked').val() ?? defaultAction.id,
    });

    return actions.find(action => action.id === selectedId) ?? defaultAction;
  }

  async _promptRepairIssue(issues) {
    const defaultIssue = issues[0];
    const content = `<form class="mwd-quick-select">${issues.map(issue => `
      <label class="quick-select-option">
        <input type="radio" name="repair-issue" value="${issue.issueKind}:${issue.issueId}" ${issue.issueKind === defaultIssue.issueKind && issue.issueId === defaultIssue.issueId ? "checked" : ""}>
        <span>${issue.label}</span>
        <small>${issue.remedyLabel} | ${issue.remedySummary || `DN ${issue.totalDn}`}</small>
      </label>`).join("")}</form>`;

    const selectedKey = await Dialog.prompt({
      title: "Emergency Repair",
      content,
      label: "Roll",
      callback: html => html.find('input[name="repair-issue"]:checked').val() ?? `${defaultIssue.issueKind}:${defaultIssue.issueId}`,
    });

    return issues.find(issue => `${issue.issueKind}:${issue.issueId}` === selectedKey) ?? defaultIssue;
  }

}
