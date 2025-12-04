import { Checkbars } from "../common/checkbars.js";
import { ANARCHY } from "../config.js";
import { SYSTEM_NAME, TEMPLATE } from "../constants.js";
import { ErrorManager } from "../error-manager.js";
import { RemoteCall } from "../remotecall.js";

const GM_ANARCHY = "anarchy-gm";
const GM_SCENE_ANARCHY = "scene-anarchy-gm";
const GM_ADD_ANARCHY = 'GMAnarchy.addAnarchy';

export class GMAnarchy {

  constructor() {
    game.settings.register(SYSTEM_NAME, GM_ANARCHY, {
      scope: "world",
      config: false,
      default: 1,
      type: Number
    });
    game.settings.register(SYSTEM_NAME, GM_SCENE_ANARCHY, {
      scope: "world",
      config: false,
      default: 0,
      type: Number
    });

    RemoteCall.register(GM_ADD_ANARCHY, {
      callback: data => game.system.anarchy.gmAnarchy.addAnarchy(data),
      condition: user => user.isGM
    });
    this.anarchy = game.settings.get(SYSTEM_NAME, GM_ANARCHY);
  }

  getAnarchy() {
    return {
      isGM: true,
      value: this.anarchy,
      max: this.anarchy + 1,
      scene: 0
    }
  }

  async actorGivesAnarchyToGM(actor, count) {
    if (count > 0) {
      ChatMessage.create({
        user: game.user,
        whisper: ChatMessage.getWhisperRecipients('GM'),
        content: game.i18n.format(ANARCHY.gmManager.gmReceivedAnarchy,
          {
            anarchy: count,
            actor: actor.name
          })
      });
      await this.addAnarchy(count);
    }
  }

  async npcConsumesAnarchy(actor, count) {
    await this.addAnarchy(-count);
  }

  async addAnarchy(count) {
    if (!RemoteCall.call(GM_ADD_ANARCHY, count)) {
      ErrorManager.checkSufficient(ANARCHY.actor.counters.plot, -count, this.anarchy);
      await this.setAnarchy(this.anarchy + count);
    }
  }

  async setAnarchy(newAnarchy) {
    this.anarchy = newAnarchy;
    game.settings.set(SYSTEM_NAME, GM_ANARCHY, newAnarchy);
    await this._rebuild();
    this._syncGMAnarchySheets();
  }

  async activateListeners(html) {
    this.toolbar = html.find(".gm-anarchy-bar");
    await this._rebuild();
  }

  async _rebuild() {
    this.toolbar.find('.checkbar-root').replaceWith(await this._renderBar());
    this.toolbar.find('a.click-checkbar-element').click(async (event) => await this._onClickAnarchyCheckbar(event));
  }

  async _onClickAnarchyCheckbar(event) {
    const index = Number.parseInt($(event.currentTarget).attr('data-index'));
    const isChecked = $(event.currentTarget).attr('data-checked') == 'true';
    const newAnarchy = Checkbars.newValue(index, isChecked);
    await this.setAnarchy(newAnarchy);
  }

  async _renderBar() {
    return await renderTemplate("systems/anarchy/templates/monitors/anarchy.hbs", {
      code: 'plot',
      rowlength: 6,
      value: this.getAnarchy().value,
      max: this.getAnarchy().max,
      scene: 0,
      labelkey: ANARCHY.actor.counters.plot
    });
  }

  _syncGMAnarchySheets() {
    const linkedActors = game.actors.filter(actor => !actor.token || actor.token.isLinked);
    const unlinkedActors = (game.canvas?.tokens?.getDocuments() ?? [])
      .filter(t => !t.isLinked)
      .map(t => t.actor);

    linkedActors.concat(unlinkedActors)
      .filter(actor => !actor.hasPlayerOwner)
      .forEach(actor => actor.render());
  }
}