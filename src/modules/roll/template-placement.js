// src/modules/roll/template-placement.js
// Purpose: Runs measured-template placement for personal weapon attacks and derives target snapshots.
// How it fits: Adds the explicit templated attack workflow without creating a second combat resolution path.

import {
  PERSONAL_WEAPON_EXECUTABLE_TEMPLATE_SHAPES,
} from "../mwd/personal-weapon-capabilities.js";
import { createUserFacingRollError } from "./roll-errors.js";
import {
  classifyTemplateExposure,
  cloneTemplateGeometry,
  createExposureData,
  createLegacyTemplatePlacementFromGeometry,
  createRegionShapesFromTemplateGeometry,
  getExposureLabel,
  isPersistentAreaEffect,
  normalizeTemplateGeometry,
  templateGeometryHitsToken,
  EXPOSURE_TIERS,
} from "../area-effects/area-effect-engine.js";
import { getTokenCenter, getTokenDisposition } from "../utils/token.js";

const DEFAULT_CONE_ANGLE = 90;
const TEMPLATE_INDICATOR_REGION_VISIBILITY = Number(CONST?.REGION_VISIBILITY?.ALWAYS ?? 2) || 2;

function getGridSizePixels() {
  return Number(canvas.grid?.size ?? canvas.dimensions?.size ?? 100) || 100;
}

function authoredTemplateDistance(template = {}) {
  return Math.max(0, Number(template?.size ?? 0) || 0);
}

function getActorToken(actor) {
  const controlled = canvas.tokens?.controlled?.find(token => token.actor?.id === actor?.id) ?? null;
  return controlled ?? actor?.getActiveTokens?.(true, true)?.[0] ?? null;
}

function getTokenRadius(token) {
  const w = Number(token?.w ?? token?.object?.w ?? 0) || (Number(token?.document?.width ?? 1) * getGridSizePixels());
  const h = Number(token?.h ?? token?.object?.h ?? 0) || (Number(token?.document?.height ?? 1) * getGridSizePixels());
  return Math.max(w, h) / 2;
}

function getInitialSceneCenter() {
  const center = canvas?.stage?.pivot ?? null;
  const dimensions = canvas?.dimensions ?? {};
  return {
    x: Number(center?.x ?? dimensions.width / 2 ?? 0) || 0,
    y: Number(center?.y ?? dimensions.height / 2 ?? 0) || 0,
  };
}

function getPrimaryTargetToken() {
  return Array.from(game.user?.targets ?? []).find(token => token?.actor) ?? null;
}

function getMidpoint(a, b) {
  return {
    x: (Number(a?.x ?? 0) + Number(b?.x ?? 0)) / 2,
    y: (Number(a?.y ?? 0) + Number(b?.y ?? 0)) / 2,
  };
}

function resolveInitialAnchor({ template = {}, actor = null } = {}) {
  const placementMode = String(template?.placement ?? "").trim().toLowerCase();
  const attackerToken = getActorToken(actor);
  const targetToken = getPrimaryTargetToken();
  const attackerCenter = attackerToken ? getTokenCenter(attackerToken) : null;
  const targetCenter = targetToken ? getTokenCenter(targetToken) : null;

  if (placementMode === "origin" && attackerCenter) return attackerCenter;
  if (placementMode === "targeted" && targetCenter) return targetCenter;
  if (placementMode === "placed" && attackerCenter && targetCenter) {
    return getMidpoint(attackerCenter, targetCenter);
  }

  return getInitialSceneCenter();
}

function buildInitialTemplateGeometry({ attack = {}, actor = null } = {}) {
  const template = attack?.template ?? null;
  const shape = String(template?.shape ?? "").trim().toLowerCase();
  if (!shape) return null;

  const anchor = resolveInitialAnchor({ template, actor });

  return normalizeTemplateGeometry({
    shape,
    x: anchor.x,
    y: anchor.y,
    direction: 0,
    distance: authoredTemplateDistance(template),
    angle: shape === "cone" ? DEFAULT_CONE_ANGLE : null,
    width: shape === "line" ? 1 : null,
    placementMode: template?.placement ?? null,
  });
}

