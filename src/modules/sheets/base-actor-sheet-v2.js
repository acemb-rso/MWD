import { LOG_HEAD, SYSTEM_NAME } from "../constants.js";
import { Misc } from "../misc.js";
import { buildSkillDisplay } from "../mwd/skills.js";

/**
 * CSB-style: deterministic AppV2 sheet base.
 * - AppV2 actions for event routing (no activateListeners)
 * - CSB tab state is reconciled in _onRender (post-DOM, stable)
 * - Theme class injection in _initializeApplicationOptions
 * - Stable template contract in _prepareContext (legacy-friendly)
 * - No i18n usage (fork requirement)
 */
const { HandlebarsApplicationMixin } = foundry.applications.api;



export class BaseActorSheetV2 extends HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheetV2) {
  #editing = false;

  // ---- Hard minimum size (resize clamp) ----
  static MIN_WIDTH  = 800;
  static MAX_WIDTH  = 950;
  static MIN_HEIGHT = 600;
  static MAX_HEIGHT = 1000;

  /** Track active CSB tab per group across rerenders */
  #activeTabsByGroup = new Map(); // group -> tabId

  /** @override */
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ["sheet", "actor", SYSTEM_NAME, "appv2", "mwd-sheet", "mwd-character-sheet"],
    position: { width: 760, height: 760 },
    window: { resizable: true,
      minimizable: true
     },

