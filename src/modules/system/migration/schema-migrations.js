// src/modules/system/migration/schema-migrations.js
/**
 * @pipeline shared
 * @role The versioned registry of persisted-data upgrades. Each schema step
 *   turns plain document snapshots into a list of field operations; it never
 *   touches Foundry documents. The data schema version is an integer
 *   independent of the system.json package version (docs/migrations.md).
 * @invariants
 *   - INVARIANT(canonical): the only place persisted document shapes are
 *     upgraded; runtime code reads current shapes (§6.2).
 *   - Every transform is gated on a legacy marker, so a plan built from
 *     already-migrated data is empty (re-running is safe).
 *   - Data that cannot be classified safely produces a GM review entry, never
 *     a guessed operation (§14).
 * @downstream migration-runner.js (executes and verifies the operations)
 */

import {
  MACHINE_DEPLETING_MONITORS,
  MACHINE_MONITOR_STORAGE_FLAG,
  MACHINE_MONITOR_STORAGE_REMAINING_V1,
} from "../../mwd/machine-monitors.js";
import { migrateLegacyArmorMitigation } from "../../mwd/personal-damage.js";
import { cloneValue } from "../../utils/clone.js";
import { toNumber } from "../../utils/coercion.js";

const CHARACTER_TYPES = new Set(["character", "npc"]);
const MACHINE_TYPES = new Set(["vehicle", "battlemech"]);
// Guts template default (template.json "attribute-guts"); a stored Guts at this
// value is indistinguishable from an untouched default.
const GUTS_TEMPLATE_DEFAULT = 1;
const LEGACY_MECH_WEAPON_FIELDS = Object.freeze(["hardpointId", "hardpointType", "hardpointSize", "mountLocation"]);
// Per-vehicle terrain preference lists, superseded by the terrain mobility
// matrix (terrain/terrain-catalog.js) in 0.7.1; nothing reads them.
const LEGACY_VEHICLE_TERRAIN_FIELDS = Object.freeze(["favoredTerrain", "adverseTerrain"]);

const itemType = item => String(item?.type ?? "").trim();

function operation(target, set = {}, unset = []) {
  if (!Object.keys(set).length && !unset.length) return null;
  return { ...target, set, unset };
}

function review(step, label, message) {
  return { step, document: label, message };
}

// ---------------------------------------------------------------------------
// Machine monitor storage: damage-taken -> remaining capacity.
// Actors created before 2026-05-17 store armor/structure as damage taken and
// carry no storage flag; newer actors are stamped "remaining-v1" on create.

export function classifyMachineMonitorStorage(monitors = {}, fallbackMonitors = {}) {
  const entries = MACHINE_DEPLETING_MONITORS
    .map(id => {
      const value = monitors?.[id]?.value;
      const max = toNumber(monitors?.[id]?.max ?? fallbackMonitors?.[id]?.max, 0);
      return { id, value, max };
    })
    .filter(entry => entry.value !== undefined && entry.max > 0);

  if (!entries.length) return { state: "empty", values: {} };
  const values = entries.map(entry => toNumber(entry.value, 0));
  if (values.every(value => value <= 0)) {
    // Zero damage taken: an untouched legacy machine. Converts to full capacity.
    return {
      state: "legacyUndamaged",
      values: Object.fromEntries(entries.map(entry => [entry.id, entry.max])),
    };
  }
  if (entries.every(entry => toNumber(entry.value, 0) >= entry.max)) {
    return { state: "remaining", values: {} };
  }
  return {
    state: "ambiguous",
    values: {},
    detail: entries.map(entry => `${entry.id} ${toNumber(entry.value, 0)}/${entry.max}`).join(", "),
  };
}

const monitorFlagOf = source => source?.flags?.mwd?.[MACHINE_MONITOR_STORAGE_FLAG] ?? "";

