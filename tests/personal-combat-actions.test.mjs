import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

function deepClone(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function mergeObject(target = {}, source = {}, { inplace = true, overwrite = true } = {}) {
  const output = inplace ? target : deepClone(target);
  for (const [key, value] of Object.entries(source ?? {})) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      output[key] = mergeObject(output[key] ?? {}, value, { inplace: false, overwrite });
      continue;
    }
    if (overwrite || !(key in output)) output[key] = deepClone(value);
  }
  return output;
}

let dialogQueue = [];
let createdMessages = [];

function setupFoundry() {
  dialogQueue = [];
  createdMessages = [];

  globalThis.Item ??= class {};
  globalThis.foundry = {
    ...(globalThis.foundry ?? {}),
    utils: {
      ...(globalThis.foundry?.utils ?? {}),
      deepClone,
      duplicate: deepClone,
      mergeObject,
      escapeHTML: value => String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
    },
    applications: {
      ...(globalThis.foundry?.applications ?? {}),
      api: {
        ...(globalThis.foundry?.applications?.api ?? {}),
        ApplicationV2: class { static DEFAULT_OPTIONS = {}; },
        HandlebarsApplicationMixin: Base => Base,
        DialogV2: {
          async wait(config) {
            const values = dialogQueue.shift() ?? {};
            const form = {
              querySelector(selector) {
                const name = String(selector ?? "").match(/\[name="([^"]+)"\]/)?.[1] ?? "";
                return { value: values[name] ?? "" };
              },
            };
            return config.buttons?.[0]?.callback?.({}, { form }) ?? null;
          },
        },
      },
      handlebars: {
        ...(globalThis.foundry?.applications?.handlebars ?? {}),
        loadTemplates: async () => [],
        renderTemplate: async () => "",
      },
    },
  };
  globalThis.Hooks = { on() {}, off() {} };
  globalThis.CONFIG = { statusEffects: [] };
  globalThis.CONST ??= { ACTIVE_EFFECT_MODES: { ADD: 2 } };
  globalThis.ui = { notifications: { warn() {}, error() {}, info() {} } };
  globalThis.canvas = { scene: { id: "scene-1" }, tokens: { controlled: [], placeables: [] } };
  globalThis.game = {
    user: { id: "user-1", isGM: true, targets: new Set() },
    combat: null,
    actors: new Map(),
    scenes: new Map(),
    mwd: { roll: { execute: async () => ({ ok: true }) } },
    system: { mwd: {} },
    settings: { get: () => null },
    i18n: { localize: value => value },
  };
  globalThis.ChatMessage = {
    getSpeaker: ({ actor } = {}) => ({ actor: actor?.id ?? null }),
    async create(data) {
      createdMessages.push(data);
      return data;
    },
  };
}

function queueDialog(values) {
  dialogQueue.push(values);
}

function makeActor() {
  return {
    id: "actor-1",
    uuid: "Actor.actor-1",
    type: "character",
    name: "Case",
    items: new Map(),
    statuses: new Set(),
    system: {
      attributes: {
        reflexes: { value: 4 },
        guts: { value: 4 },
        intelligence: { value: 3 },
      },
      skills: {
        perception: { rating: 2, bonus: 0 },
      },
      burn: { value: 6, overloaded: false },
    },
  };
}

function makeSnapshot(overrides = {}) {
  return mergeObject({
    hasCombatant: true,
    isCurrentTurn: true,
    overloaded: false,
    burn: { canOverloadCheck: true },
    combatant: { id: "self" },
    combat: {
      combatants: [
        { id: "self", name: "Case" },
        {
          id: "ally",
          name: "Ally",
          actor: { uuid: "Actor.ally", name: "Ally" },
          token: { uuid: "Scene.scene-1.Token.ally", name: "Ally" },
        },
      ],
    },
    state: {
      faRemaining: 1,
      raRemaining: 1,
      saRemaining: 5,
      saSpentThisActivation: 0,
      pendingReaction: null,
      actionState: {
        aim: null,
        preparedInterrupt: null,
      },
    },
  }, overrides, { inplace: false, overwrite: true });
}

