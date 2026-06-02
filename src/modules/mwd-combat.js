// src/modules/mwd-combat.js
// Purpose: Custom Combat document class. Routes combat-tracker initiative rolls
// through game.mwd.roll.execute so the full engine pipeline applies (REF+EDGE,
// machine handling+pilot reflexes, status modifiers, trait phases, chat card).

export class MWDCombat extends Combat {

  async rollInitiative(ids, _options = {}) {
    for (const id of ids) {
      const combatant = this.combatants.get(id);
      if (!combatant?.actor) continue;
      await game.mwd.roll.execute({
        actor: combatant.actor,
        payload: { intent: "initiative" },
      });
    }
    return this;
  }
}
