// src/modules/area-effects/hazard-regions.js
// Purpose: Creates and inspects native Foundry Regions used for persistent hazards.
// How it fits: Keeps Region document interaction separate from attack/chat logic.

import {
  AREA_EFFECT_KINDS,
  cloneTemplateGeometry,
  createRegionShapesFromTemplateGeometry,
  getExposureLabel,
  normalizeAreaEffect,
  normalizeHazardDefinition,
  normalizeTemplateGeometry,
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
  const templateGeometry = normalizeTemplateGeometry(
    value.templateGeometry,
    {
      template: value.template,
      placement: value.templatePlacement,
    }
  ) ?? null;
  return {
    ...foundry.utils.deepClone(asObject(value)),
    areaEffect,
    hazardDef: normalizeHazardDefinition(value.hazardDef ?? areaEffect.hazard ?? {}),
    templateGeometry,
  };
}

export function isHazardRegion(region) {
  return Boolean(getHazardRegionFlag(region));
}

export async function migrateHazardRegionFlag(region) {
  const current = region?.getFlag?.("mwd", HAZARD_REGION_FLAG)
    ?? region?.flags?.mwd?.[HAZARD_REGION_FLAG]
    ?? null;
  if (!current || typeof current !== "object") return null;
  if (current?.templateGeometry) return getHazardRegionFlag(region);

  const normalized = getHazardRegionFlag(region);
  if (!normalized?.templateGeometry || !region?.setFlag) return normalized;

  await region.setFlag("mwd", HAZARD_REGION_FLAG, {
    ...foundry.utils.deepClone(current),
    templateGeometry: cloneTemplateGeometry(normalized.templateGeometry),
  });
  return getHazardRegionFlag(region);
}

export async function createHazardRegionFromAttack({ attacker = null, attack = {}, targetResult = null } = {}) {
  const scene = canvas?.scene ?? null;
  if (!scene) return null;

  const templateGeometry = normalizeTemplateGeometry(
    attack?.templateGeometry,
    {
      template: attack?.template,
      placement: attack?.templatePlacement,
    }
  );
  const areaEffect = normalizeAreaEffect(attack?.areaEffect ?? attack?.payload?.areaEffect ?? {});
  if (areaEffect.kind !== AREA_EFFECT_KINDS.persistent || !templateGeometry) return null;

  const shapes = createRegionShapesFromTemplateGeometry(templateGeometry);
  if (!shapes.length) return null;

  const hazardFlag = {
    sourceActorUuid: attacker?.uuid ?? null,
    sourceItemUuid: attack?.weapon?.uuid ?? null,
    payloadId: attack?.payloadState?.activePayloadId ?? attack?.payload?.id ?? "",
    templateGeometry: cloneTemplateGeometry(templateGeometry),
    templatePlacement: foundry.utils.deepClone(attack?.templatePlacement ?? null),
    template: foundry.utils.deepClone(attack?.template ?? null),
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
  if (!token) return [];

  const scene = token?.parent ?? canvas?.scene ?? null;
  if (!scene) return [];

  const center = token?.object?.center
    ?? token?.center
    ?? {
      x: Number(token?.x ?? 0) + ((Number(token?.width ?? 1) || 1) * (Number(canvas?.grid?.size ?? 100) || 100) / 2),
      y: Number(token?.y ?? 0) + ((Number(token?.height ?? 1) || 1) * (Number(canvas?.grid?.size ?? 100) || 100) / 2),
    };
  const tokenPoint = {
    x: Number(center?.x ?? 0) || 0,
    y: Number(center?.y ?? 0) || 0,
    elevation: Number(token?.elevation ?? token?.object?.elevation ?? 0) || 0,
  };

  return Array.from(scene.regions ?? [])
    .filter(isHazardRegion)
    .filter(region => {
      if (region?.tokens?.has?.(token)) return true;
      try {
        return region?.testPoint?.(tokenPoint) ?? false;
      } catch (_error) {
        return false;
      }
    });
}
