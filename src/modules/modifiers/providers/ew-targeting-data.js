// src/modules/modifiers/providers/ew-targeting-data.js
// Emits positive dice-pool modifier from stored targeting data packets.

import { TEMPLATE } from "../../core/constants.js";

function isMachineActor(actor) {
  return actor?.type === TEMPLATE.actorTypes.vehicle || actor?.type === TEMPLATE.actorTypes.battlemech;
}

export class EwTargetingDataProvider {
  id = "mwd.ewTargetingData";
  label = "EW Targeting Data";

  collect({ actor, resolved, payload } = {}) {
    if (!isMachineActor(actor)) return [];
    const intent = String(resolved?.intent ?? payload?.intent ?? "").trim();
    if (intent !== "attack") return [];

    const value = Number(resolved?.attack?.ewContext?.targetingDataValue ?? 0);
    if (!value) return [];

    return [{
      id: "ew.targetingData",
      label: "Targeting Data",
      value,
      source: "EW",
    }];
  }
}
