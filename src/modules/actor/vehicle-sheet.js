// src/modules/actor/vehicle-sheet.js
// Purpose: Provides a Sheet / UI class for entities (actor/item) or an application. References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { AnarchyActorSheet } from "./anarchy-actor-sheet.js";

export class VehicleSheet extends AnarchyActorSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 760,
      height: 650
    });
  }

}