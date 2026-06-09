// src/modules/modifiers/providers/stealth-emission-acquire.js
// Emits acquire dice bonuses against targets broadcasting a high signature.

import { TEMPLATE } from "../../constants.js";
import { getHighEmissionAcquireDicePart } from "../../mwd/machine-stealth.js";

function isMachineActor(actor) {
  return actor?.type === TEMPLATE.actorTypes.vehicle || actor?.type === TEMPLATE.actorTypes.battlemech;
}

function resolveAcquireTargetActor(resolved = {}) {
  const direct = resolved?.acquire?.targetActor ?? resolved?.targetActor ?? null;
  if (direct) return direct;

  const tokenId = String(resolved?.acquire?.targetTokenId ?? "").trim();
  if (tokenId) {
    const token = globalThis.canvas?.tokens?.get?.(tokenId) ?? null;
    if (token?.actor) return token.actor;
  }

  const tokenUuid = String(resolved?.acquire?.targetTokenUuid ?? "").trim();
  if (tokenUuid) {
    const token = globalThis.canvas?.tokens?.placeables?.find(candidate =>
      (candidate.document?.uuid ?? candidate.uuid) === tokenUuid
    ) ?? null;
    if (token?.actor) return token.actor;
  }

  return null;
}

export class StealthEmissionAcquireProvider {
  id = "mwd.stealthEmissionAcquire";
  label = "Stealth Emission Acquire";

  collect({ actor, resolved, payload } = {}) {
    if (!isMachineActor(actor)) return [];
    const intent = String(resolved?.intent ?? payload?.intent ?? "").trim();
    const actionId = String(payload?.actionId ?? resolved?.data?.actionId ?? "").trim();
    if (intent !== "acquire" && actionId !== "acquireTarget") return [];

    const targetActor = resolveAcquireTargetActor(resolved);
    const part = getHighEmissionAcquireDicePart(actor, targetActor, {
      intent: "acquire",
      payload,
      resolved,
    });
    return part ? [part] : [];
  }
}
