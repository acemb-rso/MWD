// src/modules/combat/personal-combat-tracker.js
// Purpose: Registers Foundry hooks: updateCombat, updateCombatant, createCombatant.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { humanizeStatusKey } from "../dialog/token-status-dialog.js";
import { getCommonCheckPayload } from "../roll/config/common-checks.js";

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

  if (tokenObject && Number.isFinite(x) && Number.isFinite(y) && typeof tokenObject.getCenter === "function") {
    return tokenObject.getCenter(x, y);
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
    const RayCtor = globalThis.Ray;

    if (!grid || !source || !target) return null;

    if (typeof grid.measureDistances === "function" && typeof RayCtor === "function") {
      try {
        const distances = grid.measureDistances([{ ray: new RayCtor(source, target) }], { gridSpaces: true });
        const distance = Number(Array.isArray(distances) ? distances[0] : NaN);
        if (Number.isFinite(distance)) return distance;
      } catch (_error) {
        // Fall through to newer grid APIs when available.
      }
    }

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
    const preferredSceneTokenDoc = this.getCurrentSceneTokenDocument(actor, token);
    const preferredSceneToken = preferredSceneTokenDoc?.object
      ?? this._getSceneTokenById(preferredSceneTokenDoc?.id ?? null);

    if (!combat || combat.scene?.id !== sceneId) {
      return {
        combat: null,
        combatant: null,
        token: preferredSceneToken,
        tokenDocument: preferredSceneTokenDoc
      };
    }

    let combatant = preferredSceneTokenDoc?.combatant?.combat?.id === combat.id
      ? preferredSceneTokenDoc.combatant
      : null;

    const combatants = Array.from(combat.combatants ?? []);
    if (!combatant) {
      const actorIds = this._collectActorIds(actor, preferredSceneTokenDoc);
      const matchingCombatants = combatants.filter(it => {
        const tokenId = String(it?.tokenId ?? "").trim();
        if (preferredSceneTokenDoc && tokenId === String(preferredSceneTokenDoc.id ?? "").trim()) return true;
        if (actorIds.has(String(it?.actorId ?? "").trim())) return true;

        const combatantTokenDoc = this._asTokenDocument(it?.token)
          ?? this._getSceneTokenDocumentById(tokenId, sceneId);

        return this._tokenDocumentMatchesActor(combatantTokenDoc, actor, actorIds);
      });

      const activeMatchingCombatant = matchingCombatants.find(it => it.id === combat?.combatant?.id) ?? null;
      const preferredTokenCombatant = matchingCombatants.find(it =>
        preferredSceneTokenDoc
        && String(it?.tokenId ?? "").trim() === String(preferredSceneTokenDoc.id ?? "").trim()
      ) ?? null;

      combatant = activeMatchingCombatant
        ?? preferredTokenCombatant
        ?? matchingCombatants[0]
        ?? null;
    }

    if (!combatant && combatants.length === 1 && (preferredSceneToken || actor)) {
      combatant = combatants[0];
    }

    const combatantTokenDoc = this._asTokenDocument(combatant?.token)
      ?? this._getSceneTokenDocumentById(combatant?.tokenId ?? null, sceneId);
    const resolvedTokenDoc = preferredSceneTokenDoc ?? combatantTokenDoc ?? null;
    const resolvedToken = preferredSceneToken
      ?? combatantTokenDoc?.object
      ?? this._getSceneTokenById(combatant?.tokenId ?? null)
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
    const state = (combatant && isCurrentTurn && sameActivation(stored, activation))
      ? cloneState(stored, activation)
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
    const notInCombatReason = snapshot.hasCombatant ? "" : "No current-scene combatant.";
    const notTurnReason = snapshot.isCurrentTurn ? "" : "Only during your activation.";
    const overloadedReason = snapshot.overloaded ? "Overloaded: only Burn recovery is allowed." : "";

    const saReason = notInCombatReason || notTurnReason || overloadedReason;
    const directSupported = [
      { id: "move", label: "Move", resource: "sa", cost: 1, supported: true },
      { id: "aim", label: "Aim", resource: "sa", cost: 1, supported: true },
      { id: "reload", label: "Reload", resource: "sa", cost: 1, supported: true },
      { id: "assist", label: "Assist", resource: "sa", cost: 1, supported: true },
      { id: "stand", label: "Stand", resource: "sa", cost: 1, supported: true }
    ].map(action => this._buildSpendAction(snapshot, action, saReason));

    const attackReason = notInCombatReason
      || notTurnReason
      || overloadedReason
      || (snapshot.state.saRemaining < 2 ? "Need 2 SA remaining." : "");

    const complexActions = [
      {
        id: "attack",
        label: "Attack",
        costLabel: "2 SA",
        handler: "combatAttack",
        disabled: !!attackReason,
        reason: attackReason,
        prominent: true
      },
      { id: "firstAid", label: "First Aid", costLabel: "2 SA" },
      { id: "emergencyRepair", label: "Emergency Repair", costLabel: "2 SA" }
    ].map(action => action.handler ? action : this._buildStubAction(action));

    const reduceBurnReason = notInCombatReason
      || notTurnReason
      || (snapshot.state.saRemaining <= 0 ? "No SA remaining." : "")
      || (snapshot.burn.value <= 0 ? "Burn is already at 0." : "");

    const overloadReason = notInCombatReason
      || notTurnReason
      || (!snapshot.burn.canOverloadCheck ? (snapshot.overloaded ? "Already Overloaded." : "Burn below 6.") : "");

    const resourceReason = notInCombatReason || notTurnReason;
    const buildCommonUtilityButton = (id) => {
      const payload = getCommonCheckPayload(id);
      if (!payload) return null;

      return {
        id,
        label: payload.label,
        handler: "roll",
        roll: JSON.stringify(payload),
        disabled: false,
        reason: ""
      };
    };

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
        { label: "FA", value: `${snapshot.state.faRemaining}` },
        { label: "RA", value: `${snapshot.state.raRemaining}` },
        { label: "Burn/Turn", value: `+${Math.max(0, Number(snapshot.state?.burnThisActivation ?? 0))}` }
      ],
      activationLog: normalizeActionLog(snapshot.state?.actionLog).map((entry, index) => ({
        ...entry,
        index: index + 1
      })),
      menus: [
        {
          id: "simple",
          label: "Simple Actions",
          actions: directSupported
        },
        {
          id: "burn",
          label: "Burn & Recovery",
          actions: [
            {
              id: "reduceBurn",
              label: "Reduce Burn",
              costLabel: "1 SA",
              handler: "combatReduceBurn",
              disabled: !!reduceBurnReason,
              reason: reduceBurnReason,
              prominent: snapshot.burn.value >= 6
            },
            {
              id: "overloadCheck",
              label: "Overload Check",
              costLabel: "Check",
              handler: "combatOverloadCheck",
              disabled: !!overloadReason,
              reason: overloadReason,
              roll: JSON.stringify({ intent: "overload" }),
              prominent: snapshot.burn.value >= 6
            }
          ]
        },
        {
          id: "complex",
          label: "Complex Actions",
          actions: complexActions
        },
        {
          id: "reaction",
          label: "Free & Reaction",
          actions: [
            this._buildSpendAction(snapshot, {
              id: "spendFA",
              label: "Spend FA",
              resource: "fa",
              cost: 1,
              supported: true
            }, resourceReason),
            this._buildSpendAction(snapshot, {
              id: "spendRA",
              label: "Spend RA",
              resource: "ra",
              cost: 1,
              supported: true
            }, resourceReason)
          ]
        }
      ]
    };
  }

  static _buildSpendAction(snapshot, action, sharedReason = "") {
    const remaining = Number(snapshot.state?.[`${action.resource}Remaining`] ?? 0);
    const insufficientReason = remaining < action.cost ? `No ${String(action.resource).toUpperCase()} remaining.` : "";
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
    actionCostLabel = ""
  } = {}) {
    const snapshot = this.getSnapshot(actor, { token });
    if (!snapshot.hasCombatant) {
      return { ok: false, reason: "No combatant on the current scene." };
    }
    if (!snapshot.isCurrentTurn) {
      return { ok: false, reason: "Only available during your activation." };
    }

    const remainingKey = `${resource}Remaining`;
    const remaining = Number(snapshot.state?.[remainingKey] ?? 0);
    if (remaining < cost) {
      return { ok: false, reason: `No ${String(resource).toUpperCase()} remaining.` };
    }

    const nextState = cloneState(snapshot.state, this.getActivationIdentity(snapshot.combat, snapshot.combatant));
    nextState[remainingKey] = Math.max(0, remaining - cost);

    if (resource === "sa") {
      nextState.saSpentThisActivation = Number(nextState.saSpentThisActivation ?? 0) + cost;
      if (actionId === "attack") {
        nextState.attacksThisActivation = Number(nextState.attacksThisActivation ?? 0) + 1;
      }
    }

    this._appendActionLog(nextState, {
      id: actionId,
      label: actionLabel,
      costLabel: actionCostLabel || this._formatCostLabel(resource, cost)
    });

    await snapshot.combatant.setFlag(FLAG_SCOPE, FLAG_KEY, nextState);
    return { ok: true, snapshot: this.getSnapshot(actor, { token: snapshot.token }) };
  }

  static async reduceBurn(actor, { token = null } = {}) {
    const snapshot = this.getSnapshot(actor, { token });
    if (!snapshot.hasCombatant) return { ok: false, reason: "No combatant on the current scene." };
    if (!snapshot.isCurrentTurn) return { ok: false, reason: "Only available during your activation." };
    if (snapshot.state.saRemaining <= 0) return { ok: false, reason: "No SA remaining." };
    if (snapshot.burn.value <= 0) return { ok: false, reason: "Burn is already at 0." };

    const spend = await this.spendResource(actor, {
      token: snapshot.token,
      resource: "sa",
      cost: 1,
      actionId: "reduceBurn",
      actionLabel: "Reduce Burn",
      actionCostLabel: "1 SA"
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

  static async _onUpdateCombat(combat, changed) {
    const touchedTurn = Object.prototype.hasOwnProperty.call(changed ?? {}, "turn")
      || Object.prototype.hasOwnProperty.call(changed ?? {}, "round");

    if (touchedTurn) {
      await this.ensureCurrentCombatantState();
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
