// src/modules/item/asset-module-item-sheet.js
// Purpose: Provides a Sheet / UI class for entities (actor/item) or an application.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { BaseItemSheet } from "./base-item-sheet.js";
import { TEMPLATES_PATH } from "../core/constants.js";
import { buildAssetModuleSummary } from "../mwd/asset-module-effects.js";
import { AssetModuleValidationError, validateAssetModuleEffects } from "../mwd/asset-module-rules.js";
import {
  normalizeAssetModuleRuntimePacket,
  normalizeAssetModuleRuntimePackets,
} from "../mwd/asset-module-runtime.js";
import { getStatusConditionCatalog } from "../status/status-condition-catalog.js";

function randomId(prefix = "aura") {
  const id = globalThis.foundry?.utils?.randomID?.()
    ?? Math.random().toString(36).slice(2, 10);
  return `${prefix}-${id}`;
}

function escapeHtml(value) {
  return globalThis.foundry?.utils?.escapeHTML?.(String(value ?? ""))
    ?? String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
}

export class AssetModuleItemSheet extends BaseItemSheet {
  static LAYOUT_ID = "asset-module";

  static PARTS = {
    sheet: {
      template: `${TEMPLATES_PATH}/v2/item/assetModule.hbs`,
      scrollable: [".sheet-body"]
    }
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const summary = buildAssetModuleSummary(this.item);
    const runtimePackets = Array.isArray(this.item.system?.runtime?.packets)
      ? this.item.system.runtime.packets
      : [];
    const normalizedPackets = normalizeAssetModuleRuntimePackets(runtimePackets, {
      item: this.item,
      strict: false,
    });
    const statusOptions = getStatusConditionCatalog().map(entry => ({
      value: entry.id,
      label: entry.label,
    }));
    context.itemSheet = {
      ...(context.itemSheet ?? {}),
      assetModuleEffectsJson: JSON.stringify(this.item.system?.effects ?? [], null, 2),
      assetModuleSummary: summary.summary,
      assetModuleErrors: summary.errors ?? [],
      assetModuleAuras: normalizedPackets
        .filter(packet => packet.kind === "aura")
        .map(packet => ({
          ...packet,
          statuses: statusOptions.map(option => ({
            ...option,
            selected: packet.grants?.statuses?.includes(option.value) ?? false,
          })),
        })),
      assetModuleRuntimePacketCount: normalizedPackets.length,
    };
    return context;
  }

