// src/modules/item/anarchy-base-item.js
// Purpose: Registers Foundry hooks: createItem, updateItem, deleteItem. References legacy Anarchy system behavior.
// How it fits: Describes role within src/modules or template rendering pipeline.


import { LOG_HEAD, SYSTEM_NAME, TEMPLATE } from "../constants.js";
import { MWD } from "../config.js";
import { AttributeActions } from "../attribute-actions.js";
import { Checkbars } from "../common/checkbars.js";
import { ErrorManager } from "../error-manager.js";
import { Enums } from "../enums.js";
import { Misc } from "../misc.js";
import { RollDialog } from "../roll/roll-dialog.js";
import { AnarchyUsers } from "../users.js";
import { formatString } from "../strings.js";
import { getSkillDef } from "../mwd/skills.js";
import {
  computeArmorBaseMitigation,
  deriveWeaponEffectsFromTraits,
  getArmorTraitLabels,
  getPersonalDamageTypeLabel,
  getWeaponTraitLabels,
  mergeArmorMitigationByType,
  normalizeArmorMitigationByType,
  normalizeArmorStandardTraits,
  normalizeArmorTags,
  normalizePersonalDamageType,
  normalizeWeaponAmmo,
  normalizeWeaponStandardTraits,
  normalizeWeaponTraits,
  resolveArmorTraitEffects,
  resolveEffectiveWeaponProfile,
  resolveWeaponAmmo,
} from "../mwd/personal-damage.js";

const LEGACY_ITEM_TYPE_MAP = Object.freeze({
  weapon: TEMPLATE.itemType.personalWeapon,
  shadowamp: TEMPLATE.itemType.assetModule,
});

const DEFAULT_ITEM_ICONS = Object.freeze({
  contact: "systems/mwd/img/default/mystery-man.svg",
  gear: "systems/mwd/img/default/Default_Gear.svg",
  quality: "systems/mwd/img/default/card-joker.svg",
  assetModule: "systems/mwd/img/default/upgrade.svg",
  skill: "systems/mwd/img/default/Default_Skill.svg",
  lifeModule: "systems/mwd/img/default/book.svg",
  mechWeapon: "systems/mwd/img/default/Default_Weapon.svg",
  personalWeapon: "systems/mwd/img/colt-m1911.svg",
  armor: "systems/mwd/img/default/Default_Armor.svg",
});

const RANGE_ORDER = Object.freeze(["close", "near", "far", "extreme"]);

const AREA_TARGETS = Object.freeze({
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: undefined },
  cone: { targets: undefined },
  rect: { targets: undefined },
  ray: { targets: undefined },
});

function normalizeTraits(value) {
  return normalizeWeaponTraits(value);
}

function normalizeRangeKey(rangeKey) {
  if (rangeKey === "long") return "extreme";
  if (rangeKey === "short") return "close";
  if (rangeKey === "medium") return "near";
  return RANGE_ORDER.includes(rangeKey) ? rangeKey : "near";
}

function normalizeRangeData(range) {
  const max = normalizeRangeKey(range?.max ?? "near");
  return {
    max,
    close: Number(range?.close ?? range?.short ?? 0) || 0,
    near: Number(range?.near ?? range?.medium ?? 0) || 0,
    far: Number(range?.far ?? range?.long ?? 0) || 0,
    extreme: Number(range?.extreme ?? 0) || 0
  };
}

function normalizeAttackRatingBand(bands) {
  return {
    close: Number(bands?.close ?? bands?.short ?? 0) || 0,
    near: Number(bands?.near ?? bands?.medium ?? 0) || 0,
    far: Number(bands?.far ?? bands?.long ?? 0) || 0,
    extreme: Number(bands?.extreme ?? 0) || 0
  };
}

function maxRangeIndex(maxKey) {
  const idx = RANGE_ORDER.indexOf(maxKey);
  return idx >= 0 ? idx : RANGE_ORDER.indexOf("near");
}

function getDefaultRangeBand(range = normalizeRangeData({})) {
  const preferred = ["near", "close", "far", "extreme"];
  const maxIndex = maxRangeIndex(range.max);
  return preferred.find(key => RANGE_ORDER.indexOf(key) <= maxIndex) ?? "close";
}

function getRangeList(range) {
  const normalizedMax = normalizeRangeKey(range?.max);
  const maxIndex = RANGE_ORDER.indexOf(normalizedMax);
  return RANGE_ORDER.map((key, index) => ({
    key,
    allowed: maxIndex >= 0 ? index <= maxIndex : index === 0,
    value: range?.[key] ?? undefined,
    labelkey: Enums.getFromList(Enums.getEnums().ranges, key)
  }));
}