async function importModules() {
  setupFoundry();
  const actions = await import("../src/modules/combat/personal-combat-actions.js");
  const tracker = await import("../src/modules/combat/personal-combat-tracker.js");
  return { ...actions, PersonalCombatTracker: tracker.PersonalCombatTracker };
}

test("legacy personal combat handler names normalize to central intents", async () => {
  const { buildCombatActionPayloadFromDataset } = await importModules();

  const target = action => ({ dataset: { combatAction: action } });
  assert.deepEqual(
    buildCombatActionPayloadFromDataset({ handler: "combatEvade", target: target("") }),
    { intent: "combatAction", actionId: "evade" }
  );
  assert.deepEqual(
    buildCombatActionPayloadFromDataset({ handler: "combatAttack", target: target("opportunity") }),
    { intent: "combatAction", actionId: "opportunity" }
  );
  assert.deepEqual(
    buildCombatActionPayloadFromDataset({ handler: "combatFirstAid", target: target("") }),
    { intent: "combatAction", actionId: "firstAid" }
  );
  assert.deepEqual(
    buildCombatActionPayloadFromDataset({
      handler: "combatSpend",
      target: { dataset: { combatAction: "move", resource: "sa", cost: "1", combatLabel: "Move", combatCostLabel: "1 SA" } },
    }),
    { intent: "combatSpend", actionId: "move", resource: "sa", cost: 1, actionLabel: "Move", actionCostLabel: "1 SA" }
  );
});

test("Prepare prompts for metadata and applies action state through the executor", async () => {
  const {
    executeCombatActionIntent,
    PersonalCombatTracker,
  } = await importModules();
  const actor = makeActor();
  const snapshot = makeSnapshot();
  const original = {
    getSnapshot: PersonalCombatTracker.getSnapshot,
    spendResource: PersonalCombatTracker.spendResource,
    applyActionState: PersonalCombatTracker._applyActionState,
  };
  const spends = [];
  const states = [];

  PersonalCombatTracker.getSnapshot = () => snapshot;
  PersonalCombatTracker.spendResource = async (_actor, request) => {
    spends.push(request);
    return { ok: true, costPaid: true, costLabel: "Free", snapshot };
  };
  PersonalCombatTracker._applyActionState = async (_actor, request) => {
    states.push(request);
    return { ok: true };
  };
  queueDialog({ condition: "when attacked", scope: "shoot back" });

  try {
    const result = await executeCombatActionIntent({ actor, payload: { intent: "combatAction", actionId: "prepare" } });

    assert.equal(result.ok, true);
    assert.equal(spends[0]?.actionId, "prepare");
    assert.equal(states[0]?.actionId, "prepare");
    assert.deepEqual(states[0]?.metadata, { condition: "when attacked", scope: "shoot back" });
  } finally {
    PersonalCombatTracker.getSnapshot = original.getSnapshot;
    PersonalCombatTracker.spendResource = original.spendResource;
    PersonalCombatTracker._applyActionState = original.applyActionState;
  }
});

