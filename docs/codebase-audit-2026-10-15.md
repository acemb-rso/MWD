# MWD implementation audit — 2026-10-15

MWD is substantially implemented. The best next investment is completing the consequences of existing actions and equipment, then strengthening live Foundry validation. A broad rewrite is not justified by this review.

This review traces the active startup, actor/item, sheet, action catalog, roll, modifier, harm, critical, heat, EW, area-status, advancement, equipment, migration, and tooling paths, with selected tests and design documents. Findings describe implementation coverage against the repository's own declared behavior; this is not certification against every rule in MWD.pdf. No live Foundry session was exercised.

## What is already present

- AppV2 authoring for all four actor types and canonical item types.
- Personal action economy, Burn, Edge, advancement, first aid, criticals/remedies, battle armor, grapple and suppression workflows.
- Personal attacks, fire modes, ammunition/payload profiles, area exposure/Evade, armor wear, and damage-scale conversion.
- Machine weapon groups/hardpoints, movement, heat/strain, degradation, hit locations, critical previews, Reliability options, and queued damage application.
- EW detection, targeting data, indirect spotting, stealth, pilot vision, and sensor overlays.
- Declarative rules and asset-module readiness, modifiers, auras, and some runtime effects.

These areas have implementation and test coverage in the repository; that does not establish that every branch works in a live game.

## Prioritized implementation work

Priority reflects gameplay impact and dependencies. Effort estimates are relative: small, medium, or large.

| Order | Priority | System/function | Current gap | Effort |
| --- | --- | --- | --- | --- |
| 1 | P1 | Charge/Ram/DFA outcome resolution | Attack exists; recoil, landing/fall consequences, and control outcomes remain partly manual. Follow-up knockdown is launched unconditionally after the attack returns. | Medium–large |
| 2 | P1 | Asset-module runtime dispatch | Several shipped equipment packets have no matching execution consumers. | Large |
| 3 | P1 | Machine critical consequences | Some declared movement/resource riders and pilot damage are stored without execution. Several arm effects are explicitly reminders. | Large |
| 4 | P1 | Shield damage consumption | Defensive posture works; first-hit damage reduction and status consumption are manual. | Medium |
| 5 | P1 | Heat explosions and crew survival | Detonation is reported; resulting damage/destruction is left to adjudication. Ejection is an explicit stub. | Large |
| 6 | P2 | Personal Dodge | Explicit stub; direct defense needs a defined action-to-resolution contract. | Medium |
| 7 | P2 | Reserved payload and template capabilities | Cloud/minefield shapes are offered but cannot execute; several capability names lack dedicated workflows. | Large, incremental |
| 8 | P3 | Token HUD shortcuts and generic React | Legacy shortcut class is disconnected and calls removed actor helpers; React remains a placeholder for specific reactions. | Small–medium |

### 1. Finish Charge/Ram/DFA as a resolved outcome

Evidence: [charge-attack-actions.js](../src/modules/mwd/charge-attack-actions.js), especially `performChargeAttack`, `emitRecoilNotification`, and `performMachineKnockdownCheck`.

The action validates prerequisites, calculates profiles, and launches the normal attack. However, recoil is only a chat notification. The notification accepts `isMiss`, but its caller never supplies the attack result. The defender knockdown check runs after every non-aborted returned attack; the GM applies Prone/Skidding/Stalled. Landing checks and miss-specific DFA consequences are described rather than executed.

Complete when hit, miss, and Edge-revised outcomes produce the appropriate queued attacker/defender harm and status consequences exactly once. Recheck the unconditional knockdown trigger against intended rules. Add tests that exercise the whole result handoff, not just formula generation.

### 2. Connect authored asset-module packets to subsystem execution

Evidence: [asset-module-runtime.js](../src/modules/mwd/asset-module-runtime.js), [asset-module-runtime-handlers.js](../src/modules/mwd/asset-module-runtime-handlers.js), and [generate-asset-module-pack.mjs](../tools/generate-asset-module-pack.mjs).

