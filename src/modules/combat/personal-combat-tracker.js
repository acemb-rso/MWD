import { humanizeStatusKey } from "../dialog/token-status-dialog.js";

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

export class PersonalCombatTracker {
  static init() {
    Hooks.on("updateCombat", (combat, changed) => this._onUpdateCombat(combat, changed));
    Hooks.on("updateCombatant", (combatant, changed) => this._onUpdateCombatant(combatant, changed));
    Hooks.on("createCombatant", combatant => this._onCreateCombatant(combatant));
    Hooks.on("deleteCombatant", combatant => this._onDeleteCombatant(combatant));
    Hooks.on("deleteCombat", combat => this._onDeleteCombat(combat));
  }

  static async onReady() {
    await this.ensureCurrentCombatantState();
    this.renderOpenCharacterSheets();
  }

  static getPreferredToken(actor) {
    if (!actor) return null;

    const tokenActorToken = actor?.token?.object ?? null;
    if (tokenActorToken) return tokenActorToken;

    const tokenDocument = actor?.token ?? null;
    const tokenDocumentId = String(tokenDocument?.id ?? "").trim();
    if (tokenDocumentId) {
      const sceneToken = canvas?.tokens?.get?.(tokenDocumentId)
        ?? canvas?.tokens?.placeables?.find(token => token.id === tokenDocumentId)
        ?? null;
      if (sceneToken) return sceneToken;
    }

    const controlledToken = canvas?.tokens?.controlled?.find(token => token.actor?.id === actor.id) ?? null;
    if (controlledToken) return controlledToken;

    const activeTokens = actor.getActiveTokens?.(true, true) ?? [];
    const sceneToken = activeTokens.find(token => token.scene?.id === canvas?.scene?.id);
    return sceneToken ?? activeTokens[0] ?? null;
  }

  static getCurrentSceneToken(actor, token = null) {
    const sceneId = canvas?.scene?.id;
    const explicitToken = token ?? null;
    if (explicitToken?.scene?.id === sceneId) return explicitToken;

    const explicitTokenId = String(explicitToken?.id ?? explicitToken?.document?.id ?? "").trim();
    if (explicitTokenId) {
      const sceneToken = this._getSceneTokenById(explicitTokenId);
      if (sceneToken?.scene?.id === sceneId) return sceneToken;
    }

    const actorTokenId = String(actor?.token?.id ?? "").trim();
    if (actorTokenId) {
      const sceneToken = this._getSceneTokenById(actorTokenId);
      if (sceneToken?.scene?.id === sceneId) return sceneToken;
    }

    const preferredToken = this.getPreferredToken(actor);
    if (preferredToken?.scene?.id === sceneId) return preferredToken;

    const activeTokens = actor?.getActiveTokens?.(true, true) ?? [];
    return activeTokens.find(it => it.scene?.id === sceneId) ?? null;
  }

  static _getSceneTokenById(tokenId) {
    if (!tokenId) return null;
    return canvas?.tokens?.get?.(tokenId)
      ?? canvas?.tokens?.placeables?.find(token => token.id === tokenId)
      ?? null;
  }

