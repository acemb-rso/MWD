// src/modules/roll/intent/resolve-overload.js
// Purpose: Defines function `resolveOverload`.
// How it fits: Describes role within src/modules or template rendering pipeline.


// modules/roll/intents/resolve-overload.js

export async function resolveOverload({ actor }) {

  const burn = Number(actor.system?.burn?.value ?? 0);

  if (burn < 6) {
    ui.notifications.warn("Overload check is only required at Burn 6+.");
  }

  const guts = Number(actor.system?.attributes?.guts?.value ?? 0);

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
      dn: Math.max(0, burn - 5)
    },

    breakdown: [
      { id: "guts1", label: "Guts", value: guts },
      { id: "guts2", label: "Guts", value: guts }
    ]
  };
}