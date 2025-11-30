import { ICONS_PATH } from "../constants.js";
import { VehicleActor } from "./vehicle-actor.js";
import { BattlemechLoadout } from "../mwd/battlemech-loadout.js";

export class BattlemechActor extends VehicleActor {

  static get defaultIcon() {
    return `${ICONS_PATH}/vehicles/apc.svg`;
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    const loadout = new BattlemechLoadout(this).compute();
    this.system.mwd.loadout = loadout;
  }
}
