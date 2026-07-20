// src/modules/mwd/first-aid.js
// Purpose: Shared First Aid setup, recovery math, and monitor application helpers.

import { TEMPLATE } from "../core/constants.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { HarmEngine } from "../harm/harm-engine.js";
import { isPersonActor } from "../utils/actor-guards.js";

export const FIRST_AID_ACTION_ID = "firstAid";

export const FIRST_AID_CONDITIONS = Object.freeze([
  Object.freeze({ key: "excellent", label: "Excellent Conditions", dn: 1 }),
  Object.freeze({ key: "normal", label: "Normal Conditions", dn: 2 }),
  Object.freeze({ key: "poor", label: "Poor Conditions", dn: 3 }),
]);

function escapeHtml(value = "") {
  return foundry.utils.escapeHTML(String(value ?? ""));
}

function asTokenDocument(token = null) {
  return token?.document ?? token ?? null;
}

function uniqueBy(values = [], getKey = value => value) {
  const seen = new Set();
  const result = [];
  for (const value of values) {
    const key = String(getKey(value) ?? "").trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(value);
  }
  return result;
}

function getTargetActorFromToken(token = null) {
  const tokenDoc = asTokenDocument(token);
  return tokenDoc?.actor ?? token?.actor ?? null;
}

function getSceneTargetOptions(actingActor = null) {
  const tokens = [
    ...Array.from(game.user?.targets ?? []),
    ...Array.from(canvas?.tokens?.controlled ?? []),
    ...Array.from(canvas?.tokens?.placeables ?? []),
  ];

  const tokenOptions = tokens
    .map(token => {
      const tokenDoc = asTokenDocument(token);
      const actor = getTargetActorFromToken(token);
      if (!actor || !isPersonActor(actor)) return null;
      return {
        key: actor.uuid,
        actorUuid: actor.uuid,
        tokenUuid: tokenDoc?.uuid ?? "",
        label: tokenDoc?.name || actor.name || "Target",
        actorName: actor.name || tokenDoc?.name || "Target",
      };
    })
    .filter(Boolean);

  const selfOption = actingActor && isPersonActor(actingActor)
    ? [{
        key: actingActor.uuid,
        actorUuid: actingActor.uuid,
        tokenUuid: "",
        label: `${actingActor.name || "Self"} (Self)`,
        actorName: actingActor.name || "Self",
      }]
    : [];

  return uniqueBy([...selfOption, ...tokenOptions], option => `${option.actorUuid}|${option.tokenUuid}`)
    .sort((left, right) => {
      const leftSelf = left.actorUuid === actingActor?.uuid && !left.tokenUuid ? -1 : 0;
      const rightSelf = right.actorUuid === actingActor?.uuid && !right.tokenUuid ? -1 : 0;
      if (leftSelf !== rightSelf) return leftSelf - rightSelf;
      return String(left.label).localeCompare(String(right.label));
    });
}

function getMedicalEquipmentOptions(actor = null) {
  const items = Array.from(actor?.items ?? [])
    .filter(item => ["gear", "consumable"].includes(String(item?.type ?? item?.canonicalType ?? "").trim()))
    .filter(item => String(item?.system?.category ?? "").trim() === "medical")
    .filter(item => Math.max(0, Number(item?.system?.quantity ?? 1) || 0) > 0)
    .map(item => ({
      itemId: item.id,
      name: item.name || "Medical Equipment",
      rating: Math.max(0, Math.trunc(Number(item?.system?.rating ?? 0) || 0)),
    }))
    .filter(item => item.rating > 0)
    .sort((left, right) => right.rating - left.rating || left.name.localeCompare(right.name));

  return [
    { itemId: "", name: "No medical equipment", rating: 0 },
    ...items,
  ];
}

function getCondition(key = "") {
  const normalized = String(key ?? "").trim();
  return FIRST_AID_CONDITIONS.find(condition => condition.key === normalized)
    ?? FIRST_AID_CONDITIONS.find(condition => condition.key === "normal")
    ?? FIRST_AID_CONDITIONS[0];
}

function getMedicalEquipment(actor = null, itemId = "") {
  const normalizedId = String(itemId ?? "").trim();
  if (!normalizedId) return null;

  const item = actor?.items?.get?.(normalizedId) ?? null;
  if (!item) return null;
  if (!["gear", "consumable"].includes(String(item?.type ?? item?.canonicalType ?? "").trim())) return null;
  if (String(item?.system?.category ?? "").trim() !== "medical") return null;

  const quantity = Math.max(0, Number(item?.system?.quantity ?? 1) || 0);
  const rating = Math.max(0, Math.trunc(Number(item?.system?.rating ?? 0) || 0));
  if (quantity <= 0 || rating <= 0) return null;

  return {
    itemId: item.id,
    name: item.name || "Medical Equipment",
    rating,
  };
}

function getTrackLabel(track = "") {
  if (track === TEMPLATE.monitors.fatigue) return "Fatigue";
  if (track === TEMPLATE.monitors.physical) return "Physical";
  return "Track";
}

