import { LOG_HEAD, SYSTEM_NAME, TEMPLATES_PATH } from "../constants.js";
import { Misc } from "../misc.js";

/**
 * CSB-style: deterministic AppV2 sheet base.
 * - One sheet class = one root template (no dynamic template swapping)
 * - Append CSS classes early in _initializeApplicationOptions
 * - Merge context in _prepareContext and keep a stable template contract
 * - Compose complex sheets safely (subclasses override PARTS; base stays generic)
 * - No i18n usage (fork requirement)
 */
const { HandlebarsApplicationMixin } = foundry.applications.api;

export class BaseActorSheetV2 extends HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheetV2) {
  #editing = false;

  /** @override */
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ["sheet", "actor", SYSTEM_NAME, "appv2"],
    position: { width: 760, height: 760 },
    actions: {toggleViewMode: BaseActorSheetV2.prototype._onToggleViewMode}
  });

  // optional legacy shim if anything still reads defaultOptions
  static get default_Options() { return this.DEFAULT_OPTIONS; }

  /** Editing mode flag for templates */
  get editing() {
    return this.#editing;
  }

  toggleEditing() {
    if (!this.isEditable) return;
    this.#editing = !this.#editing;
    this.render({ force: true });
  }

  /** @override */
  _initializeApplicationOptions(options) {
    options = super._initializeApplicationOptions(options);

    // CSB-style: append stable classes EARLY so CSS always matches.
    const doc = options?.document ?? this.document;
    const type = doc?.type ?? this.actor?.type;

    options.classes ??= [];
    if (type) options.classes.push(String(type));

    // NOTE: Avoid using document ids as CSS classes; they are noisy and unstable for styling.

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
   * This is where we add the Edit/View toggle for AppV2 sheets.
   * @override
   */

  
  _getHeaderControls() {
    let controls = super._getHeaderControls?.() ?? [];
    const isToken = this.document?.isToken ?? false;

    // Prefer filtering by action when available (more stable than label text)
    const removeActions = new Set();

    // These action keys vary a bit across versions/modules, so we include both and
    // also keep a label fallback.
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
   * AppV2 action router.
   * @override
   */
  _onClickAction(event, target) {
    // Let AppV2 actions routing do its thing first
    const result = super._onClickAction?.(event, target);

    // Fallback: if actions mapping is missing, still handle the click
    const el = target?.closest?.("[data-action]") ?? target;
    const action = el?.dataset?.action;

    if (action === "toggleViewMode" || action === "toggleEditing") {
      event?.preventDefault?.();
      this.toggleEditing();
      return;
    }

    return result;
  }
  
  async _onToggleViewMode(event, target) {
    event?.preventDefault?.();
    this.toggleEditing(); // reuse your existing editing toggle
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

    // ---- Template contract (forked HBS expects these) ----
    hbsData.data = this.actor; // legacy alias used in many HBS forks
    hbsData.options ??= {};

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
