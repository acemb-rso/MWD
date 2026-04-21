// src/modules/combat/personal-combat-tracker.js
// Purpose: Registers Foundry hooks: updateCombat, updateCombatant, createCombatant.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { humanizeStatusKey } from "../dialog/token-status-dialog.js";
import {
  getCommonCheckDefinition,
  getCommonCheckPayload
} from "../roll/config/common-checks.js";
import {
  applyTraitMutations,
  buildActionCostTraitFacts,
  buildBurnTraitFacts,
  buildEndOfActivationTraitFacts,
  evaluateTraitPhase,
} from "../mwd/traits.js";
import {
  getPersonalAction,
  getPersonalActionsByCategory,
  PERSONAL_ACTION_CATEGORIES,
} from "./personal-action-catalog.js";
import {
  EXPOSURE_TIERS,
  getExposureIndex,
  getExposureLabel,
  getRaisedExposureTier,
  getReducedExposureTier,
  normalizeExposureTier,
  scaleDamageByExposure,
} from "../area-effects/area-effect-engine.js";
import {
  getHazardRegionFlag,
  getHazardRegionsForToken,
  migrateHazardRegionFlag,
} from "../area-effects/hazard-regions.js";
import { renderHazardCard } from "../area-effects/hazard-chat.js";
import { resolveBattlemechPendingHeat } from "../mwd/machine-heat.js";
import { buildMachineActivationStartReport, isMachineActor } from "../mwd/machine-crit-effects.js";
import { getBattlemechUsedWeaponGroupIds, markBattlemechWeaponGroupUsed } from "../mwd/battlemech-weapon-groups.js";

const FLAG_SCOPE = "mwd";
const FLAG_KEY = "personalCombat";
const PREPARED_INTERRUPT_STATUS_ID = "preparedInterrupt";
const PREPARED_INTERRUPT_ICON = "systems/mwd/img/icons/status/readied_action.svg";

const BASE_SA = 3;
const BASE_FA = 1;
const BASE_RA = 1;

function sameActivation(state, activation) {
  if (!state?.activation || !activation) return false;
  return state.activation.combatId === activation.combatId
    && Number(state.activation.round ?? -1) === Number(activation.round ?? -1)
    && Number(state.activation.turn ?? -1) === Number(activation.turn ?? -1)
    && state.activation.combatantId === activation.combatantId;
}

function defaultState(activation = null) {
  return {
    saRemaining: BASE_SA,
    faRemaining: BASE_FA,
    raRemaining: BASE_RA,
    saSpentThisActivation: 0,
    burnThisActivation: 0,
    attacksThisActivation: 0,
    reactionBurnSinceLastActivation: 0,
    traitUsage: {
      activation: {},
      round: {}
    },
    actionState: {
      aim: null,
      move: null,
      preparedInterrupt: null,
      usedWeaponGroupIds: []
    },
    hazards: {},
    pendingReaction: null,
    machineCritsProcessed: false,
    actionLog: [],
    activation
  };
}

function cloneState(state, activation = null) {
  return foundry.utils.mergeObject(
    defaultState(activation),
    foundry.utils.deepClone(state ?? {}),
    { inplace: false, overwrite: true }
  );
}

function cloneStoredState(stored, fallbackActivation = null) {
  const state = cloneState(stored ?? {}, stored?.activation ?? fallbackActivation);
  state.actionLog = normalizeActionLog(state.actionLog);
  state.hazards = normalizeHazardStates(state.hazards);
  state.pendingReaction = normalizePendingReaction(state.pendingReaction);
  return state;
}

function normalizeHazardStates(value) {
  if (!value || typeof value !== "object") return {};

  return Object.fromEntries(
    Object.entries(value)
      .map(([regionId, state]) => {
        const key = String(regionId ?? "").trim();
        if (!key || !state || typeof state !== "object") return null;
        return [key, {
          tier: normalizeExposureTier(state.tier, EXPOSURE_TIERS.none),
          turnsExposed: Math.max(0, Number(state.turnsExposed ?? 0) || 0),
          evadeLocked: Boolean(state.evadeLocked),
          lastProcessedRound: Number(state.lastProcessedRound ?? 0) || 0,
        }];
      })
      .filter(Boolean)
  );
}

function normalizePendingReaction(value) {
  if (!value || typeof value !== "object") return null;

  const type = String(value.type ?? "").trim();
  if (!type) return null;

  return {
    type,
    sourceKind: String(value.sourceKind ?? "").trim() || null,
    sourceId: String(value.sourceId ?? "").trim() || null,
    messageId: String(value.messageId ?? "").trim() || null,
    resultIndex: Number.isInteger(Number(value.resultIndex)) ? Number(value.resultIndex) : null,
    exposureBefore: normalizeExposureTier(value.exposureBefore, EXPOSURE_TIERS.none),
    exposureAfterPreview: normalizeExposureTier(value.exposureAfterPreview, EXPOSURE_TIERS.none),
    edgePoolKey: String(value.edgePoolKey ?? "").trim() || null,
    allowCurrentTurn: Boolean(value.allowCurrentTurn),
  };
}

function normalizeActionLog(entries) {
  if (!Array.isArray(entries)) return [];

  return entries
    .map(entry => {
      const label = String(entry?.label ?? "").trim();
      if (!label) return null;

      return {
        id: String(entry?.id ?? "").trim(),
        label,
        costLabel: String(entry?.costLabel ?? "").trim()
      };
    })
    .filter(Boolean);
}

function filterReactionActionLog(entries = []) {
  return normalizeActionLog(entries).filter(entry => {
    const action = getPersonalAction(entry?.id);
    return action?.category === PERSONAL_ACTION_CATEGORIES.reaction;
  });
}

function nextActivationState(stored = null, activation = null) {
  const state = defaultState(activation);
  state.reactionBurnSinceLastActivation = Math.max(0, Number(stored?.reactionBurnSinceLastActivation ?? 0) || 0);
  state.actionLog = filterReactionActionLog(stored?.actionLog);
  state.hazards = normalizeHazardStates(stored?.hazards);
  return state;
}

function cloneWritableSnapshotState(snapshot = null) {
  return cloneStoredState(snapshot?.state, snapshot?.state?.activation ?? null);
}

function actionCostLabel(resource, cost) {
  if (resource === "free") return "Free";
  if (resource === "burn") return `+${cost} Burn`;
  return `${cost} ${String(resource).toUpperCase()}`;
}

function mergeActionState(state = {}, actionId = "", { snapshot = null, metadata = {} } = {}) {
  const nextState = foundry.utils.deepClone(state ?? {});
  nextState.actionState ??= {};
  const stamp = {
    actionId,
    round: Number(snapshot?.combat?.round ?? 0),
    turn: Number(snapshot?.combat?.turn ?? 0),
    combatantId: snapshot?.combatant?.id ?? null
  };

  if (actionId === "aim") {
    nextState.actionState.aim = {
      ...stamp,
      target: snapshot?.targeting?.target ?? null
    };
  }

  if (actionId === "move") {
    nextState.actionState.move = {
      ...stamp,
      moved: true
    };
  }

  if (actionId === "prepare") {
    nextState.actionState.preparedInterrupt = {
      ...stamp,
      condition: String(metadata?.condition ?? "").trim(),
      scope: String(metadata?.scope ?? "").trim()
    };
  }

  return nextState;
}

function getPreparedInterrupt(state = {}) {
  const prepared = state?.actionState?.preparedInterrupt ?? null;
  if (!prepared) return null;

  const condition = String(prepared?.condition ?? "").trim();
  const scope = String(prepared?.scope ?? "").trim();
  if (!condition && !scope) return null;

  return {
    ...prepared,
    condition,
    scope
  };
}

function buildPreparedInterruptHint(preparedInterrupt = null) {
  if (!preparedInterrupt) return "";

  const parts = [];
  if (preparedInterrupt.condition) parts.push(`Trigger: ${preparedInterrupt.condition}`);
  if (preparedInterrupt.scope) parts.push(`Scope: ${preparedInterrupt.scope}`);
  return parts.join(" | ");
}

function getPreparedInterruptStatusConfig() {
  return (CONFIG.statusEffects ?? []).find(effect => String(effect?.id ?? "").trim() === PREPARED_INTERRUPT_STATUS_ID) ?? {
    id: PREPARED_INTERRUPT_STATUS_ID,
    name: "Prepared",
    icon: PREPARED_INTERRUPT_ICON
  };
}

function statusLabelFromConfig(statusId) {
  const effect = (CONFIG.statusEffects ?? []).find(it => String(it?.id ?? "").trim() === statusId);
  const raw = String(effect?.name ?? effect?.label ?? statusId ?? "").trim();
  return humanizeStatusKey(raw);
}

function formatSignedValue(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric === 0) return "0";
  return numeric > 0 ? `+${numeric}` : String(numeric);
}

