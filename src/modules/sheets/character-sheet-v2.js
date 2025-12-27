import { TEMPLATES_PATH, SYSTEM_NAME } from "../constants.js";
import { BaseActorSheetV2 } from "./base-actor-sheet-v2.js";
import { LayoutRegistry } from "../layout/layout-registry.js";

export class CharacterSheetV2 extends BaseActorSheetV2 {
  static PARTS = {
    sheet: {
      get template() {
        return `${TEMPLATES_PATH}/v2/actor/character-sheet.hbs`;
      },
      scrollable: [".sheet-body"]
    }
  };

  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ["character-sheet", SYSTEM_NAME, "actor-sheet-v2"]
  });

  /** @override */
  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    ctx.layout = await LayoutRegistry.get("character");
    return ctx;
  }
}
