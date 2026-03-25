// src/modules/modifiers/index.js
// Purpose: System module or client script for index. Integrates with the system's JavaScript modules.

import { ModifierProviderRegistry } from "./provider-registry.js";
export const modifierProviders = new ModifierProviderRegistry();
