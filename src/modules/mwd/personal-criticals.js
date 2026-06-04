// src/modules/mwd/personal-criticals.js
// Purpose: Personal Critical Hit preview, application, and storage helpers.

import { applyManagedStatusUpdate } from "../dialog/token-status-dialog.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import {
  getPersonalCriticalBandDefinition,
  getPersonalCriticalFamily,
  getPersonalCriticalFamilyByRoll,
  PERSONAL_CRITICAL_BANDS,
} from "./personal-crit-families.js";
import { getPersonalCritRemedy } from "./personal-crit-remedies.js";
import {
  buildDerivedPersonalCombatTraitFacts,
  evaluateTraitPhase,
  getTraitActiveEffectModifier,
} from "./traits.js";

export const PERSONAL_CRITICAL_STATUS_ID = "personalCritical";

const BAND_ORDER = Object.freeze(["minor", "moderate", "severe"]);

function clone(value) {
  if (value === undefined) return undefined;
  if (globalThis.foundry?.utils?.deepClone) return foundry.utils.deepClone(value);
  return JSON.parse(JSON.stringify(value ?? null));
}

function randomId() {
  return globalThis.foundry?.utils?.randomID?.() ?? Math.random().toString(36).slice(2, 18);
}

function nowIso() {
  try {
    return new Date().toISOString();
  } catch (_error) {
    return "";
  }
}

function getPreviewRevision(payload = {}) {
  return Math.max(0, Math.trunc(Number(payload?.previewRevision ?? 0) || 0));
}

function getBandLabel(bandId) {
  return PERSONAL_CRITICAL_BANDS[bandId]?.label ?? String(bandId ?? "").trim();
}

function getBandRoman(bandId) {
  return PERSONAL_CRITICAL_BANDS[bandId]?.roman ?? "";
}

function getBandFromTotal(total) {
  const numeric = Number(total ?? 0);
  if (numeric <= 9) return "none";
  if (numeric === 10) return "minor";
  if (numeric === 11) return "moderate";
  return "severe";
}

function getRollOverrideTotal(value) {
  if (value === null || value === undefined || value === "") return null;
  const total = Number(value);
  return Number.isFinite(total) ? total : null;
}

async function rollFormula(formula) {
  if (typeof Roll !== "function") {
    const dice = String(formula).trim() === "1d6" ? 1 : 2;
    const total = Array.from({ length: dice }).reduce(sum => sum + 1, 0);
    return { total, formula, results: Array.from({ length: dice }, () => 1) };
  }
  const roll = new Roll(formula);
  const evaluated = typeof roll.evaluate === "function"
    ? await roll.evaluate({ async: true })
    : roll;
  const total = Number(evaluated?.total ?? roll.total ?? 0) || 0;
  const dice = Array.isArray(evaluated?.dice) ? evaluated.dice : (Array.isArray(roll.dice) ? roll.dice : []);
  const results = dice.flatMap(die => Array.from(die?.results ?? []).map(result => Number(result?.result ?? result) || 0));
  return { total, formula, results, roll: evaluated ?? roll };
}

export function severityFromMargin(netHits) {
  const margin = Math.max(0, Math.trunc(Number(netHits ?? 0) || 0));
  if (margin >= 7) return 3;
  if (margin >= 5) return 2;
  if (margin >= 3) return 1;
  return 0;
}

export async function rollPersonalCriticalBand({ severity = 0, rollTotal = null } = {}) {
  const sev = Math.max(0, Math.trunc(Number(severity ?? 0) || 0));
  const overrideTotal = getRollOverrideTotal(rollTotal);
  const roll = overrideTotal !== null
    ? { total: overrideTotal, formula: "2d6", results: [] }
    : await rollFormula("2d6");
  const total = Number(roll.total ?? 0) + sev;
  return {
    band: getBandFromTotal(total),
    total,
    severity: sev,
    roll,
  };
}

