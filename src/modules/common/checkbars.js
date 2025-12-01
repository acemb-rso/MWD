import { ErrorManager } from "../error-manager.js";
import { ANARCHY } from "../config.js";
import { AnarchyUsers } from "../users.js";
import { Icons } from "../icons.js";
import { TEMPLATE } from "../constants.js";

const MONITORS = ANARCHY.actor.monitors;
const COUNTERS = ANARCHY.actor.counters;

export const DEFAULT_CHECKBARS = {
  armor: {
    path: 'system.monitors.armor.value',
    monitor: it => it.system.monitors.armor,
    iconChecked: Icons.fontAwesome('fas fa-shield-slash'),
    iconUnchecked: Icons.fontAwesome('fas fa-shield-alt'),
    iconHit: Icons.fontAwesome('fas fa-bahai'),
    resource: MONITORS.armor,
  },
  fatigue: {
    path: 'system.monitors.fatigue.value',
    monitor: it => it.system.monitors.fatigue,
    iconChecked: Icons.fontAwesome('fas fa-grimace'),
    iconUnchecked: Icons.fontAwesome('far fa-smile'),
    iconHit: Icons.fontAwesome('fas fa-bahai'),
    resource: MONITORS.fatigue,
    overflow: actor => TEMPLATE.monitors.physical,
    useArmor: true
  },
  physical: {
    path: 'system.monitors.physical.value',
    monitor: it => it.system.monitors.physical,
    iconChecked: Icons.fontAwesome('fas fa-heartbeat'),
    iconUnchecked: Icons.fontAwesome('far fa-heart'),
    iconHit: Icons.fontAwesome('fas fa-bahai'),
    resource: MONITORS.physical,
    useArmor: true
  },
  structure: {
    path: 'system.monitors.structure.value',
    monitor: it => it.system.monitors.structure,
    iconChecked: Icons.fontAwesome('fas fa-car-crash'),
    iconUnchecked: Icons.fontAwesome('fas fa-car-alt'),
    iconHit: Icons.fontAwesome('fas fa-bahai'),
    resource: MONITORS.structure
  },
  heat: {
    path: 'system.monitors.heat.value',
    monitor: it => it.system.monitors.heat,
    iconChecked: Icons.fontAwesome('fas fa-fire'),
    iconUnchecked: Icons.fontAwesome('far fa-sun'),
    iconHit: Icons.fontAwesome('fas fa-temperature-high'),
    resource: MONITORS.heat
  },
  criticals: {
    path: 'system.hybrid.criticals.value',
    monitor: it => it.system.hybrid?.criticals ?? { value: 0, max: 0 },
    iconChecked: Icons.fontAwesome('fas fa-bolt'),
    iconUnchecked: Icons.fontAwesome('far fa-dot-circle'),
    iconHit: Icons.fontAwesome('fas fa-exclamation-triangle'),
    resource: MONITORS.structure
  },
  anarchy: {
    path: 'system.counters.anarchy.value',
    monitor: it => {
      return {
        value: it.system.counters.anarchy.value,
        max: 6
      };
    },
    iconChecked: Icons.iconSystemPath('anarchy-point.webp', 'checkbar-img'),
    iconUnchecked: Icons.iconSystemPath('anarchy-point-off.webp', 'checkbar-img'),
    resource: COUNTERS.anarchy
  },
  plot: {
    path: 'system.counters.anarchy.value',
    monitor: it => {
      const value = it.system.counters.anarchy.value;
      return { value: value, max: value + 1 };
    },
    iconChecked: Icons.iconSystemPath('danger-point.webp', 'checkbar-img'),
    iconUnchecked: Icons.iconSystemPath('danger-point-off.webp', 'checkbar-img'),
    resource: COUNTERS.anarchy
  },
  sceneAnarchy: {
    path: 'system.counters.edgePools.chaos.value',
    monitor: it => {
      const value = it.getEdgePoolValue(TEMPLATE.counters.edgePools.chaos);
      const max = it.getAttributeValue(TEMPLATE.attributes.edge);
      return { value: value, max: max };
    },
    iconChecked: Icons.iconPath('systems/mwd/icons/default/explosion.svg', 'checkbar-img'),
    iconUnchecked: Icons.iconPath('systems/mwd/icons/default/explosion.svg', 'checkbar-img'),
    resource: COUNTERS.edgePools.chaos
  },
  grit: {
    path: 'system.counters.edgePools.grit.value',
    monitor: it => {
      const value = it.getEdgePoolValue(TEMPLATE.counters.edgePools.grit);
      return { value: value, max: it.getAttributeValue(TEMPLATE.attributes.edge) };
    },
    iconChecked: Icons.iconPath('systems/mwd/icons/default/shield.svg', 'checkbar-img'),
    iconUnchecked: Icons.iconPath('systems/mwd/icons/default/shield.svg', 'checkbar-img'),
    resource: COUNTERS.edgePools.grit
  },
  insight: {
    path: 'system.counters.edgePools.insight.value',
    monitor: it => {
      const value = it.getEdgePoolValue(TEMPLATE.counters.edgePools.insight);
      return { value: value, max: it.getAttributeValue(TEMPLATE.attributes.edge) };
    },
    iconChecked: Icons.iconPath('systems/mwd/icons/default/eye.svg', 'checkbar-img'),
    iconUnchecked: Icons.iconPath('systems/mwd/icons/default/eye.svg', 'checkbar-img'),
    resource: COUNTERS.edgePools.insight
  },
  legend: {
    path: 'system.counters.edgePools.legend.value',
    monitor: it => {
      const value = it.getEdgePoolValue(TEMPLATE.counters.edgePools.legend);
      return { value: value, max: it.getAttributeValue(TEMPLATE.attributes.edge) };
    },
    iconChecked: Icons.iconPath('systems/mwd/icons/default/tower-flag.svg', 'checkbar-img'),
    iconUnchecked: Icons.iconPath('systems/mwd/icons/default/tower-flag.svg', 'checkbar-img'),
    resource: COUNTERS.edgePools.legend
  },
  credibility: {
    path: 'system.counters.edgePools.credibility.value',
    monitor: it => {
      const value = it.getEdgePoolValue(TEMPLATE.counters.edgePools.credibility);
      return { value: value, max: it.getAttributeValue(TEMPLATE.attributes.edge) };
    },
    iconChecked: Icons.iconPath('systems/mwd/icons/misc/hand.svg', 'checkbar-img'),
    iconUnchecked: Icons.iconPath('systems/mwd/icons/misc/hand.svg', 'checkbar-img'),
    resource: COUNTERS.edgePools.credibility
  },
  rumor: {
    path: 'system.counters.edgePools.rumor.value',
    monitor: it => {
      const value = it.getEdgePoolValue(TEMPLATE.counters.edgePools.rumor);
      return { value: value, max: it.getAttributeValue(TEMPLATE.attributes.edge) };
    },
    iconChecked: Icons.iconPath('systems/mwd/icons/default/mystery-man.svg', 'checkbar-img'),
    iconUnchecked: Icons.iconPath('systems/mwd/icons/default/mystery-man.svg', 'checkbar-img'),
    resource: COUNTERS.edgePools.rumor
  },
}
export const CHECKBARS = foundry.utils.mergeObject(DEFAULT_CHECKBARS, {});

