// src/modules/mwd/vehicle-profiles.js
// Purpose: Normalizes vehicle propulsion and terrain identity without locking
// final balance values.
// How it fits: Movement, CQ, and future terrain providers consume this shared
// profile model instead of hardcoding vehicle subtype behavior in sheets.

export const VEHICLE_MOVEMENT_PROFILES = Object.freeze({
  wheeled: Object.freeze({
    key: "wheeled",
    label: "Wheeled",
    family: "ground",
    doctrine: "Road repositioning and lane control.",
    favoredTerrain: ["road", "urban"],
    adverseTerrain: ["rough", "forest", "water"],
    affordances: ["reposition"],
  }),
  tracked: Object.freeze({
    key: "tracked",
    label: "Tracked",
    family: "ground",
    doctrine: "Stable support platform in difficult ground.",
    favoredTerrain: ["open", "rough", "urban"],
    adverseTerrain: ["water"],
    affordances: ["stabilizedFire", "hullDown"],
  }),
  hover: Object.freeze({
    key: "hover",
    label: "Hover",
    family: "ground",
    doctrine: "Fast open-ground and water maneuver with clutter instability.",
    favoredTerrain: ["open", "water"],
    adverseTerrain: ["forest", "urban", "rough"],
    affordances: ["reposition", "redline"],
  }),
  vtol: Object.freeze({
    key: "vtol",
    label: "VTOL",
    family: "flight",
    doctrine: "Spotting and mobility dominance with fragile lift systems.",
    favoredTerrain: ["open", "urban"],
    adverseTerrain: ["forest"],
    affordances: ["spotting", "ew", "redline"],
  }),
  drone: Object.freeze({
    key: "drone",
    label: "Drone",
    family: "flight",
    doctrine: "Remote support and networked battlefield presence.",
    favoredTerrain: ["open", "urban"],
    adverseTerrain: [],
    affordances: ["spotting", "ew", "network"],
  }),
  aerospace: Object.freeze({
    key: "aerospace",
    label: "Aerospace",
    family: "flight",
    doctrine: "Fast jet-based passes and future strike hooks.",
    favoredTerrain: ["open"],
    adverseTerrain: ["forest", "urban"],
    affordances: ["fastPass", "redline"],
  }),
});

export const VEHICLE_TERRAIN_CLASSES = Object.freeze([
  "road",
  "open",
  "rough",
  "forest",
  "urban",
  "water",
]);

export const VEHICLE_FLIGHT_SUBTYPES = Object.freeze({
  rotor: "Rotor",
  vector: "Vector",
});

function normalizeKey(value = "") {
  return String(value ?? "").trim().toLowerCase();
}

function normalizeList(value = []) {
  const source = Array.isArray(value)
    ? value
    : String(value ?? "").split(",");
  return Array.from(new Set(source
    .map(entry => normalizeKey(entry))
    .filter(entry => VEHICLE_TERRAIN_CLASSES.includes(entry))));
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

  const hasFavoredTerrain = Array.isArray(mwd.favoredTerrain)
    ? mwd.favoredTerrain.length > 0
    : String(mwd.favoredTerrain ?? "").trim() !== "";
  const hasAdverseTerrain = Array.isArray(mwd.adverseTerrain)
    ? mwd.adverseTerrain.length > 0
    : String(mwd.adverseTerrain ?? "").trim() !== "";

  mwd.favoredTerrain = normalizeList(hasFavoredTerrain ? mwd.favoredTerrain : profile.favoredTerrain);
  mwd.adverseTerrain = normalizeList(hasAdverseTerrain ? mwd.adverseTerrain : profile.adverseTerrain);

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
    favoredTerrain: normalizeList(mwd.favoredTerrain?.length ? mwd.favoredTerrain : profile.favoredTerrain),
    adverseTerrain: normalizeList(mwd.adverseTerrain?.length ? mwd.adverseTerrain : profile.adverseTerrain),
    affordances: Array.from(new Set([...(mwd.affordances ?? []), ...profile.affordances].map(normalizeKey).filter(Boolean))),
    terrainClasses: [...VEHICLE_TERRAIN_CLASSES],
    flightSubtype,
  };
}
