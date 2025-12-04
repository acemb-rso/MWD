import { AnarchyActorSheet } from "./anarchy-actor-sheet.js";

export class VehicleSheet extends AnarchyActorSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 450,
      height: 550
    });
  }

  getData(options) {
    let hbsData = foundry.utils.mergeObject(
      super.getData(options), {
    });
    return hbsData;
  }

  activateListeners(html) {
    super.activateListeners(html);
  }

}