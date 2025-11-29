import { Misc } from "./misc.js";
import { AnarchyUsers } from "./users.js";

export class AnarchyCombat extends Combat {

  static init() {

    Hooks.on('createCombatant', async (combatant, options, id) => await combatant.combat.onCreateCombatant(combatant, options, id));
    Hooks.on('deleteCombatant', async (combatant, options, id) => await combatant.combat.onDeleteCombatant(combatant, options, id));
    Hooks.on('deleteCombat', async (combat, options, id) => await combat.onDeleteCombat(options, id));
  }

  get initiative() {
    return { formula: "2d6" }
  }

  async rollInitiative(ids, options) {

    const selectedCombatants = ids.map(id => this.combatants.find(c => c.id == id));
    const combatantsByType = Misc.classify(selectedCombatants, it => it.actor.type);

    Object.entries(combatantsByType).forEach(async ([type, list]) => {
      const typeActorClass = game.system.anarchy.actorClasses[type];
      const typeIds = list.map(it => it.id);
      const typeOptions = foundry.utils.mergeObject({ formula: typeActorClass.initiative }, options ?? {});
      await super.rollInitiative(typeIds, typeOptions);
    });
  }

  async onCreateCombatant(combatant, options, id) {
    if (AnarchyUsers.isUniqueConnectedGM()) {
      await combatant.actor?.onEnterCombat();
    }
  }
  async onDeleteCombatant(combatant, options, id) {
    if (AnarchyUsers.isUniqueConnectedGM()) {
      await this._leaveCombat(combatant);
    }
  }
  async onDeleteCombat(options, id) {
    if (AnarchyUsers.isUniqueConnectedGM()) {
      this.combatants.forEach(async c => await this._leaveCombat(c));
    }
  }

  async _leaveCombat(combatant) {
    return await combatant.actor?.onLeaveCombat();
  }
}
