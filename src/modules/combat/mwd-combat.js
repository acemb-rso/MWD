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

  _sortCombatants(a, b) {
    const ia = Number.isNumeric(a.initiative) ? a.initiative : -Infinity;
    const ib = Number.isNumeric(b.initiative) ? b.initiative : -Infinity;
    if (ia !== ib) return ib - ia;

    // PCs act before NPCs when tied
    const aIsPC = !a.isNPC;
    const bIsPC = !b.isNPC;
    if (aIsPC !== bIsPC) return aIsPC ? -1 : 1;

    // Among tied PCs: higher EDGE first
    if (aIsPC) {
      const aEdge = Number(a.actor?.system?.attributes?.edge?.value ?? 0);
      const bEdge = Number(b.actor?.system?.attributes?.edge?.value ?? 0);
      if (aEdge !== bEdge) return bEdge - aEdge;
    }

    // Players or GM decide remaining ties — preserve current order
    return 0;
  }

  async nextRound() {
    await this.resetAll();
    const result = await super.nextRound();
    await this.rollAll();
    return result;
  }
}
