import { ANARCHY } from "./config.js";
import { TEMPLATE } from "./constants.js";
import { formatString } from "./strings.js";
import { getPersonalDamageTypeLabel, isPersonalDamageType } from "./mwd/personal-damage.js";

export class ErrorManager {

  static checkSufficient(resource, required, available) {
    if (required > available) {
      const error = formatString(ANARCHY.common.errors.insufficient, {
        resource: resource,
        required: required,
        available: available
      });
      ui.notifications.error(error);
      throw error;
    }
  }

  static checkOutOfRange(resource, value, min, max) {
    if (value < min || value > max) {
      const error = formatString(ANARCHY.common.errors.outOfRange, {
        resource: resource,
        value: value, min: min, max: max
      });
      ui.notifications.error(error);
      throw error;
    }
  }

  static checkUserGM() {
    if (!game.user.isGM) {
      const error = ANARCHY.common.errors.onlyGM;
      ui.notifications.error(error);
      throw error;
    }
  }

  static checkItemType(item, expectedType) {
    if (item.type != expectedType) {
      const error = formatString(ANARCHY.common.errors.expectedType, {
        type: item.type ? (ANARCHY.itemType.singular[item.type]) : item.type,
        expectedType: expectedType
      });
      ui.notifications.error(error);
      throw error;
    }
  }

  static checkActorCanReceiveDamage(damageType, monitor, actor) {
    if (!monitor) {
      const error = formatString(ANARCHY.common.errors.actorCannotReceiveDamage, {
        actor: actor.name,
        damageType:
          (isPersonalDamageType(damageType)
            ? getPersonalDamageTypeLabel(damageType)
            : ANARCHY.actor.monitors[damageType]
              ?? ANARCHY.mwd.weaponDamageType[damageType]
              ?? ANARCHY.mwd.personalDamageType[damageType]
              ?? damageType)
      });
      ui.notifications.error(error);
      throw error;
    }
  }

  static checkWeaponDefense(weapon, actor) {
    const defense = weapon.getDefense();
    if ((weapon.isPersonalWeapon?.() ?? weapon.type === TEMPLATE.itemType.personalWeapon) && !defense) {
      const error = formatString(ANARCHY.common.errors.noDefenseOnWeapon, { actor: actor.name, weapon: weapon.name });
      ui.notifications.error(error);
      throw error;
    }
  }

  static checkTargetsCount(maxTargets, targets, area) {
    if (maxTargets > 0 && targets.length > maxTargets) {
      const error = formatString(ANARCHY.common.errors.maxTargetsExceedeed, {
        weapon: this.name,
        area: ANARCHY.area[area],
        count: targets.length,
        max: maxTargets
      });
      ui.notifications.error(error);
      throw error;
    }
  }

  static checkActorDefenseAction(actorAction, actor, defense) {
    if (!actorAction) {
      const error = formatString(ANARCHY.common.errors.actorDoesNotHaveDefense, {
        actor: actor.name,
        defense: defense.labelkey,
        actorType: ANARCHY.actorType[actor.type]
      });
      ui.notifications.error(error);
      throw error;
    }
  }
}
