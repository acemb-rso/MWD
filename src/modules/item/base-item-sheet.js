// src/modules/item/base-item-sheet.js
// Purpose: Shared AppV2 item-sheet foundation.
// How it fits: Keeps every item sheet on one submit/render contract even when
// the actual content is driven by either a direct template or a layout JSON.


import { MWD } from "../config.js";
import { SYSTEM_NAME, TEMPLATE, TEMPLATES_PATH } from "../constants.js";
import { Enums } from "../enums.js";
import { LayoutRegistry } from "../layout/layout-registry.js";
import { Misc } from "../misc.js";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { HTMLField, StringField } = foundry.data.fields;
const RICH_TEXT_ITEM_FIELDS = new Set(["system.notes", "system.description"]);
const ITEM_ROOT_TEMPLATES = Object.freeze({
  [TEMPLATE.itemType.personalWeapon]: `${TEMPLATES_PATH}/v2/item/personal-weapon-root.hbs`,
  [TEMPLATE.itemType.mechWeapon]: `${TEMPLATES_PATH}/v2/item/mech-weapon-root.hbs`,
  [TEMPLATE.itemType.armor]: `${TEMPLATES_PATH}/v2/item/armor-root.hbs`,
});

function createFormField(FieldType, name) {
  const field = new FieldType({ required: false, blank: true, initial: "" });
  field.name = name;
  return field;
}

function getItemSystemFormFields(systemFields = {}) {
  // Item templates are mid-migration between raw schema fields and the richer
  // AppV2 editor surface. We guarantee the shared reference fields exist here
  // so simple sheets and layout-driven sheets can rely on one contract.
  return {
    ...systemFields,
    sourceReference: systemFields.sourceReference ?? createFormField(StringField, "system.sourceReference"),
    notes: systemFields.notes ?? createFormField(HTMLField, "system.notes"),
    description: systemFields.description ?? createFormField(HTMLField, "system.description"),
  };
}

