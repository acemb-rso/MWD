import { HandleDragApplication } from "./handle-drag.js";
import { ANARCHY } from "../config.js";
import { SYSTEM_NAME } from "../constants.js";
import { GMWidget } from "./gm-widget.js";
import { PlotPointWidget } from "./widgets/plot-point-widget.js";
import { DifficultyWidget } from "./widgets/difficulty-widget.js";

const GM_MANAGER = "gm-manager";
const GM_MANAGER_POSITION = "gm-manager-position";
const GM_MANAGER_SIZE = "gm-manager-size";
const GM_MANAGER_DEFAULT_SIZE = { width: 360, height: 0 };
const GM_MANAGER_INITIAL_POSITION = { top: 200, left: 200 };
const GM_MANAGER_TEMPLATE = "systems/mwd/templates/app/gm-manager.hbs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * GM Manager - Main control panel for Game Masters
 * Provides quick access to plot points, difficulty pools, and other GM tools
 */
export class GMManager extends HandlebarsApplicationMixin(ApplicationV2) {

  static DEFAULT_OPTIONS = {
    id: GM_MANAGER,
    classes: ["gm-manager"],
    window: {
      title: ANARCHY.gmManager.title,
      popOut: false,
      resizable: false
    },
    position: {
      height: "auto",
      width: "auto"
    },
    actions: {
      toggleSection: GMManager._onToggleSection,
      hideManager: GMManager._onHideManager
    }
  };

  static PARTS = {
    body: {
      template: GM_MANAGER_TEMPLATE
    }
  };

  constructor(options = {}) {
    super(options);

    // Initialize widgets
    this.widgets = [];
    this._initializeWidgets();

    // Register settings used by the GM Manager (size, etc.)
    this._registerSettings();

    // Load size from settings
    this.size = game.settings.get(SYSTEM_NAME, GM_MANAGER_SIZE) ?? GM_MANAGER_DEFAULT_SIZE;

    // Initialize drag handler
    this.handleDrag = new HandleDragApplication(
      () => this.element,
      {
        initial: GM_MANAGER_INITIAL_POSITION,
        maxPos: { left: window.innerWidth - 100, top: window.innerHeight - 100 },
        minPos: { left: 2, top: 2 },
        settings: {
          system: SYSTEM_NAME,
          keyPosition: GM_MANAGER_POSITION
        }
      }
    );
  }

  /**
   * Initialize all widgets that will be displayed in the GM Manager
   */
  _initializeWidgets() {
    this.widgets = [
      new PlotPointWidget(this),
      new DifficultyWidget(this)
    ];
  }

  /**
   * Register all settings used by the GM Manager
   */
  _registerSettings() {
    // Size setting (client-side)
    game.settings.register(SYSTEM_NAME, GM_MANAGER_SIZE, {
      scope: "client",
      config: false,
      default: GM_MANAGER_DEFAULT_SIZE,
      type: Object
    });
  }

  /**
   * Prepare context data for rendering
   */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    // Gather widget data
    const widgetData = await Promise.all(
      this.widgets.map(widget => widget.getTemplateData())
    );

