// src/modules/roll/mwd-roll-dialog.js
// Purpose: Preloads or manages Handlebars templates.
// How it fits: Describes role within src/modules or template rendering pipeline.


// systems/mwd/module/roll/mwd-roll-dialog.js
import {
  getOwnedSkillSpecializations,
  getSkillSpecializationLabel,
} from "../mwd/skills.js";
import { getPersonalRangeBandName } from "../mwd/personal-range-bands.js";
import {
  getIndirectAttackPenalty,
  isMachineActor,
  normalizeTargetMotion,
  TARGET_MOTION_LABELS,
} from "../mwd/machine-attack-motion.js";
import { normalizeMachineMotionPayload } from "../mwd/machine-attack-motion.js";
import { getTargetCombatant } from "../mwd/machine-ew-state.js";
const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

const ATTACK_OPTION_MODIFIERS = Object.freeze([
  Object.freeze({ id: "attackOption.lightObscuring", label: "Light obscuring terrain", value: -1 }),
  Object.freeze({ id: "attackOption.heavyObscuring", label: "Heavy obscuring terrain", value: -2 }),
  Object.freeze({ id: "attackOption.multipleObscurants", label: "Multiple/intervening obscurants", value: -3 }),
  Object.freeze({ id: "attackOption.sensorHaze", label: "Smoke / ECM / sensor haze", value: -1 }),
  Object.freeze({ id: "attackOption.advantageousPosition", label: "Advantageous Position", value: 1 }),
]);

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

function normalizeAttackOptions(payload = {}) {
  return payload.attackOptions && typeof payload.attackOptions === "object"
    ? payload.attackOptions
    : {};
}

function writeAttackOptions(payload = {}, next = {}) {
  payload.attackOptions = {
    ...normalizeAttackOptions(payload),
    ...next,
  };
}

function writeMachineMotion(payload = {}, next = {}) {
  payload.machineMotion = {
    ...(payload.machineMotion && typeof payload.machineMotion === "object" ? payload.machineMotion : {}),
    ...next,
  };
}

function hasMachineMotionValue(payload = {}, key = "") {
  const motion = payload.machineMotion && typeof payload.machineMotion === "object"
    ? payload.machineMotion
    : {};
  return Object.prototype.hasOwnProperty.call(motion, key);
}

function seedMachineMotionPayloadFromResolved(payload = {}, resolved = null) {
  // Prefer explicit resolved machineMotion, but fall back to deriving
  // the known motion from the target combatant when missing.
  const explicit = resolved?.attack?.machineMotion;
  const tokenId = resolved?.attack?.targets?.[0]?.tokenId ?? null;

  let declaration = null;
  if (explicit && typeof explicit === "object") {
    declaration = {
      targetMotion: normalizeTargetMotion(explicit.targetMotion),
      jumped: Boolean(explicit.jumped),
    };
  } else {
    const targetCombatant = getTargetCombatant(tokenId);
    declaration = normalizeMachineMotionPayload(payload, { targetCombatant });
  }

  if (!declaration || typeof declaration !== "object") return payload;

  const next = {};
  if (!hasMachineMotionValue(payload, "targetMotion")) {
    next.targetMotion = normalizeTargetMotion(declaration.targetMotion);
  }
  if (!hasMachineMotionValue(payload, "jumped")) {
    next.jumped = Boolean(declaration.jumped);
  }
  if (Object.keys(next).length) writeMachineMotion(payload, next);
  return payload;
}

function hasManualRow(rows = [], id = "") {
  return rows.some(row => row?.id === id);
}

function addOrUpdateManualRow(rows = [], row = {}) {
  const id = String(row?.id ?? "").trim();
  if (!id) return rows;
  const index = rows.findIndex(entry => entry?.id === id);
  const nextRow = {
    id,
    label: String(row?.label ?? "Manual").trim() || "Manual",
    value: Number(row?.value ?? 0),
  };
  if (index >= 0) {
    rows[index] = nextRow;
  } else {
    rows.push(nextRow);
  }
  return rows;
}

