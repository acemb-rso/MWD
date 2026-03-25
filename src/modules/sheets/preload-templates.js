// sheets/preload-templates.js
import { SYSTEM_NAME, LOG_HEAD } from "../constants.js";

/**
 * Minimal preload list to guarantee CSB/AppV2 sheets render.
 * Keep this explicit (like dnd5e) to avoid FilePicker/glob edge cases.
 */
const PARTIALS = [
  // UI (CSB render entry point + node types)
  `systems/${SYSTEM_NAME}/templates/v2/ui/layout-root.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/ui/nodes/hexabox.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/ui/nodes/stack.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/ui/nodes/panel.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/ui/nodes/include.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/ui/nodes/tabs.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/ui/nodes/unknown.hbs`,
  `systems/${SYSTEM_NAME}/templates/common/view-mode.hbs`,
  `systems/${SYSTEM_NAME}/templates/common/label.hbs`,
  `systems/${SYSTEM_NAME}/templates/common/enum-value-label.hbs`,
  `systems/${SYSTEM_NAME}/templates/common/damage-code.hbs`,
  `systems/${SYSTEM_NAME}/templates/common/damage-armor.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/ui/mod-stepper.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/ui/condition-monitors.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/roll/_mwd-roll-card.hbs`,

  // Character UI
  `systems/${SYSTEM_NAME}/templates/v2/ui/character/attributes.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/ui/character/combat-actions.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/ui/character/skills-column.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/ui/character/skill-row.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/ui/character/edge-console.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/ui/character/burn-monitor.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/ui/character/status-dashboard.hbs`,

  // Sheet wrapper
  `systems/${SYSTEM_NAME}/templates/v2/actor/_sheet-root.hbs`,

  // Placeholders
  `systems/${SYSTEM_NAME}/templates/v2/ui/placeholders/assigned-systems.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/ui/placeholders/inventory-gear.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/ui/placeholders/inventory-armor.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/ui/placeholders/inventory-weapons.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/ui/placeholders/bio-description.hbs`,

  // V2 item partials
  `systems/${SYSTEM_NAME}/templates/v2/item/_item-sheet-root.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/item/personal-weapon-root.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/item/mech-weapon-root.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/item/armor-root.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/item/parts/itemname.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/item/parts/inactive.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/item/parts/references.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/item/parts/modifier.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/item/parts/modifiers.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/item/parts/weapon-main.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/item/parts/weapon-compact-main.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/item/parts/armor-main.hbs`,
  `systems/${SYSTEM_NAME}/templates/v2/item/parts/item-effects.hbs`,

  // Actors
  `systems/${SYSTEM_NAME}/templates/v2/actor/character-sheet.hbs`
];

function toAlias(path) {
  const p = String(path).replaceAll("\\", "/");

  // Match both "systems/..." and "/systems/..."
  const marker = `systems/${SYSTEM_NAME}/templates/`;
  const idx = p.indexOf(marker);

  // Keep only the portion under templates/ (e.g. "v2/ui/layout-root.hbs")
  const rel = idx >= 0 ? p.slice(idx + marker.length) : p;

  const noExt = rel.replace(/\.hbs$/i, "");
  const parts = noExt
    .split("/")
    .filter(Boolean)
    .map(seg => seg.replace(/^_+/, ""));

  return `mwd.${parts.join(".")}`; // mwd.v2.ui.layout-root
}


function getHB() {
  // AppV2 rendering uses Foundry's handlebars environment
  return foundry?.applications?.handlebars?.Handlebars ?? Handlebars;
}

export async function preloadTemplatesV2() {
  const HB = getHB();

  try {
    const map = {};
    for (const p of PARTIALS) {
      map[toAlias(p)] = p; // short alias: mwd.v2.item.parts.itemname
      map[p] = p;          // full path: systems/mwd/templates/v2/item/parts/itemname.hbs
    }

    // This compiles & registers the aliases as partials in Foundry's HB env
    await foundry.applications.handlebars.loadTemplates(map);

    // Hard asserts against the *same* environment used by AppV2 rendering
    const required = "mwd.v2.ui.layout-root";
    if (!Handlebars.partials?.[required]) {
      const keys = Object.keys(Handlebars.partials ?? {});
      console.error("Missing required partial:", required);
      console.error("Closest matches:", keys.filter(k => k.includes("layout-root")));
      throw new Error(`Template preload failed: ${required} not registered`);
    }


    // Optional compatibility: mirror into global Handlebars too (some legacy render paths read global)
    if (HB !== Handlebars) {
      for (const [k, v] of Object.entries(HB.partials ?? {})) {
        if (Handlebars.partials?.[k]) continue;
        try { Handlebars.registerPartial(k, v); } catch (_) {}
      }
    }

    console.log(`${LOG_HEAD}preloadTemplatesV2 OK`, { loaded: PARTIALS.length });
  } catch (e) {
    console.error(`${LOG_HEAD}preloadTemplatesV2 FAILED`, e);
    throw e;
  }
}
