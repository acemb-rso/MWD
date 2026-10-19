// src/modules/mwd/machine-action-statuses.js
// Purpose: The one writer for statuses a machine action changes on success,
// as declared in the machine action catalog: `appliesToTarget` (put on the
// action's target, e.g. ECM Spike -> ECM Jamming) and `clearsOnSuccess`
// (removed from the acting machine, e.g. EPM Filter clears ECM Jamming).
// How it fits: roll/ew-execution.js decides whether the roll succeeded; this
// module performs the writes. A client that cannot write the target sends the
// machine-action GM relay request kind "applyTargetStatus", whose GM handler
// calls applyActionTargetStatuses. Status ids always come from the catalog,
// never from the request, so a relayed request cannot apply arbitrary statuses.

import { applyManagedStatusUpdate } from "../dialog/token-status-dialog.js";
import { isMachineActor } from "../utils/actor-guards.js";
import { getMachineActionDefinition } from "./machine-action-catalog.js";

/**
 * Put the action's declared `appliesToTarget` statuses on its target.
 * @returns {Promise<{ok:boolean, reason?:string, applied?:string[]}>}
 */
export async function applyActionTargetStatuses({ actionKey = "", targetActor = null } = {}) {
  const action = getMachineActionDefinition(actionKey);
  const statusIds = action.appliesToTarget ?? [];
  if (!statusIds.length) return { ok: false, reason: `${action.label} does not apply a status to its target.` };
  if (!isMachineActor(targetActor)) return { ok: false, reason: `${action.label} target is not a machine.` };

  const applied = [];
  for (const statusId of statusIds) {
    if (targetActor.statuses?.has?.(statusId)) continue;
    await applyManagedStatusUpdate({ actor: targetActor, statusId, active: true });
    applied.push(statusId);
  }
  return { ok: true, applied };
}

/**
 * Remove the action's declared `clearsOnSuccess` statuses from the acting
 * machine.
 * @returns {Promise<{ok:boolean, cleared:string[]}>}
 */
export async function clearActionSelfStatuses({ actionKey = "", actor = null } = {}) {
  const action = getMachineActionDefinition(actionKey);
  const cleared = [];
  for (const statusId of action.clearsOnSuccess ?? []) {
    if (!actor?.statuses?.has?.(statusId)) continue;
    await applyManagedStatusUpdate({ actor, statusId, active: false });
    cleared.push(statusId);
  }
  return { ok: true, cleared };
}
