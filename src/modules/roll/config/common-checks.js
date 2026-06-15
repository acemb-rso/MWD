// src/modules/roll/config/common-checks.js
// Purpose: Defines reusable common two-attribute checks for the modern roll engine.
// How it fits: Shared source of truth for declarative payload references and resolver lookup.

import { ACTOR_ATTRIBUTES } from "../../core/constants.js";

const ATTRIBUTE_CODE_MAP = Object.freeze({
  STR: ACTOR_ATTRIBUTES.strength,
  REF: ACTOR_ATTRIBUTES.reflexes,
  GUTS: ACTOR_ATTRIBUTES.guts,
  INT: ACTOR_ATTRIBUTES.intelligence,
  CHA: ACTOR_ATTRIBUTES.charisma
});

const ATTRIBUTE_LABEL_MAP = Object.freeze({
  STR: "Strength",
  REF: "Reflexes",
  GUTS: "Guts",
  INT: "Intelligence",
  CHA: "Charisma"
});

export const COMMON_CHECKS = Object.freeze({
  composure: {
    id: "composure",
    label: "Composure",
    formula: ["GUTS", "CHA"],
    tags: ["combat", "utility", "mental"],
    domains: ["mental"]
  },
  judgeIntent: {
    id: "judgeIntent",
    label: "Judge Intent",
    formula: ["INT", "CHA"],
    tags: ["combat", "utility", "social", "mental"],
    domains: ["social", "mental"]
  },
  memory: {
    id: "memory",
    label: "Memory",
    formula: ["INT", "INT"],
    tags: ["combat", "utility", "mental"],
    domains: ["mental"]
  },
  lift: {
    id: "lift",
    label: "Lift",
    formula: ["STR", "STR"],
    tags: ["combat", "utility", "physical"],
    domains: ["physical"]
  },
  endure: {
    id: "endure",
    label: "Endure",
    formula: ["STR", "GUTS"],
    tags: ["combat", "utility", "physical", "mental"],
    domains: ["physical", "mental"]
  },
  steady: {
    id: "steady",
    label: "Steady",
    formula: ["REF", "GUTS"],
    tags: ["combat", "utility", "physical", "mental", "recovery"],
    domains: ["physical", "mental"]
  }
});

export function getCommonCheckDefinition(id) {
  const normalized = String(id ?? "").trim();
  return normalized ? COMMON_CHECKS[normalized] ?? null : null;
}

export function getCommonCheckPayload(id) {
  const definition = getCommonCheckDefinition(id);
  if (!definition) return null;

  return {
    intent: "common",
    id: definition.id
  };
}

export function getCommonCheckAttributeKey(code) {
  return ATTRIBUTE_CODE_MAP[String(code ?? "").trim().toUpperCase()] ?? null;
}

export function getCommonCheckAttributeLabel(code) {
  return ATTRIBUTE_LABEL_MAP[String(code ?? "").trim().toUpperCase()] ?? String(code ?? "").trim().toUpperCase();
}

export function formatCommonCheckFormula(codes = []) {
  return (Array.isArray(codes) ? codes : [])
    .map(code => String(code ?? "").trim().toUpperCase())
    .filter(Boolean)
    .join(" + ");
}
