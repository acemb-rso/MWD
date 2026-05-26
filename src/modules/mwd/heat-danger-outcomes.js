// src/modules/mwd/heat-danger-outcomes.js
// Purpose: Applies BattleMech Danger heat check consequences after the dice resolve.
// How it fits: Keeps heat shutdown side effects and explosion next steps out of
//              the generic roll runner while returning chat-card details.

import { applyManagedStatusUpdate, getCurrentStatusState } from "../dialog/token-status-dialog.js";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function clampMin(value, min = 0) {
  return Math.max(min, toNumber(value, min));
}

function normalizeKind(value = "") {
  const kind = String(value ?? "").trim().toLowerCase();
  return kind === "shutdown" || kind === "explosion" ? kind : "";
}

function buildShutdownMetadata({ check, result }) {
  return {
    scope: "Heat Danger",
    severity: `DN ${Number(check?.dn ?? 0)}`,
    notes: `Failed shutdown check by ${Number(result?.failureMargin ?? 0)}.`,
    tags: ["heat", "danger", "shutdown"],
  };
}

async function applyShutdownFailure({ actor, check, outcomeModel }) {
  const dn = clampMin(check?.dn ?? outcomeModel?.difficulty?.dn, 1);
  const hits = clampMin(outcomeModel?.successes, 0);
  const margin = toNumber(outcomeModel?.margin, hits - dn);
  const failureMargin = clampMin(dn - hits, 0);
  const systemOpsRating = Number.isFinite(Number(check?.systemOpsRating))
    ? clampMin(check.systemOpsRating, 0)
    : null;
  const operatorName = String(check?.operatorName ?? "").trim();
  const overrideAvailable = systemOpsRating !== null && failureMargin < systemOpsRating;

  const base = {
    kind: "shutdown",
    passed: false,
    hits,
    dn,
    margin,
    failureMargin,
    operatorName,
    systemOpsRating,
    overrideAvailable,
    statusId: "shutdown",
    statusApplied: false,
    statusAlreadyActive: getCurrentStatusState(actor, "shutdown"),
  };

  if (overrideAvailable) {
    return {
      ...base,
      outcome: "overrideAvailable",
      effectText: `Shutdown check failed by ${failureMargin}, below ${operatorName ? `${operatorName}'s ` : "the pilot's "}System Operations ${systemOpsRating}.`,
      nextStep: "Pilot may override the shutdown. Apply Shutdown only if the override is declined.",
    };
  }

  const statusApplied = await applyManagedStatusUpdate({
    actor,
    statusId: "shutdown",
    active: true,
    metadata: buildShutdownMetadata({ check, result: base }),
  });
  const overrideText = systemOpsRating === null
    ? "No linked pilot System Operations rating was found, so no override is available."
    : `Failure margin ${failureMargin} is not below System Operations ${systemOpsRating}.`;

  return {
    ...base,
    statusApplied: Boolean(statusApplied),
    statusAlreadyActive: base.statusAlreadyActive || getCurrentStatusState(actor, "shutdown"),
    outcome: "shutdownApplied",
    effectText: base.statusAlreadyActive
      ? "The BattleMech was already Shutdown."
      : "The BattleMech shuts down.",
    nextStep: `${overrideText} Shutdown status is active until cleared through the appropriate restart or recovery procedure.`,
  };
}

function resolveExplosionOutcome({ check, outcomeModel }) {
  const dn = clampMin(check?.dn ?? outcomeModel?.difficulty?.dn, 1);
  const hits = clampMin(outcomeModel?.successes, 0);
  const margin = toNumber(outcomeModel?.margin, hits - dn);
  const failureMargin = clampMin(dn - hits, 0);
  const volatile = Boolean(check?.volatile);

  if (outcomeModel?.passed) {
    return {
      kind: "explosion",
      passed: true,
      hits,
      dn,
      margin,
      failureMargin: 0,
      volatile,
      explosionTriggered: false,
      outcome: "contained",
      effectText: "Volatile systems remain contained.",
      nextStep: volatile
        ? "No detonation is triggered by this check."
        : "No volatile components were detected, so no explosion is applied.",
    };
  }

  if (!volatile) {
    return {
      kind: "explosion",
      passed: false,
      hits,
      dn,
      margin,
      failureMargin,
      volatile,
      explosionTriggered: false,
      outcome: "noVolatileComponents",
      effectText: "Explosion check failed, but no volatile components are present.",
      nextStep: "No detonation is applied. Continue resolving heat effects.",
    };
  }

  return {
    kind: "explosion",
    passed: false,
    hits,
    dn,
    margin,
    failureMargin,
    volatile,
    explosionTriggered: true,
    outcome: "explosionTriggered",
    effectText: "Volatile components detonate.",
    nextStep: "Resolve the volatile component detonation immediately, then apply any resulting damage or destruction.",
  };
}

export async function applyHeatDangerCheckOutcome({ actor, ctx, outcomeModel } = {}) {
  const check = ctx?.heatDangerCheck ?? null;
  const kind = normalizeKind(check?.kind);
  if (!actor || !check || !kind || !outcomeModel) return null;

  if (kind === "explosion") {
    return resolveExplosionOutcome({ check, outcomeModel });
  }

  const dn = clampMin(check?.dn ?? outcomeModel?.difficulty?.dn, 1);
  const hits = clampMin(outcomeModel?.successes, 0);
  const margin = toNumber(outcomeModel?.margin, hits - dn);

  if (outcomeModel.passed) {
    return {
      kind: "shutdown",
      passed: true,
      hits,
      dn,
      margin,
      failureMargin: 0,
      operatorName: String(check?.operatorName ?? "").trim(),
      systemOpsRating: Number.isFinite(Number(check?.systemOpsRating)) ? clampMin(check.systemOpsRating, 0) : null,
      overrideAvailable: false,
      statusId: "shutdown",
      statusApplied: false,
      statusAlreadyActive: getCurrentStatusState(actor, "shutdown"),
      outcome: "staysOnline",
      effectText: "The BattleMech stays online.",
      nextStep: "No shutdown is applied.",
    };
  }

  return applyShutdownFailure({ actor, check, outcomeModel });
}
