// src/modules/combat/personal-combat-actions.js
// Purpose: Executes declarative personal combat action intents above the roll system.
// How it fits: Sheets emit one combat intent; this module owns prompts, cost, resolver dispatch, and state/log side effects.

import { TEMPLATE } from "../core/constants.js";
import { activatePendingEvadeFromCombatMenu } from "../chat/chat-actions.js";
import { applyManagedStatusUpdate } from "../dialog/token-status-dialog.js";
import { executeFirstAidCombatAction } from "../mwd/first-aid.js";
import { getPersonalCriticalGateState } from "../mwd/personal-critical-gates.js";
import { listSkillDefs } from "../mwd/skills.js";
import { collectStatusClearsOnAction, getStatusActionGateReason } from "../status/status-mechanics.js";
import { launchOwnedWeaponAttack, launchSuppressionFire } from "../roll/weapon-attack-actions.js";
import {
  getPersonalAction,
  PERSONAL_ACTION_CATEGORIES,
  PERSONAL_ACTION_COST_RESOURCES,
  PERSONAL_ACTION_IMPLEMENTATION_STATES,
  PERSONAL_ACTION_RESOLVERS,
  normalizeActionEntry,
} from "./personal-action-catalog.js";
import { PersonalCombatTracker } from "./personal-combat-tracker.js";

function clone(value) {
  if (value === undefined) return undefined;
  return globalThis.foundry?.utils?.deepClone?.(value) ?? JSON.parse(JSON.stringify(value ?? null));
}

function escapeHtml(value) {
  const helper = globalThis.foundry?.utils?.escapeHTML;
  if (helper) return helper(String(value ?? ""));
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getRollApi() {
  return game?.mwd?.roll ?? game?.system?.mwd?.roll ?? null;
}

function getActivationMaxSA(actor) {
  const reflexes = Math.max(0, Number(actor?.getAttributeValue?.("reflexes") ?? actor?.system?.attributes?.reflexes?.value ?? 0) || 0);
  const guts = Math.max(0, Number(actor?.system?.attributes?.guts?.value ?? 0) || 0);
  return 3 + Math.floor((reflexes + guts) / 2);
}

function getSaCapacityRemaining(actor, snapshot) {
  return Math.max(0, getActivationMaxSA(actor) - Math.max(0, Number(snapshot?.state?.saSpentThisActivation ?? 0) || 0));
}

function parseJson(value, fallback = null) {
  const raw = String(value ?? "").trim();
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn("MWD | Invalid personal combat payload", raw, error);
    return fallback;
  }
}

function normalizePayload(payload = {}) {
  if (payload?.intent === "combatSpend") {
    return {
      actionId: String(payload.actionId ?? payload.combatAction ?? payload.id ?? "").trim(),
      action: null,
      metadata: payload.metadata ?? {},
      spend: {
        resource: String(payload.resource ?? "").trim(),
        cost: Math.max(0, Number(payload.cost ?? 0) || 0),
        actionLabel: String(payload.actionLabel ?? payload.label ?? "").trim(),
        actionCostLabel: String(payload.actionCostLabel ?? payload.costLabel ?? "").trim(),
      },
    };
  }

  if (payload?.intent && payload.intent !== "combatAction") {
    return {
      actionId: "",
      action: null,
      metadata: {},
      roll: payload,
    };
  }

  if (payload?.action && typeof payload.action === "object") {
    return {
      actionId: String(payload.action.id ?? payload.actionId ?? "").trim(),
      action: payload.action,
      metadata: payload.metadata ?? {},
    };
  }
  return {
    actionId: String(payload?.actionId ?? payload?.payload?.actionId ?? payload?.id ?? "").trim(),
    action: payload?.action ?? null,
    metadata: payload?.metadata ?? {},
  };
}

export function buildCombatActionPayloadFromDataset({ handler = "combatIntent", target = null, event = null } = {}) {
  const source = target ?? event?.target?.closest?.("[data-action]") ?? null;
  const dataset = source?.dataset ?? {};
  const actionId = String(dataset.combatAction ?? "").trim();
  const rawPayload = String(dataset.combatPayload ?? "").trim();
  if (rawPayload) {
    const payload = parseJson(rawPayload);
    if (payload) return payload;
  }

  if (handler === "combatSpend") {
    return {
      intent: "combatSpend",
      actionId,
      resource: String(dataset.resource ?? "").trim(),
      cost: Math.max(0, Number(dataset.cost ?? 0) || 0),
      actionLabel: String(dataset.combatLabel ?? "").trim(),
      actionCostLabel: String(dataset.combatCostLabel ?? "").trim(),
    };
  }

  if (handler === "combatOverloadCheck") {
    const rollPayload = parseJson(
      dataset.roll ?? event?.target?.closest?.("[data-roll]")?.dataset?.roll,
      null
    );
    return rollPayload ?? { intent: "combatAction", actionId: actionId || "overloadCheck" };
  }

  const legacyActionIds = {
    combatAction: actionId,
    combatAttack: actionId || "attack",
    combatEvade: actionId || "evade",
    combatAssist: actionId || "assist",
    combatInterrupt: actionId || "interrupt",
    combatFirstAid: actionId || "firstAid",
    combatReduceBurn: actionId || "reduceBurn",
  };
  const resolvedActionId = handler === "combatIntent"
    ? actionId
    : legacyActionIds[handler];

  return resolvedActionId
    ? { intent: "combatAction", actionId: resolvedActionId }
    : null;
}

