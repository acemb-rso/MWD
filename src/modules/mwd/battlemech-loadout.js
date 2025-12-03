import { ANARCHY } from "../config.js";
import { TEMPLATE } from "../constants.js";

const MOUNT_POINTS = {
  light: 4,
  medium: 5,
  heavy: 6,
  assault: 7,
};

const DEFAULT_PRIMARY_SLOT = { mode: "normal", allowedWeaponIds: [], typeRestriction: "" };
const DEFAULT_MELEE = {
  baseProfile: { name: "Unarmed", damage: "", notes: "" },
  maxWeapons: 0,
  allowedLocations: [],
};

export class BattlemechLoadout {
  constructor(actor) {
    this.actor = actor;
    this.mwd = actor.system.mwd ?? {};
  }

  compute() {
    const weightClass = this.mwd.weightClass ?? "medium";
    const mountPointTotal = MOUNT_POINTS[weightClass] ?? MOUNT_POINTS.medium;
    const hardpoints = this._normalizeHardpoints();
    const groups = this._normalizeWeaponGroups();
    const primaryGroup = groups.find(it => it.isPrimary);
    const primaryGroups = groups.filter(it => it.isPrimary);
    const primarySlot = this._primarySlot();
    const errors = [];
    const warnings = [];

    if (primaryGroups.length > 1) {
      errors.push(game.i18n.localize(ANARCHY.mwd.loadout.errors.multiplePrimary));
    }

    const maxGroupCount = primaryGroup ? mountPointTotal - 1 : mountPointTotal;
    const usedMountPoints = groups.length + (primaryGroup ? 1 : 0);
    if (groups.length > maxGroupCount) {
      errors.push(game.i18n.format(ANARCHY.mwd.loadout.errors.mountPointsExceeded, {
        used: usedMountPoints,
        total: mountPointTotal,
      }));
    }

    const rangedWeapons = this._getWeapons(it => (it.system.weaponCategory ?? "ranged") !== "melee");
    const rangedById = new Map(rangedWeapons.map(it => [it.id, it]));
    const usedWeapons = new Set();

    const hardpointState = hardpoints.map(hp => ({ ...hp, occupiedBy: null, occupiedByName: undefined }));

    for (const group of groups) {
      for (const weaponId of group.weaponIds ?? []) {
        const weapon = rangedById.get(weaponId);
        if (!weapon) {
          warnings.push(game.i18n.format(ANARCHY.mwd.loadout.warnings.weaponMissing, { weapon: weaponId }));
          continue;
        }
        const weaponType = weapon.system.hardpointType ?? "energy";
        const weaponSize = weapon.system.hardpointSize ?? "small";
        if (usedWeapons.has(weaponId)) {
          errors.push(game.i18n.format(ANARCHY.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: weapon.name }));
          continue;
        }
        usedWeapons.add(weaponId);

        if (group.isPrimary) {
          this._validatePrimaryWeapon(weapon, weaponType, weaponSize, primarySlot, errors);
        }

        if ((weapon.system.weaponCategory ?? "ranged") === "melee") {
          continue;
        }

        const match = hardpointState.find(hp => !hp.occupiedBy
          && hp.type === weaponType
          && hp.size === weaponSize);
        if (!match) {
          errors.push(game.i18n.format(ANARCHY.mwd.loadout.errors.hardpointUnavailable, {
            weapon: weapon.name,
            type: game.i18n.localize(ANARCHY.mwd.hardpointType[weaponType] ?? weaponType),
            size: game.i18n.localize(ANARCHY.mwd.hardpointSize[weaponSize] ?? weaponSize),
          }));
        }
        else {
          match.occupiedBy = group.id;
          match.occupiedByName = group.name;
        }
      }
    }

    if (primaryGroup && (!primaryGroup.weaponIds || primaryGroup.weaponIds.length === 0)) {
      errors.push(game.i18n.localize(ANARCHY.mwd.loadout.errors.primaryWithoutWeapon));
    }

    const meleeState = this._computeMeleeState(errors);

