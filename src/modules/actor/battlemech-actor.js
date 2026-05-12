// src/modules/actor/battlemech-actor.js
// Purpose: References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { ANARCHY } from "../config.js";
import { ANARCHY_SYSTEM, ICONS_PATH, TEMPLATE } from "../constants.js";
import { RollDialog } from "../roll/roll-dialog.js";
import { VehicleActor } from "./vehicle-actor.js";
import { BattlemechLoadout } from "../mwd/battlemech-loadout.js";
import { getSkillDef } from "../mwd/skills.js";
import {
  getMachineHeatStatusLabel,
} from "../mwd/heat-state.js";
import { buildBattlemechHeatModel } from "../mwd/machine-heat.js";
import { buildBattlemechMobilityModel } from "../mwd/battlemech-mobility.js";
import {
  buildBattlemechMovementActionChoices,
  performBattlemechMovementAction,
} from "../mwd/battlemech-movement-actions.js";
import {
  buildBattlemechMeleeProfiles,
  performBattlemechMeleeAttack,
} from "../mwd/battlemech-melee-actions.js";
import {
  buildBattlemechRangedAttackGroups,
  performBattlemechRangedAttack,
} from "../mwd/battlemech-ranged-actions.js";
import { prepareBattlemechWeaponGroups } from "../mwd/battlemech-weapon-groups.js";
import {
  buildMachineCriticalRepairIssues,
  buildMachineEwActionChoices,
  performMachineCriticalRepair,
  performMachineElectronicWarfare,
  performMachinePilotingCheck,
} from "../mwd/machine-quick-actions.js";
import { getMountedMachineItems } from "../mwd/machine-hardpoints.js";
import { resolveMachineSceneToken } from "../mwd/machine-token-resolution.js";

function getMachineRollApi() {
  return game.mwd?.roll ?? game.system?.mwd?.roll ?? null;
}

function resolveMachineToken(actor) {
  return resolveMachineSceneToken(actor);
}

export class BattlemechActor extends VehicleActor {

  static get defaultIcon() {
    return `${ICONS_PATH}/vehicles/apc.svg`;
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    this.system.mwd = this.system.mwd ?? {};
    this.system.mwd.model = this.system.mwd.model ?? "";
    this.system.mwd.chassis = this.system.mwd.chassis ?? '';
    this.system.mwd.tonnage = this.system.mwd.tonnage ?? 0;
    this.system.mwd.mobility = buildBattlemechMobilityModel(this);
    this.system.mwd.loadout = new BattlemechLoadout(this).compute();
    this.system.mwd.weaponGroupDetails = this._prepareConfiguredWeaponGroups();
    this.system.mwd.heat = this._prepareHeatTrack();

    this.system.skills = this._prepareSkillMap();
    this.system.weaponGroups = this._prepareWeaponGroups();
    this.system.meleeProfiles = this._prepareMeleeProfiles();
    this.system.quickActions = {
      hasLegalRangedGroups: this.system.weaponGroups.some(group => group.isAttackLegal),
      hasSensorSweep: Boolean(this.system.skills.perception || this.system.skills.technician),
      movement: this.getMovementActionChoices(),
      jumping: this.system.mwd.mobility?.jumping ?? null,
    };
  }

  async rollRangedAttack({ groupId = "", operatorActorUuid = "" } = {}) {
    const token = resolveMachineToken(this);
    const weaponGroups = buildBattlemechRangedAttackGroups(this, { token })
      .filter(group => group?.isAttackLegal && group?.isAvailableThisActivation);
    if (weaponGroups.length === 0) {
      ui.notifications.warn(ANARCHY.actor.vehicle.quickActions.errors.noRanged);
      return;
    }

    const requestedGroupId = String(groupId ?? "").trim();
    const requestedGroup = requestedGroupId
      ? weaponGroups.find(group => String(group?.id ?? "").trim() === requestedGroupId) ?? null
      : null;
    const selectedGroup = requestedGroup ?? await this._promptWeaponGroup(weaponGroups);
    if (!selectedGroup) {
      return;
    }

    await performBattlemechRangedAttack(this, { group: selectedGroup, token, operatorActorUuid });
  }

  getMovementActionChoices() {
    return buildBattlemechMovementActionChoices(this);
  }

  async performMovementAction({ movementKind = "", operatorActorUuid = "" } = {}) {
    return performBattlemechMovementAction(this, { movementKind, operatorActorUuid });
  }

  async rollMeleeAttack({ operatorActorUuid = "" } = {}) {
    const meleeProfiles = buildBattlemechMeleeProfiles(this);
    if (meleeProfiles.length === 0) {
      ui.notifications.warn(ANARCHY.actor.vehicle.quickActions.errors.noMelee);
      return;
    }

    const selectedProfile = await this._promptMeleeProfile(meleeProfiles);
    if (!selectedProfile) {
      return;
    }

    await performBattlemechMeleeAttack(this, { profile: selectedProfile, operatorActorUuid });
  }

