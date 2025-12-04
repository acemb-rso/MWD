import { ICONS_PATH, TEMPLATE } from "../constants.js";
import { AnarchyBaseActor } from "./base-actor.js";


const DEVICE_ATTRIBUTES = [
  TEMPLATE.attributes.system,
  TEMPLATE.attributes.firewall,
]
export class DeviceActor extends AnarchyBaseActor {

  static get defaultIcon() {
    return `${ICONS_PATH}/actors/cctv-camera.svg`
  }

  static get initiative() {
    return AnarchyBaseActor.initiative + " + @attributes.system.value"
  }

  getMatrixDetails() {
    return {
      hasMatrix: true,
      logic: TEMPLATE.attributes.system,
      firewall: TEMPLATE.attributes.firewall,
      monitor: this.system.monitors.matrix,
      overflow: undefined,
    }
  }

  getAttributes() {
    return DEVICE_ATTRIBUTES
  }
}