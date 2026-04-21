// src/modules/roll/mwd-roll.js
// Purpose: Defines function `pickMostMissingEdgePool`.
// How it fits: Describes role within src/modules or template rendering pipeline.

import { resolveIntent } from "./intent/resolve-intent.js";
import { collectModifiers } from "./collect-modifiers.js";
import { buildResolved } from "./build-resolved.js";
import { renderChat } from "./renderers/render-chat.js";
import { interpretOutcome } from "./outcome/interpret-outcome.js";
import { MWDRollDialog } from "./mwd-roll-dialog.js";
import { WeaponItem } from "../item/weapon-item.js";
import { SelectItem } from "../dialog/select-item.js";
import { TEMPLATE } from "../constants.js";
import { resolveAttackExecution } from "./attack-resolution.js";
import { createAttackTemplateIndicator, placeTemplatedAttack } from "./template-placement.js";
import {
  applyTraitMutations,
  buildInitiativeTraitFacts,
  buildRollTraitFacts,
  evaluateTraitPhase,
} from "../mwd/traits.js";
import { isPersistentAreaEffect } from "../area-effects/area-effect-engine.js";
import {
  applyMachineRemedyOutcome,
  commitMachineRemedyCost,
  resolveMachineCritIntentContext,
} from "../mwd/machine-intents.js";
import { recordBattlemechAttackHeat } from "../mwd/machine-heat.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { getMachineActionDefinition } from "../mwd/machine-action-catalog.js";
import { getMachineAttackActionCost, isMachineActor } from "../mwd/machine-crit-effects.js";
import { resolveAcquireExecution, resolveTargetingExecution } from "./ew-execution.js";
import { getAttackerCombatant, consumeTargetingPacket } from "../mwd/machine-ew-state.js";

/**
 * Public roll API.
 * Sheets call: game.mwd.roll.execute({ actor, payload, event })
 */
export const MWDRoll = { execute };

const EDGE_DOMAIN_POOLS = {
  physical: ["grit","chaos"],
  mental: ["insight","rumor"],
  social: ["legend","credibility"],
};

function pickMostMissingEdgePool(actor, domain) {
  const keys = EDGE_DOMAIN_POOLS[domain] ?? [];
  let best = null, bestMissing = -1;

  for (const k of keys) {
    const p = actor.getEdgePool?.(k);
    const rating = Number(p?.rating ?? 0);
    const value  = Number(p?.value ?? 0);
    const missing = Math.max(0, rating - value);
    if (missing > bestMissing) { bestMissing = missing; best = k; }
  }
  return best ?? keys[0] ?? null;
}

function normalizeManualMods(payload) {
  const rows = Array.isArray(payload?.manualModifiers) ? payload.manualModifiers : [];
  const mods = rows
    .map(r => ({
      id: r.id ?? foundry.utils.randomID(),
      label: (r.label ?? "Manual").trim() || "Manual",
      value: Number(r.value ?? 0),
      source: "Manual"
    }))
    .filter(m => Number.isFinite(m.value) && m.value !== 0);

  const total = mods.reduce((a, m) => a + m.value, 0);
  return { mods, total };
}

function normalizePayload(payload = {}) {
  const toggles = payload.toggles ?? {};
  const payloadId = String(payload?.payloadId ?? payload?.ammoTypeId ?? "").trim();

  return {
    ...payload,
    ...(payloadId ? { payloadId } : {}),
    toggles: {
      useEdge: !!toggles.useEdge,
      takeRisks: !!toggles.takeRisks,
      opponentRoll: !!toggles.opponentRoll
    },
    manualModifiers: normalizeManualModifierRows(payload.manualModifiers)
  };
}

