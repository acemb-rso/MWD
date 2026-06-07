// src/modules/combat/combat-awareness-preview.js
// Purpose: Builds a display-only combat awareness read model for actor sheets.
// How it fits: Sheets render known AR/DR, target, DN, motion, and EW context
// without resolving an attack or consuming any combat resources.

import { TEMPLATE, startCase } from "../constants.js";
import { getAssetModuleCqEffects } from "../mwd/asset-module-effects.js";
import {
  buildMachineAttackMotionContext,
  isMachineActor,
} from "../mwd/machine-attack-motion.js";
import {
  getDetectionStateLabel,
} from "../mwd/machine-ew.js";
import {
  getAttackerCombatant,
  getDetectionState,
  getTargetCombatant,
  getTrackingPenalty,
  getUsableTargetingPacket,
} from "../mwd/machine-ew-state.js";
import { getMachineAttackCqAdjustments } from "../mwd/machine-state-effects.js";
import {
  getMechRangeBandBaseDn,
  getMechRangeBandName,
  selectMechRangeBand,
} from "../mwd/personal-range-bands.js";
import { formatDistanceLabel, measureTokenDistance } from "../mwd/token-measurement.js";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function formatSignedValue(value = 0) {
  const numeric = toNumber(value, 0);
  return numeric >= 0 ? `+${numeric}` : String(numeric);
}

function buildPart({ id = "", label = "", value = 0, title = "", source = "" } = {}) {
  const numericValue = toNumber(value, 0);
  return {
    id: String(id ?? "").trim(),
    label: String(label ?? "").trim() || "Modifier",
    value: numericValue,
    valueLabel: formatSignedValue(numericValue),
    title: String(title ?? "").trim(),
    source: String(source ?? "").trim(),
  };
}

function sumParts(parts = []) {
  return parts.reduce((sum, part) => sum + toNumber(part?.value, 0), 0);
}

function getTokenId(token = null) {
  return String(token?.id ?? token?.document?.id ?? token?.tokenId ?? "").trim();
}

function getTokenUuid(token = null) {
  return String(token?.document?.uuid ?? token?.uuid ?? "").trim();
}

function getTokenActor(token = null) {
  return token?.actor ?? token?.document?.actor ?? null;
}

function getTokenName(token = null) {
  return String(token?.name ?? token?.document?.name ?? getTokenActor(token)?.name ?? "Target").trim() || "Target";
}

function getSourceToken(actor = null, explicitToken = null) {
  const token = explicitToken?.object ?? explicitToken ?? null;
  if (token) return token;
  return globalThis.canvas?.tokens?.controlled?.find(candidate => candidate?.actor?.id === actor?.id)
    ?? actor?.getActiveTokens?.(true, true)?.[0]
    ?? null;
}

function getUserTargetTokens(user = globalThis.game?.user) {
  return Array.from(user?.targets ?? [])
    .map(token => token?.object ?? token)
    .filter(token => token && getTokenActor(token));
}

function getAttributeValue(actor = null, key = "") {
  const normalizedKey = String(key ?? "").trim();
  if (!normalizedKey) return 0;
  return Math.max(0, toNumber(
    actor?.getAttributeValue?.(normalizedKey)
      ?? actor?.system?.attributes?.[normalizedKey]?.value,
    0
  ));
}

function getActiveArmorState(actor = null) {
  const loadout = actor?.getPersonalCombatLoadout?.() ?? null;
  return loadout?.activeArmor ?? null;
}

function getArmorDefense(actor = null) {
  const armor = getActiveArmorState(actor);
  if (!armor || armor.isDestroyed) return 0;
  return Math.max(0, toNumber(armor.defenseBonus, 0));
}

function buildActorDefenseBase(actor = null, { labelPrefix = "Target" } = {}) {
  if (!actor) return [];
  const actorIsMachine = isMachineActor(actor);
  const attrKey = actorIsMachine ? TEMPLATE.actorAttributes.handling : "reflexes";
  const attrValue = getAttributeValue(actor, attrKey);
  return [
    buildPart({
      id: actorIsMachine ? `${labelPrefix.toLowerCase()}.handlingDefense` : `${labelPrefix.toLowerCase()}.reflexesDefense`,
      label: actorIsMachine ? `${labelPrefix} Handling + Handling` : `${labelPrefix} REF + REF`,
      value: attrValue + attrValue,
    }),
  ];
}

function buildActorArmorDefense(actor = null, { labelPrefix = "Target" } = {}) {
  const armorDefenseValue = getArmorDefense(actor);
  return armorDefenseValue
    ? [buildPart({ id: `${labelPrefix.toLowerCase()}.armorDefense`, label: "Armor Defense", value: armorDefenseValue })]
    : [];
}

