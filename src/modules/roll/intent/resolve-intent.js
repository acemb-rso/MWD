// src/modules/roll/intent/resolve-intent.js
// Purpose: Defines function `resolveIntent`.
// How it fits: Describes role within src/modules or template rendering pipeline.


// modules/roll/intent/resolve-intent.js
import { resolveSkill } from "./resolve-skill.js";
import { resolveEdge } from "./resolve-edge.js";
import { resolveAttribute } from "./resolve-attribute.js";
import { resolveCommon } from "./resolve-common.js";
import { resolveAttack } from "./resolve-attack.js";
import { resolveDefense } from "./resolve-defense.js";
import { resolveResistance } from "./resolve-resistance.js";
import { resolveInitiative} from "./resolve-initiative.js";
import { resolveOverload } from "./resolve-overload.js";
import { resolveMachineRemedy } from "./resolve-machine-remedy.js";

// Registry: adding a roll is “data entry”
const RESOLVERS = {
  skill: resolveSkill,
  edge: resolveEdge,
  attribute: resolveAttribute,
  common: resolveCommon,
  attack: resolveAttack,
  defense: resolveDefense,
  resistance: resolveResistance,
  initiative: resolveInitiative,
  overload: resolveOverload,
  machineRemedy: resolveMachineRemedy,
};

export async function resolveIntent({ actor, payload, event } = {}) {
  if (!actor) throw new Error("resolveIntent requires actor");
  const intent = String(payload?.intent ?? "").trim();
  if (!intent) throw new Error("resolveIntent requires payload.intent");

  const fn = RESOLVERS[intent];
  if (!fn) throw new Error(`Unsupported roll intent: ${intent}`);

  const ctx = await fn({ actor, payload, event });
  return normalizeResolvedContext(ctx, { intent });
}

export function normalizeResolvedContext(ctx, { intent } = {}) {
  if (!ctx || typeof ctx !== "object") ctx = {};

  ctx.intent = ctx.intent ?? intent ?? "unknown";
  ctx.title = String(ctx.title ?? "Roll");
  ctx.domains = Array.isArray(ctx.domains) ? ctx.domains : [];
  ctx.breakdown = Array.isArray(ctx.breakdown) ? ctx.breakdown : [];
  ctx.mods = Array.isArray(ctx.mods) ? ctx.mods : [];

  // Pool is always three numeric parts (authoritative)
  const pool = (ctx.pool && typeof ctx.pool === "object") ? ctx.pool : {};
  const attribute = Number(pool.attribute ?? pool.base ?? 0);
  const skill = Number(pool.skill ?? pool.rating ?? 0);
  const bonus = Number(pool.bonus ?? 0);
  const specialization = Number(pool.specialization ?? 0);

  if (![attribute, skill, bonus, specialization].every(Number.isFinite)) {
    console.error("MWD | Invalid pool parts after intent resolution", { intent, ctx });
    throw new Error(`MWD.roll: pool parts must be numeric (attribute/skill/bonus/specialization).`);
  }

  // Normalize keys + compute totals consistently
  ctx.pool = {
    attribute,
    skill,
    bonus,
    specialization,
    totalBase: attribute + skill + bonus + specialization
  };

  // --- Roll semantics defaults ---
  ctx.rollType = ctx.rollType ?? "simple";

  // Die face threshold (per-die success)
  // Defaults to 5 to preserve existing behavior
  ctx.diceTarget = Number.isFinite(ctx.diceTarget)
    ? ctx.diceTarget
    : Number(ctx.target ?? 5);

  // DN = hits needed (gate), optional
  if (ctx.difficulty && typeof ctx.difficulty === "object") {
    ctx.difficulty.dn = Number(ctx.difficulty.dn ?? 0);
  } else if (Number.isFinite(ctx.dn)) {
    ctx.difficulty = { dn: Number(ctx.dn) };
  }

  // Optional: ensure breakdown has the standard rows if missing
  if (!ctx.breakdown.length) {
    ctx.breakdown = [
      { id: "attribute", label: "Attribute", value: attribute },
      { id: "skill", label: "Skill", value: skill },
      { id: "bonus", label: "Bonus", value: bonus },
      ...(specialization ? [{ id: "specialization", label: "Specialization", value: specialization }] : [])
    ];
  }

  return ctx;
}