function planMachineMonitorStorage({ actors, scenes }) {
  const step = "machineMonitorStorage";
  const operations = [];
  const reviews = [];
  const legacyActorIds = new Set();

  for (const actor of actors) {
    if (!MACHINE_TYPES.has(actor.type)) continue;
    if (monitorFlagOf(actor) === MACHINE_MONITOR_STORAGE_REMAINING_V1) continue;
    legacyActorIds.add(actor._id);

    const result = classifyMachineMonitorStorage(actor.system?.monitors);
    if (result.state === "ambiguous") {
      reviews.push(review(step, `Actor ${actor.name}`, `Partially damaged legacy monitors (${result.detail}); stored as damage taken or remaining capacity cannot be determined. Left unchanged and unflagged — correct the values on the sheet, then re-run the migration.`));
      continue;
    }
    const set = { [`flags.mwd.${MACHINE_MONITOR_STORAGE_FLAG}`]: MACHINE_MONITOR_STORAGE_REMAINING_V1 };
    for (const [id, value] of Object.entries(result.values)) set[`system.monitors.${id}.value`] = value;
    operations.push(operation({ kind: "actor", actorId: actor._id, label: actor.name }, set));
  }

  const actorsById = new Map(actors.map(actor => [actor._id, actor]));
  for (const scene of scenes) {
    for (const token of scene.tokens ?? []) {
      if (token.actorLink || !legacyActorIds.has(token.actorId)) continue;
      const delta = token.delta ?? {};
      if (monitorFlagOf(delta)) continue;
      const deltaMonitors = delta.system?.monitors;
      if (!deltaMonitors) continue;
      const base = actorsById.get(token.actorId);
      const result = classifyMachineMonitorStorage(deltaMonitors, base?.system?.monitors);
      const label = `Token ${token.name ?? token._id} (scene ${scene.name})`;
      if (result.state === "ambiguous") {
        reviews.push(review(step, label, `Partially damaged unlinked-token monitors (${result.detail}); left unchanged.`));
        continue;
      }
      const set = {};
      for (const [id, value] of Object.entries(result.values)) set[`delta.system.monitors.${id}.value`] = value;
      const op = operation({ kind: "token", sceneId: scene._id, tokenId: token._id, label }, set);
      if (op) operations.push(op);
    }
  }

  return { operations, reviews };
}

// ---------------------------------------------------------------------------
// Willpower -> Guts (attribute rename shipped 2026-05-30).

export function planGutsRename(attributes = {}) {
  if (!Object.hasOwn(attributes ?? {}, "willpower")) return { set: {}, unset: [], conflict: null };
  const willpower = attributes.willpower;
  const guts = attributes.guts;
  const gutsValue = guts?.value;
  const willpowerValue = willpower?.value;
  const gutsIsDefault = gutsValue === undefined || toNumber(gutsValue, GUTS_TEMPLATE_DEFAULT) === GUTS_TEMPLATE_DEFAULT;

  if (gutsIsDefault || toNumber(gutsValue) === toNumber(willpowerValue)) {
    return { set: { guts: cloneValue(willpower) }, unset: ["willpower"], conflict: null };
  }
  return {
    set: {},
    unset: [],
    conflict: `Willpower ${toNumber(willpowerValue)} and Guts ${toNumber(gutsValue)} both hold non-default values. Left both in place — set Guts on the sheet, then re-run the migration.`,
  };
}

function prefixPaths(plan, prefix) {
  return {
    set: Object.fromEntries(Object.entries(plan.set).map(([key, value]) => [`${prefix}.${key}`, value])),
    unset: plan.unset.map(key => `${prefix}.${key}`),
  };
}

