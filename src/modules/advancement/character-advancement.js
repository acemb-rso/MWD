// src/modules/advancement/character-advancement.js
// Purpose: Centralized character build validation and XP advancement service.
// How it fits: Actor sheets emit purchase intents here; this module validates,
// prices, and commits advancement changes.

import { MWD_SKILLS, getSkillSpecializationDefs, normalizeStoredSkillSpecializationKeys } from "../mwd/skills.js";
import { toNumber } from "../utils/coercion.js";

export const ADVANCEMENT_MODE = "advancement";

export const ATTRIBUTE_KEYS = Object.freeze([
  "strength",
  "reflexes",
  "guts",
  "intelligence",
  "charisma",
  "edge",
]);

export const EDGE_POOL_KEYS = Object.freeze([
  "grit",
  "chaos",
  "insight",
  "rumor",
  "legend",
  "credibility",
]);

export const PURCHASE_TYPES = Object.freeze({
  attribute: "attribute",
  skill: "skill",
  edgePool: "edgePool",
  traitAdd: "traitAdd",
  traitRemove: "traitRemove",
  specializationAdd: "specializationAdd",
  specializationChange: "specializationChange",
  knowledgeSkillAdd: "knowledgeSkillAdd",
  knowledgeSkillRemove: "knowledgeSkillRemove",
});

const EXPERIENCE_TIERS = Object.freeze([
  { id: "green", label: "Green", attributePoints: 5, skillPoints: 10, edgeBonus: 0 },
  { id: "regular", label: "Regular", attributePoints: 8, skillPoints: 14, edgeBonus: 2 },
  { id: "veteran", label: "Veteran", attributePoints: 11, skillPoints: 18, edgeBonus: 4 },
  { id: "elite", label: "Elite", attributePoints: 14, skillPoints: 22, edgeBonus: 6 },
]);

const SKILL_BY_CODE = new Map(MWD_SKILLS.map(skill => [skill.code, skill]));
const ATTRIBUTE_LABELS = Object.freeze({
  strength: "Strength",
  reflexes: "Reflexes",
  guts: "Guts",
  intelligence: "Intelligence",
  charisma: "Charisma",
  edge: "Edge",
});
const EDGE_POOL_LABELS = Object.freeze({
  grit: "Grit",
  chaos: "Chaos",
  insight: "Insight",
  rumor: "Rumor",
  legend: "Legend",
  credibility: "Credibility",
});

function toInt(value, fallback = 0) {
  return Math.trunc(toNumber(value, fallback));
}

function toNonNegativeInt(value, fallback = 0) {
  return Math.max(0, toInt(value, fallback));
}

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeKnowledgeSkills(value = []) {
  const source = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];
  const seen = new Set();
  const result = [];
  for (const entry of source) {
    const label = normalizeText(entry);
    const key = label.toLocaleLowerCase();
    if (!label || seen.has(key)) continue;
    seen.add(key);
    result.push(label);
  }
  return result;
}

function normalizeEdgePoolKey(value = "") {
  const raw = normalizeText(value);
  const shortKey = raw.includes(".") ? raw.split(".").pop() : raw;
  return EDGE_POOL_KEYS.includes(shortKey) ? shortKey : "";
}

function normalizeItemUuid(value = "") {
  return normalizeText(value);
}

function getActorItems(actor = null) {
  const items = actor?.items;
  if (!items) return [];
  if (Array.isArray(items)) return items;
  if (Array.isArray(items.contents)) return items.contents;
  if (typeof items[Symbol.iterator] === "function") return Array.from(items);
  return [];
}

function getItemByIdOrUuid(actor = null, idOrUuid = "") {
  const key = normalizeText(idOrUuid);
  if (!key) return null;
  return getActorItems(actor).find(item => item?.uuid === key || item?.id === key || item?._id === key) ?? null;
}

function getQualityItems(actor = null) {
  return getActorItems(actor).filter(item => (item?.canonicalType ?? item?.type) === "quality");
}

function getQualityCategory(item = null) {
  const system = item?.system ?? {};
  const category = normalizeText(system.category);
  if (category) return category;
  return system.positive === false ? "negative" : "positive";
}

