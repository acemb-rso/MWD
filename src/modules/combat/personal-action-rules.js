// src/modules/combat/personal-action-rules.js
// Purpose: Evaluates owned personal gear rules that affect personal combat actions.
// How it fits: Lets equipment unlock or disable catalog actions without hardcoding
// item names into the personal action executor or sheet model.

import { TEMPLATE } from "../core/constants.js";
import { evaluatePhase, normalizeCarrier } from "../mwd/rules.js";

const RULE_GATED_ACTION_IDS = Object.freeze(new Set(["spotIndirect"]));

function toArray(collection = []) {
  if (typeof collection?.values === "function") return Array.from(collection.values());
  return Array.from(collection ?? []);
}

function isGearItem(item = null) {
  return item?.canonicalType === TEMPLATE.itemType.gear
    || item?.type === TEMPLATE.itemType.gear
    || item?.type === "gear";
}

function isUsableGear(item = null) {
  const system = item?.system ?? {};
  if (!isGearItem(item)) return false;
  if (system.inactive) return false;
  if (Number(system.quantity ?? 1) <= 0) return false;
  return system.equipped !== false;
}

function getGearRuleCarriers(actor = null) {
  return toArray(actor?.items)
    .filter(isUsableGear)
    .map(item => {
      const rules = normalizeCarrier(item.system ?? {}).rules;
      return rules.length ? { item, rules } : null;
    })
    .filter(Boolean);
}

function getItemTags(item = null) {
  const tags = item?.system?.tags;
  if (Array.isArray(tags)) return tags.map(tag => String(tag ?? "").trim()).filter(Boolean);
  return String(tags ?? "")
    .split(",")
    .map(tag => tag.trim())
    .filter(Boolean);
}

function buildFacts({ actor = null, action = {}, snapshot = null, item = null } = {}) {
  const actionTags = Array.isArray(action.tags) ? action.tags : [];
  const itemTags = getItemTags(item);
  return {
    actor,
    actorType: String(actor?.type ?? "").trim(),
    actionId: String(action?.id ?? "").trim(),
    action: {
      id: String(action?.id ?? "").trim(),
      category: String(action?.category ?? "").trim(),
      cost: action?.cost ?? null,
    },
    gear: {
      id: String(item?.id ?? "").trim(),
      name: String(item?.name ?? "").trim(),
      equipped: item?.system?.equipped !== false,
      active: Boolean(item?.system?.active),
      quantity: Number(item?.system?.quantity ?? 1) || 0,
      category: String(item?.system?.category ?? "").trim(),
      tags: itemTags,
    },
    combat: {
      hasCombatant: Boolean(snapshot?.hasCombatant),
      isCurrentTurn: Boolean(snapshot?.isCurrentTurn),
      round: Number(snapshot?.combat?.round ?? 0) || 0,
      turn: Number(snapshot?.combat?.turn ?? 0) || 0,
    },
    tags: Array.from(new Set([
      ...actionTags,
      ...itemTags.map(tag => `gear.${tag}`),
      `action.${String(action?.id ?? "").trim()}`,
      `category.${String(action?.category ?? "").trim()}`,
    ].filter(Boolean))),
    selectors: [
      "actionAvailability",
      `action.${String(action?.id ?? "").trim()}`,
      `category.${String(action?.category ?? "").trim()}`,
    ].filter(Boolean),
  };
}

function outputAppliesToAction(output = {}, action = {}) {
  const actionId = String(action?.id ?? "").trim();
  const outputActionId = String(output?.actionId ?? "").trim();
  return !outputActionId || outputActionId === actionId;
}

export function evaluatePersonalActionAvailability(actor = null, action = {}, { snapshot = null, runtime = {} } = {}) {
  const outputs = [];
  const entries = [];

  for (const carrier of getGearRuleCarriers(actor)) {
    const result = evaluatePhase({
      actor,
      carrierItems: [carrier],
      phase: "actionAvailability",
      facts: buildFacts({ actor, action, snapshot, item: carrier.item }),
      runtime: {
        combat: snapshot?.combat ?? null,
        combatant: snapshot?.combatant ?? null,
        state: snapshot?.state ?? null,
        sceneId: snapshot?.combat?.scene?.id ?? globalThis.canvas?.scene?.id ?? "",
        ...runtime,
      },
    });
    entries.push(...result.entries);
    outputs.push(...result.outputs.filter(output => output.type === "actionAvailability" && outputAppliesToAction(output, action)));
  }

  return {
    entries,
    outputs,
    enabled: outputs.some(output => output.enabled !== false),
    disabled: outputs.find(output => output.enabled === false) ?? null,
  };
}

export function getPersonalActionAvailabilityReason(actor = null, action = {}, options = {}) {
  const actionId = String(action?.id ?? "").trim();
  const availability = evaluatePersonalActionAvailability(actor, action, options);

  if (availability.disabled) {
    return availability.disabled.reason
      || `${availability.disabled.sourceName || "Gear"} disables ${action?.label ?? "this action"}.`;
  }

  if (RULE_GATED_ACTION_IDS.has(actionId) && !availability.enabled) {
    return "Requires equipped spotting gear.";
  }

  return "";
}

