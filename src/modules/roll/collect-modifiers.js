// src/modules/roll/collect-modifiers.js
// Purpose: Defines function `coerceNumber`.
// How it fits: Describes role within src/modules or template rendering pipeline.


// modules/roll/collect-modifiers.js
import { modifierProviders } from "../modifiers/index.js";

/** Convert arbitrary provider value to a safe finite number (or null if invalid) */
function coerceNumber(value) {
  if (value === null || value === undefined) return 0;

  // Common UI-ish “blank” tokens
  if (value === "" || value === "—" || value === "–") return 0;

  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function normalizeModifier(mod) {
  const n = coerceNumber(mod?.value);
  if (n === null) return null; // invalid
  return { ...mod, value: n };
}

/**
 * collectModifiers
 * Now accepts optional { payload, resolved, context } and forwards to providers.
 */
export async function collectModifiers({
  actor,
  rollType,
  skillId,
  domains,

  // NEW (optional)
  payload,
  resolved,
  context
} = {}) {
  const ctx = { actor, rollType, skillId, domains, payload, resolved, context };

  const raw = await modifierProviders.collectAll(ctx);
  console.log("MWD|condition collect called", ctx.rollType);
  // 1) Normalize + drop invalid values
  let mods = [];
  for (const m of raw ?? []) {
    const norm = normalizeModifier(m);
    if (!norm) {
      console.warn("MWD | Dropping invalid modifier value", m);
      continue;
    }
    mods.push(norm);
  }

  // 2) Apply domain filter once, centrally
  if (Array.isArray(domains) && domains.length) {
    mods = mods.filter(m => !m.domain || domains.includes(m.domain));
  }

  // 3) Safe total
  const total = mods.reduce((sum, m) => sum + m.value, 0);

  return { mods, total };
}
