BLUF:

> **Sensors get you a firing solution (track/lock). Gunnery turns that solution into a short-lived dice bonus (targetingData). Lock doesn’t add dice by itself—it lets you generate more and use better tech.**

---

# 🎯 The Clean Model (Final Form)

## 1) Detection State = Permission
Detection State is the ladder that describes how good your firing solution is.
```
blind   → no sensor data,  direct fire attacks at Close or Near range only
contact → attack, no sensor help
track   → normal attack + can generate bonus
lock    → optimized attack + full system use
```
---

## 2) TargetingData = Temporary Dice Bonus

```
targetingData = +X dice
```

* comes from **System + Gunnery**
* applies to **one attack (or very short duration)**
* represents a refined firing solution

---

# ⚙️ How It Works Step-by-Step

## Step 1 — Acquire Target (Sensors)
**Acquire Target** is how you improve your Detection State.

**Roll:** ```System + Perception```

| Goal                 | DN |
| -------------------- | -- |
| Gain **Contact**     | 1  |
| Improve to **Track** | 2  |
| Improve to **Lock**  | 3  |

Result:

```text
Blind → Contact → Track → Lock
```

Acquire rolls also collect normal dice/DN parts from providers. Machine stealth
adds DN parts after counters are applied; high target emission adds
`acquire.highEmission` as a positive dice part when both observer and target are
machines and the target has effective emission. Stealth systems may also cap the
maximum achievable detection state, such as battle armor stealth capping acquire
at Track.

### EW panel enumeration and masking (UI contract)

The sheet EW panel derives its rows from the **active encounter**, not from
canvas targets, so a player always has an acquisition affordance even when a
contact has no line of sight and is not rendered. A row exists for every
combatant whose token is a sensor-eligible target:

* machine actor with HOSTILE disposition (one canonical predicate in
  `machine-sensor-eligibility.js`, shared with canvas sensor detection),
* on the current scene, not the observer itself, not GM-hidden.

GM-hidden combatants produce **no row at all** — hidden remains the GM's
ambush lever.

What a row shows is decided by the stored detection state:

| State   | Identity              | Range                   | EW detail                  |
| ------- | --------------------- | ----------------------- | -------------------------- |
| Blind   | `Unknown Contact A/B` | hidden                  | hidden                     |
| Contact | token name            | range band only         | basic state                |
| Track   | token name            | band + exact distance   | penalties, packet caps     |
| Lock    | token name            | band + exact distance   | full packet/system details |

Anonymous labels are keyed to a token-id sort, never initiative order. The
acquire roll card also masks a blind contact's name until Contact is gained.

