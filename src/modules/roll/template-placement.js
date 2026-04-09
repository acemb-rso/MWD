// src/modules/roll/template-placement.js
// Purpose: Runs measured-template placement for personal weapon attacks and derives target snapshots.
// How it fits: Adds the explicit templated attack workflow without creating a second combat resolution path.

import {
  PERSONAL_WEAPON_EXECUTABLE_TEMPLATE_SHAPES,
} from "../mwd/personal-weapon-capabilities.js";
import { createUserFacingRollError } from "./roll-errors.js";
import {
  classifyTemplateExposure,
  createExposureData,
  getExposureLabel,
  EXPOSURE_TIERS,
} from "../area-effects/area-effect-engine.js";

const DEFAULT_CONE_ANGLE = 90;

function getCanvasWorldPoint(event) {
  const rect = canvas.app.view.getBoundingClientRect();
  const local = new PIXI.Point(
    Number(event.clientX ?? 0) - rect.left,
    Number(event.clientY ?? 0) - rect.top
  );
  return canvas.stage.worldTransform.applyInverse(local);
}

function getSceneDistanceUnit() {
  return Number(canvas.scene?.grid?.distance ?? canvas.dimensions?.distance ?? 1) || 1;
}

function getGridSizePixels() {
  return Number(canvas.grid?.size ?? canvas.dimensions?.size ?? 100) || 100;
}

function sceneDistanceToPixels(distance = 0) {
  return (Number(distance ?? 0) || 0) * (getGridSizePixels() / getSceneDistanceUnit());
}

function authoredTemplateDistance(template = {}) {
  return Math.max(0, Number(template?.size ?? 0) || 0) * getSceneDistanceUnit();
}

function normalizeDegrees(value) {
  let degrees = Number(value ?? 0) || 0;
  while (degrees <= -180) degrees += 360;
  while (degrees > 180) degrees -= 360;
  return degrees;
}

function radiansToDegrees(value) {
  return (Number(value ?? 0) || 0) * (180 / Math.PI);
}

function degreesToRadians(value) {
  return (Number(value ?? 0) || 0) * (Math.PI / 180);
}

function computeDirectionDegrees(origin, destination) {
  const dx = Number(destination?.x ?? 0) - Number(origin?.x ?? 0);
  const dy = Number(destination?.y ?? 0) - Number(origin?.y ?? 0);
  if (dx === 0 && dy === 0) return 0;
  return radiansToDegrees(Math.atan2(dy, dx));
}

function getActorToken(actor) {
  const controlled = canvas.tokens?.controlled?.find(token => token.actor?.id === actor?.id) ?? null;
  return controlled ?? actor?.getActiveTokens?.(true, true)?.[0] ?? null;
}

function getTokenCenter(token) {
  const center = token?.center ?? token?.object?.center;
  if (center) return { x: Number(center.x ?? 0), y: Number(center.y ?? 0) };

  const x = Number(token?.x ?? token?.document?.x ?? 0);
  const y = Number(token?.y ?? token?.document?.y ?? 0);
  const w = Number(token?.w ?? token?.width ?? token?.document?.width ?? 1) * getGridSizePixels();
  const h = Number(token?.h ?? token?.height ?? token?.document?.height ?? 1) * getGridSizePixels();
  return { x: x + (w / 2), y: y + (h / 2) };
}

function getTokenRadius(token) {
  const w = Number(token?.w ?? token?.object?.w ?? 0) || (Number(token?.document?.width ?? 1) * getGridSizePixels());
  const h = Number(token?.h ?? token?.object?.h ?? 0) || (Number(token?.document?.height ?? 1) * getGridSizePixels());
  return Math.max(w, h) / 2;
}

function buildTemplateDocumentData(template = {}, anchor = { x: 0, y: 0 }, direction = 0) {
  const base = {
    user: game.user?.id ?? null,
    x: Number(anchor?.x ?? 0) || 0,
    y: Number(anchor?.y ?? 0) || 0,
    direction: Number(direction ?? 0) || 0,
    distance: authoredTemplateDistance(template),
    fillColor: game.user?.color ?? "#ff6400",
  };

  switch (template?.shape) {
    case "blast":
      return { ...base, t: "circle" };
    case "cone":
      return { ...base, t: "cone", angle: DEFAULT_CONE_ANGLE };
    case "line":
      return { ...base, t: "ray", width: getSceneDistanceUnit() };
    default:
      return base;
  }
}

function pointInBlast({ anchor, radiusPx, tokenCenter, tokenRadius }) {
  const dx = tokenCenter.x - anchor.x;
  const dy = tokenCenter.y - anchor.y;
  return Math.hypot(dx, dy) <= radiusPx + tokenRadius;
}

