// src/modules/mwd/damage-scale.js
// Purpose: Convert damage between personal-scale and machine-scale combat.
// How it fits: Attack resolution carries source scale; harm engines convert once
// at the target boundary before armor and structure rules run.

export const DAMAGE_SCALE_FACTOR = 10;
export const DAMAGE_SCALES = Object.freeze(["personal", "machine"]);

const VALID_DAMAGE_SCALES = new Set(DAMAGE_SCALES);

export function normalizeDamageScale(value = "", fallback = "personal") {
  const normalized = String(value ?? "").trim().toLowerCase();
  return VALID_DAMAGE_SCALES.has(normalized) ? normalized : fallback;
}

function toDamageNumber(value = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? Math.max(0, numeric) : 0;
}

export function buildDamageScaleConversion({
  damage = 0,
  sourceScale = "personal",
  targetScale = "personal",
} = {}) {
  const original = toDamageNumber(damage);
  const source = normalizeDamageScale(sourceScale, "personal");
  const target = normalizeDamageScale(targetScale, "personal");
  let converted = original;
  let factor = 1;

  if (source === "machine" && target === "personal") {
    factor = DAMAGE_SCALE_FACTOR;
    converted = original * factor;
  } else if (source === "personal" && target === "machine") {
    factor = 1 / DAMAGE_SCALE_FACTOR;
    converted = Math.floor(original * factor);
  }

  return {
    sourceScale: source,
    targetScale: target,
    original,
    converted: Math.max(0, converted),
    factor,
    changed: source !== target,
  };
}

export function scaleDamageForTarget(damage = 0, options = {}) {
  return buildDamageScaleConversion({ ...options, damage }).converted;
}