function actorMatchesTarget(actor = null, target = {}) {
  if (!actor || !target?.actorUuid) return false;
  if (actor.uuid === target.actorUuid) return true;
  const targetActor = globalThis.fromUuidSync?.(target.actorUuid);
  return Boolean(targetActor && actor.id && targetActor.id === actor.id);
}

export function calculateFirstAidRecovery({ track = "", netHits = 0 } = {}) {
  const hits = Math.max(0, Math.trunc(Number(netHits ?? 0) || 0));
  if (track === TEMPLATE.monitors.fatigue) return hits;
  if (track === TEMPLATE.monitors.physical) return Math.max(0, Math.floor((hits - 1) / 2));
  return 0;
}

export function getFirstAidRollConfig(payload = {}) {
  if (!isFirstAidPayload(payload)) return null;
  const condition = getCondition(payload?.firstAid?.conditionKey);
  return {
    dn: condition.dn,
    dnPart: {
      id: "firstAid.conditions",
      label: condition.label,
      value: condition.dn,
      tags: ["firstAid", "conditions"],
    },
    title: "First Aid (MedTech)",
    condition,
  };
}

export function collectFirstAidModifiers({ actor = null, rollActor = null, payload = {} } = {}) {
  if (!isFirstAidPayload(payload)) return [];

  const firstAid = payload.firstAid ?? {};
  const equipment = getMedicalEquipment(rollActor ?? actor, firstAid.equipmentItemId);
  const mods = [];

  if (equipment) {
    mods.push({
      id: "firstAid.equipment",
      label: `Medical Equipment (${equipment.name})`,
      value: equipment.rating,
      source: "First Aid",
      domain: "mental",
    });
  }

  if (actorMatchesTarget(rollActor ?? actor, { actorUuid: firstAid.targetActorUuid })) {
    mods.push({
      id: "firstAid.selfTreatment",
      label: "Self Treatment",
      value: -2,
      source: "First Aid",
      domain: "mental",
    });
  }

  return mods;
}

export function getFirstAidNetHits(resolved = {}) {
  const margin = Number(resolved?.outcomeModel?.margin);
  if (Number.isFinite(margin)) return Math.max(0, Math.trunc(margin));

  const hits = Number(resolved?.outcome?.hits ?? 0) || 0;
  const dn = Number(resolved?.dn?.total ?? resolved?.ctxSnapshot?.dn?.total ?? resolved?.ctxSnapshot?.difficulty?.dn ?? 1) || 1;
  return Math.max(0, Math.trunc(hits - dn));
}

export function isFirstAidPayload(payload = {}) {
  return String(payload?.firstAid?.actionId ?? "").trim() === FIRST_AID_ACTION_ID;
}

export function buildFirstAidPayload({ actor = null, selection = {} } = {}) {
  const condition = getCondition(selection.conditionKey);
  const track = selection.track === TEMPLATE.monitors.physical
    ? TEMPLATE.monitors.physical
    : TEMPLATE.monitors.fatigue;

  return {
    intent: "skill",
    key: "medTech",
    tags: ["combat", "firstAid"],
    firstAid: {
      actionId: FIRST_AID_ACTION_ID,
      targetActorUuid: selection.target?.actorUuid ?? "",
      targetTokenUuid: selection.target?.tokenUuid ?? "",
      targetName: selection.target?.actorName ?? selection.target?.label ?? "Target",
      track,
      trackLabel: getTrackLabel(track),
      conditionKey: condition.key,
      equipmentItemId: selection.equipmentItemId ?? "",
    },
  };
}

export async function promptFirstAidOptions(actor = null) {
  const targets = getSceneTargetOptions(actor);
  if (!targets.length) {
    ui.notifications?.warn("First Aid needs a character or NPC target.");
    return null;
  }

  const equipment = getMedicalEquipmentOptions(actor);
  const targetOptions = targets.map((option, index) => `
    <option value="${index}">${escapeHtml(option.label)}</option>
  `).join("");
  const equipmentOptions = equipment.map((option, index) => `
    <option value="${index}">${escapeHtml(option.name)}${option.rating ? ` (+${option.rating})` : ""}</option>
  `).join("");
  const conditionOptions = FIRST_AID_CONDITIONS.map(condition => `
    <option value="${condition.key}" ${condition.key === "normal" ? "selected" : ""}>${escapeHtml(condition.label)} (DN ${condition.dn})</option>
  `).join("");

  const content = `
    <form class="mwd-quick-select">
      <div class="mwd-field">
        <label>Target</label>
        <select name="targetIndex">${targetOptions}</select>
      </div>
      <div class="mwd-field">
        <label>Recovery</label>
        <select name="track">
          <option value="${TEMPLATE.monitors.fatigue}">Fatigue</option>
          <option value="${TEMPLATE.monitors.physical}">Physical</option>
        </select>
      </div>
      <div class="mwd-field">
        <label>Conditions</label>
        <select name="conditionKey">${conditionOptions}</select>
      </div>
      <div class="mwd-field">
        <label>Medical Equipment</label>
        <select name="equipmentIndex">${equipmentOptions}</select>
      </div>
    </form>
  `;

  return Dialog.confirm({
    title: "First Aid",
    content,
    yes: html => {
      const targetIndex = Math.max(0, Number(html.find("[name='targetIndex']").val() ?? 0) || 0);
      const equipmentIndex = Math.max(0, Number(html.find("[name='equipmentIndex']").val() ?? 0) || 0);
      const selectedEquipment = equipment[equipmentIndex] ?? equipment[0];
      return {
        target: targets[targetIndex] ?? targets[0],
        track: String(html.find("[name='track']").val() ?? TEMPLATE.monitors.fatigue),
        conditionKey: String(html.find("[name='conditionKey']").val() ?? "normal"),
        equipmentItemId: selectedEquipment.itemId,
      };
    },
    no: () => null,
    defaultYes: true,
  });
}