function damageValue(monitor, damage, damageAttribute, actorAttribute) {
  let total = Number(damage);
  if (damageAttribute) {
    if (actorAttribute !== undefined) {
      total += Math.ceil(Number(actorAttribute) / 2);
    } else {
      console.warn("Weapon not attached to an actor");
      return MWD.item.personalWeapon.weaponWithoutActor;
    }
  }
  return total;
}

function damageCode(monitor, damage, damageAttribute) {
  let code = "";
  if (damageAttribute && MWD.attributes[damageAttribute]) {
    code += MWD.attributes[damageAttribute].substring(0, 3).toUpperCase() + "/2 + ";
  }
  code += String(damage);
  return code;
}

function armorMode(monitor, noArmor) {
  if (Checkbars.useArmor(monitor)) {
    return noArmor ? "noArmor" : "withArmor";
  }
  return "";
}

function prepareSkillDefaults(skillCode) {
  const skill = game.system.mwd.skills.get(skillCode);

  if (!skill) {
    return {
      img: DEFAULT_ITEM_ICONS.skill,
      system: {
        code: skillCode,
        attribute: ""
      }
    };
  }

  const updates = {
    img: skill.icon,
    system: {
      code: skill.code,
      attribute: skill.attribute
    }
  };

  if (skill.code !== "knowledge") updates.name = skill.label;
  return updates;
}

function shouldApplyDefaultIcon(img) {
  const current = String(img ?? "").trim();
  if (!current) return true;
  if (current.startsWith("icons/svg/")) return true;
  if (current === "icons/mystery-man.svg") return true;
  return false;
}

export class MWDItem extends Item {
  static #hooksInitialized = false;

  static RANGE_ORDER = RANGE_ORDER;
  static EQUIPPED_EFFECT_FLAG = "equippedItemSync";

  static DEFAULT_UNARMED = Object.freeze({
    id: "unarmed",
    name: "Unarmed",
    category: "melee",
    skill: "meleeCombat",
    damage: 1,
    ap: 0,
    damageType: "concussive",
    attackRatingBand: { close: 0, near: 0, far: 0, extreme: 0 },
    range: { max: "close", close: 0, near: 0, far: 0, extreme: 0 },
    standardTraits: [],
    ammo: { current: 0, max: 0, consumePerAttack: 1, activeTypeId: "", types: [] },
    ammoState: { current: 0, max: 0, consumePerAttack: 1, activeTypeId: "", types: [], isTracked: false, ammoLabel: "" },
    ammoLabel: "",
    traits: [],
    notes: ""
  });

  static init() {
    if (this.#hooksInitialized) return;
    this.#hooksInitialized = true;

    Hooks.on("createItem", (item, options, id) => {
      void Promise.resolve(item.onCreateItem?.(options, id)).catch(error => {
        console.error(`${LOG_HEAD}Item create hook failed`, error);
      });
      void MWDItem.#queueEffectSync(item);
    });

    Hooks.on("updateItem", (item) => {
      void MWDItem.#queueEffectSync(item);
    });

    Hooks.on("deleteItem", (item) => {
      void MWDItem.#queueEffectRemoval(item);
    });

    Hooks.on("createActiveEffect", (effect) => {
      void MWDItem.#queueParentItemEffectSync(effect);
    });

    Hooks.on("updateActiveEffect", (effect) => {
      void MWDItem.#queueParentItemEffectSync(effect);
    });

    Hooks.on("deleteActiveEffect", (effect) => {
      void MWDItem.#queueParentItemEffectSync(effect);
    });
  }

  static canonicalType(type) {
    return LEGACY_ITEM_TYPE_MAP[type] ?? type;
  }

  static defaultIconForType(type) {
    return DEFAULT_ITEM_ICONS[this.canonicalType(type)];
  }

  get canonicalType() {
    return this.constructor.canonicalType(this.type);
  }

  async onCreateItem(options, id) {}

  static async #queueEffectSync(item) {
    if (typeof item?.syncEquippedActorEffects !== "function") return;
    try {
      await item.syncEquippedActorEffects();
    } catch (error) {
      console.error(`${LOG_HEAD}Failed to sync equipped item effects`, { item, error });
    }
  }

