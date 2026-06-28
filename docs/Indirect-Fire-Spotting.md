# Indirect-Fire Spotting (`spotIndirect`)

## Purpose

A forward observer with line of sight to a target rolls **System + Perception** to
designate it. Allied units that **cannot** see that target may then fire on it
indirectly. This closes the gap in the indirect-fire system: the firing half already
exists (the "Indirect Attack" dialog toggle and range-band penalties), but without a
spotter the line-of-sight guard was an honor-system toggle.

## Design lane (read this first)

The EW model has three distinct layers and spotting must not blur them:

| Layer | Meaning | Spotting? |
| --- | --- | --- |
| Detection state (blind→contact→track→lock) | **permission** | unaffected |
| TargetingData | the **dice bonus** | not granted |
| Lock | enables advanced systems + raises the TargetingData cap | not granted |

Spotting is its own lane: a **short-lived, token-scoped indirect-fire permission marker**.
It is **LoS-bypass only** — it lets an ally fire indirectly at an unseen target, and
nothing more. The existing Indirect Attack penalty (−1 close / −2 near / −3 far /
−4 extreme) still applies.

This deliberately keeps spotting weaker than TAG/NARC, which remain the equipment-gated
way to grant a target full effective **Lock** (`getEffectiveDetectionState` → `"lock"`).
A plain skill roll must not be as strong as dedicated designation gear, so `spotted` is
**never** read by `getEffectiveDetectionState`.

## The action

- **`spotIndirect`** — "Spot for Indirect Fire". Complex action, **2 SA**, resolver
  `targeting`, attribute **System**, skill **Perception**, prompts for a target.
- **Roll:** System + Perception vs **DN 2**, plus the same sensing penalties Acquire uses
  (ECM-shroud via `getAcquireDnModifier`, stealth/obscured via `getStealthDnParts`).
  Spotting is independent of detection state — a spotter only needs to see the target.
- **Line of sight:** V1 uses Foundry token **visibility / targetability** as the LoS
  proxy. This is **not** geometric wall/path LoS — the system does not compute that.
- **On success (hits ≥ DN):** records a spot on the target token and applies the
  `spotted` visual status. **On failure:** nothing is recorded.

## The effect — attack-side gate

For a machine attack with the "LOS fully blocked" option set, the gate is three rules
(`resolve-attack.js`):

1. `losBlocked && !indirectAttack` → blocked: *"Line of sight is fully blocked. Use
   Indirect Attack or sensor-enabled fire."*
2. `losBlocked && indirectAttack && !hasValidIndirectDesignation(...)` → blocked:
   *"No spotter has designated this target — you cannot fire indirectly at a unit you
   cannot see."*
3. otherwise → allowed; the −1..−4 Indirect Attack penalty applies. No detection-state,
   TargetingData, cap, or lock-gated-system change occurs.

`hasValidIndirectDesignation(targetToken, { attackerToken, combat })` is satisfied by a
target that is `tagged`/`narced` (globally readable, their existing role) **or** carries a
valid allied `spotted` marker.

Direct fire and arcing fire at a target you *can* see (`losBlocked` false) are unchanged
and need no spotter.

## Allegiance

A `spotted` marker only helps attackers **allied with the spotter** (same token
disposition), unless created with `allegiance: "any"`. The check reuses the
disposition-comparison pattern from `area-status-sources.js`
(`sameDisposition = sourceDoc.disposition === targetDoc.disposition`) and the
`["ally","enemy","any"]` vocabulary. Ordinary spotting therefore does **not** hand the
enemy free fire correction. TAG/NARC remain globally readable.

## Duration / expiry

A spot is valid until the **spotter begins its next turn**.

- **Authoritative clear:** an `updateCombat` hook calls
  `clearExpiredSpotsForCombatant(combat, combat.combatant?.id)` on turn advance, removing
  spots whose `spotterCombatantId` matches the newly-active combatant (only when created
  in an earlier round, so the creating activation does not self-expire).
- **Read-time fallback** (`getValidSpots`): a spot is invalid unless combat exists, the
  spotter combatant still exists, the scene matches, and combat has not advanced past the
  spotter's next activation (`round > spot.round + 1`).
- **Other cleanup:** `deleteCombat` clears all spots it owned; `deleteToken` clears spots
  a removed token authored on others; `reconcileSpottedStatus` drops the visual status
  whenever no valid spots remain (prevents a sticky-status bug).

These hooks are GM-gated (one connected GM writes) and registered by
`registerSpotHooks()` (`src/modules/mwd/register-spot-hooks.js`).

## Data shape (authoritative)

The visual layer is the `spotted` ActiveEffect on the actor. The **authoritative** data
lives on the **target token document** flags (per-token, naturally scene-scoped; avoids
linked-actor ambiguity), keyed by spotter so multiple spotters coexist:

```js
targetToken.document.flags.mwd.spotting = {
  spots: {
    [spotterTokenUuid]: {
      spotKey, sceneUuid,
      targetTokenUuid, targetActorUuid,
      spotterTokenUuid, spotterActorUuid, spotterCombatantId,
      spotterDisposition,        // cached for allegiance checks
      allegiance,                // "ally" | "enemy" | "any"
      source,                    // "spotIndirect"
      round, turn, createdAt,
    },
  },
}
```

A new spotter adds a keyed entry; the same spotter re-spotting refreshes its entry.

## Code map

| Concern | Location |
| --- | --- |
| `spotted` status (modifier + catalog) | `roll/config/status-modifiers.js`, `status/status-condition-catalog.js` |
| Spot state + validity helpers | `mwd/machine-ew-state.js` (`setSpot`, `clearSpot`, `getValidSpots`, `hasValidIndirectDesignation`, `reconcileSpottedStatus`, `clearExpiredSpotsForCombatant`, `clearAllSpotsForCombat`, `clearSpotsForToken`) |
| Lifecycle hooks | `mwd/register-spot-hooks.js` (wired in `system/anarchy-system.js`) |
| Attack gate | `roll/intent/resolve-attack.js`; required-status parse in `roll/attack-resolution.js` |
| Roll resolver | `roll/intent/resolve-spot-indirect.js` (registered in `roll/intent/resolve-intent.js`) |
| Post-roll execution | `roll/ew-execution.js` `resolveSpotIndirectExecution` (dispatched in `roll/mwd-roll.js`) |
| Action catalog + executor | `mwd/machine-action-catalog.js`, `mwd/machine-quick-actions.js` |
| Chat card | `roll/renderers/render-spot-indirect.js` (registered in `roll/renderers/render-chat.js`) |

## Tests

- `tests/machine-action-catalog.test.mjs` — `spotIndirect` is `ready`.
- `tests/machine-ew-intent.test.mjs` — spot applied on success; multi-spotter add/replace;
  allegiance gating; expiry on the spotter's next activation; and the **no-Lock-leakage**
  regression (a `spotted` target does not change `getEffectiveDetectionState`, grant
  lock-gated systems, create TargetingData, or alter the TargetingData cap).
