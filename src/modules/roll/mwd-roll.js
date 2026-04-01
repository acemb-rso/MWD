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
import { placeTemplatedAttack } from "./template-placement.js";
import {
  applyTraitMutations,
  buildInitiativeTraitFacts,
  buildRollTraitFacts,
  evaluateTraitPhase,
} from "../mwd/traits.js";

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

  const resolveWeaponProfile = (weaponId) => {
    const item = actor.items?.get?.(weaponId) ?? null;
    if (!item || !(item.isPersonalWeapon?.() ?? item.type === TEMPLATE.itemType.personalWeapon)) return null;
    if (!item.system?.equipped) return null;
    return item.getCombatProfile?.({ payloadId: normalized?.payloadId }) ?? null;
  };

  if (normalized.weaponId) {
    const profile = resolveWeaponProfile(normalized.weaponId);
    if (!profile) {
      throw new Error("Attack requires an owned equipped personal weapon.");
    }

    normalized.rangeBand = normalized.rangeBand ?? profile.defaultRangeBand ?? "close";
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
      normalized.rangeBand = normalized.rangeBand ?? selected.defaultRangeBand ?? "close";
      normalized.payloadId = normalized.payloadId ?? selected?.payloadState?.activePayloadId ?? "";
      delete normalized.mode;
      return normalized;
    }

    if (loadout?.defaultWeapon?.isSynthetic || loadout?.defaultWeapon?.id === "unarmed") {
      normalized.syntheticWeapon = foundry.utils.deepClone(loadout.defaultWeapon ?? WeaponItem.DEFAULT_UNARMED);
      normalized.weaponId = normalized.syntheticWeapon.id;
      normalized.rangeBand = normalized.rangeBand ?? "close";
      normalized.payloadId = normalized.payloadId ?? normalized.syntheticWeapon?.payloadState?.activePayloadId ?? "";
      delete normalized.mode;
      return normalized;
    }

    if (loadout?.defaultWeapon?.id) {
      normalized.weaponId = loadout.defaultWeapon.id;
      normalized.rangeBand = normalized.rangeBand ?? loadout.defaultWeapon.defaultRangeBand ?? "close";
      normalized.payloadId = normalized.payloadId ?? loadout.defaultWeapon?.payloadState?.activePayloadId ?? "";
      delete normalized.mode;
      return normalized;
    }
  }

  if (normalized.fallback === "unarmed") {
    normalized.syntheticWeapon = foundry.utils.deepClone(WeaponItem.DEFAULT_UNARMED);
    normalized.weaponId = normalized.syntheticWeapon.id;
    normalized.rangeBand = normalized.rangeBand ?? "close";
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

  if (payload.intent === "attack" && ctx?.attack?.capabilityReport?.isTemplated) {
    const placementResult = await placeTemplatedAttack({
      actor,
      attack: ctx.attack,
    });

    if (!placementResult) return null;
    if (!Array.isArray(placementResult.targetSnapshots) || placementResult.targetSnapshots.length === 0) {
      ui.notifications?.warn("Template placement did not affect any targets.");
      return null;
    }

    payload.targetSnapshots = placementResult.targetSnapshots;
    payload.templatePlacement = placementResult.placement;
    ctx = await resolveIntent({ actor, payload, event });
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

    roll = await new Roll(ctx.sum.formula, ctx.sum.data ?? {}).evaluate({ async: true });

    const baseTotal = Number(roll.total ?? 0);
    const totalWithMods = baseTotal + Number(modTotal ?? 0);
    hits = totalWithMods; // treat totalWithMods as "hits" for downstream compatibility

  } else {

    roll = await new Roll(`${pool}d6cs>=${diceTarget}`)
      .evaluate({ async: true });

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
  if (ctx.intent === "attack") {
    attackExecution = await resolveAttackExecution({
      attacker: actor,
      ctx,
      outcomeModel
    });
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
    resolved.damageResult = attackExecution.damageResult;
  }

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
