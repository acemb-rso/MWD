// src/modules/modifiers/providers/life-modules.js
// Purpose: Contributes active life module bonuses through the shared modifier pipeline.
// How it fits: Keeps life module roll effects inspectable and resolved at execution time.

import { collectLifeModuleSkillRollModifiers } from "../../mwd/life-modules.js";

export class LifeModuleModifiersProvider {
  id = "mwd.lifeModules";
  label = "Life Modules";

  collect({ actor, resolved } = {}) {
    return collectLifeModuleSkillRollModifiers({ actor, resolved });
  }
}