  static getCombat(actor, token = null) {
    const sceneId = canvas?.scene?.id;
    const combat = game.combat;
    const preferredSceneToken = this.getCurrentSceneToken(actor, token);

    if (!combat || combat.scene?.id !== sceneId) {
      return { combat: null, combatant: null, token: preferredSceneToken };
    }

    const combatants = Array.from(combat.combatants ?? []);
    const candidateTokenIds = new Set(
      [
        token?.id,
        token?.document?.id,
        preferredSceneToken?.id,
        actor?.token?.id,
        actor?.token?.object?.id
      ]
        .map(value => String(value ?? "").trim())
        .filter(Boolean)
    );

    const candidateActorIds = new Set(
      [
        actor?.id,
        actor?._id,
        actor?.token?.actorId,
        actor?.token?.baseActor?.id,
        actor?.token?.actor?.id
      ]
        .map(value => String(value ?? "").trim())
        .filter(Boolean)
    );

    const tokenCombatants = combatants.filter(it => candidateTokenIds.has(String(it?.tokenId ?? "").trim()));
    const actorCombatants = combatants.filter(it => candidateActorIds.has(String(it?.actorId ?? "").trim()));
    const matchingCombatants = Array.from(new Set([...tokenCombatants, ...actorCombatants]));
    const activeMatchingCombatant = matchingCombatants.find(it => it.id === combat?.combatant?.id) ?? null;

    let combatant = activeMatchingCombatant
      ?? tokenCombatants[0]
      ?? actorCombatants[0]
      ?? null;

    if (!combatant && combatants.length === 1 && (preferredSceneToken || actor)) {
      combatant = combatants[0];
    }

    const combatantToken = this._getSceneTokenById(combatant?.tokenId ?? null);
    const resolvedToken = preferredSceneToken ?? combatantToken ?? null;

    return { combat, combatant, token: resolvedToken };
  }

  static getSnapshot(actor, { token = null } = {}) {
    const { combat, combatant, token: resolvedToken } = this.getCombat(actor, token);
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
    const reason = !combatant
      ? "No combatant on the current scene."
      : !isCurrentTurn
        ? "Waiting for this combatant's activation."
        : "";

    return {
      token: resolvedToken,
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
      statuses,
      summaryText: `SA: ${state.saRemaining} / ${BASE_SA}   FA: ${state.faRemaining}   RA: ${state.raRemaining}`,
      inactiveReason: reason,
      modifierSummary: this.getModifierSummary(actor, burnPenalty)
    };
  }

  static getModifierSummary(actor, burnPenalty = Math.floor(Number(actor?.system?.burn?.value ?? 0) / 2)) {
    const condition = actor?.system?.derived?.condition ?? {};
    const entries = [];

    entries.push({
      label: "Burn Penalty",
      value: burnPenalty > 0 ? `-${burnPenalty}` : "0"
    });

    const fatiguePenalty = Number(condition.fatiguePenalty ?? 0);
    if (fatiguePenalty) {
      entries.push({ label: "Fatigue", value: `${fatiguePenalty}` });
    }

    const physicalPenalty = Number(condition.physicalPenalty ?? 0);
    if (physicalPenalty) {
      entries.push({ label: "Physical", value: `${physicalPenalty}` });
    }

    if (!entries.length) {
      entries.push({ label: "Modifiers", value: "0" });
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

    const complexActions = [
      { id: "complexAttack", label: "Complex Attack", costLabel: "2 SA" },
      { id: "firstAid", label: "First Aid", costLabel: "2 SA" },
      { id: "emergencyRepair", label: "Emergency Repair", costLabel: "2 SA" }
    ].map(action => this._buildStubAction(action));

    const reduceBurnReason = notInCombatReason
      || notTurnReason
      || (snapshot.state.saRemaining <= 0 ? "No SA remaining." : "")
      || (snapshot.burn.value <= 0 ? "Burn is already at 0." : "");

    const overloadReason = notInCombatReason
      || notTurnReason
      || (!snapshot.burn.canOverloadCheck ? (snapshot.overloaded ? "Already Overloaded." : "Burn below 6.") : "");

    const resourceReason = notInCombatReason || notTurnReason;

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
        }
      ],
      summaryPills: [
        { label: "SA", value: `${snapshot.state.saRemaining}/${BASE_SA}` },
        { label: "FA", value: `${snapshot.state.faRemaining}` },
        { label: "RA", value: `${snapshot.state.raRemaining}` }
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

  static renderOpenCharacterSheets(actorId = null) {
    const apps = Object.values(ui.windows ?? {}).filter(app => app?.actor?.type === "character");
    for (const app of apps) {
      if (actorId && app.actor?.id !== actorId) continue;
      app.render(false);
    }
  }
}
