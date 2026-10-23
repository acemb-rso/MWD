// src/modules/mwd/vehicle-profiles.js
// Purpose: Normalizes vehicle propulsion and terrain identity without locking
// final balance values.
// How it fits: Movement, CQ, and terrain consume this shared profile model
// instead of hardcoding vehicle subtype behavior in sheets. How terrain affects
// each profile is the terrain mobility matrix (terrain/terrain-catalog.js), not
// per-vehicle data (the old per-vehicle lists are removed by schema step 2).

export const VEHICLE_MOVEMENT_PROFILES = Object.freeze({
  wheeled: Object.freeze({
    key: "wheeled",
    label: "Wheeled",
    family: "ground",
    doctrine: "Road repositioning and lane control.",
    affordances: ["reposition"],
  }),
  tracked: Object.freeze({
    key: "tracked",
    label: "Tracked",
    family: "ground",
    doctrine: "Stable support platform in difficult ground.",
    affordances: ["stabilizedFire", "hullDown"],
  }),
  hover: Object.freeze({
    key: "hover",
    label: "Hover",
    family: "ground",
    doctrine: "Fast open-ground and water maneuver with clutter instability.",
    affordances: ["reposition", "redline"],
  }),
  vtol: Object.freeze({
    key: "vtol",
    label: "VTOL",
    family: "flight",
    doctrine: "Spotting and mobility dominance with fragile lift systems.",
    affordances: ["spotting", "ew", "redline"],
  }),
  drone: Object.freeze({
    key: "drone",
    label: "Drone",
    family: "flight",
    doctrine: "Remote support and networked battlefield presence.",
    affordances: ["spotting", "ew", "network"],
  }),
  aerospace: Object.freeze({
    key: "aerospace",
    label: "Aerospace",
    family: "flight",
    doctrine: "Fast jet-based passes and future strike hooks.",
    affordances: ["fastPass", "redline"],
  }),
});

export const VEHICLE_FLIGHT_SUBTYPES = Object.freeze({
  rotor: "Rotor",
  vector: "Vector",
});

function normalizeKey(value = "") {
  return String(value ?? "").trim().toLowerCase();
}

export function getVehicleProfileDefinition(profileKey = "") {
  const normalized = normalizeKey(profileKey) || "tracked";
  return VEHICLE_MOVEMENT_PROFILES[normalized] ?? VEHICLE_MOVEMENT_PROFILES.tracked;
}

export function normalizeVehicleMovementProfile(systemData = {}) {
  const mwd = systemData.mwd = systemData.mwd ?? {};
  const legacyCategory = normalizeKey(systemData.category);
  const profile = getVehicleProfileDefinition(mwd.movementProfile ?? legacyCategory);

  mwd.movementProfile = profile.key;
  mwd.flightSubtype = normalizeKey(mwd.flightSubtype);
  if (!Object.hasOwn(VEHICLE_FLIGHT_SUBTYPES, mwd.flightSubtype)) {
    mwd.flightSubtype = profile.key === "vtol" ? "rotor" : "";
  }

  mwd.affordances = Array.from(new Set([
    ...(Array.isArray(mwd.affordances) ? mwd.affordances.map(normalizeKey).filter(Boolean) : []),
    ...profile.affordances,
  ]));

  return systemData;
}

export function buildVehicleProfileSummary(systemData = {}) {
  const mwd = systemData?.mwd ?? {};
  const profile = getVehicleProfileDefinition(mwd.movementProfile);
  const flightSubtype = normalizeKey(mwd.flightSubtype);
  const subtypeLabel = flightSubtype ? VEHICLE_FLIGHT_SUBTYPES[flightSubtype] ?? "" : "";

  return {
    key: profile.key,
    label: subtypeLabel && profile.key === "vtol" ? `${profile.label} (${subtypeLabel})` : profile.label,
    family: profile.family,
    doctrine: profile.doctrine,
    affordances: Array.from(new Set([...(mwd.affordances ?? []), ...profile.affordances].map(normalizeKey).filter(Boolean))),
    flightSubtype,
  };
}
