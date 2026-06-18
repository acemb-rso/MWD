import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { compilePack } from "@foundryvtt/foundryvtt-cli";

const OUT_DIR = path.resolve("src/packs/asset-modules");
const PACK_DIR = path.resolve("packs/asset-modules");
const SYSTEM_PREFIX = "systems/mwd/";
const SOURCE = "Asset Modules";
const DEFAULT_IMG = "img/default/upgrade.svg";

const jump = (movement, heat = 1, ar = 3, dr = 1) => ({
  enabled: true,
  movement,
  heat,
  attackRatingBonus: ar,
  defenseRatingBonus: dr,
  dfaEnabled: true,
});

const effect = (id, label, data = {}) => ({
  id,
  label,
  timing: data.timing ?? "ready",
  scope: data.scope ?? "self",
  requires: data.requires ?? {},
  grants: data.grants ?? {},
  modifies: data.modifies ?? {},
  costs: data.costs ?? {},
  limits: data.limits ?? {},
});

const rule = (id, label, data = {}) => ({
  id,
  label,
  scope: data.scope ?? "self",
  phase: data.phase ?? "assetModuleEffect",
  mode: data.mode ?? "automatic",
  selector: data.selector ?? {},
  requires: data.requires ?? [{ fact: "module.ready", op: "eq", value: true }],
  conditions: data.conditions ?? [],
  outputs: data.outputs ?? [],
  limits: data.limits ?? {},
  usage: data.usage ?? null,
  summary: data.summary ?? label,
});

function selectorFromEffect(entry = {}) {
  const requires = entry.requires ?? {};
  return {
    tags: requires.tags ?? [],
    forbidsTags: requires.forbidsTags ?? [],
    actionIds: requires.actionIds ?? requires.actions ?? requires.action ?? [],
    skillIds: requires.skillIds ?? requires.skills ?? requires.skill ?? [],
    weaponTags: requires.weaponTags ?? [],
    statuses: requires.statuses ?? [],
    forbidsStatuses: requires.forbidsStatuses ?? [],
    detectionState: requires.detectionState ?? "",
    targetState: requires.targetState ?? "",
    heatBand: requires.heatBand ?? "",
    modes: requires.modes ?? requires.mode ?? [],
  };
}

function timingRequirements(entry = {}) {
  if (entry.timing === "active") return [{ fact: "module.active", op: "eq", value: true }];
  if (entry.timing === "triggered") return [
    { fact: "module.ready", op: "eq", value: true },
    { fact: "event.trigger", op: "truthy" },
  ];
  return [{ fact: "module.ready", op: "eq", value: true }];
}

function outputsFromEffect(entry = {}) {
  const outputs = [];
  const modifies = entry.modifies ?? {};
  const grants = entry.grants ?? {};
  if (modifies.dice) outputs.push({ type: "dicePart", id: `${entry.id}.dice`, label: entry.label, value: modifies.dice });
  if (modifies.ar || modifies.dr) outputs.push({ type: "cqPart", id: `${entry.id}.cq`, label: entry.label, ar: modifies.ar ?? 0, dr: modifies.dr ?? 0 });
  if (modifies.trackingPenalty) outputs.push({ type: "targetingConstraint", id: `${entry.id}.trackingPenalty`, label: entry.label, constraint: "trackingPenalty", value: modifies.trackingPenalty });
  if (modifies.targetingData) outputs.push({ type: "targetingDataModifier", id: `${entry.id}.targetingData`, label: entry.label, value: modifies.targetingData });
  for (const status of modifies.bypassStatuses ?? []) {
    outputs.push({ type: "targetingConstraint", id: `${entry.id}.bypass.${status}`, label: entry.label, constraint: "bypassStatus", value: status });
  }
  if (modifies.movementMeters) outputs.push({ type: "queuedDomainRequest", id: `${entry.id}.movement`, label: entry.label, domain: "movement", request: { movementMeters: modifies.movementMeters } });
  if (modifies.clusteringDice || modifies.clusteringTarget) {
    outputs.push({
      type: "queuedDomainRequest",
      id: `${entry.id}.clustering`,
      label: entry.label,
      domain: "clustering",
      request: {
        diceModifier: modifies.clusteringDice ?? 0,
        targetNumberModifier: modifies.clusteringTarget ?? 0,
      },
    });
  }
  for (const status of grants.statuses ?? []) {
    outputs.push({ type: "derivedStatus", id: `${entry.id}.status.${status}`, label: entry.label, key: status, value: true });
  }
  for (const override of grants.actionOverrides ?? []) {
    const actionIds = override.actionIds ?? override.actions ?? (override.actionId ? [override.actionId] : []);
    for (const actionId of actionIds) {
      outputs.push({ type: "actionAvailability", id: `${entry.id}.action.${actionId}`, label: entry.label, actionId, enabled: true, reason: "" });
    }
    outputs.push({
      type: "queuedDomainRequest",
      id: `${entry.id}.actionOverride`,
      label: entry.label,
      domain: "actionOverride",
      request: {
        actionIds,
        resource: override.resource ?? "fa",
        cost: override.cost ?? 0,
        category: override.category ?? "free",
      },
    });
  }
  for (const reactionId of grants.reactions ?? []) {
    outputs.push({ type: "queuedDomainRequest", id: `${entry.id}.reaction.${reactionId}`, label: entry.label, domain: "reactionGrant", request: { reactionId } });
  }
  const costs = entry.costs ?? {};
  if (costs.heat) outputs.push({ type: "resourceSpendPreview", id: `${entry.id}.heat`, label: entry.label, resource: "heat", value: costs.heat });
  if (costs.charges) outputs.push({ type: "resourceSpendPreview", id: `${entry.id}.charges`, label: entry.label, resource: "charges", value: costs.charges });
  if (costs.stress?.location && costs.stress.value) {
    outputs.push({
      type: "queuedDomainRequest",
      id: `${entry.id}.stress`,
      label: entry.label,
      domain: "stressCost",
      request: {
        location: costs.stress.location,
        value: costs.stress.value,
      },
    });
  }
  return outputs;
}

