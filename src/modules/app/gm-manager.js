import { HandleDragApplication } from "./handle-drag.js";
import { ANARCHY } from "../config.js";
import { SYSTEM_NAME } from "../constants.js";
import { GMDifficulty } from "./gm-difficulty.js";

const { renderTemplate } = foundry.applications.handlebars;
const GM_MANAGER = "gm-manager";
const GM_MANAGER_POSITION = "gm-manager-position";
const GM_MANAGER_SIZE = "gm-manager-size";
const GM_MANAGER_DEFAULT_SIZE = { width: 360, height: 0 };
const GM_MANAGER_INITIAL_POSITION = { top: 200, left: 200 };
const GM_MANAGER_TEMPLATE = 'systems/mwd/templates/app/gm-manager.hbs';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class GMManager extends HandlebarsApplicationMixin(ApplicationV2) {

  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      id: GM_MANAGER,
      window: {
        title: game.i18n.localize(ANARCHY.gmManager.title),
        popOut: false,
        resizable: false
      },
      position: {
        height: "auto",
        width: "auto"
      }
    }, { inplace: false });
  }

  static PARTS = {
    body: {
      template: GM_MANAGER_TEMPLATE
    }
  };

  constructor(gmAnarchy) {
    super();
    this.gmAnarchy = gmAnarchy;
    this.gmDifficulty = new GMDifficulty();
    this.size = this._registerSizeSetting();
    this.handleDrag = new HandleDragApplication(
      doc => doc.getElementById("gm-manager"),
      {
        initial: GM_MANAGER_INITIAL_POSITION,
        maxPos: { left: 200, top: 100 },
        settings: {
          system: SYSTEM_NAME,
          keyPosition: GM_MANAGER_POSITION
        }
      })
    Hooks.once('ready', () => this.onReady());
    Hooks.on("renderChatLog", async (app, html, data) => {
      const templatePath = "systems/mwd/templates/app/chat-tools.hbs";
      const templateData = {
        title: game.i18n.localize("ANARCHY.gmManager.title"),
        rollDice: game.i18n.localize("ANARCHY.chat_actions.rollDice.title"),
        isGM: game.user.isGM,
      };
      const templateHTML = await renderTemplate(templatePath, templateData);
      const template = $(templateHTML)
      $(html).find('form.chat-form').append(template[0]);

      const buttonDICE = $(html).find('form.chat-form .rolldice')

      buttonDICE.on("click", event => {
        event.preventDefault();
        new Dialog({
          title: game.i18n.localize("ANARCHY.chat_actions.rollDice.title"),
          content: "<div style=\"display:flex;margin:4px 0 8px 0;align-items:center;gap:8px\">" +
            game.i18n.localize("ANARCHY.chat_actions.rollDice.instruction") +
            '<input class="roll-dice-value" name="macro-roll-count-dice" type="number" value="3" /></div>',
          buttons: {
            cancel: { label: game.i18n.localize("ANARCHY.common.cancel"), icon: '<i class="fas fa-times"></i>' },
            submit: {
              label: game.i18n.localize("ANARCHY.common.roll.button"), icon: '<i class="fas fa-dice"></i>',
              callback: async (html) => {
                const count = $(html).find('input[name="macro-roll-count-dice"]').val();
                if (!count || isNaN(count) || count <= 0) {
                  ui.notifications.warn(game.i18n.localize("ANARCHY.chat_actions.rollDice.error"));
                  return;
                }

                const roll = new Roll(`${count}d6cs>4`);
                await roll.evaluate({ async: true });

                const results = roll.terms[0].results;
                const ones = results.filter(it => it.result == 1).length;

                const flavor = game.i18n.format("ANARCHY.chat_actions.rollDice.result", {
                  count: count,
                  success: roll.total,
                  ones: ones
                });
                const message = await roll.toMessage({ flavor: flavor }, { create: false });

                ChatMessage.create(message);
              }
            }
          },
          default: "submit"
        }).render(true);
      })

      const buttonGM = $(html).find('form.chat-form .gmmanager')
      buttonGM.on("click", event => {
        event.preventDefault();
        if (this.rendered) {
          this.close();
        } else {
          this.render({ force: true });
        }
      })

    })
  }

  onReady() {
    if (game.user.isGM) {
      this.render({ force: true });
    }
  }

  async render(options = {}) {
    if (game.user.isGM) {
      return super.render(options);
    }
    return this;
  }

  async _prepareContext() {
    this.handleDrag.setPosition();
    return {
      anarchy: this.gmAnarchy.getAnarchy(),
      difficultyPools: this.gmDifficulty.getDifficultyData(),
      ANARCHY: ANARCHY,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      }
    }
  }

  async activateListeners(html) {
    const element = html instanceof HTMLElement ? html : html[0];
    await super.activateListeners(element);

    const jqHtml = $(element);

    jqHtml.find('.app-title-bar').mousedown(event => this.handleDrag.onMouseDown(event));
    jqHtml.find('.gm-manager-hide-button').mousedown(event => this.close());
    this._applyStoredSize(element);
    this._activateResizeHandle(element);

    this.gmAnarchy.activateListeners(jqHtml);
    this.gmDifficulty.activateListeners(jqHtml);
  }

  _registerSizeSetting() {
    game.settings.register(SYSTEM_NAME, GM_MANAGER_SIZE, {
      scope: "client",
      config: false,
      default: GM_MANAGER_DEFAULT_SIZE,
      type: Object
    });
    return game.settings.get(SYSTEM_NAME, GM_MANAGER_SIZE);
  }

  _applyStoredSize(element) {
    if (!element) return;
    const width = this.size?.width;
    const height = this.size?.height;
    if (width && width > 0) {
      element.style.width = `${width}px`;
    }
    if (height && height > 0) {
      element.style.height = `${height}px`;
    }
  }

  _activateResizeHandle(element) {
    const handle = element.querySelector('.gm-manager-resize-handle');
    if (!handle) return;

    handle.addEventListener('mousedown', event => this._onResizeMouseDown(event, element));
  }

  _onResizeMouseDown(event, element) {
    event.preventDefault();
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

    const onMouseUp = upEvent => {
      upEvent.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      this.size = this._constrainSize(element, element.offsetWidth, element.offsetHeight);
      game.settings.set(SYSTEM_NAME, GM_MANAGER_SIZE, this.size);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  _constrainSize(element, width, height) {
    const minWidth = 300;
    const minHeight = 140;
    const maxWidth = Math.max(minWidth, window.innerWidth - this.handleDrag.minPos.left);
    const maxHeight = Math.max(minHeight, window.innerHeight - this.handleDrag.minPos.top);
    return {
      width: Math.min(maxWidth, Math.max(minWidth, width)),
      height: Math.min(maxHeight, Math.max(minHeight, height))
    };
  }

  _applySize(element, size) {
    element.style.width = `${size.width}px`;
    element.style.height = `${size.height}px`;
  }

}