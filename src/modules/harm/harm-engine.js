// src/modules/harm/harm-engine.js
// Purpose: Central GM harm application service.
// How it fits: Routes the GM harm tool through one actor-first workflow so
// damage, burn, and status changes share the same targeting and chat contract.


import { Checkbars } from "../common/checkbars.js";
import { TEMPLATE } from "../constants.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import {
  applyManagedStatusUpdate,
  getCurrentStatusState,
  getToggleableStatusEffects,
} from "../dialog/token-status-dialog.js";
import {
  applyArmorTagEffects,
  computePersonalArmorMitigation,
  getPersonalDamageTypeLabel,
  normalizePersonalDamageType,
  PERSONAL_DAMAGE_TYPES,
} from "../mwd/personal-damage.js";
import {
  applyTraitMutations,
  buildDamageTraitFacts,
  evaluateTraitPhase,
} from "../mwd/traits.js";
import { applyMachineAttackDamage } from "../mwd/critical-hits.js";
import {
  getHarmTrackLabel,
  normalizeHarmDelta,
  resolveArmorWearStep,
} from "./harm-engine-utils.js";

// The harm tool can target either a live Token object or its TokenDocument.
// Normalizing that boundary early keeps the rest of the engine actor-first.
function asTokenDocument(token) {
  if (!token) return null;
  return token?.document ?? token;
}

// Linked tokens should mutate the base actor so GM adjustments survive scene
// transitions. Unlinked tokens keep their token actor state instead.
function getPersistentActorForToken(actor, token) {
  if (!actor) return null;

  const tokenDoc = asTokenDocument(token) ?? asTokenDocument(actor?.token);
  if (!tokenDoc) return actor;

  if (tokenDoc.isLinked) {
    return tokenDoc.baseActor
      ?? game.actors?.get?.(tokenDoc?.baseActor?.id ?? "")
      ?? tokenDoc.actor
      ?? actor;
  }

  return tokenDoc.actor ?? actor;
}

function getMonitorValue(actor, track) {
  return Math.max(0, Number(actor?.system?.monitors?.[track]?.value ?? 0) || 0);
}

function getBurnValue(actor) {
  return Math.max(0, Number(actor?.system?.burn?.value ?? 0) || 0);
}

function isPersonActor(actor) {
  return actor?.type === TEMPLATE.actorTypes.character || actor?.type === TEMPLATE.actorTypes.npc;
}

function isMachineActor(actor) {
  return actor?.type === TEMPLATE.actorTypes.vehicle || actor?.type === TEMPLATE.actorTypes.battlemech;
}

function isKnownActor(actor) {
  return [
    TEMPLATE.actorTypes.character,
    TEMPLATE.actorTypes.npc,
    TEMPLATE.actorTypes.vehicle,
    TEMPLATE.actorTypes.battlemech,
  ].includes(actor?.type);
}

function modeAllowsActor(mode, actor) {
  const normalizedMode = String(mode ?? "").trim();
  if (normalizedMode === "status") return isKnownActor(actor);
  if (normalizedMode === "machineAttackDamage") return isMachineActor(actor);
  return isPersonActor(actor);
}

function getStatusLabelFromId(statusId, actor) {
  return getToggleableStatusEffects(actor).find(effect => effect.id === statusId)?.label ?? statusId;
}

