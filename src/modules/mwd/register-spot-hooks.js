// src/modules/mwd/register-spot-hooks.js
// Purpose: Lifecycle cleanup for indirect-fire spotting markers.
// How it fits: spots live on target token flags (see machine-ew-state.js). These
// hooks expire a spot when its spotter begins its next turn and tidy spots on
// combat/token teardown. Only one connected GM performs the writes.

import { AnarchyUsers } from "../system/users.js";
import {
  clearAllSpotsForCombat,
  clearExpiredSpotsForCombatant,
  clearSpotsForToken,
} from "./machine-ew-state.js";

function isSpotWriter() {
  return AnarchyUsers.isUniqueConnectedGM?.() ?? (globalThis.game?.user?.isGM ?? false);
}

export function registerSpotHooks() {
  // Authoritative expiry: a spot ends once its spotter begins its next turn.
  Hooks.on("updateCombat", (combat, changed = {}) => {
    if (!isSpotWriter()) return;
    if (!("turn" in changed) && !("round" in changed)) return;
    const activeId = String(combat?.combatant?.id ?? "").trim();
    if (!activeId) return;
    void clearExpiredSpotsForCombatant(combat, activeId);
  });

  // Combat ended: drop every spot it owned.
  Hooks.on("deleteCombat", combat => {
    if (!isSpotWriter()) return;
    void clearAllSpotsForCombat(combat);
  });

  // Token removed: drop spots it authored on other tokens (its own are gone).
  Hooks.on("deleteToken", tokenDoc => {
    if (!isSpotWriter()) return;
    void clearSpotsForToken(tokenDoc, { skipSelf: true });
  });
}