function actionCostLabel(action = {}, effective = {}) {
  const resource = String(effective.resource ?? action.cost?.resource ?? "none").trim();
  const value = Math.max(0, Number(effective.value ?? action.cost?.value ?? 0) || 0);
  if (resource === PERSONAL_ACTION_COST_RESOURCES.none || value <= 0) return "No Cost";
  if (resource === PERSONAL_ACTION_COST_RESOURCES.fa) return "Free";
  return `${value} ${resource.toUpperCase()}`;
}

function getActionLabel(action = {}, metadata = {}) {
  if (metadata?.targetName && action.id === "assist") return `${action.label}: ${metadata.targetName}`;
  if (metadata?.scope && action.id === "interrupt") return `${action.label}: ${String(metadata.scope).trim()}`;
  if (metadata?.weaponName && ["reload", "selectPayload", "changeFireMode"].includes(action.id)) {
    return `${action.label}: ${metadata.weaponName}`;
  }
  return action.label;
}

function getOwnedItems(actor = null, predicate = () => true) {
  const collection = actor?.items ?? [];
  const items = typeof collection.values === "function"
    ? Array.from(collection.values())
    : Array.from(collection);
  return items.filter(item => {
    try {
      return predicate(item);
    } catch (_error) {
      return false;
    }
  });
}

function getPersonalWeapons(actor = null) {
  return getOwnedItems(actor, item =>
    item?.type === TEMPLATE.itemType.personalWeapon
    || item?.isPersonalWeapon?.()
  );
}

function isAutomaticWeapon(weapon = null) {
  const profile = weapon?.getCombatProfile?.() ?? null;
  const flags = Array.isArray(profile?.effects?.flags) ? profile.effects.flags : [];
  if (flags.map(flag => String(flag ?? "").trim()).includes("automatic")) return true;

  const traits = [
    ...(Array.isArray(weapon?.system?.standardTraits) ? weapon.system.standardTraits : []),
    ...(Array.isArray(weapon?.system?.traits) ? weapon.system.traits : []),
  ];
  return traits.some(trait => {
    const value = typeof trait === "string" ? trait : (trait?.key ?? trait?.label);
    return String(value ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "") === "automatic";
  });
}

function getAutomaticPersonalWeapons(actor = null) {
  return getPersonalWeapons(actor)
    .filter(weapon => weapon?.system?.equipped !== false)
    .filter(isAutomaticWeapon);
}

function getWeaponPayloadChoices(weapon = null) {
  const payloads = weapon?.getPayloadState?.()?.payloads;
  return (Array.isArray(payloads) ? payloads : [])
    .filter(payload => payload?.id && payload.id !== "unloaded")
    .map(payload => ({
      id: String(payload.id ?? "").trim(),
      label: String(payload.label ?? "Payload").trim() || "Payload",
      sourceType: String(payload.sourceType ?? "").trim(),
    }));
}

async function promptWithHtml({ title = "Choose", content = "", submitLabel = "OK", callback = () => ({}) } = {}) {
  const DialogV2 = globalThis.foundry?.applications?.api?.DialogV2;
  if (DialogV2?.wait) {
    return DialogV2.wait({
      window: { title },
      content,
      buttons: [{
        action: "submit",
        label: submitLabel,
        default: true,
        callback: (_event, button) => callback(button.form)
      }, {
        action: "cancel",
        label: "Cancel",
        callback: () => null
      }],
      close: () => null
    });
  }

  if (globalThis.Dialog?.prompt) {
    return Dialog.prompt({
      title,
      content,
      label: submitLabel,
      callback: html => callback({
        querySelector: selector => html.find(selector)?.[0] ?? null
      })
    });
  }

  return null;
}

function readFormValue(form, name) {
  const input = form?.querySelector?.(`[name="${name}"]`);
  return String(input?.value ?? "").trim();
}

async function promptPrepare(action) {
  const content = `
    <form class="mwd-quick-select">
      <div class="mwd-field">
        <label>Trigger</label>
        <input type="text" name="condition" placeholder="When..." />
      </div>
      <div class="mwd-field">
        <label>Scope</label>
        <input type="text" name="scope" placeholder="What you will do" />
      </div>
    </form>`;
  return promptWithHtml({
    title: action.label,
    content,
    submitLabel: "Prepare",
    callback: form => ({
      condition: readFormValue(form, "condition"),
      scope: readFormValue(form, "scope"),
    })
  });
}

async function promptSkill(action) {
  const options = listSkillDefs()
    .map(skill => `<option value="${escapeHtml(skill.code)}">${escapeHtml(skill.label)}</option>`)
    .join("");
  const content = `<form class="mwd-quick-select"><div class="mwd-field"><label>Skill</label><select name="skill">${options}</select></div></form>`;
  return promptWithHtml({
    title: action.label,
    content,
    submitLabel: "Roll",
    callback: form => ({ skillKey: readFormValue(form, "skill") })
  });
}

