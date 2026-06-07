// src/modules/mwd/charge-attack-actions.js
// Purpose: Builds and executes Impact Charge, Control Charge, and DFA collision attacks.
// How it fits: Emits attack intent and follow-up knockdown checks through the existing
// attack and skill roll pipelines. Recoil is queued as a separate machineAttackDamage
// notification; the main attack produces defender damage through the standard resolver.

import { TEMPLATE } from "../constants.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { getMachineAttackActionCost } from "./machine-crit-effects.js";
import { resolveBattlemechJumpProfile } from "./battlemech-mobility.js";
import {
  resolveMachineCollisionValue,
  resolveMachineKnockdownDn,
  resolveMachineKnockdownPool,
} from "./machine-chassis.js";
import { getMachineWeaponDamageTypeLabel } from "./machine-weapon-types.js";
import { resolveMachineOperator } from "./machine-operator.js";
import { resolveMachineSceneToken } from "./machine-token-resolution.js";

export const MACHINE_CHARGE_ATTACK_ID = "machineChargeAttack";

const CHARGE_MODES = Object.freeze(["impact", "control", "dfa"]);

const CHARGE_MODE_LABELS = Object.freeze({
  impact: "Impact Charge",
  control: "Control Charge",
  dfa: "Death From Above",
});

const CONTROL_INTENTS = Object.freeze(["prone", "forcedMovement", "skidding", "stalled"]);

const CONTROL_INTENT_LABELS = Object.freeze({
  prone: "Prone",
  forcedMovement: "Forced Movement",
  skidding: "Skidding",
  stalled: "Stalled",
});

// movementKind values from PersonalCombatTracker.state.actionState.move.movementKind
const SPEED_TIER_BY_MOVEMENT = Object.freeze({
  // BattleMech
  run: 1, fly: 1, jump: 1,
  sprint: 2,
  // Vehicle
  reposition: 1,
  redline: 2,
  // Disqualifying — walk and postural actions
  walk: 0, move: 0, prone: 0, hullDown: 0, brace: 0, flightMove: 1,
});

function getMachineRollApi() {
  return game.mwd?.roll ?? game.system?.mwd?.roll ?? null;
}

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function getActorChassis(actor) {
  return Math.max(0, toNumber(
    actor?.system?.attributes?.chassis?.value
      ?? actor?.system?.mwd?.chassis
      ?? actor?.system?.chassis,
    0
  ));
}

function getActorHandling(actor) {
  return Math.max(0, toNumber(
    actor?.system?.attributes?.handling?.value
      ?? actor?.system?.handling,
    0
  ));
}

function getActorPiloting(actor) {
  return Math.max(0, toNumber(
    actor?.system?.attributes?.piloting?.value
      ?? actor?.system?.skills?.piloting?.value,
    0
  ));
}

// ─── Movement state ──────────────────────────────────────────────────────────

export function getChargeMovementState(actor, { token = null } = {}) {
  const snapshot = PersonalCombatTracker.getSnapshot?.(actor, { token }) ?? null;
  const movementKind = String(snapshot?.state?.actionState?.move?.movementKind ?? "").trim();
  const speedTier = SPEED_TIER_BY_MOVEMENT[movementKind] ?? 0;
  return {
    movementKind,
    speedTier,
    usedJump: movementKind === "jump",
    hasQualifyingMovement: speedTier > 0 && movementKind !== "",
  };
}

// ─── Prerequisites ───────────────────────────────────────────────────────────

function validateChargePrerequisite(actor, { mode, movementState }) {
  if (mode === "dfa") {
    if (actor?.type !== TEMPLATE.actorTypes.battlemech) {
      return "DFA is only available to BattleMechs.";
    }
    if (!movementState.usedJump) {
      return "DFA requires Jump movement this activation.";
    }
    const jumpProfile = resolveBattlemechJumpProfile(actor);
    if (!jumpProfile?.dfaEnabled) {
      return jumpProfile?.blockedReason ?? "DFA is not available (no jump modules or DFA blocked).";
    }
    return "";
  }
  if (!movementState.hasQualifyingMovement) {
    const label = CHARGE_MODE_LABELS[mode] ?? "Charge";
    return `${label} requires Run or Sprint movement this activation.`;
  }
  return "";
}

// ─── Formulas ────────────────────────────────────────────────────────────────

