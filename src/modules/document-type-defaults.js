// src/modules/document-type-defaults.js
// Purpose: Resolve create-time actor and item defaults without runtime fetches.
// How it fits: Keeps document creation deterministic and makes the default graph testable outside Foundry.

const templateData = {
  Actor: {
    types: ["character", "npc", "vehicle", "battlemech"],
    templates: {
      description: {
        ownerId: "",
        description: "",
        gmnotes: "",
        favorites: [],
        state: {
          physical: { value: 0, max: 0 },
          fatigue: { value: 0, max: 0 }
        }
      },
      "attribute-reflexes": { attributes: { reflexes: { value: 1 } } },
      "attribute-strength": { attributes: { strength: { value: 1 } } },
      "attribute-guts": { attributes: { guts: { value: 1 } } },
      "attribute-charisma": { attributes: { charisma: { value: 1 } } },
      "attribute-intelligence": { attributes: { intelligence: { value: 1 } } },
      "attribute-edge": {
        attributes: { edge: { value: 1 } },
        counters: {
          edgePools: {
            grit: { value: null },
            insight: { value: null },
            rumor: { value: null },
            legend: { value: null },
            credibility: { value: null },
            chaos: { value: null }
          }
        }
      },
      "attribute-handling": { attributes: { handling: { value: 0 } } },
      "mwd-base": {
        mwd: {
          unitType: "vehicle",
          model: "",
          cbillCost: 0,
          heat: {
            current: 0,
            safeMax: 1,
            hardMax: 10,
            coolingImpaired: false
          },
          shock: { value: 0 },
          reliabilitySpendable: { value: 0 },
          locations: {},
          crits: [],
          crew: {
            count: 1,
            effectiveCount: 1,
            injuryLevel: 0,
            bailedOut: false
          },
          status: { state: "operational", reasons: [] },
          config: {
            critTargetNumber: 8,
            critOnSnakeEyes: true,
            maxLocationStress: 3,
            heatBands: {
              safe: 1,
              runningHot: 2,
              overheated: 3,
              shutdown: 4
            }
          }
        }
      },
      "mwd-vehicle": {
        templates: ["mwd-base"],
        attributes: {
          handling: { value: 3 },
          system: { value: 3 },
          chassis: { value: 3 },
          reliability: { value: 3 }
        },
        mwd: {
          hardpoints: [],
          strain: {
            value: 0,
            pendingGenerated: 0,
            max: 6,
            thresholds: { strained: 2, overstressed: 4, critical: 6 }
          },
          movementProfile: "tracked",
          flightSubtype: "",
          favoredTerrain: ["open", "rough", "urban"],
          adverseTerrain: ["water"],
          affordances: ["stabilizedFire", "hullDown"],
          locations: {
            body:   { enabled: true,  stress: 0, condition: 0, tags: ["crewCompartment", "engine", "ammoStore"], destroyed: false },
            turret: { enabled: true,  stress: 0, condition: 0, tags: ["turret", "weaponGroup"], destroyed: false },
            mobility: { enabled: true, stress: 0, condition: 0, tags: ["motiveSystem", "rotor"], destroyed: false }
          }
        },
        movement: { ground: 0, flight: 0 }
      },
      "mwd-battlemech": {
        templates: ["mwd-base"],
        attributes: {
          handling:    { value: 4 },
          system:      { value: 3 },
          chassis:     { value: 4 },
          reliability: { value: 3 }
        },
        mwd: {
          unitType: "mech",
          locations: {
            head:  { enabled: true, stress: 0, condition: 0, tags: ["cockpit", "sensor"], destroyed: false },
            torso: { enabled: true, stress: 0, condition: 0, tags: ["weaponGroup", "engine", "gyro", "ammoStore"], destroyed: false },
            arms:  { enabled: true, stress: 0, condition: 0, tags: ["weaponGroup"], destroyed: false },
            legs:  { enabled: true, stress: 0, condition: 0, tags: ["motiveSystem"], destroyed: false }
          },
          crew: {
            count: 1,
            effectiveCount: 1,
            injuryLevel: 0,
            bailedOut: false
          },
          heat: {
            current: 0,
            max: 10,
            thresholds: { runningHot: 2, overheated: 3, shutdown: 4 }
          },
          chassis: "",
          tonnage: 0,
          weightClass: "medium",
          fireMode: "alphaStrike",
          hardpoints: [],
          weaponGroups: [],
          melee: {
            baseProfile: { name: "Unarmed", damage: "", notes: "" },
            maxWeapons: 0,
            allowedLocations: []
          }
        }
      },
      "machine-movement-battlemech": {
        movement: { ground: 0, flight: 0 }
      }
    },
    character: {
      templates: [
        "description",
        "counters",
        "ownership",
        "attribute-reflexes",
        "attribute-strength",
        "attribute-guts",
        "attribute-intelligence",
        "attribute-charisma",
        "attribute-edge"
      ],
      monitors: {
        physical: { value: 1, max: 10, resistance: { default: 0, byType: {} } },
        fatigue:  { value: 1, max: 10, resistance: { default: 0, byType: {} } },
        armor:    { label: "Armor", value: 9, max: 9, effect: "", resistance: "" }
      },
      counters: {
        xp: { value: 0, total: 0 },
        edgePools: {
          grit:         { value: 2, rating: 2 },
          insight:      { value: 0, rating: 1 },
          rumor:        { value: 1, rating: 1 },
          legend:       { value: 0, rating: 1 },
          credibility:  { value: 1, rating: 1 },
          chaos:        { value: 1, rating: 1 }
        }
      },
      prototypeToken: {
        actorLink: true,
        disposition: 1,
        displayName: 20,
        displayBars: 40
      },
      style: "",
      speed: 12,
      traitMods: {
        speedMod: 0,
        defenseRatingMod: 0,
        saCapMod: 0,
        faCapMod: 0,
        raCapMod: 0,
        conditionPhysicalValueMod: 0,
        conditionFatigueValueMod: 0,
        conditionPhysicalPenaltyMod: 0,
        conditionFatiguePenaltyMod: 0,
        attackRatingMod: 0,
        suppressAttackerMotionDN: 0,
        overloadDNMod: 0,
        overloadThresholdMod: 0
      },
      keywords: [],
      dispositions: [],
      cues: [],
      knowledgeSkills: [],
      burn: { value: 0, overloaded: false },
      criticals: [],
      biography: {
        faction: "",
        age: 0,
        rank: "",
        height: 0,
        weight: 0,
        history: "",
        experienceLevel: "green"
      }
    },
    npc: {
      templates: ["description", "ownership"],
      attributes: {
        strength:     { value: 1 },
        reflexes:     { value: 1 },
        intelligence: { value: 1 },
        guts:         { value: 1 },
        charisma:     { value: 1 },
        edge:         { value: 1 }
      },
      monitors: {
        physical: { value: 0, max: 10, resistance: { default: 0, byType: {} } },
        fatigue:  { value: 0, max: 10, resistance: { default: 0, byType: {} } },
        armor:    { label: "Armor", value: 0, max: 9, effect: "", resistance: "" }
      },
      role: "",
      biography: "",
      burn: { value: 0, overloaded: false },
      criticals: [],
      traitMods: {
        speedMod: 0,
        defenseRatingMod: 0,
        saCapMod: 0,
        faCapMod: 0,
        raCapMod: 0,
        conditionPhysicalValueMod: 0,
        conditionFatigueValueMod: 0,
        conditionPhysicalPenaltyMod: 0,
        conditionFatiguePenaltyMod: 0,
        attackRatingMod: 0,
        suppressAttackerMotionDN: 0,
        overloadDNMod: 0,
        overloadThresholdMod: 0
      },
      style: "sra-enhanced"
    },
    vehicle: {
      templates: ["description", "matrix-monitor", "mwd-vehicle"],
      attributes: {},
      monitors: {
        structure: { value: 15, max: 15, resistance: { default: 2, byType: {} } },
        armor:     { value: 12, max: 12, resistance: { default: 1, byType: {} } }
      },
      weaponGroups: [],
      meleeProfiles: [],
      skills: {},
      moves: 0,
      attacks: 0,
      stealth: 0,
      category: "",
      skill: "piloting",
      passengers: 4,
      pilot: { uuid: "" },
      crew: ""
    },
    battlemech: {
      templates: ["description", "mwd-battlemech"],
      attributes: {},
      monitors: {
        structure: { value: 18, max: 18, resistance: { default: 1, byType: {} } },
        armor:     { value: 15, max: 15, resistance: { default: 1, byType: {} } },
        heat:      { value: 0, max: 10, resistance: { default: 0, byType: {} } }
      },
      hybrid: {
        heat: { dissipation: 1 },
        criticals: { value: 0, max: 4, notes: "" },
        locations: { front: "", sides: "", rear: "", core: "" }
      },
      weaponGroups: [],
      meleeProfiles: [],
      skills: {},
      moves: 0,
      attacks: 0,
      stealth: 0,
      category: "mech",
      skill: "gunnery",
      passengers: 1,
      pilot: { uuid: "" },
      crew: ""
    }
  },
  Item: {
    types: [
      "contact", "gear", "consumable", "quality", "assetModule",
      "skill", "lifeModule", "mechWeapon", "personalWeapon", "weaponPayload", "armor",
      "mechEquipment", "vehicleUpgrade"
    ],
    templates: {
      modifiers: { modifiers: [] },
      inactive:  { inactive: false },
      references: { sourceReference: "", description: "", gmnotes: "" }
    },
    skill: {
      templates: ["inactive", "references"],
      code: "",
      attribute: "knowledge",
      value: 0,
      hasDrain: false,
      hasConvergence: false,
      isSocial: false
    },
    quality: {
      templates: ["modifiers", "inactive", "references"],
      positive: true,
      category: "positive",
      tier: "minor",
      tags: [],
      activation: "passive",
      effects: [],
      prerequisites: [],
      limits: { perActivation: 0, perRound: 0, perScene: 0 }
    },
    assetModule: {
      templates: ["modifiers", "inactive", "references"],
      installClass: "module",
      category: "special",
      level: 1,
      activation: {
        mode: "passive",
        active: false,
        selectedMode: "",
        cooldownUntilRound: 0
      },
      effects: [],
      mobility: {
        jumping: {
          enabled: false,
          movement: 0,
          heat: 0,
          attackRatingBonus: 0,
          defenseRatingBonus: 0,
          dfaEnabled: false
        }
      }
    },
    lifeModule: {
      templates: ["inactive", "references"],
      moduleType: "faction"
    },
    mechWeapon: {
      templates: ["modifiers", "inactive", "references"],
      category: "ranged",
      weaponCategory: "ranged",
      skill: "gunnery",
      size: "small",
      damage: 0,
      clusteringDice: 0,
      clusteringTargetNumber: 5,
      ap: 0,
      damageType: "energy",
      attackRatingBand: { close: 0, near: 0, far: 0, extreme: 0 },
      payloads: [],
      selectedPayloadId: "",
      consumptionSources: [],
      fireControl: {
        usesPerActivation: 1
      },
      heat: 0,
      volatile: false,
      area: "none",
      notes: "",
      range: { max: "close", close: 0, near: 0, far: 0, extreme: 0 }
    },
    personalWeapon: {
      templates: ["modifiers", "inactive", "references"],
      equipped: false,
      isPrimary: false,
      scale: "personal",
      mount: { mountedOnItemId: "", mountType: "" },
      category: "ranged",
      skill: "firearms",
      damage: 0,
      damageAttribute: "",
      damageAttributeScale: 1,
      ap: 0,
      damageType: "penetrating",
      attackRatingBand: { close: 0, near: 0, far: 0, extreme: 0 },
      range: { max: "extreme", close: 5, near: 26, far: 62, extreme: 120 },
      standardTraits: [],
      availability: "",
      payloadCompatibility: {
        families: [],
        tagsAll: []
      },
      selectedPayloadUuid: "",
      ammo: {
        current: 0,
        max: 0,
        consumePerAttack: 1,
        activeTypeId: "",
        types: []
      },
      traits: [],
      notes: ""
    },
    weaponPayload: {
      templates: ["inactive", "references"],
      families: [],
      tags: [],
      quantity: 1,
      profile: {
        id: "profile",
        label: "Payload",
        compatibleWith: [],
        modifies: {
          damage: 0,
          damageType: "",
          ap: 0,
          clusteringDice: 0,
          attackRatingBand: { close: 0, near: 0, far: 0, extreme: 0 }
        },
        traits: [],
        keywords: [],
        template: null,
        areaEffect: { kind: "none" },
        resolution: { resolverKey: "standard", damageModel: "", onHitEffect: null },
        consumption: { amount: 1, sourceId: "" }
      }
    },
    armor: {
      templates: ["modifiers", "inactive", "references"],
      equipped: false,
      isPrimary: false,
      rating: 0,
      defenseBonus: 0,
      mitigationByType: {
        penetrating: 0,
        concussive: 0,
        energy: 0,
        thermal: 0,
        electrical: 0
      },
      durability: { current: 0, max: 0 },
      standardTraits: [],
      traitState: { reinforced: { current: 0, max: 0 } },
      battleArmor: {
        enabled: false,
        armorPool: { value: 0, max: 0 },
        structure: { value: 0, max: 0 },
        state: "wrecked",
        scale: "personal",
        systems: {
          stealth: {
            enabled: false,
            trackingPenalty: 2,
            detectionStateCap: "track",
            revealedOnAttack: true,
            revealedOnJump: true,
            revealedOnHit: true,
            counteredBy: ["activeProbe", "tag", "narc", "pointblank", "revealed"]
          },
          jump: false,
          enhancedStrength: false,
          sealed: false,
          basicSensors: false,
          medicalSuppression: false,
          attachedEligible: false
        },
        machineTargetProfile: {
          machineTargetable: true,
          targetClass: "battleArmor",
          signature: "low",
          stealthTrackingPenalty: 0,
          detectionStateCap: null,
          counteredBy: []
        },
        attachedToTokenUuid: null,
        attachedLocationHint: "",
        revealedUntil: null,
      },
      availability: "",
      tags: [],
      traits: [],
      notes: ""
    },
    gear: {
      templates: ["inactive", "references"],
      quantity: 1,
      rating: 0,
      category: "",
      relatedSkill: "",
      availability: "",
      rulesHook: "",
      mount: { mountedOnItemId: "", mountType: "" },
      tags: []
    },
    consumable: {
      templates: ["inactive", "references"],
      quantity: 1,
      rating: 0,
      category: "ammo",
      relatedSkill: "",
      availability: "",
      rulesHook: "",
      tags: []
    },
    contact: {
      templates: ["inactive", "references"]
    },
    mechEquipment: {
      templates: ["modifiers", "inactive", "references"],
      category: "",
      ammo: { current: 0, max: 0 },
      state: { suppressed: false, offline: false, destroyed: false, reason: "" },
      effects: [],
      notes: ""
    },
    vehicleUpgrade: {
      templates: ["modifiers", "inactive", "references"],
      category: "",
      state: { suppressed: false, offline: false, destroyed: false, reason: "" },
      effects: [],
      notes: ""
    }
  }
};