async function promptWeapon(action, actor) {
  const weapons = getPersonalWeapons(actor);
  if (!weapons.length) {
    return action.prompt?.required ? { ok: false, reason: "No owned personal weapons are available." } : {};
  }
  if (weapons.length === 1 && !action.prompt?.required) {
    return { weapon: weapons[0], weaponId: weapons[0].id, weaponName: weapons[0].name };
  }

  const options = weapons
    .map(weapon => `<option value="${escapeHtml(weapon.id)}">${escapeHtml(weapon.name ?? "Weapon")}</option>`)
    .join("");
  const content = `<form class="mwd-quick-select"><div class="mwd-field"><label>Weapon</label><select name="weaponId">${options}</select></div></form>`;
  const result = await promptWithHtml({
    title: action.label,
    content,
    submitLabel: "Select",
    callback: form => ({ weaponId: readFormValue(form, "weaponId") })
  });
  if (!result) return null;
  const weapon = weapons.find(item => item.id === result.weaponId) ?? null;
  return weapon ? { weapon, weaponId: weapon.id, weaponName: weapon.name } : { ok: false, reason: "Selected weapon could not be found." };
}

async function promptSuppressionFire(action, actor) {
  const weapons = getAutomaticPersonalWeapons(actor);
  if (!weapons.length) {
    return { ok: false, reason: "Suppression Fire requires an equipped personal weapon with the Automatic trait." };
  }

  const weaponOptions = weapons
    .map(weapon => `<option value="${escapeHtml(weapon.id)}">${escapeHtml(weapon.name ?? "Weapon")}</option>`)
    .join("");
  const content = `
    <form class="mwd-quick-select">
      <div class="mwd-field">
        <label>Weapon</label>
        <select name="weaponId">${weaponOptions}</select>
      </div>
      <div class="mwd-field">
        <label>Template</label>
        <select name="shape">
          <option value="cone">Cone</option>
          <option value="ray">Line</option>
        </select>
      </div>
      <div class="mwd-field">
        <label>Size</label>
        <input type="number" name="size" value="10" min="1" step="1" />
      </div>
    </form>`;
  const result = await promptWithHtml({
    title: action.label,
    content,
    submitLabel: "Suppress",
    callback: form => ({
      weaponId: readFormValue(form, "weaponId"),
      shape: readFormValue(form, "shape") || "cone",
      size: Math.max(1, Number(readFormValue(form, "size")) || 10),
    })
  });
  if (!result) return null;
  const weapon = weapons.find(item => item.id === result.weaponId) ?? null;
  if (!weapon) return { ok: false, reason: "Selected automatic weapon could not be found." };
  return {
    weapon,
    weaponId: weapon.id,
    weaponName: weapon.name,
    suppressionTemplate: {
      shape: result.shape === "ray" || result.shape === "line" ? "line" : "cone",
      size: result.size,
      placement: "origin",
    },
  };
}

async function promptPayload(action, actor) {
  const weapons = getPersonalWeapons(actor)
    .map(weapon => ({
      weapon,
      payloads: getWeaponPayloadChoices(weapon)
    }))
    .filter(entry => entry.payloads.length);

  if (!weapons.length) return { ok: false, reason: "No owned compatible payloads are available." };

  const rows = weapons.flatMap(entry => entry.payloads.map(payload => ({
    weaponId: entry.weapon.id,
    weaponName: entry.weapon.name,
    payloadId: payload.id,
    payloadName: payload.label,
  })));

  const options = rows
    .map((row, index) => `<option value="${index}">${escapeHtml(row.weaponName)} - ${escapeHtml(row.payloadName)}</option>`)
    .join("");
  const content = `<form class="mwd-quick-select"><div class="mwd-field"><label>Payload</label><select name="choice">${options}</select></div></form>`;
  const result = await promptWithHtml({
    title: action.label,
    content,
    submitLabel: "Select",
    callback: form => ({ index: Number(readFormValue(form, "choice")) })
  });
  if (!result) return null;
  const row = rows[result.index] ?? null;
  if (!row) return { ok: false, reason: "Selected payload could not be found." };
  const weapon = weapons.find(entry => entry.weapon.id === row.weaponId)?.weapon ?? null;
  return { ...row, weapon };
}

async function promptTarget(action, snapshot) {
  const targets = Array.from(game?.user?.targets ?? [])
    .map(token => ({
      token,
      tokenUuid: String(token?.document?.uuid ?? token?.uuid ?? "").trim(),
      name: String(token?.name ?? token?.document?.name ?? token?.actor?.name ?? "Target").trim(),
    }))
    .filter(entry => entry.tokenUuid || entry.token?.id);

  if (!targets.length && action.prompt?.required) return { ok: false, reason: "Target a token before using that action." };
  if (!targets.length) return {};
  if (targets.length === 1) return { targetTokenUuid: targets[0].tokenUuid, targetName: targets[0].name };

  const options = targets
    .map((entry, index) => `<option value="${index}">${escapeHtml(entry.name)}</option>`)
    .join("");
  const content = `<form class="mwd-quick-select"><div class="mwd-field"><label>Target</label><select name="target">${options}</select></div></form>`;
  const result = await promptWithHtml({
    title: action.label,
    content,
    submitLabel: "Select",
    callback: form => ({ index: Number(readFormValue(form, "target")) })
  });
  if (!result) return null;
  const selected = targets[result.index] ?? null;
  return selected ? { targetTokenUuid: selected.tokenUuid, targetName: selected.name } : { ok: false, reason: "Selected target could not be found." };
}