function computeChargeFormulas(attackerActor, defenderActor, { mode, speedTier }) {
  const attackerChassis = getActorChassis(attackerActor);
  const defenderChassis = getActorChassis(defenderActor);

  let attackDamage, forceModifier, recoilDamage, missAttackerStabilityDn;

  if (mode === "impact") {
    attackDamage = resolveMachineCollisionValue({ chassis: attackerChassis, bonus: speedTier });
    forceModifier = speedTier;
    recoilDamage = defenderChassis;
    missAttackerStabilityDn = resolveMachineKnockdownDn({ chassis: attackerChassis, forceModifier: 0 });
  } else if (mode === "control") {
    attackDamage = Math.max(1, attackerChassis + speedTier - 2);
    forceModifier = Math.min(3, Math.max(1, attackerChassis + speedTier - defenderChassis));
    recoilDamage = Math.max(1, defenderChassis - 1);
    missAttackerStabilityDn = resolveMachineKnockdownDn({ chassis: attackerChassis, forceModifier: 1 });
  } else { // dfa
    attackDamage = attackerChassis + speedTier + 2;
    forceModifier = Math.min(3, Math.max(1, attackDamage - defenderChassis));
    recoilDamage = defenderChassis + Math.max(1, speedTier - 1);
    missAttackerStabilityDn = null; // DFA miss = auto-Prone, no check
  }

  const defenderKnockdownDn = resolveMachineKnockdownDn({ chassis: defenderChassis, forceModifier });

  return {
    attackerChassis,
    defenderChassis,
    attackDamage,
    forceModifier,
    recoilDamage,
    defenderKnockdownDn,
    missAttackerStabilityDn,
  };
}

// ─── Synthetic weapon profile ─────────────────────────────────────────────────

function buildChargeWeaponProfile(actor, { mode, speedTier, attackDamage, attackerChassis }) {
  const label = CHARGE_MODE_LABELS[mode] ?? "Charge";
  const baseDamageType = "concussive";
  return {
    id: MACHINE_CHARGE_ATTACK_ID,
    uuid: actor?.uuid ?? null,
    name: label,
    isSynthetic: true,
    category: "melee",
    weaponCategory: "melee",
    skill: "piloting",
    skillDef: null,
    damage: attackDamage,
    ap: 0,
    heat: 0,
    baseDamageType,
    baseDamageTypeLabel: getMachineWeaponDamageTypeLabel(baseDamageType),
    damageType: baseDamageType,
    damageTypeLabel: getMachineWeaponDamageTypeLabel(baseDamageType),
    attackRatingBand: { close: attackerChassis, near: 0, far: 0, extreme: 0 },
    range: { max: "close", close: 0, near: 0, far: 0, extreme: 0 },
    defaultRangeBand: "close",
    traits: [],
    effects: {},
    notes: `${label} — Chassis ${attackerChassis}, Speed Tier ${speedTier}`,
    resolverKey: "standard",
    capabilityReport: { isTemplated: false, errors: [] },
  };
}

// ─── Recoil notification ──────────────────────────────────────────────────────

async function emitRecoilNotification(actor, {
  mode,
  recoilDamage,
  defenderName = "target",
  isMiss = false,
}) {
  const label = CHARGE_MODE_LABELS[mode] ?? "Charge";
  let msg;
  if (mode === "dfa") {
    msg = isMiss
      ? `<strong>${actor?.name ?? "Attacker"}</strong> missed the DFA — <strong>${recoilDamage} recoil damage</strong> (concussive) to attacker Legs. Attacker falls <em>Prone</em> automatically.`
      : `<strong>${actor?.name ?? "Attacker"}</strong> DFA recoil — <strong>${recoilDamage} damage</strong> (concussive) to attacker. Run a landing check (Piloting + Handling vs Chassis + Jump Tier) to avoid Prone.`;
  } else {
    msg = `<strong>${label}</strong> recoil — <strong>${recoilDamage} damage</strong> (concussive) to ${actor?.name ?? "attacker"} if the attack hits.`;
  }

  await ChatMessage.create({
    content: `<div class="mwd-chat-message"><p>${msg}</p></div>`,
    speaker: ChatMessage.getSpeaker({ actor }),
    flags: { mwd: { messageType: "chargeRecoil", mode, recoilDamage } },
  });
}

// ─── Knockdown check ──────────────────────────────────────────────────────────

export async function performMachineKnockdownCheck(actor, {
  dn = 1,
  label = "Knockdown Check",
  token = null,
  operatorActorUuid = "",
} = {}) {
  const rollApi = getMachineRollApi();
  if (!rollApi?.execute) return { ok: false, reason: "MWD roll system not initialized." };

  const handling = getActorHandling(actor);
  const piloting = getActorPiloting(actor);
  const pool = resolveMachineKnockdownPool({ handling, piloting });

  await rollApi.execute({
    actor,
    payload: {
      intent: "skill",
      key: "piloting",
      attrKey: "reflexes",
      machineAttributeKey: TEMPLATE.actorAttributes.handling,
      dn,
      quickAction: {
        title: `${label} (DN ${dn} — Piloting ${piloting} + Handling ${handling} = ${pool} dice)`,
      },
      edge: { allowed: ["pre", "post"] },
      tags: ["machine", "skill", "knockdown"],
      sourceTokenId: token?.id ?? null,
      operatorActorUuid: String(operatorActorUuid ?? "").trim(),
    },
  });

  return { ok: true };
}

// ─── Choice builders for sheet dialogs ───────────────────────────────────────

export function buildChargeActionChoices(actor, { token = null } = {}) {
  const movementState = getChargeMovementState(actor, { token });
  const isBattlemech = actor?.type === TEMPLATE.actorTypes.battlemech;

  return CHARGE_MODES.flatMap(mode => {
    if (mode === "dfa" && !isBattlemech) return [];
    const prerequisiteError = validateChargePrerequisite(actor, { mode, movementState });
    return [{
      id: mode,
      label: CHARGE_MODE_LABELS[mode],
      disabled: Boolean(prerequisiteError),
      reason: prerequisiteError,
    }];
  });
}

