// src/modules/dialog/token-status-dialog.js
// Purpose: Actor-aware token status dialog and status mutation helpers.
// How it fits: UI emits status intent while the catalog resolves valid actor
// conditions and ActiveEffects store the token indicators.

import { SYSTEM_NAME } from "../core/constants.js";
import {
  buildStatusInstanceMetadata,
  getStatusConditionCatalog,
  getStatusConditionDefinition,
  isStatusConditionApplicableToActor,
  normalizeStatusConditionId,
} from "../status/status-condition-catalog.js";

const MANAGED_STATUS_IDS = new Set(["overloaded", "preparedInterrupt"]);

function asTokenDocument(token) {
  if (!token) return null;
  return token?.document ?? token;
}

function getPersistentActorForToken(actor, token) {
  if (!actor) return null;

  const tokenDoc = asTokenDocument(token) ?? asTokenDocument(actor?.token);
  if (!tokenDoc) return actor;

  if (tokenDoc.isLinked) {
    return tokenDoc.baseActor
      ?? game.actors?.get?.(tokenDoc?.baseActor?.id ?? "")
      ?? tokenDoc.actor
      ?? actor;
  }

  return tokenDoc.actor ?? actor;
}

export function humanizeStatusKey(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "Status";

  const withoutPrefix = raw.includes(".") ? raw.split(".").at(-1) : raw;
  const withoutStatusStem = withoutPrefix.replace(/^status/i, "");
  const spaced = withoutStatusStem
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();

  if (!spaced) return raw;

  return spaced.replace(/\b\w/g, char => char.toUpperCase());
}

function getStatusLabel(effect) {
  const raw = String(effect?.name ?? effect?.label ?? effect?.id ?? "Status").trim();
  if (!raw) return "Status";

  return humanizeStatusKey(raw);
}

function getStatusIcon(effect) {
  const imagePath = typeof effect?.img === "string" ? effect.img.trim() : "";
  if (imagePath) return imagePath;

  // Avoid touching the deprecated StatusEffectConfig#icon getter when possible.
  const legacyDescriptor = effect
    ? Object.getOwnPropertyDescriptor(effect, "icon")
    : null;
  if ("value" in (legacyDescriptor ?? {})) {
    return String(legacyDescriptor.value ?? "").trim();
  }

  return "";
}