function combatantsToArray(combatants = null) {
  if (!combatants) return [];
  if (typeof combatants.values === "function") return Array.from(combatants.values());
  return Array.from(combatants ?? []);
}

function getAssistTargetChoices(snapshot) {
  const currentCombatantId = String(snapshot?.combatant?.id ?? "").trim();
  return combatantsToArray(snapshot?.combat?.combatants)
    .filter(combatant => combatant && String(combatant.id ?? "").trim() !== currentCombatantId)
    .map(combatant => {
      const tokenDoc = combatant.token?.document ?? combatant.token ?? null;
      const actor = combatant.actor ?? tokenDoc?.actor ?? null;
      const name = String(combatant.name ?? tokenDoc?.name ?? actor?.name ?? "Combatant").trim() || "Combatant";
      return {
        combatantId: String(combatant.id ?? "").trim(),
        actorUuid: actor?.uuid ?? null,
        tokenUuid: tokenDoc?.uuid ?? null,
        name
      };
    })
    .filter(choice => choice.combatantId && choice.name)
    .sort((left, right) => left.name.localeCompare(right.name));
}

async function promptAssistTarget(action, snapshot) {
  if (!snapshot?.hasCombatant) return { ok: false, reason: "No combatant on the current scene." };
  if (snapshot?.isCurrentTurn) return { ok: false, reason: "Only outside your activation." };

  const choices = getAssistTargetChoices(snapshot);
  if (!choices.length) return { ok: false, reason: "No other combatants are available to assist." };

  const options = choices
    .map(choice => `<option value="${escapeHtml(choice.combatantId)}">${escapeHtml(choice.name)}</option>`)
    .join("");
  const content = `<form class="mwd-quick-select"><div class="mwd-field"><label>Assist</label><select name="combatant">${options}</select></div></form>`;

  const selectedId = await promptWithHtml({
    title: action.label,
    content,
    submitLabel: "Assist",
    callback: form => readFormValue(form, "combatant") || choices[0]?.combatantId || ""
  });

  if (!selectedId) return null;
  const target = choices.find(choice => choice.combatantId === selectedId) ?? null;
  if (!target) return { ok: false, reason: "Selected combatant could not be found." };
  return {
    targetCombatantId: target.combatantId,
    targetActorUuid: target.actorUuid,
    targetTokenUuid: target.tokenUuid,
    targetName: target.name,
  };
}

async function confirmInterrupt(action, snapshot) {
  const preparedInterrupt = PersonalCombatTracker.getPreparedInterrupt(snapshot);
  if (!snapshot?.hasCombatant) return { ok: false, reason: "No combatant on the current scene." };
  if (snapshot?.isCurrentTurn) return { ok: false, reason: "Only outside your activation." };
  if (!preparedInterrupt) return { ok: false, reason: "Prepare an interrupt first." };

  const condition = String(preparedInterrupt?.condition ?? "").trim();
  const scope = String(preparedInterrupt?.scope ?? "").trim();
  const content = `
    <div class="mwd-quick-select">
      <p><strong>Trigger:</strong> ${escapeHtml(condition || "Unspecified trigger")}</p>
      <p><strong>Scope:</strong> ${escapeHtml(scope || "Unspecified response")}</p>
    </div>`;
  const confirmed = await promptWithHtml({
    title: action.label,
    content,
    submitLabel: "Interrupt",
    callback: () => true
  });

  return confirmed ? preparedInterrupt : null;
}

async function resolvePrompt(action, actor, snapshot) {
  if (["firstAid", "evade", "reduceBurn", "recoverBurn"].includes(action.id)) return {};
  if (action.id === "suppressionFire") return promptSuppressionFire(action, actor);
  if (action.id === "prepare") return promptPrepare(action);
  if (action.id === "assist") return promptAssistTarget(action, snapshot);
  if (action.id === "interrupt") return confirmInterrupt(action, snapshot);
  if (action.prompt?.type === "skill") return promptSkill(action);
  if (action.prompt?.type === "weapon") return promptWeapon(action, actor);
  if (action.prompt?.type === "payload") return promptPayload(action, actor);
  if (action.prompt?.type === "target") return promptTarget(action, snapshot);
  return {};
}

function getEffectiveCost(action, snapshot) {
  const base = action.cost ?? { resource: "none", value: 0 };
  if (base.resource === PERSONAL_ACTION_COST_RESOURCES.fa) {
    const usesFreeAction = Number(snapshot?.state?.faRemaining ?? 0) > 0;
    return {
      resource: usesFreeAction ? "fa" : "sa",
      value: 1,
      label: usesFreeAction ? "Free" : "1 SA"
    };
  }
  return {
    resource: base.resource,
    value: Math.max(0, Number(base.value ?? 0) || 0),
    label: actionCostLabel(action)
  };
}

