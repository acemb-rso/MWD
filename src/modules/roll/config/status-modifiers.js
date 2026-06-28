// src/modules/roll/config/status-modifiers.js
// Purpose: Canonical declarative registry for status mechanics.
// Workflow: status catalog determines availability; this map declares what an
// active status contributes; existing subsystem helpers consume typed fields.

export const STATUS_ROLES = Object.freeze({
  rollModifier: "rollModifier",
  actionGate: "actionGate",
  cqAdjustment: "cqAdjustment",
  machineState: "machineState",
  repairIssue: "repairIssue",
  resourceEffect: "resourceEffect",
  speedEffect: "speedEffect",
  visualMarker: "visualMarker",
});

export const STATUS_STACKING = Object.freeze({
  unique: "unique",
  replace: "replace",
  highest: "highest",
  sum: "sum",
});

export const MACHINE_STATE_FIELDS = Object.freeze([
  "dice",
  "cq",
  "gates",
  "targeting",
  "movement",
  "heat",
  "speed",
  "resource",
  "startTurn",
  "endTurn",
]);

const R = STATUS_ROLES;

function marker(label, notes = "") {
  return {
    label,
    roles: [R.visualMarker],
    notes,
  };
}

function roll(label, mods, extra = {}) {
  return {
    label,
    roles: [R.rollModifier],
    mods,
    ...extra,
  };
}

function machine(label, machineState, extra = {}) {
  return {
    label,
    roles: [R.machineState],
    machineState,
    ...extra,
  };
}

function repair({ remedyKey, skillKey = "", locationKey = "", effectSummary = "" } = {}) {
  return {
    repairable: true,
    remedyKey,
    actionId: remedyKey,
    skillKey,
    locationKey,
    effectSummary,
    conditionModifier: Boolean(locationKey),
    clearsStatus: true,
  };
}

