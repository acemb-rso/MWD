// src/modules/modifiers/providers/burn-modifier.js
// Purpose: System module or client script for burn-modifier. Integrates with the system's JavaScript modules.

export const burnModifier = {
  id: "burn",

  async collect(ctx) {
    const actor = ctx.actor;
    if (!actor) return [];

    const burn = Number(actor.system?.burn?.value ?? 0);
    const penalty = Math.floor(burn / 2);

    if (penalty <= 0) return [];

    return [{
      id: "burn",
      label: "Burn",
      value: -penalty,
      source: "Burn Track",
      domain: null
    }];
  }
};