export async function rollPersonalCriticalFamily({ rollTotal = null } = {}) {
  const overrideTotal = getRollOverrideTotal(rollTotal);
  const roll = overrideTotal !== null
    ? { total: overrideTotal, formula: "1d6", results: [] }
    : await rollFormula("1d6");
  const family = getPersonalCriticalFamilyByRoll(roll.total);
  return {
    familyId: family?.id ?? "winded",
    familyLabel: family?.label ?? "Winded",
    roll,
  };
}

export function normalizePersonalCriticalRecord(record = {}, actor = null) {
  const familyId = String(record?.familyId ?? "").trim();
  const band = String(record?.band ?? "").trim();
  const family = getPersonalCriticalFamily(familyId);
  const bandDefinition = getPersonalCriticalBandDefinition(familyId, band);
  if (!family || !bandDefinition) return null;
  const remedy = getPersonalCritRemedy(record?.remedyKey ?? bandDefinition.remedyKey);
  const statusLabel = String(record?.statusLabel ?? bandDefinition.statusLabel ?? "").trim();
  const weaponUuid = String(record?.weaponUuid ?? record?.source?.weaponUuid ?? "").trim();
  const weaponId = String(record?.weaponId ?? "").trim();
  const weapon = weaponUuid && actor?.items
    ? Array.from(actor.items.values?.() ?? actor.items ?? []).find(item => item?.uuid === weaponUuid) ?? null
    : (weaponId && actor?.items?.get ? actor.items.get(weaponId) : null);

  return {
    id: String(record?.id ?? "").trim() || randomId(),
    previewRevision: getPreviewRevision(record),
    familyId,
    familyLabel: family.label,
    band,
    bandLabel: getBandLabel(band),
    bandRoman: getBandRoman(band),
    severity: Math.max(0, Math.trunc(Number(record?.severity ?? 0) || 0)),
    label: String(record?.label ?? `${family.label} ${getBandRoman(band)}`).trim(),
    statusId: String(record?.statusId ?? bandDefinition.statusId ?? "").trim(),
    statusLabel,
    effectText: String(record?.effectText ?? bandDefinition.effectText ?? "").trim(),
    effectKind: String(record?.effectKind ?? bandDefinition.effectKind ?? "").trim(),
    effectPayload: clone(record?.effectPayload ?? bandDefinition.effectPayload ?? {}),
    remedyKey: remedy.key,
    remedyLabel: String(record?.remedyLabel ?? bandDefinition.remedyLabel ?? remedy.label).trim(),
    remedySkillKey: String(record?.remedySkillKey ?? bandDefinition.remedySkillKey ?? remedy.skillKey ?? "").trim(),
    remedyBaseDn: Math.max(0, Number(record?.remedyBaseDn ?? bandDefinition.remedyBaseDn ?? remedy.baseDn ?? 0) || 0),
    active: record?.active !== false,
    createdRound: Math.max(0, Math.trunc(Number(record?.createdRound ?? globalThis.game?.combat?.round ?? 0) || 0)),
    createdAt: String(record?.createdAt ?? nowIso()).trim(),
    source: clone(record?.source ?? {}),
    weaponUuid,
    weaponId,
    weaponName: String(record?.weaponName ?? weapon?.name ?? record?.source?.weaponName ?? "").trim(),
  };
}

export function buildPersonalCritRecord({
  actor = null,
  familyId = "",
  band = "",
  severity = 0,
  source = {},
  previewRevision = 0,
  weaponUuid = "",
  weaponId = "",
  weaponName = "",
} = {}) {
  return normalizePersonalCriticalRecord({
    id: randomId(),
    previewRevision,
    familyId,
    band,
    severity,
    active: true,
    createdRound: Number(globalThis.game?.combat?.round ?? 0) || 0,
    createdAt: nowIso(),
    source: clone(source ?? {}),
    weaponUuid,
    weaponId,
    weaponName,
  }, actor);
}

