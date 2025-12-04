import { ANARCHY } from "../config.js";
import { TEMPLATES_PATH } from "../constants.js";
import { Misc } from "../misc.js";
import { Modifiers } from "../modifiers/modifiers.js";

const HBS_TEMPLATE_CHAT_CELEBRITY_ROLL = `${TEMPLATES_PATH}/chat/celebrity-roll.hbs`;

export class RollCelebrity extends Dialog {

  static async create(actor) {
    const rollData = {
      actor: actor,
      celebrity: {
        labelkey: ANARCHY.actor.celebrity,
        value: actor.getCelebrityValue(),
      },
      modifiers: foundry.utils.mergeObject(
        { labelkey: ANARCHY.item.tabs.modifiers },
        Modifiers.computeModifiers(actor.items, 'other', 'celebrity')
      ),
      other: {
        labelkey: ANARCHY.common.roll.modifiers.other,
        value: 0
      },
      ANARCHY: ANARCHY,
    }

    const title = await renderTemplate(`${TEMPLATES_PATH}/dialog/roll-celebrite-title.hbs`, rollData);
    const html = await renderTemplate(`${TEMPLATES_PATH}/dialog/roll-celebrite.hbs`, rollData);
    new RollCelebrity(title, html, rollData).render(true);
  }

  constructor(title, html, roll) {
    const config = {
      title: title,
      content: html,
      default: 'roll',
      buttons: {
        'roll': {
          label: game.i18n.localize(ANARCHY.common.roll.button),
          callback: async () => RollCelebrity.doRoll(roll)
        }
      },
    };
    const options = {
      classes: [game.system.anarchy.styles.selectCssClass(), "anarchy-dialog"],
      width: 400,
      height: 'fit-content',
      'z-index': 99999,
    };

    super(config, options);
  }

  activateListeners(html) {
    super.activateListeners(html);
    this.bringToTop();
    html.find(".input-celebrity-other").on('input', event => {
      this.roll.other.value = Number.parseInt(event.currentTarget.value) ?? 0;
    });
  }

  static async doRoll(rollData) {
    const parameters = [
      rollData.celebrity,
      rollData.modifiers,
      rollData.other
    ];
    const pool = Misc.sumValues(parameters, it => it.value);
    const hbsCelebrityRoll = {
      actor: rollData.actor,
      parameters: parameters,
      pool: pool,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      },
      ANARCHY: ANARCHY
    }
    const roll = new Roll(`${pool}d6cs>=5`);
    await roll.evaluate();

    const flavor = await renderTemplate(HBS_TEMPLATE_CHAT_CELEBRITY_ROLL, hbsCelebrityRoll);
    await roll.toMessage({ flavor: flavor });
  }

  // async roll() {
  //   const parameters = [
  //     this.roll.celebrity,
  //     this.roll.modifiers,
  //     this.roll.other
  //   ];
  //   const pool = Misc.sumValues(parameters, it => it.value);
  //   const hbsCelebrityRoll = {
  //     actor: this.roll.actor,
  //     parameters: parameters,
  //     pool: pool,
  //     options: {
  //       classes: [game.system.anarchy.styles.selectCssClass()]
  //     },
  //     ANARCHY: ANARCHY
  //   }
  //   const roll = new Roll(`${pool}d6cs>=5`);
  //   await roll.evaluate();

  //   const flavor = await renderTemplate(HBS_TEMPLATE_CHAT_CELEBRITY_ROLL, hbsCelebrityRoll);
  //   await roll.toMessage({ flavor: flavor });
  // }
}