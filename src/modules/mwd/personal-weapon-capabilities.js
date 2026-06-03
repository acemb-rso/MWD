// src/modules/mwd/personal-weapon-capabilities.js
// Purpose: Normalizes personal-weapon capability data, separating capabilities from keywords.
// How it fits: Provides explicit authored-state rules for payload/workflow routing without hidden tag math.

function normalizeStringList(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.values(value).flatMap(entry => normalizeStringList(entry));
  }

  if (Array.isArray(value)) {
    return value
      .map(entry => String(entry ?? "").trim())
      .filter(Boolean);
  }

  return String(value ?? "")
    .split(",")
    .map(entry => entry.trim())
    .filter(Boolean);
}

function distinctStrings(values = []) {
  return Array.from(new Set(values.map(entry => String(entry ?? "").trim()).filter(Boolean)));
}

function normalizeResolverKey(value, fallback = "standard") {
  return String(value ?? "").trim() || fallback;
}

function pushMovedEntry(report, entry = {}) {
  if (!report) return;
  report.movedToKeywords ??= [];
  report.movedToKeywords.push(entry);
}

function pushError(report, message, details = {}) {
  if (!report) return;
  report.errors ??= [];
  report.errors.push({ message, ...details });
}

export const PERSONAL_WEAPON_LIVE_CAPABILITIES = Object.freeze(["templated"]);
export const PERSONAL_WEAPON_RESERVED_WEAPON_CAPABILITIES = Object.freeze([
  "burstCapable",
  "fullAutoCapable",
  "salvoCapable",
]);
export const PERSONAL_WEAPON_RESERVED_PAYLOAD_CAPABILITIES = Object.freeze([
  "clustered",
  "mineLayer",
  "smoke",
  "incendiary",
  "emp",
  "armorBypass",
]);

export const PERSONAL_WEAPON_WEAPON_CAPABILITY_OPTIONS = Object.freeze([
  { value: "burstCapable", label: "Burst Capable" },
  { value: "fullAutoCapable", label: "Full Auto Capable" },
  { value: "salvoCapable", label: "Salvo Capable" },
]);

export const PERSONAL_WEAPON_PAYLOAD_CAPABILITY_OPTIONS = Object.freeze([
  { value: "templated", label: "Templated" },
  { value: "clustered", label: "Clustered" },
  { value: "mineLayer", label: "Mine Layer" },
  { value: "smoke", label: "Smoke" },
  { value: "incendiary", label: "Incendiary" },
  { value: "emp", label: "EMP" },
  { value: "armorBypass", label: "Armor Bypass" },
]);

export const PERSONAL_WEAPON_TEMPLATE_SHAPES = Object.freeze([
  { value: "blast", label: "Blast" },
  { value: "cone", label: "Cone" },
  { value: "line", label: "Line" },
  { value: "cloud", label: "Cloud" },
  { value: "minefield", label: "Minefield" },
]);

export const PERSONAL_WEAPON_TEMPLATE_PLACEMENTS = Object.freeze([
  { value: "targeted", label: "Targeted (start on target)" },
  { value: "origin", label: "Origin (start on attacker)" },
  { value: "placed", label: "Placed (start free)" },
]);

export const PERSONAL_WEAPON_EXECUTABLE_TEMPLATE_SHAPES = Object.freeze(["blast", "cone", "line"]);

const LIVE_CAPABILITY_SET = new Set(PERSONAL_WEAPON_LIVE_CAPABILITIES);
const WEAPON_CAPABILITY_SET = new Set([
  ...PERSONAL_WEAPON_LIVE_CAPABILITIES,
  ...PERSONAL_WEAPON_RESERVED_WEAPON_CAPABILITIES,
]);
const PAYLOAD_CAPABILITY_SET = new Set([
  ...PERSONAL_WEAPON_LIVE_CAPABILITIES,
  ...PERSONAL_WEAPON_RESERVED_PAYLOAD_CAPABILITIES,
]);

export function createCapabilityMigrationReport() {
  return {
    movedToKeywords: [],
    errors: [],
  };
}

export function normalizePersonalWeaponKeywords(value) {
  return distinctStrings(normalizeStringList(value));
}

function normalizeCapabilityBucket({
  traits = [],
  keywords = [],
  recognized = new Set(),
  report = null,
  owner = "weapon",
  path = "",
} = {}) {
  const normalizedTraits = normalizeStringList(traits);
  const normalizedKeywords = normalizePersonalWeaponKeywords(keywords);
  const keptTraits = [];
  const movedKeywords = [...normalizedKeywords];

  for (const entry of normalizedTraits) {
    if (recognized.has(entry)) {
      keptTraits.push(entry);
      continue;
    }

    movedKeywords.push(entry);
    pushMovedEntry(report, {
      owner,
      from: path || "traits",
      to: path ? path.replace(/traits$/u, "keywords") : "keywords",
      value: entry,
    });
  }

  return {
    traits: distinctStrings(keptTraits),
    keywords: distinctStrings(movedKeywords),
  };
}

export function normalizeWeaponCapabilityState({
  traits = [],
  keywords = [],
  report = null,
  path = "system.traits",
} = {}) {
  return normalizeCapabilityBucket({
    traits,
    keywords,
    recognized: WEAPON_CAPABILITY_SET,
    report,
    owner: "weapon",
    path,
  });
}

export function normalizePayloadCapabilityState({
  traits = [],
  keywords = [],
  report = null,
  path = "system.payloads[].traits",
} = {}) {
  return normalizeCapabilityBucket({
    traits,
    keywords,
    recognized: PAYLOAD_CAPABILITY_SET,
    report,
    owner: "payload",
    path,
  });
}

