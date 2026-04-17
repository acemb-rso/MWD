# BattleMech Heat Rules

## The Heat Track

Each mech has an open-ended heat track. The configured track length is only a sheet-display baseline; it is not a cap on actual heat. The track is divided into four named bands with configurable thresholds:

| Band | Default range | Effect |
|---|---|---|
| **Safe** | 0 to (Hot threshold - 1) | None |
| **Hot** | Hot threshold onward | -1 ground movement per level |
| **Overheat** | Overheat threshold onward | -1 ranged attack die per level |
| **Danger** | Danger threshold onward | Shutdown and Explosion checks |

"Level" means how many points into a band the current heat value sits. With thresholds at 3 / 5 / 7:

| Heat | Hot levels | Overheat levels | Danger levels |
|------|-----------|----------------|--------------|
| 2 | 0 | 0 | 0 |
| 3 | 1 | 0 | 0 |
| 4 | 2 | 0 | 0 |
| 5 | 2 | 1 | 0 |
| 6 | 2 | 2 | 0 |
| 7 | 2 | 2 | 1 |
| 8 | 2 | 2 | 2 |

Hot and Overheat levels cap at the width of their band. Entering the next band does not increase the previous band's count further.

---

## Dissipation

Each mech has a **Dissipation** rating (configured on the Heat panel, default 1). This represents the mech's heat sinks.

Dissipation is applied at the **end of each activation** using a FILO (First In, Last Out) stack model:

```text
new heat = max(0, current heat + heat generated this activation - dissipation)
```

Dissipation works against the full heat stack, not just new heat. If a mech generates 1 heat but has dissipation 3, the track drops by 2. A mech that fires nothing still benefits from full dissipation. The heat sinks continue drawing down accumulated heat.

### Impaired Cooling

If the mech's cooling system is compromised, effective dissipation is halved (rounded down, minimum 1):

```text
effective dissipation = max(1, floor(dissipation / 2))
```

Cooling is impaired in two ways:

- **From critical hits** - the two torso crits with `escalationKey: "heat"` automatically trigger impairment: **Reactor Unstable** (torso roll 4) and **Heat Sink Saturation** (torso roll 9). Both use the `coolantDump` remedy. Resolving either crit restores full dissipation immediately.
- **Manual GM override** - the flag `system.mwd.heat.coolingImpaired` can be set directly.

The Heat panel always shows the effective dissipation and marks it **(impaired)** when halved.

---

## Tracking Generated Heat

Heat generated during the activation is tracked in a **Pending Heat** value.

- BattleMech attack actions automatically add their authored weapon heat to Pending Heat.
- Players and GMs can manually adjust Pending Heat for movement surcharges, environmental effects, or other one-off rulings.
- Pending Heat is visible in the sheet summary and on the Heat panel so it can be reviewed from anywhere on the sheet.

This keeps heat generation visible and editable throughout the activation without asking the player to re-enter it at the end.

---

## End-of-Activation Resolution

At the end of the activation, the system resolves heat using the tracked Pending Heat value:

1. Compute `new heat = max(0, current + pending heat - effective dissipation)`
2. Update the heat monitor
3. Reset Pending Heat to 0
4. If the new value is in the Danger band, post a Danger check card to chat automatically

This resolution should happen automatically when combat advances to the next combatant or round. A manual **Resolve Heat** button remains available as a fallback or for out-of-band play, but it uses the tracked Pending Heat value and does not prompt for input.

---

## Hot and Overheat Penalties

Computed live from the current heat value and displayed on the sheet whenever non-zero.

| Condition | Penalty |
|---|---|
| Each level into Hot | -1 ground movement |
| Each level into Overheat | -1 die from ranged attack pool |

These penalties must be applied manually to relevant rolls and movement until the roll engine reads them automatically.

---

## Danger Checks

Entering or remaining in the Danger band triggers two checks. These are posted as a chat card automatically when end-of-activation heat resolution finishes in the Danger band.

### Shutdown Check

> **Pool:** Chassis + Reliability
> **DN:** number of levels into Danger

On a **success** (hits >= DN): the mech holds together, no shutdown.

On a **failure**: compare the margin of failure (DN - hits) to the pilot's **System Operations** skill:

- Margin **< System Operations** -> the pilot *may choose* to override the shutdown and continue operating
- Margin **>= System Operations** -> the mech shuts down immediately

### Explosion Check

Only triggered if the mech has **volatile components** - any enabled, non-destroyed location tagged `ammoStore`. For mechs this is the torso by default.

> **Pool:** max(1, Chassis + Reliability - danger levels)
> **DN:** 1

Each level of Danger degrades the dice pool, representing mounting internal pressure on the ammunition stores. On a **failure** (zero hits), volatile components detonate.

If no volatile components are present, the Explosion check is skipped and the chat card notes this explicitly.

---

## Data Locations

| Field | Path | Notes |
|---|---|---|
| Heat track value | `system.monitors.heat.value` | Current accumulated heat |
| Heat track length | `system.monitors.heat.max` | Baseline visible track length; actual heat can exceed it |
| Dissipation | `system.hybrid.heat.dissipation` | Base dissipation rating |
| Pending heat | `system.mwd.heat.pendingGenerated` | Heat queued for end-of-activation resolution |
| Cooling impaired (manual) | `system.mwd.heat.coolingImpaired` | GM override; also set automatically from crits |
| Hot threshold | `system.mwd.heat.thresholds.runningHot` | First point of the Hot band |
| Overheat threshold | `system.mwd.heat.thresholds.overheated` | First point of the Overheat band |
| Danger threshold | `system.mwd.heat.thresholds.shutdown` | First point of the Danger band |
