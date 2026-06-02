// src/modules/mwd/personal-crit-families.js
// Purpose: Code-owned Personal Critical Hit family and band definitions.
// How it fits: Personal criticals are small, designer-owned data, unlike the
// machine RollTable-driven critical engine.

export const PERSONAL_CRITICAL_BANDS = Object.freeze({
  none: Object.freeze({ id: "none", label: "No Critical", roman: "" }),
  minor: Object.freeze({ id: "minor", label: "Minor", roman: "I" }),
  moderate: Object.freeze({ id: "moderate", label: "Moderate", roman: "II" }),
  severe: Object.freeze({ id: "severe", label: "Severe", roman: "III" }),
});

function band({
  statusId,
  statusLabel,
  effectText,
  effectKind = "",
  effectPayload = {},
  remedyKey,
  remedyLabel,
  remedySkillKey = "",
  remedyBaseDn = 0,
} = {}) {
  return Object.freeze({
    statusId,
    statusLabel,
    effectText,
    effectKind,
    effectPayload: Object.freeze({ ...(effectPayload ?? {}) }),
    remedyKey,
    remedyLabel,
    remedySkillKey,
    remedyBaseDn,
  });
}

function family(id, roll, label, bands) {
  return Object.freeze({
    id,
    roll,
    label,
    bands: Object.freeze(bands),
  });
}

