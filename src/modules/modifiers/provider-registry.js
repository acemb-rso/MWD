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
        if (!m || typeof m.label !== "string" || typeof m.value !== "number" || typeof m.source !== "string") continue;
        out.push(m);
      }
    }
    return out;
  }
}