export class Checkbars {
  static init() {
    Handlebars.registerHelper('iconCheckbar', Checkbars.iconCheckbar);
    Handlebars.registerHelper('iconCheckbarHit', Checkbars.iconHit);
  }

  static hackCheckbars(overrides) {
    if (overrides) {
      const newBar = foundry.utils.mergeObject(DEFAULT_CHECKBARS, {})
      foundry.utils.mergeObject(newBar, overrides, { recursive: true });
      foundry.utils.mergeObject(CHECKBARS, newBar, { overwrite: true })
    }
  }

  static iconCheckbar(monitor, checked) {
    return checked ? Checkbars.iconChecked(monitor) : Checkbars.iconUnchecked(monitor)
  }

  static iconChecked(monitor) {
    return CHECKBARS[monitor]?.iconChecked;
  }

  static iconUnchecked(monitor) {
    return CHECKBARS[monitor]?.iconUnchecked;
  }

  static iconHit(monitor) {
    return CHECKBARS[monitor]?.iconHit ?? CHECKBARS[monitor]?.iconChecked;
  }

  static useArmor(monitor) {
    return CHECKBARS[monitor]?.useArmor;
  }

  static max(target, monitor) {
    const it = CHECKBARS[monitor]?.monitor(target);
    return (it?.max ?? 0) + (it?.maxBonus ?? 0);
  }

  static value(target, monitor) {
    const it = CHECKBARS[monitor]?.monitor(target);
    return (it?.value ?? 0);
  }

  static resistance(target, monitor) {
    const it = CHECKBARS[monitor]?.monitor(target);
    return (it?.resistance ?? 0) + (it?.resistanceBonus ?? 0);
  }

  static newValue(index, checked) {
    return index + (checked ? 0 : 1);
  }

  static async switchMonitorCheck(target, monitor, index, checked, sourceActorId = undefined, item = undefined) {
    await Checkbars.setCounter(target, monitor, Checkbars.newValue(index, checked), sourceActorId, item)
  }