function pointInLine({ anchor, distancePx, widthPx, direction, tokenCenter, tokenRadius }) {
  const dx = tokenCenter.x - anchor.x;
  const dy = tokenCenter.y - anchor.y;
  const radians = degreesToRadians(direction);
  const dirX = Math.cos(radians);
  const dirY = Math.sin(radians);
  const projection = (dx * dirX) + (dy * dirY);
  if (projection < -tokenRadius || projection > distancePx + tokenRadius) return false;

  const closestX = anchor.x + (Math.max(0, Math.min(distancePx, projection)) * dirX);
  const closestY = anchor.y + (Math.max(0, Math.min(distancePx, projection)) * dirY);
  return Math.hypot(tokenCenter.x - closestX, tokenCenter.y - closestY) <= tokenRadius + (widthPx / 2);
}

function pointInCone({ anchor, distancePx, direction, angle, tokenCenter, tokenRadius }) {
  const dx = tokenCenter.x - anchor.x;
  const dy = tokenCenter.y - anchor.y;
  const distance = Math.hypot(dx, dy);
  if (distance > distancePx + tokenRadius) return false;
  if (distance === 0) return true;

  const pointDirection = radiansToDegrees(Math.atan2(dy, dx));
  const delta = Math.abs(normalizeDegrees(pointDirection - direction));
  const halfAngle = Number(angle ?? DEFAULT_CONE_ANGLE) / 2;
  const tokenAllowance = radiansToDegrees(Math.asin(Math.min(1, tokenRadius / Math.max(distance, 1))));
  return delta <= halfAngle + tokenAllowance;
}

function templateHitsToken({ template, placement, token }) {
  const tokenCenter = getTokenCenter(token);
  const tokenRadius = getTokenRadius(token);
  const distancePx = sceneDistanceToPixels(placement.distance);

  switch (template?.shape) {
    case "blast":
      return pointInBlast({
        anchor: placement.anchor,
        radiusPx: distancePx,
        tokenCenter,
        tokenRadius,
      });
    case "line":
      return pointInLine({
        anchor: placement.anchor,
        distancePx,
        widthPx: sceneDistanceToPixels(getSceneDistanceUnit()),
        direction: placement.direction,
        tokenCenter,
        tokenRadius,
      });
    case "cone":
      return pointInCone({
        anchor: placement.anchor,
        distancePx,
        direction: placement.direction,
        angle: placement.angle ?? DEFAULT_CONE_ANGLE,
        tokenCenter,
        tokenRadius,
      });
    default:
      return false;
  }
}

function cleanupPreview(previewState = {}) {
  if (Array.isArray(previewState.targetMarkers)) {
    for (const marker of previewState.targetMarkers) {
      marker?.ring?.destroy?.({ children: true });
      marker?.label?.destroy?.({ children: true });
    }
    previewState.targetMarkers = [];
  }
  if (previewState.object) {
    canvas.templates?.preview?.removeChild?.(previewState.object);
    previewState.object.destroy?.({ children: true });
  }
  canvas.templates?.clearPreviewContainer?.();
}

async function drawPreview(previewState = {}, template = {}, anchor = { x: 0, y: 0 }, direction = 0) {
  const data = buildTemplateDocumentData(template, anchor, direction);

  if (!previewState.object) {
    const TemplateDocument = CONFIG.MeasuredTemplate.documentClass;
    const TemplateObject = CONFIG.MeasuredTemplate.objectClass;
    const document = new TemplateDocument(data, { parent: canvas.scene });
    const object = new TemplateObject(document);
    previewState.object = object;
    await object.draw();
    canvas.templates.preview.addChild(object);
    return;
  }

  previewState.object.document.updateSource(data);
  previewState.object.renderFlags?.set?.({ refreshState: true, refreshShape: true, refreshGrid: true });
  previewState.object.refresh?.();
}

function buildPlacementResult({ template, anchor, direction }) {
  return {
    shape: template.shape,
    placement: template.placement,
    size: Number(template.size ?? 0) || 0,
    distance: authoredTemplateDistance(template),
    angle: template.shape === "cone" ? DEFAULT_CONE_ANGLE : undefined,
    anchor: {
      x: Number(anchor?.x ?? 0) || 0,
      y: Number(anchor?.y ?? 0) || 0,
    },
    direction: Number(direction ?? 0) || 0,
  };
}

function getExposureColor(tier = EXPOSURE_TIERS.none) {
  if (tier === EXPOSURE_TIERS.full) return 0xd64545;
  if (tier === EXPOSURE_TIERS.major) return 0xe78b2f;
  if (tier === EXPOSURE_TIERS.minor) return 0xf0d451;
  return 0x9aa4b2;
}