  static async #queueEffectRemoval(item) {
    if (typeof item?.removeSyncedActorEffects !== "function") return;
    try {
      await item.removeSyncedActorEffects({ actor: item.actor ?? item.parent ?? null });
    } catch (error) {
      console.error(`${LOG_HEAD}Failed to remove synced item effects`, { item, error });
    }
  }

  static async #queueParentItemEffectSync(effect) {
    const parent = effect?.parent;
    if (typeof parent?.syncEquippedActorEffects !== "function") return;

    try {
      await parent.syncEquippedActorEffects();
    } catch (error) {
      console.error(`${LOG_HEAD}Failed to sync parent item effects`, { effect, error });
    }
  }

  async _preCreate(data, options, user) {
    if (super._preCreate) {
      await super._preCreate(data, options, user);
    }

    const sourceType = data?.type ?? this.type;
    const canonicalType = this.constructor.canonicalType(sourceType);
    const updates = {};

    if (sourceType !== canonicalType && LEGACY_ITEM_TYPE_MAP[sourceType]) {
      updates.type = canonicalType;
    }

    if (shouldApplyDefaultIcon(data?.img ?? this.img)) {
      const defaultIcon = this.constructor.defaultIconForType(canonicalType);
      if (defaultIcon) updates.img = defaultIcon;
    }

    if (canonicalType === TEMPLATE.itemType.lifeModule && (!data?.name || data.name === "DOCUMENT.Item")) {
      updates.name = "MWD.itemType.singular.lifeModule";
    }

    if (Object.keys(updates).length) {
      this.updateSource(updates);
    }
  }

  async _preUpdate(changed, options, userId) {
    if (super._preUpdate) {
      await super._preUpdate(changed, options, userId);
    }

    const nextSystem = changed?.system
      ? foundry.utils.mergeObject(foundry.utils.deepClone(this.system ?? {}), foundry.utils.deepClone(changed.system), { inplace: false })
      : null;

    if (nextSystem && this.isPersonalWeapon()) {
      changed.system ??= {};
      changed.system.standardTraits = normalizeWeaponStandardTraits(nextSystem.standardTraits);
      changed.system.ammo = normalizeWeaponAmmo(nextSystem.ammo);
      changed.system.traits = normalizeTraits(nextSystem.traits);
      changed.system.attackRatingBand = normalizeAttackRatingBand(nextSystem.attackRatingBand);
      changed.system.range = normalizeRangeData(nextSystem.range);
      changed.system.damageType = normalizePersonalDamageType(nextSystem.damageType);
    }

    if (nextSystem && this.isArmor()) {
      changed.system ??= {};
      changed.system.mitigationByType = normalizeArmorMitigationByType(nextSystem.mitigationByType ?? nextSystem.mitigation);
      changed.system.tags = normalizeArmorTags(nextSystem.tags);
      changed.system.traits = normalizeTraits(nextSystem.traits);
      changed.system.standardTraits = normalizeArmorStandardTraits(nextSystem.standardTraits);
      changed.system.traitState = resolveArmorTraitEffects({
        standardTraits: changed.system.standardTraits,
        traits: changed.system.traits,
        traitState: nextSystem.traitState,
      }).traitState;
    }

    if (!this.isSkill()) return;

    const newCode = changed?.system?.code;
    if (newCode === undefined) return;

    const oldCode = this.system.code;
    if (newCode === oldCode) return;

    const defaults = prepareSkillDefaults(newCode);
    if (!defaults) return;

    delete defaults?.system?.code;
    foundry.utils.mergeObject(changed, defaults, { inplace: true });
  }

  prepareBaseData() {
    super.prepareBaseData();

    const canonicalType = this.canonicalType;
    if (canonicalType === TEMPLATE.itemType.personalWeapon) {
      this._preparePersonalWeaponBaseData();
    } else if (canonicalType === TEMPLATE.itemType.armor) {
      this._prepareArmorBaseData();
    }
  }

  _preparePersonalWeaponBaseData() {
    const system = this.system ?? {};
    system.equipped = Boolean(system.equipped);
    system.isPrimary = Boolean(system.isPrimary);
    system.category = String(system.category ?? system.weaponCategory ?? "ranged").trim() || "ranged";
    system.skill = String(system.skill ?? "firearms").trim() || "firearms";
    system.ap = Number(system.ap ?? system.armorPiercing ?? 0) || 0;
    system.damage = Number(system.damage ?? 0) || 0;
    system.damageType = normalizePersonalDamageType(system.damageType);
    system.attackRatingBand = normalizeAttackRatingBand(system.attackRatingBand);
    system.range = normalizeRangeData(system.range);
    system.standardTraits = normalizeWeaponStandardTraits(system.standardTraits);
    system.ammo = normalizeWeaponAmmo(system.ammo);
    system.traits = normalizeTraits(system.traits);
    system.notes = String(system.notes ?? "").trim();
  }

  _prepareArmorBaseData() {
    const system = this.system ?? {};
    system.equipped = Boolean(system.equipped);
    system.isPrimary = Boolean(system.isPrimary);
    system.rating = Math.max(0, Number(system.rating ?? 0));
    system.defenseBonus = Number(system.defenseBonus ?? 0) || 0;
    system.mitigationByType = normalizeArmorMitigationByType(system.mitigationByType ?? system.mitigation);
    delete system.mitigation;
    system.durability ??= {};
    system.durability.max = Math.max(0, Number(system.durability.max ?? system.rating ?? 0));
    system.durability.current = Math.min(
      system.durability.max,
      Math.max(0, Number(system.durability.current ?? system.durability.max ?? system.rating ?? 0))
    );
    system.standardTraits = normalizeArmorStandardTraits(system.standardTraits);
    system.tags = normalizeArmorTags(system.tags);
    system.traits = normalizeTraits(system.traits);
    system.traitState = resolveArmorTraitEffects({
      standardTraits: system.standardTraits,
      traits: system.traits,
      traitState: system.traitState,
    }).traitState;
    system.notes = String(system.notes ?? "").trim();
  }

  getAttributes() {
    return [];
  }

  getUsableAttributes() {
    return this.getAttributes();
  }

  getAttributeValue(attribute) {
    if (this.system.attributes) {
      return this.system.attributes[attribute]?.value ?? 0;
    }
    return 0;
  }

  hasOwnAnarchy() { return false; }
  hasGMAnarchy() { return false; }

  async nextConnectionMode() {}

  async setCheckbarValue(checkbarPath, value) {
    return this.update({ [checkbarPath]: value });
  }

  isWeapon() {
    return [TEMPLATE.itemType.mechWeapon, TEMPLATE.itemType.personalWeapon].includes(this.canonicalType);
  }

  isPersonalWeapon() {
    return this.canonicalType === TEMPLATE.itemType.personalWeapon;
  }

  isArmor() {
    return this.canonicalType === TEMPLATE.itemType.armor;
  }

  supportsEquippedEffectSync() {
    return this.isPersonalWeapon() || this.isArmor();
  }

  shouldApplyEquippedEffects() {
    return this.supportsEquippedEffectSync() && Boolean(this.actor) && Boolean(this.system?.equipped);
  }

  getSyncedActorEffects({ actor = this.actor } = {}) {
    if (!actor?.effects) return [];

    return actor.effects.contents.filter(effect => {
      const flag = effect.flags?.[SYSTEM_NAME]?.[MWDItem.EQUIPPED_EFFECT_FLAG];
      return flag?.sourceItemId === this.id;
    });
  }

  async removeSyncedActorEffects({ actor = this.actor } = {}) {
    const synced = this.getSyncedActorEffects({ actor });
    if (!synced.length || !actor) return [];
    return actor.deleteEmbeddedDocuments("ActiveEffect", synced.map(effect => effect.id));
  }

  async syncEquippedActorEffects({ actor = this.actor } = {}) {
    if (!actor || !this.supportsEquippedEffectSync()) return { created: [], updated: [], deleted: [] };

    const existing = this.getSyncedActorEffects({ actor });
    const sourceEffects = Array.from(this.effects?.contents ?? []);

    if (!this.shouldApplyEquippedEffects()) {
      if (!existing.length) return { created: [], updated: [], deleted: [] };
      const deleted = await actor.deleteEmbeddedDocuments("ActiveEffect", existing.map(effect => effect.id));
      return { created: [], updated: [], deleted };
    }

    const existingBySource = new Map();
    for (const effect of existing) {
      const sourceEffectId = effect.flags?.[SYSTEM_NAME]?.[MWDItem.EQUIPPED_EFFECT_FLAG]?.sourceEffectId;
      if (!sourceEffectId) continue;
      const bucket = existingBySource.get(sourceEffectId) ?? [];
      bucket.push(effect);
      existingBySource.set(sourceEffectId, bucket);
    }

    const createData = [];
    const updateData = [];
    const deleteIds = [];
    const remainingSourceIds = new Set(sourceEffects.map(effect => effect.id));

    for (const [sourceEffectId, bucket] of existingBySource.entries()) {
      if (!remainingSourceIds.has(sourceEffectId)) {
        deleteIds.push(...bucket.map(effect => effect.id));
        continue;
      }

      if (bucket.length > 1) {
        deleteIds.push(...bucket.slice(1).map(effect => effect.id));
      }
    }

    for (const sourceEffect of sourceEffects) {
      const bucket = existingBySource.get(sourceEffect.id) ?? [];
      const current = bucket[0] ?? null;
      const nextData = this._prepareSyncedActorEffectData(sourceEffect);

      if (current) {
        updateData.push({ _id: current.id, ...nextData });
      } else {
        createData.push(nextData);
      }
    }

    const deleted = deleteIds.length ? await actor.deleteEmbeddedDocuments("ActiveEffect", deleteIds) : [];
    const updated = updateData.length ? await actor.updateEmbeddedDocuments("ActiveEffect", updateData) : [];
    const created = createData.length ? await actor.createEmbeddedDocuments("ActiveEffect", createData) : [];

    return { created, updated, deleted };
  }

  _prepareSyncedActorEffectData(sourceEffect) {
    const data = sourceEffect.toObject();
    delete data._id;

    const sourceName = String(sourceEffect.name ?? "Effect").trim() || "Effect";
    const itemName = String(this.name ?? "Item").trim() || "Item";
    const prefixedName = sourceName.startsWith(itemName) ? sourceName : `${itemName}: ${sourceName}`;

    data.name = prefixedName;
    data.transfer = false;
    data.origin = sourceEffect.uuid ?? this.uuid ?? data.origin ?? null;
    data.flags = foundry.utils.mergeObject(data.flags ?? {}, {
      [SYSTEM_NAME]: {
        [MWDItem.EQUIPPED_EFFECT_FLAG]: {
          synced: true,
          sourceItemId: this.id,
          sourceItemUuid: this.uuid ?? null,
          sourceEffectId: sourceEffect.id,
          sourceEffectUuid: sourceEffect.uuid ?? null
        }
      }
    });

    return data;
  }

  isSkill() {
    return this.canonicalType === TEMPLATE.itemType.skill;
  }

  async rollAttribute(attribute) {
    if (this.parent) {
      await RollDialog.itemAttributeRoll(this, attribute);
    }
  }

  async switchMonitorCheck(monitor, index, checked, sourceActorId = undefined) {
    await Checkbars.switchMonitorCheck(this.parent, monitor, index, checked, sourceActorId, this);
  }

  async setCounter(monitor, value) {
    await Checkbars.setCounter(this, monitor, value);
  }

  async createModifier(modifier = {}) {
    modifier = foundry.utils.mergeObject(modifier, {
      group: "roll",
      effect: "pool",
      category: "skill",
      subCategory: "",
      value: 0,
      condition: ""
    });
    this._mutateModifiers(values => values.concat([modifier]));
  }

  async deleteModifier(modifierId) {
    await this._mutateModifiers(modifiers => modifiers.filter(it => it.id !== modifierId));
  }

  async changeModifierSelection(modifierId, select, value) {
    const impact = this._computeModifierImpact(select, value);
    this._applyModifierUpdate(modifierId, impact);
  }

  _computeModifierImpact(select, value) {
    switch (select) {
      case "group":
        return m => {
          if (m.group !== value) {
            m.group = value;
            m.effect = "";
            m.category = "";
            m.subCategory = "";
          }
        };
      case "effect":
        return m => m.effect = value;
      case "category":
        return m => {
          if (m.category !== value) {
            m.category = value;
            m.subCategory = "";
          }
        };
      case "subCategory":
        return m => m.subCategory = value;
    }
    return m => {};
  }

  async changeModifierValue(modifierId, value) {
    this._applyModifierUpdate(modifierId, m => m.value = Number(value));
  }

  async changeModifierCondition(modifierId, value) {
    this._applyModifierUpdate(modifierId, m => m.condition = value);
  }

  async _applyModifierUpdate(id, updateFunction = m => {}) {
    await this._mutateModifiers(values => values.map(it => {
      if (it.id === id) updateFunction(it);
      return it;
    }));
  }

  async _mutateModifiers(mutation = values => values) {
    const modifiers = mutation(this.system.modifiers);
    Misc.reindexIds(modifiers);
    await this.update({ "system.modifiers": modifiers });
  }

  async _mutateWeaponStandardTraits(mutation = values => values) {
    const next = mutation(foundry.utils.deepClone(normalizeWeaponStandardTraits(this.system?.standardTraits)));
    await this.update({ "system.standardTraits": normalizeWeaponStandardTraits(next) });
  }

  async createWeaponStandardTrait(entry = {}) {
    await this._mutateWeaponStandardTraits(traits => traits.concat([{
      id: entry.id ?? foundry.utils.randomID(),
      key: entry.key ?? "armorPiercing",
      rating: Math.max(0, Number(entry.rating ?? 0) || 0),
    }]));
  }

  async deleteWeaponStandardTrait(entryId) {
    await this._mutateWeaponStandardTraits(traits => traits.filter(entry => entry.id !== entryId));
  }

  async updateWeaponStandardTrait(entryId, field, value) {
    await this._mutateWeaponStandardTraits(traits => traits.map(entry => {
      if (entry.id !== entryId) return entry;
      if (field === "key") entry.key = value;
      if (field === "rating") entry.rating = Math.max(0, Number(value ?? 0) || 0);
      return entry;
    }));
  }

  async _mutateArmorStandardTraits(mutation = values => values) {
    const next = mutation(foundry.utils.deepClone(normalizeArmorStandardTraits(this.system?.standardTraits)));
    await this.update({ "system.standardTraits": normalizeArmorStandardTraits(next) });
  }

  async createArmorStandardTrait(entry = {}) {
    await this._mutateArmorStandardTraits(traits => traits.concat([{
      id: entry.id ?? foundry.utils.randomID(),
      key: entry.key ?? "ablative",
      rating: Math.max(0, Number(entry.rating ?? 0) || 0),
    }]));
  }

  async deleteArmorStandardTrait(entryId) {
    await this._mutateArmorStandardTraits(traits => traits.filter(entry => entry.id !== entryId));
  }

  async updateArmorStandardTrait(entryId, field, value) {
    await this._mutateArmorStandardTraits(traits => traits.map(entry => {
      if (entry.id !== entryId) return entry;
      if (field === "key") entry.key = value;
      if (field === "rating") entry.rating = Math.max(0, Number(value ?? 0) || 0);
      return entry;
    }));
  }

  async _mutateAmmo(mutation = ammo => ammo) {
    const next = mutation(foundry.utils.deepClone(normalizeWeaponAmmo(this.system?.ammo)));
    await this.update({ "system.ammo": normalizeWeaponAmmo(next) });
  }

  async updateAmmoField(field, value) {
    await this._mutateAmmo(ammo => {
      if (field === "activeTypeId") {
        ammo.activeTypeId = String(value ?? "").trim();
      } else {
        foundry.utils.setProperty(ammo, field, value);
      }
      return ammo;
    });
  }

  async createAmmoType(entry = {}) {
    await this._mutateAmmo(ammo => {
      ammo.types.push({
        id: entry.id ?? foundry.utils.randomID(),
        name: entry.name ?? "Ammo",
        damageType: entry.damageType ?? "",
        apMod: Number(entry.apMod ?? 0) || 0,
        attackRatingBandMod: entry.attackRatingBandMod ?? {},
        standardTraits: entry.standardTraits ?? [],
        traits: entry.traits ?? [],
      });
      ammo.activeTypeId = ammo.activeTypeId || ammo.types[ammo.types.length - 1]?.id || "";
      return ammo;
    });
  }

  async deleteAmmoType(ammoTypeId) {
    await this._mutateAmmo(ammo => {
      ammo.types = ammo.types.filter(type => type.id !== ammoTypeId);
      if (ammo.activeTypeId === ammoTypeId) {
        ammo.activeTypeId = ammo.types[0]?.id ?? "";
      }
      return ammo;
    });
  }

  async updateAmmoType(ammoTypeId, field, value) {
    await this._mutateAmmo(ammo => {
      ammo.types = ammo.types.map(type => {
        if (type.id !== ammoTypeId) return type;
        if (field === "traits") {
          type.traits = value;
        } else if (field === "damageType") {
          type.damageType = value;
        } else if (field === "apMod") {
          type.apMod = Number(value ?? 0) || 0;
        } else if (field.startsWith("attackRatingBandMod.")) {
          const band = field.split(".")[1];
          type.attackRatingBandMod ??= {};
          type.attackRatingBandMod[band] = Number(value ?? 0) || 0;
        } else {
          type[field] = value;
        }
        return type;
      });
      return ammo;
    });
  }

  async createAmmoTypeStandardTrait(ammoTypeId, entry = {}) {
    await this._mutateAmmo(ammo => {
      ammo.types = ammo.types.map(type => {
        if (type.id !== ammoTypeId) return type;
        type.standardTraits = normalizeWeaponStandardTraits(type.standardTraits).concat([{
          id: entry.id ?? foundry.utils.randomID(),
          key: entry.key ?? "armorPiercing",
          rating: Math.max(0, Number(entry.rating ?? 0) || 0),
        }]);
        return type;
      });
      return ammo;
    });
  }

  async deleteAmmoTypeStandardTrait(ammoTypeId, entryId) {
    await this._mutateAmmo(ammo => {
      ammo.types = ammo.types.map(type => {
        if (type.id !== ammoTypeId) return type;
        type.standardTraits = normalizeWeaponStandardTraits(type.standardTraits)
          .filter(entry => entry.id !== entryId);
        return type;
      });
      return ammo;
    });
  }

  async updateAmmoTypeStandardTrait(ammoTypeId, entryId, field, value) {
    await this._mutateAmmo(ammo => {
      ammo.types = ammo.types.map(type => {
        if (type.id !== ammoTypeId) return type;
        type.standardTraits = normalizeWeaponStandardTraits(type.standardTraits)
          .map(entry => {
            if (entry.id !== entryId) return entry;
            if (field === "key") entry.key = value;
            if (field === "rating") entry.rating = Math.max(0, Number(value ?? 0) || 0);
            return entry;
          });
        return type;
      });
      return ammo;
    });
  }

  getAmmoState({ ammoTypeId = "" } = {}) {
    return resolveWeaponAmmo(this.system?.ammo, ammoTypeId);
  }

  async setActiveAmmoType(ammoTypeId) {
    await this.updateAmmoField("activeTypeId", ammoTypeId);
  }

  canConsumeAmmo({ ammoTypeId = "" } = {}) {
    const ammoState = this.getAmmoState({ ammoTypeId });
    if (!ammoState?.isTracked) return true;
    return Number(ammoState?.ammo?.current ?? 0) >= Number(ammoState?.ammo?.consumePerAttack ?? 1);
  }

  async consumeAmmo({ ammoTypeId = "" } = {}) {
    const ammoState = this.getAmmoState({ ammoTypeId });
    if (!ammoState?.isTracked) return true;

    const consumePerAttack = Math.max(1, Number(ammoState?.ammo?.consumePerAttack ?? 1) || 1);
    const current = Math.max(0, Number(ammoState?.ammo?.current ?? 0) || 0);
    if (current < consumePerAttack) return false;

    await this._mutateAmmo(ammo => {
      ammo.activeTypeId = ammoState.activeTypeId || ammo.activeTypeId || "";
      ammo.current = Math.max(0, current - consumePerAttack);
      return ammo;
    });
    return true;
  }

  getCombatProfile({ ammoTypeId = "" } = {}) {
    if (!this.isPersonalWeapon()) return null;

    const system = this.system ?? {};
    const range = normalizeRangeData(system.range);
    const skillCode = String(system.skill ?? "").trim();
    const skillDef = getSkillDef(skillCode);
    const damage = Number(system.damage ?? 0) || 0;
    const category = String(system.category ?? system.weaponCategory ?? "ranged").trim() || "ranged";
    const effectiveProfile = resolveEffectiveWeaponProfile({
      damageType: system.damageType,
      ap: Number(system.ap ?? system.armorPiercing ?? 0) || 0,
      attackRatingBand: normalizeAttackRatingBand(system.attackRatingBand),
      traits: normalizeTraits(system.traits),
      standardTraits: normalizeWeaponStandardTraits(system.standardTraits),
      ammo: normalizeWeaponAmmo(system.ammo),
      ammoTypeId,
    });

    return {
      id: this.id ?? "weapon",
      uuid: this.uuid ?? null,
      name: this.name ?? "Weapon",
      img: this.img,
      item: this,
      type: this.canonicalType,
      equipped: Boolean(system.equipped),
      isPrimary: Boolean(system.isPrimary),
      category,
      skill: skillCode || "firearms",
      skillDef,
      damage,
      ap: effectiveProfile.ap,
      damageType: effectiveProfile.damageType,
      damageTypeLabel: getPersonalDamageTypeLabel(effectiveProfile.damageType),
      attackRatingBand: effectiveProfile.attackRatingBand,
      range,
      defaultRangeBand: this.getDefaultRangeBand(range),
      traits: effectiveProfile.traits,
      standardTraits: effectiveProfile.standardTraits,
      effects: effectiveProfile.effects,
      ammoLabel: effectiveProfile.ammoLabel,
      ammoType: effectiveProfile.ammoType,
      ammoState: effectiveProfile.ammoState,
      notes: String(system.notes ?? system.description ?? "").trim()
    };
  }

  getArmorProfile({ actor = this.actor } = {}) {
    if (!this.isArmor()) return null;

    const system = this.system ?? {};
    const rating = Math.max(0, Number(system.rating ?? 0));
    const maxDurability = Math.max(0, Number(system?.durability?.max ?? rating));
    const currentDurability = Math.min(
      maxDurability,
      Math.max(0, Number(system?.durability?.current ?? maxDurability))
    );
    const mitigationByType = normalizeArmorMitigationByType(system?.mitigationByType ?? system?.mitigation);
    const armorTraitEffects = resolveArmorTraitEffects({
      standardTraits: normalizeArmorStandardTraits(system?.standardTraits),
      traits: normalizeTraits(system?.traits),
      traitState: system?.traitState,
    });
    const tags = normalizeArmorTags(system?.tags);
    const baseMitigation = computeArmorBaseMitigation(currentDurability);

    return {
      id: this.id ?? "armor",
      uuid: this.uuid ?? null,
      name: this.name ?? "Armor",
      img: this.img,
      type: this.canonicalType,
      item: this,
      actor,
      equipped: Boolean(system.equipped),
      isPrimary: Boolean(system.isPrimary),
      rating,
      defenseBonus: Number(system.defenseBonus ?? 0) || 0,
      currentArmorRating: currentDurability,
      baseMitigation,
      baseResistance: baseMitigation,
      mitigationByType: mergeArmorMitigationByType(mitigationByType, armorTraitEffects.mitigationByType),
      tags,
      isDestroyed: currentDurability <= 0,
      durability: {
        current: currentDurability,
        max: maxDurability,
      },
      traitState: armorTraitEffects.traitState,
      standardTraits: normalizeArmorStandardTraits(system.standardTraits),
      traits: getArmorTraitLabels({
        traits: normalizeTraits(system.traits),
        standardTraits: normalizeArmorStandardTraits(system.standardTraits),
      }),
      notes: String(system.notes ?? "").trim(),
    };
  }

  getDefaultRangeBand(range = normalizeRangeData(this.system?.range)) {
    return getDefaultRangeBand(range);
  }

  isWeaponSkill(item) {
    return (item?.canonicalType ?? item?.type) === TEMPLATE.itemType.skill && item.system.code === this.system.skill;
  }

  getWeaponSkill() {
    const actorSkill = this.actor?.items.find(skill => this.isWeaponSkill(skill));
    if (actorSkill) return actorSkill;

    const worldSkill = game.items.find(skill => this.isWeaponSkill(skill));
    if (worldSkill) return worldSkill;

    return prepareSkillDefaults(this.system.skill);
  }

  getDefense() {
    if (!this.isPersonalWeapon()) {
      return this.system.defense ? AttributeActions.fixedDefenseCode(this.system.defense) : undefined;
    }
    if (this.system.defense) {
      return AttributeActions.fixedDefenseCode(this.system.defense);
    }

    const skillDef = getSkillDef(String(this.system.skill ?? "").trim());
    return skillDef?.defense ? AttributeActions.fixedDefenseCode(skillDef.defense) : undefined;
  }

  getDamage() {
    if (!this.parent) return undefined;

    const monitor = this._getMonitor();
    const damageAttributeValue = this.system.damageAttribute
      ? (this.parent.getAttributeValue(this.system.damageAttribute) ?? 0)
      : 0;
    const profile = this.isPersonalWeapon() ? this.getCombatProfile() : null;

    return {
      value: damageValue(
        monitor,
        this.system.damage,
        this.system.damageAttribute,
        damageAttributeValue
      ),
      monitor,
      damageType: profile?.damageType ?? this.system.damageType,
      damageTypeLabel: profile?.damageTypeLabel ?? this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: armorMode(monitor, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }

  getDamageCode() {
    return damageCode(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }

  getDamageTypeLabel() {
    if (this.isPersonalWeapon()) {
      return getPersonalDamageTypeLabel(this.getCombatProfile()?.damageType ?? this.system.damageType);
    }
    const labelKey = MWD.mwd.weaponDamageType[this.system.damageType]
      ?? MWD.mwd.personalDamageType[this.system.damageType];
    return labelKey ? labelKey : this.system.damageType;
  }

  getRanges() {
    return getRangeList(normalizeRangeData(this.system.range))
      .filter(it => it.allowed)
      .map(it => ({ value: it.value, labelkey: it.labelkey }));
  }

  validateTargets(actor) {
    const monitor = this.getDamage()?.monitor;
    const targets = AnarchyUsers.getTargetTokens(game.user);
    const validTargets = targets.filter(token => token.actor?.canReceiveDamage(monitor));
    const invalidTargets = targets.filter(token => !token.actor?.canReceiveDamage(monitor))
      .map(token => token.name);

    if (invalidTargets.length > 0) {
      const content = formatString(MWD.common.errors.ignoredTargets, {
        targets: invalidTargets.reduce(Misc.joiner(", ")),
      });
      ui.notifications.info(content);
    }

    if (validTargets.length === 0) {
      const content = formatString(MWD.common.errors.noTargetSelected, {
        weapon: this.name ?? MWD.itemType.singular.weapon
      });
      ui.notifications.info(content);
    } else {
      this.checkWeaponTargetsCount(validTargets);
    }

    return validTargets;
  }

  checkWeaponTargetsCount(targets) {
    const area = this.system.area;
    const areaTargets = AREA_TARGETS[area] ?? {};
    ErrorManager.checkTargetsCount(areaTargets.targets ?? 0, targets, area);
  }

  getAreaModifier(countTargets) {
    const area = this.getArea();
    const areaTargets = AREA_TARGETS[area] ?? {};
    if (areaTargets.targets && areaTargets.adjust && countTargets <= areaTargets.targets) {
      return areaTargets.adjust[countTargets - 1] ?? 0;
    }
    return 0;
  }

  getArea() {
    if (this.system.area === "") {
      return TEMPLATE.area.none;
    }
    return this.system.area ?? TEMPLATE.area.none;
  }

  _getMonitor() {
    if (this.isPersonalWeapon()) {
      return TEMPLATE.monitors.physical;
    }
    return this.system.monitor || TEMPLATE.monitors.physical;
  }

  isKnowledgeSkill() {
    return this.isSkill() && this.system.code === "knowledge";
  }

  isGeneralSkill() {
    return this.isSkill() && this.system.code !== "knowledge";
  }

  prepareShortcut() {
    if (this.isSkill()) {
      return {
        img: this.img,
        label: this.system.specialization ? `${this.name}: ${this.system.specialization}` : this.name,
        callback: token => token.actor.rollSkill(this, this.system.specialization),
      };
    }

    if (this.isWeapon()) {
      return {
        img: this.img,
        label: this.name,
        callback: token => token.actor.rollWeapon(this)
      };
    }

    return undefined;
  }

  prepateShortcut() {
    return this.prepareShortcut();
  }
}

export const AnarchyBaseItem = MWDItem;
