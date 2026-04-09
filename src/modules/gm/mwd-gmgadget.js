// src/modules/gm/mwd-gmgadget.js
// Purpose: Registers system settings. Preloads or manages Handlebars templates.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { HARM_DAMAGE_TYPE_OPTIONS, HarmEngine } from "../harm/harm-engine.js";
import {
  EXPOSURE_TIERS,
  createRegionShapesFromTemplatePlacement,
  getExposureLabel,
  normalizeHazardDefinition,
} from "../area-effects/area-effect-engine.js";
import { HAZARD_REGION_FLAG } from "../area-effects/hazard-regions.js";
import {
  SCENE_MODIFIERS_FLAG,
  SCENE_MODIFIER_ATTRIBUTE_OPTIONS,
  SCENE_MODIFIER_INTENT_OPTIONS,
  normalizeActiveModifier
} from "../modifiers/providers/scene-modifiers.js";
import { SETTING_SCENE_MODIFIER_TEMPLATES } from "../settings/scene-modifier-template-settings.js";

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

const DEFAULT_HAZARD_STATE = Object.freeze({
  label: "Hazard Zone",
  startExposure: EXPOSURE_TIERS.minor,
  escalationRate: 1,
  escalationIntervalTurns: 1,
  escalationMax: EXPOSURE_TIERS.full,
  onFullBurnDelta: 0,
  clearOnExit: true,
  damage: 6,
  ap: 0,
  damageType: "thermal",
  color: "#d86a2c"
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

function cloneHazardState(state = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(DEFAULT_HAZARD_STATE),
    state ?? {},
    { inplace: false, overwrite: true }
  );
}

function getSelectedMeasuredTemplate() {
  const controlled = Array.from(canvas?.templates?.controlled ?? []);
  if (controlled.length > 0) return controlled[0]?.document ?? controlled[0] ?? null;
  const hovered = canvas?.activeLayer?.controlled?.[0];
  return hovered?.document ?? hovered ?? null;
}

function describeSelectedHazardTemplate(templateDoc = null) {
  const doc = templateDoc?.document ?? templateDoc ?? null;
  if (!doc) {
    return {
      label: "No template selected",
      reason: "Select a measured template on the current scene to turn it into a hazard region.",
      supported: false
    };
  }

  const rawType = String(doc.t ?? doc.type ?? "").trim().toLowerCase();
  const shape = rawType === "circle" ? "blast" : rawType === "cone" ? "cone" : rawType === "ray" ? "line" : "";
  if (!shape) {
    return {
      label: "Unsupported template",
      reason: `The selected template type "${rawType || "unknown"}" is not supported for hazard conversion yet.`,
      supported: false
    };
  }

  return {
    label: `${shape.toUpperCase()} ${Number(doc.distance ?? 0) || 0}${canvas?.scene?.grid?.units ? ` ${canvas.scene.grid.units}` : ""}`.trim(),
    reason: "",
    supported: true
  };
}

function buildTemplatePlacementFromMeasuredTemplate(templateDoc = null) {
  const doc = templateDoc?.document ?? templateDoc ?? null;
  if (!doc) return null;

  const rawType = String(doc.t ?? doc.type ?? "").trim().toLowerCase();
  const shape = rawType === "circle" ? "blast" : rawType === "cone" ? "cone" : rawType === "ray" ? "line" : "";
  if (!shape) return null;

  return {
    template: {
      shape,
      distance: Number(doc.distance ?? 0) || 0,
      size: Number(doc.distance ?? 0) || 0,
    },
    placement: {
      shape,
      anchor: {
        x: Number(doc.x ?? 0) || 0,
        y: Number(doc.y ?? 0) || 0,
      },
      distance: Number(doc.distance ?? 0) || 0,
      direction: Number(doc.direction ?? 0) || 0,
      angle: Number(doc.angle ?? 90) || 90,
    }
  };
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
      applyHarm: MWDGMGadget.prototype._onApplyHarm,
      hazardInputChange: MWDGMGadget.prototype._onHazardInputChange,
      refreshHazardTemplate: MWDGMGadget.prototype._onRefreshHazardTemplate,
      createHazard: MWDGMGadget.prototype._onCreateHazard,
      addSceneModifierFromPreset: MWDGMGadget.prototype._onAddSceneModifierFromPreset,
      addSceneModifierAdhoc: MWDGMGadget.prototype._onAddSceneModifierAdhoc,
      toggleSceneModifier: MWDGMGadget.prototype._onToggleSceneModifier,
      removeSceneModifier: MWDGMGadget.prototype._onRemoveSceneModifier,
      clearSceneModifiers: MWDGMGadget.prototype._onClearSceneModifiers
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
    this.hazardState = cloneHazardState();
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

    const sceneTemplates = normalizeSceneModifierTemplates(
      game.settings.get(this.systemId, SETTING_SCENE_MODIFIER_TEMPLATES)
    );
    const activeSceneModifiers = normalizeActiveSceneModifiers(
      canvas?.scene?.getFlag("mwd", SCENE_MODIFIERS_FLAG)
    );
    const selectedHazardTemplate = getSelectedMeasuredTemplate();
    const hazardTemplateSummary = describeSelectedHazardTemplate(selectedHazardTemplate);
    const hazardState = cloneHazardState(this.hazardState);

    return foundry.utils.mergeObject(context, {
      presets,
      currentDn,
      currentTab: this.activeTab,
      announce,
      isGM: game.user?.isGM ?? false,
      scene: {
        hasScene: !!canvas?.scene,
        templates: sceneTemplates,
        activeModifiers: activeSceneModifiers,
        attributeFilterOptions: SCENE_MODIFIER_ATTRIBUTE_OPTIONS,
        intentFilterOptions: SCENE_MODIFIER_INTENT_OPTIONS
      },
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
      },
      hazard: {
        state: hazardState,
        template: hazardTemplateSummary,
        exposureTiers: [
          { value: EXPOSURE_TIERS.minor, label: "Minor" },
          { value: EXPOSURE_TIERS.major, label: "Major" },
          { value: EXPOSURE_TIERS.full, label: "Full" }
        ],
        damageTypes: HARM_DAMAGE_TYPE_OPTIONS,
        canCreate: Boolean(canvas?.scene && hazardTemplateSummary.supported),
        createReason: hazardTemplateSummary.reason || ""
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
    this._captureHazardStateFromDom(target);
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

  _captureHazardStateFromDom(target = null) {
    const root = target?.closest?.(".mwd-gmgadget__root") ?? this._getRootElement();
    if (!(root instanceof HTMLElement)) return this.hazardState;

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

    this.hazardState = cloneHazardState({
      label: readValue('[name="hazard-label"]', this.hazardState.label),
      startExposure: readValue('[name="hazard-startExposure"]', this.hazardState.startExposure),
      escalationRate: Number(readValue('[name="hazard-escalationRate"]', this.hazardState.escalationRate)),
      escalationIntervalTurns: Number(readValue('[name="hazard-escalationIntervalTurns"]', this.hazardState.escalationIntervalTurns)),
      escalationMax: readValue('[name="hazard-escalationMax"]', this.hazardState.escalationMax),
      onFullBurnDelta: Number(readValue('[name="hazard-onFullBurnDelta"]', this.hazardState.onFullBurnDelta)),
      clearOnExit: readChecked('[name="hazard-clearOnExit"]', this.hazardState.clearOnExit),
      damage: Number(readValue('[name="hazard-damage"]', this.hazardState.damage)),
      ap: Number(readValue('[name="hazard-ap"]', this.hazardState.ap)),
      damageType: readValue('[name="hazard-damageType"]', this.hazardState.damageType),
      color: readValue('[name="hazard-color"]', this.hazardState.color),
    });

    return this.hazardState;
  }

  async _onHazardInputChange(event, target) {
    event?.preventDefault?.();
    this._captureHazardStateFromDom(target);
  }

  async _onRefreshHazardTemplate(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    this._captureHazardStateFromDom(target);
    return this.render({ parts: ["body"] });
  }

  async _onCreateHazard(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!game.user?.isGM) return;

    const state = this._captureHazardStateFromDom(target);
    const templateDoc = getSelectedMeasuredTemplate();
    const templatePlacement = buildTemplatePlacementFromMeasuredTemplate(templateDoc);
    if (!canvas?.scene || !templatePlacement) {
      ui.notifications?.warn("Select a supported measured template before creating a hazard.");
      return;
    }

    const hazardDef = normalizeHazardDefinition({
      startExposure: state.startExposure,
      escalation: {
        rate: Number(state.escalationRate ?? 1) || 1,
        intervalTurns: Number(state.escalationIntervalTurns ?? 1) || 1,
        max: state.escalationMax,
      },
      onFull: {
        burnDelta: Number(state.onFullBurnDelta ?? 0) || 0,
      },
      clearOnExit: Boolean(state.clearOnExit),
    });
    const shapes = createRegionShapesFromTemplatePlacement(templatePlacement);
    if (!shapes.length) {
      ui.notifications?.warn("Unable to convert the selected template into a Region shape.");
      return;
    }

    await canvas.scene.createEmbeddedDocuments("Region", [{
      name: String(state.label ?? "Hazard Zone").trim() || "Hazard Zone",
      color: String(state.color ?? "#d86a2c").trim() || "#d86a2c",
      shapes,
      flags: {
        mwd: {
          [HAZARD_REGION_FLAG]: {
            sourceActorUuid: null,
            sourceItemUuid: null,
            payloadId: "gm-hazard",
            templatePlacement: foundry.utils.deepClone(templatePlacement.placement),
            template: foundry.utils.deepClone(templatePlacement.template),
            damage: Math.max(0, Number(state.damage ?? 0) || 0),
            ap: Math.max(0, Number(state.ap ?? 0) || 0),
            damageType: String(state.damageType ?? "thermal").trim() || "thermal",
            label: `${String(state.label ?? "Hazard Zone").trim() || "Hazard Zone"} (${getExposureLabel(hazardDef.startExposure)})`,
            areaEffect: {
              kind: "persistent",
              hazard: hazardDef,
            },
            hazardDef,
          }
        }
      }
    }]);

    ui.notifications?.info("Hazard region created from the selected template.");
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

  // ---- Scene modifier actions ----

  async _onAddSceneModifierFromPreset(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!game.user?.isGM) return;

    const root = target?.closest?.(".mwd-gmgadget__root") ?? this._getRootElement();
    const selectEl = root instanceof HTMLElement
      ? root.querySelector('select[name="scene-preset-index"]')
      : null;
    const index = selectEl instanceof HTMLSelectElement ? Number(selectEl.value) : NaN;

    const templates = normalizeSceneModifierTemplates(
      game.settings.get(this.systemId, SETTING_SCENE_MODIFIER_TEMPLATES)
    );
    const template = Number.isFinite(index) ? templates[index] : null;
    if (!template) return;

    await this._mutateSceneModifiers(mods => [
      ...mods,
      {
        id: foundry.utils.randomID(),
        label: template.label,
        value: template.value,
        enabled: true,
        attributeFilter: template.attributeFilter || null,
        intentFilter: template.intentFilter || null,
        source: "preset"
      }
    ]);
  }

  async _onAddSceneModifierAdhoc(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!game.user?.isGM) return;

    const entry = this._captureAdhocFormFromDom(target);
    if (!entry) {
      ui.notifications?.warn("Label and a numeric value are required.");
      return;
    }

    await this._mutateSceneModifiers(mods => [...mods, entry]);
  }

  async _onToggleSceneModifier(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!game.user?.isGM) return;

    const id = String(target?.dataset?.modId ?? "").trim();
    if (!id) return;

    await this._mutateSceneModifiers(mods =>
      mods.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m)
    );
  }

  async _onRemoveSceneModifier(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!game.user?.isGM) return;

    const id = String(target?.dataset?.modId ?? "").trim();
    if (!id) return;

    await this._mutateSceneModifiers(mods => mods.filter(m => m.id !== id));
  }

  async _onClearSceneModifiers(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!game.user?.isGM) return;
    await this._mutateSceneModifiers(() => []);
  }

  async _mutateSceneModifiers(mutatorFn) {
    const scene = canvas?.scene;
    if (!scene) return;

    const current = normalizeActiveSceneModifiers(scene.getFlag("mwd", SCENE_MODIFIERS_FLAG));
    const next = await mutatorFn(current);
    await scene.setFlag("mwd", SCENE_MODIFIERS_FLAG, next);
    return this.render({ parts: ["body"] });
  }

  _captureAdhocFormFromDom(target) {
    const root = target?.closest?.(".mwd-gmgadget__root") ?? this._getRootElement();
    if (!(root instanceof HTMLElement)) return null;

    const readValue = selector => {
      const el = root.querySelector(selector);
      return el instanceof HTMLInputElement || el instanceof HTMLSelectElement ? el.value : "";
    };

    const label = readValue('[name="scene-adhoc-label"]').trim();
    const rawValue = readValue('[name="scene-adhoc-value"]').trim();
    const attributeFilter = readValue('[name="scene-adhoc-attributeFilter"]').trim() || null;
    const intentFilter = readValue('[name="scene-adhoc-intentFilter"]').trim() || null;

    if (!label) return null;
    const value = Number(rawValue);
    if (!Number.isFinite(value)) return null;

    return {
      id: foundry.utils.randomID(),
      label,
      value: Math.trunc(value),
      enabled: true,
      attributeFilter,
      intentFilter,
      source: "adhoc"
    };
  }
}

