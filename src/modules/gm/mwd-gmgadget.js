// src/modules/gm/mwd-gmgadget.js
// Purpose: Registers system settings. Preloads or manages Handlebars templates.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { HARM_DAMAGE_TYPE_OPTIONS, HarmEngine } from "../harm/harm-engine.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export const MWD_GM_GADGET_APP_ID = "mwd-gmgadget";

export const SETTING_DN_PRESETS = "gmDnPresets";
export const SETTING_NEXT_DN = "gmNextDn";
export const SETTING_ANNOUNCE = "gmDnAnnounceToChat";

const DEFAULT_DN_PRESETS = Object.freeze([
  { label: "Standard", dn: 1 },
  { label: "Challenging", dn: 2 },
  { label: "Hard", dn: 3 },
  { label: "Extreme", dn: 4 }
]);

const TEMPLATE_GM_GADGET = "systems/mwd/templates/v2/mwd-gmgadget.hbs";

const DEFAULT_HARM_STATE = Object.freeze({
  actorId: "",
  mode: "physical",
  delta: 1,
  useArmor: false,
  damageType: "concussive",
  statusId: "",
  statusActive: true,
  source: "",
  notes: ""
});

function parseLegacyDnPresetString(value = "") {
  return String(value ?? "")
    .split(",")
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [a, b] = chunk.split(":").map((s) => (s ?? "").trim());
      const label = a || "DN";
      const dn = Number.isFinite(Number(b)) ? Number(b) : Number(a);
      return {
        label,
        dn: Number.isFinite(dn) ? Math.max(0, Math.trunc(dn)) : null
      };
    })
    .filter((p) => Number.isFinite(p.dn));
}

function createDnPresetValidationError(messages = []) {
  const error = new Error(messages[0] ?? "Invalid GM DN presets.");
  error.validationErrors = Array.isArray(messages) ? messages.filter(Boolean) : [];
  return error;
}

export function getDefaultDnPresets() {
  return foundry.utils.deepClone(DEFAULT_DN_PRESETS);
}

export function normalizeDnPresetCollection(value, { strict = false } = {}) {
  const source = typeof value === "string"
    ? parseLegacyDnPresetString(value)
    : Array.isArray(value)
      ? value
      : [];

  const normalized = [];
  const errors = [];
  const seenLabels = new Set();

  source.forEach((entry, index) => {
    const label = String(entry?.label ?? "").trim();
    const rawDn = entry?.dn;
    const prefix = `Preset ${index + 1}`;

    if (!label) {
      if (strict) errors.push(`${prefix}: label cannot be blank.`);
      return;
    }

    const labelKey = label.toLowerCase();
    if (seenLabels.has(labelKey)) {
      if (strict) errors.push(`${prefix}: duplicate label "${label}".`);
      return;
    }

    const dn = Number(rawDn);
    if (!Number.isFinite(dn)) {
      if (strict) errors.push(`${prefix}: DN must be numeric.`);
      return;
    }

    if (dn < 0) {
      if (strict) errors.push(`${prefix}: DN cannot be negative.`);
      return;
    }

    seenLabels.add(labelKey);
    normalized.push({
      label,
      dn: Math.trunc(dn)
    });
  });

  if (strict && errors.length) throw createDnPresetValidationError(errors);
  return normalized;
}

function cloneHarmState(state = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(DEFAULT_HARM_STATE),
    state ?? {},
    { inplace: false, overwrite: true }
  );
}

function describeSceneTarget(target) {
  if (!target?.token || !target?.actor) {
    return {
      label: "No scene target",
      reason: String(target?.reason ?? "No controlled or targeted token."),
      supported: false
    };
  }

  const tokenLabel = String(target.token?.name ?? target.actor?.name ?? "Token").trim();
  return {
    label: tokenLabel,
    reason: "",
    supported: true
  };
}

function describeEffectiveTarget(target) {
  if (!target?.actor) {
    return {
      label: "No target selected",
      source: "",
      reason: String(target?.reason ?? "Choose a supported character target.")
    };
  }

  const source = target.source === "scene" || target.source === "token"
    ? "Scene target"
    : "Actor fallback";

  return {
    label: String(target.actor?.name ?? "Character").trim() || "Character",
    source,
    reason: ""
  };
}

function normalizeStatusOptions(actor) {
  return HarmEngine.getStatusOptions(actor);
}

export function registerMWDGMGadgetSettings(systemId = "mwd") {
  game.settings.register(systemId, SETTING_NEXT_DN, {
    scope: "client",
    config: false,
    type: Number,
    default: 1
  });

  game.settings.register(systemId, SETTING_ANNOUNCE, {
    scope: "client",
    config: true,
    name: "Announce GM DN changes to chat",
    hint: "If enabled, posts a small chat notice when you change the current DN preset.",
    type: Boolean,
    default: false
  });
}

