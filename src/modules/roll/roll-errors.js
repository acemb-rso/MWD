// src/modules/roll/roll-errors.js
// Purpose: Defines user-facing roll errors with explicit notification severity.
// How it fits: Lets engine-boundary validation communicate warn vs error without UI-owned rules.

export class UserFacingRollError extends Error {
  constructor(message, { severity = "error" } = {}) {
    super(message);
    this.name = "UserFacingRollError";
    this.userFacing = true;
    this.severity = severity === "warn" ? "warn" : "error";
  }
}

export function createUserFacingRollError(message, options = {}) {
  return new UserFacingRollError(message, options);
}

export function notifyRollError(error, fallback = "Unable to execute roll.") {
  const severity = error?.userFacing && error?.severity === "warn" ? "warn" : "error";
  ui.notifications?.[severity]?.(error?.message ?? fallback);
}