The registry accepts `interceptAttack`, `pilotDamageMitigation`, `catastrophicInterception`, and `startOfActivationRepair`. The generator supplies these for AMS/Laser AMS, cockpit protection, CASE, and Harjel II. Searches found their declarations and generated requests, but no corresponding execution consumers. The generic runtime handlers currently implement incoming damage reduction, current heat adjustment, and best targeting-packet selection.

Complete when each supported packet has a subsystem owner, eligibility checks, observable consequences, charge/heat/consumption handling, and an execution test. Start with AMS, then cockpit protection/CASE alongside crew damage, then Harjel. Authoring a `queuedDomainRequest` alone does not execute it.

### 3. Complete critical riders and pilot damage

Evidence: [critical-hits.js](../src/modules/mwd/critical-hits.js), [machine-crit-consequences.js](../src/modules/mwd/machine-crit-consequences.js), and [machine-crit-effects.js](../src/modules/mwd/machine-crit-effects.js).

`pilotDamage` is normalized and persisted, but no harm consumer was found. Likewise, `heatOrStrainOnMove`, `repeatedMoveCost`, `noMovementFireAdvantage`, and `noMobilityCqBonus` appear in critical declarations without matching runtime consumers. Stability/control-test signals need action follow-up ownership. Skidding remains a forced-movement reminder. Several arm criticals explicitly use `automationMode: "callout"`.

Existing status penalties, weapon-group failures, energy-attack heat, and degradation already work through dedicated paths; preserve them. Audit every critical output against a consumer, implement missing riders through centralized services, and identify effects that intentionally require GM adjudication. Pilot snapshots also require a clear policy for choosing the character who receives injury.

### 4. Consume Shield on the first qualifying impact

Evidence: [battlemech-movement-actions.js](../src/modules/mwd/battlemech-movement-actions.js) and [vehicle-movement-actions.js](../src/modules/mwd/vehicle-movement-actions.js).

Both emit chat text explicitly directing the GM to apply the two-point reduction and clear Shielded manually. Complete the reduction in damage preview/application, then consume the status once at the defined impact boundary. Cover zero-damage hits, grazes, multiple pending attacks, and rerolls. This is a good first bounded implementation task.

### 5. Complete explosion, crew, and ejection consequences

Evidence: [heat-danger-outcomes.js](../src/modules/mwd/heat-danger-outcomes.js), [machine-action-catalog.js](../src/modules/mwd/machine-action-catalog.js), and the critical pilot-damage declarations.

Failed volatile explosion checks return `explosionTriggered: true` plus instructions to apply resulting harm. They do not apply detonation harm themselves. Manual ejection explicitly has `implementation.state: "stub"`. Destruction statuses and degradation fallbacks exist, so this is a consequence-completion task rather than a missing destruction model.

Define crew injury, bailout/ejection state, and catastrophic protection together. Route damage through HarmEngine and allow CASE/cockpit protection to intercept at explicit points.

### 6–8. Smaller completeness work

- **Dodge:** `defend` in [personal-action-catalog.js](../src/modules/combat/personal-action-catalog.js) is explicitly unimplemented. Define cost, duration, target scope, and its relationship to the existing defense resolver and Evade before wiring it.
- **Payloads/templates:** [personal-weapon-capabilities.js](../src/modules/mwd/personal-weapon-capabilities.js) lists cloud/minefield shapes, while [template-placement.js](../src/modules/roll/template-placement.js) rejects all shapes except blast/cone/line. Smoke, mines, incendiary, EMP, and personal clustered payloads need individual workflow decisions. Armor Bypass already has a live harm consumer despite appearing in a reserved list; reserved labels are not reliable completion indicators.
- **HUD:** [hud-shortcuts.js](../src/modules/token/hud-shortcuts.js) has no startup import/registration and calls `getShortcuts`/`getShortcut`, which are absent from the live actor class. Rebuild through current intents if this UI is wanted; otherwise remove the abandoned surface. Generic `react` is also a stub, but specific reactions already exist, making it lower priority than Dodge.