async function normalizeAttackPayload({ actor, payload } = {}) {
  if (payload?.intent !== "attack") return payload;

  const normalized = foundry.utils.deepClone(payload ?? {});
  const loadout = actor.getPersonalCombatLoadout?.({ refresh: true }) ?? null;
  const isMachine = isMachineActor(actor);
  const explicitSourceType = String(normalized?.sourceType ?? "").trim();
  const explicitSourceId = String(normalized?.sourceId ?? "").trim();

  const resolveWeaponProfile = (weaponId) => {
    const item = actor.items?.get?.(weaponId) ?? null;
    if (!item || !(item.isPersonalWeapon?.() ?? item.type === TEMPLATE.itemType.personalWeapon)) return null;
    if (!item.system?.equipped) return null;
    return item.getCombatProfile?.({ payloadId: normalized?.payloadId }) ?? null;
  };

  if (!explicitSourceType || !explicitSourceId) {
    const legacyGroupId = String(normalized?.weaponGroupId ?? normalized?.machineWeaponGroup?.id ?? "").trim();
    const legacyWeaponId = String(normalized?.weaponId ?? "").trim();

    if (legacyGroupId) {
      normalized.sourceType = "weaponGroup";
      normalized.sourceId = legacyGroupId;
    } else if (legacyWeaponId) {
      normalized.sourceType = isMachine ? "mechWeapon" : "personalWeapon";
      normalized.sourceId = legacyWeaponId;
    }
  }

  if (String(normalized?.sourceType ?? "").trim() === "weaponGroup") {
    normalized.weaponGroupId = String(normalized?.sourceId ?? normalized?.weaponGroupId ?? "").trim();
    normalized.sourceId = normalized.weaponGroupId;
    if (!normalized.weaponGroupId) {
      throw new Error("Attack requires a valid weapon group source.");
    }
    return normalized;
  }

  if (String(normalized?.sourceType ?? "").trim() === "mechWeapon") {
    normalized.weaponId = String(normalized?.sourceId ?? normalized?.weaponId ?? "").trim();
    normalized.sourceId = normalized.weaponId;
    if (!normalized.weaponId) {
      throw new Error("Attack requires a valid machine weapon source.");
    }
    return normalized;
  }

  if (String(normalized?.sourceType ?? "").trim() === "personalWeapon" && explicitSourceId) {
    normalized.weaponId = explicitSourceId;
  }

  if (normalized.weaponId) {
    const profile = resolveWeaponProfile(normalized.weaponId);
    if (!profile) {
      throw new Error("Attack requires an owned equipped personal weapon.");
    }

    normalized.sourceType = "personalWeapon";
    normalized.sourceId = normalized.weaponId;
    normalized.payloadId = normalized.payloadId ?? profile?.payloadState?.activePayloadId ?? "";
    return normalized;
  }

  if (normalized.mode === "auto") {
    if (loadout?.weaponChoiceRequired) {
      const selected = await SelectItem.selectItem(
        "Choose Weapon",
        loadout.equippedWeapons ?? []
      );
      if (!selected) return null;

      normalized.weaponId = selected.id;
      normalized.sourceType = "personalWeapon";
      normalized.sourceId = selected.id;
      normalized.payloadId = normalized.payloadId ?? selected?.payloadState?.activePayloadId ?? "";
      delete normalized.mode;
      return normalized;
    }

    if (loadout?.defaultWeapon?.isSynthetic || loadout?.defaultWeapon?.id === "unarmed") {
      normalized.syntheticWeapon = foundry.utils.deepClone(loadout.defaultWeapon ?? WeaponItem.buildDefaultUnarmedProfile(actor));
      normalized.weaponId = normalized.syntheticWeapon.id;
      normalized.sourceType = "personalWeapon";
      normalized.sourceId = normalized.syntheticWeapon.id;
      normalized.payloadId = normalized.payloadId ?? normalized.syntheticWeapon?.payloadState?.activePayloadId ?? "";
      delete normalized.mode;
      return normalized;
    }

    if (loadout?.defaultWeapon?.id) {
      normalized.weaponId = loadout.defaultWeapon.id;
      normalized.sourceType = "personalWeapon";
      normalized.sourceId = loadout.defaultWeapon.id;
      normalized.payloadId = normalized.payloadId ?? loadout.defaultWeapon?.payloadState?.activePayloadId ?? "";
      delete normalized.mode;
      return normalized;
    }
  }

  if (normalized.fallback === "unarmed") {
    normalized.syntheticWeapon = foundry.utils.deepClone(WeaponItem.buildDefaultUnarmedProfile(actor));
    normalized.weaponId = normalized.syntheticWeapon.id;
    normalized.sourceType = "personalWeapon";
    normalized.sourceId = normalized.syntheticWeapon.id;
    normalized.payloadId = normalized.payloadId ?? normalized.syntheticWeapon?.payloadState?.activePayloadId ?? "";
    delete normalized.mode;
    return normalized;
  }

  throw new Error("Attack could not resolve a usable weapon.");
}

