// src/modules/handlebars-manager.js
// Purpose: Registers Foundry hooks: init. Preloads or manages Handlebars templates.
// How it fits: Describes role within src/modules or template rendering pipeline.


// handlebars-manager.js
import { Damage } from "./damage.js";
import { Enums } from "./enums.js";
import { Grammar } from "./grammar.js";
import { Icons } from "./icons.js";
import { WeaponItem } from "./item/weapon-item.js";
import { Misc } from "./misc.js";
import { LOG_HEAD } from "./constants.js";

/** DND5E-style dataset helper */
function dataset(object) {
  const entries = [];
  for (let [key, value] of Object.entries(object ?? {})) {
    if (value === undefined) continue;
    key = key.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (a, b) => (b ? "-" : "") + a.toLowerCase());
    entries.push(`data-${key}="${Handlebars.escapeExpression(value)}"`);
  }
  return new Handlebars.SafeString(entries.join(" "));
}

function makeObject({ hash }) {
  return hash;
}

function getHB() {
  return foundry?.applications?.handlebars?.Handlebars ?? Handlebars;
}

export class HandlebarsManager {
  constructor() {
    // Link-1 hard guarantee: register immediately when constructed.
    // This avoids any dependency on hook timing for core helpers like {{#for}}.
    this.registerHelpers();

    // Keep the old behavior too, as a safety net if something reloads environments during init.
    Hooks.once("init", () => {
      this.registerHelpers();
      console.log(`${LOG_HEAD}Handlebars helpers registered (init)`);
    });

    console.log(`${LOG_HEAD}Handlebars helpers registered (ctor)`);
  }

  registerHelpers() {
    const HB = getHB();

    const helpers = {
      // Foundry utils
      getProperty: foundry.utils.getProperty,

      // DND5E-inspired utilities
      "mwd-dataset": dataset,
      "mwd-object": makeObject,

      // Simple comparisons
      eq: (a, b) => a === b,
      ne: (a, b) => a !== b,

      // Strings/arrays
      concat: (...args) => Misc.join(args.slice(0, -1)),
      join: (arr, sep = " ") => Array.isArray(arr) ? arr.join(sep) : "",
      includes: (list, value) => list?.includes(value),
      length: (context) => context?.length || 0,
      substring: (str, from, to) => str?.substring(from, to),
      toUpperCase: Grammar.toUpperCaseNoAccent,

      // Math
      modulo: (value, divisor) => value % divisor,
      divint: Misc.divint,
      divup: Misc.divup,
      sum: (v1, v2) => v1 + v2,
      diff: (v1, v2) => v1 - v2,
      times: (v1, v2) => v1 * v2,
      min: (v1, v2) => Math.min(v1, v2),
      max: (v1, v2) => Math.max(v1, v2),

      // Utility blocks
      for: HandlebarsManager.hbsForLoop, // fixes “Missing helper: for”
      range: (min, max) => Array.from({ length: (max - min + 1) }, (_, i) => min + i),
      ifGte: (value, threshold, options) =>
        (value >= threshold ? options.fn(this) : options.inverse(this)),

      // Damage / weapons (legacy-compatible)
      weaponDamageLetter: Damage.letter,
      weaponDamageCode: WeaponItem.damageCode,
      weaponDamageValue: WeaponItem.damageValue,
      weaponArmorMode: WeaponItem.armorMode,
      weaponRangeList: WeaponItem.getRangeList,

      // Icons
      iconFA: Icons.fontAwesome,
      iconSrc: Icons.iconSystemPath,
      iconPath: Icons.iconPath,
      iconD6: Icons.iconD6,

      // Enums
      localizeAttribute: Enums.localizeAttribute
    };

    // Register into Foundry HB env (AppV2 rendering)
    HB.registerHelper(helpers);

    // Mirror into global Handlebars too (defensive)
    if (HB !== Handlebars) Handlebars.registerHelper(helpers);
  }

  static hbsForLoop(start, end, options) {
    let accum = "";
    for (let i = start; i < end; ++i) accum += options.fn(i);
    return accum;
  }
}
