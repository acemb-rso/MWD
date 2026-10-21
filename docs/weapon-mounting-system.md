# Weapon & Melee Mounting System

This document summarizes the mounting rules for Foundry VTT implementations of **MechWarrior: Destiny**. It focuses on hardpoints, mount points, weapon groups, and melee subsystems while omitting tonnage, ammo, or critical slot rules.

Where this document conflicts with older BattleMech-only notes, the newer
slot-based hardpoint model should be treated as authoritative.

## 1. Mount Points (MP)

Mount points determine how many weapon groups a 'Mech can field.

| Weight Class | Mount Points |
| ------------ | ------------ |
| Light        | 4            |
| Medium       | 5            |
| Heavy        | 6            |
| Assault      | 7            |

- Each weapon group consumes 1 MP.

### Mount Point Budget Rule

- `maxGroups = MP`

The system must enforce this whenever groups are created or deleted.

## 2. Hardpoints

Hardpoints describe machine inventory slots for mountable weapons and other
future slottable items. BattleMechs and vehicles use the same core hardpoint
structure, with actor-type-specific location choices.

Each hardpoint is defined as:

```ts
{
  id: string,
  type: "penetrating" | "concussive" | "energy" | "thermal" | "electrical" | "support" | "omni",
  size: "small" | "medium" | "large",
  location: "arms" | "head" | "torso" | "turret",
  itemId: string
}
```

- BattleMech locations use `arms`, `head`, and `torso`.
- Vehicle locations currently use `turret`.
- Hardpoint editors should use fixed dropdowns for type, size, and location.
- Hardpoints create mount slots in machine inventory and own slot occupancy via
  `itemId`.
- Mounted items do not store hardpoint assignment or hardpoint location on the
  item itself.
- Slotted items are separate from machine `assetModule` items and separate from
  upgrade/equipment rails.
- `energy`, `thermal`, and `electrical` hardpoints are one compatibility
  family for mounting; any of those weapon damage types can fit any of those
  slot types.
- Ranged weapons require exactly one compatible hardpoint (type gate + size
  gate). Weapon size lives on the weapon item; hardpoint type/size/location
  live on the actor hardpoint entry.

## 3. Weapon Groups

Weapon groups are the attack bundles players fire in Destiny. Each group:

```ts
{
  id: string,
  name: string,
  weaponIds: string[]
}
```

Rules:

- One weapon group = one attack roll.
- Groups may contain multiple weapons.
- All weapons in a group must occupy valid, free hardpoints.

Groups must respect the mount point budget.

## 4. Ranged Weapon Validation (Core Logic)

When the user changes loadout or groups, perform:

### 4.1 Mount Point Check

`if (groups.length > totalMP) invalid()`

### 4.2 Hardpoint Assignment

For each non-melee weapon in all groups:

- Resolve the weapon's occupied hardpoint via the actor-side hardpoint `itemId`.
- Validate that the occupied hardpoint's type + size are compatible with the weapon.
- If no compatible occupied hardpoint is found, invalidate the loadout.

## 5. Melee Weapons (Separate Subsystem)

Melee weapons do **not** use hardpoints, mount points, or weapon groups. Instead, each chassis defines:

```ts
system.melee = {
  baseProfile: { name, damage, notes },
  maxWeapons: number,
  allowedLocations: string[]
}
```

Each actor derives:

```ts
system.meleeProfiles = [
  base unarmed profile,
  + up to maxWeapons equipped melee items
]
```

Rules:

- Melee weapons have `weaponCategory = "melee"`.
- Melee weapons are ignored during ranged weapon validation.
- Melee profiles generate independently and appear as selectable melee attacks.
- Optionally restrict mounting by `allowedLocations`.

## 6. Validation Triggers

- On weapon/group assignment (`preUpdateActor`).
- When adding/removing hardpoints on a chassis.
- When equipping melee weapons.

## 7. UI Expectations

- Display mount point usage: `Used MP / Total MP`.
- Display hardpoints and whether they are filled.
- Provide a weapon group editor for ranged weapons.
- Provide a dedicated melee attack section (derived from melee profiles).

## 8. Summary

- Ranged = hardpoints + mount points + weapon groups.
- Hardpoints = type/size slots for ranged weapons only.
- Melee = separate subsystem.
- Validation enforces MP budget and hardpoint availability.
- Melee bypasses hardpoints and mount points entirely.
