// src/modules/roll/config/status-modifiers.js
// Purpose: Provides module-level utilities or helpers.
// How it fits: Describes role within src/modules or template rendering pipeline.


// modules/roll/config/status-modifiers.js

export const STATUS_MAP = {
  prone: {
    label: "Prone",
    mods: [
      { domains: ["physical", "combat", "movement", "movement.ground", "attack", "attack.melee", "defense"], value: -2 }
    ]
  },

  blinded: {
    label: "Blinded",
    mods: [
      { domains: ["physical", "combat", "attack", "attack.ranged", "attack.melee", "sensor", "sensor.acquire", "sensor.targeting", "skill.perception"], value: -3 },
      { domains: ["social"], value: -1 }
    ]
  },

  frightened: {
    label: "Frightened",
    mods: [
      { domains: ["mental", "social", "combat", "morale"], value: -1 }
    ]
  },

  deafened: {
    label: "Deafened",
    mods: [
      { domains: ["social", "skill.perception", "sensor"], value: -2 }
    ]
  },

  hidden: {
    label: "Hidden",
    mods: [
      { domains: ["skill.stealth", "stealth"], value: 2 }
    ]
  },

  suppressed: {
    label: "Suppressed",
    mods: [
      { domains: ["combat", "attack", "attack.ranged", "attack.melee"], value: -2 }
    ]
  },

  grappled: {
    label: "Grappled",
    mods: [
      { domains: ["physical", "movement", "movement.ground", "attack.melee"], value: -2 },
      { domains: ["combat", "attack"], value: -1 }
    ]
  },

  stunned: {
    label: "Stunned",
    mods: [
      { domains: ["physical", "combat", "mental", "attack", "movement"], value: -3 }
    ]
  },

  onFire: {
    label: "On Fire",
    mods: [
      { domains: ["physical", "combat", "attack", "movement"], value: -2 },
      { domains: ["mental"], value: -1 }
    ]
  },

  drugged: {
    label: "Drugged",
    mods: [
      { domains: ["physical", "mental", "combat", "attack", "movement"], value: -2 },
      { domains: ["social"], value: -1 }
    ]
  },

  radiation: {
    label: "Radiation",
    mods: [
      { domains: ["physical", "mental"], value: -1 }
    ]
  },

  overloaded: {
    label: "Overloaded",
    mods: [
      { domains: ["mental", "heat", "reactor"], value: -2 }
    ]
  }
};