function buildSelfAwareness(actor = null, { rangeBand = "" } = {}) {
  const arParts = [];
  const drParts = [];
  const drBase = buildActorDefenseBase(actor, { labelPrefix: "Self" });
  const armorDefense = buildActorArmorDefense(actor, { labelPrefix: "Self" });

  if (isMachineActor(actor)) {
    const attackerCq = getMachineAttackCqAdjustments(actor, { rangeBand, role: "attacker" });
    if (attackerCq.ar) {
      arParts.push(buildPart({
        id: "machineState.attackAr",
        label: "Machine State",
        value: attackerCq.ar,
      }));
    }

    const defenderCq = getMachineAttackCqAdjustments(actor, { rangeBand, role: "defender" });
    if (defenderCq.dr) {
      drParts.push(buildPart({
        id: "machineState.defenseDr",
        label: "Machine State",
        value: defenderCq.dr,
      }));
    }

    for (const effect of getAssetModuleCqEffects(actor, {
      payload: { intent: "attack" },
      resolved: { intent: "attack" },
    })) {
      const ar = toNumber(effect.modifies?.ar, 0);
      const dr = toNumber(effect.modifies?.dr, 0);
      if (ar) {
        arParts.push(buildPart({
          id: `assetModule.${effect.sourceId}.${effect.id}.ar`,
          label: effect.label,
          value: ar,
          source: effect.sourceName,
        }));
      }
      if (dr) {
        drParts.push(buildPart({
          id: `assetModule.${effect.sourceId}.${effect.id}.dr`,
          label: effect.label,
          value: dr,
          source: effect.sourceName,
        }));
      }
    }
  }

  const arTotal = sumParts(arParts);
  const drTotal = sumParts(drParts);
  const drKnownTotal = sumParts(drBase) + sumParts(armorDefense) + drTotal;

  return {
    arMods: arParts,
    arTotal,
    arTotalLabel: formatSignedValue(arTotal),
    drBase,
    armorDefense,
    drMods: drParts,
    drTotal,
    drTotalLabel: formatSignedValue(drTotal),
    drKnownTotal,
    drKnownTotalLabel: formatSignedValue(drKnownTotal),
  };
}

function buildTargetDefenseBase(targetActor = null) {
  return buildActorDefenseBase(targetActor, { labelPrefix: "Target" });
}

function buildTargetAwareness(targetToken = null, { rangeBand = "" } = {}) {
  const targetActor = getTokenActor(targetToken);
  if (!targetActor) return null;

  const defenseBase = buildTargetDefenseBase(targetActor);
  const armorDefense = buildActorArmorDefense(targetActor, { labelPrefix: "Target" });
  const drMods = [];

  if (isMachineActor(targetActor)) {
    const cq = getMachineAttackCqAdjustments(targetActor, { rangeBand, role: "defender" });
    if (cq.dr) {
      drMods.push(buildPart({
        id: "machineState.defenseDr",
        label: "Machine State",
        value: cq.dr,
      }));
    }

    for (const effect of getAssetModuleCqEffects(targetActor, {
      payload: { intent: "attack" },
      resolved: { intent: "attack" },
    })) {
      const dr = toNumber(effect.modifies?.dr, 0);
      if (!dr) continue;
      drMods.push(buildPart({
        id: `assetModule.${effect.sourceId}.${effect.id}.dr`,
        label: effect.label,
        value: dr,
        source: effect.sourceName,
      }));
    }
  }

  const drTotalKnown = sumParts(defenseBase) + sumParts(armorDefense) + sumParts(drMods);
  return {
    name: getTokenName(targetToken),
    actorType: String(targetActor?.type ?? "").trim(),
    actorTypeLabel: startCase(targetActor?.type ?? ""),
    defenseBase,
    armorDefense,
    drMods,
    drTotalKnown,
    drTotalKnownLabel: formatSignedValue(drTotalKnown),
  };
}

