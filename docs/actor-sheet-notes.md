# Actor sheet orchestration notes

These notes capture where the actor sheet lifecycle can stumble and what to check when sheets refuse to open or render cleanly.

## Lifecycle refresher
- `AnarchySystem.start` wires up actor document classes (`CONFIG.Actor.documentClass`) and registers sheet classes during the `init` hook. The default actor sheet options now come from `AnarchyActorSheet` via `DEFAULT_OPTIONS`/`defaultOptions`.  
- When an Actor document is constructed, `AnarchyBaseActor` reroutes instantiation to the type-specific actor class in `game.system.anarchy.actorClasses`. Missing entries fall back to the base class, so unmatched `type` values can bypass custom logic.  
- Sheet selection comes from `loadActorSheets` in `anarchy-system.js`; the active sheet for a given actor type is whichever class was registered as default or manually chosen per actor.

## Fragile spots to watch
- **Actor type drift**: `AnarchyActorSheet.template` now logs when an actor type is missing and falls back to the character template instead of crashing. Verify actor JSON includes a supported `type`, and confirm `actorClasses` plus registered sheets cover that type.
- **System readiness**: Render logging records when `game.system.anarchy` is unavailable. If sheets break on world start, confirm `AnarchySystem.start()` ran (look for the init logs) before actors are touched.
- **Template expectations**: The sheet diagnostics include the resolved template path and whether system data (`actor.system`) is present. Mismatched template paths or stripped `system` data will show up there.

## Quick checklist before chasing render bugs
1. **Actor type & template** – Confirm the actor `type` matches a template file under `templates/actor/` and that a sheet was registered for that type. Fallback logging now highlights when the type is missing.
2. **Document class wiring** – Ensure `CONFIG.Actor.documentClass` points at `AnarchyBaseActor` and that `game.system.anarchy.actorClasses` has the expected constructor for the actor type.
3. **Sheet registration** – Check `AnarchySystem.loadActorSheets()` to verify the desired sheet class is registered (and defaulted) for the actor type.
4. **System readiness** – Look for the `${LOG_HEAD}AnarchySystem.onInit`/`onReady` console logs. If sheets render before those fire, gating logic may need to delay rendering.
5. **Console diagnostics** – Use the new `ActorSheet` debug logs to capture `actorId`, `actorType`, template path, ownership IDs, and render timing. Rendering failures will now surface a notification and a structured error payload in the console.