    return {
      mountPoints: {
        total: mountPointTotal,
        used: usedMountPoints,
        remaining: Math.max(0, mountPointTotal - usedMountPoints),
      },
      weightClass,
      hardpoints: hardpointState,
      weaponGroups: groups,
      primaryGroupId: primaryGroup?.id,
      errors,
      warnings,
      meleeProfiles: meleeState.profiles,
      meleeLimit: meleeState.limit,
    };
  }

  _normalizeWeaponGroups() {
    return (this.mwd.weaponGroups ?? []).map((group, index) => ({
      id: group.id ?? `group-${index + 1}`,
      name: group.name || game.i18n.format(ANARCHY.common.newName, { type: game.i18n.localize(ANARCHY.itemType.singular.weapon) }),
      weaponIds: this._asArray(group.weaponIds),
      isPrimary: group.isPrimary ?? false,
    }));
  }

  _normalizeHardpoints() {
    return (this.mwd.hardpoints ?? []).map((hp, index) => ({
      id: hp.id ?? `hardpoint-${index + 1}`,
      type: hp.type ?? "energy",
      size: hp.size ?? "small",
      location: hp.location ?? "arm",
    }));
  }

  _primarySlot() {
    const slot = foundry.utils.mergeObject(foundry.utils.duplicate(DEFAULT_PRIMARY_SLOT), this.mwd.primarySlot ?? {});
    slot.allowedWeaponIds = this._asArray(slot.allowedWeaponIds);
    return slot;
  }

  _computeMeleeState(errors) {
    const meleeConfig = foundry.utils.mergeObject(foundry.utils.duplicate(DEFAULT_MELEE), this.mwd.melee ?? {});
    const meleeWeapons = this._getWeapons(it => (it.system.weaponCategory ?? "ranged") === "melee");
    const profiles = [];
    const limit = Number(meleeConfig.maxWeapons ?? 0);

    if (meleeWeapons.length > limit) {
      errors.push(game.i18n.format(ANARCHY.mwd.loadout.errors.meleeLimitExceeded, {
        equipped: meleeWeapons.length,
        limit,
      }));
    }

    const allowedLocations = this._asArray(meleeConfig.allowedLocations);
    profiles.push({
      name: meleeConfig.baseProfile?.name || game.i18n.localize(ANARCHY.mwd.melee.baseProfile),
      damage: meleeConfig.baseProfile?.damage ?? "",
      notes: meleeConfig.baseProfile?.notes ?? "",
    });

    meleeWeapons.forEach(weapon => {
      if (allowedLocations.length > 0 && weapon.system.mountLocation && !allowedLocations.includes(weapon.system.mountLocation)) {
        errors.push(game.i18n.format(ANARCHY.mwd.loadout.errors.meleeLocationRestricted, {
          weapon: weapon.name,
          location: game.i18n.localize(ANARCHY.mwd.meleeLocation[weapon.system.mountLocation] ?? weapon.system.mountLocation),
        }));
      }
      profiles.push({
        name: weapon.name,
        damage: weapon.getDamageCode(),
        notes: weapon.system.references?.description ?? "",
      });
    });

    return { profiles, limit };
  }

  _validatePrimaryWeapon(weapon, weaponType, weaponSize, primarySlot, errors) {
    if (primarySlot.mode === "converted") {
      if (primarySlot.allowedWeaponIds?.length > 0 && !primarySlot.allowedWeaponIds.includes(weapon.id)) {
        errors.push(game.i18n.format(ANARCHY.mwd.loadout.errors.primaryNotAllowedWeapon, { weapon: weapon.name }));
      }
      if (primarySlot.typeRestriction && weaponType !== primarySlot.typeRestriction) {
        errors.push(game.i18n.format(ANARCHY.mwd.loadout.errors.primaryTypeRestriction, {
          weapon: weapon.name,
          type: game.i18n.localize(ANARCHY.mwd.hardpointType[primarySlot.typeRestriction] ?? primarySlot.typeRestriction),
        }));
      }
    }
    else if (weaponSize !== "large") {
      errors.push(game.i18n.format(ANARCHY.mwd.loadout.errors.primaryNeedsLarge, { weapon: weapon.name }));
    }
  }

  _getWeapons(filter) {
    return this.actor.items
      .filter(it => it.type === TEMPLATE.itemType.mechWeapon)
      .filter(it => it.isActive?.())
      .filter(filter);
  }

  _asArray(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (value === undefined || value === null || value === "") {
      return [];
    }
    return [value];
  }
}
