import { TEMPLATES_PATH } from "../constants.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class SelectActor extends HandlebarsApplicationMixin(ApplicationV2) {

  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      id: "select-actor",
      classes: ["select-actor", "anarchy-dialog"],
      position: { width: 300, height: "auto" },
      window: {
        resizable: true
      }
    }, { inplace: false });
  }

  static PARTS = {
    body: {
      template: `${TEMPLATES_PATH}/dialog/select-actor.hbs`
    }
  };

  static async selectActor(title,
    actors,
    onActorSelected = async actor => { },
    onCancel = async () => { }) {

    const app = new SelectActor(actors, onActorSelected, onCancel, title);
    return app.render({ force: true });
  }

  constructor(actors, onActorSelected, onCancel, title) {
    const options = foundry.utils.mergeObject(SelectActor.DEFAULT_OPTIONS, {
      id: `select-actor-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...SelectActor.DEFAULT_OPTIONS.classes],
      window: { title }
    }, { inplace: false });
    super(options);
    this.actors = actors;
    this.onActorSelected = onActorSelected;
    this.onCancel = onCancel;
    this._actorSelected = false;
  }

  async _prepareContext() {
    return { actors: this.actors };
  }

  async activateListeners(html) {
    const element = html instanceof HTMLElement ? html : html[0];
    await super.activateListeners(element);
    const jqHtml = $(element);

    jqHtml.find(".click-select-actor").click((event) => this.onSelectActor(event));
    jqHtml.find('[data-action="cancel"]').on('click', async () => await this.close());
  }

  async onSelectActor(event) {
    const actorId = $(event.currentTarget).attr('data-actor-id');
    const actor = this.actors.find(it => it.id == actorId);
    if (actor) {
      this._actorSelected = true;
      await this.onActorSelected(actor);
      await this.close();
    }
  }

  async close(options) {
    if (!this._actorSelected && this.onCancel) {
      await this.onCancel();
    }
    return super.close(options);
  }
}