function makePreview({ intent, label = "", cost = 0, updates = {}, itemCreates = [], itemDeletes = [], itemUpdates = {}, errors = [], warnings = [], from = null, to = null } = {}) {
  return {
    intent,
    label,
    cost: toNonNegativeInt(cost),
    from,
    to,
    legal: errors.length === 0,
    errors,
    warnings,
    updates,
    itemCreates,
    itemDeletes,
    itemUpdates,
  };
}

function getXpState(actorOrSystem = {}) {
  const system = actorOrSystem?.system ?? actorOrSystem ?? {};
  const earned = toNonNegativeInt(system?.counters?.xp?.total, 0);
  const spent = toNonNegativeInt(system?.counters?.xp?.value, 0);
  return {
    earned,
    spent,
    available: Math.max(0, earned - spent),
  };
}

function assertAvailableXp(preview, actor) {
  if (!preview.legal) return preview;
  const available = getXpState(actor).available;
  if (preview.cost > available) {
    preview.legal = false;
    preview.errors.push(`Not enough XP available (${preview.cost} needed, ${available} available).`);
  }
  return preview;
}

function costFor(type, newRating = 0) {
  const rating = toNonNegativeInt(newRating, 0);
  switch (type) {
    case PURCHASE_TYPES.attribute: return rating * 5;
    case PURCHASE_TYPES.skill: return rating * 3;
    case PURCHASE_TYPES.edgePool: return rating * 2;
    case PURCHASE_TYPES.traitAdd:
    case PURCHASE_TYPES.traitRemove: return 6;
    case PURCHASE_TYPES.specializationAdd: return 4;
    case PURCHASE_TYPES.specializationChange: return 2;
    default: return 0;
  }
}

function buildXpUpdate(actor, cost) {
  const spent = getXpState(actor).spent;
  return { "system.counters.xp.value": spent + toNonNegativeInt(cost, 0) };
}

function normalizePurchaseIntent(intent = {}) {
  return {
    ...intent,
    type: normalizeText(intent?.type),
    target: normalizeText(intent?.target),
    from: intent?.from,
    to: intent?.to,
    label: normalizeText(intent?.label),
    specializationKey: normalizeText(intent?.specializationKey ?? intent?.to),
    specializationLabel: normalizeText(intent?.specializationLabel),
  };
}

export function getExperienceTiers() {
  return EXPERIENCE_TIERS.map(tier => ({ ...tier }));
}

export function normalizeCharacterAdvancementState(systemData = {}) {
  systemData.counters ??= {};
  systemData.counters.xp ??= {};
  systemData.counters.xp.total = toNonNegativeInt(systemData.counters.xp.total, 0);
  systemData.counters.xp.value = toNonNegativeInt(systemData.counters.xp.value, 0);
  systemData.knowledgeSkills = normalizeKnowledgeSkills(systemData.knowledgeSkills);
  return systemData;
}

export function getCharacterXpState(actorOrSystem = {}) {
  return getXpState(actorOrSystem);
}

export function getAdvancementCost(type, newRating = 0) {
  return costFor(type, newRating);
}