## Reliability work to schedule alongside features

The queued damage service clones chat state, applies actor damage, and returns message updates; the chat caller persists those updates afterward. See [queued-attack-damage.js](../src/modules/harm/queued-attack-damage.js) and [chat-actions.js](../src/modules/chat/chat-actions.js).

Sequential replay guards exist. They do not by themselves prove safety when two clients apply concurrently, or when actor mutation succeeds and message persistence fails. Treat these as validation targets, not reproduced defects. Test double-clicks, two GMs, retry after message failure, player attacks against unowned targets, and Edge/Chaos/Reaction spending when harm application fails. Centralize authority and mutation IDs if those cases expose duplicate or partial application.

Add a small Foundry v14 integration smoke suite covering world startup, all actor/item sheets, player/GM combat, unlinked tokens, critical remedies, heat, area ownership, and migration of an older world. The current 81 Node test files include useful pure-function and source-boundary coverage, but cannot establish DOM, permission, socket, or lifecycle behavior.

## Optimizations and cleanup, in order

1. **Correct status documentation.** README reports 0.5.0 while system.json reports 0.6.1. README still calls charge/DFA, Shield, and spotting stubs and says weapon traits are unautomated. Spotting is implemented; Charge and Shield are partial; Fatigue, Automatic/Single Shot, Spread fire-mode eligibility, Armor Bypass, and Danger Close have behavior. `stabilization-plan.md` and `vehicle-gap-analysis.md` also list implemented work as missing. Maintain one feature matrix with implemented/partial/manual/unsupported states and code/test references.
2. **Profile area reconciliation.** Token hooks debounce at 75 ms, but actor/item hooks directly invoke reconciliation. Reconciliation scans scene sources/tokens and world actors with prior contributions. Filter irrelevant update fields, coalesce actor/item changes, and cache stable source data where measured useful. Verify authority with multiple connected GMs. Do not replace this subsystem without a benchmark.
3. **Consolidate remaining compatibility paths.** Remove proven unreachable legacy HUD/combat/roll code and unused templates only after checking imports, preload lists, macros, and migration compatibility. Keep public aliases until callers have migrated. Remove the obsolete zero-returning `getMachinePilotingDnModifier` from machine-crit-effects after checking compatibility; the active resolver already uses machine-state-effects.
4. **Extract cohesive services from large modules.** Character sheet is about 1,975 lines, roll orchestration 1,481, chat actions 1,347, and migrations 1,334. Prioritize extracting newly completed consequence workflows and replacing generic header comments with actual ownership documentation. File length alone is not a performance problem.
5. **Make release checks reproducible.** Pin/document the supported Node version, automate tests/entropy/JSON/build checks, and validate an installable archive. Vite builds the JS bundle into dist, while the manifest loads root index.mjs and root assets; explicitly define which artifact is shipped and verify its templates, styles, localization, and packs. This is a packaging verification target, not a reproduced installation failure.

## Validation performed

- Initial working tree was clean.
- Python JSON parsing checked the same directory exclusions used by tools/validate-json.js: 24 JSON files parsed successfully.
- Found 81 `*.test.mjs` files.
- `npm test` and `npm run validate:json` could not start because npm is unavailable. Node was also not found on PATH or in the local locations checked. No test-pass or build-pass claim is made.
- No gameplay code was changed. This report is the only added repository file.

Recommended implementation sequence: complete Shield as a bounded task, then Charge/DFA outcomes; establish the critical/crew consequence hooks and use those hooks to finish equipment interception and catastrophic behavior. Update the feature matrix throughout so completed work is not repeatedly planned as missing.
