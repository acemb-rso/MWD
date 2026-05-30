// src/modules/mwd/personal-critical-gates.js
// Purpose: Centralizes Personal Critical action and weapon restrictions.

import { PERSONAL_ACTION_CATEGORIES } from "../combat/personal-action-catalog.js";
import { getActivePersonalCrits } from "./personal-criticals.js";

function compact(values = []) {
  return Array.from(values).map(value => String(value ?? "").trim()).filter(Boolean);
}

function restriction(id, label, reason, crit) {
  return {
    id,
    label,
    reason,
    critId: crit?.id ?? "",
    sourceLabel: crit?.statusLabel ?? crit?.label ?? "",
  };
}

export function getPersonalCriticalGateState(actor) {
  const crits = getActivePersonalCrits(actor);
  const restrictions = [];
  const weaponRestrictions = new Map();

  for (const crit of crits) {
    const payload = crit?.effectPayload ?? {};
    const reason = crit?.statusLabel ?? crit?.label ?? "Personal Critical";

    if (payload.cannotAim) restrictions.push(restriction("cannotAim", "Cannot Aim", reason, crit));
    if (payload.cannotReact) restrictions.push(restriction("cannotReact", "Cannot React", reason, crit));
    if (payload.cannotComplex) restrictions.push(restriction("cannotComplex", "Cannot Complex Action", reason, crit));

    if (payload.weaponUnequipped) {
      const keys = compact([crit.weaponUuid, crit.weaponId]);
      for (const key of keys) {
        weaponRestrictions.set(key, {
          reason: `Weapon Unequipped (${reason})`,
          critId: crit.id,
          sourceLabel: reason,
          weaponName: crit.weaponName ?? "",
        });
      }
      restrictions.push(restriction("weaponUnequipped", "Weapon Unequipped", reason, crit));
    }
  }

  const find = id => restrictions.find(entry => entry.id === id) ?? null;
  return {
    crits,
    restrictions,
    cannotAim: Boolean(find("cannotAim")),
    cannotReact: Boolean(find("cannotReact")),
    cannotComplex: Boolean(find("cannotComplex")),
    aimReason: find("cannotAim")?.reason ?? "",
    reactionReason: find("cannotReact")?.reason ?? "",
    complexReason: find("cannotComplex")?.reason ?? "",
    weaponRestrictions,
    restrictionLabels: restrictions.map(entry => entry.label),
  };
}

export function getPersonalActionGateReason(actor, action = {}) {
  const gateState = getPersonalCriticalGateState(actor);
  const actionId = String(action?.id ?? "").trim();
  const category = String(action?.category ?? "").trim();

  if (actionId === "aim" && gateState.cannotAim) return `Disabled (${gateState.aimReason})`;
  if (category === PERSONAL_ACTION_CATEGORIES.reaction && gateState.cannotReact) return `Disabled (${gateState.reactionReason})`;
  if (category === PERSONAL_ACTION_CATEGORIES.complex && gateState.cannotComplex) return `Disabled (${gateState.complexReason})`;
  return "";
}

export function getWeaponAttackGateReason(actor, weapon = null) {
  const gateState = getPersonalCriticalGateState(actor);
  if (gateState.cannotComplex) return `Disabled (${gateState.complexReason})`;

  const keys = compact([weapon?.uuid, weapon?.id]);
  for (const key of keys) {
    const restricted = gateState.weaponRestrictions.get(key);
    if (restricted?.reason) return restricted.reason;
  }
  return "";
}

export function buildPersonalCriticalRestrictionChips(actor) {
  return getPersonalCriticalGateState(actor).restrictions.map(entry => ({
    id: entry.id,
    label: entry.label,
    reason: entry.reason,
  }));
}
