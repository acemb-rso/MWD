import { HandleDragApplication } from "./handle-drag.js";
import { ANARCHY } from "../config.js";
import { SYSTEM_NAME } from "../constants.js";
import { GMDifficulty } from "./gm-difficulty.js";
import "../../styles/gm-manager.scss";


const GM_MANAGER = "gm-manager";
const GM_MANAGER_POSITION = "gm-manager-position";
const GM_MANAGER_INITIAL_POSITION = { top: 200, left: 200 };
const GM_MANAGER_TEMPLATE = 'systems/anarchy/templates/app/gm-manager.hbs';

export class GMManager extends Application {

  constructor(gmAnarchy, gmConvergence) {
    super();
    this.gmAnarchy = gmAnarchy;
    this.gmConvergence = gmConvergence;
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
      const templatePath = "systems/anarchy/templates/app/chat-tools.hbs";
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
        if (this._element) {
          this.close();
        } else {
          this.render(true);
        }
      })

    })
  }

  onReady() {
    if (game.user.isGM) {
      this.render(true);
    }
  }

  /* -------------------------------------------- */
  static get defaultOptions() {
    let options = super.defaultOptions;
    options.id = GM_MANAGER;
    options.title = game.i18n.localize(ANARCHY.gmManager.title);
    options.template = GM_MANAGER_TEMPLATE;
    options.popOut = false;
    options.resizable = false;
    options.height = "auto";
    options.width = "auto";
    return options;
  }
  async render(force, options) {
    if (game.user.isGM) {
      await super.render(force, options);
    }
  }

  getData() {
    this.handleDrag.setPosition();
    return {
      anarchy: this.gmAnarchy.getAnarchy(),
      convergences: this.gmConvergence.getConvergences(),
      difficultyPools: this.gmDifficulty.getDifficultyData(),
      ANARCHY: ANARCHY,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      }
    }
  }

  async activateListeners(html) {
    super.activateListeners(html);

    html.find('.app-title-bar').mousedown(event => this.handleDrag.onMouseDown(event));
    html.find('.gm-manager-hide-button').mousedown(event => this.close());

    this.gmAnarchy.activateListeners(html);
    this.gmConvergence.activateListeners(html);
    this.gmDifficulty.activateListeners(html);
  }

}