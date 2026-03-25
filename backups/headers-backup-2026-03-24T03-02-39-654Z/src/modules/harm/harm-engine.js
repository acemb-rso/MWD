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

function asTokenDocument(token) {
  if (!token) return null;
  return token?.document ?? token;
}

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

function normalizeDelta(value) {
  const numeric = Number(value ?? 0);
  if (!Number.isFinite(numeric)) return 0;
  return Math.trunc(numeric);
}

function getMonitorValue(actor, track) {
  return Math.max(0, Number(actor?.system?.monitors?.[track]?.value ?? 0) || 0);
}

function getBurnValue(actor) {
  return Math.max(0, Number(actor?.system?.burn?.value ?? 0) || 0);
}

function getTrackLabel(track) {
  if (track === TEMPLATE.monitors.physical) return "Physical";
  if (track === TEMPLATE.monitors.fatigue) return "Fatigue";
  return String(track ?? "").trim() || "Track";
}

function getStatusLabelFromId(statusId, actor) {
  return getToggleableStatusEffects(actor).find(effect => effect.id === statusId)?.label ?? statusId;
}

function buildChatContent(result) {
  const escapeHtml = foundry.utils.escapeHTML;
  const lines = [];

  if (result.mode === "attackDamage" || result.mode === "trackDelta") {
    const verb = result.appliedDelta >= 0 ? "Applied" : "Recovered";
    const amount = Math.abs(Number(result.appliedDelta ?? 0));
    const amountLabel = amount === 1 ? "point" : "points";
    const armorSuffix = result.usedArmor
      ? ` via armor-aware ${escapeHtml(getPersonalDamageTypeLabel(result.damageType))}`
      : "";
    lines.push(`<div><b>${verb}:</b> ${amount} ${amountLabel} to ${escapeHtml(getTrackLabel(result.track))}${armorSuffix}</div>`);

    if (result.usedArmor && result.mitigation) {
      lines.push(
        `<div><b>Mitigation:</b> base ${Number(result.mitigation.baseMitigation ?? 0)} + type ${Number(result.mitigation.typeMitigationMod ?? 0)} - AP ${Number(result.effectiveAp ?? 0)} = ${Number(result.mitigation.netResistance ?? 0)}</div>`
      );
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

  static supportsActor(actor) {
    return actor?.type === TEMPLATE.actorTypes.character;
  }

  static getActorOptions() {
    return Array.from(game.actors ?? [])
      .filter(actor => this.supportsActor(actor))
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

  static getSceneTarget() {
    const controlled = Array.from(canvas?.tokens?.controlled ?? []);
    if (controlled.length > 1) {
      return { actor: null, token: null, reason: "Select only one controlled token." };
    }
    if (controlled.length === 1) {
      const tokenDoc = asTokenDocument(controlled[0]);
      const actor = getPersistentActorForToken(tokenDoc?.actor ?? null, tokenDoc);
      return this._resolveSceneTargetResult(actor, tokenDoc);
    }

    const targets = Array.from(game.user?.targets ?? []);
    if (targets.length > 1) {
      return { actor: null, token: null, reason: "Target only one token." };
    }
    if (targets.length === 1) {
      const tokenDoc = asTokenDocument(targets[0]);
      const actor = getPersistentActorForToken(tokenDoc?.actor ?? null, tokenDoc);
      return this._resolveSceneTargetResult(actor, tokenDoc);
    }

    return { actor: null, token: null, reason: "No controlled or targeted token." };
  }

  static _resolveSceneTargetResult(actor, tokenDoc) {
    if (!tokenDoc || !actor) {
      return { actor: null, token: null, reason: "No controlled or targeted token." };
    }

    if (!this.supportsActor(actor)) {
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

  static resolveTarget({ actor = null, token = null, actorId = "", preferSceneTarget = false } = {}) {
    const explicitToken = asTokenDocument(token);
    if (explicitToken) {
      const explicitActor = getPersistentActorForToken(explicitToken?.actor ?? actor, explicitToken);
      const resolved = this._resolveSceneTargetResult(explicitActor, explicitToken);
      if (resolved.actor) return { ...resolved, source: "token" };
    }

    if (preferSceneTarget) {
      const sceneTarget = this.getSceneTarget();
      if (sceneTarget.actor) return { ...sceneTarget, source: "scene" };
    }

    if (actor && this.supportsActor(actor)) {
      return { actor, token: explicitToken, reason: "", source: "actor" };
    }

    const fallbackActor = actorId ? game.actors?.get?.(actorId) ?? null : null;
    if (fallbackActor && this.supportsActor(fallbackActor)) {
      return { actor: fallbackActor, token: null, reason: "", source: "fallback" };
    }

    return {
      actor: null,
      token: explicitToken,
      source: null,
      reason: preferSceneTarget
        ? this.getSceneTarget().reason || "Choose a supported character target."
        : "Choose a supported character target.",
    };
  }

  static async apply({ actor = null, token = null, payload = {}, options = {} } = {}) {
    const target = this.resolveTarget({
      actor,
      token,
      actorId: options.actorId ?? "",
      preferSceneTarget: Boolean(options.preferSceneTarget),
    });

    if (!target.actor) {
      return { ok: false, reason: target.reason || "Choose a supported character target." };
    }

    let result;
    switch (String(payload?.mode ?? "").trim()) {
      case "attackDamage":
        result = await this._applyAttackDamage(target.actor, payload);
        break;
      case "trackDelta":
        result = await this._applyTrackDelta(target.actor, payload);
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
      ...result,
    };

    if (options.logToChat) {
      const content = buildChatContent(finalResult);
      const chatData = applyChatVisibility({
        speaker: ChatMessage.getSpeaker({ actor: target.actor, token: target.token }),
        content,
      });
      await ChatMessage.create(chatData);
    }

    PersonalCombatTracker.renderOpenCharacterSheets?.(target.actor.id);
    return finalResult;
  }

  static async _applyTrackDelta(actor, payload) {
    const track = payload?.track === TEMPLATE.monitors.fatigue
      ? TEMPLATE.monitors.fatigue
      : TEMPLATE.monitors.physical;
    const delta = normalizeDelta(payload?.delta ?? payload?.amount ?? 0);
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
      });
    }

    const before = getMonitorValue(actor, track);
    await Checkbars.addCounter(actor, track, delta);
    const after = getMonitorValue(actor, track);

    return {
      mode: "trackDelta",
      track,
      requestedDelta: delta,
      appliedDelta: after - before,
      usedArmor: false,
      beforeLabel: `${getTrackLabel(track)} ${before}`,
      afterLabel: `${getTrackLabel(track)} ${after}`,
      source: String(payload?.source ?? "").trim(),
      notes: String(payload?.notes ?? "").trim(),
    };
  }

  static async _applyBurnDelta(actor, payload) {
    const delta = normalizeDelta(payload?.delta ?? payload?.amount ?? 0);
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
    await applyManagedStatusUpdate({ actor, statusId, active });
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

  static async _applyAttackDamage(actor, payload) {
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
    });
  }

  static async _applyPersonalArmorAwareDamage(actor, payload) {
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
    const finalDamage = Math.max(0, Math.ceil(damageIncoming - netResistance));

    if (finalDamage > 0) {
      await Checkbars.addCounter(actor, track, finalDamage);
    }

    const armorBefore = Math.max(0, Number(activeArmor?.durability?.current ?? 0) || 0);
    let armorAfter = armorBefore;
    if (baseDamage + netHits > 0 && activeArmor?.item?.id) {
      armorAfter = Math.max(0, armorBefore - 1);
      if (armorAfter !== armorBefore) {
        await activeArmor.item.update({ "system.durability.current": armorAfter });
      }
    }

    const afterTrack = getMonitorValue(actor, track);

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
        armorBefore,
        armorAfter,
      },
      damageIncoming,
      adjustedIncoming: damageIncoming,
      finalDamage,
      tagEffectResult,
      beforeLabel: `${getTrackLabel(track)} ${beforeTrack}`,
      afterLabel: `${getTrackLabel(track)} ${afterTrack}`,
      source: String(payload?.source ?? "").trim(),
      notes: String(payload?.notes ?? "").trim(),
    };
  }
}

export const HARM_DAMAGE_TYPE_OPTIONS = PERSONAL_DAMAGE_TYPES;
