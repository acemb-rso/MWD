// src/modules/mwd/battle-armor.js
// Purpose: Battle armor profile normalization, targeting, and harm helpers.
// How it fits: Keeps character-worn powered armor rules out of sheets and
// machine actors while exposing one small API for HarmEngine, EW, and UI code.

import {
  buildDamageScaleConversion,
  normalizeDamageScale,
} from "./damage-scale.js";

export const BATTLE_ARMOR_STATES = Object.freeze({
  intact: "intact",
  breached: "breached",
  wrecked: "wrecked",
});

export const BATTLE_ARMOR_STATUSES = Object.freeze({
  worn: "battleArmorWorn",
  breached: "battleArmorBreached",
  wrecked: "battleArmorWrecked",
  revealed: "battleArmorRevealed",
  attached: "attachedToMachine",
  tagged: "tagged",
  narced: "narced",
});

const BATTLE_ARMOR_MACHINE_TARGET_BASE_PENALTY = 1;

function clone(value) {
  if (typeof foundry !== "undefined" && foundry?.utils?.deepClone) return foundry.utils.deepClone(value);
  return JSON.parse(JSON.stringify(value ?? null));
}

function number(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function nonNegativeInteger(value, fallback = 0) {
  return Math.max(0, Math.trunc(number(value, fallback)));
}

function bool(value, fallback = false) {
  if (typeof value === "boolean") return value;
  const raw = String(value ?? "").trim().toLowerCase();
  if (!raw) return fallback;
  return ["true", "1", "yes", "y", "on"].includes(raw);
}

function arrayOfStrings(value = []) {
  const source = Array.isArray(value) ? value : String(value ?? "").split(",");
  return source.map(entry => String(entry ?? "").trim()).filter(Boolean);
}

function normalizeDetectionCap(value = "", fallback = "lock") {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (normalized === "detect") return "contact";
  if (normalized === "acquire") return "lock";
  if (["contact", "track", "lock"].includes(normalized)) return normalized;
  return fallback;
}

function normalizePool(raw = {}, fallbackMax = 0) {
  const max = nonNegativeInteger(raw?.max, fallbackMax);
  return {
    value: Math.min(max, nonNegativeInteger(raw?.value, max)),
    max,
  };
}

export function normalizeBattleArmorStructureForRating(
  ratingMax = 0,
  structure = {},
  {
    previousStructure = null,
    maxChanged = false,
    valueChanged = false,
  } = {}
) {
  const rating = nonNegativeInteger(ratingMax, 0);
  const rawValue = Number(structure?.value);
  const rawMax = Number(structure?.max);
  const prevMax = nonNegativeInteger(previousStructure?.max ?? 0, 0);
  const prevValue = Number(previousStructure?.value);
  const hasValue = Number.isFinite(rawValue);
  const hasPrevValue = Number.isFinite(prevValue);
  const maxWasUninitialized = !Number.isFinite(rawMax) || rawMax <= 0;
  const valueWasUninitialized = !hasValue || rawValue <= 0;
  const looksUninitialized = rating > 0 && maxWasUninitialized && valueWasUninitialized;
  const previousWasFull = !hasPrevValue || prevValue >= prevMax || prevMax <= 0;

  const nextValue = (
    looksUninitialized
    || (maxChanged && !valueChanged && previousWasFull)
  )
    ? rating
    : (hasValue ? rawValue : (hasPrevValue ? prevValue : rating));

  return {
    value: Math.min(rating, Math.max(0, nextValue || 0)),
    max: rating,
  };
}

export function deriveBattleArmorState(profile = {}) {
  const armorValue = nonNegativeInteger(profile?.armorPool?.value, 0);
  const structureValue = nonNegativeInteger(profile?.structure?.value, 0);
  if (armorValue > 0) return BATTLE_ARMOR_STATES.intact;
  if (structureValue > 0) return BATTLE_ARMOR_STATES.breached;
  return BATTLE_ARMOR_STATES.wrecked;
}

export function normalizeBattleArmorStealth(raw = {}) {
  const source = typeof raw === "boolean" ? { enabled: raw } : (raw && typeof raw === "object" ? raw : {});
  return {
    enabled: bool(source.enabled, false),
    trackingPenalty: nonNegativeInteger(source.trackingPenalty ?? source.bonusTrackingPenalty, 2),
    detectionStateCap: normalizeDetectionCap(source.detectionStateCap ?? source.passiveAcquireCeiling, "track"),
    revealedOnAttack: source.revealedOnAttack !== false,
    revealedOnJump: source.revealedOnJump !== false,
    revealedOnHit: source.revealedOnHit !== false,
    counteredBy: arrayOfStrings(source.counteredBy?.length ? source.counteredBy : ["activeProbe", "tag", "narc", "pointblank", "revealed"]),
  };
}

export function normalizeBattleArmorSystems(raw = {}) {
  const source = raw && typeof raw === "object" ? raw : {};
  return {
    stealth: normalizeBattleArmorStealth(source.stealth),
    jump: bool(source.jump, false),
    enhancedStrength: bool(source.enhancedStrength, false),
    sealed: bool(source.sealed, false),
    basicSensors: bool(source.basicSensors, false),
    medicalSuppression: bool(source.medicalSuppression, false),
    attachedEligible: bool(source.attachedEligible, false),
  };
}

export function normalizeBattleArmorTargetProfile(raw = {}, systems = normalizeBattleArmorSystems({})) {
  const stealth = systems.stealth ?? normalizeBattleArmorStealth(false);
  return {
    machineTargetable: raw.machineTargetable !== false,
    targetClass: String(raw.targetClass ?? "battleArmor").trim() || "battleArmor",
    sizePenalty: BATTLE_ARMOR_MACHINE_TARGET_BASE_PENALTY,
    signature: String(raw.signature ?? "low").trim() || "low",
    stealthTrackingPenalty: nonNegativeInteger(raw.stealthTrackingPenalty, stealth.enabled ? stealth.trackingPenalty : 0),
    detectionStateCap: raw.detectionStateCap === null || raw.acquireCeiling === null
      ? null
      : normalizeDetectionCap(raw.detectionStateCap ?? raw.acquireCeiling ?? (stealth.enabled ? stealth.detectionStateCap : ""), null),
    counteredBy: arrayOfStrings(raw.counteredBy?.length ? raw.counteredBy : stealth.counteredBy),
  };
}

export function normalizeBattleArmorProfile(raw = {}) {
  const source = raw && typeof raw === "object" ? raw : {};
  const systems = normalizeBattleArmorSystems(source.systems);
  const normalized = {
    enabled: bool(source.enabled, false),
    armorPool: normalizePool(source.armorPool, 0),
    structure: normalizeBattleArmorStructureForRating(source.structure?.max, source.structure),
    state: "",
    scale: "personal",
    systems,
    machineTargetProfile: normalizeBattleArmorTargetProfile(source.machineTargetProfile, systems),
    attachedToTokenUuid: String(source.attachedToTokenUuid ?? "").trim() || null,
    attachedLocationHint: String(source.attachedLocationHint ?? "").trim(),
    revealedUntil: source.revealedUntil ?? null,
  };
  normalized.state = deriveBattleArmorState(normalized);
  return normalized;
}

export function normalizeMountProfile(raw = {}) {
  const source = raw && typeof raw === "object" ? raw : {};
  return {
    mountedOnItemId: String(source.mountedOnItemId ?? "").trim(),
    mountType: String(source.mountType ?? "").trim(),
  };
}

export function normalizeDamageSourceScale(value = "", fallback = "personal") {
  return normalizeDamageScale(value, fallback);
}

export function isBattleArmorProfileEnabled(profile = null) {
  return Boolean(profile?.enabled);
}

export function isBattleArmorFunctional(profile = null) {
  return isBattleArmorProfileEnabled(profile) && deriveBattleArmorState(profile) !== BATTLE_ARMOR_STATES.wrecked;
}

export function getBattleArmorStructureResistance(profile = {}) {
  const structure = nonNegativeInteger(profile?.structure?.value, 0);
  return structure > 0 ? Math.ceil(structure / 4) : 0;
}

function itemArray(actor = null) {
  const items = actor?.items;
  if (!items) return [];
  if (Array.isArray(items)) return items;
  if (Array.isArray(items.contents)) return items.contents;
  if (typeof items[Symbol.iterator] === "function") return Array.from(items);
  return [];
}

function tokenArray(collection = null) {
  if (!collection) return [];
  if (Array.isArray(collection)) return collection;
  if (Array.isArray(collection.contents)) return collection.contents;
  if (Array.isArray(collection.placeables)) return collection.placeables;
  if (typeof collection[Symbol.iterator] === "function") return Array.from(collection);
  return [];
}

function tokenActor(token = null) {
  return token?.actor ?? token?.document?.actor ?? null;
}

function tokenUuid(token = null) {
  return String(token?.document?.uuid ?? token?.uuid ?? token?.object?.document?.uuid ?? "").trim();
}

function tokenId(token = null) {
  return String(token?.document?.id ?? token?.id ?? token?.object?.id ?? "").trim();
}

function getMachineTokenKeys(machineActor = null, machineToken = null) {
  const keys = new Set();
  const add = value => {
    const normalized = String(value ?? "").trim();
    if (normalized) keys.add(normalized);
  };
  add(tokenUuid(machineToken));
  add(machineToken?.document?.uuid);
  add(machineToken?.uuid);
  add(machineToken?.object?.document?.uuid);
  add(tokenId(machineToken));
  add(machineActor?.uuid);
  add(machineActor?.id);
  return keys;
}

function getBattleArmorAttachment(actor = null) {
  const activeArmor = getEquippedBattleArmor(actor);
  const profile = normalizeBattleArmorProfile(activeArmor?.battleArmor);
  if (!isBattleArmorProfileEnabled(profile)) return null;
  const attachedToTokenUuid = String(profile.attachedToTokenUuid ?? "").trim();
  if (!attachedToTokenUuid) return null;
  return { activeArmor, profile, attachedToTokenUuid };
}

function addAttachedBattleArmorCandidate(candidates, seen, {
  actor = null,
  token = null,
  attachment = null,
  source = "",
} = {}) {
  const resolvedActor = actor ?? tokenActor(token);
  const resolvedAttachment = attachment ?? getBattleArmorAttachment(resolvedActor);
  if (!resolvedActor || !resolvedAttachment) return;

  const key = tokenUuid(token) || resolvedActor.uuid || resolvedActor.id || resolvedAttachment.activeArmor?.id;
  if (!key || seen.has(key)) return;
  seen.add(key);

  candidates.push({
    actor: resolvedActor,
    token,
    tokenId: tokenId(token),
    tokenUuid: tokenUuid(token),
    source,
    armor: resolvedAttachment.activeArmor,
    battleArmor: resolvedAttachment.profile,
    attachedToTokenUuid: resolvedAttachment.attachedToTokenUuid,
  });
}

export function getEquippedBattleArmor(actor = null, { loadout = null } = {}) {
  if (!actor) return null;
  const activeArmor = loadout?.activeArmor ?? actor.getPersonalCombatLoadout?.({ refresh: true })?.activeArmor ?? null;
  if (isBattleArmorProfileEnabled(activeArmor?.battleArmor)) return activeArmor;

  return itemArray(actor)
    .filter(item => (item?.canonicalType ?? item?.type) === "armor")
    .map(item => item.getArmorProfile?.({ actor }) ?? null)
    .filter(profile => profile?.equipped && isBattleArmorProfileEnabled(profile?.battleArmor))
    .sort((left, right) => Number(Boolean(right.isPrimary)) - Number(Boolean(left.isPrimary)))[0] ?? null;
}

export function findAttachedBattleArmorTargets(machineActor = null, {
  machineToken = null,
  targetTokens = null,
  selectedTokens = null,
} = {}) {
  const machineKeys = getMachineTokenKeys(machineActor, machineToken);
  if (!machineKeys.size) return [];

  const candidates = [];
  const seen = new Set();
  const inspectToken = (token, source) => {
    const actor = tokenActor(token);
    const attachment = getBattleArmorAttachment(actor);
    if (!attachment || !machineKeys.has(attachment.attachedToTokenUuid)) return;
    addAttachedBattleArmorCandidate(candidates, seen, { actor, token, attachment, source });
  };

  for (const token of tokenArray(targetTokens)) inspectToken(token, "targeted");
  for (const token of tokenArray(selectedTokens)) inspectToken(token, "selected");
  for (const token of tokenArray(globalThis.game?.user?.targets)) inspectToken(token, "targeted");
  for (const token of tokenArray(globalThis.canvas?.tokens)) inspectToken(token, "scene");

  for (const actor of tokenArray(globalThis.game?.actors)) {
    const attachment = getBattleArmorAttachment(actor);
    if (!attachment || !machineKeys.has(attachment.attachedToTokenUuid)) continue;
    addAttachedBattleArmorCandidate(candidates, seen, { actor, attachment, source: "actor" });
  }

  return candidates;
}

export function getMountedBattleArmorItems(actor = null, battleArmorItemId = "") {
  const id = String(battleArmorItemId ?? "").trim();
  if (!actor || !id) return [];
  return itemArray(actor)
    .filter(item => {
      const mount = normalizeMountProfile(item?.system?.mount);
      return mount.mountedOnItemId === id;
    })
    .map(item => ({
      id: item.id ?? "",
      uuid: item.uuid ?? "",
      name: item.name ?? "Mounted Item",
      img: item.img ?? "",
      type: item.canonicalType ?? item.type,
      item,
      system: item.system ?? {},
      mount: normalizeMountProfile(item.system?.mount),
      combatProfile: item.getCombatProfile?.() ?? null,
    }));
}

export function actorHasBattleArmorCounter(actor = null, counter = "", { rangeBand = "" } = {}) {
  const key = String(counter ?? "").trim();
  if (!key) return false;
  if (key === "revealed") return actor?.statuses?.has?.(BATTLE_ARMOR_STATUSES.revealed) ?? false;
  if (key === "tag" || key === "tagged") return actor?.statuses?.has?.(BATTLE_ARMOR_STATUSES.tagged) ?? false;
  if (key === "narc" || key === "narced") return actor?.statuses?.has?.(BATTLE_ARMOR_STATUSES.narced) ?? false;
  if (key === "pointblank") return String(rangeBand ?? "").trim().toLowerCase() === "close";
  if (key === "activeProbe") return false;
  return actor?.statuses?.has?.(key) ?? false;
}

export function battleArmorStealthIsCountered(actor = null, profile = null, options = {}) {
  const counters = arrayOfStrings(profile?.machineTargetProfile?.counteredBy ?? profile?.systems?.stealth?.counteredBy ?? []);
  return counters.some(counter => actorHasBattleArmorCounter(actor, counter, options));
}

function detectionCapRank(cap = "lock") {
  return { contact: 1, track: 2, lock: 3 }[normalizeDetectionCap(cap, "lock")] ?? 3;
}

export function lowerDetectionCap(left = "lock", right = "lock") {
  return detectionCapRank(right) < detectionCapRank(left) ? right : left;
}

export function getBattleArmorMachineTargetProfile(actor = null, options = {}) {
  const activeArmor = getEquippedBattleArmor(actor, options);
  const profile = normalizeBattleArmorProfile(activeArmor?.battleArmor);
  if (!isBattleArmorProfileEnabled(profile)) return null;

  const state = deriveBattleArmorState(profile);
  const stealthEnabled = Boolean(profile.systems?.stealth?.enabled);
  const stealthCountered = stealthEnabled && battleArmorStealthIsCountered(actor, profile, options);
  const attached = Boolean(profile.attachedToTokenUuid);
  const friendlyMachineTokenUuid = String(options.friendlyMachineTokenUuid ?? "").trim();
  const attachedToFriendlyMachine = attached && (
    Boolean(options.attachedToFriendlyMachine)
    || (friendlyMachineTokenUuid && profile.attachedToTokenUuid === friendlyMachineTokenUuid)
  );
  const normalPenalty = BATTLE_ARMOR_MACHINE_TARGET_BASE_PENALTY;
  const stealthPenalty = stealthEnabled && !stealthCountered
    ? nonNegativeInteger(profile.machineTargetProfile?.stealthTrackingPenalty, profile.systems.stealth.trackingPenalty)
    : 0;
  const attachedPenalty = attachedToFriendlyMachine ? 2 : (attached ? 1 : 0);
  const cap = stealthEnabled && !stealthCountered
    ? (profile.machineTargetProfile?.detectionStateCap ?? profile.systems?.stealth?.detectionStateCap ?? "track")
    : null;

  return {
    armorId: activeArmor.id ?? activeArmor.armorId ?? "",
    armorName: activeArmor.name ?? "Battle Armor",
    state,
    machineTargetable: profile.machineTargetProfile?.machineTargetable !== false && state !== BATTLE_ARMOR_STATES.wrecked,
    targetClass: profile.machineTargetProfile?.targetClass ?? "battleArmor",
    signature: profile.machineTargetProfile?.signature ?? "low",
    trackingPenalty: normalPenalty + stealthPenalty + attachedPenalty,
    normalPenalty,
    stealthPenalty,
    attachedPenalty,
    detectionStateCap: cap,
    stealthEnabled,
    stealthCountered,
    attached,
    attachedToTokenUuid: profile.attachedToTokenUuid,
    attachedToFriendlyMachine,
    friendlyFireRisk: attachedToFriendlyMachine,
  };
}

export function shouldRouteBattleArmorHarm(actor = null, payload = {}) {
  if (!getEquippedBattleArmor(actor)) return false;
  const mode = String(payload?.mode ?? "").trim();
  if (mode === "attackDamage") return true;
  if (mode !== "trackDelta") return false;
  if (String(payload?.track ?? "physical").trim() !== "physical") return false;
  if (!payload?.useArmor) return false;
  if (!String(payload?.damageType ?? "").trim()) return false;
  const source = String(payload?.sourceKind ?? payload?.sourceType ?? payload?.source ?? "").trim().toLowerCase();
  return source !== "internal" && source !== "direct";
}

export function previewBattleArmorDamage(profileInput = {}, { damage = 0, sourceScale = "personal" } = {}) {
  const profile = normalizeBattleArmorProfile(profileInput);
  const scale = normalizeDamageSourceScale(sourceScale);
  const scaleConversion = buildDamageScaleConversion({
    damage: number(damage, 0),
    sourceScale: scale,
    targetScale: "personal",
  });
  const multiplier = scaleConversion.factor;
  let remaining = Math.max(0, Math.ceil(scaleConversion.converted));
  const armorBefore = profile.armorPool.value;
  const structureBefore = profile.structure.value;
  const hadArmorShellAtStart = armorBefore > 0;
  let armorAbsorbed = 0;
  let structureReduced = 0;
  let structureDegraded = false;

  if (remaining > 0 && profile.armorPool.value > 0) {
    armorAbsorbed = Math.min(remaining, profile.armorPool.value);
    profile.armorPool.value -= armorAbsorbed;
    remaining -= armorAbsorbed;
  }

  const resistance = getBattleArmorStructureResistance(profile);
  if (remaining > 0 && profile.structure.value > 0) {
    structureReduced = Math.min(remaining, resistance);
    remaining = Math.max(0, remaining - resistance);
    if (structureReduced > 0) {
      structureDegraded = true;
      profile.structure.value = Math.max(0, profile.structure.value - 1);
    }
  }

  profile.state = deriveBattleArmorState(profile);

  return {
    sourceScale: scale,
    targetScale: "personal",
    multiplier,
    scaleConversion,
    incomingOriginal: Math.max(0, Math.ceil(scaleConversion.original)),
    incomingScaled: Math.max(0, Math.ceil(scaleConversion.converted)),
    hadArmorShellAtStart,
    armorBefore,
    armorAfter: profile.armorPool.value,
    armorAbsorbed,
    structureBefore,
    structureAfter: profile.structure.value,
    structureResistance: resistance,
    structureReduced,
    structureDegraded,
    wearerDamage: remaining,
    stateBefore: deriveBattleArmorState({ armorPool: { value: armorBefore }, structure: { value: structureBefore } }),
    stateAfter: profile.state,
    profile,
  };
}

export function buildBattleArmorItemUpdate(preview = {}) {
  return {
    "system.battleArmor.armorPool.value": nonNegativeInteger(preview.armorAfter, 0),
    "system.battleArmor.structure.value": nonNegativeInteger(preview.structureAfter, 0),
    "system.battleArmor.state": String(preview.stateAfter ?? "").trim() || BATTLE_ARMOR_STATES.wrecked,
  };
}

export function buildBattleArmorSheetContext(actor = null) {
  const activeArmor = getEquippedBattleArmor(actor);
  const profile = normalizeBattleArmorProfile(activeArmor?.battleArmor);
  if (!isBattleArmorProfileEnabled(profile)) return { enabled: false, hasSuit: false };
  const mounted = getMountedBattleArmorItems(actor, activeArmor.id ?? activeArmor.armorId);
  const targetProfile = getBattleArmorMachineTargetProfile(actor) ?? {};
  return {
    enabled: true,
    hasSuit: true,
    armorId: activeArmor.id ?? "",
    name: activeArmor.name ?? "Battle Armor",
    img: activeArmor.img ?? "",
    suit: {
      id: activeArmor.id ?? "",
      uuid: activeArmor.uuid ?? "",
      name: activeArmor.name ?? "Battle Armor",
      img: activeArmor.img ?? "",
    },
    state: deriveBattleArmorState(profile),
    stateLabel: deriveBattleArmorState(profile).replace(/^./, char => char.toUpperCase()),
    armorPool: clone(profile.armorPool),
    structure: clone(profile.structure),
    structureResistance: getBattleArmorStructureResistance(profile),
    systems: {
      stealth: normalizeBattleArmorStealth(profile.systems?.stealth),
      jump: Boolean(profile.systems?.jump),
      enhancedStrength: Boolean(profile.systems?.enhancedStrength),
      sealed: Boolean(profile.systems?.sealed),
      basicSensors: Boolean(profile.systems?.basicSensors),
      medicalSuppression: Boolean(profile.systems?.medicalSuppression),
      attachedEligible: Boolean(profile.systems?.attachedEligible),
    },
    systemTags: [
      profile.systems?.stealth?.enabled ? "Stealth Armor" : "",
      profile.systems?.jump ? "Jump Capable" : "",
      profile.systems?.sealed ? "Sealed" : "",
      profile.systems?.enhancedStrength ? "Enhanced Strength" : "",
      profile.systems?.basicSensors ? "Basic Sensors" : "",
    ].filter(Boolean).map(label => ({ label })),
    machineTargetProfile: targetProfile,
    mountedItems: mounted.map(entry => {
      const isWeapon = entry.type === "personalWeapon";
      const effect = String(entry.combatProfile?.resolution?.onHitEffect ?? "").trim();
      return {
        id: entry.id,
        uuid: entry.uuid,
        name: entry.name,
        img: entry.img,
        type: entry.type,
        scale: entry.combatProfile?.scale ?? entry.system?.scale ?? "personal",
        effect,
        isWeapon,
        actionLabel: effect === "tagged" || effect === "narced" ? "Designate" : "Attack",
        attackRoll: isWeapon ? JSON.stringify({
          intent: "attack",
          weaponId: entry.id,
          edge: { pool: "physical.grit", allowed: ["pre", "post"] },
          tags: ["combat", "attack", "battleArmor"],
        }) : "",
      };
    }),
    attachedToTokenUuid: profile.attachedToTokenUuid ?? "",
    attachedLocationHint: profile.attachedLocationHint ?? "",
    revealed: actor?.statuses?.has?.(BATTLE_ARMOR_STATUSES.revealed) ?? false,
  };
}
