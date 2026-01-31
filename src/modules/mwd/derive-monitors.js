export function penaltyFromDamage(damage) {
  const d = Math.max(0, Number(damage) || 0);
  return -Math.floor(d / 3);
}

export function resistanceFromArmor(armorValue) {
  const a = Math.max(0, Number(armorValue) || 0);
  return a === 0 ? 0 : Math.ceil(a / 4);
}

export function deriveMonitors(monitors = {}) {
  const physical = monitors.physical ?? {};
  const fatigue = monitors.fatigue ?? {};
  const armor = monitors.armor ?? {};

  const physicalValue = Number(physical.value) || 0;
  const fatigueValue = Number(fatigue.value) || 0;

  // Decide what armor “value” represents; if current is 0 but max is rating,
  // derive from max until you move to true current armor tracking.
  const armorBase = Math.max(Number(armor.value) || 0, Number(armor.max) || 0);

  return {
    physical: { penalty: penaltyFromDamage(physicalValue) },
    fatigue: { penalty: penaltyFromDamage(fatigueValue) },
    armor: { resistance: resistanceFromArmor(armorBase) }
  }; 
}

export const DERIVE_FNS = {
  penaltyPer3Damage: (n) => {
    const v = Math.max(0, Number(n) || 0);
    return -Math.floor(v / 3);
  },
  resistancePerQuarter: (n) => {
    const v = Math.max(0, Number(n) || 0);
    return v === 0 ? 0 : Math.ceil(v / 4);
  }
  // heatPenaltyCurve: ...
};

export function resolveDerivedSource(actor, monitorId, sourceKey, nextValue) {
  const sys = actor.system ?? {};
  const basePath = `monitors.${monitorId}`;

  const currentMax = Number(foundry.utils.getProperty(sys, `${basePath}.max`)) || 0;
  const currentValue = Number(foundry.utils.getProperty(sys, `${basePath}.value`)) || 0;

  switch (sourceKey) {
    case "value":
      return nextValue;

    // Character personal armor: use max as rating if value is “damage taken” or starts at 0.
    // You can later swap this to whatever you decide is canonical.
    case "armorPersonalBase":
      return Math.max(nextValue, currentMax, currentValue);

    // BattleMech armor: you might later base on armor *remaining* or a separate rating.
    case "mechArmorBase":
      return Math.max(nextValue, currentMax, currentValue);

    case "vehicleArmorBase":
      return Math.max(nextValue, currentMax, currentValue);

    default:
      return nextValue;
  }
}