test("Spot for Indirect Fire is gated by equipped spotter-tagged gear", async () => {
  const {
    executeCombatActionIntent,
    PersonalCombatTracker,
  } = await importModules();
  const actor = makeActor();
  const snapshot = makeSnapshot();
  const original = {
    getSnapshot: PersonalCombatTracker.getSnapshot,
    previewResourceSpend: PersonalCombatTracker.previewResourceSpend,
    spendResource: PersonalCombatTracker.spendResource,
    applyActionState: PersonalCombatTracker._applyActionState,
  };
  const rolls = [];
  const spends = [];
  const states = [];
  const targetToken = {
    id: "target-token",
    uuid: "Scene.scene-1.Token.target-token",
    name: "Target",
    actor: { id: "target-actor", name: "Target", statuses: new Set(), system: {} },
    document: { id: "target-token", uuid: "Scene.scene-1.Token.target-token", name: "Target" },
  };
  globalThis.game.user.targets = new Set([targetToken]);
  globalThis.game.mwd.roll.execute = async request => {
    rolls.push(request);
    return { ok: true, resolved: { intent: "spotIndirect" } };
  };
  PersonalCombatTracker.getSnapshot = () => snapshot;
  PersonalCombatTracker.previewResourceSpend = () => ({ ok: true });
  PersonalCombatTracker.spendResource = async (_actor, request) => {
    spends.push(request);
    return { ok: true, costPaid: true, costLabel: request.actionCostLabel ?? "", snapshot };
  };
  PersonalCombatTracker._applyActionState = async (_actor, request) => {
    states.push(request);
    return { ok: true };
  };

  try {
    const blocked = await executeCombatActionIntent({ actor, payload: { intent: "combatAction", actionId: "spotIndirect" } });
    assert.equal(blocked.ok, false);
    assert.equal(blocked.reason, "Requires equipped spotting gear.");
    assert.equal(rolls.length, 0);

    actor.items.set("spotter-kit", {
      id: "spotter-kit",
      uuid: "Actor.actor-1.Item.spotter-kit",
      name: "Forward Observer Kit",
      type: "gear",
      canonicalType: "gear",
      system: {
        equipped: false,
        quantity: 1,
        tags: ["spotter"],
        rules: [],
      },
    });

    const unequipped = await executeCombatActionIntent({ actor, payload: { intent: "combatAction", actionId: "spotIndirect" } });
    assert.equal(unequipped.ok, false);
    assert.equal(unequipped.reason, "Requires equipped spotting gear.");
    assert.equal(rolls.length, 0);

    actor.items.get("spotter-kit").system.equipped = true;

    const allowed = await executeCombatActionIntent({ actor, payload: { intent: "combatAction", actionId: "spotIndirect" } });
    assert.equal(allowed.ok, true);
    assert.equal(rolls.length, 1);
    assert.equal(rolls[0].payload.intent, "spotIndirect");
    assert.equal(rolls[0].payload.personalSpotter, true);
    assert.equal(rolls[0].payload.targetTokenUuid, "Scene.scene-1.Token.target-token");
    assert.equal(spends[0].actionId, "spotIndirect");
    assert.equal(spends[0].cost, 2);
    assert.equal(states[0].actionId, "spotIndirect");
  } finally {
    PersonalCombatTracker.getSnapshot = original.getSnapshot;
    PersonalCombatTracker.previewResourceSpend = original.previewResourceSpend;
    PersonalCombatTracker.spendResource = original.spendResource;
    PersonalCombatTracker._applyActionState = original.applyActionState;
  }
});

