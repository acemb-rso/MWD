// src/modules/mwd/machine-ew-panel.js
// Purpose: Build the machine EW sheet panel view model.
// Workflow: active-encounter sensor-eligible tokens and combatant EW flags ->
// masked row/action model with range, packet, and capability data ->
// vehicle/BattleMech sheets render it. Rows do not require canvas targeting;
// detection state decides how much each row reveals.
// Invariant: the panel is a projection. Acquire/targeting legality is enforced
// by the resolvers; row gating here mirrors the same machine-state services.

import { getAcquireBaseDn, getDetectionStateLabel, getTargetingDataCap } from "./machine-ew.js";
import { getMechRangeBandName, selectMechRangeBand } from "./personal-range-bands.js";
import { formatDistanceLabel, measureTokenDistance } from "./token-measurement.js";
import {
  getAcquireCeiling,
  getAttackerCombatant,
  getEffectiveDetectionState,
  getTargetCombatant,
  getTrackingPenalty,
  getUsableTargetingPacket,
} from "./machine-ew-state.js";
import {
  isMachineSensorActionBlocked,
  isMachineSensorBlind,
  isMachineTargetingGenerationBlocked,
} from "./machine-state-effects.js";
import { collectMachineEwEncounterTargets } from "./machine-sensor-eligibility.js";
import { getBattleArmorMachineTargetProfile } from "./battle-armor.js";
import { hasAssetModuleCapability } from "./asset-module-effects.js";
import { getMountedMachineItems, hasMachineWeaponKeyword } from "./machine-hardpoints.js";
import { actorHasSpotterGear } from "./spotter-gear.js";

const UNKNOWN_CONTACT_LABEL = "Unknown Contact";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function toTargets(targets) {
  return Array.from(targets ?? []).filter(target => target?.actor);
}

function indexToContactLetters(index = 0) {
  // Spreadsheet-style letters (A..Z, AA..) keyed to the id-sorted row order so
  // labels stay stable within a view and never mirror initiative order.
  let value = Math.max(0, Math.trunc(index));
  let letters = "";
  do {
    letters = String.fromCharCode(65 + (value % 26)) + letters;
    value = Math.trunc(value / 26) - 1;
  } while (value >= 0);
  return letters;
}

function getUserTargetTokenKeys() {
  const keys = new Set();
  for (const target of globalThis.game?.user?.targets ?? []) {
    const id = String(target?.id ?? target?.document?.id ?? "").trim();
    const uuid = String(target?.document?.uuid ?? target?.uuid ?? "").trim();
    if (id) keys.add(id);
    if (uuid) keys.add(uuid);
  }
  return keys;
}

