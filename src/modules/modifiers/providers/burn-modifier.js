// src/modules/modifiers/providers/burn-modifier.js
// Purpose: Emits roll penalties from the actor Burn track.
// Workflow: modifier collection -> current burn is halved into a penalty ->
// the roll receives a source-labeled Burn modifier.


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
