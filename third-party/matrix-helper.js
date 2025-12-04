
export const NO_MATRIX_MONITOR = {
  canMark: false,
  marks: [],
  value: 0,
  max: 0,
  resistance: 0
}

export const MATRIX = {
  connectionMode: {
    disconnected: 'disconnected',
    augmented: 'augmented',
    virtual: 'virtual'
  }
}

export class Matrix {
  static resolveConnectionMode(connectionMode) {
    switch (connectionMode) {
      case MATRIX.connectionMode.disconnected:
      case MATRIX.connectionMode.augmented:
      case MATRIX.connectionMode.virtual:
        return connectionMode
      case undefined:
      default:
        return MATRIX.connectionMode.disconnected
    }
  }

  static getNextConnectionMode(connectionMode) {
    switch (connectionMode) {
      case MATRIX.connectionMode.disconnected: return MATRIX.connectionMode.augmented
      case MATRIX.connectionMode.augmented: return MATRIX.connectionMode.virtual
      default:
      case MATRIX.connectionMode.virtual: return MATRIX.connectionMode.disconnected
    }
  }
}
