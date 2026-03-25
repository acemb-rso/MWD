// src/modules/modifiers/provider-registry.js
// Purpose: Provides module-level utilities or helpers.
// How it fits: Describes role within src/modules or template rendering pipeline.


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
      console.log("MWD | provider", p.id, "returned", mods);
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
