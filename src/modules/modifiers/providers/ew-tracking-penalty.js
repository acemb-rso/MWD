// src/modules/modifiers/providers/ew-tracking-penalty.js
// Emits negative dice-pool modifiers for attack rolls against EW-hardened targets.

import { TEMPLATE } from "../../constants.js";
import { getAttackerCombatant, getTrackingPenalty } from "../../mwd/machine-ew-state.js";

function isMachineActor(actor) {
  return actor?.type === TEMPLATE.actorTypes.vehicle || actor?.type === TEMPLATE.actorTypes.battlemech;
}

export class EwTrackingPenaltyProvider {
  id = "mwd.ewTrackingPenalty";
  label = "EW Tracking Penalty";

  collect({ actor, resolved, payload } = {}) {
    if (!isMachineActor(actor)) return [];
    const intent = String(resolved?.intent ?? payload?.intent ?? "").trim();
    if (intent !== "attack") return [];

    const targets = resolved?.attack?.targets ?? [];
    if (!targets.length) return [];

    const firstTarget = targets[0];
    const targetTokenId = String(firstTarget?.tokenId ?? "").trim();
    if (!targetTokenId) return [];

    const targetToken = canvas?.tokens?.get?.(targetTokenId) ?? null;
    const targetActor = targetToken?.actor ?? null;
    const targetCombatant = game.combat?.combatants?.find(c => c.tokenId === targetTokenId) ?? null;

    const penalty = getTrackingPenalty(targetActor, targetCombatant);
    if (!penalty) return [];

    return [{
      id: "ew.trackingPenalty",
      label: "Tracking Penalty",
      value: -penalty,
      source: "EW",
    }];
  }
}
