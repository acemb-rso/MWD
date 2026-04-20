import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildMachineEwPanel, resolveMachineEwActionTarget } from "../src/modules/mwd/machine-ew-panel.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function createCombatant({ tokenId, ewState = {}, moved = false } = {}) {
  return {
    tokenId,
    getFlag(scope, key) {
      if (scope !== "mwd") return null;
      if (key === "ewState") return ewState;
      if (key === "personalCombat") {
        return moved ? { actionState: { move: "advance" } } : { actionState: {} };
      }
      return null;
    },
  };
}

function createTargetToken({ id, uuid, name, statuses = [] } = {}) {
  return {
    id,
    name,
    actor: {
      statuses: new Set(statuses),
    },
    document: {
      id,
      uuid,
    },
  };
}

function setSceneState({ targets = [], attackerCombatant = null, targetCombatants = [], round = 3 } = {}) {
  globalThis.game = {
    combat: {
      round,
      combatants: [
        ...(attackerCombatant ? [attackerCombatant] : []),
        ...targetCombatants,
      ],
    },
    user: {
      targets: new Set(targets),
    },
  };
}

function buildPanel({ system = 3, targets = [], attackerCombatant, targetCombatants = [] } = {}) {
  setSceneState({ targets, attackerCombatant, targetCombatants });
  return buildMachineEwPanel({
    actor: {
      system: {
        attributes: {
          system: { value: system },
        },
      },
    },
    token: { id: "attacker-token" },
  });
}

test("EW panel shows an empty state when no token targets are selected", () => {
  const panel = buildPanel({
    attackerCombatant: createCombatant({ tokenId: "attacker-token" }),
  });

  assert.equal(panel.hasTargets, false);
  assert.equal(panel.rows.length, 0);
  assert.equal(panel.canAcquireAny, false);
  assert.equal(panel.canTargetAny, false);
  assert.match(panel.emptyState, /Target one or more tokens/i);
});

test("EW panel exposes Contact targets as acquire-ready but not targeting-ready", () => {
  const target = createTargetToken({
    id: "target-1",
    uuid: "Scene.scene.Token.target-1",
    name: "Enemy Contact",
  });
  const attackerCombatant = createCombatant({
    tokenId: "attacker-token",
    ewState: {
      [target.document.uuid]: {
        contactState: "contact",
        packets: [],
      },
    },
  });

  const panel = buildPanel({ targets: [target], attackerCombatant });
  const [row] = panel.rows;

  assert.equal(panel.canAcquireAny, true);
  assert.equal(panel.canTargetAny, false);
  assert.equal(row.contactState, "contact");
  assert.equal(row.canAcquire, true);
  assert.equal(row.canTarget, false);
  assert.equal(row.acquireHint, "Acquire can upgrade to Track.");
  assert.equal(row.targetHint, "Targeting Data unavailable until Track.");
});

test("EW panel shows capped targeting data and penalties for Track targets", () => {
  const target = createTargetToken({
    id: "target-2",
    uuid: "Scene.scene.Token.target-2",
    name: "Tracked Enemy",
    statuses: ["ecmShrouded"],
  });
  const attackerCombatant = createCombatant({
    tokenId: "attacker-token",
    ewState: {
      [target.document.uuid]: {
        contactState: "track",
        packets: [{ id: "packet-1", value: 5, consumed: false }],
      },
    },
  });
  const targetCombatant = createCombatant({ tokenId: "target-2", moved: true });

  const panel = buildPanel({
    system: 3,
    targets: [target],
    attackerCombatant,
    targetCombatants: [targetCombatant],
  });
  const [row] = panel.rows;

  assert.equal(panel.canAcquireAny, true);
  assert.equal(panel.canTargetAny, true);
  assert.equal(row.hasPacket, true);
  assert.equal(row.packetValue, 3);
  assert.equal(row.packetCap, 3);
  assert.equal(row.trackingPenalty, 2);
  assert.equal(row.canAcquire, true);
  assert.equal(row.canTarget, true);
  assert.equal(row.acquireHint, "Acquire can upgrade to Lock.");
  assert.equal(row.targetHint, "Targeting Data available.");
});

test("EW panel keeps blind targets informational only and lock targets optimized", () => {
  const blindTarget = createTargetToken({
    id: "target-3",
    uuid: "Scene.scene.Token.target-3",
    name: "Unseen Enemy",
  });
  const lockTarget = createTargetToken({
    id: "target-4",
    uuid: "Scene.scene.Token.target-4",
    name: "Locked Enemy",
  });
  const attackerCombatant = createCombatant({
    tokenId: "attacker-token",
    ewState: {
      [lockTarget.document.uuid]: {
        contactState: "lock",
        packets: [],
      },
    },
  });

  const panel = buildPanel({
    targets: [blindTarget, lockTarget],
    attackerCombatant,
  });
  const blindRow = panel.rows.find(row => row.targetTokenId === "target-3");
  const lockRow = panel.rows.find(row => row.targetTokenId === "target-4");

  assert.equal(blindRow.canAcquire, false);
  assert.equal(blindRow.canTarget, false);
  assert.equal(blindRow.acquireHint, "No targeting solution. Acquire contact first.");
  assert.equal(lockRow.canAcquire, false);
  assert.equal(lockRow.canTarget, true);
  assert.equal(lockRow.targetHint, "Targeting solution optimized.");
});

test("EW action target selection chooses the first eligible targeted token", () => {
  const panel = {
    rows: [
      { targetTokenId: "blind", canAcquire: false, canTarget: false },
      { targetTokenId: "contact", canAcquire: true, canTarget: false },
      { targetTokenId: "track", canAcquire: true, canTarget: true },
    ],
  };

  assert.equal(resolveMachineEwActionTarget(panel, "acquire")?.targetTokenId, "contact");
  assert.equal(resolveMachineEwActionTarget(panel, "targeting")?.targetTokenId, "track");
});

test("machine layouts surface the shared EW panel on battlemech and vehicle sheets", async () => {
  const [battlemechLayoutRaw, vehicleLayoutRaw] = await Promise.all([
    readFile(path.join(repoRoot, "templates/v2/layouts/battlemech.layout.json"), "utf8"),
    readFile(path.join(repoRoot, "templates/v2/layouts/vehicle.layout.json"), "utf8"),
  ]);

  assert.match(battlemechLayoutRaw, /"partial": "mwd\.v2\.ui\.vehicle\.ew-panel"/);
  assert.match(vehicleLayoutRaw, /"partial": "mwd\.v2\.ui\.vehicle\.ew-panel"/);
});