function normalizeManualModifierRows(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.map(r => ({
    id: r?.id ?? foundry.utils.randomID(),
    label: typeof r?.label === "string" ? r.label : "Manual",
    value: Number(r?.value ?? 0)
  }));
}

async function updateUserTargets(tokenIds = []) {
  const ids = Array.from(new Set(
    (Array.isArray(tokenIds) ? tokenIds : [])
      .map(id => String(id ?? "").trim())
      .filter(Boolean)
  ));

  if (typeof game.user?.updateTokenTargets === "function") {
    await game.user.updateTokenTargets(ids);
    return;
  }

  for (const token of Array.from(game.user?.targets ?? [])) {
    token?.setTarget?.(false, { releaseOthers: false, user: game.user });
  }

  for (const id of ids) {
    const token = canvas?.tokens?.get?.(id)
      ?? canvas?.tokens?.placeables?.find?.(entry => entry?.id === id)
      ?? null;
    token?.setTarget?.(true, { releaseOthers: false, user: game.user });
  }
}

function getMachineAttackToken(actor, payload = {}) {
  const sourceTokenId = String(payload?.sourceTokenId ?? "").trim();
  if (sourceTokenId) {
    const direct = canvas?.tokens?.get?.(sourceTokenId)
      ?? canvas?.tokens?.placeables?.find?.(token => token?.id === sourceTokenId)
      ?? null;
    if (direct) return direct.document ?? direct;
  }

  return actor?.token?.document
    ?? actor?.token
    ?? actor?.getActiveTokens?.(true, true)?.[0]?.document
    ?? actor?.getActiveTokens?.(true, true)?.[0]
    ?? null;
}

async function commitMachineAttackAction(actor, payload = {}) {
  if (!isMachineActor(actor)) return;

  const token = getMachineAttackToken(actor, payload);
  const snapshot = PersonalCombatTracker.getSnapshot?.(actor, { token }) ?? null;
  if (!snapshot?.hasCombatant) return;

  const cost = getMachineAttackActionCost(actor);
  const isBattlemechGroupAttack = actor?.type === TEMPLATE.actorTypes.battlemech
    && String(payload?.sourceType ?? "").trim() === "weaponGroup"
    && String(payload?.sourceId ?? payload?.weaponGroupId ?? "").trim();
  const totalCost = isBattlemechGroupAttack
    ? (1 + Number(cost?.extraCost ?? 0))
    : Number(cost?.totalCost ?? 0);
  const spend = await PersonalCombatTracker.spendResource(actor, {
    token,
    resource: "sa",
    cost: totalCost,
    actionId: "attack",
    actionLabel: "Attack",
    actionCostLabel: `${totalCost} SA`,
    actionCategory: "complex",
  });
  if (!spend?.ok) {
    ui.notifications?.warn(spend?.reason ?? "Unable to record attack action.");
    return;
  }

  if (isBattlemechGroupAttack) {
    const markUsed = await PersonalCombatTracker.markWeaponGroupUsed?.(actor, {
      token,
      groupId: String(payload?.sourceId ?? payload?.weaponGroupId ?? "").trim(),
    });
    if (!markUsed?.ok) {
      ui.notifications?.warn(markUsed?.reason ?? "Unable to record BattleMech weapon-group usage.");
    }
  }
}

