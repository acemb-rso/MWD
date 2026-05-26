// src/modules/mwd/asset-module-runtime.js
// Purpose: Thin registry/facts helper for runtime-event asset-module packets.
// How it fits: Keeps packet lookup declarative while heat, harm, EW, and aura
// subsystems own their lifecycle dispatch points.

import { TEMPLATE } from "../constants.js";
import { getAssetModuleState } from "./asset-module-rules.js";

export const ASSET_MODULE_RUNTIME_KINDS = Object.freeze([
  "targetingPacket",
  "networkShare",
  "targetingSuppression",
  "aura",
  "useLimit",
  "charges",
  "incomingDamageReduction",
  "interceptAttack",
  "pilotDamageMitigation",
  "catastrophicInterception",
  "currentHeatAdjustment",
  "startOfActivationRepair",
]);

const RUNTIME_KIND_SET = new Set(ASSET_MODULE_RUNTIME_KINDS);

function toCollectionArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.contents)) return value.contents;
  if (value && typeof value[Symbol.iterator] === "function") return Array.from(value);
  return [];
}

function isAssetModule(item = null) {
  return (item?.canonicalType ?? item?.type) === TEMPLATE.itemType.assetModule;
}

function normalizePacket(packet = {}, { item = null, index = 0 } = {}) {
  if (!packet || typeof packet !== "object" || Array.isArray(packet)) return null;
  const kind = String(packet.kind ?? "").trim();
  if (!RUNTIME_KIND_SET.has(kind)) {
    throw new Error(`${item?.name ?? "Asset Module"}: runtime packet ${index + 1} has unsupported kind "${kind}".`);
  }
  return {
    ...packet,
    id: String(packet.id ?? `${kind}-${index + 1}`).trim() || `${kind}-${index + 1}`,
    kind,
    hook: String(packet.hook ?? "").trim(),
    sourceId: item?.id ?? "",
    sourceUuid: item?.uuid ?? "",
    sourceName: item?.name ?? "Asset Module",
  };
}

export function getReadyAssetModules(actor = null) {
  return toCollectionArray(actor?.assetModules ?? actor?.items)
    .filter(isAssetModule)
    .map(item => ({ item, state: getAssetModuleState(item, { installed: true }) }))
    .filter(entry => entry.state.active);
}

export function collectAssetModuleRuntimePackets(actor = null, { kind = "", hook = "" } = {}) {
  const kindFilter = String(kind ?? "").trim();
  const hookFilter = String(hook ?? "").trim();
  const packets = [];

  for (const { item, state } of getReadyAssetModules(actor)) {
    const rawPackets = [
      ...toCollectionArray(item?.system?.runtime?.packets),
      ...toCollectionArray(item?.system?.runtimePackets),
    ];
    rawPackets.forEach((raw, index) => {
      const packet = normalizePacket(raw, { item, index });
      if (!packet) return;
      if (kindFilter && packet.kind !== kindFilter) return;
      if (hookFilter && packet.hook && packet.hook !== hookFilter) return;
      packets.push({
        ...packet,
        moduleActive: state.active,
        moduleReady: state.ready,
      });
    });
  }

  return packets;
}

export function collectAssetModuleFacts(actor = null, context = {}) {
  const modules = getReadyAssetModules(actor);
  const effectsByHook = new Map();
  const tags = new Set();
  const capabilities = new Set();

  for (const { item } of modules) {
    for (const tag of toCollectionArray(item?.system?.tags)) {
      const normalized = String(tag ?? "").trim();
      if (normalized) tags.add(normalized);
    }
    for (const capability of toCollectionArray(item?.system?.capabilities)) {
      const normalized = String(capability ?? "").trim();
      if (normalized) capabilities.add(normalized);
    }
    for (const packet of collectAssetModuleRuntimePackets({ items: [item] }, context)) {
      if (!packet.hook) continue;
      const bucket = effectsByHook.get(packet.hook) ?? [];
      bucket.push(packet);
      effectsByHook.set(packet.hook, bucket);
    }
  }

  return { modules, tags, capabilities, effectsByHook };
}