function getCommonGateReason(action, actor, snapshot, effectiveCost) {
  if (action.implementation?.state === PERSONAL_ACTION_IMPLEMENTATION_STATES.disabled) {
    return action.implementation?.reason || "That action is disabled.";
  }
  if (action.implementation?.state === PERSONAL_ACTION_IMPLEMENTATION_STATES.stub) {
    return action.implementation?.reason || "That action is not implemented yet.";
  }
  if (action.id === "overloadCheck") {
    return !snapshot?.hasCombatant
      ? "No combatant on the current scene."
      : !snapshot?.isCurrentTurn
        ? "Only during your activation."
        : !snapshot?.burn?.canOverloadCheck
          ? (snapshot?.overloaded ? "Already Overloaded." : `Burn below ${snapshot?.burn?.threshold ?? 6}.`)
          : "";
  }
  if (effectiveCost.resource === "none" || effectiveCost.value <= 0) return "";
  if (!snapshot?.hasCombatant) return "No combatant on the current scene.";
  if (action.category === PERSONAL_ACTION_CATEGORIES.reaction) {
    if (snapshot.isCurrentTurn && action.id !== "evade") return "Only outside your activation.";
  } else if (!snapshot.isCurrentTurn) {
    return "Only during your activation.";
  }
  if (snapshot.overloaded && action.id !== "reduceBurn" && action.id !== "recoverBurn" && effectiveCost.resource !== "fa") {
    return "Overloaded actors can only recover Burn.";
  }
  if (action.id === "aim" && PersonalCombatTracker.getMoveActionCountFromState?.(snapshot.state) > 0) {
    return "Cannot aim after taking a move action this activation.";
  }
  const statusGateReason = getStatusActionGateReason(actor, { actionId: action.id });
  if (statusGateReason) return statusGateReason;
  if (effectiveCost.resource === "sa" && getSaCapacityRemaining(actor, snapshot) < effectiveCost.value) {
    return "Activation SA cap reached.";
  }
  return "";
}

async function spendActionCost(actor, { token = null, action, metadata = {}, snapshot = null } = {}) {
  const effectiveCost = getEffectiveCost(action, snapshot);
  if (effectiveCost.resource === "none" || effectiveCost.value <= 0) {
    return { ok: true, costPaid: false, costLabel: actionCostLabel(action, effectiveCost), snapshot };
  }
  if (action.category === PERSONAL_ACTION_CATEGORIES.reaction) {
    const pendingReaction = snapshot?.state?.pendingReaction ?? null;
    const allowCurrentTurn = action.id === "evade" && pendingReaction?.allowCurrentTurn;
    let edgePoolKey = String(metadata?.edgePoolKey ?? "").trim();
    if (!edgePoolKey && Number(snapshot?.state?.raRemaining ?? 0) <= 0) {
      edgePoolKey = await PersonalCombatTracker._promptSpendEdgeForReaction(actor) ?? "";
    }
    return PersonalCombatTracker.commitReactionSpend(actor, {
      token,
      actionId: action.id,
      actionLabel: action.label,
      actionCategory: action.category,
      logLabel: getActionLabel(action, metadata),
      edgePoolKey,
      allowCurrentTurn,
    });
  }
  return PersonalCombatTracker.spendResource(actor, {
    token,
    resource: effectiveCost.resource,
    cost: effectiveCost.value,
    actionId: action.id,
    actionLabel: getActionLabel(action, metadata),
    actionCostLabel: effectiveCost.label,
    actionCategory: action.category,
  });
}

async function executeRollAction(actor, { action, metadata = {}, event = null } = {}) {
  const rollApi = getRollApi();
  if (!rollApi?.execute) return { ok: false, reason: "MWD roll system not initialized." };
  const payload = {
    ...(clone(action.roll) ?? { intent: "skill" }),
    key: metadata.skillKey ?? action.roll?.key ?? undefined,
    tags: Array.from(new Set(action.tags ?? [])),
  };
  if (!payload.key && payload.intent === "skill") {
    return { ok: false, reason: "Choose a skill before rolling." };
  }
  const value = await rollApi.execute({ actor, payload, event });
  return { ok: Boolean(value), rolled: Boolean(value), value, cancelled: !value };
}

