import { ANARCHY } from "../config.js";
import { SelectActor } from "../dialog/select-actor.js";
import { AnarchyActorSheet } from "./anarchy-actor-sheet.js";

export class VehicleSheet extends AnarchyActorSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 450,
      height: 550
    });
  }

  async getData(options) {
    let hbsData = foundry.utils.mergeObject(
      await super.getData(options), {
        pilot: this.actor.getPilotReference()
    });
    return hbsData;
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find('.click-select-pilot').click(async event => {
      event.stopPropagation();
      await this.selectPilotFromActor();
    });

    html.find('.click-select-pilot-token').click(async event => {
      event.stopPropagation();
      await this.selectPilotFromToken();
    });

    html.find('.click-clear-pilot').click(async event => {
      event.stopPropagation();
      await this.actor.update({ 'system.pilot.uuid': '' });
      this.render();
    });

    html.find('.pilot-reference .actor-reference').click(async event => {
      event.preventDefault();
      const uuid = event.currentTarget.dataset.actorUuid ?? this.actor.getPilotUuid();
      const pilot = uuid ? await fromUuid(uuid) : this.actor.getPilotActor();
      pilot?.sheet?.render(true);
    });
  }

  async selectPilotFromActor() {
    const candidates = game.actors.filter(actor => actor.canPilotVehicle());
    if (candidates.length === 0) {
      ui.notifications.warn(game.i18n.localize(ANARCHY.actor.vehicle.pilot.errors.noActors));
      return;
    }

    const title = game.i18n.localize(ANARCHY.actor.vehicle.pilot.selectActor);
    await SelectActor.selectActor(title, candidates,
      async actor => await this.actor.update({ 'system.pilot.uuid': actor.uuid }));
  }

  async selectPilotFromToken() {
    const selectedToken = canvas?.tokens?.controlled?.find(token => token.actor?.canPilotVehicle());
    if (!selectedToken) {
      ui.notifications.warn(game.i18n.localize(ANARCHY.actor.vehicle.pilot.errors.noTokens));
      return;
    }

    await this.actor.update({ 'system.pilot.uuid': selectedToken.document.uuid });
    this.render();
  }

}