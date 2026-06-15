// src/modules/sheets/register-actor-sheets-v2.js
// Purpose: Registers custom actor/item sheets.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { SYSTEM_NAME, LOG_HEAD } from "../core/constants.js";
import { CharacterSheetV2 } from "./character-sheet-v2.js";
import { NpcSheetV2 } from "./npc-sheet-v2.js";
import { VehicleSheetV2 } from "./vehicle-sheet-v2.js";
import { BattlemechSheetV2 } from "./battlemech-sheet-v2.js";

/**
 * Register AppV2 Actor sheets (CSB-style deterministic PARTS).
 * NOTE: We intentionally do NOT call foundry.appv1.* here.
 */
export function registerActorSheetsV2() {
  console.log(`${LOG_HEAD}Registering Actor sheets (V2)`);

  // The Foundry API still uses Actors.registerSheet even for V2 sheet classes.
  // Use the canonical registry to avoid scope issues.
  const { Actors } = foundry.documents.collections;
  
  Actors.registerSheet(SYSTEM_NAME, CharacterSheetV2, {
    types: ["character"],
    makeDefault: true,
    label: "Character (V2)"
  });

  Actors.registerSheet(SYSTEM_NAME, NpcSheetV2, {
    types: ["npc"],
    makeDefault: true,
    label: "NPC (V2)"
  });

  Actors.registerSheet(SYSTEM_NAME, VehicleSheetV2, {
    types: ["vehicle"],
    makeDefault: true,
    label: "Vehicle (V2)"
  });

  Actors.registerSheet(SYSTEM_NAME, BattlemechSheetV2, {
    types: ["battlemech"],
    makeDefault: true,
    label: "BattleMech (V2)"
  });
}