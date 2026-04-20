// src/modules/roll/intent/resolve-initiative.js
// Purpose: Resolves actor initiative into the canonical roll context.
// How it fits: Characters use REF/Edge, while machines use their best Handling/System plus linked pilot Reflexes.

import { isMachineActor, resolveMachineInitiativeComponents } from "../../mwd/machine-initiative.js";
import { resolveMachineOperator } from "../../mwd/machine-operator.js";

export async function resolveInitiative({ actor } = {}) {
  if (isMachineActor(actor)) {
    const operator = await resolveMachineOperator({ machineActor: actor });
    const components = resolveMachineInitiativeComponents({
      machineActor: actor,
      pilotActor: operator.actor,
    });
    const pilotLabel = operator.actor?.name
      ? `Pilot REF (${operator.actor.name})`
      : "Pilot REF";

    return {
      intent: "initiative",
      title: "Initiative",
      rollType: "sum",
      domains: ["combat", "machine"],
      sum: {
        formula: "2d6 + @machine + @pilotReflexes",
        data: {
          machine: components.machineAttributeValue,
          pilotReflexes: components.pilotReflexes,
        }
      },
      breakdown: [
        { id: "base", label: "2d6", value: 0 },
        {
          id: `machine.${components.machineAttributeKey}`,
          label: `Best Machine (${components.machineAttributeLabel})`,
          value: components.machineAttributeValue,
        },
        {
          id: "pilot.reflexes",
          label: pilotLabel,
          value: components.pilotReflexes,
          title: operator.reason,
        },
      ],
      pool: { attribute: 0, skill: 0, bonus: 0 }
    };
  }

  const ref  = Number(actor.system?.attributes?.reflexes?.value ?? 0);
  const edge = Number(actor.system?.attributes?.edge?.value ?? 0);

  return {
    intent: "initiative",
    title: "Initiative",
    rollType: "sum",                 // <- tells executor how to roll
    domains: ["combat"],           // <- for organizational/filtering purposes
    sum: {
      formula: "2d6 + @ref + @edge",
      data: { ref, edge }
    },
    breakdown: [
      { id: "base", label: "2d6", value: 0 },
      { id: "ref",  label: "REF", value: ref },
      { id: "edge", label: "EDGE", value: edge }
    ],
    // keep pool numeric to satisfy normalizeResolvedContext (if still used)
    pool: { attribute: 0, skill: 0, bonus: 0 }
  };
}
