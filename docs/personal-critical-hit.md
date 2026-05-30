# Personal Critical Hit System

> **Summary:** Personal weapons deal flat damage; a high-margin hit instead
> inflicts a persistent combat *problem* that disrupts performance until the
> character deliberately resolves it. Criticals are never extra damage — the
> Physical / Fatigue tracks already represent injury. This mirrors machine
> combat, where damage causes attrition and criticals create fixable problems.

---

## Core Intent

Personal critical hits are **not** bonus damage.

- **Damage tracks** (Physical, Fatigue) already represent injury.
- **Critical hits** represent persistent operational problems — penalties,
  restrictions, and resource spikes — that stay active until the character
  spends an action to fix them.

This is the personal-scale parallel to the machine critical engine
(`critical-hit.md`). The key difference: the personal system is **code-driven
with a small fixed matrix** (no Roll Tables), because the table indirection the
machine engine needs for per-chassis/per-location customization adds no value
at personal scale.

---

## Trigger

A personal attack resolves normally first: **Miss → Graze → Hit**.

Only a **Hit** can produce a critical. On a hit, the attack's **margin (net
hits)** determines a *Severity* bonus, then a single roll decides whether — and
how badly — a Critical Threat lands.

Net hits no longer add to damage; they feed this system instead.

---

## Severity (from margin)

| Margin (net hits) | Severity |
|-------------------|----------|
| 1–2 | +0 |
| 3–4 | +1 |
| 5–6 | +2 |
| 7+  | +3 |

Better hits don't deal more damage — they make a stronger critical more likely.

---

## Critical Roll (2d6 + Severity)

| Total | Outcome |
|-------|---------|
| 2–9 | No Critical |
| 10 | **Minor** Critical |
| 11 | **Moderate** Critical |
| 12+ | **Severe** Critical |

A marginal hit (Severity +0) can still crit on a natural 10–12; a decisive hit
(Severity +3) reaches the Severe band far more often.

---

## Critical Family (1d6)

If a critical occurs, roll **1d6** for the effect *family*. The outcome band
(Minor / Moderate / Severe) selects which version of that family's effect
applies — each band is its own status condition, so the magnitude scales
declaratively.

| 1d6 | Family | Remedy | Minor | Moderate | Severe |
|-----|--------|--------|-------|----------|--------|
| 1 | **Winded** | Reduce Burn | +1 Burn (one-time) | +2 Burn | +3 Burn |
| 2 | **Concussion** | Endure | action & initiative −1 | −2 | −3 |
| 3 | **Crippled** | First Aid | speed −2m | −4m | −6m |
| 4 | **Hampered** | Ready Item | weapon becomes *unequipped* (must be re-readied) | …and −1 die to physical actions | …and fall `prone` |
| 5 | **Off Balance** | Steady (DN 2) | attack rating & defense rating −2 | −4 | −6 |
| 6 | **Dizzy** | Endure (DN 3) | cannot `aim` | cannot `aim` or take reactions | cannot `aim`, take reactions, or perform complex actions |

**Notes:**
- **Winded** is a one-time resource spike: it raises Burn immediately; the
  lingering problem is the elevated Burn, cleared by **Reduce Burn**.
- **Hampered** escalates by band — each higher band *adds* to the prior effect.
- **Off Balance** and **Dizzy** carry explicit Recovery DNs (2 and 3); other
  families use their remedy action's default DN.

---

## Persistence & Remediation

Every personal critical **stays active until deliberately resolved**. It does
**not** expire at end of turn or on the next activation. Each family is cleared
only by its **remedy verb** — an existing action (or, for *Steady*, a new one):

| Remedy | Kind | Used For |
|--------|------|----------|
| Reduce Burn | Personal action | Winded (lower raised Burn) |
| First Aid | Personal action | Crippled |
| Ready Item | Personal action | Hampered (re-ready the weapon) |
| Endure | Common-check utility | Concussion, Dizzy (DN 3) |
| Steady | Common-check utility (**new** — like Endure, rolls **REF + WIL**) | Off Balance (DN 2) |

Criticals persist, so they create real action-economy pressure and tactical
trade-offs: keep fighting impaired, or spend an action to clear the problem.

---

## Crit Resolution Flow

1. Resolve the attack (Miss / Graze / Hit).
2. On a Hit, compute Severity from margin.
3. Roll **2d6 + Severity** → No Critical / Minor / Moderate / Severe.
4. If a critical lands, roll **1d6** for the family; the band selects the
   per-band status and effect.
5. Apply the status + any non-roll effect (Burn, speed, gate, prone).
6. The crit remains until cleared by its listed remedy.

---

## Implementation Contract

Personal criticals reuse the queued-mutation, preview→apply model that machine
attacks use, scaled down:

1. Sheets and quick actions emit `intent: "attack"`.
2. The attack resolver attaches one queued `attackDamage` mutation per non-miss
   personal target, carrying the margin-derived Severity and (when required)
   prepared critical records pinned to the current `previewRevision`.
3. Chat renders the resolved result and previews the pending Critical Threat.
4. `HarmEngine` is the **only writer** for personal damage and crit records.

**Storage:** active personal criticals live on the target actor at
`system.criticals` (an array of crit records). Characters have no `mwd`
namespace, so this is top-level — the personal parallel to machine
`system.mwd.crits`.

**Effect kinds** — each per-band entry declares how it is applied:

| Kind | Families | Applied via |
|------|----------|-------------|
| `rollMod` | Concussion, Off Balance, Hampered (−1 die) | Status condition → `STATUS_MAP` → existing status-effects modifier provider |
| `resource` | Winded | one-time Burn add on apply |
| `speed` | Crippled | movement/speed reduction read from active crits |
| `gate` | Hampered (unequip, prone), Dizzy (aim / reaction / complex) | action & attack pipeline checks keyed off the active crit |

Roll penalties therefore flow through the **existing** status-condition pipeline
— per-band statuses (`concussionMinor/Moderate/Severe`, `offbalance…`,
`crippled…`, `winded…`, `hampered…`, `dizzy…`, plus a managed `personalCritical`
marker) are codified in the status-condition catalog with their `STATUS_MAP`
magnitudes. No new modifier provider is required.

**Idempotency:** as with machine criticals, prepared crit records are drawn
during preview only when required, pinned to `previewRevision`, and reused on
apply. Re-applying the same chat card never re-rolls or double-inflicts a
critical.

**No Roll Tables (by design):** the family × band matrix is small and fully
designer-owned, so it lives in code (`2d6+severity` and `1d6` rolled directly),
unlike the machine engine's table-driven, GM-customizable crit tables. If
per-campaign customization is ever wanted, the family catalog is already the
single source and can be promoted to a setting.

---

## System Boundaries

| System | Role |
|--------|------|
| Damage tracks | Injury / attrition (Physical, Fatigue) |
| Criticals | Persistent, fixable combat problems; require actions to clear |
| Remedies | The only way criticals are removed (no auto-expiry) |

**No overlap:** a critical is a problem to manage, not a second damage track.
Each crit produces at most one operational effect for its band — not multiple
stacked penalties.