function ruleFromEffect(entry = {}) {
  return rule(entry.id, entry.label, {
    scope: entry.scope,
    mode: entry.timing === "triggered" ? "triggered" : "automatic",
    selector: selectorFromEffect(entry),
    requires: timingRequirements(entry),
    outputs: outputsFromEffect(entry),
    limits: entry.limits?.oncePerActivation ? { perActivation: 1 } : {},
    usage: entry.costs?.charges || entry.limits?.cooldownTurns
      ? {
        charges: entry.costs?.charges ?? undefined,
        cooldownTurns: entry.limits?.cooldownTurns ?? undefined,
      }
      : null,
  });
}

function ruleFromRuntimePacket(packet = {}) {
  const triggeredKinds = new Set(["interceptAttack", "catastrophicInterception", "startOfActivationRepair"]);
  return rule(packet.id, packet.label ?? packet.id, {
    mode: triggeredKinds.has(packet.kind) ? "triggered" : "automatic",
    outputs: [{
      type: "queuedDomainRequest",
      id: `${packet.id}.request`,
      label: packet.label ?? packet.id,
      domain: packet.kind,
      request: packet,
    }],
    usage: packet.charges || packet.heat || packet.consumesModule
      ? {
        charges: packet.charges ?? undefined,
        consume: Boolean(packet.consumesModule),
      }
      : null,
  });
}

function rulesForRow(row = {}) {
  return [
    ...(row.effects ?? []).map(ruleFromEffect),
    ...(row.runtimePackets ?? []).map(ruleFromRuntimePacket),
    ...(row.rules ?? []),
  ];
}

