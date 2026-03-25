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

  collect({ actor, rollType } = {}) {
    if (!actor) return [];
    if (rollType === "edge") return []; // don’t penalize edge-only rolls

    const d = actor.system?.derived ?? {};

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
    console.log("MWD|condition derived snapshot", actor.name, foundry.utils.deepClone(actor.system?.derived));
    return mods;
  }
}