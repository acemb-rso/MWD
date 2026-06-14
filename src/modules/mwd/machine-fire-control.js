// src/modules/mwd/machine-fire-control.js
// Purpose: Derives machine fire-control bonuses from installed asset modules.
// How it fits: Lets upgrade-authored targeting bonuses feed the attack engine
// without hardcoding Artemis-style behavior into sheets.

import { TEMPLATE } from "../constants.js";
import {
  getAssetModuleClusteringProfile as getLegacyAssetModuleClusteringProfile,
  getAssetModuleState,
} from "./asset-module-rules.js";
import { getAssetModuleClusteringProfile as getEffectAssetModuleClusteringProfile } from "./asset-module-effects.js";

function toCollectionArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.contents)) return value.contents;
  if (value && typeof value[Symbol.iterator] === "function") return Array.from(value);
  return [];
}

function getActorType(source = {}) {
  return String(source?.type ?? source?.actor?.type ?? "").trim();
}

function getAssetModules(source = {}) {
  const explicit = source?.assetModules ?? source?.items ?? source?.actor?.items ?? [];
  return toCollectionArray(explicit).filter(item => (item?.canonicalType ?? item?.type) === TEMPLATE.itemType.assetModule);
}

function buildDisabledClusteringState() {
  return {
    active: false,
    diceModifier: 0,
    targetNumberModifier: 0,
    sourceIds: [],
    sourceNames: [],
    sourceLabel: "",
  };
}

export function buildMachineFireControlModel(source = {}, context = {}) {
  const actorType = getActorType(source);
  if (
    actorType
    && actorType !== TEMPLATE.actorTypes.battlemech
    && actorType !== TEMPLATE.actorTypes.vehicle
  ) {
    return { clustering: buildDisabledClusteringState() };
  }

  const modules = getAssetModules(source).reduce((acc, item) => {
    const state = getAssetModuleState(item, { installed: true });
    if (!state.active) return acc;
    const profile = getLegacyAssetModuleClusteringProfile(item);
    if (Number(profile?.diceModifier ?? 0) !== 0 || Number(profile?.targetNumberModifier ?? 0) !== 0) {
      acc.push({ item, state, profile });
    }
    return acc;
  }, []);

  const effectProfile = getEffectAssetModuleClusteringProfile(source?.actor ?? source, context);

  if (!modules.length && !effectProfile.diceModifier && !effectProfile.targetNumberModifier) {
    return { clustering: buildDisabledClusteringState() };
  }

  const aggregated = modules.reduce((state, entry) => ({
    active: true,
    diceModifier: state.diceModifier + (Number(entry.profile?.diceModifier ?? 0) || 0),
    targetNumberModifier: state.targetNumberModifier + (Number(entry.profile?.targetNumberModifier ?? 0) || 0),
    sourceIds: entry.item?.id ? state.sourceIds.concat([entry.item.id]) : state.sourceIds,
    sourceNames: entry.item?.name ? state.sourceNames.concat([entry.item.name]) : state.sourceNames,
  }), buildDisabledClusteringState());

  const combined = {
    active: true,
    diceModifier: aggregated.diceModifier + Number(effectProfile.diceModifier ?? 0),
    targetNumberModifier: aggregated.targetNumberModifier + Number(effectProfile.targetNumberModifier ?? 0),
    sourceIds: aggregated.sourceIds.concat(effectProfile.sourceIds ?? []),
    sourceNames: aggregated.sourceNames.concat(effectProfile.sourceNames ?? []),
  };

  return {
    clustering: {
      ...combined,
      sourceLabel: combined.sourceNames.join(", "),
    },
  };
}

export function getMachineFireControlProfile(source = {}, context = {}) {
  return buildMachineFireControlModel(source, context).clustering;
}
