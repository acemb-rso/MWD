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

const FLAG_SCOPE = "mwd";
const FLAG_KEY = "personalCombat";

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
      preparedInterrupt: null
    },
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
  return state;
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

export class PersonalCombatTracker {
  static _targetRefreshTimeout = null;
  static _pendingTokenPositions = new Map();
  static _lastActivationByCombat = new Map();

  static init() {
    Hooks.on("updateCombat", (combat, changed) => this._onUpdateCombat(combat, changed));
    Hooks.on("updateCombatant", (combatant, changed) => this._onUpdateCombatant(combatant, changed));
    Hooks.on("updateToken", (tokenDocument, changed) => this._onUpdateToken(tokenDocument, changed));
    Hooks.on("createCombatant", combatant => this._onCreateCombatant(combatant));
    Hooks.on("deleteCombatant", combatant => this._onDeleteCombatant(combatant));
    Hooks.on("deleteCombat", combat => this._onDeleteCombat(combat));
    Hooks.on("targetToken", (user, token, targeted) => this._onTargetToken(user, token, targeted));
  }

  static async onReady() {
    await this.ensureCurrentCombatantState();
    if (game.combat?.id) {
      this._lastActivationByCombat.set(
        game.combat.id,
        this.getActivationIdentity(game.combat, game.combat.combatant)
      );
    }
    this.renderOpenCharacterSheets();
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
    if (typeof combat.getCombatantByToken === "function") {
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
        ? (sameActivation(stored, activation) ? cloneStoredState(stored, activation) : defaultState(activation))
        : cloneStoredState(stored, activation))
      : defaultState(activation);
    state.actionLog = normalizeActionLog(state.actionLog);

    const burnValue = Math.max(0, Number(actor?.system?.burn?.value ?? 0));
    const burnPenalty = Math.floor(burnValue / 2);
    const overloaded = !!actor?.system?.burn?.overloaded;
    const statuses = this.getActiveStatuses(actor);
    const effects = statuses.filter(status => !(overloaded && status.id === "overloaded"));
    const modifierSummary = this.getModifierSummary(actor, burnPenalty);
    const rollImpact = this.getRollImpact(modifierSummary);
    const burnThisActivation = Math.max(0, Number(state.burnThisActivation ?? 0));
    const reason = !combatant
      ? "No combatant on the current scene."
      : !isCurrentTurn
        ? "Waiting for this combatant's activation."
        : "";

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
      targeting: this.getTargetingSnapshot(resolvedToken),
      states: overloaded ? [{ id: "overloaded", label: "Overloaded" }] : [],
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

  static async _executeReactionAction(actor, { token = null, action, metadata = {} } = {}) {
    const snapshot = this.getSnapshot(actor, { token });
    if (!snapshot.hasCombatant) return { ok: false, reason: "No combatant on the current scene." };
    if (snapshot.isCurrentTurn) return { ok: false, reason: "Only outside your activation." };

    const nextState = cloneStoredState(snapshot.combatant.getFlag(FLAG_SCOPE, FLAG_KEY), snapshot.state?.activation);
    const usesReaction = Number(nextState.raRemaining ?? 0) > 0;
    const runtime = {
      combat: snapshot.combat,
      combatant: snapshot.combatant,
      state: nextState,
      sceneId: canvas?.scene?.id ?? "",
      snapshot: { ...snapshot, state: nextState }
    };

    let burnDelta = 0;
    let costLabel = "1 RA";
    if (usesReaction) {
      nextState.raRemaining = Math.max(0, Number(nextState.raRemaining ?? 0) - 1);
    } else {
      const burnPhase = evaluateTraitPhase({
        actor,
        phase: "onBeforeBurnApplied",
        facts: buildBurnTraitFacts({
          actor,
          packet: {
            actionId: action.id,
            category: action.category,
            resource: "reaction",
            amount: 2,
            source: "reaction"
          },
          runtime,
        }),
        packet: {
          actionId: action.id,
          category: action.category,
          resource: "reaction",
          amount: 2,
          source: "reaction"
        },
        options: { runtime, consumeUsage: true },
      });
      burnDelta = Math.max(0, Number(burnPhase.packet.amount ?? 0) || 0);
      runtime.pendingMutations = (runtime.pendingMutations ?? []).concat(burnPhase.mutations);
      nextState.reactionBurnSinceLastActivation = Math.max(
        0,
        Number(nextState.reactionBurnSinceLastActivation ?? 0) + burnDelta
      );
      costLabel = `+${burnDelta} Burn`;
    }

    this._appendActionLog(nextState, {
      id: action.id,
      label: action.label,
      costLabel
    });

    if (runtime.pendingMutations?.length) {
      await applyTraitMutations({ actor, mutations: runtime.pendingMutations, runtime });
    } else {
      await snapshot.combatant.setFlag(FLAG_SCOPE, FLAG_KEY, nextState);
    }

    if (burnDelta > 0) {
      await actor.update({ "system.burn.value": Math.max(0, Number(actor.system?.burn?.value ?? 0) + burnDelta) });
    }

    return { ok: true, snapshot: this.getSnapshot(actor, { token }) };
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

    await combatant.setFlag(FLAG_SCOPE, FLAG_KEY, defaultState(activation));
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
      if (combat?.id) {
        this._lastActivationByCombat.set(combat.id, currentActivation);
      }
    }

    this.renderOpenCharacterSheets();
  }

  static async _onCreateCombatant(combatant) {
    const combat = combatant?.combat;
    if (combat?.combatant?.id === combatant?.id) {
      await this.ensureCurrentCombatantState();
    }
    this.renderOpenCharacterSheets();
  }

  static _onDeleteCombatant(_combatant) {
    this.renderOpenCharacterSheets();
  }

  static _onDeleteCombat(_combat) {
    if (_combat?.id) {
      this._lastActivationByCombat.delete(_combat.id);
    }
    this.renderOpenCharacterSheets();
  }

  static _onUpdateCombatant(combatant, changed) {
    if (foundry.utils.hasProperty(changed, `flags.${FLAG_SCOPE}.${FLAG_KEY}`)) {
      this.renderOpenCharacterSheets(combatant?.actor?.id);
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

    this.queueCharacterSheetRefresh();
  }

  static queueCharacterSheetRefresh(actorId = null) {
    if (this._targetRefreshTimeout) {
      clearTimeout(this._targetRefreshTimeout);
    }

    this._targetRefreshTimeout = setTimeout(() => {
      this._targetRefreshTimeout = null;
      this.renderOpenCharacterSheets(actorId);
    }, 0);
  }

  static _collectOpenCharacterSheetApps() {
    const apps = new Set();
    const addApps = actorLike => {
      for (const app of Object.values(actorLike?.apps ?? {})) {
        if (app?.actor?.type === "character") apps.add(app);
      }
    };

    for (const actor of Array.from(game.actors ?? [])) {
      addApps(actor);
    }

    for (const token of Array.from(canvas?.tokens?.placeables ?? [])) {
      addApps(token?.actor);
    }

    for (const app of Object.values(ui.windows ?? {})) {
      if (app?.actor?.type === "character") apps.add(app);
    }

    return Array.from(apps);
  }

  static renderOpenCharacterSheets(actorId = null) {
    const apps = this._collectOpenCharacterSheetApps();
    for (const app of apps) {
      if (actorId && app.actor?.id !== actorId) continue;
      if (typeof app.requestCombatDashboardRefresh === "function") {
        app.requestCombatDashboardRefresh();
        continue;
      }
      app.render({ force: true });
    }
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