function createPreviewContainer() {
  const container = new PIXI.Container();
  container.eventMode = "none";
  container.sortableChildren = true;
  canvas.stage?.addChild?.(container);
  return container;
}

function destroyPreviewContainer(container) {
  if (container?.parent) container.parent.removeChild(container);
  container?.destroy?.({ children: true });
}

function createPlacementPreview() {
  const root = createPreviewContainer();
  const templateLayer = new PIXI.Container();
  templateLayer.eventMode = "none";
  templateLayer.zIndex = 5;

  const markerLayer = new PIXI.Container();
  markerLayer.eventMode = "none";
  markerLayer.zIndex = 10;

  root.addChild(templateLayer);
  root.addChild(markerLayer);
  return { root, templateLayer, markerLayer };
}

function destroyPlacementPreview(preview) {
  destroyPreviewContainer(preview?.root ?? preview);
}

function getTemplatePreviewColor() {
  const raw = String(game.user?.color ?? "#ff6400").replace("#", "").trim();
  const parsed = Number.parseInt(raw, 16);
  return Number.isFinite(parsed) ? parsed : 0xff6400;
}

function clearContainerChildren(container) {
  container?.removeChildren?.().forEach(child => child.destroy?.({ children: true }));
}

function getCanvasPointFromEvent(event) {
  const view = canvas?.app?.view ?? null;
  const renderer = canvas?.app?.renderer ?? null;
  const stage = canvas?.stage ?? null;
  if (!view || !stage) return null;

  const clientX = Number(event?.clientX ?? NaN);
  const clientY = Number(event?.clientY ?? NaN);
  if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) return null;
  const rect = view.getBoundingClientRect();
  if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return null;

  const globalPoint = new PIXI.Point();
  if (typeof renderer?.events?.mapPositionToPoint === "function") {
    renderer.events.mapPositionToPoint(globalPoint, clientX, clientY);
  } else {
    const resolution = Number(renderer?.resolution ?? window.devicePixelRatio ?? 1) || 1;
    globalPoint.x = ((clientX - rect.left) * resolution);
    globalPoint.y = ((clientY - rect.top) * resolution);
  }

  const local = stage.toLocal(globalPoint);

  return {
    x: Number(local?.x ?? 0) || 0,
    y: Number(local?.y ?? 0) || 0,
  };
}