export class MWDGMGadget extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: MWD_GM_GADGET_APP_ID,
    classes: ["mwd-gmgadget"],
    window: {
      title: "MWD GM Gadget",
      popOut: true,
      resizable: true
    },
    position: {
      width: 440,
      height: 620
    },
    actions: {
      switchTab: MWDGMGadget.prototype._onSwitchTab,
      setDn: MWDGMGadget.prototype._onSetDn,
      clearDn: MWDGMGadget.prototype._onClearDn,
      toggleAnnounce: MWDGMGadget.prototype._onToggleAnnounce,
      harmInputChange: MWDGMGadget.prototype._onHarmInputChange,
      refreshHarmTarget: MWDGMGadget.prototype._onRefreshHarmTarget,
      applyHarm: MWDGMGadget.prototype._onApplyHarm
    }
  };

  static PARTS = {
    body: { template: TEMPLATE_GM_GADGET }
  };

  constructor({ systemId = "mwd", ...options } = {}) {
    super(options);
    this.systemId = systemId;
    this.activeTab = "difficulty";
    this.harmState = cloneHarmState();
  }

  async render(options = {}) {
    if (!game.user?.isGM) return this;
    return super.render(options);
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const presets = normalizeDnPresetCollection(
      game.settings.get(this.systemId, SETTING_DN_PRESETS),
      { strict: false }
    );
    const currentDn = Number(game.settings.get(this.systemId, SETTING_NEXT_DN) ?? 1);
    const announce = Boolean(game.settings.get(this.systemId, SETTING_ANNOUNCE));

    const actorOptions = HarmEngine.getActorOptions();
    const sceneTarget = HarmEngine.getSceneTarget();
    const fallbackActor = this.harmState.actorId
      ? game.actors?.get?.(this.harmState.actorId) ?? null
      : null;
    const effectiveTarget = HarmEngine.resolveTarget({
      actor: fallbackActor,
      actorId: this.harmState.actorId,
      preferSceneTarget: true
    });
    const statusOptions = normalizeStatusOptions(effectiveTarget.actor ?? fallbackActor ?? null);
    const harmState = cloneHarmState(this.harmState);
    if (!harmState.statusId && statusOptions.length) {
      harmState.statusId = statusOptions[0].value;
      this.harmState.statusId = harmState.statusId;
    }

    return foundry.utils.mergeObject(context, {
      presets,
      currentDn,
      currentTab: this.activeTab,
      announce,
      isGM: game.user?.isGM ?? false,
      harm: {
        state: harmState,
        actorOptions,
        modes: HarmEngine.MODE_OPTIONS,
        damageTypes: HARM_DAMAGE_TYPE_OPTIONS,
        statusOptions,
        sceneTarget: describeSceneTarget(sceneTarget),
        effectiveTarget: describeEffectiveTarget(effectiveTarget),
        canApply: Boolean(effectiveTarget.actor),
        applyReason: effectiveTarget.reason || "",
        useArmorAvailable: harmState.mode === "physical" || harmState.mode === "fatigue",
        showDamageType: (harmState.mode === "physical" || harmState.mode === "fatigue") && harmState.useArmor,
        showStatusFields: harmState.mode === "status",
        showDeltaFields: harmState.mode !== "status"
      }
    });
  }

  _getRootElement() {
    return (this.element instanceof HTMLElement) ? this.element : this.element?.[0];
  }

  _captureHarmStateFromDom(target = null) {
    const root = target?.closest?.(".mwd-gmgadget__root") ?? this._getRootElement();
    if (!(root instanceof HTMLElement)) return this.harmState;

    const readValue = (selector, fallback = "") => {
      const el = root.querySelector(selector);
      return el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement
        ? el.value
        : fallback;
    };
    const readChecked = (selector, fallback = false) => {
      const el = root.querySelector(selector);
      return el instanceof HTMLInputElement ? el.checked : fallback;
    };

    this.harmState = cloneHarmState({
      actorId: readValue('[name="harm-actorId"]', this.harmState.actorId),
      mode: readValue('[name="harm-mode"]', this.harmState.mode),
      delta: Number(readValue('[name="harm-delta"]', this.harmState.delta)),
      useArmor: readChecked('[name="harm-useArmor"]', this.harmState.useArmor),
      damageType: readValue('[name="harm-damageType"]', this.harmState.damageType),
      statusId: readValue('[name="harm-statusId"]', this.harmState.statusId),
      statusActive: readValue('[name="harm-statusActive"]', this.harmState.statusActive ? "add" : "remove") !== "remove",
      source: readValue('[name="harm-source"]', this.harmState.source),
      notes: readValue('[name="harm-notes"]', this.harmState.notes)
    });

    if (!Number.isFinite(Number(this.harmState.delta))) {
      this.harmState.delta = DEFAULT_HARM_STATE.delta;
    }

    return this.harmState;
  }

  async _onSetDn(event, target) {
    event.preventDefault();
    event.stopPropagation();

    if (!game.user?.isGM) return;

    const dn = Math.max(0, Math.trunc(Number(target?.dataset?.dn ?? NaN)));
    if (!Number.isFinite(dn)) return;

    await game.settings.set(this.systemId, SETTING_NEXT_DN, dn);

    const announce = Boolean(game.settings.get(this.systemId, SETTING_ANNOUNCE));
    if (announce) {
      const label = String(target?.dataset?.label ?? `DN ${dn}`);
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ user: game.user }),
        content: `<div class="mwd-gm-notice"><b>GM Difficulty:</b> ${foundry.utils.escapeHTML(label)} (DN ${dn} hits)</div>`
      });
    }

    return this.render({ parts: ["body"] });
  }

  async _onSwitchTab(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const nextTab = String(target?.dataset?.tab ?? "").trim();
    if (!nextTab || nextTab === this.activeTab) return;

    this._captureHarmStateFromDom(target);
    this.activeTab = nextTab;
    return this.render({ parts: ["body"] });
  }

  async _onClearDn(event, target) {
    event.preventDefault();
    event.stopPropagation();

    if (!game.user?.isGM) return;
    await game.settings.set(this.systemId, SETTING_NEXT_DN, 1);
    return this.render({ parts: ["body"] });
  }

  async _onToggleAnnounce(event, target) {
    event.preventDefault();
    event.stopPropagation();

    if (!game.user?.isGM) return;
    const next = !Boolean(game.settings.get(this.systemId, SETTING_ANNOUNCE));
    await game.settings.set(this.systemId, SETTING_ANNOUNCE, next);
    return this.render({ parts: ["body"] });
  }

  async _onHarmInputChange(event, target) {
    event?.preventDefault?.();
    this._captureHarmStateFromDom(target);

    const key = String(target?.dataset?.harmKey ?? "").trim();
    if (["actorId", "mode", "useArmor"].includes(key)) {
      return this.render({ parts: ["body"] });
    }
  }

  async _onRefreshHarmTarget(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    this._captureHarmStateFromDom(target);
    return this.render({ parts: ["body"] });
  }

  async _onApplyHarm(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!game.user?.isGM) return;

    const state = this._captureHarmStateFromDom(target);
    const payload = this._buildHarmPayload(state);
    if (!payload) {
      ui.notifications?.warn("Choose a valid harm action before applying it.");
      return;
    }

    const result = await HarmEngine.apply({
      payload,
      options: {
        actorId: state.actorId,
        preferSceneTarget: true,
        logToChat: true
      }
    });

    if (!result?.ok) {
      ui.notifications?.warn(result?.reason ?? "Unable to apply harm.");
      return this.render({ parts: ["body"] });
    }

    return this.render({ parts: ["body"] });
  }

  _buildHarmPayload(state) {
    const source = String(state?.source ?? "").trim();
    const notes = String(state?.notes ?? "").trim();
    const mode = String(state?.mode ?? "").trim();

    if (mode === "status") {
      const statusId = String(state?.statusId ?? "").trim();
      if (!statusId) return null;
      return {
        mode: "status",
        statusId,
        active: Boolean(state?.statusActive),
        source,
        notes
      };
    }

    if (mode === "burn") {
      return {
        mode: "burnDelta",
        delta: normalizeNumber(state?.delta, DEFAULT_HARM_STATE.delta),
        source,
        notes
      };
    }

    if (mode === "physical" || mode === "fatigue") {
      return {
        mode: "trackDelta",
        track: mode,
        delta: normalizeNumber(state?.delta, DEFAULT_HARM_STATE.delta),
        useArmor: Boolean(state?.useArmor),
        damageType: state?.damageType ?? DEFAULT_HARM_STATE.damageType,
        source,
        notes
      };
    }

    return null;
  }
}

function normalizeNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? Math.trunc(numeric) : fallback;
}

let _instance = null;

export function getMWDGMGadget({ systemId = "mwd" } = {}) {
  if (!_instance) _instance = new MWDGMGadget({ systemId });
  return _instance;
}