function buildMachineContext(actor = null, sourceToken = null, targetToken = null) {
  if (!isMachineActor(actor) || !targetToken) return null;

  const targetActor = getTokenActor(targetToken);
  const distance = measureTokenDistance(sourceToken, targetToken);
  const units = String(globalThis.canvas?.scene?.grid?.units ?? globalThis.game?.system?.grid?.units ?? "").trim();
  const rangeBand = Number.isFinite(distance) ? selectMechRangeBand(distance, "close") : "close";
  const rangeBandLabel = getMechRangeBandName(rangeBand);
  const rangeDnValue = getMechRangeBandBaseDn(rangeBand, 1);
  const targetTokenId = getTokenId(targetToken);
  const targetTokenUuid = getTokenUuid(targetToken);
  const targetCombatant = getTargetCombatant(targetTokenId);
  const attackerCombatant = getAttackerCombatant(sourceToken);
  const motion = buildMachineAttackMotionContext({
    attackerCombatant,
    targetActor,
    targetCombatant,
    payload: {},
  });
  const detectionState = attackerCombatant && targetTokenUuid
    ? getDetectionState(attackerCombatant, targetTokenUuid)
    : "";
  const systemAttr = getAttributeValue(actor, TEMPLATE.actorAttributes.system);
  const usablePacket = attackerCombatant && targetTokenUuid
    ? getUsableTargetingPacket(attackerCombatant, targetTokenUuid, systemAttr, detectionState, globalThis.game?.combat?.round)
    : null;
  const ewTrackingPenalty = getTrackingPenalty(targetActor, targetCombatant);
  const trackingPenalty = [];

  if (ewTrackingPenalty) {
    trackingPenalty.push(buildPart({
      id: "ew.trackingPenalty",
      label: "Tracking Penalty",
      value: -ewTrackingPenalty,
      source: "EW",
    }));
  }
  if (motion.movementTrackingPenalty) {
    trackingPenalty.push(buildPart({
      id: "machineMotion.tracking",
      label: `Target Movement (${Number(motion.trackingHexes ?? 0)} hex)`,
      value: motion.movementTrackingPenalty,
      source: "Motion",
    }));
  }
  if (motion.jumpTrackingPenalty) {
    trackingPenalty.push(buildPart({
      id: "machineMotion.jumpTracking",
      label: "Target Jumped",
      value: motion.jumpTrackingPenalty,
      source: "Motion",
    }));
  }

  const motionLabels = [
    motion.attackerMotionLabel && motion.attackerMotion !== "stationary" ? `Attacker: ${motion.attackerMotionLabel}` : "",
    motion.targetMotionLabel ? `Motion: ${motion.targetMotionLabel}` : "",
    Number.isFinite(distance) ? `Range: ${formatDistanceLabel(distance, units)}` : "",
    motion.trackingHexes ? `Tracking: ${motion.trackingHexes} hex` : "",
    motion.jumped ? "Jumped" : "",
  ].filter(Boolean);
  const rangeDn = [buildPart({ id: "difficulty.current", label: `Base DN (${rangeBandLabel})`, value: rangeDnValue })];
  const motionDn = [
    motion.attackerMotionDn ? buildPart({ id: "machineMotion.attacker", label: `Attacker Motion (${motion.attackerMotionLabel})`, value: motion.attackerMotionDn }) : null,
    motion.motionDn ? buildPart({ id: "machineMotion.actions", label: `Target Motion (${motion.targetMotionLabel})`, value: motion.motionDn }) : null,
    motion.jumpDn ? buildPart({ id: "machineMotion.jump", label: "Target Jumped", value: motion.jumpDn }) : null,
  ].filter(Boolean);
  const dnTotal = sumParts(rangeDn) + sumParts(motionDn);

  return {
    rangeBand,
    rangeBandLabel,
    distance,
    distanceLabel: Number.isFinite(distance) ? formatDistanceLabel(distance, units) : "",
    rangeDn,
    motionDn,
    dnTotal,
    dnTotalLabel: String(dnTotal),
    trackingPenalty,
    trackingPenaltyTotal: sumParts(trackingPenalty),
    trackingPenaltyTotalLabel: formatSignedValue(sumParts(trackingPenalty)),
    detectionState,
    detectionStateLabel: detectionState ? getDetectionStateLabel(detectionState) : "",
    targetingDataSummary: usablePacket ? `+${Number(usablePacket.value ?? 0)} available` : "None available",
    motionLabels,
  };
}

export function buildCombatAwarenessPreview(actor = null, {
  sourceToken = null,
  targetTokens = null,
  user = globalThis.game?.user,
} = {}) {
  const targets = Array.isArray(targetTokens)
    ? targetTokens.filter(token => token && getTokenActor(token))
    : getUserTargetTokens(user);
  const targetState = targets.length === 0 ? "none" : targets.length === 1 ? "single" : "multiple";
  const source = getSourceToken(actor, sourceToken);
  const singleTarget = targetState === "single" ? targets[0] : null;
  const machineContext = singleTarget ? buildMachineContext(actor, source, singleTarget) : null;
  const rangeBand = machineContext?.rangeBand ?? "";
  const self = buildSelfAwareness(actor, { rangeBand });
  const target = singleTarget ? buildTargetAwareness(singleTarget, { rangeBand }) : null;
  const warnings = [];

  if (targetState === "none") warnings.push("Select one target for DN, tracking, and target defense.");
  if (targetState === "multiple") warnings.push("Select one target for detailed CQ awareness.");
  if (singleTarget && isMachineActor(actor) && !source) warnings.push("Select or open a scene token for machine range and EW context.");

  return {
    targetState,
    self,
    target,
    machineContext,
    warnings,
  };
}
