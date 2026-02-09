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
  static MAX_HEIGHT = 1400;

  /** Track active CSB tab per group across rerenders */
  #activeTabsByGroup = new Map(); // group -> tabId

  /** @override */
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ["sheet", "actor", SYSTEM_NAME, "appv2", "mwd-sheet", "mwd-character-sheet"],
    position: { width: 760, height: 760 },
    window: { resizable: true, minimizable: true },
    actions: {
      toggleViewMode: BaseActorSheetV2.prototype._onToggleViewMode,
      tab: BaseActorSheetV2.prototype._onClickTab,
      roll: BaseActorSheetV2.prototype._onRollAction,
      monitorSet: BaseActorSheetV2.prototype._onMonitorSet
    }
  }, { inplace: false });

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
    // Permissions gate: if you can't edit, you can't enter edit mode or commit.
    if (!this.isEditable) return;

    // If we are currently editing and about to exit edit mode, commit changes first.
    if (this.#editing) {
      // Fire and forget is tempting, but don't: we want commit to finish before re-render.
      this._commitEditsToActor().finally(() => {
        this.#editing = !this.#editing;
        this.render({ force: true });
      });
      return;
    }

    // Entering edit mode: just flip and re-render.
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

  // Defensive: ensure instance-owned array (prevents shared-ref weirdness)
  options.classes = Array.from(options.classes ?? []);

   // (your existing code follows)
  const doc = options?.document ?? this.document;
  const type = doc?.type ?? this.actor?.type;

  if (type) options.classes.push(String(type));

  const theme = game.system?.anarchy?.styles?.selectCssClass?.() ?? "mwd-theme-default";
  const managedThemes = ["mwd-theme-default", "mwd-theme-sra"];

  for (let i = options.classes.length - 1; i >= 0; i--) {
    if (managedThemes.includes(options.classes[i])) options.classes.splice(i, 1);
  }

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
  async _onToggleViewMode(event) {
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
   * Universal roll action: data-action="roll" + data-roll='{"intent":"skill","key":"gunnery"}'
   */
  async _onRollAction(event, target) {
    event?.preventDefault?.();

    const el = target?.closest?.("[data-roll]") ?? event?.target?.closest?.("[data-roll]");
    const raw = el?.dataset?.roll;
    if (!raw) return;

    let payload;
    try {
      payload = JSON.parse(raw);
    } catch (err) {
      console.warn("MWD | Invalid data-roll JSON:", raw, err);
      return;
    }

    // Future: default dialog, Shift = quick roll.
    // For now: everything is “quick roll” until dialog exists.
    const quick = !!event?.shiftKey;

    // Ensure roll namespace exists
    const rollApi = game.mwd?.roll ?? game.system?.mwd?.roll;
    if (!rollApi?.execute) {
      ui.notifications?.error("MWD roll system not initialized (game.mwd.roll.execute missing).");
      return;
    }

    return rollApi.execute({ actor: this.actor, payload, event, quick });
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

  async _commitEditsToActor() {
    // If the sheet isn't rendered yet, nothing to commit.
    const root = this.element;
    if (!root) return;

    // Gather all named inputs/selects/textareas inside the sheet.
    const fields = root.querySelectorAll('input[name][data-edit-field="staged"], select[name][data-edit-field="staged"], textarea[name][data-edit-field="staged"]');
    if (!fields.length) return;

    const updates = {};

    for (const el of fields) {
      const name = el.getAttribute("name");
      if (!name) continue;

      // Skip disabled fields; they shouldn't commit.
      if (el.disabled) continue;

      let value;

      if (el instanceof HTMLInputElement) {
        if (el.type === "checkbox") value = el.checked;
        else if (el.type === "number") value = Number(el.value);
        else value = el.value;
      } else {
        value = el.value;
      }

      // Coerce number NaN -> 0 for numeric fields
      if (typeof value === "number" && Number.isNaN(value)) value = 0;

      // Clamp rules (your requirements)
      value = this._clampByPath(name, value);

      // Only include changes (prevents noisy updates)
      const current = foundry.utils.getProperty(this.actor, name);
      if (current === value) continue;

      updates[name] = value;
    }

    if (!Object.keys(updates).length) return;

    // Permissions: let Foundry enforce. If it fails, it fails (expected).
    try {
      await this.actor.update(updates);
    } catch (err) {
      console.warn("MWD | Commit failed (permissions or validation):", err);
      // Optional: ui.notifications?.warn("You don't have permission to update this actor.");
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

  // ---- IMPORTANT: Never mutate base.options or hbsData.options in-place ----
  // Some AppV2 paths hand through references that can alias this.options.
  // We create a template-only options object that is safe to mutate.
  const templateOptions = foundry.utils.deepClone(base?.options ?? {});
  templateOptions.classes = Array.from(this.options?.classes ?? []);
  templateOptions.cssClass = templateOptions.classes.join(" ");

  // Build final context without mutating Application options
  const hbsData = foundry.utils.mergeObject(
    base,
    {
      actor: this.actor,
      system: this.actor?.system,
      editable: this.isEditable,
      owner: this.document?.isOwner ?? false,
      limited: !(this.document?.isOwner ?? false),
      editing: this.#editing,

      // Template contract
      data: this.actor,                // legacy alias
      options: templateOptions,         // safe, template-only
      cssClass: templateOptions.cssClass
    },
    { inplace: false }
  );

  // Mirror common flags in options for templates that reference options.*
  hbsData.options.owner = hbsData.owner;
  hbsData.options.limited = hbsData.limited;
  hbsData.options.editable = hbsData.editable;
  hbsData.options.editing = hbsData.editing;
  hbsData.options.viewMode = !hbsData.editing;

  // ---- Skills display model (CSB Skills tab expects this) ----
  hbsData.skillsDisplay = buildSkillDisplay(this.actor?.system ?? {});

  // ---- Items: classify into buckets if helper exists ----
  hbsData.items ??= {};
  if (this.actor?.items && typeof Misc?.classifyInto === "function") {
    Misc.classifyInto(hbsData.items, this.actor.items);
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

  
  /** Clamp certain actor system paths to valid ranges */
  _clampByPath(path, value) {
    if (typeof value !== "number") return value;

    // Force integers for attributes + skills
    if (
      /^system\.skills\.[^.]+\.rating$/.test(path) ||
      /^system\.attributes\.[^.]+\.value$/.test(path)
    ) {
      value = Math.trunc(value); // or Math.floor, but trunc is clearer
    }

    // Skill rating clamp
    if (/^system\.skills\.[^.]+\.rating$/.test(path)) {
      return Math.clamp(value, 0, 12);
    }

    // Attribute value clamp
    if (/^system\.attributes\.[^.]+\.value$/.test(path)) {
      return Math.clamp(value, 0, 10);
    }

    return value;
  }
  
  /** Action handler: Condition Monitor set */
  async _onMonitorSet(event, target) {
    event.preventDefault();
    if (!this.isEditable) return;

    const monitorId = String(target?.dataset?.monitor ?? "").trim();
    const raw = Number(target?.dataset?.value);

    if (!monitorId || !Number.isFinite(raw)) return;

    // Prefer actor-owned semantics
    if (typeof this.actor.setMonitorValue === "function") {
      return this.actor.setMonitorValue(monitorId, raw, { source: "sheet" });
    }

    // Fallback: raw value update only (still generic)
    const basePath = `system.monitors.${monitorId}`;
    const max = Number(foundry.utils.getProperty(this, `${basePath}.max`)) || 0;
    const value = Math.min(Math.max(0, raw), Math.max(0, max));
    return this.actor.update({ [`${basePath}.value`]: value });
  }

  /**
 * Compute -1 penalty per 3 full damage (3,6,9...)
 * Returns 0, -1, -2, ...
 */
  static _mwdPenaltyFromDamage(damage) {
    const d = Math.max(0, Number(damage) || 0);
    return -Math.floor(d / 3);
  }

/**
 * Compute resistance = ceil(value / 4), with 0 -> 0
 * 1-4 => 1, 5-8 => 2, ...
 */
  static _mwdResistanceFromValue(value) {
    const v = Math.max(0, Number(value) || 0);
    return v === 0 ? 0 : Math.ceil(v / 4);
  }
}
