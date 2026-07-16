// src/modules/mwd/machine-state-effects.js
// Purpose: Canonical machine status and degradation mechanics aligned to the
//          MWD state/degrade docs.
// Workflow: actor statuses, active crits, degradation, heat, and strain ->
// aggregate machine state effects -> rolls, EW, movement, heat, and sheets query it.

import { TEMPLATE, startCase } from "../core/constants.js";
import { getActiveMachineCrits } from "./critical-hits.js";
import { getMachineHardpointByItemId } from "./machine-hardpoints.js";
import {
  getConfiguredMachineWeaponGroups,
  getMachineWeaponsForGroup,
  isEnergyMachineWeapon,
  normalizeMachineCritId,
  normalizeMachineMountLocationFamily,
} from "./machine-crit-consequences.js";
import { computeHeatPenalties } from "./heat-effects.js";
import { normalizeMachineHeatThresholds } from "./heat-state.js";
import { movementPenaltyStepsToMeters } from "./machine-movement.js";
import { getAssetModuleDerivedStatuses, getAssetModuleMovementBonus } from "./asset-module-effects.js";
import { getVehicleStrainStateEffects } from "./vehicle-strain.js";
import { collectMachineStateAnnotations } from "../status/status-mechanics.js";
import { normalizeStatusConditionId } from "../status/status-condition-catalog.js";
import { getMachineActorType } from "../utils/actor-guards.js";
import { toNumber } from "../utils/coercion.js";

const DETECTION_CAP_RANKS = Object.freeze({
  contact: 1,
  track: 2,
  lock: 3,
});

function setDetectionCap(currentCap = "lock", nextCap = "lock") {
  // Detection caps only ever get stricter while aggregating effects.
  const currentRank = DETECTION_CAP_RANKS[currentCap] ?? DETECTION_CAP_RANKS.lock;
  const nextRank = DETECTION_CAP_RANKS[nextCap] ?? DETECTION_CAP_RANKS.lock;
  return nextRank < currentRank ? nextCap : currentCap;
}

function getLocationState(actor = null, locationKey = "") {
  return actor?.system?.mwd?.locations?.[locationKey] ?? {};
}

function getCondition(location = {}) {
  return Math.max(0, Math.trunc(toNumber(location?.condition, 0)));
}

function getAttackScope(actor = null, { weaponGroupId = "", weaponId = "", weapon = null, rangeBand = "" } = {}) {
  // Attack modifiers may arrive from a sheet group button or an individual
  // weapon roll. Resolve both into mounted weapons and location families.
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
  const families = new Set(weapons.map(entry =>
    normalizeMachineMountLocationFamily(getMachineHardpointByItemId(actor, entry?.id)?.location)
  ).filter(Boolean));

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

function hasStatus(actor = null, statusId = "") {
  const id = normalizeStatusConditionId(statusId);
  if (!actor || !id) return false;
  return Array.from(actor.statuses ?? []).some(activeId => normalizeStatusConditionId(activeId) === id);
}

function addMovementPenalty(state, steps = 1) {
  state.movementPenalty += movementPenaltyStepsToMeters(steps);
}

function applyMachineCritDerivedState(state, actor = null) {
  // Non-status critical consequences stay here. Status-bearing crits flow
  // through the declarative status mechanics collector below.
  for (const crit of getActiveMachineCrits(actor)) {
    if (String(crit?.key ?? "").trim() === "opticsCoolantFog") {
      state.rangeCapClose = true;
      pushEffect(state, "Optics Coolant Fog: attacks beyond Close are blocked.");
    }
  }
}

function machineCqValue(value, actor = null) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (!value || typeof value !== "object") return 0;
  const actorType = getMachineActorType(actor?.type);
  return toNumber(value[actorType] ?? value.default, 0);
}

