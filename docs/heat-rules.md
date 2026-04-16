# BattleMech Heat Rules

## The Heat Track

Each mech has a heat track from 0 to a configured maximum (default 4, typically set higher per-chassis). The track is divided into four named bands with configurable thresholds:

| Band | Default range | Effect |
|---|---|---|
| **Safe** | 0 – (Hot threshold − 1) | None |
| **Hot** | Hot threshold onwards | −1 ground movement per level |
| **Overheat** | Overheat threshold onwards | −1 ranged attack die per level |
| **Danger** | Danger threshold onwards | Shutdown and Explosion checks |

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

Hot and Overheat levels cap at the width of their band — entering the next band does not increase the previous band's count further.

---

## Dissipation

Each mech has a **Dissipation** rating (configured on the Heat panel, default 1). This represents the mech's heat sinks.

Dissipation is applied at the **end of each activation** using a FILO (First In, Last Out) stack model:

```
new heat = clamp(current heat + heat generated this activation − dissipation, 0, max)
```

Dissipation works against the full heat stack, not just new heat. If a mech generates 1 heat but has dissipation 3, the track drops by 2. A mech that fires nothing still benefits from full dissipation — the heat sinks continue drawing down accumulated heat.

### Impaired Cooling

If the mech's cooling system is compromised, effective dissipation is halved (rounded down, minimum 1):

```
effective dissipation = max(1, floor(dissipation / 2))
```

Cooling is impaired in two ways:

- **From critical hits** — the two torso crits with `escalationKey: "heat"` automatically trigger impairment: **Reactor Unstable** (torso roll 4) and **Heat Sink Saturation** (torso roll 9). Both use the `coolantDump` remedy. Resolving either crit restores full dissipation immediately.
- **Manual GM override** — the flag `system.mwd.heat.coolingImpaired` can be set directly.

The Heat panel always shows the effective dissipation and marks it **(impaired)** when halved.

---

## End-of-Activation Resolution

The **End Activation** button on the Heat panel opens a dialog. The player enters the total heat generated during their activation (from weapons fired, movement surcharges, or other sources). The system:

1. Computes `new heat = clamp(current + generated − effective dissipation, 0, max)`
2. Updates the heat monitor
3. If the new value is in the Danger band, posts a Danger check card to chat automatically

When weapon automation is implemented, the heat generation value will be pre-populated from the weapons fired. Until then it is entered manually.

---

## Hot and Overheat Penalties

Computed live from the current heat value and displayed on the sheet whenever non-zero.

| Condition | Penalty |
|---|---|
| Each level into Hot | −1 ground movement |
| Each level into Overheat | −1 die from ranged attack pool |

These penalties must be applied manually to relevant rolls and movement until the roll engine reads them automatically.

---

## Danger Checks

Entering or remaining in the Danger band triggers two checks. These are posted as a chat card automatically when End Activation resolves into the Danger band.

### Shutdown Check

> **Pool:** Chassis + Reliability
> **DN:** number of levels into Danger

On a **success** (hits ≥ DN): the mech holds together, no shutdown.

On a **failure**: compare the margin of failure (DN − hits) to the pilot's **System Operations** skill:

- Margin **< System Operations** → the pilot *may choose* to override the shutdown and continue operating
- Margin **≥ System Operations** → the mech shuts down immediately

### Explosion Check

Only triggered if the mech has **volatile components** — any enabled, non-destroyed location tagged `ammoStore`. For mechs this is the torso by default.

> **Pool:** max(1, Chassis + Reliability − danger levels)
> **DN:** 1

Each level of Danger degrades the dice pool, representing mounting internal pressure on the ammunition stores. On a **failure** (zero hits), volatile components detonate.

If no volatile components are present, the Explosion check is skipped and the chat card notes this explicitly.

---

## Data Locations

| Field | Path | Notes |
|---|---|---|
| Heat track value | `system.monitors.heat.value` | Current accumulated heat |
| Heat track max | `system.monitors.heat.max` | Capacity of the track |
| Dissipation | `system.hybrid.heat.dissipation` | Base dissipation rating |
| Cooling impaired (manual) | `system.mwd.heat.coolingImpaired` | GM override; also set automatically from crits |
| Hot threshold | `system.mwd.heat.thresholds.runningHot` | First point of the Hot band |
| Overheat threshold | `system.mwd.heat.thresholds.overheated` | First point of the Overheat band |
| Danger threshold | `system.mwd.heat.thresholds.shutdown` | First point of the Danger band |
