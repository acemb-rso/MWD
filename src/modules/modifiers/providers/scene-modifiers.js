// src/modules/modifiers/providers/scene-modifiers.js
// Reads active scene modifiers from scene flags and contributes them to the roll pipeline.
// Applicability filtering (intent, attribute) is centralized here — not in the GM Gadget.

export const SCENE_MODIFIERS_FLAG = "activeModifiers";

export const SCENE_MODIFIER_ATTRIBUTE_OPTIONS = [
  { value: "", label: "All Attributes" },
  { value: "reflexes", label: "Reflexes" },
  { value: "strength", label: "Strength" },
  { value: "willpower", label: "Willpower" },
  { value: "charisma", label: "Charisma" },
  { value: "intelligence", label: "Intelligence" },
  { value: "edge", label: "Edge" }
];

export const SCENE_MODIFIER_INTENT_OPTIONS = [
  { value: "", label: "All Intents" },
  { value: "skill", label: "Skill" },
  { value: "attack", label: "Attack" },
  { value: "defense", label: "Defense" },
  { value: "common", label: "Common" },
  { value: "attribute", label: "Attribute" },
  { value: "edge", label: "Edge" },
  { value: "initiative", label: "Initiative" }
];

// --- Matching helpers (only called from this file) ---

function normalizeFilter(v) {
  const s = String(v ?? "").trim();
  return s === "" ? null : s;
}

function getResolvedIntent(resolved) {
  return String(resolved?.intent ?? "").trim() || null;
}

function getResolvedAttrKey(resolved) {
  return (
    resolved?.data?.attrKey ??          // skill rolls
    resolved?.attack?.skill?.attribute ?? // attack rolls
    null
  );
}

function matchesFilter(filterValue, actualValue) {
  if (!filterValue) return true;   // wildcard
  if (!actualValue) return false;  // roll has no value to match — filter rejects
  return filterValue === actualValue;
}

export function normalizeActiveModifier(mod) {
  return {
    id: String(mod?.id ?? ""),
    label: String(mod?.label ?? "").trim(),
    value: Math.trunc(Number(mod?.value ?? 0)) || 0,
    enabled: mod?.enabled !== false,
    attributeFilter: normalizeFilter(mod?.attributeFilter),
    intentFilter: normalizeFilter(mod?.intentFilter),
    source: mod?.source === "preset" ? "preset" : "adhoc"
  };
}

// --- Provider ---

export class SceneModifiersProvider {
  id = "mwd.sceneModifiers";

  collect({ resolved } = {}) {
    const raw = canvas?.scene?.getFlag("mwd", SCENE_MODIFIERS_FLAG);
    if (!Array.isArray(raw) || !raw.length) return [];

    const intent = getResolvedIntent(resolved);
    const attrKey = getResolvedAttrKey(resolved);

    const out = [];
    for (const entry of raw) {
      const mod = normalizeActiveModifier(entry);
      if (!mod.enabled) continue;
      if (!matchesFilter(mod.intentFilter, intent)) continue;
      if (!matchesFilter(mod.attributeFilter, attrKey)) continue;
      out.push({
        id: mod.id || `scene:${mod.label}`,
        label: mod.label,
        value: mod.value,
        source: "Scene"
      });
    }
    return out;
  }
}
