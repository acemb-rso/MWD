// src/modules/modifiers/providers/base-modifiers.js
// Purpose: System module or client script for base-modifiers. Integrates with the system's JavaScript modules.

// modules/modifiers/providers/base-modifiers.js

/**
 * BaseRollModifiersProvider
 * Roll-time / UI-time modifiers that are not stored on the actor/items.
 *
 * Primary input (new):
 *   payload.modifiers.manual: Array<{ id?, label?, value, domain? }>
 *
 * Legacy compatibility:
 *   payload.dialog.otherMods OR payload.modifiers.otherMods OR payload.otherMods
 *
 * Emits normal modifier entries for the global modifier pipeline.
 */
export class BaseRollModifiersProvider {
  id = "mwd.baseRollModifiers";
  label = "Roll (Base)";

  collect({ payload } = {}) {
    const mods = [];

    // 1) Manual rows list (preferred)
    const manual = payload?.modifiers?.manual;
    if (Array.isArray(manual) && manual.length) {
      for (const row of manual) {
        if (!row) continue;
        const value = Number(row.value);
        if (!Number.isFinite(value) || value === 0) continue;

        mods.push({
          id: row.id ?? undefined,
          label: row.label ?? "Manual modifier",
          value,
          source: "Manual",
          domain: row.domain ?? undefined
        });
      }
      return mods;
    }

    // 2) Legacy "Other modifiers" scalar (fallback)
    const rawOther =
      payload?.dialog?.otherMods ??
      payload?.modifiers?.otherMods ??
      payload?.otherMods ??
      0;

    const otherMods = Number(rawOther);
    if (Number.isFinite(otherMods) && otherMods !== 0) {
      mods.push({
        id: "otherMods",
        label: "Other modifiers",
        value: otherMods,
        source: "Roll"
      });
    }

    return mods;
  }
}