function buildObserverGates(actor = null) {
  const sensorActionsBlocked = isMachineSensorActionBlocked(actor);
  const sensorBlind = isMachineSensorBlind(actor);
  return {
    sensorActionsBlocked,
    sensorBlind,
    targetingGenerationBlocked: isMachineTargetingGenerationBlocked(actor),
  };
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

function buildAcquireAction({ canAcquire = false, detectionState = "blind", acquireHint = "", blockReason = "" } = {}) {
  if (canAcquire) {
    return {
      enabled: true,
      label: "Acquire",
      title: acquireHint,
    };
  }

  if (blockReason) {
    return {
      enabled: false,
      label: "Acquire",
      title: blockReason,
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

function buildTargetAction({ canTarget = false, targetHint = "", blockReason = "" } = {}) {
  return {
    enabled: canTarget,
    label: "Target",
    title: canTarget
      ? targetHint
      : blockReason || "Track or Lock is required before generating targeting data.",
  };
}

function hasMountedWeaponWithKeyword(actor, keyword) {
  return getMountedMachineItems(actor, { canonicalType: "mechWeapon" })
    .filter(w => w.isActive?.() !== false)
    .some(w => hasMachineWeaponKeyword(w, keyword));
}

export function getMachineEwAssetCapabilities(actor = null) {
  return {
    tag: hasMountedWeaponWithKeyword(actor, "tag"),
    narc: hasMountedWeaponWithKeyword(actor, "narc"),
    c3: hasAssetModuleCapability(actor, "c3", ["c3i", "network", "shareTargetingData"]),
    indirectSpotter: actorHasSpotterGear(actor),
  };
}

function buildCompactActions({
  row = {},
  detectionState = "blind",
  canAcquire = false,
  canTarget = false,
  acquireHint = "",
  targetHint = "",
  acquireBlockReason = "",
  targetingBlockReason = "",
  sensorActionsBlocked = false,
  capabilities = {},
} = {}) {
  // Compact actions are intentionally row-local: every button carries the target
  // token identifiers needed by quick-action handlers.
  const hasTag = Boolean(capabilities.tag);
  const sensorBlockTitle = "Sensor actions are blocked by the machine's current state.";
  return [
    {
      id: "acquire",
      action: "ewAcquire",
      label: "Acquire",
      icon: "fa-satellite-dish",
      dn: getAcquireBaseDn(detectionState),
      enabled: canAcquire,
      title: canAcquire ? acquireHint : (acquireBlockReason || "Acquire is not available for this target right now."),
    },
    {
      id: "target",
      action: "ewTarget",
      label: "Target",
      icon: "fa-crosshairs",
      dn: 2,
      enabled: canTarget,
      title: canTarget ? targetHint : (targetingBlockReason || "Track or Lock is required before generating targeting data."),
    },
    {
      id: "ecmSpike",
      action: "machineEwAction",
      actionId: "ecmSpike",
      label: "Spike",
      icon: "fa-bolt",
      dn: 1,
      enabled: !sensorActionsBlocked,
      title: sensorActionsBlocked ? sensorBlockTitle : "Launch an ECM Spike roll against this target.",
    },
    {
      id: "tagTarget",
      action: "machineEwAction",
      actionId: "tagTarget",
      label: "TAG",
      icon: "fa-location-crosshairs",
      dn: 1,
      enabled: hasTag && !sensorActionsBlocked,
      title: sensorActionsBlocked
        ? sensorBlockTitle
        : hasTag ? "Launch a TAG roll against this target." : "Requires an installed TAG asset module.",
    },
  ].map(action => ({
    ...action,
    targetTokenId: row.targetTokenId,
    targetTokenUuid: row.targetTokenUuid,
  }));
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
  actor = null,
  targetToken,
  sourceToken = null,
  combatant,
  systemAttr = 0,
  currentRound = null,
  capabilities = null,
  observerGates = null,
  unknownLabel = UNKNOWN_CONTACT_LABEL,
} = {}) {
  // EW rows join combatant targeting state, measured canvas range, target
  // defensive modifiers, observer degradation gates, and asset capabilities
  // into one sheet view model. Detection state decides what the row reveals.
  if (!targetToken?.actor) return null;

  const targetTokenUuid = targetToken.document?.uuid ?? targetToken.uuid ?? "";
  const targetTokenId = String(targetToken.id ?? targetToken.document?.id ?? "").trim();
  const sourceTokenUuid = String(sourceToken?.document?.uuid ?? sourceToken?.uuid ?? "").trim();
  const measuredRange = buildMeasuredRange(sourceToken, targetToken);
  const battleArmorTargetOptions = {
    rangeBand: measuredRange.band,
    friendlyMachineTokenUuid: sourceTokenUuid,
  };
  const detectionState = getEffectiveDetectionState(combatant, targetTokenUuid, targetToken.actor);
  const ceiling = getAcquireCeiling(targetToken.actor, battleArmorTargetOptions);
  const targetCombatant = getTargetCombatant(targetTokenId);
  const trackingPenalty = getTrackingPenalty(targetToken.actor, targetCombatant, battleArmorTargetOptions);
  const battleArmorTargetProfile = getBattleArmorMachineTargetProfile(targetToken.actor, battleArmorTargetOptions);
  const packetCap = (detectionState === "track" || detectionState === "lock")
    ? getTargetingDataCap(systemAttr, detectionState)
    : null;
  const packet = (detectionState === "track" || detectionState === "lock")
    ? getUsableTargetingPacket(combatant, targetTokenUuid, systemAttr, detectionState, currentRound)
    : null;

  const gates = observerGates ?? buildObserverGates(actor);
  // Sensor Blind mirrors the canvas rule: no live feed beyond Close, and an
  // unmeasurable range counts as beyond Close.
  const beyondClose = !measuredRange.hasRange || measuredRange.band !== "close";
  const liveFeedAvailable = !(gates.sensorBlind && beyondClose);

  const baseCanAcquire = detectionState === "blind" || detectionState === "contact" || (detectionState === "track" && ceiling === "lock");
  const baseCanTarget = detectionState === "track" || detectionState === "lock";

  const acquireBlockReason = gates.sensorActionsBlocked
    ? "Acquire unavailable: sensor actions disabled."
    : (gates.sensorBlind && beyondClose)
      ? "Sensor Blind: acquisition limited to Close range."
      : "";
  const targetingBlockReason = gates.sensorActionsBlocked
    ? "Fire solutions unavailable: sensor actions disabled."
    : gates.targetingGenerationBlocked
      ? (gates.sensorBlind
        ? "Sensor Blind: targeting data cannot be generated."
        : "Targeting data generation is blocked by the machine's current state.")
      : "";
  const canAcquire = baseCanAcquire && !acquireBlockReason;
  const canTarget = baseCanTarget && !targetingBlockReason;

  const identityMasked = detectionState === "blind";
  const distanceVisible = measuredRange.hasRange && !identityMasked;
  const exactDistanceVisible = distanceVisible && (detectionState === "track" || detectionState === "lock");
  const detectionStateLabel = getDetectionStateLabel(detectionState);
  const liveFeedNotice = !liveFeedAvailable && !identityMasked
    ? `${detectionStateLabel} retained — live sensor feed unavailable.`
    : "";
  const displayName = identityMasked ? unknownLabel : (targetToken.name ?? "Target");

  const lockGated = detectionState === "lock";
  const ewCapabilities = capabilities ?? getMachineEwAssetCapabilities(actor);
  const acquireHint = buildAcquireHint({ detectionState, canAcquire: baseCanAcquire, ceiling });
  const targetHint = buildTargetHint({ detectionState, lockGated });
  const row = {
    // tokenName carries the masked name so every panel consumer masks alike.
    tokenName: displayName,
    displayName,
    identityMasked,
    targetTokenId,
    targetTokenUuid,
    detectionState,
    detectionStateLabel,
    packetValue: packet?.value ?? 0,
    hasPacket: Boolean(packet),
    packetCap,
    hasPacketCap: packetCap !== null,
    trackingPenalty,
    hasTrackingPenalty: trackingPenalty > 0 && exactDistanceVisible,
    battleArmorTargetProfile,
    battleArmorFriendlyFireRisk: Boolean(battleArmorTargetProfile?.friendlyFireRisk),
    rangeBand: measuredRange.band,
    rangeBandLabel: measuredRange.bandLabel,
    distance: measuredRange.distance,
    distanceLabel: measuredRange.distanceLabel,
    hasRange: measuredRange.hasRange,
    distanceVisible,
    exactDistanceVisible,
    liveFeedAvailable,
    liveFeedNotice,
    canAcquire,
    canTarget,
    acquireHint,
    targetHint,
    acquire: { enabled: canAcquire, reason: canAcquire ? "" : (acquireBlockReason || acquireHint) },
    targeting: { enabled: canTarget, reason: canTarget ? "" : (targetingBlockReason || targetHint) },
    acquireAction: buildAcquireAction({ canAcquire, detectionState, acquireHint, blockReason: acquireBlockReason }),
    targetAction: buildTargetAction({ canTarget, targetHint, blockReason: targetingBlockReason }),
  };
  row.compactActions = buildCompactActions({
    row,
    detectionState,
    canAcquire,
    canTarget,
    acquireHint,
    targetHint,
    acquireBlockReason,
    targetingBlockReason,
    sensorActionsBlocked: gates.sensorActionsBlocked,
    capabilities: ewCapabilities,
  });
  return row;
}

export function resolveMachineEwActionTarget(panel, intent = "") {
  const rows = Array.isArray(panel?.rows) ? panel.rows : [];
  const normalized = String(intent ?? "").trim();
  const key = normalized === "targeting" || normalized === "generateFireSolution"
    ? "canTarget"
    : "canAcquire";
  const eligible = rows.filter(row => Boolean(row?.[key]));
  // Canvas targeting is optional but still meaningful: a user-targeted row wins
  // over the deterministic first eligible encounter row.
  const targetedKeys = getUserTargetTokenKeys();
  return eligible.find(row => targetedKeys.has(row?.targetTokenId) || targetedKeys.has(row?.targetTokenUuid))
    ?? eligible[0]
    ?? null;
}

export function buildMachineEwPanel({
  actor,
  token,
  targets,
  currentRound = null,
  combat,
} = {}) {
  // The panel does no writes. Rows come from the active encounter's
  // sensor-eligible tokens (explicit `targets` is a test/preview override), so
  // players always have an acquisition affordance without canvas targeting.
  const combatant = getAttackerCombatant(token);
  const systemAttr = toNumber(actor?.system?.attributes?.system?.value, 0);
  const combatRef = combat ?? globalThis.game?.combat ?? null;
  const round = currentRound ?? combatRef?.round ?? null;
  const capabilities = getMachineEwAssetCapabilities(actor);
  const observerGates = buildObserverGates(actor);
  const targetTokens = targets !== undefined
    ? toTargets(targets)
    : collectMachineEwEncounterTargets({ observerToken: token, combat: combatRef });
  const rows = targetTokens
    .map((targetToken, index) => buildMachineEwRow({
      actor,
      targetToken,
      sourceToken: token,
      combatant,
      systemAttr,
      currentRound: round,
      capabilities,
      observerGates,
      unknownLabel: `${UNKNOWN_CONTACT_LABEL} ${indexToContactLetters(index)}`,
    }))
    .filter(Boolean);

  const hasTargets = rows.length > 0;
  const observerNotice = observerGates.sensorActionsBlocked
    ? "Sensor actions are blocked by the machine's current state."
    : observerGates.sensorBlind
      ? "Sensor Blind: sensor operations limited to Close range; no targeting data."
      : "";

  return {
    hasTargets,
    rows,
    capabilities,
    sensorActionsBlocked: observerGates.sensorActionsBlocked,
    sensorBlind: observerGates.sensorBlind,
    observerNotice,
    canAcquireAny: rows.some(row => row.canAcquire),
    canTargetAny: rows.some(row => row.canTarget),
    emptyState: combatRef
      ? "No eligible hostile contacts in the current encounter."
      : "No active encounter. Hostile contacts appear here when combat begins.",
    helpText: hasTargets
      ? "Detection state is tracked per hostile contact. Use row buttons for the automated Acquire and Fire Solution actions."
      : "Hostile machine combatants appear here during an encounter, ready for target-specific EW actions.",
  };
}