export function getActivePersonalCrits(actor, filters = {}) {
  const crits = Array.isArray(actor?.system?.criticals) ? actor.system.criticals : [];
  return crits
    .map(crit => normalizePersonalCriticalRecord(crit, actor))
    .filter(crit => crit && crit.active !== false)
    .filter(crit => !filters.familyId || crit.familyId === filters.familyId)
    .filter(crit => !filters.band || crit.band === filters.band)
    .filter(crit => !filters.statusId || crit.statusId === filters.statusId);
}

export function getPersonalCriticalSpeedModifier(actor) {
  return getActivePersonalCrits(actor).reduce((total, crit) => {
    const speed = Number(crit?.effectPayload?.speed ?? 0);
    return total + (Number.isFinite(speed) ? speed : 0);
  }, 0);
}

export function getPersonalSpeedState(actor) {
  const base = Math.max(0, Math.trunc(Number(actor?.system?.speed ?? 0) || 0));
  const criticalModifier = Math.trunc(getPersonalCriticalSpeedModifier(actor));
  const activeEffectModifier = Math.trunc(getTraitActiveEffectModifier(actor, "speedMod"));
  const packet = { base, modifier: criticalModifier + activeEffectModifier };
  const traitPhase = evaluateTraitPhase({
    actor,
    phase: "onDerivedPersonalCombat",
    facts: buildDerivedPersonalCombatTraitFacts({ actor, packet, runtime: {} }),
    packet,
    options: { consumeUsage: false },
  });
  const modifier = Math.trunc(Number(traitPhase.packet.modifier ?? criticalModifier) || 0);
  const effective = Math.max(0, base + modifier);
  const state = {
    base,
    modifier,
    effective,
    adjusted: modifier !== 0,
  };
  if (traitPhase.modifiers.length) state.modifiers = traitPhase.modifiers;
  return state;
}

function getPreparedCriticalRecords(payload = {}, actor = null) {
  return Array.isArray(payload?.preparedCriticalRecords)
    ? payload.preparedCriticalRecords.map(record => normalizePersonalCriticalRecord(clone(record), actor)).filter(Boolean)
    : [];
}

function validatePreparedCriticalRecords(payload = {}, records = []) {
  if (!records.length) return { ok: true };
  const revision = getPreviewRevision(payload);
  const stale = records.find(record => Number(record?.previewRevision ?? revision) !== revision);
  if (stale) return { ok: false, reason: "Critical preview is stale. Rebuild the attack damage preview before applying." };
  return { ok: true };
}

export async function previewPersonalCritical({
  actor = null,
  payload = {},
  outcome = "",
  netHits = 0,
  source = {},
  previewRevision = 0,
  weaponUuid = "",
  weaponId = "",
  weaponName = "",
  bandRollTotal = null,
  familyRollTotal = null,
} = {}) {
  const resolvedOutcome = String(outcome || payload?.outcome || "").trim();
  const margin = Math.max(0, Math.trunc(Number(netHits ?? payload?.critNetHits ?? payload?.netHits ?? 0) || 0));
  const severity = Math.max(0, Math.trunc(Number(payload?.critSeverity ?? severityFromMargin(margin)) || 0));
  const revision = getPreviewRevision({ previewRevision: payload?.previewRevision ?? previewRevision });
  const prepared = getPreparedCriticalRecords(payload, actor);
  const preparedValidation = validatePreparedCriticalRecords({ previewRevision: revision }, prepared);
  if (!preparedValidation.ok) return preparedValidation;
  if (prepared.length) {
    return {
      ok: true,
      selected: true,
      severity,
      netHits: margin,
      band: prepared[0]?.band ?? "",
      familyId: prepared[0]?.familyId ?? "",
      records: prepared,
      previewRevision: revision,
      prepared: true,
    };
  }

  if (payload?.criticalPreview && payload.criticalPreview.selected === false) {
    return {
      ok: true,
      selected: false,
      severity,
      netHits: margin,
      band: String(payload.criticalPreview.band ?? "none"),
      bandTotal: Number(payload.criticalPreview.bandTotal ?? 0) || 0,
      records: [],
      previewRevision: revision,
      prepared: true,
    };
  }

  if (resolvedOutcome !== "hit") {
    return { ok: true, selected: false, severity, netHits: margin, band: "none", records: [], previewRevision: revision };
  }

  const bandRoll = await rollPersonalCriticalBand({ severity, rollTotal: bandRollTotal });
  if (bandRoll.band === "none") {
    return {
      ok: true,
      selected: false,
      severity,
      netHits: margin,
      band: "none",
      bandTotal: bandRoll.total,
      bandRoll,
      records: [],
      previewRevision: revision,
    };
  }

  const familyRoll = await rollPersonalCriticalFamily({ rollTotal: familyRollTotal });
  const record = buildPersonalCritRecord({
    actor,
    familyId: familyRoll.familyId,
    band: bandRoll.band,
    severity,
    source,
    previewRevision: revision,
    weaponUuid,
    weaponId,
    weaponName,
  });

  return {
    ok: true,
    selected: true,
    severity,
    netHits: margin,
    band: bandRoll.band,
    bandLabel: getBandLabel(bandRoll.band),
    bandTotal: bandRoll.total,
    bandRoll,
    familyId: familyRoll.familyId,
    familyLabel: familyRoll.familyLabel,
    familyRoll,
    records: record ? [record] : [],
    previewRevision: revision,
  };
}

