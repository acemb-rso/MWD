// src/modules/modifiers/providers/burn-modifier.js
// Purpose: Provides module-level utilities or helpers.
// How it fits: Describes role within src/modules or template rendering pipeline.


export const burnModifier = {
  id: "burn",

  async collect(ctx) {
    const actor = ctx.rollActor ?? ctx.actor;
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