async function commitMachineAction(actor, actionKey = "", payload = {}) {
  if (!isMachineActor(actor)) return;

  const action = getMachineActionDefinition(actionKey);
  if (!action?.cost || action?.resource !== "sa") return;

  const token = getMachineAttackToken(actor, payload);
  const snapshot = PersonalCombatTracker.getSnapshot?.(actor, { token }) ?? null;
  if (!snapshot?.hasCombatant) return;

  const spend = await PersonalCombatTracker.spendResource(actor, {
    token,
    resource: action.resource,
    cost: action.cost,
    actionId: action.key,
    actionLabel: action.label,
    actionCostLabel: `${action.cost} SA`,
    actionCategory: action.category,
  });
  if (!spend?.ok) {
    ui.notifications?.warn(spend?.reason ?? `Unable to record ${action.label}.`);
  }
}

async function execute({ actor, payload, event } = {}) {
  // Allow token docs/objects to be passed accidentally
  if (actor?.actor) actor = actor.actor;
  if (actor?.document?.actor) actor = actor.document.actor;

  if (!actor) throw new Error("MWD.roll.execute requires actor");
  if (!payload?.intent) throw new Error("MWD.roll.execute requires payload.intent");
  payload = normalizePayload(payload);
  payload = await normalizeAttackPayload({ actor, payload });
  if (!payload) return null;

  /* -------------------------------- */
  /* 1) Resolve intent (always first) */
  /* -------------------------------- */

  let ctx = await resolveIntent({ actor, payload, event });

  if (payload.intent === "attack" && ctx?.attack?.capabilityReport?.isTemplated) {
    const placementResult = await placeTemplatedAttack({
      actor,
      attack: ctx.attack,
    });

    if (!placementResult) return null;

    try {
      await createAttackTemplateIndicator({
        actor,
        attack: ctx.attack,
        templateGeometry: placementResult.templateGeometry ?? null,
      });
    } catch (error) {
      console.warn("MWD | Unable to create visual template indicator", error);
    }

    await updateUserTargets(placementResult.autoTargetTokenIds ?? []);

    if (
      !isPersistentAreaEffect(ctx?.attack?.areaEffect ?? ctx?.attack?.payload?.areaEffect ?? {})
      && (!Array.isArray(placementResult.targetSnapshots) || placementResult.targetSnapshots.length === 0)
    ) {
      ui.notifications?.warn("Template placement did not affect any targets.");
      return null;
    }

    payload.targetSnapshots = Array.isArray(placementResult.targetSnapshots) ? placementResult.targetSnapshots : [];
    payload.templateGeometry = placementResult.templateGeometry ?? null;
    payload.templatePlacement = placementResult.placement;
    ctx = await resolveIntent({ actor, payload, event });
  } else if (payload.intent === "attack") {
    delete payload.targetSnapshots;
    delete payload.templatePlacement;
    delete payload.templateGeometry;
  }

  /* --------------------------------------------------- */
  /* 2) Collect modifiers (items, status, etc — no UI)  */
  /* --------------------------------------------------- */

  let collected = await collectModifiers({
    actor,
    rollType: payload.intent,
    skillId: payload.key,
    domains: ctx.domains,
    payload,
    resolved: ctx,
    context: { event }
  });

  /* -------------------------------------- */
  /* 3) Dialog (BEFORE rolling)             */
  /* -------------------------------------- */

  const updatedPayload = await MWDRollDialog.prompt({
    actor,
    basePayload: payload,
    resolved: ctx,
    diceParts: {
      attribute: ctx?.pool?.attribute ?? 0,
      skill: ctx?.pool?.skill ?? 0,
      bonus: ctx?.pool?.bonus ?? 0,
      specialization: ctx?.pool?.specialization ?? 0
    },
    mods: collected.mods,
    modTotal: collected.total,
    options: {
      allowEdge: payload.intent !== "initiative"
    }
  });

  if (!updatedPayload) return null;

  payload = normalizePayload(updatedPayload);
  ctx = await resolveIntent({ actor, payload, event });

  if (payload.intent === "attack" && !ctx?.attack?.capabilityReport?.isTemplated) {
    delete payload.targetSnapshots;
    delete payload.templatePlacement;
    delete payload.templateGeometry;
  }

  if (payload.intent === "attack" && payload.weaponId) {
    const weaponItem = actor.items?.get?.(payload.weaponId) ?? null;
    if (weaponItem?.isPersonalWeapon?.()) {
      const selectedPayloadId = String(payload.payloadId ?? "").trim();
      const activePayloadId = String(weaponItem.system?.selectedPayloadId ?? "").trim();
      if (selectedPayloadId && selectedPayloadId !== activePayloadId) {
        await weaponItem.setActivePayload?.(selectedPayloadId);
      }

      if (!weaponItem.canConsumePayload?.({ payloadId: selectedPayloadId })) {
        const payloadState = weaponItem.getPayloadState?.({ payloadId: selectedPayloadId });
        const payloadName = payloadState?.payloadLabel ? ` (${payloadState.payloadLabel})` : "";
        ui.notifications?.warn(`Not enough payload${payloadName} for ${weaponItem.name}.`);
        return null;
      }
    }
  }

  /* -------------------------------------- */
  /* 3.5) Recollect modifiers (final pass) */
  /* -------------------------------------- */

  collected = await collectModifiers({
    actor,
    rollType: payload.intent,
    skillId: payload.key,
    domains: ctx.domains,
    payload,
    resolved: ctx,
    context: { event }
  });
    
  /* -------------------------------- */
  /* 4) Final modifier collection     */
  /*    (now includes manual mods)    */
  /* -------------------------------- */

  const { mods: providerMods, total: providerTotal } = collected;

  // Manual mods come from the payload editor (dialog)
  const { mods: manualMods, total: manualTotal } = normalizeManualMods(payload);

  // Final mods used for roll + chat
  let mods = [...providerMods, ...manualMods];
  let modTotal = Number(providerTotal ?? 0) + Number(manualTotal ?? 0);

  const basePool =
  Number(ctx?.pool?.attribute ?? 0) +
  Number(ctx?.pool?.skill ?? 0) +
  Number(ctx?.pool?.bonus ?? 0) +
  Number(ctx?.pool?.specialization ?? 0);

  const pool = Math.max(0, basePool + Number(modTotal ?? 0));


 /* --------------------------- */
  /* 5) Edge + target number    */
  /* --------------------------- */

  // Initiative (and other non-skill intents) must not spend Edge.
  // Edge may *later* be used to gain actions, but that's not "roll spend".
  const edgeAllowed = payload.intent !== "initiative";

  const edgeInfo = edgeAllowed ? computeEdgeInfo({ actor, ctx, payload }) : null;
  const diceTarget = edgeInfo?.pre?.spent ? 4 : Number(ctx.diceTarget ?? ctx.target ?? 5);

  const runtime = {
    snapshot: game.mwd?.personalCombat?.getSnapshot?.(actor) ?? null,
  };

  let machineRemedySpend = null;
  let machineRemedyContext = null;
  if (ctx.intent === "machineRemedy") {
    machineRemedyContext = await resolveMachineCritIntentContext(payload, {
      gmOverride: Boolean(payload?.gmOverride),
    });
    if (!machineRemedyContext.ok) {
      ui.notifications?.warn(machineRemedyContext.reason ?? "Unable to resolve the machine remedy.");
      return null;
    }

    machineRemedySpend = await commitMachineRemedyCost(machineRemedyContext);
    if (!machineRemedySpend?.ok) {
      ui.notifications?.warn(machineRemedySpend?.reason ?? "Unable to spend the remedy action.");
      return null;
    }
  }

  const traitBuildResult = evaluateTraitPhase({
    actor,
    phase: "onBuildRoll",
    facts: buildRollTraitFacts({ actor, resolved: ctx, payload, runtime }),
    packet: {},
    options: { runtime, consumeUsage: true },
  });
  await applyTraitMutations({ actor, mutations: traitBuildResult.mutations, runtime });

  // Spend pre-edge (once) before rolling
  if (edgeAllowed && edgeInfo?.pre?.spent && edgeInfo?.pre?.poolKey) {
    await actor.spendEdge?.(edgeInfo.pre.poolKey, 1);
  }


  /* --------------------------- */
  /* 6) Roll dice (once)        */
  /* --------------------------- */

  let roll;
  let hits = 0;
  let ones = 0;

  if (ctx.rollType === "sum" && ctx.sum?.formula) {

    roll = await new Roll(ctx.sum.formula, ctx.sum.data ?? {}).evaluate();

    const baseTotal = Number(roll.total ?? 0);
    const totalWithMods = baseTotal + Number(modTotal ?? 0);
    hits = totalWithMods; // treat totalWithMods as "hits" for downstream compatibility

  } else {

    roll = await new Roll(`${pool}d6cs>=${diceTarget}`).evaluate();

    const dice = roll.dice?.[0];

    hits = Array.isArray(dice?.results)
      ? dice.results.filter(r => r.success).length
      : 0;

    ones = Array.isArray(dice?.results)
      ? dice.results.filter(r => r.result === 1).length
      : 0;
  }

  if (ctx.intent === "initiative" && roll?.total != null) {
    const initiativePacket = { total: Number(roll.total ?? 0) + Number(modTotal ?? 0) };
    const initiativePhase = evaluateTraitPhase({
      actor,
      phase: "onInitiativeResolved",
      facts: buildInitiativeTraitFacts({ actor, packet: initiativePacket, runtime }),
      packet: initiativePacket,
      options: { runtime, consumeUsage: true },
    });
    await applyTraitMutations({ actor, mutations: initiativePhase.mutations, runtime });

    if (initiativePhase.modifiers.length) {
      const initiativeDelta = initiativePhase.modifiers.reduce((sum, modifier) => sum + Number(modifier.value ?? 0), 0);
      mods = mods.concat(initiativePhase.modifiers);
      modTotal += initiativeDelta;
      hits = Number(initiativePhase.packet.total ?? 0);
      await applyInitiativeToCombat({ actor, total: initiativePhase.packet.total ?? roll.total });
      ctx.breakdown = (ctx.breakdown ?? []).concat(initiativePhase.modifiers.map((modifier, index) => ({
        id: `traitInitiative${index + 1}`,
        label: modifier.label,
        value: Number(modifier.value ?? 0),
      })));
    } else {
      hits = Number(initiativePacket.total ?? 0);
      await applyInitiativeToCombat({ actor, total: initiativePacket.total });
    }
  }

  /* -------------------------------- */
  /* 6.5) Interpret roll outcome      */
  /* -------------------------------- */

  const outcomeModel = interpretOutcome(
    ctx,
    { successes: hits, raw: roll?.toJSON?.() },
    null // opposed rolls can pass defender result later
  );

  const earned = outcomeModel?.edgeEarned;
  if (earned?.amount > 0) {
    const domain =
      ctx?.domains?.includes("physical") ? "physical" :
      ctx?.domains?.includes("mental") ? "mental" :
      ctx?.domains?.includes("social") ? "social" : null;

    const poolKey = pickMostMissingEdgePool(actor, domain);

    await actor.gainEdge?.(poolKey, earned.amount);

    // so chat shows where it went
    outcomeModel.edgeEarned.pool = poolKey;
  }

  if (ctx.intent === "overload") {
    await applyOverloadResult({ actor, passed: outcomeModel.passed });
  }

  let attackExecution = null;
  let machineRemedyResult = null;
  if (ctx.intent === "attack") {
    attackExecution = await resolveAttackExecution({
      attacker: actor,
      ctx,
      outcomeModel
    });
  } else if (ctx.intent === "machineRemedy") {
    machineRemedyResult = await applyMachineRemedyOutcome(payload, {
      gmOverride: Boolean(payload?.gmOverride),
      passed: Boolean(outcomeModel?.passed),
    });
  }

  let ewAcquireResult = null;
  let ewTargetingResult = null;
  if (ctx.intent === "acquire") {
    ewAcquireResult = await resolveAcquireExecution({ attacker: actor, ctx, outcomeModel });
  }
  if (ctx.intent === "targeting") {
    ewTargetingResult = await resolveTargetingExecution({ attacker: actor, ctx, outcomeModel });
  }
  if (ctx.intent === "attack" && ctx.attack?.ewContext?.activePacketId) {
    const attackerToken = getMachineAttackToken(actor, payload);
    const ewCombatant = getAttackerCombatant(attackerToken);
    if (ewCombatant) {
      Hooks.callAll("mwd.beforeTargetingPacketConsume", {
        attacker: actor,
        targetTokenUuid: ctx.attack.ewContext.targetTokenUuid,
        packetId: ctx.attack.ewContext.activePacketId,
        ctx,
      });
      await consumeTargetingPacket(ewCombatant, ctx.attack.ewContext.targetTokenUuid, ctx.attack.ewContext.activePacketId);
    }
  }

  /* --------------------------- */
  /* 7) Build resolved payload  */
  /* --------------------------- */

  const resolved = buildResolved({
    actor,
    payload,
    ctx,
    roll,
    target: diceTarget,
    pool,
    mods,
    modTotal,
    hits,
    ones,
    edge: edgeInfo,
    outcomeModel
  });

  if (attackExecution) {
    resolved.attackResult = attackExecution;
  }
  if (ctx.intent === "machineRemedy") {
    resolved.machineRemedy = ctx.machineRemedy ?? null;
    resolved.machineRemedyResult = {
      ...(machineRemedyResult ?? { ok: false, reason: "Machine remedy result missing." }),
      spend: machineRemedySpend,
      context: machineRemedyContext,
    };
  }
  if (ewAcquireResult)   resolved.ewAcquireResult  = ewAcquireResult;
  if (ewTargetingResult) resolved.ewTargetingResult = ewTargetingResult;
  if (ctx.acquire)   resolved.acquire   = ctx.acquire;
  if (ctx.targeting) resolved.targeting = ctx.targeting;

  /* --------------------------- */
  /* 8) Render chat             */
  /* --------------------------- */

  const html = await renderChat({ resolved });

  if (payload.intent === "attack" && payload.weaponId) {
    const weaponItem = actor.items?.get?.(payload.weaponId) ?? null;
    if (weaponItem?.isPersonalWeapon?.()) {
      const consumed = await weaponItem.consumePayload?.({ payloadId: payload.payloadId });
      if (!consumed) {
        ui.notifications?.warn(`Payload could not be consumed for ${weaponItem.name}.`);
      }
    }
  }

  if (ctx.intent === "attack" && actor.type === "battlemech") {
    const weaponIds = Array.from(new Set([
      ...((ctx?.attack?.weapon?.machineWeaponGroup?.weaponIds ?? []).map(id => String(id ?? "").trim()).filter(Boolean)),
      ...(payload?.weaponId ? [String(payload.weaponId).trim()] : []),
    ]));
    if (weaponIds.length) {
      try {
        await recordBattlemechAttackHeat(actor, {
          weaponIds,
          reason: "attack resolution",
        });
      } catch (error) {
        console.warn("MWD | Unable to record BattleMech attack heat", error);
      }
    }
  }

  if (ctx.intent === "attack") {
    await commitMachineAttackAction(actor, payload);
  } else if (ctx.intent === "acquire") {
    await commitMachineAction(actor, "acquireTarget", payload);
  } else if (ctx.intent === "targeting") {
    await commitMachineAction(actor, "generateFireSolution", payload);
  }

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: html,
    flags: {
      mwd: {
        payload,
        resolved
      }
    }
  });
}


