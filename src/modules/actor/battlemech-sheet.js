import { VehicleSheet } from "./vehicle-sheet.js";

export class BattlemechSheet extends VehicleSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 600,
      height: 650
    });
  }
}
