import { LOG_HEAD, TEMPLATES_PATH } from "../constants.js";

/**
 * Explicit template preload to prevent "first render blank" partial resolution issues.
 * Loads one-by-one so a single missing template doesn't stop everything.
 */

function toAlias(p, base) {
  // base is TEMPLATES_PATH, e.g. "systems/mwd/templates"
  const rel = p.startsWith(base) ? p.slice(base.length + 1) : p;
  return `mwd.${rel}`.replace(/\.hbs$/, "").replace(/\//g, ".");
}

export async function preloadTemplatesV2() {
  const BASE = TEMPLATES_PATH;

  const paths = [
    // Common
    `${BASE}/common/checkbar.hbs`,
    `${BASE}/common/view-mode.hbs`,

    // Actor roots
    `${BASE}/v2/actor/_sheet-root.hbs`,
    `${BASE}/v2/actor/character-sheet.hbs`,
    `${BASE}/v2/actor/npc-sheet.hbs`,
    `${BASE}/v2/actor/battlemech-sheet.hbs`,
    `${BASE}/v2/actor/vehicle-sheet.hbs`,
 
    // Layout renderer
    `${BASE}/v2/ui/layout-root.hbs`,
    `${BASE}/v2/ui/nodes/stack.hbs`,
    `${BASE}/v2/ui/nodes/panel.hbs`,
    `${BASE}/v2/ui/nodes/include.hbs`,
    `${BASE}/v2/ui/nodes/tabs.hbs`,
    `${BASE}/v2/ui/nodes/unknown.hbs`,

    // V2 UI (Character)
    `${BASE}/v2/ui/character/attributes.hbs`,

    // Placeholders
    `${BASE}/v2/ui/placeholders/edge-console.hbs`,
    `${BASE}/v2/ui/placeholders/combat-actions.hbs`,
    `${BASE}/v2/ui/placeholders/condition-monitors.hbs`,
    `${BASE}/v2/ui/placeholders/status-dashboard.hbs`,
    `${BASE}/v2/ui/placeholders/assigned-systems.hbs`,

    // Actor parts (add more as needed)
    `${BASE}/actor/parts/attributes.hbs`,
    `${BASE}/actor/parts/attributebuttons.hbs`,
    `${BASE}/actor/parts/skills.hbs`,
    `${BASE}/actor/parts/qualities.hbs`,
    `${BASE}/actor/parts/life-modules.hbs`,
    `${BASE}/actor/parts/gears.hbs`,
    `${BASE}/actor/parts/contacts.hbs`,
    `${BASE}/actor/parts/owned-actors.hbs`,
    `${BASE}/actor/parts/ownership.hbs`,
    `${BASE}/actor/parts/description.hbs`,
    `${BASE}/actor/parts/gmnotes.hbs`,
    `${BASE}/actor/parts/weapons.hbs`,

    // Mech parts
    `${BASE}/actor/parts/mech-quick-actions.hbs`,
    `${BASE}/actor/parts/battlemech-loadout.hbs`,
    `${BASE}/actor/parts/battlemech-weapons.hbs`,
    `${BASE}/actor/parts/battlemech-weapon-groups.hbs`,
    `${BASE}/actor/parts/battlemech-hardpoints.hbs`,

    // Monitors
    `${BASE}/monitors/armor.hbs`,
    `${BASE}/monitors/physical.hbs`,
    `${BASE}/monitors/fatigue.hbs`,
    `${BASE}/monitors/structure.hbs`,
    `${BASE}/monitors/heat.hbs`
  ];

  const ok = [];
  const bad = [];

  for (const p of paths) {
    try {
      const alias = toAlias(p, BASE);
      await foundry.applications.handlebars.loadTemplates([p]);
      // Register deterministic alias for *every* preloaded template
      const tpl = Handlebars.partials[p] ?? (await getTemplate(p));
      Handlebars.registerPartial(alias, tpl);
      ok.push(p);
    } catch (e) {
      bad.push(p);
      console.error(`${LOG_HEAD}preloadTemplatesV2 FAILED`, p, e);
    }
  }

  console.log(`${LOG_HEAD}preloadTemplatesV2 complete`, {
    loaded: ok.length,
    failed: bad.length,
    failedPaths: bad
  });
}
