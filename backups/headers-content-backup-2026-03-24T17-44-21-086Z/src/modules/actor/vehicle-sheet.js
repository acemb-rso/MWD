// src/modules/actor/vehicle-sheet.js
// Purpose: System module or client script for vehicle-sheet. Integrates with the system's JavaScript modules.

import { AnarchyActorSheet } from "./anarchy-actor-sheet.js";

export class VehicleSheet extends AnarchyActorSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 760,
      height: 650
    });
  }

}