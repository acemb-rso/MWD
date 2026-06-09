// src/modules/mwd/machine-quick-actions.js
// Purpose: Executes shared machine quick checks for piloting, EW, and critical repair.
// How it fits: Sheets choose the requested action or issue; this layer emits the
// canonical roll intent payloads into the shared roll engine.

import { MWD } from "../config.js";
import { SYSTEM_SOCKET, TEMPLATE } from "../constants.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { RemoteCall } from "../remotecall.js";
import { DEFAULT_FIRE_MODE, FIRE_MODE_IDS, getFireModeDefinition } from "./battlemech-fire-modes.js";
import { performMachineMeleeAttack } from "./battlemech-melee-actions.js";
import { performChargeAttack } from "./charge-attack-actions.js";
import { performBattlemechMovementAction } from "./battlemech-movement-actions.js";
import { performBattlemechRangedAttack } from "./battlemech-ranged-actions.js";
import { performVehicleRangedAttack } from "./vehicle-ranged-actions.js";
import { buildMachineEwPanel, getMachineEwAssetCapabilities, resolveMachineEwActionTarget } from "./machine-ew-panel.js";
import { getMachineActionDefinition } from "./machine-action-catalog.js";
import { findAssetModuleActionOverride } from "./asset-module-effects.js";
import { buildBattlemechHeatModel, resolveBattlemechPendingHeat } from "./machine-heat.js";
import { prepareMachineRemedyRoll } from "./machine-intents.js";
import { resolveMachineOperator } from "./machine-operator.js";
import { resolveMachineSceneToken } from "./machine-token-resolution.js";
import { getMachineRepairIssues } from "./machine-repair-issues.js";
import { performVehicleMovementAction } from "./vehicle-movement-actions.js";
import { resolveVehiclePendingStrain } from "./vehicle-strain.js";
import { findAttachedBattleArmorTargets } from "./battle-armor.js";
import { goDarkMachineSignature, setMachineTransientEmission } from "./machine-stealth.js";

const GM_MACHINE_ACTION_REQUEST = "MachineActions.gmMachineActionRequest";
const GM_MACHINE_ACTION_RESPONSE = "MachineActions.gmMachineActionResponse";
const GM_MACHINE_ACTION_TIMEOUT_MS = 10000;
const pendingGmMachineActionRequests = new Map();
let gmMachineActionSocketRegistered = false;
const TRANSIENT_EMISSION_EW_ACTIONS = new Set(["sensorSweep", "acquireTarget", "sensorLock", "tagTarget", "ecmSpike"]);

function getMachineRollApi() {
  return game.mwd?.roll ?? game.system?.mwd?.roll ?? null;
}

function getRollUnavailableResult() {
  const reason = "MWD roll system not initialized.";
  ui.notifications?.error(reason);
  return { ok: false, reason };
}

function assertMachineActionActor(actor) {
  if (!actor) throw new Error("MWD machine action requires actor.");
}

function normalizeMachineActionRequest(request = {}) {
  if (!request || typeof request !== "object") {
    throw new Error("MWD machine action request must be an object.");
  }
  const intent = String(request.intent ?? request.payload?.intent ?? "").trim();
  const kind = String(request.kind ?? (intent === "machineAction" ? "action" : "")).trim();
  if (!kind) throw new Error("MWD machine action request requires kind.");
  return { ...request, kind };
}

function assertMachineActionResult(result, kind) {
  if (!result || typeof result !== "object" || typeof result.ok !== "boolean") {
    throw new Error(`MWD machine action "${kind}" returned an invalid result.`);
  }
  if (result.ok === false && !String(result.reason ?? "").trim()) {
    throw new Error(`MWD machine action "${kind}" returned a failure without reason.`);
  }
  return result;
}

function isMachineActor(actor = null) {
  return actor?.type === TEMPLATE.actorTypes.vehicle || actor?.type === TEMPLATE.actorTypes.battlemech;
}

function getActorIdentityKeys(actor = null) {
  const keys = new Set();
  const add = value => {
    const normalized = String(value ?? "").trim();
    if (normalized) keys.add(normalized);
  };

  add(actor?.id);
  add(actor?._id);
  add(actor?.uuid);
  add(actor?.actor?.id);
  add(actor?.actor?.uuid);
  add(actor?.baseActor?.id);
  add(actor?.baseActor?.uuid);
  return keys;
}

function actorsMatch(left = null, right = null) {
  if (!left || !right) return false;
  const rightKeys = getActorIdentityKeys(right);
  for (const key of getActorIdentityKeys(left)) {
    if (rightKeys.has(key)) return true;
  }
  return false;
}

function getUserById(userId = "") {
  const id = String(userId ?? "").trim();
  if (!id) return null;
  const users = globalThis.game?.users;
  if (typeof users?.get === "function") return users.get(id) ?? null;
  return Array.from(users ?? []).find(user => String(user?.id ?? "") === id) ?? null;
}

function userCanOperateAsActor(user = null, actor = null) {
  if (!user || !actor) return false;
  if (user.isGM) return true;

  if (typeof actor.testUserPermission === "function") {
    const ownerLevel = globalThis.CONST?.DOCUMENT_OWNERSHIP_LEVELS?.OWNER ?? 3;
    try {
      if (actor.testUserPermission(user, ownerLevel)) return true;
    } catch (_error) {
      // Fall through to character identity matching.
    }
  }

  return actorsMatch(actor, user.character);
}

function userOwnsActor(actor = null, user = globalThis.game?.user) {
  if (!actor || !user) return false;
  if (user.isGM) return true;
  if (typeof actor.testUserPermission !== "function") return true;

  const ownerLevel = globalThis.CONST?.DOCUMENT_OWNERSHIP_LEVELS?.OWNER ?? 3;
  try {
    return actor.testUserPermission(user, ownerLevel);
  } catch (_error) {
    return false;
  }
}

async function resolveActorUuid(uuid = "") {
  const value = String(uuid ?? "").trim();
  if (!value || typeof fromUuid !== "function") return null;
  try {
    return await fromUuid(value);
  } catch (_error) {
    return null;
  }
}

