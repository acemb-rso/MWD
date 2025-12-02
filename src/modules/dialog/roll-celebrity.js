import { ANARCHY } from "../config.js";
import { TEMPLATES_PATH } from "../constants.js";
import { Misc } from "../misc.js";
import { Modifiers } from "../modifiers/modifiers.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
const { renderTemplate } = foundry.applications.handlebars;

const HBS_TEMPLATE_CHAT_CELEBRITY_ROLL = `${TEMPLATES_PATH}/chat/celebrity-roll.hbs`;

export class RollCelebrity extends HandlebarsApplicationMixin(ApplicationV2) {

  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      id: "roll-celebrity",
      classes: ["anarchy-dialog"],
      position: { width: 400, height: "auto" },
      window: {
        resizable: true
      }
    }, { inplace: false });
  }

  static PARTS = {
    body: {
      template: `${TEMPLATES_PATH}/dialog/roll-celebrite.hbs`
    }
  };

  static async create(actor) {
    const rollData = {
      actor: actor,
      celebrity: {
        labelkey: ANARCHY.actor.counters.edgePools.legend,
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
    const options = {
      id: `roll-celebrity-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...RollCelebrity.DEFAULT_OPTIONS.classes],
      window: { title }
    };
    const app = new RollCelebrity({ roll: rollData }, options);
    return app.render({ force: true });
  }

  constructor(context = {}, options = {}) {
    super(context, options);
    this.roll = context.roll;
  }

  async _prepareContext() {
    return this.roll;
  }

  async activateListeners(html) {
    const element = html instanceof HTMLElement ? html : html[0];
    await super.activateListeners(element);
    const jqHtml = $(element);

    jqHtml.find(".input-celebrity-other").on('input', event => {
      this.roll.other.value = Number.parseInt(event.currentTarget.value) ?? 0;
    });

    jqHtml.find('[data-action="roll"]').on('click', async () => {
      await RollCelebrity.doRoll(this.roll);
      await this.close();
    });

    jqHtml.find('[data-action="cancel"]').on('click', async () => {
      await this.close();
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