import { ICONS_PATH } from "../constants.js";
import { VehicleActor } from "./vehicle-actor.js";

export class BattlemechActor extends VehicleActor {

  static get defaultIcon() {
    return `${ICONS_PATH}/vehicles/apc.svg`;
  }
}