// GM chat logging is a post-apply audit trail. Keep the copy generation here
// so every harm mode reports through the same summary format.
function buildChatContent(result) {
  const escapeHtml = foundry.utils.escapeHTML;
  const lines = [];

  if (result.mode === "machineAttackDamage") {
    const verb = result.appliedDelta >= 0 ? "Applied" : "Recovered";
    lines.push(`<div><b>${verb}:</b> ${Number(result.damageIncoming ?? result.requestedDelta ?? 0)} machine damage</div>`);
    if (result.hitLocation?.locationLabel) {
      lines.push(`<div><b>Location:</b> ${escapeHtml(result.hitLocation.locationLabel)} (${Number(result.hitLocation.rollTotal ?? 0)})</div>`);
    }
    if (result.machine) {
      lines.push(`<div><b>Armor:</b> ${Number(result.machine.armorBefore ?? 0)} -> ${Number(result.machine.armorAfter ?? 0)}</div>`);
      lines.push(`<div><b>Structure:</b> ${Number(result.machine.structureBefore ?? 0)} -> ${Number(result.machine.structureAfter ?? 0)}</div>`);
    }
    if (result.critical?.records?.length) {
      lines.push(`<div><b>Critical:</b> ${escapeHtml(result.critical.records.map(crit => crit.label).join(", "))}</div>`);
    } else if (result.critical?.reason) {
      lines.push(`<div><b>Critical:</b> ${escapeHtml(result.critical.reason)}</div>`);
    }
  }

  if (result.mode === "attackDamage" || result.mode === "trackDelta") {
    const verb = result.appliedDelta >= 0 ? "Applied" : "Recovered";
    const amount = Math.abs(Number(result.appliedDelta ?? 0));
    const amountLabel = amount === 1 ? "point" : "points";
    const armorSuffix = result.usedArmor
      ? ` via armor-aware ${escapeHtml(getPersonalDamageTypeLabel(result.damageType))}`
      : "";
    lines.push(`<div><b>${verb}:</b> ${amount} ${amountLabel} to ${escapeHtml(getHarmTrackLabel(result.track))}${armorSuffix}</div>`);

    if (result.usedArmor && result.mitigation) {
      lines.push(
        `<div><b>Mitigation:</b> base ${Number(result.mitigation.baseMitigation ?? 0)} + type ${Number(result.mitigation.typeMitigationMod ?? 0)} - AP ${Number(result.effectiveAp ?? 0)} = ${Number(result.mitigation.netResistance ?? 0)}</div>`
      );
      if (Number(result.mitigation.reinforcedMax ?? 0) > 0) {
        lines.push(
          `<div><b>Reinforced:</b> ${Number(result.mitigation.reinforcedAfter ?? 0)}/${Number(result.mitigation.reinforcedMax ?? 0)}</div>`
        );
      }
    }
  }

  if (result.mode === "burnDelta") {
    const verb = result.appliedDelta >= 0 ? "Adjusted Burn +" : "Adjusted Burn -";
    lines.push(`<div><b>${verb}</b>${Math.abs(Number(result.appliedDelta ?? 0))}</div>`);
  }

  if (result.mode === "status") {
    lines.push(
      `<div><b>Status:</b> ${result.active ? "Applied" : "Removed"} ${escapeHtml(result.statusLabel ?? result.statusId ?? "Status")}</div>`
    );
  }

  lines.push(`<div><b>Target:</b> ${escapeHtml(result.actorName ?? "Actor")}</div>`);

  if (result.beforeLabel && result.afterLabel) {
    lines.push(`<div><b>Result:</b> ${escapeHtml(result.beforeLabel)} -> ${escapeHtml(result.afterLabel)}</div>`);
  }

  if (result.source) {
    lines.push(`<div><b>Source:</b> ${escapeHtml(result.source)}</div>`);
  }

  if (result.notes) {
    lines.push(`<div><b>Notes:</b> ${escapeHtml(result.notes)}</div>`);
  }

  return `<div class="mwd-gm-notice"><b>GM Harm:</b>${lines.join("")}</div>`;
}

function applyChatVisibility(chatData) {
  const rollMode = game.settings?.get?.("core", "rollMode");
  if (typeof ChatMessage.applyRollMode === "function") {
    ChatMessage.applyRollMode(chatData, rollMode);
  }
  return chatData;
}

export class HarmEngine {
  static MODE_OPTIONS = Object.freeze([
    { value: TEMPLATE.monitors.physical, label: "Physical" },
    { value: TEMPLATE.monitors.fatigue, label: "Fatigue" },
    { value: "burn", label: "Burn" },
    { value: "status", label: "Status" },
  ]);

  static supportsActor(actor, { mode = "" } = {}) {
    return modeAllowsActor(mode, actor);
  }

  static getActorOptions({ mode = "" } = {}) {
    return Array.from(game.actors ?? [])
      .filter(actor => this.supportsActor(actor, { mode }))
      .sort((left, right) => String(left.name ?? "").localeCompare(String(right.name ?? "")))
      .map(actor => ({
        id: actor.id,
        name: actor.name || "Character",
      }));
  }

  static getStatusOptions(actor = null) {
    return getToggleableStatusEffects(actor)
      .map(effect => ({
        value: effect.id,
        label: effect.label,
        active: effect.active,
      }));
  }

