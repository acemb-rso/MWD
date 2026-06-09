// src/modules/mwd/machine-initiative.js
// Purpose: Resolves vehicle-scale initiative components.
// How it fits: Keeps machine initiative tied to the machine's best control attribute plus its pilot's reflexes.

import { TEMPLATE } from "../constants.js";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function getAttributeValue(actor, key) {
  return Math.max(0, toNumber(actor?.system?.attributes?.[key]?.value, 0));
}

export function isMachineActor(actor) {
  return actor?.type === TEMPLATE.actorTypes.vehicle || actor?.type === TEMPLATE.actorTypes.battlemech;
}

export function resolveMachineInitiativeComponents({ machineActor = null, pilotActor = null } = {}) {
  const handling = getAttributeValue(machineActor, TEMPLATE.actorAttributes.handling);
  const system = getAttributeValue(machineActor, TEMPLATE.actorAttributes.system);
  const pilotReflexes = Math.max(0, toNumber(
    pilotActor?.getAttributeValue?.(TEMPLATE.actorAttributes.reflexes)
      ?? pilotActor?.system?.attributes?.[TEMPLATE.actorAttributes.reflexes]?.value,
    0
  ));
  const machineAttributeKey = system > handling
    ? TEMPLATE.actorAttributes.system
    : TEMPLATE.actorAttributes.handling;
  const machineAttributeLabel = system > handling ? "System" : "Handling";
  const machineAttributeValue = Math.max(handling, system);

  return {
    handling,
    system,
    machineAttributeKey,
    machineAttributeLabel,
    machineAttributeValue,
    pilotReflexes,
    totalBonus: machineAttributeValue + pilotReflexes,
  };
}
