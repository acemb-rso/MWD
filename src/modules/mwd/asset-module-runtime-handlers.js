// src/modules/mwd/asset-module-runtime-handlers.js
// Purpose: Generic runtime packet subscribers for asset modules.
// How it fits: Item data stays declarative; subsystem hooks stay owned by heat,
// harm, and EW while these handlers translate runtime packets into contributions.

import { ASSET_MODULE_HOOKS } from "./asset-module-hooks.js";
import { collectAssetModuleRuntimePackets } from "./asset-module-runtime.js";

let registeredHooks = null;

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function normalizeStringArray(value) {
  const raw = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];
  return raw.map(entry => String(entry ?? "").trim()).filter(Boolean);
}

function packetAppliesToDamage(packet = {}, context = {}) {
  const appliesTo = normalizeStringArray(packet.appliesTo);
  if (!appliesTo.length) return true;
  const damageType = String(context.damageType ?? "").trim();
  const payloadTags = normalizeStringArray(context.payload?.tags);
  return appliesTo.includes(damageType)
    || appliesTo.some(tag => payloadTags.includes(tag))
    || appliesTo.some(tag => payloadTags.includes(`damage.${tag}`));
}

function applyDamagePreviewPackets(context = {}) {
  const actor = context.actor ?? null;
  if (!actor) return;

  let adjustedIncoming = Math.max(0, toNumber(context.adjustedIncoming ?? context.damageIncoming, 0));
  for (const packet of collectAssetModuleRuntimePackets(actor, { kind: "incomingDamageReduction" })) {
    if (!packetAppliesToDamage(packet, context)) continue;
    const value = Math.max(0, toNumber(packet.value, 0));
    if (value <= 0) continue;
    adjustedIncoming = Math.max(0, adjustedIncoming - value);
    context.contributions ??= [];
    context.contributions.push({
      kind: packet.kind,
      sourceId: packet.sourceId,
      sourceName: packet.sourceName,
      value: -value,
    });
  }
  context.adjustedIncoming = adjustedIncoming;
}

function applyHeatDissipationPackets(context = {}) {
  const actor = context.actor ?? context.source ?? null;
  if (!actor) return;

  for (const packet of collectAssetModuleRuntimePackets(actor, { kind: "currentHeatAdjustment" })) {
    const timing = String(packet.timing ?? "dissipation").trim();
    if (timing !== "dissipation" && timing !== "activation") continue;
    const value = toNumber(packet.value, 0);
    if (!value) continue;
    context.generated = Math.max(0, toNumber(context.generated, 0) + value);
  }
}

function applyBestTargetingPacket(context = {}) {
  const actor = context.combatant?.actor ?? null;
  if (!actor) return;
  const packets = collectAssetModuleRuntimePackets(actor, { kind: "targetingPacket" })
    .filter(packet => !packet.hook || packet.hook === context.hook)
    .sort((left, right) => toNumber(right.value, 0) - toNumber(left.value, 0));
  if (!packets.length) return;
  context.bestPacket = packets[0];
}

export function registerAssetModuleRuntimeHandlers() {
  if (!globalThis.Hooks?.on || registeredHooks === globalThis.Hooks) return;
  registeredHooks = globalThis.Hooks;

  Hooks.on(ASSET_MODULE_HOOKS.harm.beforeMachineDamagePreview, applyDamagePreviewPackets);
  Hooks.on(ASSET_MODULE_HOOKS.heat.beforeHeatDissipation, applyHeatDissipationPackets);
  Hooks.on(ASSET_MODULE_HOOKS.ew.beforeAttackTargeting, context => {
    context.hook = ASSET_MODULE_HOOKS.ew.beforeAttackTargeting;
    applyBestTargetingPacket(context);
  });
}
