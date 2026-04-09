// src/modules/area-effects/hazard-regions.js
// Purpose: Creates and inspects native Foundry Regions used for persistent hazards.
// How it fits: Keeps Region document interaction separate from attack/chat logic.

import {
  AREA_EFFECT_KINDS,
  createRegionShapesFromTemplatePlacement,
  getExposureLabel,
  normalizeAreaEffect,
  normalizeHazardDefinition,
} from "./area-effect-engine.js";

export const HAZARD_REGION_FLAG = "hazard";

function asObject(value) {
  return value && typeof value === "object" ? value : {};
}

export function getHazardRegionFlag(region) {
  const value = region?.getFlag?.("mwd", HAZARD_REGION_FLAG)
    ?? region?.flags?.mwd?.[HAZARD_REGION_FLAG]
    ?? null;
  if (!value || typeof value !== "object") return null;

  const areaEffect = normalizeAreaEffect(value.areaEffect ?? { kind: AREA_EFFECT_KINDS.persistent, hazard: value.hazardDef });
  return {
    ...foundry.utils.deepClone(asObject(value)),
    areaEffect,
    hazardDef: normalizeHazardDefinition(value.hazardDef ?? areaEffect.hazard ?? {}),
  };
}

export function isHazardRegion(region) {
  return Boolean(getHazardRegionFlag(region));
}

export async function createHazardRegionFromAttack({ attacker = null, attack = {}, targetResult = null } = {}) {
  const scene = canvas?.scene ?? null;
  if (!scene) return null;

  const placement = attack?.templatePlacement ?? null;
  const template = attack?.template ?? null;
  const areaEffect = normalizeAreaEffect(attack?.areaEffect ?? attack?.payload?.areaEffect ?? {});
  if (areaEffect.kind !== AREA_EFFECT_KINDS.persistent || !template || !placement) return null;

  const shapes = createRegionShapesFromTemplatePlacement({ template, placement });
  if (!shapes.length) return null;

  const hazardFlag = {
    sourceActorUuid: attacker?.uuid ?? null,
    sourceItemUuid: attack?.weapon?.uuid ?? null,
    payloadId: attack?.payloadState?.activePayloadId ?? attack?.payload?.id ?? "",
    templatePlacement: foundry.utils.deepClone(placement),
    template: foundry.utils.deepClone(template),
    damage: Number(targetResult?.damage?.effectiveWeaponDamage ?? attack?.weapon?.damage ?? 0) || 0,
    ap: Number(attack?.totalAp ?? attack?.weapon?.ap ?? 0) || 0,
    damageType: String(targetResult?.damage?.damageType ?? attack?.weapon?.damageType ?? "concussive").trim() || "concussive",
    label: `${String(attack?.weapon?.name ?? "Hazard").trim() || "Hazard"} (${getExposureLabel(areaEffect.hazard?.startExposure ?? "minor")})`,
    areaEffect,
    hazardDef: areaEffect.hazard,
  };

  const [created] = await scene.createEmbeddedDocuments("Region", [{
    name: hazardFlag.label,
    color: game.user?.color ?? "#d86a2c",
    shapes,
    flags: {
      mwd: {
        [HAZARD_REGION_FLAG]: hazardFlag,
      },
    },
  }]);

  return created ?? null;
}

export function getHazardRegionsForToken(tokenDocument = null) {
  const token = tokenDocument?.document ?? tokenDocument ?? null;
  const regions = token?.regions;
  if (!regions) return [];
  return Array.from(regions)
    .map(region => region?.document ?? region)
    .filter(Boolean)
    .filter(isHazardRegion);
}
