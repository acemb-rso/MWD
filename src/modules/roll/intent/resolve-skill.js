// modules/roll/intent/resolve-skill.js
import { getSkillDef } from "../../mwd/skills.js";

export async function resolveSkill({ actor, payload } = {}) {
  const code = payload?.key;
  const def = getSkillDef(code);
  if (!def) throw new Error(`Unknown skill: ${code}`);

  const sys = actor.system ?? {};

  // Allow an on-the-fly attribute override (dialog will set payload.attrKey later).
  // If absent, fall back to the skill's default attribute.
  const attrKey = payload?.attrKey ?? def.attribute;

  const attribute = Number(sys?.attributes?.[attrKey]?.value ?? 0);
  const skill = Number(sys?.skills?.[code]?.rating ?? 0);
  const bonus = Number(sys?.skills?.[code]?.bonus ?? 0);

  // Domains can be overridden by payload; otherwise use skill def domains
  const domains = Array.isArray(payload?.domains) ? payload.domains : (def.domains ?? []);

  const total = attribute + skill + bonus;

  return {
    title: `${def.label} (${attrKey})`,
    subtitle: actor.name ?? "Actor",
    intent: "skill",
    domains,
    target: 5,

    pool: {
      attribute,
      skill,
      bonus,
      mods: 0,
      total,
      label: `${attrKey}+${def.label}`
    },

    poolDice: total,

    // IMPORTANT: these ids must match what the dialog reads.
    breakdown: [
      { id: "attribute", label: "Attribute", value: attribute },
      { id: "skill", label: "Skill", value: skill },
      { id: "bonus", label: "Bonus", value: bonus }
    ]
  };
}
