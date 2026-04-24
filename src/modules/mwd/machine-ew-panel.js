// src/modules/mwd/machine-ew-panel.js
// Purpose: Build a shared sheet view model for machine EW status and actions.
// How it fits: Keeps EW state derivation in one place so vehicle and BattleMech sheets stay thin.

import { getDetectionStateLabel, getTargetingDataCap } from "./machine-ew.js";
import { getMechRangeBandName, selectMechRangeBand } from "./personal-range-bands.js";
import { formatDistanceLabel, measureTokenDistance } from "./token-measurement.js";
import {
  getAcquireCeiling,
  getAttackerCombatant,
  getDetectionState,
  getTargetCombatant,
  getTrackingPenalty,
  getUsableTargetingPacket,
} from "./machine-ew-state.js";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function toTargets(targets) {
  return Array.from(targets ?? globalThis.game?.user?.targets ?? []).filter(target => target?.actor);
}

function buildAcquireHint({ detectionState = "blind", canAcquire = false, ceiling = "lock" } = {}) {
  if (detectionState === "blind") return "Acquire can establish Contact (DN 1).";
  if (detectionState === "contact") return "Acquire can upgrade to Track.";
  if (detectionState === "track" && canAcquire) return "Acquire can upgrade to Lock.";
  if (detectionState === "track" && ceiling === "track") return "ECM prevents advancing beyond Track.";
  if (detectionState === "lock") return "Targeting solution optimized.";
  return "Review target state before acquiring.";
}

function buildTargetHint({ detectionState = "blind", lockGated = false } = {}) {
  if (detectionState === "blind" || detectionState === "contact") return "Targeting Data unavailable until Track.";
  if (detectionState === "track") return "Targeting Data available.";
  if (detectionState === "lock" && lockGated) return "Targeting solution optimized.";
  return "Targeting solution available.";
}

function buildAcquireAction({ canAcquire = false, detectionState = "blind", acquireHint = "" } = {}) {
  if (canAcquire) {
    return {
      enabled: true,
      label: "Acquire",
      title: acquireHint,
    };
  }

  if (detectionState === "lock") {
    return {
      enabled: false,
      label: "Acquire",
      title: "Target is already at Lock.",
    };
  }

  return {
    enabled: false,
    label: "Acquire",
    title: "Acquire is not available for this target right now.",
  };
}

function buildTargetAction({ canTarget = false, targetHint = "" } = {}) {
  return {
    enabled: canTarget,
    label: "Target",
    title: canTarget
      ? targetHint
      : "Track or Lock is required before generating targeting data.",
  };
}

function buildMeasuredRange(sourceToken = null, targetToken = null) {
  const distance = measureTokenDistance(sourceToken, targetToken);
  if (!Number.isFinite(distance)) {
    return {
      distance: null,
      distanceLabel: "",
      band: "",
      bandLabel: "",
      hasRange: false,
    };
  }

  const units = String(globalThis.canvas?.scene?.grid?.units ?? globalThis.game?.system?.grid?.units ?? "").trim();
  const band = selectMechRangeBand(distance, "close");
  return {
    distance,
    distanceLabel: formatDistanceLabel(distance, units),
    band,
    bandLabel: getMechRangeBandName(band),
    hasRange: true,
  };
}

export function buildMachineEwRow({
  targetToken,
  sourceToken = null,
  combatant,
  systemAttr = 0,
  currentRound = null,
} = {}) {
  if (!targetToken?.actor) return null;

  const targetTokenUuid = targetToken.document?.uuid ?? targetToken.uuid ?? "";
  const targetTokenId = String(targetToken.id ?? targetToken.document?.id ?? "").trim();
  const detectionState = getDetectionState(combatant, targetTokenUuid);
  const ceiling = getAcquireCeiling(targetToken.actor);
  const targetCombatant = getTargetCombatant(targetTokenId);
  const trackingPenalty = getTrackingPenalty(targetToken.actor, targetCombatant);
  const packetCap = (detectionState === "track" || detectionState === "lock")
    ? getTargetingDataCap(systemAttr, detectionState)
    : null;
  const packet = (detectionState === "track" || detectionState === "lock")
    ? getUsableTargetingPacket(combatant, targetTokenUuid, systemAttr, detectionState, currentRound)
    : null;

  const canAcquire = detectionState === "blind" || detectionState === "contact" || (detectionState === "track" && ceiling === "lock");
  const canTarget = detectionState === "track" || detectionState === "lock";
  const lockGated = detectionState === "lock";
  const acquireHint = buildAcquireHint({ detectionState, canAcquire, ceiling });
  const targetHint = buildTargetHint({ detectionState, lockGated });
  const measuredRange = buildMeasuredRange(sourceToken, targetToken);

  return {
    tokenName: targetToken.name ?? "Target",
    targetTokenId,
    targetTokenUuid,
    detectionState,
    detectionStateLabel: getDetectionStateLabel(detectionState),
    packetValue: packet?.value ?? 0,
    hasPacket: Boolean(packet),
    packetCap,
    hasPacketCap: packetCap !== null,
    trackingPenalty,
    hasTrackingPenalty: trackingPenalty > 0,
    rangeBand: measuredRange.band,
    rangeBandLabel: measuredRange.bandLabel,
    distance: measuredRange.distance,
    distanceLabel: measuredRange.distanceLabel,
    hasRange: measuredRange.hasRange,
    canAcquire,
    canTarget,
    acquireHint,
    targetHint,
    acquireAction: buildAcquireAction({ canAcquire, detectionState, acquireHint }),
    targetAction: buildTargetAction({ canTarget, targetHint }),
  };
}

export function resolveMachineEwActionTarget(panel, intent = "") {
  const rows = Array.isArray(panel?.rows) ? panel.rows : [];
  const key = String(intent ?? "").trim() === "targeting" ? "canTarget" : "canAcquire";
  return rows.find(row => Boolean(row?.[key])) ?? null;
}

export function buildMachineEwPanel({
  actor,
  token,
  targets,
  currentRound = null,
} = {}) {
  const combatant = getAttackerCombatant(token);
  const systemAttr = toNumber(actor?.system?.attributes?.system?.value, 0);
  const round = currentRound ?? globalThis.game?.combat?.round ?? null;
  const rows = toTargets(targets)
    .map(targetToken => buildMachineEwRow({
      targetToken,
      sourceToken: token,
      combatant,
      systemAttr,
      currentRound: round,
    }))
    .filter(Boolean);

  const hasTargets = rows.length > 0;

  return {
    hasTargets,
    rows,
    canAcquireAny: rows.some(row => row.canAcquire),
    canTargetAny: rows.some(row => row.canTarget),
    emptyState: "Target one or more tokens on the canvas to review EW status.",
    helpText: hasTargets
      ? "Detection state is tracked per targeted machine. Use each row's Acquire or Target button."
      : "Select targets on the canvas to review EW state and launch Acquire or Target per machine.",
  };
}
