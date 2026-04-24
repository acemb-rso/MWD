// src/modules/mwd/machine-token-resolution.js
// Purpose: Prefer live scene tokens over prototype tokens for machine actions.
// How it fits: EW state and combatant-backed actions must resolve against the
// active scene token id, not the actor's prototype token document.

export function resolveMachineSceneToken(actor = null, { sheetToken = null } = {}) {
  const explicitSheetToken = sheetToken?.document ?? sheetToken ?? null;
  if (explicitSheetToken) return explicitSheetToken;

  const activeTokens = actor?.getActiveTokens?.(true, true) ?? [];
  const activeToken = activeTokens[0] ?? null;
  if (activeToken) return activeToken?.document ?? activeToken;

  const canvasToken = Array.from(globalThis.canvas?.tokens?.placeables ?? [])
    .find(token => token?.actor?.id && token.actor.id === actor?.id) ?? null;
  if (canvasToken) return canvasToken?.document ?? canvasToken;

  return actor?.token?.document
    ?? actor?.token
    ?? null;
}