function planWillpowerToGuts({ actors, items, scenes }) {
  const step = "willpowerToGuts";
  const operations = [];
  const reviews = [];
  const skillUpdate = item => (itemType(item) === "skill" && item.system?.attribute === "willpower"
    ? { "system.attribute": "guts" }
    : null);

  for (const actor of actors) {
    if (CHARACTER_TYPES.has(actor.type)) {
      const plan = planGutsRename(actor.system?.attributes);
      if (plan.conflict) reviews.push(review(step, `Actor ${actor.name}`, plan.conflict));
      const { set, unset } = prefixPaths(plan, "system.attributes");
      const op = operation({ kind: "actor", actorId: actor._id, label: actor.name }, set, unset);
      if (op) operations.push(op);
    }
    for (const item of actor.items ?? []) {
      const set = skillUpdate(item);
      if (set) operations.push(operation({ kind: "actorItem", actorId: actor._id, itemId: item._id, label: `${actor.name} / ${item.name}` }, set));
    }
  }

  for (const item of items) {
    const set = skillUpdate(item);
    if (set) operations.push(operation({ kind: "worldItem", itemId: item._id, label: item.name }, set));
  }

  const actorTypes = new Map(actors.map(actor => [actor._id, actor.type]));
  for (const scene of scenes) {
    for (const token of scene.tokens ?? []) {
      if (token.actorLink || !CHARACTER_TYPES.has(actorTypes.get(token.actorId))) continue;
      const label = `Token ${token.name ?? token._id} (scene ${scene.name})`;
      const attributes = token.delta?.system?.attributes;
      if (attributes) {
        const plan = planGutsRename(attributes);
        if (plan.conflict) reviews.push(review(step, label, plan.conflict));
        const { set, unset } = prefixPaths(plan, "delta.system.attributes");
        const op = operation({ kind: "token", sceneId: scene._id, tokenId: token._id, label }, set, unset);
        if (op) operations.push(op);
      }
      if ((token.delta?.items ?? []).some(skillUpdate)) {
        reviews.push(review(step, label, "Unlinked token carries its own Willpower-based skill items; update them from the token's sheet."));
      }
    }
  }

  return { operations, reviews };
}

// ---------------------------------------------------------------------------
// Legacy mech-weapon mount fields -> hardpoint ownership (13.13 data shape).
// Runtime prep already ignores the stale fields; only the hardpoint link would
// be lost, so link first, then remove the fields.

function legacyMechWeaponUnset(system = {}) {
  return LEGACY_MECH_WEAPON_FIELDS.filter(field => Object.hasOwn(system ?? {}, field)).map(field => `system.${field}`);
}

function planLegacyHardpointLink({ actors, items }) {
  const operations = [];
  const reviews = [];

  for (const actor of actors) {
    const weapons = (actor.items ?? []).filter(item => itemType(item) === "mechWeapon");
    if (!weapons.length) continue;
    const hardpoints = Array.isArray(actor.system?.mwd?.hardpoints) ? cloneValue(actor.system.mwd.hardpoints) : [];
    let linked = false;

    for (const weapon of weapons) {
      const legacyId = String(weapon.system?.hardpointId ?? "").trim();
      if (legacyId && MACHINE_TYPES.has(actor.type)) {
        const hardpoint = hardpoints.find(entry => String(entry?.id ?? "").trim() === legacyId);
        if (hardpoint && !String(hardpoint.itemId ?? "").trim()) {
          hardpoint.itemId = weapon._id;
          linked = true;
        } else if (!hardpoint) {
          reviews.push(review("legacyHardpointLink", `${actor.name} / ${weapon.name}`, `Legacy hardpoint "${legacyId}" no longer exists; weapon is unmounted.`));
        }
      }
      const unset = legacyMechWeaponUnset(weapon.system);
      const op = operation({ kind: "actorItem", actorId: actor._id, itemId: weapon._id, label: `${actor.name} / ${weapon.name}` }, {}, unset);
      if (op) operations.push(op);
    }

    if (linked) {
      operations.push(operation({ kind: "actor", actorId: actor._id, label: actor.name }, { "system.mwd.hardpoints": hardpoints }));
    }
  }

  for (const item of items) {
    if (itemType(item) !== "mechWeapon") continue;
    const op = operation({ kind: "worldItem", itemId: item._id, label: item.name }, {}, legacyMechWeaponUnset(item.system));
    if (op) operations.push(op);
  }

  return { operations, reviews };
}

// ---------------------------------------------------------------------------
// Legacy armor `mitigation` -> typed `mitigationByType` (13.7 data shape).
// Nothing at runtime reads the legacy key, so unmigrated armor silently loses
// its typed resistances.

function planArmorUpdate(system = {}) {
  if (!Object.hasOwn(system ?? {}, "mitigation")) return null;
  const set = {};
  const existing = system.mitigationByType;
  const hasTyped = existing && Object.values(existing).some(value => toNumber(value, 0) !== 0);
  if (!hasTyped) set["system.mitigationByType"] = migrateLegacyArmorMitigation(system.mitigation);
  return { set, unset: ["system.mitigation"] };
}