const rows = [
  {
    section: "Fire Control Suite",
    name: "Artemis IV FCS",
    requirement: "Sensor Lock; missile weapon",
    effectText: "+5 AR with missile attacks; guided missile systems may use Lock/TAG/NARC benefits",
    costRisk: "None",
    tags: ["fireControl", "missile", "guidedMissile"],
    effects: [
      effect("artemis-missile-ar", "Artemis Missile Guidance", {
        requires: { weaponTags: ["weapon.missile"] },
        modifies: { ar: 5 },
      }),
    ],
  },
  {
    section: "Fire Control Suite",
    name: "Battle Computer - Cluster Optimizer",
    requirement: "Sensor Lock; cluster weapon",
    effectText: "Cluster Dice hit on 4+",
    costRisk: "None",
    tags: ["fireControl", "cluster"],
    targeting: { clustering: { diceModifier: 0, targetNumberModifier: -1 } },
    effects: [
      effect("cluster-target", "Cluster Dice Targeting", {
        requires: { weaponTags: ["weapon.cluster"] },
        modifies: { clusteringTarget: -1 },
      }),
    ],
  },
  {
    section: "Fire Control Suite",
    name: "Battle Computer - Ballistic Optimizer",
    requirement: "Sensor Lock; ballistic weapon",
    effectText: "+1 gunnery die, +5 AR for penetrating attacks",
    costRisk: "None",
    tags: ["fireControl", "ballistic", "penetrating"],
    effects: [
      effect("ballistic-optimizer", "Ballistic Optimizer", {
        requires: { weaponTags: ["weapon.ballistic"] },
        modifies: { dice: 1, ar: 5 },
      }),
    ],
  },
  {
    section: "Fire Control Suite",
    name: "Battle Computer - Energy Optimizer",
    requirement: "Sensor Lock; energy weapon",
    effectText: "+1 gunnery die, +5 AR for energy attacks",
    costRisk: "None",
    tags: ["fireControl", "energy"],
    effects: [
      effect("energy-optimizer", "Energy Optimizer", {
        requires: { weaponTags: ["weapon.energy"] },
        modifies: { dice: 1, ar: 5 },
      }),
    ],
  },
  {
    section: "Mobility",
    name: "Basic Jump Jet",
    requirement: "None",
    effectText: "1 Jump Move Action; +1 TrackingPenalty; +3 AR",
    costRisk: "Jump Move generates +1 heat",
    category: "mobility",
    tags: ["mobility", "jump", "jumpJet"],
    mobility: { jumping: jump(90) },
    effects: [
      effect("jump-move-bonus", "Jump Move Profile", {
        requires: { actionIds: ["jumpMove"] },
        modifies: { ar: 3, trackingPenalty: 1 },
        costs: { heat: 1 },
      }),
    ],
  },
  {
    section: "Mobility",
    name: "Improved Jump Jet",
    requirement: "None",
    effectText: "2 Jump Move Action; +1 TrackingPenalty; +3 AR",
    costRisk: "Jump Move generates +1 heat",
    category: "mobility",
    tags: ["mobility", "jump", "jumpJet"],
    mobility: { jumping: jump(180) },
    effects: [
      effect("improved-jump-move-bonus", "Improved Jump Move Profile", {
        requires: { actionIds: ["jumpMove"] },
        modifies: { ar: 3, trackingPenalty: 1 },
        costs: { heat: 1 },
      }),
    ],
  },
  {
    section: "Mobility",
    name: "Triple Strength Myomer",
    requirement: "Overheat",
    effectText: "+2 melee damage; +30m ground movement",
    costRisk: "None, but it only functions while heat remains in the required band.",
    category: "mobility",
    tags: ["mobility", "melee", "overheat"],
    effects: [
      effect("tsm-movement", "Triple Strength Movement", {
        requires: { heatBand: "overheated" },
        modifies: { movementMeters: 30 },
      }),
      effect("tsm-melee", "Triple Strength Melee", {
        requires: { heatBand: "overheated", weaponTags: ["weapon.melee"] },
        modifies: { dice: 2 },
      }),
    ],
  },
  {
    section: "Mobility",
    name: "M.A.S.C.",
    requirement: "Legs not Crippled/Disabled",
    effectText: "+50m ground movement when engaged",
    costRisk: "+1 leg stress when used.",
    category: "mobility",
    activationMode: "toggle",
    tags: ["mobility", "masc"],
    effects: [
      effect("masc-speed", "MASC Speed", {
        timing: "active",
        modifies: { movementMeters: 50 },
        costs: { stress: { location: "legs", value: 1 } },
      }),
    ],
  },
  {
    section: "Mobility",
    name: "Actuator Enhancement System",
    requirement: "Arms or Legs not Disabled, no actuator failure",
    effectText: "+1 Piloting die; +5 AR with melee attacks",
    costRisk: "None",
    category: "mobility",
    tags: ["mobility", "actuator", "melee"],
    effects: [
      effect("actuator-piloting", "Actuator Piloting Aid", {
        requires: { skillIds: ["piloting"] },
        modifies: { dice: 1 },
      }),
      effect("actuator-melee", "Actuator Melee Targeting", {
        requires: { weaponTags: ["weapon.melee"] },
        modifies: { ar: 5 },
      }),
    ],
  },
  {
    section: "Mobility",
    name: "Supercharger",
    requirement: "Legs not Crippled/Disabled",
    effectText: "+100m ground movement when engaged",
    costRisk: "+1 heat per move action while active and +1 leg stress when used.",
    category: "mobility",
    activationMode: "toggle",
    tags: ["mobility", "supercharger"],
    effects: [
      effect("supercharger-speed", "Supercharger Speed", {
        timing: "active",
        modifies: { movementMeters: 100 },
      }),
      effect("supercharger-move-cost", "Supercharger Move Cost", {
        timing: "active",
        requires: { actionIds: ["walk", "run", "sprint", "move", "jumpMove"] },
        costs: { heat: 1, stress: { location: "legs", value: 1 } },
      }),
    ],
  },
  {
    section: "Advanced Sensors",
    name: "Bloodhound Active Probe",
    requirement: "Active sensors available",
    effectText: "+2 dice acquireTarget / Sensor Sweep/generateTargetingData; +2 Piloting dice to avoid mines; acquire blind -> contact as Free Action. Ignore ecmShrouded.",
    costRisk: "High Emission (1)",
    tags: ["sensor", "activeProbe", "highEmission"],
    effects: [
      effect("bloodhound-sensors", "Bloodhound Sensor Aid", {
        requires: { actionIds: ["acquireTarget", "sensorSweep", "generateTargetingData"] },
        modifies: { dice: 2, bypassStatuses: ["ecmShrouded"] },
      }),
      effect("bloodhound-mine-piloting", "Minefield Piloting Aid", {
        requires: { skillIds: ["piloting"] },
        modifies: { dice: 2 },
      }),
    ],
  },
  {
    section: "Advanced Sensors",
    name: "Beagle Active Probe",
    requirement: "Active sensors available",
    effectText: "+1 die acquireTarget / Sensor Sweep, +2 Piloting dice to avoid mines; upgrade blind -> contact, contact -> track as Free Action. Ignore obscuredLight",
    costRisk: "High Emission (1)",
    tags: ["sensor", "activeProbe", "highEmission"],
    effects: [
      effect("beagle-sensors", "Beagle Sensor Aid", {
        requires: { actionIds: ["acquireTarget", "sensorSweep"] },
        modifies: { dice: 1 },
      }),
      effect("beagle-mine-piloting", "Minefield Piloting Aid", {
        requires: { skillIds: ["piloting"] },
        modifies: { dice: 2 },
      }),
    ],
  },
  {
    section: "Advanced Sensors",
    name: "Advanced Optics",
    requirement: "Line of sight; not sensorBlind",
    effectText: "Ignore obscuredLight; +1 die to visual identification",
    costRisk: "None",
    tags: ["sensor", "optics", "visual"],
    effects: [
      effect("visual-identification", "Visual Identification", {
        requires: { forbidsStatuses: ["sensorBlind"], tags: ["visual"] },
        modifies: { dice: 1 },
      }),
    ],
  },
  {
    section: "Advanced Sensors",
    name: "AR14 Sheathed Beacon",
    requirement: "Active sensors available",
    effectText: "Applies ecmShrouded to the carrier while active. Grants +1 die to acquireTarget. Grants +1 die to epmFilter or holdLink. Applies epmBoosted to allies within 180m",
    costRisk: "None",
    activationMode: "toggle",
    tags: ["sensor", "ecm", "epm", "beacon"],
    effects: [
      effect("ar14-shroud", "Sheathed Beacon Shroud", {
        timing: "active",
        grants: { statuses: ["ecmShrouded"] },
      }),
      effect("ar14-ew-aid", "Sheathed Beacon EW Aid", {
        timing: "active",
        requires: { actionIds: ["acquireTarget", "epmFilter", "holdLink"] },
        modifies: { dice: 1 },
      }),
    ],
    runtimePackets: [{
      id: "ar14-sheathed-beacon-aura",
      kind: "aura",
      label: "AR14 Sheathed Beacon",
      radius: 180,
      allegiance: "ally",
      grants: { statuses: ["epmBoosted"] },
    }],
  },
  {
    section: "Advanced Sensors",
    name: "Probeking QS",
    requirement: "Active sensors available",
    effectText: "acquireTarget attempt each activation may be made as a Free Action",
    costRisk: "acquireTarget action generates 1 heat",
    tags: ["sensor", "activeProbe", "acquireTarget"],
    effects: [
      effect("probeking-free-acquire", "Quick Acquire Target", {
        requires: { actionIds: ["acquireTarget"] },
        grants: { actionOverrides: [{ actionIds: ["acquireTarget"], resource: "free", cost: 0 }] },
        costs: { heat: 1 },
        limits: { oncePerActivation: true },
      }),
    ],
  },
  {
    section: "Combat Electronics",
    name: "Watchdog CEWS",
    requirement: "Suite active",
    effectText: "Applies ecmShrouded to the carrier. Grants +1 die to acquireTarget. Grants +1 die to epmFilter. Flexible compact EW package.",
    costRisk: "High Emission: Enemies reduce trackingPenalty against this machine by 1, minimum 0. Enemies gain +1 die to acquireTarget against this machine when emissions are relevant.",
    activationMode: "toggle",
    tags: ["combatElectronics", "ecm", "ew", "highEmission"],
    effects: [
      effect("watchdog-shroud", "Watchdog Shroud", {
        timing: "active",
        grants: { statuses: ["ecmShrouded"] },
      }),
      effect("watchdog-ew-aid", "Watchdog EW Aid", {
        timing: "active",
        requires: { actionIds: ["acquireTarget", "epmFilter"] },
        modifies: { dice: 1 },
      }),
    ],
  },
  {
    section: "Combat Electronics",
    name: "Nova CEWS",
    requirement: "Suite active",
    effectText: "Applies ecmShrouded and epmBoosted to the carrier. Grants +1 die to acquireTarget. Grants +1 die to ecmSpike, breakLock, and epmFilter. Active mode applies ecmShrouded to allies within 90m.",
    costRisk: "Active mode generates 1 heat",
    activationMode: "toggle",
    tags: ["combatElectronics", "ecm", "epm", "ew"],
    effects: [
      effect("nova-status", "Nova EW Suite", {
        timing: "active",
        grants: { statuses: ["ecmShrouded", "epmBoosted"] },
        costs: { heat: 1 },
      }),
      effect("nova-ew-aid", "Nova EW Aid", {
        timing: "active",
        requires: { actionIds: ["acquireTarget", "ecmSpike", "breakLock", "epmFilter"] },
        modifies: { dice: 1 },
      }),
    ],
    runtimePackets: [{
      id: "nova-cews-shroud-aura",
      kind: "aura",
      label: "Nova CEWS Shroud",
      radius: 90,
      allegiance: "ally",
      grants: { statuses: ["ecmShrouded"] },
    }],
  },
  {
    section: "Combat Electronics",
    name: "Guardian ECM",
    requirement: "ECM active",
    effectText: "Applies ecmShrouded to the carrier. Grants +3 dice to ecmSpike and breakLock; Active mode applies ecmShrouded to allies within 180m.",
    costRisk: "Active mode generates 1 heat",
    activationMode: "toggle",
    tags: ["combatElectronics", "ecm", "guardian"],
    effects: [
      effect("guardian-shroud", "Guardian ECM Shroud", {
        timing: "active",
        grants: { statuses: ["ecmShrouded"] },
        costs: { heat: 1 },
      }),
      effect("guardian-ecm-aid", "Guardian ECM Aid", {
        timing: "active",
        requires: { actionIds: ["ecmSpike", "breakLock"] },
        modifies: { dice: 3 },
      }),
    ],
    runtimePackets: [{
      id: "guardian-shroud-aura",
      kind: "aura",
      label: "Guardian ECM Shroud",
      radius: 180,
      allegiance: "ally",
      grants: { statuses: ["ecmShrouded"] },
    }],
  },
  {
    section: "Combat Electronics",
    name: "Electronic Protection Array",
    requirement: "EPM active",
    effectText: "Applies epmBoosted to the carrier. Grants +2 dice to epmFilter and holdLink. While epmBoosted, the carrier may ignore ecmJamming's targetingData reduction and may attempt to acquire lock despite ecmJamming.",
    costRisk: "None",
    activationMode: "toggle",
    tags: ["combatElectronics", "epm", "electronicProtection"],
    effects: [
      effect("epa-boost", "Electronic Protection Boost", {
        timing: "active",
        grants: { statuses: ["epmBoosted"] },
      }),
      effect("epa-aid", "EPM Aid", {
        timing: "active",
        requires: { actionIds: ["epmFilter", "holdLink"] },
        modifies: { dice: 2 },
      }),
    ],
  },
  {
    section: "Combat Electronics",
    name: "IFF Jammer",
    requirement: "Target must be at least track status, or part of a network/link",
    effectText: "Suppresses shared targetingData, C3 sharing, IFF-assisted fire, TAG/NARC/beacon sharing, and allied contact-sharing on affected tracked targets. Does not apply generic ecmJamming unless used with an ECM Spike action.",
    costRisk: "None",
    tags: ["combatElectronics", "iff", "jammer", "network"],
    runtimePackets: [
      { id: "iff-targeting-suppression", kind: "targetingSuppression", appliesTo: ["c3", "iff", "tag", "narc", "beacon"] },
    ],
  },
  {
    section: "Combat Electronics",
    name: "Stealth X system",
    requirement: "Stealth system active",
    effectText: "+2 trackingPenalty when attacking the carrier; +1 DN for enemy acquireTarget tests when in use",
    costRisk: "Generates +1 heat when used",
    activationMode: "toggle",
    tags: ["combatElectronics", "stealth", "ecm"],
    targeting: {
      stealthProfile: {
        ratingBonus: 2,
        tags: ["electronic", "stealth"],
        requiresActiveMode: false,
      },
    },
    effects: [
      effect("stealth-x-defense", "Stealth X Defense", {
        timing: "active",
        modifies: { trackingPenalty: 2 },
        costs: { heat: 1 },
      }),
    ],
  },
  {
    section: "Reinforced Cockpit",
    name: "Encased Cybernetic Cockpit",
    requirement: "Pilot has neural interface; cockpit not disabled",
    effectText: "Reduces pilot Physical damage from Head/Cockpit crits by 1. Grants +1 die to Piloting checks made to resist cockpit shock, fall impact, or control feedback.",
    costRisk: "If sensorBlind, shutdown, or neural-interface crit occurs, pilot suffers +1 Fatigue from feedback.",
    tags: ["cockpit", "neuralInterface", "pilotProtection"],
    effects: [
      effect("cybernetic-cockpit-piloting", "Control Feedback Resistance", {
        requires: { skillIds: ["piloting"] },
        modifies: { dice: 1 },
      }),
    ],
    runtimePackets: [
      { id: "head-cockpit-damage-mitigation", kind: "pilotDamageMitigation", value: 1, appliesTo: ["head", "cockpit"] },
    ],
  },
  {
    section: "Reinforced Cockpit",
    name: "Armored Cockpit Cowl",
    requirement: "Cockpit/head not disabled",
    effectText: "Reduces pilot Physical damage from Head/Cockpit crits by 1",
    costRisk: "None",
    tags: ["cockpit", "pilotProtection"],
    runtimePackets: [
      { id: "head-cockpit-damage-mitigation", kind: "pilotDamageMitigation", value: 1, appliesTo: ["head", "cockpit"] },
    ],
  },
  {
    section: "Targeting Computer",
    name: "Ares Target Projection Suite",
    requirement: "Target at track or lock; ranged attack",
    effectText: "Reduces attack trackingPenalty by 1 against targets at track or better. At lock, grants +5 AR for attacks at Far/Extreme range.",
    costRisk: "Disabled while sensorBlind or sensorDegraded.",
    tags: ["targeting", "ranged", "tracking"],
    effects: [
      effect("ares-track-assist", "Track Projection", {
        requires: { weaponTags: ["weapon.ranged"], forbidsStatuses: ["sensorBlind", "sensorDegraded"] },
        modifies: { trackingPenalty: -1 },
      }),
      effect("ares-locked-range", "Long Range Projection", {
        requires: { weaponTags: ["weapon.ranged"], detectionState: "lock", forbidsStatuses: ["sensorBlind", "sensorDegraded"] },
        modifies: { ar: 5 },
      }),
    ],
  },
  {
    section: "Targeting Computer",
    name: "Advanced Targeting Computer",
    requirement: "Target at track or lock; ranged attack",
    effectText: "Ignore 1 point of penalty from Attack movement. At lock, grants +1 gunnery die or +5 AR with ranged attacks",
    costRisk: "Disabled by sensorBlind or sensorDegraded.",
    tags: ["targeting", "ranged", "gunnery"],
    effects: [
      effect("advanced-targeting", "Advanced Targeting", {
        requires: { weaponTags: ["weapon.ranged"], forbidsStatuses: ["sensorBlind", "sensorDegraded"] },
        modifies: { dice: 1, ar: 5 },
      }),
    ],
  },
  {
    section: "Targeting Computer",
    name: "Buffered VDNI Console",
    requirement: "Pilot has VDNI/neural interface; console Ready",
    effectText: "+1 initiative; +1 die to Piloting; first additional reaction or extra SA in an activation generates 1 less Burn. Grant +1 die to breakLock and holdLink.",
    costRisk: "On head crit, neural feedback, sensorBlind, or head degradation, pilot suffers 1 fatigue. If the console is disabled while active, pilot immediately suffers 3 fatigue from feedback.",
    tags: ["targeting", "vdni", "neuralInterface", "initiative"],
    effects: [
      effect("vdni-piloting", "VDNI Piloting Aid", {
        requires: { skillIds: ["piloting"] },
        modifies: { dice: 1 },
      }),
      effect("vdni-ew-aid", "VDNI Link Aid", {
        requires: { actionIds: ["breakLock", "holdLink"] },
        modifies: { dice: 1 },
      }),
    ],
  },
  {
    section: "Network",
    name: "C3 Unit",
    requirement: "C3 Active",
    effectText: "Friendly C3 units may use the best friendly detection state on a target, capped at track unless the attacker also has direct lock. May use best shared targetingData packet from the network, not stacked.",
    costRisk: "",
    tags: ["network", "c3", "shareTargetingData"],
    capabilities: ["c3", "network", "shareTargetingData"],
    runtimePackets: [
      { id: "c3-network-share", kind: "networkShare", capability: "c3", capDetectionState: "track" },
    ],
  },
  {
    section: "Network",
    name: "UAV Control Pod",
    requirement: "UAV Active and not jammed",
    effectText: "Provides passive battlefield overwatch. Grants +1 die to Acquire Target / Sensor Sweep. Can maintain contact on visible enemies in UAV coverage. Grants +2 dice to Piloting checks to cross hazardous terrain/mine fields. Removes indirect fire penalties for operator.",
    costRisk: "",
    installClass: "equipment",
    tags: ["network", "uav", "overwatch", "sensor"],
    effects: [
      effect("uav-sensor-aid", "UAV Sensor Overwatch", {
        requires: { actionIds: ["acquireTarget", "sensorSweep"] },
        modifies: { dice: 1 },
      }),
      effect("uav-hazard-piloting", "UAV Hazard Overwatch", {
        requires: { skillIds: ["piloting"] },
        modifies: { dice: 2 },
      }),
    ],
  },
  {
    section: "Network",
    name: "SLIC Suite",
    requirement: "",
    effectText: "All friendly SLIC units have +1 initiative; Grants +1 die to acquireTarget, sensorSweep, holdLink, breakLock, generateTargetData to all friendly units within 500m",
    costRisk: "Suppressed by IFF Jammer/network disruption",
    tags: ["network", "slic", "initiative"],
    effects: [
      effect("slic-network-aid", "SLIC Network Aid", {
        requires: { actionIds: ["acquireTarget", "sensorSweep", "holdLink", "breakLock", "generateTargetData"] },
        modifies: { dice: 1 },
      }),
    ],
  },
  {
    section: "Protection Systems",
    name: "CASE",
    requirement: "Volatile component or ammo explosion event",
    effectText: "Prevents full machine destruction and automatic crew death. Local location still suffers severe consequence: condition +1, stress spike, or module destruction.",
    costRisk: "CASE destroyed/consumed when it prevents a catastrophic event.",
    tags: ["protection", "ammo", "catastrophic"],
    runtimePackets: [
      { id: "case-catastrophic-interception", kind: "catastrophicInterception", consumesModule: true },
    ],
  },
  {
    section: "Protection Systems",
    name: "Feed Stabilizer",
    requirement: "",
    effectText: "+2 dice to feedReset and other Feed-related remedies. Applies to Jammed Ballistic, Ammo Feed Fault, Weapon Supply Interruption, missile feed failures.",
    costRisk: "None",
    tags: ["protection", "feed", "repair"],
    effects: [
      effect("feed-stabilizer", "Feed Remedy Aid", {
        requires: { actionIds: ["feedReset"] },
        modifies: { dice: 2 },
      }),
    ],
  },
  {
    section: "Protection Systems",
    name: "Power Rerouter Bus",
    requirement: "",
    effectText: "+2 dice to powerReroute, systemReset, and power-routing remedies. Helps reactor instability, power bus outage, shutdown recovery where appropriate.",
    costRisk: "None",
    tags: ["protection", "power", "repair"],
    effects: [
      effect("power-rerouter", "Power Routing Aid", {
        requires: { actionIds: ["powerReroute", "systemReset"] },
        modifies: { dice: 2 },
      }),
    ],
  },
  {
    section: "Protection Systems",
    name: "Hardened Structural Components",
    requirement: "",
    effectText: "Increase global machine shock/pressure capacity by +1",
    costRisk: "None",
    tags: ["protection", "structure", "shock"],
    rules: [
      rule("hardened-structure-capacity", "Hardened Structural Components", {
        outputs: [{
          type: "queuedDomainRequest",
          id: "hardened-structure-capacity.request",
          label: "Hardened Structural Components",
          domain: "machineMonitor",
          request: { shockCapacityBonus: 1, pressureCapacityBonus: 1 },
        }],
      }),
    ],
  },
  {
    section: "Protection Systems",
    name: "Thermal Bank",
    requirement: "",
    effectText: "+1 heatProfile",
    costRisk: "Gains High Emission (1) when Heat Status not SAFE",
    tags: ["protection", "thermal", "heat", "highEmission"],
    rules: [
      rule("thermal-bank-profile", "Thermal Bank", {
        outputs: [{ type: "heatAdjustment", id: "thermal-bank-profile.heatProfile", label: "Thermal Bank", timing: "profile", value: 1 }],
      }),
      rule("thermal-bank-emission", "Thermal Bank High Emission", {
        requires: [
          { fact: "module.ready", op: "eq", value: true },
          { fact: "heatBand", op: "truthy" },
        ],
        conditions: [{ fact: "heatBand", op: "neq", value: "safe" }],
        outputs: [{ type: "derivedStatus", id: "thermal-bank-emission.highEmission", label: "Thermal Bank", key: "highEmission", value: 1 }],
      }),
    ],
  },
  {
    section: "Protection Systems",
    name: "Thermal Exchanger",
    requirement: "",
    effectText: "+1 heatDissipation",
    costRisk: "Gains High Emission (1) when Heat Status not SAFE",
    tags: ["protection", "thermal", "heat", "highEmission"],
    runtimePackets: [
      { id: "thermal-exchanger-dissipation", kind: "currentHeatAdjustment", timing: "dissipation", value: -1 },
    ],
  },
  {
    section: "Protection Systems",
    name: "Reactive Plating",
    requirement: "Armor > 0",
    effectText: "Armor gains 2 Concussive Resistance",
    costRisk: "Ablative Module: drops to Resistance 1 at 50% armor remaining; destroyed at 25% armor remaining.",
    tags: ["protection", "armor", "concussive", "ablative"],
    runtimePackets: [
      { id: "reactive-plating-resistance", kind: "incomingDamageReduction", value: 2, appliesTo: ["concussive"] },
    ],
  },
  {
    section: "Protection Systems",
    name: "Reflective Glazing",
    requirement: "Armor > 0",
    effectText: "Armor gains 2 Energy Resistance",
    costRisk: "Ablative Module: drops to Resistance 1 at 50% armor remaining; destroyed at 25% armor remaining.",
    tags: ["protection", "armor", "energy", "ablative"],
    runtimePackets: [
      { id: "reflective-glazing-resistance", kind: "incomingDamageReduction", value: 2, appliesTo: ["energy"] },
    ],
  },
  {
    section: "Protection Systems",
    name: "Hardened Armor",
    requirement: "Armor > 0",
    effectText: "Armor gains 2 Penetrating Resistance",
    costRisk: "Ablative Module: drops to Resistance 1 at 50% armor remaining; destroyed at 25% armor remaining.",
    tags: ["protection", "armor", "penetrating", "ablative"],
    runtimePackets: [
      { id: "hardened-armor-resistance", kind: "incomingDamageReduction", value: 2, appliesTo: ["penetrating"] },
    ],
  },
  {
    section: "Protection Systems",
    name: "Harjel II",
    requirement: "Ready; Structure remaining < 100%",
    effectText: "At the start of the activation, recover 2 armor damage",
    costRisk: "10 charges then asset destroyed/consumed",
    tags: ["protection", "repair", "harjel"],
    runtimePackets: [
      { id: "harjel-start-repair", kind: "startOfActivationRepair", monitor: "armor", value: 2, charges: 10 },
    ],
  },
  {
    section: "Equipment",
    name: "TAG Designator",
    requirement: "Target at contact or better; Line of Sight - successful TAG action",
    effectText: "Target TAGged - Sensor Locked, generateTargetData against TAGged enemy is a Free Action",
    costRisk: "High Emission (1) while in use, FA to sustain lock",
    installClass: "equipment",
    tags: ["equipment", "tag", "tagDesignator", "sensorLock", "highEmission"],
    capabilities: ["tag", "tagTarget", "tagDesignator"],
    effects: [
      effect("tag-free-targeting-data", "TAG Targeting Data", {
        requires: { actionIds: ["generateTargetData"] },
        grants: { actionOverrides: [{ actionIds: ["generateTargetData"], resource: "free", cost: 0 }] },
      }),
    ],
  },
  {
    section: "Equipment",
    name: "NARC Beacon Launcher",
    requirement: "NARC Attack hits target; beacon attached",
    effectText: "Attack NARC Beacon - NARCed target counts as Sensor Locked only for compatible guided missile systems. Beacon carrier trackingPenalty reduced by 3",
    costRisk: "",
    installClass: "equipment",
    tags: ["equipment", "narc", "beacon", "missile", "sensorLock"],
    capabilities: ["narc", "beacon"],
    rules: [
      rule("narc-beacon-attack", "NARC Beacon Attack", {
        mode: "action",
        selector: { actionIds: ["narcBeaconAttack"] },
        outputs: [
          { type: "actionAvailability", id: "narc-beacon-attack.action", label: "NARC Beacon Attack", actionId: "narcBeaconAttack", enabled: true, reason: "" },
          { type: "queuedDomainRequest", id: "narc-beacon-attack.targeting", label: "NARC Beacon Attack", domain: "targeting", request: { kind: "narcBeacon" } },
        ],
      }),
    ],
  },
  {
    section: "Equipment",
    name: "Jump Booster",
    requirement: "Ready; not Prone/immobile; charge available",
    effectText: "Free Action to jump 180 meters (or add +180 meters to a Jump Move)",
    costRisk: "1 charge, 3 turn recovery; Use generates +1 heat",
    installClass: "equipment",
    tags: ["equipment", "jump", "jumpBooster"],
    mobility: { jumping: jump(180) },
    effects: [
      effect("jump-booster", "Jump Booster", {
        requires: { actionIds: ["jumpMove"] },
        grants: { actionOverrides: [{ actionIds: ["jumpMove"], resource: "free", cost: 0 }] },
        modifies: { movementMeters: 180 },
        costs: { heat: 1, charges: 1 },
        limits: { cooldownTurns: 3 },
      }),
    ],
  },
  {
    section: "Equipment",
    name: "Coolant Pod",
    requirement: "Heat > 0; Coolant systems functional",
    effectText: "Immediately reduce heat, -5 heat",
    costRisk: "Consume on use",
    installClass: "equipment",
    tags: ["equipment", "coolant", "heat"],
    runtimePackets: [
      { id: "coolant-pod-heat-reduction", kind: "currentHeatAdjustment", timing: "activation", value: -5, consumesModule: true },
    ],
  },
  {
    section: "Equipment",
    name: "Carried Combat Shield",
    requirement: "Ready",
    effectText: "+3 DR; Grants Shield Block reaction: reduce incoming damage by 1",
    costRisk: "-5 AR for limb-mounted weapons; 5 Shield Block charges - asset disabled when out of charges",
    installClass: "equipment",
    tags: ["equipment", "shield", "defense"],
    effects: [
      effect("shield-dr", "Combat Shield", {
        modifies: { dr: 3 },
        grants: { reactions: ["shieldBlock"] },
      }),
      effect("limb-weapon-bulk", "Limb Weapon Bulk", {
        requires: { weaponTags: ["limbMounted"] },
        modifies: { ar: -5 },
      }),
    ],
    runtimePackets: [
      { id: "shield-block", kind: "incomingDamageReduction", value: 1, charges: 5 },
    ],
  },
  {
    section: "Equipment",
    name: "Laser Heat Sinks",
    requirement: "Ready; heat sinks functional",
    effectText: "Heat dissipation unaffected by environmental factors",
    costRisk: "Gains High Emission (1) when Heat Status not SAFE",
    installClass: "equipment",
    tags: ["equipment", "heatSink", "thermal", "highEmission"],
    rules: [
      rule("laser-heat-sinks-environment", "Laser Heat Sinks", {
        outputs: [{
          type: "queuedDomainRequest",
          id: "laser-heat-sinks-environment.request",
          label: "Laser Heat Sinks",
          domain: "heatEnvironment",
          request: { ignoreEnvironmentalDissipationPenalty: true },
        }],
      }),
      rule("laser-heat-sinks-emission", "Laser Heat Sinks High Emission", {
        requires: [
          { fact: "module.ready", op: "eq", value: true },
          { fact: "heatBand", op: "truthy" },
        ],
        conditions: [{ fact: "heatBand", op: "neq", value: "safe" }],
        outputs: [{ type: "derivedStatus", id: "laser-heat-sinks-emission.highEmission", label: "Laser Heat Sinks", key: "highEmission", value: 1 }],
      }),
    ],
  },
  {
    section: "Equipment",
    name: "Anti-Missile System",
    requirement: "Incoming missile/cluster attack; charges available",
    effectText: "Missile Cluster Dice hit on 6",
    costRisk: "10 Charges",
    installClass: "equipment",
    tags: ["equipment", "ams", "antiMissile", "cluster"],
    runtimePackets: [
      { id: "ams-intercept", kind: "interceptAttack", appliesTo: ["missile", "cluster"], clusterTargetNumber: 6, charges: 10 },
    ],
  },
  {
    section: "Equipment",
    name: "Laser AMS",
    requirement: "Incoming missile/cluster attack",
    effectText: "Missile Cluster Dice hit on 6",
    costRisk: "Generates +1 heat when used",
    installClass: "equipment",
    tags: ["equipment", "ams", "laserAms", "antiMissile", "cluster"],
    runtimePackets: [
      { id: "laser-ams-intercept", kind: "interceptAttack", appliesTo: ["missile", "cluster"], clusterTargetNumber: 6, heat: 1 },
    ],
  },
];

