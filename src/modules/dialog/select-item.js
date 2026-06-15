// src/modules/dialog/select-item.js
// Purpose: Preloads or manages Handlebars templates. References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { TEMPLATES_PATH } from "../core/constants.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class SelectItem extends HandlebarsApplicationMixin(ApplicationV2) {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      id: "select-item",
      classes: ["select-item", "anarchy-dialog"],
      position: { width: 360, height: "auto" },
      window: {
        resizable: true
      }
    }, { inplace: false });
  }

  static PARTS = {
    body: {
      template: `${TEMPLATES_PATH}/dialog/select-item.hbs`
    }
  };

  static async selectItem(title, items) {
    const options = {
      id: `select-item-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...SelectItem.DEFAULT_OPTIONS.classes],
      window: { title }
    };

    const app = new SelectItem({ items }, options);
    return app.wait();
  }

  constructor(context = {}, options = {}) {
    super(context, options);
    this.items = Array.isArray(context.items) ? context.items : [];
    this._selected = false;
    this._resolve = null;
  }

  async _prepareContext() {
    return { items: this.items };
  }

  _onRender(context, options) {
    super._onRender?.(context, options);
    $(this.element).find(".click-select-item").on("click", (event) => this.onSelectItem(event));
    $(this.element).find('[data-action="cancel"]').on("click", async () => {
      if (this._resolve) {
        const resolve = this._resolve;
        this._resolve = null;
        resolve(null);
      }
      await this.close();
    });
  }

  wait() {
    return new Promise(resolve => {
      this._resolve = resolve;
      this.render({ force: true });
    });
  }

  async onSelectItem(event) {
    const itemId = $(event.currentTarget).attr("data-item-id");
    const item = this.items.find(candidate => candidate.id === itemId) ?? null;
    this._selected = true;

    if (this._resolve) {
      const resolve = this._resolve;
      this._resolve = null;
      resolve(item);
    }

    await this.close();
  }

  async close(options) {
    if (!this._selected && this._resolve) {
      const resolve = this._resolve;
      this._resolve = null;
      resolve(null);
    }

    return super.close(options);
  }
}
