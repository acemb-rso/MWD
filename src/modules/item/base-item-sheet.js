import { MWD } from "../config.js";
import { SYSTEM_NAME, TEMPLATE, TEMPLATES_PATH } from "../constants.js";
import { Enums } from "../enums.js";
import { LayoutRegistry } from "../layout/layout-registry.js";
import { Misc } from "../misc.js";

const { HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * Base item sheet for all MWD items, converted to ApplicationV2.
 * Provides common functionality for all item types including:
 * - Context preparation with enums and system data
 * - Modifier management (add, delete, update)
 * - Monitor/checkbar interactions
 * - Template selection per item type
 */
export class BaseItemSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ItemSheetV2) {
  #activeTabsByGroup = new Map();

  static LAYOUT_ID = null;

  _getCanonicalItemType() {
    return this.item?.canonicalType ?? this.item?.type;
  }

  _getCanonicalItemTypeFromOptions(options) {
    const doc = options?.document;
    return doc?.canonicalType ?? doc?.type;
  }

  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["sheet", "item", SYSTEM_NAME, "appv2", "mwd-sheet", "item-sheet"],
      position: {
        width: 760,
        height: 860
      },
      window: {
        resizable: true
      },
      actions: {
        editImage: BaseItemSheet._onEditImage,
        tab: BaseItemSheet.prototype._onClickTab,
        checkbarElement: BaseItemSheet._onClickCheckbar,
        modifierAdd: BaseItemSheet._onModifierAdd,
        modifierDelete: BaseItemSheet._onModifierDelete,
        modifierValueChange: BaseItemSheet._onModifierValueChange,
        modifierConditionChange: BaseItemSheet._onModifierConditionChange,
        modifierSelectionChange: BaseItemSheet._onModifierSelectionChange,
        effectCreate: BaseItemSheet._onEffectCreate,
        effectEdit: BaseItemSheet._onEffectEdit,
        effectDelete: BaseItemSheet._onEffectDelete,
        effectToggleDisabled: BaseItemSheet._onEffectToggleDisabled
      },
      form: {
        submitOnChange: true,
        closeOnSubmit: false
        // NOTE: No custom handler - AppV2 handles form submission automatically
      }
    }, { inplace: false });
  }

  static get defaultOptions() {
    return this.DEFAULT_OPTIONS;
  }

  /** @override */
  static PARTS = {
    sheet: {
      template: "", // Set dynamically in _getPartTemplate
      scrollable: [".sheet-body"]
    }
  };

  static TABS = {
    primary: {
      id: "primary",
      group: "primary",
      navSelector: ".sheet-tabs",
      contentSelector: ".sheet-body",
      initial: "main",  // This must match your tab name
      tabs: [
        { id: "main" },
        { id: "modifiers" }
      ]
    }
  };

  /** @override */
  tabGroups = {
    primary: "main"  // Default tab
  };

  _initializeApplicationOptions(options) {
    options = super._initializeApplicationOptions(options);
    options.classes = Array.from(options.classes ?? []);

    const itemType = this._getCanonicalItemTypeFromOptions(options);
    if (itemType) options.classes.push(String(itemType));

    const theme = game.system?.mwd?.styles?.selectCssClass?.() ?? "mwd-theme-default";
    const managedThemes = ["mwd-theme-default", "mwd-theme-sra"];
    options.classes = options.classes.filter(cssClass => !managedThemes.includes(cssClass));
    options.classes.push(theme);

    return options;
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Dynamically determine the template based on item type.
   * @param {string} partId - The part identifier
   * @returns {string} The template path
   * @override
   */
  _getPartTemplate(partId) {
    if (partId === "sheet") {
      const itemType = this._getCanonicalItemType();
      const weaponTemplates = {
        [TEMPLATE.itemType.mechWeapon]: `${TEMPLATES_PATH}/v2/item/mech-weapon-root.hbs`,
        [TEMPLATE.itemType.armor]: `${TEMPLATES_PATH}/v2/item/armor.hbs`,
      };
      
      return weaponTemplates[itemType] ?? `${TEMPLATES_PATH}/v2/item/${itemType}.hbs`;
    }
    return super._getPartTemplate?.(partId) ?? "";
  }

  /**
   * Override title to show localized item type and name.
   * @override
   */
  get title() {
    const itemType = this._getCanonicalItemType();
    const typeLabel = MWD.itemType.singular[itemType] ?? itemType;
    return `${typeLabel}: ${this.item.name}`;
  }

  /**
   * Prepare context data for rendering.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The context object
   * @override
   */
  async _prepareContext(options) {
    // Get base context from parent
    const context = await super._prepareContext(options);
    const modifierEnums = game.system.mwd.modifiers?.getEnums?.() ?? {};
    const templateOptions = foundry.utils.deepClone(context?.options ?? {});
    
    // Get actor attributes if this item is owned
    const actorAttributes = this.item.actor?.getAttributes?.(this.item) ?? [];
    const canonicalType = this._getCanonicalItemType();
    const isStandalone = !this.item.actor;
    const canUseActorControls = Boolean(this.item.actor);
    const typeLabel = MWD.itemType.singular[canonicalType] ?? canonicalType;
    const effectEntries = this._getEffectEntries();
    const syncedEffectCount = effectEntries.filter(effect => effect.syncedCount > 0).length;
    const layoutId = this.constructor.LAYOUT_ID;
    
    // Determine which attributes are usable based on item ownership
    const usableAttribute = this.item.actor
      ? attribute => actorAttributes.includes(attribute)
      : attribute => true;
    
    // Skills need knowledge attributes
    const withKnowledge = canonicalType === TEMPLATE.itemType.skill;

    // Build CSS classes
    const editableClass = this.isEditable ? "editable" : "locked";
    const baseClasses = ["mwd", "item-sheet", editableClass];
    const cssClass = baseClasses.join(" ");
    templateOptions.classes = baseClasses;
    templateOptions.cssClass = cssClass;

    // Prepare enriched description (for display in templates)
    const enrichedDescription = await foundry.applications.ux.TextEditor.implementation.enrichHTML(this.item.system.description ?? "", {
      async: true,
      secrets: this.item.isOwner,
      relativeTo: this.item
    });

    // Prepare enriched GM notes (if applicable)
    const enrichedGMNotes = game.user.isGM && this.item.system.gmnotes
      ? await foundry.applications.ux.TextEditor.implementation.enrichHTML(this.item.system.gmnotes, {
          async: true,
          secrets: true,
          relativeTo: this.item
        })
      : "";

    // Build complete context
    const merged = foundry.utils.mergeObject(context, {
      // Item data
      item: this.item,
      data: this.item,
      system: this.item.system,
      
      // Enriched content
      enrichedDescription,
      enrichedGMNotes,
      
      // Options for templates
      options: {
        ...templateOptions,
        isGM: game.user.isGM,
        limited: !this.document.isOwner,
        owner: this.document.isOwner,
        isOwned: Boolean(this.item.actor),
        editable: this.isEditable,
        cssClass,
        viewMode: false  // Items don't have view mode like actors do
      },
      
      // Configuration data
      ENUMS: foundry.utils.mergeObject(
        Enums.getEnums(usableAttribute, withKnowledge), 
        modifierEnums
      ),
      MWD,
      itemSheet: {
        canonicalType,
        typeLabel,
        isStandalone,
        canUseActorControls,
        supportsEffectSync: Boolean(this.item.supportsEquippedEffectSync?.()),
        effectEntries,
        effectCount: effectEntries.length,
        syncedEffectCount,
        summaryChips: this._getSummaryChips(),
        stateChips: this._getStateChips(effectEntries)
      },
      
      // CSS class for form element
      cssClass,
      
      // Tab configuration
      tabs: this._getTabs()
    });

    if (layoutId) {
      merged.layout = await LayoutRegistry.get(layoutId);
    }

    return merged;
  }

  /**
   * Get tab configuration for this item type.
   * Override in subclasses if needed.
   * @returns {object} Tab configuration
   * @protected
   */
  _getTabs() {
    return {
      main: { id: "main", group: "primary", label: "Details" },
      modifiers: { id: "modifiers", group: "primary", label: "Modifiers" },
      effects: { id: "effects", group: "primary", label: "Effects" }
    };
  }

  _getSummaryChips() {
    return [];
  }

  _getStateChips(effectEntries = []) {
    const chips = [];
    chips.push({ kind: "ownership", label: this.item.actor ? "Owned Item" : "World Item" });

    if (Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "equipped")) {
      chips.push({
        kind: "equipment",
        label: this.item.system?.equipped ? "Equipped" : "Unequipped",
        tone: this.item.system?.equipped ? "active" : "muted"
      });
    }

    if (Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "isPrimary") && this.item.system?.isPrimary) {
      chips.push({ kind: "role", label: "Primary", tone: "accent" });
    }

    if (effectEntries.length) {
      chips.push({
        kind: "effects",
        label: `${effectEntries.length} Effect${effectEntries.length === 1 ? "" : "s"}`,
        tone: effectEntries.some(effect => effect.syncedCount > 0) ? "active" : "muted"
      });
    }

    return chips;
  }

  _getEffectEntries() {
    const syncedBySource = new Map();
    const syncedEffects = this.item.getSyncedActorEffects?.() ?? [];

    for (const actorEffect of syncedEffects) {
      const sourceEffectId = actorEffect.flags?.[SYSTEM_NAME]?.equippedItemSync?.sourceEffectId;
      if (!sourceEffectId) continue;
      const bucket = syncedBySource.get(sourceEffectId) ?? [];
      bucket.push(actorEffect);
      syncedBySource.set(sourceEffectId, bucket);
    }

    return Array.from(this.item.effects?.contents ?? []).map(effect => {
      const synced = syncedBySource.get(effect.id) ?? [];
      return {
        id: effect.id,
        name: effect.name || "New Effect",
        img: effect.img || "icons/svg/aura.svg",
        disabled: Boolean(effect.disabled),
        transfer: Boolean(effect.transfer),
        changesCount: Array.isArray(effect.changes) ? effect.changes.length : 0,
        statusesCount: Number(effect.statuses?.size ?? effect.statuses?.length ?? 0),
        durationLabel: effect.duration?.seconds
          ? `${effect.duration.seconds}s`
          : effect.duration?.rounds
            ? `${effect.duration.rounds} rounds`
            : "Passive",
        syncedCount: synced.length,
        syncLabel: !this.item.actor
          ? "World item"
          : this.item.supportsEquippedEffectSync?.()
            ? this.item.system?.equipped
              ? synced.length
                ? `Synced to actor (${synced.length})`
                : "Pending sync"
              : "Applies when equipped"
            : "No equip sync"
      };
    });
  }

  _getRootElement() {
    return (this.element instanceof HTMLElement) ? this.element : this.element?.[0];
  }

  _onClickTab(event, target) {
    const tabLink =
      target?.closest?.(".csb-tab-link[data-tab]") ??
      event?.target?.closest?.(".csb-tab-link[data-tab]");
    if (!tabLink) return;

    const tabRoot = tabLink.closest(".csb-tabs");
    if (!tabRoot) return;

    const group = tabRoot.dataset.group || "default";
    const tabId = tabLink.dataset.tab;
    if (!tabId) return;

    this.#activeTabsByGroup.set(group, tabId);
    this.#applyTabState(this._getRootElement(), group, tabId);
  }

  _onRender(context, options) {
    super._onRender?.(context, options);

    if (this.window?.title) {
      this.window.title.textContent = this.title;
    }

    const root = this._getRootElement();
    if (!root) return;

    for (const tabsRoot of root.querySelectorAll(".sheet-tabs")) {
      const group = tabsRoot.dataset.group || "default";
      const tabEls = Array.from(tabsRoot.querySelectorAll("[data-tab]"));
      if (!tabEls.length) continue;

      for (const el of tabEls) {
        el.addEventListener("click", event => {
          event.preventDefault();
          event.stopPropagation();
          const tabId = el.dataset.tab;
          if (!tabId) return;
          this.#activeTabsByGroup.set(group, tabId);
          this.#applyTabState(root, group, tabId);
        });
      }

      const remembered = this.#activeTabsByGroup.get(group);
      const fallback = tabsRoot.dataset.default || tabEls[0]?.dataset.tab;
      const activeTab = remembered || fallback;
      if (activeTab) {
        this.#applyTabState(root, group, activeTab);
      }
    }

    for (const tabsRoot of root.querySelectorAll(".csb-tabs")) {
      const group = tabsRoot.dataset.group || "default";
      const tabEls = Array.from(tabsRoot.querySelectorAll(".csb-tab-link[data-tab]"));
      if (!tabEls.length) continue;

      const remembered = this.#activeTabsByGroup.get(group);
      const fallback = tabsRoot.dataset.default || tabEls[0]?.dataset.tab;
      const activeTab = remembered || fallback;
      if (activeTab) {
        this.#applyTabState(root, group, activeTab);
      }
    }
  }

  #applyTabState(root, group, tabId) {
    if (!root) return;

    root.querySelectorAll(`.csb-tabs[data-group="${group}"] .csb-tab-link[data-tab]`).forEach(el => {
      el.classList.toggle("is-active", el.dataset.tab === tabId);
    });

    root.querySelectorAll(`.csb-tabs[data-group="${group}"] .csb-tab-panel[data-tab]`).forEach(panel => {
      panel.classList.toggle("is-active", panel.dataset.tab === tabId);
    });

    root.querySelectorAll(`.sheet-tabs [data-tab]`).forEach(el => {
      const sameGroup = (el.closest(".sheet-tabs")?.dataset.group || "default") === group;
      if (!sameGroup) return;
      el.classList.toggle("active", el.dataset.tab === tabId);
    });

    root.querySelectorAll(`.tab[data-group="${group}"]`).forEach(panel => {
      panel.classList.toggle("active", panel.dataset.tab === tabId);
    });
  }

  /**
   * Override header buttons to add custom controls.
   * @returns {object[]} Array of header button configurations
   * @override
   */
  _getHeaderControls() {
    const buttons = super._getHeaderControls();
    
    // Add any item-specific controls here
    // Example: Toggle inactive state, etc.
    
    return buttons;
  }

  /* -------------------------------------------- */
  /*  Action Handlers                             */
  /* -------------------------------------------- */

  /**
   * Handle clicking a checkbar element (monitor).
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The clicked element
   * @returns {Promise<void>}
   * @static
   */
  static async _onClickCheckbar(event, target) {
    const item = this.item;
    if (!item.parent) return;

    const monitorRoot = target.closest('.checkbar-root');
    if (!monitorRoot) return;
    
    const monitor = monitorRoot.dataset.monitorCode;
    const index = Number.parseInt(target.dataset.index);
    const checked = target.dataset.checked === 'true';

    await item.parent.switchMonitorCheck(monitor, index, checked);
  }

  static async _onEditImage(event) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!this.isEditable) return;

    const FilePickerV2 = foundry.applications.apps.FilePicker.implementation;
    const picker = new FilePickerV2({
      type: "image",
      current: this.item?.img ?? "",
      callback: async (path) => {
        if (!path) return;
        await this.item.update({ img: path });
      }
    });

    picker.render(true);
  }

  /**
   * Handle adding a new modifier.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The clicked element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierAdd(event, target) {
    await this.item.createModifier();
  }

  /**
   * Handle deleting a modifier.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The clicked element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierDelete(event, target) {
    const modifierRow = target.closest('.define-modifier');
    if (!modifierRow) return;
    
    const modifierId = modifierRow.dataset.modifierId;
    if (modifierId) {
      await this.item.deleteModifier(modifierId);
    }
  }

  /**
   * Handle changing a modifier's value.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The input element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierValueChange(event, target) {
    const modifierRow = target.closest('.define-modifier');
    if (!modifierRow) return;
    
    const modifierId = modifierRow.dataset.modifierId;
    if (modifierId) {
      await this.item.changeModifierValue(modifierId, target.value);
    }
  }

  /**
   * Handle changing a modifier's condition.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The input element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierConditionChange(event, target) {
    const modifierRow = target.closest('.define-modifier');
    if (!modifierRow) return;
    
    const modifierId = modifierRow.dataset.modifierId;
    if (modifierId) {
      await this.item.changeModifierCondition(modifierId, target.value);
    }
  }

  /**
   * Handle changing a modifier's selection (dropdown).
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The select element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierSelectionChange(event, target) {
    const modifierRow = target.closest('.define-modifier');
    if (!modifierRow) return;
    
    const modifierId = modifierRow.dataset.modifierId;
    const modifierSelect = target.dataset.modifierSelect;
    
    if (modifierId && modifierSelect) {
      await this.item.changeModifierSelection(modifierId, modifierSelect, target.value);
    }
  }

  static async _onEffectCreate(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const [created] = await this.item.createEmbeddedDocuments("ActiveEffect", [{
      name: `${this.item.name} Effect`,
      img: this.item.img || "icons/svg/aura.svg",
      disabled: false,
      transfer: false,
      changes: []
    }]);

    created?.sheet?.render(true);
  }

  static async _onEffectEdit(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const effectId = target?.dataset?.effectId ?? target?.closest?.("[data-effect-id]")?.dataset?.effectId;
    if (!effectId) return;

    const effect = this.item.effects.get(effectId);
    effect?.sheet?.render(true);
  }

  static async _onEffectDelete(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const effectId = target?.dataset?.effectId ?? target?.closest?.("[data-effect-id]")?.dataset?.effectId;
    if (!effectId) return;

    await this.item.deleteEmbeddedDocuments("ActiveEffect", [effectId]);
  }

  static async _onEffectToggleDisabled(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const effectId = target?.dataset?.effectId ?? target?.closest?.("[data-effect-id]")?.dataset?.effectId;
    if (!effectId) return;

    const effect = this.item.effects.get(effectId);
    if (!effect) return;

    await effect.update({ disabled: !effect.disabled });
  }
}
