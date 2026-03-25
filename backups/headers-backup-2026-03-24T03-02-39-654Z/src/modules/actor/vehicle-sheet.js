import { AnarchyActorSheet } from "./anarchy-actor-sheet.js";

export class VehicleSheet extends AnarchyActorSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 760,
      height: 650
    });
  }

}