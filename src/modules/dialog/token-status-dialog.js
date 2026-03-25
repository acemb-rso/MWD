// src/modules/dialog/token-status-dialog.js
// Purpose: Defines function `asTokenDocument`.
// How it fits: Describes role within src/modules or template rendering pipeline.


const MANAGED_STATUS_IDS = new Set(["overloaded"]);

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

export function getCurrentStatusState(actor, statusId) {
  if (statusId === "overloaded") {
    return !!actor?.system?.burn?.overloaded || !!actor?.statuses?.has?.(statusId);
  }
  return actor?.statuses?.has?.(statusId) ?? false;
}

export function getToggleableStatusEffects(actor) {
  const seen = new Set();

  return (CONFIG.statusEffects ?? [])
    .filter(effect => {
      const statusId = String(effect?.id ?? "").trim();
      if (!statusId || seen.has(statusId)) return false;
      seen.add(statusId);
      return true;
    })
    .map(effect => {
      const statusId = String(effect.id).trim();
      return {
        id: statusId,
        label: getStatusLabel(effect),
        icon: getStatusIcon(effect),
        active: getCurrentStatusState(actor, statusId),
        managed: MANAGED_STATUS_IDS.has(statusId)
      };
    })
    .sort((left, right) => {
      if (left.active !== right.active) return left.active ? -1 : 1;
      return left.label.localeCompare(right.label);
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

    return `
      <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.2rem 0;">
        <input type="checkbox" name="status" value="${escapeHtml(effect.id)}" ${checked} />
        ${statusIcon}
        <span style="flex: 1 1 auto;">${escapeHtml(effect.label)}</span>
        ${managedHint}
      </label>
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
  const selected = new Set(selectedStatusIds);

  for (const effect of effects) {
    const isSelected = selected.has(effect.id);
    await applyManagedStatusUpdate({ actor, statusId: effect.id, active: isSelected });
  }
}

export async function applyManagedStatusUpdate({ actor, statusId, active }) {
  if (!actor || !statusId) return false;

  const isActive = getCurrentStatusState(actor, statusId);
  if (Boolean(active) === isActive) return false;

  if (statusId === "overloaded") {
    await actor.update({ "system.burn.overloaded": Boolean(active) });
    return true;
  }

  await actor.toggleStatusEffect(statusId, { active: Boolean(active), overlay: false });
  return true;
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
            const selectedStatusIds = Array.from(
              button.form?.querySelectorAll('input[name="status"]:checked') ?? []
            ).map(element => element.value);

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