function removeManualRow(rows = [], id = "") {
  return rows.filter(row => row?.id !== id);
}

function buildAttackOptionControls({ manual = [], attack = null, payload = {} } = {}) {
  if (!attack) return null;

  const attackOptions = normalizeAttackOptions(payload);
  const indirectValue = getIndirectAttackPenalty(attack.rangeBand);
  const indirectActive = Boolean(attackOptions.indirectAttack) || hasManualRow(manual, "attackOption.indirectAttack");
  if (indirectActive) {
    addOrUpdateManualRow(manual, {
      id: "attackOption.indirectAttack",
      label: "Indirect Attack",
      value: indirectValue,
    });
    writeAttackOptions(payload, { indirectAttack: true });
  }
  const options = [
    ...ATTACK_OPTION_MODIFIERS,
    { id: "attackOption.indirectAttack", label: "Indirect Attack", value: indirectValue, flag: "indirectAttack" },
  ].map(option => ({
    ...option,
    valueLabel: option.value >= 0 ? `+${option.value}` : String(option.value),
    active: option.id === "attackOption.indirectAttack"
      ? indirectActive
      : hasManualRow(manual, option.id),
  }));

  const motion = payload.machineMotion && typeof payload.machineMotion === "object" ? payload.machineMotion : {};
  const selectedMotion = normalizeTargetMotion(motion.targetMotion);
  return {
    motionChoices: Object.entries(TARGET_MOTION_LABELS).map(([key, label]) => ({
      key,
      label,
      selected: key === selectedMotion,
    })),
    jumped: Boolean(motion.jumped),
    options,
    losBlocked: Boolean(attackOptions.losBlocked),
  };
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

function writeSpecializationPayload(payload, skillCode, specializationKey) {
  const normalizedKey = String(specializationKey ?? "").trim();
  const label = normalizedKey ? getSkillSpecializationLabel(skillCode, normalizedKey) : "";

  if (normalizedKey && label) {
    payload.specializationKey = normalizedKey;
    payload.specializationLabel = label;
    return;
  }

  delete payload.specializationKey;
  delete payload.specializationLabel;
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
    bonus: get("bonus"),
    specialization: get("specialization")
  };
}