test("Assist and Interrupt own prompts, reaction spend, state, and chat cards in the executor", async () => {
  const {
    executeCombatActionIntent,
    PersonalCombatTracker,
  } = await importModules();
  const actor = makeActor();
  const preparedInterrupt = { condition: "enemy moves", scope: "fire" };
  const assistSnapshot = makeSnapshot({ isCurrentTurn: false });
  const interruptSnapshot = makeSnapshot({
    isCurrentTurn: false,
    state: { actionState: { preparedInterrupt } },
  });
  const snapshots = [assistSnapshot, interruptSnapshot];
  const original = {
    getSnapshot: PersonalCombatTracker.getSnapshot,
    commitReactionSpend: PersonalCombatTracker.commitReactionSpend,
    applyActionState: PersonalCombatTracker._applyActionState,
    clearPreparedInterrupt: PersonalCombatTracker.clearPreparedInterrupt,
  };
  const spends = [];
  const states = [];
  let cleared = false;

  PersonalCombatTracker.getSnapshot = () => snapshots.shift();
  PersonalCombatTracker.commitReactionSpend = async (_actor, request) => {
    spends.push(request);
    return { ok: true, costPaid: true, costLabel: "1 RA" };
  };
  PersonalCombatTracker._applyActionState = async (_actor, request) => {
    states.push(request);
    return { ok: true };
  };
  PersonalCombatTracker.clearPreparedInterrupt = async () => {
    cleared = true;
    return { ok: true };
  };
  queueDialog({ combatant: "ally" });
  queueDialog({});

  try {
    const assist = await executeCombatActionIntent({ actor, payload: { intent: "combatAction", actionId: "assist" } });
    const interrupt = await executeCombatActionIntent({ actor, payload: { intent: "combatAction", actionId: "interrupt" } });

    assert.equal(assist.ok, true);
    assert.equal(interrupt.ok, true);
    assert.deepEqual(spends.map(spend => spend.actionId), ["assist", "interrupt"]);
    assert.equal(states[0]?.metadata?.targetCombatantId, "ally");
    assert.deepEqual(states[1]?.metadata, preparedInterrupt);
    assert.equal(cleared, true);
    assert.equal(createdMessages.length, 2);
    assert.match(createdMessages[0].content, /assists <strong>Ally<\/strong>/);
    assert.match(createdMessages[1].content, /resolves a prepared interrupt/);
  } finally {
    PersonalCombatTracker.getSnapshot = original.getSnapshot;
    PersonalCombatTracker.commitReactionSpend = original.commitReactionSpend;
    PersonalCombatTracker._applyActionState = original.applyActionState;
    PersonalCombatTracker.clearPreparedInterrupt = original.clearPreparedInterrupt;
  }
});

test("roll, attack, reduce burn, and remove-log intents route through the central executor", async () => {
  const {
    executeCombatActionIntent,
    removeActivationLogEntryIntent,
    PersonalCombatTracker,
  } = await importModules();
  const actor = makeActor();
  const snapshot = makeSnapshot();
  const original = {
    getSnapshot: PersonalCombatTracker.getSnapshot,
    spendResource: PersonalCombatTracker.spendResource,
    reduceBurn: PersonalCombatTracker.reduceBurn,
    removeActivationLogEntry: PersonalCombatTracker.removeActivationLogEntry,
  };
  const rollPayloads = [];
  const spends = [];
  let reduced = false;
  let removed = null;

  game.mwd.roll.execute = async ({ payload }) => {
    rollPayloads.push(payload);
    return { total: 7 };
  };
  PersonalCombatTracker.getSnapshot = () => snapshot;
  PersonalCombatTracker.spendResource = async (_actor, request) => {
    spends.push(request);
    return { ok: true, costPaid: true, costLabel: request.actionCostLabel ?? "" };
  };
  PersonalCombatTracker.reduceBurn = async () => {
    reduced = true;
    return { ok: true };
  };
  PersonalCombatTracker.removeActivationLogEntry = async (_actor, request) => {
    removed = request;
    return { ok: true };
  };

  try {
    const roll = await executeCombatActionIntent({ actor, payload: { intent: "overload" } });
    const attack = await executeCombatActionIntent({ actor, payload: { intent: "combatAction", actionId: "attack" } });
    const reduce = await executeCombatActionIntent({ actor, payload: { intent: "combatAction", actionId: "reduceBurn" } });
    const remove = await removeActivationLogEntryIntent({ actor, index: 1 });

    assert.equal(roll.ok, true);
    assert.equal(attack.ok, true);
    assert.equal(reduce.ok, true);
    assert.equal(remove.ok, true);
    assert.deepEqual(rollPayloads.map(payload => payload.intent), ["overload", "attack"]);
    assert.equal(spends[0]?.actionId, "attack");
    assert.equal(spends[0]?.cost, 2);
    assert.equal(reduced, true);
    assert.deepEqual(removed, { token: null, index: 1 });
  } finally {
    PersonalCombatTracker.getSnapshot = original.getSnapshot;
    PersonalCombatTracker.spendResource = original.spendResource;
    PersonalCombatTracker.reduceBurn = original.reduceBurn;
    PersonalCombatTracker.removeActivationLogEntry = original.removeActivationLogEntry;
  }
});

