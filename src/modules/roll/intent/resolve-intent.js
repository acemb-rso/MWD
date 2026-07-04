// src/modules/roll/intent/resolve-intent.js
/**
 * @pipeline resolver
 * @role Intent router. Maps a declarative intent payload ({ intent: "attack", … })
 *   to the matching per-intent resolver via the RESOLVERS registry, then
 *   normalizes the result into a canonical RollContext. This is the single
 *   entry to the resolver layer (Design Principles §2, §6.2).
 * @invariants
 *   - INVARIANT(boundary): consumes intent + references only. Resolvers read the
 *     payload's declarative fields; they must never trust computed values such
 *     as a pre-baked dicePool off the payload (Design Principles §2.1).
 *   - INVARIANT(canonical): every intent converges on one RollContext shape via
 *     normalizeResolvedContext — no intent may emit a bespoke result (§2.2, §6.2).
 *   - Adding a roll type is data entry: add an entry to RESOLVERS, nothing else.
 *     An unknown intent fails loud (§14), it does not silently fall back.
 * @upstream   mwd-roll.js execute() (calls resolveIntent, incl. preview pass)
 * @downstream resolve-attack.js and the other per-intent resolvers
 */


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
import { resolveAcquire } from "./resolve-acquire.js";
import { resolveTargeting } from "./resolve-targeting.js";
import { resolveBreakLock } from "./resolve-break-lock.js";
import { resolveDefensiveJink } from "./resolve-defensive-jink.js";
import { resolveSpotIndirect } from "./resolve-spot-indirect.js";
import { resolveHeatDangerCheck } from "./resolve-heat-danger-check.js";

// Registry: adding a roll is "data entry"
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
  heatDangerCheck: resolveHeatDangerCheck,
  acquire: resolveAcquire,
  acquireTarget: resolveAcquire,
  targeting: resolveTargeting,
  generateFireSolution: resolveTargeting,
  breakLock: resolveBreakLock,
  defensiveJink: resolveDefensiveJink,
  spotIndirect: resolveSpotIndirect,
};

export async function resolveIntent({ actor, payload, event, preview = false } = {}) {
  if (!actor) throw new Error("resolveIntent requires actor");
  const intent = String(payload?.intent ?? "").trim();
  if (!intent) throw new Error("resolveIntent requires payload.intent");

  const fn = RESOLVERS[intent];
  if (!fn) throw new Error(`Unsupported roll intent: ${intent}`);

  // `preview` marks pre-dialog resolves: legality gates that the player can
  // satisfy via a dialog control (e.g. Danger Close / Hot Load) must not throw
  // during preview, so the dialog can open and surface the override.
  const ctx = await fn({ actor, payload, event, preview });
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