function sanitizeFieldUpdates(updates = {}) {
  return Object.fromEntries(
    Object.entries(updates ?? {}).filter(([, value]) => value !== undefined)
  );
}

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
  #activeAccordionSectionsByGroup = new Map();
  #pendingScrollRestore = null;

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
        accordion: BaseItemSheet.prototype._onClickAccordion,
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
        submitOnChange: false,
        closeOnSubmit: false,
        handler: BaseItemSheet.prototype._onSubmitForm
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
      // Every supported item type now has exactly one authoritative root
      // template. Some roots are layout shells and others are direct templates,
      // but they all resolve through this single selector.
      return ITEM_ROOT_TEMPLATES[itemType] ?? `${TEMPLATES_PATH}/v2/item/${itemType}.hbs`;
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
    // Start from Foundry's base sheet context, then layer in the normalized MWD
    // contract that all item templates depend on.
    const context = await super._prepareContext(options);
    const modifierEnums = game.system.mwd.modifiers?.getEnums?.() ?? {};
    const templateOptions = foundry.utils.deepClone(context?.options ?? {});
    const systemFields = getItemSystemFormFields(context?.fields ?? this.item.system?.schema?.fields ?? {});
    
    const actorAttributes = this.item.actor?.getAttributes?.(this.item) ?? [];
    const canonicalType = this._getCanonicalItemType();
    const isStandalone = !this.item.actor;
    const canUseActorControls = Boolean(this.item.actor);
    const typeLabel = MWD.itemType.singular[canonicalType] ?? canonicalType;
    const effectEntries = this._getEffectEntries();
    const syncedEffectCount = effectEntries.filter(effect => effect.syncedCount > 0).length;
    const layoutId = this.constructor.LAYOUT_ID;
    
    // Standalone items still need complete enum lists so they remain editable in
    // the world sidebar and compendiums.
    const usableAttribute = this.item.actor
      ? attribute => actorAttributes.includes(attribute)
      : attribute => true;
    
    const withKnowledge = canonicalType === TEMPLATE.itemType.skill;

    const editableClass = this.isEditable ? "editable" : "locked";
    const baseClasses = ["mwd", "item-sheet", editableClass];
    const cssClass = baseClasses.join(" ");
    templateOptions.classes = baseClasses;
    templateOptions.cssClass = cssClass;

    const enrichField = async (value, { secrets = this.item.isOwner } = {}) =>
      foundry.applications.ux.TextEditor.implementation.enrichHTML(value ?? "", {
        async: true,
        secrets,
        relativeTo: this.item
      });

    const enriched = foundry.utils.expandObject({
      "system.notes": await enrichField(this.item.system.notes ?? ""),
      "system.description": await enrichField(this.item.system.description ?? "")
    });

    const merged = {
      ...context,
      item: this.item,
      data: this.item,
      system: this.item.system,
      
      // AppV2 prose editors need both raw field definitions and pre-enriched
      // HTML. Keeping both here avoids template-specific enrichment branches.
      fields: systemFields,
      enriched,
      enrichedDescription: enriched?.system?.description ?? "",
      
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
      
      ENUMS: {
        ...Enums.getEnums(usableAttribute, withKnowledge),
        ...modifierEnums
      },
      MWD,
      itemSheet: {
        canonicalType,
        typeLabel,
        isArmorSheet: canonicalType === TEMPLATE.itemType.armor,
        isStandalone,
        canUseActorControls,
        supportsEffectSync: Boolean(this.item.supportsEquippedEffectSync?.()),
        effectEntries,
        effectCount: effectEntries.length,
        syncedEffectCount,
        summaryChips: this._getSummaryChips(),
        stateChips: this._getStateChips(effectEntries)
      },
      
      cssClass,
      
      tabs: this._getTabs()
    };

    if (layoutId) {
      // Layout-backed sheets fetch a declarative tree here; direct-template
      // sheets simply skip this block and render against the same context.
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

    // The sheet renders item-owned ActiveEffects alongside their actor-side
    // synced copies so equipment debugging has one surface instead of two.
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

  _onClickAccordion(event, target) {
    const accordionTrigger =
      target?.closest?.(".csb-accordion__trigger[data-section]") ??
      event?.target?.closest?.(".csb-accordion__trigger[data-section]");
    if (!accordionTrigger) return;

    const sectionId = accordionTrigger.dataset.section;
    const accordionRoot = accordionTrigger.closest(".csb-accordion");
    if (!accordionRoot || !sectionId) return;

    const group = accordionRoot.dataset.group || "default";
    const currentSectionId = this.#activeAccordionSectionsByGroup.has(group)
      ? this.#activeAccordionSectionsByGroup.get(group)
      : (accordionRoot.dataset.default || null);
    const nextSectionId = currentSectionId === sectionId ? null : sectionId;

    this.#activeAccordionSectionsByGroup.set(group, nextSectionId);
    this.#applyAccordionState(accordionRoot, nextSectionId);
  }

  _onRender(context, options) {
    super._onRender?.(context, options);

    if (this.window?.title) {
      this.window.title.textContent = this.title;
    }

    const root = this._getRootElement();
    if (!root) return;

    // Some Foundry/browser/theme combinations still infer RTL behavior for
    // item sheet content even when the stylesheet says otherwise. Reassert the
    // canonical sheet text direction on every render so free-text tags,
    // families, summaries, and names stay stable across sheets and rebuilds.
    root.setAttribute("dir", "ltr");
    root.style.direction = "ltr";
    root.style.unicodeBidi = "isolate";
    root.style.writingMode = "horizontal-tb";

    const itemNameInput = root.querySelector('.item-name input[name="name"]');
    if (itemNameInput instanceof HTMLInputElement) {
      itemNameInput.setAttribute("dir", "ltr");
      itemNameInput.style.direction = "ltr";
      itemNameInput.style.unicodeBidi = "isolate";
      itemNameInput.style.textAlign = "left";
      itemNameInput.style.writingMode = "horizontal-tb";
    }

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

    for (const accordionRoot of root.querySelectorAll(".csb-accordion")) {
      const group = accordionRoot.dataset.group || "default";
      const activeSection = this.#activeAccordionSectionsByGroup.has(group)
        ? this.#activeAccordionSectionsByGroup.get(group)
        : (accordionRoot.dataset.default || null);
      this.#applyAccordionState(accordionRoot, activeSection);
    }

    for (const editor of root.querySelectorAll("prose-mirror[name]")) {
      const name = editor.getAttribute("name") ?? "";
      if (!RICH_TEXT_ITEM_FIELDS.has(name)) continue;
      editor.addEventListener("change", event => {
        event.preventDefault();
        event.stopPropagation();
        void this._updateRichTextField(editor);
      });
    }

    if (this.isEditable) {
      root.querySelectorAll(".mwd-list-picker[data-target-name]").forEach(picker => {
        picker.addEventListener("change", event => {
          event.preventDefault();
          const selected = String(picker.value ?? "").trim();
          if (!selected) return;

          const targetName = String(picker.dataset.targetName ?? "").trim();
          const target = targetName
            ? Array.from(root.querySelectorAll("input[name], textarea[name]"))
                .find(element => element.getAttribute("name") === targetName)
            : null;
          if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
            picker.value = "";
            return;
          }

          const current = String(target.value ?? "")
            .split(",")
            .map(entry => entry.trim())
            .filter(Boolean);
          target.value = Array.from(new Set([...current, selected])).join(", ");
          picker.value = "";
          void this._syncNamedField(target);
        });
      });

      for (const field of root.querySelectorAll("input[name], select[name], textarea[name]")) {
        if (field.closest("prose-mirror")) continue;
        if (field.hasAttribute("data-action")) continue;
        if (field.classList?.contains("mwd-list-picker")) continue;
        if (!(field instanceof HTMLElement)) continue;

        // Item updates trigger a sheet rerender. Saving while the user is still
        // typing can reset the caret and insert later characters at the start
        // of the field, so ordinary controls save when committed instead.
        field.addEventListener("change", event => {
          event.preventDefault();
          void this._syncNamedField(event.currentTarget ?? field);
        });
      }
    }

    this._restoreScrollPositions();
  }

  async _updateRichTextField(editor) {
    const name = String(editor?.getAttribute?.("name") ?? editor?.name ?? "");
    if (!this.isEditable || !RICH_TEXT_ITEM_FIELDS.has(name)) return;

    const value = String(editor.value ?? "");
    const current = String(foundry.utils.getProperty(this.item, name) ?? "");
    if (value === current) return;

    try {
      await this.item.update({ [name]: value });
    } catch (err) {
      console.warn("MWD | Rich text item update failed:", err);
    }
  }

  _getNamedFieldUpdate(field) {
    if (!(field instanceof HTMLElement)) return null;
    const name = String(field.getAttribute?.("name") ?? "").trim();
    if (!name || RICH_TEXT_ITEM_FIELDS.has(name)) return null;

    if (field instanceof HTMLInputElement) {
      if (field.type === "radio" && !field.checked) return null;
      if (field.type === "checkbox") return { [name]: field.checked };

      if (field.type === "number") {
        const numeric = Number(field.value);
        if (!Number.isFinite(numeric)) return null;
        return { [name]: numeric };
      }
    }

    const dtype = String(field.dataset?.dtype ?? "").trim().toLowerCase();
    if (dtype === "number") {
      const numeric = Number(field.value);
      if (!Number.isFinite(numeric)) return null;
      return { [name]: numeric };
    }

    if (dtype === "boolean") {
      return { [name]: field.value === "true" };
    }

    // Text-like controls should never emit `undefined`. Foundry treats that as
    // a schema violation for document names and other required string fields.
    return { [name]: String(field.value ?? "") };
  }

  async _syncNamedField(field, updateData = {}) {
    if (!this.isEditable) return;

    const fieldUpdate = this._getNamedFieldUpdate(field);
    const updates = sanitizeFieldUpdates({
      ...(fieldUpdate ?? {}),
      ...(updateData && typeof updateData === "object" ? updateData : {}),
    });

    if (!Object.keys(updates).length) return;

    this._captureScrollPositions();

    try {
      await this.item.update(updates);
    } catch (err) {
      console.warn("MWD | Item field sync failed:", { updates, err });
    }
  }

  async _onSubmitForm(_event, form, _formData, { updateData = null } = {}) {
    if (!this.isEditable || !(form instanceof HTMLFormElement)) return;
    this._captureScrollPositions();
    // Full-sheet submit is still the authoritative save path for controls that
    // do not participate in incremental field syncing.
    const submitData = this._prepareSubmitData(_event, form, _formData, updateData ?? {});
    await this._processSubmitData(_event, form, submitData);
  }

  _getScrollRestoreSelectors() {
    return [".sheet-body", ".csb-tab-panels"];
  }

  _captureScrollPositions() {
    const root = this._getRootElement();
    if (!root) {
      this.#pendingScrollRestore = null;
      return;
    }

    const positions = [];
    for (const selector of this._getScrollRestoreSelectors()) {
      root.querySelectorAll(selector).forEach((element, index) => {
        if (!(element instanceof HTMLElement)) return;
        positions.push({
          selector,
          index,
          top: element.scrollTop,
          left: element.scrollLeft,
        });
      });
    }

    this.#pendingScrollRestore = positions.length ? positions : null;
  }

  _restoreScrollPositions() {
    const pending = this.#pendingScrollRestore;
    if (!pending?.length) return;

    const apply = () => {
      const root = this._getRootElement();
      if (!root) return;

      for (const entry of pending) {
        const element = root.querySelectorAll(entry.selector).item(entry.index);
        if (!(element instanceof HTMLElement)) continue;
        element.scrollTop = entry.top;
        element.scrollLeft = entry.left;
      }
    };

    apply();
    requestAnimationFrame(apply);
    this.#pendingScrollRestore = null;
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

  #applyAccordionState(accordionRoot, sectionId) {
    accordionRoot.dataset.activeSection = sectionId ?? "";

    accordionRoot.querySelectorAll(".csb-accordion__section").forEach(section => {
      const isActive = section.dataset.section === sectionId;
      section.classList.toggle("is-active", isActive);
    });

    accordionRoot.querySelectorAll(".csb-accordion__trigger").forEach(trigger => {
      const isActive = trigger.dataset.section === sectionId;
      trigger.classList.toggle("is-active", isActive);
      trigger.setAttribute("aria-expanded", isActive ? "true" : "false");
    });

    accordionRoot.querySelectorAll(".csb-accordion__panel").forEach(panel => {
      const parentSection = panel.closest(".csb-accordion__section");
      const isActive = parentSection?.dataset.section === sectionId;
      panel.classList.toggle("is-active", isActive);
    });
  }

  /**
   * Override header buttons to add custom controls.
   * @returns {object[]} Array of header button configurations
   * @override
   */
  _getHeaderControls() {
    const buttons = super._getHeaderControls();
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