test("suppression fire launches a region-backed automatic weapon attack and schedules unload", async () => {
  const {
    executeCombatActionIntent,
    PersonalCombatTracker,
  } = await importModules();
  const actor = makeActor();
  const weapon = {
    id: "weapon-1",
    uuid: "Actor.actor-1.Item.weapon-1",
    type: "personalWeapon",
    name: "Auto Rifle",
    actor,
    system: {
      equipped: true,
      selectedPayloadId: "standard",
      selectedPayloadKey: "",
      selectedPayloadUuid: "",
      standardTraits: ["Automatic"],
    },
    isPersonalWeapon: () => true,
    getCombatProfile: () => ({
      effects: { flags: ["automatic"] },
      payloadState: { activePayloadId: "standard" },
    }),
  };
  actor.items = [weapon];

  const snapshot = makeSnapshot();
  const original = {
    rollExecute: game.mwd.roll.execute,
    getSnapshot: PersonalCombatTracker.getSnapshot,
    spendResource: PersonalCombatTracker.spendResource,
    scheduleSuppressionUnload: PersonalCombatTracker.scheduleSuppressionUnload,
  };
  const payloads = [];
  const spends = [];
  const scheduled = [];

  game.mwd.roll.execute = async ({ payload }) => {
    payloads.push(payload);
    return { total: 8 };
  };
  PersonalCombatTracker.getSnapshot = () => snapshot;
  PersonalCombatTracker.spendResource = async (_actor, request) => {
    spends.push(request);
    return { ok: true, costPaid: true, costLabel: request.actionCostLabel ?? "", snapshot };
  };
  PersonalCombatTracker.scheduleSuppressionUnload = async (_actor, request) => {
    scheduled.push(request);
    return { ok: true };
  };
  queueDialog({ weaponId: "weapon-1", shape: "line", size: "12" });

  try {
    const result = await executeCombatActionIntent({ actor, payload: { intent: "combatAction", actionId: "suppressionFire" } });

    assert.equal(result.ok, true);
    assert.equal(payloads[0]?.suppressionFire?.active, true);
    assert.deepEqual(payloads[0]?.suppressionFire?.template, { shape: "line", size: 12, placement: "origin" });
    assert.equal(payloads[0]?.weaponId, "weapon-1");
    assert.equal(spends[0]?.actionId, "suppressionFire");
    assert.equal(spends[0]?.cost, 2);
    assert.deepEqual(scheduled[0], { token: null, weaponId: "weapon-1", weaponName: "Auto Rifle" });
  } finally {
    game.mwd.roll.execute = original.rollExecute;
    PersonalCombatTracker.getSnapshot = original.getSnapshot;
    PersonalCombatTracker.spendResource = original.spendResource;
    PersonalCombatTracker.scheduleSuppressionUnload = original.scheduleSuppressionUnload;
  }
});

