# Weapon & Melee Mounting System

This document summarizes the mounting rules for Foundry VTT implementations of **MechWarrior: Destiny**. It focuses on hardpoints, mount points, weapon groups, and melee subsystems while omitting tonnage, ammo, or critical slot rules.

## 1. Mount Points (MP)

Mount points determine how many weapon groups a 'Mech can field.

| Weight Class | Mount Points |
| ------------ | ------------ |
| Light        | 4            |
| Medium       | 5            |
| Heavy        | 6            |
| Assault      | 7            |

- Each weapon group consumes 1 MP.
- A primary weapon group consumes **2 MP**.

### Mount Point Budget Rule

- **No primary weapon:** `maxGroups = MP`
- **Primary weapon present:** `maxGroups = MP - 1` (because the primary group uses 2 MP)

The system must enforce this whenever groups are created, deleted, or toggled.

## 2. Hardpoints

Hardpoints describe what types of ranged weapons a 'Mech can physically mount. Each hardpoint is defined as:

```ts
{
  id: string,
  type: "energy" | "ballistic" | "missile" | "support",
  size: "small" | "medium" | "large",
  location: "head" | "torso" | "arm" | "leg",
  occupiedBy: groupId | null
}
```

Ranged weapons require exactly one matching hardpoint (type + size). No ranged weapon requires more than one hardpoint. The system assigns hardpoints to weapons during validation.

## 3. Weapon Groups

Weapon groups are the attack bundles players fire in Destiny. Each group:

```ts
{
  id: string,
  name: string,
  weaponIds: string[],
  isPrimary: boolean
}
```

Rules:

- One weapon group = one attack roll.
- Groups may contain multiple weapons.
- All weapons in a group must occupy valid, free hardpoints.
- Only one group may have `isPrimary = true`.

Groups plus the primary weapon must respect the mount point budget.

## 4. Primary Weapon Rules

A primary weapon is a special weapon group with `isPrimary: true`. It costs **2 MP** and provides special bonuses handled elsewhere.

### Valid Primary Sources

A primary weapon must come from one of two chassis configurations:

#### 4.1 Normal Primary (via large hardpoint)

A ranged weapon sized **large** mounted on a `size: "large"` hardpoint.

#### 4.2 Converted Primary Slot (canon-exception chassis)

Some canon mechs have a signature weapon even without a large hardpoint. For these chassis, define:

```ts
system.primarySlot = {
  mode: "converted",
  allowedWeaponIds: ["id-of-default-primary"], // optional
  typeRestriction: "energy" | "ballistic" | null // optional
}
```

A primary weapon group on a chassis with a converted slot:

- Does **not** need a large hardpoint.
- Must obey any type or allowed weapon restrictions.
- Still consumes **2 MP**.

## 5. Ranged Weapon Validation (Core Logic)

When the user changes loadout or groups, perform:

### 5.1 Mount Point Check

- If primary present: `if (groups.length > totalMP - 1) invalid()`
- If no primary: `if (groups.length > totalMP) invalid()`

### 5.2 Primary Check

- If `primarySlot.mode !== "converted"`, the primary weapon must match a **large** hardpoint type/size.
- If `primarySlot.mode === "converted"`, skip size validation and optionally enforce `allowedWeaponIds` or `typeRestriction`.

### 5.3 Hardpoint Assignment

For each non-melee weapon in all groups:

- Find an unused hardpoint with matching type + size.
- Mark it occupied by that group.
- If no hardpoint is found, invalidate the loadout.

## 6. Melee Weapons (Separate Subsystem)

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

## 7. Validation Triggers

- On weapon/group assignment (`preUpdateActor`).
- When toggling `isPrimary`.
- When adding/removing hardpoints on a chassis.
- When equipping melee weapons.

## 8. UI Expectations

- Display mount point usage: `Used MP (Primary = 2) / Total MP`.
- Display hardpoints and whether they are filled.
- Provide a weapon group editor for ranged weapons.
- Provide a dedicated melee attack section (derived from melee profiles).

## 9. Summary

- Ranged = hardpoints + mount points + weapon groups.
- Primary weapon = special weapon group, costs 2 MP.
- Hardpoints = type/size slots for ranged weapons only.
- Melee = separate subsystem.
- Validation enforces MP budget, primary legality, and hardpoint availability.
- Melee bypasses hardpoints and mount points entirely.