function applyMachineStatusAnnotations(state, actor = null) {
  const critStatusIds = getActiveMachineCrits(actor)
    .map(crit => String(crit?.statusId ?? "").trim())
    .filter(Boolean)
    .map(statusId => ({ statusId, sourceChannel: "critical" }));
  const assetStatusIds = Array.from(getAssetModuleDerivedStatuses(actor))
    .map(statusId => ({ statusId, sourceChannel: "degradation" }));
  const annotations = collectMachineStateAnnotations(actor, {
    extraStatusIds: [...critStatusIds, ...assetStatusIds],
  });

  for (const entry of annotations.dice) {
    const selector = String(entry.selector ?? "").trim();
    const value = toNumber(entry.value, 0);
    if (selector && Object.prototype.hasOwnProperty.call(state, selector)) {
      state[selector] += value;
    }
    if (entry.effectText) pushEffect(state, entry.effectText);
  }

  for (const entry of annotations.cq) {
    const ar = machineCqValue(entry.ar, actor);
    const dr = machineCqValue(entry.dr, actor);
    if (entry.whenBearerIs === "attacker" || entry.ar !== undefined) state.attackAr += ar;
    if (entry.whenBearerIs === "defender" || entry.dr !== undefined) state.defenseDr += dr;
    if (entry.effectText && (actor?.type === TEMPLATE.actorTypes.vehicle || !entry.effectText.includes("vehicle"))) {
      pushEffect(state, entry.effectText);
    }
  }

  for (const entry of annotations.gates) {
    if (entry.cannotAct) state.cannotAct = true;
    if (entry.effectText) pushEffect(state, entry.effectText);
  }

  for (const entry of annotations.targeting) {
    if (entry.rangeCapClose) state.rangeCapClose = true;
    if (entry.noSensorActions) state.noSensorActions = true;
    if (entry.noTargetingDataGeneration) state.noTargetingDataGeneration = true;
    if (entry.noTargetingDataUse) state.noTargetingDataUse = true;
    if (entry.targetFocused) state.targetFocused = true;
    if (entry.detectionStateCap) state.detectionStateCap = setDetectionCap(state.detectionStateCap, entry.detectionStateCap);
    if (entry.trackingPenaltyAsTarget) state.trackingPenaltyAsTarget += toNumber(entry.trackingPenaltyAsTarget, 0);
    if (entry.effectText) pushEffect(state, entry.effectText);
  }

  for (const entry of annotations.movement) {
    if (entry.noSprint) state.noSprint = true;
    if (entry.noJump) state.noJump = true;
    if (entry.immobile) state.immobile = true;
    if (entry.forcedProne) state.forcedProne = true;
    if (entry.prone) state.prone = true;
    if (entry.movementPenaltySteps) addMovementPenalty(state, toNumber(entry.movementPenaltySteps, 0));
    if (entry.pilotingDn) state.pilotingDn += toNumber(entry.pilotingDn, 0);
    if (entry.effectText) pushEffect(state, entry.effectText);
  }

  for (const entry of annotations.heat) {
    if (entry.coolingImpaired) state.coolingImpaired = true;
    if (entry.attackHeat) state.attackHeat += toNumber(entry.attackHeat, 0);
    if (entry.energyAttackHeat) state.energyAttackHeat += toNumber(entry.energyAttackHeat, 0);
    if (entry.energyAttackDamage) state.energyAttackDamage += toNumber(entry.energyAttackDamage, 0);
    if (entry.effectText) pushEffect(state, entry.effectText);
  }

  for (const entry of annotations.startTurn) {
    if (entry.heat) state.startTurnHeat += toNumber(entry.heat, 0);
    if (entry.resource === "sa") state.startTurnSaLoss += toNumber(entry.value, 0);
    if (entry.effectText) pushEffect(state, entry.effectText);
  }
}

function applyVehicleStrain(state, actor = null) {
  // Vehicle strain is vehicle-only degradation pressure and should not leak into
  // BattleMech heat/degradation behavior.
  if (getMachineActorType(actor?.type) !== TEMPLATE.actorTypes.vehicle) return;
  const strainEffects = getVehicleStrainStateEffects(actor);
  state.handling += strainEffects.handling;
  state.system += strainEffects.system;
  state.pilotingDice += strainEffects.pilotingDice;
  state.pilotingDn += strainEffects.pilotingDn;
  state.movementPenalty += strainEffects.movementPenalty;
  state.redlineBlocked = Boolean(strainEffects.redlineBlocked);
  for (const text of strainEffects.effectTexts ?? []) pushEffect(state, text);
}