  async rollPilotingCheck({ operatorActorUuid = "" } = {}) {
    await performMachinePilotingCheck(this, { operatorActorUuid });
  }

  async rollElectronicWarfare({ operatorActorUuid = "" } = {}) {
    const token = resolveMachineToken(this);
    const actions = buildMachineEwActionChoices(this, { token });

    if (!actions.length) {
      ui.notifications.warn(ANARCHY.actor.vehicle.quickActions.errors.noSensorSweep);
      return;
    }

    const selectedAction = actions.length === 1
      ? actions[0]
      : await this._promptElectronicWarfareAction(actions);
    if (!selectedAction) return;

    await performMachineElectronicWarfare(this, { action: selectedAction, token, operatorActorUuid });
  }

  async rollSensorSweep(options = {}) {
    return this.rollElectronicWarfare(options);
  }

  async rollEmergencyRepair({ operatorActorUuid = "" } = {}) {
    const issues = buildMachineCriticalRepairIssues(this);
    if (!issues.length) {
      ui.notifications?.warn("No active criticals or repairable statuses are available.");
      return;
    }

    const selectedIssue = issues.length === 1
      ? issues[0]
      : await this._promptRepairIssue(issues);
    if (!selectedIssue) return;

    await performMachineCriticalRepair(this, { issue: selectedIssue, operatorActorUuid });
  }

  _prepareSkillMap() {
    return {
      gunnery: this._resolveSkill('gunnery'),
      melee: this._resolveSkill('meleeCombat'),
      piloting: this._resolveSkill('piloting'),
      perception: this._resolveSkill('perception'),
      technician: this._resolveSkill('technician')
    }
  }

  _prepareHeatTrack() {
    const systemData = this.system ?? {};
    const prepared = buildBattlemechHeatModel(systemData);
    const heat = foundry.utils.mergeObject(systemData.mwd?.heat ?? {}, {
      current: prepared.current,
      max: prepared.max,
      dissipation: prepared.dissipation,
      effectiveDissipation: prepared.effectiveDissipation,
      coolingImpaired: prepared.coolingImpaired,
      pendingGenerated: prepared.pendingGenerated,
      thresholds: {
        runningHot: prepared.thresholds.runningHot,
        overheated: prepared.thresholds.overheated,
        shutdown: prepared.thresholds.shutdown,
      },
      penalties: {
        movementPenalty: prepared.penalties.movementPenalty,
        rangedDicePenalty: prepared.penalties.rangedDicePenalty,
        dangerLevel: prepared.penalties.dangerLevel,
      },
      statusCode: prepared.statusCode,
      status: prepared.status,
      inDanger: prepared.inDanger,
      volatile: prepared.volatile,
    }, { inplace: false });

    const status = prepared.statusCode;
    this.system.mwd.heatStatus = {
      code: status,
      label: ANARCHY.actor.battlemech.heat.status[status] ?? getMachineHeatStatusLabel(status)
    };

    return heat;
  }

  _prepareConfiguredWeaponGroups() {
    return prepareBattlemechWeaponGroups(this);
  }

  _resolveSkill(code) {
    const skill = this.items.find(it => it.type === TEMPLATE.itemType.skill && it.system.code === code);
    if (skill) {
      return skill;
    }

    const skillDef = getSkillDef(code);
    if (!skillDef) return undefined;

    return {
      name: skillDef.label ?? (ANARCHY.skill?.[code] ?? code),
      system: {
        code,
        attribute: skillDef.attribute,
        value: 0
      }
    };
  }

  _prepareWeaponGroups() {
    const configuredGroups = (this.system.mwd?.weaponGroupDetails ?? [])
      .map(group => ({
        ...group,
        weapons: group.memberWeapons ?? [],
      }))
      .filter(group => group.weaponIds.length > 0);

    if (configuredGroups.length > 0) {
      return configuredGroups.map(group => ({
        id: group.id,
        name: group.name,
        weaponIds: group.weaponIds,
        missingWeaponIds: group.missingWeaponIds ?? [],
        memberWeapons: group.memberWeapons ?? [],
        compatibilityWarnings: group.compatibilityWarnings ?? [],
        isAttackLegal: group.isAttackLegal !== false,
        isAvailableThisActivation: group.isAvailableThisActivation !== false,
        disableReason: group.disableReason ?? "",
        attackSummary: group.attackSummary ?? null,
      }));
    }

    const weapons = getMountedMachineItems(this, { canonicalType: TEMPLATE.itemType.mechWeapon });
    if (weapons.length === 0) {
      return [];
    }

    const favoriteWeapons = weapons.filter(it => this.hasFavorite(TEMPLATE.itemType.mechWeapon, it.id));
    const groups = [];
    if (favoriteWeapons.length > 0) {
      groups.push({
        id: 'favorite',
        name: ANARCHY.common.favorite,
        weaponIds: favoriteWeapons.map(it => it.id),
      });
    }

    groups.push({
      id: 'all',
      name: ANARCHY.actor.vehicle.quickActions.allWeapons,
      weaponIds: weapons.map(it => it.id),
    });

    return groups;
  }