export class MWDRollDialog extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(
    super.DEFAULT_OPTIONS,
    {
      id: "mwd-roll-dialog",
      classes: [
        ...(super.DEFAULT_OPTIONS.classes ?? []),
        "mwd",
        "mwd-roll-dialog"
      ],
      window: { title: "Roll", resizable: false },
      position: { width: 520, height: "auto" },

      actions: {
        submit: MWDRollDialog.prototype._onSubmit,
        cancel: MWDRollDialog.prototype._onCancel,
        addManual: MWDRollDialog.prototype._onAddManual,
        removeManual: MWDRollDialog.prototype._onRemoveManual,
        setManualValue: MWDRollDialog.prototype._onSetManualValue,
        setManualStepper: MWDRollDialog.prototype._onSetManualStepper,
        setEdgePrePool: MWDRollDialog.prototype._onSetEdgePrePool,
        toggleCheckbox: MWDRollDialog.prototype._onToggleCheckbox,
        setMachineTargetMotion: MWDRollDialog.prototype._onSetMachineTargetMotion,
        toggleMachineTargetJumped: MWDRollDialog.prototype._onToggleMachineTargetJumped,
        toggleAttackOption: MWDRollDialog.prototype._onToggleAttackOption,
        toggleAttackFlag: MWDRollDialog.prototype._onToggleAttackFlag,
        setDn: MWDRollDialog.prototype._onSetDn,
        setPayload: MWDRollDialog.prototype._onSetPayload,
        setSpecialization: MWDRollDialog.prototype._onSetSpecialization
      }
    },
    { inplace: false }
  );

  static PARTS = {
    body: { template: "systems/mwd/templates/v2/roll/mwd-roll-dialog.hbs" }
  };

  #resolvePrompt = null;

  /** @type {{ baseContext: any, state: any }} */
  _mwd = { baseContext: null, state: null };

  constructor({ actor, rollActor = null, baseContext, initialState = null, options = {} }) {
    super(options);
    this.actor = actor;
    this.rollActor = rollActor ?? actor;

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
    const preKey = String(payload?.edge?.pre?.poolKey ?? "").trim() || null;

    this._mwd.state.edge = {
      prePoolKey: preKey
    };
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

  /* --------------------------- */
  /* Prepare Context             */
  /* --------------------------- */

  async _prepareContext(_options) {
    const bc = this._mwd.baseContext ?? {};
    const st = this._mwd.state ?? {};
    const dn =
      Number.isFinite(Number(st?.payload?.dn)) ? Number(st.payload.dn) :
      Number.isFinite(Number(bc?.resolved?.dn?.total)) ? Number(bc.resolved.dn.total) :
      Number.isFinite(Number(bc?.dn)) ? Number(bc.dn) :
      Number.isFinite(Number(bc?.resolved?.difficulty?.dn)) ? Number(bc.resolved.difficulty.dn) :
      1;

    const intent = bc?.intent ?? "skill";

    let dice;
    let totalPool;

    const manualTotal = Array.isArray(st.manual)
      ? st.manual.reduce((a, r) => a + Number(r?.value || 0), 0)
      : 0;

    if (intent === "edge") {
      // Edge rolls do NOT use attribute/skill/bonus
      const resolved = bc?.resolved ?? {};
      const breakdown = Array.isArray(resolved.breakdown) ? resolved.breakdown : [];
      const get = (id) => Number(breakdown.find(r => r.id === id)?.value ?? 0);

      const pool = Number(resolved?.pool?.attribute ?? 0);

      dice = {
        pool,
        rating: get("rating"),
        cap: get("cap"),
        modifiers: Number(bc?.dice?.modifiers ?? 0)
      };

      totalPool = Math.max(0, pool + dice.modifiers + manualTotal);
    } else {
      // Skill roll (existing behavior)
      dice = {
        attribute: Number(bc?.dice?.attribute ?? 0),
        attributeLabel: String(bc?.dice?.attributeLabel ?? "Attribute").trim() || "Attribute",
        skill: Number(bc?.dice?.skill ?? 0),
        skillLabel: String(bc?.dice?.skillLabel ?? "Skill").trim() || "Skill",
        bonus: Number(bc?.dice?.bonus ?? 0),
        bonusLabel: String(bc?.dice?.bonusLabel ?? "Bonus").trim() || "Bonus",
        specialization: Number(bc?.dice?.specialization ?? 0),
        specializationLabel: String(bc?.dice?.specializationLabel ?? "Specialization").trim() || "Specialization",
        modifiers: Number(bc?.dice?.modifiers ?? 0)
      };

      const modifiersTotal = dice.modifiers + manualTotal;
      const baseTotal = dice.attribute + dice.skill + dice.bonus + dice.specialization;
      totalPool = Math.max(0, baseTotal + modifiersTotal);
    }

    const domains = Array.isArray(bc?.resolved?.domains) ? bc.resolved.domains : [];
    const edgeDomain =
      domains.includes("physical") ? "physical" :
      domains.includes("mental") ? "mental" :
      domains.includes("social") ? "social" : null;

    const pair =
      edgeDomain === "physical" ? ["grit","chaos"] :
      edgeDomain === "mental" ? ["insight","rumor"] :
      edgeDomain === "social" ? ["legend","credibility"] : [];

    const edgeChoices = pair.map(k => ({
      key: k,
      label: k.charAt(0).toUpperCase() + k.slice(1),
      available: Number(this.rollActor?.getEdgePool?.(k)?.effectiveValue ?? 0),
      selected: k === (st.edge?.prePoolKey ?? null)
    }));

    const selected = edgeChoices.find(c => c.selected);
    const selectedLabel = selected?.label ?? null;
    const attack = bc?.resolved?.attack ?? null;
    const specializationSkillCode = String(
      attack?.skill?.code
      ?? bc?.resolved?.specialization?.skillKey
      ?? bc?.resolved?.data?.skillKey
      ?? bc?.payload?.key
      ?? ""
    ).trim();
    const specializationOptions = specializationSkillCode
      ? getOwnedSkillSpecializations(this.rollActor?.system ?? {}, specializationSkillCode)
      : [];
    const selectedSpecializationKey = String(st?.payload?.specializationKey ?? "").trim();
    const selectedSpecialization = specializationOptions.find(option => option.key === selectedSpecializationKey) ?? null;
    if (intent !== "edge") {
      dice.specialization = selectedSpecialization
        ? Number(bc?.resolved?.specialization?.value ?? 2)
        : 0;
      const modifiersTotal = dice.modifiers + manualTotal;
      const baseTotal = dice.attribute + dice.skill + dice.bonus + dice.specialization;
      totalPool = Math.max(0, baseTotal + modifiersTotal);
    }
    const payloads = Array.isArray(attack?.payloadState?.payloads)
      ? attack.payloadState.payloads
      : [];
    const usesPayloads = String(attack?.weapon?.category ?? "").trim().toLowerCase() !== "melee" && payloads.length > 0;
    const selectedPayloadId = String(st?.payload?.payloadId ?? attack?.payloadState?.activePayloadId ?? "").trim();
    const selectedPayload = payloads.find(type => type.id === selectedPayloadId) ?? null;
    const machineActor = bc?.machineActor ?? this.actor;
    const machineAttackOptions = intent === "attack" && attack && isMachineActor(machineActor)
      ? buildAttackOptionControls({ manual: st.manual ?? [], attack, payload: st.payload ?? {} })
      : null;


    return {
      header: {
        left: bc?.header?.left ?? "Roll",
        right: bc?.header?.right ?? (this.actor?.name ?? "")
      },
      formula: String(bc?.formula ?? bc?.resolved?.formula ?? "").trim(),

      dice,
      modifiers: Array.isArray(bc.modifiers) ? bc.modifiers : [],

      manual: (st.manual ?? []).map((r) => ({
        ...r,
        steps: buildStepperSteps(Number(r.value ?? 0), Math.min(-4, Number(r.value ?? 0), -3), 3)
      })),
      
      edge: {
        domain: edgeDomain,
        choices: edgeChoices,
        selectedLabel
      },

      toggles: intent === "edge"
        ? { useEdge: false, takeRisks: false, opponentRoll: false }
        : st.toggles,
      totalPool,
      intent,
      dn,
      specialization: specializationOptions.length ? {
        skillCode: specializationSkillCode,
        options: specializationOptions.map(option => ({
          key: option.key,
          label: option.label,
          selected: option.key === selectedSpecializationKey
        })),
        selectedKey: selectedSpecializationKey,
        selectedLabel: selectedSpecialization?.label ?? "",
      } : null,
      attack: attack ? {
        weaponName: attack?.weapon?.name ?? "Weapon",
        rangeBand: (attack?.weapon?.type === "personalWeapon" || attack?.weapon?.isSynthetic)
          ? getPersonalRangeBandName(attack?.rangeBand ?? "")
          : (attack?.rangeBand ?? ""),
        damageType: selectedPayload?.modifies?.damageType || attack?.weapon?.damageTypeLabel || attack?.weapon?.damageType || "",
        usesPayloads,
        source: attack?.sourceState ?? null,
        payloads: payloads.map(type => ({
          id: type.id,
          name: type.label,
          damageType: type.modifies?.damageType,
          selected: type.id === selectedPayloadId,
        })),
        selectedPayloadId,
        selectedPayloadLabel: selectedPayload?.label ?? attack?.payload?.label ?? attack?.weapon?.payloadLabel ?? "",
        selectedSourceLabel: attack?.sourceState?.label ?? "",
      } : null,
      machineAttackOptions,
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
    writeSpecializationPayload(
      st.payload,
      st.payload?.intent === "attack"
        ? st.payload?.skillKey ?? this._mwd.baseContext?.resolved?.attack?.skill?.code
        : st.payload?.key ?? this._mwd.baseContext?.resolved?.data?.skillKey,
      st.payload?.specializationKey
    );

    if (this.#resolvePrompt) {
      const resolve = this.#resolvePrompt;
      this.#resolvePrompt = null;
      resolve({ payload: st.payload });
    }

    st.payload.edge = st.payload.edge && typeof st.payload.edge === "object" ? st.payload.edge : {};
    st.payload.edge.pre = st.payload.edge.pre && typeof st.payload.edge.pre === "object" ? st.payload.edge.pre : {};

    if (st.toggles?.useEdge) {
      const preKey = String(st.edge?.prePoolKey ?? "").trim() || null;
      st.payload.edge.pre.poolKey = preKey;
      st.payload.edge.pre.spent = preKey ? 1 : 0; // only spend if key selected
    } else {
      st.payload.edge.pre.poolKey = null;
      st.payload.edge.pre.spent = 0;
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

  async _onSetEdgePrePool(event, target) {
  event?.preventDefault();
  const key = String(target?.dataset?.poolKey ?? "").trim();
  if (!key) return;

  this._mwd.state.edge = this._mwd.state.edge ?? {};
  this._mwd.state.edge.prePoolKey = key;

  // If user is choosing a pool, we can reasonably assume they intend to pre-spend
  this._mwd.state.toggles.useEdge = true;

  return this.render(false);
  }


  async _onToggleCheckbox(event, target) {
    event?.preventDefault();
    const key = target?.dataset?.key;
    if (!key) return;

    this._mwd.state.toggles[key] = Boolean(target.checked);
    return this.render(false);
  }

  async _onSetMachineTargetMotion(event, target) {
    event?.preventDefault();
    const motion = normalizeTargetMotion(target?.dataset?.motion);
    writeMachineMotion(this._mwd.state.payload, { targetMotion: motion });
    return this.render(false);
  }

  async _onToggleMachineTargetJumped(event, target) {
    event?.preventDefault();
    writeMachineMotion(this._mwd.state.payload, { jumped: Boolean(target?.checked) });
    return this.render(false);
  }

  async _onToggleAttackOption(event, target) {
    event?.preventDefault();
    const id = String(target?.dataset?.optionId ?? "").trim();
    if (!id) return;

    const manual = this._mwd.state.manual ?? [];
    const active = hasManualRow(manual, id);
    this._mwd.state.manual = active
      ? removeManualRow(manual, id)
      : addOrUpdateManualRow(manual, {
        id,
        label: target?.dataset?.label ?? "Attack Option",
        value: Number(target?.dataset?.value ?? 0),
      });

    const flag = String(target?.dataset?.flag ?? "").trim();
    if (flag) writeAttackOptions(this._mwd.state.payload, { [flag]: !active });
    return this.render(false);
  }

  async _onToggleAttackFlag(event, target) {
    event?.preventDefault();
    const flag = String(target?.dataset?.flag ?? "").trim();
    if (!flag) return;
    writeAttackOptions(this._mwd.state.payload, { [flag]: Boolean(target?.checked) });
    return this.render(false);
  }

  async _onSetDn(event, target) {
    event?.preventDefault();

    // Accept empty as "unset" (will fall back to defaulting rules next open)
    const raw = String(target?.value ?? "").trim();
    const n = raw === "" ? null : Number(raw);

    this._mwd.state.payload.dn = Number.isFinite(n) ? Math.max(0, Math.trunc(n)) : null;
    return this.render(false);
  }

  async _onSetPayload(event, target) {
    event?.preventDefault();
    this._mwd.state.payload.payloadId = String(target?.value ?? "").trim();
    return this.render(false);
  }

  async _onSetSpecialization(event, target) {
    event?.preventDefault();

    const skillCode = String(target?.dataset?.skillCode ?? "").trim();
    const specializationKey = String(target?.value ?? "").trim();
    if (!skillCode) return;

    writeSpecializationPayload(this._mwd.state.payload, skillCode, specializationKey);
    return this.render(false);
  }

  _onRender(context, options) {
    super._onRender?.(context, options);

    const root = (this.element instanceof HTMLElement) ? this.element : this.element?.[0];
    if (!root) return;

    root.querySelectorAll("[data-action='setPayload']").forEach(select => {
      select.addEventListener("change", event => {
        void this._onSetPayload(event, event.currentTarget);
      });
    });

    root.querySelectorAll("[data-action='setSpecialization']").forEach(select => {
      select.addEventListener("change", event => {
        void this._onSetSpecialization(event, event.currentTarget);
      });
    });

    root.querySelectorAll("[data-action='setDn']").forEach(input => {
      input.addEventListener("change", event => {
        void this._onSetDn(event, event.currentTarget);
      });
    });

    root.querySelectorAll("[data-action='toggleMachineTargetJumped']").forEach(input => {
      input.addEventListener("change", event => {
        void this._onToggleMachineTargetJumped(event, event.currentTarget);
      });
    });

    root.querySelectorAll("[data-action='toggleAttackFlag']").forEach(input => {
      input.addEventListener("change", event => {
        void this._onToggleAttackFlag(event, event.currentTarget);
      });
    });
  }

  /**
   * Open the roll dialog as a payload editor and return an updated payload.
   * Cancel returns null.
   *
   * IMPORTANT:
   *  - Prefer passing explicit dice parts via args.diceParts (attribute/skill/bonus).
   *  - This avoids scraping resolved.breakdown.
   */
  static async prompt({ actor, rollActor = null, basePayload, resolved, diceParts = null, mods = [], modTotal = 0 } = {}) {
    const payload = foundry.utils.deepClone(basePayload ?? {});
    seedMachineMotionPayloadFromResolved(payload, resolved);

    // ------------------------------
    // Default DN (hits needed) from GM Gadget for SIMPLE tests
    // ------------------------------
    //
    // Rules:
    // - Only apply to simple rolls
    // - Only if payload.dn is not already set
    // - Uses the GM Gadget "next DN" setting
    //
    try {
      const rollType = resolved?.rollType ?? "simple"; // until everything sets rollType explicitly
      const intent = String(payload?.intent ?? resolved?.intent ?? "").trim().toLowerCase();
      if (rollType === "simple" && intent !== "attack" && payload?.dn == null) {
        const gmDn = Number(game.settings.get(game.system.id, "gmNextDn"));
        if (Number.isFinite(gmDn)) payload.dn = Math.max(0, Math.trunc(gmDn));
      }
    } catch (err) {
      console.warn("MWD: failed to default DN from GM Gadget", err);
    }

    const header = {
      left: resolved?.title ?? "Roll",
      right: actor?.name ?? ""
    };

    // Prefer explicit diceParts; fallback to resolved.breakdown temporarily.
    const parts = diceParts ?? diceFromResolvedBreakdown(resolved);

    const dice = {
      attribute: Number(parts?.attribute ?? 0),
      attributeLabel: resolved?.breakdown?.find?.(row => row?.id === "attribute")?.label ?? "Attribute",
      skill: Number(parts?.skill ?? 0),
      skillLabel: resolved?.breakdown?.find?.(row => row?.id === "skill")?.label ?? "Skill",
      bonus: Number(parts?.bonus ?? 0),
      bonusLabel: resolved?.breakdown?.find?.(row => row?.id === "bonus")?.label ?? "Bonus",
      specialization: Number(parts?.specialization ?? 0),
      specializationLabel: resolved?.breakdown?.find?.(row => row?.id === "specialization")?.label ?? "Specialization",
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
      rollActor,
      baseContext: {
        intent: resolved?.intent ?? "skill",
        header,
        formula: String(resolved?.formula ?? "").trim(),
        dice,
        modifiers,
        payload,
        resolved, // keep full resolved for edge display
        rollActor,
        machineActor: actor,
        dn: Number(payload?.dn ?? resolved?.dn?.total ?? resolved?.difficulty?.dn ?? 1)
      }
    });
    const result = await dlg.wait();
    return result?.payload ?? null;
  }
}
