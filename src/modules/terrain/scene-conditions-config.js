// src/modules/terrain/scene-conditions-config.js
// Purpose: Adds the MWD scene-condition picker to Scene Configuration's
// Environment tab.
// How it fits: Checkboxes named flags.mwd.sceneConditions.<id> are submitted
// with Foundry's own scene form, so the selection is stored on the scene with
// no extra save path. Meaning lives in scene-conditions.js.

import { SCENE_CONDITION_FLAG, SCENE_CONDITIONS } from "./scene-conditions.js";

const KIND_LABELS = Object.freeze({ light: "Light", weather: "Weather", ambient: "Ambient" });

export function buildSceneConditionsFieldset(scene = null) {
  const { escapeHTML } = foundry.utils;
  const stored = scene?.flags?.mwd?.[SCENE_CONDITION_FLAG] ?? {};
  const groups = Object.entries(KIND_LABELS).map(([kind, kindLabel]) => {
    const boxes = Object.values(SCENE_CONDITIONS)
      .filter(item => item.kind === kind)
      .map(item => `<label class="checkbox"><input type="checkbox" name="flags.mwd.${SCENE_CONDITION_FLAG}.${item.id}" ${stored[item.id] === true ? "checked" : ""}> ${escapeHTML(item.label)}</label>`)
      .join("");
    return `<div class="form-group"><label>${escapeHTML(kindLabel)}</label><div class="form-fields">${boxes}</div></div>`;
  }).join("");
  return `<fieldset class="mwd-scene-conditions"><legend>MWD Conditions</legend>${groups}
    <p class="hint">Mechanical only (independent of the weather animation). Weather is suppressed inside Suppress Weather Regions and under overhead surfaces; ambient conditions only inside Suppress Weather Regions; light conditions are never suppressed. A compound or more severe condition replaces the ones it includes.</p></fieldset>`;
}

export function registerSceneConditionsConfig() {
  Hooks.on("renderSceneConfig", (app, element) => {
    try {
      const root = element instanceof HTMLElement ? element : element?.[0];
      const tab = root?.querySelector?.('.tab[data-tab="environment"]');
      if (!tab || tab.querySelector(".mwd-scene-conditions")) return;
      tab.insertAdjacentHTML("beforeend", buildSceneConditionsFieldset(app.document));
    } catch (error) {
      console.warn("MWD | Could not add scene conditions to Scene Configuration", error);
    }
  });
}