async function syncPersonalCriticalMarker(actor, hasCrits) {
  if (!actor?.toggleStatusEffect) return;
  try {
    await applyManagedStatusUpdate({
      actor,
      statusId: PERSONAL_CRITICAL_STATUS_ID,
      active: Boolean(hasCrits),
      metadata: {
        scope: "Personal critical effects",
        notes: "Visual marker for active system.criticals entries.",
      },
    });
  } catch (error) {
    console.warn("MWD | Unable to sync personal critical status", error);
  }
}

async function clearAimIfNeeded(actor, token, records = []) {
  if (!records.some(record => record?.effectPayload?.cannotAim)) return;
  try {
    await PersonalCombatTracker.clearAim(actor, { token });
  } catch (_error) {
    // Aim state is combat-scoped; failures here should not block damage apply.
  }
}

async function applyRecordSideEffects(actor, token, records = []) {
  for (const record of records) {
    const statusId = String(record?.statusId ?? "").trim();
    if (statusId) {
      try {
        await applyManagedStatusUpdate({ actor, statusId, active: true });
      } catch (error) {
        console.warn(`MWD | Unable to apply personal crit status "${statusId}"`, error);
      }
    }

    const payload = record?.effectPayload ?? {};
    const burn = Math.max(0, Number(payload.burn ?? 0) || 0);
    if (burn > 0) {
      await actor.update({ "system.burn.value": Math.max(0, Number(actor.system?.burn?.value ?? 0) + burn) });
    }

    if (payload.weaponUnequipped) {
      const item = record.weaponId && actor.items?.get
        ? actor.items.get(record.weaponId)
        : Array.from(actor.items?.values?.() ?? []).find(entry => entry?.uuid === record.weaponUuid);
      if (item?.update) await item.update({ "system.equipped": false, "system.isPrimary": false });
    }

    if (payload.prone) {
      try {
        await applyManagedStatusUpdate({ actor, statusId: "prone", active: true });
      } catch (error) {
        console.warn("MWD | Unable to apply prone from personal critical", error);
      }
    }
  }

  await clearAimIfNeeded(actor, token, records);
}

