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

  return {
    intent: "skill",
    title: `${def.label} (${attrKey})`,
    subtitle: actor.name ?? "Actor",
    domains,
    target: payload?.target ?? null, // don’t hardcode 5 here unless you truly mean it

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
