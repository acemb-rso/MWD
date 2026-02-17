// src/modules/gm/mwd-gmgadget.js
//
// AppV2 GM Gadget (GM-only) for setting "next roll DN (hits needed)" presets.
// - Does NOT roll dice.
// - Stores presets in a world setting (configurable).
// - Stores selected DN in a client setting for quick reuse.
// - Optional: posts a lightweight chat notice when GM changes DN.
//
// Wiring expectations:
// - Your roll dialog can default payload.dn from game.settings.get(SYSTEM_ID, SETTING_NEXT_DN)
//   if payload.dn isn't already provided.
// - Or provide a "Use GM DN" button in the dialog that reads the setting.

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export const MWD_GM_GADGET_APP_ID = "mwd-gmgadget";

// Settings keys
export const SETTING_DN_PRESETS = "gmDnPresets";        // world: "Standard:1,Hard:3"
export const SETTING_NEXT_DN = "gmNextDn";             // client: number
export const SETTING_ANNOUNCE = "gmDnAnnounceToChat";  // client: boolean

// Template path (keep legacy-style pathing for now; swap to partial alias later if you want)
const TEMPLATE_GM_GADGET = "systems/mwd/templates/v2/mwd-gmgadget.hbs";

/**
 * Parse "Label:Value,Label:Value" into [{label, dn}]
 */
function parseDnPresets(str) {
  const raw = typeof str === "string" ? str : "";
  return raw
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

/**
 * Register settings used by the GM gadget.
 * Call this once in system init/ready.
 */
export function registerMWDGMGadgetSettings(systemId = "mwd") {
  game.settings.register(systemId, SETTING_DN_PRESETS, {
    scope: "world",
    config: true,
    name: "GM Difficulty Presets (DN hits)",
    hint: "Comma-separated list like: Standard:1,Challenging:2,Hard:3,Extreme:4",
    type: String,
    default: "Standard:1,Challenging:2,Hard:3,Extreme:4"
  });

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

/**
 * GM Gadget application (GM-only).
 */
export class MWDGMGadget extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: MWD_GM_GADGET_APP_ID,
    classes: ["mwd-gmgadget"],
    window: {
      title: "MWD GM Gadget",
      popOut: true,
      resizable: false
    },
    position: {
      width: 360,
      height: "auto"
    },
    actions: {
      setDn: MWDGMGadget.prototype._onSetDn,
      clearDn: MWDGMGadget.prototype._onClearDn,
      toggleAnnounce: MWDGMGadget.prototype._onToggleAnnounce
    }
  };

  static PARTS = {
    body: { template: TEMPLATE_GM_GADGET }
  };

  constructor({ systemId = "mwd", ...options } = {}) {
    super(options);
    this.systemId = systemId;
  }

  async render(options = {}) {
    if (!game.user?.isGM) return this;
    return super.render(options);
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    const presetStr = game.settings.get(this.systemId, SETTING_DN_PRESETS);
    const presets = parseDnPresets(presetStr);

    const currentDn = Number(game.settings.get(this.systemId, SETTING_NEXT_DN) ?? 1);
    const announce = Boolean(game.settings.get(this.systemId, SETTING_ANNOUNCE));

    return foundry.utils.mergeObject(context, {
      presets,
      currentDn,
      announce,
      isGM: game.user?.isGM ?? false
    });
  }

  /**
   * data-action="setDn" data-dn="2" data-label="Hard"
   */
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

    // Refresh view
    return this.render({ parts: ["body"] });
  }

  /**
   * Clears "next DN" back to 1.
   */
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
}

/**
 * Convenience singleton accessor.
 */
let _instance = null;

export function getMWDGMGadget({ systemId = "mwd" } = {}) {
  if (!_instance) _instance = new MWDGMGadget({ systemId });
  return _instance;
}
