// src/modules/mwd/battlemech-loadout.js
// Purpose: Validates BattleMech hardpoint, weapon-group, and melee loadout.
// Workflow: actor hardpoint/group state -> this validator builds diagnostics and
// occupied-slot summaries -> sheets and attack prep display or block choices.


import { ANARCHY } from "../core/config.js";
import { TEMPLATE } from "../core/constants.js";
import {
  doesHardpointAcceptItem,
  getMachineHardpointByItemId,
  getMountedMachineItems,
  normalizeMachineWeaponSize,
} from "./machine-hardpoints.js";
import {
  normalizeMachineHardpointType,
  normalizeMachineWeaponDamageType,
} from "./machine-weapon-types.js";
import { formatString } from "../utils/strings.js";

// Current chassis budget model: each configured ranged weapon group consumes
// one mount point from the weight-class allowance.
const MOUNT_POINTS = {
  light: 4,
  medium: 5,
  heavy: 6,
  assault: 7,
};

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
    // Produce render-ready state and diagnostics only. Actor mutations stay in
    // sheet handlers so validation remains safe for previews and tests.
    const weightClass = this.mwd.weightClass ?? "medium";
    const mountPointTotal = MOUNT_POINTS[weightClass] ?? MOUNT_POINTS.medium;
    const hardpoints = this._normalizeHardpoints();
    const groups = this._normalizeWeaponGroups();
    const errors = [];
    const warnings = [];

    const usedMountPoints = groups.length;
    if (usedMountPoints > mountPointTotal) {
      errors.push(formatString(ANARCHY.mwd.loadout.errors.mountPointsExceeded, {
        used: usedMountPoints,
        total: mountPointTotal,
      }));
    }

    const rangedWeapons = this._getWeapons(it => (it.system.weaponCategory ?? "ranged") !== "melee");
    const rangedById = new Map(rangedWeapons.map(it => [it.id, it]));
    const usedWeapons = new Set();

    // A group claims the hardpoint of each member weapon, which lets us detect
    // missing mounts, stale assignments, and duplicate ranged-group membership.
    const hardpointState = hardpoints.map(hp => ({ ...hp, occupiedBy: null, occupiedByName: undefined }));

    for (const group of groups) {
      for (const weaponId of group.weaponIds ?? []) {
        const weapon = rangedById.get(weaponId);
        if (!weapon) {
          warnings.push(formatString(ANARCHY.mwd.loadout.warnings.weaponMissing, { weapon: weaponId }));
          continue;
        }
        const weaponType = normalizeMachineWeaponDamageType(weapon.system.damageType ?? "energy", "energy");
        const weaponSize = normalizeMachineWeaponSize(weapon.system.size ?? "small");
        if (usedWeapons.has(weaponId)) {
          errors.push(formatString(ANARCHY.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: weapon.name }));
          continue;
        }
        usedWeapons.add(weaponId);

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
    }));
  }

  _normalizeHardpoints() {
    return this._toCollection(this.mwd.hardpoints).map((hp, index) => ({
      id: hp.id ?? `hardpoint-${index + 1}`,
      type: normalizeMachineHardpointType(hp.type ?? "energy", "energy"),
      size: normalizeMachineWeaponSize(hp.size ?? "small"),
      location: hp.location ?? "arms",
      itemId: String(hp.itemId ?? "").trim(),
    }));
  }

  _computeMeleeState(errors) {
    // Melee has separate location/quantity limits and should not count against
    // ranged group mount-point validation.
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

  _getWeapons(filter) {
    return getMountedMachineItems(this.actor, { canonicalType: TEMPLATE.itemType.mechWeapon })
      .filter(it => it.isActive?.() !== false)
      .filter(filter);
  }

  _asArray(value) {
    return this._toCollection(value);
  }

  _toCollection(value) {
    // Foundry form updates can round-trip arrays as index-keyed objects; the
    // loadout model accepts either shape so saved actors and previews match.
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
