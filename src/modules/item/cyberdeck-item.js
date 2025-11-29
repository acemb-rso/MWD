import { ICONS_PATH } from "../constants.js";
import { TEMPLATE } from "../constants.js";
import { MATRIX, Matrix } from "../matrix-helper.js";
import { AnarchyBaseItem } from "./anarchy-base-item.js";

export class CyberdeckItem extends AnarchyBaseItem {

  static get defaultIcon() {
    return `${ICONS_PATH}/shadowamps/cyberdeck.svg`;
  }

  getAttributes() {
    return [
      TEMPLATE.attributes.firewall
    ];
  }

  async setMatrixMonitor(checkbarPath, value) {
    await this.update({ [checkbarPath]: value });
  }

  hasMatrixMonitor() { return true }

  getMatrixMonitor() { return this.system.monitors.matrix }

  getMatrixOverflow() {
    switch (this.system.connectionMode) {
      case MATRIX.connectionMode.virtual: return TEMPLATE.monitors.physical
      case MATRIX.connectionMode.augmented: return TEMPLATE.monitors.stun
    }
    return undefined
  }

  isConnected() { return this.getMatrixOverflow() != undefined }

  getConnectionMode() { return this.system.connectionMode }

  async nextConnectionMode() {
    const newConnectionMode = Matrix.getNextConnectionMode(this.system.connectionMode)
    await this.update({ 'system.connectionMode': newConnectionMode })
  }
}