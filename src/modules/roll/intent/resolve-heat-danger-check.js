// src/modules/roll/intent/resolve-heat-danger-check.js
// Purpose: Resolves BattleMech Danger heat outcome checks into canonical roll contexts.
// How it fits: Lets the BattleMech heat sheet buttons roll Shutdown and Explosion checks
//              through the standard MWD roll engine.

import { buildBattlemechHeatModel } from "../../mwd/machine-heat.js";
import { resolveMachineOperator } from "../../mwd/machine-operator.js";
import { clampMin, toNumber } from "../../utils/coercion.js";

function normalizeCheckKind(value = "") {
  const kind = String(value ?? "").trim().toLowerCase();
  if (kind === "shutdown" || kind === "explosion") return kind;
  return "";
}

function buildCheckConfig(kind, heat) {
  const dangerChecks = heat?.dangerChecks ?? {};
  if (kind === "shutdown") {
    return {
      title: "Shutdown Check",
      pool: clampMin(dangerChecks.shutdownPool, 0),
      dn: clampMin(dangerChecks.shutdownDN, 1),
      formula: "Chassis + Reliability",
      successText: "The BattleMech stays online.",
      failureText: "On failure, compare the margin to the pilot's System Operations for an override; otherwise the BattleMech shuts down.",
    };
  }

  return {
    title: "Explosion Check",
    pool: clampMin(dangerChecks.explosionPool, 1),
    dn: clampMin(dangerChecks.explosionDN, 1),
    formula: "Chassis + Reliability - Danger",
    successText: "Volatile systems remain contained.",
    failureText: "Failure detonates volatile components.",
  };
}

function getSkillRating(actor = null, skillKey = "") {
  const key = String(skillKey ?? "").trim();
  if (!actor || !key) return null;

  const methodValue = actor.getSkillRating?.(key);
  if (Number.isFinite(Number(methodValue))) return clampMin(methodValue, 0);

  const systemValue = actor.system?.skills?.[key]?.rating;
  if (Number.isFinite(Number(systemValue))) return clampMin(systemValue, 0);

  return null;
}

export async function resolveHeatDangerCheck({ actor, payload } = {}) {
  if (!actor) throw new Error("resolveHeatDangerCheck requires actor");
  if (actor.type !== "battlemech") throw new Error("Heat danger checks require a BattleMech actor");

  const kind = normalizeCheckKind(payload?.checkKind ?? payload?.kind);
  if (!kind) throw new Error("Heat danger checks require payload.checkKind of shutdown or explosion");

  const heat = buildBattlemechHeatModel(actor);
  if (!heat.inDanger || !heat.dangerChecks) {
    throw new Error("Heat danger checks are only available while the BattleMech is in Danger heat");
  }

  const operator = await resolveMachineOperator({
    machineActor: actor,
    operatorActorUuid: payload?.operatorActorUuid,
  });
  const operatorActor = operator?.actor ?? null;
  const systemOpsRating = getSkillRating(operatorActor, "systemOps");
  const config = buildCheckConfig(kind, heat);
  const dn = Number.isFinite(Number(payload?.dn))
    ? clampMin(payload.dn, 1)
    : config.dn;
  const chassis = clampMin(actor.system?.attributes?.chassis?.value, 0);
  const reliability = clampMin(actor.system?.attributes?.reliability?.value, 0);
  const dangerLevel = clampMin(heat.penalties?.dangerLevel, 0);
  const dangerPenalty = kind === "explosion" ? -dangerLevel : 0;
  const minimumPoolAdjustment = kind === "explosion"
    ? config.pool - (chassis + reliability + dangerPenalty)
    : 0;

  return {
    intent: "heatDangerCheck",
    rollType: "simple",
    title: config.title,
    subtitle: actor.name ?? "BattleMech",
    domains: ["machine", "heat"],
    tags: ["machine", "heat", "danger", kind],
    formula: config.formula,
    machineActor: actor,
    difficulty: { dn },
    dn: {
      parts: [
        {
          id: `heat.${kind}.dn`,
          label: kind === "shutdown" ? "Danger Level" : "Explosion DN",
          value: dn,
          tags: ["heat", "danger"],
        },
      ],
      total: dn,
    },
    edge: { earn: { enabled: false } },
    pool: {
      attribute: chassis,
      skill: reliability,
      bonus: dangerPenalty,
      specialization: minimumPoolAdjustment,
    },
    breakdown: [
      { id: "attribute", label: "Chassis", value: chassis },
      { id: "skill", label: "Reliability", value: reliability },
      ...(dangerPenalty ? [{ id: "bonus", label: `Danger Level ${dangerLevel}`, value: dangerPenalty }] : []),
      ...(minimumPoolAdjustment ? [{ id: "specialization", label: "Minimum Pool", value: minimumPoolAdjustment }] : []),
    ],
    heatDangerCheck: {
      kind,
      label: config.title,
      dangerLevel,
      volatile: Boolean(heat.volatile),
      pool: config.pool,
      dn,
      operatorName: operatorActor?.name ?? "",
      operatorActorUuid: operator?.uuid ?? operatorActor?.uuid ?? "",
      operatorSource: operator?.source ?? "",
      operatorReason: operator?.reason ?? "",
      systemOpsRating,
      successText: config.successText,
      failureText: config.failureText,
    },
    data: {
      checkKind: kind,
      dangerLevel,
      volatile: Boolean(heat.volatile),
    },
  };
}