Observer degradation gates the row actions through the same machine-state
services the resolvers use: `noSensorActions` disables all sensor/EW buttons;
Sensor Blind disables Acquire beyond Close, blocks targeting-data generation,
and annotates previously earned Track/Lock rows ("live sensor feed
unavailable") instead of erasing the stored state. The resolvers enforce the
same rules independently — the panel is only a projection.

The player loop this enables:

```text
Encounter row exists (masked)
    → Acquire vs Unknown Contact (DN 1)
    → success creates Contact
    → sensor detection reveals the token on canvas
    → normal canvas targeting becomes available
```

Sensor Sweep is unchanged: it does not auto-seed contacts.

---

## Step 2 — Generate TargetingData (Fire Control)

Only if **Track or Lock**

**Roll:**```text
System + Gunnery vs DN 2
```

**Result:** each hit becomes TargetingData, up to your cap.

```text
hits → targetingData (capped)
```
<u>Cap</u>  
* *Track*: cap = System  
* *Lock*: cap = System + 1

<u>Duration</u>   
*TargetingData* normally lasts for one attack.

---

## Step 3 — Apply to Attack

```text
Attack Dice Pool:
= base dice − Tracking Penalty + TargetingData + other normal dice mods
```

### Tracking Penalty

Tracking Penalty is the total negative dice friction on the shot.

<u>Typical sources:</u>
* movement saturation
* ECM
* stealth / signature reduction
* degraded sensors
* weather / obscurants

Roll vs DN

### Attack Sequence at the Table
When making a shot:

1. Check **Detection State**
2. Apply **Tracking Penalty**
3. Apply usable **TargetingData**
4. Roll the attack
5. Apply **CQ** afterward

---

# 🔒 What Lock Actually Does

Lock is NOT a bonus.

It changes **what you are allowed to do**.

## Lock enables:

### 1. Higher TargetingData ceiling

```text
Track: cap = System
Lock:  cap = System (+1 optional)
```

---

### 3. Access to advanced systems

Only at **Lock**:

* fire-control CQ bonuses
* Artemis / semi-guided weapons
* full indirect fire
* advanced targeting features

> Note: *self* full indirect fire (firing without line of sight using your own
> Lock) is the advanced-system path above. The separate **spotter** path — an ally
> designating a target so other units without line of sight may fire on it — is
> the `spotIndirect` action and is **LoS-bypass only** (no Lock, no TargetingData).
> See [Indirect-Fire-Spotting.md](Indirect-Fire-Spotting.md).


---

# 🔄 How TargetingData Behaves

## Core rules

```text
- generated by Gunnery roll
- capped by System + state
- applied once (or short duration)
- consumed on use
```

---

## At different states

### Contact

```text
targetingData = 0 (not allowed)
```

---

### Track

```text
normal targetingData allowed
```

---

### Lock

```text
enhanced targetingData allowed
+ unlocks advanced systems
```

---

# 🧠 Simple Table Explanation

> “First you get a read on them.
> Then you line up the shot.
> The better your read, the more your systems can help.”

---

# 🎲 Example

### Turn 1 — Scan

```text
System + Perception → Track
```

---

### Turn 2 — Line Up Shot

```text
System + Gunnery → 3 hits
→ targetingData +3
```

---

### Attack

```text
−2 tracking
+3 targeting
= +1 net
```

Roll → resolve → apply CQ

---

# 🔁 With Lock

### Turn 1 — Lock achieved

---

### Turn 2 — Gunnery

```text
4 hits → capped at System+1 = +4
```

Also:

* can use fire-control CQ
* can use guided systems

---
## ECM and EPM
### ECM

ECM makes enemy targeting worse.

ECM can:
* add Tracking Penalty
* suppress TargetingData
* make Lock harder to achieve
* cap Detection State at Track

### EPM

EPM protects your targeting from ECM.

EPM can:
* reduce or ignore ECM penalties
* allow Lock attempts under ECM
* help resist disruption

**The table loop**
```
- ECM interferes
- EPM protects
- Acquire advances
- Break Lock regresses
- Defensive Jink spoils targetingData
```
That is the intended *tug-of-war*.

---
## Break Lock

**Break Lock** is the primary defensive EW action against Detection State.

**Cost:** 1 SA

**Roll:** ```Handling + Stealth```

**Result:** on success, reduce the attacker's Detection State by one step:
```
Lock -> Track
Track -> Contact
Contact -> Blind
```

The DN comes from the step being broken, mirroring Acquire Target in reverse.

| Current state | Success result | DN |
| --- | --- | --- |
| Contact | Contact -> Blind | 1 |
| Track | Track -> Contact | 2 |
| Lock | Lock -> Track | 3 |

Situation modifies the dice pool, not the DN.

| Situation | Dice |
| --- | --- |
| Open ground / fully exposed | -1 |
| Typical battlefield | 0 |
| Woods, urban terrain, ridge line, ECM support | +1 |

TAG, NARC, High Emission, and an active probe on the observer add DN pressure to the Break Lock attempt.

---
## Defensive Jink

**Defensive Jink** is the reaction against targetingData.

**Trigger:** an enemy successfully generates a Fire Solution against you

**Cost:** 1 RA

**Roll:** ```Handling + Piloting```

**Result:** on success, reduce that targetingData packet by 1.

Examples:

```text
+3 targetingData -> +2 targetingData
+1 targetingData -> 0 targetingData
```

Failure has no effect.

---
## EPM Filter

If you are jammed or disrupted, you can try to clear it.

**Roll:** ```System + System Operations```

Use it to:

* clear ECM-style disruption
* remove temporary EMP scramble
* stabilize your sensors/fire control

---
## C3, TAG, and NARC
### C3

C3 shares best state and targeting data among network nodes.

If the network is intact, use:
* the best Detection State in the network for that target
* the best eligible targeting packet in the network for that target

Some *Electronic Warefare Suites* disrupts C3 network for any enemy node in range.  

C3 does not sum everyone’s bonuses.

### TAG
TAG is primarily an enabler, not a generic dice bonus.
* TAG upgrades friendly all units Track → Lock against Target (tagBasedLock)
* TAG  based Locks all degrade if the Target breaks the Lock from TAG

### NARC
NARC creates persistent targeting assistance.  
* NARC provides +2 targetingData for any NARC compatible attack (normal caps apply).  
* NARC bonus is applied to every attack, and does not require a Gunnery roll to generate targetData.  
* NARC lasts until the target removes it.  

---
## EMP Weapons

Electrical weapons may carry an EMP effect.

### Light EMP

Until end of target’s next activation:

* +1 trackingPenalty
* −1 targetingData 
* target cannot improve above Track

### Heavy EMP

Until end of target’s next activation:

* +2 trackingPenalty
* −2 targetingData 
* if target is at Lock, downgrade to Track
* target cannot improve above Track

---
# 🎯 Final One-Line Summary

> **Track lets you generate targeting bonuses; Lock improves how much you can generate and unlocks advanced targeting systems—but the bonus itself always comes from the Gunnery roll, not the lock.**

---

Below is a **developer-ready targetingData + lock rules spec** that fits the rules you’ve locked:

* UI emits intents/payloads, not math. 
* DN stays separate from most tactical/electronic effects. 
* Tracking/sensor friction belongs in dice parts. 
* Action injections / constraints / triggers should be data-driven through modules, not hard-coded sheet behavior. 
* SA/RA costs should respect the existing action economy.  

# TargetingData & Lock — Dev Rules

## 1. BLUF

Use a three-layer model:

1. **detectionState** = permission/gating
2. **trackingPenalty** = negative dice friction
3. **targetingData** = positive dice bonus generated from a separate roll

**Lock is not itself a bonus.**
Lock improves what can be generated and what systems may be used.

---

# 2. Core Terms

## 2.1 detectionState

```ts
type DetectionState = "blind" | "contact" | "track" | "lock";
```

Meaning:

* `blind` = no valid attack
* `contact` = may attack visually/manual only
* `track` = may generate/use targetingData
* `lock` = may generate enhanced targetingData and use lock-gated systems

## 2.2 trackingPenalty

A derived negative dice value representing solution friction.

```ts
trackingPenalty: number; // 0+
```

Sources may include:

* motion/tracking saturation
* ECM/interference
* stealth/signature reduction
* degraded sensors
* weather/LOS obscurants if desired

Tracking penalty is applied as a negative dice part, not as DN. 

### Implemented trackingPenalty sources

In the live system, tracking friction is assembled from several related lanes.

`getTrackingPenalty(targetActor, targetCombatant, options)` starts at 0 and
adds target-state friction:

* `ecmJamming`: +2
* `ecmShrouded`: +1
* `obscuredLight`: +1
* `obscuredHeavy`: +3
* `obscured`: +1
* ready asset-module effects that modify `trackingPenalty`
* active armor trait `sensorTrackingPenalty` (for example personal armor
  `stealth`)
* a combatant with a recorded move in the current action state: +1
* machine degradation adjustments, such as BattleMech head impairment (+1) and
  vehicle turret crippled (+2)
* battle armor machine-target profile penalties

Machine movement contributes separate attack dice parts through
`buildMachineAttackMotionContext`. If the target moved, its highest non-jump
movement speed is converted to 30 m hexes:

| Target movement | Dice part |
|---|---:|
| 0 hexes | 0 |
| 1-2 hexes | -1 |
| 3-4 hexes | -2 |
| 5-6 hexes | -3 |
| 7-8 hexes | -4 |
| 9+ hexes | -5 |

Jumping adds +1 DN and applies a +1 tracking offset
(`jumpTrackingPenalty: -1`), reducing the movement tracking penalty by 1.

Machine stealth is a third contributor emitted by the EW tracking modifier
provider. It appears as `tracking.stealth` rather than being folded directly
into `getTrackingPenalty`.

## 2.2.1 Machine stealth, signatures, and emission

Machine stealth is derived by `buildMachineStealthModel`.

Authoritative actor fields:

```ts
system.mwd.stealth = {
  enabled: boolean,
  rating: number,
  mode: "passive" | "active" | "suppressed",
  revealedUntil: number | null,
  detectionCap: string,
  signature: "low" | "medium" | "high",
  counteredBy: string[],
  notes: string
}
```

The machine default signature is `medium`. `low` and `high` signatures have
mechanical meaning:

* `low` signature contributes +1 stealth rating.
* `medium` signature is neutral.
* `high` signature contributes +1 emission.

Stealth rating is calculated as:

```text
rawRating = base stealth rating + ready module stealthProfile bonuses + low-signature bonuses
clampedRawRating = clamp(rawRating, 0, 3)
postModeRating = 0 if mode is suppressed, otherwise clampedRawRating
counterableRating = clamp(postModeRating - revealPenalty, 0, 3)
effectiveRating = clamp(counterableRating - emissionPenalty, 0, 3)
```

`revealPenalty` comes from the signature reveal lifecycle. `emissionPenalty`
comes from the target's effective emission rating. The effective rating is used
for display/model state; attack and acquire penalties use the counterable rating
after target counters are applied.

Ready asset modules may contribute stealth through
`system.targeting.stealthProfile`:

```ts
{
  ratingBonus: number,
  tags: string[],
  requiresActiveMode: boolean
}
```

Modules with a stealth profile are excluded from the generic
`modifies.trackingPenalty` summation to avoid double-counting the same stealth
system. For example, Stealth X has a legacy `trackingPenalty` effect and a
`stealthProfile.ratingBonus`; the stealth profile is the authored stealth model.

Emission is derived from authored signature/emission sources, transient
emission flags, and the `highEmission` status fallback:

* high actor or trait signature: +1 emission
* rule/effect/status outputs that grant `highEmission`
* transient emission stored under the machine stealth lifecycle flags

High emission does two things:

* reduces the target's effective stealth rating
* adds a positive acquire dice part against the target (`acquire.highEmission`)

Stealth counters are applied from the attacker's context:

* TAG or NARC on the target bypasses stealth entirely
* active probe / advanced sensors reduce stealth by 1
* C3 or shared lock reduces stealth by 1
* close visual contact reduces stealth by 1
* target high emission reduces stealth by its emission rating

After counters, remaining stealth contributes a negative attack dice part:

```text
tracking.stealth = -(counterableRating - counterValue), minimum 0
```

Stealth lifecycle actions and statuses:

* `stealthActive`: status representing active stealth mode.
* `signatureRevealed`: target signature is temporarily revealed; applies the
  reveal penalty.
* `highEmission`: target is broadcasting; contributes emission when no more
  specific authored/transient emission part is present.
* `goDark` clears reveal/transient emission and returns active/suppressed stealth
  toward passive mode.

### Battle armor machine-target profile

Battle armor uses its equipped armor profile rather than `system.mwd.stealth`.
When a machine attacks battle armor, `getBattleArmorMachineTargetProfile`
contributes a tracking penalty profile:

```ts
system.battleArmor = {
  systems: {
    stealth: {
      enabled: boolean,
      trackingPenalty: number,       // default 2
      detectionStateCap: "contact" | "track" | "lock",
      revealedOnAttack: boolean,
      revealedOnJump: boolean,
      revealedOnHit: boolean,
      counteredBy: string[]
    }
  },
  machineTargetProfile: {
    machineTargetable: boolean,
    targetClass: "battleArmor",
    signature: "low",
    stealthTrackingPenalty: number,
    detectionStateCap: string | null,
    counteredBy: string[]
  },
  attachedToTokenUuid: string | null
}
```

The implemented machine targeting penalty is:

```text
trackingPenalty =
  1                         // base battle armor small-target penalty
  + stealthPenalty           // if stealth is enabled and not countered
  + attachmentPenalty         // +1 if attached, +2 if attached to a friendly machine
```

If battle armor stealth is active and not countered, it may also lower the
attacker's acquire ceiling using its detection-state cap. Battle armor stealth
counters include active probe, TAG, NARC, point-blank/close contact, and revealed
state.

## 2.3 targetingData

A short-lived positive dice bonus attached to an attacker-target pair.

```ts
interface TargetingData {
  id: string;
  sourceActorUuid: string;
  targetTokenUuid: string;
  value: number;                 // positive dice bonus
  stateAtGeneration: "track" | "lock";
  generatedBy: "sensorLock" | "c3" | "narc" | "tag" | "other";
  shareable: boolean;
  persistent: boolean;
  expiresAt: {
    mode: "nextAttack" | "endOfActivation" | "endOfRound" | "manual";
    round?: number;
    turn?: number;
  };
  tags: string[];                // e.g. ["targeting", "narc", "network"]
  suppressed?: boolean;
}
```

---

# 3. Contact-State Rules

## 3.1 Attack permission

```ts
if (detectionState === "blind") {
  cannotAttack = true;
}

if (detectionState === "contact") {
  canAttack = true;
  allowTargetingData = false;
  allowLockGatedSystems = false;
}

if (detectionState === "track") {
  canAttack = true;
  allowTargetingData = true;
  allowLockGatedSystems = false;
}

if (detectionState === "lock") {
  canAttack = true;
  allowTargetingData = true;
  allowLockGatedSystems = true;
}
```

## 3.2 Important constraint

At `contact`, sensor-derived attack bonuses do not apply.

That means:

* no targetingData
* no fire-control bonus that depends on a firing solution
* no lock-gated traits

This should be enforced as a constraint, not by “just don’t click the button.”

---

# 4. Action Intents

## 4.1 Acquire/upgrade target state

### Sensor Sweep / Acquire Solution

Primary skill pairing: `System + Perception`

Purpose:

* `blind -> contact`
* `contact -> track`
* `track -> lock`

Suggested default thresholds:

* acquire `contact`: DN 1
* upgrade to `track`: DN 2
* upgrade to `lock`: DN 3

These are not attack DNs. They are task DNs.

## 4.2 Generate targetingData

### Line Up Shot / Fire-Control Solution

Primary skill pairing: `System + Gunnery`

Purpose:

* convert an existing `track` or `lock` state into positive dice on an upcoming attack

Suggested default:

* DN 2

This roll does not attack. It only creates targetingData.

---

# 5. TargetingData Generation Rules

## 5.1 Precondition

```ts
if (detectionState !== "track" && detectionState !== "lock") {
  cannotGenerateTargetingData = true;
}
```

## 5.2 Generation roll

```ts
roll = System + Gunnery
```

Suggested task DN:

* `track`: DN 2
* `lock`: DN 2

The difference between track and lock is not the DN. The difference is the cap and permissions.

## 5.3 Base conversion

```ts
rawValue = hits;
```

## 5.4 Cap

```ts
function getTargetingDataCap(detectionState, actorSystem) {
  if (detectionState === "track") return actorSystem;
  if (detectionState === "lock") return actorSystem + 1; // optional tuned premium
  return 0;
}
```

Then:

```ts
value = Math.max(0, Math.min(rawValue, cap));
```

## 5.5 Duration

Default:

```ts
expiresAt.mode = "nextAttack"
```

Recommended default behavior:

* created targetingData is consumed on the next qualifying attack against that target
* if not used by end of the creator’s next activation, it expires

This prevents stockpiling.

## 5.6 One-source rule

Default:

* one generated targetingData packet per source actor per target
* creating a new one replaces the old one unless a module explicitly changes this

---

# 6. Attack Resolution Integration

## 6.1 Dice pool

Attack dice pool may include:

```ts
attackDice =
  baseDice
  - trackingPenalty
  + usableTargetingData
  + otherDiceMods;
```

**CQ does not add to the attack dice pool.**

## 6.2 Usable targetingData

```ts
if (detectionState === "contact" || detectionState === "blind") {
  usableTargetingData = 0;
} else {
  usableTargetingData = sumOrBestAllowedTargetingData(...); // see sharing/stacking rules below
}
```

## 6.3 Consumption

On attack resolve:

```ts
if (targetingData.expiresAt.mode === "nextAttack" && attackWasDeclaredAgainstSameTarget) {
  consume(targetingData);
}
```

Consumption should happen whether the attack hits or misses, unless you explicitly want “spent only on roll completion.”

Recommended:

* spend on declared attack resolution, not on successful hit

---

# 7. Lock Effects

## 7.1 What lock does

Lock provides:

1. `detectionState = "lock"`
2. higher targetingData cap
3. permission to use lock-gated equipment/effects
4. optional stronger retention against disruption

## 7.2 What lock does not do

Lock does **not**:

* directly add dice
* directly change attack DN
* directly change CQ by itself
* automatically remove tracking penalty

## 7.3 Lock-gated systems

Examples that may require `lock`:

* fire-control suite CQ bonus
* Artemis/semi-guided support
* advanced indirect fire package
* called-shot style precision systems later

Implementation pattern:

* express these as constraints or CQ providers with `requiresTags: ["contact.lock"]` or equivalent. 

---

# 8. Sharing Rules: C3, TAG, NARC

## 8.1 Sensor-generated targetingData

Default:

* shareable = false

A normal self-generated fire-control solution is personal unless a module says otherwise.

## 8.2 C3/C3i

C3 should share **state first, then data**.

### Shared state

If connected to a valid network:

```ts
effectiveDetectionState = bestStateAmongEligibleNetworkNodes(target)
```

### Shared targetingData

If connected and allowed:

```ts
usableSharedTargetingData = bestEligibleSharedPacket(target)
```

Recommended default:

* **best**, not sum

```ts
usableTargetingData = max(localPacket, bestSharedPacket)
```

This prevents runaway stacking.

## 8.3 TAG

TAG is primarily an enabler flag, not generic bonus dice.

Suggested representation:

* apply a target condition/tag such as `tagged`
* certain weapons/effects check for `tagged`
* TAG may optionally create a small targetingData packet only if you want that behavior, but it should not be the default core identity

## 8.4 NARC

NARC creates persistent, shareable targeting assistance.

Suggested default:

```ts
TargetingData {
  value: 2,
  generatedBy: "narc",
  shareable: true,
  persistent: true,
  expiresAt.mode: "manual",
  tags: ["targeting", "narc", "persistent"]
}
```

Recommended:

* NARC does not stack infinitely with itself
* use best NARC packet only unless a module explicitly says otherwise

---

# 9. Stacking Rules

These need to be explicit.

## 9.1 Default stacking policy

### Sensor-generated targetingData

* best one from same source-target pair
* newer replaces older

### Across multiple sources

Recommended baseline:

```ts
usableTargetingData = max(allEligiblePackets)
```

This is the safest MVP.

## 9.2 Optional later policy

If you want modest additive behavior later:

```ts
usableTargetingData = bestPrimary + oneSecondarySupport
```

But I would not start there.

## 9.3 Hard cap on final usable targetingData

Recommended:

```ts
finalUsableTargetingData <= actor.system.attributes.system.value + 1
```

This keeps the lane bounded even with networking/NARC.

---

# 10. Suppression & Disruption

## 10.1 ECM / interference

ECM should not usually destroy targetingData outright. It should:

* increase trackingPenalty
* apply temporary interference or packet suppression where a specific effect says so
* make upgrades to `lock` harder

ECM Spike should stay in the interference lane. In the core workflow it does not directly downgrade Detection State, and it is not the generic answer to a fresh targetingData packet. Use Break Lock for Detection State and Defensive Jink for targetingData.

Suggested rule:

```ts
effectiveTargetingData = max(0, packet.value - suppressionValue)
```

or, for simpler MVP:

```ts
if (packet.tags includes "network" || "beacon") and ECM strong enough:
  packet.suppressed = true;
```

## 10.2 Breaking lock

Breaking lock changes state:

```ts
lock -> track
track -> contact
contact -> blind
```

Typical effects should only move one step unless very specialized.

If lock drops to track:

* existing targetingData remains usable unless a specific effect suppresses it

If lock drops below track:

* targetingData becomes unusable immediately

## 10.3 LOS break

Recommended:

```ts
if hard LOS break:
  detectionState = "blind" or "contact" depending on sensor model
```

If you want strict physical simplicity:

* hard LOS break = `blind` for purely visual/manual
* sensors may preserve `contact` if the target is still electronically detectable

---

# 11. Reactions

These mostly belong in the information-war layer and should use existing reaction rules.  

## 11.1 Common reaction effects

Reactions may:

* prevent `track -> lock`
* apply Defensive Jink to a newly generated targetingData packet
* preserve a shared network packet or state
* generate an opportunistic `contact` or `track` state

## 11.2 Timing windows

Recommended three timing windows:

1. **beforeAcquireResolve**
2. **beforeAttackResolve**
3. **afterStateChange**

This is enough for:

* ECM Spike
* Break Lock
* Defensive Jink
* Hold Link
* Suppress Beacon
* Snap Lock

---

# 12. Resolver Order of Operations

This is the critical dev section.

## 12.1 For acquire-state actions

1. validate intent
2. build current attacker-target context
3. gather defender/allied reaction opportunities
4. resolve reactions
5. roll `System + Perception`
6. compare to acquire/upgrade DN
7. upgrade state if successful
8. apply resulting tags/flags
9. emit chat/result

## 12.2 For targetingData generation

1. validate target and detectionState
2. require `track` or `lock`
3. gather relevant disruptions/reactions
4. roll `System + Gunnery`
5. compare to DN 2
6. convert hits into targetingData
7. cap by current detectionState and System
8. offer/resolve Defensive Jink against the generated packet when applicable
9. store the final packet
10. emit chat/result

## 12.3 For attack resolution

1. validate attack permission from detectionState
2. determine effective detectionState (including C3/network)
3. collect generic EW trackingPenalty as dice parts
4. collect machine stealth tracking parts (`tracking.stealth`) after counters
5. collect machine motion tracking parts
6. collect eligible targetingData packets
7. suppress targetingData only from explicit packet/network effects
8. apply stacking rule to choose usableTargetingData
9. build attack dice pool:

   * base
   * negative trackingPenalty
   * negative stealth and motion tracking parts
   * positive targetingData
   * other normal dice mods
10. roll vs attack DN
11. resolve CQ afterward per normal combat rules
12. consume spent targetingData packets
13. emit mutations/chat

---

# 13. Suggested Data Location

For simplicity, targeting state/data should not live in sheet-only temp state.

Recommended storage:

* combat-scoped actor flag
* or scene/combat scoped document state

Example:

```ts
flags.mwd.targeting = {
  byTarget: {
    [targetTokenUuid]: {
      detectionState: "track",
      packets: [TargetingData, ...]
    }
  }
}
```

For networking:

* evaluate links dynamically from actor modules/effects
* do not duplicate more state than necessary

---

# 14. Payloads / Intents

These fit your existing clickable intent payload model. 

## 14.1 Acquire solution

```json
{
  "intent": "acquireTarget",
  "targetTokenUuid": "<tokenUuid>",
  "goal": "contact|track|lock"
}
```

## 14.2 Generate targetingData

```json
{
  "intent": "generateFireSolution",
  "targetTokenUuid": "<tokenUuid>"
}
```

## 14.3 Break lock

```json
{
  "intent": "breakLock",
  "target": "<sourceTokenUuid>"
}
```

## 14.4 Preserve link

```json
{
  "intent": "holdLink",
  "target": "<allyTokenUuid>"
}
```

---

# 15. Player-Facing Table Summary

This is the simplified wording the UI/chat should reinforce:

* **Contact**: you can see them well enough to shoot, but no sensor help
* **Track**: you have a usable solution and can line up a better shot
* **Lock**: you have a full solution; advanced systems can engage
* **trackingPenalty**: this is what makes the shot messy
* **targetingData**: this is the short-lived bonus from lining up the shot

---

# 16. Recommended MVP Tuning

If you want the safest first implementation:

* `blind/contact/track/lock`
* `System + Perception` for state upgrades
* `System + Gunnery` for targetingData
* `Handling + Stealth` for Break Lock state downgrades
* `Handling + Piloting` for Defensive Jink packet reduction
* targetingData usable only at `track` or `lock`
* lock gives `+1` cap and unlocks lock-gated systems
* Break Lock DN is the state step being broken: Contact 1, Track 2, Lock 3
* battlefield situation modifies Break Lock dice, not DN
* Defensive Jink costs 1 RA and reduces the current targetingData packet by 1 on success
* use **best packet only**
* default packet duration = next attack
* C3 shares best state and best packet
* NARC creates persistent shareable packet `+2`
* TAG is an enabler flag, not generic dice bonus

That will play far cleaner than trying to ship every variant at once.
