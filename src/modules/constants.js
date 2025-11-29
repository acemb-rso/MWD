/**
 * The constants file contains things that do not change
 *
 * Constants are written in ALL_CAPS_CONSTANTS and should never be changed during runtime.
 */
export const SYSTEM_NAME = 'anarchy';
export const SYSTEM_DESCRIPTION = "Anarchy";
export const SYSTEM_SOCKET = `system.${SYSTEM_NAME}`;
export const SYSTEM_SCOPE = SYSTEM_NAME;
export const SYSTEM_PATH = `systems/${SYSTEM_NAME}`;
export const STYLE_PATH = `${SYSTEM_PATH}/style`;
export const TEMPLATES_PATH = `systems/${SYSTEM_NAME}/templates`;
export const ICONS_PATH = `${SYSTEM_PATH}/icons`;
export const ICONS_SKILLS_PATH = `${ICONS_PATH}/skills`;
export const LOG_HEAD = 'Anarchy | ';

export const ANARCHY_DICE_BONUS = 3;
export const SPECIALIZATION_BONUS = 2;
export const PLAYER_MAX_ANARCHY = 6;

export const TARGET_SUCCESS = 5;
export const TARGET_SUCCESS_EDGE = 4;

export const BASE_MONITOR = 8;

export const TEMPLATE = {
  actorTypes: {
    character: 'character',
    vehicle: 'vehicle',
    device: 'device',
    sprite: 'sprite',
    ic: 'ic',
  },
  itemType: {
    metatype: 'metatype',
    skill: 'skill',
    quality: 'quality',
    shadowamp: 'shadowamp',
    weapon: 'weapon',
    gear: 'gear',
    cyberdeck: 'cyberdeck',
    contact: 'contact',
  },
  attributes: {
    agility: 'agility',
    strength: 'strength',
    willpower: 'willpower',
    logic: 'logic',
    charisma: 'charisma',
    edge: 'edge',
    autopilot: 'autopilot',
    handling: 'handling',
    firewall: 'firewall',
    system: 'system',
    knowledge: 'knowledge',
  },
  capacities: {
    mundane: 'mundane',
    awakened: 'awakened',
    emerged: 'emerged',
  },
  monitors: {
    stun: 'stun',
    armor: 'armor',
    physical: 'physical',
    structure: 'structure',
    matrix: 'matrix',
    marks: 'marks',
    convergence: 'convergence',
    anarchy: 'anarchy',
    plot: 'plot',
    sceneAnarchy: 'sceneAnarchy',
  },
  counters: {
    edge: 'edge',
    social: {
      celebrity: 'celebrity',
      credibility: 'credibility',
      rumor: 'rumor'
    }
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

export const ANARCHY_SYSTEM = {
  rollType: {
    attributeAction: 'attributeAction',
    defense: 'defense',
    defensePilot: 'defensePilot',
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
    lift: "lift",
    matrixDefense: "matrixDefense",
    astralDefense: "astralDefense"
  },
  defenses: {
    physicalDefense: "physicalDefense",
    physicalResistance: "physicalResistance",
    socialDefense: "socialDefense",
    matrixDefense: "matrixDefense",
    mentalResistance: "mentalResistance"
  },
  fixedDefenseCode: {
    // fix for old incorrect defense codes
    mentalDefense: "physicalResistance",
    astralDefense: "mentalResistance",
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
  TEMPLATES_PATH,
  ICONS_PATH,
  ICONS_SKILLS_PATH,
  LOG_HEAD,
  ANARCHY_DICE_BONUS,
  SPECIALIZATION_BONUS,
  PLAYER_MAX_ANARCHY,
  TARGET_SUCCESS,
  TARGET_SUCCESS_EDGE,
  BASE_MONITOR,
  TEMPLATE,
  ANARCHY_SYSTEM
}