function drawTargetMarkers(previewState = {}, markers = []) {
  if (!canvas?.templates?.preview) return;

  if (Array.isArray(previewState.targetMarkers)) {
    for (const marker of previewState.targetMarkers) {
      marker?.ring?.destroy?.({ children: true });
      marker?.label?.destroy?.({ children: true });
    }
  }
  previewState.targetMarkers = [];

  for (const marker of markers) {
    const center = getTokenCenter(marker.token);
    const radius = Math.max(20, getTokenRadius(marker.token) + 12);
    const color = getExposureColor(marker.exposureTier);

    const ring = new PIXI.Graphics();
    ring.lineStyle(4, color, 0.95);
    ring.beginFill(color, 0.14);
    ring.drawCircle(center.x, center.y, radius);
    ring.endFill();

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

    canvas.templates.preview.addChild(ring);
    canvas.templates.preview.addChild(label);
    previewState.targetMarkers.push({ ring, label });
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

function deriveTemplateTargets({ template, placement, attacker } = {}) {
  const attackerToken = getActorToken(attacker);
  const attackerTokenId = attackerToken?.id ?? null;

  return (canvas.tokens?.placeables ?? [])
    .filter(token => token?.actor)
    .filter(token => token.id !== attackerTokenId || template?.placement === "origin")
    .filter(token => templateHitsToken({ template, placement, token }))
    .map(token => {
      const tier = classifyTemplateExposure({ template, placement, token });
      return buildTargetSnapshot(token, {
        exposureTier: tier,
        areaEffect: {
          templateShape: template?.shape ?? "",
          templatePlacement: template?.placement ?? "",
        },
      });
    })
    .filter(Boolean);
}

export async function placeTemplatedAttack({ actor, attack } = {}) {
  if (!canvas?.scene || !canvas?.templates?.preview) {
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

  const previewState = {};
  const stageState = {
    phase: template.placement === "origin" ? "direction" : "anchor",
    anchor: template.placement === "origin" ? getTokenCenter(attackerToken) : null,
    direction: 0,
  };

  const finalize = async (resolve, result = null, error = null) => {
    window.removeEventListener("keydown", onKeyDown, true);
    canvas.app.view.removeEventListener("pointermove", onPointerMove);
    canvas.app.view.removeEventListener("click", onClick, true);
    canvas.app.view.removeEventListener("contextmenu", onContextMenu, true);
    cleanupPreview(previewState);

    if (error) {
      resolve(Promise.reject(error));
      return;
    }

    resolve(result);
  };

  const refreshPreview = async (point = null) => {
    if (!stageState.anchor && point) {
      stageState.anchor = { x: point.x, y: point.y };
    }

    if (!stageState.anchor) return;

    if (template.shape !== "blast" && point) {
      stageState.direction = computeDirectionDegrees(stageState.anchor, point);
    }

    await drawPreview(previewState, template, stageState.anchor, stageState.direction);

    const placement = buildPlacementResult({
      template,
      anchor: stageState.anchor,
      direction: stageState.direction,
    });
    const targetMarkers = (canvas.tokens?.placeables ?? [])
      .filter(token => token?.actor)
      .filter(token => templateHitsToken({ template, placement, token }))
      .map(token => ({
        token,
        exposureTier: classifyTemplateExposure({ template, placement, token }),
      }));
    drawTargetMarkers(previewState, targetMarkers);
  };

  let settle = null;
  const promise = new Promise((resolve) => {
    settle = resolve;
  });

  const onPointerMove = (event) => {
    const point = getCanvasWorldPoint(event);
    void refreshPreview(point);
  };

  const onContextMenu = (event) => {
    event.preventDefault();
    void finalize(settle, null);
  };

  const onKeyDown = (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    void finalize(settle, null);
  };

  const onClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const point = getCanvasWorldPoint(event);

    if (!stageState.anchor) {
      stageState.anchor = { x: point.x, y: point.y };
    }

    if (stageState.phase === "anchor" && template.shape !== "blast") {
      stageState.phase = "direction";
      void refreshPreview(point);
      return;
    }

    if (template.shape !== "blast") {
      stageState.direction = computeDirectionDegrees(stageState.anchor, point);
    }

    const placement = buildPlacementResult({
      template,
      anchor: stageState.anchor,
      direction: stageState.direction,
    });
    const targetSnapshots = deriveTemplateTargets({ template, placement, attacker: actor });
    void finalize(settle, { placement, targetSnapshots });
  };

  window.addEventListener("keydown", onKeyDown, true);
  canvas.app.view.addEventListener("pointermove", onPointerMove);
  canvas.app.view.addEventListener("click", onClick, true);
  canvas.app.view.addEventListener("contextmenu", onContextMenu, true);

  if (stageState.anchor) {
    await refreshPreview(stageState.anchor);
  }

  return promise;
}
