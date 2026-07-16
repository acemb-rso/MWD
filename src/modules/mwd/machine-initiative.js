// src/modules/mwd/machine-initiative.js
// Purpose: Resolves vehicle-scale initiative components.
// Workflow: combat initiative roll asks for machine context -> best machine
// control attribute plus pilot Reflexes -> tracker receives total initiative bonus.

import { TEMPLATE } from "../core/constants.js";
import { toNumber } from "../utils/coercion.js";
export { isMachineActor } from "../utils/actor-guards.js";

function getAttributeValue(actor, key) {
  return Math.max(0, toNumber(actor?.system?.attributes?.[key]?.value, 0));
}

export function resolveMachineInitiativeComponents({ machineActor = null, pilotActor = null } = {}) {
  // Machine initiative uses the better machine control attribute plus pilot
  // Reflexes, keeping pilot skill relevant without duplicating machine stats.
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