test("suppressed actors cannot aim or prepare and clear suppression by moving", async () => {
  const {
    executeCombatActionIntent,
    PersonalCombatTracker,
  } = await importModules();
  const actor = makeActor();
  actor.statuses = new Set(["suppressed"]);
  let suppressedActive = true;
  actor.toggleStatusEffect = async (statusId, { active } = {}) => {
    if (statusId === "suppressed") suppressedActive = Boolean(active);
  };
  const snapshot = makeSnapshot();
  const original = {
    getSnapshot: PersonalCombatTracker.getSnapshot,
    spendResource: PersonalCombatTracker.spendResource,
    applyActionState: PersonalCombatTracker._applyActionState,
  };

  PersonalCombatTracker.getSnapshot = () => snapshot;
  PersonalCombatTracker.spendResource = async (_actor, request) => ({ ok: true, costPaid: true, costLabel: request.actionCostLabel ?? "", snapshot });
  PersonalCombatTracker._applyActionState = async () => ({ ok: true });

  try {
    const aim = await executeCombatActionIntent({ actor, payload: { intent: "combatAction", actionId: "aim" } });
    const prepare = await executeCombatActionIntent({ actor, payload: { intent: "combatAction", actionId: "prepare" } });
    const move = await executeCombatActionIntent({ actor, payload: { intent: "combatAction", actionId: "move" } });

    assert.equal(aim.ok, false);
    assert.match(aim.reason, /Suppressed/);
    assert.equal(prepare.ok, false);
    assert.match(prepare.reason, /Suppressed/);
    assert.equal(move.ok, true);
    assert.equal(suppressedActive, false);
  } finally {
    PersonalCombatTracker.getSnapshot = original.getSnapshot;
    PersonalCombatTracker.spendResource = original.spendResource;
    PersonalCombatTracker._applyActionState = original.applyActionState;
  }
});

test("cancelling a personal skill roll does not spend action economy", async () => {
  const {
    executeCombatActionIntent,
    PersonalCombatTracker,
  } = await importModules();
  const actor = makeActor();
  const snapshot = makeSnapshot();
  const original = {
    rollExecute: game.mwd.roll.execute,
    getSnapshot: PersonalCombatTracker.getSnapshot,
    previewResourceSpend: PersonalCombatTracker.previewResourceSpend,
    spendResource: PersonalCombatTracker.spendResource,
    applyActionState: PersonalCombatTracker._applyActionState,
  };
  const previews = [];
  const spends = [];
  const states = [];

  game.mwd.roll.execute = async () => null;
  PersonalCombatTracker.getSnapshot = () => snapshot;
  PersonalCombatTracker.previewResourceSpend = (_actor, request) => {
    previews.push(request);
    return { ok: true, snapshot, finalCost: request.cost };
  };
  PersonalCombatTracker.spendResource = async (_actor, request) => {
    spends.push(request);
    return { ok: true, costPaid: true, costLabel: request.actionCostLabel ?? "", snapshot };
  };
  PersonalCombatTracker._applyActionState = async (_actor, request) => {
    states.push(request);
    return { ok: true };
  };
  queueDialog({ skill: "piloting" });

  try {
    const result = await executeCombatActionIntent({ actor, payload: { intent: "combatAction", actionId: "useSkill" } });

    assert.equal(result.cancelled, true);
    assert.equal(result.costPaid, false);
    assert.equal(previews[0]?.actionId, "useSkill");
    assert.equal(spends.length, 0);
    assert.equal(states.length, 0);
  } finally {
    game.mwd.roll.execute = original.rollExecute;
    PersonalCombatTracker.getSnapshot = original.getSnapshot;
    PersonalCombatTracker.previewResourceSpend = original.previewResourceSpend;
    PersonalCombatTracker.spendResource = original.spendResource;
    PersonalCombatTracker._applyActionState = original.applyActionState;
  }
});

test("CharacterSheetV2 does not override inherited personal combat handlers", async () => {
  const source = await readFile(new URL("../src/modules/sheets/character-sheet-v2.js", import.meta.url), "utf8");
  for (const handler of [
    "combatIntent",
    "combatAction",
    "combatSpend",
    "combatAssist",
    "combatEvade",
    "combatInterrupt",
    "combatFirstAid",
    "combatReduceBurn",
    "combatOverloadCheck",
    "combatAttack",
    "removeActivationAction",
    "attackWeapon",
  ]) {
    assert.equal(
      source.includes(`${handler}: CharacterSheetV2.prototype`),
      false,
      `${handler} should be inherited from BaseActorSheetV2`
    );
  }
});
