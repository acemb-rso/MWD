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
import { AnarchyUsers } from "../users.js";
import { formatString } from "../strings.js";
import { getSkillDef } from "../mwd/skills.js";
import { PersonalCombatTracker } from "../combat/personal-combat-tracker.js";
import {
  getPersonalRangeBandLabel,
  normalizePersonalRangeData,
} from "../mwd/personal-range-bands.js";
import {
  getLifeModuleCatalogEntry,
  normalizeLifeModuleItemSystem,
} from "../mwd/life-modules.js";
import { normalizeMachineWeaponSize } from "../mwd/machine-hardpoints.js";
import {
  buildMachineEnergyPayloadModel,
  getMachineWeaponDamageTypeLabel,
  normalizeMachineWeaponDamageType,
} from "../mwd/machine-weapon-types.js";
import {
  normalizeQualityTraitSystem,
  normalizeTraitEffects,
  normalizeTraitLimits,
  normalizeTraitPrerequisites,
} from "../mwd/traits.js";
import {
  computeArmorBaseMitigation,
  getArmorTraitLabels,
  getPersonalDamageTypeLabel,
  mergeArmorMitigationByType,
  normalizeConsumptionSource,
  normalizeArmorMitigationByType,
  normalizeArmorStandardTraits,
  normalizeArmorTags,
  normalizePayloadProfile,
  normalizePersonalDamageType,
  normalizeSelectedPayloadId,
  normalizeWeaponStandardTraits,
  normalizeWeaponFireModes,
  normalizeWeaponKeywords,
  normalizeWeaponResolution,
  normalizeWeaponConsumptionSources,
  normalizeWeaponPayloads,
  normalizeWeaponTraits,
  resolveArmorTraitEffects,
  resolveEffectiveWeaponProfile,
  resolveWeaponPayloadState,
} from "../mwd/personal-damage.js";
import { normalizeAssetModuleSystem } from "../mwd/asset-module-rules.js";
import {
  createCapabilityMigrationReport,
  normalizeWeaponCapabilityState,
} from "../mwd/personal-weapon-capabilities.js";
import { getDocumentTypeCreateDefaults } from "../document-type-defaults.js";
import {
  canonicalizeItemType,
  getDefaultItemIcon,
  isLegacyItemType,
} from "./item-type-utils.js";

const RANGE_ORDER = Object.freeze(["close", "near", "far", "extreme"]);

const AREA_TARGETS = Object.freeze({
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: undefined },
  cone: { targets: undefined },
  rect: { targets: undefined },
  ray: { targets: undefined },
});

function forcedDeletion() {
  return foundry.data.operators.ForcedDeletion;
}

function ensureObjectPath(target, path) {
  const segments = String(path ?? "").split(".").map(segment => segment.trim()).filter(Boolean);
  if (!target || typeof target !== "object" || segments.length < 2) return target;

  let current = target;
  for (let index = 0; index < (segments.length - 1); index += 1) {
    const key = segments[index];
    const next = current?.[key];
    if (!next || typeof next !== "object" || Array.isArray(next)) {
      current[key] = {};
    }
    current = current[key];
  }

  return target;
}

function preparePayloadForFieldUpdate(payload, field) {
  const path = String(field ?? "").trim();
  if (!payload || typeof payload !== "object" || !path) return false;

  // Hazard edits imply a persistent area effect, so ensure that container exists first.
  if (path.startsWith("areaEffect.hazard.")) {
    if (!payload.areaEffect || typeof payload.areaEffect !== "object" || Array.isArray(payload.areaEffect)) {
      payload.areaEffect = {};
    }
    const areaEffectKind = String(payload.areaEffect.kind ?? "").trim().toLowerCase();
    if (areaEffectKind && areaEffectKind !== "persistent") {
      return false;
    }
    payload.areaEffect.kind = "persistent";
  }

  ensureObjectPath(payload, path);
  return true;
}

function normalizeTraits(value) {
  return normalizeWeaponTraits(value);
}

function normalizePersonalWeaponCapabilityFields(system = {}) {
  const capabilityState = normalizeWeaponCapabilityState({
    traits: system.traits,
    keywords: system.keywords,
    report: createCapabilityMigrationReport(),
    path: "system.traits",
  });

  return {
    traits: capabilityState.traits,
    keywords: capabilityState.keywords,
  };
}

function normalizeRangeKey(rangeKey) {
  if (rangeKey === "long") return "extreme";
  if (rangeKey === "short") return "close";
  if (rangeKey === "medium") return "near";
  return RANGE_ORDER.includes(rangeKey) ? rangeKey : "near";
}

function normalizeRangeData(range) {
  const normalized = normalizePersonalRangeData(range);
  normalized.max = normalizeRangeKey(normalized.max ?? range?.max ?? "extreme");
  return normalized;
}

function normalizeMechWeaponCategory(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  return normalized === "melee" ? "melee" : "ranged";
}

function normalizeMechWeaponSkill(category, _value = "") {
  return normalizeMechWeaponCategory(category) === "melee" ? "meleeCombat" : "gunnery";
}

function normalizeMechWeaponRange(range, category) {
  if (normalizeMechWeaponCategory(category) === "melee") {
    return normalizeRangeData({
      max: "close",
      close: 0,
      near: 0,
      far: 0,
      extreme: 0,
    });
  }

  return normalizeRangeData(range);
}

function normalizeAttackRatingBand(bands) {
  return {
    close: Number(bands?.close ?? bands?.short ?? 0) || 0,
    near: Number(bands?.near ?? bands?.medium ?? 0) || 0,
    far: Number(bands?.far ?? bands?.long ?? 0) || 0,
    extreme: Number(bands?.extreme ?? 0) || 0
  };
}

function normalizeGearQuantity(value, fallback = 1) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return Math.max(0, Math.trunc(Number(fallback) || 0));
  return Math.max(0, Math.trunc(numeric));
}

