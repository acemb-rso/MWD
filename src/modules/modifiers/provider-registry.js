// src/modules/modifiers/provider-registry.js
/**
 * @pipeline provider
 * @role The modifier-provider registry primitive. Holds the set of registered
 *   providers and, via collectAll(ctx), runs each provider's collect() against a
 *   RollContext and returns the merged, shape-validated modifier list. This is
 *   the composition point for the "providers" primitive of Design Principles §4.1.
 * @invariants
 *   - INVARIANT(boundary): the registry orchestrates collection only; every rule
 *     lives inside an individual provider's collect(). Adding a modifier source
 *     means registering a provider, never editing this file (§4.1, §7).
 *   - Providers must expose { id, collect() }; duplicate ids are ignored so
 *     registration is idempotent.
 *   - Fail-loud on bad output: a mod lacking a string label/source or numeric
 *     value is dropped with a warning, never coerced into the pool (§9, §14).
 * @upstream   anarchy-system.js (registers providers), collect-modifiers.js (calls collectAll)
 * @downstream modifiers/providers/* (each provider's collect())
 */

export class ModifierProviderRegistry {
  #providers = new Map();

  register(provider) {
    if (!provider?.id || typeof provider.collect !== "function") {
      throw new Error("Invalid ModifierProvider: missing id or collect()");
    }
    if (this.#providers.has(provider.id)) return;
    this.#providers.set(provider.id, provider);
  }

  async collectAll(ctx) {
    const out = [];
    for (const p of this.#providers.values()) {
      const mods = await p.collect(ctx);
      if (!mods?.length) continue;
      for (const m of mods) {
        const ok = m && typeof m.label === "string" && typeof m.value === "number" && typeof m.source === "string";
        if (!ok) console.warn("MWD | DROPPED MOD (bad shape)", p.id, m);
        else out.push(m);
      }
    }
    return out;
  }
}
