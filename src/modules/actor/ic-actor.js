import { ICONS_PATH, TEMPLATE } from "../constants.js";
import { AnarchyBaseActor } from "./base-actor.js";

const IC_ATTRIBUTES = [
  TEMPLATE.attributes.logic,
  TEMPLATE.attributes.firewall,
]

export class ICActor extends AnarchyBaseActor {

  static get defaultIcon() {
    return `${ICONS_PATH}/misc/rub-el-hizb.svg`
  }

  static get initiative() {
    return AnarchyBaseActor.initiative + " + @attributes.logic.value"
  }

  getMatrixDetails() {
    return {
      hasMatrix: true,
      logic: TEMPLATE.attributes.logic,
      firewall: TEMPLATE.attributes.firewall,
      monitor: this.system.monitors.matrix,
      overflow: undefined,
    }
  }

  canSetMarks() { return false }

  getAttributes() {
    return IC_ATTRIBUTES
  }
}