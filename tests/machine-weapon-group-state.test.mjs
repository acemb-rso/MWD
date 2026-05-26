import test from "node:test";
import assert from "node:assert/strict";

import {
  normalizeMachineWeaponGroups,
  pruneWeaponGroupsToMountedItems,
} from "../src/modules/mwd/machine-weapon-group-state.js";

test("machine weapon-group state normalizes object-backed group and weapon id collections", () => {
  const groups = normalizeMachineWeaponGroups({
    0: {
      id: "group-1",
      name: "Alpha",
      weaponIds: {
        0: "weapon-a",
        1: "weapon-b",
      },
    },
  });

  assert.equal(groups.length, 1);
  assert.deepEqual(groups[0].weaponIds, ["weapon-a", "weapon-b"]);
});

test("machine weapon-group state prunes weapons that are no longer mounted", () => {
  const pruned = pruneWeaponGroupsToMountedItems([
    {
      id: "group-1",
      name: "Alpha",
      weaponIds: ["weapon-a", "weapon-b"],
    },
    {
      id: "group-2",
      name: "Bravo",
      weaponIds: ["weapon-c"],
    },
  ], ["weapon-b", "weapon-c"]);

  assert.equal(pruned.changed, true);
  assert.deepEqual(pruned.groups.map(group => group.weaponIds), [["weapon-b"], ["weapon-c"]]);
});
