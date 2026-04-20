// src/modules/modifiers/providers/machine-criticals.js
// Purpose: Emits first-pass roll penalties from active machine critical records.
// How it fits: Providers read system.mwd.crits; token statuses stay visual-only.

import { getActiveMachineCrits } from "../../mwd/critical-hits.js";

const MOD_VALUES = Object.freeze({
  attackCQPenalty: { value: -1, intents: ["attack"], label: "Attack CQ Penalty" },
  sensorPenalty: { value: -1, skills: ["perception", "technician"], label: "Sensor Penalty" },
  pilotingPenalty: { value: -1, skills: ["piloting"], label: "Piloting Penalty" },
});

export class MachineCriticalsProvider {
  id = "mwd.machineCriticals";
  label = "Machine Criticals";

  collect({ actor, resolved, payload } = {}) {
    const crits = getActiveMachineCrits(actor);
    if (!crits.length) return [];

    const intent = String(resolved?.intent ?? payload?.intent ?? "").trim();
    const skill = String(resolved?.attack?.skill?.code ?? resolved?.skill?.code ?? payload?.key ?? "").trim();
    const mods = [];

    for (const crit of crits) {
      for (const modKey of crit.mods ?? []) {
        const def = MOD_VALUES[modKey];
        if (!def) continue;
        if (def.intents && !def.intents.includes(intent)) continue;
        if (def.skills && !def.skills.includes(skill)) continue;

        mods.push({
          id: `machineCrit.${crit.id}.${modKey}`,
          label: `${crit.label ?? "Machine Critical"}: ${def.label}`,
          value: def.value,
          source: "Machine Critical",
        });
      }
    }

    return mods;
  }
}
