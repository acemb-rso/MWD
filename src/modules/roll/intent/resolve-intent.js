// modules/roll/intent/resolve-intent.js
import { resolveSkill } from "./resolve-skill.js";
import { resolveEdge } from "./resolve-edge.js";

/**
 * Resolve an intent payload into a normalized RollContext ("ctx").
 * This MUST produce a numeric ctx.poolDice and a UI-friendly ctx.pool/breakdown.
 */
export async function resolveIntent({ actor, payload, event } = {}) {
  if (!actor) throw new Error("resolveIntent requires actor");
  if (!payload?.intent) throw new Error("resolveIntent requires payload.intent");

  let ctx;
  switch (payload.intent) {
    case "skill":
      ctx = await resolveSkill({ actor, payload, event });
      break;

    // Future intents (stubbed intentionally)
    case "attribute":
    case "attack":
    case "defense":
    case "edge":  return resolveEdge({ actor, payload, event });
    case "resistance":
      throw new Error(`Intent not implemented yet: ${payload.intent}`);

    default:
      throw new Error(`Unsupported roll intent: ${payload.intent}`);
  }

  return normalizeResolvedContext(ctx, { intent: payload.intent });
}

/**
 * Enforce RollContext invariants so the engine never evaluates NaN terms.
 * - ctx.poolDice is always a finite number
 * - ctx.pool is always an object (UI)
 * - ctx.breakdown is always an array (UI)
 */
export function normalizeResolvedContext(ctx, { intent } = {}) {
  if (!ctx || typeof ctx !== "object") ctx = {};

  ctx.intent = ctx.intent ?? intent ?? "unknown";
  ctx.breakdown = Array.isArray(ctx.breakdown) ? ctx.breakdown : [];

  // Ensure poolDice is strictly numeric
  const dice = Number(ctx.poolDice ?? 0);
  if (!Number.isFinite(dice)) {
    console.error("MWD | Invalid pool dice after intent resolution", { intent, ctx });
    throw new Error(`MWD.roll: pool dice must be numeric; got ${String(ctx.poolDice ?? ctx.pool)}`);
  }
  ctx.poolDice = dice;

  // Ensure pool object exists and total matches poolDice
  const poolObj = ctx.pool && typeof ctx.pool === "object" ? ctx.pool : null;
  if (!poolObj) {
    ctx.pool = { base: 0, rating: 0, bonus: 0, mods: 0, total: dice, label: "" };
  } else {
    ctx.pool.total = dice;
    if (!Number.isFinite(Number(ctx.pool.mods ?? 0))) ctx.pool.mods = 0;
  }

  return ctx;
}
