// src/modules/roll/collect-modifiers.js
/**
 * @pipeline execution
 * @role Modifier collection stage. Runs every registered modifier provider
 *   against the RollContext, coerces/normalizes each contribution into a safe
 *   { label, value, source } part, and returns the additive modifier list the
 *   roll totals are built from. Executed at steps 2/4 of execute() (§10).
 * @invariants
 *   - INVARIANT(order): collection happens before the dice are rolled and is
 *     re-run as a final pass after the dialog, so late player choices are
 *     included. Never collect modifiers after the roll (§10, steps 2/3.5/4).
 *   - Modifiers are additive, inspectable parts — never hidden mutations of the
 *     pool (Design Principles §3.2, §9). Invalid/blank values coerce to 0 or are
 *     dropped, not silently guessed.
 *   - Rules live in the providers, not here: this file orchestrates collection;
 *     it does not encode any specific modifier's logic (§4.1).
 * @upstream   mwd-roll.js execute() (steps 2, 3.5, 4)
 * @downstream modifiers/index.js → provider-registry.js (the providers it runs)
 */
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

function normalizeDomainList(...sources) {
  const seen = new Set();
  const out = [];
  for (const source of sources) {
    const values = Array.isArray(source)
      ? source
      : typeof source === "string"
        ? source.split(",")
        : [];
    for (const value of values) {
      const domain = String(value ?? "").trim();
      if (!domain || seen.has(domain)) continue;
      seen.add(domain);
      out.push(domain);
    }
  }
  return out;
}

/**
 * collectModifiers
 * Now accepts optional { payload, resolved, context } and forwards to providers.
 */
export async function collectModifiers({
  actor,
  rollActor = null,
  machineActor = null,
  rollType,
  skillId,
  domains,

  // NEW (optional)
  payload,
  resolved,
  context
} = {}) {
  const effectiveDomains = normalizeDomainList(domains, resolved?.domains, resolved?.domainTags, payload?.domains);
  const ctx = { actor, rollActor, machineActor, rollType, skillId, domains: effectiveDomains, payload, resolved, context };

  const raw = await modifierProviders.collectAll(ctx);
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
  if (effectiveDomains.length) {
    mods = mods.filter(m => !m.domain || effectiveDomains.includes(m.domain));
  }

  // 3) Safe total
  const total = mods.reduce((sum, m) => sum + m.value, 0);

  return { mods, total };
}