async function executeAttackResolver(actor, { action, token = null, metadata = {}, event = null } = {}) {
  if (action.id === "opportunity") {
    const gateState = getPersonalCriticalGateState(actor);
    if (gateState.cannotReact) return { ok: false, reason: `Disabled (${gateState.reactionReason})` };
  }
  if (action.id === "suppressionFire") {
    if (!metadata.weapon) return { ok: false, reason: "Choose an automatic weapon for Suppression Fire." };
    const value = await launchSuppressionFire({
      weapon: metadata.weapon,
      token,
      event,
      template: metadata.suppressionTemplate,
    });
    return { ok: Boolean(value), rolled: Boolean(value), value };
  }
  if (action.id === "grapple") {
    const rollApi = getRollApi();
    if (!rollApi?.execute) return { ok: false, reason: "MWD roll system not initialized." };
    const value = await rollApi.execute({
      actor,
      payload: {
        intent: "attack",
        syntheticWeapon: {
          id: "grapple",
          name: "Grapple",
        },
        sourceTokenId: token?.id ?? null,
        edge: { pool: "physical.grit", allowed: ["pre", "post"] },
        tags: ["combat", "attack", "grapple", "melee"],
      },
      event,
    });
    return { ok: Boolean(value), rolled: Boolean(value), value };
  }
  if (metadata.weapon) {
    const value = await launchOwnedWeaponAttack({ weapon: metadata.weapon, token, event });
    return { ok: Boolean(value), rolled: Boolean(value), value };
  }
  const rollApi = getRollApi();
  if (!rollApi?.execute) return { ok: false, reason: "MWD roll system not initialized." };
  const snapshot = PersonalCombatTracker.getSnapshot(actor, { token });
  const payload = {
    intent: "attack",
    edge: { pool: "physical.grit", allowed: ["pre", "post"] },
    tags: action.id === "opportunity" ? ["combat", "attack", "reaction", "opportunity"] : ["combat", "attack"],
    sourceTokenId: token?.id ?? null,
  };
  if (snapshot?.state?.actionState?.aim) payload.aim = { active: true };
  const value = await rollApi.execute({ actor, payload, event });
  if (value && snapshot?.state?.actionState?.aim) await PersonalCombatTracker.clearAim(actor, { token });
  return { ok: Boolean(value), rolled: Boolean(value), value };
}

async function executeInteractionResolver(actor, { action, metadata = {} } = {}) {
  if (action.id === "selectPayload") {
    if (!metadata.weapon?.setActivePayload) return { ok: false, reason: "Selected weapon cannot select payloads." };
    await metadata.weapon.setActivePayload(metadata.payloadId);
    return {
      ok: true,
      stateChanges: [{ type: "itemUpdate", itemId: metadata.weaponId, path: "system.selectedPayloadKey", value: metadata.payloadId }],
      log: { title: action.label, message: `${metadata.weaponName}: ${metadata.payloadName}` }
    };
  }
  if (action.id === "reload") {
    return { ok: true, log: { title: action.label, message: "Action spent; ammo consumption is not automated." } };
  }
  if (action.id === "changeFireMode") {
    return { ok: true, log: { title: action.label, message: "Fire mode selection is recorded for this activation." } };
  }
  return { ok: true };
}

async function executeRecoveryResolver(actor, { action, token = null, metadata = {}, event = null } = {}) {
  if (action.id === "firstAid") {
    const result = await executeFirstAidCombatAction(actor, { token, event });
    return { ...result, rolled: Boolean(result && !result.cancelled) };
  }
  if (action.id === "evade") {
    return activatePendingEvadeFromCombatMenu(actor, { token });
  }
  if (action.id === "grappleDefense") {
    return executeRollAction(actor, { action, metadata, event });
  }
  if (action.id === "reduceBurn") {
    return PersonalCombatTracker.reduceBurn(actor, { token });
  }
  if (action.id === "recoverBurn") {
    const first = await PersonalCombatTracker.reduceBurn(actor, { token });
    if (!first?.ok) return first;
    if (Number(actor.system?.burn?.value ?? 0) > 0) await actor.update({ "system.burn.value": Math.max(0, Number(actor.system?.burn?.value ?? 0) - 1) });
    return { ok: true, costPaid: true, log: { title: action.label, message: "Reduced Burn through a complex recovery action." } };
  }
  if (action.id === "extinguish" || action.id === "recover") {
    const statusId = action.id === "extinguish" ? "onFire" : "stunned";
    if (!actor?.statuses?.has?.(statusId)) return { ok: false, reason: `${statusId} is not active.` };
    await applyManagedStatusUpdate({ actor, statusId, active: false, metadata: { source: action.id } });
    return { ok: true, stateChanges: [{ type: "status", statusId, active: false }] };
  }
  return { ok: true };
}

async function executeMovementResolver(actor, { action } = {}) {
  if (action.id === "stand") {
    if (!actor?.statuses?.has?.("prone")) return { ok: false, reason: "Prone is not active." };
    await applyManagedStatusUpdate({ actor, statusId: "prone", active: false, metadata: { source: action.id } });
    return { ok: true, stateChanges: [{ type: "status", statusId: "prone", active: false }] };
  }
  const clears = collectStatusClearsOnAction(actor, { actionId: action.id });
  if (clears.length) {
    const stateChanges = [];
    for (const entry of clears) {
      const statusId = String(entry.statusId ?? "").trim();
      if (!statusId || !(actor?.statuses?.has?.(statusId) ?? false)) continue;
      await applyManagedStatusUpdate({ actor, statusId, active: false, metadata: { source: action.id } });
      stateChanges.push({ type: "status", statusId, active: false });
    }
    if (stateChanges.length) {
      return {
        ok: true,
        stateChanges,
        log: { title: action.label, message: String(clears[0]?.message ?? "").trim() || "Status cleared." },
      };
    }
  }
  return { ok: true };
}

async function executeResolver(actor, context) {
  const { action } = context;
  if (action.roll && (action.resolver === PERSONAL_ACTION_RESOLVERS.action || action.id === "overloadCheck")) {
    return executeRollAction(actor, context);
  }
  switch (action.resolver) {
    case PERSONAL_ACTION_RESOLVERS.attack:
      return executeAttackResolver(actor, context);
    case PERSONAL_ACTION_RESOLVERS.interaction:
      return executeInteractionResolver(actor, context);
    case PERSONAL_ACTION_RESOLVERS.recovery:
      return executeRecoveryResolver(actor, context);
    case PERSONAL_ACTION_RESOLVERS.movement:
      return executeMovementResolver(actor, context);
    default:
      return { ok: true };
  }
}

