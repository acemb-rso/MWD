// src/modules/roll/intent/resolve-break-lock.js
// Resolves Break Lock as Handling + Stealth against the detection-state ladder.

import { TEMPLATE } from "../../core/constants.js";
import { getSkillDef } from "../../mwd/skills.js";
import { resolveMachineOperator } from "../../mwd/machine-operator.js";
import { getMachineSignatureEmissionModel } from "../../mwd/machine-stealth.js";
import { getAttackerCombatant, getDetectionState } from "../../mwd/machine-ew-state.js";
import { getDetectionStateLabel } from "../../mwd/machine-ew.js";
import { isMachineActor } from "../../utils/actor-guards.js";
import { toNumber } from "../../utils/coercion.js";
import { createUserFacingRollError } from "../roll-errors.js";
import {
  getTokenDisplayName,
  getTokenId,
  getTokenUuid,
  resolveRollObserverToken,
  resolveRollSourceToken,
  withOwner,
} from "./token-context.js";

const BREAK_LOCK_DN_BY_STATE = Object.freeze({
  blind: 1,
  contact: 1,
  track: 2,
  lock: 3,
});

const SITUATION_DICE = Object.freeze({
  open: -1,
  exposed: -1,
  typical: 0,
  battlefield: 0,
  covered: 1,
  terrain: 1,
  woods: 1,
  urban: 1,
  ridge: 1,
  ecm: 1,
});

