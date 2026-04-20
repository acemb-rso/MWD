// src/modules/mwd/machine-ew-panel.js
// Purpose: Build a shared sheet view model for machine EW status and actions.
// How it fits: Keeps EW state derivation in one place so vehicle and BattleMech sheets stay thin.

import { getContactStateLabel, getTargetingDataCap } from "./machine-ew.js";
import {
  getAcquireCeiling,
  getAttackerCombatant,
  getContactState,
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

function buildAcquireHint({ contactState = "blind", canAcquire = false, ceiling = "lock" } = {}) {
  if (contactState === "blind") return "No targeting solution. Acquire contact first.";
  if (contactState === "contact") return "Acquire can upgrade to Track.";
  if (contactState === "track" && canAcquire) return "Acquire can upgrade to Lock.";
  if (contactState === "track" && ceiling === "track") return "ECM prevents advancing beyond Track.";
  if (contactState === "lock") return "Targeting solution optimized.";
  return "Review target state before acquiring.";
}

function buildTargetHint({ contactState = "blind", lockGated = false } = {}) {
  if (contactState === "blind" || contactState === "contact") return "Targeting Data unavailable until Track.";
  if (contactState === "track") return "Targeting Data available.";
  if (contactState === "lock" && lockGated) return "Targeting solution optimized.";
  return "Targeting solution available.";
}

export function buildMachineEwRow({
  targetToken,
  combatant,
  systemAttr = 0,
  currentRound = null,
} = {}) {
  if (!targetToken?.actor) return null;

  const targetTokenUuid = targetToken.document?.uuid ?? targetToken.uuid ?? "";
  const targetTokenId = String(targetToken.id ?? targetToken.document?.id ?? "").trim();
  const contactState = getContactState(combatant, targetTokenUuid);
  const ceiling = getAcquireCeiling(targetToken.actor);
  const targetCombatant = getTargetCombatant(targetTokenId);
  const trackingPenalty = getTrackingPenalty(targetToken.actor, targetCombatant);
  const packetCap = (contactState === "track" || contactState === "lock")
    ? getTargetingDataCap(systemAttr, contactState)
    : null;
  const packet = (contactState === "track" || contactState === "lock")
    ? getUsableTargetingPacket(combatant, targetTokenUuid, systemAttr, contactState, currentRound)
    : null;

  const canAcquire = contactState === "contact" || (contactState === "track" && ceiling === "lock");
  const canTarget = contactState === "track" || contactState === "lock";
  const lockGated = contactState === "lock";

  return {
    tokenName: targetToken.name ?? "Target",
    targetTokenId,
    targetTokenUuid,
    contactState,
    contactStateLabel: getContactStateLabel(contactState),
    packetValue: packet?.value ?? 0,
    hasPacket: Boolean(packet),
    packetCap,
    hasPacketCap: packetCap !== null,
    trackingPenalty,
    hasTrackingPenalty: trackingPenalty > 0,
    canAcquire,
    canTarget,
    acquireHint: buildAcquireHint({ contactState, canAcquire, ceiling }),
    targetHint: buildTargetHint({ contactState, lockGated }),
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
      ? "EW actions use your current token targets on the canvas. Global actions apply to the first eligible targeted token."
      : "Select targets on the canvas, then use Acquire or Target from this panel.",
  };
}
