// src/modules/modifiers/providers/conditions.js
// Purpose: Emits personal condition penalties from derived monitor state.
// Workflow: modifier collection -> physical/fatigue derived penalties are read
// from the roll actor -> non-Edge rolls receive condition modifiers.


// modules/modifiers/providers/condition.js
//
// Condition penalties from Physical + Fatigue monitors.
// Both penalties apply (stack).
//
// Expects derived monitor penalties to exist, e.g. via deriveMonitors():
//   actor.system.derived.monitors.physical.penalty
//   actor.system.derived.monitors.fatigue.penalty
//
// Optionally also supports:
//   actor.system.derived.condition.physicalPenalty / fatiguePenalty

export class ConditionModifiersProvider {
  id = "mwd.condition";
  label = "Condition";

  collect({ actor, rollActor, rollType } = {}) {
    const sourceActor = rollActor ?? actor;
    if (!sourceActor) return [];
    if (rollType === "edge") return []; // don’t penalize edge-only rolls

    const d = sourceActor.system?.derived ?? {};

    const phys = Number(
      d?.condition?.physicalPenalty ??
      d?.monitors?.physical?.penalty ??
      0
    );

    const fat = Number(
      d?.condition?.fatiguePenalty ??
      d?.monitors?.fatigue?.penalty ??
      0
    );

    const mods = [];

    if (Number.isFinite(phys) && phys !== 0) {
      mods.push({
        id: "conditionPhysical",
        label: "Physical Penalty",
        value: phys,
        source: "Physical Track",
        // domain: "physical" // optional; leave unset to apply to all domains
      });
    }

    if (Number.isFinite(fat) && fat !== 0) {
      mods.push({
        id: "conditionFatigue",
        label: "Fatigue Penalty",
        value: fat,
        source: "Fatigue Track",
        // domain: "physical" // optional
      });
    }
    return mods;
  }
}
