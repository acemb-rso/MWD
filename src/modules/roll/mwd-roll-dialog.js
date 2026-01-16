// systems/mwd/module/roll/mwd-roll-dialog.js
const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * Build display steps for a horizontal modifier stepper.
 * Pure presentation helper.
 */
function buildStepperSteps(current, min = -3, max = 3) {
  const steps = [];
  const base = `../img/dice`; 

  for (let v = min; v <= max; v++) {
    const abs = Math.abs(v);
    const icon = abs === 0 ? `${base}/BlankDice.webp` : `${base}/D6_${abs}.svg`;

    steps.push({
      value: v,
      abs,
      icon,
      active: v === current,
      neg: v < 0,
      pos: v > 0,
      zero: v === 0,
      title: v === 0 ? "0 (neutral)" : v < 0 ? `${v} penalty` : `+${v} bonus`
    });
  }
  return steps;
}

/**
 * Shape/type safety only. No roll math.
 */
function normalizeManualRows(rows) {
  const arr = Array.isArray(rows) ? rows : [];
  return arr.map((r) => ({
    id: r?.id ?? foundry.utils.randomID(),
    label: typeof r?.label === "string" ? r.label : "Manual",
    value: Number(r?.value ?? 0)
  }));
}

function readToggle(payload, key) {
  // Prefer nested payload.toggles, fall back to flat keys
  const t = payload?.toggles;
  if (t && typeof t === "object" && key in t) return Boolean(t[key]);
  return Boolean(payload?.[key]);
}

function writeToggles(payload, toggles) {
  payload.useEdge = Boolean(toggles.useEdge);
  payload.takeRisks = Boolean(toggles.takeRisks);
  payload.opponentRoll = Boolean(toggles.opponentRoll);

  payload.toggles = payload.toggles && typeof payload.toggles === "object" ? payload.toggles : {};
  payload.toggles.useEdge = Boolean(toggles.useEdge);
  payload.toggles.takeRisks = Boolean(toggles.takeRisks);
  payload.toggles.opponentRoll = Boolean(toggles.opponentRoll);
}

/**
 * TEMP fallback: read dice parts from resolved.breakdown if present.
 * Prefer passing explicit dice parts into prompt() (see MWDRollDialog.prompt).
 */
function diceFromResolvedBreakdown(resolved) {
  const breakdown = Array.isArray(resolved?.breakdown) ? resolved.breakdown : [];
  const get = (id) => Number(breakdown.find((r) => r?.id === id)?.value ?? 0);

  return {
    attribute: get("attribute"),
    skill: get("skill"),
    bonus: get("bonus")
  };
}