export function normalizePersonalWeaponResolution(value = {}, fallback = "standard") {
  const source = value ?? {};
  const resolverKey = normalizeResolverKey(
    source.resolverKey ?? source.damageModel ?? source.resolver,
    fallback
  );
  const damageModel = String(source.damageModel ?? "").trim();
  const rawEffect = source.onHitEffect;

  return {
    resolverKey,
    damageModel,
    onHitEffect: rawEffect === null ? null : (String(rawEffect ?? "").trim() || null),
  };
}

function normalizeFireModeConfig(value = {}) {
  const source = value ?? {};
  const enabled = Boolean(source.enabled);
  const shotsRaw = source.shots;
  const accuracyModRaw = source.accuracyMod;
  const addHeatRaw = source.addHeat;
  const consumptionRaw = source.consumption;

  return {
    enabled,
    ...(shotsRaw !== undefined ? { shots: Math.max(0, Number(shotsRaw ?? 0) || 0) } : {}),
    ...(accuracyModRaw !== undefined ? { accuracyMod: Number(accuracyModRaw ?? 0) || 0 } : {}),
    ...(addHeatRaw !== undefined ? { addHeat: Number(addHeatRaw ?? 0) || 0 } : {}),
    ...(consumptionRaw !== undefined ? { consumption: Math.max(0, Number(consumptionRaw ?? 0) || 0) } : {}),
  };
}

export function normalizePersonalWeaponFireModes(value = {}) {
  const source = value ?? {};
  return {
    single: normalizeFireModeConfig(source.single),
    burst: normalizeFireModeConfig(source.burst),
    fullAuto: normalizeFireModeConfig(source.fullAuto),
  };
}

function normalizeTemplateShape(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (normalized === "circle") return "blast";
  if (normalized === "ray") return "line";
  if (PERSONAL_WEAPON_TEMPLATE_SHAPES.some(entry => entry.value === normalized)) {
    return normalized;
  }
  return "";
}

function normalizeTemplatePlacement(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["target", "targeted"].includes(normalized)) return "targeted";
  if (PERSONAL_WEAPON_TEMPLATE_PLACEMENTS.some(entry => entry.value === normalized)) {
    return normalized;
  }
  return "";
}

export function normalizePersonalWeaponTemplate(value = null) {
  const source = value ?? {};
  const shape = normalizeTemplateShape(source.shape ?? source.t ?? source.type);
  const sizeRaw = source.size ?? source.distance ?? source.radius ?? source.length;
  const placement = normalizeTemplatePlacement(source.placement ?? source.origin ?? source.mode);

  if (!shape && sizeRaw === undefined && !placement) return null;

  return {
    shape,
    size: Math.max(0, Number(sizeRaw ?? 0) || 0),
    placement: placement || "targeted",
  };
}

export function validateTemplatedCapability({
  weapon = {},
  payload = {},
  effectiveTraits = [],
  effectiveResolution = null,
  report = null,
} = {}) {
  const weaponTraits = distinctStrings(weapon?.traits ?? []);
  const payloadTraits = distinctStrings(payload?.traits ?? []);
  const hasTemplated = effectiveTraits.includes("templated");
  const weaponHasTemplated = weaponTraits.includes("templated");
  const payloadHasTemplated = payloadTraits.includes("templated");
  const payloadTemplate = payload?.template ?? null;
  const weaponTemplate = weapon?.template ?? null;
  const payloadResolverKey = normalizeResolverKey(payload?.resolution?.resolverKey, "");
  const weaponResolverKey = normalizeResolverKey(weapon?.resolution?.resolverKey, "");
  const effectiveResolverKey = normalizeResolverKey(effectiveResolution?.resolverKey, "standard");
  const errors = [];

  if (!hasTemplated) {
    return {
      errors,
      liveCapabilities: [],
      template: null,
      resolverKey: effectiveResolverKey,
      isTemplated: false,
    };
  }

  if (weaponHasTemplated) {
    errors.push("Weapon-authored templated attacks are not supported in personal weapon capability v1.");
  }

  if (weaponHasTemplated && payloadHasTemplated) {
    errors.push("Templated capability cannot be authored on both weapon and payload.");
  }

  if (weaponTemplate) {
    errors.push("Template configuration must be authored on the payload for templated attacks.");
  }

  if (!payloadHasTemplated) {
    errors.push("Templated attacks require the active payload to author the templated capability.");
  }

  if (!payloadTemplate?.shape || !(Number(payloadTemplate?.size) > 0)) {
    errors.push("Templated payloads require a valid template shape and size.");
  }

  if (!payloadTemplate?.placement) {
    errors.push("Templated payloads require a template placement mode.");
  }

  if (effectiveResolverKey !== "template") {
    errors.push("Templated attacks require resolution.resolverKey to be template.");
  }

  if (payloadResolverKey && payloadResolverKey !== "template") {
    errors.push("Payload templated attacks must author resolution.resolverKey as template.");
  }

  if (weaponResolverKey === "template") {
    errors.push("Weapon-level template resolver routing is not supported for personal weapon capability v1.");
  }

  for (const message of errors) {
    pushError(report, message, { capability: "templated" });
  }

  return {
    errors,
    liveCapabilities: ["templated"],
    template: payloadTemplate,
    resolverKey: effectiveResolverKey,
    isTemplated: true,
  };
}

export function isLiveCapability(value) {
  return LIVE_CAPABILITY_SET.has(String(value ?? "").trim());
}
