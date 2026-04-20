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
import { prepareBattlemechWeaponGroups } from "../mwd/battlemech-weapon-groups.js";

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
    this.system.mwd.primaryGroupName = this.system.mwd.weaponGroupDetails.find(group => group.isPrimary)?.name ?? '';

    this.system.skills = this._prepareSkillMap();
    this.system.weaponGroups = this._prepareWeaponGroups();
    this.system.meleeProfiles = this._prepareMeleeProfiles();
    const primaryWeaponGroup = this.system.weaponGroups.find(group => group.isPrimary && group.isAttackLegal) ?? null;
    this.system.quickActions = {
      primaryWeaponGroup,
      hasLegalRangedGroups: this.system.weaponGroups.some(group => group.isAttackLegal),
      hasSensorSweep: Boolean(this.system.skills.perception || this.system.skills.technician),
      jumping: this.system.mwd.mobility?.jumping ?? null,
    };
  }

  async rollRangedAttack() {
    const weaponGroups = (this.system.weaponGroups ?? []).filter(group => group?.isAttackLegal !== false);
    if (weaponGroups.length === 0) {
      ui.notifications.warn(ANARCHY.actor.vehicle.quickActions.errors.noRanged);
      return;
    }

    const selectedGroup = await this._promptWeaponGroup(weaponGroups);
    if (!selectedGroup) {
      return;
    }

    const weapons = selectedGroup.weaponIds
      .map(id => this.items.get(id))
      .filter(it => it);

    await this._rollQuickSkill(this.system.skills.gunnery, {
      quickAction: {
        title: ANARCHY.actor.vehicle.quickActions.rangedAttack,
        weaponGroup: this._serializeWeaponGroup(selectedGroup, weapons)
      }
    });
  }

  async rollMeleeAttack() {
    const meleeProfiles = this.system.meleeProfiles ?? [];
    if (meleeProfiles.length === 0) {
      ui.notifications.warn(ANARCHY.actor.vehicle.quickActions.errors.noMelee);
      return;
    }

    const selectedProfile = await this._promptMeleeProfile(meleeProfiles);
    if (!selectedProfile) {
      return;
    }

    await this._rollQuickSkill(this.system.skills.melee, {
      quickAction: {
        title: ANARCHY.actor.vehicle.quickActions.meleeAttack,
        meleeProfile: selectedProfile
      }
    });
  }

  async rollPilotingCheck() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: ANARCHY.actor.vehicle.quickActions.pilotingCheck }
    });
  }

  async rollSensorSweep() {
    const sensorSkills = [this.system.skills.perception, this.system.skills.technician].filter(it => it);
    if (sensorSkills.length === 0) {
      ui.notifications.warn(ANARCHY.actor.vehicle.quickActions.errors.noSensorSweep);
      return;
    }

    const selectedSkill = await this._promptSensorSweepSkill(sensorSkills);
    if (!selectedSkill) {
      return;
    }

    await this._rollQuickSkill(selectedSkill, {
      quickAction: {
        title: ANARCHY.actor.vehicle.quickActions.sensorSweep,
        skillName: selectedSkill.name
      }
    });
  }

  async rollEmergencyRepair() {
    await this._rollQuickSkill(this.system.skills.technician, {
      quickAction: { title: ANARCHY.actor.vehicle.quickActions.emergencyRepair }
    });
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
        isPrimary: group.isPrimary ?? false,
        missingWeaponIds: group.missingWeaponIds ?? [],
        memberWeapons: group.memberWeapons ?? [],
        compatibilityWarnings: group.compatibilityWarnings ?? [],
        isAttackLegal: group.isAttackLegal !== false,
        isAvailableThisActivation: group.isAvailableThisActivation !== false,
        disableReason: group.disableReason ?? "",
        attackSummary: group.attackSummary ?? null,
      }));
    }

    const weapons = this.items.filter(it => it.type === TEMPLATE.itemType.mechWeapon);
    if (weapons.length === 0) {
      return [];
    }

    const favoriteWeapons = weapons.filter(it => this.hasFavorite(TEMPLATE.itemType.mechWeapon, it.id));
    const groups = [];
    if (favoriteWeapons.length > 0) {
      groups.push({
        id: 'favorite',
        name: ANARCHY.actor.vehicle.quickActions.primaryWeapons,
        weaponIds: favoriteWeapons.map(it => it.id),
        isPrimary: true
      });
    }

    groups.push({
      id: 'all',
      name: ANARCHY.actor.vehicle.quickActions.allWeapons,
      weaponIds: weapons.map(it => it.id),
      isPrimary: groups.length === 0
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

    const meleeWeapons = this.items.filter(it =>
      it.type === TEMPLATE.itemType.mechWeapon
      && it.system.skill === 'meleeCombat');

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

    const defaultGroup = selectableGroups.find(it => it.isPrimary) ?? selectableGroups[0];
    const content = `<form class="mwd-quick-select">${selectableGroups.map(group => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${group.id}" ${group.id === defaultGroup.id ? 'checked' : ''}>
        <span>${group.name}${group.isPrimary ? ` (${ANARCHY.actor.vehicle.quickActions.primaryLabel})` : ''}</span>
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

  _serializeWeaponGroup(group, weapons) {
    return {
      id: group.id,
      name: group.name,
      isPrimary: group.isPrimary,
      weaponNames: weapons.map(it => it.name)
    }
  }
}
