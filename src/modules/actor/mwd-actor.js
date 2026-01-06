// /mwd/src/modules/actor/mwd-actor.js
import { ensureCoreSkillRatings } from "../mwd/skills.js";

export class MWDActor extends Actor {
  /** @override */
  prepareBaseData() {
    super.prepareBaseData();

    if (this.type !== "character" && this.type !== "npc") return;

    // Ensure core skills exist at system.skills.<code>.rating
    const system = this.system ?? {};
    ensureCoreSkillRatings(system);

    // Optional cleanup if any bad nesting already happened in-memory
    if (system.skills?.skills && typeof system.skills.skills === "object") {
      // If we accidentally created system.skills.skills, merge it up and delete the nested key
      for (const [k, v] of Object.entries(system.skills.skills)) {
        system.skills[k] ??= v;
      }
      delete system.skills.skills;
    }
  }
}
