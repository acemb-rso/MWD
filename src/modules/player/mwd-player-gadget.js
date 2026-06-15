// src/modules/player/mwd-player-gadget.js
// Purpose: AppV2 compact combat command surface for non-GM players.
// How it fits: Emits player-facing combat, attack, status, and roll intents through existing services.

import { SYSTEM_NAME } from "../core/constants.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import { openTokenStatusDialog } from "../dialog/token-status-dialog.js";
import { getWeaponAttackGateReason } from "../mwd/personal-critical-gates.js";
import {
  buildPersonalActiveCriticalsContext,
  buildPersonalCombatDashboardContext,
  buildPersonalConditionMonitors,
  buildPersonalSpeedContext,
} from "../sheets/actor-sheet-support.js";
import {
  PLAYER_GADGET_ROLL_SOURCE,
  SITUATIONAL_PRESET_GROUPS,
  SETTING_PLAYER_GADGET_PRESETS,
  buildSituationalPresetRow,
  getPlayerModifierPresets,
  getSituationalPresetGroups,
  normalizePlayerModifierPreset,
  removePlayerModifierPreset,
  setPlayerModifierPresets,
  upsertPlayerModifierPreset,
} from "./player-modifier-presets.js";
import {
  SETTING_PLAYER_GADGET_SUBJECT,
  getEligiblePlayerGadgetTokens,
  rememberPlayerGadgetSubject,
  resolvePlayerGadgetSubject,
} from "./player-gadget-subjects.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export const SETTING_ENABLE_PLAYER_GADGET = "enablePlayerGadget";
export const SETTING_PLAYER_GADGET_AUTO_OPEN = "playerGadgetAutoOpen";
export const MWD_PLAYER_GADGET_APP_ID = "mwd-player-gadget";

const TEMPLATE_PLAYER_GADGET = `systems/${SYSTEM_NAME}/templates/v2/mwd-player-gadget.hbs`;

function parseJson(value, fallback = null) {
  const raw = String(value ?? "").trim();
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn("MWD | Invalid player gadget payload", raw, error);
    return fallback;
  }
}

function signed(value) {
  const numeric = Number(value ?? 0) || 0;
  return numeric > 0 ? `+${numeric}` : String(numeric);
}

function getRollApi() {
  return game.mwd?.roll ?? game.system?.mwd?.roll ?? null;
}

function getPersonalCombatActions() {
  return game.mwd?.personalCombatActions ?? game.system?.mwd?.personalCombatActions ?? null;
}

function getSubjectTokenUuid(subject = null) {
  return String(subject?.tokenUuid ?? subject?.token?.uuid ?? "").trim();
}

function isAttackablePersonalWeapon(item = null) {
  return item?.isPersonalWeapon?.()
    && (item.system?.equipped !== false)
    && (item.system?.carried !== false);
}

function buildAttackRows(actor = null) {
  return Array.from(actor?.items ?? [])
    .filter(isAttackablePersonalWeapon)
    .map(item => {
      const profile = item.getCombatProfile?.() ?? null;
      const gateReason = getWeaponAttackGateReason(actor, item);
      return {
        id: item.id,
        name: String(item.name ?? "Weapon").trim() || "Weapon",
        img: item.img ?? "icons/svg/sword.svg",
        subtitle: profile?.skillDef?.label ?? profile?.skill ?? "Attack",
        stats: [
          { label: "DV", value: String(Number(profile?.damage ?? item.system?.damage ?? 0) || 0) },
          { label: "AP", value: String(Number(profile?.ap ?? item.system?.ap ?? 0) || 0) },
          { label: "Range", value: String(profile?.range?.max ?? item.system?.range ?? "").trim() || "-" },
        ],
        disabled: Boolean(gateReason),
        reason: gateReason,
      };
    });
}

function shouldAutoOpenPlayerGadget(systemId = SYSTEM_NAME) {
  if (game.user?.isGM) return false;
  if (!game.settings.get(systemId, SETTING_ENABLE_PLAYER_GADGET)) return false;
  if (!game.settings.get(systemId, SETTING_PLAYER_GADGET_AUTO_OPEN)) return false;
  return getEligiblePlayerGadgetTokens().length > 0;
}

