// /mwd/src/modules/actor/mwd-actor.js
import { ensureCoreSkillRatings } from "../mwd/skills.js";
import { MONITOR_DEFS } from "../constants.js";
import { DERIVE_FNS, resolveDerivedSource } from "../mwd/derive-monitors.js";

export class MWDActor extends Actor {
  /** @override */
  prepareBaseData() {
    super.prepareBaseData();

    // Only character-like actors get skills scaffolding
    if (!this.isCharacterLike()) return;

    const system = this.system ?? {};
    ensureCoreSkillRatings(system);

    // Optional cleanup if any bad nesting already happened in-memory
    if (system.skills?.skills && typeof system.skills.skills === "object") {
      for (const [k, v] of Object.entries(system.skills.skills)) {
        system.skills[k] ??= v;
      }
      delete system.skills.skills;
    }
    
    // Re-assign cleaned system data
    if (this.type === "character") {
    const pools = this.system?.counters?.edgePools;
    if (pools) {
      for (const p of Object.values(pools)) {
        const rating = Math.max(0, Number(p?.rating ?? 0));
        const value = Number(p?.value ?? NaN);

        // If value is missing/NaN, initialize to rating
        if (!Number.isFinite(value)) p.value = rating;

        // If you want "start full" for legacy actors where value is 0:
        if (value === 0 && rating > 0) p.value = rating;

        // strip legacy
        if (p && "max" in p) delete p.max;
      }
    }
}

  }

  /** @override */
  prepareDerivedData() {
    super.prepareDerivedData();

    // Only characters have the six pools
    if (this.type !== "character") return;

    const cap = this.getEdgeCap?.() ?? Math.max(0, Number(this.system?.attributes?.edge?.value ?? 0));
    const pools = this.system?.counters?.edgePools;
    if (!pools || typeof pools !== "object") return;

    for (const p of Object.values(pools)) {
      if (!p) continue;

      // Stored rating is allowed to exceed cap, but "effective" is capped.
      // However: we DO want stored current/value clamped to min(rating, cap).
      const rating = Math.max(0, Number(p.rating ?? 0));
      const effMax = Math.min(rating, cap);

      let value = Number(p.value ?? NaN);
      if (!Number.isFinite(value)) value = effMax;

      value = Math.max(0, Math.min(value, effMax));

      p.rating = rating;
      p.value = value;

      // strip legacy just in case
      if ("max" in p) delete p.max;
    }
  }

  /* -------------------------------------------- */
  /* Capabilities                                  */
  /* -------------------------------------------- */

  isCharacterLike() {
    return this.type === "character" || this.type === "npc";
  }

  hasSkills() {
    // Vehicles/mechs do not have skills; characters do.
    // If NPCs should have skills (common), keep npc included.
    return this.type === "character" || this.type === "npc";
  }

  hasEdgePools() {
    // Only characters have the six pools.
    return this.type === "character" && !!this.system?.counters?.edgePools;
  }

  /* -------------------------------------------- */
  /* Edge API (cap + pools w/ rating + current)    */
  /* -------------------------------------------- */

  getEdgeCap() {
    return Math.max(0, Number(this.system?.attributes?.edge?.value ?? 0));
  }

  getEdgePoolRaw(poolKey) {
    return this.system?.counters?.edgePools?.[poolKey] ?? null;
  }

  /**
   * Canonical pool accessor.
   * - Character: real pool state (value/rating), clamped by cap for effective use/display.
   * - NPC: no pools; Edge attribute acts as a single “pool” (effective max/value = cap).
   * - Vehicle/Mech: no pools; returns safe zeros (pilot edge handled by resolvers).
   */
  getEdgePool(poolKey) {
    const cap = this.getEdgeCap();

    // NPC fallback: Edge attribute acts as pool (no per-pool tracking)
    if (this.type === "npc" && !this.hasEdgePools()) {
      const rating = cap;
      const value = cap;
      return {
        key: poolKey,
        value,
        rating,
        effectiveValue: value,
        effectiveMax: rating,
        cap,
        hasPools: false,
      };
    }

    // Non-characters (vehicles/mechs) or missing pools → safe zeros
    if (!this.hasEdgePools()) {
      return {
        key: poolKey,
        value: 0,
        rating: 0,
        effectiveValue: 0,
        effectiveMax: 0,
        cap,
        hasPools: false,
      };
    }

    const raw = this.getEdgePoolRaw(poolKey);
    const rating = Math.max(0, Number(raw?.rating ?? 0));
    const value = Math.max(0, Number(raw?.value ?? 0));

    const effectiveMax = Math.min(rating, cap);
    const effectiveValue = Math.min(value, effectiveMax);

    return {
      key: poolKey,
      value,
      rating,
      effectiveValue,
      effectiveMax,
      cap,
      hasPools: true,
    };
  }

