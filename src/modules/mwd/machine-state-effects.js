// src/modules/mwd/machine-state-effects.js
// Purpose: Canonical machine status and degradation mechanics aligned to the
//          MWD state/degrade docs.
// How it fits: Centralizes machine-state rule expression so the roll engine,
//              EW helpers, heat, and sheets share one authority.

import { TEMPLATE } from "../constants.js";
import { getActiveMachineCrits } from "./critical-hits.js";
import {
  getConfiguredMachineWeaponGroups,
  getMachineWeaponsForGroup,
  isEnergyMachineWeapon,
  normalizeMachineCritId,
  normalizeMachineMountLocationFamily,
} from "./machine-crit-consequences.js";

const CONTACT_CAP_RANKS = Object.freeze({
  contact: 1,
  track: 2,
  lock: 3,
});

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function getActorType(actor = null) {
  return actor?.type === TEMPLATE.actorTypes.battlemech ? TEMPLATE.actorTypes.battlemech : TEMPLATE.actorTypes.vehicle;
}

function hasStatus(actor = null, statusId = "") {
  return actor?.statuses?.has?.(statusId) ?? false;
}

function startCase(value = "") {
  return String(value ?? "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase());
}

function setContactCap(currentCap = "lock", nextCap = "lock") {
  const currentRank = CONTACT_CAP_RANKS[currentCap] ?? CONTACT_CAP_RANKS.lock;
  const nextRank = CONTACT_CAP_RANKS[nextCap] ?? CONTACT_CAP_RANKS.lock;
  return nextRank < currentRank ? nextCap : currentCap;
}

function getLocationState(actor = null, locationKey = "") {
  return actor?.system?.mwd?.locations?.[locationKey] ?? {};
}

function getCondition(location = {}) {
  return Math.max(0, Math.trunc(toNumber(location?.condition, 0)));
}

function getAttackScope(actor = null, { weaponGroupId = "", weaponId = "", weapon = null, rangeBand = "" } = {}) {
  const normalizedGroupId = normalizeMachineCritId(weaponGroupId);
  const normalizedWeaponId = normalizeMachineCritId(weaponId);
  const groups = getConfiguredMachineWeaponGroups(actor);
  const directGroup = groups.find(group => normalizeMachineCritId(group?.id) === normalizedGroupId) ?? null;
  const resolvedWeapon = weapon ?? (normalizedWeaponId ? actor?.items?.get?.(normalizedWeaponId) ?? null : null);
  const derivedGroup = directGroup ?? groups.find(group =>
    (Array.isArray(group?.weaponIds) ? group.weaponIds : []).some(id => normalizeMachineCritId(id) === normalizedWeaponId)
  ) ?? null;
  const weapons = derivedGroup
    ? getMachineWeaponsForGroup(actor, derivedGroup)
    : (resolvedWeapon ? [resolvedWeapon] : []);
  const families = new Set(weapons.map(entry => normalizeMachineMountLocationFamily(entry?.system?.mountLocation)).filter(Boolean));

  return {
    weaponGroupId: normalizeMachineCritId(derivedGroup?.id),
    weapons,
    families,
    isArmMounted: families.has("arms"),
    isTurretMounted: families.has("turret"),
    hasEnergy: weapons.some(isEnergyMachineWeapon),
    rangeBand: String(rangeBand ?? "").trim().toLowerCase(),
  };
}

function pushEffect(state, text = "") {
  const value = String(text ?? "").trim();
  if (!value) return;
  if (!state.effectTexts.includes(value)) state.effectTexts.push(value);
}

function applyMachineCritDerivedState(state, actor = null) {
  for (const crit of getActiveMachineCrits(actor)) {
    const statusId = String(crit?.statusId ?? "").trim();
    if (statusId === "unstable") {
      state.pilotingDice += -2;
      pushEffect(state, "Unstable: -2 dice to Piloting; movement risks a fall.");
    } else if (statusId === "staggeredMechanical") {
      state.startTurnSaLoss += 1;
    } else if (statusId === "overheating") {
      state.startTurnHeat += 2;
    } else if (statusId === "reactorInstability") {
      state.energyAttackHeat += 1;
      state.energyAttackDamage += -1;
    } else if (statusId === "stalled") {
      state.handling += -1;
      state.system += -1;
      state.noSprint = true;
      state.noJump = true;
    } else if (statusId === "limping") {
      state.movementPenalty += 1;
      state.pilotingDn += 1;
    } else if (statusId === "jumpJetFailure") {
      state.noJump = true;
    }
  }
}

function applyExplicitStatuses(state, actor = null) {
  if (hasStatus(actor, "sensorDegraded")) {
    state.acquireDice += -2;
    pushEffect(state, "Sensor Degraded: -2 dice to Acquire Target.");
  }
  if (hasStatus(actor, "sensorBlind")) {
    state.rangeCapClose = true;
    state.noTargetingDataGeneration = true;
    state.noTargetingDataUse = true;
    pushEffect(state, "Sensor Blind: no Targeting Data and attacks beyond Close are blocked.");
  }
  if (hasStatus(actor, "trackingLost")) {
    state.noTargetingDataUse = true;
    pushEffect(state, "Tracking Lost: stored Targeting Data is unusable.");
  }
  if (hasStatus(actor, "epmBoosted") || hasStatus(actor, "eccmBoosted")) {
    state.ecmSpikeDefenseDice += 2;
    pushEffect(state, "EPM Boosted: -2 dice against incoming ECM Spike attempts.");
  }
  if (hasStatus(actor, "coolingFailure")) {
    state.coolingImpaired = true;
    pushEffect(state, "Cooling Failure: heat dissipation reduced by 2.");
  }
  if (hasStatus(actor, "shutdown")) {
    state.cannotAct = true;
    pushEffect(state, "Shutdown: the machine cannot act until it is power-cycled.");
  }
  if (hasStatus(actor, "proneMechFall")) {
    state.prone = true;
    state.noSprint = true;
    state.noJump = true;
    pushEffect(state, "Prone: crawl only; Close attacks are impaired and Close defense is compromised.");
  }
  if (hasStatus(actor, "onFire")) {
    state.startTurnHeat += 1;
    pushEffect(state, "On Fire: gain 1 Heat at the start of the turn.");
  }
  if (hasStatus(actor, "actuatorFailure")) {
    state.handling += -1;
  }
  if (hasStatus(actor, "gyroDamage")) {
    state.pilotingDn += 1;
  }
  if (hasStatus(actor, "suppressedMechanical")) {
    state.attackAr += -2;
    state.noTargetingDataGeneration = true;
  }
  if (hasStatus(actor, "evasiveWeave")) {
    state.attackAr += -2;
    state.defenseDr += 2;
  }
  if (hasStatus(actor, "braced")) {
    state.attackAr += 1;
  }
  if (hasStatus(actor, "targetFocused")) {
    state.defenseDr += -2;
    state.targetFocused = true;
  }
  if (hasStatus(actor, "entrenchedHullDown")) {
    state.defenseDr += 5;
  }
  if (hasStatus(actor, "exposed")) {
    state.defenseDr += -2;
  }
}

function applyBattlemechDegradation(state, actor = null) {
  const head = getLocationState(actor, "head");
  const torso = getLocationState(actor, "torso");
  const arms = getLocationState(actor, "arms");
  const legs = getLocationState(actor, "legs");

  const headCondition = getCondition(head);
  if (headCondition >= 1) {
    state.trackingPenaltyAsTarget += 1;
    pushEffect(state, "Head impaired: attackers gain +1 tracking penalty bonus against this machine.");
  }
  if (headCondition >= 2) {
    state.contactStateCap = setContactCap(state.contactStateCap, "track");
    pushEffect(state, "Head damaged: contact state against this machine is capped at Track.");
  }
  if (headCondition >= 3) {
    state.noSensorActions = true;
    pushEffect(state, "Head crippled: no sensor or ECM actions.");
  }
  if (headCondition >= 4) {
    state.contactStateCap = setContactCap(state.contactStateCap, "contact");
    pushEffect(state, "Head disabled: contact state against this machine is capped at Contact.");
  }

  const torsoCondition = getCondition(torso);
  if (torsoCondition >= 1) {
    state.generalAttackDice += -1;
    pushEffect(state, "Torso impaired: -1 die on attacks.");
  }
  if (torsoCondition >= 2) {
    state.attackHeat += 1;
    pushEffect(state, "Torso damaged: attacks generate +1 Heat.");
  }
  if (torsoCondition >= 3) {
    state.pilotingDn += 1;
    pushEffect(state, "Torso crippled: Gyro Damage (+1 Piloting DN).");
  }
  if (torsoCondition >= 4) {
    state.reactorBreach = true;
    pushEffect(state, "Torso disabled: Reactor Breach risk is active.");
  }

  const armsCondition = getCondition(arms);
  if (armsCondition >= 1) state.armAttackDice += -1;
  if (armsCondition >= 2) state.armAttackDice += -1;
  if (armsCondition >= 3) state.armAttackDice += -1;
  if (armsCondition >= 4) {
    state.armMountedOffline = true;
    pushEffect(state, "Arms disabled: all arm-mounted weapon groups are offline.");
  }
  if (armsCondition > 0) {
    pushEffect(state, `Arms ${startCase(["", "impaired", "damaged", "crippled", "disabled"][Math.min(armsCondition, 4)])}: arm-mounted attacks are degraded.`);
  }

  const legsCondition = getCondition(legs);
  if (legsCondition >= 1) {
    state.movementPenalty += 1;
    pushEffect(state, "Legs impaired: -1 movement.");
  }
  if (legsCondition >= 2) {
    state.noSprint = true;
    pushEffect(state, "Legs damaged: cannot Sprint.");
  }
  if (legsCondition >= 3) {
    state.handling += -1;
    state.noSprint = true;
    pushEffect(state, "Legs crippled: Actuator Failure (-1 Handling).");
  }
  if (legsCondition >= 4) {
    state.immobile = true;
    pushEffect(state, "Legs disabled: immobile.");
  }
  if (legs?.destroyed) {
    state.immobile = true;
    state.forcedProne = true;
    pushEffect(state, "Legs destroyed: prone and immobilized.");
  }
  if (arms?.destroyed) pushEffect(state, "Arms destroyed: arm-mounted weapon groups are destroyed.");
  if (head?.destroyed) pushEffect(state, "Head destroyed: pilot survival is unlikely.");
  if (torso?.destroyed) pushEffect(state, "Torso destroyed: reactor detonation is imminent.");
}

function applyVehicleDegradation(state, actor = null) {
  const body = getLocationState(actor, "front");
  const turret = getLocationState(actor, "turret");
  const mobility = getLocationState(actor, "rear");
  const core = getLocationState(actor, "core");

  const bodyCondition = Math.max(
    getCondition(body),
    getCondition(getLocationState(actor, "side")),
    getCondition(getLocationState(actor, "rear")),
    getCondition(core),
  );
  if (bodyCondition >= 1) {
    state.system += -1;
    state.reliability += -1;
    pushEffect(state, "Body impaired: -1 System and -1 Reliability.");
  }
  if (bodyCondition >= 2) {
    state.attackHeat += 1;
    pushEffect(state, "Body damaged: attacks generate +1 Heat.");
  }
  if (bodyCondition >= 3) {
    state.system += -2;
    state.handling += -2;
    pushEffect(state, "Body crippled: -2 System and -2 Handling.");
  }
  if (bodyCondition >= 4) {
    state.cannotAct = true;
    pushEffect(state, "Body disabled: the vehicle is disabled.");
  }

  const turretCondition = getCondition(turret);
  if (turretCondition >= 1) state.turretAttackDice += -1;
  if (turretCondition >= 2) state.turretAttackDice += -1;
  if (turretCondition >= 3) {
    state.trackingPenaltyAsTarget += 2;
    pushEffect(state, "Turret crippled: +2 tracking penalty against the vehicle.");
  }
  if (turretCondition >= 4) {
    state.turretOffline = true;
    pushEffect(state, "Turret disabled: turret weapons are offline.");
  }

  const mobilityCondition = Math.max(
    getCondition(mobility),
    getCondition(getLocationState(actor, "rotor")),
  );
  if (mobilityCondition >= 1) state.movementPenalty += 1;
  if (mobilityCondition >= 2) state.movementPenalty += 1;
  if (mobilityCondition >= 3) {
    state.noSprint = true;
    pushEffect(state, "Mobility crippled: cannot Sprint.");
  }
  if (mobilityCondition >= 4) {
    state.immobile = true;
    pushEffect(state, "Mobility disabled: immobile.");
  }
}

export function getMachineRuleState(actor = null) {
  const state = {
    handling: 0,
    system: 0,
    reliability: 0,
    pilotingDn: 0,
    pilotingDice: 0,
    acquireDice: 0,
    targetingDice: 0,
    generalAttackDice: 0,
    armAttackDice: 0,
    turretAttackDice: 0,
    attackAr: 0,
    defenseDr: 0,
    movementPenalty: 0,
    trackingPenaltyAsTarget: 0,
    ecmSpikeDefenseDice: 0,
    startTurnHeat: 0,
    startTurnSaLoss: 0,
    attackHeat: 0,
    energyAttackHeat: 0,
    energyAttackDamage: 0,
    noSprint: false,
    noJump: false,
    noSensorActions: false,
    noTargetingDataGeneration: false,
    noTargetingDataUse: false,
    cannotAct: false,
    immobile: false,
    rangeCapClose: false,
    coolingImpaired: false,
    contactStateCap: "lock",
    armMountedOffline: false,
    turretOffline: false,
    targetFocused: false,
    reactorBreach: false,
    forcedProne: false,
    prone: false,
    effectTexts: [],
  };

  applyMachineCritDerivedState(state, actor);
  applyExplicitStatuses(state, actor);
  if (getActorType(actor) === TEMPLATE.actorTypes.battlemech) applyBattlemechDegradation(state, actor);
  else applyVehicleDegradation(state, actor);
  return state;
}

export function getMachineRuntimeAttributeAdjustments(actor = null) {
  const state = getMachineRuleState(actor);
  return {
    handling: state.handling,
    system: state.system,
    reliability: state.reliability,
  };
}

export function getMachinePilotingDnModifier(actor = null) {
  return getMachineRuleState(actor).pilotingDn;
}

export function getMachinePilotingDiceModifier(actor = null) {
  return getMachineRuleState(actor).pilotingDice;
}

export function getMachineAcquireDiceModifier(actor = null) {
  return getMachineRuleState(actor).acquireDice;
}

export function getMachineTargetingDiceModifier(actor = null) {
  return getMachineRuleState(actor).targetingDice;
}

export function getMachineAttackDiceModifier(actor = null, scope = {}) {
  const state = getMachineRuleState(actor);
  const attackScope = getAttackScope(actor, scope);
  let total = state.generalAttackDice;
  if (attackScope.isArmMounted) total += state.armAttackDice;
  if (attackScope.isTurretMounted) total += state.turretAttackDice;
  if (state.prone && attackScope.rangeBand === "close") total += -3;
  return total;
}

export function getMachineAttackCqAdjustments(actor = null, context = {}) {
  const state = getMachineRuleState(actor);
  const rangeBand = String(context?.rangeBand ?? "").trim().toLowerCase();
  return {
    ar: state.attackAr,
    dr: state.defenseDr + (state.prone && rangeBand === "close" ? -5 : 0),
  };
}

export function getMachineAttackRestriction(actor = null, scope = {}) {
  const state = getMachineRuleState(actor);
  const attackScope = getAttackScope(actor, scope);

  if (state.cannotAct) {
    return { blocked: true, reason: "Shutdown prevents the machine from acting." };
  }
  if (state.armMountedOffline && attackScope.isArmMounted) {
    return { blocked: true, reason: "Arm-mounted weapon groups are offline from degradation." };
  }
  if (state.turretOffline && attackScope.isTurretMounted) {
    return { blocked: true, reason: "Turret weapons are offline from degradation." };
  }
  return { blocked: false, reason: "" };
}

export function isMachineSensorActionBlocked(actor = null) {
  const state = getMachineRuleState(actor);
  return state.cannotAct || state.noSensorActions;
}

export function isMachineTargetingGenerationBlocked(actor = null) {
  const state = getMachineRuleState(actor);
  return state.cannotAct || state.noSensorActions || state.noTargetingDataGeneration;
}

export function isMachineTargetingDataUseBlocked(actor = null) {
  const state = getMachineRuleState(actor);
  return state.noTargetingDataUse || state.cannotAct;
}

export function isMachineRangeCappedToClose(actor = null) {
  return getMachineRuleState(actor).rangeCapClose;
}

export function getMachineTrackingPenaltyAdjustment(actor = null) {
  return getMachineRuleState(actor).trackingPenaltyAsTarget;
}

export function getMachineContactStateCap(actor = null) {
  return getMachineRuleState(actor).contactStateCap;
}

export function adjustTargetingDataValue({ attacker = null, targetActor = null, value = 0 } = {}) {
  let adjusted = Math.max(0, toNumber(value, 0));
  if (isMachineTargetingDataUseBlocked(attacker)) return 0;
  if (hasStatus(targetActor, "ecmJamming")) adjusted = Math.max(0, adjusted - 2);
  return adjusted;
}

export function getMachineHeatAdjustments(actor = null) {
  const state = getMachineRuleState(actor);
  return {
    startTurnHeat: state.startTurnHeat,
    coolingImpaired: state.coolingImpaired,
    attackHeat: state.attackHeat,
    energyAttackHeat: state.energyAttackHeat,
    energyAttackDamage: state.energyAttackDamage,
  };
}

export function getMachineMovementEffects(actor = null) {
  const state = getMachineRuleState(actor);
  return {
    movementPenalty: state.movementPenalty,
    noSprint: state.noSprint,
    noJump: state.noJump,
    immobile: state.immobile,
    forcedProne: state.forcedProne,
  };
}

export function buildMachineDegradationEffectSummary(actorType = "", locationKey = "", location = {}) {
  const condition = getCondition(location);
  const destroyed = Boolean(location?.destroyed);

  if (actorType === TEMPLATE.actorTypes.battlemech) {
    if (locationKey === "head") {
      if (destroyed) return "Pilot dead.";
      if (condition >= 4) return "Contact state capped at Contact; pilot incapacitation risk.";
      if (condition >= 3) return "No sensor or ECM actions.";
      if (condition >= 2) return "Contact state capped at Track.";
      if (condition >= 1) return "+1 tracking penalty.";
    }
    if (locationKey === "torso") {
      if (destroyed) return "Reactor detonation; pilot dead.";
      if (condition >= 4) return "Reactor Breach.";
      if (condition >= 3) return "Gyro Damage.";
      if (condition >= 2) return "+1 Heat to all actions.";
      if (condition >= 1) return "-1 die on attacks.";
    }
    if (locationKey === "arms") {
      if (destroyed) return "All arm-mounted weapon groups destroyed.";
      if (condition >= 4) return "All arm-mounted weapon groups offline.";
      if (condition >= 3) return "-3 dice on attacks with arm-mounted weapon groups.";
      if (condition >= 2) return "-2 dice on attacks with arm-mounted weapon groups.";
      if (condition >= 1) return "-1 die on attacks with arm-mounted weapon groups.";
    }
    if (locationKey === "legs") {
      if (destroyed) return "Prone and immobilized.";
      if (condition >= 4) return "Immobile.";
      if (condition >= 3) return "Actuator Failure; cannot run.";
      if (condition >= 2) return "Cannot Sprint.";
      if (condition >= 1) return "-1 movement.";
    }
  } else {
    if (["front", "side", "rear", "core"].includes(locationKey)) {
      if (destroyed) return "Vehicle destroyed; crew dead.";
      if (condition >= 4) return "Vehicle disabled; crew incapacitation risk.";
      if (condition >= 3) return "-2 System and -2 Handling.";
      if (condition >= 2) return "+1 Heat for all actions.";
      if (condition >= 1) return "-1 System and -1 Reliability.";
    }
    if (locationKey === "turret") {
      if (destroyed) return "Weapons destroyed.";
      if (condition >= 4) return "Weapons offline.";
      if (condition >= 3) return "+2 tracking penalty.";
      if (condition >= 2) return "-2 dice on attacks.";
      if (condition >= 1) return "-1 die on attacks.";
    }
    if (locationKey === "rotor") {
      if (destroyed) return "Immobile; advance body condition by 1.";
      if (condition >= 4) return "Immobile.";
      if (condition >= 3) return "Cannot Sprint.";
      if (condition >= 2) return "-2 movement.";
      if (condition >= 1) return "-1 movement.";
    }
  }
  return "";
}

export function getMachineDerivedStatusIds(actor = null) {
  const actorType = getActorType(actor);
  const statuses = new Set();
  if (actorType === TEMPLATE.actorTypes.battlemech) {
    if (getCondition(getLocationState(actor, "head")) >= 1) statuses.add("sensorDegraded");
    if (getCondition(getLocationState(actor, "head")) >= 3) statuses.add("sensorBlind");
    if (getCondition(getLocationState(actor, "torso")) >= 3) statuses.add("gyroDamage");
    if (getCondition(getLocationState(actor, "torso")) >= 4) statuses.add("reactorBreach");
    if (getCondition(getLocationState(actor, "legs")) >= 3) statuses.add("actuatorFailure");
    if (getLocationState(actor, "arms")?.destroyed) statuses.add("armDestroyed");
    if (getCondition(getLocationState(actor, "legs")) >= 4 || getLocationState(actor, "legs")?.destroyed) statuses.add("legDestroyed");
  }
  return Array.from(statuses);
}
