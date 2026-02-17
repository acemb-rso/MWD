// modules/roll/intent/resolve-skill.js
import { getSkillDef } from "../../mwd/skills.js";

export async function resolveSkill({ actor, payload } = {}) {
  if (!actor) throw new Error("resolveSkill requires actor");

  const code = String(payload?.key ?? "").trim();
  const def = getSkillDef(code);
  if (!def) throw new Error(`Unknown skill: ${code}`);

  const sys = actor.system ?? {};

  // Allow an on-the-fly attribute override (dialog can set payload.attrKey).
  const attrKey = String(payload?.attrKey ?? def.attribute ?? "").trim();
  if (!attrKey) throw new Error(`Skill ${code} missing attribute key`);

  const attribute = Number(sys?.attributes?.[attrKey]?.value ?? 0);
  const skill = Number(sys?.skills?.[code]?.rating ?? 0);
  const bonus = Number(sys?.skills?.[code]?.bonus ?? 0);

  const domains = Array.isArray(payload?.domains) ? payload.domains : (def.domains ?? []);

  // --- NEW: semantic roll typing + thresholds ---
  // diceTarget = per-die success threshold (cs>=X). Default 5.
  // dnHits = hits needed to succeed (your DN). Default 1 for a basic skill check.
  const diceTarget = Number.isFinite(Number(payload?.diceTarget))
    ? Number(payload.diceTarget)
    : (Number.isFinite(Number(payload?.target)) ? Number(payload.target) : 5);

  const dnHits = Number.isFinite(Number(payload?.dn))
    ? Number(payload.dn)
    : 1;

  return {
    intent: "skill",
    rollType: "simple",

    title: `${def.label} (${attrKey})`,
    subtitle: actor.name ?? "Actor",
    domains,

    // Per-die threshold (cs>=X). Kept separate from dnHits.
    diceTarget,

    // DN = hits needed for success
    difficulty: { dn: dnHits },

    pool: { attribute, skill, bonus },

    breakdown: [
      { id: "attribute", label: "Attribute", value: attribute },
      { id: "skill", label: "Skill", value: skill },
      { id: "bonus", label: "Bonus", value: bonus }
    ],

    // optional extra metadata (safe to stash)
    data: {
      skillKey: code,
      attrKey,
      label: `${attrKey}+${def.label}`
    }
  };
}
