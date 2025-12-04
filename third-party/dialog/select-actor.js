import { ANARCHY } from "../config.js";
import { TEMPLATES_PATH } from "../constants.js";
import { Icons } from "../icons.js";

export class SelectActor extends Dialog {

  static async selectActor(title,
    actors,
    onActorSelected = async actor => { },
    onCancel = async () => { }) {

    let dialogOptions = { classes: ["select-actor"], width: 300, height: 300, 'z-index': 99999 };
    let dialogConfig = {
      title: title,
      content: await renderTemplate(`${TEMPLATES_PATH}/dialog/select-actor.hbs`, {
        actors: actors
      }),
      buttons: {
        cancel: {
          icon: Icons.fontAwesome('fas fa-times'),
          label: game.i18n.localize(ANARCHY.common.cancel),
          callback: async () => { await onCancel(); }
        }
      },
      default: 'cancel'
    }
    new SelectActor(dialogConfig, dialogOptions, actors, onActorSelected)
      .render(true);
  }

  constructor(dialogConfig, dialogOptions, actors, onActorSelected) {
    super(dialogConfig, dialogOptions);
    this.actors = actors;
    this.onActorSelected = onActorSelected;
  }

  /* -------------------------------------------- */
  activateListeners(html) {
    super.activateListeners(html);
    html.find(".click-select-actor").click((event) => this.onSelectActor(event));
  }

  async onSelectActor(event) {
    const actorId = $(event.currentTarget).attr('data-actor-id');
    const actor = this.actors.find(it => it.id == actorId);
    if (actor) {
      this.onActorSelected(actor);
      this.close();
    }
  }
}