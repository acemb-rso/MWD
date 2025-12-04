import { ANARCHY } from "../config.js";
import { TEMPLATES_PATH } from "../constants.js";
import { Misc } from "../misc.js";

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
    html.find('.control-icon.anarchy-shortcuts').remove();
  }

  async addExtensionHud(app, html, tokenId) {
    app.hasExtension = true;

    const hud = await this._renderShortcuts(tokenId);
    html.find('.control-icon[data-action=combat]').after(hud);
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