export async function applyPersonalCriticalToActor({ actor = null, token = null, records = [], dryRun = false } = {}) {
  if (!actor) return { ok: false, reason: "Personal criticals require an actor." };
  const normalized = Array.from(records ?? [])
    .map(record => normalizePersonalCriticalRecord(record, actor))
    .filter(Boolean);
  if (!normalized.length) return { ok: true, records: [], activeCrits: getActivePersonalCrits(actor) };

  const existing = Array.isArray(actor?.system?.criticals) ? clone(actor.system.criticals) : [];
  const toAdd = [];
  const escalations = [];

  for (const incoming of normalized) {
    const existingIndex = existing.findIndex(
      r => String(r?.familyId ?? "").trim() === incoming.familyId && r?.active !== false
    );

    if (existingIndex >= 0) {
      const existingBand = String(existing[existingIndex]?.band ?? "").trim();
      const existingBandIndex = BAND_ORDER.indexOf(existingBand);
      const incomingBandIndex = BAND_ORDER.indexOf(incoming.band);
      const escalatedBandId = BAND_ORDER[Math.max(0, Math.max(existingBandIndex, incomingBandIndex))];
      const bandChanged = escalatedBandId !== existingBand;
      const oldStatusId = String(existing[existingIndex]?.statusId ?? "").trim();

      const updatedRecord = normalizePersonalCriticalRecord({
        ...existing[existingIndex],
        band: escalatedBandId,
        statusId: undefined,
        statusLabel: undefined,
        effectText: undefined,
        effectKind: undefined,
        effectPayload: undefined,
        remedyKey: undefined,
        remedyLabel: undefined,
        remedySkillKey: undefined,
        remedyBaseDn: undefined,
        label: undefined,
      }, actor);

      existing[existingIndex] = updatedRecord;
      escalations.push({ oldStatusId, updatedRecord, bandChanged });
    } else {
      toAdd.push(incoming);
      existing.push(incoming);
    }
  }

  const next = existing;

  if (!dryRun) {
    await actor.update({ "system.criticals": next });
    await syncPersonalCriticalMarker(actor, next.some(crit => crit?.active !== false));

    for (const { oldStatusId, updatedRecord, bandChanged } of escalations) {
      if (bandChanged) {
        if (oldStatusId && oldStatusId !== updatedRecord.statusId) {
          try {
            await applyManagedStatusUpdate({ actor, statusId: oldStatusId, active: false });
          } catch (error) {
            console.warn(`MWD | Unable to deactivate old personal crit status "${oldStatusId}"`, error);
          }
        }
        await applyRecordSideEffects(actor, token, [updatedRecord]);
      }
    }

    await applyRecordSideEffects(actor, token, toAdd);
  }

  const appliedRecords = [...toAdd, ...escalations.map(e => e.updatedRecord)];
  return {
    ok: true,
    records: appliedRecords,
    activeCrits: dryRun ? next.map(record => normalizePersonalCriticalRecord(record, actor)).filter(Boolean) : getActivePersonalCrits(actor),
  };
}

export async function removePersonalCrit({ actor = null, critId = "" } = {}) {
  const id = String(critId ?? "").trim();
  if (!actor || !id) return { ok: false, reason: "Personal critical not specified." };
  const current = Array.isArray(actor.system?.criticals) ? clone(actor.system.criticals) : [];
  const index = current.findIndex(record => String(record?.id ?? "").trim() === id);
  if (index < 0) return { ok: false, reason: "That critical effect is no longer active." };
  const removed = normalizePersonalCriticalRecord(current[index], actor);
  current.splice(index, 1);
  await actor.update({ "system.criticals": current });

  if (removed?.statusId) {
    try {
      await applyManagedStatusUpdate({ actor, statusId: removed.statusId, active: false });
    } catch (error) {
      console.warn(`MWD | Unable to clear personal crit status "${removed.statusId}"`, error);
    }
  }

  await syncPersonalCriticalMarker(actor, current.some(crit => crit?.active !== false));
  return { ok: true, crit: removed, activeCrits: getActivePersonalCrits(actor) };
}

export function buildPersonalCriticalChatSummary(crit = {}) {
  const parts = [];
  if (crit.effectText) parts.push(crit.effectText);
  if (crit.remedyLabel && crit.remedyKey !== "none") {
    parts.push(`Remedy: ${crit.remedyLabel}${crit.remedyBaseDn ? ` DN ${crit.remedyBaseDn}` : ""}`);
  }
  return parts.join(" | ");
}
