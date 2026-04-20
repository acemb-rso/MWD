// src/modules/mwd/machine-fire-control.js
// Purpose: Derives machine fire-control bonuses from installed asset modules.
// How it fits: Lets upgrade-authored targeting bonuses feed the attack engine
// without hardcoding Artemis-style behavior into sheets.

import { TEMPLATE } from "../constants.js";
import { getAssetModuleClusteringProfile } from "./asset-module-rules.js";

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

export function buildMachineFireControlModel(source = {}) {
  const actorType = getActorType(source);
  if (
    actorType
    && actorType !== TEMPLATE.actorTypes.battlemech
    && actorType !== TEMPLATE.actorTypes.vehicle
  ) {
    return { clustering: buildDisabledClusteringState() };
  }

  const modules = getAssetModules(source)
    .map(item => ({
      item,
      profile: getAssetModuleClusteringProfile(item),
    }))
    .filter(entry =>
      Number(entry.profile?.diceModifier ?? 0) !== 0
      || Number(entry.profile?.targetNumberModifier ?? 0) !== 0
    );

  if (!modules.length) {
    return { clustering: buildDisabledClusteringState() };
  }

  const aggregated = modules.reduce((state, entry) => ({
    active: true,
    diceModifier: state.diceModifier + (Number(entry.profile?.diceModifier ?? 0) || 0),
    targetNumberModifier: state.targetNumberModifier + (Number(entry.profile?.targetNumberModifier ?? 0) || 0),
    sourceIds: entry.item?.id ? state.sourceIds.concat([entry.item.id]) : state.sourceIds,
    sourceNames: entry.item?.name ? state.sourceNames.concat([entry.item.name]) : state.sourceNames,
  }), buildDisabledClusteringState());

  return {
    clustering: {
      ...aggregated,
      sourceLabel: aggregated.sourceNames.join(", "),
    },
  };
}

export function getMachineFireControlProfile(source = {}) {
  return buildMachineFireControlModel(source).clustering;
}