function getDirectionDegrees(origin, target) {
  const dx = Number(target?.x ?? 0) - Number(origin?.x ?? 0);
  const dy = Number(target?.y ?? 0) - Number(origin?.y ?? 0);
  if (dx === 0 && dy === 0) return 0;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

function sceneDistanceToPixels(distance = 0) {
  const gridSize = Number(canvas.grid?.size ?? canvas.dimensions?.size ?? 100) || 100;
  const unitDistance = Number(canvas.scene?.grid?.distance ?? canvas.dimensions?.distance ?? 1) || 1;
  return Number(distance ?? 0) * (gridSize / unitDistance);
}

function buildInteractiveTemplateGeometry({ geometry = null, pointer = null, attack = {}, actor = null } = {}) {
  const base = normalizeTemplateGeometry(geometry);
  if (!base) return null;

  const next = cloneTemplateGeometry(base) ?? null;
  if (!next || !pointer) return next;

  const placementMode = String(attack?.template?.placement ?? next.placementMode ?? "").trim().toLowerCase();
  const anchorFollowsPointer = placementMode !== "origin";
  if (anchorFollowsPointer) {
    next.x = pointer.x;
    next.y = pointer.y;
  }

  if (["line", "cone", "rect"].includes(String(next.shape ?? "").trim().toLowerCase())) {
    const attackerToken = getActorToken(actor);
    const attackerCenter = attackerToken ? getTokenCenter(attackerToken) : null;
    const directionOrigin = anchorFollowsPointer
      ? (attackerCenter ?? { x: Number(base.x ?? 0), y: Number(base.y ?? 0) })
      : { x: Number(next.x ?? 0), y: Number(next.y ?? 0) };
    next.direction = getDirectionDegrees(directionOrigin, pointer);
  }

  return normalizeTemplateGeometry(next);
}

function drawTemplatePreview(container, geometry = null) {
  if (!container) return;
  clearContainerChildren(container);

  const resolved = normalizeTemplateGeometry(geometry);
  if (!resolved) return;

  const color = getTemplatePreviewColor();
  const graphic = new PIXI.Graphics();
  graphic.lineStyle(3, color, 0.95);
  graphic.beginFill(color, 0.18);

  switch (String(resolved.shape ?? "").trim().toLowerCase()) {
    case "blast": {
      graphic.drawCircle(
        Number(resolved.x ?? 0),
        Number(resolved.y ?? 0),
        sceneDistanceToPixels(resolved.distance ?? 0)
      );
      break;
    }
    case "rect": {
      const widthPx = sceneDistanceToPixels(resolved.width ?? 0);
      const heightPx = sceneDistanceToPixels(resolved.height ?? 0);
      graphic.position.set(Number(resolved.x ?? 0), Number(resolved.y ?? 0));
      graphic.rotation = (Number(resolved.direction ?? 0) * Math.PI) / 180;
      graphic.drawRect(
        -(Number(resolved.anchorX ?? 0) || 0) * widthPx,
        -(Number(resolved.anchorY ?? 0) || 0) * heightPx,
        widthPx,
        heightPx
      );
      break;
    }
    default: {
      const [shape] = createRegionShapesFromTemplateGeometry(resolved);
      if (shape?.type === "polygon" && Array.isArray(shape.points) && shape.points.length >= 3) {
        graphic.drawPolygon(shape.points.flatMap(point => [Number(point?.x ?? 0), Number(point?.y ?? 0)]));
      }
      break;
    }
  }

  graphic.endFill();
  container.addChild(graphic);
}

function getExposureColor(tier = EXPOSURE_TIERS.none) {
  if (tier === EXPOSURE_TIERS.full) return 0xd64545;
  if (tier === EXPOSURE_TIERS.major) return 0xe78b2f;
  if (tier === EXPOSURE_TIERS.minor) return 0xf0d451;
  return 0x9aa4b2;
}

function drawTargetMarkers(container, markers = []) {
  if (!container) return;
  clearContainerChildren(container);

  for (const marker of markers) {
    const center = getTokenCenter(marker.token);
    const radius = Math.max(20, getTokenRadius(marker.token) + 12);
    const color = getExposureColor(marker.exposureTier);

    const ring = new PIXI.Graphics();
    ring.lineStyle(4, color, 0.95);
    ring.beginFill(color, 0.14);
    ring.drawCircle(center.x, center.y, radius);
    ring.endFill();
    ring.zIndex = 10;

    const label = new PIXI.Text(getExposureLabel(marker.exposureTier), {
      fontFamily: "MWD UI",
      fontSize: 18,
      fontWeight: "700",
      fill: color,
      stroke: 0x111111,
      strokeThickness: 4,
      align: "center",
    });
    label.anchor.set(0.5, 1);
    label.position.set(center.x, center.y - radius - 6);
    label.zIndex = 11;

    container.addChild(ring);
    container.addChild(label);
  }
}

export function buildTargetSnapshot(targetToken, extras = {}) {
  const targetActor = targetToken?.actor ?? null;
  if (!targetActor) return null;

  const targetLoadout = targetActor?.getPersonalCombatLoadout?.() ?? null;
  const targetArmor = targetLoadout?.activeArmor ?? null;

  return {
    tokenId: targetToken?.id ?? null,
    tokenUuid: targetToken?.document?.uuid ?? null,
    actorId: targetActor.id,
    actorUuid: targetActor.uuid,
    name: targetActor.name ?? targetToken?.name ?? "Target",
    attributes: {
      reflexes: Number(targetActor?.system?.attributes?.reflexes?.value ?? 0) || 0,
    },
    skills: {
      tactics: {
        rating: Number(targetActor?.system?.skills?.tactics?.rating ?? 0) || 0,
      },
    },
    activeArmor: targetArmor ? {
      armorId: targetArmor.id,
      rating: Number(targetArmor.ratingCurrent ?? targetArmor.rating ?? 0),
      currentArmorRating: Number(targetArmor.currentArmorRating ?? targetArmor.durability?.current ?? 0),
      remainingDurability: Number(targetArmor.remainingDurability ?? targetArmor.durability?.current ?? 0),
      baseMitigation: Number(targetArmor.baseMitigation ?? targetArmor.baseResistance ?? 0),
      baseResistance: Number(targetArmor.baseMitigation ?? targetArmor.baseResistance ?? 0),
      mitigationByType: { ...(targetArmor.mitigationByType ?? targetArmor.typedMitigation ?? {}) },
      tags: [...(targetArmor.tags ?? [])],
      isDestroyed: Boolean(targetArmor.isDestroyed),
      defenseBonus: Number(targetArmor.defenseBonus ?? 0),
    } : null,
    exposure: createExposureData({
      tier: extras?.exposure?.initialTier ?? extras?.exposure?.tier ?? extras?.exposureTier ?? EXPOSURE_TIERS.none,
      appliedTier: extras?.exposure?.finalTier ?? extras?.exposure?.appliedTier ?? extras?.exposureTier ?? EXPOSURE_TIERS.none,
      evadeUsed: Boolean(extras?.exposure?.evadeUsed),
      evadeLocked: Boolean(extras?.exposure?.evadeLocked),
    }),
    areaEffect: extras?.areaEffect ? foundry.utils.deepClone(extras.areaEffect) : null,
  };
}

function deriveTemplateTargets({ attack = {}, geometry = null, attacker = null } = {}) {
  const template = attack?.template ?? null;
  const normalizedGeometry = normalizeTemplateGeometry(geometry);
  if (!template || !normalizedGeometry) return [];

  const attackerToken = getActorToken(attacker);
  const attackerTokenId = attackerToken?.id ?? null;

  return (canvas.tokens?.placeables ?? [])
    .filter(token => token?.actor)
    .filter(token => token.id !== attackerTokenId || template?.placement === "origin")
    .filter(token => templateGeometryHitsToken(normalizedGeometry, token))
    .map(token => {
      const tier = classifyTemplateExposure({ geometry: normalizedGeometry, token });
      return buildTargetSnapshot(token, {
        exposureTier: tier,
        areaEffect: {
          templateShape: template?.shape ?? "",
          templatePlacement: template?.placement ?? "",
          templateGeometry: cloneTemplateGeometry(normalizedGeometry),
        },
      });
    })
    .filter(Boolean);
}

function buildMarkerState({ attack = {}, geometry = null, attacker = null } = {}) {
  const template = attack?.template ?? null;
  const attackerToken = getActorToken(attacker);
  const attackerTokenId = attackerToken?.id ?? null;
  const normalizedGeometry = normalizeTemplateGeometry(geometry);
  if (!template || !normalizedGeometry) return [];

  return (canvas.tokens?.placeables ?? [])
    .filter(token => token?.actor)
    .filter(token => token.id !== attackerTokenId || template?.placement === "origin")
    .filter(token => templateGeometryHitsToken(normalizedGeometry, token))
    .map(token => ({
      token,
      exposureTier: classifyTemplateExposure({ geometry: normalizedGeometry, token }),
    }));
}

function getAutoTargetTokenIds({ geometry = null, attack = {}, attacker = null } = {}) {
  const template = attack?.template ?? null;
  const normalizedGeometry = normalizeTemplateGeometry(geometry);
  if (!template || !normalizedGeometry) return [];

  const attackerToken = getActorToken(attacker);
  const attackerTokenId = attackerToken?.id ?? null;
  const hostile = Number(CONST?.TOKEN_DISPOSITIONS?.HOSTILE ?? -1);
  const friendly = Number(CONST?.TOKEN_DISPOSITIONS?.FRIENDLY ?? 1);
  const neutral = Number(CONST?.TOKEN_DISPOSITIONS?.NEUTRAL ?? 0);
  const attackerDisposition = getTokenDisposition(attackerToken, neutral);

  const isEnemyToken = (token) => {
    const disposition = getTokenDisposition(token, neutral);
    if (!attackerToken) return true;
    if (attackerDisposition === friendly) return disposition === hostile;
    if (attackerDisposition === hostile) return disposition === friendly;
    if (attackerDisposition === neutral) return disposition === hostile;
    return disposition !== attackerDisposition;
  };

  return (canvas.tokens?.placeables ?? [])
    .filter(token => token?.actor)
    .filter(token => token.id !== attackerTokenId || template?.placement === "origin")
    .filter(token => templateGeometryHitsToken(normalizedGeometry, token))
    .filter(isEnemyToken)
    .map(token => String(token.id ?? "").trim())
    .filter(Boolean);
}

function buildTemplatePlacementHint(attack = {}) {
  const shapeKey = String(attack?.template?.shape ?? "template").trim().toLowerCase();
  const label = shapeKey ? `${shapeKey.slice(0, 1).toUpperCase()}${shapeKey.slice(1)}` : "Template";
  return `${label} placement: left-click to place, right-click or Esc to cancel, Enter or Space to confirm.`;
}

async function promptToPlaceTemplatePreview({ attack = {} } = {}) {
  const hint = buildTemplatePlacementHint(attack);
  if (hint) ui.notifications?.info?.(hint);

  return new Promise(resolve => {
    let settled = false;

    const cleanup = () => {
      window.removeEventListener("pointerdown", handlePointerDown, true);
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("contextmenu", handleContextMenu, true);
    };

    const settle = (confirmed = false) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(Boolean(confirmed));
    };

    const consumeEvent = (event) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      event?.stopImmediatePropagation?.();
    };

    const isEditableTarget = (target) => {
      if (!(target instanceof HTMLElement)) return false;
      const tag = String(target.tagName ?? "").trim().toUpperCase();
      return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(tag);
    };

    const handlePointerDown = (event) => {
      const button = Number(event?.button ?? 0);
      const pointer = getCanvasPointFromEvent(event);

      if (button === 2 && pointer) {
        consumeEvent(event);
        settle(false);
        return;
      }

      if (button !== 0 || !pointer) return;
      consumeEvent(event);
      settle(true);
    };

    const handleKeyDown = (event) => {
      const key = String(event?.key ?? "");
      const code = String(event?.code ?? "");

      if (key === "Escape") {
        consumeEvent(event);
        settle(false);
        return;
      }

      if (isEditableTarget(event?.target ?? document.activeElement)) return;

      if (key === "Enter" || key === "NumpadEnter" || key === " " || key === "Spacebar" || code === "Space") {
        consumeEvent(event);
        settle(true);
      }
    };

    const handleContextMenu = (event) => {
      if (!getCanvasPointFromEvent(event)) return;
      consumeEvent(event);
    };

    window.addEventListener("pointerdown", handlePointerDown, true);
    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("contextmenu", handleContextMenu, true);
  });
}

