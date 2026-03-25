// src/modules/constants.js
// Purpose: References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


/**
 * The constants file contains things that do not change
 *
 * Constants are written in ALL_CAPS_CONSTANTS and should never be changed during runtime.
 */
export const SYSTEM_NAME = 'mwd';
export const SYSTEM_DESCRIPTION = "MechWarrior: Destiny";
export const SYSTEM_SOCKET = `system.${SYSTEM_NAME}`;
export const SYSTEM_SCOPE = SYSTEM_NAME;
export const SYSTEM_PATH = `systems/${SYSTEM_NAME}`;
export const STYLE_PATH = `${SYSTEM_PATH}/style`;
export const THIRD_PARTY_STYLE_PATH = `${SYSTEM_PATH}/third-party/style`;
export const TEMPLATES_PATH = `systems/${SYSTEM_NAME}/templates`;
export const ICONS_PATH = `${SYSTEM_PATH}/img/icons`;
export const ICONS_SKILLS_PATH = `${ICONS_PATH}/skills`;
export const LOG_HEAD = 'MWD | ';

export const SPECIALIZATION_BONUS = 2;

export const TARGET_SUCCESS = 5;
export const TARGET_SUCCESS_EDGE = 4;

export const BASE_MONITOR = 8;

export const ACTOR_ATTRIBUTES = {
  reflexes: 'reflexes',
  strength: 'strength',
  willpower: 'willpower',
  intelligence: 'intelligence',
  charisma: 'charisma',
  edge: 'edge',
  handling: 'handling',
  system: 'system',
  chassis: 'chassis',
  condition: 'condition',
};

export const ITEM_ATTRIBUTES = {
  autopilot: 'autopilot',
  firewall: 'firewall',
  knowledge: 'knowledge',
};

const EDGE_POOLS = {
  grit: 'grit',
  chaos: 'chaos',
  insight: 'insight',
  rumor: 'rumor',
  legend: 'legend',
  credibility: 'credibility',
};

export const EDGE_POOL_GROUPS = {
  physical: [EDGE_POOLS.grit, EDGE_POOLS.chaos],
  mental: [EDGE_POOLS.insight, EDGE_POOLS.rumor],
  social: [EDGE_POOLS.legend, EDGE_POOLS.credibility],
};

export const EDGE_POOL_DOMAIN_BY_POOL = {
  grit: "physical",
  chaos: "physical",
  insight: "mental",
  rumor: "mental",
  legend: "social",
  credibility: "social",
};

// A canonical “id” for payloads / UI keys
export const EDGE_POOL_IDS = {
  "physical.grit": "grit",
  "physical.chaos": "chaos",
  "mental.insight": "insight",
  "mental.rumor": "rumor",
  "social.legend": "legend",
  "social.credibility": "credibility",
};

// Function to get edge pool id
export function edgePoolId(poolKey) {
  const domain = EDGE_POOL_DOMAIN_BY_POOL[poolKey];
  return domain ? `${domain}.${poolKey}` : poolKey;
}

export const TEMPLATE = {
  actorTypes: {
    character: 'character',
    npc: 'npc',
    vehicle: 'vehicle',
    battlemech: 'battlemech',
  },
  itemType: {
    skill: 'skill',
    quality: 'quality',
    assetModule: 'assetModule',
    mechWeapon: 'mechWeapon',
    personalWeapon: 'personalWeapon',
    armor: 'armor',
    gear: 'gear',
    contact: 'contact',
    lifeModule: 'lifeModule',
  },
  actorAttributes: ACTOR_ATTRIBUTES,
  itemAttributes: ITEM_ATTRIBUTES,
  attributes: { ...ACTOR_ATTRIBUTES, ...ITEM_ATTRIBUTES },
  monitors: {
    fatigue: 'fatigue',
    armor: 'armor',
    physical: 'physical',
    structure: 'structure',
    heat: 'heat',
  },
  counters: {
    xp: 'xp',
    xpTotal: 'xpTotal',
    xpUnused: 'xpUnused',
    edge: 'edge',
    edgePools: EDGE_POOLS,
    edgePoolGroups: EDGE_POOL_GROUPS,
    physical: {
      grit: EDGE_POOLS.grit,
      chaos: EDGE_POOLS.chaos,
    },
    mental: {
      insight: EDGE_POOLS.insight,
      rumor: EDGE_POOLS.rumor,
    },
    social: {
      legend: EDGE_POOLS.legend,
      credibility: EDGE_POOLS.credibility,
    },
    chaos: EDGE_POOLS.chaos
  }, 
 
  area: {
    none: 'none',
    shotgun: 'shotgun',
    circle: 'circle',
    cone: 'cone',
    rect: 'rect',
    ray: 'ray'
  }
}

 export const ROLL_DOMAINS = Object.freeze({
    physical: "physical",
    mental: "mental",
    social: "social"
  });

  export const ROLL_DOMAIN_LIST = Object.freeze(Object.values(ROLL_DOMAINS));

  export function normalizeDomains(domains) {
    if (!Array.isArray(domains)) return [];
    return domains
      .map(d => String(d).trim().toLowerCase())
      .filter(d => ROLL_DOMAIN_LIST.includes(d));
  }

  export function domainsIntersect(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    return a.some(d => b.includes(d));
  }

