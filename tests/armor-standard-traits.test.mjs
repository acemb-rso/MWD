import test from "node:test";
import assert from "node:assert/strict";

function makeArmorActor(standardTraits = [], resolveArmorTraitEffects) {
  const traitEntries = standardTraits.map((key, index) => ({
    id: `trait-${index}`,
    key,
    rating: 0,
  }));
  return {
    name: "Armored Target",
    type: "character",
    statuses: new Set(),
    items: [{
      id: "armor-1",
      type: "armor",
      canonicalType: "armor",
      system: {
        equipped: true,
        isPrimary: true,
        standardTraits: traitEntries,
      },
      isArmor() {
        return true;
      },
      getArmorProfile() {
        return {
          traitEffects: resolveArmorTraitEffects({ standardTraits: traitEntries }).traitEffects,
        };
      },
    }],
  };
}

test("armor standard traits expose the equipment-table trait list", async () => {
  const {
    ARMOR_STANDARD_TRAITS,
    normalizeArmorStandardTraits,
    resolveArmorTraitEffects,
    getArmorTraitLabels,
  } = await import("../src/modules/mwd/personal-damage.js");
  assert.deepEqual(
    ARMOR_STANDARD_TRAITS.map(entry => entry.label),
    ["Bulky", "Stealth", "Sealed", "Concealable"]
  );
  assert.deepEqual(
    normalizeArmorStandardTraits(["Bulky", "Stealth", "Sealed", "Concealable"]).map(entry => entry.key),
    ["bulky", "stealth", "sealed", "concealable"]
  );
  assert.deepEqual(
    normalizeArmorStandardTraits(["Ablative", "Flak", "Reinforced", "Padded", "Insulated"]),
    []
  );

  const effects = resolveArmorTraitEffects({
    standardTraits: ["Bulky", "Stealth", "Sealed", "Concealable"],
    traits: ["Ablative", "Flak"],
  });

  assert.deepEqual(effects.mitigationByType, {
    penetrating: 0,
    concussive: 0,
    energy: 0,
    thermal: 0,
    electrical: 0,
  });
  assert.equal(effects.reinforcedMax, 0);
  assert.equal(effects.traitEffects.attributeModifiers.reflexes, -1);
  assert.equal(effects.traitEffects.noticeDn, 1);
  assert.equal(effects.traitEffects.sensorTrackingPenalty, 1);
  assert.equal(effects.traitEffects.resistanceDice.gas, 1);
  assert.equal(effects.traitEffects.resistanceDice.chemical, 1);
  assert.equal(effects.traitEffects.concealArmorDn, 1);
  assert.deepEqual(getArmorTraitLabels({ standardTraits: ["Bulky", "Stealth"] }), ["Bulky", "Stealth"]);
});

test("active armor trait effects are read from equipped armor", async () => {
  const {
    getActiveArmorTraitEffects,
    resolveArmorTraitEffects,
  } = await import("../src/modules/mwd/personal-damage.js");
  const arrayActor = makeArmorActor(["bulky", "stealth", "sealed", "concealable"], resolveArmorTraitEffects);
  const mapActor = {
    ...arrayActor,
    items: new Map(arrayActor.items.map(item => [item.id, item])),
  };

  const effects = getActiveArmorTraitEffects(arrayActor);
  const mapEffects = getActiveArmorTraitEffects(mapActor);
  assert.equal(effects.attributeModifiers.reflexes, -1);
  assert.equal(effects.sensorTrackingPenalty, 1);
  assert.equal(effects.resistanceDice.gas, 1);
  assert.equal(effects.concealArmorDn, 1);
  assert.equal(mapEffects.attributeModifiers.reflexes, -1);
});

test("stealth armor increases sensor tracking penalty", async () => {
  const {
    resolveArmorTraitEffects,
  } = await import("../src/modules/mwd/personal-damage.js");
  const {
    getTrackingPenalty,
  } = await import("../src/modules/mwd/machine-ew-state.js");
  assert.equal(getTrackingPenalty(makeArmorActor(["stealth"], resolveArmorTraitEffects), null), 1);
});

test("sealed armor adds bonus dice to gas and chemical resistance", async () => {
  const {
    resolveArmorTraitEffects,
  } = await import("../src/modules/mwd/personal-damage.js");
  const {
    resolveResistance,
  } = await import("../src/modules/roll/intent/resolve-resistance.js");
  const actor = makeArmorActor(["sealed"], resolveArmorTraitEffects);
  const gas = await resolveResistance({ actor, payload: { tags: ["gas"] } });
  const chemical = await resolveResistance({ actor, payload: { hazardType: "chemical" } });
  const fire = await resolveResistance({ actor, payload: { damageType: "thermal" } });

  assert.equal(gas.pool.bonus, 1);
  assert.deepEqual(gas.breakdown, [{ label: "Sealed Armor", value: 1 }]);
  assert.equal(chemical.pool.bonus, 1);
  assert.equal(fire.pool.bonus, 0);
});