/* ----------------------------- */
/* Edge computation              */
/* ----------------------------- */

function computeEdgeInfo({ actor, ctx, payload }) {
  const domain = pickEdgeDomain(ctx?.domains);
  const pair = EDGE_POOLS_BY_DOMAIN[domain] ?? null;

  const a = pair?.a ?? null;
  const b = pair?.b ?? null;

  const allowedPrePools = [a, b].filter(Boolean);

  // ---- PRE ----
  const wantsPre = Boolean(payload?.toggles?.useEdge) || Boolean(payload?.useEdge);
  let prePoolKey = String(payload?.edge?.pre?.poolKey ?? "").trim() || null;

  // validate pre poolKey against domain
  if (prePoolKey && !allowedPrePools.includes(prePoolKey)) prePoolKey = null;

  // pre spent is driven by "wantsPre" AND having a valid poolKey
  const preSpent = wantsPre && prePoolKey ? 1 : 0;

  // ---- POST (Option B) ----
  // if preSpent, post must be the other pool; else user can choose either later.
  let allowedPostPools = [...allowedPrePools];
  if (preSpent && prePoolKey) allowedPostPools = allowedPostPools.filter(k => k !== prePoolKey);

  // keep payload-selected post if present (used by chat post actions)
  let postPoolKey = String(payload?.edge?.post?.poolKey ?? "").trim() || null;
  if (postPoolKey && !allowedPostPools.includes(postPoolKey)) postPoolKey = null;

  const postSpent = Number(payload?.edge?.post?.spent ?? 0) ? 1 : 0;

  return {
    domain,
    pools: pair ? { a, b } : null,
    pre: { poolKey: prePoolKey, spent: preSpent },
    post: { poolKey: postPoolKey, spent: postSpent },
    allowed: { prePools: allowedPrePools, postPools: allowedPostPools }
  };
}