export function evaluateBuild(actor, { tier = "" } = {}) {
  const system = actor?.system ?? actor ?? {};
  const tierDef = EXPERIENCE_TIERS.find(entry => entry.id === normalizeText(tier || system?.biography?.experienceLevel)) ?? EXPERIENCE_TIERS[0];
  const knowledgeSkills = normalizeKnowledgeSkills(system.knowledgeSkills);
  const edgeValue = toNonNegativeInt(system?.attributes?.edge?.value, 1);

  const attributeSpent = ATTRIBUTE_KEYS.reduce((sum, key) => (
    sum + Math.max(0, toNonNegativeInt(system?.attributes?.[key]?.value, 1) - 1)
  ), 0);
  const skillSpent = MWD_SKILLS.reduce((sum, skill) => (
    sum + toNonNegativeInt(system?.skills?.[skill.code]?.rating, 0)
  ), Math.max(0, knowledgeSkills.length - 1));
  const edgeSpent = EDGE_POOL_KEYS.reduce((sum, key) => (
    sum + Math.max(0, toNonNegativeInt(system?.counters?.edgePools?.[key]?.rating, 1) - 1)
  ), 0);
  const qualityItems = getQualityItems(actor);
  const positiveTraits = qualityItems.filter(item => getQualityCategory(item) === "positive").length;
  const negativeTraits = qualityItems.filter(item => getQualityCategory(item) === "negative").length;
  const lifeModules = getActorItems(actor).filter(item => (item?.canonicalType ?? item?.type) === "lifeModule").length;

  const categories = [
    { id: "attributes", label: "Attributes", used: attributeSpent, budget: tierDef.attributePoints },
    { id: "skills", label: "Skills", used: skillSpent, budget: tierDef.skillPoints },
    { id: "edgePools", label: "Edge Pools", used: edgeSpent, budget: edgeValue + tierDef.edgeBonus },
  ].map(entry => ({
    ...entry,
    remaining: entry.budget - entry.used,
    status: entry.used > entry.budget ? "over" : entry.used === entry.budget ? "complete" : "under",
  }));

  const warnings = [];
  for (const category of categories) {
    if (category.used > category.budget) warnings.push(`${category.label} exceed ${tierDef.label} budget by ${category.used - category.budget}.`);
  }
  for (const key of ATTRIBUTE_KEYS) {
    const value = toNonNegativeInt(system?.attributes?.[key]?.value, 1);
    if (value > 4) warnings.push(`${ATTRIBUTE_LABELS[key]} is above the starting cap of 4.`);
  }
  for (const skill of MWD_SKILLS) {
    const rating = toNonNegativeInt(system?.skills?.[skill.code]?.rating, 0);
    if (rating > 4) warnings.push(`${skill.label} is above the starting cap of 4.`);
  }
  for (const key of EDGE_POOL_KEYS) {
    const rating = toNonNegativeInt(system?.counters?.edgePools?.[key]?.rating, 1);
    if (rating > edgeValue) warnings.push(`${EDGE_POOL_LABELS[key]} exceeds the Edge attribute cap.`);
  }
  if (knowledgeSkills.length === 0) warnings.push("Add at least one Knowledge Skill.");
  if (positiveTraits < 1) warnings.push("Add at least one positive trait.");
  if (negativeTraits < 1) warnings.push("Add at least one negative trait.");
  if (lifeModules < 4) warnings.push("Add four life modules.");

  return {
    tier: { ...tierDef },
    categories,
    warnings,
    complete: warnings.length === 0 && categories.every(category => category.status === "complete"),
    knowledgeSkills,
    traits: { positive: positiveTraits, negative: negativeTraits },
    lifeModules: { count: lifeModules, expected: 4 },
  };
}