export const PERSONAL_CRITICAL_FAMILIES = Object.freeze({
  winded: family("winded", 1, "Winded", {
    minor: band({
      statusId: "windedMinor",
      statusLabel: "Winded I",
      effectText: "Add 1 Burn. Clear with Reduce Burn.",
      effectKind: "resource",
      effectPayload: { burn: 1 },
      remedyKey: "reduceBurn",
      remedyLabel: "Reduce Burn",
    }),
    moderate: band({
      statusId: "windedModerate",
      statusLabel: "Winded II",
      effectText: "Add 2 Burn. Clear with Reduce Burn.",
      effectKind: "resource",
      effectPayload: { burn: 2 },
      remedyKey: "reduceBurn",
      remedyLabel: "Reduce Burn",
    }),
    severe: band({
      statusId: "windedSevere",
      statusLabel: "Winded III",
      effectText: "Add 3 Burn. Clear with Reduce Burn.",
      effectKind: "resource",
      effectPayload: { burn: 3 },
      remedyKey: "reduceBurn",
      remedyLabel: "Reduce Burn",
    }),
  }),
  concussion: family("concussion", 2, "Concussion", {
    minor: band({
      statusId: "concussionMinor",
      statusLabel: "Concussion I",
      effectText: "-1 die to actions and initiative.",
      effectKind: "rollMod",
      remedyKey: "endure",
      remedyLabel: "Endure",
    }),
    moderate: band({
      statusId: "concussionModerate",
      statusLabel: "Concussion II",
      effectText: "-2 dice to actions and initiative.",
      effectKind: "rollMod",
      remedyKey: "endure",
      remedyLabel: "Endure",
    }),
    severe: band({
      statusId: "concussionSevere",
      statusLabel: "Concussion III",
      effectText: "-3 dice to actions and initiative.",
      effectKind: "rollMod",
      remedyKey: "endure",
      remedyLabel: "Endure",
    }),
  }),
  crippled: family("crippled", 3, "Crippled", {
    minor: band({
      statusId: "crippledMinor",
      statusLabel: "Crippled I",
      effectText: "-2 m movement.",
      effectKind: "speed",
      effectPayload: { speed: -2 },
      remedyKey: "firstAid",
      remedyLabel: "First Aid",
    }),
    moderate: band({
      statusId: "crippledModerate",
      statusLabel: "Crippled II",
      effectText: "-4 m movement.",
      effectKind: "speed",
      effectPayload: { speed: -4 },
      remedyKey: "firstAid",
      remedyLabel: "First Aid",
    }),
    severe: band({
      statusId: "crippledSevere",
      statusLabel: "Crippled III",
      effectText: "-6 m movement.",
      effectKind: "speed",
      effectPayload: { speed: -6 },
      remedyKey: "firstAid",
      remedyLabel: "First Aid",
    }),
  }),
  hampered: family("hampered", 4, "Hampered", {
    minor: band({
      statusId: "hamperedMinor",
      statusLabel: "Hampered I",
      effectText: "Weapon unequipped; Ready Item clears it.",
      effectKind: "gate",
      effectPayload: { weaponUnequipped: true },
      remedyKey: "readyItem",
      remedyLabel: "Ready Item",
    }),
    moderate: band({
      statusId: "hamperedModerate",
      statusLabel: "Hampered II",
      effectText: "Weapon unequipped and -1 die to physical actions.",
      effectKind: "gate",
      effectPayload: { weaponUnequipped: true, physicalPenalty: -1 },
      remedyKey: "readyItem",
      remedyLabel: "Ready Item",
    }),
    severe: band({
      statusId: "hamperedSevere",
      statusLabel: "Hampered III",
      effectText: "Weapon unequipped, -1 die to physical actions, and fall prone.",
      effectKind: "gate",
      effectPayload: { weaponUnequipped: true, physicalPenalty: -1, prone: true },
      remedyKey: "readyItem",
      remedyLabel: "Ready Item",
    }),
  }),
  offbalance: family("offbalance", 5, "Off Balance", {
    minor: band({
      statusId: "offbalanceMinor",
      statusLabel: "Off Balance I",
      effectText: "-2 attack rating and defense rating. Steady DN 2 clears it.",
      effectKind: "rollMod",
      remedyKey: "steady",
      remedyLabel: "Steady",
      remedyBaseDn: 2,
    }),
    moderate: band({
      statusId: "offbalanceModerate",
      statusLabel: "Off Balance II",
      effectText: "-4 attack rating and defense rating. Steady DN 2 clears it.",
      effectKind: "rollMod",
      remedyKey: "steady",
      remedyLabel: "Steady",
      remedyBaseDn: 2,
    }),
    severe: band({
      statusId: "offbalanceSevere",
      statusLabel: "Off Balance III",
      effectText: "-6 attack rating and defense rating. Steady DN 2 clears it.",
      effectKind: "rollMod",
      remedyKey: "steady",
      remedyLabel: "Steady",
      remedyBaseDn: 2,
    }),
  }),
  shaken: family("shaken", 6, "Shaken", {
    minor: band({
      statusId: "shakenMinor",
      statusLabel: "Shaken I",
      effectText: "Cannot Aim. Composure DN 2 clears it.",
      effectKind: "gate",
      effectPayload: { cannotAim: true },
      remedyKey: "composure",
      remedyLabel: "Composure",
      remedyBaseDn: 2,
    }),
    moderate: band({
      statusId: "shakenModerate",
      statusLabel: "Shaken II",
      effectText: "Cannot Aim or take reactions. Composure DN 2 clears it.",
      effectKind: "gate",
      effectPayload: { cannotAim: true, cannotReact: true },
      remedyKey: "composure",
      remedyLabel: "Composure",
      remedyBaseDn: 2,
    }),
    severe: band({
      statusId: "shakenSevere",
      statusLabel: "Shaken III",
      effectText: "Cannot Aim, take reactions, or perform complex actions. Composure DN 2 clears it.",
      effectKind: "gate",
      effectPayload: { cannotAim: true, cannotReact: true, cannotComplex: true },
      remedyKey: "composure",
      remedyLabel: "Composure",
      remedyBaseDn: 2,
    }),
  }),
});

export const PERSONAL_CRITICAL_FAMILIES_BY_ROLL = Object.freeze(
  Object.fromEntries(Object.values(PERSONAL_CRITICAL_FAMILIES).map(entry => [entry.roll, entry]))
);

export function getPersonalCriticalFamily(familyId) {
  return PERSONAL_CRITICAL_FAMILIES[String(familyId ?? "").trim()] ?? null;
}

export function getPersonalCriticalFamilyByRoll(rollTotal) {
  return PERSONAL_CRITICAL_FAMILIES_BY_ROLL[Math.max(1, Math.min(6, Math.trunc(Number(rollTotal) || 1)))] ?? null;
}

export function getPersonalCriticalBandDefinition(familyId, bandId) {
  const family = getPersonalCriticalFamily(familyId);
  return family?.bands?.[String(bandId ?? "").trim()] ?? null;
}