function normalizeSituation(value = "") {
  const key = String(value ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
  if (key === "openground" || key === "fullyexposed") return "open";
  if (key === "typicalbattlefield") return "typical";
  if (key === "ridgeline") return "ridge";
  if (Object.prototype.hasOwnProperty.call(SITUATION_DICE, key)) return key;
  return "typical";
}

function normalizeDetectionState(value = "", fallback = "contact") {
  const key = String(value ?? "").trim().toLowerCase();
  return Object.prototype.hasOwnProperty.call(BREAK_LOCK_DN_BY_STATE, key) ? key : fallback;
}

function hasStatus(actor = null, statusId = "") {
  return Boolean(actor?.statuses?.has?.(statusId));
}

function normalizeKey(value = "") {
  return String(value ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function normalizeList(value) {
  const raw = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];
  return raw.map(entry => String(entry ?? "").trim()).filter(Boolean);
}

function observerHasActiveProbe(actor = null) {
  const wanted = new Set(["activeprobe", "probe", "probeking", "advancedsensors"]);
  for (const item of (actor?.items ?? [])) {
    const values = [
      item?.id,
      item?.name,
      item?.system?.category,
      ...normalizeList(item?.system?.tags),
      ...normalizeList(item?.system?.capabilities),
      ...normalizeList(item?.system?.keywords),
    ];
    if (values.some(value => wanted.has(normalizeKey(value)))) return true;
  }
  return false;
}

function getBreakLockStep(currentState = "contact") {
  const state = normalizeDetectionState(currentState);
  const dn = BREAK_LOCK_DN_BY_STATE[state] ?? 1;
  const nextState = state === "lock" ? "track" : state === "track" ? "contact" : "blind";
  return { currentState: state, nextState, dn };
}

function getSituationLabel(situation = "typical") {
  if (situation === "open" || situation === "exposed") return "Open Ground";
  if (situation === "covered" || situation === "terrain" || situation === "woods" || situation === "urban" || situation === "ridge" || situation === "ecm") {
    return "Favorable Cover / ECM";
  }
  return "Typical Battlefield";
}

function getBreakLockSituationDicePart(payload = {}) {
  const situation = normalizeSituation(payload?.breakLockSituation ?? payload?.situation);
  const value = SITUATION_DICE[situation] ?? 0;
  if (!value) return null;
  return {
    id: "breakLock.situation",
    label: getSituationLabel(situation),
    value,
    tags: ["breakLock", "situation"],
  };
}

function buildBreakLockDnParts(actor, observerActor, payload = {}, currentState = "contact") {
  const step = getBreakLockStep(currentState);
  const parts = [{
    id: "breakLock.detectionState",
    label: `${getDetectionStateLabel(step.currentState)} -> ${getDetectionStateLabel(step.nextState)}`,
    value: step.dn,
    tags: ["base", "breakLock", "detectionState"],
  }];

  if (hasStatus(actor, "tagged") || hasStatus(actor, "narced")) {
    parts.push({
      id: "breakLock.beacon",
      label: "TAG / NARC Beacon",
      value: 1,
      tags: ["breakLock", "beacon"],
    });
  }

  const emission = getMachineSignatureEmissionModel(actor, {
    intent: "breakLock",
    payload,
  });
  if (emission.effectiveEmissionRating > 0) {
    parts.push({
      id: "breakLock.highEmission",
      label: "High Emission",
      value: 1,
      tags: ["breakLock", "emission"],
    });
  }
  if (observerHasActiveProbe(observerActor)) {
    parts.push({
      id: "breakLock.activeProbe",
      label: "Active Probe",
      value: 1,
      tags: ["breakLock", "activeProbe"],
    });
  }

  return parts;
}

function getObserverDetectionState({ observerToken = null, sourceToken = null, payload = {} } = {}) {
  const explicit = normalizeDetectionState(payload?.breakLockDetectionState ?? payload?.currentState ?? payload?.detectionState, "contact");
  const sourceTokenUuid = String(payload?.breakLockTargetTokenUuid ?? "").trim() || getTokenUuid(sourceToken);
  const observerCombatant = getAttackerCombatant(observerToken);
  if (observerCombatant && sourceTokenUuid) return normalizeDetectionState(getDetectionState(observerCombatant, sourceTokenUuid), "blind");
  return explicit;
}

export async function resolveBreakLock({ actor, payload } = {}) {
  if (!actor) throw new Error("resolveBreakLock requires actor");
  if (!isMachineActor(actor)) {
    throw createUserFacingRollError("Break Lock is a machine action.", { severity: "warn" });
  }

  const sourceToken = resolveRollSourceToken(actor, payload);
  const observerToken = resolveRollObserverToken(payload);
  const operator = await resolveMachineOperator({
    machineActor: actor,
    operatorActorUuid: String(payload?.operatorActorUuid ?? "").trim(),
  });
  const roller = operator.actor ?? actor;

  const attrKey = TEMPLATE.actorAttributes.handling;
  const skillKey = "stealth";
  const skillDef = getSkillDef(skillKey);
  const handling = Math.max(0, toNumber(actor?.getAttributeValue?.(attrKey) ?? actor?.system?.attributes?.[attrKey]?.value, 0));
  const stealthRating = Math.max(0, toNumber(roller?.system?.skills?.[skillKey]?.rating, 0));
  const stealthBonus = Math.max(0, toNumber(roller?.system?.skills?.[skillKey]?.bonus, 0));
  const currentState = getObserverDetectionState({ observerToken, sourceToken, payload });
  const situationPart = getBreakLockSituationDicePart(payload);
  const situationBonus = toNumber(situationPart?.value, 0);
  const dnParts = buildBreakLockDnParts(actor, observerToken?.actor ?? null, payload, currentState);
  const dn = Math.max(1, dnParts.reduce((sum, part) => sum + toNumber(part.value, 0), 0));

  return {
    intent: "breakLock",
    rollType: "simple",
    title: "Break Lock",
    subtitle: getTokenDisplayName(observerToken, "Observer"),
    domains: ["physical", "skill.stealth", "sensor", "ew"],
    domainTags: ["sensor", "sensor.breakLock", "skill.stealth"],
    diceTarget: 5,
    difficulty: { dn },
    dn: { parts: dnParts, total: dn },
    edge: { allowed: ["pre", "post"], earn: { enabled: true, rate: 4, maxPerRoll: 1 } },
    pool: {
      attribute: handling,
      skill: stealthRating,
      bonus: stealthBonus + situationBonus,
      specialization: 0,
    },
    breakdown: [
      { id: "attribute", label: withOwner("Handling", actor), value: handling },
      { id: "skill", label: withOwner(skillDef?.label ?? "Stealth", operator.actor), value: stealthRating },
      ...(stealthBonus ? [{ id: "bonus", label: "Stealth Bonus", value: stealthBonus }] : []),
      ...(situationPart ? [{ id: situationPart.id, label: situationPart.label, value: situationPart.value }] : []),
    ],
    specialization: null,
    data: {
      skillKey,
      attrKey,
      machineActorUuid: actor.uuid ?? "",
      operatorActorUuid: operator.actor?.uuid ?? "",
      label: `${attrKey}+${skillDef?.label ?? "Stealth"}`,
    },
    breakLock: {
      machineActorUuid: actor.uuid ?? "",
      operatorActorUuid: operator.actor?.uuid ?? "",
      sourceTokenId: getTokenId(sourceToken),
      sourceTokenUuid: getTokenUuid(sourceToken),
      observerTokenId: getTokenId(observerToken),
      observerTokenUuid: getTokenUuid(observerToken),
      currentState,
      currentStateLabel: getDetectionStateLabel(currentState),
    },
    rollActor: roller,
    machineActor: actor,
  };
}
