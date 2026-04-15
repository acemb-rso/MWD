var Rm = Object.defineProperty;
var Nm = Object.getPrototypeOf;
var Im = Reflect.get;
var ol = (a) => {
  throw TypeError(a);
};
var Dm = (a, e, t) => e in a ? Rm(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var D = (a, e, t) => Dm(a, typeof e != "symbol" ? e + "" : e, t), Us = (a, e, t) => e.has(a) || ol("Cannot " + t);
var H = (a, e, t) => (Us(a, e, "read from private field"), t ? t.call(a) : e.get(a)), Ce = (a, e, t) => e.has(a) ? ol("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), $e = (a, e, t, i) => (Us(a, e, "write to private field"), i ? i.call(a, t) : e.set(a, t), t), C = (a, e, t) => (Us(a, e, "access private method"), t);
var Qt = (a, e, t) => Im(Nm(a), t, e);
const _e = {
  TYPES: {
    Actor: {
      character: "Character",
      vehicle: "Vehicle/drone",
      battlemech: "Battlemech"
    },
    Item: {
      contact: "Contact",
      gear: "Gear",
      consumable: "Consumable",
      quality: "Trait",
      assetModule: "Asset Module",
      skill: "Skill",
      mechWeapon: "Mech-Scale Weapon",
      personalWeapon: "Personal Weapon",
      armor: "Armor"
    }
  },
  settings: {
    defaultCssClass: {
      name: "Style of Destiny UI",
      hint: "Select the style used for actors, items and GM Manager"
    },
    skillSet: {
      name: "Skill set",
      hint: "Select the set of skills to use"
    },
    gmDifficulty: {
      name: "Default difficulty pools",
      hint: "The default difficulty pools, represented as 'Trivial:4,Easy:6' ...",
      default: "Trivial:4,Easy:6,Average:8,Hard:10,Very hard:12",
      chatMessage: "The difficulty {difficulty} ({pool}d6) is {success}"
    },
    damageMode: {
      name: "Damage application",
      hint: "Determine how Armor / Damage Resistance (RD) applies",
      values: {
        resistanceArmorMonitor: "MechWarrior: Destiny: Resistance, Armor, then Monitor",
        armorResistanceMonitor: "Armor, Resistance, Monitor",
        armorGivesResistance: "RD = Armor/3 + Str/4, damaged per blow, AA ignores armor",
        armorGiveResistanceHitsAvoid: "RD = Armor/3, damaged per blow, AA reduces resistance"
      }
    },
    useDestinyMechanics: {
      name: "Use Destiny opposed roll mechanics",
      hint: "Roll 2D6 and add the computed pool as a modifier instead of counting successes."
    }
  },
  chat: {
    blindMessageToGM: "Blind message from {user}:<br>{message}",
    sufferedDrain: "{actor} suffered a drain of {drain}",
    noDrain: "{actor} did not suffer any drain",
    defendAttack: "Defense against {success} success",
    partiallyDefended: "Attack exceeds defense of {success} success",
    fullyDefended: "The attack is fully defended",
    applyDamage: "Apply {damage}"
  },
  chat_actions: {
    rollDice: {
      title: "Roll Destiny dice",
      instruction: "Number of dice to roll: ",
      error: "Veuillez entrer un nombre valide de dés.",
      result: "Roll of {count}d6, {success} success! {ones} dice with a value of 1"
    }
  },
  user: {
    selectedTokenActors: "Selected actor tokens"
  },
  common: {
    newEntry: "New entry...",
    newName: "New {type}",
    cancel: "Cancel",
    add: "Add",
    resize: "Resize",
    say: "Say:",
    edit: "Edit",
    activate: "Activate",
    del: "Remove",
    favorite: "Favorites",
    addFavorite: "Add to favorites",
    delFavorite: "Remove from favorites",
    viewMode: "View mode",
    editMode: "Edit mode",
    attach: "Change owner",
    attachCopy: "Give a copy",
    roll: {
      button: "Roll",
      title: "Roll {name} {specialization}",
      attribute: "Attribute",
      attribute2: "Second attribute",
      modifiers: {
        edge: "Use edge",
        edgePool: "Spend from",
        specialization: "Specialization",
        poolModifiers: "Asset Modules",
        social: {
          credibility: "Credibility",
          rumor: "Rumor"
        },
        anarchyDisposition: "Anarchy - Dispositions",
        anarchyRisk: "Anarchy - Take risks",
        glitch: "Glitch dice",
        convergence: "GOD Convergence",
        drain: "Drain",
        wounds: "Wounds modifiers",
        weaponRange: "Range",
        weaponArea: "Multiple targets",
        other: "Other modifiers",
        virtualReality: "Virtual Reality",
        reduced: "Pool reduced",
        reroll: "Rerolls",
        rerollForced: "Rerolls successes",
        opponentReroll: "Force opponent rerolls",
        opponentPool: "Reduce opponent pool"
      },
      rollTheme: {
        dicePool: "Dice pool",
        reroll: "Failure rerolls",
        removed: "Success to reroll",
        rerollRemoved: "Reroll removed success",
        glitch: "Glitch dice",
        drain: "Drain",
        convergence: "Convergence",
        anarchyRisk: "Anarchy risk dice"
      },
      opponentRoll: "Opponent roll",
      totalSuccess: "Total successes",
      success: "Successes",
      risk: {
        prowess: "Prowess",
        mixed: "Prowess and Glitch",
        nothing: "no effect",
        glitch: "Glitch"
      },
      rerollSuccess: "Successes after reroll",
      rerollForcedLoss: "Forced reroll",
      rerollForcedSuccess: "Forced reroll successes"
    },
    monitorValue: "Monitor value",
    confirmation: {
      del: "Confirm removal",
      delItem: "Confirm removal of {name} ({type})",
      delowner: "Confirm detach from owner {name}",
      attach: "Attach actor to owner",
      attachOrCopy: "Attach {ownedType} {ownedName} to {ownerType} {ownerName}, or create a copy first"
    },
    selection: {
      actorSettingMarks: "Select actor setting Marks on {name}"
    },
    errors: {
      insufficient: "Not enough {resource}: required {required}, available {available}",
      outOfRange: "Cannot set {resource} to {value}, out of range [{min} , {max}]",
      onlyGM: "Only allowed for GM",
      noEdgeForActor: "{actor} is a {actorType}, so it cannot use Edge",
      expectedType: "Item is of type {type} instead of expected type {expectedType}",
      ignoredTargets: "This action cannot target {targets} due to its damage type",
      noTargetSelected: "No valid target is selected, consider selecting a valid target before using this {weapon}",
      maxTargetsExceedeed: "{weapon} has a {area} area of effect, with a maximum of {max} targets. You are currently targetting {count} targets",
      noDefenseOnWeapon: "No defense configured for {actor} weapon: {weapon}.<br>Configure defense against this weapon to be able to attack with it.",
      weaponNotFound: "No weapon could be found for this roll.",
      noTokenActor: "Token is not attached to an Actor!",
      cannotUseEdgeAnymore: "Too late to use edge. A defender already rolled his defense!",
      actorCannotApplyDamage: "Actor {actor} cannot apply {damageType} : maybe check the decker has connected his cyberdeck",
      actorCannotReceiveDamage: "Cannot apply {damageType} to actor {actor} : it does not have a condition monitor for this type of damage",
      actorDoesNotHaveDefense: "Actor {actor} does not have a {defense}, the attack should not to target {actorType}.<br>Or it may be a bug, please report and manage manually"
    },
    sourceReference: "Source reference",
    sourceReferenceHelp: "rulebook, page, ...",
    description: "Description"
  },
  actor: {
    characterSheet: "Character sheet",
    characterTabbedSheet: "Character sheet (tabs)",
    characterEnhancedSheet: "Character enhanced sheet (tabs)",
    vehicleSheet: "Vehicle sheet",
    battlemechSheet: "Battlemech sheet",
    characterNPCSheet: "NPC sheet",
    actorName: "Name",
    celebrity: "Legend",
    famous: "Fame",
    edgePools: {
      title: "Edge Pools",
      physical: "Physical",
      mental: "Mental",
      social: "Social",
      grit: "Grit",
      insight: "Insight",
      rumor: "Rumor",
      legend: "Legend",
      credibility: "Credibility",
      chaos: "Chaos",
      rating: "Rating",
      current: "Current"
    },
    tabs: {
      main: "Character",
      equipment: "Equipment",
      biography: "Biography"
    },
    words: {
      keywords: "Keywords",
      cues: "Cues",
      dispositions: "Dispositions"
    },
    counters: {
      xp: "XP",
      xpUnused: "Unspent XP",
      xpTotal: "Lifetime XP",
      current: "Current",
      lifetime: "Lifetime",
      edge: "Edge",
      edgePools: {
        physical: "Physical",
        mental: "Mental",
        social: "Social",
        grit: "Grit",
        insight: "Insight",
        rumor: "Rumor",
        legend: "Legend",
        credibility: "Credibility",
        chaos: "Chaos",
        rating: "Rating",
        current: "Current"
      },
      mental: {
        insight: "Insight",
        rumor: "Rumor"
      },
      social: {
        legend: "Legend",
        credibility: "Credibility"
      }
    },
    monitors: {
      conditionMonitors: "Condition monitors",
      overflow: "{actor}: Overflow of {monitor} condition monitor, transfering {overflow} to {overflowMonitor} condition monitor",
      physical: "Physical",
      fatigue: "Fatigue",
      armor: "Armor",
      structure: "Structure",
      heat: "Heat",
      effect: "Effect",
      grit: "Grit",
      insight: "Insight",
      rumor: "Rumor",
      legend: "Legend",
      credibility: "Credibility",
      chaos: "Chaos",
      resistance: "Resistance",
      resistanceBase: "Base resistance",
      resistanceByType: "By damage type",
      resistanceByTypeButton: "Resist by type",
      resistanceByTypeTitle: "Type-specific resistance",
      resistanceBonusLabel: "Bonuses",
      resistanceTotal: "Total",
      resistanceFallback: "Falls back to base",
      damageType: "Damage type",
      resistancePresets: {
        label: "Presets",
        biological: "Biological",
        armoredVehicle: "Armored vehicle",
        energyShielded: "Energy shielded"
      },
      resistanceApplied: "{actor} resisted {value} vs {damageType} on {monitor} ({source})",
      resistanceSources: {
        default: "base",
        type: "type-specific"
      }
    },
    vehicle: {
      moves: "Moves",
      attacks: "Attacks",
      stealth: "Stealth",
      category: "Category",
      skill: "Skill",
      weapons: "Vehicle Weapons",
      heatDissipation: "Heat dissipation",
      criticalTrack: "Criticals",
      locationFront: "Front effects",
      locationSide: "Side effects",
      locationRear: "Rear effects",
      locationCore: "Core effects",
      crew: {
        label: "Crew",
        placeholder: "Crew names or notes"
      },
      quickActions: {
        title: "Quick Actions",
        rangedAttack: "Ranged Attack",
        meleeAttack: "Melee Attack",
        dodgeCheck: "Dodge Check",
        pilotingCheck: "Piloting Check",
        sensorSweep: "Sensor Sweep",
        emergencyRepair: "Emergency Repair",
        primaryWeapons: "Primary Weapons",
        allWeapons: "All Weapons",
        primaryLabel: "Primary",
        unarmed: "Unarmed (Punch/Kick)",
        unarmedNotes: "Basic unarmed strike.",
        selectWeaponGroup: "Select Weapon Group",
        selectMeleeProfile: "Select Melee Profile",
        selectSensorSkill: "Select Sensor Sweep Skill",
        weaponGroup: "Weapon Group",
        weaponsUsed: "Weapons",
        meleeProfile: "Melee Profile",
        meleeDamage: "Damage",
        skillUsed: "Skill",
        tooltips: {
          ranged: "Roll an attack using any Weapon Group or Primary Weapon",
          melee: "Roll a melee attack using fists, kicks, or installed melee weapons",
          dodge: "Piloting roll to evade incoming fire or avoid danger",
          piloting: "Piloting roll for movement, jumping, stability, or hazard checks",
          sensorSweep: "Perception/Tech roll using sensors or Active Probe",
          emergencyRepair: "Technician roll to stabilize or fix a system during battle"
        },
        errors: {
          noRanged: "No weapon groups available for ranged attack.",
          noMelee: "No melee attacks available.",
          noSensorSweep: "Sensor sweep requires Perception or Technician."
        }
      }
    },
    battlemech: {
      chassis: "Chassis",
      tonnage: "Tonnage",
      heat: {
        thresholds: "Heat thresholds",
        runningHot: "Running hot",
        overheated: "Overheated",
        shutdown: "Shutdown",
        statusLabel: "Current heat state",
        status: {
          safe: "Safe",
          runningHot: "Running hot",
          overheated: "Overheated",
          shutdown: "Shutdown"
        }
      },
      hardpoints: {
        title: "Hardpoint summary",
        type: "Type",
        size: "Size",
        location: "Location",
        assigned: "Assigned to",
        none: "No hardpoints configured."
      },
      weaponGroups: {
        title: "Weapon groups",
        mountPoints: "Mount points used: {used} / {total}",
        group: "Group",
        weapons: "Weapons",
        empty: "No weapons assigned to this group.",
        none: "No weapon groups configured.",
        missingWeapon: "Weapon {missingId} is missing from the actor."
      },
      weapons: {
        title: "Battlemech weapons",
        weapon: "Weapon",
        category: "Category",
        mount: "Mount",
        hardpoint: "Hardpoint",
        heat: "Heat",
        none: "No mech weapons equipped.",
        mountUnknown: "Unspecified"
      }
    },
    ownership: {
      owner: "Owner",
      unknown: "Unknown",
      owned: "Owned"
    }
  },
  actorType: {
    character: "Character",
    npc: "NPC",
    vehicle: "Vehicle",
    battlemech: "Battlemech"
  },
  item: {
    sheet: "Sheet for ",
    tabs: {
      main: "Details",
      modifiers: "Modifiers"
    },
    skill: {
      code: "Internal code",
      copyDefault: "Configure skill",
      isKnowledge: "Knowledge",
      attribute: "Attribute",
      value: "Level",
      specialization: "Specialisation",
      specializationHelp: "Type the name to choose a specialization",
      isSocial: "Social skill",
      hasDrain: "Drain",
      hasConvergence: "Convergence"
    },
    quality: {
      positive: "Legacy positive flag",
      category: "Category",
      tier: "Tier",
      activation: "Activation",
      tags: "Tags",
      effects: "Effects",
      prerequisites: "Prerequisites",
      limits: "Limits",
      categoryOptions: {
        positive: "Positive",
        negative: "Negative",
        narrative: "Narrative"
      },
      tierOptions: {
        minor: "Minor",
        major: "Major"
      },
      activationOptions: {
        passive: "Passive",
        triggered: "Triggered"
      }
    },
    assetModule: {
      category: "Category",
      level: "Level",
      levelShort: "Lvl"
    },
    gear: {
      quantity: "Quantity",
      quantityShort: "Qty",
      rating: "Rating",
      category: "Category",
      tags: "Tags"
    },
    consumable: {
      quantity: "Quantity",
      quantityShort: "Qty",
      rating: "Potency",
      category: "Consumable Type",
      tags: "Tags"
    },
    lifeModule: {
      moduleType: "Module Type",
      type: {
        faction: "Faction",
        childhood: "Childhood",
        higherEducation: "Higher Education",
        realLife: "Real Life"
      }
    },
    mechWeapon: {
      category: "Weapon Category",
      hardpoint: "Hardpoint",
      damage: "Damage Value",
      damageType: "Damage Type",
      heat: "Heat",
      area: "Area of effect",
      range: {
        max: "Maximum range"
      }
    },
    personalWeapon: {
      skill: "Skill",
      category: "Weapon Category",
      damage: "Damage Value",
      ap: "Armor Piercing",
      damageType: "Damage Type",
      damageShort: "DV",
      apShort: "AP",
      weaponWithoutActor: "No Actor",
      equipped: "Equipped",
      primary: "Primary",
      attack: "Attack",
      traits: "Traits",
      notes: "Notes",
      attackRatingBand: {
        label: "Attack Rating Modifiers",
        close: "Close",
        near: "Near",
        far: "Far",
        extreme: "Extreme"
      },
      range: {
        max: "Maximum range"
      },
      withArmor: "Armor protects"
    },
    armor: {
      equipped: "Equipped",
      primary: "Primary",
      rating: "Armor Rating",
      defenseBonus: "Defense Bonus",
      mitigation: "Type Modifiers",
      durability: "Durability",
      tags: "Armor Tags",
      traits: "Traits",
      notes: "Notes"
    }
  },
  itemType: {
    singular: {
      skill: "Skill",
      quality: "Trait",
      assetModule: "Asset Module",
      gear: "Gear",
      consumable: "Consumable",
      contact: "Contact",
      lifeModule: "Life Module",
      mechWeapon: "Mech-Scale Weapon",
      personalWeapon: "Personal Weapon",
      armor: "Armor"
    },
    plural: {
      skill: "Skills",
      quality: "Qualities",
      assetModule: "Asset Modules",
      gear: "Gears",
      consumable: "Consumables",
      contact: "Contacts",
      lifeModule: "Life Modules",
      action: "Actions",
      monitor: "Monitors",
      mechWeapon: "Mech-Scale Weapons",
      personalWeapon: "Personal Weapons",
      armor: "Armor"
    }
  },
  monitor: {
    physical: "Physical",
    fatigue: "Fatigue"
  },
  monitorLetter: {
    physical: "P",
    fatigue: "F"
  },
  assetModuleCategory: {
    faction: "Faction",
    logistics: "Logistics",
    training: "Training",
    influence: "Influence",
    personal: "Personal",
    operations: "Operations"
  },
  attributes: {
    strength: "Strength",
    reflexes: "Reflexes",
    willpower: "Guts",
    intelligence: "Intelligence",
    charisma: "Charisma",
    edge: "Edge",
    // Legacy synonyms retained for migration safety:
    agility: "Reflexes",
    logic: "Intelligence",
    knowledge: "Knowledge",
    noAttribute: "No attribute chosen",
    // Legacy vehicle attributes retained (if still referenced somewhere):
    autopilot: "Autopilot",
    handling: "Handling",
    firewall: "Firewall",
    system: "System",
    // MWD vehicle attributes:
    chassis: "Chassis",
    condition: "Condition"
  },
  attributeAction: {
    defense: "Defense",
    judgeIntentions: "Judge intentions",
    perception: "Perception / Mental resistance",
    resistTorture: "Resist torture / Physical resistance",
    composure: "Composure / Social resistance",
    memory: "Memory",
    catch: "Catch object",
    lift: "Lift/carry"
  },
  defense: {
    physicalDefense: "Physical defense",
    physicalResistance: "Physical resistance",
    socialDefense: "Social defense",
    mentalResistance: "Mental resistance"
  },
  skill: {
    athletics: "Athletics",
    heavyWeapons: "Heavy Weapons",
    escapeArtist: "Escape Artist",
    gunnery: "Gunnery",
    meleeCombat: "Melee Combat",
    piloting: "Piloting",
    projectileWeapons: "Projectile Weapons",
    firearms: "Firearms",
    stealth: "Stealth",
    zeroGOps: "Zero-G Operations",
    art: "Art",
    artillery: "Artillery",
    systemOps: "System Operations",
    computers: "Computers",
    demolitions: "Demolitions",
    knowledge: "Knowledge",
    medTech: "MedTech",
    science: "Science",
    perception: "Perception",
    tactics: "Tactics",
    technician: "Technician",
    tracking: "Tracking",
    navigation: "Navigation",
    animalHandling: "Animal Handling",
    survival: "Survival",
    acting: "Acting",
    disguise: "Disguise",
    leadership: "Leadership",
    negotiation: "Negotiation",
    etiquette: "Etiquette",
    streetwise: "Streetwise",
    intimidation: "Intimidation",
    Administration: "Administration"
  },
  area: {
    none: "None",
    shotgun: "Shotgun",
    circle: "Circle",
    cone: "Cone",
    rect: "Rectangle",
    ray: "Ray"
  },
  range: {
    contact: "Contact",
    short: "Short",
    medium: "Medium",
    far: "Far",
    extreme: "Extreme"
  },
  vehicleCategory: {
    drone: "Drone",
    personal: "Personal",
    combat: "Combat",
    aerospace: "Aerospace",
    mech: "Mech"
  },
  mwd: {
    weightClass: {
      label: "Weight class",
      light: "Light",
      medium: "Medium",
      heavy: "Heavy",
      assault: "Assault"
    },
    hardpoint: {
      type: {
        ballistic: "Ballistic",
        energy: "Energy",
        missile: "Missile",
        special: "Special",
        melee: "Melee"
      },
      size: {
        small: "Small",
        medium: "Medium",
        large: "Large"
      },
      location: {
        head: "Head",
        torso: "Torso",
        arm: "Arm",
        leg: "Leg"
      }
    },
    primarySlot: {
      mode: {
        normal: "Large hardpoint",
        converted: "Converted slot"
      }
    },
    weaponCategory: {
      ranged: "Ranged",
      melee: "Melee"
    },
    melee: {
      title: "Melee options",
      baseProfile: "Unarmed",
      baseProfileLabel: "Base melee profile",
      damagePlaceholder: "Damage code",
      notesPlaceholder: "Notes",
      maxWeapons: "Maximum equipped melee weapons",
      allowedLocations: "Allowed locations",
      availableProfiles: "Available melee profiles",
      location: {
        head: "Head",
        torso: "Torso",
        arm: "Arm",
        leg: "Leg"
      },
      locationAny: "Any location"
    },
    loadout: {
      title: "Weapon loadout",
      mountPoints: "Mount points used",
      primarySlot: {
        label: "Primary weapon slot",
        noRestriction: "No type restriction",
        allowedWeapons: "Allowed primary weapons"
      },
      hardpoints: "Hardpoints",
      weaponGroups: "Weapon groups",
      primaryTag: "Primary",
      occupied: "{{weaponGroup}} assigned",
      emptyHardpoint: "Empty",
      errors: {
        label: "Errors",
        multiplePrimary: "Only one primary weapon group is allowed.",
        mountPointsExceeded: "Loadout uses {used} mount points but only {total} are available.",
        hardpointUnavailable: "No matching hardpoint for {weapon} ({type}, {size}).",
        primaryNeedsLarge: "{weapon} must use a large hardpoint to be primary.",
        primaryWithoutWeapon: "Primary group needs at least one weapon.",
        weaponAlreadyGrouped: "{weapon} is already assigned to another group.",
        primaryNotAllowedWeapon: "{weapon} is not allowed in the converted primary slot.",
        primaryTypeRestriction: "{weapon} does not match the converted primary slot restriction ({type}).",
        meleeLimitExceeded: "Equipped melee weapons {equipped} exceed limit {limit}.",
        meleeLocationRestricted: "{weapon} cannot be mounted at that location."
      },
      warnings: {
        label: "Warnings",
        weaponMissing: "Weapon with id {weapon} is missing."
      },
      newGroup: "New weapon group"
    },
    weapon: {
      damageType: {
        energy: "Energy",
        kinetic: "Kinetic",
        ballistic: "Ballistic",
        explosive: "Explosive",
        plasma: "Plasma",
        electrical: "Electrical",
        melee: "Melee",
        none: "None"
      }
    },
    personalWeapon: {
      damageType: {
        penetrating: "Penetrating",
        concussive: "Concussive",
        energy: "Energy",
        thermal: "Thermal",
        electrical: "Electrical"
      }
    }
  },
  modifier: {
    column: {
      group: "Group",
      effect: "Effect",
      value: "Value",
      category: "",
      subCategory: "",
      condition: "When"
    },
    group: {
      roll: "Roll",
      attribute: "Attribute",
      monitor: "Monitor",
      other: "Other"
    },
    roll: {
      effect: {
        pool: "Pool bonus",
        reroll: "Rerolls",
        rerollMax: "Reroll allowance cap",
        glitch: "Glitch dice",
        successReroll: "Reroll own successes",
        opponentPool: "Opponent pool malus",
        opponentReroll: "Opponent rerolls"
      },
      category: {
        attribute: "Attribute",
        skill: "Skill",
        attributeAction: "Attribute action"
      }
    },
    monitor: {
      effect: {
        armor: "Armor",
        structure: "Structure",
        fatigue: "Fatigue",
        physical: "Physical"
      },
      category: {
        max: "Increased max",
        resistance: "Resistance",
        resistanceByType: "Damage-type resistance"
      }
    },
    other: {
      effect: {
        ignoreWounds: "Ignore wounds",
        damageArmor: "Damage to armor",
        initiative: "Initiative bonus",
        celebrity: "Adjust legend"
      },
      category: {}
    },
    condition: {
      always: "Always"
    }
  }
}, k = _e, T = "mwd", Om = "MechWarrior: Destiny", gr = `system.${T}`, _m = T, fn = `systems/${T}`, Hc = `${fn}/style`, Ha = `${fn}/third-party/style`, X = `systems/${T}/templates`, fs = `${fn}/img/icons`, de = `${fs}/skills`, Me = "MWD | ", Lm = 2, xm = 5, $m = 4, jc = 8, Mi = {
  reflexes: "reflexes",
  strength: "strength",
  willpower: "willpower",
  intelligence: "intelligence",
  charisma: "charisma",
  edge: "edge",
  handling: "handling",
  system: "system",
  chassis: "chassis",
  condition: "condition"
}, yr = {
  autopilot: "autopilot",
  firewall: "firewall",
  knowledge: "knowledge"
}, kt = {
  grit: "grit",
  chaos: "chaos",
  insight: "insight",
  rumor: "rumor",
  legend: "legend",
  credibility: "credibility"
}, bo = {
  physical: [kt.grit, kt.chaos],
  mental: [kt.insight, kt.rumor],
  social: [kt.legend, kt.credibility]
}, A = {
  actorTypes: {
    character: "character",
    npc: "npc",
    vehicle: "vehicle",
    battlemech: "battlemech"
  },
  itemType: {
    skill: "skill",
    quality: "quality",
    assetModule: "assetModule",
    mechWeapon: "mechWeapon",
    personalWeapon: "personalWeapon",
    armor: "armor",
    gear: "gear",
    consumable: "consumable",
    contact: "contact",
    lifeModule: "lifeModule"
  },
  actorAttributes: Mi,
  itemAttributes: yr,
  attributes: { ...Mi, ...yr },
  monitors: {
    fatigue: "fatigue",
    armor: "armor",
    physical: "physical",
    structure: "structure",
    heat: "heat"
  },
  counters: {
    xp: "xp",
    xpTotal: "xpTotal",
    xpUnused: "xpUnused",
    edge: "edge",
    edgePools: kt,
    edgePoolGroups: bo,
    physical: {
      grit: kt.grit,
      chaos: kt.chaos
    },
    mental: {
      insight: kt.insight,
      rumor: kt.rumor
    },
    social: {
      legend: kt.legend,
      credibility: kt.credibility
    },
    chaos: kt.chaos
  },
  area: {
    none: "none",
    shotgun: "shotgun",
    circle: "circle",
    cone: "cone",
    rect: "rect",
    ray: "ray"
  }
}, Bm = Object.freeze({
  physical: "physical",
  mental: "mental",
  social: "social"
});
Object.freeze(Object.values(Bm));
const Ea = {
  [A.actorTypes.character]: [
    A.actorAttributes.strength,
    A.actorAttributes.reflexes,
    A.actorAttributes.willpower,
    A.actorAttributes.intelligence,
    A.actorAttributes.charisma,
    A.actorAttributes.edge
  ],
  [A.actorTypes.npc]: [
    A.actorAttributes.strength,
    A.actorAttributes.reflexes,
    A.actorAttributes.willpower,
    A.actorAttributes.intelligence,
    A.actorAttributes.charisma,
    A.actorAttributes.edge
  ],
  [A.actorTypes.vehicle]: [
    A.actorAttributes.handling,
    A.actorAttributes.system,
    A.actorAttributes.chassis,
    A.actorAttributes.condition
  ],
  [A.actorTypes.battlemech]: [
    A.actorAttributes.handling,
    A.actorAttributes.system,
    A.actorAttributes.chassis,
    A.actorAttributes.condition
  ]
}, Hs = {
  character: {
    physical: {
      status: { label: "Penalty", path: "derived.penalty" },
      derived: {
        penalty: { fn: "penaltyPer3Damage", source: "value" }
      }
    },
    fatigue: {
      status: { label: "Penalty", path: "derived.penalty" },
      derived: {
        penalty: { fn: "penaltyPer3Damage", source: "value" }
      }
    },
    armor: {
      status: { label: "Resist", path: "derived.resistance" },
      derived: {
        resistance: { fn: "resistancePerQuarter", source: "armorPersonalBase" }
      }
    }
  },
  battlemech: {
    armor: {
      status: { label: "Resist", path: "derived.resistance" },
      derived: {
        resistance: { fn: "resistancePerQuarter", source: "mechArmorBase" }
      }
    },
    structure: {
      status: null
    },
    heat: {
      status: { label: "Penalty", path: "derived.penalty" },
      derived: {
        penalty: { fn: "penaltyPer3Damage", source: "value" }
      }
    }
  },
  vehicle: {
    armor: {
      status: { label: "Resist", path: "derived.resistance" },
      derived: {
        resistance: { fn: "resistancePerQuarter", source: "vehicleArmorBase" }
      }
    },
    durability: {
      status: { label: "Penalty", path: "derived.penalty" },
      derived: {
        penalty: { fn: "penaltyPer3Damage", source: "value" }
      }
    }
  }
}, pt = {
  rollType: {
    attributeAction: "attributeAction",
    defense: "defense",
    attribute: "attribute",
    skill: "skill",
    weapon: "weapon"
  },
  actions: {
    defense: "defense",
    resistTorture: "resistTorture",
    judgeIntentions: "judgeIntentions",
    perception: "perception",
    composure: "composure",
    memory: "memory",
    catch: "catch",
    lift: "lift"
  },
  defenses: {
    physicalDefense: "physicalDefense",
    physicalResistance: "physicalResistance",
    socialDefense: "socialDefense",
    mentalResistance: "mentalResistance"
  },
  fixedDefenseCode: {
    // fix for old incorrect defense codes
    mentalDefense: "physicalResistance"
  }
};
globalThis.ANARCHY_CONSTANTS = {
  SYSTEM_NAME: T,
  SYSTEM_DESCRIPTION: Om,
  SYSTEM_SOCKET: gr,
  SYSTEM_SCOPE: _m,
  SYSTEM_PATH: fn,
  STYLE_PATH: Hc,
  THIRD_PARTY_STYLE_PATH: Ha,
  TEMPLATES_PATH: X,
  ICONS_PATH: fs,
  ICONS_SKILLS_PATH: de,
  LOG_HEAD: Me,
  SPECIALIZATION_BONUS: Lm,
  TARGET_SUCCESS: xm,
  TARGET_SUCCESS_EDGE: $m,
  BASE_MONITOR: jc,
  ACTOR_ATTRIBUTES: Mi,
  ITEM_ATTRIBUTES: yr,
  EDGE_POOL_GROUPS: bo,
  TEMPLATE: A,
  ANARCHY_SYSTEM: pt
};
const ti = class ti {
  static ascending(e = (t) => t) {
    return (t, i) => ti.sortingBy(e(t), e(i));
  }
  static descending(e = (t) => t) {
    return (t, i) => ti.sortingBy(e(i), e(t));
  }
  static sortingBy(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
  }
  static bySortedArray(e) {
    return (t) => e.indexOf(t);
  }
  static ascendingBySortedArray(e) {
    return ti.ascending(ti.bySortedArray(e));
  }
  static sortedMap(e, t = (i, n) => 0) {
    return Object.keys(e).sort(t).reduce(
      (i, n) => (i[n] = e[n], i),
      {}
    );
  }
  static reindexIds(e) {
    let t = 1;
    return e.forEach((i) => i.id = t++), e;
  }
  static distinct(e) {
    return [...new Set(e)];
  }
  static sum() {
    return (e, t) => e + t;
  }
  static sumValues(e, t = (i) => i) {
    return e.map(t).filter((i) => i != null).reduce(ti.sum(), 0);
  }
  static divint(e, t) {
    return Math.floor(e / t);
  }
  static divup(e, t) {
    return Math.ceil(e / t);
  }
  static join(e, t = "") {
    return e.reduce(ti.joiner(t));
  }
  static joiner(e = "") {
    return (t, i) => t + e + i;
  }
  static classify(e, t = (i) => i.type) {
    let i = {};
    return ti.classifyInto(i, e, t), i;
  }
  static classifyFirst(e, t) {
    let i = {};
    for (const n of e) {
      const s = t(n);
      i[s] || (i[s] = n);
    }
    return i;
  }
  static classifyInto(e, t, i = (n) => n.type) {
    for (const n of t) {
      const s = i(n);
      let r = e[s];
      r || (r = [], e[s] = r), r.push(n);
    }
  }
  static showControlWhen(e, t) {
    t ? e.show() : e.hide();
  }
  static minmax(e, t, i) {
    return Math.max(t, Math.min(e, i));
  }
};
D(ti, "isString", (e) => typeof e == "string" || e instanceof String);
let oe = ti;
const zm = {
  keyword: "keywords",
  disposition: "dispositions",
  cue: "cues"
}, I = class I {
  /**
   * Initialize enum caches.
   * Call once during system init/setup after config/constants are available.
   */
  static init() {
    var t, i, n, s, r, o, l, c, u, d, m, f;
    I.hbsAttributes = I.mapObjectToKeyValue(k.attributes).filter((p) => p.value !== "knowledge" && p.value !== "noAttribute"), I.hbsItemTypes = I.mapObjectToKeyValue(k.itemType), I.hbsMonitors = I.mapObjectToKeyValue(k.monitor), I.hbsMonitorLetters = I.mapObjectToKeyValue(k.monitorLetter), I.hbsAssetModuleCategories = I.mapObjectToKeyValue(k.assetModuleCategory), (i = (t = k.item) == null ? void 0 : t.lifeModule) != null && i.type ? I.hbsLifeModuleTypes = I.mapObjectToKeyValue(k.item.lifeModule.type) : (console.warn("MWD | MWD.item.lifeModule.type is missing; life module enums disabled."), I.hbsLifeModuleTypes = []), I.hbsAreas = I.mapObjectToKeyValue(k.area), I.hbsRanges = I.mapObjectToKeyValue(k.range), I.hbsVehicleCategories = I.mapObjectToKeyValue(k.vehicleCategory), I.hbsMwdWeightClasses = I.mapObjectToKeyValue((n = k.mwd) == null ? void 0 : n.weightClass), I.hbsMwdHardpointTypes = I.mapObjectToKeyValue((s = k.mwd) == null ? void 0 : s.hardpointType), I.hbsMwdHardpointSizes = I.mapObjectToKeyValue((r = k.mwd) == null ? void 0 : r.hardpointSize), I.hbsMwdHardpointLocations = I.mapObjectToKeyValue((o = k.mwd) == null ? void 0 : o.hardpointLocation), I.hbsMwdPrimaryModes = I.mapObjectToKeyValue((l = k.mwd) == null ? void 0 : l.primarySlotMode), I.hbsMwdWeaponCategories = I.mapObjectToKeyValue((c = k.mwd) == null ? void 0 : c.weaponCategory), I.hbsMwdWeaponDamageTypes = I.mapObjectToKeyValue((u = k.mwd) == null ? void 0 : u.weaponDamageType), I.hbsPersonalWeaponDamageTypes = I.mapObjectToKeyValue((d = k.mwd) == null ? void 0 : d.personalDamageType), I.hbsPersonalWeaponDamageCategories = I.mapObjectToKeyValue((m = k.mwd) == null ? void 0 : m.personalDamageCategory), I.hbsMwdMeleeLocations = I.mapObjectToKeyValue((f = k.mwd) == null ? void 0 : f.meleeLocation), I.hbsDamageTypes = oe.distinct(
      (I.hbsMwdWeaponDamageTypes ?? []).concat(I.hbsPersonalWeaponDamageTypes ?? []),
      (p) => p.value
    );
    const e = Object.values(Ea).flat();
    I.sortedAttributeKeys = oe.distinct(
      e.concat(Object.keys(k.attributes ?? {}))
    ), I.registerHandleBarHelpers(), I.ENUMS = I.getEnums();
  }
  static registerHandleBarHelpers() {
    typeof Handlebars > "u" || Handlebars.registerHelper("sortedAttributes", (e) => {
      if (!e || typeof e != "object") return [];
      const t = Object.keys(e), i = I.sortedAttributeKeys ?? [], n = new Map(i.map((s, r) => [s, r]));
      return t.sort((s, r) => {
        const o = n.has(s) ? n.get(s) : 9999, l = n.has(r) ? n.get(r) : 9999;
        return o !== l ? o - l : String(s).localeCompare(String(r));
      }), t.map((s) => {
        const r = e[s];
        return r && typeof r == "object" ? { key: s, ...r } : { key: s, value: r };
      });
    });
  }
  static getDamageTypes() {
    return I.hbsDamageTypes ?? [];
  }
  static getAttributes(e = () => !0) {
    return (I.hbsAttributes ?? []).filter((t) => e(t.value));
  }
  static getActorWordTypes() {
    return zm;
  }
  static getMonitors() {
    return I.hbsMonitors ?? [];
  }
  /**
   * Returns a big blob of enums suitable for sheet contexts.
   * `withKnowledge` is passed through to the skills service.
   */
  static getEnums(e = () => !0, t = !1) {
    return {
      attributes: I.getAttributes(e),
      itemTypes: I.hbsItemTypes ?? [],
      monitors: I.hbsMonitors ?? [],
      monitorLetters: I.hbsMonitorLetters ?? [],
      assetModuleCategories: I.hbsAssetModuleCategories ?? [],
      lifeModuleTypes: I.hbsLifeModuleTypes ?? [],
      areas: I.hbsAreas ?? [],
      ranges: I.hbsRanges ?? [],
      vehicleCategories: I.hbsVehicleCategories ?? [],
      // Skills: now sourced from MWD namespace (with safe fallback)
      skills: I.getSkillsEnum({ withKnowledge: t }),
      // MWD enums
      mwdWeightClasses: I.hbsMwdWeightClasses ?? [],
      mwdHardpointTypes: I.hbsMwdHardpointTypes ?? [],
      mwdHardpointSizes: I.hbsMwdHardpointSizes ?? [],
      mwdHardpointLocations: I.hbsMwdHardpointLocations ?? [],
      mwdPrimaryModes: I.hbsMwdPrimaryModes ?? [],
      mwdWeaponCategories: I.hbsMwdWeaponCategories ?? [],
      mwdWeaponDamageTypes: I.hbsMwdWeaponDamageTypes ?? [],
      personalWeaponDamageTypes: I.hbsPersonalWeaponDamageTypes ?? [],
      personalWeaponDamageCategories: I.hbsPersonalWeaponDamageCategories ?? [],
      damageTypes: I.hbsDamageTypes ?? [],
      mwdMeleeLocations: I.hbsMwdMeleeLocations ?? []
    };
  }
  static getSkillsEnum({ withKnowledge: e = !1 } = {}) {
    var n, s, r, o, l;
    const t = ((s = (n = game == null ? void 0 : game.system) == null ? void 0 : n.mwd) == null ? void 0 : s.skills) ?? ((o = (r = game == null ? void 0 : game.system) == null ? void 0 : r.anarchy) == null ? void 0 : o.skills);
    return (((l = t == null ? void 0 : t.getSkills) == null ? void 0 : l.call(t, { withKnowledge: e })) ?? []).map((c) => ({
      value: c.code,
      label: c.label ?? c.code
    }));
  }
  /**
   * Convert an object map into an array like [{ value, label }, ...]
   * Accepts:
   * - { key: "Label" }
   * - { key: { label: "Label" } }
   */
  static mapObjectToKeyValue(e, t = "value", i = "label") {
    return !e || typeof e != "object" ? [] : Object.keys(e).map((n) => {
      const s = e[n];
      let r;
      return s && typeof s == "object" ? r = s.label ?? s.name ?? s.value ?? String(n) : s != null ? r = String(s) : r = String(n), {
        [t]: n,
        [i]: r
      };
    });
  }
  // Backwards-compat alias (the legacy file misspelled this)
  static mapObjetToKeyValue(e, t = "value", i = "label") {
    return I.mapObjectToKeyValue(e, t, i);
  }
};
D(I, "ENUMS"), // HBS-friendly arrays of { value, label } (or key/value depending on caller)
D(I, "hbsAttributes"), D(I, "hbsItemTypes"), D(I, "hbsMonitors"), D(I, "hbsMonitorLetters"), D(I, "hbsAssetModuleCategories"), D(I, "hbsLifeModuleTypes"), D(I, "hbsAreas"), D(I, "hbsRanges"), D(I, "hbsVehicleCategories"), // MWD-specific enum groups
D(I, "hbsMwdWeightClasses"), D(I, "hbsMwdHardpointTypes"), D(I, "hbsMwdHardpointSizes"), D(I, "hbsMwdHardpointLocations"), D(I, "hbsMwdPrimaryModes"), D(I, "hbsMwdWeaponCategories"), D(I, "hbsMwdWeaponDamageTypes"), D(I, "hbsPersonalWeaponDamageTypes"), D(I, "hbsPersonalWeaponDamageCategories"), D(I, "hbsDamageTypes"), D(I, "hbsMwdMeleeLocations"), D(I, "sortedAttributeKeys");
let ve = I;
class Fm {
  static monitor(e) {
    return ve.getFromList(ve.getMonitors(), e) ?? "";
  }
  static letter(e) {
    return ve.getFromList(ve.getMonitorLetters(), e) ?? "";
  }
}
class Um {
  static toLowerCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}
const Hm = [
  "fas fa-dice",
  "fas fa-dice-one",
  "fas fa-dice-two",
  "fas fa-dice-three",
  "fas fa-dice-four",
  "fas fa-dice-five",
  "fas fa-dice-six"
];
class J {
  static fontAwesome(e) {
    return `<i class="${e}"></i>`;
  }
  static iconSystemPath(e, t) {
    return J.iconPath(`${Hc}/${e}`, t);
  }
  static iconPath(e, t) {
    return `<img class="${t}" src="${e}" />`;
  }
  static iconD6(e) {
    if (e < 0 || e > 6)
      throw `Dice ${e} is out of dice range [1..6] or 0 for multidice`;
    return J.fontAwesome(Hm[e]);
  }
}
globalThis.ANARCHY_ICONS = J;
const Pe = (a, e = {}) => a.replace(/\{(.*?)\}/g, (t, i) => e[i] ?? "");
function So(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => So(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function en(a = []) {
  return Array.from(new Set(a.map((e) => String(e ?? "").trim()).filter(Boolean)));
}
function Rn(a, e = "standard") {
  return String(a ?? "").trim() || e;
}
function jm(a, e = {}) {
  a && (a.movedToKeywords ?? (a.movedToKeywords = []), a.movedToKeywords.push(e));
}
function Wm(a, e, t = {}) {
  a && (a.errors ?? (a.errors = []), a.errors.push({ message: e, ...t }));
}
const Ao = Object.freeze(["templated"]), Km = Object.freeze([
  "burstCapable",
  "fullAutoCapable",
  "salvoCapable"
]), Gm = Object.freeze([
  "clustered",
  "mineLayer",
  "smoke",
  "incendiary",
  "emp"
]), qm = Object.freeze([
  { value: "burstCapable", label: "Burst Capable" },
  { value: "fullAutoCapable", label: "Full Auto Capable" },
  { value: "salvoCapable", label: "Salvo Capable" }
]), Vm = Object.freeze([
  { value: "templated", label: "Templated" },
  { value: "clustered", label: "Clustered" },
  { value: "mineLayer", label: "Mine Layer" },
  { value: "smoke", label: "Smoke" },
  { value: "incendiary", label: "Incendiary" },
  { value: "emp", label: "EMP" }
]), Wc = Object.freeze([
  { value: "blast", label: "Blast" },
  { value: "cone", label: "Cone" },
  { value: "line", label: "Line" },
  { value: "cloud", label: "Cloud" },
  { value: "minefield", label: "Minefield" }
]), Kc = Object.freeze([
  { value: "targeted", label: "Targeted (start on target)" },
  { value: "origin", label: "Origin (start on attacker)" },
  { value: "placed", label: "Placed (start free)" }
]), Ym = Object.freeze(["blast", "cone", "line"]);
new Set(Ao);
const Qm = /* @__PURE__ */ new Set([
  ...Ao,
  ...Km
]), Jm = /* @__PURE__ */ new Set([
  ...Ao,
  ...Gm
]);
function To() {
  return {
    movedToKeywords: [],
    errors: []
  };
}
function Yn(a) {
  return en(So(a));
}
function Gc({
  traits: a = [],
  keywords: e = [],
  recognized: t = /* @__PURE__ */ new Set(),
  report: i = null,
  owner: n = "weapon",
  path: s = ""
} = {}) {
  const r = So(a), o = Yn(e), l = [], c = [...o];
  for (const u of r) {
    if (t.has(u)) {
      l.push(u);
      continue;
    }
    c.push(u), jm(i, {
      owner: n,
      from: s || "traits",
      to: s ? s.replace(/traits$/u, "keywords") : "keywords",
      value: u
    });
  }
  return {
    traits: en(l),
    keywords: en(c)
  };
}
function qc({
  traits: a = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.traits"
} = {}) {
  return Gc({
    traits: a,
    keywords: e,
    recognized: Qm,
    report: t,
    owner: "weapon",
    path: i
  });
}
function Vc({
  traits: a = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.payloads[].traits"
} = {}) {
  return Gc({
    traits: a,
    keywords: e,
    recognized: Jm,
    report: t,
    owner: "payload",
    path: i
  });
}
function Yc(a = {}, e = "standard") {
  const t = a ?? {}, i = Rn(
    t.resolverKey ?? t.damageModel ?? t.resolver,
    e
  ), n = String(t.damageModel ?? "").trim(), s = t.onHitEffect;
  return {
    resolverKey: i,
    damageModel: n,
    onHitEffect: s === null ? null : String(s ?? "").trim() || null
  };
}
function js(a = {}) {
  const e = a ?? {}, t = !!e.enabled, i = e.shots, n = e.accuracyMod, s = e.addHeat, r = e.consumption;
  return {
    enabled: t,
    ...i !== void 0 ? { shots: Math.max(0, Number(i ?? 0) || 0) } : {},
    ...n !== void 0 ? { accuracyMod: Number(n ?? 0) || 0 } : {},
    ...s !== void 0 ? { addHeat: Number(s ?? 0) || 0 } : {},
    ...r !== void 0 ? { consumption: Math.max(0, Number(r ?? 0) || 0) } : {}
  };
}
function Xm(a = {}) {
  const e = a ?? {};
  return {
    single: js(e.single),
    burst: js(e.burst),
    fullAuto: js(e.fullAuto)
  };
}
function Zm(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return e === "circle" ? "blast" : e === "ray" ? "line" : Wc.some((t) => t.value === e) ? e : "";
}
function ef(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return ["target", "targeted"].includes(e) ? "targeted" : Kc.some((t) => t.value === e) ? e : "";
}
function tf(a = null) {
  const e = a ?? {}, t = Zm(e.shape ?? e.t ?? e.type), i = e.size ?? e.distance ?? e.radius ?? e.length, n = ef(e.placement ?? e.origin ?? e.mode);
  return !t && i === void 0 && !n ? null : {
    shape: t,
    size: Math.max(0, Number(i ?? 0) || 0),
    placement: n || "targeted"
  };
}
function af({
  weapon: a = {},
  payload: e = {},
  effectiveTraits: t = [],
  effectiveResolution: i = null,
  report: n = null
} = {}) {
  var g, y;
  const s = en((a == null ? void 0 : a.traits) ?? []), r = en((e == null ? void 0 : e.traits) ?? []), o = t.includes("templated"), l = s.includes("templated"), c = r.includes("templated"), u = (e == null ? void 0 : e.template) ?? null, d = (a == null ? void 0 : a.template) ?? null, m = Rn((g = e == null ? void 0 : e.resolution) == null ? void 0 : g.resolverKey, ""), f = Rn((y = a == null ? void 0 : a.resolution) == null ? void 0 : y.resolverKey, ""), p = Rn(i == null ? void 0 : i.resolverKey, "standard"), h = [];
  if (!o)
    return {
      errors: h,
      liveCapabilities: [],
      template: null,
      resolverKey: p,
      isTemplated: !1
    };
  l && h.push("Weapon-authored templated attacks are not supported in personal weapon capability v1."), l && c && h.push("Templated capability cannot be authored on both weapon and payload."), d && h.push("Template configuration must be authored on the payload for templated attacks."), c || h.push("Templated attacks require the active payload to author the templated capability."), (!(u != null && u.shape) || !(Number(u == null ? void 0 : u.size) > 0)) && h.push("Templated payloads require a valid template shape and size."), u != null && u.placement || h.push("Templated payloads require a template placement mode."), p !== "template" && h.push("Templated attacks require resolution.resolverKey to be template."), m && m !== "template" && h.push("Payload templated attacks must author resolution.resolverKey as template."), f === "template" && h.push("Weapon-level template resolver routing is not supported for personal weapon capability v1.");
  for (const b of h)
    Wm(n, b, { capability: "templated" });
  return {
    errors: h,
    liveCapabilities: ["templated"],
    template: u,
    resolverKey: p,
    isTemplated: !0
  };
}
const tn = Object.freeze(["none", "minor", "major", "full"]), nf = Object.freeze(["blast", "cone", "line", "rect"]), sf = Object.freeze({
  blast: "circle",
  cone: "cone",
  line: "ray",
  rect: "rect"
}), rf = Object.freeze({
  circle: "blast",
  cone: "cone",
  ray: "line",
  rect: "rect",
  rectangle: "rect"
}), ne = Object.freeze({
  none: "none",
  minor: "minor",
  major: "major",
  full: "full"
}), of = Object.freeze({
  none: 0,
  minor: 0.25,
  major: 0.5,
  full: 1
}), Et = Object.freeze({
  discrete: "discrete",
  persistent: "persistent"
});
function _(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function lf(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return ["true", "1", "yes", "y", "on"].includes(t) ? !0 : ["false", "0", "no", "n", "off"].includes(t) ? !1 : e;
}
function Qc(a) {
  return foundry.utils.deepClone(a);
}
function Be(a, e = ne.none) {
  const t = String(a ?? "").trim().toLowerCase();
  return tn.includes(t) ? t : e;
}
function br(a) {
  return Number(of[Be(a)] ?? 0) || 0;
}
function Ni(a) {
  return tn.indexOf(Be(a));
}
function Sr(a, e = 1) {
  const t = Math.max(0, Ni(a)), i = Math.max(0, t - Math.max(0, Math.trunc(_(e, 1))));
  return tn[i] ?? ne.none;
}
function cf(a, e = 1) {
  const t = Math.max(0, Ni(a)), i = Math.min(tn.length - 1, t + Math.max(0, Math.trunc(_(e, 1))));
  return tn[i] ?? ne.full;
}
function Bt(a) {
  return Be(a).toUpperCase();
}
function wo(a = {}) {
  var n, s, r, o, l;
  const e = a ?? {}, t = Math.max(1, Math.trunc(_(
    ((n = e == null ? void 0 : e.escalation) == null ? void 0 : n.intervalTurns) ?? ((s = e == null ? void 0 : e.escalation) == null ? void 0 : s.interval) ?? 1,
    1
  ))), i = Math.max(0, Math.trunc(_(((r = e == null ? void 0 : e.escalation) == null ? void 0 : r.rate) ?? 1, 1)));
  return {
    startExposure: Be(e.startExposure, ne.minor),
    escalation: {
      rate: i,
      intervalTurns: t,
      max: Be((o = e == null ? void 0 : e.escalation) == null ? void 0 : o.max, ne.full)
    },
    onFull: {
      burnDelta: Math.max(0, Math.trunc(_(((l = e == null ? void 0 : e.onFull) == null ? void 0 : l.burnDelta) ?? 0, 0)))
    },
    clearOnExit: lf(e.clearOnExit, !0)
  };
}
function bi(a = {}) {
  const e = a ?? {}, t = String(e.kind ?? Et.discrete).trim().toLowerCase() === Et.persistent ? Et.persistent : Et.discrete;
  return {
    kind: t,
    hazard: t === Et.persistent ? wo(e.hazard ?? e) : null
  };
}
function Jc(a = {}) {
  return bi(a).kind === Et.persistent;
}
function Qi(a, e) {
  return Math.max(0, Math.ceil(_(a, 0) * br(e)));
}
function ps(a, e = "") {
  const t = String(a ?? "").trim().toLowerCase();
  return nf.includes(t) ? t : e;
}
function Xc(a, e = "circle") {
  return sf[ps(a)] ?? e;
}
function uf(a, e = "") {
  const t = String(a ?? "").trim().toLowerCase();
  return rf[t] ?? e;
}
function ko(a) {
  let e = _(a, 0);
  for (; e < 0; ) e += 360;
  for (; e >= 360; ) e -= 360;
  return e;
}
function Si() {
  var a, e, t;
  return _(((e = (a = canvas == null ? void 0 : canvas.scene) == null ? void 0 : a.grid) == null ? void 0 : e.distance) ?? ((t = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : t.distance), 1) || 1;
}
function Qn() {
  var a, e;
  return _(((a = canvas == null ? void 0 : canvas.grid) == null ? void 0 : a.size) ?? ((e = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : e.size), 100) || 100;
}
function gt(a = 0) {
  return _(a, 0) * (Qn() / Si());
}
function Ba(a = 0) {
  return _(a, 0) * (Si() / Qn());
}
function Ar(a = {}, e = {}) {
  return Math.hypot(_(a.x, 0) - _(e.x, 0), _(a.y, 0) - _(e.y, 0));
}
function pn(a) {
  return _(a, 0) * Math.PI / 180;
}
function df({ geometry: a = {}, tokenCenter: e = {} } = {}) {
  const t = _(e.x, 0) - _(a.x, 0), i = _(e.y, 0) - _(a.y, 0), n = pn(a.direction ?? 0), s = Math.cos(n), r = Math.sin(n);
  return Math.max(0, t * s + i * r);
}
function Ws(a = 0, e = 0) {
  if (!(e > 0)) return ne.none;
  const t = Math.max(0, Math.min(1, a / e));
  return t <= 1 / 3 ? ne.full : t <= 2 / 3 ? ne.major : t <= 1 ? ne.minor : ne.none;
}
function ll({ template: a = {}, placement: e = {} } = {}) {
  var l, c;
  const t = ps((e == null ? void 0 : e.shape) ?? (a == null ? void 0 : a.shape), "");
  if (!t) return null;
  const i = _(
    (e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size),
    0
  );
  if (!(i > 0)) return null;
  const n = t === "cone" ? _((e == null ? void 0 : e.angle) ?? 90, 90) : null, s = t === "line" ? _((e == null ? void 0 : e.width) ?? Si(), Si()) : null, r = t === "rect" ? _((e == null ? void 0 : e.width) ?? (a == null ? void 0 : a.width) ?? (e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size), 0) : null, o = t === "rect" ? _((e == null ? void 0 : e.height) ?? (a == null ? void 0 : a.height) ?? (e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size), 0) : null;
  return t === "rect" && (!(r > 0) || !(o > 0)) ? null : {
    shape: t,
    measuredTemplateType: Xc(t),
    x: _((l = e == null ? void 0 : e.anchor) == null ? void 0 : l.x, 0),
    y: _((c = e == null ? void 0 : e.anchor) == null ? void 0 : c.y, 0),
    direction: ko((e == null ? void 0 : e.direction) ?? 0),
    distance: t === "rect" ? Math.max(r, o) : i,
    angle: n,
    width: s,
    height: t === "rect" ? o : null,
    anchorX: t === "rect" ? _((e == null ? void 0 : e.anchorX) ?? (a == null ? void 0 : a.anchorX) ?? 0, 0) : null,
    anchorY: t === "rect" ? _((e == null ? void 0 : e.anchorY) ?? (a == null ? void 0 : a.anchorY) ?? 0, 0) : null,
    placementMode: String((a == null ? void 0 : a.placement) ?? (e == null ? void 0 : e.placementMode) ?? "").trim() || null
  };
}
function ze(a = null, { template: e = null, placement: t = null } = {}) {
  var u, d, m, f;
  const i = a && typeof a == "object" ? a : {};
  if ((!i || !Object.keys(i).length) && (e || t))
    return ll({ template: e, placement: t });
  const n = String(
    i.measuredTemplateType ?? i.t ?? i.type ?? ""
  ).trim().toLowerCase(), s = ps(
    i.shape ?? uf(n) ?? "",
    ""
  );
  if (!s)
    return e || t ? ll({ template: e, placement: t }) : null;
  const r = s === "rect" ? _(i.width ?? (t == null ? void 0 : t.width) ?? (e == null ? void 0 : e.width) ?? i.distance ?? i.size, 0) : 0, o = s === "rect" ? _(i.height ?? (t == null ? void 0 : t.height) ?? (e == null ? void 0 : e.height) ?? i.distance ?? i.size, 0) : 0, l = _(
    i.distance ?? i.size ?? i.templateDistance ?? (t == null ? void 0 : t.distance) ?? (e == null ? void 0 : e.distance) ?? (e == null ? void 0 : e.size),
    0
  );
  if (s === "rect") {
    if (!(r > 0) || !(o > 0)) return null;
  } else if (!(l > 0)) return null;
  return {
    shape: s,
    measuredTemplateType: n || Xc(s),
    x: _(i.x ?? ((u = i.anchor) == null ? void 0 : u.x) ?? ((d = t == null ? void 0 : t.anchor) == null ? void 0 : d.x), 0),
    y: _(i.y ?? ((m = i.anchor) == null ? void 0 : m.y) ?? ((f = t == null ? void 0 : t.anchor) == null ? void 0 : f.y), 0),
    direction: ko(i.direction ?? i.rotation ?? (t == null ? void 0 : t.direction) ?? 0),
    distance: s === "rect" ? Math.max(r, o) : l,
    angle: s === "cone" ? _(i.angle ?? (t == null ? void 0 : t.angle) ?? 90, 90) : null,
    width: s === "line" ? _(i.width ?? (t == null ? void 0 : t.width) ?? Si(), Si()) : s === "rect" ? r : null,
    height: s === "rect" ? o : null,
    anchorX: s === "rect" ? _(i.anchorX ?? (t == null ? void 0 : t.anchorX) ?? (e == null ? void 0 : e.anchorX) ?? 0, 0) : null,
    anchorY: s === "rect" ? _(i.anchorY ?? (t == null ? void 0 : t.anchorY) ?? (e == null ? void 0 : e.anchorY) ?? 0, 0) : null,
    placementMode: String(i.placementMode ?? (e == null ? void 0 : e.placement) ?? "").trim() || null
  };
}
function mf(a = null) {
  return a ? typeof (a == null ? void 0 : a.toObject) == "function" ? a.toObject() : typeof (a == null ? void 0 : a.toJSON) == "function" ? a.toJSON() : a && typeof a == "object" ? Qc(a) : null : null;
}
function ff(a = []) {
  const e = [];
  for (const t of a) {
    const i = Number(t);
    i > 0 && (e.some((n) => Math.abs(n - i) < 1e-3) || e.push(i));
  }
  return e;
}
function pf(a = null, { placementMode: e = "region", shapeHint: t = "" } = {}) {
  const i = mf(a);
  if (!i || typeof i != "object") return null;
  const n = String(i.type ?? "").trim().toLowerCase(), s = ps(t, "");
  if (n === "circle")
    return ze({
      shape: s || "blast",
      measuredTemplateType: "circle",
      x: i.x,
      y: i.y,
      distance: Ba(i.radius),
      placementMode: e
    });
  if (n === "ellipse") {
    const r = _(i.radiusX, 0), o = _(i.radiusY, 0);
    return !(r > 0) || Math.abs(r - o) > 1e-3 ? null : ze({
      shape: s || "blast",
      measuredTemplateType: "circle",
      x: _(i.x, 0) + r,
      y: _(i.y, 0) + o,
      distance: Ba(r),
      placementMode: e
    });
  }
  if (n === "cone")
    return ze({
      shape: s || "cone",
      measuredTemplateType: "cone",
      x: i.x,
      y: i.y,
      direction: i.rotation ?? i.direction,
      distance: Ba(i.radius),
      angle: i.angle,
      placementMode: e
    });
  if (n === "line") {
    const r = Array.from((a == null ? void 0 : a.measuredSegments) ?? []), o = ff(r.map((f) => f == null ? void 0 : f.distance)), l = Math.max(
      _(i.distance, 0),
      _(i.length, 0),
      _(i.radius, 0),
      ...o,
      0
    ), c = o.filter((f) => Math.abs(f - l) >= 1e-3), u = Math.max(
      0,
      _(i.width, 0),
      _(i.thickness, 0),
      c.length ? Math.min(...c) : 0
    ) || Si(), d = (a == null ? void 0 : a.origin) ?? i.origin ?? {}, m = r.reduce((f, p) => {
      const h = Number((p == null ? void 0 : p.distance) ?? 0), g = Number((f == null ? void 0 : f.distance) ?? 0);
      return h > g ? p : f;
    }, null);
    return ze({
      shape: s || "line",
      measuredTemplateType: "ray",
      x: d.x ?? i.x,
      y: d.y ?? i.y,
      direction: (m == null ? void 0 : m.angle) ?? i.rotation ?? i.direction,
      distance: l,
      width: u,
      placementMode: e
    });
  }
  return n === "rectangle" || n === "rect" ? ze({
    shape: s || "rect",
    measuredTemplateType: "rect",
    x: i.x,
    y: i.y,
    direction: i.rotation ?? i.direction,
    width: Ba(i.width),
    height: Ba(i.height),
    anchorX: i.anchorX,
    anchorY: i.anchorY,
    placementMode: e
  }) : null;
}
function Zc(a = null, { placementMode: e = "region", shapeHint: t = "" } = {}) {
  const i = (a == null ? void 0 : a.document) ?? a ?? null, n = Array.from((i == null ? void 0 : i.shapes) ?? []);
  return n.length !== 1 ? null : pf(n[0], { placementMode: e, shapeHint: t });
}
function hf(a = null, e = null) {
  const t = ze(a);
  return t ? {
    template: {
      shape: t.shape,
      placement: t.placementMode ?? (e == null ? void 0 : e.placement) ?? null,
      distance: t.distance,
      size: t.distance
    },
    placement: {
      shape: t.shape,
      anchor: {
        x: t.x,
        y: t.y
      },
      distance: t.distance,
      direction: t.direction,
      angle: t.angle ?? void 0,
      width: t.width ?? void 0,
      placementMode: t.placementMode ?? null
    }
  } : null;
}
function eu(a) {
  var o, l, c, u, d, m, f, p, h;
  const e = (a == null ? void 0 : a.center) ?? ((o = a == null ? void 0 : a.object) == null ? void 0 : o.center) ?? null;
  if (e)
    return {
      x: _(e.x, 0),
      y: _(e.y, 0)
    };
  const t = _((a == null ? void 0 : a.x) ?? ((l = a == null ? void 0 : a.document) == null ? void 0 : l.x), 0), i = _((a == null ? void 0 : a.y) ?? ((c = a == null ? void 0 : a.document) == null ? void 0 : c.y), 0), n = _((a == null ? void 0 : a.w) ?? ((u = a == null ? void 0 : a.object) == null ? void 0 : u.w) ?? ((d = a == null ? void 0 : a.document) == null ? void 0 : d.width), 1), s = _((a == null ? void 0 : a.h) ?? ((m = a == null ? void 0 : a.object) == null ? void 0 : m.h) ?? ((f = a == null ? void 0 : a.document) == null ? void 0 : f.height), 1), r = _(((p = canvas == null ? void 0 : canvas.grid) == null ? void 0 : p.size) ?? ((h = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : h.size), 100);
  return {
    x: t + n * r / 2,
    y: i + s * r / 2
  };
}
function gf(a) {
  var i, n, s, r;
  const e = _((a == null ? void 0 : a.w) ?? ((i = a == null ? void 0 : a.object) == null ? void 0 : i.w) ?? ((n = a == null ? void 0 : a.document) == null ? void 0 : n.width), 1) * Qn(), t = _((a == null ? void 0 : a.h) ?? ((s = a == null ? void 0 : a.object) == null ? void 0 : s.h) ?? ((r = a == null ? void 0 : a.document) == null ? void 0 : r.height), 1) * Qn();
  return Math.max(e, t) / 2;
}
function yf({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = gt(a.distance);
  return Ar({ x: a.x, y: a.y }, e) <= i + t;
}
function bf({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = gt(a.distance), n = gt(a.width ?? Si()), s = pn(a.direction), r = e.x - a.x, o = e.y - a.y, l = Math.cos(s), c = Math.sin(s), u = r * l + o * c;
  if (u < -t || u > i + t) return !1;
  const d = Math.max(0, Math.min(i, u)), m = a.x + d * l, f = a.y + d * c;
  return Math.hypot(e.x - m, e.y - f) <= t + n / 2;
}
function Sf({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = gt(a.distance), n = e.x - a.x, s = e.y - a.y, r = Math.hypot(n, s);
  if (r > i + t) return !1;
  if (r === 0) return !0;
  let l = Math.atan2(s, n) * 180 / Math.PI - a.direction;
  for (; l <= -180; ) l += 360;
  for (; l > 180; ) l -= 360;
  const c = _(a.angle, 90) / 2, u = Math.asin(Math.min(1, t / Math.max(r, 1))) * 180 / Math.PI;
  return Math.abs(l) <= c + u;
}
function Af({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = gt(_(a.width, 0)), n = gt(_(a.height, 0));
  if (!(i > 0) || !(n > 0)) return !1;
  const s = _(a.anchorX, 0), r = _(a.anchorY, 0), o = _(a.x, 0), l = _(a.y, 0), c = o + i * (0.5 - s), u = l + n * (0.5 - r), d = -pn(a.direction ?? 0), m = Math.cos(d), f = Math.sin(d), p = e.x - c, h = e.y - u, g = p * m - h * f, y = p * f + h * m;
  return Math.abs(g) <= i / 2 + t && Math.abs(y) <= n / 2 + t;
}
function hs(a = null, e = null) {
  const t = ze(a);
  if (!t || !e) return !1;
  const i = eu(e), n = gf(e);
  return t.shape === "blast" ? yf({ geometry: t, tokenCenter: i, tokenRadius: n }) : t.shape === "line" ? bf({ geometry: t, tokenCenter: i, tokenRadius: n }) : t.shape === "cone" ? Sf({ geometry: t, tokenCenter: i, tokenRadius: n }) : t.shape === "rect" ? Af({ geometry: t, tokenCenter: i, tokenRadius: n }) : !1;
}
function tu({ template: a = {}, placement: e = {}, geometry: t = null, token: i = null } = {}) {
  if (!i) return ne.none;
  const n = ze(t, { template: a, placement: e });
  if (!n || !hs(n, i))
    return ne.none;
  const s = eu(i), r = gt(n.distance);
  if (!(r > 0)) return ne.none;
  if (n.shape === "line" || n.shape === "cone") {
    const l = df({ geometry: n, tokenCenter: s });
    return Ws(l, r);
  }
  if (n.shape === "rect") {
    const l = {
      x: _(n.x, 0) + gt(_(n.width, 0)) * (0.5 - _(n.anchorX, 0)),
      y: _(n.y, 0) + gt(_(n.height, 0)) * (0.5 - _(n.anchorY, 0))
    }, c = Ar(l, s);
    return Ws(c, r);
  }
  const o = Ar({ x: n.x, y: n.y }, s);
  return Ws(o, r);
}
function Li({ tier: a = ne.none, appliedTier: e = null, evadeUsed: t = !1, evadeLocked: i = !1 } = {}) {
  const n = Be(a, ne.none), s = Be(e ?? n, n);
  return {
    initialTier: n,
    initialLabel: Bt(n),
    initialMultiplier: br(n),
    finalTier: s,
    finalLabel: Bt(s),
    finalMultiplier: br(s),
    evadeUsed: !!t,
    evadeLocked: !!i
  };
}
function vo(a = {}, { locked: e = !1, active: t = !1 } = {}) {
  const i = Be((a == null ? void 0 : a.initialTier) ?? (a == null ? void 0 : a.tier), ne.none);
  if (!t || e || i === ne.none)
    return Li({
      tier: i,
      appliedTier: i,
      evadeUsed: !1,
      evadeLocked: !!e
    });
  const n = Sr(i, 1);
  return Li({
    tier: i,
    appliedTier: n,
    evadeUsed: i !== n,
    evadeLocked: !!e
  });
}
function iu(a = []) {
  return a.map((e) => ({
    x: Math.round(_(e.x, 0)),
    y: Math.round(_(e.y, 0))
  }));
}
function Tf(a = {}) {
  const e = gt(_(a.distance, 0)), t = gt(_(a.width, Si())) / 2, i = pn(a.direction ?? 0), n = Math.cos(i), s = Math.sin(i), r = -s, o = n, l = {
    x: _(a.x, 0) + e * n,
    y: _(a.y, 0) + e * s
  };
  return {
    type: "polygon",
    points: iu([
      { x: a.x + r * t, y: a.y + o * t },
      { x: l.x + r * t, y: l.y + o * t },
      { x: l.x - r * t, y: l.y - o * t },
      { x: a.x - r * t, y: a.y - o * t }
    ])
  };
}
function wf(a = {}) {
  const e = _(a.angle, 90), t = gt(_(a.distance, 0)), i = _(a.direction, 0), n = e / 2, s = [{ x: a.x, y: a.y }];
  for (let r = 0; r <= 8; r += 1) {
    const o = -n + e / 8 * r, l = pn(i + o);
    s.push({
      x: _(a.x, 0) + Math.cos(l) * t,
      y: _(a.y, 0) + Math.sin(l) * t
    });
  }
  return {
    type: "polygon",
    points: iu(s)
  };
}
function kf(a = {}) {
  return {
    type: "rectangle",
    x: Math.round(_(a.x, 0)),
    y: Math.round(_(a.y, 0)),
    width: Math.round(gt(_(a.width, 0))),
    height: Math.round(gt(_(a.height, 0))),
    rotation: ko(a.direction ?? 0),
    anchorX: _(a.anchorX, 0),
    anchorY: _(a.anchorY, 0)
  };
}
function gs(a = null) {
  const e = ze(a);
  if (!e) return [];
  if (e.shape === "blast") {
    const t = gt(_(e.distance, 0));
    return [{
      type: "ellipse",
      x: Math.round(_(e.x, 0) - t),
      y: Math.round(_(e.y, 0) - t),
      radiusX: Math.round(t),
      radiusY: Math.round(t),
      rotation: 0
    }];
  }
  return e.shape === "line" ? [Tf(e)] : e.shape === "cone" ? [wf(e)] : e.shape === "rect" ? [kf(e)] : [];
}
function si(a = null) {
  const e = ze(a);
  return e ? Qc(e) : null;
}
const au = Object.freeze({
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}), Jn = Object.freeze(
  Object.entries(au).map(([a, e]) => ({ value: a, label: e }))
), vf = Object.freeze({
  ballistic: "penetrating",
  kinetic: "concussive",
  explosive: "concussive",
  laser: "energy",
  plasma: "thermal",
  electrical: "electrical",
  melee: "penetrating",
  corrosive: "thermal",
  poison: "concussive",
  none: "concussive",
  penetrating: "penetrating",
  concussive: "concussive",
  energy: "energy",
  thermal: "thermal"
}), Mf = Object.freeze(
  Jn.map((a) => a.value)
), Tr = Object.freeze({}), ys = Object.freeze({
  ablative: Object.freeze({
    key: "ablative",
    label: "Ablative",
    rated: !1,
    aliases: ["ablative"],
    resolve: () => ({ mitigationByType: { energy: 2 } })
  }),
  flak: Object.freeze({
    key: "flak",
    label: "Flak",
    rated: !1,
    aliases: ["flak"],
    resolve: () => ({ mitigationByType: { penetrating: 1 } })
  }),
  reinforced: Object.freeze({
    key: "reinforced",
    label: "Reinforced",
    rated: !0,
    aliases: ["reinforced"],
    resolve: (a) => ({ reinforced: Math.max(0, Number((a == null ? void 0 : a.rating) ?? 0) || 0) })
  }),
  padded: Object.freeze({
    key: "padded",
    label: "Padded",
    rated: !1,
    aliases: ["padded"],
    resolve: () => ({ mitigationByType: { concussive: 1 } })
  }),
  insulated: Object.freeze({
    key: "insulated",
    label: "Insulated",
    rated: !1,
    aliases: ["insulated"],
    resolve: () => ({ mitigationByType: { thermal: 2 } })
  })
}), Cf = Object.freeze(
  Object.values(ys).map((a) => ({
    value: a.key,
    label: a.label,
    rated: a.rated
  }))
), nu = lu(Tr), su = lu(ys);
function bs(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => bs(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function Vt(a, e = "penetrating") {
  const t = String(a ?? "").trim().toLowerCase();
  return vf[t] ?? e;
}
function ru(a) {
  const e = String(a ?? "").trim();
  return e ? Vt(e, "") : "";
}
function ou(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return Mf.includes(e);
}
function Yt(a) {
  const e = Vt(a, "");
  return au[e] ?? String(a ?? "").trim();
}
function ri(a) {
  const e = a ?? {}, t = Number(e.ballistic ?? 0) || 0, i = Number(e.melee ?? 0) || 0;
  return {
    penetrating: e.penetrating !== void 0 ? Number(e.penetrating ?? 0) || 0 : Math.max(t, i),
    concussive: e.concussive !== void 0 ? Number(e.concussive ?? 0) || 0 : Number(e.explosive ?? 0) || 0,
    energy: Number(e.energy ?? 0) || 0,
    thermal: Number(e.thermal ?? 0) || 0,
    electrical: Number(e.electrical ?? 0) || 0
  };
}
function Nn(a) {
  return bs(a);
}
function Oa(a) {
  return bs(a);
}
function Ef(a) {
  return Yn(a);
}
function In(a = {}, e = "standard") {
  return Yc(a, e);
}
function Dn(a = {}) {
  return Xm(a);
}
function Pf(a = null) {
  return tf(a);
}
function Pa(a = "id") {
  var t, i;
  const e = (i = (t = globalThis.foundry) == null ? void 0 : t.utils) == null ? void 0 : i.randomID;
  return typeof e == "function" ? e() : `${a}-${Math.random().toString(36).slice(2, 10)}`;
}
function lu(a) {
  const e = {};
  return Object.values(a).forEach((t) => {
    [t.key, ...t.aliases ?? []].forEach((i) => {
      e[an(i)] = t.key;
    });
  }), Object.freeze(e);
}
function an(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function _a(a) {
  return Array.isArray(a) ? a : a && typeof a == "object" ? Object.values(a) : a == null || a === "" ? [] : [a];
}
function cu(a, e) {
  return _a(a).map((t) => Rf(t, e)).filter(Boolean);
}
function Rf(a, e) {
  if (typeof a == "string" || typeof a == "number") {
    const i = e[an(a)];
    return i ? { id: Pa("trait"), key: i, rating: 1 } : null;
  }
  if (!a || typeof a != "object") return null;
  const t = e[an(a.key ?? a.value ?? a.name)];
  return t ? {
    id: String(a.id ?? "").trim() || Pa("trait"),
    key: t,
    rating: Math.max(0, Number(a.rating ?? 0) || 0)
  } : null;
}
function Ui(a) {
  return cu(a, nu);
}
function mi(a) {
  return cu(a, su);
}
function Xn(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function Nf(a = {}, e = {}) {
  const t = Xn(a), i = Xn(e);
  return {
    close: t.close + i.close,
    near: t.near + i.near,
    far: t.far + i.far,
    extreme: t.extreme + i.extreme
  };
}
function If(a, e) {
  var t;
  return ((t = e[a]) == null ? void 0 : t.label) ?? a;
}
function uu(a, e) {
  var n;
  const t = If(a == null ? void 0 : a.key, e), i = Math.max(0, Number((a == null ? void 0 : a.rating) ?? 0) || 0);
  return (n = e[a == null ? void 0 : a.key]) != null && n.rated && i > 0 ? `${t} ${i}` : t;
}
function du(a, e) {
  return _a(a).map((t) => {
    const i = t == null ? void 0 : t.key, n = e[i];
    return n != null && n.resolve ? {
      entry: t,
      effect: n.resolve(t),
      label: uu(t, e)
    } : null;
  }).filter(Boolean);
}
function Df(a, e) {
  const t = { ...a ?? {} };
  return Object.entries(e ?? {}).forEach(([i, n]) => {
    t[i] = (Number(t[i] ?? 0) || 0) + (Number(n ?? 0) || 0);
  }), t;
}
function Of(a = []) {
  const e = {}, t = /* @__PURE__ */ new Set();
  for (const i of a.filter(Boolean)) {
    i.accuracyMod !== void 0 && (e.accuracyMod = (Number(e.accuracyMod ?? 0) || 0) + (Number(i.accuracyMod ?? 0) || 0)), i.ap !== void 0 && (e.ap = (Number(e.ap ?? 0) || 0) + (Number(i.ap ?? 0) || 0)), i.addHeat !== void 0 && (e.addHeat = (Number(e.addHeat ?? 0) || 0) + (Number(i.addHeat ?? 0) || 0)), i.bonusVsArmorTag && (e.bonusVsArmorTag = Df(e.bonusVsArmorTag, i.bonusVsArmorTag));
    for (const n of i.flags ?? []) {
      const s = String(n ?? "").trim();
      s && t.add(s);
    }
  }
  return t.size > 0 && (e.flags = Array.from(t)), e;
}
function _f(a = [], e = []) {
  const t = Array.isArray(a) || typeof a == "string" ? { traits: a, standardTraits: e } : a ?? {}, i = Oa(t.traits), n = Ui(t.standardTraits), s = du(n, Tr), r = i.map((o) => {
    var u;
    const l = nu[an(o)];
    if (!l) return null;
    const c = (u = Tr[l]) == null ? void 0 : u.resolve;
    return typeof c == "function" ? c({ key: l, rating: 1 }) : null;
  });
  return Of([
    ...s.map((o) => o.effect),
    ...r
  ]);
}
function Lf(a) {
  const e = a ?? {}, t = To(), i = Vc({
    traits: e.traits,
    keywords: e.keywords,
    report: t,
    path: "ammo.types[].traits"
  });
  return {
    id: String(e.id ?? "").trim() || Pa("ammo"),
    name: String(e.name ?? "").trim() || "Ammo",
    damageType: ru(e.damageType),
    apMod: Number(e.apMod ?? e.ap ?? 0) || 0,
    attackRatingBandMod: Xn(e.attackRatingBandMod ?? e.attackRatingBand),
    traits: i.traits,
    keywords: i.keywords,
    migration: t
  };
}
function xf(a) {
  var l;
  const e = a ?? {}, t = Math.max(0, Number(e.max ?? 0) || 0), i = Number(e.current), n = Number.isFinite(i) ? Math.max(0, Math.min(i, t > 0 ? t : i)) : Math.max(0, t), s = _a(e.types).map(Lf), r = String(e.activeTypeId ?? "").trim(), o = s.some((c) => c.id === r) ? r : ((l = s[0]) == null ? void 0 : l.id) ?? "";
  return {
    current: n,
    max: t,
    consumePerAttack: Math.max(1, Number(e.consumePerAttack ?? 1) || 1),
    activeTypeId: o,
    types: s
  };
}
function $f(a, e = "untracked") {
  const t = String(a ?? "").trim();
  return t ? t === "linked" ? "internal" : t === "perAttack" ? e : ["untracked", "internal", "actorResource", "itemRef"].includes(t) ? t : e : e;
}
function wr(a = {}) {
  const e = a ?? {};
  return {
    amount: Math.max(1, Number(e.amount ?? e.consumePerUse ?? e.consumePerAttack ?? 1) || 1),
    sourceId: String(e.sourceId ?? "").trim()
  };
}
function cl(a = {}) {
  const e = a ?? {};
  return {
    damageType: ru(e.damageType),
    ap: Number(e.ap ?? e.apMod ?? 0) || 0,
    attackRatingBand: Xn(e.attackRatingBand ?? e.attackRatingBandMod)
  };
}
function kr(a = {}) {
  return Yc(a, "standard");
}
function Bf(a) {
  return String(a ?? "").trim().toLowerCase() === "unloaded";
}
function vt(a, { report: e = null, path: t = "system.payloads[]" } = {}) {
  var l;
  const i = a ?? {}, n = String(i.id ?? "").trim() || Pa("payload"), s = Vc({
    traits: i.traits ?? ((l = i.modifies) == null ? void 0 : l.traits),
    keywords: i.keywords,
    report: e,
    path: `${t}.traits`
  }), r = bs(i.compatibleWith ?? i.compatible), o = Pf(i.template);
  return Bf(n) ? {
    id: "unloaded",
    label: "Unloaded",
    compatibleWith: [],
    modifies: cl({}),
    traits: [],
    keywords: [],
    template: null,
    areaEffect: bi({ kind: "discrete" }),
    resolution: kr({ resolverKey: "standard" }),
    consumption: wr({ amount: 1, sourceId: "" })
  } : {
    id: n,
    label: String(i.label ?? i.name ?? "").trim() || "Payload",
    compatibleWith: r,
    modifies: cl(i.modifies ?? i),
    traits: s.traits,
    keywords: s.keywords,
    template: o,
    areaEffect: bi(i.areaEffect ?? {}),
    resolution: kr(i.resolution ?? i),
    consumption: wr(i.consumption ?? i)
  };
}
function ii(a) {
  var o, l, c, u, d, m;
  const e = a ?? {}, t = $f(
    e.kind || e.type || ((o = e.link) != null && o.actorPath || e.actorPath ? "actorResource" : "") || ((l = e.link) != null && l.itemId || e.itemId || (c = e.link) != null && c.itemPath || e.itemPath ? "itemRef" : "") || (e.tracking || e.current !== void 0 || e.max !== void 0 ? "internal" : "") || "untracked",
    "untracked"
  ), i = e.tracking ?? e, n = Math.max(0, Number(i.max ?? 0) || 0), s = Number(i.current), r = Number.isFinite(s) ? Math.max(0, Math.min(s, n > 0 ? n : s)) : Math.max(0, n);
  return {
    id: String(e.id ?? "").trim() || Pa("source"),
    label: String(e.label ?? e.name ?? "").trim() || "Source",
    kind: t,
    tracking: {
      current: r,
      max: n
    },
    link: {
      actorPath: String(((u = e.link) == null ? void 0 : u.actorPath) ?? e.actorPath ?? "").trim(),
      itemId: String(((d = e.link) == null ? void 0 : d.itemId) ?? e.itemId ?? "").trim(),
      itemPath: String(((m = e.link) == null ? void 0 : m.itemPath) ?? e.itemPath ?? "").trim()
    }
  };
}
function mu({ report: a = null, path: e = "system.payloads" } = {}) {
  return {
    payloads: [vt({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: a, path: `${e}[0]` })],
    selectedPayloadId: "unloaded",
    consumptionSources: [ii({
      id: "untracked",
      label: "Untracked",
      kind: "untracked"
    })]
  };
}
function fu(a) {
  return String(a ?? "").trim().toLowerCase() === "melee";
}
function vr(a = [], { report: e = null, path: t = "system.payloads" } = {}) {
  const i = _a(a).map((n, s) => vt(n, { report: e, path: `${t}[${s}]` })).filter(Boolean);
  return i.some((n) => n.id === "unloaded") ? i : [
    vt({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: e, path: `${t}[0]` }),
    ...i
  ];
}
function Ss(a = {}, { report: e = null, path: t = "system.payloads" } = {}) {
  var d;
  const i = xf(a), n = Math.max(1, Number(i.consumePerAttack ?? 1) || 1), s = i.max > 0, r = s ? "internal-magazine" : "untracked", o = [ii(s ? {
    id: r,
    label: "Internal Source",
    kind: "internal",
    tracking: {
      current: i.current,
      max: i.max
    }
  } : {
    id: r,
    label: "Untracked",
    kind: "untracked",
    tracking: {}
  })], l = i.types.length ? i.types.map((m, f) => vt({
    id: m.id,
    label: m.name,
    modifies: {
      damageType: m.damageType,
      ap: m.apMod,
      attackRatingBand: m.attackRatingBandMod,
      traits: m.traits
    },
    keywords: m.keywords,
    resolution: { resolverKey: "standard" },
    consumption: {
      amount: n,
      sourceId: s ? r : ""
    }
  }, { report: e, path: `${t}[${f}]` })) : [vt({
    id: "unloaded",
    label: "Unloaded",
    resolution: { resolverKey: "standard" },
    consumption: {
      amount: n,
      sourceId: s ? r : ""
    }
  }, { report: e, path: `${t}[0]` })], c = vr(l, { report: e, path: t }), u = c.some((m) => m.id === i.activeTypeId) ? i.activeTypeId : ((d = c[0]) == null ? void 0 : d.id) ?? "unloaded";
  return {
    payloads: c,
    selectedPayloadId: u,
    consumptionSources: o
  };
}
function fi(a, { legacyAmmo: e = null, category: t = "", report: i = null, path: n = "system.payloads" } = {}) {
  if (fu(t)) return [];
  const s = _a(a).map((r, o) => vt(r, { report: i, path: `${n}[${o}]` })).filter(Boolean);
  return s.length > 0 ? vr(s, { report: i, path: n }) : e ? vr(Ss(e, { report: i, path: n }).payloads, { report: i, path: n }) : mu({ report: i, path: n }).payloads;
}
function ja(a, { legacyAmmo: e = null } = {}) {
  const t = _a(a).map(ii).filter(Boolean);
  return t.length > 0 ? t : e ? Ss(e).consumptionSources : mu().consumptionSources;
}
function da(a, e = [], { legacyAmmo: t = null, category: i = "" } = {}) {
  var r;
  if (fu(i)) return "";
  const n = fi(e, { legacyAmmo: t, category: i }), s = String(a ?? "").trim();
  if (n.some((o) => o.id === s)) return s;
  if (t) {
    const o = Ss(t).selectedPayloadId;
    if (n.some((l) => l.id === o)) return o;
  }
  return ((r = n[0]) == null ? void 0 : r.id) ?? "unloaded";
}
function ul({ root: a = null, path: e = "", fallback: t = {} } = {}) {
  const i = String(e ?? "").trim();
  if (!a || !i)
    return {
      current: Math.max(0, Number(t.current ?? 0) || 0),
      max: Math.max(0, Number(t.max ?? 0) || 0),
      currentPath: i
    };
  const n = foundry.utils.getProperty(a, i);
  if (n && typeof n == "object") {
    const o = Math.max(0, Number(n.max ?? t.max ?? 0) || 0), l = Number(n.current);
    return {
      current: Number.isFinite(l) ? Math.max(0, Math.min(l, o > 0 ? o : l)) : Math.max(0, o),
      max: o,
      currentPath: `${i}.current`
    };
  }
  const s = Math.max(0, Number(n ?? t.current ?? 0) || 0), r = Math.max(s, Math.max(0, Number(t.max ?? 0) || 0));
  return {
    current: r > 0 ? Math.min(s, r) : s,
    max: r,
    currentPath: i
  };
}
function pu({ source: a = null, actor: e = null } = {}) {
  var i, n, s, r, o, l, c;
  if (!a)
    return {
      id: "",
      label: "",
      kind: "untracked",
      isTracked: !1,
      current: 0,
      max: 0,
      consumePerUse: 1,
      actorPath: "",
      itemId: "",
      itemPath: ""
    };
  const t = {
    id: a.id,
    label: a.label,
    kind: a.kind,
    actorPath: String(((i = a.link) == null ? void 0 : i.actorPath) ?? "").trim(),
    itemId: String(((n = a.link) == null ? void 0 : n.itemId) ?? "").trim(),
    itemPath: String(((s = a.link) == null ? void 0 : s.itemPath) ?? "").trim()
  };
  if (a.kind === "internal") {
    const u = Math.max(0, Number(((r = a.tracking) == null ? void 0 : r.current) ?? 0) || 0), d = Math.max(0, Number(((o = a.tracking) == null ? void 0 : o.max) ?? 0) || 0);
    return {
      ...t,
      isTracked: d > 0 || u > 0,
      current: u,
      max: d,
      currentPath: ""
    };
  }
  if (a.kind === "actorResource") {
    const u = ul({
      root: (e == null ? void 0 : e.system) ?? null,
      path: t.actorPath,
      fallback: a.tracking
    });
    return {
      ...t,
      isTracked: !0,
      current: u.current,
      max: u.max,
      currentPath: u.currentPath
    };
  }
  if (a.kind === "itemRef") {
    const u = ((c = (l = e == null ? void 0 : e.items) == null ? void 0 : l.get) == null ? void 0 : c.call(l, t.itemId)) ?? null, d = ul({
      root: (u == null ? void 0 : u.system) ?? null,
      path: t.itemPath,
      fallback: a.tracking
    });
    return {
      ...t,
      isTracked: !0,
      current: d.current,
      max: d.max,
      currentPath: d.currentPath,
      sourceItem: u
    };
  }
  return {
    ...t,
    isTracked: !1,
    current: 0,
    max: 0,
    currentPath: ""
  };
}
function zf({ source: a = null, actor: e = null } = {}) {
  return pu({ source: a, actor: e });
}
function Mr({
  payloads: a = [],
  selectedPayloadId: e = "",
  consumptionSources: t = [],
  actor: i = null,
  payloadId: n = "",
  category: s = ""
} = {}) {
  const r = fi(a, { category: s }), o = ja(t), l = da(n || e, r, { category: s }), c = r.find((f) => f.id === l) ?? r[0] ?? null, u = (c == null ? void 0 : c.consumption) ?? wr(), d = u.sourceId ? o.find((f) => f.id === u.sourceId) ?? null : o.find((f) => f.kind === "untracked") ?? ii({
    id: "untracked",
    label: "Untracked",
    kind: "untracked"
  }), m = pu({ source: d, actor: i });
  return {
    payloads: r,
    activePayload: c,
    activePayloadId: (c == null ? void 0 : c.id) ?? "",
    payloadLabel: (c == null ? void 0 : c.label) ?? "",
    source: d,
    sourceState: {
      ...m,
      consumePerUse: Math.max(1, Number(u.amount ?? 1) || 1),
      sourceId: (d == null ? void 0 : d.id) ?? ""
    }
  };
}
function Ff({
  damageType: a = "penetrating",
  ap: e = 0,
  attackRatingBand: t = {},
  traits: i = [],
  keywords: n = [],
  standardTraits: s = [],
  resolution: r = {},
  fireModes: o = {},
  payloads: l = [],
  selectedPayloadId: c = "",
  consumptionSources: u = [],
  payloadId: d = "",
  actor: m = null,
  ammo: f = null,
  ammoTypeId: p = "",
  category: h = ""
} = {}) {
  var V, Z, re, ye, ce;
  const g = Mr({
    payloads: l != null && l.length ? l : void 0,
    selectedPayloadId: c || p,
    consumptionSources: u,
    actor: m,
    payloadId: d || p,
    category: h
  }), b = ((!l || l.length === 0) && f ? Mr({
    ...Ss(f),
    actor: m,
    payloadId: d || p,
    category: h
  }) : null) ?? g, S = b.activePayload, w = qc({
    traits: i,
    keywords: n
  }), M = Array.from(/* @__PURE__ */ new Set([
    ...w.traits,
    ...Oa(S == null ? void 0 : S.traits)
  ])), P = Yn([
    ...w.keywords,
    ...Yn(S == null ? void 0 : S.keywords)
  ]), E = In(r, "standard"), z = (V = S == null ? void 0 : S.resolution) != null && V.resolverKey ? kr(S.resolution) : E, Y = Dn(o), Q = To(), G = af({
    weapon: {
      traits: w.traits,
      resolution: E
    },
    payload: S,
    effectiveTraits: M,
    effectiveResolution: z,
    report: Q
  }), q = Ui(s), L = _f({
    traits: [],
    standardTraits: q
  }), U = {
    ...b.sourceState
  };
  return delete U.sourceItem, {
    damageType: ((Z = S == null ? void 0 : S.modifies) == null ? void 0 : Z.damageType) || Vt(a),
    ap: (Number(e ?? 0) || 0) + (Number(((re = S == null ? void 0 : S.modifies) == null ? void 0 : re.ap) ?? 0) || 0),
    attackRatingBand: Nf(
      t,
      ((ye = S == null ? void 0 : S.modifies) == null ? void 0 : ye.attackRatingBand) ?? {}
    ),
    effects: L,
    traits: M,
    keywords: P,
    standardTraits: q,
    payloadLabel: b.payloadLabel,
    payload: S ? foundry.utils.deepClone(S) : null,
    payloadState: {
      payloads: b.payloads.map((se) => foundry.utils.deepClone(se)),
      activePayloadId: b.activePayloadId,
      payloadLabel: b.payloadLabel,
      sourceId: ((ce = b.source) == null ? void 0 : ce.id) ?? "",
      sourceLabel: b.sourceState.label ?? "",
      sourceKind: b.sourceState.kind ?? "untracked",
      isTracked: b.sourceState.isTracked,
      current: b.sourceState.current,
      max: b.sourceState.max,
      consumePerUse: b.sourceState.consumePerUse
    },
    source: b.source ? foundry.utils.deepClone(b.source) : null,
    sourceState: foundry.utils.deepClone(U),
    template: G.template ? foundry.utils.deepClone(G.template) : null,
    areaEffect: bi((S == null ? void 0 : S.areaEffect) ?? {}),
    resolution: foundry.utils.deepClone(z),
    resolverKey: String((z == null ? void 0 : z.resolverKey) ?? "standard").trim() || "standard",
    fireModes: foundry.utils.deepClone(Y),
    capabilityReport: {
      ...Q,
      liveCapabilities: G.liveCapabilities,
      isTemplated: G.isTemplated,
      template: G.template ? foundry.utils.deepClone(G.template) : null,
      resolverKey: String((z == null ? void 0 : z.resolverKey) ?? "standard").trim() || "standard"
    },
    ammoLabel: b.payloadLabel,
    ammoType: S ? foundry.utils.deepClone(S) : null,
    ammoState: {
      current: U.current,
      max: U.max,
      consumePerAttack: U.consumePerUse,
      activeTypeId: b.activePayloadId,
      types: b.payloads.map((se) => {
        var Ie;
        return {
          id: se.id,
          name: se.label,
          damageType: ((Ie = se.modifies) == null ? void 0 : Ie.damageType) ?? "",
          traits: se.traits ?? [],
          keywords: se.keywords ?? []
        };
      }),
      isTracked: U.isTracked,
      ammoLabel: b.payloadLabel
    }
  };
}
function hu(a = {}, e = {}) {
  const t = ri(a), i = ri(e);
  return {
    penetrating: t.penetrating + i.penetrating,
    concussive: t.concussive + i.concussive,
    energy: t.energy + i.energy,
    thermal: t.thermal + i.thermal,
    electrical: t.electrical + i.electrical
  };
}
function Ks({ standardTraits: a = [], traits: e = [], traitState: t = {} } = {}) {
  var m, f;
  const i = mi(a), s = Oa(e).map((p) => {
    const h = su[an(p)];
    return h ? { id: Pa("trait"), key: h, rating: h === "reinforced" ? 1 : 0 } : null;
  }).filter(Boolean), r = du(
    [...i, ...s],
    ys
  ), o = r.reduce((p, h) => {
    var g;
    return hu(p, ((g = h.effect) == null ? void 0 : g.mitigationByType) ?? {});
  }, ri({})), l = r.reduce(
    (p, h) => {
      var g;
      return p + Math.max(0, Number(((g = h.effect) == null ? void 0 : g.reinforced) ?? 0) || 0);
    },
    0
  ), c = Number((m = t == null ? void 0 : t.reinforced) == null ? void 0 : m.current), u = Number((f = t == null ? void 0 : t.reinforced) == null ? void 0 : f.max), d = Number.isFinite(c) ? c : Number.isFinite(u) ? u : l;
  return {
    mitigationByType: o,
    reinforcedMax: l,
    traitState: {
      reinforced: {
        current: Math.min(l, Math.max(0, d || 0)),
        max: l
      }
    },
    labels: r.map((p) => p.label),
    standardTraits: i
  };
}
function Uf({ traits: a = [], standardTraits: e = [] } = {}) {
  return [
    ...Oa(a),
    ...mi(e).map((i) => uu(i, ys))
  ].filter(Boolean);
}
function Mo(a) {
  const e = Math.max(0, Number(a ?? 0) || 0);
  return e <= 0 ? 0 : Math.ceil(e / 4);
}
function Hf({
  currentArmorRating: a = 0,
  mitigationByType: e = {},
  damageType: t
} = {}) {
  const i = Math.max(0, Number(a ?? 0) || 0);
  if (i <= 0)
    return {
      currentArmorRating: 0,
      baseMitigation: 0,
      typeMitigationMod: 0,
      totalMitigation: 0,
      isDestroyed: !0
    };
  const n = Vt(t, "penetrating"), s = ri(e), r = Mo(i), o = Number(s[n] ?? 0) || 0;
  return {
    currentArmorRating: i,
    baseMitigation: r,
    typeMitigationMod: o,
    totalMitigation: r + o,
    isDestroyed: !1
  };
}
function jf({ damageIncoming: a = 0, armorTags: e = [], effects: t = {} } = {}) {
  const i = new Set(Nn(e));
  let n = Number(a ?? 0) || 0;
  const s = [];
  return Object.entries((t == null ? void 0 : t.bonusVsArmorTag) ?? {}).forEach(([r, o]) => {
    if (!i.has(r)) return;
    const l = Number(o ?? 0) || 0;
    l && (n *= 1 + l, s.push({ tag: r, bonus: l }));
  }), {
    damageIncoming: n,
    applied: s
  };
}
class na {
  static checkSufficient(e, t, i) {
    if (t > i) {
      const n = Pe(k.common.errors.insufficient, {
        resource: e,
        required: t,
        available: i
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkOutOfRange(e, t, i, n) {
    if (t < i || t > n) {
      const s = Pe(k.common.errors.outOfRange, {
        resource: e,
        value: t,
        min: i,
        max: n
      });
      throw ui.notifications.error(s), s;
    }
  }
  static checkUserGM() {
    if (!game.user.isGM) {
      const e = k.common.errors.onlyGM;
      throw ui.notifications.error(e), e;
    }
  }
  static checkItemType(e, t) {
    if (e.type != t) {
      const i = Pe(k.common.errors.expectedType, {
        type: e.type ? k.itemType.singular[e.type] : e.type,
        expectedType: t
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkActorCanReceiveDamage(e, t, i) {
    if (!t) {
      const n = Pe(k.common.errors.actorCannotReceiveDamage, {
        actor: i.name,
        damageType: ou(e) ? Yt(e) : k.actor.monitors[e] ?? k.mwd.weaponDamageType[e] ?? k.mwd.personalDamageType[e] ?? e
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkWeaponDefense(e, t) {
    var n;
    const i = e.getDefense();
    if ((((n = e.isPersonalWeapon) == null ? void 0 : n.call(e)) ?? e.type === A.itemType.personalWeapon) && !i) {
      const s = Pe(k.common.errors.noDefenseOnWeapon, { actor: t.name, weapon: e.name });
      throw ui.notifications.error(s), s;
    }
  }
  static checkTargetsCount(e, t, i) {
    if (e > 0 && t.length > e) {
      const n = Pe(k.common.errors.maxTargetsExceedeed, {
        weapon: this.name,
        area: k.area[i],
        count: t.length,
        max: e
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkActorDefenseAction(e, t, i) {
    if (!e) {
      const n = Pe(k.common.errors.actorDoesNotHaveDefense, {
        actor: t.name,
        defense: i.labelkey,
        actorType: k.actorType[t.type]
      });
      throw ui.notifications.error(n), n;
    }
  }
}
function Jt(a, e, t, i, n, s = (r) => !0) {
  return {
    code: a,
    labelkey: k.attributeAction[a],
    label: k.attributeAction[a],
    attributeFunction1: e ?? ((r) => {
    }),
    attributeFunction2: t ?? ((r) => {
    }),
    icon: i,
    actorTypes: n,
    condition: s
  };
}
function bn(a, e) {
  return {
    code: a,
    labelkey: k.defense[a],
    label: k.defense[a],
    actionCode: e
  };
}
const We = A.actorAttributes, Ke = A.actorTypes, wt = pt.actions, Sn = pt.defenses, Gs = [
  Jt(wt.defense, (a) => We.reflexes, (a) => We.intelligence, J.fontAwesome("fas fa-shield-alt"), [Ke.character, Ke.npc]),
  Jt(wt.defense, (a) => We.handling, (a) => We.chassis, J.fontAwesome("fas fa-tachometer-alt"), [Ke.vehicle, Ke.battlemech]),
  Jt(wt.resistTorture, (a) => We.strength, (a) => We.willpower, J.fontAwesome("fas fa-angry"), [Ke.character, Ke.npc]),
  Jt(wt.perception, (a) => We.logic, (a) => We.willpower, J.fontAwesome("fas fa-eye"), [Ke.character, Ke.npc]),
  Jt(wt.perception, (a) => We.system, (a) => We.handling, J.fontAwesome("fas fa-video"), [Ke.vehicle, Ke.battlemech]),
  Jt(wt.composure, (a) => We.charisma, (a) => We.willpower, J.fontAwesome("fas fa-meh"), [Ke.character, Ke.npc]),
  Jt(wt.judgeIntentions, (a) => We.charisma, (a) => We.charisma, J.fontAwesome("fas fa-theater-masks"), [Ke.character, Ke.npc]),
  Jt(wt.memory, (a) => We.logic, (a) => We.logic, J.fontAwesome("fas fa-brain"), [Ke.character, Ke.npc]),
  Jt(wt.catch, (a) => We.reflexes, (a) => We.reflexes, J.fontAwesome("fas fa-baseball-ball"), [Ke.character, Ke.npc]),
  Jt(wt.lift, (a) => We.strength, (a) => We.strength, J.fontAwesome("fas fa-dumbbell"), [Ke.character, Ke.npc])
], An = [
  bn(Sn.physicalDefense, wt.defense),
  bn(Sn.physicalResistance, wt.resistTorture),
  bn(Sn.socialDefense, wt.composure),
  bn(Sn.mentalResistance, wt.perception)
];
class xe {
  static init() {
    Handlebars.registerHelper("fixedDefenseCode", (e) => xe.fixedDefenseCode(e));
  }
  static all(e = void 0) {
    return e ? Gs.filter(e) : Gs;
  }
  static getActorActions(e) {
    return Gs.filter((t) => t.actorTypes.includes(e.type) && t.condition(e));
  }
  static fixedDefenseCode(e) {
    return pt.fixedDefenseCode[e] ?? e;
  }
  static getActorDefenses(e) {
    return An.map((t) => {
      const i = xe.getActorAction(e, t.actionCode);
      return xe._convertToDefense(i, t);
    }).filter((t) => t == null ? void 0 : t.code);
  }
  static getDefenseAttributeAction(e) {
    var t;
    return (t = An.find((i) => i.code == e)) == null ? void 0 : t.actionCode;
  }
  static getActorAction(e, t) {
    return xe.getActorActions(e).find((i) => i.code == t);
  }
  static getActorDefense(e, t) {
    t = xe.fixedDefenseCode(t);
    const i = An.find((s) => s.code == t), n = xe.getActorAction(e, i.actionCode);
    return na.checkActorDefenseAction(n, e, i), xe._convertToDefense(n, i);
  }
  static _convertToDefense(e, t) {
    return e ? foundry.utils.mergeObject(
      t,
      e ?? {},
      { overwrite: !1, inplace: !1 }
    ) : void 0;
  }
  static getDefenses() {
    return An;
  }
  static prepareShortcut(e, t) {
    const i = xe.getActorActions(e).find((n) => n.code == t);
    if (i)
      return {
        icon: i.icon,
        label: i.labelkey,
        callback: (n) => n.actor.rollAttributeAction(t)
      };
  }
}
class Cr {
  constructor() {
    this.remoteCalls = {}, game.socket.on(gr, async (e) => this.onSocketMessage(e));
  }
  static async register(e, t) {
    game.system.anarchy.remoteCall._register(e, t);
  }
  async _register(e, t) {
    if (this.remoteCalls[e])
      throw `RemoteCall msg ${e} is already registered`;
    foundry.utils.mergeObject(t, {
      callback: (i) => {
        console.log(Me + "RemoteCall [", e, "] (", i, ")");
      },
      condition: (i) => !0,
      multiple: !1
      /* true if multiple users should handle the message */
    }, { overwrite: !1 }), this.remoteCalls[e] = t, console.log(Me + "RemoteCall registered", e);
  }
  static call(e, t) {
    return game.system.anarchy.remoteCall._remoteCall(e, t);
  }
  _remoteCall(e, t) {
    const i = this.remoteCalls[e];
    return !i || i.condition(game.user) || !i.multiple && Kt.isUniqueConnectedGM() ? !1 : (game.socket.emit(gr, { msg: e, data: t }), !0);
  }
  async onSocketMessage(e) {
    const t = this.remoteCalls[e.msg];
    if (t) {
      const i = t.condition(game.user), n = t.multiple, s = Kt.isUniqueConnectedGM();
      i && (n || s) ? t.callback(e.data) : console.log(Me + "RemoteCall.onSocketMessage(", e, ") ignored :", i, n, s);
    } else
      console.log(Me + "RemoteCall: No callback registered for", e);
  }
}
const dl = "Users.blindMessageToGM";
class Kt {
  static init() {
    Cr.register(dl, {
      callback: (e) => Kt.blindMessageToGM(e),
      condition: (e) => e.isGM
    });
  }
  static blindMessageToGM(e) {
    Cr.call(dl, e) || ChatMessage.create({
      user: e.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      blind: !0,
      content: Pe(k.chat.blindMessageToGM, {
        user: game.user.name,
        message: e.content
      })
    });
  }
  static getUsers(e = (t) => !0) {
    return (game.version ? game.users : game.users.entities).filter(e);
  }
  static firstConnectedGM() {
    return Kt.getUsers((e) => e.isGM && e.active).sort(oe.ascending((e) => e.id)).at(0) ?? {};
  }
  /**
   * @returns true pour un seul utilisateur: le premier GM connecté par ordre d'id
   */
  static isUniqueConnectedGM(e = game.user) {
    return e.id == Kt.firstConnectedGM().id;
  }
  static firstResponsible(e) {
    if (!(e != null && e.testUserPermission))
      return;
    const t = Kt.getUsers(
      (i) => i.active && e.testUserPermission(i, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER)
    ).sort(oe.ascending((i) => i.id)).at(0);
    return (t == null ? void 0 : t.id) === game.user.id ? e : void 0;
  }
  static getTargetTokens(e) {
    return Array.from(e.targets);
  }
  static getSelectedTokens(e) {
    return Array.from(canvas.tokens.controlled);
  }
  static getSelectedActors() {
    return Array.from(canvas.tokens.controlled).map((e) => e.actor);
  }
  static getPlayerActor() {
    return game.user.character;
  }
}
const oa = k.actor.monitors, di = k.actor.counters, gu = {
  armor: {
    path: "system.monitors.armor.value",
    monitor: (a) => a.system.monitors.armor,
    iconChecked: J.fontAwesome("fas fa-shield-slash"),
    iconUnchecked: J.fontAwesome("fas fa-shield-alt"),
    iconHit: J.fontAwesome("fas fa-bahai"),
    resource: oa.armor
  },
  fatigue: {
    path: "system.monitors.fatigue.value",
    monitor: (a) => a.system.monitors.fatigue,
    iconChecked: J.fontAwesome("fas fa-grimace"),
    iconUnchecked: J.fontAwesome("far fa-smile"),
    iconHit: J.fontAwesome("fas fa-bahai"),
    resource: oa.fatigue,
    overflow: (a) => A.monitors.physical,
    useArmor: !0
  },
  physical: {
    path: "system.monitors.physical.value",
    monitor: (a) => a.system.monitors.physical,
    iconChecked: J.fontAwesome("fas fa-heartbeat"),
    iconUnchecked: J.fontAwesome("far fa-heart"),
    iconHit: J.fontAwesome("fas fa-bahai"),
    resource: oa.physical,
    useArmor: !0
  },
  structure: {
    path: "system.monitors.structure.value",
    monitor: (a) => a.system.monitors.structure,
    iconChecked: J.fontAwesome("fas fa-car-crash"),
    iconUnchecked: J.fontAwesome("fas fa-car-alt"),
    iconHit: J.fontAwesome("fas fa-bahai"),
    resource: oa.structure
  },
  heat: {
    path: "system.monitors.heat.value",
    monitor: (a) => a.system.monitors.heat,
    iconChecked: J.fontAwesome("fas fa-fire"),
    iconUnchecked: J.fontAwesome("far fa-sun"),
    iconHit: J.fontAwesome("fas fa-temperature-high"),
    resource: oa.heat
  },
  criticals: {
    path: "system.hybrid.criticals.value",
    monitor: (a) => {
      var e;
      return ((e = a.system.hybrid) == null ? void 0 : e.criticals) ?? { value: 0, max: 0 };
    },
    iconChecked: J.fontAwesome("fas fa-bolt"),
    iconUnchecked: J.fontAwesome("far fa-dot-circle"),
    iconHit: J.fontAwesome("fas fa-exclamation-triangle"),
    resource: oa.structure
  },
  anarchy: {
    path: "system.counters.anarchy.value",
    monitor: (a) => ({
      value: a.system.counters.anarchy.value,
      max: 6
    }),
    iconChecked: J.iconPath(`${Ha}/anarchy-point.webp`, "checkbar-img"),
    iconUnchecked: J.iconPath(`${Ha}/anarchy-point-off.webp`, "checkbar-img"),
    resource: di.anarchy
  },
  plot: {
    path: "system.counters.anarchy.value",
    monitor: (a) => {
      const e = a.system.counters.anarchy.value;
      return { value: e, max: e + 1 };
    },
    iconChecked: J.iconPath(`${Ha}/danger-point.webp`, "checkbar-img"),
    iconUnchecked: J.iconPath(`${Ha}/danger-point-off.webp`, "checkbar-img"),
    resource: di.anarchy
  },
  sceneAnarchy: {
    path: "system.counters.edgePools.chaos.value",
    monitor: (a) => {
      const e = a.getEdgePoolValue(A.counters.edgePools.chaos), t = a.getAttributeValue(A.actorAttributes.edge);
      return { value: e, max: t };
    },
    iconChecked: J.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    iconUnchecked: J.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    resource: di.edgePools.chaos
  },
  grit: {
    path: "system.counters.edgePools.grit.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.grit), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: J.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    iconUnchecked: J.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    resource: di.edgePools.grit
  },
  insight: {
    path: "system.counters.edgePools.insight.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.insight), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: J.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    iconUnchecked: J.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    resource: di.edgePools.insight
  },
  legend: {
    path: "system.counters.edgePools.legend.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.legend), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: J.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    iconUnchecked: J.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    resource: di.edgePools.legend
  },
  credibility: {
    path: "system.counters.edgePools.credibility.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.credibility), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: J.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    iconUnchecked: J.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    resource: di.edgePools.credibility
  },
  rumor: {
    path: "system.counters.edgePools.rumor.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.rumor), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: J.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    iconUnchecked: J.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    resource: di.edgePools.rumor
  }
}, Xt = foundry.utils.mergeObject(gu, {});
class j {
  static init() {
    Handlebars.registerHelper("iconCheckbar", j.iconCheckbar), Handlebars.registerHelper("iconCheckbarHit", j.iconHit);
  }
  static hackCheckbars(e) {
    if (e) {
      const t = foundry.utils.mergeObject(gu, {});
      foundry.utils.mergeObject(t, e, { recursive: !0 }), foundry.utils.mergeObject(Xt, t, { overwrite: !0 });
    }
  }
  static iconCheckbar(e, t) {
    return t ? j.iconChecked(e) : j.iconUnchecked(e);
  }
  static iconChecked(e) {
    var t;
    return (t = Xt[e]) == null ? void 0 : t.iconChecked;
  }
  static iconUnchecked(e) {
    var t;
    return (t = Xt[e]) == null ? void 0 : t.iconUnchecked;
  }
  static iconHit(e) {
    var t, i;
    return ((t = Xt[e]) == null ? void 0 : t.iconHit) ?? ((i = Xt[e]) == null ? void 0 : i.iconChecked);
  }
  static useArmor(e) {
    var t;
    return (t = Xt[e]) == null ? void 0 : t.useArmor;
  }
  static max(e, t) {
    var n;
    const i = (n = Xt[t]) == null ? void 0 : n.monitor(e);
    return ((i == null ? void 0 : i.max) ?? 0) + ((i == null ? void 0 : i.maxBonus) ?? 0);
  }
  static value(e, t) {
    var n;
    const i = (n = Xt[t]) == null ? void 0 : n.monitor(e);
    return (i == null ? void 0 : i.value) ?? 0;
  }
  static resistance(e, t, i = void 0) {
    return j.resistanceDetail(e, t, i).value;
  }
  static resistanceDetail(e, t, i = void 0) {
    var l, c;
    const n = (l = Xt[t]) == null ? void 0 : l.monitor(e), s = j._resolveResistance(n == null ? void 0 : n.resistance, i), r = j._resolveResistance(n == null ? void 0 : n.resistanceBonus, i), o = i === void 0 ? 0 : Number(((c = n == null ? void 0 : n.resistanceBonusByType) == null ? void 0 : c[i]) ?? 0);
    return {
      value: s.value + r.value + o,
      damageType: i,
      source: s.source,
      bonusSource: r.source,
      bonusByType: o,
      usedType: s.source === "type" || r.source === "type" || o !== 0
    };
  }
  static _resolveResistance(e, t = void 0) {
    var s;
    if (typeof e == "number")
      return { value: e ?? 0, source: "legacy" };
    const i = t !== void 0 ? (s = e == null ? void 0 : e.byType) == null ? void 0 : s[t] : void 0;
    return i !== void 0 ? { value: Number(i) || 0, source: "type" } : { value: Number((e == null ? void 0 : e.default) ?? 0) || 0, source: "default" };
  }
  static newValue(e, t) {
    return e + (t ? 0 : 1);
  }
  static async switchMonitorCheck(e, t, i, n, s = void 0, r = void 0) {
    await j.setCounter(e, t, j.newValue(i, n), s, r);
  }
  static async addCounter(e, t, i, n = void 0) {
    if (i != 0) {
      const s = j.getCounterValue(e, t, n) ?? 0;
      await j.setCounter(e, t, s + i, n);
    }
  }
  static async setCounter(e, t, i, n = void 0, s = void 0) {
    switch (t) {
      case A.monitors.anarchy:
        return await j.setAnarchy(e, i);
      case A.monitors.sceneAnarchy:
        return await j.setSceneAnarchy(e, i);
    }
    return await j.setCheckbar(e, t, i);
  }
  static getCounterValue(e, t, i) {
    switch (t) {
      case A.monitors.anarchy:
        return j.getAnarchy(e, t);
    }
    return j.value(e, t);
  }
  static async setCheckbar(e, t, i) {
    if (i == j.getCounterValue(e, t))
      return;
    const n = Xt[t];
    if (n.path) {
      const s = j.max(e, t);
      if (s <= 0)
        return;
      await j._manageOverflow(n, e, t, i, s), i = Math.min(i, s), na.checkOutOfRange(n.resource, i, 0, s), await e.setCheckbarValue(n.path, i);
    }
  }
  static async _manageOverflow(e, t, i, n, s) {
    if (n > s) {
      const r = e.overflow ? e.overflow(t) : void 0, o = e.recomputeOverflow ? e.recomputeOverflow(n - s) : n - s;
      r && o > 0 && (j._notifyOverflow(t, i, o, r), await j.addCounter(t, r, o));
    }
  }
  static _notifyOverflow(e, t, i, n) {
    const s = Pe(k.actor.monitors.overflow, {
      actor: e.name,
      monitor: k.actor.monitors[t],
      overflow: i,
      overflowMonitor: k.actor.monitors[n]
    });
    ui.notifications.warn(s);
  }
  static async _manageFatigueOverflow(e, t, i) {
    await j.addCounter(e, A.monitors.physical, t - i);
  }
  static async setAnarchy(e, t) {
    if (e.hasOwnAnarchy()) {
      if (e.hasGMAnarchy()) {
        await game.system.anarchy.gmAnarchy.setAnarchy(t), e.render();
        return;
      }
      await j._setAnarchyMonitor(e, A.monitors.anarchy, t);
    }
  }
  static async setSceneAnarchy(e, t) {
    await j._setAnarchyMonitor(e, A.monitors.sceneAnarchy, t);
  }
  static async _setAnarchyMonitor(e, t, i) {
    const n = j.value(e, t);
    await j.setCheckbar(e, t, i), game.user.isGM || j.notifyAnarchyChange(e, t, n, i);
  }
  static getAnarchy(e, t) {
    return !game.user.isGM && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) || t == di.anarchy && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) ? 0 : j.value(e, t);
  }
  static notifyAnarchyChange(e, t, i, n) {
    Kt.blindMessageToGM({
      from: game.user.id,
      content: Pe(
        k.gmManager.playerChangedAnarchy,
        {
          user: game.user.name,
          actor: e.name,
          monitor: k.actor.counters[t],
          from: i,
          to: n
        }
      )
    });
  }
}
const { loadTemplates: Wf, renderTemplate: Kf } = foundry.applications.handlebars, ml = {
  highlighted: ["far fa-times-circle", "fas fa-dice-one", "fas fa-dice-two", "fas fa-dice-three", "fas fa-dice-four", "fas fa-dice-five", "fas fa-dice-six"],
  dimmed: ["far fa-times-circle", "far fa-dice-one", "far fa-dice-two", "far fa-dice-three", "far fa-dice-four", "far fa-dice-five", "far fa-dice-six"]
};
class pi {
  static init() {
    Hooks.once("ready", async () => await this.onReady()), Handlebars.registerHelper("dice-cursor-array", (e, t) => pi.array(e ?? 0, t ?? 5)), Handlebars.registerHelper("dice-cursor-fas", (e, t) => pi.fasClass(e, t)), Handlebars.registerHelper("dice-cursor-active", (e, t) => pi.activeClass(e, t)), Handlebars.registerHelper("dice-cursor-color", (e, t) => pi.colorClass(e, t));
  }
  static async onReady() {
    await Wf([
      "systems/mwd/templates/roll/parts/dice-cursor.hbs"
    ]);
  }
  static array(e, t) {
    if (e > t) throw `min>max: ${e} > ${t}`;
    return Array(t - e + 1).fill().map((i, n) => e + n);
  }
  static isActive(e, t) {
    return t <= e && e < 0 || 0 < e && e <= t;
  }
  static activeClass(e, t) {
    return pi.isActive(e, t) ? "active" : "inactive";
  }
  static fasClass(e, t) {
    const i = pi.isActive(e, t) ? ml.highlighted : ml.dimmed;
    return pi.$getFas(i, Math.abs(e));
  }
  static colorClass(e, t) {
    return e == 0 || !t ? e < 0 ? "fixed-dice-malus" : "fixed-dice-bonus" : e < 0 ? "variable-dice-malus" : "variable-dice-bonus";
  }
  static $getFas(e, t) {
    return e[t > 6 ? t % 6 : t];
  }
  static async diceCursor({ value: e, min: t, max: i, editable: n }) {
    return await Kf("systems/mwd/templates/roll/parts/dice-cursor.hbs", {
      value: e,
      min: t,
      max: i,
      editable: n
    });
  }
}
const Mt = {
  /**
   * Hook to declare template data migrations
   */
  DECLARE_MIGRATIONS: "anarchy-declareMigration",
  /**
   * Hook used to declare additional styles available
   */
  REGISTER_STYLES: "anarchy-registerStyles",
  /**
   * Hook allowing to register additional roll parameters
   */
  REGISTER_ROLL_PARAMETERS: "anarchy-registerRollParameters",
  /**
   * Hook allowing to modify some parameters (from Anarchy hacks modules).
   * Setting property ignore=true allows to remove the parameter.
   */
  MODIFY_ROLL_PARAMETER: "anarchy-forbidRollParameter",
  /**
   * Hook allowing to provide alternate skill sets for Anarchy hack modules
   */
  PROVIDE_SKILL_SET: "anarchy-provideSkillSet",
  /**
   * Hook allowing to provide alternate way to apply damages for Anarchy hack modules
   */
  PROVIDE_DAMAGE_MODE: "anarchy-provideDamageMode"
}, fl = "anarchy-";
globalThis.ANARCHY_HOOKS = Mt;
class Ji {
  constructor() {
    this.hooks = [], Hooks.on("getSceneControlButtons", (e) => {
      var i;
      if (!((i = game.user) != null && i.isGM)) return;
      const t = Array.isArray(e) ? e.find((n) => n.name === "notes") : e == null ? void 0 : e.notes;
      if (!t) {
        const n = Array.isArray(e) ? e.map((s) => s.name) : Object.keys(e ?? {});
        console.warn("MWD: token controls not found. Available:", n);
        return;
      }
      t.tools = t.tools ?? {}, !t.tools["mwd-gm-gadget"] && (t.tools["mwd-gm-gadget"] = {
        name: "mwd-gm-gadget",
        title: "Open GM Gadget",
        icon: "fa-solid fa-sliders",
        order: 990,
        button: !0,
        visible: !0,
        onChange: () => {
          var n, s;
          return (s = (n = game.mwd) == null ? void 0 : n.gmGadget) == null ? void 0 : s.call(n);
        }
      });
    });
  }
  static instance() {
    return game.system.anarchy.hooks;
  }
  static register(e) {
    Ji.instance()._register(e);
  }
  _register(e) {
    if (console.log(Me + "HooksManager.register", e), !e.startsWith(fl))
      throw `For safety Anarchy Hooks names must be prefixed by '${fl}'`;
    this.hooks.push(e);
  }
}
const pl = [
  A.itemType.assetModule,
  A.itemType.mechWeapon,
  A.itemType.personalWeapon,
  "weapon"
];
class fe {
  constructor() {
    this.modifiers = {
      groups: ve.mapObjetToKeyValue(k.modifier.group, "key", "label"),
      roll: fe._buildGroupOptions("roll"),
      attribute: fe._buildGroupOptions("attribute"),
      monitor: fe._buildGroupOptions("monitor"),
      other: fe._buildGroupOptions("other")
    }, Hooks.once("ready", () => this.onReady());
  }
  static _buildGroupOptions(e) {
    switch (e) {
      case "attribute":
        return {
          label: k.modifier.group[e],
          effects: ve.hbsAttributes.map((t) => ({ key: t.value, label: t.labelkey })),
          categories: []
        };
    }
    return {
      label: k.modifier.group[e],
      effects: ve.mapObjetToKeyValue(k.modifier[e].effect, "key", "label"),
      categories: ve.mapObjetToKeyValue(k.modifier[e].category, "key", "label")
    };
  }
  async onReady() {
    Handlebars.registerHelper("modifierHasSubCategory", (e, t, i) => this.hasSubCategory(e, t, i)), Handlebars.registerHelper("modifierSelectOption", (e, t) => this.getSelectOptions(e, t));
  }
  hasSubCategory(e, t, i) {
    switch (e) {
      case "roll":
        return !0;
      case "monitor":
        return i === "resistanceByType";
    }
    return !1;
  }
  getSelectOptions(e, t) {
    var i, n;
    switch (e) {
      case "group":
        return this.modifiers.groups;
      case "effect":
        return (i = this.modifiers[t.hash.group]) == null ? void 0 : i.effects;
      case "category":
        return (n = this.modifiers[t.hash.group]) == null ? void 0 : n.categories;
      case "subCategory":
        switch (t.hash.group) {
          case "roll":
            return this.getSelectRollSubCategories(t.hash.category);
          case "monitor": {
            switch (t.hash.category) {
              case "resistanceByType":
                return ve.getDamageTypes().map((s) => ({ key: s.value, label: s.labelkey }));
            }
            return [];
          }
        }
        return [];
    }
    return [];
  }
  getSelectRollSubCategories(e) {
    switch (e) {
      case "attribute":
        return ve.getAttributes().map((i) => ({ key: i.value, label: i.labelkey }));
      case "skill":
        return game.system.anarchy.skills.getSkills().map((i) => ({ key: i.code, label: i.labelkey }));
      case "attributeAction":
        const t = xe.all().map((i) => ({ key: i.code, label: i.labelkey }));
        return oe.distinct(t.map((i) => i.key)).map((i) => t.find((n) => n.key == i));
    }
    return [];
  }
  getEnums() {
    return { modifiers: this.modifiers };
  }
  static buildRollModifiersFilter(e, t) {
    return (i) => {
      var n;
      if (i.group == "roll" && i.effect == t)
        switch (i.category) {
          case "attribute":
            return [e.attribute1, e.attribute2].includes(i.subCategory);
          case "skill":
            return i.subCategory == ((n = e.skill) == null ? void 0 : n.system.code);
          case "attributeAction":
            return i.subCategory == e.attributeAction || i.subCategory == xe.getDefenseAttributeAction(e.defenseAction);
        }
      return !1;
    };
  }
  static computeRollModifiers(e, t, i) {
    const n = fe.buildRollModifiersFilter(t, i), s = (c) => c.group == "roll" && c.effect == i && n(c), r = fe._activeItems(e).map((c) => fe.itemModifiers(c, s)).reduce((c, u) => c.concat(u), []).sort(oe.descending((c) => c.modifier.value)), o = fe.$sumAssetModuleModifiers(r.filter((c) => pl.includes(c.item.type)).map((c) => c.modifier.value)), l = oe.sumValues(r.filter((c) => !pl.includes(c.item.type)).map((c) => c.modifier.value));
    return {
      value: o + l,
      sources: r
    };
  }
  static $sumAssetModuleModifiers(e) {
    const t = e.find((s) => s > 3) ?? 0, i = oe.sumValues(e.filter((s) => s < 0)), n = Math.min(3, oe.sumValues(e.filter((s) => s > 0 && s <= 3)));
    return i + Math.max(n, t);
  }
  static computeModifiers(e, t, i = void 0, n = void 0) {
    const s = fe._createFilter(t, i, n), r = fe._activeItems(e).map((l) => fe.itemModifiers(l, s)).reduce((l, c) => l.concat(c), []);
    return {
      value: oe.sumValues(r, (l) => l.modifier.value),
      sources: r
    };
  }
  static sumMonitorModifiers(e, t, i, n = void 0) {
    return fe.sumModifiers(fe._activeItems(e), "monitor", t, i, n);
  }
  static sumModifiers(e, t, i, n, s = void 0) {
    const r = fe._createFilter(t, i, n, s), o = fe._activeItems(e).map((l) => fe.itemModifiers(l, r)).reduce((l, c) => l.concat(c), []);
    return oe.sumValues(o, (l) => l.modifier.value);
  }
  static _createFilter(e, t, i, n = void 0) {
    return (s) => s.group == e && s.effect == (t ?? s.effect) && s.category == (i ?? s.category) && (n == null ? !0 : s.subCategory == n);
  }
  static countModifiers(e, t, i = void 0, n = void 0) {
    const s = fe._createFilter(t, i, n);
    return fe._activeItems(e).map((o) => fe.itemModifiers(o, s)).reduce((o, l) => o.concat(l), []).count;
  }
  static itemModifiers(e, t) {
    return fe._listItemModifiers(e, t).map((i) => fe._itemModifier(e, i));
  }
  static _listItemModifiers(e, t = (i) => !0) {
    return (e.system.modifiers ?? []).filter(t);
  }
  static _itemModifier(e, t) {
    return {
      item: e,
      modifier: t
    };
  }
  static _activeItems(e) {
    return e;
  }
}
const { loadTemplates: qs, renderTemplate: gw } = foundry.applications.handlebars, we = {
  pool: "pool",
  reroll: "reroll",
  rerollMax: "rerollMax",
  rerollForced: "rerollForced",
  successReroll: "successReroll",
  glitch: "glitch",
  edge: "edge",
  risk: "risk",
  opponentPool: "opponentPool",
  opponentReroll: "opponentReroll"
}, hl = 4, Gf = [
  // attribute1
  {
    code: "attribute1",
    options: {
      order: 1,
      category: we.pool,
      hbsTemplateRoll: `${X}/roll/parts/select-attribute.hbs`
    },
    condition: (a) => Object.values(pt.rollType).includes(a.mode),
    isUsed: (a) => !0,
    factory: (a) => {
      var t;
      const e = a.attribute1 ?? ((t = a.skill) == null ? void 0 : t.system.attribute);
      return {
        labelkey: e ? k.attributes[e] : k.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: a.skill },
        selected: e,
        choices: ve.getAttributes((i) => a.attributes.includes(i))
      };
    }
  },
  // attribute2
  {
    code: "attribute2",
    options: {
      order: 1,
      category: we.pool,
      hbsTemplateRoll: `${X}/roll/parts/select-attribute.hbs`,
      hbsTemplateChat: `${X}/chat/parts/pool-attribute2.hbs`
    },
    condition: (a) => [pt.rollType.attribute, pt.rollType.attributeAction, pt.rollType.defense].includes(a.mode),
    isUsed: (a) => a.used,
    onChecked: (a, e) => a.used = !!e,
    factory: (a) => {
      const e = a.attribute2;
      return {
        labelkey: e ? k.attributes[e] : k.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: pt.rollType.attribute == a.mode },
        selected: e,
        choices: ve.getAttributes((t) => a.attributes.includes(t))
      };
    }
  },
  // skill
  {
    code: "skill",
    options: {
      flags: {},
      order: 3,
      category: we.pool,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`
    },
    condition: (a) => ["skill", "weapon"].includes(a.mode),
    factory: (a) => {
      var t, i, n, s;
      const e = (t = a.actor) != null && t.getSkillRating ? a.actor.getSkillRating(a.skill) : ((n = (i = a.skill) == null ? void 0 : i.system) == null ? void 0 : n.value) ?? 0;
      return {
        label: (s = a.skill) == null ? void 0 : s.name,
        value: e
      };
    }
  },
  // specialization
  {
    code: "specialization",
    options: {
      flags: { optional: !0 },
      value: 2,
      order: 4,
      category: we.pool,
      hbsTemplateRoll: `${X}/roll/parts/check-option.hbs`
    },
    isUsed: (a) => a.used,
    condition: (a) => !!a.specialization,
    onChecked: (a, e) => {
      a.used = e, a.value = e ? 2 : 0;
    },
    factory: (a) => ({
      label: a.specialization,
      used: a.specialization != null,
      value: 2
    })
  },
  // credibility usage
  {
    code: "credibility",
    options: {
      flags: { editDice: !0, editable: !0 },
      order: 5,
      category: we.pool,
      value: 0,
      labelkey: k.common.roll.modifiers.social.credibility,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`
    },
    condition: (a) => {
      var e;
      return ((e = a.skill) == null ? void 0 : e.system.isSocial) && a.actor.getCredibilityValue() > 0;
    },
    factory: (a) => ({
      min: 0,
      max: a.actor.getCredibilityValue()
    })
  },
  // modifiers bonus
  {
    code: "poolModifiers",
    options: {
      flags: { editDice: !0, editable: !0 },
      labelkey: k.common.roll.modifiers.poolModifiers,
      order: 5,
      category: we.pool,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 4
    },
    factory: (a) => Bi.computeRollModifiers(we.pool, a)
  },
  // wounds
  {
    code: "wounds",
    options: {
      flags: { optional: !0 },
      order: 10,
      category: we.pool,
      labelkey: k.common.roll.modifiers.wounds,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`
    },
    isUsed: (a) => a.used,
    condition: (a) => a.actor.getWounds(),
    onChecked: (a, e) => {
      a.used = e, a.value = e ? -a.wounds : 0;
    },
    factory: (a) => {
      const e = a.actor.getWounds();
      return {
        wounds: e,
        min: -e,
        max: 0,
        value: -e,
        used: !0
      };
    }
  },
  // other modifiers
  {
    code: "other",
    options: {
      flags: { editDice: !0, editable: !0 },
      order: 25,
      category: we.pool,
      value: 0,
      labelkey: k.common.roll.modifiers.other,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 5
    }
  },
  // glitch
  {
    code: "glitch",
    options: {
      flags: { editDice: !0, editable: !0 },
      order: 40,
      category: we.glitch,
      value: 0,
      labelkey: k.common.roll.modifiers.glitch,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${X}/chat/parts/glitch.hbs`,
      min: 0,
      max: 5
    },
    isUsed: (a) => a.value > 0,
    factory: (a) => {
      const e = a.actor.getWounds(), t = Bi.computeRollModifiers(we.glitch, a);
      return {
        value: (e == 0 ? 0 : 1) + (a.glitch ?? 0) + t.value
      };
    }
  },
  // social rumor
  {
    code: "rumor",
    options: {
      flags: { editDice: !0, editable: !0 },
      order: 50,
      category: we.glitch,
      value: 0,
      labelkey: k.common.roll.modifiers.social.rumor,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${X}/chat/parts/glitch.hbs`,
      min: 0,
      max: 1
    },
    condition: (a) => {
      var e;
      return ((e = a.skill) == null ? void 0 : e.system.isSocial) && a.actor.getRumorValue() > 0;
    },
    factory: (a) => ({
      max: a.actor.getRumorValue()
    })
  },
  // rerolls
  {
    code: "reroll",
    options: {
      flags: { editDice: !0, editable: !0 },
      order: 30,
      category: we.reroll,
      labelkey: k.common.roll.modifiers.reroll,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: hl
    },
    factory: (a) => {
      const e = Bi.computeRollModifiers(we.reroll, a), t = Bi.computeRollModifiers(we.rerollMax, a);
      return foundry.utils.mergeObject(e, {
        max: hl + Math.max(0, t.value ?? 0)
      });
    }
  },
  // reduction from opponent
  {
    code: "reduced",
    options: {
      order: 29,
      category: we.pool,
      labelkey: k.common.roll.modifiers.reduced,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 0
    },
    condition: (a) => {
      var e;
      return (((e = a.attackRoll) == null ? void 0 : e.param.opponentPool) ?? 0) != 0;
    },
    factory: (a) => {
      var t;
      const e = -(((t = a.attackRoll) == null ? void 0 : t.param.opponentPool) ?? 0);
      return {
        flags: { editDice: !0, used: !0 },
        value: e
      };
    }
  },
  // forced success rerolls
  {
    code: "rerollForced",
    options: {
      order: 31,
      category: we.rerollForced,
      labelkey: k.common.roll.modifiers.rerollForced,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 0
    },
    factory: (a) => {
      var t;
      const e = Bi.computeRollModifiers(we.successReroll, a);
      return e.value = -e.value - (((t = a.attackRoll) == null ? void 0 : t.param.opponentReroll) ?? 0), foundry.utils.mergeObject(e, {
        flags: { editDice: !0, used: !0, editable: !0 }
      });
    }
  },
  // anarchy dispositions
  {
    code: "anarchyDisposition",
    options: {
      flags: { optional: !0, isAnarchy: !0, forceDisplay: !0 },
      order: 70,
      category: we.pool,
      value: 0,
      min: 0,
      max: 3,
      labelkey: k.common.roll.modifiers.anarchyDisposition,
      hbsTemplateRoll: `${X}/roll/parts/check-option.hbs`
    },
    isUsed: (a) => a.used,
    condition: (a) => a.actor.getAnarchyValue() > 0,
    onChecked: (a, e) => {
      a.used = e, a.value = e ? 3 : 0;
    }
  },
  // anarchy take risks
  {
    code: "anarchyRisk",
    options: {
      flags: { optional: !0, isAnarchy: !0, forceDisplay: !0 },
      order: 70,
      category: we.risk,
      value: 0,
      labelkey: k.common.roll.modifiers.anarchyRisk,
      hbsTemplateRoll: `${X}/roll/parts/check-option.hbs`,
      hbsTemplateChat: `${X}/chat/parts/anarchy-risk.hbs`
    },
    isUsed: (a) => a.used,
    condition: (a) => a.actor.getAnarchyValue() > 0,
    onChecked: (a, e) => {
      a.used = e, a.value = e ? 1 : 0;
    }
  },
  // edge
  {
    code: "edge",
    options: {
      flags: { optional: !0, forceDisplay: !0 },
      value: 0,
      order: 70,
      category: we.edge,
      labelkey: k.common.roll.modifiers.edge,
      hbsTemplateRoll: `${X}/roll/parts/check-option.hbs`
    },
    isUsed: (a) => a.used,
    condition: (a) => a.options.canUseEdge && a.actor.getRemainingEdge(),
    onChecked: (a, e) => {
      a.used = e, a.value = e ? 1 : 0;
    },
    factory: (a) => {
      var n;
      const t = [
        A.counters.edgePools.grit,
        A.counters.edgePools.chaos,
        A.counters.edgePools.insight,
        A.counters.edgePools.rumor,
        A.counters.edgePools.legend,
        A.counters.edgePools.credibility
      ].map((s) => {
        const r = a.actor.getEdgePoolValue(s);
        return {
          code: s,
          label: k.actor.counters.edgePools[s] ?? s,
          value: r
        };
      }), i = ((n = t.find((s) => s.value > 0)) == null ? void 0 : n.code) ?? A.counters.edgePools.grit;
      return {
        edgePools: t,
        pool: i
      };
    }
  },
  // reduce opponent pool
  {
    code: "opponentPool",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: we.opponentPool,
      labelkey: k.common.roll.modifiers.opponentPool,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => Bi.computeRollModifiers(we.opponentPool, a),
    condition: (a) => !a.attributeAction
  },
  // force opponent rerolls
  {
    code: "opponentReroll",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: we.opponentReroll,
      value: 0,
      labelkey: k.common.roll.modifiers.opponentReroll,
      hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => Bi.computeRollModifiers(we.opponentReroll, a),
    condition: (a) => !a.attributeAction
  }
];
class Bi {
  constructor() {
    this.registeredParameters = {}, Ji.register(Mt.REGISTER_ROLL_PARAMETERS), Ji.register(Mt.MODIFY_ROLL_PARAMETER), Hooks.on(Mt.MODIFY_ROLL_PARAMETER, (e) => this._validate(e)), Hooks.once(Mt.REGISTER_ROLL_PARAMETERS, (e) => Gf.forEach(
      (t) => e(t)
    )), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(Mt.REGISTER_ROLL_PARAMETERS, async (t) => {
      Hooks.callAll(Mt.MODIFY_ROLL_PARAMETER, t), t.ignore || await this._register(t);
    });
    const e = oe.distinct([].concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateRoll)).concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateChat)).filter((t) => typeof t == "string" && t.length > 0));
    await qs(oe.distinct(e)), await qs([`${X}/roll/parts/parameter-label.hbs`]);
  }
  _validate(e) {
    e.code || (console.error(`${Me} RollParameter does not have a code`, e), e.ignore = !0);
  }
  async _register(e) {
    if (this.registeredParameters[e.code]) {
      console.error(`${Me} RollParameter ${e.code} is already registered`, e);
      return;
    }
    e.onChecked || (e.onChecked = (t, i) => t.used = i), e.onValue = (t, i) => t.value = i, this.registeredParameters[e.code] = e;
  }
  async _optionalLoadTemplate(e) {
    e && await qs([e]);
  }
  build(e) {
    return Object.values(this.registeredParameters).filter((t) => !t.condition || t.condition(e)).map((t) => this._computeParameter(t, e));
  }
  compute(e) {
    const t = e.filter((s) => this.isParameterUsed(s)), i = oe.classify(t, (s) => s.category), n = {};
    return Object.values(i).forEach((s) => n[s[0].category] = oe.sumValues(s, (r) => r.value ?? (r.optional ? 1 : 0))), n;
  }
  isParameterUsed(e) {
    const t = this.findParameter(e.code);
    return (t == null ? void 0 : t.isUsed) != null ? t.isUsed(e) : e.value != null ? e.value != 0 : (console.error(`registered parameter ${t.code} does not have isUsed method`, t), !1);
  }
  findParameter(e) {
    return this.registeredParameters[e];
  }
  _computeParameter(e, t) {
    const i = {
      code: e.code,
      onChecked: e.onChecked,
      onValue: e.onValue,
      isUsed: e.isUsed
    };
    return foundry.utils.mergeObject(i, e.options), e.factory && foundry.utils.mergeObject(i, e.factory(t, e.options)), foundry.utils.mergeObject(i, {
      used: i.used || i.value,
      min: i.min ?? 0,
      max: i.max ?? i.value ?? 0
    }), i;
  }
  static computeRollModifiers(e, t) {
    const i = (s) => {
      var r;
      return !((r = s.isWeapon) != null && r.call(s)) || t.weapon && s.id == t.weapon.id;
    }, n = t.actor.items.filter(i);
    return fe.computeRollModifiers(n, t, e);
  }
}
const { ApplicationV2: qf, HandlebarsApplicationMixin: Vf } = foundry.applications.api, { loadTemplates: Yf, renderTemplate: Qf } = foundry.applications.handlebars;
var ds, yu;
const Xe = class Xe extends Vf(qf) {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      id: "roll-dialog",
      classes: ["anarchy-dialog"],
      position: { width: 500, height: "auto" },
      window: {
        resizable: !0,
        minimizable: !0
      }
    }, { inplace: !1 });
  }
  static init() {
    Hooks.once("ready", async () => await this.onReady());
  }
  static async onReady() {
    await Yf([
      "systems/mwd/templates/roll/roll-parameters-category.hbs",
      "systems/mwd/templates/roll/parts/generic.hbs",
      "systems/mwd/templates/roll/parts/image-attribute.hbs",
      "systems/mwd/templates/roll/parts/image-attributeAction.hbs",
      "systems/mwd/templates/roll/parts/image-defense.hbs",
      "systems/mwd/templates/roll/parts/image-skill.hbs",
      "systems/mwd/templates/roll/parts/image-weapon.hbs"
    ]);
  }
  static prepareActorRoll(e, t = void 0) {
    var i;
    return {
      actor: e,
      tokenId: (i = e.token) == null ? void 0 : i.id,
      attributes: e.getUsableAttributes(t),
      options: {
        canUseEdge: e.canUseEdge()
      }
    };
  }
  static async rollAttribute(e, t) {
    const i = foundry.utils.mergeObject(Xe.prepareActorRoll(e), {
      mode: pt.rollType.attribute,
      attribute1: t
    });
    await Xe.create(i);
  }
  static async rollAttributeAction(e, t) {
    const i = foundry.utils.mergeObject(Xe.prepareActorRoll(e), {
      mode: pt.rollType.attributeAction,
      attributeAction: t.code,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e)
    });
    await Xe.create(i);
  }
  static async rollSkill(e, t, i) {
    const n = foundry.utils.mergeObject(Xe.prepareActorRoll(e), {
      mode: pt.rollType.skill,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? A.actorAttributes.reflexes,
      specialization: i
    });
    await Xe.create(n);
  }
  static async rollWeapon(e, t, i, n) {
    const s = foundry.utils.mergeObject(Xe.prepareActorRoll(e), {
      mode: pt.rollType.weapon,
      weapon: i,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? e.getPhysicalAgility(),
      specialization: void 0,
      targeting: n
    });
    await Xe.create(s);
  }
  static async rollDefense(e, t, i) {
    const n = foundry.utils.mergeObject(Xe.prepareActorRoll(e), {
      mode: pt.rollType.defense,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e),
      defenseAction: t.code,
      attackRoll: i.attackRoll,
      tokenId: i.defenderTokenId,
      choiceChatMessageId: i.choiceChatMessageId
    });
    await Xe.create(n);
  }
  static async itemAttributeRoll(e, t) {
    const i = foundry.utils.mergeObject(Xe.prepareActorRoll(e.actor), {
      mode: pt.rollType.attribute,
      item: e,
      attribute1: t,
      attributes: e.actor.getUsableAttributes(e)
    });
    await Xe.create(i);
  }
  static async create(e) {
    var r;
    const t = C(r = Xe, ds, yu).call(r, e), i = await Qf(`${X}/roll/roll-dialog-title.hbs`, t), n = {
      id: `roll-dialog-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Xe.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new Xe({ roll: t }, n).render({ force: !0 });
  }
  constructor(e = {}, t = {}) {
    super(e, t), this.roll = e.roll;
  }
  async _prepareContext() {
    return this.roll;
  }
  async activateListeners(e) {
    const t = e instanceof HTMLElement ? e : e[0];
    await super.activateListeners(t), this.html = t instanceof HTMLElement ? $(t) : e, this.html.find(".select-attribute-parameter").change(async (i) => {
      const n = this._getRollParameter(i), s = this._getEventItem(i, this.roll.actor), r = i.currentTarget.value, o = this.roll.actor.getAttributeValue(r, s);
      this.roll[n.code] = r, await this._setParameterSelectedOption(n, r, o);
    }), this.html.find(".check-optional").click(async (i) => {
      const n = this._getRollParameter(i);
      n.onChecked(n, i.currentTarget.checked), n.category == we.pool && await this._updateParameterValue(n, n.value), n.code == "edge" && this.html.find(`.parameter[data-parameter-code='${n.code}'] .edge-pool-select`).prop("disabled", !n.used);
    }), this.activateDiceParameterClick(), this.html.find("input.parameter-value:not(:disabled)").on("input", async (i) => {
      const n = this._getRollParameter(i), s = Number.parseInt(i.currentTarget.value) ?? 0;
      await this._updateParameterValue(n, s);
    }), this.html.find(".select-option-parameter").change(async (i) => {
      const n = this._getRollParameter(i), s = i.currentTarget.value, r = Number.parseInt(s);
      await this._setParameterSelectedOption(n, s, r);
    }), this.html.find(".edge-pool-select").change(async (i) => {
      const n = this._getRollParameter(i);
      n.pool = i.currentTarget.value;
    }), this.html.find('[data-action="roll"]').on("click", async (i) => {
      i.preventDefault(), await game.system.anarchy.rollManager.roll(this.roll), await this.close();
    }), this.html.find('[data-action="cancel"]').on("click", async (i) => {
      i.preventDefault(), await this.close();
    });
  }
  activateDiceParameterClick() {
    this.html.find(".input-cursor-parameter a").click(async (e) => {
      var i;
      const t = this._getRollParameter(e);
      if ((i = t.flags) != null && i.editDice) {
        const n = Number.parseInt(this.html.find(e.currentTarget).attr("data-dice")) ?? 0, s = t.value != n || n == 0 ? n : n > 0 ? n - 1 : n + 1;
        await this._updateParameterValue(t, s);
      }
    });
  }
  async _setParameterSelectedOption(e, t, i) {
    e.onChecked(e, t), e.max = i, await this._updateParameterValue(e, i);
  }
  async _updateParameterValue(e, t) {
    e.onValue(e, t), this.html.find(`.parameter[data-parameter-code='${e.code}'] .parameter-value`).text(t);
    const i = await this.renderDiceCursor(e);
    this.html.find(`.parameter[data-parameter-code='${e.code}'] .input-cursor-parameter`).empty().append(i), this.activateDiceParameterClick(), this.html.find(`.parameter[data-parameter-code='${e.code}'] input.parameter-value`).val(e.value);
  }
  async renderDiceCursor(e) {
    var t;
    return await pi.diceCursor({
      value: e.value,
      min: e.min,
      max: e.max,
      editable: (t = e.flags) == null ? void 0 : t.editDice
    });
  }
  _getSelectedOption(e) {
    return this.html.find(`.parameter[data-parameter-code='${e.code}'] select.select-option-parameter option:selected`).text();
  }
  _getEventItem(e, t) {
    const i = this.html.find(e.currentTarget).closest(".parameter").attr("data-item-id");
    return i ? t.items.get(i) : void 0;
  }
  _getRollParameter(e) {
    const t = this.html.find(e.currentTarget).closest(".parameter").attr("data-parameter-code");
    return this.roll.parameters.find((i) => i.code == t);
  }
};
ds = new WeakSet(), yu = function(e) {
  const t = game.system.anarchy.rollParameters.build(e).sort(oe.ascending((i) => i.order ?? 200));
  return foundry.utils.mergeObject(e, {
    ENUMS: ve.getEnums((i) => e.attributes.includes(i)),
    ANARCHY: k,
    parameters: t
  });
}, Ce(Xe, ds), D(Xe, "PARTS", {
  body: {
    template: `${X}/roll/roll-dialog.hbs`
  }
});
let ai = Xe;
const Co = 2, Er = "skillSpecializationCatalog", Jf = [
  { key: "running", label: "Running" },
  { key: "jumping", label: "Jumping" },
  { key: "swimming", label: "Swimming" },
  { key: "climbing", label: "Climbing" },
  { key: "acrobatics", label: "Acrobatics" }
], bu = /* @__PURE__ */ new Set(), li = [
  // Strength
  { code: "athletics", label: "Athletics", attribute: "strength", icon: `${de}/athletics.svg`, domains: ["physical"], specializations: Jf },
  { code: "heavyWeapons", label: "Heavy Weapons", attribute: "strength", icon: `${de}/heavy-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  // Reflexes
  { code: "escapeArtist", label: "Escape Artist", attribute: "reflexes", icon: `${de}/escape-artist.svg`, domains: ["physical"] },
  { code: "gunnery", label: "Gunnery", attribute: "reflexes", icon: `${de}/vehicle-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "meleeCombat", label: "Melee Combat", attribute: "reflexes", icon: `${de}/close-combat.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "piloting", label: "Piloting", attribute: "reflexes", icon: `${de}/piloting-ground-steering-wheel.svg`, domains: ["physical"] },
  { code: "projectileWeapons", label: "Projectile Weapons", attribute: "reflexes", icon: `${de}/projectile-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "firearms", label: "Firearms", attribute: "reflexes", icon: `${de}/firearms.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "stealth", label: "Stealth", attribute: "reflexes", icon: `${de}/stealth.svg`, domains: ["physical"] },
  { code: "zeroGOps", label: "Zero-G Operations", attribute: "reflexes", icon: `${de}/fly.svg`, domains: ["physical"] },
  // Intelligence
  { code: "art", label: "Art", attribute: "intelligence", icon: `${de}/art.svg`, domains: ["mental"] },
  { code: "artillery", label: "Artillery", attribute: "intelligence", icon: `${de}/artillery.svg`, domains: ["mental"] },
  { code: "systemOps", label: "System Operations", attribute: "intelligence", icon: `${de}/electronics.svg`, domains: ["mental"] },
  { code: "computers", label: "Computers", attribute: "intelligence", icon: `${de}/hacking.svg`, domains: ["mental"] },
  { code: "demolitions", label: "Demolitions", attribute: "intelligence", icon: `${de}/demolition.svg`, domains: ["mental"] },
  { code: "medTech", label: "Medtech", attribute: "intelligence", icon: `${de}/biotech.svg`, domains: ["mental"] },
  { code: "science", label: "Science", attribute: "intelligence", icon: `${de}/skills.svg`, domains: ["mental"] },
  { code: "perception", label: "Perception", attribute: "intelligence", icon: `${de}/skills.svg`, domains: ["mental"] },
  { code: "tactics", label: "Tactics", attribute: "intelligence", icon: `${de}/skills.svg`, domains: ["mental"] },
  { code: "technician", label: "Technician", attribute: "intelligence", icon: `${de}/engineering.svg`, domains: ["mental"] },
  { code: "tracking", label: "Tracking", attribute: "intelligence", icon: `${de}/tracking.svg`, domains: ["physical", "mental"] },
  { code: "navigation", label: "Navigation", attribute: "intelligence", icon: `${de}/piloting-other.svg`, domains: ["mental"] },
  // Guts
  { code: "administration", label: "Administration", attribute: "willpower", icon: `${de}/knowledge.svg`, domains: ["social", "mental"] },
  { code: "animalHandling", label: "Animal Handling", attribute: "willpower", icon: `${de}/animals.svg`, domains: ["physical", "mental"] },
  { code: "survival", label: "Survival", attribute: "willpower", icon: `${de}/survival.svg`, domains: ["physical", "mental"] },
  // Charisma
  { code: "acting", label: "Acting", attribute: "charisma", icon: `${de}/con-art.svg`, domains: ["social"] },
  { code: "disguise", label: "Disguise", attribute: "charisma", icon: `${de}/disguise.svg`, domains: ["social", "mental"] },
  { code: "leadership", label: "Leadership", attribute: "charisma", icon: `${de}/psychology.svg`, domains: ["social"] },
  { code: "negotiation", label: "Negotiation", attribute: "charisma", icon: `${de}/negotiation.svg`, domains: ["social"] },
  { code: "etiquette", label: "Etiquette", attribute: "charisma", icon: `${de}/etiquette.svg`, domains: ["social"] },
  { code: "streetwise", label: "Streetwise", attribute: "charisma", icon: `${de}/etiquette2.svg`, domains: ["social"] },
  { code: "intimidation", label: "Intimidation", attribute: "charisma", icon: `${de}/intimidation.svg`, domains: ["social", "mental"] }
].map(Xf);
for (const a of li)
  bu.add(a.code);
function Xf(a) {
  return {
    ...a,
    label: a.label ?? a.code,
    icon: a.icon ?? `${fn}/icons/skills/skills.svg`,
    specializations: Po(a.specializations)
  };
}
function Eo(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function Po(a = []) {
  const e = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((t) => {
    const i = Eo((t == null ? void 0 : t.key) ?? (t == null ? void 0 : t.label) ?? t);
    return !i || e.has(i) ? null : (e.add(i), {
      key: i,
      label: String((t == null ? void 0 : t.label) ?? (t == null ? void 0 : t.key) ?? t ?? i).trim() || i
    });
  }).filter(Boolean);
}
function Zf(a = []) {
  const e = new Error(a[0] ?? "Invalid skill specialization data.");
  return e.validationErrors = a, e;
}
function ep() {
  const a = {};
  for (const e of li) {
    const t = (Array.isArray(e.specializations) ? e.specializations : []).map((i) => String((i == null ? void 0 : i.label) ?? "").trim()).filter(Boolean);
    t.length && (a[e.code] = t);
  }
  return a;
}
const tp = Object.freeze(ep());
function ip(a, e = [], { strict: t = !1, errors: i = [] } = {}) {
  var s, r;
  if (!Array.isArray(e)) {
    if (t) {
      const o = ((s = Pr(a)) == null ? void 0 : s.label) ?? a;
      i.push(`${o}: expected an array of specialization labels.`);
    }
    return [];
  }
  const n = [];
  for (const o of e) {
    const l = String(o ?? "").trim();
    if (!l) {
      if (t) {
        const c = ((r = Pr(a)) == null ? void 0 : r.label) ?? a;
        i.push(`${c}: specialization labels cannot be blank.`);
      }
      continue;
    }
    n.push(l);
  }
  return Po(n).map((o) => o.label);
}
function Pr(a) {
  return li.find((e) => e.code === a);
}
function Su(a, { strict: e = !1 } = {}) {
  const t = a && typeof a == "object" && !Array.isArray(a) ? a : {}, i = [], n = {};
  for (const [s, r] of Object.entries(t)) {
    if (!bu.has(s)) {
      e && i.push(`Unknown skill code "${s}".`);
      continue;
    }
    const o = ip(s, r, { strict: e, errors: i });
    o.length && (n[s] = o);
  }
  if (e && i.length) throw Zf(i);
  return Object.fromEntries(
    li.map((s) => [s.code, n[s.code]]).filter(([, s]) => Array.isArray(s) && s.length)
  );
}
function ap() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${Er}`))
      return game.settings.get(T, Er);
  } catch {
  }
  return wu();
}
function Au() {
  const a = Su(ap(), { strict: !1 });
  return Object.fromEntries(
    Object.entries(a).map(([e, t]) => [
      e,
      Po(t)
    ])
  );
}
function Tu(a = [], { allowedKeys: e = null } = {}) {
  const t = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((i) => Eo(i)).filter((i) => !i || t.has(i) || e && !e.has(i) ? !1 : (t.add(i), !0));
}
function zt(a) {
  const e = Pr(a);
  if (e)
    return {
      ...e,
      specializations: Xi(e.code)
    };
}
function Zn() {
  const a = Au();
  return [...li].map((e) => ({
    ...e,
    specializations: [...a[e.code] ?? []]
  })).sort((e, t) => e.label.localeCompare(t.label));
}
function Xi(a) {
  return [...Au()[a] ?? []];
}
function Ro(a, e) {
  const t = Eo(e);
  if (t)
    return Xi(a).find((i) => i.key === t);
}
function np(a, e) {
  var t;
  return ((t = Ro(a, e)) == null ? void 0 : t.label) ?? "";
}
function wu() {
  return foundry.utils.deepClone(tp);
}
function As(a, { strict: e = !1 } = {}) {
  return Su(a, { strict: e });
}
function es(a = []) {
  return Tu(a);
}
function sp(a, e = []) {
  const t = new Set(Xi(a).map((n) => n.key)), i = new Set(Tu(e, { allowedKeys: t }));
  return Xi(a).filter((n) => i.has(n.key)).map((n) => n.key);
}
function Rr(a, e) {
  var t, i;
  return es(
    ((i = (t = a == null ? void 0 : a.skills) == null ? void 0 : t[e]) == null ? void 0 : i.specializations) ?? []
  );
}
function Ts(a, e) {
  return sp(
    e,
    Rr(a, e)
  );
}
function ku(a, e) {
  const t = new Set(Ts(a, e));
  return Xi(e).filter((i) => t.has(i.key));
}
function rp(a) {
  const e = Math.ceil(a.length / 2);
  return { left: a.slice(0, e), right: a.slice(e) };
}
function op(a) {
  var e, t;
  a.skills ?? (a.skills = {});
  for (const i of li) {
    const n = (e = a.skills)[t = i.code] ?? (e[t] = {});
    n.rating == null && (n.rating = 0), n.bonus == null && (n.bonus = 0), n.specializations = es(n.specializations);
  }
}
function vu(a, { bonusBySkill: e = null } = {}) {
  const t = Zn(), { left: i, right: n } = rp(t), s = (r) => {
    var y, b, S, w, M, P;
    const o = r.code, l = r.attribute, c = Number(((b = (y = a == null ? void 0 : a.skills) == null ? void 0 : y[o]) == null ? void 0 : b.rating) ?? 0), u = Number(((w = (S = a == null ? void 0 : a.attributes) == null ? void 0 : S[l]) == null ? void 0 : w.value) ?? 0), d = Number(((P = (M = a == null ? void 0 : a.skills) == null ? void 0 : M[o]) == null ? void 0 : P.bonus) ?? 0), m = Number((e == null ? void 0 : e[o]) ?? 0), f = d + m, p = ku(a, o), h = Xi(o).filter((E) => !p.some((z) => z.key === E.key)), g = u + c + f;
    return {
      code: o,
      label: r.label,
      icon: r.icon,
      attribute: l,
      attributeLabel: ve != null && ve.localizeAttribute ? ve.localizeAttribute(l) : l,
      rating: c,
      base: u,
      bonus: f,
      total: g,
      rollPayload: JSON.stringify({ intent: "skill", key: o }),
      canAddSpecialization: h.length > 0,
      specializations: p.map((E) => ({
        ...E,
        bonus: Co,
        rollPayload: JSON.stringify({
          intent: "skill",
          key: o,
          specializationKey: E.key,
          specializationLabel: E.label
        })
      })),
      // Input wiring paths (so templates don’t concat strings themselves)
      pathRating: `system.skills.${o}.rating`,
      pathBonus: `system.skills.${o}.bonus`
    };
  };
  return {
    left: i.map(s),
    right: n.map(s)
  };
}
const wa = {
  prone: {
    label: "Prone",
    mods: [
      { domains: ["physical", "combat"], value: -2 }
    ]
  },
  blinded: {
    label: "Blinded",
    mods: [
      { domains: ["physical", "combat"], value: -3 },
      { domains: ["social"], value: -1 }
    ]
  },
  frightened: {
    label: "Frightened",
    mods: [
      { domains: ["mental", "social"], value: -1 }
    ]
  },
  overloaded: {
    label: "Overloaded",
    mods: [
      { domains: ["mental"], value: -2 }
    ]
  }
}, Mu = "statusConditionCatalog", lp = Object.freeze([
  { value: "person", label: "Person" },
  { value: "machine", label: "Machine" },
  { value: "all", label: "All Actors" },
  { value: "character", label: "Character" },
  { value: "npc", label: "NPC" },
  { value: "vehicle", label: "Vehicle" },
  { value: "battlemech", label: "BattleMech" }
]), gl = Object.freeze([
  { value: "false", label: "No" },
  { value: "true", label: "Yes" }
]), Cu = Object.freeze([
  A.actorTypes.character,
  A.actorTypes.npc
]), Eu = Object.freeze([
  A.actorTypes.vehicle,
  A.actorTypes.battlemech
]), cp = Object.freeze([...Cu, ...Eu]), ts = Object.freeze({
  person: Cu,
  machine: Eu,
  all: cp,
  character: [A.actorTypes.character],
  npc: [A.actorTypes.npc],
  vehicle: [A.actorTypes.vehicle],
  battlemech: [A.actorTypes.battlemech]
}), Pu = "systems/mwd/img/icons/status", up = Object.freeze([
  // Person conditions: lightly filtered from the existing status/icon pool.
  ae("prone", "Prone", "person", "physical", ["movement", "posture"], "prone.svg", { modifierKey: "prone", order: 10 }),
  ae("blinded", "Blinded", "person", "sensory", ["vision"], "blinded.svg", { modifierKey: "blinded", order: 20 }),
  ae("frightened", "Frightened", "person", "mental", ["morale"], "brain_injury.svg", { modifierKey: "frightened", order: 30 }),
  ae("deafened", "Deafened", "person", "sensory", ["hearing"], "deafened.svg", { order: 40 }),
  ae("hidden", "Hidden", "person", "tactical", ["stealth"], "hidden.svg", { order: 50 }),
  ae("suppressed", "Suppressed", "person", "tactical", ["offense"], "suppressed.svg", { order: 60 }),
  ae("grappled", "Grappled", "person", "physical", ["movement"], "grappled.svg", { order: 70 }),
  ae("stunned", "Stunned", "person", "physical", ["action"], "concussion.svg", { order: 80 }),
  ae("knockedOut", "Knocked Out", "person", "physical", ["unconscious"], "knockout.svg", { order: 90 }),
  ae("onFire", "On Fire", "all", "hazard", ["fire", "heat", "escalating"], "on_fire.svg", { order: 100 }),
  ae("drugged", "Drugged", "person", "chemical", ["impairment"], "drugged.svg", { order: 110 }),
  ae("radiation", "Radiation", "person", "hazard", ["radiation"], "radiation_low.svg", { order: 120 }),
  ae("overloaded", "Overloaded", "all", "reactor", ["heat", "actionRestriction"], "surge.svg", { managed: !0, modifierKey: "overloaded", order: 130 }),
  ae("preparedInterrupt", "Prepared", "person", "tactical", ["reaction", "prepared"], "readied_action.svg", { manual: !1, managed: !0, order: 140 }),
  ae("machineCritical", "Machine Critical", "machine", "damage", ["critical", "system"], "surge.svg", { manual: !1, managed: !0, order: 150 }),
  // Machine stability and movement.
  ae("unstable", "Unstable", "machine", "stability", ["movement", "piloting", "knockdown"], "falling.svg", { order: 1e3 }),
  ae("staggeredMechanical", "Staggered (Mechanical)", "machine", "stability", ["movement", "actionRestriction"], "falling.svg", { order: 1010 }),
  ae("proneMechFall", "Prone (Mech Fall)", "battlemech", "stability", ["movement", "posture", "standUp"], "prone.svg", { order: 1020 }),
  ae("skidding", "Skidding", "machine", "movement", ["forcedMovement", "tracking"], "falling.svg", { order: 1030 }),
  ae("stalled", "Stalled", "machine", "movement", ["movement", "actionRestriction"], "emp.svg", { order: 1040 }),
  ae("limping", "Limping", "machine", "movement", ["movement", "location"], "broken_leg.svg", { order: 1050 }),
  ae("jumpJetFailure", "Jump Jet Failure", "battlemech", "movement", ["jump", "equipment"], "surge.svg", { order: 1060 }),
  // Machine weapons.
  ae("weaponFailure", "Weapon Failure", "machine", "weapon", ["weapon", "mountScoped"], "broken_weapon.svg", { order: 1100 }),
  ae("jammedBallistic", "Jammed (Ballistic)", "machine", "weapon", ["weapon", "ballistic", "clearAction"], "broken_weapon.svg", { order: 1110 }),
  ae("armDestroyed", "Arm Destroyed", "battlemech", "damage", ["location", "weapon", "arm"], "dismembered_arm.svg", { order: 1120 }),
  // Sensors and electronics.
  ae("sensorDegraded", "Sensor Degraded", "machine", "sensor", ["sensor", "perception"], "all-seeing-eye.webp", { order: 1200 }),
  ae("sensorBlind", "Sensor Blind", "machine", "sensor", ["sensor", "targeting", "rangeLimit"], "damaged_eye.svg", { order: 1210 }),
  ae("ecmJamming", "ECM Jamming", "machine", "electronicWarfare", ["ecm", "tracking"], "emp.svg", { order: 1220 }),
  ae("ecmShrouded", "ECM Shrouded", "machine", "electronicWarfare", ["ecm", "defense"], "hidden.svg", { order: 1230 }),
  ae("eccmBoosted", "ECCM Boosted", "machine", "electronicWarfare", ["eccm", "sensor"], "all-seeing-eye.webp", { order: 1240 }),
  ae("sensorLocked", "Sensor Locked", "machine", "sensor", ["sensor", "targeted"], "all-seeing-eye.webp", { order: 1250 }),
  // Reactor and heat.
  ae("reactorInstability", "Reactor Instability", "machine", "reactor", ["heat", "reactor", "escalating"], "surge.svg", { order: 1300 }),
  ae("shutdown", "Shutdown", "machine", "reactor", ["heat", "actionRestriction"], "emp.svg", { order: 1310 }),
  ae("overheating", "Overheating", "machine", "reactor", ["heat", "escalating"], "on_fire_mild.svg", { order: 1320 }),
  ae("reactorBreach", "Reactor Breach", "machine", "reactor", ["reactor", "catastrophic", "countdown"], "radiation_high.svg", { order: 1330 }),
  // Machine damage and battlefield exposure.
  ae("legDestroyed", "Leg Destroyed", "battlemech", "damage", ["location", "movement", "leg"], "dismembered_leg.svg", { order: 1400 }),
  ae("exposed", "Exposed", "machine", "tactical", ["defense", "vulnerable"], "target.svg", { icon: `${Pu}/falling.svg`, order: 1410 }),
  ae("entrenchedHullDown", "Entrenched / Hull Down", "machine", "tactical", ["defense", "cover"], "cover.svg", { order: 1420 }),
  ae("obscured", "Obscured (Smoke/Dust)", "machine", "visibility", ["visibility", "cover"], "hidden.svg", { order: 1430 }),
  // Tactical markers.
  ae("evasiveWeave", "Evasive Weave", "machine", "tactical", ["defense", "attackPenalty", "selfInduced"], "falling.svg", { order: 1500 }),
  ae("braced", "Braced", "machine", "tactical", ["defense", "mobilityPenalty"], "cover.svg", { order: 1510 }),
  ae("overextended", "Overextended", "machine", "tactical", ["attack", "defensePenalty"], "surge.svg", { order: 1520 }),
  ae("targetFocused", "Target Focused", "machine", "tactical", ["targeted", "attack"], "all-seeing-eye.webp", { order: 1530 }),
  ae("suppressedMechanical", "Suppressed", "machine", "tactical", ["offense", "suppressed"], "suppressed.svg", { order: 1540 })
]);
function ae(a, e, t, i, n, s, r = {}) {
  return {
    id: a,
    label: e,
    actorGroup: t,
    category: i,
    tags: n,
    icon: r.icon ?? `${Pu}/${s}`,
    manual: r.manual ?? !0,
    managed: r.managed ?? !1,
    modifierKey: r.modifierKey ?? "",
    order: r.order ?? 0
  };
}
function dp() {
  return typeof foundry < "u" && (foundry == null ? void 0 : foundry.utils);
}
function mp(a) {
  return dp() && typeof foundry.utils.deepClone == "function" ? foundry.utils.deepClone(a) : JSON.parse(JSON.stringify(a));
}
function yl(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return t ? ["true", "1", "yes", "y", "on"].includes(t) : e;
}
function Ru() {
  return mp(up);
}
function No(a) {
  const e = String(a ?? "").trim();
  if (!e) return "";
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(/[^A-Za-z0-9]+/).map((i) => i.trim()).filter(Boolean);
  return t.length ? t.map((i, n) => {
    const s = i.toLowerCase();
    return n === 0 ? s : `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
  }).join("") : "";
}
function Io(a = []) {
  const e = Array.isArray(a) ? a : String(a ?? "").split(","), t = /* @__PURE__ */ new Set(), i = [];
  for (const n of e) {
    const s = No(n);
    !s || t.has(s) || (t.add(s), i.push(s));
  }
  return i;
}
function fp(a = []) {
  return Io(a).join(", ");
}
function Nu(a, e = "person") {
  const i = String(a ?? "").trim().toLowerCase();
  return i === "battlemech" ? "battlemech" : Object.prototype.hasOwnProperty.call(ts, i) ? i : e;
}
function pp(a) {
  return [...ts[Nu(a)] ?? []];
}
function hp(a = {}, { strict: e = !1, index: t = 0 } = {}) {
  const i = [], n = `Row ${t + 1}`, s = String((a == null ? void 0 : a.id) ?? "").trim(), r = String((a == null ? void 0 : a.label) ?? "").trim(), o = String((a == null ? void 0 : a.actorGroup) ?? "person").trim(), l = Nu(o, ""), c = No((a == null ? void 0 : a.category) ?? "general") || "general", u = Io(a == null ? void 0 : a.tags), d = String((a == null ? void 0 : a.icon) ?? "").trim(), m = String((a == null ? void 0 : a.modifierKey) ?? "").trim(), f = Number((a == null ? void 0 : a.order) ?? 0);
  if (s || i.push(`${n}: id cannot be blank.`), r || i.push(`${n}: label cannot be blank.`), (!l || o && !Object.prototype.hasOwnProperty.call(ts, l)) && i.push(`${n}: actorGroup must be one of ${Object.keys(ts).join(", ")}.`), m && !(wa != null && wa[m]) && i.push(`${n}: modifierKey "${m}" is not a known mechanics-backed status.`), Number.isFinite(f) || i.push(`${n}: order must be numeric.`), e && i.length) {
    const p = new Error(i[0]);
    throw p.validationErrors = i, p;
  }
  return {
    id: s,
    label: r || s || "Status",
    actorGroup: l || "person",
    category: c,
    tags: u,
    icon: d,
    manual: yl(a == null ? void 0 : a.manual, !0),
    managed: yl(a == null ? void 0 : a.managed, !1),
    modifierKey: m,
    order: Number.isFinite(f) ? Math.trunc(f) : 0
  };
}
function Zi(a = [], { strict: e = !1 } = {}) {
  const t = Array.isArray(a) ? a : [], i = [], n = /* @__PURE__ */ new Set(), s = [];
  if (t.forEach((r, o) => {
    try {
      const l = hp(r, { strict: e, index: o });
      if (!l.id) return;
      const c = l.id.toLowerCase();
      if (n.has(c)) {
        e && i.push(`Row ${o + 1}: duplicate id "${l.id}".`);
        return;
      }
      n.add(c), s.push(l);
    } catch (l) {
      e && i.push(...Array.isArray(l.validationErrors) ? l.validationErrors : [l.message]);
    }
  }), e && i.length) {
    const r = new Error(i[0]);
    throw r.validationErrors = i, r;
  }
  return s.sort((r, o) => r.order !== o.order ? r.order - o.order : r.label.localeCompare(o.label));
}
function ws(a = void 0) {
  var i, n;
  if (a !== void 0) return Zi(a, { strict: !1 });
  const e = (i = globalThis.game) == null ? void 0 : i.settings, t = (n = e == null ? void 0 : e.get) == null ? void 0 : n.call(e, T, Mu);
  return Zi(
    Array.isArray(t) ? t : Ru(),
    { strict: !1 }
  );
}
function ks(a, e = ws()) {
  const t = String(a ?? "").trim();
  return t ? e.find((i) => String(i.id ?? "").trim() === t) ?? null : null;
}
function Iu(a = null) {
  return String(
    typeof a == "string" ? a : (a == null ? void 0 : a.type) ?? ""
  ).trim();
}
function vs(a, e = null) {
  const t = Iu(e);
  return !t || !a ? !1 : pp(a.actorGroup).includes(t);
}
function gp({ statusId: a = "", actor: e = null, metadata: t = {}, catalogEntry: i = null } = {}) {
  const n = i ?? ks(a), s = Io((t == null ? void 0 : t.tags) ?? (n == null ? void 0 : n.tags) ?? []);
  return {
    id: String(a || (n == null ? void 0 : n.id) || "").trim(),
    category: No((t == null ? void 0 : t.category) ?? (n == null ? void 0 : n.category) ?? "general") || "general",
    tags: s,
    actorGroup: String((t == null ? void 0 : t.actorGroup) ?? (n == null ? void 0 : n.actorGroup) ?? "").trim(),
    actorType: Iu(e),
    scope: String((t == null ? void 0 : t.scope) ?? "").trim(),
    location: String((t == null ? void 0 : t.location) ?? "").trim(),
    itemUuid: String((t == null ? void 0 : t.itemUuid) ?? "").trim(),
    targetUuid: String((t == null ? void 0 : t.targetUuid) ?? "").trim(),
    severity: String((t == null ? void 0 : t.severity) ?? "").trim(),
    notes: String((t == null ? void 0 : t.notes) ?? "").trim()
  };
}
function yp(a = ws()) {
  return Zi(a, { strict: !1 }).map((e) => ({
    id: e.id,
    name: e.label,
    label: e.label,
    img: e.icon,
    icon: e.icon
  }));
}
function bl() {
  if (typeof CONFIG > "u") return [];
  const a = yp();
  return CONFIG.statusEffects = a, a;
}
const bp = /* @__PURE__ */ new Set(["overloaded", "preparedInterrupt"]);
function Sl(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function Sp(a, e) {
  var i, n, s;
  if (!a) return null;
  const t = Sl(e) ?? Sl(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((s = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : s.call(i, ((n = t == null ? void 0 : t.baseActor) == null ? void 0 : n.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function Do(a) {
  const e = String(a ?? "").trim();
  if (!e) return "Status";
  const n = (e.includes(".") ? e.split(".").at(-1) : e).replace(/^status/i, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return n ? n.replace(/\b\w/g, (s) => s.toUpperCase()) : e;
}
function Ap(a) {
  const e = String((a == null ? void 0 : a.name) ?? (a == null ? void 0 : a.label) ?? (a == null ? void 0 : a.id) ?? "Status").trim();
  return e ? Do(e) : "Status";
}
function Tp(a) {
  const e = typeof (a == null ? void 0 : a.img) == "string" ? a.img.trim() : "";
  if (e) return e;
  const t = a ? Object.getOwnPropertyDescriptor(a, "icon") : null;
  return "value" in (t ?? {}) ? String(t.value ?? "").trim() : "";
}
function wp(a) {
  var e, t;
  return ((t = (e = globalThis.CSS) == null ? void 0 : e.escape) == null ? void 0 : t.call(e, String(a ?? ""))) ?? String(a ?? "").replace(/["\\]/g, "\\$&");
}
function Du(a) {
  var e;
  return Object.prototype.hasOwnProperty.call(((e = a == null ? void 0 : a.system) == null ? void 0 : e.burn) ?? {}, "overloaded");
}
function Ou(a, e) {
  var n;
  const t = String(e ?? "").trim();
  return !a || !t ? null : Array.from(((n = a.effects) == null ? void 0 : n.contents) ?? a.effects ?? []).find((s) => {
    var r, o, l, c, u, d, m;
    return (o = (r = s == null ? void 0 : s.statuses) == null ? void 0 : r.has) != null && o.call(r, t) || Array.isArray(s == null ? void 0 : s.statuses) && s.statuses.includes(t) || ((c = (l = s == null ? void 0 : s.getFlag) == null ? void 0 : l.call(s, T, "status")) == null ? void 0 : c.id) === t || ((m = (d = (u = s == null ? void 0 : s.flags) == null ? void 0 : u[T]) == null ? void 0 : d.status) == null ? void 0 : m.id) === t ? !0 : String((s == null ? void 0 : s.statusId) ?? (s == null ? void 0 : s.id) ?? "").trim() === t;
  }) ?? null;
}
function _u(a, e) {
  var i, n, s;
  const t = Ou(a, e);
  return ((i = t == null ? void 0 : t.getFlag) == null ? void 0 : i.call(t, T, "status")) ?? ((s = (n = t == null ? void 0 : t.flags) == null ? void 0 : n[T]) == null ? void 0 : s.status) ?? null;
}
function ea(a, e) {
  var t, i, n, s, r, o;
  return e === "overloaded" && Du(a) ? !!((i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.burn) != null && i.overloaded) || !!((s = (n = a == null ? void 0 : a.statuses) == null ? void 0 : n.has) != null && s.call(n, e)) : ((o = (r = a == null ? void 0 : a.statuses) == null ? void 0 : r.has) == null ? void 0 : o.call(r, e)) ?? !1;
}
function kp(a, e) {
  const t = ea(e, a.id), i = _u(e, a.id) ?? {};
  return {
    id: a.id,
    label: a.label,
    icon: a.icon,
    active: t,
    managed: !!a.managed || bp.has(a.id),
    manual: !!a.manual,
    legacy: !1,
    category: a.category,
    tags: [...a.tags ?? []],
    scope: String(i.scope ?? "").trim(),
    notes: String(i.notes ?? "").trim()
  };
}
function vp(a, e) {
  const t = (CONFIG.statusEffects ?? []).find((n) => String((n == null ? void 0 : n.id) ?? "").trim() === a) ?? null, i = _u(e, a) ?? {};
  return {
    id: a,
    label: t ? Ap(t) : Do(a),
    icon: t ? Tp(t) : "",
    active: ea(e, a),
    managed: !1,
    manual: !1,
    legacy: !0,
    category: "",
    tags: [],
    scope: String(i.scope ?? "").trim(),
    notes: String(i.notes ?? "").trim()
  };
}
function Oo(a) {
  const e = /* @__PURE__ */ new Set(), t = ws(), i = [];
  for (const n of t) {
    const s = String((n == null ? void 0 : n.id) ?? "").trim();
    if (!s || e.has(s)) continue;
    const r = ea(a, s), o = vs(n, a);
    !r && (!o || !n.manual) || (e.add(s), i.push(kp(n, a)));
  }
  for (const n of Array.from((a == null ? void 0 : a.statuses) ?? [])) {
    const s = String(n ?? "").trim();
    !s || e.has(s) || (e.add(s), i.push(vp(s, a)));
  }
  return i.sort((n, s) => n.active !== s.active ? n.active ? -1 : 1 : n.legacy !== s.legacy ? n.legacy ? 1 : -1 : n.label.localeCompare(s.label));
}
function Mp(a) {
  if (!a.length)
    return "<p>No token statuses are configured.</p>";
  const e = foundry.utils.escapeHTML;
  return `
    <div class="mwd-token-status-dialog">
      <p style="margin-top: 0;">Toggle the statuses shown on this token.</p>
      <div style="display: grid; gap: 0.2rem; max-height: 20rem; overflow-y: auto; padding-right: 0.25rem;">
        ${a.map((i) => {
    const n = i.active ? "checked" : "", s = i.icon ? `<img src="${e(i.icon)}" alt="" width="20" height="20" style="flex: 0 0 20px; border: 0;" />` : "", r = i.managed ? '<small style="opacity: 0.7;">Managed by system state</small>' : "", o = i.legacy ? '<small style="opacity: 0.7;">Legacy / uncataloged</small>' : "";
    return `
      <div class="mwd-token-status-dialog__row" data-status-id="${e(i.id)}" style="display: grid; gap: 0.2rem; padding: 0.35rem 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
        <label style="display: flex; align-items: center; gap: 0.5rem;">
          <input type="checkbox" name="status.${e(i.id)}.active" value="1" ${n} />
          ${s}
          <span style="flex: 1 1 auto;">${e(i.label)}</span>
          ${r}
          ${o}
        </label>
        ${i.legacy ? "" : `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.35rem; padding-left: 1.85rem;">
            <input type="text" name="status.${e(i.id)}.scope" value="${e(i.scope ?? "")}" placeholder="Scope" />
            <input type="text" name="status.${e(i.id)}.notes" value="${e(i.notes ?? "")}" placeholder="Notes" />
          </div>
        `}
      </div>
    `;
  }).join("")}
      </div>
    </div>
  `;
}
async function Cp({ actor: a, effects: e, selectedStatusIds: t }) {
  const i = new Map(t.map((n) => [n.id, n]));
  for (const n of e) {
    const s = i.get(n.id), r = !!(s != null && s.active);
    await Ms({
      actor: a,
      statusId: n.id,
      active: r,
      metadata: (s == null ? void 0 : s.metadata) ?? {}
    });
  }
}
async function Al(a, e, t = {}) {
  const i = ks(e);
  if (!i) return !1;
  const n = Ou(a, e);
  if (!n) return !1;
  const s = gp({
    actor: a,
    statusId: e,
    metadata: t,
    catalogEntry: i
  }), r = { [`flags.${T}.status`]: s };
  return typeof n.update == "function" ? (await n.update(r), !0) : n.id && typeof a.updateEmbeddedDocuments == "function" ? (await a.updateEmbeddedDocuments("ActiveEffect", [{ _id: n.id, ...r }]), !0) : !1;
}
async function Ms({ actor: a, statusId: e, active: t, metadata: i = {} }) {
  if (!a || !e) return !1;
  const n = ea(a, e);
  if (!!t === n)
    return t ? Al(a, e, i) : !1;
  const s = ks(e), r = s ? vs(s, a) : !1;
  return t && s && !r ? !1 : e === "overloaded" && Du(a) ? (await a.update({ "system.burn.overloaded": !!t }), !0) : (await a.toggleStatusEffect(e, { active: !!t, overlay: !1 }), t && await Al(a, e, i), !0);
}
function Ep(a) {
  var i, n, s, r, o;
  const e = /* @__PURE__ */ new Map(), t = Array.from(((i = a == null ? void 0 : a.querySelectorAll) == null ? void 0 : i.call(a, "[data-status-id]")) ?? []);
  for (const l of t) {
    const c = String(((n = l == null ? void 0 : l.dataset) == null ? void 0 : n.statusId) ?? "").trim();
    if (!c) continue;
    const u = wp(c), d = !!((s = l.querySelector(`input[name="status.${u}.active"]`)) != null && s.checked), m = String(((r = l.querySelector(`input[name="status.${u}.scope"]`)) == null ? void 0 : r.value) ?? "").trim(), f = String(((o = l.querySelector(`input[name="status.${u}.notes"]`)) == null ? void 0 : o.value) ?? "").trim();
    e.set(c, {
      id: c,
      active: d,
      metadata: { scope: m, notes: f }
    });
  }
  return Array.from(e.values());
}
async function Lu({ actor: a, token: e } = {}) {
  var n;
  if (!a || !e) return !1;
  const t = Sp(a, e), i = Oo(t);
  return i.length ? foundry.applications.api.DialogV2.wait({
    window: {
      title: `Token Statuses: ${e.name ?? a.name ?? "Token"}`
    },
    position: {
      width: 420
    },
    content: Mp(i),
    buttons: [
      {
        action: "apply",
        label: "Apply",
        icon: "fa-solid fa-check",
        default: !0,
        callback: async (s, r) => {
          var o;
          try {
            const l = Ep(r.form);
            return await Cp({ actor: t, effects: i, selectedStatusIds: l }), !0;
          } catch (l) {
            return console.error("MWD | Failed to update token statuses", l), (o = ui.notifications) == null || o.error("Unable to update token statuses."), !1;
          }
        }
      },
      {
        action: "cancel",
        label: "Cancel",
        icon: "fa-solid fa-xmark",
        callback: () => !1
      }
    ],
    close: () => !1
  }) : ((n = ui.notifications) == null || n.warn("No token statuses are configured."), !1);
}
function Pp() {
  typeof Hooks > "u" || Hooks.on("renderTokenHUD", (a, e, t = {}) => {
    var d, m, f, p, h;
    const i = (t == null ? void 0 : t._id) ?? (t == null ? void 0 : t.id) ?? "", n = ((m = (d = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : d.get) == null ? void 0 : m.call(d, i)) ?? null, s = (n == null ? void 0 : n.actor) ?? null;
    if (!s) return;
    const r = ws(), o = new Map(r.map((g) => [g.id, g])), c = typeof jQuery < "u" && e instanceof jQuery ? e[0] : e;
    if (!(c instanceof HTMLElement)) return;
    const u = c.querySelectorAll("[data-status-id], [data-statusId], [data-effect-id]");
    for (const g of u) {
      const y = String(
        ((f = g.dataset) == null ? void 0 : f.statusId) ?? ((p = g.dataset) == null ? void 0 : p.statusid) ?? ((h = g.dataset) == null ? void 0 : h.effectId) ?? ""
      ).trim();
      if (!y) continue;
      const b = o.get(y);
      if (!b) continue;
      !ea(s, y) && !vs(b, s) && (g.hidden = !0, g.style.display = "none");
    }
  });
}
const Rp = Object.freeze({
  STR: Mi.strength,
  REF: Mi.reflexes,
  WIL: Mi.willpower,
  INT: Mi.intelligence,
  CHA: Mi.charisma
}), Np = Object.freeze({
  STR: "Strength",
  REF: "Reflexes",
  WIL: "Willpower",
  INT: "Intelligence",
  CHA: "Charisma"
}), Ip = Object.freeze({
  composure: {
    id: "composure",
    label: "Composure",
    formula: ["WIL", "CHA"],
    tags: ["combat", "utility", "mental"],
    domains: ["mental"]
  },
  judgeIntent: {
    id: "judgeIntent",
    label: "Judge Intent",
    formula: ["INT", "CHA"],
    tags: ["combat", "utility", "social", "mental"],
    domains: ["social", "mental"]
  },
  memory: {
    id: "memory",
    label: "Memory",
    formula: ["INT", "INT"],
    tags: ["combat", "utility", "mental"],
    domains: ["mental"]
  },
  lift: {
    id: "lift",
    label: "Lift",
    formula: ["STR", "STR"],
    tags: ["combat", "utility", "physical"],
    domains: ["physical"]
  },
  endure: {
    id: "endure",
    label: "Endure",
    formula: ["STR", "WIL"],
    tags: ["combat", "utility", "physical", "mental"],
    domains: ["physical", "mental"]
  }
});
function _o(a) {
  const e = String(a ?? "").trim();
  return e ? Ip[e] ?? null : null;
}
function Dp(a) {
  const e = _o(a);
  return e ? {
    intent: "common",
    id: e.id
  } : null;
}
function Op(a) {
  return Rp[String(a ?? "").trim().toUpperCase()] ?? null;
}
function _p(a) {
  return Np[String(a ?? "").trim().toUpperCase()] ?? String(a ?? "").trim().toUpperCase();
}
function Lp(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => String(e ?? "").trim().toUpperCase()).filter(Boolean).join(" + ");
}
const Lo = Object.freeze([
  { value: "positive", label: "Positive" },
  { value: "negative", label: "Negative" },
  { value: "narrative", label: "Narrative" }
]), xo = Object.freeze([
  { value: "minor", label: "Minor" },
  { value: "major", label: "Major" }
]), xu = Object.freeze([
  { value: "passive", label: "Passive" },
  { value: "triggered", label: "Triggered" }
]), $u = Object.freeze([
  { value: "rollMod", label: "Roll Modifier" },
  { value: "burnAdjust", label: "Burn Adjust" },
  { value: "actionCostMod", label: "Action Cost Mod" },
  { value: "initiativeMod", label: "Initiative Mod" },
  { value: "damageMod", label: "Damage Intake Mod" },
  { value: "edgeEvent", label: "Edge Event" }
]), Bu = Object.freeze([
  { value: "onBuildRoll", label: "Build Roll" },
  { value: "onBeforeBurnApplied", label: "Before Burn Applied" },
  { value: "onBeforeActionCostFinalized", label: "Before Action Cost Finalized" },
  { value: "onInitiativeResolved", label: "Initiative Resolved" },
  { value: "onDamageResolved", label: "Damage Resolved" },
  { value: "onEndOfActivation", label: "End of Activation" },
  { value: "onEdgeSpend", label: "Edge Spend" },
  { value: "onEdgeGain", label: "Edge Gain" }
]), $o = Object.freeze([
  { value: "eq", label: "=" },
  { value: "neq", label: "!=" },
  { value: "gt", label: ">" },
  { value: "gte", label: ">=" },
  { value: "lt", label: "<" },
  { value: "lte", label: "<=" },
  { value: "includes", label: "Includes" },
  { value: "notIncludes", label: "Excludes" },
  { value: "truthy", label: "Is True" },
  { value: "falsy", label: "Is False" }
]), zu = Object.freeze([
  { value: "adjustAmount", label: "Adjust Amount" },
  { value: "grantPool", label: "Grant Pool" }
]), xp = new Set(Lo.map((a) => a.value)), $p = new Set(xo.map((a) => a.value)), Bp = new Set(xu.map((a) => a.value)), zp = new Set($u.map((a) => a.value)), Fu = new Set(Bu.map((a) => a.value)), Fp = new Set($o.map((a) => a.value)), Up = new Set(zu.map((a) => a.value));
function le(a, e = "") {
  return String(a ?? "").trim() || e;
}
function ge(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function is(a) {
  return foundry.utils.deepClone(a);
}
function Uu(a = []) {
  return (Array.isArray(a) ? a : typeof a == "string" ? a.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function Hp(a) {
  if (typeof a != "string") return a;
  const e = a.trim();
  if (!e) return "";
  if (e === "true") return !0;
  if (e === "false") return !1;
  if (/^-?\d+(\.\d+)?$/.test(e)) return Number(e);
  if (e.startsWith("[") && e.endsWith("]") || e.startsWith("{") && e.endsWith("}"))
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
  return e;
}
function Vs(a) {
  const e = Math.max(0, Math.trunc(ge(a, 0)));
  return e > 0 ? e : 0;
}
function Ii(a = {}) {
  const e = a && typeof a == "object" ? a : {};
  return {
    perActivation: Vs(e.perActivation),
    perRound: Vs(e.perRound),
    perScene: Vs(e.perScene)
  };
}
function jp(a = {}) {
  const e = a && typeof a == "object" ? a : {}, t = {
    id: le(e.id, foundry.utils.randomID()),
    fact: le(e.fact)
  }, i = $o.find((s) => e[s.value] !== void 0 && e[s.value] !== null), n = (i == null ? void 0 : i.value) ?? (Fp.has(String(e.comparator ?? "").trim()) ? String(e.comparator).trim() : "eq");
  return t.comparator = n, n !== "truthy" && n !== "falsy" && (t.value = Hp(e[n] ?? e.value ?? "")), t;
}
function hi(a = []) {
  return (Array.isArray(a) ? a : []).map(jp);
}
function Wp(a = {}) {
  const e = a && typeof a == "object" ? a : {}, t = zp.has(String(e.type ?? "").trim()) ? String(e.type).trim() : "rollMod", i = Kp(t), n = Fu.has(String(e.phase ?? "").trim()) ? String(e.phase).trim() : i, s = Up.has(String(e.operation ?? "").trim()) ? String(e.operation).trim() : "adjustAmount";
  return {
    id: le(e.id, foundry.utils.randomID()),
    type: t,
    phase: n,
    selector: le(e.selector),
    skillKeys: Uu(e.skillKeys),
    label: le(e.label),
    value: ge(e.value, 0),
    min: e.min === void 0 || e.min === null || e.min === "" ? null : ge(e.min, 0),
    max: e.max === void 0 || e.max === null || e.max === "" ? null : ge(e.max, 0),
    pool: le(e.pool),
    operation: s,
    conditions: hi(e.conditions),
    limit: Ii(e.limit)
  };
}
function Hu(a = {}) {
  const e = le(a == null ? void 0 : a.selector);
  return e === "intent.skill" || e.startsWith("intent.skill.");
}
function Fi(a = []) {
  return (Array.isArray(a) ? a : []).map(Wp).filter((t) => t.phase && t.type);
}
function Gt(a = {}) {
  const e = a && typeof a == "object" ? is(a) : {}, t = e.positive === !1 ? "negative" : "positive", i = xp.has(String(e.category ?? "").trim()) ? String(e.category).trim() : t, n = $p.has(String(e.tier ?? "").trim()) ? String(e.tier).trim() : "minor", s = Bp.has(String(e.activation ?? "").trim()) ? String(e.activation).trim() : "passive";
  return {
    ...e,
    positive: i === "positive",
    category: i,
    tier: n,
    activation: s,
    tags: Uu(e.tags),
    effects: Fi(e.effects),
    prerequisites: hi(e.prerequisites),
    limits: Ii(e.limits)
  };
}
function ju() {
  return {
    categories: [...Lo],
    tiers: [...xo],
    activations: [...xu],
    effectTypes: [...$u],
    phases: [...Bu],
    comparators: [...$o],
    edgeOperations: [...zu]
  };
}
function On(a = "") {
  var e;
  return ((e = Lo.find((t) => t.value === a)) == null ? void 0 : e.label) ?? "Positive";
}
function _n(a = "") {
  var e;
  return ((e = xo.find((t) => t.value === a)) == null ? void 0 : e.label) ?? "Minor";
}
function Kp(a = "") {
  switch (a) {
    case "burnAdjust":
      return "onBeforeBurnApplied";
    case "actionCostMod":
      return "onBeforeActionCostFinalized";
    case "initiativeMod":
      return "onInitiativeResolved";
    case "damageMod":
      return "onDamageResolved";
    case "edgeEvent":
      return "onEdgeGain";
    default:
      return "onBuildRoll";
  }
}
function Gp(a) {
  return Array.from((a == null ? void 0 : a.items) ?? []).filter((e) => ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === "quality").map((e) => ({
    item: e,
    system: Gt(e.system ?? {})
  }));
}
function qp(a = {}, e = {}) {
  const t = Ii(a), i = Ii(e);
  return {
    perActivation: i.perActivation || t.perActivation,
    perRound: i.perRound || t.perRound,
    perScene: i.perScene || t.perScene
  };
}
function Wu(a = {}) {
  var n, s, r;
  const e = le(a.combatId ?? ((n = a.combat) == null ? void 0 : n.id)), t = Math.max(0, Math.trunc(ge(a.round ?? ((s = a.combat) == null ? void 0 : s.round), 0))), i = le(a.sceneId ?? ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id));
  return {
    activationKey: le(a.activationKey),
    roundKey: e ? `${e}:${t}` : "",
    sceneKey: i
  };
}
function Vp(a, e = {}) {
  var s, r, o, l;
  const t = ((s = a == null ? void 0 : a.flags) == null ? void 0 : s[T]) ?? {}, i = ((r = t == null ? void 0 : t.traitUsage) == null ? void 0 : r.scene) ?? {}, n = e.state ?? {};
  return {
    activation: ((o = n == null ? void 0 : n.traitUsage) == null ? void 0 : o.activation) ?? {},
    round: ((l = n == null ? void 0 : n.traitUsage) == null ? void 0 : l.round) ?? {},
    scene: i
  };
}
function Yp(a, e, t, i) {
  var n, s, r, o, l;
  switch (t) {
    case "perActivation":
      return Math.max(0, Math.trunc(ge((n = a.activation) == null ? void 0 : n[i], 0)));
    case "perRound":
      return Math.max(0, Math.trunc(ge((r = (s = a.round) == null ? void 0 : s[e.roundKey]) == null ? void 0 : r[i], 0)));
    case "perScene":
      return Math.max(0, Math.trunc(ge((l = (o = a.scene) == null ? void 0 : o[e.sceneKey]) == null ? void 0 : l[i], 0)));
    default:
      return 0;
  }
}
function Qp(a, e, t, i) {
  const n = [];
  for (const s of ["perActivation", "perRound", "perScene"]) {
    const r = Math.max(0, Math.trunc(ge(t == null ? void 0 : t[s], 0)));
    if (!r) continue;
    Yp(a, e, s, i) >= r && n.push(`${s} limit reached`);
  }
  return n;
}
function Jp(a, e, t) {
  switch (e) {
    case "truthy":
      return !!a;
    case "falsy":
      return !a;
    case "neq":
      return a !== t;
    case "gt":
      return Number(a) > Number(t);
    case "gte":
      return Number(a) >= Number(t);
    case "lt":
      return Number(a) < Number(t);
    case "lte":
      return Number(a) <= Number(t);
    case "includes":
      return Array.isArray(a) ? a.includes(t) : String(a ?? "").includes(String(t ?? ""));
    case "notIncludes":
      return Array.isArray(a) ? !a.includes(t) : !String(a ?? "").includes(String(t ?? ""));
    case "eq":
    default:
      return a === t;
  }
}
function Tl(a, e) {
  if (!le(a == null ? void 0 : a.fact)) return !0;
  const t = foundry.utils.getProperty(e, a.fact);
  return Jp(t, a.comparator, a.value);
}
function Xp(a = "", e = {}) {
  const t = le(a);
  return t ? (Array.isArray(e == null ? void 0 : e.selectors) ? e.selectors : []).some(
    (n) => n === t || n.startsWith(`${t}.`)
  ) : !0;
}
function Ku(a, e) {
  return `${a.id}:${e.id}`;
}
function Zp(a, e) {
  var t;
  return !!((t = a.system) != null && t.inactive) || !!(e != null && e.inactive);
}
function wl(a = []) {
  return a.map((e) => e.fact).filter(Boolean).join(", ");
}
function la(a, e, t) {
  const i = ge(a[e], 0);
  let n = i;
  return typeof t.value == "number" && (n += t.value), typeof t.min == "number" && (n = Math.max(t.min, n)), typeof t.max == "number" && (n = Math.min(t.max, n)), a[e] = n, n - i;
}
function Ti(a, e, t, i, n) {
  i && a.push({
    id: `trait:${n}:${e.id}:${t.id}`,
    label: t.label || e.name,
    value: i,
    source: e.name,
    traitItemId: e.id,
    traitEffectId: t.id
  });
}
function eh({ item: a, effect: e, phase: t, packet: i, result: n }) {
  switch (e.type) {
    case "rollMod": {
      const s = ge(e.value, 0);
      return Ti(n.modifiers, a, e, s, t), s;
    }
    case "burnAdjust": {
      if (t === "onEndOfActivation") {
        const r = la(i, "burnDelta", e);
        return Ti(n.modifiers, a, e, r, t), r;
      }
      const s = la(i, "amount", e);
      return Ti(n.modifiers, a, e, s, t), s;
    }
    case "actionCostMod": {
      const s = la(i, "cost", e);
      return Ti(n.modifiers, a, e, s, t), s;
    }
    case "initiativeMod": {
      const s = la(i, "total", e);
      return Ti(n.modifiers, a, e, s, t), s;
    }
    case "damageMod": {
      const s = la(i, "amount", e);
      return Ti(n.modifiers, a, e, s, t), s;
    }
    case "edgeEvent": {
      if (t === "onEndOfActivation" && e.operation === "grantPool" && e.pool)
        return i.edgeAdjustments ?? (i.edgeAdjustments = []), i.edgeAdjustments.push({
          poolKey: e.pool,
          amount: ge(e.value, 0),
          label: e.label || a.name,
          source: a.name
        }), Ti(n.modifiers, a, e, ge(e.value, 0), t), ge(e.value, 0);
      const s = la(i, "amount", e);
      return Ti(n.modifiers, a, e, s, t), s;
    }
    default:
      return 0;
  }
}
function th(a, e, t) {
  const i = Ku(a, e), n = [];
  return t.perActivation > 0 && n.push({ kind: "usage", scope: "perActivation", key: i, delta: 1 }), t.perRound > 0 && n.push({ kind: "usage", scope: "perRound", key: i, delta: 1 }), t.perScene > 0 && n.push({ kind: "usage", scope: "perScene", key: i, delta: 1 }), n;
}
function Gu(a = "") {
  const e = le(a);
  return e ? [`action.${e}`] : [];
}
function sa(a, e = {}) {
  var o, l, c, u, d;
  const t = e.snapshot ?? null, i = e.state ?? (t == null ? void 0 : t.state) ?? {}, n = Array.isArray(i == null ? void 0 : i.actionLog) ? i.actionLog.map((m) => le(m == null ? void 0 : m.id)).filter(Boolean) : [], s = (i == null ? void 0 : i.actionState) ?? {}, r = [];
  return s != null && s.aim && r.push("state.aim"), s != null && s.preparedInterrupt && r.push("state.preparedInterrupt"), {
    activation: {
      moved: n.includes("move") || !!((o = s == null ? void 0 : s.move) != null && o.moved),
      saSpent: Math.max(0, Math.trunc(ge(i == null ? void 0 : i.saSpentThisActivation, 0))),
      attacksThisActivation: Math.max(0, Math.trunc(ge(i == null ? void 0 : i.attacksThisActivation, 0))),
      burnThisActivation: Math.max(0, Math.trunc(ge(i == null ? void 0 : i.burnThisActivation, 0)))
    },
    actionState: {
      aim: (s == null ? void 0 : s.aim) ?? null,
      move: (s == null ? void 0 : s.move) ?? null,
      preparedInterrupt: (s == null ? void 0 : s.preparedInterrupt) ?? null
    },
    burn: {
      current: Math.max(0, Math.trunc(ge((c = (l = a == null ? void 0 : a.system) == null ? void 0 : l.burn) == null ? void 0 : c.value, 0))),
      overloaded: !!((d = (u = a == null ? void 0 : a.system) == null ? void 0 : u.burn) != null && d.overloaded)
    },
    timing: {
      firstAttackThisActivation: Math.max(0, Math.trunc(ge(i == null ? void 0 : i.attacksThisActivation, 0))) === 0,
      firstExtraSAThisActivation: Math.max(0, Math.trunc(ge(i == null ? void 0 : i.saSpentThisActivation, 0))) <= 3
    },
    selectors: r
  };
}
function Bo({ actor: a, resolved: e, payload: t, runtime: i = {} } = {}) {
  var d, m, f, p, h, g, y, b, S, w, M, P;
  const n = sa(a, i), s = le((e == null ? void 0 : e.intent) ?? (t == null ? void 0 : t.intent), "skill"), r = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [], o = le(((d = e == null ? void 0 : e.attack) == null ? void 0 : d.rangeBand) ?? (t == null ? void 0 : t.rangeBand)), l = le(((f = (m = t == null ? void 0 : t.edge) == null ? void 0 : m.pre) == null ? void 0 : f.poolKey) ?? ((p = t == null ? void 0 : t.edge) == null ? void 0 : p.poolKey) ?? ""), c = le(
    ((h = e == null ? void 0 : e.data) == null ? void 0 : h.skillKey) ?? ((g = e == null ? void 0 : e.specialization) == null ? void 0 : g.skillKey) ?? (s === "skill" ? t == null ? void 0 : t.key : "")
  ), u = le(
    ((S = (b = (y = e == null ? void 0 : e.breakdown) == null ? void 0 : y.find) == null ? void 0 : b.call(y, (E) => (E == null ? void 0 : E.id) === "skill")) == null ? void 0 : S.label) ?? (e == null ? void 0 : e.title)
  );
  return n.intent = s, n.domains = r, n.rangeBand = o, n.skill = {
    key: c,
    label: u
  }, n.edge = {
    stage: (w = t == null ? void 0 : t.toggles) != null && w.useEdge ? "pre" : "",
    pool: l,
    spent: !!((M = t == null ? void 0 : t.toggles) != null && M.useEdge)
  }, n.selectors.push(`intent.${s}`), r.forEach((E) => n.selectors.push(`domain.${E}`)), o && n.selectors.push(`range.${o}`), s === "skill" && c && n.selectors.push(`skill.${c}`), (P = t == null ? void 0 : t.toggles) != null && P.useEdge && n.selectors.push("edge.pre"), n;
}
function qu({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = sa(a, t);
  return i.action = {
    id: le(e.actionId),
    category: le(e.category),
    resource: le(e.resource),
    cost: ge(e.cost, 0),
    effectiveCost: ge(e.effectiveCost ?? e.cost, 0)
  }, i.selectors.push(...Gu(e.actionId)), i.action.category && i.selectors.push(`actionCategory.${i.action.category}`), i.action.resource && i.selectors.push(`actionResource.${i.action.resource}`), i;
}
function Ln({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = sa(a, t);
  return i.action = {
    id: le(e.actionId),
    category: le(e.category),
    resource: le(e.resource)
  }, i.burn = {
    ...i.burn,
    amount: ge(e.amount, 0),
    source: le(e.source)
  }, e.source === "extraSA" && e.extraSaIndex === 1 && i.selectors.push("activation.extraSA:first"), e.source && i.selectors.push(`burn.${e.source}`), i.action.id && i.selectors.push(...Gu(i.action.id)), i.action.category && i.selectors.push(`actionCategory.${i.action.category}`), i.action.category === "reaction" && i.selectors.push(`reaction.${i.action.id}`), i;
}
function Vu({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = sa(a, t);
  return i.intent = "initiative", i.domains = ["combat"], i.initiative = {
    total: ge(e.total, 0)
  }, i.selectors.push("intent.initiative"), i;
}
function Yu({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = sa(a, t);
  return i.damage = {
    amount: ge(e.amount, 0),
    track: le(e.track),
    damageType: le(e.damageType)
  }, i.selectors.push("incoming"), i;
}
function Nr({ actor: a, packet: e = {}, phase: t = "onEdgeGain", runtime: i = {} } = {}) {
  const n = sa(a, i);
  return n.edge = {
    pool: le(e.poolKey),
    amount: ge(e.amount, 0),
    eventKey: le(e.eventKey),
    source: le(e.source)
  }, n.selectors.push(t === "onEdgeSpend" ? "edge.spend" : "edge.gain"), n.edge.eventKey && n.selectors.push(`event.${n.edge.eventKey}`), n;
}
function Qu({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = sa(a, t);
  return i.event = {
    phase: "endOfActivation"
  }, i.selectors.push("endOfActivation"), ge(e.burnDelta, 0) !== 0 && i.selectors.push("burn.adjust"), i;
}
function xt({ actor: a, phase: e, facts: t = {}, packet: i = {}, options: n = {} } = {}) {
  var u;
  const s = {
    packet: is(i),
    modifiers: [],
    mutations: [],
    applied: [],
    skipped: []
  };
  if (!a || !Fu.has(String(e ?? "").trim()))
    return s;
  const r = n.runtime ?? {}, o = Vp(a, r), l = Wu(r), c = Gp(a);
  for (const { item: d, system: m } of c) {
    if (Zp(d, m)) {
      s.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: "Trait is inactive"
      });
      continue;
    }
    const f = m.prerequisites.filter((p) => le(p == null ? void 0 : p.fact)).filter((p) => !Tl(p, t));
    if (f.length) {
      s.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: `Prerequisites not met: ${wl(f)}`
      });
      continue;
    }
    for (const p of m.effects.filter((h) => h.phase === e)) {
      if (!Xp(p.selector, t)) {
        s.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: `Selector did not match (${p.selector || "any"})`
        });
        continue;
      }
      if (Hu(p) && p.skillKeys.length) {
        const w = le((u = t == null ? void 0 : t.skill) == null ? void 0 : u.key);
        if (!w || !p.skillKeys.includes(w)) {
          s.skipped.push({
            traitItemId: d.id,
            traitEffectId: p.id,
            label: p.label || d.name,
            reason: `Skill did not match (${p.skillKeys.join(", ")})`
          });
          continue;
        }
      }
      const h = p.conditions.filter((w) => le(w == null ? void 0 : w.fact)).filter((w) => !Tl(w, t));
      if (h.length) {
        s.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: `Conditions not met: ${wl(h)}`
        });
        continue;
      }
      const g = qp(m.limits, p.limit), y = Ku(d, p), b = Qp(o, l, g, y);
      if (b.length) {
        s.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: b.join(", ")
        });
        continue;
      }
      const S = eh({
        item: d,
        effect: p,
        phase: e,
        packet: s.packet,
        result: s
      });
      s.applied.push({
        traitItemId: d.id,
        traitEffectId: p.id,
        label: p.label || d.name,
        value: S,
        phase: e,
        source: d.name
      }), n.consumeUsage && s.mutations.push(...th(d, p, g));
    }
  }
  return s;
}
async function yi({ actor: a, mutations: e = [], runtime: t = {} } = {}) {
  var o, l, c, u, d, m, f, p, h;
  if (!a || !Array.isArray(e) || !e.length) return;
  const i = e.filter((g) => (g == null ? void 0 : g.kind) === "usage");
  if (!i.length) return;
  const n = is(((c = (l = (o = a.flags) == null ? void 0 : o[T]) == null ? void 0 : l.traitUsage) == null ? void 0 : c.scene) ?? {}), s = t.state ? is(t.state) : null, r = Wu(t);
  for (const g of i) {
    const y = le(g.key), b = Math.max(0, Math.trunc(ge(g.delta, 0)));
    if (!(!y || !b))
      switch (g.scope) {
        case "perActivation": {
          if (!s) break;
          s.traitUsage ?? (s.traitUsage = {}), (u = s.traitUsage).activation ?? (u.activation = {}), s.traitUsage.activation[y] = Math.max(0, ge(s.traitUsage.activation[y], 0) + b);
          break;
        }
        case "perRound": {
          if (!s || !r.roundKey) break;
          s.traitUsage ?? (s.traitUsage = {}), (d = s.traitUsage).round ?? (d.round = {}), (m = s.traitUsage.round)[f = r.roundKey] ?? (m[f] = {}), s.traitUsage.round[r.roundKey][y] = Math.max(
            0,
            ge(s.traitUsage.round[r.roundKey][y], 0) + b
          );
          break;
        }
        case "perScene": {
          if (!r.sceneKey) break;
          n[p = r.sceneKey] ?? (n[p] = {}), n[r.sceneKey][y] = Math.max(0, ge(n[r.sceneKey][y], 0) + b);
          break;
        }
      }
  }
  s && ((h = t.combatant) != null && h.id) && await t.combatant.setFlag(T, "personalCombat", s), await a.setFlag(T, "traitUsage", { scene: n });
}
const Ju = "personalActionCatalog", Oe = Object.freeze({
  standard: "standard",
  complex: "complex",
  free: "free",
  reaction: "reaction",
  recovery: "recovery"
}), Ir = Object.freeze([
  { value: Oe.standard, label: "Standard" },
  { value: Oe.complex, label: "Complex" },
  { value: Oe.free, label: "Free" },
  { value: Oe.reaction, label: "Reaction" },
  { value: Oe.recovery, label: "Burn & Recovery" }
]), Xu = Object.freeze([
  { value: "", label: "Not Implemented / Placeholder" },
  { value: "combatAction", label: "Generic Action" },
  { value: "combatAttack", label: "Attack Pipeline" },
  { value: "combatEvade", label: "Evade" },
  { value: "combatAssist", label: "Assist" },
  { value: "combatInterrupt", label: "Interrupt" },
  { value: "combatReduceBurn", label: "Reduce Burn" },
  { value: "combatOverloadCheck", label: "Overload Check" }
]), kl = new Set(Ir.map((a) => a.value)), vl = new Set(Xu.map((a) => a.value)), Zu = Object.freeze([
  { id: "move", label: "Move", category: "standard", cost: 1, handler: "combatAction", state: "move", description: "Reposition within the scene and establish your location." },
  { id: "aim", label: "Aim", category: "standard", cost: 1, handler: "combatAction", state: "aim", description: "Line up your next attack for a stronger single-target shot." },
  { id: "interact", label: "Interact", category: "standard", cost: 1, handler: "combatAction", description: "Manipulate an object or the environment with intent." },
  { id: "assess", label: "Assess", category: "standard", cost: 1, handler: "combatAction", description: "Read the situation and gather useful tactical information." },
  { id: "attack", label: "Attack", category: "complex", cost: 2, handler: "combatAttack", prominent: !0, description: "Make an offensive action and resolve it through the attack pipeline." },
  { id: "firstAid", label: "First Aid", category: "complex", cost: 2, handler: "", reason: "Recovery resolver not yet implemented.", description: "Stabilize or recover harm through a focused treatment action." },
  { id: "readyItem", label: "Ready Item", category: "free", cost: 0, handler: "combatAction", description: "Draw, stow, or ready a piece of gear for use." },
  { id: "prepare", label: "Prepare", category: "free", cost: 0, handler: "combatAction", state: "preparedInterrupt", description: "Declare a trigger now so you can interrupt later." },
  { id: "drop", label: "Drop", category: "free", cost: 0, handler: "combatAction", description: "Release or discard something you are holding." },
  { id: "communicate", label: "Communicate", category: "free", cost: 0, handler: "combatAction", description: "Speak, signal, or coordinate without changing the mechanics." },
  { id: "adjust", label: "Adjust", category: "free", cost: 0, handler: "combatAction", description: "Make a small physical adjustment or quick correction." },
  { id: "activateItem", label: "Activate Item", category: "free", cost: 0, handler: "combatAction", description: "Switch on or initialize an item without resolving its full effect." },
  { id: "react", label: "React", category: "reaction", cost: 0, handler: "combatAction", description: "Take a generic response to an outside trigger." },
  { id: "evade", label: "Evade", category: "reaction", cost: 0, handler: "combatEvade", description: "Avoid or soften incoming non-direct danger." },
  { id: "opportunity", label: "Opportunity", category: "reaction", cost: 0, handler: "combatAttack", description: "Exploit an opening and make a reactive attack." },
  { id: "assist", label: "Assist", category: "reaction", cost: 0, handler: "combatAssist", description: "Support another combatant when their moment comes." },
  { id: "interrupt", label: "Interrupt", category: "reaction", cost: 0, handler: "combatInterrupt", description: "Resolve a prepared response when its trigger is met." },
  { id: "reduceBurn", label: "Reduce Burn", category: "standard", cost: 1, handler: "combatReduceBurn", prominentWhenBurning: !0, description: "Take a breather and bring your Burn down by one." },
  { id: "overloadCheck", label: "Overload Check", category: "recovery", cost: 0, handler: "combatOverloadCheck", roll: { intent: "overload" }, prominentWhenBurning: !0, description: "Roll to see whether mounting Burn pushes you into overload." }
].map((a) => Object.freeze(Cs(a)))), ih = new Map(Zu.map((a) => [a.id, a]));
function Cs(a) {
  return JSON.parse(JSON.stringify(a ?? null));
}
function Ml(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return ["true", "1", "yes", "y", "on"].includes(t) ? !0 : ["false", "0", "no", "n", "off", ""].includes(t) ? !1 : e;
}
function ah(a, e = null) {
  var i;
  const t = String((a == null ? void 0 : a.rollIntent) ?? ((i = a == null ? void 0 : a.roll) == null ? void 0 : i.intent) ?? (e == null ? void 0 : e.intent) ?? "").trim();
  return t ? { intent: t } : null;
}
function nh(a, { strict: e = !1, index: t = 0 } = {}) {
  const i = String((a == null ? void 0 : a.id) ?? "").trim(), n = ih.get(i) ?? {}, s = `Row ${t + 1}`, r = [];
  i || r.push(`${s}: id cannot be blank.`);
  const o = String((a == null ? void 0 : a.category) ?? n.category ?? "").trim();
  kl.has(o) || r.push(`${s}: category must be one of ${Array.from(kl).join(", ")}.`);
  const l = String((a == null ? void 0 : a.label) ?? n.label ?? "").trim();
  l || r.push(`${s}: label cannot be blank.`);
  const c = (a == null ? void 0 : a.cost) ?? n.cost ?? 0, u = Number(c);
  (!Number.isFinite(u) || u < 0) && r.push(`${s}: cost must be a non-negative number.`);
  const d = String((a == null ? void 0 : a.handler) ?? n.handler ?? "").trim();
  if (vl.has(d) || r.push(`${s}: handler must be one of ${Array.from(vl).map((p) => p || "(blank)").join(", ")}.`), r.length) {
    if (e) {
      const p = new Error(r[0]);
      throw p.validationErrors = r, p;
    }
    return null;
  }
  const m = {
    ...Cs(n),
    id: i,
    label: l,
    category: o,
    cost: Math.trunc(u),
    handler: d,
    description: String((a == null ? void 0 : a.description) ?? n.description ?? "").trim(),
    reason: String((a == null ? void 0 : a.reason) ?? n.reason ?? "").trim(),
    prominent: Ml(a == null ? void 0 : a.prominent, !!n.prominent),
    prominentWhenBurning: Ml(a == null ? void 0 : a.prominentWhenBurning, !!n.prominentWhenBurning)
  };
  m.id === "opportunity" && !m.handler && (m.handler = "combatAttack", m.reason = ""), m.id === "opportunity" && m.handler === "combatAttack" && m.reason === "Opportunity attacks are not yet implemented." && (m.reason = ""), m.id === "assist" && !m.handler && (m.handler = "combatAssist", m.reason = ""), m.id === "assist" && m.handler === "combatAssist" && m.reason === "Reaction assist effects are not yet implemented." && (m.reason = ""), m.id === "interrupt" && !m.handler && (m.handler = "combatInterrupt", m.reason = ""), m.id === "interrupt" && m.handler === "combatInterrupt" && m.reason === "Prepared interrupt resolution is not yet implemented." && (m.reason = "");
  const f = ah(a, n.roll ?? null);
  return f ? m.roll = f : delete m.roll, m.reason || delete m.reason, m.description || delete m.description, m.prominent || delete m.prominent, m.prominentWhenBurning || delete m.prominentWhenBurning, m;
}
function zo() {
  return Cs(Zu);
}
function hn(a, { strict: e = !1 } = {}) {
  if (!Array.isArray(a)) {
    if (e) {
      const s = new Error("Action catalog must be an array.");
      throw s.validationErrors = [s.message], s;
    }
    return zo();
  }
  const t = [], i = /* @__PURE__ */ new Set(), n = [];
  if (a.forEach((s, r) => {
    try {
      const o = nh(s, { strict: e, index: r });
      if (!o) return;
      const l = o.id.toLowerCase();
      if (i.has(l)) {
        const c = `Row ${r + 1}: duplicate action id "${o.id}".`;
        e && n.push(c);
        return;
      }
      i.add(l), t.push(o);
    } catch (o) {
      e && n.push(...Array.isArray(o.validationErrors) ? o.validationErrors : [o.message]);
    }
  }), n.length) {
    const s = new Error(n[0]);
    throw s.validationErrors = n, s;
  }
  return t;
}
function ed() {
  var a, e;
  try {
    const t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.get) == null ? void 0 : e.call(a, T, Ju);
    return hn(t, { strict: !1 });
  } catch {
    return zo();
  }
}
function xn(a) {
  const e = String(a ?? "").trim();
  return ed().find((t) => t.id === e) ?? null;
}
function sh(a) {
  return ed().filter((e) => e.category === a).map((e) => Object.freeze(Cs(e)));
}
const Vi = "hazard";
function rh(a) {
  return a && typeof a == "object" ? a : {};
}
function Oi(a) {
  var n, s, r;
  const e = ((n = a == null ? void 0 : a.getFlag) == null ? void 0 : n.call(a, "mwd", Vi)) ?? ((r = (s = a == null ? void 0 : a.flags) == null ? void 0 : s.mwd) == null ? void 0 : r[Vi]) ?? null;
  if (!e || typeof e != "object") return null;
  const t = bi(e.areaEffect ?? { kind: Et.persistent, hazard: e.hazardDef }), i = ze(
    e.templateGeometry,
    {
      template: e.template,
      placement: e.templatePlacement
    }
  ) ?? null;
  return {
    ...foundry.utils.deepClone(rh(e)),
    areaEffect: t,
    hazardDef: wo(e.hazardDef ?? t.hazard ?? {}),
    templateGeometry: i
  };
}
function oh(a) {
  return !!Oi(a);
}
async function Ys(a) {
  var i, n, s;
  const e = ((i = a == null ? void 0 : a.getFlag) == null ? void 0 : i.call(a, "mwd", Vi)) ?? ((s = (n = a == null ? void 0 : a.flags) == null ? void 0 : n.mwd) == null ? void 0 : s[Vi]) ?? null;
  if (!e || typeof e != "object") return null;
  if (e != null && e.templateGeometry) return Oi(a);
  const t = Oi(a);
  return !(t != null && t.templateGeometry) || !(a != null && a.setFlag) ? t : (await a.setFlag("mwd", Vi, {
    ...foundry.utils.deepClone(e),
    templateGeometry: si(t.templateGeometry)
  }), Oi(a));
}
async function lh({ attacker: a = null, attack: e = {}, targetResult: t = null } = {}) {
  var c, u, d, m, f, p, h, g, y, b, S, w;
  const i = (canvas == null ? void 0 : canvas.scene) ?? null;
  if (!i) return null;
  const n = ze(
    e == null ? void 0 : e.templateGeometry,
    {
      template: e == null ? void 0 : e.template,
      placement: e == null ? void 0 : e.templatePlacement
    }
  ), s = bi((e == null ? void 0 : e.areaEffect) ?? ((c = e == null ? void 0 : e.payload) == null ? void 0 : c.areaEffect) ?? {});
  if (s.kind !== Et.persistent || !n) return null;
  const r = gs(n);
  if (!r.length) return null;
  const o = {
    sourceActorUuid: (a == null ? void 0 : a.uuid) ?? null,
    sourceItemUuid: ((u = e == null ? void 0 : e.weapon) == null ? void 0 : u.uuid) ?? null,
    payloadId: ((d = e == null ? void 0 : e.payloadState) == null ? void 0 : d.activePayloadId) ?? ((m = e == null ? void 0 : e.payload) == null ? void 0 : m.id) ?? "",
    templateGeometry: si(n),
    templatePlacement: foundry.utils.deepClone((e == null ? void 0 : e.templatePlacement) ?? null),
    template: foundry.utils.deepClone((e == null ? void 0 : e.template) ?? null),
    damage: Number(((f = t == null ? void 0 : t.damage) == null ? void 0 : f.effectiveWeaponDamage) ?? ((p = e == null ? void 0 : e.weapon) == null ? void 0 : p.damage) ?? 0) || 0,
    ap: Number((e == null ? void 0 : e.totalAp) ?? ((h = e == null ? void 0 : e.weapon) == null ? void 0 : h.ap) ?? 0) || 0,
    damageType: String(((g = t == null ? void 0 : t.damage) == null ? void 0 : g.damageType) ?? ((y = e == null ? void 0 : e.weapon) == null ? void 0 : y.damageType) ?? "concussive").trim() || "concussive",
    label: `${String(((b = e == null ? void 0 : e.weapon) == null ? void 0 : b.name) ?? "Hazard").trim() || "Hazard"} (${Bt(((S = s.hazard) == null ? void 0 : S.startExposure) ?? "minor")})`,
    areaEffect: s,
    hazardDef: s.hazard
  }, [l] = await i.createEmbeddedDocuments("Region", [{
    name: o.label,
    color: ((w = game.user) == null ? void 0 : w.color) ?? "#d86a2c",
    shapes: r,
    flags: {
      mwd: {
        [Vi]: o
      }
    }
  }]);
  return l ?? null;
}
function Cl(a = null) {
  var s, r, o, l;
  const e = (a == null ? void 0 : a.document) ?? a ?? null;
  if (!e) return [];
  const t = (e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null;
  if (!t) return [];
  const i = ((s = e == null ? void 0 : e.object) == null ? void 0 : s.center) ?? (e == null ? void 0 : e.center) ?? {
    x: Number((e == null ? void 0 : e.x) ?? 0) + (Number((e == null ? void 0 : e.width) ?? 1) || 1) * (Number(((r = canvas == null ? void 0 : canvas.grid) == null ? void 0 : r.size) ?? 100) || 100) / 2,
    y: Number((e == null ? void 0 : e.y) ?? 0) + (Number((e == null ? void 0 : e.height) ?? 1) || 1) * (Number(((o = canvas == null ? void 0 : canvas.grid) == null ? void 0 : o.size) ?? 100) || 100) / 2
  }, n = {
    x: Number((i == null ? void 0 : i.x) ?? 0) || 0,
    y: Number((i == null ? void 0 : i.y) ?? 0) || 0,
    elevation: Number((e == null ? void 0 : e.elevation) ?? ((l = e == null ? void 0 : e.object) == null ? void 0 : l.elevation) ?? 0) || 0
  };
  return Array.from(t.regions ?? []).filter(oh).filter((c) => {
    var u, d, m;
    if ((d = (u = c == null ? void 0 : c.tokens) == null ? void 0 : u.has) != null && d.call(u, e)) return !0;
    try {
      return ((m = c == null ? void 0 : c.testPoint) == null ? void 0 : m.call(c, n)) ?? !1;
    } catch {
      return !1;
    }
  });
}
function wi(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function ch({ actor: a = null, token: e = null } = {}) {
  var s;
  const t = (e == null ? void 0 : e.document) ?? e ?? null, i = String(((s = t == null ? void 0 : t.texture) == null ? void 0 : s.src) ?? "").trim(), n = String((a == null ? void 0 : a.img) ?? "").trim();
  return i || n || "icons/svg/mystery-man.svg";
}
function uh(a = []) {
  return Array.isArray(a) ? a.map((e) => ({
    key: String((e == null ? void 0 : e.key) ?? "").trim(),
    label: String((e == null ? void 0 : e.label) ?? (e == null ? void 0 : e.key) ?? "").trim(),
    value: wi(e == null ? void 0 : e.value, 0)
  })).filter((e) => e.key) : [];
}
function Fo(a = {}) {
  var c, u, d;
  const e = (a == null ? void 0 : a.preview) ?? {}, t = Be(((c = a == null ? void 0 : a.exposure) == null ? void 0 : c.initialTier) ?? (a == null ? void 0 : a.exposureTier) ?? (a == null ? void 0 : a.tier), "none"), i = Be(
    ((u = a == null ? void 0 : a.exposure) == null ? void 0 : u.finalTier) ?? (e.evadeActive ? e.finalTier : t),
    t
  ), n = Li({
    tier: t,
    appliedTier: i,
    evadeUsed: !!(e.evadeActive && t !== i),
    evadeLocked: !!((a == null ? void 0 : a.evadeLocked) ?? ((d = a == null ? void 0 : a.exposure) == null ? void 0 : d.evadeLocked))
  }), s = Math.max(0, wi(a == null ? void 0 : a.baseDamage, 0)), r = Math.max(0, wi(a == null ? void 0 : a.damageBefore, Qi(s, n.initialTier))), o = Math.max(0, wi(a == null ? void 0 : a.damageAfter, Qi(s, n.finalTier))), l = (e == null ? void 0 : e.reactionPreview) ?? {};
  return {
    kind: String((a == null ? void 0 : a.kind) ?? "hazard").trim() || "hazard",
    eventType: String((a == null ? void 0 : a.eventType) ?? "entry").trim() || "entry",
    regionId: String((a == null ? void 0 : a.regionId) ?? "").trim(),
    regionName: String((a == null ? void 0 : a.regionName) ?? (a == null ? void 0 : a.label) ?? "Hazard").trim() || "Hazard",
    actorUuid: String((a == null ? void 0 : a.actorUuid) ?? "").trim() || null,
    tokenUuid: String((a == null ? void 0 : a.tokenUuid) ?? "").trim() || null,
    actorName: String((a == null ? void 0 : a.actorName) ?? "Target").trim() || "Target",
    turnsExposed: Math.max(0, wi(a == null ? void 0 : a.turnsExposed, 0)),
    baseDamage: s,
    ap: Math.max(0, wi(a == null ? void 0 : a.ap, 0)),
    damageType: Vt(a == null ? void 0 : a.damageType, "concussive"),
    damageTypeLabel: Yt((a == null ? void 0 : a.damageType) ?? "concussive") || "Damage",
    source: String((a == null ? void 0 : a.source) ?? (a == null ? void 0 : a.regionName) ?? "Hazard").trim() || "Hazard",
    applied: !!(a != null && a.applied),
    applyReason: String((a == null ? void 0 : a.applyReason) ?? "").trim(),
    onFullBurnDelta: Math.max(0, wi(a == null ? void 0 : a.onFullBurnDelta, 0)),
    exposure: n,
    damageBefore: r,
    damageAfter: o,
    nextTier: Be(a == null ? void 0 : a.nextTier, n.finalTier),
    nextLabel: Bt((a == null ? void 0 : a.nextTier) ?? n.finalTier),
    preview: {
      evadeActive: !!e.evadeActive,
      edgePoolKey: String(e.edgePoolKey ?? "").trim() || null,
      finalTier: n.finalTier,
      burnDelta: wi(l == null ? void 0 : l.burnDelta, 0),
      canSpendEdge: !!(l != null && l.canSpendEdge),
      edgePools: uh(l == null ? void 0 : l.edgePools)
    }
  };
}
function dh(a = {}, { actor: e = null, token: t = null } = {}) {
  const i = Fo(a), n = i.eventType === "tick" ? "Hazard Tick" : i.eventType === "exit" ? "Hazard Exit" : "Hazard Entry", s = i.exposure.initialLabel === i.exposure.finalLabel ? i.exposure.initialLabel : `${i.exposure.initialLabel} -> ${i.exposure.finalLabel}`, r = i.damageBefore === i.damageAfter ? String(i.damageAfter) : `${i.damageBefore} -> ${i.damageAfter}`;
  return {
    classes: [
      "mwd-chat-card",
      "mwd-hazard-card",
      `is-${i.exposure.finalTier}`,
      i.applied ? "is-applied" : ""
    ].filter(Boolean).join(" "),
    header: {
      left: i.regionName,
      right: n
    },
    target: {
      name: i.actorName,
      image: ch({ actor: e, token: t })
    },
    rows: [
      { label: "Exposure", value: s },
      { label: "Damage", value: r },
      { label: "Next Tier", value: i.nextLabel },
      { label: "Turns Exposed", value: String(i.turnsExposed) }
    ],
    reactionHint: i.exposure.evadeLocked ? "Evade is locked for this hazard." : i.preview.evadeActive ? i.preview.edgePoolKey ? "Evade active. Reaction Burn canceled by Edge." : i.preview.burnDelta > 0 ? `Evade active. This reaction adds +${i.preview.burnDelta} Burn.` : "Evade active." : "",
    actions: i.applied ? [] : mh(i)
  };
}
function mh(a = {}) {
  const e = [];
  if (!a.exposure.evadeLocked && a.exposure.initialTier !== "none" && e.push({
    action: "toggleHazardEvade",
    label: a.preview.evadeActive ? "Clear Evade" : "Use Reaction",
    cssClass: `mwd-target-row__action ${a.preview.evadeActive ? "is-active" : ""}`
  }), a.preview.evadeActive && a.preview.canSpendEdge)
    for (const t of a.preview.edgePools)
      e.push({
        action: "toggleHazardEvadeEdge",
        label: a.preview.edgePoolKey === t.key ? `Edge: ${t.label}` : `Use ${t.label}`,
        cssClass: `mwd-target-row__action ${a.preview.edgePoolKey === t.key ? "is-active" : ""}`,
        dataset: { "pool-key": t.key }
      });
  return e.push({
    action: "applyHazardTick",
    label: "Apply",
    cssClass: "mwd-target-row__action mwd-apply-attack-damage"
  }), e;
}
async function td(a = {}, { actor: e = null, token: t = null } = {}) {
  return foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-hazard-card",
    dh(a, { actor: e, token: t })
  );
}
const dt = "mwd", mt = "personalCombat", Hi = "preparedInterrupt", fh = "systems/mwd/img/icons/status/readied_action.svg", vi = 3, ph = 1, hh = 1;
function Tn(a, e) {
  return !(a != null && a.activation) || !e ? !1 : a.activation.combatId === e.combatId && Number(a.activation.round ?? -1) === Number(e.round ?? -1) && Number(a.activation.turn ?? -1) === Number(e.turn ?? -1) && a.activation.combatantId === e.combatantId;
}
function Uo(a = null) {
  return {
    saRemaining: vi,
    faRemaining: ph,
    raRemaining: hh,
    saSpentThisActivation: 0,
    burnThisActivation: 0,
    attacksThisActivation: 0,
    reactionBurnSinceLastActivation: 0,
    traitUsage: {
      activation: {},
      round: {}
    },
    actionState: {
      aim: null,
      move: null,
      preparedInterrupt: null
    },
    hazards: {},
    pendingReaction: null,
    actionLog: [],
    activation: a
  };
}
function $n(a, e = null) {
  return foundry.utils.mergeObject(
    Uo(e),
    foundry.utils.deepClone(a ?? {}),
    { inplace: !1, overwrite: !0 }
  );
}
function ca(a, e = null) {
  const t = $n(a ?? {}, (a == null ? void 0 : a.activation) ?? e);
  return t.actionLog = Qa(t.actionLog), t.hazards = as(t.hazards), t.pendingReaction = Bn(t.pendingReaction), t;
}
function as(a) {
  return !a || typeof a != "object" ? {} : Object.fromEntries(
    Object.entries(a).map(([e, t]) => {
      const i = String(e ?? "").trim();
      return !i || !t || typeof t != "object" ? null : [i, {
        tier: Be(t.tier, ne.none),
        turnsExposed: Math.max(0, Number(t.turnsExposed ?? 0) || 0),
        evadeLocked: !!t.evadeLocked,
        lastProcessedRound: Number(t.lastProcessedRound ?? 0) || 0
      }];
    }).filter(Boolean)
  );
}
function Bn(a) {
  if (!a || typeof a != "object") return null;
  const e = String(a.type ?? "").trim();
  return e ? {
    type: e,
    sourceKind: String(a.sourceKind ?? "").trim() || null,
    sourceId: String(a.sourceId ?? "").trim() || null,
    messageId: String(a.messageId ?? "").trim() || null,
    resultIndex: Number.isInteger(Number(a.resultIndex)) ? Number(a.resultIndex) : null,
    exposureBefore: Be(a.exposureBefore, ne.none),
    exposureAfterPreview: Be(a.exposureAfterPreview, ne.none),
    edgePoolKey: String(a.edgePoolKey ?? "").trim() || null,
    allowCurrentTurn: !!a.allowCurrentTurn
  } : null;
}
function Qa(a) {
  return Array.isArray(a) ? a.map((e) => {
    const t = String((e == null ? void 0 : e.label) ?? "").trim();
    return t ? {
      id: String((e == null ? void 0 : e.id) ?? "").trim(),
      label: t,
      costLabel: String((e == null ? void 0 : e.costLabel) ?? "").trim()
    } : null;
  }).filter(Boolean) : [];
}
function gh(a = []) {
  return Qa(a).filter((e) => {
    const t = xn(e == null ? void 0 : e.id);
    return (t == null ? void 0 : t.category) === Oe.reaction;
  });
}
function El(a = null, e = null) {
  const t = Uo(e);
  return t.reactionBurnSinceLastActivation = Math.max(0, Number((a == null ? void 0 : a.reactionBurnSinceLastActivation) ?? 0) || 0), t.actionLog = gh(a == null ? void 0 : a.actionLog), t.hazards = as(a == null ? void 0 : a.hazards), t;
}
function yh(a, e) {
  return a === "free" ? "Free" : a === "burn" ? `+${e} Burn` : `${e} ${String(a).toUpperCase()}`;
}
function bh(a = {}, e = "", { snapshot: t = null, metadata: i = {} } = {}) {
  var r, o, l, c;
  const n = foundry.utils.deepClone(a ?? {});
  n.actionState ?? (n.actionState = {});
  const s = {
    actionId: e,
    round: Number(((r = t == null ? void 0 : t.combat) == null ? void 0 : r.round) ?? 0),
    turn: Number(((o = t == null ? void 0 : t.combat) == null ? void 0 : o.turn) ?? 0),
    combatantId: ((l = t == null ? void 0 : t.combatant) == null ? void 0 : l.id) ?? null
  };
  return e === "aim" && (n.actionState.aim = {
    ...s,
    target: ((c = t == null ? void 0 : t.targeting) == null ? void 0 : c.target) ?? null
  }), e === "move" && (n.actionState.move = {
    ...s,
    moved: !0
  }), e === "prepare" && (n.actionState.preparedInterrupt = {
    ...s,
    condition: String((i == null ? void 0 : i.condition) ?? "").trim(),
    scope: String((i == null ? void 0 : i.scope) ?? "").trim()
  }), n;
}
function za(a = {}) {
  var n;
  const e = ((n = a == null ? void 0 : a.actionState) == null ? void 0 : n.preparedInterrupt) ?? null;
  if (!e) return null;
  const t = String((e == null ? void 0 : e.condition) ?? "").trim(), i = String((e == null ? void 0 : e.scope) ?? "").trim();
  return !t && !i ? null : {
    ...e,
    condition: t,
    scope: i
  };
}
function Sh(a = null) {
  if (!a) return "";
  const e = [];
  return a.condition && e.push(`Trigger: ${a.condition}`), a.scope && e.push(`Scope: ${a.scope}`), e.join(" | ");
}
function Pl() {
  return (CONFIG.statusEffects ?? []).find((a) => String((a == null ? void 0 : a.id) ?? "").trim() === Hi) ?? {
    id: Hi,
    name: "Prepared",
    icon: fh
  };
}
function Ah(a) {
  const e = (CONFIG.statusEffects ?? []).find((i) => String((i == null ? void 0 : i.id) ?? "").trim() === a), t = String((e == null ? void 0 : e.name) ?? (e == null ? void 0 : e.label) ?? a ?? "").trim();
  return Do(t);
}
function ua(a) {
  const e = Number(a);
  return !Number.isFinite(e) || e === 0 ? "0" : e > 0 ? `+${e}` : String(e);
}
function Th(a) {
  if (typeof a == "number") return Number.isFinite(a) ? a : 0;
  const e = String(a ?? "").trim().match(/[-+]?\d+(\.\d+)?/);
  return e ? Number(e[0]) : 0;
}
function Rl(a) {
  var o;
  const e = (a == null ? void 0 : a.document) ?? a ?? null, t = (a == null ? void 0 : a.object) ?? (e == null ? void 0 : e.object) ?? a ?? null, i = String((e == null ? void 0 : e.id) ?? "").trim(), n = B._pendingTokenPositions.get(i) ?? null, s = Number((n == null ? void 0 : n.x) ?? (e == null ? void 0 : e.x)), r = Number((n == null ? void 0 : n.y) ?? (e == null ? void 0 : e.y));
  if (t && Number.isFinite(s) && Number.isFinite(r)) {
    if (typeof t.getCenterPoint == "function")
      return t.getCenterPoint({ x: s, y: r });
    if (typeof t.getCenter == "function")
      return t.getCenter(s, r);
  }
  return (t == null ? void 0 : t.center) ?? ((o = e == null ? void 0 : e.object) == null ? void 0 : o.center) ?? null;
}
function wh(a, e = "") {
  if (!Number.isFinite(a)) return "";
  const t = Math.round(a * 10) / 10, i = Number.isInteger(t) ? String(t) : t.toFixed(1);
  return e ? `${i} ${e}` : i;
}
function Nl(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
function Qs(a) {
  return !!Oi(a);
}
function kh(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [];
  if (!e.length) return "";
  const t = e.slice().sort((n, s) => Ni(s == null ? void 0 : s.tier) - Ni(n == null ? void 0 : n.tier))[0] ?? null;
  if (!t) return "";
  const i = `HAZARD ${Bt(t.tier)} (${Math.max(0, Number(t.turnsExposed ?? 0) || 0)})`;
  return t.evadeLocked ? `${i} LOCK` : i;
}
const Sa = class Sa {
  static init() {
    var e;
    Hooks.on("updateCombat", (t, i) => this._onUpdateCombat(t, i)), Hooks.on("updateCombatant", (t, i) => this._onUpdateCombatant(t, i)), Hooks.on("updateToken", (t, i) => this._onUpdateToken(t, i)), Hooks.on("refreshToken", (t) => this._onRefreshToken(t)), Hooks.on("createCombatant", (t) => this._onCreateCombatant(t)), Hooks.on("deleteCombatant", (t) => this._onDeleteCombatant(t)), Hooks.on("deleteCombat", (t) => this._onDeleteCombat(t)), Hooks.on("createRegion", (t) => this._onCreateRegion(t)), Hooks.on("updateRegion", (t) => this._onUpdateRegion(t)), Hooks.on("deleteRegion", (t) => this._onDeleteRegion(t)), Hooks.on("targetToken", (t, i, n) => this._onTargetToken(t, i, n));
    for (const t of ["TOKEN_ENTER", "TOKEN_EXIT", "TOKEN_MOVE_IN", "TOKEN_MOVE_OUT"]) {
      const i = (e = CONST == null ? void 0 : CONST.REGION_EVENTS) == null ? void 0 : e[t];
      i && Hooks.on(i, (...n) => this._onRegionTokenEvent(...n));
    }
  }
  static async onReady() {
    var e;
    await this.ensureCurrentCombatantState(), await this.syncPreparedIndicators(), await this._syncAllSceneHazards(), (e = game.combat) != null && e.id && this._lastActivationByCombat.set(
      game.combat.id,
      this.getActivationIdentity(game.combat, game.combat.combatant)
    ), this.renderOpenCharacterSheets();
  }
  static _asTokenDocument(e) {
    return e ? (e == null ? void 0 : e.document) ?? e : null;
  }
  static _getTokenSceneId(e) {
    var i, n, s, r;
    const t = this._asTokenDocument(e);
    return ((i = t == null ? void 0 : t.parent) == null ? void 0 : i.id) ?? ((n = t == null ? void 0 : t.scene) == null ? void 0 : n.id) ?? ((r = (s = t == null ? void 0 : t.object) == null ? void 0 : s.scene) == null ? void 0 : r.id) ?? null;
  }
  static _getSceneTokenDocumentById(e, t = ((i) => (i = canvas == null ? void 0 : canvas.scene) == null ? void 0 : i.id)()) {
    var r, o, l, c, u;
    const n = String(e ?? "").trim();
    if (!n || !t) return null;
    const s = ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id) === t ? canvas.scene : (l = (o = game.scenes) == null ? void 0 : o.get) == null ? void 0 : l.call(o, t);
    return ((u = (c = s == null ? void 0 : s.tokens) == null ? void 0 : c.get) == null ? void 0 : u.call(c, n)) ?? null;
  }
  static _getCombatantTokenDocument(e, t = ((i) => (i = canvas == null ? void 0 : canvas.scene) == null ? void 0 : i.id)()) {
    const n = this._asTokenDocument(e == null ? void 0 : e.token);
    return n && typeof n == "object" ? n : this._getSceneTokenDocumentById(this._getCombatantTokenId(e), t);
  }
  static _getCombatantTokenId(e) {
    var t, i, n, s, r;
    return String(
      (e == null ? void 0 : e.tokenId) ?? ((t = e == null ? void 0 : e.token) == null ? void 0 : t.id) ?? ((i = e == null ? void 0 : e.token) == null ? void 0 : i._id) ?? ((s = (n = e == null ? void 0 : e.token) == null ? void 0 : n.document) == null ? void 0 : s.id) ?? ((r = e == null ? void 0 : e._source) == null ? void 0 : r.tokenId) ?? ""
    ).trim();
  }
  static _getCombatantActorId(e) {
    var i, n, s, r;
    const t = this._asTokenDocument(e == null ? void 0 : e.token);
    return String(
      (e == null ? void 0 : e.actorId) ?? ((i = e == null ? void 0 : e.actor) == null ? void 0 : i.id) ?? ((n = e == null ? void 0 : e._source) == null ? void 0 : n.actorId) ?? (t == null ? void 0 : t.actorId) ?? ((s = t == null ? void 0 : t.actor) == null ? void 0 : s.id) ?? ((r = t == null ? void 0 : t.baseActor) == null ? void 0 : r.id) ?? ""
    ).trim();
  }
  static _getCombatants(e) {
    return e != null && e.combatants ? typeof e.combatants.values == "function" ? Array.from(e.combatants.values()) : Array.from(e.combatants ?? []) : [];
  }
  static _getCombatSceneId(e) {
    var t, i, n;
    return String(
      ((t = e == null ? void 0 : e.scene) == null ? void 0 : t.id) ?? (e == null ? void 0 : e.sceneId) ?? ((i = e == null ? void 0 : e._source) == null ? void 0 : i.scene) ?? ((n = e == null ? void 0 : e._source) == null ? void 0 : n.sceneId) ?? ""
    ).trim();
  }
  static _getCombatantSceneId(e) {
    var i, n, s, r, o;
    const t = this._asTokenDocument(e == null ? void 0 : e.token);
    return String(
      (e == null ? void 0 : e.sceneId) ?? ((i = e == null ? void 0 : e._source) == null ? void 0 : i.sceneId) ?? ((n = t == null ? void 0 : t.parent) == null ? void 0 : n.id) ?? ((s = t == null ? void 0 : t.scene) == null ? void 0 : s.id) ?? ((o = (r = t == null ? void 0 : t.object) == null ? void 0 : r.scene) == null ? void 0 : o.id) ?? ""
    ).trim();
  }
  static _findCombatantForToken(e, t = null, i = ((n) => (n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.id)()) {
    var l, c, u;
    const s = this._asTokenDocument(t), r = String((s == null ? void 0 : s.id) ?? "").trim();
    if (!e || !r) return null;
    if (((c = (l = s == null ? void 0 : s.combatant) == null ? void 0 : l.combat) == null ? void 0 : c.id) === e.id) return s.combatant;
    let o = null;
    if (typeof e.getCombatantsByToken == "function")
      try {
        o = ((u = e.getCombatantsByToken(r)) == null ? void 0 : u[0]) ?? null;
      } catch {
        o = null;
      }
    else if (typeof e.getCombatantByToken == "function")
      try {
        o = e.getCombatantByToken(r) ?? null;
      } catch {
        o = null;
      }
    return o || (this._getCombatants(e).find((d) => {
      const m = this._getCombatantTokenDocument(d, i), f = this._getCombatantTokenId(d) || String((m == null ? void 0 : m.id) ?? "").trim(), p = this._getCombatantSceneId(d) || i;
      return f === r && (!i || !p || p === i);
    }) ?? null);
  }
  static _collectActorIds(e, t = null) {
    var r, o;
    const i = /* @__PURE__ */ new Set(), n = (l) => {
      const c = String(l ?? "").trim();
      c && i.add(c);
    };
    n(e == null ? void 0 : e.id), n(e == null ? void 0 : e._id);
    const s = this._asTokenDocument(t) ?? this._asTokenDocument(e == null ? void 0 : e.token);
    return n((r = s == null ? void 0 : s.actor) == null ? void 0 : r.id), n((o = s == null ? void 0 : s.baseActor) == null ? void 0 : o.id), n(s == null ? void 0 : s.actorId), i;
  }
  static _tokenDocumentMatchesActor(e, t, i = null) {
    var r, o;
    const n = this._asTokenDocument(e);
    if (!n || !t) return !1;
    const s = i ?? this._collectActorIds(t, n);
    return [
      (r = n == null ? void 0 : n.actor) == null ? void 0 : r.id,
      (o = n == null ? void 0 : n.baseActor) == null ? void 0 : o.id,
      n == null ? void 0 : n.actorId
    ].some((l) => s.has(String(l ?? "").trim()));
  }
  static getPreferredTokenDocument(e) {
    var n, s;
    if (!e) return null;
    const t = this._asTokenDocument(e == null ? void 0 : e.token);
    return t || (((s = (((n = e.getActiveTokens) == null ? void 0 : n.call(e, !0, !0)) ?? [])[0]) == null ? void 0 : s.document) ?? null);
  }
  static getPreferredToken(e) {
    const t = this.getPreferredTokenDocument(e);
    return t ? t.object ?? this._getSceneTokenById(t.id) : null;
  }
  static getCurrentSceneTokenDocument(e, t = null) {
    var p, h, g, y;
    const i = (p = canvas == null ? void 0 : canvas.scene) == null ? void 0 : p.id, n = this._asTokenDocument(t);
    if (this._getTokenSceneId(n) === i) return n;
    const s = String((n == null ? void 0 : n.id) ?? (t == null ? void 0 : t.id) ?? "").trim();
    if (s) {
      const b = this._getSceneTokenDocumentById(s, i);
      if (b) return b;
    }
    const r = this.getPreferredTokenDocument(e);
    if (this._getTokenSceneId(r) === i) return r;
    const o = String((r == null ? void 0 : r.id) ?? "").trim();
    if (o) {
      const b = this._getSceneTokenDocumentById(o, i);
      if (b) return b;
    }
    const c = ((g = (((h = e == null ? void 0 : e.getActiveTokens) == null ? void 0 : h.call(e, !0, !0)) ?? []).find((b) => {
      var S, w;
      return ((w = (S = b == null ? void 0 : b.document) == null ? void 0 : S.parent) == null ? void 0 : w.id) === i;
    })) == null ? void 0 : g.document) ?? null;
    if (c) return c;
    const u = Array.from(((y = canvas == null ? void 0 : canvas.scene) == null ? void 0 : y.tokens) ?? []), d = this._collectActorIds(e, r), m = u.filter((b) => this._tokenDocumentMatchesActor(b, e, d));
    return m.find((b) => {
      var S, w, M;
      return ((S = b == null ? void 0 : b.combatant) == null ? void 0 : S.id) === ((M = (w = game.combat) == null ? void 0 : w.combatant) == null ? void 0 : M.id);
    }) ?? null ?? m[0] ?? null;
  }
  static getCurrentSceneToken(e, t = null) {
    const i = this.getCurrentSceneTokenDocument(e, t);
    return i ? i.object ?? this._getSceneTokenById(i.id) : null;
  }
  static _getSceneTokenById(e) {
    var t, i, n, s;
    return e ? ((i = (t = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : t.get) == null ? void 0 : i.call(t, e)) ?? ((s = (n = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : n.placeables) == null ? void 0 : s.find((r) => r.id === e)) ?? null : null;
  }
  static _measureTokenDistance(e, t) {
    var o, l;
    const i = canvas == null ? void 0 : canvas.grid, n = Rl(e), s = Rl(t);
    if (!i || !n || !s) return null;
    if (typeof i.measurePath == "function")
      try {
        const c = i.measurePath([n, s], { gridSpaces: !0 }), u = Number(
          (c == null ? void 0 : c.distance) ?? (c == null ? void 0 : c.cost) ?? (c == null ? void 0 : c.totalDistance) ?? (c == null ? void 0 : c.totalCost) ?? NaN
        );
        if (Number.isFinite(u)) return u;
      } catch {
      }
    const r = ((l = (o = foundry == null ? void 0 : foundry.canvas) == null ? void 0 : o.geometry) == null ? void 0 : l.Ray) ?? globalThis.Ray;
    if (typeof i.measureDistances == "function" && typeof r == "function")
      try {
        const c = i.measureDistances([{ ray: new r(n, s) }], { gridSpaces: !0 }), u = Number(Array.isArray(c) ? c[0] : NaN);
        if (Number.isFinite(u)) return u;
      } catch {
        return null;
      }
    return null;
  }
  static getUserTargetTokens(e = game.user) {
    var n;
    const i = (Array.isArray((n = e == null ? void 0 : e.targets) == null ? void 0 : n.ids) ? e.targets.ids : []).map((s) => this._getSceneTokenById(s)).filter(Boolean);
    return i.length ? i : Array.from((e == null ? void 0 : e.targets) ?? []).map((s) => (s == null ? void 0 : s.object) ?? s).filter(Boolean);
  }
  static getTargetingSnapshot(e = null, t = game.user) {
    var u, d, m, f, p, h, g, y;
    const i = this.getUserTargetTokens(t), n = i.length;
    if (n === 0)
      return {
        count: 0,
        none: !0,
        single: !1,
        multiple: !1,
        heading: "Target",
        primaryLabel: "No target selected",
        detailRows: [],
        target: null
      };
    if (n > 1)
      return {
        count: n,
        none: !1,
        single: !1,
        multiple: !0,
        heading: "Targets",
        primaryLabel: `${n} selected`,
        detailRows: [],
        target: null
      };
    const s = i[0], r = this._measureTokenDistance(e, s), o = String(((d = (u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.grid) == null ? void 0 : d.units) ?? ((f = (m = game.system) == null ? void 0 : m.grid) == null ? void 0 : f.units) ?? "").trim(), l = wh(r, o), c = String((s == null ? void 0 : s.name) ?? ((p = s == null ? void 0 : s.actor) == null ? void 0 : p.name) ?? "Target").trim() || "Target";
    return {
      count: n,
      none: !1,
      single: !0,
      multiple: !1,
      heading: "Target",
      primaryLabel: c,
      detailRows: l ? [{ label: "Distance", value: l }] : [],
      target: {
        id: (s == null ? void 0 : s.id) ?? null,
        name: c,
        img: ((g = (h = s == null ? void 0 : s.document) == null ? void 0 : h.texture) == null ? void 0 : g.src) ?? ((y = s == null ? void 0 : s.texture) == null ? void 0 : y.src) ?? "",
        distance: Number.isFinite(r) ? r : null,
        distanceLabel: l
      }
    };
  }
  static getRollImpact(e = []) {
    const t = (Array.isArray(e) ? e : []).map((n) => {
      const s = Th((n == null ? void 0 : n.numericValue) ?? (n == null ? void 0 : n.value) ?? 0);
      return {
        label: String((n == null ? void 0 : n.label) ?? "").trim() || "Modifier",
        numericValue: s,
        value: String((n == null ? void 0 : n.value) ?? ua(s)).trim() || ua(s)
      };
    }), i = t.reduce((n, s) => n + s.numericValue, 0);
    return {
      total: i,
      totalLabel: ua(i),
      entries: t
    };
  }
  static getCombat(e, t = null) {
    var h;
    const i = (h = canvas == null ? void 0 : canvas.scene) == null ? void 0 : h.id, n = game.combat, s = this._getCombatSceneId(n), o = !!this._asTokenDocument(t), l = this.getCurrentSceneTokenDocument(e, t), c = (l == null ? void 0 : l.object) ?? this._getSceneTokenById((l == null ? void 0 : l.id) ?? null);
    if (!n || s && i && s !== i)
      return {
        combat: null,
        combatant: null,
        token: c,
        tokenDocument: l
      };
    let u = this._findCombatantForToken(n, l, i);
    const d = this._getCombatants(n);
    if (!u) {
      const g = this._collectActorIds(e, l), y = String((l == null ? void 0 : l.id) ?? "").trim(), b = d.filter((M) => {
        const P = this._getCombatantTokenId(M), E = this._getCombatantTokenDocument(M, i), z = P || String((E == null ? void 0 : E.id) ?? "").trim();
        return o && y ? z === y : g.has(this._getCombatantActorId(M)) ? !0 : this._tokenDocumentMatchesActor(E, e, g);
      }), S = b.find((M) => {
        var P;
        return M.id === ((P = n == null ? void 0 : n.combatant) == null ? void 0 : P.id);
      }) ?? null;
      u = b.find(
        (M) => {
          var P;
          return y && (this._getCombatantTokenId(M) || String(((P = this._getCombatantTokenDocument(M, i)) == null ? void 0 : P.id) ?? "").trim()) === y;
        }
      ) ?? null ?? S ?? b[0] ?? null;
    }
    const m = this._getCombatantTokenDocument(u, i), f = l ?? m ?? null, p = c ?? (m == null ? void 0 : m.object) ?? this._getSceneTokenById(this._getCombatantTokenId(u)) ?? null;
    return {
      combat: n,
      combatant: u,
      token: p,
      tokenDocument: f
    };
  }
  static getSnapshot(e, { token: t = null } = {}) {
    var E, z, Y, Q, G;
    const {
      combat: i,
      combatant: n,
      token: s,
      tokenDocument: r
    } = this.getCombat(e, t), o = !!n && ((E = i == null ? void 0 : i.combatant) == null ? void 0 : E.id) === n.id, l = n ? this.getActivationIdentity(i, n) : null, c = n ? n.getFlag(dt, mt) : null, u = n ? o ? Tn(c, l) ? ca(c, l) : El(c, l) : ca(c, l) : Uo(l);
    u.actionLog = Qa(u.actionLog);
    const d = Math.max(0, Number(((Y = (z = e == null ? void 0 : e.system) == null ? void 0 : z.burn) == null ? void 0 : Y.value) ?? 0)), m = Math.floor(d / 2), f = !!((G = (Q = e == null ? void 0 : e.system) == null ? void 0 : Q.burn) != null && G.overloaded), p = za(u), h = this.getActiveStatuses(e), g = h.filter(
      (q) => !(f && q.id === "overloaded") && q.id !== Hi
    ), y = this.getModifierSummary(e, m), b = this.getRollImpact(y), S = Math.max(0, Number(u.burnThisActivation ?? 0)), w = n ? o ? "" : "Waiting for this combatant's activation." : "No combatant on the current scene.", M = [];
    f && M.push({ id: "overloaded", label: "Overloaded" }), p && M.push({
      id: "preparedInterrupt",
      label: "Prepared",
      hint: Sh(p)
    });
    const P = Object.entries(u.hazards ?? {});
    if (P.length) {
      const q = P.map(([, L]) => L).sort((L, U) => Ni(U == null ? void 0 : U.tier) - Ni(L == null ? void 0 : L.tier))[0] ?? null;
      q && M.push({
        id: "hazard",
        label: `Hazard ${Bt(q.tier)}`,
        hint: `${P.length} active hazard${P.length === 1 ? "" : "s"}`
      });
    }
    return {
      token: s,
      tokenDocument: r,
      combat: i,
      combatant: n,
      hasCombatant: !!n,
      isCurrentTurn: o,
      overloaded: f,
      burn: {
        value: d,
        penalty: m,
        canOverloadCheck: d >= 6 && !f
      },
      state: u,
      hazards: u.hazards ?? {},
      pendingReaction: u.pendingReaction ?? null,
      preparedInterrupt: p,
      targeting: this.getTargetingSnapshot(s),
      states: M,
      effects: g,
      statuses: h,
      rollImpact: b,
      summaryText: `SA: ${u.saRemaining} / ${vi}   FA: ${u.faRemaining}   RA: ${u.raRemaining}`,
      activation: {
        burnThisActivation: S,
        burnThisActivationLabel: `+${S}`,
        items: [
          { label: "SA", value: `${u.saRemaining}/${vi}` },
          { label: "FA", value: String(u.faRemaining) },
          { label: "RA", value: String(u.raRemaining) },
          { label: "Burn", value: `+${S}`, detail: "this activation" }
        ]
      },
      inactiveReason: w,
      modifierSummary: y
    };
  }
  static getAvailableReactionEdgePools(e) {
    var t, i;
    return (t = e == null ? void 0 : e.hasEdgePools) != null && t.call(e) ? (((i = e.getEdgePoolSummary) == null ? void 0 : i.call(e).pools) ?? []).filter((n) => Number((n == null ? void 0 : n.effectiveValue) ?? 0) > 0).map((n) => ({
      key: String(n.key ?? "").trim(),
      label: String(n.key ?? "").trim(),
      value: Number(n.effectiveValue ?? 0)
    })).filter((n) => n.key) : [];
  }
  static getReactionSpendPreview(e, { token: t = null, edgePoolKey: i = "" } = {}) {
    var u;
    const n = this.getSnapshot(e, { token: t }), s = Number(((u = n.state) == null ? void 0 : u.raRemaining) ?? 0) > 0, r = this.getAvailableReactionEdgePools(e), o = String(i ?? "").trim(), l = !s && r.some((d) => d.key === o);
    return {
      snapshot: n,
      usesReaction: s,
      burnDelta: s || l ? 0 : 2,
      canSpendEdge: !s && r.length > 0,
      edgePools: r,
      edgePoolKey: l ? o : null,
      costLabel: s ? "1 RA" : l ? `1 Edge (${o})` : "+2 Burn"
    };
  }
  static async commitReactionSpend(e, {
    token: t = null,
    actionId: i = "",
    actionLabel: n = "",
    actionCategory: s = Oe.reaction,
    logLabel: r = "",
    edgePoolKey: o = "",
    allowCurrentTurn: l = !1
  } = {}) {
    var h, g, y, b, S;
    const c = this.getReactionSpendPreview(e, { token: t, edgePoolKey: o }), u = c.snapshot;
    if (!u.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!l && u.isCurrentTurn) return { ok: !1, reason: "Only outside your activation." };
    const d = ca(u.combatant.getFlag(dt, mt), (h = u.state) == null ? void 0 : h.activation), m = {
      combat: u.combat,
      combatant: u.combatant,
      state: d,
      sceneId: ((g = canvas == null ? void 0 : canvas.scene) == null ? void 0 : g.id) ?? "",
      snapshot: { ...u, state: d }
    };
    let f = 0, p = null;
    if (c.usesReaction)
      d.raRemaining = Math.max(0, Number(d.raRemaining ?? 0) - 1);
    else {
      const w = c.edgePoolKey ? 0 : 2, M = xt({
        actor: e,
        phase: "onBeforeBurnApplied",
        facts: Ln({
          actor: e,
          packet: {
            actionId: i,
            category: s,
            resource: "reaction",
            amount: w,
            source: "reaction"
          },
          runtime: m
        }),
        packet: {
          actionId: i,
          category: s,
          resource: "reaction",
          amount: w,
          source: "reaction"
        },
        options: { runtime: m, consumeUsage: !0 }
      });
      m.pendingMutations = (m.pendingMutations ?? []).concat(M.mutations), f = Math.max(0, Number(M.packet.amount ?? w) || 0), c.edgePoolKey ? (await e.spendEdge(c.edgePoolKey, 1, { source: "reactionBurnCancel" }), p = c.edgePoolKey) : f > 0 && (d.reactionBurnSinceLastActivation = Math.max(
        0,
        Number(d.reactionBurnSinceLastActivation ?? 0) + f
      ));
    }
    return this._appendActionLog(d, {
      id: i,
      label: r || n,
      costLabel: c.costLabel
    }), (y = m.pendingMutations) != null && y.length ? await yi({ actor: e, mutations: m.pendingMutations, runtime: m }) : await u.combatant.setFlag(dt, mt, d), f > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((S = (b = e.system) == null ? void 0 : b.burn) == null ? void 0 : S.value) ?? 0) + f) }), {
      ok: !0,
      snapshot: this.getSnapshot(e, { token: t }),
      costLabel: c.costLabel,
      burnDelta: f,
      spentEdgePoolKey: p,
      usedReaction: c.usesReaction
    };
  }
  static async updateCombatantState(e, { token: t = null, mutate: i = null } = {}) {
    var o;
    const n = this.getSnapshot(e, { token: t });
    if (!(n != null && n.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const s = ca(n.combatant.getFlag(dt, mt), (o = n.state) == null ? void 0 : o.activation), r = typeof i == "function" ? i(s, n) ?? s : s;
    return await n.combatant.setFlag(dt, mt, r), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) };
  }
  static async setPendingReaction(e, { token: t = null, pendingReaction: i = null } = {}) {
    return this.updateCombatantState(e, {
      token: t,
      mutate: (n) => (n.pendingReaction = Bn(i), n)
    });
  }
  static async clearPendingReaction(e, { token: t = null } = {}) {
    return this.setPendingReaction(e, { token: t, pendingReaction: null });
  }
  static async setHazardState(e, { token: t = null, regionId: i = "", hazardState: n = null } = {}) {
    const s = String(i ?? "").trim();
    return s ? this.updateCombatantState(e, {
      token: t,
      mutate: (r) => (r.hazards ?? (r.hazards = {}), n ? r.hazards[s] = as({ [s]: n })[s] : delete r.hazards[s], r)
    }) : { ok: !1, reason: "Hazard region id is required." };
  }
  static getModifierSummary(e, t = Math.floor(Number(((n) => (n = ((i) => (i = e == null ? void 0 : e.system) == null ? void 0 : i.burn)()) == null ? void 0 : n.value)() ?? 0) / 2)) {
    var c, u;
    const s = ((u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.derived) == null ? void 0 : u.condition) ?? {}, r = [];
    t > 0 && r.push({
      label: "Burn Penalty",
      numericValue: -t,
      value: ua(-t)
    });
    const o = Number(s.fatiguePenalty ?? 0);
    o && r.push({
      label: "Fatigue",
      numericValue: o,
      value: ua(o)
    });
    const l = Number(s.physicalPenalty ?? 0);
    return l && r.push({
      label: "Physical",
      numericValue: l,
      value: ua(l)
    }), r.length || r.push({
      label: "Current Modifiers",
      numericValue: 0,
      value: "0"
    }), r;
  }
  static getActiveStatuses(e) {
    return Array.from((e == null ? void 0 : e.statuses) ?? []).map((i) => ({
      id: i,
      label: Ah(i)
    })).sort((i, n) => i.label.localeCompare(n.label));
  }
  static buildActionModel(e, t) {
    var o, l, c, u;
    const i = (d) => {
      const m = _o(d), f = Dp(d);
      return !f || !m ? null : {
        id: d,
        label: m.label,
        handler: "roll",
        roll: JSON.stringify(f),
        disabled: !1,
        reason: ""
      };
    }, n = (d) => {
      const m = sh(d).filter((f) => f.id !== "overloadCheck").filter((f) => !(d === Oe.recovery && f.id === "reduceBurn"));
      if (d === Oe.standard) {
        const f = xn("reduceBurn");
        f && !m.some((p) => p.id === "reduceBurn") && m.push(f);
      }
      return m.map((f) => this._buildCatalogAction(e, t, f));
    }, s = (d) => {
      const m = xn(d);
      if (!m) return null;
      const f = this._buildCatalogAction(e, t, m);
      return f.disabled ? null : f;
    }, r = (o = t.burn) != null && o.canOverloadCheck ? s("overloadCheck") : null;
    return {
      utilityButtons: [
        {
          id: "initiative",
          label: "Initiative",
          handler: "roll",
          roll: JSON.stringify({ intent: "initiative" }),
          disabled: !1,
          reason: ""
        },
        {
          id: "statuses",
          label: "Statuses",
          handler: "toggleStatuses",
          disabled: !1,
          reason: t.token ? "" : "Requires a token on the current scene."
        },
        i("composure"),
        i("judgeIntent"),
        i("memory"),
        i("lift"),
        i("endure")
      ].filter(Boolean),
      summaryPills: [
        { label: "SA", value: `${t.state.saRemaining}/${vi}` },
        { label: "Cap", value: `${Math.max(0, Number(((l = t.state) == null ? void 0 : l.saSpentThisActivation) ?? 0))}/${Dr(e)}` },
        { label: "FA", value: `${t.state.faRemaining}` },
        { label: "RA", value: `${t.state.raRemaining}` },
        {
          label: "Burn/Turn",
          value: `+${Math.max(0, Number(((c = t.state) == null ? void 0 : c.burnThisActivation) ?? 0))}`,
          action: r
        }
      ],
      activationLog: Qa((u = t.state) == null ? void 0 : u.actionLog).map((d, m) => ({
        ...d,
        index: m + 1
      })),
      menus: [
        {
          id: "standard",
          label: "Standard Actions",
          actions: n(Oe.standard)
        },
        {
          id: "complex",
          label: "Complex Actions",
          actions: n(Oe.complex)
        },
        {
          id: "free",
          label: "Free Actions",
          actions: n(Oe.free)
        },
        {
          id: "reaction",
          label: "Reactions",
          actions: n(Oe.reaction)
        },
        {
          id: "burn",
          label: "Burn & Recovery",
          actions: n(Oe.recovery)
        }
      ].filter((d) => d.actions.length)
    };
  }
  static _buildCatalogAction(e, t, i) {
    const n = t.hasCombatant ? "" : "No current-scene combatant.", s = t.isCurrentTurn ? "" : "Only during your activation.", r = t.overloaded ? "Overloaded actors can only recover Burn." : "", o = wn(e, t), l = t.state ?? {}, c = i.category;
    let u = "sa", d = Number(i.cost ?? 0) || 0, m = yh(u, d), f = "";
    if (i.id === "reduceBurn")
      u = "sa", d = 1, m = "1 SA", f = n || s || (o <= 0 ? "Activation SA cap reached." : "") || (t.burn.value <= 0 ? "Burn is already at 0." : "");
    else if (i.id === "overloadCheck")
      u = "check", d = 0, m = "Check", f = n || s || (t.burn.canOverloadCheck ? "" : t.overloaded ? "Already Overloaded." : "Burn below 6.");
    else if (i.id === "interrupt") {
      const p = za(l);
      u = Number(l.raRemaining ?? 0) > 0 ? "ra" : "burn", d = u === "ra" ? 1 : 2, m = u === "ra" ? "1 RA" : "+2 Burn", f = n || (t.isCurrentTurn ? "Only outside your activation." : "") || (p ? "" : "Prepare an interrupt first.");
    } else if (i.id === "evade") {
      const p = Bn(l.pendingReaction), h = t.isCurrentTurn && !(p != null && p.allowCurrentTurn) ? "Only outside your activation." : "";
      u = Number(l.raRemaining ?? 0) > 0 ? "ra" : "burn", d = u === "ra" ? 1 : 2, m = u === "ra" ? "1 RA" : "+2 Burn", f = n || h || (p ? "" : "Use an area effect or hazard card to trigger Evade.");
    } else if (c === Oe.standard)
      f = n || s || r || (o < d ? "Activation SA cap reached." : "");
    else if (c === Oe.complex)
      f = n || s || r || (o < d ? "Activation SA cap reached." : "");
    else if (c === Oe.free) {
      const p = Number(l.faRemaining ?? 0) > 0;
      u = p ? "fa" : "sa", d = 1, m = p ? "Free" : "1 SA", f = n || s || !p && r || (!p && o < 1 ? "Activation SA cap reached." : "");
    } else if (c === Oe.reaction) {
      const p = Number(l.raRemaining ?? 0) > 0;
      u = p ? "ra" : "burn", d = p ? 1 : 2, m = p ? "1 RA" : "+2 Burn", f = n || (t.isCurrentTurn ? "Only outside your activation." : "");
    } else c === Oe.recovery && (f = n || s);
    return i.handler || (f = i.reason || "Not yet implemented."), {
      id: i.id,
      label: i.label,
      category: c,
      handler: i.handler,
      description: String(i.description ?? "").trim(),
      resource: u,
      cost: d,
      costLabel: m,
      disabled: !!f,
      reason: f,
      roll: i.roll ? JSON.stringify(i.roll) : "",
      prominent: !!(i.prominent || i.prominentWhenBurning && t.burn.value >= 6)
    };
  }
  static async executeAction(e, { token: t = null, actionId: i = "", metadata: n = {} } = {}) {
    const s = xn(i);
    return s ? s.handler ? s.category === Oe.standard ? this._executeStandardAction(e, { token: t, action: s, metadata: n }) : s.category === Oe.free ? this._executeFreeAction(e, { token: t, action: s, metadata: n }) : s.category === Oe.reaction ? this._executeReactionAction(e, { token: t, action: s, metadata: n }) : { ok: !1, reason: s.reason || "That action is not implemented yet." } : { ok: !1, reason: s.reason || "That action is not implemented yet." } : { ok: !1, reason: "Unknown combat action." };
  }
  static async _executeStandardAction(e, { token: t = null, action: i, metadata: n = {} } = {}) {
    const s = this.getSnapshot(e, { token: t });
    if (!s.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!s.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (s.overloaded) return { ok: !1, reason: "Overloaded actors can only recover Burn." };
    if (wn(e, s) < Number(i.cost ?? 1))
      return { ok: !1, reason: "Activation SA cap reached." };
    const r = await this.spendResource(e, {
      token: t,
      resource: "sa",
      cost: Number(i.cost ?? 1) || 1,
      actionId: i.id,
      actionLabel: i.label,
      actionCostLabel: `${Number(i.cost ?? 1) || 1} SA`,
      actionCategory: i.category
    });
    return r != null && r.ok ? (await this._applyActionState(e, {
      token: t,
      actionId: i.id,
      metadata: n,
      snapshot: r.snapshot
    }), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : r;
  }
  static async _executeFreeAction(e, { token: t = null, action: i, metadata: n = {} } = {}) {
    var l;
    const s = this.getSnapshot(e, { token: t });
    if (!s.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!s.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    const r = Number(((l = s.state) == null ? void 0 : l.faRemaining) ?? 0) > 0;
    if (!r && s.overloaded)
      return { ok: !1, reason: "Overloaded actors can only recover Burn." };
    if (!r && wn(e, s) < 1)
      return { ok: !1, reason: "Activation SA cap reached." };
    const o = await this.spendResource(e, {
      token: t,
      resource: r ? "fa" : "sa",
      cost: 1,
      actionId: i.id,
      actionLabel: i.label,
      actionCostLabel: r ? "Free" : "1 SA",
      actionCategory: i.category
    });
    return o != null && o.ok ? (await this._applyActionState(e, {
      token: t,
      actionId: i.id,
      metadata: n,
      snapshot: o.snapshot
    }), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : o;
  }
  static async _promptSpendEdgeForReaction(e) {
    var o, l, c;
    if (!((o = e.hasEdgePools) != null && o.call(e))) return null;
    const i = Object.keys(((c = (l = e.system) == null ? void 0 : l.counters) == null ? void 0 : c.edgePools) ?? {}).map((u) => e.getEdgePool(u)).filter((u) => u.hasPools && u.effectiveValue > 0);
    if (!i.length) return null;
    const n = (u) => String(u).charAt(0).toUpperCase() + String(u).slice(1);
    let s;
    i.length === 1 ? s = `<input type="hidden" name="poolKey" value="${i[0].key}">
        <p>from <strong>${n(i[0].key)}</strong> (${i[0].effectiveValue} available)</p>` : s = i.map((u, d) => `
        <label style="display:block">
          <input type="radio" name="poolKey" value="${u.key}" ${d === 0 ? "checked" : ""}>
          ${n(u.key)} &mdash; ${u.effectiveValue} available
        </label>
      `).join("");
    const r = `<p>This reaction costs <strong>+2 Burn</strong>. Spend 1 Edge to ignore it?</p><form>${s}</form>`;
    return Dialog.confirm({
      title: "Reaction: Spend Edge?",
      content: r,
      yes: (u) => {
        const d = u.find("[name='poolKey']:checked, [name='poolKey'][type='hidden']").first().val();
        return String(d ?? i[0].key).trim() || i[0].key;
      },
      no: () => null,
      defaultYes: !1
    });
  }
  static async _executeReactionAction(e, { token: t = null, action: i, metadata: n = {} } = {}) {
    var d, m;
    const s = this.getSnapshot(e, { token: t });
    if (!s.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    const r = Bn((d = s.state) == null ? void 0 : d.pendingReaction), o = i.id === "evade" && (r == null ? void 0 : r.allowCurrentTurn);
    if (s.isCurrentTurn && !o) return { ok: !1, reason: "Only outside your activation." };
    if (i.id === "interrupt" && !za(s.state))
      return { ok: !1, reason: "Prepare an interrupt first." };
    const l = i.id === "assist" && (n != null && n.targetName) ? `${i.label}: ${n.targetName}` : i.id === "interrupt" && (n != null && n.scope) ? `${i.label}: ${String(n.scope).trim()}` : i.label;
    let c = String((n == null ? void 0 : n.edgePoolKey) ?? "").trim();
    !c && Number(((m = s.state) == null ? void 0 : m.raRemaining) ?? 0) <= 0 && (c = await Sa._promptSpendEdgeForReaction(e) ?? "");
    const u = await this.commitReactionSpend(e, {
      token: t,
      actionId: i.id,
      actionLabel: i.label,
      actionCategory: i.category,
      logLabel: l,
      edgePoolKey: c,
      allowCurrentTurn: o
    });
    return u != null && u.ok ? { ...u, actionLabel: l } : u;
  }
  static async _applyActionState(e, { token: t = null, actionId: i = "", metadata: n = {}, snapshot: s = null } = {}) {
    const r = s ?? this.getSnapshot(e, { token: t });
    if (!(r != null && r.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const o = bh(r.state, i, {
      snapshot: r,
      metadata: n
    });
    return await r.combatant.setFlag(dt, mt, o), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) };
  }
  static async clearAim(e, { token: t = null } = {}) {
    var s;
    const i = this.getSnapshot(e, { token: t });
    if (!(i != null && i.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const n = ca(i.combatant.getFlag(dt, mt), (s = i.state) == null ? void 0 : s.activation);
    return n.actionState ?? (n.actionState = {}), n.actionState.aim ? (n.actionState.aim = null, await i.combatant.setFlag(dt, mt, n), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : { ok: !0, snapshot: i };
  }
  static getPreparedInterrupt(e = null) {
    const t = (e == null ? void 0 : e.state) ?? e ?? {};
    return za(t);
  }
  static async clearPreparedInterrupt(e, { token: t = null } = {}) {
    var s;
    const i = this.getSnapshot(e, { token: t });
    if (!(i != null && i.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const n = ca(i.combatant.getFlag(dt, mt), (s = i.state) == null ? void 0 : s.activation);
    return n.actionState ?? (n.actionState = {}), n.actionState.preparedInterrupt ? (n.actionState.preparedInterrupt = null, await i.combatant.setFlag(dt, mt, n), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : { ok: !0, snapshot: i };
  }
  static async _syncPreparedIndicatorForCombatant(e) {
    var u, d, m;
    if (!game.user.isGM || !e) return;
    const t = this._getCombatantSceneId(e) || ((u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.id), i = this._getCombatantTokenDocument(e, t), n = (i == null ? void 0 : i.actor) ?? (e == null ? void 0 : e.actor) ?? null;
    if (!i || !n) return;
    const s = e.getFlag(dt, mt), r = !!za(s), o = Pl(), l = String((o == null ? void 0 : o.id) ?? Hi).trim() || Hi;
    (((m = (d = n == null ? void 0 : n.statuses) == null ? void 0 : d.has) == null ? void 0 : m.call(d, l)) ?? !1) !== r && await n.toggleStatusEffect(l, { active: r, overlay: !1 });
  }
  static async syncPreparedIndicators(e = game.combat) {
    if (!(!game.user.isGM || !e))
      for (const t of this._getCombatants(e))
        await this._syncPreparedIndicatorForCombatant(t);
  }
  static async clearPreparedIndicatorForCombatant(e) {
    var o, l, c;
    if (!game.user.isGM || !e) return;
    const t = this._getCombatantSceneId(e) || ((o = canvas == null ? void 0 : canvas.scene) == null ? void 0 : o.id), i = this._getCombatantTokenDocument(e, t), n = (i == null ? void 0 : i.actor) ?? (e == null ? void 0 : e.actor) ?? null;
    if (!i || !n) return;
    const s = Pl(), r = String((s == null ? void 0 : s.id) ?? Hi).trim() || Hi;
    (((c = (l = n == null ? void 0 : n.statuses) == null ? void 0 : l.has) == null ? void 0 : c.call(l, r)) ?? !1) && await n.toggleStatusEffect(r, { active: !1, overlay: !1 });
  }
  static _buildSpendAction(e, t, i = "") {
    var l;
    const n = Number(((l = e.state) == null ? void 0 : l[`${t.resource}Remaining`]) ?? 0), s = t.resource === "sa" ? "" : n < t.cost ? `No ${String(t.resource).toUpperCase()} remaining.` : "", r = i || s, o = this._formatCostLabel(t.resource, t.cost);
    return {
      id: t.id,
      label: t.label,
      costLabel: o,
      handler: "combatSpend",
      resource: t.resource,
      cost: t.cost,
      disabled: !!r,
      reason: r,
      prominent: !1
    };
  }
  static _buildStubAction(e) {
    return {
      ...e,
      handler: "",
      disabled: !0,
      reason: "Not yet implemented."
    };
  }
  static _formatCostLabel(e, t) {
    return `${t} ${String(e).toUpperCase()}`;
  }
  static _appendActionLog(e, { id: t = "", label: i = "", costLabel: n = "" } = {}) {
    const s = String(i ?? "").trim();
    if (!s) return;
    const r = Qa(e == null ? void 0 : e.actionLog);
    r.push({
      id: String(t ?? "").trim(),
      label: s,
      costLabel: String(n ?? "").trim()
    }), e.actionLog = r;
  }
  static getActivationIdentity(e, t) {
    return {
      combatId: (e == null ? void 0 : e.id) ?? null,
      combatantId: (t == null ? void 0 : t.id) ?? null,
      round: Number((e == null ? void 0 : e.round) ?? 0),
      turn: Number((e == null ? void 0 : e.turn) ?? 0)
    };
  }
  static async ensureCurrentCombatantState() {
    var s, r;
    if (!game.user.isGM) return;
    const e = game.combat, t = e == null ? void 0 : e.combatant;
    if (!e || !t || ((s = e.scene) == null ? void 0 : s.id) !== ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id)) return;
    const i = this.getActivationIdentity(e, t), n = t.getFlag(dt, mt);
    Tn(n, i) || await t.setFlag(dt, mt, El(n, i));
  }
  static async spendResource(e, {
    token: t = null,
    resource: i = "sa",
    cost: n = 1,
    actionId: s = "",
    actionLabel: r = "",
    actionCostLabel: o = "",
    actionCategory: l = ""
  } = {}) {
    var S, w, M, P, E, z, Y;
    const c = this.getSnapshot(e, { token: t });
    if (!c.hasCombatant)
      return { ok: !1, reason: "No combatant on the current scene." };
    if (!c.isCurrentTurn)
      return { ok: !1, reason: "Only available during your activation." };
    const u = {
      combat: c.combat,
      combatant: c.combatant,
      state: $n(c.state, this.getActivationIdentity(c.combat, c.combatant)),
      sceneId: ((S = canvas == null ? void 0 : canvas.scene) == null ? void 0 : S.id) ?? "",
      snapshot: c
    };
    let d = Math.max(0, Number(n ?? 0) || 0);
    const m = xt({
      actor: e,
      phase: "onBeforeActionCostFinalized",
      facts: qu({
        actor: e,
        packet: { actionId: s, category: l, resource: i, cost: d, effectiveCost: d },
        runtime: u
      }),
      packet: { actionId: s, category: l, resource: i, cost: d, effectiveCost: d },
      options: { runtime: u, consumeUsage: !0 }
    });
    d = Math.max(0, Number(m.packet.cost ?? d) || 0), u.pendingMutations = (u.pendingMutations ?? []).concat(m.mutations);
    const f = `${i}Remaining`, p = Number(((w = c.state) == null ? void 0 : w[f]) ?? 0);
    if (i !== "sa" && p < d)
      return { ok: !1, reason: `No ${String(i).toUpperCase()} remaining.` };
    const h = u.state, g = i === "sa" ? Dr(e) : 0, y = Math.max(0, Number(((M = c.state) == null ? void 0 : M.saSpentThisActivation) ?? 0) || 0);
    if (i === "sa" && y + d > g)
      return { ok: !1, reason: "Activation SA cap reached." };
    h[f] = Math.max(0, p - d), i === "sa" && (h.saSpentThisActivation = y + d, s === "attack" && (h.attacksThisActivation = Number(h.attacksThisActivation ?? 0) + 1)), this._appendActionLog(h, {
      id: s,
      label: r,
      costLabel: o || this._formatCostLabel(i, d)
    });
    let b = 0;
    if (i === "sa") {
      const Q = Math.max(0, y - vi), G = Math.max(0, h.saSpentThisActivation - vi), q = Math.max(0, Number(((P = c.state) == null ? void 0 : P.attacksThisActivation) ?? 0) || 0), L = Math.max(0, Number(h.attacksThisActivation ?? 0) || 0);
      for (let U = Q + 1; U <= G; U += 1) {
        const V = xt({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: Ln({
            actor: e,
            packet: {
              actionId: s,
              category: l,
              resource: i,
              amount: 1,
              source: "extraSA",
              extraSaIndex: U
            },
            runtime: u
          }),
          packet: {
            actionId: s,
            category: l,
            resource: i,
            amount: 1,
            source: "extraSA",
            extraSaIndex: U
          },
          options: { runtime: u, consumeUsage: !0 }
        });
        u.pendingMutations = (u.pendingMutations ?? []).concat(V.mutations), b += Math.max(0, Number(V.packet.amount ?? 0) || 0);
      }
      for (let U = q + 1; U <= L; U += 1) {
        if (U <= 1) continue;
        const V = xt({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: Ln({
            actor: e,
            packet: {
              actionId: s,
              category: l,
              resource: i,
              amount: 1,
              source: "attack"
            },
            runtime: u
          }),
          packet: {
            actionId: s,
            category: l,
            resource: i,
            amount: 1,
            source: "attack",
            attackIndex: U
          },
          options: { runtime: u, consumeUsage: !0 }
        });
        u.pendingMutations = (u.pendingMutations ?? []).concat(V.mutations), b += Math.max(0, Number(V.packet.amount ?? 0) || 0);
      }
      h.burnThisActivation = Math.max(0, Number(h.burnThisActivation ?? 0) + b);
    }
    return (E = u.pendingMutations) != null && E.length ? await yi({
      actor: e,
      mutations: u.pendingMutations,
      runtime: {
        ...u,
        state: h
      }
    }) : await c.combatant.setFlag(dt, mt, h), b > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((Y = (z = e.system) == null ? void 0 : z.burn) == null ? void 0 : Y.value) ?? 0) + b) }), { ok: !0, snapshot: this.getSnapshot(e, { token: c.token }) };
  }
  static async reduceBurn(e, { token: t = null } = {}) {
    var o, l, c, u;
    const i = this.getSnapshot(e, { token: t });
    if (!i.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!i.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (wn(e, i) <= 0) return { ok: !1, reason: "Activation SA cap reached." };
    if (i.burn.value <= 0) return { ok: !1, reason: "Burn is already at 0." };
    const n = await this.spendResource(e, {
      token: i.token,
      resource: "sa",
      cost: 1,
      actionId: "reduceBurn",
      actionLabel: "Reduce Burn",
      actionCostLabel: "1 SA",
      actionCategory: Oe.standard
    });
    if (!n.ok) return n;
    const s = Math.max(0, Number(((l = (o = e.system) == null ? void 0 : o.burn) == null ? void 0 : l.value) ?? 0) - 1), r = { "system.burn.value": s };
    return s === 0 && ((u = (c = e.system) == null ? void 0 : c.burn) != null && u.overloaded) && (r["system.burn.overloaded"] = !1), await e.update(r), { ok: !0, snapshot: this.getSnapshot(e, { token: i.token }) };
  }
  static async finalizeActivation(e, t) {
    var m, f, p, h, g, y, b, S;
    if (!game.user.isGM || !t || !e) return;
    const i = ((f = (m = e.combatants) == null ? void 0 : m.get) == null ? void 0 : f.call(m, t)) ?? null, n = (i == null ? void 0 : i.actor) ?? null;
    if (!i || !n) return;
    const s = i.getFlag(dt, mt), r = Tn(s, this.getActivationIdentity(e, i)) ? $n(s, this.getActivationIdentity(e, i)) : $n(s), l = {
      burnDelta: Number(r.saSpentThisActivation ?? 0) <= vi && Number(r.burnThisActivation ?? 0) <= 0 && Number(r.reactionBurnSinceLastActivation ?? 0) <= 0 ? -2 : 0,
      edgeAdjustments: []
    }, c = {
      combat: e,
      combatant: i,
      state: r,
      sceneId: ((p = e.scene) == null ? void 0 : p.id) ?? ((h = canvas == null ? void 0 : canvas.scene) == null ? void 0 : h.id) ?? ""
    }, u = xt({
      actor: n,
      phase: "onEndOfActivation",
      facts: Qu({ actor: n, packet: l, runtime: c }),
      packet: l,
      options: { runtime: c, consumeUsage: !0 }
    });
    await yi({ actor: n, mutations: u.mutations, runtime: c });
    const d = Number(u.packet.burnDelta ?? l.burnDelta) || 0;
    if (d) {
      const w = Math.max(0, Number(((y = (g = n.system) == null ? void 0 : g.burn) == null ? void 0 : y.value) ?? 0) + d), M = { "system.burn.value": w };
      w === 0 && ((S = (b = n.system) == null ? void 0 : b.burn) != null && S.overloaded) && (M["system.burn.overloaded"] = !1), await n.update(M);
    }
    for (const w of u.packet.edgeAdjustments ?? []) {
      const M = Number((w == null ? void 0 : w.amount) ?? 0) || 0;
      !M || !(w != null && w.poolKey) || (M > 0 ? await n.gainEdge(w.poolKey, M, { skipTraitHooks: !0, source: "endOfActivationTrait" }) : await n.spendEdge(w.poolKey, Math.abs(M), { skipTraitHooks: !0, source: "endOfActivationTrait" }));
    }
  }
  static async _onUpdateCombat(e, t) {
    if (Object.prototype.hasOwnProperty.call(t ?? {}, "turn") || Object.prototype.hasOwnProperty.call(t ?? {}, "round")) {
      const n = this._lastActivationByCombat.get(e == null ? void 0 : e.id) ?? null, s = typeof n == "string" ? n : (n == null ? void 0 : n.combatantId) ?? null, r = this.getActivationIdentity(e, e == null ? void 0 : e.combatant), o = n && typeof n == "object" ? !Tn(n, r) : s && s !== r.combatantId;
      s && o && await this.finalizeActivation(e, s), await this.ensureCurrentCombatantState(), await this._processCurrentCombatantHazards(e), e != null && e.id && this._lastActivationByCombat.set(e.id, r);
    }
    this.renderOpenCharacterSheets();
  }
  static async _onCreateCombatant(e) {
    var n, s, r;
    const t = e == null ? void 0 : e.combat;
    ((n = t == null ? void 0 : t.combatant) == null ? void 0 : n.id) === (e == null ? void 0 : e.id) && await this.ensureCurrentCombatantState(), await this._syncPreparedIndicatorForCombatant(e);
    const i = this._getCombatantTokenDocument(e, ((s = t == null ? void 0 : t.scene) == null ? void 0 : s.id) ?? ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id));
    i && await this._syncHazardPresenceForToken(i), this.renderOpenCharacterSheets();
  }
  static async _onDeleteCombatant(e) {
    await this.clearPreparedIndicatorForCombatant(e), this.renderOpenCharacterSheets();
  }
  static async _onDeleteCombat(e) {
    e != null && e.id && this._lastActivationByCombat.delete(e.id);
    for (const t of this._getCombatants(e))
      await this.clearPreparedIndicatorForCombatant(t);
    this.renderOpenCharacterSheets();
  }
  static _onUpdateCombatant(e, t) {
    var i, n;
    if (foundry.utils.hasProperty(t, `flags.${dt}.${mt}`)) {
      this._syncPreparedIndicatorForCombatant(e);
      const s = this._getCombatantTokenDocument(e, this._getCombatantSceneId(e) || ((i = canvas == null ? void 0 : canvas.scene) == null ? void 0 : i.id));
      s && this._queueHazardOverlayRefresh(s), this.renderOpenCharacterSheets((n = e == null ? void 0 : e.actor) == null ? void 0 : n.id);
    }
  }
  static _onTargetToken(e, t, i) {
    var n;
    (e == null ? void 0 : e.id) === ((n = game.user) == null ? void 0 : n.id) && this.queueCharacterSheetRefresh();
  }
  static _onUpdateToken(e, t) {
    var s, r;
    if (!["x", "y", "elevation"].some(
      (o) => Object.prototype.hasOwnProperty.call(t ?? {}, o)
    ) || ((s = e == null ? void 0 : e.parent) == null ? void 0 : s.id) !== ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id)) return;
    const n = String((e == null ? void 0 : e.id) ?? "").trim();
    if (n) {
      const o = Object.prototype.hasOwnProperty.call(t ?? {}, "x") ? Number(t.x) : Number(e == null ? void 0 : e.x), l = Object.prototype.hasOwnProperty.call(t ?? {}, "y") ? Number(t.y) : Number(e == null ? void 0 : e.y);
      Number.isFinite(o) && Number.isFinite(l) && this._pendingTokenPositions.set(n, { x: o, y: l });
    }
    this._syncHazardPresenceForToken(e), this.queueCharacterSheetRefresh();
  }
  static _onRefreshToken(e) {
    this._refreshHazardOverlay(e);
  }
  static _getTokenDocumentFromRegionEvent(e = []) {
    var t, i, n, s, r, o;
    for (const l of e) {
      if (!l) continue;
      const c = [
        l == null ? void 0 : l.document,
        l == null ? void 0 : l.token,
        l == null ? void 0 : l.tokenDocument,
        (t = l == null ? void 0 : l.object) == null ? void 0 : t.document,
        (i = l == null ? void 0 : l.data) == null ? void 0 : i.token,
        (n = l == null ? void 0 : l.data) == null ? void 0 : n.tokenDocument,
        (s = l == null ? void 0 : l.eventData) == null ? void 0 : s.token,
        (r = l == null ? void 0 : l.eventData) == null ? void 0 : r.tokenDocument
      ];
      for (const u of c) {
        const d = (u == null ? void 0 : u.document) ?? u ?? null;
        if ((d == null ? void 0 : d.documentName) === "Token" || ((o = d == null ? void 0 : d.constructor) == null ? void 0 : o.documentName) === "Token")
          return d;
      }
    }
    return null;
  }
  static _onRegionTokenEvent(...e) {
    const t = this._getTokenDocumentFromRegionEvent(e);
    t && this._syncHazardPresenceForToken(t);
  }
  static async _onCreateRegion(e) {
    Qs(e) && (await Ys(e), await this._syncAllSceneHazards((e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null));
  }
  static async _onUpdateRegion(e) {
    Qs(e) && (await Ys(e), await this._syncAllSceneHazards((e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null));
  }
  static async _onDeleteRegion(e) {
    var s, r, o;
    const t = String((e == null ? void 0 : e.id) ?? "").trim();
    if (!t) return;
    const i = (e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null, n = game.combat;
    for (const l of this._getCombatants(n)) {
      const c = this._getCombatantTokenDocument(l, (i == null ? void 0 : i.id) ?? ((s = canvas == null ? void 0 : canvas.scene) == null ? void 0 : s.id)), u = (c == null ? void 0 : c.actor) ?? (l == null ? void 0 : l.actor) ?? null;
      if (!u || !c) continue;
      const d = this.getSnapshot(u, { token: c });
      (r = d == null ? void 0 : d.hazards) != null && r[t] && (await this.setHazardState(u, { token: c, regionId: t, hazardState: null }), ((o = d == null ? void 0 : d.pendingReaction) == null ? void 0 : o.sourceKind) === "hazard" && d.pendingReaction.sourceId === t && await this.clearPendingReaction(u, { token: c }), this._queueHazardOverlayRefresh(c));
    }
  }
  static async _syncAllSceneHazards(e = (canvas == null ? void 0 : canvas.scene) ?? null) {
    if (e) {
      for (const t of Array.from(e.regions ?? []))
        Qs(t) && await Ys(t);
      for (const t of Array.from(e.tokens ?? []))
        await this._syncHazardPresenceForToken(t), this._queueHazardOverlayRefresh(t);
    }
  }
  static async _syncHazardPresenceForToken(e) {
    var c, u, d, m, f, p;
    const t = this._asTokenDocument(e), i = (t == null ? void 0 : t.actor) ?? null;
    if (!this._supportsHazardActor(i) || !t) {
      this._queueHazardOverlayRefresh(t);
      return;
    }
    const n = this.getSnapshot(i, { token: t });
    if (!(n != null && n.hasCombatant)) {
      this._queueHazardOverlayRefresh(t);
      return;
    }
    as(n.hazards);
    const s = Cl(t), r = new Map(
      s.map((h) => {
        const g = Oi(h);
        return g ? [String(h.id ?? "").trim(), { region: h, flag: g }] : null;
      }).filter(Boolean)
    ), o = [], l = [];
    await this.updateCombatantState(i, {
      token: t,
      mutate: (h) => {
        var g, y, b, S, w;
        h.hazards ?? (h.hazards = {});
        for (const [M, { flag: P }] of r.entries()) {
          if (h.hazards[M]) continue;
          const E = {
            tier: Be((g = P == null ? void 0 : P.hazardDef) == null ? void 0 : g.startExposure, ne.minor),
            turnsExposed: 0,
            evadeLocked: !1,
            lastProcessedRound: 0
          };
          h.hazards[M] = E, o.push({ regionId: M, flag: P, hazardState: E });
        }
        for (const [M, P] of Object.entries(h.hazards ?? {})) {
          if (r.has(M)) continue;
          const E = Oi((S = (b = (y = canvas == null ? void 0 : canvas.scene) == null ? void 0 : y.regions) == null ? void 0 : b.get) == null ? void 0 : S.call(b, M)) ?? null;
          ((w = E == null ? void 0 : E.hazardDef) == null ? void 0 : w.clearOnExit) !== !1 && (delete h.hazards[M], l.push({ regionId: M, hazardState: P, flag: E }));
        }
        return h;
      }
    });
    for (const h of o) {
      const g = ((c = r.get(h.regionId)) == null ? void 0 : c.region) ?? ((m = (d = (u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.regions) == null ? void 0 : d.get) == null ? void 0 : m.call(d, h.regionId)) ?? null;
      await this._createHazardEventChatCard({
        actor: i,
        token: t,
        region: g,
        hazardFlag: h.flag,
        hazardState: h.hazardState,
        eventType: "entry",
        nextTier: h.hazardState.tier,
        allowEvade: !h.hazardState.evadeLocked
      });
    }
    for (const h of l) {
      ((f = n == null ? void 0 : n.pendingReaction) == null ? void 0 : f.sourceKind) === "hazard" && n.pendingReaction.sourceId === h.regionId && await this.clearPendingReaction(i, { token: t });
      const g = String(((p = h == null ? void 0 : h.flag) == null ? void 0 : p.label) ?? "Hazard").trim() || "Hazard", y = `<div class="mwd-gm-notice"><b>${foundry.utils.escapeHTML(g)}:</b> ${foundry.utils.escapeHTML(i.name ?? "Target")} leaves the zone.</div>`;
      await ChatMessage.create(Nl({
        speaker: ChatMessage.getSpeaker({ actor: i, token: t }),
        content: y
      }));
    }
    this._queueHazardOverlayRefresh(t);
  }
  static async _processCurrentCombatantHazards(e = game.combat) {
    var l, c, u;
    const t = (e == null ? void 0 : e.combatant) ?? null, i = this._getCombatantTokenDocument(t, ((l = e == null ? void 0 : e.scene) == null ? void 0 : l.id) ?? ((c = canvas == null ? void 0 : canvas.scene) == null ? void 0 : c.id)), n = (i == null ? void 0 : i.actor) ?? (t == null ? void 0 : t.actor) ?? null;
    if (!t || !i || !this._supportsHazardActor(n)) return;
    const s = this.getSnapshot(n, { token: i }), r = Number((e == null ? void 0 : e.round) ?? 0) || 0, o = new Map(
      Cl(i).map((d) => {
        const m = Oi(d);
        return m ? [String(d.id ?? "").trim(), { region: d, flag: m }] : null;
      }).filter(Boolean)
    );
    for (const [d, m] of Object.entries(s.hazards ?? {})) {
      if ((Number((m == null ? void 0 : m.lastProcessedRound) ?? 0) || 0) >= r) continue;
      const f = o.get(d);
      if (!f) continue;
      const p = this._getHazardNextTier(m, ((u = f.flag) == null ? void 0 : u.hazardDef) ?? {});
      await this._createHazardEventChatCard({
        actor: n,
        token: i,
        region: f.region,
        hazardFlag: f.flag,
        hazardState: m,
        eventType: "tick",
        nextTier: p,
        allowEvade: !m.evadeLocked
      }), await this.setHazardState(n, {
        token: i,
        regionId: d,
        hazardState: {
          ...m,
          lastProcessedRound: r
        }
      });
    }
    this._queueHazardOverlayRefresh(i);
  }
  static _getHazardNextTier(e = {}, t = {}) {
    var l, c, u, d;
    const i = Math.max(0, Number((e == null ? void 0 : e.turnsExposed) ?? 0) || 0), n = Math.max(1, Number(((l = t == null ? void 0 : t.escalation) == null ? void 0 : l.intervalTurns) ?? 1) || 1), s = Math.max(0, Number(((c = t == null ? void 0 : t.escalation) == null ? void 0 : c.rate) ?? 1) || 0);
    if (!(s > 0 && (i + 1) % n === 0)) return Be(e == null ? void 0 : e.tier, ne.none);
    let o = Be(e == null ? void 0 : e.tier, ne.none);
    for (let m = 0; m < s; m += 1)
      if (o = cf(o, 1), Ni(o) >= Ni(((u = t == null ? void 0 : t.escalation) == null ? void 0 : u.max) ?? ne.full)) {
        o = Be((d = t == null ? void 0 : t.escalation) == null ? void 0 : d.max, ne.full);
        break;
      }
    return o;
  }
  static async _createHazardEventChatCard({
    actor: e = null,
    token: t = null,
    region: i = null,
    hazardFlag: n = {},
    hazardState: s = {},
    eventType: r = "entry",
    nextTier: o = null,
    allowEvade: l = !1
  } = {}) {
    var h, g, y;
    if (!e) return null;
    const c = Be(s == null ? void 0 : s.tier, ne.none), u = Be(o, c), d = l && c !== ne.none && !(s != null && s.evadeLocked) ? this.getReactionSpendPreview(e, { token: t }) : null, m = {
      kind: "hazard",
      eventType: r,
      regionId: String((i == null ? void 0 : i.id) ?? "").trim(),
      regionName: String((n == null ? void 0 : n.label) ?? (i == null ? void 0 : i.name) ?? "Hazard").trim() || "Hazard",
      actorUuid: e.uuid,
      tokenUuid: (t == null ? void 0 : t.uuid) ?? ((h = t == null ? void 0 : t.document) == null ? void 0 : h.uuid) ?? null,
      actorName: e.name ?? "Target",
      turnsExposed: Math.max(0, Number((s == null ? void 0 : s.turnsExposed) ?? 0) || 0),
      baseDamage: Math.max(0, Number((n == null ? void 0 : n.damage) ?? 0) || 0),
      damageBefore: Qi(Number((n == null ? void 0 : n.damage) ?? 0) || 0, c),
      damageAfter: Qi(
        Number((n == null ? void 0 : n.damage) ?? 0) || 0,
        l && !(s != null && s.evadeLocked) ? Sr(c, 1) : c
      ),
      damageType: String((n == null ? void 0 : n.damageType) ?? "concussive").trim() || "concussive",
      ap: Math.max(0, Number((n == null ? void 0 : n.ap) ?? 0) || 0),
      onFullBurnDelta: Math.max(0, Number(((y = (g = n == null ? void 0 : n.hazardDef) == null ? void 0 : g.onFull) == null ? void 0 : y.burnDelta) ?? 0) || 0),
      source: String((n == null ? void 0 : n.label) ?? (i == null ? void 0 : i.name) ?? "Hazard").trim() || "Hazard",
      nextTier: u,
      exposure: {
        initialTier: c,
        finalTier: c,
        initialLabel: Bt(c),
        finalLabel: Bt(c),
        evadeLocked: !!(s != null && s.evadeLocked)
      },
      preview: {
        evadeActive: !1,
        edgePoolKey: null,
        finalTier: c,
        reactionPreview: d ? {
          burnDelta: Number(d.burnDelta ?? 0),
          canSpendEdge: !!d.canSpendEdge,
          edgePools: Array.isArray(d.edgePools) ? d.edgePools : []
        } : {}
      }
    }, f = await td(m, { actor: e, token: t }), p = await ChatMessage.create(Nl({
      speaker: ChatMessage.getSpeaker({ actor: e, token: t }),
      content: f,
      flags: {
        mwd: {
          hazardCard: m
        }
      }
    }));
    return p && d && c !== ne.none && !(s != null && s.evadeLocked) && await this.setPendingReaction(e, {
      token: t,
      pendingReaction: {
        type: "evade",
        sourceKind: "hazard",
        sourceId: String((i == null ? void 0 : i.id) ?? "").trim() || null,
        messageId: p.id,
        exposureBefore: c,
        exposureAfterPreview: Sr(c, 1),
        edgePoolKey: null,
        allowCurrentTurn: !0
      }
    }), p;
  }
  static _supportsHazardActor(e) {
    return (e == null ? void 0 : e.type) === "character" || (e == null ? void 0 : e.type) === "npc";
  }
  static _queueHazardOverlayRefresh(e) {
    var i;
    const t = (e == null ? void 0 : e.object) ?? e ?? null;
    (i = t == null ? void 0 : t.refresh) == null || i.call(t);
  }
  static _refreshHazardOverlay(e) {
    var c, u, d;
    const t = (e == null ? void 0 : e.object) ?? e ?? null, i = (t == null ? void 0 : t.document) ?? e ?? null;
    if (!t || !i) return;
    const n = (i == null ? void 0 : i.actor) ?? null, s = n ? this.getSnapshot(n, { token: i }) : null, r = Object.values((s == null ? void 0 : s.hazards) ?? {}), o = kh(r);
    let l = t.mwdHazardOverlay ?? null;
    if (!o) {
      l != null && l.parent && l.parent.removeChild(l), (c = l == null ? void 0 : l.destroy) == null || c.call(l), t.mwdHazardOverlay = null;
      return;
    }
    l || (l = new PIXI.Text(o, {
      fontFamily: "MWD UI",
      fontSize: 14,
      fontWeight: "700",
      fill: "#fff2d5",
      stroke: "#23150d",
      strokeThickness: 4,
      align: "center"
    }), (d = (u = l.anchor) == null ? void 0 : u.set) == null || d.call(u, 0, 1), t.addChild(l), t.mwdHazardOverlay = l), l.text = o, l.x = 6, l.y = Math.max(18, Number(t.h ?? 0) - 4);
  }
  static queueCharacterSheetRefresh(e = null) {
    this._targetRefreshTimeout && clearTimeout(this._targetRefreshTimeout), this._targetRefreshTimeout = setTimeout(() => {
      this._targetRefreshTimeout = null, this.renderOpenCharacterSheets(e);
    }, 0);
  }
  static _collectOpenCharacterSheetApps() {
    var i, n;
    const e = /* @__PURE__ */ new Set(), t = (s) => {
      var r;
      for (const o of Object.values((s == null ? void 0 : s.apps) ?? {}))
        ((r = o == null ? void 0 : o.actor) == null ? void 0 : r.type) === "character" && e.add(o);
    };
    for (const s of Array.from(game.actors ?? []))
      t(s);
    for (const s of Array.from(((i = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : i.placeables) ?? []))
      t(s == null ? void 0 : s.actor);
    for (const s of Object.values(ui.windows ?? {}))
      ((n = s == null ? void 0 : s.actor) == null ? void 0 : n.type) === "character" && e.add(s);
    return Array.from(e);
  }
  static renderOpenCharacterSheets(e = null) {
    var i;
    const t = this._collectOpenCharacterSheetApps();
    for (const n of t)
      if (!(e && ((i = n.actor) == null ? void 0 : i.id) !== e)) {
        if (typeof n.requestCombatDashboardRefresh == "function") {
          n.requestCombatDashboardRefresh();
          continue;
        }
        n.render({ force: !0 });
      }
  }
};
D(Sa, "_targetRefreshTimeout", null), D(Sa, "_pendingTokenPositions", /* @__PURE__ */ new Map()), D(Sa, "_lastActivationByCombat", /* @__PURE__ */ new Map());
let B = Sa;
function Dr(a) {
  var i, n, s, r, o, l;
  const e = Math.max(0, Number(((s = (n = (i = a == null ? void 0 : a.system) == null ? void 0 : i.attributes) == null ? void 0 : n.reflexes) == null ? void 0 : s.value) ?? 0) || 0), t = Math.max(0, Number(((l = (o = (r = a == null ? void 0 : a.system) == null ? void 0 : r.attributes) == null ? void 0 : o.willpower) == null ? void 0 : l.value) ?? 0) || 0);
  return vi + Math.floor((e + t) / 2);
}
function wn(a, e) {
  var t;
  return Math.max(0, Dr(a) - Math.max(0, Number(((t = e == null ? void 0 : e.state) == null ? void 0 : t.saSpentThisActivation) ?? 0) || 0));
}
const Or = Object.freeze([
  Object.freeze({ key: "close", label: "Close", min: 0, max: 5, baseDn: 2 }),
  Object.freeze({ key: "near", label: "Near", min: 6, max: 26, baseDn: 3 }),
  Object.freeze({ key: "far", label: "Far", min: 27, max: 62, baseDn: 4 }),
  Object.freeze({ key: "extreme", label: "Extreme", min: 63, max: 120, baseDn: 5 })
]), vh = new Map(Or.map((a) => [a.key, a]));
function kn(a, e) {
  const t = Number(a);
  return !Number.isFinite(t) || t <= 0 ? e : Math.max(0, Math.trunc(t));
}
function Es(a = "") {
  return vh.get(String(a ?? "").trim().toLowerCase()) ?? null;
}
function ns(a = "") {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return "Out of Range";
  const e = Es(a);
  return e ? `${e.label} ${e.min}-${e.max} m` : String(a ?? "").trim() || "Range";
}
function Ps(a = "") {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return "Out of Range";
  const e = Es(a);
  return e ? e.label : String(a ?? "").trim() || "Range";
}
function Mh(a = "", e = 1) {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return 6;
  const t = Es(a);
  return Number.isFinite(Number(t == null ? void 0 : t.baseDn)) ? Number(t.baseDn) : e;
}
function Ho(a = {}) {
  return {
    max: String((a == null ? void 0 : a.max) ?? "").trim().toLowerCase() || "extreme",
    close: kn((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short), 5),
    near: kn((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium), 26),
    far: kn((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long), 62),
    extreme: kn(a == null ? void 0 : a.extreme, 120)
  };
}
function Ch(a, e = {}, t = "close") {
  var u;
  const i = Number(a);
  if (!Number.isFinite(i) || i < 0)
    return String(t ?? "close").trim().toLowerCase() || "close";
  const n = Ho(e), s = ((u = Es(n.max)) == null ? void 0 : u.key) ?? "extreme", r = Or.findIndex((d) => d.key === s), o = Number((n == null ? void 0 : n[s]) ?? NaN);
  if (Number.isFinite(o) && i > o)
    return "outOfRange";
  let l = "extreme";
  i <= n.close ? l = "close" : i <= n.near ? l = "near" : i <= n.far && (l = "far");
  const c = Or.findIndex((d) => d.key === l);
  return r >= 0 && c > r ? s : l;
}
const ka = "lifeModuleCatalog", Rs = Object.freeze([
  { moduleType: "faction", label: "Faction" },
  { moduleType: "childhood", label: "Childhood" },
  { moduleType: "higherEducation", label: "Higher Education" },
  { moduleType: "realLife", label: "Real Life" }
]), Eh = Object.freeze(
  Object.fromEntries(Rs.map((a) => [a.moduleType, a.label]))
), Ph = new Set(Rs.map((a) => a.moduleType)), Rh = /* @__PURE__ */ new Set(["skill", "edgePool"]), jo = Object.freeze({
  grit: "Grit",
  chaos: "Chaos",
  insight: "Insight",
  rumor: "Rumor",
  legend: "Legend",
  credibility: "Credibility"
}), id = Object.freeze(Object.keys(jo)), Nh = Object.freeze({
  skill: "Skill",
  edgePool: "Edge Pool"
}), Ih = Object.freeze($h()), Dh = Object.freeze(Bh()), Oh = /* @__PURE__ */ new Set(["artillery", "gunnery", "piloting", "heavyWeapons"]), _h = /* @__PURE__ */ new Set([
  "artillery",
  "gunnery",
  "heavyWeapons",
  "meleeCombat",
  "piloting",
  "projectileWeapons",
  "firearms"
]), Lh = Object.freeze(
  li.map((a) => a.code).filter((a) => !_h.has(a))
), xh = Object.freeze(ra([
  {
    id: "faction-capellan-confederation",
    label: "Capellan Confederation",
    moduleType: "faction",
    grants: [
      { id: "skill", choices: [{ type: "skill", value: "disguise" }] },
      { id: "edge-pool", choices: [{ type: "edgePool", value: "rumor" }] }
    ]
  },
  {
    id: "faction-draconis-combine",
    label: "Draconis Combine",
    moduleType: "faction",
    grants: [
      { id: "edge-pool", choices: [{ type: "edgePool", value: "legend" }] },
      { id: "skill", choices: [{ type: "skill", value: "meleeCombat" }] }
    ]
  },
  {
    id: "faction-federated-suns",
    label: "Federated Suns",
    moduleType: "faction",
    grants: [
      { id: "edge-pool", choices: [{ type: "edgePool", value: "credibility" }] },
      { id: "skill", choices: [{ type: "skill", value: "firearms" }] }
    ]
  },
  {
    id: "faction-free-worlds-league",
    label: "Free Worlds League",
    moduleType: "faction",
    grants: [
      { id: "skill", choices: [{ type: "skill", value: "negotiation" }] },
      { id: "edge-pool", choices: [{ type: "edgePool", value: "rumor" }] }
    ]
  },
  {
    id: "faction-lyran-commonwealth",
    label: "Lyran Commonwealth",
    moduleType: "faction",
    grants: [
      { id: "skill", choices: [{ type: "skill", value: "administration" }] },
      { id: "edge-pool", choices: [{ type: "edgePool", value: "legend" }] }
    ]
  },
  {
    id: "faction-taurian-concordat",
    label: "Taurian Concordat",
    moduleType: "faction",
    grants: [
      { id: "skill", choices: [{ type: "skill", value: "survival" }] },
      { id: "edge-pool", choices: [{ type: "edgePool", value: "grit" }] }
    ]
  },
  {
    id: "faction-magistracy-of-canopus",
    label: "Magistracy of Canopus",
    moduleType: "faction",
    grants: [
      { id: "edge-pool", choices: [{ type: "edgePool", value: "chaos" }] },
      { id: "skill", choices: [{ type: "skill", value: "medTech" }] }
    ]
  },
  {
    id: "faction-outworlds-alliance",
    label: "Outworlds Alliance",
    moduleType: "faction",
    grants: [
      { id: "edge-pool", choices: [{ type: "edgePool", value: "insight" }] },
      { id: "skill", choices: [{ type: "skill", value: "navigation" }] }
    ]
  },
  {
    id: "faction-pirate",
    label: "Pirate",
    moduleType: "faction",
    grants: [
      { id: "skill", choices: [{ type: "skill", value: "streetwise" }] },
      { id: "edge-pool", choices: [{ type: "edgePool", value: "chaos" }] }
    ]
  },
  {
    id: "faction-comstar",
    label: "ComStar",
    moduleType: "faction",
    grants: [
      { id: "skill", choices: [{ type: "skill", value: "systemOps" }] },
      { id: "edge-pool", choices: [{ type: "edgePool", value: "rumor" }] }
    ]
  },
  {
    id: "faction-mercenary",
    label: "Mercenary",
    moduleType: "faction",
    grants: [
      { id: "skill", choices: [{ type: "skill", value: "tactics" }] },
      { id: "edge-pool", choices: [{ type: "edgePool", value: "grit" }] }
    ]
  },
  {
    id: "faction-unaffiliated",
    label: "Unaffiliated",
    moduleType: "faction",
    grants: [{
      id: "choice",
      choices: [
        ...Lh.map((a) => ({ type: "skill", value: a })),
        ...id.map((a) => ({ type: "edgePool", value: a }))
      ]
    }]
  },
  { id: "childhood-backwoods", label: "Backwoods", moduleType: "childhood", skillChoices: ["tracking", "projectileWeapons"] },
  { id: "childhood-blue-collar", label: "Blue Collar", moduleType: "childhood", skillChoices: ["art", "technician", "zeroGOps"] },
  { id: "childhood-mercenary-brat", label: "Mercenary Brat", moduleType: "childhood", skillChoices: ["firearms"] },
  { id: "childhood-farm", label: "Farm", moduleType: "childhood", skillChoices: ["animalHandling"] },
  { id: "childhood-fugitives", label: "Fugitives", moduleType: "childhood", skillChoices: ["escapeArtist", "disguise"] },
  { id: "childhood-nobility", label: "Nobility", moduleType: "childhood", skillChoices: ["etiquette"] },
  { id: "childhood-slave", label: "Slave", moduleType: "childhood", skillChoices: ["athletics"] },
  { id: "childhood-spacer-family", label: "Spacer Family", moduleType: "childhood", skillChoices: ["zeroGOps"] },
  { id: "childhood-street", label: "Street", moduleType: "childhood", skillChoices: ["streetwise"] },
  { id: "childhood-war-orphan", label: "War Orphan", moduleType: "childhood", skillChoices: ["survival"] },
  { id: "childhood-white-collar", label: "White Collar", moduleType: "childhood", skillChoices: ["etiquette"] },
  { id: "higher-education-technical-college", label: "Technical College", moduleType: "higherEducation", skillChoices: ["technician", "systemOps"] },
  { id: "higher-education-trade-school", label: "Trade School", moduleType: "higherEducation", skillChoices: ["computers", "administration"] },
  { id: "higher-education-university", label: "University", moduleType: "higherEducation", skillChoices: ["science", "medTech"] },
  { id: "higher-education-solaris-vii-internship", label: "Solaris VII Internship", moduleType: "higherEducation", skillChoices: ["streetwise"] },
  { id: "higher-education-police-academy", label: "Police Academy", moduleType: "higherEducation", skillChoices: ["negotiation", "perception"] },
  { id: "higher-education-intelligence-operative-training", label: "Intelligence Operative Training", moduleType: "higherEducation", skillChoices: ["intimidation", "tracking"] },
  { id: "higher-education-military-academy", label: "Military Academy", moduleType: "higherEducation", skillChoices: ["perception", "administration"] },
  { id: "higher-education-military-enlistment", label: "Military Enlistment", moduleType: "higherEducation", skillChoices: ["heavyWeapons", "artillery"] },
  { id: "higher-education-family-training", label: "Family Training", moduleType: "higherEducation", skillChoices: ["leadership", "etiquette"], requiresAny: ["childhood-nobility"] },
  { id: "higher-education-officer-candidate-school", label: "Officer Candidate School", moduleType: "higherEducation", skillChoices: ["tactics", "leadership"] },
  { id: "real-life-agitator", label: "Agitator", moduleType: "realLife", skillChoices: ["meleeCombat"] },
  { id: "real-life-civilian-job", label: "Civilian Job", moduleType: "realLife", skillChoices: ["art", "administration"] },
  { id: "real-life-combat-correspondent", label: "Combat Correspondent", moduleType: "realLife", skillChoices: ["perception"] },
  { id: "real-life-comstar-service", label: "ComStar Service", moduleType: "realLife", skillChoices: ["systemOps", "computers"] },
  { id: "real-life-covert-operations", label: "Covert Operations", moduleType: "realLife", skillChoices: ["stealth", "demolitions"] },
  { id: "real-life-explorer", label: "Explorer", moduleType: "realLife", skillChoices: ["navigation"] },
  { id: "real-life-guerrilla-insurgent", label: "Guerrilla Insurgent", moduleType: "realLife", skillChoices: ["stealth", "survival"] },
  { id: "real-life-merchant", label: "Merchant", moduleType: "realLife", skillChoices: ["negotiation"] },
  { id: "real-life-neer-do-well", label: "Ne'er-Do-Well", moduleType: "realLife", skillChoices: ["acting"] },
  { id: "real-life-organized-crime", label: "Organized Crime", moduleType: "realLife", skillChoices: ["intimidation"] },
  { id: "real-life-postgraduate-studies", label: "Postgraduate Studies", moduleType: "realLife", skillChoices: ["science", "technician"] },
  { id: "real-life-solaris-insider", label: "Solaris Insider", moduleType: "realLife", skillChoices: ["negotiation"] },
  { id: "real-life-solaris-vii-games", label: "Solaris VII Games", moduleType: "realLife", skillChoices: ["piloting", "gunnery"] },
  { id: "real-life-think-tank", label: "Think Tank", moduleType: "realLife", skillChoices: ["science", "tactics"] },
  {
    id: "real-life-tour-of-duty",
    label: "Tour of Duty",
    moduleType: "realLife",
    skillChoices: ["artillery", "gunnery", "meleeCombat", "piloting", "projectileWeapons", "firearms", "heavyWeapons"],
    requiresAny: [
      "higher-education-military-enlistment",
      "higher-education-military-academy",
      "higher-education-family-training",
      "higher-education-officer-candidate-school"
    ]
  },
  {
    id: "real-life-to-serve-and-protect",
    label: "To Serve and Protect",
    moduleType: "realLife",
    skillChoices: ["firearms", "intimidation"],
    requiresAny: ["higher-education-police-academy"]
  },
  {
    id: "real-life-vagabond",
    label: "Vagabond",
    moduleType: "realLife",
    skillChoices: li.map((a) => a.code).filter((a) => !Oh.has(a)),
    excludesAny: [
      "higher-education-military-enlistment",
      "higher-education-military-academy",
      "higher-education-family-training",
      "higher-education-officer-candidate-school"
    ]
  }
], { strict: !1 }));
function $h() {
  const a = /* @__PURE__ */ new Map();
  for (const e of li) {
    const t = String(e.code ?? "").trim(), i = String(e.label ?? "").trim();
    t && (a.set(t.toLowerCase(), t), i && a.set(i.toLowerCase(), t));
  }
  return a;
}
function Bh() {
  const a = /* @__PURE__ */ new Map();
  for (const [e, t] of Object.entries(jo))
    a.set(e.toLowerCase(), e), a.set(t.toLowerCase(), e), a.set(`${t.toLowerCase()} pool`, e);
  return a;
}
function zh(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid life module data.");
  return t.validationErrors = e, t;
}
function ad(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
function gn(a) {
  return String(a ?? "").trim().toLowerCase().replace(/['\u2019]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function Ns(a) {
  const e = String(a ?? "").trim();
  return Ph.has(e) ? e : "";
}
function Is(a) {
  const e = String(a ?? "").trim();
  return e ? Ih.get(e.toLowerCase()) ?? "" : "";
}
function Fh(a) {
  const e = String(a ?? "").trim();
  return e ? Dh.get(e.toLowerCase()) ?? "" : "";
}
function Uh(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const r of ad(a)) {
    const o = Is(r);
    if (!o) {
      e && t.push(`${i}: unknown skill "${r}".`);
      continue;
    }
    n.has(o) || (n.add(o), s.push(o));
  }
  return s;
}
function Il(a) {
  const e = /* @__PURE__ */ new Set();
  return ad(a).map(gn).filter((t) => !t || e.has(t) ? !1 : (e.add(t), !0));
}
function Dl(a = [], e = /* @__PURE__ */ new Map()) {
  return a.map((t) => {
    var i;
    return ((i = e.get(t)) == null ? void 0 : i.label) ?? t;
  });
}
function Ra(a = {}) {
  return `${a.type}:${a.value}`;
}
function Hh(a) {
  var e;
  return ((e = zt(a)) == null ? void 0 : e.label) ?? a;
}
function nd(a) {
  return jo[a] ?? a;
}
function jh(a) {
  return Nh[a] ?? a;
}
function Wh(a = {}, { includeTypePrefix: e = !1 } = {}) {
  const t = String((a == null ? void 0 : a.type) ?? "").trim(), i = String((a == null ? void 0 : a.value) ?? "").trim();
  if (!t || !i) return "";
  const n = t === "skill" ? Hh(i) : `${nd(i)} Pool`;
  return e ? `${jh(t)}: ${n}` : n;
}
function nn(a = {}, { includeBonusText: e = !1, includeTypePrefix: t = !1 } = {}) {
  const i = Wh(a, { includeTypePrefix: t });
  return i ? e ? a.type === "skill" ? `+1 ${i} rolls` : `+1 ${i}` : i : "";
}
function Kh(a) {
  const e = String(a ?? "").trim(), t = e.indexOf(":");
  return t < 0 ? null : {
    type: e.slice(0, t).trim(),
    value: e.slice(t + 1).trim()
  };
}
function Gh(a, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: n = "Bonus" } = {}) {
  const s = typeof a == "string" ? Kh(a) : a, r = String((s == null ? void 0 : s.type) ?? "").trim(), o = String((s == null ? void 0 : s.value) ?? "").trim();
  if (!Rh.has(r))
    return e && t.push(`${i} ${n}: unknown bonus type "${r || a}".`), null;
  const l = r === "skill" ? Is(o) : Fh(o);
  return l ? {
    type: r,
    value: l
  } : (e && t.push(`${i} ${n}: unknown ${r === "skill" ? "skill" : "edge pool"} "${o}".`), null);
}
function _r(a, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: n = "Bonus" } = {}) {
  const s = /* @__PURE__ */ new Set(), r = [], o = Array.isArray(a) ? a : [];
  for (const l of o) {
    const c = Gh(l, { strict: e, errors: t, prefix: i, grantLabel: n });
    if (!c) continue;
    const u = Ra(c);
    s.has(u) || (s.add(u), r.push(c));
  }
  return r;
}
function sd(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = Uh(a, { strict: e, errors: t, prefix: i });
  return n.length ? [{
    id: "skill",
    label: "",
    choices: n.map((s) => ({ type: "skill", value: s }))
  }] : [];
}
function qh(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = String(a ?? "").trim();
  return n ? n.split(";").map((r) => r.trim()).filter(Boolean).map((r, o) => {
    const l = `Bonus ${o + 1}`, c = _r(
      r.split("|").map((u) => u.trim()).filter(Boolean),
      { strict: e, errors: t, prefix: i, grantLabel: l }
    );
    return {
      id: `grant-${o + 1}`,
      label: "",
      choices: c
    };
  }).filter((r) => r.choices.length) : [];
}
function rd(a, e = "grant") {
  return gn(a) || e;
}
function Vh(a, e, { strict: t = !1, errors: i = [], prefix: n = "Entry" } = {}) {
  const s = `grant-${e + 1}`, r = `Bonus ${e + 1}`;
  if (typeof a == "string") {
    const u = _r(
      a.split("|").map((d) => d.trim()).filter(Boolean),
      { strict: t, errors: i, prefix: n, grantLabel: r }
    );
    return u.length ? { id: s, label: "", choices: u } : null;
  }
  const o = rd(a == null ? void 0 : a.id, s), l = String((a == null ? void 0 : a.label) ?? "").trim(), c = _r(a == null ? void 0 : a.choices, { strict: t, errors: i, prefix: n, grantLabel: r });
  return c.length ? { id: o, label: l, choices: c } : (t && i.push(`${n} ${r}: define at least one bonus choice.`), null);
}
function Yh(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  if (Array.isArray(a)) {
    if (a.every((s) => typeof s == "string" && !String(s).includes(":")))
      return sd(a, { strict: e, errors: t, prefix: i });
    const n = /* @__PURE__ */ new Set();
    return a.map((s, r) => Vh(s, r, { strict: e, errors: t, prefix: i })).filter((s) => s ? n.has(s.id) ? (e && t.push(`${i}: duplicate bonus id "${s.id}".`), !1) : (n.add(s.id), !0) : !1);
  }
  return typeof a == "string" ? qh(a, { strict: e, errors: t, prefix: i }) : [];
}
function Qh(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => (Array.isArray(e == null ? void 0 : e.choices) ? e.choices : []).map((i) => `${i.type}:${i.value}`).join("|")).filter(Boolean).join("; ");
}
function Wo() {
  return foundry.utils.deepClone(xh);
}
function Na(a) {
  return Eh[a] ?? (String(a ?? "").trim() || "Life Module");
}
function od() {
  return Rs.map((a) => ({
    value: a.moduleType,
    label: a.label
  }));
}
function ra(a = [], { strict: e = !1 } = {}) {
  const t = Array.isArray(a) ? a : [], i = [], n = /* @__PURE__ */ new Set(), s = t.map((o, l) => {
    const c = `Entry ${l + 1}`, u = String((o == null ? void 0 : o.label) ?? "").trim(), d = gn((o == null ? void 0 : o.id) ?? u), m = Ns(o == null ? void 0 : o.moduleType), f = (o == null ? void 0 : o.grants) != null ? Yh(o.grants, { strict: e, errors: i, prefix: c }) : sd(o == null ? void 0 : o.skillChoices, { strict: e, errors: i, prefix: c }), p = Il(o == null ? void 0 : o.requiresAny), h = Il(o == null ? void 0 : o.excludesAny);
    return !d && e && i.push(`${c}: id cannot be blank.`), !u && e && i.push(`${c}: label cannot be blank.`), !m && e && i.push(`${c}: choose a valid module type.`), !f.length && e && i.push(`${c}: choose at least one bonus.`), d && n.has(d) && e && i.push(`${c}: duplicate id "${d}".`), d && n.add(d), {
      id: d,
      label: u,
      moduleType: m,
      grants: f,
      requiresAny: p,
      excludesAny: h
    };
  }), r = new Map(s.map((o) => [o.id, o]));
  for (const o of s) {
    for (const l of o.requiresAny)
      l === o.id && e && i.push(`${o.label || o.id}: cannot require itself.`), !r.has(l) && e && i.push(`${o.label || o.id}: unknown requirement "${l}".`);
    for (const l of o.excludesAny)
      l === o.id && e && i.push(`${o.label || o.id}: cannot exclude itself.`), !r.has(l) && e && i.push(`${o.label || o.id}: unknown exclusion "${l}".`);
  }
  if (e && i.length) throw zh(i);
  return s.filter((o) => o.id && o.label && o.moduleType && o.grants.length).map((o) => ({
    id: o.id,
    label: o.label,
    moduleType: o.moduleType,
    grants: o.grants.map((l) => ({
      id: l.id,
      label: l.label,
      choices: l.choices.map((c) => ({
        type: c.type,
        value: c.value
      }))
    })),
    requiresAny: [...o.requiresAny],
    excludesAny: [...o.excludesAny]
  }));
}
function ld(a = []) {
  const e = new Map(Wo().map((s) => [s.id, s])), t = ra(a, { strict: !1 }), i = [...t], n = new Set(t.map((s) => s.id));
  for (const [s, r] of e.entries())
    n.has(s) || i.push(foundry.utils.deepClone(r));
  return i;
}
async function Jh() {
  var a, e, t;
  try {
    if (!((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${ka}`))) return;
    const i = game.settings.get(T, ka), n = ld(i);
    JSON.stringify(i) !== JSON.stringify(n) && await game.settings.set(T, ka, n);
  } catch {
  }
}
function Xh() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${ka}`))
      return ld(game.settings.get(T, ka));
  } catch {
  }
  return Wo();
}
function Ds() {
  return ra(Xh(), { strict: !1 });
}
function Di(a) {
  const e = gn(a);
  return e ? Ds().find((t) => t.id === e) ?? null : null;
}
function Ko(a) {
  const e = Ns(a);
  return Ds().filter((t) => t.moduleType === e);
}
function cd(a) {
  return !a || typeof a != "object" || Array.isArray(a) ? {} : Object.fromEntries(
    Object.entries(a).map(([e, t]) => [rd(e, ""), String(t ?? "").trim()]).filter(([e]) => !!e)
  );
}
function ud(a, e = "", { legacySelectedSkill: t = "" } = {}) {
  const i = new Set((Array.isArray(a == null ? void 0 : a.choices) ? a.choices : []).map(Ra)), n = String(e ?? "").trim();
  if (i.has(n)) return n;
  if (t) {
    const s = Is(t), r = s ? `skill:${s}` : "";
    if (r && i.has(r)) return r;
  }
  return i.size === 1 ? Array.from(i)[0] : "";
}
function dd(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(a == null ? void 0 : a.grants) ? a.grants : [], n = cd(e);
  return Object.fromEntries(
    i.map((s) => [
      s.id,
      ud(s, n[s.id], { legacySelectedSkill: t })
    ])
  );
}
function Os(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(a == null ? void 0 : a.grants) ? a.grants : [], n = dd(a, e, { legacySelectedSkill: t });
  return i.map((s, r) => {
    const o = ud(s, n[s.id], { legacySelectedSkill: t }), l = (Array.isArray(s.choices) ? s.choices : []).find((c) => Ra(c) === o) ?? null;
    return {
      id: s.id,
      index: r,
      label: String((s == null ? void 0 : s.label) ?? "").trim() || (i.length > 1 ? `Bonus ${r + 1}` : "Granted Bonus"),
      selectedKey: o,
      choice: l,
      isResolved: !!l,
      requiresSelection: (Array.isArray(s == null ? void 0 : s.choices) ? s.choices : []).length > 1
    };
  });
}
function Zh(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  var i;
  return ((i = Os(a, e, { legacySelectedSkill: t }).map((n) => n.choice).find((n) => (n == null ? void 0 : n.type) === "skill")) == null ? void 0 : i.value) ?? "";
}
function sn(a = {}) {
  const e = foundry.utils.deepClone(a ?? {}), t = gn(e.catalogId), i = t ? Di(t) : null, n = Ns(e.moduleType || (i == null ? void 0 : i.moduleType)), s = i ? dd(i, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }) : cd(e.selectedGrants);
  return e.moduleType = n, e.catalogId = t, e.selectedGrants = s, e.selectedSkill = i ? Zh(i, s, { legacySelectedSkill: e.selectedSkill }) : Is(e.selectedSkill), e;
}
function md(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  return Os(a, e, { legacySelectedSkill: t }).map((i) => {
    var l, c;
    const n = Array.isArray((c = (l = a == null ? void 0 : a.grants) == null ? void 0 : l[i.index]) == null ? void 0 : c.choices) ? a.grants[i.index].choices : [], s = new Set(n.map((u) => u.type)).size > 1, r = n.map((u) => ({
      value: Ra(u),
      label: nn(u, { includeTypePrefix: s }),
      selected: Ra(u) === i.selectedKey
    })), o = r.length === 1 ? {
      value: r[0].value,
      label: r[0].label,
      displayLabel: nn(n[0], { includeBonusText: !0 })
    } : null;
    return {
      id: i.id,
      label: i.label,
      selectionPath: `system.selectedGrants.${i.id}`,
      selectedKey: i.selectedKey,
      options: r,
      singleOption: o,
      hasMultipleChoices: r.length > 1
    };
  });
}
function eg(a, e) {
  return a.isDuplicate ? `Duplicate ${Na(a.moduleType)} slot item.` : a.catalog ? a.unresolvedGrantCount > 0 ? "Choose valid bonus options." : a.excludedBy.length ? `Blocked by ${Dl(a.excludedBy, e).join(", ")}.` : a.requiresAny.length && !a.matchedRequirementIds.length ? `Requires ${Dl(a.requiresAny, e).join(" or ")}.` : "" : "Catalog entry is missing or unlinked.";
}
function tg(a, e = [], t = {}) {
  var n, s, r;
  if (!a || !Array.isArray(e) || !e.length) return [];
  const i = Math.max(0, Number(((r = (s = (n = a.system) == null ? void 0 : n.attributes) == null ? void 0 : s.edge) == null ? void 0 : r.value) ?? 0));
  return e.filter((o) => (o == null ? void 0 : o.type) === "edgePool").map((o) => {
    var p, h, g, y;
    const l = String(o.value ?? "").trim(), c = nd(l), u = Math.max(0, Number(((y = (g = (h = (p = a.system) == null ? void 0 : p.counters) == null ? void 0 : h.edgePools) == null ? void 0 : g[l]) == null ? void 0 : y.rating) ?? 0)), d = Math.max(0, Number((t == null ? void 0 : t[l]) ?? 0)), m = Math.max(0, u + d - i);
    return m ? `${c} Pool bonus loses ${m} ${m === 1 ? "point" : "points"} to the Edge cap.` : "";
  }).filter(Boolean);
}
function _i(a) {
  var m;
  const e = Ds(), t = new Map(e.map((f) => [f.id, f])), i = Array.from((a == null ? void 0 : a.items) ?? []).filter((f) => f.type === A.itemType.lifeModule), n = /* @__PURE__ */ new Map();
  for (const f of i) {
    const p = Ns((m = f.system) == null ? void 0 : m.moduleType);
    !p || n.has(p) || n.set(p, f.id);
  }
  const s = i.map((f) => {
    var M;
    const p = sn(f.system ?? {}), h = t.get(p.catalogId) ?? null, g = p.moduleType || (h == null ? void 0 : h.moduleType) || "", y = h ? Os(h, p.selectedGrants, { legacySelectedSkill: p.selectedSkill }) : [], b = y.map((P) => P.choice).filter(Boolean), S = ((M = b.find((P) => P.type === "skill")) == null ? void 0 : M.value) ?? "", w = S ? zt(S) : null;
    return {
      item: f,
      itemId: f.id,
      moduleType: g,
      catalogId: (h == null ? void 0 : h.id) ?? p.catalogId,
      catalog: h,
      label: (h == null ? void 0 : h.label) ?? f.name,
      selectedGrants: p.selectedGrants,
      resolvedGrants: y,
      unresolvedGrantCount: y.filter((P) => !P.isResolved).length,
      selectedChoices: b,
      selectedChoiceLabels: b.map((P) => nn(P, { includeBonusText: !0 })),
      selectedSkill: S,
      selectedSkillLabel: (w == null ? void 0 : w.label) ?? S,
      requiresAny: [...(h == null ? void 0 : h.requiresAny) ?? []],
      excludesAny: [...(h == null ? void 0 : h.excludesAny) ?? []],
      matchedRequirementIds: [],
      excludedBy: [],
      isDuplicate: g ? n.get(g) !== f.id : !1,
      isActive: !1,
      inactiveReason: "",
      bonus: 0
    };
  }), r = /* @__PURE__ */ new Map();
  for (const f of s) {
    if (!f.catalogId) continue;
    const p = r.get(f.catalogId) ?? [];
    p.push(f), r.set(f.catalogId, p);
  }
  for (const f of s)
    f.excludedBy = f.excludesAny.filter((p) => (r.get(p) ?? []).length > 0);
  let o = !0;
  for (; o; ) {
    o = !1;
    for (const f of s) {
      const p = f.requiresAny.filter(
        (g) => (r.get(g) ?? []).some((y) => y.isActive)
      ), h = !f.isDuplicate && !!f.catalog && f.unresolvedGrantCount === 0 && f.excludedBy.length === 0 && (f.requiresAny.length === 0 || p.length > 0);
      f.isActive !== h && (f.isActive = h, o = !0), f.matchedRequirementIds.join("|") !== p.join("|") && (f.matchedRequirementIds = p);
    }
  }
  const l = Object.fromEntries(li.map((f) => [f.code, 0])), c = Object.fromEntries(id.map((f) => [f, 0])), u = /* @__PURE__ */ new Map();
  for (const f of s) {
    const p = f.isActive ? f.selectedChoices : [], h = p.filter((y) => y.type === "skill"), g = p.filter((y) => y.type === "edgePool");
    f.bonus = h.length;
    for (const y of h)
      l[y.value] = Number(l[y.value] ?? 0) + 1;
    for (const y of g)
      c[y.value] = Number(c[y.value] ?? 0) + 1;
    f.inactiveReason = f.isActive ? "" : eg(f, t), u.set(f.itemId, f);
  }
  for (const f of s)
    f.warningLabels = f.isActive ? tg(a, f.selectedChoices, c) : [];
  const d = Rs.map((f) => {
    const p = s.find((h) => h.moduleType === f.moduleType && !h.isDuplicate) ?? null;
    return {
      moduleType: f.moduleType,
      label: f.label,
      availableEntries: e.filter((h) => h.moduleType === f.moduleType),
      state: p
    };
  });
  return {
    catalog: e,
    states: s,
    stateByItemId: u,
    slotStates: d,
    bonusBySkill: l,
    bonusByEdgePool: c
  };
}
function ig(a = {}) {
  var t, i, n;
  const e = String((a == null ? void 0 : a.intent) ?? "").trim();
  return e === "skill" ? String(((t = a == null ? void 0 : a.data) == null ? void 0 : t.skillKey) ?? "").trim() : e === "attack" ? String(((n = (i = a == null ? void 0 : a.attack) == null ? void 0 : i.skill) == null ? void 0 : n.code) ?? "").trim() : "";
}
function ag({ actor: a, resolved: e } = {}) {
  const t = ig(e);
  return !a || !t ? [] : _i(a).states.flatMap(
    (i) => i.isActive ? i.selectedChoices.filter((n) => n.type === "skill" && n.value === t).map((n) => ({
      id: `life-module:${i.itemId}:${Ra(n)}`,
      label: i.label,
      value: 1,
      source: "Life Module",
      tooltip: `${i.label}: +1 to ${nn(n)} rolls`
    })) : []
  );
}
const ng = {
  types: [
    "character",
    "npc",
    "vehicle",
    "battlemech"
  ],
  templates: {
    description: {
      ownerId: "",
      description: "",
      gmnotes: "",
      favorites: [],
      state: {
        physical: {
          value: 0,
          max: 0
        },
        fatigue: {
          value: 0,
          max: 0
        }
      }
    },
    "matrix-monitor": {
      monitors: {
        matrix: {
          canMark: !0,
          marks: [],
          value: 0,
          max: 6,
          resistance: {
            default: 0,
            byType: {}
          }
        }
      }
    },
    "attribute-reflexes": {
      attributes: {
        reflexes: {
          value: 1
        }
      }
    },
    "attribute-strength": {
      attributes: {
        strength: {
          value: 1
        }
      }
    },
    "attribute-willpower": {
      attributes: {
        willpower: {
          value: 1
        }
      }
    },
    "attribute-charisma": {
      attributes: {
        charisma: {
          value: 1
        }
      }
    },
    "attribute-intelligence": {
      attributes: {
        intelligence: {
          value: 1
        }
      }
    },
    "attribute-edge": {
      attributes: {
        edge: {
          value: 1
        }
      },
      counters: {
        edgePools: {
          grit: {
            value: null
          },
          insight: {
            value: null
          },
          rumor: {
            value: null
          },
          legend: {
            value: null
          },
          credibility: {
            value: null
          },
          chaos: {
            value: null
          }
        }
      }
    },
    "attribute-autopilot": {
      attributes: {
        autopilot: {
          value: 6
        }
      }
    },
    "attribute-handling": {
      attributes: {
        handling: {
          value: 0
        }
      }
    },
    "mwd-base": {
      mwd: {
        unitType: "vehicle",
        heat: {
          current: 0,
          safeMax: 1,
          hardMax: 4,
          ventPerTurn: 1,
          coolingImpaired: !1
        },
        locations: {},
        crits: [],
        crew: {
          count: 1,
          effectiveCount: 1,
          injuryLevel: 0,
          bailedOut: !1
        },
        status: {
          state: "operational",
          reasons: []
        },
        config: {
          critTargetNumber: 8,
          critOnSnakeEyes: !0,
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
      attributes: {
        handling: {
          value: 3
        },
        system: {
          value: 3
        },
        chassis: {
          value: 3
        },
        condition: {
          value: 3
        }
      }
    },
    "mwd-battlemech": {
      templates: [
        "mwd-base"
      ],
      attributes: {
        handling: {
          value: 4
        },
        system: {
          value: 3
        },
        chassis: {
          value: 4
        },
        condition: {
          value: 3
        }
      },
      mwd: {
        unitType: "mech",
        locations: {
          head: {
            enabled: !0,
            stress: 0,
            tags: [
              "cockpit",
              "sensor"
            ],
            destroyed: !1
          },
          torsoFront: {
            enabled: !0,
            stress: 0,
            tags: [
              "weaponGroup",
              "engine"
            ],
            destroyed: !1
          },
          torsoRear: {
            enabled: !0,
            stress: 0,
            tags: [
              "weaponGroup",
              "ammoStore"
            ],
            destroyed: !1
          },
          leftArm: {
            enabled: !0,
            stress: 0,
            tags: [
              "weaponGroup"
            ],
            destroyed: !1
          },
          rightArm: {
            enabled: !0,
            stress: 0,
            tags: [
              "weaponGroup"
            ],
            destroyed: !1
          },
          leftLeg: {
            enabled: !0,
            stress: 0,
            tags: [
              "motiveSystem"
            ],
            destroyed: !1
          },
          rightLeg: {
            enabled: !0,
            stress: 0,
            tags: [
              "motiveSystem"
            ],
            destroyed: !1
          },
          core: {
            enabled: !0,
            stress: 0,
            tags: [
              "engine",
              "gyro",
              "ammoStore"
            ],
            destroyed: !1
          }
        },
        crew: {
          count: 1,
          effectiveCount: 1,
          injuryLevel: 0,
          bailedOut: !1
        },
        heat: {
          current: 0,
          max: 4,
          thresholds: {
            runningHot: 2,
            overheated: 3,
            shutdown: 4
          }
        },
        chassis: "",
        tonnage: 0,
        weightClass: "medium",
        hardpoints: [],
        weaponGroups: [],
        primarySlot: {
          mode: "normal",
          allowedWeaponIds: [],
          typeRestriction: ""
        },
        melee: {
          baseProfile: {
            name: "Unarmed",
            damage: "",
            notes: ""
          },
          maxWeapons: 0,
          allowedLocations: []
        }
      }
    }
  },
  character: {
    templates: [
      "description",
      "counters",
      "ownership",
      "attribute-reflexes",
      "attribute-strength",
      "attribute-willpower",
      "attribute-intelligence",
      "attribute-charisma",
      "attribute-edge"
    ],
    monitors: {
      physical: {
        value: 1,
        max: 10,
        resistance: {
          default: 0,
          byType: {}
        }
      },
      fatigue: {
        value: 1,
        max: 10,
        resistance: {
          default: 0,
          byType: {}
        }
      },
      armor: {
        label: "Armor",
        value: 9,
        max: 9,
        effect: "",
        resistance: ""
      }
    },
    counters: {
      xp: {
        value: 0,
        total: 0
      },
      edgePools: {
        grit: {
          value: 2,
          rating: 2
        },
        insight: {
          value: 0,
          rating: 1
        },
        rumor: {
          value: 1,
          rating: 1
        },
        legend: {
          value: 0,
          rating: 1
        },
        credibility: {
          value: 1,
          rating: 1
        },
        chaos: {
          value: 1,
          rating: 1
        }
      }
    },
    prototypeToken: {
      actorLink: !0,
      disposition: 1,
      displayName: 20,
      displayBars: 40
    },
    style: "",
    speed: 12,
    keywords: [],
    dispositions: [],
    cues: [],
    burn: {
      value: 0,
      overloaded: !1
    },
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
    templates: [
      "description",
      "ownership"
    ],
    attributes: {
      strength: {
        value: 1
      },
      reflexes: {
        value: 1
      },
      intelligence: {
        value: 1
      },
      willpower: {
        value: 1
      },
      charisma: {
        value: 1
      },
      edge: {
        value: 1
      }
    },
    monitors: {
      physical: {
        value: 0,
        max: 10,
        resistance: {
          default: 0,
          byType: {}
        }
      },
      fatigue: {
        value: 0,
        max: 10,
        resistance: {
          default: 0,
          byType: {}
        }
      },
      armor: {
        label: "Armor",
        value: 0,
        max: 9,
        effect: "",
        resistance: ""
      }
    },
    role: "",
    biography: "",
    style: "sra-enhanced"
  },
  vehicle: {
    templates: [
      "description",
      "matrix-monitor",
      "mwd-vehicle"
    ],
    attributes: {},
    monitors: {
      structure: {
        value: 0,
        max: 15,
        resistance: {
          default: 2,
          byType: {}
        }
      },
      armor: {
        value: 0,
        max: 12,
        resistance: {
          default: 1,
          byType: {}
        }
      }
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
    pilot: {
      uuid: ""
    },
    crew: ""
  },
  battlemech: {
    templates: [
      "description",
      "mwd-battlemech"
    ],
    attributes: {},
    monitors: {
      structure: {
        value: 0,
        max: 18,
        resistance: {
          default: 1,
          byType: {}
        }
      },
      armor: {
        value: 0,
        max: 15,
        resistance: {
          default: 1,
          byType: {}
        }
      },
      heat: {
        value: 0,
        max: 4,
        resistance: {
          default: 0,
          byType: {}
        }
      }
    },
    hybrid: {
      heat: {
        dissipation: 1
      },
      criticals: {
        value: 0,
        max: 4,
        notes: ""
      },
      locations: {
        front: "",
        sides: "",
        rear: "",
        core: ""
      }
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
    pilot: {
      uuid: ""
    },
    crew: ""
  }
}, sg = {
  types: [
    "contact",
    "gear",
    "consumable",
    "quality",
    "assetModule",
    "skill",
    "lifeModule",
    "mechWeapon",
    "personalWeapon",
    "armor"
  ],
  templates: {
    modifiers: {
      modifiers: []
    },
    inactive: {
      inactive: !1
    },
    references: {
      sourceReference: "",
      description: "",
      gmnotes: ""
    }
  },
  skill: {
    templates: [
      "inactive",
      "references"
    ],
    code: "",
    attribute: "knowledge",
    value: 0,
    hasDrain: !1,
    hasConvergence: !1,
    isSocial: !1
  },
  quality: {
    templates: [
      "modifiers",
      "inactive",
      "references"
    ],
    positive: !0,
    category: "positive",
    tier: "minor",
    tags: [],
    activation: "passive",
    effects: [],
    prerequisites: [],
    limits: {
      perActivation: 0,
      perRound: 0,
      perScene: 0
    }
  },
  assetModule: {
    templates: [
      "modifiers",
      "inactive",
      "references"
    ],
    category: "special",
    level: 1
  },
  lifeModule: {
    templates: [
      "inactive",
      "references"
    ],
    moduleType: "faction"
  },
  mechWeapon: {
    templates: [
      "modifiers",
      "inactive",
      "references"
    ],
    weaponCategory: "ranged",
    hardpointType: "energy",
    hardpointSize: "small",
    mountLocation: "",
    damage: 0,
    damageType: "kinetic",
    heat: 0,
    area: "none",
    range: {
      max: "close",
      close: 0,
      near: 0,
      far: 0,
      extreme: 0
    }
  },
  personalWeapon: {
    templates: [
      "modifiers",
      "inactive",
      "references"
    ],
    equipped: !1,
    isPrimary: !1,
    category: "ranged",
    skill: "firearms",
    damage: 0,
    ap: 0,
    damageType: "penetrating",
    attackRatingBand: {
      close: 0,
      near: 0,
      far: 0,
      extreme: 0
    },
    range: {
      max: "extreme",
      close: 5,
      near: 26,
      far: 62,
      extreme: 120
    },
    standardTraits: [],
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
  armor: {
    templates: [
      "modifiers",
      "inactive",
      "references"
    ],
    equipped: !1,
    isPrimary: !1,
    rating: 0,
    defenseBonus: 0,
    mitigationByType: {
      penetrating: 0,
      concussive: 0,
      energy: 0,
      thermal: 0,
      electrical: 0
    },
    durability: {
      current: 0,
      max: 0
    },
    standardTraits: [],
    traitState: {
      reinforced: {
        current: 0,
        max: 0
      }
    },
    tags: [],
    traits: [],
    notes: ""
  },
  gear: {
    templates: [
      "inactive",
      "references"
    ],
    quantity: 1,
    rating: 0,
    category: "",
    tags: []
  },
  consumable: {
    templates: [
      "inactive",
      "references"
    ],
    quantity: 1,
    rating: 0,
    category: "ammo",
    tags: []
  },
  contact: {
    templates: [
      "inactive",
      "references"
    ]
  }
}, _s = {
  Actor: ng,
  Item: sg
}, Ol = Object.freeze({
  Actor: /* @__PURE__ */ new Set(["prototypeToken"]),
  Item: /* @__PURE__ */ new Set()
});
function rn(a) {
  return !!a && typeof a == "object" && !Array.isArray(a);
}
function Ia(a) {
  return typeof structuredClone == "function" ? structuredClone(a) : JSON.parse(JSON.stringify(a));
}
function on(a = {}, e = {}) {
  const t = Ia(a);
  for (const [i, n] of Object.entries(e ?? {})) {
    if (rn(n) && rn(t[i])) {
      t[i] = on(t[i], n);
      continue;
    }
    t[i] = Ia(n);
  }
  return t;
}
function fd(a = "", e = _s) {
  const t = e == null ? void 0 : e[a];
  return rn(t) ? t : {};
}
function pd(a = _s, e = "", t = "", i = /* @__PURE__ */ new Set()) {
  var c;
  const n = String(t ?? "").trim();
  if (!n || i.has(n)) return {};
  const s = fd(e, a), r = (c = s == null ? void 0 : s.templates) == null ? void 0 : c[n];
  if (!rn(r)) return {};
  i.add(n);
  let o = {};
  for (const u of Array.from(r.templates ?? []))
    o = on(
      o,
      pd(a, e, u, i)
    );
  const l = Ia(r);
  return delete l.templates, on(o, l);
}
function rg(a = _s, e = "", t = "") {
  const i = String(t ?? "").trim();
  if (!i) return {};
  const n = fd(e, a), s = n == null ? void 0 : n[i];
  if (!rn(s)) return {};
  let r = {};
  for (const l of Array.from(s.templates ?? []))
    r = on(
      r,
      pd(a, e, l)
    );
  const o = Ia(s);
  return delete o.templates, on(r, o);
}
function og(a = "", e = "", t = _s) {
  const i = rg(t, a, e), n = Ol[a] ?? Ol.Item, s = { system: {} };
  for (const [r, o] of Object.entries(i))
    n.has(r) ? s[r] = Ia(o) : s.system[r] = Ia(o);
  return s;
}
async function hd(a = "", e = "") {
  return og(a, e);
}
const gd = Object.freeze({
  weapon: A.itemType.personalWeapon,
  shadowamp: A.itemType.assetModule
}), lg = Object.freeze({
  contact: "systems/mwd/img/default/mystery-man.svg",
  gear: "systems/mwd/img/default/Default_Gear.svg",
  consumable: "systems/mwd/img/default/Default_Gear.svg",
  quality: "systems/mwd/img/default/card-joker.svg",
  assetModule: "systems/mwd/img/default/upgrade.svg",
  skill: "systems/mwd/img/default/Default_Skill.svg",
  lifeModule: "systems/mwd/img/default/book.svg",
  mechWeapon: "systems/mwd/img/default/Default_Weapon.svg",
  personalWeapon: "systems/mwd/img/colt-m1911.svg",
  armor: "systems/mwd/img/default/Default_Armor.svg"
});
function yd(a) {
  return gd[a] ?? a;
}
function cg(a) {
  return lg[yd(a)];
}
function ug(a) {
  return Object.prototype.hasOwnProperty.call(gd, a);
}
const ta = Object.freeze(["close", "near", "far", "extreme"]), _l = Object.freeze({
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
});
function Fa() {
  return foundry.data.operators.ForcedDeletion;
}
function dg(a, e) {
  const t = String(e ?? "").split(".").map((n) => n.trim()).filter(Boolean);
  if (!a || typeof a != "object" || t.length < 2) return a;
  let i = a;
  for (let n = 0; n < t.length - 1; n += 1) {
    const s = t[n], r = i == null ? void 0 : i[s];
    (!r || typeof r != "object" || Array.isArray(r)) && (i[s] = {}), i = i[s];
  }
  return a;
}
function mg(a, e) {
  const t = String(e ?? "").trim();
  if (!a || typeof a != "object" || !t) return !1;
  if (t.startsWith("areaEffect.hazard.")) {
    (!a.areaEffect || typeof a.areaEffect != "object" || Array.isArray(a.areaEffect)) && (a.areaEffect = {});
    const i = String(a.areaEffect.kind ?? "").trim().toLowerCase();
    if (i && i !== "persistent")
      return !1;
    a.areaEffect.kind = "persistent";
  }
  return dg(a, t), !0;
}
function Ua(a) {
  return Oa(a);
}
function Ll(a = {}) {
  const e = qc({
    traits: a.traits,
    keywords: a.keywords,
    report: To(),
    path: "system.traits"
  });
  return {
    traits: e.traits,
    keywords: e.keywords
  };
}
function bd(a) {
  return a === "long" ? "extreme" : a === "short" ? "close" : a === "medium" ? "near" : ta.includes(a) ? a : "near";
}
function ma(a) {
  const e = Ho(a);
  return e.max = bd(e.max ?? (a == null ? void 0 : a.max) ?? "extreme"), e;
}
function Js(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function xl(a, e = 1) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function $l(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function Bl(a) {
  return String(a ?? "").trim();
}
function zl(a) {
  return (Array.isArray(a) ? a : typeof a == "string" ? a.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function fg(a) {
  const e = ta.indexOf(a);
  return e >= 0 ? e : ta.indexOf("near");
}
function pg(a = ma({})) {
  const e = ["near", "close", "far", "extreme"], t = fg(a.max);
  return e.find((i) => ta.indexOf(i) <= t) ?? "close";
}
function hg(a) {
  const e = bd(a == null ? void 0 : a.max), t = ta.indexOf(e);
  return ta.map((i, n) => ({
    key: i,
    allowed: t >= 0 ? n <= t : n === 0,
    value: (a == null ? void 0 : a[i]) ?? void 0,
    labelkey: ns(i)
  }));
}
function gg(a, e, t, i) {
  let n = Number(e);
  if (t)
    if (i !== void 0)
      n += Math.ceil(Number(i) / 2);
    else
      return console.warn("Weapon not attached to an actor"), _e.item.personalWeapon.weaponWithoutActor;
  return n;
}
function yg(a, e, t) {
  let i = "";
  return t && _e.attributes[t] && (i += _e.attributes[t].substring(0, 3).toUpperCase() + "/2 + "), i += String(e), i;
}
function bg(a, e) {
  return j.useArmor(a) ? e ? "noArmor" : "withArmor" : "";
}
function Fl(a) {
  const e = game.system.mwd.skills.get(a);
  if (!e)
    return {
      img: DEFAULT_ITEM_ICONS.skill,
      system: {
        code: a,
        attribute: ""
      }
    };
  const t = {
    img: e.icon,
    system: {
      code: e.code,
      attribute: e.attribute
    }
  };
  return e.code !== "knowledge" && (t.name = e.label), t;
}
function Xs(a = {}) {
  const e = sn(a), t = Di(e.catalogId);
  return {
    system: e,
    ...t ? { name: t.label } : {}
  };
}
function Sg(a) {
  const e = String(a ?? "").trim();
  return !!(!e || e.startsWith("icons/svg/") || e === "icons/mystery-man.svg");
}
var cn, qt, Lr, Sd, zn;
const ft = class ft extends Item {
  static init() {
    H(this, cn) || ($e(this, cn, !0), Hooks.on("createItem", (e, t, i) => {
      var n, s;
      Promise.resolve((n = e.onCreateItem) == null ? void 0 : n.call(e, t, i)).catch((r) => {
        console.error(`${Me}Item create hook failed`, r);
      }), C(s = ft, qt, Lr).call(s, e);
    }), Hooks.on("updateItem", (e) => {
      var t;
      C(t = ft, qt, Lr).call(t, e);
    }), Hooks.on("deleteItem", (e) => {
      var t;
      C(t = ft, qt, Sd).call(t, e);
    }), Hooks.on("createActiveEffect", (e) => {
      var t;
      C(t = ft, qt, zn).call(t, e);
    }), Hooks.on("updateActiveEffect", (e) => {
      var t;
      C(t = ft, qt, zn).call(t, e);
    }), Hooks.on("deleteActiveEffect", (e) => {
      var t;
      C(t = ft, qt, zn).call(t, e);
    }));
  }
  static canonicalType(e) {
    return yd(e);
  }
  static defaultIconForType(e) {
    return cg(e);
  }
  get canonicalType() {
    return this.constructor.canonicalType(this.type);
  }
  async onCreateItem(e, t) {
  }
  async _preCreate(e, t, i) {
    super._preCreate && await super._preCreate(e, t, i);
    const n = (e == null ? void 0 : e.type) ?? this.type, s = this.constructor.canonicalType(n), r = {}, o = await hd("Item", s);
    if (o.system && Object.keys(o.system).length && (r.system = foundry.utils.mergeObject(
      foundry.utils.deepClone(o.system),
      foundry.utils.deepClone((e == null ? void 0 : e.system) ?? this.system ?? {}),
      { inplace: !1, recursive: !0, overwrite: !0 }
    )), n !== s && ug(n) && (r.type = s), Sg((e == null ? void 0 : e.img) ?? this.img)) {
      const l = this.constructor.defaultIconForType(s);
      l && (r.img = l);
    }
    if (s === A.itemType.lifeModule && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (r.name = "MWD.itemType.singular.lifeModule"), s === A.itemType.lifeModule) {
      const l = Xs(r.system ?? (e == null ? void 0 : e.system) ?? this.system ?? {});
      r.system = l.system, l.name && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (r.name = l.name);
    }
    Object.keys(r).length && this.updateSource(r);
  }
  async _preUpdate(e, t, i) {
    var l, c;
    super._preUpdate && await super._preUpdate(e, t, i);
    const n = e != null && e.system ? foundry.utils.mergeObject(foundry.utils.deepClone(this.system ?? {}), foundry.utils.deepClone(e.system), { inplace: !1 }) : null;
    if (n && this.isPersonalWeapon()) {
      e.system ?? (e.system = {});
      const u = n.ammo, d = Ll(n);
      e.system.standardTraits = [], e.system.payloads = fi(n.payloads, { legacyAmmo: u, category: n.category }), e.system.consumptionSources = ja(n.consumptionSources, { legacyAmmo: u }), e.system.selectedPayloadId = da(
        n.selectedPayloadId,
        e.system.payloads,
        { legacyAmmo: u, category: n.category }
      ), e.system.traits = d.traits, e.system.keywords = d.keywords, e.system.resolution = In(n.resolution, "standard"), e.system.fireModes = Dn(n.fireModes), e.system.attackRatingBand = Js(n.attackRatingBand), e.system.range = ma(n.range), e.system.damageType = Vt(n.damageType), e.system.ammo = Fa();
    }
    if (n && this.isArmor() && (e.system ?? (e.system = {}), e.system.mitigationByType = ri(n.mitigationByType ?? n.mitigation), e.system.tags = Nn(n.tags), e.system.traits = Ua(n.traits), e.system.standardTraits = mi(n.standardTraits), e.system.traitState = Ks({
      standardTraits: e.system.standardTraits,
      traits: e.system.traits,
      traitState: n.traitState
    }).traitState), n && this.isLifeModule()) {
      const u = Xs(n);
      e.system ?? (e.system = {}), foundry.utils.mergeObject(e.system, u.system, { inplace: !0, overwrite: !0 }), u.name && (e.name = u.name);
      return;
    }
    if (n && this.isQuality()) {
      e.system ?? (e.system = {});
      const u = Gt(n);
      foundry.utils.mergeObject(e.system, u, { inplace: !0, overwrite: !0 });
      return;
    }
    if (n && this.isQuantityTrackedInventoryItem()) {
      e.system ?? (e.system = {}), e.system.quantity = xl(n.quantity, 1), e.system.rating = $l(n.rating, 0), e.system.category = Bl(n.category), e.system.tags = zl(n.tags);
      return;
    }
    if (!this.isSkill()) return;
    const s = (l = e == null ? void 0 : e.system) == null ? void 0 : l.code;
    if (s === void 0) return;
    const r = this.system.code;
    if (s === r) return;
    const o = Fl(s);
    o && ((c = o == null ? void 0 : o.system) == null || delete c.code, foundry.utils.mergeObject(e, o, { inplace: !0 }));
  }
  prepareBaseData() {
    super.prepareBaseData();
    const e = this.canonicalType;
    e === A.itemType.personalWeapon ? this._preparePersonalWeaponBaseData() : e === A.itemType.armor ? this._prepareArmorBaseData() : e === A.itemType.lifeModule ? this._prepareLifeModuleBaseData() : e === A.itemType.quality ? this._prepareQualityBaseData() : [A.itemType.gear, A.itemType.consumable].includes(e) && this._prepareGearBaseData();
  }
  _preparePersonalWeaponBaseData() {
    const e = this.system ?? {}, t = e.ammo;
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = Vt(e.damageType), e.attackRatingBand = Js(e.attackRatingBand), e.range = ma(e.range);
    const i = Ll(e);
    e.standardTraits = [], e.traits = i.traits, e.keywords = i.keywords, e.resolution = In(e.resolution, "standard"), e.fireModes = Dn(e.fireModes), e.payloads = fi(e.payloads, { legacyAmmo: t, category: e.category }), e.consumptionSources = ja(e.consumptionSources, { legacyAmmo: t }), e.selectedPayloadId = da(e.selectedPayloadId, e.payloads, { legacyAmmo: t, category: e.category }), delete e.ammo, e.notes = String(e.notes ?? "").trim();
  }
  _prepareArmorBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.rating = Math.max(0, Number(e.rating ?? 0)), e.defenseBonus = Number(e.defenseBonus ?? 0) || 0, e.mitigationByType = ri(e.mitigationByType ?? e.mitigation), delete e.mitigation, e.durability ?? (e.durability = {}), e.durability.max = Math.max(0, Number(e.durability.max ?? e.rating ?? 0)), e.durability.current = Math.min(
      e.durability.max,
      Math.max(0, Number(e.durability.current ?? e.durability.max ?? e.rating ?? 0))
    ), e.standardTraits = mi(e.standardTraits), e.tags = Nn(e.tags), e.traits = Ua(e.traits), e.traitState = Ks({
      standardTraits: e.standardTraits,
      traits: e.traits,
      traitState: e.traitState
    }).traitState, e.notes = String(e.notes ?? "").trim();
  }
  _prepareLifeModuleBaseData() {
    const e = Xs(this.system ?? {});
    foundry.utils.mergeObject(this.system, e.system, { inplace: !0, overwrite: !0 });
  }
  _prepareQualityBaseData() {
    const e = Gt(this.system ?? {});
    foundry.utils.mergeObject(this.system, e, { inplace: !0, overwrite: !0 });
  }
  _prepareGearBaseData() {
    const e = this.system ?? {};
    e.quantity = xl(e.quantity, 1), e.rating = $l(e.rating, 0), e.category = Bl(e.category), e.tags = zl(e.tags);
  }
  getAttributes() {
    return [];
  }
  getUsableAttributes() {
    return this.getAttributes();
  }
  getAttributeValue(e) {
    var t;
    return this.system.attributes ? ((t = this.system.attributes[e]) == null ? void 0 : t.value) ?? 0 : 0;
  }
  hasOwnAnarchy() {
    return !1;
  }
  hasGMAnarchy() {
    return !1;
  }
  async nextConnectionMode() {
  }
  async setCheckbarValue(e, t) {
    return this.update({ [e]: t });
  }
  isWeapon() {
    return [A.itemType.mechWeapon, A.itemType.personalWeapon].includes(this.canonicalType);
  }
  isPersonalWeapon() {
    return this.canonicalType === A.itemType.personalWeapon;
  }
  isArmor() {
    return this.canonicalType === A.itemType.armor;
  }
  isLifeModule() {
    return this.canonicalType === A.itemType.lifeModule;
  }
  isQuality() {
    return this.canonicalType === A.itemType.quality;
  }
  isGear() {
    return this.canonicalType === A.itemType.gear;
  }
  isConsumable() {
    return this.canonicalType === A.itemType.consumable;
  }
  isQuantityTrackedInventoryItem() {
    return this.isGear() || this.isConsumable();
  }
  supportsEquippedEffectSync() {
    return this.isPersonalWeapon() || this.isArmor();
  }
  shouldApplyEquippedEffects() {
    var e;
    return this.supportsEquippedEffectSync() && !!this.actor && !!((e = this.system) != null && e.equipped);
  }
  getSyncedActorEffects({ actor: e = this.actor } = {}) {
    return e != null && e.effects ? e.effects.contents.filter((t) => {
      var n, s;
      const i = (s = (n = t.flags) == null ? void 0 : n[T]) == null ? void 0 : s[ft.EQUIPPED_EFFECT_FLAG];
      return (i == null ? void 0 : i.sourceItemId) === this.id;
    }) : [];
  }
  async removeSyncedActorEffects({ actor: e = this.actor } = {}) {
    const t = this.getSyncedActorEffects({ actor: e });
    return !t.length || !e ? [] : e.deleteEmbeddedDocuments("ActiveEffect", t.map((i) => i.id));
  }
  async syncEquippedActorEffects({ actor: e = this.actor } = {}) {
    var m, f, p, h;
    if (!e || !this.supportsEquippedEffectSync()) return { created: [], updated: [], deleted: [] };
    const t = this.getSyncedActorEffects({ actor: e }), i = Array.from(((m = this.effects) == null ? void 0 : m.contents) ?? []);
    if (!this.shouldApplyEquippedEffects()) {
      if (!t.length) return { created: [], updated: [], deleted: [] };
      const g = await e.deleteEmbeddedDocuments("ActiveEffect", t.map((y) => y.id));
      return { created: [], updated: [], deleted: g };
    }
    const n = /* @__PURE__ */ new Map();
    for (const g of t) {
      const y = (h = (p = (f = g.flags) == null ? void 0 : f[T]) == null ? void 0 : p[ft.EQUIPPED_EFFECT_FLAG]) == null ? void 0 : h.sourceEffectId;
      if (!y) continue;
      const b = n.get(y) ?? [];
      b.push(g), n.set(y, b);
    }
    const s = [], r = [], o = [], l = new Set(i.map((g) => g.id));
    for (const [g, y] of n.entries()) {
      if (!l.has(g)) {
        o.push(...y.map((b) => b.id));
        continue;
      }
      y.length > 1 && o.push(...y.slice(1).map((b) => b.id));
    }
    for (const g of i) {
      const b = (n.get(g.id) ?? [])[0] ?? null, S = this._prepareSyncedActorEffectData(g);
      b ? r.push({ _id: b.id, ...S }) : s.push(S);
    }
    const c = o.length ? await e.deleteEmbeddedDocuments("ActiveEffect", o) : [], u = r.length ? await e.updateEmbeddedDocuments("ActiveEffect", r) : [];
    return { created: s.length ? await e.createEmbeddedDocuments("ActiveEffect", s) : [], updated: u, deleted: c };
  }
  _prepareSyncedActorEffectData(e) {
    const t = e.toObject();
    delete t._id;
    const i = String(e.name ?? "Effect").trim() || "Effect", n = String(this.name ?? "Item").trim() || "Item", s = i.startsWith(n) ? i : `${n}: ${i}`;
    return t.name = s, t.transfer = !1, t.origin = e.uuid ?? this.uuid ?? t.origin ?? null, t.flags = foundry.utils.mergeObject(t.flags ?? {}, {
      [T]: {
        [ft.EQUIPPED_EFFECT_FLAG]: {
          synced: !0,
          sourceItemId: this.id,
          sourceItemUuid: this.uuid ?? null,
          sourceEffectId: e.id,
          sourceEffectUuid: e.uuid ?? null
        }
      }
    }), t;
  }
  isSkill() {
    return this.canonicalType === A.itemType.skill;
  }
  async rollAttribute(e) {
    this.parent && await ai.itemAttributeRoll(this, e);
  }
  async switchMonitorCheck(e, t, i, n = void 0) {
    await j.switchMonitorCheck(this.parent, e, t, i, n, this);
  }
  async setCounter(e, t) {
    await j.setCounter(this, e, t);
  }
  async createModifier(e = {}) {
    e = foundry.utils.mergeObject(e, {
      group: "roll",
      effect: "pool",
      category: "skill",
      subCategory: "",
      value: 0,
      condition: ""
    }), this._mutateModifiers((t) => t.concat([e]));
  }
  async deleteModifier(e) {
    await this._mutateModifiers((t) => t.filter((i) => i.id !== e));
  }
  async changeModifierSelection(e, t, i) {
    const n = this._computeModifierImpact(t, i);
    this._applyModifierUpdate(e, n);
  }
  _computeModifierImpact(e, t) {
    switch (e) {
      case "group":
        return (i) => {
          i.group !== t && (i.group = t, i.effect = "", i.category = "", i.subCategory = "");
        };
      case "effect":
        return (i) => i.effect = t;
      case "category":
        return (i) => {
          i.category !== t && (i.category = t, i.subCategory = "");
        };
      case "subCategory":
        return (i) => i.subCategory = t;
    }
    return (i) => {
    };
  }
  async changeModifierValue(e, t) {
    this._applyModifierUpdate(e, (i) => i.value = Number(t));
  }
  async changeModifierCondition(e, t) {
    this._applyModifierUpdate(e, (i) => i.condition = t);
  }
  async _applyModifierUpdate(e, t = (i) => {
  }) {
    await this._mutateModifiers((i) => i.map((n) => (n.id === e && t(n), n)));
  }
  async _mutateModifiers(e = (t) => t) {
    const t = e(this.system.modifiers);
    oe.reindexIds(t), await this.update({ "system.modifiers": t });
  }
  async _mutateQualitySystem(e = (t) => t) {
    const t = e(foundry.utils.deepClone(Gt(this.system ?? {})));
    await this.update({ system: Gt(t) });
  }
  async createQualityPrerequisite(e = {}) {
    await this._mutateQualitySystem((t) => (t.prerequisites = hi(t.prerequisites).concat([{
      id: e.id ?? foundry.utils.randomID(),
      fact: e.fact ?? "",
      comparator: e.comparator ?? "eq",
      value: e.value ?? ""
    }]), t));
  }
  async deleteQualityPrerequisite(e) {
    await this._mutateQualitySystem((t) => (t.prerequisites = hi(t.prerequisites).filter((i) => i.id !== e), t));
  }
  async updateQualityPrerequisite(e, t, i) {
    await this._mutateQualitySystem((n) => (n.prerequisites = hi(n.prerequisites).map((s) => (s.id !== e || (t === "fact" && (s.fact = i), t === "comparator" && (s.comparator = i), t === "value" && (s.value = i)), s)), n));
  }
  async createQualityEffect(e = {}) {
    await this._mutateQualitySystem((t) => (t.effects = Fi(t.effects).concat([{
      id: e.id ?? foundry.utils.randomID(),
      type: e.type ?? "rollMod",
      phase: e.phase ?? "onBuildRoll",
      selector: e.selector ?? "",
      skillKeys: e.skillKeys ?? [],
      label: e.label ?? "",
      value: Number(e.value ?? 0) || 0,
      min: e.min ?? null,
      max: e.max ?? null,
      pool: e.pool ?? "",
      operation: e.operation ?? "adjustAmount",
      conditions: hi(e.conditions ?? []),
      limit: Ii(e.limit ?? {})
    }]), t));
  }
  async deleteQualityEffect(e) {
    await this._mutateQualitySystem((t) => (t.effects = Fi(t.effects).filter((i) => i.id !== e), t));
  }
  async updateQualityEffect(e, t, i) {
    await this._mutateQualitySystem((n) => (n.effects = Fi(n.effects).map((s) => (s.id !== e || (t === "type" && (s.type = i), t === "phase" && (s.phase = i), t === "selector" && (s.selector = i), t === "skillKeys" && (s.skillKeys = Array.isArray(i) ? i : []), t === "label" && (s.label = i), t === "value" && (s.value = Number(i ?? 0) || 0), t === "min" && (s.min = i === "" ? null : Number(i ?? 0)), t === "max" && (s.max = i === "" ? null : Number(i ?? 0)), t === "pool" && (s.pool = i), t === "operation" && (s.operation = i), t === "limit.perActivation" && (s.limit = Ii({ ...s.limit ?? {}, perActivation: i })), t === "limit.perRound" && (s.limit = Ii({ ...s.limit ?? {}, perRound: i })), t === "limit.perScene" && (s.limit = Ii({ ...s.limit ?? {}, perScene: i }))), s)), n));
  }
  async createQualityEffectCondition(e, t = {}) {
    await this._mutateQualitySystem((i) => (i.effects = Fi(i.effects).map((n) => (n.id !== e || (n.conditions = hi(n.conditions).concat([{
      id: t.id ?? foundry.utils.randomID(),
      fact: t.fact ?? "",
      comparator: t.comparator ?? "eq",
      value: t.value ?? ""
    }])), n)), i));
  }
  async deleteQualityEffectCondition(e, t) {
    await this._mutateQualitySystem((i) => (i.effects = Fi(i.effects).map((n) => (n.id !== e || (n.conditions = hi(n.conditions).filter((s) => s.id !== t)), n)), i));
  }
  async updateQualityEffectCondition(e, t, i, n) {
    await this._mutateQualitySystem((s) => (s.effects = Fi(s.effects).map((r) => (r.id !== e || (r.conditions = hi(r.conditions).map((o) => (o.id !== t || (i === "fact" && (o.fact = n), i === "comparator" && (o.comparator = n), i === "value" && (o.value = n)), o))), r)), s));
  }
  async _mutateWeaponStandardTraits(e = (t) => t) {
    var i;
    const t = e(foundry.utils.deepClone(Ui((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": Ui(t) });
  }
  async createWeaponStandardTrait(e = {}) {
    await this._mutateWeaponStandardTraits((t) => t.concat([{
      id: e.id ?? foundry.utils.randomID(),
      key: e.key ?? "armorPiercing",
      rating: Math.max(0, Number(e.rating ?? 0) || 0)
    }]));
  }
  async deleteWeaponStandardTrait(e) {
    await this._mutateWeaponStandardTraits((t) => t.filter((i) => i.id !== e));
  }
  async updateWeaponStandardTrait(e, t, i) {
    await this._mutateWeaponStandardTraits((n) => n.map((s) => (s.id !== e || (t === "key" && (s.key = i), t === "rating" && (s.rating = Math.max(0, Number(i ?? 0) || 0))), s)));
  }
  async _mutateArmorStandardTraits(e = (t) => t) {
    var i;
    const t = e(foundry.utils.deepClone(mi((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": mi(t) });
  }
  async createArmorStandardTrait(e = {}) {
    await this._mutateArmorStandardTraits((t) => t.concat([{
      id: e.id ?? foundry.utils.randomID(),
      key: e.key ?? "ablative",
      rating: Math.max(0, Number(e.rating ?? 0) || 0)
    }]));
  }
  async deleteArmorStandardTrait(e) {
    await this._mutateArmorStandardTraits((t) => t.filter((i) => i.id !== e));
  }
  async updateArmorStandardTrait(e, t, i) {
    await this._mutateArmorStandardTraits((n) => n.map((s) => (s.id !== e || (t === "key" && (s.key = i), t === "rating" && (s.rating = Math.max(0, Number(i ?? 0) || 0))), s)));
  }
  async _mutatePayloads(e = (t) => t) {
    var n, s, r, o, l, c, u;
    const t = e(foundry.utils.deepClone(
      fi((n = this.system) == null ? void 0 : n.payloads, {
        legacyAmmo: (s = this.system) == null ? void 0 : s.ammo,
        category: ((r = this.system) == null ? void 0 : r.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
      })
    )).map(vt), i = da((l = this.system) == null ? void 0 : l.selectedPayloadId, t, {
      category: ((c = this.system) == null ? void 0 : c.category) ?? ((u = this.system) == null ? void 0 : u.weaponCategory)
    });
    await this.update({
      "system.payloads": t,
      "system.selectedPayloadId": i,
      "system.ammo": Fa()
    });
  }
  async _mutateConsumptionSources(e = (t) => t) {
    var i, n;
    const t = e(foundry.utils.deepClone(
      ja((i = this.system) == null ? void 0 : i.consumptionSources, { legacyAmmo: (n = this.system) == null ? void 0 : n.ammo })
    )).map(ii);
    await this.update({
      "system.consumptionSources": t,
      "system.ammo": Fa()
    });
  }
  async updatePayloadField(e, t, i) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((n) => n.map((s) => s.id !== e ? s : (mg(s, t) && foundry.utils.setProperty(s, t, i), vt(s))));
  }
  async createPayload(e = {}) {
    await this._mutatePayloads((t) => t.concat([vt({
      id: e.id ?? foundry.utils.randomID(),
      label: e.label ?? e.name ?? "Payload",
      compatibleWith: e.compatibleWith ?? [],
      modifies: e.modifies ?? {},
      traits: e.traits ?? [],
      keywords: e.keywords ?? [],
      template: e.template ?? null,
      areaEffect: e.areaEffect ?? { kind: "discrete" },
      resolution: e.resolution ?? { resolverKey: "standard" },
      consumption: e.consumption ?? { amount: 1, sourceId: "" }
    })]));
  }
  async deletePayload(e) {
    var s, r, o, l, c;
    if (String(e ?? "").trim() === "unloaded") return;
    const t = ((s = this.system) == null ? void 0 : s.category) ?? ((r = this.system) == null ? void 0 : r.weaponCategory), i = fi((o = this.system) == null ? void 0 : o.payloads, {
      legacyAmmo: (l = this.system) == null ? void 0 : l.ammo,
      category: t
    }).filter((u) => u.id !== e), n = ((c = i[0]) == null ? void 0 : c.id) ?? "unloaded";
    await this.update({
      "system.payloads": i.length ? i : fi([], { category: t }),
      "system.selectedPayloadId": i.some((u) => {
        var d;
        return u.id === ((d = this.system) == null ? void 0 : d.selectedPayloadId);
      }) ? this.system.selectedPayloadId : i.length ? n : "",
      "system.ammo": Fa()
    });
  }
  async createPayloadStandardTrait(e, t = {}) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((n) => n.id !== e ? n : (n.modifies ?? (n.modifies = {}), n.modifies.standardTraits = Ui(n.modifies.standardTraits).concat([{
      id: t.id ?? foundry.utils.randomID(),
      key: t.key ?? "armorPiercing",
      rating: Math.max(0, Number(t.rating ?? 0) || 0)
    }]), vt(n))));
  }
  async deletePayloadStandardTrait(e, t) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((n) => n.id !== e ? n : (n.modifies ?? (n.modifies = {}), n.modifies.standardTraits = Ui(n.modifies.standardTraits).filter((s) => s.id !== t), vt(n))));
  }
  async updatePayloadStandardTrait(e, t, i, n) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((s) => s.map((r) => r.id !== e ? r : (r.modifies ?? (r.modifies = {}), r.modifies.standardTraits = Ui(r.modifies.standardTraits).map((o) => (o.id !== t || (i === "key" && (o.key = n), i === "rating" && (o.rating = Math.max(0, Number(n ?? 0) || 0))), o)), vt(r))));
  }
  async createConsumptionSource(e = {}) {
    await this._mutateConsumptionSources((t) => t.concat([ii({
      id: e.id ?? foundry.utils.randomID(),
      label: e.label ?? "Source",
      kind: e.kind ?? "internal",
      tracking: e.tracking ?? { current: 0, max: 0 },
      link: e.link ?? {}
    })]));
  }
  async deleteConsumptionSource(e) {
    await this._mutateConsumptionSources((t) => t.filter((i) => i.id !== e)), await this._mutatePayloads((t) => t.map((i) => {
      var n;
      return ((n = i == null ? void 0 : i.consumption) == null ? void 0 : n.sourceId) !== e ? i : (i.consumption.sourceId = "", vt(i));
    }));
  }
  async updateConsumptionSourceField(e, t, i) {
    await this._mutateConsumptionSources((n) => n.map((s) => {
      var r, o, l;
      if (s.id !== e) return s;
      if (foundry.utils.setProperty(s, t, i), t === "kind" && s.kind === "itemRef" && (s.link ?? (s.link = {}), String(s.link.itemPath ?? "").trim() || (s.link.itemPath = "quantity"), (!String(s.label ?? "").trim() || String(s.label ?? "").trim() === "Source") && (s.label = "Linked Item")), t === "link.itemId" && s.kind === "itemRef") {
        s.link ?? (s.link = {}), String(s.link.itemPath ?? "").trim() || (s.link.itemPath = "quantity");
        const c = ((l = (o = (r = this.actor) == null ? void 0 : r.items) == null ? void 0 : o.get) == null ? void 0 : l.call(o, String(s.link.itemId ?? "").trim())) ?? null;
        c && (!String(s.label ?? "").trim() || ["Source", "Linked Item"].includes(String(s.label ?? "").trim())) && (s.label = c.name ?? s.label);
      }
      return ii(s);
    }));
  }
  getPayloadState({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var i, n, s, r, o;
    return Mr({
      payloads: (i = this.system) == null ? void 0 : i.payloads,
      selectedPayloadId: (n = this.system) == null ? void 0 : n.selectedPayloadId,
      consumptionSources: (s = this.system) == null ? void 0 : s.consumptionSources,
      actor: this.actor ?? null,
      payloadId: e || t,
      category: ((r = this.system) == null ? void 0 : r.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
    });
  }
  getActivePayloadReloadState({ payloadId: e = "", ammoTypeId: t = "", user: i = game.user } = {}) {
    var p, h, g;
    const n = String(((p = this.system) == null ? void 0 : p.category) ?? ((h = this.system) == null ? void 0 : h.weaponCategory) ?? "").trim().toLowerCase(), s = {
      canReload: !1,
      reason: "",
      payloadLabel: "",
      activePayloadId: "",
      current: 0,
      max: 0,
      inCombat: !1,
      source: null,
      sourceState: null,
      payloadState: null
    };
    if (!this.isPersonalWeapon())
      return { ...s, reason: "Only personal weapons can be reloaded from this sheet." };
    if (!this.actor)
      return { ...s, reason: "Reload is only available for weapons owned by an actor." };
    if (n === "melee")
      return { ...s, reason: "Melee weapons do not use reloadable payloads." };
    const r = this.getPayloadState({ payloadId: e || t }), o = (r == null ? void 0 : r.sourceState) ?? null, l = (r == null ? void 0 : r.source) ?? null, c = String((r == null ? void 0 : r.activePayloadId) ?? "").trim(), u = String((r == null ? void 0 : r.payloadLabel) ?? "").trim() || "Unloaded", d = Math.max(0, Number((o == null ? void 0 : o.current) ?? 0) || 0), m = Math.max(0, Number((o == null ? void 0 : o.max) ?? 0) || 0), f = !!((g = B.getCombat(this.actor)) != null && g.combatant);
    return !c || c === "unloaded" ? {
      ...s,
      reason: "Select a payload before reloading.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: l,
      sourceState: o,
      current: d,
      max: m,
      inCombat: f
    } : o != null && o.isTracked ? o.kind !== "internal" ? {
      ...s,
      reason: "Linked ammo sources are read-only from the weapon sheet.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: l,
      sourceState: o,
      current: d,
      max: m,
      inCombat: f
    } : m <= 0 ? {
      ...s,
      reason: "This payload source has no reloadable capacity.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: l,
      sourceState: o,
      current: d,
      max: m,
      inCombat: f
    } : f && !(i != null && i.isGM) ? {
      ...s,
      reason: "Only a GM can reload from the weapon sheet during combat.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: l,
      sourceState: o,
      current: d,
      max: m,
      inCombat: f
    } : d >= m ? {
      ...s,
      reason: "Magazine already full.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: l,
      sourceState: o,
      current: d,
      max: m,
      inCombat: f
    } : {
      canReload: !0,
      reason: "",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: l,
      sourceState: o,
      current: d,
      max: m,
      inCombat: f
    } : {
      ...s,
      reason: "This payload is untracked and does not need to be reloaded.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: l,
      sourceState: o,
      current: d,
      max: m,
      inCombat: f
    };
  }
  canReloadActivePayload({ detailed: e = !1, ...t } = {}) {
    const i = this.getActivePayloadReloadState(t);
    return e ? i : i.canReload;
  }
  async reloadActivePayload({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var n;
    const i = this.getActivePayloadReloadState({ payloadId: e, ammoTypeId: t });
    return !i.canReload || !((n = i.source) != null && n.id) ? { ok: !1, ...i } : (await this._mutateConsumptionSources((s) => s.map((r) => {
      var o;
      return r.id !== i.source.id ? r : (r.tracking ?? (r.tracking = {}), r.tracking.max = Math.max(0, Number(((o = r.tracking) == null ? void 0 : o.max) ?? i.max) || i.max), r.tracking.current = i.max, ii(r));
    })), {
      ok: !0,
      payloadLabel: i.payloadLabel,
      activePayloadId: i.activePayloadId,
      current: i.max,
      max: i.max,
      reloadedAmount: Math.max(0, i.max - i.current),
      sourceId: i.source.id
    });
  }
  async setActivePayload(e) {
    var i, n, s, r, o, l;
    const t = da(
      e,
      fi((i = this.system) == null ? void 0 : i.payloads, {
        legacyAmmo: (n = this.system) == null ? void 0 : n.ammo,
        category: ((s = this.system) == null ? void 0 : s.category) ?? ((r = this.system) == null ? void 0 : r.weaponCategory)
      }),
      {
        category: ((o = this.system) == null ? void 0 : o.category) ?? ((l = this.system) == null ? void 0 : l.weaponCategory)
      }
    );
    await this.update({
      "system.selectedPayloadId": t,
      "system.ammo": Fa()
    });
  }
  canConsumePayload({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var n;
    const i = this.getPayloadState({ payloadId: e || t });
    return (n = i == null ? void 0 : i.sourceState) != null && n.isTracked ? Number(i.sourceState.current ?? 0) >= Number(i.sourceState.consumePerUse ?? 1) : !0;
  }
  async consumePayload({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var r;
    const i = this.getPayloadState({ payloadId: e || t });
    if (!((r = i == null ? void 0 : i.sourceState) != null && r.isTracked)) return !0;
    const n = Math.max(1, Number(i.sourceState.consumePerUse ?? 1) || 1), s = Math.max(0, Number(i.sourceState.current ?? 0) || 0);
    return s < n ? !1 : i.sourceState.kind === "internal" ? (await this._mutateConsumptionSources((o) => o.map((l) => {
      var c;
      return l.id !== ((c = i.source) == null ? void 0 : c.id) ? l : (l.tracking ?? (l.tracking = {}), l.tracking.current = Math.max(0, s - n), ii(l));
    })), !0) : i.sourceState.kind === "actorResource" && this.actor && i.sourceState.currentPath ? (await this.actor.update({
      [i.sourceState.currentPath]: Math.max(0, s - n)
    }), !0) : i.sourceState.kind === "itemRef" && i.sourceState.sourceItem && i.sourceState.currentPath ? (await i.sourceState.sourceItem.update({
      [i.sourceState.currentPath]: Math.max(0, s - n)
    }), !0) : !1;
  }
  getAmmoState({ ammoTypeId: e = "" } = {}) {
    return this.getPayloadState({ payloadId: e });
  }
  async setActiveAmmoType(e) {
    await this.setActivePayload(e);
  }
  canConsumeAmmo({ ammoTypeId: e = "" } = {}) {
    return this.canConsumePayload({ payloadId: e });
  }
  async consumeAmmo({ ammoTypeId: e = "" } = {}) {
    return this.consumePayload({ payloadId: e });
  }
  async createAmmoType(e = {}) {
    await this.createPayload(e);
  }
  async deleteAmmoType(e) {
    await this.deletePayload(e);
  }
  async updateAmmoType(e, t, i) {
    const n = t === "name" ? "label" : t === "damageType" ? "modifies.damageType" : t === "apMod" ? "modifies.ap" : t.startsWith("attackRatingBandMod.") ? `modifies.attackRatingBand.${t.split(".")[1]}` : t === "traits" ? "traits" : t === "keywords" ? "keywords" : t;
    await this.updatePayloadField(e, n, i);
  }
  async createAmmoTypeStandardTrait(e, t = {}) {
    await this.createPayloadStandardTrait(e, t);
  }
  async deleteAmmoTypeStandardTrait(e, t) {
    await this.deletePayloadStandardTrait(e, t);
  }
  async updateAmmoTypeStandardTrait(e, t, i, n) {
    await this.updatePayloadStandardTrait(e, t, i, n);
  }
  getCombatProfile({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    if (!this.isPersonalWeapon()) return null;
    const i = this.system ?? {}, n = ma(i.range), s = String(i.skill ?? "").trim(), r = zt(s), o = Number(i.damage ?? 0) || 0, l = String(i.category ?? i.weaponCategory ?? "ranged").trim() || "ranged", c = Ff({
      damageType: i.damageType,
      ap: Number(i.ap ?? i.armorPiercing ?? 0) || 0,
      attackRatingBand: Js(i.attackRatingBand),
      traits: Ua(i.traits),
      keywords: Ef(i.keywords),
      standardTraits: [],
      resolution: In(i.resolution, "standard"),
      fireModes: Dn(i.fireModes),
      payloads: fi(i.payloads, { legacyAmmo: i.ammo, category: l }),
      selectedPayloadId: da(i.selectedPayloadId, i.payloads, { legacyAmmo: i.ammo, category: l }),
      consumptionSources: ja(i.consumptionSources, { legacyAmmo: i.ammo }),
      payloadId: e || t,
      actor: this.actor ?? null,
      category: l
    });
    return {
      id: this.id ?? "weapon",
      uuid: this.uuid ?? null,
      name: this.name ?? "Weapon",
      img: this.img,
      item: this,
      type: this.canonicalType,
      equipped: !!i.equipped,
      isPrimary: !!i.isPrimary,
      category: l,
      skill: s || "firearms",
      skillDef: r,
      damage: o,
      ap: c.ap,
      damageType: c.damageType,
      damageTypeLabel: Yt(c.damageType),
      attackRatingBand: c.attackRatingBand,
      range: n,
      defaultRangeBand: this.getDefaultRangeBand(n),
      traits: c.traits,
      keywords: c.keywords,
      standardTraits: c.standardTraits,
      effects: c.effects,
      payloadLabel: c.payloadLabel,
      payload: c.payload,
      payloadState: c.payloadState,
      source: c.source,
      sourceState: c.sourceState,
      template: c.template,
      areaEffect: c.areaEffect,
      resolution: c.resolution,
      resolverKey: c.resolverKey,
      fireModes: c.fireModes,
      capabilityReport: c.capabilityReport,
      ammoLabel: c.payloadLabel,
      ammoType: c.payload,
      ammoState: c.ammoState,
      notes: String(i.notes ?? i.description ?? "").trim()
    };
  }
  getArmorProfile({ actor: e = this.actor } = {}) {
    var d, m;
    if (!this.isArmor()) return null;
    const t = this.system ?? {}, i = Math.max(0, Number(t.rating ?? 0)), n = Math.max(0, Number(((d = t == null ? void 0 : t.durability) == null ? void 0 : d.max) ?? i)), s = Math.min(
      n,
      Math.max(0, Number(((m = t == null ? void 0 : t.durability) == null ? void 0 : m.current) ?? n))
    ), r = Math.min(i, s), o = ri((t == null ? void 0 : t.mitigationByType) ?? (t == null ? void 0 : t.mitigation)), l = Ks({
      standardTraits: mi(t == null ? void 0 : t.standardTraits),
      traits: Ua(t == null ? void 0 : t.traits),
      traitState: t == null ? void 0 : t.traitState
    }), c = Nn(t == null ? void 0 : t.tags), u = Mo(r);
    return {
      id: this.id ?? "armor",
      uuid: this.uuid ?? null,
      name: this.name ?? "Armor",
      img: this.img,
      type: this.canonicalType,
      item: this,
      actor: e,
      equipped: !!t.equipped,
      isPrimary: !!t.isPrimary,
      rating: i,
      defenseBonus: Number(t.defenseBonus ?? 0) || 0,
      currentArmorRating: r,
      ratingCurrent: r,
      remainingDurability: s,
      baseMitigation: u,
      baseResistance: u,
      mitigationByType: hu(o, l.mitigationByType),
      tags: c,
      isDestroyed: s <= 0,
      durability: {
        current: s,
        max: n
      },
      traitState: l.traitState,
      standardTraits: mi(t.standardTraits),
      traits: Uf({
        traits: Ua(t.traits),
        standardTraits: mi(t.standardTraits)
      }),
      notes: String(t.notes ?? "").trim()
    };
  }
  getDefaultRangeBand(e = ma(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    return pg(e);
  }
  isWeaponSkill(e) {
    return ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === A.itemType.skill && e.system.code === this.system.skill;
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find((n) => this.isWeaponSkill(n));
    if (e) return e;
    const t = game.items.find((n) => this.isWeaponSkill(n));
    return t || Fl(this.system.skill);
  }
  getDefense() {
    if (!this.isPersonalWeapon())
      return this.system.defense ? xe.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return xe.fixedDefenseCode(this.system.defense);
    const e = zt(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? xe.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent) return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0, i = this.isPersonalWeapon() ? this.getCombatProfile() : null;
    return {
      value: gg(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: (i == null ? void 0 : i.damageType) ?? this.system.damageType,
      damageTypeLabel: (i == null ? void 0 : i.damageTypeLabel) ?? this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: bg(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  getDamageCode() {
    return yg(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  getDamageTypeLabel() {
    var t;
    if (this.isPersonalWeapon())
      return Yt(((t = this.getCombatProfile()) == null ? void 0 : t.damageType) ?? this.system.damageType);
    const e = _e.mwd.weaponDamageType[this.system.damageType] ?? _e.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return hg(ma(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  validateTargets(e) {
    var r;
    const t = (r = this.getDamage()) == null ? void 0 : r.monitor, i = Kt.getTargetTokens(game.user), n = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), s = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (s.length > 0) {
      const o = Pe(_e.common.errors.ignoredTargets, {
        targets: s.reduce(oe.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (n.length === 0) {
      const o = Pe(_e.common.errors.noTargetSelected, {
        weapon: this.name ?? _e.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(n);
    return n;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = _l[t] ?? {};
    na.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = _l[t] ?? {};
    return i.targets && i.adjust && e <= i.targets ? i.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area === "" ? A.area.none : this.system.area ?? A.area.none;
  }
  _getMonitor() {
    return this.isPersonalWeapon() ? A.monitors.physical : this.system.monitor || A.monitors.physical;
  }
  isKnowledgeSkill() {
    return this.isSkill() && this.system.code === "knowledge";
  }
  isGeneralSkill() {
    return this.isSkill() && this.system.code !== "knowledge";
  }
  prepareShortcut() {
    if (this.isSkill())
      return {
        img: this.img,
        label: this.name,
        callback: (e) => e.actor.rollSkill(this)
      };
    if (this.isWeapon())
      return {
        img: this.img,
        label: this.name,
        callback: (e) => e.actor.rollWeapon(this)
      };
  }
  prepateShortcut() {
    return this.prepareShortcut();
  }
};
cn = new WeakMap(), qt = new WeakSet(), Lr = async function(e) {
  if (typeof (e == null ? void 0 : e.syncEquippedActorEffects) == "function")
    try {
      await e.syncEquippedActorEffects();
    } catch (t) {
      console.error(`${Me}Failed to sync equipped item effects`, { item: e, error: t });
    }
}, Sd = async function(e) {
  if (typeof (e == null ? void 0 : e.removeSyncedActorEffects) == "function")
    try {
      await e.removeSyncedActorEffects({ actor: e.actor ?? e.parent ?? null });
    } catch (t) {
      console.error(`${Me}Failed to remove synced item effects`, { item: e, error: t });
    }
}, zn = async function(e) {
  const t = e == null ? void 0 : e.parent;
  if (typeof (t == null ? void 0 : t.syncEquippedActorEffects) == "function")
    try {
      await t.syncEquippedActorEffects();
    } catch (i) {
      console.error(`${Me}Failed to sync parent item effects`, { effect: e, error: i });
    }
}, Ce(ft, qt), Ce(ft, cn, !1), D(ft, "RANGE_ORDER", ta), D(ft, "EQUIPPED_EFFECT_FLAG", "equippedItemSync"), D(ft, "DEFAULT_UNARMED", Object.freeze({
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
    single: { enabled: !1 },
    burst: { enabled: !1 },
    fullAuto: { enabled: !1 }
  },
  payloads: [],
  selectedPayloadId: "",
  consumptionSources: [{
    id: "untracked",
    label: "Untracked",
    kind: "untracked",
    tracking: { current: 0, max: 0 },
    link: { actorPath: "", itemId: "", itemPath: "" }
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
    isTracked: !1
  },
  payloadLabel: "",
  traits: [],
  notes: ""
}));
let Da = ft;
const Ul = {
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
}, Ag = {
  code: "weapon-range",
  options: {
    flags: { editable: !0 },
    order: 20,
    category: we.pool,
    labelkey: _e.common.roll.modifiers.weaponRange,
    hbsTemplateRoll: `${X}/roll/parts/select-option.hbs`,
    hbsTemplateChat: void 0
    //``
  },
  isUsed: (a) => !0,
  condition: (a) => a.weapon,
  factory: (a) => {
    const e = a.weapon.getRanges(), t = e.map((i) => i.value);
    return {
      value: e[0].value,
      min: Math.min(...t),
      max: Math.max(...t),
      choices: e,
      selected: e[0].labelkey
    };
  }
}, Tg = {
  code: "weapon-area",
  options: {
    used: !0,
    order: 20,
    category: we.pool,
    labelkey: _e.common.roll.modifiers.weaponArea,
    hbsTemplateRoll: `${X}/roll/parts/input-numeric.hbs`,
    hbsTemplateChat: void 0
    //``
  },
  isUsed: (a) => a.used,
  condition: (a) => a.weapon && a.weapon.getArea() != A.area.none,
  factory: (a) => {
    var i;
    const e = ((i = a.targeting.targetedTokenIds) == null ? void 0 : i.length) ?? 1, t = a.weapon.getAreaModifier(e);
    return {
      value: t,
      min: Math.min(0, t),
      max: Math.max(0, t),
      used: e > 1
    };
  }
}, Se = class Se extends Da {
  static buildDefaultUnarmedProfile(e = null) {
    var n, s, r, o, l, c, u, d;
    const t = Math.max(0, Number(
      ((n = e == null ? void 0 : e.getAttributeValue) == null ? void 0 : n.call(e, A.actorAttributes.strength)) ?? ((o = (r = (s = e == null ? void 0 : e.system) == null ? void 0 : s.attributes) == null ? void 0 : r.strength) == null ? void 0 : o.value) ?? 0
    ) || 0), i = Math.max(0, Number(
      ((l = e == null ? void 0 : e.getAttributeValue) == null ? void 0 : l.call(e, A.actorAttributes.reflexes)) ?? ((d = (u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.attributes) == null ? void 0 : u.reflexes) == null ? void 0 : d.value) ?? 0
    ) || 0);
    return {
      ...foundry.utils.deepClone(this.DEFAULT_UNARMED),
      damage: Math.ceil(t / 2),
      attackRatingBand: {
        ...this.DEFAULT_UNARMED.attackRatingBand,
        close: i
      },
      range: {
        ...this.DEFAULT_UNARMED.range,
        max: "close"
      },
      uuid: null,
      img: null,
      item: null,
      equipped: !0,
      isPrimary: !1,
      defaultRangeBand: "close",
      isSynthetic: !0
    };
  }
  static init() {
    Hooks.once(Mt.REGISTER_ROLL_PARAMETERS, (e) => {
      e(Tg), e(Ag);
    });
  }
  prepareBaseData() {
    if (super.prepareBaseData(), (this.canonicalType ?? this.type) !== A.itemType.personalWeapon) return;
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = Vt(e.damageType), e.attackRatingBand = Se.normalizeAttackRatingBand(e.attackRatingBand), e.range = Se.normalizePersonalRangeData(e.range), e.traits = Se.normalizeTraits(e.traits), e.notes = String(e.notes ?? "").trim();
  }
  static maxIndex(e) {
    const t = Se.RANGE_ORDER.indexOf(e);
    return t >= 0 ? t : Se.RANGE_ORDER.indexOf("near");
  }
  /**
    * Compute UI-friendly range band data:
    * - cap: normalized max band
    * - bands: [{key, allowed, value}]
    * - optimalKey: highest value among allowed (tie -> closest)
    */
  static getRangeBands(e) {
    const t = e ?? {}, i = Se.normalizeRangeKey(t.max ?? "near"), n = Se.maxIndex(i), s = Se.RANGE_ORDER.map((l, c) => ({
      key: l,
      allowed: c <= n,
      value: Number(t[l] ?? (l === "extreme" && t.long !== void 0 ? t.long : 0))
    }));
    let r = "close", o = -1 / 0;
    for (const l of s)
      l.allowed && l.value > o && (o = l.value, r = l.key);
    return { cap: i, bands: s, optimalKey: r };
  }
  static get defaultIcon() {
    return "systems/mwd/img/colt-m1911.svg";
  }
  static defaultIconForType(e) {
    return e === A.itemType.mechWeapon ? "systems/mwd/img/default/Default_Weapon.svg" : this.defaultIcon;
  }
  static normalizeTraits(e) {
    return Oa(e);
  }
  static normalizePersonalRangeData(e) {
    const t = Ho(e);
    return t.max = Se.normalizeRangeKey(t.max ?? (e == null ? void 0 : e.max) ?? "extreme"), t;
  }
  static normalizeRangeData(e) {
    return {
      max: Se.normalizeRangeKey((e == null ? void 0 : e.max) ?? "near"),
      close: Number((e == null ? void 0 : e.close) ?? (e == null ? void 0 : e.short) ?? 0) || 0,
      near: Number((e == null ? void 0 : e.near) ?? (e == null ? void 0 : e.medium) ?? 0) || 0,
      far: Number((e == null ? void 0 : e.far) ?? (e == null ? void 0 : e.long) ?? 0) || 0,
      extreme: Number((e == null ? void 0 : e.extreme) ?? 0) || 0
    };
  }
  static normalizeAttackRatingBand(e) {
    return {
      close: Number((e == null ? void 0 : e.close) ?? (e == null ? void 0 : e.short) ?? 0) || 0,
      near: Number((e == null ? void 0 : e.near) ?? (e == null ? void 0 : e.medium) ?? 0) || 0,
      far: Number((e == null ? void 0 : e.far) ?? (e == null ? void 0 : e.long) ?? 0) || 0,
      extreme: Number((e == null ? void 0 : e.extreme) ?? 0) || 0
    };
  }
  getCombatProfile(e = {}) {
    if ((this.canonicalType ?? this.type) === A.itemType.personalWeapon)
      return super.getCombatProfile(e);
    const t = this.system ?? {}, i = this.canonicalType ?? this.type, n = i === A.itemType.personalWeapon ? Se.normalizePersonalRangeData(t.range) : Se.normalizeRangeData(t.range), s = String(t.skill ?? "").trim(), r = zt(s), o = Number(t.damage ?? 0) || 0, l = Number(t.ap ?? t.armorPiercing ?? 0) || 0, c = String(t.category ?? t.weaponCategory ?? "ranged").trim() || "ranged", u = Se.normalizeTraits(t.traits);
    return {
      id: this.id ?? "weapon",
      uuid: this.uuid ?? null,
      name: this.name ?? "Weapon",
      img: this.img,
      item: this,
      type: i,
      equipped: !!t.equipped,
      isPrimary: !!t.isPrimary,
      category: c,
      skill: s || "firearms",
      skillDef: r,
      damage: o,
      ap: l,
      damageType: i === A.itemType.personalWeapon ? Vt(t.damageType) : String(t.damageType ?? "kinetic").trim() || "kinetic",
      attackRatingBand: Se.normalizeAttackRatingBand(t.attackRatingBand),
      range: n,
      defaultRangeBand: this.getDefaultRangeBand(n),
      traits: u,
      effects: {},
      notes: String(t.notes ?? t.description ?? "").trim()
    };
  }
  getDefaultRangeBand(e = Se.normalizeRangeData(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    const i = ["near", "close", "far", "extreme"], n = Se.maxIndex(e.max);
    return i.find((s) => Se.RANGE_ORDER.indexOf(s) <= n) ?? "close";
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find(
      (n) => n.type === A.itemType.skill && n.system.code === this.system.skill
    );
    if (e) return e;
    const t = zt(String(this.system.skill ?? "").trim());
    return t ? {
      name: t.label,
      system: {
        code: t.code,
        attribute: t.attribute,
        value: 0
      }
    } : null;
  }
  getDefense() {
    if ((this.canonicalType ?? this.type) !== A.itemType.personalWeapon)
      return this.system.defense ? xe.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return xe.fixedDefenseCode(this.system.defense);
    const e = zt(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? xe.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent)
      return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0;
    return {
      value: Se.damageValue(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: this.system.damageType,
      damageTypeLabel: this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: Se.armorMode(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  static damageValue(e, t, i, n) {
    if (t = Number(t), i)
      if (n !== void 0)
        t = t + Math.ceil(Number(n) / 2);
      else
        return console.warn("Weapon not attached to an actor"), _e.item.personalWeapon.weaponWithoutActor;
    return t;
  }
  getDamageCode() {
    return Se.damageCode(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  static damageCode(e, t, i) {
    let n = "";
    return i && _e.attributes[i] && (n += _e.attributes[i].substring(0, 3).toUpperCase() + "/2 + "), n += String(t), n;
  }
  static armorMode(e, t) {
    return j.useArmor(e) ? t ? "noArmor" : "withArmor" : "";
  }
  getDamageTypeLabel() {
    if ((this.canonicalType ?? this.type) === A.itemType.personalWeapon)
      return Yt(this.system.damageType);
    const e = _e.mwd.weaponDamageType[this.system.damageType] ?? _e.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    const e = (this.canonicalType ?? this.type) === A.itemType.personalWeapon, t = e ? Se.normalizePersonalRangeData(this.system.range) : Se.normalizeRangeData(this.system.range);
    return Se.getRangeList(t, {
      personalScale: e
    }).filter((i) => i.allowed).map((i) => ({ value: i.value, labelkey: i.labelkey }));
  }
  _getRange(e) {
    return { value: this.system.range[e], labelkey: ve.getFromList(ve.getEnums().ranges, e) };
  }
  static getRangeList(e, { personalScale: t = !1 } = {}) {
    const i = Se.normalizeRangeKey(e == null ? void 0 : e.max), n = Se.RANGE_ORDER.indexOf(i);
    return Se.RANGE_ORDER.map((s, r) => ({
      key: s,
      allowed: n >= 0 ? r <= n : r === 0,
      value: (e == null ? void 0 : e[s]) ?? (s === "extreme" && (e == null ? void 0 : e.long) !== void 0 ? e.long : void 0),
      labelkey: t ? ns(s) : ve.getFromList(ve.getEnums().ranges, s)
    }));
  }
  static normalizeRangeKey(e) {
    return e === "long" ? "extreme" : e;
  }
  prepareShortcut() {
    return {
      img: this.img,
      label: this.name,
      callback: (e) => e.actor.rollWeapon(this)
    };
  }
  validateTargets(e) {
    var r;
    const t = (r = this.getDamage()) == null ? void 0 : r.monitor, i = Kt.getTargetTokens(game.user), n = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), s = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (s.length > 0) {
      const o = Pe(_e.common.errors.ignoredTargets, {
        targets: s.reduce(oe.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (n.length == 0) {
      const o = Pe(_e.common.errors.noTargetSelected, {
        weapon: this.name ?? _e.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(n);
    return n;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = Ul[t] ?? {};
    na.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = Ul[t] ?? {};
    return i.targets && i.adjust && e <= i.targets ? i.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area == "" ? A.area.none : this.system.area ?? A.area.none;
  }
  _getMonitor() {
    return (this.canonicalType ?? this.type) === A.itemType.personalWeapon ? A.monitors.physical : this.system.monitor || A.monitors.physical;
  }
};
D(Se, "RANGE_ORDER", ["close", "near", "far", "extreme"]), D(Se, "DEFAULT_UNARMED", Da.DEFAULT_UNARMED);
let $t = Se;
function wg(a) {
  const e = [];
  for (let [t, i] of Object.entries(a ?? {}))
    i !== void 0 && (t = t.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (n, s) => (s ? "-" : "") + n.toLowerCase()), e.push(`data-${t}="${Handlebars.escapeExpression(i)}"`));
  return new Handlebars.SafeString(e.join(" "));
}
function kg({ hash: a }) {
  return a;
}
function vg() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
class Go {
  constructor() {
    this.registerHelpers(), Hooks.once("init", () => {
      this.registerHelpers(), console.log(`${Me}Handlebars helpers registered (init)`);
    }), console.log(`${Me}Handlebars helpers registered (ctor)`);
  }
  registerHelpers() {
    const e = vg(), t = {
      // Foundry utils
      getProperty: foundry.utils.getProperty,
      // DND5E-inspired utilities
      "mwd-dataset": wg,
      "mwd-object": kg,
      // Simple comparisons
      eq: (i, n) => i === n,
      ne: (i, n) => i !== n,
      // Strings/arrays
      concat: (...i) => oe.join(i.slice(0, -1)),
      join: (i, n = " ") => Array.isArray(i) ? i.join(n) : "",
      includes: (i, n) => i == null ? void 0 : i.includes(n),
      length: (i) => (i == null ? void 0 : i.length) || 0,
      substring: (i, n, s) => i == null ? void 0 : i.substring(n, s),
      toUpperCase: Um.toUpperCaseNoAccent,
      // Math
      modulo: (i, n) => i % n,
      divint: oe.divint,
      divup: oe.divup,
      sum: (i, n) => i + n,
      diff: (i, n) => i - n,
      times: (i, n) => i * n,
      min: (i, n) => Math.min(i, n),
      max: (i, n) => Math.max(i, n),
      // Utility blocks
      for: Go.hbsForLoop,
      // fixes “Missing helper: for”
      range: (i, n) => Array.from({ length: n - i + 1 }, (s, r) => i + r),
      ifGte: (i, n, s) => i >= n ? s.fn(this) : s.inverse(this),
      // Damage / weapons (legacy-compatible)
      weaponDamageLetter: Fm.letter,
      weaponDamageCode: $t.damageCode,
      weaponDamageValue: $t.damageValue,
      weaponArmorMode: $t.armorMode,
      weaponRangeList: $t.getRangeList,
      // Icons
      iconFA: J.fontAwesome,
      iconSrc: J.iconSystemPath,
      iconPath: J.iconPath,
      iconD6: J.iconD6,
      // Enums
      localizeAttribute: ve.localizeAttribute
    };
    e.registerHelper(t), e !== Handlebars && Handlebars.registerHelper(t);
  }
  static hbsForLoop(e, t, i) {
    let n = "";
    for (let s = e; s < t; ++s) n += i.fn(s);
    return n;
  }
}
const Hl = "sheetTheme", xr = "mwd-theme-default", Mg = "mwd-theme-sra", Cg = [
  { name: "Default (CSB)", cssClass: xr },
  { name: "SRA", cssClass: Mg }
];
class Eg {
  constructor() {
    this.availableStyles = {}, Ji.register(Mt.REGISTER_STYLES), Hooks.once(Mt.REGISTER_STYLES, (e) => Cg.forEach((t) => e(t.cssClass, t.name))), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(Mt.REGISTER_STYLES, (e, t) => this.availableStyles[e] = t), console.log(Me + "Loaded styles", this.availableStyles), game.settings.register(T, Hl, {
      scope: "world",
      name: "Sheet Theme",
      hint: "Select the visual theme used by MWD sheets.",
      config: !0,
      default: xr,
      choices: this.availableStyles,
      type: String,
      onChange: () => {
        setTimeout(() => {
          var e, t;
          for (const i of Object.values(ui.windows ?? {})) {
            if (typeof (i == null ? void 0 : i.render) != "function") continue;
            const n = i.element instanceof HTMLElement ? i.element : (e = i.element) == null ? void 0 : e[0];
            (t = n == null ? void 0 : n.classList) != null && t.contains("actor-sheet-v2") && i.render(!1);
          }
        }, 0);
      }
    });
  }
  selectCssClass() {
    const e = game.settings.get(T, Hl);
    return this.availableStyles[e] ? e : xr;
  }
}
const Pg = /* @__PURE__ */ new Set([A.actorTypes.vehicle, A.actorTypes.battlemech]), Rg = Object.freeze({
  head: "Head",
  torsoFront: "Front Torso",
  torsoRear: "Rear Torso",
  leftArm: "Left Arm",
  rightArm: "Right Arm",
  leftLeg: "Left Leg",
  rightLeg: "Right Leg",
  core: "Core",
  front: "Front",
  side: "Side",
  rear: "Rear",
  turret: "Turret",
  rotor: "Rotor"
});
function Ng(a) {
  const e = Math.trunc(Number(a ?? 0));
  return Number.isFinite(e) ? Math.min(18, Math.max(3, e)) : 10;
}
function Ad(a = null) {
  return String((a == null ? void 0 : a.type) ?? a ?? "").trim();
}
function Ig(a = null) {
  var t, i;
  const e = ((i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.mwd) == null ? void 0 : i.locations) ?? {};
  return Object.entries(e).filter(([, n]) => (n == null ? void 0 : n.enabled) !== !1).map(([n]) => n);
}
function ke(a, e = [], t = "core") {
  const i = new Set(Ig(a));
  return e.find((n) => i.has(n)) ?? e[0] ?? t;
}
function Dg(a = "") {
  return a === "head" ? "head" : a.includes("Arm") ? "arms" : a.includes("Leg") ? "legs" : ["front", "side", "rear", "rotor"].includes(a) ? "motive" : a === "turret" ? "weapon" : a.includes("torso") ? "torso" : "core";
}
function Og(a, e) {
  return e <= 4 ? { locationKey: ke(a, ["core", "torsoFront"]), family: "critical" } : e === 5 ? { locationKey: ke(a, ["leftLeg", "rightLeg"]), family: "legs" } : e === 6 ? { locationKey: ke(a, ["rightLeg", "leftLeg"]), family: "legs" } : e === 7 ? { locationKey: ke(a, ["leftArm", "rightArm"]), family: "arms" } : e === 8 ? { locationKey: ke(a, ["rightArm", "leftArm"]), family: "arms" } : e <= 10 ? { locationKey: ke(a, ["torsoFront", "core"]), family: "torso" } : e === 11 ? { locationKey: ke(a, ["core", "torsoFront"]), family: "core" } : e <= 13 ? { locationKey: ke(a, ["torsoRear", "core"]), family: "torso" } : e === 14 ? { locationKey: ke(a, ["leftArm", "rightArm"]), family: "arms" } : e === 15 ? { locationKey: ke(a, ["rightArm", "leftArm"]), family: "arms" } : e === 16 ? { locationKey: ke(a, ["leftArm", "rightArm"]), family: "arms" } : e === 17 ? { locationKey: ke(a, ["leftLeg", "rightLeg"]), family: "legs" } : { locationKey: ke(a, ["head", "torsoFront", "core"]), family: "head" };
}
function _g(a, e) {
  return e <= 4 ? { locationKey: ke(a, ["core", "front"]), family: "critical" } : e === 5 ? { locationKey: ke(a, ["front", "core"]), family: "motive" } : e <= 7 ? { locationKey: ke(a, ["side", "front"]), family: "motive" } : e === 8 ? { locationKey: ke(a, ["rear", "side"]), family: "motive" } : e === 9 ? { locationKey: ke(a, ["front", "core"]), family: "motive" } : e === 10 ? { locationKey: ke(a, ["core", "front"]), family: "core" } : e === 11 ? { locationKey: ke(a, ["turret", "core"]), family: "weapon" } : e === 12 ? { locationKey: ke(a, ["side", "front"]), family: "motive" } : e === 13 ? { locationKey: ke(a, ["rear", "side"]), family: "motive" } : e === 14 ? { locationKey: ke(a, ["front", "side"]), family: "motive" } : e === 15 ? { locationKey: ke(a, ["core", "rear"]), family: "core" } : e === 16 ? { locationKey: ke(a, ["turret", "core"]), family: "weapon" } : e === 17 ? { locationKey: ke(a, ["side", "front", "rotor"]), family: "motive" } : { locationKey: ke(a, ["core", "front"]), family: "core" };
}
function ss(a = "") {
  return Rg[a] ?? (String(a ?? "").trim() || "Location");
}
function Ls(a = null) {
  return Pg.has(Ad(a));
}
function Td() {
  if (typeof Roll == "function")
    try {
      const a = new Roll("3d6"), e = a.evaluate({ async: !1 });
      return Number((e == null ? void 0 : e.total) ?? a.total ?? 10) || 10;
    } catch {
    }
  return Array.from({ length: 3 }, () => 1 + Math.floor(Math.random() * 6)).reduce((a, e) => a + e, 0);
}
function wd({
  actor: a = null,
  rollTotal: e = Td(),
  armorBefore: t = 0,
  structureBefore: i = 0
} = {}) {
  const n = Ad(a), s = Ng(e), r = Math.max(0, Number(t ?? 0) || 0) <= 0, o = n === A.actorTypes.battlemech ? Og(a, s) : _g(a, s), l = s <= 4, c = r && s >= 16, u = l || c, d = !u && s >= 16, m = s === 18 && n === A.actorTypes.battlemech ? ke(a, ["torsoFront", "core"]) : o.locationKey, f = o.family || Dg(o.locationKey);
  return {
    rollTotal: s,
    actorType: n,
    locationKey: o.locationKey,
    locationLabel: ss(o.locationKey),
    locationFamily: f,
    isForcedCritical: l,
    isStructureCritical: c,
    isAutomaticCritical: u,
    chaosCriticalOption: d,
    chaosTargetLocationKey: m,
    chaosTargetLocationLabel: ss(m),
    descriptiveOnly: !u,
    pureStructureHit: r,
    armorBefore: Math.max(0, Number(t ?? 0) || 0),
    structureBefore: Math.max(0, Number(i ?? 0) || 0)
  };
}
const $r = Object.freeze({
  none: Object.freeze({
    key: "none",
    label: "No Field Remedy",
    actionId: "machineCritNoFieldRemedy",
    actionLabel: "No Field Remedy",
    resource: "sa",
    cost: 0,
    category: "none",
    remediable: !1
  }),
  emergencyRepair: Object.freeze({
    key: "emergencyRepair",
    label: "Emergency Repair",
    actionId: "machineCritEmergencyRepair",
    actionLabel: "Emergency Repair",
    resource: "sa",
    cost: 2,
    category: "complex",
    remediable: !0
  }),
  systemReset: Object.freeze({
    key: "systemReset",
    label: "System Reset",
    actionId: "machineCritSystemReset",
    actionLabel: "System Reset",
    resource: "sa",
    cost: 1,
    category: "simple",
    remediable: !0
  }),
  coolantDump: Object.freeze({
    key: "coolantDump",
    label: "Coolant Dump",
    actionId: "machineCritCoolantDump",
    actionLabel: "Coolant Dump",
    resource: "sa",
    cost: 1,
    category: "simple",
    remediable: !0
  }),
  feedReset: Object.freeze({
    key: "feedReset",
    label: "Reload / Feed Reset",
    actionId: "machineCritFeedReset",
    actionLabel: "Reload / Feed Reset",
    resource: "sa",
    cost: 1,
    category: "simple",
    remediable: !0
  }),
  pilotRecovery: Object.freeze({
    key: "pilotRecovery",
    label: "Pilot Recovery",
    actionId: "machineCritPilotRecovery",
    actionLabel: "Pilot Recovery",
    resource: "sa",
    cost: 2,
    category: "complex",
    remediable: !0
  })
});
function qo(a = "") {
  const e = String(a ?? "").trim();
  return $r[e] ?? $r.emergencyRepair;
}
function Lg(a = "") {
  return Object.prototype.hasOwnProperty.call($r, String(a ?? "").trim());
}
const kd = "machineCritical", vd = "machineCriticalTableGeneralUuid", xg = "machineCriticalTableBattlemechUuid", $g = "machineCriticalTableVehicleUuid", Md = "machineCriticalTableBattlemechHeadUuid", Cd = "machineCriticalTableBattlemechTorsoUuid", Ed = "machineCriticalTableBattlemechArmsUuid", Pd = "machineCriticalTableBattlemechLegsUuid", Rd = "machineCriticalTableVehicleBodyUuid", Nd = "machineCriticalTableVehicleTurretUuid", Id = "machineCriticalTableVehicleMobilityUuid", nt = Object.freeze({
  general: "Compendium.mwd.critical-hit-tables.RollTable.MWDGeneralCrit01",
  battlemech: "Compendium.mwd.critical-hit-tables.RollTable.MWDMechTorsoCrit01",
  vehicle: "Compendium.mwd.critical-hit-tables.RollTable.MWDVehicleBodyCrit1",
  mechHead: "Compendium.mwd.critical-hit-tables.RollTable.MWDMechHeadCrit01",
  mechTorso: "Compendium.mwd.critical-hit-tables.RollTable.MWDMechTorsoCrit01",
  mechArms: "Compendium.mwd.critical-hit-tables.RollTable.MWDMechArmsCrit01",
  mechLegs: "Compendium.mwd.critical-hit-tables.RollTable.MWDMechLegsCrit01",
  vehicleBody: "Compendium.mwd.critical-hit-tables.RollTable.MWDVehicleBodyCrit1",
  vehicleTurret: "Compendium.mwd.critical-hit-tables.RollTable.MWDVehicleTurretCrit",
  vehicleMobility: "Compendium.mwd.critical-hit-tables.RollTable.MWDVehicleMobility"
}), Bg = /* @__PURE__ */ new Set(["physical", "fatigue", ""]), Br = Object.freeze({
  2: Object.freeze({ key: "catastrophicCascade", remedyKey: "none", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "cascade" }),
  3: Object.freeze({ key: "hardLock", remedyKey: "emergencyRepair", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "lockout" }),
  4: Object.freeze({ key: "powerSurge", remedyKey: "coolantDump", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "surge" }),
  5: Object.freeze({ key: "feedFlowDisruption", remedyKey: "feedReset", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "feed" }),
  6: Object.freeze({ key: "controlFault", remedyKey: "systemReset", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "control" }),
  7: Object.freeze({ key: "systemDesync", remedyKey: "systemReset", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "desync" }),
  8: Object.freeze({ key: "structuralShock", remedyKey: "emergencyRepair", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "shock" }),
  9: Object.freeze({ key: "overload", remedyKey: "coolantDump", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "overload" }),
  10: Object.freeze({ key: "degradationSpike", remedyKey: "emergencyRepair", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "degradation" }),
  11: Object.freeze({ key: "partialOutage", remedyKey: "emergencyRepair", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "outage" }),
  12: Object.freeze({ key: "criticalBreach", remedyKey: "none", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "conditionAdvance" })
}), jl = Object.freeze({
  battlemech: Object.freeze({
    head: Object.freeze({
      2: x("cockpitShock", "Cockpit Shock", "none", ["sensor"], ["sensorBlind"], {}, { track: "physical", amount: 3 }, "cascade"),
      3: x("targetingProcessorLock", "Targeting Processor Lock", "systemReset", ["attack"], [], {}, { track: "physical", amount: 2 }, "lockout"),
      4: x("neuralFeedback", "Neural Feedback", "systemReset", [], [], {}, { track: "fatigue", amount: 2 }, "surge"),
      5: x("opticsCoolantFog", "Optics Coolant Fog / View Obstruction", "systemReset", ["attack"], ["rangeLimitClose"], {}, {}, "feed"),
      6: x("commandInputDelay", "Command Input Delay", "systemReset", [], [], { nextActivationSaPenalty: 1 }, { track: "fatigue", amount: 2 }, "control"),
      7: x("fireControlDesyncHead", "Fire-Control Desync", "systemReset", ["attack"], ["noCqBonus"], {}, {}, "desync"),
      8: x("cockpitImpact", "Cockpit Impact", "pilotRecovery", ["piloting"], ["stabilityCheck"], {}, { track: "physical", amount: 2 }, "shock"),
      9: x("sensorOverload", "Sensor Overload", "systemReset", ["sensor"], ["sensorLockPenalty"], {}, { track: "fatigue", amount: 2 }, "overload"),
      10: x("opticsFracture", "Optics Fracture", "emergencyRepair", ["attack"], ["visibilitySevere"], {}, {}, "degradation"),
      11: x("commsSensorSuiteOut", "Communications / Sensor Suite Out", "systemReset", ["sensor"], [], {}, {}, "outage"),
      12: x("headCriticalBreach", "Head condition +1", "none", [], [], {}, { track: "physical", amount: 2 }, "conditionAdvance")
    }),
    torso: Object.freeze({
      2: x("reactorGyroCascade", "Reactor / Gyro Cascade", "none", ["piloting"], ["stabilityCheck"], {}, { track: "fatigue", amount: 3 }, "cascade"),
      3: x("gyroLock", "Gyro Lock", "emergencyRepair", ["move", "jump"], ["pilotingPenalty"], {}, {}, "lockout"),
      4: x("reactorUnstable", "Reactor Unstable", "coolantDump", ["energyWeapon"], [], { heatPerEnergyAttack: 1 }, { track: "fatigue", amount: 2 }, "heat"),
      5: x("coolantPowerRoutingFault", "Coolant / Power Routing Fault", "emergencyRepair", ["weaponGroup"], [], {}, {}, "feed"),
      6: x("coreResponseDelay", "Core Response Delay", "systemReset", [], [], { nextActivationSaPenalty: 1 }, { track: "fatigue", amount: 2 }, "control"),
      7: x("targetingMovementSyncFault", "Targeting / Movement Sync Fault", "systemReset", ["attack", "move"], ["noMovementFireAdvantage"], {}, {}, "desync"),
      8: x("internalShock", "Internal Shock", "emergencyRepair", ["piloting"], ["stabilityCheck"], {}, { track: "physical", amount: 2, condition: "failedFallImpact" }, "shock"),
      9: x("heatSinkSaturation", "Heat Sink Saturation", "coolantDump", ["attack"], [], { heatPerAttack: 1 }, {}, "heat"),
      10: x("gyroDrift", "Gyro Drift", "emergencyRepair", ["move"], ["highMobilityBlocked"], {}, {}, "degradation"),
      11: x("powerBusOutage", "Power Bus Outage", "emergencyRepair", ["subsystem"], [], {}, {}, "outage"),
      12: x("torsoCriticalBreach", "Torso condition +1", "none", [], [], {}, {}, "conditionAdvance")
    }),
    arms: Object.freeze({
      2: x("weaponMountCascade", "Weapon Mount Cascade", "emergencyRepair", ["attack"], [], {}, {}, "cascade"),
      3: x("actuatorLockArm", "Actuator Lock", "emergencyRepair", ["attack"], [], {}, {}, "lockout"),
      4: x("weaponFeedback", "Weapon Feedback", "emergencyRepair", ["attack"], [], { nextArmAttackHeat: 1 }, {}, "surge"),
      5: x("ammoFeedFaultArm", "Ammo / Feed Fault", "feedReset", ["attack"], [], {}, {}, "feed"),
      6: x("fineActuationError", "Fine Actuation Error", "emergencyRepair", ["attack"], ["aimBlocked"], {}, {}, "control"),
      7: x("targetingMisalignmentArm", "Targeting Misalignment", "systemReset", ["attack"], ["noCqBonus"], {}, {}, "desync"),
      8: x("recoilShock", "Recoil Shock", "emergencyRepair", ["attack"], ["nextArmAttackBlocked"], {}, {}, "shock"),
      9: x("servoStrainArm", "Servo Strain", "emergencyRepair", ["attack"], [], { heatOrStrainOnUse: 1 }, {}, "overload"),
      10: x("stabilizerDamageArm", "Stabilizer Damage", "emergencyRepair", ["attack"], ["armAttackSeverelyLimited"], {}, {}, "degradation"),
      11: x("localPowerLossArm", "Local Power Loss", "emergencyRepair", ["subsystem"], [], {}, {}, "outage"),
      12: x("armsCriticalBreach", "Arms condition +1", "none", [], [], {}, {}, "conditionAdvance")
    }),
    legs: Object.freeze({
      2: x("mobilityCascadeLegs", "Mobility Cascade", "emergencyRepair", ["move"], ["stabilityCheck"], {}, { track: "physical", amount: 2, condition: "resultingFallImpact" }, "cascade"),
      3: x("legActuatorLock", "Leg Actuator Lock", "emergencyRepair", ["move", "jump"], [], {}, {}, "lockout"),
      4: x("myomerSurge", "Myomer Surge", "coolantDump", ["move"], [], { heatOrStrainOnMove: 1 }, {}, "surge"),
      5: x("jumpJetMobilityFeedFault", "Jump Jet / Mobility Feed Fault", "emergencyRepair", ["move", "jump"], [], {}, {}, "feed"),
      6: x("gaitFault", "Gait Fault", "emergencyRepair", ["move"], ["repositionPenalty"], {}, {}, "control"),
      7: x("balanceTimingFault", "Balance Timing Fault", "systemReset", ["move"], ["noMobilityCqBonus"], {}, {}, "desync"),
      8: x("forcedStabilityTest", "Forced Stability Test", "emergencyRepair", ["move", "piloting"], ["stabilityCheck"], {}, { track: "physical", amount: 2, condition: "resultingFallImpact" }, "shock"),
      9: x("mobilityOverstress", "Mobility Overstress", "emergencyRepair", ["move"], [], { repeatedMoveCost: 1 }, {}, "overload"),
      10: x("legStabilizerDamage", "Leg Stabilizer Damage", "emergencyRepair", ["move"], ["advancedManeuverBlocked"], {}, {}, "degradation"),
      11: x("partialMobilityOutageLegs", "Partial Mobility Outage", "emergencyRepair", ["move"], [], {}, {}, "outage"),
      12: x("legsCriticalBreach", "Legs condition +1", "none", [], [], {}, {}, "conditionAdvance")
    })
  }),
  vehicle: Object.freeze({
    body: Object.freeze({
      2: x("internalSystemsCascade", "Internal Systems Cascade", "none", [], [], {}, { track: "physical", amount: 2, condition: "openToppedOrCatastrophic" }, "cascade"),
      3: x("coreSystemsLock", "Core Systems Lock", "systemReset", ["subsystem"], [], {}, {}, "lockout"),
      4: x("enginePowerSurge", "Engine / Power Surge", "coolantDump", [], [], {}, { track: "fatigue", amount: 2, condition: "crewApplicable" }, "surge"),
      5: x("fuelFeedDisruption", "Fuel / Feed Disruption", "emergencyRepair", ["subsystem"], [], {}, {}, "feed"),
      6: x("controlFaultBody", "Control Fault", "systemReset", ["move"], [], {}, {}, "control"),
      7: x("systemsDesyncBody", "Systems Desync", "systemReset", ["attack", "move"], [], {}, {}, "desync"),
      8: x("structuralShockBody", "Structural Shock", "emergencyRepair", ["piloting"], ["controlTest"], {}, { track: "physical", amount: 2, condition: "crashImpact" }, "shock"),
      9: x("overloadBody", "Overload", "coolantDump", [], [], {}, {}, "overload"),
      10: x("hullStressSpike", "Hull Stress Spike", "emergencyRepair", [], [], {}, {}, "degradation"),
      11: x("partialOutageBody", "Partial Outage", "emergencyRepair", ["subsystem"], [], {}, {}, "outage"),
      12: x("bodyCriticalBreach", "Body condition +1", "none", [], [], {}, {}, "conditionAdvance")
    }),
    turret: Object.freeze({
      2: x("turretWeaponCascade", "Turret Weapon Cascade", "emergencyRepair", ["attack"], [], {}, {}, "cascade"),
      3: x("traverseLock", "Traverse Lock", "emergencyRepair", ["attack"], [], {}, {}, "lockout"),
      4: x("fireControlSurgeTurret", "Fire-Control Surge", "systemReset", ["attack"], [], { heatOrStrainOnTurretAttack: 1 }, {}, "surge"),
      5: x("ammoFeedFaultTurret", "Ammo / Feed Fault", "feedReset", ["attack"], [], {}, {}, "feed"),
      6: x("controlFaultTurret", "Control Fault", "systemReset", ["attack"], [], { extraAttackCost: 1 }, {}, "control"),
      7: x("trackingDesyncTurret", "Tracking Desync", "systemReset", ["attack"], ["noCqBonus"], {}, {}, "desync"),
      8: x("mountShockTurret", "Mount Shock", "emergencyRepair", ["attack"], ["nextTurretAttackBlocked"], {}, {}, "shock"),
      9: x("overloadTurret", "Overload", "emergencyRepair", ["attack"], [], { turretAttackStress: 1 }, {}, "overload"),
      10: x("stabilizerDamageTurret", "Stabilizer Damage", "emergencyRepair", ["attack"], ["limitedArcFire"], {}, {}, "degradation"),
      11: x("turretSubsystemOutage", "Turret Subsystem Outage", "emergencyRepair", ["subsystem"], [], {}, {}, "outage"),
      12: x("turretCriticalBreach", "Turret condition +1", "none", [], [], {}, {}, "conditionAdvance")
    }),
    mobility: Object.freeze({
      2: x("mobilityCascadeVehicle", "Mobility Cascade", "emergencyRepair", ["move"], ["skidStallCrashRisk"], {}, {}, "cascade"),
      3: x("driveLock", "Drive / Track / Wheel Lock", "emergencyRepair", ["move"], [], {}, {}, "lockout"),
      4: x("powertrainSurge", "Powertrain Surge", "coolantDump", ["move"], [], { heatOrStrainOnMove: 1 }, {}, "surge"),
      5: x("transmissionRotorFeedFault", "Transmission / Rotor Feed Fault", "emergencyRepair", ["move"], [], {}, {}, "feed"),
      6: x("steeringFault", "Steering Fault", "emergencyRepair", ["move"], [], {}, {}, "control"),
      7: x("handlingDesync", "Handling Desync", "systemReset", ["move"], ["noMobilityCqBonus"], {}, {}, "desync"),
      8: x("chassisShock", "Chassis Shock", "emergencyRepair", ["move", "piloting"], ["controlTest"], {}, {}, "shock"),
      9: x("overloadMobility", "Overload", "emergencyRepair", ["move"], [], { repeatedMoveCost: 1 }, {}, "overload"),
      10: x("suspensionLiftDamage", "Suspension / Lift Damage", "emergencyRepair", ["move"], ["majorHandlingImpairment"], {}, {}, "degradation"),
      11: x("partialMobilityOutageVehicle", "Partial Mobility Outage", "emergencyRepair", ["move"], [], {}, {}, "outage"),
      12: x("mobilityCriticalBreach", "Mobility condition +1", "none", [], [], {}, {}, "conditionAdvance")
    })
  })
});
function Dd() {
  return typeof foundry < "u" && (foundry == null ? void 0 : foundry.utils);
}
function xs(a) {
  return Dd() && typeof foundry.utils.deepClone == "function" ? foundry.utils.deepClone(a) : JSON.parse(JSON.stringify(a ?? null));
}
function x(a, e, t, i = [], n = [], s = {}, r = {}, o = "") {
  return Object.freeze({
    label: e,
    signal: Object.freeze({
      key: a,
      remedyKey: t,
      gates: i,
      mods: n,
      resourceEffects: s,
      pilotDamage: r,
      escalationKey: o
    })
  });
}
function zg() {
  return Dd() && typeof foundry.utils.randomID == "function" ? foundry.utils.randomID() : Math.random().toString(36).slice(2, 18).padEnd(16, "0").slice(0, 16);
}
function Fg() {
  try {
    return (/* @__PURE__ */ new Date()).toISOString();
  } catch {
    return "";
  }
}
function Wl(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
function Kl(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? a : {};
}
function Ug(a = {}) {
  var e, t, i, n, s, r, o, l;
  return ((t = (e = a == null ? void 0 : a.flags) == null ? void 0 : e.mwd) == null ? void 0 : t.crit) ?? ((s = (n = (i = a == null ? void 0 : a.document) == null ? void 0 : i.flags) == null ? void 0 : n.mwd) == null ? void 0 : s.crit) ?? ((l = (o = (r = a == null ? void 0 : a.data) == null ? void 0 : r.flags) == null ? void 0 : o.mwd) == null ? void 0 : l.crit) ?? a;
}
function Hg(a, e, t) {
  if (!t) return null;
  const i = new Error(a);
  throw i.validationErrors = e.length ? e : [a], i;
}
function Gl(a = 7) {
  const e = Math.min(12, Math.max(2, Math.trunc(Number(a ?? 7)) || 7));
  return xs(Br[e] ?? Br[7]);
}
function ia(a = {}, { strict: e = !1 } = {}) {
  const t = Ug(a), i = [], n = String((t == null ? void 0 : t.key) ?? "").trim(), s = String((t == null ? void 0 : t.remedyKey) ?? "emergencyRepair").trim() || "emergencyRepair", r = Wl(t == null ? void 0 : t.gates).map((p) => String(p ?? "").trim()).filter(Boolean), o = Wl(t == null ? void 0 : t.mods).map((p) => String(p ?? "").trim()).filter(Boolean), l = Kl(t == null ? void 0 : t.resourceEffects), c = Kl(t == null ? void 0 : t.pilotDamage), u = String((t == null ? void 0 : t.escalationKey) ?? "").trim();
  n || i.push("Critical signal key cannot be blank."), Lg(s) || i.push(`Unknown machine critical remedy "${s}".`);
  for (const [p, h] of Object.entries(l))
    Number.isFinite(Number(h)) || i.push(`Resource effect "${p}" must be numeric.`);
  const d = String((c == null ? void 0 : c.track) ?? "").trim(), m = Number((c == null ? void 0 : c.amount) ?? 0), f = String((c == null ? void 0 : c.condition) ?? "").trim();
  return Bg.has(d) || i.push(`Pilot damage track "${d}" is invalid.`), (!Number.isFinite(m) || m < 0) && i.push("Pilot damage amount must be non-negative."), i.length ? (Hg(i[0], i, e), null) : {
    key: n,
    remedyKey: s,
    gates: r,
    mods: o,
    resourceEffects: Object.fromEntries(
      Object.entries(l).map(([p, h]) => [String(p), Number(h)])
    ),
    pilotDamage: d || m || f ? {
      track: d || "fatigue",
      amount: Math.trunc(m),
      ...f ? { condition: f } : {}
    } : {},
    escalationKey: u
  };
}
function Od(a, e = {}) {
  var i, n;
  return (Array.isArray((n = (i = a == null ? void 0 : a.system) == null ? void 0 : i.mwd) == null ? void 0 : n.crits) ? a.system.mwd.crits : []).filter((s) => s && s.active !== !1).filter((s) => !e.key || s.key === e.key).filter((s) => !e.locationKey || s.locationKey === e.locationKey).filter((s) => !e.locationFamily || s.locationFamily === e.locationFamily).filter((s) => !e.gate || Array.isArray(s.gates) && s.gates.includes(e.gate)).filter((s) => !e.mod || Array.isArray(s.mods) && s.mods.includes(e.mod));
}
function ql(a, e) {
  var s, r;
  const t = ((r = (s = a == null ? void 0 : a.system) == null ? void 0 : s.monitors) == null ? void 0 : r[e]) ?? {}, i = Math.max(0, Number(t.max ?? 0) || 0), n = Math.min(i, Math.max(0, Number(t.value ?? 0) || 0));
  return {
    max: i,
    value: n,
    remaining: Math.max(0, i - n)
  };
}
function jg(a) {
  return (a == null ? void 0 : a.type) === A.actorTypes.vehicle || (a == null ? void 0 : a.type) === A.actorTypes.battlemech;
}
function Wg(a, e, t, i) {
  return {
    ...e != null && e.hitLocation && typeof e.hitLocation == "object" ? e.hitLocation : wd({
      actor: a,
      rollTotal: e == null ? void 0 : e.hitLocationRollTotal,
      armorBefore: t,
      structureBefore: i
    }),
    armorBefore: t,
    structureBefore: i,
    pureStructureHit: t <= 0
  };
}
function _d(a = {}, e = !1) {
  return e && a.chaosTargetLocationKey ? {
    locationKey: a.chaosTargetLocationKey,
    locationFamily: a.locationFamily === "head" ? "torso" : a.locationFamily,
    locationLabel: a.chaosTargetLocationLabel ?? ss(a.chaosTargetLocationKey)
  } : {
    locationKey: a.locationKey,
    locationFamily: a.locationFamily,
    locationLabel: a.locationLabel ?? ss(a.locationKey)
  };
}
function Kg(a = {}, e = !1) {
  return !!(a.isAutomaticCritical || a.chaosCriticalOption && e);
}
function Gg({
  actor: a = null,
  payload: e = {},
  hitLocation: t = null,
  chaosCriticalSelected: i = !1
} = {}) {
  if (!jg(a)) return { ok: !1, reason: "Machine damage requires a vehicle or BattleMech actor." };
  const n = Math.max(0, Math.ceil(Number((e == null ? void 0 : e.damage) ?? (e == null ? void 0 : e.amount) ?? 0) || 0)), s = ql(a, A.monitors.armor), r = ql(a, A.monitors.structure), o = t ? { ...t, armorBefore: s.remaining, structureBefore: r.remaining, pureStructureHit: s.remaining <= 0 } : Wg(a, e, s.remaining, r.remaining), l = Math.min(n, a.type === A.actorTypes.vehicle && s.max <= 0 ? 0 : s.remaining), c = Math.min(r.remaining, Math.max(0, n - l)), u = Math.min(s.max, s.value + l), d = Math.min(r.max, r.value + c), m = Kg(o, i), f = _d(o, i), p = c > 0 || m;
  return {
    ok: !0,
    mode: "machineAttackDamage",
    actorName: a.name ?? "Machine",
    damageIncoming: n,
    adjustedIncoming: n,
    finalDamage: c,
    requestedDelta: n,
    appliedDelta: c,
    usedArmor: l > 0,
    damageType: String((e == null ? void 0 : e.damageType) ?? "kinetic").trim() || "kinetic",
    effectiveAp: Math.max(0, Number((e == null ? void 0 : e.ap) ?? 0) || 0),
    hitLocation: o,
    critical: {
      automatic: !!o.isAutomaticCritical,
      optional: !!o.chaosCriticalOption,
      selected: m,
      chaosCriticalSelected: !!i,
      locationKey: f.locationKey,
      locationFamily: f.locationFamily,
      locationLabel: f.locationLabel
    },
    machine: {
      armorBefore: s.remaining,
      armorAfter: Math.max(0, s.max - u),
      armorDamageBefore: s.value,
      armorDamageAfter: u,
      armorMax: s.max,
      armorAbsorbed: l,
      structureBefore: r.remaining,
      structureAfter: Math.max(0, r.max - d),
      structureDamageBefore: r.value,
      structureDamageAfter: d,
      structureMax: r.max,
      structureDamage: c,
      pureStructureHit: s.remaining <= 0,
      locationTakesStress: p
    },
    beforeLabel: `Armor ${s.remaining}/${s.max}, Structure ${r.remaining}/${r.max}`,
    afterLabel: `Armor ${Math.max(0, s.max - u)}/${s.max}, Structure ${Math.max(0, r.max - d)}/${r.max}`,
    source: String((e == null ? void 0 : e.source) ?? "").trim(),
    notes: String((e == null ? void 0 : e.notes) ?? "").trim()
  };
}
function Zt(a, e = "") {
  var t, i;
  try {
    return ((i = (t = game == null ? void 0 : game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, T, a)) || e;
  } catch {
    return e;
  }
}
function qg(a = null) {
  return Zt(vd, nt.general);
}
async function Ld(a = null, e = "") {
  const t = String(e || qg(a)).trim();
  if (!t || typeof fromUuid != "function") return null;
  try {
    return await fromUuid(t);
  } catch (i) {
    return console.warn("MWD | Unable to resolve machine critical table", t, i), null;
  }
}
function xd(a = null, e = {}) {
  const t = String((e == null ? void 0 : e.locationFamily) ?? (e == null ? void 0 : e.locationKey) ?? "").trim();
  return (a == null ? void 0 : a.type) === A.actorTypes.battlemech ? t === "head" ? "head" : t === "arms" || t === "arm" || /arm/i.test(String((e == null ? void 0 : e.locationKey) ?? "")) ? "arms" : t === "legs" || t === "leg" || /leg/i.test(String((e == null ? void 0 : e.locationKey) ?? "")) ? "legs" : "torso" : t === "turret" || t === "weapon" || /turret|weapon/i.test(String((e == null ? void 0 : e.locationKey) ?? "")) ? "turret" : t === "mobility" || t === "motive" || /mobility|motive|drive|wheel|track/i.test(String((e == null ? void 0 : e.locationKey) ?? "")) ? "mobility" : "body";
}
function Vg(a = null, e = {}) {
  const t = xd(a, e);
  return (a == null ? void 0 : a.type) === A.actorTypes.battlemech ? t === "head" ? Zt(Md, nt.mechHead) : t === "arms" ? Zt(Ed, nt.mechArms) : t === "legs" ? Zt(Pd, nt.mechLegs) : Zt(Cd, nt.mechTorso) || Zt(xg, nt.battlemech) : t === "turret" ? Zt(Nd, nt.vehicleTurret) : t === "mobility" ? Zt(Id, nt.vehicleMobility) : Zt(Rd, nt.vehicleBody) || Zt($g, nt.vehicle);
}
function Yg(a = null, e = {}, t = 7) {
  var r, o, l, c;
  const i = (a == null ? void 0 : a.type) === A.actorTypes.vehicle ? "vehicle" : "battlemech", n = xd(a, e), s = Math.min(12, Math.max(2, Math.trunc(Number(t ?? 7)) || 7));
  return xs(((o = (r = jl[i]) == null ? void 0 : r[n]) == null ? void 0 : o[s]) ?? ((c = (l = jl[i]) == null ? void 0 : l[n]) == null ? void 0 : c[7]));
}
function vn(a = {}, e = {}) {
  const t = Number((a == null ? void 0 : a.rollTotal) ?? 0);
  if (Number.isFinite(t) && t >= 2 && t <= 12) return Math.trunc(t);
  const i = String((e == null ? void 0 : e.key) ?? "").trim();
  for (const [n, s] of Object.entries(Br))
    if (s.key === i) return Number(n);
  return i === "cascade" || (e == null ? void 0 : e.escalationKey) === "cascade" ? 2 : (e == null ? void 0 : e.escalationKey) === "conditionAdvance" ? 12 : 7;
}
function Zs(a = {}, e = 0) {
  return e === 2 || (a == null ? void 0 : a.key) === "catastrophicCascade" || (a == null ? void 0 : a.key) === "cascade" || (a == null ? void 0 : a.escalationKey) === "cascade";
}
function Qg(a, e) {
  var i;
  return Array.from((a == null ? void 0 : a.results) ?? ((i = a == null ? void 0 : a.results) == null ? void 0 : i.contents) ?? []).find((n) => {
    const s = Array.isArray(n == null ? void 0 : n.range) ? n.range : [], r = Number(s[0] ?? 0), o = Number(s[1] ?? s[0] ?? 0);
    return e >= r && e <= o;
  }) ?? null;
}
async function Vl({ actor: a = null, hitLocation: e = {}, rollTotal: t = 7, tableUuid: i = "" } = {}) {
  const n = Yg(a, e, t), s = String(i || Vg(a, e)).trim();
  if (!n) return { error: "No location critical table is defined for this hit location." };
  if (!s || typeof fromUuid != "function")
    return {
      signal: ia(n.signal, { strict: !0 }),
      label: n.label,
      tableUuid: s,
      resultId: "",
      rollTotal: t
    };
  const r = await Ld(a, s);
  if (!r) return { error: `Machine location critical table could not be resolved: ${s}` };
  const o = Qg(r, t);
  if (!o) return { error: `Machine location critical table has no result for ${t}: ${s}` };
  const l = ia(o, { strict: !0 });
  return {
    signal: l,
    label: String((o == null ? void 0 : o.text) ?? (o == null ? void 0 : o.name) ?? l.key).trim() || l.key,
    tableUuid: r.uuid ?? s,
    resultId: o.id ?? o._id ?? "",
    rollTotal: t
  };
}
async function Yl({ actor: a = null, drawFn: e = null, tableUuid: t = "", recursiveCascade: i = !1 } = {}) {
  var l;
  if (typeof e == "function") {
    const c = await e({ actor: a, recursiveCascade: i }), u = ia((c == null ? void 0 : c.signal) ?? c, { strict: !0 });
    return {
      signal: u,
      label: String((c == null ? void 0 : c.label) ?? u.key).trim() || u.key,
      tableUuid: String((c == null ? void 0 : c.tableUuid) ?? t ?? "").trim(),
      resultId: String((c == null ? void 0 : c.resultId) ?? "").trim(),
      rollTotal: Number((c == null ? void 0 : c.rollTotal) ?? 0) || null
    };
  }
  const n = await Ld(a, t);
  if (!(n != null && n.draw)) return { error: "Machine critical table is not configured." };
  const s = await n.draw({ displayChat: !1 }), r = Array.from((s == null ? void 0 : s.results) ?? [])[0] ?? null;
  if (!r) return { error: "Machine critical table returned no result." };
  const o = ia(r, { strict: !0 });
  return {
    signal: o,
    label: String((r == null ? void 0 : r.text) ?? (r == null ? void 0 : r.name) ?? o.key).trim() || o.key,
    tableUuid: n.uuid ?? t,
    resultId: r.id ?? r._id ?? "",
    rollTotal: Number(((l = s == null ? void 0 : s.roll) == null ? void 0 : l.total) ?? 0) || null
  };
}
function er({ actor: a, drawn: e, hitLocation: t, source: i = {}, cascade: n = !1 } = {}) {
  var l, c, u, d, m, f, p;
  const s = ia((e == null ? void 0 : e.signal) ?? e, { strict: !0 }), r = qo(s.remedyKey), o = _d(t, !1);
  return {
    id: zg(),
    key: s.key,
    label: String((e == null ? void 0 : e.label) ?? s.key).trim() || s.key,
    tableUuid: String((e == null ? void 0 : e.tableUuid) ?? "").trim(),
    resultId: String((e == null ? void 0 : e.resultId) ?? "").trim(),
    generalKey: String(((l = e == null ? void 0 : e.general) == null ? void 0 : l.key) ?? "").trim(),
    generalLabel: String(((c = e == null ? void 0 : e.general) == null ? void 0 : c.label) ?? "").trim(),
    generalRollTotal: Number(((u = e == null ? void 0 : e.general) == null ? void 0 : u.rollTotal) ?? (e == null ? void 0 : e.rollTotal) ?? 0) || null,
    generalTableUuid: String(((d = e == null ? void 0 : e.general) == null ? void 0 : d.tableUuid) ?? "").trim(),
    generalResultId: String(((m = e == null ? void 0 : e.general) == null ? void 0 : m.resultId) ?? "").trim(),
    locationKey: o.locationKey,
    locationFamily: o.locationFamily,
    locationLabel: o.locationLabel,
    gates: s.gates,
    mods: s.mods,
    resourceEffects: s.resourceEffects,
    pilotDamage: s.pilotDamage,
    remedyKey: s.remedyKey,
    remedyLabel: r.label,
    escalationKey: s.escalationKey,
    active: !0,
    cascade: !!n,
    createdRound: Number(((p = (f = globalThis.game) == null ? void 0 : f.combat) == null ? void 0 : p.round) ?? 0) || 0,
    createdAt: Fg(),
    source: xs(i ?? {}),
    actorType: (a == null ? void 0 : a.type) ?? ""
  };
}
async function Jg({
  actor: a = null,
  hitLocation: e = {},
  source: t = {},
  drawFn: i = null,
  tableUuid: n = ""
} = {}) {
  try {
    const s = await Yl({ actor: a, drawFn: i, tableUuid: n, recursiveCascade: !1 });
    if (s != null && s.error) return { ok: !1, reason: s.error, crits: [] };
    const r = ia(s.signal, { strict: !0 }), o = vn(s, r), l = await Vl({ actor: a, hitLocation: e, rollTotal: o });
    if (l != null && l.error) return { ok: !1, reason: l.error, crits: [] };
    const c = {
      ...l,
      general: {
        key: r.key,
        label: String((s == null ? void 0 : s.label) ?? r.key).trim() || r.key,
        rollTotal: o,
        tableUuid: String((s == null ? void 0 : s.tableUuid) ?? "").trim(),
        resultId: String((s == null ? void 0 : s.resultId) ?? "").trim()
      }
    };
    if (!Zs(r, o))
      return { ok: !0, crits: [er({ actor: a, drawn: c, hitLocation: e, source: t })], cascade: !1 };
    const u = await Yl({ actor: a, drawFn: i, tableUuid: n, recursiveCascade: !0 }), d = u != null && u.error ? Gl(12) : ia(u.signal, { strict: !0 }), m = Zs(d, vn(u, d)) ? 12 : vn(u, d), f = m === 12 && Zs(d, vn(u, d)) ? Gl(12) : d, p = await Vl({ actor: a, hitLocation: e, rollTotal: m });
    if (p != null && p.error) return { ok: !1, reason: p.error, crits: [] };
    const h = {
      ...p,
      general: {
        key: f.key,
        label: String((u == null ? void 0 : u.label) ?? f.key).trim() || f.key,
        rollTotal: m,
        tableUuid: String((u == null ? void 0 : u.tableUuid) ?? "").trim(),
        resultId: String((u == null ? void 0 : u.resultId) ?? "").trim()
      }
    };
    return {
      ok: !0,
      cascade: !0,
      crits: [
        er({ actor: a, drawn: c, hitLocation: e, source: t, cascade: !0 }),
        er({ actor: a, drawn: h, hitLocation: e, source: t })
      ]
    };
  } catch (s) {
    return { ok: !1, reason: (s == null ? void 0 : s.message) ?? "Unable to draw machine critical.", crits: [] };
  }
}
function Xg(a, e) {
  var o, l, c, u, d, m, f, p, h;
  if (!((o = e == null ? void 0 : e.machine) != null && o.locationTakesStress)) return {};
  const t = String(((l = e == null ? void 0 : e.critical) == null ? void 0 : l.locationKey) || ((c = e == null ? void 0 : e.hitLocation) == null ? void 0 : c.locationKey) || "").trim();
  if (!t) return {};
  const i = `system.mwd.locations.${t}`, n = ((m = (d = (u = a == null ? void 0 : a.system) == null ? void 0 : u.mwd) == null ? void 0 : d.locations) == null ? void 0 : m[t]) ?? {}, s = Math.max(1, Number(((h = (p = (f = a == null ? void 0 : a.system) == null ? void 0 : f.mwd) == null ? void 0 : p.config) == null ? void 0 : h.maxLocationStress) ?? 3) || 3), r = Math.min(s, Math.max(0, Number(n.stress ?? 0) || 0) + 1);
  return {
    [`${i}.enabled`]: n.enabled ?? !0,
    [`${i}.stress`]: r,
    [`${i}.tags`]: Array.isArray(n.tags) ? n.tags : [],
    [`${i}.destroyed`]: !!n.destroyed || r >= s
  };
}
async function Zg(a, e) {
  if (!(!(a != null && a.toggleStatusEffect) || !e))
    try {
      await Ms({
        actor: a,
        statusId: kd,
        active: !0,
        metadata: {
          scope: "Machine critical effects",
          notes: "Visual marker for active system.mwd.crits entries."
        }
      });
    } catch (t) {
      console.warn("MWD | Unable to sync machine critical status", t);
    }
}
async function ey({
  actor: a = null,
  token: e = null,
  payload: t = {},
  options: i = {}
} = {}) {
  var c, u;
  const n = Gg({
    actor: a,
    payload: t,
    chaosCriticalSelected: !!(t != null && t.chaosCriticalSelected)
  });
  if (!n.ok) return n;
  const s = !!i.dryRun;
  let r = { ok: !0, crits: [] };
  !s && n.critical.selected && (r = await Jg({
    actor: a,
    hitLocation: {
      ...n.hitLocation,
      locationKey: n.critical.locationKey,
      locationFamily: n.critical.locationFamily,
      locationLabel: n.critical.locationLabel
    },
    source: {
      ...(t == null ? void 0 : t.sourceData) ?? {},
      source: (t == null ? void 0 : t.source) ?? "",
      tokenUuid: (e == null ? void 0 : e.uuid) ?? (t == null ? void 0 : t.targetTokenUuid) ?? ""
    },
    drawFn: i.drawCritical,
    tableUuid: (t == null ? void 0 : t.criticalTableUuid) ?? ""
  }));
  const o = Array.isArray((u = (c = a == null ? void 0 : a.system) == null ? void 0 : c.mwd) == null ? void 0 : u.crits) ? xs(a.system.mwd.crits) : [], l = r.ok && r.crits.length ? o.concat(r.crits) : o;
  if (!s) {
    const d = {
      "system.monitors.armor.value": n.machine.armorDamageAfter,
      "system.monitors.structure.value": n.machine.structureDamageAfter,
      ...Xg(a, n)
    };
    r.ok && r.crits.length && (d["system.mwd.crits"] = l), await a.update(d), await Zg(a, l.some((m) => (m == null ? void 0 : m.active) !== !1));
  }
  return {
    ...n,
    dryRun: s,
    appliedDelta: n.machine.structureDamage,
    critical: {
      ...n.critical,
      drawOk: !!r.ok,
      reason: r.ok ? "" : r.reason,
      records: r.ok ? r.crits : [],
      cascade: !!r.cascade
    }
  };
}
function Ql(a) {
  const e = Number(a ?? 0);
  return Number.isFinite(e) ? Math.trunc(e) : 0;
}
function Wa(a) {
  return a === A.monitors.physical ? "Physical" : a === A.monitors.fatigue ? "Fatigue" : String(a ?? "").trim() || "Track";
}
function ty({
  incomingDamage: a = 0,
  armorBefore: e = 0,
  reinforcedBefore: t = 0,
  reinforcedMax: i = 0,
  hasArmorItem: n = !1
} = {}) {
  const s = {
    armorBefore: Math.max(0, Number(e ?? 0) || 0),
    armorAfter: Math.max(0, Number(e ?? 0) || 0),
    reinforcedBefore: Math.max(0, Number(t ?? 0) || 0),
    reinforcedAfter: Math.max(0, Number(t ?? 0) || 0),
    reinforcedMax: Math.max(0, Number(i ?? 0) || 0),
    update: {}
  };
  return !n || Math.max(0, Number(a ?? 0) || 0) <= 0 ? s : s.reinforcedBefore > 0 ? (s.reinforcedAfter = Math.max(0, s.reinforcedBefore - 1), s.reinforcedAfter !== s.reinforcedBefore && (s.update["system.traitState.reinforced.current"] = s.reinforcedAfter), s) : (s.armorAfter = Math.max(0, s.armorBefore - 1), s.armorAfter !== s.armorBefore && (s.update["system.durability.current"] = s.armorAfter), s);
}
function Ja(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function tr(a, e) {
  var i, n, s;
  if (!a) return null;
  const t = Ja(e) ?? Ja(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((s = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : s.call(i, ((n = t == null ? void 0 : t.baseActor) == null ? void 0 : n.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function Mn(a, e) {
  var t, i, n;
  return Math.max(0, Number(((n = (i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.monitors) == null ? void 0 : i[e]) == null ? void 0 : n.value) ?? 0) || 0);
}
function Jl(a) {
  var e, t;
  return Math.max(0, Number(((t = (e = a == null ? void 0 : a.system) == null ? void 0 : e.burn) == null ? void 0 : t.value) ?? 0) || 0);
}
function iy(a) {
  return (a == null ? void 0 : a.type) === A.actorTypes.character || (a == null ? void 0 : a.type) === A.actorTypes.npc;
}
function ay(a) {
  return (a == null ? void 0 : a.type) === A.actorTypes.vehicle || (a == null ? void 0 : a.type) === A.actorTypes.battlemech;
}
function ny(a) {
  return [
    A.actorTypes.character,
    A.actorTypes.npc,
    A.actorTypes.vehicle,
    A.actorTypes.battlemech
  ].includes(a == null ? void 0 : a.type);
}
function sy(a, e) {
  const t = String(a ?? "").trim();
  return t === "status" ? ny(e) : t === "machineAttackDamage" ? ay(e) : iy(e);
}
function ry(a, e) {
  var t;
  return ((t = Oo(e).find((i) => i.id === a)) == null ? void 0 : t.label) ?? a;
}
function oy(a) {
  var i, n, s, r;
  const e = foundry.utils.escapeHTML, t = [];
  if (a.mode === "machineAttackDamage") {
    const o = a.appliedDelta >= 0 ? "Applied" : "Recovered";
    t.push(`<div><b>${o}:</b> ${Number(a.damageIncoming ?? a.requestedDelta ?? 0)} machine damage</div>`), (i = a.hitLocation) != null && i.locationLabel && t.push(`<div><b>Location:</b> ${e(a.hitLocation.locationLabel)} (${Number(a.hitLocation.rollTotal ?? 0)})</div>`), a.machine && (t.push(`<div><b>Armor:</b> ${Number(a.machine.armorBefore ?? 0)} -> ${Number(a.machine.armorAfter ?? 0)}</div>`), t.push(`<div><b>Structure:</b> ${Number(a.machine.structureBefore ?? 0)} -> ${Number(a.machine.structureAfter ?? 0)}</div>`)), (s = (n = a.critical) == null ? void 0 : n.records) != null && s.length ? t.push(`<div><b>Critical:</b> ${e(a.critical.records.map((l) => l.label).join(", "))}</div>`) : (r = a.critical) != null && r.reason && t.push(`<div><b>Critical:</b> ${e(a.critical.reason)}</div>`);
  }
  if (a.mode === "attackDamage" || a.mode === "trackDelta") {
    const o = a.appliedDelta >= 0 ? "Applied" : "Recovered", l = Math.abs(Number(a.appliedDelta ?? 0)), c = l === 1 ? "point" : "points", u = a.usedArmor ? ` via armor-aware ${e(Yt(a.damageType))}` : "";
    t.push(`<div><b>${o}:</b> ${l} ${c} to ${e(Wa(a.track))}${u}</div>`), a.usedArmor && a.mitigation && (t.push(
      `<div><b>Mitigation:</b> base ${Number(a.mitigation.baseMitigation ?? 0)} + type ${Number(a.mitigation.typeMitigationMod ?? 0)} - AP ${Number(a.effectiveAp ?? 0)} = ${Number(a.mitigation.netResistance ?? 0)}</div>`
    ), Number(a.mitigation.reinforcedMax ?? 0) > 0 && t.push(
      `<div><b>Reinforced:</b> ${Number(a.mitigation.reinforcedAfter ?? 0)}/${Number(a.mitigation.reinforcedMax ?? 0)}</div>`
    ));
  }
  if (a.mode === "burnDelta") {
    const o = a.appliedDelta >= 0 ? "Adjusted Burn +" : "Adjusted Burn -";
    t.push(`<div><b>${o}</b>${Math.abs(Number(a.appliedDelta ?? 0))}</div>`);
  }
  return a.mode === "status" && t.push(
    `<div><b>Status:</b> ${a.active ? "Applied" : "Removed"} ${e(a.statusLabel ?? a.statusId ?? "Status")}</div>`
  ), t.push(`<div><b>Target:</b> ${e(a.actorName ?? "Actor")}</div>`), a.beforeLabel && a.afterLabel && t.push(`<div><b>Result:</b> ${e(a.beforeLabel)} -> ${e(a.afterLabel)}</div>`), a.source && t.push(`<div><b>Source:</b> ${e(a.source)}</div>`), a.notes && t.push(`<div><b>Notes:</b> ${e(a.notes)}</div>`), `<div class="mwd-gm-notice"><b>GM Harm:</b>${t.join("")}</div>`;
}
function ly(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
class Pt {
  static supportsActor(e, { mode: t = "" } = {}) {
    return sy(t, e);
  }
  static getActorOptions({ mode: e = "" } = {}) {
    return Array.from(game.actors ?? []).filter((t) => this.supportsActor(t, { mode: e })).sort((t, i) => String(t.name ?? "").localeCompare(String(i.name ?? ""))).map((t) => ({
      id: t.id,
      name: t.name || "Character"
    }));
  }
  static getStatusOptions(e = null) {
    return Oo(e).map((t) => ({
      value: t.id,
      label: t.label,
      active: t.active
    }));
  }
  static getSceneTarget({ mode: e = "" } = {}) {
    var n, s;
    const t = Array.from(((n = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : n.controlled) ?? []);
    if (t.length > 1)
      return { actor: null, token: null, reason: "Select only one controlled token." };
    if (t.length === 1) {
      const r = Ja(t[0]), o = tr((r == null ? void 0 : r.actor) ?? null, r);
      return this._resolveSceneTargetResult(o, r, { mode: e });
    }
    const i = Array.from(((s = game.user) == null ? void 0 : s.targets) ?? []);
    if (i.length > 1)
      return { actor: null, token: null, reason: "Target only one token." };
    if (i.length === 1) {
      const r = Ja(i[0]), o = tr((r == null ? void 0 : r.actor) ?? null, r);
      return this._resolveSceneTargetResult(o, r, { mode: e });
    }
    return { actor: null, token: null, reason: "No controlled or targeted token." };
  }
  static _resolveSceneTargetResult(e, t, { mode: i = "" } = {}) {
    return !t || !e ? { actor: null, token: null, reason: "No controlled or targeted token." } : this.supportsActor(e, { mode: i }) ? {
      actor: e,
      token: t,
      reason: ""
    } : {
      actor: null,
      token: t,
      reason: `${e.name || "Token actor"} is not supported by the GM harm tool.`
    };
  }
  static resolveTarget({ actor: e = null, token: t = null, actorId: i = "", preferSceneTarget: n = !1, mode: s = "" } = {}) {
    var l, c;
    const r = Ja(t);
    if (r) {
      const u = tr((r == null ? void 0 : r.actor) ?? e, r), d = this._resolveSceneTargetResult(u, r, { mode: s });
      if (d.actor) return { ...d, source: "token" };
    }
    if (n) {
      const u = this.getSceneTarget({ mode: s });
      if (u.actor) return { ...u, source: "scene" };
    }
    if (e && this.supportsActor(e, { mode: s }))
      return { actor: e, token: r, reason: "", source: "actor" };
    const o = i ? ((c = (l = game.actors) == null ? void 0 : l.get) == null ? void 0 : c.call(l, i)) ?? null : null;
    return o && this.supportsActor(o, { mode: s }) ? { actor: o, token: null, reason: "", source: "fallback" } : {
      actor: null,
      token: r,
      source: null,
      reason: n && this.getSceneTarget({ mode: s }).reason || "Choose a supported target."
    };
  }
  static async apply({ actor: e = null, token: t = null, payload: i = {}, options: n = {} } = {}) {
    var c;
    const s = String((i == null ? void 0 : i.mode) ?? "").trim(), r = this.resolveTarget({
      actor: e,
      token: t,
      actorId: n.actorId ?? "",
      preferSceneTarget: !!n.preferSceneTarget,
      mode: s
    });
    if (!r.actor)
      return { ok: !1, reason: r.reason || "Choose a supported target." };
    let o;
    switch (String((i == null ? void 0 : i.mode) ?? "").trim()) {
      case "attackDamage":
        o = await this._applyAttackDamage(r.actor, i, n);
        break;
      case "machineAttackDamage":
        o = await this._applyMachineAttackDamage(r.actor, r.token, i, n);
        break;
      case "trackDelta":
        o = await this._applyTrackDelta(r.actor, i, n);
        break;
      case "burnDelta":
        o = await this._applyBurnDelta(r.actor, i);
        break;
      case "status":
        o = await this._applyStatus(r.actor, i);
        break;
      default:
        return { ok: !1, reason: "Unsupported harm mode." };
    }
    const l = {
      ok: !0,
      actor: r.actor,
      token: r.token,
      actorName: r.actor.name || "Character",
      sourceType: r.source,
      dryRun: !!n.dryRun,
      ...o
    };
    if (n.logToChat && !n.dryRun) {
      const u = oy(l), d = ly({
        speaker: ChatMessage.getSpeaker({ actor: r.actor, token: r.token }),
        content: u
      });
      await ChatMessage.create(d);
    }
    return n.dryRun || (c = B.renderOpenCharacterSheets) == null || c.call(B, r.actor.id), l;
  }
  static async _applyTrackDelta(e, t, i = {}) {
    const n = (t == null ? void 0 : t.track) === A.monitors.fatigue ? A.monitors.fatigue : A.monitors.physical, s = Ql((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0);
    if (!!(t != null && t.useArmor) && s > 0)
      return this._applyPersonalArmorAwareDamage(e, {
        mode: "trackDelta",
        track: n,
        damage: s,
        damageType: t == null ? void 0 : t.damageType,
        ap: (t == null ? void 0 : t.ap) ?? 0,
        effects: (t == null ? void 0 : t.effects) ?? {},
        source: t == null ? void 0 : t.source,
        notes: t == null ? void 0 : t.notes
      }, i);
    const o = Mn(e, n);
    i.dryRun || await j.addCounter(e, n, s);
    const l = i.dryRun ? Math.max(0, o + s) : Mn(e, n);
    return {
      mode: "trackDelta",
      track: n,
      requestedDelta: s,
      appliedDelta: l - o,
      usedArmor: !1,
      beforeLabel: `${Wa(n)} ${o}`,
      afterLabel: `${Wa(n)} ${l}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyBurnDelta(e, t) {
    var l, c;
    const i = Ql((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0), n = Jl(e), s = Math.max(0, n + i), r = { "system.burn.value": s };
    s === 0 && ((c = (l = e.system) == null ? void 0 : l.burn) != null && c.overloaded) && (r["system.burn.overloaded"] = !1), await e.update(r);
    const o = Jl(e);
    return {
      mode: "burnDelta",
      requestedDelta: i,
      appliedDelta: o - n,
      beforeLabel: `Burn ${n}`,
      afterLabel: `Burn ${o}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyStatus(e, t) {
    const i = String((t == null ? void 0 : t.statusId) ?? (t == null ? void 0 : t.status) ?? "").trim();
    if (!i)
      return { mode: "status", statusId: "", active: !1, statusLabel: "Status", beforeLabel: "", afterLabel: "" };
    const n = ea(e, i), s = !!(t != null && t.active);
    await Ms({
      actor: e,
      statusId: i,
      active: s,
      metadata: {
        scope: t == null ? void 0 : t.scope,
        notes: t == null ? void 0 : t.notes,
        location: t == null ? void 0 : t.location,
        itemUuid: t == null ? void 0 : t.itemUuid,
        targetUuid: t == null ? void 0 : t.targetUuid,
        severity: t == null ? void 0 : t.severity
      }
    });
    const r = ea(e, i);
    return {
      mode: "status",
      statusId: i,
      statusLabel: ry(i, e),
      active: r,
      beforeLabel: n ? "Active" : "Inactive",
      afterLabel: r ? "Active" : "Inactive",
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyAttackDamage(e, t, i = {}) {
    return this._applyPersonalArmorAwareDamage(e, {
      mode: "attackDamage",
      track: (t == null ? void 0 : t.track) ?? A.monitors.physical,
      damage: (t == null ? void 0 : t.damage) ?? 0,
      netHits: (t == null ? void 0 : t.netHits) ?? 0,
      damageType: t == null ? void 0 : t.damageType,
      ap: (t == null ? void 0 : t.ap) ?? 0,
      effects: (t == null ? void 0 : t.effects) ?? {},
      source: t == null ? void 0 : t.source,
      notes: t == null ? void 0 : t.notes
    }, i);
  }
  static async _applyMachineAttackDamage(e, t, i, n = {}) {
    return ey({ actor: e, token: t, payload: i, options: n });
  }
  static async _applyPersonalArmorAwareDamage(e, t, i = {}) {
    var z, Y, Q, G, q, L, U, V, Z;
    const n = !!i.dryRun, s = (t == null ? void 0 : t.track) === A.monitors.fatigue ? A.monitors.fatigue : A.monitors.physical, r = Math.max(0, Number((t == null ? void 0 : t.damage) ?? 0) || 0), o = Math.max(0, Number((t == null ? void 0 : t.netHits) ?? 0) || 0), l = (t == null ? void 0 : t.effects) ?? {}, c = ((z = e.getPersonalCombatLoadout) == null ? void 0 : z.call(e, { refresh: !0 })) ?? null, u = (c == null ? void 0 : c.activeArmor) ?? null, d = Math.max(0, Number((u == null ? void 0 : u.currentArmorRating) ?? ((Y = u == null ? void 0 : u.durability) == null ? void 0 : Y.current) ?? 0) || 0), m = Vt(t == null ? void 0 : t.damageType, "concussive"), f = Mn(e, s);
    let p = r + o;
    const h = d > 0 ? jf({
      damageIncoming: p,
      armorTags: (u == null ? void 0 : u.tags) ?? [],
      effects: l
    }) : { damageIncoming: p, applied: [] };
    p = h.damageIncoming;
    const g = Hf({
      currentArmorRating: d,
      mitigationByType: (u == null ? void 0 : u.mitigationByType) ?? {},
      damageType: m
    }), y = Math.max(
      0,
      (Number((t == null ? void 0 : t.ap) ?? 0) || 0) + (Number((l == null ? void 0 : l.ap) ?? 0) || 0)
    ), b = g.isDestroyed ? 0 : Math.max(0, g.baseMitigation + g.typeMitigationMod - y);
    let S = Math.max(0, Math.ceil(p - b));
    const w = {
      snapshot: ((Q = B.getSnapshot) == null ? void 0 : Q.call(B, e)) ?? null
    }, M = xt({
      actor: e,
      phase: "onDamageResolved",
      facts: Yu({
        actor: e,
        packet: {
          amount: S,
          track: s,
          damageType: m
        },
        runtime: w
      }),
      packet: {
        amount: S,
        track: s,
        damageType: m
      },
      options: { runtime: w, consumeUsage: !0 }
    });
    n || await yi({ actor: e, mutations: M.mutations, runtime: w }), S = Math.max(0, Number(M.packet.amount ?? S) || 0), !n && S > 0 && await j.addCounter(e, s, S);
    const P = ty({
      incomingDamage: r + o,
      armorBefore: ((G = u == null ? void 0 : u.durability) == null ? void 0 : G.current) ?? 0,
      reinforcedBefore: ((L = (q = u == null ? void 0 : u.traitState) == null ? void 0 : q.reinforced) == null ? void 0 : L.current) ?? 0,
      reinforcedMax: ((V = (U = u == null ? void 0 : u.traitState) == null ? void 0 : U.reinforced) == null ? void 0 : V.max) ?? 0,
      hasArmorItem: !!((Z = u == null ? void 0 : u.item) != null && Z.id)
    });
    !n && Object.keys(P.update).length > 0 && await u.item.update(P.update);
    const E = n ? Math.max(0, f + S) : Mn(e, s);
    return {
      mode: (t == null ? void 0 : t.mode) ?? "attackDamage",
      track: s,
      requestedDelta: r + o,
      appliedDelta: E - f,
      usedArmor: !0,
      damageType: m,
      effectiveAp: y,
      mitigation: {
        ...g,
        netResistance: b,
        armorBefore: P.armorBefore,
        armorAfter: P.armorAfter,
        reinforcedBefore: P.reinforcedBefore,
        reinforcedAfter: P.reinforcedAfter,
        reinforcedMax: P.reinforcedMax
      },
      damageIncoming: p,
      adjustedIncoming: p,
      finalDamage: S,
      tagEffectResult: h,
      beforeLabel: `${Wa(s)} ${f}`,
      afterLabel: `${Wa(s)} ${E}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
}
D(Pt, "MODE_OPTIONS", Object.freeze([
  { value: A.monitors.physical, label: "Physical" },
  { value: A.monitors.fatigue, label: "Fatigue" },
  { value: "burn", label: "Burn" },
  { value: "status", label: "Status" }
]));
const Xl = Jn, zr = "damage-mode", cy = `${T}.${zr}`, Cn = {}, ir = {};
class he {
  static init() {
    Ji.register(Mt.PROVIDE_DAMAGE_MODE), Hooks.on("updateSetting", async (e, t, i, n) => he.onUpdateSetting(e, t, i, n)), Hooks.on(Mt.PROVIDE_DAMAGE_MODE, (e) => {
      e("resistanceArmorMonitor", k.settings.damageMode.values.resistanceArmorMonitor, he.sufferDamageResistanceArmorMonitor), e("armorResistanceMonitor", k.settings.damageMode.values.armorResistanceMonitor, he.sufferDamageArmorResistanceMonitor), e("armorGivesResistance", k.settings.damageMode.values.armorGivesResistance, he.sufferDamageArmorAsResistance_Earthdawn), e("armorGiveResistanceHitsAvoid", k.settings.damageMode.values.armorGiveResistanceHitsAvoid, he.sufferDamageArmorAsResistance_Cyberpunk);
    }), Hooks.once("ready", () => he.onReady());
  }
  static onReady() {
    he._registerDamageModeSetting(), he._selectDamageMode();
  }
  static _registerDamageModeSetting() {
    Hooks.callAll(Mt.PROVIDE_DAMAGE_MODE, (e, t, i) => {
      Cn[e] = t, ir[e] = i;
    }), game.settings.register(T, zr, {
      scope: "world",
      name: k.settings.damageMode.name,
      hint: k.settings.damageMode.hint,
      config: !0,
      default: Object.keys(Cn)[0],
      choices: Cn,
      type: String
    });
  }
  static async onUpdateSetting(e, t, i, n) {
    e.key == cy && he._selectDamageMode();
  }
  static _selectDamageMode() {
    let e = game.settings.get(T, zr);
    ir[e] || (e = Object.keys(Cn)[0]), he.damageModeCode = e, he.damageModeMethod = ir[e];
  }
  static async sufferDamage(e, t, i, n, s, r, o) {
    const { monitor: l, damageType: c } = he._resolveDamageContext(e, t, o);
    if (na.checkActorCanReceiveDamage(c ?? l, l, e), he._shouldUsePersonalDamageV2(e, l, o)) {
      await he.sufferPersonalDamageV2(e, l, c, i, n, s, r, o);
      return;
    }
    await (he.damageModeMethod ?? he.sufferDamageResistanceArmorMonitor)(e, l, c, i, n, s, r), await e.applyArmorDamage(l, c, fe.sumModifiers([o], "other", "damageArmor"));
  }
  static _shouldUsePersonalDamageV2(e, t, i) {
    var n, s;
    return !((n = e == null ? void 0 : e.isCharacterLike) != null && n.call(e)) || ![A.monitors.physical, A.monitors.fatigue].includes(t) ? !1 : !!((s = i == null ? void 0 : i.isPersonalWeapon) != null && s.call(i) || (i == null ? void 0 : i.canonicalType) === A.itemType.personalWeapon || (i == null ? void 0 : i.type) === A.itemType.personalWeapon);
  }
  static async sufferPersonalDamageV2(e, t, i, n, s, r, o, l) {
    var d;
    const c = ((d = l == null ? void 0 : l.getCombatProfile) == null ? void 0 : d.call(l)) ?? l ?? null, u = await Pt.apply({
      actor: e,
      payload: {
        mode: "attackDamage",
        track: t,
        damage: Number(n ?? (c == null ? void 0 : c.damage) ?? 0) || 0,
        netHits: Number(s ?? 0) || 0,
        damageType: i ?? (c == null ? void 0 : c.damageType),
        ap: Number((c == null ? void 0 : c.ap) ?? 0) || 0,
        effects: (c == null ? void 0 : c.effects) ?? {}
      },
      options: {
        logToChat: !1
      }
    });
    u != null && u.ok && he._notifyPersonalArmorMitigation(e, {
      damageType: u.damageType,
      baseIncoming: Number(u.requestedDelta ?? 0),
      adjustedIncoming: Number(u.adjustedIncoming ?? u.damageIncoming ?? 0),
      finalDamage: Number(u.finalDamage ?? 0),
      armorMitigation: u.mitigation ?? {},
      effectiveAp: Number(u.effectiveAp ?? 0),
      tagEffectResult: u.tagEffectResult ?? { applied: [] }
    });
  }
  static _notifyPersonalArmorMitigation(e, t = {}) {
    var u;
    const i = t.armorMitigation ?? {}, n = he._localizeDamageType(t.damageType), s = i.isDestroyed ? "Armor destroyed" : `Base ${Number(i.baseMitigation ?? 0)} + Type ${Number(i.typeMitigationMod ?? 0)} - AP ${Number(t.effectiveAp ?? 0)}`, r = Number(t.adjustedIncoming ?? t.baseIncoming ?? 0), o = Number(t.finalDamage ?? 0), l = (((u = t.tagEffectResult) == null ? void 0 : u.applied) ?? []).map((d) => `${d.tag} +${Math.round((Number(d.bonus ?? 0) || 0) * 100)}%`).join(", "), c = l ? ` [${l}]` : "";
    ui.notifications.info(
      `${e.name} mitigated ${n}: ${s}${c}. Incoming ${r}, final ${o}.`
    );
  }
  static async sufferDamageResistanceArmorMonitor(e, t, i, n, s, r, o) {
    const l = j.resistanceDetail(e, t, i), c = l.value;
    let u = 0;
    if (r) {
      const d = Math.min(c, n), m = Math.min(c - d, s);
      u = n - d, j.useArmor(t) && (u -= await he.damageToArmor(e, i, u)), u += s - m;
    } else
      u = n + s - c, j.useArmor(t) && (u -= await he.damageToArmor(e, i, u));
    u > 0 && await j.addCounter(e, t, u), he._notifyResistanceUsage(e, t, i, l);
  }
  static async sufferDamageArmorResistanceMonitor(e, t, i, n, s, r, o) {
    let l = 0;
    j.useArmor(t) ? r ? (n -= await he.damageToArmor(e, i, n), l = s + n) : (l = s + n, l -= await he.damageToArmor(e, i, l)) : l = n + s;
    const c = j.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await j.addCounter(e, t, l), he._notifyResistanceUsage(e, t, i, c), l;
  }
  static async sufferDamageArmorAsResistance_Cyberpunk(e, t, i, n, s, r, o) {
    let l = n + s;
    if (j.useArmor(t) && l > 0) {
      const u = r ? s : 0, d = Math.max(0, he._computeArmorResistance(e) - u);
      d > 0 && (await j.addCounter(e, "armor", 1), l -= d);
    }
    const c = j.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await j.addCounter(e, t, l), he._notifyResistanceUsage(e, t, i, c), Math.max(l, 0);
  }
  static async sufferDamageArmorAsResistance_Earthdawn(e, t, i, n, s, r, o) {
    let l = n + s;
    if (j.useArmor(t) && !r && l > 0) {
      const u = he._computeArmorResistance(e);
      u > 0 && (await j.addCounter(e, "armor", 1), l -= u);
    }
    l -= he._computeStrengthResistance(e, t);
    const c = j.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await j.addCounter(e, t, l), he._notifyResistanceUsage(e, t, i, c), l;
  }
  static async damageToArmor(e, t, i) {
    if (i > 0) {
      const n = j.max(e, A.monitors.armor), s = j.getCounterValue(e, A.monitors.armor), r = Math.min(n - s, i), o = j.resistance(e, A.monitors.armor, t), l = Math.max(0, r - o);
      return l > 0 && await j.addCounter(e, A.monitors.armor, l), r;
    } else
      return 0;
  }
  static _resolveDamageContext(e, t, i) {
    var o;
    const n = (typeof t == "object" ? (t == null ? void 0 : t.damageType) ?? (t == null ? void 0 : t.type) : t) ?? ((o = i == null ? void 0 : i.system) == null ? void 0 : o.damageType), s = typeof t == "object" ? (t == null ? void 0 : t.monitor) ?? n : n;
    return { monitor: e.getDamageMonitor(s), damageType: n };
  }
  static _notifyResistanceUsage(e, t, i, n) {
    var u;
    if (!n || t === void 0)
      return;
    const s = k.actor.monitors[t] ?? t, r = he._localizeDamageType(i) ?? s, o = n.usedType ? "type" : "default", l = ((u = k.actor.monitors.resistanceSources) == null ? void 0 : u[o]) ?? o, c = Pe(k.actor.monitors.resistanceApplied, {
      actor: e.name,
      monitor: s,
      damageType: r,
      value: n.value,
      source: l
    });
    ui.notifications.info(c);
  }
  static _localizeDamageType(e) {
    if (e)
      return ou(e) ? Yt(e) : k.mwd.weaponDamageType[e] ?? k.mwd.personalDamageType[e] ?? k.actor.monitors[e] ?? e;
  }
  static _computeArmorResistance(e) {
    const t = j.max(e, "armor"), i = j.getCounterValue(e, "armor"), n = Math.max(0, t - i);
    return Math.max(0, Math.ceil(n / 3));
  }
  static _computeStrengthResistance(e, t) {
    const i = e.getAttributeValue(A.actorAttributes.strength);
    return Math.max(0, Math.floor(i / 4));
  }
}
class Ct extends Actor {
  static init() {
    Hooks.on("updateActor", (e, t, i, n) => {
      var s;
      return (s = Kt.firstResponsible(e)) == null ? void 0 : s.onUpdateActor(t, i);
    });
  }
  constructor(e, t = {}) {
    var i;
    if (!((i = t.anarchy) != null && i.ready)) {
      const n = game.system.anarchy.actorClasses[e.type];
      if (foundry.utils.mergeObject(t, { anarchy: { ready: !0 } }), n)
        return e.img || (e.img = n.defaultIcon), new n(e, t);
    }
    t.anarchy = void 0, super(e, t);
  }
  static get initiative() {
    return "2d6 + @modifiers.initiative";
  }
  static get defaultIcon() {
  }
  static padWordListToMin(e, t) {
    for (let i = e.length; i < t; i++)
      e.push({
        word: "",
        id: i + 1,
        audio: "",
        no_delete: !1
      });
    for (let i = 0; i < t; i++)
      e[i].no_delete = !0;
    return e;
  }
  static sortSkills(e, t) {
    return t ? t.sort((i, n) => {
      const s = i.system.code === "knowledge" || i.system.attribute === "knowledge", r = n.system.code === "knowledge" || n.system.attribute === "knowledge";
      if (s && !r) return 1;
      if (!r && s) return -1;
      if (s && r)
        return i.name > n.name ? 1 : i.name > n.name ? -1 : 0;
      const o = e.getAttributeValue(i.system.attribute) + i.system.value, l = e.getAttributeValue(n.system.attribute) + n.system.value;
      return o > l ? -1 : o < l ? 1 : 0;
    }) : [];
  }
  static sortQualities(e) {
    if (!e)
      return [];
    const t = ["positive", "negative", "narrative"], i = ["major", "minor"];
    return e.sort((n, s) => {
      var m, f, p, h, g, y;
      const r = String(((m = n.system) == null ? void 0 : m.category) ?? (((f = n.system) == null ? void 0 : f.positive) === !1 ? "negative" : "positive")).trim() || "positive", o = String(((p = s.system) == null ? void 0 : p.category) ?? (((h = s.system) == null ? void 0 : h.positive) === !1 ? "negative" : "positive")).trim() || "positive", l = t.indexOf(r) - t.indexOf(o);
      if (l !== 0) return l;
      const c = String(((g = n.system) == null ? void 0 : g.tier) ?? "minor").trim() || "minor", u = String(((y = s.system) == null ? void 0 : y.tier) ?? "minor").trim() || "minor", d = i.indexOf(c) - i.indexOf(u);
      return d !== 0 ? d : String(n.name ?? "").localeCompare(String(s.name ?? ""));
    });
  }
  static sortAssetModules(e) {
    return e ? e.sort((t, i) => t.system.level > i.system.level ? -1 : t.system.level < i.system.level || t.name > i.name ? 1 : t.name < i.name ? -1 : 0) : [];
  }
  static sortAttributeButton(e) {
    return e ? e.sort((t, i) => t.labelkey > i.labelkey ? 1 : t.labelkey < i.labelkey ? -1 : 0) : [];
  }
  getAllowedUsers(e = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER) {
    return game.users.filter((t) => this.testUserPermission(t, e));
  }
  getAllowedUserIds(e = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER) {
    return this.getAllowedUsers(e).map((t) => t.id);
  }
  getRightToDefend() {
    return CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;
  }
  hasOwnAnarchy() {
    return !1;
  }
  hasGMAnarchy() {
    return !this.hasPlayerOwner;
  }
  isVehicle() {
    return [A.actorTypes.vehicle, A.actorTypes.battlemech].includes(this.type);
  }
  prepareData() {
    super.prepareData(), this._prepareEdgePools(), this.cleanupFavorites();
  }
  prepareDerivedData() {
    if (this.system.modifiers = {
      initiative: fe.sumModifiers(this.items, "other", "initiative")
    }, this.system.monitors) {
      const e = ve.getDamageTypes();
      Object.entries(this.system.monitors).forEach((t) => {
        t[1].resistance = Ct.normalizeResistance(t[1].resistance), t[1].maxBonus = fe.sumMonitorModifiers(this.items, t[0], "max"), t[1].resistanceBonus = fe.sumMonitorModifiers(this.items, t[0], "resistance"), t[1].resistanceBonusByType = Object.fromEntries(
          e.map((i) => [i.value, fe.sumMonitorModifiers(this.items, t[0], "resistanceByType", i.value)]).filter(([, i]) => i)
        );
      });
    }
    this.system.attributes && Object.entries(this.system.attributes).forEach((e) => e[1].total = this.getAttributeValue(e[0])), this.system.state = this.computeState();
  }
  static normalizeResistance(e) {
    const t = typeof e == "number" ? { default: e, byType: {} } : foundry.utils.mergeObject({ default: 0, byType: {} }, e ?? {}, { inplace: !1, recursive: !0 });
    return t.default = Number(t.default ?? 0), t.byType = t.byType ?? {}, t;
  }
  getAttributes() {
    return Ea[this.type] ?? [];
  }
  getPhysicalAgility() {
  }
  getCorrespondingAttribute(e) {
    if (this.getAttributes().includes(e))
      return e;
  }
  async onUpdateActor(e, t) {
    var i, n;
    ((i = e.system) == null ? void 0 : i.monitors) != null && ((n = e.system) == null ? void 0 : n.state) == null && this.update({ "system.state": this.computeState() });
  }
  computeState() {
    return {
      physical: this.computePhysicalState(),
      fatigue: this.computeFatigueState()
    };
  }
  computePhysicalState() {
    return { value: 0, max: 0 };
  }
  computeFatigueState() {
    var t;
    const e = (t = this.system.monitors) == null ? void 0 : t.fatigue;
    return e ? { value: e.max - e.value, max: e.max } : { value: 0, max: 0 };
  }
  _prepareEdgePools() {
    var i;
    if (!((i = this.system) != null && i.counters))
      return;
    const e = this.getAttributeValue(A.actorAttributes.edge), t = foundry.utils.getProperty(this.system, "counters.edgePools") ?? {};
    Object.values(A.counters.edgePools).forEach((n) => {
      const s = t[n] ?? {}, r = s.value;
      s.value = r ?? e ?? 0, s.value = Math.min(s.value, e ?? s.value ?? 0), s.max = e ?? s.max ?? 0, t[n] = s;
    }), foundry.utils.setProperty(this.system, "counters.edgePools", t);
  }
  async setCheckbarValue(e, t) {
    return await this.update({ [e]: t });
  }
  _getMonitorMax(e) {
    const t = this.getAttributeValue(e);
    return t == 0 ? 0 : jc + oe.divup(t, 2);
  }
  getAttributeActions() {
    return xe.getActorActions(this);
  }
  getUsableAttributes(e = void 0) {
    const t = (e ? [e] : this.items).map((n) => n.getAttributes()).reduce((n, s) => n.concat(s), []), i = oe.distinct(this.getAttributes().concat(t));
    return i.sort(oe.ascendingBySortedArray(ve.sortedAttributeKeys)), i;
  }
  getAttributeValue(e, t = void 0) {
    let i = 0;
    if (e = this.getCorrespondingAttribute(e), e) {
      if (this.getAttributes().includes(e))
        i = this.system.attributes[e].value;
      else if (t)
        i = (t == null ? void 0 : t.getAttributeValue(e)) ?? 0;
      else {
        const n = this.items.filter((s) => s.getAttributes().includes(e));
        if (n.length > 0) {
          const s = n.map((r) => r.getAttributeValue(e) ?? 0);
          i = Math.max(...s);
        }
      }
      i += fe.sumModifiers(this.items, "attribute", e);
    }
    return i;
  }
  resolveDamageType(e) {
    switch (e) {
      case "stun":
        return A.monitors.fatigue;
    }
    return e;
  }
  getDamageMonitor(e) {
    e = this.resolveDamageType(e);
  }
  async applyArmorDamage(e, t, i = 0) {
    switch (e = this.resolveDamageType(e), e) {
      case A.monitors.physical:
      case A.monitors.fatigue:
        await he.damageToArmor(this, t, i);
    }
  }
  async rollAttribute(e) {
    await ai.rollAttribute(this, e);
  }
  async rollAttributeAction(e) {
    const t = xe.getActorAction(this, e);
    await ai.rollAttributeAction(this, t);
  }
  async rollSkill(e, t) {
    await ai.rollSkill(this, e, t);
  }
  async rollWeapon(e) {
    var s, r, o;
    na.checkWeaponDefense(e, this);
    const t = (s = e.validateTargets(this)) == null ? void 0 : s.map((l) => l.id), i = {
      attackerTokenId: (o = (r = game.scenes.current) == null ? void 0 : r.tokens.find((l) => {
        var c;
        return ((c = l.actor) == null ? void 0 : c.id) == this.id;
      })) == null ? void 0 : o.id,
      targetedTokenIds: t
    }, n = this.items.find((l) => e.isWeaponSkill(l));
    await ai.rollWeapon(this, n, e, i);
  }
  async rollDefense(e) {
    const t = e.attack.defense, i = xe.getActorDefense(this, t);
    await ai.rollDefense(this, i, e);
  }
  async switchMonitorCheck(e, t, i, n = void 0) {
    await j.switchMonitorCheck(this, e, t, i, n);
  }
  async addCounter(e, t, i = void 0) {
    await j.addCounter(this, e, t, i);
  }
  async setCounter(e, t, i = void 0) {
    await j.setCounter(this, e, t, i);
  }
  canSetMarks() {
    return !1;
  }
  getCyberdeck() {
  }
  canApplyDamage(e) {
    switch (e) {
      case A.monitors.physical:
      case A.monitors.fatigue:
        return this.getDamageMonitor(e) != null;
    }
    return !1;
  }
  canReceiveDamage(e) {
    return this.canApplyDamage(e);
  }
  async onEnterCombat() {
    const e = fe.sumModifiers(this.items, "other", "sceneAnarchy");
    e > 0 && await j.setCounter(this, A.monitors.sceneAnarchy, e);
  }
  async onLeaveCombat() {
    await j.setCounter(this, A.monitors.sceneAnarchy, 0);
  }
  getCelebrityValue() {
    return 0;
  }
  getCredibilityValue() {
    return 0;
  }
  getRumorValue() {
    return 0;
  }
  getAnarchy() {
    var n, s;
    const e = this.hasGMAnarchy(), t = (s = (n = game.system) == null ? void 0 : n.anarchy) == null ? void 0 : s.gmAnarchy, i = e && t && typeof t.getAnarchy == "function" ? t.getAnarchy() : {
      isGM: !1,
      value: 0,
      max: 0
    };
    return i.scene = this.getAnarchyScene(), i;
  }
  getAnarchyScene() {
    return 0;
  }
  getAnarchyValue() {
    return this.getAnarchy().value ?? 0;
  }
  async spendCredibility(e) {
    await this.spendEdgePool(A.counters.social.credibility, e);
  }
  async spendRumor(e) {
    await this.spendEdgePool(A.counters.mental.rumor, e);
  }
  async spendAnarchy(e) {
    var t, i;
    if (e && !this.hasPlayerOwner) {
      const n = (i = (t = game.system) == null ? void 0 : t.anarchy) == null ? void 0 : i.gmAnarchy;
      n != null && n.npcConsumesAnarchy && await n.npcConsumesAnarchy(this, e);
      return;
    }
  }
  getEdgePools() {
    var e;
    return ((e = this.system.counters) == null ? void 0 : e.edgePools) ?? {};
  }
  getEdgePoolValue(e) {
    var s, r;
    const t = this.getAttributeValue(A.actorAttributes.edge), n = ((r = (s = this.getEdgePools()) == null ? void 0 : s[e]) == null ? void 0 : r.value) ?? t ?? 0;
    return Math.min(n, t ?? n ?? 0);
  }
  getRemainingEdge(e = void 0) {
    return e ? this.getEdgePoolValue(e) : Math.max(0, ...Object.values(A.counters.edgePools).map((t) => this.getEdgePoolValue(t)));
  }
  canUseEdge() {
    return this.getAttributes().includes(A.actorAttributes.edge);
  }
  async spendEdgePool(e, t) {
    t != 0 && await j.addCounter(this, e, -t);
  }
  async spendEdge(e, t = A.counters.edgePools.grit) {
    if (e != 0) {
      if (!this.canUseEdge()) {
        const i = k.actorType[this.type] ?? this.type, n = `${this.name} (${i}) cannot use Edge`;
        throw ui.notifications.warn(n), n;
      }
      await this.spendEdgePool(t, e);
    }
  }
  getSkillRating(e) {
    var i;
    const t = typeof e == "string" ? this.items.get(e) : e;
    return ((i = t == null ? void 0 : t.system) == null ? void 0 : i.value) ?? 0;
  }
  getSkillValue(e, t = void 0) {
    const i = typeof e == "string" ? this.items.get(e) : e;
    if (!i)
      return 0;
    const n = this.getAttributeValue(i.system.attribute);
    return this.getSkillRating(i) + n + (t ? 2 : 0);
  }
  getWounds() {
    return 0;
  }
  /**
   * @param ownerActor the Actor who becomes the owner of this Actor
   */
  async attachToOwnerActor(e = void 0, t = "attach") {
    if ((e == null ? void 0 : e.id) == this.id)
      return;
    e != null && e.hasPlayerOwner;
    let i = this;
    if (t == "copy") {
      const n = this.clone();
      i = (await Actor.createDocuments([n]))[0];
    }
    await i.update({ "system.ownerId": (e == null ? void 0 : e.id) ?? "" }), e == null || e.render(), this.render();
  }
  getOwnerActor() {
    if (this.system.ownerId)
      return game.actors.get(this.system.ownerId);
  }
  getOwnedActors() {
    return game.actors.filter((e) => e.system.ownerId == this.id);
  }
  hasFavorite(e, t) {
    const i = Ct._prepareFavorite(e, t);
    return !!this.system.favorites.find((n) => Ct._isSameFavorite(i, n));
  }
  static _prepareFavorite(e, t) {
    return { type: e, id: t };
  }
  static _isSameFavorite(e, t) {
    return e.id == t.id && e.type == t.type;
  }
  async switchFavorite(e, t, i) {
    const n = Ct._prepareFavorite(t, i), s = this.system.favorites.filter((r) => !Ct._isSameFavorite(n, r));
    e && s.push(n), this.update({ "system.favorites": s });
  }
  async cleanupFavorites() {
    const e = this.computeShortcuts().filter((t) => !t.callback);
    e.length < this.system.favorites && this.update({ "system.favorites": e });
  }
  getShortcuts() {
    return this.computeShortcuts().filter((e) => e.label && e.callback);
  }
  computeShortcuts() {
    return this.system.favorites ? this.system.favorites.map((e) => this.getShortcut(e.type, e.id)) : [];
  }
  getShortcut(e, t) {
    var n;
    const i = Ct._prepareFavorite(e, t);
    if (e == "attributeAction") {
      const s = xe.prepareShortcut(this, t);
      if (s)
        return foundry.utils.mergeObject(s, i);
    } else if (Object.values(A.itemType).includes(e)) {
      const s = (n = this.items.get(t)) == null ? void 0 : n.prepareShortcut();
      if (s)
        return foundry.utils.mergeObject(s, i);
    }
    return i;
  }
  async _onSetManualStepper(e, t) {
    var r, o;
    e == null || e.preventDefault();
    const i = (r = t == null ? void 0 : t.dataset) == null ? void 0 : r.id, n = Number((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.value);
    if (!i || Number.isNaN(n)) return;
    const s = this._mwd.state.manual.find((l) => l.id === i);
    if (s)
      return s.value = n, this.render(!1);
  }
}
const { ApplicationV2: uy, HandlebarsApplicationMixin: dy } = foundry.applications.api, { renderTemplate: Zl } = foundry.applications.handlebars, my = `${X}/chat/celebrity-roll.hbs`, Aa = class Aa extends dy(uy) {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      id: "roll-celebrity",
      classes: ["anarchy-dialog"],
      position: { width: 400, height: "auto" },
      window: {
        resizable: !0
      }
    }, { inplace: !1 });
  }
  static async create(e) {
    const t = {
      actor: e,
      celebrity: {
        label: k.actor.counters.edgePools.legend,
        value: e.getCelebrityValue()
      },
      modifiers: foundry.utils.mergeObject(
        { label: k.item.tabs.modifiers },
        fe.computeModifiers(e.items, "other", "celebrity")
      ),
      other: {
        label: k.common.roll.modifiers.other,
        value: 0
      },
      ANARCHY: k
    }, i = await Zl(`${X}/dialog/roll-celebrite-title.hbs`, t), n = {
      id: `roll-celebrity-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Aa.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new Aa({ roll: t }, n).render({ force: !0 });
  }
  constructor(e = {}, t = {}) {
    super(e, t), this.roll = e.roll;
  }
  async _prepareContext() {
    return this.roll;
  }
  async activateListeners(e) {
    const t = e instanceof HTMLElement ? e : e[0];
    await super.activateListeners(t);
    const i = $(t);
    i.find(".input-celebrity-other").on("input", (n) => {
      this.roll.other.value = Number.parseInt(n.currentTarget.value) ?? 0;
    }), i.find('[data-action="roll"]').on("click", async () => {
      await Aa.doRoll(this.roll), await this.close();
    }), i.find('[data-action="cancel"]').on("click", async () => {
      await this.close();
    });
  }
  static async doRoll(e) {
    const t = [
      e.celebrity,
      e.modifiers,
      e.other
    ], i = oe.sumValues(t, (o) => o.value), n = {
      actor: e.actor,
      parameters: t,
      pool: i,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      },
      ANARCHY: k
    }, s = new Roll(`${i}d6cs>=5`);
    await s.evaluate();
    const r = await Zl(my, n);
    await s.toMessage({ flavor: r });
  }
  // async roll() {
  //   const parameters = [
  //     this.roll.celebrity,
  //     this.roll.modifiers,
  //     this.roll.other
  //   ];
  //   const pool = Misc.sumValues(parameters, it => it.value);
  //   const hbsCelebrityRoll = {
  //     actor: this.roll.actor,
  //     parameters: parameters,
  //     pool: pool,
  //     options: {
  //       classes: [game.system.anarchy.styles.selectCssClass()]
  //     },
  //     ANARCHY: ANARCHY
  //   }
  //   const roll = new Roll(`${pool}d6cs>=5`);
  //   await roll.evaluate();
  //   const flavor = await renderTemplate(HBS_TEMPLATE_CHAT_CELEBRITY_ROLL, hbsCelebrityRoll);
  //   await roll.toMessage({ flavor: flavor });
  // }
};
D(Aa, "PARTS", {
  body: {
    template: `${X}/dialog/roll-celebrite.hbs`
  }
});
let Fr = Aa;
const { renderTemplate: fy } = foundry.applications.handlebars, py = `${X}/chat/actor-say-word.hbs`;
class ec extends Ct {
  static get initiative() {
    return Ct.initiative + " + max(@attributes.reflexes.value, @attributes.intelligence.value)";
  }
  hasOwnAnarchy() {
    return this.hasPlayerOwner;
  }
  prepareDerivedData() {
    !this.system.monitors.fatigue && this.system.monitors.stun && (this.system.monitors.fatigue = foundry.utils.duplicate(this.system.monitors.stun)), this.system.monitors.physical.max = this._getMonitorMax(A.actorAttributes.strength), this.system.monitors.fatigue.max = this._getMonitorMax(A.actorAttributes.willpower), super.prepareDerivedData(), this.system.ignoreWounds = fe.sumModifiers(this.items, "other", "ignoreWounds");
  }
  computePhysicalState() {
    var l, c;
    const e = Math.max(0, Number(((l = this.system.monitors.armor) == null ? void 0 : l.max) ?? 0)), t = Math.min(
      e,
      Math.max(0, Number(((c = this.system.monitors.armor) == null ? void 0 : c.value) ?? 0))
    ), i = Math.max(0, e - t), n = Math.max(this.system.monitors.physical.max, this.system.monitors.fatigue.max) + e, s = this.system.monitors.physical.value == this.system.monitors.physical.max, r = this.system.monitors.fatigue.max == this.system.monitors.fatigue.value, o = s || r ? n : Math.max(this.system.monitors.physical.value, this.system.monitors.fatigue.value) + i;
    return {
      max: n,
      value: n - o
    };
  }
  getAttributes() {
    return Ea[this.type] ?? Ea[A.actorTypes.character];
  }
  getPhysicalAgility() {
    return A.actorAttributes.reflexes;
  }
  getCorrespondingAttribute(e) {
    return A.itemAttributes.firewall == e ? A.itemAttributes.firewall : super.getCorrespondingAttribute(e);
  }
  getDamageMonitor(e) {
    switch (e = this.resolveDamageType(e), e) {
      case A.monitors.fatigue:
      case A.monitors.physical:
        return e;
    }
    return super.getDamageMonitor(e);
  }
  async createWord(e, t) {
    this._mutateWords(e, (i) => i.concat([{ word: t, audio: "" }]));
  }
  async sayWord(e, t) {
    var n, s;
    const i = (n = this.getWord(e, t)) == null ? void 0 : n.word;
    i && ChatMessage.create({
      speaker: { alias: ((s = this.token) == null ? void 0 : s.name) ?? this.name },
      content: await fy(
        py,
        {
          actor: this,
          wordsToSay: i
        }
      )
    });
  }
  getWord(e, t) {
    return e ? this.system[e].find((i) => i.id == t) : void 0;
  }
  async updateWord(e, t, i) {
    this._applyWordUpdate(e, t, (n) => foundry.utils.mergeObject(n, { word: i }, { overwrite: !0 }));
  }
  async _applyWordUpdate(e, t, i) {
    this._mutateWords(e, (n) => n.map((s) => (s.id == t && i(s), s)));
  }
  async deleteWord(e, t) {
    this._mutateWords(e, (i) => i.filter((n) => n.id != t));
  }
  async _mutateWords(e, t = (i) => i) {
    if (!e)
      return;
    let i = t(this.system[e]);
    oe.reindexIds(i), await this.update({ [`system.${e}`]: i });
  }
  getCelebrityValue() {
    return this.getEdgePoolValue(A.counters.social.legend);
  }
  getCredibilityValue() {
    return this.getEdgePoolValue(A.counters.social.credibility);
  }
  getRumorValue() {
    return this.getEdgePoolValue(A.counters.mental.rumor);
  }
  getAnarchy() {
    return this.hasOwnAnarchy() ? {
      value: this.system.counters.anarchy.value,
      max: this.system.counters.anarchy.max,
      scene: this.getAnarchyScene()
    } : super.getAnarchy();
  }
  getAnarchyScene() {
    return this.getEdgePoolValue(A.counters.edgePools.chaos);
  }
  async spendAnarchy(e) {
    if (e > 0) {
      const t = this.getAnarchyScene(), i = this.getAnarchyValue();
      na.checkSufficient(k.actor.counters.anarchy, e, i + t);
      const n = Math.min(t, e), s = e - n;
      n > 0 && j.addCounter(this, A.monitors.sceneAnarchy, -n), this.hasPlayerOwner ? (await game.system.anarchy.gmAnarchy.actorGivesAnarchyToGM(this, e), j.addCounter(this, A.monitors.anarchy, -s)) : s > 0 && super.spendAnarchy(s);
    }
  }
  canUseEdge() {
    return !0;
  }
  getWounds() {
    const e = oe.divint(this.system.monitors.fatigue.value, 3) + oe.divint(this.system.monitors.physical.value, 3);
    return Math.max(0, e - this.system.ignoreWounds);
  }
  async rollCelebrity() {
    await Fr.create(this);
  }
}
function tc(a) {
  const e = Math.max(0, Number(a) || 0);
  return -Math.floor(e / 3);
}
function Ur(a) {
  const e = Math.max(0, Number(a) || 0);
  return e === 0 ? 0 : Math.ceil(e / 4);
}
function hy(a = {}) {
  const e = a.physical ?? {}, t = a.fatigue ?? {}, i = a.armor ?? {}, n = Number(e.value) || 0, s = Number(t.value) || 0, r = Math.max(Number(i.value) || 0, Number(i.max) || 0);
  return {
    physical: { penalty: tc(n) },
    fatigue: { penalty: tc(s) },
    armor: { resistance: Ur(r) }
  };
}
const ar = {
  penaltyPer3Damage: (a) => {
    const e = Math.max(0, Number(a) || 0);
    return -Math.floor(e / 3);
  },
  resistancePerQuarter: (a) => {
    const e = Math.max(0, Number(a) || 0);
    return e === 0 ? 0 : Math.ceil(e / 4);
  }
  // heatPenaltyCurve: ...
};
function gy(a, e, t, i) {
  const n = a.system ?? {}, s = `monitors.${e}`, r = Number(foundry.utils.getProperty(n, `${s}.max`)) || 0, o = Number(foundry.utils.getProperty(n, `${s}.value`)) || 0;
  switch (t) {
    case "value":
      return i;
    case "armorPersonalBase":
      return i;
    case "mechArmorBase":
      return Math.max(i, r, o);
    case "vehicleArmorBase":
      return Math.max(i, r, o);
    default:
      return i;
  }
}
function yy() {
  return foundry.data.operators.ForcedDeletion;
}
class $d extends Ct {
  prepareDerivedData() {
    this._prepareMwdAttributes(), this._prepareMwdMonitors(), this._prepareMwdItems(), super.prepareDerivedData();
  }
  static get defaultIcon() {
    return `${fs}/default/Default_Vehicle.svg`;
  }
  static get initiative() {
    return Ct.initiative + " + max(@attributes.system.value, @attributes.handling.value)";
  }
  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    };
  }
  getAttributes() {
    return Ea[this.type] ?? Ea[A.actorTypes.vehicle];
  }
  getPhysicalAgility() {
    return A.actorAttributes.handling;
  }
  getDamageMonitor(e) {
    switch (e = this.resolveDamageType(e), e) {
      case A.monitors.physical:
        return A.monitors.structure;
      case A.monitors.fatigue:
        return;
    }
    return super.getDamageMonitor(e);
  }
  getRightToDefend() {
    return CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER;
  }
  async _migrateHandlingToAttribute(e) {
    var n;
    const t = ((n = this.system.attributes.handling) == null ? void 0 : n.value) ?? 0, i = this.system.handling;
    i && t < i && await this.update({
      "system.handling": yy(),
      "system.attributes.handling.value": i
    });
  }
  _prepareMwdAttributes() {
    const e = this.system.mwd = this.system.mwd ?? {}, t = {
      [A.actorAttributes.handling]: { value: 0 },
      [A.actorAttributes.system]: { value: 0 },
      [A.actorAttributes.condition]: { value: 0 },
      [A.actorAttributes.chassis]: { value: 0 }
    }, i = foundry.utils.mergeObject(
      foundry.utils.duplicate(t),
      this.system.attributes ?? {},
      { inplace: !1, recursive: !0 }
    );
    this.system.attributes = i, e.attributes = foundry.utils.mergeObject(
      foundry.utils.duplicate(t),
      e.attributes ?? {},
      { inplace: !1, recursive: !0 }
    ), Object.entries(e.attributes).forEach(([n, s]) => {
      var r;
      ((r = i[n]) == null ? void 0 : r.value) === void 0 && (i[n] = i[n] ?? {}, i[n].value = (s == null ? void 0 : s.value) ?? 0);
    });
  }
  _prepareMwdMonitors() {
    var o, l, c, u, d, m, f, p, h, g, y, b;
    const e = this.system.mwd = this.system.mwd ?? {}, t = this.system.monitors = this.system.monitors ?? {}, i = this.type === A.actorTypes.battlemech ? 15 : 12, n = Math.max(0, Number(((o = t.armor) == null ? void 0 : o.max) ?? i));
    t.armor = foundry.utils.mergeObject(
      { value: 0, max: n, resistance: Ct.normalizeResistance((l = t.armor) == null ? void 0 : l.resistance) },
      t.armor ?? {},
      { inplace: !1, recursive: !0 }
    ), t.armor.resistance = {
      default: Ur(n),
      byType: ((c = t.armor.resistance) == null ? void 0 : c.byType) ?? {}
    };
    const s = Ur(n), r = {
      value: ((u = t.structure) == null ? void 0 : u.value) ?? 0,
      max: ((d = t.structure) == null ? void 0 : d.max) ?? (this.type === A.actorTypes.battlemech ? 18 : 15),
      resistance: Ct.normalizeResistance((m = t.structure) == null ? void 0 : m.resistance)
    };
    if (t.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(r),
      t.structure ?? {},
      { inplace: !1, recursive: !0 }
    ), t.structure.resistance = {
      default: s,
      byType: ((f = t.structure.resistance) == null ? void 0 : f.byType) ?? {}
    }, e.monitors = e.monitors ?? {}, e.monitors.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(r),
      e.monitors.structure ?? {},
      { inplace: !1, recursive: !0 }
    ), this.type === A.actorTypes.battlemech) {
      const S = {
        value: ((p = t.heat) == null ? void 0 : p.value) ?? ((h = e.heat) == null ? void 0 : h.current) ?? 0,
        max: ((g = t.heat) == null ? void 0 : g.max) ?? ((y = e.heat) == null ? void 0 : y.hardMax) ?? 4,
        resistance: Ct.normalizeResistance((b = t.heat) == null ? void 0 : b.resistance)
      };
      t.heat = foundry.utils.mergeObject(
        foundry.utils.duplicate(S),
        t.heat ?? {},
        { inplace: !1, recursive: !0 }
      ), e.monitors.heat = foundry.utils.mergeObject(
        foundry.utils.duplicate(S),
        e.monitors.heat ?? {},
        { inplace: !1, recursive: !0 }
      );
    }
  }
  _prepareMwdItems() {
    const e = this.system.mwd = this.system.mwd ?? {}, t = {
      skills: ["skill"],
      traits: ["trait", A.itemType.quality],
      lifeModules: ["lifeModule"],
      cues: ["cue"],
      dispositions: ["disposition"],
      // Consumables ride the same inventory rail as general gear for the
      // legacy actor-side item catalog until those callers move to explicit
      // canonical buckets.
      gear: ["gear", "consumable"],
      assetModules: ["assetModule"],
      vehicleUpgrades: ["vehicleUpgrade"],
      mechEquipment: ["mechEquipment"],
      personalWeapons: ["personalWeapon", "weapon"],
      vehicleWeapons: ["vehicleWeapon"],
      mechWeapons: ["mechWeapon"],
      weaponGroups: ["weaponGroup"]
    };
    e.items = Object.fromEntries(
      Object.entries(t).map(([i, n]) => [
        i,
        this.items.filter((s) => n.includes(s.type))
      ])
    );
  }
}
const ic = {
  light: 4,
  medium: 5,
  heavy: 6,
  assault: 7
}, by = { mode: "normal", allowedWeaponIds: [], typeRestriction: "" }, Sy = {
  baseProfile: { name: "Unarmed", damage: "", notes: "" },
  maxWeapons: 0,
  allowedLocations: []
};
class Ay {
  constructor(e) {
    this.actor = e, this.mwd = e.system.mwd ?? {};
  }
  compute() {
    const e = this.mwd.weightClass ?? "medium", t = ic[e] ?? ic.medium, i = this._normalizeHardpoints(), n = this._normalizeWeaponGroups(), s = n.find((y) => y.isPrimary), r = n.filter((y) => y.isPrimary), o = this._primarySlot(), l = [], c = [];
    r.length > 1 && l.push(k.mwd.loadout.errors.multiplePrimary);
    const u = s ? t - 1 : t, d = n.length + (s ? 1 : 0);
    n.length > u && l.push(Pe(k.mwd.loadout.errors.mountPointsExceeded, {
      used: d,
      total: t
    }));
    const m = this._getWeapons((y) => (y.system.weaponCategory ?? "ranged") !== "melee"), f = new Map(m.map((y) => [y.id, y])), p = /* @__PURE__ */ new Set(), h = i.map((y) => ({ ...y, occupiedBy: null, occupiedByName: void 0 }));
    for (const y of n)
      for (const b of y.weaponIds ?? []) {
        const S = f.get(b);
        if (!S) {
          c.push(Pe(k.mwd.loadout.warnings.weaponMissing, { weapon: b }));
          continue;
        }
        const w = S.system.hardpointType ?? "energy", M = S.system.hardpointSize ?? "small";
        if (p.has(b)) {
          l.push(Pe(k.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: S.name }));
          continue;
        }
        if (p.add(b), y.isPrimary && this._validatePrimaryWeapon(S, w, M, o, l), (S.system.weaponCategory ?? "ranged") === "melee")
          continue;
        const P = h.find((E) => !E.occupiedBy && E.type === w && E.size === M);
        P ? (P.occupiedBy = y.id, P.occupiedByName = y.name) : l.push(Pe(k.mwd.loadout.errors.hardpointUnavailable, {
          weapon: S.name,
          type: k.mwd.hardpointType[w] ?? w,
          size: k.mwd.hardpointSize[M] ?? M
        }));
      }
    s && (!s.weaponIds || s.weaponIds.length === 0) && l.push(k.mwd.loadout.errors.primaryWithoutWeapon);
    const g = this._computeMeleeState(l);
    return {
      mountPoints: {
        total: t,
        used: d,
        remaining: Math.max(0, t - d)
      },
      weightClass: e,
      hardpoints: h,
      weaponGroups: n,
      primaryGroupId: s == null ? void 0 : s.id,
      errors: l,
      warnings: c,
      meleeProfiles: g.profiles,
      meleeLimit: g.limit
    };
  }
  _normalizeWeaponGroups() {
    return (this.mwd.weaponGroups ?? []).map((e, t) => ({
      id: e.id ?? `group-${t + 1}`,
      name: e.name || Pe(k.common.newName, { type: k.itemType.singular.weapon }),
      weaponIds: this._asArray(e.weaponIds),
      isPrimary: e.isPrimary ?? !1
    }));
  }
  _normalizeHardpoints() {
    return (this.mwd.hardpoints ?? []).map((e, t) => ({
      id: e.id ?? `hardpoint-${t + 1}`,
      type: e.type ?? "energy",
      size: e.size ?? "small",
      location: e.location ?? "arm"
    }));
  }
  _primarySlot() {
    const e = foundry.utils.mergeObject(foundry.utils.duplicate(by), this.mwd.primarySlot ?? {});
    return e.allowedWeaponIds = this._asArray(e.allowedWeaponIds), e;
  }
  _computeMeleeState(e) {
    var o, l, c;
    const t = foundry.utils.mergeObject(foundry.utils.duplicate(Sy), this.mwd.melee ?? {}), i = this._getWeapons((u) => (u.system.weaponCategory ?? "ranged") === "melee"), n = [], s = Number(t.maxWeapons ?? 0);
    i.length > s && e.push(Pe(k.mwd.loadout.errors.meleeLimitExceeded, {
      equipped: i.length,
      limit: s
    }));
    const r = this._asArray(t.allowedLocations);
    return n.push({
      name: ((o = t.baseProfile) == null ? void 0 : o.name) || k.mwd.melee.baseProfile,
      damage: ((l = t.baseProfile) == null ? void 0 : l.damage) ?? "",
      notes: ((c = t.baseProfile) == null ? void 0 : c.notes) ?? ""
    }), i.forEach((u) => {
      var d;
      r.length > 0 && u.system.mountLocation && !r.includes(u.system.mountLocation) && e.push(Pe(k.mwd.loadout.errors.meleeLocationRestricted, {
        weapon: u.name,
        location: k.mwd.meleeLocation[u.system.mountLocation] ?? u.system.mountLocation
      })), n.push({
        name: u.name,
        damage: u.getDamageCode(),
        notes: ((d = u.system.references) == null ? void 0 : d.description) ?? ""
      });
    }), { profiles: n, limit: s };
  }
  _validatePrimaryWeapon(e, t, i, n, s) {
    var r;
    n.mode === "converted" ? (((r = n.allowedWeaponIds) == null ? void 0 : r.length) > 0 && !n.allowedWeaponIds.includes(e.id) && s.push(Pe(k.mwd.loadout.errors.primaryNotAllowedWeapon, { weapon: e.name })), n.typeRestriction && t !== n.typeRestriction && s.push(Pe(k.mwd.loadout.errors.primaryTypeRestriction, {
      weapon: e.name,
      type: k.mwd.hardpointType[n.typeRestriction] ?? n.typeRestriction
    }))) : i !== "large" && s.push(Pe(k.mwd.loadout.errors.primaryNeedsLarge, { weapon: e.name }));
  }
  _getWeapons(e) {
    return this.actor.items.filter((t) => t.type === A.itemType.mechWeapon).filter((t) => {
      var i;
      return (i = t.isActive) == null ? void 0 : i.call(t);
    }).filter(e);
  }
  _asArray(e) {
    return Array.isArray(e) ? e : e == null || e === "" ? [] : [e];
  }
}
class Ty extends $d {
  static get defaultIcon() {
    return `${fs}/vehicles/apc.svg`;
  }
  prepareDerivedData() {
    var e;
    super.prepareDerivedData(), this.system.mwd = this.system.mwd ?? {}, this.system.mwd.chassis = this.system.mwd.chassis ?? "", this.system.mwd.tonnage = this.system.mwd.tonnage ?? 0, this.system.mwd.loadout = new Ay(this).compute(), this.system.mwd.weaponGroupDetails = this._prepareConfiguredWeaponGroups(), this.system.mwd.heat = this._prepareHeatTrack(), this.system.mwd.primaryGroupName = ((e = this.system.mwd.weaponGroupDetails.find((t) => t.isPrimary)) == null ? void 0 : e.name) ?? "", this.system.skills = this._prepareSkillMap(), this.system.weaponGroups = this._prepareWeaponGroups(), this.system.meleeProfiles = this._prepareMeleeProfiles(), this.system.quickActions = {
      primaryWeaponGroup: this.system.weaponGroups.find((t) => t.isPrimary),
      hasSensorSweep: !!(this.system.skills.perception || this.system.skills.technician)
    };
  }
  async rollRangedAttack() {
    const e = this.system.weaponGroups ?? [];
    if (e.length === 0) {
      ui.notifications.warn(k.actor.vehicle.quickActions.errors.noRanged);
      return;
    }
    const t = await this._promptWeaponGroup(e);
    if (!t)
      return;
    const i = t.weaponIds.map((n) => this.items.get(n)).filter((n) => n);
    await this._rollQuickSkill(this.system.skills.gunnery, {
      quickAction: {
        title: k.actor.vehicle.quickActions.rangedAttack,
        weaponGroup: this._serializeWeaponGroup(t, i)
      }
    });
  }
  async rollMeleeAttack() {
    const e = this.system.meleeProfiles ?? [];
    if (e.length === 0) {
      ui.notifications.warn(k.actor.vehicle.quickActions.errors.noMelee);
      return;
    }
    const t = await this._promptMeleeProfile(e);
    t && await this._rollQuickSkill(this.system.skills.melee, {
      quickAction: {
        title: k.actor.vehicle.quickActions.meleeAttack,
        meleeProfile: t
      }
    });
  }
  async rollDodge() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: k.actor.vehicle.quickActions.dodgeCheck }
    });
  }
  async rollPilotingCheck() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: k.actor.vehicle.quickActions.pilotingCheck }
    });
  }
  async rollSensorSweep() {
    const e = [this.system.skills.perception, this.system.skills.technician].filter((i) => i);
    if (e.length === 0) {
      ui.notifications.warn(k.actor.vehicle.quickActions.errors.noSensorSweep);
      return;
    }
    const t = await this._promptSensorSweepSkill(e);
    t && await this._rollQuickSkill(t, {
      quickAction: {
        title: k.actor.vehicle.quickActions.sensorSweep,
        skillName: t.name
      }
    });
  }
  async rollEmergencyRepair() {
    await this._rollQuickSkill(this.system.skills.technician, {
      quickAction: { title: k.actor.vehicle.quickActions.emergencyRepair }
    });
  }
  _prepareSkillMap() {
    return {
      gunnery: this._resolveSkill("gunnery"),
      melee: this._resolveSkill("meleeCombat"),
      piloting: this._resolveSkill("piloting"),
      perception: this._resolveSkill("perception"),
      technician: this._resolveSkill("technician")
    };
  }
  _prepareHeatTrack() {
    var o, l;
    const e = this.system ?? {}, t = ((o = e.monitors) == null ? void 0 : o.heat) ?? { value: 0, max: 0 }, i = ((l = e.mwd) == null ? void 0 : l.heat) ?? {}, n = {
      current: t.value ?? 0,
      max: t.max ?? 0,
      thresholds: {
        runningHot: 2,
        overheated: 3,
        shutdown: 4
      }
    }, s = foundry.utils.mergeObject(n, i, { inplace: !1 });
    s.thresholds = foundry.utils.mergeObject(n.thresholds, i.thresholds ?? {}, { inplace: !1 }), s.current = t.value ?? s.current, s.max = t.max ?? s.max;
    const r = this._resolveHeatStatus(s.current, s.thresholds, s.max);
    return this.system.mwd.heatStatus = {
      code: r,
      label: k.actor.battlemech.heat.status[r] ?? r
    }, s;
  }
  _resolveHeatStatus(e, t, i) {
    return e >= ((t == null ? void 0 : t.shutdown) ?? i) ? "shutdown" : e >= ((t == null ? void 0 : t.overheated) ?? i) ? "overheated" : e >= ((t == null ? void 0 : t.runningHot) ?? 0) ? "runningHot" : "safe";
  }
  _prepareConfiguredWeaponGroups() {
    var i;
    const e = ((i = this.system.mwd) == null ? void 0 : i.weaponGroups) ?? [], t = new Map(this.items.map((n) => [n.id, n]));
    return e.map((n, s) => {
      const r = Array.isArray(n.weaponIds) ? n.weaponIds : n.weaponIds ? [n.weaponIds] : [], o = r.map((c) => t.get(c)).filter((c) => (c == null ? void 0 : c.type) === A.itemType.mechWeapon), l = r.filter((c) => !t.has(c));
      return {
        id: n.id ?? `group-${s + 1}`,
        index: s,
        name: n.name || Pe(k.common.newName, { type: k.itemType.singular.weapon }),
        weaponIds: r,
        isPrimary: n.isPrimary ?? !1,
        weapons: o,
        missingWeaponIds: l
      };
    });
  }
  _resolveSkill(e) {
    var n;
    const t = this.items.find((s) => s.type === A.itemType.skill && s.system.code === e);
    if (t)
      return t;
    const i = zt(e);
    if (i)
      return {
        name: i.label ?? ((n = k.skill) == null ? void 0 : n[e]) ?? e,
        system: {
          code: e,
          attribute: i.attribute,
          value: 0
        }
      };
  }
  _prepareWeaponGroups() {
    var s;
    const e = (((s = this.system.mwd) == null ? void 0 : s.weaponGroupDetails) ?? []).map((r) => ({
      ...r,
      weapons: r.weapons ?? []
    })).filter((r) => r.weapons.length > 0);
    if (e.length > 0)
      return e.map((r) => ({
        id: r.id,
        name: r.name,
        weaponIds: r.weapons.map((o) => o.id),
        isPrimary: r.isPrimary ?? !1
      }));
    const t = this.items.filter((r) => r.type === A.itemType.mechWeapon);
    if (t.length === 0)
      return [];
    const i = t.filter((r) => this.hasFavorite(A.itemType.mechWeapon, r.id)), n = [];
    return i.length > 0 && n.push({
      id: "favorite",
      name: k.actor.vehicle.quickActions.primaryWeapons,
      weaponIds: i.map((r) => r.id),
      isPrimary: !0
    }), n.push({
      id: "all",
      name: k.actor.vehicle.quickActions.allWeapons,
      weaponIds: t.map((r) => r.id),
      isPrimary: n.length === 0
    }), n;
  }
  _prepareMeleeProfiles() {
    const e = [{
      id: "unarmed",
      name: k.actor.vehicle.quickActions.unarmed,
      weaponId: null,
      damage: 1,
      notes: k.actor.vehicle.quickActions.unarmedNotes
    }], t = this.items.filter((i) => i.type === A.itemType.mechWeapon && i.system.skill === "meleeCombat");
    return e.push(...t.map((i) => {
      var n;
      return {
        id: i.id,
        name: i.name,
        weaponId: i.id,
        damage: ((n = i.getDamage()) == null ? void 0 : n.value) ?? i.system.damage,
        notes: i.system.description ?? ""
      };
    })), e;
  }
  async _rollQuickSkill(e, t = {}) {
    var s;
    const i = ((s = e == null ? void 0 : e.system) == null ? void 0 : s.attribute) ?? this.getPhysicalAgility(), n = foundry.utils.mergeObject(ai.prepareActorRoll(this), {
      mode: pt.rollType.skill,
      skill: e,
      attribute1: i,
      specialization: void 0
    });
    t.quickAction && (n.quickAction = t.quickAction), await ai.create(n);
  }
  async _promptWeaponGroup(e) {
    if (e.length === 1)
      return e[0];
    const t = e.find((s) => s.isPrimary) ?? e[0], i = `<form class="mwd-quick-select">${e.map((s) => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${s.id}" ${s.id === t.id ? "checked" : ""}>
        <span>${s.name}${s.isPrimary ? ` (${k.actor.vehicle.quickActions.primaryLabel})` : ""}</span>
      </label>`).join("")}</form>`, n = await Dialog.prompt({
      title: k.actor.vehicle.quickActions.selectWeaponGroup,
      content: i,
      label: k.common.roll.button,
      callback: (s) => s.find('input[name="weapon-group"]:checked').val() ?? t.id
    });
    return e.find((s) => s.id === n) ?? t;
  }
  async _promptMeleeProfile(e) {
    if (e.length === 1)
      return e[0];
    const t = e[0], i = `<form class="mwd-quick-select">${e.map((s) => `
      <label class="quick-select-option">
        <input type="radio" name="melee-profile" value="${s.id}" ${s.id === t.id ? "checked" : ""}>
        <span>${s.name}</span>
      </label>`).join("")}</form>`, n = await Dialog.prompt({
      title: k.actor.vehicle.quickActions.selectMeleeProfile,
      content: i,
      label: k.common.roll.button,
      callback: (s) => s.find('input[name="melee-profile"]:checked').val() ?? t.id
    });
    return e.find((s) => s.id === n) ?? t;
  }
  async _promptSensorSweepSkill(e) {
    if (e.length === 1)
      return e[0];
    const t = `<form class="mwd-quick-select">${e.map((n) => `
      <label class="quick-select-option">
        <input type="radio" name="sensor-skill" value="${n.system.code}">
        <span>${n.name}</span>
      </label>`).join("")}</form>`, i = await Dialog.prompt({
      title: k.actor.vehicle.quickActions.selectSensorSkill,
      content: t,
      label: k.common.roll.button,
      callback: (n) => n.find('input[name="sensor-skill"]:checked').val()
    });
    return e.find((n) => n.system.code === i) ?? e[0];
  }
  _serializeWeaponGroup(e, t) {
    return {
      id: e.id,
      name: e.name,
      isPrimary: e.isPrimary,
      weaponNames: t.map((i) => i.name)
    };
  }
}
const Fn = "activeModifiers", Vo = [
  { value: "", label: "All Attributes" },
  { value: "reflexes", label: "Reflexes" },
  { value: "strength", label: "Strength" },
  { value: "willpower", label: "Willpower" },
  { value: "charisma", label: "Charisma" },
  { value: "intelligence", label: "Intelligence" },
  { value: "edge", label: "Edge" }
], Yo = [
  { value: "", label: "All Intents" },
  { value: "skill", label: "Skill" },
  { value: "attack", label: "Attack" },
  { value: "defense", label: "Defense" },
  { value: "common", label: "Common" },
  { value: "attribute", label: "Attribute" },
  { value: "edge", label: "Edge" },
  { value: "initiative", label: "Initiative" }
];
function ac(a) {
  const e = String(a ?? "").trim();
  return e === "" ? null : e;
}
function wy(a) {
  return String((a == null ? void 0 : a.intent) ?? "").trim() || null;
}
function ky(a) {
  var e, t, i;
  return ((e = a == null ? void 0 : a.data) == null ? void 0 : e.attrKey) ?? // skill rolls
  ((i = (t = a == null ? void 0 : a.attack) == null ? void 0 : t.skill) == null ? void 0 : i.attribute) ?? // attack rolls
  null;
}
function nc(a, e) {
  return a ? e ? a === e : !1 : !0;
}
function Bd(a) {
  return {
    id: String((a == null ? void 0 : a.id) ?? ""),
    label: String((a == null ? void 0 : a.label) ?? "").trim(),
    value: Math.trunc(Number((a == null ? void 0 : a.value) ?? 0)) || 0,
    enabled: (a == null ? void 0 : a.enabled) !== !1,
    attributeFilter: ac(a == null ? void 0 : a.attributeFilter),
    intentFilter: ac(a == null ? void 0 : a.intentFilter),
    source: (a == null ? void 0 : a.source) === "preset" ? "preset" : "adhoc"
  };
}
class vy {
  constructor() {
    D(this, "id", "mwd.sceneModifiers");
  }
  collect({ resolved: e } = {}) {
    var r;
    const t = (r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.getFlag("mwd", Fn);
    if (!Array.isArray(t) || !t.length) return [];
    const i = wy(e), n = ky(e), s = [];
    for (const o of t) {
      const l = Bd(o);
      l.enabled && nc(l.intentFilter, i) && nc(l.attributeFilter, n) && s.push({
        id: l.id || `scene:${l.label}`,
        label: l.label,
        value: l.value,
        source: "Scene"
      });
    }
    return s;
  }
}
const My = `systems/${T}/templates/settings/collection-editor.hbs`, zd = /* @__PURE__ */ new Map(), nr = /* @__PURE__ */ new Map();
function It(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid settings data.");
  return t.validationErrors = e, t;
}
function La(a) {
  Ey(a), zd.set(a.id, a), game.settings.register(T, a.settingKey, {
    scope: "world",
    config: !1,
    type: a.settingType ?? Object,
    default: a.defaultData()
  }), game.settings.registerMenu(T, a.menuKey, {
    name: a.menu.name,
    label: a.menu.label,
    hint: a.menu.hint,
    icon: a.menu.icon,
    type: Py(a.id),
    restricted: a.menu.restricted ?? !0
  });
}
function Cy(a) {
  return zd.get(a) ?? null;
}
function Ey(a) {
  var e, t;
  if (!(a != null && a.id)) throw new Error("Settings collection definition requires an id.");
  if (!(a != null && a.settingKey)) throw new Error(`Settings collection definition "${a.id}" requires a settingKey.`);
  if (!(a != null && a.menuKey)) throw new Error(`Settings collection definition "${a.id}" requires a menuKey.`);
  if (!((e = a == null ? void 0 : a.menu) != null && e.name) || !((t = a == null ? void 0 : a.menu) != null && t.label))
    throw new Error(`Settings collection definition "${a.id}" requires menu metadata.`);
  if (typeof a.defaultData != "function")
    throw new Error(`Settings collection definition "${a.id}" requires defaultData().`);
  if (typeof a.toRows != "function")
    throw new Error(`Settings collection definition "${a.id}" requires toRows(value).`);
  if (typeof a.rowsToValue != "function")
    throw new Error(`Settings collection definition "${a.id}" requires rowsToValue(rows).`);
  if (typeof a.serializeBulk != "function" || typeof a.parseBulk != "function")
    throw new Error(`Settings collection definition "${a.id}" requires bulk serialization helpers.`);
  if (!Array.isArray(a.rowSchema) || !a.rowSchema.length)
    throw new Error(`Settings collection definition "${a.id}" requires a non-empty rowSchema.`);
}
function Py(a) {
  if (nr.has(a))
    return nr.get(a);
  class e extends Fd {
  }
  return D(e, "definitionId", a), nr.set(a, e), e;
}
var te, Ud, Hr, Un, Hn, fa, jr, Ka, Hd, jd, ht;
class Fd extends FormApplication {
  constructor(t = {}, i = {}) {
    super(t, i);
    Ce(this, te);
    const n = C(this, te, Hn).call(this);
    this.editorState = {
      tab: "rows",
      rows: this.definition.toRows(n),
      bulkText: this.definition.serializeBulk(n),
      errors: []
    };
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: `${T}-${this.definitionId}-editor`,
      classes: ["mwd", "mwd-settings-editor"],
      template: My,
      width: 880,
      height: 760,
      resizable: !0,
      submitOnChange: !1,
      closeOnSubmit: !1
    }, { inplace: !1 });
  }
  get definition() {
    const t = Cy(this.constructor.definitionId);
    if (!t)
      throw new Error(`Missing settings collection definition: ${this.constructor.definitionId}`);
    return t;
  }
  get title() {
    var t;
    return this.definition.title ?? ((t = this.definition.menu) == null ? void 0 : t.name) ?? "Settings Editor";
  }
  getData(t = {}) {
    const i = C(this, te, jd).call(this), n = this.editorState.rows.map((s, r, o) => ({
      index: r,
      fields: i.map((l) => C(this, te, Hd).call(this, l, s, r)),
      canMoveUp: r > 0,
      canMoveDown: r < o.length - 1
    }));
    return foundry.utils.mergeObject(super.getData(t), {
      definitionId: this.definition.id,
      title: this.title,
      description: this.definition.description ?? "",
      helpText: this.definition.helpText ?? "",
      bulkHelpText: this.definition.bulkHelpText ?? "",
      currentTab: this.editorState.tab,
      isRowsTab: this.editorState.tab === "rows",
      isBulkTab: this.editorState.tab === "bulk",
      errors: [...this.editorState.errors ?? []],
      columns: i.map((s) => ({ key: s.key, label: s.label })),
      rows: n,
      hasRows: n.length > 0,
      bulkText: this.editorState.bulkText ?? "",
      addRowLabel: this.definition.addRowLabel ?? "Add Row",
      saveLabel: this.definition.saveLabel ?? "Save",
      cancelLabel: this.definition.cancelLabel ?? "Cancel",
      resetLabel: this.definition.resetLabel ?? "Reset to Saved",
      defaultsLabel: this.definition.defaultsLabel ?? "Restore Defaults",
      emptyStateText: this.definition.emptyStateText ?? "No rows yet. Add one to start this collection."
    }, { inplace: !1, overwrite: !0 });
  }
  activateListeners(t) {
    super.activateListeners(t), t.find("[data-action]").each((i, n) => {
      n.addEventListener("click", (s) => {
        var l;
        const r = s.currentTarget, o = String(((l = r == null ? void 0 : r.dataset) == null ? void 0 : l.action) ?? "").trim();
        o && C(this, te, Ud).call(this, o, s, r);
      });
    });
  }
  async _onSubmit(t, { updateData: i = null, preventClose: n = !0, preventRender: s = !0 } = {}) {
    return super._onSubmit(t, { updateData: i, preventClose: n, preventRender: s });
  }
  async _updateObject(t, i) {
    var n;
    C(this, te, ht).call(this, []);
    try {
      const s = this.editorState.tab === "bulk" ? this.definition.parseBulk(C(this, te, Ka).call(this)) : this.definition.rowsToValue(C(this, te, jr).call(this));
      await game.settings.set(T, this.definition.settingKey, s);
      const r = C(this, te, Hn).call(this);
      C(this, te, Un).call(this, r), await this.close();
    } catch (s) {
      C(this, te, ht).call(this, En(s)), this.editorState.errors.length && ((n = ui.notifications) == null || n.error(this.editorState.errors[0])), this.render(!1);
    }
  }
}
te = new WeakSet(), Ud = async function(t, i, n) {
  var s, r, o, l, c, u, d, m;
  switch (i.preventDefault(), i.stopPropagation(), t) {
    case "switchRows":
      C(this, te, Ka).call(this), this.editorState.tab = "rows", C(this, te, ht).call(this, []), this.render(!1);
      return;
    case "switchBulk":
      C(this, te, fa).call(this);
      try {
        const f = this.definition.rowsToValue(this.editorState.rows);
        this.editorState.bulkText = this.definition.serializeBulk(f), this.editorState.tab = "bulk", C(this, te, ht).call(this, []);
      } catch (f) {
        C(this, te, ht).call(this, En(f)), this.editorState.errors.length && ((s = ui.notifications) == null || s.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "addRow":
      C(this, te, fa).call(this), this.editorState.rows.push(((o = (r = this.definition).createEmptyRow) == null ? void 0 : o.call(r)) ?? {}), C(this, te, ht).call(this, []), this.render(!1);
      return;
    case "removeRow":
      C(this, te, fa).call(this), this.editorState.rows.splice(Number(((l = n == null ? void 0 : n.dataset) == null ? void 0 : l.index) ?? -1), 1), C(this, te, ht).call(this, []), this.render(!1);
      return;
    case "moveRowUp":
      C(this, te, fa).call(this), C(this, te, Hr).call(this, Number(((c = n == null ? void 0 : n.dataset) == null ? void 0 : c.index) ?? -1), -1), C(this, te, ht).call(this, []), this.render(!1);
      return;
    case "moveRowDown":
      C(this, te, fa).call(this), C(this, te, Hr).call(this, Number(((u = n == null ? void 0 : n.dataset) == null ? void 0 : u.index) ?? -1), 1), C(this, te, ht).call(this, []), this.render(!1);
      return;
    case "loadBulk":
      try {
        const f = this.definition.parseBulk(C(this, te, Ka).call(this));
        this.editorState.rows = this.definition.toRows(f), this.editorState.bulkText = this.definition.serializeBulk(f), this.editorState.tab = "rows", C(this, te, ht).call(this, []);
      } catch (f) {
        C(this, te, ht).call(this, En(f)), this.editorState.errors.length && ((d = ui.notifications) == null || d.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "formatBulk":
      try {
        const f = this.definition.parseBulk(C(this, te, Ka).call(this));
        this.editorState.bulkText = this.definition.serializeBulk(f), C(this, te, ht).call(this, []);
      } catch (f) {
        C(this, te, ht).call(this, En(f)), this.editorState.errors.length && ((m = ui.notifications) == null || m.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "resetSetting":
      C(this, te, Un).call(this, C(this, te, Hn).call(this)), this.render(!1);
      return;
    case "restoreDefaults":
      C(this, te, Un).call(this, this.definition.defaultData()), this.render(!1);
      return;
    case "cancel":
      await this.close();
      return;
    default:
      return;
  }
}, Hr = function(t, i) {
  if (!Number.isInteger(t)) return;
  const n = t + i;
  if (t < 0 || n < 0 || n >= this.editorState.rows.length) return;
  const s = [...this.editorState.rows], [r] = s.splice(t, 1);
  s.splice(n, 0, r), this.editorState.rows = s;
}, Un = function(t) {
  this.editorState.rows = this.definition.toRows(t), this.editorState.bulkText = this.definition.serializeBulk(t), this.editorState.tab = "rows", C(this, te, ht).call(this, []);
}, Hn = function() {
  const t = game.settings.get(T, this.definition.settingKey);
  return foundry.utils.deepClone(t ?? this.definition.defaultData());
}, fa = function() {
  this.editorState.rows = C(this, te, jr).call(this);
}, jr = function() {
  const t = foundry.utils.expandObject(this._getSubmitData()), i = (t == null ? void 0 : t.rows) ?? {};
  return Object.keys(i).sort((n, s) => Number(n) - Number(s)).map((n) => {
    const s = i[n] ?? {};
    return Object.fromEntries(
      this.definition.rowSchema.map((r) => [
        r.key,
        String((s == null ? void 0 : s[r.key]) ?? "")
      ])
    );
  });
}, Ka = function() {
  var n;
  const t = this.form, i = (n = t == null ? void 0 : t.querySelector) == null ? void 0 : n.call(t, 'textarea[name="bulkText"]');
  return i instanceof HTMLTextAreaElement && (this.editorState.bulkText = i.value), this.editorState.bulkText ?? "";
}, Hd = function(t, i, n) {
  const s = t.type ?? "text", r = String((i == null ? void 0 : i[t.key]) ?? t.default ?? ""), o = s === "select" ? Ry(t).map((l) => ({
    value: String(l.value ?? ""),
    label: String(l.label ?? l.value ?? ""),
    selected: String(l.value ?? "") === r
  })) : [];
  return {
    key: t.key,
    label: t.label,
    type: s,
    inputType: s === "select" ? "text" : s,
    name: `rows.${n}.${t.key}`,
    value: r,
    placeholder: t.placeholder ?? "",
    min: t.min ?? "",
    max: t.max ?? "",
    step: t.step ?? "",
    options: o
  };
}, jd = function() {
  return this.definition.rowSchema.map((t) => ({
    ...t,
    type: t.type ?? "text"
  }));
}, ht = function(t = []) {
  this.editorState.errors = Array.isArray(t) ? t.filter(Boolean) : [];
}, D(Fd, "definitionId", "");
function Ry(a) {
  const e = typeof a.options == "function" ? a.options() : a.options;
  return Array.isArray(e) ? e : [];
}
function En(a) {
  const e = Array.isArray(a == null ? void 0 : a.validationErrors) ? a.validationErrors.filter(Boolean) : [String((a == null ? void 0 : a.message) ?? "Unable to save settings.").trim()].filter(Boolean);
  return e.length ? e : ["Unable to save settings."];
}
const Wr = "sceneModifierTemplates", Ny = "sceneModifierTemplateEditor", Iy = Object.freeze([]);
function xi(a) {
  const e = String(a ?? "").trim();
  return e === "" ? "" : e;
}
function Wd(a = []) {
  const e = [], t = [], i = /* @__PURE__ */ new Set();
  if ((Array.isArray(a) ? a : []).forEach((n, s) => {
    const r = String((n == null ? void 0 : n.label) ?? "").trim(), o = String((n == null ? void 0 : n.value) ?? "").trim(), l = `Row ${s + 1}`;
    if (!r) {
      t.push(`${l}: label cannot be blank.`);
      return;
    }
    if (i.has(r.toLowerCase())) {
      t.push(`${l}: duplicate label "${r}".`);
      return;
    }
    i.add(r.toLowerCase());
    const c = Number(o);
    if (!Number.isFinite(c)) {
      t.push(`${l}: value must be a number.`);
      return;
    }
    e.push({
      label: r,
      value: Math.trunc(c),
      attributeFilter: xi(n == null ? void 0 : n.attributeFilter),
      intentFilter: xi(n == null ? void 0 : n.intentFilter)
    });
  }), t.length) throw It(t);
  return e;
}
function Dy(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => ({
    label: String((e == null ? void 0 : e.label) ?? ""),
    value: String((e == null ? void 0 : e.value) ?? "0"),
    attributeFilter: xi(e == null ? void 0 : e.attributeFilter),
    intentFilter: xi(e == null ? void 0 : e.intentFilter)
  }));
}
function Oy(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw It([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  if (!Array.isArray(t))
    throw It(["Bulk JSON must be an array."]);
  return Wd(t.map((i) => ({
    label: String((i == null ? void 0 : i.label) ?? ""),
    value: String((i == null ? void 0 : i.value) ?? "0"),
    attributeFilter: xi(i == null ? void 0 : i.attributeFilter),
    intentFilter: xi(i == null ? void 0 : i.intentFilter)
  })));
}
function _y(a = []) {
  return JSON.stringify(
    (Array.isArray(a) ? a : []).map((e) => ({
      label: String((e == null ? void 0 : e.label) ?? ""),
      value: Number((e == null ? void 0 : e.value) ?? 0),
      attributeFilter: xi(e == null ? void 0 : e.attributeFilter),
      intentFilter: xi(e == null ? void 0 : e.intentFilter)
    })),
    null,
    2
  );
}
const Ly = {
  id: "scene-modifier-templates",
  menuKey: Ny,
  settingKey: Wr,
  settingType: Array,
  title: "Scene Modifier Templates",
  description: "Define reusable scene modifier presets that can be applied per scene via the GM Gadget.",
  helpText: "Labels must be unique. Value is a signed integer (+/–). Filters are optional — blank means the modifier applies to all matching rolls.",
  bulkHelpText: 'JSON shape: [{ "label": "Darkness", "value": -2, "attributeFilter": "reflexes", "intentFilter": "attack" }]',
  emptyStateText: "No templates yet. Add one to make it available in the GM Gadget Scene tab.",
  addRowLabel: "Add Template",
  rowSchema: [
    {
      key: "label",
      label: "Label",
      type: "text",
      placeholder: "Darkness"
    },
    {
      key: "value",
      label: "Value",
      type: "number",
      step: 1,
      placeholder: "-2"
    },
    {
      key: "attributeFilter",
      label: "Attribute Filter",
      type: "select",
      options: Vo
    },
    {
      key: "intentFilter",
      label: "Intent Filter",
      type: "select",
      options: Yo
    }
  ],
  menu: {
    name: "Scene Modifier Templates",
    label: "Configure",
    hint: "Edit the preset scene modifier templates available in the GM Gadget.",
    icon: "fas fa-cloud",
    restricted: !0
  },
  defaultData: () => foundry.utils.deepClone(Iy),
  createEmptyRow: () => ({
    label: "",
    value: "0",
    attributeFilter: "",
    intentFilter: ""
  }),
  toRows: Dy,
  rowsToValue: Wd,
  parseBulk: Oy,
  serializeBulk: _y
};
function xy() {
  La(Ly);
}
const { ApplicationV2: $y, HandlebarsApplicationMixin: By } = foundry.applications.api, zy = "mwd-gmgadget", Kd = "gmDnPresets", jn = "gmNextDn", Ga = "gmDnAnnounceToChat", Fy = Object.freeze([
  { label: "Standard", dn: 1 },
  { label: "Challenging", dn: 2 },
  { label: "Hard", dn: 3 },
  { label: "Extreme", dn: 4 }
]), Uy = "systems/mwd/templates/v2/mwd-gmgadget.hbs", qa = Object.freeze({
  actorId: "",
  mode: "physical",
  delta: 1,
  useArmor: !1,
  damageType: "concussive",
  statusId: "",
  statusActive: !0,
  source: "",
  notes: ""
}), Hy = Object.freeze({
  label: "Hazard Zone",
  startExposure: ne.minor,
  escalationRate: 1,
  escalationIntervalTurns: 1,
  escalationMax: ne.full,
  onFullBurnDelta: 0,
  clearOnExit: !0,
  damage: 6,
  ap: 0,
  damageType: "thermal",
  color: "#d86a2c"
});
function jy(a = "") {
  return String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean).map((e) => {
    const [t, i] = e.split(":").map((r) => (r ?? "").trim()), n = t || "DN", s = Number.isFinite(Number(i)) ? Number(i) : Number(t);
    return {
      label: n,
      dn: Number.isFinite(s) ? Math.max(0, Math.trunc(s)) : null
    };
  }).filter((e) => Number.isFinite(e.dn));
}
function Wy(a = []) {
  const e = new Error(a[0] ?? "Invalid GM DN presets.");
  return e.validationErrors = Array.isArray(a) ? a.filter(Boolean) : [], e;
}
function Ky() {
  return foundry.utils.deepClone(Fy);
}
function yn(a, { strict: e = !1 } = {}) {
  const t = typeof a == "string" ? jy(a) : Array.isArray(a) ? a : [], i = [], n = [], s = /* @__PURE__ */ new Set();
  if (t.forEach((r, o) => {
    const l = String((r == null ? void 0 : r.label) ?? "").trim(), c = r == null ? void 0 : r.dn, u = `Preset ${o + 1}`;
    if (!l) {
      e && n.push(`${u}: label cannot be blank.`);
      return;
    }
    const d = l.toLowerCase();
    if (s.has(d)) {
      e && n.push(`${u}: duplicate label "${l}".`);
      return;
    }
    const m = Number(c);
    if (!Number.isFinite(m)) {
      e && n.push(`${u}: DN must be numeric.`);
      return;
    }
    if (m < 0) {
      e && n.push(`${u}: DN cannot be negative.`);
      return;
    }
    s.add(d), i.push({
      label: l,
      dn: Math.trunc(m)
    });
  }), e && n.length) throw Wy(n);
  return i;
}
function sr(a = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(qa),
    a ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function rr(a = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(Hy),
    a ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function Gd(a = null) {
  const e = (a == null ? void 0 : a.document) ?? a ?? null, t = Array.from((e == null ? void 0 : e.shapes) ?? []);
  if (t.length !== 1) return t.length > 1 ? "multiple" : "";
  const i = t[0], n = typeof (i == null ? void 0 : i.toObject) == "function" ? i.toObject() : i && typeof i == "object" ? i : null;
  return String((n == null ? void 0 : n.type) ?? "").trim().toLowerCase();
}
function sc(a = null) {
  return !!Gd(a);
}
function rc() {
  var i, n;
  const a = Array.from(((i = canvas == null ? void 0 : canvas.regions) == null ? void 0 : i.controlled) ?? []).map((s) => (s == null ? void 0 : s.document) ?? s ?? null).find(sc);
  if (a) return a;
  const e = ((n = canvas == null ? void 0 : canvas.regions) == null ? void 0 : n.hover) ?? null, t = (e == null ? void 0 : e.document) ?? e ?? null;
  return sc(t) ? t : null;
}
function Gy(a = null) {
  var o, l;
  const e = (a == null ? void 0 : a.document) ?? a ?? null;
  if (!e)
    return {
      label: "No region selected",
      reason: "Select a Region created in Measured Template Mode on the current scene to turn it into a hazard.",
      supported: !1
    };
  const t = Gd(e), i = Zc(e);
  if (!i)
    return {
      label: "Unsupported region",
      reason: t === "multiple" ? "The selected Region has multiple shapes and cannot be converted into a hazard template." : `The selected Region shape "${t || "unknown"}" is not supported for hazard conversion yet.`,
      supported: !1
    };
  const n = String(i.shape ?? "").trim().toLowerCase(), s = (l = (o = canvas == null ? void 0 : canvas.scene) == null ? void 0 : o.grid) != null && l.units ? ` ${canvas.scene.grid.units}` : "";
  return {
    label: n === "rect" ? `RECT ${Number(i.width ?? 0) || 0} x ${Number(i.height ?? 0) || 0}${s}`.trim() : `${n.toUpperCase()} ${Number(i.distance ?? 0) || 0}${s}`.trim(),
    reason: "",
    supported: !0
  };
}
function qy(a) {
  var t, i;
  return !(a != null && a.token) || !(a != null && a.actor) ? {
    label: "No scene target",
    reason: String((a == null ? void 0 : a.reason) ?? "No controlled or targeted token."),
    supported: !1
  } : {
    label: String(((t = a.token) == null ? void 0 : t.name) ?? ((i = a.actor) == null ? void 0 : i.name) ?? "Token").trim(),
    reason: "",
    supported: !0
  };
}
function Vy(a) {
  var t;
  if (!(a != null && a.actor))
    return {
      label: "No target selected",
      source: "",
      reason: String((a == null ? void 0 : a.reason) ?? "Choose a supported character target.")
    };
  const e = a.source === "scene" || a.source === "token" ? "Scene target" : "Actor fallback";
  return {
    label: String(((t = a.actor) == null ? void 0 : t.name) ?? "Character").trim() || "Character",
    source: e,
    reason: ""
  };
}
function Yy(a) {
  return Pt.getStatusOptions(a);
}
function Qy(a = "mwd") {
  game.settings.register(a, jn, {
    scope: "client",
    config: !1,
    type: Number,
    default: 1
  }), game.settings.register(a, Ga, {
    scope: "client",
    config: !0,
    name: "Announce GM DN changes to chat",
    hint: "If enabled, posts a small chat notice when you change the current DN preset.",
    type: Boolean,
    default: !1
  });
}
const Ze = class Ze extends By($y) {
  constructor({ systemId: e = "mwd", ...t } = {}) {
    super(t), this.systemId = e, this.activeTab = "difficulty", this.harmState = sr(), this.hazardState = rr();
  }
  async render(e = {}) {
    var t;
    return (t = game.user) != null && t.isGM ? super.render(e) : this;
  }
  async _prepareContext(e) {
    var y, b, S, w;
    const t = await super._prepareContext(e), i = yn(
      game.settings.get(this.systemId, Kd),
      { strict: !1 }
    ), n = Number(game.settings.get(this.systemId, jn) ?? 1), s = !!game.settings.get(this.systemId, Ga), r = sr(this.harmState), o = Pt.getActorOptions({ mode: r.mode }), l = Pt.getSceneTarget({ mode: r.mode }), c = this.harmState.actorId ? ((b = (y = game.actors) == null ? void 0 : y.get) == null ? void 0 : b.call(y, this.harmState.actorId)) ?? null : null, u = Pt.resolveTarget({
      actor: c,
      actorId: this.harmState.actorId,
      preferSceneTarget: !0,
      mode: r.mode
    }), d = Yy(u.actor ?? c ?? null);
    d.length && !d.some((M) => M.value === r.statusId) && (r.statusId = d[0].value, this.harmState.statusId = r.statusId);
    const m = oc(
      game.settings.get(this.systemId, Wr)
    ), f = lc(
      (S = canvas == null ? void 0 : canvas.scene) == null ? void 0 : S.getFlag("mwd", Fn)
    ), p = rc(), h = Gy(p), g = rr(this.hazardState);
    return foundry.utils.mergeObject(t, {
      presets: i,
      currentDn: n,
      currentTab: this.activeTab,
      announce: s,
      isGM: ((w = game.user) == null ? void 0 : w.isGM) ?? !1,
      scene: {
        hasScene: !!(canvas != null && canvas.scene),
        templates: m,
        activeModifiers: f,
        attributeFilterOptions: Vo,
        intentFilterOptions: Yo
      },
      harm: {
        state: r,
        actorOptions: o,
        modes: Pt.MODE_OPTIONS,
        damageTypes: Xl,
        statusOptions: d,
        sceneTarget: qy(l),
        effectiveTarget: Vy(u),
        canApply: !!u.actor,
        applyReason: u.reason || "",
        useArmorAvailable: r.mode === "physical" || r.mode === "fatigue",
        showDamageType: (r.mode === "physical" || r.mode === "fatigue") && r.useArmor,
        showStatusFields: r.mode === "status",
        showDeltaFields: r.mode !== "status"
      },
      hazard: {
        state: g,
        template: h,
        exposureTiers: [
          { value: ne.minor, label: "Minor" },
          { value: ne.major, label: "Major" },
          { value: ne.full, label: "Full" }
        ],
        damageTypes: Xl,
        canCreate: !!(canvas != null && canvas.scene && h.supported),
        createReason: h.reason || ""
      }
    });
  }
  _getRootElement() {
    var e;
    return this.element instanceof HTMLElement ? this.element : (e = this.element) == null ? void 0 : e[0];
  }
  _captureHarmStateFromDom(e = null) {
    var s;
    const t = ((s = e == null ? void 0 : e.closest) == null ? void 0 : s.call(e, ".mwd-gmgadget__root")) ?? this._getRootElement();
    if (!(t instanceof HTMLElement)) return this.harmState;
    const i = (r, o = "") => {
      const l = t.querySelector(r);
      return l instanceof HTMLInputElement || l instanceof HTMLSelectElement || l instanceof HTMLTextAreaElement ? l.value : o;
    }, n = (r, o = !1) => {
      const l = t.querySelector(r);
      return l instanceof HTMLInputElement ? l.checked : o;
    };
    return this.harmState = sr({
      actorId: i('[name="harm-actorId"]', this.harmState.actorId),
      mode: i('[name="harm-mode"]', this.harmState.mode),
      delta: Number(i('[name="harm-delta"]', this.harmState.delta)),
      useArmor: n('[name="harm-useArmor"]', this.harmState.useArmor),
      damageType: i('[name="harm-damageType"]', this.harmState.damageType),
      statusId: i('[name="harm-statusId"]', this.harmState.statusId),
      statusActive: i('[name="harm-statusActive"]', this.harmState.statusActive ? "add" : "remove") !== "remove",
      source: i('[name="harm-source"]', this.harmState.source),
      notes: i('[name="harm-notes"]', this.harmState.notes)
    }), Number.isFinite(Number(this.harmState.delta)) || (this.harmState.delta = qa.delta), this.harmState;
  }
  async _onSetDn(e, t) {
    var s, r, o;
    if (e.preventDefault(), e.stopPropagation(), !((s = game.user) != null && s.isGM)) return;
    const i = Math.max(0, Math.trunc(Number(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.dn) ?? NaN)));
    if (!Number.isFinite(i)) return;
    if (await game.settings.set(this.systemId, jn, i), !!game.settings.get(this.systemId, Ga)) {
      const l = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.label) ?? `DN ${i}`);
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ user: game.user }),
        content: `<div class="mwd-gm-notice"><b>GM Difficulty:</b> ${foundry.utils.escapeHTML(l)} (DN ${i} hits)</div>`
      });
    }
    return this.render({ parts: ["body"] });
  }
  async _onSwitchTab(e, t) {
    var n, s, r;
    (n = e == null ? void 0 : e.preventDefault) == null || n.call(e), (s = e == null ? void 0 : e.stopPropagation) == null || s.call(e);
    const i = String(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.tab) ?? "").trim();
    if (!(!i || i === this.activeTab))
      return this._captureHarmStateFromDom(t), this._captureHazardStateFromDom(t), this.activeTab = i, this.render({ parts: ["body"] });
  }
  async _onClearDn(e, t) {
    var i;
    if (e.preventDefault(), e.stopPropagation(), !!((i = game.user) != null && i.isGM))
      return await game.settings.set(this.systemId, jn, 1), this.render({ parts: ["body"] });
  }
  async _onToggleAnnounce(e, t) {
    var n;
    if (e.preventDefault(), e.stopPropagation(), !((n = game.user) != null && n.isGM)) return;
    const i = !game.settings.get(this.systemId, Ga);
    return await game.settings.set(this.systemId, Ga, i), this.render({ parts: ["body"] });
  }
  async _onHarmInputChange(e, t) {
    var n, s;
    (n = e == null ? void 0 : e.preventDefault) == null || n.call(e), this._captureHarmStateFromDom(t);
    const i = String(((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.harmKey) ?? "").trim();
    if (["actorId", "mode", "useArmor"].includes(i))
      return this.render({ parts: ["body"] });
  }
  async _onRefreshHarmTarget(e, t) {
    var i, n;
    return (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), this._captureHarmStateFromDom(t), this.render({ parts: ["body"] });
  }
  async _onApplyHarm(e, t) {
    var r, o, l, c, u;
    if ((r = e == null ? void 0 : e.preventDefault) == null || r.call(e), (o = e == null ? void 0 : e.stopPropagation) == null || o.call(e), !((l = game.user) != null && l.isGM)) return;
    const i = this._captureHarmStateFromDom(t), n = this._buildHarmPayload(i);
    if (!n) {
      (c = ui.notifications) == null || c.warn("Choose a valid harm action before applying it.");
      return;
    }
    const s = await Pt.apply({
      payload: n,
      options: {
        actorId: i.actorId,
        preferSceneTarget: !0,
        logToChat: !0
      }
    });
    return s != null && s.ok ? this.render({ parts: ["body"] }) : ((u = ui.notifications) == null || u.warn((s == null ? void 0 : s.reason) ?? "Unable to apply harm."), this.render({ parts: ["body"] }));
  }
  _captureHazardStateFromDom(e = null) {
    var s;
    const t = ((s = e == null ? void 0 : e.closest) == null ? void 0 : s.call(e, ".mwd-gmgadget__root")) ?? this._getRootElement();
    if (!(t instanceof HTMLElement)) return this.hazardState;
    const i = (r, o = "") => {
      const l = t.querySelector(r);
      return l instanceof HTMLInputElement || l instanceof HTMLSelectElement || l instanceof HTMLTextAreaElement ? l.value : o;
    }, n = (r, o = !1) => {
      const l = t.querySelector(r);
      return l instanceof HTMLInputElement ? l.checked : o;
    };
    return this.hazardState = rr({
      label: i('[name="hazard-label"]', this.hazardState.label),
      startExposure: i('[name="hazard-startExposure"]', this.hazardState.startExposure),
      escalationRate: Number(i('[name="hazard-escalationRate"]', this.hazardState.escalationRate)),
      escalationIntervalTurns: Number(i('[name="hazard-escalationIntervalTurns"]', this.hazardState.escalationIntervalTurns)),
      escalationMax: i('[name="hazard-escalationMax"]', this.hazardState.escalationMax),
      onFullBurnDelta: Number(i('[name="hazard-onFullBurnDelta"]', this.hazardState.onFullBurnDelta)),
      clearOnExit: n('[name="hazard-clearOnExit"]', this.hazardState.clearOnExit),
      damage: Number(i('[name="hazard-damage"]', this.hazardState.damage)),
      ap: Number(i('[name="hazard-ap"]', this.hazardState.ap)),
      damageType: i('[name="hazard-damageType"]', this.hazardState.damageType),
      color: i('[name="hazard-color"]', this.hazardState.color)
    }), this.hazardState;
  }
  async _onHazardInputChange(e, t) {
    var i;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), this._captureHazardStateFromDom(t);
  }
  async _onRefreshHazardTemplate(e, t) {
    var i, n;
    return (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), this._captureHazardStateFromDom(t), this.render({ parts: ["body"] });
  }
  async _onCreateHazard(e, t) {
    var c, u, d, m, f, p, h, g;
    if ((c = e == null ? void 0 : e.preventDefault) == null || c.call(e), (u = e == null ? void 0 : e.stopPropagation) == null || u.call(e), !((d = game.user) != null && d.isGM)) return;
    const i = this._captureHazardStateFromDom(t), n = rc(), s = Zc(n);
    if (!(canvas != null && canvas.scene) || !s) {
      (m = ui.notifications) == null || m.warn("Select a supported Region in Measured Template Mode before creating a hazard.");
      return;
    }
    const r = wo({
      startExposure: i.startExposure,
      escalation: {
        rate: Number(i.escalationRate ?? 1) || 1,
        intervalTurns: Number(i.escalationIntervalTurns ?? 1) || 1,
        max: i.escalationMax
      },
      onFull: {
        burnDelta: Number(i.onFullBurnDelta ?? 0) || 0
      },
      clearOnExit: !!i.clearOnExit
    }), o = gs(s);
    if (!o.length) {
      (f = ui.notifications) == null || f.warn("Unable to convert the selected region into a hazard shape.");
      return;
    }
    const [l] = await canvas.scene.createEmbeddedDocuments("Region", [{
      name: String(i.label ?? "Hazard Zone").trim() || "Hazard Zone",
      color: String(i.color ?? "#d86a2c").trim() || "#d86a2c",
      shapes: o,
      flags: {
        mwd: {
          [Vi]: {
            sourceActorUuid: null,
            sourceItemUuid: null,
            payloadId: "gm-hazard",
            templateGeometry: si(s),
            damage: Math.max(0, Number(i.damage ?? 0) || 0),
            ap: Math.max(0, Number(i.ap ?? 0) || 0),
            damageType: String(i.damageType ?? "thermal").trim() || "thermal",
            label: `${String(i.label ?? "Hazard Zone").trim() || "Hazard Zone"} (${Bt(r.startExposure)})`,
            areaEffect: {
              kind: "persistent",
              hazard: r
            },
            hazardDef: r
          }
        }
      }
    }]);
    return (h = (p = l == null ? void 0 : l.sheet) == null ? void 0 : p.render) == null || h.call(p, !0), (g = ui.notifications) == null || g.info("Hazard region created from the selected region."), this.render({ parts: ["body"] });
  }
  _buildHarmPayload(e) {
    const t = String((e == null ? void 0 : e.source) ?? "").trim(), i = String((e == null ? void 0 : e.notes) ?? "").trim(), n = String((e == null ? void 0 : e.mode) ?? "").trim();
    if (n === "status") {
      const s = String((e == null ? void 0 : e.statusId) ?? "").trim();
      return s ? {
        mode: "status",
        statusId: s,
        active: !!(e != null && e.statusActive),
        source: t,
        notes: i
      } : null;
    }
    return n === "burn" ? {
      mode: "burnDelta",
      delta: cc(e == null ? void 0 : e.delta, qa.delta),
      source: t,
      notes: i
    } : n === "physical" || n === "fatigue" ? {
      mode: "trackDelta",
      track: n,
      delta: cc(e == null ? void 0 : e.delta, qa.delta),
      useArmor: !!(e != null && e.useArmor),
      damageType: (e == null ? void 0 : e.damageType) ?? qa.damageType,
      source: t,
      notes: i
    } : null;
  }
  // ---- Scene modifier actions ----
  async _onAddSceneModifierFromPreset(e, t) {
    var l, c, u, d;
    if ((l = e == null ? void 0 : e.preventDefault) == null || l.call(e), (c = e == null ? void 0 : e.stopPropagation) == null || c.call(e), !((u = game.user) != null && u.isGM)) return;
    const i = ((d = t == null ? void 0 : t.closest) == null ? void 0 : d.call(t, ".mwd-gmgadget__root")) ?? this._getRootElement(), n = i instanceof HTMLElement ? i.querySelector('select[name="scene-preset-index"]') : null, s = n instanceof HTMLSelectElement ? Number(n.value) : NaN, r = oc(
      game.settings.get(this.systemId, Wr)
    ), o = Number.isFinite(s) ? r[s] : null;
    o && await this._mutateSceneModifiers((m) => [
      ...m,
      {
        id: foundry.utils.randomID(),
        label: o.label,
        value: o.value,
        enabled: !0,
        attributeFilter: o.attributeFilter || null,
        intentFilter: o.intentFilter || null,
        source: "preset"
      }
    ]);
  }
  async _onAddSceneModifierAdhoc(e, t) {
    var n, s, r, o;
    if ((n = e == null ? void 0 : e.preventDefault) == null || n.call(e), (s = e == null ? void 0 : e.stopPropagation) == null || s.call(e), !((r = game.user) != null && r.isGM)) return;
    const i = this._captureAdhocFormFromDom(t);
    if (!i) {
      (o = ui.notifications) == null || o.warn("Label and a numeric value are required.");
      return;
    }
    await this._mutateSceneModifiers((l) => [...l, i]);
  }
  async _onToggleSceneModifier(e, t) {
    var n, s, r, o;
    if ((n = e == null ? void 0 : e.preventDefault) == null || n.call(e), (s = e == null ? void 0 : e.stopPropagation) == null || s.call(e), !((r = game.user) != null && r.isGM)) return;
    const i = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.modId) ?? "").trim();
    i && await this._mutateSceneModifiers(
      (l) => l.map((c) => c.id === i ? { ...c, enabled: !c.enabled } : c)
    );
  }
  async _onRemoveSceneModifier(e, t) {
    var n, s, r, o;
    if ((n = e == null ? void 0 : e.preventDefault) == null || n.call(e), (s = e == null ? void 0 : e.stopPropagation) == null || s.call(e), !((r = game.user) != null && r.isGM)) return;
    const i = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.modId) ?? "").trim();
    i && await this._mutateSceneModifiers((l) => l.filter((c) => c.id !== i));
  }
  async _onClearSceneModifiers(e, t) {
    var i, n, s;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), (s = game.user) != null && s.isGM && await this._mutateSceneModifiers(() => []);
  }
  async _mutateSceneModifiers(e) {
    const t = canvas == null ? void 0 : canvas.scene;
    if (!t) return;
    const i = lc(t.getFlag("mwd", Fn)), n = await e(i);
    return await t.setFlag("mwd", Fn, n), this.render({ parts: ["body"] });
  }
  _captureAdhocFormFromDom(e) {
    var c;
    const t = ((c = e == null ? void 0 : e.closest) == null ? void 0 : c.call(e, ".mwd-gmgadget__root")) ?? this._getRootElement();
    if (!(t instanceof HTMLElement)) return null;
    const i = (u) => {
      const d = t.querySelector(u);
      return d instanceof HTMLInputElement || d instanceof HTMLSelectElement ? d.value : "";
    }, n = i('[name="scene-adhoc-label"]').trim(), s = i('[name="scene-adhoc-value"]').trim(), r = i('[name="scene-adhoc-attributeFilter"]').trim() || null, o = i('[name="scene-adhoc-intentFilter"]').trim() || null;
    if (!n) return null;
    const l = Number(s);
    return Number.isFinite(l) ? {
      id: foundry.utils.randomID(),
      label: n,
      value: Math.trunc(l),
      enabled: !0,
      attributeFilter: r,
      intentFilter: o,
      source: "adhoc"
    } : null;
  }
};
D(Ze, "DEFAULT_OPTIONS", {
  id: zy,
  classes: ["mwd-gmgadget"],
  window: {
    title: "MWD GM Gadget",
    popOut: !0,
    resizable: !0
  },
  position: {
    width: 440,
    height: 620
  },
  actions: {
    switchTab: Ze.prototype._onSwitchTab,
    setDn: Ze.prototype._onSetDn,
    clearDn: Ze.prototype._onClearDn,
    toggleAnnounce: Ze.prototype._onToggleAnnounce,
    harmInputChange: Ze.prototype._onHarmInputChange,
    refreshHarmTarget: Ze.prototype._onRefreshHarmTarget,
    applyHarm: Ze.prototype._onApplyHarm,
    hazardInputChange: Ze.prototype._onHazardInputChange,
    refreshHazardTemplate: Ze.prototype._onRefreshHazardTemplate,
    createHazard: Ze.prototype._onCreateHazard,
    addSceneModifierFromPreset: Ze.prototype._onAddSceneModifierFromPreset,
    addSceneModifierAdhoc: Ze.prototype._onAddSceneModifierAdhoc,
    toggleSceneModifier: Ze.prototype._onToggleSceneModifier,
    removeSceneModifier: Ze.prototype._onRemoveSceneModifier,
    clearSceneModifiers: Ze.prototype._onClearSceneModifiers
  }
}), D(Ze, "PARTS", {
  body: { template: Uy }
});
let Kr = Ze;
function oc(a) {
  return Array.isArray(a) ? a.filter((e) => (e == null ? void 0 : e.label) && Number.isFinite(Number(e == null ? void 0 : e.value))).map((e, t) => {
    const i = Math.trunc(Number(e.value));
    return {
      index: t,
      label: String(e.label).trim(),
      value: i,
      signedValue: i >= 0 ? `+${i}` : String(i),
      attributeFilter: String(e.attributeFilter ?? "").trim() || null,
      intentFilter: String(e.intentFilter ?? "").trim() || null
    };
  }) : [];
}
function lc(a) {
  return Array.isArray(a) ? a.map((e) => {
    var s, r;
    const t = Bd(e), i = ((s = Vo.find((o) => o.value === (t.attributeFilter ?? ""))) == null ? void 0 : s.label) ?? null, n = ((r = Yo.find((o) => o.value === (t.intentFilter ?? ""))) == null ? void 0 : r.label) ?? null;
    return {
      ...t,
      attributeFilterLabel: t.attributeFilter ? i : null,
      intentFilterLabel: t.intentFilter ? n : null,
      signedValue: t.value >= 0 ? `+${t.value}` : String(t.value),
      isPositive: t.value > 0
    };
  }) : [];
}
function cc(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
let or = null;
function Jy({ systemId: a = "mwd" } = {}) {
  return or || (or = new Kr({ systemId: a })), or;
}
const Xy = "gmDnPresetEditor";
function Zy(a = []) {
  const e = [], t = [], i = /* @__PURE__ */ new Set();
  if ((Array.isArray(a) ? a : []).forEach((n, s) => {
    const r = String((n == null ? void 0 : n.label) ?? "").trim(), o = String((n == null ? void 0 : n.dn) ?? "").trim(), l = `Row ${s + 1}`;
    if (!r) {
      t.push(`${l}: label cannot be blank.`);
      return;
    }
    if (i.has(r.toLowerCase())) {
      t.push(`${l}: duplicate label "${r}".`);
      return;
    }
    i.add(r.toLowerCase());
    const c = Number(o);
    if (!Number.isFinite(c)) {
      t.push(`${l}: DN must be a number.`);
      return;
    }
    if (c < 0) {
      t.push(`${l}: DN cannot be negative.`);
      return;
    }
    e.push({
      label: r,
      dn: Math.trunc(c)
    });
  }), t.length) throw It(t);
  return yn(e, { strict: !0 });
}
function eb(a = []) {
  return yn(a, { strict: !1 }).map((e) => ({
    label: e.label,
    dn: String(e.dn)
  }));
}
function tb(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw It([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return yn(t, { strict: !0 });
}
function ib(a = []) {
  return JSON.stringify(
    yn(a, { strict: !1 }),
    null,
    2
  );
}
const ab = {
  id: "gm-dn-presets",
  menuKey: Xy,
  settingKey: Kd,
  settingType: Array,
  title: "GM DN Presets",
  description: "Edit the preset DN buttons shown in the GM Gadget difficulty tab.",
  helpText: "Rows are shown in order in the GM Gadget. Labels must be unique.",
  bulkHelpText: 'JSON shape: [{ "label": "Standard", "dn": 1 }]',
  emptyStateText: "No DN preset rows yet. Add one to show buttons in the GM Gadget.",
  addRowLabel: "Add Preset",
  rowSchema: [
    {
      key: "label",
      label: "Label",
      type: "text",
      placeholder: "Standard"
    },
    {
      key: "dn",
      label: "DN",
      type: "number",
      min: 0,
      step: 1,
      placeholder: "1"
    }
  ],
  menu: {
    name: "GM DN Presets",
    label: "Configure",
    hint: "Edit the preset DN buttons used by the GM Gadget.",
    icon: "fas fa-sliders-h",
    restricted: !0
  },
  defaultData: Ky,
  createEmptyRow: () => ({
    label: "",
    dn: "1"
  }),
  toRows: eb,
  rowsToValue: Zy,
  parseBulk: tb,
  serializeBulk: ib
};
function nb() {
  La(ab);
}
const sb = "lifeModuleCatalogEditor";
function rb(a = []) {
  return ra((Array.isArray(a) ? a : []).map((e) => ({
    id: String((e == null ? void 0 : e.id) ?? ""),
    moduleType: String((e == null ? void 0 : e.moduleType) ?? ""),
    label: String((e == null ? void 0 : e.label) ?? ""),
    grants: String((e == null ? void 0 : e.grants) ?? ""),
    requiresAny: String((e == null ? void 0 : e.requiresAny) ?? ""),
    excludesAny: String((e == null ? void 0 : e.excludesAny) ?? "")
  })), { strict: !0 });
}
function ob(a = []) {
  return ra(a, { strict: !1 }).map((e) => ({
    id: e.id,
    moduleType: e.moduleType,
    label: e.label,
    grants: Qh(e.grants),
    requiresAny: e.requiresAny.join(", "),
    excludesAny: e.excludesAny.join(", ")
  }));
}
function lb(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    const n = new Error(`Bulk JSON must be valid JSON: ${i.message}`);
    throw n.validationErrors = [n.message], n;
  }
  if (!Array.isArray(t)) {
    const i = new Error("Bulk JSON must be an array.");
    throw i.validationErrors = [i.message], i;
  }
  return ra(t, { strict: !0 });
}
function cb(a = []) {
  return JSON.stringify(
    ra(a, { strict: !1 }),
    null,
    2
  );
}
const ub = {
  id: "life-module-catalog",
  menuKey: sb,
  settingKey: ka,
  settingType: Array,
  title: "Life Module Catalog",
  description: "Define the canonical life modules available for Faction, Childhood, Higher Education, and Real Life character development.",
  helpText: 'Grants use ";" to separate separate bonuses and "|" to separate choices inside one bonus. Each choice is prefixed with "skill:" or "edgePool:". Example: "skill:disguise; edgePool:rumor" or "skill:tracking|skill:projectileWeapons".',
  bulkHelpText: 'JSON shape: [{ "id": "faction-capellan-confederation", "moduleType": "faction", "label": "Capellan Confederation", "grants": [{ "id": "skill", "choices": [{ "type": "skill", "value": "disguise" }] }, { "id": "edge-pool", "choices": [{ "type": "edgePool", "value": "rumor" }] }], "requiresAny": [], "excludesAny": [] }]',
  emptyStateText: "No life modules yet. Add one to start the catalog.",
  addRowLabel: "Add Life Module",
  rowSchema: [
    {
      key: "id",
      label: "Id",
      type: "text",
      placeholder: "childhood-backwoods"
    },
    {
      key: "moduleType",
      label: "Slot",
      type: "select",
      options: od
    },
    {
      key: "label",
      label: "Label",
      type: "text",
      placeholder: "Backwoods"
    },
    {
      key: "grants",
      label: "Grants",
      type: "text",
      placeholder: "skill:tracking|skill:projectileWeapons"
    },
    {
      key: "requiresAny",
      label: "Requires Any",
      type: "text",
      placeholder: "childhood-nobility"
    },
    {
      key: "excludesAny",
      label: "Excludes Any",
      type: "text",
      placeholder: "higher-education-military-academy"
    }
  ],
  menu: {
    name: "Life Module Catalog",
    label: "Configure",
    hint: "Edit the canonical life modules and their skill roll modifiers.",
    icon: "fas fa-book-open",
    restricted: !0
  },
  defaultData: Wo,
  createEmptyRow: () => ({
    id: "",
    moduleType: "childhood",
    label: "",
    grants: "",
    requiresAny: "",
    excludesAny: ""
  }),
  toRows: ob,
  rowsToValue: rb,
  parseBulk: lb,
  serializeBulk: cb
};
function db() {
  La(ub);
}
const mb = "personalActionCatalogEditor", uc = Object.freeze([
  { value: "false", label: "No" },
  { value: "true", label: "Yes" }
]);
function fb(a = []) {
  try {
    return hn((Array.isArray(a) ? a : []).map((e) => ({
      id: String((e == null ? void 0 : e.id) ?? ""),
      label: String((e == null ? void 0 : e.label) ?? ""),
      category: String((e == null ? void 0 : e.category) ?? ""),
      cost: String((e == null ? void 0 : e.cost) ?? "0"),
      handler: String((e == null ? void 0 : e.handler) ?? ""),
      reason: String((e == null ? void 0 : e.reason) ?? ""),
      rollIntent: String((e == null ? void 0 : e.rollIntent) ?? ""),
      prominent: String((e == null ? void 0 : e.prominent) ?? "false"),
      prominentWhenBurning: String((e == null ? void 0 : e.prominentWhenBurning) ?? "false")
    })), { strict: !0 });
  } catch (e) {
    throw It(
      Array.isArray(e.validationErrors) ? e.validationErrors : [e.message]
    );
  }
}
function pb(a = []) {
  return hn(a, { strict: !1 }).map((e) => {
    var t;
    return {
      id: String(e.id ?? ""),
      label: String(e.label ?? ""),
      category: String(e.category ?? ""),
      cost: String(e.cost ?? "0"),
      handler: String(e.handler ?? ""),
      reason: String(e.reason ?? ""),
      rollIntent: String(((t = e.roll) == null ? void 0 : t.intent) ?? ""),
      prominent: e.prominent ? "true" : "false",
      prominentWhenBurning: e.prominentWhenBurning ? "true" : "false"
    };
  });
}
function hb(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw It([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  try {
    return hn(t, { strict: !0 });
  } catch (i) {
    throw It(
      Array.isArray(i.validationErrors) ? i.validationErrors : [i.message]
    );
  }
}
function gb(a = []) {
  return JSON.stringify(
    hn(a, { strict: !1 }),
    null,
    2
  );
}
const yb = {
  id: "personal-action-catalog",
  menuKey: mb,
  settingKey: Ju,
  settingType: Array,
  title: "Personal Action Catalog",
  description: "Edit the action buttons shown in the personal combat action menu.",
  helpText: "Rows are shown in menu order within their category. Handler controls what the button does; leave it as a placeholder for actions whose mechanics are not implemented yet.",
  bulkHelpText: 'JSON shape: [{ "id": "move", "label": "Move", "category": "standard", "cost": 1, "handler": "combatAction" }]',
  emptyStateText: "No actions configured. Restore defaults to rebuild the standard action catalog.",
  addRowLabel: "Add Action",
  rowSchema: [
    {
      key: "id",
      label: "Id",
      type: "text",
      placeholder: "move"
    },
    {
      key: "label",
      label: "Label",
      type: "text",
      placeholder: "Move"
    },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: () => Ir
    },
    {
      key: "cost",
      label: "Cost",
      type: "number",
      min: 0,
      step: 1,
      placeholder: "1"
    },
    {
      key: "handler",
      label: "Handler",
      type: "select",
      options: () => Xu
    },
    {
      key: "reason",
      label: "Disabled Reason",
      type: "text",
      placeholder: "Not yet implemented."
    },
    {
      key: "rollIntent",
      label: "Roll Intent",
      type: "text",
      placeholder: "overload"
    },
    {
      key: "prominent",
      label: "Prominent",
      type: "select",
      options: () => uc
    },
    {
      key: "prominentWhenBurning",
      label: "Burn Highlight",
      type: "select",
      options: () => uc
    }
  ],
  menu: {
    name: "Personal Action Catalog",
    label: "Configure",
    hint: "Edit the personal combat action menus and first-pass action handlers.",
    icon: "fas fa-list-check",
    restricted: !0
  },
  defaultData: zo,
  createEmptyRow: () => {
    var a;
    return {
      id: "",
      label: "",
      category: ((a = Ir[0]) == null ? void 0 : a.value) ?? "standard",
      cost: "1",
      handler: "combatAction",
      reason: "",
      rollIntent: "",
      prominent: "false",
      prominentWhenBurning: "false"
    };
  },
  toRows: pb,
  rowsToValue: fb,
  parseBulk: hb,
  serializeBulk: gb
};
function bb() {
  La(yb);
}
const Sb = "skillSpecializationEditor";
function Gr() {
  return Zn().map((a) => ({
    value: a.code,
    label: a.label
  }));
}
function Ab(a = []) {
  const e = new Set(Gr().map((n) => n.value)), t = {}, i = [];
  if ((Array.isArray(a) ? a : []).forEach((n, s) => {
    const r = String((n == null ? void 0 : n.skillCode) ?? "").trim(), o = String((n == null ? void 0 : n.label) ?? "").trim(), l = `Row ${s + 1}`;
    if (!r) {
      i.push(`${l}: choose a skill.`);
      return;
    }
    if (!e.has(r)) {
      i.push(`${l}: unknown skill code "${r}".`);
      return;
    }
    if (!o) {
      i.push(`${l}: specialization label cannot be blank.`);
      return;
    }
    (t[r] ?? (t[r] = [])).push(o);
  }), i.length) throw It(i);
  return As(t, { strict: !0 });
}
function Tb(a = {}) {
  const e = As(a, { strict: !1 });
  return Object.entries(e).flatMap(
    ([t, i]) => i.map((n) => ({ skillCode: t, label: n }))
  );
}
function wb(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return {};
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw It([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return As(t, { strict: !0 });
}
function kb(a = {}) {
  return JSON.stringify(
    As(a, { strict: !1 }),
    null,
    2
  );
}
const vb = {
  id: "skill-specializations",
  menuKey: Sb,
  settingKey: Er,
  title: "Skill Specializations",
  description: "Edit the world specialization catalog for existing skills. Omitted skills have no available specializations.",
  helpText: "Use rows for normal editing. Use the bulk JSON tab for fast import/export.",
  bulkHelpText: 'JSON shape: { "athletics": ["Running", "Jumping"] }',
  emptyStateText: "No specialization rows yet. Add one to start the catalog.",
  addRowLabel: "Add Specialization",
  rowSchema: [
    {
      key: "skillCode",
      label: "Skill",
      type: "select",
      options: Gr
    },
    {
      key: "label",
      label: "Specialization",
      type: "text",
      placeholder: "Running"
    }
  ],
  menu: {
    name: "Skill Specializations",
    label: "Configure",
    hint: "Edit the specialization catalog for canonical skills.",
    icon: "fas fa-list",
    restricted: !0
  },
  defaultData: wu,
  createEmptyRow: () => {
    var a;
    return {
      skillCode: ((a = Gr()[0]) == null ? void 0 : a.value) ?? "",
      label: ""
    };
  },
  toRows: Tb,
  rowsToValue: Ab,
  parseBulk: wb,
  serializeBulk: kb
};
function Mb() {
  La(vb);
}
const Cb = "statusConditionCatalogEditor";
function Eb(a = []) {
  try {
    return Zi((Array.isArray(a) ? a : []).map((e) => ({
      id: String((e == null ? void 0 : e.id) ?? ""),
      label: String((e == null ? void 0 : e.label) ?? ""),
      actorGroup: String((e == null ? void 0 : e.actorGroup) ?? ""),
      category: String((e == null ? void 0 : e.category) ?? ""),
      tags: String((e == null ? void 0 : e.tags) ?? ""),
      icon: String((e == null ? void 0 : e.icon) ?? ""),
      manual: String((e == null ? void 0 : e.manual) ?? "true"),
      managed: String((e == null ? void 0 : e.managed) ?? "false"),
      modifierKey: String((e == null ? void 0 : e.modifierKey) ?? ""),
      order: String((e == null ? void 0 : e.order) ?? "0")
    })), { strict: !0 });
  } catch (e) {
    throw It(
      Array.isArray(e.validationErrors) ? e.validationErrors : [e.message]
    );
  }
}
function Pb(a = []) {
  return Zi(a, { strict: !1 }).map((e) => ({
    id: String(e.id ?? ""),
    label: String(e.label ?? ""),
    actorGroup: String(e.actorGroup ?? "person"),
    category: String(e.category ?? ""),
    tags: fp(e.tags ?? []),
    icon: String(e.icon ?? ""),
    manual: e.manual ? "true" : "false",
    managed: e.managed ? "true" : "false",
    modifierKey: String(e.modifierKey ?? ""),
    order: String(e.order ?? "0")
  }));
}
function Rb(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw It([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  try {
    return Zi(t, { strict: !0 });
  } catch (i) {
    throw It(
      Array.isArray(i.validationErrors) ? i.validationErrors : [i.message]
    );
  }
}
function Nb(a = []) {
  return JSON.stringify(
    Zi(a, { strict: !1 }),
    null,
    2
  );
}
const Ib = {
  id: "status-condition-catalog",
  menuKey: Cb,
  settingKey: Mu,
  settingType: Array,
  title: "Status Condition Catalog",
  description: "Edit the actor-aware statuses available in MWD status pickers and GM Harm.",
  helpText: "Actor group controls where a condition can be applied. Modifier Key is optional and only links to existing mechanics-backed status modifiers.",
  bulkHelpText: 'JSON shape: [{ "id": "unstable", "label": "Unstable", "actorGroup": "machine", "category": "stability", "tags": ["movement"] }]',
  emptyStateText: "No condition rows configured. Restore defaults to rebuild the standard MWD status catalog.",
  addRowLabel: "Add Condition",
  rowSchema: [
    { key: "id", label: "Id", type: "text", placeholder: "unstable" },
    { key: "label", label: "Label", type: "text", placeholder: "Unstable" },
    { key: "actorGroup", label: "Actor Group", type: "select", options: () => lp },
    { key: "category", label: "Category", type: "text", placeholder: "stability" },
    { key: "tags", label: "Tags", type: "text", placeholder: "movement, piloting" },
    { key: "icon", label: "Icon", type: "text", placeholder: "systems/mwd/img/icons/status/falling.svg" },
    { key: "manual", label: "Manual", type: "select", options: () => gl },
    { key: "managed", label: "Managed", type: "select", options: () => gl },
    { key: "modifierKey", label: "Modifier Key", type: "text", placeholder: "prone" },
    { key: "order", label: "Order", type: "number", step: 1, placeholder: "1000" }
  ],
  menu: {
    name: "Status Condition Catalog",
    label: "Configure",
    hint: "Edit person, vehicle, and BattleMech status condition availability.",
    icon: "fas fa-heart-pulse",
    restricted: !0
  },
  defaultData: Ru,
  createEmptyRow: () => ({
    id: "",
    label: "",
    actorGroup: "machine",
    category: "general",
    tags: "",
    icon: "",
    manual: "true",
    managed: "false",
    modifierKey: "",
    order: "0"
  }),
  toRows: Pb,
  rowsToValue: Eb,
  parseBulk: Rb,
  serializeBulk: Nb
};
function Db() {
  La(Ib);
}
class Ob {
  static register() {
    nb(), db(), bb(), Mb(), xy(), Db(), game.settings.register(T, "useDestinyMechanics", {
      name: k.settings.useDestinyMechanics.name,
      hint: k.settings.useDestinyMechanics.hint,
      scope: "world",
      config: !0,
      type: Boolean,
      default: !0
    }), game.settings.register(T, "enableGMGadget", {
      name: "Enable GM Gadget",
      hint: "If enabled, renders the new AppV2 GM Gadget UI on startup.",
      scope: "world",
      config: !0,
      type: Boolean,
      default: !0
    }), game.settings.register(T, vd, {
      name: "Machine Critical Table: General",
      hint: "2d6 RollTable UUID that chooses the general type of machine critical problem.",
      scope: "world",
      config: !0,
      type: String,
      default: nt.general
    }), game.settings.register(T, Md, {
      name: "Machine Critical Table: BattleMech Head",
      hint: "Location interpretation table for BattleMech head criticals.",
      scope: "world",
      config: !0,
      type: String,
      default: nt.mechHead
    }), game.settings.register(T, Cd, {
      name: "Machine Critical Table: BattleMech Torso",
      hint: "Location interpretation table for BattleMech torso, core, and forced critical hits.",
      scope: "world",
      config: !0,
      type: String,
      default: nt.mechTorso
    }), game.settings.register(T, Ed, {
      name: "Machine Critical Table: BattleMech Arms",
      hint: "Location interpretation table for BattleMech arm criticals.",
      scope: "world",
      config: !0,
      type: String,
      default: nt.mechArms
    }), game.settings.register(T, Pd, {
      name: "Machine Critical Table: BattleMech Legs",
      hint: "Location interpretation table for BattleMech leg criticals.",
      scope: "world",
      config: !0,
      type: String,
      default: nt.mechLegs
    }), game.settings.register(T, Rd, {
      name: "Machine Critical Table: Vehicle Body",
      hint: "Location interpretation table for vehicle body criticals.",
      scope: "world",
      config: !0,
      type: String,
      default: nt.vehicleBody
    }), game.settings.register(T, Nd, {
      name: "Machine Critical Table: Vehicle Turret",
      hint: "Location interpretation table for vehicle turret and weapon criticals.",
      scope: "world",
      config: !0,
      type: String,
      default: nt.vehicleTurret
    }), game.settings.register(T, Id, {
      name: "Machine Critical Table: Vehicle Mobility",
      hint: "Location interpretation table for vehicle mobility criticals.",
      scope: "world",
      config: !0,
      type: String,
      default: nt.vehicleMobility
    });
  }
  static getSystemProperty(e, t) {
    return game.settings.get(T, e) ?? t;
  }
}
class _b extends Error {
  constructor(e, { severity: t = "error" } = {}) {
    super(e), this.name = "UserFacingRollError", this.userFacing = !0, this.severity = t === "warn" ? "warn" : "error";
  }
}
function ji(a, e = {}) {
  return new _b(a, e);
}
function Yi(a, e = "Unable to execute roll.") {
  var i, n;
  const t = a != null && a.userFacing && (a == null ? void 0 : a.severity) === "warn" ? "warn" : "error";
  (n = (i = ui.notifications) == null ? void 0 : i[t]) == null || n.call(i, (a == null ? void 0 : a.message) ?? e);
}
const rs = Symbol("SKIP_FIELD");
function qd(a) {
  return a instanceof HTMLInputElement || a instanceof HTMLSelectElement || a instanceof HTMLTextAreaElement;
}
function Lb({
  elementKind: a = "input",
  inputType: e = "",
  dtype: t = "",
  value: i = "",
  checked: n = !1
} = {}) {
  const s = String(a ?? "").trim().toLowerCase(), r = String(e ?? "").trim().toLowerCase(), o = String(t ?? "").trim().toLowerCase();
  if (!["input", "select", "textarea"].includes(s))
    return rs;
  if (s === "input") {
    if (r === "radio")
      return n ? i : rs;
    if (r === "checkbox")
      return !!n;
  }
  if (o === "number" || s === "input" && r === "number") {
    const l = Number(i);
    return Number.isFinite(l) ? l : 0;
  }
  return o === "boolean" ? i === !0 || i === "true" : i;
}
function xb(a) {
  var e;
  return qd(a) ? Lb({
    elementKind: a instanceof HTMLSelectElement ? "select" : a instanceof HTMLTextAreaElement ? "textarea" : "input",
    inputType: a instanceof HTMLInputElement ? a.type : "",
    dtype: String(((e = a.dataset) == null ? void 0 : e.dtype) ?? ""),
    value: a.value,
    checked: a instanceof HTMLInputElement ? a.checked : !1
  }) : rs;
}
function $b({
  root: a,
  document: e,
  selector: t = "input[name], select[name], textarea[name]",
  clampByPath: i = null,
  skipNames: n = []
} = {}) {
  if (!(a instanceof HTMLElement)) return {};
  const s = new Set(Array.isArray(n) ? n : [n]), r = {};
  for (const o of a.querySelectorAll(t)) {
    if (!qd(o) || o.closest("prose-mirror") || o.disabled) continue;
    const l = String(o.getAttribute("name") ?? o.name ?? "").trim();
    if (!l || s.has(l)) continue;
    let c = xb(o);
    c === rs || (typeof i == "function" && (c = i(l, c)), (e ? foundry.utils.getProperty(e, l) : void 0) === c) || (r[l] = c);
  }
  return r;
}
const { HandlebarsApplicationMixin: Bb } = foundry.applications.api, { HTMLField: zb } = foundry.data.fields;
function Fb(a) {
  const e = new zb({ required: !1, blank: !0, initial: "" });
  return e.name = a, e;
}
var jt, un, Ci, $i, qr, Vr;
const Ge = class Ge extends Bb(foundry.applications.sheets.ActorSheetV2) {
  constructor() {
    super(...arguments);
    Ce(this, $i);
    Ce(this, jt, !1);
    /** Track active CSB tab per group across rerenders */
    Ce(this, un, /* @__PURE__ */ new Map());
    // group -> tabId
    Ce(this, Ci, /* @__PURE__ */ new Map());
  }
  /** @override */
  _updatePosition(t) {
    const i = super._updatePosition(t), {
      MIN_WIDTH: n,
      MAX_WIDTH: s,
      MIN_HEIGHT: r,
      MAX_HEIGHT: o
    } = this.constructor;
    return typeof i.width == "number" && (i.width = Math.min(
      s,
      Math.max(n, i.width)
    )), typeof i.height == "number" && (i.height = Math.min(
      o,
      Math.max(r, i.height)
    )), i;
  }
  // Legacy callers still probe defaultOptions directly, so keep the alias until
  // the remaining compatibility surfaces are gone.
  static get defaultOptions() {
    return this.DEFAULT_OPTIONS;
  }
  /** Editing mode flag for templates */
  get editing() {
    return H(this, jt);
  }
  toggleEditing() {
    if (this.isEditable) {
      if (H(this, jt)) {
        this._commitEditsToActor().finally(() => {
          $e(this, jt, !H(this, jt)), this.render({ force: !0 });
        });
        return;
      }
      $e(this, jt, !H(this, jt)), this.render({ force: !0 });
    }
  }
  /** Get the root HTMLElement for this application */
  _getRootElement() {
    var t;
    return this.element instanceof HTMLElement ? this.element : (t = this.element) == null ? void 0 : t[0];
  }
  /**
   * Resolve the TokenDocument that launched this sheet when one exists.
   * This keeps linked-token behavior aligned with Foundry's token API.
   */
  getSheetTokenDocument() {
    var s, r;
    const t = this.actor ?? this.document ?? null, i = (t == null ? void 0 : t.token) ?? null, n = (s = this.document) != null && s.isToken ? ((r = this.document) == null ? void 0 : r.token) ?? i ?? null : i;
    return n ? (n == null ? void 0 : n.document) ?? n : null;
  }
  /**
   * Resolve the document that should persist actor-backed state.
   * Linked token sheets should write to the base actor document so state survives scene changes.
   */
  getPersistentActor() {
    var n, s, r;
    const t = this.actor ?? this.document ?? null;
    if (!t) return null;
    const i = this.getSheetTokenDocument();
    return i != null && i.isLinked ? i.baseActor ?? ((r = (n = game.actors) == null ? void 0 : n.get) == null ? void 0 : r.call(n, ((s = i == null ? void 0 : i.baseActor) == null ? void 0 : s.id) ?? "")) ?? i.actor ?? t : t;
  }
  /** @override */
  _initializeApplicationOptions(t) {
    var o, l, c, u, d;
    t = super._initializeApplicationOptions(t), t.classes = Array.from(t.classes ?? []);
    const i = (t == null ? void 0 : t.document) ?? this.document, n = (i == null ? void 0 : i.type) ?? ((o = this.actor) == null ? void 0 : o.type);
    n && t.classes.push(String(n));
    const s = ((d = (u = (c = (l = game.system) == null ? void 0 : l.anarchy) == null ? void 0 : c.styles) == null ? void 0 : u.selectCssClass) == null ? void 0 : d.call(u)) ?? "mwd-theme-default", r = ["mwd-theme-default", "mwd-theme-sra"];
    for (let m = t.classes.length - 1; m >= 0; m--)
      r.includes(t.classes[m]) && t.classes.splice(m, 1);
    return t.classes.push(s), t;
  }
  /**
   * No localization: provide a concrete title so Foundry doesn't show "TYPES.Actor.<type>".
   * @override
   */
  get title() {
    var r, o;
    const t = ((r = this.actor) == null ? void 0 : r.type) ?? "actor", n = {
      character: "Character",
      npc: "NPC",
      battlemech: "BattleMech",
      vehicle: "Vehicle",
      device: "Device"
    }[t] ?? String(t).replace(/(^|[-_])([a-z])/g, (l, c, u) => (c ? " " : "") + u.toUpperCase());
    return `${((o = this.actor) == null ? void 0 : o.name) ?? "Actor"} — ${n}`;
  }
  /**
   * Window actions (header/menu). Centralize here and dedupe by action key.
   * @override
   */
  _getHeaderControls() {
    var r, o;
    let t = ((r = super._getHeaderControls) == null ? void 0 : r.call(this)) ?? [];
    const i = ((o = this.document) == null ? void 0 : o.isToken) ?? !1, n = /* @__PURE__ */ new Set();
    i ? (n.add("prototypeToken"), n.add("configurePrototypeToken")) : (n.add("token"), n.add("configureToken")), t = t.filter((l) => {
      const c = (l == null ? void 0 : l.action) ?? "", u = String((l == null ? void 0 : l.label) ?? "");
      return !(n.has(c) || i && u.includes("Prototype") || !i && u === "Token");
    });
    const s = /* @__PURE__ */ new Set();
    return t = t.filter((l) => {
      const c = l == null ? void 0 : l.action, u = c ? `a:${c}` : `il:${(l == null ? void 0 : l.icon) ?? ""}|${(l == null ? void 0 : l.label) ?? ""}`;
      return s.has(u) ? !1 : (s.add(u), !0);
    }), t;
  }
  /**
   * AppV2 action handler: Edit/View toggle.
   * Note: actions mapping already routes clicks here; we keep this lean.
   */
  async _onToggleViewMode(t) {
    var i;
    (i = t == null ? void 0 : t.preventDefault) == null || i.call(t), this.toggleEditing();
  }
  /**
   * AppV2 action handler: CSB tab click.
   * Defensive: derive the tab link from target or event.
   */
  _onClickTab(t, i) {
    var l, c, u;
    const n = ((l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, ".csb-tab-link[data-tab]")) ?? ((u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, ".csb-tab-link[data-tab]"));
    if (!n) return;
    const s = n.dataset.tab, r = n.closest(".csb-tabs");
    if (!r || !s) return;
    const o = r.dataset.group || "default";
    H(this, un).set(o, s), C(this, $i, qr).call(this, r, s);
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const n = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!n) return;
    const s = n.dataset.section, r = n.closest(".csb-accordion");
    if (!r || !s) return;
    const o = r.dataset.group || "default", c = (H(this, Ci).has(o) ? H(this, Ci).get(o) : r.dataset.default || null) === s ? null : s;
    H(this, Ci).set(o, c), C(this, $i, Vr).call(this, r, c);
  }
  /**
   * Universal roll action: data-action="roll" + data-roll='{"intent":"skill","key":"gunnery"}'
   */
  async _onRollAction(t, i) {
    var c, u, d, m, f, p, h, g, y;
    (c = t == null ? void 0 : t.preventDefault) == null || c.call(t);
    const n = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, "[data-roll]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-roll]")), s = (f = n == null ? void 0 : n.dataset) == null ? void 0 : f.roll;
    if (!s) return;
    let r;
    try {
      r = JSON.parse(s);
    } catch (b) {
      console.warn("MWD | Invalid data-roll JSON:", s, b);
      return;
    }
    const o = !!(t != null && t.shiftKey), l = ((p = game.mwd) == null ? void 0 : p.roll) ?? ((g = (h = game.system) == null ? void 0 : h.mwd) == null ? void 0 : g.roll);
    if (!(l != null && l.execute)) {
      (y = ui.notifications) == null || y.error("MWD roll system not initialized (game.mwd.roll.execute missing).");
      return;
    }
    try {
      return await l.execute({ actor: this.actor, payload: r, event: t, quick: o });
    } catch (b) {
      return console.error("MWD | Failed to execute roll action", b), Yi(b, "Unable to execute that roll."), null;
    }
  }
  async _onEditImage(t, i) {
    var r, o, l;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable || !this.editing) return;
    const n = foundry.applications.apps.FilePicker.implementation;
    new n({
      type: "image",
      current: ((l = this.actor) == null ? void 0 : l.img) ?? "",
      callback: async (c) => {
        if (!c) return;
        await (this.getPersistentActor() ?? this.actor).update({ img: c });
      }
    }).render(!0);
  }
  /* -------------------------------------------- */
  /* Shared Owned Item Actions                     */
  /* -------------------------------------------- */
  // The character sheet already has richer item affordances, but NPC, vehicle,
  // and battlemech sheets only need a stable baseline: create, open, delete,
  // and the two common loadout toggles.
  _getOwnedItemFromTarget(t, i) {
    var s, r, o, l, c, u, d, m, f, p, h;
    const n = String(
      ((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.itemId) ?? ((l = (o = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((m = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
    ).trim();
    return n ? ((h = (p = (f = this.actor) == null ? void 0 : f.items) == null ? void 0 : p.get) == null ? void 0 : h.call(p, n)) ?? null : null;
  }
  _getItemTypeLabel(t = "") {
    const i = String(t ?? "").trim();
    return {
      personalWeapon: "Personal Weapon",
      mechWeapon: "Mech Weapon",
      assetModule: "Asset Module",
      lifeModule: "Life Module",
      consumable: "Consumable"
    }[i] ?? i.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (s) => s.toUpperCase());
  }
  async _onCreateOwnedItem(t, i) {
    var o, l, c;
    if ((o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const n = String(((c = i == null ? void 0 : i.dataset) == null ? void 0 : c.itemType) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = s.items.filter((u) => (u.canonicalType ?? u.type) === n).length;
    await s.createEmbeddedDocuments("Item", [{
      name: `${this._getItemTypeLabel(n)} ${r + 1}`,
      type: n
    }]), this.render({ force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var s, r, o;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = this._getOwnedItemFromTarget(i, t);
    (o = n == null ? void 0 : n.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var r, o;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = this._getOwnedItemFromTarget(i, t);
    if (!n) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [n.id]), this.render({ force: !0 });
  }
  async _onToggleOwnedItemEquipped(t, i) {
    var r, o, l, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = this._getOwnedItemFromTarget(i, t);
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor;
    await ((c = s.setOwnedItemEquipped) == null ? void 0 : c.call(s, n.id, !((l = n.system) != null && l.equipped))), this.render({ force: !0 });
  }
  async _onSetOwnedItemPrimary(t, i) {
    var r, o, l, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = this._getOwnedItemFromTarget(i, t);
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor;
    await ((c = s.setOwnedItemPrimary) == null ? void 0 : c.call(s, n.id, !((l = n.system) != null && l.isPrimary))), this.render({ force: !0 });
  }
  /**
   * Post-render reconciliation hook (stable DOM).
   * Ensures every .csb-tabs group has exactly one active tab/panel:
   * - prefer remembered selection
   * - else use data-default
   * - else use first tab link
   * @override
   */
  _onRender(t, i) {
    var s, r, o;
    (s = super._onRender) == null || s.call(this, t, i);
    const n = this._getRootElement();
    if (n) {
      for (const l of n.querySelectorAll(".csb-tabs")) {
        const c = l.dataset.group || "default", u = H(this, un).get(c), d = l.dataset.default || ((r = l.querySelector(".csb-tab-link[data-tab]")) == null ? void 0 : r.dataset.tab), m = u || d;
        m && C(this, $i, qr).call(this, l, m);
      }
      for (const l of n.querySelectorAll(".csb-accordion")) {
        const c = l.dataset.group || "default", u = H(this, Ci).has(c) ? H(this, Ci).get(c) : l.dataset.default || null;
        C(this, $i, Vr).call(this, l, u);
      }
      n.querySelectorAll(".csb-tabs").length && !n.querySelector(".csb-tab-panel.is-active") && console.warn(`${Me} CSB tabs present but no active tab applied. Check element root resolution and CSS .is-active selectors.`, {
        sheet: (o = this.constructor) == null ? void 0 : o.name
      });
      for (const l of n.querySelectorAll('prose-mirror[name="system.biography.history"]'))
        l.addEventListener("change", (c) => {
          c.preventDefault(), this._updateRichTextHistory(l);
        });
    }
  }
  async _updateRichTextHistory(t) {
    if (!this.isEditable || (t == null ? void 0 : t.name) !== "system.biography.history") return;
    const i = String(t.value ?? ""), n = String(foundry.utils.getProperty(this.actor, "system.biography.history") ?? "");
    if (i !== n)
      try {
        await (this.getPersistentActor() ?? this.actor).update({ "system.biography.history": i });
      } catch (s) {
        console.warn("MWD | Rich text history update failed:", s);
      }
  }
  async _commitEditsToActor() {
    const t = this.element;
    if (!t) return;
    const i = $b({
      root: t,
      document: this.actor,
      selector: 'input[name][data-edit-field="staged"], select[name][data-edit-field="staged"], textarea[name][data-edit-field="staged"]',
      clampByPath: this._clampByPath.bind(this),
      skipNames: ["system.biography.history"]
    });
    if (Object.keys(i).length)
      try {
        await (this.getPersistentActor() ?? this.actor).update(i);
      } catch (n) {
        console.warn("MWD | Commit failed (permissions or validation):", n);
      }
  }
  /** @override */
  async _prepareContext(t) {
    var r, o, l, c, u, d, m, f, p, h, g;
    console.log(`${Me}BaseActorSheetV2._prepareContext:start`, {
      actorName: (r = this.actor) == null ? void 0 : r.name,
      actorType: (o = this.actor) == null ? void 0 : o.type
    });
    const i = await super._prepareContext(t), n = foundry.utils.deepClone((i == null ? void 0 : i.options) ?? {});
    n.classes = Array.from(((l = this.options) == null ? void 0 : l.classes) ?? []), n.cssClass = n.classes.join(" ");
    const s = foundry.utils.mergeObject(
      i,
      {
        actor: this.actor,
        system: (c = this.actor) == null ? void 0 : c.system,
        editable: this.isEditable,
        owner: ((u = this.document) == null ? void 0 : u.isOwner) ?? !1,
        limited: !(((d = this.document) == null ? void 0 : d.isOwner) ?? !1),
        editing: H(this, jt),
        data: this.actor,
        options: n,
        cssClass: n.cssClass
      },
      { inplace: !1 }
    );
    return s.options.owner = s.owner, s.options.limited = s.limited, s.options.editable = s.editable, s.options.editing = s.editing, s.options.viewMode = !s.editing, s.skillsDisplay = vu(((m = this.actor) == null ? void 0 : m.system) ?? {}), s.bio = {
      ...s.bio ?? {},
      fields: {
        history: Fb("system.biography.history")
      }
    }, s.items ?? (s.items = {}), (f = this.actor) != null && f.items && typeof (oe == null ? void 0 : oe.classifyInto) == "function" && (oe.classifyInto(s.items, this.actor.items), s.items.weapon = [
      ...s.items.mechWeapon ?? [],
      ...s.items.personalWeapon ?? []
    ]), s.npcItems = {
      traits: s.items.quality ?? [],
      weapons: s.items.weapon ?? [],
      assetModules: s.items.assetModule ?? [],
      // Legacy partials still read npcItems.inventory, so fold consumables into
      // that alias until every remaining actor surface reads explicit buckets.
      inventory: [
        ...s.items.gear ?? [],
        ...s.items.consumable ?? []
      ]
    }, console.log(`${Me}BaseActorSheetV2._prepareContext:done`, {
      actorType: (p = this.actor) == null ? void 0 : p.type,
      cssClass: s.cssClass,
      itemCount: ((g = (h = this.actor) == null ? void 0 : h.items) == null ? void 0 : g.size) ?? 0,
      editing: H(this, jt)
    }), s;
  }
  /** Clamp certain actor system paths to valid ranges */
  _clampByPath(t, i) {
    return typeof i != "number" ? i : ((/^system\.skills\.[^.]+\.rating$/.test(t) || /^system\.attributes\.[^.]+\.value$/.test(t)) && (i = Math.trunc(i)), /^system\.skills\.[^.]+\.rating$/.test(t) ? Math.clamp(i, 0, 12) : /^system\.attributes\.[^.]+\.value$/.test(t) ? Math.clamp(i, 0, 10) : t === "system.speed" ? Math.max(0, Math.trunc(i)) : i);
  }
  /** Action handler: Condition Monitor set */
  async _onMonitorSet(t, i) {
    var f, p;
    if (t.preventDefault(), !this.isEditable) return;
    const n = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.monitor) ?? "").trim(), s = Number((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.value);
    if (!n || !Number.isFinite(s)) return;
    const r = n === "burn" ? "system.burn.value" : `system.monitors.${n}.value`, o = Number(foundry.utils.getProperty(this.actor, r) ?? 0), l = n === "armor" ? s : o === s ? 0 : s, c = this.getPersistentActor() ?? this.actor;
    if (typeof (c == null ? void 0 : c.setMonitorValue) == "function")
      return c.setMonitorValue(n, l, { source: "sheet" });
    const u = `system.monitors.${n}`, d = Number(foundry.utils.getProperty(c, `${u}.max`)) || 0, m = Math.min(Math.max(0, l), Math.max(0, d));
    return c.update({ [`${u}.value`]: m });
  }
  /**
  * Compute -1 penalty per 3 full damage (3,6,9...)
  * Returns 0, -1, -2, ...
  */
  static _mwdPenaltyFromDamage(t) {
    const i = Math.max(0, Number(t) || 0);
    return -Math.floor(i / 3);
  }
  /**
   * Compute resistance = ceil(value / 4), with 0 -> 0
   * 1-4 => 1, 5-8 => 2, ...
   */
  static _mwdResistanceFromValue(t) {
    const i = Math.max(0, Number(t) || 0);
    return i === 0 ? 0 : Math.ceil(i / 4);
  }
};
jt = new WeakMap(), un = new WeakMap(), Ci = new WeakMap(), $i = new WeakSet(), /**
 * Apply active-state classes within a single .csb-tabs root.
 * Idempotent: safe to call every render.
 */
qr = function(t, i) {
  t.querySelectorAll(".csb-tab-link").forEach((n) => {
    n.classList.toggle("is-active", n.dataset.tab === i);
  }), t.querySelectorAll(".csb-tab-panel").forEach((n) => {
    n.classList.toggle("is-active", n.dataset.tab === i);
  });
}, Vr = function(t, i) {
  t.dataset.activeSection = i ?? "", t.querySelectorAll(".csb-accordion__section").forEach((n) => {
    const s = n.dataset.section === i;
    n.classList.toggle("is-active", s);
  }), t.querySelectorAll(".csb-accordion__trigger").forEach((n) => {
    const s = n.dataset.section === i;
    n.classList.toggle("is-active", s), n.setAttribute("aria-expanded", s ? "true" : "false");
  }), t.querySelectorAll(".csb-accordion__panel").forEach((n) => {
    const s = n.closest(".csb-accordion__section"), r = (s == null ? void 0 : s.dataset.section) === i;
    n.classList.toggle("is-active", r);
  });
}, // Shared size bounds keep the V2 actor sheets visually consistent while still
// allowing each subclass to request a slightly different preferred size.
D(Ge, "MIN_WIDTH", 800), D(Ge, "MAX_WIDTH", 950), D(Ge, "MIN_HEIGHT", 600), D(Ge, "MAX_HEIGHT", 1400), // group -> sectionId|null
/** @override */
D(Ge, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Qt(Ge, Ge, "DEFAULT_OPTIONS"), {
  classes: ["sheet", "actor", T, "appv2", "mwd-sheet", "mwd-character-sheet"],
  position: { width: 760, height: 760 },
  window: { resizable: !0, minimizable: !0 },
  actions: {
    toggleViewMode: Ge.prototype._onToggleViewMode,
    tab: Ge.prototype._onClickTab,
    accordion: Ge.prototype._onClickAccordion,
    roll: Ge.prototype._onRollAction,
    monitorSet: Ge.prototype._onMonitorSet,
    editImage: Ge.prototype._onEditImage,
    createOwnedItem: Ge.prototype._onCreateOwnedItem,
    editOwnedItem: Ge.prototype._onEditOwnedItem,
    deleteOwnedItem: Ge.prototype._onDeleteOwnedItem,
    toggleOwnedItemEquipped: Ge.prototype._onToggleOwnedItemEquipped,
    setOwnedItemPrimary: Ge.prototype._onSetOwnedItemPrimary
  }
}, { inplace: !1 }));
let ln = Ge;
function Ub(a = {}) {
  switch (a.type) {
    case "stack":
      return "mwd.v2.ui.nodes.stack";
    case "hexabox":
      return "mwd.v2.ui.nodes.hexabox";
    case "panel":
      return "mwd.v2.ui.nodes.panel";
    case "include":
      return "mwd.v2.ui.nodes.include";
    case "tabs":
      return "mwd.v2.ui.nodes.tabs";
    case "accordion":
      return "mwd.v2.ui.nodes.accordion";
    default:
      return "mwd.v2.ui.nodes.unknown";
  }
}
function Hb(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(/\s+/).filter(Boolean) : [];
}
function Wn(a) {
  if (!a || typeof a != "object") return a;
  const e = {
    ...a,
    template: a.template ?? Ub(a),
    classes: Hb(a.classes),
    children: Array.isArray(a.children) ? a.children.map(Wn) : []
  };
  return a.type === "tabs" && (e.tabs = Array.isArray(a.tabs) ? a.tabs.map((t) => ({
    ...t,
    children: Array.isArray(t.children) ? t.children.map(Wn) : []
  })) : []), a.type === "accordion" && (e.sections = Array.isArray(a.sections) ? a.sections.map((t) => ({
    ...t,
    children: Array.isArray(t.children) ? t.children.map(Wn) : []
  })) : []), e;
}
function dc(a = {}) {
  return {
    ...a,
    root: Wn(a.root ?? { type: "stack", children: [] })
  };
}
var Ei, ms, Vd;
class aa {
  static async get(e) {
    if (H(this, Ei).has(e)) {
      const n = await H(this, Ei).get(e);
      if (Number((n == null ? void 0 : n.version) ?? 0) > 0) return n;
      H(this, Ei).delete(e);
    }
    const t = C(this, ms, Vd).call(this, e);
    H(this, Ei).set(e, t);
    const i = await t;
    return Number((i == null ? void 0 : i.version) ?? 0) <= 0 && H(this, Ei).delete(e), i;
  }
}
Ei = new WeakMap(), ms = new WeakSet(), Vd = async function(e) {
  const t = `systems/${T}/templates/v2/layouts/${e}.layout.json`;
  try {
    const i = await fetch(t);
    if (!i.ok) throw new Error(`HTTP ${i.status} for ${t}`);
    return dc(await i.json());
  } catch (i) {
    return console.error(`${Me}LayoutRegistry.get FAILED`, { layoutId: e, url: t, error: i }), dc({
      id: e,
      version: 0,
      root: { type: "stack", children: [] }
    });
  }
}, Ce(aa, ms), Ce(aa, Ei, /* @__PURE__ */ new Map());
function Yr(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Yd(a, e, t) {
  return Math.min(t, Math.max(e, a));
}
function mc(a = "") {
  return String(a ?? "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (e) => e.toUpperCase());
}
function jb(a = 0) {
  const e = Yd(Yr(a, 0), 0, 100);
  return e >= 91 ? "green" : e >= 71 ? "yellow" : e >= 51 ? "orange" : e >= 31 ? "red" : "dark-red";
}
function fc(a, e = {}) {
  const t = Math.max(0, Yr(e == null ? void 0 : e.max, 0)), i = Yd(Yr(e == null ? void 0 : e.value, 0), 0, t), n = Math.max(0, t - i), s = t > 0 ? n / t * 100 : 0;
  return {
    label: a,
    value: String(n),
    tone: jb(s),
    remaining: n,
    max: t,
    percent: s,
    title: `${n}/${t}`
  };
}
function Qd({ armor: a = {}, structure: e = {} } = {}) {
  const t = [
    fc("A", a),
    fc("S", e)
  ];
  return {
    parts: t,
    title: `Armor ${t[0].title}; Structure ${t[1].title}`
  };
}
function Wb(a = {}) {
  const e = String((a == null ? void 0 : a.label) ?? mc((a == null ? void 0 : a.key) ?? "Critical")).trim() || "Critical", t = String((a == null ? void 0 : a.locationLabel) ?? mc((a == null ? void 0 : a.locationKey) ?? "")).trim();
  return t ? `${e} (${t})` : e;
}
function Jd(a = []) {
  const e = Array.isArray(a) ? a.filter((i) => i && i.active !== !1) : [], t = e.length;
  return {
    value: t === 0 ? "CLEAR" : t === 1 ? "1 CRIT" : `${t} CRITS`,
    title: e.map(Wb).join("; "),
    count: t
  };
}
function $s(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Kb(a = {}) {
  var i, n, s, r;
  const e = Array.isArray((i = a == null ? void 0 : a.attack) == null ? void 0 : i.targets) ? a.attack.targets : [], t = bi(((n = a == null ? void 0 : a.attack) == null ? void 0 : n.areaEffect) ?? ((r = (s = a == null ? void 0 : a.attack) == null ? void 0 : s.payload) == null ? void 0 : r.areaEffect) ?? {});
  if (!e.length && t.kind !== Et.persistent)
    throw new Error("Attack requires at least one target.");
  return e;
}
async function Xd(a = {}) {
  if (!(a != null && a.actorUuid)) return null;
  try {
    return await fromUuid(a.actorUuid);
  } catch (e) {
    return console.warn("MWD | Unable to resolve attack target actor for CQ", a, e), null;
  }
}
function Gb(a = {}, e = null, t = "") {
  var i, n, s, r, o;
  return Math.max(0, $s(
    ((i = a == null ? void 0 : a.attributes) == null ? void 0 : i[t]) ?? ((n = e == null ? void 0 : e.getAttributeValue) == null ? void 0 : n.call(e, t)) ?? ((o = (r = (s = e == null ? void 0 : e.system) == null ? void 0 : s.attributes) == null ? void 0 : r[t]) == null ? void 0 : o.value),
    0
  ));
}
function qb(a = {}, e = null, t = "") {
  var i, n, s, r, o, l;
  return Math.max(0, $s(
    ((n = (i = a == null ? void 0 : a.skills) == null ? void 0 : i[t]) == null ? void 0 : n.rating) ?? ((s = e == null ? void 0 : e.getSkillRating) == null ? void 0 : s.call(e, t)) ?? ((l = (o = (r = e == null ? void 0 : e.system) == null ? void 0 : r.skills) == null ? void 0 : o[t]) == null ? void 0 : l.rating),
    0
  ));
}
function pc(a = []) {
  return a.reduce((e, t) => e + $s(t == null ? void 0 : t.value, 0), 0);
}
async function Vb({ attacker: a = null, ctx: e = {}, target: t = {} } = {}) {
  var z, Y, Q, G, q, L, U, V, Z, re, ye, ce, se, Ie, Ue, He, Ye, st, Qe, tt, Le, it;
  const i = await Xd(t), n = Math.max(0, Number(((G = (Y = (z = e == null ? void 0 : e.attack) == null ? void 0 : z.weapon) == null ? void 0 : Y.attackRatingBand) == null ? void 0 : G[(Q = e == null ? void 0 : e.attack) == null ? void 0 : Q.rangeBand]) ?? 0) || 0), s = Ls(i), r = s ? A.actorAttributes.handling : "reflexes", o = Gb(t, i, r), l = o + o, c = String(((L = (q = e == null ? void 0 : e.attack) == null ? void 0 : q.skill) == null ? void 0 : L.code) ?? ((V = (U = e == null ? void 0 : e.attack) == null ? void 0 : U.weapon) == null ? void 0 : V.skill) ?? "").trim(), u = String(((re = (Z = e == null ? void 0 : e.attack) == null ? void 0 : Z.skill) == null ? void 0 : re.label) ?? c ?? "Attack Skill").trim() || "Attack Skill", d = c ? Math.max(0, $s(((ye = a == null ? void 0 : a.getSkillRating) == null ? void 0 : ye.call(a, c)) ?? ((Ie = (se = (ce = a == null ? void 0 : a.system) == null ? void 0 : ce.skills) == null ? void 0 : se[c]) == null ? void 0 : Ie.rating), 0)) : 0, m = s ? "piloting" : "tactics", f = s ? "Piloting" : "Tactics", p = qb(t, i, m), h = d - p, g = Math.abs(h), y = Math.max(0, Number(((Ue = t == null ? void 0 : t.activeArmor) == null ? void 0 : Ue.defenseBonus) ?? 0) || 0), b = String(((He = e == null ? void 0 : e.attack) == null ? void 0 : He.rangeBand) ?? "").trim() || "range", w = [{
    id: "weapon.attackRating",
    label: `Weapon AR (${((st = (Ye = e == null ? void 0 : e.attack) == null ? void 0 : Ye.weapon) == null ? void 0 : st.type) === "personalWeapon" || (tt = (Qe = e == null ? void 0 : e.attack) == null ? void 0 : Qe.weapon) != null && tt.isSynthetic ? Ps(b) : b})`,
    value: n
  }], M = [{
    id: s ? "target.handlingDefense" : "target.reflexesDefense",
    label: s ? "Target Handling + Handling" : "Target REF + REF",
    value: l
  }];
  h > 0 ? w.push({
    id: "skill.attackVsTactics",
    label: `${u} over Tactics`,
    value: g
  }) : h < 0 && M.push({
    id: "target.tacticsAdvantage",
    label: `${f} over ${u}`,
    value: g
  }), (it = (Le = e == null ? void 0 : e.attack) == null ? void 0 : Le.aim) != null && it.eligible && w.push({
    id: "state.aim",
    label: `Aim (${u})`,
    value: d
  }), M.push({
    id: "target.armorDefense",
    label: "Armor Defense",
    value: y
  });
  const P = pc(w), E = pc(M);
  return {
    ar: {
      parts: w,
      total: P
    },
    dr: {
      parts: M,
      total: E
    },
    comparison: {
      attackSkillCode: c,
      attackSkillLabel: u,
      attackerSkill: d,
      defenderSkillCode: m,
      defenderSkillLabel: f,
      defenderSkill: p,
      delta: h,
      advantage: g,
      winner: h > 0 ? "attacker" : h < 0 ? "defender" : "none"
    },
    value: P - E
  };
}
function Yb(a = {}, e = {}) {
  var p, h, g, y, b, S, w, M;
  const t = (a == null ? void 0 : a.attack) ?? {}, i = String(((h = (p = t == null ? void 0 : t.payload) == null ? void 0 : p.modifies) == null ? void 0 : h.damageType) ?? "").trim(), n = Math.max(0, Number(((g = t == null ? void 0 : t.weapon) == null ? void 0 : g.damage) ?? 0) || 0), s = !!(a != null && a.targetIsMachine), r = i || ((y = t == null ? void 0 : t.weapon) == null ? void 0 : y.damageType), o = s ? String(r ?? "kinetic").trim() || "kinetic" : Vt(r, "concussive"), l = Math.max(0, Number((t == null ? void 0 : t.totalAp) ?? ((b = t == null ? void 0 : t.weapon) == null ? void 0 : b.ap) ?? 0) || 0), c = e.outcome === "graze" ? n / 2 : e.outcome === "hit" ? n : 0, u = c + Number(e.netHits ?? 0), d = vo((t == null ? void 0 : t.currentExposure) ?? Li({
    tier: ((S = t == null ? void 0 : t.currentExposure) == null ? void 0 : S.initialTier) ?? ((w = t == null ? void 0 : t.currentExposure) == null ? void 0 : w.tier) ?? "none"
  }), {
    active: !!(t != null && t.evadeActive),
    locked: !!(t != null && t.evadeLocked)
  }), m = bi((t == null ? void 0 : t.areaEffect) ?? ((M = t == null ? void 0 : t.payload) == null ? void 0 : M.areaEffect) ?? {}), f = m.kind === Et.persistent ? u : Qi(u, d.finalTier);
  return {
    baseDamage: n,
    effectiveWeaponDamage: c,
    netHits: Number(e.netHits ?? 0),
    incoming: u,
    scaledIncoming: f,
    ap: l,
    damageType: o,
    damageTypeLabel: s ? o : Yt(o),
    exposure: d,
    areaEffect: m
  };
}
function Qb(a = {}) {
  return String((a == null ? void 0 : a.tokenUuid) ?? (a == null ? void 0 : a.actorUuid) ?? (a == null ? void 0 : a.tokenId) ?? (a == null ? void 0 : a.actorId) ?? (a == null ? void 0 : a.name) ?? foundry.utils.randomID()).trim();
}
function hc(a, e) {
  var s, r;
  const t = ((r = (s = a == null ? void 0 : a.system) == null ? void 0 : s.monitors) == null ? void 0 : r[e]) ?? {}, i = Math.max(0, Number(t.max ?? 0) || 0), n = Math.min(i, Math.max(0, Number(t.value ?? 0) || 0));
  return Math.max(0, i - n);
}
function Jb({ attacker: a, ctx: e, damage: t, targetActor: i = null, hitLocation: n = null } = {}) {
  var s, r, o, l, c, u, d, m, f, p, h;
  return Ls(i) ? {
    mode: "machineAttackDamage",
    damage: (t == null ? void 0 : t.scaledIncoming) ?? 0,
    damageType: t == null ? void 0 : t.damageType,
    ap: (t == null ? void 0 : t.ap) ?? 0,
    hitLocation: n,
    chaosCriticalSelected: !1,
    source: `${(a == null ? void 0 : a.name) ?? "Attacker"}: ${((r = (s = e == null ? void 0 : e.attack) == null ? void 0 : s.weapon) == null ? void 0 : r.name) ?? "Attack"}`,
    sourceData: {
      attackerUuid: (a == null ? void 0 : a.uuid) ?? "",
      weaponName: ((l = (o = e == null ? void 0 : e.attack) == null ? void 0 : o.weapon) == null ? void 0 : l.name) ?? "Attack",
      weaponUuid: ((u = (c = e == null ? void 0 : e.attack) == null ? void 0 : c.weapon) == null ? void 0 : u.uuid) ?? ""
    },
    notes: ""
  } : {
    mode: "attackDamage",
    track: A.monitors.physical,
    damage: (t == null ? void 0 : t.scaledIncoming) ?? 0,
    netHits: 0,
    damageType: t == null ? void 0 : t.damageType,
    ap: (t == null ? void 0 : t.ap) ?? 0,
    effects: ((m = (d = e == null ? void 0 : e.attack) == null ? void 0 : d.weapon) == null ? void 0 : m.effects) ?? {},
    source: `${(a == null ? void 0 : a.name) ?? "Attacker"}: ${((p = (f = e == null ? void 0 : e.attack) == null ? void 0 : f.weapon) == null ? void 0 : p.name) ?? "Attack"}`,
    notes: (h = t == null ? void 0 : t.exposure) != null && h.initialTier ? `Exposure ${Bt(t.exposure.initialTier)}${t.exposure.evadeUsed ? ` -> ${Bt(t.exposure.finalTier)}` : ""}` : ""
  };
}
function ga(a, e = {}, t = {}, { queued: i = !1, applied: n = !1, skipped: s = !1, reason: r = "" } = {}) {
  return s ? {
    ok: !0,
    skipped: !0,
    queued: !1,
    applied: !1,
    reason: r || "Missed target."
  } : a != null && a.ok ? {
    ok: !0,
    queued: !!i,
    applied: !!n,
    preview: !!a.dryRun,
    actorName: a.actorName ?? (e == null ? void 0 : e.name) ?? "Target",
    sourceType: a.sourceType ?? null,
    mode: a.mode ?? "attackDamage",
    track: a.track ?? A.monitors.physical,
    requestedDelta: Number(a.requestedDelta ?? 0),
    appliedDelta: Number(a.appliedDelta ?? 0),
    usedArmor: !!a.usedArmor,
    damageType: a.damageType ?? (t == null ? void 0 : t.damageType) ?? "",
    effectiveAp: Number(a.effectiveAp ?? (t == null ? void 0 : t.ap) ?? 0),
    hitLocation: a.hitLocation ?? null,
    critical: a.critical ?? null,
    machine: a.machine ?? null,
    mitigation: a.mitigation ? {
      baseMitigation: Number(a.mitigation.baseMitigation ?? 0),
      typeMitigationMod: Number(a.mitigation.typeMitigationMod ?? 0),
      netResistance: Number(a.mitigation.netResistance ?? 0),
      armorBefore: Number(a.mitigation.armorBefore ?? 0),
      armorAfter: Number(a.mitigation.armorAfter ?? 0),
      reinforcedBefore: Number(a.mitigation.reinforcedBefore ?? 0),
      reinforcedAfter: Number(a.mitigation.reinforcedAfter ?? 0),
      reinforcedMax: Number(a.mitigation.reinforcedMax ?? 0)
    } : null,
    damageIncoming: Number(a.damageIncoming ?? 0),
    adjustedIncoming: Number(a.adjustedIncoming ?? 0),
    finalDamage: Number(a.finalDamage ?? 0),
    beforeLabel: String(a.beforeLabel ?? "").trim(),
    afterLabel: String(a.afterLabel ?? "").trim(),
    source: String(a.source ?? "").trim(),
    notes: String(a.notes ?? "").trim()
  } : {
    ok: !1,
    queued: !1,
    applied: !1,
    reason: (a == null ? void 0 : a.reason) ?? r ?? "Unable to preview attack damage."
  };
}
async function Xb({ attacker: a, ctx: e, target: t, outcome: i, damage: n } = {}) {
  var d;
  if ((i == null ? void 0 : i.outcome) === "miss")
    return ga(null, t, n, { skipped: !0, reason: "Missed target." });
  if (((d = n == null ? void 0 : n.areaEffect) == null ? void 0 : d.kind) === Et.persistent)
    return {
      ok: !0,
      queued: !0,
      applied: !1,
      preview: !0,
      actorName: (t == null ? void 0 : t.name) ?? "Target",
      mode: "hazardEntry",
      reason: ""
    };
  let s = null, r = null;
  try {
    s = t != null && t.tokenUuid ? await fromUuid(t.tokenUuid) : null, r = t != null && t.actorUuid ? await fromUuid(t.actorUuid) : null;
  } catch (m) {
    return console.warn("MWD | Unable to resolve target for queued attack damage", t, m), ga(null, t, n, { reason: "Unable to resolve attack target." });
  }
  const l = Ls(r) ? wd({
    actor: r,
    rollTotal: Td(),
    armorBefore: hc(r, A.monitors.armor),
    structureBefore: hc(r, A.monitors.structure)
  }) : null, c = Jb({ attacker: a, ctx: e, damage: n, targetActor: r, hitLocation: l }), u = await Pt.apply({
    actor: r,
    token: s,
    payload: c,
    options: {
      actorId: (r == null ? void 0 : r.id) ?? "",
      dryRun: !0,
      logToChat: !1
    }
  });
  if (u != null && u.ok) {
    const m = ga(u, t, n, { queued: !0, applied: !1 });
    return {
      ...m,
      queuedMutation: {
        id: foundry.utils.randomID(),
        type: "attackDamage",
        applied: !1,
        target: {
          name: (t == null ? void 0 : t.name) ?? "Target",
          actorUuid: (t == null ? void 0 : t.actorUuid) ?? null,
          tokenUuid: (t == null ? void 0 : t.tokenUuid) ?? null
        },
        payload: c,
        hitLocation: l,
        preview: m
      }
    };
  }
  return ga(u, t, n, { reason: "Unable to preview attack damage." });
}
async function Zb({ attacker: a, ctx: e, outcomeModel: t, target: i, previewState: n = {} } = {}) {
  var b, S;
  const s = await Vb({ attacker: a, ctx: e, target: i }), r = await Xd(i), o = Number((t == null ? void 0 : t.margin) ?? 0), l = Number(s.value ?? 0), c = o;
  let u = l > 0 ? o >= 1 ? "hit" : o === 0 ? "graze" : "miss" : l < 0 ? o >= 2 ? "hit" : o === 1 ? "graze" : "miss" : o >= 1 ? "hit" : "miss";
  String(((b = e == null ? void 0 : e.attack) == null ? void 0 : b.rangeBand) ?? "").trim().toLowerCase() === "outofrange" && u === "hit" && (u = "graze");
  const d = u === "hit" ? Math.max(0, c) : 0, m = (e == null ? void 0 : e.attack) ?? {}, f = Qb(i), p = (n == null ? void 0 : n[f]) ?? {}, h = (i == null ? void 0 : i.exposure) ?? Li({ tier: "none" }), g = Yb({
    ...e,
    targetIsMachine: Ls(r),
    attack: {
      ...m,
      currentExposure: h,
      areaEffect: (m == null ? void 0 : m.areaEffect) ?? ((S = m == null ? void 0 : m.payload) == null ? void 0 : S.areaEffect) ?? null,
      evadeActive: !!(p != null && p.evadeActive),
      evadeLocked: !!(h != null && h.evadeLocked)
    }
  }, { outcome: u, netHits: d }), y = await Xb({
    attacker: a,
    ctx: e,
    target: i,
    outcome: { outcome: u },
    damage: g
  });
  return {
    target: {
      name: (i == null ? void 0 : i.name) ?? "Target",
      actorUuid: (i == null ? void 0 : i.actorUuid) ?? null,
      tokenUuid: (i == null ? void 0 : i.tokenUuid) ?? null
    },
    previewKey: f,
    exposure: h,
    evadeActive: !!(p != null && p.evadeActive),
    evadeEdgePoolKey: String((p == null ? void 0 : p.edgePoolKey) ?? "").trim() || null,
    cq: s,
    margin: o,
    rawNetHits: c,
    netHits: d,
    outcome: u,
    damage: g,
    damageResult: y,
    queuedMutation: (y == null ? void 0 : y.queuedMutation) ?? null
  };
}
function eS(a = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of a)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
async function Zd({ attacker: a, ctx: e, outcomeModel: t, previewState: i = {}, existingAttackResult: n = null } = {}) {
  var c, u, d, m, f, p;
  const s = Kb(e), r = [];
  for (const h of s)
    r.push(await Zb({ attacker: a, ctx: e, outcomeModel: t, target: h, previewState: i }));
  const o = bi(((c = e == null ? void 0 : e.attack) == null ? void 0 : c.areaEffect) ?? ((d = (u = e == null ? void 0 : e.attack) == null ? void 0 : u.payload) == null ? void 0 : d.areaEffect) ?? {});
  let l = String((n == null ? void 0 : n.persistentRegionUuid) ?? "").trim() || null;
  if (o.kind === Et.persistent && !l) {
    const h = await lh({
      attacker: a,
      attack: (e == null ? void 0 : e.attack) ?? {},
      targetResult: r[0] ?? null
    });
    l = (h == null ? void 0 : h.uuid) ?? null;
  }
  return {
    targetCount: s.length,
    results: r,
    summary: eS(r),
    areaEffect: o,
    templateGeometry: si(ze(
      (m = e == null ? void 0 : e.attack) == null ? void 0 : m.templateGeometry,
      {
        template: (f = e == null ? void 0 : e.attack) == null ? void 0 : f.template,
        placement: (p = e == null ? void 0 : e.attack) == null ? void 0 : p.templatePlacement
      }
    )),
    persistentRegionUuid: l
  };
}
function Fe(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
function lr(a, e = 0, t = Number.POSITIVE_INFINITY) {
  const i = Fe(a, e);
  return Math.max(e, Math.min(t, i));
}
function em(a, e = 1) {
  var i;
  const t = Fe((i = a == null ? void 0 : a.difficulty) == null ? void 0 : i.dn, Fe(e, 1));
  return Math.max(0, t);
}
function tS(a, e) {
  return Math.max(0, Fe(a, 0) - Fe(e, 0));
}
function iS({ convert: a, remainder: e, rate: t = 4 } = {}) {
  const i = Math.max(0, Fe(e, 0)), n = Math.max(1, Fe(t, 4)), s = Math.max(0, Fe(a, 0)), r = Math.floor(s / n) * n;
  return Math.min(i, r);
}
function Qo(a, { rate: e = 4, maxPerRoll: t = Number.POSITIVE_INFINITY } = {}) {
  const i = Math.max(1, Fe(e, 4)), n = Math.floor(Math.max(0, Fe(a, 0)) / i), s = Number.isFinite(t) ? Math.max(0, Fe(t, 0)) : Number.POSITIVE_INFINITY;
  return { amount: Math.min(n, s), rate: i };
}
function Jo(a) {
  var i;
  const e = ((i = a == null ? void 0 : a.edge) == null ? void 0 : i.earn) ?? {};
  return {
    enabled: !!(e != null && e.enabled),
    rate: Math.max(1, Fe(e == null ? void 0 : e.rate, 4)),
    maxPerRoll: (e == null ? void 0 : e.maxPerRoll) ?? Number.POSITIVE_INFINITY
  };
}
function os(a) {
  var t;
  const e = (t = a == null ? void 0 : a.edge) == null ? void 0 : t.pool;
  return e ? String(e) : null;
}
function aS(a) {
  let e = 0, t = 0;
  const i = (n) => {
    if (!n) return;
    const s = n == null ? void 0 : n.results;
    if (Array.isArray(s))
      for (const o of s) {
        if ((o == null ? void 0 : o.active) === !1) continue;
        const l = Number(o == null ? void 0 : o.result);
        Number.isFinite(l) && (e += 1, l === 1 && (t += 1));
      }
    const r = n == null ? void 0 : n.terms;
    if (Array.isArray(r))
      for (const o of r) i(o);
    if (Array.isArray(n))
      for (const o of n) i(o);
  };
  return i(a), { dice: e, ones: t };
}
function tm(a, e) {
  if (Fe(a, 0) !== 0) return !1;
  const { dice: t, ones: i } = aS(e);
  return t <= 0 ? !1 : i >= Math.ceil(t / 2);
}
function nS(a, e, t = 4) {
  return !!(a && Fe(e, 0) >= Fe(t, 4));
}
function gc(a, e) {
  const t = Fe(e == null ? void 0 : e.successes, 0), i = em(a, 1), n = t >= i, s = t - i, r = nS(n, s, 4), o = tm(t, e == null ? void 0 : e.raw), l = Jo(a), c = l.maxPerRoll ?? 1, u = l.enabled && s >= l.rate ? (() => {
    const { amount: m, rate: f } = Qo(s, { rate: l.rate, maxPerRoll: c }), p = os(a);
    return m > 0 ? { amount: m, pool: p, reason: "net4", details: { margin: s, rate: f } } : null;
  })() : null;
  return {
    rollType: "simple",
    passed: n,
    successes: t,
    difficulty: { dn: i },
    margin: s,
    criticalSuccess: r,
    criticalFailure: o,
    tier: r ? "criticalSuccess" : o ? "criticalFailure" : n ? "success" : "failure",
    edgeEarned: u
  };
}
function sS(a, e, t) {
  var m, f;
  const i = Fe(e == null ? void 0 : e.successes, 0), n = Fe(t == null ? void 0 : t.successes, 0), s = !!((m = a == null ? void 0 : a.opposed) != null && m.net), r = String(((f = a == null ? void 0 : a.opposed) == null ? void 0 : f.dnTies) ?? "stalemate");
  let o = null, l = !1;
  s ? (o = i - n, o > 0 ? l = !0 : o < 0 ? l = !1 : r === "attackerWins" ? l = !0 : l = !1) : i > n ? l = !0 : i < n ? l = !1 : r === "attackerWins" ? l = !0 : l = !1;
  const c = Jo(a), u = c.maxPerRoll ?? 1, d = c.enabled && s && typeof o == "number" && o >= c.rate ? (() => {
    const { amount: p, rate: h } = Qo(o, { rate: c.rate, maxPerRoll: u }), g = os(a);
    return p > 0 ? { amount: p, pool: g, reason: "net4", details: { netHits: o, rate: h } } : null;
  })() : null;
  return {
    rollType: "opposed",
    passed: l,
    successes: i,
    opposed: {
      attacker: i,
      defender: n,
      netEnabled: s,
      netHits: s ? o : void 0,
      tiePolicy: r
    },
    edgeEarned: d
  };
}
function rS(a, e) {
  var h, g, y;
  const t = Fe(e == null ? void 0 : e.successes, 0), i = em(a, 1), n = t >= i, s = tm(t, e == null ? void 0 : e.raw), r = tS(t, i), o = ((h = a == null ? void 0 : a.net) == null ? void 0 : h.convert) ?? ((g = a == null ? void 0 : a.allocation) == null ? void 0 : g.convert) ?? 0, l = Jo(a), c = l.rate, u = iS({ convert: o, remainder: r, rate: c }), d = r - u, m = l.enabled && u >= c ? (() => {
    const { amount: b } = Qo(u, { rate: c, maxPerRoll: l.maxPerRoll }), S = os(a);
    return b > 0 ? { amount: b, pool: S, reason: "convert4", details: { converted: u, rate: c } } : null;
  })() : null, f = s ? { amount: 1, pool: os(a), reason: "critFail", details: { onesRule: "halfOrMoreOnes" } } : null, p = [];
  return m && p.push(m), f && p.push(f), p.length === 0 || (p.length === 1 ? p[0] : (p.reduce((b, S) => b + (Number(S == null ? void 0 : S.amount) || 0), 0), (y = p[0]) == null || y.pool)), {
    rollType: "net",
    passed: n,
    successes: t,
    difficulty: { dn: i },
    criticalFailure: s,
    tier: s ? "criticalFailure" : n ? "success" : "failure",
    net: {
      remainder: r,
      convertRequested: Fe(o, 0),
      converted: u,
      value: d,
      // the actual net effect magnitude you apply (+net dice, etc.)
      rate: c,
      canConvert: r >= c
    },
    edgeEarned: m
  };
}
function oS(a, e) {
  var o, l, c, u;
  const t = Fe(e == null ? void 0 : e.successes, 0), i = lr((o = a == null ? void 0 : a.extended) == null ? void 0 : o.target, 1, 1e4), n = lr((l = a == null ? void 0 : a.extended) == null ? void 0 : l.accumulated, 0, 1e4), s = lr(n + t, 0, 1e4), r = s >= i;
  return {
    rollType: "extended",
    passed: r,
    successes: t,
    extended: {
      target: i,
      accumulated: n,
      nextAccumulated: s,
      remaining: Math.max(0, i - s),
      completed: r,
      interval: ((c = a == null ? void 0 : a.extended) == null ? void 0 : c.interval) ?? null,
      failureLimit: ((u = a == null ? void 0 : a.extended) == null ? void 0 : u.failureLimit) ?? null
    },
    // NOTE: Edge earn rules for extended are intentionally omitted per your earlier constraint.
    edgeEarned: null
  };
}
function im(a, e, t = null) {
  var n;
  switch (String((a == null ? void 0 : a.rollType) ?? "simple")) {
    case "simple":
      return gc(a, e);
    case "opposed":
      return sS(a, e, t);
    case "net":
      return rS(a, e);
    case "extended":
      return oS(a, e);
    default: {
      const s = {
        ...a,
        difficulty: { dn: Number(((n = a == null ? void 0 : a.difficulty) == null ? void 0 : n.dn) ?? 1) || 1 }
      };
      return gc(s, e);
    }
  }
}
function lS(a, e) {
  var c, u, d, m, f, p, h, g, y;
  const t = a ?? {}, i = Array.isArray((c = t == null ? void 0 : t.modifiers) == null ? void 0 : c.applied) ? t.modifiers.applied : [], n = Number(((u = t == null ? void 0 : t.modifiers) == null ? void 0 : u.total) ?? 0);
  if (i.length) {
    const b = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((S) => S.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${i.map((S) => `${S.label} ${yc(S.value)}`).join(", ")} (Total ${yc(n)})`,
      title: (b == null ? void 0 : b.tooltip) ?? ""
    });
  }
  const s = (t == null ? void 0 : t.edge) ?? null, r = Array.isArray((d = t == null ? void 0 : t.roll) == null ? void 0 : d.failureDiceRefs) ? t.roll.failureDiceRefs : [], o = !!((m = s == null ? void 0 : s.availableActions) != null && m.canPostRerollFailures), l = Array.isArray((f = s == null ? void 0 : s.allowed) == null ? void 0 : f.postPools) ? s.allowed.postPools : [];
  if (s != null && s.domain && (e.edge = {
    domain: s.domain,
    earned: ((p = t == null ? void 0 : t.outcomeModel) == null ? void 0 : p.edgeEarned) ?? null,
    preSpent: Number(((h = s == null ? void 0 : s.pre) == null ? void 0 : h.spent) ?? 0),
    postSpent: Number(((g = s == null ? void 0 : s.post) == null ? void 0 : g.spent) ?? 0),
    canPost: o && r.length > 0 && l.length > 0,
    failureCount: r.length,
    postPools: l
  }, e.metaRows.push({
    text: `Edge: ${s.domain} • pre ${e.edge.preSpent} • post ${e.edge.postSpent}`,
    title: ""
  })), (y = e.edge) != null && y.canPost) {
    e.footerRows.push({
      text: `Post-spend: Reroll ${e.edge.failureCount} failure${e.edge.failureCount === 1 ? "" : "s"}`
    });
    for (const b of e.edge.postPools)
      e.actions.push({
        action: "edgePostReroll",
        label: `Spend ${b}`,
        dataset: { "pool-key": b },
        cssClass: "mwd-edge-post"
      });
  }
}
function yc(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function cS(a, e) {
  var g, y, b, S, w, M, P, E, z, Y, Q, G, q, L, U, V, Z, re, ye, ce, se, Ie, Ue, He, Ye, st, Qe, tt, Le, it, yt, bt, St, Dt;
  const t = a ?? {}, i = (t == null ? void 0 : t.attackResult) ?? null;
  if (!i) return;
  const n = Array.isArray(i == null ? void 0 : i.results) ? i.results : [], s = (i == null ? void 0 : i.summary) ?? dS(n), r = n.some((N) => {
    var F;
    return !!((F = N == null ? void 0 : N.queuedMutation) != null && F.applied);
  }), o = n.filter(
    (N) => (N == null ? void 0 : N.queuedMutation) && !N.queuedMutation.applied
  ), l = !!((y = (g = t == null ? void 0 : t.attack) == null ? void 0 : g.capabilityReport) != null && y.isTemplated), c = Array.isArray((b = t == null ? void 0 : t.modifiers) == null ? void 0 : b.applied) ? t.modifiers.applied : [], u = Number(((S = t == null ? void 0 : t.modifiers) == null ? void 0 : S.total) ?? 0);
  if (c.length) {
    const N = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((F) => F.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${c.map((F) => `${F.label} ${ya(F.value)}`).join(", ")} (Total ${ya(u)})`,
      title: (N == null ? void 0 : N.tooltip) ?? ""
    });
  }
  const d = (t == null ? void 0 : t.edge) ?? null, m = Array.isArray((w = t == null ? void 0 : t.roll) == null ? void 0 : w.failureDiceRefs) ? t.roll.failureDiceRefs : [], f = !!((M = d == null ? void 0 : d.availableActions) != null && M.canPostRerollFailures) && !r, p = Array.isArray((P = d == null ? void 0 : d.allowed) == null ? void 0 : P.postPools) ? d.allowed.postPools : [];
  if (d != null && d.domain && (e.edge = {
    domain: d.domain,
    earned: ((E = t == null ? void 0 : t.outcomeModel) == null ? void 0 : E.edgeEarned) ?? null,
    preSpent: Number(((z = d == null ? void 0 : d.pre) == null ? void 0 : z.spent) ?? 0),
    postSpent: Number(((Y = d == null ? void 0 : d.post) == null ? void 0 : Y.spent) ?? 0),
    canPost: f && m.length > 0 && p.length > 0,
    failureCount: m.length,
    postPools: p
  }, e.metaRows.push({
    text: `Edge: ${d.domain} | pre ${e.edge.preSpent} | post ${e.edge.postSpent}`,
    title: ""
  })), (Q = e.edge) != null && Q.canPost) {
    e.footerRows.push({
      text: `Post-spend: Reroll ${e.edge.failureCount} failure${e.edge.failureCount === 1 ? "" : "s"}`
    });
    for (const N of e.edge.postPools)
      e.actions.push({
        action: "edgePostReroll",
        label: `Spend ${N}`,
        dataset: { "pool-key": N },
        cssClass: "mwd-edge-post"
      });
  }
  const h = String((s == null ? void 0 : s.overallOutcome) ?? "").trim();
  if (e.outcomeText = n.length > 1 ? `ATTACK ${s.hits} HIT / ${s.grazes} GRAZE / ${s.misses} MISS` : h === "hit" ? "HIT!" : h === "graze" ? "GRAZE!" : "MISS!", e.metaRows.push({
    text: `Targets: ${n.length || 0}`,
    title: ""
  }), l && (e.targetRows = n.map((N, F) => {
    var je, at, ut, Rt, ee, Te, rt, ot;
    const Ae = ((je = t == null ? void 0 : t.areaEffectPreviewState) == null ? void 0 : je[N == null ? void 0 : N.previewKey]) ?? {}, ie = ((at = N == null ? void 0 : N.damage) == null ? void 0 : at.exposure) ?? (N == null ? void 0 : N.exposure) ?? null, Re = String((ie == null ? void 0 : ie.initialLabel) ?? "NONE").trim() || "NONE", At = String((ie == null ? void 0 : ie.finalLabel) ?? Re).trim() || Re, v = Number(((ut = N == null ? void 0 : N.damage) == null ? void 0 : ut.incoming) ?? 0), R = Number(((Rt = N == null ? void 0 : N.damage) == null ? void 0 : Rt.scaledIncoming) ?? v), K = (N == null ? void 0 : N.queuedMutation) ?? null, be = !!(K != null && K.applied || (ee = N == null ? void 0 : N.damageResult) != null && ee.applied), ue = (Ae == null ? void 0 : Ae.reactionPreview) ?? null, Ee = [];
    if (!be && Re !== "NONE" && ((Te = N == null ? void 0 : N.damageResult) != null && Te.ok) && !((rt = N == null ? void 0 : N.damageResult) != null && rt.skipped) && Ee.push({
      action: "toggleEvade",
      label: N != null && N.evadeActive ? "Clear Evade" : "Use Reaction",
      dataset: { "preview-key": N.previewKey },
      cssClass: `mwd-target-row__action ${N != null && N.evadeActive ? "is-active" : ""}`
    }), N != null && N.evadeActive && (ue != null && ue.canSpendEdge) && Array.isArray(ue.edgePools))
      for (const Je of ue.edgePools)
        Ee.push({
          action: "toggleEvadeEdge",
          label: (Ae == null ? void 0 : Ae.edgePoolKey) === Je.key ? `Edge: ${Je.key}` : `Use ${Je.key}`,
          dataset: {
            "preview-key": N.previewKey,
            "pool-key": Je.key
          },
          cssClass: `mwd-target-row__action ${(Ae == null ? void 0 : Ae.edgePoolKey) === Je.key ? "is-active" : ""}`
        });
    return K && !be && Ee.push({
      action: "applyAttackDamage",
      label: "Apply Damage",
      dataset: { "result-index": String(F) },
      cssClass: "mwd-target-row__action mwd-apply-attack-damage"
    }), {
      targetName: ((ot = N == null ? void 0 : N.target) == null ? void 0 : ot.name) ?? "Target",
      applied: be,
      outcomeLabel: String((N == null ? void 0 : N.outcome) ?? "miss").toUpperCase(),
      exposureLabel: Re === At ? Re : `${Re} -> ${At}`,
      damageLabel: v === R ? String(R) : `${v} -> ${R}`,
      reactionHint: N != null && N.evadeActive ? Ae != null && Ae.edgePoolKey ? "Evade active. Reaction Burn canceled by Edge." : (ue == null ? void 0 : ue.burnDelta) > 0 ? `Evade active. This reaction adds +${ue.burnDelta} Burn.` : "Evade active." : "",
      rowActions: Ee
    };
  })), n.length > 1 && o.length > 1 && e.actions.push({
    action: "applyAllAttackDamage",
    label: `Apply All Damage (${o.length})`,
    cssClass: "mwd-apply-all-attack-damage"
  }), !l)
    for (const N of n) {
      const F = Number(((q = (G = N == null ? void 0 : N.cq) == null ? void 0 : G.ar) == null ? void 0 : q.total) ?? 0), Ae = Number(((U = (L = N == null ? void 0 : N.cq) == null ? void 0 : L.dr) == null ? void 0 : U.total) ?? 0);
      e.metaRows.push({
        text: `${((V = N == null ? void 0 : N.target) == null ? void 0 : V.name) ?? "Target"}: ${String((N == null ? void 0 : N.outcome) ?? "miss").toUpperCase()} | CQ ${ya(((Z = N == null ? void 0 : N.cq) == null ? void 0 : Z.value) ?? 0)} (AR ${F} - DR ${Ae}) | Net ${Number((N == null ? void 0 : N.netHits) ?? 0)}`,
        title: uS(N == null ? void 0 : N.cq)
      });
    }
  if (!l)
    for (const [N, F] of n.entries()) {
      const Ae = (F == null ? void 0 : F.damage) ?? null;
      Ae && (F == null ? void 0 : F.outcome) !== "miss" && e.footerRows.push({
        text: `${((re = F == null ? void 0 : F.target) == null ? void 0 : re.name) ?? "Target"}: ${Ae.damageTypeLabel} ${ya(Ae.effectiveWeaponDamage)} weapon${Ae.netHits ? ` + ${Ae.netHits} net` : ""}`,
        title: ""
      });
      const ie = (F == null ? void 0 : F.damageResult) ?? null;
      if (ie != null && ie.ok && !(ie != null && ie.skipped)) {
        const Re = (F == null ? void 0 : F.queuedMutation) ?? (ie == null ? void 0 : ie.queuedMutation) ?? null, At = !!(Re != null && Re.applied || ie != null && ie.applied);
        if (ie.mode === "machineAttackDamage") {
          const v = ie.machine ?? {}, R = ie.hitLocation ?? {};
          e.footerRows.push({
            text: `${((ye = F == null ? void 0 : F.target) == null ? void 0 : ye.name) ?? "Target"}: Location ${R.locationLabel ?? "Location"}${R.rollTotal ? ` (${R.rollTotal})` : ""} | Armor ${Number(v.armorBefore ?? 0)} -> ${Number(v.armorAfter ?? 0)} | Structure ${Number(v.structureBefore ?? 0)} -> ${Number(v.structureAfter ?? 0)}`,
            title: ""
          }), (ce = ie.critical) != null && ce.automatic ? e.footerRows.push({
            text: `${((se = F == null ? void 0 : F.target) == null ? void 0 : se.name) ?? "Target"}: Automatic critical pending`,
            title: ""
          }) : (Ie = ie.critical) != null && Ie.optional ? e.footerRows.push({
            text: `${((Ue = F == null ? void 0 : F.target) == null ? void 0 : Ue.name) ?? "Target"}: Chaos Edge can convert this location hit to a critical`,
            title: ""
          }) : e.footerRows.push({
            text: `${((He = F == null ? void 0 : F.target) == null ? void 0 : He.name) ?? "Target"}: Location hit is descriptive only`,
            title: ""
          });
          for (const K of ((Ye = ie.critical) == null ? void 0 : Ye.records) ?? [])
            e.footerRows.push({
              text: `${((st = F == null ? void 0 : F.target) == null ? void 0 : st.name) ?? "Target"}: Critical - ${K.label}${K.locationLabel ? ` (${K.locationLabel})` : ""}`,
              title: ""
            }), K.active !== !1 && K.remedyKey !== "none" && e.actions.push({
              action: "machineCritRemedy",
              label: `Remedy: ${K.label}`,
              dataset: {
                "machine-actor-uuid": ((Qe = F == null ? void 0 : F.target) == null ? void 0 : Qe.actorUuid) ?? "",
                "crit-id": K.id,
                "remedy-key": K.remedyKey,
                "gm-override": "true"
              },
              cssClass: "mwd-machine-crit-remedy"
            });
        }
        Re && !At && ((tt = ie == null ? void 0 : ie.critical) != null && tt.optional) && e.actions.push({
          action: "toggleMachineChaosCrit",
          label: (Le = Re.payload) != null && Le.chaosCriticalSelected ? `Clear Chaos Critical: ${ie.actorName ?? ((it = F == null ? void 0 : F.target) == null ? void 0 : it.name) ?? "Target"}` : `Spend Chaos Edge: ${ie.actorName ?? ((yt = F == null ? void 0 : F.target) == null ? void 0 : yt.name) ?? "Target"}`,
          dataset: { "result-index": String(N) },
          cssClass: `mwd-toggle-machine-chaos ${(bt = Re.payload) != null && bt.chaosCriticalSelected ? "is-active" : ""}`
        }), Re && !At && e.actions.push({
          action: "applyAttackDamage",
          label: `Apply Damage: ${ie.actorName ?? ((St = F == null ? void 0 : F.target) == null ? void 0 : St.name) ?? "Target"}`,
          dataset: { "result-index": String(N) },
          cssClass: "mwd-apply-attack-damage"
        });
      } else ie != null && ie.reason && e.footerRows.push({
        text: `${((Dt = F == null ? void 0 : F.target) == null ? void 0 : Dt.name) ?? "Target"}: ${ie.reason}`,
        title: ""
      });
    }
}
function uS(a = {}) {
  var i, n;
  const e = Array.isArray((i = a == null ? void 0 : a.ar) == null ? void 0 : i.parts) ? a.ar.parts : [], t = Array.isArray((n = a == null ? void 0 : a.dr) == null ? void 0 : n.parts) ? a.dr.parts : [];
  return [
    ...e.map((s) => `AR - ${s.label}: ${ya(s.value)}`),
    ...t.map((s) => `DR - ${s.label}: ${ya(s.value)}`)
  ].join(`
`);
}
function dS(a = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of a)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
function ya(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function mS(a, e) {
  var c;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, n = (i == null ? void 0 : i.net) ?? null;
  if (!n) return;
  e.net = n;
  const s = Number((n == null ? void 0 : n.converted) ?? 0), r = Number((n == null ? void 0 : n.value) ?? 0), o = Number((n == null ? void 0 : n.rate) ?? 4);
  e.metaRows.push({
    text: `Net: ${r} • Converted: ${s} • Rate: ${o}`,
    title: ""
  });
  const l = ((c = i == null ? void 0 : i.edgeEarned) == null ? void 0 : c.amount) > 0 ? i.edgeEarned : null;
  l && e.footerRows.push({
    text: `Edge Earned: +${l.amount}${l.pool ? ` (${l.pool})` : ""}`,
    title: l.reason ?? ""
  });
}
function fS(a, e) {
  var l, c, u, d;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, n = Number(((l = i == null ? void 0 : i.attacker) == null ? void 0 : l.successes) ?? (i == null ? void 0 : i.attackerHits) ?? NaN), s = Number(((c = i == null ? void 0 : i.defender) == null ? void 0 : c.successes) ?? (i == null ? void 0 : i.defenderHits) ?? NaN), r = Number((i == null ? void 0 : i.netHits) ?? (i == null ? void 0 : i.net) ?? NaN);
  Number.isFinite(n) && Number.isFinite(s) && e.metaRows.push({ text: `Opposed: Att ${n} vs Def ${s} • Net ${Number.isFinite(r) ? r : n - s}` }), (u = t == null ? void 0 : t.incoming) != null && u.label && (e.incoming = { label: t.incoming.label, value: t.incoming.value ?? "" }, e.footerRows.push({ text: `Incoming: ${e.incoming.label} ${e.incoming.value}` }));
  const o = ((d = i == null ? void 0 : i.edgeEarned) == null ? void 0 : d.amount) > 0 ? i.edgeEarned : null;
  o && e.footerRows.push({ text: `Edge Earned: +${o.amount}${o.pool ? ` (${o.pool})` : ""}` });
}
function pS(a, e) {
  var c;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, n = (i == null ? void 0 : i.extended) ?? null;
  if (!n) return;
  e.extended = n;
  const s = Number((n == null ? void 0 : n.progress) ?? 0), r = Number((n == null ? void 0 : n.target) ?? 0), o = Number((n == null ? void 0 : n.remaining) ?? Math.max(0, r - s));
  e.metaRows.push({
    text: `Extended: ${s}/${r} (Remaining ${o})`,
    title: ""
  }), n != null && n.completed && e.footerRows.push({ text: `Completed in ${Number((n == null ? void 0 : n.rounds) ?? (n == null ? void 0 : n.attempts) ?? 0) || "?"} attempts.` });
  const l = ((c = i == null ? void 0 : i.edgeEarned) == null ? void 0 : c.amount) > 0 ? i.edgeEarned : null;
  l && e.footerRows.push({ text: `Edge Earned: +${l.amount}${l.pool ? ` (${l.pool})` : ""}` });
}
const hS = {
  skill: lS,
  attack: cS,
  net: mS,
  opposed: fS,
  extended: pS
  // defense: enhanceDefense,
  // edge: enhanceEdge,
};
async function xa({ resolved: a } = {}) {
  const e = a ?? {}, t = gS(e), i = hS[t.intent];
  return typeof i == "function" && i(e, t), await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-roll-card",
    t
  );
}
function gS(a) {
  var f, p, h, g, y, b, S, w, M, P, E, z, Y, Q, G, q, L;
  const e = a ?? {}, t = Number(((f = e == null ? void 0 : e.roll) == null ? void 0 : f.target) ?? 5), i = Number(((p = e == null ? void 0 : e.dn) == null ? void 0 : p.total) ?? ((g = (h = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : h.dn) == null ? void 0 : g.total) ?? ((b = (y = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : y.difficulty) == null ? void 0 : b.dn) ?? 0), n = Number(((S = e == null ? void 0 : e.roll) == null ? void 0 : S.pool) ?? 0), s = Number(((w = e == null ? void 0 : e.outcome) == null ? void 0 : w.hits) ?? 0), r = (e == null ? void 0 : e.outcomeModel) ?? {}, o = typeof r.passed == "boolean" ? r.passed : s >= i, l = Number.isFinite(Number(r.margin)) ? Number(r.margin) : s - i, c = r.tier ?? null, u = Array.isArray(e == null ? void 0 : e.breakdownRows) ? e.breakdownRows.map((U) => `${U.label}: ${U.value}`).join(`
`) : "", d = {
    header: { left: (e == null ? void 0 : e.title) ?? "Roll", right: (e == null ? void 0 : e.subtitle) ?? "" },
    formula: String((e == null ? void 0 : e.formula) ?? "").trim(),
    intent: (e == null ? void 0 : e.intent) ?? "unknown",
    domains: Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [],
    tn: t,
    dn: i,
    pool: n,
    hits: s,
    passed: o,
    margin: l,
    tier: c,
    breakdownTooltip: u,
    metaRows: [],
    targetRows: [],
    actions: [],
    footerRows: [],
    incoming: null,
    edge: null,
    net: null,
    opposed: null,
    extended: null
  }, m = (e == null ? void 0 : e.attack) ?? null;
  if ((M = e == null ? void 0 : e.specialization) != null && M.label && d.metaRows.push({
    text: `Specialization: ${e.specialization.label} (+${Number(e.specialization.value ?? 0)})`,
    title: ""
  }), (P = m == null ? void 0 : m.weapon) != null && P.name) {
    const U = ((E = m == null ? void 0 : m.weapon) == null ? void 0 : E.type) === "personalWeapon" || (z = m == null ? void 0 : m.weapon) != null && z.isSynthetic ? Ps((m == null ? void 0 : m.rangeBand) ?? "") : String((m == null ? void 0 : m.rangeBand) ?? "").trim(), V = String(((Y = m == null ? void 0 : m.weapon) == null ? void 0 : Y.damageTypeLabel) ?? ((Q = m == null ? void 0 : m.weapon) == null ? void 0 : Q.damageType) ?? "").trim(), Z = String(((G = m == null ? void 0 : m.payload) == null ? void 0 : G.label) ?? ((q = m == null ? void 0 : m.weapon) == null ? void 0 : q.payloadLabel) ?? "").trim();
    d.metaRows.push({
      text: `Weapon: ${m.weapon.name}${U ? ` • Range: ${U}` : ""}${V ? ` • Type: ${V}` : ""}${Z ? ` • Payload: ${Z}` : ""}`,
      title: ""
    }), (L = m == null ? void 0 : m.sourceState) != null && L.isTracked && d.footerRows.push({
      text: `Source: ${Number(m.sourceState.current ?? 0)}/${Number(m.sourceState.max ?? 0)}`,
      title: ""
    });
  }
  return d;
}
async function bc(a = "") {
  const e = String(a ?? "").trim();
  if (!e || typeof fromUuid != "function") return null;
  try {
    return await fromUuid(e);
  } catch {
    return null;
  }
}
async function am({
  machineActor: a = null,
  operatorActorUuid: e = ""
} = {}) {
  var r, o, l, c, u, d, m, f, p, h, g, y, b;
  const t = await bc(e);
  if (t)
    return { actor: t, uuid: t.uuid ?? e, source: "explicit", reason: "" };
  const i = String(
    ((o = (r = a == null ? void 0 : a.system) == null ? void 0 : r.pilot) == null ? void 0 : o.uuid) ?? ((u = (c = (l = a == null ? void 0 : a.system) == null ? void 0 : l.mwd) == null ? void 0 : c.pilot) == null ? void 0 : u.uuid) ?? ((f = (m = (d = a == null ? void 0 : a.system) == null ? void 0 : d.mwd) == null ? void 0 : m.crew) == null ? void 0 : f.operatorActorUuid) ?? ((g = (h = (p = a == null ? void 0 : a.system) == null ? void 0 : p.mwd) == null ? void 0 : h.crew) == null ? void 0 : g.pilotActorUuid) ?? ""
  ).trim(), n = await bc(i);
  if (n)
    return { actor: n, uuid: n.uuid ?? i, source: "pilot", reason: "" };
  const s = ((b = (y = a == null ? void 0 : a.system) == null ? void 0 : y.mwd) == null ? void 0 : b.crew) ?? {};
  return Number((s == null ? void 0 : s.effectiveCount) ?? (s == null ? void 0 : s.count) ?? 0) > 0 ? {
    actor: null,
    uuid: "",
    source: "crew",
    reason: "Crew exists, but no operator actor is linked."
  } : {
    actor: null,
    uuid: "",
    source: "",
    reason: "No linked operator or pilot actor."
  };
}
async function yS(a = "") {
  const e = String(a ?? "").trim();
  if (!e || typeof fromUuid != "function") return null;
  try {
    return await fromUuid(e);
  } catch {
    return null;
  }
}
function bS(a) {
  var e, t;
  return Array.isArray((t = (e = a == null ? void 0 : a.system) == null ? void 0 : e.mwd) == null ? void 0 : t.crits) ? a.system.mwd.crits.filter((i) => (i == null ? void 0 : i.active) !== !1) : [];
}
async function SS(a) {
  if (!(bS(a).length || !(a != null && a.toggleStatusEffect)))
    try {
      await Ms({
        actor: a,
        statusId: kd,
        active: !1
      });
    } catch (e) {
      console.warn("MWD | Unable to clear machine critical status", e);
    }
}
async function nm(a = {}, e = {}) {
  var d, m, f, p, h;
  if (String((a == null ? void 0 : a.intent) ?? "") !== "machine_crit_remedy")
    return { ok: !1, reason: "Unsupported machine intent." };
  const t = await yS(a.machineActorUuid);
  if (!t) return { ok: !1, reason: "Machine actor could not be resolved." };
  const i = String(a.critId ?? "").trim(), n = Array.isArray((m = (d = t.system) == null ? void 0 : d.mwd) == null ? void 0 : m.crits) ? t.system.mwd.crits.slice() : [], s = n.findIndex((g) => String((g == null ? void 0 : g.id) ?? "") === i && (g == null ? void 0 : g.active) !== !1);
  if (s < 0) return { ok: !1, reason: "That critical effect is no longer active." };
  const r = n[s], o = qo(a.remedyKey || r.remedyKey), l = !!(e.gmOverride ?? ((p = (f = globalThis.game) == null ? void 0 : f.user) == null ? void 0 : p.isGM)), c = await am({
    machineActor: t,
    operatorActorUuid: a.operatorActorUuid
  });
  if (!c.actor && !l)
    return { ok: !1, reason: c.reason || "No linked operator or pilot actor." };
  let u = { ok: !0, skipped: !0 };
  return c.actor && !l && (u = await (e.spendResource ?? B.spendResource.bind(B))(c.actor, {
    resource: o.resource,
    cost: o.cost,
    actionId: o.actionId,
    actionLabel: o.actionLabel,
    actionCostLabel: `${o.cost} SA`,
    actionCategory: o.category
  }), !(u != null && u.ok)) ? { ok: !1, reason: (u == null ? void 0 : u.reason) ?? "Unable to spend the remedy action." } : (n[s] = {
    ...r,
    active: !1,
    resolvedAt: (/* @__PURE__ */ new Date()).toISOString(),
    resolvedBy: ((h = c.actor) == null ? void 0 : h.uuid) ?? "",
    resolvedByOverride: l && !c.actor,
    remedyKey: o.key
  }, await t.update({ "system.mwd.crits": n }), await SS(t), {
    ok: !0,
    machineActor: t,
    operatorActor: c.actor,
    crit: n[s],
    remedy: o,
    spend: u
  });
}
function AS() {
  Hooks.on("renderChatMessageHTML", (a, e) => {
    e.addEventListener("click", (t) => {
      const i = t.target.closest("[data-mwd-action]");
      if (!i) return;
      const n = String(i.dataset.mwdAction || "").trim();
      n && (n === "edgePostReroll" && US(t, a), n === "toggleEvade" && IS(t, a), n === "toggleEvadeEdge" && DS(t, a), n === "toggleHazardEvade" && $S(t, a), n === "toggleHazardEvadeEdge" && BS(t, a), n === "applyHazardTick" && zS(t, a), n === "toggleMachineChaosCrit" && LS(t, a), n === "machineCritRemedy" && xS(t), n === "applyAttackDamage" && RS(t, a), n === "applyAllAttackDamage" && OS(t, a));
    });
  });
}
function TS(a = {}) {
  var t;
  return (Array.isArray((t = a == null ? void 0 : a.attackResult) == null ? void 0 : t.results) ? a.attackResult.results : []).some((i) => {
    var n;
    return !!((n = i == null ? void 0 : i.queuedMutation) != null && n.applied);
  });
}
function wS(a) {
  return a === A.monitors.physical ? "Physical" : a === A.monitors.fatigue ? "Fatigue" : String(a ?? "").trim() || "Track";
}
function kS(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return e === "penetrating" ? "is-penetrating" : e === "energy" ? "is-energy" : e === "thermal" ? "is-thermal" : e === "electrical" ? "is-electrical" : "is-concussive";
}
function vS(a) {
  const e = Math.max(0, Number(a ?? 0) || 0);
  return e <= 0 ? { key: "is-none", label: "No Penetration" } : e <= 2 ? { key: "is-light", label: "Light Damage" } : e <= 4 ? { key: "is-medium", label: "Moderate Damage" } : e <= 7 ? { key: "is-heavy", label: "Heavy Damage" } : { key: "is-critical", label: "Critical Damage" };
}
function MS({ actor: a = null, token: e = null } = {}) {
  var s;
  const t = (e == null ? void 0 : e.document) ?? e ?? null, i = String(((s = t == null ? void 0 : t.texture) == null ? void 0 : s.src) ?? "").trim(), n = String((a == null ? void 0 : a.img) ?? "").trim();
  return i || n || "icons/svg/mystery-man.svg";
}
function CS(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
function ES({ summary: a = {}, actor: e = null, token: t = null } = {}) {
  const i = String((a == null ? void 0 : a.damageType) ?? "").trim(), n = Yt(i || "concussive") || "Damage", s = wS(a == null ? void 0 : a.track), r = Math.max(0, Number((a == null ? void 0 : a.finalDamage) ?? (a == null ? void 0 : a.appliedDelta) ?? 0) || 0), o = vS(r), l = r === 1 ? "1 point" : `${r} points`, c = String((a == null ? void 0 : a.actorName) ?? (e == null ? void 0 : e.name) ?? "Target").trim() || "Target", u = [];
  return a != null && a.beforeLabel && (a != null && a.afterLabel) && u.push({
    label: "Monitor",
    value: `${a.beforeLabel} -> ${a.afterLabel}`
  }), u.push({
    label: "Final Damage",
    value: l
  }), Number.isFinite(Number(a == null ? void 0 : a.damageIncoming)) && u.push({
    label: "Incoming",
    value: String(Number(a.damageIncoming ?? 0))
  }), a != null && a.usedArmor && (a != null && a.mitigation) && (u.push({
    label: "Resistance",
    value: String(Number(a.mitigation.netResistance ?? 0))
  }), u.push({
    label: "AP",
    value: String(Number(a.effectiveAp ?? 0))
  }), u.push({
    label: "Armor",
    value: `${Number(a.mitigation.armorBefore ?? 0)} -> ${Number(a.mitigation.armorAfter ?? 0)}`
  }), Number(a.mitigation.reinforcedMax ?? 0) > 0 && u.push({
    label: "Reinforced",
    value: `${Number(a.mitigation.reinforcedBefore ?? 0)} -> ${Number(a.mitigation.reinforcedAfter ?? 0)}`
  })), a != null && a.source && u.push({
    label: "Source",
    value: String(a.source).trim()
  }), a != null && a.notes && u.push({
    label: "Notes",
    value: String(a.notes).trim()
  }), {
    classes: ["mwd-damage-card", kS(i), o.key].join(" "),
    header: {
      left: "Damage Applied",
      right: s
    },
    target: {
      name: c,
      image: MS({ actor: e, token: t })
    },
    damageTypeLabel: n,
    severityLabel: o.label,
    impactValue: r,
    impactText: r > 0 ? `${n} damage applied to ${s}.` : `${n} damage did not penetrate.`,
    rows: u
  };
}
async function Xo({ summary: a = {}, actor: e = null, token: t = null } = {}) {
  const i = await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-damage-application-card",
    ES({ summary: a, actor: e, token: t })
  ), n = CS({
    speaker: ChatMessage.getSpeaker({ actor: e, token: t }),
    content: i
  });
  return ChatMessage.create(n);
}
function PS(a = {}) {
  var i, n, s;
  const e = (a == null ? void 0 : a.ctxSnapshot) ?? {}, t = Number(((i = a == null ? void 0 : a.dn) == null ? void 0 : i.total) ?? ((n = e == null ? void 0 : e.dn) == null ? void 0 : n.total) ?? ((s = e == null ? void 0 : e.difficulty) == null ? void 0 : s.dn) ?? 1);
  return {
    intent: (a == null ? void 0 : a.intent) ?? "unknown",
    rollType: (e == null ? void 0 : e.rollType) ?? "simple",
    difficulty: {
      ...e != null && e.difficulty && typeof e.difficulty == "object" ? e.difficulty : {},
      dn: Number.isFinite(t) ? t : 1
    },
    dn: (a == null ? void 0 : a.dn) ?? (e == null ? void 0 : e.dn) ?? null,
    opposed: (e == null ? void 0 : e.opposed) ?? null,
    net: (e == null ? void 0 : e.net) ?? null,
    edge: (e == null ? void 0 : e.edge) ?? null,
    domains: Array.isArray(a == null ? void 0 : a.domains) ? a.domains : [],
    attack: (a == null ? void 0 : a.attack) ?? null
  };
}
async function sm(a = {}, e = null) {
  var s, r, o;
  const t = PS(a), i = Number(((s = a == null ? void 0 : a.outcome) == null ? void 0 : s.hits) ?? 0) || 0, n = ((r = a == null ? void 0 : a.outcomeModel) == null ? void 0 : r.edgeEarned) ?? null;
  return a.outcomeModel = im(t, { successes: i, raw: (o = a == null ? void 0 : a.roll) == null ? void 0 : o.json }, null), a.outcomeModel.edgeEarned = n, t.intent === "attack" && e && t.attack && (a.attackResult = await Zd({
    attacker: e,
    ctx: t,
    outcomeModel: a.outcomeModel,
    previewState: a.areaEffectPreviewState ?? {},
    existingAttackResult: a.attackResult ?? null
  })), a;
}
async function RS(a, e) {
  var o, l, c, u, d, m, f;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='applyAttackDamage']"), i = Number((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.resultIndex);
  if (!Number.isInteger(i) || i < 0) return;
  const n = foundry.utils.deepClone((c = (l = e == null ? void 0 : e.flags) == null ? void 0 : l.mwd) == null ? void 0 : c.resolved);
  if (!n) return;
  const s = await rm(n, i);
  if (!s.ok) {
    (d = (u = ui.notifications) == null ? void 0 : u.warn) == null || d.call(u, s.reason ?? "Unable to apply attack damage.");
    return;
  }
  if (s.skipped) {
    (f = (m = ui.notifications) == null ? void 0 : m.info) == null || f.call(m, s.reason ?? "That attack damage has already been applied.");
    return;
  }
  const r = await xa({ resolved: n });
  await e.update({
    content: r,
    "flags.mwd.resolved": n
  }), await Xo({
    summary: s.summary,
    actor: s.targetActor,
    token: s.targetToken
  });
}
async function Zo(a = {}) {
  var i, n;
  const e = (i = a == null ? void 0 : a.target) != null && i.actorUuid ? await fromUuid(a.target.actorUuid) : null, t = (n = a == null ? void 0 : a.target) != null && n.tokenUuid ? await fromUuid(a.target.tokenUuid) : null;
  return Bs({
    actor: e,
    token: t,
    edgePoolKey: (a == null ? void 0 : a.evadeEdgePoolKey) ?? ""
  });
}
function NS(a = "") {
  var e, t;
  return ((t = (e = game.messages) == null ? void 0 : e.get) == null ? void 0 : t.call(e, String(a ?? "").trim())) ?? null;
}
async function Bs({ actor: a = null, token: e = null, actorUuid: t = "", tokenUuid: i = "", edgePoolKey: n = "" } = {}) {
  const s = a ?? (t ? await fromUuid(t) : null), r = e ?? (i ? await fromUuid(i) : null);
  return s ? {
    ...B.getReactionSpendPreview(s, { token: r, edgePoolKey: n }) ?? {},
    actor: s,
    token: r
  } : null;
}
async function el(a, e) {
  var s, r;
  const t = foundry.utils.deepClone((r = (s = a == null ? void 0 : a.flags) == null ? void 0 : s.mwd) == null ? void 0 : r.resolved);
  if (!t) return;
  await e(t);
  const i = await fromUuid(t.actorUuid);
  if (!i) return;
  await sm(t, i);
  const n = await xa({ resolved: t });
  return await a.update({
    content: n,
    "flags.mwd.resolved": t
  }), t;
}
async function tl(a, e, { active: t = !1, edgePoolKey: i = "" } = {}) {
  var r, o, l, c, u, d, m, f;
  const n = (r = e == null ? void 0 : e.target) != null && r.actorUuid ? await fromUuid(e.target.actorUuid) : null, s = (o = e == null ? void 0 : e.target) != null && o.tokenUuid ? await fromUuid(e.target.tokenUuid) : null;
  if (n) {
    if (!t) {
      const p = B.getSnapshot(n, { token: s }), h = (p == null ? void 0 : p.pendingReaction) ?? null;
      (h == null ? void 0 : h.sourceKind) === "attack" && (h == null ? void 0 : h.messageId) === a.id && (h == null ? void 0 : h.sourceId) === (e == null ? void 0 : e.previewKey) && await B.clearPendingReaction(n, { token: s });
      return;
    }
    await B.setPendingReaction(n, {
      token: s,
      pendingReaction: {
        type: "evade",
        sourceKind: "attack",
        sourceId: (e == null ? void 0 : e.previewKey) ?? null,
        messageId: a.id,
        resultIndex: (e == null ? void 0 : e.resultIndex) ?? null,
        exposureBefore: ((c = (l = e == null ? void 0 : e.damage) == null ? void 0 : l.exposure) == null ? void 0 : c.initialTier) ?? ((u = e == null ? void 0 : e.exposure) == null ? void 0 : u.initialTier) ?? "none",
        exposureAfterPreview: ((m = (d = e == null ? void 0 : e.damage) == null ? void 0 : d.exposure) == null ? void 0 : m.finalTier) ?? ((f = e == null ? void 0 : e.exposure) == null ? void 0 : f.initialTier) ?? "none",
        edgePoolKey: i,
        allowCurrentTurn: !1
      }
    });
  }
}
async function IS(a, e) {
  var r, o;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleEvade']"), i = String(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.previewKey) ?? "").trim();
  if (!i) return;
  const n = await el(e, async (l) => {
    var f;
    if (l.areaEffectPreviewState ?? (l.areaEffectPreviewState = {}), !!(l.areaEffectPreviewState[i] ?? {}).evadeActive) {
      delete l.areaEffectPreviewState[i];
      return;
    }
    l.areaEffectPreviewState[i] = {
      evadeActive: !0,
      edgePoolKey: null
    };
    const d = (Array.isArray((f = l == null ? void 0 : l.attackResult) == null ? void 0 : f.results) ? l.attackResult.results : []).find((p) => (p == null ? void 0 : p.previewKey) === i) ?? null, m = d ? await Zo({ ...d, evadeEdgePoolKey: null }) : null;
    m && (l.areaEffectPreviewState[i].reactionPreview = {
      burnDelta: Number(m.burnDelta ?? 0),
      canSpendEdge: !!m.canSpendEdge,
      edgePools: (m.edgePools ?? []).map((p) => ({
        key: p.key,
        label: p.label,
        value: p.value
      }))
    });
  }), s = (Array.isArray((o = n == null ? void 0 : n.attackResult) == null ? void 0 : o.results) ? n.attackResult.results : []).find((l) => (l == null ? void 0 : l.previewKey) === i) ?? null;
  n && s && await tl(e, s, {
    active: !!(s != null && s.evadeActive),
    edgePoolKey: String((s == null ? void 0 : s.evadeEdgePoolKey) ?? "").trim()
  });
}
async function DS(a, e) {
  var o, l, c;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleEvadeEdge']"), i = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.previewKey) ?? "").trim(), n = String(((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.poolKey) ?? "").trim();
  if (!i) return;
  const s = await el(e, async (u) => {
    var h;
    u.areaEffectPreviewState ?? (u.areaEffectPreviewState = {});
    const d = u.areaEffectPreviewState[i] ?? {}, m = d.edgePoolKey === n ? null : n;
    u.areaEffectPreviewState[i] = {
      ...d,
      evadeActive: !0,
      edgePoolKey: m
    };
    const f = (Array.isArray((h = u == null ? void 0 : u.attackResult) == null ? void 0 : h.results) ? u.attackResult.results : []).find((g) => (g == null ? void 0 : g.previewKey) === i) ?? null, p = f ? await Zo({ ...f, evadeEdgePoolKey: m }) : null;
    p && (u.areaEffectPreviewState[i].reactionPreview = {
      burnDelta: Number(p.burnDelta ?? 0),
      canSpendEdge: !!p.canSpendEdge,
      edgePools: (p.edgePools ?? []).map((g) => ({
        key: g.key,
        label: g.label,
        value: g.value
      }))
    });
  }), r = (Array.isArray((c = s == null ? void 0 : s.attackResult) == null ? void 0 : c.results) ? s.attackResult.results : []).find((u) => (u == null ? void 0 : u.previewKey) === i) ?? null;
  s && r && await tl(e, r, {
    active: !!(r != null && r.evadeActive),
    edgePoolKey: String((r == null ? void 0 : r.evadeEdgePoolKey) ?? "").trim()
  });
}
async function OS(a, e) {
  var c, u, d, m, f, p, h, g, y;
  a.preventDefault();
  const t = foundry.utils.deepClone((u = (c = e == null ? void 0 : e.flags) == null ? void 0 : c.mwd) == null ? void 0 : u.resolved);
  if (!t) return;
  const n = (Array.isArray((d = t == null ? void 0 : t.attackResult) == null ? void 0 : d.results) ? t.attackResult.results : []).map((b, S) => ({ result: b, index: S })).filter(({ result: b }) => (b == null ? void 0 : b.queuedMutation) && !b.queuedMutation.applied).map(({ index: b }) => b);
  if (!n.length) {
    (f = (m = ui.notifications) == null ? void 0 : m.info) == null || f.call(m, "No queued attack damage remains to apply.");
    return;
  }
  let s = 0;
  const r = [], o = [];
  for (const b of n) {
    const S = await rm(t, b);
    S.ok && S.applied ? (s += 1, o.push(S)) : S.ok || r.push(S.reason ?? `Target ${b + 1} failed.`);
  }
  if (s <= 0) {
    (h = (p = ui.notifications) == null ? void 0 : p.warn) == null || h.call(p, r[0] ?? "Unable to apply queued attack damage.");
    return;
  }
  const l = await xa({ resolved: t });
  await e.update({
    content: l,
    "flags.mwd.resolved": t
  });
  for (const b of o)
    await Xo({
      summary: b.summary,
      actor: b.targetActor,
      token: b.targetToken
    });
  r.length && ((y = (g = ui.notifications) == null ? void 0 : g.warn) == null || y.call(g, `Applied ${s} queued damage result${s === 1 ? "" : "s"}; ${r.length} failed.`));
}
async function rm(a, e) {
  var l, c, u, d, m, f, p, h, g;
  const t = ((c = (l = a == null ? void 0 : a.attackResult) == null ? void 0 : l.results) == null ? void 0 : c[e]) ?? null, i = (t == null ? void 0 : t.queuedMutation) ?? null;
  if (!i)
    return { ok: !1, reason: "No queued attack damage to apply." };
  if (i.applied)
    return { ok: !0, skipped: !0, reason: "That attack damage has already been applied." };
  let n = null, s = null, r = null;
  try {
    if (s = (u = i.target) != null && u.actorUuid ? await fromUuid(i.target.actorUuid) : null, r = (d = i.target) != null && d.tokenUuid ? await fromUuid(i.target.tokenUuid) : null, t != null && t.evadeActive && s) {
      const y = await B.commitReactionSpend(s, {
        token: r,
        actionId: "evade",
        actionLabel: "Evade",
        actionCategory: "reaction",
        logLabel: `Evade: ${((m = i.target) == null ? void 0 : m.name) ?? ((f = t == null ? void 0 : t.target) == null ? void 0 : f.name) ?? "Target"}`,
        edgePoolKey: String((t == null ? void 0 : t.evadeEdgePoolKey) ?? "").trim()
      });
      if (!(y != null && y.ok))
        return { ok: !1, reason: (y == null ? void 0 : y.reason) ?? "Unable to spend the Evade reaction." };
      await B.clearPendingReaction(s, { token: r });
    }
    if (((p = i.payload) == null ? void 0 : p.mode) === "machineAttackDamage" && ((h = i.payload) != null && h.chaosCriticalSelected)) {
      const y = await _S({
        machineActor: s,
        operatorActorUuid: (g = i.payload) == null ? void 0 : g.operatorActorUuid
      });
      if (!y.ok) return y;
    }
    n = await Pt.apply({
      actor: s,
      token: r,
      payload: i.payload ?? {},
      options: {
        actorId: (s == null ? void 0 : s.id) ?? "",
        logToChat: !1
      }
    });
  } catch (y) {
    return console.warn("MWD | Unable to apply queued attack damage", y), { ok: !1, reason: "Unable to apply attack damage to that target." };
  }
  const o = ga(
    n,
    (t == null ? void 0 : t.target) ?? i.target ?? {},
    (t == null ? void 0 : t.damage) ?? {},
    { queued: !1, applied: !!(n != null && n.ok) }
  );
  return n != null && n.ok ? (i.applied = !0, i.appliedResult = o, t.queuedMutation = i, t.damageResult = o, t.evadeApplied = !!t.evadeActive, a.edge ?? (a.edge = {}), a.edge.availableActions = {
    ...a.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, {
    ok: !0,
    applied: !0,
    summary: o,
    targetActor: s,
    targetToken: r
  }) : { ok: !1, reason: o.reason ?? "Unable to apply attack damage." };
}
async function _S({ machineActor: a = null, operatorActorUuid: e = "" } = {}) {
  var s, r, o, l, c, u, d, m;
  const t = await am({ machineActor: a, operatorActorUuid: e });
  if (!t.actor)
    return (s = game.user) != null && s.isGM ? { ok: !0, gmOverride: !0 } : { ok: !1, reason: t.reason || "No linked operator or pilot actor for Chaos Edge." };
  const i = A.counters.edgePools.chaos, n = Number(((o = (r = t.actor).getRemainingEdge) == null ? void 0 : o.call(r, i)) ?? ((c = (l = t.actor).getEdgePoolValue) == null ? void 0 : c.call(l, i)) ?? 0);
  return n <= 0 && !((u = game.user) != null && u.isGM) ? { ok: !1, reason: `${t.actor.name ?? "Operator"} has no Chaos Edge remaining.` } : (n > 0 && await ((m = (d = t.actor).spendEdge) == null ? void 0 : m.call(d, i, 1, { source: "machineChaosCritical" })), { ok: !0, operatorActor: t.actor });
}
async function LS(a, e) {
  var m, f, p, h, g, y;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleMachineChaosCrit']"), i = Number(((m = t == null ? void 0 : t.dataset) == null ? void 0 : m.resultIndex) ?? -1), n = foundry.utils.deepClone(e.getFlag("mwd", "resolved")), s = ((p = (f = n == null ? void 0 : n.attackResult) == null ? void 0 : f.results) == null ? void 0 : p[i]) ?? null, r = (s == null ? void 0 : s.queuedMutation) ?? null;
  if (!r || r.applied || ((h = r.payload) == null ? void 0 : h.mode) !== "machineAttackDamage") return;
  r.payload.chaosCriticalSelected = !r.payload.chaosCriticalSelected;
  const o = (g = r.target) != null && g.actorUuid ? await fromUuid(r.target.actorUuid) : null, l = (y = r.target) != null && y.tokenUuid ? await fromUuid(r.target.tokenUuid) : null, c = await Pt.apply({
    actor: o,
    token: l,
    payload: r.payload,
    options: {
      actorId: (o == null ? void 0 : o.id) ?? "",
      dryRun: !0,
      logToChat: !1
    }
  }), u = ga(
    c,
    (s == null ? void 0 : s.target) ?? r.target ?? {},
    (s == null ? void 0 : s.damage) ?? {},
    { queued: !0, applied: !1 }
  );
  r.preview = u, s.queuedMutation = r, s.damageResult = u;
  const d = await xa({ resolved: n });
  await e.update({
    content: d,
    "flags.mwd.resolved": n
  });
}
async function xS(a, e) {
  var s, r, o, l, c, u, d, m, f, p, h;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='machineCritRemedy']"), i = {
    intent: "machine_crit_remedy",
    machineActorUuid: ((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.machineActorUuid) ?? "",
    critId: ((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.critId) ?? "",
    remedyKey: ((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.remedyKey) ?? "",
    operatorActorUuid: ((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.operatorActorUuid) ?? ""
  }, n = await nm(i, {
    gmOverride: !!((c = game.user) != null && c.isGM && ((u = t == null ? void 0 : t.dataset) == null ? void 0 : u.gmOverride) === "true")
  });
  if (!n.ok) {
    (m = (d = ui.notifications) == null ? void 0 : d.warn) == null || m.call(d, n.reason ?? "Unable to resolve machine critical remedy.");
    return;
  }
  (h = (f = ui.notifications) == null ? void 0 : f.info) == null || h.call(f, `Resolved ${((p = n.crit) == null ? void 0 : p.label) ?? "machine critical"}.`);
}
async function om(a, e) {
  const t = e != null && e.actorUuid ? await fromUuid(e.actorUuid) : null, i = e != null && e.tokenUuid ? await fromUuid(e.tokenUuid) : null, n = await td(e, { actor: t, token: i });
  return await a.update({
    content: n,
    "flags.mwd.hazardCard": e
  }), e;
}
async function il(a, e) {
  var i, n;
  const t = Fo(foundry.utils.deepClone(((n = (i = a == null ? void 0 : a.flags) == null ? void 0 : i.mwd) == null ? void 0 : n.hazardCard) ?? {}));
  return t != null && t.actorUuid ? (await e(t), await om(a, t), t) : null;
}
async function al(a, e, { active: t = !1, edgePoolKey: i = "" } = {}) {
  var r, o, l;
  const n = e != null && e.actorUuid ? await fromUuid(e.actorUuid) : null, s = e != null && e.tokenUuid ? await fromUuid(e.tokenUuid) : null;
  if (n) {
    if (!t) {
      const c = B.getSnapshot(n, { token: s }), u = (c == null ? void 0 : c.pendingReaction) ?? null;
      (u == null ? void 0 : u.sourceKind) === "hazard" && (u == null ? void 0 : u.messageId) === a.id && (u == null ? void 0 : u.sourceId) === (e == null ? void 0 : e.regionId) && await B.clearPendingReaction(n, { token: s });
      return;
    }
    await B.setPendingReaction(n, {
      token: s,
      pendingReaction: {
        type: "evade",
        sourceKind: "hazard",
        sourceId: (e == null ? void 0 : e.regionId) ?? null,
        messageId: a.id,
        exposureBefore: ((r = e == null ? void 0 : e.exposure) == null ? void 0 : r.initialTier) ?? "none",
        exposureAfterPreview: ((o = e == null ? void 0 : e.preview) == null ? void 0 : o.finalTier) ?? ((l = e == null ? void 0 : e.exposure) == null ? void 0 : l.initialTier) ?? "none",
        edgePoolKey: i,
        allowCurrentTurn: !0
      }
    });
  }
}
async function $S(a, e) {
  var i, n;
  a.preventDefault();
  const t = await il(e, async (s) => {
    var l, c, u;
    const r = !((l = s == null ? void 0 : s.preview) != null && l.evadeActive), o = vo(Li({
      tier: ((c = s == null ? void 0 : s.exposure) == null ? void 0 : c.initialTier) ?? "none"
    }), {
      active: r,
      locked: !!((u = s == null ? void 0 : s.exposure) != null && u.evadeLocked)
    });
    if (s.preview ?? (s.preview = {}), s.preview.evadeActive = r, s.preview.edgePoolKey = null, s.preview.finalTier = o.finalTier, s.damageAfter = Qi(s.baseDamage ?? 0, o.finalTier), r) {
      const d = await Bs({
        actorUuid: s.actorUuid,
        tokenUuid: s.tokenUuid,
        edgePoolKey: ""
      });
      s.preview.reactionPreview = d ? {
        burnDelta: Number(d.burnDelta ?? 0),
        canSpendEdge: !!d.canSpendEdge,
        edgePools: (d.edgePools ?? []).map((m) => ({
          key: m.key,
          label: m.label,
          value: m.value
        }))
      } : {};
    } else
      s.preview.reactionPreview = {};
  });
  t && await al(e, t, {
    active: !!((i = t == null ? void 0 : t.preview) != null && i.evadeActive),
    edgePoolKey: String(((n = t == null ? void 0 : t.preview) == null ? void 0 : n.edgePoolKey) ?? "").trim()
  });
}
async function BS(a, e) {
  var s, r, o;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleHazardEvadeEdge']"), i = String(((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.poolKey) ?? "").trim(), n = await il(e, async (l) => {
    l.preview ?? (l.preview = {}), l.preview.evadeActive = !0, l.preview.edgePoolKey = l.preview.edgePoolKey === i ? null : i;
    const c = await Bs({
      actorUuid: l.actorUuid,
      tokenUuid: l.tokenUuid,
      edgePoolKey: l.preview.edgePoolKey ?? ""
    });
    l.preview.reactionPreview = c ? {
      burnDelta: Number(c.burnDelta ?? 0),
      canSpendEdge: !!c.canSpendEdge,
      edgePools: (c.edgePools ?? []).map((u) => ({
        key: u.key,
        label: u.label,
        value: u.value
      }))
    } : {};
  });
  n && await al(e, n, {
    active: !!((r = n == null ? void 0 : n.preview) != null && r.evadeActive),
    edgePoolKey: String(((o = n == null ? void 0 : n.preview) == null ? void 0 : o.edgePoolKey) ?? "").trim()
  });
}
async function zS(a, e) {
  var u, d, m, f, p, h, g, y, b, S, w, M, P, E, z, Y, Q, G, q, L, U;
  a.preventDefault();
  const t = Fo(foundry.utils.deepClone(((d = (u = e == null ? void 0 : e.flags) == null ? void 0 : u.mwd) == null ? void 0 : d.hazardCard) ?? {}));
  if (!(t != null && t.actorUuid)) return;
  if (t.applied) {
    (f = (m = ui.notifications) == null ? void 0 : m.info) == null || f.call(m, "That hazard has already been applied.");
    return;
  }
  const i = await fromUuid(t.actorUuid), n = t.tokenUuid ? await fromUuid(t.tokenUuid) : null;
  if (!i) {
    (h = (p = ui.notifications) == null ? void 0 : p.warn) == null || h.call(p, "Unable to resolve the hazard target.");
    return;
  }
  if ((g = t.preview) != null && g.evadeActive) {
    const V = await B.commitReactionSpend(i, {
      token: n,
      actionId: "evade",
      actionLabel: "Evade",
      actionCategory: "reaction",
      logLabel: `Evade: ${t.regionName}`,
      edgePoolKey: String(((y = t.preview) == null ? void 0 : y.edgePoolKey) ?? "").trim(),
      allowCurrentTurn: !0
    });
    if (!(V != null && V.ok)) {
      (S = (b = ui.notifications) == null ? void 0 : b.warn) == null || S.call(b, (V == null ? void 0 : V.reason) ?? "Unable to spend the Evade reaction.");
      return;
    }
  }
  const s = {
    mode: "attackDamage",
    track: A.monitors.physical,
    damage: Number(t.damageAfter ?? t.damageBefore ?? 0) || 0,
    netHits: 0,
    damageType: t.damageType,
    ap: Number(t.ap ?? 0) || 0,
    source: t.source,
    notes: `Hazard exposure ${t.exposure.initialLabel}${(w = t.preview) != null && w.evadeActive ? ` -> ${String(t.preview.finalTier ?? t.exposure.initialTier).toUpperCase()}` : ""}`.trim()
  }, r = await Pt.apply({
    actor: i,
    token: n,
    payload: s,
    options: {
      actorId: i.id,
      logToChat: !1
    }
  });
  if (!(r != null && r.ok)) {
    (P = (M = ui.notifications) == null ? void 0 : M.warn) == null || P.call(M, (r == null ? void 0 : r.reason) ?? "Unable to apply hazard damage.");
    return;
  }
  const o = B.getSnapshot(i, { token: n }), l = ((E = o == null ? void 0 : o.hazards) == null ? void 0 : E[t.regionId]) ?? {}, c = Be(t.nextTier, t.exposure.finalTier);
  await B.setHazardState(i, {
    token: n,
    regionId: t.regionId,
    hazardState: {
      ...l,
      tier: c,
      turnsExposed: Math.max(Number((l == null ? void 0 : l.turnsExposed) ?? 0), Number(t.turnsExposed ?? 0)) + 1,
      lastProcessedRound: Number(((z = o == null ? void 0 : o.combat) == null ? void 0 : z.round) ?? 0) || 0,
      evadeLocked: !!(l != null && l.evadeLocked) || !!(((Y = t.exposure) == null ? void 0 : Y.initialTier) === "full" && ((Q = t.preview) == null ? void 0 : Q.finalTier) === "major" && ((G = t.preview) != null && G.evadeActive))
    }
  }), c === "full" && Number((t == null ? void 0 : t.onFullBurnDelta) ?? 0) > 0 && await i.update({
    "system.burn.value": Math.max(0, Number(((L = (q = i.system) == null ? void 0 : q.burn) == null ? void 0 : L.value) ?? 0) + Number(t.onFullBurnDelta ?? 0))
  }), await B.clearPendingReaction(i, { token: n }), t.applied = !0, t.applyReason = "Applied", await om(e, t), await Xo({
    summary: {
      actorName: i.name,
      track: r.track,
      finalDamage: Number(r.finalDamage ?? r.appliedDelta ?? 0),
      damageIncoming: Number(r.damageIncoming ?? t.damageAfter ?? 0),
      damageType: r.damageType ?? t.damageType,
      usedArmor: !!r.usedArmor,
      effectiveAp: Number(r.effectiveAp ?? t.ap ?? 0),
      mitigation: r.mitigation ?? null,
      beforeLabel: String(r.beforeLabel ?? "").trim(),
      afterLabel: String(r.afterLabel ?? "").trim(),
      source: t.source,
      notes: `Hazard exposure ${t.exposure.initialLabel}${(U = t.preview) != null && U.evadeActive ? ` -> ${String(t.preview.finalTier ?? "").toUpperCase()}` : ""}`
    },
    actor: i,
    token: n
  });
}
async function FS(a, { token: e = null } = {}) {
  var s, r;
  const t = B.getSnapshot(a, { token: e }), i = (t == null ? void 0 : t.pendingReaction) ?? null;
  if (!(i != null && i.messageId))
    return { ok: !1, reason: "Use an area effect or hazard card to trigger Evade." };
  const n = NS(i.messageId);
  if (!n)
    return await B.clearPendingReaction(a, { token: e }), { ok: !1, reason: "The pending Evade card is no longer available." };
  if (i.sourceKind === "attack") {
    const o = String(i.sourceId ?? "").trim();
    if (!o) return { ok: !1, reason: "Pending Evade target is missing." };
    const l = await el(n, async (u) => {
      var f;
      u.areaEffectPreviewState ?? (u.areaEffectPreviewState = {}), u.areaEffectPreviewState[o] = {
        ...u.areaEffectPreviewState[o] ?? {},
        evadeActive: !0,
        edgePoolKey: i.edgePoolKey ?? null
      };
      const d = (Array.isArray((f = u == null ? void 0 : u.attackResult) == null ? void 0 : f.results) ? u.attackResult.results : []).find((p) => (p == null ? void 0 : p.previewKey) === o) ?? null, m = d ? await Zo({ ...d, evadeEdgePoolKey: i.edgePoolKey ?? "" }) : null;
      m && (u.areaEffectPreviewState[o].reactionPreview = {
        burnDelta: Number(m.burnDelta ?? 0),
        canSpendEdge: !!m.canSpendEdge,
        edgePools: (m.edgePools ?? []).map((p) => ({
          key: p.key,
          label: p.label,
          value: p.value
        }))
      });
    }), c = (Array.isArray((s = l == null ? void 0 : l.attackResult) == null ? void 0 : s.results) ? l.attackResult.results : []).find((u) => (u == null ? void 0 : u.previewKey) === o) ?? null;
    return c && await tl(n, c, {
      active: !0,
      edgePoolKey: String((c == null ? void 0 : c.evadeEdgePoolKey) ?? i.edgePoolKey ?? "").trim()
    }), { ok: !0 };
  }
  if (i.sourceKind === "hazard") {
    const o = await il(n, async (l) => {
      var d, m;
      const c = vo(Li({
        tier: ((d = l == null ? void 0 : l.exposure) == null ? void 0 : d.initialTier) ?? "none"
      }), {
        active: !0,
        locked: !!((m = l == null ? void 0 : l.exposure) != null && m.evadeLocked)
      });
      l.preview ?? (l.preview = {}), l.preview.evadeActive = !0, l.preview.edgePoolKey = l.preview.edgePoolKey ?? i.edgePoolKey ?? null, l.preview.finalTier = c.finalTier, l.damageAfter = Qi(l.baseDamage ?? 0, c.finalTier);
      const u = await Bs({
        actorUuid: l.actorUuid,
        tokenUuid: l.tokenUuid,
        edgePoolKey: l.preview.edgePoolKey ?? ""
      });
      l.preview.reactionPreview = u ? {
        burnDelta: Number(u.burnDelta ?? 0),
        canSpendEdge: !!u.canSpendEdge,
        edgePools: (u.edgePools ?? []).map((f) => ({
          key: f.key,
          label: f.label,
          value: f.value
        }))
      } : {};
    });
    return o && await al(n, o, {
      active: !0,
      edgePoolKey: String(((r = o == null ? void 0 : o.preview) == null ? void 0 : r.edgePoolKey) ?? i.edgePoolKey ?? "").trim()
    }), { ok: !0 };
  }
  return { ok: !1, reason: "That Evade source is not supported." };
}
async function US(a, e) {
  var p, h, g, y, b, S, w, M, P, E, z, Y, Q, G, q, L, U, V, Z;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='edgePostReroll']"), i = String(((p = t == null ? void 0 : t.dataset) == null ? void 0 : p.poolKey) ?? "").trim();
  if (!i) return;
  const n = foundry.utils.deepClone((g = (h = e == null ? void 0 : e.flags) == null ? void 0 : h.mwd) == null ? void 0 : g.resolved);
  if (!n) return;
  if (TS(n)) {
    (b = (y = ui.notifications) == null ? void 0 : y.warn) == null || b.call(y, "Post-roll Edge is disabled after attack damage has been applied.");
    return;
  }
  if (Number(((w = (S = n == null ? void 0 : n.edge) == null ? void 0 : S.post) == null ? void 0 : w.spent) ?? 0) === 1) return;
  if (!(Array.isArray((P = (M = n == null ? void 0 : n.edge) == null ? void 0 : M.allowed) == null ? void 0 : P.postPools) ? n.edge.allowed.postPools : []).includes(i)) {
    (z = (E = ui.notifications) == null ? void 0 : E.warn) == null || z.call(E, `Post-spend pool not allowed: ${i}`);
    return;
  }
  const r = Array.isArray((Y = n == null ? void 0 : n.roll) == null ? void 0 : Y.failureDiceRefs) ? n.roll.failureDiceRefs : [];
  if (r.length <= 0) {
    (G = (Q = ui.notifications) == null ? void 0 : Q.info) == null || G.call(Q, "No failures to reroll.");
    return;
  }
  const o = await fromUuid(n.actorUuid);
  if (!o) {
    (L = (q = ui.notifications) == null ? void 0 : q.warn) == null || L.call(q, "Actor not found for this roll.");
    return;
  }
  await ((U = o.spendEdge) == null ? void 0 : U.call(o, i, 1));
  const l = Number(((V = n == null ? void 0 : n.roll) == null ? void 0 : V.target) ?? 5), u = (Z = (await new Roll(`${r.length}d6cs>=${l}`).evaluate()).dice) == null ? void 0 : Z[0], d = Array.isArray(u == null ? void 0 : u.results) ? u.results : [], m = d.filter((re) => re.success).length;
  n.outcome = n.outcome ?? {}, n.outcome.hits = Number(n.outcome.hits ?? 0) + m, n.edge = n.edge ?? {}, n.edge.post = { poolKey: i, spent: 1 }, n.edge.availableActions = {
    ...n.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, n.roll = n.roll ?? {}, n.roll.diceGroups = Array.isArray(n.roll.diceGroups) ? n.roll.diceGroups : [], n.roll.diceGroups.push({
    id: "post",
    label: "Post Reroll",
    faces: 6,
    termIndex: null,
    dice: d.map((re, ye) => {
      const ce = Number(re.result), se = !!re.success;
      return {
        ref: `post:${ye}`,
        face: ce,
        isSuccess: se,
        isFailure: !se,
        tooltip: se ? `Post die ${ye + 1}: ${ce} (Success vs TN ${l})` : `Post die ${ye + 1}: ${ce} (Failure vs TN ${l})`
      };
    })
  }), await sm(n, o);
  const f = await xa({ resolved: n });
  await e.update({
    content: f,
    "flags.mwd.resolved": n,
    "flags.mwd.payload.edge.post": { poolKey: i, spent: 1 }
  });
}
const nl = `${T}.ownedWeaponAttack`;
let Sc = !1;
function HS(a, e = null) {
  var r, o, l;
  const t = (a == null ? void 0 : a.actor) ?? null, i = {
    intent: "attack",
    weaponId: (a == null ? void 0 : a.id) ?? "",
    payloadId: ((r = a == null ? void 0 : a.system) == null ? void 0 : r.selectedPayloadId) ?? "",
    edge: { pool: "physical.grit", allowed: ["pre", "post"] },
    tags: ["combat", "attack"],
    sourceTokenId: (e == null ? void 0 : e.id) ?? null
  }, n = t ? B.getSnapshot(t, { token: e }) : null, s = !!((l = (o = n == null ? void 0 : n.state) == null ? void 0 : o.actionState) != null && l.aim);
  return s && (i.aim = { active: !0 }), { payload: i, hasAim: s };
}
function jS(a, e = null) {
  return e ?? (a == null ? void 0 : a.token) ?? B.getCurrentSceneTokenDocument(a) ?? null;
}
function lm(a) {
  const e = String((a == null ? void 0 : a.uuid) ?? "").trim();
  return e ? {
    type: nl,
    uuid: e,
    name: String((a == null ? void 0 : a.name) ?? "Weapon").trim() || "Weapon",
    img: (a == null ? void 0 : a.img) ?? "icons/svg/sword.svg"
  } : null;
}
async function zs({ weapon: a, event: e = null, token: t = null } = {}) {
  var i, n, s, r, o;
  try {
    if (!((i = a == null ? void 0 : a.isPersonalWeapon) != null && i.call(a)))
      throw new Error("Attack requires an owned personal weapon.");
    const l = a.actor ?? null;
    if (!l)
      throw new Error("Attack requires an owned personal weapon.");
    const c = jS(l, t), { payload: u, hasAim: d } = HS(a, c), m = ((n = game.mwd) == null ? void 0 : n.roll) ?? ((r = (s = game.system) == null ? void 0 : s.mwd) == null ? void 0 : r.roll);
    if (!(m != null && m.execute))
      throw new Error("MWD roll system not initialized.");
    const f = await m.execute({ actor: l, payload: u, event: e });
    if (f) {
      d && await B.clearAim(l, { token: c });
      const p = B.getSnapshot(l, { token: c });
      if (p != null && p.hasCombatant) {
        const h = await B.spendResource(l, {
          token: c,
          resource: "sa",
          cost: 2,
          actionId: "attack",
          actionLabel: "Attack",
          actionCostLabel: "2 SA",
          actionCategory: "complex"
        });
        h != null && h.ok || (o = ui.notifications) == null || o.warn((h == null ? void 0 : h.reason) ?? "Unable to record attack action.");
      }
    }
    return f;
  } catch (l) {
    return console.error("MWD | Failed to launch weapon attack", l), Yi(l, "Unable to attack with that weapon."), null;
  }
}
async function WS(a, { event: e = null } = {}) {
  var n, s;
  const t = String(a ?? "").trim();
  if (!t)
    return (n = ui.notifications) == null || n.warn("That weapon shortcut is missing its item reference."), null;
  const i = await fromUuid(t);
  return i ? zs({ weapon: i, event: e }) : ((s = ui.notifications) == null || s.warn("That weapon shortcut could not find its source item."), null);
}
function KS(a) {
  return `(async () => {
  const attacks = game.mwd?.attacks;
  if (!attacks?.attackWeaponByUuid) {
    return ui.notifications?.error("MWD attack shortcuts are not available right now.");
  }
  await attacks.attackWeaponByUuid(${JSON.stringify(String(a ?? "").trim())});
})();`;
}
async function GS(a, e) {
  var r, o, l, c;
  const t = String((a == null ? void 0 : a.uuid) ?? "").trim();
  if (!t) return;
  const i = String((a == null ? void 0 : a.name) ?? "Weapon Attack").trim() || "Weapon Attack", n = KS(t);
  let s = ((o = (r = game.macros) == null ? void 0 : r.find) == null ? void 0 : o.call(
    r,
    (u) => (u == null ? void 0 : u.type) === "script" && (u == null ? void 0 : u.name) === i && (u == null ? void 0 : u.command) === n
  )) ?? null;
  s || (s = await Macro.create({
    name: i,
    type: "script",
    img: (a == null ? void 0 : a.img) ?? "icons/svg/sword.svg",
    command: n
  })), await ((c = (l = game.user) == null ? void 0 : l.assignHotbarMacro) == null ? void 0 : c.call(l, s, e));
}
function cm(a, e, t) {
  return (e == null ? void 0 : e.type) !== nl ? !0 : (GS(e, t), !1);
}
function um() {
  Sc || (Sc = !0, Hooks.on("hotbarDrop", cm));
}
const Ac = {
  HOTBAR_ATTACK_TYPE: nl,
  getOwnedWeaponAttackDragData: lm,
  launchOwnedWeaponAttack: zs,
  attackWeaponByUuid: WS,
  handleWeaponAttackHotbarDrop: cm,
  registerWeaponAttackHotbarHook: um
};
function De(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function qS(a) {
  return String(a ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function Kn(a, e = 180) {
  const t = qS(a);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function gi(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function Va(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim(),
    emphasis: e.emphasis ?? ""
  }));
}
function Gn(a = []) {
  return gi(a).map((e) => ({ label: e }));
}
function qn(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
const VS = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}, YS = {
  audiovisual: "Audiovisual Gear",
  communication: "Communication Gear",
  computing: "Computing Gear",
  espionage: "Espionage Gear",
  hostileEnvironment: "Hostile Environment Gear",
  medical: "Medical Gear",
  optical: "Optical Gear",
  power: "Power Gear",
  repairSalvage: "Repair/Salvage Gear",
  survival: "Survival Gear",
  surveillance: "Surveillance Gear"
}, QS = {
  ammo: "Ammunition",
  explosive: "Explosive",
  medical: "Medical",
  repair: "Repair",
  fuel: "Fuel / Power Cell",
  utility: "Utility"
};
function Tc(a) {
  const e = Number(a ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function wc({
  item: a,
  accordionId: e,
  itemType: t,
  defaultSubtitle: i,
  categoryLabels: n = {},
  ratingLabel: s = "Rating",
  typeLabel: r = "",
  isEditable: o = !1,
  isExpanded: l = !1
} = {}) {
  var p, h, g, y, b, S, w;
  const c = Math.max(0, Math.trunc(De(((p = a == null ? void 0 : a.system) == null ? void 0 : p.quantity) ?? 1, 1))), u = Math.max(0, Math.trunc(De(((h = a == null ? void 0 : a.system) == null ? void 0 : h.rating) ?? 0, 0))), d = gi(((g = a == null ? void 0 : a.system) == null ? void 0 : g.tags) ?? []), m = String(((y = a == null ? void 0 : a.system) == null ? void 0 : y.category) ?? "").trim(), f = n[m] ?? m;
  return {
    id: a.id,
    itemType: t,
    isGear: t === "gear",
    isConsumable: t === "consumable",
    accordionId: e,
    isExpanded: l,
    name: a.name,
    img: a.img,
    subtitle: f || i,
    summaryStats: Va([
      { label: "Qty", value: c, emphasis: "strong" },
      { label: s, value: u }
    ]),
    detailTags: Gn([
      r,
      ...d,
      (b = a == null ? void 0 : a.system) != null && b.inactive ? "Inactive" : ""
    ]),
    detailRows: qn([
      { label: "Quantity", value: c },
      { label: s, value: u },
      { label: "Source", value: ((S = a == null ? void 0 : a.system) == null ? void 0 : S.sourceReference) ?? "" },
      { label: "Category", value: f },
      { label: "Tags", value: d.join(", ") }
    ]),
    detailText: Kn((w = a == null ? void 0 : a.system) == null ? void 0 : w.description),
    quantity: c,
    canAdjustQuantity: o
  };
}
function JS({ defenseBonus: a = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(a ?? 0) || 0;
  i !== 0 && t.push(`Defense ${Tc(i)}`);
  for (const [n, s] of Object.entries(VS)) {
    const r = Number((e == null ? void 0 : e[n]) ?? 0) || 0;
    r !== 0 && t.push(`${s} ${Tc(r)}`);
  }
  return t.join(" | ");
}
function XS(a = {}, e = ["close", "near", "far", "extreme"]) {
  return e.map((t) => {
    const i = De(a == null ? void 0 : a[t], 0);
    return `${t.charAt(0).toUpperCase() + t.slice(1)} ${i}`;
  }).join(" | ");
}
function ZS(a = {}) {
  return ["close", "near", "far", "extreme"].map((e) => `${e.charAt(0).toUpperCase()}${De(a == null ? void 0 : a[e], 0)}`).join(" ");
}
function eA(a = "") {
  const e = String(a ?? "").trim().toLowerCase();
  return e ? e.charAt(0).toUpperCase() + e.slice(1) : "";
}
function Tt(a) {
  return String(a ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function kc({ title: a, label: e, options: t = [], confirmLabel: i = "Select" } = {}) {
  const n = Array.isArray(t) ? t.filter((r) => r == null ? void 0 : r.value) : [];
  if (!n.length) return "";
  if (n.length === 1) return String(n[0].value ?? "").trim();
  const s = `<form class="mwd-quick-select"><div class="mwd-field"><label>${Tt(e)}</label><select name="selection">${n.map((r) => `<option value="${Tt(r.value)}">${Tt(r.label ?? r.value)}</option>`).join("")}</select></div></form>`;
  return await Dialog.prompt({
    title: a,
    content: s,
    label: i,
    callback: (r) => {
      var o;
      return String(r.find('select[name="selection"]').val() ?? ((o = n[0]) == null ? void 0 : o.value) ?? "").trim();
    }
  });
}
var Lt, Pi, Wi, Wt, va, O, dm, Jr, Vn, mm, fm, Ne, Ft, ki, pm, Xr, hm, gm, ym, bm, Sm, Am, Tm, Ut, pa;
const me = class me extends ln {
  constructor() {
    super(...arguments);
    Ce(this, O);
    Ce(this, Lt, null);
    Ce(this, Pi, null);
    Ce(this, Wi, null);
    Ce(this, Wt, /* @__PURE__ */ new Set());
    Ce(this, va, null);
  }
  /** @override */
  async _prepareContext(t) {
    var q, L, U, V, Z, re, ye, ce, se, Ie, Ue, He, Ye, st, Qe, tt, Le, it, yt, bt, St, Dt, N, F, Ae, ie, Re, At;
    const i = await super._prepareContext(t), n = ((q = this.getSheetTokenDocument) == null ? void 0 : q.call(this)) ?? null;
    i._mwdThemeClass = game.system.mwd.styles.selectCssClass(), i.layout = await aa.get("character");
    const s = ((U = (L = this.actor).getEdgeCap) == null ? void 0 : U.call(L)) ?? Number(((re = (Z = (V = this.actor.system) == null ? void 0 : V.attributes) == null ? void 0 : Z.edge) == null ? void 0 : re.value) ?? 0), r = !!this.isEditable, o = { physical: "Physical", mental: "Mental", social: "Social" }, l = {
      grit: "Grit",
      insight: "Insight",
      legend: "Legend",
      chaos: "Chaos",
      rumor: "Rumor",
      credibility: "Credibility"
    }, c = this.actor.getEdgePoolSummary ? this.actor.getEdgePoolSummary({ groups: bo }) : { groups: [] };
    i.edgeConsole = {
      cap: s,
      editable: r,
      capPips: Array.from({ length: Math.max(0, s) }, (v, R) => R + 1),
      groups: (c.groups ?? []).map((v) => ({
        id: v.id,
        label: o[v.id] ?? v.id,
        pools: (v.pools ?? []).map((R) => {
          const K = Number(R.effectiveValue ?? 0), be = Number(R.effectiveMax ?? 0), ue = Array.from({ length: Math.max(0, be) }, (je, at) => {
            const ut = at + 1;
            return { n: ut, filled: ut <= K };
          }), Ee = String(R.key ?? "").split(".").pop();
          return {
            key: R.key,
            label: l[Ee] ?? Ee ?? R.key,
            value: K,
            max: be,
            rating: Number(R.rating ?? 0),
            ratingBonus: Number(R.ratingBonus ?? 0),
            effectiveRating: Number(R.effectiveRating ?? R.rating ?? 0),
            isCapped: Number(R.effectiveRating ?? R.rating ?? 0) > Number(R.cap ?? s),
            pips: ue,
            // Paths for edit-mode inputs
            pathRating: `system.counters.edgePools.${R.key}.rating`,
            pathValue: `system.counters.edgePools.${R.key}.value`,
            // Keep the roll payload if you want pool-name click to route through BaseActorSheetV2 roll handler
            roll: JSON.stringify({ intent: "edge", pool: R.key })
          };
        })
      }))
    };
    const u = ["grit", "insight", "legend", "chaos", "rumor", "credibility"], d = /* @__PURE__ */ new Map();
    for (const v of i.edgeConsole.groups ?? [])
      for (const R of v.pools ?? []) {
        const K = String(R.key ?? "").split(".").pop();
        K && d.set(K, R), R.domain = v.id;
      }
    i.edgeConsole.poolsOrdered = u.map((v) => d.get(v)).filter(Boolean);
    const m = this.actor.system ?? {}, f = m.monitors ?? {}, p = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue", label: "Fatigue", kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor", label: "Armor", kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ], h = (v, R, K = 0) => {
      const be = foundry.utils.getProperty(v, R), ue = Number(be);
      return Number.isFinite(ue) ? ue : K;
    };
    i.conditionMonitors = p.map((v) => {
      const R = (f == null ? void 0 : f[v.id]) ?? {}, K = Math.max(0, h(R, "max", 0)), be = Math.min(Math.max(0, h(R, "value", 0)), K);
      return {
        id: v.id,
        label: v.label,
        kind: v.kind,
        editable: !!this.isEditable,
        value: be,
        max: K,
        segments: Array.from({ length: K }, (ue, Ee) => {
          const je = Ee + 1;
          return { value: je, filled: je <= be };
        }),
        status: v.status ? { label: v.status.label, value: h(R, v.status.path, 0) } : null
      };
    });
    const g = Number(((ce = (ye = this.actor.system) == null ? void 0 : ye.burn) == null ? void 0 : ce.value) ?? 0), y = 10, b = 6, S = Math.min(g, y);
    i.burnOverflow = Math.max(0, g - y), i.burnPenalty = Math.floor(g / 2), i.burnPips = Array.from({ length: y }, (v, R) => {
      const K = R + 1;
      return {
        pipValue: K,
        filled: K <= S,
        threshold: K === b
      };
    }), i.combat = {
      roll: {
        initiative: JSON.stringify({ intent: "initiative" }),
        overload: JSON.stringify({ intent: "overload" })
      }
    }, i.burn = {
      value: g,
      penalty: Math.floor(g / 2),
      overflow: Math.max(0, g - 10),
      canOverloadCheck: g >= 6,
      overloaded: !!((Ie = (se = this.actor.system) == null ? void 0 : se.burn) != null && Ie.overloaded)
    };
    const w = B.getSnapshot(this.actor, { token: n });
    i.combatDashboard = {
      targeting: w.targeting,
      rollImpact: w.rollImpact,
      states: w.states,
      effects: w.effects,
      activation: w.activation,
      inactiveReason: w.inactiveReason
    };
    const M = B.buildActionModel(this.actor, w), P = new Set((M.menus ?? []).map((v) => v.id));
    H(this, Lt) && !P.has(H(this, Lt)) && $e(this, Lt, null), i.combatActions = {
      ...M,
      menus: (M.menus ?? []).map((v) => ({
        ...v,
        isOpen: v.id === H(this, Lt)
      }))
    };
    const E = ((He = (Ue = this.actor).getPersonalCombatLoadout) == null ? void 0 : He.call(Ue)) ?? null;
    i.personalInventory = {
      warnings: [...(E == null ? void 0 : E.warnings) ?? []],
      weapons: ((E == null ? void 0 : E.weapons) ?? []).map((v) => {
        var Te, rt, ot, Je, W, pe, ci;
        const R = C(this, O, pa).call(this, "weapons", v.id), K = String((v == null ? void 0 : v.category) ?? "").trim().toLowerCase() !== "melee", be = !!((Te = v == null ? void 0 : v.sourceState) != null && Te.isTracked), ue = String((v == null ? void 0 : v.payloadLabel) ?? "").trim() || "Unloaded", Ee = K && be ? `${De((rt = v == null ? void 0 : v.sourceState) == null ? void 0 : rt.current, 0)}/${De((ot = v == null ? void 0 : v.sourceState) == null ? void 0 : ot.max, 0)}` : "", je = K ? be ? `${ue} ${Ee}` : ue : "", at = K ? be ? `Payload ${Ee}` : `Payload ${ue}` : "", ut = XS(v.attackRatingBand), Rt = ZS(v.attackRatingBand), ee = qn([
          { label: "Skill", value: ((Je = v.skillDef) == null ? void 0 : Je.label) ?? v.skill ?? "" },
          { label: "Category", value: v.category ?? "" },
          { label: "Damage Type", value: v.damageTypeLabel ?? v.damageType ?? "" },
          { label: "Max Range", value: eA(((W = v.range) == null ? void 0 : W.max) ?? v.defaultRangeBand ?? "") },
          { label: "CQ Bands", value: ut },
          { label: "Payload", value: je },
          { label: "Traits", value: gi(v.traits ?? []).join(", ") }
        ]);
        return {
          id: v.id,
          accordionId: R,
          isExpanded: H(this, Wt).has(R),
          name: v.name,
          img: v.img,
          subtitle: ((pe = v.skillDef) == null ? void 0 : pe.label) ?? v.category ?? "",
          summaryStats: Va([
            { label: "DV", value: De(v.damage, 0), emphasis: "strong" },
            { label: "AP", value: De(v.ap, 0) },
            { label: "Type", value: v.damageTypeLabel ?? v.damageType ?? "" },
            { label: "CQ", value: Rt }
          ]),
          detailTags: Gn([
            v.equipped ? "Equipped" : "",
            v.isPrimary ? "Primary" : "",
            at,
            ...gi(v.traits ?? [])
          ]),
          detailRows: ee,
          detailText: Kn(v.notes),
          equipped: !!v.equipped,
          isPrimary: !!v.isPrimary,
          attackUuid: v.uuid ?? "",
          attackRoll: JSON.stringify({
            intent: "attack",
            weaponId: v.id,
            payloadId: ((ci = v == null ? void 0 : v.payloadState) == null ? void 0 : ci.activePayloadId) ?? "",
            edge: { pool: "physical.grit", allowed: ["pre", "post"] },
            tags: ["combat", "attack"]
          })
        };
      }),
      armor: ((E == null ? void 0 : E.armor) ?? []).map((v) => {
        var je, at, ut, Rt, ee, Te, rt, ot, Je, W, pe, ci, Ot, Ai;
        const R = ((je = E == null ? void 0 : E.activeArmor) == null ? void 0 : je.id) === v.id ? E.activeArmor : null, K = C(this, O, pa).call(this, "armor", v.id), be = De(((ut = (at = R == null ? void 0 : R.traitState) == null ? void 0 : at.reinforced) == null ? void 0 : ut.max) ?? ((ee = (Rt = v == null ? void 0 : v.traitState) == null ? void 0 : Rt.reinforced) == null ? void 0 : ee.max), 0), ue = be > 0 ? `${De(((rt = (Te = R == null ? void 0 : R.traitState) == null ? void 0 : Te.reinforced) == null ? void 0 : rt.current) ?? ((Je = (ot = v == null ? void 0 : v.traitState) == null ? void 0 : ot.reinforced) == null ? void 0 : Je.current), 0)}/${be}` : "", Ee = JS({
          defenseBonus: v.defenseBonus,
          mitigationByType: (R == null ? void 0 : R.mitigationByType) ?? (R == null ? void 0 : R.typedMitigation) ?? v.mitigationByType ?? {}
        });
        return {
          id: v.id,
          accordionId: K,
          isExpanded: H(this, Wt).has(K),
          name: v.name,
          img: v.img,
          subtitle: (W = v.tags) != null && W.length ? v.tags.join(", ") : "Armor",
          summaryStats: Va([
            { label: "Rating", value: De((R == null ? void 0 : R.ratingCurrent) ?? v.rating, 0), emphasis: "strong" },
            { label: "Res", value: De((R == null ? void 0 : R.baseMitigation) ?? (R == null ? void 0 : R.baseResistance), 0) },
            { label: "Def", value: De(v.defenseBonus, 0) },
            { label: "Dur", value: `${De(((pe = R == null ? void 0 : R.durability) == null ? void 0 : pe.current) ?? ((ci = v.durability) == null ? void 0 : ci.current), 0)}/${De(((Ot = R == null ? void 0 : R.durability) == null ? void 0 : Ot.max) ?? ((Ai = v.durability) == null ? void 0 : Ai.max), 0)}` }
          ]),
          detailTags: Gn([
            v.equipped ? "Equipped" : "",
            v.isPrimary ? "Primary" : "",
            ue ? `Reinforced ${ue}` : "",
            ...gi(v.traits ?? [])
          ]),
          detailRows: qn([
            { label: "Modifiers", value: Ee },
            { label: "Traits", value: gi(v.traits ?? []).join(", ") },
            { label: "Tags", value: gi(v.tags ?? []).join(", ") }
          ]),
          detailText: Kn(v.notes),
          equipped: !!v.equipped,
          isPrimary: !!v.isPrimary
        };
      }),
      gear: (((Ye = i.items) == null ? void 0 : Ye.gear) ?? []).map((v) => {
        const R = C(this, O, pa).call(this, "gear", v.id);
        return wc({
          item: v,
          accordionId: R,
          itemType: "gear",
          defaultSubtitle: "Gear",
          categoryLabels: YS,
          ratingLabel: "Rating",
          isEditable: this.isEditable,
          isExpanded: H(this, Wt).has(R)
        });
      }),
      // Consumables deliberately share the same quantity-tracked record model as
      // gear so stock editing and linked-source authoring stay transferable.
      consumables: (((st = i.items) == null ? void 0 : st.consumable) ?? []).map((v) => {
        const R = C(this, O, pa).call(this, "consumables", v.id);
        return wc({
          item: v,
          accordionId: R,
          itemType: "consumable",
          defaultSubtitle: "Consumable",
          categoryLabels: QS,
          ratingLabel: "Potency",
          typeLabel: "Consumable",
          isEditable: this.isEditable,
          isExpanded: H(this, Wt).has(R)
        });
      })
    }, i.bio = {
      fields: ((Qe = i.bio) == null ? void 0 : Qe.fields) ?? {},
      faction: ((tt = m.biography) == null ? void 0 : tt.faction) ?? "",
      age: ((Le = m.biography) == null ? void 0 : Le.age) ?? "",
      rank: ((it = m.biography) == null ? void 0 : it.rank) ?? "",
      height: ((yt = m.biography) == null ? void 0 : yt.height) ?? "",
      weight: ((bt = m.biography) == null ? void 0 : bt.weight) ?? "",
      xpTotal: ((Dt = (St = m.counters) == null ? void 0 : St.xp) == null ? void 0 : Dt.total) ?? 0,
      xpSpent: ((F = (N = m.counters) == null ? void 0 : N.xp) == null ? void 0 : F.value) ?? 0,
      experienceLevel: ((Ae = m.biography) == null ? void 0 : Ae.experienceLevel) ?? "green",
      enrichedHistory: await foundry.applications.ux.TextEditor.implementation.enrichHTML(
        ((ie = m.biography) == null ? void 0 : ie.history) ?? "",
        { async: !0, secrets: this.actor.isOwner, relativeTo: this.actor }
      )
    };
    const z = _i(this.actor);
    i.skillsDisplay = vu(((Re = this.actor) == null ? void 0 : Re.system) ?? {}, {
      bonusBySkill: z.bonusBySkill
    }), i.lifeModules = z.slotStates.map((v) => {
      const R = v.state;
      return {
        moduleType: v.moduleType,
        label: v.label,
        hasCatalogEntries: v.availableEntries.length > 0,
        emptyState: v.availableEntries.length > 0 ? `Add ${v.label}` : `No ${v.label} catalog entries configured`,
        item: R ? {
          id: R.itemId,
          name: R.label,
          img: R.item.img,
          bonusLabels: [...R.selectedChoiceLabels ?? []],
          warningLabels: [...R.warningLabels ?? []],
          isActive: R.isActive,
          statusLabel: R.isActive ? "Active" : "Inactive",
          statusReason: R.inactiveReason
        } : null
      };
    });
    const Y = ["positive", "negative", "narrative"], Q = ["major", "minor"], G = [...((At = i.items) == null ? void 0 : At.quality) ?? []].sort((v, R) => {
      const K = Gt(v.system ?? {}), be = Gt(R.system ?? {}), ue = Y.indexOf(K.category) - Y.indexOf(be.category);
      if (ue !== 0) return ue;
      const Ee = Q.indexOf(K.tier) - Q.indexOf(be.tier);
      return Ee !== 0 ? Ee : String(v.name ?? "").localeCompare(String(R.name ?? ""));
    });
    return i.qualityGroups = Y.map((v) => ({
      id: v,
      label: On(v),
      records: G.filter((R) => Gt(R.system ?? {}).category === v).map((R) => {
        var ue, Ee, je, at;
        const K = Gt(R.system ?? {}), be = C(this, O, pa).call(this, "quality", R.id);
        return {
          id: R.id,
          accordionId: be,
          isExpanded: H(this, Wt).has(be),
          name: R.name,
          img: R.img,
          subtitle: `${_n(K.tier)} ${On(K.category)}`,
          summaryStats: Va([
            { label: "Tier", value: _n(K.tier), emphasis: "strong" },
            { label: "Activation", value: K.activation || "passive" },
            { label: "Effects", value: String(((ue = K.effects) == null ? void 0 : ue.length) ?? 0) }
          ]),
          detailTags: Gn([
            K.inactive ? "Inactive" : "",
            ...K.tags ?? []
          ]),
          detailRows: qn([
            { label: "Category", value: On(K.category) },
            { label: "Tier", value: _n(K.tier) },
            { label: "Activation", value: K.activation || "passive" },
            { label: "Prerequisites", value: String(((Ee = K.prerequisites) == null ? void 0 : Ee.length) ?? 0) },
            { label: "Effects", value: String(((je = K.effects) == null ? void 0 : je.length) ?? 0) },
            { label: "Tags", value: gi(K.tags ?? []).join(", ") }
          ]),
          detailText: Kn((at = R.system) == null ? void 0 : at.description)
        };
      })
    })), i.assignedMech = this._buildAssignedMech(), i;
  }
  _buildAssignedMech() {
    var s;
    const t = this.actor.uuid, i = { light: "Light", medium: "Medium", heavy: "Heavy", assault: "Assault" }, n = (((s = game.actors) == null ? void 0 : s.contents) ?? []).filter(
      (r) => {
        var o, l;
        return (r.type === "battlemech" || r.type === "vehicle") && String(((l = (o = r.system) == null ? void 0 : o.pilot) == null ? void 0 : l.uuid) ?? "").trim() === t;
      }
    ).map((r) => {
      var Q, G, q, L, U, V, Z, re, ye, ce, se, Ie, Ue, He, Ye, st;
      const o = r.type === "battlemech", l = ((G = (Q = r.system) == null ? void 0 : Q.monitors) == null ? void 0 : G.structure) ?? {}, c = ((L = (q = r.system) == null ? void 0 : q.monitors) == null ? void 0 : L.armor) ?? {}, u = ((V = (U = r.system) == null ? void 0 : U.mwd) == null ? void 0 : V.heat) ?? {}, d = ((re = (Z = r.system) == null ? void 0 : Z.mwd) == null ? void 0 : re.heatStatus) ?? {}, m = ((ce = (ye = r.system) == null ? void 0 : ye.mwd) == null ? void 0 : ce.crits) ?? [], f = ((se = r.system) == null ? void 0 : se.quickActions) ?? {}, p = (Qe, tt, Le, it) => {
        var St;
        const yt = Math.max(0, De(it.value, 0)), bt = Math.max(0, De(it.max, 0));
        return {
          id: Qe,
          label: tt,
          kind: Le,
          value: yt,
          max: bt,
          resistance: De((St = it.resistance) == null ? void 0 : St.default, 0),
          segments: Array.from({ length: bt }, (Dt, N) => {
            const F = N + 1;
            return { value: F, filled: F <= yt };
          })
        };
      }, h = Math.max(0, De(u.current, 0)), g = Math.max(0, De(u.max, 0)), y = u.thresholds ?? {}, b = o ? {
        current: h,
        max: g,
        status: d.label ?? d.code ?? "safe",
        segments: Array.from({ length: g }, (Qe, tt) => {
          const Le = tt + 1;
          return {
            value: Le,
            filled: Le <= h,
            breakpoint: gi([
              Le === De(y.runningHot, 0) ? "runningHot" : "",
              Le === De(y.overheated, 0) ? "overheated" : "",
              Le === De(y.shutdown, 0) ? "shutdown" : ""
            ]).join(" ")
          };
        })
      } : null, S = Qd({ armor: c, structure: l }), w = Jd(m), M = o ? [p("structure", "Structure", "wound", l), p("armor", "Armor", "armor", c)] : [p("structure", "Structure", "wound", l)], P = Array.isArray((Ie = r.system) == null ? void 0 : Ie.weaponGroups) && r.system.weaponGroups.length > 0, E = Array.isArray((Ue = r.system) == null ? void 0 : Ue.meleeProfiles) && r.system.meleeProfiles.length > 0, z = f.primaryWeaponGroup ?? null, Y = o ? [
        { label: "Primary", hint: (z == null ? void 0 : z.name) ?? "Primary weapon group", handler: "mechAttack", disabled: !z, dataset: { attackKind: "primary", mechId: r.id } },
        { label: "Ranged", hint: "Prompt for a weapon group", handler: "mechAttack", disabled: !P, dataset: { attackKind: "ranged", mechId: r.id } },
        { label: "Melee", hint: "Prompt for a melee profile", handler: "mechAttack", disabled: !E, dataset: { attackKind: "melee", mechId: r.id } },
        { label: "Dodge", hint: "Piloting response", handler: "mechRoll", disabled: !1, dataset: { rollKind: "dodge", mechId: r.id } },
        { label: "Piloting", hint: "Vehicle handling test", handler: "mechRoll", disabled: !1, dataset: { rollKind: "piloting", mechId: r.id } },
        { label: "Sensors", hint: "Perception or technician", handler: "mechRoll", disabled: !f.hasSensorSweep, dataset: { rollKind: "sensor", mechId: r.id } },
        { label: "Repair", hint: "Technician quick check", handler: "mechRoll", disabled: !1, dataset: { rollKind: "repair", mechId: r.id } }
      ] : [];
      return {
        id: r.id,
        uuid: r.uuid,
        name: r.name,
        typeLabel: o ? "BattleMech" : "Vehicle",
        isMech: o,
        weightLabel: i[(Ye = (He = r.system) == null ? void 0 : He.mwd) == null ? void 0 : Ye.weightClass] ?? "",
        summaryStats: Va([
          { label: "Integrity", value: ((st = S.parts) == null ? void 0 : st.map((Qe) => Qe.value).join(" / ")) ?? "" },
          { label: "Heat", value: o ? `${h} / ${g}` : null },
          { label: "Status", value: w.count > 0 ? w.value : "OK" }
        ]),
        conditionMonitors: M,
        heat: b,
        critCount: m.length,
        quickActions: Y
      };
    });
    return { mechs: n, hasMech: n.length > 0 };
  }
  async _onOpenAssignedMech(t, i) {
    var r;
    const n = (r = i == null ? void 0 : i.dataset) == null ? void 0 : r.mechId, s = n ? game.actors.get(n) : null;
    s && s.sheet.render(!0, { focus: !0 });
  }
  async _onMechAttack(t, i) {
    var o, l, c, u, d, m;
    (o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t);
    const n = (c = i == null ? void 0 : i.dataset) == null ? void 0 : c.mechId, s = n ? game.actors.get(n) : null;
    if (!s) return;
    const r = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.attackKind) ?? "").trim();
    try {
      r === "melee" ? await ((d = s.rollMeleeAttack) == null ? void 0 : d.call(s)) : await ((m = s.rollRangedAttack) == null ? void 0 : m.call(s));
    } catch (f) {
      Yi(f, "Unable to launch BattleMech attack.");
    }
  }
  async _onMechRoll(t, i) {
    var o, l, c, u, d, m, f, p;
    (o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t);
    const n = (c = i == null ? void 0 : i.dataset) == null ? void 0 : c.mechId, s = n ? game.actors.get(n) : null;
    if (!s) return;
    const r = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.rollKind) ?? "").trim();
    try {
      r === "dodge" ? await ((d = s.rollDodge) == null ? void 0 : d.call(s)) : r === "piloting" ? await ((m = s.rollPilotingCheck) == null ? void 0 : m.call(s)) : r === "sensor" ? await ((f = s.rollSensorSweep) == null ? void 0 : f.call(s)) : r === "repair" && await ((p = s.rollEmergencyRepair) == null ? void 0 : p.call(s));
    } catch (h) {
      Yi(h, "Unable to launch BattleMech check.");
    }
  }
  _onRender(t, i) {
    super._onRender(t, i), C(this, O, dm).call(this), C(this, O, fm).call(this), C(this, O, pm).call(this);
  }
  async close(t = {}) {
    return C(this, O, Jr).call(this), C(this, O, Xr).call(this), super.close(t);
  }
  requestCombatDashboardRefresh() {
    C(this, O, Ne).call(this, { force: !0 });
  }
  async _onEdgeSet(t, i) {
    var c, u, d;
    if (t.preventDefault(), t.stopPropagation(), !this.isEditable) return;
    const n = ((c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-edge-pool][data-edge-value]")) ?? ((d = (u = t == null ? void 0 : t.target) == null ? void 0 : u.closest) == null ? void 0 : d.call(u, "[data-edge-pool][data-edge-value]"));
    if (!n) return;
    const s = String(n.dataset.edgePool ?? "").trim(), r = Number(n.dataset.edgeValue ?? NaN);
    if (!s || !Number.isFinite(r)) return;
    const o = this.actor.getEdgePool(s);
    if (!(o != null && o.hasPools)) return;
    let l = r;
    return r === o.effectiveValue && (l = r - 1), (t.button === 2 || t.type === "contextmenu") && (l = 0), t.altKey && (l = 0), t.shiftKey && (l = o.effectiveMax), this.actor.setEdgePoolValue(s, l);
  }
  async _onToggleCombatMenu(t, i) {
    var s, r, o, l, c, u, d;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.combatMenu) ?? ((d = (u = (c = (l = t == null ? void 0 : t.target) == null ? void 0 : l.closest) == null ? void 0 : c.call(l, "[data-combat-menu]")) == null ? void 0 : u.dataset) == null ? void 0 : d.combatMenu) ?? ""
    ).trim();
    n && ($e(this, Lt, H(this, Lt) === n ? null : n), C(this, O, Ne).call(this, !1));
  }
  async _onToggleStatuses(t, i) {
    var r, o, l, c, u, d, m, f;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), C(this, O, Ut).call(this, i, t, "Statuses are not available right now.") || !this.isEditable) return;
    const n = this.getPersistentActor() ?? this.actor, s = ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? ((u = B.getSnapshot(n, { token: ((c = this.getSheetTokenDocument) == null ? void 0 : c.call(this)) ?? null })) == null ? void 0 : u.tokenDocument) ?? ((m = B.getSnapshot(this.actor, { token: ((d = this.getSheetTokenDocument) == null ? void 0 : d.call(this)) ?? null })) == null ? void 0 : m.tokenDocument) ?? null;
    if (!s) {
      (f = ui.notifications) == null || f.warn("Statuses require a token for this actor on the current scene.");
      return;
    }
    return Lu({
      actor: n,
      token: s
    });
  }
  async _onCombatSpend(t, i) {
    var c, u, d, m, f, p, h, g, y, b;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), C(this, O, Ut).call(this, i, t, "That combat action is not available right now.") || !this.isEditable) return;
    const n = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.resource) ?? "").trim(), s = Math.max(0, Number(((m = i == null ? void 0 : i.dataset) == null ? void 0 : m.cost) ?? 0)), r = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.combatAction) ?? "").trim(), o = String(((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.combatLabel) ?? "").trim(), l = String(((h = i == null ? void 0 : i.dataset) == null ? void 0 : h.combatCostLabel) ?? "").trim();
    if (!(!n || !s || !r))
      try {
        const S = this.getPersistentActor() ?? this.actor, w = await B.spendResource(S, {
          token: ((g = this.getSheetTokenDocument) == null ? void 0 : g.call(this)) ?? B.getCurrentSceneTokenDocument(S) ?? B.getCurrentSceneTokenDocument(this.actor),
          resource: n,
          cost: s,
          actionId: r,
          actionLabel: o,
          actionCostLabel: l
        });
        if (!(w != null && w.ok)) {
          (y = ui.notifications) == null || y.warn((w == null ? void 0 : w.reason) ?? "Unable to spend action.");
          return;
        }
        C(this, O, Ft).call(this, { rerender: !1 }), C(this, O, Ne).call(this, { force: !0 });
      } catch (S) {
        console.error("MWD | Failed to spend combat action", S), (b = ui.notifications) == null || b.error("Unable to spend action.");
      }
  }
  async _onCombatAction(t, i) {
    var s, r, o, l, c, u;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t), C(this, O, Ut).call(this, i, t, "That combat action is not available right now.") || !this.isEditable) return;
    const n = String(((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.combatAction) ?? "").trim();
    if (n)
      try {
        const d = this.getPersistentActor() ?? this.actor, m = await C(this, O, hm).call(this, n);
        if (!m) return;
        const f = await B.executeAction(d, {
          token: ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? B.getCurrentSceneTokenDocument(d) ?? B.getCurrentSceneTokenDocument(this.actor),
          actionId: n,
          metadata: m
        });
        if (!(f != null && f.ok)) {
          (c = ui.notifications) == null || c.warn((f == null ? void 0 : f.reason) ?? "Unable to perform action.");
          return;
        }
        C(this, O, Ft).call(this, { rerender: !1 }), C(this, O, Ne).call(this, { force: !0 });
      } catch (d) {
        console.error("MWD | Failed to perform combat action", d), (u = ui.notifications) == null || u.error("Unable to perform action.");
      }
  }
  async _onCombatReduceBurn(t, i) {
    var n, s, r, o, l;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !C(this, O, Ut).call(this, i, t, "Burn recovery is not available right now.") && this.isEditable)
      try {
        const c = this.getPersistentActor() ?? this.actor, u = await B.reduceBurn(c, {
          token: ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? B.getCurrentSceneTokenDocument(c) ?? B.getCurrentSceneTokenDocument(this.actor)
        });
        if (!(u != null && u.ok)) {
          (o = ui.notifications) == null || o.warn((u == null ? void 0 : u.reason) ?? "Unable to reduce Burn.");
          return;
        }
        C(this, O, Ft).call(this, { rerender: !1 }), C(this, O, Ne).call(this, { force: !0 });
      } catch (c) {
        console.error("MWD | Failed to reduce Burn", c), (l = ui.notifications) == null || l.error("Unable to reduce Burn.");
      }
  }
  async _onCombatAssist(t, i) {
    var n, s, r, o, l, c, u;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !C(this, O, Ut).call(this, i, t, "Assist is not available right now.") && this.isEditable)
      try {
        const d = this.getPersistentActor() ?? this.actor, m = ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? B.getCurrentSceneTokenDocument(d) ?? B.getCurrentSceneTokenDocument(this.actor), f = B.getSnapshot(d, { token: m });
        if (!f.hasCombatant) {
          (o = ui.notifications) == null || o.warn("No combatant on the current scene.");
          return;
        }
        if (f.isCurrentTurn) {
          (l = ui.notifications) == null || l.warn("Only outside your activation.");
          return;
        }
        const p = await C(this, O, Sm).call(this, f);
        if (!p) return;
        const h = await B.executeAction(d, {
          token: m,
          actionId: "assist",
          metadata: {
            targetCombatantId: p.combatantId,
            targetActorUuid: p.actorUuid,
            targetTokenUuid: p.tokenUuid,
            targetName: p.name
          }
        });
        if (!(h != null && h.ok)) {
          (c = ui.notifications) == null || c.warn((h == null ? void 0 : h.reason) ?? "Unable to assist.");
          return;
        }
        await C(this, O, Am).call(this, {
          actor: d,
          token: m,
          target: p,
          costLabel: h.costLabel
        }), C(this, O, Ft).call(this, { rerender: !1 }), C(this, O, Ne).call(this, { force: !0 });
      } catch (d) {
        console.error("MWD | Failed to assist", d), (u = ui.notifications) == null || u.error("Unable to assist.");
      }
  }
  async _onCombatEvade(t, i) {
    var n, s, r, o, l;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !C(this, O, Ut).call(this, i, t, "Evade is not available right now.") && this.isEditable)
      try {
        const c = this.getPersistentActor() ?? this.actor, u = ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? B.getCurrentSceneTokenDocument(c) ?? B.getCurrentSceneTokenDocument(this.actor), d = await FS(c, { token: u });
        if (!(d != null && d.ok)) {
          (o = ui.notifications) == null || o.warn((d == null ? void 0 : d.reason) ?? "Unable to activate Evade.");
          return;
        }
        C(this, O, Ft).call(this, { rerender: !1 }), C(this, O, Ne).call(this, { force: !0 });
      } catch (c) {
        console.error("MWD | Failed to activate Evade", c), (l = ui.notifications) == null || l.error("Unable to activate Evade.");
      }
  }
  async _onCombatInterrupt(t, i) {
    var n, s, r, o, l, c, u, d;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !C(this, O, Ut).call(this, i, t, "Interrupt is not available right now.") && this.isEditable)
      try {
        const m = this.getPersistentActor() ?? this.actor, f = ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? B.getCurrentSceneTokenDocument(m) ?? B.getCurrentSceneTokenDocument(this.actor), p = B.getSnapshot(m, { token: f }), h = B.getPreparedInterrupt(p);
        if (!p.hasCombatant) {
          (o = ui.notifications) == null || o.warn("No combatant on the current scene.");
          return;
        }
        if (p.isCurrentTurn) {
          (l = ui.notifications) == null || l.warn("Only outside your activation.");
          return;
        }
        if (!h) {
          (c = ui.notifications) == null || c.warn("Prepare an interrupt first.");
          return;
        }
        if (!await C(this, O, gm).call(this, h)) return;
        const y = await B.executeAction(m, {
          token: f,
          actionId: "interrupt",
          metadata: h
        });
        if (!(y != null && y.ok)) {
          (u = ui.notifications) == null || u.warn((y == null ? void 0 : y.reason) ?? "Unable to interrupt.");
          return;
        }
        await B.clearPreparedInterrupt(m, { token: f }), await C(this, O, Tm).call(this, {
          actor: m,
          token: f,
          preparedInterrupt: h,
          costLabel: y.costLabel
        }), C(this, O, Ft).call(this, { rerender: !1 }), C(this, O, Ne).call(this, { force: !0 });
      } catch (m) {
        console.error("MWD | Failed to interrupt", m), (d = ui.notifications) == null || d.error("Unable to interrupt.");
      }
  }
  async _onCombatOverloadCheck(t, i) {
    var r, o, l, c, u, d, m, f, p, h, g;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), C(this, O, Ut).call(this, i, t, "Overload check is not available right now.") || !this.isEditable) return;
    const n = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.roll) ?? ((m = (d = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : d.dataset) == null ? void 0 : m.roll);
    if (!n) return;
    let s;
    try {
      s = JSON.parse(n);
    } catch (y) {
      console.warn("MWD | Invalid overload payload", n, y);
      return;
    }
    try {
      const y = this.getPersistentActor() ?? this.actor, b = await ((h = (p = (f = game.mwd) == null ? void 0 : f.roll) == null ? void 0 : p.execute) == null ? void 0 : h.call(p, { actor: y, payload: s, event: t }));
      if (C(this, O, Ft).call(this, { rerender: !1 }), !b) {
        C(this, O, Ne).call(this, !1);
        return;
      }
      C(this, O, Ne).call(this, { force: !0 });
    } catch (y) {
      console.error("MWD | Failed to launch overload check", y), (g = ui.notifications) == null || g.error("Unable to launch overload check.");
    }
  }
  async _onCombatAttack(t, i) {
    var m, f, p, h, g, y, b, S, w, M, P, E, z, Y, Q, G, q, L, U, V, Z, re, ye;
    if ((m = t == null ? void 0 : t.preventDefault) == null || m.call(t), (f = t == null ? void 0 : t.stopPropagation) == null || f.call(t), C(this, O, Ut).call(this, i, t, "Attack is not available right now.") || !this.isEditable) return;
    const n = this.getPersistentActor() ?? this.actor, s = ((p = this.getSheetTokenDocument) == null ? void 0 : p.call(this)) ?? B.getCurrentSceneTokenDocument(n) ?? B.getCurrentSceneTokenDocument(this.actor), r = String(((h = i == null ? void 0 : i.dataset) == null ? void 0 : h.combatAction) ?? "attack").trim() || "attack", o = String(((g = i == null ? void 0 : i.dataset) == null ? void 0 : g.combatLabel) ?? (r === "opportunity" ? "Opportunity" : "Attack")).trim() || "Attack", l = r === "opportunity", c = B.getSnapshot(n, { token: s }), u = !!((b = (y = c.state) == null ? void 0 : y.actionState) != null && b.aim);
    if (!c.hasCombatant) {
      (S = ui.notifications) == null || S.warn("No combatant on the current scene.");
      return;
    }
    if (l && c.isCurrentTurn) {
      (w = ui.notifications) == null || w.warn("Only outside your activation.");
      return;
    }
    if (!l && !c.isCurrentTurn) {
      (M = ui.notifications) == null || M.warn("Only available during your activation.");
      return;
    }
    if (!l && c.overloaded) {
      (P = ui.notifications) == null || P.warn("Overloaded actors can only recover Burn.");
      return;
    }
    if (!l) {
      const ce = 3 + Math.floor((Math.max(0, Number(((Y = (z = (E = n.system) == null ? void 0 : E.attributes) == null ? void 0 : z.reflexes) == null ? void 0 : Y.value) ?? 0)) + Math.max(0, Number(((q = (G = (Q = n.system) == null ? void 0 : Q.attributes) == null ? void 0 : G.willpower) == null ? void 0 : q.value) ?? 0))) / 2);
      if (Math.max(0, ce - Math.max(0, Number(((L = c.state) == null ? void 0 : L.saSpentThisActivation) ?? 0))) < 2) {
        (U = ui.notifications) == null || U.warn("Activation SA cap reached.");
        return;
      }
    }
    const d = {
      intent: "attack",
      mode: "auto",
      fallback: "unarmed",
      edge: { pool: "physical.grit", allowed: ["pre", "post"] },
      tags: l ? ["combat", "attack", "reaction", "opportunity"] : ["combat", "attack"],
      aim: u ? { active: !0 } : null,
      sourceTokenId: (s == null ? void 0 : s.id) ?? null
    };
    try {
      const ce = await ((re = (Z = (V = game.mwd) == null ? void 0 : V.roll) == null ? void 0 : Z.execute) == null ? void 0 : re.call(Z, { actor: n, payload: d, event: t }));
      if (C(this, O, Ft).call(this, { rerender: !1 }), !ce) {
        C(this, O, Ne).call(this, !1);
        return;
      }
      u && await B.clearAim(n, { token: s });
      const se = l ? await B.executeAction(n, {
        token: s,
        actionId: "opportunity"
      }) : await B.spendResource(n, {
        token: s,
        resource: "sa",
        cost: 2,
        actionId: "attack",
        actionLabel: "Attack",
        actionCostLabel: "2 SA",
        actionCategory: "complex"
      });
      se != null && se.ok || (ye = ui.notifications) == null || ye.warn((se == null ? void 0 : se.reason) ?? `Unable to spend ${o} action.`), C(this, O, Ne).call(this, { force: !0 });
    } catch (ce) {
      console.error(`MWD | Failed to launch ${o}`, ce), Yi(ce, `Unable to launch ${o}.`);
    }
  }
  async _onAddSkillSpecialization(t, i) {
    var d, m, f, p;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable || !this.editing) return;
    const n = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.skillKey) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = Rr(s.system ?? {}, n), o = Ts(s.system ?? {}, n), l = Xi(n).filter((h) => !o.includes(h.key));
    if (l.length === 0) return;
    let c = ((p = l[0]) == null ? void 0 : p.key) ?? "";
    if (l.length > 1) {
      const h = `<form class="mwd-quick-select"><div class="mwd-field"><label>Specialization</label><select name="specialization">${l.map((g) => `<option value="${g.key}">${g.label}</option>`).join("")}</select></div></form>`;
      c = await foundry.applications.api.DialogV2.prompt({
        window: { title: "Add Skill Specialization" },
        content: h,
        ok: {
          label: "Add",
          callback: (g, y) => {
            var b, S;
            return ((b = y.form.elements.specialization) == null ? void 0 : b.value) ?? ((S = l[0]) == null ? void 0 : S.key) ?? "";
          }
        }
      });
    }
    const u = es(
      r.concat([c])
    );
    await s.update({
      [`system.skills.${n}.specializations`]: u
    }), C(this, O, Ne).call(this, { force: !0 });
  }
  async _onRemoveSkillSpecialization(t, i) {
    var l, c, u, d;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable || !this.editing) return;
    const n = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.skillKey) ?? "").trim(), s = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.specializationKey) ?? "").trim();
    if (!n || !s) return;
    const r = this.getPersistentActor() ?? this.actor, o = es(
      Rr(r.system ?? {}, n).filter((m) => m !== s)
    );
    await r.update({
      [`system.skills.${n}.specializations`]: o
    }), C(this, O, Ne).call(this, { force: !0 });
  }
  async _onCreateLifeModuleItem(t, i) {
    var d, m, f, p, h;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable) return;
    const n = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.moduleType) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = Ko(n);
    if (!r.length) {
      (p = ui.notifications) == null || p.warn(`No ${Na(n)} life modules are configured in game settings.`);
      return;
    }
    const o = await kc({
      title: `Choose ${Na(n)} Life Module`,
      label: "Life Module",
      confirmLabel: "Create",
      options: r.map((g) => ({
        value: g.id,
        label: g.label
      }))
    });
    if (!o) return;
    const l = Di(o);
    if (!l) {
      (h = ui.notifications) == null || h.warn("That life module catalog entry no longer exists.");
      return;
    }
    const c = md(l, {}), u = {};
    for (const g of c.filter((y) => y.hasMultipleChoices)) {
      const y = await kc({
        title: `Choose Bonus for ${l.label}`,
        label: g.label,
        confirmLabel: "Apply",
        options: g.options.map((b) => ({
          value: b.value,
          label: b.label
        }))
      });
      if (!y) return;
      u[g.id] = y;
    }
    await s.createEmbeddedDocuments("Item", [{
      name: l.label,
      type: "lifeModule",
      system: sn({
        moduleType: n,
        catalogId: l.id,
        selectedGrants: u
      })
    }]), C(this, O, Ne).call(this, { force: !0 });
  }
  async _onCreateOwnedItem(t, i) {
    var l, c, u;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable) return;
    const n = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.itemType) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = s.items.filter((d) => d.type === n).length, o = n === "personalWeapon" ? "Personal Weapon" : n === "armor" ? "Armor" : n === "consumable" ? "Consumable" : n.charAt(0).toUpperCase() + n.slice(1);
    await s.createEmbeddedDocuments("Item", [{
      name: `${o} ${r + 1}`,
      type: n
    }]), C(this, O, Ne).call(this, { force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var s, r, o;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = C(this, O, ki).call(this, i, t);
    (o = n == null ? void 0 : n.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var r, o;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = C(this, O, ki).call(this, i, t);
    if (!n) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [n.id]), C(this, O, Ne).call(this, { force: !0 });
  }
  async _onToggleInventoryAccordion(t, i) {
    var s, r, o, l, c, u, d, m, f, p;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.accordionId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((p = (f = (m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-accordion-id]")) == null ? void 0 : f.dataset) == null ? void 0 : p.accordionId) ?? ""
    ).trim();
    n && (H(this, Wt).has(n) ? H(this, Wt).delete(n) : H(this, Wt).add(n), C(this, O, Ne).call(this, !1));
  }
  async _onToggleOwnedItemEquipped(t, i) {
    var r, o, l, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = C(this, O, ki).call(this, i, t);
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor;
    await ((c = s.setOwnedItemEquipped) == null ? void 0 : c.call(s, n.id, !((l = n.system) != null && l.equipped))), C(this, O, Ne).call(this, { force: !0 });
  }
  async _onSetOwnedItemPrimary(t, i) {
    var r, o, l, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = C(this, O, ki).call(this, i, t);
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor;
    await ((c = s.setOwnedItemPrimary) == null ? void 0 : c.call(s, n.id, !((l = n.system) != null && l.isPrimary))), C(this, O, Ne).call(this, { force: !0 });
  }
  async _onAdjustGearQuantity(t, i) {
    var c, u, d, m, f, p, h, g, y, b, S;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const n = C(this, O, ki).call(this, i, t);
    if (!n || !["gear", "consumable"].includes(String(n.canonicalType ?? n.type ?? "").trim())) return;
    const s = Math.trunc(Number(
      ((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.delta) ?? ((p = (f = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, "[data-delta]")) == null ? void 0 : f.dataset) == null ? void 0 : p.delta) ?? ((b = (y = (g = (h = t == null ? void 0 : t.target) == null ? void 0 : h.closest) == null ? void 0 : g.call(h, "[data-delta]")) == null ? void 0 : y.dataset) == null ? void 0 : b.delta) ?? 0
    ) || 0);
    if (!s) return;
    const o = (this.getPersistentActor() ?? this.actor).items.get(n.id) ?? n, l = Math.max(0, Math.trunc(Number(((S = o.system) == null ? void 0 : S.quantity) ?? 1) || 0) + s);
    await o.update({ "system.quantity": l }), C(this, O, Ne).call(this, { force: !0 });
  }
  async _onAttackWeapon(t, i) {
    var l, c, u, d;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), C(this, O, Ut).call(this, i, t, "Equip that weapon before attacking.")) return;
    const n = C(this, O, ki).call(this, i, t);
    if (!((u = n == null ? void 0 : n.isPersonalWeapon) != null && u.call(n))) return;
    const s = this.getPersistentActor() ?? this.actor, r = ((d = this.getSheetTokenDocument) == null ? void 0 : d.call(this)) ?? B.getCurrentSceneTokenDocument(s) ?? B.getCurrentSceneTokenDocument(this.actor);
    await zs({ weapon: n, event: t, token: r }) && C(this, O, Ne).call(this, { force: !0 });
  }
};
Lt = new WeakMap(), Pi = new WeakMap(), Wi = new WeakMap(), Wt = new WeakMap(), va = new WeakMap(), O = new WeakSet(), dm = function() {
  C(this, O, Jr).call(this), H(this, Lt) && ($e(this, Pi, (t) => {
    var s;
    const i = this._getRootElement();
    if (!i) return;
    const n = t.target;
    if (n instanceof Node && !((s = n.closest) != null && s.call(n, ".mwd-combat-menu"))) {
      if (!i.contains(n)) {
        C(this, O, Ft).call(this);
        return;
      }
      C(this, O, Ft).call(this);
    }
  }), document.addEventListener("click", H(this, Pi)));
}, Jr = function() {
  H(this, Pi) && (document.removeEventListener("click", H(this, Pi)), $e(this, Pi, null));
}, Vn = function() {
  const t = this._getRootElement();
  return t ? t.querySelector(".mwd-scroll-area") ?? t.querySelector(".csb-tab-panels") : null;
}, mm = function() {
  const t = C(this, O, Vn).call(this);
  if (!(t instanceof HTMLElement)) {
    $e(this, Wi, null);
    return;
  }
  $e(this, Wi, {
    top: t.scrollTop,
    left: t.scrollLeft
  });
}, fm = function() {
  const t = H(this, Wi);
  if (!t) return;
  const i = C(this, O, Vn).call(this);
  i instanceof HTMLElement && (i.scrollTop = t.top, i.scrollLeft = t.left, requestAnimationFrame(() => {
    const n = C(this, O, Vn).call(this);
    n instanceof HTMLElement && (n.scrollTop = t.top, n.scrollLeft = t.left);
  }), $e(this, Wi, null));
}, Ne = function(t = !1) {
  C(this, O, mm).call(this), this.render(t);
}, Ft = function({ rerender: t = !0 } = {}) {
  H(this, Lt) && ($e(this, Lt, null), t && C(this, O, Ne).call(this, !1));
}, ki = function(t, i) {
  var s, r, o, l, c, u, d, m;
  const n = String(
    ((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.itemId) ?? ((l = (o = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((m = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
  ).trim();
  return n ? this.actor.items.get(n) ?? null : null;
}, pm = function() {
  var n;
  const t = (n = this._getRootElement) == null ? void 0 : n.call(this);
  if (!t) return;
  C(this, O, Xr).call(this);
  const i = new AbortController();
  $e(this, va, i), t.addEventListener("dragstart", (s) => {
    var c, u, d;
    const r = (u = (c = s.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-weapon-attack-uuid]");
    if (!r || !t.contains(r)) return;
    const o = C(this, O, ki).call(this, r, s), l = o ? lm(o) : null;
    if (!l) {
      s.preventDefault();
      return;
    }
    s.stopPropagation(), (d = s.dataTransfer) == null || d.setData("text/plain", JSON.stringify(l)), s.dataTransfer && (s.dataTransfer.effectAllowed = "copy");
  }, { signal: i.signal });
}, Xr = function() {
  var t;
  (t = H(this, va)) == null || t.abort(), $e(this, va, null);
}, hm = async function(t) {
  if (t !== "prepare") return {};
  const n = await Dialog.prompt({
    title: "Prepare Interrupt",
    content: `
    <form class="mwd-quick-select">
      <div class="mwd-field">
        <label>Trigger</label>
        <input type="text" name="condition" placeholder="When..." />
      </div>
      <div class="mwd-field">
        <label>Scope</label>
        <input type="text" name="scope" placeholder="What you will do" />
      </div>
    </form>`,
    label: "Prepare",
    callback: (s) => ({
      condition: String(s.find('input[name="condition"]').val() ?? "").trim(),
      scope: String(s.find('input[name="scope"]').val() ?? "").trim()
    })
  });
  return n || null;
}, gm = async function(t = {}) {
  const i = String((t == null ? void 0 : t.condition) ?? "").trim(), n = String((t == null ? void 0 : t.scope) ?? "").trim(), s = `
    <div class="mwd-quick-select">
      <p><strong>Trigger:</strong> ${Tt(i || "Unspecified trigger")}</p>
      <p><strong>Scope:</strong> ${Tt(n || "Unspecified response")}</p>
    </div>`;
  return !!await Dialog.confirm({
    title: "Resolve Interrupt",
    content: s,
    yes: () => !0,
    no: () => !1
  });
}, ym = function(t) {
  return t != null && t.combatants ? typeof t.combatants.values == "function" ? Array.from(t.combatants.values()) : Array.from(t.combatants ?? []) : [];
}, bm = function(t) {
  var n;
  const i = String(((n = t == null ? void 0 : t.combatant) == null ? void 0 : n.id) ?? "").trim();
  return C(this, O, ym).call(this, t == null ? void 0 : t.combat).filter((s) => s && String(s.id ?? "").trim() !== i).map((s) => {
    var c;
    const r = ((c = s.token) == null ? void 0 : c.document) ?? s.token ?? null, o = s.actor ?? (r == null ? void 0 : r.actor) ?? null, l = String(s.name ?? (r == null ? void 0 : r.name) ?? (o == null ? void 0 : o.name) ?? "Combatant").trim() || "Combatant";
    return {
      combatantId: String(s.id ?? "").trim(),
      actorUuid: (o == null ? void 0 : o.uuid) ?? null,
      tokenUuid: (r == null ? void 0 : r.uuid) ?? null,
      name: l
    };
  }).filter((s) => s.combatantId && s.name).sort((s, r) => s.name.localeCompare(r.name));
}, Sm = async function(t) {
  var r;
  const i = C(this, O, bm).call(this, t);
  if (!i.length)
    return (r = ui.notifications) == null || r.warn("No other combatants are available to assist."), null;
  const n = `
    <form class="mwd-quick-select">
      <div class="mwd-field">
        <label>Assist</label>
        <select name="combatant">
          ${i.map((o) => `<option value="${Tt(o.combatantId)}">${Tt(o.name)}</option>`).join("")}
        </select>
      </div>
    </form>`, s = await Dialog.prompt({
    title: "Assist Combatant",
    content: n,
    label: "Assist",
    callback: (o) => {
      var l;
      return String(o.find('select[name="combatant"]').val() ?? ((l = i[0]) == null ? void 0 : l.combatantId) ?? "").trim();
    }
  });
  return s ? i.find((o) => o.combatantId === s) ?? null : null;
}, Am = async function({ actor: t, token: i = null, target: n = null, costLabel: s = "" } = {}) {
  const r = String((t == null ? void 0 : t.name) ?? "Ally").trim() || "Ally", o = String((n == null ? void 0 : n.name) ?? "an ally").trim() || "an ally", l = String(s ?? "").trim(), c = `
    <div class="mwd-chat-card mwd-chat-card--assist">
      <h3>Assist</h3>
      <p><strong>${Tt(r)}</strong> assists <strong>${Tt(o)}</strong>.</p>
      ${l ? `<p><small>Cost: ${Tt(l)}</small></p>` : ""}
    </div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: t, token: (i == null ? void 0 : i.object) ?? i }),
    content: c
  });
}, Tm = async function({ actor: t, token: i = null, preparedInterrupt: n = null, costLabel: s = "" } = {}) {
  const r = String((t == null ? void 0 : t.name) ?? "Combatant").trim() || "Combatant", o = String((n == null ? void 0 : n.condition) ?? "").trim(), l = String((n == null ? void 0 : n.scope) ?? "").trim(), c = String(s ?? "").trim(), u = `
    <div class="mwd-chat-card mwd-chat-card--interrupt">
      <h3>Interrupt</h3>
      <p><strong>${Tt(r)}</strong> resolves a prepared interrupt.</p>
      ${o ? `<p><strong>Trigger:</strong> ${Tt(o)}</p>` : ""}
      ${l ? `<p><strong>Scope:</strong> ${Tt(l)}</p>` : ""}
      ${c ? `<p><small>Cost: ${Tt(c)}</small></p>` : ""}
    </div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: t, token: (i == null ? void 0 : i.object) ?? i }),
    content: u
  });
}, Ut = function(t, i, n = "That action is not available right now.") {
  var o, l, c, u, d;
  const s = ((o = t == null ? void 0 : t.closest) == null ? void 0 : o.call(t, "[data-action-disabled='true']")) ?? ((c = (l = i == null ? void 0 : i.target) == null ? void 0 : l.closest) == null ? void 0 : c.call(l, "[data-action-disabled='true']"));
  if (!s) return !1;
  const r = String(((u = s.dataset) == null ? void 0 : u.actionReason) ?? n).trim() || n;
  return (d = ui.notifications) == null || d.warn(r), !0;
}, pa = function(t, i) {
  return `${String(t ?? "").trim()}:${String(i ?? "").trim()}`;
}, D(me, "PARTS", {
  sheet: {
    get template() {
      return `${X}/v2/actor/character-sheet.hbs`;
    }
  }
}), D(me, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Qt(me, me, "DEFAULT_OPTIONS"), {
  classes: ["character-sheet", T, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
  window: { minWidth: 450, minHeight: 740, resizable: !0 },
  position: { width: 980, height: 900 },
  actions: {
    ...Qt(me, me, "DEFAULT_OPTIONS").actions,
    edgeSet: me.prototype._onEdgeSet,
    toggleCombatMenu: me.prototype._onToggleCombatMenu,
    toggleStatuses: me.prototype._onToggleStatuses,
    combatAction: me.prototype._onCombatAction,
    combatSpend: me.prototype._onCombatSpend,
    combatAssist: me.prototype._onCombatAssist,
    combatEvade: me.prototype._onCombatEvade,
    combatInterrupt: me.prototype._onCombatInterrupt,
    combatReduceBurn: me.prototype._onCombatReduceBurn,
    combatOverloadCheck: me.prototype._onCombatOverloadCheck,
    combatAttack: me.prototype._onCombatAttack,
    createOwnedItem: me.prototype._onCreateOwnedItem,
    addSkillSpecialization: me.prototype._onAddSkillSpecialization,
    removeSkillSpecialization: me.prototype._onRemoveSkillSpecialization,
    createLifeModuleItem: me.prototype._onCreateLifeModuleItem,
    editOwnedItem: me.prototype._onEditOwnedItem,
    deleteOwnedItem: me.prototype._onDeleteOwnedItem,
    toggleInventoryAccordion: me.prototype._onToggleInventoryAccordion,
    toggleOwnedItemEquipped: me.prototype._onToggleOwnedItemEquipped,
    setOwnedItemPrimary: me.prototype._onSetOwnedItemPrimary,
    adjustGearQuantity: me.prototype._onAdjustGearQuantity,
    attackWeapon: me.prototype._onAttackWeapon,
    openAssignedMech: me.prototype._onOpenAssignedMech,
    mechAttack: me.prototype._onMechAttack,
    mechRoll: me.prototype._onMechRoll
  }
}, { inplace: !1 }));
let Qr = me;
function tA(a, e, t = "") {
  const i = foundry.utils.getProperty(a, e);
  return i === void 0 ? t : i;
}
function sl(a, e, t = {}) {
  const {
    document: i = null,
    type: n = "text",
    value: s = tA(i, a, n === "number" ? 0 : ""),
    displayValue: r = s,
    options: o = [],
    placeholder: l = "",
    readOnly: c = !1,
    rows: u = 4,
    help: d = ""
  } = t;
  return {
    path: a,
    label: e,
    value: s,
    displayValue: r,
    placeholder: l,
    readOnly: c,
    rows: u,
    help: d,
    options: o,
    isText: n === "text",
    isNumber: n === "number",
    isSelect: n === "select",
    isTextarea: n === "textarea"
  };
}
function vc(a, e, t, i = {}) {
  return sl(e, t, { ...i, document: a, type: "text" });
}
function ha(a, e, t, i = {}) {
  return sl(e, t, { ...i, document: a, type: "number" });
}
function iA(a, e, t, i = {}) {
  return sl(e, t, { ...i, document: a, type: "textarea" });
}
function aA(a, e = []) {
  return e.map(
    (t) => ha(
      a,
      `system.attributes.${t.key}.value`,
      t.label
    )
  );
}
function Pn(a, {
  types: e = [],
  includeTypes: t = [],
  describe: i = (o) => "",
  supportsEquip: n = !1,
  supportsPrimary: s = !1,
  supportsAttack: r = !1
} = {}) {
  const o = new Set([...e ?? [], ...t ?? []].map((l) => String(l ?? "").trim()));
  return Array.from((a == null ? void 0 : a.items) ?? []).filter((l) => o.has(String((l == null ? void 0 : l.canonicalType) ?? (l == null ? void 0 : l.type) ?? "").trim())).sort((l, c) => String(l.name ?? "").localeCompare(String(c.name ?? ""))).map((l) => {
    var c, u, d;
    return {
      id: l.id,
      name: l.name || "Item",
      subtitle: String(i(l) ?? "").trim(),
      equipped: !!((c = l.system) != null && c.equipped),
      isPrimary: !!((u = l.system) != null && u.isPrimary),
      supportsEquip: n,
      supportsPrimary: s,
      supportsAttack: r && !!((d = l.isPersonalWeapon) != null && d.call(l))
    };
  });
}
class wm extends ln {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["npc-sheet", T, "actor-sheet-v2"],
      position: { width: 920, height: 860 }
    }, { inplace: !1 });
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), i = this.actor;
    return t.layout = await aa.get("npc"), t.actorSheet = {
      profileFields: [
        vc(i, "system.role", "Role / Archetype")
      ],
      attributeFields: aA(i, [
        { key: "strength", label: "Strength" },
        { key: "reflexes", label: "Reflexes" },
        { key: "intelligence", label: "Intelligence" },
        { key: "willpower", label: "Willpower" },
        { key: "charisma", label: "Charisma" },
        { key: "edge", label: "Edge" }
      ]),
      monitorFields: [
        ha(i, "system.monitors.physical.value", "Physical"),
        ha(i, "system.monitors.physical.max", "Physical Max"),
        ha(i, "system.monitors.fatigue.value", "Fatigue"),
        ha(i, "system.monitors.fatigue.max", "Fatigue Max"),
        ha(i, "system.monitors.armor.value", "Armor"),
        vc(i, "system.monitors.armor.effect", "Armor Effect")
      ],
      itemCollections: {
        traits: Pn(i, {
          types: ["quality"],
          describe: (n) => {
            var s;
            return ((s = n.system) == null ? void 0 : s.category) ?? "";
          }
        }),
        weapons: Pn(i, {
          types: ["personalWeapon"],
          supportsEquip: !0,
          supportsPrimary: !0,
          describe: (n) => {
            var s, r;
            return `${((s = n.system) == null ? void 0 : s.category) ?? "ranged"} | DV ${Number(((r = n.system) == null ? void 0 : r.damage) ?? 0)}`;
          }
        }),
        assetModules: Pn(i, {
          types: ["assetModule"],
          describe: (n) => {
            var s;
            return `Level ${Number(((s = n.system) == null ? void 0 : s.level) ?? 1)}`;
          }
        }),
        inventory: Pn(i, {
          // Consumables share the same quantity-driven row contract as gear on
          // lightweight actor sheets, so we present them in one inventory list.
          types: ["gear", "consumable"],
          describe: (n) => {
            var s, r;
            return `Qty ${Number(((s = n.system) == null ? void 0 : s.quantity) ?? 1)} | Rating ${Number(((r = n.system) == null ? void 0 : r.rating) ?? 0)}`;
          }
        })
      },
      notesField: iA(i, "system.biography", "Notes", { rows: 12 })
    }, t;
  }
}
D(wm, "PARTS", {
  sheet: {
    template: `${X}/v2/actor/npc-sheet.hbs`,
    scrollable: [".sheet-body"]
  }
});
const { ApplicationV2: nA, HandlebarsApplicationMixin: sA } = foundry.applications.api, Xa = class Xa extends sA(nA) {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      id: "select-actor",
      classes: ["select-actor", "anarchy-dialog"],
      position: { width: 300, height: "auto" },
      window: {
        resizable: !0
      }
    }, { inplace: !1 });
  }
  static async selectActor(e, t, i = async (s) => {
  }, n = async () => {
  }) {
    var o, l, c, u;
    const s = {
      id: `select-actor-${foundry.utils.randomID()}`,
      classes: [((u = (c = (l = (o = game.system) == null ? void 0 : o.mwd) == null ? void 0 : l.styles) == null ? void 0 : c.selectCssClass) == null ? void 0 : u.call(c)) ?? "", ...Xa.DEFAULT_OPTIONS.classes].filter(Boolean),
      window: { title: e }
    };
    return new Xa({ actors: t, onActorSelected: i, onCancel: n }, s).render({ force: !0 });
  }
  constructor(e = {}, t = {}) {
    super(e, t), this.actors = e.actors, this.onActorSelected = e.onActorSelected, this.onCancel = e.onCancel, this._actorSelected = !1;
  }
  async _prepareContext() {
    return { actors: this.actors };
  }
  async activateListeners(e) {
    const t = e instanceof HTMLElement ? e : e[0];
    await super.activateListeners(t);
    const i = $(t);
    i.find(".click-select-actor").click((n) => this.onSelectActor(n)), i.find('[data-action="cancel"]').on("click", async () => await this.close());
  }
  async onSelectActor(e) {
    const t = $(e.currentTarget).attr("data-actor-id"), i = this.actors.find((n) => n.id == t);
    i && (this._actorSelected = !0, await this.onActorSelected(i), await this.close());
  }
  async close(e) {
    return !this._actorSelected && this.onCancel && await this.onCancel(), super.close(e);
  }
};
D(Xa, "PARTS", {
  body: {
    template: `${X}/dialog/select-actor.hbs`
  }
});
let Zr = Xa;
function ct(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function km(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function rA(a) {
  return String(a ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function oA(a, e = 180) {
  const t = rA(a);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function ba(a = "") {
  return String(a ?? "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (e) => e.toUpperCase());
}
function cr(a = []) {
  return a.map((e) => {
    const t = e ?? {};
    return {
      ...t,
      label: String(t.label ?? "").trim(),
      value: String(t.value ?? "").trim(),
      emphasis: t.emphasis ?? "",
      title: String(t.title ?? "").trim(),
      tone: String(t.tone ?? "").trim(),
      parts: Array.isArray(t.parts) ? t.parts.filter((i) => i && i.value !== void 0 && i.value !== null && String(i.value).trim() !== "").map((i) => ({
        label: String(i.label ?? "").trim(),
        value: String(i.value ?? "").trim(),
        tone: String(i.tone ?? "").trim(),
        title: String(i.title ?? "").trim()
      })) : []
    };
  }).filter((e) => e.value !== "" || e.parts.length).map((e) => ({
    ...e,
    hasParts: e.parts.length > 0
  }));
}
function lA(a = []) {
  return km(a).map((e) => ({ label: e }));
}
function Mc(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
function cA(a = {}) {
  return ["close", "near", "far", "extreme", "max"].filter((i) => (a == null ? void 0 : a[i]) !== void 0 && (a == null ? void 0 : a[i]) !== null && String(a[i]).trim() !== "").map((i) => {
    const n = a[i];
    return i === "max" ? `Max ${ba(n)}` : `${ba(i)} ${ct(n, 0)}`;
  }).join(" | ");
}
const uA = Object.freeze({
  handling: "Handling",
  system: "System",
  chassis: "Chassis",
  condition: "Condition"
}), Cc = Object.freeze({
  mechWeapon: "BattleMech Weapon",
  vehicleWeapon: "Vehicle Weapon",
  personalWeapon: "Personal Weapon",
  assetModule: "Asset Module",
  vehicleUpgrade: "Vehicle Upgrade",
  mechEquipment: "Mech Equipment",
  gear: "Gear",
  quality: "Trait",
  skill: "Skill"
});
var Ki, dn, eo;
const qe = class qe extends ln {
  constructor() {
    super(...arguments);
    Ce(this, dn);
    Ce(this, Ki, /* @__PURE__ */ new Set());
  }
  async _prepareContext(t) {
    var n, s, r, o;
    const i = await super._prepareContext(t);
    return i._mwdThemeClass = ((o = (r = (s = (n = game.system) == null ? void 0 : n.mwd) == null ? void 0 : s.styles) == null ? void 0 : r.selectCssClass) == null ? void 0 : o.call(r)) ?? "", i.layout = await aa.get(this.constructor.LAYOUT_ID ?? qe.LAYOUT_ID), i.vehicleSheet = {
      summaryStats: this._buildSummaryStats(),
      alerts: this._buildAlerts(),
      statusAction: {
        label: "Statuses",
        disabled: !this._resolveStatusToken(this.getPersistentActor() ?? this.actor),
        reason: "Statuses require a token for this actor on the current scene."
      },
      activeCrits: this._buildActiveCrits(),
      attributes: this._buildAttributeCards(),
      sections: this._buildVehicleSections(),
      pilotPanel: await this._buildPilotPanel()
    }, i.conditionMonitors = this._buildConditionMonitors(), i;
  }
  async _buildPilotPanel() {
    var n, s;
    const t = String(((s = (n = this.actor.system) == null ? void 0 : n.pilot) == null ? void 0 : s.uuid) ?? "").trim();
    let i = null;
    if (t)
      try {
        i = await fromUuid(t);
      } catch {
      }
    return {
      uuid: t,
      linked: !!i,
      name: (i == null ? void 0 : i.name) ?? null,
      id: (i == null ? void 0 : i.id) ?? null,
      canEdit: !!this.isEditable
    };
  }
  async _onAssignPilot(t, i) {
    var s, r;
    if (!this.isEditable) return;
    const n = (((s = game.actors) == null ? void 0 : s.contents) ?? []).filter((o) => o.type === "character");
    if (!n.length) {
      (r = ui.notifications) == null || r.warn("No character actors found in this world.");
      return;
    }
    await Zr.selectActor(
      "Assign Pilot",
      n,
      async (o) => this.actor.update({ "system.pilot.uuid": o.uuid })
    );
  }
  async _onRemovePilot(t, i) {
    this.isEditable && await this.actor.update({ "system.pilot.uuid": "" });
  }
  async _onOpenPilot(t, i) {
    var r, o;
    const n = String(((o = (r = this.actor.system) == null ? void 0 : r.pilot) == null ? void 0 : o.uuid) ?? "").trim();
    if (!n) return;
    const s = await fromUuid(n).catch(() => null);
    s && s.sheet.render(!0, { focus: !0 });
  }
  async _onDrop(t) {
    var n, s;
    if (!this.isEditable) return (n = super._onDrop) == null ? void 0 : n.call(this, t);
    let i;
    try {
      i = TextEditor.getDragEventData(t);
    } catch {
    }
    if ((i == null ? void 0 : i.type) === "Actor") {
      const r = await fromUuid(i.uuid).catch(() => null);
      if ((r == null ? void 0 : r.type) === "character") {
        await this.actor.update({ "system.pilot.uuid": r.uuid });
        return;
      }
    }
    return (s = super._onDrop) == null ? void 0 : s.call(this, t);
  }
  _buildSummaryStats() {
    var n, s, r, o, l, c, u;
    const t = ((n = this.actor.system) == null ? void 0 : n.attributes) ?? {}, i = ((r = (s = this.actor.system) == null ? void 0 : s.monitors) == null ? void 0 : r.structure) ?? {};
    return cr([
      { label: "Handling", value: ct((o = t.handling) == null ? void 0 : o.value, 0), emphasis: "strong" },
      { label: "System", value: ct((l = t.system) == null ? void 0 : l.value, 0) },
      { label: "Chassis", value: ct((c = t.chassis) == null ? void 0 : c.value, 0) },
      { label: "Condition", value: ct((u = t.condition) == null ? void 0 : u.value, 0) },
      { label: "Structure", value: `${ct(i.value, 0)} / ${ct(i.max, 0)}` }
    ]);
  }
  _buildAlerts() {
    return [];
  }
  _buildAttributeCards() {
    var i;
    const t = ((i = this.actor.system) == null ? void 0 : i.attributes) ?? {};
    return Object.entries(uA).map(([n, s]) => {
      var r;
      return {
        key: n,
        label: s,
        value: ct((r = t == null ? void 0 : t[n]) == null ? void 0 : r.value, 0),
        path: `system.attributes.${n}.value`
      };
    });
  }
  _buildConditionMonitors() {
    var i, n, s, r, o;
    const t = ((n = (i = this.actor.system) == null ? void 0 : i.monitors) == null ? void 0 : n.structure) ?? ((o = (r = (s = this.actor.system) == null ? void 0 : s.mwd) == null ? void 0 : r.monitors) == null ? void 0 : o.structure) ?? {};
    return [{
      id: "structure",
      label: "Structure",
      kind: "wound",
      editable: !!this.isEditable,
      value: Math.max(0, ct(t.value, 0)),
      max: Math.max(0, ct(t.max, 0)),
      segments: Array.from({ length: Math.max(0, ct(t.max, 0)) }, (l, c) => {
        const u = c + 1;
        return {
          value: u,
          filled: u <= Math.max(0, ct(t.value, 0))
        };
      }),
      status: {
        label: "Resist",
        value: ct(t.resistance, 0)
      }
    }];
  }
  _buildVehicleSections() {
    var i, n;
    const t = ((n = (i = this.actor.system) == null ? void 0 : i.mwd) == null ? void 0 : n.items) ?? {};
    return {
      weapons: this._buildRecordSection({
        sectionId: "weapons",
        itemType: "vehicleWeapon",
        addLabel: "Add Weapon",
        emptyLabel: "No vehicle weapons configured.",
        items: t.vehicleWeapons ?? []
      }),
      upgrades: this._buildRecordSection({
        sectionId: "upgrades",
        itemType: "vehicleUpgrade",
        addLabel: "Add Upgrade",
        emptyLabel: "No vehicle upgrades installed.",
        items: t.vehicleUpgrades ?? []
      }),
      modules: this._buildRecordSection({
        sectionId: "modules",
        itemType: "assetModule",
        addLabel: "Add Module",
        emptyLabel: "No asset modules assigned.",
        items: t.assetModules ?? []
      }),
      gear: this._buildRecordSection({
        sectionId: "gear",
        itemType: "gear",
        addLabel: "Add Gear",
        emptyLabel: "No stored gear.",
        items: t.gear ?? []
      })
    };
  }
  _buildRecordSection({ sectionId: t = "", itemType: i = "", addLabel: n = "", emptyLabel: s = "", items: r = [] } = {}) {
    return {
      sectionId: t,
      itemType: i,
      addLabel: String(n ?? "").trim(),
      emptyLabel: String(s ?? "Nothing here yet.").trim(),
      records: Array.from(r ?? []).map((o) => this._buildItemRecord(o, { sectionId: t }))
    };
  }
  _buildItemRecord(t, { sectionId: i = "" } = {}) {
    var f, p, h;
    const n = (t == null ? void 0 : t.system) ?? {}, s = (t == null ? void 0 : t.canonicalType) ?? (t == null ? void 0 : t.type) ?? "", r = typeof (t == null ? void 0 : t.getCombatProfile) == "function" ? t.getCombatProfile() : null, o = `${String(i ?? "").trim()}:${String((t == null ? void 0 : t.id) ?? "").trim()}`, l = Cc[s] ?? ba(s || "item"), c = n.notes ?? n.description ?? ((f = n.references) == null ? void 0 : f.description) ?? "", u = n.quantity, d = cr(r ? [
      { label: "DV", value: ct(r.damage, 0), emphasis: "strong" },
      { label: "AP", value: ct(r.ap, 0) },
      { label: "Type", value: r.damageTypeLabel ?? r.damageType ?? "" }
    ] : [
      { label: "Type", value: l },
      ...u !== void 0 ? [{ label: "Qty", value: ct(u, 0) }] : []
    ]), m = Mc(r ? [
      { label: "Skill", value: ((p = r.skillDef) == null ? void 0 : p.label) ?? r.skill ?? "" },
      { label: "Category", value: r.category ?? n.weaponCategory ?? n.category ?? "" },
      { label: "Range", value: cA(r.range) }
    ] : [
      { label: "Category", value: n.category ?? l },
      { label: "Quantity", value: u !== void 0 ? ct(u, 0) : "" }
    ]);
    return {
      id: (t == null ? void 0 : t.id) ?? "",
      accordionId: o,
      isExpanded: H(this, Ki).has(o),
      name: (t == null ? void 0 : t.name) ?? l,
      img: (t == null ? void 0 : t.img) ?? "icons/svg/item-bag.svg",
      subtitle: ((h = r == null ? void 0 : r.skillDef) == null ? void 0 : h.label) ?? n.category ?? l,
      summaryStats: d,
      detailTags: lA([
        n.equipped ? "Equipped" : "",
        n.isPrimary ? "Primary" : "",
        n.weaponCategory ?? n.category ?? ""
      ]),
      detailRows: m,
      detailText: oA(c),
      equipped: !!n.equipped,
      isPrimary: !!n.isPrimary,
      canAdjustQuantity: !1,
      machineAttack: ["mechWeapon", "vehicleWeapon"].includes(s) ? {
        label: "Attack",
        itemId: (t == null ? void 0 : t.id) ?? ""
      } : null
    };
  }
  async _onCreateOwnedItem(t, i) {
    var l, c, u;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable) return;
    const n = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.itemType) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = Cc[n] ?? ba(n), o = s.items.filter((d) => d.type === n).length;
    await s.createEmbeddedDocuments("Item", [{
      name: `${r} ${o + 1}`,
      type: n
    }]), this.render({ force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var s, r, o;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = C(this, dn, eo).call(this, i, t);
    (o = n == null ? void 0 : n.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var r, o;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = C(this, dn, eo).call(this, i, t);
    if (!n) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [n.id]), this.render({ force: !0 });
  }
  async _onToggleInventoryAccordion(t, i) {
    var s, r, o, l, c, u, d, m, f, p;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.accordionId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((p = (f = (m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-accordion-id]")) == null ? void 0 : f.dataset) == null ? void 0 : p.accordionId) ?? ""
    ).trim();
    n && (H(this, Ki).has(n) ? H(this, Ki).delete(n) : H(this, Ki).add(n), this.render({ force: !1 }));
  }
  _buildActiveCrits() {
    var i;
    const t = ((i = this.getPersistentActor) == null ? void 0 : i.call(this)) ?? this.actor;
    return Od(t).map((n) => {
      const s = qo(n.remedyKey);
      return {
        id: n.id,
        label: n.label ?? ba(n.key),
        locationLabel: n.locationLabel ?? ba(n.locationKey),
        detail: km([
          Array.isArray(n.gates) && n.gates.length ? `Gates: ${n.gates.join(", ")}` : "",
          Array.isArray(n.mods) && n.mods.length ? `Mods: ${n.mods.join(", ")}` : "",
          n.escalationKey ? `Escalates: ${n.escalationKey}` : ""
        ]).join(" | "),
        remedyLabel: s.label,
        remedyKey: s.key,
        remediable: s.remediable !== !1,
        machineActorUuid: (t == null ? void 0 : t.uuid) ?? ""
      };
    });
  }
  async _onToggleStatuses(t, i) {
    var r, o, l, c, u, d;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.actionDisabled) === "true")
      return (u = ui.notifications) == null || u.warn(((c = i == null ? void 0 : i.dataset) == null ? void 0 : c.actionReason) || "Statuses are not available right now."), !1;
    const n = this.getPersistentActor() ?? this.actor, s = this._resolveStatusToken(n);
    return s ? Lu({
      actor: n,
      token: s
    }) : ((d = ui.notifications) == null || d.warn("Statuses require a token for this actor on the current scene."), !1);
  }
  async _onMachineWeaponAttack(t, i) {
    var u, d, m, f, p, h, g, y, b, S, w, M;
    (u = t == null ? void 0 : t.preventDefault) == null || u.call(t), (d = t == null ? void 0 : t.stopPropagation) == null || d.call(t);
    const n = this.getPersistentActor() ?? this.actor, s = String(((m = i == null ? void 0 : i.dataset) == null ? void 0 : m.itemId) ?? "").trim(), r = s ? (p = (f = n.items) == null ? void 0 : f.get) == null ? void 0 : p.call(f, s) : null;
    if (!r)
      return (h = ui.notifications) == null || h.warn("That weapon is no longer available."), !1;
    const o = ((g = game.mwd) == null ? void 0 : g.roll) ?? ((b = (y = game.system) == null ? void 0 : y.mwd) == null ? void 0 : b.roll);
    if (!(o != null && o.execute))
      return (S = ui.notifications) == null || S.error("MWD roll system not initialized."), !1;
    const l = this._resolveStatusToken(n), c = await o.execute({
      actor: n,
      payload: {
        intent: "attack",
        weaponId: r.id,
        edge: { pool: "physical.grit", allowed: ["pre", "post"] },
        tags: ["combat", "attack", "machine"],
        sourceTokenId: (l == null ? void 0 : l.id) ?? null
      },
      event: t
    });
    if (c) {
      const P = ((w = B.getSnapshot) == null ? void 0 : w.call(B, n, { token: l })) ?? null;
      if (P != null && P.hasCombatant) {
        const E = await B.spendResource(n, {
          token: l,
          resource: "sa",
          cost: 2,
          actionId: "attack",
          actionLabel: "Attack",
          actionCostLabel: "2 SA",
          actionCategory: "complex"
        });
        E != null && E.ok || (M = ui.notifications) == null || M.warn((E == null ? void 0 : E.reason) ?? "Unable to record attack action.");
      }
    }
    return !!c;
  }
  async _onMachineCritRemedy(t, i) {
    var r, o, l, c, u, d, m;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const n = this.getPersistentActor() ?? this.actor, s = await nm({
      intent: "machine_crit_remedy",
      machineActorUuid: ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.machineActorUuid) ?? n.uuid,
      critId: ((c = i == null ? void 0 : i.dataset) == null ? void 0 : c.critId) ?? "",
      remedyKey: ((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.remedyKey) ?? ""
    }, {
      gmOverride: !!((d = game.user) != null && d.isGM)
    });
    return s.ok ? (this.render({ force: !0 }), !0) : ((m = ui.notifications) == null || m.warn(s.reason ?? "Unable to resolve machine critical remedy."), !1);
  }
  _resolveStatusToken(t = this.actor) {
    var i, n, s, r, o, l, c, u, d;
    return ((i = this.getSheetTokenDocument) == null ? void 0 : i.call(this)) ?? ((n = t == null ? void 0 : t.token) == null ? void 0 : n.document) ?? (t == null ? void 0 : t.token) ?? ((o = (r = (s = t == null ? void 0 : t.getActiveTokens) == null ? void 0 : s.call(t, !0, !0)) == null ? void 0 : r[0]) == null ? void 0 : o.document) ?? ((c = (l = t == null ? void 0 : t.getActiveTokens) == null ? void 0 : l.call(t, !0, !0)) == null ? void 0 : c[0]) ?? ((d = Array.from(((u = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : u.placeables) ?? []).find((m) => {
      var f;
      return ((f = m == null ? void 0 : m.actor) == null ? void 0 : f.id) && m.actor.id === (t == null ? void 0 : t.id);
    })) == null ? void 0 : d.document) ?? null;
  }
};
Ki = new WeakMap(), dn = new WeakSet(), eo = function(t, i) {
  var s, r, o, l, c, u, d, m;
  const n = String(
    ((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.itemId) ?? ((l = (o = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((m = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
  ).trim();
  return n ? this.actor.items.get(n) ?? null : null;
}, D(qe, "LAYOUT_ID", "vehicle"), D(qe, "PARTS", {
  sheet: {
    get template() {
      return `${X}/v2/actor/vehicle-sheet.hbs`;
    }
  }
}), D(qe, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Qt(qe, qe, "DEFAULT_OPTIONS"), {
  classes: ["vehicle-sheet", T, "actor-sheet-v2", "mwd-vehicle-sheet", "mwd-sheet"],
  window: { minWidth: 520, minHeight: 720, resizable: !0 },
  position: { width: 940, height: 900 },
  actions: {
    ...Qt(qe, qe, "DEFAULT_OPTIONS").actions,
    createOwnedItem: qe.prototype._onCreateOwnedItem,
    editOwnedItem: qe.prototype._onEditOwnedItem,
    deleteOwnedItem: qe.prototype._onDeleteOwnedItem,
    toggleInventoryAccordion: qe.prototype._onToggleInventoryAccordion,
    machineWeaponAttack: qe.prototype._onMachineWeaponAttack,
    toggleStatuses: qe.prototype._onToggleStatuses,
    machineCritRemedy: qe.prototype._onMachineCritRemedy,
    assignPilot: qe.prototype._onAssignPilot,
    removePilot: qe.prototype._onRemovePilot,
    openPilot: qe.prototype._onOpenPilot
  }
}, { inplace: !1 }));
let ls = qe;
function lt(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function vm(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function _t(a = "") {
  return String(a ?? "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (e) => e.toUpperCase());
}
function ur(a = []) {
  return a.map((e) => {
    const t = e ?? {};
    return {
      ...t,
      label: String(t.label ?? "").trim(),
      value: String(t.value ?? "").trim(),
      emphasis: t.emphasis ?? "",
      title: String(t.title ?? "").trim(),
      tone: String(t.tone ?? "").trim(),
      parts: Array.isArray(t.parts) ? t.parts.filter((i) => i && i.value !== void 0 && i.value !== null && String(i.value).trim() !== "").map((i) => ({
        label: String(i.label ?? "").trim(),
        value: String(i.value ?? "").trim(),
        tone: String(i.tone ?? "").trim(),
        title: String(i.title ?? "").trim()
      })) : []
    };
  }).filter((e) => e.value !== "" || e.parts.length).map((e) => ({
    ...e,
    hasParts: e.parts.length > 0
  }));
}
function Ec(a = []) {
  return vm(a).map((e) => ({ label: e }));
}
function Pc(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
function zi(a = "") {
  var t, i;
  const e = ((i = (t = k == null ? void 0 : k.actor) == null ? void 0 : t.vehicle) == null ? void 0 : i.quickActions) ?? {};
  return String((e == null ? void 0 : e[a]) ?? _t(a)).trim() || _t(a);
}
var mn, io;
const Ht = class Ht extends ls {
  constructor() {
    super(...arguments);
    Ce(this, mn);
  }
  async _prepareContext(t) {
    const i = await super._prepareContext(t);
    return i.battlemechSheet = {
      heat: this._buildHeatModel(),
      quickActions: this._buildQuickActions(),
      weaponGroups: this._buildWeaponGroups(),
      hardpoints: this._buildHardpoints(),
      chassisFields: this._buildChassisFields()
    }, i;
  }
  _buildChassisFields() {
    var s, r, o, l;
    const t = lt((r = (s = this.actor.system) == null ? void 0 : s.mwd) == null ? void 0 : r.tonnage, 0), i = ((l = (o = this.actor.system) == null ? void 0 : o.mwd) == null ? void 0 : l.weightClass) ?? "medium", n = { light: "Light", medium: "Medium", heavy: "Heavy", assault: "Assault" };
    return [
      {
        label: "Tonnage",
        path: "system.mwd.tonnage",
        isNumber: !0,
        value: t,
        displayValue: String(t)
      },
      {
        label: "Weight Class",
        path: "system.mwd.weightClass",
        isSelect: !0,
        value: i,
        displayValue: n[i] ?? _t(i),
        options: [
          { value: "light", label: "Light", selected: i === "light" },
          { value: "medium", label: "Medium", selected: i === "medium" },
          { value: "heavy", label: "Heavy", selected: i === "heavy" },
          { value: "assault", label: "Assault", selected: i === "assault" }
        ]
      }
    ];
  }
  _buildConditionMonitors() {
    var s, r, o, l;
    const t = ((r = (s = this.actor.system) == null ? void 0 : s.monitors) == null ? void 0 : r.structure) ?? {}, i = ((l = (o = this.actor.system) == null ? void 0 : o.monitors) == null ? void 0 : l.armor) ?? {}, n = (c, u, d, m) => {
      var f;
      return {
        id: c,
        label: u,
        kind: d,
        editable: !!this.isEditable,
        value: Math.max(0, lt(m.value, 0)),
        max: Math.max(0, lt(m.max, 0)),
        segments: Array.from({ length: Math.max(0, lt(m.max, 0)) }, (p, h) => {
          const g = h + 1;
          return {
            value: g,
            filled: g <= Math.max(0, lt(m.value, 0))
          };
        }),
        status: {
          label: "Resist",
          value: lt((f = m.resistance) == null ? void 0 : f.default, 0)
        }
      };
    };
    return [
      n("structure", "Structure", "wound", t),
      n("armor", "Armor", "armor", i)
    ];
  }
  _buildSummaryStats() {
    var u, d, m, f, p, h, g, y, b, S, w, M, P, E;
    const t = ((d = (u = this.actor.system) == null ? void 0 : u.monitors) == null ? void 0 : d.armor) ?? {}, i = ((f = (m = this.actor.system) == null ? void 0 : m.monitors) == null ? void 0 : f.structure) ?? {}, n = ((h = (p = this.actor.system) == null ? void 0 : p.mwd) == null ? void 0 : h.heat) ?? {}, s = ((y = (g = this.actor.system) == null ? void 0 : g.mwd) == null ? void 0 : y.heatStatus) ?? {}, r = s.label ?? _t(s.code ?? "safe"), o = r.toUpperCase(), l = Qd({ armor: t, structure: i }), c = Jd(((S = (b = this.actor.system) == null ? void 0 : b.mwd) == null ? void 0 : S.crits) ?? []);
    return ur([
      { label: "Weight", value: _t(((M = (w = this.actor.system) == null ? void 0 : w.mwd) == null ? void 0 : M.weightClass) ?? "medium"), emphasis: "strong" },
      { label: "Tonnage", value: lt((E = (P = this.actor.system) == null ? void 0 : P.mwd) == null ? void 0 : E.tonnage, 0) },
      { label: "Integrity", parts: l.parts, title: l.title },
      { label: "Heat", value: `${lt(n.current, 0)} / ${lt(n.max, 0)} ${o}`, title: r },
      { label: "Status", value: c.value, title: c.title, tone: c.count > 0 ? "red" : "" }
    ]);
  }
  _buildAlerts() {
    var i, n;
    const t = ((n = (i = this.actor.system) == null ? void 0 : i.mwd) == null ? void 0 : n.loadout) ?? {};
    return [
      ...Array.isArray(t.errors) ? t.errors.map((s) => ({ tone: "danger", text: s })) : [],
      ...Array.isArray(t.warnings) ? t.warnings.map((s) => ({ tone: "warning", text: s })) : []
    ];
  }
  _buildVehicleSections() {
    var i, n;
    const t = ((n = (i = this.actor.system) == null ? void 0 : i.mwd) == null ? void 0 : n.items) ?? {};
    return {
      weapons: this._buildRecordSection({
        sectionId: "weapons",
        itemType: "mechWeapon",
        addLabel: "Add Weapon",
        emptyLabel: "No BattleMech weapons configured.",
        items: t.mechWeapons ?? []
      }),
      equipment: this._buildRecordSection({
        sectionId: "equipment",
        itemType: "mechEquipment",
        addLabel: "Add Equipment",
        emptyLabel: "No BattleMech equipment installed.",
        items: t.mechEquipment ?? []
      }),
      modules: this._buildRecordSection({
        sectionId: "modules",
        itemType: "assetModule",
        addLabel: "Add Module",
        emptyLabel: "No asset modules installed.",
        items: t.assetModules ?? []
      }),
      gear: this._buildRecordSection({
        sectionId: "gear",
        itemType: "gear",
        addLabel: "Add Gear",
        emptyLabel: "No stored gear.",
        items: t.gear ?? []
      })
    };
  }
  _buildHeatModel() {
    var o, l, c, u;
    const t = ((l = (o = this.actor.system) == null ? void 0 : o.mwd) == null ? void 0 : l.heat) ?? {}, i = ((u = (c = this.actor.system) == null ? void 0 : c.mwd) == null ? void 0 : u.heatStatus) ?? {}, n = Math.max(0, lt(t.current, 0)), s = Math.max(0, lt(t.max, 0)), r = t.thresholds ?? {};
    return {
      label: "Heat",
      current: n,
      max: s,
      editable: !!this.isEditable,
      status: i.label ?? _t(i.code ?? "safe"),
      thresholds: {
        runningHot: lt(r.runningHot, 0),
        overheated: lt(r.overheated, 0),
        shutdown: lt(r.shutdown, 0)
      },
      segments: Array.from({ length: s }, (d, m) => {
        const f = m + 1;
        return {
          value: f,
          filled: f <= n,
          breakpoint: vm([
            f === lt(r.runningHot, 0) ? "runningHot" : "",
            f === lt(r.overheated, 0) ? "overheated" : "",
            f === lt(r.shutdown, 0) ? "shutdown" : ""
          ]).join(" ")
        };
      })
    };
  }
  _buildQuickActions() {
    var r, o, l;
    const t = ((r = this.actor.system) == null ? void 0 : r.quickActions) ?? {}, i = t.primaryWeaponGroup ?? null, n = Array.isArray((o = this.actor.system) == null ? void 0 : o.weaponGroups) && this.actor.system.weaponGroups.length > 0, s = Array.isArray((l = this.actor.system) == null ? void 0 : l.meleeProfiles) && this.actor.system.meleeProfiles.length > 0;
    return [
      {
        label: zi("primaryWeapons"),
        hint: (i == null ? void 0 : i.name) ?? "Primary weapon group",
        handler: "mechAttack",
        disabled: !i,
        dataset: { attackKind: "primary" }
      },
      {
        label: zi("rangedAttack"),
        hint: "Prompt for a weapon group",
        handler: "mechAttack",
        disabled: !n,
        dataset: { attackKind: "ranged" }
      },
      {
        label: zi("meleeAttack"),
        hint: "Prompt for a melee profile",
        handler: "mechAttack",
        disabled: !s,
        dataset: { attackKind: "melee" }
      },
      {
        label: zi("dodgeCheck"),
        hint: "Piloting response",
        handler: "mechRoll",
        disabled: !1,
        dataset: { rollKind: "dodge" }
      },
      {
        label: zi("pilotingCheck"),
        hint: "Vehicle handling test",
        handler: "mechRoll",
        disabled: !1,
        dataset: { rollKind: "piloting" }
      },
      {
        label: zi("sensorSweep"),
        hint: "Perception or technician",
        handler: "mechRoll",
        disabled: !t.hasSensorSweep,
        dataset: { rollKind: "sensor" }
      },
      {
        label: zi("emergencyRepair"),
        hint: "Technician quick check",
        handler: "mechRoll",
        disabled: !1,
        dataset: { rollKind: "repair" }
      }
    ];
  }
  _buildWeaponGroups() {
    var i, n;
    return (Array.isArray((n = (i = this.actor.system) == null ? void 0 : i.mwd) == null ? void 0 : n.weaponGroupDetails) ? this.actor.system.mwd.weaponGroupDetails : []).map((s) => ({
      id: s.id,
      name: s.name,
      subtitle: (s.weapons ?? []).map((r) => r.name).join(", "),
      summaryStats: ur([
        { label: "Weapons", value: Array.isArray(s.weapons) ? s.weapons.length : 0, emphasis: "strong" },
        { label: "Missing", value: Array.isArray(s.missingWeaponIds) ? s.missingWeaponIds.length : 0 }
      ]),
      detailTags: Ec([
        s.isPrimary ? "Primary" : "",
        ...Array.isArray(s.weapons) ? s.weapons.map((r) => {
          var o;
          return ((o = r.system) == null ? void 0 : o.weaponCategory) ?? "";
        }) : []
      ]),
      detailRows: Pc([
        { label: "Weapon Names", value: (s.weapons ?? []).map((r) => r.name).join(", ") },
        { label: "Missing IDs", value: (s.missingWeaponIds ?? []).join(", ") }
      ]),
      action: {
        label: "Attack Group",
        dataset: {
          attackKind: "group",
          groupId: s.id
        }
      }
    }));
  }
  _buildHardpoints() {
    var r, o, l, c, u;
    const t = ((o = (r = this.actor.system) == null ? void 0 : r.mwd) == null ? void 0 : o.loadout) ?? {}, i = ((l = k == null ? void 0 : k.mwd) == null ? void 0 : l.hardpointType) ?? {}, n = ((c = k == null ? void 0 : k.mwd) == null ? void 0 : c.hardpointSize) ?? {}, s = ((u = k == null ? void 0 : k.mwd) == null ? void 0 : u.hardpointLocation) ?? {};
    return Array.from(t.hardpoints ?? []).map((d) => ({
      id: d.id,
      name: `${i[d.type] ?? _t(d.type)} ${n[d.size] ?? _t(d.size)}`,
      subtitle: s[d.location] ?? _t(d.location),
      summaryStats: ur([
        { label: "Type", value: i[d.type] ?? _t(d.type), emphasis: "strong" },
        { label: "Size", value: n[d.size] ?? _t(d.size) }
      ]),
      detailTags: Ec([
        d.occupiedByName ? `Occupied by ${d.occupiedByName}` : "Open"
      ]),
      detailRows: Pc([
        { label: "Location", value: s[d.location] ?? _t(d.location) },
        { label: "Assigned Group", value: d.occupiedByName ?? "Unassigned" }
      ])
    }));
  }
  async _onMechAttack(t, i) {
    var o, l, c, u, d, m, f, p;
    (o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t);
    const n = this.getPersistentActor() ?? this.actor, s = String(((c = i == null ? void 0 : i.dataset) == null ? void 0 : c.attackKind) ?? "").trim(), r = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.groupId) ?? "").trim();
    try {
      if (s === "group" && r)
        await C(this, mn, io).call(this, n, r);
      else if (s === "primary") {
        const h = (((d = n.system) == null ? void 0 : d.weaponGroups) ?? []).find((g) => g == null ? void 0 : g.isPrimary) ?? null;
        h != null && h.id ? await C(this, mn, io).call(this, n, h.id) : await ((m = n.rollRangedAttack) == null ? void 0 : m.call(n));
      } else s === "melee" ? await ((f = n.rollMeleeAttack) == null ? void 0 : f.call(n)) : await ((p = n.rollRangedAttack) == null ? void 0 : p.call(n));
    } catch (h) {
      console.error("MWD | Failed to launch BattleMech attack", h), Yi(h, "Unable to launch that BattleMech attack.");
    }
  }
  async _onMechRoll(t, i) {
    var r, o, l, c, u, d, m;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const n = this.getPersistentActor() ?? this.actor, s = String(((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.rollKind) ?? "").trim();
    try {
      s === "dodge" ? await ((c = n.rollDodge) == null ? void 0 : c.call(n)) : s === "piloting" ? await ((u = n.rollPilotingCheck) == null ? void 0 : u.call(n)) : s === "sensor" ? await ((d = n.rollSensorSweep) == null ? void 0 : d.call(n)) : s === "repair" && await ((m = n.rollEmergencyRepair) == null ? void 0 : m.call(n));
    } catch (f) {
      console.error("MWD | Failed to launch BattleMech check", f), Yi(f, "Unable to launch that BattleMech check.");
    }
  }
};
mn = new WeakSet(), io = async function(t, i) {
  var c, u, d, m, f, p, h, g, y;
  const n = Array.from(((c = t.system) == null ? void 0 : c.weaponGroups) ?? []).find((b) => String((b == null ? void 0 : b.id) ?? "").trim() === String(i ?? "").trim()) ?? null;
  if (!n) {
    (u = ui.notifications) == null || u.warn("That weapon group is no longer available.");
    return;
  }
  if (!Array.from(n.weaponIds ?? []).map((b) => t.items.get(b)).filter(Boolean).length) {
    (d = ui.notifications) == null || d.warn("That weapon group has no attached weapons.");
    return;
  }
  const r = ((m = game.mwd) == null ? void 0 : m.roll) ?? ((p = (f = game.system) == null ? void 0 : f.mwd) == null ? void 0 : p.roll);
  if (!(r != null && r.execute)) {
    await ((h = t.rollRangedAttack) == null ? void 0 : h.call(t));
    return;
  }
  const o = this._resolveStatusToken(t);
  if (await r.execute({
    actor: t,
    payload: {
      intent: "attack",
      weaponGroupId: n.id,
      edge: { pool: "physical.grit", allowed: ["pre", "post"] },
      tags: ["combat", "attack", "machine", "groupFire"],
      sourceTokenId: (o == null ? void 0 : o.id) ?? null
    }
  })) {
    const b = ((g = B.getSnapshot) == null ? void 0 : g.call(B, t, { token: o })) ?? null;
    if (b != null && b.hasCombatant) {
      const S = await B.spendResource(t, {
        token: o,
        resource: "sa",
        cost: 2,
        actionId: "attack",
        actionLabel: "Attack",
        actionCostLabel: "2 SA",
        actionCategory: "complex"
      });
      S != null && S.ok || (y = ui.notifications) == null || y.warn((S == null ? void 0 : S.reason) ?? "Unable to record attack action.");
    }
  }
}, D(Ht, "LAYOUT_ID", "battlemech"), D(Ht, "PARTS", {
  sheet: {
    get template() {
      return `${X}/v2/actor/battlemech-sheet.hbs`;
    }
  }
}), D(Ht, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Qt(Ht, Ht, "DEFAULT_OPTIONS"), {
  classes: ["battlemech-sheet", T, "actor-sheet-v2", "mwd-battlemech-sheet", "mwd-sheet"],
  position: { width: 980, height: 940 },
  actions: {
    ...Qt(Ht, Ht, "DEFAULT_OPTIONS").actions,
    mechAttack: Ht.prototype._onMechAttack,
    mechRoll: Ht.prototype._onMechRoll
  }
}, { inplace: !1 }));
let to = Ht;
function dA() {
  console.log(`${Me}Registering Actor sheets (V2)`);
  const { Actors: a } = foundry.documents.collections;
  a.registerSheet(T, Qr, {
    types: ["character"],
    makeDefault: !0,
    label: "Character (V2)"
  }), a.registerSheet(T, wm, {
    types: ["npc"],
    makeDefault: !0,
    label: "NPC (V2)"
  }), a.registerSheet(T, ls, {
    types: ["vehicle"],
    makeDefault: !0,
    label: "Vehicle (V2)"
  }), a.registerSheet(T, to, {
    types: ["battlemech"],
    makeDefault: !0,
    label: "BattleMech (V2)"
  });
}
const { HandlebarsApplicationMixin: mA } = foundry.applications.api, { HTMLField: Rc, StringField: fA } = foundry.data.fields, dr = /* @__PURE__ */ new Set(["system.notes", "system.description"]), pA = /* @__PURE__ */ new Set(["name"]), hA = Object.freeze({
  [A.itemType.personalWeapon]: `${X}/v2/item/personal-weapon-root.hbs`,
  [A.itemType.mechWeapon]: `${X}/v2/item/mech-weapon-root.hbs`,
  [A.itemType.armor]: `${X}/v2/item/armor-root.hbs`
});
function mr(a, e) {
  const t = new a({ required: !1, blank: !0, initial: "" });
  return t.name = e, t;
}
function gA(a = {}) {
  return {
    ...a,
    sourceReference: a.sourceReference ?? mr(fA, "system.sourceReference"),
    notes: a.notes ?? mr(Rc, "system.notes"),
    description: a.description ?? mr(Rc, "system.description")
  };
}
function yA(a = {}) {
  return Object.fromEntries(
    Object.entries(a ?? {}).filter(([, e]) => e !== void 0)
  );
}
var Gi, Ri, qi, Ma, ni, Ya, ao;
const et = class et extends mA(foundry.applications.sheets.ItemSheetV2) {
  constructor() {
    super(...arguments);
    Ce(this, ni);
    Ce(this, Gi, /* @__PURE__ */ new Map());
    Ce(this, Ri, /* @__PURE__ */ new Map());
    Ce(this, qi, null);
    Ce(this, Ma, /* @__PURE__ */ new Map());
    /** @override */
    D(this, "tabGroups", {
      primary: "main"
      // Default tab
    });
  }
  _getCanonicalItemType() {
    var t, i;
    return ((t = this.item) == null ? void 0 : t.canonicalType) ?? ((i = this.item) == null ? void 0 : i.type);
  }
  _getCanonicalItemTypeFromOptions(t) {
    const i = t == null ? void 0 : t.document;
    return (i == null ? void 0 : i.canonicalType) ?? (i == null ? void 0 : i.type);
  }
  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["sheet", "item", T, "appv2", "mwd-sheet", "item-sheet"],
      position: {
        width: 760,
        height: 860
      },
      window: {
        resizable: !0
      },
      actions: {
        editImage: et._onEditImage,
        tab: et.prototype._onClickTab,
        accordion: et.prototype._onClickAccordion,
        checkbarElement: et._onClickCheckbar,
        modifierAdd: et._onModifierAdd,
        modifierDelete: et._onModifierDelete,
        modifierValueChange: et._onModifierValueChange,
        modifierConditionChange: et._onModifierConditionChange,
        modifierSelectionChange: et._onModifierSelectionChange,
        effectCreate: et._onEffectCreate,
        effectEdit: et._onEffectEdit,
        effectDelete: et._onEffectDelete,
        effectToggleDisabled: et._onEffectToggleDisabled
      },
      form: {
        submitOnChange: !1,
        closeOnSubmit: !1,
        handler: et.prototype._onSubmitForm
      }
    }, { inplace: !1 });
  }
  static get defaultOptions() {
    return this.DEFAULT_OPTIONS;
  }
  _initializeApplicationOptions(t) {
    var r, o, l, c;
    t = super._initializeApplicationOptions(t), t.classes = Array.from(t.classes ?? []);
    const i = this._getCanonicalItemTypeFromOptions(t);
    i && t.classes.push(String(i));
    const n = ((c = (l = (o = (r = game.system) == null ? void 0 : r.mwd) == null ? void 0 : o.styles) == null ? void 0 : l.selectCssClass) == null ? void 0 : c.call(l)) ?? "mwd-theme-default", s = ["mwd-theme-default", "mwd-theme-sra"];
    return t.classes = t.classes.filter((u) => !s.includes(u)), t.classes.push(n), t;
  }
  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */
  /**
   * Dynamically determine the template based on item type.
   * @param {string} partId - The part identifier
   * @returns {string} The template path
   * @override
   */
  _getPartTemplate(t) {
    var i;
    if (t === "sheet") {
      const n = this._getCanonicalItemType();
      return hA[n] ?? `${X}/v2/item/${n}.hbs`;
    }
    return ((i = super._getPartTemplate) == null ? void 0 : i.call(this, t)) ?? "";
  }
  /**
   * Override title to show localized item type and name.
   * @override
   */
  get title() {
    const t = this._getCanonicalItemType();
    return `${_e.itemType.singular[t] ?? t}: ${this.item.name}`;
  }
  /**
   * Prepare context data for rendering.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The context object
   * @override
   */
  async _prepareContext(t) {
    var E, z, Y, Q, G, q, L, U, V;
    const i = await super._prepareContext(t), n = ((z = (E = game.system.mwd.modifiers) == null ? void 0 : E.getEnums) == null ? void 0 : z.call(E)) ?? {}, s = foundry.utils.deepClone((i == null ? void 0 : i.options) ?? {}), r = gA((i == null ? void 0 : i.fields) ?? ((Q = (Y = this.item.system) == null ? void 0 : Y.schema) == null ? void 0 : Q.fields) ?? {}), o = ((q = (G = this.item.actor) == null ? void 0 : G.getAttributes) == null ? void 0 : q.call(G, this.item)) ?? [], l = this._getCanonicalItemType(), c = !this.item.actor, u = !!this.item.actor, d = _e.itemType.singular[l] ?? l, m = this._getEffectEntries(), f = m.filter((Z) => Z.syncedCount > 0).length, p = this.constructor.LAYOUT_ID, h = this.item.actor ? (Z) => o.includes(Z) : (Z) => !0, g = l === A.itemType.skill, b = ["mwd", "item-sheet", this.isEditable ? "editable" : "locked"], S = b.join(" ");
    s.classes = b, s.cssClass = S;
    const w = async (Z, { secrets: re = this.item.isOwner } = {}) => foundry.applications.ux.TextEditor.implementation.enrichHTML(Z ?? "", {
      async: !0,
      secrets: re,
      relativeTo: this.item
    }), M = foundry.utils.expandObject({
      "system.notes": await w(this.item.system.notes ?? ""),
      "system.description": await w(this.item.system.description ?? "")
    }), P = {
      ...i,
      item: this.item,
      data: this.item,
      system: this.item.system,
      // AppV2 prose editors need both raw field definitions and pre-enriched
      // HTML. Keeping both here avoids template-specific enrichment branches.
      fields: r,
      enriched: M,
      enrichedDescription: ((L = M == null ? void 0 : M.system) == null ? void 0 : L.description) ?? "",
      options: {
        ...s,
        isGM: game.user.isGM,
        limited: !this.document.isOwner,
        owner: this.document.isOwner,
        isOwned: !!this.item.actor,
        editable: this.isEditable,
        cssClass: S,
        viewMode: !1
        // Items don't have view mode like actors do
      },
      ENUMS: {
        ...ve.getEnums(h, g),
        ...n
      },
      MWD: _e,
      itemSheet: {
        canonicalType: l,
        typeLabel: d,
        isArmorSheet: l === A.itemType.armor,
        isStandalone: c,
        canUseActorControls: u,
        supportsEffectSync: !!((V = (U = this.item).supportsEquippedEffectSync) != null && V.call(U)),
        effectEntries: m,
        effectCount: m.length,
        syncedEffectCount: f,
        summaryChips: this._getSummaryChips(),
        stateChips: this._getStateChips(m)
      },
      cssClass: S,
      tabs: this._getTabs()
    };
    return p && (P.layout = await aa.get(p)), P;
  }
  /**
   * Get tab configuration for this item type.
   * Override in subclasses if needed.
   * @returns {object} Tab configuration
   * @protected
   */
  _getTabs() {
    return {
      main: { id: "main", group: "primary", label: "Details" },
      modifiers: { id: "modifiers", group: "primary", label: "Modifiers" },
      effects: { id: "effects", group: "primary", label: "Effects" }
    };
  }
  _getSummaryChips() {
    return [];
  }
  _getStateChips(t = []) {
    var n, s, r;
    const i = [];
    return i.push({ kind: "ownership", label: this.item.actor ? "Owned Item" : "World Item" }), Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "equipped") && i.push({
      kind: "equipment",
      label: (n = this.item.system) != null && n.equipped ? "Equipped" : "Unequipped",
      tone: (s = this.item.system) != null && s.equipped ? "active" : "muted"
    }), Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "isPrimary") && ((r = this.item.system) != null && r.isPrimary) && i.push({ kind: "role", label: "Primary", tone: "accent" }), t.length && i.push({
      kind: "effects",
      label: `${t.length} Effect${t.length === 1 ? "" : "s"}`,
      tone: t.some((o) => o.syncedCount > 0) ? "active" : "muted"
    }), i;
  }
  _getEffectEntries() {
    var n, s, r, o, l, c;
    const t = /* @__PURE__ */ new Map(), i = ((s = (n = this.item).getSyncedActorEffects) == null ? void 0 : s.call(n)) ?? [];
    for (const u of i) {
      const d = (l = (o = (r = u.flags) == null ? void 0 : r[T]) == null ? void 0 : o.equippedItemSync) == null ? void 0 : l.sourceEffectId;
      if (!d) continue;
      const m = t.get(d) ?? [];
      m.push(u), t.set(d, m);
    }
    return Array.from(((c = this.item.effects) == null ? void 0 : c.contents) ?? []).map((u) => {
      var m, f, p, h, g, y, b;
      const d = t.get(u.id) ?? [];
      return {
        id: u.id,
        name: u.name || "New Effect",
        img: u.img || "icons/svg/aura.svg",
        disabled: !!u.disabled,
        transfer: !!u.transfer,
        changesCount: Array.isArray(u.changes) ? u.changes.length : 0,
        statusesCount: Number(((m = u.statuses) == null ? void 0 : m.size) ?? ((f = u.statuses) == null ? void 0 : f.length) ?? 0),
        durationLabel: (p = u.duration) != null && p.seconds ? `${u.duration.seconds}s` : (h = u.duration) != null && h.rounds ? `${u.duration.rounds} rounds` : "Passive",
        syncedCount: d.length,
        syncLabel: this.item.actor ? (y = (g = this.item).supportsEquippedEffectSync) != null && y.call(g) ? (b = this.item.system) != null && b.equipped ? d.length ? `Synced to actor (${d.length})` : "Pending sync" : "Applies when equipped" : "No equip sync" : "World item"
      };
    });
  }
  _getRootElement() {
    var t;
    return this.element instanceof HTMLElement ? this.element : (t = this.element) == null ? void 0 : t[0];
  }
  _onClickTab(t, i) {
    var l, c, u;
    const n = ((l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, ".csb-tab-link[data-tab]")) ?? ((u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, ".csb-tab-link[data-tab]"));
    if (!n) return;
    const s = n.closest(".csb-tabs");
    if (!s) return;
    const r = s.dataset.group || "default", o = n.dataset.tab;
    o && (H(this, Gi).set(r, o), C(this, ni, Ya).call(this, this._getRootElement(), r, o));
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const n = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!n) return;
    const s = n.dataset.section, r = n.closest(".csb-accordion");
    if (!r || !s) return;
    const o = r.dataset.group || "default", c = (H(this, Ri).has(o) ? H(this, Ri).get(o) : r.dataset.default || null) === s ? null : s;
    H(this, Ri).set(o, c), C(this, ni, ao).call(this, r, c);
  }
  _onRender(t, i) {
    var r, o, l, c;
    (r = super._onRender) == null || r.call(this, t, i), (o = this.window) != null && o.title && (this.window.title.textContent = this.title);
    const n = this._getRootElement();
    if (!n) return;
    const s = n.querySelector('.item-name input[name="name"]');
    s instanceof HTMLInputElement && (s.setAttribute("dir", "ltr"), s.style.direction = "ltr", s.style.unicodeBidi = "isolate", s.style.textAlign = "left", s.style.writingMode = "horizontal-tb");
    for (const u of n.querySelectorAll(".sheet-tabs")) {
      const d = u.dataset.group || "default", m = Array.from(u.querySelectorAll("[data-tab]"));
      if (!m.length) continue;
      for (const g of m)
        g.addEventListener("click", (y) => {
          y.preventDefault(), y.stopPropagation();
          const b = g.dataset.tab;
          b && (H(this, Gi).set(d, b), C(this, ni, Ya).call(this, n, d, b));
        });
      const f = H(this, Gi).get(d), p = u.dataset.default || ((l = m[0]) == null ? void 0 : l.dataset.tab), h = f || p;
      h && C(this, ni, Ya).call(this, n, d, h);
    }
    for (const u of n.querySelectorAll(".csb-tabs")) {
      const d = u.dataset.group || "default", m = Array.from(u.querySelectorAll(".csb-tab-link[data-tab]"));
      if (!m.length) continue;
      const f = H(this, Gi).get(d), p = u.dataset.default || ((c = m[0]) == null ? void 0 : c.dataset.tab), h = f || p;
      h && C(this, ni, Ya).call(this, n, d, h);
    }
    for (const u of n.querySelectorAll(".csb-accordion")) {
      const d = u.dataset.group || "default", m = H(this, Ri).has(d) ? H(this, Ri).get(d) : u.dataset.default || null;
      C(this, ni, ao).call(this, u, m);
    }
    for (const u of n.querySelectorAll("prose-mirror[name]")) {
      const d = u.getAttribute("name") ?? "";
      dr.has(d) && u.addEventListener("change", (m) => {
        m.preventDefault(), m.stopPropagation(), this._updateRichTextField(u);
      });
    }
    if (this.isEditable)
      for (const u of n.querySelectorAll("input[name], select[name], textarea[name]")) {
        if (u.closest("prose-mirror") || u.hasAttribute("data-action") || !(u instanceof HTMLElement)) continue;
        const d = String(u.getAttribute("name") ?? "").trim();
        u instanceof HTMLInputElement && !pA.has(d) && !["checkbox", "radio"].includes(u.type) ? u.addEventListener("input", (m) => {
          m.preventDefault(), this._queueNamedFieldSync(m.currentTarget ?? u);
        }) : u instanceof HTMLTextAreaElement && u.addEventListener("input", (m) => {
          m.preventDefault(), this._queueNamedFieldSync(m.currentTarget ?? u);
        }), u.addEventListener("change", (m) => {
          m.preventDefault(), this._syncNamedField(m.currentTarget ?? u);
        });
      }
    this._restoreScrollPositions();
  }
  async _updateRichTextField(t) {
    var r;
    const i = String(((r = t == null ? void 0 : t.getAttribute) == null ? void 0 : r.call(t, "name")) ?? (t == null ? void 0 : t.name) ?? "");
    if (!this.isEditable || !dr.has(i)) return;
    const n = String(t.value ?? ""), s = String(foundry.utils.getProperty(this.item, i) ?? "");
    if (n !== s)
      try {
        await this.item.update({ [i]: n });
      } catch (o) {
        console.warn("MWD | Rich text item update failed:", o);
      }
  }
  _queueNamedFieldSync(t, i = {}) {
    var o;
    if (!this.isEditable) return;
    const n = String(((o = t == null ? void 0 : t.getAttribute) == null ? void 0 : o.call(t, "name")) ?? "").trim() || foundry.utils.randomID(), s = H(this, Ma).get(n);
    s && clearTimeout(s);
    const r = setTimeout(() => {
      H(this, Ma).delete(n), this._syncNamedField(t, i);
    }, 180);
    H(this, Ma).set(n, r);
  }
  _getNamedFieldUpdate(t) {
    var s, r;
    if (!(t instanceof HTMLElement)) return null;
    const i = String(((s = t.getAttribute) == null ? void 0 : s.call(t, "name")) ?? "").trim();
    if (!i || dr.has(i)) return null;
    if (t instanceof HTMLInputElement) {
      if (t.type === "radio" && !t.checked) return null;
      if (t.type === "checkbox") return { [i]: t.checked };
      if (t.type === "number") {
        const o = Number(t.value);
        return Number.isFinite(o) ? { [i]: o } : null;
      }
    }
    const n = String(((r = t.dataset) == null ? void 0 : r.dtype) ?? "").trim().toLowerCase();
    if (n === "number") {
      const o = Number(t.value);
      return Number.isFinite(o) ? { [i]: o } : null;
    }
    return n === "boolean" ? { [i]: t.value === "true" } : { [i]: String(t.value ?? "") };
  }
  async _syncNamedField(t, i = {}) {
    if (!this.isEditable) return;
    const n = this._getNamedFieldUpdate(t), s = yA({
      ...n ?? {},
      ...i && typeof i == "object" ? i : {}
    });
    if (Object.keys(s).length) {
      this._captureScrollPositions();
      try {
        await this.item.update(s);
      } catch (r) {
        console.warn("MWD | Item field sync failed:", { updates: s, err: r });
      }
    }
  }
  async _onSubmitForm(t, i, n, { updateData: s = null } = {}) {
    if (!this.isEditable || !(i instanceof HTMLFormElement)) return;
    this._captureScrollPositions();
    const r = this._prepareSubmitData(t, i, n, s ?? {});
    await this._processSubmitData(t, i, r);
  }
  _getScrollRestoreSelectors() {
    return [".sheet-body", ".csb-tab-panels"];
  }
  _captureScrollPositions() {
    const t = this._getRootElement();
    if (!t) {
      $e(this, qi, null);
      return;
    }
    const i = [];
    for (const n of this._getScrollRestoreSelectors())
      t.querySelectorAll(n).forEach((s, r) => {
        s instanceof HTMLElement && i.push({
          selector: n,
          index: r,
          top: s.scrollTop,
          left: s.scrollLeft
        });
      });
    $e(this, qi, i.length ? i : null);
  }
  _restoreScrollPositions() {
    const t = H(this, qi);
    if (!(t != null && t.length)) return;
    const i = () => {
      const n = this._getRootElement();
      if (n)
        for (const s of t) {
          const r = n.querySelectorAll(s.selector).item(s.index);
          r instanceof HTMLElement && (r.scrollTop = s.top, r.scrollLeft = s.left);
        }
    };
    i(), requestAnimationFrame(i), $e(this, qi, null);
  }
  /**
   * Override header buttons to add custom controls.
   * @returns {object[]} Array of header button configurations
   * @override
   */
  _getHeaderControls() {
    return super._getHeaderControls();
  }
  /* -------------------------------------------- */
  /*  Action Handlers                             */
  /* -------------------------------------------- */
  /**
   * Handle clicking a checkbar element (monitor).
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The clicked element
   * @returns {Promise<void>}
   * @static
   */
  static async _onClickCheckbar(t, i) {
    const n = this.item;
    if (!n.parent) return;
    const s = i.closest(".checkbar-root");
    if (!s) return;
    const r = s.dataset.monitorCode, o = Number.parseInt(i.dataset.index), l = i.dataset.checked === "true";
    await n.parent.switchMonitorCheck(r, o, l);
  }
  static async _onEditImage(t) {
    var s, r, o;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t), !this.isEditable) return;
    const i = foundry.applications.apps.FilePicker.implementation;
    new i({
      type: "image",
      current: ((o = this.item) == null ? void 0 : o.img) ?? "",
      callback: async (l) => {
        l && await this.item.update({ img: l });
      }
    }).render(!0);
  }
  /**
   * Handle adding a new modifier.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The clicked element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierAdd(t, i) {
    await this.item.createModifier();
  }
  /**
   * Handle deleting a modifier.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The clicked element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierDelete(t, i) {
    const n = i.closest(".define-modifier");
    if (!n) return;
    const s = n.dataset.modifierId;
    s && await this.item.deleteModifier(s);
  }
  /**
   * Handle changing a modifier's value.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The input element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierValueChange(t, i) {
    const n = i.closest(".define-modifier");
    if (!n) return;
    const s = n.dataset.modifierId;
    s && await this.item.changeModifierValue(s, i.value);
  }
  /**
   * Handle changing a modifier's condition.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The input element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierConditionChange(t, i) {
    const n = i.closest(".define-modifier");
    if (!n) return;
    const s = n.dataset.modifierId;
    s && await this.item.changeModifierCondition(s, i.value);
  }
  /**
   * Handle changing a modifier's selection (dropdown).
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The select element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierSelectionChange(t, i) {
    const n = i.closest(".define-modifier");
    if (!n) return;
    const s = n.dataset.modifierId, r = i.dataset.modifierSelect;
    s && r && await this.item.changeModifierSelection(s, r, i.value);
  }
  static async _onEffectCreate(t, i) {
    var s, r, o;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const [n] = await this.item.createEmbeddedDocuments("ActiveEffect", [{
      name: `${this.item.name} Effect`,
      img: this.item.img || "icons/svg/aura.svg",
      disabled: !1,
      transfer: !1,
      changes: []
    }]);
    (o = n == null ? void 0 : n.sheet) == null || o.render(!0);
  }
  static async _onEffectEdit(t, i) {
    var r, o, l, c, u, d, m;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const n = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.effectId) ?? ((d = (u = (c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : d.effectId);
    if (!n) return;
    const s = this.item.effects.get(n);
    (m = s == null ? void 0 : s.sheet) == null || m.render(!0);
  }
  static async _onEffectDelete(t, i) {
    var s, r, o, l, c, u;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.effectId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-effect-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.effectId);
    n && await this.item.deleteEmbeddedDocuments("ActiveEffect", [n]);
  }
  static async _onEffectToggleDisabled(t, i) {
    var r, o, l, c, u, d;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const n = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.effectId) ?? ((d = (u = (c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : d.effectId);
    if (!n) return;
    const s = this.item.effects.get(n);
    s && await s.update({ disabled: !s.disabled });
  }
};
Gi = new WeakMap(), Ri = new WeakMap(), qi = new WeakMap(), Ma = new WeakMap(), ni = new WeakSet(), Ya = function(t, i, n) {
  t && (t.querySelectorAll(`.csb-tabs[data-group="${i}"] .csb-tab-link[data-tab]`).forEach((s) => {
    s.classList.toggle("is-active", s.dataset.tab === n);
  }), t.querySelectorAll(`.csb-tabs[data-group="${i}"] .csb-tab-panel[data-tab]`).forEach((s) => {
    s.classList.toggle("is-active", s.dataset.tab === n);
  }), t.querySelectorAll(".sheet-tabs [data-tab]").forEach((s) => {
    var o;
    (((o = s.closest(".sheet-tabs")) == null ? void 0 : o.dataset.group) || "default") === i && s.classList.toggle("active", s.dataset.tab === n);
  }), t.querySelectorAll(`.tab[data-group="${i}"]`).forEach((s) => {
    s.classList.toggle("active", s.dataset.tab === n);
  }));
}, ao = function(t, i) {
  t.dataset.activeSection = i ?? "", t.querySelectorAll(".csb-accordion__section").forEach((n) => {
    const s = n.dataset.section === i;
    n.classList.toggle("is-active", s);
  }), t.querySelectorAll(".csb-accordion__trigger").forEach((n) => {
    const s = n.dataset.section === i;
    n.classList.toggle("is-active", s), n.setAttribute("aria-expanded", s ? "true" : "false");
  }), t.querySelectorAll(".csb-accordion__panel").forEach((n) => {
    const s = n.closest(".csb-accordion__section"), r = (s == null ? void 0 : s.dataset.section) === i;
    n.classList.toggle("is-active", r);
  });
}, D(et, "LAYOUT_ID", null), /** @override */
D(et, "PARTS", {
  sheet: {
    template: "",
    // Set dynamically in _getPartTemplate
    scrollable: [".sheet-body"]
  }
}), D(et, "TABS", {
  primary: {
    id: "primary",
    group: "primary",
    navSelector: ".sheet-tabs",
    contentSelector: ".sheet-body",
    initial: "main",
    // This must match your tab name
    tabs: [
      { id: "main" },
      { id: "modifiers" }
    ]
  }
});
let oi = et;
class no extends oi {
}
D(no, "LAYOUT_ID", "contact"), D(no, "PARTS", {
  sheet: {
    template: `${X}/v2/item/contact.hbs`,
    scrollable: [".sheet-body"]
  }
});
const bA = Object.freeze([
  { value: "audiovisual", label: "Audiovisual Gear" },
  { value: "communication", label: "Communication Gear" },
  { value: "computing", label: "Computing Gear" },
  { value: "espionage", label: "Espionage Gear" },
  { value: "hostileEnvironment", label: "Hostile Environment Gear" },
  { value: "medical", label: "Medical Gear" },
  { value: "optical", label: "Optical Gear" },
  { value: "power", label: "Power Gear" },
  { value: "repairSalvage", label: "Repair/Salvage Gear" },
  { value: "survival", label: "Survival Gear" },
  { value: "surveillance", label: "Surveillance Gear" }
]), SA = Object.freeze([
  { value: "ammo", label: "Ammunition" },
  { value: "explosive", label: "Explosive" },
  { value: "medical", label: "Medical" },
  { value: "repair", label: "Repair" },
  { value: "fuel", label: "Fuel / Power Cell" },
  { value: "utility", label: "Utility" }
]);
function AA(a) {
  return a === "consumable" ? SA : bA;
}
class so extends oi {
  async _prepareContext(e) {
    var r;
    const t = await super._prepareContext(e), i = this._getCanonicalItemType(), n = this.item.system ?? {}, s = AA(i);
    return t.system = {
      ...n,
      quantity: Math.max(0, Math.trunc(Number(n.quantity ?? 1) || 0)),
      rating: Math.max(0, Math.trunc(Number(n.rating ?? 0) || 0)),
      category: String(n.category ?? "").trim(),
      tags: Array.isArray(n.tags) ? n.tags.map((o) => String(o ?? "").trim()).filter(Boolean) : []
    }, t.gearEditor = {
      categories: s.map((o) => ({ ...o }))
    }, t.tagsText = t.system.tags.join(", "), t.itemSheet = {
      ...t.itemSheet ?? {},
      summaryChips: [
        { label: "Qty", value: String(t.system.quantity) },
        { label: "Rating", value: String(t.system.rating) },
        {
          label: "Category",
          value: ((r = s.find((o) => o.value === t.system.category)) == null ? void 0 : r.label) ?? "Uncategorized"
        }
      ]
    }, t.layout = await aa.get(i === "consumable" ? "consumable" : "gear"), t;
  }
}
// One sheet class intentionally backs both gear and consumables so quantity,
// rating, and reference editing never drift into parallel implementations.
D(so, "LAYOUT_ID", null), D(so, "PARTS", {
  sheet: {
    template: `${X}/v2/item/gear.hbs`,
    scrollable: [".sheet-body"]
  }
});
class ro extends oi {
  async _prepareContext(e) {
    var r, o;
    const t = await super._prepareContext(e), i = Gt(this.item.system ?? {}), n = ju(), s = Array.isArray((r = t.ENUMS) == null ? void 0 : r.skills) ? t.ENUMS.skills.map((l) => ({
      value: String((l == null ? void 0 : l.value) ?? "").trim(),
      label: String((l == null ? void 0 : l.label) ?? (l == null ? void 0 : l.value) ?? "").trim()
    })).filter((l) => l.value) : [];
    return t.system = {
      ...i,
      effects: (Array.isArray(i.effects) ? i.effects : []).map((l) => ({
        ...l,
        showSkillPicker: Hu(l) || Array.isArray(l.skillKeys) && l.skillKeys.length > 0,
        isEdgeEvent: l.type === "edgeEvent"
      }))
    }, t.traitEditor = {
      ...n,
      skills: s
    }, t.itemSheet = {
      ...t.itemSheet ?? {},
      sheetClass: "mwd-item-sheet--quality",
      summaryChips: [
        { label: "Category", value: On(i.category) },
        { label: "Tier", value: _n(i.tier) },
        { label: "Activation", value: String(i.activation ?? "passive").trim() || "Passive" },
        { label: "Effects", value: String(((o = i.effects) == null ? void 0 : o.length) ?? 0) }
      ]
    }, t.tagsText = Array.isArray(i.tags) ? i.tags.join(", ") : "", t;
  }
  _onRender(e, t) {
    var s, r;
    (s = super._onRender) == null || s.call(this, e, t);
    const i = (r = this._getRootElement) == null ? void 0 : r.call(this);
    if (!i) return;
    const n = (o) => {
      var l;
      return (l = this._captureScrollPositions) == null || l.call(this), o();
    };
    i.querySelectorAll(".mwd-quality-prereq-add").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), l.stopPropagation(), n(() => {
          var c, u;
          return (u = (c = this.item).createQualityPrerequisite) == null ? void 0 : u.call(c);
        });
      });
    }), i.querySelectorAll(".mwd-quality-prereq-delete").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), l.stopPropagation(), n(() => {
          var c, u;
          return (u = (c = this.item).deleteQualityPrerequisite) == null ? void 0 : u.call(c, o.dataset.prereqId);
        });
      });
    }), i.querySelectorAll(".mwd-quality-prereq-field").forEach((o) => {
      o.addEventListener("change", (l) => {
        l.preventDefault(), l.stopPropagation(), n(() => {
          var c, u;
          return (u = (c = this.item).updateQualityPrerequisite) == null ? void 0 : u.call(
            c,
            o.dataset.prereqId,
            o.dataset.field,
            o.value
          );
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-add").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), l.stopPropagation(), n(() => {
          var c, u;
          return (u = (c = this.item).createQualityEffect) == null ? void 0 : u.call(c);
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-delete").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), l.stopPropagation(), n(() => {
          var c, u;
          return (u = (c = this.item).deleteQualityEffect) == null ? void 0 : u.call(c, o.dataset.effectId);
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-field").forEach((o) => {
      o.addEventListener("change", (l) => {
        l.preventDefault(), l.stopPropagation(), n(() => {
          var c, u;
          return (u = (c = this.item).updateQualityEffect) == null ? void 0 : u.call(
            c,
            o.dataset.effectId,
            o.dataset.field,
            o instanceof HTMLSelectElement && o.multiple ? Array.from(o.selectedOptions).map((d) => d.value) : o.value
          );
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-skill-toggle").forEach((o) => {
      o.addEventListener("change", (l) => {
        l.preventDefault(), l.stopPropagation();
        const c = o.dataset.effectId, u = Array.from(i.querySelectorAll(`.mwd-quality-effect-skill-toggle[data-effect-id="${c}"]`)).filter((d) => d instanceof HTMLInputElement && d.checked).map((d) => d.value);
        n(() => {
          var d, m;
          return (m = (d = this.item).updateQualityEffect) == null ? void 0 : m.call(
            d,
            c,
            o.dataset.field,
            u
          );
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-condition-add").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), l.stopPropagation(), n(() => {
          var c, u;
          return (u = (c = this.item).createQualityEffectCondition) == null ? void 0 : u.call(c, o.dataset.effectId);
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-condition-delete").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), l.stopPropagation(), n(() => {
          var c, u;
          return (u = (c = this.item).deleteQualityEffectCondition) == null ? void 0 : u.call(c, o.dataset.effectId, o.dataset.conditionId);
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-condition-field").forEach((o) => {
      o.addEventListener("change", (l) => {
        l.preventDefault(), l.stopPropagation(), n(() => {
          var c, u;
          return (u = (c = this.item).updateQualityEffectCondition) == null ? void 0 : u.call(
            c,
            o.dataset.effectId,
            o.dataset.conditionId,
            o.dataset.field,
            o.value
          );
        });
      });
    });
  }
}
D(ro, "LAYOUT_ID", "quality"), D(ro, "PARTS", {
  sheet: {
    template: `${X}/v2/item/quality.hbs`,
    scrollable: [".sheet-body"]
  }
});
class oo extends oi {
}
D(oo, "LAYOUT_ID", "asset-module"), D(oo, "PARTS", {
  sheet: {
    template: `${X}/v2/item/assetModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class lo extends oi {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      position: {
        width: 640,
        height: 620
      },
      window: {
        ...super.DEFAULT_OPTIONS.window,
        minWidth: 560,
        minHeight: 480
      }
    }, { inplace: !1 });
  }
  _getTabs() {
    return {
      main: { id: "main", group: "primary", label: "Details" }
    };
  }
  _getSummaryChips() {
    const e = sn(this.item.system ?? {}), t = Di(e.catalogId), n = Os(t, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }).map((r) => r.choice).filter(Boolean).map((r) => nn(r, { includeBonusText: !0 })).join(", "), s = this.item.actor ? _i(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return [
      { label: "Slot", value: Na(e.moduleType) },
      { label: "Module", value: (t == null ? void 0 : t.label) ?? "Unlinked" },
      { label: "Bonuses", value: n || "Pending choice" },
      s ? { label: "Status", value: s.isActive ? "Active" : "Inactive" } : null
    ].filter(Boolean);
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), i = sn(this.item.system ?? {}), n = i.moduleType, s = Di(i.catalogId), r = n ? Ko(n) : [], o = md(s, i.selectedGrants, { legacySelectedSkill: i.selectedSkill }), l = this.item.actor ? _i(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return t.lifeModuleEditor = {
      moduleType: n,
      moduleTypeLabel: Na(n),
      moduleTypes: od().map((c) => ({
        ...c,
        selected: c.value === n
      })),
      availableEntries: r.map((c) => ({
        id: c.id,
        label: c.label,
        selected: c.id === i.catalogId
      })),
      hasAvailableEntries: r.length > 0,
      selectedEntry: s,
      selectedGrants: i.selectedGrants,
      grantFields: o,
      requiresAnyLabels: ((s == null ? void 0 : s.requiresAny) ?? []).map((c) => {
        var u;
        return ((u = Di(c)) == null ? void 0 : u.label) ?? c;
      }),
      excludesAnyLabels: ((s == null ? void 0 : s.excludesAny) ?? []).map((c) => {
        var u;
        return ((u = Di(c)) == null ? void 0 : u.label) ?? c;
      }),
      actorState: l,
      warningLabels: [...(l == null ? void 0 : l.warningLabels) ?? []],
      isOwned: !!this.item.actor,
      statusLabel: l ? l.isActive ? "Active" : "Inactive" : s ? "Configured" : "Unlinked",
      statusReason: (l == null ? void 0 : l.inactiveReason) ?? ""
    }, t;
  }
}
D(lo, "LAYOUT_ID", "life-module"), D(lo, "PARTS", {
  sheet: {
    template: `${X}/v2/item/lifeModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class co extends oi {
}
D(co, "LAYOUT_ID", "skill"), D(co, "PARTS", {
  sheet: {
    template: `${X}/v2/item/skill.hbs`,
    scrollable: [".sheet-body"]
  }
});
const TA = Object.freeze([
  "firearms",
  "projectileWeapons",
  "heavyWeapons",
  "meleeCombat"
]), wA = Object.freeze([
  { value: "energy", label: "Energy" },
  { value: "kinetic", label: "Kinetic" },
  { value: "ballistic", label: "Ballistic" },
  { value: "explosive", label: "Explosive" },
  { value: "plasma", label: "Plasma" },
  { value: "electrical", label: "Electrical" },
  { value: "melee", label: "Melee" },
  { value: "none", label: "None" }
]), Nc = Object.freeze([
  { value: "quantity", label: "Quantity" },
  { value: "durability.current", label: "Durability" },
  { value: "", label: "Custom Path" }
]), kA = "consumable";
function vA(a) {
  return String((a == null ? void 0 : a.canonicalType) ?? (a == null ? void 0 : a.type) ?? "item").trim().replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (t) => t.toUpperCase());
}
function Mm(a) {
  return String((a == null ? void 0 : a.canonicalType) ?? (a == null ? void 0 : a.type) ?? "").trim() === kA;
}
function MA(a, e = "") {
  var i;
  const t = String(e ?? "").trim();
  return Array.from(((i = a == null ? void 0 : a.actor) == null ? void 0 : i.items) ?? []).filter((n) => {
    const s = String((n == null ? void 0 : n.id) ?? "").trim();
    return !s || s === (a == null ? void 0 : a.id) ? !1 : s === t || Mm(n);
  }).sort((n, s) => String((n == null ? void 0 : n.name) ?? "").localeCompare(String((s == null ? void 0 : s.name) ?? ""))).map((n) => ({
    value: n.id,
    label: `${n.name || "Unnamed Item"} (${vA(n)})`
  }));
}
function uo(a, e, t) {
  const i = String(e ?? "").trim();
  return !i || a.some((n) => n.value === i) ? a : a.concat({ value: i, label: t(i) });
}
function CA(a, e) {
  var d, m, f, p, h, g, y;
  const t = ii(e), i = MA(a, (d = t.link) == null ? void 0 : d.itemId), n = zf({
    source: t,
    actor: (a == null ? void 0 : a.actor) ?? null
  }), s = ((h = (f = (m = a == null ? void 0 : a.actor) == null ? void 0 : m.items) == null ? void 0 : f.get) == null ? void 0 : h.call(f, ((p = t.link) == null ? void 0 : p.itemId) ?? "")) ?? null, r = uo(
    [...Nc],
    (g = t.link) == null ? void 0 : g.itemPath,
    (b) => `Custom (${b})`
  ), o = new Set(Nc.map((b) => String(b.value ?? "").trim())), l = String(((y = t.link) == null ? void 0 : y.itemPath) ?? "").trim(), c = !!(a != null && a.actor);
  let u = "";
  return t.kind === "itemRef" && (c ? i.length ? s ? Mm(s) ? l ? u = n.isTracked ? `Linked to ${s.name} | Available ${Number(n.current ?? 0)}` : `Linked to ${s.name} | Path not resolving to a tracked value yet.` : u = `Linked to ${s.name}. Pick which field should be consumed.` : u = `Linked to ${s.name} | Legacy non-consumable source. Repoint this to a Consumable item when convenient.` : u = "Pick an owned Consumable item to consume from." : u = "Add an owned Consumable item to the actor, then link this weapon to it." : u = "Embed this weapon in an actor to link it to owned inventory."), {
    ...t,
    resolvedState: n,
    ui: {
      ownedItemOptions: i,
      itemPathOptions: r,
      hasOwnedActor: c,
      linkedItemName: (s == null ? void 0 : s.name) ?? "",
      showCustomItemPath: t.kind === "itemRef" && !o.has(l),
      preview: u
    }
  };
}
class Fs extends oi {
  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        weaponSkillChange: Fs._onWeaponSkillChange
      }
    }, { inplace: !1 });
  }
  _getTabs() {
    return {
      ...super._getTabs(),
      modifiers: { id: "modifiers", group: "primary", label: "Roll Modifiers" },
      effects: { id: "effects", group: "primary", label: "Active Effects" }
    };
  }
  /**
   * Prepare context data, adding weapon-specific enums.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The prepared context
   * @override
   */
  async _prepareContext(e) {
    var l, c, u, d, m, f, p;
    const t = await super._prepareContext(e), i = this._getCanonicalItemType();
    t.ENUMS = {
      ...t.ENUMS ?? {},
      defenses: xe.getDefenses()
    };
    const n = Array.isArray((l = t.ENUMS) == null ? void 0 : l.skills) ? t.ENUMS.skills : [], s = (c = this.item.system) == null ? void 0 : c.skill, r = (u = this.item.system) == null ? void 0 : u.damageType, o = i === "personalWeapon" ? uo(
      n.filter((h) => TA.includes(h.value)),
      s,
      (h) => {
        var g;
        return ((g = n.find((y) => y.value === h)) == null ? void 0 : g.label) ?? h;
      }
    ) : n;
    return t.weaponProfile = ((m = (d = this.item).getCombatProfile) == null ? void 0 : m.call(d)) ?? null, t.weaponEditor = {
      skills: o,
      categories: [
        { value: "melee", label: "Melee" },
        { value: "ranged", label: "Ranged" },
        { value: "thrown", label: "Thrown" },
        { value: "other", label: "Other" }
      ],
      damageTypes: uo(
        i === "personalWeapon" ? [...Jn] : [...wA],
        r,
        (h) => i === "personalWeapon" ? Yt(h) : h
      ),
      ranges: $t.RANGE_ORDER.map((h) => ({
        value: h,
        label: i === "personalWeapon" ? ns(h) : h.charAt(0).toUpperCase() + h.slice(1)
      })),
      rangeBandLabels: Object.fromEntries($t.RANGE_ORDER.map((h) => [
        h,
        i === "personalWeapon" ? ns(h) : h.charAt(0).toUpperCase() + h.slice(1)
      ])),
      weaponCapabilityOptions: qm,
      payloadCapabilityOptions: Vm,
      ammoDamageTypes: [{ value: "", label: "Use Weapon Default" }, ...Jn],
      payloadTemplateShapes: Wc,
      payloadTemplatePlacements: Kc,
      areaEffectKinds: [
        { value: Et.discrete, label: "Discrete" },
        { value: Et.persistent, label: "Persistent Hazard" }
      ],
      exposureTiers: [
        { value: ne.minor, label: "Minor" },
        { value: ne.major, label: "Major" },
        { value: ne.full, label: "Full" }
      ],
      resolverKeys: [
        { value: "standard", label: "Standard" },
        { value: "template", label: "Template" }
      ],
      payloadSourceKinds: [
        { value: "untracked", label: "Untracked" },
        { value: "internal", label: "Internal" },
        { value: "actorResource", label: "Actor Resource" },
        { value: "itemRef", label: "Linked Item" }
      ],
      consumptionSources: Array.isArray((f = this.item.system) == null ? void 0 : f.consumptionSources) ? this.item.system.consumptionSources.map((h) => CA(this.item, h)) : []
    }, t.itemSheet = {
      ...t.itemSheet ?? {},
      isCompactWeaponSheet: !0,
      weaponSheetVariant: i === "mechWeapon" ? "mech" : "personal"
    }, t.itemSheet.stateChips = (t.itemSheet.stateChips ?? []).filter(
      (h) => !["ownership", "equipment", "role"].includes(h.kind)
    ), t.itemSheet.currentPayloadLabel = ((p = t.weaponProfile) == null ? void 0 : p.payloadLabel) ?? "", t;
  }
  /**
   * Handle changing the weapon skill, which updates the defense attribute.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The changed select element
   * @static
   * @async
   */
  static async _onWeaponSkillChange(e, t) {
    var s, r;
    const i = t.value, n = (r = (s = game.system.mwd.skills) == null ? void 0 : s.get) == null ? void 0 : r.call(s, i);
    await this._syncNamedField(t, {
      ...n != null && n.defense ? { "system.defense": n.defense } : {}
    });
  }
}
const Ta = class Ta extends Fs {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      position: {
        width: 680,
        height: 720
      },
      window: {
        ...super.DEFAULT_OPTIONS.window,
        minWidth: 680,
        minHeight: 480,
        maxWidth: 960
      },
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        attackWeapon: Ta._onAttackWeapon,
        reloadWeaponPayload: Ta._onReloadWeaponPayload
      }
    }, { inplace: !1 });
  }
  async _prepareContext(e) {
    var r, o, l;
    const t = await super._prepareContext(e), i = this.item.actor ?? null, n = t.weaponProfile ?? null, s = !!(i && typeof i.isCharacterLike == "function" && i.isCharacterLike() && ((o = (r = this.item).isPersonalWeapon) != null && o.call(r)));
    return t.itemSheet = {
      ...t.itemSheet ?? {},
      canAttack: s,
      attackDisabled: !s || !((l = this.item.system) != null && l.equipped)
    }, t.itemSheet.summaryChips = this._getSummaryChips(n), t.itemSheet.reloadState = this._getReloadDisplayState(n), t;
  }
  _getReloadDisplayState(e = ((t) => ((i) => (i = (t = this.item).getCombatProfile) == null ? void 0 : i.call(t))())() ?? null) {
    var d, m, f, p, h;
    const n = ((m = (d = this.item).canReloadActivePayload) == null ? void 0 : m.call(d, { detailed: !0 })) ?? { canReload: !1, reason: "" }, s = !!((f = e == null ? void 0 : e.sourceState) != null && f.isTracked), r = String((e == null ? void 0 : e.payloadLabel) ?? (n == null ? void 0 : n.payloadLabel) ?? "").trim() || "Unloaded", o = Number(((p = e == null ? void 0 : e.sourceState) == null ? void 0 : p.current) ?? (n == null ? void 0 : n.current) ?? 0) || 0, l = Number(((h = e == null ? void 0 : e.sourceState) == null ? void 0 : h.max) ?? (n == null ? void 0 : n.max) ?? 0) || 0, c = s ? `${r} ${o}/${l}` : r, u = n.canReload ? "Click to reload" : String(n.reason ?? "").trim() || "Payload read-only";
    return {
      canReload: !!n.canReload,
      disabled: !n.canReload,
      value: c,
      hint: u,
      title: n.canReload ? `Reload ${r}` : u
    };
  }
  _getSummaryChips(e = ((t) => ((i) => (i = (t = this.item).getCombatProfile) == null ? void 0 : i.call(t))())() ?? null) {
    var s, r, o;
    if (!e) return [];
    const n = [
      { label: "Category", value: String(e.category ?? "").trim() || "Ranged" },
      { label: "Skill", value: ((s = e.skillDef) == null ? void 0 : s.label) ?? e.skill ?? "Firearms" },
      { label: "DV", value: String(Number(e.damage ?? 0)) },
      { label: "AP", value: String(Number(e.ap ?? 0)) },
      { label: "Type", value: Yt(e.damageType) || "Penetrating" },
      { label: "Range", value: String(((r = e.range) == null ? void 0 : r.max) ?? "near").trim() || "Near" }
    ];
    return String(e.category ?? "").trim().toLowerCase() !== "melee" && n.push((o = e == null ? void 0 : e.sourceState) != null && o.isTracked ? { label: "Payload", value: `${(e == null ? void 0 : e.payloadLabel) || "Unloaded"} (${Number(e.sourceState.current ?? 0)}/${Number(e.sourceState.max ?? 0)})` } : { label: "Payload", value: (e == null ? void 0 : e.payloadLabel) || "Unloaded" }), n;
  }
  static async _onAttackWeapon(e) {
    var i, n, s, r;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), !(!(this.item.actor ?? null) || !((r = (s = this.item).isPersonalWeapon) != null && r.call(s))) && await zs({ weapon: this.item, event: e });
  }
  static async _onReloadWeaponPayload(e) {
    var i, n, s, r, o, l, c, u;
    if ((i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), !((r = (s = this.item) == null ? void 0 : s.isPersonalWeapon) != null && r.call(s))) return;
    (o = this._captureScrollPositions) == null || o.call(this);
    const t = await ((c = (l = this.item).reloadActivePayload) == null ? void 0 : c.call(l));
    t != null && t.ok || (u = ui.notifications) == null || u.warn((t == null ? void 0 : t.reason) ?? "Unable to reload that weapon.");
  }
  _onRender(e, t) {
    var s, r;
    (s = super._onRender) == null || s.call(this, e, t);
    const i = (r = this._getRootElement) == null ? void 0 : r.call(this);
    if (!i) return;
    const n = (o) => {
      var l;
      return (l = this._captureScrollPositions) == null || l.call(this), o();
    };
    i.querySelectorAll(".mwd-payload-add").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), n(() => {
          var c, u;
          return (u = (c = this.item).createPayload) == null ? void 0 : u.call(c);
        });
      });
    }), i.querySelectorAll(".mwd-payload-delete").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), n(() => {
          var c, u;
          return (u = (c = this.item).deletePayload) == null ? void 0 : u.call(c, o.dataset.payloadId);
        });
      });
    }), i.querySelectorAll(".mwd-payload-field").forEach((o) => {
      o.addEventListener("change", (l) => {
        l.preventDefault(), n(() => {
          var c, u;
          return (u = (c = this.item).updatePayloadField) == null ? void 0 : u.call(
            c,
            o.dataset.payloadId,
            o.dataset.field,
            o.value
          );
        });
      });
    }), i.querySelectorAll(".mwd-source-add").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), n(() => {
          var c, u;
          return (u = (c = this.item).createConsumptionSource) == null ? void 0 : u.call(c);
        });
      });
    }), i.querySelectorAll(".mwd-source-delete").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), n(() => {
          var c, u;
          return (u = (c = this.item).deleteConsumptionSource) == null ? void 0 : u.call(c, o.dataset.sourceId);
        });
      });
    }), i.querySelectorAll(".mwd-source-field").forEach((o) => {
      o.addEventListener("change", (l) => {
        l.preventDefault(), n(() => {
          var c, u;
          return (u = (c = this.item).updateConsumptionSourceField) == null ? void 0 : u.call(
            c,
            o.dataset.sourceId,
            o.dataset.field,
            o.value
          );
        });
      });
    }), i.querySelectorAll(".mwd-capability-picker").forEach((o) => {
      o.addEventListener("change", (l) => {
        l.preventDefault();
        const c = String(o.value ?? "").trim();
        if (!c) return;
        const u = String(o.dataset.values ?? "").split(",").map((p) => p.trim()).filter(Boolean), d = Array.from(/* @__PURE__ */ new Set([...u, c]));
        o.value = "";
        const m = String(o.dataset.payloadId ?? "").trim(), f = String(o.dataset.field ?? "").trim();
        if (f) {
          if (m) {
            n(() => {
              var p, h;
              return (h = (p = this.item).updatePayloadField) == null ? void 0 : h.call(p, m, f, d.join(", "));
            });
            return;
          }
          n(() => this.item.update({ [f]: d }));
        }
      });
    });
  }
};
D(Ta, "LAYOUT_ID", "personal-weapon"), D(Ta, "PARTS", {
  sheet: {
    template: `${X}/v2/item/personal-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
let mo = Ta;
class fo extends Fs {
}
D(fo, "LAYOUT_ID", "mech-weapon"), D(fo, "PARTS", {
  sheet: {
    template: `${X}/v2/item/mech-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
const EA = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
};
function Ic(a) {
  const e = Number(a ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function PA({ defenseBonus: a = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(a ?? 0) || 0;
  i !== 0 && t.push(`Defense ${Ic(i)}`);
  const n = ri(e);
  for (const [s, r] of Object.entries(EA)) {
    const o = Number((n == null ? void 0 : n[s]) ?? 0) || 0;
    o !== 0 && t.push(`${r} ${Ic(o)}`);
  }
  return t.join(" | ");
}
class po extends oi {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      position: {
        width: 960,
        height: 860
      },
      window: {
        ...super.DEFAULT_OPTIONS.window,
        minWidth: 920,
        minHeight: 760
      }
    }, { inplace: !1 });
  }
  async _prepareContext(e) {
    var l, c, u, d, m, f, p, h, g, y, b, S, w, M, P, E;
    const t = await super._prepareContext(e), i = this.item, n = i.actor ?? null, s = ((l = n == null ? void 0 : n.getPersonalCombatLoadout) == null ? void 0 : l.call(n)) ?? null, r = ((c = s == null ? void 0 : s.activeArmor) == null ? void 0 : c.id) ?? null, o = ((u = s == null ? void 0 : s.activeArmor) == null ? void 0 : u.id) === i.id ? s.activeArmor : (d = i.getArmorProfile) == null ? void 0 : d.call(i, { actor: n });
    return t.armorState = o, t.isActiveArmor = r === i.id, t.effectiveDurabilityCurrent = Number(
      ((m = o == null ? void 0 : o.durability) == null ? void 0 : m.current) ?? ((p = (f = i.system) == null ? void 0 : f.durability) == null ? void 0 : p.current) ?? ((g = (h = i.system) == null ? void 0 : h.durability) == null ? void 0 : g.max) ?? ((y = i.system) == null ? void 0 : y.rating) ?? 0
    ), t.effectiveArmorRating = Number(
      (o == null ? void 0 : o.currentArmorRating) ?? (o == null ? void 0 : o.ratingCurrent) ?? Math.min(
        Number(((b = i.system) == null ? void 0 : b.rating) ?? 0),
        Number(((w = (S = i.system) == null ? void 0 : S.durability) == null ? void 0 : w.current) ?? ((P = (M = i.system) == null ? void 0 : M.durability) == null ? void 0 : P.max) ?? ((E = i.system) == null ? void 0 : E.rating) ?? 0)
      )
    ), t.effectiveArmorResist = Number(
      (o == null ? void 0 : o.baseMitigation) ?? (o == null ? void 0 : o.baseResistance) ?? 0
    ), t.armorModifierSummary = this._getArmorModifierSummary(o), t.itemSheet = { ...t.itemSheet ?? {} }, t.itemSheet.summaryChips = this._getSummaryChips(o), t.armorEditor = {
      standardTraits: [...Cf]
    }, t;
  }
  _getSummaryChips(e = null) {
    var s, r, o, l, c, u, d, m, f, p, h, g, y, b, S;
    const t = this.item.system ?? {}, i = [
      {
        label: "Rating",
        value: String(Number(
          (e == null ? void 0 : e.ratingCurrent) ?? (e == null ? void 0 : e.currentArmorRating) ?? Math.min(
            Number(t.rating ?? 0),
            Number(((s = t.durability) == null ? void 0 : s.current) ?? ((r = t.durability) == null ? void 0 : r.max) ?? t.rating ?? 0)
          )
        ))
      },
      { label: "Defense", value: String(Number(t.defenseBonus ?? 0)) },
      {
        label: "Durability",
        value: `${Number(((o = e == null ? void 0 : e.durability) == null ? void 0 : o.current) ?? ((l = t.durability) == null ? void 0 : l.current) ?? ((c = t.durability) == null ? void 0 : c.max) ?? 0)}/${Number(((u = e == null ? void 0 : e.durability) == null ? void 0 : u.max) ?? ((d = t.durability) == null ? void 0 : d.max) ?? t.rating ?? 0)}`
      },
      {
        label: "Resist",
        value: String(Number((e == null ? void 0 : e.baseMitigation) ?? (e == null ? void 0 : e.baseResistance) ?? 0))
      }
    ], n = Number(((f = (m = e == null ? void 0 : e.traitState) == null ? void 0 : m.reinforced) == null ? void 0 : f.max) ?? ((h = (p = t == null ? void 0 : t.traitState) == null ? void 0 : p.reinforced) == null ? void 0 : h.max) ?? 0);
    return n > 0 && i.push({
      label: "Reinforced",
      value: `${Number(((y = (g = e == null ? void 0 : e.traitState) == null ? void 0 : g.reinforced) == null ? void 0 : y.current) ?? ((S = (b = t == null ? void 0 : t.traitState) == null ? void 0 : b.reinforced) == null ? void 0 : S.current) ?? 0)}/${n}`
    }), i;
  }
  _getArmorModifierSummary(e = null) {
    const t = this.item.system ?? {};
    return PA({
      defenseBonus: (e == null ? void 0 : e.defenseBonus) ?? t.defenseBonus ?? 0,
      mitigationByType: (e == null ? void 0 : e.mitigationByType) ?? (e == null ? void 0 : e.typedMitigation) ?? t.mitigationByType ?? {}
    });
  }
  _onRender(e, t) {
    var n, s;
    (n = super._onRender) == null || n.call(this, e, t);
    const i = (s = this._getRootElement) == null ? void 0 : s.call(this);
    i && (i.querySelectorAll(".mwd-armor-standard-trait-add").forEach((r) => {
      r.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).createArmorStandardTrait) == null || c.call(l);
      });
    }), i.querySelectorAll(".mwd-armor-standard-trait-delete").forEach((r) => {
      r.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).deleteArmorStandardTrait) == null || c.call(l, r.dataset.traitId);
      });
    }), i.querySelectorAll(".mwd-armor-standard-trait-field").forEach((r) => {
      r.addEventListener("change", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).updateArmorStandardTrait) == null || c.call(
          l,
          r.dataset.traitId,
          r.dataset.field,
          r.value
        );
      });
    }));
  }
}
D(po, "LAYOUT_ID", "armor"), D(po, "PARTS", {
  sheet: {
    template: `${X}/v2/item/armor-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
function RA() {
  console.log(`${Me}Registering Item sheets (V2)`);
  const { Items: a } = foundry.documents.collections;
  a.registerSheet(T, no, { types: ["contact"], makeDefault: !0, label: "Contact (V2)" }), a.registerSheet(T, so, { types: ["gear", "consumable"], makeDefault: !0, label: "Gear / Consumable (V2)" }), a.registerSheet(T, ro, { types: ["quality"], makeDefault: !0, label: "Quality (V2)" }), a.registerSheet(T, oo, { types: ["assetModule"], makeDefault: !0, label: "Asset Module (V2)" }), a.registerSheet(T, lo, { types: ["lifeModule"], makeDefault: !0, label: "Life Module (V2)" }), a.registerSheet(T, co, { types: ["skill"], makeDefault: !0, label: "Skill (V2)" }), a.registerSheet(T, mo, { types: ["personalWeapon", "weapon"], makeDefault: !0, label: "Personal Weapon (V2)" }), a.registerSheet(T, fo, { types: ["mechWeapon"], makeDefault: !0, label: "Mech Weapon (V2)" }), a.registerSheet(T, po, { types: ["armor"], makeDefault: !0, label: "Armor (V2)" });
}
const Dc = [
  // UI (CSB render entry point + node types)
  `systems/${T}/templates/v2/ui/layout-root.hbs`,
  `systems/${T}/templates/v2/ui/nodes/hexabox.hbs`,
  `systems/${T}/templates/v2/ui/nodes/stack.hbs`,
  `systems/${T}/templates/v2/ui/nodes/panel.hbs`,
  `systems/${T}/templates/v2/ui/nodes/include.hbs`,
  `systems/${T}/templates/v2/ui/nodes/tabs.hbs`,
  `systems/${T}/templates/v2/ui/nodes/accordion.hbs`,
  `systems/${T}/templates/v2/ui/nodes/unknown.hbs`,
  `systems/${T}/templates/common/view-mode.hbs`,
  `systems/${T}/templates/common/label.hbs`,
  `systems/${T}/templates/common/enum-value-label.hbs`,
  `systems/${T}/templates/common/damage-code.hbs`,
  `systems/${T}/templates/common/damage-armor.hbs`,
  `systems/${T}/templates/v2/ui/mod-stepper.hbs`,
  `systems/${T}/templates/v2/ui/condition-monitors.hbs`,
  `systems/${T}/templates/v2/roll/_mwd-roll-card.hbs`,
  `systems/${T}/templates/v2/roll/_mwd-damage-application-card.hbs`,
  `systems/${T}/templates/v2/roll/_mwd-hazard-card.hbs`,
  `systems/${T}/templates/v2/components/checkbox.hbs`,
  `systems/${T}/templates/v2/components/radio.hbs`,
  // Character UI
  `systems/${T}/templates/v2/ui/character/attributes.hbs`,
  `systems/${T}/templates/v2/ui/character/combat-actions.hbs`,
  `systems/${T}/templates/v2/ui/character/skills-column.hbs`,
  `systems/${T}/templates/v2/ui/character/skill-row.hbs`,
  `systems/${T}/templates/v2/ui/character/edge-console.hbs`,
  `systems/${T}/templates/v2/ui/character/burn-monitor.hbs`,
  `systems/${T}/templates/v2/ui/character/status-dashboard.hbs`,
  `systems/${T}/templates/v2/ui/character/inventory-section.hbs`,
  `systems/${T}/templates/v2/ui/character/inventory-record.hbs`,
  `systems/${T}/templates/v2/ui/character/bio-identity.hbs`,
  `systems/${T}/templates/v2/ui/character/bio-history.hbs`,
  `systems/${T}/templates/v2/ui/vehicle/summary-bar.hbs`,
  `systems/${T}/templates/v2/ui/vehicle/attributes-grid.hbs`,
  `systems/${T}/templates/v2/ui/vehicle/active-crits.hbs`,
  `systems/${T}/templates/v2/ui/vehicle/record-section.hbs`,
  `systems/${T}/templates/v2/ui/battlemech/chassis-fields.hbs`,
  `systems/${T}/templates/v2/ui/battlemech/heat-track.hbs`,
  `systems/${T}/templates/v2/ui/battlemech/quick-actions.hbs`,
  `systems/${T}/templates/v2/ui/battlemech/weapon-groups.hbs`,
  `systems/${T}/templates/v2/ui/battlemech/hardpoints.hbs`,
  `systems/${T}/templates/v2/ui/vehicle/pilot-panel.hbs`,
  `systems/${T}/templates/v2/ui/character/assigned-mech.hbs`,
  // Sheet wrapper
  `systems/${T}/templates/v2/actor/_sheet-root.hbs`,
  `systems/${T}/templates/v2/actor/npc-sheet.hbs`,
  `systems/${T}/templates/v2/actor/vehicle-sheet.hbs`,
  `systems/${T}/templates/v2/actor/battlemech-sheet.hbs`,
  // Placeholders
  `systems/${T}/templates/v2/ui/placeholders/assigned-systems.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/inventory-gear.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/inventory-consumables.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/inventory-armor.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/inventory-weapons.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/bio-description.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/bio-traits.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/bio-life-modules.hbs`,
  `systems/${T}/templates/v2/ui/actor/field-grid.hbs`,
  `systems/${T}/templates/v2/ui/actor/owned-item-list.hbs`,
  `systems/${T}/templates/v2/ui/actor/action-buttons.hbs`,
  `systems/${T}/templates/v2/ui/actor/notes-editor.hbs`,
  `systems/${T}/templates/v2/ui/actor/hardpoint-list.hbs`,
  `systems/${T}/templates/v2/ui/actor/weapon-group-list.hbs`,
  // V2 item partials
  `systems/${T}/templates/v2/item/_item-sheet-root.hbs`,
  `systems/${T}/templates/v2/item/contact.hbs`,
  `systems/${T}/templates/v2/item/gear.hbs`,
  `systems/${T}/templates/v2/item/consumable.hbs`,
  `systems/${T}/templates/v2/item/assetModule.hbs`,
  `systems/${T}/templates/v2/item/skill.hbs`,
  `systems/${T}/templates/v2/item/lifeModule.hbs`,
  `systems/${T}/templates/v2/item/quality.hbs`,
  `systems/${T}/templates/v2/item/personal-weapon-root.hbs`,
  `systems/${T}/templates/v2/item/mech-weapon-root.hbs`,
  `systems/${T}/templates/v2/item/armor-root.hbs`,
  `systems/${T}/templates/v2/item/parts/itemname.hbs`,
  `systems/${T}/templates/v2/item/parts/inactive.hbs`,
  `systems/${T}/templates/v2/item/parts/references.hbs`,
  `systems/${T}/templates/v2/item/parts/gear-main.hbs`,
  `systems/${T}/templates/v2/item/parts/consumable-main.hbs`,
  `systems/${T}/templates/v2/item/parts/skill-main.hbs`,
  `systems/${T}/templates/v2/item/parts/life-module-main.hbs`,
  `systems/${T}/templates/v2/item/parts/quality-main.hbs`,
  `systems/${T}/templates/v2/item/parts/quality-limits.hbs`,
  `systems/${T}/templates/v2/item/parts/quality-prerequisites.hbs`,
  `systems/${T}/templates/v2/item/parts/quality-effects.hbs`,
  `systems/${T}/templates/v2/item/parts/modifier.hbs`,
  `systems/${T}/templates/v2/item/parts/modifiers.hbs`,
  `systems/${T}/templates/v2/item/parts/weapon-main.hbs`,
  `systems/${T}/templates/v2/item/parts/weapon-compact-main.hbs`,
  `systems/${T}/templates/v2/item/parts/weapon-summary-hero.hbs`,
  `systems/${T}/templates/v2/item/parts/weapon-combat-essentials.hbs`,
  `systems/${T}/templates/v2/item/parts/weapon-usage-bands.hbs`,
  `systems/${T}/templates/v2/item/parts/weapon-ammo-profiles.hbs`,
  `systems/${T}/templates/v2/item/parts/weapon-consumption-sources.hbs`,
  `systems/${T}/templates/v2/item/parts/weapon-notes-reference.hbs`,
  `systems/${T}/templates/v2/item/parts/armor-main.hbs`,
  `systems/${T}/templates/v2/item/parts/armor-summary-hero.hbs`,
  `systems/${T}/templates/v2/item/parts/armor-combat-essentials.hbs`,
  `systems/${T}/templates/v2/item/parts/armor-usage-protection.hbs`,
  `systems/${T}/templates/v2/item/parts/armor-resistance-modifiers.hbs`,
  `systems/${T}/templates/v2/item/parts/armor-identity-fields.hbs`,
  `systems/${T}/templates/v2/item/parts/armor-standard-traits.hbs`,
  `systems/${T}/templates/v2/item/parts/armor-notes-reference.hbs`,
  `systems/${T}/templates/v2/item/parts/item-effects.hbs`,
  // Actors
  `systems/${T}/templates/v2/actor/character-sheet.hbs`,
  `systems/${T}/templates/v2/actor/vehicle-sheet.hbs`,
  `systems/${T}/templates/v2/actor/battlemech-sheet.hbs`
];
function NA(a) {
  const e = String(a).replaceAll("\\", "/"), t = `systems/${T}/templates/`, i = e.indexOf(t);
  return `mwd.${(i >= 0 ? e.slice(i + t.length) : e).replace(/\.hbs$/i, "").split("/").filter(Boolean).map((o) => o.replace(/^_+/, "")).join(".")}`;
}
function IA() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
async function DA() {
  var e, t;
  const a = IA();
  try {
    const i = {};
    for (const s of Dc)
      i[NA(s)] = s, i[s] = s;
    await foundry.applications.handlebars.loadTemplates(i);
    const n = "mwd.v2.ui.layout-root";
    if (!((e = Handlebars.partials) != null && e[n])) {
      const s = Object.keys(Handlebars.partials ?? {});
      throw console.error("Missing required partial:", n), console.error("Closest matches:", s.filter((r) => r.includes("layout-root"))), new Error(`Template preload failed: ${n} not registered`);
    }
    if (a !== Handlebars) {
      for (const [s, r] of Object.entries(a.partials ?? {}))
        if (!((t = Handlebars.partials) != null && t[s]))
          try {
            Handlebars.registerPartial(s, r);
          } catch {
          }
    }
    console.log(`${Me}preloadTemplatesV2 OK`, { loaded: Dc.length });
  } catch (i) {
    throw console.error(`${Me}preloadTemplatesV2 FAILED`, i), i;
  }
}
function OA(a = {}) {
  return Object.entries(ri(a)).filter(([, e]) => Number(e) > 0).map(([e, t]) => `${e} +${t}`).join(", ");
}
class _A extends Actor {
  /** @override */
  async _preCreate(e, t, i) {
    super._preCreate && await super._preCreate(e, t, i);
    const n = await hd("Actor", (e == null ? void 0 : e.type) ?? this.type), s = {};
    n.system && Object.keys(n.system).length && (s.system = foundry.utils.mergeObject(
      foundry.utils.deepClone(n.system),
      foundry.utils.deepClone((e == null ? void 0 : e.system) ?? this.system ?? {}),
      { inplace: !1, recursive: !0, overwrite: !0 }
    )), n.prototypeToken && (s.prototypeToken = foundry.utils.mergeObject(
      foundry.utils.deepClone(n.prototypeToken),
      foundry.utils.deepClone((e == null ? void 0 : e.prototypeToken) ?? this.prototypeToken ?? {}),
      { inplace: !1, recursive: !0, overwrite: !0 }
    )), Object.keys(s).length && this.updateSource(s);
  }
  /* -------------------------------------------- */
  /* Base & Derived Data                           */
  /* -------------------------------------------- */
  /** @override */
  prepareBaseData() {
    var e, t;
    if (super.prepareBaseData(), this.isCharacterLike()) {
      const i = this.system ?? {};
      if (op(i), i.speed = Math.max(0, Math.trunc(Number(i.speed ?? 12) || 12)), (e = i.skills) != null && e.skills && typeof i.skills.skills == "object") {
        for (const [n, s] of Object.entries(i.skills.skills))
          (t = i.skills)[n] ?? (t[n] = s);
        delete i.skills.skills;
      }
    }
    this._prepareEdgePoolsBase();
  }
  /** @override */
  prepareDerivedData() {
    super.prepareDerivedData(), this._prepareEdgePoolsDerived(), this._prepareMonitors(), this._preparePersonalCombatDerived();
  }
  /**
   * Base-data prep for Edge pools:
   * - Ensure numeric rating/value where present
   * - Initialize value ONLY if missing/invalid (NOT if 0)
   * - Remove legacy keys (max)
   * - No clamping, no "start full" behavior
   */
  _prepareEdgePoolsBase() {
    var t, i;
    if (this.type !== "character") return;
    const e = (i = (t = this.system) == null ? void 0 : t.counters) == null ? void 0 : i.edgePools;
    if (!(!e || typeof e != "object"))
      for (const n of Object.values(e)) {
        if (!n || typeof n != "object") continue;
        n.rating = Math.max(0, Number(n.rating ?? 0));
        const s = Object.prototype.hasOwnProperty.call(n, "value"), r = Number(n.value);
        (!s || !Number.isFinite(r)) && (n.value = n.rating), "max" in n && delete n.max;
      }
  }
  /**
   * Derived-data prep for Edge pools:
   * - Computes cap/effectiveMax/effectiveValue
   * - Stores in a non-persisted cache on the actor instance
   * - No writes to system data (prevents UI snap-back / loops)
   */
  _prepareEdgePoolsDerived() {
    var i, n;
    this._mwdDerived ?? (this._mwdDerived = {}), this._mwdDerived.edgePools = null;
    const e = this.getEdgeCap(), t = this.type === "character" ? _i(this).bonusByEdgePool ?? {} : {};
    if (this.type === "character" && this.hasEdgePools()) {
      const s = ((n = (i = this.system) == null ? void 0 : i.counters) == null ? void 0 : n.edgePools) ?? {}, r = {};
      for (const [o, l] of Object.entries(s)) {
        const c = Math.max(0, Number((l == null ? void 0 : l.rating) ?? 0)), u = Math.max(0, Number((l == null ? void 0 : l.value) ?? 0)), d = Math.max(0, Number((t == null ? void 0 : t[o]) ?? 0)), m = c + d, f = Math.min(m, e), p = Math.min(u, f);
        r[o] = {
          key: o,
          rating: c,
          ratingBonus: d,
          effectiveRating: m,
          value: u,
          cap: e,
          effectiveMax: f,
          effectiveValue: p,
          hasPools: !0,
          isEmpty: p <= 0,
          isCapped: m > e
        };
      }
      this._mwdDerived.edgePools = { cap: e, pools: r };
      return;
    }
    this._mwdDerived.edgePools = { cap: e, pools: {} };
  }
  /* -------------------------------------------- */
  /* Capabilities                                  */
  /* -------------------------------------------- */
  isCharacterLike() {
    return this.type === "character" || this.type === "npc";
  }
  hasSkills() {
    return this.type === "character" || this.type === "npc";
  }
  hasEdgePools() {
    var e, t;
    return this.type === "character" && !!((t = (e = this.system) == null ? void 0 : e.counters) != null && t.edgePools);
  }
  getAttributeValue(e) {
    var t, i, n;
    return Math.max(0, Number(((n = (i = (t = this.system) == null ? void 0 : t.attributes) == null ? void 0 : i[e]) == null ? void 0 : n.value) ?? 0));
  }
  getSkillRating(e) {
    var t, i, n;
    return Math.max(0, Number(((n = (i = (t = this.system) == null ? void 0 : t.skills) == null ? void 0 : i[e]) == null ? void 0 : n.rating) ?? 0));
  }
  getOwnedItem(e) {
    var t, i;
    return ((i = (t = this.items) == null ? void 0 : t.get) == null ? void 0 : i.call(t, e)) ?? null;
  }
  async setCheckbarValue(e, t) {
    return await this.update({ [e]: t });
  }
  getPersonalCombatLoadout({ refresh: e = !1 } = {}) {
    var i;
    if (!e) {
      const n = (i = this._mwdDerived) == null ? void 0 : i.personalCombat;
      if (n) return n;
    }
    const t = this._computePersonalCombatLoadout();
    return this._mwdDerived ?? (this._mwdDerived = {}), this._mwdDerived.personalCombat = t, t;
  }
  _computePersonalCombatLoadout() {
    const e = [], t = this.items.filter((f) => {
      var p;
      return ((p = f.isPersonalWeapon) == null ? void 0 : p.call(f)) ?? f.type === A.itemType.personalWeapon;
    }).map((f) => {
      var p;
      return ((p = f.getCombatProfile) == null ? void 0 : p.call(f)) ?? null;
    }).filter(Boolean), i = this.items.filter((f) => {
      var p;
      return ((p = f.isArmor) == null ? void 0 : p.call(f)) ?? f.type === A.itemType.armor;
    }).map((f) => {
      var p;
      return ((p = f.getArmorProfile) == null ? void 0 : p.call(f, { actor: this })) ?? null;
    }).filter(Boolean), n = t.filter((f) => f.equipped), s = i.filter((f) => f.equipped), r = n.filter((f) => f.isPrimary), o = s.filter((f) => f.isPrimary);
    let l = null, c = null, u = !1;
    r.length === 1 ? (c = r[0], l = c) : r.length > 1 ? (e.push("Multiple equipped primary weapons found; attack selection requires a chooser."), u = !0) : n.length === 1 ? l = n[0] : n.length > 1 ? u = !0 : l = $t.buildDefaultUnarmedProfile(this);
    let d = null, m = null;
    return o.length === 1 ? (d = o[0], m = this._buildActiveArmorState(d)) : o.length > 1 ? (e.push("Multiple equipped primary armor items found; using the first equipped armor."), m = s[0] ? this._buildActiveArmorState(s[0]) : null) : s.length === 1 ? m = this._buildActiveArmorState(s[0]) : s.length > 1 && (e.push("Multiple equipped armor items found without a single primary; using the first equipped armor."), m = this._buildActiveArmorState(s[0])), {
      weapons: t,
      equippedWeapons: n,
      primaryWeapon: c,
      defaultWeapon: l,
      weaponChoiceRequired: u,
      armor: i,
      equippedArmor: s,
      primaryArmor: d,
      activeArmor: m,
      warnings: e
    };
  }
  _buildActiveArmorState(e) {
    var l, c;
    if (!e) return null;
    const t = Math.max(0, Number(((l = e == null ? void 0 : e.durability) == null ? void 0 : l.max) ?? (e == null ? void 0 : e.rating) ?? 0)), i = Math.min(
      t,
      Math.max(0, Number(((c = e == null ? void 0 : e.durability) == null ? void 0 : c.current) ?? (e == null ? void 0 : e.remainingDurability) ?? (e == null ? void 0 : e.currentArmorRating) ?? t))
    ), n = Math.max(0, Number((e == null ? void 0 : e.rating) ?? 0)), s = Math.min(n, i), r = ri(e == null ? void 0 : e.mitigationByType), o = Mo(s);
    return {
      ...e,
      armorId: e.id,
      remainingDurability: i,
      currentArmorRating: s,
      baseMitigation: o,
      baseResistance: o,
      mitigationByType: r,
      typedMitigation: r,
      ratingCurrent: s,
      isDestroyed: i <= 0,
      durability: {
        current: i,
        max: t
      }
    };
  }
  async setOwnedItemEquipped(e, t) {
    var n, s, r;
    const i = this.getOwnedItem(e);
    return !i || !((n = i.isPersonalWeapon) != null && n.call(i) || (s = i.isArmor) != null && s.call(i)) ? null : this.updateEmbeddedDocuments("Item", [{
      _id: i.id,
      "system.equipped": !!t,
      "system.isPrimary": t ? !!((r = i.system) != null && r.isPrimary) : !1
    }]);
  }
  async setOwnedItemPrimary(e, t) {
    var r, o, l, c;
    const i = this.getOwnedItem(e);
    if (!i || !((r = i.isPersonalWeapon) != null && r.call(i) || (o = i.isArmor) != null && o.call(i))) return null;
    const n = [], s = !!t;
    if (s)
      for (const u of this.items.filter((d) => d.type === i.type && d.id !== i.id))
        (l = u.system) != null && l.isPrimary && n.push({ _id: u.id, "system.isPrimary": !1 });
    return n.push({
      _id: i.id,
      "system.isPrimary": s,
      "system.equipped": s ? !0 : !!((c = i.system) != null && c.equipped)
    }), this.updateEmbeddedDocuments("Item", n);
  }
  /* -------------------------------------------- */
  /* Edge API (cap + pools w/ rating + current)    */
  /* -------------------------------------------- */
  getEdgeCap() {
    var e, t, i;
    return Math.max(0, Number(((i = (t = (e = this.system) == null ? void 0 : e.attributes) == null ? void 0 : t.edge) == null ? void 0 : i.value) ?? 0));
  }
  getEdgePoolRaw(e) {
    var t, i, n;
    return ((n = (i = (t = this.system) == null ? void 0 : t.counters) == null ? void 0 : i.edgePools) == null ? void 0 : n[e]) ?? null;
  }
  /**
   * Canonical pool accessor.
   * - Character: returns raw + effective values (effective is clamped by cap)
   * - NPC: no pools; Edge attribute acts as a single “pool” (effective max/value = cap)
   * - Vehicle/Mech: safe zeros
   */
  getEdgePool(e) {
    var d, m, f, p;
    const t = this.getEdgeCap();
    if (this.type === "npc" && !this.hasEdgePools()) {
      const h = t, g = t;
      return {
        key: e,
        value: g,
        rating: h,
        effectiveValue: g,
        effectiveMax: h,
        cap: t,
        hasPools: !1
      };
    }
    if (!this.hasEdgePools())
      return {
        key: e,
        value: 0,
        rating: 0,
        effectiveValue: 0,
        effectiveMax: 0,
        cap: t,
        hasPools: !1
      };
    const i = (f = (m = (d = this._mwdDerived) == null ? void 0 : d.edgePools) == null ? void 0 : m.pools) == null ? void 0 : f[e];
    if (i)
      return {
        key: i.key,
        value: i.value,
        rating: i.rating,
        ratingBonus: i.ratingBonus,
        effectiveRating: i.effectiveRating,
        effectiveValue: i.effectiveValue,
        effectiveMax: i.effectiveMax,
        cap: i.cap,
        hasPools: !0
      };
    const n = this.getEdgePoolRaw(e), s = Math.max(0, Number((n == null ? void 0 : n.rating) ?? 0)), r = Math.max(0, Number((n == null ? void 0 : n.value) ?? 0)), o = Math.max(0, Number(((p = _i(this).bonusByEdgePool) == null ? void 0 : p[e]) ?? 0)), l = s + o, c = Math.min(l, t), u = Math.min(r, c);
    return {
      key: e,
      value: r,
      rating: s,
      ratingBonus: o,
      effectiveRating: l,
      effectiveValue: u,
      effectiveMax: c,
      cap: t,
      hasPools: !0
    };
  }
  getEdgePoolValue(e) {
    return this.getEdgePool(e).effectiveValue;
  }
  getEdgePoolMax(e) {
    return this.getEdgePool(e).effectiveMax;
  }
  /**
   * Set the CURRENT value for a pool (admin/adjustment or spend).
   * - Characters only (six pools).
   * - Clamps to [0, effectiveMax] where effectiveMax = min(rating, edgeCap).
   * - Does not modify rating.
   */
  async setEdgePoolValue(e, t) {
    var r;
    if (!this.hasEdgePools()) return;
    const i = Math.max(0, Number(((r = this.getEdgePool(e)) == null ? void 0 : r.effectiveMax) ?? 0)), n = Number(t ?? 0), s = Math.max(0, Math.min(n, i));
    return this.update({
      [`system.counters.edgePools.${e}.value`]: s
    });
  }
  /**
   * Convenience: adjust CURRENT value by delta (e.g., spend -1, award +1).
   */
  async adjustEdgePoolValue(e, t) {
    var s;
    if (!this.hasEdgePools()) return;
    const i = Math.max(0, Number(((s = this.getEdgePoolRaw(e)) == null ? void 0 : s.value) ?? 0)), n = Number(t ?? 0);
    return this.setEdgePoolValue(e, i + n);
  }
  /**
   * Set the RATING (advancement ceiling) for a pool.
   * Stores true rating (not cap-clamped), then clamps current value to new effective max.
   */
  async setEdgePoolRating(e, t) {
    var c, u;
    if (!this.hasEdgePools()) return;
    const i = this.getEdgeCap(), n = Math.max(0, Number(t ?? 0)), s = Math.max(0, Number(((c = _i(this).bonusByEdgePool) == null ? void 0 : c[e]) ?? 0)), r = Math.min(n + s, i), o = Math.max(0, Number(((u = this.getEdgePoolRaw(e)) == null ? void 0 : u.value) ?? 0)), l = Math.min(o, r);
    return this.update({
      [`system.counters.edgePools.${e}.rating`]: n,
      [`system.counters.edgePools.${e}.value`]: l
    });
  }
  /**
   * Sheet-facing summary for rendering.
   * If `groups` is provided, returns grouped pool arrays.
   */
  getEdgePoolSummary({ groups: e } = {}) {
    var i, n, s, r;
    const t = this.getEdgeCap();
    if (this.hasEdgePools()) {
      const o = ((n = (i = this._mwdDerived) == null ? void 0 : i.edgePools) == null ? void 0 : n.pools) ?? {};
      if (e && typeof e == "object") {
        const c = Object.entries(e).map(([u, d]) => {
          const m = (d ?? []).map((f) => {
            const p = o[f] ?? this.getEdgePool(f);
            return {
              ...p,
              isEmpty: (p.effectiveValue ?? 0) <= 0,
              isCapped: (p.effectiveRating ?? p.rating ?? 0) > (p.cap ?? t)
            };
          });
          return { id: u, pools: m };
        });
        return { cap: t, hasPools: !0, groups: c, pools: [] };
      }
      const l = Object.keys(((r = (s = this.system) == null ? void 0 : s.counters) == null ? void 0 : r.edgePools) ?? {}).map((c) => {
        const u = o[c] ?? this.getEdgePool(c);
        return {
          ...u,
          isEmpty: (u.effectiveValue ?? 0) <= 0,
          isCapped: (u.effectiveRating ?? u.rating ?? 0) > (u.cap ?? t)
        };
      });
      return { cap: t, hasPools: !0, groups: [], pools: l };
    }
    return { cap: t, hasPools: !1, groups: [], pools: [] };
  }
  /**
   * Spend Edge from a pool (decrement current value).
   * - Characters only (six pools)
   * - Amount defaults to 1
   * - Safe no-op if pool missing
   */
  async spendEdge(e, t = 1, i = {}) {
    if (!this.hasEdgePools()) return;
    const n = Math.max(0, Number(t ?? 1));
    if (!n) return;
    let s = n;
    if (!i.skipTraitHooks) {
      const o = i.runtime ?? {}, l = {
        poolKey: e,
        amount: n,
        source: String(i.source ?? "").trim(),
        eventKey: String(i.eventKey ?? "").trim()
      }, c = xt({
        actor: this,
        phase: "onEdgeSpend",
        facts: Nr({ actor: this, packet: l, phase: "onEdgeSpend", runtime: o }),
        packet: l,
        options: { runtime: o, consumeUsage: !0 }
      });
      await yi({ actor: this, mutations: c.mutations, runtime: o }), s = Math.max(0, Number(c.packet.amount ?? n) || 0);
    }
    const r = s;
    if (r)
      return this.adjustEdgePoolValue(e, -r);
  }
  async gainEdge(e, t = 1, i = {}) {
    if (!this.hasEdgePools()) return;
    const n = Number(t ?? 0);
    if (!n) return;
    let s = n;
    if (!i.skipTraitHooks) {
      const r = i.runtime ?? {}, o = {
        poolKey: e,
        amount: n,
        source: String(i.source ?? "").trim(),
        eventKey: String(i.eventKey ?? "").trim()
      }, l = xt({
        actor: this,
        phase: "onEdgeGain",
        facts: Nr({ actor: this, packet: o, phase: "onEdgeGain", runtime: r }),
        packet: o,
        options: { runtime: r, consumeUsage: !0 }
      });
      await yi({ actor: this, mutations: l.mutations, runtime: r }), s = Number(l.packet.amount ?? n) || 0;
    }
    return this.adjustEdgePoolValue(e, s);
  }
  /* -------------------------------------------- */
  /* Document Lifecycle                            */
  /* -------------------------------------------- */
  /** @override */
  async _onUpdate(e, t, i) {
    await super._onUpdate(e, t, i), game.userId === i && (t != null && t.mwdSyncOverloadedFromEffect || foundry.utils.hasProperty(e, "system.burn.overloaded") && await this._syncOverloadedEffect(!!e.system.burn.overloaded));
  }
  _onCreateDescendantDocuments(e, t, i, n, s, r) {
    super._onCreateDescendantDocuments(e, t, i, n, s, r), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  _onUpdateDescendantDocuments(e, t, i, n, s, r) {
    super._onUpdateDescendantDocuments(e, t, i, n, s, r), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  _onDeleteDescendantDocuments(e, t, i, n, s, r) {
    super._onDeleteDescendantDocuments(e, t, i, n, s, r), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  async _syncOverloadedEffect(e) {
    await this.toggleStatusEffect("overloaded", { active: e, overlay: !1 });
  }
  async _syncOverloadedFieldFromEffects() {
    var i, n, s, r;
    const e = ((n = (i = this.statuses) == null ? void 0 : i.has) == null ? void 0 : n.call(i, "overloaded")) ?? !1, t = !!((r = (s = this.system) == null ? void 0 : s.burn) != null && r.overloaded);
    e !== t && await this.update(
      { "system.burn.overloaded": e },
      { mwdSyncOverloadedFromEffect: !0 }
    );
  }
  /* -------------------------------------------- */
  /* Condition Monitors                            */
  /* -------------------------------------------- */
  async setMonitorValue(e, t, { source: i = "unknown" } = {}) {
    var d, m, f, p, h, g;
    if (e === "burn") {
      const y = Math.max(0, Number(t) || 0);
      return this.update({ "system.burn.value": y });
    }
    if (e === "armor" && this.isCharacterLike()) {
      const y = this.getPersonalCombatLoadout({ refresh: !0 }), b = ((d = y == null ? void 0 : y.activeArmor) == null ? void 0 : d.armorId) ?? ((m = y == null ? void 0 : y.activeArmor) == null ? void 0 : m.id) ?? null, S = b ? this.items.get(b) : null;
      if (!(S != null && S.id)) return null;
      const w = Math.max(0, Number(((f = S.system) == null ? void 0 : f.rating) ?? 0) || 0), M = Math.max(0, Number(((h = (p = S.system) == null ? void 0 : p.durability) == null ? void 0 : h.max) ?? 0) || 0), P = M > 0 ? M : w, E = Math.min(Math.max(0, Number(t) || 0), P);
      return this.updateEmbeddedDocuments("Item", [{
        _id: S.id,
        "system.durability.max": P,
        "system.durability.current": E
      }]);
    }
    const n = `system.monitors.${e}`, s = Number(foundry.utils.getProperty(this, `${n}.max`)) || 0, r = Math.max(0, s), o = Math.min(Math.max(0, Number(t) || 0), r), l = { [`${n}.value`]: o }, c = this.type, u = (g = Hs == null ? void 0 : Hs[c]) == null ? void 0 : g[e];
    if (u != null && u.derived)
      for (const [y, b] of Object.entries(u.derived)) {
        const S = ar == null ? void 0 : ar[b.fn];
        if (typeof S != "function") continue;
        const w = gy(this, e, b.source, o);
        l[`${n}.derived.${y}`] = S(w);
      }
    return this.update(l);
  }
  _prepareMonitors() {
    var o, l, c, u, d, m, f, p;
    const e = this.system.monitors ?? {}, t = hy(e);
    (o = this.system).derived ?? (o.derived = {}), this.system.derived.monitors = t;
    const i = Number(((l = t == null ? void 0 : t.physical) == null ? void 0 : l.penalty) ?? 0), n = Number(((c = t == null ? void 0 : t.fatigue) == null ? void 0 : c.penalty) ?? 0), s = Number(((u = t == null ? void 0 : t.armor) == null ? void 0 : u.resistance) ?? 0), r = i + n;
    e.physical ?? (e.physical = {}), (d = e.physical).derived ?? (d.derived = {}), e.physical.derived.penalty = i, e.fatigue ?? (e.fatigue = {}), (m = e.fatigue).derived ?? (m.derived = {}), e.fatigue.derived.penalty = n, e.armor ?? (e.armor = {}), (f = e.armor).derived ?? (f.derived = {}), e.armor.derived.resistance = s, (p = this.system.derived).condition ?? (p.condition = {}), this.system.derived.condition.physicalPenalty = i, this.system.derived.condition.fatiguePenalty = n, this.system.derived.condition.totalPenalty = r, this.system.derived.conditionPenalty = r;
  }
  _preparePersonalCombatDerived() {
    var r, o, l, c, u, d;
    if (!this.isCharacterLike()) return;
    const e = this.getPersonalCombatLoadout({ refresh: !0 }), t = (o = (r = this.system) == null ? void 0 : r.monitors) == null ? void 0 : o.armor;
    if (!t) return;
    const i = e.activeArmor, n = Math.max(0, Number(((l = i == null ? void 0 : i.durability) == null ? void 0 : l.max) ?? 0)), s = Math.max(0, Number((i == null ? void 0 : i.remainingDurability) ?? ((c = i == null ? void 0 : i.durability) == null ? void 0 : c.current) ?? 0));
    t.max = n, t.value = Math.min(n, s), t.resistance = {
      default: Number((i == null ? void 0 : i.baseMitigation) ?? (i == null ? void 0 : i.baseResistance) ?? 0),
      byType: {}
    }, t.resistanceBonusByType = i != null && i.isDestroyed ? {} : (i == null ? void 0 : i.mitigationByType) ?? (i == null ? void 0 : i.typedMitigation) ?? {}, t.derived ?? (t.derived = {}), t.derived.resistance = Number((i == null ? void 0 : i.baseMitigation) ?? (i == null ? void 0 : i.baseResistance) ?? 0), t.effect = i != null && i.isDestroyed ? "Destroyed" : i ? OA(i.mitigationByType ?? i.typedMitigation) : "", (u = this.system).derived ?? (u.derived = {}), this.system.derived.personalCombat = {
      defaultWeaponId: ((d = e.defaultWeapon) == null ? void 0 : d.id) ?? null,
      activeArmorId: (i == null ? void 0 : i.id) ?? null,
      warnings: [...e.warnings ?? []]
    };
  }
}
async function LA({ actor: a, payload: e } = {}) {
  var g, y, b, S, w, M;
  if (!a) throw new Error("resolveSkill requires actor");
  const t = String((e == null ? void 0 : e.key) ?? "").trim(), i = zt(t);
  if (!i) throw new Error(`Unknown skill: ${t}`);
  const n = a.system ?? {}, s = String((e == null ? void 0 : e.attrKey) ?? i.attribute ?? "").trim();
  if (!s) throw new Error(`Skill ${t} missing attribute key`);
  const r = Number(((y = (g = n == null ? void 0 : n.attributes) == null ? void 0 : g[s]) == null ? void 0 : y.value) ?? 0), o = Number(((S = (b = n == null ? void 0 : n.skills) == null ? void 0 : b[t]) == null ? void 0 : S.rating) ?? 0), l = Number(((M = (w = n == null ? void 0 : n.skills) == null ? void 0 : w[t]) == null ? void 0 : M.bonus) ?? 0), c = new Set(Ts(n, t)), u = Ro(t, e == null ? void 0 : e.specializationKey), d = u && c.has(u.key) ? u : null, m = d ? Co : 0, f = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : i.domains ?? [], p = Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : Number.isFinite(Number(e == null ? void 0 : e.target)) ? Number(e.target) : 5, h = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1;
  return {
    intent: "skill",
    rollType: "simple",
    title: `${i.label} (${s})`,
    subtitle: a.name ?? "Actor",
    domains: f,
    // Per-die threshold (cs>=X). Kept separate from dnHits.
    diceTarget: p,
    // DN = hits needed for success
    difficulty: { dn: h },
    edge: {
      earn: { enabled: !0, rate: 4, maxPerRoll: 1 }
    },
    pool: { attribute: r, skill: o, bonus: l, specialization: m },
    breakdown: [
      { id: "attribute", label: "Attribute", value: r },
      { id: "skill", label: "Skill", value: o },
      { id: "bonus", label: "Bonus", value: l },
      ...d ? [{
        id: "specialization",
        label: `Specialization (${d.label})`,
        value: m
      }] : []
    ],
    specialization: d ? {
      key: d.key,
      label: d.label,
      value: m,
      skillKey: t
    } : null,
    // optional extra metadata (safe to stash)
    data: {
      skillKey: t,
      attrKey: s,
      label: `${s}+${i.label}`,
      specializationKey: (d == null ? void 0 : d.key) ?? "",
      specializationLabel: (d == null ? void 0 : d.label) ?? ""
    }
  };
}
const xA = /* @__PURE__ */ new Set([
  "grit",
  "chaos",
  "insight",
  "rumor",
  "legend",
  "credibility"
]), $A = {
  grit: "physical",
  chaos: "physical",
  insight: "mental",
  rumor: "mental",
  legend: "social",
  credibility: "social"
};
async function BA({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveEdge requires actor");
  const t = String((e == null ? void 0 : e.pool) ?? "").trim();
  if (!xA.has(t)) throw new Error(`Invalid edge pool: ${t}`);
  const i = a.getEdgePool(t), n = Math.max(0, Number((i == null ? void 0 : i.effectiveValue) ?? 0));
  return {
    intent: "edge",
    title: `Edge — ${t}`,
    subtitle: a.name ?? "Actor",
    domains: [$A[t] ?? "unknown"],
    // drop "edge" tag unless you truly want it
    // Make it directly rollable by the core roll pipeline
    target: 5,
    poolTotal: n,
    breakdown: [
      { id: "current", label: "Current", value: Number((i == null ? void 0 : i.value) ?? 0) },
      { id: "rating", label: "Rating", value: Number((i == null ? void 0 : i.rating) ?? 0) },
      { id: "cap", label: "Edge Cap", value: Number((i == null ? void 0 : i.cap) ?? 0) },
      { id: "usable", label: "Usable", value: n }
    ],
    data: { poolKey: t }
  };
}
async function zA({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Attribute",
    intent: "attribute",
    domainTags: ["general"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function FA({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveCommon requires actor");
  const t = String((e == null ? void 0 : e.id) ?? "").trim();
  if (!t) throw new Error("Common rolls require payload.id");
  const i = _o(t);
  if (!i) throw new Error(`Unknown common check: ${t}`);
  const n = Array.isArray(i.formula) ? i.formula : [];
  if (n.length !== 2)
    throw new Error(`Common check ${t} must define exactly two attributes.`);
  const s = n.map((c) => {
    var d, m, f;
    const u = Op(c);
    if (!u) throw new Error(`Common check ${t} uses unsupported attribute code: ${c}`);
    return {
      code: String(c).trim().toUpperCase(),
      key: u,
      label: _p(c),
      value: Number(((f = (m = (d = a.system) == null ? void 0 : d.attributes) == null ? void 0 : m[u]) == null ? void 0 : f.value) ?? 0)
    };
  }), r = s.reduce((c, u) => c + Number(u.value ?? 0), 0), o = Array.isArray(i.tags) ? [...i.tags] : [], l = Array.isArray(i.domains) ? [...i.domains] : [];
  return {
    intent: "common",
    rollType: "simple",
    title: String(i.label ?? t).trim() || t,
    subtitle: a.name ?? "Actor",
    domains: l,
    tags: o,
    formula: Lp(n),
    difficulty: {
      dn: Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1
    },
    edge: {
      earn: { enabled: !0, rate: 4, maxPerRoll: 1 }
    },
    pool: {
      attribute: r,
      skill: 0,
      bonus: 0,
      specialization: 0
    },
    breakdown: s.map((c) => ({
      id: `attribute.${c.code.toLowerCase()}`,
      label: c.label,
      value: c.value
    })),
    data: {
      commonCheckId: t,
      label: String(i.label ?? t).trim() || t,
      formulaCodes: n,
      tags: o,
      attributes: s
    }
  };
}
const UA = 90;
var Uc;
const HA = Number(((Uc = CONST == null ? void 0 : CONST.REGION_VISIBILITY) == null ? void 0 : Uc.ALWAYS) ?? 2) || 2;
function cs() {
  var a, e;
  return Number(((a = canvas.grid) == null ? void 0 : a.size) ?? ((e = canvas.dimensions) == null ? void 0 : e.size) ?? 100) || 100;
}
function jA(a = {}) {
  return Math.max(0, Number((a == null ? void 0 : a.size) ?? 0) || 0);
}
function $a(a) {
  var t, i, n, s;
  return ((i = (t = canvas.tokens) == null ? void 0 : t.controlled) == null ? void 0 : i.find((r) => {
    var o;
    return ((o = r.actor) == null ? void 0 : o.id) === (a == null ? void 0 : a.id);
  })) ?? null ?? ((s = (n = a == null ? void 0 : a.getActiveTokens) == null ? void 0 : n.call(a, !0, !0)) == null ? void 0 : s[0]) ?? null;
}
function Oc(a) {
  var e, t;
  return Number(
    ((e = a == null ? void 0 : a.document) == null ? void 0 : e.disposition) ?? (a == null ? void 0 : a.disposition) ?? ((t = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : t.NEUTRAL) ?? 0
  );
}
function us(a) {
  var r, o, l, c, u;
  const e = (a == null ? void 0 : a.center) ?? ((r = a == null ? void 0 : a.object) == null ? void 0 : r.center);
  if (e) return { x: Number(e.x ?? 0), y: Number(e.y ?? 0) };
  const t = Number((a == null ? void 0 : a.x) ?? ((o = a == null ? void 0 : a.document) == null ? void 0 : o.x) ?? 0), i = Number((a == null ? void 0 : a.y) ?? ((l = a == null ? void 0 : a.document) == null ? void 0 : l.y) ?? 0), n = Number((a == null ? void 0 : a.w) ?? (a == null ? void 0 : a.width) ?? ((c = a == null ? void 0 : a.document) == null ? void 0 : c.width) ?? 1) * cs(), s = Number((a == null ? void 0 : a.h) ?? (a == null ? void 0 : a.height) ?? ((u = a == null ? void 0 : a.document) == null ? void 0 : u.height) ?? 1) * cs();
  return { x: t + n / 2, y: i + s / 2 };
}
function WA(a) {
  var i, n, s, r;
  const e = Number((a == null ? void 0 : a.w) ?? ((i = a == null ? void 0 : a.object) == null ? void 0 : i.w) ?? 0) || Number(((n = a == null ? void 0 : a.document) == null ? void 0 : n.width) ?? 1) * cs(), t = Number((a == null ? void 0 : a.h) ?? ((s = a == null ? void 0 : a.object) == null ? void 0 : s.h) ?? 0) || Number(((r = a == null ? void 0 : a.document) == null ? void 0 : r.height) ?? 1) * cs();
  return Math.max(e, t) / 2;
}
function KA() {
  var t;
  const a = ((t = canvas == null ? void 0 : canvas.stage) == null ? void 0 : t.pivot) ?? null, e = (canvas == null ? void 0 : canvas.dimensions) ?? {};
  return {
    x: Number((a == null ? void 0 : a.x) ?? e.width / 2 ?? 0) || 0,
    y: Number((a == null ? void 0 : a.y) ?? e.height / 2 ?? 0) || 0
  };
}
function GA() {
  var a;
  return Array.from(((a = game.user) == null ? void 0 : a.targets) ?? []).find((e) => e == null ? void 0 : e.actor) ?? null;
}
function qA(a, e) {
  return {
    x: (Number((a == null ? void 0 : a.x) ?? 0) + Number((e == null ? void 0 : e.x) ?? 0)) / 2,
    y: (Number((a == null ? void 0 : a.y) ?? 0) + Number((e == null ? void 0 : e.y) ?? 0)) / 2
  };
}
function VA({ template: a = {}, actor: e = null } = {}) {
  const t = String((a == null ? void 0 : a.placement) ?? "").trim().toLowerCase(), i = $a(e), n = GA(), s = i ? us(i) : null, r = n ? us(n) : null;
  return t === "origin" && s ? s : t === "targeted" && r ? r : t === "placed" && s && r ? qA(s, r) : KA();
}
function YA({ attack: a = {}, actor: e = null } = {}) {
  const t = (a == null ? void 0 : a.template) ?? null, i = String((t == null ? void 0 : t.shape) ?? "").trim().toLowerCase();
  if (!i) return null;
  const n = VA({ template: t, actor: e });
  return ze({
    shape: i,
    x: n.x,
    y: n.y,
    direction: 0,
    distance: jA(t),
    angle: i === "cone" ? UA : null,
    width: i === "line" ? 1 : null,
    placementMode: (t == null ? void 0 : t.placement) ?? null
  });
}
function QA() {
  var e, t;
  const a = new PIXI.Container();
  return a.eventMode = "none", a.sortableChildren = !0, (t = (e = canvas.stage) == null ? void 0 : e.addChild) == null || t.call(e, a), a;
}
function JA(a) {
  var e;
  a != null && a.parent && a.parent.removeChild(a), (e = a == null ? void 0 : a.destroy) == null || e.call(a, { children: !0 });
}
function XA() {
  const a = QA(), e = new PIXI.Container();
  e.eventMode = "none", e.zIndex = 5;
  const t = new PIXI.Container();
  return t.eventMode = "none", t.zIndex = 10, a.addChild(e), a.addChild(t), { root: a, templateLayer: e, markerLayer: t };
}
function ZA(a) {
  JA((a == null ? void 0 : a.root) ?? a);
}
function eT() {
  var t;
  const a = String(((t = game.user) == null ? void 0 : t.color) ?? "#ff6400").replace("#", "").trim(), e = Number.parseInt(a, 16);
  return Number.isFinite(e) ? e : 16737280;
}
function Cm(a) {
  var e;
  (e = a == null ? void 0 : a.removeChildren) == null || e.call(a).forEach((t) => {
    var i;
    return (i = t.destroy) == null ? void 0 : i.call(t, { children: !0 });
  });
}
function ho(a) {
  var c, u, d;
  const e = ((c = canvas == null ? void 0 : canvas.app) == null ? void 0 : c.view) ?? null, t = ((u = canvas == null ? void 0 : canvas.app) == null ? void 0 : u.renderer) ?? null, i = (canvas == null ? void 0 : canvas.stage) ?? null;
  if (!e || !i) return null;
  const n = Number((a == null ? void 0 : a.clientX) ?? NaN), s = Number((a == null ? void 0 : a.clientY) ?? NaN);
  if (!Number.isFinite(n) || !Number.isFinite(s)) return null;
  const r = e.getBoundingClientRect();
  if (n < r.left || n > r.right || s < r.top || s > r.bottom) return null;
  const o = new PIXI.Point();
  if (typeof ((d = t == null ? void 0 : t.events) == null ? void 0 : d.mapPositionToPoint) == "function")
    t.events.mapPositionToPoint(o, n, s);
  else {
    const m = Number((t == null ? void 0 : t.resolution) ?? window.devicePixelRatio ?? 1) || 1;
    o.x = (n - r.left) * m, o.y = (s - r.top) * m;
  }
  const l = i.toLocal(o);
  return {
    x: Number((l == null ? void 0 : l.x) ?? 0) || 0,
    y: Number((l == null ? void 0 : l.y) ?? 0) || 0
  };
}
function tT(a, e) {
  const t = Number((e == null ? void 0 : e.x) ?? 0) - Number((a == null ? void 0 : a.x) ?? 0), i = Number((e == null ? void 0 : e.y) ?? 0) - Number((a == null ? void 0 : a.y) ?? 0);
  return t === 0 && i === 0 ? 0 : Math.atan2(i, t) * 180 / Math.PI;
}
function fr(a = 0) {
  var i, n, s, r, o;
  const e = Number(((i = canvas.grid) == null ? void 0 : i.size) ?? ((n = canvas.dimensions) == null ? void 0 : n.size) ?? 100) || 100, t = Number(((r = (s = canvas.scene) == null ? void 0 : s.grid) == null ? void 0 : r.distance) ?? ((o = canvas.dimensions) == null ? void 0 : o.distance) ?? 1) || 1;
  return Number(a ?? 0) * (e / t);
}
function iT({ geometry: a = null, pointer: e = null, attack: t = {}, actor: i = null } = {}) {
  var l;
  const n = ze(a);
  if (!n) return null;
  const s = si(n) ?? null;
  if (!s || !e) return s;
  const o = String(((l = t == null ? void 0 : t.template) == null ? void 0 : l.placement) ?? s.placementMode ?? "").trim().toLowerCase() !== "origin";
  if (o && (s.x = e.x, s.y = e.y), ["line", "cone", "rect"].includes(String(s.shape ?? "").trim().toLowerCase())) {
    const c = $a(i), u = c ? us(c) : null, d = o ? u ?? { x: Number(n.x ?? 0), y: Number(n.y ?? 0) } : { x: Number(s.x ?? 0), y: Number(s.y ?? 0) };
    s.direction = tT(d, e);
  }
  return ze(s);
}
function aT(a, e = null) {
  if (!a) return;
  Cm(a);
  const t = ze(e);
  if (!t) return;
  const i = eT(), n = new PIXI.Graphics();
  switch (n.lineStyle(3, i, 0.95), n.beginFill(i, 0.18), String(t.shape ?? "").trim().toLowerCase()) {
    case "blast": {
      n.drawCircle(
        Number(t.x ?? 0),
        Number(t.y ?? 0),
        fr(t.distance ?? 0)
      );
      break;
    }
    case "rect": {
      const s = fr(t.width ?? 0), r = fr(t.height ?? 0);
      n.position.set(Number(t.x ?? 0), Number(t.y ?? 0)), n.rotation = Number(t.direction ?? 0) * Math.PI / 180, n.drawRect(
        -(Number(t.anchorX ?? 0) || 0) * s,
        -(Number(t.anchorY ?? 0) || 0) * r,
        s,
        r
      );
      break;
    }
    default: {
      const [s] = gs(t);
      (s == null ? void 0 : s.type) === "polygon" && Array.isArray(s.points) && s.points.length >= 3 && n.drawPolygon(s.points.flatMap((r) => [Number((r == null ? void 0 : r.x) ?? 0), Number((r == null ? void 0 : r.y) ?? 0)]));
      break;
    }
  }
  n.endFill(), a.addChild(n);
}
function nT(a = ne.none) {
  return a === ne.full ? 14042437 : a === ne.major ? 15174447 : a === ne.minor ? 15782993 : 10134706;
}
function sT(a, e = []) {
  if (a) {
    Cm(a);
    for (const t of e) {
      const i = us(t.token), n = Math.max(20, WA(t.token) + 12), s = nT(t.exposureTier), r = new PIXI.Graphics();
      r.lineStyle(4, s, 0.95), r.beginFill(s, 0.14), r.drawCircle(i.x, i.y, n), r.endFill(), r.zIndex = 10;
      const o = new PIXI.Text(Bt(t.exposureTier), {
        fontFamily: "MWD UI",
        fontSize: 18,
        fontWeight: "700",
        fill: s,
        stroke: 1118481,
        strokeThickness: 4,
        align: "center"
      });
      o.anchor.set(0.5, 1), o.position.set(i.x, i.y - n - 6), o.zIndex = 11, a.addChild(r), a.addChild(o);
    }
  }
}
function Em(a, e = {}) {
  var s, r, o, l, c, u, d, m, f, p, h, g, y, b, S, w;
  const t = (a == null ? void 0 : a.actor) ?? null;
  if (!t) return null;
  const i = ((s = t == null ? void 0 : t.getPersonalCombatLoadout) == null ? void 0 : s.call(t)) ?? null, n = (i == null ? void 0 : i.activeArmor) ?? null;
  return {
    tokenId: (a == null ? void 0 : a.id) ?? null,
    tokenUuid: ((r = a == null ? void 0 : a.document) == null ? void 0 : r.uuid) ?? null,
    actorId: t.id,
    actorUuid: t.uuid,
    name: t.name ?? (a == null ? void 0 : a.name) ?? "Target",
    attributes: {
      reflexes: Number(((c = (l = (o = t == null ? void 0 : t.system) == null ? void 0 : o.attributes) == null ? void 0 : l.reflexes) == null ? void 0 : c.value) ?? 0) || 0
    },
    skills: {
      tactics: {
        rating: Number(((m = (d = (u = t == null ? void 0 : t.system) == null ? void 0 : u.skills) == null ? void 0 : d.tactics) == null ? void 0 : m.rating) ?? 0) || 0
      }
    },
    activeArmor: n ? {
      armorId: n.id,
      rating: Number(n.ratingCurrent ?? n.rating ?? 0),
      currentArmorRating: Number(n.currentArmorRating ?? ((f = n.durability) == null ? void 0 : f.current) ?? 0),
      remainingDurability: Number(n.remainingDurability ?? ((p = n.durability) == null ? void 0 : p.current) ?? 0),
      baseMitigation: Number(n.baseMitigation ?? n.baseResistance ?? 0),
      baseResistance: Number(n.baseMitigation ?? n.baseResistance ?? 0),
      mitigationByType: { ...n.mitigationByType ?? n.typedMitigation ?? {} },
      tags: [...n.tags ?? []],
      isDestroyed: !!n.isDestroyed,
      defenseBonus: Number(n.defenseBonus ?? 0)
    } : null,
    exposure: Li({
      tier: ((h = e == null ? void 0 : e.exposure) == null ? void 0 : h.initialTier) ?? ((g = e == null ? void 0 : e.exposure) == null ? void 0 : g.tier) ?? (e == null ? void 0 : e.exposureTier) ?? ne.none,
      appliedTier: ((y = e == null ? void 0 : e.exposure) == null ? void 0 : y.finalTier) ?? ((b = e == null ? void 0 : e.exposure) == null ? void 0 : b.appliedTier) ?? (e == null ? void 0 : e.exposureTier) ?? ne.none,
      evadeUsed: !!((S = e == null ? void 0 : e.exposure) != null && S.evadeUsed),
      evadeLocked: !!((w = e == null ? void 0 : e.exposure) != null && w.evadeLocked)
    }),
    areaEffect: e != null && e.areaEffect ? foundry.utils.deepClone(e.areaEffect) : null
  };
}
function rT({ attack: a = {}, geometry: e = null, attacker: t = null } = {}) {
  var o;
  const i = (a == null ? void 0 : a.template) ?? null, n = ze(e);
  if (!i || !n) return [];
  const s = $a(t), r = (s == null ? void 0 : s.id) ?? null;
  return (((o = canvas.tokens) == null ? void 0 : o.placeables) ?? []).filter((l) => l == null ? void 0 : l.actor).filter((l) => l.id !== r || (i == null ? void 0 : i.placement) === "origin").filter((l) => hs(n, l)).map((l) => {
    const c = tu({ geometry: n, token: l });
    return Em(l, {
      exposureTier: c,
      areaEffect: {
        templateShape: (i == null ? void 0 : i.shape) ?? "",
        templatePlacement: (i == null ? void 0 : i.placement) ?? "",
        templateGeometry: si(n)
      }
    });
  }).filter(Boolean);
}
function oT({ attack: a = {}, geometry: e = null, attacker: t = null } = {}) {
  var o;
  const i = (a == null ? void 0 : a.template) ?? null, n = $a(t), s = (n == null ? void 0 : n.id) ?? null, r = ze(e);
  return !i || !r ? [] : (((o = canvas.tokens) == null ? void 0 : o.placeables) ?? []).filter((l) => l == null ? void 0 : l.actor).filter((l) => l.id !== s || (i == null ? void 0 : i.placement) === "origin").filter((l) => hs(r, l)).map((l) => ({
    token: l,
    exposureTier: tu({ geometry: r, token: l })
  }));
}
function lT({ geometry: a = null, attack: e = {}, attacker: t = null } = {}) {
  var m, f, p, h;
  const i = (e == null ? void 0 : e.template) ?? null, n = ze(a);
  if (!i || !n) return [];
  const s = $a(t), r = (s == null ? void 0 : s.id) ?? null, o = Number(((m = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : m.HOSTILE) ?? -1), l = Number(((f = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : f.FRIENDLY) ?? 1), c = Number(((p = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : p.NEUTRAL) ?? 0), u = Oc(s), d = (g) => {
    const y = Oc(g);
    return s ? u === l ? y === o : u === o ? y === l : u === c ? y === o : y !== u : !0;
  };
  return (((h = canvas.tokens) == null ? void 0 : h.placeables) ?? []).filter((g) => g == null ? void 0 : g.actor).filter((g) => g.id !== r || (i == null ? void 0 : i.placement) === "origin").filter((g) => hs(n, g)).filter(d).map((g) => String(g.id ?? "").trim()).filter(Boolean);
}
function cT(a = {}) {
  var i;
  const e = String(((i = a == null ? void 0 : a.template) == null ? void 0 : i.shape) ?? "template").trim().toLowerCase();
  return `${e ? `${e.slice(0, 1).toUpperCase()}${e.slice(1)}` : "Template"} placement: left-click to place, right-click or Esc to cancel, Enter or Space to confirm.`;
}
async function uT({ attack: a = {} } = {}) {
  var t, i;
  const e = cT(a);
  return e && ((i = (t = ui.notifications) == null ? void 0 : t.info) == null || i.call(t, e)), new Promise((n) => {
    let s = !1;
    const r = () => {
      window.removeEventListener("pointerdown", u, !0), window.removeEventListener("keydown", d, !0), window.removeEventListener("contextmenu", m, !0);
    }, o = (f = !1) => {
      s || (s = !0, r(), n(!!f));
    }, l = (f) => {
      var p, h, g;
      (p = f == null ? void 0 : f.preventDefault) == null || p.call(f), (h = f == null ? void 0 : f.stopPropagation) == null || h.call(f), (g = f == null ? void 0 : f.stopImmediatePropagation) == null || g.call(f);
    }, c = (f) => {
      if (!(f instanceof HTMLElement)) return !1;
      const p = String(f.tagName ?? "").trim().toUpperCase();
      return f.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(p);
    }, u = (f) => {
      const p = Number((f == null ? void 0 : f.button) ?? 0), h = ho(f);
      if (p === 2 && h) {
        l(f), o(!1);
        return;
      }
      p !== 0 || !h || (l(f), o(!0));
    }, d = (f) => {
      const p = String((f == null ? void 0 : f.key) ?? ""), h = String((f == null ? void 0 : f.code) ?? "");
      if (p === "Escape") {
        l(f), o(!1);
        return;
      }
      c((f == null ? void 0 : f.target) ?? document.activeElement) || (p === "Enter" || p === "NumpadEnter" || p === " " || p === "Spacebar" || h === "Space") && (l(f), o(!0));
    }, m = (f) => {
      ho(f) && l(f);
    };
    window.addEventListener("pointerdown", u, !0), window.addEventListener("keydown", d, !0), window.addEventListener("contextmenu", m, !0);
  });
}
async function dT({ actor: a = null, attack: e = {}, templateGeometry: t = null } = {}) {
  var o, l, c, u, d, m;
  if (!(canvas != null && canvas.scene) || Jc((e == null ? void 0 : e.areaEffect) ?? ((o = e == null ? void 0 : e.payload) == null ? void 0 : o.areaEffect) ?? {})) return null;
  const i = ze(t, {
    template: e == null ? void 0 : e.template,
    placement: e == null ? void 0 : e.templatePlacement
  });
  if (!i) return null;
  const n = gs(i);
  if (!n.length) return null;
  const s = `${String(((l = e == null ? void 0 : e.weapon) == null ? void 0 : l.name) ?? (e == null ? void 0 : e.name) ?? "Template").trim() || "Template"} Template`, [r] = await canvas.scene.createEmbeddedDocuments("Region", [{
    name: s,
    color: String(((c = game.user) == null ? void 0 : c.color) ?? "#ff6400").trim() || "#ff6400",
    visibility: HA,
    locked: !1,
    shapes: n,
    flags: {
      mwd: {
        templateIndicator: {
          sourceActorUuid: (a == null ? void 0 : a.uuid) ?? null,
          sourceItemUuid: ((u = e == null ? void 0 : e.weapon) == null ? void 0 : u.uuid) ?? null,
          payloadId: ((d = e == null ? void 0 : e.payloadState) == null ? void 0 : d.activePayloadId) ?? ((m = e == null ? void 0 : e.payload) == null ? void 0 : m.id) ?? "",
          label: s,
          templateGeometry: si(i),
          templatePlacement: foundry.utils.deepClone((e == null ? void 0 : e.templatePlacement) ?? null),
          template: foundry.utils.deepClone((e == null ? void 0 : e.template) ?? null)
        }
      }
    }
  }]);
  return r ?? null;
}
async function mT({ actor: a, attack: e } = {}) {
  if (!(canvas != null && canvas.scene))
    throw ji("Templated attacks require an active scene canvas.", { severity: "warn" });
  const t = (e == null ? void 0 : e.template) ?? null;
  if (!(t != null && t.shape) || !(Number(t == null ? void 0 : t.size) > 0))
    throw ji("Templated attack is missing valid template configuration.", { severity: "warn" });
  if (!Ym.includes(t.shape))
    throw ji(`Template shape "${t.shape}" is normalized but not supported in v1.`, { severity: "warn" });
  const i = $a(a);
  if (t.placement === "origin" && !i)
    throw ji("Origin-placed templated attacks require the attacker to have a token on the current scene.", { severity: "warn" });
  const n = YA({ attack: e, actor: a });
  if (!n)
    throw ji("Unable to initialize template placement for this attack.", { severity: "warn" });
  const s = XA();
  let r = si(n), o = "";
  const l = (d = null) => JSON.stringify({
    shape: (d == null ? void 0 : d.shape) ?? "",
    x: Number((d == null ? void 0 : d.x) ?? 0),
    y: Number((d == null ? void 0 : d.y) ?? 0),
    direction: Number((d == null ? void 0 : d.direction) ?? 0),
    distance: Number((d == null ? void 0 : d.distance) ?? 0),
    angle: Number((d == null ? void 0 : d.angle) ?? 0),
    width: Number((d == null ? void 0 : d.width) ?? 0),
    height: Number((d == null ? void 0 : d.height) ?? 0),
    anchorX: Number((d == null ? void 0 : d.anchorX) ?? 0),
    anchorY: Number((d == null ? void 0 : d.anchorY) ?? 0),
    placementMode: (d == null ? void 0 : d.placementMode) ?? ""
  }), c = () => {
    aT(s.templateLayer, r), sT(s.markerLayer, oT({ attack: e, geometry: r, attacker: a }));
  }, u = (d) => {
    const m = ho(d);
    if (!m) return;
    const f = iT({
      geometry: r,
      pointer: m,
      attack: e,
      actor: a
    });
    if (!f) return;
    const p = l(f);
    p !== o && (r = f, o = p, c());
  };
  try {
    if (o = l(r), c(), window.addEventListener("pointermove", u), !await uT({
      attack: {
        ...e,
        actor: a
      }
    })) return null;
    const m = si(r);
    if (!m) return null;
    const f = hf(m, t), p = rT({
      attack: e,
      geometry: m,
      attacker: a
    });
    return {
      templateGeometry: si(m),
      placement: (f == null ? void 0 : f.placement) ?? null,
      autoTargetTokenIds: lT({
        geometry: m,
        attack: e,
        attacker: a
      }),
      targetSnapshots: p
    };
  } finally {
    window.removeEventListener("pointermove", u), ZA(s);
  }
}
function fT(a = {}) {
  var e;
  return Array.isArray(a == null ? void 0 : a.targetSnapshots) ? a.targetSnapshots : Array.from(((e = game.user) == null ? void 0 : e.targets) ?? []).map(Em).filter(Boolean);
}
function pT(a, e = {}) {
  var n, s, r, o, l, c, u, d, m;
  const t = String((e == null ? void 0 : e.sourceTokenId) ?? "").trim();
  if (t) {
    const f = ((s = (n = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : n.get) == null ? void 0 : s.call(n, t)) ?? ((l = (o = (r = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : r.placeables) == null ? void 0 : o.find) == null ? void 0 : l.call(o, (p) => (p == null ? void 0 : p.id) === t)) ?? null;
    if (f) return f;
  }
  return ((u = (c = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : c.controlled) == null ? void 0 : u.find((f) => {
    var p;
    return ((p = f.actor) == null ? void 0 : p.id) === (a == null ? void 0 : a.id);
  })) ?? null ?? ((m = (d = a == null ? void 0 : a.getActiveTokens) == null ? void 0 : d.call(a, !0, !0)) == null ? void 0 : m[0]) ?? null;
}
function hT(a = {}) {
  var t, i, n, s, r;
  const e = String((a == null ? void 0 : a.tokenId) ?? "").trim();
  return e ? ((i = (t = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : t.get) == null ? void 0 : i.call(t, e)) ?? ((r = (s = (n = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : n.placeables) == null ? void 0 : s.find) == null ? void 0 : r.call(s, (o) => (o == null ? void 0 : o.id) === e)) ?? null : null;
}
function gT(a, e) {
  var r, o, l, c;
  const t = canvas == null ? void 0 : canvas.grid, i = (a == null ? void 0 : a.center) ?? ((r = a == null ? void 0 : a.object) == null ? void 0 : r.center) ?? null, n = (e == null ? void 0 : e.center) ?? ((o = e == null ? void 0 : e.object) == null ? void 0 : o.center) ?? null;
  if (!t || !i || !n) return null;
  if (typeof t.measurePath == "function")
    try {
      const u = t.measurePath([i, n], { gridSpaces: !0 }), d = Number(
        (u == null ? void 0 : u.distance) ?? (u == null ? void 0 : u.cost) ?? (u == null ? void 0 : u.totalDistance) ?? (u == null ? void 0 : u.totalCost) ?? NaN
      );
      if (Number.isFinite(d)) return d;
    } catch {
    }
  const s = ((c = (l = foundry == null ? void 0 : foundry.canvas) == null ? void 0 : l.geometry) == null ? void 0 : c.Ray) ?? globalThis.Ray;
  if (typeof t.measureDistances == "function" && typeof s == "function")
    try {
      const u = t.measureDistances([{ ray: new s(i, n) }], { gridSpaces: !0 }), d = Number(Array.isArray(u) ? u[0] : NaN);
      if (Number.isFinite(d)) return d;
    } catch {
      return null;
    }
  return null;
}
function yT({ actor: a, payload: e, weapon: t, targets: i = [] } = {}) {
  const n = String((e == null ? void 0 : e.rangeBand) ?? "").trim().toLowerCase();
  if (!(((t == null ? void 0 : t.type) === "personalWeapon" || (t == null ? void 0 : t.isSynthetic)) && i.length === 1))
    return n || String((t == null ? void 0 : t.defaultRangeBand) ?? "close").trim() || "close";
  const r = pT(a, e), o = hT(i[0]), l = gT(r, o), c = Ch(l, (t == null ? void 0 : t.range) ?? {}, (t == null ? void 0 : t.defaultRangeBand) ?? "close");
  return c === "outOfRange" ? c : n || ((t == null ? void 0 : t.type) !== "personalWeapon" && !(t != null && t.isSynthetic) || i.length !== 1 ? String((t == null ? void 0 : t.defaultRangeBand) ?? "close").trim() || "close" : c);
}
function bT(a) {
  return (a == null ? void 0 : a.type) === A.actorTypes.vehicle || (a == null ? void 0 : a.type) === A.actorTypes.battlemech;
}
function Pm(a) {
  return ["mechWeapon", "vehicleWeapon"].includes((a == null ? void 0 : a.canonicalType) ?? (a == null ? void 0 : a.type));
}
function ST(a = {}, e = {}) {
  return {
    close: Number(a.close ?? 0) + Number(e.close ?? 0),
    near: Number(a.near ?? 0) + Number(e.near ?? 0),
    far: Number(a.far ?? 0) + Number(e.far ?? 0),
    extreme: Number(a.extreme ?? 0) + Number(e.extreme ?? 0)
  };
}
function AT(a, e) {
  var m, f, p, h;
  const t = String((e == null ? void 0 : e.weaponGroupId) ?? ((m = e == null ? void 0 : e.machineWeaponGroup) == null ? void 0 : m.id) ?? "").trim();
  if (!t) return null;
  const i = Array.from(((f = a.system) == null ? void 0 : f.weaponGroups) ?? ((h = (p = a.system) == null ? void 0 : p.mwd) == null ? void 0 : h.weaponGroupDetails) ?? []).find((g) => String((g == null ? void 0 : g.id) ?? "").trim() === t) ?? null, n = Array.isArray(i == null ? void 0 : i.weaponIds) ? i.weaponIds : Array.isArray(i == null ? void 0 : i.weapons) ? i.weapons.map((g) => g == null ? void 0 : g.id).filter(Boolean) : [], s = n.map((g) => {
    var y, b;
    return (b = (y = a.items) == null ? void 0 : y.get) == null ? void 0 : b.call(y, g);
  }).filter((g) => g && Pm(g));
  if (!i || !s.length) return null;
  const r = s.map((g) => {
    var y;
    return ((y = g.getCombatProfile) == null ? void 0 : y.call(g)) ?? null;
  }).filter(Boolean), o = r[0] ?? {}, l = r.reduce((g, y) => ST(g, y.attackRatingBand), {}), c = r.reduce((g, y) => g + (Number(y.damage ?? 0) || 0), 0), u = Math.max(0, ...r.map((g) => Number(g.ap ?? 0) || 0)), d = String(o.skill ?? "gunnery").trim() || "gunnery";
  return {
    id: i.id,
    uuid: a.uuid ?? null,
    name: i.name || "Weapon Group",
    img: o.img,
    type: "mechWeaponGroup",
    machineWeaponGroup: {
      id: i.id,
      weaponIds: n,
      weaponNames: s.map((g) => g.name)
    },
    category: o.category ?? "ranged",
    skill: d,
    skillDef: zt(d),
    damage: c,
    ap: u,
    damageType: o.damageType ?? "kinetic",
    attackRatingBand: l,
    range: o.range ?? {},
    defaultRangeBand: o.defaultRangeBand ?? "near",
    effects: {},
    notes: r.map((g) => g.notes).filter(Boolean).join(`
`)
  };
}
function TT(a, e) {
  var i, n, s, r, o, l, c, u, d, m;
  if (((i = e == null ? void 0 : e.syntheticWeapon) == null ? void 0 : i.id) === "unarmed") {
    const f = $t.buildDefaultUnarmedProfile(a);
    return {
      ...f,
      ...e.syntheticWeapon,
      damage: f.damage,
      attackRatingBand: {
        ...((n = e.syntheticWeapon) == null ? void 0 : n.attackRatingBand) ?? f.attackRatingBand,
        close: f.attackRatingBand.close
      },
      isSynthetic: !0,
      defaultRangeBand: "close"
    };
  }
  if (bT(a)) {
    const f = AT(a, e);
    if (f) return f;
    const p = ((r = (s = a.items) == null ? void 0 : s.get) == null ? void 0 : r.call(s, (e == null ? void 0 : e.weaponId) ?? "")) ?? null;
    if (!p || !Pm(p))
      throw new Error("Machine attack requires an owned vehicle or BattleMech weapon.");
    return ((o = p.getCombatProfile) == null ? void 0 : o.call(p)) ?? null;
  }
  const t = ((c = (l = a.items) == null ? void 0 : l.get) == null ? void 0 : c.call(l, (e == null ? void 0 : e.weaponId) ?? "")) ?? null;
  if (!t || !(((u = t.isPersonalWeapon) == null ? void 0 : u.call(t)) ?? t.type === "personalWeapon") || !((d = t.system) != null && d.equipped))
    throw new Error("Attack requires an equipped personal weapon.");
  return ((m = t.getCombatProfile) == null ? void 0 : m.call(t, { payloadId: e == null ? void 0 : e.payloadId })) ?? null;
}
async function wT({ actor: a, payload: e } = {}) {
  var P, E, z, Y, Q, G, q, L, U, V, Z, re, ye, ce, se, Ie, Ue, He;
  if (!a) throw new Error("resolveAttack requires actor");
  const t = TT(a, e);
  if (!t) throw new Error("Unable to resolve weapon profile.");
  if (Array.isArray((P = t == null ? void 0 : t.capabilityReport) == null ? void 0 : P.errors) && t.capabilityReport.errors.length > 0)
    throw ji(
      ((E = t.capabilityReport.errors[0]) == null ? void 0 : E.message) ?? "Weapon capability data is invalid for this attack.",
      { severity: "warn" }
    );
  const i = zt(t.skill) ?? {
    code: t.skill,
    label: t.skill || "Attack",
    attribute: "reflexes",
    domains: ["physical"]
  }, n = String(i.attribute ?? "reflexes").trim() || "reflexes", s = ((z = a.getAttributeValue) == null ? void 0 : z.call(a, n)) ?? Number(((G = (Q = (Y = a.system) == null ? void 0 : Y.attributes) == null ? void 0 : Q[n]) == null ? void 0 : G.value) ?? 0), r = ((q = a.getSkillRating) == null ? void 0 : q.call(a, t.skill)) ?? Number(((V = (U = (L = a.system) == null ? void 0 : L.skills) == null ? void 0 : U[t.skill]) == null ? void 0 : V.rating) ?? 0), o = Number(((ye = (re = (Z = a.system) == null ? void 0 : Z.skills) == null ? void 0 : re[t.skill]) == null ? void 0 : ye.bonus) ?? 0), l = new Set(Ts(a.system ?? {}, t.skill)), c = Ro(t.skill, e == null ? void 0 : e.specializationKey), u = c && l.has(c.key) ? c : null, d = u ? Co : 0, m = Number(((ce = t == null ? void 0 : t.effects) == null ? void 0 : ce.accuracyMod) ?? 0) || 0, f = o + m, p = fT(e), h = yT({ actor: a, payload: e, weapon: t, targets: p }), g = (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? Ps(h) : h, y = Number(((se = t == null ? void 0 : t.attackRatingBand) == null ? void 0 : se[h]) ?? 0) || 0, b = !!((Ie = t == null ? void 0 : t.capabilityReport) != null && Ie.isTemplated), S = (Ue = e == null ? void 0 : e.aim) != null && Ue.active ? {
    active: !0,
    eligible: !b && p.length === 1,
    ineligibleReason: b ? "Aim cannot apply to template attacks." : p.length !== 1 ? "Aim cannot apply to multi-target attacks." : "",
    skillCode: t.skill,
    skillLabel: i.label ?? t.skill ?? "Attack Skill"
  } : null;
  if (!b && p.length === 0)
    throw ji("Target at least one token to attack.", { severity: "warn" });
  const w = Number(t.ap ?? 0) + Number(((He = t == null ? void 0 : t.effects) == null ? void 0 : He.ap) ?? 0), M = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? Mh(h, 1) : 1;
  return {
    intent: "attack",
    rollType: "simple",
    title: `${t.name} Attack`,
    subtitle: a.name ?? "Actor",
    domains: Array.isArray(i.domains) && i.domains.length ? i.domains : ["physical"],
    domainTags: ["combat", "attack"],
    diceTarget: Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : 5,
    difficulty: { dn: M },
    dn: {
      parts: [{
        id: "difficulty.current",
        label: (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? `Base DN (${g})` : "DN",
        value: M,
        tags: ["manual"]
      }],
      total: M
    },
    edge: {
      earn: { enabled: !0, rate: 4, maxPerRoll: 1 }
    },
    pool: { attribute: s, skill: r, bonus: f, specialization: d },
    breakdown: [
      { id: "attribute", label: "Attribute", value: s },
      { id: "skill", label: i.label, value: r },
      { id: "bonus", label: "Skill Bonus", value: o },
      ...u ? [{
        id: "specialization",
        label: `Specialization (${u.label})`,
        value: d
      }] : [],
      { id: "weaponAccuracy", label: "Weapon Accuracy", value: m },
      { id: "damage", label: "Damage", value: Number(t.damage ?? 0) || 0 },
      { id: "ap", label: "AP", value: w },
      { id: "attackRating", label: `Attack Rating (${g})`, value: y }
    ],
    attack: {
      rangeBand: h,
      weapon: t,
      payload: (t == null ? void 0 : t.payload) ?? null,
      payloadState: (t == null ? void 0 : t.payloadState) ?? null,
      source: (t == null ? void 0 : t.source) ?? null,
      sourceState: (t == null ? void 0 : t.sourceState) ?? null,
      template: (t == null ? void 0 : t.template) ?? null,
      areaEffect: (t == null ? void 0 : t.areaEffect) ?? null,
      templateGeometry: (e == null ? void 0 : e.templateGeometry) ?? null,
      templatePlacement: (e == null ? void 0 : e.templatePlacement) ?? null,
      resolution: (t == null ? void 0 : t.resolution) ?? null,
      resolverKey: (t == null ? void 0 : t.resolverKey) ?? "standard",
      fireModes: (t == null ? void 0 : t.fireModes) ?? null,
      keywords: (t == null ? void 0 : t.keywords) ?? [],
      capabilityReport: (t == null ? void 0 : t.capabilityReport) ?? null,
      skill: {
        code: i.code ?? t.skill,
        label: i.label ?? t.skill,
        attribute: n,
        specialization: u ? {
          key: u.key,
          label: u.label,
          value: d
        } : null
      },
      targets: p,
      aim: S,
      totalAp: w
    },
    specialization: u ? {
      key: u.key,
      label: u.label,
      value: d,
      skillKey: i.code ?? t.skill
    } : null
  };
}
async function kT({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Defense",
    intent: "defense",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function vT({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Resistance",
    intent: "resistance",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function MT({ actor: a } = {}) {
  var i, n, s, r, o, l;
  const e = Number(((s = (n = (i = a.system) == null ? void 0 : i.attributes) == null ? void 0 : n.reflexes) == null ? void 0 : s.value) ?? 0), t = Number(((l = (o = (r = a.system) == null ? void 0 : r.attributes) == null ? void 0 : o.edge) == null ? void 0 : l.value) ?? 0);
  return {
    intent: "initiative",
    title: "Initiative",
    rollType: "sum",
    // <- tells executor how to roll
    domains: ["combat"],
    // <- for organizational/filtering purposes
    sum: {
      formula: "2d6 + @ref + @edge",
      data: { ref: e, edge: t }
    },
    breakdown: [
      { id: "base", label: "2d6", value: 0 },
      { id: "ref", label: "REF", value: e },
      { id: "edge", label: "EDGE", value: t }
    ],
    // keep pool numeric to satisfy normalizeResolvedContext (if still used)
    pool: { attribute: 0, skill: 0, bonus: 0 }
  };
}
async function CT({ actor: a }) {
  var i, n, s, r, o;
  const e = Number(((n = (i = a.system) == null ? void 0 : i.burn) == null ? void 0 : n.value) ?? 0);
  e < 6 && ui.notifications.warn("Overload check is only required at Burn 6+.");
  const t = Number(((o = (r = (s = a.system) == null ? void 0 : s.attributes) == null ? void 0 : r.willpower) == null ? void 0 : o.value) ?? 0);
  return {
    intent: "overload",
    title: "Overload Check",
    domains: ["mental"],
    pool: {
      attribute: t,
      skill: t,
      bonus: 0
    },
    difficulty: {
      dn: Math.max(0, e - 5)
    },
    breakdown: [
      { id: "will1", label: "Will", value: t },
      { id: "will2", label: "Will", value: t }
    ]
  };
}
const ET = {
  skill: LA,
  edge: BA,
  attribute: zA,
  common: FA,
  attack: wT,
  defense: kT,
  resistance: vT,
  initiative: MT,
  overload: CT
};
async function pr({ actor: a, payload: e, event: t } = {}) {
  if (!a) throw new Error("resolveIntent requires actor");
  const i = String((e == null ? void 0 : e.intent) ?? "").trim();
  if (!i) throw new Error("resolveIntent requires payload.intent");
  const n = ET[i];
  if (!n) throw new Error(`Unsupported roll intent: ${i}`);
  const s = await n({ actor: a, payload: e, event: t });
  return PT(s, { intent: i });
}
function PT(a, { intent: e } = {}) {
  (!a || typeof a != "object") && (a = {}), a.intent = a.intent ?? e ?? "unknown", a.title = String(a.title ?? "Roll"), a.domains = Array.isArray(a.domains) ? a.domains : [], a.breakdown = Array.isArray(a.breakdown) ? a.breakdown : [], a.mods = Array.isArray(a.mods) ? a.mods : [];
  const t = a.pool && typeof a.pool == "object" ? a.pool : {}, i = Number(t.attribute ?? t.base ?? 0), n = Number(t.skill ?? t.rating ?? 0), s = Number(t.bonus ?? 0), r = Number(t.specialization ?? 0);
  if (![i, n, s, r].every(Number.isFinite))
    throw console.error("MWD | Invalid pool parts after intent resolution", { intent: e, ctx: a }), new Error("MWD.roll: pool parts must be numeric (attribute/skill/bonus/specialization).");
  return a.pool = {
    attribute: i,
    skill: n,
    bonus: s,
    specialization: r,
    totalBase: i + n + s + r
  }, a.rollType = a.rollType ?? "simple", a.diceTarget = Number.isFinite(a.diceTarget) ? a.diceTarget : Number(a.target ?? 5), a.difficulty && typeof a.difficulty == "object" ? a.difficulty.dn = Number(a.difficulty.dn ?? 0) : Number.isFinite(a.dn) && (a.difficulty = { dn: Number(a.dn) }), a.breakdown.length || (a.breakdown = [
    { id: "attribute", label: "Attribute", value: i },
    { id: "skill", label: "Skill", value: n },
    { id: "bonus", label: "Bonus", value: s },
    ...r ? [{ id: "specialization", label: "Specialization", value: r }] : []
  ]), a;
}
var Ca;
class RT {
  constructor() {
    Ce(this, Ca, /* @__PURE__ */ new Map());
  }
  register(e) {
    if (!(e != null && e.id) || typeof e.collect != "function")
      throw new Error("Invalid ModifierProvider: missing id or collect()");
    H(this, Ca).has(e.id) || H(this, Ca).set(e.id, e);
  }
  async collectAll(e) {
    const t = [];
    for (const i of H(this, Ca).values()) {
      const n = await i.collect(e);
      if (console.log("MWD | provider", i.id, "returned", n), !!(n != null && n.length))
        for (const s of n)
          s && typeof s.label == "string" && typeof s.value == "number" && typeof s.source == "string" ? t.push(s) : console.warn("MWD | DROPPED MOD (bad shape)", i.id, s);
    }
    return t;
  }
}
Ca = new WeakMap();
const ei = new RT();
function NT(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function IT(a) {
  const e = NT(a == null ? void 0 : a.value);
  return e === null ? null : { ...a, value: e };
}
async function _c({
  actor: a,
  rollType: e,
  skillId: t,
  domains: i,
  // NEW (optional)
  payload: n,
  resolved: s,
  context: r
} = {}) {
  const o = { actor: a, rollType: e, skillId: t, domains: i, payload: n, resolved: s, context: r }, l = await ei.collectAll(o);
  console.log("MWD|condition collect called", o.rollType);
  let c = [];
  for (const d of l ?? []) {
    const m = IT(d);
    if (!m) {
      console.warn("MWD | Dropping invalid modifier value", d);
      continue;
    }
    c.push(m);
  }
  Array.isArray(i) && i.length && (c = c.filter((d) => !d.domain || i.includes(d.domain)));
  const u = c.reduce((d, m) => d + m.value, 0);
  return { mods: c, total: u };
}
function DT({
  actor: a,
  payload: e,
  ctx: t,
  roll: i,
  target: n,
  pool: s,
  mods: r = [],
  modTotal: o = 0,
  hits: l = null,
  ones: c = null,
  edge: u = null,
  outcomeModel: d = null
} = {}) {
  var Y, Q, G, q;
  if (!a) throw new Error("buildResolved requires actor");
  if (!(e != null && e.intent)) throw new Error("buildResolved requires payload.intent");
  if (!i) throw new Error("buildResolved requires roll");
  const m = foundry.utils.randomID(), f = (Y = i.dice) == null ? void 0 : Y[0], h = (Array.isArray(f == null ? void 0 : f.results) ? f.results : []).map((L, U) => {
    const V = `pool:${U}`, Z = Number(L.result), re = !!L.success;
    return {
      ref: V,
      face: Z,
      isSuccess: re,
      isFailure: !re,
      tooltip: re ? `Die ${U + 1}: ${Z} (Success vs TN ${Number(n ?? 5)})` : `Die ${U + 1}: ${Z} (Failure vs TN ${Number(n ?? 5)})`
    };
  }), g = h.filter((L) => L.isFailure).map((L) => L.ref), y = [{
    id: "pool",
    label: "Pool",
    faces: 6,
    termIndex: 0,
    // informational only
    dice: h
  }], b = (Array.isArray(r) ? r : []).map((L, U) => {
    const V = Number(L.value ?? 0), Z = `mod:${_T(L.label ?? "mod")}:${U}`;
    return {
      id: L.id ?? Z,
      label: L.label ?? "Modifier",
      value: V,
      domain: L.domain ?? null,
      source: L.source ?? null,
      tooltip: L.tooltip ?? `${L.label ?? "Modifier"} ${Lc(V)}`
    };
  }), S = b.map((L) => L.id), M = (Array.isArray(t == null ? void 0 : t.breakdown) ? t.breakdown : []).map((L) => ({
    id: `pool.${L.id ?? foundry.utils.randomID()}`,
    label: L.label ?? L.id ?? "Row",
    value: Number(L.value ?? 0),
    tooltip: `Contribution from ${L.label ?? L.id}: ${Number(L.value ?? 0)}`
  }));
  M.push({
    id: "mods.total",
    label: "Mods",
    value: Number(o ?? 0),
    modIds: S,
    tooltip: b.length ? b.map((L) => `${L.label}: ${Lc(L.value)}`).join(`
`) : "No roll-time modifiers."
  }), M.push({
    id: "pool.final",
    label: "Final Pool",
    value: Number(s ?? 0),
    tooltip: `Final dice pool rolled: ${Number(s ?? 0)}d6`
  });
  const P = Number.isFinite(Number(l)) ? Number(l) : h.filter((L) => L.isSuccess).length, E = Number.isFinite(Number(c)) ? Number(c) : h.filter((L) => L.face === 1).length, z = OT(u, { payload: e });
  return {
    version: 2,
    id: m,
    actorUuid: a.uuid,
    // Re-entry
    originPayload: e,
    // Render header
    title: (t == null ? void 0 : t.title) ?? "Roll",
    subtitle: (t == null ? void 0 : t.subtitle) ?? a.name ?? "Actor",
    formula: String((t == null ? void 0 : t.formula) ?? "").trim(),
    intent: (t == null ? void 0 : t.intent) ?? e.intent,
    domains: Array.isArray(t == null ? void 0 : t.domains) ? t.domains : [],
    attack: (t == null ? void 0 : t.attack) ?? null,
    specialization: (t == null ? void 0 : t.specialization) ?? null,
    dn: (t == null ? void 0 : t.dn) ?? (((Q = t == null ? void 0 : t.difficulty) == null ? void 0 : Q.dn) !== void 0 ? {
      parts: [{
        id: "difficulty.current",
        label: "DN",
        value: Number(t.difficulty.dn ?? 0),
        tags: ["manual"]
      }],
      total: Number(t.difficulty.dn ?? 0)
    } : null),
    // Minimal context snapshot so chat-actions can recompute interpretation
    // after post-spend rerolls mutate hits.
    ctxSnapshot: {
      rollType: (t == null ? void 0 : t.rollType) ?? "simple",
      difficulty: (t == null ? void 0 : t.difficulty) ?? null,
      dn: (t == null ? void 0 : t.dn) ?? null,
      opposed: (t == null ? void 0 : t.opposed) ?? null,
      net: (t == null ? void 0 : t.net) ?? null,
      edge: {
        pool: ((G = t == null ? void 0 : t.edge) == null ? void 0 : G.pool) ?? null,
        earn: ((q = t == null ? void 0 : t.edge) == null ? void 0 : q.earn) ?? null
      }
    },
    // Roll + dice
    roll: {
      json: i.toJSON(),
      formula: i.formula,
      target: Number(n ?? 5),
      pool: Number(s ?? 0),
      diceGroups: y,
      failureDiceRefs: g
    },
    // Outcome numbers
    outcome: {
      hits: P,
      ones: E
    },
    // New: engine-interpreted outcome (margin/net/converted/edgeEarned/etc
    outcomeModel: d,
    // Breakdown + modifiers
    breakdownRows: M,
    modifiers: {
      applied: b,
      total: Number(o ?? 0)
    },
    areaEffectPreviewState: foundry.utils.deepClone((e == null ? void 0 : e.areaEffectPreviewState) ?? {}),
    // Edge snapshot / affordances
    edge: z
  };
}
function OT(a, { payload: e } = {}) {
  var p, h, g, y, b, S, w, M, P, E, z, Y, Q, G;
  const t = !!((p = e == null ? void 0 : e.edge) != null && p.enabled), i = (a == null ? void 0 : a.domain) ?? null, n = (a == null ? void 0 : a.pools) ?? null, s = ((h = a == null ? void 0 : a.pre) == null ? void 0 : h.poolKey) ?? ((y = (g = e == null ? void 0 : e.edge) == null ? void 0 : g.pre) == null ? void 0 : y.poolKey) ?? (t ? ((b = e == null ? void 0 : e.edge) == null ? void 0 : b.poolKey) ?? null : null), r = Number(((S = a == null ? void 0 : a.pre) == null ? void 0 : S.spent) ?? ((M = (w = e == null ? void 0 : e.edge) == null ? void 0 : w.pre) == null ? void 0 : M.spent) ?? (t ? 1 : 0)) ? 1 : 0, o = ((P = a == null ? void 0 : a.post) == null ? void 0 : P.poolKey) ?? ((z = (E = e == null ? void 0 : e.edge) == null ? void 0 : E.post) == null ? void 0 : z.poolKey) ?? null, l = Number(((Y = a == null ? void 0 : a.post) == null ? void 0 : Y.spent) ?? ((G = (Q = e == null ? void 0 : e.edge) == null ? void 0 : Q.post) == null ? void 0 : G.spent) ?? 0) ? 1 : 0, c = (n == null ? void 0 : n.a) ?? null, u = (n == null ? void 0 : n.b) ?? null, d = [c, u].filter(Boolean);
  let m = [c, u].filter(Boolean);
  r && s && (m = m.filter((q) => q !== s));
  const f = {
    canSpendPre: d.length > 0 && !r,
    // spending pre after roll is not a thing
    canSpendPost: m.length > 0 && !l,
    canPostRerollFailures: m.length > 0 && !l
  };
  return {
    domain: i,
    pools: n ? { a: c, b: u } : null,
    pre: { poolKey: s, spent: r },
    post: { poolKey: o, spent: l },
    allowed: {
      prePools: d,
      postPools: m
    },
    availableActions: f
  };
}
function Lc(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function _T(a) {
  return String(a).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
const { ApplicationV2: LT, HandlebarsApplicationMixin: xT } = foundry.applications.api;
function $T(a, e = -3, t = 3) {
  const i = [], n = "../img/dice";
  for (let s = e; s <= t; s++) {
    const r = Math.abs(s), o = r === 0 ? `${n}/BlankDice.webp` : `${n}/D6_${r}.svg`;
    i.push({
      value: s,
      abs: r,
      icon: o,
      active: s === a,
      neg: s < 0,
      pos: s > 0,
      zero: s === 0,
      title: s === 0 ? "0 (neutral)" : s < 0 ? `${s} penalty` : `+${s} bonus`
    });
  }
  return i;
}
function xc(a) {
  return (Array.isArray(a) ? a : []).map((t) => ({
    id: (t == null ? void 0 : t.id) ?? foundry.utils.randomID(),
    label: typeof (t == null ? void 0 : t.label) == "string" ? t.label : "Manual",
    value: Number((t == null ? void 0 : t.value) ?? 0)
  }));
}
function hr(a, e) {
  const t = a == null ? void 0 : a.toggles;
  return t && typeof t == "object" && e in t ? !!t[e] : !!(a != null && a[e]);
}
function BT(a, e) {
  a.useEdge = !!e.useEdge, a.takeRisks = !!e.takeRisks, a.opponentRoll = !!e.opponentRoll, a.toggles = a.toggles && typeof a.toggles == "object" ? a.toggles : {}, a.toggles.useEdge = !!e.useEdge, a.toggles.takeRisks = !!e.takeRisks, a.toggles.opponentRoll = !!e.opponentRoll;
}
function $c(a, e, t) {
  const i = String(t ?? "").trim(), n = i ? np(e, i) : "";
  if (i && n) {
    a.specializationKey = i, a.specializationLabel = n;
    return;
  }
  delete a.specializationKey, delete a.specializationLabel;
}
function zT(a) {
  const e = Array.isArray(a == null ? void 0 : a.breakdown) ? a.breakdown : [], t = (i) => {
    var n;
    return Number(((n = e.find((s) => (s == null ? void 0 : s.id) === i)) == null ? void 0 : n.value) ?? 0);
  };
  return {
    attribute: t("attribute"),
    skill: t("skill"),
    bonus: t("bonus"),
    specialization: t("specialization")
  };
}
var Nt;
const Ve = class Ve extends xT(LT) {
  constructor({ actor: t, baseContext: i, initialState: n = null, options: s = {} }) {
    var c, u;
    super(s);
    Ce(this, Nt, null);
    /** @type {{ baseContext: any, state: any }} */
    D(this, "_mwd", { baseContext: null, state: null });
    this.actor = t, this._mwd.baseContext = i ?? {};
    const r = foundry.utils.deepClone(this._mwd.baseContext.payload ?? {}), o = xc(r.manualModifiers);
    this._mwd.state = foundry.utils.mergeObject(
      {
        payload: r,
        manual: o,
        toggles: {
          useEdge: hr(r, "useEdge"),
          takeRisks: hr(r, "takeRisks"),
          opponentRoll: hr(r, "opponentRoll")
        }
      },
      n ?? {},
      { inplace: !1, insertKeys: !0, insertValues: !0, overwrite: !0 }
    );
    const l = String(((u = (c = r == null ? void 0 : r.edge) == null ? void 0 : c.pre) == null ? void 0 : u.poolKey) ?? "").trim() || null;
    this._mwd.state.edge = {
      prePoolKey: l
    };
  }
  async wait() {
    return new Promise((t) => {
      $e(this, Nt, t), this.render(!0);
    });
  }
  async close(t = {}) {
    if (H(this, Nt)) {
      const i = H(this, Nt);
      $e(this, Nt, null), i(null);
    }
    return super.close(t);
  }
  /* --------------------------- */
  /* Prepare Context             */
  /* --------------------------- */
  async _prepareContext(t) {
    var Y, Q, G, q, L, U, V, Z, re, ye, ce, se, Ie, Ue, He, Ye, st, Qe, tt, Le, it, yt, bt, St, Dt, N, F, Ae, ie, Re, At, v, R, K, be, ue, Ee, je, at, ut, Rt;
    const i = this._mwd.baseContext ?? {}, n = this._mwd.state ?? {}, s = Number.isFinite(Number((Y = n == null ? void 0 : n.payload) == null ? void 0 : Y.dn)) ? Number(n.payload.dn) : Number.isFinite(Number((G = (Q = i == null ? void 0 : i.resolved) == null ? void 0 : Q.dn) == null ? void 0 : G.total)) ? Number(i.resolved.dn.total) : Number.isFinite(Number(i == null ? void 0 : i.dn)) ? Number(i.dn) : Number.isFinite(Number((L = (q = i == null ? void 0 : i.resolved) == null ? void 0 : q.difficulty) == null ? void 0 : L.dn)) ? Number(i.resolved.difficulty.dn) : 1, r = (i == null ? void 0 : i.intent) ?? "skill";
    let o, l;
    const c = Array.isArray(n.manual) ? n.manual.reduce((ee, Te) => ee + Number((Te == null ? void 0 : Te.value) || 0), 0) : 0;
    if (r === "edge") {
      const ee = (i == null ? void 0 : i.resolved) ?? {}, Te = Array.isArray(ee.breakdown) ? ee.breakdown : [], rt = (Je) => {
        var W;
        return Number(((W = Te.find((pe) => pe.id === Je)) == null ? void 0 : W.value) ?? 0);
      }, ot = Number(((U = ee == null ? void 0 : ee.pool) == null ? void 0 : U.attribute) ?? 0);
      o = {
        pool: ot,
        rating: rt("rating"),
        cap: rt("cap"),
        modifiers: Number(((V = i == null ? void 0 : i.dice) == null ? void 0 : V.modifiers) ?? 0)
      }, l = Math.max(0, ot + o.modifiers + c);
    } else {
      o = {
        attribute: Number(((Z = i == null ? void 0 : i.dice) == null ? void 0 : Z.attribute) ?? 0),
        skill: Number(((re = i == null ? void 0 : i.dice) == null ? void 0 : re.skill) ?? 0),
        bonus: Number(((ye = i == null ? void 0 : i.dice) == null ? void 0 : ye.bonus) ?? 0),
        specialization: Number(((ce = i == null ? void 0 : i.dice) == null ? void 0 : ce.specialization) ?? 0),
        modifiers: Number(((se = i == null ? void 0 : i.dice) == null ? void 0 : se.modifiers) ?? 0)
      };
      const ee = o.modifiers + c, Te = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, Te + ee);
    }
    const u = Array.isArray((Ie = i == null ? void 0 : i.resolved) == null ? void 0 : Ie.domains) ? i.resolved.domains : [], d = u.includes("physical") ? "physical" : u.includes("mental") ? "mental" : u.includes("social") ? "social" : null, f = (d === "physical" ? ["grit", "chaos"] : d === "mental" ? ["insight", "rumor"] : d === "social" ? ["legend", "credibility"] : []).map((ee) => {
      var Te, rt, ot, Je;
      return {
        key: ee,
        label: ee.charAt(0).toUpperCase() + ee.slice(1),
        available: Number(((ot = (rt = (Te = this.actor) == null ? void 0 : Te.getEdgePool) == null ? void 0 : rt.call(Te, ee)) == null ? void 0 : ot.effectiveValue) ?? 0),
        selected: ee === (((Je = n.edge) == null ? void 0 : Je.prePoolKey) ?? null)
      };
    }), p = f.find((ee) => ee.selected), h = (p == null ? void 0 : p.label) ?? null, g = ((Ue = i == null ? void 0 : i.resolved) == null ? void 0 : Ue.attack) ?? null, y = String(
      ((He = g == null ? void 0 : g.skill) == null ? void 0 : He.code) ?? ((st = (Ye = i == null ? void 0 : i.resolved) == null ? void 0 : Ye.specialization) == null ? void 0 : st.skillKey) ?? ((tt = (Qe = i == null ? void 0 : i.resolved) == null ? void 0 : Qe.data) == null ? void 0 : tt.skillKey) ?? ((Le = i == null ? void 0 : i.payload) == null ? void 0 : Le.key) ?? ""
    ).trim(), b = y ? ku(((it = this.actor) == null ? void 0 : it.system) ?? {}, y) : [], S = String(((yt = n == null ? void 0 : n.payload) == null ? void 0 : yt.specializationKey) ?? "").trim(), w = b.find((ee) => ee.key === S) ?? null;
    if (r !== "edge") {
      o.specialization = w ? Number(((St = (bt = i == null ? void 0 : i.resolved) == null ? void 0 : bt.specialization) == null ? void 0 : St.value) ?? 2) : 0;
      const ee = o.modifiers + c, Te = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, Te + ee);
    }
    const M = Array.isArray((Dt = g == null ? void 0 : g.payloadState) == null ? void 0 : Dt.payloads) ? g.payloadState.payloads : [], P = String(((N = g == null ? void 0 : g.weapon) == null ? void 0 : N.category) ?? "").trim().toLowerCase() !== "melee" && M.length > 0, E = String(((F = n == null ? void 0 : n.payload) == null ? void 0 : F.payloadId) ?? ((Ae = g == null ? void 0 : g.payloadState) == null ? void 0 : Ae.activePayloadId) ?? "").trim(), z = M.find((ee) => ee.id === E) ?? null;
    return {
      header: {
        left: ((ie = i == null ? void 0 : i.header) == null ? void 0 : ie.left) ?? "Roll",
        right: ((Re = i == null ? void 0 : i.header) == null ? void 0 : Re.right) ?? ((At = this.actor) == null ? void 0 : At.name) ?? ""
      },
      formula: String((i == null ? void 0 : i.formula) ?? ((v = i == null ? void 0 : i.resolved) == null ? void 0 : v.formula) ?? "").trim(),
      dice: o,
      modifiers: Array.isArray(i.modifiers) ? i.modifiers : [],
      manual: (n.manual ?? []).map((ee) => ({
        ...ee,
        steps: $T(Number(ee.value ?? 0), -3, 3)
      })),
      edge: {
        domain: d,
        choices: f,
        selectedLabel: h
      },
      toggles: r === "edge" ? { useEdge: !1, takeRisks: !1, opponentRoll: !1 } : n.toggles,
      totalPool: l,
      intent: r,
      dn: s,
      specialization: b.length ? {
        skillCode: y,
        options: b.map((ee) => ({
          key: ee.key,
          label: ee.label,
          selected: ee.key === S
        })),
        selectedKey: S,
        selectedLabel: (w == null ? void 0 : w.label) ?? ""
      } : null,
      attack: g ? {
        weaponName: ((R = g == null ? void 0 : g.weapon) == null ? void 0 : R.name) ?? "Weapon",
        rangeBand: ((K = g == null ? void 0 : g.weapon) == null ? void 0 : K.type) === "personalWeapon" || (be = g == null ? void 0 : g.weapon) != null && be.isSynthetic ? Ps((g == null ? void 0 : g.rangeBand) ?? "") : (g == null ? void 0 : g.rangeBand) ?? "",
        damageType: ((ue = z == null ? void 0 : z.modifies) == null ? void 0 : ue.damageType) || ((Ee = g == null ? void 0 : g.weapon) == null ? void 0 : Ee.damageTypeLabel) || ((je = g == null ? void 0 : g.weapon) == null ? void 0 : je.damageType) || "",
        usesPayloads: P,
        source: (g == null ? void 0 : g.sourceState) ?? null,
        payloads: M.map((ee) => {
          var Te;
          return {
            id: ee.id,
            name: ee.label,
            damageType: (Te = ee.modifies) == null ? void 0 : Te.damageType,
            selected: ee.id === E
          };
        }),
        selectedPayloadId: E,
        selectedPayloadLabel: (z == null ? void 0 : z.label) ?? ((at = g == null ? void 0 : g.payload) == null ? void 0 : at.label) ?? ((ut = g == null ? void 0 : g.weapon) == null ? void 0 : ut.payloadLabel) ?? "",
        selectedSourceLabel: ((Rt = g == null ? void 0 : g.sourceState) == null ? void 0 : Rt.label) ?? ""
      } : null
    };
  }
  /* --------------------------- */
  /* Actions                     */
  /* --------------------------- */
  async _onCancel(t) {
    if (t == null || t.preventDefault(), H(this, Nt)) {
      const i = H(this, Nt);
      $e(this, Nt, null), i(null);
    }
    return this.close();
  }
  async _onSubmit(t) {
    var n, s, r, o, l, c, u, d, m, f, p, h, g;
    t == null || t.preventDefault();
    const i = this._mwd.state;
    if (i.payload.manualModifiers = (i.manual ?? []).filter((y) => {
      var b;
      return y && (((b = y.label) == null ? void 0 : b.trim()) || Number(y.value));
    }).map((y) => {
      var b;
      return {
        id: y.id,
        label: ((b = y.label) == null ? void 0 : b.trim()) || "Manual",
        value: Number(y.value ?? 0)
      };
    }), BT(i.payload, i.toggles ?? {}), $c(
      i.payload,
      ((n = i.payload) == null ? void 0 : n.intent) === "attack" ? ((s = i.payload) == null ? void 0 : s.skillKey) ?? ((c = (l = (o = (r = this._mwd.baseContext) == null ? void 0 : r.resolved) == null ? void 0 : o.attack) == null ? void 0 : l.skill) == null ? void 0 : c.code) : ((u = i.payload) == null ? void 0 : u.key) ?? ((f = (m = (d = this._mwd.baseContext) == null ? void 0 : d.resolved) == null ? void 0 : m.data) == null ? void 0 : f.skillKey),
      (p = i.payload) == null ? void 0 : p.specializationKey
    ), H(this, Nt)) {
      const y = H(this, Nt);
      $e(this, Nt, null), y({ payload: i.payload });
    }
    if (i.payload.edge = i.payload.edge && typeof i.payload.edge == "object" ? i.payload.edge : {}, i.payload.edge.pre = i.payload.edge.pre && typeof i.payload.edge.pre == "object" ? i.payload.edge.pre : {}, (h = i.toggles) != null && h.useEdge) {
      const y = String(((g = i.edge) == null ? void 0 : g.prePoolKey) ?? "").trim() || null;
      i.payload.edge.pre.poolKey = y, i.payload.edge.pre.spent = y ? 1 : 0;
    } else
      i.payload.edge.pre.poolKey = null, i.payload.edge.pre.spent = 0;
    return this.close();
  }
  async _onAddManual(t) {
    return t == null || t.preventDefault(), this._mwd.state.manual.push({
      id: foundry.utils.randomID(),
      label: "Manual",
      value: 0
    }), this.render(!1);
  }
  async _onRemoveManual(t, i) {
    var s;
    t == null || t.preventDefault();
    const n = (s = i == null ? void 0 : i.dataset) == null ? void 0 : s.id;
    if (n)
      return this._mwd.state.manual = this._mwd.state.manual.filter((r) => r.id !== n), this.render(!1);
  }
  async _onSetManualValue(t, i) {
    var o, l;
    t == null || t.preventDefault();
    const n = (o = i == null ? void 0 : i.dataset) == null ? void 0 : o.id, s = (l = i == null ? void 0 : i.dataset) == null ? void 0 : l.field;
    if (!n || !s) return;
    const r = this._mwd.state.manual.find((c) => c.id === n);
    if (r)
      return s === "label" && (r.label = String(i.value ?? "")), s === "value" && (r.value = Number(i.value ?? 0)), this.render(!1);
  }
  async _onSetManualStepper(t, i) {
    var o, l;
    t == null || t.preventDefault();
    const n = (o = i == null ? void 0 : i.dataset) == null ? void 0 : o.id, s = Number((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.value);
    if (!n || Number.isNaN(s)) return;
    const r = this._mwd.state.manual.find((c) => c.id === n);
    if (r)
      return r.value = s, this.render(!1);
  }
  async _onSetEdgePrePool(t, i) {
    var s;
    t == null || t.preventDefault();
    const n = String(((s = i == null ? void 0 : i.dataset) == null ? void 0 : s.poolKey) ?? "").trim();
    if (n)
      return this._mwd.state.edge = this._mwd.state.edge ?? {}, this._mwd.state.edge.prePoolKey = n, this._mwd.state.toggles.useEdge = !0, this.render(!1);
  }
  async _onToggleCheckbox(t, i) {
    var s;
    t == null || t.preventDefault();
    const n = (s = i == null ? void 0 : i.dataset) == null ? void 0 : s.key;
    if (n)
      return this._mwd.state.toggles[n] = !!i.checked, this.render(!1);
  }
  async _onSetDn(t, i) {
    t == null || t.preventDefault();
    const n = String((i == null ? void 0 : i.value) ?? "").trim(), s = n === "" ? null : Number(n);
    return this._mwd.state.payload.dn = Number.isFinite(s) ? Math.max(0, Math.trunc(s)) : null, this.render(!1);
  }
  async _onSetPayload(t, i) {
    return t == null || t.preventDefault(), this._mwd.state.payload.payloadId = String((i == null ? void 0 : i.value) ?? "").trim(), this.render(!1);
  }
  async _onSetSpecialization(t, i) {
    var r;
    t == null || t.preventDefault();
    const n = String(((r = i == null ? void 0 : i.dataset) == null ? void 0 : r.skillCode) ?? "").trim(), s = String((i == null ? void 0 : i.value) ?? "").trim();
    if (n)
      return $c(this._mwd.state.payload, n, s), this.render(!1);
  }
  _onRender(t, i) {
    var s, r;
    (s = super._onRender) == null || s.call(this, t, i);
    const n = this.element instanceof HTMLElement ? this.element : (r = this.element) == null ? void 0 : r[0];
    n && (n.querySelectorAll("[data-action='setPayload']").forEach((o) => {
      o.addEventListener("change", (l) => {
        this._onSetPayload(l, l.currentTarget);
      });
    }), n.querySelectorAll("[data-action='setSpecialization']").forEach((o) => {
      o.addEventListener("change", (l) => {
        this._onSetSpecialization(l, l.currentTarget);
      });
    }), n.querySelectorAll("[data-action='setDn']").forEach((o) => {
      o.addEventListener("change", (l) => {
        this._onSetDn(l, l.currentTarget);
      });
    }));
  }
  /**
   * Open the roll dialog as a payload editor and return an updated payload.
   * Cancel returns null.
   *
   * IMPORTANT:
   *  - Prefer passing explicit dice parts via args.diceParts (attribute/skill/bonus).
   *  - This avoids scraping resolved.breakdown.
   */
  static async prompt({ actor: t, basePayload: i, resolved: n, diceParts: s = null, mods: r = [], modTotal: o = 0 } = {}) {
    var h, g;
    const l = foundry.utils.deepClone(i ?? {});
    try {
      const y = (n == null ? void 0 : n.rollType) ?? "simple", b = String((l == null ? void 0 : l.intent) ?? (n == null ? void 0 : n.intent) ?? "").trim().toLowerCase();
      if (y === "simple" && b !== "attack" && (l == null ? void 0 : l.dn) == null) {
        const S = Number(game.settings.get(game.system.id, "gmNextDn"));
        Number.isFinite(S) && (l.dn = Math.max(0, Math.trunc(S)));
      }
    } catch (y) {
      console.warn("MWD: failed to default DN from GM Gadget", y);
    }
    const c = {
      left: (n == null ? void 0 : n.title) ?? "Roll",
      right: (t == null ? void 0 : t.name) ?? ""
    }, u = s ?? zT(n), d = {
      attribute: Number((u == null ? void 0 : u.attribute) ?? 0),
      skill: Number((u == null ? void 0 : u.skill) ?? 0),
      bonus: Number((u == null ? void 0 : u.bonus) ?? 0),
      specialization: Number((u == null ? void 0 : u.specialization) ?? 0),
      modifiers: Number(o ?? 0)
    }, m = (Array.isArray(r) ? r : []).map((y) => ({
      label: y.label ?? "Modifier",
      source: y.source ?? "",
      value: Number(y.value ?? 0)
    }));
    l.manualModifiers = xc(l.manualModifiers);
    const p = await new Ve({
      actor: t,
      baseContext: {
        intent: (n == null ? void 0 : n.intent) ?? "skill",
        header: c,
        formula: String((n == null ? void 0 : n.formula) ?? "").trim(),
        dice: d,
        modifiers: m,
        payload: l,
        resolved: n,
        // keep full resolved for edge display
        dn: Number((l == null ? void 0 : l.dn) ?? ((h = n == null ? void 0 : n.dn) == null ? void 0 : h.total) ?? ((g = n == null ? void 0 : n.difficulty) == null ? void 0 : g.dn) ?? 1)
      }
    }).wait();
    return (p == null ? void 0 : p.payload) ?? null;
  }
};
Nt = new WeakMap(), D(Ve, "DEFAULT_OPTIONS", foundry.utils.mergeObject(
  Qt(Ve, Ve, "DEFAULT_OPTIONS"),
  {
    id: "mwd-roll-dialog",
    classes: [
      ...Qt(Ve, Ve, "DEFAULT_OPTIONS").classes ?? [],
      "mwd",
      "mwd-roll-dialog"
    ],
    window: { title: "Roll", resizable: !1 },
    position: { width: 520, height: "auto" },
    actions: {
      submit: Ve.prototype._onSubmit,
      cancel: Ve.prototype._onCancel,
      addManual: Ve.prototype._onAddManual,
      removeManual: Ve.prototype._onRemoveManual,
      setManualValue: Ve.prototype._onSetManualValue,
      setManualStepper: Ve.prototype._onSetManualStepper,
      setEdgePrePool: Ve.prototype._onSetEdgePrePool,
      toggleCheckbox: Ve.prototype._onToggleCheckbox,
      setDn: Ve.prototype._onSetDn,
      setPayload: Ve.prototype._onSetPayload,
      setSpecialization: Ve.prototype._onSetSpecialization
    }
  },
  { inplace: !1 }
)), D(Ve, "PARTS", {
  body: { template: "systems/mwd/templates/v2/roll/mwd-roll-dialog.hbs" }
});
let go = Ve;
const { ApplicationV2: FT, HandlebarsApplicationMixin: UT } = foundry.applications.api, Za = class Za extends UT(FT) {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      id: "select-item",
      classes: ["select-item", "anarchy-dialog"],
      position: { width: 360, height: "auto" },
      window: {
        resizable: !0
      }
    }, { inplace: !1 });
  }
  static async selectItem(e, t) {
    const i = {
      id: `select-item-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Za.DEFAULT_OPTIONS.classes],
      window: { title: e }
    };
    return new Za({ items: t }, i).wait();
  }
  constructor(e = {}, t = {}) {
    super(e, t), this.items = Array.isArray(e.items) ? e.items : [], this._selected = !1, this._resolve = null;
  }
  async _prepareContext() {
    return { items: this.items };
  }
  async activateListeners(e) {
    const t = e instanceof HTMLElement ? e : e == null ? void 0 : e[0];
    await super.activateListeners(t);
    const i = $(t);
    i.find(".click-select-item").click((n) => this.onSelectItem(n)), i.find('[data-action="cancel"]').on("click", async () => {
      if (this._resolve) {
        const n = this._resolve;
        this._resolve = null, n(null);
      }
      await this.close();
    });
  }
  wait() {
    return new Promise((e) => {
      this._resolve = e, this.render({ force: !0 });
    });
  }
  async onSelectItem(e) {
    const t = $(e.currentTarget).attr("data-item-id"), i = this.items.find((n) => n.id === t) ?? null;
    if (this._selected = !0, this._resolve) {
      const n = this._resolve;
      this._resolve = null, n(i);
    }
    await this.close();
  }
  async close(e) {
    if (!this._selected && this._resolve) {
      const t = this._resolve;
      this._resolve = null, t(null);
    }
    return super.close(e);
  }
};
D(Za, "PARTS", {
  body: {
    template: `${X}/dialog/select-item.hbs`
  }
});
let yo = Za;
const Bc = { execute: VT }, HT = {
  physical: ["grit", "chaos"],
  mental: ["insight", "rumor"],
  social: ["legend", "credibility"]
};
function jT(a, e) {
  var s;
  const t = HT[e] ?? [];
  let i = null, n = -1;
  for (const r of t) {
    const o = (s = a.getEdgePool) == null ? void 0 : s.call(a, r), l = Number((o == null ? void 0 : o.rating) ?? 0), c = Number((o == null ? void 0 : o.value) ?? 0), u = Math.max(0, l - c);
    u > n && (n = u, i = r);
  }
  return i ?? t[0] ?? null;
}
function WT(a) {
  const t = (Array.isArray(a == null ? void 0 : a.manualModifiers) ? a.manualModifiers : []).map((n) => ({
    id: n.id ?? foundry.utils.randomID(),
    label: (n.label ?? "Manual").trim() || "Manual",
    value: Number(n.value ?? 0),
    source: "Manual"
  })).filter((n) => Number.isFinite(n.value) && n.value !== 0), i = t.reduce((n, s) => n + s.value, 0);
  return { mods: t, total: i };
}
function zc(a = {}) {
  const e = a.toggles ?? {}, t = String((a == null ? void 0 : a.payloadId) ?? (a == null ? void 0 : a.ammoTypeId) ?? "").trim();
  return {
    ...a,
    ...t ? { payloadId: t } : {},
    toggles: {
      useEdge: !!e.useEdge,
      takeRisks: !!e.takeRisks,
      opponentRoll: !!e.opponentRoll
    },
    manualModifiers: GT(a.manualModifiers)
  };
}
async function KT({ actor: a, payload: e } = {}) {
  var s, r, o, l, c, u, d, m, f, p, h, g;
  if ((e == null ? void 0 : e.intent) !== "attack") return e;
  const t = foundry.utils.deepClone(e ?? {}), i = ((s = a.getPersonalCombatLoadout) == null ? void 0 : s.call(a, { refresh: !0 })) ?? null, n = (y) => {
    var S, w, M, P, E;
    const b = ((w = (S = a.items) == null ? void 0 : S.get) == null ? void 0 : w.call(S, y)) ?? null;
    return !b || !(((M = b.isPersonalWeapon) == null ? void 0 : M.call(b)) ?? b.type === A.itemType.personalWeapon) || !((P = b.system) != null && P.equipped) ? null : ((E = b.getCombatProfile) == null ? void 0 : E.call(b, { payloadId: t == null ? void 0 : t.payloadId })) ?? null;
  };
  if (t.weaponId) {
    const y = n(t.weaponId);
    if (!y)
      throw new Error("Attack requires an owned equipped personal weapon.");
    return t.payloadId = t.payloadId ?? ((r = y == null ? void 0 : y.payloadState) == null ? void 0 : r.activePayloadId) ?? "", t;
  }
  if (t.mode === "auto") {
    if (i != null && i.weaponChoiceRequired) {
      const y = await yo.selectItem(
        "Choose Weapon",
        i.equippedWeapons ?? []
      );
      return y ? (t.weaponId = y.id, t.payloadId = t.payloadId ?? ((o = y == null ? void 0 : y.payloadState) == null ? void 0 : o.activePayloadId) ?? "", delete t.mode, t) : null;
    }
    if ((l = i == null ? void 0 : i.defaultWeapon) != null && l.isSynthetic || ((c = i == null ? void 0 : i.defaultWeapon) == null ? void 0 : c.id) === "unarmed")
      return t.syntheticWeapon = foundry.utils.deepClone(i.defaultWeapon ?? $t.buildDefaultUnarmedProfile(a)), t.weaponId = t.syntheticWeapon.id, t.payloadId = t.payloadId ?? ((d = (u = t.syntheticWeapon) == null ? void 0 : u.payloadState) == null ? void 0 : d.activePayloadId) ?? "", delete t.mode, t;
    if ((m = i == null ? void 0 : i.defaultWeapon) != null && m.id)
      return t.weaponId = i.defaultWeapon.id, t.payloadId = t.payloadId ?? ((p = (f = i.defaultWeapon) == null ? void 0 : f.payloadState) == null ? void 0 : p.activePayloadId) ?? "", delete t.mode, t;
  }
  if (t.fallback === "unarmed")
    return t.syntheticWeapon = foundry.utils.deepClone($t.buildDefaultUnarmedProfile(a)), t.weaponId = t.syntheticWeapon.id, t.payloadId = t.payloadId ?? ((g = (h = t.syntheticWeapon) == null ? void 0 : h.payloadState) == null ? void 0 : g.activePayloadId) ?? "", delete t.mode, t;
  throw new Error("Attack could not resolve a usable weapon.");
}
function GT(a) {
  return Array.isArray(a) ? a.map((e) => ({
    id: (e == null ? void 0 : e.id) ?? foundry.utils.randomID(),
    label: typeof (e == null ? void 0 : e.label) == "string" ? e.label : "Manual",
    value: Number((e == null ? void 0 : e.value) ?? 0)
  })) : [];
}
async function qT(a = []) {
  var t, i, n, s, r, o, l, c, u;
  const e = Array.from(new Set(
    (Array.isArray(a) ? a : []).map((d) => String(d ?? "").trim()).filter(Boolean)
  ));
  if (typeof ((t = game.user) == null ? void 0 : t.updateTokenTargets) == "function") {
    await game.user.updateTokenTargets(e);
    return;
  }
  for (const d of Array.from(((i = game.user) == null ? void 0 : i.targets) ?? []))
    (n = d == null ? void 0 : d.setTarget) == null || n.call(d, !1, { releaseOthers: !1, user: game.user });
  for (const d of e) {
    const m = ((r = (s = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : s.get) == null ? void 0 : r.call(s, d)) ?? ((c = (l = (o = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : o.placeables) == null ? void 0 : l.find) == null ? void 0 : c.call(l, (f) => (f == null ? void 0 : f.id) === d)) ?? null;
    (u = m == null ? void 0 : m.setTarget) == null || u.call(m, !0, { releaseOthers: !1, user: game.user });
  }
}
async function VT({ actor: a, payload: e, event: t } = {}) {
  var G, q, L, U, V, Z, re, ye, ce, se, Ie, Ue, He, Ye, st, Qe, tt, Le, it, yt, bt, St, Dt, N, F, Ae, ie, Re, At, v, R, K, be, ue, Ee, je, at, ut, Rt, ee, Te, rt, ot, Je;
  if (a != null && a.actor && (a = a.actor), (G = a == null ? void 0 : a.document) != null && G.actor && (a = a.document.actor), !a) throw new Error("MWD.roll.execute requires actor");
  if (!(e != null && e.intent)) throw new Error("MWD.roll.execute requires payload.intent");
  if (e = zc(e), e = await KT({ actor: a, payload: e }), !e) return null;
  let i = await pr({ actor: a, payload: e, event: t });
  if (e.intent === "attack" && ((L = (q = i == null ? void 0 : i.attack) == null ? void 0 : q.capabilityReport) != null && L.isTemplated)) {
    const W = await mT({
      actor: a,
      attack: i.attack
    });
    if (!W) return null;
    try {
      await dT({
        actor: a,
        attack: i.attack,
        templateGeometry: W.templateGeometry ?? null
      });
    } catch (pe) {
      console.warn("MWD | Unable to create visual template indicator", pe);
    }
    if (await qT(W.autoTargetTokenIds ?? []), !Jc(((U = i == null ? void 0 : i.attack) == null ? void 0 : U.areaEffect) ?? ((Z = (V = i == null ? void 0 : i.attack) == null ? void 0 : V.payload) == null ? void 0 : Z.areaEffect) ?? {}) && (!Array.isArray(W.targetSnapshots) || W.targetSnapshots.length === 0))
      return (re = ui.notifications) == null || re.warn("Template placement did not affect any targets."), null;
    e.targetSnapshots = Array.isArray(W.targetSnapshots) ? W.targetSnapshots : [], e.templateGeometry = W.templateGeometry ?? null, e.templatePlacement = W.placement, i = await pr({ actor: a, payload: e, event: t });
  } else e.intent === "attack" && (delete e.targetSnapshots, delete e.templatePlacement, delete e.templateGeometry);
  let n = await _c({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const s = await go.prompt({
    actor: a,
    basePayload: e,
    resolved: i,
    diceParts: {
      attribute: ((ye = i == null ? void 0 : i.pool) == null ? void 0 : ye.attribute) ?? 0,
      skill: ((ce = i == null ? void 0 : i.pool) == null ? void 0 : ce.skill) ?? 0,
      bonus: ((se = i == null ? void 0 : i.pool) == null ? void 0 : se.bonus) ?? 0,
      specialization: ((Ie = i == null ? void 0 : i.pool) == null ? void 0 : Ie.specialization) ?? 0
    },
    mods: n.mods,
    modTotal: n.total,
    options: {
      allowEdge: e.intent !== "initiative"
    }
  });
  if (!s) return null;
  if (e = zc(s), i = await pr({ actor: a, payload: e, event: t }), e.intent === "attack" && !((He = (Ue = i == null ? void 0 : i.attack) == null ? void 0 : Ue.capabilityReport) != null && He.isTemplated) && (delete e.targetSnapshots, delete e.templatePlacement, delete e.templateGeometry), e.intent === "attack" && e.weaponId) {
    const W = ((st = (Ye = a.items) == null ? void 0 : Ye.get) == null ? void 0 : st.call(Ye, e.weaponId)) ?? null;
    if ((Qe = W == null ? void 0 : W.isPersonalWeapon) != null && Qe.call(W)) {
      const pe = String(e.payloadId ?? "").trim(), ci = String(((tt = W.system) == null ? void 0 : tt.selectedPayloadId) ?? "").trim();
      if (pe && pe !== ci && await ((Le = W.setActivePayload) == null ? void 0 : Le.call(W, pe)), !((it = W.canConsumePayload) != null && it.call(W, { payloadId: pe }))) {
        const Ot = (yt = W.getPayloadState) == null ? void 0 : yt.call(W, { payloadId: pe }), Ai = Ot != null && Ot.payloadLabel ? ` (${Ot.payloadLabel})` : "";
        return (bt = ui.notifications) == null || bt.warn(`Not enough payload${Ai} for ${W.name}.`), null;
      }
    }
  }
  n = await _c({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const { mods: r, total: o } = n, { mods: l, total: c } = WT(e);
  let u = [...r, ...l], d = Number(o ?? 0) + Number(c ?? 0);
  const m = Number(((St = i == null ? void 0 : i.pool) == null ? void 0 : St.attribute) ?? 0) + Number(((Dt = i == null ? void 0 : i.pool) == null ? void 0 : Dt.skill) ?? 0) + Number(((N = i == null ? void 0 : i.pool) == null ? void 0 : N.bonus) ?? 0) + Number(((F = i == null ? void 0 : i.pool) == null ? void 0 : F.specialization) ?? 0), f = Math.max(0, m + Number(d ?? 0)), p = e.intent !== "initiative", h = p ? YT({ actor: a, ctx: i, payload: e }) : null, g = (Ae = h == null ? void 0 : h.pre) != null && Ae.spent ? 4 : Number(i.diceTarget ?? i.target ?? 5), y = {
    snapshot: ((At = (Re = (ie = game.mwd) == null ? void 0 : ie.personalCombat) == null ? void 0 : Re.getSnapshot) == null ? void 0 : At.call(Re, a)) ?? null
  }, b = xt({
    actor: a,
    phase: "onBuildRoll",
    facts: Bo({ actor: a, resolved: i, payload: e, runtime: y }),
    packet: {},
    options: { runtime: y, consumeUsage: !0 }
  });
  await yi({ actor: a, mutations: b.mutations, runtime: y }), p && ((v = h == null ? void 0 : h.pre) != null && v.spent) && ((R = h == null ? void 0 : h.pre) != null && R.poolKey) && await ((K = a.spendEdge) == null ? void 0 : K.call(a, h.pre.poolKey, 1));
  let S, w = 0, M = 0;
  if (i.rollType === "sum" && ((be = i.sum) != null && be.formula))
    S = await new Roll(i.sum.formula, i.sum.data ?? {}).evaluate(), w = Number(S.total ?? 0) + Number(d ?? 0);
  else {
    S = await new Roll(`${f}d6cs>=${g}`).evaluate();
    const W = (ue = S.dice) == null ? void 0 : ue[0];
    w = Array.isArray(W == null ? void 0 : W.results) ? W.results.filter((pe) => pe.success).length : 0, M = Array.isArray(W == null ? void 0 : W.results) ? W.results.filter((pe) => pe.result === 1).length : 0;
  }
  if (i.intent === "initiative" && (S == null ? void 0 : S.total) != null) {
    const W = { total: Number(S.total ?? 0) + Number(d ?? 0) }, pe = xt({
      actor: a,
      phase: "onInitiativeResolved",
      facts: Vu({ actor: a, packet: W, runtime: y }),
      packet: W,
      options: { runtime: y, consumeUsage: !0 }
    });
    if (await yi({ actor: a, mutations: pe.mutations, runtime: y }), pe.modifiers.length) {
      const ci = pe.modifiers.reduce((Ot, Ai) => Ot + Number(Ai.value ?? 0), 0);
      u = u.concat(pe.modifiers), d += ci, w = Number(pe.packet.total ?? 0), await Fc({ actor: a, total: pe.packet.total ?? S.total }), i.breakdown = (i.breakdown ?? []).concat(pe.modifiers.map((Ot, Ai) => ({
        id: `traitInitiative${Ai + 1}`,
        label: Ot.label,
        value: Number(Ot.value ?? 0)
      })));
    } else
      w = Number(W.total ?? 0), await Fc({ actor: a, total: W.total });
  }
  const P = im(
    i,
    { successes: w, raw: (Ee = S == null ? void 0 : S.toJSON) == null ? void 0 : Ee.call(S) },
    null
    // opposed rolls can pass defender result later
  ), E = P == null ? void 0 : P.edgeEarned;
  if ((E == null ? void 0 : E.amount) > 0) {
    const W = (je = i == null ? void 0 : i.domains) != null && je.includes("physical") ? "physical" : (at = i == null ? void 0 : i.domains) != null && at.includes("mental") ? "mental" : (ut = i == null ? void 0 : i.domains) != null && ut.includes("social") ? "social" : null, pe = jT(a, W);
    await ((Rt = a.gainEdge) == null ? void 0 : Rt.call(a, pe, E.amount)), P.edgeEarned.pool = pe;
  }
  i.intent === "overload" && await XT({ actor: a, passed: P.passed });
  let z = null;
  i.intent === "attack" && (z = await Zd({
    attacker: a,
    ctx: i,
    outcomeModel: P
  }));
  const Y = DT({
    actor: a,
    payload: e,
    ctx: i,
    roll: S,
    target: g,
    pool: f,
    mods: u,
    modTotal: d,
    hits: w,
    ones: M,
    edge: h,
    outcomeModel: P
  });
  z && (Y.attackResult = z);
  const Q = await xa({ resolved: Y });
  if (e.intent === "attack" && e.weaponId) {
    const W = ((Te = (ee = a.items) == null ? void 0 : ee.get) == null ? void 0 : Te.call(ee, e.weaponId)) ?? null;
    (rt = W == null ? void 0 : W.isPersonalWeapon) != null && rt.call(W) && (await ((ot = W.consumePayload) == null ? void 0 : ot.call(W, { payloadId: e.payloadId })) || (Je = ui.notifications) == null || Je.warn(`Payload could not be consumed for ${W.name}.`));
  }
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: a }),
    content: Q,
    flags: {
      mwd: {
        payload: e,
        resolved: Y
      }
    }
  });
}
function YT({ actor: a, ctx: e, payload: t }) {
  var p, h, g, y, b, S, w;
  const i = QT(e == null ? void 0 : e.domains), n = JT[i] ?? null, s = (n == null ? void 0 : n.a) ?? null, r = (n == null ? void 0 : n.b) ?? null, o = [s, r].filter(Boolean), l = !!((p = t == null ? void 0 : t.toggles) != null && p.useEdge) || !!(t != null && t.useEdge);
  let c = String(((g = (h = t == null ? void 0 : t.edge) == null ? void 0 : h.pre) == null ? void 0 : g.poolKey) ?? "").trim() || null;
  c && !o.includes(c) && (c = null);
  const u = l && c ? 1 : 0;
  let d = [...o];
  u && c && (d = d.filter((M) => M !== c));
  let m = String(((b = (y = t == null ? void 0 : t.edge) == null ? void 0 : y.post) == null ? void 0 : b.poolKey) ?? "").trim() || null;
  m && !d.includes(m) && (m = null);
  const f = Number(((w = (S = t == null ? void 0 : t.edge) == null ? void 0 : S.post) == null ? void 0 : w.spent) ?? 0) ? 1 : 0;
  return {
    domain: i,
    pools: n ? { a: s, b: r } : null,
    pre: { poolKey: c, spent: u },
    post: { poolKey: m, spent: f },
    allowed: { prePools: o, postPools: d }
  };
}
function QT(a) {
  return Array.isArray(a) ? a.includes("physical") ? "physical" : a.includes("mental") ? "mental" : a.includes("social") ? "social" : null : null;
}
const JT = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};
async function Fc({ actor: a, total: e }) {
  var o, l, c, u, d;
  const t = (l = (o = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : o.controlled) == null ? void 0 : l.find((m) => {
    var f;
    return ((f = m.actor) == null ? void 0 : f.id) === a.id;
  }), i = ((u = (c = a.getActiveTokens) == null ? void 0 : c.call(a, !0, !0)) == null ? void 0 : u[0]) ?? null, n = t ?? i;
  if (!n) {
    (d = ui.notifications) == null || d.warn("Initiative requires a token on the current scene.");
    return;
  }
  let s = game.combat;
  s || (s = await Combat.create({
    scene: canvas.scene.id,
    active: !0
  }));
  let r = s.combatants.find((m) => m.tokenId === n.id);
  if (!r) {
    const m = await s.createEmbeddedDocuments("Combatant", [{
      tokenId: n.id,
      actorId: a.id,
      sceneId: canvas.scene.id
    }]);
    r = m == null ? void 0 : m[0];
  }
  r && await r.update({ initiative: Number(e) });
}
async function XT({ actor: a, passed: e }) {
  e || await a.update({ "system.burn.overloaded": !0 });
}
const ZT = /* @__PURE__ */ new Set(["physical", "mental", "social"]);
function ew(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function tw(a) {
  if (!a) return;
  const e = String(a).trim().toLowerCase();
  return ZT.has(e) ? e : void 0;
}
class iw {
  constructor() {
    D(this, "id", "mwd.itemModifiers");
    D(this, "label", "Item Modifiers");
  }
  collect(e) {
    var n, s;
    const t = e == null ? void 0 : e.actor;
    if (!t) return [];
    const i = [];
    for (const r of t.items) {
      const o = (s = (n = r.flags) == null ? void 0 : n.mwd) == null ? void 0 : s.modifiers;
      if (!(!Array.isArray(o) || o.length === 0))
        for (const l of o) {
          if (!l) continue;
          const c = ew(l.value);
          if (c === null) {
            console.warn("MWD | Dropping item modifier with invalid value", {
              actor: t.name,
              item: r.name,
              modifier: l
            });
            continue;
          }
          i.push({
            label: l.label ?? r.name,
            value: c,
            source: r.name,
            domain: tw(l.domain)
          });
        }
    }
    return i;
  }
}
class aw {
  constructor() {
    D(this, "id", "mwd.statusEffects");
    D(this, "label", "Status Effects");
  }
  collect({ actor: e } = {}) {
    var n;
    const t = e == null ? void 0 : e.statuses;
    if (!e || !t) return [];
    const i = [];
    for (const s of t) {
      const r = ks(s), o = r ? vs(r, e) ? r.modifierKey : "" : s, l = wa == null ? void 0 : wa[o];
      if ((n = l == null ? void 0 : l.mods) != null && n.length)
        for (const c of l.mods) {
          const u = Array.isArray(c.domains) ? c.domains : [], d = c.value;
          if (u.length)
            for (const m of u)
              i.push({
                label: l.label ?? s,
                value: d,
                source: "Status",
                domain: m
              });
          else
            i.push({
              label: l.label ?? s,
              value: d,
              source: "Status"
            });
        }
    }
    return i;
  }
}
class nw {
  constructor() {
    D(this, "id", "mwd.baseRollModifiers");
    D(this, "label", "Roll (Base)");
  }
  collect({ payload: e } = {}) {
    var r, o, l;
    const t = [], i = (r = e == null ? void 0 : e.modifiers) == null ? void 0 : r.manual;
    if (Array.isArray(i) && i.length) {
      for (const c of i) {
        if (!c) continue;
        const u = Number(c.value);
        !Number.isFinite(u) || u === 0 || t.push({
          id: c.id ?? void 0,
          label: c.label ?? "Manual modifier",
          value: u,
          source: "Manual",
          domain: c.domain ?? void 0
        });
      }
      return t;
    }
    const n = ((o = e == null ? void 0 : e.dialog) == null ? void 0 : o.otherMods) ?? ((l = e == null ? void 0 : e.modifiers) == null ? void 0 : l.otherMods) ?? (e == null ? void 0 : e.otherMods) ?? 0, s = Number(n);
    return Number.isFinite(s) && s !== 0 && t.push({
      id: "otherMods",
      label: "Other modifiers",
      value: s,
      source: "Roll"
    }), t;
  }
}
class sw {
  constructor() {
    D(this, "id", "mwd.condition");
    D(this, "label", "Condition");
  }
  collect({ actor: e, rollType: t } = {}) {
    var o, l, c, u, d, m, f, p;
    if (!e) return [];
    if (t === "edge") return [];
    const i = ((o = e.system) == null ? void 0 : o.derived) ?? {}, n = Number(
      ((l = i == null ? void 0 : i.condition) == null ? void 0 : l.physicalPenalty) ?? ((u = (c = i == null ? void 0 : i.monitors) == null ? void 0 : c.physical) == null ? void 0 : u.penalty) ?? 0
    ), s = Number(
      ((d = i == null ? void 0 : i.condition) == null ? void 0 : d.fatiguePenalty) ?? ((f = (m = i == null ? void 0 : i.monitors) == null ? void 0 : m.fatigue) == null ? void 0 : f.penalty) ?? 0
    ), r = [];
    return Number.isFinite(n) && n !== 0 && r.push({
      id: "conditionPhysical",
      label: "Physical Penalty",
      value: n,
      source: "Physical Track"
      // domain: "physical" // optional; leave unset to apply to all domains
    }), Number.isFinite(s) && s !== 0 && r.push({
      id: "conditionFatigue",
      label: "Fatigue Penalty",
      value: s,
      source: "Fatigue Track"
      // domain: "physical" // optional
    }), console.log("MWD|condition derived snapshot", e.name, foundry.utils.deepClone((p = e.system) == null ? void 0 : p.derived)), r;
  }
}
const rw = {
  id: "burn",
  async collect(a) {
    var n, s;
    const e = a.actor;
    if (!e) return [];
    const t = Number(((s = (n = e.system) == null ? void 0 : n.burn) == null ? void 0 : s.value) ?? 0), i = Math.floor(t / 2);
    return i <= 0 ? [] : [{
      id: "burn",
      label: "Burn",
      value: -i,
      source: "Burn Track",
      domain: null
    }];
  }
};
class ow {
  constructor() {
    D(this, "id", "mwd.lifeModules");
    D(this, "label", "Life Modules");
  }
  collect({ actor: e, resolved: t } = {}) {
    return ag({ actor: e, resolved: t });
  }
}
class lw {
  constructor() {
    D(this, "id", "mwd.traits");
    D(this, "label", "Traits");
  }
  collect({ actor: e, resolved: t, payload: i } = {}) {
    var s, r, o;
    if (!e) return [];
    const n = {
      snapshot: ((o = (r = (s = game.mwd) == null ? void 0 : s.personalCombat) == null ? void 0 : r.getSnapshot) == null ? void 0 : o.call(r, e)) ?? null
    };
    return xt({
      actor: e,
      phase: "onBuildRoll",
      facts: Bo({ actor: e, resolved: t, payload: i, runtime: n }),
      packet: {},
      options: { runtime: n, consumeUsage: !1 }
    }).modifiers;
  }
}
const cw = Object.freeze({
  attackCQPenalty: { value: -1, intents: ["attack"], label: "Attack CQ Penalty" },
  sensorPenalty: { value: -1, skills: ["perception", "technician"], label: "Sensor Penalty" },
  pilotingPenalty: { value: -1, skills: ["piloting"], label: "Piloting Penalty" }
});
class uw {
  constructor() {
    D(this, "id", "mwd.machineCriticals");
    D(this, "label", "Machine Criticals");
  }
  collect({ actor: e, resolved: t, payload: i } = {}) {
    var l, c, u;
    const n = Od(e);
    if (!n.length) return [];
    const s = String((t == null ? void 0 : t.intent) ?? (i == null ? void 0 : i.intent) ?? "").trim(), r = String(((c = (l = t == null ? void 0 : t.attack) == null ? void 0 : l.skill) == null ? void 0 : c.code) ?? ((u = t == null ? void 0 : t.skill) == null ? void 0 : u.code) ?? (i == null ? void 0 : i.key) ?? "").trim(), o = [];
    for (const d of n)
      for (const m of d.mods ?? []) {
        const f = cw[m];
        f && (f.intents && !f.intents.includes(s) || f.skills && !f.skills.includes(r) || o.push({
          id: `machineCrit.${d.id}.${m}`,
          label: `${d.label ?? "Machine Critical"}: ${f.label}`,
          value: f.value,
          source: "Machine Critical"
        }));
      }
    return o;
  }
}
function dw() {
  Object.assign(CONFIG.fontDefinitions, {
    "MWD UI": {
      editor: !0,
      fonts: [
        { urls: ["systems/mwd/fonts/Exo2/Exo2-Regular.woff2"], weight: 400, style: "normal" },
        { urls: ["systems/mwd/fonts/Exo2/Exo2-Italic.woff2"], weight: 400, style: "italic" },
        { urls: ["systems/mwd/fonts/Exo2/Exo2-Bold.woff2"], weight: 700, style: "normal" }
      ]
    },
    "MWD Display": {
      editor: !1,
      fonts: [
        { urls: ["systems/mwd/fonts/btclassic/BattletechOldStyle.woff2"], weight: 400, style: "normal" }
      ]
    },
    "MWD Body": {
      editor: !0,
      fonts: [
        { urls: ["systems/mwd/fonts/bitter/Bitter-Regular.woff2"], weight: 400, style: "normal" },
        { urls: ["systems/mwd/fonts/bitter/Bitter-Bold.woff2"], weight: 700, style: "normal" }
      ]
    },
    "MWD Numeric": {
      editor: !1,
      fonts: [
        { urls: ["systems/mwd/fonts/anta/Anta-Regular.woff2"], weight: 400, style: "normal" }
      ]
    },
    "Material Symbols Rounded": {
      editor: !1,
      fonts: [
        { urls: ["systems/mwd/fonts/Icons/MaterialSymbolsRounded.woff2"], weight: 400, style: "normal" }
      ]
    },
    "MWD Logo": {
      editor: !1,
      fonts: [
        { urls: ["systems/mwd/fonts/btclassic/BTLogo_old.woff2"], weight: 400, style: "normal" }
      ]
    }
  });
}
function mw() {
  return {
    get(a) {
      return zt(a);
    },
    getSkills({ withKnowledge: a = !1 } = {}) {
      return Zn();
    },
    list() {
      return Zn();
    }
  };
}
function fw() {
  return {
    get(a) {
      return Di(a);
    },
    list() {
      return Ds();
    },
    listByType(a) {
      return Ko(a);
    },
    getTypeLabel(a) {
      return Na(a);
    },
    evaluate(a) {
      return _i(a);
    }
  };
}
function pw() {
  return {
    normalizeQualitySystem(a) {
      return Gt(a);
    },
    getEditorConfig() {
      return ju();
    },
    evaluatePhase(a) {
      return xt(a);
    },
    applyMutations(a) {
      return yi(a);
    },
    buildRollFacts(a) {
      return Bo(a);
    },
    buildActionCostFacts(a) {
      return qu(a);
    },
    buildBurnFacts(a) {
      return Ln(a);
    },
    buildInitiativeFacts(a) {
      return Vu(a);
    },
    buildDamageFacts(a) {
      return Yu(a);
    },
    buildEdgeFacts(a) {
      return Nr(a);
    },
    buildEndOfActivationFacts(a) {
      return Qu(a);
    }
  };
}
class rl {
  static start() {
    const e = new rl();
    Hooks.once("init", () => e.onInit()), Hooks.once("ready", () => e.onReady());
  }
  async onInit() {
    console.log(Me + "AnarchySystem.onInit"), game.system.mwd = this, game.system.anarchy = this, game.mwd ?? (game.mwd = {}), dw(), AS(), Qy("mwd"), game.mwd.roll = Bc, game.mwd.attacks = Ac, game.mwd.personalCombat = B, game.mwd.harm = Pt, this.roll = Bc, this.attacks = Ac, this.personalCombat = B, this.harm = Pt, this.skills = mw(), this.lifeModules = fw(), this.traits = pw(), this.remoteCall = new Cr(), game.system.mwd.skills = this.skills, game.system.mwd.lifeModules = this.lifeModules, game.system.mwd.traits = this.traits, game.mwd.skills = this.skills, game.mwd.lifeModules = this.lifeModules, game.mwd.traits = this.traits, ve.init(), this.modifiers = new fe(), ei.register(new iw()), ei.register(new aw()), ei.register(new nw()), ei.register(new sw()), ei.register(rw), ei.register(new ow()), ei.register(new lw()), ei.register(new uw()), ei.register(new vy()), Handlebars.registerHelper("mwdClassList", (e) => Array.isArray(e) ? e.join(" ") : typeof e == "string" ? e : ""), this.actorClasses = {
      character: ec,
      npc: ec,
      vehicle: $d,
      battlemech: Ty
    }, this.hooks = new Ji(), this.styles = new Eg(), this.handlebarsManager = new Go(), B.init(), Ob.register(), Hooks.on("updateSetting", (e) => {
      (e == null ? void 0 : e.key) === `${T}.statusConditionCatalog` && bl();
    }), console.log(Me + "AnarchySystem.onInit | loading system"), CONFIG.ANARCHY = _e, CONFIG.Combat.initiative = { formula: "2d6" }, bl(), CONFIG.Actor.documentClass = _A, CONFIG.Item.documentClass = Da, Da.init(), um(), Pp(), dA(), RA(), await DA(), console.log(Me + "AnarchySystem.onInit | done");
  }
  async onReady() {
    if (console.log(Me + "AnarchySystem.onReady"), await B.onReady(), !game.user.isGM) return;
    await Jh();
    const e = game.settings.get(T, "enableGMGadget");
    if (!e) {
      console.log(`${Me}GMManager render skipped (enableGMGadget=false)`);
      return;
    }
    game.mwd = game.mwd ?? {}, game.mwd.gmGadget = () => Jy({ systemId: T }).render({ force: !0 }), e && game.mwd.gmGadget();
  }
}
rl.start();
//# sourceMappingURL=index.mjs.map
