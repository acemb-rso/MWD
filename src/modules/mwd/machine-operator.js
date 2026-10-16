// src/modules/mwd/machine-operator.js
/**
 * @pipeline shared
 * @role Operator resolution service. Given a machine actor (and optional explicit
 *   operator), resolves the personal actor who pays action economy / Edge / roll
 *   costs — explicit choice first, then authored pilot/crew links. Shared by
 *   resolvers, execution, and sheets; high fan-in (~18).
 * @invariants
 *   - INVARIANT(canonical): the single place "who operates this machine" is
 *     decided. Callers must route cost/Edge/pool spending through the resolved
 *     actor rather than re-deriving the pilot ad hoc (Design Principles §6.2, §11).
 *   - Fail explicit, not silent: when no operator can be resolved it returns a
 *     `reason` (and null actor) so the UI can explain why personal resources
 *     cannot spend — it does not guess an actor (§14).
 * @consumers resolve-attack.js, mwd-roll.js, queued-attack-damage.js, machine-quick-actions.js
 */

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