function idFor(name) {
  return createHash("sha256").update(`mwd-asset-module:${name}`).digest("hex").slice(0, 16);
}

function fileSafe(name) {
  return name.replace(/[^a-zA-Z0-9]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
}

function htmlEscape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function descriptionFor(row) {
  const lines = [
    ["Group", row.section],
    ["Requirement", row.requirement || "None"],
    ["Effect", row.effectText || "None"],
    ["Cost/Risk", row.costRisk || "None"],
  ];
  return `<dl>${lines
    .map(([term, value]) => `<dt>${htmlEscape(term)}</dt><dd>${htmlEscape(value)}</dd>`)
    .join("")}</dl>`;
}

function unique(values) {
  return Array.from(new Set(values.map(value => String(value ?? "").trim()).filter(Boolean)));
}

function documentFor(row, index) {
  const id = idFor(row.name);
  const tags = unique([
    "assetModule",
    row.section,
    ...(row.tags ?? []),
  ]);
  const runtimePackets = row.runtimePackets ?? [];
  const rules = rulesForRow(row);
  return {
    _id: id,
    name: row.name,
    type: "assetModule",
    img: `${SYSTEM_PREFIX}${row.img ?? DEFAULT_IMG}`,
    effects: [],
    folder: null,
    sort: (index + 1) * 100000,
    flags: {},
    system: {
      sourceReference: `${SOURCE} - ${row.section}`,
      description: descriptionFor(row),
      gmnotes: "",
      inactive: false,
      installClass: row.installClass ?? "module",
      category: row.category ?? "special",
      level: row.level ?? 1,
      activation: {
        mode: row.activationMode ?? "passive",
        active: false,
        selectedMode: "",
        cooldownUntilRound: 0,
      },
      effects: row.effects ?? [],
      rules,
      narrativeOnly: rules.length === 0 && (row.effects ?? []).length === 0 && runtimePackets.length === 0,
      runtime: { packets: runtimePackets },
      mobility: {
        jumping: row.mobility?.jumping ?? {
          enabled: false,
          movement: 0,
          heat: 0,
          attackRatingBonus: 0,
          defenseRatingBonus: 0,
          dfaEnabled: false,
        },
      },
      targeting: {
        ...(row.targeting ?? {}),
        clustering: row.targeting?.clustering ?? {
          diceModifier: 0,
          targetNumberModifier: 0,
        },
      },
      requirement: row.requirement ?? "",
      effectText: row.effectText ?? "",
      costRisk: row.costRisk ?? "",
      tags,
      capabilities: unique(row.capabilities ?? []),
    },
    ownership: {
      default: 0,
    },
    _key: `!items!${id}`,
  };
}

async function emptyDirectory(directory) {
  await fs.mkdir(directory, { recursive: true });
  const entries = await fs.readdir(directory, { withFileTypes: true });
  await Promise.all(entries.map(entry => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory()
      ? fs.rm(target, { recursive: true, force: true })
      : fs.unlink(target);
  }));
}

async function generateSource() {
  await emptyDirectory(OUT_DIR);

  await Promise.all(rows.map(async (row, index) => {
    const doc = documentFor(row, index);
    const fileName = `items_${fileSafe(doc.name)}_${doc._id}.yml`;
    await fs.writeFile(
      path.join(OUT_DIR, fileName),
      `${JSON.stringify(doc, null, 2)}\n`,
      "utf8",
    );
  }));

  console.log(`Generated ${rows.length} asset module items in ${path.relative(process.cwd(), OUT_DIR)}`);
}

async function packPublic() {
  await generateSource();
  await fs.mkdir(PACK_DIR, { recursive: true });
  await compilePack(OUT_DIR, PACK_DIR, { yaml: true });
  console.log(`Packed asset modules to ${path.relative(process.cwd(), PACK_DIR)}`);
}

if (process.argv.includes("--pack-public")) {
  await packPublic();
} else {
  await generateSource();
}