    /**
     * AppV2 action routing:
     * data-action="toggleViewMode" / "tab"
     */
    actions: {
      toggleViewMode: BaseActorSheetV2.prototype._onToggleViewMode,
      tab: BaseActorSheetV2.prototype._onClickTab
    }
  });

 /** @override */
  _updatePosition(position) {
    const resolved = super._updatePosition(position);

    const {
      MIN_WIDTH,
      MAX_WIDTH,
      MIN_HEIGHT,
      MAX_HEIGHT
    } = this.constructor;

    if (typeof resolved.width === "number") {
      resolved.width = Math.min(
        MAX_WIDTH,
        Math.max(MIN_WIDTH, resolved.width)
      );
    }

    if (typeof resolved.height === "number") {
      resolved.height = Math.min(
        MAX_HEIGHT,
        Math.max(MIN_HEIGHT, resolved.height)
      );
    }

    return resolved;
  }
  
  // Optional legacy shim if anything still reads defaultOptions
  static get defaultOptions() { return this.DEFAULT_OPTIONS; }

  /** Editing mode flag for templates */
  get editing() {
    return this.#editing;
  }

  toggleEditing() {
    if (!this.isEditable) return;
    this.#editing = !this.#editing;
    this.render({ force: true });
  }

  /** Get the root HTMLElement for this application */
  _getRootElement() {
  return (this.element instanceof HTMLElement) ? this.element : this.element?.[0];
}

  /** @override */
  _initializeApplicationOptions(options) {
    options = super._initializeApplicationOptions(options);

    const doc = options?.document ?? this.document;
    const type = doc?.type ?? this.actor?.type;

    options.classes ??= [];
    if (type) options.classes.push(String(type));

    // ---- Theme class (from Styles) ----
    const theme = game.system?.anarchy?.styles?.selectCssClass?.() ?? "mwd-theme-default";
    const managedThemes = ["mwd-theme-default", "mwd-theme-sra"];

    // Remove previously applied theme class (defensive)
    for (let i = options.classes.length - 1; i >= 0; i--) {
      if (managedThemes.includes(options.classes[i])) options.classes.splice(i, 1);
    }

    // Add selected theme
    options.classes.push(theme);

    return options;
  }

  /**
   * No localization: provide a concrete title so Foundry doesn't show "TYPES.Actor.<type>".
   * @override
   */
  get title() {
    const type = this.actor?.type ?? "actor";
    const labels = {
      character: "Character",
      npc: "NPC",
      battlemech: "BattleMech",
      vehicle: "Vehicle",
      device: "Device"
    };

    const typeLabel =
      labels[type] ??
      String(type).replace(/(^|[-_])([a-z])/g, (_, sep, c) => (sep ? " " : "") + c.toUpperCase());

    const name = this.actor?.name ?? "Actor";
    return `${name} — ${typeLabel}`;
  }

  /**
   * Window actions (header/menu). Centralize here and dedupe by action key.
   * @override
   */
  _getHeaderControls() {
    let controls = super._getHeaderControls?.() ?? [];
    const isToken = this.document?.isToken ?? false;

    // Prefer filtering by action when available (more stable than label text)
    const removeActions = new Set();

    // These action keys vary a bit across versions/modules, so we include both and
    // keep a label fallback.
    if (isToken) {
      removeActions.add("prototypeToken");
      removeActions.add("configurePrototypeToken");
    } else {
      removeActions.add("token");
      removeActions.add("configureToken");
    }

    controls = controls.filter(c => {
      const action = c?.action ?? "";
      const label = String(c?.label ?? "");

      if (removeActions.has(action)) return false;

      // Fallback label matching (legacy / localization-free environments)
      if (isToken && label.includes("Prototype")) return false;
      if (!isToken && label === "Token") return false;

      return true;
    });

    // Dedupe: action first, then icon|label
    const seen = new Set();
    controls = controls.filter(c => {
      const action = c?.action;
      const key = action ? `a:${action}` : `il:${c?.icon ?? ""}|${c?.label ?? ""}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return controls;
  }

  /**
   * AppV2 action handler: Edit/View toggle.
   * Note: actions mapping already routes clicks here; we keep this lean.
   */
  async _onToggleViewMode(event /*, target */) {
    event?.preventDefault?.();
    this.toggleEditing();
  }

  /**
   * AppV2 action handler: CSB tab click.
   * Defensive: derive the tab link from target or event.
   */
  _onClickTab(event, target) {
    const el =
      target?.closest?.(".csb-tab-link[data-tab]") ??
      event?.target?.closest?.(".csb-tab-link[data-tab]");
    if (!el) return;

    const tabId = el.dataset.tab;
    const tabs = el.closest(".csb-tabs");
    if (!tabs || !tabId) return;

    const group = tabs.dataset.group || "default";
    this.#activeTabsByGroup.set(group, tabId);

    this.#applyTabState(tabs, tabId);
  }

  /**
   * Post-render reconciliation hook (stable DOM).
   * Ensures every .csb-tabs group has exactly one active tab/panel:
   * - prefer remembered selection
   * - else use data-default
   * - else use first tab link
   * @override
   */
  _onRender(context, options) {
    super._onRender?.(context, options);

    const root = this._getRootElement();
    if (!root) return;

    for (const tabs of root.querySelectorAll(".csb-tabs")) {
      const group = tabs.dataset.group || "default";

      const remembered = this.#activeTabsByGroup.get(group);
      const fallback =
        tabs.dataset.default ||
        tabs.querySelector(".csb-tab-link[data-tab]")?.dataset.tab;

      const tabId = remembered || fallback;
      if (!tabId) continue;

      this.#applyTabState(tabs, tabId);
    }
      // Debugging aid: warn if tabs exist but no active tab applied
    if (root.querySelectorAll(".csb-tabs").length && !root.querySelector(".csb-tab-panel.is-active")) {
      console.warn(`${LOG_HEAD} CSB tabs present but no active tab applied. Check element root resolution and CSS .is-active selectors.`, { sheet: this.constructor?.name
      });
     }

  }

  /**
   * Apply active-state classes within a single .csb-tabs root.
   * Idempotent: safe to call every render.
   */
  #applyTabState(tabsRoot, tabId) {
    tabsRoot.querySelectorAll(".csb-tab-link").forEach(a => {
      a.classList.toggle("is-active", a.dataset.tab === tabId);
    });

    tabsRoot.querySelectorAll(".csb-tab-panel").forEach(p => {
      p.classList.toggle("is-active", p.dataset.tab === tabId);
    });
  }

  /** @override */
  async _prepareContext(options) {
    console.log(`${LOG_HEAD}BaseActorSheetV2._prepareContext:start`, {
      actorName: this.actor?.name,
      actorType: this.actor?.type
    });

    const base = await super._prepareContext(options);

    // Start with Foundry's base context, then add our contract keys.
    const hbsData = foundry.utils.mergeObject(
      base,
      {
        actor: this.actor,
        system: this.actor?.system,
        editable: this.isEditable,
        owner: this.document?.isOwner ?? false,
        limited: !(this.document?.isOwner ?? false),
        editing: this.#editing
      },
      { inplace: false }
    );

    /*
     ---- Template contract (forked HBS expects these) ----
     Entirely legacy, but many HBS forks rely on these keys.
    */
    hbsData.data = this.actor; // legacy alias used in many HBS forks
    hbsData.options ??= {};

    // ---- Skills display model (CSB Skills tab expects this) ----
    hbsData.skillsDisplay = buildSkillDisplay(this.actor?.system ?? {});

    const classes = Array.isArray(this.options?.classes) ? this.options.classes : [];
    const existing = Array.isArray(hbsData.options.classes) ? hbsData.options.classes : [];
    const merged = typeof Misc?.distinct === "function"
      ? Misc.distinct([...existing, ...classes])
      : Array.from(new Set([...existing, ...classes]));

    hbsData.options.classes = merged;
    hbsData.options.cssClass = merged.join(" ");
    hbsData.cssClass = hbsData.options.cssClass;

    // Mirror common flags in options for templates that reference options.*
    hbsData.options.owner = hbsData.owner;
    hbsData.options.limited = hbsData.limited;
    hbsData.options.editable = hbsData.editable;
    hbsData.options.editing = hbsData.editing;
    hbsData.options.viewMode = !hbsData.editing;

    // ---- Items: classify into buckets if helper exists ----
    hbsData.items ??= {};
    if (this.actor?.items && typeof Misc?.classifyInto === "function") {
      Misc.classifyInto(hbsData.items, this.actor.items);

      // Convenience bucket combining weapon types (commonly needed)
      hbsData.items.weapon = [
        ...(hbsData.items.mechWeapon ?? []),
        ...(hbsData.items.personalWeapon ?? [])
      ];
    }

    // ---- NPC compatibility alias (your npc.hbs expects npcItems.*) ----
    hbsData.npcItems = {
      traits: (hbsData.items.quality ?? []),
      weapons: (hbsData.items.weapon ?? []),
      assetModules: (hbsData.items.assetModule ?? []),
      inventory: (hbsData.items.gear ?? [])
    };

    console.log(`${LOG_HEAD}BaseActorSheetV2._prepareContext:done`, {
      actorType: this.actor?.type,
      cssClass: hbsData.cssClass,
      itemCount: this.actor?.items?.size ?? 0,
      editing: this.#editing
    });

    return hbsData;
  }
}