function parseModifierValue(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;

  const match = String(value ?? "").trim().match(/[-+]?\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function getTokenCenter(token) {
  const tokenDoc = token?.document ?? token ?? null;
  const tokenObject = token?.object ?? tokenDoc?.object ?? token ?? null;
  const tokenId = String(tokenDoc?.id ?? "").trim();
  const pendingPosition = PersonalCombatTracker._pendingTokenPositions.get(tokenId) ?? null;
  const x = Number(pendingPosition?.x ?? tokenDoc?.x);
  const y = Number(pendingPosition?.y ?? tokenDoc?.y);

  if (tokenObject && Number.isFinite(x) && Number.isFinite(y)) {
    if (typeof tokenObject.getCenterPoint === "function") {
      return tokenObject.getCenterPoint({ x, y });
    }
    if (typeof tokenObject.getCenter === "function") {
      return tokenObject.getCenter(x, y);
    }
  }

  return tokenObject?.center ?? tokenDoc?.object?.center ?? null;
}

function formatDistanceLabel(distance, units = "") {
  if (!Number.isFinite(distance)) return "";

  const rounded = Math.round(distance * 10) / 10;
  const value = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  return units ? `${value} ${units}` : value;
}

function applyChatVisibility(chatData) {
  const rollMode = game.settings?.get?.("core", "rollMode");
  if (typeof ChatMessage.applyRollMode === "function") {
    ChatMessage.applyRollMode(chatData, rollMode);
  }
  return chatData;
}

function isHazardRegionDocument(region) {
  return Boolean(getHazardRegionFlag(region));
}

function buildHazardOverlayText(hazards = []) {
  const entries = Array.isArray(hazards) ? hazards.filter(Boolean) : [];
  if (!entries.length) return "";

  const highest = entries
    .slice()
    .sort((left, right) => getExposureIndex(right?.tier) - getExposureIndex(left?.tier))[0] ?? null;
  if (!highest) return "";

  const label = `HAZARD ${getExposureLabel(highest.tier)} (${Math.max(0, Number(highest.turnsExposed ?? 0) || 0)})`;
  return highest.evadeLocked ? `${label} LOCK` : label;
}

export class PersonalCombatTracker {
  static _targetRefreshTimeout = null;
  static _pendingTokenPositions = new Map();
  static _lastActivationByCombat = new Map();

  static init() {
    Hooks.on("updateCombat", (combat, changed) => this._onUpdateCombat(combat, changed));
    Hooks.on("updateCombatant", (combatant, changed) => this._onUpdateCombatant(combatant, changed));
    Hooks.on("updateToken", (tokenDocument, changed) => this._onUpdateToken(tokenDocument, changed));
    Hooks.on("refreshToken", token => this._onRefreshToken(token));
    Hooks.on("createCombatant", combatant => this._onCreateCombatant(combatant));
    Hooks.on("deleteCombatant", combatant => this._onDeleteCombatant(combatant));
    Hooks.on("deleteCombat", combat => this._onDeleteCombat(combat));
    Hooks.on("createRegion", region => this._onCreateRegion(region));
    Hooks.on("updateRegion", region => this._onUpdateRegion(region));
    Hooks.on("deleteRegion", region => this._onDeleteRegion(region));
    Hooks.on("targetToken", (user, token, targeted) => this._onTargetToken(user, token, targeted));

    for (const key of ["TOKEN_ENTER", "TOKEN_EXIT", "TOKEN_MOVE_IN", "TOKEN_MOVE_OUT"]) {
      const hookName = CONST?.REGION_EVENTS?.[key];
      if (!hookName) continue;
      Hooks.on(hookName, (...args) => this._onRegionTokenEvent(...args));
    }
  }

  static async onReady() {
    await this.ensureCurrentCombatantState();
    await this.syncPreparedIndicators();
    await this._syncAllSceneHazards();
    await this._processCurrentCombatantMachineCrits();
    if (game.combat?.id) {
      this._lastActivationByCombat.set(
        game.combat.id,
        this.getActivationIdentity(game.combat, game.combat.combatant)
      );
    }
    this.renderOpenActorSheets();
  }

  static _asTokenDocument(token) {
    if (!token) return null;
    return token?.document ?? token;
  }

  static _getTokenSceneId(token) {
    const tokenDoc = this._asTokenDocument(token);
    return tokenDoc?.parent?.id
      ?? tokenDoc?.scene?.id
      ?? tokenDoc?.object?.scene?.id
      ?? null;
  }

  static _getSceneTokenDocumentById(tokenId, sceneId = canvas?.scene?.id) {
    const normalizedId = String(tokenId ?? "").trim();
    if (!normalizedId || !sceneId) return null;

    const scene = canvas?.scene?.id === sceneId
      ? canvas.scene
      : game.scenes?.get?.(sceneId);

    return scene?.tokens?.get?.(normalizedId) ?? null;
  }

  static _getCombatantTokenDocument(combatant, sceneId = canvas?.scene?.id) {
    const tokenDoc = this._asTokenDocument(combatant?.token);
    if (tokenDoc && typeof tokenDoc === "object") return tokenDoc;
    return this._getSceneTokenDocumentById(this._getCombatantTokenId(combatant), sceneId);
  }

  static _getCombatantTokenId(combatant) {
    return String(
      combatant?.tokenId
      ?? combatant?.token?.id
      ?? combatant?.token?._id
      ?? combatant?.token?.document?.id
      ?? combatant?._source?.tokenId
      ?? ""
    ).trim();
  }

  static _getCombatantActorId(combatant) {
    const tokenDoc = this._asTokenDocument(combatant?.token);
    return String(
      combatant?.actorId
      ?? combatant?.actor?.id
      ?? combatant?._source?.actorId
      ?? tokenDoc?.actorId
      ?? tokenDoc?.actor?.id
      ?? tokenDoc?.baseActor?.id
      ?? ""
    ).trim();
  }

  static _getCombatants(combat) {
    if (!combat?.combatants) return [];
    if (typeof combat.combatants.values === "function") return Array.from(combat.combatants.values());
    return Array.from(combat.combatants ?? []);
  }

  static _getCombatSceneId(combat) {
    return String(
      combat?.scene?.id
      ?? combat?.sceneId
      ?? combat?._source?.scene
      ?? combat?._source?.sceneId
      ?? ""
    ).trim();
  }

  static _getCombatantSceneId(combatant) {
    const tokenDoc = this._asTokenDocument(combatant?.token);
    return String(
      combatant?.sceneId
      ?? combatant?._source?.sceneId
      ?? tokenDoc?.parent?.id
      ?? tokenDoc?.scene?.id
      ?? tokenDoc?.object?.scene?.id
      ?? ""
    ).trim();
  }

  static _findCombatantForToken(combat, tokenDoc = null, sceneId = canvas?.scene?.id) {
    const resolvedTokenDoc = this._asTokenDocument(tokenDoc);
    const tokenId = String(resolvedTokenDoc?.id ?? "").trim();
    if (!combat || !tokenId) return null;

    if (resolvedTokenDoc?.combatant?.combat?.id === combat.id) return resolvedTokenDoc.combatant;

    let direct = null;
    if (typeof combat.getCombatantsByToken === "function") {
      try {
        direct = combat.getCombatantsByToken(tokenId)?.[0] ?? null;
      } catch (_error) {
        direct = null;
      }
    } else if (typeof combat.getCombatantByToken === "function") {
      try {
        direct = combat.getCombatantByToken(tokenId) ?? null;
      } catch (_error) {
        direct = null;
      }
    }
    if (direct) return direct;

    return this._getCombatants(combat).find(combatant => {
      const combatantTokenDoc = this._getCombatantTokenDocument(combatant, sceneId);
      const combatantTokenId = this._getCombatantTokenId(combatant) || String(combatantTokenDoc?.id ?? "").trim();
      const combatantSceneId = this._getCombatantSceneId(combatant) || sceneId;
      return combatantTokenId === tokenId && (!sceneId || !combatantSceneId || combatantSceneId === sceneId);
    }) ?? null;
  }

  static _collectActorIds(actor, tokenDoc = null) {
    const ids = new Set();
    const add = value => {
      const normalized = String(value ?? "").trim();
      if (normalized) ids.add(normalized);
    };

    add(actor?.id);
    add(actor?._id);

    const resolvedTokenDoc = this._asTokenDocument(tokenDoc) ?? this._asTokenDocument(actor?.token);
    add(resolvedTokenDoc?.actor?.id);
    add(resolvedTokenDoc?.baseActor?.id);
    add(resolvedTokenDoc?.actorId);

    return ids;
  }

  static _tokenDocumentMatchesActor(tokenDoc, actor, actorIds = null) {
    const resolvedTokenDoc = this._asTokenDocument(tokenDoc);
    if (!resolvedTokenDoc || !actor) return false;

    const ids = actorIds ?? this._collectActorIds(actor, resolvedTokenDoc);
    return [
      resolvedTokenDoc?.actor?.id,
      resolvedTokenDoc?.baseActor?.id,
      resolvedTokenDoc?.actorId
    ].some(value => ids.has(String(value ?? "").trim()));
  }

  static getPreferredTokenDocument(actor) {
    if (!actor) return null;

    const actorTokenDoc = this._asTokenDocument(actor?.token);
    if (actorTokenDoc) return actorTokenDoc;

    const activeTokens = actor.getActiveTokens?.(true, true) ?? [];
    return activeTokens[0]?.document ?? null;
  }

  static getPreferredToken(actor) {
    const tokenDoc = this.getPreferredTokenDocument(actor);
    if (!tokenDoc) return null;
    return tokenDoc.object ?? this._getSceneTokenById(tokenDoc.id);
  }

  static getCurrentSceneTokenDocument(actor, token = null) {
    const sceneId = canvas?.scene?.id;
    const explicitTokenDoc = this._asTokenDocument(token);
    if (this._getTokenSceneId(explicitTokenDoc) === sceneId) return explicitTokenDoc;

    const explicitTokenId = String(explicitTokenDoc?.id ?? token?.id ?? "").trim();
    if (explicitTokenId) {
      const sceneTokenDoc = this._getSceneTokenDocumentById(explicitTokenId, sceneId);
      if (sceneTokenDoc) return sceneTokenDoc;
    }

    const preferredTokenDoc = this.getPreferredTokenDocument(actor);
    if (this._getTokenSceneId(preferredTokenDoc) === sceneId) return preferredTokenDoc;

    const preferredTokenId = String(preferredTokenDoc?.id ?? "").trim();
    if (preferredTokenId) {
      const sceneTokenDoc = this._getSceneTokenDocumentById(preferredTokenId, sceneId);
      if (sceneTokenDoc) return sceneTokenDoc;
    }

    const activeTokens = actor?.getActiveTokens?.(true, true) ?? [];
    const activeTokenDoc = activeTokens.find(it => it?.document?.parent?.id === sceneId)?.document ?? null;
    if (activeTokenDoc) return activeTokenDoc;

    const sceneTokens = Array.from(canvas?.scene?.tokens ?? []);
    const actorIds = this._collectActorIds(actor, preferredTokenDoc);
    const matchingTokens = sceneTokens.filter(tokenDoc => this._tokenDocumentMatchesActor(tokenDoc, actor, actorIds));
    const activeMatchingToken = matchingTokens.find(tokenDoc => tokenDoc?.combatant?.id === game.combat?.combatant?.id) ?? null;

    return activeMatchingToken ?? matchingTokens[0] ?? null;
  }

  static getCurrentSceneToken(actor, token = null) {
    const tokenDoc = this.getCurrentSceneTokenDocument(actor, token);
    if (!tokenDoc) return null;
    return tokenDoc.object ?? this._getSceneTokenById(tokenDoc.id);
  }

  static _getSceneTokenById(tokenId) {
    if (!tokenId) return null;
    return canvas?.tokens?.get?.(tokenId)
      ?? canvas?.tokens?.placeables?.find(token => token.id === tokenId)
      ?? null;
  }

  static _measureTokenDistance(sourceToken, targetToken) {
    const grid = canvas?.grid;
    const source = getTokenCenter(sourceToken);
    const target = getTokenCenter(targetToken);

    if (!grid || !source || !target) return null;

    if (typeof grid.measurePath === "function") {
      try {
        const measurement = grid.measurePath([source, target], { gridSpaces: true });
        const distance = Number(
          measurement?.distance
          ?? measurement?.cost
          ?? measurement?.totalDistance
          ?? measurement?.totalCost
          ?? NaN
        );
        if (Number.isFinite(distance)) return distance;
      } catch (_error) {
        // Fall through to legacy API.
      }
    }

    // Legacy fallback for Foundry < v12
    const RayCtor = foundry?.canvas?.geometry?.Ray ?? globalThis.Ray;
    if (typeof grid.measureDistances === "function" && typeof RayCtor === "function") {
      try {
        const distances = grid.measureDistances([{ ray: new RayCtor(source, target) }], { gridSpaces: true });
        const distance = Number(Array.isArray(distances) ? distances[0] : NaN);
        if (Number.isFinite(distance)) return distance;
      } catch (_error) {
        return null;
      }
    }

    return null;
  }

  static getUserTargetTokens(user = game.user) {
    const targetIds = Array.isArray(user?.targets?.ids) ? user.targets.ids : [];
    const targetsById = targetIds
      .map(id => this._getSceneTokenById(id))
      .filter(Boolean);

    if (targetsById.length) return targetsById;

    return Array.from(user?.targets ?? [])
      .map(token => token?.object ?? token)
      .filter(Boolean);
  }

  static getTargetingSnapshot(sourceToken = null, user = game.user) {
    const targets = this.getUserTargetTokens(user);
    const count = targets.length;

    if (count === 0) {
      return {
        count: 0,
        none: true,
        single: false,
        multiple: false,
        heading: "Target",
        primaryLabel: "No target selected",
        detailRows: [],
        target: null
      };
    }

    if (count > 1) {
      return {
        count,
        none: false,
        single: false,
        multiple: true,
        heading: "Targets",
        primaryLabel: `${count} selected`,
        detailRows: [],
        target: null
      };
    }

    const targetToken = targets[0];
    const distance = this._measureTokenDistance(sourceToken, targetToken);
    const units = String(canvas?.scene?.grid?.units ?? game.system?.grid?.units ?? "").trim();
    const distanceLabel = formatDistanceLabel(distance, units);
    const name = String(targetToken?.name ?? targetToken?.actor?.name ?? "Target").trim() || "Target";

    return {
      count,
      none: false,
      single: true,
      multiple: false,
      heading: "Target",
      primaryLabel: name,
      detailRows: distanceLabel ? [{ label: "Distance", value: distanceLabel }] : [],
      target: {
        id: targetToken?.id ?? null,
        name,
        img: targetToken?.document?.texture?.src ?? targetToken?.texture?.src ?? "",
        distance: Number.isFinite(distance) ? distance : null,
        distanceLabel
      }
    };
  }

  static getRollImpact(modifiers = []) {
    const entries = (Array.isArray(modifiers) ? modifiers : []).map(entry => {
      const numericValue = parseModifierValue(entry?.numericValue ?? entry?.value ?? 0);
      return {
        label: String(entry?.label ?? "").trim() || "Modifier",
        numericValue,
        value: String(entry?.value ?? formatSignedValue(numericValue)).trim() || formatSignedValue(numericValue)
      };
    });

    const total = entries.reduce((sum, entry) => sum + entry.numericValue, 0);
    return {
      total,
      totalLabel: formatSignedValue(total),
      entries
    };
  }

  static getCombat(actor, token = null) {
    const sceneId = canvas?.scene?.id;
    const combat = game.combat;
    const combatSceneId = this._getCombatSceneId(combat);
    const explicitTokenDoc = this._asTokenDocument(token);
    const hasExplicitToken = !!explicitTokenDoc;
    const preferredSceneTokenDoc = this.getCurrentSceneTokenDocument(actor, token);
    const preferredSceneToken = preferredSceneTokenDoc?.object
      ?? this._getSceneTokenById(preferredSceneTokenDoc?.id ?? null);

    if (!combat || (combatSceneId && sceneId && combatSceneId !== sceneId)) {
      return {
        combat: null,
        combatant: null,
        token: preferredSceneToken,
        tokenDocument: preferredSceneTokenDoc
      };
    }

    let combatant = this._findCombatantForToken(combat, preferredSceneTokenDoc, sceneId);

    const combatants = this._getCombatants(combat);
    if (!combatant) {
      const actorIds = this._collectActorIds(actor, preferredSceneTokenDoc);
      const preferredSceneTokenId = String(preferredSceneTokenDoc?.id ?? "").trim();
      const matchingCombatants = combatants.filter(it => {
        const tokenId = this._getCombatantTokenId(it);
        const combatantTokenDoc = this._getCombatantTokenDocument(it, sceneId);
        const combatantTokenId = tokenId || String(combatantTokenDoc?.id ?? "").trim();
        if (hasExplicitToken && preferredSceneTokenId) return combatantTokenId === preferredSceneTokenId;
        if (actorIds.has(this._getCombatantActorId(it))) return true;

        return this._tokenDocumentMatchesActor(combatantTokenDoc, actor, actorIds);
      });

      const activeMatchingCombatant = matchingCombatants.find(it => it.id === combat?.combatant?.id) ?? null;
      const preferredTokenCombatant = matchingCombatants.find(it =>
        preferredSceneTokenId
        && (
          this._getCombatantTokenId(it)
          || String(this._getCombatantTokenDocument(it, sceneId)?.id ?? "").trim()
        ) === preferredSceneTokenId
      ) ?? null;

      combatant = preferredTokenCombatant
        ?? activeMatchingCombatant
        ?? matchingCombatants[0]
        ?? null;
    }

    const combatantTokenDoc = this._getCombatantTokenDocument(combatant, sceneId);
    const resolvedTokenDoc = preferredSceneTokenDoc ?? combatantTokenDoc ?? null;
    const resolvedToken = preferredSceneToken
      ?? combatantTokenDoc?.object
      ?? this._getSceneTokenById(this._getCombatantTokenId(combatant))
      ?? null;

    return {
      combat,
      combatant,
      token: resolvedToken,
      tokenDocument: resolvedTokenDoc
    };
  }

  static getSnapshot(actor, { token = null } = {}) {
    const {
      combat,
      combatant,
      token: resolvedToken,
      tokenDocument
    } = this.getCombat(actor, token);
    const isCurrentTurn = !!combatant && combat?.combatant?.id === combatant.id;
    const activation = combatant ? this.getActivationIdentity(combat, combatant) : null;
    const stored = combatant ? combatant.getFlag(FLAG_SCOPE, FLAG_KEY) : null;
    const state = combatant
      ? (isCurrentTurn
        ? (sameActivation(stored, activation) ? cloneStoredState(stored, activation) : nextActivationState(stored, activation))
        : cloneStoredState(stored, activation))
      : defaultState(activation);
    state.actionLog = normalizeActionLog(state.actionLog);

    const burnValue = Math.max(0, Number(actor?.system?.burn?.value ?? 0));
    const burnPenalty = Math.floor(burnValue / 2);
    const overloaded = !!actor?.system?.burn?.overloaded;
    const preparedInterrupt = getPreparedInterrupt(state);
    const statuses = this.getActiveStatuses(actor);
    const effects = statuses.filter(status =>
      !(overloaded && status.id === "overloaded")
      && status.id !== PREPARED_INTERRUPT_STATUS_ID
    );
    const modifierSummary = this.getModifierSummary(actor, burnPenalty);
    const rollImpact = this.getRollImpact(modifierSummary);
    const burnThisActivation = Math.max(0, Number(state.burnThisActivation ?? 0));
    const reason = !combatant
      ? "No combatant on the current scene."
      : !isCurrentTurn
        ? "Waiting for this combatant's activation."
        : "";
    const states = [];
    if (overloaded) {
      states.push({ id: "overloaded", label: "Overloaded" });
    }
    if (preparedInterrupt) {
      states.push({
        id: "preparedInterrupt",
        label: "Prepared",
        hint: buildPreparedInterruptHint(preparedInterrupt)
      });
    }
    const hazardEntries = Object.entries(state.hazards ?? {});
    if (hazardEntries.length) {
      const highest = hazardEntries
        .map(([, hazardState]) => hazardState)
        .sort((left, right) => getExposureIndex(right?.tier) - getExposureIndex(left?.tier))[0] ?? null;
      if (highest) {
        states.push({
          id: "hazard",
          label: `Hazard ${getExposureLabel(highest.tier)}`,
          hint: `${hazardEntries.length} active hazard${hazardEntries.length === 1 ? "" : "s"}`
        });
      }
    }

    return {
      token: resolvedToken,
      tokenDocument,
      combat,
      combatant,
      hasCombatant: !!combatant,
      isCurrentTurn,
      overloaded,
      burn: {
        value: burnValue,
        penalty: burnPenalty,
        canOverloadCheck: burnValue >= 6 && !overloaded
      },
      state,
      hazards: state.hazards ?? {},
      pendingReaction: state.pendingReaction ?? null,
      preparedInterrupt,
      targeting: this.getTargetingSnapshot(resolvedToken),
      states,
      effects,
      statuses,
      rollImpact,
      summaryText: `SA: ${state.saRemaining} / ${BASE_SA}   FA: ${state.faRemaining}   RA: ${state.raRemaining}`,
      activation: {
        burnThisActivation,
        burnThisActivationLabel: `+${burnThisActivation}`,
        items: [
          { label: "SA", value: `${state.saRemaining}/${BASE_SA}` },
          { label: "FA", value: String(state.faRemaining) },
          { label: "RA", value: String(state.raRemaining) },
          { label: "Burn", value: `+${burnThisActivation}`, detail: "this activation" }
        ]
      },
      inactiveReason: reason,
      modifierSummary
    };
  }

  static getAvailableReactionEdgePools(actor) {
    if (!actor?.hasEdgePools?.()) return [];
    return (actor.getEdgePoolSummary?.().pools ?? [])
      .filter(pool => Number(pool?.effectiveValue ?? 0) > 0)
      .map(pool => ({
        key: String(pool.key ?? "").trim(),
        label: String(pool.key ?? "").trim(),
        value: Number(pool.effectiveValue ?? 0),
      }))
      .filter(pool => pool.key);
  }

  static getReactionSpendPreview(actor, { token = null, edgePoolKey = "" } = {}) {
    const snapshot = this.getSnapshot(actor, { token });
    const usesReaction = Number(snapshot.state?.raRemaining ?? 0) > 0;
    const edgePools = this.getAvailableReactionEdgePools(actor);
    const normalizedEdgePoolKey = String(edgePoolKey ?? "").trim();
    const canSpendEdge = !usesReaction && edgePools.some(pool => pool.key === normalizedEdgePoolKey);
    const burnDelta = usesReaction ? 0 : (canSpendEdge ? 0 : 2);

    return {
      snapshot,
      usesReaction,
      burnDelta,
      canSpendEdge: !usesReaction && edgePools.length > 0,
      edgePools,
      edgePoolKey: canSpendEdge ? normalizedEdgePoolKey : null,
      costLabel: usesReaction
        ? "1 RA"
        : (canSpendEdge ? `1 Edge (${normalizedEdgePoolKey})` : "+2 Burn"),
    };
  }

  static async commitReactionSpend(actor, {
    token = null,
    actionId = "",
    actionLabel = "",
    actionCategory = PERSONAL_ACTION_CATEGORIES.reaction,
    logLabel = "",
    edgePoolKey = "",
    allowCurrentTurn = false,
  } = {}) {
    const preview = this.getReactionSpendPreview(actor, { token, edgePoolKey });
    const snapshot = preview.snapshot;
    if (!snapshot.hasCombatant) return { ok: false, reason: "No combatant on the current scene." };
    if (!allowCurrentTurn && snapshot.isCurrentTurn) return { ok: false, reason: "Only outside your activation." };

    const nextState = cloneWritableSnapshotState(snapshot);
    const runtime = {
      combat: snapshot.combat,
      combatant: snapshot.combatant,
      state: nextState,
      sceneId: canvas?.scene?.id ?? "",
      snapshot: { ...snapshot, state: nextState }
    };

    let burnDelta = 0;
    let spentEdgePoolKey = null;
    if (preview.usesReaction) {
      nextState.raRemaining = Math.max(0, Number(nextState.raRemaining ?? 0) - 1);
    } else {
      const requestedBurn = preview.edgePoolKey ? 0 : 2;
      const burnPhase = evaluateTraitPhase({
        actor,
        phase: "onBeforeBurnApplied",
        facts: buildBurnTraitFacts({
          actor,
          packet: {
            actionId,
            category: actionCategory,
            resource: "reaction",
            amount: requestedBurn,
            source: "reaction"
          },
          runtime,
        }),
        packet: {
          actionId,
          category: actionCategory,
          resource: "reaction",
          amount: requestedBurn,
          source: "reaction"
        },
        options: { runtime, consumeUsage: true },
      });
      runtime.pendingMutations = (runtime.pendingMutations ?? []).concat(burnPhase.mutations);
      burnDelta = Math.max(0, Number(burnPhase.packet.amount ?? requestedBurn) || 0);

      if (preview.edgePoolKey) {
        await actor.spendEdge(preview.edgePoolKey, 1, { source: "reactionBurnCancel" });
        spentEdgePoolKey = preview.edgePoolKey;
      } else if (burnDelta > 0) {
        nextState.reactionBurnSinceLastActivation = Math.max(
          0,
          Number(nextState.reactionBurnSinceLastActivation ?? 0) + burnDelta
        );
      }
    }

    this._appendActionLog(nextState, {
      id: actionId,
      label: logLabel || actionLabel,
      costLabel: preview.costLabel
    });

    if (runtime.pendingMutations?.length) {
      await applyTraitMutations({ actor, mutations: runtime.pendingMutations, runtime });
    } else {
      await snapshot.combatant.setFlag(FLAG_SCOPE, FLAG_KEY, nextState);
    }

    if (burnDelta > 0) {
      await actor.update({ "system.burn.value": Math.max(0, Number(actor.system?.burn?.value ?? 0) + burnDelta) });
    }

    return {
      ok: true,
      snapshot: this.getSnapshot(actor, { token }),
      costLabel: preview.costLabel,
      burnDelta,
      spentEdgePoolKey,
      usedReaction: preview.usesReaction,
    };
  }

  static async updateCombatantState(actor, { token = null, mutate = null } = {}) {
    const snapshot = this.getSnapshot(actor, { token });
    if (!snapshot?.combatant) return { ok: false, reason: "No combatant on the current scene." };

    const nextState = cloneWritableSnapshotState(snapshot);
    const mutated = typeof mutate === "function" ? mutate(nextState, snapshot) ?? nextState : nextState;
    await snapshot.combatant.setFlag(FLAG_SCOPE, FLAG_KEY, mutated);
    return { ok: true, snapshot: this.getSnapshot(actor, { token }) };
  }

  static getUsedWeaponGroupIds(actor, { token = null, snapshot = null, currentTurnOnly = true } = {}) {
    const resolvedSnapshot = snapshot ?? this.getSnapshot(actor, { token });
    if (!resolvedSnapshot?.hasCombatant) return [];
    if (currentTurnOnly && !resolvedSnapshot.isCurrentTurn) return [];
    return getBattlemechUsedWeaponGroupIds(resolvedSnapshot);
  }

  static async markWeaponGroupUsed(actor, { token = null, groupId = "" } = {}) {
    const normalizedId = String(groupId ?? "").trim();
    if (!normalizedId) return { ok: false, reason: "Weapon group id is required." };

    return this.updateCombatantState(actor, {
      token,
      mutate: state => markBattlemechWeaponGroupUsed(state, normalizedId),
    });
  }

  static async setPendingReaction(actor, { token = null, pendingReaction = null } = {}) {
    return this.updateCombatantState(actor, {
      token,
      mutate: state => {
        state.pendingReaction = normalizePendingReaction(pendingReaction);
        return state;
      }
    });
  }

  static async clearPendingReaction(actor, { token = null } = {}) {
    return this.setPendingReaction(actor, { token, pendingReaction: null });
  }

  static async setHazardState(actor, { token = null, regionId = "", hazardState = null } = {}) {
    const normalizedRegionId = String(regionId ?? "").trim();
    if (!normalizedRegionId) return { ok: false, reason: "Hazard region id is required." };

    return this.updateCombatantState(actor, {
      token,
      mutate: state => {
        state.hazards ??= {};
        if (!hazardState) delete state.hazards[normalizedRegionId];
        else state.hazards[normalizedRegionId] = normalizeHazardStates({ [normalizedRegionId]: hazardState })[normalizedRegionId];
        return state;
      }
    });
  }

  static getModifierSummary(actor, burnPenalty = Math.floor(Number(actor?.system?.burn?.value ?? 0) / 2)) {
    const condition = actor?.system?.derived?.condition ?? {};
    const entries = [];

    if (burnPenalty > 0) {
      entries.push({
        label: "Burn Penalty",
        numericValue: -burnPenalty,
        value: formatSignedValue(-burnPenalty)
      });
    }

    const fatiguePenalty = Number(condition.fatiguePenalty ?? 0);
    if (fatiguePenalty) {
      entries.push({
        label: "Fatigue",
        numericValue: fatiguePenalty,
        value: formatSignedValue(fatiguePenalty)
      });
    }

    const physicalPenalty = Number(condition.physicalPenalty ?? 0);
    if (physicalPenalty) {
      entries.push({
        label: "Physical",
        numericValue: physicalPenalty,
        value: formatSignedValue(physicalPenalty)
      });
    }

    if (!entries.length) {
      entries.push({
        label: "Current Modifiers",
        numericValue: 0,
        value: "0"
      });
    }

    return entries;
  }

  static getActiveStatuses(actor) {
    const statusIds = Array.from(actor?.statuses ?? []);
    return statusIds
      .map(id => ({
        id,
        label: statusLabelFromConfig(id)
      }))
      .sort((left, right) => left.label.localeCompare(right.label));
  }

  static buildActionModel(actor, snapshot) {
    const buildCommonUtilityButton = (id) => {
      const definition = getCommonCheckDefinition(id);
      const payload = getCommonCheckPayload(id);
      if (!payload || !definition) return null;

      return {
        id,
        label: definition.label,
        handler: "roll",
        roll: JSON.stringify(payload),
        disabled: false,
        reason: ""
      };
    };
    const buildCategory = category => {
      const actions = getPersonalActionsByCategory(category)
        .filter(action => action.id !== "overloadCheck")
        .filter(action => !(category === PERSONAL_ACTION_CATEGORIES.recovery && action.id === "reduceBurn"));

      if (category === PERSONAL_ACTION_CATEGORIES.standard) {
        const reduceBurnAction = getPersonalAction("reduceBurn");
        if (reduceBurnAction && !actions.some(action => action.id === "reduceBurn")) {
          actions.push(reduceBurnAction);
        }
      }

      return actions.map(action => this._buildCatalogAction(actor, snapshot, action));
    };

    const buildSummaryAction = actionId => {
      const action = getPersonalAction(actionId);
      if (!action) return null;

      const built = this._buildCatalogAction(actor, snapshot, action);
      return built.disabled ? null : built;
    };

    const overloadCheckAction = snapshot.burn?.canOverloadCheck
      ? buildSummaryAction("overloadCheck")
      : null;

    return {
      utilityButtons: [
        {
          id: "initiative",
          label: "Initiative",
          handler: "roll",
          roll: JSON.stringify({ intent: "initiative" }),
          disabled: false,
          reason: ""
        },
        {
          id: "statuses",
          label: "Statuses",
          handler: "toggleStatuses",
          disabled: false,
          reason: snapshot.token ? "" : "Requires a token on the current scene."
        },
        buildCommonUtilityButton("composure"),
        buildCommonUtilityButton("judgeIntent"),
        buildCommonUtilityButton("memory"),
        buildCommonUtilityButton("lift"),
        buildCommonUtilityButton("endure")
      ].filter(Boolean),
      summaryPills: [
        { label: "SA", value: `${snapshot.state.saRemaining}/${BASE_SA}` },
        { label: "Cap", value: `${Math.max(0, Number(snapshot.state?.saSpentThisActivation ?? 0))}/${getActivationMaxSA(actor)}` },
        { label: "FA", value: `${snapshot.state.faRemaining}` },
        { label: "RA", value: `${snapshot.state.raRemaining}` },
        {
          label: "Burn/Turn",
          value: `+${Math.max(0, Number(snapshot.state?.burnThisActivation ?? 0))}`,
          action: overloadCheckAction
        }
      ],
      activationLog: normalizeActionLog(snapshot.state?.actionLog).map((entry, index) => ({
        ...entry,
        index: index + 1
      })),
      menus: [
        {
          id: "standard",
          label: "Standard Actions",
          actions: buildCategory(PERSONAL_ACTION_CATEGORIES.standard)
        },
        {
          id: "complex",
          label: "Complex Actions",
          actions: buildCategory(PERSONAL_ACTION_CATEGORIES.complex)
        },
        {
          id: "free",
          label: "Free Actions",
          actions: buildCategory(PERSONAL_ACTION_CATEGORIES.free)
        },
        {
          id: "reaction",
          label: "Reactions",
          actions: buildCategory(PERSONAL_ACTION_CATEGORIES.reaction)
        },
        {
          id: "burn",
          label: "Burn & Recovery",
          actions: buildCategory(PERSONAL_ACTION_CATEGORIES.recovery)
        }
      ].filter(menu => menu.actions.length)
    };
  }

  static _buildCatalogAction(actor, snapshot, action) {
    const notInCombatReason = snapshot.hasCombatant ? "" : "No current-scene combatant.";
    const notTurnReason = snapshot.isCurrentTurn ? "" : "Only during your activation.";
    const overloadedReason = snapshot.overloaded ? "Overloaded actors can only recover Burn." : "";
    const saCapacityRemaining = getSaCapacityRemaining(actor, snapshot);
    const state = snapshot.state ?? {};
    const category = action.category;
    let resource = "sa";
    let cost = Number(action.cost ?? 0) || 0;
    let costLabel = actionCostLabel(resource, cost);
    let reason = "";

    if (action.id === "reduceBurn") {
      resource = "sa";
      cost = 1;
      costLabel = "1 SA";
      reason = notInCombatReason
        || notTurnReason
        || (saCapacityRemaining <= 0 ? "Activation SA cap reached." : "")
        || (snapshot.burn.value <= 0 ? "Burn is already at 0." : "");
    } else if (action.id === "overloadCheck") {
      resource = "check";
      cost = 0;
      costLabel = "Check";
      reason = notInCombatReason
        || notTurnReason
        || (!snapshot.burn.canOverloadCheck ? (snapshot.overloaded ? "Already Overloaded." : "Burn below 6.") : "");
    } else if (action.id === "interrupt") {
      const preparedInterrupt = getPreparedInterrupt(state);
      resource = Number(state.raRemaining ?? 0) > 0 ? "ra" : "burn";
      cost = resource === "ra" ? 1 : 2;
      costLabel = resource === "ra" ? "1 RA" : "+2 Burn";
      reason = notInCombatReason
        || (snapshot.isCurrentTurn ? "Only outside your activation." : "")
        || (!preparedInterrupt ? "Prepare an interrupt first." : "");
    } else if (action.id === "evade") {
      const pendingReaction = normalizePendingReaction(state.pendingReaction);
      const evadeTurnReason = snapshot.isCurrentTurn && !pendingReaction?.allowCurrentTurn
        ? "Only outside your activation."
        : "";
      resource = Number(state.raRemaining ?? 0) > 0 ? "ra" : "burn";
      cost = resource === "ra" ? 1 : 2;
      costLabel = resource === "ra" ? "1 RA" : "+2 Burn";
      reason = notInCombatReason
        || evadeTurnReason
        || (!pendingReaction ? "Use an area effect or hazard card to trigger Evade." : "");
    } else if (category === PERSONAL_ACTION_CATEGORIES.standard) {
      reason = notInCombatReason
        || notTurnReason
        || overloadedReason
        || (saCapacityRemaining < cost ? "Activation SA cap reached." : "");
    } else if (category === PERSONAL_ACTION_CATEGORIES.complex) {
      reason = notInCombatReason
        || notTurnReason
        || overloadedReason
        || (saCapacityRemaining < cost ? "Activation SA cap reached." : "");
    } else if (category === PERSONAL_ACTION_CATEGORIES.free) {
      const usesFreeAction = Number(state.faRemaining ?? 0) > 0;
      resource = usesFreeAction ? "fa" : "sa";
      cost = 1;
      costLabel = usesFreeAction ? "Free" : "1 SA";
      reason = notInCombatReason
        || notTurnReason
        || (!usesFreeAction && overloadedReason)
        || (!usesFreeAction && saCapacityRemaining < 1 ? "Activation SA cap reached." : "");
    } else if (category === PERSONAL_ACTION_CATEGORIES.reaction) {
      const usesReaction = Number(state.raRemaining ?? 0) > 0;
      resource = usesReaction ? "ra" : "burn";
      cost = usesReaction ? 1 : 2;
      costLabel = usesReaction ? "1 RA" : "+2 Burn";
      reason = notInCombatReason
        || (snapshot.isCurrentTurn ? "Only outside your activation." : "");
    } else if (category === PERSONAL_ACTION_CATEGORIES.recovery) {
      reason = notInCombatReason
        || notTurnReason;
    }

    if (!action.handler) {
      reason = action.reason || "Not yet implemented.";
    }

    return {
      id: action.id,
      label: action.label,
      category,
      handler: action.handler,
      description: String(action.description ?? "").trim(),
      resource,
      cost,
      costLabel,
      disabled: Boolean(reason),
      reason,
      roll: action.roll ? JSON.stringify(action.roll) : "",
      prominent: Boolean(action.prominent || (action.prominentWhenBurning && snapshot.burn.value >= 6))
    };
  }

  static async executeAction(actor, { token = null, actionId = "", metadata = {} } = {}) {
    const action = getPersonalAction(actionId);
    if (!action) return { ok: false, reason: "Unknown combat action." };
    if (!action.handler) return { ok: false, reason: action.reason || "That action is not implemented yet." };

    if (action.category === PERSONAL_ACTION_CATEGORIES.standard) {
      return this._executeStandardAction(actor, { token, action, metadata });
    }

    if (action.category === PERSONAL_ACTION_CATEGORIES.free) {
      return this._executeFreeAction(actor, { token, action, metadata });
    }

    if (action.category === PERSONAL_ACTION_CATEGORIES.reaction) {
      return this._executeReactionAction(actor, { token, action, metadata });
    }

    return { ok: false, reason: action.reason || "That action is not implemented yet." };
  }

  static async _executeStandardAction(actor, { token = null, action, metadata = {} } = {}) {
    const snapshot = this.getSnapshot(actor, { token });
    if (!snapshot.hasCombatant) return { ok: false, reason: "No combatant on the current scene." };
    if (!snapshot.isCurrentTurn) return { ok: false, reason: "Only available during your activation." };
    if (snapshot.overloaded) return { ok: false, reason: "Overloaded actors can only recover Burn." };
    if (getSaCapacityRemaining(actor, snapshot) < Number(action.cost ?? 1)) {
      return { ok: false, reason: "Activation SA cap reached." };
    }

    const spend = await this.spendResource(actor, {
      token,
      resource: "sa",
      cost: Number(action.cost ?? 1) || 1,
      actionId: action.id,
      actionLabel: action.label,
      actionCostLabel: `${Number(action.cost ?? 1) || 1} SA`,
      actionCategory: action.category
    });
    if (!spend?.ok) return spend;

    await this._applyActionState(actor, {
      token,
      actionId: action.id,
      metadata,
      snapshot: spend.snapshot
    });
    return { ok: true, snapshot: this.getSnapshot(actor, { token }) };
  }

  static async _executeFreeAction(actor, { token = null, action, metadata = {} } = {}) {
    const snapshot = this.getSnapshot(actor, { token });
    if (!snapshot.hasCombatant) return { ok: false, reason: "No combatant on the current scene." };
    if (!snapshot.isCurrentTurn) return { ok: false, reason: "Only available during your activation." };

    const usesFreeAction = Number(snapshot.state?.faRemaining ?? 0) > 0;
    if (!usesFreeAction && snapshot.overloaded) {
      return { ok: false, reason: "Overloaded actors can only recover Burn." };
    }
    if (!usesFreeAction && getSaCapacityRemaining(actor, snapshot) < 1) {
      return { ok: false, reason: "Activation SA cap reached." };
    }

    const spend = await this.spendResource(actor, {
      token,
      resource: usesFreeAction ? "fa" : "sa",
      cost: 1,
      actionId: action.id,
      actionLabel: action.label,
      actionCostLabel: usesFreeAction ? "Free" : "1 SA",
      actionCategory: action.category
    });
    if (!spend?.ok) return spend;

    await this._applyActionState(actor, {
      token,
      actionId: action.id,
      metadata,
      snapshot: spend.snapshot
    });
    return { ok: true, snapshot: this.getSnapshot(actor, { token }) };
  }

  static async _promptSpendEdgeForReaction(actor) {
    if (!actor.hasEdgePools?.()) return null;

    const allPools = Object.keys(actor.system?.counters?.edgePools ?? {}).map(key => actor.getEdgePool(key));
    const available = allPools.filter(p => p.hasPools && p.effectiveValue > 0);
    if (!available.length) return null;

    const capitalize = s => String(s).charAt(0).toUpperCase() + String(s).slice(1);

    let poolHtml;
    if (available.length === 1) {
      poolHtml = `<input type="hidden" name="poolKey" value="${available[0].key}">
        <p>from <strong>${capitalize(available[0].key)}</strong> (${available[0].effectiveValue} available)</p>`;
    } else {
      poolHtml = available.map((p, i) => `
        <label style="display:block">
          <input type="radio" name="poolKey" value="${p.key}" ${i === 0 ? "checked" : ""}>
          ${capitalize(p.key)} &mdash; ${p.effectiveValue} available
        </label>
      `).join("");
    }

    const content = `<p>This reaction costs <strong>+2 Burn</strong>. Spend 1 Edge to ignore it?</p><form>${poolHtml}</form>`;

    return Dialog.confirm({
      title: "Reaction: Spend Edge?",
      content,
      yes: (html) => {
        const poolKey = html.find("[name='poolKey']:checked, [name='poolKey'][type='hidden']").first().val();
        return String(poolKey ?? available[0].key).trim() || available[0].key;
      },
      no: () => null,
      defaultYes: false,
    });
  }

  static async _executeReactionAction(actor, { token = null, action, metadata = {} } = {}) {
    const snapshot = this.getSnapshot(actor, { token });
    if (!snapshot.hasCombatant) return { ok: false, reason: "No combatant on the current scene." };
    const pendingReaction = normalizePendingReaction(snapshot.state?.pendingReaction);
    const allowCurrentTurn = action.id === "evade" && pendingReaction?.allowCurrentTurn;
    if (snapshot.isCurrentTurn && !allowCurrentTurn) return { ok: false, reason: "Only outside your activation." };
    if (action.id === "interrupt" && !getPreparedInterrupt(snapshot.state)) {
      return { ok: false, reason: "Prepare an interrupt first." };
    }

    const logLabel = action.id === "assist" && metadata?.targetName
      ? `${action.label}: ${metadata.targetName}`
      : action.id === "interrupt" && metadata?.scope
        ? `${action.label}: ${String(metadata.scope).trim()}`
        : action.label;
    let edgePoolKey = String(metadata?.edgePoolKey ?? "").trim();
    if (!edgePoolKey && Number(snapshot.state?.raRemaining ?? 0) <= 0) {
      edgePoolKey = await PersonalCombatTracker._promptSpendEdgeForReaction(actor) ?? "";
    }

    const spend = await this.commitReactionSpend(actor, {
      token,
      actionId: action.id,
      actionLabel: action.label,
      actionCategory: action.category,
      logLabel,
      edgePoolKey,
      allowCurrentTurn,
    });
    if (!spend?.ok) return spend;

    return { ...spend, actionLabel: logLabel };
  }

  static async _applyActionState(actor, { token = null, actionId = "", metadata = {}, snapshot = null } = {}) {
    const currentSnapshot = snapshot ?? this.getSnapshot(actor, { token });
    if (!currentSnapshot?.combatant) return { ok: false, reason: "No combatant on the current scene." };
    const nextState = mergeActionState(currentSnapshot.state, actionId, {
      snapshot: currentSnapshot,
      metadata
    });
    await currentSnapshot.combatant.setFlag(FLAG_SCOPE, FLAG_KEY, nextState);
    return { ok: true, snapshot: this.getSnapshot(actor, { token }) };
  }

  static async clearAim(actor, { token = null } = {}) {
    const snapshot = this.getSnapshot(actor, { token });
    if (!snapshot?.combatant) return { ok: false, reason: "No combatant on the current scene." };

    const nextState = cloneWritableSnapshotState(snapshot);
    nextState.actionState ??= {};
    if (!nextState.actionState.aim) return { ok: true, snapshot };

    nextState.actionState.aim = null;
    await snapshot.combatant.setFlag(FLAG_SCOPE, FLAG_KEY, nextState);
    return { ok: true, snapshot: this.getSnapshot(actor, { token }) };
  }

  static getPreparedInterrupt(snapshotOrState = null) {
    const state = snapshotOrState?.state ?? snapshotOrState ?? {};
    return getPreparedInterrupt(state);
  }

  static async clearPreparedInterrupt(actor, { token = null } = {}) {
    const snapshot = this.getSnapshot(actor, { token });
    if (!snapshot?.combatant) return { ok: false, reason: "No combatant on the current scene." };

    const nextState = cloneWritableSnapshotState(snapshot);
    nextState.actionState ??= {};
    if (!nextState.actionState.preparedInterrupt) return { ok: true, snapshot };

    nextState.actionState.preparedInterrupt = null;
    await snapshot.combatant.setFlag(FLAG_SCOPE, FLAG_KEY, nextState);
    return { ok: true, snapshot: this.getSnapshot(actor, { token }) };
  }

  static async _syncPreparedIndicatorForCombatant(combatant) {
    if (!game.user.isGM || !combatant) return;

    const sceneId = this._getCombatantSceneId(combatant) || canvas?.scene?.id;
    const tokenDoc = this._getCombatantTokenDocument(combatant, sceneId);
    const actor = tokenDoc?.actor ?? combatant?.actor ?? null;
    if (!tokenDoc || !actor) return;

    const stored = combatant.getFlag(FLAG_SCOPE, FLAG_KEY);
    const shouldHaveIndicator = Boolean(getPreparedInterrupt(stored));
    const statusConfig = getPreparedInterruptStatusConfig();
    const statusId = String(statusConfig?.id ?? PREPARED_INTERRUPT_STATUS_ID).trim() || PREPARED_INTERRUPT_STATUS_ID;
    const hasIndicator = actor?.statuses?.has?.(statusId) ?? false;

    if (hasIndicator === shouldHaveIndicator) return;

    await actor.toggleStatusEffect(statusId, { active: shouldHaveIndicator, overlay: false });
  }

  static async syncPreparedIndicators(combat = game.combat) {
    if (!game.user.isGM || !combat) return;

    for (const combatant of this._getCombatants(combat)) {
      await this._syncPreparedIndicatorForCombatant(combatant);
    }
  }

  static async clearPreparedIndicatorForCombatant(combatant) {
    if (!game.user.isGM || !combatant) return;

    const sceneId = this._getCombatantSceneId(combatant) || canvas?.scene?.id;
    const tokenDoc = this._getCombatantTokenDocument(combatant, sceneId);
    const actor = tokenDoc?.actor ?? combatant?.actor ?? null;
    if (!tokenDoc || !actor) return;
    const statusConfig = getPreparedInterruptStatusConfig();
    const statusId = String(statusConfig?.id ?? PREPARED_INTERRUPT_STATUS_ID).trim() || PREPARED_INTERRUPT_STATUS_ID;
    if (!(actor?.statuses?.has?.(statusId) ?? false)) return;
    await actor.toggleStatusEffect(statusId, { active: false, overlay: false });
  }

  static _buildSpendAction(snapshot, action, sharedReason = "") {
    const remaining = Number(snapshot.state?.[`${action.resource}Remaining`] ?? 0);
    const insufficientReason = action.resource === "sa"
      ? ""
      : (remaining < action.cost ? `No ${String(action.resource).toUpperCase()} remaining.` : "");
    const reason = sharedReason || insufficientReason;
    const costLabel = this._formatCostLabel(action.resource, action.cost);

    return {
      id: action.id,
      label: action.label,
      costLabel,
      handler: "combatSpend",
      resource: action.resource,
      cost: action.cost,
      disabled: !!reason,
      reason,
      prominent: false
    };
  }

  static _buildStubAction(action) {
    return {
      ...action,
      handler: "",
      disabled: true,
      reason: "Not yet implemented."
    };
  }

  static _formatCostLabel(resource, cost) {
    return `${cost} ${String(resource).toUpperCase()}`;
  }

  static _appendActionLog(state, { id = "", label = "", costLabel = "" } = {}) {
    const normalizedLabel = String(label ?? "").trim();
    if (!normalizedLabel) return;

    const nextLog = normalizeActionLog(state?.actionLog);
    nextLog.push({
      id: String(id ?? "").trim(),
      label: normalizedLabel,
      costLabel: String(costLabel ?? "").trim()
    });

    state.actionLog = nextLog;
  }

  static getActivationIdentity(combat, combatant) {
    return {
      combatId: combat?.id ?? null,
      combatantId: combatant?.id ?? null,
      round: Number(combat?.round ?? 0),
      turn: Number(combat?.turn ?? 0)
    };
  }

  static async ensureCurrentCombatantState() {
    if (!game.user.isGM) return;

    const combat = game.combat;
    const combatant = combat?.combatant;
    if (!combat || !combatant || combat.scene?.id !== canvas?.scene?.id) return;

    const activation = this.getActivationIdentity(combat, combatant);
    const stored = combatant.getFlag(FLAG_SCOPE, FLAG_KEY);
    if (sameActivation(stored, activation)) return;

    await combatant.setFlag(FLAG_SCOPE, FLAG_KEY, nextActivationState(stored, activation));
  }

  static async spendResource(actor, {
    token = null,
    resource = "sa",
    cost = 1,
    actionId = "",
    actionLabel = "",
    actionCostLabel = "",
    actionCategory = ""
  } = {}) {
    const snapshot = this.getSnapshot(actor, { token });
    if (!snapshot.hasCombatant) {
      return { ok: false, reason: "No combatant on the current scene." };
    }
    if (!snapshot.isCurrentTurn) {
      return { ok: false, reason: "Only available during your activation." };
    }

    const runtime = {
      combat: snapshot.combat,
      combatant: snapshot.combatant,
      state: cloneState(snapshot.state, this.getActivationIdentity(snapshot.combat, snapshot.combatant)),
      sceneId: canvas?.scene?.id ?? "",
      snapshot,
    };

    let finalCost = Math.max(0, Number(cost ?? 0) || 0);
    const costPhase = evaluateTraitPhase({
      actor,
      phase: "onBeforeActionCostFinalized",
      facts: buildActionCostTraitFacts({
        actor,
        packet: { actionId, category: actionCategory, resource, cost: finalCost, effectiveCost: finalCost },
        runtime,
      }),
      packet: { actionId, category: actionCategory, resource, cost: finalCost, effectiveCost: finalCost },
      options: { runtime, consumeUsage: true },
    });
    finalCost = Math.max(0, Number(costPhase.packet.cost ?? finalCost) || 0);
    runtime.pendingMutations = (runtime.pendingMutations ?? []).concat(costPhase.mutations);

    const remainingKey = `${resource}Remaining`;
    const remaining = Number(snapshot.state?.[remainingKey] ?? 0);
    if (resource !== "sa" && remaining < finalCost) {
      return { ok: false, reason: `No ${String(resource).toUpperCase()} remaining.` };
    }

    const nextState = runtime.state;
    const activationCap = resource === "sa" ? getActivationMaxSA(actor) : 0;
    const spentBefore = Math.max(0, Number(snapshot.state?.saSpentThisActivation ?? 0) || 0);

    if (resource === "sa" && (spentBefore + finalCost) > activationCap) {
      return { ok: false, reason: "Activation SA cap reached." };
    }

    nextState[remainingKey] = Math.max(0, remaining - finalCost);

    if (resource === "sa") {
      nextState.saSpentThisActivation = spentBefore + finalCost;
      if (actionId === "attack") {
        nextState.attacksThisActivation = Number(nextState.attacksThisActivation ?? 0) + 1;
      }
    }

    this._appendActionLog(nextState, {
      id: actionId,
      label: actionLabel,
      costLabel: actionCostLabel || this._formatCostLabel(resource, finalCost)
    });

    let burnDelta = 0;
    if (resource === "sa") {
      const extraBefore = Math.max(0, spentBefore - BASE_SA);
      const extraAfter = Math.max(0, nextState.saSpentThisActivation - BASE_SA);
      const attackCountBefore = Math.max(0, Number(snapshot.state?.attacksThisActivation ?? 0) || 0);
      const attackCountAfter = Math.max(0, Number(nextState.attacksThisActivation ?? 0) || 0);

      for (let index = extraBefore + 1; index <= extraAfter; index += 1) {
        const burnPhase = evaluateTraitPhase({
          actor,
          phase: "onBeforeBurnApplied",
          facts: buildBurnTraitFacts({
            actor,
            packet: {
              actionId,
              category: actionCategory,
              resource,
              amount: 1,
              source: "extraSA",
              extraSaIndex: index,
            },
            runtime,
          }),
          packet: {
            actionId,
            category: actionCategory,
            resource,
            amount: 1,
            source: "extraSA",
            extraSaIndex: index,
          },
          options: { runtime, consumeUsage: true },
        });
        runtime.pendingMutations = (runtime.pendingMutations ?? []).concat(burnPhase.mutations);
        burnDelta += Math.max(0, Number(burnPhase.packet.amount ?? 0) || 0);
      }

      for (let index = attackCountBefore + 1; index <= attackCountAfter; index += 1) {
        if (index <= 1) continue;
        const burnPhase = evaluateTraitPhase({
          actor,
          phase: "onBeforeBurnApplied",
          facts: buildBurnTraitFacts({
            actor,
            packet: {
              actionId,
              category: actionCategory,
              resource,
              amount: 1,
              source: "attack",
              attackIndex: index,
            },
            runtime,
          }),
          packet: {
            actionId,
            category: actionCategory,
            resource,
            amount: 1,
            source: "attack",
            attackIndex: index,
          },
          options: { runtime, consumeUsage: true },
        });
        runtime.pendingMutations = (runtime.pendingMutations ?? []).concat(burnPhase.mutations);
        burnDelta += Math.max(0, Number(burnPhase.packet.amount ?? 0) || 0);
      }

      nextState.burnThisActivation = Math.max(0, Number(nextState.burnThisActivation ?? 0) + burnDelta);
    }

    if (runtime.pendingMutations?.length) {
      await applyTraitMutations({
        actor,
        mutations: runtime.pendingMutations,
        runtime: {
          ...runtime,
          state: nextState,
        },
      });
    } else {
      await snapshot.combatant.setFlag(FLAG_SCOPE, FLAG_KEY, nextState);
    }

    if (burnDelta > 0) {
      await actor.update({ "system.burn.value": Math.max(0, Number(actor.system?.burn?.value ?? 0) + burnDelta) });
    }

    return { ok: true, snapshot: this.getSnapshot(actor, { token: snapshot.token }) };
  }

  static async reduceBurn(actor, { token = null } = {}) {
    const snapshot = this.getSnapshot(actor, { token });
    if (!snapshot.hasCombatant) return { ok: false, reason: "No combatant on the current scene." };
    if (!snapshot.isCurrentTurn) return { ok: false, reason: "Only available during your activation." };
    if (getSaCapacityRemaining(actor, snapshot) <= 0) return { ok: false, reason: "Activation SA cap reached." };
    if (snapshot.burn.value <= 0) return { ok: false, reason: "Burn is already at 0." };

    const spend = await this.spendResource(actor, {
      token: snapshot.token,
      resource: "sa",
      cost: 1,
      actionId: "reduceBurn",
      actionLabel: "Reduce Burn",
      actionCostLabel: "1 SA",
      actionCategory: PERSONAL_ACTION_CATEGORIES.standard
    });
    if (!spend.ok) return spend;

    const nextBurn = Math.max(0, Number(actor.system?.burn?.value ?? 0) - 1);
    const update = { "system.burn.value": nextBurn };
    if (nextBurn === 0 && actor.system?.burn?.overloaded) {
      update["system.burn.overloaded"] = false;
    }

    await actor.update(update);
    return { ok: true, snapshot: this.getSnapshot(actor, { token: snapshot.token }) };
  }

  static async finalizeActivation(combat, combatantId) {
    if (!game.user.isGM) return;
    if (!combatantId || !combat) return;

    const combatant = combat.combatants?.get?.(combatantId) ?? null;
    const actor = combatant?.actor ?? null;
    if (!combatant || !actor) return;

    const stored = combatant.getFlag(FLAG_SCOPE, FLAG_KEY);
    const state = sameActivation(stored, this.getActivationIdentity(combat, combatant))
      ? cloneState(stored, this.getActivationIdentity(combat, combatant))
      : cloneState(stored);

    const passiveCoolOffEligible = Number(state.saSpentThisActivation ?? 0) <= BASE_SA
      && Number(state.burnThisActivation ?? 0) <= 0
      && Number(state.reactionBurnSinceLastActivation ?? 0) <= 0;

    const packet = {
      burnDelta: passiveCoolOffEligible ? -2 : 0,
      edgeAdjustments: [],
    };

    const runtime = {
      combat,
      combatant,
      state,
      sceneId: combat.scene?.id ?? canvas?.scene?.id ?? "",
    };

    const endPhase = evaluateTraitPhase({
      actor,
      phase: "onEndOfActivation",
      facts: buildEndOfActivationTraitFacts({ actor, packet, runtime }),
      packet,
      options: { runtime, consumeUsage: true },
    });

    await applyTraitMutations({ actor, mutations: endPhase.mutations, runtime });

    const burnDelta = Number(endPhase.packet.burnDelta ?? packet.burnDelta) || 0;
    if (burnDelta) {
      const nextBurn = Math.max(0, Number(actor.system?.burn?.value ?? 0) + burnDelta);
      const update = { "system.burn.value": nextBurn };
      if (nextBurn === 0 && actor.system?.burn?.overloaded) {
        update["system.burn.overloaded"] = false;
      }
      await actor.update(update);
    }

    for (const adjustment of endPhase.packet.edgeAdjustments ?? []) {
      const amount = Number(adjustment?.amount ?? 0) || 0;
      if (!amount || !adjustment?.poolKey) continue;
      if (amount > 0) {
        await actor.gainEdge(adjustment.poolKey, amount, { skipTraitHooks: true, source: "endOfActivationTrait" });
      } else {
        await actor.spendEdge(adjustment.poolKey, Math.abs(amount), { skipTraitHooks: true, source: "endOfActivationTrait" });
      }
    }

    if (actor.type === "battlemech") {
      await resolveBattlemechPendingHeat(actor, {
        source: "combat turn advance",
        postDangerCard: true,
        activation: this.getActivationIdentity(combat, combatant),
      });
    }
  }

  static async _onUpdateCombat(combat, changed) {
    const touchedTurn = Object.prototype.hasOwnProperty.call(changed ?? {}, "turn")
      || Object.prototype.hasOwnProperty.call(changed ?? {}, "round");

    if (touchedTurn) {
      const previousActivation = this._lastActivationByCombat.get(combat?.id) ?? null;
      const previousCombatantId = typeof previousActivation === "string"
        ? previousActivation
        : previousActivation?.combatantId ?? null;
      const currentActivation = this.getActivationIdentity(combat, combat?.combatant);
      const advancedActivation = previousActivation && typeof previousActivation === "object"
        ? !sameActivation(previousActivation, currentActivation)
        : previousCombatantId && previousCombatantId !== currentActivation.combatantId;

      if (previousCombatantId && advancedActivation) {
        await this.finalizeActivation(combat, previousCombatantId);
      }
      await this.ensureCurrentCombatantState();
      await this._processCurrentCombatantHazards(combat);
      await this._processCurrentCombatantMachineCrits(combat);
      if (combat?.id) {
        this._lastActivationByCombat.set(combat.id, currentActivation);
      }
    }

    this.renderOpenActorSheets();
  }

  static async _onCreateCombatant(combatant) {
    const combat = combatant?.combat;
    if (combat?.combatant?.id === combatant?.id) {
      await this.ensureCurrentCombatantState();
    }
    await this._syncPreparedIndicatorForCombatant(combatant);
    const tokenDoc = this._getCombatantTokenDocument(combatant, combat?.scene?.id ?? canvas?.scene?.id);
    if (tokenDoc) {
      await this._syncHazardPresenceForToken(tokenDoc);
    }
    this.renderOpenActorSheets();
  }

  static async _onDeleteCombatant(combatant) {
    await this.clearPreparedIndicatorForCombatant(combatant);
    this.renderOpenActorSheets();
  }

  static async _onDeleteCombat(combat) {
    if (combat?.id) {
      this._lastActivationByCombat.delete(combat.id);
    }
    for (const combatant of this._getCombatants(combat)) {
      await this.clearPreparedIndicatorForCombatant(combatant);
    }
    this.renderOpenActorSheets();
  }

  static _onUpdateCombatant(combatant, changed) {
    if (foundry.utils.hasProperty(changed, `flags.${FLAG_SCOPE}.${FLAG_KEY}`)) {
      void this._syncPreparedIndicatorForCombatant(combatant);
      const tokenDoc = this._getCombatantTokenDocument(combatant, this._getCombatantSceneId(combatant) || canvas?.scene?.id);
      if (tokenDoc) this._queueHazardOverlayRefresh(tokenDoc);
      this.renderOpenActorSheets(combatant?.actor?.id);
    }
  }

  static _onTargetToken(user, _token, _targeted) {
    if (user?.id !== game.user?.id) return;
    this.queueCharacterSheetRefresh();
  }

  static _onUpdateToken(tokenDocument, changed) {
    const touchesPosition = ["x", "y", "elevation"].some(key =>
      Object.prototype.hasOwnProperty.call(changed ?? {}, key)
    );
    if (!touchesPosition) return;
    if (tokenDocument?.parent?.id !== canvas?.scene?.id) return;

    const tokenId = String(tokenDocument?.id ?? "").trim();
    if (tokenId) {
      const nextX = Object.prototype.hasOwnProperty.call(changed ?? {}, "x")
        ? Number(changed.x)
        : Number(tokenDocument?.x);
      const nextY = Object.prototype.hasOwnProperty.call(changed ?? {}, "y")
        ? Number(changed.y)
        : Number(tokenDocument?.y);

      if (Number.isFinite(nextX) && Number.isFinite(nextY)) {
        this._pendingTokenPositions.set(tokenId, { x: nextX, y: nextY });
      }
    }

    void this._syncHazardPresenceForToken(tokenDocument);
    this.queueCharacterSheetRefresh();
  }

  static _onRefreshToken(token) {
    this._refreshHazardOverlay(token);
  }

  static _getTokenDocumentFromRegionEvent(args = []) {
    for (const current of args) {
      if (!current) continue;

      const candidates = [
        current?.document,
        current?.token,
        current?.tokenDocument,
        current?.object?.document,
        current?.data?.token,
        current?.data?.tokenDocument,
        current?.eventData?.token,
        current?.eventData?.tokenDocument,
      ];

      for (const candidate of candidates) {
        const tokenDoc = candidate?.document ?? candidate ?? null;
        if (tokenDoc?.documentName === "Token" || tokenDoc?.constructor?.documentName === "Token") {
          return tokenDoc;
        }
      }
    }

    return null;
  }

  static _onRegionTokenEvent(...args) {
    const tokenDoc = this._getTokenDocumentFromRegionEvent(args);
    if (!tokenDoc) return;
    void this._syncHazardPresenceForToken(tokenDoc);
  }

  static async _onCreateRegion(region) {
    if (!isHazardRegionDocument(region)) return;
    await migrateHazardRegionFlag(region);
    await this._syncAllSceneHazards(region?.parent ?? canvas?.scene ?? null);
  }

  static async _onUpdateRegion(region) {
    if (!isHazardRegionDocument(region)) return;
    await migrateHazardRegionFlag(region);
    await this._syncAllSceneHazards(region?.parent ?? canvas?.scene ?? null);
  }

  static async _onDeleteRegion(region) {
    const deletedRegionId = String(region?.id ?? "").trim();
    if (!deletedRegionId) return;

    const scene = region?.parent ?? canvas?.scene ?? null;
    const combat = game.combat;
    for (const combatant of this._getCombatants(combat)) {
      const tokenDoc = this._getCombatantTokenDocument(combatant, scene?.id ?? canvas?.scene?.id);
      const actor = tokenDoc?.actor ?? combatant?.actor ?? null;
      if (!actor || !tokenDoc) continue;
      const snapshot = this.getSnapshot(actor, { token: tokenDoc });
      if (!snapshot?.hazards?.[deletedRegionId]) continue;
      await this.setHazardState(actor, { token: tokenDoc, regionId: deletedRegionId, hazardState: null });
      if (snapshot?.pendingReaction?.sourceKind === "hazard" && snapshot.pendingReaction.sourceId === deletedRegionId) {
        await this.clearPendingReaction(actor, { token: tokenDoc });
      }
      this._queueHazardOverlayRefresh(tokenDoc);
    }
  }

  static async _syncAllSceneHazards(scene = canvas?.scene ?? null) {
    if (!scene) return;

    for (const region of Array.from(scene.regions ?? [])) {
      if (!isHazardRegionDocument(region)) continue;
      await migrateHazardRegionFlag(region);
    }

    for (const tokenDoc of Array.from(scene.tokens ?? [])) {
      await this._syncHazardPresenceForToken(tokenDoc);
      this._queueHazardOverlayRefresh(tokenDoc);
    }
  }

  static async _syncHazardPresenceForToken(tokenDocument) {
    const tokenDoc = this._asTokenDocument(tokenDocument);
    const actor = tokenDoc?.actor ?? null;
    if (!this._supportsHazardActor(actor) || !tokenDoc) {
      this._queueHazardOverlayRefresh(tokenDoc);
      return;
    }

    const snapshot = this.getSnapshot(actor, { token: tokenDoc });
    if (!snapshot?.hasCombatant) {
      this._queueHazardOverlayRefresh(tokenDoc);
      return;
    }

    const currentStates = normalizeHazardStates(snapshot.hazards);
    const regionDocs = getHazardRegionsForToken(tokenDoc);
    const activeHazards = new Map(
      regionDocs
        .map(region => {
          const flag = getHazardRegionFlag(region);
          return flag ? [String(region.id ?? "").trim(), { region, flag }] : null;
        })
        .filter(Boolean)
    );

    const entries = [];
    const exits = [];
    await this.updateCombatantState(actor, {
      token: tokenDoc,
      mutate: state => {
        state.hazards ??= {};

        for (const [regionId, { flag }] of activeHazards.entries()) {
          if (state.hazards[regionId]) continue;
          const hazardState = {
            tier: normalizeExposureTier(flag?.hazardDef?.startExposure, EXPOSURE_TIERS.minor),
            turnsExposed: 0,
            evadeLocked: false,
            lastProcessedRound: 0,
          };
          state.hazards[regionId] = hazardState;
          entries.push({ regionId, flag, hazardState });
        }

        for (const [regionId, hazardState] of Object.entries(state.hazards ?? {})) {
          if (activeHazards.has(regionId)) continue;
          const previousFlag = getHazardRegionFlag(canvas?.scene?.regions?.get?.(regionId)) ?? null;
          if (previousFlag?.hazardDef?.clearOnExit === false) continue;
          delete state.hazards[regionId];
          exits.push({ regionId, hazardState, flag: previousFlag });
        }

        return state;
      }
    });

    for (const entry of entries) {
      const region = activeHazards.get(entry.regionId)?.region ?? canvas?.scene?.regions?.get?.(entry.regionId) ?? null;
      await this._createHazardEventChatCard({
        actor,
        token: tokenDoc,
        region,
        hazardFlag: entry.flag,
        hazardState: entry.hazardState,
        eventType: "entry",
        nextTier: entry.hazardState.tier,
        allowEvade: !entry.hazardState.evadeLocked,
      });
    }

    for (const exit of exits) {
      if (snapshot?.pendingReaction?.sourceKind === "hazard" && snapshot.pendingReaction.sourceId === exit.regionId) {
        await this.clearPendingReaction(actor, { token: tokenDoc });
      }
      const regionName = String(exit?.flag?.label ?? "Hazard").trim() || "Hazard";
      const content = `<div class="mwd-gm-notice"><b>${foundry.utils.escapeHTML(regionName)}:</b> ${foundry.utils.escapeHTML(actor.name ?? "Target")} leaves the zone.</div>`;
      await ChatMessage.create(applyChatVisibility({
        speaker: ChatMessage.getSpeaker({ actor, token: tokenDoc }),
        content
      }));
    }

    this._queueHazardOverlayRefresh(tokenDoc);
  }

  static async _processCurrentCombatantHazards(combat = game.combat) {
    const combatant = combat?.combatant ?? null;
    const tokenDoc = this._getCombatantTokenDocument(combatant, combat?.scene?.id ?? canvas?.scene?.id);
    const actor = tokenDoc?.actor ?? combatant?.actor ?? null;
    if (!combatant || !tokenDoc || !this._supportsHazardActor(actor)) return;

    const snapshot = this.getSnapshot(actor, { token: tokenDoc });
    const round = Number(combat?.round ?? 0) || 0;
    const activeRegions = new Map(
      getHazardRegionsForToken(tokenDoc)
        .map(region => {
          const flag = getHazardRegionFlag(region);
          return flag ? [String(region.id ?? "").trim(), { region, flag }] : null;
        })
        .filter(Boolean)
    );

    for (const [regionId, hazardState] of Object.entries(snapshot.hazards ?? {})) {
      if ((Number(hazardState?.lastProcessedRound ?? 0) || 0) >= round) continue;
      const hazardEntry = activeRegions.get(regionId);
      if (!hazardEntry) continue;

      const nextTier = this._getHazardNextTier(hazardState, hazardEntry.flag?.hazardDef ?? {});
      await this._createHazardEventChatCard({
        actor,
        token: tokenDoc,
        region: hazardEntry.region,
        hazardFlag: hazardEntry.flag,
        hazardState,
        eventType: "tick",
        nextTier,
        allowEvade: !hazardState.evadeLocked,
      });

      await this.setHazardState(actor, {
        token: tokenDoc,
        regionId,
        hazardState: {
          ...hazardState,
          lastProcessedRound: round,
        }
      });
    }

    this._queueHazardOverlayRefresh(tokenDoc);
  }

  static async _processCurrentCombatantMachineCrits(combat = game.combat) {
    const combatant = combat?.combatant ?? null;
    const tokenDoc = this._getCombatantTokenDocument(combatant, combat?.scene?.id ?? canvas?.scene?.id);
    const actor = tokenDoc?.actor ?? combatant?.actor ?? null;
    if (!combatant || !tokenDoc || !actor || !isMachineActor(actor)) return;

    const snapshot = this.getSnapshot(actor, { token: tokenDoc });
    if (!snapshot?.hasCombatant || !snapshot?.isCurrentTurn || snapshot?.state?.machineCritsProcessed) return;

    const report = buildMachineActivationStartReport(actor);
    const reminderLines = [];

    if (report.saCost > 0) {
      const spend = await this.spendResource(actor, {
        token: tokenDoc,
        resource: "sa",
        cost: report.saCost,
        actionId: "machineCritStaggered",
        actionLabel: "Staggered",
        actionCostLabel: `${report.saCost} SA`,
        actionCategory: "simple",
      });
      reminderLines.push(spend?.ok
        ? `Staggered: spent ${report.saCost} SA at the start of activation.`
        : `Staggered: unable to auto-spend ${report.saCost} SA (${spend?.reason ?? "manual resolution required"}).`);
    }

    if (report.heatDelta > 0 && actor.type === "battlemech") {
      const currentHeat = Math.max(0, Number(actor.system?.monitors?.heat?.value ?? actor.system?.mwd?.heat?.current ?? 0) || 0);
      const nextHeat = currentHeat + report.heatDelta;
      await actor.update({
        "system.monitors.heat.value": nextHeat,
        "system.mwd.heat.current": nextHeat,
      });
      reminderLines.push(`Overheating: gained ${report.heatDelta} Heat at the start of activation.`);
    }

    reminderLines.push(...report.reminders.map(entry => `${entry.label}: ${entry.text}`));

    if (reminderLines.length) {
      const content = [
        `<div class="mwd-gm-notice">`,
        `<strong>${foundry.utils.escapeHTML(actor.name ?? "Machine")} - Critical Effects</strong>`,
        `<ul>${reminderLines.map(line => `<li>${foundry.utils.escapeHTML(line)}</li>`).join("")}</ul>`,
        `</div>`,
      ].join("");
      await ChatMessage.create(applyChatVisibility({
        speaker: ChatMessage.getSpeaker({ actor, token: tokenDoc }),
        content,
      }));
    }

    await this.updateCombatantState(actor, {
      token: tokenDoc,
      mutate: state => {
        state.machineCritsProcessed = true;
        return state;
      }
    });
  }

  static _getHazardNextTier(hazardState = {}, hazardDef = {}) {
    const turnsExposed = Math.max(0, Number(hazardState?.turnsExposed ?? 0) || 0);
    const intervalTurns = Math.max(1, Number(hazardDef?.escalation?.intervalTurns ?? 1) || 1);
    const rate = Math.max(0, Number(hazardDef?.escalation?.rate ?? 1) || 0);
    const shouldEscalate = rate > 0 && ((turnsExposed + 1) % intervalTurns === 0);
    if (!shouldEscalate) return normalizeExposureTier(hazardState?.tier, EXPOSURE_TIERS.none);

    let nextTier = normalizeExposureTier(hazardState?.tier, EXPOSURE_TIERS.none);
    for (let index = 0; index < rate; index += 1) {
      nextTier = getRaisedExposureTier(nextTier, 1);
      if (getExposureIndex(nextTier) >= getExposureIndex(hazardDef?.escalation?.max ?? EXPOSURE_TIERS.full)) {
        nextTier = normalizeExposureTier(hazardDef?.escalation?.max, EXPOSURE_TIERS.full);
        break;
      }
    }
    return nextTier;
  }

  static async _createHazardEventChatCard({
    actor = null,
    token = null,
    region = null,
    hazardFlag = {},
    hazardState = {},
    eventType = "entry",
    nextTier = null,
    allowEvade = false,
  } = {}) {
    if (!actor) return null;

    const currentTier = normalizeExposureTier(hazardState?.tier, EXPOSURE_TIERS.none);
    const resolvedNextTier = normalizeExposureTier(nextTier, currentTier);
    const reactionPreview = allowEvade && currentTier !== EXPOSURE_TIERS.none && !hazardState?.evadeLocked
      ? this.getReactionSpendPreview(actor, { token })
      : null;
    const card = {
      kind: "hazard",
      eventType,
      regionId: String(region?.id ?? "").trim(),
      regionName: String(hazardFlag?.label ?? region?.name ?? "Hazard").trim() || "Hazard",
      actorUuid: actor.uuid,
      tokenUuid: token?.uuid ?? token?.document?.uuid ?? null,
      actorName: actor.name ?? "Target",
      turnsExposed: Math.max(0, Number(hazardState?.turnsExposed ?? 0) || 0),
      baseDamage: Math.max(0, Number(hazardFlag?.damage ?? 0) || 0),
      damageBefore: scaleDamageByExposure(Number(hazardFlag?.damage ?? 0) || 0, currentTier),
      damageAfter: scaleDamageByExposure(
        Number(hazardFlag?.damage ?? 0) || 0,
        allowEvade && !hazardState?.evadeLocked ? getReducedExposureTier(currentTier, 1) : currentTier
      ),
      damageType: String(hazardFlag?.damageType ?? "concussive").trim() || "concussive",
      ap: Math.max(0, Number(hazardFlag?.ap ?? 0) || 0),
      onFullBurnDelta: Math.max(0, Number(hazardFlag?.hazardDef?.onFull?.burnDelta ?? 0) || 0),
      source: String(hazardFlag?.label ?? region?.name ?? "Hazard").trim() || "Hazard",
      nextTier: resolvedNextTier,
      exposure: {
        initialTier: currentTier,
        finalTier: currentTier,
        initialLabel: getExposureLabel(currentTier),
        finalLabel: getExposureLabel(currentTier),
        evadeLocked: Boolean(hazardState?.evadeLocked),
      },
      preview: {
        evadeActive: false,
        edgePoolKey: null,
        finalTier: currentTier,
        reactionPreview: reactionPreview ? {
          burnDelta: Number(reactionPreview.burnDelta ?? 0),
          canSpendEdge: Boolean(reactionPreview.canSpendEdge),
          edgePools: Array.isArray(reactionPreview.edgePools) ? reactionPreview.edgePools : [],
        } : {},
      }
    };

    const content = await renderHazardCard(card, { actor, token });
    const message = await ChatMessage.create(applyChatVisibility({
      speaker: ChatMessage.getSpeaker({ actor, token }),
      content,
      flags: {
        mwd: {
          hazardCard: card
        }
      }
    }));

    if (message && reactionPreview && currentTier !== EXPOSURE_TIERS.none && !hazardState?.evadeLocked) {
      await this.setPendingReaction(actor, {
        token,
        pendingReaction: {
          type: "evade",
          sourceKind: "hazard",
          sourceId: String(region?.id ?? "").trim() || null,
          messageId: message.id,
          exposureBefore: currentTier,
          exposureAfterPreview: getReducedExposureTier(currentTier, 1),
          edgePoolKey: null,
          allowCurrentTurn: true,
        }
      });
    }

    return message;
  }

  static _supportsHazardActor(actor) {
    return actor?.type === "character" || actor?.type === "npc";
  }

  static _queueHazardOverlayRefresh(tokenDocument) {
    const tokenObject = tokenDocument?.object ?? tokenDocument ?? null;
    tokenObject?.refresh?.();
  }

  static _refreshHazardOverlay(token) {
    const tokenObject = token?.object ?? token ?? null;
    const tokenDoc = tokenObject?.document ?? token ?? null;
    if (!tokenObject || !tokenDoc) return;

    const actor = tokenDoc?.actor ?? null;
    const snapshot = actor ? this.getSnapshot(actor, { token: tokenDoc }) : null;
    const hazards = Object.values(snapshot?.hazards ?? {});
    const overlayText = buildHazardOverlayText(hazards);

    let overlay = tokenObject.mwdHazardOverlay ?? null;
    if (!overlayText) {
      if (overlay?.parent) overlay.parent.removeChild(overlay);
      overlay?.destroy?.();
      tokenObject.mwdHazardOverlay = null;
      return;
    }

    if (!overlay) {
      overlay = new PIXI.Text(overlayText, {
        fontFamily: "MWD UI",
        fontSize: 14,
        fontWeight: "700",
        fill: "#fff2d5",
        stroke: "#23150d",
        strokeThickness: 4,
        align: "center",
      });
      overlay.anchor?.set?.(0, 1);
      tokenObject.addChild(overlay);
      tokenObject.mwdHazardOverlay = overlay;
    }

    overlay.text = overlayText;
    overlay.x = 6;
    overlay.y = Math.max(18, Number(tokenObject.h ?? 0) - 4);
  }

  static queueCharacterSheetRefresh(actorId = null) {
    if (this._targetRefreshTimeout) {
      clearTimeout(this._targetRefreshTimeout);
    }

    this._targetRefreshTimeout = setTimeout(() => {
      this._targetRefreshTimeout = null;
      this.renderOpenActorSheets(actorId);
    }, 0);
  }

  static _collectOpenActorSheetApps(actorTypes = null) {
    const typeFilter = Array.isArray(actorTypes) && actorTypes.length
      ? new Set(actorTypes.map(type => String(type ?? "").trim()).filter(Boolean))
      : null;
    const apps = new Set();
    const addApps = actorLike => {
      for (const app of Object.values(actorLike?.apps ?? {})) {
        const actorType = String(app?.actor?.type ?? "").trim();
        if (!actorType) continue;
        if (typeFilter && !typeFilter.has(actorType)) continue;
        apps.add(app);
      }
    };

    for (const actor of Array.from(game.actors ?? [])) {
      addApps(actor);
    }

    for (const token of Array.from(canvas?.tokens?.placeables ?? [])) {
      addApps(token?.actor);
    }

    for (const app of Object.values(ui.windows ?? {})) {
      const actorType = String(app?.actor?.type ?? "").trim();
      if (!actorType) continue;
      if (typeFilter && !typeFilter.has(actorType)) continue;
      apps.add(app);
    }

    return Array.from(apps);
  }

  static renderOpenActorSheets(actorId = null, actorTypes = null) {
    const apps = this._collectOpenActorSheetApps(actorTypes);
    for (const app of apps) {
      if (actorId && app.actor?.id !== actorId) continue;
      if (typeof app.requestCombatDashboardRefresh === "function") {
        app.requestCombatDashboardRefresh();
        continue;
      }
      app.render({ force: true });
    }
  }

  static renderOpenCharacterSheets(actorId = null) {
    this.renderOpenActorSheets(actorId, ["character"]);
  }
}

function getActivationMaxSA(actor) {
  const reflexes = Math.max(0, Number(actor?.system?.attributes?.reflexes?.value ?? 0) || 0);
  const willpower = Math.max(0, Number(actor?.system?.attributes?.willpower?.value ?? 0) || 0);
  return BASE_SA + Math.floor((reflexes + willpower) / 2);
}

function getSaCapacityRemaining(actor, snapshot) {
  return Math.max(0, getActivationMaxSA(actor) - Math.max(0, Number(snapshot?.state?.saSpentThisActivation ?? 0) || 0));
}
