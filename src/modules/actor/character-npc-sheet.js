import { AnarchyActorSheet } from "./anarchy-actor-sheet.js";

export class CharacterNPCSheet extends AnarchyActorSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 760,
      height: 650,
      tabs: [
        {
          navSelector: '.npc-tabs',
          contentSelector: '.npc-body',
          initial: 'npc'
        }
      ]
    });
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.options.classes = Array.from(new Set([...(context.options.classes ?? []), 'npc-sheet']));
    context.npcItems = {
      traits: context.items?.quality ?? [],
      weapons: context.items?.weapon ?? [],
      assetModules: context.items?.assetModule ?? [],
      inventory: context.items?.gear ?? [],
    };
    return context;
  }
}