  getEdgePoolValue(poolKey) {
    return this.getEdgePool(poolKey).effectiveValue;
  }

  getEdgePoolMax(poolKey) {
    return this.getEdgePool(poolKey).effectiveMax;
  }

  /**
   * Set the CURRENT value for a pool (admin/adjustment or spend).
   * - Characters only (six pools).
   * - Clamps to [0, effectiveMax] where effectiveMax = min(rating, edgeCap).
   * - Does not modify rating.
   */
  async setEdgePoolValue(poolKey, newValue) {
    if (!this.hasEdgePools()) return;

    const { effectiveMax } = this.getEdgePool(poolKey);
    const v = Number(newValue ?? 0);
    const clamped = Math.max(0, Math.min(v, effectiveMax));

    return this.update({
      [`system.counters.edgePools.${poolKey}.value`]: clamped,
    });
  }

  /**
   * Convenience: adjust CURRENT value by delta (e.g., spend -1, award +1).
   */
  async adjustEdgePoolValue(poolKey, delta) {
    if (!this.hasEdgePools()) return;

    const current = this.getEdgePool(poolKey).effectiveValue; // raw stored value
    const d = Number(delta ?? 0);
    return this.setEdgePoolValue(poolKey, current + d);
  }

  /**
   * Set the RATING (advancement ceiling) for a pool.
   * Stores true rating (not cap-clamped), then clamps current value to new effective max.
   */
  async setEdgePoolRating(poolKey, newRating) {
    if (!this.hasEdgePools()) return;

    const cap = this.getEdgeCap();
    const rating = Math.max(0, Number(newRating ?? 0));
    const effectiveMax = Math.min(rating, cap);

    const rawValue = Math.max(0, Number(this.getEdgePoolRaw(poolKey)?.value ?? 0));
    const value = Math.min(rawValue, effectiveMax);

    return this.update({
      [`system.counters.edgePools.${poolKey}.rating`]: rating,
      [`system.counters.edgePools.${poolKey}.value`]: value,
    });
  }

  getEdgePoolSummary({ groups } = {}) {
  const cap = this.getEdgeCap();

  // Characters: real pools exist
  if (this.hasEdgePools()) {
    // If groups are provided, return grouped + ordered.
    if (groups && typeof groups === "object") {
      const outGroups = Object.entries(groups).map(([groupId, poolKeys]) => {
        const pools = (poolKeys ?? []).map((poolKey) => {
          const p = this.getEdgePool(poolKey);
          return {
            ...p,
            isEmpty: p.effectiveValue <= 0,
            isCapped: p.rating > p.cap,
          };
        });

        return { id: groupId, pools };
      });

      return { cap, hasPools: true, groups: outGroups, pools: [] };
    }

    // Flat list (still ordered deterministically by object insertion order)
    const pools = Object.keys(this.system?.counters?.edgePools ?? {}).map((poolKey) => {
      const p = this.getEdgePool(poolKey);
      return {
        ...p,
        isEmpty: p.effectiveValue <= 0,
        isCapped: p.rating > p.cap,
      };
    });

    return { cap, hasPools: true, groups: [], pools };
  }

  // NPC: Edge attribute acts as pool (no per-pool tracking)
  // For now, return empty pools/groups; sheet can render “Edge” attribute normally.
  if (this.type === "npc") {
    return { cap, hasPools: false, groups: [], pools: [] };
  }

  // Vehicles/mechs/etc.: no edge; they use pilot edge in resolvers
  return { cap, hasPools: false, groups: [], pools: [] };
  }

  async setMonitorValue(monitorId, rawValue, { source = "unknown" } = {}) {
   const basePath = `system.monitors.${monitorId}`;

    const max = Number(foundry.utils.getProperty(this.system, `${basePath}.max`)) || 0;
    const clampedMax = Math.max(0, max);
    const nextValue = Math.min(Math.max(0, Number(rawValue) || 0), clampedMax);

    const update = { [`${basePath}.value`]: nextValue };

    // Derive based on actor type + monitor id
    const type = this.type; // "character" | "battlemech" | "vehicle" | ...
    const def = MONITOR_DEFS?.[type]?.[monitorId];

    if (def?.derived) {
      for (const [derivedKey, spec] of Object.entries(def.derived)) {
        const fn = DERIVE_FNS?.[spec.fn];
        if (typeof fn !== "function") continue;

        const src = resolveDerivedSource(this, monitorId, spec.source, nextValue);
        update[`${basePath}.derived.${derivedKey}`] = fn(src);
      }
    }

    return this.update(update);
  }
}
