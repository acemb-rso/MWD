# 🚀 Mech Quick-Roll Action Buttons — Design Document

## Document Purpose

Define the behavior, UI placement, data integration, and roll mechanics for the **Mech Quick-Roll Buttons** used on the custom MechWarrior: Destiny vehicle/mech sheet in Foundry VTT.

This document is intended to be directly handed to a developer for implementation.

---

## 1. List of Quick-Roll Buttons

The mech sheet will include between **4 and 6** quick-action buttons. The required baseline set is **five**, with one optional.

### Required Buttons

1. **Ranged Attack (Gunnery)**
2. **Melee Attack (Melee)**
3. **Dodge (Piloting)**
4. **Piloting Check (Movement/Stability)**
5. **Sensor Sweep (Perception/Technician)**

### Optional Button (Recommended)

6. **Emergency Repair (Technician)**

All buttons must be modular, styled consistently, and callable from both the UI and automation macros.

---

## 2. UI / UX Requirements

### 2.1 Placement

- Buttons appear in a horizontal strip at the **top of the Mech sheet’s Actions tab**, or in a dedicated **Quick Actions** section.
- Buttons must resize responsively for narrow sheets.

### 2.2 Styling

- Use system button styling (or a Destiny/MW-themed variant).
- Include simple icons if available:
  - 🔫 Ranged Attack
  - ⚔️ Melee Attack
  - 🛡️ Dodge
  - 🌀 Piloting Check
  - 📡 Sensor Sweep
  - 🔧 Emergency Repair

### 2.3 Tooltips

Each button displays a tooltip on hover:

| Button           | Tooltip                                                            |
| ---------------- | ------------------------------------------------------------------ |
| Ranged Attack    | Roll an attack using any Weapon Group or Primary Weapon            |
| Melee Attack     | Roll a melee attack using fists, kicks, or installed melee weapons |
| Dodge            | Piloting roll to evade incoming fire or avoid danger               |
| Piloting Check   | Piloting roll for movement, jumping, stability, or hazard checks   |
| Sensor Sweep     | Perception/Tech roll using sensors or Active Probe                 |
| Emergency Repair | Technician roll to stabilize or fix a system during battle         |

---

## 3. Button Behavior & Roll Logic

Each button triggers a **roll dialog** or a modal selector depending on the action. All rolls use the underlying Destiny skill system already implemented in the vehicle sheet.

### 3.1 Ranged Attack (Gunnery)

**Behavior**

- Opens a modal listing:
  - All **Weapon Groups**
  - The **Primary Weapon Group** (highlighted)
- Selecting a group:
  - Pulls associated weapon data
  - Applies primary weapon bonuses (if any)
  - Applies accuracy modifiers from equipment (Targeting Computer, Artemis, etc.)
  - Triggers a standard **Gunnery skill test**

**Dependencies**

- `actor.system.weaponGroups`
- `actor.system.hardpoints` (for verification if desired)
- Active equipment flags

**Roll Formula**

- Destiny Gunnery dice pool (Skill + Attribute + bonuses)
- DN determined by GM or automation

### 3.2 Melee Attack (Melee)

**Behavior**

- Opens a small modal listing all **meleeProfiles**:
  - "Unarmed (Punch/Kick)"
  - Any installed melee weapons (hatchet, sword, etc.)
- Selecting a profile rolls:
  - **Melee** skill
  - Damage defined by meleeProfile
  - TSM, Improved Actuators, MASC bonuses applied automatically

**Dependencies**

- `actor.system.meleeProfiles` generated during prep

**Roll Formula**

- Melee dice pool
- Target DN from GM/automation
- Effect: melee damage rating

### 3.3 Dodge (Piloting)

**Behavior**

- No modal needed (single roll)
- Rolls **Piloting** for:
  - Evasive maneuvers
  - Missile dodge attempts
  - Reaction defenses
- Should appear in chat labeled as **"Dodge Check"**

**Dependencies**

- `actor.system.skills.piloting`

**Roll Formula**

- Piloting dice pool
- Successes determine evasion or stability

### 3.4 Piloting Check (Movement / Stability)

**Behavior**

- Similar to Dodge, but used for:
  - Jump landings
  - Rough terrain
  - Falling checks
  - Shutdown avoidance
  - Heat/stability events
- No modal required
- Chat label: **"Piloting Check"**

**Dependencies**

- Same as Dodge

**Roll Formula**

- Piloting dice pool

### 3.5 Sensor Sweep (Perception/Technician)

**Behavior**

- Modal appears if the mech has **both** skills trained:
  - Option A: **Perception**
  - Option B: **Technician (Electronics)**
- Otherwise auto-select the available skill.
- Used for:
  - Detect hidden units
  - Break ECM lock
  - Active Probe sweeps
  - TAG checks
  - Long-range battlefield scanning

**Dependencies**

- `actor.system.skills.perception`
- `actor.system.skills.technician`

**Roll Formula**

- Skill dice pool + equipment bonuses (Active Probe, Watchdog, etc.)

### 3.6 Emergency Repair (Technician) — Optional

**Behavior**

- Rolls **Technician (Mech)** or **Technician (General)** depending on your system
- Used to:
  - Clear a jammed actuator
  - Temporarily restore a disabled weapon
  - Restart stuck sensors
  - Mitigate critical damage

**Dependencies**

- `actor.system.skills.technician`

**Roll Formula**

- Technician dice pool
- DN varies by repair severity

---

## 4. Required Data Structures

Ensure the following exist on the actor:

### 4.1 weaponGroups

```ts
actor.system.weaponGroups = [{
  id: string,
  name: string,
  weaponIds: string[],
  isPrimary: boolean
}]
```

### 4.2 meleeProfiles

Generated in `prepareData`/`prepareDerivedData`.

```ts
actor.system.meleeProfiles = [{
  id: string,
  name: string,
  weaponId: string | null,
  damage: number,
  notes: string
}]
```

### 4.3 Skills

Must exist on the sheet:

- `gunnery`
- `melee`
- `piloting`
- `perception`
- `technician`

---

## 5. Roll Output Requirements

All rolls must:

- Produce a chat message
- Include:
  - Skill name
  - Dice pool breakdown
  - Modifiers
  - Equipment bonuses
  - Target DN (if provided)
  - Result summary

Ranged attacks must also include:

- Which weapon group was fired
- Primary Weapon status
- Weapon tags (Heat, Range modifiers, etc.)

Melee attacks must include:

- Which meleeProfile was used

---

## 6. Error Handling

Buttons should produce a clean notification if:

- `weaponGroups` is empty → Ranged Attack button disables itself
- `meleeProfiles` is empty → Melee button shows "No melee attacks available"
- Neither Perception nor Technician present → Sensor Sweep button disabled
- Missing relevant skill → fallback rule: roll only Attribute dice

All errors should use Foundry notifications.

---

## 7. Modular Design

Buttons should be implemented as individual functions, for example:

```ts
this.rollRangedAttack()
this.rollMeleeAttack()
this.rollDodge()
this.rollPilotingCheck()
this.rollSensorSweep()
this.rollEmergencyRepair()
```

The UI just calls these.

---

## 8. Future-Proof Hooks

Design accommodates:

- ECM interactions
- Equipment modifying rolls
- Heat penalties
- Narrative advantages/disadvantages
- Automating DN based on terrain or range
- Additional quick actions without redesign

---

🎯 **End of Document — Ready for Developer Handoff**

If you'd like, I can also produce:

- A **diagram** of the UI layout
- Code stubs for each button
- A Foundry-ready **module.json** style snippet
- A validation test plan for QA
