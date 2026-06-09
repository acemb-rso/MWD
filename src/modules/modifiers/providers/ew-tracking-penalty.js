// src/modules/modifiers/providers/ew-tracking-penalty.js
// Emits negative dice-pool modifiers for attack rolls against EW-hardened targets.

import { TEMPLATE } from "../../constants.js";
import { getTrackingPenalty } from "../../mwd/machine-ew-state.js";
import { buildMachineAttackMotionContext } from "../../mwd/machine-attack-motion.js";
import { getStealthTrackingPenalty } from "../../mwd/machine-stealth.js";

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
    const mods = [];

    const penalty = getTrackingPenalty(targetActor, null);
    if (penalty) {
      mods.push({
        id: "ew.trackingPenalty",
        label: "Tracking Penalty",
        value: -penalty,
        source: "EW",
      });
    }

    const stealthPenalty = getStealthTrackingPenalty(actor, targetActor, {
      intent,
      payload,
      resolved,
      rangeBand: resolved?.attack?.rangeBand,
      targetToken,
    });
    if (stealthPenalty) mods.push(stealthPenalty);

    const motion = resolved?.attack?.machineMotion
      ?? buildMachineAttackMotionContext({ targetActor, payload });
    if (motion?.movementTrackingPenalty) {
      mods.push({
        id: "machineMotion.tracking",
        label: `Target Movement (${Number(motion.trackingHexes ?? 0)} hex)`,
        value: motion.movementTrackingPenalty,
        source: "Motion",
      });
    }
    if (motion?.jumpTrackingPenalty) {
      mods.push({
        id: "machineMotion.jumpTracking",
        label: "Target Jumped",
        value: motion.jumpTrackingPenalty,
        source: "Motion",
      });
    }

    return mods;
  }
}
