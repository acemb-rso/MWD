// src/modules/terrain/terrain-movement-cost.js
// Purpose: Connects MWD terrain to Foundry v14's movement cost system.
// How it fits: The Terrain (MWD) Region Behavior emits "mwdTerrain" terrain
// effects for each moving token (terrain-region-behavior.js); MwdTerrainData
// composes them with terrain-mobility.js resolveTerrainMovementCost (the
// canonical resolver) and prices each path segment; the token ruler colours
// the route against the machine's movement allowances; a Token HUD toggle sets
// Careful movement (flags.mwd.carefulMovement), which doubles the cost of
// hazardous stretches. Show-only for now: nothing blocks an over-budget move
// (impassable terrain is already unreachable to Foundry's pathing).
// See docs/Terrain-Regions.md ("Movement cost").

import { getTerrainSegmentCost, resolveTerrainMovementCost } from "./terrain-mobility.js";
import { buildBattlemechMovementActionChoices } from "../mwd/battlemech-movement-actions.js";
import { buildVehicleMovementActionChoices } from "../mwd/vehicle-movement-actions.js";
import { TEMPLATE } from "../core/constants.js";

export const CAREFUL_MOVEMENT_FLAG = "carefulMovement";

const BAND_COLORS = Object.freeze({
  withinFirst: 0x2e9e44,
  withinMax: 0xd4a017,
  over: 0xc0392b,
  impassable: 0x5c0a0a,
});

export function isCarefulMovement(token = null) {
  const document = token?.document ?? token;
  return document?.getFlag?.("mwd", CAREFUL_MOVEMENT_FLAG) === true
    || document?.flags?.mwd?.[CAREFUL_MOVEMENT_FLAG] === true;
}

/** Sorted distinct movement allowances (m) of the actor's movement actions. */
export function getActorMovementAllowanceBands(actor = null) {
  let choices = [];
  try {
    if (actor?.type === TEMPLATE.actorTypes.battlemech) choices = buildBattlemechMovementActionChoices(actor);
    else if (actor?.type === TEMPLATE.actorTypes.vehicle) choices = buildVehicleMovementActionChoices(actor);
  } catch (_error) {
    return [];
  }
  return [...new Set(choices.map(choice => Number(choice?.distance)).filter(value => Number.isFinite(value) && value > 0))]
    .sort((a, b) => a - b);
}

/** Band for a cumulative path cost against allowance bands. */
export function getMovementCostBand(cost = 0, bands = []) {
  if (!Number.isFinite(cost)) return "impassable";
  if (!bands.length) return null;
  if (cost <= bands[0]) return "withinFirst";
  if (cost <= bands.at(-1)) return "withinMax";
  return "over";
}

function buildTerrainDataClass(BaseTerrainData, fields) {
  return class MwdTerrainData extends BaseTerrainData {
    static defineSchema() {
      return { ...super.defineSchema(), hazardous: new fields.BooleanField({ initial: false }) };
    }

    static resolveTerrainEffects(effects = []) {
      const contributions = effects.filter(effect => effect?.name === "mwdTerrain");
      // Foundry's own Modify Movement Cost behavior: null difficulty is impassable.
      const extraExcess = effects
        .filter(effect => effect?.name === "difficulty")
        .map(effect => (Number.isFinite(effect.difficulty) ? effect.difficulty - 1 : Infinity));
      const { multiplier, hazardous } = resolveTerrainMovementCost(contributions, { extraExcess });
      if (multiplier === 1 && !hazardous) return null;
      return new this({ difficulty: Number.isFinite(multiplier) ? multiplier : null, hazardous });
    }

    static getMovementCostFunction(token) {
      const careful = isCarefulMovement(token);
      return (_from, _to, distance, segment) => getTerrainSegmentCost(
        distance,
        segment?.terrain ? { multiplier: segment.terrain.difficulty, hazardous: segment.terrain.hazardous } : null,
        { careful },
      );
    }

    equals(other) {
      return other instanceof MwdTerrainData
        && this.difficulty === other.difficulty
        && this.hazardous === other.hazardous;
    }
  };
}

function buildRulerClass(BaseRuler) {
  return class MwdTokenRuler extends BaseRuler {
    #bandColor(waypoint) {
      const band = getMovementCostBand(waypoint?.measurement?.cost, getActorMovementAllowanceBands(this.token?.actor));
      return band ? BAND_COLORS[band] : null;
    }

    _getSegmentStyle(waypoint) {
      const style = super._getSegmentStyle(waypoint);
      if (!style?.width) return style;
      const color = this.#bandColor(waypoint);
      return color === null ? style : { ...style, color };
    }

    _getGridHighlightStyle(waypoint, offset) {
      const style = super._getGridHighlightStyle(waypoint, offset);
      if (!(style?.alpha > 0)) return style;
      const color = this.#bandColor(waypoint);
      return color === null ? style : { ...style, color };
    }
  };
}

function addCarefulToggle(hud, element) {
  const root = element instanceof HTMLElement ? element : element?.[0];
  const column = root?.querySelector?.(".col.right");
  const document = hud?.document;
  if (!column || !document || column.querySelector(".mwd-careful-movement")) return;
  const button = globalThis.document.createElement("button");
  button.type = "button";
  button.className = `control-icon mwd-careful-movement${isCarefulMovement(document) ? " active" : ""}`;
  button.title = "Careful movement: hazardous terrain costs double, no movement-risk check";
  button.innerHTML = '<i class="fa-solid fa-shoe-prints"></i>';
  button.addEventListener("click", async event => {
    event.preventDefault();
    const next = !isCarefulMovement(document);
    await document.setFlag("mwd", CAREFUL_MOVEMENT_FLAG, next);
    button.classList.toggle("active", next);
    globalThis.canvas?.tokens?.recalculatePlannedMovementPaths?.();
  });
  column.append(button);
}

/** Called on `init`. Never throws, so it cannot break system load. */
export function registerTerrainMovementCost() {
  try {
    const movement = globalThis.CONFIG?.Token?.movement;
    const BaseTerrainData = movement?.TerrainData;
    const fields = globalThis.foundry?.data?.fields;
    if (BaseTerrainData && fields) movement.TerrainData = buildTerrainDataClass(BaseTerrainData, fields);
    else console.warn("MWD | Terrain movement cost not registered: TerrainData API unavailable.");

    const BaseRuler = globalThis.CONFIG?.Token?.rulerClass;
    if (BaseRuler) globalThis.CONFIG.Token.rulerClass = buildRulerClass(BaseRuler);

    Hooks.on("renderTokenHUD", (hud, element) => {
      try {
        addCarefulToggle(hud, element);
      } catch (error) {
        console.warn("MWD | Could not add the Careful movement toggle", error);
      }
    });
  } catch (error) {
    console.error("MWD | Terrain movement cost registration failed.", error);
  }
}