export function previewPurchase(actor, rawIntent = {}, { mode = ADVANCEMENT_MODE } = {}) {
  const intent = normalizePurchaseIntent(rawIntent);
  if (mode !== ADVANCEMENT_MODE) {
    return makePreview({ intent, errors: ["XP purchases can only be committed in advancement mode."] });
  }

  const system = actor?.system ?? {};
  const errors = [];
  const warnings = [];

  if (intent.type === PURCHASE_TYPES.attribute) {
    const key = intent.target;
    if (!ATTRIBUTE_KEYS.includes(key)) errors.push("Unknown attribute.");
    const current = toNonNegativeInt(system?.attributes?.[key]?.value, 1);
    const next = toNonNegativeInt(intent.to, current + 1);
    if (next <= current) errors.push("Attribute purchases must increase the rating.");
    if (next > 6) errors.push("Attributes cannot be advanced above 6.");
    const cost = costFor(PURCHASE_TYPES.attribute, next);
    const preview = makePreview({
      intent,
      label: `${ATTRIBUTE_LABELS[key] ?? key} ${current} -> ${next}`,
      cost,
      from: current,
      to: next,
      errors,
      warnings,
      updates: { [`system.attributes.${key}.value`]: next },
    });
    return assertAvailableXp(preview, actor);
  }

  if (intent.type === PURCHASE_TYPES.skill) {
    const key = intent.target;
    const skill = SKILL_BY_CODE.get(key);
    if (!skill) errors.push("Unknown skill.");
    const current = toNonNegativeInt(system?.skills?.[key]?.rating, 0);
    const next = toNonNegativeInt(intent.to, current + 1);
    if (next <= current) errors.push("Skill purchases must increase the rating.");
    if (next > 6) errors.push("Skills cannot be advanced above 6.");
    const cost = costFor(PURCHASE_TYPES.skill, next);
    const preview = makePreview({
      intent,
      label: `${skill?.label ?? key} ${current} -> ${next}`,
      cost,
      from: current,
      to: next,
      errors,
      warnings,
      updates: { [`system.skills.${key}.rating`]: next },
    });
    return assertAvailableXp(preview, actor);
  }

  if (intent.type === PURCHASE_TYPES.edgePool) {
    const key = normalizeEdgePoolKey(intent.target);
    if (!key) errors.push("Unknown Edge pool.");
    const edgeCap = toNonNegativeInt(system?.attributes?.edge?.value, 1);
    const current = toNonNegativeInt(system?.counters?.edgePools?.[key]?.rating, 1);
    const currentValue = toNonNegativeInt(system?.counters?.edgePools?.[key]?.value, 0);
    const next = toNonNegativeInt(intent.to, current + 1);
    if (next <= current) errors.push("Edge pool purchases must increase the rating.");
    if (next > edgeCap) errors.push("Edge pool ratings cannot exceed the Edge attribute.");
    const cost = costFor(PURCHASE_TYPES.edgePool, next);
    const preview = makePreview({
      intent: { ...intent, target: key },
      label: `${EDGE_POOL_LABELS[key] ?? key} ${current} -> ${next}`,
      cost,
      from: current,
      to: next,
      errors,
      warnings,
      updates: {
        [`system.counters.edgePools.${key}.rating`]: next,
        [`system.counters.edgePools.${key}.value`]: Math.min(currentValue, Math.min(next, edgeCap)),
      },
    });
    return assertAvailableXp(preview, actor);
  }

  if (intent.type === PURCHASE_TYPES.specializationAdd || intent.type === PURCHASE_TYPES.specializationChange) {
    const key = intent.target;
    const skill = SKILL_BY_CODE.get(key);
    if (!skill) errors.push("Unknown skill.");
    const rating = toNonNegativeInt(system?.skills?.[key]?.rating, 0);
    if (rating < 2) errors.push("Specializations require skill rating 2+.");
    const rawKeys = normalizeStoredSkillSpecializationKeys(system?.skills?.[key]?.specializations ?? []);
    const existingKey = rawKeys[0] ?? "";
    if (intent.type === PURCHASE_TYPES.specializationAdd && existingKey) errors.push("This skill already has a specialization.");
    if (intent.type === PURCHASE_TYPES.specializationChange && !existingKey) errors.push("There is no specialization to change.");
    const choices = getSkillSpecializationDefs(key);
    const selected = choices.find(entry => entry.key === intent.specializationKey)
      ?? (intent.specializationKey ? { key: intent.specializationKey, label: intent.specializationLabel || intent.specializationKey } : null);
    if (!selected?.key) errors.push("Choose a specialization.");
    if (selected?.key && selected.key === existingKey) errors.push("Choose a different specialization.");
    const cost = costFor(intent.type);
    const preview = makePreview({
      intent: { ...intent, specializationKey: selected?.key ?? "", specializationLabel: selected?.label ?? "" },
      label: `${skill?.label ?? key}: ${selected?.label ?? "Specialization"}`,
      cost,
      from: existingKey,
      to: selected?.key ?? "",
      errors,
      warnings,
      updates: { [`system.skills.${key}.specializations`]: selected?.key ? [selected.key] : rawKeys },
    });
    return assertAvailableXp(preview, actor);
  }

  if (intent.type === PURCHASE_TYPES.traitAdd) {
    const name = intent.label || intent.target || "Positive Trait";
    const cost = costFor(PURCHASE_TYPES.traitAdd);
    const preview = makePreview({
      intent,
      label: `Add ${name}`,
      cost,
      itemCreates: [{
        name,
        type: "quality",
        system: { category: "positive", positive: true, tier: "minor" },
      }],
    });
    return assertAvailableXp(preview, actor);
  }

  if (intent.type === PURCHASE_TYPES.traitRemove) {
    const item = getItemByIdOrUuid(actor, normalizeItemUuid(intent.target));
    if (!item) errors.push("Trait not found.");
    if (item && getQualityCategory(item) !== "negative") errors.push("Only negative traits can be removed with this purchase.");
    const cost = costFor(PURCHASE_TYPES.traitRemove);
    const preview = makePreview({
      intent,
      label: `Remove ${item?.name ?? "Negative Trait"}`,
      cost,
      itemDeletes: item ? [item.id ?? item._id] : [],
      errors,
    });
    return assertAvailableXp(preview, actor);
  }

  if (intent.type === PURCHASE_TYPES.knowledgeSkillAdd) {
    const label = intent.label || intent.target;
    const knowledgeSkills = normalizeKnowledgeSkills(system.knowledgeSkills);
    if (!label) errors.push("Knowledge skill name is required.");
    if (knowledgeSkills.some(entry => entry.toLocaleLowerCase() === label.toLocaleLowerCase())) errors.push("That Knowledge Skill already exists.");
    return makePreview({
      intent,
      label: `Add ${label}`,
      cost: 0,
      errors,
      warnings: ["No automated post-creation XP cost is defined for Knowledge Skills."],
      updates: { "system.knowledgeSkills": normalizeKnowledgeSkills([...knowledgeSkills, label]) },
    });
  }

  if (intent.type === PURCHASE_TYPES.knowledgeSkillRemove) {
    const label = intent.label || intent.target;
    const knowledgeSkills = normalizeKnowledgeSkills(system.knowledgeSkills);
    const nextSkills = knowledgeSkills.filter(entry => entry.toLocaleLowerCase() !== label.toLocaleLowerCase());
    if (!label || nextSkills.length === knowledgeSkills.length) errors.push("Knowledge skill not found.");
    return makePreview({
      intent,
      label: `Remove ${label}`,
      cost: 0,
      errors,
      updates: { "system.knowledgeSkills": nextSkills },
    });
  }

  return makePreview({ intent, errors: ["Unknown advancement purchase type."] });
}

