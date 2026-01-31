import { TEMPLATES_PATH, SYSTEM_NAME } from "../constants.js";
import { BaseActorSheetV2 } from "./base-actor-sheet-v2.js";
import { LayoutRegistry } from "../layout/layout-registry.js";
import { EDGE_POOL_GROUPS } from "../constants.js";


export class CharacterSheetV2 extends BaseActorSheetV2 {
  static PARTS = {
    sheet: {
      get template() {
        return `${TEMPLATES_PATH}/v2/actor/character-sheet.hbs`;
      },
    }

  };

  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ["character-sheet", SYSTEM_NAME, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
    window: { minWidth: 450, minHeight: 740, resizable: true},
    position: { width: 980, height: 900 },
    actions: foundry.utils.mergeObject(
      foundry.utils.deepClone(super.DEFAULT_OPTIONS.actions ?? {}),
        {
          // left-click sets pip value; right-click clears to 0
          edgeSet: {
            handler: CharacterSheetV2.prototype._onEdgeSet,
            buttons: [0, 2]
          }
        },
        { inplace: false }
      ),
  });

    /** @override */
  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    ctx._mwdThemeClass = game.system.anarchy.styles.selectCssClass();
    ctx.layout = await LayoutRegistry.get("character");

    // Character-only Edge console context
    const cap = this.actor.getEdgeCap?.() ?? Number(this.actor.system?.attributes?.edge?.value ?? 0);
    const editable = !!this.isEditable;

    const GROUP_LABELS = { physical: "Physical", mental: "Mental", social: "Social" };
        const POOL_LABELS = {
          grit: "Grit",
          chaos: "Chaos",
          insight: "Insight",
          rumor: "Rumor",
          legend: "Legend",
          credibility: "Credibility"
        };

    // Use actor helper to get grouped pools in canonical order
    const summary = this.actor.getEdgePoolSummary
      ? this.actor.getEdgePoolSummary({ groups: EDGE_POOL_GROUPS })
      : { cap, hasPools: false, groups: [], pools: [] };

    // Build a render-ready console model
   ctx.edgeConsole = {
      cap,
      editable,
      capPips: Array.from({ length: Math.max(0, cap) }, (_, i) => i + 1),
      groups: (summary.groups ?? []).map(g => ({
        id: g.id,
        label: GROUP_LABELS[g.id] ?? g.id,
        pools: (g.pools ?? []).map(p => {
          const value = Number(p.effectiveValue ?? 0);
          const max = Number(p.effectiveMax ?? 0);

          // Precompute pip buttons so HBS needs no math helpers and never calls range() with bad args
          const pips = Array.from({ length: Math.max(0, max) }, (_, i) => {
            const n = i + 1;
            return { n, filled: n <= value };
          });
          
          const shortKey = String(p.key ?? "").split(".").pop();

          return {
            key: p.key,
            label: POOL_LABELS[shortKey] ?? shortKey ?? p.key,
            value,
            max,
            rating: Number(p.rating ?? 0),
            isCapped: Number(p.rating ?? 0) > Number(p.cap ?? cap),
            pips,

            // Keep the roll payload if you want pool-name click to route through BaseActorSheetV2 roll handler
            roll: JSON.stringify({ intent: "edge", pool: p.key })
          };
        })
      }))
    };
    /* -------------------------------------------- */
    /* Condition Monitors (character)               */
    /* -------------------------------------------- */
    const sys = this.actor.system ?? {};
    const monitors = sys.monitors ?? {};

    const TRACKS = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue",  label: "Fatigue",  kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor",    label: "Armor",    kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ];

    const getNum = (obj, path, d = 0) => {
      const v = foundry.utils.getProperty(obj, path);
      const n = Number(v);
      return Number.isFinite(n) ? n : d;
    };

    ctx.conditionMonitors = TRACKS.map(t => {
      const m = monitors?.[t.id] ?? {};
      const max = Math.max(0, getNum(m, "max", 0));
      const value = Math.min(Math.max(0, getNum(m, "value", 0)), max);

      return {
        id: t.id,
        label: t.label,
        kind: t.kind,
        editable: !!this.isEditable,
        value,
        max,
        segments: Array.from({ length: max }, (_, i) => {
          const n = i + 1;
          return { value: n, filled: n <= value };
        }),
        status: t.status
          ? { label: t.status.label, value: getNum(m, t.status.path, 0) }
          : null
      };
    });

    return ctx;
  }

  async _onEdgeSet(event, target) {
    console.log("EDGESET FIRED", { event, target, ds: target?.dataset, tds: event?.target?.dataset });
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "contextmenu") next = 0;

    if (!this.isEditable) return;

    const el =
      target?.closest?.("[data-edge-pool][data-edge-value]") ??
      event?.target?.closest?.("[data-edge-pool][data-edge-value]");
    if (!el) return;

    const poolKey = String(el.dataset.edgePool ?? "").trim();
    const clicked = Number(el.dataset.edgeValue ?? NaN);
    if (!poolKey || !Number.isFinite(clicked)) return;

    // Canonical pool info (already cap/rating aware)
    const pool = this.actor.getEdgePool(poolKey);
    if (!pool.hasPools) return;

    let next = clicked;

    // UX helpers
    if (event.altKey) next = 0;
    if (event.shiftKey) next = pool.effectiveMax;
    if (event.button === 2) next = 0; // optional right-click clear

    console.log("Actor class:", this.actor.constructor.name);
console.log("Has setEdgePoolValue:", typeof this.actor.setEdgePoolValue);

const before = this.actor.system?.counters?.edgePools?.[poolKey]?.value;
console.log("Before value:", before);

const result = await this.actor.setEdgePoolValue(poolKey, next);
console.log("Update result:", result);

const after = this.actor.system?.counters?.edgePools?.[poolKey]?.value;
console.log("After value:", after);


    // Delegate ALL clamping + validation to the actor
    return this.actor.setEdgePoolValue(poolKey, next);
  }

}