function pickEdgeDomain(domains) {
  if (!Array.isArray(domains)) return null;
  if (domains.includes("physical")) return "physical";
  if (domains.includes("mental")) return "mental";
  if (domains.includes("social")) return "social";
  return null;
}

const EDGE_POOLS_BY_DOMAIN = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};

async function applyInitiativeToCombat({ actor, total }) {

  // Require token (Option 3A)
  const controlled = canvas?.tokens?.controlled?.find(t => t.actor?.id === actor.id);
  const fallback = actor.getActiveTokens?.(true, true)?.[0] ?? null;
  const token = controlled ?? fallback;

  if (!token) {
    ui.notifications?.warn("Initiative requires a token on the current scene.");
    return;
  }

  let combat = game.combat;

  if (!combat) {
    combat = await Combat.create({
      scene: canvas.scene.id,
      active: true
    });
  }

  let combatant = combat.combatants.find(c => c.tokenId === token.id);

  if (!combatant) {
    const created = await combat.createEmbeddedDocuments("Combatant", [{
      tokenId: token.id,
      actorId: actor.id,
      sceneId: canvas.scene.id
    }]);
    combatant = created?.[0];
  }

  if (!combatant) return;

  await combatant.update({ initiative: Number(total) });
}

async function applyOverloadResult({ actor, passed }) {
  if (!passed) {
    await actor.update({ "system.burn.overloaded": true });
  }
}