  _prepareMeleeProfiles() {
    const profiles = [{
      id: 'unarmed',
      name: ANARCHY.actor.vehicle.quickActions.unarmed,
      weaponId: null,
      damage: 1,
      notes: ANARCHY.actor.vehicle.quickActions.unarmedNotes
    }];

    const meleeWeapons = getMountedMachineItems(this, { canonicalType: TEMPLATE.itemType.mechWeapon })
      .filter(it => it.system.skill === 'meleeCombat' || it.system.weaponCategory === 'melee' || it.system.category === 'melee');

    profiles.push(...meleeWeapons.map(weapon => ({
      id: weapon.id,
      name: weapon.name,
      weaponId: weapon.id,
      damage: weapon.getDamage()?.value ?? weapon.system.damage,
      notes: weapon.system.description ?? ''
    })));

    return profiles;
  }

  async _rollQuickSkill(skill, options = {}) {
    const rollApi = getMachineRollApi();
    if (rollApi?.execute) {
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
          tags: ["machine", "skill"],
        }
      });
      return;
    }

    const attribute = skill?.system?.attribute ?? this.getPhysicalAgility();
    const rollData = foundry.utils.mergeObject(RollDialog.prepareActorRoll(this), {
      mode: ANARCHY_SYSTEM.rollType.skill,
      skill: skill,
      attribute1: attribute,
      specialization: undefined
    });

    if (options.quickAction) {
      rollData.quickAction = options.quickAction;
    }

    await RollDialog.create(rollData);
  }

  async _promptWeaponGroup(groups) {
    const selectableGroups = Array.isArray(groups)
      ? groups.filter(group => group?.isAttackLegal !== false)
      : [];
    if (selectableGroups.length === 0) return null;
    if (selectableGroups.length === 1) return selectableGroups[0];

    const defaultGroup = selectableGroups[0];
    const content = `<form class="mwd-quick-select">${selectableGroups.map(group => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${group.id}" ${group.id === defaultGroup.id ? 'checked' : ''}>
        <span>${group.name}</span>
      </label>`).join('')}</form>`;

    const selectedId = await Dialog.prompt({
      title: ANARCHY.actor.vehicle.quickActions.selectWeaponGroup,
      content: content,
      label: ANARCHY.common.roll.button,
      callback: html => html.find('input[name="weapon-group"]:checked').val() ?? defaultGroup.id
    });

    return selectableGroups.find(it => it.id === selectedId) ?? defaultGroup;
  }

  async _promptMeleeProfile(profiles) {
    if (profiles.length === 1) {
      return profiles[0];
    }

    const defaultProfile = profiles[0];
    const content = `<form class="mwd-quick-select">${profiles.map(profile => `
      <label class="quick-select-option">
        <input type="radio" name="melee-profile" value="${profile.id}" ${profile.id === defaultProfile.id ? 'checked' : ''}>
        <span>${profile.name}</span>
      </label>`).join('')}</form>`;

    const selectedId = await Dialog.prompt({
      title: ANARCHY.actor.vehicle.quickActions.selectMeleeProfile,
      content: content,
      label: ANARCHY.common.roll.button,
      callback: html => html.find('input[name="melee-profile"]:checked').val() ?? defaultProfile.id
    });

    return profiles.find(it => it.id === selectedId) ?? defaultProfile;
  }

  async _promptSensorSweepSkill(skills) {
    if (skills.length === 1) {
      return skills[0];
    }

    const content = `<form class="mwd-quick-select">${skills.map(skill => `
      <label class="quick-select-option">
        <input type="radio" name="sensor-skill" value="${skill.system.code}">
        <span>${skill.name}</span>
      </label>`).join('')}</form>`;

    const selectedCode = await Dialog.prompt({
      title: ANARCHY.actor.vehicle.quickActions.selectSensorSkill,
      content: content,
      label: ANARCHY.common.roll.button,
      callback: html => html.find('input[name="sensor-skill"]:checked').val()
    });

    return skills.find(it => it.system.code === selectedCode) ?? skills[0];
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
      label: ANARCHY.common.roll.button,
      callback: html => html.find('input[name="ew-action"]:checked').val() ?? defaultAction.id
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
      title: ANARCHY.actor.vehicle.quickActions.emergencyRepair,
      content,
      label: ANARCHY.common.roll.button,
      callback: html => html.find('input[name="repair-issue"]:checked').val() ?? `${defaultIssue.issueKind}:${defaultIssue.issueId}`
    });

    return issues.find(issue => `${issue.issueKind}:${issue.issueId}` === selectedKey) ?? defaultIssue;
  }

  _serializeWeaponGroup(group, weapons) {
    return {
      id: group.id,
      name: group.name,
      weaponNames: weapons.map(it => it.name)
    }
  }
}