export async function createAttackTemplateIndicator({ actor = null, attack = {}, templateGeometry = null } = {}) {
  if (!canvas?.scene) return null;
  if (isPersistentAreaEffect(attack?.areaEffect ?? attack?.payload?.areaEffect ?? {})) return null;

  const geometry = normalizeTemplateGeometry(templateGeometry, {
    template: attack?.template,
    placement: attack?.templatePlacement,
  });
  if (!geometry) return null;

  const shapes = createRegionShapesFromTemplateGeometry(geometry);
  if (!shapes.length) return null;

  const label = `${String(attack?.weapon?.name ?? attack?.name ?? "Template").trim() || "Template"} Template`;

  const [created] = await canvas.scene.createEmbeddedDocuments("Region", [{
    name: label,
    color: String(game.user?.color ?? "#ff6400").trim() || "#ff6400",
    visibility: TEMPLATE_INDICATOR_REGION_VISIBILITY,
    locked: false,
    shapes,
    flags: {
      mwd: {
        templateIndicator: {
          sourceActorUuid: actor?.uuid ?? null,
          sourceItemUuid: attack?.weapon?.uuid ?? null,
          payloadId: attack?.payloadState?.activePayloadId ?? attack?.payload?.id ?? "",
          label,
          templateGeometry: cloneTemplateGeometry(geometry),
          templatePlacement: foundry.utils.deepClone(attack?.templatePlacement ?? null),
          template: foundry.utils.deepClone(attack?.template ?? null),
        },
      },
    },
  }]);

  return created ?? null;
}

