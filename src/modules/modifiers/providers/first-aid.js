// src/modules/modifiers/providers/first-aid.js
// Purpose: Adds First Aid roll-time modifiers through the shared modifier pipeline.

import { collectFirstAidModifiers } from "../../mwd/first-aid.js";

export class FirstAidModifiersProvider {
  id = "mwd.firstAidModifiers";
  label = "First Aid Modifiers";

  collect(ctx = {}) {
    return collectFirstAidModifiers(ctx);
  }
}