export const STATUS_MAP = Object.freeze({
  prone: roll("Prone", [
    { id: "prone.roll", domains: ["physical", "combat", "movement", "movement.ground", "attack", "attack.melee", "defense"], tags: ["posture", "movement"], value: -2 },
  ]),

  blinded: roll("Blinded", [
    { id: "blinded.physical", domains: ["physical", "combat", "attack", "attack.ranged", "attack.melee", "sensor", "sensor.acquire", "sensor.targeting", "skill.perception"], tags: ["sensory", "vision"], value: -3 },
    { id: "blinded.social", domains: ["social"], tags: ["sensory", "vision"], value: -1 },
  ]),

  frightened: roll("Frightened", [
    { id: "frightened.roll", domains: ["mental", "social", "combat", "morale"], tags: ["mental", "morale"], value: -1 },
  ]),

  deafened: roll("Deafened", [
    { id: "deafened.roll", domains: ["social", "skill.perception", "sensor"], tags: ["sensory", "hearing"], value: -2 },
  ]),

  hidden: roll("Hidden", [
    { id: "hidden.stealth", domains: ["skill.stealth", "stealth"], tags: ["stealth"], value: 2 },
  ]),

  suppressed: {
    label: "Suppressed",
    roles: [R.actionGate, R.cqAdjustment],
    actionGates: [
      { id: "suppressed.blockAimPrepare", actionIds: ["aim", "prepare"], reason: "Suppressed actors cannot Aim or Prepare.", tags: ["suppression"] },
    ],
    clearsOnActions: [
      { id: "suppressed.clearOnMove", actionIds: ["move", "carefulMove"], statusId: "suppressed", message: "Repositioned and cleared Suppressed.", tags: ["suppression", "movement"] },
    ],
    cq: [
      { id: "suppressed.attackAr", whenBearerIs: "attacker", ar: -2, tags: ["suppression", "state"] },
      { id: "suppressed.defenseDr", whenBearerIs: "defender", dr: -2, tags: ["suppression", "state"] },
    ],
  },

  grappled: marker("Grappled", "Marker for grapple state; close-combat flow handles escalation effects."),
  restrained: marker("Restrained", "Marker for restraint state; specific effects are handled by scene/adjudication rules."),
  pinned: marker("Pinned", "Marker for stationary target state; personal attack motion reads the status directly."),

  stunned: roll("Stunned", [
    { id: "stunned.roll", domains: ["physical", "combat", "mental", "attack", "movement"], tags: ["action", "stun"], value: -3 },
  ]),

  knockedOut: marker("Knocked Out", "Visual marker only."),

  onFire: {
    label: "On Fire",
    roles: [R.rollModifier, R.machineState],
    mods: [
      { id: "onFire.physical", domains: ["physical", "combat", "attack", "movement"], tags: ["fire", "hazard"], value: -2 },
      { id: "onFire.mental", domains: ["mental"], tags: ["fire", "hazard"], value: -1 },
    ],
    machineState: {
      startTurn: [{ id: "onFire.startHeat", heat: 1, effectText: "On Fire: gain 1 Heat at the start of the turn." }],
    },
  },

  drugged: roll("Drugged", [
    { id: "drugged.physical", domains: ["physical", "mental", "combat", "attack", "movement"], tags: ["chemical", "impairment"], value: -2 },
    { id: "drugged.social", domains: ["social"], tags: ["chemical", "impairment"], value: -1 },
  ]),

  radiation: roll("Radiation", [
    { id: "radiation.roll", domains: ["physical", "mental"], tags: ["radiation", "hazard"], value: -1 },
  ]),

  overloaded: roll("Overloaded", [
    { id: "overloaded.roll", domains: ["mental", "heat", "reactor"], tags: ["heat", "reactor"], value: -2 },
  ]),

  preparedInterrupt: marker("Prepared", "Managed prepared-interrupt indicator."),
  personalCritical: marker("Personal Critical", "Managed aggregate personal critical marker."),
  battleArmorWorn: marker("Battle Armor Worn", "Managed battle armor lifecycle marker."),
  battleArmorBreached: marker("Battle Armor Breached", "Managed battle armor lifecycle marker."),
  battleArmorWrecked: marker("Battle Armor Wrecked", "Managed battle armor lifecycle marker."),
  battleArmorRevealed: marker("Battle Armor Revealed", "Battle armor visibility/targeting marker."),
  attachedToMachine: marker("Attached to Machine", "Battle armor attachment marker."),
  machineCritical: marker("Machine Critical", "Managed aggregate machine critical marker."),
  destroyed: marker("Destroyed", "Destruction marker consumed by combat/damage helpers."),

  // Winded applies Burn once through the personal critical record, including escalation.
  // The status only marks the active crit for display/remedy flow.
  windedMinor: marker("Winded I", "Visual marker only; Burn is applied once by the personal critical record."),
  windedModerate: marker("Winded II", "Visual marker only; Burn is applied once by the personal critical record."),
  windedSevere: marker("Winded III", "Visual marker only; Burn is applied once by the personal critical record."),

  concussionMinor: roll("Concussion I", [
    { id: "concussionMinor.roll", domains: ["physical", "mental", "combat", "initiative", "action"], tags: ["personalCritical", "concussion"], value: -1 },
  ]),
  concussionModerate: roll("Concussion II", [
    { id: "concussionModerate.roll", domains: ["physical", "mental", "combat", "initiative", "action"], tags: ["personalCritical", "concussion"], value: -2 },
  ]),
  concussionSevere: roll("Concussion III", [
    { id: "concussionSevere.roll", domains: ["physical", "mental", "combat", "initiative", "action"], tags: ["personalCritical", "concussion"], value: -3 },
  ]),

  // Crippled speed penalties are derived from active personal critical records.
  // The status only marks the active crit for display/remedy flow.
  crippledMinor: marker("Crippled I", "Visual marker only; speed is derived from the personal critical record."),
  crippledModerate: marker("Crippled II", "Visual marker only; speed is derived from the personal critical record."),
  crippledSevere: marker("Crippled III", "Visual marker only; speed is derived from the personal critical record."),

  hamperedMinor: {
    label: "Hampered I",
    roles: [R.actionGate],
    actionGates: [],
    notes: "Weapon unequipped state is keyed from active personal critical records.",
  },
  hamperedModerate: roll("Hampered II", [
    { id: "hamperedModerate.physical", domains: ["physical"], tags: ["personalCritical", "hampered"], value: -1 },
  ], { roles: [R.rollModifier, R.actionGate], actionGates: [], notes: "Weapon unequipped state is keyed from active personal critical records." }),
  hamperedSevere: roll("Hampered III", [
    { id: "hamperedSevere.physical", domains: ["physical"], tags: ["personalCritical", "hampered"], value: -1 },
  ], { roles: [R.rollModifier, R.actionGate], actionGates: [], notes: "Weapon unequipped and prone state are keyed from active personal critical records." }),

  offbalanceMinor: {
    label: "Off Balance I",
    roles: [R.cqAdjustment],
    cq: [
      { id: "offbalanceMinor.attackAr", whenBearerIs: "attacker", ar: -2, tags: ["personalCritical", "offbalance"] },
      { id: "offbalanceMinor.defenseDr", whenBearerIs: "defender", dr: -2, tags: ["personalCritical", "offbalance"] },
    ],
  },
  offbalanceModerate: {
    label: "Off Balance II",
    roles: [R.cqAdjustment],
    cq: [
      { id: "offbalanceModerate.attackAr", whenBearerIs: "attacker", ar: -4, tags: ["personalCritical", "offbalance"] },
      { id: "offbalanceModerate.defenseDr", whenBearerIs: "defender", dr: -4, tags: ["personalCritical", "offbalance"] },
    ],
  },
  offbalanceSevere: {
    label: "Off Balance III",
    roles: [R.cqAdjustment],
    cq: [
      { id: "offbalanceSevere.attackAr", whenBearerIs: "attacker", ar: -6, tags: ["personalCritical", "offbalance"] },
      { id: "offbalanceSevere.defenseDr", whenBearerIs: "defender", dr: -6, tags: ["personalCritical", "offbalance"] },
    ],
  },

  shakenMinor: { label: "Shaken I", roles: [R.actionGate], actionGates: [], notes: "Action gates are keyed from active personal critical records." },
  shakenModerate: { label: "Shaken II", roles: [R.actionGate], actionGates: [], notes: "Action gates are keyed from active personal critical records." },
  shakenSevere: { label: "Shaken III", roles: [R.actionGate], actionGates: [], notes: "Action gates are keyed from active personal critical records." },

  unstable: machine("Unstable", {
    dice: [{ id: "unstable.pilotingDice", selector: "pilotingDice", value: -2, tags: ["piloting", "stability"] }],
  }, { roles: [R.machineState, R.repairIssue], repair: repair({ remedyKey: "emergencyRepair", effectSummary: "Piloting and movement remain unstable until the machine is repaired." }) }),
  staggeredMechanical: machine("Staggered (Mechanical)", {
    startTurn: [{ id: "staggeredMechanical.saLoss", resource: "sa", value: 1 }],
  }),
  proneMechFall: machine("Prone", {
    movement: [{ id: "proneMechFall.movement", prone: true, noSprint: true, noJump: true, effectText: "Prone: crawl only; Close attacks are impaired and Close defense is compromised." }],
  }, { roles: [R.machineState, R.repairIssue], repair: repair({ remedyKey: "stand", effectSummary: "The machine must recover from a prone fall before normal movement resumes." }) }),
  skidding: marker("Skidding", "Forced movement/tracking marker."),
  stalled: machine("Stalled", {
    movement: [{ id: "stalled.movement", noSprint: true, noJump: true }],
    dice: [{ id: "stalled.handling", selector: "handling", value: -1 }, { id: "stalled.system", selector: "system", value: -1 }],
  }, { roles: [R.machineState, R.repairIssue], repair: repair({ remedyKey: "emergencyRepair", effectSummary: "The machine cannot move normally until the fault is repaired." }) }),
  limping: machine("Limping", {
    movement: [{ id: "limping.movement", movementPenaltySteps: 1, pilotingDn: 1 }],
  }, { roles: [R.machineState, R.repairIssue], repair: repair({ remedyKey: "emergencyRepair", locationKey: "legs", effectSummary: "Mobility remains impaired until the damaged leg assembly is repaired." }) }),
  jumpJetFailure: machine("Jump Jet Failure", {
    movement: [{ id: "jumpJetFailure.noJump", noJump: true }],
  }, { roles: [R.machineState, R.repairIssue], repair: repair({ remedyKey: "emergencyRepair", locationKey: "legs", effectSummary: "Jump movement is unavailable until the jump system is repaired." }) }),
  actuatorFailure: machine("Actuator Failure", {
    dice: [{ id: "actuatorFailure.handling", selector: "handling", value: -1 }],
  }),
  gyroDamage: machine("Gyro Damage", {
    movement: [{ id: "gyroDamage.pilotingDn", pilotingDn: 1 }],
  }),

  weaponFailure: marker("Weapon Failure", "Weapon/location scoped machine damage marker."),
  jammedBallistic: marker("Jammed (Ballistic)", "Ballistic weapon clear-action marker."),
  armDestroyed: marker("Arm Destroyed", "BattleMech arm destruction marker."),

  sensorDegraded: machine("Sensor Degraded", {
    dice: [{ id: "sensorDegraded.acquire", selector: "acquireDice", value: -2, tags: ["sensor", "acquire"], effectText: "Sensor Degraded: -2 dice to Acquire Target." }],
  }, { roles: [R.machineState, R.repairIssue], repair: repair({ remedyKey: "systemReset", skillKey: "computers", locationKey: "head", effectSummary: "Sensor sweeps and targeting suffer degraded optics and processing until reset." }) }),
  sensorBlind: machine("Sensor Blind", {
    targeting: [{ id: "sensorBlind.targeting", rangeCapClose: true, noTargetingDataGeneration: true, noTargetingDataUse: true, effectText: "Sensor Blind: no Targeting Data and attacks beyond Close are blocked." }],
  }, { roles: [R.machineState, R.repairIssue], repair: repair({ remedyKey: "systemReset", skillKey: "computers", locationKey: "head", effectSummary: "Sensor and targeting actions are severely impaired until reset." }) }),
  ecmJamming: machine("ECM Jamming", {
    targeting: [{ id: "ecmJamming.targetingData", targetingDataValueDelta: -2 }],
  }),
  ecmShrouded: marker("ECM Shrouded", "ECM defense marker; dedicated EW helpers handle context-specific effects."),
  epmBoosted: machine("EPM Boosted", {
    dice: [{ id: "epmBoosted.ecmSpikeDefense", selector: "ecmSpikeDefenseDice", value: 2, effectText: "EPM Boosted: -2 dice against incoming ECM Spike attempts." }],
  }),
  eccmBoosted: machine("EPM Boosted (Legacy)", {
    mechanicId: "epmBoosted",
    dice: [{ id: "eccmBoosted.ecmSpikeDefense", selector: "ecmSpikeDefenseDice", value: 2, effectText: "EPM Boosted: -2 dice against incoming ECM Spike attempts." }],
  }),
  sensorLocked: marker("Sensor Locked", "Sensor targeting marker."),
  trackingLost: machine("Tracking Lost", {
    targeting: [{ id: "trackingLost.noUse", noTargetingDataUse: true, effectText: "Tracking Lost: stored Targeting Data is unusable." }],
  }),
  signatureRevealed: marker("Signature Revealed", "Stealth signature marker."),
  stealthActive: marker("Stealth Active", "Stealth lifecycle marker."),
  highEmission: marker("High Emission", "Stealth/emission marker consumed by stealth helpers."),

  reactorInstability: machine("Reactor Instability", {
    heat: [{ id: "reactorInstability.energy", energyAttackHeat: 1, energyAttackDamage: -1 }],
  }, { roles: [R.machineState, R.repairIssue], repair: repair({ remedyKey: "coolantDump", locationKey: "torso", effectSummary: "The reactor remains unstable until coolant routing is restored." }) }),
  shutdown: machine("Shutdown", {
    gates: [{ id: "shutdown.cannotAct", cannotAct: true }],
    targeting: [{ id: "shutdown.targeting", rangeCapClose: true, noTargetingDataGeneration: true, noTargetingDataUse: true, effectText: "Shutdown: the machine cannot act until it is power-cycled." }],
  }),
  overheating: machine("Thermal Surge", {
    startTurn: [{ id: "overheating.startHeat", heat: 2 }],
  }, { roles: [R.machineState, R.repairIssue], repair: repair({ remedyKey: "coolantDump", locationKey: "torso", effectSummary: "Heat continues to spike until the cooling issue is cleared." }) }),
  coolingFailure: machine("Cooling Failure", {
    heat: [{ id: "coolingFailure.cooling", coolingImpaired: true, effectText: "Cooling Failure: heat dissipation reduced by 2." }],
  }),
  reactorBreach: marker("Reactor Breach", "Catastrophic reactor risk marker."),

  legDestroyed: marker("Leg Destroyed", "BattleMech leg destruction marker."),
  exposed: machine("Exposed", {
    cq: [{ id: "exposed.defenseDr", whenBearerIs: "defender", dr: -2 }],
  }),
  entrenchedHullDown: machine("Entrenched / Hull Down", {
    cq: [{ id: "entrenchedHullDown.defenseDr", whenBearerIs: "defender", dr: { vehicle: 7, battlemech: 5 }, effectText: "Hull Down: vehicle gains a strong prepared-position defense bonus." }],
  }),
  obscured: marker("Obscured (Smoke/Dust)", "Visibility marker."),
  obscuredLight: marker("Obscured (Light)", "Visibility marker."),
  obscuredHeavy: marker("Obscured (Heavy)", "Visibility marker."),

  evasiveWeave: machine("Evasive", {
    cq: [
      { id: "evasiveWeave.attackAr", whenBearerIs: "attacker", ar: -2 },
      { id: "evasiveWeave.defenseDr", whenBearerIs: "defender", dr: 3 },
    ],
  }),
  shielded: machine("Shielded", {
    cq: [
      { id: "shielded.attackAr", whenBearerIs: "attacker", ar: -1 },
      { id: "shielded.defenseDr", whenBearerIs: "defender", dr: 4 },
    ],
  }),
  braced: machine("Braced", {
    cq: [{ id: "braced.attackAr", whenBearerIs: "attacker", ar: 1 }],
  }),
  overextended: marker("Overextended", "Tactical marker."),
  targetFocused: machine("Target Focused", {
    cq: [{ id: "targetFocused.defenseDr", whenBearerIs: "defender", dr: -2 }],
    targeting: [{ id: "targetFocused.state", targetFocused: true }],
  }),
  suppressedMechanical: machine("Suppressed", {
    cq: [
      { id: "suppressedMechanical.attackAr", whenBearerIs: "attacker", ar: -4 },
      { id: "suppressedMechanical.defenseDr", whenBearerIs: "defender", dr: -4 },
    ],
    targeting: [{ id: "suppressedMechanical.noGenerate", noTargetingDataGeneration: true }],
  }),
  tagged: marker("TAGed", "Target designation marker."),
  narced: marker("NARCed", "Target beacon marker."),
  spotted: marker("Spotted", "Indirect-fire designation (visual only; validity is token-scoped metadata)."),
});
