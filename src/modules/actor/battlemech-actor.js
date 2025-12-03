import { ANARCHY } from "../config.js";
import { ANARCHY_SYSTEM, ICONS_PATH, TEMPLATE } from "../constants.js";
import { SkillItem } from "../item/skill-item.js";
import { RollDialog } from "../roll/roll-dialog.js";
import { VehicleActor } from "./vehicle-actor.js";
import { BattlemechLoadout } from "../mwd/battlemech-loadout.js";

export class BattlemechActor extends VehicleActor {

  static get defaultIcon() {
    return `${ICONS_PATH}/vehicles/apc.svg`;
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    this.system.mwd = this.system.mwd ?? {};
    this.system.mwd.chassis = this.system.mwd.chassis ?? '';
    this.system.mwd.tonnage = this.system.mwd.tonnage ?? 0;
    this.system.mwd.loadout = new BattlemechLoadout(this).compute();
    this.system.mwd.weaponGroupDetails = this._prepareConfiguredWeaponGroups();
    this.system.mwd.heat = this._prepareHeatTrack();
    this.system.mwd.primaryGroupName = this.system.mwd.weaponGroupDetails.find(group => group.isPrimary)?.name ?? '';

    this.system.skills = this._prepareSkillMap();
    this.system.weaponGroups = this._prepareWeaponGroups();
    this.system.meleeProfiles = this._prepareMeleeProfiles();
    this.system.quickActions = {
      primaryWeaponGroup: this.system.weaponGroups.find(group => group.isPrimary),
      hasSensorSweep: Boolean(this.system.skills.perception || this.system.skills.technician)
    }
  }

