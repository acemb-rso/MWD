// src/modules/roll/weapon-attack-actions.js
// Purpose: Shared helpers for launching personal-weapon attacks from sheets and hotbar macros.

import { SYSTEM_NAME } from "../constants.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { getWeaponAttackGateReason } from "../mwd/personal-critical-gates.js";
import { notifyRollError } from "./roll-errors.js";

const HOTBAR_ATTACK_TYPE = `${SYSTEM_NAME}.ownedWeaponAttack`;

let hotbarHookRegistered = false;

function buildAttackPayload(weapon, token = null) {
  const actor = weapon?.actor ?? null;
  const payload = {
    intent: "attack",
    weaponId: weapon?.id ?? "",
    payloadId: weapon?.system?.selectedPayloadUuid || weapon?.system?.selectedPayloadId || "",
    edge: { pool: "physical.grit", allowed: ["pre", "post"] },
    tags: ["combat", "attack"],
    sourceTokenId: token?.id ?? null
  };

  const snapshot = actor ? PersonalCombatTracker.getSnapshot(actor, { token }) : null;
  const hasAim = Boolean(snapshot?.state?.actionState?.aim);
  if (hasAim) payload.aim = { active: true };

  return { payload, hasAim };
}

function getAttackToken(actor, token = null) {
  return token
    ?? actor?.token
    ?? PersonalCombatTracker.getCurrentSceneTokenDocument(actor)
    ?? null;
}

export function getOwnedWeaponAttackDragData(weapon) {
  const uuid = String(weapon?.uuid ?? "").trim();
  if (!uuid) return null;

  return {
    type: HOTBAR_ATTACK_TYPE,
    uuid,
    name: String(weapon?.name ?? "Weapon").trim() || "Weapon",
    img: weapon?.img ?? "icons/svg/sword.svg"
  };
}

export async function launchOwnedWeaponAttack({ weapon, event = null, token = null } = {}) {
  try {
    if (!weapon?.isPersonalWeapon?.()) {
      throw new Error("Attack requires an owned personal weapon.");
    }

    const actor = weapon.actor ?? null;
    if (!actor) {
      throw new Error("Attack requires an owned personal weapon.");
    }
    const gateReason = getWeaponAttackGateReason(actor, weapon);
    if (gateReason) {
      ui.notifications?.warn(gateReason);
      return null;
    }

    const attackToken = getAttackToken(actor, token);
    const { payload, hasAim } = buildAttackPayload(weapon, attackToken);
    const rollApi = game.mwd?.roll ?? game.system?.mwd?.roll;
    if (!rollApi?.execute) {
      throw new Error("MWD roll system not initialized.");
    }

    const result = await rollApi.execute({ actor, payload, event });
    if (result) {
      if (hasAim) {
        await PersonalCombatTracker.clearAim(actor, { token: attackToken });
      }

      const snapshot = PersonalCombatTracker.getSnapshot(actor, { token: attackToken });
      if (snapshot?.hasCombatant) {
        const spend = await PersonalCombatTracker.spendResource(actor, {
          token: attackToken,
          resource: "sa",
          cost: 2,
          actionId: "attack",
          actionLabel: "Attack",
          actionCostLabel: "2 SA",
          actionCategory: "complex"
        });

        if (!spend?.ok) {
          ui.notifications?.warn(spend?.reason ?? "Unable to record attack action.");
        }
      }
    }
    return result;
  } catch (error) {
    console.error("MWD | Failed to launch weapon attack", error);
    notifyRollError(error, "Unable to attack with that weapon.");
    return null;
  }
}

export async function attackWeaponByUuid(uuid, { event = null } = {}) {
  const resolvedUuid = String(uuid ?? "").trim();
  if (!resolvedUuid) {
    ui.notifications?.warn("That weapon shortcut is missing its item reference.");
    return null;
  }

  const weapon = await fromUuid(resolvedUuid);
  if (!weapon) {
    ui.notifications?.warn("That weapon shortcut could not find its source item.");
    return null;
  }

  return launchOwnedWeaponAttack({ weapon, event });
}

function buildWeaponMacroCommand(uuid) {
  const encodedUuid = JSON.stringify(String(uuid ?? "").trim());
  return `(async () => {
  const attacks = game.mwd?.attacks;
  if (!attacks?.attackWeaponByUuid) {
    return ui.notifications?.error("MWD attack shortcuts are not available right now.");
  }
  await attacks.attackWeaponByUuid(${encodedUuid});
})();`;
}

async function createWeaponAttackMacro(data, slot) {
  const uuid = String(data?.uuid ?? "").trim();
  if (!uuid) return;

  const name = String(data?.name ?? "Weapon Attack").trim() || "Weapon Attack";
  const command = buildWeaponMacroCommand(uuid);
  let macro = game.macros?.find?.(entry =>
    entry?.type === "script"
    && entry?.name === name
    && entry?.command === command
  ) ?? null;

  if (!macro) {
    macro = await Macro.create({
      name,
      type: "script",
      img: data?.img ?? "icons/svg/sword.svg",
      command
    });
  }

  await game.user?.assignHotbarMacro?.(macro, slot);
}

export function handleWeaponAttackHotbarDrop(_bar, data, slot) {
  if (data?.type !== HOTBAR_ATTACK_TYPE) return true;
  void createWeaponAttackMacro(data, slot);
  return false;
}

export function registerWeaponAttackHotbarHook() {
  if (hotbarHookRegistered) return;
  hotbarHookRegistered = true;
  Hooks.on("hotbarDrop", handleWeaponAttackHotbarDrop);
}

export const WeaponAttackActions = {
  HOTBAR_ATTACK_TYPE,
  getOwnedWeaponAttackDragData,
  launchOwnedWeaponAttack,
  attackWeaponByUuid,
  handleWeaponAttackHotbarDrop,
  registerWeaponAttackHotbarHook
};