  static getSceneTarget({ mode = "" } = {}) {
    const controlled = Array.from(canvas?.tokens?.controlled ?? []);
    if (controlled.length > 1) {
      return { actor: null, token: null, reason: "Select only one controlled token." };
    }
    if (controlled.length === 1) {
      const tokenDoc = asTokenDocument(controlled[0]);
      const actor = getPersistentActorForToken(tokenDoc?.actor ?? null, tokenDoc);
      return this._resolveSceneTargetResult(actor, tokenDoc, { mode });
    }

    const targets = Array.from(game.user?.targets ?? []);
    if (targets.length > 1) {
      return { actor: null, token: null, reason: "Target only one token." };
    }
    if (targets.length === 1) {
      const tokenDoc = asTokenDocument(targets[0]);
      const actor = getPersistentActorForToken(tokenDoc?.actor ?? null, tokenDoc);
      return this._resolveSceneTargetResult(actor, tokenDoc, { mode });
    }

    return { actor: null, token: null, reason: "No controlled or targeted token." };
  }

  static _resolveSceneTargetResult(actor, tokenDoc, { mode = "" } = {}) {
    if (!tokenDoc || !actor) {
      return { actor: null, token: null, reason: "No controlled or targeted token." };
    }

    if (!this.supportsActor(actor, { mode })) {
      return {
        actor: null,
        token: tokenDoc,
        reason: `${actor.name || "Token actor"} is not supported by the GM harm tool.`,
      };
    }

    return {
      actor,
      token: tokenDoc,
      reason: "",
    };
  }

  static resolveTarget({ actor = null, token = null, actorId = "", preferSceneTarget = false, mode = "" } = {}) {
    const explicitToken = asTokenDocument(token);
    if (explicitToken) {
      const explicitActor = getPersistentActorForToken(explicitToken?.actor ?? actor, explicitToken);
      const resolved = this._resolveSceneTargetResult(explicitActor, explicitToken, { mode });
      if (resolved.actor) return { ...resolved, source: "token" };
    }

    if (preferSceneTarget) {
      const sceneTarget = this.getSceneTarget({ mode });
      if (sceneTarget.actor) return { ...sceneTarget, source: "scene" };
    }

    if (actor && this.supportsActor(actor, { mode })) {
      return { actor, token: explicitToken, reason: "", source: "actor" };
    }

    const fallbackActor = actorId ? game.actors?.get?.(actorId) ?? null : null;
    if (fallbackActor && this.supportsActor(fallbackActor, { mode })) {
      return { actor: fallbackActor, token: null, reason: "", source: "fallback" };
    }

    return {
      actor: null,
      token: explicitToken,
      source: null,
      reason: preferSceneTarget
        ? this.getSceneTarget({ mode }).reason || "Choose a supported target."
        : "Choose a supported target.",
    };
  }

  static async apply({ actor = null, token = null, payload = {}, options = {} } = {}) {
    const mode = String(payload?.mode ?? "").trim();
    const target = this.resolveTarget({
      actor,
      token,
      actorId: options.actorId ?? "",
      preferSceneTarget: Boolean(options.preferSceneTarget),
      mode,
    });

    if (!target.actor) {
      return { ok: false, reason: target.reason || "Choose a supported target." };
    }

    let result;
    switch (String(payload?.mode ?? "").trim()) {
      case "attackDamage":
        result = await this._applyAttackDamage(target.actor, payload, options);
        break;
      case "machineAttackDamage":
        result = await this._applyMachineAttackDamage(target.actor, target.token, payload, options);
        break;
      case "trackDelta":
        result = await this._applyTrackDelta(target.actor, payload, options);
        break;
      case "burnDelta":
        result = await this._applyBurnDelta(target.actor, payload);
        break;
      case "status":
        result = await this._applyStatus(target.actor, payload);
        break;
      default:
        return { ok: false, reason: "Unsupported harm mode." };
    }

    const finalResult = {
      ok: true,
      actor: target.actor,
      token: target.token,
      actorName: target.actor.name || "Character",
      sourceType: target.source,
      dryRun: Boolean(options.dryRun),
      ...result,
    };

    if (options.logToChat && !options.dryRun) {
      const content = buildChatContent(finalResult);
      const chatData = applyChatVisibility({
        speaker: ChatMessage.getSpeaker({ actor: target.actor, token: target.token }),
        content,
      });
      await ChatMessage.create(chatData);
    }

    if (!options.dryRun) {
      PersonalCombatTracker.renderOpenCharacterSheets?.(target.actor.id);
    }
    return finalResult;
  }

