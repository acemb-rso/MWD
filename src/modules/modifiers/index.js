// src/modules/modifiers/index.js
// Purpose: Provides module-level utilities or helpers.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { ModifierProviderRegistry } from "./provider-registry.js";
export const modifierProviders = new ModifierProviderRegistry();