async function createAssistChatCard({ actor, token = null, targetName = "", costLabel = "" } = {}) {
  const actorName = String(actor?.name ?? "Ally").trim() || "Ally";
  const target = String(targetName ?? "an ally").trim() || "an ally";
  const cost = String(costLabel ?? "").trim();
  const content = `
    <div class="mwd-chat-card mwd-chat-card--assist">
      <h3>Assist</h3>
      <p><strong>${escapeHtml(actorName)}</strong> assists <strong>${escapeHtml(target)}</strong>.</p>
      ${cost ? `<p><small>Cost: ${escapeHtml(cost)}</small></p>` : ""}
    </div>`;

  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor, token: token?.object ?? token }),
    content
  });
}

async function createInterruptChatCard({ actor, token = null, preparedInterrupt = null, costLabel = "" } = {}) {
  const actorName = String(actor?.name ?? "Combatant").trim() || "Combatant";
  const condition = String(preparedInterrupt?.condition ?? "").trim();
  const scope = String(preparedInterrupt?.scope ?? "").trim();
  const cost = String(costLabel ?? "").trim();
  const content = `
    <div class="mwd-chat-card mwd-chat-card--interrupt">
      <h3>Interrupt</h3>
      <p><strong>${escapeHtml(actorName)}</strong> resolves a prepared interrupt.</p>
      ${condition ? `<p><strong>Trigger:</strong> ${escapeHtml(condition)}</p>` : ""}
      ${scope ? `<p><strong>Scope:</strong> ${escapeHtml(scope)}</p>` : ""}
      ${cost ? `<p><small>Cost: ${escapeHtml(cost)}</small></p>` : ""}
    </div>`;

  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor, token: token?.object ?? token }),
    content
  });
}

export async function removeActivationLogEntryIntent({ actor, token = null, index = null } = {}) {
  return PersonalCombatTracker.removeActivationLogEntry(actor, { token, index });
}

export async function executeOwnedWeaponAttackIntent({ weapon, event = null, token = null } = {}) {
  const value = await launchOwnedWeaponAttack({ weapon, event, token });
  return { ok: Boolean(value), rolled: Boolean(value), cancelled: !value, value };
}

