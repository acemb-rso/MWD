import { Checkbars } from "../common/checkbars.js";
import { ANARCHY } from "../config.js";
import { SYSTEM_NAME, TEMPLATES_PATH } from "../constants.js";
import { RemoteCall } from "../remotecall.js";

const CONVERGENCES = "convergences";
const SETTING_KEY_CONVERGENCES = `${SYSTEM_NAME}.${CONVERGENCES}`;
const ROLL_CONVERGENCE = 'GMConvergence.rollConvergence';

const HBS_TEMPLATE_CONVERGENCE = `${TEMPLATES_PATH}/app/gm-convergence.hbs`
const HBS_TEMPLATE_CONVERGENCE_ACTORS = `${TEMPLATES_PATH}/app/gm-convergence-actors.hbs`;
export class GMConvergence {

  constructor() {
    game.settings.register(SYSTEM_NAME, CONVERGENCES, {
      scope: "world",
      config: false,
      default: [],
      type: Array
    });
    this.convergences = [];
    Hooks.on('updateSetting', async (setting, update, options, id) => this.onUpdateSetting(setting, update, options, id));
    Hooks.once('ready', () => this.onReady());
  }

  async onReady() {
    await loadTemplates([
      HBS_TEMPLATE_CONVERGENCE,
      HBS_TEMPLATE_CONVERGENCE_ACTORS
    ]);
    this.convergences = game.settings.get(SYSTEM_NAME, CONVERGENCES)
      .filter(it => game.actors.get(it.actorId));
    await RemoteCall.register(ROLL_CONVERGENCE, {
      callback: it => this.rollConvergence(it.actorId, it.convergence),
      condition: user => user.isGM
    });
  }

  getConvergences() {
    return this.convergences;
  }

  async rollConvergence(actorId, convergence) {
    if (!RemoteCall.call(ROLL_CONVERGENCE, { actorId: actorId, convergence: convergence })) {
      await this._gmRollConvergence(convergence, actorId);
    }
  }

  async _gmRollConvergence(convergence, actorId) {
    const actor = game.actors.get(actorId);
    const rollConvergence = new Roll(`${convergence}dgcf=1[${game.i18n.localize(ANARCHY.common.roll.rollTheme.convergence)}]`);
    await rollConvergence.evaluate({ async: true });
    this.addConvergence(actor, rollConvergence.total);
    rollConvergence.toMessage({
      user: game.user,
      whisper: ChatMessage.getWhisperRecipients('GM'),
      blind: true,
      flavor: `Convergence for ${actor.name}: ${rollConvergence.total}`
    }, { rollType: 'blindroll' });
  }

  async addConvergence(actor, added) {
    if (!game.user.isGM || !added) {
      return;
    }
    await this.setActorConvergence(actor, this.getConvergence(actor) + added);
  }

  getConvergence(actor) {
    if (!game.user.isGM) {
      return 0; // undisclosed
    }
    return this.convergences.find(it => it.actorId == actor.id)?.convergence ?? 0;
  }

  async setActorConvergence(actor, newConvergence) {
    let c = this.convergences.find(it => it.actorId == actor.id);
    if (!c) {
      c = { actorId: actor.id };
      this.convergences.push(c);
    }
    c.convergence = newConvergence;
    this.convergences = this.convergences.filter(it => it.convergence > 0);
    game.settings.set(SYSTEM_NAME, CONVERGENCES, this.convergences);
  }


  async activateListeners(html) {
    this.toolbar = html.find(".gm-convergence-bar");
    await this._rebuild();
  }

  async onUpdateSetting(setting, update, options, id) {
    if (game.user.isGM && setting.key == SETTING_KEY_CONVERGENCES) {
      await this._rebuild();
    }
  }

  async _rebuild() {
    this.toolbar.find('.gm-convergence-content').replaceWith(await this._renderBar());
    this.toolbar.find('a.click-checkbar-element').click(async (event) => await this._onClickConvergence(event));
  }


  async _onClickConvergence(event) {
    const monitor = $(event.currentTarget).closest('.checkbar-root').attr('data-monitor-code');
    const actorId = $(event.currentTarget).closest('.actor-convergence').attr('data-actor-id');
    const index = Number.parseInt($(event.currentTarget).attr('data-index'));
    const isChecked = $(event.currentTarget).attr('data-checked') == 'true';
    const newConvergence = Checkbars.newValue(index, isChecked);
    const actor = game.actors.get(actorId);
    await this.setActorConvergence(actor, newConvergence);
  }

  async _renderBar() {
    const actorsConvergence = {
      convergences: this.convergences.map(it => {
        return {
          actor: game.actors.get(it.actorId),
          convergence: it.convergence
        };
      })
    };
    const html = await renderTemplate(HBS_TEMPLATE_CONVERGENCE_ACTORS, actorsConvergence);
    return html;
  }

}
