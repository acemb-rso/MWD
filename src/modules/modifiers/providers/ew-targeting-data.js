// src/modules/modifiers/providers/ew-targeting-data.js
// Emits positive dice-pool modifier from stored targeting data packets.

import { isMachineActor } from "../../utils/actor-guards.js";

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
