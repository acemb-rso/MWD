// src/modules/area-effects/hazard-chat.js
// Purpose: Builds render models for persistent hazard chat cards.
// How it fits: Shared by combat tracking and chat actions so hazard UX stays consistent.

import {
  createExposureData,
  getExposureLabel,
  normalizeExposureTier,
  scaleDamageByExposure,
} from "./area-effect-engine.js";
import { getPersonalDamageTypeLabel, normalizePersonalDamageType } from "../mwd/personal-damage.js";

export const MWD_HAZARD_CARD_TEMPLATE = "systems/mwd/templates/v2/roll/_mwd-hazard-card.hbs";

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function getPortraitSource({ actor = null, token = null } = {}) {
  const tokenDoc = token?.document ?? token ?? null;
  const tokenTexture = String(tokenDoc?.texture?.src ?? "").trim();
  const actorImage = String(actor?.img ?? "").trim();
  return tokenTexture || actorImage || "icons/svg/mystery-man.svg";
}

function normalizeEdgePools(pools = []) {
  return Array.isArray(pools)
    ? pools
      .map(pool => ({
        key: String(pool?.key ?? "").trim(),
        label: String(pool?.label ?? pool?.key ?? "").trim(),
        value: toNumber(pool?.value, 0),
      }))
      .filter(pool => pool.key)
    : [];
}

export function normalizeHazardCard(card = {}) {
  const preview = card?.preview ?? {};
  const initialTier = normalizeExposureTier(card?.exposure?.initialTier ?? card?.exposureTier ?? card?.tier, "none");
  const finalTier = normalizeExposureTier(
    card?.exposure?.finalTier ?? (preview.evadeActive ? preview.finalTier : initialTier),
    initialTier
  );
  const exposure = createExposureData({
    tier: initialTier,
    appliedTier: finalTier,
    evadeUsed: Boolean(preview.evadeActive && initialTier !== finalTier),
    evadeLocked: Boolean(card?.evadeLocked ?? card?.exposure?.evadeLocked),
  });
  const baseDamage = Math.max(0, toNumber(card?.baseDamage, 0));
  const damageBefore = Math.max(0, toNumber(card?.damageBefore, scaleDamageByExposure(baseDamage, exposure.initialTier)));
  const damageAfter = Math.max(0, toNumber(card?.damageAfter, scaleDamageByExposure(baseDamage, exposure.finalTier)));
  const reactionPreview = preview?.reactionPreview ?? {};

  return {
    kind: String(card?.kind ?? "hazard").trim() || "hazard",
    eventType: String(card?.eventType ?? "entry").trim() || "entry",
    regionId: String(card?.regionId ?? "").trim(),
    regionName: String(card?.regionName ?? card?.label ?? "Hazard").trim() || "Hazard",
    actorUuid: String(card?.actorUuid ?? "").trim() || null,
    tokenUuid: String(card?.tokenUuid ?? "").trim() || null,
    actorName: String(card?.actorName ?? "Target").trim() || "Target",
    turnsExposed: Math.max(0, toNumber(card?.turnsExposed, 0)),
    baseDamage,
    ap: Math.max(0, toNumber(card?.ap, 0)),
    damageType: normalizePersonalDamageType(card?.damageType, "concussive"),
    damageTypeLabel: getPersonalDamageTypeLabel(card?.damageType ?? "concussive") || "Damage",
    source: String(card?.source ?? card?.regionName ?? "Hazard").trim() || "Hazard",
    applied: Boolean(card?.applied),
    applyReason: String(card?.applyReason ?? "").trim(),
    onFullBurnDelta: Math.max(0, toNumber(card?.onFullBurnDelta, 0)),
    exposure,
    damageBefore,
    damageAfter,
    nextTier: normalizeExposureTier(card?.nextTier, exposure.finalTier),
    nextLabel: getExposureLabel(card?.nextTier ?? exposure.finalTier),
    preview: {
      evadeActive: Boolean(preview.evadeActive),
      edgePoolKey: String(preview.edgePoolKey ?? "").trim() || null,
      finalTier: exposure.finalTier,
      burnDelta: toNumber(reactionPreview?.burnDelta, 0),
      canSpendEdge: Boolean(reactionPreview?.canSpendEdge),
      edgePools: normalizeEdgePools(reactionPreview?.edgePools),
    },
  };
}

export function buildHazardCardVM(card = {}, { actor = null, token = null } = {}) {
  const normalized = normalizeHazardCard(card);
  const eventTitle = normalized.eventType === "tick"
    ? "Hazard Tick"
    : normalized.eventType === "exit"
      ? "Hazard Exit"
      : "Hazard Entry";
  const exposureLabel = normalized.exposure.initialLabel === normalized.exposure.finalLabel
    ? normalized.exposure.initialLabel
    : `${normalized.exposure.initialLabel} -> ${normalized.exposure.finalLabel}`;
  const damageLabel = normalized.damageBefore === normalized.damageAfter
    ? String(normalized.damageAfter)
    : `${normalized.damageBefore} -> ${normalized.damageAfter}`;

  return {
    classes: [
      "mwd-chat-card",
      "mwd-hazard-card",
      `is-${normalized.exposure.finalTier}`,
      normalized.applied ? "is-applied" : "",
    ].filter(Boolean).join(" "),
    header: {
      left: normalized.regionName,
      right: eventTitle,
    },
    target: {
      name: normalized.actorName,
      image: getPortraitSource({ actor, token }),
    },
    rows: [
      { label: "Exposure", value: exposureLabel },
      { label: "Damage", value: damageLabel },
      { label: "Next Tier", value: normalized.nextLabel },
      { label: "Turns Exposed", value: String(normalized.turnsExposed) },
    ],
    reactionHint: normalized.exposure.evadeLocked
      ? "Evade is locked for this hazard."
      : normalized.preview.evadeActive
        ? (normalized.preview.edgePoolKey
          ? "Evade active. Reaction Burn canceled by Edge."
          : (normalized.preview.burnDelta > 0 ? `Evade active. This reaction adds +${normalized.preview.burnDelta} Burn.` : "Evade active."))
        : "",
    actions: normalized.applied
      ? []
      : buildHazardCardActions(normalized),
  };
}

function buildHazardCardActions(card = {}) {
  const actions = [];

  if (!card.exposure.evadeLocked && card.exposure.initialTier !== "none") {
    actions.push({
      action: "toggleHazardEvade",
      label: card.preview.evadeActive ? "Clear Evade" : "Use Reaction",
      cssClass: `mwd-target-row__action ${card.preview.evadeActive ? "is-active" : ""}`,
    });
  }

  if (card.preview.evadeActive && card.preview.canSpendEdge) {
    for (const pool of card.preview.edgePools) {
      actions.push({
        action: "toggleHazardEvadeEdge",
        label: card.preview.edgePoolKey === pool.key ? `Edge: ${pool.label}` : `Use ${pool.label}`,
        cssClass: `mwd-target-row__action ${card.preview.edgePoolKey === pool.key ? "is-active" : ""}`,
        dataset: { "pool-key": pool.key },
      });
    }
  }

  actions.push({
    action: "applyHazardTick",
    label: "Apply",
    cssClass: "mwd-target-row__action mwd-apply-attack-damage",
  });

  return actions;
}

export async function renderHazardCard(card = {}, { actor = null, token = null } = {}) {
  return foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-hazard-card",
    buildHazardCardVM(card, { actor, token })
  );
}