  async rollRangedAttack() {
    const weaponGroups = this.system.weaponGroups ?? [];
    if (weaponGroups.length === 0) {
      ui.notifications.warn(game.i18n.localize(ANARCHY.actor.vehicle.quickActions.errors.noRanged));
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
        title: game.i18n.localize(ANARCHY.actor.vehicle.quickActions.rangedAttack),
        weaponGroup: this._serializeWeaponGroup(selectedGroup, weapons)
      }
    });
  }

  async rollMeleeAttack() {
    const meleeProfiles = this.system.meleeProfiles ?? [];
    if (meleeProfiles.length === 0) {
      ui.notifications.warn(game.i18n.localize(ANARCHY.actor.vehicle.quickActions.errors.noMelee));
      return;
    }

    const selectedProfile = await this._promptMeleeProfile(meleeProfiles);
    if (!selectedProfile) {
      return;
    }

    await this._rollQuickSkill(this.system.skills.melee, {
      quickAction: {
        title: game.i18n.localize(ANARCHY.actor.vehicle.quickActions.meleeAttack),
        meleeProfile: selectedProfile
      }
    });
  }

  async rollDodge() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: game.i18n.localize(ANARCHY.actor.vehicle.quickActions.dodgeCheck) }
    });
  }

  async rollPilotingCheck() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: game.i18n.localize(ANARCHY.actor.vehicle.quickActions.pilotingCheck) }
    });
  }

  async rollSensorSweep() {
    const sensorSkills = [this.system.skills.perception, this.system.skills.technician].filter(it => it);
    if (sensorSkills.length === 0) {
      ui.notifications.warn(game.i18n.localize(ANARCHY.actor.vehicle.quickActions.errors.noSensorSweep));
      return;
    }

    const selectedSkill = await this._promptSensorSweepSkill(sensorSkills);
    if (!selectedSkill) {
      return;
    }

    await this._rollQuickSkill(selectedSkill, {
      quickAction: {
        title: game.i18n.localize(ANARCHY.actor.vehicle.quickActions.sensorSweep),
        skillName: selectedSkill.name
      }
    });
  }

  async rollEmergencyRepair() {
    await this._rollQuickSkill(this.system.skills.technician, {
      quickAction: { title: game.i18n.localize(ANARCHY.actor.vehicle.quickActions.emergencyRepair) }
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
    const heatMonitor = systemData.monitors?.heat ?? { value: 0, max: 0 };
    const mwdHeat = systemData.mwd?.heat ?? {};

    const defaults = {
      current: heatMonitor.value ?? 0,
      max: heatMonitor.max ?? 0,
      thresholds: {
        runningHot: 2,
        overheated: 3,
        shutdown: 4,
      }
    };

    const heat = foundry.utils.mergeObject(defaults, mwdHeat, { inplace: false });
    heat.thresholds = foundry.utils.mergeObject(defaults.thresholds, mwdHeat.thresholds ?? {}, { inplace: false });
    heat.current = heatMonitor.value ?? heat.current;
    heat.max = heatMonitor.max ?? heat.max;

    const status = this._resolveHeatStatus(heat.current, heat.thresholds, heat.max);
    this.system.mwd.heatStatus = {
      code: status,
      label: game.i18n.localize(ANARCHY.actor.battlemech.heat.status[status] ?? status)
    };

    return heat;
  }

  _resolveHeatStatus(value, thresholds, max) {
    if (value >= (thresholds?.shutdown ?? max)) {
      return 'shutdown';
    }
    if (value >= (thresholds?.overheated ?? max)) {
      return 'overheated';
    }
    if (value >= (thresholds?.runningHot ?? 0)) {
      return 'runningHot';
    }
    return 'safe';
  }

  _prepareConfiguredWeaponGroups() {
    const groups = this.system.mwd?.weaponGroups ?? [];
    const weapons = new Map(this.items.map(it => [it.id, it]));

    return groups.map((group, index) => {
      const weaponIds = Array.isArray(group.weaponIds) ? group.weaponIds : (group.weaponIds ? [group.weaponIds] : []);
      const attachedWeapons = weaponIds
        .map(id => weapons.get(id))
        .filter(weapon => weapon?.type === TEMPLATE.itemType.mechWeapon);

      const missingWeaponIds = weaponIds.filter(id => !weapons.has(id));

      return {
        id: group.id ?? `group-${index + 1}`,
        index,
        name: group.name || game.i18n.format(ANARCHY.common.newName, { type: game.i18n.localize(ANARCHY.itemType.singular.weapon) }),
        weaponIds,
        isPrimary: group.isPrimary ?? false,
        weapons: attachedWeapons,
        missingWeaponIds,
      };
    });
  }

  _resolveSkill(code) {
    const skill = this.items.find(it => it.type === TEMPLATE.itemType.skill && it.system.code === code);
    if (skill) {
      return skill;
    }

    const prepared = SkillItem.prepareSkill(code);
    if (prepared) {
      const labelKey = ANARCHY.skill?.[code];
      return {
        name: prepared.name ?? (labelKey ? game.i18n.localize(labelKey) : code),
        system: foundry.utils.mergeObject({
          code: code,
          attribute: prepared.system?.attribute,
          value: 0
        }, prepared.system ?? {})
      }
    }
    return undefined;
  }

  _prepareWeaponGroups() {
    const configuredGroups = (this.system.mwd?.weaponGroupDetails ?? [])
      .map(group => ({
        ...group,
        weapons: (group.weapons ?? []).filter(weapon => weapon?.isActive?.()),
      }))
      .filter(group => group.weapons.length > 0);

    if (configuredGroups.length > 0) {
      return configuredGroups.map(group => ({
        id: group.id,
        name: group.name,
        weaponIds: group.weapons.map(it => it.id),
        isPrimary: group.isPrimary ?? false,
      }));
    }

    const weapons = this.items.filter(it => it.type === TEMPLATE.itemType.mechWeapon && it.isActive());
    if (weapons.length === 0) {
      return [];
    }

    const favoriteWeapons = weapons.filter(it => this.hasFavorite(TEMPLATE.itemType.mechWeapon, it.id));
    const groups = [];
    if (favoriteWeapons.length > 0) {
      groups.push({
        id: 'favorite',
        name: game.i18n.localize(ANARCHY.actor.vehicle.quickActions.primaryWeapons),
        weaponIds: favoriteWeapons.map(it => it.id),
        isPrimary: true
      });
    }

    groups.push({
      id: 'all',
      name: game.i18n.localize(ANARCHY.actor.vehicle.quickActions.allWeapons),
      weaponIds: weapons.map(it => it.id),
      isPrimary: groups.length === 0
    });

    return groups;
  }

  _prepareMeleeProfiles() {
    const profiles = [{
      id: 'unarmed',
      name: game.i18n.localize(ANARCHY.actor.vehicle.quickActions.unarmed),
      weaponId: null,
      damage: 1,
      notes: game.i18n.localize(ANARCHY.actor.vehicle.quickActions.unarmedNotes)
    }];

    const meleeWeapons = this.items.filter(it =>
      it.type === TEMPLATE.itemType.mechWeapon
      && it.isActive()
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
      specialization: skill?.system?.specialization
    });

    if (options.quickAction) {
      rollData.quickAction = options.quickAction;
    }

    await RollDialog.create(rollData);
  }

  async _promptWeaponGroup(groups) {
    if (groups.length === 1) {
      return groups[0];
    }

    const defaultGroup = groups.find(it => it.isPrimary) ?? groups[0];
    const content = `<form class="mwd-quick-select">${groups.map(group => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${group.id}" ${group.id === defaultGroup.id ? 'checked' : ''}>
        <span>${group.name}${group.isPrimary ? ` (${game.i18n.localize(ANARCHY.actor.vehicle.quickActions.primaryLabel)})` : ''}</span>
      </label>`).join('')}</form>`;

    const selectedId = await Dialog.prompt({
      title: game.i18n.localize(ANARCHY.actor.vehicle.quickActions.selectWeaponGroup),
      content: content,
      label: game.i18n.localize(ANARCHY.common.roll.button),
      callback: html => html.find('input[name="weapon-group"]:checked').val() ?? defaultGroup.id
    });

    return groups.find(it => it.id === selectedId) ?? defaultGroup;
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
      title: game.i18n.localize(ANARCHY.actor.vehicle.quickActions.selectMeleeProfile),
      content: content,
      label: game.i18n.localize(ANARCHY.common.roll.button),
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
      title: game.i18n.localize(ANARCHY.actor.vehicle.quickActions.selectSensorSkill),
      content: content,
      label: game.i18n.localize(ANARCHY.common.roll.button),
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