function getRequestId() {
  return globalThis.foundry?.utils?.randomID?.()
    ?? globalThis.crypto?.randomUUID?.()
    ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getTokenId(token = null) {
  return String(token?.document?.id ?? token?.id ?? "").trim();
}

function getTokenById(tokenId = "") {
  const id = String(tokenId ?? "").trim();
  if (!id) return null;
  return canvas?.scene?.tokens?.get?.(id)
    ?? canvas?.tokens?.get?.(id)?.document
    ?? canvas?.tokens?.placeables?.find?.(token => token?.id === id)?.document
    ?? canvas?.tokens?.placeables?.find?.(token => token?.id === id)
    ?? null;
}

function resolveRequestToken(actor, request = {}) {
  return request.token ?? getTokenById(request.tokenId) ?? resolveMachineSceneToken(actor);
}

function serializeMachineActionRequest(actor, request = {}) {
  const serialized = {
    kind: String(request.kind ?? "").trim(),
    machineActorUuid: String(actor?.uuid ?? request.machineActorUuid ?? "").trim(),
    operatorActorUuid: String(request.operatorActorUuid ?? "").trim(),
    tokenId: getTokenId(request.token),
    attackKind: String(request.attackKind ?? request.actionId ?? "").trim(),
    movementKind: String(request.movementKind ?? request.actionId ?? "").trim(),
    actionId: String(request.actionId ?? request.action?.id ?? request.action?.actionKey ?? "").trim(),
    mode: String(request.mode ?? "").trim(),
    controlIntent: String(request.controlIntent ?? "").trim(),
    intent: String(request.intent ?? "").trim(),
    sourceType: String(request.sourceType ?? "").trim(),
    sourceId: String(request.sourceId ?? request.itemId ?? request.weaponId ?? "").trim(),
    weaponId: String(request.weaponId ?? request.itemId ?? "").trim(),
    groupId: String(request.groupId ?? request.group?.id ?? "").trim(),
    newMode: String(request.newMode ?? request.fireMode ?? "").trim(),
    profileId: String(request.profileId ?? request.profile?.id ?? "").trim(),
    targetTokenId: String(request.targetTokenId ?? "").trim(),
    targetTokenUuid: String(request.targetTokenUuid ?? "").trim(),
    checkKind: String(request.checkKind ?? request.actionId ?? "").trim(),
    issueKind: String(request.issueKind ?? request.issue?.issueKind ?? "").trim(),
    issueId: String(request.issueId ?? request.issue?.issueId ?? request.critId ?? request.statusId ?? "").trim(),
    critId: String(request.critId ?? (request.issue?.issueKind === "crit" ? request.issue?.issueId : "") ?? "").trim(),
    statusId: String(request.statusId ?? (request.issue?.issueKind === "status" ? request.issue?.issueId : "") ?? "").trim(),
    remedyKey: String(request.remedyKey ?? request.issue?.remedyKey ?? "").trim(),
    source: String(request.source ?? "").trim(),
    reason: String(request.reason ?? "").trim(),
    postDangerCard: request.postDangerCard !== false,
    _gmRouted: true,
  };

  if (!serialized.sourceId && serialized.weaponId) serialized.sourceId = serialized.weaponId;
  if (!serialized.tokenId) delete serialized.tokenId;
  return serialized;
}

function serializeMachineActionResult(result = {}) {
  return {
    ok: Boolean(result?.ok),
    reason: String(result?.reason ?? "").trim(),
    userMessage: String(result?.userMessage ?? "").trim(),
    skipped: Boolean(result?.skipped),
  };
}

function shouldRouteMachineActionThroughGm(actor, request = {}) {
  return Boolean(globalThis.game?.user)
    && !globalThis.game.user.isGM
    && isMachineActor(actor)
    && !request?._gmRouted
    && !userOwnsActor(actor, globalThis.game.user);
}

function resolvePendingGmMachineActionRequest(data = {}) {
  const requestId = String(data?.requestId ?? "").trim();
  const userId = String(data?.userId ?? "").trim();
  if (!requestId || userId !== String(game?.user?.id ?? "")) return;

  const pending = pendingGmMachineActionRequests.get(requestId);
  if (!pending) return;

  clearTimeout(pending.timeout);
  pendingGmMachineActionRequests.delete(requestId);
  pending.resolve(data.result ?? { ok: false, reason: "GM operation returned no result." });
}

async function requestGmMachineAction(actor, request = {}) {
  const requestId = getRequestId();
  const userId = String(game?.user?.id ?? "").trim();
  if (!userId) return { ok: false, reason: "No active user for GM operation." };

  return new Promise(resolve => {
    const timeout = setTimeout(() => {
      pendingGmMachineActionRequests.delete(requestId);
      resolve({ ok: false, reason: "No active GM responded to the machine action request." });
    }, GM_MACHINE_ACTION_TIMEOUT_MS);

    pendingGmMachineActionRequests.set(requestId, { resolve, timeout });
    const sent = RemoteCall.call(GM_MACHINE_ACTION_REQUEST, {
      requestId,
      userId,
      request: serializeMachineActionRequest(actor, request),
    });

    if (!sent) {
      clearTimeout(timeout);
      pendingGmMachineActionRequests.delete(requestId);
      resolve({ ok: false, reason: "No remote GM is available for that machine action." });
    }
  });
}

async function authorizeGmMachineActionRequest(data = {}) {
  const requester = getUserById(data.userId);
  if (!requester) return { ok: false, reason: "Requesting user could not be resolved." };

  const request = normalizeMachineActionRequest(data.request ?? {});
  const machineActor = await resolveActorUuid(request.machineActorUuid);
  if (!isMachineActor(machineActor)) return { ok: false, reason: "Machine actor could not be resolved." };

  const operator = await resolveMachineOperator({
    machineActor,
    operatorActorUuid: request.operatorActorUuid,
  });
  if (!operator.actor) return { ok: false, reason: operator.reason || "No linked operator or pilot actor." };
  if (!userCanOperateAsActor(requester, operator.actor)) {
    return { ok: false, reason: "You do not control the assigned pilot or operator for this machine." };
  }

  return {
    ok: true,
    actor: machineActor,
    request: {
      ...request,
      operatorActorUuid: operator.actor.uuid ?? request.operatorActorUuid ?? "",
      token: getTokenById(request.tokenId),
      _gmRouted: true,
    },
  };
}

async function handleGmMachineActionRequest(data = {}) {
  if (!game?.user?.isGM) return;

  let result;
  try {
    const authorized = await authorizeGmMachineActionRequest(data);
    if (!authorized.ok) {
      result = { ok: false, reason: authorized.reason ?? "Machine action request was not authorized." };
    } else {
      result = serializeMachineActionResult(await executeMachineQuickAction(authorized.actor, authorized.request));
    }
  } catch (error) {
    console.error("MWD | GM machine action request failed", error);
    result = { ok: false, reason: error?.message ?? "Machine action GM operation failed." };
  }

  game.socket?.emit?.(SYSTEM_SOCKET, {
    msg: GM_MACHINE_ACTION_RESPONSE,
    data: {
      requestId: data.requestId,
      userId: data.userId,
      result,
    },
  });
}

export async function registerMachineActionGmOperations() {
  if (gmMachineActionSocketRegistered) return;
  gmMachineActionSocketRegistered = true;

  await RemoteCall.register(GM_MACHINE_ACTION_REQUEST, {
    condition: user => user.isGM,
    multiple: false,
    callback: data => { void handleGmMachineActionRequest(data); },
  });
  await RemoteCall.register(GM_MACHINE_ACTION_RESPONSE, {
    condition: () => true,
    multiple: true,
    callback: data => resolvePendingGmMachineActionRequest(data),
  });
}

async function executeRollPayload(actor, payload, event = null) {
  const rollApi = getMachineRollApi();
  if (!rollApi?.execute) return getRollUnavailableResult();
  const value = await rollApi.execute({ actor, payload, event });
  return { ok: true, value };
}

async function executeMachineAttack(actor, request) {
  const attackKind = String(request.attackKind ?? request.actionId ?? "").trim();
  const operatorActorUuid = String(request.operatorActorUuid ?? "").trim();
  const token = resolveRequestToken(actor, request);
  const sourceType = String(request.sourceType ?? "").trim();
  const sourceId = String(request.sourceId ?? request.itemId ?? request.weaponId ?? "").trim();

  if (sourceType === "mechWeapon" || sourceId) {
    if (!sourceId) throw new Error("Machine mechWeapon attack requires sourceId.");
    return executeRollPayload(actor, {
      intent: "attack",
      sourceType: "mechWeapon",
      sourceId,
      weaponId: sourceId,
      edge: { pool: "physical.grit", allowed: ["pre", "post"] },
      tags: ["combat", "attack", "machine"],
      sourceTokenId: token?.id ?? null,
      operatorActorUuid,
    }, request.event);
  }

  if (attackKind === "melee") {
    if (typeof actor.rollMeleeAttack === "function" && !request.profile && !request.profileId) {
      const value = await actor.rollMeleeAttack({ operatorActorUuid });
      return { ok: true, value };
    }
    return performMachineMeleeAttack(actor, {
      profile: request.profile ?? null,
      profileId: request.profileId ?? "",
      operatorActorUuid,
    });
  }

  const groupId = String(request.groupId ?? "").trim();
  if (attackKind === "ranged" || attackKind === "group" || groupId) {
    if (actor?.type === TEMPLATE.actorTypes.battlemech) {
      return performBattlemechRangedAttack(actor, {
        group: request.group ?? null,
        groupId,
        token,
        operatorActorUuid,
      });
    }
    if (actor?.type === TEMPLATE.actorTypes.vehicle) {
      return performVehicleRangedAttack(actor, {
        weaponId: groupId,
        token,
        operatorActorUuid,
      });
    }
    if (typeof actor.rollRangedAttack === "function" && !request.group && !request.token) {
      const value = await actor.rollRangedAttack({ groupId, operatorActorUuid });
      return { ok: true, value };
    }
    return performBattlemechRangedAttack(actor, {
      group: request.group ?? null,
      groupId,
      token,
      operatorActorUuid,
    });
  }

  throw new Error(`Unknown machine attack kind: ${attackKind || "(empty)"}`);
}

async function executeMachineFireModeChange(actor, request) {
  if (actor?.type !== TEMPLATE.actorTypes.battlemech) {
    return { ok: false, reason: "Fire modes are only available to BattleMechs." };
  }

  const newMode = String(request.newMode ?? request.fireMode ?? "").trim();
  if (!FIRE_MODE_IDS.includes(newMode)) {
    return { ok: false, reason: `Unknown BattleMech fire mode: ${newMode || "(empty)"}.` };
  }

  const modeDef = getFireModeDefinition(newMode);
  if (!modeDef.implemented) {
    return { ok: false, reason: `${modeDef.label} is not implemented yet.` };
  }

  const currentMode = String(actor.system?.mwd?.fireMode ?? DEFAULT_FIRE_MODE).trim() || DEFAULT_FIRE_MODE;
  if (newMode === currentMode) return { ok: true, unchanged: true };

  const token = resolveRequestToken(actor, request);
  const operator = await resolveMachineOperator({
    machineActor: actor,
    operatorActorUuid: String(request.operatorActorUuid ?? "").trim(),
  });
  const spendActor = operator?.actor ?? actor;
  const snapshot = PersonalCombatTracker.getSnapshot?.(spendActor, { token }) ?? null;

  if (!snapshot?.hasCombatant) {
    await actor.update({ "system.mwd.fireMode": newMode });
    return { ok: true };
  }

  if (!snapshot.isCurrentTurn) {
    return { ok: false, reason: "Only available during your activation." };
  }
  if (snapshot.state?.actionState?.fireModeChangedThisActivation) {
    return { ok: false, reason: "Fire mode can only be changed once per activation." };
  }

  const usesFreeAction = Number(snapshot.state?.faRemaining ?? 0) > 0;
  const spend = await PersonalCombatTracker.spendResource(spendActor, {
    token,
    resource: usesFreeAction ? "fa" : "sa",
    cost: 1,
    actionId: "changeFireMode",
    actionLabel: "Change Fire Mode",
    actionCostLabel: usesFreeAction ? "Free" : "1 SA",
    actionCategory: "free",
  });
  if (!spend?.ok) return spend;

  await PersonalCombatTracker._applyActionState?.(spendActor, {
    token,
    actionId: "changeFireMode",
    snapshot: spend.snapshot,
  });
  await actor.update({ "system.mwd.fireMode": newMode });
  return { ok: true };
}

async function executeMachineMovement(actor, request) {
  const movementKind = String(request.movementKind ?? request.actionId ?? "").trim();
  if (!movementKind) throw new Error("Machine movement action requires movementKind or actionId.");
  const options = {
    movementKind,
    operatorActorUuid: String(request.operatorActorUuid ?? "").trim(),
  };
  if (actor?.type === TEMPLATE.actorTypes.vehicle) return performVehicleMovementAction(actor, options);
  if (actor?.type === TEMPLATE.actorTypes.battlemech) return performBattlemechMovementAction(actor, options);
  return { ok: false, reason: "actor-not-machine", userMessage: "That actor is not a machine." };
}

async function executeMachineEwIntent(actor, request) {
  const intent = String(request.intent ?? "").trim();
  if (!["acquire", "targeting", "breakLock", "defensiveJink"].includes(intent)) return null;

  const token = resolveRequestToken(actor, request);
  const panel = buildMachineEwPanel({ actor, token });
  const explicitTargetTokenUuid = String(request.targetTokenUuid ?? "").trim();
  const explicitTargetTokenId = String(request.targetTokenId ?? "").trim();
  const targetRow = explicitTargetTokenUuid || explicitTargetTokenId
    ? (panel.rows ?? []).find(row =>
      (explicitTargetTokenUuid && row?.targetTokenUuid === explicitTargetTokenUuid)
      || (explicitTargetTokenId && row?.targetTokenId === explicitTargetTokenId)
    ) ?? null
    : (intent === "breakLock" || intent === "defensiveJink")
      ? getAnyEwTarget(panel)
      : resolveMachineEwActionTarget(panel, intent);
  if (!targetRow) {
    const verb = intent === "targeting"
      ? "generate targeting data"
      : intent === "breakLock"
        ? "break lock"
        : intent === "defensiveJink"
          ? "jink"
          : "acquire";
    return { ok: false, reason: "missing-target", userMessage: `No targeted token is ready to ${verb}.` };
  }

  const isEligible = intent === "breakLock" || intent === "defensiveJink"
    ? true
    : intent === "targeting" ? targetRow.canTarget : targetRow.canAcquire;
  if (!isEligible) {
    return {
      ok: false,
      reason: "target-not-eligible",
      userMessage: intent === "targeting"
        ? "That target is not ready for targeting data yet."
        : "That target cannot advance its detection state right now.",
    };
  }

  return executeRollPayload(actor, {
    intent,
    actionId: intent,
    sourceTokenId: token?.id ?? null,
    targetTokenId: targetRow.targetTokenId,
    targetTokenUuid: targetRow.targetTokenUuid,
    operatorActorUuid: String(request.operatorActorUuid ?? "").trim(),
  }, request.event);
}

async function executeMachineHeatDangerCheck(actor, request) {
  const checkKind = String(request.checkKind ?? request.actionId ?? "").trim();
  if (!["shutdown", "explosion"].includes(checkKind)) {
    return { ok: false, reason: "unknown-heat-danger-check", userMessage: "Unknown heat danger check." };
  }

  const heat = buildBattlemechHeatModel(actor);
  if (!heat.inDanger || !heat.dangerChecks) {
    return {
      ok: false,
      reason: "heat-not-in-danger",
      userMessage: "Heat danger checks are only available while the BattleMech is in Danger heat.",
    };
  }

  const dn = checkKind === "shutdown"
    ? Math.max(1, Number(heat.dangerChecks.shutdownDN ?? 1) || 1)
    : Math.max(1, Number(heat.dangerChecks.explosionDN ?? 1) || 1);

  const token = resolveRequestToken(actor, request);
  return executeRollPayload(actor, {
    intent: "heatDangerCheck",
    checkKind,
    dn,
    tags: ["machine", "heat", "danger", checkKind],
    edge: { allowed: [] },
    sourceTokenId: token?.id ?? null,
  }, request.event);
}

const BATTLEMECH_ACTION_MOVEMENT = Object.freeze({
  walk: "walk",
  safeThrust: "walk",
  run: "run",
  jumpMove: "jump",
  sprint: "sprint",
  dropProne: "prone",
  evasiveManeuver: "evasiveManeuver",
  shield: "shield",
});

const VEHICLE_ACTION_MOVEMENT = Object.freeze({
  walk: "move",
  safeThrust: "move",
  run: "reposition",
  sprint: "redline",
  brace: "brace",
  hullDown: "hullDown",
  evasiveManeuver: "evasiveManeuver",
  shield: "shield",
});

function machineMovementKindForAction(actor, actionKey = "") {
  const key = String(actionKey ?? "").trim();
  if (actor?.type === TEMPLATE.actorTypes.vehicle) return VEHICLE_ACTION_MOVEMENT[key] ?? "";
  if (actor?.type === TEMPLATE.actorTypes.battlemech) return BATTLEMECH_ACTION_MOVEMENT[key] ?? "";
  return "";
}

function disabledMachineActionResult(action, fallbackReason = "") {
  const reason = String(action?.implementation?.reason ?? fallbackReason ?? "").trim()
    || `${action?.label ?? "That machine action"} is not implemented yet.`;
  ui.notifications?.warn(reason);
  return { ok: false, reason, userMessage: reason, actionId: action?.key ?? "" };
}

async function executeMachineNarrativeAction(actor, action, request = {}) {
  const token = resolveRequestToken(actor, request);
  const spend = await recordMachineActionCost(actor, action, {
    token,
    operatorActorUuid: String(request.operatorActorUuid ?? "").trim(),
  });
  if (spend && spend.ok === false) return spend;

  const message = action.notes || "Action recorded.";
  ui.notifications?.info(`${action.label}: ${message}`);
  return {
    ok: true,
    actionId: action.key,
    costPaid: Boolean(spend && spend.ok && !spend.skipped),
    rolled: false,
    stateChanges: [],
    log: { title: action.label, message },
  };
}

async function executeMachineSkillAction(actor, action, request = {}) {
  const skillKey = String(request.skillKey ?? action.skillKey ?? "").trim();
  const attributeKey = String(request.attributeKey ?? request.attrKey ?? action.attributeKey ?? "").trim();
  if (!skillKey || !attributeKey) {
    const reason = `${action.label} needs a skill and machine attribute before it can be rolled.`;
    ui.notifications?.warn(reason);
    return { ok: false, reason, userMessage: reason, actionId: action.key };
  }

  const token = resolveRequestToken(actor, request);
  return executeRollPayload(actor, {
    intent: "skill",
    key: skillKey,
    attrKey: attributeKey,
    machineAttributeKey: attributeKey,
    operatorActorUuid: String(request.operatorActorUuid ?? "").trim(),
    sourceTokenId: token?.id ?? null,
    targetTokenId: String(request.targetTokenId ?? "").trim() || null,
    targetTokenUuid: String(request.targetTokenUuid ?? "").trim() || null,
    machineActionKey: action.key,
    quickAction: { title: action.label },
    edge: { allowed: ["pre", "post"] },
    tags: ["machine", action.resolver, ...(action.tags ?? [])],
  }, request.event);
}

async function executeMachineHeatReactionAction(actor, action, request = {}) {
  const token = resolveRequestToken(actor, request);
  const spend = await recordMachineActionCost(actor, action, {
    token,
    operatorActorUuid: String(request.operatorActorUuid ?? "").trim(),
  });
  if (spend && spend.ok === false) return spend;

  const result = await executeMachineHeatDangerCheck(actor, { ...request, checkKind: "shutdown" });
  return {
    ...result,
    actionId: action.key,
    costPaid: Boolean(spend && spend.ok && !spend.skipped),
  };
}

async function executeMachineTargetingAction(actor, action, request = {}) {
  const actionKey = action.key;
  if (actionKey === "swat") return executeMachineSwat(actor, action, request);
  if (actionKey === "goDark") {
    const token = resolveRequestToken(actor, request);
    const spend = await recordMachineActionCost(actor, action, {
      token,
      operatorActorUuid: String(request.operatorActorUuid ?? "").trim(),
    });
    if (spend && spend.ok === false) return spend;
    const result = await goDarkMachineSignature(actor, {
      reason: "goDark",
      source: action.key,
      token,
    });
    const message = result.suppressed
      ? "Lifecycle emissions cleared, but suppressed stealth remains offline."
      : "Signature posture reset.";
    ui.notifications?.info(`${action.label}: ${message}`);
    return {
      ...result,
      ok: true,
      actionId: action.key,
      costPaid: Boolean(spend && spend.ok && !spend.skipped),
      rolled: false,
      stateChanges: ["stealthLifecycle"],
      log: { title: action.label, message },
    };
  }
  if (actionKey === "acquireTarget" || actionKey === "sensorLock") {
    const result = await executeMachineEwIntent(actor, { ...request, intent: "acquire", actionId: "acquireTarget" });
    if (result) {
      await setMachineTransientEmission(actor, {
        rating: 1,
        reason: actionKey,
        source: "system",
        duration: "untilNextActivation",
        token: resolveRequestToken(actor, request),
      });
      return result;
    }
    return performMachineElectronicWarfare(actor, {
      actionId: "acquireTarget",
      token: request.token ?? null,
      operatorActorUuid: request.operatorActorUuid,
    });
  }
  if (actionKey === "generateFireSolution") {
    const result = await executeMachineEwIntent(actor, { ...request, intent: "targeting", actionId: "generateFireSolution" });
    return result ?? performMachineElectronicWarfare(actor, {
      actionId: "generateFireSolution",
      token: request.token ?? null,
      operatorActorUuid: request.operatorActorUuid,
    });
  }
  if (actionKey === "breakLock" || actionKey === "defensiveJink") {
    return executeMachineEwIntent(actor, { ...request, intent: actionKey, actionId: actionKey });
  }
  if (actionKey === "sensorSweep" || actionKey === "assess" || actionKey === "epmFilter" || actionKey === "tagTarget" || actionKey === "shareTargetingData" || actionKey === "ecmSpike" || actionKey === "suppressBeacon") {
    const routedActionId = actionKey === "assess" ? "sensorSweep" : actionKey;
    return performMachineElectronicWarfare(actor, {
      actionId: routedActionId,
      token: request.token ?? null,
      operatorActorUuid: request.operatorActorUuid,
    });
  }
  return executeMachineSkillAction(actor, action, request);
}

function getSwatSelectedTokens(request = {}) {
  if (Array.isArray(request.selectedTokens)) return request.selectedTokens;
  if (Array.isArray(globalThis.canvas?.tokens?.controlled)) return globalThis.canvas.tokens.controlled;
  return [];
}

function selectSwatTarget(candidates = [], request = {}) {
  const targetTokenUuid = String(request.targetTokenUuid ?? "").trim();
  const targetTokenId = String(request.targetTokenId ?? "").trim();
  const targetActorUuid = String(request.targetActorUuid ?? request.actorUuid ?? "").trim();
  if (targetTokenUuid || targetTokenId || targetActorUuid) {
    return candidates.find(candidate =>
      (targetTokenUuid && candidate.tokenUuid === targetTokenUuid)
      || (targetTokenId && candidate.tokenId === targetTokenId)
      || (targetActorUuid && candidate.actor?.uuid === targetActorUuid)
    ) ?? null;
  }
  return candidates.find(candidate => candidate.source === "targeted")
    ?? candidates.find(candidate => candidate.source === "selected")
    ?? candidates[0]
    ?? null;
}

async function executeMachineSwat(actor, action, request = {}) {
  const token = resolveRequestToken(actor, request);
  const candidates = findAttachedBattleArmorTargets(actor, {
    machineToken: token,
    targetTokens: request.targetTokens ?? globalThis.game?.user?.targets ?? null,
    selectedTokens: getSwatSelectedTokens(request),
  });
  const target = selectSwatTarget(candidates, request);
  if (!target) {
    const reason = "No attached battle armor is eligible for Swat.";
    ui.notifications?.warn(reason);
    return { ok: false, reason, userMessage: reason, actionId: action.key };
  }

  return executeRollPayload(actor, {
    intent: "skill",
    key: action.skillKey,
    attrKey: action.attributeKey,
    machineAttributeKey: action.attributeKey,
    operatorActorUuid: String(request.operatorActorUuid ?? "").trim(),
    sourceTokenId: token?.id ?? null,
    targetTokenId: target.tokenId || null,
    targetTokenUuid: target.tokenUuid || null,
    targetActorUuid: target.actor?.uuid ?? "",
    machineActionKey: action.key,
    quickAction: {
      title: action.label,
      battleArmorSwat: {
        armorItemId: target.armor?.id ?? target.armor?.armorId ?? "",
        armorItemUuid: target.armor?.uuid ?? "",
        attachedToTokenUuid: target.attachedToTokenUuid,
        source: target.source,
        defender: {
          actorUuid: target.actor?.uuid ?? "",
          attrKey: "reflexes",
          skillKey: "athletics",
        },
        success: {
          detach: true,
          marginTwoPlus: ["prone", "collisionDamage"],
        },
      },
    },
    edge: { allowed: ["pre", "post"] },
    tags: ["machine", "physical", "swat", "battleArmor", "opposed"],
  }, request.event);
}

async function executeMachineCatalogAction(actor, request = {}) {
  const requestedActionId = String(request.actionId ?? request.payload?.actionId ?? request.action?.id ?? "").trim();
  const action = getMachineActionDefinition(requestedActionId);
  if (action.key === "none" && requestedActionId && requestedActionId !== "none") {
    const reason = `Unknown machine action: ${requestedActionId}.`;
    ui.notifications?.warn(reason);
    return { ok: false, reason, userMessage: reason, actionId: requestedActionId };
  }

  const implementationState = String(action.implementation?.state ?? "ready").trim() || "ready";
  if (implementationState === "disabled" || implementationState === "stub") {
    return disabledMachineActionResult(action);
  }

  switch (action.resolver) {
    case "movement": {
      if (action.key === "pilotingCheck") {
        return performMachinePilotingCheck(actor, {
          machineAttributeKey: String(request.machineAttributeKey ?? request.attributeKey ?? action.attributeKey ?? TEMPLATE.actorAttributes.handling).trim(),
          skillKey: String(request.skillKey ?? action.skillKey ?? "piloting").trim(),
          operatorActorUuid: String(request.operatorActorUuid ?? "").trim(),
        });
      }
      const movementKind = String(request.movementKind ?? "").trim() || machineMovementKindForAction(actor, action.key);
      if (movementKind) return executeMachineMovement(actor, { ...request, movementKind });
      return executeMachineNarrativeAction(actor, action, request);
    }
    case "attack":
      if (action.key === "rangedAttack") return executeMachineAttack(actor, { ...request, attackKind: "ranged" });
      if (action.key === "physicalAttack") return executeMachineAttack(actor, { ...request, attackKind: "melee" });
      if (action.key === "chargeAttack") return performChargeAttack(actor, { ...request });
      return executeMachineSkillAction(actor, action, request);
    case "targeting":
      return executeMachineTargetingAction(actor, action, request);
    case "remediation":
      if (action.key === "emergencyRepair" && (request.issue || request.issueKind || request.issueId || request.critId || request.statusId || request.remedyKey)) {
        return performMachineCriticalRepair(actor, {
          issue: request.issue ?? null,
          issueKind: request.issueKind ?? "",
          issueId: request.issueId ?? "",
          remedyKey: request.remedyKey ?? "",
          operatorActorUuid: request.operatorActorUuid ?? "",
        });
      }
      if (action.key === "swat") return executeMachineTargetingAction(actor, action, request);
      return executeMachineSkillAction(actor, action, request);
    case "recovery":
      if (action.key === "avoidShutdown") return executeMachineHeatReactionAction(actor, action, request);
      return executeMachineSkillAction(actor, action, request);
    case "interaction":
      if (action.key === "selectFireMode") {
        const mode = String(request.newMode ?? request.fireMode ?? "").trim();
        if (!mode) {
          const reason = "Select Fire Mode needs a fire mode value.";
          ui.notifications?.warn(reason);
          return { ok: false, reason, userMessage: reason, actionId: action.key };
        }
        return executeMachineFireModeChange(actor, { ...request, newMode: mode });
      }
      return executeMachineNarrativeAction(actor, action, request);
    case "action":
    default:
      if (action.roll || action.skillKey || action.attributeKey) return executeMachineSkillAction(actor, action, request);
      return executeMachineNarrativeAction(actor, action, request);
  }
}

export async function executeMachineQuickAction(actor, request = {}) {
  assertMachineActionActor(actor);
  const normalized = normalizeMachineActionRequest(request);
  if (shouldRouteMachineActionThroughGm(actor, normalized)) {
    return assertMachineActionResult(await requestGmMachineAction(actor, normalized), normalized.kind);
  }
  let result;

  switch (normalized.kind) {
    case "action":
      result = await executeMachineCatalogAction(actor, normalized);
      break;
    case "attack":
      result = await executeMachineAttack(actor, normalized);
      break;
    case "changeFireMode":
      result = await executeMachineFireModeChange(actor, normalized);
      break;
    case "movement":
      result = await executeMachineMovement(actor, normalized);
      break;
    case "piloting":
      result = await performMachinePilotingCheck(actor, {
        machineAttributeKey: normalized.machineAttributeKey,
        skillKey: normalized.skillKey,
        operatorActorUuid: normalized.operatorActorUuid,
      });
      break;
    case "skillCheck":
      result = await performMachineAdHocSkillCheck(actor, {
        machineAttributeKey: normalized.machineAttributeKey,
        skillKey: normalized.skillKey,
        operatorActorUuid: normalized.operatorActorUuid,
      });
      break;
    case "ew":
      result = await executeMachineEwIntent(actor, normalized)
        ?? await performMachineElectronicWarfare(actor, {
          action: normalized.action ?? null,
          actionId: normalized.actionId ?? "",
          token: normalized.token ?? null,
          operatorActorUuid: normalized.operatorActorUuid,
        });
      break;
    case "repair":
      result = await performMachineCriticalRepair(actor, {
        issue: normalized.issue ?? null,
        issueKind: normalized.issueKind ?? "",
        issueId: normalized.issueId ?? "",
        remedyKey: normalized.remedyKey ?? "",
        operatorActorUuid: normalized.operatorActorUuid,
      });
      break;
    case "heatDangerCheck":
      result = await executeMachineHeatDangerCheck(actor, normalized);
      break;
    case "resolvePendingHeat":
      result = await resolveBattlemechPendingHeat(actor, {
        token: normalized.token ?? null,
        source: normalized.source ?? normalized.reason ?? "sheet control",
        activation: normalized.activation ?? null,
        postDangerCard: normalized.postDangerCard ?? true,
      });
      break;
    case "resolvePendingStrain":
      result = await resolveVehiclePendingStrain(actor, {
        reason: normalized.reason ?? "sheet control",
      });
      break;
    default:
      throw new Error(`Unknown machine action kind: ${normalized.kind}`);
  }

  return assertMachineActionResult(result, normalized.kind);
}

export const MachineActions = Object.freeze({
  execute: executeMachineQuickAction,
});

function getActionCostLabel(action = {}) {
  if (action.category === "reaction") return "Reaction";
  if (!action.cost) return action.category === "narrative" ? "Narrative" : "Free";
  return `${action.cost} ${String(action.resource ?? "sa").toUpperCase()}`;
}

function getEwActionTypeLabel(action = {}) {
  if (action.category === "complex") return "Complex";
  if (action.category === "reaction") return "Reaction";
  if (action.resource === "fa") return "FA";
  return getActionCostLabel(action);
}

function buildEwAction({
  id,
  purpose = "",
  targetMode = "none",
  execution = "skill",
  enabled = true,
  reason = "",
  mechanics = "",
} = {}) {
  const action = getMachineActionDefinition(id);
  return {
    id,
    actionKey: action.key,
    intent: action.intent || id,
    label: action.label,
    actionType: getEwActionTypeLabel(action),
    attributeKey: action.attributeKey,
    skillKey: action.skillKey,
    targetMode,
    execution,
    purpose: purpose || action.notes,
    hint: [
      getEwActionTypeLabel(action),
      action.attributeKey && action.skillKey ? `${action.attributeKey} + ${action.skillKey}` : "",
      purpose || action.notes,
      mechanics,
    ].filter(Boolean).join(" | "),
    disabled: !enabled,
    reason: reason || (!enabled ? "This EW action is not available right now." : ""),
    mechanics,
  };
}

function getAnyEwTarget(panel = {}) {
  return Array.isArray(panel?.rows) ? panel.rows.find(row => row?.targetTokenUuid || row?.targetTokenId) ?? null : null;
}

async function recordMachineActionCost(actor, action, { token = null, operatorActorUuid = "" } = {}) {
  const override = findAssetModuleActionOverride(actor, action?.key, {
    payload: { actionId: action?.key },
  });
  const effectiveAction = override
    ? {
      ...action,
      cost: Number.isFinite(Number(override.cost)) ? Math.max(0, Number(override.cost)) : action.cost,
      resource: String(override.resource ?? action.resource ?? "sa").trim() || "sa",
      category: String(override.category ?? action.category ?? "simple").trim() || "simple",
    }
    : action;
  if (!effectiveAction?.cost) return { ok: true, skipped: true };

  const operator = await resolveMachineOperator({
    machineActor: actor,
    operatorActorUuid,
  });
  const spendActor = operator?.actor ?? actor;
  const snapshot = PersonalCombatTracker.getSnapshot?.(spendActor, { token }) ?? null;
  if (!snapshot?.hasCombatant) return { ok: true, skipped: true };

  const spend = await PersonalCombatTracker.spendResource(spendActor, {
    token,
    resource: effectiveAction.resource,
    cost: effectiveAction.cost,
    actionId: effectiveAction.key,
    actionLabel: effectiveAction.label,
    actionCostLabel: getActionCostLabel(effectiveAction),
    actionCategory: effectiveAction.category,
  });
  if (!spend?.ok) ui.notifications?.warn(spend?.reason ?? `Unable to record ${effectiveAction.label}.`);
  return spend;
}

export async function performMachinePilotingCheck(actor, {
  machineAttributeKey = TEMPLATE.actorAttributes.handling,
  skillKey = "piloting",
  operatorActorUuid = "",
} = {}) {
  const rollApi = getMachineRollApi();
  if (!rollApi?.execute) return getRollUnavailableResult();
  const normalizedMachineAttributeKey = String(machineAttributeKey ?? TEMPLATE.actorAttributes.handling).trim()
    || TEMPLATE.actorAttributes.handling;
  const normalizedSkillKey = String(skillKey ?? "piloting").trim() || "piloting";

  await rollApi.execute({
    actor,
    payload: {
      intent: "skill",
      key: normalizedSkillKey,
      noSkill: normalizedSkillKey === "none",
      machineAttributeKey: normalizedMachineAttributeKey,
      operatorActorUuid: String(operatorActorUuid ?? "").trim(),
      quickAction: { title: MWD.actor.vehicle.quickActions.pilotingCheck },
      edge: { allowed: ["pre", "post"] },
      tags: ["machine", "skill"],
    }
  });

  return { ok: true };
}

export async function performMachineAdHocSkillCheck(actor, { machineAttributeKey = "", skillKey = "", operatorActorUuid = "" } = {}) {
  return performMachinePilotingCheck(actor, {
    machineAttributeKey,
    skillKey,
    operatorActorUuid,
  });
}

export function buildMachineEwActionChoices(actor, { token = null, includeDisabled = false } = {}) {
  const sourceToken = token ?? resolveMachineSceneToken(actor);
  const panel = buildMachineEwPanel({ actor, token: sourceToken });
  const hasTargets = Boolean(panel.hasTargets);
  const capabilities = panel.capabilities ?? getMachineEwAssetCapabilities(actor);
  const hasTag = Boolean(capabilities.tag);
  const hasC3 = Boolean(capabilities.c3);
  const actions = [
    buildEwAction({
      id: "sensorSweep",
      purpose: "General scan: reveal hidden units, detect signatures, identify contacts, and read the battlefield.",
      targetMode: "none",
      execution: "skill",
    }),
    buildEwAction({
      id: "acquireTarget",
      purpose: "Improve detection state on the first eligible targeted token.",
      targetMode: "acquire",
      execution: "intent",
      enabled: panel.canAcquireAny,
      reason: "No targeted token can currently advance detection state.",
      mechanics: "Automated detection-state update on success.",
    }),
    buildEwAction({
      id: "generateFireSolution",
      purpose: "Create short-lived targeting data from an existing Track or Lock.",
      targetMode: "targeting",
      execution: "intent",
      enabled: panel.canTargetAny,
      reason: "Track or Lock is required before generating targeting data.",
      mechanics: "Automated targeting-data packet on success.",
    }),
    buildEwAction({
      id: "ecmSpike",
      purpose: "Offensive EW: jam or disrupt a specific target.",
      targetMode: "any",
      execution: "skill",
      enabled: hasTargets,
      reason: "Target a token before launching an ECM Spike.",
      mechanics: "Roll only; ECM state effects are not automated yet.",
    }),
    buildEwAction({
      id: "epmFilter",
      purpose: "Defensive remediation: remove or reduce ECM Jamming.",
      targetMode: "none",
      execution: "skill",
      mechanics: "Roll only unless launched as a critical/status remedy.",
    }),
    buildEwAction({
      id: "breakLock",
      purpose: "Defensive action: degrade an attacker's detection state.",
      targetMode: "anyOptional",
      execution: "intent",
      mechanics: "Automated on success: selected observer's detection state on this machine degrades one step.",
    }),
    buildEwAction({
      id: "defensiveJink",
      purpose: "Defensive reaction: reduce an enemy fire-solution packet.",
      targetMode: "anyOptional",
      execution: "intent",
      mechanics: "Automated: selected observer's targetingData packet against this machine is reduced by 1.",
    }),
    buildEwAction({
      id: "suppressBeacon",
      purpose: "Suppress beacon-based targeting support such as NARC or TAG.",
      targetMode: "any",
      execution: "skill",
      enabled: hasTargets,
      reason: "Target a token before suppressing a beacon.",
      mechanics: "Roll only; beacon suppression is not automated yet.",
    }),
    buildEwAction({
      id: "swat",
      purpose: "Physical removal action for BattleArmor, NARC, or similar attachments.",
      targetMode: "anyOptional",
      execution: "skill",
      mechanics: "Roll only; removal is handled narratively or by status changes.",
    }),
    buildEwAction({
      id: "tagTarget",
      purpose: "Apply a TAG enabler flag for guided systems.",
      targetMode: "any",
      execution: "skill",
      enabled: hasTargets && hasTag,
      reason: !hasTag ? "Requires an installed TAG asset module." : "Target a token before using TAG.",
      mechanics: "Roll only; TAG flags are not automated yet.",
    }),
    buildEwAction({
      id: "shareTargetingData",
      purpose: "Share best detection state and best eligible packet through C3 or a similar network.",
      targetMode: "none",
      execution: "narrative",
      enabled: hasC3,
      reason: "Requires an installed C3 asset module.",
      mechanics: "Provider-driven; no roll required.",
    }),
  ];

  return includeDisabled ? actions : actions.filter(action => !action.disabled);
}

export async function performMachineElectronicWarfare(actor, {
  action = null,
  actionId = "",
  token = null,
  operatorActorUuid = "",
} = {}) {
  const sourceToken = token ?? resolveMachineSceneToken(actor);
  const panel = buildMachineEwPanel({ actor, token: sourceToken });
  const actions = buildMachineEwActionChoices(actor, { token: sourceToken, includeDisabled: true });
  const selectedAction = action
    ?? actions.find(entry => String(entry.id ?? "").trim() === String(actionId ?? "").trim())
    ?? (actions.length === 1 ? actions[0] : null);

  if (!selectedAction || selectedAction.disabled) {
    const reason = MWD.actor.vehicle.quickActions.errors.noSensorSweep;
    ui.notifications?.warn(selectedAction?.reason || reason);
    return { ok: false, reason };
  }

  let targetRow = null;
  if (selectedAction.targetMode === "acquire" || selectedAction.targetMode === "targeting") {
    targetRow = resolveMachineEwActionTarget(panel, selectedAction.intent);
  } else if (selectedAction.targetMode === "any" || selectedAction.targetMode === "anyOptional") {
    targetRow = getAnyEwTarget(panel);
  }

  if ((selectedAction.targetMode === "acquire" || selectedAction.targetMode === "targeting" || selectedAction.targetMode === "any") && !targetRow) {
    const reason = "No targeted token is ready for that EW action.";
    ui.notifications?.warn(reason);
    return { ok: false, reason };
  }

  if (selectedAction.execution === "narrative") {
    const actionDef = getMachineActionDefinition(selectedAction.actionKey);
    const spend = await recordMachineActionCost(actor, actionDef, { token: sourceToken, operatorActorUuid });
    if (spend && spend.ok === false) return spend;
    ui.notifications?.info(`${selectedAction.label}: ${selectedAction.mechanics || "No roll required."}`);
    return { ok: true, action: selectedAction, target: targetRow, narrative: true };
  }

  const rollApi = getMachineRollApi();
  if (!rollApi?.execute) return getRollUnavailableResult();

  const payload = selectedAction.execution === "intent"
    ? {
      intent: selectedAction.intent,
      actionId: selectedAction.actionKey,
      sourceTokenId: sourceToken?.id ?? null,
      targetTokenId: targetRow?.targetTokenId ?? null,
      targetTokenUuid: targetRow?.targetTokenUuid ?? null,
      operatorActorUuid: String(operatorActorUuid ?? "").trim(),
      edge: { allowed: ["pre", "post"] },
      tags: ["machine", "ew", selectedAction.id],
    }
    : {
      intent: "skill",
      key: selectedAction.skillKey,
      attrKey: selectedAction.attributeKey,
      machineAttributeKey: selectedAction.attributeKey,
      operatorActorUuid: String(operatorActorUuid ?? "").trim(),
      sourceTokenId: sourceToken?.id ?? null,
      targetTokenId: targetRow?.targetTokenId ?? null,
      targetTokenUuid: targetRow?.targetTokenUuid ?? null,
      machineActionKey: selectedAction.actionKey,
      quickAction: {
        title: selectedAction.label,
        ewAction: {
          id: selectedAction.id,
          actionType: selectedAction.actionType,
          purpose: selectedAction.purpose,
          mechanics: selectedAction.mechanics,
        },
      },
      edge: { allowed: ["pre", "post"] },
      tags: ["machine", "ew", selectedAction.id],
    };

  const rollResult = await rollApi.execute({
    actor,
    payload,
  });

  if (!rollResult) return { ok: false, cancelled: true, reason: "EW action was cancelled." };

  if (TRANSIENT_EMISSION_EW_ACTIONS.has(selectedAction.id)) {
    await setMachineTransientEmission(actor, {
      rating: 1,
      reason: selectedAction.id,
      source: "system",
      duration: "untilNextActivation",
      token: sourceToken,
    });
  }

  return { ok: true, action: selectedAction, target: targetRow };
}

export function buildMachineCriticalRepairIssues(actor) {
  return getMachineRepairIssues(actor);
}

export async function performMachineCriticalRepair(actor, {
  issue = null,
  issueKind = "",
  issueId = "",
  remedyKey = "",
  operatorActorUuid = "",
} = {}) {
  const issues = buildMachineCriticalRepairIssues(actor);
  const selectedIssue = issue
    ?? issues.find(entry =>
      String(entry.issueKind ?? "").trim() === String(issueKind ?? "").trim()
      && String(entry.issueId ?? "").trim() === String(issueId ?? "").trim()
    )
    ?? (issues.length === 1 ? issues[0] : null);

  if (!selectedIssue) {
    const reason = "No active criticals or repairable statuses are available.";
    ui.notifications?.warn(reason);
    return { ok: false, reason };
  }

  const request = await prepareMachineRemedyRoll({
    machineActorUuid: actor?.uuid ?? "",
    issueKind: selectedIssue.issueKind,
    issueId: selectedIssue.issueId,
    critId: selectedIssue.issueKind === "crit" ? selectedIssue.issueId : "",
    statusId: selectedIssue.issueKind === "status" ? selectedIssue.issueId : "",
    remedyKey: String(remedyKey ?? "").trim() || selectedIssue.remedyKey,
    operatorActorUuid: String(operatorActorUuid ?? "").trim(),
  }, {
    gmOverride: Boolean(game.user?.isGM),
  });

  if (!request.ok) {
    ui.notifications?.warn(request.reason ?? "Unable to launch the critical repair action.");
    return request;
  }

  const rollApi = getMachineRollApi();
  if (!rollApi?.execute) return getRollUnavailableResult();

  await rollApi.execute({
    actor: request.actor,
    payload: request.payload,
  });

  return { ok: true, issue: selectedIssue, request };
}