export function registerMWDPlayerGadgetSettings(systemId = SYSTEM_NAME) {
  game.settings.register(systemId, SETTING_ENABLE_PLAYER_GADGET, {
    name: "Enable Player Gadget",
    hint: "If enabled, non-GM users can use the compact Player Gadget combat surface.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(systemId, SETTING_PLAYER_GADGET_AUTO_OPEN, {
    name: "Auto-open Player Gadget",
    hint: "If enabled, opens the Player Gadget when you enter a scene with an owned personal token.",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(systemId, SETTING_PLAYER_GADGET_SUBJECT, {
    scope: "client",
    config: false,
    type: String,
    default: "",
  });

  game.settings.register(systemId, SETTING_PLAYER_GADGET_PRESETS, {
    scope: "client",
    config: false,
    type: Object,
    default: {},
  });
}

export class MWDPlayerGadget extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: MWD_PLAYER_GADGET_APP_ID,
    classes: ["mwd-player-gadget"],
    window: {
      title: "MWD Player Gadget",
      popOut: true,
      resizable: true,
      minimizable: true,
    },
    position: {
      width: 360,
      height: 560,
    },
    actions: {
      switchTab: MWDPlayerGadget.prototype._onSwitchTab,
      selectSubject: MWDPlayerGadget.prototype._onSelectSubject,
      roll: MWDPlayerGadget.prototype._onRoll,
      combatIntent: MWDPlayerGadget.prototype._onCombatIntent,
      removeActivationAction: MWDPlayerGadget.prototype._onRemoveActivationAction,
      attackWeapon: MWDPlayerGadget.prototype._onAttackWeapon,
      openStatus: MWDPlayerGadget.prototype._onOpenStatus,
      addSituationalPreset: MWDPlayerGadget.prototype._onAddSituationalPreset,
      addPlayerPreset: MWDPlayerGadget.prototype._onAddPlayerPreset,
      togglePlayerPreset: MWDPlayerGadget.prototype._onTogglePlayerPreset,
      togglePlayerPresetOnce: MWDPlayerGadget.prototype._onTogglePlayerPresetOnce,
      removePlayerPreset: MWDPlayerGadget.prototype._onRemovePlayerPreset,
      openFullSheet: MWDPlayerGadget.prototype._onOpenFullSheet,
    },
  };

  static PARTS = {
    body: { template: TEMPLATE_PLAYER_GADGET },
  };

  constructor({ systemId = SYSTEM_NAME, ...options } = {}) {
    super(options);
    this.systemId = systemId;
    this.activeTab = "actions";
    this.preferredTokenUuid = "";
  }

  async render(options = {}) {
    if (game.user?.isGM) return this;
    if (!game.settings.get(this.systemId, SETTING_ENABLE_PLAYER_GADGET)) return this;
    return super.render(options);
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const { subject, eligible, emptyReason } = resolvePlayerGadgetSubject({
      preferredTokenUuid: this.preferredTokenUuid,
    });
    const actor = subject?.actor ?? null;
    const token = subject?.token ?? null;
    const snapshot = actor ? PersonalCombatTracker.getSnapshot(actor, { token }) : null;
    const combatActions = actor && snapshot
      ? PersonalCombatTracker.buildActionModel(actor, snapshot)
      : { utilityButtons: [], summaryPills: [], activationLog: [], menus: [] };
    const presets = subject ? getPlayerModifierPresets(subject, { systemId: this.systemId }) : [];

    return foundry.utils.mergeObject(context, {
      currentTab: this.activeTab,
      hasSubject: Boolean(subject),
      emptyReason,
      subject,
      subjects: eligible.map(entry => ({
        ...entry,
        selected: entry.tokenUuid === subject?.tokenUuid,
      })),
      summary: actor && snapshot ? {
        combatDashboard: buildPersonalCombatDashboardContext(snapshot, { actor }),
        activeCriticals: buildPersonalActiveCriticalsContext(actor),
        speed: buildPersonalSpeedContext(actor),
        monitors: buildPersonalConditionMonitors(actor),
        burn: {
          value: Number(actor.system?.burn?.value ?? 0) || 0,
          overloaded: Boolean(actor.system?.burn?.overloaded),
        },
      } : null,
      combatActions,
      attacks: actor ? buildAttackRows(actor) : [],
      situationalPresetGroups: getSituationalPresetGroups(),
      presets: presets.map(row => ({
        ...row,
        valueLabel: signed(row.value),
      })),
      newPreset: {
        label: "",
        value: 1,
      },
    }, { inplace: false });
  }

  async selectSubject(tokenUuid = "") {
    this.preferredTokenUuid = String(tokenUuid ?? "").trim();
    const { subject } = resolvePlayerGadgetSubject({ preferredTokenUuid: this.preferredTokenUuid });
    if (subject) await rememberPlayerGadgetSubject(subject, { systemId: this.systemId });
    this.render({ force: true });
    return subject;
  }

  toggle() {
    if (this.rendered) return this.close();
    return this.render({ force: true });
  }

  getSubject() {
    return resolvePlayerGadgetSubject({ preferredTokenUuid: this.preferredTokenUuid }).subject;
  }

  async _onSwitchTab(event, target) {
    event?.preventDefault?.();
    this.activeTab = String(target?.dataset?.tab ?? "actions").trim() || "actions";
    this.render(false);
  }

  async _onSelectSubject(event, target) {
    event?.preventDefault?.();
    const root = target?.closest?.(".mwd-player-gadget__subject-picker") ?? this.element;
    const tokenUuid = target?.value
      ?? target?.dataset?.tokenUuid
      ?? root?.querySelector?.("[name='subject-token']")?.value
      ?? "";
    await this.selectSubject(tokenUuid);
  }

  async _onRoll(event, target) {
    event?.preventDefault?.();
    const subject = this.getSubject();
    if (!subject?.actor) return;
    const payload = parseJson(target?.dataset?.roll, null);
    if (!payload) return;
    const rollApi = getRollApi();
    if (!rollApi?.execute) {
      ui.notifications?.error("MWD roll system not initialized.");
      return;
    }
    await rollApi.execute({
      actor: subject.actor,
      payload,
      event,
      uiState: {
        source: PLAYER_GADGET_ROLL_SOURCE,
        applyManualModifierPresets: true,
        subject,
      },
    });
    this.render({ force: true });
  }

  async _onCombatIntent(event, target) {
    event?.preventDefault?.();
    const subject = this.getSubject();
    if (!subject?.actor) return;
    const payload = parseJson(target?.dataset?.combatPayload, null)
      ?? { intent: "combatAction", actionId: String(target?.dataset?.combatAction ?? "").trim() };
    if (!payload?.intent) return;
    const result = await getPersonalCombatActions()?.execute?.({
      actor: subject.actor,
      token: subject.token,
      payload,
      event,
    });
    if (result?.cancelled) {
      this.render(false);
      return;
    }
    if (!result?.ok) {
      ui.notifications?.warn(result?.reason ?? "Unable to perform action.");
      return;
    }
    this.render({ force: true });
  }

  async _onRemoveActivationAction(event, target) {
    event?.preventDefault?.();
    const subject = this.getSubject();
    const index = Number(target?.dataset?.logIndex ?? -1);
    if (!subject?.actor || !Number.isInteger(index) || index < 0) return;
    const result = await getPersonalCombatActions()?.removeActivationLogEntry?.({
      actor: subject.actor,
      token: subject.token,
      index,
    });
    if (!result?.ok) {
      ui.notifications?.warn(result?.reason ?? "Unable to remove action.");
      return;
    }
    this.render({ force: true });
  }

  async _onAttackWeapon(event, target) {
    event?.preventDefault?.();
    const subject = this.getSubject();
    const itemId = String(target?.dataset?.itemId ?? "").trim();
    const weapon = subject?.actor?.items?.get?.(itemId) ?? null;
    if (!weapon) return;
    const result = await getPersonalCombatActions()?.executeOwnedWeaponAttack?.({
      weapon,
      event,
      token: subject.token,
    });
    if (!result?.ok) return;
    this.render({ force: true });
  }

  async _onOpenStatus(event) {
    event?.preventDefault?.();
    const subject = this.getSubject();
    if (!subject?.actor || !subject?.token) return;
    await openTokenStatusDialog({ actor: subject.actor, token: subject.token });
    this.render({ force: true });
  }

  async _onAddSituationalPreset(event, target) {
    event?.preventDefault?.();
    const subject = this.getSubject();
    const presetId = String(target?.dataset?.presetId ?? "").trim();
    const preset = SITUATIONAL_PRESET_GROUPS
      .flatMap(group => group.presets)
      .find(entry => entry.id === presetId);
    const row = buildSituationalPresetRow(preset);
    if (!subject || !row) return;
    await upsertPlayerModifierPreset(subject, row, { systemId: this.systemId });
    this.render({ force: true });
  }

  async _onAddPlayerPreset(event, target) {
    event?.preventDefault?.();
    const subject = this.getSubject();
    const root = target?.closest?.(".mwd-player-gadget__manual-add") ?? this.element;
    const label = String(root?.querySelector?.("[name='preset-label']")?.value ?? "").trim();
    const value = Number(root?.querySelector?.("[name='preset-value']")?.value ?? 0);
    const row = normalizePlayerModifierPreset({
      label,
      value,
      enabled: true,
      consumeOnce: Boolean(root?.querySelector?.("[name='preset-once']")?.checked ?? true),
      source: "playerPreset",
    });
    if (!subject || !row) return;
    await upsertPlayerModifierPreset(subject, row, { systemId: this.systemId });
    this.render({ force: true });
  }

  async _onTogglePlayerPreset(event, target) {
    event?.preventDefault?.();
    const subject = this.getSubject();
    const id = String(target?.dataset?.presetId ?? "").trim();
    if (!subject || !id) return;
    const rows = getPlayerModifierPresets(subject, { systemId: this.systemId })
      .map(row => row.id === id ? { ...row, enabled: !row.enabled } : row);
    await setPlayerModifierPresets(subject, rows, { systemId: this.systemId });
    this.render({ force: true });
  }

  async _onTogglePlayerPresetOnce(event, target) {
    event?.preventDefault?.();
    const subject = this.getSubject();
    const id = String(target?.dataset?.presetId ?? "").trim();
    if (!subject || !id) return;
    const rows = getPlayerModifierPresets(subject, { systemId: this.systemId })
      .map(row => row.id === id ? { ...row, consumeOnce: !row.consumeOnce } : row);
    await setPlayerModifierPresets(subject, rows, { systemId: this.systemId });
    this.render({ force: true });
  }

  async _onRemovePlayerPreset(event, target) {
    event?.preventDefault?.();
    const subject = this.getSubject();
    const id = String(target?.dataset?.presetId ?? "").trim();
    if (!subject || !id) return;
    await removePlayerModifierPreset(subject, id, { systemId: this.systemId });
    this.render({ force: true });
  }

  async _onOpenFullSheet(event) {
    event?.preventDefault?.();
    const subject = this.getSubject();
    if (!subject?.actor?.sheet) return;
    subject.actor.sheet.render(true);
    await this.close();
  }
}

let _instance = null;

export function getMWDPlayerGadget({ systemId = SYSTEM_NAME } = {}) {
  if (!_instance) _instance = new MWDPlayerGadget({ systemId });
  return _instance;
}

export function createMWDPlayerGadgetApi({ systemId = SYSTEM_NAME } = {}) {
  const get = () => getMWDPlayerGadget({ systemId });
  return {
    render: (options = { force: true }) => get().render(options),
    toggle: () => get().toggle(),
    selectSubject: tokenUuid => get().selectSubject(tokenUuid),
    get app() { return get(); },
  };
}

export function maybeAutoOpenPlayerGadget({ systemId = SYSTEM_NAME } = {}) {
  if (!shouldAutoOpenPlayerGadget(systemId)) return;
  getMWDPlayerGadget({ systemId }).render({ force: true });
}

export function getPlayerGadgetSubjectTokenUuidForSheet(sheet) {
  const token = sheet?.getSheetTokenDocument?.()
    ?? PersonalCombatTracker.getCurrentSceneTokenDocument(sheet?.actor)
    ?? null;
  return getSubjectTokenUuid({ token });
}
