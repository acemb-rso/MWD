import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

function setupSettings(initial = {}) {
  const store = structuredClone(initial);
  globalThis.foundry = {
    utils: {
      deepClone: value => structuredClone(value),
      randomID: () => "random-id",
    },
  };
  globalThis.game = {
    user: { id: "user-1" },
    settings: {
      get: (_system, key) => store[key],
      set: async (_system, key, value) => {
        store[key] = value;
        return value;
      },
    },
  };
  globalThis.canvas = { scene: { id: "scene-1" } };
  return store;
}

function makeSubject(tokenId = "token-1") {
  return {
    actor: { id: "actor-1" },
    token: { id: tokenId, parent: { id: "scene-1" } },
    actorId: "actor-1",
    tokenId,
    sceneId: "scene-1",
  };
}

test("situational presets normalize as namespaced once-only manual rows", async () => {
  setupSettings();
  const {
    buildSituationalPresetRow,
    getSituationalPresetGroups,
  } = await import("../src/modules/player/player-modifier-presets.js");

  const row = buildSituationalPresetRow({ id: "cover.light", label: "Light Cover", value: -1 });

  assert.deepEqual(row, {
    id: "situational:cover.light",
    label: "Light Cover",
    value: -1,
    enabled: true,
    consumeOnce: true,
    source: "systemPreset",
  });
  assert.ok(getSituationalPresetGroups().some(group => group.id === "cover"));
});

test("player presets normalize invalid rows and remain token-scoped", async () => {
  setupSettings();
  const {
    SETTING_PLAYER_GADGET_PRESETS,
    setPlayerModifierPresets,
    getPlayerModifierPresets,
  } = await import("../src/modules/player/player-modifier-presets.js");

  await setPlayerModifierPresets(makeSubject("token-a"), [
    { id: "good", label: "High Ground", value: "1", enabled: true, consumeOnce: false },
    { id: "bad", label: "", value: 2 },
    { id: "zero", label: "Zero", value: 0 },
  ]);
  await setPlayerModifierPresets(makeSubject("token-b"), [
    { id: "other", label: "Smoke", value: -1 },
  ]);

  const a = getPlayerModifierPresets(makeSubject("token-a"));
  const b = getPlayerModifierPresets(makeSubject("token-b"));

  assert.deepEqual(a.map(row => row.id), ["good"]);
  assert.deepEqual(b.map(row => row.id), ["other"]);
  assert.notDeepEqual(
    Object.values(game.settings.get("mwd", SETTING_PLAYER_GADGET_PRESETS))[0],
    Object.values(game.settings.get("mwd", SETTING_PLAYER_GADGET_PRESETS))[1]
  );
});

test("enabled presets inject into manual modifiers and disabled presets do not", async () => {
  setupSettings();
  const {
    applyPlayerModifierPresetsToPayload,
  } = await import("../src/modules/player/player-modifier-presets.js");

  const payload = applyPlayerModifierPresetsToPayload(
    { intent: "skill", manualModifiers: [{ id: "existing", label: "Existing", value: 1 }] },
    {
      subject: makeSubject(),
      rows: [
        { id: "enabled", label: "GM Bonus", value: 2, enabled: true },
        { id: "disabled", label: "Ignored", value: -2, enabled: false },
      ],
    }
  );

  assert.deepEqual(payload.manualModifiers, [
    { id: "existing", label: "Existing", value: 1 },
    { id: "enabled", label: "GM Bonus", value: 2 },
  ]);
});

test("once presets consume only after explicit consume call", async () => {
  setupSettings();
  const {
    setPlayerModifierPresets,
    getPlayerModifierPresets,
    consumeOncePlayerModifierPresets,
  } = await import("../src/modules/player/player-modifier-presets.js");
  const subject = makeSubject();
  await setPlayerModifierPresets(subject, [
    { id: "once", label: "Once", value: 1, enabled: true, consumeOnce: true },
    { id: "keep", label: "Keep", value: 1, enabled: true, consumeOnce: false },
    { id: "off", label: "Off", value: 1, enabled: false, consumeOnce: true },
  ]);

  assert.deepEqual(getPlayerModifierPresets(subject).map(row => row.id), ["once", "keep", "off"]);
  await consumeOncePlayerModifierPresets(subject);
  assert.deepEqual(getPlayerModifierPresets(subject).map(row => row.id), ["keep", "off"]);
});

test("roll integration and sheet handoff are explicit opt-in wiring", async () => {
  const rollSource = await readFile(new URL("../src/modules/roll/mwd-roll.js", import.meta.url), "utf8");
  const baseSheetSource = await readFile(new URL("../src/modules/sheets/base-actor-sheet-v2.js", import.meta.url), "utf8");
  const combatTemplate = await readFile(new URL("../templates/v2/ui/character/combat-actions.hbs", import.meta.url), "utf8");

  assert.match(rollSource, /async function execute\(\{ actor, payload, event, uiState = null \}/);
  assert.match(rollSource, /shouldApplyPlayerModifierPresets\(uiState\)/);
  assert.match(rollSource, /consumeOncePlayerModifierPresets\(uiState\.subject\)/);
  assert.match(baseSheetSource, /openCombatGadget: BaseActorSheetV2\.prototype\._onOpenCombatGadget/);
  assert.match(combatTemplate, /Open Combat Gadget/);
});
