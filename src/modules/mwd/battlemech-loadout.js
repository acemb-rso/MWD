// src/modules/mwd/battlemech-loadout.js
// Purpose: References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { ANARCHY } from "../config.js";
import { TEMPLATE } from "../constants.js";
import {
  doesHardpointAcceptItem,
  getMachineHardpointByItemId,
  getMountedMachineItems,
  normalizeMachineWeaponSize,
} from "./machine-hardpoints.js";
import { formatString } from "../strings.js";

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

function getHardpointTypeLabels() {
  return ANARCHY?.mwd?.hardpointType ?? ANARCHY?.mwd?.hardpoint?.type ?? {};
}

function getHardpointSizeLabels() {
  return ANARCHY?.mwd?.hardpointSize ?? ANARCHY?.mwd?.hardpoint?.size ?? {};
}

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
      errors.push(ANARCHY.mwd.loadout.errors.multiplePrimary);
    }

    const maxGroupCount = primaryGroup ? mountPointTotal - 1 : mountPointTotal;
    const usedMountPoints = groups.length + (primaryGroup ? 1 : 0);
    if (groups.length > maxGroupCount) {
      errors.push(formatString(ANARCHY.mwd.loadout.errors.mountPointsExceeded, {
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
          warnings.push(formatString(ANARCHY.mwd.loadout.warnings.weaponMissing, { weapon: weaponId }));
          continue;
        }
        const weaponType = weapon.system.damageType ?? "energy";
        const weaponSize = normalizeMachineWeaponSize(weapon.system.size ?? "small");
        if (usedWeapons.has(weaponId)) {
          errors.push(formatString(ANARCHY.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: weapon.name }));
          continue;
        }
        usedWeapons.add(weaponId);

        if (group.isPrimary) {
          this._validatePrimaryWeapon(weapon, weaponType, weaponSize, primarySlot, errors);
        }

        if ((weapon.system.weaponCategory ?? "ranged") === "melee") {
          continue;
        }

        const assignedHardpoint = getMachineHardpointByItemId(this.actor, weapon.id);
        const match = hardpointState.find(hp => hp.id === assignedHardpoint?.id);
        if (!match) {
          errors.push(formatString(ANARCHY.mwd.loadout.errors.hardpointUnavailable, {
            weapon: weapon.name,
            type: getHardpointTypeLabels()[weaponType] ?? weaponType,
            size: getHardpointSizeLabels()[weaponSize] ?? weaponSize,
          }));
        }
        else if (!doesHardpointAcceptItem(match, weapon)) {
          errors.push(formatString(ANARCHY.mwd.loadout.errors.hardpointUnavailable, {
            weapon: weapon.name,
            type: getHardpointTypeLabels()[weaponType] ?? weaponType,
            size: getHardpointSizeLabels()[weaponSize] ?? weaponSize,
          }));
        }
        else {
          match.occupiedBy = group.id;
          match.occupiedByName = group.name;
        }
      }
    }

    if (primaryGroup && (!primaryGroup.weaponIds || primaryGroup.weaponIds.length === 0)) {
      errors.push(ANARCHY.mwd.loadout.errors.primaryWithoutWeapon);
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
    return this._toCollection(this.mwd.weaponGroups).map((group, index) => ({
      id: group.id ?? `group-${index + 1}`,
      name: group.name || formatString(ANARCHY.common.newName, { type: ANARCHY.itemType.singular.weapon }),
      weaponIds: this._asArray(group.weaponIds),
      isPrimary: group.isPrimary ?? false,
    }));
  }

  _normalizeHardpoints() {
    return this._toCollection(this.mwd.hardpoints).map((hp, index) => ({
      id: hp.id ?? `hardpoint-${index + 1}`,
      type: hp.type ?? "energy",
      size: normalizeMachineWeaponSize(hp.size ?? "small"),
      location: hp.location ?? "arms",
      itemId: String(hp.itemId ?? "").trim(),
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
      errors.push(formatString(ANARCHY.mwd.loadout.errors.meleeLimitExceeded, {
        equipped: meleeWeapons.length,
        limit,
      }));
    }

    const allowedLocations = this._asArray(meleeConfig.allowedLocations);
    profiles.push({
      name: meleeConfig.baseProfile?.name || ANARCHY.mwd.melee.baseProfile,
      damage: meleeConfig.baseProfile?.damage ?? "",
      notes: meleeConfig.baseProfile?.notes ?? "",
    });

    meleeWeapons.forEach(weapon => {
      const mountedLocation = getMachineHardpointByItemId(this.actor, weapon.id)?.location ?? "";
      if (allowedLocations.length > 0 && mountedLocation && !allowedLocations.includes(mountedLocation)) {
        errors.push(formatString(ANARCHY.mwd.loadout.errors.meleeLocationRestricted, {
          weapon: weapon.name,
          location: ANARCHY.mwd.meleeLocation[mountedLocation] ?? mountedLocation,
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
        errors.push(formatString(ANARCHY.mwd.loadout.errors.primaryNotAllowedWeapon, { weapon: weapon.name }));
      }
      if (primarySlot.typeRestriction && weaponType !== primarySlot.typeRestriction) {
        errors.push(formatString(ANARCHY.mwd.loadout.errors.primaryTypeRestriction, {
          weapon: weapon.name,
          type: getHardpointTypeLabels()[primarySlot.typeRestriction] ?? primarySlot.typeRestriction,
        }));
      }
    }
    else if (weaponSize !== "large") {
      errors.push(formatString(ANARCHY.mwd.loadout.errors.primaryNeedsLarge, { weapon: weapon.name }));
    }
  }

  _getWeapons(filter) {
    return getMountedMachineItems(this.actor, { canonicalType: TEMPLATE.itemType.mechWeapon })
      .filter(it => it.isActive?.())
      .filter(filter);
  }

  _asArray(value) {
    return this._toCollection(value);
  }

  _toCollection(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (value === undefined || value === null || value === "") {
      return [];
    }
    if (typeof value === "object") {
      return Object.values(value);
    }
    return [value];
  }
}