function applyBattlemechHeatMovementPenalty(state, actor = null) {
  // BattleMech heat affects movement through the same aggregate movementPenalty
  // used by criticals and vehicle strain.
  if (getMachineActorType(actor?.type) !== TEMPLATE.actorTypes.battlemech) return;
  const system = actor?.system ?? {};
  const heatMonitor = system?.monitors?.heat ?? {};
  const heatConfig = system?.mwd?.heat ?? {};
  const currentHeat = Math.max(0, toNumber(heatMonitor.value ?? heatConfig.current, 0));
  const trackLength = Math.max(0, toNumber(heatMonitor.max ?? heatConfig.max ?? heatConfig.hardMax, 0));
  const thresholds = normalizeMachineHeatThresholds(heatConfig.thresholds ?? {}, trackLength);
  const heatMovementPenalty = computeHeatPenalties(currentHeat, thresholds).movementPenalty;
  if (heatMovementPenalty <= 0) return;

  state.movementPenalty += heatMovementPenalty;
  pushEffect(state, `Heat: -${heatMovementPenalty} m movement speed.`);
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
    state.detectionStateCap = setDetectionCap(state.detectionStateCap, "track");
    pushEffect(state, "Head damaged: detection state against this machine is capped at Track.");
  }
  if (headCondition >= 3) {
    state.noSensorActions = true;
    pushEffect(state, "Head crippled: no sensor or ECM actions.");
  }
  if (headCondition >= 4) {
    state.detectionStateCap = setDetectionCap(state.detectionStateCap, "contact");
    pushEffect(state, "Head disabled: detection state against this machine is capped at Contact.");
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
    addMovementPenalty(state, 1);
    pushEffect(state, "Legs impaired: -30 m movement.");
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
  const body = getLocationState(actor, "body");
  const turret = getLocationState(actor, "turret");
  const mobility = getLocationState(actor, "mobility");

  const bodyCondition = getCondition(body);
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

  const mobilityCondition = getCondition(mobility);
  if (mobilityCondition >= 1) addMovementPenalty(state, 1);
  if (mobilityCondition >= 2) addMovementPenalty(state, 1);
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
    movementBonus: 0,
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
    detectionStateCap: "lock",
    armMountedOffline: false,
    turretOffline: false,
    targetFocused: false,
    reactorBreach: false,
    forcedProne: false,
    prone: false,
    redlineBlocked: false,
    effectTexts: [],
  };

  applyVehicleStrain(state, actor);
  applyBattlemechHeatMovementPenalty(state, actor);
  state.movementBonus += getAssetModuleMovementBonus(actor);
  applyMachineCritDerivedState(state, actor);
  applyMachineStatusAnnotations(state, actor);
  if (getMachineActorType(actor?.type) === TEMPLATE.actorTypes.battlemech) applyBattlemechDegradation(state, actor);
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

export function getMachineDetectionStateCap(actor = null) {
  return getMachineRuleState(actor).detectionStateCap;
}

export function adjustTargetingDataValue({ attacker = null, targetActor = null, value = 0 } = {}) {
  let adjusted = Math.max(0, toNumber(value, 0));
  if (isMachineTargetingDataUseBlocked(attacker)) return 0;
  const targetAnnotations = collectMachineStateAnnotations(targetActor);
  for (const entry of targetAnnotations.targeting) {
    if (entry.statusId === "ecmJamming" && hasStatus(targetActor, "epmBoosted")) continue;
    if (entry.targetingDataValueDelta) adjusted += toNumber(entry.targetingDataValueDelta, 0);
  }
  adjusted = Math.max(0, adjusted);
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
    movementBonus: state.movementBonus,
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
      if (condition >= 1) return "-30 m movement.";
    }
  } else {
    if (locationKey === "body") {
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
    if (locationKey === "mobility") {
      if (destroyed) return "Immobile.";
      if (condition >= 4) return "Immobile.";
      if (condition >= 3) return "Cannot Sprint.";
      if (condition >= 2) return "-60 m movement.";
      if (condition >= 1) return "-30 m movement.";
    }
  }
  return "";
}

export function getMachineDerivedStatusIds(actor = null) {
  const actorType = getMachineActorType(actor?.type);
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
  if (actorType === TEMPLATE.actorTypes.vehicle) {
    if (getCondition(getLocationState(actor, "turret")) >= 4) statuses.add("weaponFailure");
    if (getCondition(getLocationState(actor, "mobility")) >= 4) statuses.add("stalled");
    if (getCondition(getLocationState(actor, "body")) >= 2) statuses.add("sensorDegraded");
    if (getCondition(getLocationState(actor, "body")) >= 4) statuses.add("shutdown");
  }
  return Array.from(statuses);
}
