// src/modules/modifiers/providers/item-modifiers.js
// Purpose: Emits legacy item-flag roll modifiers.
// Workflow: modifier collection -> owned item flags.mwd.modifiers rows are
// normalized -> valid numeric rows join the generic modifier pipeline.


// modules/modifiers/providers/item-modifier.js

const KNOWN_DOMAINS = new Set(["physical", "mental", "social"]); // extend later (mech/vehicle)

/** Convert common “form-ish” values into a safe finite number or null. */
function coerceNumber(value) {
  if (value === null || value === undefined) return 0;
  if (value === "" || value === "—" || value === "–") return 0;

  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function normalizeDomain(domain) {
  if (!domain) return undefined;
  const d = String(domain).trim().toLowerCase();
  return KNOWN_DOMAINS.has(d) ? d : undefined;
}

function uniqueActors(...actors) {
  const seen = new Set();
  return actors.filter(actor => {
    if (!actor) return false;
    const key = actor.uuid ?? actor.id ?? actor;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export class ItemModifiersProvider {
  id = "mwd.itemModifiers";
  label = "Item Modifiers";

  collect(ctx) {
    const mods = [];

    for (const actor of uniqueActors(ctx?.actor, ctx?.rollActor)) {
      for (const item of actor.items ?? []) {
        // If you want to constrain to trait items only, keep this on:
        // if (item.type !== "trait") continue;

        const declared = item.flags?.mwd?.modifiers;
        if (!Array.isArray(declared) || declared.length === 0) continue;

        for (const d of declared) {
          if (!d) continue;

          const n = coerceNumber(d.value);
          if (n === null) {
            console.warn("MWD | Dropping item modifier with invalid value", {
              actor: actor.name,
              item: item.name,
              modifier: d
            });
            continue;
          }

          mods.push({
            label: d.label ?? item.name,
            value: n,
            source: item.name,
            domain: normalizeDomain(d.domain),
          });
        }
      }
    }

    return mods;
  }
}
