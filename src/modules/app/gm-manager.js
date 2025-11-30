import { HandleDragApplication } from "./handle-drag.js";
import { ANARCHY } from "../config.js";
import { SYSTEM_NAME } from "../constants.js";
import { GMDifficulty } from "./gm-difficulty.js";

const { renderTemplate } = foundry.applications.handlebars;
const GM_MANAGER = "gm-manager";
const GM_MANAGER_POSITION = "gm-manager-position";
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
    });
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

    this.gmAnarchy.activateListeners(jqHtml);
    this.gmDifficulty.activateListeners(jqHtml);
  }

}