export function getAvailablePurchases(actor) {
  const system = actor?.system ?? {};
  const available = [];
  for (const key of ATTRIBUTE_KEYS) {
    const current = toNonNegativeInt(system?.attributes?.[key]?.value, 1);
    if (current < 6) available.push(previewPurchase(actor, { type: PURCHASE_TYPES.attribute, target: key, to: current + 1 }));
  }
  for (const skill of MWD_SKILLS) {
    const current = toNonNegativeInt(system?.skills?.[skill.code]?.rating, 0);
    if (current < 6) available.push(previewPurchase(actor, { type: PURCHASE_TYPES.skill, target: skill.code, to: current + 1 }));
  }
  for (const key of EDGE_POOL_KEYS) {
    const current = toNonNegativeInt(system?.counters?.edgePools?.[key]?.rating, 1);
    available.push(previewPurchase(actor, { type: PURCHASE_TYPES.edgePool, target: key, to: current + 1 }));
  }
  return available;
}

export async function commitPurchase(actor, rawIntent = {}) {
  if (!actor?.update) throw new Error("commitPurchase requires an updatable actor.");
  const preview = previewPurchase(actor, rawIntent, { mode: ADVANCEMENT_MODE });
  if (!preview.legal) {
    const error = new Error(preview.errors[0] ?? "Advancement purchase is not legal.");
    error.preview = preview;
    throw error;
  }

  if (preview.itemCreates.length) {
    if (!actor.createEmbeddedDocuments) throw new Error("Actor cannot create trait items.");
    await actor.createEmbeddedDocuments("Item", preview.itemCreates);
  }

  if (preview.itemDeletes.length) {
    if (!actor.deleteEmbeddedDocuments) throw new Error("Actor cannot delete trait items.");
    await actor.deleteEmbeddedDocuments("Item", preview.itemDeletes);
  }

  if (Object.keys(preview.itemUpdates).length) {
    if (!actor.updateEmbeddedDocuments) throw new Error("Actor cannot update embedded items.");
    await actor.updateEmbeddedDocuments("Item", Object.values(preview.itemUpdates));
  }

  const updates = {
    ...preview.updates,
    ...buildXpUpdate(actor, preview.cost),
  };
  await actor.update(updates);

  return {
    ok: true,
    preview,
    updates,
  };
}

export const CharacterAdvancement = Object.freeze({
  getExperienceTiers,
  evaluateBuild,
  getAvailablePurchases,
  previewPurchase,
  commitPurchase,
  normalizeCharacterAdvancementState,
  getCharacterXpState,
  getAdvancementCost,
});
