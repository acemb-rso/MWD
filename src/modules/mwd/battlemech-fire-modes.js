// src/modules/mwd/battlemech-fire-modes.js
// Purpose: Defines BattleMech weapon group fire modes and their action costs.
// How it fits: Shared by sheets and the machine action service so UI hints and
// validation read from the same mode catalog.

export const FIRE_MODES = Object.freeze({
  chainFire: Object.freeze({
    id: "chainFire",
    label: "Chain Fire",
    saCost: 1,
    implemented: true,
    coverageHint: "1 group",
    hint: "Controlled fire with one selected weapon group."
  }),
  alphaStrike: Object.freeze({
    id: "alphaStrike",
    label: "Alpha Strike",
    saCost: 2,
    implemented: true,
    coverageHint: "all groups",
    hint: "Baseline BattleMech attack: fire every available weapon group."
  }),
  rapidFire: Object.freeze({
    id: "rapidFire",
    label: "Rapid Fire",
    saCost: 2,
    implemented: true,
    coverageHint: "1 group xN",
    hint: "Sustained fire from one rapid-capable weapon group."
  }),
});

export const DEFAULT_FIRE_MODE = "alphaStrike";
export const FIRE_MODE_IDS = Object.freeze(Object.keys(FIRE_MODES));

export function getFireModeDefinition(id = "") {
  return FIRE_MODES[String(id ?? "").trim()] ?? FIRE_MODES[DEFAULT_FIRE_MODE];
}