export async function executeFirstAidCombatAction(actor = null, { token = null, event = null } = {}) {
  if (!actor) return { ok: false, reason: "First Aid requires an acting character." };

  const selection = await promptFirstAidOptions(actor);
  if (!selection) return { ok: true, cancelled: true };

  const payload = buildFirstAidPayload({ actor, selection });
  const message = await game.mwd?.roll?.execute?.({ actor, payload, event });
  if (!message) return { ok: true, cancelled: true };

  const spend = await PersonalCombatTracker.spendResource(actor, {
    token,
    resource: "sa",
    cost: 2,
    actionId: FIRST_AID_ACTION_ID,
    actionLabel: "First Aid",
    actionCostLabel: "2 SA",
    actionCategory: "complex",
  });

  return {
    ok: Boolean(spend?.ok),
    message,
    spend,
    reason: spend?.reason ?? "",
  };
}

export async function applyFirstAidRecovery(resolved = {}) {
  const firstAid = resolved?.originPayload?.firstAid ?? {};
  if (!isFirstAidPayload(resolved?.originPayload ?? {})) {
    return { ok: false, reason: "This roll is not a First Aid test." };
  }

  if (resolved?.firstAidResult?.applied) {
    return { ok: false, reason: "First Aid has already been applied." };
  }

  const targetActor = firstAid.targetActorUuid ? await fromUuid(firstAid.targetActorUuid) : null;
  if (!targetActor || !isPersonActor(targetActor)) {
    return { ok: false, reason: "First Aid target could not be found." };
  }

  const track = firstAid.track === TEMPLATE.monitors.physical
    ? TEMPLATE.monitors.physical
    : TEMPLATE.monitors.fatigue;
  const netHits = getFirstAidNetHits(resolved);
  const requestedRecovery = calculateFirstAidRecovery({ track, netHits });
  const before = Math.max(0, Number(targetActor.system?.monitors?.[track]?.value ?? 0) || 0);
  const harmResult = requestedRecovery > 0
    ? await HarmEngine.apply({
        actor: targetActor,
        payload: {
          mode: "trackDelta",
          track,
          delta: -requestedRecovery,
          source: "First Aid",
        },
        options: { logToChat: false },
      })
    : null;
  if (harmResult && !harmResult.ok) {
    return { ok: false, reason: harmResult.reason ?? "Unable to apply First Aid recovery." };
  }
  const after = Math.max(0, Number(targetActor.system?.monitors?.[track]?.value ?? before) || 0);
  const recovered = Math.max(0, before - after);

  return {
    ok: true,
    applied: true,
    targetActorUuid: targetActor.uuid,
    targetName: targetActor.name || firstAid.targetName || "Target",
    track,
    trackLabel: getTrackLabel(track),
    netHits,
    requestedRecovery,
    recovered,
    before,
    after,
    harmResult,
  };
}

export function summarizeFirstAidForChat(resolved = {}) {
  const firstAid = resolved?.originPayload?.firstAid ?? {};
  if (!isFirstAidPayload(resolved?.originPayload ?? {})) return null;

  const rollConfig = getFirstAidRollConfig(resolved?.originPayload ?? {}) ?? {};
  const equipment = getMedicalEquipment(
    globalThis.fromUuidSync?.(resolved?.rollActorUuid ?? resolved?.actorUuid) ?? null,
    firstAid.equipmentItemId
  );
  const rollActor = globalThis.fromUuidSync?.(resolved?.rollActorUuid ?? resolved?.actorUuid) ?? null;
  const netHits = getFirstAidNetHits(resolved);
  const requestedRecovery = calculateFirstAidRecovery({
    track: firstAid.track,
    netHits,
  });

  return {
    ...firstAid,
    conditionLabel: rollConfig.condition?.label ?? "Conditions",
    conditionDn: rollConfig.condition?.dn ?? Number(resolved?.dn?.total ?? 0),
    equipmentName: equipment?.name ?? "",
    equipmentRating: equipment?.rating ?? 0,
    selfTreatment: actorMatchesTarget(rollActor, { actorUuid: firstAid.targetActorUuid }),
    netHits,
    requestedRecovery,
    result: resolved?.firstAidResult ?? null,
    applied: Boolean(resolved?.firstAidResult?.applied),
  };
}
