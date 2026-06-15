// src/modules/mwd/machine-operator.js
// Purpose: Resolves the actor who pays for machine actions and repairs.
// Workflow: machine action/remedy requests -> explicit operator or pilot lookup
// -> action economy, Edge, and roll pools charge the resolved personal actor.

async function resolveActorUuid(uuid = "") {
  const value = String(uuid ?? "").trim();
  if (!value || typeof fromUuid !== "function") return null;
  try {
    return await fromUuid(value);
  } catch (_error) {
    return null;
  }
}

export async function resolveMachineOperator({
  machineActor = null,
  operatorActorUuid = "",
} = {}) {
  // Explicit operator choice wins, then authored pilot/crew links. Returning a
  // reason without an actor lets UI explain why personal resources cannot spend.
  const explicit = await resolveActorUuid(operatorActorUuid);
  if (explicit) {
    return { actor: explicit, uuid: explicit.uuid ?? operatorActorUuid, source: "explicit", reason: "" };
  }

  const pilotUuid = String(
    machineActor?.system?.pilot?.uuid
    ?? machineActor?.system?.mwd?.pilot?.uuid
    ?? machineActor?.system?.mwd?.crew?.operatorActorUuid
    ?? machineActor?.system?.mwd?.crew?.pilotActorUuid
    ?? ""
  ).trim();
  const pilot = await resolveActorUuid(pilotUuid);
  if (pilot) {
    return { actor: pilot, uuid: pilot.uuid ?? pilotUuid, source: "pilot", reason: "" };
  }

  const crew = machineActor?.system?.mwd?.crew ?? {};
  if (Number(crew?.effectiveCount ?? crew?.count ?? 0) > 0) {
    return {
      actor: null,
      uuid: "",
      source: "crew",
      reason: "Crew exists, but no operator actor is linked.",
    };
  }

  return {
    actor: null,
    uuid: "",
    source: "",
    reason: "No linked operator or pilot actor.",
  };
}
