// src/modules/roll/intent/resolve-overload.js
// Purpose: Defines function `resolveOverload`.
// How it fits: Describes role within src/modules or template rendering pipeline.


// modules/roll/intents/resolve-overload.js

import { getTraitActiveEffectModifier } from "../../mwd/traits.js";

export async function resolveOverload({ actor }) {

  const burn = Number(actor.system?.burn?.value ?? 0);

  const threshold = actor.overloadThreshold;

  if (burn < threshold) {
    ui.notifications.warn(`Overload check is only required at Burn ${threshold}+.`);
  }

  const guts = Number(actor.system?.attributes?.guts?.value ?? 0);
  const dnMod = getTraitActiveEffectModifier(actor, "overloadDNMod");

  return {
    intent: "overload",
    title: "Overload Check",

    domains: ["mental"],

    pool: {
      attribute: guts,
      skill: guts,
      bonus: 0
    },

    difficulty: {
      dn: Math.max(0, burn - (threshold - 1) + dnMod)
    },

    breakdown: [
      { id: "guts1", label: "Guts", value: guts },
      { id: "guts2", label: "Guts", value: guts }
    ]
  };
}