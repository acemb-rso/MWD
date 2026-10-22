// src/modules/terrain/environment-dice.js
// Purpose: Combines environmental dice contributions (terrain now, weather
// later) under the catalog's stacking rules.
// How it fits: Each contribution names its function (traction, visibility,
// wind, electronic). Per function the strongest penalty applies and a bonus
// (e.g. favored terrain) applies once; the combined routine penalty is capped.
// See docs/Environment-Catalog.md §6.

// Routine combined environmental penalty never exceeds this many dice; more
// extreme conditions use restrictions, risks, and hazards instead.
export const ENVIRONMENT_DICE_PENALTY_CAP = -2;

/**
 * @param {Array<{function:string, value:number, label?:string}>} contributions
 *   Negative values are penalties, positive values bonuses.
 * @returns {{value:number, functions:Record<string,{penalty:number,bonus:number,value:number}>}}
 */
export function combineEnvironmentDice(contributions = []) {
  const functions = {};
  for (const entry of contributions) {
    const key = String(entry?.function ?? "").trim() || "general";
    const value = Math.trunc(Number(entry?.value) || 0);
    const slot = functions[key] ??= { penalty: 0, bonus: 0, value: 0 };
    if (value < 0) slot.penalty = Math.min(slot.penalty, value);
    if (value > 0) slot.bonus = Math.max(slot.bonus, value);
  }
  let total = 0;
  for (const slot of Object.values(functions)) {
    slot.value = slot.penalty + slot.bonus;
    total += slot.value;
  }
  return { value: Math.max(ENVIRONMENT_DICE_PENALTY_CAP, total), functions };
}
