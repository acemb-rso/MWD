// src/modules/roll/intent/resolve-common.js
// Purpose: Resolves common fixed-formula checks into the canonical roll context.
// How it fits: First-class intent resolver for reusable two-attribute utility rolls.

import {
  formatCommonCheckFormula,
  getCommonCheckAttributeKey,
  getCommonCheckAttributeLabel,
  getCommonCheckDefinition
} from "../config/common-checks.js";

export async function resolveCommon({ actor, payload } = {}) {
  if (!actor) throw new Error("resolveCommon requires actor");

  const id = String(payload?.id ?? "").trim();
  if (!id) throw new Error("Common rolls require payload.id");

  const definition = getCommonCheckDefinition(id);
  if (!definition) throw new Error(`Unknown common check: ${id}`);

  const formulaCodes = Array.isArray(definition.formula) ? definition.formula : [];
  if (formulaCodes.length !== 2) {
    throw new Error(`Common check ${id} must define exactly two attributes.`);
  }

  const attributes = formulaCodes.map(code => {
    const attrKey = getCommonCheckAttributeKey(code);
    if (!attrKey) throw new Error(`Common check ${id} uses unsupported attribute code: ${code}`);

    return {
      code: String(code).trim().toUpperCase(),
      key: attrKey,
      label: getCommonCheckAttributeLabel(code),
      value: Number(actor.getAttributeValue?.(attrKey) ?? actor.system?.attributes?.[attrKey]?.value ?? 0)
    };
  });

  const attributeTotal = attributes.reduce((sum, attribute) => sum + Number(attribute.value ?? 0), 0);
  const tags = Array.isArray(definition.tags) ? [...definition.tags] : [];
  const domains = Array.isArray(definition.domains) ? [...definition.domains] : [];

  return {
    intent: "common",
    rollType: "simple",
    title: String(definition.label ?? id).trim() || id,
    subtitle: actor.name ?? "Actor",
    domains,
    tags,
    formula: formatCommonCheckFormula(formulaCodes),
    difficulty: {
      dn: Number.isFinite(Number(payload?.dn)) ? Number(payload.dn) : 1
    },
    edge: {
      earn: { enabled: true, rate: 4, maxPerRoll: 1 }
    },
    pool: {
      attribute: attributeTotal,
      skill: 0,
      bonus: 0,
      specialization: 0
    },
    breakdown: attributes.map(attribute => ({
      id: `attribute.${attribute.code.toLowerCase()}`,
      label: attribute.label,
      value: attribute.value
    })),
    data: {
      commonCheckId: id,
      label: String(definition.label ?? id).trim() || id,
      formulaCodes,
      tags,
      attributes
    }
  };
}