export function buildControlChargeIntentChoices() {
  return CONTROL_INTENTS.map(id => ({
    id,
    label: CONTROL_INTENT_LABELS[id] ?? id,
  }));
}

// ─── Main entry point ─────────────────────────────────────────────────────────

export async function performChargeAttack(actor, {
  mode = "impact",
  controlIntent = "prone",
  targetActor = null,
  token = null,
  operatorActorUuid = "",
} = {}) {
  if (!CHARGE_MODES.includes(mode)) {
    const reason = `Unknown charge mode: ${mode}.`;
    ui.notifications?.warn(reason);
    return { ok: false, reason };
  }

  const sourceToken = token ?? resolveMachineSceneToken(actor);
  const movementState = getChargeMovementState(actor, { token: sourceToken });

  const prereqError = validateChargePrerequisite(actor, { mode, movementState });
  if (prereqError) {
    ui.notifications?.warn(prereqError);
    return { ok: false, reason: prereqError };
  }

  const speedTier = movementState.speedTier;

  const defenderActor = targetActor
    ?? Array.from(game?.user?.targets ?? [])[0]?.actor
    ?? null;
  if (!defenderActor) {
    const reason = "No target selected. Target a token before using a charge attack.";
    ui.notifications?.warn(reason);
    return { ok: false, reason };
  }

  const rollApi = getMachineRollApi();
  if (!rollApi?.execute) {
    const reason = "MWD roll system not initialized.";
    ui.notifications?.error(reason);
    return { ok: false, reason };
  }

  const formulas = computeChargeFormulas(actor, defenderActor, { mode, speedTier });

  const operator = await resolveMachineOperator({ machineActor: actor, operatorActorUuid });
  const spendActor = operator?.actor ?? actor;
  const actionCost = getMachineAttackActionCost(actor);
  const totalCost = Math.max(0, 2 + Number(actionCost?.extraCost ?? 0));
  const spendRequest = {
    token: sourceToken,
    resource: "sa",
    cost: totalCost,
    actionId: "attack",
    actionLabel: CHARGE_MODE_LABELS[mode],
    actionCostLabel: `${totalCost} SA`,
    actionCategory: "complex",
  };

  const spendPreview = PersonalCombatTracker.previewResourceSpend?.(spendActor, spendRequest)
    ?? { ok: true };
  if (!spendPreview?.ok) {
    ui.notifications?.warn(spendPreview?.reason ?? "Unable to record charge attack action.");
    return spendPreview;
  }

  const weaponProfile = buildChargeWeaponProfile(actor, {
    mode,
    speedTier,
    attackDamage: formulas.attackDamage,
    attackerChassis: formulas.attackerChassis,
  });

  const tags = ["combat", "attack", "machine", "collision", mode];
  if (mode === "control") tags.push(`intent:${controlIntent}`);

  const attackResult = await rollApi.execute({
    actor,
    payload: {
      intent: "attack",
      sourceType: "mechWeapon",
      syntheticWeapon: weaponProfile,
      machineActionPrecommitted: true,
      chargeAttack: {
        mode,
        controlIntent: mode === "control" ? controlIntent : null,
        speedTier,
        ...formulas,
      },
      edge: { pool: "physical.grit", allowed: ["pre", "post"] },
      tags,
      sourceTokenId: sourceToken?.id ?? null,
      operatorActorUuid: operator?.actor?.uuid ?? operatorActorUuid,
    },
  });

  if (attackResult?.aborted) return { ok: false, reason: "Charge attack was aborted." };

  const spend = await PersonalCombatTracker.spendResource(spendActor, spendRequest);
  if (!spend?.ok) {
    ui.notifications?.warn(spend?.reason ?? "Unable to record charge attack action.");
    return spend;
  }

  // Recoil notification — attacker takes damage; amount depends on mode and hit/miss.
  // DFA recoil fires regardless; Impact and Control recoil fires on hit only.
  await emitRecoilNotification(actor, {
    mode,
    recoilDamage: formulas.recoilDamage,
    defenderName: defenderActor?.name ?? "target",
  });

  // Defender knockdown check — always fires; GM applies Prone/Skidding/Stalled on failure.
  const defenderToken = Array.from(game?.user?.targets ?? [])[0] ?? null;
  const knockdownLabel = mode === "control"
    ? `Control Charge Knockdown — ${CONTROL_INTENT_LABELS[controlIntent] ?? controlIntent} on failure`
    : `${CHARGE_MODE_LABELS[mode]} Knockdown`;

  await performMachineKnockdownCheck(defenderActor, {
    dn: formulas.defenderKnockdownDn,
    label: `${knockdownLabel} (from ${actor?.name ?? "attacker"})`,
    token: defenderToken,
  });

  return { ok: true, mode, speedTier, formulas };
}