export async function executeCombatActionIntent({ actor, token = null, payload = {}, event = null } = {}) {
  if (!actor) return { ok: false, reason: "Combat action requires an actor." };
  const normalizedPayload = normalizePayload(payload);

  if (normalizedPayload.roll) {
    const rollApi = getRollApi();
    if (!rollApi?.execute) return { ok: false, reason: "MWD roll system not initialized." };
    const value = await rollApi.execute({ actor, payload: normalizedPayload.roll, event });
    return { ok: Boolean(value), rolled: Boolean(value), cancelled: !value, value };
  }

  if (normalizedPayload.spend) {
    const { resource, cost, actionLabel, actionCostLabel } = normalizedPayload.spend;
    if (!normalizedPayload.actionId || !resource || !cost) return { ok: false, reason: "Invalid combat spend intent." };
    return PersonalCombatTracker.spendResource(actor, {
      token,
      resource,
      cost,
      actionId: normalizedPayload.actionId,
      actionLabel,
      actionCostLabel,
    });
  }

  const rawAction = normalizedPayload.action ?? getPersonalAction(normalizedPayload.actionId);
  if (!rawAction) return { ok: false, reason: "Unknown combat action." };

  const action = normalizeActionEntry(rawAction, { strict: false });
  if (!action) return { ok: false, reason: "Invalid combat action." };

  const implementationState = String(action.implementation?.state ?? "ready").trim() || "ready";
  if (implementationState === PERSONAL_ACTION_IMPLEMENTATION_STATES.disabled || implementationState === PERSONAL_ACTION_IMPLEMENTATION_STATES.stub) {
    return {
      ok: false,
      reason: action.implementation?.reason || "That action is not implemented yet.",
      actionId: action.id,
      costPaid: false,
      rolled: false,
      stateChanges: [],
    };
  }

  const snapshot = PersonalCombatTracker.getSnapshot(actor, { token });
  const effectiveCost = getEffectiveCost(action, snapshot);
  const gateReason = getCommonGateReason(action, actor, snapshot, effectiveCost);
  if (gateReason) return { ok: false, reason: gateReason, actionId: action.id, costPaid: false, rolled: false, stateChanges: [] };

  const promptResult = await resolvePrompt(action, actor, snapshot);
  if (promptResult === null) {
    return { ok: false, cancelled: true, actionId: action.id, costPaid: false, rolled: false, stateChanges: [] };
  }
  if (promptResult?.ok === false) return promptResult;

  const metadata = { ...(normalizedPayload.metadata ?? {}), ...(promptResult ?? {}) };

  if (["attack", "suppressionFire", "firstAid", "evade", "reduceBurn"].includes(action.id)) {
    const result = await executeResolver(actor, { action, token, metadata, event });
    if (action.id === "attack" && result?.ok && !metadata.weapon) {
      const spend = action.category === PERSONAL_ACTION_CATEGORIES.reaction
        ? await spendActionCost(actor, { token, action, metadata, snapshot })
        : await PersonalCombatTracker.spendResource(actor, {
          token,
          resource: "sa",
          cost: 2,
          actionId: "attack",
          actionLabel: "Attack",
          actionCostLabel: "2 SA",
          actionCategory: "complex",
        });
      if (!spend?.ok) return { ...spend, actionId: action.id, costPaid: false, rolled: Boolean(result?.rolled), stateChanges: [] };
    }
    return {
      ok: Boolean(result?.ok),
      reason: result?.reason ?? "",
      cancelled: Boolean(result?.cancelled),
      actionId: action.id,
      costPaid: Boolean(result?.ok && !result?.cancelled),
      rolled: Boolean(result?.rolled),
      stateChanges: result?.stateChanges ?? [],
      log: result?.log ?? null,
      value: result?.value,
    };
  }

  if (action.roll && (action.resolver === PERSONAL_ACTION_RESOLVERS.action || action.id === "overloadCheck")) {
    const spendPreview = effectiveCost.resource === "none" || effectiveCost.value <= 0
      ? { ok: true }
      : PersonalCombatTracker.previewResourceSpend?.(actor, {
        token,
        resource: effectiveCost.resource,
        cost: effectiveCost.value,
        actionId: action.id,
        actionLabel: getActionLabel(action, metadata),
        actionCostLabel: effectiveCost.label,
        actionCategory: action.category,
      }) ?? { ok: true };
    if (!spendPreview?.ok) return { ...spendPreview, actionId: action.id, costPaid: false, rolled: false, stateChanges: [] };

    const resolved = await executeResolver(actor, { action, token, metadata, event });
    if (resolved?.cancelled) {
      return { ...resolved, ok: false, actionId: action.id, costPaid: false, rolled: Boolean(resolved?.rolled), stateChanges: [] };
    }
    if (!resolved?.ok) {
      return { ...resolved, actionId: action.id, costPaid: false, rolled: Boolean(resolved?.rolled), stateChanges: resolved?.stateChanges ?? [] };
    }

    const spend = await spendActionCost(actor, { token, action, metadata, snapshot });
    if (!spend?.ok) return { ...spend, actionId: action.id, costPaid: false, rolled: Boolean(resolved?.rolled), stateChanges: [] };

    const stateResult = await PersonalCombatTracker._applyActionState?.(actor, {
      token,
      actionId: action.id,
      metadata,
      snapshot: spend.snapshot ?? snapshot,
    });

    return {
      ok: true,
      actionId: action.id,
      costPaid: Boolean(spend.costPaid ?? action.cost?.resource !== "none"),
      rolled: Boolean(resolved.rolled),
      stateChanges: [
        ...(stateResult?.ok ? [{ type: "combatState", actionId: action.id }] : []),
        ...(resolved.stateChanges ?? []),
      ],
      log: resolved.log ?? {
        title: action.label,
        message: getActionLabel(action, metadata)
      },
      costLabel: spend.costLabel,
      value: resolved.value,
    };
  }

  const spend = await spendActionCost(actor, { token, action, metadata, snapshot });
  if (!spend?.ok) return { ...spend, actionId: action.id, costPaid: false, rolled: false, stateChanges: [] };

  const stateResult = await PersonalCombatTracker._applyActionState?.(actor, {
    token,
    actionId: action.id === "carefulMove" ? "move" : action.id,
    metadata,
    snapshot: spend.snapshot ?? snapshot,
  });

  const resolved = await executeResolver(actor, { action, token, metadata, event, spend });
  if (!resolved?.ok) return { ...resolved, actionId: action.id, costPaid: true, rolled: Boolean(resolved?.rolled), stateChanges: resolved?.stateChanges ?? [] };

  if (action.id === "interrupt") {
    await PersonalCombatTracker.clearPreparedInterrupt(actor, { token });
    await createInterruptChatCard({
      actor,
      token,
      preparedInterrupt: metadata,
      costLabel: spend.costLabel,
    });
  } else if (action.id === "assist") {
    await createAssistChatCard({
      actor,
      token,
      targetName: metadata.targetName,
      costLabel: spend.costLabel,
    });
  }

  return {
    ok: true,
    actionId: action.id,
    costPaid: Boolean(spend.costPaid ?? action.cost?.resource !== "none"),
    rolled: Boolean(resolved.rolled),
    stateChanges: [
      ...(stateResult?.ok ? [{ type: "combatState", actionId: action.id }] : []),
      ...(resolved.stateChanges ?? []),
    ],
    log: resolved.log ?? {
      title: action.label,
      message: getActionLabel(action, metadata)
    },
    costLabel: spend.costLabel,
    value: resolved.value,
  };
}

export const PersonalCombatActions = Object.freeze({
  execute: executeCombatActionIntent,
  buildPayloadFromDataset: buildCombatActionPayloadFromDataset,
  executeOwnedWeaponAttack: executeOwnedWeaponAttackIntent,
  removeActivationLogEntry: removeActivationLogEntryIntent,
});