export class MWDRollDialog extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    id: "mwd-roll-dialog",
    classes: ["mwd", "mwd-roll-dialog"],
    window: { title: "Roll", resizable: false },
    position: { width: 520, height: "auto" },

    actions: {
      submit: MWDRollDialog.prototype._onSubmit,
      cancel: MWDRollDialog.prototype._onCancel,
      addManual: MWDRollDialog.prototype._onAddManual,
      removeManual: MWDRollDialog.prototype._onRemoveManual,
      setManualValue: MWDRollDialog.prototype._onSetManualValue,
      setManualStepper: MWDRollDialog.prototype._onSetManualStepper,
      toggleCheckbox: MWDRollDialog.prototype._onToggleCheckbox
    }
  });

  static PARTS = {
    body: { template: "systems/mwd/templates/v2/roll/mwd-roll-dialog.hbs" }
  };

  #resolvePrompt = null;

  /** @type {{ baseContext: any, state: any }} */
  _mwd = { baseContext: null, state: null };

  constructor({ actor, baseContext, initialState = null, options = {} }) {
    super(options);
    this.actor = actor;

    this._mwd.baseContext = baseContext ?? {};
    const payload = foundry.utils.deepClone(this._mwd.baseContext.payload ?? {});

    // Manual modifiers live on the payload (we only edit these).
    const manual = normalizeManualRows(payload.manualModifiers);

    this._mwd.state = foundry.utils.mergeObject(
      {
        payload,
        manual,
        toggles: {
          useEdge: readToggle(payload, "useEdge"),
          takeRisks: readToggle(payload, "takeRisks"),
          opponentRoll: readToggle(payload, "opponentRoll")
        }
      },
      initialState ?? {},
      { inplace: false, insertKeys: true, insertValues: true, overwrite: true }
    );
  }

  async wait() {
    return new Promise((resolve) => {
      this.#resolvePrompt = resolve;
      this.render(true);
    });
  }

  async close(options = {}) {
    // If the window is closed without pressing a button, treat as cancel.
    if (this.#resolvePrompt) {
      const resolve = this.#resolvePrompt;
      this.#resolvePrompt = null;
      resolve(null);
    }
    return super.close(options);
  }

  async _prepareContext(_options) {
    const bc = this._mwd.baseContext ?? {};
    const st = this._mwd.state ?? {};

    const dice = {
      attribute: Number(bc?.dice?.attribute ?? 0),
      skill: Number(bc?.dice?.skill ?? 0),
      bonus: Number(bc?.dice?.bonus ?? 0),
      modifiers: Number(bc?.dice?.modifiers ?? 0) // existing mods from providers
    };

    const manualTotal = Array.isArray(st.manual)
      ? st.manual.reduce((a, r) => a + Number(r?.value || 0), 0)
      : 0;

    // "All modifiers applied" as players think of it
    const modifiersTotal = dice.modifiers + manualTotal;
    const baseTotal = dice.attribute + dice.skill + dice.bonus;
    const totalPool = Math.max(0, baseTotal + modifiersTotal);

    return {
      header: {
        left: bc?.header?.left ?? "Roll",
        right: bc?.header?.right ?? (this.actor?.name ?? "")
      },

      dice,
      modifiers: Array.isArray(bc.modifiers) ? bc.modifiers : [],

      manual: (st.manual ?? []).map((r) => ({
        ...r,
        steps: buildStepperSteps(Number(r.value ?? 0), -3, 3)
      })),

      toggles: st.toggles,
      totalPool
    };
  }

  /* --------------------------- */
  /* Actions                     */
  /* --------------------------- */

  async _onCancel(event) {
    event?.preventDefault();
    if (this.#resolvePrompt) {
      const resolve = this.#resolvePrompt;
      this.#resolvePrompt = null;
      resolve(null);
    }
    return this.close();
  }

  async _onSubmit(event) {
    event?.preventDefault();

    const st = this._mwd.state;

    // Apply edited manual modifiers back onto the payload.
    st.payload.manualModifiers = (st.manual ?? [])
      .filter((r) => r && (r.label?.trim() || Number(r.value)))
      .map((r) => ({
        id: r.id,
        label: r.label?.trim() || "Manual",
        value: Number(r.value ?? 0)
      }));

    // Apply toggles back onto payload (flat + nested for compatibility).
    writeToggles(st.payload, st.toggles ?? {});

    if (this.#resolvePrompt) {
      const resolve = this.#resolvePrompt;
      this.#resolvePrompt = null;
      resolve({ payload: st.payload });
    }

    return this.close();
  }

  async _onAddManual(event) {
    event?.preventDefault();
    this._mwd.state.manual.push({
      id: foundry.utils.randomID(),
      label: "Manual",
      value: 0
    });
    return this.render(false);
  }

  async _onRemoveManual(event, target) {
    event?.preventDefault();
    const id = target?.dataset?.id;
    if (!id) return;

    this._mwd.state.manual = this._mwd.state.manual.filter((r) => r.id !== id);
    return this.render(false);
  }

  async _onSetManualValue(event, target) {
    event?.preventDefault();
    const id = target?.dataset?.id;
    const field = target?.dataset?.field; // "label" | "value"
    if (!id || !field) return;

    const row = this._mwd.state.manual.find((r) => r.id === id);
    if (!row) return;

    if (field === "label") row.label = String(target.value ?? "");
    if (field === "value") row.value = Number(target.value ?? 0);

    return this.render(false);
  }

  async _onSetManualStepper(event, target) {
    event?.preventDefault();
    const id = target?.dataset?.id;
    const value = Number(target?.dataset?.value);
    if (!id || Number.isNaN(value)) return;

    const row = this._mwd.state.manual.find((r) => r.id === id);
    if (!row) return;

    row.value = value;
    return this.render(false);
  }

  async _onToggleCheckbox(event, target) {
    event?.preventDefault();
    const key = target?.dataset?.key;
    if (!key) return;

    this._mwd.state.toggles[key] = Boolean(target.checked);
    return this.render(false);
  }

  /**
   * Open the roll dialog as a payload editor and return an updated payload.
   * Cancel returns null.
   *
   * IMPORTANT:
   *  - Prefer passing explicit dice parts via args.diceParts (attribute/skill/bonus).
   *  - This avoids scraping resolved.breakdown.
   */
  static async prompt({ actor, basePayload, resolved, diceParts = null, mods = [], modTotal = 0 } = {}) {
    const payload = foundry.utils.deepClone(basePayload ?? {});

    const header = {
      left: resolved?.title ?? "Roll",
      right: actor?.name ?? ""
    };

    // Prefer explicit diceParts; fallback to resolved.breakdown temporarily.
    const parts = diceParts ?? diceFromResolvedBreakdown(resolved);

    const dice = {
      attribute: Number(parts?.attribute ?? 0),
      skill: Number(parts?.skill ?? 0),
      bonus: Number(parts?.bonus ?? 0),
      modifiers: Number(modTotal ?? 0)
    };

    const modifiers = (Array.isArray(mods) ? mods : []).map((m) => ({
      label: m.label ?? "Modifier",
      source: m.source ?? "",
      value: Number(m.value ?? 0)
    }));

    // Ensure payload has the expected arrays (avoids dialog state drift).
    payload.manualModifiers = normalizeManualRows(payload.manualModifiers);

    const dlg = new MWDRollDialog({
      actor,
      baseContext: { header, dice, modifiers, payload }
    });

    const result = await dlg.wait();
    return result?.payload ?? null;
  }
}