    return foundry.utils.mergeObject(context, {
      widgets: widgetData,
      ANARCHY: ANARCHY,
      cssClass: game.system.anarchy.styles.selectCssClass()
    });
  }

  /**
   * Render the GM Manager (only for GMs)
   */
  async render(options = {}) {
    if (!game.user.isGM) return this;
    return super.render(options);
  }

  /**
   * Attach event listeners after rendering
   */
  _attachPartListeners(partId, htmlElement, options) {
    super._attachPartListeners(partId, htmlElement, options);

    if (partId === "body") {
      // Dragging
      const titleBar = htmlElement.querySelector(".gm-manager-header");
      if (titleBar) {
        titleBar.addEventListener("mousedown", event => {
          if (event.button === 0) { // Left click only
            this.handleDrag?.onMouseDown(event);
          }
        });
      }

      // Resizing
      this._activateResizeHandle(htmlElement);

      // Apply stored size
      this._applyStoredSize(htmlElement);

      // Initialize all widgets
      this.widgets.forEach(widget => widget.activateListeners(htmlElement));
    }
  }

  /**
   * Activate the resize handle
   */
  _activateResizeHandle(element) {
    const handle = element.querySelector(".gm-manager-resize-handle");
    if (!handle) {
      console.warn("GM Manager: Resize handle not found in template");
      return;
    }

    handle.addEventListener("mousedown", event => this._onResizeMouseDown(event, element));
  }

  /**
   * Handle resize mouse down
   */
  _onResizeMouseDown(event, element) {
    event.preventDefault();
    event.stopPropagation();

    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = element.offsetWidth;
    const startHeight = element.offsetHeight;

    const onMouseMove = moveEvent => {
      moveEvent.preventDefault();
      const width = startWidth + (moveEvent.clientX - startX);
      const height = startHeight + (moveEvent.clientY - startY);
      const constrained = this._constrainSize(element, width, height);
      this._applySize(element, constrained);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      this.size = this._constrainSize(element, element.offsetWidth, element.offsetHeight);
      game.settings.set(SYSTEM_NAME, GM_MANAGER_SIZE, this.size);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  /**
   * Constrain size within min/max bounds
   */
  _constrainSize(element, width, height) {
    const minWidth = 300;
    const minHeight = 140;

    const minLeft = this.handleDrag?.minPos?.left ?? 0;
    const minTop = this.handleDrag?.minPos?.top ?? 0;

    const maxWidth = Math.max(minWidth, window.innerWidth - minLeft);
    const maxHeight = Math.max(minHeight, window.innerHeight - minTop);

    return {
      width: Math.min(maxWidth, Math.max(minWidth, width)),
      height: Math.min(maxHeight, Math.max(minHeight, height))
    };
  }

  /**
   * Apply size to element
   */
  _applySize(element, size) {
    if (!element) return;
    element.style.width = `${size.width}px`;
    element.style.height = `${size.height}px`;
  }

  /**
   * Apply stored size from settings
   */
  _applyStoredSize(element) {
    if (!element || !this.size) return;

    const { width, height } = this.size;
    if (width && width > 0) {
      element.style.width = `${width}px`;
    }
    if (height && height > 0) {
      element.style.height = `${height}px`;
    }
  }

  /**
   * Refresh the GM Manager display
   */
  async refresh() {
    // AppV2-style partial render
    return this.render({ parts: ["body"] });
  }

  /**
   * Action: Toggle section collapsed state
   */
  static async _onToggleSection(event, target) {
    const sectionId = target.dataset.section;
    if (!sectionId) return;

    const section = this.element.querySelector(`[data-section-content="${sectionId}"]`);
    const icon = target.querySelector("i");

    if (section) {
      const isCollapsed = section.classList.toggle("collapsed");
      if (icon) {
        icon.classList.toggle("fa-chevron-down", !isCollapsed);
        icon.classList.toggle("fa-chevron-right", isCollapsed);
      }

      // TODO: Save collapsed state to settings
    }
  }

  /**
   * Action: Hide the GM Manager
   */
  static async _onHideManager(event, target) {
    await this.close();
  }

  /**
   * Hook: Called when ready (instance pattern – optional now that AnarchySystem handles ready)
   */
  onReady() {
    if (game.user.isGM) {
      this.render({ force: true });
    }
  }

  /**
   * Hook: Called when chat message control is rendered
   */
  onRenderChatMessage(html) {
    if (!game.user.isGM) return;

    // Add destiny dice roller button
    const chatControls = html.find("form.chat-form");
    if (chatControls.length === 0) return;

    // Check if button already exists
    if (chatControls.find(".destiny-roller").length > 0) return;

    const button = $(`
      <button class="destiny-roller" type="button" title="${ANARCHY.chat_actions.rollDice.title}">
        <i class="fas fa-dice-d6"></i>
      </button>
    `);

    button.on("click", async () => {
      const count = await foundry.applications.api.DialogV2.prompt({
        window: { title: ANARCHY.chat_actions.rollDice.title },
        content: `<p>${ANARCHY.chat_actions.rollDice.instruction}</p>
                  <input type="number" name="diceCount" value="2" min="1" max="20" />`,
        ok: {
          label: ANARCHY.common.roll.button,
          callback: (event, button, dialog) => {
            const input = button.form.elements.diceCount;
            return parseInt(input.value) || 2;
          }
        }
      });

      if (!count || count < 1) return;

      const roll = new Roll(`${count}d6cs>4`);
      await roll.evaluate();

      const results = roll.terms[0].results;
      const ones = results.filter(r => r.result === 1).length;

      const flavor = formatString(ANARCHY.chat_actions.rollDice.result, {
        count,
        success: roll.total,
        ones
      });

      await roll.toMessage({ flavor });
    });

    chatControls.append(button);

    // Add GM Manager toggle button
    const gmButton = $(`
      <button class="gmmanager" type="button" title="${ANARCHY.gmManager.title}">
        <i class="fas fa-toolbox"></i>
      </button>
    `);

    gmButton.on("click", () => {
      if (this.rendered) {
        this.close();
      } else {
        this.render({ force: true });
      }
    });

    chatControls.append(gmButton);
  }
}