  _onRender(context, options) {
    super._onRender?.(context, options);
    const root = this._getRootElement?.();
    if (!root) return;
    const preserveScroll = work => {
      this._captureScrollPositions?.();
      return work();
    };

    root.querySelectorAll(".mwd-asset-aura-add").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        void preserveScroll(() => this.#addAura());
      });
    });
    root.querySelectorAll(".mwd-asset-aura-delete").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        void preserveScroll(() => this.#deleteAura(button.dataset.auraId));
      });
    });
    root.querySelectorAll(".mwd-asset-aura-field").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        event.stopPropagation();
        const value = field instanceof HTMLInputElement && field.type === "number"
          ? Number(field.value)
          : field.value;
        void preserveScroll(() => this.#updateAuraField(field.dataset.auraId, field.dataset.field, value));
      });
    });
    root.querySelectorAll(".mwd-asset-aura-status").forEach(field => {
      field.addEventListener("change", event => {
        event.preventDefault();
        event.stopPropagation();
        const auraId = field.dataset.auraId;
        const statuses = Array.from(root.querySelectorAll(`.mwd-asset-aura-status[data-aura-id="${auraId}"]`))
          .filter(input => input instanceof HTMLInputElement && input.checked)
          .map(input => input.value);
        void preserveScroll(() => this.#updateAuraStatuses(auraId, statuses));
      });
    });
    root.querySelectorAll(".mwd-asset-runtime-json").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        void this.#openRuntimeJsonEditor();
      });
    });
  }

  _getNamedFieldUpdate(field) {
    const name = String(field?.getAttribute?.("name") ?? "").trim();
    if (name !== "system.effects") return super._getNamedFieldUpdate(field);

    try {
      const parsed = JSON.parse(String(field.value ?? "[]"));
      if (!Array.isArray(parsed)) {
        ui.notifications?.error("AssetModule effects JSON must be an array.");
        return null;
      }
      validateAssetModuleEffects({ effects: parsed }, { itemName: this.item.name, itemId: this.item.id });
      return { "system.effects": parsed };
    } catch (err) {
      const message = err instanceof AssetModuleValidationError
        ? err.userMessage
        : "AssetModule effects JSON is invalid.";
      ui.notifications?.error(message);
      console.error("MWD | Invalid AssetModule effects JSON", err);
      return null;
    }
  }

  #getRuntimePackets() {
    return Array.isArray(this.item.system?.runtime?.packets)
      ? foundry.utils.deepClone(this.item.system.runtime.packets)
      : [];
  }

  async #updateRuntimePackets(packets) {
    const normalized = normalizeAssetModuleRuntimePackets(packets, {
      item: this.item,
      strict: true,
    }).map(packet => {
      const { sourceId, sourceUuid, sourceName, moduleActive, moduleReady, ...authored } = packet;
      return authored;
    });
    await this.item.update({ "system.runtime.packets": normalized });
  }

  async #addAura() {
    const packets = this.#getRuntimePackets();
    packets.push({
      id: randomId("area-status-aura"),
      kind: "aura",
      label: "Area Status Aura",
      radius: 90,
      allegiance: "ally",
      grants: { statuses: ["ecmShrouded"] },
    });
    await this.#updateRuntimePackets(packets);
  }

  async #deleteAura(auraId) {
    const id = String(auraId ?? "").trim();
    await this.#updateRuntimePackets(this.#getRuntimePackets().filter(packet =>
      !(String(packet?.kind ?? "").trim() === "aura" && String(packet?.id ?? "").trim() === id)
    ));
  }

  async #updateAuraField(auraId, field, value) {
    const id = String(auraId ?? "").trim();
    const packets = this.#getRuntimePackets().map(packet => {
      if (String(packet?.kind ?? "").trim() !== "aura" || String(packet?.id ?? "").trim() !== id) return packet;
      return {
        ...packet,
        [field]: field === "radius" ? Math.max(1, Number(value) || 1) : String(value ?? "").trim(),
      };
    });
    await this.#updateRuntimePackets(packets);
  }

  async #updateAuraStatuses(auraId, statuses) {
    const id = String(auraId ?? "").trim();
    const packets = this.#getRuntimePackets().map(packet => {
      if (String(packet?.kind ?? "").trim() !== "aura" || String(packet?.id ?? "").trim() !== id) return packet;
      return {
        ...packet,
        grants: {
          statuses: Array.from(new Set(statuses.map(status => String(status ?? "").trim()).filter(Boolean))),
        },
      };
    });
    await this.#updateRuntimePackets(packets);
  }

  async #openRuntimeJsonEditor() {
    const DialogV2 = globalThis.foundry?.applications?.api?.DialogV2;
    if (!DialogV2?.wait) return;
    const json = JSON.stringify(this.#getRuntimePackets(), null, 2);
    const result = await DialogV2.wait({
      window: { title: `${this.item.name}: Runtime Packets` },
      content: `
        <form class="mwd-quick-select">
          <div class="mwd-field">
            <label>Runtime Packets JSON</label>
            <textarea name="runtimePackets" rows="24" spellcheck="false">${escapeHtml(json)}</textarea>
          </div>
        </form>`,
      buttons: [{
        action: "save",
        label: "Save",
        default: true,
        callback: (_event, button) => String(button.form?.elements?.runtimePackets?.value ?? "[]"),
      }, {
        action: "cancel",
        label: "Cancel",
        callback: () => null,
      }],
      close: () => null,
    });
    if (result === null) return;

    try {
      const parsed = JSON.parse(result);
      if (!Array.isArray(parsed)) throw new Error("Runtime packets JSON must be an array.");
      parsed.forEach((packet, index) => normalizeAssetModuleRuntimePacket(packet, {
        item: this.item,
        index,
        strict: true,
      }));
      await this.#updateRuntimePackets(parsed);
    } catch (error) {
      ui.notifications?.error(error?.validationErrors?.[0] ?? error.message ?? "Runtime packets JSON is invalid.");
      console.error("MWD | Invalid Asset Module runtime packets JSON", error);
    }
  }
}