  static async _applyTrackDelta(actor, payload, options = {}) {
    // Track deltas are the lowest-level GM harm entry point. We only route
    // through armor logic when the caller explicitly asks for it.
    const track = payload?.track === TEMPLATE.monitors.fatigue
      ? TEMPLATE.monitors.fatigue
      : TEMPLATE.monitors.physical;
    const delta = normalizeHarmDelta(payload?.delta ?? payload?.amount ?? 0);
    const useArmor = Boolean(payload?.useArmor) && delta > 0;

    if (useArmor) {
      return this._applyPersonalArmorAwareDamage(actor, {
        mode: "trackDelta",
        track,
        damage: delta,
        damageType: payload?.damageType,
        ap: payload?.ap ?? 0,
        effects: payload?.effects ?? {},
        source: payload?.source,
        notes: payload?.notes,
      }, options);
    }

    const before = getMonitorValue(actor, track);
    if (!options.dryRun) {
      await Checkbars.addCounter(actor, track, delta);
    }
    const after = options.dryRun ? Math.max(0, before + delta) : getMonitorValue(actor, track);

    return {
      mode: "trackDelta",
      track,
      requestedDelta: delta,
      appliedDelta: after - before,
      usedArmor: false,
      beforeLabel: `${getHarmTrackLabel(track)} ${before}`,
      afterLabel: `${getHarmTrackLabel(track)} ${after}`,
      source: String(payload?.source ?? "").trim(),
      notes: String(payload?.notes ?? "").trim(),
    };
  }

  static async _applyBurnDelta(actor, payload) {
    const delta = normalizeHarmDelta(payload?.delta ?? payload?.amount ?? 0);
    const before = getBurnValue(actor);
    const next = Math.max(0, before + delta);
    const update = { "system.burn.value": next };
    if (next === 0 && actor.system?.burn?.overloaded) {
      update["system.burn.overloaded"] = false;
    }

    await actor.update(update);
    const after = getBurnValue(actor);

    return {
      mode: "burnDelta",
      requestedDelta: delta,
      appliedDelta: after - before,
      beforeLabel: `Burn ${before}`,
      afterLabel: `Burn ${after}`,
      source: String(payload?.source ?? "").trim(),
      notes: String(payload?.notes ?? "").trim(),
    };
  }

  static async _applyStatus(actor, payload) {
    const statusId = String(payload?.statusId ?? payload?.status ?? "").trim();
    if (!statusId) {
      return { mode: "status", statusId: "", active: false, statusLabel: "Status", beforeLabel: "", afterLabel: "" };
    }

    const before = getCurrentStatusState(actor, statusId);
    const active = Boolean(payload?.active);
    await applyManagedStatusUpdate({
      actor,
      statusId,
      active,
      metadata: {
        scope: payload?.scope,
        notes: payload?.notes,
        location: payload?.location,
        itemUuid: payload?.itemUuid,
        targetUuid: payload?.targetUuid,
        severity: payload?.severity,
      },
    });
    const after = getCurrentStatusState(actor, statusId);

    return {
      mode: "status",
      statusId,
      statusLabel: getStatusLabelFromId(statusId, actor),
      active: after,
      beforeLabel: before ? "Active" : "Inactive",
      afterLabel: after ? "Active" : "Inactive",
      source: String(payload?.source ?? "").trim(),
      notes: String(payload?.notes ?? "").trim(),
    };
  }

  static async _applyAttackDamage(actor, payload, options = {}) {
    return this._applyPersonalArmorAwareDamage(actor, {
      mode: "attackDamage",
      track: payload?.track ?? TEMPLATE.monitors.physical,
      damage: payload?.damage ?? 0,
      netHits: payload?.netHits ?? 0,
      damageType: payload?.damageType,
      ap: payload?.ap ?? 0,
      effects: payload?.effects ?? {},
      source: payload?.source,
      notes: payload?.notes,
    }, options);
  }

  static async _applyMachineAttackDamage(actor, token, payload, options = {}) {
    return applyMachineAttackDamage({ actor, token, payload, options });
  }