function normalizeSceneModifierTemplates(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter(t => t?.label && Number.isFinite(Number(t?.value)))
    .map((t, index) => {
      const value = Math.trunc(Number(t.value));
      return {
        index,
        label: String(t.label).trim(),
        value,
        signedValue: value >= 0 ? `+${value}` : String(value),
        attributeFilter: String(t.attributeFilter ?? "").trim() || null,
        intentFilter: String(t.intentFilter ?? "").trim() || null
      };
    });
}

function normalizeActiveSceneModifiers(value) {
  if (!Array.isArray(value)) return [];
  return value.map(entry => {
    const mod = normalizeActiveModifier(entry);
    const attrLabel = SCENE_MODIFIER_ATTRIBUTE_OPTIONS.find(o => o.value === (mod.attributeFilter ?? ""))?.label ?? null;
    const intentLabel = SCENE_MODIFIER_INTENT_OPTIONS.find(o => o.value === (mod.intentFilter ?? ""))?.label ?? null;
    return {
      ...mod,
      attributeFilterLabel: mod.attributeFilter ? attrLabel : null,
      intentFilterLabel: mod.intentFilter ? intentLabel : null,
      signedValue: mod.value >= 0 ? `+${mod.value}` : String(mod.value),
      isPositive: mod.value > 0
    };
  });
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