  static async addCounter(target, monitor, value, sourceActorId = undefined) {
    if (value != 0) {
      const current = Checkbars.getCounterValue(target, monitor, sourceActorId) ?? 0;
      await Checkbars.setCounter(target, monitor, current + value, sourceActorId);
    }
  }

  static async setCounter(target, monitor, value, sourceActorId = undefined, item = undefined) {
    switch (monitor) {
      case TEMPLATE.monitors.anarchy:
        return await Checkbars.setAnarchy(target, value);
      case TEMPLATE.monitors.sceneAnarchy:
        return await Checkbars.setSceneAnarchy(target, value);
    }
    return await Checkbars.setCheckbar(target, monitor, value);
  }

  static getCounterValue(target, monitor, sourceActorId) {
    switch (monitor) {
      case TEMPLATE.monitors.anarchy:
        return Checkbars.getAnarchy(target, monitor);
    }
    return Checkbars.value(target, monitor);
  }

  static async setCheckbar(target, monitor, value) {
    if (value == Checkbars.getCounterValue(target, monitor)) {
      return;
    }
    const checkbar = CHECKBARS[monitor];
    if (checkbar.path) {
      const max = Checkbars.max(target, monitor);
      if (max <= 0) {
        return;
      }
      await Checkbars._manageOverflow(checkbar, target, monitor, value, max);
      value = Math.min(value, max);
      ErrorManager.checkOutOfRange(checkbar.resource, value, 0, max)
      await target.setCheckbarValue(checkbar.path, value)
    }
  }

  static async _manageOverflow(checkbar, target, monitor, value, max) {
    if (value > max) {
      const overflowMonitor = checkbar.overflow ? checkbar.overflow(target) : undefined
      const overflow = checkbar.recomputeOverflow ? checkbar.recomputeOverflow(value - max) : (value - max);
      if (overflowMonitor && overflow > 0) {
        Checkbars._notifyOverflow(target, monitor, overflow, overflowMonitor);
        await Checkbars.addCounter(target, overflowMonitor, overflow);
      }
    }
  }

  static _notifyOverflow(target, monitor, overflow, overflowMonitor) {
    ui.notifications.warn(game.i18n.format(ANARCHY.actor.monitors.overflow, {
      actor: target.name,
      monitor: game.i18n.format('ANARCHY.actor.monitors.' + monitor),
      overflow: overflow,
      overflowMonitor: game.i18n.format('ANARCHY.actor.monitors.' + overflowMonitor),
    }));
  }

  static async _manageFatigueOverflow(target, value, max) {
    await Checkbars.addCounter(target, TEMPLATE.monitors.physical, value - max);
  }

  static async _manageMatrixOverflow(target, value, max) {
    await Checkbars.addCounter(target, TEMPLATE.monitors.fatigue, value - max);
  }
  static async setAnarchy(target, newValue) {
    if (!target.hasOwnAnarchy()) {
      return;
    }

    if (target.hasGMAnarchy()) {
      await game.system.anarchy.gmAnarchy.setAnarchy(newValue);
      target.render();
      return;
    }

    await Checkbars._setAnarchyMonitor(target, TEMPLATE.monitors.anarchy, newValue);
  }

  static async setSceneAnarchy(target, newValue) {
    await Checkbars._setAnarchyMonitor(target, TEMPLATE.monitors.sceneAnarchy, newValue);
  }

  static async _setAnarchyMonitor(target, monitor, newValue) {
    const current = Checkbars.value(target, monitor);
    await Checkbars.setCheckbar(target, monitor, newValue);
    if (!game.user.isGM) {
      Checkbars.notifyAnarchyChange(target, monitor, current, newValue);
    }
  }

  static getAnarchy(target, monitor) {
    if (!game.user.isGM && (!target.hasOwnAnarchy() || target.hasGMAnarchy())) {
      return 0; // undisclosed
    }
    if (monitor == COUNTERS.anarchy) {
      if (!target.hasOwnAnarchy()) {
        return 0;
      }

      if (target.hasGMAnarchy()) {
        return 0;
      }
    }
    return Checkbars.value(target, monitor);
  }

  static notifyAnarchyChange(target, monitor, current, newValue) {
    AnarchyUsers.blindMessageToGM({
      from: game.user.id,
      content: game.i18n.format(ANARCHY.gmManager.playerChangedAnarchy,
        {
          user: game.user.name,
          actor: target.name,
          monitor: game.i18n.localize(ANARCHY.actor.counters[monitor]),
          from: current,
          to: newValue
        })
    });
  }
}