export async function placeTemplatedAttack({ actor, attack } = {}) {
  if (!canvas?.scene) {
    throw createUserFacingRollError("Templated attacks require an active scene canvas.", { severity: "warn" });
  }

  const template = attack?.template ?? null;
  if (!template?.shape || !(Number(template?.size) > 0)) {
    throw createUserFacingRollError("Templated attack is missing valid template configuration.", { severity: "warn" });
  }

  if (!PERSONAL_WEAPON_EXECUTABLE_TEMPLATE_SHAPES.includes(template.shape)) {
    throw createUserFacingRollError(`Template shape "${template.shape}" is normalized but not supported in v1.`, { severity: "warn" });
  }

  const attackerToken = getActorToken(actor);
  if (template.placement === "origin" && !attackerToken) {
    throw createUserFacingRollError("Origin-placed templated attacks require the attacker to have a token on the current scene.", { severity: "warn" });
  }

  const initialGeometry = buildInitialTemplateGeometry({ attack, actor });
  if (!initialGeometry) {
    throw createUserFacingRollError("Unable to initialize template placement for this attack.", { severity: "warn" });
  }

  const preview = createPlacementPreview();
  let currentGeometry = cloneTemplateGeometry(initialGeometry);
  let lastSignature = "";

  const getGeometrySignature = (geometry = null) => JSON.stringify({
    shape: geometry?.shape ?? "",
    x: Number(geometry?.x ?? 0),
    y: Number(geometry?.y ?? 0),
    direction: Number(geometry?.direction ?? 0),
    distance: Number(geometry?.distance ?? 0),
    angle: Number(geometry?.angle ?? 0),
    width: Number(geometry?.width ?? 0),
    height: Number(geometry?.height ?? 0),
    anchorX: Number(geometry?.anchorX ?? 0),
    anchorY: Number(geometry?.anchorY ?? 0),
    placementMode: geometry?.placementMode ?? "",
  });

  const refreshPreview = () => {
    drawTemplatePreview(preview.templateLayer, currentGeometry);
    drawTargetMarkers(preview.markerLayer, buildMarkerState({ attack, geometry: currentGeometry, attacker: actor }));
  };

  const handlePointerMove = (event) => {
    const pointer = getCanvasPointFromEvent(event);
    if (!pointer) return;

    const nextGeometry = buildInteractiveTemplateGeometry({
      geometry: currentGeometry,
      pointer,
      attack,
      actor,
    });
    if (!nextGeometry) return;

    const nextSignature = getGeometrySignature(nextGeometry);
    if (nextSignature === lastSignature) return;

    currentGeometry = nextGeometry;
    lastSignature = nextSignature;
    refreshPreview();
  };

  try {
    lastSignature = getGeometrySignature(currentGeometry);
    refreshPreview();
    window.addEventListener("pointermove", handlePointerMove);

    const confirmed = await promptToPlaceTemplatePreview({
      attack: {
        ...attack,
        actor,
      },
    });
    if (!confirmed) return null;
    const templateGeometry = cloneTemplateGeometry(currentGeometry);
    if (!templateGeometry) return null;

    const legacyPlacement = createLegacyTemplatePlacementFromGeometry(templateGeometry, template);
    const targetSnapshots = deriveTemplateTargets({
      attack,
      geometry: templateGeometry,
      attacker: actor,
    });

    return {
      templateGeometry: cloneTemplateGeometry(templateGeometry),
      placement: legacyPlacement?.placement ?? null,
      autoTargetTokenIds: getAutoTargetTokenIds({
        geometry: templateGeometry,
        attack,
        attacker: actor,
      }),
      targetSnapshots,
    };
  } finally {
    window.removeEventListener("pointermove", handlePointerMove);
    destroyPlacementPreview(preview);
  }
}
