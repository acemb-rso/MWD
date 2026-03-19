const MANAGED_STATUS_IDS = new Set(["overloaded"]);

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
  return String(effect?.icon ?? effect?.img ?? "").trim();
}

function getCurrentStatusState(actor, statusId) {
  if (statusId === "overloaded") {
    return !!actor?.system?.burn?.overloaded;
  }
  return actor?.statuses?.has?.(statusId) ?? false;
}

function getToggleableStatusEffects(actor) {
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
    <form class="mwd-token-status-dialog">
      <p style="margin-top: 0;">Toggle the statuses shown on this token.</p>
      <div style="display: grid; gap: 0.2rem; max-height: 20rem; overflow-y: auto; padding-right: 0.25rem;">
        ${rows}
      </div>
    </form>
  `;
}

async function applyStatusSelection({ actor, effects, selectedStatusIds }) {
  const selected = new Set(selectedStatusIds);
  const creates = [];
  const deletes = [];
  const updates = {};

  for (const effect of effects) {
    const isSelected = selected.has(effect.id);
    const isActive = getCurrentStatusState(actor, effect.id);

    if (isSelected === isActive) continue;

    if (effect.id === "overloaded") {
      updates["system.burn.overloaded"] = isSelected;
      continue;
    }

    if (isSelected) {
      const createData = {
        name: effect.label,
        statuses: [effect.id]
      };

      if (effect.icon) createData.icon = effect.icon;
      creates.push(createData);
      continue;
    }

    const matching = actor.effects
      .filter(activeEffect => activeEffect.statuses?.has?.(effect.id))
      .map(activeEffect => activeEffect.id);

    deletes.push(...matching);
  }

  if (Object.keys(updates).length) {
    await actor.update(updates);
  }

  if (creates.length) {
    await actor.createEmbeddedDocuments("ActiveEffect", creates);
  }

  if (deletes.length) {
    await actor.deleteEmbeddedDocuments("ActiveEffect", deletes);
  }
}

export async function openTokenStatusDialog({ actor, token } = {}) {
  if (!actor || !token) return false;

  const effects = getToggleableStatusEffects(actor);
  if (!effects.length) {
    ui.notifications?.warn("No token statuses are configured.");
    return false;
  }

  return new Promise(resolve => {
    let settled = false;

    new Dialog({
      title: `Token Statuses: ${token.name ?? actor.name ?? "Token"}`,
      content: buildDialogContent(effects),
      buttons: {
        apply: {
          label: "Apply",
          callback: async (html) => {
            settled = true;
            try {
              const selectedStatusIds = html
                .find('input[name="status"]:checked')
                .map((_, element) => element.value)
                .get();

              await applyStatusSelection({ actor, effects, selectedStatusIds });
              resolve(true);
            } catch (error) {
              console.error("MWD | Failed to update token statuses", error);
              ui.notifications?.error("Unable to update token statuses.");
              resolve(false);
            }
          }
        },
        cancel: {
          label: "Cancel",
          callback: () => {
            settled = true;
            resolve(false);
          }
        }
      },
      default: "apply",
      close: () => {
        if (!settled) resolve(false);
      }
    }).render(true);
  });
}
