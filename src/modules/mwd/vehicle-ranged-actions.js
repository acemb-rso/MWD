// src/modules/mwd/vehicle-ranged-actions.js
// Purpose: Builds and executes vehicle ranged weapon quick actions.
// How it fits: Mirrors battlemech-ranged-actions.js for vehicle actors — vehicles
// select individual mounted weapons rather than weapon groups.

import { TEMPLATE } from "../constants.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { getMachineAttackActionCost } from "./machine-crit-effects.js";
import { getConfiguredMachineHardpoints } from "./machine-hardpoints.js";
import { resolveMachineOperator } from "./machine-operator.js";
import { resolveMachineSceneToken } from "./machine-token-resolution.js";

function getMachineRollApi() {
  return game.mwd?.roll ?? game.system?.mwd?.roll ?? null;
}

function isMeleeWeapon(item = null) {
  return item?.system?.skill === "meleeCombat"
    || item?.system?.weaponCategory === "melee"
    || item?.system?.category === "melee";
}

export function buildVehicleRangedWeapons(actor = null) {
  const mountedItemIds = new Set(
    getConfiguredMachineHardpoints(actor)
      .map(hp => String(hp?.itemId ?? "").trim())
      .filter(Boolean)
  );

  return Array.from(actor?.items ?? [])
    .filter(item => {
      const canonicalType = item?.canonicalType ?? item?.type;
      if (canonicalType !== TEMPLATE.itemType.mechWeapon && canonicalType !== "vehicleWeapon") return false;
      if (!mountedItemIds.has(String(item?.id ?? "").trim())) return false;
      if (isMeleeWeapon(item)) return false;
      if (item?.isActive?.() === false) return false;
      return true;
    })
    .map(item => ({
      id: String(item?.id ?? "").trim(),
      name: String(item?.name ?? "Weapon").trim() || "Weapon",
      img: item?.img ?? "",
      hint: String(item?.system?.notes ?? item?.system?.description ?? "").trim(),
    }));
}

export async function performVehicleRangedAttack(actor, {
  weaponId = "",
  weapon = null,
  token = null,
  operatorActorUuid = "",
} = {}) {
  const weapons = buildVehicleRangedWeapons(actor);
  const normalizedId = String(weaponId ?? weapon?.id ?? "").trim();
  const selectedWeapon = (normalizedId ? weapons.find(w => w.id === normalizedId) : null) ?? weapons[0] ?? null;

  if (!selectedWeapon) {
    const reason = "No mounted ranged weapons available.";
    ui.notifications?.warn(reason);
    return { ok: false, reason };
  }

  const rollApi = getMachineRollApi();
  if (!rollApi?.execute) {
    const reason = "MWD roll system not initialized.";
    ui.notifications?.error(reason);
    return { ok: false, reason };
  }

  const sourceToken = token ?? resolveMachineSceneToken(actor);
  const operator = await resolveMachineOperator({ machineActor: actor, operatorActorUuid });
  const spendActor = operator?.actor ?? actor;
  const actionCost = getMachineAttackActionCost(actor);
  const totalCost = Math.max(0, 1 + Number(actionCost?.extraCost ?? 0));

  const spend = await PersonalCombatTracker.spendResource(spendActor, {
    token: sourceToken,
    resource: "sa",
    cost: totalCost,
    actionId: "attack",
    actionLabel: "Attack",
    actionCostLabel: `${totalCost} SA`,
    actionCategory: "complex",
  });
  if (!spend?.ok) {
    ui.notifications?.warn(spend?.reason ?? "Unable to record attack action.");
    return spend;
  }

  try {
    await rollApi.execute({
      actor,
      payload: {
        intent: "attack",
        sourceType: "mechWeapon",
        sourceId: selectedWeapon.id,
        weaponId: selectedWeapon.id,
        machineActionPrecommitted: true,
        edge: { pool: "physical.grit", allowed: ["pre", "post"] },
        tags: ["combat", "attack", "machine"],
        sourceTokenId: sourceToken?.id ?? null,
        operatorActorUuid: operator?.actor?.uuid ?? operatorActorUuid,
      },
    });
  } catch (error) {
    console.error("MWD | Vehicle ranged attack failed after action spend", { actor, weaponId: selectedWeapon.id, error });
    ui.notifications?.error(error?.message ?? "Vehicle attack failed after spending the action.");
    throw error;
  }

  return { ok: true, weaponId: selectedWeapon.id };
}
