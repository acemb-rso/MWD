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
  createTemplateGeometryFromMeasuredTemplate,
  getExposureLabel,
  getMeasuredTemplateDocumentData,
  normalizeTemplateGeometry,
  templateGeometryHitsToken,
  EXPOSURE_TIERS,
} from "../area-effects/area-effect-engine.js";

const DEFAULT_CONE_ANGLE = 90;
const PREVIEW_POLL_MS = 75;
const pendingTemplatePlacementRequests = new Map();

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

function getExposureColor(tier = EXPOSURE_TIERS.none) {
  if (tier === EXPOSURE_TIERS.full) return 0xd64545;
  if (tier === EXPOSURE_TIERS.major) return 0xe78b2f;
  if (tier === EXPOSURE_TIERS.minor) return 0xf0d451;
  return 0x9aa4b2;
}

function drawTargetMarkers(container, markers = []) {
  if (!container) return;
  container.removeChildren().forEach(child => child.destroy?.({ children: true }));

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

async function createTemporaryMeasuredTemplate(templateGeometry) {
  const scene = canvas?.scene ?? null;
  const data = getMeasuredTemplateDocumentData(templateGeometry);
  if (!scene || !data) return null;

  const [created] = await scene.createEmbeddedDocuments("MeasuredTemplate", [data]);
  if (!created) return null;

  await canvas?.templates?.activate?.();
  created.object?.control?.({ releaseOthers: true });
  return created;
}

function buildTemplatePlacementChatContent({ attack = {}, requestId = "" } = {}) {
  const shapeKey = String(attack?.template?.shape ?? "template").trim().toLowerCase();
  const label = shapeKey ? `${shapeKey.slice(0, 1).toUpperCase()}${shapeKey.slice(1)}` : "Template";

  return `
    <div class="mwd-template-placement-card">
      <p style="margin: 0 0 0.65rem;">${foundry.utils.escapeHTML(label)} placement: Drag template and <strong>Confirm</strong> position or <strong>Cancel</strong> attack resolution.</p>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button type="button" data-mwd-action="templatePlacementConfirm" data-request-id="${foundry.utils.escapeHTML(requestId)}">Confirm</button>
        <button type="button" data-mwd-action="templatePlacementCancel" data-request-id="${foundry.utils.escapeHTML(requestId)}">Cancel</button>
      </div>
    </div>
  `;
}

function registerTemplatePlacementRequest({ requestId = "", resolve = null, messageId = "" } = {}) {
  if (!requestId || typeof resolve !== "function") return;
  pendingTemplatePlacementRequests.set(requestId, {
    resolve,
    messageId: String(messageId ?? "").trim(),
  });
}

function settleTemplatePlacementRequest(requestId, confirmed = false) {
  const key = String(requestId ?? "").trim();
  if (!key) return false;

  const pending = pendingTemplatePlacementRequests.get(key);
  if (!pending) return false;

  pendingTemplatePlacementRequests.delete(key);
  pending.resolve(Boolean(confirmed));
  return true;
}

async function createTemplatePlacementChatMessage({ actor = null, attack = {}, requestId = "" } = {}) {
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    whisper: [game.user.id],
    content: buildTemplatePlacementChatContent({ attack, requestId }),
    flags: {
      mwd: {
        templatePlacementRequest: {
          requestId,
        },
      },
    },
  });
}

async function promptToPlaceMeasuredTemplate({ templateDoc = null, attack = {} } = {}) {
  const requestId = foundry.utils.randomID();
  const message = await createTemplatePlacementChatMessage({
    actor: attack?.actor ?? attack?.weapon?.actor ?? null,
    attack,
    requestId,
  });

  const confirmed = await new Promise(resolve => {
    registerTemplatePlacementRequest({
      requestId,
      resolve,
      messageId: message?.id ?? "",
    });
  });

  try {
    if (message?.id) await message.delete();
  } catch (_error) {
    // Ignore cleanup failures for temporary chat prompts.
  }

  return Boolean(confirmed) && Boolean(templateDoc?.parent);
}

export function resolveTemplatePlacementChatRequest(requestId, confirmed = false) {
  return settleTemplatePlacementRequest(requestId, confirmed);
}

export function cancelTemplatePlacementRequestForMessage(messageId = "") {
  const resolvedMessageId = String(messageId ?? "").trim();
  if (!resolvedMessageId) return false;

  for (const [requestId, pending] of pendingTemplatePlacementRequests.entries()) {
    if (pending?.messageId !== resolvedMessageId) continue;
    pendingTemplatePlacementRequests.delete(requestId);
    pending.resolve(false);
    return true;
  }

  return false;
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
    throw createUserFacingRollError("Unable to initialize measured template placement for this attack.", { severity: "warn" });
  }

  const templateDoc = await createTemporaryMeasuredTemplate(initialGeometry);
  if (!templateDoc) {
    throw createUserFacingRollError("Unable to create the temporary measured template.", { severity: "warn" });
  }

  const previewContainer = createPreviewContainer();
  let intervalId = null;
  let lastSignature = "";

  const refreshMarkers = () => {
    const currentGeometry = createTemplateGeometryFromMeasuredTemplate(templateDoc, {
      placementMode: template?.placement ?? null,
      shapeHint: template?.shape ?? "",
    });
    if (!currentGeometry) return;

    const signature = JSON.stringify(currentGeometry);
    if (signature === lastSignature) return;
    lastSignature = signature;
    drawTargetMarkers(previewContainer, buildMarkerState({ attack, geometry: currentGeometry, attacker: actor }));
  };

  try {
    refreshMarkers();
    intervalId = window.setInterval(refreshMarkers, PREVIEW_POLL_MS);

    const confirmed = await promptToPlaceMeasuredTemplate({ templateDoc, attack });
    if (!confirmed || !templateDoc?.parent) return null;

    const templateGeometry = createTemplateGeometryFromMeasuredTemplate(templateDoc, {
      placementMode: template?.placement ?? null,
      shapeHint: template?.shape ?? "",
    });
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
      targetSnapshots,
    };
  } finally {
    if (intervalId) window.clearInterval(intervalId);
    destroyPreviewContainer(previewContainer);
    if (templateDoc?.parent) {
      try {
        await templateDoc.delete();
      } catch (_error) {
        // Ignore cleanup failures for temporary placement helpers.
      }
    }
  }
}
