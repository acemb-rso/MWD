// src/modules/token/hud-shortcuts.js
// Purpose: Registers Foundry hooks: renderTokenHUD, ready. Renders Handlebars templates at runtime. References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { ANARCHY } from "../core/config.js";
import { TEMPLATES_PATH } from "../core/constants.js";
import { Misc } from "../utils/misc.js";

const { loadTemplates, renderTemplate } = foundry.applications.handlebars;

const TEMPLATE_HUD_SHORTCUTS = `${TEMPLATES_PATH}/token/hud-shortcuts.hbs`;

export class HUDShortcuts {

  constructor() {
    Hooks.on('renderTokenHUD', async (tokenHUD, html, tokenHUDData) => await this.addExtensionHud(tokenHUD, html, tokenHUDData._id));
    Hooks.once('ready', () => this.onReady());
  }

  async onReady() {
    await loadTemplates([
      TEMPLATE_HUD_SHORTCUTS,
    ]);
  }

  /* -------------------------------------------- */
  async removeExtensionHud(app, html, tokenId) {
    const hudHtml = html instanceof jQuery ? html : $(html);
    hudHtml.find('.control-icon.anarchy-shortcuts').remove();
  }

  async addExtensionHud(app, html, tokenId) {
    app.hasExtension = true;

    const hud = await this._renderShortcuts(tokenId);
    const hudHtml = html instanceof jQuery ? html : $(html);
    hudHtml.find('.control-icon[data-action=combat]').after(hud);
  }

  async _renderShortcuts(tokenId) {
    const token = canvas.tokens.get(tokenId);
    const hbsHudData = {
      tokenId: tokenId,
      shortcuts: token.actor.getShortcuts(),
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      },
    };
    const html = await renderTemplate(TEMPLATE_HUD_SHORTCUTS, hbsHudData);
    const hud = $(html);
    const list = hud.find('.anarchy-shortcuts-list');

    this._toggleHudActive(hud, list);

    hud.find('.anarchy-shortcuts-toggle').click(event => {
      this._toggleHudActive(hud, list);
    });

    list.find('.anarchy-shortcut-button').click(event => {
      const tokenId = $(event.currentTarget).closest('.anarchy-shortcuts-list').attr('data-token-id');
      const shortcutType = $(event.currentTarget).attr('data-shortcut-type');
      const shortcutId = $(event.currentTarget).attr('data-shortcut-id');
      this.onClickShortcutButton(tokenId, shortcutType, shortcutId);
    });
    return hud;
  }

  onClickShortcutButton(tokenId, shortcutType, shortcutId) {
    const token = canvas.tokens.get(tokenId);
    const actor = token?.actor;
    if (actor) {
      const shortcut = actor?.getShortcut(shortcutType, shortcutId);
      shortcut?.callback(token);
    }
    else {
      ui.notifications.warn(game.i18.localize(ANARCHY.common.errors.noTokenActor));
    }
  }

  _toggleHudActive(hud, list) {
    hud.toggleClass('active');
    Misc.showControlWhen(list, hud.hasClass('active'));
  }

}