// src/modules/dialog/select-actor.js
// Purpose: Preloads or manages Handlebars templates. References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { TEMPLATES_PATH } from "../core/constants.js";

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

    const options = {
      id: `select-actor-${foundry.utils.randomID()}`,
      classes: [game.system?.mwd?.styles?.selectCssClass?.() ?? "", ...SelectActor.DEFAULT_OPTIONS.classes].filter(Boolean),
      window: { title }
    };
    const app = new SelectActor({ actors, onActorSelected, onCancel }, options);
    return app.render({ force: true });
  }

  constructor(context = {}, options = {}) {
    super(context, options);
    this.actors = context.actors;
    this.onActorSelected = context.onActorSelected;
    this.onCancel = context.onCancel;
    this._actorSelected = false;
  }

  async _prepareContext() {
    return { actors: this.actors };
  }

  _onRender(context, options) {
    super._onRender?.(context, options);
    $(this.element).find(".click-select-actor").on("click", (event) => this.onSelectActor(event));
    $(this.element).find('[data-action="cancel"]').on("click", async () => await this.close());
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