  static async _applyPersonalArmorAwareDamage(actor, payload, options = {}) {
    const dryRun = Boolean(options.dryRun);
    // Damage application always normalizes to one monitor track and one damage
    // type before trait hooks or armor mitigation run.
    const track = payload?.track === TEMPLATE.monitors.fatigue
      ? TEMPLATE.monitors.fatigue
      : TEMPLATE.monitors.physical;
    const baseDamage = Math.max(0, Number(payload?.damage ?? 0) || 0);
    const netHits = Math.max(0, Number(payload?.netHits ?? 0) || 0);
    const effects = payload?.effects ?? {};
    const loadout = actor.getPersonalCombatLoadout?.({ refresh: true }) ?? null;
    const activeArmor = loadout?.activeArmor ?? null;
    const armorCurrentRating = Math.max(0, Number(activeArmor?.currentArmorRating ?? activeArmor?.durability?.current ?? 0) || 0);
    const normalizedDamageType = normalizePersonalDamageType(payload?.damageType, "concussive");
    const beforeTrack = getMonitorValue(actor, track);

    let damageIncoming = baseDamage + netHits;
    const tagEffectResult = armorCurrentRating > 0
      ? applyArmorTagEffects({
          damageIncoming,
          armorTags: activeArmor?.tags ?? [],
          effects,
        })
      : { damageIncoming, applied: [] };
    damageIncoming = tagEffectResult.damageIncoming;

    const armorMitigation = computePersonalArmorMitigation({
      currentArmorRating: armorCurrentRating,
      mitigationByType: activeArmor?.mitigationByType ?? {},
      damageType: normalizedDamageType,
    });
    const effectiveAp = Math.max(
      0,
      (Number(payload?.ap ?? 0) || 0) + (Number(effects?.ap ?? 0) || 0)
    );
    const netResistance = armorMitigation.isDestroyed
      ? 0
      : Math.max(0, armorMitigation.baseMitigation + armorMitigation.typeMitigationMod - effectiveAp);
    let finalDamage = Math.max(0, Math.ceil(damageIncoming - netResistance));

    const runtime = {
      snapshot: PersonalCombatTracker.getSnapshot?.(actor) ?? null,
    };
    const damagePhase = evaluateTraitPhase({
      actor,
      phase: "onDamageResolved",
      facts: buildDamageTraitFacts({
        actor,
        packet: {
          amount: finalDamage,
          track,
          damageType: normalizedDamageType,
        },
        runtime,
      }),
      packet: {
        amount: finalDamage,
        track,
        damageType: normalizedDamageType,
      },
      options: { runtime, consumeUsage: true },
    });
    if (!dryRun) {
      await applyTraitMutations({ actor, mutations: damagePhase.mutations, runtime });
    }
    finalDamage = Math.max(0, Number(damagePhase.packet.amount ?? finalDamage) || 0);

    if (!dryRun && finalDamage > 0) {
      await Checkbars.addCounter(actor, track, finalDamage);
    }

    const armorWear = resolveArmorWearStep({
      incomingDamage: baseDamage + netHits,
      armorBefore: activeArmor?.durability?.current ?? 0,
      reinforcedBefore: activeArmor?.traitState?.reinforced?.current ?? 0,
      reinforcedMax: activeArmor?.traitState?.reinforced?.max ?? 0,
      hasArmorItem: Boolean(activeArmor?.item?.id),
    });

    if (!dryRun && Object.keys(armorWear.update).length > 0) {
      await activeArmor.item.update(armorWear.update);
    }

    const afterTrack = dryRun ? Math.max(0, beforeTrack + finalDamage) : getMonitorValue(actor, track);

    return {
      mode: payload?.mode ?? "attackDamage",
      track,
      requestedDelta: baseDamage + netHits,
      appliedDelta: afterTrack - beforeTrack,
      usedArmor: true,
      damageType: normalizedDamageType,
      effectiveAp,
      mitigation: {
        ...armorMitigation,
        netResistance,
        armorBefore: armorWear.armorBefore,
        armorAfter: armorWear.armorAfter,
        reinforcedBefore: armorWear.reinforcedBefore,
        reinforcedAfter: armorWear.reinforcedAfter,
        reinforcedMax: armorWear.reinforcedMax,
      },
      damageIncoming,
      adjustedIncoming: damageIncoming,
      finalDamage,
      tagEffectResult,
      beforeLabel: `${getHarmTrackLabel(track)} ${beforeTrack}`,
      afterLabel: `${getHarmTrackLabel(track)} ${afterTrack}`,
      source: String(payload?.source ?? "").trim(),
      notes: String(payload?.notes ?? "").trim(),
    };
  }
}

export const HARM_DAMAGE_TYPE_OPTIONS = PERSONAL_DAMAGE_TYPES;
