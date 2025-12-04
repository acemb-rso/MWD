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
  stun: {
    path: 'system.monitors.stun.value',
    monitor: it => it.system.monitors.stun,
    iconChecked: Icons.fontAwesome('fas fa-grimace'),
    iconUnchecked: Icons.fontAwesome('far fa-smile'),
    iconHit: Icons.fontAwesome('fas fa-bahai'),
    resource: MONITORS.stun,
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
  matrix: {
    path: 'system.monitors.matrix.value',
    monitor: it => it.getMatrixMonitor(),
    iconChecked: Icons.fontAwesome('fas fa-laptop-medical'),
    iconUnchecked: Icons.fontAwesome('fas fa-laptop'),
    iconHit: Icons.fontAwesome('fas fa-laptop-code'),
    overflow: actor => actor.getMatrixOverflow(),
    recomputeOverflow: value => 3,
    resource: MONITORS.matrix
  },
  marks: {
    path: undefined,
    monitor: it => { return { value: 0, max: 5 } },
    iconChecked: Icons.fontAwesome('fas fa-bookmark'),
    iconUnchecked: Icons.fontAwesome('far fa-bookmark'),
    iconHit: Icons.fontAwesome('fas fa-fingerprint'),
    resource: MONITORS.marks
  },
  convergence: {
    path: undefined,
    monitor: it => { return { value: 0, max: 5 } },
    iconChecked: Icons.fontAwesome('far fa-eye'),
    iconUnchecked: Icons.fontAwesome('fas fa-eye-slash'),
    iconHit: Icons.fontAwesome('fas fa-eye'),
    resource: MONITORS.convergence
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
    path: 'system.counters.sceneAnarchy.value',
    monitor: it => {
      const value = it.system.counters.sceneAnarchy.value;
      return { value: value, max: 3 };
    },
    iconChecked: Icons.iconSystemPath('anarchy-point-scene.webp', 'checkbar-img'),
    iconUnchecked: Icons.iconSystemPath('anarchy-point-off.webp', 'checkbar-img'),
    resource: COUNTERS.sceneAnarchy
  },
  edge: {
    path: 'system.counters.edge.value',
    monitor: it => {
      return {
        value: it.system.counters.edge.value,
        max: it.getAttributeValue(TEMPLATE.attributes.edge)
      };
    },
    iconChecked: Icons.fontAwesome('fas fa-star'),
    iconUnchecked: Icons.fontAwesome('far fa-star'),
    resource: COUNTERS.edge
  },
  credibility: {
    path: 'system.counters.social.credibility.value',
    monitor: it => {
      return {
        value: it.system.counters.social.credibility.value,
        max: it.system.counters.social.credibility.max
      };
    },
    iconChecked: Icons.fontAwesome('fas fa-handshake'),
    iconUnchecked: Icons.fontAwesome('far fa-handshake'),
    resource: COUNTERS.social.credibility
  },
  rumor: {
    path: 'system.counters.social.rumor.value',
    monitor: it => {
      return {
        value: it.system.counters.social.rumor.value,
        max: it.system.counters.social.rumor.max
      };
    },
    iconChecked: Icons.fontAwesome('fas fa-grimace'),
    iconUnchecked: Icons.fontAwesome('far fa-grimace'),
    resource: COUNTERS.social.rumor
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
      case TEMPLATE.monitors.marks:
        return await Checkbars.setActorMarks(target, value, sourceActorId, item);
      case TEMPLATE.monitors.matrix:
        ErrorManager.checkMatrixMonitor(target)
        return await Checkbars.setCheckbar(target, monitor, value, item);
      case TEMPLATE.monitors.convergence:
        return await Checkbars.setActorConvergence(target, value);
      case TEMPLATE.monitors.anarchy:
        return await Checkbars.setAnarchy(target, value);
      case TEMPLATE.monitors.sceneAnarchy:
        return await Checkbars.setSceneAnarchy(target, value);
    }
    return await Checkbars.setCheckbar(target, monitor, value);
  }

  static getCounterValue(target, monitor, sourceActorId) {
    switch (monitor) {
      case TEMPLATE.monitors.marks:
        return Checkbars.getActorMarks(target, sourceActorId);
      case TEMPLATE.monitors.convergence:
        return Checkbars.getActorConvergence(target);
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

  static async _manageStunOverflow(target, value, max) {
    await Checkbars.addCounter(target, TEMPLATE.monitors.physical, value - max);
  }

  static async _manageMatrixOverflow(target, value, max) {
    await Checkbars.addCounter(target, TEMPLATE.monitors.stun, value - max);
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

  static getActorMarks(target, sourceActorId) {
    return Checkbars._findActorMarks(target.getMatrixMarks(), sourceActorId)?.marks ?? 0;
  }

  static async addActorMark(target, sourceActorId, item = undefined) {
    const previous = Checkbars._findActorMarks(target.getMatrixMarks(), sourceActorId);
    Checkbars.setActorMarks(target, (previous.marks ?? 0) + 1, sourceActorId, item);
  }

  static async setActorMarks(target, value, sourceActorId, item = undefined) {
    if (target.canReceiveMarks()) {
      let marks = deepClone(target.getMatrixMarks())
      ErrorManager.checkOutOfRange(CHECKBARS.marks.resource, value, 0, Checkbars.max(target, 'marks'))
      const sourceActorMarks = Checkbars._findActorMarks(marks, sourceActorId)
      if (sourceActorMarks.marks == undefined) {
        marks.push(sourceActorMarks)
      }
      sourceActorMarks.marks = Math.max(0, value);
      marks = marks.filter(target => target.marks > 0);
      await target.setCheckbarValue('system.monitors.matrix.marks', marks)
    }
  }

  static _findActorMarks(marks, sourceActorId) {
    return marks.find(source => source.actorId == sourceActorId) ?? { actorId: sourceActorId };
  }

  static getActorConvergence(target) {
    game.system.anarchy.gmConvergence.getConvergence(target);
  }

  static async setActorConvergence(target, value) {
    await game.system.anarchy.gmConvergence.setConvergence(target, value);
  }
}
