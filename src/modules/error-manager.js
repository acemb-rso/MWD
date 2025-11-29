import { ANARCHY } from "./config.js";

export class ErrorManager {

  static checkSufficient(resource, required, available) {
    if (required > available) {
      const error = game.i18n.format(ANARCHY.common.errors.insufficient, {
        resource: game.i18n.localize(resource),
        required: required,
        available: available
      });
      ui.notifications.error(error);
      throw error;
    }
  }

  static checkOutOfRange(resource, value, min, max) {
    if (value < min || value > max) {
      const error = game.i18n.format(ANARCHY.common.errors.outOfRange, {
        resource: game.i18n.localize(resource),
        value: value, min: min, max: max
      });
      ui.notifications.error(error);
      throw error;
    }
  }

  static checkUserGM() {
    if (!game.user.isGM) {
      const error = game.i18n.localize(ANARCHY.common.errors.onlyGM);
      ui.notifications.error(error);
      throw error;
    }
  }

  static checkItemType(item, expectedType) {
    if (item.type != expectedType) {
      const error = game.i18n.format(ANARCHY.common.errors.expectedType, {
        type: game.i18n.localize(item.type ? (ANARCHY.itemType.singular[item.type]) : item.type),
        expectedType: game.i18n.localize(expectedType)
      });
      ui.notifications.error(error);
      throw error;
    }
  }

  static checkActorCanReceiveDamage(damageType, monitor, actor) {
    if (!monitor) {
      const error = game.i18n.format(ANARCHY.common.errors.actorCannotReceiveDamage, {
        actor: actor.name,
        damageType: game.i18n.format('ANARCHY.actor.monitors.' + damageType)
      });
      ui.notifications.error(error);
      throw error;
    }
  }

  static checkWeaponDefense(weapon, actor) {
    const defense = weapon.getDefense();
    if (!defense) {
      const error = game.i18n.format(ANARCHY.common.errors.noDefenseOnWeapon, { actor: actor.name, weapon: weapon.name });
      ui.notifications.error(error);
      throw error;
    }
  }

  static checkTargetsCount(maxTargets, targets, area) {
    if (maxTargets > 0 && targets.length > maxTargets) {
      const error = game.i18n.format(ANARCHY.common.errors.maxTargetsExceedeed, {
        weapon: this.name,
        area: game.i18n.localize(ANARCHY.area[area]),
        count: targets.length,
        max: maxTargets
      });
      ui.notifications.error(error);
      throw error;
    }
  }

  static checkMatrixMonitor(actor) {
    if (!actor.hasMatrixMonitor()) {
      const error = game.i18n.format(ANARCHY.actor.monitors.noMatrixMonitor, {
        actor: actor.name
      });
      ui.notifications.warn(error);
      throw error;
    }
  }

  static checkActorDefenseAction(actorAction, actor, defense) {
    if (!actorAction) {
      const error = game.i18n.format(ANARCHY.common.errors.actorDoesNotHaveDefense, {
        actor: actor.name,
        defense: game.i18n.localize(defense.labelkey),
        actorType: game.i18n.localize(ANARCHY.actorType[actor.type])
      });
      ui.notifications.error(error);
      throw error;
    }
  }
}
