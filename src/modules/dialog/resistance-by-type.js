import { TEMPLATES_PATH } from "../constants.js";
import { ANARCHY } from "../config.js";
import { Enums } from "../enums.js";
import { AnarchyBaseActor } from "../actor/base-actor.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

const RESISTANCE_PRESETS = [
  { key: 'biological', label: 'ANARCHY.actor.monitors.resistancePresets.biological', values: { poison: 2, corrosive: 1 } },
  { key: 'armoredVehicle', label: 'ANARCHY.actor.monitors.resistancePresets.armoredVehicle', values: { kinetic: 1, explosive: 2 } },
  { key: 'energyShielded', label: 'ANARCHY.actor.monitors.resistancePresets.energyShielded', values: { energy: 2, plasma: 1 } },
];

export class ResistanceByTypeDialog extends HandlebarsApplicationMixin(ApplicationV2) {

  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      id: "resistance-by-type",
      classes: ["anarchy-dialog", "resistance-by-type"],
      position: { width: 480, height: "auto" },
      window: {
        resizable: true,
      }
    }, { inplace: false });
  }

  static PARTS = {
    body: {
      template: `${TEMPLATES_PATH}/dialog/resistance-by-type.hbs`
    }
  };

  static async show(actor, monitor) {
    const options = {
      id: `${ResistanceByTypeDialog.DEFAULT_OPTIONS.id}-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...ResistanceByTypeDialog.DEFAULT_OPTIONS.classes],
    };
    const app = new ResistanceByTypeDialog({ actor, monitor }, options);
    return app.render({ force: true });
  }

  constructor(context = {}, options = {}) {
    super(context, options);
    this.actor = context.actor;
    this.monitor = context.monitor;
    this.damageTypes = Enums.getDamageTypes();
  }

  async _prepareContext() {
    const monitorData = this.actor.system.monitors?.[this.monitor] ?? {};
    const resistance = AnarchyBaseActor.normalizeResistance(monitorData.resistance);
    const resistanceBonus = monitorData.resistanceBonus ?? 0;
    const resistanceBonusByType = monitorData.resistanceBonusByType ?? {};
    const rows = this.damageTypes.map(dt => {
      const typedValue = resistance.byType?.[dt.value];
      const source = typedValue !== undefined ? 'type' : 'default';
      const value = typedValue ?? resistance.default ?? 0;
      const typeBonus = resistanceBonusByType[dt.value] ?? 0;
      return {
        code: dt.value,
        labelkey: dt.labelkey,
        value: typedValue,
        source,
        sourceLabel: game.i18n.localize(ANARCHY.actor.monitors.resistanceSources?.[source] ?? source),
        bonusTotal: resistanceBonus + typeBonus,
        total: value + resistanceBonus + typeBonus,
      };
    });

    return {
      actor: this.actor,
      monitor: this.monitor,
      monitorLabel: game.i18n.localize(ANARCHY.actor.monitors[this.monitor] ?? this.monitor),
      resistance,
      resistanceBonus,
      resistanceBonusByType,
      damageTypes: this.damageTypes,
      rows,
      presets: RESISTANCE_PRESETS,
    };
  }

  async activateListeners(html) {
    const element = html instanceof HTMLElement ? html : html[0];
    await super.activateListeners(element);
    const jqHtml = $(element);

    jqHtml.find('form').on('submit', async event => await this._onSubmit(event));
    jqHtml.find('[data-action="cancel"]').on('click', async () => await this.close());
    jqHtml.find('.click-apply-preset').click(event => this._applyPreset(event));
  }

  _applyPreset(event) {
    const presetKey = $(event.currentTarget).attr('data-preset');
    const preset = RESISTANCE_PRESETS.find(it => it.key === presetKey);
    if (!preset) {
      return;
    }
    const form = event.delegateTarget ?? event.currentTarget.closest('form');
    if (!form) {
      return;
    }
    this.damageTypes.forEach(dt => {
      const value = preset.values[dt.value];
      const input = form.querySelector(`input[name="byType.${dt.value}"]`);
      if (input) {
        input.value = value ?? '';
      }
    });
  }

  async _onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const resistanceDefault = Number(formData.get('resistance.default') ?? 0) || 0;
    const byType = {};
    this.damageTypes.forEach(dt => {
      const raw = formData.get(`byType.${dt.value}`);
      if (raw !== null && raw !== '') {
        const numeric = Number(raw);
        if (!Number.isNaN(numeric)) {
          byType[dt.value] = numeric;
        }
      }
    });

    await this.actor.update({
      [`system.monitors.${this.monitor}.resistance.default`]: resistanceDefault,
      [`system.monitors.${this.monitor}.resistance.byType`]: byType,
    });
    await this.close();
  }
}