function cssEscape(value) {
  return globalThis.CSS?.escape?.(String(value ?? ""))
    ?? String(value ?? "").replace(/["\\]/g, "\\$&");
}

function actorHasBurnOverloadState(actor) {
  return Object.prototype.hasOwnProperty.call(actor?.system?.burn ?? {}, "overloaded");
}

function statusIdsMatch(left = "", right = "") {
  const leftId = normalizeStatusConditionId(left);
  const rightId = normalizeStatusConditionId(right);
  return Boolean(leftId && rightId && leftId === rightId);
}

function getExactCurrentStatusState(actor, statusId) {
  const id = String(statusId ?? "").trim();
  return Boolean(id && actor?.statuses?.has?.(id));
}

function getAliasedActiveStatusIds(actor, canonicalStatusId) {
  const canonical = normalizeStatusConditionId(canonicalStatusId);
  if (!actor || !canonical) return [];
  return Array.from(actor.statuses ?? [])
    .map(statusId => String(statusId ?? "").trim())
    .filter(statusId => statusId && statusId !== canonical && normalizeStatusConditionId(statusId) === canonical);
}

function getActorStatusEffect(actor, statusId) {
  const id = String(statusId ?? "").trim();
  if (!actor || !id) return null;

  const effects = Array.from(actor.effects?.contents ?? actor.effects ?? []);
  return effects.find(effect => {
    if (effect?.statuses?.has?.(id)) return true;
    if (Array.isArray(effect?.statuses) && effect.statuses.includes(id)) return true;
    for (const effectStatusId of Array.from(effect?.statuses ?? [])) {
      if (statusIdsMatch(effectStatusId, id)) return true;
    }
    if (statusIdsMatch(effect?.getFlag?.(SYSTEM_NAME, "status")?.id, id)) return true;
    if (statusIdsMatch(effect?.flags?.[SYSTEM_NAME]?.status?.id, id)) return true;
    return statusIdsMatch(effect?.statusId ?? effect?.id ?? "", id);
  }) ?? null;
}

export function getStatusInstanceMetadata(actor, statusId) {
  const effect = getActorStatusEffect(actor, statusId);
  return effect?.getFlag?.(SYSTEM_NAME, "status")
    ?? effect?.flags?.[SYSTEM_NAME]?.status
    ?? null;
}

export function getCurrentStatusState(actor, statusId) {
  if (statusId === "overloaded" && actorHasBurnOverloadState(actor)) {
    return !!actor?.system?.burn?.overloaded || !!actor?.statuses?.has?.(statusId);
  }
  const id = String(statusId ?? "").trim();
  if (!actor || !id) return false;
  if (actor?.statuses?.has?.(id)) return true;
  return Array.from(actor?.statuses ?? []).some(activeId => statusIdsMatch(activeId, id));
}

function statusEffectFromCatalogEntry(entry, actor) {
  const active = getCurrentStatusState(actor, entry.id);
  const metadata = getStatusInstanceMetadata(actor, entry.id) ?? {};
  return {
    id: entry.id,
    label: entry.label,
    icon: entry.icon,
    active,
    managed: Boolean(entry.managed) || MANAGED_STATUS_IDS.has(entry.id),
    manual: Boolean(entry.manual),
    legacy: false,
    category: entry.category,
    tags: [...(entry.tags ?? [])],
    scope: String(metadata.scope ?? "").trim(),
    notes: String(metadata.notes ?? "").trim(),
  };
}

function statusEffectFromConfigOrLegacy(statusId, actor) {
  const effect = (CONFIG.statusEffects ?? []).find(item => String(item?.id ?? "").trim() === statusId) ?? null;
  const metadata = getStatusInstanceMetadata(actor, statusId) ?? {};
  return {
    id: statusId,
    label: effect ? getStatusLabel(effect) : humanizeStatusKey(statusId),
    icon: effect ? getStatusIcon(effect) : "",
    active: getCurrentStatusState(actor, statusId),
    managed: false,
    manual: false,
    legacy: true,
    category: "",
    tags: [],
    scope: String(metadata.scope ?? "").trim(),
    notes: String(metadata.notes ?? "").trim(),
  };
}

export function getToggleableStatusEffects(actor) {
  const seen = new Set();
  const catalog = getStatusConditionCatalog();
  const effects = [];

  for (const entry of catalog) {
    const statusId = String(entry?.id ?? "").trim();
    if (!statusId || seen.has(statusId)) continue;

    const active = getCurrentStatusState(actor, statusId);
    const applicable = isStatusConditionApplicableToActor(entry, actor);
    if (!active && (!applicable || !entry.manual)) continue;

    seen.add(statusId);
    effects.push(statusEffectFromCatalogEntry(entry, actor));
  }

  for (const statusId of Array.from(actor?.statuses ?? [])) {
    const id = String(statusId ?? "").trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    effects.push(statusEffectFromConfigOrLegacy(id, actor));
  }

  return effects.sort((left, right) => {
    if (left.active !== right.active) return left.active ? -1 : 1;
    if (left.legacy !== right.legacy) return left.legacy ? 1 : -1;
    return left.label.localeCompare(right.label);
  });
}

export function getActiveStatusSummaries(actor) {
  const seen = new Set();
  return getToggleableStatusEffects(actor)
    .filter(effect => effect.active)
    .map(effect => ({
      id: String(effect.id ?? "").trim(),
      label: String(effect.label ?? "").trim() || humanizeStatusKey(effect.id),
    }))
    .filter(effect => {
      if (!effect.id || seen.has(effect.id)) return false;
      seen.add(effect.id);
      return true;
    });
}

function buildDialogContent(effects) {
  if (!effects.length) {
    return "<p>No token statuses are configured.</p>";
  }

  const escapeHtml = foundry.utils.escapeHTML;

  const rows = effects.map(effect => {
    const checked = effect.active ? "checked" : "";
    const statusIcon = effect.icon
      ? `<img src="${escapeHtml(effect.icon)}" alt="" width="20" height="20" style="flex: 0 0 20px; border: 0;" />`
      : "";
    const managedHint = effect.managed
      ? `<small style="opacity: 0.7;">Managed by system state</small>`
      : "";

    const legacyHint = effect.legacy
      ? `<small style="opacity: 0.7;">Legacy / uncataloged</small>`
      : "";

    return `
      <div class="mwd-token-status-dialog__row" data-status-id="${escapeHtml(effect.id)}" style="display: grid; gap: 0.2rem; padding: 0.35rem 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
        <label style="display: flex; align-items: center; gap: 0.5rem;">
          <input type="checkbox" name="status.${escapeHtml(effect.id)}.active" value="1" ${checked} />
          ${statusIcon}
          <span style="flex: 1 1 auto;">${escapeHtml(effect.label)}</span>
          ${managedHint}
          ${legacyHint}
        </label>
        ${effect.legacy ? "" : `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.35rem; padding-left: 1.85rem;">
            <input type="text" name="status.${escapeHtml(effect.id)}.scope" value="${escapeHtml(effect.scope ?? "")}" placeholder="Scope" />
            <input type="text" name="status.${escapeHtml(effect.id)}.notes" value="${escapeHtml(effect.notes ?? "")}" placeholder="Notes" />
          </div>
        `}
      </div>
    `;
  }).join("");

  return `
    <div class="mwd-token-status-dialog">
      <p style="margin-top: 0;">Toggle the statuses shown on this token.</p>
      <div style="display: grid; gap: 0.2rem; max-height: 20rem; overflow-y: auto; padding-right: 0.25rem;">
        ${rows}
      </div>
    </div>
  `;
}

async function applyStatusSelection({ actor, effects, selectedStatusIds }) {
  const selected = new Map(selectedStatusIds.map(entry => [entry.id, entry]));

  for (const effect of effects) {
    const selectedEntry = selected.get(effect.id);
    const isSelected = Boolean(selectedEntry?.active);
    await applyManagedStatusUpdate({
      actor,
      statusId: effect.id,
      active: isSelected,
      metadata: selectedEntry?.metadata ?? {},
    });
  }
}

async function updateStatusEffectMetadata(actor, statusId, metadata = {}) {
  const entry = getStatusConditionDefinition(statusId);
  if (!entry) return false;

  const effect = getActorStatusEffect(actor, statusId);
  if (!effect) return false;

  const normalizedMetadata = buildStatusInstanceMetadata({
    actor,
    statusId,
    metadata,
    catalogEntry: entry,
  });
  const update = { [`flags.${SYSTEM_NAME}.status`]: normalizedMetadata };

  if (typeof effect.update === "function") {
    await effect.update(update);
    return true;
  }

  if (effect.id && typeof actor.updateEmbeddedDocuments === "function") {
    await actor.updateEmbeddedDocuments("ActiveEffect", [{ _id: effect.id, ...update }]);
    return true;
  }

  return false;
}

export async function applyManagedStatusUpdate({ actor, statusId, active, metadata = {} }) {
  if (!actor || !statusId) return false;

  const rawStatusId = String(statusId ?? "").trim();
  const canonicalStatusId = normalizeStatusConditionId(rawStatusId);
  if (!canonicalStatusId) return false;

  if (rawStatusId !== canonicalStatusId) {
    const rawActive = getExactCurrentStatusState(actor, rawStatusId);
    const canonicalActive = getExactCurrentStatusState(actor, canonicalStatusId);

    if (!active) {
      if (!rawActive) return false;
      await actor.toggleStatusEffect(rawStatusId, { active: false, overlay: false });
      return true;
    }

    const entry = getStatusConditionDefinition(canonicalStatusId);
    const applicable = entry ? isStatusConditionApplicableToActor(entry, actor) : false;
    if (entry && !applicable) return false;

    if (rawActive) await actor.toggleStatusEffect(rawStatusId, { active: false, overlay: false });
    if (!canonicalActive) await actor.toggleStatusEffect(canonicalStatusId, { active: true, overlay: false });
    await updateStatusEffectMetadata(actor, canonicalStatusId, metadata);
    return true;
  }

  const isActive = getCurrentStatusState(actor, canonicalStatusId);
  if (active && isActive && !getExactCurrentStatusState(actor, canonicalStatusId)) {
    const aliases = getAliasedActiveStatusIds(actor, canonicalStatusId);
    await actor.toggleStatusEffect(canonicalStatusId, { active: true, overlay: false });
    for (const alias of aliases) {
      await actor.toggleStatusEffect(alias, { active: false, overlay: false });
    }
    await updateStatusEffectMetadata(actor, canonicalStatusId, metadata);
    return true;
  }

  if (Boolean(active) === isActive) {
    if (active) return updateStatusEffectMetadata(actor, canonicalStatusId, metadata);
    return false;
  }

  const entry = getStatusConditionDefinition(canonicalStatusId);
  const applicable = entry ? isStatusConditionApplicableToActor(entry, actor) : false;
  if (active && entry && !applicable) return false;

  if (canonicalStatusId === "overloaded" && actorHasBurnOverloadState(actor)) {
    await actor.update({ "system.burn.overloaded": Boolean(active) });
    return true;
  }

  await actor.toggleStatusEffect(canonicalStatusId, { active: Boolean(active), overlay: false });
  if (active) await updateStatusEffectMetadata(actor, canonicalStatusId, metadata);
  return true;
}

function readStatusSelectionFromForm(form) {
  const byId = new Map();
  const rows = Array.from(form?.querySelectorAll?.("[data-status-id]") ?? []);

  for (const row of rows) {
    const id = String(row?.dataset?.statusId ?? "").trim();
    if (!id) continue;

    const escapedId = cssEscape(id);
    const active = Boolean(row.querySelector(`input[name="status.${escapedId}.active"]`)?.checked);
    const scope = String(row.querySelector(`input[name="status.${escapedId}.scope"]`)?.value ?? "").trim();
    const notes = String(row.querySelector(`input[name="status.${escapedId}.notes"]`)?.value ?? "").trim();

    byId.set(id, {
      id,
      active,
      metadata: { scope, notes },
    });
  }

  return Array.from(byId.values());
}

export async function openTokenStatusDialog({ actor, token } = {}) {
  if (!actor || !token) return false;

  const actorWriteTarget = getPersistentActorForToken(actor, token);
  const effects = getToggleableStatusEffects(actorWriteTarget);
  if (!effects.length) {
    ui.notifications?.warn("No token statuses are configured.");
    return false;
  }

  return foundry.applications.api.DialogV2.wait({
    window: {
      title: `Token Statuses: ${token.name ?? actor.name ?? "Token"}`
    },
    position: {
      width: 420
    },
    content: buildDialogContent(effects),
    buttons: [
      {
        action: "apply",
        label: "Apply",
        icon: "fa-solid fa-check",
        default: true,
        callback: async (_event, button) => {
          try {
            const selectedStatusIds = readStatusSelectionFromForm(button.form);

            await applyStatusSelection({ actor: actorWriteTarget, effects, selectedStatusIds });
            return true;
          } catch (error) {
            console.error("MWD | Failed to update token statuses", error);
            ui.notifications?.error("Unable to update token statuses.");
            return false;
          }
        }
      },
      {
        action: "cancel",
        label: "Cancel",
        icon: "fa-solid fa-xmark",
        callback: () => false
      }
    ],
    close: () => false
  });
}

export function registerTokenStatusHudFilter() {
  if (typeof Hooks === "undefined") return;

  Hooks.on("renderTokenHUD", (_app, html, data = {}) => {
    const tokenId = data?._id ?? data?.id ?? "";
    const token = canvas?.tokens?.get?.(tokenId) ?? null;
    const actor = token?.actor ?? null;
    if (!actor) return;

    const catalog = getStatusConditionCatalog();
    const byId = new Map(catalog.map(entry => [entry.id, entry]));
    const isJQuery = typeof jQuery !== "undefined" && html instanceof jQuery;
    const root = isJQuery ? html[0] : html;
    if (!(root instanceof HTMLElement)) return;

    const controls = root.querySelectorAll("[data-status-id], [data-statusId], [data-effect-id]");
    for (const control of controls) {
      const statusId = String(
        control.dataset?.statusId
        ?? control.dataset?.statusid
        ?? control.dataset?.effectId
        ?? ""
      ).trim();
      if (!statusId) continue;

      const entry = byId.get(statusId);
      if (!entry) continue;

      const active = getCurrentStatusState(actor, statusId);
      if (!active && !isStatusConditionApplicableToActor(entry, actor)) {
        control.hidden = true;
        control.style.display = "none";
      }
    }
  });
}