const ROOT_CREATE_FIELDS = Object.freeze({
  Actor: new Set(["prototypeToken"]),
  Item: new Set(),
});

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function cloneValue(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function mergePlainObjects(base = {}, extra = {}) {
  const merged = cloneValue(base);

  for (const [key, value] of Object.entries(extra ?? {})) {
    if (isPlainObject(value) && isPlainObject(merged[key])) {
      merged[key] = mergePlainObjects(merged[key], value);
      continue;
    }

    merged[key] = cloneValue(value);
  }

  return merged;
}

export function getDocumentTemplateConfig(documentName = "", source = templateData) {
  const config = source?.[documentName];
  return isPlainObject(config) ? config : {};
}

export function resolveTemplateBlock(
  source = templateData,
  documentName = "",
  templateName = "",
  seen = new Set()
) {
  const normalizedName = String(templateName ?? "").trim();
  if (!normalizedName || seen.has(normalizedName)) return {};

  const documentConfig = getDocumentTemplateConfig(documentName, source);
  const templateConfig = documentConfig?.templates?.[normalizedName];
  if (!isPlainObject(templateConfig)) return {};

  seen.add(normalizedName);
  let resolved = {};

  // Template composition is recursive, so we resolve dependencies first and
  // then layer the local block on top.
  for (const nestedTemplateName of Array.from(templateConfig.templates ?? [])) {
    resolved = mergePlainObjects(
      resolved,
      resolveTemplateBlock(source, documentName, nestedTemplateName, seen)
    );
  }

  const localData = cloneValue(templateConfig);
  delete localData.templates;
  return mergePlainObjects(resolved, localData);
}

export function resolveDocumentTypeBlock(
  source = templateData,
  documentName = "",
  documentType = ""
) {
  const normalizedType = String(documentType ?? "").trim();
  if (!normalizedType) return {};

  const documentConfig = getDocumentTemplateConfig(documentName, source);
  const typeConfig = documentConfig?.[normalizedType];
  if (!isPlainObject(typeConfig)) return {};

  let resolved = {};
  for (const templateName of Array.from(typeConfig.templates ?? [])) {
    resolved = mergePlainObjects(
      resolved,
      resolveTemplateBlock(source, documentName, templateName)
    );
  }

  const localData = cloneValue(typeConfig);
  delete localData.templates;
  return mergePlainObjects(resolved, localData);
}

export function resolveDocumentTypeCreateDefaults(
  documentName = "",
  documentType = "",
  source = templateData
) {
  const resolved = resolveDocumentTypeBlock(source, documentName, documentType);
  const rootFields = ROOT_CREATE_FIELDS[documentName] ?? ROOT_CREATE_FIELDS.Item;
  const defaults = { system: {} };

  for (const [key, value] of Object.entries(resolved)) {
    if (rootFields.has(key)) defaults[key] = cloneValue(value);
    else defaults.system[key] = cloneValue(value);
  }

  return defaults;
}

export async function getDocumentTypeCreateDefaults(documentName = "", documentType = "") {
  // The API stays async so the actor/item preCreate hooks do not need a second
  // migration. Internally this is now synchronous and bundle-backed.
  return resolveDocumentTypeCreateDefaults(documentName, documentType);
}