function planLegacyArmorMitigation({ actors, items }) {
  const operations = [];
  for (const actor of actors) {
    for (const item of actor.items ?? []) {
      if (itemType(item) !== "armor") continue;
      const plan = planArmorUpdate(item.system);
      if (plan) operations.push(operation({ kind: "actorItem", actorId: actor._id, itemId: item._id, label: `${actor.name} / ${item.name}` }, plan.set, plan.unset));
    }
  }
  for (const item of items) {
    if (itemType(item) !== "armor") continue;
    const plan = planArmorUpdate(item.system);
    if (plan) operations.push(operation({ kind: "worldItem", itemId: item._id, label: item.name }, plan.set, plan.unset));
  }
  return { operations, reviews: [] };
}

// ---------------------------------------------------------------------------
// Vehicle terrain lists (schema 2): remove the inert favored / adverse terrain
// lists from vehicles and from unlinked vehicle-token deltas. Marker: the
// field is present.
function legacyVehicleTerrainUnset(mwd = {}, prefix = "system.mwd") {
  return LEGACY_VEHICLE_TERRAIN_FIELDS.filter(field => Object.hasOwn(mwd ?? {}, field)).map(field => `${prefix}.${field}`);
}

function planLegacyVehicleTerrainLists({ actors, scenes }) {
  const operations = [];
  const vehicleIds = new Set();
  for (const actor of actors) {
    if (actor.type !== "vehicle") continue;
    vehicleIds.add(actor._id);
    const op = operation({ kind: "actor", actorId: actor._id, label: actor.name }, {}, legacyVehicleTerrainUnset(actor.system?.mwd));
    if (op) operations.push(op);
  }
  for (const scene of scenes) {
    for (const token of scene.tokens ?? []) {
      if (token.actorLink || !vehicleIds.has(token.actorId)) continue;
      const label = `Token ${token.name ?? token._id} (scene ${scene.name})`;
      const op = operation({ kind: "token", sceneId: scene._id, tokenId: token._id, label }, {}, legacyVehicleTerrainUnset(token.delta?.system?.mwd, "delta.system.mwd"));
      if (op) operations.push(op);
    }
  }
  return { operations, reviews: [] };
}

// ---------------------------------------------------------------------------
// Step registry.

function planBaselineV1(world) {
  const parts = [
    planMachineMonitorStorage(world),
    planWillpowerToGuts(world),
    planLegacyHardpointLink(world),
    planLegacyArmorMitigation(world),
  ];
  return {
    operations: parts.flatMap(part => part.operations).filter(Boolean),
    reviews: parts.flatMap(part => part.reviews),
  };
}

export const SCHEMA_MIGRATIONS = Object.freeze([
  Object.freeze({
    version: 1,
    id: "baseline-2026-10",
    label: "Baseline upgrade (monitor storage, Guts rename, hardpoint links, typed armor)",
    plan: planBaselineV1,
  }),
  Object.freeze({
    version: 2,
    id: "vehicle-terrain-lists-2026-10",
    label: "Remove vehicle favored/adverse terrain lists (replaced by the terrain mobility matrix)",
    plan: planLegacyVehicleTerrainLists,
  }),
]);

export const CURRENT_SCHEMA_VERSION = SCHEMA_MIGRATIONS.at(-1).version;

export function getPendingSchemaSteps(fromVersion) {
  const from = Number(fromVersion);
  if (!Number.isInteger(from) || from < 0) {
    throw new Error(`Unsupported MWD data schema version: ${fromVersion}`);
  }
  if (from > CURRENT_SCHEMA_VERSION) {
    throw new Error(`World data schema ${from} is newer than this system supports (${CURRENT_SCHEMA_VERSION}). Update the MWD system before loading this world.`);
  }
  return SCHEMA_MIGRATIONS.filter(step => step.version > from);
}

/**
 * Plan one schema step against a plain-data snapshot.
 * @param {object} step                 An entry of SCHEMA_MIGRATIONS.
 * @param {object} world
 * @param {object[]} world.actors       Actor source objects with embedded `items`.
 * @param {object[]} world.items        World Item source objects.
 * @param {object[]} world.scenes       Scene source objects with embedded `tokens`.
 * @returns {{version:number, id:string, operations:object[], reviews:object[]}}
 */
export function planSchemaStep(step, { actors = [], items = [], scenes = [] } = {}) {
  const { operations, reviews } = step.plan({ actors, items, scenes });
  return { version: step.version, id: step.id, operations, reviews };
}