function normalizeGearRating(value, fallback = 0) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return Math.max(0, Math.trunc(Number(fallback) || 0));
  return Math.max(0, Math.trunc(numeric));
}

function normalizeGearCategory(value) {
  return String(value ?? "").trim();
}

function normalizeGearTags(value) {
  const raw = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];

  return raw
    .map(entry => String(entry ?? "").trim())
    .filter(Boolean);
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
    labelkey: getPersonalRangeBandLabel(key)
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

function prepareLifeModuleDefaults(system = {}) {
  const normalizedSystem = normalizeLifeModuleItemSystem(system);
  const catalog = getLifeModuleCatalogEntry(normalizedSystem.catalogId);

  return {
    system: normalizedSystem,
    ...(catalog ? { name: catalog.label } : {})
  };
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
    keywords: [],
    resolution: { resolverKey: "standard", damageModel: "", onHitEffect: null },
    fireModes: {
      single: { enabled: false },
      burst: { enabled: false },
      fullAuto: { enabled: false },
    },
    payloads: [],
    selectedPayloadId: "",
    consumptionSources: [{
      id: "untracked",
      label: "Untracked",
      kind: "untracked",
      tracking: { current: 0, max: 0 },
      link: { actorPath: "", itemId: "", itemPath: "" },
    }],
    payloadState: {
      payloads: [],
      activePayloadId: "",
      payloadLabel: "",
      sourceId: "",
      sourceLabel: "",
      sourceKind: "",
      current: 0,
      max: 0,
      consumePerUse: 1,
      isTracked: false,
    },
    payloadLabel: "",
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
    return canonicalizeItemType(type);
  }

  static defaultIconForType(type) {
    return getDefaultItemIcon(type);
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
    const defaults = await getDocumentTypeCreateDefaults("Item", canonicalType);

    if (defaults.system && Object.keys(defaults.system).length) {
      updates.system = foundry.utils.mergeObject(
        foundry.utils.deepClone(defaults.system),
        foundry.utils.deepClone(data?.system ?? this.system ?? {}),
        { inplace: false, recursive: true, overwrite: true }
      );
    }

    if (sourceType !== canonicalType && isLegacyItemType(sourceType)) {
      updates.type = canonicalType;
    }

    if (shouldApplyDefaultIcon(data?.img ?? this.img)) {
      const defaultIcon = this.constructor.defaultIconForType(canonicalType);
      if (defaultIcon) updates.img = defaultIcon;
    }

    if (canonicalType === TEMPLATE.itemType.lifeModule && (!data?.name || data.name === "DOCUMENT.Item")) {
      updates.name = "MWD.itemType.singular.lifeModule";
    }

    if (canonicalType === TEMPLATE.itemType.lifeModule) {
      const lifeModuleDefaults = prepareLifeModuleDefaults(updates.system ?? data?.system ?? this.system ?? {});
      updates.system = lifeModuleDefaults.system;
      if (lifeModuleDefaults.name && (!data?.name || data.name === "DOCUMENT.Item")) {
        updates.name = lifeModuleDefaults.name;
      }
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
      const legacyAmmo = nextSystem.ammo;
      const capabilityFields = normalizePersonalWeaponCapabilityFields(nextSystem);
      changed.system.standardTraits = [];
      changed.system.payloads = normalizeWeaponPayloads(nextSystem.payloads, { legacyAmmo, category: nextSystem.category });
      changed.system.consumptionSources = normalizeWeaponConsumptionSources(nextSystem.consumptionSources, { legacyAmmo });
      changed.system.selectedPayloadId = normalizeSelectedPayloadId(
        nextSystem.selectedPayloadId,
        changed.system.payloads,
        { legacyAmmo, category: nextSystem.category }
      );
      changed.system.traits = capabilityFields.traits;
      changed.system.keywords = capabilityFields.keywords;
      changed.system.resolution = normalizeWeaponResolution(nextSystem.resolution, "standard");
      changed.system.fireModes = normalizeWeaponFireModes(nextSystem.fireModes);
      changed.system.attackRatingBand = normalizeAttackRatingBand(nextSystem.attackRatingBand);
      changed.system.range = normalizeRangeData(nextSystem.range);
      changed.system.damageType = normalizePersonalDamageType(nextSystem.damageType);
      changed.system.ammo = forcedDeletion();
    }

    if (nextSystem && this.isMechWeapon()) {
      changed.system ??= {};
      const legacyAmmo = nextSystem.ammo;
      const category = normalizeMechWeaponCategory(nextSystem.weaponCategory ?? nextSystem.category);
      const payloadModel = buildMachineEnergyPayloadModel({ ...nextSystem, category, weaponCategory: category }, {
        idFactory: () => foundry.utils.randomID(),
      });
      changed.system.category = category;
      changed.system.weaponCategory = category;
      changed.system.skill = normalizeMechWeaponSkill(category, nextSystem.skill);
      changed.system.size = normalizeMachineWeaponSize(nextSystem.size ?? nextSystem.hardpointSize ?? "small");
      changed.system.ap = Number(nextSystem.ap ?? nextSystem.armorPiercing ?? 0) || 0;
      changed.system.damage = Math.max(0, Number(nextSystem.damage ?? 0) || 0);
      changed.system.damageType = payloadModel.damageType;
      changed.system.attackRatingBand = normalizeAttackRatingBand(nextSystem.attackRatingBand);
      changed.system.range = normalizeMechWeaponRange(nextSystem.range, category);
      changed.system.payloads = payloadModel.payloads;
      changed.system.consumptionSources = normalizeWeaponConsumptionSources(nextSystem.consumptionSources, { legacyAmmo });
      changed.system.selectedPayloadId = payloadModel.selectedPayloadId;
      changed.system.heat = Math.max(0, Number(nextSystem.heat ?? 0) || 0);
      changed.system.area = String(nextSystem.area ?? "none").trim() || "none";
      changed.system.volatile = Boolean(nextSystem.volatile);
      changed.system.ammo = forcedDeletion();
      changed.system.hardpointId = forcedDeletion();
      changed.system.hardpointType = forcedDeletion();
      changed.system.hardpointSize = forcedDeletion();
      changed.system.mountLocation = forcedDeletion();
      changed.system.damageAttribute = forcedDeletion();
      changed.system.monitor = forcedDeletion();
      changed.system.noArmor = forcedDeletion();
      changed.system.armorAvoidance = forcedDeletion();
      changed.system.defense = forcedDeletion();
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

    if (nextSystem && this.isLifeModule()) {
      const defaults = prepareLifeModuleDefaults(nextSystem);
      changed.system ??= {};
      foundry.utils.mergeObject(changed.system, defaults.system, { inplace: true, overwrite: true });
      if (defaults.name) changed.name = defaults.name;
      return;
    }

    if (nextSystem && this.isQuality()) {
      changed.system ??= {};
      const normalized = normalizeQualityTraitSystem(nextSystem);
      foundry.utils.mergeObject(changed.system, normalized, { inplace: true, overwrite: true });
      return;
    }

    if (nextSystem && this.canonicalType === TEMPLATE.itemType.assetModule) {
      changed.system ??= {};
      const normalized = normalizeAssetModuleSystem(nextSystem);
      foundry.utils.mergeObject(changed.system, normalized, { inplace: true, overwrite: true });
      return;
    }

    if (nextSystem && this.isQuantityTrackedInventoryItem()) {
      changed.system ??= {};
      changed.system.quantity = normalizeGearQuantity(nextSystem.quantity, 1);
      changed.system.rating = normalizeGearRating(nextSystem.rating, 0);
      changed.system.category = normalizeGearCategory(nextSystem.category);
      changed.system.tags = normalizeGearTags(nextSystem.tags);
      return;
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
    } else if (canonicalType === TEMPLATE.itemType.mechWeapon) {
      this._prepareMechWeaponBaseData();
    } else if (canonicalType === TEMPLATE.itemType.armor) {
      this._prepareArmorBaseData();
    } else if (canonicalType === TEMPLATE.itemType.lifeModule) {
      this._prepareLifeModuleBaseData();
    } else if (canonicalType === TEMPLATE.itemType.quality) {
      this._prepareQualityBaseData();
    } else if (canonicalType === TEMPLATE.itemType.assetModule) {
      this._prepareAssetModuleBaseData();
    } else if ([TEMPLATE.itemType.gear, TEMPLATE.itemType.consumable].includes(canonicalType)) {
      this._prepareGearBaseData();
    }
  }

  _prepareAssetModuleBaseData() {
    const system = this.system ?? {};
    const normalized = normalizeAssetModuleSystem(system);
    Object.assign(system, normalized);
  }

  _preparePersonalWeaponBaseData() {
    const system = this.system ?? {};
    const legacyAmmo = system.ammo;
    system.equipped = Boolean(system.equipped);
    system.isPrimary = Boolean(system.isPrimary);
    system.category = String(system.category ?? system.weaponCategory ?? "ranged").trim() || "ranged";
    system.skill = String(system.skill ?? "firearms").trim() || "firearms";
    system.ap = Number(system.ap ?? system.armorPiercing ?? 0) || 0;
    system.damage = Number(system.damage ?? 0) || 0;
    system.damageType = normalizePersonalDamageType(system.damageType);
    system.attackRatingBand = normalizeAttackRatingBand(system.attackRatingBand);
    system.range = normalizeRangeData(system.range);
    const capabilityFields = normalizePersonalWeaponCapabilityFields(system);
    system.standardTraits = [];
    system.traits = capabilityFields.traits;
    system.keywords = capabilityFields.keywords;
    system.resolution = normalizeWeaponResolution(system.resolution, "standard");
    system.fireModes = normalizeWeaponFireModes(system.fireModes);
    system.payloads = normalizeWeaponPayloads(system.payloads, { legacyAmmo, category: system.category });
    system.consumptionSources = normalizeWeaponConsumptionSources(system.consumptionSources, { legacyAmmo });
    system.selectedPayloadId = normalizeSelectedPayloadId(system.selectedPayloadId, system.payloads, { legacyAmmo, category: system.category });
    delete system.ammo;
    system.notes = String(system.notes ?? "").trim();
  }

  _prepareMechWeaponBaseData() {
    const system = this.system ?? {};
    const legacyAmmo = system.ammo;
    const category = normalizeMechWeaponCategory(system.weaponCategory ?? system.category);

    system.category = category;
    system.weaponCategory = category;
    system.skill = normalizeMechWeaponSkill(category, system.skill);
    system.size = normalizeMachineWeaponSize(system.size ?? system.hardpointSize ?? "small");
    system.ap = Number(system.ap ?? system.armorPiercing ?? 0) || 0;
    system.damage = Math.max(0, Number(system.damage ?? 0) || 0);
    const payloadModel = buildMachineEnergyPayloadModel({ ...system, category, weaponCategory: category });
    system.damageType = payloadModel.damageType;
    system.attackRatingBand = normalizeAttackRatingBand(system.attackRatingBand);
    system.range = normalizeMechWeaponRange(system.range, category);
    system.payloads = payloadModel.payloads;
    system.consumptionSources = normalizeWeaponConsumptionSources(system.consumptionSources, { legacyAmmo });
    system.selectedPayloadId = payloadModel.selectedPayloadId;
    system.heat = Math.max(0, Number(system.heat ?? 0) || 0);
    system.area = String(system.area ?? "none").trim() || "none";
    system.volatile = Boolean(system.volatile);
    system.notes = String(system.notes ?? "").trim();

    delete system.ammo;
    delete system.hardpointId;
    delete system.hardpointType;
    delete system.hardpointSize;
    delete system.mountLocation;
    delete system.damageAttribute;
    delete system.monitor;
    delete system.noArmor;
    delete system.armorAvoidance;
    delete system.defense;
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

  _prepareLifeModuleBaseData() {
    const normalized = prepareLifeModuleDefaults(this.system ?? {});
    foundry.utils.mergeObject(this.system, normalized.system, { inplace: true, overwrite: true });
  }

  _prepareQualityBaseData() {
    const normalized = normalizeQualityTraitSystem(this.system ?? {});
    foundry.utils.mergeObject(this.system, normalized, { inplace: true, overwrite: true });
  }

  _prepareGearBaseData() {
    const system = this.system ?? {};
    system.quantity = normalizeGearQuantity(system.quantity, 1);
    system.rating = normalizeGearRating(system.rating, 0);
    system.category = normalizeGearCategory(system.category);
    system.tags = normalizeGearTags(system.tags);
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

  isMechWeapon() {
    return this.canonicalType === TEMPLATE.itemType.mechWeapon;
  }

  isArmor() {
    return this.canonicalType === TEMPLATE.itemType.armor;
  }

  isLifeModule() {
    return this.canonicalType === TEMPLATE.itemType.lifeModule;
  }

  isQuality() {
    return this.canonicalType === TEMPLATE.itemType.quality;
  }

  isGear() {
    return this.canonicalType === TEMPLATE.itemType.gear;
  }

  isConsumable() {
    return this.canonicalType === TEMPLATE.itemType.consumable;
  }

  isQuantityTrackedInventoryItem() {
    return this.isGear() || this.isConsumable();
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

  async _mutateQualitySystem(mutation = system => system) {
    const next = mutation(foundry.utils.deepClone(normalizeQualityTraitSystem(this.system ?? {})));
    await this.update({ system: normalizeQualityTraitSystem(next) });
  }

  async createQualityPrerequisite(entry = {}) {
    await this._mutateQualitySystem(system => {
      system.prerequisites = normalizeTraitPrerequisites(system.prerequisites).concat([{
        id: entry.id ?? foundry.utils.randomID(),
        fact: entry.fact ?? "",
        comparator: entry.comparator ?? "eq",
        value: entry.value ?? "",
      }]);
      return system;
    });
  }

  async deleteQualityPrerequisite(entryId) {
    await this._mutateQualitySystem(system => {
      system.prerequisites = normalizeTraitPrerequisites(system.prerequisites)
        .filter(entry => entry.id !== entryId);
      return system;
    });
  }

  async updateQualityPrerequisite(entryId, field, value) {
    await this._mutateQualitySystem(system => {
      system.prerequisites = normalizeTraitPrerequisites(system.prerequisites)
        .map(entry => {
          if (entry.id !== entryId) return entry;
          if (field === "fact") entry.fact = value;
          if (field === "comparator") entry.comparator = value;
          if (field === "value") entry.value = value;
          return entry;
        });
      return system;
    });
  }

  async createQualityEffect(entry = {}) {
    await this._mutateQualitySystem(system => {
      system.effects = normalizeTraitEffects(system.effects).concat([{
        id: entry.id ?? foundry.utils.randomID(),
        type: entry.type ?? "rollMod",
        phase: entry.phase ?? "onBuildRoll",
        selector: entry.selector ?? "",
        skillKeys: entry.skillKeys ?? [],
        label: entry.label ?? "",
        value: Number(entry.value ?? 0) || 0,
        min: entry.min ?? null,
        max: entry.max ?? null,
        pool: entry.pool ?? "",
        operation: entry.operation ?? "adjustAmount",
        conditions: normalizeTraitPrerequisites(entry.conditions ?? []),
        limit: normalizeTraitLimits(entry.limit ?? {}),
      }]);
      return system;
    });
  }

  async deleteQualityEffect(entryId) {
    await this._mutateQualitySystem(system => {
      system.effects = normalizeTraitEffects(system.effects)
        .filter(entry => entry.id !== entryId);
      return system;
    });
  }

  async updateQualityEffect(entryId, field, value) {
    await this._mutateQualitySystem(system => {
      system.effects = normalizeTraitEffects(system.effects)
        .map(entry => {
          if (entry.id !== entryId) return entry;
          if (field === "type") entry.type = value;
          if (field === "phase") entry.phase = value;
          if (field === "selector") entry.selector = value;
          if (field === "skillKeys") entry.skillKeys = Array.isArray(value) ? value : [];
          if (field === "label") entry.label = value;
          if (field === "value") entry.value = Number(value ?? 0) || 0;
          if (field === "min") entry.min = value === "" ? null : Number(value ?? 0);
          if (field === "max") entry.max = value === "" ? null : Number(value ?? 0);
          if (field === "pool") entry.pool = value;
          if (field === "operation") entry.operation = value;
          if (field === "limit.perActivation") {
            entry.limit = normalizeTraitLimits({ ...(entry.limit ?? {}), perActivation: value });
          }
          if (field === "limit.perRound") {
            entry.limit = normalizeTraitLimits({ ...(entry.limit ?? {}), perRound: value });
          }
          if (field === "limit.perScene") {
            entry.limit = normalizeTraitLimits({ ...(entry.limit ?? {}), perScene: value });
          }
          return entry;
        });
      return system;
    });
  }

  async createQualityEffectCondition(effectId, entry = {}) {
    await this._mutateQualitySystem(system => {
      system.effects = normalizeTraitEffects(system.effects).map(effect => {
        if (effect.id !== effectId) return effect;
        effect.conditions = normalizeTraitPrerequisites(effect.conditions).concat([{
          id: entry.id ?? foundry.utils.randomID(),
          fact: entry.fact ?? "",
          comparator: entry.comparator ?? "eq",
          value: entry.value ?? "",
        }]);
        return effect;
      });
      return system;
    });
  }

  async deleteQualityEffectCondition(effectId, conditionId) {
    await this._mutateQualitySystem(system => {
      system.effects = normalizeTraitEffects(system.effects).map(effect => {
        if (effect.id !== effectId) return effect;
        effect.conditions = normalizeTraitPrerequisites(effect.conditions)
          .filter(entry => entry.id !== conditionId);
        return effect;
      });
      return system;
    });
  }

  async updateQualityEffectCondition(effectId, conditionId, field, value) {
    await this._mutateQualitySystem(system => {
      system.effects = normalizeTraitEffects(system.effects).map(effect => {
        if (effect.id !== effectId) return effect;
        effect.conditions = normalizeTraitPrerequisites(effect.conditions)
          .map(entry => {
            if (entry.id !== conditionId) return entry;
            if (field === "fact") entry.fact = value;
            if (field === "comparator") entry.comparator = value;
            if (field === "value") entry.value = value;
            return entry;
          });
        return effect;
      });
      return system;
    });
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

  async _mutatePayloads(mutation = payloads => payloads) {
    const next = mutation(foundry.utils.deepClone(
      normalizeWeaponPayloads(this.system?.payloads, {
        legacyAmmo: this.system?.ammo,
        category: this.system?.category ?? this.system?.weaponCategory,
      })
    )).map(normalizePayloadProfile);
    const selectedPayloadId = normalizeSelectedPayloadId(this.system?.selectedPayloadId, next, {
      category: this.system?.category ?? this.system?.weaponCategory,
    });
    await this.update({
      "system.payloads": next,
      "system.selectedPayloadId": selectedPayloadId,
      "system.ammo": forcedDeletion(),
    });
  }

  async _mutateConsumptionSources(mutation = sources => sources) {
    const next = mutation(foundry.utils.deepClone(
      normalizeWeaponConsumptionSources(this.system?.consumptionSources, { legacyAmmo: this.system?.ammo })
    )).map(normalizeConsumptionSource);
    await this.update({
      "system.consumptionSources": next,
      "system.ammo": forcedDeletion(),
    });
  }

  async updatePayloadField(payloadId, field, value) {
    if (String(payloadId ?? "").trim() === "unloaded") return;
    await this._mutatePayloads(payloads => payloads.map(payload => {
      if (payload.id !== payloadId) return payload;
      const canApply = preparePayloadForFieldUpdate(payload, field);
      if (!canApply) return normalizePayloadProfile(payload);
      foundry.utils.setProperty(payload, field, value);
      return normalizePayloadProfile(payload);
    }));
  }

  async createPayload(entry = {}) {
    await this._mutatePayloads(payloads => payloads.concat([normalizePayloadProfile({
      id: entry.id ?? foundry.utils.randomID(),
      label: entry.label ?? entry.name ?? "Payload",
      compatibleWith: entry.compatibleWith ?? [],
      modifies: entry.modifies ?? {},
      traits: entry.traits ?? [],
      keywords: entry.keywords ?? [],
      template: entry.template ?? null,
      areaEffect: entry.areaEffect ?? { kind: "discrete" },
      resolution: entry.resolution ?? { resolverKey: "standard" },
      consumption: entry.consumption ?? { amount: 1, sourceId: "" },
    })]));
  }

  async deletePayload(payloadId) {
    if (String(payloadId ?? "").trim() === "unloaded") return;
    const category = this.system?.category ?? this.system?.weaponCategory;
    const nextPayloads = normalizeWeaponPayloads(this.system?.payloads, {
      legacyAmmo: this.system?.ammo,
      category,
    })
      .filter(payload => payload.id !== payloadId);
    const fallback = nextPayloads[0]?.id ?? "unloaded";
    await this.update({
      "system.payloads": nextPayloads.length
        ? nextPayloads
        : normalizeWeaponPayloads([], { category }),
      "system.selectedPayloadId": nextPayloads.some(payload => payload.id === this.system?.selectedPayloadId)
        ? this.system.selectedPayloadId
        : (nextPayloads.length ? fallback : ""),
      "system.ammo": forcedDeletion(),
    });
  }

  async createPayloadStandardTrait(payloadId, entry = {}) {
    if (String(payloadId ?? "").trim() === "unloaded") return;
    await this._mutatePayloads(payloads => payloads.map(payload => {
      if (payload.id !== payloadId) return payload;
      payload.modifies ??= {};
      payload.modifies.standardTraits = normalizeWeaponStandardTraits(payload.modifies.standardTraits).concat([{
        id: entry.id ?? foundry.utils.randomID(),
        key: entry.key ?? "armorPiercing",
        rating: Math.max(0, Number(entry.rating ?? 0) || 0),
      }]);
      return normalizePayloadProfile(payload);
    }));
  }

  async deletePayloadStandardTrait(payloadId, entryId) {
    if (String(payloadId ?? "").trim() === "unloaded") return;
    await this._mutatePayloads(payloads => payloads.map(payload => {
      if (payload.id !== payloadId) return payload;
      payload.modifies ??= {};
      payload.modifies.standardTraits = normalizeWeaponStandardTraits(payload.modifies.standardTraits)
        .filter(entry => entry.id !== entryId);
      return normalizePayloadProfile(payload);
    }));
  }

  async updatePayloadStandardTrait(payloadId, entryId, field, value) {
    if (String(payloadId ?? "").trim() === "unloaded") return;
    await this._mutatePayloads(payloads => payloads.map(payload => {
      if (payload.id !== payloadId) return payload;
      payload.modifies ??= {};
      payload.modifies.standardTraits = normalizeWeaponStandardTraits(payload.modifies.standardTraits)
        .map(entry => {
          if (entry.id !== entryId) return entry;
          if (field === "key") entry.key = value;
          if (field === "rating") entry.rating = Math.max(0, Number(value ?? 0) || 0);
          return entry;
        });
      return normalizePayloadProfile(payload);
    }));
  }

  async createConsumptionSource(entry = {}) {
    await this._mutateConsumptionSources(sources => sources.concat([normalizeConsumptionSource({
      id: entry.id ?? foundry.utils.randomID(),
      label: entry.label ?? "Source",
      kind: entry.kind ?? "internal",
      tracking: entry.tracking ?? { current: 0, max: 0 },
      link: entry.link ?? {},
    })]));
  }

  async deleteConsumptionSource(sourceId) {
    await this._mutateConsumptionSources(sources => sources.filter(source => source.id !== sourceId));
    await this._mutatePayloads(payloads => payloads.map(payload => {
      if (payload?.consumption?.sourceId !== sourceId) return payload;
      payload.consumption.sourceId = "";
      return normalizePayloadProfile(payload);
    }));
  }

  async updateConsumptionSourceField(sourceId, field, value) {
    await this._mutateConsumptionSources(sources => sources.map(source => {
      if (source.id !== sourceId) return source;
      foundry.utils.setProperty(source, field, value);

      // Item-linked sources are most often used to consume an owned stack such
      // as grenades. Defaulting the tracked field to quantity keeps that common
      // case one selection away instead of requiring manual path knowledge.
      if (field === "kind" && source.kind === "itemRef") {
        source.link ??= {};
        if (!String(source.link.itemPath ?? "").trim()) source.link.itemPath = "quantity";
        if (!String(source.label ?? "").trim() || String(source.label ?? "").trim() === "Source") {
          source.label = "Linked Item";
        }
      }

      if (field === "link.itemId" && source.kind === "itemRef") {
        source.link ??= {};
        if (!String(source.link.itemPath ?? "").trim()) source.link.itemPath = "quantity";

        const linkedItem = this.actor?.items?.get?.(String(source.link.itemId ?? "").trim()) ?? null;
        if (
          linkedItem
          && (!String(source.label ?? "").trim() || ["Source", "Linked Item"].includes(String(source.label ?? "").trim()))
        ) {
          source.label = linkedItem.name ?? source.label;
        }
      }

      return normalizeConsumptionSource(source);
    }));
  }

  getPayloadState({ payloadId = "", ammoTypeId = "" } = {}) {
    return resolveWeaponPayloadState({
      payloads: this.system?.payloads,
      selectedPayloadId: this.system?.selectedPayloadId,
      consumptionSources: this.system?.consumptionSources,
      actor: this.actor ?? null,
      payloadId: payloadId || ammoTypeId,
      category: this.system?.category ?? this.system?.weaponCategory,
    });
  }

  getActivePayloadReloadState({ payloadId = "", ammoTypeId = "", user = game.user } = {}) {
    const category = String(this.system?.category ?? this.system?.weaponCategory ?? "").trim().toLowerCase();
    const emptyState = {
      canReload: false,
      reason: "",
      payloadLabel: "",
      activePayloadId: "",
      current: 0,
      max: 0,
      inCombat: false,
      source: null,
      sourceState: null,
      payloadState: null,
    };

    if (!this.isPersonalWeapon()) {
      return { ...emptyState, reason: "Only personal weapons can be reloaded from this sheet." };
    }

    if (!this.actor) {
      return { ...emptyState, reason: "Reload is only available for weapons owned by an actor." };
    }

    if (category === "melee") {
      return { ...emptyState, reason: "Melee weapons do not use reloadable payloads." };
    }

    const payloadState = this.getPayloadState({ payloadId: payloadId || ammoTypeId });
    const sourceState = payloadState?.sourceState ?? null;
    const source = payloadState?.source ?? null;
    const activePayloadId = String(payloadState?.activePayloadId ?? "").trim();
    const payloadLabel = String(payloadState?.payloadLabel ?? "").trim() || "Unloaded";
    const current = Math.max(0, Number(sourceState?.current ?? 0) || 0);
    const max = Math.max(0, Number(sourceState?.max ?? 0) || 0);
    const inCombat = Boolean(PersonalCombatTracker.getCombat(this.actor)?.combatant);

    if (!activePayloadId || activePayloadId === "unloaded") {
      return {
        ...emptyState,
        reason: "Select a payload before reloading.",
        payloadLabel,
        activePayloadId,
        payloadState,
        source,
        sourceState,
        current,
        max,
        inCombat,
      };
    }

    if (!sourceState?.isTracked) {
      return {
        ...emptyState,
        reason: "This payload is untracked and does not need to be reloaded.",
        payloadLabel,
        activePayloadId,
        payloadState,
        source,
        sourceState,
        current,
        max,
        inCombat,
      };
    }

    if (sourceState.kind !== "internal") {
      return {
        ...emptyState,
        reason: "Linked ammo sources are read-only from the weapon sheet.",
        payloadLabel,
        activePayloadId,
        payloadState,
        source,
        sourceState,
        current,
        max,
        inCombat,
      };
    }

    if (max <= 0) {
      return {
        ...emptyState,
        reason: "This payload source has no reloadable capacity.",
        payloadLabel,
        activePayloadId,
        payloadState,
        source,
        sourceState,
        current,
        max,
        inCombat,
      };
    }

    if (inCombat && !user?.isGM) {
      return {
        ...emptyState,
        reason: "Only a GM can reload from the weapon sheet during combat.",
        payloadLabel,
        activePayloadId,
        payloadState,
        source,
        sourceState,
        current,
        max,
        inCombat,
      };
    }

    if (current >= max) {
      return {
        ...emptyState,
        reason: "Magazine already full.",
        payloadLabel,
        activePayloadId,
        payloadState,
        source,
        sourceState,
        current,
        max,
        inCombat,
      };
    }

    return {
      canReload: true,
      reason: "",
      payloadLabel,
      activePayloadId,
      payloadState,
      source,
      sourceState,
      current,
      max,
      inCombat,
    };
  }

  canReloadActivePayload({ detailed = false, ...options } = {}) {
    const state = this.getActivePayloadReloadState(options);
    return detailed ? state : state.canReload;
  }

  async reloadActivePayload({ payloadId = "", ammoTypeId = "" } = {}) {
    const state = this.getActivePayloadReloadState({ payloadId, ammoTypeId });
    if (!state.canReload || !state.source?.id) {
      return { ok: false, ...state };
    }

    await this._mutateConsumptionSources(sources => sources.map(source => {
      if (source.id !== state.source.id) return source;
      source.tracking ??= {};
      source.tracking.max = Math.max(0, Number(source.tracking?.max ?? state.max) || state.max);
      source.tracking.current = state.max;
      return normalizeConsumptionSource(source);
    }));

    return {
      ok: true,
      payloadLabel: state.payloadLabel,
      activePayloadId: state.activePayloadId,
      current: state.max,
      max: state.max,
      reloadedAmount: Math.max(0, state.max - state.current),
      sourceId: state.source.id,
    };
  }

  async setActivePayload(payloadId) {
    const normalizedId = normalizeSelectedPayloadId(
      payloadId,
      normalizeWeaponPayloads(this.system?.payloads, {
        legacyAmmo: this.system?.ammo,
        category: this.system?.category ?? this.system?.weaponCategory,
      }),
      {
        category: this.system?.category ?? this.system?.weaponCategory,
      }
    );
    await this.update({
      "system.selectedPayloadId": normalizedId,
      "system.ammo": forcedDeletion(),
    });
  }

  canConsumePayload({ payloadId = "", ammoTypeId = "" } = {}) {
    const payloadState = this.getPayloadState({ payloadId: payloadId || ammoTypeId });
    if (!payloadState?.sourceState?.isTracked) return true;
    return Number(payloadState.sourceState.current ?? 0) >= Number(payloadState.sourceState.consumePerUse ?? 1);
  }

  async consumePayload({ payloadId = "", ammoTypeId = "" } = {}) {
    const payloadState = this.getPayloadState({ payloadId: payloadId || ammoTypeId });
    if (!payloadState?.sourceState?.isTracked) return true;

    const consumePerUse = Math.max(1, Number(payloadState.sourceState.consumePerUse ?? 1) || 1);
    const current = Math.max(0, Number(payloadState.sourceState.current ?? 0) || 0);
    if (current < consumePerUse) return false;

    if (payloadState.sourceState.kind === "internal") {
      await this._mutateConsumptionSources(sources => sources.map(source => {
        if (source.id !== payloadState.source?.id) return source;
        source.tracking ??= {};
        source.tracking.current = Math.max(0, current - consumePerUse);
        return normalizeConsumptionSource(source);
      }));
      return true;
    }

    if (payloadState.sourceState.kind === "actorResource" && this.actor && payloadState.sourceState.currentPath) {
      await this.actor.update({
        [payloadState.sourceState.currentPath]: Math.max(0, current - consumePerUse),
      });
      return true;
    }

    if (payloadState.sourceState.kind === "itemRef" && payloadState.sourceState.sourceItem && payloadState.sourceState.currentPath) {
      await payloadState.sourceState.sourceItem.update({
        [payloadState.sourceState.currentPath]: Math.max(0, current - consumePerUse),
      });
      return true;
    }

    return false;
  }

  getAmmoState({ ammoTypeId = "" } = {}) {
    return this.getPayloadState({ payloadId: ammoTypeId });
  }

  async setActiveAmmoType(ammoTypeId) {
    await this.setActivePayload(ammoTypeId);
  }

  canConsumeAmmo({ ammoTypeId = "" } = {}) {
    return this.canConsumePayload({ payloadId: ammoTypeId });
  }

  async consumeAmmo({ ammoTypeId = "" } = {}) {
    return this.consumePayload({ payloadId: ammoTypeId });
  }

  async createAmmoType(entry = {}) {
    await this.createPayload(entry);
  }

  async deleteAmmoType(ammoTypeId) {
    await this.deletePayload(ammoTypeId);
  }

  async updateAmmoType(ammoTypeId, field, value) {
    const mappedField = field === "name"
      ? "label"
      : field === "damageType"
        ? "modifies.damageType"
        : field === "apMod"
          ? "modifies.ap"
          : field.startsWith("attackRatingBandMod.")
            ? `modifies.attackRatingBand.${field.split(".")[1]}`
            : field === "traits"
              ? "traits"
              : field === "keywords"
                ? "keywords"
              : field;
    await this.updatePayloadField(ammoTypeId, mappedField, value);
  }

  async createAmmoTypeStandardTrait(ammoTypeId, entry = {}) {
    await this.createPayloadStandardTrait(ammoTypeId, entry);
  }

  async deleteAmmoTypeStandardTrait(ammoTypeId, entryId) {
    await this.deletePayloadStandardTrait(ammoTypeId, entryId);
  }

  async updateAmmoTypeStandardTrait(ammoTypeId, entryId, field, value) {
    await this.updatePayloadStandardTrait(ammoTypeId, entryId, field, value);
  }

  getCombatProfile({ payloadId = "", ammoTypeId = "" } = {}) {
    if (!this.isWeapon()) return null;

    const system = this.system ?? {};
    const category = this.isMechWeapon()
      ? normalizeMechWeaponCategory(system.weaponCategory ?? system.category)
      : (String(system.category ?? system.weaponCategory ?? "ranged").trim() || "ranged");
    const range = this.isMechWeapon()
      ? normalizeMechWeaponRange(system.range, category)
      : normalizeRangeData(system.range);
    const skillCode = this.isMechWeapon()
      ? normalizeMechWeaponSkill(category, system.skill)
      : (String(system.skill ?? "").trim() || "firearms");
    const skillDef = getSkillDef(skillCode);
    const damage = Number(system.damage ?? 0) || 0;
    const baseDamageType = this.isMechWeapon()
      ? normalizeMachineWeaponDamageType(system.damageType, "energy")
      : normalizePersonalDamageType(system.damageType);
    const effectiveProfile = resolveEffectiveWeaponProfile({
      damageType: baseDamageType,
      ap: Number(system.ap ?? system.armorPiercing ?? 0) || 0,
      attackRatingBand: normalizeAttackRatingBand(system.attackRatingBand),
      traits: normalizeTraits(system.traits),
      keywords: normalizeWeaponKeywords(system.keywords),
      standardTraits: [],
      resolution: normalizeWeaponResolution(system.resolution, "standard"),
      fireModes: normalizeWeaponFireModes(system.fireModes),
      payloads: normalizeWeaponPayloads(system.payloads, { legacyAmmo: system.ammo, category }),
      selectedPayloadId: normalizeSelectedPayloadId(system.selectedPayloadId, system.payloads, { legacyAmmo: system.ammo, category }),
      consumptionSources: normalizeWeaponConsumptionSources(system.consumptionSources, { legacyAmmo: system.ammo }),
      payloadId: payloadId || ammoTypeId,
      actor: this.actor ?? null,
      category,
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
      skill: skillCode,
      skillDef,
      damage,
      clusteringDice: Number(effectiveProfile.clusteringDice ?? 0) || 0,
      ap: effectiveProfile.ap,
      baseDamageType,
      baseDamageTypeLabel: this.isMechWeapon()
        ? getMachineWeaponDamageTypeLabel(baseDamageType)
        : getPersonalDamageTypeLabel(baseDamageType),
      damageType: effectiveProfile.damageType,
      damageTypeLabel: getPersonalDamageTypeLabel(effectiveProfile.damageType),
      attackRatingBand: effectiveProfile.attackRatingBand,
      range,
      defaultRangeBand: this.getDefaultRangeBand(range),
      traits: effectiveProfile.traits,
      keywords: effectiveProfile.keywords,
      standardTraits: effectiveProfile.standardTraits,
      effects: effectiveProfile.effects,
      payloadLabel: effectiveProfile.payloadLabel,
      payload: effectiveProfile.payload,
      payloadState: effectiveProfile.payloadState,
      source: effectiveProfile.source,
      sourceState: effectiveProfile.sourceState,
      template: effectiveProfile.template,
      areaEffect: effectiveProfile.areaEffect,
      resolution: effectiveProfile.resolution,
      resolverKey: effectiveProfile.resolverKey,
      fireModes: effectiveProfile.fireModes,
      capabilityReport: effectiveProfile.capabilityReport,
      ammoLabel: effectiveProfile.payloadLabel,
      ammoType: effectiveProfile.payload,
      ammoState: effectiveProfile.ammoState,
      heat: Math.max(0, Number(system.heat ?? 0) || 0),
      area: String(system.area ?? "none").trim() || "none",
      volatile: Boolean(system.volatile),
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
    const currentArmorRating = Math.min(rating, currentDurability);
    const mitigationByType = normalizeArmorMitigationByType(system?.mitigationByType ?? system?.mitigation);
    const armorTraitEffects = resolveArmorTraitEffects({
      standardTraits: normalizeArmorStandardTraits(system?.standardTraits),
      traits: normalizeTraits(system?.traits),
      traitState: system?.traitState,
    });
    const tags = normalizeArmorTags(system?.tags);
    const baseMitigation = computeArmorBaseMitigation(currentArmorRating);

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
      currentArmorRating,
      ratingCurrent: currentArmorRating,
      remainingDurability: currentDurability,
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
    if (this.isMechWeapon()) {
      const skillDef = getSkillDef(normalizeMechWeaponSkill(this.system?.weaponCategory ?? this.system?.category, this.system?.skill));
      return skillDef?.defense ? AttributeActions.fixedDefenseCode(skillDef.defense) : undefined;
    }
    if (this.system.defense) {
      return AttributeActions.fixedDefenseCode(this.system.defense);
    }

    const skillDef = getSkillDef(String(this.system.skill ?? "").trim());
    return skillDef?.defense ? AttributeActions.fixedDefenseCode(skillDef.defense) : undefined;
  }

  getDamage() {
    if (!this.parent) return undefined;

    const profile = this.isWeapon() ? this.getCombatProfile() : null;
    const monitor = this._getMonitor();

    if (this.isMechWeapon()) {
      return {
        value: Math.max(0, Number(profile?.damage ?? this.system.damage ?? 0) || 0),
        monitor,
        damageType: profile?.damageType ?? this.system.damageType,
        damageTypeLabel: profile?.damageTypeLabel ?? this.getDamageTypeLabel(),
        noArmor: false,
        armorMode: "",
        clusteringDice: Number(profile?.clusteringDice ?? 0) || 0,
      };
    }

    const damageAttributeValue = this.system.damageAttribute
      ? (this.parent.getAttributeValue(this.system.damageAttribute) ?? 0)
      : 0;

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
    if (this.isMechWeapon()) {
      const baseDamage = Math.max(0, Number(this.system?.damage ?? 0) || 0);
      const clusteringDice = Math.max(0, Number(this.getCombatProfile()?.clusteringDice ?? 0) || 0);
      return clusteringDice > 0 ? `${baseDamage} + ${clusteringDice}d6 cluster` : String(baseDamage);
    }

    return damageCode(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }

  getDamageTypeLabel() {
    if (this.isWeapon()) {
      const profile = this.getCombatProfile();
      if (this.isMechWeapon() && profile?.damageType === profile?.baseDamageType) {
        return getMachineWeaponDamageTypeLabel(profile?.baseDamageType ?? this.system.damageType);
      }
      return getPersonalDamageTypeLabel(profile?.damageType ?? this.system.damageType);
    }
    const labelKey = MWD.mwd.weaponDamageType?.[this.system.damageType]
      ?? MWD.mwd.personalDamageType?.[this.system.damageType];
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
    if (this.isWeapon()) {
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
        label: this.name,
        callback: token => token.actor.rollSkill(this),
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