export const ACTOR_ATTRIBUTE_SETS = {
  [TEMPLATE.actorTypes.character]: [
    TEMPLATE.actorAttributes.strength,
    TEMPLATE.actorAttributes.reflexes,
    TEMPLATE.actorAttributes.willpower,
    TEMPLATE.actorAttributes.intelligence,
    TEMPLATE.actorAttributes.charisma,
    TEMPLATE.actorAttributes.edge,
  ],
  [TEMPLATE.actorTypes.npc]: [
    TEMPLATE.actorAttributes.strength,
    TEMPLATE.actorAttributes.reflexes,
    TEMPLATE.actorAttributes.willpower,
    TEMPLATE.actorAttributes.intelligence,
    TEMPLATE.actorAttributes.charisma,
    TEMPLATE.actorAttributes.edge,
  ],
  [TEMPLATE.actorTypes.vehicle]: [
    TEMPLATE.actorAttributes.handling,
    TEMPLATE.actorAttributes.system,
    TEMPLATE.actorAttributes.chassis,
    TEMPLATE.actorAttributes.condition,
  ],
  [TEMPLATE.actorTypes.battlemech]: [
    TEMPLATE.actorAttributes.handling,
    TEMPLATE.actorAttributes.system,
    TEMPLATE.actorAttributes.chassis,
    TEMPLATE.actorAttributes.condition,
  ],
}

export const MONITOR_DEFS = {
  character: {
    physical: {
      status: { label: "Penalty", path: "derived.penalty" },
      derived: {
        penalty: { fn: "penaltyPer3Damage", source: "value" }
      }
    },
    fatigue: {
      status: { label: "Penalty", path: "derived.penalty" },
      derived: {
        penalty: { fn: "penaltyPer3Damage", source: "value" }
      }
    },
    armor: {
      status: { label: "Resist", path: "derived.resistance" },
      derived: {
        resistance: { fn: "resistancePerQuarter", source: "armorPersonalBase" }
      }
    }
  },

  battlemech: {
    armor: {
      status: { label: "Resist", path: "derived.resistance" },
      derived: {
        resistance: { fn: "resistancePerQuarter", source: "mechArmorBase" }
      }
    },
    structure: {
      status: null
    },
    heat: {
      status: { label: "Penalty", path: "derived.penalty" },
      derived: {
        penalty: { fn: "penaltyPer3Damage", source: "value" }
      }
    }
  },

  vehicle: {
    armor: {
      status: { label: "Resist", path: "derived.resistance" },
      derived: {
        resistance: { fn: "resistancePerQuarter", source: "vehicleArmorBase" }
      }
    },
    durability: {
      status: { label: "Penalty", path: "derived.penalty" },
      derived: {
        penalty: { fn: "penaltyPer3Damage", source: "value" }
      }
    }
  }
};

/** LEGACY ANARCHY SYSTEM
 * Definitions for the Anarchy system constants
 * Remaining here for refernce
 */
export const ANARCHY_SYSTEM = {
  rollType: {
    attributeAction: 'attributeAction',
    defense: 'defense',
    attribute: 'attribute',
    skill: 'skill',
    weapon: 'weapon',
  },
  actions: {
    defense: "defense",
    resistTorture: "resistTorture",
    judgeIntentions: "judgeIntentions",
    perception: "perception",
    composure: "composure",
    memory: "memory",
    catch: "catch",
    lift: "lift"
  },
  defenses: {
    physicalDefense: "physicalDefense",
    physicalResistance: "physicalResistance",
    socialDefense: "socialDefense",
    mentalResistance: "mentalResistance"
  },
  fixedDefenseCode: {
    // fix for old incorrect defense codes
    mentalDefense: "physicalResistance",
  }
}


// export constant for JS hacks
globalThis.ANARCHY_CONSTANTS = {
  SYSTEM_NAME,
  SYSTEM_DESCRIPTION,
  SYSTEM_SOCKET,
  SYSTEM_SCOPE,
  SYSTEM_PATH,
  STYLE_PATH,
  THIRD_PARTY_STYLE_PATH,
  TEMPLATES_PATH,
  ICONS_PATH,
  ICONS_SKILLS_PATH,
  LOG_HEAD,
  SPECIALIZATION_BONUS,
  TARGET_SUCCESS,
  TARGET_SUCCESS_EDGE,
  BASE_MONITOR,
  ACTOR_ATTRIBUTES,
  ITEM_ATTRIBUTES,
  EDGE_POOL_GROUPS,
  TEMPLATE,
  ANARCHY_SYSTEM
}
