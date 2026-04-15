var Dd = Object.defineProperty;
var Od = Object.getPrototypeOf;
var _d = Reflect.get;
var jo = (a) => {
  throw TypeError(a);
};
var Ld = (a, e, t) => e in a ? Dd(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var O = (a, e, t) => Ld(a, typeof e != "symbol" ? e + "" : e, t), Rs = (a, e, t) => e.has(a) || jo("Cannot " + t);
var z = (a, e, t) => (Rs(a, e, "read from private field"), t ? t.call(a) : e.get(a)), Ae = (a, e, t) => e.has(a) ? jo("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), Ie = (a, e, t, i) => (Rs(a, e, "write to private field"), i ? i.call(a, t) : e.set(a, t), t), E = (a, e, t) => (Rs(a, e, "access private method"), t);
var Vt = (a, e, t) => _d(Od(a), t, e);
const Pe = {
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
    anarchyHack: {
      name: "Destiny hack",
      hint: "Use an Anarchy Hack provided by a module"
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
}, w = Pe, T = "mwd", xd = "MechWarrior: Destiny", ar = `system.${T}`, $d = T, nn = `systems/${T}`, pc = `${nn}/style`, Oa = `${nn}/third-party/style`, Q = `systems/${T}/templates`, ss = `${nn}/img/icons`, le = `${ss}/skills`, be = "MWD | ", Bd = 2, zd = 5, Fd = 4, hc = 8, wi = {
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
}, nr = {
  autopilot: "autopilot",
  firewall: "firewall",
  knowledge: "knowledge"
}, ot = {
  grit: "grit",
  chaos: "chaos",
  insight: "insight",
  rumor: "rumor",
  legend: "legend",
  credibility: "credibility"
}, to = {
  physical: [ot.grit, ot.chaos],
  mental: [ot.insight, ot.rumor],
  social: [ot.legend, ot.credibility]
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
  actorAttributes: wi,
  itemAttributes: nr,
  attributes: { ...wi, ...nr },
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
    edgePools: ot,
    edgePoolGroups: to,
    physical: {
      grit: ot.grit,
      chaos: ot.chaos
    },
    mental: {
      insight: ot.insight,
      rumor: ot.rumor
    },
    social: {
      legend: ot.legend,
      credibility: ot.credibility
    },
    chaos: ot.chaos
  },
  area: {
    none: "none",
    shotgun: "shotgun",
    circle: "circle",
    cone: "cone",
    rect: "rect",
    ray: "ray"
  }
}, Ud = Object.freeze({
  physical: "physical",
  mental: "mental",
  social: "social"
});
Object.freeze(Object.values(Ud));
const Sa = {
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
}, Is = {
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
}, Je = {
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
  SYSTEM_DESCRIPTION: xd,
  SYSTEM_SOCKET: ar,
  SYSTEM_SCOPE: $d,
  SYSTEM_PATH: nn,
  STYLE_PATH: pc,
  THIRD_PARTY_STYLE_PATH: Oa,
  TEMPLATES_PATH: Q,
  ICONS_PATH: ss,
  ICONS_SKILLS_PATH: le,
  LOG_HEAD: be,
  SPECIALIZATION_BONUS: Bd,
  TARGET_SUCCESS: zd,
  TARGET_SUCCESS_EDGE: Fd,
  BASE_MONITOR: hc,
  ACTOR_ATTRIBUTES: wi,
  ITEM_ATTRIBUTES: nr,
  EDGE_POOL_GROUPS: to,
  TEMPLATE: A,
  ANARCHY_SYSTEM: Je
};
const Qt = class Qt {
  static ascending(e = (t) => t) {
    return (t, i) => Qt.sortingBy(e(t), e(i));
  }
  static descending(e = (t) => t) {
    return (t, i) => Qt.sortingBy(e(i), e(t));
  }
  static sortingBy(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
  }
  static bySortedArray(e) {
    return (t) => e.indexOf(t);
  }
  static ascendingBySortedArray(e) {
    return Qt.ascending(Qt.bySortedArray(e));
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
    return e.map(t).filter((i) => i != null).reduce(Qt.sum(), 0);
  }
  static divint(e, t) {
    return Math.floor(e / t);
  }
  static divup(e, t) {
    return Math.ceil(e / t);
  }
  static join(e, t = "") {
    return e.reduce(Qt.joiner(t));
  }
  static joiner(e = "") {
    return (t, i) => t + e + i;
  }
  static classify(e, t = (i) => i.type) {
    let i = {};
    return Qt.classifyInto(i, e, t), i;
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
O(Qt, "isString", (e) => typeof e == "string" || e instanceof String);
let se = Qt;
const Hd = {
  keyword: "keywords",
  disposition: "dispositions",
  cue: "cues"
}, R = class R {
  /**
   * Initialize enum caches.
   * Call once during system init/setup after config/constants are available.
   */
  static init() {
    var t, i, n, s, r, l, o, c, u, d, m, f;
    R.hbsAttributes = R.mapObjectToKeyValue(w.attributes).filter((p) => p.value !== "knowledge" && p.value !== "noAttribute"), R.hbsItemTypes = R.mapObjectToKeyValue(w.itemType), R.hbsMonitors = R.mapObjectToKeyValue(w.monitor), R.hbsMonitorLetters = R.mapObjectToKeyValue(w.monitorLetter), R.hbsAssetModuleCategories = R.mapObjectToKeyValue(w.assetModuleCategory), (i = (t = w.item) == null ? void 0 : t.lifeModule) != null && i.type ? R.hbsLifeModuleTypes = R.mapObjectToKeyValue(w.item.lifeModule.type) : (console.warn("MWD | MWD.item.lifeModule.type is missing; life module enums disabled."), R.hbsLifeModuleTypes = []), R.hbsAreas = R.mapObjectToKeyValue(w.area), R.hbsRanges = R.mapObjectToKeyValue(w.range), R.hbsVehicleCategories = R.mapObjectToKeyValue(w.vehicleCategory), R.hbsMwdWeightClasses = R.mapObjectToKeyValue((n = w.mwd) == null ? void 0 : n.weightClass), R.hbsMwdHardpointTypes = R.mapObjectToKeyValue((s = w.mwd) == null ? void 0 : s.hardpointType), R.hbsMwdHardpointSizes = R.mapObjectToKeyValue((r = w.mwd) == null ? void 0 : r.hardpointSize), R.hbsMwdHardpointLocations = R.mapObjectToKeyValue((l = w.mwd) == null ? void 0 : l.hardpointLocation), R.hbsMwdPrimaryModes = R.mapObjectToKeyValue((o = w.mwd) == null ? void 0 : o.primarySlotMode), R.hbsMwdWeaponCategories = R.mapObjectToKeyValue((c = w.mwd) == null ? void 0 : c.weaponCategory), R.hbsMwdWeaponDamageTypes = R.mapObjectToKeyValue((u = w.mwd) == null ? void 0 : u.weaponDamageType), R.hbsPersonalWeaponDamageTypes = R.mapObjectToKeyValue((d = w.mwd) == null ? void 0 : d.personalDamageType), R.hbsPersonalWeaponDamageCategories = R.mapObjectToKeyValue((m = w.mwd) == null ? void 0 : m.personalDamageCategory), R.hbsMwdMeleeLocations = R.mapObjectToKeyValue((f = w.mwd) == null ? void 0 : f.meleeLocation), R.hbsDamageTypes = se.distinct(
      (R.hbsMwdWeaponDamageTypes ?? []).concat(R.hbsPersonalWeaponDamageTypes ?? []),
      (p) => p.value
    );
    const e = Object.values(Sa).flat();
    R.sortedAttributeKeys = se.distinct(
      e.concat(Object.keys(w.attributes ?? {}))
    ), R.registerHandleBarHelpers(), R.ENUMS = R.getEnums();
  }
  static registerHandleBarHelpers() {
    typeof Handlebars > "u" || Handlebars.registerHelper("sortedAttributes", (e) => {
      if (!e || typeof e != "object") return [];
      const t = Object.keys(e), i = R.sortedAttributeKeys ?? [], n = new Map(i.map((s, r) => [s, r]));
      return t.sort((s, r) => {
        const l = n.has(s) ? n.get(s) : 9999, o = n.has(r) ? n.get(r) : 9999;
        return l !== o ? l - o : String(s).localeCompare(String(r));
      }), t.map((s) => {
        const r = e[s];
        return r && typeof r == "object" ? { key: s, ...r } : { key: s, value: r };
      });
    });
  }
  static getDamageTypes() {
    return R.hbsDamageTypes ?? [];
  }
  static getAttributes(e = () => !0) {
    return (R.hbsAttributes ?? []).filter((t) => e(t.value));
  }
  static getActorWordTypes() {
    return Hd;
  }
  static getMonitors() {
    return R.hbsMonitors ?? [];
  }
  /**
   * Returns a big blob of enums suitable for sheet contexts.
   * `withKnowledge` is passed through to the skills service.
   */
  static getEnums(e = () => !0, t = !1) {
    return {
      attributes: R.getAttributes(e),
      itemTypes: R.hbsItemTypes ?? [],
      monitors: R.hbsMonitors ?? [],
      monitorLetters: R.hbsMonitorLetters ?? [],
      assetModuleCategories: R.hbsAssetModuleCategories ?? [],
      lifeModuleTypes: R.hbsLifeModuleTypes ?? [],
      areas: R.hbsAreas ?? [],
      ranges: R.hbsRanges ?? [],
      vehicleCategories: R.hbsVehicleCategories ?? [],
      // Skills: now sourced from MWD namespace (with safe fallback)
      skills: R.getSkillsEnum({ withKnowledge: t }),
      // MWD enums
      mwdWeightClasses: R.hbsMwdWeightClasses ?? [],
      mwdHardpointTypes: R.hbsMwdHardpointTypes ?? [],
      mwdHardpointSizes: R.hbsMwdHardpointSizes ?? [],
      mwdHardpointLocations: R.hbsMwdHardpointLocations ?? [],
      mwdPrimaryModes: R.hbsMwdPrimaryModes ?? [],
      mwdWeaponCategories: R.hbsMwdWeaponCategories ?? [],
      mwdWeaponDamageTypes: R.hbsMwdWeaponDamageTypes ?? [],
      personalWeaponDamageTypes: R.hbsPersonalWeaponDamageTypes ?? [],
      personalWeaponDamageCategories: R.hbsPersonalWeaponDamageCategories ?? [],
      damageTypes: R.hbsDamageTypes ?? [],
      mwdMeleeLocations: R.hbsMwdMeleeLocations ?? []
    };
  }
  static getSkillsEnum({ withKnowledge: e = !1 } = {}) {
    var n, s, r, l, o;
    const t = ((s = (n = game == null ? void 0 : game.system) == null ? void 0 : n.mwd) == null ? void 0 : s.skills) ?? ((l = (r = game == null ? void 0 : game.system) == null ? void 0 : r.anarchy) == null ? void 0 : l.skills);
    return (((o = t == null ? void 0 : t.getSkills) == null ? void 0 : o.call(t, { withKnowledge: e })) ?? []).map((c) => ({
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
    return R.mapObjectToKeyValue(e, t, i);
  }
};
O(R, "ENUMS"), // HBS-friendly arrays of { value, label } (or key/value depending on caller)
O(R, "hbsAttributes"), O(R, "hbsItemTypes"), O(R, "hbsMonitors"), O(R, "hbsMonitorLetters"), O(R, "hbsAssetModuleCategories"), O(R, "hbsLifeModuleTypes"), O(R, "hbsAreas"), O(R, "hbsRanges"), O(R, "hbsVehicleCategories"), // MWD-specific enum groups
O(R, "hbsMwdWeightClasses"), O(R, "hbsMwdHardpointTypes"), O(R, "hbsMwdHardpointSizes"), O(R, "hbsMwdHardpointLocations"), O(R, "hbsMwdPrimaryModes"), O(R, "hbsMwdWeaponCategories"), O(R, "hbsMwdWeaponDamageTypes"), O(R, "hbsPersonalWeaponDamageTypes"), O(R, "hbsPersonalWeaponDamageCategories"), O(R, "hbsDamageTypes"), O(R, "hbsMwdMeleeLocations"), O(R, "sortedAttributeKeys");
let ye = R;
class Wd {
  static monitor(e) {
    return ye.getFromList(ye.getMonitors(), e) ?? "";
  }
  static letter(e) {
    return ye.getFromList(ye.getMonitorLetters(), e) ?? "";
  }
}
class jd {
  static toLowerCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}
const Gd = [
  "fas fa-dice",
  "fas fa-dice-one",
  "fas fa-dice-two",
  "fas fa-dice-three",
  "fas fa-dice-four",
  "fas fa-dice-five",
  "fas fa-dice-six"
];
class q {
  static fontAwesome(e) {
    return `<i class="${e}"></i>`;
  }
  static iconSystemPath(e, t) {
    return q.iconPath(`${pc}/${e}`, t);
  }
  static iconPath(e, t) {
    return `<img class="${t}" src="${e}" />`;
  }
  static iconD6(e) {
    if (e < 0 || e > 6)
      throw `Dice ${e} is out of dice range [1..6] or 0 for multidice`;
    return q.fontAwesome(Gd[e]);
  }
}
globalThis.ANARCHY_ICONS = q;
const ve = (a, e = {}) => a.replace(/\{(.*?)\}/g, (t, i) => e[i] ?? "");
function io(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => io(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function ja(a = []) {
  return Array.from(new Set(a.map((e) => String(e ?? "").trim()).filter(Boolean)));
}
function An(a, e = "standard") {
  return String(a ?? "").trim() || e;
}
function qd(a, e = {}) {
  a && (a.movedToKeywords ?? (a.movedToKeywords = []), a.movedToKeywords.push(e));
}
function Kd(a, e, t = {}) {
  a && (a.errors ?? (a.errors = []), a.errors.push({ message: e, ...t }));
}
const ao = Object.freeze(["templated"]), Vd = Object.freeze([
  "burstCapable",
  "fullAutoCapable",
  "salvoCapable"
]), Yd = Object.freeze([
  "clustered",
  "mineLayer",
  "smoke",
  "incendiary",
  "emp"
]), Qd = Object.freeze([
  { value: "burstCapable", label: "Burst Capable" },
  { value: "fullAutoCapable", label: "Full Auto Capable" },
  { value: "salvoCapable", label: "Salvo Capable" }
]), Jd = Object.freeze([
  { value: "templated", label: "Templated" },
  { value: "clustered", label: "Clustered" },
  { value: "mineLayer", label: "Mine Layer" },
  { value: "smoke", label: "Smoke" },
  { value: "incendiary", label: "Incendiary" },
  { value: "emp", label: "EMP" }
]), gc = Object.freeze([
  { value: "blast", label: "Blast" },
  { value: "cone", label: "Cone" },
  { value: "line", label: "Line" },
  { value: "cloud", label: "Cloud" },
  { value: "minefield", label: "Minefield" }
]), yc = Object.freeze([
  { value: "targeted", label: "Targeted (start on target)" },
  { value: "origin", label: "Origin (start on attacker)" },
  { value: "placed", label: "Placed (start free)" }
]), Xd = Object.freeze(["blast", "cone", "line"]);
new Set(ao);
const Zd = /* @__PURE__ */ new Set([
  ...ao,
  ...Vd
]), em = /* @__PURE__ */ new Set([
  ...ao,
  ...Yd
]);
function no() {
  return {
    movedToKeywords: [],
    errors: []
  };
}
function Un(a) {
  return ja(io(a));
}
function bc({
  traits: a = [],
  keywords: e = [],
  recognized: t = /* @__PURE__ */ new Set(),
  report: i = null,
  owner: n = "weapon",
  path: s = ""
} = {}) {
  const r = io(a), l = Un(e), o = [], c = [...l];
  for (const u of r) {
    if (t.has(u)) {
      o.push(u);
      continue;
    }
    c.push(u), qd(i, {
      owner: n,
      from: s || "traits",
      to: s ? s.replace(/traits$/u, "keywords") : "keywords",
      value: u
    });
  }
  return {
    traits: ja(o),
    keywords: ja(c)
  };
}
function Sc({
  traits: a = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.traits"
} = {}) {
  return bc({
    traits: a,
    keywords: e,
    recognized: Zd,
    report: t,
    owner: "weapon",
    path: i
  });
}
function Ac({
  traits: a = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.payloads[].traits"
} = {}) {
  return bc({
    traits: a,
    keywords: e,
    recognized: em,
    report: t,
    owner: "payload",
    path: i
  });
}
function Tc(a = {}, e = "standard") {
  const t = a ?? {}, i = An(
    t.resolverKey ?? t.damageModel ?? t.resolver,
    e
  ), n = String(t.damageModel ?? "").trim(), s = t.onHitEffect;
  return {
    resolverKey: i,
    damageModel: n,
    onHitEffect: s === null ? null : String(s ?? "").trim() || null
  };
}
function Ds(a = {}) {
  const e = a ?? {}, t = !!e.enabled, i = e.shots, n = e.accuracyMod, s = e.addHeat, r = e.consumption;
  return {
    enabled: t,
    ...i !== void 0 ? { shots: Math.max(0, Number(i ?? 0) || 0) } : {},
    ...n !== void 0 ? { accuracyMod: Number(n ?? 0) || 0 } : {},
    ...s !== void 0 ? { addHeat: Number(s ?? 0) || 0 } : {},
    ...r !== void 0 ? { consumption: Math.max(0, Number(r ?? 0) || 0) } : {}
  };
}
function tm(a = {}) {
  const e = a ?? {};
  return {
    single: Ds(e.single),
    burst: Ds(e.burst),
    fullAuto: Ds(e.fullAuto)
  };
}
function im(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return e === "circle" ? "blast" : e === "ray" ? "line" : gc.some((t) => t.value === e) ? e : "";
}
function am(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return ["target", "targeted"].includes(e) ? "targeted" : yc.some((t) => t.value === e) ? e : "";
}
function nm(a = null) {
  const e = a ?? {}, t = im(e.shape ?? e.t ?? e.type), i = e.size ?? e.distance ?? e.radius ?? e.length, n = am(e.placement ?? e.origin ?? e.mode);
  return !t && i === void 0 && !n ? null : {
    shape: t,
    size: Math.max(0, Number(i ?? 0) || 0),
    placement: n || "targeted"
  };
}
function sm({
  weapon: a = {},
  payload: e = {},
  effectiveTraits: t = [],
  effectiveResolution: i = null,
  report: n = null
} = {}) {
  var g, y;
  const s = ja((a == null ? void 0 : a.traits) ?? []), r = ja((e == null ? void 0 : e.traits) ?? []), l = t.includes("templated"), o = s.includes("templated"), c = r.includes("templated"), u = (e == null ? void 0 : e.template) ?? null, d = (a == null ? void 0 : a.template) ?? null, m = An((g = e == null ? void 0 : e.resolution) == null ? void 0 : g.resolverKey, ""), f = An((y = a == null ? void 0 : a.resolution) == null ? void 0 : y.resolverKey, ""), p = An(i == null ? void 0 : i.resolverKey, "standard"), h = [];
  if (!l)
    return {
      errors: h,
      liveCapabilities: [],
      template: null,
      resolverKey: p,
      isTemplated: !1
    };
  o && h.push("Weapon-authored templated attacks are not supported in personal weapon capability v1."), o && c && h.push("Templated capability cannot be authored on both weapon and payload."), d && h.push("Template configuration must be authored on the payload for templated attacks."), c || h.push("Templated attacks require the active payload to author the templated capability."), (!(u != null && u.shape) || !(Number(u == null ? void 0 : u.size) > 0)) && h.push("Templated payloads require a valid template shape and size."), u != null && u.placement || h.push("Templated payloads require a template placement mode."), p !== "template" && h.push("Templated attacks require resolution.resolverKey to be template."), m && m !== "template" && h.push("Payload templated attacks must author resolution.resolverKey as template."), f === "template" && h.push("Weapon-level template resolver routing is not supported for personal weapon capability v1.");
  for (const b of h)
    Kd(n, b, { capability: "templated" });
  return {
    errors: h,
    liveCapabilities: ["templated"],
    template: u,
    resolverKey: p,
    isTemplated: !0
  };
}
const Ga = Object.freeze(["none", "minor", "major", "full"]), rm = Object.freeze(["blast", "cone", "line", "rect"]), om = Object.freeze({
  blast: "circle",
  cone: "cone",
  line: "ray",
  rect: "rect"
}), lm = Object.freeze({
  circle: "blast",
  cone: "cone",
  ray: "line",
  rect: "rect",
  rectangle: "rect"
}), ie = Object.freeze({
  none: "none",
  minor: "minor",
  major: "major",
  full: "full"
}), cm = Object.freeze({
  none: 0,
  minor: 0.25,
  major: 0.5,
  full: 1
}), ut = Object.freeze({
  discrete: "discrete",
  persistent: "persistent"
});
function _(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function um(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return ["true", "1", "yes", "y", "on"].includes(t) ? !0 : ["false", "0", "no", "n", "off"].includes(t) ? !1 : e;
}
function wc(a) {
  return foundry.utils.deepClone(a);
}
function De(a, e = ie.none) {
  const t = String(a ?? "").trim().toLowerCase();
  return Ga.includes(t) ? t : e;
}
function sr(a) {
  return Number(cm[De(a)] ?? 0) || 0;
}
function Ci(a) {
  return Ga.indexOf(De(a));
}
function rr(a, e = 1) {
  const t = Math.max(0, Ci(a)), i = Math.max(0, t - Math.max(0, Math.trunc(_(e, 1))));
  return Ga[i] ?? ie.none;
}
function dm(a, e = 1) {
  const t = Math.max(0, Ci(a)), i = Math.min(Ga.length - 1, t + Math.max(0, Math.trunc(_(e, 1))));
  return Ga[i] ?? ie.full;
}
function Ct(a) {
  return De(a).toUpperCase();
}
function so(a = {}) {
  var n, s, r, l, o;
  const e = a ?? {}, t = Math.max(1, Math.trunc(_(
    ((n = e == null ? void 0 : e.escalation) == null ? void 0 : n.intervalTurns) ?? ((s = e == null ? void 0 : e.escalation) == null ? void 0 : s.interval) ?? 1,
    1
  ))), i = Math.max(0, Math.trunc(_(((r = e == null ? void 0 : e.escalation) == null ? void 0 : r.rate) ?? 1, 1)));
  return {
    startExposure: De(e.startExposure, ie.minor),
    escalation: {
      rate: i,
      intervalTurns: t,
      max: De((l = e == null ? void 0 : e.escalation) == null ? void 0 : l.max, ie.full)
    },
    onFull: {
      burnDelta: Math.max(0, Math.trunc(_(((o = e == null ? void 0 : e.onFull) == null ? void 0 : o.burnDelta) ?? 0, 0)))
    },
    clearOnExit: um(e.clearOnExit, !0)
  };
}
function fi(a = {}) {
  const e = a ?? {}, t = String(e.kind ?? ut.discrete).trim().toLowerCase() === ut.persistent ? ut.persistent : ut.discrete;
  return {
    kind: t,
    hazard: t === ut.persistent ? so(e.hazard ?? e) : null
  };
}
function vc(a = {}) {
  return fi(a).kind === ut.persistent;
}
function Gi(a, e) {
  return Math.max(0, Math.ceil(_(a, 0) * sr(e)));
}
function rs(a, e = "") {
  const t = String(a ?? "").trim().toLowerCase();
  return rm.includes(t) ? t : e;
}
function kc(a, e = "circle") {
  return om[rs(a)] ?? e;
}
function mm(a, e = "") {
  const t = String(a ?? "").trim().toLowerCase();
  return lm[t] ?? e;
}
function ro(a) {
  let e = _(a, 0);
  for (; e < 0; ) e += 360;
  for (; e >= 360; ) e -= 360;
  return e;
}
function pi() {
  var a, e, t;
  return _(((e = (a = canvas == null ? void 0 : canvas.scene) == null ? void 0 : a.grid) == null ? void 0 : e.distance) ?? ((t = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : t.distance), 1) || 1;
}
function Hn() {
  var a, e;
  return _(((a = canvas == null ? void 0 : canvas.grid) == null ? void 0 : a.size) ?? ((e = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : e.size), 100) || 100;
}
function it(a = 0) {
  return _(a, 0) * (Hn() / pi());
}
function Na(a = 0) {
  return _(a, 0) * (pi() / Hn());
}
function or(a = {}, e = {}) {
  return Math.hypot(_(a.x, 0) - _(e.x, 0), _(a.y, 0) - _(e.y, 0));
}
function sn(a) {
  return _(a, 0) * Math.PI / 180;
}
function fm({ geometry: a = {}, tokenCenter: e = {} } = {}) {
  const t = _(e.x, 0) - _(a.x, 0), i = _(e.y, 0) - _(a.y, 0), n = sn(a.direction ?? 0), s = Math.cos(n), r = Math.sin(n);
  return Math.max(0, t * s + i * r);
}
function Os(a = 0, e = 0) {
  if (!(e > 0)) return ie.none;
  const t = Math.max(0, Math.min(1, a / e));
  return t <= 1 / 3 ? ie.full : t <= 2 / 3 ? ie.major : t <= 1 ? ie.minor : ie.none;
}
function Go({ template: a = {}, placement: e = {} } = {}) {
  var o, c;
  const t = rs((e == null ? void 0 : e.shape) ?? (a == null ? void 0 : a.shape), "");
  if (!t) return null;
  const i = _(
    (e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size),
    0
  );
  if (!(i > 0)) return null;
  const n = t === "cone" ? _((e == null ? void 0 : e.angle) ?? 90, 90) : null, s = t === "line" ? _((e == null ? void 0 : e.width) ?? pi(), pi()) : null, r = t === "rect" ? _((e == null ? void 0 : e.width) ?? (a == null ? void 0 : a.width) ?? (e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size), 0) : null, l = t === "rect" ? _((e == null ? void 0 : e.height) ?? (a == null ? void 0 : a.height) ?? (e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size), 0) : null;
  return t === "rect" && (!(r > 0) || !(l > 0)) ? null : {
    shape: t,
    measuredTemplateType: kc(t),
    x: _((o = e == null ? void 0 : e.anchor) == null ? void 0 : o.x, 0),
    y: _((c = e == null ? void 0 : e.anchor) == null ? void 0 : c.y, 0),
    direction: ro((e == null ? void 0 : e.direction) ?? 0),
    distance: t === "rect" ? Math.max(r, l) : i,
    angle: n,
    width: s,
    height: t === "rect" ? l : null,
    anchorX: t === "rect" ? _((e == null ? void 0 : e.anchorX) ?? (a == null ? void 0 : a.anchorX) ?? 0, 0) : null,
    anchorY: t === "rect" ? _((e == null ? void 0 : e.anchorY) ?? (a == null ? void 0 : a.anchorY) ?? 0, 0) : null,
    placementMode: String((a == null ? void 0 : a.placement) ?? (e == null ? void 0 : e.placementMode) ?? "").trim() || null
  };
}
function Oe(a = null, { template: e = null, placement: t = null } = {}) {
  var u, d, m, f;
  const i = a && typeof a == "object" ? a : {};
  if ((!i || !Object.keys(i).length) && (e || t))
    return Go({ template: e, placement: t });
  const n = String(
    i.measuredTemplateType ?? i.t ?? i.type ?? ""
  ).trim().toLowerCase(), s = rs(
    i.shape ?? mm(n) ?? "",
    ""
  );
  if (!s)
    return e || t ? Go({ template: e, placement: t }) : null;
  const r = s === "rect" ? _(i.width ?? (t == null ? void 0 : t.width) ?? (e == null ? void 0 : e.width) ?? i.distance ?? i.size, 0) : 0, l = s === "rect" ? _(i.height ?? (t == null ? void 0 : t.height) ?? (e == null ? void 0 : e.height) ?? i.distance ?? i.size, 0) : 0, o = _(
    i.distance ?? i.size ?? i.templateDistance ?? (t == null ? void 0 : t.distance) ?? (e == null ? void 0 : e.distance) ?? (e == null ? void 0 : e.size),
    0
  );
  if (s === "rect") {
    if (!(r > 0) || !(l > 0)) return null;
  } else if (!(o > 0)) return null;
  return {
    shape: s,
    measuredTemplateType: n || kc(s),
    x: _(i.x ?? ((u = i.anchor) == null ? void 0 : u.x) ?? ((d = t == null ? void 0 : t.anchor) == null ? void 0 : d.x), 0),
    y: _(i.y ?? ((m = i.anchor) == null ? void 0 : m.y) ?? ((f = t == null ? void 0 : t.anchor) == null ? void 0 : f.y), 0),
    direction: ro(i.direction ?? i.rotation ?? (t == null ? void 0 : t.direction) ?? 0),
    distance: s === "rect" ? Math.max(r, l) : o,
    angle: s === "cone" ? _(i.angle ?? (t == null ? void 0 : t.angle) ?? 90, 90) : null,
    width: s === "line" ? _(i.width ?? (t == null ? void 0 : t.width) ?? pi(), pi()) : s === "rect" ? r : null,
    height: s === "rect" ? l : null,
    anchorX: s === "rect" ? _(i.anchorX ?? (t == null ? void 0 : t.anchorX) ?? (e == null ? void 0 : e.anchorX) ?? 0, 0) : null,
    anchorY: s === "rect" ? _(i.anchorY ?? (t == null ? void 0 : t.anchorY) ?? (e == null ? void 0 : e.anchorY) ?? 0, 0) : null,
    placementMode: String(i.placementMode ?? (e == null ? void 0 : e.placement) ?? "").trim() || null
  };
}
function pm(a = null) {
  return a ? typeof (a == null ? void 0 : a.toObject) == "function" ? a.toObject() : typeof (a == null ? void 0 : a.toJSON) == "function" ? a.toJSON() : a && typeof a == "object" ? wc(a) : null : null;
}
function hm(a = []) {
  const e = [];
  for (const t of a) {
    const i = Number(t);
    i > 0 && (e.some((n) => Math.abs(n - i) < 1e-3) || e.push(i));
  }
  return e;
}
function gm(a = null, { placementMode: e = "region", shapeHint: t = "" } = {}) {
  const i = pm(a);
  if (!i || typeof i != "object") return null;
  const n = String(i.type ?? "").trim().toLowerCase(), s = rs(t, "");
  if (n === "circle")
    return Oe({
      shape: s || "blast",
      measuredTemplateType: "circle",
      x: i.x,
      y: i.y,
      distance: Na(i.radius),
      placementMode: e
    });
  if (n === "ellipse") {
    const r = _(i.radiusX, 0), l = _(i.radiusY, 0);
    return !(r > 0) || Math.abs(r - l) > 1e-3 ? null : Oe({
      shape: s || "blast",
      measuredTemplateType: "circle",
      x: _(i.x, 0) + r,
      y: _(i.y, 0) + l,
      distance: Na(r),
      placementMode: e
    });
  }
  if (n === "cone")
    return Oe({
      shape: s || "cone",
      measuredTemplateType: "cone",
      x: i.x,
      y: i.y,
      direction: i.rotation ?? i.direction,
      distance: Na(i.radius),
      angle: i.angle,
      placementMode: e
    });
  if (n === "line") {
    const r = Array.from((a == null ? void 0 : a.measuredSegments) ?? []), l = hm(r.map((f) => f == null ? void 0 : f.distance)), o = Math.max(
      _(i.distance, 0),
      _(i.length, 0),
      _(i.radius, 0),
      ...l,
      0
    ), c = l.filter((f) => Math.abs(f - o) >= 1e-3), u = Math.max(
      0,
      _(i.width, 0),
      _(i.thickness, 0),
      c.length ? Math.min(...c) : 0
    ) || pi(), d = (a == null ? void 0 : a.origin) ?? i.origin ?? {}, m = r.reduce((f, p) => {
      const h = Number((p == null ? void 0 : p.distance) ?? 0), g = Number((f == null ? void 0 : f.distance) ?? 0);
      return h > g ? p : f;
    }, null);
    return Oe({
      shape: s || "line",
      measuredTemplateType: "ray",
      x: d.x ?? i.x,
      y: d.y ?? i.y,
      direction: (m == null ? void 0 : m.angle) ?? i.rotation ?? i.direction,
      distance: o,
      width: u,
      placementMode: e
    });
  }
  return n === "rectangle" || n === "rect" ? Oe({
    shape: s || "rect",
    measuredTemplateType: "rect",
    x: i.x,
    y: i.y,
    direction: i.rotation ?? i.direction,
    width: Na(i.width),
    height: Na(i.height),
    anchorX: i.anchorX,
    anchorY: i.anchorY,
    placementMode: e
  }) : null;
}
function Ec(a = null, { placementMode: e = "region", shapeHint: t = "" } = {}) {
  const i = (a == null ? void 0 : a.document) ?? a ?? null, n = Array.from((i == null ? void 0 : i.shapes) ?? []);
  return n.length !== 1 ? null : gm(n[0], { placementMode: e, shapeHint: t });
}
function ym(a = null, e = null) {
  const t = Oe(a);
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
function Mc(a) {
  var l, o, c, u, d, m, f, p, h;
  const e = (a == null ? void 0 : a.center) ?? ((l = a == null ? void 0 : a.object) == null ? void 0 : l.center) ?? null;
  if (e)
    return {
      x: _(e.x, 0),
      y: _(e.y, 0)
    };
  const t = _((a == null ? void 0 : a.x) ?? ((o = a == null ? void 0 : a.document) == null ? void 0 : o.x), 0), i = _((a == null ? void 0 : a.y) ?? ((c = a == null ? void 0 : a.document) == null ? void 0 : c.y), 0), n = _((a == null ? void 0 : a.w) ?? ((u = a == null ? void 0 : a.object) == null ? void 0 : u.w) ?? ((d = a == null ? void 0 : a.document) == null ? void 0 : d.width), 1), s = _((a == null ? void 0 : a.h) ?? ((m = a == null ? void 0 : a.object) == null ? void 0 : m.h) ?? ((f = a == null ? void 0 : a.document) == null ? void 0 : f.height), 1), r = _(((p = canvas == null ? void 0 : canvas.grid) == null ? void 0 : p.size) ?? ((h = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : h.size), 100);
  return {
    x: t + n * r / 2,
    y: i + s * r / 2
  };
}
function bm(a) {
  var i, n, s, r;
  const e = _((a == null ? void 0 : a.w) ?? ((i = a == null ? void 0 : a.object) == null ? void 0 : i.w) ?? ((n = a == null ? void 0 : a.document) == null ? void 0 : n.width), 1) * Hn(), t = _((a == null ? void 0 : a.h) ?? ((s = a == null ? void 0 : a.object) == null ? void 0 : s.h) ?? ((r = a == null ? void 0 : a.document) == null ? void 0 : r.height), 1) * Hn();
  return Math.max(e, t) / 2;
}
function Sm({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = it(a.distance);
  return or({ x: a.x, y: a.y }, e) <= i + t;
}
function Am({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = it(a.distance), n = it(a.width ?? pi()), s = sn(a.direction), r = e.x - a.x, l = e.y - a.y, o = Math.cos(s), c = Math.sin(s), u = r * o + l * c;
  if (u < -t || u > i + t) return !1;
  const d = Math.max(0, Math.min(i, u)), m = a.x + d * o, f = a.y + d * c;
  return Math.hypot(e.x - m, e.y - f) <= t + n / 2;
}
function Tm({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = it(a.distance), n = e.x - a.x, s = e.y - a.y, r = Math.hypot(n, s);
  if (r > i + t) return !1;
  if (r === 0) return !0;
  let o = Math.atan2(s, n) * 180 / Math.PI - a.direction;
  for (; o <= -180; ) o += 360;
  for (; o > 180; ) o -= 360;
  const c = _(a.angle, 90) / 2, u = Math.asin(Math.min(1, t / Math.max(r, 1))) * 180 / Math.PI;
  return Math.abs(o) <= c + u;
}
function wm({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = it(_(a.width, 0)), n = it(_(a.height, 0));
  if (!(i > 0) || !(n > 0)) return !1;
  const s = _(a.anchorX, 0), r = _(a.anchorY, 0), l = _(a.x, 0), o = _(a.y, 0), c = l + i * (0.5 - s), u = o + n * (0.5 - r), d = -sn(a.direction ?? 0), m = Math.cos(d), f = Math.sin(d), p = e.x - c, h = e.y - u, g = p * m - h * f, y = p * f + h * m;
  return Math.abs(g) <= i / 2 + t && Math.abs(y) <= n / 2 + t;
}
function os(a = null, e = null) {
  const t = Oe(a);
  if (!t || !e) return !1;
  const i = Mc(e), n = bm(e);
  return t.shape === "blast" ? Sm({ geometry: t, tokenCenter: i, tokenRadius: n }) : t.shape === "line" ? Am({ geometry: t, tokenCenter: i, tokenRadius: n }) : t.shape === "cone" ? Tm({ geometry: t, tokenCenter: i, tokenRadius: n }) : t.shape === "rect" ? wm({ geometry: t, tokenCenter: i, tokenRadius: n }) : !1;
}
function Cc({ template: a = {}, placement: e = {}, geometry: t = null, token: i = null } = {}) {
  if (!i) return ie.none;
  const n = Oe(t, { template: a, placement: e });
  if (!n || !os(n, i))
    return ie.none;
  const s = Mc(i), r = it(n.distance);
  if (!(r > 0)) return ie.none;
  if (n.shape === "line" || n.shape === "cone") {
    const o = fm({ geometry: n, tokenCenter: s });
    return Os(o, r);
  }
  if (n.shape === "rect") {
    const o = {
      x: _(n.x, 0) + it(_(n.width, 0)) * (0.5 - _(n.anchorX, 0)),
      y: _(n.y, 0) + it(_(n.height, 0)) * (0.5 - _(n.anchorY, 0))
    }, c = or(o, s);
    return Os(c, r);
  }
  const l = or({ x: n.x, y: n.y }, s);
  return Os(l, r);
}
function Di({ tier: a = ie.none, appliedTier: e = null, evadeUsed: t = !1, evadeLocked: i = !1 } = {}) {
  const n = De(a, ie.none), s = De(e ?? n, n);
  return {
    initialTier: n,
    initialLabel: Ct(n),
    initialMultiplier: sr(n),
    finalTier: s,
    finalLabel: Ct(s),
    finalMultiplier: sr(s),
    evadeUsed: !!t,
    evadeLocked: !!i
  };
}
function oo(a = {}, { locked: e = !1, active: t = !1 } = {}) {
  const i = De((a == null ? void 0 : a.initialTier) ?? (a == null ? void 0 : a.tier), ie.none);
  if (!t || e || i === ie.none)
    return Di({
      tier: i,
      appliedTier: i,
      evadeUsed: !1,
      evadeLocked: !!e
    });
  const n = rr(i, 1);
  return Di({
    tier: i,
    appliedTier: n,
    evadeUsed: i !== n,
    evadeLocked: !!e
  });
}
function Pc(a = []) {
  return a.map((e) => ({
    x: Math.round(_(e.x, 0)),
    y: Math.round(_(e.y, 0))
  }));
}
function vm(a = {}) {
  const e = it(_(a.distance, 0)), t = it(_(a.width, pi())) / 2, i = sn(a.direction ?? 0), n = Math.cos(i), s = Math.sin(i), r = -s, l = n, o = {
    x: _(a.x, 0) + e * n,
    y: _(a.y, 0) + e * s
  };
  return {
    type: "polygon",
    points: Pc([
      { x: a.x + r * t, y: a.y + l * t },
      { x: o.x + r * t, y: o.y + l * t },
      { x: o.x - r * t, y: o.y - l * t },
      { x: a.x - r * t, y: a.y - l * t }
    ])
  };
}
function km(a = {}) {
  const e = _(a.angle, 90), t = it(_(a.distance, 0)), i = _(a.direction, 0), n = e / 2, s = [{ x: a.x, y: a.y }];
  for (let r = 0; r <= 8; r += 1) {
    const l = -n + e / 8 * r, o = sn(i + l);
    s.push({
      x: _(a.x, 0) + Math.cos(o) * t,
      y: _(a.y, 0) + Math.sin(o) * t
    });
  }
  return {
    type: "polygon",
    points: Pc(s)
  };
}
function Em(a = {}) {
  return {
    type: "rectangle",
    x: Math.round(_(a.x, 0)),
    y: Math.round(_(a.y, 0)),
    width: Math.round(it(_(a.width, 0))),
    height: Math.round(it(_(a.height, 0))),
    rotation: ro(a.direction ?? 0),
    anchorX: _(a.anchorX, 0),
    anchorY: _(a.anchorY, 0)
  };
}
function ls(a = null) {
  const e = Oe(a);
  if (!e) return [];
  if (e.shape === "blast") {
    const t = it(_(e.distance, 0));
    return [{
      type: "ellipse",
      x: Math.round(_(e.x, 0) - t),
      y: Math.round(_(e.y, 0) - t),
      radiusX: Math.round(t),
      radiusY: Math.round(t),
      rotation: 0
    }];
  }
  return e.shape === "line" ? [vm(e)] : e.shape === "cone" ? [km(e)] : e.shape === "rect" ? [Em(e)] : [];
}
function ei(a = null) {
  const e = Oe(a);
  return e ? wc(e) : null;
}
const Nc = Object.freeze({
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}), Wn = Object.freeze(
  Object.entries(Nc).map(([a, e]) => ({ value: a, label: e }))
), Mm = Object.freeze({
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
}), Cm = Object.freeze(
  Wn.map((a) => a.value)
), lr = Object.freeze({}), cs = Object.freeze({
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
}), Pm = Object.freeze(
  Object.values(cs).map((a) => ({
    value: a.key,
    label: a.label,
    rated: a.rated
  }))
), Rc = _c(lr), Ic = _c(cs);
function us(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => us(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function Gt(a, e = "penetrating") {
  const t = String(a ?? "").trim().toLowerCase();
  return Mm[t] ?? e;
}
function Dc(a) {
  const e = String(a ?? "").trim();
  return e ? Gt(e, "") : "";
}
function Oc(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return Cm.includes(e);
}
function qt(a) {
  const e = Gt(a, "");
  return Nc[e] ?? String(a ?? "").trim();
}
function ti(a) {
  const e = a ?? {}, t = Number(e.ballistic ?? 0) || 0, i = Number(e.melee ?? 0) || 0;
  return {
    penetrating: e.penetrating !== void 0 ? Number(e.penetrating ?? 0) || 0 : Math.max(t, i),
    concussive: e.concussive !== void 0 ? Number(e.concussive ?? 0) || 0 : Number(e.explosive ?? 0) || 0,
    energy: Number(e.energy ?? 0) || 0,
    thermal: Number(e.thermal ?? 0) || 0,
    electrical: Number(e.electrical ?? 0) || 0
  };
}
function Tn(a) {
  return us(a);
}
function Ea(a) {
  return us(a);
}
function Nm(a) {
  return Un(a);
}
function wn(a = {}, e = "standard") {
  return Tc(a, e);
}
function vn(a = {}) {
  return tm(a);
}
function Rm(a = null) {
  return nm(a);
}
function Aa(a = "id") {
  var t, i;
  const e = (i = (t = globalThis.foundry) == null ? void 0 : t.utils) == null ? void 0 : i.randomID;
  return typeof e == "function" ? e() : `${a}-${Math.random().toString(36).slice(2, 10)}`;
}
function _c(a) {
  const e = {};
  return Object.values(a).forEach((t) => {
    [t.key, ...t.aliases ?? []].forEach((i) => {
      e[qa(i)] = t.key;
    });
  }), Object.freeze(e);
}
function qa(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function Ma(a) {
  return Array.isArray(a) ? a : a && typeof a == "object" ? Object.values(a) : a == null || a === "" ? [] : [a];
}
function Lc(a, e) {
  return Ma(a).map((t) => Im(t, e)).filter(Boolean);
}
function Im(a, e) {
  if (typeof a == "string" || typeof a == "number") {
    const i = e[qa(a)];
    return i ? { id: Aa("trait"), key: i, rating: 1 } : null;
  }
  if (!a || typeof a != "object") return null;
  const t = e[qa(a.key ?? a.value ?? a.name)];
  return t ? {
    id: String(a.id ?? "").trim() || Aa("trait"),
    key: t,
    rating: Math.max(0, Number(a.rating ?? 0) || 0)
  } : null;
}
function $i(a) {
  return Lc(a, Rc);
}
function oi(a) {
  return Lc(a, Ic);
}
function jn(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function Dm(a = {}, e = {}) {
  const t = jn(a), i = jn(e);
  return {
    close: t.close + i.close,
    near: t.near + i.near,
    far: t.far + i.far,
    extreme: t.extreme + i.extreme
  };
}
function Om(a, e) {
  var t;
  return ((t = e[a]) == null ? void 0 : t.label) ?? a;
}
function xc(a, e) {
  var n;
  const t = Om(a == null ? void 0 : a.key, e), i = Math.max(0, Number((a == null ? void 0 : a.rating) ?? 0) || 0);
  return (n = e[a == null ? void 0 : a.key]) != null && n.rated && i > 0 ? `${t} ${i}` : t;
}
function $c(a, e) {
  return Ma(a).map((t) => {
    const i = t == null ? void 0 : t.key, n = e[i];
    return n != null && n.resolve ? {
      entry: t,
      effect: n.resolve(t),
      label: xc(t, e)
    } : null;
  }).filter(Boolean);
}
function _m(a, e) {
  const t = { ...a ?? {} };
  return Object.entries(e ?? {}).forEach(([i, n]) => {
    t[i] = (Number(t[i] ?? 0) || 0) + (Number(n ?? 0) || 0);
  }), t;
}
function Lm(a = []) {
  const e = {}, t = /* @__PURE__ */ new Set();
  for (const i of a.filter(Boolean)) {
    i.accuracyMod !== void 0 && (e.accuracyMod = (Number(e.accuracyMod ?? 0) || 0) + (Number(i.accuracyMod ?? 0) || 0)), i.ap !== void 0 && (e.ap = (Number(e.ap ?? 0) || 0) + (Number(i.ap ?? 0) || 0)), i.addHeat !== void 0 && (e.addHeat = (Number(e.addHeat ?? 0) || 0) + (Number(i.addHeat ?? 0) || 0)), i.bonusVsArmorTag && (e.bonusVsArmorTag = _m(e.bonusVsArmorTag, i.bonusVsArmorTag));
    for (const n of i.flags ?? []) {
      const s = String(n ?? "").trim();
      s && t.add(s);
    }
  }
  return t.size > 0 && (e.flags = Array.from(t)), e;
}
function xm(a = [], e = []) {
  const t = Array.isArray(a) || typeof a == "string" ? { traits: a, standardTraits: e } : a ?? {}, i = Ea(t.traits), n = $i(t.standardTraits), s = $c(n, lr), r = i.map((l) => {
    var u;
    const o = Rc[qa(l)];
    if (!o) return null;
    const c = (u = lr[o]) == null ? void 0 : u.resolve;
    return typeof c == "function" ? c({ key: o, rating: 1 }) : null;
  });
  return Lm([
    ...s.map((l) => l.effect),
    ...r
  ]);
}
function $m(a) {
  const e = a ?? {}, t = no(), i = Ac({
    traits: e.traits,
    keywords: e.keywords,
    report: t,
    path: "ammo.types[].traits"
  });
  return {
    id: String(e.id ?? "").trim() || Aa("ammo"),
    name: String(e.name ?? "").trim() || "Ammo",
    damageType: Dc(e.damageType),
    apMod: Number(e.apMod ?? e.ap ?? 0) || 0,
    attackRatingBandMod: jn(e.attackRatingBandMod ?? e.attackRatingBand),
    traits: i.traits,
    keywords: i.keywords,
    migration: t
  };
}
function Bm(a) {
  var o;
  const e = a ?? {}, t = Math.max(0, Number(e.max ?? 0) || 0), i = Number(e.current), n = Number.isFinite(i) ? Math.max(0, Math.min(i, t > 0 ? t : i)) : Math.max(0, t), s = Ma(e.types).map($m), r = String(e.activeTypeId ?? "").trim(), l = s.some((c) => c.id === r) ? r : ((o = s[0]) == null ? void 0 : o.id) ?? "";
  return {
    current: n,
    max: t,
    consumePerAttack: Math.max(1, Number(e.consumePerAttack ?? 1) || 1),
    activeTypeId: l,
    types: s
  };
}
function zm(a, e = "untracked") {
  const t = String(a ?? "").trim();
  return t ? t === "linked" ? "internal" : t === "perAttack" ? e : ["untracked", "internal", "actorResource", "itemRef"].includes(t) ? t : e : e;
}
function cr(a = {}) {
  const e = a ?? {};
  return {
    amount: Math.max(1, Number(e.amount ?? e.consumePerUse ?? e.consumePerAttack ?? 1) || 1),
    sourceId: String(e.sourceId ?? "").trim()
  };
}
function qo(a = {}) {
  const e = a ?? {};
  return {
    damageType: Dc(e.damageType),
    ap: Number(e.ap ?? e.apMod ?? 0) || 0,
    attackRatingBand: jn(e.attackRatingBand ?? e.attackRatingBandMod)
  };
}
function ur(a = {}) {
  return Tc(a, "standard");
}
function Fm(a) {
  return String(a ?? "").trim().toLowerCase() === "unloaded";
}
function lt(a, { report: e = null, path: t = "system.payloads[]" } = {}) {
  var o;
  const i = a ?? {}, n = String(i.id ?? "").trim() || Aa("payload"), s = Ac({
    traits: i.traits ?? ((o = i.modifies) == null ? void 0 : o.traits),
    keywords: i.keywords,
    report: e,
    path: `${t}.traits`
  }), r = us(i.compatibleWith ?? i.compatible), l = Rm(i.template);
  return Fm(n) ? {
    id: "unloaded",
    label: "Unloaded",
    compatibleWith: [],
    modifies: qo({}),
    traits: [],
    keywords: [],
    template: null,
    areaEffect: fi({ kind: "discrete" }),
    resolution: ur({ resolverKey: "standard" }),
    consumption: cr({ amount: 1, sourceId: "" })
  } : {
    id: n,
    label: String(i.label ?? i.name ?? "").trim() || "Payload",
    compatibleWith: r,
    modifies: qo(i.modifies ?? i),
    traits: s.traits,
    keywords: s.keywords,
    template: l,
    areaEffect: fi(i.areaEffect ?? {}),
    resolution: ur(i.resolution ?? i),
    consumption: cr(i.consumption ?? i)
  };
}
function Jt(a) {
  var l, o, c, u, d, m;
  const e = a ?? {}, t = zm(
    e.kind || e.type || ((l = e.link) != null && l.actorPath || e.actorPath ? "actorResource" : "") || ((o = e.link) != null && o.itemId || e.itemId || (c = e.link) != null && c.itemPath || e.itemPath ? "itemRef" : "") || (e.tracking || e.current !== void 0 || e.max !== void 0 ? "internal" : "") || "untracked",
    "untracked"
  ), i = e.tracking ?? e, n = Math.max(0, Number(i.max ?? 0) || 0), s = Number(i.current), r = Number.isFinite(s) ? Math.max(0, Math.min(s, n > 0 ? n : s)) : Math.max(0, n);
  return {
    id: String(e.id ?? "").trim() || Aa("source"),
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
function Bc({ report: a = null, path: e = "system.payloads" } = {}) {
  return {
    payloads: [lt({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: a, path: `${e}[0]` })],
    selectedPayloadId: "unloaded",
    consumptionSources: [Jt({
      id: "untracked",
      label: "Untracked",
      kind: "untracked"
    })]
  };
}
function zc(a) {
  return String(a ?? "").trim().toLowerCase() === "melee";
}
function dr(a = [], { report: e = null, path: t = "system.payloads" } = {}) {
  const i = Ma(a).map((n, s) => lt(n, { report: e, path: `${t}[${s}]` })).filter(Boolean);
  return i.some((n) => n.id === "unloaded") ? i : [
    lt({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: e, path: `${t}[0]` }),
    ...i
  ];
}
function ds(a = {}, { report: e = null, path: t = "system.payloads" } = {}) {
  var d;
  const i = Bm(a), n = Math.max(1, Number(i.consumePerAttack ?? 1) || 1), s = i.max > 0, r = s ? "internal-magazine" : "untracked", l = [Jt(s ? {
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
  })], o = i.types.length ? i.types.map((m, f) => lt({
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
  }, { report: e, path: `${t}[${f}]` })) : [lt({
    id: "unloaded",
    label: "Unloaded",
    resolution: { resolverKey: "standard" },
    consumption: {
      amount: n,
      sourceId: s ? r : ""
    }
  }, { report: e, path: `${t}[0]` })], c = dr(o, { report: e, path: t }), u = c.some((m) => m.id === i.activeTypeId) ? i.activeTypeId : ((d = c[0]) == null ? void 0 : d.id) ?? "unloaded";
  return {
    payloads: c,
    selectedPayloadId: u,
    consumptionSources: l
  };
}
function li(a, { legacyAmmo: e = null, category: t = "", report: i = null, path: n = "system.payloads" } = {}) {
  if (zc(t)) return [];
  const s = Ma(a).map((r, l) => lt(r, { report: i, path: `${n}[${l}]` })).filter(Boolean);
  return s.length > 0 ? dr(s, { report: i, path: n }) : e ? dr(ds(e, { report: i, path: n }).payloads, { report: i, path: n }) : Bc({ report: i, path: n }).payloads;
}
function _a(a, { legacyAmmo: e = null } = {}) {
  const t = Ma(a).map(Jt).filter(Boolean);
  return t.length > 0 ? t : e ? ds(e).consumptionSources : Bc().consumptionSources;
}
function sa(a, e = [], { legacyAmmo: t = null, category: i = "" } = {}) {
  var r;
  if (zc(i)) return "";
  const n = li(e, { legacyAmmo: t, category: i }), s = String(a ?? "").trim();
  if (n.some((l) => l.id === s)) return s;
  if (t) {
    const l = ds(t).selectedPayloadId;
    if (n.some((o) => o.id === l)) return l;
  }
  return ((r = n[0]) == null ? void 0 : r.id) ?? "unloaded";
}
function Ko({ root: a = null, path: e = "", fallback: t = {} } = {}) {
  const i = String(e ?? "").trim();
  if (!a || !i)
    return {
      current: Math.max(0, Number(t.current ?? 0) || 0),
      max: Math.max(0, Number(t.max ?? 0) || 0),
      currentPath: i
    };
  const n = foundry.utils.getProperty(a, i);
  if (n && typeof n == "object") {
    const l = Math.max(0, Number(n.max ?? t.max ?? 0) || 0), o = Number(n.current);
    return {
      current: Number.isFinite(o) ? Math.max(0, Math.min(o, l > 0 ? l : o)) : Math.max(0, l),
      max: l,
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
function Fc({ source: a = null, actor: e = null } = {}) {
  var i, n, s, r, l, o, c;
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
    const u = Math.max(0, Number(((r = a.tracking) == null ? void 0 : r.current) ?? 0) || 0), d = Math.max(0, Number(((l = a.tracking) == null ? void 0 : l.max) ?? 0) || 0);
    return {
      ...t,
      isTracked: d > 0 || u > 0,
      current: u,
      max: d,
      currentPath: ""
    };
  }
  if (a.kind === "actorResource") {
    const u = Ko({
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
    const u = ((c = (o = e == null ? void 0 : e.items) == null ? void 0 : o.get) == null ? void 0 : c.call(o, t.itemId)) ?? null, d = Ko({
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
function Um({ source: a = null, actor: e = null } = {}) {
  return Fc({ source: a, actor: e });
}
function mr({
  payloads: a = [],
  selectedPayloadId: e = "",
  consumptionSources: t = [],
  actor: i = null,
  payloadId: n = "",
  category: s = ""
} = {}) {
  const r = li(a, { category: s }), l = _a(t), o = sa(n || e, r, { category: s }), c = r.find((f) => f.id === o) ?? r[0] ?? null, u = (c == null ? void 0 : c.consumption) ?? cr(), d = u.sourceId ? l.find((f) => f.id === u.sourceId) ?? null : l.find((f) => f.kind === "untracked") ?? Jt({
    id: "untracked",
    label: "Untracked",
    kind: "untracked"
  }), m = Fc({ source: d, actor: i });
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
function Hm({
  damageType: a = "penetrating",
  ap: e = 0,
  attackRatingBand: t = {},
  traits: i = [],
  keywords: n = [],
  standardTraits: s = [],
  resolution: r = {},
  fireModes: l = {},
  payloads: o = [],
  selectedPayloadId: c = "",
  consumptionSources: u = [],
  payloadId: d = "",
  actor: m = null,
  ammo: f = null,
  ammoTypeId: p = "",
  category: h = ""
} = {}) {
  var G, X, oe, Se, me;
  const g = mr({
    payloads: o != null && o.length ? o : void 0,
    selectedPayloadId: c || p,
    consumptionSources: u,
    actor: m,
    payloadId: d || p,
    category: h
  }), b = ((!o || o.length === 0) && f ? mr({
    ...ds(f),
    actor: m,
    payloadId: d || p,
    category: h
  }) : null) ?? g, S = b.activePayload, v = Sc({
    traits: i,
    keywords: n
  }), M = Array.from(/* @__PURE__ */ new Set([
    ...v.traits,
    ...Ea(S == null ? void 0 : S.traits)
  ])), N = Un([
    ...v.keywords,
    ...Un(S == null ? void 0 : S.keywords)
  ]), P = wn(r, "standard"), U = (G = S == null ? void 0 : S.resolution) != null && G.resolverKey ? ur(S.resolution) : P, K = vn(l), Y = no(), W = sm({
    weapon: {
      traits: v.traits,
      resolution: P
    },
    payload: S,
    effectiveTraits: M,
    effectiveResolution: U,
    report: Y
  }), j = $i(s), L = xm({
    traits: [],
    standardTraits: j
  }), B = {
    ...b.sourceState
  };
  return delete B.sourceItem, {
    damageType: ((X = S == null ? void 0 : S.modifies) == null ? void 0 : X.damageType) || Gt(a),
    ap: (Number(e ?? 0) || 0) + (Number(((oe = S == null ? void 0 : S.modifies) == null ? void 0 : oe.ap) ?? 0) || 0),
    attackRatingBand: Dm(
      t,
      ((Se = S == null ? void 0 : S.modifies) == null ? void 0 : Se.attackRatingBand) ?? {}
    ),
    effects: L,
    traits: M,
    keywords: N,
    standardTraits: j,
    payloadLabel: b.payloadLabel,
    payload: S ? foundry.utils.deepClone(S) : null,
    payloadState: {
      payloads: b.payloads.map((C) => foundry.utils.deepClone(C)),
      activePayloadId: b.activePayloadId,
      payloadLabel: b.payloadLabel,
      sourceId: ((me = b.source) == null ? void 0 : me.id) ?? "",
      sourceLabel: b.sourceState.label ?? "",
      sourceKind: b.sourceState.kind ?? "untracked",
      isTracked: b.sourceState.isTracked,
      current: b.sourceState.current,
      max: b.sourceState.max,
      consumePerUse: b.sourceState.consumePerUse
    },
    source: b.source ? foundry.utils.deepClone(b.source) : null,
    sourceState: foundry.utils.deepClone(B),
    template: W.template ? foundry.utils.deepClone(W.template) : null,
    areaEffect: fi((S == null ? void 0 : S.areaEffect) ?? {}),
    resolution: foundry.utils.deepClone(U),
    resolverKey: String((U == null ? void 0 : U.resolverKey) ?? "standard").trim() || "standard",
    fireModes: foundry.utils.deepClone(K),
    capabilityReport: {
      ...Y,
      liveCapabilities: W.liveCapabilities,
      isTemplated: W.isTemplated,
      template: W.template ? foundry.utils.deepClone(W.template) : null,
      resolverKey: String((U == null ? void 0 : U.resolverKey) ?? "standard").trim() || "standard"
    },
    ammoLabel: b.payloadLabel,
    ammoType: S ? foundry.utils.deepClone(S) : null,
    ammoState: {
      current: B.current,
      max: B.max,
      consumePerAttack: B.consumePerUse,
      activeTypeId: b.activePayloadId,
      types: b.payloads.map((C) => {
        var V;
        return {
          id: C.id,
          name: C.label,
          damageType: ((V = C.modifies) == null ? void 0 : V.damageType) ?? "",
          traits: C.traits ?? [],
          keywords: C.keywords ?? []
        };
      }),
      isTracked: B.isTracked,
      ammoLabel: b.payloadLabel
    }
  };
}
function Uc(a = {}, e = {}) {
  const t = ti(a), i = ti(e);
  return {
    penetrating: t.penetrating + i.penetrating,
    concussive: t.concussive + i.concussive,
    energy: t.energy + i.energy,
    thermal: t.thermal + i.thermal,
    electrical: t.electrical + i.electrical
  };
}
function _s({ standardTraits: a = [], traits: e = [], traitState: t = {} } = {}) {
  var m, f;
  const i = oi(a), s = Ea(e).map((p) => {
    const h = Ic[qa(p)];
    return h ? { id: Aa("trait"), key: h, rating: h === "reinforced" ? 1 : 0 } : null;
  }).filter(Boolean), r = $c(
    [...i, ...s],
    cs
  ), l = r.reduce((p, h) => {
    var g;
    return Uc(p, ((g = h.effect) == null ? void 0 : g.mitigationByType) ?? {});
  }, ti({})), o = r.reduce(
    (p, h) => {
      var g;
      return p + Math.max(0, Number(((g = h.effect) == null ? void 0 : g.reinforced) ?? 0) || 0);
    },
    0
  ), c = Number((m = t == null ? void 0 : t.reinforced) == null ? void 0 : m.current), u = Number((f = t == null ? void 0 : t.reinforced) == null ? void 0 : f.max), d = Number.isFinite(c) ? c : Number.isFinite(u) ? u : o;
  return {
    mitigationByType: l,
    reinforcedMax: o,
    traitState: {
      reinforced: {
        current: Math.min(o, Math.max(0, d || 0)),
        max: o
      }
    },
    labels: r.map((p) => p.label),
    standardTraits: i
  };
}
function Wm({ traits: a = [], standardTraits: e = [] } = {}) {
  return [
    ...Ea(a),
    ...oi(e).map((i) => xc(i, cs))
  ].filter(Boolean);
}
function lo(a) {
  const e = Math.max(0, Number(a ?? 0) || 0);
  return e <= 0 ? 0 : Math.ceil(e / 4);
}
function jm({
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
  const n = Gt(t, "penetrating"), s = ti(e), r = lo(i), l = Number(s[n] ?? 0) || 0;
  return {
    currentArmorRating: i,
    baseMitigation: r,
    typeMitigationMod: l,
    totalMitigation: r + l,
    isDestroyed: !1
  };
}
function Gm({ damageIncoming: a = 0, armorTags: e = [], effects: t = {} } = {}) {
  const i = new Set(Tn(e));
  let n = Number(a ?? 0) || 0;
  const s = [];
  return Object.entries((t == null ? void 0 : t.bonusVsArmorTag) ?? {}).forEach(([r, l]) => {
    if (!i.has(r)) return;
    const o = Number(l ?? 0) || 0;
    o && (n *= 1 + o, s.push({ tag: r, bonus: o }));
  }), {
    damageIncoming: n,
    applied: s
  };
}
class Xi {
  static checkSufficient(e, t, i) {
    if (t > i) {
      const n = ve(w.common.errors.insufficient, {
        resource: e,
        required: t,
        available: i
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkOutOfRange(e, t, i, n) {
    if (t < i || t > n) {
      const s = ve(w.common.errors.outOfRange, {
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
      const e = w.common.errors.onlyGM;
      throw ui.notifications.error(e), e;
    }
  }
  static checkItemType(e, t) {
    if (e.type != t) {
      const i = ve(w.common.errors.expectedType, {
        type: e.type ? w.itemType.singular[e.type] : e.type,
        expectedType: t
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkActorCanReceiveDamage(e, t, i) {
    if (!t) {
      const n = ve(w.common.errors.actorCannotReceiveDamage, {
        actor: i.name,
        damageType: Oc(e) ? qt(e) : w.actor.monitors[e] ?? w.mwd.weaponDamageType[e] ?? w.mwd.personalDamageType[e] ?? e
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkWeaponDefense(e, t) {
    var n;
    const i = e.getDefense();
    if ((((n = e.isPersonalWeapon) == null ? void 0 : n.call(e)) ?? e.type === A.itemType.personalWeapon) && !i) {
      const s = ve(w.common.errors.noDefenseOnWeapon, { actor: t.name, weapon: e.name });
      throw ui.notifications.error(s), s;
    }
  }
  static checkTargetsCount(e, t, i) {
    if (e > 0 && t.length > e) {
      const n = ve(w.common.errors.maxTargetsExceedeed, {
        weapon: this.name,
        area: w.area[i],
        count: t.length,
        max: e
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkActorDefenseAction(e, t, i) {
    if (!e) {
      const n = ve(w.common.errors.actorDoesNotHaveDefense, {
        actor: t.name,
        defense: i.labelkey,
        actorType: w.actorType[t.type]
      });
      throw ui.notifications.error(n), n;
    }
  }
}
function Yt(a, e, t, i, n, s = (r) => !0) {
  return {
    code: a,
    labelkey: w.attributeAction[a],
    label: w.attributeAction[a],
    attributeFunction1: e ?? ((r) => {
    }),
    attributeFunction2: t ?? ((r) => {
    }),
    icon: i,
    actorTypes: n,
    condition: s
  };
}
function un(a, e) {
  return {
    code: a,
    labelkey: w.defense[a],
    label: w.defense[a],
    actionCode: e
  };
}
const Le = A.actorAttributes, xe = A.actorTypes, rt = Je.actions, dn = Je.defenses, Ls = [
  Yt(rt.defense, (a) => Le.reflexes, (a) => Le.intelligence, q.fontAwesome("fas fa-shield-alt"), [xe.character, xe.npc]),
  Yt(rt.defense, (a) => Le.handling, (a) => Le.chassis, q.fontAwesome("fas fa-tachometer-alt"), [xe.vehicle, xe.battlemech]),
  Yt(rt.resistTorture, (a) => Le.strength, (a) => Le.willpower, q.fontAwesome("fas fa-angry"), [xe.character, xe.npc]),
  Yt(rt.perception, (a) => Le.logic, (a) => Le.willpower, q.fontAwesome("fas fa-eye"), [xe.character, xe.npc]),
  Yt(rt.perception, (a) => Le.system, (a) => Le.handling, q.fontAwesome("fas fa-video"), [xe.vehicle, xe.battlemech]),
  Yt(rt.composure, (a) => Le.charisma, (a) => Le.willpower, q.fontAwesome("fas fa-meh"), [xe.character, xe.npc]),
  Yt(rt.judgeIntentions, (a) => Le.charisma, (a) => Le.charisma, q.fontAwesome("fas fa-theater-masks"), [xe.character, xe.npc]),
  Yt(rt.memory, (a) => Le.logic, (a) => Le.logic, q.fontAwesome("fas fa-brain"), [xe.character, xe.npc]),
  Yt(rt.catch, (a) => Le.reflexes, (a) => Le.reflexes, q.fontAwesome("fas fa-baseball-ball"), [xe.character, xe.npc]),
  Yt(rt.lift, (a) => Le.strength, (a) => Le.strength, q.fontAwesome("fas fa-dumbbell"), [xe.character, xe.npc])
], mn = [
  un(dn.physicalDefense, rt.defense),
  un(dn.physicalResistance, rt.resistTorture),
  un(dn.socialDefense, rt.composure),
  un(dn.mentalResistance, rt.perception)
];
class Ne {
  static init() {
    Handlebars.registerHelper("fixedDefenseCode", (e) => Ne.fixedDefenseCode(e));
  }
  static all(e = void 0) {
    return e ? Ls.filter(e) : Ls;
  }
  static getActorActions(e) {
    return Ls.filter((t) => t.actorTypes.includes(e.type) && t.condition(e));
  }
  static fixedDefenseCode(e) {
    return Je.fixedDefenseCode[e] ?? e;
  }
  static getActorDefenses(e) {
    return mn.map((t) => {
      const i = Ne.getActorAction(e, t.actionCode);
      return Ne._convertToDefense(i, t);
    }).filter((t) => t == null ? void 0 : t.code);
  }
  static getDefenseAttributeAction(e) {
    var t;
    return (t = mn.find((i) => i.code == e)) == null ? void 0 : t.actionCode;
  }
  static getActorAction(e, t) {
    return Ne.getActorActions(e).find((i) => i.code == t);
  }
  static getActorDefense(e, t) {
    t = Ne.fixedDefenseCode(t);
    const i = mn.find((s) => s.code == t), n = Ne.getActorAction(e, i.actionCode);
    return Xi.checkActorDefenseAction(n, e, i), Ne._convertToDefense(n, i);
  }
  static _convertToDefense(e, t) {
    return e ? foundry.utils.mergeObject(
      t,
      e ?? {},
      { overwrite: !1, inplace: !1 }
    ) : void 0;
  }
  static getDefenses() {
    return mn;
  }
  static prepareShortcut(e, t) {
    const i = Ne.getActorActions(e).find((n) => n.code == t);
    if (i)
      return {
        icon: i.icon,
        label: i.labelkey,
        callback: (n) => n.actor.rollAttributeAction(t)
      };
  }
}
class fr {
  constructor() {
    this.remoteCalls = {}, game.socket.on(ar, async (e) => this.onSocketMessage(e));
  }
  static async register(e, t) {
    game.system.anarchy.remoteCall._register(e, t);
  }
  async _register(e, t) {
    if (this.remoteCalls[e])
      throw `RemoteCall msg ${e} is already registered`;
    foundry.utils.mergeObject(t, {
      callback: (i) => {
        console.log(be + "RemoteCall [", e, "] (", i, ")");
      },
      condition: (i) => !0,
      multiple: !1
      /* true if multiple users should handle the message */
    }, { overwrite: !1 }), this.remoteCalls[e] = t, console.log(be + "RemoteCall registered", e);
  }
  static call(e, t) {
    return game.system.anarchy.remoteCall._remoteCall(e, t);
  }
  _remoteCall(e, t) {
    const i = this.remoteCalls[e];
    return !i || i.condition(game.user) || !i.multiple && Ut.isUniqueConnectedGM() ? !1 : (game.socket.emit(ar, { msg: e, data: t }), !0);
  }
  async onSocketMessage(e) {
    const t = this.remoteCalls[e.msg];
    if (t) {
      const i = t.condition(game.user), n = t.multiple, s = Ut.isUniqueConnectedGM();
      i && (n || s) ? t.callback(e.data) : console.log(be + "RemoteCall.onSocketMessage(", e, ") ignored :", i, n, s);
    } else
      console.log(be + "RemoteCall: No callback registered for", e);
  }
}
const Vo = "Users.blindMessageToGM";
class Ut {
  static init() {
    fr.register(Vo, {
      callback: (e) => Ut.blindMessageToGM(e),
      condition: (e) => e.isGM
    });
  }
  static blindMessageToGM(e) {
    fr.call(Vo, e) || ChatMessage.create({
      user: e.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      blind: !0,
      content: ve(w.chat.blindMessageToGM, {
        user: game.user.name,
        message: e.content
      })
    });
  }
  static getUsers(e = (t) => !0) {
    return (game.version ? game.users : game.users.entities).filter(e);
  }
  static firstConnectedGM() {
    return Ut.getUsers((e) => e.isGM && e.active).sort(se.ascending((e) => e.id)).at(0) ?? {};
  }
  /**
   * @returns true pour un seul utilisateur: le premier GM connecté par ordre d'id
   */
  static isUniqueConnectedGM(e = game.user) {
    return e.id == Ut.firstConnectedGM().id;
  }
  static firstResponsible(e) {
    if (!(e != null && e.testUserPermission))
      return;
    const t = Ut.getUsers(
      (i) => i.active && e.testUserPermission(i, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER)
    ).sort(se.ascending((i) => i.id)).at(0);
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
const ta = w.actor.monitors, si = w.actor.counters, Hc = {
  armor: {
    path: "system.monitors.armor.value",
    monitor: (a) => a.system.monitors.armor,
    iconChecked: q.fontAwesome("fas fa-shield-slash"),
    iconUnchecked: q.fontAwesome("fas fa-shield-alt"),
    iconHit: q.fontAwesome("fas fa-bahai"),
    resource: ta.armor
  },
  fatigue: {
    path: "system.monitors.fatigue.value",
    monitor: (a) => a.system.monitors.fatigue,
    iconChecked: q.fontAwesome("fas fa-grimace"),
    iconUnchecked: q.fontAwesome("far fa-smile"),
    iconHit: q.fontAwesome("fas fa-bahai"),
    resource: ta.fatigue,
    overflow: (a) => A.monitors.physical,
    useArmor: !0
  },
  physical: {
    path: "system.monitors.physical.value",
    monitor: (a) => a.system.monitors.physical,
    iconChecked: q.fontAwesome("fas fa-heartbeat"),
    iconUnchecked: q.fontAwesome("far fa-heart"),
    iconHit: q.fontAwesome("fas fa-bahai"),
    resource: ta.physical,
    useArmor: !0
  },
  structure: {
    path: "system.monitors.structure.value",
    monitor: (a) => a.system.monitors.structure,
    iconChecked: q.fontAwesome("fas fa-car-crash"),
    iconUnchecked: q.fontAwesome("fas fa-car-alt"),
    iconHit: q.fontAwesome("fas fa-bahai"),
    resource: ta.structure
  },
  heat: {
    path: "system.monitors.heat.value",
    monitor: (a) => a.system.monitors.heat,
    iconChecked: q.fontAwesome("fas fa-fire"),
    iconUnchecked: q.fontAwesome("far fa-sun"),
    iconHit: q.fontAwesome("fas fa-temperature-high"),
    resource: ta.heat
  },
  criticals: {
    path: "system.hybrid.criticals.value",
    monitor: (a) => {
      var e;
      return ((e = a.system.hybrid) == null ? void 0 : e.criticals) ?? { value: 0, max: 0 };
    },
    iconChecked: q.fontAwesome("fas fa-bolt"),
    iconUnchecked: q.fontAwesome("far fa-dot-circle"),
    iconHit: q.fontAwesome("fas fa-exclamation-triangle"),
    resource: ta.structure
  },
  anarchy: {
    path: "system.counters.anarchy.value",
    monitor: (a) => ({
      value: a.system.counters.anarchy.value,
      max: 6
    }),
    iconChecked: q.iconPath(`${Oa}/anarchy-point.webp`, "checkbar-img"),
    iconUnchecked: q.iconPath(`${Oa}/anarchy-point-off.webp`, "checkbar-img"),
    resource: si.anarchy
  },
  plot: {
    path: "system.counters.anarchy.value",
    monitor: (a) => {
      const e = a.system.counters.anarchy.value;
      return { value: e, max: e + 1 };
    },
    iconChecked: q.iconPath(`${Oa}/danger-point.webp`, "checkbar-img"),
    iconUnchecked: q.iconPath(`${Oa}/danger-point-off.webp`, "checkbar-img"),
    resource: si.anarchy
  },
  sceneAnarchy: {
    path: "system.counters.edgePools.chaos.value",
    monitor: (a) => {
      const e = a.getEdgePoolValue(A.counters.edgePools.chaos), t = a.getAttributeValue(A.actorAttributes.edge);
      return { value: e, max: t };
    },
    iconChecked: q.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    iconUnchecked: q.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    resource: si.edgePools.chaos
  },
  grit: {
    path: "system.counters.edgePools.grit.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.grit), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: q.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    iconUnchecked: q.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    resource: si.edgePools.grit
  },
  insight: {
    path: "system.counters.edgePools.insight.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.insight), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: q.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    iconUnchecked: q.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    resource: si.edgePools.insight
  },
  legend: {
    path: "system.counters.edgePools.legend.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.legend), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: q.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    iconUnchecked: q.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    resource: si.edgePools.legend
  },
  credibility: {
    path: "system.counters.edgePools.credibility.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.credibility), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: q.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    iconUnchecked: q.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    resource: si.edgePools.credibility
  },
  rumor: {
    path: "system.counters.edgePools.rumor.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.rumor), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: q.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    iconUnchecked: q.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    resource: si.edgePools.rumor
  }
}, Lt = foundry.utils.mergeObject(Hc, {});
class F {
  static init() {
    Handlebars.registerHelper("iconCheckbar", F.iconCheckbar), Handlebars.registerHelper("iconCheckbarHit", F.iconHit);
  }
  static hackCheckbars(e) {
    if (e) {
      const t = foundry.utils.mergeObject(Hc, {});
      foundry.utils.mergeObject(t, e, { recursive: !0 }), foundry.utils.mergeObject(Lt, t, { overwrite: !0 });
    }
  }
  static iconCheckbar(e, t) {
    return t ? F.iconChecked(e) : F.iconUnchecked(e);
  }
  static iconChecked(e) {
    var t;
    return (t = Lt[e]) == null ? void 0 : t.iconChecked;
  }
  static iconUnchecked(e) {
    var t;
    return (t = Lt[e]) == null ? void 0 : t.iconUnchecked;
  }
  static iconHit(e) {
    var t, i;
    return ((t = Lt[e]) == null ? void 0 : t.iconHit) ?? ((i = Lt[e]) == null ? void 0 : i.iconChecked);
  }
  static useArmor(e) {
    var t;
    return (t = Lt[e]) == null ? void 0 : t.useArmor;
  }
  static max(e, t) {
    var n;
    const i = (n = Lt[t]) == null ? void 0 : n.monitor(e);
    return ((i == null ? void 0 : i.max) ?? 0) + ((i == null ? void 0 : i.maxBonus) ?? 0);
  }
  static value(e, t) {
    var n;
    const i = (n = Lt[t]) == null ? void 0 : n.monitor(e);
    return (i == null ? void 0 : i.value) ?? 0;
  }
  static resistance(e, t, i = void 0) {
    return F.resistanceDetail(e, t, i).value;
  }
  static resistanceDetail(e, t, i = void 0) {
    var o, c;
    const n = (o = Lt[t]) == null ? void 0 : o.monitor(e), s = F._resolveResistance(n == null ? void 0 : n.resistance, i), r = F._resolveResistance(n == null ? void 0 : n.resistanceBonus, i), l = i === void 0 ? 0 : Number(((c = n == null ? void 0 : n.resistanceBonusByType) == null ? void 0 : c[i]) ?? 0);
    return {
      value: s.value + r.value + l,
      damageType: i,
      source: s.source,
      bonusSource: r.source,
      bonusByType: l,
      usedType: s.source === "type" || r.source === "type" || l !== 0
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
    await F.setCounter(e, t, F.newValue(i, n), s, r);
  }
  static async addCounter(e, t, i, n = void 0) {
    if (i != 0) {
      const s = F.getCounterValue(e, t, n) ?? 0;
      await F.setCounter(e, t, s + i, n);
    }
  }
  static async setCounter(e, t, i, n = void 0, s = void 0) {
    switch (t) {
      case A.monitors.anarchy:
        return await F.setAnarchy(e, i);
      case A.monitors.sceneAnarchy:
        return await F.setSceneAnarchy(e, i);
    }
    return await F.setCheckbar(e, t, i);
  }
  static getCounterValue(e, t, i) {
    switch (t) {
      case A.monitors.anarchy:
        return F.getAnarchy(e, t);
    }
    return F.value(e, t);
  }
  static async setCheckbar(e, t, i) {
    if (i == F.getCounterValue(e, t))
      return;
    const n = Lt[t];
    if (n.path) {
      const s = F.max(e, t);
      if (s <= 0)
        return;
      await F._manageOverflow(n, e, t, i, s), i = Math.min(i, s), Xi.checkOutOfRange(n.resource, i, 0, s), await e.setCheckbarValue(n.path, i);
    }
  }
  static async _manageOverflow(e, t, i, n, s) {
    if (n > s) {
      const r = e.overflow ? e.overflow(t) : void 0, l = e.recomputeOverflow ? e.recomputeOverflow(n - s) : n - s;
      r && l > 0 && (F._notifyOverflow(t, i, l, r), await F.addCounter(t, r, l));
    }
  }
  static _notifyOverflow(e, t, i, n) {
    const s = ve(w.actor.monitors.overflow, {
      actor: e.name,
      monitor: w.actor.monitors[t],
      overflow: i,
      overflowMonitor: w.actor.monitors[n]
    });
    ui.notifications.warn(s);
  }
  static async _manageFatigueOverflow(e, t, i) {
    await F.addCounter(e, A.monitors.physical, t - i);
  }
  static async setAnarchy(e, t) {
    if (e.hasOwnAnarchy()) {
      if (e.hasGMAnarchy()) {
        await game.system.anarchy.gmAnarchy.setAnarchy(t), e.render();
        return;
      }
      await F._setAnarchyMonitor(e, A.monitors.anarchy, t);
    }
  }
  static async setSceneAnarchy(e, t) {
    await F._setAnarchyMonitor(e, A.monitors.sceneAnarchy, t);
  }
  static async _setAnarchyMonitor(e, t, i) {
    const n = F.value(e, t);
    await F.setCheckbar(e, t, i), game.user.isGM || F.notifyAnarchyChange(e, t, n, i);
  }
  static getAnarchy(e, t) {
    return !game.user.isGM && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) || t == si.anarchy && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) ? 0 : F.value(e, t);
  }
  static notifyAnarchyChange(e, t, i, n) {
    Ut.blindMessageToGM({
      from: game.user.id,
      content: ve(
        w.gmManager.playerChangedAnarchy,
        {
          user: game.user.name,
          actor: e.name,
          monitor: w.actor.counters[t],
          from: i,
          to: n
        }
      )
    });
  }
}
const { loadTemplates: qm, renderTemplate: Km } = foundry.applications.handlebars, Yo = {
  highlighted: ["far fa-times-circle", "fas fa-dice-one", "fas fa-dice-two", "fas fa-dice-three", "fas fa-dice-four", "fas fa-dice-five", "fas fa-dice-six"],
  dimmed: ["far fa-times-circle", "far fa-dice-one", "far fa-dice-two", "far fa-dice-three", "far fa-dice-four", "far fa-dice-five", "far fa-dice-six"]
};
class ci {
  static init() {
    Hooks.once("ready", async () => await this.onReady()), Handlebars.registerHelper("dice-cursor-array", (e, t) => ci.array(e ?? 0, t ?? 5)), Handlebars.registerHelper("dice-cursor-fas", (e, t) => ci.fasClass(e, t)), Handlebars.registerHelper("dice-cursor-active", (e, t) => ci.activeClass(e, t)), Handlebars.registerHelper("dice-cursor-color", (e, t) => ci.colorClass(e, t));
  }
  static async onReady() {
    await qm([
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
    return ci.isActive(e, t) ? "active" : "inactive";
  }
  static fasClass(e, t) {
    const i = ci.isActive(e, t) ? Yo.highlighted : Yo.dimmed;
    return ci.$getFas(i, Math.abs(e));
  }
  static colorClass(e, t) {
    return e == 0 || !t ? e < 0 ? "fixed-dice-malus" : "fixed-dice-bonus" : e < 0 ? "variable-dice-malus" : "variable-dice-bonus";
  }
  static $getFas(e, t) {
    return e[t > 6 ? t % 6 : t];
  }
  static async diceCursor({ value: e, min: t, max: i, editable: n }) {
    return await Km("systems/mwd/templates/roll/parts/dice-cursor.hbs", {
      value: e,
      min: t,
      max: i,
      editable: n
    });
  }
}
const ze = {
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
  PROVIDE_DAMAGE_MODE: "anarchy-provideDamageMode",
  /**
   * Hook allowing to provide alternate anarchy hack (TODO: document)
   */
  ANARCHY_HACK: "anarchy-hack"
}, Qo = "anarchy-", Wc = `${T}.${ze.ANARCHY_HACK}`, pr = {
  id: T,
  name: "Standard Shadowrun Anarchy",
  hack: {
    checkbars: () => Lt
  }
};
globalThis.ANARCHY_HOOKS = ze;
globalThis.SETTING_KEY_ANARCHY_HACK = Wc;
globalThis.SHADOWRUN_ANARCHY_NO_HACK = pr;
class qi {
  constructor() {
    this.hooks = [], this.hacks = {}, this.hackNames = {}, this.hookMethods = {}, this._register(ze.ANARCHY_HACK), Hooks.on(ze.ANARCHY_HACK, (e) => e(pr)), Hooks.on("updateSetting", async (e, t, i, n) => this.onUpdateSetting(e, t, i, n)), Hooks.once("ready", () => this.onReady()), Hooks.on("getSceneControlButtons", (e) => {
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
  async onReady() {
    Hooks.callAll(ze.ANARCHY_HACK, (e) => {
      this.hacks[e.id] = e, this.hackNames[e.id] = e.name;
    }), game.settings.register(T, ze.ANARCHY_HACK, {
      scope: "world",
      name: w.settings.anarchyHack.name,
      hint: w.settings.anarchyHack.hint,
      config: !0,
      default: pr.id,
      choices: this.hackNames,
      type: String
    }), this.applySelectedAnarchyHack();
  }
  async onUpdateSetting(e, t, i, n) {
    e.key == Wc && this.applySelectedAnarchyHack();
  }
  applySelectedAnarchyHack() {
    const e = this.getSelectedHack();
    e && F.hackCheckbars(e.hack.checkbars());
  }
  selectHookMethod(e, t) {
    Hooks.callAll(t, (i, n) => {
      i == e && (this.hookMethods[t] = n);
    });
  }
  getSelectedHack() {
    return this.hacks[game.settings.get(T, ze.ANARCHY_HACK)];
  }
  getHookMethod(e, t) {
    return this.hookMethods[e] ?? t;
  }
  callHookMethod(e, ...t) {
    const i = this.hookMethods[e];
    return i ? i(...t) : void 0;
  }
  static instance() {
    return game.system.anarchy.hooks;
  }
  static register(e) {
    qi.instance()._register(e);
  }
  _register(e) {
    if (console.log(be + "HooksManager.register", e), !e.startsWith(Qo))
      throw `For safety Anarchy Hooks names must be prefixed by '${Qo}'`;
    this.hooks.push(e);
  }
}
const Jo = [
  A.itemType.assetModule,
  A.itemType.mechWeapon,
  A.itemType.personalWeapon,
  "weapon"
];
class ce {
  constructor() {
    this.modifiers = {
      groups: ye.mapObjetToKeyValue(w.modifier.group, "key", "label"),
      roll: ce._buildGroupOptions("roll"),
      attribute: ce._buildGroupOptions("attribute"),
      monitor: ce._buildGroupOptions("monitor"),
      other: ce._buildGroupOptions("other")
    }, Hooks.once("ready", () => this.onReady());
  }
  static _buildGroupOptions(e) {
    switch (e) {
      case "attribute":
        return {
          label: w.modifier.group[e],
          effects: ye.hbsAttributes.map((t) => ({ key: t.value, label: t.labelkey })),
          categories: []
        };
    }
    return {
      label: w.modifier.group[e],
      effects: ye.mapObjetToKeyValue(w.modifier[e].effect, "key", "label"),
      categories: ye.mapObjetToKeyValue(w.modifier[e].category, "key", "label")
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
                return ye.getDamageTypes().map((s) => ({ key: s.value, label: s.labelkey }));
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
        return ye.getAttributes().map((i) => ({ key: i.value, label: i.labelkey }));
      case "skill":
        return game.system.anarchy.skills.getSkills().map((i) => ({ key: i.code, label: i.labelkey }));
      case "attributeAction":
        const t = Ne.all().map((i) => ({ key: i.code, label: i.labelkey }));
        return se.distinct(t.map((i) => i.key)).map((i) => t.find((n) => n.key == i));
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
            return i.subCategory == e.attributeAction || i.subCategory == Ne.getDefenseAttributeAction(e.defenseAction);
        }
      return !1;
    };
  }
  static computeRollModifiers(e, t, i) {
    const n = ce.buildRollModifiersFilter(t, i), s = (c) => c.group == "roll" && c.effect == i && n(c), r = ce._activeItems(e).map((c) => ce.itemModifiers(c, s)).reduce((c, u) => c.concat(u), []).sort(se.descending((c) => c.modifier.value)), l = ce.$sumAssetModuleModifiers(r.filter((c) => Jo.includes(c.item.type)).map((c) => c.modifier.value)), o = se.sumValues(r.filter((c) => !Jo.includes(c.item.type)).map((c) => c.modifier.value));
    return {
      value: l + o,
      sources: r
    };
  }
  static $sumAssetModuleModifiers(e) {
    const t = e.find((s) => s > 3) ?? 0, i = se.sumValues(e.filter((s) => s < 0)), n = Math.min(3, se.sumValues(e.filter((s) => s > 0 && s <= 3)));
    return i + Math.max(n, t);
  }
  static computeModifiers(e, t, i = void 0, n = void 0) {
    const s = ce._createFilter(t, i, n), r = ce._activeItems(e).map((o) => ce.itemModifiers(o, s)).reduce((o, c) => o.concat(c), []);
    return {
      value: se.sumValues(r, (o) => o.modifier.value),
      sources: r
    };
  }
  static sumMonitorModifiers(e, t, i, n = void 0) {
    return ce.sumModifiers(ce._activeItems(e), "monitor", t, i, n);
  }
  static sumModifiers(e, t, i, n, s = void 0) {
    const r = ce._createFilter(t, i, n, s), l = ce._activeItems(e).map((o) => ce.itemModifiers(o, r)).reduce((o, c) => o.concat(c), []);
    return se.sumValues(l, (o) => o.modifier.value);
  }
  static _createFilter(e, t, i, n = void 0) {
    return (s) => s.group == e && s.effect == (t ?? s.effect) && s.category == (i ?? s.category) && (n == null ? !0 : s.subCategory == n);
  }
  static countModifiers(e, t, i = void 0, n = void 0) {
    const s = ce._createFilter(t, i, n);
    return ce._activeItems(e).map((l) => ce.itemModifiers(l, s)).reduce((l, o) => l.concat(o), []).count;
  }
  static itemModifiers(e, t) {
    return ce._listItemModifiers(e, t).map((i) => ce._itemModifier(e, i));
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
const { loadTemplates: xs, renderTemplate: DA } = foundry.applications.handlebars, ge = {
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
}, Xo = 4, Vm = [
  // attribute1
  {
    code: "attribute1",
    options: {
      order: 1,
      category: ge.pool,
      hbsTemplateRoll: `${Q}/roll/parts/select-attribute.hbs`
    },
    condition: (a) => Object.values(Je.rollType).includes(a.mode),
    isUsed: (a) => !0,
    factory: (a) => {
      var t;
      const e = a.attribute1 ?? ((t = a.skill) == null ? void 0 : t.system.attribute);
      return {
        labelkey: e ? w.attributes[e] : w.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: a.skill },
        selected: e,
        choices: ye.getAttributes((i) => a.attributes.includes(i))
      };
    }
  },
  // attribute2
  {
    code: "attribute2",
    options: {
      order: 1,
      category: ge.pool,
      hbsTemplateRoll: `${Q}/roll/parts/select-attribute.hbs`,
      hbsTemplateChat: `${Q}/chat/parts/pool-attribute2.hbs`
    },
    condition: (a) => [Je.rollType.attribute, Je.rollType.attributeAction, Je.rollType.defense].includes(a.mode),
    isUsed: (a) => a.used,
    onChecked: (a, e) => a.used = !!e,
    factory: (a) => {
      const e = a.attribute2;
      return {
        labelkey: e ? w.attributes[e] : w.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: Je.rollType.attribute == a.mode },
        selected: e,
        choices: ye.getAttributes((t) => a.attributes.includes(t))
      };
    }
  },
  // skill
  {
    code: "skill",
    options: {
      flags: {},
      order: 3,
      category: ge.pool,
      hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`
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
      category: ge.pool,
      hbsTemplateRoll: `${Q}/roll/parts/check-option.hbs`
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
      category: ge.pool,
      value: 0,
      labelkey: w.common.roll.modifiers.social.credibility,
      hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`
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
      labelkey: w.common.roll.modifiers.poolModifiers,
      order: 5,
      category: ge.pool,
      hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 4
    },
    factory: (a) => Li.computeRollModifiers(ge.pool, a)
  },
  // wounds
  {
    code: "wounds",
    options: {
      flags: { optional: !0 },
      order: 10,
      category: ge.pool,
      labelkey: w.common.roll.modifiers.wounds,
      hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`
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
      category: ge.pool,
      value: 0,
      labelkey: w.common.roll.modifiers.other,
      hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`,
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
      category: ge.glitch,
      value: 0,
      labelkey: w.common.roll.modifiers.glitch,
      hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${Q}/chat/parts/glitch.hbs`,
      min: 0,
      max: 5
    },
    isUsed: (a) => a.value > 0,
    factory: (a) => {
      const e = a.actor.getWounds(), t = Li.computeRollModifiers(ge.glitch, a);
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
      category: ge.glitch,
      value: 0,
      labelkey: w.common.roll.modifiers.social.rumor,
      hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${Q}/chat/parts/glitch.hbs`,
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
      category: ge.reroll,
      labelkey: w.common.roll.modifiers.reroll,
      hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: Xo
    },
    factory: (a) => {
      const e = Li.computeRollModifiers(ge.reroll, a), t = Li.computeRollModifiers(ge.rerollMax, a);
      return foundry.utils.mergeObject(e, {
        max: Xo + Math.max(0, t.value ?? 0)
      });
    }
  },
  // reduction from opponent
  {
    code: "reduced",
    options: {
      order: 29,
      category: ge.pool,
      labelkey: w.common.roll.modifiers.reduced,
      hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`,
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
      category: ge.rerollForced,
      labelkey: w.common.roll.modifiers.rerollForced,
      hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 0
    },
    factory: (a) => {
      var t;
      const e = Li.computeRollModifiers(ge.successReroll, a);
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
      category: ge.pool,
      value: 0,
      min: 0,
      max: 3,
      labelkey: w.common.roll.modifiers.anarchyDisposition,
      hbsTemplateRoll: `${Q}/roll/parts/check-option.hbs`
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
      category: ge.risk,
      value: 0,
      labelkey: w.common.roll.modifiers.anarchyRisk,
      hbsTemplateRoll: `${Q}/roll/parts/check-option.hbs`,
      hbsTemplateChat: `${Q}/chat/parts/anarchy-risk.hbs`
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
      category: ge.edge,
      labelkey: w.common.roll.modifiers.edge,
      hbsTemplateRoll: `${Q}/roll/parts/check-option.hbs`
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
          label: w.actor.counters.edgePools[s] ?? s,
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
      category: ge.opponentPool,
      labelkey: w.common.roll.modifiers.opponentPool,
      hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => Li.computeRollModifiers(ge.opponentPool, a),
    condition: (a) => !a.attributeAction
  },
  // force opponent rerolls
  {
    code: "opponentReroll",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: ge.opponentReroll,
      value: 0,
      labelkey: w.common.roll.modifiers.opponentReroll,
      hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => Li.computeRollModifiers(ge.opponentReroll, a),
    condition: (a) => !a.attributeAction
  }
];
class Li {
  constructor() {
    this.registeredParameters = {}, qi.register(ze.REGISTER_ROLL_PARAMETERS), qi.register(ze.MODIFY_ROLL_PARAMETER), Hooks.on(ze.MODIFY_ROLL_PARAMETER, (e) => this._validate(e)), Hooks.once(ze.REGISTER_ROLL_PARAMETERS, (e) => Vm.forEach(
      (t) => e(t)
    )), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(ze.REGISTER_ROLL_PARAMETERS, async (t) => {
      Hooks.callAll(ze.MODIFY_ROLL_PARAMETER, t), t.ignore || await this._register(t);
    });
    const e = se.distinct([].concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateRoll)).concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateChat)).filter((t) => typeof t == "string" && t.length > 0));
    await xs(se.distinct(e)), await xs([`${Q}/roll/parts/parameter-label.hbs`]);
  }
  _validate(e) {
    e.code || (console.error(`${be} RollParameter does not have a code`, e), e.ignore = !0);
  }
  async _register(e) {
    if (this.registeredParameters[e.code]) {
      console.error(`${be} RollParameter ${e.code} is already registered`, e);
      return;
    }
    e.onChecked || (e.onChecked = (t, i) => t.used = i), e.onValue = (t, i) => t.value = i, this.registeredParameters[e.code] = e;
  }
  async _optionalLoadTemplate(e) {
    e && await xs([e]);
  }
  build(e) {
    return Object.values(this.registeredParameters).filter((t) => !t.condition || t.condition(e)).map((t) => this._computeParameter(t, e));
  }
  compute(e) {
    const t = e.filter((s) => this.isParameterUsed(s)), i = se.classify(t, (s) => s.category), n = {};
    return Object.values(i).forEach((s) => n[s[0].category] = se.sumValues(s, (r) => r.value ?? (r.optional ? 1 : 0))), n;
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
    return ce.computeRollModifiers(n, t, e);
  }
}
const { ApplicationV2: Ym, HandlebarsApplicationMixin: Qm } = foundry.applications.api, { loadTemplates: Jm, renderTemplate: Xm } = foundry.applications.handlebars;
var as, jc;
const Ue = class Ue extends Qm(Ym) {
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
    await Jm([
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
    const i = foundry.utils.mergeObject(Ue.prepareActorRoll(e), {
      mode: Je.rollType.attribute,
      attribute1: t
    });
    await Ue.create(i);
  }
  static async rollAttributeAction(e, t) {
    const i = foundry.utils.mergeObject(Ue.prepareActorRoll(e), {
      mode: Je.rollType.attributeAction,
      attributeAction: t.code,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e)
    });
    await Ue.create(i);
  }
  static async rollSkill(e, t, i) {
    const n = foundry.utils.mergeObject(Ue.prepareActorRoll(e), {
      mode: Je.rollType.skill,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? A.actorAttributes.reflexes,
      specialization: i
    });
    await Ue.create(n);
  }
  static async rollWeapon(e, t, i, n) {
    const s = foundry.utils.mergeObject(Ue.prepareActorRoll(e), {
      mode: Je.rollType.weapon,
      weapon: i,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? e.getPhysicalAgility(),
      specialization: void 0,
      targeting: n
    });
    await Ue.create(s);
  }
  static async rollDefense(e, t, i) {
    const n = foundry.utils.mergeObject(Ue.prepareActorRoll(e), {
      mode: Je.rollType.defense,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e),
      defenseAction: t.code,
      attackRoll: i.attackRoll,
      tokenId: i.defenderTokenId,
      choiceChatMessageId: i.choiceChatMessageId
    });
    await Ue.create(n);
  }
  static async itemAttributeRoll(e, t) {
    const i = foundry.utils.mergeObject(Ue.prepareActorRoll(e.actor), {
      mode: Je.rollType.attribute,
      item: e,
      attribute1: t,
      attributes: e.actor.getUsableAttributes(e)
    });
    await Ue.create(i);
  }
  static async create(e) {
    var r;
    const t = E(r = Ue, as, jc).call(r, e), i = await Xm(`${Q}/roll/roll-dialog-title.hbs`, t), n = {
      id: `roll-dialog-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Ue.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new Ue({ roll: t }, n).render({ force: !0 });
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
      const n = this._getRollParameter(i), s = this._getEventItem(i, this.roll.actor), r = i.currentTarget.value, l = this.roll.actor.getAttributeValue(r, s);
      this.roll[n.code] = r, await this._setParameterSelectedOption(n, r, l);
    }), this.html.find(".check-optional").click(async (i) => {
      const n = this._getRollParameter(i);
      n.onChecked(n, i.currentTarget.checked), n.category == ge.pool && await this._updateParameterValue(n, n.value), n.code == "edge" && this.html.find(`.parameter[data-parameter-code='${n.code}'] .edge-pool-select`).prop("disabled", !n.used);
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
    return await ci.diceCursor({
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
as = new WeakSet(), jc = function(e) {
  const t = game.system.anarchy.rollParameters.build(e).sort(se.ascending((i) => i.order ?? 200));
  return foundry.utils.mergeObject(e, {
    ENUMS: ye.getEnums((i) => e.attributes.includes(i)),
    ANARCHY: w,
    parameters: t
  });
}, Ae(Ue, as), O(Ue, "PARTS", {
  body: {
    template: `${Q}/roll/roll-dialog.hbs`
  }
});
let Xt = Ue;
const co = 2, hr = "skillSpecializationCatalog", Zm = [
  { key: "running", label: "Running" },
  { key: "jumping", label: "Jumping" },
  { key: "swimming", label: "Swimming" },
  { key: "climbing", label: "Climbing" },
  { key: "acrobatics", label: "Acrobatics" }
], Gc = /* @__PURE__ */ new Set(), ai = [
  // Strength
  { code: "athletics", label: "Athletics", attribute: "strength", icon: `${le}/athletics.svg`, domains: ["physical"], specializations: Zm },
  { code: "heavyWeapons", label: "Heavy Weapons", attribute: "strength", icon: `${le}/heavy-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  // Reflexes
  { code: "escapeArtist", label: "Escape Artist", attribute: "reflexes", icon: `${le}/escape-artist.svg`, domains: ["physical"] },
  { code: "gunnery", label: "Gunnery", attribute: "reflexes", icon: `${le}/vehicle-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "meleeCombat", label: "Melee Combat", attribute: "reflexes", icon: `${le}/close-combat.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "piloting", label: "Piloting", attribute: "reflexes", icon: `${le}/piloting-ground-steering-wheel.svg`, domains: ["physical"] },
  { code: "projectileWeapons", label: "Projectile Weapons", attribute: "reflexes", icon: `${le}/projectile-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "firearms", label: "Firearms", attribute: "reflexes", icon: `${le}/firearms.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "stealth", label: "Stealth", attribute: "reflexes", icon: `${le}/stealth.svg`, domains: ["physical"] },
  { code: "zeroGOps", label: "Zero-G Operations", attribute: "reflexes", icon: `${le}/fly.svg`, domains: ["physical"] },
  // Intelligence
  { code: "art", label: "Art", attribute: "intelligence", icon: `${le}/art.svg`, domains: ["mental"] },
  { code: "artillery", label: "Artillery", attribute: "intelligence", icon: `${le}/artillery.svg`, domains: ["mental"] },
  { code: "systemOps", label: "System Operations", attribute: "intelligence", icon: `${le}/electronics.svg`, domains: ["mental"] },
  { code: "computers", label: "Computers", attribute: "intelligence", icon: `${le}/hacking.svg`, domains: ["mental"] },
  { code: "demolitions", label: "Demolitions", attribute: "intelligence", icon: `${le}/demolition.svg`, domains: ["mental"] },
  { code: "medTech", label: "Medtech", attribute: "intelligence", icon: `${le}/biotech.svg`, domains: ["mental"] },
  { code: "science", label: "Science", attribute: "intelligence", icon: `${le}/skills.svg`, domains: ["mental"] },
  { code: "perception", label: "Perception", attribute: "intelligence", icon: `${le}/skills.svg`, domains: ["mental"] },
  { code: "tactics", label: "Tactics", attribute: "intelligence", icon: `${le}/skills.svg`, domains: ["mental"] },
  { code: "technician", label: "Technician", attribute: "intelligence", icon: `${le}/engineering.svg`, domains: ["mental"] },
  { code: "tracking", label: "Tracking", attribute: "intelligence", icon: `${le}/tracking.svg`, domains: ["physical", "mental"] },
  { code: "navigation", label: "Navigation", attribute: "intelligence", icon: `${le}/piloting-other.svg`, domains: ["mental"] },
  // Guts
  { code: "administration", label: "Administration", attribute: "willpower", icon: `${le}/knowledge.svg`, domains: ["social", "mental"] },
  { code: "animalHandling", label: "Animal Handling", attribute: "willpower", icon: `${le}/animals.svg`, domains: ["physical", "mental"] },
  { code: "survival", label: "Survival", attribute: "willpower", icon: `${le}/survival.svg`, domains: ["physical", "mental"] },
  // Charisma
  { code: "acting", label: "Acting", attribute: "charisma", icon: `${le}/con-art.svg`, domains: ["social"] },
  { code: "disguise", label: "Disguise", attribute: "charisma", icon: `${le}/disguise.svg`, domains: ["social", "mental"] },
  { code: "leadership", label: "Leadership", attribute: "charisma", icon: `${le}/psychology.svg`, domains: ["social"] },
  { code: "negotiation", label: "Negotiation", attribute: "charisma", icon: `${le}/negotiation.svg`, domains: ["social"] },
  { code: "etiquette", label: "Etiquette", attribute: "charisma", icon: `${le}/etiquette.svg`, domains: ["social"] },
  { code: "streetwise", label: "Streetwise", attribute: "charisma", icon: `${le}/etiquette2.svg`, domains: ["social"] },
  { code: "intimidation", label: "Intimidation", attribute: "charisma", icon: `${le}/intimidation.svg`, domains: ["social", "mental"] }
].map(ef);
for (const a of ai)
  Gc.add(a.code);
function ef(a) {
  return {
    ...a,
    label: a.label ?? a.code,
    icon: a.icon ?? `${nn}/icons/skills/skills.svg`,
    specializations: mo(a.specializations)
  };
}
function uo(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function mo(a = []) {
  const e = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((t) => {
    const i = uo((t == null ? void 0 : t.key) ?? (t == null ? void 0 : t.label) ?? t);
    return !i || e.has(i) ? null : (e.add(i), {
      key: i,
      label: String((t == null ? void 0 : t.label) ?? (t == null ? void 0 : t.key) ?? t ?? i).trim() || i
    });
  }).filter(Boolean);
}
function tf(a = []) {
  const e = new Error(a[0] ?? "Invalid skill specialization data.");
  return e.validationErrors = a, e;
}
function af() {
  const a = {};
  for (const e of ai) {
    const t = (Array.isArray(e.specializations) ? e.specializations : []).map((i) => String((i == null ? void 0 : i.label) ?? "").trim()).filter(Boolean);
    t.length && (a[e.code] = t);
  }
  return a;
}
const nf = Object.freeze(af());
function sf(a, e = [], { strict: t = !1, errors: i = [] } = {}) {
  var s, r;
  if (!Array.isArray(e)) {
    if (t) {
      const l = ((s = gr(a)) == null ? void 0 : s.label) ?? a;
      i.push(`${l}: expected an array of specialization labels.`);
    }
    return [];
  }
  const n = [];
  for (const l of e) {
    const o = String(l ?? "").trim();
    if (!o) {
      if (t) {
        const c = ((r = gr(a)) == null ? void 0 : r.label) ?? a;
        i.push(`${c}: specialization labels cannot be blank.`);
      }
      continue;
    }
    n.push(o);
  }
  return mo(n).map((l) => l.label);
}
function gr(a) {
  return ai.find((e) => e.code === a);
}
function qc(a, { strict: e = !1 } = {}) {
  const t = a && typeof a == "object" && !Array.isArray(a) ? a : {}, i = [], n = {};
  for (const [s, r] of Object.entries(t)) {
    if (!Gc.has(s)) {
      e && i.push(`Unknown skill code "${s}".`);
      continue;
    }
    const l = sf(s, r, { strict: e, errors: i });
    l.length && (n[s] = l);
  }
  if (e && i.length) throw tf(i);
  return Object.fromEntries(
    ai.map((s) => [s.code, n[s.code]]).filter(([, s]) => Array.isArray(s) && s.length)
  );
}
function rf() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${hr}`))
      return game.settings.get(T, hr);
  } catch {
  }
  return Yc();
}
function Kc() {
  const a = qc(rf(), { strict: !1 });
  return Object.fromEntries(
    Object.entries(a).map(([e, t]) => [
      e,
      mo(t)
    ])
  );
}
function Vc(a = [], { allowedKeys: e = null } = {}) {
  const t = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((i) => uo(i)).filter((i) => !i || t.has(i) || e && !e.has(i) ? !1 : (t.add(i), !0));
}
function Wt(a) {
  const e = gr(a);
  if (e)
    return {
      ...e,
      specializations: Ki(e.code)
    };
}
function Gn() {
  const a = Kc();
  return [...ai].map((e) => ({
    ...e,
    specializations: [...a[e.code] ?? []]
  })).sort((e, t) => e.label.localeCompare(t.label));
}
function Ki(a) {
  return [...Kc()[a] ?? []];
}
function fo(a, e) {
  const t = uo(e);
  if (t)
    return Ki(a).find((i) => i.key === t);
}
function of(a, e) {
  var t;
  return ((t = fo(a, e)) == null ? void 0 : t.label) ?? "";
}
function Yc() {
  return foundry.utils.deepClone(nf);
}
function ms(a, { strict: e = !1 } = {}) {
  return qc(a, { strict: e });
}
function qn(a = []) {
  return Vc(a);
}
function lf(a, e = []) {
  const t = new Set(Ki(a).map((n) => n.key)), i = new Set(Vc(e, { allowedKeys: t }));
  return Ki(a).filter((n) => i.has(n.key)).map((n) => n.key);
}
function yr(a, e) {
  var t, i;
  return qn(
    ((i = (t = a == null ? void 0 : a.skills) == null ? void 0 : t[e]) == null ? void 0 : i.specializations) ?? []
  );
}
function fs(a, e) {
  return lf(
    e,
    yr(a, e)
  );
}
function Qc(a, e) {
  const t = new Set(fs(a, e));
  return Ki(e).filter((i) => t.has(i.key));
}
function cf(a) {
  const e = Math.ceil(a.length / 2);
  return { left: a.slice(0, e), right: a.slice(e) };
}
function uf(a) {
  var e, t;
  a.skills ?? (a.skills = {});
  for (const i of ai) {
    const n = (e = a.skills)[t = i.code] ?? (e[t] = {});
    n.rating == null && (n.rating = 0), n.bonus == null && (n.bonus = 0), n.specializations = qn(n.specializations);
  }
}
function Jc(a, { bonusBySkill: e = null } = {}) {
  const t = Gn(), { left: i, right: n } = cf(t), s = (r) => {
    var y, b, S, v, M, N;
    const l = r.code, o = r.attribute, c = Number(((b = (y = a == null ? void 0 : a.skills) == null ? void 0 : y[l]) == null ? void 0 : b.rating) ?? 0), u = Number(((v = (S = a == null ? void 0 : a.attributes) == null ? void 0 : S[o]) == null ? void 0 : v.value) ?? 0), d = Number(((N = (M = a == null ? void 0 : a.skills) == null ? void 0 : M[l]) == null ? void 0 : N.bonus) ?? 0), m = Number((e == null ? void 0 : e[l]) ?? 0), f = d + m, p = Qc(a, l), h = Ki(l).filter((P) => !p.some((U) => U.key === P.key)), g = u + c + f;
    return {
      code: l,
      label: r.label,
      icon: r.icon,
      attribute: o,
      attributeLabel: ye != null && ye.localizeAttribute ? ye.localizeAttribute(o) : o,
      rating: c,
      base: u,
      bonus: f,
      total: g,
      rollPayload: JSON.stringify({ intent: "skill", key: l }),
      canAddSpecialization: h.length > 0,
      specializations: p.map((P) => ({
        ...P,
        bonus: co,
        rollPayload: JSON.stringify({
          intent: "skill",
          key: l,
          specializationKey: P.key,
          specializationLabel: P.label
        })
      })),
      // Input wiring paths (so templates don’t concat strings themselves)
      pathRating: `system.skills.${l}.rating`,
      pathBonus: `system.skills.${l}.bonus`
    };
  };
  return {
    left: i.map(s),
    right: n.map(s)
  };
}
const pa = {
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
}, Xc = "statusConditionCatalog", df = Object.freeze([
  { value: "person", label: "Person" },
  { value: "machine", label: "Machine" },
  { value: "all", label: "All Actors" },
  { value: "character", label: "Character" },
  { value: "npc", label: "NPC" },
  { value: "vehicle", label: "Vehicle" },
  { value: "battlemech", label: "BattleMech" }
]), Zo = Object.freeze([
  { value: "false", label: "No" },
  { value: "true", label: "Yes" }
]), Zc = Object.freeze([
  A.actorTypes.character,
  A.actorTypes.npc
]), eu = Object.freeze([
  A.actorTypes.vehicle,
  A.actorTypes.battlemech
]), mf = Object.freeze([...Zc, ...eu]), Kn = Object.freeze({
  person: Zc,
  machine: eu,
  all: mf,
  character: [A.actorTypes.character],
  npc: [A.actorTypes.npc],
  vehicle: [A.actorTypes.vehicle],
  battlemech: [A.actorTypes.battlemech]
}), tu = "systems/mwd/img/icons/status", ff = Object.freeze([
  // Person conditions: lightly filtered from the existing status/icon pool.
  te("prone", "Prone", "person", "physical", ["movement", "posture"], "prone.svg", { modifierKey: "prone", order: 10 }),
  te("blinded", "Blinded", "person", "sensory", ["vision"], "blinded.svg", { modifierKey: "blinded", order: 20 }),
  te("frightened", "Frightened", "person", "mental", ["morale"], "brain_injury.svg", { modifierKey: "frightened", order: 30 }),
  te("deafened", "Deafened", "person", "sensory", ["hearing"], "deafened.svg", { order: 40 }),
  te("hidden", "Hidden", "person", "tactical", ["stealth"], "hidden.svg", { order: 50 }),
  te("suppressed", "Suppressed", "person", "tactical", ["offense"], "suppressed.svg", { order: 60 }),
  te("grappled", "Grappled", "person", "physical", ["movement"], "grappled.svg", { order: 70 }),
  te("stunned", "Stunned", "person", "physical", ["action"], "concussion.svg", { order: 80 }),
  te("knockedOut", "Knocked Out", "person", "physical", ["unconscious"], "knockout.svg", { order: 90 }),
  te("onFire", "On Fire", "all", "hazard", ["fire", "heat", "escalating"], "on_fire.svg", { order: 100 }),
  te("drugged", "Drugged", "person", "chemical", ["impairment"], "drugged.svg", { order: 110 }),
  te("radiation", "Radiation", "person", "hazard", ["radiation"], "radiation_low.svg", { order: 120 }),
  te("overloaded", "Overloaded", "all", "reactor", ["heat", "actionRestriction"], "surge.svg", { managed: !0, modifierKey: "overloaded", order: 130 }),
  te("preparedInterrupt", "Prepared", "person", "tactical", ["reaction", "prepared"], "readied_action.svg", { manual: !1, managed: !0, order: 140 }),
  // Machine stability and movement.
  te("unstable", "Unstable", "machine", "stability", ["movement", "piloting", "knockdown"], "falling.svg", { order: 1e3 }),
  te("staggeredMechanical", "Staggered (Mechanical)", "machine", "stability", ["movement", "actionRestriction"], "falling.svg", { order: 1010 }),
  te("proneMechFall", "Prone (Mech Fall)", "battlemech", "stability", ["movement", "posture", "standUp"], "prone.svg", { order: 1020 }),
  te("skidding", "Skidding", "machine", "movement", ["forcedMovement", "tracking"], "falling.svg", { order: 1030 }),
  te("stalled", "Stalled", "machine", "movement", ["movement", "actionRestriction"], "emp.svg", { order: 1040 }),
  te("limping", "Limping", "machine", "movement", ["movement", "location"], "broken_leg.svg", { order: 1050 }),
  te("jumpJetFailure", "Jump Jet Failure", "battlemech", "movement", ["jump", "equipment"], "surge.svg", { order: 1060 }),
  // Machine weapons.
  te("weaponFailure", "Weapon Failure", "machine", "weapon", ["weapon", "mountScoped"], "broken_weapon.svg", { order: 1100 }),
  te("jammedBallistic", "Jammed (Ballistic)", "machine", "weapon", ["weapon", "ballistic", "clearAction"], "broken_weapon.svg", { order: 1110 }),
  te("armDestroyed", "Arm Destroyed", "battlemech", "damage", ["location", "weapon", "arm"], "dismembered_arm.svg", { order: 1120 }),
  // Sensors and electronics.
  te("sensorDegraded", "Sensor Degraded", "machine", "sensor", ["sensor", "perception"], "all-seeing-eye.webp", { order: 1200 }),
  te("sensorBlind", "Sensor Blind", "machine", "sensor", ["sensor", "targeting", "rangeLimit"], "damaged_eye.svg", { order: 1210 }),
  te("ecmJamming", "ECM Jamming", "machine", "electronicWarfare", ["ecm", "tracking"], "emp.svg", { order: 1220 }),
  te("ecmShrouded", "ECM Shrouded", "machine", "electronicWarfare", ["ecm", "defense"], "hidden.svg", { order: 1230 }),
  te("eccmBoosted", "ECCM Boosted", "machine", "electronicWarfare", ["eccm", "sensor"], "all-seeing-eye.webp", { order: 1240 }),
  te("sensorLocked", "Sensor Locked", "machine", "sensor", ["sensor", "targeted"], "all-seeing-eye.webp", { order: 1250 }),
  // Reactor and heat.
  te("reactorInstability", "Reactor Instability", "machine", "reactor", ["heat", "reactor", "escalating"], "surge.svg", { order: 1300 }),
  te("shutdown", "Shutdown", "machine", "reactor", ["heat", "actionRestriction"], "emp.svg", { order: 1310 }),
  te("overheating", "Overheating", "machine", "reactor", ["heat", "escalating"], "on_fire_mild.svg", { order: 1320 }),
  te("reactorBreach", "Reactor Breach", "machine", "reactor", ["reactor", "catastrophic", "countdown"], "radiation_high.svg", { order: 1330 }),
  // Machine damage and battlefield exposure.
  te("legDestroyed", "Leg Destroyed", "battlemech", "damage", ["location", "movement", "leg"], "dismembered_leg.svg", { order: 1400 }),
  te("exposed", "Exposed", "machine", "tactical", ["defense", "vulnerable"], "target.svg", { icon: `${tu}/falling.svg`, order: 1410 }),
  te("entrenchedHullDown", "Entrenched / Hull Down", "machine", "tactical", ["defense", "cover"], "cover.svg", { order: 1420 }),
  te("obscured", "Obscured (Smoke/Dust)", "machine", "visibility", ["visibility", "cover"], "hidden.svg", { order: 1430 }),
  // Tactical markers.
  te("evasiveWeave", "Evasive Weave", "machine", "tactical", ["defense", "attackPenalty", "selfInduced"], "falling.svg", { order: 1500 }),
  te("braced", "Braced", "machine", "tactical", ["defense", "mobilityPenalty"], "cover.svg", { order: 1510 }),
  te("overextended", "Overextended", "machine", "tactical", ["attack", "defensePenalty"], "surge.svg", { order: 1520 }),
  te("targetFocused", "Target Focused", "machine", "tactical", ["targeted", "attack"], "all-seeing-eye.webp", { order: 1530 }),
  te("suppressedMechanical", "Suppressed", "machine", "tactical", ["offense", "suppressed"], "suppressed.svg", { order: 1540 })
]);
function te(a, e, t, i, n, s, r = {}) {
  return {
    id: a,
    label: e,
    actorGroup: t,
    category: i,
    tags: n,
    icon: r.icon ?? `${tu}/${s}`,
    manual: r.manual ?? !0,
    managed: r.managed ?? !1,
    modifierKey: r.modifierKey ?? "",
    order: r.order ?? 0
  };
}
function pf() {
  return typeof foundry < "u" && (foundry == null ? void 0 : foundry.utils);
}
function hf(a) {
  return pf() && typeof foundry.utils.deepClone == "function" ? foundry.utils.deepClone(a) : JSON.parse(JSON.stringify(a));
}
function el(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return t ? ["true", "1", "yes", "y", "on"].includes(t) : e;
}
function iu() {
  return hf(ff);
}
function po(a) {
  const e = String(a ?? "").trim();
  if (!e) return "";
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(/[^A-Za-z0-9]+/).map((i) => i.trim()).filter(Boolean);
  return t.length ? t.map((i, n) => {
    const s = i.toLowerCase();
    return n === 0 ? s : `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
  }).join("") : "";
}
function ho(a = []) {
  const e = Array.isArray(a) ? a : String(a ?? "").split(","), t = /* @__PURE__ */ new Set(), i = [];
  for (const n of e) {
    const s = po(n);
    !s || t.has(s) || (t.add(s), i.push(s));
  }
  return i;
}
function gf(a = []) {
  return ho(a).join(", ");
}
function au(a, e = "person") {
  const i = String(a ?? "").trim().toLowerCase();
  return i === "battlemech" ? "battlemech" : Object.prototype.hasOwnProperty.call(Kn, i) ? i : e;
}
function yf(a) {
  return [...Kn[au(a)] ?? []];
}
function bf(a = {}, { strict: e = !1, index: t = 0 } = {}) {
  const i = [], n = `Row ${t + 1}`, s = String((a == null ? void 0 : a.id) ?? "").trim(), r = String((a == null ? void 0 : a.label) ?? "").trim(), l = String((a == null ? void 0 : a.actorGroup) ?? "person").trim(), o = au(l, ""), c = po((a == null ? void 0 : a.category) ?? "general") || "general", u = ho(a == null ? void 0 : a.tags), d = String((a == null ? void 0 : a.icon) ?? "").trim(), m = String((a == null ? void 0 : a.modifierKey) ?? "").trim(), f = Number((a == null ? void 0 : a.order) ?? 0);
  if (s || i.push(`${n}: id cannot be blank.`), r || i.push(`${n}: label cannot be blank.`), (!o || l && !Object.prototype.hasOwnProperty.call(Kn, o)) && i.push(`${n}: actorGroup must be one of ${Object.keys(Kn).join(", ")}.`), m && !(pa != null && pa[m]) && i.push(`${n}: modifierKey "${m}" is not a known mechanics-backed status.`), Number.isFinite(f) || i.push(`${n}: order must be numeric.`), e && i.length) {
    const p = new Error(i[0]);
    throw p.validationErrors = i, p;
  }
  return {
    id: s,
    label: r || s || "Status",
    actorGroup: o || "person",
    category: c,
    tags: u,
    icon: d,
    manual: el(a == null ? void 0 : a.manual, !0),
    managed: el(a == null ? void 0 : a.managed, !1),
    modifierKey: m,
    order: Number.isFinite(f) ? Math.trunc(f) : 0
  };
}
function Vi(a = [], { strict: e = !1 } = {}) {
  const t = Array.isArray(a) ? a : [], i = [], n = /* @__PURE__ */ new Set(), s = [];
  if (t.forEach((r, l) => {
    try {
      const o = bf(r, { strict: e, index: l });
      if (!o.id) return;
      const c = o.id.toLowerCase();
      if (n.has(c)) {
        e && i.push(`Row ${l + 1}: duplicate id "${o.id}".`);
        return;
      }
      n.add(c), s.push(o);
    } catch (o) {
      e && i.push(...Array.isArray(o.validationErrors) ? o.validationErrors : [o.message]);
    }
  }), e && i.length) {
    const r = new Error(i[0]);
    throw r.validationErrors = i, r;
  }
  return s.sort((r, l) => r.order !== l.order ? r.order - l.order : r.label.localeCompare(l.label));
}
function ps(a = void 0) {
  var i, n;
  if (a !== void 0) return Vi(a, { strict: !1 });
  const e = (i = globalThis.game) == null ? void 0 : i.settings, t = (n = e == null ? void 0 : e.get) == null ? void 0 : n.call(e, T, Xc);
  return Vi(
    Array.isArray(t) ? t : iu(),
    { strict: !1 }
  );
}
function hs(a, e = ps()) {
  const t = String(a ?? "").trim();
  return t ? e.find((i) => String(i.id ?? "").trim() === t) ?? null : null;
}
function nu(a = null) {
  return String(
    typeof a == "string" ? a : (a == null ? void 0 : a.type) ?? ""
  ).trim();
}
function gs(a, e = null) {
  const t = nu(e);
  return !t || !a ? !1 : yf(a.actorGroup).includes(t);
}
function Sf({ statusId: a = "", actor: e = null, metadata: t = {}, catalogEntry: i = null } = {}) {
  const n = i ?? hs(a), s = ho((t == null ? void 0 : t.tags) ?? (n == null ? void 0 : n.tags) ?? []);
  return {
    id: String(a || (n == null ? void 0 : n.id) || "").trim(),
    category: po((t == null ? void 0 : t.category) ?? (n == null ? void 0 : n.category) ?? "general") || "general",
    tags: s,
    actorGroup: String((t == null ? void 0 : t.actorGroup) ?? (n == null ? void 0 : n.actorGroup) ?? "").trim(),
    actorType: nu(e),
    scope: String((t == null ? void 0 : t.scope) ?? "").trim(),
    location: String((t == null ? void 0 : t.location) ?? "").trim(),
    itemUuid: String((t == null ? void 0 : t.itemUuid) ?? "").trim(),
    targetUuid: String((t == null ? void 0 : t.targetUuid) ?? "").trim(),
    severity: String((t == null ? void 0 : t.severity) ?? "").trim(),
    notes: String((t == null ? void 0 : t.notes) ?? "").trim()
  };
}
function Af(a = ps()) {
  return Vi(a, { strict: !1 }).map((e) => ({
    id: e.id,
    name: e.label,
    label: e.label,
    img: e.icon,
    icon: e.icon
  }));
}
function tl() {
  if (typeof CONFIG > "u") return [];
  const a = Af();
  return CONFIG.statusEffects = a, a;
}
const Tf = /* @__PURE__ */ new Set(["overloaded", "preparedInterrupt"]);
function il(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function wf(a, e) {
  var i, n, s;
  if (!a) return null;
  const t = il(e) ?? il(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((s = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : s.call(i, ((n = t == null ? void 0 : t.baseActor) == null ? void 0 : n.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function go(a) {
  const e = String(a ?? "").trim();
  if (!e) return "Status";
  const n = (e.includes(".") ? e.split(".").at(-1) : e).replace(/^status/i, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return n ? n.replace(/\b\w/g, (s) => s.toUpperCase()) : e;
}
function vf(a) {
  const e = String((a == null ? void 0 : a.name) ?? (a == null ? void 0 : a.label) ?? (a == null ? void 0 : a.id) ?? "Status").trim();
  return e ? go(e) : "Status";
}
function kf(a) {
  const e = typeof (a == null ? void 0 : a.img) == "string" ? a.img.trim() : "";
  if (e) return e;
  const t = a ? Object.getOwnPropertyDescriptor(a, "icon") : null;
  return "value" in (t ?? {}) ? String(t.value ?? "").trim() : "";
}
function Ef(a) {
  var e, t;
  return ((t = (e = globalThis.CSS) == null ? void 0 : e.escape) == null ? void 0 : t.call(e, String(a ?? ""))) ?? String(a ?? "").replace(/["\\]/g, "\\$&");
}
function su(a) {
  var e;
  return Object.prototype.hasOwnProperty.call(((e = a == null ? void 0 : a.system) == null ? void 0 : e.burn) ?? {}, "overloaded");
}
function ru(a, e) {
  var n;
  const t = String(e ?? "").trim();
  return !a || !t ? null : Array.from(((n = a.effects) == null ? void 0 : n.contents) ?? a.effects ?? []).find((s) => {
    var r, l, o, c, u, d, m;
    return (l = (r = s == null ? void 0 : s.statuses) == null ? void 0 : r.has) != null && l.call(r, t) || Array.isArray(s == null ? void 0 : s.statuses) && s.statuses.includes(t) || ((c = (o = s == null ? void 0 : s.getFlag) == null ? void 0 : o.call(s, T, "status")) == null ? void 0 : c.id) === t || ((m = (d = (u = s == null ? void 0 : s.flags) == null ? void 0 : u[T]) == null ? void 0 : d.status) == null ? void 0 : m.id) === t ? !0 : String((s == null ? void 0 : s.statusId) ?? (s == null ? void 0 : s.id) ?? "").trim() === t;
  }) ?? null;
}
function ou(a, e) {
  var i, n, s;
  const t = ru(a, e);
  return ((i = t == null ? void 0 : t.getFlag) == null ? void 0 : i.call(t, T, "status")) ?? ((s = (n = t == null ? void 0 : t.flags) == null ? void 0 : n[T]) == null ? void 0 : s.status) ?? null;
}
function Yi(a, e) {
  var t, i, n, s, r, l;
  return e === "overloaded" && su(a) ? !!((i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.burn) != null && i.overloaded) || !!((s = (n = a == null ? void 0 : a.statuses) == null ? void 0 : n.has) != null && s.call(n, e)) : ((l = (r = a == null ? void 0 : a.statuses) == null ? void 0 : r.has) == null ? void 0 : l.call(r, e)) ?? !1;
}
function Mf(a, e) {
  const t = Yi(e, a.id), i = ou(e, a.id) ?? {};
  return {
    id: a.id,
    label: a.label,
    icon: a.icon,
    active: t,
    managed: !!a.managed || Tf.has(a.id),
    manual: !!a.manual,
    legacy: !1,
    category: a.category,
    tags: [...a.tags ?? []],
    scope: String(i.scope ?? "").trim(),
    notes: String(i.notes ?? "").trim()
  };
}
function Cf(a, e) {
  const t = (CONFIG.statusEffects ?? []).find((n) => String((n == null ? void 0 : n.id) ?? "").trim() === a) ?? null, i = ou(e, a) ?? {};
  return {
    id: a,
    label: t ? vf(t) : go(a),
    icon: t ? kf(t) : "",
    active: Yi(e, a),
    managed: !1,
    manual: !1,
    legacy: !0,
    category: "",
    tags: [],
    scope: String(i.scope ?? "").trim(),
    notes: String(i.notes ?? "").trim()
  };
}
function yo(a) {
  const e = /* @__PURE__ */ new Set(), t = ps(), i = [];
  for (const n of t) {
    const s = String((n == null ? void 0 : n.id) ?? "").trim();
    if (!s || e.has(s)) continue;
    const r = Yi(a, s), l = gs(n, a);
    !r && (!l || !n.manual) || (e.add(s), i.push(Mf(n, a)));
  }
  for (const n of Array.from((a == null ? void 0 : a.statuses) ?? [])) {
    const s = String(n ?? "").trim();
    !s || e.has(s) || (e.add(s), i.push(Cf(s, a)));
  }
  return i.sort((n, s) => n.active !== s.active ? n.active ? -1 : 1 : n.legacy !== s.legacy ? n.legacy ? 1 : -1 : n.label.localeCompare(s.label));
}
function Pf(a) {
  if (!a.length)
    return "<p>No token statuses are configured.</p>";
  const e = foundry.utils.escapeHTML;
  return `
    <div class="mwd-token-status-dialog">
      <p style="margin-top: 0;">Toggle the statuses shown on this token.</p>
      <div style="display: grid; gap: 0.2rem; max-height: 20rem; overflow-y: auto; padding-right: 0.25rem;">
        ${a.map((i) => {
    const n = i.active ? "checked" : "", s = i.icon ? `<img src="${e(i.icon)}" alt="" width="20" height="20" style="flex: 0 0 20px; border: 0;" />` : "", r = i.managed ? '<small style="opacity: 0.7;">Managed by system state</small>' : "", l = i.legacy ? '<small style="opacity: 0.7;">Legacy / uncataloged</small>' : "";
    return `
      <div class="mwd-token-status-dialog__row" data-status-id="${e(i.id)}" style="display: grid; gap: 0.2rem; padding: 0.35rem 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
        <label style="display: flex; align-items: center; gap: 0.5rem;">
          <input type="checkbox" name="status.${e(i.id)}.active" value="1" ${n} />
          ${s}
          <span style="flex: 1 1 auto;">${e(i.label)}</span>
          ${r}
          ${l}
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
async function Nf({ actor: a, effects: e, selectedStatusIds: t }) {
  const i = new Map(t.map((n) => [n.id, n]));
  for (const n of e) {
    const s = i.get(n.id), r = !!(s != null && s.active);
    await lu({
      actor: a,
      statusId: n.id,
      active: r,
      metadata: (s == null ? void 0 : s.metadata) ?? {}
    });
  }
}
async function al(a, e, t = {}) {
  const i = hs(e);
  if (!i) return !1;
  const n = ru(a, e);
  if (!n) return !1;
  const s = Sf({
    actor: a,
    statusId: e,
    metadata: t,
    catalogEntry: i
  }), r = { [`flags.${T}.status`]: s };
  return typeof n.update == "function" ? (await n.update(r), !0) : n.id && typeof a.updateEmbeddedDocuments == "function" ? (await a.updateEmbeddedDocuments("ActiveEffect", [{ _id: n.id, ...r }]), !0) : !1;
}
async function lu({ actor: a, statusId: e, active: t, metadata: i = {} }) {
  if (!a || !e) return !1;
  const n = Yi(a, e);
  if (!!t === n)
    return t ? al(a, e, i) : !1;
  const s = hs(e), r = s ? gs(s, a) : !1;
  return t && s && !r ? !1 : e === "overloaded" && su(a) ? (await a.update({ "system.burn.overloaded": !!t }), !0) : (await a.toggleStatusEffect(e, { active: !!t, overlay: !1 }), t && await al(a, e, i), !0);
}
function Rf(a) {
  var i, n, s, r, l;
  const e = /* @__PURE__ */ new Map(), t = Array.from(((i = a == null ? void 0 : a.querySelectorAll) == null ? void 0 : i.call(a, "[data-status-id]")) ?? []);
  for (const o of t) {
    const c = String(((n = o == null ? void 0 : o.dataset) == null ? void 0 : n.statusId) ?? "").trim();
    if (!c) continue;
    const u = Ef(c), d = !!((s = o.querySelector(`input[name="status.${u}.active"]`)) != null && s.checked), m = String(((r = o.querySelector(`input[name="status.${u}.scope"]`)) == null ? void 0 : r.value) ?? "").trim(), f = String(((l = o.querySelector(`input[name="status.${u}.notes"]`)) == null ? void 0 : l.value) ?? "").trim();
    e.set(c, {
      id: c,
      active: d,
      metadata: { scope: m, notes: f }
    });
  }
  return Array.from(e.values());
}
async function cu({ actor: a, token: e } = {}) {
  var n;
  if (!a || !e) return !1;
  const t = wf(a, e), i = yo(t);
  return i.length ? foundry.applications.api.DialogV2.wait({
    window: {
      title: `Token Statuses: ${e.name ?? a.name ?? "Token"}`
    },
    position: {
      width: 420
    },
    content: Pf(i),
    buttons: [
      {
        action: "apply",
        label: "Apply",
        icon: "fa-solid fa-check",
        default: !0,
        callback: async (s, r) => {
          var l;
          try {
            const o = Rf(r.form);
            return await Nf({ actor: t, effects: i, selectedStatusIds: o }), !0;
          } catch (o) {
            return console.error("MWD | Failed to update token statuses", o), (l = ui.notifications) == null || l.error("Unable to update token statuses."), !1;
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
function If() {
  typeof Hooks > "u" || Hooks.on("renderTokenHUD", (a, e, t = {}) => {
    var d, m, f, p, h;
    const i = (t == null ? void 0 : t._id) ?? (t == null ? void 0 : t.id) ?? "", n = ((m = (d = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : d.get) == null ? void 0 : m.call(d, i)) ?? null, s = (n == null ? void 0 : n.actor) ?? null;
    if (!s) return;
    const r = ps(), l = new Map(r.map((g) => [g.id, g])), c = typeof jQuery < "u" && e instanceof jQuery ? e[0] : e;
    if (!(c instanceof HTMLElement)) return;
    const u = c.querySelectorAll("[data-status-id], [data-statusId], [data-effect-id]");
    for (const g of u) {
      const y = String(
        ((f = g.dataset) == null ? void 0 : f.statusId) ?? ((p = g.dataset) == null ? void 0 : p.statusid) ?? ((h = g.dataset) == null ? void 0 : h.effectId) ?? ""
      ).trim();
      if (!y) continue;
      const b = l.get(y);
      if (!b) continue;
      !Yi(s, y) && !gs(b, s) && (g.hidden = !0, g.style.display = "none");
    }
  });
}
const Df = Object.freeze({
  STR: wi.strength,
  REF: wi.reflexes,
  WIL: wi.willpower,
  INT: wi.intelligence,
  CHA: wi.charisma
}), Of = Object.freeze({
  STR: "Strength",
  REF: "Reflexes",
  WIL: "Willpower",
  INT: "Intelligence",
  CHA: "Charisma"
}), _f = Object.freeze({
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
function bo(a) {
  const e = String(a ?? "").trim();
  return e ? _f[e] ?? null : null;
}
function Lf(a) {
  const e = bo(a);
  return e ? {
    intent: "common",
    id: e.id
  } : null;
}
function xf(a) {
  return Df[String(a ?? "").trim().toUpperCase()] ?? null;
}
function $f(a) {
  return Of[String(a ?? "").trim().toUpperCase()] ?? String(a ?? "").trim().toUpperCase();
}
function Bf(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => String(e ?? "").trim().toUpperCase()).filter(Boolean).join(" + ");
}
const So = Object.freeze([
  { value: "positive", label: "Positive" },
  { value: "negative", label: "Negative" },
  { value: "narrative", label: "Narrative" }
]), Ao = Object.freeze([
  { value: "minor", label: "Minor" },
  { value: "major", label: "Major" }
]), uu = Object.freeze([
  { value: "passive", label: "Passive" },
  { value: "triggered", label: "Triggered" }
]), du = Object.freeze([
  { value: "rollMod", label: "Roll Modifier" },
  { value: "burnAdjust", label: "Burn Adjust" },
  { value: "actionCostMod", label: "Action Cost Mod" },
  { value: "initiativeMod", label: "Initiative Mod" },
  { value: "damageMod", label: "Damage Intake Mod" },
  { value: "edgeEvent", label: "Edge Event" }
]), mu = Object.freeze([
  { value: "onBuildRoll", label: "Build Roll" },
  { value: "onBeforeBurnApplied", label: "Before Burn Applied" },
  { value: "onBeforeActionCostFinalized", label: "Before Action Cost Finalized" },
  { value: "onInitiativeResolved", label: "Initiative Resolved" },
  { value: "onDamageResolved", label: "Damage Resolved" },
  { value: "onEndOfActivation", label: "End of Activation" },
  { value: "onEdgeSpend", label: "Edge Spend" },
  { value: "onEdgeGain", label: "Edge Gain" }
]), To = Object.freeze([
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
]), fu = Object.freeze([
  { value: "adjustAmount", label: "Adjust Amount" },
  { value: "grantPool", label: "Grant Pool" }
]), zf = new Set(So.map((a) => a.value)), Ff = new Set(Ao.map((a) => a.value)), Uf = new Set(uu.map((a) => a.value)), Hf = new Set(du.map((a) => a.value)), pu = new Set(mu.map((a) => a.value)), Wf = new Set(To.map((a) => a.value)), jf = new Set(fu.map((a) => a.value));
function re(a, e = "") {
  return String(a ?? "").trim() || e;
}
function fe(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Vn(a) {
  return foundry.utils.deepClone(a);
}
function hu(a = []) {
  return (Array.isArray(a) ? a : typeof a == "string" ? a.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function Gf(a) {
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
function $s(a) {
  const e = Math.max(0, Math.trunc(fe(a, 0)));
  return e > 0 ? e : 0;
}
function Pi(a = {}) {
  const e = a && typeof a == "object" ? a : {};
  return {
    perActivation: $s(e.perActivation),
    perRound: $s(e.perRound),
    perScene: $s(e.perScene)
  };
}
function qf(a = {}) {
  const e = a && typeof a == "object" ? a : {}, t = {
    id: re(e.id, foundry.utils.randomID()),
    fact: re(e.fact)
  }, i = To.find((s) => e[s.value] !== void 0 && e[s.value] !== null), n = (i == null ? void 0 : i.value) ?? (Wf.has(String(e.comparator ?? "").trim()) ? String(e.comparator).trim() : "eq");
  return t.comparator = n, n !== "truthy" && n !== "falsy" && (t.value = Gf(e[n] ?? e.value ?? "")), t;
}
function di(a = []) {
  return (Array.isArray(a) ? a : []).map(qf);
}
function Kf(a = {}) {
  const e = a && typeof a == "object" ? a : {}, t = Hf.has(String(e.type ?? "").trim()) ? String(e.type).trim() : "rollMod", i = Vf(t), n = pu.has(String(e.phase ?? "").trim()) ? String(e.phase).trim() : i, s = jf.has(String(e.operation ?? "").trim()) ? String(e.operation).trim() : "adjustAmount";
  return {
    id: re(e.id, foundry.utils.randomID()),
    type: t,
    phase: n,
    selector: re(e.selector),
    skillKeys: hu(e.skillKeys),
    label: re(e.label),
    value: fe(e.value, 0),
    min: e.min === void 0 || e.min === null || e.min === "" ? null : fe(e.min, 0),
    max: e.max === void 0 || e.max === null || e.max === "" ? null : fe(e.max, 0),
    pool: re(e.pool),
    operation: s,
    conditions: di(e.conditions),
    limit: Pi(e.limit)
  };
}
function gu(a = {}) {
  const e = re(a == null ? void 0 : a.selector);
  return e === "intent.skill" || e.startsWith("intent.skill.");
}
function xi(a = []) {
  return (Array.isArray(a) ? a : []).map(Kf).filter((t) => t.phase && t.type);
}
function Ht(a = {}) {
  const e = a && typeof a == "object" ? Vn(a) : {}, t = e.positive === !1 ? "negative" : "positive", i = zf.has(String(e.category ?? "").trim()) ? String(e.category).trim() : t, n = Ff.has(String(e.tier ?? "").trim()) ? String(e.tier).trim() : "minor", s = Uf.has(String(e.activation ?? "").trim()) ? String(e.activation).trim() : "passive";
  return {
    ...e,
    positive: i === "positive",
    category: i,
    tier: n,
    activation: s,
    tags: hu(e.tags),
    effects: xi(e.effects),
    prerequisites: di(e.prerequisites),
    limits: Pi(e.limits)
  };
}
function yu() {
  return {
    categories: [...So],
    tiers: [...Ao],
    activations: [...uu],
    effectTypes: [...du],
    phases: [...mu],
    comparators: [...To],
    edgeOperations: [...fu]
  };
}
function kn(a = "") {
  var e;
  return ((e = So.find((t) => t.value === a)) == null ? void 0 : e.label) ?? "Positive";
}
function En(a = "") {
  var e;
  return ((e = Ao.find((t) => t.value === a)) == null ? void 0 : e.label) ?? "Minor";
}
function Vf(a = "") {
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
function Yf(a) {
  return Array.from((a == null ? void 0 : a.items) ?? []).filter((e) => ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === "quality").map((e) => ({
    item: e,
    system: Ht(e.system ?? {})
  }));
}
function Qf(a = {}, e = {}) {
  const t = Pi(a), i = Pi(e);
  return {
    perActivation: i.perActivation || t.perActivation,
    perRound: i.perRound || t.perRound,
    perScene: i.perScene || t.perScene
  };
}
function bu(a = {}) {
  var n, s, r;
  const e = re(a.combatId ?? ((n = a.combat) == null ? void 0 : n.id)), t = Math.max(0, Math.trunc(fe(a.round ?? ((s = a.combat) == null ? void 0 : s.round), 0))), i = re(a.sceneId ?? ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id));
  return {
    activationKey: re(a.activationKey),
    roundKey: e ? `${e}:${t}` : "",
    sceneKey: i
  };
}
function Jf(a, e = {}) {
  var s, r, l, o;
  const t = ((s = a == null ? void 0 : a.flags) == null ? void 0 : s[T]) ?? {}, i = ((r = t == null ? void 0 : t.traitUsage) == null ? void 0 : r.scene) ?? {}, n = e.state ?? {};
  return {
    activation: ((l = n == null ? void 0 : n.traitUsage) == null ? void 0 : l.activation) ?? {},
    round: ((o = n == null ? void 0 : n.traitUsage) == null ? void 0 : o.round) ?? {},
    scene: i
  };
}
function Xf(a, e, t, i) {
  var n, s, r, l, o;
  switch (t) {
    case "perActivation":
      return Math.max(0, Math.trunc(fe((n = a.activation) == null ? void 0 : n[i], 0)));
    case "perRound":
      return Math.max(0, Math.trunc(fe((r = (s = a.round) == null ? void 0 : s[e.roundKey]) == null ? void 0 : r[i], 0)));
    case "perScene":
      return Math.max(0, Math.trunc(fe((o = (l = a.scene) == null ? void 0 : l[e.sceneKey]) == null ? void 0 : o[i], 0)));
    default:
      return 0;
  }
}
function Zf(a, e, t, i) {
  const n = [];
  for (const s of ["perActivation", "perRound", "perScene"]) {
    const r = Math.max(0, Math.trunc(fe(t == null ? void 0 : t[s], 0)));
    if (!r) continue;
    Xf(a, e, s, i) >= r && n.push(`${s} limit reached`);
  }
  return n;
}
function ep(a, e, t) {
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
function nl(a, e) {
  if (!re(a == null ? void 0 : a.fact)) return !0;
  const t = foundry.utils.getProperty(e, a.fact);
  return ep(t, a.comparator, a.value);
}
function tp(a = "", e = {}) {
  const t = re(a);
  return t ? (Array.isArray(e == null ? void 0 : e.selectors) ? e.selectors : []).some(
    (n) => n === t || n.startsWith(`${t}.`)
  ) : !0;
}
function Su(a, e) {
  return `${a.id}:${e.id}`;
}
function ip(a, e) {
  var t;
  return !!((t = a.system) != null && t.inactive) || !!(e != null && e.inactive);
}
function sl(a = []) {
  return a.map((e) => e.fact).filter(Boolean).join(", ");
}
function ia(a, e, t) {
  const i = fe(a[e], 0);
  let n = i;
  return typeof t.value == "number" && (n += t.value), typeof t.min == "number" && (n = Math.max(t.min, n)), typeof t.max == "number" && (n = Math.min(t.max, n)), a[e] = n, n - i;
}
function gi(a, e, t, i, n) {
  i && a.push({
    id: `trait:${n}:${e.id}:${t.id}`,
    label: t.label || e.name,
    value: i,
    source: e.name,
    traitItemId: e.id,
    traitEffectId: t.id
  });
}
function ap({ item: a, effect: e, phase: t, packet: i, result: n }) {
  switch (e.type) {
    case "rollMod": {
      const s = fe(e.value, 0);
      return gi(n.modifiers, a, e, s, t), s;
    }
    case "burnAdjust": {
      if (t === "onEndOfActivation") {
        const r = ia(i, "burnDelta", e);
        return gi(n.modifiers, a, e, r, t), r;
      }
      const s = ia(i, "amount", e);
      return gi(n.modifiers, a, e, s, t), s;
    }
    case "actionCostMod": {
      const s = ia(i, "cost", e);
      return gi(n.modifiers, a, e, s, t), s;
    }
    case "initiativeMod": {
      const s = ia(i, "total", e);
      return gi(n.modifiers, a, e, s, t), s;
    }
    case "damageMod": {
      const s = ia(i, "amount", e);
      return gi(n.modifiers, a, e, s, t), s;
    }
    case "edgeEvent": {
      if (t === "onEndOfActivation" && e.operation === "grantPool" && e.pool)
        return i.edgeAdjustments ?? (i.edgeAdjustments = []), i.edgeAdjustments.push({
          poolKey: e.pool,
          amount: fe(e.value, 0),
          label: e.label || a.name,
          source: a.name
        }), gi(n.modifiers, a, e, fe(e.value, 0), t), fe(e.value, 0);
      const s = ia(i, "amount", e);
      return gi(n.modifiers, a, e, s, t), s;
    }
    default:
      return 0;
  }
}
function np(a, e, t) {
  const i = Su(a, e), n = [];
  return t.perActivation > 0 && n.push({ kind: "usage", scope: "perActivation", key: i, delta: 1 }), t.perRound > 0 && n.push({ kind: "usage", scope: "perRound", key: i, delta: 1 }), t.perScene > 0 && n.push({ kind: "usage", scope: "perScene", key: i, delta: 1 }), n;
}
function Au(a = "") {
  const e = re(a);
  return e ? [`action.${e}`] : [];
}
function Zi(a, e = {}) {
  var l, o, c, u, d;
  const t = e.snapshot ?? null, i = e.state ?? (t == null ? void 0 : t.state) ?? {}, n = Array.isArray(i == null ? void 0 : i.actionLog) ? i.actionLog.map((m) => re(m == null ? void 0 : m.id)).filter(Boolean) : [], s = (i == null ? void 0 : i.actionState) ?? {}, r = [];
  return s != null && s.aim && r.push("state.aim"), s != null && s.preparedInterrupt && r.push("state.preparedInterrupt"), {
    activation: {
      moved: n.includes("move") || !!((l = s == null ? void 0 : s.move) != null && l.moved),
      saSpent: Math.max(0, Math.trunc(fe(i == null ? void 0 : i.saSpentThisActivation, 0))),
      attacksThisActivation: Math.max(0, Math.trunc(fe(i == null ? void 0 : i.attacksThisActivation, 0))),
      burnThisActivation: Math.max(0, Math.trunc(fe(i == null ? void 0 : i.burnThisActivation, 0)))
    },
    actionState: {
      aim: (s == null ? void 0 : s.aim) ?? null,
      move: (s == null ? void 0 : s.move) ?? null,
      preparedInterrupt: (s == null ? void 0 : s.preparedInterrupt) ?? null
    },
    burn: {
      current: Math.max(0, Math.trunc(fe((c = (o = a == null ? void 0 : a.system) == null ? void 0 : o.burn) == null ? void 0 : c.value, 0))),
      overloaded: !!((d = (u = a == null ? void 0 : a.system) == null ? void 0 : u.burn) != null && d.overloaded)
    },
    timing: {
      firstAttackThisActivation: Math.max(0, Math.trunc(fe(i == null ? void 0 : i.attacksThisActivation, 0))) === 0,
      firstExtraSAThisActivation: Math.max(0, Math.trunc(fe(i == null ? void 0 : i.saSpentThisActivation, 0))) <= 3
    },
    selectors: r
  };
}
function wo({ actor: a, resolved: e, payload: t, runtime: i = {} } = {}) {
  var d, m, f, p, h, g, y, b, S, v, M, N;
  const n = Zi(a, i), s = re((e == null ? void 0 : e.intent) ?? (t == null ? void 0 : t.intent), "skill"), r = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [], l = re(((d = e == null ? void 0 : e.attack) == null ? void 0 : d.rangeBand) ?? (t == null ? void 0 : t.rangeBand)), o = re(((f = (m = t == null ? void 0 : t.edge) == null ? void 0 : m.pre) == null ? void 0 : f.poolKey) ?? ((p = t == null ? void 0 : t.edge) == null ? void 0 : p.poolKey) ?? ""), c = re(
    ((h = e == null ? void 0 : e.data) == null ? void 0 : h.skillKey) ?? ((g = e == null ? void 0 : e.specialization) == null ? void 0 : g.skillKey) ?? (s === "skill" ? t == null ? void 0 : t.key : "")
  ), u = re(
    ((S = (b = (y = e == null ? void 0 : e.breakdown) == null ? void 0 : y.find) == null ? void 0 : b.call(y, (P) => (P == null ? void 0 : P.id) === "skill")) == null ? void 0 : S.label) ?? (e == null ? void 0 : e.title)
  );
  return n.intent = s, n.domains = r, n.rangeBand = l, n.skill = {
    key: c,
    label: u
  }, n.edge = {
    stage: (v = t == null ? void 0 : t.toggles) != null && v.useEdge ? "pre" : "",
    pool: o,
    spent: !!((M = t == null ? void 0 : t.toggles) != null && M.useEdge)
  }, n.selectors.push(`intent.${s}`), r.forEach((P) => n.selectors.push(`domain.${P}`)), l && n.selectors.push(`range.${l}`), s === "skill" && c && n.selectors.push(`skill.${c}`), (N = t == null ? void 0 : t.toggles) != null && N.useEdge && n.selectors.push("edge.pre"), n;
}
function Tu({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Zi(a, t);
  return i.action = {
    id: re(e.actionId),
    category: re(e.category),
    resource: re(e.resource),
    cost: fe(e.cost, 0),
    effectiveCost: fe(e.effectiveCost ?? e.cost, 0)
  }, i.selectors.push(...Au(e.actionId)), i.action.category && i.selectors.push(`actionCategory.${i.action.category}`), i.action.resource && i.selectors.push(`actionResource.${i.action.resource}`), i;
}
function Mn({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Zi(a, t);
  return i.action = {
    id: re(e.actionId),
    category: re(e.category),
    resource: re(e.resource)
  }, i.burn = {
    ...i.burn,
    amount: fe(e.amount, 0),
    source: re(e.source)
  }, e.source === "extraSA" && e.extraSaIndex === 1 && i.selectors.push("activation.extraSA:first"), e.source && i.selectors.push(`burn.${e.source}`), i.action.id && i.selectors.push(...Au(i.action.id)), i.action.category && i.selectors.push(`actionCategory.${i.action.category}`), i.action.category === "reaction" && i.selectors.push(`reaction.${i.action.id}`), i;
}
function wu({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Zi(a, t);
  return i.intent = "initiative", i.domains = ["combat"], i.initiative = {
    total: fe(e.total, 0)
  }, i.selectors.push("intent.initiative"), i;
}
function vu({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Zi(a, t);
  return i.damage = {
    amount: fe(e.amount, 0),
    track: re(e.track),
    damageType: re(e.damageType)
  }, i.selectors.push("incoming"), i;
}
function br({ actor: a, packet: e = {}, phase: t = "onEdgeGain", runtime: i = {} } = {}) {
  const n = Zi(a, i);
  return n.edge = {
    pool: re(e.poolKey),
    amount: fe(e.amount, 0),
    eventKey: re(e.eventKey),
    source: re(e.source)
  }, n.selectors.push(t === "onEdgeSpend" ? "edge.spend" : "edge.gain"), n.edge.eventKey && n.selectors.push(`event.${n.edge.eventKey}`), n;
}
function ku({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Zi(a, t);
  return i.event = {
    phase: "endOfActivation"
  }, i.selectors.push("endOfActivation"), fe(e.burnDelta, 0) !== 0 && i.selectors.push("burn.adjust"), i;
}
function Et({ actor: a, phase: e, facts: t = {}, packet: i = {}, options: n = {} } = {}) {
  var u;
  const s = {
    packet: Vn(i),
    modifiers: [],
    mutations: [],
    applied: [],
    skipped: []
  };
  if (!a || !pu.has(String(e ?? "").trim()))
    return s;
  const r = n.runtime ?? {}, l = Jf(a, r), o = bu(r), c = Yf(a);
  for (const { item: d, system: m } of c) {
    if (ip(d, m)) {
      s.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: "Trait is inactive"
      });
      continue;
    }
    const f = m.prerequisites.filter((p) => re(p == null ? void 0 : p.fact)).filter((p) => !nl(p, t));
    if (f.length) {
      s.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: `Prerequisites not met: ${sl(f)}`
      });
      continue;
    }
    for (const p of m.effects.filter((h) => h.phase === e)) {
      if (!tp(p.selector, t)) {
        s.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: `Selector did not match (${p.selector || "any"})`
        });
        continue;
      }
      if (gu(p) && p.skillKeys.length) {
        const v = re((u = t == null ? void 0 : t.skill) == null ? void 0 : u.key);
        if (!v || !p.skillKeys.includes(v)) {
          s.skipped.push({
            traitItemId: d.id,
            traitEffectId: p.id,
            label: p.label || d.name,
            reason: `Skill did not match (${p.skillKeys.join(", ")})`
          });
          continue;
        }
      }
      const h = p.conditions.filter((v) => re(v == null ? void 0 : v.fact)).filter((v) => !nl(v, t));
      if (h.length) {
        s.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: `Conditions not met: ${sl(h)}`
        });
        continue;
      }
      const g = Qf(m.limits, p.limit), y = Su(d, p), b = Zf(l, o, g, y);
      if (b.length) {
        s.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: b.join(", ")
        });
        continue;
      }
      const S = ap({
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
      }), n.consumeUsage && s.mutations.push(...np(d, p, g));
    }
  }
  return s;
}
async function mi({ actor: a, mutations: e = [], runtime: t = {} } = {}) {
  var l, o, c, u, d, m, f, p, h;
  if (!a || !Array.isArray(e) || !e.length) return;
  const i = e.filter((g) => (g == null ? void 0 : g.kind) === "usage");
  if (!i.length) return;
  const n = Vn(((c = (o = (l = a.flags) == null ? void 0 : l[T]) == null ? void 0 : o.traitUsage) == null ? void 0 : c.scene) ?? {}), s = t.state ? Vn(t.state) : null, r = bu(t);
  for (const g of i) {
    const y = re(g.key), b = Math.max(0, Math.trunc(fe(g.delta, 0)));
    if (!(!y || !b))
      switch (g.scope) {
        case "perActivation": {
          if (!s) break;
          s.traitUsage ?? (s.traitUsage = {}), (u = s.traitUsage).activation ?? (u.activation = {}), s.traitUsage.activation[y] = Math.max(0, fe(s.traitUsage.activation[y], 0) + b);
          break;
        }
        case "perRound": {
          if (!s || !r.roundKey) break;
          s.traitUsage ?? (s.traitUsage = {}), (d = s.traitUsage).round ?? (d.round = {}), (m = s.traitUsage.round)[f = r.roundKey] ?? (m[f] = {}), s.traitUsage.round[r.roundKey][y] = Math.max(
            0,
            fe(s.traitUsage.round[r.roundKey][y], 0) + b
          );
          break;
        }
        case "perScene": {
          if (!r.sceneKey) break;
          n[p = r.sceneKey] ?? (n[p] = {}), n[r.sceneKey][y] = Math.max(0, fe(n[r.sceneKey][y], 0) + b);
          break;
        }
      }
  }
  s && ((h = t.combatant) != null && h.id) && await t.combatant.setFlag(T, "personalCombat", s), await a.setFlag(T, "traitUsage", { scene: n });
}
const Eu = "personalActionCatalog", Ce = Object.freeze({
  standard: "standard",
  complex: "complex",
  free: "free",
  reaction: "reaction",
  recovery: "recovery"
}), Sr = Object.freeze([
  { value: Ce.standard, label: "Standard" },
  { value: Ce.complex, label: "Complex" },
  { value: Ce.free, label: "Free" },
  { value: Ce.reaction, label: "Reaction" },
  { value: Ce.recovery, label: "Burn & Recovery" }
]), Mu = Object.freeze([
  { value: "", label: "Not Implemented / Placeholder" },
  { value: "combatAction", label: "Generic Action" },
  { value: "combatAttack", label: "Attack Pipeline" },
  { value: "combatEvade", label: "Evade" },
  { value: "combatAssist", label: "Assist" },
  { value: "combatInterrupt", label: "Interrupt" },
  { value: "combatReduceBurn", label: "Reduce Burn" },
  { value: "combatOverloadCheck", label: "Overload Check" }
]), rl = new Set(Sr.map((a) => a.value)), ol = new Set(Mu.map((a) => a.value)), Cu = Object.freeze([
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
].map((a) => Object.freeze(ys(a)))), sp = new Map(Cu.map((a) => [a.id, a]));
function ys(a) {
  return JSON.parse(JSON.stringify(a ?? null));
}
function ll(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return ["true", "1", "yes", "y", "on"].includes(t) ? !0 : ["false", "0", "no", "n", "off", ""].includes(t) ? !1 : e;
}
function rp(a, e = null) {
  var i;
  const t = String((a == null ? void 0 : a.rollIntent) ?? ((i = a == null ? void 0 : a.roll) == null ? void 0 : i.intent) ?? (e == null ? void 0 : e.intent) ?? "").trim();
  return t ? { intent: t } : null;
}
function op(a, { strict: e = !1, index: t = 0 } = {}) {
  const i = String((a == null ? void 0 : a.id) ?? "").trim(), n = sp.get(i) ?? {}, s = `Row ${t + 1}`, r = [];
  i || r.push(`${s}: id cannot be blank.`);
  const l = String((a == null ? void 0 : a.category) ?? n.category ?? "").trim();
  rl.has(l) || r.push(`${s}: category must be one of ${Array.from(rl).join(", ")}.`);
  const o = String((a == null ? void 0 : a.label) ?? n.label ?? "").trim();
  o || r.push(`${s}: label cannot be blank.`);
  const c = (a == null ? void 0 : a.cost) ?? n.cost ?? 0, u = Number(c);
  (!Number.isFinite(u) || u < 0) && r.push(`${s}: cost must be a non-negative number.`);
  const d = String((a == null ? void 0 : a.handler) ?? n.handler ?? "").trim();
  if (ol.has(d) || r.push(`${s}: handler must be one of ${Array.from(ol).map((p) => p || "(blank)").join(", ")}.`), r.length) {
    if (e) {
      const p = new Error(r[0]);
      throw p.validationErrors = r, p;
    }
    return null;
  }
  const m = {
    ...ys(n),
    id: i,
    label: o,
    category: l,
    cost: Math.trunc(u),
    handler: d,
    description: String((a == null ? void 0 : a.description) ?? n.description ?? "").trim(),
    reason: String((a == null ? void 0 : a.reason) ?? n.reason ?? "").trim(),
    prominent: ll(a == null ? void 0 : a.prominent, !!n.prominent),
    prominentWhenBurning: ll(a == null ? void 0 : a.prominentWhenBurning, !!n.prominentWhenBurning)
  };
  m.id === "opportunity" && !m.handler && (m.handler = "combatAttack", m.reason = ""), m.id === "opportunity" && m.handler === "combatAttack" && m.reason === "Opportunity attacks are not yet implemented." && (m.reason = ""), m.id === "assist" && !m.handler && (m.handler = "combatAssist", m.reason = ""), m.id === "assist" && m.handler === "combatAssist" && m.reason === "Reaction assist effects are not yet implemented." && (m.reason = ""), m.id === "interrupt" && !m.handler && (m.handler = "combatInterrupt", m.reason = ""), m.id === "interrupt" && m.handler === "combatInterrupt" && m.reason === "Prepared interrupt resolution is not yet implemented." && (m.reason = "");
  const f = rp(a, n.roll ?? null);
  return f ? m.roll = f : delete m.roll, m.reason || delete m.reason, m.description || delete m.description, m.prominent || delete m.prominent, m.prominentWhenBurning || delete m.prominentWhenBurning, m;
}
function vo() {
  return ys(Cu);
}
function rn(a, { strict: e = !1 } = {}) {
  if (!Array.isArray(a)) {
    if (e) {
      const s = new Error("Action catalog must be an array.");
      throw s.validationErrors = [s.message], s;
    }
    return vo();
  }
  const t = [], i = /* @__PURE__ */ new Set(), n = [];
  if (a.forEach((s, r) => {
    try {
      const l = op(s, { strict: e, index: r });
      if (!l) return;
      const o = l.id.toLowerCase();
      if (i.has(o)) {
        const c = `Row ${r + 1}: duplicate action id "${l.id}".`;
        e && n.push(c);
        return;
      }
      i.add(o), t.push(l);
    } catch (l) {
      e && n.push(...Array.isArray(l.validationErrors) ? l.validationErrors : [l.message]);
    }
  }), n.length) {
    const s = new Error(n[0]);
    throw s.validationErrors = n, s;
  }
  return t;
}
function Pu() {
  var a, e;
  try {
    const t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.get) == null ? void 0 : e.call(a, T, Eu);
    return rn(t, { strict: !1 });
  } catch {
    return vo();
  }
}
function Cn(a) {
  const e = String(a ?? "").trim();
  return Pu().find((t) => t.id === e) ?? null;
}
function lp(a) {
  return Pu().filter((e) => e.category === a).map((e) => Object.freeze(ys(e)));
}
const ji = "hazard";
function cp(a) {
  return a && typeof a == "object" ? a : {};
}
function Ri(a) {
  var n, s, r;
  const e = ((n = a == null ? void 0 : a.getFlag) == null ? void 0 : n.call(a, "mwd", ji)) ?? ((r = (s = a == null ? void 0 : a.flags) == null ? void 0 : s.mwd) == null ? void 0 : r[ji]) ?? null;
  if (!e || typeof e != "object") return null;
  const t = fi(e.areaEffect ?? { kind: ut.persistent, hazard: e.hazardDef }), i = Oe(
    e.templateGeometry,
    {
      template: e.template,
      placement: e.templatePlacement
    }
  ) ?? null;
  return {
    ...foundry.utils.deepClone(cp(e)),
    areaEffect: t,
    hazardDef: so(e.hazardDef ?? t.hazard ?? {}),
    templateGeometry: i
  };
}
function up(a) {
  return !!Ri(a);
}
async function Bs(a) {
  var i, n, s;
  const e = ((i = a == null ? void 0 : a.getFlag) == null ? void 0 : i.call(a, "mwd", ji)) ?? ((s = (n = a == null ? void 0 : a.flags) == null ? void 0 : n.mwd) == null ? void 0 : s[ji]) ?? null;
  if (!e || typeof e != "object") return null;
  if (e != null && e.templateGeometry) return Ri(a);
  const t = Ri(a);
  return !(t != null && t.templateGeometry) || !(a != null && a.setFlag) ? t : (await a.setFlag("mwd", ji, {
    ...foundry.utils.deepClone(e),
    templateGeometry: ei(t.templateGeometry)
  }), Ri(a));
}
async function dp({ attacker: a = null, attack: e = {}, targetResult: t = null } = {}) {
  var c, u, d, m, f, p, h, g, y, b, S, v;
  const i = (canvas == null ? void 0 : canvas.scene) ?? null;
  if (!i) return null;
  const n = Oe(
    e == null ? void 0 : e.templateGeometry,
    {
      template: e == null ? void 0 : e.template,
      placement: e == null ? void 0 : e.templatePlacement
    }
  ), s = fi((e == null ? void 0 : e.areaEffect) ?? ((c = e == null ? void 0 : e.payload) == null ? void 0 : c.areaEffect) ?? {});
  if (s.kind !== ut.persistent || !n) return null;
  const r = ls(n);
  if (!r.length) return null;
  const l = {
    sourceActorUuid: (a == null ? void 0 : a.uuid) ?? null,
    sourceItemUuid: ((u = e == null ? void 0 : e.weapon) == null ? void 0 : u.uuid) ?? null,
    payloadId: ((d = e == null ? void 0 : e.payloadState) == null ? void 0 : d.activePayloadId) ?? ((m = e == null ? void 0 : e.payload) == null ? void 0 : m.id) ?? "",
    templateGeometry: ei(n),
    templatePlacement: foundry.utils.deepClone((e == null ? void 0 : e.templatePlacement) ?? null),
    template: foundry.utils.deepClone((e == null ? void 0 : e.template) ?? null),
    damage: Number(((f = t == null ? void 0 : t.damage) == null ? void 0 : f.effectiveWeaponDamage) ?? ((p = e == null ? void 0 : e.weapon) == null ? void 0 : p.damage) ?? 0) || 0,
    ap: Number((e == null ? void 0 : e.totalAp) ?? ((h = e == null ? void 0 : e.weapon) == null ? void 0 : h.ap) ?? 0) || 0,
    damageType: String(((g = t == null ? void 0 : t.damage) == null ? void 0 : g.damageType) ?? ((y = e == null ? void 0 : e.weapon) == null ? void 0 : y.damageType) ?? "concussive").trim() || "concussive",
    label: `${String(((b = e == null ? void 0 : e.weapon) == null ? void 0 : b.name) ?? "Hazard").trim() || "Hazard"} (${Ct(((S = s.hazard) == null ? void 0 : S.startExposure) ?? "minor")})`,
    areaEffect: s,
    hazardDef: s.hazard
  }, [o] = await i.createEmbeddedDocuments("Region", [{
    name: l.label,
    color: ((v = game.user) == null ? void 0 : v.color) ?? "#d86a2c",
    shapes: r,
    flags: {
      mwd: {
        [ji]: l
      }
    }
  }]);
  return o ?? null;
}
function cl(a = null) {
  var s, r, l, o;
  const e = (a == null ? void 0 : a.document) ?? a ?? null;
  if (!e) return [];
  const t = (e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null;
  if (!t) return [];
  const i = ((s = e == null ? void 0 : e.object) == null ? void 0 : s.center) ?? (e == null ? void 0 : e.center) ?? {
    x: Number((e == null ? void 0 : e.x) ?? 0) + (Number((e == null ? void 0 : e.width) ?? 1) || 1) * (Number(((r = canvas == null ? void 0 : canvas.grid) == null ? void 0 : r.size) ?? 100) || 100) / 2,
    y: Number((e == null ? void 0 : e.y) ?? 0) + (Number((e == null ? void 0 : e.height) ?? 1) || 1) * (Number(((l = canvas == null ? void 0 : canvas.grid) == null ? void 0 : l.size) ?? 100) || 100) / 2
  }, n = {
    x: Number((i == null ? void 0 : i.x) ?? 0) || 0,
    y: Number((i == null ? void 0 : i.y) ?? 0) || 0,
    elevation: Number((e == null ? void 0 : e.elevation) ?? ((o = e == null ? void 0 : e.object) == null ? void 0 : o.elevation) ?? 0) || 0
  };
  return Array.from(t.regions ?? []).filter(up).filter((c) => {
    var u, d, m;
    if ((d = (u = c == null ? void 0 : c.tokens) == null ? void 0 : u.has) != null && d.call(u, e)) return !0;
    try {
      return ((m = c == null ? void 0 : c.testPoint) == null ? void 0 : m.call(c, n)) ?? !1;
    } catch {
      return !1;
    }
  });
}
function bi(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function mp({ actor: a = null, token: e = null } = {}) {
  var s;
  const t = (e == null ? void 0 : e.document) ?? e ?? null, i = String(((s = t == null ? void 0 : t.texture) == null ? void 0 : s.src) ?? "").trim(), n = String((a == null ? void 0 : a.img) ?? "").trim();
  return i || n || "icons/svg/mystery-man.svg";
}
function fp(a = []) {
  return Array.isArray(a) ? a.map((e) => ({
    key: String((e == null ? void 0 : e.key) ?? "").trim(),
    label: String((e == null ? void 0 : e.label) ?? (e == null ? void 0 : e.key) ?? "").trim(),
    value: bi(e == null ? void 0 : e.value, 0)
  })).filter((e) => e.key) : [];
}
function ko(a = {}) {
  var c, u, d;
  const e = (a == null ? void 0 : a.preview) ?? {}, t = De(((c = a == null ? void 0 : a.exposure) == null ? void 0 : c.initialTier) ?? (a == null ? void 0 : a.exposureTier) ?? (a == null ? void 0 : a.tier), "none"), i = De(
    ((u = a == null ? void 0 : a.exposure) == null ? void 0 : u.finalTier) ?? (e.evadeActive ? e.finalTier : t),
    t
  ), n = Di({
    tier: t,
    appliedTier: i,
    evadeUsed: !!(e.evadeActive && t !== i),
    evadeLocked: !!((a == null ? void 0 : a.evadeLocked) ?? ((d = a == null ? void 0 : a.exposure) == null ? void 0 : d.evadeLocked))
  }), s = Math.max(0, bi(a == null ? void 0 : a.baseDamage, 0)), r = Math.max(0, bi(a == null ? void 0 : a.damageBefore, Gi(s, n.initialTier))), l = Math.max(0, bi(a == null ? void 0 : a.damageAfter, Gi(s, n.finalTier))), o = (e == null ? void 0 : e.reactionPreview) ?? {};
  return {
    kind: String((a == null ? void 0 : a.kind) ?? "hazard").trim() || "hazard",
    eventType: String((a == null ? void 0 : a.eventType) ?? "entry").trim() || "entry",
    regionId: String((a == null ? void 0 : a.regionId) ?? "").trim(),
    regionName: String((a == null ? void 0 : a.regionName) ?? (a == null ? void 0 : a.label) ?? "Hazard").trim() || "Hazard",
    actorUuid: String((a == null ? void 0 : a.actorUuid) ?? "").trim() || null,
    tokenUuid: String((a == null ? void 0 : a.tokenUuid) ?? "").trim() || null,
    actorName: String((a == null ? void 0 : a.actorName) ?? "Target").trim() || "Target",
    turnsExposed: Math.max(0, bi(a == null ? void 0 : a.turnsExposed, 0)),
    baseDamage: s,
    ap: Math.max(0, bi(a == null ? void 0 : a.ap, 0)),
    damageType: Gt(a == null ? void 0 : a.damageType, "concussive"),
    damageTypeLabel: qt((a == null ? void 0 : a.damageType) ?? "concussive") || "Damage",
    source: String((a == null ? void 0 : a.source) ?? (a == null ? void 0 : a.regionName) ?? "Hazard").trim() || "Hazard",
    applied: !!(a != null && a.applied),
    applyReason: String((a == null ? void 0 : a.applyReason) ?? "").trim(),
    onFullBurnDelta: Math.max(0, bi(a == null ? void 0 : a.onFullBurnDelta, 0)),
    exposure: n,
    damageBefore: r,
    damageAfter: l,
    nextTier: De(a == null ? void 0 : a.nextTier, n.finalTier),
    nextLabel: Ct((a == null ? void 0 : a.nextTier) ?? n.finalTier),
    preview: {
      evadeActive: !!e.evadeActive,
      edgePoolKey: String(e.edgePoolKey ?? "").trim() || null,
      finalTier: n.finalTier,
      burnDelta: bi(o == null ? void 0 : o.burnDelta, 0),
      canSpendEdge: !!(o != null && o.canSpendEdge),
      edgePools: fp(o == null ? void 0 : o.edgePools)
    }
  };
}
function pp(a = {}, { actor: e = null, token: t = null } = {}) {
  const i = ko(a), n = i.eventType === "tick" ? "Hazard Tick" : i.eventType === "exit" ? "Hazard Exit" : "Hazard Entry", s = i.exposure.initialLabel === i.exposure.finalLabel ? i.exposure.initialLabel : `${i.exposure.initialLabel} -> ${i.exposure.finalLabel}`, r = i.damageBefore === i.damageAfter ? String(i.damageAfter) : `${i.damageBefore} -> ${i.damageAfter}`;
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
      image: mp({ actor: e, token: t })
    },
    rows: [
      { label: "Exposure", value: s },
      { label: "Damage", value: r },
      { label: "Next Tier", value: i.nextLabel },
      { label: "Turns Exposed", value: String(i.turnsExposed) }
    ],
    reactionHint: i.exposure.evadeLocked ? "Evade is locked for this hazard." : i.preview.evadeActive ? i.preview.edgePoolKey ? "Evade active. Reaction Burn canceled by Edge." : i.preview.burnDelta > 0 ? `Evade active. This reaction adds +${i.preview.burnDelta} Burn.` : "Evade active." : "",
    actions: i.applied ? [] : hp(i)
  };
}
function hp(a = {}) {
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
async function Nu(a = {}, { actor: e = null, token: t = null } = {}) {
  return foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-hazard-card",
    pp(a, { actor: e, token: t })
  );
}
const Ve = "mwd", Ye = "personalCombat", Bi = "preparedInterrupt", gp = "systems/mwd/img/icons/status/readied_action.svg", Ai = 3, yp = 1, bp = 1;
function fn(a, e) {
  return !(a != null && a.activation) || !e ? !1 : a.activation.combatId === e.combatId && Number(a.activation.round ?? -1) === Number(e.round ?? -1) && Number(a.activation.turn ?? -1) === Number(e.turn ?? -1) && a.activation.combatantId === e.combatantId;
}
function Eo(a = null) {
  return {
    saRemaining: Ai,
    faRemaining: yp,
    raRemaining: bp,
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
function Pn(a, e = null) {
  return foundry.utils.mergeObject(
    Eo(e),
    foundry.utils.deepClone(a ?? {}),
    { inplace: !1, overwrite: !0 }
  );
}
function aa(a, e = null) {
  const t = Pn(a ?? {}, (a == null ? void 0 : a.activation) ?? e);
  return t.actionLog = Ua(t.actionLog), t.hazards = Yn(t.hazards), t.pendingReaction = Nn(t.pendingReaction), t;
}
function Yn(a) {
  return !a || typeof a != "object" ? {} : Object.fromEntries(
    Object.entries(a).map(([e, t]) => {
      const i = String(e ?? "").trim();
      return !i || !t || typeof t != "object" ? null : [i, {
        tier: De(t.tier, ie.none),
        turnsExposed: Math.max(0, Number(t.turnsExposed ?? 0) || 0),
        evadeLocked: !!t.evadeLocked,
        lastProcessedRound: Number(t.lastProcessedRound ?? 0) || 0
      }];
    }).filter(Boolean)
  );
}
function Nn(a) {
  if (!a || typeof a != "object") return null;
  const e = String(a.type ?? "").trim();
  return e ? {
    type: e,
    sourceKind: String(a.sourceKind ?? "").trim() || null,
    sourceId: String(a.sourceId ?? "").trim() || null,
    messageId: String(a.messageId ?? "").trim() || null,
    resultIndex: Number.isInteger(Number(a.resultIndex)) ? Number(a.resultIndex) : null,
    exposureBefore: De(a.exposureBefore, ie.none),
    exposureAfterPreview: De(a.exposureAfterPreview, ie.none),
    edgePoolKey: String(a.edgePoolKey ?? "").trim() || null,
    allowCurrentTurn: !!a.allowCurrentTurn
  } : null;
}
function Ua(a) {
  return Array.isArray(a) ? a.map((e) => {
    const t = String((e == null ? void 0 : e.label) ?? "").trim();
    return t ? {
      id: String((e == null ? void 0 : e.id) ?? "").trim(),
      label: t,
      costLabel: String((e == null ? void 0 : e.costLabel) ?? "").trim()
    } : null;
  }).filter(Boolean) : [];
}
function Sp(a = []) {
  return Ua(a).filter((e) => {
    const t = Cn(e == null ? void 0 : e.id);
    return (t == null ? void 0 : t.category) === Ce.reaction;
  });
}
function ul(a = null, e = null) {
  const t = Eo(e);
  return t.reactionBurnSinceLastActivation = Math.max(0, Number((a == null ? void 0 : a.reactionBurnSinceLastActivation) ?? 0) || 0), t.actionLog = Sp(a == null ? void 0 : a.actionLog), t.hazards = Yn(a == null ? void 0 : a.hazards), t;
}
function Ap(a, e) {
  return a === "free" ? "Free" : a === "burn" ? `+${e} Burn` : `${e} ${String(a).toUpperCase()}`;
}
function Tp(a = {}, e = "", { snapshot: t = null, metadata: i = {} } = {}) {
  var r, l, o, c;
  const n = foundry.utils.deepClone(a ?? {});
  n.actionState ?? (n.actionState = {});
  const s = {
    actionId: e,
    round: Number(((r = t == null ? void 0 : t.combat) == null ? void 0 : r.round) ?? 0),
    turn: Number(((l = t == null ? void 0 : t.combat) == null ? void 0 : l.turn) ?? 0),
    combatantId: ((o = t == null ? void 0 : t.combatant) == null ? void 0 : o.id) ?? null
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
function Ra(a = {}) {
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
function wp(a = null) {
  if (!a) return "";
  const e = [];
  return a.condition && e.push(`Trigger: ${a.condition}`), a.scope && e.push(`Scope: ${a.scope}`), e.join(" | ");
}
function dl() {
  return (CONFIG.statusEffects ?? []).find((a) => String((a == null ? void 0 : a.id) ?? "").trim() === Bi) ?? {
    id: Bi,
    name: "Prepared",
    icon: gp
  };
}
function vp(a) {
  const e = (CONFIG.statusEffects ?? []).find((i) => String((i == null ? void 0 : i.id) ?? "").trim() === a), t = String((e == null ? void 0 : e.name) ?? (e == null ? void 0 : e.label) ?? a ?? "").trim();
  return go(t);
}
function na(a) {
  const e = Number(a);
  return !Number.isFinite(e) || e === 0 ? "0" : e > 0 ? `+${e}` : String(e);
}
function kp(a) {
  if (typeof a == "number") return Number.isFinite(a) ? a : 0;
  const e = String(a ?? "").trim().match(/[-+]?\d+(\.\d+)?/);
  return e ? Number(e[0]) : 0;
}
function ml(a) {
  var l;
  const e = (a == null ? void 0 : a.document) ?? a ?? null, t = (a == null ? void 0 : a.object) ?? (e == null ? void 0 : e.object) ?? a ?? null, i = String((e == null ? void 0 : e.id) ?? "").trim(), n = x._pendingTokenPositions.get(i) ?? null, s = Number((n == null ? void 0 : n.x) ?? (e == null ? void 0 : e.x)), r = Number((n == null ? void 0 : n.y) ?? (e == null ? void 0 : e.y));
  if (t && Number.isFinite(s) && Number.isFinite(r)) {
    if (typeof t.getCenterPoint == "function")
      return t.getCenterPoint({ x: s, y: r });
    if (typeof t.getCenter == "function")
      return t.getCenter(s, r);
  }
  return (t == null ? void 0 : t.center) ?? ((l = e == null ? void 0 : e.object) == null ? void 0 : l.center) ?? null;
}
function Ep(a, e = "") {
  if (!Number.isFinite(a)) return "";
  const t = Math.round(a * 10) / 10, i = Number.isInteger(t) ? String(t) : t.toFixed(1);
  return e ? `${i} ${e}` : i;
}
function fl(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
function zs(a) {
  return !!Ri(a);
}
function Mp(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [];
  if (!e.length) return "";
  const t = e.slice().sort((n, s) => Ci(s == null ? void 0 : s.tier) - Ci(n == null ? void 0 : n.tier))[0] ?? null;
  if (!t) return "";
  const i = `HAZARD ${Ct(t.tier)} (${Math.max(0, Number(t.turnsExposed ?? 0) || 0)})`;
  return t.evadeLocked ? `${i} LOCK` : i;
}
const da = class da {
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
    var r, l, o, c, u;
    const n = String(e ?? "").trim();
    if (!n || !t) return null;
    const s = ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id) === t ? canvas.scene : (o = (l = game.scenes) == null ? void 0 : l.get) == null ? void 0 : o.call(l, t);
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
    var i, n, s, r, l;
    const t = this._asTokenDocument(e == null ? void 0 : e.token);
    return String(
      (e == null ? void 0 : e.sceneId) ?? ((i = e == null ? void 0 : e._source) == null ? void 0 : i.sceneId) ?? ((n = t == null ? void 0 : t.parent) == null ? void 0 : n.id) ?? ((s = t == null ? void 0 : t.scene) == null ? void 0 : s.id) ?? ((l = (r = t == null ? void 0 : t.object) == null ? void 0 : r.scene) == null ? void 0 : l.id) ?? ""
    ).trim();
  }
  static _findCombatantForToken(e, t = null, i = ((n) => (n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.id)()) {
    var o, c, u;
    const s = this._asTokenDocument(t), r = String((s == null ? void 0 : s.id) ?? "").trim();
    if (!e || !r) return null;
    if (((c = (o = s == null ? void 0 : s.combatant) == null ? void 0 : o.combat) == null ? void 0 : c.id) === e.id) return s.combatant;
    let l = null;
    if (typeof e.getCombatantsByToken == "function")
      try {
        l = ((u = e.getCombatantsByToken(r)) == null ? void 0 : u[0]) ?? null;
      } catch {
        l = null;
      }
    else if (typeof e.getCombatantByToken == "function")
      try {
        l = e.getCombatantByToken(r) ?? null;
      } catch {
        l = null;
      }
    return l || (this._getCombatants(e).find((d) => {
      const m = this._getCombatantTokenDocument(d, i), f = this._getCombatantTokenId(d) || String((m == null ? void 0 : m.id) ?? "").trim(), p = this._getCombatantSceneId(d) || i;
      return f === r && (!i || !p || p === i);
    }) ?? null);
  }
  static _collectActorIds(e, t = null) {
    var r, l;
    const i = /* @__PURE__ */ new Set(), n = (o) => {
      const c = String(o ?? "").trim();
      c && i.add(c);
    };
    n(e == null ? void 0 : e.id), n(e == null ? void 0 : e._id);
    const s = this._asTokenDocument(t) ?? this._asTokenDocument(e == null ? void 0 : e.token);
    return n((r = s == null ? void 0 : s.actor) == null ? void 0 : r.id), n((l = s == null ? void 0 : s.baseActor) == null ? void 0 : l.id), n(s == null ? void 0 : s.actorId), i;
  }
  static _tokenDocumentMatchesActor(e, t, i = null) {
    var r, l;
    const n = this._asTokenDocument(e);
    if (!n || !t) return !1;
    const s = i ?? this._collectActorIds(t, n);
    return [
      (r = n == null ? void 0 : n.actor) == null ? void 0 : r.id,
      (l = n == null ? void 0 : n.baseActor) == null ? void 0 : l.id,
      n == null ? void 0 : n.actorId
    ].some((o) => s.has(String(o ?? "").trim()));
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
    const l = String((r == null ? void 0 : r.id) ?? "").trim();
    if (l) {
      const b = this._getSceneTokenDocumentById(l, i);
      if (b) return b;
    }
    const c = ((g = (((h = e == null ? void 0 : e.getActiveTokens) == null ? void 0 : h.call(e, !0, !0)) ?? []).find((b) => {
      var S, v;
      return ((v = (S = b == null ? void 0 : b.document) == null ? void 0 : S.parent) == null ? void 0 : v.id) === i;
    })) == null ? void 0 : g.document) ?? null;
    if (c) return c;
    const u = Array.from(((y = canvas == null ? void 0 : canvas.scene) == null ? void 0 : y.tokens) ?? []), d = this._collectActorIds(e, r), m = u.filter((b) => this._tokenDocumentMatchesActor(b, e, d));
    return m.find((b) => {
      var S, v, M;
      return ((S = b == null ? void 0 : b.combatant) == null ? void 0 : S.id) === ((M = (v = game.combat) == null ? void 0 : v.combatant) == null ? void 0 : M.id);
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
    var l, o;
    const i = canvas == null ? void 0 : canvas.grid, n = ml(e), s = ml(t);
    if (!i || !n || !s) return null;
    if (typeof i.measurePath == "function")
      try {
        const c = i.measurePath([n, s], { gridSpaces: !0 }), u = Number(
          (c == null ? void 0 : c.distance) ?? (c == null ? void 0 : c.cost) ?? (c == null ? void 0 : c.totalDistance) ?? (c == null ? void 0 : c.totalCost) ?? NaN
        );
        if (Number.isFinite(u)) return u;
      } catch {
      }
    const r = ((o = (l = foundry == null ? void 0 : foundry.canvas) == null ? void 0 : l.geometry) == null ? void 0 : o.Ray) ?? globalThis.Ray;
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
    const s = i[0], r = this._measureTokenDistance(e, s), l = String(((d = (u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.grid) == null ? void 0 : d.units) ?? ((f = (m = game.system) == null ? void 0 : m.grid) == null ? void 0 : f.units) ?? "").trim(), o = Ep(r, l), c = String((s == null ? void 0 : s.name) ?? ((p = s == null ? void 0 : s.actor) == null ? void 0 : p.name) ?? "Target").trim() || "Target";
    return {
      count: n,
      none: !1,
      single: !0,
      multiple: !1,
      heading: "Target",
      primaryLabel: c,
      detailRows: o ? [{ label: "Distance", value: o }] : [],
      target: {
        id: (s == null ? void 0 : s.id) ?? null,
        name: c,
        img: ((g = (h = s == null ? void 0 : s.document) == null ? void 0 : h.texture) == null ? void 0 : g.src) ?? ((y = s == null ? void 0 : s.texture) == null ? void 0 : y.src) ?? "",
        distance: Number.isFinite(r) ? r : null,
        distanceLabel: o
      }
    };
  }
  static getRollImpact(e = []) {
    const t = (Array.isArray(e) ? e : []).map((n) => {
      const s = kp((n == null ? void 0 : n.numericValue) ?? (n == null ? void 0 : n.value) ?? 0);
      return {
        label: String((n == null ? void 0 : n.label) ?? "").trim() || "Modifier",
        numericValue: s,
        value: String((n == null ? void 0 : n.value) ?? na(s)).trim() || na(s)
      };
    }), i = t.reduce((n, s) => n + s.numericValue, 0);
    return {
      total: i,
      totalLabel: na(i),
      entries: t
    };
  }
  static getCombat(e, t = null) {
    var h;
    const i = (h = canvas == null ? void 0 : canvas.scene) == null ? void 0 : h.id, n = game.combat, s = this._getCombatSceneId(n), l = !!this._asTokenDocument(t), o = this.getCurrentSceneTokenDocument(e, t), c = (o == null ? void 0 : o.object) ?? this._getSceneTokenById((o == null ? void 0 : o.id) ?? null);
    if (!n || s && i && s !== i)
      return {
        combat: null,
        combatant: null,
        token: c,
        tokenDocument: o
      };
    let u = this._findCombatantForToken(n, o, i);
    const d = this._getCombatants(n);
    if (!u) {
      const g = this._collectActorIds(e, o), y = String((o == null ? void 0 : o.id) ?? "").trim(), b = d.filter((M) => {
        const N = this._getCombatantTokenId(M), P = this._getCombatantTokenDocument(M, i), U = N || String((P == null ? void 0 : P.id) ?? "").trim();
        return l && y ? U === y : g.has(this._getCombatantActorId(M)) ? !0 : this._tokenDocumentMatchesActor(P, e, g);
      }), S = b.find((M) => {
        var N;
        return M.id === ((N = n == null ? void 0 : n.combatant) == null ? void 0 : N.id);
      }) ?? null;
      u = b.find(
        (M) => {
          var N;
          return y && (this._getCombatantTokenId(M) || String(((N = this._getCombatantTokenDocument(M, i)) == null ? void 0 : N.id) ?? "").trim()) === y;
        }
      ) ?? null ?? S ?? b[0] ?? null;
    }
    const m = this._getCombatantTokenDocument(u, i), f = o ?? m ?? null, p = c ?? (m == null ? void 0 : m.object) ?? this._getSceneTokenById(this._getCombatantTokenId(u)) ?? null;
    return {
      combat: n,
      combatant: u,
      token: p,
      tokenDocument: f
    };
  }
  static getSnapshot(e, { token: t = null } = {}) {
    var P, U, K, Y, W;
    const {
      combat: i,
      combatant: n,
      token: s,
      tokenDocument: r
    } = this.getCombat(e, t), l = !!n && ((P = i == null ? void 0 : i.combatant) == null ? void 0 : P.id) === n.id, o = n ? this.getActivationIdentity(i, n) : null, c = n ? n.getFlag(Ve, Ye) : null, u = n ? l ? fn(c, o) ? aa(c, o) : ul(c, o) : aa(c, o) : Eo(o);
    u.actionLog = Ua(u.actionLog);
    const d = Math.max(0, Number(((K = (U = e == null ? void 0 : e.system) == null ? void 0 : U.burn) == null ? void 0 : K.value) ?? 0)), m = Math.floor(d / 2), f = !!((W = (Y = e == null ? void 0 : e.system) == null ? void 0 : Y.burn) != null && W.overloaded), p = Ra(u), h = this.getActiveStatuses(e), g = h.filter(
      (j) => !(f && j.id === "overloaded") && j.id !== Bi
    ), y = this.getModifierSummary(e, m), b = this.getRollImpact(y), S = Math.max(0, Number(u.burnThisActivation ?? 0)), v = n ? l ? "" : "Waiting for this combatant's activation." : "No combatant on the current scene.", M = [];
    f && M.push({ id: "overloaded", label: "Overloaded" }), p && M.push({
      id: "preparedInterrupt",
      label: "Prepared",
      hint: wp(p)
    });
    const N = Object.entries(u.hazards ?? {});
    if (N.length) {
      const j = N.map(([, L]) => L).sort((L, B) => Ci(B == null ? void 0 : B.tier) - Ci(L == null ? void 0 : L.tier))[0] ?? null;
      j && M.push({
        id: "hazard",
        label: `Hazard ${Ct(j.tier)}`,
        hint: `${N.length} active hazard${N.length === 1 ? "" : "s"}`
      });
    }
    return {
      token: s,
      tokenDocument: r,
      combat: i,
      combatant: n,
      hasCombatant: !!n,
      isCurrentTurn: l,
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
      summaryText: `SA: ${u.saRemaining} / ${Ai}   FA: ${u.faRemaining}   RA: ${u.raRemaining}`,
      activation: {
        burnThisActivation: S,
        burnThisActivationLabel: `+${S}`,
        items: [
          { label: "SA", value: `${u.saRemaining}/${Ai}` },
          { label: "FA", value: String(u.faRemaining) },
          { label: "RA", value: String(u.raRemaining) },
          { label: "Burn", value: `+${S}`, detail: "this activation" }
        ]
      },
      inactiveReason: v,
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
    const n = this.getSnapshot(e, { token: t }), s = Number(((u = n.state) == null ? void 0 : u.raRemaining) ?? 0) > 0, r = this.getAvailableReactionEdgePools(e), l = String(i ?? "").trim(), o = !s && r.some((d) => d.key === l);
    return {
      snapshot: n,
      usesReaction: s,
      burnDelta: s || o ? 0 : 2,
      canSpendEdge: !s && r.length > 0,
      edgePools: r,
      edgePoolKey: o ? l : null,
      costLabel: s ? "1 RA" : o ? `1 Edge (${l})` : "+2 Burn"
    };
  }
  static async commitReactionSpend(e, {
    token: t = null,
    actionId: i = "",
    actionLabel: n = "",
    actionCategory: s = Ce.reaction,
    logLabel: r = "",
    edgePoolKey: l = "",
    allowCurrentTurn: o = !1
  } = {}) {
    var h, g, y, b, S;
    const c = this.getReactionSpendPreview(e, { token: t, edgePoolKey: l }), u = c.snapshot;
    if (!u.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!o && u.isCurrentTurn) return { ok: !1, reason: "Only outside your activation." };
    const d = aa(u.combatant.getFlag(Ve, Ye), (h = u.state) == null ? void 0 : h.activation), m = {
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
      const v = c.edgePoolKey ? 0 : 2, M = Et({
        actor: e,
        phase: "onBeforeBurnApplied",
        facts: Mn({
          actor: e,
          packet: {
            actionId: i,
            category: s,
            resource: "reaction",
            amount: v,
            source: "reaction"
          },
          runtime: m
        }),
        packet: {
          actionId: i,
          category: s,
          resource: "reaction",
          amount: v,
          source: "reaction"
        },
        options: { runtime: m, consumeUsage: !0 }
      });
      m.pendingMutations = (m.pendingMutations ?? []).concat(M.mutations), f = Math.max(0, Number(M.packet.amount ?? v) || 0), c.edgePoolKey ? (await e.spendEdge(c.edgePoolKey, 1, { source: "reactionBurnCancel" }), p = c.edgePoolKey) : f > 0 && (d.reactionBurnSinceLastActivation = Math.max(
        0,
        Number(d.reactionBurnSinceLastActivation ?? 0) + f
      ));
    }
    return this._appendActionLog(d, {
      id: i,
      label: r || n,
      costLabel: c.costLabel
    }), (y = m.pendingMutations) != null && y.length ? await mi({ actor: e, mutations: m.pendingMutations, runtime: m }) : await u.combatant.setFlag(Ve, Ye, d), f > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((S = (b = e.system) == null ? void 0 : b.burn) == null ? void 0 : S.value) ?? 0) + f) }), {
      ok: !0,
      snapshot: this.getSnapshot(e, { token: t }),
      costLabel: c.costLabel,
      burnDelta: f,
      spentEdgePoolKey: p,
      usedReaction: c.usesReaction
    };
  }
  static async updateCombatantState(e, { token: t = null, mutate: i = null } = {}) {
    var l;
    const n = this.getSnapshot(e, { token: t });
    if (!(n != null && n.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const s = aa(n.combatant.getFlag(Ve, Ye), (l = n.state) == null ? void 0 : l.activation), r = typeof i == "function" ? i(s, n) ?? s : s;
    return await n.combatant.setFlag(Ve, Ye, r), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) };
  }
  static async setPendingReaction(e, { token: t = null, pendingReaction: i = null } = {}) {
    return this.updateCombatantState(e, {
      token: t,
      mutate: (n) => (n.pendingReaction = Nn(i), n)
    });
  }
  static async clearPendingReaction(e, { token: t = null } = {}) {
    return this.setPendingReaction(e, { token: t, pendingReaction: null });
  }
  static async setHazardState(e, { token: t = null, regionId: i = "", hazardState: n = null } = {}) {
    const s = String(i ?? "").trim();
    return s ? this.updateCombatantState(e, {
      token: t,
      mutate: (r) => (r.hazards ?? (r.hazards = {}), n ? r.hazards[s] = Yn({ [s]: n })[s] : delete r.hazards[s], r)
    }) : { ok: !1, reason: "Hazard region id is required." };
  }
  static getModifierSummary(e, t = Math.floor(Number(((n) => (n = ((i) => (i = e == null ? void 0 : e.system) == null ? void 0 : i.burn)()) == null ? void 0 : n.value)() ?? 0) / 2)) {
    var c, u;
    const s = ((u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.derived) == null ? void 0 : u.condition) ?? {}, r = [];
    t > 0 && r.push({
      label: "Burn Penalty",
      numericValue: -t,
      value: na(-t)
    });
    const l = Number(s.fatiguePenalty ?? 0);
    l && r.push({
      label: "Fatigue",
      numericValue: l,
      value: na(l)
    });
    const o = Number(s.physicalPenalty ?? 0);
    return o && r.push({
      label: "Physical",
      numericValue: o,
      value: na(o)
    }), r.length || r.push({
      label: "Current Modifiers",
      numericValue: 0,
      value: "0"
    }), r;
  }
  static getActiveStatuses(e) {
    return Array.from((e == null ? void 0 : e.statuses) ?? []).map((i) => ({
      id: i,
      label: vp(i)
    })).sort((i, n) => i.label.localeCompare(n.label));
  }
  static buildActionModel(e, t) {
    var l, o, c, u;
    const i = (d) => {
      const m = bo(d), f = Lf(d);
      return !f || !m ? null : {
        id: d,
        label: m.label,
        handler: "roll",
        roll: JSON.stringify(f),
        disabled: !1,
        reason: ""
      };
    }, n = (d) => {
      const m = lp(d).filter((f) => f.id !== "overloadCheck").filter((f) => !(d === Ce.recovery && f.id === "reduceBurn"));
      if (d === Ce.standard) {
        const f = Cn("reduceBurn");
        f && !m.some((p) => p.id === "reduceBurn") && m.push(f);
      }
      return m.map((f) => this._buildCatalogAction(e, t, f));
    }, s = (d) => {
      const m = Cn(d);
      if (!m) return null;
      const f = this._buildCatalogAction(e, t, m);
      return f.disabled ? null : f;
    }, r = (l = t.burn) != null && l.canOverloadCheck ? s("overloadCheck") : null;
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
        { label: "SA", value: `${t.state.saRemaining}/${Ai}` },
        { label: "Cap", value: `${Math.max(0, Number(((o = t.state) == null ? void 0 : o.saSpentThisActivation) ?? 0))}/${Ar(e)}` },
        { label: "FA", value: `${t.state.faRemaining}` },
        { label: "RA", value: `${t.state.raRemaining}` },
        {
          label: "Burn/Turn",
          value: `+${Math.max(0, Number(((c = t.state) == null ? void 0 : c.burnThisActivation) ?? 0))}`,
          action: r
        }
      ],
      activationLog: Ua((u = t.state) == null ? void 0 : u.actionLog).map((d, m) => ({
        ...d,
        index: m + 1
      })),
      menus: [
        {
          id: "standard",
          label: "Standard Actions",
          actions: n(Ce.standard)
        },
        {
          id: "complex",
          label: "Complex Actions",
          actions: n(Ce.complex)
        },
        {
          id: "free",
          label: "Free Actions",
          actions: n(Ce.free)
        },
        {
          id: "reaction",
          label: "Reactions",
          actions: n(Ce.reaction)
        },
        {
          id: "burn",
          label: "Burn & Recovery",
          actions: n(Ce.recovery)
        }
      ].filter((d) => d.actions.length)
    };
  }
  static _buildCatalogAction(e, t, i) {
    const n = t.hasCombatant ? "" : "No current-scene combatant.", s = t.isCurrentTurn ? "" : "Only during your activation.", r = t.overloaded ? "Overloaded actors can only recover Burn." : "", l = pn(e, t), o = t.state ?? {}, c = i.category;
    let u = "sa", d = Number(i.cost ?? 0) || 0, m = Ap(u, d), f = "";
    if (i.id === "reduceBurn")
      u = "sa", d = 1, m = "1 SA", f = n || s || (l <= 0 ? "Activation SA cap reached." : "") || (t.burn.value <= 0 ? "Burn is already at 0." : "");
    else if (i.id === "overloadCheck")
      u = "check", d = 0, m = "Check", f = n || s || (t.burn.canOverloadCheck ? "" : t.overloaded ? "Already Overloaded." : "Burn below 6.");
    else if (i.id === "interrupt") {
      const p = Ra(o);
      u = Number(o.raRemaining ?? 0) > 0 ? "ra" : "burn", d = u === "ra" ? 1 : 2, m = u === "ra" ? "1 RA" : "+2 Burn", f = n || (t.isCurrentTurn ? "Only outside your activation." : "") || (p ? "" : "Prepare an interrupt first.");
    } else if (i.id === "evade") {
      const p = Nn(o.pendingReaction), h = t.isCurrentTurn && !(p != null && p.allowCurrentTurn) ? "Only outside your activation." : "";
      u = Number(o.raRemaining ?? 0) > 0 ? "ra" : "burn", d = u === "ra" ? 1 : 2, m = u === "ra" ? "1 RA" : "+2 Burn", f = n || h || (p ? "" : "Use an area effect or hazard card to trigger Evade.");
    } else if (c === Ce.standard)
      f = n || s || r || (l < d ? "Activation SA cap reached." : "");
    else if (c === Ce.complex)
      f = n || s || r || (l < d ? "Activation SA cap reached." : "");
    else if (c === Ce.free) {
      const p = Number(o.faRemaining ?? 0) > 0;
      u = p ? "fa" : "sa", d = 1, m = p ? "Free" : "1 SA", f = n || s || !p && r || (!p && l < 1 ? "Activation SA cap reached." : "");
    } else if (c === Ce.reaction) {
      const p = Number(o.raRemaining ?? 0) > 0;
      u = p ? "ra" : "burn", d = p ? 1 : 2, m = p ? "1 RA" : "+2 Burn", f = n || (t.isCurrentTurn ? "Only outside your activation." : "");
    } else c === Ce.recovery && (f = n || s);
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
    const s = Cn(i);
    return s ? s.handler ? s.category === Ce.standard ? this._executeStandardAction(e, { token: t, action: s, metadata: n }) : s.category === Ce.free ? this._executeFreeAction(e, { token: t, action: s, metadata: n }) : s.category === Ce.reaction ? this._executeReactionAction(e, { token: t, action: s, metadata: n }) : { ok: !1, reason: s.reason || "That action is not implemented yet." } : { ok: !1, reason: s.reason || "That action is not implemented yet." } : { ok: !1, reason: "Unknown combat action." };
  }
  static async _executeStandardAction(e, { token: t = null, action: i, metadata: n = {} } = {}) {
    const s = this.getSnapshot(e, { token: t });
    if (!s.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!s.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (s.overloaded) return { ok: !1, reason: "Overloaded actors can only recover Burn." };
    if (pn(e, s) < Number(i.cost ?? 1))
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
    var o;
    const s = this.getSnapshot(e, { token: t });
    if (!s.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!s.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    const r = Number(((o = s.state) == null ? void 0 : o.faRemaining) ?? 0) > 0;
    if (!r && s.overloaded)
      return { ok: !1, reason: "Overloaded actors can only recover Burn." };
    if (!r && pn(e, s) < 1)
      return { ok: !1, reason: "Activation SA cap reached." };
    const l = await this.spendResource(e, {
      token: t,
      resource: r ? "fa" : "sa",
      cost: 1,
      actionId: i.id,
      actionLabel: i.label,
      actionCostLabel: r ? "Free" : "1 SA",
      actionCategory: i.category
    });
    return l != null && l.ok ? (await this._applyActionState(e, {
      token: t,
      actionId: i.id,
      metadata: n,
      snapshot: l.snapshot
    }), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : l;
  }
  static async _promptSpendEdgeForReaction(e) {
    var l, o, c;
    if (!((l = e.hasEdgePools) != null && l.call(e))) return null;
    const i = Object.keys(((c = (o = e.system) == null ? void 0 : o.counters) == null ? void 0 : c.edgePools) ?? {}).map((u) => e.getEdgePool(u)).filter((u) => u.hasPools && u.effectiveValue > 0);
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
    const r = Nn((d = s.state) == null ? void 0 : d.pendingReaction), l = i.id === "evade" && (r == null ? void 0 : r.allowCurrentTurn);
    if (s.isCurrentTurn && !l) return { ok: !1, reason: "Only outside your activation." };
    if (i.id === "interrupt" && !Ra(s.state))
      return { ok: !1, reason: "Prepare an interrupt first." };
    const o = i.id === "assist" && (n != null && n.targetName) ? `${i.label}: ${n.targetName}` : i.id === "interrupt" && (n != null && n.scope) ? `${i.label}: ${String(n.scope).trim()}` : i.label;
    let c = String((n == null ? void 0 : n.edgePoolKey) ?? "").trim();
    !c && Number(((m = s.state) == null ? void 0 : m.raRemaining) ?? 0) <= 0 && (c = await da._promptSpendEdgeForReaction(e) ?? "");
    const u = await this.commitReactionSpend(e, {
      token: t,
      actionId: i.id,
      actionLabel: i.label,
      actionCategory: i.category,
      logLabel: o,
      edgePoolKey: c,
      allowCurrentTurn: l
    });
    return u != null && u.ok ? { ...u, actionLabel: o } : u;
  }
  static async _applyActionState(e, { token: t = null, actionId: i = "", metadata: n = {}, snapshot: s = null } = {}) {
    const r = s ?? this.getSnapshot(e, { token: t });
    if (!(r != null && r.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const l = Tp(r.state, i, {
      snapshot: r,
      metadata: n
    });
    return await r.combatant.setFlag(Ve, Ye, l), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) };
  }
  static async clearAim(e, { token: t = null } = {}) {
    var s;
    const i = this.getSnapshot(e, { token: t });
    if (!(i != null && i.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const n = aa(i.combatant.getFlag(Ve, Ye), (s = i.state) == null ? void 0 : s.activation);
    return n.actionState ?? (n.actionState = {}), n.actionState.aim ? (n.actionState.aim = null, await i.combatant.setFlag(Ve, Ye, n), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : { ok: !0, snapshot: i };
  }
  static getPreparedInterrupt(e = null) {
    const t = (e == null ? void 0 : e.state) ?? e ?? {};
    return Ra(t);
  }
  static async clearPreparedInterrupt(e, { token: t = null } = {}) {
    var s;
    const i = this.getSnapshot(e, { token: t });
    if (!(i != null && i.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const n = aa(i.combatant.getFlag(Ve, Ye), (s = i.state) == null ? void 0 : s.activation);
    return n.actionState ?? (n.actionState = {}), n.actionState.preparedInterrupt ? (n.actionState.preparedInterrupt = null, await i.combatant.setFlag(Ve, Ye, n), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : { ok: !0, snapshot: i };
  }
  static async _syncPreparedIndicatorForCombatant(e) {
    var u, d, m;
    if (!game.user.isGM || !e) return;
    const t = this._getCombatantSceneId(e) || ((u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.id), i = this._getCombatantTokenDocument(e, t), n = (i == null ? void 0 : i.actor) ?? (e == null ? void 0 : e.actor) ?? null;
    if (!i || !n) return;
    const s = e.getFlag(Ve, Ye), r = !!Ra(s), l = dl(), o = String((l == null ? void 0 : l.id) ?? Bi).trim() || Bi;
    (((m = (d = n == null ? void 0 : n.statuses) == null ? void 0 : d.has) == null ? void 0 : m.call(d, o)) ?? !1) !== r && await n.toggleStatusEffect(o, { active: r, overlay: !1 });
  }
  static async syncPreparedIndicators(e = game.combat) {
    if (!(!game.user.isGM || !e))
      for (const t of this._getCombatants(e))
        await this._syncPreparedIndicatorForCombatant(t);
  }
  static async clearPreparedIndicatorForCombatant(e) {
    var l, o, c;
    if (!game.user.isGM || !e) return;
    const t = this._getCombatantSceneId(e) || ((l = canvas == null ? void 0 : canvas.scene) == null ? void 0 : l.id), i = this._getCombatantTokenDocument(e, t), n = (i == null ? void 0 : i.actor) ?? (e == null ? void 0 : e.actor) ?? null;
    if (!i || !n) return;
    const s = dl(), r = String((s == null ? void 0 : s.id) ?? Bi).trim() || Bi;
    (((c = (o = n == null ? void 0 : n.statuses) == null ? void 0 : o.has) == null ? void 0 : c.call(o, r)) ?? !1) && await n.toggleStatusEffect(r, { active: !1, overlay: !1 });
  }
  static _buildSpendAction(e, t, i = "") {
    var o;
    const n = Number(((o = e.state) == null ? void 0 : o[`${t.resource}Remaining`]) ?? 0), s = t.resource === "sa" ? "" : n < t.cost ? `No ${String(t.resource).toUpperCase()} remaining.` : "", r = i || s, l = this._formatCostLabel(t.resource, t.cost);
    return {
      id: t.id,
      label: t.label,
      costLabel: l,
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
    const r = Ua(e == null ? void 0 : e.actionLog);
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
    const i = this.getActivationIdentity(e, t), n = t.getFlag(Ve, Ye);
    fn(n, i) || await t.setFlag(Ve, Ye, ul(n, i));
  }
  static async spendResource(e, {
    token: t = null,
    resource: i = "sa",
    cost: n = 1,
    actionId: s = "",
    actionLabel: r = "",
    actionCostLabel: l = "",
    actionCategory: o = ""
  } = {}) {
    var S, v, M, N, P, U, K;
    const c = this.getSnapshot(e, { token: t });
    if (!c.hasCombatant)
      return { ok: !1, reason: "No combatant on the current scene." };
    if (!c.isCurrentTurn)
      return { ok: !1, reason: "Only available during your activation." };
    const u = {
      combat: c.combat,
      combatant: c.combatant,
      state: Pn(c.state, this.getActivationIdentity(c.combat, c.combatant)),
      sceneId: ((S = canvas == null ? void 0 : canvas.scene) == null ? void 0 : S.id) ?? "",
      snapshot: c
    };
    let d = Math.max(0, Number(n ?? 0) || 0);
    const m = Et({
      actor: e,
      phase: "onBeforeActionCostFinalized",
      facts: Tu({
        actor: e,
        packet: { actionId: s, category: o, resource: i, cost: d, effectiveCost: d },
        runtime: u
      }),
      packet: { actionId: s, category: o, resource: i, cost: d, effectiveCost: d },
      options: { runtime: u, consumeUsage: !0 }
    });
    d = Math.max(0, Number(m.packet.cost ?? d) || 0), u.pendingMutations = (u.pendingMutations ?? []).concat(m.mutations);
    const f = `${i}Remaining`, p = Number(((v = c.state) == null ? void 0 : v[f]) ?? 0);
    if (i !== "sa" && p < d)
      return { ok: !1, reason: `No ${String(i).toUpperCase()} remaining.` };
    const h = u.state, g = i === "sa" ? Ar(e) : 0, y = Math.max(0, Number(((M = c.state) == null ? void 0 : M.saSpentThisActivation) ?? 0) || 0);
    if (i === "sa" && y + d > g)
      return { ok: !1, reason: "Activation SA cap reached." };
    h[f] = Math.max(0, p - d), i === "sa" && (h.saSpentThisActivation = y + d, s === "attack" && (h.attacksThisActivation = Number(h.attacksThisActivation ?? 0) + 1)), this._appendActionLog(h, {
      id: s,
      label: r,
      costLabel: l || this._formatCostLabel(i, d)
    });
    let b = 0;
    if (i === "sa") {
      const Y = Math.max(0, y - Ai), W = Math.max(0, h.saSpentThisActivation - Ai), j = Math.max(0, Number(((N = c.state) == null ? void 0 : N.attacksThisActivation) ?? 0) || 0), L = Math.max(0, Number(h.attacksThisActivation ?? 0) || 0);
      for (let B = Y + 1; B <= W; B += 1) {
        const G = Et({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: Mn({
            actor: e,
            packet: {
              actionId: s,
              category: o,
              resource: i,
              amount: 1,
              source: "extraSA",
              extraSaIndex: B
            },
            runtime: u
          }),
          packet: {
            actionId: s,
            category: o,
            resource: i,
            amount: 1,
            source: "extraSA",
            extraSaIndex: B
          },
          options: { runtime: u, consumeUsage: !0 }
        });
        u.pendingMutations = (u.pendingMutations ?? []).concat(G.mutations), b += Math.max(0, Number(G.packet.amount ?? 0) || 0);
      }
      for (let B = j + 1; B <= L; B += 1) {
        if (B <= 1) continue;
        const G = Et({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: Mn({
            actor: e,
            packet: {
              actionId: s,
              category: o,
              resource: i,
              amount: 1,
              source: "attack"
            },
            runtime: u
          }),
          packet: {
            actionId: s,
            category: o,
            resource: i,
            amount: 1,
            source: "attack",
            attackIndex: B
          },
          options: { runtime: u, consumeUsage: !0 }
        });
        u.pendingMutations = (u.pendingMutations ?? []).concat(G.mutations), b += Math.max(0, Number(G.packet.amount ?? 0) || 0);
      }
      h.burnThisActivation = Math.max(0, Number(h.burnThisActivation ?? 0) + b);
    }
    return (P = u.pendingMutations) != null && P.length ? await mi({
      actor: e,
      mutations: u.pendingMutations,
      runtime: {
        ...u,
        state: h
      }
    }) : await c.combatant.setFlag(Ve, Ye, h), b > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((K = (U = e.system) == null ? void 0 : U.burn) == null ? void 0 : K.value) ?? 0) + b) }), { ok: !0, snapshot: this.getSnapshot(e, { token: c.token }) };
  }
  static async reduceBurn(e, { token: t = null } = {}) {
    var l, o, c, u;
    const i = this.getSnapshot(e, { token: t });
    if (!i.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!i.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (pn(e, i) <= 0) return { ok: !1, reason: "Activation SA cap reached." };
    if (i.burn.value <= 0) return { ok: !1, reason: "Burn is already at 0." };
    const n = await this.spendResource(e, {
      token: i.token,
      resource: "sa",
      cost: 1,
      actionId: "reduceBurn",
      actionLabel: "Reduce Burn",
      actionCostLabel: "1 SA",
      actionCategory: Ce.standard
    });
    if (!n.ok) return n;
    const s = Math.max(0, Number(((o = (l = e.system) == null ? void 0 : l.burn) == null ? void 0 : o.value) ?? 0) - 1), r = { "system.burn.value": s };
    return s === 0 && ((u = (c = e.system) == null ? void 0 : c.burn) != null && u.overloaded) && (r["system.burn.overloaded"] = !1), await e.update(r), { ok: !0, snapshot: this.getSnapshot(e, { token: i.token }) };
  }
  static async finalizeActivation(e, t) {
    var m, f, p, h, g, y, b, S;
    if (!game.user.isGM || !t || !e) return;
    const i = ((f = (m = e.combatants) == null ? void 0 : m.get) == null ? void 0 : f.call(m, t)) ?? null, n = (i == null ? void 0 : i.actor) ?? null;
    if (!i || !n) return;
    const s = i.getFlag(Ve, Ye), r = fn(s, this.getActivationIdentity(e, i)) ? Pn(s, this.getActivationIdentity(e, i)) : Pn(s), o = {
      burnDelta: Number(r.saSpentThisActivation ?? 0) <= Ai && Number(r.burnThisActivation ?? 0) <= 0 && Number(r.reactionBurnSinceLastActivation ?? 0) <= 0 ? -2 : 0,
      edgeAdjustments: []
    }, c = {
      combat: e,
      combatant: i,
      state: r,
      sceneId: ((p = e.scene) == null ? void 0 : p.id) ?? ((h = canvas == null ? void 0 : canvas.scene) == null ? void 0 : h.id) ?? ""
    }, u = Et({
      actor: n,
      phase: "onEndOfActivation",
      facts: ku({ actor: n, packet: o, runtime: c }),
      packet: o,
      options: { runtime: c, consumeUsage: !0 }
    });
    await mi({ actor: n, mutations: u.mutations, runtime: c });
    const d = Number(u.packet.burnDelta ?? o.burnDelta) || 0;
    if (d) {
      const v = Math.max(0, Number(((y = (g = n.system) == null ? void 0 : g.burn) == null ? void 0 : y.value) ?? 0) + d), M = { "system.burn.value": v };
      v === 0 && ((S = (b = n.system) == null ? void 0 : b.burn) != null && S.overloaded) && (M["system.burn.overloaded"] = !1), await n.update(M);
    }
    for (const v of u.packet.edgeAdjustments ?? []) {
      const M = Number((v == null ? void 0 : v.amount) ?? 0) || 0;
      !M || !(v != null && v.poolKey) || (M > 0 ? await n.gainEdge(v.poolKey, M, { skipTraitHooks: !0, source: "endOfActivationTrait" }) : await n.spendEdge(v.poolKey, Math.abs(M), { skipTraitHooks: !0, source: "endOfActivationTrait" }));
    }
  }
  static async _onUpdateCombat(e, t) {
    if (Object.prototype.hasOwnProperty.call(t ?? {}, "turn") || Object.prototype.hasOwnProperty.call(t ?? {}, "round")) {
      const n = this._lastActivationByCombat.get(e == null ? void 0 : e.id) ?? null, s = typeof n == "string" ? n : (n == null ? void 0 : n.combatantId) ?? null, r = this.getActivationIdentity(e, e == null ? void 0 : e.combatant), l = n && typeof n == "object" ? !fn(n, r) : s && s !== r.combatantId;
      s && l && await this.finalizeActivation(e, s), await this.ensureCurrentCombatantState(), await this._processCurrentCombatantHazards(e), e != null && e.id && this._lastActivationByCombat.set(e.id, r);
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
    if (foundry.utils.hasProperty(t, `flags.${Ve}.${Ye}`)) {
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
      (l) => Object.prototype.hasOwnProperty.call(t ?? {}, l)
    ) || ((s = e == null ? void 0 : e.parent) == null ? void 0 : s.id) !== ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id)) return;
    const n = String((e == null ? void 0 : e.id) ?? "").trim();
    if (n) {
      const l = Object.prototype.hasOwnProperty.call(t ?? {}, "x") ? Number(t.x) : Number(e == null ? void 0 : e.x), o = Object.prototype.hasOwnProperty.call(t ?? {}, "y") ? Number(t.y) : Number(e == null ? void 0 : e.y);
      Number.isFinite(l) && Number.isFinite(o) && this._pendingTokenPositions.set(n, { x: l, y: o });
    }
    this._syncHazardPresenceForToken(e), this.queueCharacterSheetRefresh();
  }
  static _onRefreshToken(e) {
    this._refreshHazardOverlay(e);
  }
  static _getTokenDocumentFromRegionEvent(e = []) {
    var t, i, n, s, r, l;
    for (const o of e) {
      if (!o) continue;
      const c = [
        o == null ? void 0 : o.document,
        o == null ? void 0 : o.token,
        o == null ? void 0 : o.tokenDocument,
        (t = o == null ? void 0 : o.object) == null ? void 0 : t.document,
        (i = o == null ? void 0 : o.data) == null ? void 0 : i.token,
        (n = o == null ? void 0 : o.data) == null ? void 0 : n.tokenDocument,
        (s = o == null ? void 0 : o.eventData) == null ? void 0 : s.token,
        (r = o == null ? void 0 : o.eventData) == null ? void 0 : r.tokenDocument
      ];
      for (const u of c) {
        const d = (u == null ? void 0 : u.document) ?? u ?? null;
        if ((d == null ? void 0 : d.documentName) === "Token" || ((l = d == null ? void 0 : d.constructor) == null ? void 0 : l.documentName) === "Token")
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
    zs(e) && (await Bs(e), await this._syncAllSceneHazards((e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null));
  }
  static async _onUpdateRegion(e) {
    zs(e) && (await Bs(e), await this._syncAllSceneHazards((e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null));
  }
  static async _onDeleteRegion(e) {
    var s, r, l;
    const t = String((e == null ? void 0 : e.id) ?? "").trim();
    if (!t) return;
    const i = (e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null, n = game.combat;
    for (const o of this._getCombatants(n)) {
      const c = this._getCombatantTokenDocument(o, (i == null ? void 0 : i.id) ?? ((s = canvas == null ? void 0 : canvas.scene) == null ? void 0 : s.id)), u = (c == null ? void 0 : c.actor) ?? (o == null ? void 0 : o.actor) ?? null;
      if (!u || !c) continue;
      const d = this.getSnapshot(u, { token: c });
      (r = d == null ? void 0 : d.hazards) != null && r[t] && (await this.setHazardState(u, { token: c, regionId: t, hazardState: null }), ((l = d == null ? void 0 : d.pendingReaction) == null ? void 0 : l.sourceKind) === "hazard" && d.pendingReaction.sourceId === t && await this.clearPendingReaction(u, { token: c }), this._queueHazardOverlayRefresh(c));
    }
  }
  static async _syncAllSceneHazards(e = (canvas == null ? void 0 : canvas.scene) ?? null) {
    if (e) {
      for (const t of Array.from(e.regions ?? []))
        zs(t) && await Bs(t);
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
    Yn(n.hazards);
    const s = cl(t), r = new Map(
      s.map((h) => {
        const g = Ri(h);
        return g ? [String(h.id ?? "").trim(), { region: h, flag: g }] : null;
      }).filter(Boolean)
    ), l = [], o = [];
    await this.updateCombatantState(i, {
      token: t,
      mutate: (h) => {
        var g, y, b, S, v;
        h.hazards ?? (h.hazards = {});
        for (const [M, { flag: N }] of r.entries()) {
          if (h.hazards[M]) continue;
          const P = {
            tier: De((g = N == null ? void 0 : N.hazardDef) == null ? void 0 : g.startExposure, ie.minor),
            turnsExposed: 0,
            evadeLocked: !1,
            lastProcessedRound: 0
          };
          h.hazards[M] = P, l.push({ regionId: M, flag: N, hazardState: P });
        }
        for (const [M, N] of Object.entries(h.hazards ?? {})) {
          if (r.has(M)) continue;
          const P = Ri((S = (b = (y = canvas == null ? void 0 : canvas.scene) == null ? void 0 : y.regions) == null ? void 0 : b.get) == null ? void 0 : S.call(b, M)) ?? null;
          ((v = P == null ? void 0 : P.hazardDef) == null ? void 0 : v.clearOnExit) !== !1 && (delete h.hazards[M], o.push({ regionId: M, hazardState: N, flag: P }));
        }
        return h;
      }
    });
    for (const h of l) {
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
    for (const h of o) {
      ((f = n == null ? void 0 : n.pendingReaction) == null ? void 0 : f.sourceKind) === "hazard" && n.pendingReaction.sourceId === h.regionId && await this.clearPendingReaction(i, { token: t });
      const g = String(((p = h == null ? void 0 : h.flag) == null ? void 0 : p.label) ?? "Hazard").trim() || "Hazard", y = `<div class="mwd-gm-notice"><b>${foundry.utils.escapeHTML(g)}:</b> ${foundry.utils.escapeHTML(i.name ?? "Target")} leaves the zone.</div>`;
      await ChatMessage.create(fl({
        speaker: ChatMessage.getSpeaker({ actor: i, token: t }),
        content: y
      }));
    }
    this._queueHazardOverlayRefresh(t);
  }
  static async _processCurrentCombatantHazards(e = game.combat) {
    var o, c, u;
    const t = (e == null ? void 0 : e.combatant) ?? null, i = this._getCombatantTokenDocument(t, ((o = e == null ? void 0 : e.scene) == null ? void 0 : o.id) ?? ((c = canvas == null ? void 0 : canvas.scene) == null ? void 0 : c.id)), n = (i == null ? void 0 : i.actor) ?? (t == null ? void 0 : t.actor) ?? null;
    if (!t || !i || !this._supportsHazardActor(n)) return;
    const s = this.getSnapshot(n, { token: i }), r = Number((e == null ? void 0 : e.round) ?? 0) || 0, l = new Map(
      cl(i).map((d) => {
        const m = Ri(d);
        return m ? [String(d.id ?? "").trim(), { region: d, flag: m }] : null;
      }).filter(Boolean)
    );
    for (const [d, m] of Object.entries(s.hazards ?? {})) {
      if ((Number((m == null ? void 0 : m.lastProcessedRound) ?? 0) || 0) >= r) continue;
      const f = l.get(d);
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
    var o, c, u, d;
    const i = Math.max(0, Number((e == null ? void 0 : e.turnsExposed) ?? 0) || 0), n = Math.max(1, Number(((o = t == null ? void 0 : t.escalation) == null ? void 0 : o.intervalTurns) ?? 1) || 1), s = Math.max(0, Number(((c = t == null ? void 0 : t.escalation) == null ? void 0 : c.rate) ?? 1) || 0);
    if (!(s > 0 && (i + 1) % n === 0)) return De(e == null ? void 0 : e.tier, ie.none);
    let l = De(e == null ? void 0 : e.tier, ie.none);
    for (let m = 0; m < s; m += 1)
      if (l = dm(l, 1), Ci(l) >= Ci(((u = t == null ? void 0 : t.escalation) == null ? void 0 : u.max) ?? ie.full)) {
        l = De((d = t == null ? void 0 : t.escalation) == null ? void 0 : d.max, ie.full);
        break;
      }
    return l;
  }
  static async _createHazardEventChatCard({
    actor: e = null,
    token: t = null,
    region: i = null,
    hazardFlag: n = {},
    hazardState: s = {},
    eventType: r = "entry",
    nextTier: l = null,
    allowEvade: o = !1
  } = {}) {
    var h, g, y;
    if (!e) return null;
    const c = De(s == null ? void 0 : s.tier, ie.none), u = De(l, c), d = o && c !== ie.none && !(s != null && s.evadeLocked) ? this.getReactionSpendPreview(e, { token: t }) : null, m = {
      kind: "hazard",
      eventType: r,
      regionId: String((i == null ? void 0 : i.id) ?? "").trim(),
      regionName: String((n == null ? void 0 : n.label) ?? (i == null ? void 0 : i.name) ?? "Hazard").trim() || "Hazard",
      actorUuid: e.uuid,
      tokenUuid: (t == null ? void 0 : t.uuid) ?? ((h = t == null ? void 0 : t.document) == null ? void 0 : h.uuid) ?? null,
      actorName: e.name ?? "Target",
      turnsExposed: Math.max(0, Number((s == null ? void 0 : s.turnsExposed) ?? 0) || 0),
      baseDamage: Math.max(0, Number((n == null ? void 0 : n.damage) ?? 0) || 0),
      damageBefore: Gi(Number((n == null ? void 0 : n.damage) ?? 0) || 0, c),
      damageAfter: Gi(
        Number((n == null ? void 0 : n.damage) ?? 0) || 0,
        o && !(s != null && s.evadeLocked) ? rr(c, 1) : c
      ),
      damageType: String((n == null ? void 0 : n.damageType) ?? "concussive").trim() || "concussive",
      ap: Math.max(0, Number((n == null ? void 0 : n.ap) ?? 0) || 0),
      onFullBurnDelta: Math.max(0, Number(((y = (g = n == null ? void 0 : n.hazardDef) == null ? void 0 : g.onFull) == null ? void 0 : y.burnDelta) ?? 0) || 0),
      source: String((n == null ? void 0 : n.label) ?? (i == null ? void 0 : i.name) ?? "Hazard").trim() || "Hazard",
      nextTier: u,
      exposure: {
        initialTier: c,
        finalTier: c,
        initialLabel: Ct(c),
        finalLabel: Ct(c),
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
    }, f = await Nu(m, { actor: e, token: t }), p = await ChatMessage.create(fl({
      speaker: ChatMessage.getSpeaker({ actor: e, token: t }),
      content: f,
      flags: {
        mwd: {
          hazardCard: m
        }
      }
    }));
    return p && d && c !== ie.none && !(s != null && s.evadeLocked) && await this.setPendingReaction(e, {
      token: t,
      pendingReaction: {
        type: "evade",
        sourceKind: "hazard",
        sourceId: String((i == null ? void 0 : i.id) ?? "").trim() || null,
        messageId: p.id,
        exposureBefore: c,
        exposureAfterPreview: rr(c, 1),
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
    const n = (i == null ? void 0 : i.actor) ?? null, s = n ? this.getSnapshot(n, { token: i }) : null, r = Object.values((s == null ? void 0 : s.hazards) ?? {}), l = Mp(r);
    let o = t.mwdHazardOverlay ?? null;
    if (!l) {
      o != null && o.parent && o.parent.removeChild(o), (c = o == null ? void 0 : o.destroy) == null || c.call(o), t.mwdHazardOverlay = null;
      return;
    }
    o || (o = new PIXI.Text(l, {
      fontFamily: "MWD UI",
      fontSize: 14,
      fontWeight: "700",
      fill: "#fff2d5",
      stroke: "#23150d",
      strokeThickness: 4,
      align: "center"
    }), (d = (u = o.anchor) == null ? void 0 : u.set) == null || d.call(u, 0, 1), t.addChild(o), t.mwdHazardOverlay = o), o.text = l, o.x = 6, o.y = Math.max(18, Number(t.h ?? 0) - 4);
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
      for (const l of Object.values((s == null ? void 0 : s.apps) ?? {}))
        ((r = l == null ? void 0 : l.actor) == null ? void 0 : r.type) === "character" && e.add(l);
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
O(da, "_targetRefreshTimeout", null), O(da, "_pendingTokenPositions", /* @__PURE__ */ new Map()), O(da, "_lastActivationByCombat", /* @__PURE__ */ new Map());
let x = da;
function Ar(a) {
  var i, n, s, r, l, o;
  const e = Math.max(0, Number(((s = (n = (i = a == null ? void 0 : a.system) == null ? void 0 : i.attributes) == null ? void 0 : n.reflexes) == null ? void 0 : s.value) ?? 0) || 0), t = Math.max(0, Number(((o = (l = (r = a == null ? void 0 : a.system) == null ? void 0 : r.attributes) == null ? void 0 : l.willpower) == null ? void 0 : o.value) ?? 0) || 0);
  return Ai + Math.floor((e + t) / 2);
}
function pn(a, e) {
  var t;
  return Math.max(0, Ar(a) - Math.max(0, Number(((t = e == null ? void 0 : e.state) == null ? void 0 : t.saSpentThisActivation) ?? 0) || 0));
}
const Tr = Object.freeze([
  Object.freeze({ key: "close", label: "Close", min: 0, max: 5, baseDn: 2 }),
  Object.freeze({ key: "near", label: "Near", min: 6, max: 26, baseDn: 3 }),
  Object.freeze({ key: "far", label: "Far", min: 27, max: 62, baseDn: 4 }),
  Object.freeze({ key: "extreme", label: "Extreme", min: 63, max: 120, baseDn: 5 })
]), Cp = new Map(Tr.map((a) => [a.key, a]));
function hn(a, e) {
  const t = Number(a);
  return !Number.isFinite(t) || t <= 0 ? e : Math.max(0, Math.trunc(t));
}
function bs(a = "") {
  return Cp.get(String(a ?? "").trim().toLowerCase()) ?? null;
}
function Qn(a = "") {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return "Out of Range";
  const e = bs(a);
  return e ? `${e.label} ${e.min}-${e.max} m` : String(a ?? "").trim() || "Range";
}
function Ss(a = "") {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return "Out of Range";
  const e = bs(a);
  return e ? e.label : String(a ?? "").trim() || "Range";
}
function Pp(a = "", e = 1) {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return 6;
  const t = bs(a);
  return Number.isFinite(Number(t == null ? void 0 : t.baseDn)) ? Number(t.baseDn) : e;
}
function Mo(a = {}) {
  return {
    max: String((a == null ? void 0 : a.max) ?? "").trim().toLowerCase() || "extreme",
    close: hn((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short), 5),
    near: hn((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium), 26),
    far: hn((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long), 62),
    extreme: hn(a == null ? void 0 : a.extreme, 120)
  };
}
function Np(a, e = {}, t = "close") {
  var u;
  const i = Number(a);
  if (!Number.isFinite(i) || i < 0)
    return String(t ?? "close").trim().toLowerCase() || "close";
  const n = Mo(e), s = ((u = bs(n.max)) == null ? void 0 : u.key) ?? "extreme", r = Tr.findIndex((d) => d.key === s), l = Number((n == null ? void 0 : n[s]) ?? NaN);
  if (Number.isFinite(l) && i > l)
    return "outOfRange";
  let o = "extreme";
  i <= n.close ? o = "close" : i <= n.near ? o = "near" : i <= n.far && (o = "far");
  const c = Tr.findIndex((d) => d.key === o);
  return r >= 0 && c > r ? s : o;
}
const ha = "lifeModuleCatalog", As = Object.freeze([
  { moduleType: "faction", label: "Faction" },
  { moduleType: "childhood", label: "Childhood" },
  { moduleType: "higherEducation", label: "Higher Education" },
  { moduleType: "realLife", label: "Real Life" }
]), Rp = Object.freeze(
  Object.fromEntries(As.map((a) => [a.moduleType, a.label]))
), Ip = new Set(As.map((a) => a.moduleType)), Dp = /* @__PURE__ */ new Set(["skill", "edgePool"]), Co = Object.freeze({
  grit: "Grit",
  chaos: "Chaos",
  insight: "Insight",
  rumor: "Rumor",
  legend: "Legend",
  credibility: "Credibility"
}), Ru = Object.freeze(Object.keys(Co)), Op = Object.freeze({
  skill: "Skill",
  edgePool: "Edge Pool"
}), _p = Object.freeze(Fp()), Lp = Object.freeze(Up()), xp = /* @__PURE__ */ new Set(["artillery", "gunnery", "piloting", "heavyWeapons"]), $p = /* @__PURE__ */ new Set([
  "artillery",
  "gunnery",
  "heavyWeapons",
  "meleeCombat",
  "piloting",
  "projectileWeapons",
  "firearms"
]), Bp = Object.freeze(
  ai.map((a) => a.code).filter((a) => !$p.has(a))
), zp = Object.freeze(ea([
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
        ...Bp.map((a) => ({ type: "skill", value: a })),
        ...Ru.map((a) => ({ type: "edgePool", value: a }))
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
    skillChoices: ai.map((a) => a.code).filter((a) => !xp.has(a)),
    excludesAny: [
      "higher-education-military-enlistment",
      "higher-education-military-academy",
      "higher-education-family-training",
      "higher-education-officer-candidate-school"
    ]
  }
], { strict: !1 }));
function Fp() {
  const a = /* @__PURE__ */ new Map();
  for (const e of ai) {
    const t = String(e.code ?? "").trim(), i = String(e.label ?? "").trim();
    t && (a.set(t.toLowerCase(), t), i && a.set(i.toLowerCase(), t));
  }
  return a;
}
function Up() {
  const a = /* @__PURE__ */ new Map();
  for (const [e, t] of Object.entries(Co))
    a.set(e.toLowerCase(), e), a.set(t.toLowerCase(), e), a.set(`${t.toLowerCase()} pool`, e);
  return a;
}
function Hp(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid life module data.");
  return t.validationErrors = e, t;
}
function Iu(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
function on(a) {
  return String(a ?? "").trim().toLowerCase().replace(/['\u2019]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function Ts(a) {
  const e = String(a ?? "").trim();
  return Ip.has(e) ? e : "";
}
function ws(a) {
  const e = String(a ?? "").trim();
  return e ? _p.get(e.toLowerCase()) ?? "" : "";
}
function Wp(a) {
  const e = String(a ?? "").trim();
  return e ? Lp.get(e.toLowerCase()) ?? "" : "";
}
function jp(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const r of Iu(a)) {
    const l = ws(r);
    if (!l) {
      e && t.push(`${i}: unknown skill "${r}".`);
      continue;
    }
    n.has(l) || (n.add(l), s.push(l));
  }
  return s;
}
function pl(a) {
  const e = /* @__PURE__ */ new Set();
  return Iu(a).map(on).filter((t) => !t || e.has(t) ? !1 : (e.add(t), !0));
}
function hl(a = [], e = /* @__PURE__ */ new Map()) {
  return a.map((t) => {
    var i;
    return ((i = e.get(t)) == null ? void 0 : i.label) ?? t;
  });
}
function Ta(a = {}) {
  return `${a.type}:${a.value}`;
}
function Gp(a) {
  var e;
  return ((e = Wt(a)) == null ? void 0 : e.label) ?? a;
}
function Du(a) {
  return Co[a] ?? a;
}
function qp(a) {
  return Op[a] ?? a;
}
function Kp(a = {}, { includeTypePrefix: e = !1 } = {}) {
  const t = String((a == null ? void 0 : a.type) ?? "").trim(), i = String((a == null ? void 0 : a.value) ?? "").trim();
  if (!t || !i) return "";
  const n = t === "skill" ? Gp(i) : `${Du(i)} Pool`;
  return e ? `${qp(t)}: ${n}` : n;
}
function Ka(a = {}, { includeBonusText: e = !1, includeTypePrefix: t = !1 } = {}) {
  const i = Kp(a, { includeTypePrefix: t });
  return i ? e ? a.type === "skill" ? `+1 ${i} rolls` : `+1 ${i}` : i : "";
}
function Vp(a) {
  const e = String(a ?? "").trim(), t = e.indexOf(":");
  return t < 0 ? null : {
    type: e.slice(0, t).trim(),
    value: e.slice(t + 1).trim()
  };
}
function Yp(a, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: n = "Bonus" } = {}) {
  const s = typeof a == "string" ? Vp(a) : a, r = String((s == null ? void 0 : s.type) ?? "").trim(), l = String((s == null ? void 0 : s.value) ?? "").trim();
  if (!Dp.has(r))
    return e && t.push(`${i} ${n}: unknown bonus type "${r || a}".`), null;
  const o = r === "skill" ? ws(l) : Wp(l);
  return o ? {
    type: r,
    value: o
  } : (e && t.push(`${i} ${n}: unknown ${r === "skill" ? "skill" : "edge pool"} "${l}".`), null);
}
function wr(a, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: n = "Bonus" } = {}) {
  const s = /* @__PURE__ */ new Set(), r = [], l = Array.isArray(a) ? a : [];
  for (const o of l) {
    const c = Yp(o, { strict: e, errors: t, prefix: i, grantLabel: n });
    if (!c) continue;
    const u = Ta(c);
    s.has(u) || (s.add(u), r.push(c));
  }
  return r;
}
function Ou(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = jp(a, { strict: e, errors: t, prefix: i });
  return n.length ? [{
    id: "skill",
    label: "",
    choices: n.map((s) => ({ type: "skill", value: s }))
  }] : [];
}
function Qp(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = String(a ?? "").trim();
  return n ? n.split(";").map((r) => r.trim()).filter(Boolean).map((r, l) => {
    const o = `Bonus ${l + 1}`, c = wr(
      r.split("|").map((u) => u.trim()).filter(Boolean),
      { strict: e, errors: t, prefix: i, grantLabel: o }
    );
    return {
      id: `grant-${l + 1}`,
      label: "",
      choices: c
    };
  }).filter((r) => r.choices.length) : [];
}
function _u(a, e = "grant") {
  return on(a) || e;
}
function Jp(a, e, { strict: t = !1, errors: i = [], prefix: n = "Entry" } = {}) {
  const s = `grant-${e + 1}`, r = `Bonus ${e + 1}`;
  if (typeof a == "string") {
    const u = wr(
      a.split("|").map((d) => d.trim()).filter(Boolean),
      { strict: t, errors: i, prefix: n, grantLabel: r }
    );
    return u.length ? { id: s, label: "", choices: u } : null;
  }
  const l = _u(a == null ? void 0 : a.id, s), o = String((a == null ? void 0 : a.label) ?? "").trim(), c = wr(a == null ? void 0 : a.choices, { strict: t, errors: i, prefix: n, grantLabel: r });
  return c.length ? { id: l, label: o, choices: c } : (t && i.push(`${n} ${r}: define at least one bonus choice.`), null);
}
function Xp(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  if (Array.isArray(a)) {
    if (a.every((s) => typeof s == "string" && !String(s).includes(":")))
      return Ou(a, { strict: e, errors: t, prefix: i });
    const n = /* @__PURE__ */ new Set();
    return a.map((s, r) => Jp(s, r, { strict: e, errors: t, prefix: i })).filter((s) => s ? n.has(s.id) ? (e && t.push(`${i}: duplicate bonus id "${s.id}".`), !1) : (n.add(s.id), !0) : !1);
  }
  return typeof a == "string" ? Qp(a, { strict: e, errors: t, prefix: i }) : [];
}
function Zp(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => (Array.isArray(e == null ? void 0 : e.choices) ? e.choices : []).map((i) => `${i.type}:${i.value}`).join("|")).filter(Boolean).join("; ");
}
function Po() {
  return foundry.utils.deepClone(zp);
}
function wa(a) {
  return Rp[a] ?? (String(a ?? "").trim() || "Life Module");
}
function Lu() {
  return As.map((a) => ({
    value: a.moduleType,
    label: a.label
  }));
}
function ea(a = [], { strict: e = !1 } = {}) {
  const t = Array.isArray(a) ? a : [], i = [], n = /* @__PURE__ */ new Set(), s = t.map((l, o) => {
    const c = `Entry ${o + 1}`, u = String((l == null ? void 0 : l.label) ?? "").trim(), d = on((l == null ? void 0 : l.id) ?? u), m = Ts(l == null ? void 0 : l.moduleType), f = (l == null ? void 0 : l.grants) != null ? Xp(l.grants, { strict: e, errors: i, prefix: c }) : Ou(l == null ? void 0 : l.skillChoices, { strict: e, errors: i, prefix: c }), p = pl(l == null ? void 0 : l.requiresAny), h = pl(l == null ? void 0 : l.excludesAny);
    return !d && e && i.push(`${c}: id cannot be blank.`), !u && e && i.push(`${c}: label cannot be blank.`), !m && e && i.push(`${c}: choose a valid module type.`), !f.length && e && i.push(`${c}: choose at least one bonus.`), d && n.has(d) && e && i.push(`${c}: duplicate id "${d}".`), d && n.add(d), {
      id: d,
      label: u,
      moduleType: m,
      grants: f,
      requiresAny: p,
      excludesAny: h
    };
  }), r = new Map(s.map((l) => [l.id, l]));
  for (const l of s) {
    for (const o of l.requiresAny)
      o === l.id && e && i.push(`${l.label || l.id}: cannot require itself.`), !r.has(o) && e && i.push(`${l.label || l.id}: unknown requirement "${o}".`);
    for (const o of l.excludesAny)
      o === l.id && e && i.push(`${l.label || l.id}: cannot exclude itself.`), !r.has(o) && e && i.push(`${l.label || l.id}: unknown exclusion "${o}".`);
  }
  if (e && i.length) throw Hp(i);
  return s.filter((l) => l.id && l.label && l.moduleType && l.grants.length).map((l) => ({
    id: l.id,
    label: l.label,
    moduleType: l.moduleType,
    grants: l.grants.map((o) => ({
      id: o.id,
      label: o.label,
      choices: o.choices.map((c) => ({
        type: c.type,
        value: c.value
      }))
    })),
    requiresAny: [...l.requiresAny],
    excludesAny: [...l.excludesAny]
  }));
}
function xu(a = []) {
  const e = new Map(Po().map((s) => [s.id, s])), t = ea(a, { strict: !1 }), i = [...t], n = new Set(t.map((s) => s.id));
  for (const [s, r] of e.entries())
    n.has(s) || i.push(foundry.utils.deepClone(r));
  return i;
}
async function eh() {
  var a, e, t;
  try {
    if (!((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${ha}`))) return;
    const i = game.settings.get(T, ha), n = xu(i);
    JSON.stringify(i) !== JSON.stringify(n) && await game.settings.set(T, ha, n);
  } catch {
  }
}
function th() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${ha}`))
      return xu(game.settings.get(T, ha));
  } catch {
  }
  return Po();
}
function vs() {
  return ea(th(), { strict: !1 });
}
function Ni(a) {
  const e = on(a);
  return e ? vs().find((t) => t.id === e) ?? null : null;
}
function No(a) {
  const e = Ts(a);
  return vs().filter((t) => t.moduleType === e);
}
function $u(a) {
  return !a || typeof a != "object" || Array.isArray(a) ? {} : Object.fromEntries(
    Object.entries(a).map(([e, t]) => [_u(e, ""), String(t ?? "").trim()]).filter(([e]) => !!e)
  );
}
function Bu(a, e = "", { legacySelectedSkill: t = "" } = {}) {
  const i = new Set((Array.isArray(a == null ? void 0 : a.choices) ? a.choices : []).map(Ta)), n = String(e ?? "").trim();
  if (i.has(n)) return n;
  if (t) {
    const s = ws(t), r = s ? `skill:${s}` : "";
    if (r && i.has(r)) return r;
  }
  return i.size === 1 ? Array.from(i)[0] : "";
}
function zu(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(a == null ? void 0 : a.grants) ? a.grants : [], n = $u(e);
  return Object.fromEntries(
    i.map((s) => [
      s.id,
      Bu(s, n[s.id], { legacySelectedSkill: t })
    ])
  );
}
function ks(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(a == null ? void 0 : a.grants) ? a.grants : [], n = zu(a, e, { legacySelectedSkill: t });
  return i.map((s, r) => {
    const l = Bu(s, n[s.id], { legacySelectedSkill: t }), o = (Array.isArray(s.choices) ? s.choices : []).find((c) => Ta(c) === l) ?? null;
    return {
      id: s.id,
      index: r,
      label: String((s == null ? void 0 : s.label) ?? "").trim() || (i.length > 1 ? `Bonus ${r + 1}` : "Granted Bonus"),
      selectedKey: l,
      choice: o,
      isResolved: !!o,
      requiresSelection: (Array.isArray(s == null ? void 0 : s.choices) ? s.choices : []).length > 1
    };
  });
}
function ih(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  var i;
  return ((i = ks(a, e, { legacySelectedSkill: t }).map((n) => n.choice).find((n) => (n == null ? void 0 : n.type) === "skill")) == null ? void 0 : i.value) ?? "";
}
function Va(a = {}) {
  const e = foundry.utils.deepClone(a ?? {}), t = on(e.catalogId), i = t ? Ni(t) : null, n = Ts(e.moduleType || (i == null ? void 0 : i.moduleType)), s = i ? zu(i, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }) : $u(e.selectedGrants);
  return e.moduleType = n, e.catalogId = t, e.selectedGrants = s, e.selectedSkill = i ? ih(i, s, { legacySelectedSkill: e.selectedSkill }) : ws(e.selectedSkill), e;
}
function Fu(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  return ks(a, e, { legacySelectedSkill: t }).map((i) => {
    var o, c;
    const n = Array.isArray((c = (o = a == null ? void 0 : a.grants) == null ? void 0 : o[i.index]) == null ? void 0 : c.choices) ? a.grants[i.index].choices : [], s = new Set(n.map((u) => u.type)).size > 1, r = n.map((u) => ({
      value: Ta(u),
      label: Ka(u, { includeTypePrefix: s }),
      selected: Ta(u) === i.selectedKey
    })), l = r.length === 1 ? {
      value: r[0].value,
      label: r[0].label,
      displayLabel: Ka(n[0], { includeBonusText: !0 })
    } : null;
    return {
      id: i.id,
      label: i.label,
      selectionPath: `system.selectedGrants.${i.id}`,
      selectedKey: i.selectedKey,
      options: r,
      singleOption: l,
      hasMultipleChoices: r.length > 1
    };
  });
}
function ah(a, e) {
  return a.isDuplicate ? `Duplicate ${wa(a.moduleType)} slot item.` : a.catalog ? a.unresolvedGrantCount > 0 ? "Choose valid bonus options." : a.excludedBy.length ? `Blocked by ${hl(a.excludedBy, e).join(", ")}.` : a.requiresAny.length && !a.matchedRequirementIds.length ? `Requires ${hl(a.requiresAny, e).join(" or ")}.` : "" : "Catalog entry is missing or unlinked.";
}
function nh(a, e = [], t = {}) {
  var n, s, r;
  if (!a || !Array.isArray(e) || !e.length) return [];
  const i = Math.max(0, Number(((r = (s = (n = a.system) == null ? void 0 : n.attributes) == null ? void 0 : s.edge) == null ? void 0 : r.value) ?? 0));
  return e.filter((l) => (l == null ? void 0 : l.type) === "edgePool").map((l) => {
    var p, h, g, y;
    const o = String(l.value ?? "").trim(), c = Du(o), u = Math.max(0, Number(((y = (g = (h = (p = a.system) == null ? void 0 : p.counters) == null ? void 0 : h.edgePools) == null ? void 0 : g[o]) == null ? void 0 : y.rating) ?? 0)), d = Math.max(0, Number((t == null ? void 0 : t[o]) ?? 0)), m = Math.max(0, u + d - i);
    return m ? `${c} Pool bonus loses ${m} ${m === 1 ? "point" : "points"} to the Edge cap.` : "";
  }).filter(Boolean);
}
function Ii(a) {
  var m;
  const e = vs(), t = new Map(e.map((f) => [f.id, f])), i = Array.from((a == null ? void 0 : a.items) ?? []).filter((f) => f.type === A.itemType.lifeModule), n = /* @__PURE__ */ new Map();
  for (const f of i) {
    const p = Ts((m = f.system) == null ? void 0 : m.moduleType);
    !p || n.has(p) || n.set(p, f.id);
  }
  const s = i.map((f) => {
    var M;
    const p = Va(f.system ?? {}), h = t.get(p.catalogId) ?? null, g = p.moduleType || (h == null ? void 0 : h.moduleType) || "", y = h ? ks(h, p.selectedGrants, { legacySelectedSkill: p.selectedSkill }) : [], b = y.map((N) => N.choice).filter(Boolean), S = ((M = b.find((N) => N.type === "skill")) == null ? void 0 : M.value) ?? "", v = S ? Wt(S) : null;
    return {
      item: f,
      itemId: f.id,
      moduleType: g,
      catalogId: (h == null ? void 0 : h.id) ?? p.catalogId,
      catalog: h,
      label: (h == null ? void 0 : h.label) ?? f.name,
      selectedGrants: p.selectedGrants,
      resolvedGrants: y,
      unresolvedGrantCount: y.filter((N) => !N.isResolved).length,
      selectedChoices: b,
      selectedChoiceLabels: b.map((N) => Ka(N, { includeBonusText: !0 })),
      selectedSkill: S,
      selectedSkillLabel: (v == null ? void 0 : v.label) ?? S,
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
  let l = !0;
  for (; l; ) {
    l = !1;
    for (const f of s) {
      const p = f.requiresAny.filter(
        (g) => (r.get(g) ?? []).some((y) => y.isActive)
      ), h = !f.isDuplicate && !!f.catalog && f.unresolvedGrantCount === 0 && f.excludedBy.length === 0 && (f.requiresAny.length === 0 || p.length > 0);
      f.isActive !== h && (f.isActive = h, l = !0), f.matchedRequirementIds.join("|") !== p.join("|") && (f.matchedRequirementIds = p);
    }
  }
  const o = Object.fromEntries(ai.map((f) => [f.code, 0])), c = Object.fromEntries(Ru.map((f) => [f, 0])), u = /* @__PURE__ */ new Map();
  for (const f of s) {
    const p = f.isActive ? f.selectedChoices : [], h = p.filter((y) => y.type === "skill"), g = p.filter((y) => y.type === "edgePool");
    f.bonus = h.length;
    for (const y of h)
      o[y.value] = Number(o[y.value] ?? 0) + 1;
    for (const y of g)
      c[y.value] = Number(c[y.value] ?? 0) + 1;
    f.inactiveReason = f.isActive ? "" : ah(f, t), u.set(f.itemId, f);
  }
  for (const f of s)
    f.warningLabels = f.isActive ? nh(a, f.selectedChoices, c) : [];
  const d = As.map((f) => {
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
    bonusBySkill: o,
    bonusByEdgePool: c
  };
}
function sh(a = {}) {
  var t, i, n;
  const e = String((a == null ? void 0 : a.intent) ?? "").trim();
  return e === "skill" ? String(((t = a == null ? void 0 : a.data) == null ? void 0 : t.skillKey) ?? "").trim() : e === "attack" ? String(((n = (i = a == null ? void 0 : a.attack) == null ? void 0 : i.skill) == null ? void 0 : n.code) ?? "").trim() : "";
}
function rh({ actor: a, resolved: e } = {}) {
  const t = sh(e);
  return !a || !t ? [] : Ii(a).states.flatMap(
    (i) => i.isActive ? i.selectedChoices.filter((n) => n.type === "skill" && n.value === t).map((n) => ({
      id: `life-module:${i.itemId}:${Ta(n)}`,
      label: i.label,
      value: 1,
      source: "Life Module",
      tooltip: `${i.label}: +1 to ${Ka(n)} rolls`
    })) : []
  );
}
const oh = {
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
}, lh = {
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
}, Es = {
  Actor: oh,
  Item: lh
}, gl = Object.freeze({
  Actor: /* @__PURE__ */ new Set(["prototypeToken"]),
  Item: /* @__PURE__ */ new Set()
});
function Ya(a) {
  return !!a && typeof a == "object" && !Array.isArray(a);
}
function va(a) {
  return typeof structuredClone == "function" ? structuredClone(a) : JSON.parse(JSON.stringify(a));
}
function Qa(a = {}, e = {}) {
  const t = va(a);
  for (const [i, n] of Object.entries(e ?? {})) {
    if (Ya(n) && Ya(t[i])) {
      t[i] = Qa(t[i], n);
      continue;
    }
    t[i] = va(n);
  }
  return t;
}
function Uu(a = "", e = Es) {
  const t = e == null ? void 0 : e[a];
  return Ya(t) ? t : {};
}
function Hu(a = Es, e = "", t = "", i = /* @__PURE__ */ new Set()) {
  var c;
  const n = String(t ?? "").trim();
  if (!n || i.has(n)) return {};
  const s = Uu(e, a), r = (c = s == null ? void 0 : s.templates) == null ? void 0 : c[n];
  if (!Ya(r)) return {};
  i.add(n);
  let l = {};
  for (const u of Array.from(r.templates ?? []))
    l = Qa(
      l,
      Hu(a, e, u, i)
    );
  const o = va(r);
  return delete o.templates, Qa(l, o);
}
function ch(a = Es, e = "", t = "") {
  const i = String(t ?? "").trim();
  if (!i) return {};
  const n = Uu(e, a), s = n == null ? void 0 : n[i];
  if (!Ya(s)) return {};
  let r = {};
  for (const o of Array.from(s.templates ?? []))
    r = Qa(
      r,
      Hu(a, e, o)
    );
  const l = va(s);
  return delete l.templates, Qa(r, l);
}
function uh(a = "", e = "", t = Es) {
  const i = ch(t, a, e), n = gl[a] ?? gl.Item, s = { system: {} };
  for (const [r, l] of Object.entries(i))
    n.has(r) ? s[r] = va(l) : s.system[r] = va(l);
  return s;
}
async function Wu(a = "", e = "") {
  return uh(a, e);
}
const ju = Object.freeze({
  weapon: A.itemType.personalWeapon,
  shadowamp: A.itemType.assetModule
}), dh = Object.freeze({
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
function Gu(a) {
  return ju[a] ?? a;
}
function mh(a) {
  return dh[Gu(a)];
}
function fh(a) {
  return Object.prototype.hasOwnProperty.call(ju, a);
}
const Qi = Object.freeze(["close", "near", "far", "extreme"]), yl = Object.freeze({
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
});
function Ia() {
  return foundry.data.operators.ForcedDeletion;
}
function ph(a, e) {
  const t = String(e ?? "").split(".").map((n) => n.trim()).filter(Boolean);
  if (!a || typeof a != "object" || t.length < 2) return a;
  let i = a;
  for (let n = 0; n < t.length - 1; n += 1) {
    const s = t[n], r = i == null ? void 0 : i[s];
    (!r || typeof r != "object" || Array.isArray(r)) && (i[s] = {}), i = i[s];
  }
  return a;
}
function hh(a, e) {
  const t = String(e ?? "").trim();
  if (!a || typeof a != "object" || !t) return !1;
  if (t.startsWith("areaEffect.hazard.")) {
    (!a.areaEffect || typeof a.areaEffect != "object" || Array.isArray(a.areaEffect)) && (a.areaEffect = {});
    const i = String(a.areaEffect.kind ?? "").trim().toLowerCase();
    if (i && i !== "persistent")
      return !1;
    a.areaEffect.kind = "persistent";
  }
  return ph(a, t), !0;
}
function Da(a) {
  return Ea(a);
}
function bl(a = {}) {
  const e = Sc({
    traits: a.traits,
    keywords: a.keywords,
    report: no(),
    path: "system.traits"
  });
  return {
    traits: e.traits,
    keywords: e.keywords
  };
}
function qu(a) {
  return a === "long" ? "extreme" : a === "short" ? "close" : a === "medium" ? "near" : Qi.includes(a) ? a : "near";
}
function ra(a) {
  const e = Mo(a);
  return e.max = qu(e.max ?? (a == null ? void 0 : a.max) ?? "extreme"), e;
}
function Fs(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function Sl(a, e = 1) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function Al(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function Tl(a) {
  return String(a ?? "").trim();
}
function wl(a) {
  return (Array.isArray(a) ? a : typeof a == "string" ? a.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function gh(a) {
  const e = Qi.indexOf(a);
  return e >= 0 ? e : Qi.indexOf("near");
}
function yh(a = ra({})) {
  const e = ["near", "close", "far", "extreme"], t = gh(a.max);
  return e.find((i) => Qi.indexOf(i) <= t) ?? "close";
}
function bh(a) {
  const e = qu(a == null ? void 0 : a.max), t = Qi.indexOf(e);
  return Qi.map((i, n) => ({
    key: i,
    allowed: t >= 0 ? n <= t : n === 0,
    value: (a == null ? void 0 : a[i]) ?? void 0,
    labelkey: Qn(i)
  }));
}
function Sh(a, e, t, i) {
  let n = Number(e);
  if (t)
    if (i !== void 0)
      n += Math.ceil(Number(i) / 2);
    else
      return console.warn("Weapon not attached to an actor"), Pe.item.personalWeapon.weaponWithoutActor;
  return n;
}
function Ah(a, e, t) {
  let i = "";
  return t && Pe.attributes[t] && (i += Pe.attributes[t].substring(0, 3).toUpperCase() + "/2 + "), i += String(e), i;
}
function Th(a, e) {
  return F.useArmor(a) ? e ? "noArmor" : "withArmor" : "";
}
function vl(a) {
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
function Us(a = {}) {
  const e = Va(a), t = Ni(e.catalogId);
  return {
    system: e,
    ...t ? { name: t.label } : {}
  };
}
function wh(a) {
  const e = String(a ?? "").trim();
  return !!(!e || e.startsWith("icons/svg/") || e === "icons/mystery-man.svg");
}
var Za, jt, vr, Ku, Rn;
const Qe = class Qe extends Item {
  static init() {
    z(this, Za) || (Ie(this, Za, !0), Hooks.on("createItem", (e, t, i) => {
      var n, s;
      Promise.resolve((n = e.onCreateItem) == null ? void 0 : n.call(e, t, i)).catch((r) => {
        console.error(`${be}Item create hook failed`, r);
      }), E(s = Qe, jt, vr).call(s, e);
    }), Hooks.on("updateItem", (e) => {
      var t;
      E(t = Qe, jt, vr).call(t, e);
    }), Hooks.on("deleteItem", (e) => {
      var t;
      E(t = Qe, jt, Ku).call(t, e);
    }), Hooks.on("createActiveEffect", (e) => {
      var t;
      E(t = Qe, jt, Rn).call(t, e);
    }), Hooks.on("updateActiveEffect", (e) => {
      var t;
      E(t = Qe, jt, Rn).call(t, e);
    }), Hooks.on("deleteActiveEffect", (e) => {
      var t;
      E(t = Qe, jt, Rn).call(t, e);
    }));
  }
  static canonicalType(e) {
    return Gu(e);
  }
  static defaultIconForType(e) {
    return mh(e);
  }
  get canonicalType() {
    return this.constructor.canonicalType(this.type);
  }
  async onCreateItem(e, t) {
  }
  async _preCreate(e, t, i) {
    super._preCreate && await super._preCreate(e, t, i);
    const n = (e == null ? void 0 : e.type) ?? this.type, s = this.constructor.canonicalType(n), r = {}, l = await Wu("Item", s);
    if (l.system && Object.keys(l.system).length && (r.system = foundry.utils.mergeObject(
      foundry.utils.deepClone(l.system),
      foundry.utils.deepClone((e == null ? void 0 : e.system) ?? this.system ?? {}),
      { inplace: !1, recursive: !0, overwrite: !0 }
    )), n !== s && fh(n) && (r.type = s), wh((e == null ? void 0 : e.img) ?? this.img)) {
      const o = this.constructor.defaultIconForType(s);
      o && (r.img = o);
    }
    if (s === A.itemType.lifeModule && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (r.name = "MWD.itemType.singular.lifeModule"), s === A.itemType.lifeModule) {
      const o = Us(r.system ?? (e == null ? void 0 : e.system) ?? this.system ?? {});
      r.system = o.system, o.name && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (r.name = o.name);
    }
    Object.keys(r).length && this.updateSource(r);
  }
  async _preUpdate(e, t, i) {
    var o, c;
    super._preUpdate && await super._preUpdate(e, t, i);
    const n = e != null && e.system ? foundry.utils.mergeObject(foundry.utils.deepClone(this.system ?? {}), foundry.utils.deepClone(e.system), { inplace: !1 }) : null;
    if (n && this.isPersonalWeapon()) {
      e.system ?? (e.system = {});
      const u = n.ammo, d = bl(n);
      e.system.standardTraits = [], e.system.payloads = li(n.payloads, { legacyAmmo: u, category: n.category }), e.system.consumptionSources = _a(n.consumptionSources, { legacyAmmo: u }), e.system.selectedPayloadId = sa(
        n.selectedPayloadId,
        e.system.payloads,
        { legacyAmmo: u, category: n.category }
      ), e.system.traits = d.traits, e.system.keywords = d.keywords, e.system.resolution = wn(n.resolution, "standard"), e.system.fireModes = vn(n.fireModes), e.system.attackRatingBand = Fs(n.attackRatingBand), e.system.range = ra(n.range), e.system.damageType = Gt(n.damageType), e.system.ammo = Ia();
    }
    if (n && this.isArmor() && (e.system ?? (e.system = {}), e.system.mitigationByType = ti(n.mitigationByType ?? n.mitigation), e.system.tags = Tn(n.tags), e.system.traits = Da(n.traits), e.system.standardTraits = oi(n.standardTraits), e.system.traitState = _s({
      standardTraits: e.system.standardTraits,
      traits: e.system.traits,
      traitState: n.traitState
    }).traitState), n && this.isLifeModule()) {
      const u = Us(n);
      e.system ?? (e.system = {}), foundry.utils.mergeObject(e.system, u.system, { inplace: !0, overwrite: !0 }), u.name && (e.name = u.name);
      return;
    }
    if (n && this.isQuality()) {
      e.system ?? (e.system = {});
      const u = Ht(n);
      foundry.utils.mergeObject(e.system, u, { inplace: !0, overwrite: !0 });
      return;
    }
    if (n && this.isQuantityTrackedInventoryItem()) {
      e.system ?? (e.system = {}), e.system.quantity = Sl(n.quantity, 1), e.system.rating = Al(n.rating, 0), e.system.category = Tl(n.category), e.system.tags = wl(n.tags);
      return;
    }
    if (!this.isSkill()) return;
    const s = (o = e == null ? void 0 : e.system) == null ? void 0 : o.code;
    if (s === void 0) return;
    const r = this.system.code;
    if (s === r) return;
    const l = vl(s);
    l && ((c = l == null ? void 0 : l.system) == null || delete c.code, foundry.utils.mergeObject(e, l, { inplace: !0 }));
  }
  prepareBaseData() {
    super.prepareBaseData();
    const e = this.canonicalType;
    e === A.itemType.personalWeapon ? this._preparePersonalWeaponBaseData() : e === A.itemType.armor ? this._prepareArmorBaseData() : e === A.itemType.lifeModule ? this._prepareLifeModuleBaseData() : e === A.itemType.quality ? this._prepareQualityBaseData() : [A.itemType.gear, A.itemType.consumable].includes(e) && this._prepareGearBaseData();
  }
  _preparePersonalWeaponBaseData() {
    const e = this.system ?? {}, t = e.ammo;
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = Gt(e.damageType), e.attackRatingBand = Fs(e.attackRatingBand), e.range = ra(e.range);
    const i = bl(e);
    e.standardTraits = [], e.traits = i.traits, e.keywords = i.keywords, e.resolution = wn(e.resolution, "standard"), e.fireModes = vn(e.fireModes), e.payloads = li(e.payloads, { legacyAmmo: t, category: e.category }), e.consumptionSources = _a(e.consumptionSources, { legacyAmmo: t }), e.selectedPayloadId = sa(e.selectedPayloadId, e.payloads, { legacyAmmo: t, category: e.category }), delete e.ammo, e.notes = String(e.notes ?? "").trim();
  }
  _prepareArmorBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.rating = Math.max(0, Number(e.rating ?? 0)), e.defenseBonus = Number(e.defenseBonus ?? 0) || 0, e.mitigationByType = ti(e.mitigationByType ?? e.mitigation), delete e.mitigation, e.durability ?? (e.durability = {}), e.durability.max = Math.max(0, Number(e.durability.max ?? e.rating ?? 0)), e.durability.current = Math.min(
      e.durability.max,
      Math.max(0, Number(e.durability.current ?? e.durability.max ?? e.rating ?? 0))
    ), e.standardTraits = oi(e.standardTraits), e.tags = Tn(e.tags), e.traits = Da(e.traits), e.traitState = _s({
      standardTraits: e.standardTraits,
      traits: e.traits,
      traitState: e.traitState
    }).traitState, e.notes = String(e.notes ?? "").trim();
  }
  _prepareLifeModuleBaseData() {
    const e = Us(this.system ?? {});
    foundry.utils.mergeObject(this.system, e.system, { inplace: !0, overwrite: !0 });
  }
  _prepareQualityBaseData() {
    const e = Ht(this.system ?? {});
    foundry.utils.mergeObject(this.system, e, { inplace: !0, overwrite: !0 });
  }
  _prepareGearBaseData() {
    const e = this.system ?? {};
    e.quantity = Sl(e.quantity, 1), e.rating = Al(e.rating, 0), e.category = Tl(e.category), e.tags = wl(e.tags);
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
      const i = (s = (n = t.flags) == null ? void 0 : n[T]) == null ? void 0 : s[Qe.EQUIPPED_EFFECT_FLAG];
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
      const y = (h = (p = (f = g.flags) == null ? void 0 : f[T]) == null ? void 0 : p[Qe.EQUIPPED_EFFECT_FLAG]) == null ? void 0 : h.sourceEffectId;
      if (!y) continue;
      const b = n.get(y) ?? [];
      b.push(g), n.set(y, b);
    }
    const s = [], r = [], l = [], o = new Set(i.map((g) => g.id));
    for (const [g, y] of n.entries()) {
      if (!o.has(g)) {
        l.push(...y.map((b) => b.id));
        continue;
      }
      y.length > 1 && l.push(...y.slice(1).map((b) => b.id));
    }
    for (const g of i) {
      const b = (n.get(g.id) ?? [])[0] ?? null, S = this._prepareSyncedActorEffectData(g);
      b ? r.push({ _id: b.id, ...S }) : s.push(S);
    }
    const c = l.length ? await e.deleteEmbeddedDocuments("ActiveEffect", l) : [], u = r.length ? await e.updateEmbeddedDocuments("ActiveEffect", r) : [];
    return { created: s.length ? await e.createEmbeddedDocuments("ActiveEffect", s) : [], updated: u, deleted: c };
  }
  _prepareSyncedActorEffectData(e) {
    const t = e.toObject();
    delete t._id;
    const i = String(e.name ?? "Effect").trim() || "Effect", n = String(this.name ?? "Item").trim() || "Item", s = i.startsWith(n) ? i : `${n}: ${i}`;
    return t.name = s, t.transfer = !1, t.origin = e.uuid ?? this.uuid ?? t.origin ?? null, t.flags = foundry.utils.mergeObject(t.flags ?? {}, {
      [T]: {
        [Qe.EQUIPPED_EFFECT_FLAG]: {
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
    this.parent && await Xt.itemAttributeRoll(this, e);
  }
  async switchMonitorCheck(e, t, i, n = void 0) {
    await F.switchMonitorCheck(this.parent, e, t, i, n, this);
  }
  async setCounter(e, t) {
    await F.setCounter(this, e, t);
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
    se.reindexIds(t), await this.update({ "system.modifiers": t });
  }
  async _mutateQualitySystem(e = (t) => t) {
    const t = e(foundry.utils.deepClone(Ht(this.system ?? {})));
    await this.update({ system: Ht(t) });
  }
  async createQualityPrerequisite(e = {}) {
    await this._mutateQualitySystem((t) => (t.prerequisites = di(t.prerequisites).concat([{
      id: e.id ?? foundry.utils.randomID(),
      fact: e.fact ?? "",
      comparator: e.comparator ?? "eq",
      value: e.value ?? ""
    }]), t));
  }
  async deleteQualityPrerequisite(e) {
    await this._mutateQualitySystem((t) => (t.prerequisites = di(t.prerequisites).filter((i) => i.id !== e), t));
  }
  async updateQualityPrerequisite(e, t, i) {
    await this._mutateQualitySystem((n) => (n.prerequisites = di(n.prerequisites).map((s) => (s.id !== e || (t === "fact" && (s.fact = i), t === "comparator" && (s.comparator = i), t === "value" && (s.value = i)), s)), n));
  }
  async createQualityEffect(e = {}) {
    await this._mutateQualitySystem((t) => (t.effects = xi(t.effects).concat([{
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
      conditions: di(e.conditions ?? []),
      limit: Pi(e.limit ?? {})
    }]), t));
  }
  async deleteQualityEffect(e) {
    await this._mutateQualitySystem((t) => (t.effects = xi(t.effects).filter((i) => i.id !== e), t));
  }
  async updateQualityEffect(e, t, i) {
    await this._mutateQualitySystem((n) => (n.effects = xi(n.effects).map((s) => (s.id !== e || (t === "type" && (s.type = i), t === "phase" && (s.phase = i), t === "selector" && (s.selector = i), t === "skillKeys" && (s.skillKeys = Array.isArray(i) ? i : []), t === "label" && (s.label = i), t === "value" && (s.value = Number(i ?? 0) || 0), t === "min" && (s.min = i === "" ? null : Number(i ?? 0)), t === "max" && (s.max = i === "" ? null : Number(i ?? 0)), t === "pool" && (s.pool = i), t === "operation" && (s.operation = i), t === "limit.perActivation" && (s.limit = Pi({ ...s.limit ?? {}, perActivation: i })), t === "limit.perRound" && (s.limit = Pi({ ...s.limit ?? {}, perRound: i })), t === "limit.perScene" && (s.limit = Pi({ ...s.limit ?? {}, perScene: i }))), s)), n));
  }
  async createQualityEffectCondition(e, t = {}) {
    await this._mutateQualitySystem((i) => (i.effects = xi(i.effects).map((n) => (n.id !== e || (n.conditions = di(n.conditions).concat([{
      id: t.id ?? foundry.utils.randomID(),
      fact: t.fact ?? "",
      comparator: t.comparator ?? "eq",
      value: t.value ?? ""
    }])), n)), i));
  }
  async deleteQualityEffectCondition(e, t) {
    await this._mutateQualitySystem((i) => (i.effects = xi(i.effects).map((n) => (n.id !== e || (n.conditions = di(n.conditions).filter((s) => s.id !== t)), n)), i));
  }
  async updateQualityEffectCondition(e, t, i, n) {
    await this._mutateQualitySystem((s) => (s.effects = xi(s.effects).map((r) => (r.id !== e || (r.conditions = di(r.conditions).map((l) => (l.id !== t || (i === "fact" && (l.fact = n), i === "comparator" && (l.comparator = n), i === "value" && (l.value = n)), l))), r)), s));
  }
  async _mutateWeaponStandardTraits(e = (t) => t) {
    var i;
    const t = e(foundry.utils.deepClone($i((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": $i(t) });
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
    const t = e(foundry.utils.deepClone(oi((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": oi(t) });
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
    var n, s, r, l, o, c, u;
    const t = e(foundry.utils.deepClone(
      li((n = this.system) == null ? void 0 : n.payloads, {
        legacyAmmo: (s = this.system) == null ? void 0 : s.ammo,
        category: ((r = this.system) == null ? void 0 : r.category) ?? ((l = this.system) == null ? void 0 : l.weaponCategory)
      })
    )).map(lt), i = sa((o = this.system) == null ? void 0 : o.selectedPayloadId, t, {
      category: ((c = this.system) == null ? void 0 : c.category) ?? ((u = this.system) == null ? void 0 : u.weaponCategory)
    });
    await this.update({
      "system.payloads": t,
      "system.selectedPayloadId": i,
      "system.ammo": Ia()
    });
  }
  async _mutateConsumptionSources(e = (t) => t) {
    var i, n;
    const t = e(foundry.utils.deepClone(
      _a((i = this.system) == null ? void 0 : i.consumptionSources, { legacyAmmo: (n = this.system) == null ? void 0 : n.ammo })
    )).map(Jt);
    await this.update({
      "system.consumptionSources": t,
      "system.ammo": Ia()
    });
  }
  async updatePayloadField(e, t, i) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((n) => n.map((s) => s.id !== e ? s : (hh(s, t) && foundry.utils.setProperty(s, t, i), lt(s))));
  }
  async createPayload(e = {}) {
    await this._mutatePayloads((t) => t.concat([lt({
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
    var s, r, l, o, c;
    if (String(e ?? "").trim() === "unloaded") return;
    const t = ((s = this.system) == null ? void 0 : s.category) ?? ((r = this.system) == null ? void 0 : r.weaponCategory), i = li((l = this.system) == null ? void 0 : l.payloads, {
      legacyAmmo: (o = this.system) == null ? void 0 : o.ammo,
      category: t
    }).filter((u) => u.id !== e), n = ((c = i[0]) == null ? void 0 : c.id) ?? "unloaded";
    await this.update({
      "system.payloads": i.length ? i : li([], { category: t }),
      "system.selectedPayloadId": i.some((u) => {
        var d;
        return u.id === ((d = this.system) == null ? void 0 : d.selectedPayloadId);
      }) ? this.system.selectedPayloadId : i.length ? n : "",
      "system.ammo": Ia()
    });
  }
  async createPayloadStandardTrait(e, t = {}) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((n) => n.id !== e ? n : (n.modifies ?? (n.modifies = {}), n.modifies.standardTraits = $i(n.modifies.standardTraits).concat([{
      id: t.id ?? foundry.utils.randomID(),
      key: t.key ?? "armorPiercing",
      rating: Math.max(0, Number(t.rating ?? 0) || 0)
    }]), lt(n))));
  }
  async deletePayloadStandardTrait(e, t) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((n) => n.id !== e ? n : (n.modifies ?? (n.modifies = {}), n.modifies.standardTraits = $i(n.modifies.standardTraits).filter((s) => s.id !== t), lt(n))));
  }
  async updatePayloadStandardTrait(e, t, i, n) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((s) => s.map((r) => r.id !== e ? r : (r.modifies ?? (r.modifies = {}), r.modifies.standardTraits = $i(r.modifies.standardTraits).map((l) => (l.id !== t || (i === "key" && (l.key = n), i === "rating" && (l.rating = Math.max(0, Number(n ?? 0) || 0))), l)), lt(r))));
  }
  async createConsumptionSource(e = {}) {
    await this._mutateConsumptionSources((t) => t.concat([Jt({
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
      return ((n = i == null ? void 0 : i.consumption) == null ? void 0 : n.sourceId) !== e ? i : (i.consumption.sourceId = "", lt(i));
    }));
  }
  async updateConsumptionSourceField(e, t, i) {
    await this._mutateConsumptionSources((n) => n.map((s) => {
      var r, l, o;
      if (s.id !== e) return s;
      if (foundry.utils.setProperty(s, t, i), t === "kind" && s.kind === "itemRef" && (s.link ?? (s.link = {}), String(s.link.itemPath ?? "").trim() || (s.link.itemPath = "quantity"), (!String(s.label ?? "").trim() || String(s.label ?? "").trim() === "Source") && (s.label = "Linked Item")), t === "link.itemId" && s.kind === "itemRef") {
        s.link ?? (s.link = {}), String(s.link.itemPath ?? "").trim() || (s.link.itemPath = "quantity");
        const c = ((o = (l = (r = this.actor) == null ? void 0 : r.items) == null ? void 0 : l.get) == null ? void 0 : o.call(l, String(s.link.itemId ?? "").trim())) ?? null;
        c && (!String(s.label ?? "").trim() || ["Source", "Linked Item"].includes(String(s.label ?? "").trim())) && (s.label = c.name ?? s.label);
      }
      return Jt(s);
    }));
  }
  getPayloadState({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var i, n, s, r, l;
    return mr({
      payloads: (i = this.system) == null ? void 0 : i.payloads,
      selectedPayloadId: (n = this.system) == null ? void 0 : n.selectedPayloadId,
      consumptionSources: (s = this.system) == null ? void 0 : s.consumptionSources,
      actor: this.actor ?? null,
      payloadId: e || t,
      category: ((r = this.system) == null ? void 0 : r.category) ?? ((l = this.system) == null ? void 0 : l.weaponCategory)
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
    const r = this.getPayloadState({ payloadId: e || t }), l = (r == null ? void 0 : r.sourceState) ?? null, o = (r == null ? void 0 : r.source) ?? null, c = String((r == null ? void 0 : r.activePayloadId) ?? "").trim(), u = String((r == null ? void 0 : r.payloadLabel) ?? "").trim() || "Unloaded", d = Math.max(0, Number((l == null ? void 0 : l.current) ?? 0) || 0), m = Math.max(0, Number((l == null ? void 0 : l.max) ?? 0) || 0), f = !!((g = x.getCombat(this.actor)) != null && g.combatant);
    return !c || c === "unloaded" ? {
      ...s,
      reason: "Select a payload before reloading.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: o,
      sourceState: l,
      current: d,
      max: m,
      inCombat: f
    } : l != null && l.isTracked ? l.kind !== "internal" ? {
      ...s,
      reason: "Linked ammo sources are read-only from the weapon sheet.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: o,
      sourceState: l,
      current: d,
      max: m,
      inCombat: f
    } : m <= 0 ? {
      ...s,
      reason: "This payload source has no reloadable capacity.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: o,
      sourceState: l,
      current: d,
      max: m,
      inCombat: f
    } : f && !(i != null && i.isGM) ? {
      ...s,
      reason: "Only a GM can reload from the weapon sheet during combat.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: o,
      sourceState: l,
      current: d,
      max: m,
      inCombat: f
    } : d >= m ? {
      ...s,
      reason: "Magazine already full.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: o,
      sourceState: l,
      current: d,
      max: m,
      inCombat: f
    } : {
      canReload: !0,
      reason: "",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: o,
      sourceState: l,
      current: d,
      max: m,
      inCombat: f
    } : {
      ...s,
      reason: "This payload is untracked and does not need to be reloaded.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: o,
      sourceState: l,
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
      var l;
      return r.id !== i.source.id ? r : (r.tracking ?? (r.tracking = {}), r.tracking.max = Math.max(0, Number(((l = r.tracking) == null ? void 0 : l.max) ?? i.max) || i.max), r.tracking.current = i.max, Jt(r));
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
    var i, n, s, r, l, o;
    const t = sa(
      e,
      li((i = this.system) == null ? void 0 : i.payloads, {
        legacyAmmo: (n = this.system) == null ? void 0 : n.ammo,
        category: ((s = this.system) == null ? void 0 : s.category) ?? ((r = this.system) == null ? void 0 : r.weaponCategory)
      }),
      {
        category: ((l = this.system) == null ? void 0 : l.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
      }
    );
    await this.update({
      "system.selectedPayloadId": t,
      "system.ammo": Ia()
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
    return s < n ? !1 : i.sourceState.kind === "internal" ? (await this._mutateConsumptionSources((l) => l.map((o) => {
      var c;
      return o.id !== ((c = i.source) == null ? void 0 : c.id) ? o : (o.tracking ?? (o.tracking = {}), o.tracking.current = Math.max(0, s - n), Jt(o));
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
    const i = this.system ?? {}, n = ra(i.range), s = String(i.skill ?? "").trim(), r = Wt(s), l = Number(i.damage ?? 0) || 0, o = String(i.category ?? i.weaponCategory ?? "ranged").trim() || "ranged", c = Hm({
      damageType: i.damageType,
      ap: Number(i.ap ?? i.armorPiercing ?? 0) || 0,
      attackRatingBand: Fs(i.attackRatingBand),
      traits: Da(i.traits),
      keywords: Nm(i.keywords),
      standardTraits: [],
      resolution: wn(i.resolution, "standard"),
      fireModes: vn(i.fireModes),
      payloads: li(i.payloads, { legacyAmmo: i.ammo, category: o }),
      selectedPayloadId: sa(i.selectedPayloadId, i.payloads, { legacyAmmo: i.ammo, category: o }),
      consumptionSources: _a(i.consumptionSources, { legacyAmmo: i.ammo }),
      payloadId: e || t,
      actor: this.actor ?? null,
      category: o
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
      category: o,
      skill: s || "firearms",
      skillDef: r,
      damage: l,
      ap: c.ap,
      damageType: c.damageType,
      damageTypeLabel: qt(c.damageType),
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
    ), r = Math.min(i, s), l = ti((t == null ? void 0 : t.mitigationByType) ?? (t == null ? void 0 : t.mitigation)), o = _s({
      standardTraits: oi(t == null ? void 0 : t.standardTraits),
      traits: Da(t == null ? void 0 : t.traits),
      traitState: t == null ? void 0 : t.traitState
    }), c = Tn(t == null ? void 0 : t.tags), u = lo(r);
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
      mitigationByType: Uc(l, o.mitigationByType),
      tags: c,
      isDestroyed: s <= 0,
      durability: {
        current: s,
        max: n
      },
      traitState: o.traitState,
      standardTraits: oi(t.standardTraits),
      traits: Wm({
        traits: Da(t.traits),
        standardTraits: oi(t.standardTraits)
      }),
      notes: String(t.notes ?? "").trim()
    };
  }
  getDefaultRangeBand(e = ra(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    return yh(e);
  }
  isWeaponSkill(e) {
    return ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === A.itemType.skill && e.system.code === this.system.skill;
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find((n) => this.isWeaponSkill(n));
    if (e) return e;
    const t = game.items.find((n) => this.isWeaponSkill(n));
    return t || vl(this.system.skill);
  }
  getDefense() {
    if (!this.isPersonalWeapon())
      return this.system.defense ? Ne.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return Ne.fixedDefenseCode(this.system.defense);
    const e = Wt(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? Ne.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent) return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0, i = this.isPersonalWeapon() ? this.getCombatProfile() : null;
    return {
      value: Sh(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: (i == null ? void 0 : i.damageType) ?? this.system.damageType,
      damageTypeLabel: (i == null ? void 0 : i.damageTypeLabel) ?? this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: Th(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  getDamageCode() {
    return Ah(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  getDamageTypeLabel() {
    var t;
    if (this.isPersonalWeapon())
      return qt(((t = this.getCombatProfile()) == null ? void 0 : t.damageType) ?? this.system.damageType);
    const e = Pe.mwd.weaponDamageType[this.system.damageType] ?? Pe.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return bh(ra(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  validateTargets(e) {
    var r;
    const t = (r = this.getDamage()) == null ? void 0 : r.monitor, i = Ut.getTargetTokens(game.user), n = i.filter((l) => {
      var o;
      return (o = l.actor) == null ? void 0 : o.canReceiveDamage(t);
    }), s = i.filter((l) => {
      var o;
      return !((o = l.actor) != null && o.canReceiveDamage(t));
    }).map((l) => l.name);
    if (s.length > 0) {
      const l = ve(Pe.common.errors.ignoredTargets, {
        targets: s.reduce(se.joiner(", "))
      });
      ui.notifications.info(l);
    }
    if (n.length === 0) {
      const l = ve(Pe.common.errors.noTargetSelected, {
        weapon: this.name ?? Pe.itemType.singular.weapon
      });
      ui.notifications.info(l);
    } else
      this.checkWeaponTargetsCount(n);
    return n;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = yl[t] ?? {};
    Xi.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = yl[t] ?? {};
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
Za = new WeakMap(), jt = new WeakSet(), vr = async function(e) {
  if (typeof (e == null ? void 0 : e.syncEquippedActorEffects) == "function")
    try {
      await e.syncEquippedActorEffects();
    } catch (t) {
      console.error(`${be}Failed to sync equipped item effects`, { item: e, error: t });
    }
}, Ku = async function(e) {
  if (typeof (e == null ? void 0 : e.removeSyncedActorEffects) == "function")
    try {
      await e.removeSyncedActorEffects({ actor: e.actor ?? e.parent ?? null });
    } catch (t) {
      console.error(`${be}Failed to remove synced item effects`, { item: e, error: t });
    }
}, Rn = async function(e) {
  const t = e == null ? void 0 : e.parent;
  if (typeof (t == null ? void 0 : t.syncEquippedActorEffects) == "function")
    try {
      await t.syncEquippedActorEffects();
    } catch (i) {
      console.error(`${be}Failed to sync parent item effects`, { effect: e, error: i });
    }
}, Ae(Qe, jt), Ae(Qe, Za, !1), O(Qe, "RANGE_ORDER", Qi), O(Qe, "EQUIPPED_EFFECT_FLAG", "equippedItemSync"), O(Qe, "DEFAULT_UNARMED", Object.freeze({
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
let ka = Qe;
const kl = {
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
}, vh = {
  code: "weapon-range",
  options: {
    flags: { editable: !0 },
    order: 20,
    category: ge.pool,
    labelkey: Pe.common.roll.modifiers.weaponRange,
    hbsTemplateRoll: `${Q}/roll/parts/select-option.hbs`,
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
}, kh = {
  code: "weapon-area",
  options: {
    used: !0,
    order: 20,
    category: ge.pool,
    labelkey: Pe.common.roll.modifiers.weaponArea,
    hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`,
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
}, pe = class pe extends ka {
  static buildDefaultUnarmedProfile(e = null) {
    var n, s, r, l, o, c, u, d;
    const t = Math.max(0, Number(
      ((n = e == null ? void 0 : e.getAttributeValue) == null ? void 0 : n.call(e, A.actorAttributes.strength)) ?? ((l = (r = (s = e == null ? void 0 : e.system) == null ? void 0 : s.attributes) == null ? void 0 : r.strength) == null ? void 0 : l.value) ?? 0
    ) || 0), i = Math.max(0, Number(
      ((o = e == null ? void 0 : e.getAttributeValue) == null ? void 0 : o.call(e, A.actorAttributes.reflexes)) ?? ((d = (u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.attributes) == null ? void 0 : u.reflexes) == null ? void 0 : d.value) ?? 0
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
    Hooks.once(ze.REGISTER_ROLL_PARAMETERS, (e) => {
      e(kh), e(vh);
    });
  }
  prepareBaseData() {
    if (super.prepareBaseData(), (this.canonicalType ?? this.type) !== A.itemType.personalWeapon) return;
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = Gt(e.damageType), e.attackRatingBand = pe.normalizeAttackRatingBand(e.attackRatingBand), e.range = pe.normalizePersonalRangeData(e.range), e.traits = pe.normalizeTraits(e.traits), e.notes = String(e.notes ?? "").trim();
  }
  static maxIndex(e) {
    const t = pe.RANGE_ORDER.indexOf(e);
    return t >= 0 ? t : pe.RANGE_ORDER.indexOf("near");
  }
  /**
    * Compute UI-friendly range band data:
    * - cap: normalized max band
    * - bands: [{key, allowed, value}]
    * - optimalKey: highest value among allowed (tie -> closest)
    */
  static getRangeBands(e) {
    const t = e ?? {}, i = pe.normalizeRangeKey(t.max ?? "near"), n = pe.maxIndex(i), s = pe.RANGE_ORDER.map((o, c) => ({
      key: o,
      allowed: c <= n,
      value: Number(t[o] ?? (o === "extreme" && t.long !== void 0 ? t.long : 0))
    }));
    let r = "close", l = -1 / 0;
    for (const o of s)
      o.allowed && o.value > l && (l = o.value, r = o.key);
    return { cap: i, bands: s, optimalKey: r };
  }
  static get defaultIcon() {
    return "systems/mwd/img/colt-m1911.svg";
  }
  static defaultIconForType(e) {
    return e === A.itemType.mechWeapon ? "systems/mwd/img/default/Default_Weapon.svg" : this.defaultIcon;
  }
  static normalizeTraits(e) {
    return Ea(e);
  }
  static normalizePersonalRangeData(e) {
    const t = Mo(e);
    return t.max = pe.normalizeRangeKey(t.max ?? (e == null ? void 0 : e.max) ?? "extreme"), t;
  }
  static normalizeRangeData(e) {
    return {
      max: pe.normalizeRangeKey((e == null ? void 0 : e.max) ?? "near"),
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
    const t = this.system ?? {}, i = this.canonicalType ?? this.type, n = i === A.itemType.personalWeapon ? pe.normalizePersonalRangeData(t.range) : pe.normalizeRangeData(t.range), s = String(t.skill ?? "").trim(), r = Wt(s), l = Number(t.damage ?? 0) || 0, o = Number(t.ap ?? t.armorPiercing ?? 0) || 0, c = String(t.category ?? t.weaponCategory ?? "ranged").trim() || "ranged", u = pe.normalizeTraits(t.traits);
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
      damage: l,
      ap: o,
      damageType: i === A.itemType.personalWeapon ? Gt(t.damageType) : String(t.damageType ?? "kinetic").trim() || "kinetic",
      attackRatingBand: pe.normalizeAttackRatingBand(t.attackRatingBand),
      range: n,
      defaultRangeBand: this.getDefaultRangeBand(n),
      traits: u,
      effects: {},
      notes: String(t.notes ?? t.description ?? "").trim()
    };
  }
  getDefaultRangeBand(e = pe.normalizeRangeData(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    const i = ["near", "close", "far", "extreme"], n = pe.maxIndex(e.max);
    return i.find((s) => pe.RANGE_ORDER.indexOf(s) <= n) ?? "close";
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find(
      (n) => n.type === A.itemType.skill && n.system.code === this.system.skill
    );
    if (e) return e;
    const t = Wt(String(this.system.skill ?? "").trim());
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
      return this.system.defense ? Ne.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return Ne.fixedDefenseCode(this.system.defense);
    const e = Wt(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? Ne.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent)
      return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0;
    return {
      value: pe.damageValue(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: this.system.damageType,
      damageTypeLabel: this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: pe.armorMode(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  static damageValue(e, t, i, n) {
    if (t = Number(t), i)
      if (n !== void 0)
        t = t + Math.ceil(Number(n) / 2);
      else
        return console.warn("Weapon not attached to an actor"), Pe.item.personalWeapon.weaponWithoutActor;
    return t;
  }
  getDamageCode() {
    return pe.damageCode(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  static damageCode(e, t, i) {
    let n = "";
    return i && Pe.attributes[i] && (n += Pe.attributes[i].substring(0, 3).toUpperCase() + "/2 + "), n += String(t), n;
  }
  static armorMode(e, t) {
    return F.useArmor(e) ? t ? "noArmor" : "withArmor" : "";
  }
  getDamageTypeLabel() {
    if ((this.canonicalType ?? this.type) === A.itemType.personalWeapon)
      return qt(this.system.damageType);
    const e = Pe.mwd.weaponDamageType[this.system.damageType] ?? Pe.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    const e = (this.canonicalType ?? this.type) === A.itemType.personalWeapon, t = e ? pe.normalizePersonalRangeData(this.system.range) : pe.normalizeRangeData(this.system.range);
    return pe.getRangeList(t, {
      personalScale: e
    }).filter((i) => i.allowed).map((i) => ({ value: i.value, labelkey: i.labelkey }));
  }
  _getRange(e) {
    return { value: this.system.range[e], labelkey: ye.getFromList(ye.getEnums().ranges, e) };
  }
  static getRangeList(e, { personalScale: t = !1 } = {}) {
    const i = pe.normalizeRangeKey(e == null ? void 0 : e.max), n = pe.RANGE_ORDER.indexOf(i);
    return pe.RANGE_ORDER.map((s, r) => ({
      key: s,
      allowed: n >= 0 ? r <= n : r === 0,
      value: (e == null ? void 0 : e[s]) ?? (s === "extreme" && (e == null ? void 0 : e.long) !== void 0 ? e.long : void 0),
      labelkey: t ? Qn(s) : ye.getFromList(ye.getEnums().ranges, s)
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
    const t = (r = this.getDamage()) == null ? void 0 : r.monitor, i = Ut.getTargetTokens(game.user), n = i.filter((l) => {
      var o;
      return (o = l.actor) == null ? void 0 : o.canReceiveDamage(t);
    }), s = i.filter((l) => {
      var o;
      return !((o = l.actor) != null && o.canReceiveDamage(t));
    }).map((l) => l.name);
    if (s.length > 0) {
      const l = ve(Pe.common.errors.ignoredTargets, {
        targets: s.reduce(se.joiner(", "))
      });
      ui.notifications.info(l);
    }
    if (n.length == 0) {
      const l = ve(Pe.common.errors.noTargetSelected, {
        weapon: this.name ?? Pe.itemType.singular.weapon
      });
      ui.notifications.info(l);
    } else
      this.checkWeaponTargetsCount(n);
    return n;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = kl[t] ?? {};
    Xi.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = kl[t] ?? {};
    return i.targets && i.adjust && e <= i.targets ? i.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area == "" ? A.area.none : this.system.area ?? A.area.none;
  }
  _getMonitor() {
    return (this.canonicalType ?? this.type) === A.itemType.personalWeapon ? A.monitors.physical : this.system.monitor || A.monitors.physical;
  }
};
O(pe, "RANGE_ORDER", ["close", "near", "far", "extreme"]), O(pe, "DEFAULT_UNARMED", ka.DEFAULT_UNARMED);
let Mt = pe;
function Eh(a) {
  const e = [];
  for (let [t, i] of Object.entries(a ?? {}))
    i !== void 0 && (t = t.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (n, s) => (s ? "-" : "") + n.toLowerCase()), e.push(`data-${t}="${Handlebars.escapeExpression(i)}"`));
  return new Handlebars.SafeString(e.join(" "));
}
function Mh({ hash: a }) {
  return a;
}
function Ch() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
class Ro {
  constructor() {
    this.registerHelpers(), Hooks.once("init", () => {
      this.registerHelpers(), console.log(`${be}Handlebars helpers registered (init)`);
    }), console.log(`${be}Handlebars helpers registered (ctor)`);
  }
  registerHelpers() {
    const e = Ch(), t = {
      // Foundry utils
      getProperty: foundry.utils.getProperty,
      // DND5E-inspired utilities
      "mwd-dataset": Eh,
      "mwd-object": Mh,
      // Simple comparisons
      eq: (i, n) => i === n,
      ne: (i, n) => i !== n,
      // Strings/arrays
      concat: (...i) => se.join(i.slice(0, -1)),
      join: (i, n = " ") => Array.isArray(i) ? i.join(n) : "",
      includes: (i, n) => i == null ? void 0 : i.includes(n),
      length: (i) => (i == null ? void 0 : i.length) || 0,
      substring: (i, n, s) => i == null ? void 0 : i.substring(n, s),
      toUpperCase: jd.toUpperCaseNoAccent,
      // Math
      modulo: (i, n) => i % n,
      divint: se.divint,
      divup: se.divup,
      sum: (i, n) => i + n,
      diff: (i, n) => i - n,
      times: (i, n) => i * n,
      min: (i, n) => Math.min(i, n),
      max: (i, n) => Math.max(i, n),
      // Utility blocks
      for: Ro.hbsForLoop,
      // fixes “Missing helper: for”
      range: (i, n) => Array.from({ length: n - i + 1 }, (s, r) => i + r),
      ifGte: (i, n, s) => i >= n ? s.fn(this) : s.inverse(this),
      // Damage / weapons (legacy-compatible)
      weaponDamageLetter: Wd.letter,
      weaponDamageCode: Mt.damageCode,
      weaponDamageValue: Mt.damageValue,
      weaponArmorMode: Mt.armorMode,
      weaponRangeList: Mt.getRangeList,
      // Icons
      iconFA: q.fontAwesome,
      iconSrc: q.iconSystemPath,
      iconPath: q.iconPath,
      iconD6: q.iconD6,
      // Enums
      localizeAttribute: ye.localizeAttribute
    };
    e.registerHelper(t), e !== Handlebars && Handlebars.registerHelper(t);
  }
  static hbsForLoop(e, t, i) {
    let n = "";
    for (let s = e; s < t; ++s) n += i.fn(s);
    return n;
  }
}
const El = "sheetTheme", kr = "mwd-theme-default", Ph = "mwd-theme-sra", Nh = [
  { name: "Default (CSB)", cssClass: kr },
  { name: "SRA", cssClass: Ph }
];
class Rh {
  constructor() {
    this.availableStyles = {}, qi.register(ze.REGISTER_STYLES), Hooks.once(ze.REGISTER_STYLES, (e) => Nh.forEach((t) => e(t.cssClass, t.name))), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(ze.REGISTER_STYLES, (e, t) => this.availableStyles[e] = t), console.log(be + "Loaded styles", this.availableStyles), game.settings.register(T, El, {
      scope: "world",
      name: "Sheet Theme",
      hint: "Select the visual theme used by MWD sheets.",
      config: !0,
      default: kr,
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
    const e = game.settings.get(T, El);
    return this.availableStyles[e] ? e : kr;
  }
}
function Ml(a) {
  const e = Number(a ?? 0);
  return Number.isFinite(e) ? Math.trunc(e) : 0;
}
function La(a) {
  return a === A.monitors.physical ? "Physical" : a === A.monitors.fatigue ? "Fatigue" : String(a ?? "").trim() || "Track";
}
function Ih({
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
function Ha(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function Hs(a, e) {
  var i, n, s;
  if (!a) return null;
  const t = Ha(e) ?? Ha(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((s = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : s.call(i, ((n = t == null ? void 0 : t.baseActor) == null ? void 0 : n.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function gn(a, e) {
  var t, i, n;
  return Math.max(0, Number(((n = (i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.monitors) == null ? void 0 : i[e]) == null ? void 0 : n.value) ?? 0) || 0);
}
function Cl(a) {
  var e, t;
  return Math.max(0, Number(((t = (e = a == null ? void 0 : a.system) == null ? void 0 : e.burn) == null ? void 0 : t.value) ?? 0) || 0);
}
function Dh(a) {
  return (a == null ? void 0 : a.type) === A.actorTypes.character || (a == null ? void 0 : a.type) === A.actorTypes.npc;
}
function Oh(a) {
  return [
    A.actorTypes.character,
    A.actorTypes.npc,
    A.actorTypes.vehicle,
    A.actorTypes.battlemech
  ].includes(a == null ? void 0 : a.type);
}
function _h(a, e) {
  return String(a ?? "").trim() === "status" ? Oh(e) : Dh(e);
}
function Lh(a, e) {
  var t;
  return ((t = yo(e).find((i) => i.id === a)) == null ? void 0 : t.label) ?? a;
}
function xh(a) {
  const e = foundry.utils.escapeHTML, t = [];
  if (a.mode === "attackDamage" || a.mode === "trackDelta") {
    const i = a.appliedDelta >= 0 ? "Applied" : "Recovered", n = Math.abs(Number(a.appliedDelta ?? 0)), s = n === 1 ? "point" : "points", r = a.usedArmor ? ` via armor-aware ${e(qt(a.damageType))}` : "";
    t.push(`<div><b>${i}:</b> ${n} ${s} to ${e(La(a.track))}${r}</div>`), a.usedArmor && a.mitigation && (t.push(
      `<div><b>Mitigation:</b> base ${Number(a.mitigation.baseMitigation ?? 0)} + type ${Number(a.mitigation.typeMitigationMod ?? 0)} - AP ${Number(a.effectiveAp ?? 0)} = ${Number(a.mitigation.netResistance ?? 0)}</div>`
    ), Number(a.mitigation.reinforcedMax ?? 0) > 0 && t.push(
      `<div><b>Reinforced:</b> ${Number(a.mitigation.reinforcedAfter ?? 0)}/${Number(a.mitigation.reinforcedMax ?? 0)}</div>`
    ));
  }
  if (a.mode === "burnDelta") {
    const i = a.appliedDelta >= 0 ? "Adjusted Burn +" : "Adjusted Burn -";
    t.push(`<div><b>${i}</b>${Math.abs(Number(a.appliedDelta ?? 0))}</div>`);
  }
  return a.mode === "status" && t.push(
    `<div><b>Status:</b> ${a.active ? "Applied" : "Removed"} ${e(a.statusLabel ?? a.statusId ?? "Status")}</div>`
  ), t.push(`<div><b>Target:</b> ${e(a.actorName ?? "Actor")}</div>`), a.beforeLabel && a.afterLabel && t.push(`<div><b>Result:</b> ${e(a.beforeLabel)} -> ${e(a.afterLabel)}</div>`), a.source && t.push(`<div><b>Source:</b> ${e(a.source)}</div>`), a.notes && t.push(`<div><b>Notes:</b> ${e(a.notes)}</div>`), `<div class="mwd-gm-notice"><b>GM Harm:</b>${t.join("")}</div>`;
}
function $h(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
class yt {
  static supportsActor(e, { mode: t = "" } = {}) {
    return _h(t, e);
  }
  static getActorOptions({ mode: e = "" } = {}) {
    return Array.from(game.actors ?? []).filter((t) => this.supportsActor(t, { mode: e })).sort((t, i) => String(t.name ?? "").localeCompare(String(i.name ?? ""))).map((t) => ({
      id: t.id,
      name: t.name || "Character"
    }));
  }
  static getStatusOptions(e = null) {
    return yo(e).map((t) => ({
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
      const r = Ha(t[0]), l = Hs((r == null ? void 0 : r.actor) ?? null, r);
      return this._resolveSceneTargetResult(l, r, { mode: e });
    }
    const i = Array.from(((s = game.user) == null ? void 0 : s.targets) ?? []);
    if (i.length > 1)
      return { actor: null, token: null, reason: "Target only one token." };
    if (i.length === 1) {
      const r = Ha(i[0]), l = Hs((r == null ? void 0 : r.actor) ?? null, r);
      return this._resolveSceneTargetResult(l, r, { mode: e });
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
    var o, c;
    const r = Ha(t);
    if (r) {
      const u = Hs((r == null ? void 0 : r.actor) ?? e, r), d = this._resolveSceneTargetResult(u, r, { mode: s });
      if (d.actor) return { ...d, source: "token" };
    }
    if (n) {
      const u = this.getSceneTarget({ mode: s });
      if (u.actor) return { ...u, source: "scene" };
    }
    if (e && this.supportsActor(e, { mode: s }))
      return { actor: e, token: r, reason: "", source: "actor" };
    const l = i ? ((c = (o = game.actors) == null ? void 0 : o.get) == null ? void 0 : c.call(o, i)) ?? null : null;
    return l && this.supportsActor(l, { mode: s }) ? { actor: l, token: null, reason: "", source: "fallback" } : {
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
    let l;
    switch (String((i == null ? void 0 : i.mode) ?? "").trim()) {
      case "attackDamage":
        l = await this._applyAttackDamage(r.actor, i, n);
        break;
      case "trackDelta":
        l = await this._applyTrackDelta(r.actor, i, n);
        break;
      case "burnDelta":
        l = await this._applyBurnDelta(r.actor, i);
        break;
      case "status":
        l = await this._applyStatus(r.actor, i);
        break;
      default:
        return { ok: !1, reason: "Unsupported harm mode." };
    }
    const o = {
      ok: !0,
      actor: r.actor,
      token: r.token,
      actorName: r.actor.name || "Character",
      sourceType: r.source,
      dryRun: !!n.dryRun,
      ...l
    };
    if (n.logToChat && !n.dryRun) {
      const u = xh(o), d = $h({
        speaker: ChatMessage.getSpeaker({ actor: r.actor, token: r.token }),
        content: u
      });
      await ChatMessage.create(d);
    }
    return n.dryRun || (c = x.renderOpenCharacterSheets) == null || c.call(x, r.actor.id), o;
  }
  static async _applyTrackDelta(e, t, i = {}) {
    const n = (t == null ? void 0 : t.track) === A.monitors.fatigue ? A.monitors.fatigue : A.monitors.physical, s = Ml((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0);
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
    const l = gn(e, n);
    i.dryRun || await F.addCounter(e, n, s);
    const o = i.dryRun ? Math.max(0, l + s) : gn(e, n);
    return {
      mode: "trackDelta",
      track: n,
      requestedDelta: s,
      appliedDelta: o - l,
      usedArmor: !1,
      beforeLabel: `${La(n)} ${l}`,
      afterLabel: `${La(n)} ${o}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyBurnDelta(e, t) {
    var o, c;
    const i = Ml((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0), n = Cl(e), s = Math.max(0, n + i), r = { "system.burn.value": s };
    s === 0 && ((c = (o = e.system) == null ? void 0 : o.burn) != null && c.overloaded) && (r["system.burn.overloaded"] = !1), await e.update(r);
    const l = Cl(e);
    return {
      mode: "burnDelta",
      requestedDelta: i,
      appliedDelta: l - n,
      beforeLabel: `Burn ${n}`,
      afterLabel: `Burn ${l}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyStatus(e, t) {
    const i = String((t == null ? void 0 : t.statusId) ?? (t == null ? void 0 : t.status) ?? "").trim();
    if (!i)
      return { mode: "status", statusId: "", active: !1, statusLabel: "Status", beforeLabel: "", afterLabel: "" };
    const n = Yi(e, i), s = !!(t != null && t.active);
    await lu({
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
    const r = Yi(e, i);
    return {
      mode: "status",
      statusId: i,
      statusLabel: Lh(i, e),
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
  static async _applyPersonalArmorAwareDamage(e, t, i = {}) {
    var U, K, Y, W, j, L, B, G, X;
    const n = !!i.dryRun, s = (t == null ? void 0 : t.track) === A.monitors.fatigue ? A.monitors.fatigue : A.monitors.physical, r = Math.max(0, Number((t == null ? void 0 : t.damage) ?? 0) || 0), l = Math.max(0, Number((t == null ? void 0 : t.netHits) ?? 0) || 0), o = (t == null ? void 0 : t.effects) ?? {}, c = ((U = e.getPersonalCombatLoadout) == null ? void 0 : U.call(e, { refresh: !0 })) ?? null, u = (c == null ? void 0 : c.activeArmor) ?? null, d = Math.max(0, Number((u == null ? void 0 : u.currentArmorRating) ?? ((K = u == null ? void 0 : u.durability) == null ? void 0 : K.current) ?? 0) || 0), m = Gt(t == null ? void 0 : t.damageType, "concussive"), f = gn(e, s);
    let p = r + l;
    const h = d > 0 ? Gm({
      damageIncoming: p,
      armorTags: (u == null ? void 0 : u.tags) ?? [],
      effects: o
    }) : { damageIncoming: p, applied: [] };
    p = h.damageIncoming;
    const g = jm({
      currentArmorRating: d,
      mitigationByType: (u == null ? void 0 : u.mitigationByType) ?? {},
      damageType: m
    }), y = Math.max(
      0,
      (Number((t == null ? void 0 : t.ap) ?? 0) || 0) + (Number((o == null ? void 0 : o.ap) ?? 0) || 0)
    ), b = g.isDestroyed ? 0 : Math.max(0, g.baseMitigation + g.typeMitigationMod - y);
    let S = Math.max(0, Math.ceil(p - b));
    const v = {
      snapshot: ((Y = x.getSnapshot) == null ? void 0 : Y.call(x, e)) ?? null
    }, M = Et({
      actor: e,
      phase: "onDamageResolved",
      facts: vu({
        actor: e,
        packet: {
          amount: S,
          track: s,
          damageType: m
        },
        runtime: v
      }),
      packet: {
        amount: S,
        track: s,
        damageType: m
      },
      options: { runtime: v, consumeUsage: !0 }
    });
    n || await mi({ actor: e, mutations: M.mutations, runtime: v }), S = Math.max(0, Number(M.packet.amount ?? S) || 0), !n && S > 0 && await F.addCounter(e, s, S);
    const N = Ih({
      incomingDamage: r + l,
      armorBefore: ((W = u == null ? void 0 : u.durability) == null ? void 0 : W.current) ?? 0,
      reinforcedBefore: ((L = (j = u == null ? void 0 : u.traitState) == null ? void 0 : j.reinforced) == null ? void 0 : L.current) ?? 0,
      reinforcedMax: ((G = (B = u == null ? void 0 : u.traitState) == null ? void 0 : B.reinforced) == null ? void 0 : G.max) ?? 0,
      hasArmorItem: !!((X = u == null ? void 0 : u.item) != null && X.id)
    });
    !n && Object.keys(N.update).length > 0 && await u.item.update(N.update);
    const P = n ? Math.max(0, f + S) : gn(e, s);
    return {
      mode: (t == null ? void 0 : t.mode) ?? "attackDamage",
      track: s,
      requestedDelta: r + l,
      appliedDelta: P - f,
      usedArmor: !0,
      damageType: m,
      effectiveAp: y,
      mitigation: {
        ...g,
        netResistance: b,
        armorBefore: N.armorBefore,
        armorAfter: N.armorAfter,
        reinforcedBefore: N.reinforcedBefore,
        reinforcedAfter: N.reinforcedAfter,
        reinforcedMax: N.reinforcedMax
      },
      damageIncoming: p,
      adjustedIncoming: p,
      finalDamage: S,
      tagEffectResult: h,
      beforeLabel: `${La(s)} ${f}`,
      afterLabel: `${La(s)} ${P}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
}
O(yt, "MODE_OPTIONS", Object.freeze([
  { value: A.monitors.physical, label: "Physical" },
  { value: A.monitors.fatigue, label: "Fatigue" },
  { value: "burn", label: "Burn" },
  { value: "status", label: "Status" }
]));
const Pl = Wn, Er = "damage-mode", Bh = `${T}.${Er}`, yn = {}, Ws = {};
class de {
  static init() {
    qi.register(ze.PROVIDE_DAMAGE_MODE), Hooks.on("updateSetting", async (e, t, i, n) => de.onUpdateSetting(e, t, i, n)), Hooks.on(ze.PROVIDE_DAMAGE_MODE, (e) => {
      e("resistanceArmorMonitor", w.settings.damageMode.values.resistanceArmorMonitor, de.sufferDamageResistanceArmorMonitor), e("armorResistanceMonitor", w.settings.damageMode.values.armorResistanceMonitor, de.sufferDamageArmorResistanceMonitor), e("armorGivesResistance", w.settings.damageMode.values.armorGivesResistance, de.sufferDamageArmorAsResistance_Earthdawn), e("armorGiveResistanceHitsAvoid", w.settings.damageMode.values.armorGiveResistanceHitsAvoid, de.sufferDamageArmorAsResistance_Cyberpunk);
    }), Hooks.once("ready", () => de.onReady());
  }
  static onReady() {
    de._registerDamageModeSetting(), de._selectDamageMode();
  }
  static _registerDamageModeSetting() {
    Hooks.callAll(ze.PROVIDE_DAMAGE_MODE, (e, t, i) => {
      yn[e] = t, Ws[e] = i;
    }), game.settings.register(T, Er, {
      scope: "world",
      name: w.settings.damageMode.name,
      hint: w.settings.damageMode.hint,
      config: !0,
      default: Object.keys(yn)[0],
      choices: yn,
      type: String
    });
  }
  static async onUpdateSetting(e, t, i, n) {
    e.key == Bh && de._selectDamageMode();
  }
  static _selectDamageMode() {
    let e = game.settings.get(T, Er);
    Ws[e] || (e = Object.keys(yn)[0]), de.damageModeCode = e, de.damageModeMethod = Ws[e];
  }
  static async sufferDamage(e, t, i, n, s, r, l) {
    const { monitor: o, damageType: c } = de._resolveDamageContext(e, t, l);
    if (Xi.checkActorCanReceiveDamage(c ?? o, o, e), de._shouldUsePersonalDamageV2(e, o, l)) {
      await de.sufferPersonalDamageV2(e, o, c, i, n, s, r, l);
      return;
    }
    await (de.damageModeMethod ?? de.sufferDamageResistanceArmorMonitor)(e, o, c, i, n, s, r), await e.applyArmorDamage(o, c, ce.sumModifiers([l], "other", "damageArmor"));
  }
  static _shouldUsePersonalDamageV2(e, t, i) {
    var n, s;
    return !((n = e == null ? void 0 : e.isCharacterLike) != null && n.call(e)) || ![A.monitors.physical, A.monitors.fatigue].includes(t) ? !1 : !!((s = i == null ? void 0 : i.isPersonalWeapon) != null && s.call(i) || (i == null ? void 0 : i.canonicalType) === A.itemType.personalWeapon || (i == null ? void 0 : i.type) === A.itemType.personalWeapon);
  }
  static async sufferPersonalDamageV2(e, t, i, n, s, r, l, o) {
    var d;
    const c = ((d = o == null ? void 0 : o.getCombatProfile) == null ? void 0 : d.call(o)) ?? o ?? null, u = await yt.apply({
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
    u != null && u.ok && de._notifyPersonalArmorMitigation(e, {
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
    const i = t.armorMitigation ?? {}, n = de._localizeDamageType(t.damageType), s = i.isDestroyed ? "Armor destroyed" : `Base ${Number(i.baseMitigation ?? 0)} + Type ${Number(i.typeMitigationMod ?? 0)} - AP ${Number(t.effectiveAp ?? 0)}`, r = Number(t.adjustedIncoming ?? t.baseIncoming ?? 0), l = Number(t.finalDamage ?? 0), o = (((u = t.tagEffectResult) == null ? void 0 : u.applied) ?? []).map((d) => `${d.tag} +${Math.round((Number(d.bonus ?? 0) || 0) * 100)}%`).join(", "), c = o ? ` [${o}]` : "";
    ui.notifications.info(
      `${e.name} mitigated ${n}: ${s}${c}. Incoming ${r}, final ${l}.`
    );
  }
  static async sufferDamageResistanceArmorMonitor(e, t, i, n, s, r, l) {
    const o = F.resistanceDetail(e, t, i), c = o.value;
    let u = 0;
    if (r) {
      const d = Math.min(c, n), m = Math.min(c - d, s);
      u = n - d, F.useArmor(t) && (u -= await de.damageToArmor(e, i, u)), u += s - m;
    } else
      u = n + s - c, F.useArmor(t) && (u -= await de.damageToArmor(e, i, u));
    u > 0 && await F.addCounter(e, t, u), de._notifyResistanceUsage(e, t, i, o);
  }
  static async sufferDamageArmorResistanceMonitor(e, t, i, n, s, r, l) {
    let o = 0;
    F.useArmor(t) ? r ? (n -= await de.damageToArmor(e, i, n), o = s + n) : (o = s + n, o -= await de.damageToArmor(e, i, o)) : o = n + s;
    const c = F.resistanceDetail(e, t, i);
    return o -= c.value, o > 0 && await F.addCounter(e, t, o), de._notifyResistanceUsage(e, t, i, c), o;
  }
  static async sufferDamageArmorAsResistance_Cyberpunk(e, t, i, n, s, r, l) {
    let o = n + s;
    if (F.useArmor(t) && o > 0) {
      const u = r ? s : 0, d = Math.max(0, de._computeArmorResistance(e) - u);
      d > 0 && (await F.addCounter(e, "armor", 1), o -= d);
    }
    const c = F.resistanceDetail(e, t, i);
    return o -= c.value, o > 0 && await F.addCounter(e, t, o), de._notifyResistanceUsage(e, t, i, c), Math.max(o, 0);
  }
  static async sufferDamageArmorAsResistance_Earthdawn(e, t, i, n, s, r, l) {
    let o = n + s;
    if (F.useArmor(t) && !r && o > 0) {
      const u = de._computeArmorResistance(e);
      u > 0 && (await F.addCounter(e, "armor", 1), o -= u);
    }
    o -= de._computeStrengthResistance(e, t);
    const c = F.resistanceDetail(e, t, i);
    return o -= c.value, o > 0 && await F.addCounter(e, t, o), de._notifyResistanceUsage(e, t, i, c), o;
  }
  static async damageToArmor(e, t, i) {
    if (i > 0) {
      const n = F.max(e, A.monitors.armor), s = F.getCounterValue(e, A.monitors.armor), r = Math.min(n - s, i), l = F.resistance(e, A.monitors.armor, t), o = Math.max(0, r - l);
      return o > 0 && await F.addCounter(e, A.monitors.armor, o), r;
    } else
      return 0;
  }
  static _resolveDamageContext(e, t, i) {
    var l;
    const n = (typeof t == "object" ? (t == null ? void 0 : t.damageType) ?? (t == null ? void 0 : t.type) : t) ?? ((l = i == null ? void 0 : i.system) == null ? void 0 : l.damageType), s = typeof t == "object" ? (t == null ? void 0 : t.monitor) ?? n : n;
    return { monitor: e.getDamageMonitor(s), damageType: n };
  }
  static _notifyResistanceUsage(e, t, i, n) {
    var u;
    if (!n || t === void 0)
      return;
    const s = w.actor.monitors[t] ?? t, r = de._localizeDamageType(i) ?? s, l = n.usedType ? "type" : "default", o = ((u = w.actor.monitors.resistanceSources) == null ? void 0 : u[l]) ?? l, c = ve(w.actor.monitors.resistanceApplied, {
      actor: e.name,
      monitor: s,
      damageType: r,
      value: n.value,
      source: o
    });
    ui.notifications.info(c);
  }
  static _localizeDamageType(e) {
    if (e)
      return Oc(e) ? qt(e) : w.mwd.weaponDamageType[e] ?? w.mwd.personalDamageType[e] ?? w.actor.monitors[e] ?? e;
  }
  static _computeArmorResistance(e) {
    const t = F.max(e, "armor"), i = F.getCounterValue(e, "armor"), n = Math.max(0, t - i);
    return Math.max(0, Math.ceil(n / 3));
  }
  static _computeStrengthResistance(e, t) {
    const i = e.getAttributeValue(A.actorAttributes.strength);
    return Math.max(0, Math.floor(i / 4));
  }
}
class ct extends Actor {
  static init() {
    Hooks.on("updateActor", (e, t, i, n) => {
      var s;
      return (s = Ut.firstResponsible(e)) == null ? void 0 : s.onUpdateActor(t, i);
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
      const l = e.getAttributeValue(i.system.attribute) + i.system.value, o = e.getAttributeValue(n.system.attribute) + n.system.value;
      return l > o ? -1 : l < o ? 1 : 0;
    }) : [];
  }
  static sortQualities(e) {
    if (!e)
      return [];
    const t = ["positive", "negative", "narrative"], i = ["major", "minor"];
    return e.sort((n, s) => {
      var m, f, p, h, g, y;
      const r = String(((m = n.system) == null ? void 0 : m.category) ?? (((f = n.system) == null ? void 0 : f.positive) === !1 ? "negative" : "positive")).trim() || "positive", l = String(((p = s.system) == null ? void 0 : p.category) ?? (((h = s.system) == null ? void 0 : h.positive) === !1 ? "negative" : "positive")).trim() || "positive", o = t.indexOf(r) - t.indexOf(l);
      if (o !== 0) return o;
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
      initiative: ce.sumModifiers(this.items, "other", "initiative")
    }, this.system.monitors) {
      const e = ye.getDamageTypes();
      Object.entries(this.system.monitors).forEach((t) => {
        t[1].resistance = ct.normalizeResistance(t[1].resistance), t[1].maxBonus = ce.sumMonitorModifiers(this.items, t[0], "max"), t[1].resistanceBonus = ce.sumMonitorModifiers(this.items, t[0], "resistance"), t[1].resistanceBonusByType = Object.fromEntries(
          e.map((i) => [i.value, ce.sumMonitorModifiers(this.items, t[0], "resistanceByType", i.value)]).filter(([, i]) => i)
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
    return Sa[this.type] ?? [];
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
    return t == 0 ? 0 : hc + se.divup(t, 2);
  }
  getAttributeActions() {
    return Ne.getActorActions(this);
  }
  getUsableAttributes(e = void 0) {
    const t = (e ? [e] : this.items).map((n) => n.getAttributes()).reduce((n, s) => n.concat(s), []), i = se.distinct(this.getAttributes().concat(t));
    return i.sort(se.ascendingBySortedArray(ye.sortedAttributeKeys)), i;
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
      i += ce.sumModifiers(this.items, "attribute", e);
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
        await de.damageToArmor(this, t, i);
    }
  }
  async rollAttribute(e) {
    await Xt.rollAttribute(this, e);
  }
  async rollAttributeAction(e) {
    const t = Ne.getActorAction(this, e);
    await Xt.rollAttributeAction(this, t);
  }
  async rollSkill(e, t) {
    await Xt.rollSkill(this, e, t);
  }
  async rollWeapon(e) {
    var s, r, l;
    Xi.checkWeaponDefense(e, this);
    const t = (s = e.validateTargets(this)) == null ? void 0 : s.map((o) => o.id), i = {
      attackerTokenId: (l = (r = game.scenes.current) == null ? void 0 : r.tokens.find((o) => {
        var c;
        return ((c = o.actor) == null ? void 0 : c.id) == this.id;
      })) == null ? void 0 : l.id,
      targetedTokenIds: t
    }, n = this.items.find((o) => e.isWeaponSkill(o));
    await Xt.rollWeapon(this, n, e, i);
  }
  async rollDefense(e) {
    const t = e.attack.defense, i = Ne.getActorDefense(this, t);
    await Xt.rollDefense(this, i, e);
  }
  async switchMonitorCheck(e, t, i, n = void 0) {
    await F.switchMonitorCheck(this, e, t, i, n);
  }
  async addCounter(e, t, i = void 0) {
    await F.addCounter(this, e, t, i);
  }
  async setCounter(e, t, i = void 0) {
    await F.setCounter(this, e, t, i);
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
    const e = ce.sumModifiers(this.items, "other", "sceneAnarchy");
    e > 0 && await F.setCounter(this, A.monitors.sceneAnarchy, e);
  }
  async onLeaveCombat() {
    await F.setCounter(this, A.monitors.sceneAnarchy, 0);
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
    t != 0 && await F.addCounter(this, e, -t);
  }
  async spendEdge(e, t = A.counters.edgePools.grit) {
    if (e != 0) {
      if (!this.canUseEdge()) {
        const i = w.actorType[this.type] ?? this.type, n = `${this.name} (${i}) cannot use Edge`;
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
    const i = ct._prepareFavorite(e, t);
    return !!this.system.favorites.find((n) => ct._isSameFavorite(i, n));
  }
  static _prepareFavorite(e, t) {
    return { type: e, id: t };
  }
  static _isSameFavorite(e, t) {
    return e.id == t.id && e.type == t.type;
  }
  async switchFavorite(e, t, i) {
    const n = ct._prepareFavorite(t, i), s = this.system.favorites.filter((r) => !ct._isSameFavorite(n, r));
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
    const i = ct._prepareFavorite(e, t);
    if (e == "attributeAction") {
      const s = Ne.prepareShortcut(this, t);
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
    var r, l;
    e == null || e.preventDefault();
    const i = (r = t == null ? void 0 : t.dataset) == null ? void 0 : r.id, n = Number((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.value);
    if (!i || Number.isNaN(n)) return;
    const s = this._mwd.state.manual.find((o) => o.id === i);
    if (s)
      return s.value = n, this.render(!1);
  }
}
const { ApplicationV2: zh, HandlebarsApplicationMixin: Fh } = foundry.applications.api, { renderTemplate: Nl } = foundry.applications.handlebars, Uh = `${Q}/chat/celebrity-roll.hbs`, ma = class ma extends Fh(zh) {
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
        label: w.actor.counters.edgePools.legend,
        value: e.getCelebrityValue()
      },
      modifiers: foundry.utils.mergeObject(
        { label: w.item.tabs.modifiers },
        ce.computeModifiers(e.items, "other", "celebrity")
      ),
      other: {
        label: w.common.roll.modifiers.other,
        value: 0
      },
      ANARCHY: w
    }, i = await Nl(`${Q}/dialog/roll-celebrite-title.hbs`, t), n = {
      id: `roll-celebrity-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...ma.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new ma({ roll: t }, n).render({ force: !0 });
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
      await ma.doRoll(this.roll), await this.close();
    }), i.find('[data-action="cancel"]').on("click", async () => {
      await this.close();
    });
  }
  static async doRoll(e) {
    const t = [
      e.celebrity,
      e.modifiers,
      e.other
    ], i = se.sumValues(t, (l) => l.value), n = {
      actor: e.actor,
      parameters: t,
      pool: i,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      },
      ANARCHY: w
    }, s = new Roll(`${i}d6cs>=5`);
    await s.evaluate();
    const r = await Nl(Uh, n);
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
O(ma, "PARTS", {
  body: {
    template: `${Q}/dialog/roll-celebrite.hbs`
  }
});
let Mr = ma;
const { renderTemplate: Hh } = foundry.applications.handlebars, Wh = `${Q}/chat/actor-say-word.hbs`;
class Rl extends ct {
  static get initiative() {
    return ct.initiative + " + max(@attributes.reflexes.value, @attributes.intelligence.value)";
  }
  hasOwnAnarchy() {
    return this.hasPlayerOwner;
  }
  prepareDerivedData() {
    !this.system.monitors.fatigue && this.system.monitors.stun && (this.system.monitors.fatigue = foundry.utils.duplicate(this.system.monitors.stun)), this.system.monitors.physical.max = this._getMonitorMax(A.actorAttributes.strength), this.system.monitors.fatigue.max = this._getMonitorMax(A.actorAttributes.willpower), super.prepareDerivedData(), this.system.ignoreWounds = ce.sumModifiers(this.items, "other", "ignoreWounds");
  }
  computePhysicalState() {
    var o, c;
    const e = Math.max(0, Number(((o = this.system.monitors.armor) == null ? void 0 : o.max) ?? 0)), t = Math.min(
      e,
      Math.max(0, Number(((c = this.system.monitors.armor) == null ? void 0 : c.value) ?? 0))
    ), i = Math.max(0, e - t), n = Math.max(this.system.monitors.physical.max, this.system.monitors.fatigue.max) + e, s = this.system.monitors.physical.value == this.system.monitors.physical.max, r = this.system.monitors.fatigue.max == this.system.monitors.fatigue.value, l = s || r ? n : Math.max(this.system.monitors.physical.value, this.system.monitors.fatigue.value) + i;
    return {
      max: n,
      value: n - l
    };
  }
  getAttributes() {
    return Sa[this.type] ?? Sa[A.actorTypes.character];
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
      content: await Hh(
        Wh,
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
    se.reindexIds(i), await this.update({ [`system.${e}`]: i });
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
      Xi.checkSufficient(w.actor.counters.anarchy, e, i + t);
      const n = Math.min(t, e), s = e - n;
      n > 0 && F.addCounter(this, A.monitors.sceneAnarchy, -n), this.hasPlayerOwner ? (await game.system.anarchy.gmAnarchy.actorGivesAnarchyToGM(this, e), F.addCounter(this, A.monitors.anarchy, -s)) : s > 0 && super.spendAnarchy(s);
    }
  }
  canUseEdge() {
    return !0;
  }
  getWounds() {
    const e = se.divint(this.system.monitors.fatigue.value, 3) + se.divint(this.system.monitors.physical.value, 3);
    return Math.max(0, e - this.system.ignoreWounds);
  }
  async rollCelebrity() {
    await Mr.create(this);
  }
}
function Il(a) {
  const e = Math.max(0, Number(a) || 0);
  return -Math.floor(e / 3);
}
function Cr(a) {
  const e = Math.max(0, Number(a) || 0);
  return e === 0 ? 0 : Math.ceil(e / 4);
}
function jh(a = {}) {
  const e = a.physical ?? {}, t = a.fatigue ?? {}, i = a.armor ?? {}, n = Number(e.value) || 0, s = Number(t.value) || 0, r = Math.max(Number(i.value) || 0, Number(i.max) || 0);
  return {
    physical: { penalty: Il(n) },
    fatigue: { penalty: Il(s) },
    armor: { resistance: Cr(r) }
  };
}
const js = {
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
function Gh(a, e, t, i) {
  const n = a.system ?? {}, s = `monitors.${e}`, r = Number(foundry.utils.getProperty(n, `${s}.max`)) || 0, l = Number(foundry.utils.getProperty(n, `${s}.value`)) || 0;
  switch (t) {
    case "value":
      return i;
    case "armorPersonalBase":
      return i;
    case "mechArmorBase":
      return Math.max(i, r, l);
    case "vehicleArmorBase":
      return Math.max(i, r, l);
    default:
      return i;
  }
}
function qh() {
  return foundry.data.operators.ForcedDeletion;
}
class Vu extends ct {
  prepareDerivedData() {
    this._prepareMwdAttributes(), this._prepareMwdMonitors(), this._prepareMwdItems(), super.prepareDerivedData();
  }
  static get defaultIcon() {
    return `${ss}/default/Default_Vehicle.svg`;
  }
  static get initiative() {
    return ct.initiative + " + max(@attributes.system.value, @attributes.handling.value)";
  }
  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    };
  }
  getAttributes() {
    return Sa[this.type] ?? Sa[A.actorTypes.vehicle];
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
      "system.handling": qh(),
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
    var l, o, c, u, d, m, f, p, h, g, y, b;
    const e = this.system.mwd = this.system.mwd ?? {}, t = this.system.monitors = this.system.monitors ?? {}, i = this.type === A.actorTypes.battlemech ? 15 : 12, n = Math.max(0, Number(((l = t.armor) == null ? void 0 : l.max) ?? i));
    t.armor = foundry.utils.mergeObject(
      { value: 0, max: n, resistance: ct.normalizeResistance((o = t.armor) == null ? void 0 : o.resistance) },
      t.armor ?? {},
      { inplace: !1, recursive: !0 }
    ), t.armor.resistance = {
      default: Cr(n),
      byType: ((c = t.armor.resistance) == null ? void 0 : c.byType) ?? {}
    };
    const s = Cr(n), r = {
      value: ((u = t.structure) == null ? void 0 : u.value) ?? 0,
      max: ((d = t.structure) == null ? void 0 : d.max) ?? (this.type === A.actorTypes.battlemech ? 18 : 15),
      resistance: ct.normalizeResistance((m = t.structure) == null ? void 0 : m.resistance)
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
        resistance: ct.normalizeResistance((b = t.heat) == null ? void 0 : b.resistance)
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
const Dl = {
  light: 4,
  medium: 5,
  heavy: 6,
  assault: 7
}, Kh = { mode: "normal", allowedWeaponIds: [], typeRestriction: "" }, Vh = {
  baseProfile: { name: "Unarmed", damage: "", notes: "" },
  maxWeapons: 0,
  allowedLocations: []
};
class Yh {
  constructor(e) {
    this.actor = e, this.mwd = e.system.mwd ?? {};
  }
  compute() {
    const e = this.mwd.weightClass ?? "medium", t = Dl[e] ?? Dl.medium, i = this._normalizeHardpoints(), n = this._normalizeWeaponGroups(), s = n.find((y) => y.isPrimary), r = n.filter((y) => y.isPrimary), l = this._primarySlot(), o = [], c = [];
    r.length > 1 && o.push(w.mwd.loadout.errors.multiplePrimary);
    const u = s ? t - 1 : t, d = n.length + (s ? 1 : 0);
    n.length > u && o.push(ve(w.mwd.loadout.errors.mountPointsExceeded, {
      used: d,
      total: t
    }));
    const m = this._getWeapons((y) => (y.system.weaponCategory ?? "ranged") !== "melee"), f = new Map(m.map((y) => [y.id, y])), p = /* @__PURE__ */ new Set(), h = i.map((y) => ({ ...y, occupiedBy: null, occupiedByName: void 0 }));
    for (const y of n)
      for (const b of y.weaponIds ?? []) {
        const S = f.get(b);
        if (!S) {
          c.push(ve(w.mwd.loadout.warnings.weaponMissing, { weapon: b }));
          continue;
        }
        const v = S.system.hardpointType ?? "energy", M = S.system.hardpointSize ?? "small";
        if (p.has(b)) {
          o.push(ve(w.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: S.name }));
          continue;
        }
        if (p.add(b), y.isPrimary && this._validatePrimaryWeapon(S, v, M, l, o), (S.system.weaponCategory ?? "ranged") === "melee")
          continue;
        const N = h.find((P) => !P.occupiedBy && P.type === v && P.size === M);
        N ? (N.occupiedBy = y.id, N.occupiedByName = y.name) : o.push(ve(w.mwd.loadout.errors.hardpointUnavailable, {
          weapon: S.name,
          type: w.mwd.hardpointType[v] ?? v,
          size: w.mwd.hardpointSize[M] ?? M
        }));
      }
    s && (!s.weaponIds || s.weaponIds.length === 0) && o.push(w.mwd.loadout.errors.primaryWithoutWeapon);
    const g = this._computeMeleeState(o);
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
      errors: o,
      warnings: c,
      meleeProfiles: g.profiles,
      meleeLimit: g.limit
    };
  }
  _normalizeWeaponGroups() {
    return (this.mwd.weaponGroups ?? []).map((e, t) => ({
      id: e.id ?? `group-${t + 1}`,
      name: e.name || ve(w.common.newName, { type: w.itemType.singular.weapon }),
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
    const e = foundry.utils.mergeObject(foundry.utils.duplicate(Kh), this.mwd.primarySlot ?? {});
    return e.allowedWeaponIds = this._asArray(e.allowedWeaponIds), e;
  }
  _computeMeleeState(e) {
    var l, o, c;
    const t = foundry.utils.mergeObject(foundry.utils.duplicate(Vh), this.mwd.melee ?? {}), i = this._getWeapons((u) => (u.system.weaponCategory ?? "ranged") === "melee"), n = [], s = Number(t.maxWeapons ?? 0);
    i.length > s && e.push(ve(w.mwd.loadout.errors.meleeLimitExceeded, {
      equipped: i.length,
      limit: s
    }));
    const r = this._asArray(t.allowedLocations);
    return n.push({
      name: ((l = t.baseProfile) == null ? void 0 : l.name) || w.mwd.melee.baseProfile,
      damage: ((o = t.baseProfile) == null ? void 0 : o.damage) ?? "",
      notes: ((c = t.baseProfile) == null ? void 0 : c.notes) ?? ""
    }), i.forEach((u) => {
      var d;
      r.length > 0 && u.system.mountLocation && !r.includes(u.system.mountLocation) && e.push(ve(w.mwd.loadout.errors.meleeLocationRestricted, {
        weapon: u.name,
        location: w.mwd.meleeLocation[u.system.mountLocation] ?? u.system.mountLocation
      })), n.push({
        name: u.name,
        damage: u.getDamageCode(),
        notes: ((d = u.system.references) == null ? void 0 : d.description) ?? ""
      });
    }), { profiles: n, limit: s };
  }
  _validatePrimaryWeapon(e, t, i, n, s) {
    var r;
    n.mode === "converted" ? (((r = n.allowedWeaponIds) == null ? void 0 : r.length) > 0 && !n.allowedWeaponIds.includes(e.id) && s.push(ve(w.mwd.loadout.errors.primaryNotAllowedWeapon, { weapon: e.name })), n.typeRestriction && t !== n.typeRestriction && s.push(ve(w.mwd.loadout.errors.primaryTypeRestriction, {
      weapon: e.name,
      type: w.mwd.hardpointType[n.typeRestriction] ?? n.typeRestriction
    }))) : i !== "large" && s.push(ve(w.mwd.loadout.errors.primaryNeedsLarge, { weapon: e.name }));
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
class Qh extends Vu {
  static get defaultIcon() {
    return `${ss}/vehicles/apc.svg`;
  }
  prepareDerivedData() {
    var e;
    super.prepareDerivedData(), this.system.mwd = this.system.mwd ?? {}, this.system.mwd.chassis = this.system.mwd.chassis ?? "", this.system.mwd.tonnage = this.system.mwd.tonnage ?? 0, this.system.mwd.loadout = new Yh(this).compute(), this.system.mwd.weaponGroupDetails = this._prepareConfiguredWeaponGroups(), this.system.mwd.heat = this._prepareHeatTrack(), this.system.mwd.primaryGroupName = ((e = this.system.mwd.weaponGroupDetails.find((t) => t.isPrimary)) == null ? void 0 : e.name) ?? "", this.system.skills = this._prepareSkillMap(), this.system.weaponGroups = this._prepareWeaponGroups(), this.system.meleeProfiles = this._prepareMeleeProfiles(), this.system.quickActions = {
      primaryWeaponGroup: this.system.weaponGroups.find((t) => t.isPrimary),
      hasSensorSweep: !!(this.system.skills.perception || this.system.skills.technician)
    };
  }
  async rollRangedAttack() {
    const e = this.system.weaponGroups ?? [];
    if (e.length === 0) {
      ui.notifications.warn(w.actor.vehicle.quickActions.errors.noRanged);
      return;
    }
    const t = await this._promptWeaponGroup(e);
    if (!t)
      return;
    const i = t.weaponIds.map((n) => this.items.get(n)).filter((n) => n);
    await this._rollQuickSkill(this.system.skills.gunnery, {
      quickAction: {
        title: w.actor.vehicle.quickActions.rangedAttack,
        weaponGroup: this._serializeWeaponGroup(t, i)
      }
    });
  }
  async rollMeleeAttack() {
    const e = this.system.meleeProfiles ?? [];
    if (e.length === 0) {
      ui.notifications.warn(w.actor.vehicle.quickActions.errors.noMelee);
      return;
    }
    const t = await this._promptMeleeProfile(e);
    t && await this._rollQuickSkill(this.system.skills.melee, {
      quickAction: {
        title: w.actor.vehicle.quickActions.meleeAttack,
        meleeProfile: t
      }
    });
  }
  async rollDodge() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: w.actor.vehicle.quickActions.dodgeCheck }
    });
  }
  async rollPilotingCheck() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: w.actor.vehicle.quickActions.pilotingCheck }
    });
  }
  async rollSensorSweep() {
    const e = [this.system.skills.perception, this.system.skills.technician].filter((i) => i);
    if (e.length === 0) {
      ui.notifications.warn(w.actor.vehicle.quickActions.errors.noSensorSweep);
      return;
    }
    const t = await this._promptSensorSweepSkill(e);
    t && await this._rollQuickSkill(t, {
      quickAction: {
        title: w.actor.vehicle.quickActions.sensorSweep,
        skillName: t.name
      }
    });
  }
  async rollEmergencyRepair() {
    await this._rollQuickSkill(this.system.skills.technician, {
      quickAction: { title: w.actor.vehicle.quickActions.emergencyRepair }
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
    var l, o;
    const e = this.system ?? {}, t = ((l = e.monitors) == null ? void 0 : l.heat) ?? { value: 0, max: 0 }, i = ((o = e.mwd) == null ? void 0 : o.heat) ?? {}, n = {
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
      label: w.actor.battlemech.heat.status[r] ?? r
    }, s;
  }
  _resolveHeatStatus(e, t, i) {
    return e >= ((t == null ? void 0 : t.shutdown) ?? i) ? "shutdown" : e >= ((t == null ? void 0 : t.overheated) ?? i) ? "overheated" : e >= ((t == null ? void 0 : t.runningHot) ?? 0) ? "runningHot" : "safe";
  }
  _prepareConfiguredWeaponGroups() {
    var i;
    const e = ((i = this.system.mwd) == null ? void 0 : i.weaponGroups) ?? [], t = new Map(this.items.map((n) => [n.id, n]));
    return e.map((n, s) => {
      const r = Array.isArray(n.weaponIds) ? n.weaponIds : n.weaponIds ? [n.weaponIds] : [], l = r.map((c) => t.get(c)).filter((c) => (c == null ? void 0 : c.type) === A.itemType.mechWeapon), o = r.filter((c) => !t.has(c));
      return {
        id: n.id ?? `group-${s + 1}`,
        index: s,
        name: n.name || ve(w.common.newName, { type: w.itemType.singular.weapon }),
        weaponIds: r,
        isPrimary: n.isPrimary ?? !1,
        weapons: l,
        missingWeaponIds: o
      };
    });
  }
  _resolveSkill(e) {
    var n;
    const t = this.items.find((s) => s.type === A.itemType.skill && s.system.code === e);
    if (t)
      return t;
    const i = Wt(e);
    if (i)
      return {
        name: i.label ?? ((n = w.skill) == null ? void 0 : n[e]) ?? e,
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
        weaponIds: r.weapons.map((l) => l.id),
        isPrimary: r.isPrimary ?? !1
      }));
    const t = this.items.filter((r) => r.type === A.itemType.mechWeapon);
    if (t.length === 0)
      return [];
    const i = t.filter((r) => this.hasFavorite(A.itemType.mechWeapon, r.id)), n = [];
    return i.length > 0 && n.push({
      id: "favorite",
      name: w.actor.vehicle.quickActions.primaryWeapons,
      weaponIds: i.map((r) => r.id),
      isPrimary: !0
    }), n.push({
      id: "all",
      name: w.actor.vehicle.quickActions.allWeapons,
      weaponIds: t.map((r) => r.id),
      isPrimary: n.length === 0
    }), n;
  }
  _prepareMeleeProfiles() {
    const e = [{
      id: "unarmed",
      name: w.actor.vehicle.quickActions.unarmed,
      weaponId: null,
      damage: 1,
      notes: w.actor.vehicle.quickActions.unarmedNotes
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
    const i = ((s = e == null ? void 0 : e.system) == null ? void 0 : s.attribute) ?? this.getPhysicalAgility(), n = foundry.utils.mergeObject(Xt.prepareActorRoll(this), {
      mode: Je.rollType.skill,
      skill: e,
      attribute1: i,
      specialization: void 0
    });
    t.quickAction && (n.quickAction = t.quickAction), await Xt.create(n);
  }
  async _promptWeaponGroup(e) {
    if (e.length === 1)
      return e[0];
    const t = e.find((s) => s.isPrimary) ?? e[0], i = `<form class="mwd-quick-select">${e.map((s) => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${s.id}" ${s.id === t.id ? "checked" : ""}>
        <span>${s.name}${s.isPrimary ? ` (${w.actor.vehicle.quickActions.primaryLabel})` : ""}</span>
      </label>`).join("")}</form>`, n = await Dialog.prompt({
      title: w.actor.vehicle.quickActions.selectWeaponGroup,
      content: i,
      label: w.common.roll.button,
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
      title: w.actor.vehicle.quickActions.selectMeleeProfile,
      content: i,
      label: w.common.roll.button,
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
      title: w.actor.vehicle.quickActions.selectSensorSkill,
      content: t,
      label: w.common.roll.button,
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
const In = "activeModifiers", Io = [
  { value: "", label: "All Attributes" },
  { value: "reflexes", label: "Reflexes" },
  { value: "strength", label: "Strength" },
  { value: "willpower", label: "Willpower" },
  { value: "charisma", label: "Charisma" },
  { value: "intelligence", label: "Intelligence" },
  { value: "edge", label: "Edge" }
], Do = [
  { value: "", label: "All Intents" },
  { value: "skill", label: "Skill" },
  { value: "attack", label: "Attack" },
  { value: "defense", label: "Defense" },
  { value: "common", label: "Common" },
  { value: "attribute", label: "Attribute" },
  { value: "edge", label: "Edge" },
  { value: "initiative", label: "Initiative" }
];
function Ol(a) {
  const e = String(a ?? "").trim();
  return e === "" ? null : e;
}
function Jh(a) {
  return String((a == null ? void 0 : a.intent) ?? "").trim() || null;
}
function Xh(a) {
  var e, t, i;
  return ((e = a == null ? void 0 : a.data) == null ? void 0 : e.attrKey) ?? // skill rolls
  ((i = (t = a == null ? void 0 : a.attack) == null ? void 0 : t.skill) == null ? void 0 : i.attribute) ?? // attack rolls
  null;
}
function _l(a, e) {
  return a ? e ? a === e : !1 : !0;
}
function Yu(a) {
  return {
    id: String((a == null ? void 0 : a.id) ?? ""),
    label: String((a == null ? void 0 : a.label) ?? "").trim(),
    value: Math.trunc(Number((a == null ? void 0 : a.value) ?? 0)) || 0,
    enabled: (a == null ? void 0 : a.enabled) !== !1,
    attributeFilter: Ol(a == null ? void 0 : a.attributeFilter),
    intentFilter: Ol(a == null ? void 0 : a.intentFilter),
    source: (a == null ? void 0 : a.source) === "preset" ? "preset" : "adhoc"
  };
}
class Zh {
  constructor() {
    O(this, "id", "mwd.sceneModifiers");
  }
  collect({ resolved: e } = {}) {
    var r;
    const t = (r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.getFlag("mwd", In);
    if (!Array.isArray(t) || !t.length) return [];
    const i = Jh(e), n = Xh(e), s = [];
    for (const l of t) {
      const o = Yu(l);
      o.enabled && _l(o.intentFilter, i) && _l(o.attributeFilter, n) && s.push({
        id: o.id || `scene:${o.label}`,
        label: o.label,
        value: o.value,
        source: "Scene"
      });
    }
    return s;
  }
}
const eg = `systems/${T}/templates/settings/collection-editor.hbs`, Qu = /* @__PURE__ */ new Map(), Gs = /* @__PURE__ */ new Map();
function bt(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid settings data.");
  return t.validationErrors = e, t;
}
function Ca(a) {
  ig(a), Qu.set(a.id, a), game.settings.register(T, a.settingKey, {
    scope: "world",
    config: !1,
    type: a.settingType ?? Object,
    default: a.defaultData()
  }), game.settings.registerMenu(T, a.menuKey, {
    name: a.menu.name,
    label: a.menu.label,
    hint: a.menu.hint,
    icon: a.menu.icon,
    type: ag(a.id),
    restricted: a.menu.restricted ?? !0
  });
}
function tg(a) {
  return Qu.get(a) ?? null;
}
function ig(a) {
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
function ag(a) {
  if (Gs.has(a))
    return Gs.get(a);
  class e extends Ju {
  }
  return O(e, "definitionId", a), Gs.set(a, e), e;
}
var J, Xu, Pr, Dn, On, oa, Nr, xa, Zu, ed, Ze;
class Ju extends FormApplication {
  constructor(t = {}, i = {}) {
    super(t, i);
    Ae(this, J);
    const n = E(this, J, On).call(this);
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
      template: eg,
      width: 880,
      height: 760,
      resizable: !0,
      submitOnChange: !1,
      closeOnSubmit: !1
    }, { inplace: !1 });
  }
  get definition() {
    const t = tg(this.constructor.definitionId);
    if (!t)
      throw new Error(`Missing settings collection definition: ${this.constructor.definitionId}`);
    return t;
  }
  get title() {
    var t;
    return this.definition.title ?? ((t = this.definition.menu) == null ? void 0 : t.name) ?? "Settings Editor";
  }
  getData(t = {}) {
    const i = E(this, J, ed).call(this), n = this.editorState.rows.map((s, r, l) => ({
      index: r,
      fields: i.map((o) => E(this, J, Zu).call(this, o, s, r)),
      canMoveUp: r > 0,
      canMoveDown: r < l.length - 1
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
        var o;
        const r = s.currentTarget, l = String(((o = r == null ? void 0 : r.dataset) == null ? void 0 : o.action) ?? "").trim();
        l && E(this, J, Xu).call(this, l, s, r);
      });
    });
  }
  async _onSubmit(t, { updateData: i = null, preventClose: n = !0, preventRender: s = !0 } = {}) {
    return super._onSubmit(t, { updateData: i, preventClose: n, preventRender: s });
  }
  async _updateObject(t, i) {
    var n;
    E(this, J, Ze).call(this, []);
    try {
      const s = this.editorState.tab === "bulk" ? this.definition.parseBulk(E(this, J, xa).call(this)) : this.definition.rowsToValue(E(this, J, Nr).call(this));
      await game.settings.set(T, this.definition.settingKey, s);
      const r = E(this, J, On).call(this);
      E(this, J, Dn).call(this, r), await this.close();
    } catch (s) {
      E(this, J, Ze).call(this, bn(s)), this.editorState.errors.length && ((n = ui.notifications) == null || n.error(this.editorState.errors[0])), this.render(!1);
    }
  }
}
J = new WeakSet(), Xu = async function(t, i, n) {
  var s, r, l, o, c, u, d, m;
  switch (i.preventDefault(), i.stopPropagation(), t) {
    case "switchRows":
      E(this, J, xa).call(this), this.editorState.tab = "rows", E(this, J, Ze).call(this, []), this.render(!1);
      return;
    case "switchBulk":
      E(this, J, oa).call(this);
      try {
        const f = this.definition.rowsToValue(this.editorState.rows);
        this.editorState.bulkText = this.definition.serializeBulk(f), this.editorState.tab = "bulk", E(this, J, Ze).call(this, []);
      } catch (f) {
        E(this, J, Ze).call(this, bn(f)), this.editorState.errors.length && ((s = ui.notifications) == null || s.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "addRow":
      E(this, J, oa).call(this), this.editorState.rows.push(((l = (r = this.definition).createEmptyRow) == null ? void 0 : l.call(r)) ?? {}), E(this, J, Ze).call(this, []), this.render(!1);
      return;
    case "removeRow":
      E(this, J, oa).call(this), this.editorState.rows.splice(Number(((o = n == null ? void 0 : n.dataset) == null ? void 0 : o.index) ?? -1), 1), E(this, J, Ze).call(this, []), this.render(!1);
      return;
    case "moveRowUp":
      E(this, J, oa).call(this), E(this, J, Pr).call(this, Number(((c = n == null ? void 0 : n.dataset) == null ? void 0 : c.index) ?? -1), -1), E(this, J, Ze).call(this, []), this.render(!1);
      return;
    case "moveRowDown":
      E(this, J, oa).call(this), E(this, J, Pr).call(this, Number(((u = n == null ? void 0 : n.dataset) == null ? void 0 : u.index) ?? -1), 1), E(this, J, Ze).call(this, []), this.render(!1);
      return;
    case "loadBulk":
      try {
        const f = this.definition.parseBulk(E(this, J, xa).call(this));
        this.editorState.rows = this.definition.toRows(f), this.editorState.bulkText = this.definition.serializeBulk(f), this.editorState.tab = "rows", E(this, J, Ze).call(this, []);
      } catch (f) {
        E(this, J, Ze).call(this, bn(f)), this.editorState.errors.length && ((d = ui.notifications) == null || d.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "formatBulk":
      try {
        const f = this.definition.parseBulk(E(this, J, xa).call(this));
        this.editorState.bulkText = this.definition.serializeBulk(f), E(this, J, Ze).call(this, []);
      } catch (f) {
        E(this, J, Ze).call(this, bn(f)), this.editorState.errors.length && ((m = ui.notifications) == null || m.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "resetSetting":
      E(this, J, Dn).call(this, E(this, J, On).call(this)), this.render(!1);
      return;
    case "restoreDefaults":
      E(this, J, Dn).call(this, this.definition.defaultData()), this.render(!1);
      return;
    case "cancel":
      await this.close();
      return;
    default:
      return;
  }
}, Pr = function(t, i) {
  if (!Number.isInteger(t)) return;
  const n = t + i;
  if (t < 0 || n < 0 || n >= this.editorState.rows.length) return;
  const s = [...this.editorState.rows], [r] = s.splice(t, 1);
  s.splice(n, 0, r), this.editorState.rows = s;
}, Dn = function(t) {
  this.editorState.rows = this.definition.toRows(t), this.editorState.bulkText = this.definition.serializeBulk(t), this.editorState.tab = "rows", E(this, J, Ze).call(this, []);
}, On = function() {
  const t = game.settings.get(T, this.definition.settingKey);
  return foundry.utils.deepClone(t ?? this.definition.defaultData());
}, oa = function() {
  this.editorState.rows = E(this, J, Nr).call(this);
}, Nr = function() {
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
}, xa = function() {
  var n;
  const t = this.form, i = (n = t == null ? void 0 : t.querySelector) == null ? void 0 : n.call(t, 'textarea[name="bulkText"]');
  return i instanceof HTMLTextAreaElement && (this.editorState.bulkText = i.value), this.editorState.bulkText ?? "";
}, Zu = function(t, i, n) {
  const s = t.type ?? "text", r = String((i == null ? void 0 : i[t.key]) ?? t.default ?? ""), l = s === "select" ? ng(t).map((o) => ({
    value: String(o.value ?? ""),
    label: String(o.label ?? o.value ?? ""),
    selected: String(o.value ?? "") === r
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
    options: l
  };
}, ed = function() {
  return this.definition.rowSchema.map((t) => ({
    ...t,
    type: t.type ?? "text"
  }));
}, Ze = function(t = []) {
  this.editorState.errors = Array.isArray(t) ? t.filter(Boolean) : [];
}, O(Ju, "definitionId", "");
function ng(a) {
  const e = typeof a.options == "function" ? a.options() : a.options;
  return Array.isArray(e) ? e : [];
}
function bn(a) {
  const e = Array.isArray(a == null ? void 0 : a.validationErrors) ? a.validationErrors.filter(Boolean) : [String((a == null ? void 0 : a.message) ?? "Unable to save settings.").trim()].filter(Boolean);
  return e.length ? e : ["Unable to save settings."];
}
const Rr = "sceneModifierTemplates", sg = "sceneModifierTemplateEditor", rg = Object.freeze([]);
function Oi(a) {
  const e = String(a ?? "").trim();
  return e === "" ? "" : e;
}
function td(a = []) {
  const e = [], t = [], i = /* @__PURE__ */ new Set();
  if ((Array.isArray(a) ? a : []).forEach((n, s) => {
    const r = String((n == null ? void 0 : n.label) ?? "").trim(), l = String((n == null ? void 0 : n.value) ?? "").trim(), o = `Row ${s + 1}`;
    if (!r) {
      t.push(`${o}: label cannot be blank.`);
      return;
    }
    if (i.has(r.toLowerCase())) {
      t.push(`${o}: duplicate label "${r}".`);
      return;
    }
    i.add(r.toLowerCase());
    const c = Number(l);
    if (!Number.isFinite(c)) {
      t.push(`${o}: value must be a number.`);
      return;
    }
    e.push({
      label: r,
      value: Math.trunc(c),
      attributeFilter: Oi(n == null ? void 0 : n.attributeFilter),
      intentFilter: Oi(n == null ? void 0 : n.intentFilter)
    });
  }), t.length) throw bt(t);
  return e;
}
function og(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => ({
    label: String((e == null ? void 0 : e.label) ?? ""),
    value: String((e == null ? void 0 : e.value) ?? "0"),
    attributeFilter: Oi(e == null ? void 0 : e.attributeFilter),
    intentFilter: Oi(e == null ? void 0 : e.intentFilter)
  }));
}
function lg(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw bt([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  if (!Array.isArray(t))
    throw bt(["Bulk JSON must be an array."]);
  return td(t.map((i) => ({
    label: String((i == null ? void 0 : i.label) ?? ""),
    value: String((i == null ? void 0 : i.value) ?? "0"),
    attributeFilter: Oi(i == null ? void 0 : i.attributeFilter),
    intentFilter: Oi(i == null ? void 0 : i.intentFilter)
  })));
}
function cg(a = []) {
  return JSON.stringify(
    (Array.isArray(a) ? a : []).map((e) => ({
      label: String((e == null ? void 0 : e.label) ?? ""),
      value: Number((e == null ? void 0 : e.value) ?? 0),
      attributeFilter: Oi(e == null ? void 0 : e.attributeFilter),
      intentFilter: Oi(e == null ? void 0 : e.intentFilter)
    })),
    null,
    2
  );
}
const ug = {
  id: "scene-modifier-templates",
  menuKey: sg,
  settingKey: Rr,
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
      options: Io
    },
    {
      key: "intentFilter",
      label: "Intent Filter",
      type: "select",
      options: Do
    }
  ],
  menu: {
    name: "Scene Modifier Templates",
    label: "Configure",
    hint: "Edit the preset scene modifier templates available in the GM Gadget.",
    icon: "fas fa-cloud",
    restricted: !0
  },
  defaultData: () => foundry.utils.deepClone(rg),
  createEmptyRow: () => ({
    label: "",
    value: "0",
    attributeFilter: "",
    intentFilter: ""
  }),
  toRows: og,
  rowsToValue: td,
  parseBulk: lg,
  serializeBulk: cg
};
function dg() {
  Ca(ug);
}
const { ApplicationV2: mg, HandlebarsApplicationMixin: fg } = foundry.applications.api, pg = "mwd-gmgadget", id = "gmDnPresets", _n = "gmNextDn", $a = "gmDnAnnounceToChat", hg = Object.freeze([
  { label: "Standard", dn: 1 },
  { label: "Challenging", dn: 2 },
  { label: "Hard", dn: 3 },
  { label: "Extreme", dn: 4 }
]), gg = "systems/mwd/templates/v2/mwd-gmgadget.hbs", Ba = Object.freeze({
  actorId: "",
  mode: "physical",
  delta: 1,
  useArmor: !1,
  damageType: "concussive",
  statusId: "",
  statusActive: !0,
  source: "",
  notes: ""
}), yg = Object.freeze({
  label: "Hazard Zone",
  startExposure: ie.minor,
  escalationRate: 1,
  escalationIntervalTurns: 1,
  escalationMax: ie.full,
  onFullBurnDelta: 0,
  clearOnExit: !0,
  damage: 6,
  ap: 0,
  damageType: "thermal",
  color: "#d86a2c"
});
function bg(a = "") {
  return String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean).map((e) => {
    const [t, i] = e.split(":").map((r) => (r ?? "").trim()), n = t || "DN", s = Number.isFinite(Number(i)) ? Number(i) : Number(t);
    return {
      label: n,
      dn: Number.isFinite(s) ? Math.max(0, Math.trunc(s)) : null
    };
  }).filter((e) => Number.isFinite(e.dn));
}
function Sg(a = []) {
  const e = new Error(a[0] ?? "Invalid GM DN presets.");
  return e.validationErrors = Array.isArray(a) ? a.filter(Boolean) : [], e;
}
function Ag() {
  return foundry.utils.deepClone(hg);
}
function ln(a, { strict: e = !1 } = {}) {
  const t = typeof a == "string" ? bg(a) : Array.isArray(a) ? a : [], i = [], n = [], s = /* @__PURE__ */ new Set();
  if (t.forEach((r, l) => {
    const o = String((r == null ? void 0 : r.label) ?? "").trim(), c = r == null ? void 0 : r.dn, u = `Preset ${l + 1}`;
    if (!o) {
      e && n.push(`${u}: label cannot be blank.`);
      return;
    }
    const d = o.toLowerCase();
    if (s.has(d)) {
      e && n.push(`${u}: duplicate label "${o}".`);
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
      label: o,
      dn: Math.trunc(m)
    });
  }), e && n.length) throw Sg(n);
  return i;
}
function qs(a = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(Ba),
    a ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function Ks(a = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(yg),
    a ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function ad(a = null) {
  const e = (a == null ? void 0 : a.document) ?? a ?? null, t = Array.from((e == null ? void 0 : e.shapes) ?? []);
  if (t.length !== 1) return t.length > 1 ? "multiple" : "";
  const i = t[0], n = typeof (i == null ? void 0 : i.toObject) == "function" ? i.toObject() : i && typeof i == "object" ? i : null;
  return String((n == null ? void 0 : n.type) ?? "").trim().toLowerCase();
}
function Ll(a = null) {
  return !!ad(a);
}
function xl() {
  var i, n;
  const a = Array.from(((i = canvas == null ? void 0 : canvas.regions) == null ? void 0 : i.controlled) ?? []).map((s) => (s == null ? void 0 : s.document) ?? s ?? null).find(Ll);
  if (a) return a;
  const e = ((n = canvas == null ? void 0 : canvas.regions) == null ? void 0 : n.hover) ?? null, t = (e == null ? void 0 : e.document) ?? e ?? null;
  return Ll(t) ? t : null;
}
function Tg(a = null) {
  var l, o;
  const e = (a == null ? void 0 : a.document) ?? a ?? null;
  if (!e)
    return {
      label: "No region selected",
      reason: "Select a Region created in Measured Template Mode on the current scene to turn it into a hazard.",
      supported: !1
    };
  const t = ad(e), i = Ec(e);
  if (!i)
    return {
      label: "Unsupported region",
      reason: t === "multiple" ? "The selected Region has multiple shapes and cannot be converted into a hazard template." : `The selected Region shape "${t || "unknown"}" is not supported for hazard conversion yet.`,
      supported: !1
    };
  const n = String(i.shape ?? "").trim().toLowerCase(), s = (o = (l = canvas == null ? void 0 : canvas.scene) == null ? void 0 : l.grid) != null && o.units ? ` ${canvas.scene.grid.units}` : "";
  return {
    label: n === "rect" ? `RECT ${Number(i.width ?? 0) || 0} x ${Number(i.height ?? 0) || 0}${s}`.trim() : `${n.toUpperCase()} ${Number(i.distance ?? 0) || 0}${s}`.trim(),
    reason: "",
    supported: !0
  };
}
function wg(a) {
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
function vg(a) {
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
function kg(a) {
  return yt.getStatusOptions(a);
}
function Eg(a = "mwd") {
  game.settings.register(a, _n, {
    scope: "client",
    config: !1,
    type: Number,
    default: 1
  }), game.settings.register(a, $a, {
    scope: "client",
    config: !0,
    name: "Announce GM DN changes to chat",
    hint: "If enabled, posts a small chat notice when you change the current DN preset.",
    type: Boolean,
    default: !1
  });
}
const He = class He extends fg(mg) {
  constructor({ systemId: e = "mwd", ...t } = {}) {
    super(t), this.systemId = e, this.activeTab = "difficulty", this.harmState = qs(), this.hazardState = Ks();
  }
  async render(e = {}) {
    var t;
    return (t = game.user) != null && t.isGM ? super.render(e) : this;
  }
  async _prepareContext(e) {
    var y, b, S, v;
    const t = await super._prepareContext(e), i = ln(
      game.settings.get(this.systemId, id),
      { strict: !1 }
    ), n = Number(game.settings.get(this.systemId, _n) ?? 1), s = !!game.settings.get(this.systemId, $a), r = qs(this.harmState), l = yt.getActorOptions({ mode: r.mode }), o = yt.getSceneTarget({ mode: r.mode }), c = this.harmState.actorId ? ((b = (y = game.actors) == null ? void 0 : y.get) == null ? void 0 : b.call(y, this.harmState.actorId)) ?? null : null, u = yt.resolveTarget({
      actor: c,
      actorId: this.harmState.actorId,
      preferSceneTarget: !0,
      mode: r.mode
    }), d = kg(u.actor ?? c ?? null);
    d.length && !d.some((M) => M.value === r.statusId) && (r.statusId = d[0].value, this.harmState.statusId = r.statusId);
    const m = $l(
      game.settings.get(this.systemId, Rr)
    ), f = Bl(
      (S = canvas == null ? void 0 : canvas.scene) == null ? void 0 : S.getFlag("mwd", In)
    ), p = xl(), h = Tg(p), g = Ks(this.hazardState);
    return foundry.utils.mergeObject(t, {
      presets: i,
      currentDn: n,
      currentTab: this.activeTab,
      announce: s,
      isGM: ((v = game.user) == null ? void 0 : v.isGM) ?? !1,
      scene: {
        hasScene: !!(canvas != null && canvas.scene),
        templates: m,
        activeModifiers: f,
        attributeFilterOptions: Io,
        intentFilterOptions: Do
      },
      harm: {
        state: r,
        actorOptions: l,
        modes: yt.MODE_OPTIONS,
        damageTypes: Pl,
        statusOptions: d,
        sceneTarget: wg(o),
        effectiveTarget: vg(u),
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
          { value: ie.minor, label: "Minor" },
          { value: ie.major, label: "Major" },
          { value: ie.full, label: "Full" }
        ],
        damageTypes: Pl,
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
    const i = (r, l = "") => {
      const o = t.querySelector(r);
      return o instanceof HTMLInputElement || o instanceof HTMLSelectElement || o instanceof HTMLTextAreaElement ? o.value : l;
    }, n = (r, l = !1) => {
      const o = t.querySelector(r);
      return o instanceof HTMLInputElement ? o.checked : l;
    };
    return this.harmState = qs({
      actorId: i('[name="harm-actorId"]', this.harmState.actorId),
      mode: i('[name="harm-mode"]', this.harmState.mode),
      delta: Number(i('[name="harm-delta"]', this.harmState.delta)),
      useArmor: n('[name="harm-useArmor"]', this.harmState.useArmor),
      damageType: i('[name="harm-damageType"]', this.harmState.damageType),
      statusId: i('[name="harm-statusId"]', this.harmState.statusId),
      statusActive: i('[name="harm-statusActive"]', this.harmState.statusActive ? "add" : "remove") !== "remove",
      source: i('[name="harm-source"]', this.harmState.source),
      notes: i('[name="harm-notes"]', this.harmState.notes)
    }), Number.isFinite(Number(this.harmState.delta)) || (this.harmState.delta = Ba.delta), this.harmState;
  }
  async _onSetDn(e, t) {
    var s, r, l;
    if (e.preventDefault(), e.stopPropagation(), !((s = game.user) != null && s.isGM)) return;
    const i = Math.max(0, Math.trunc(Number(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.dn) ?? NaN)));
    if (!Number.isFinite(i)) return;
    if (await game.settings.set(this.systemId, _n, i), !!game.settings.get(this.systemId, $a)) {
      const o = String(((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.label) ?? `DN ${i}`);
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ user: game.user }),
        content: `<div class="mwd-gm-notice"><b>GM Difficulty:</b> ${foundry.utils.escapeHTML(o)} (DN ${i} hits)</div>`
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
      return await game.settings.set(this.systemId, _n, 1), this.render({ parts: ["body"] });
  }
  async _onToggleAnnounce(e, t) {
    var n;
    if (e.preventDefault(), e.stopPropagation(), !((n = game.user) != null && n.isGM)) return;
    const i = !game.settings.get(this.systemId, $a);
    return await game.settings.set(this.systemId, $a, i), this.render({ parts: ["body"] });
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
    var r, l, o, c, u;
    if ((r = e == null ? void 0 : e.preventDefault) == null || r.call(e), (l = e == null ? void 0 : e.stopPropagation) == null || l.call(e), !((o = game.user) != null && o.isGM)) return;
    const i = this._captureHarmStateFromDom(t), n = this._buildHarmPayload(i);
    if (!n) {
      (c = ui.notifications) == null || c.warn("Choose a valid harm action before applying it.");
      return;
    }
    const s = await yt.apply({
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
    const i = (r, l = "") => {
      const o = t.querySelector(r);
      return o instanceof HTMLInputElement || o instanceof HTMLSelectElement || o instanceof HTMLTextAreaElement ? o.value : l;
    }, n = (r, l = !1) => {
      const o = t.querySelector(r);
      return o instanceof HTMLInputElement ? o.checked : l;
    };
    return this.hazardState = Ks({
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
    const i = this._captureHazardStateFromDom(t), n = xl(), s = Ec(n);
    if (!(canvas != null && canvas.scene) || !s) {
      (m = ui.notifications) == null || m.warn("Select a supported Region in Measured Template Mode before creating a hazard.");
      return;
    }
    const r = so({
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
    }), l = ls(s);
    if (!l.length) {
      (f = ui.notifications) == null || f.warn("Unable to convert the selected region into a hazard shape.");
      return;
    }
    const [o] = await canvas.scene.createEmbeddedDocuments("Region", [{
      name: String(i.label ?? "Hazard Zone").trim() || "Hazard Zone",
      color: String(i.color ?? "#d86a2c").trim() || "#d86a2c",
      shapes: l,
      flags: {
        mwd: {
          [ji]: {
            sourceActorUuid: null,
            sourceItemUuid: null,
            payloadId: "gm-hazard",
            templateGeometry: ei(s),
            damage: Math.max(0, Number(i.damage ?? 0) || 0),
            ap: Math.max(0, Number(i.ap ?? 0) || 0),
            damageType: String(i.damageType ?? "thermal").trim() || "thermal",
            label: `${String(i.label ?? "Hazard Zone").trim() || "Hazard Zone"} (${Ct(r.startExposure)})`,
            areaEffect: {
              kind: "persistent",
              hazard: r
            },
            hazardDef: r
          }
        }
      }
    }]);
    return (h = (p = o == null ? void 0 : o.sheet) == null ? void 0 : p.render) == null || h.call(p, !0), (g = ui.notifications) == null || g.info("Hazard region created from the selected region."), this.render({ parts: ["body"] });
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
      delta: zl(e == null ? void 0 : e.delta, Ba.delta),
      source: t,
      notes: i
    } : n === "physical" || n === "fatigue" ? {
      mode: "trackDelta",
      track: n,
      delta: zl(e == null ? void 0 : e.delta, Ba.delta),
      useArmor: !!(e != null && e.useArmor),
      damageType: (e == null ? void 0 : e.damageType) ?? Ba.damageType,
      source: t,
      notes: i
    } : null;
  }
  // ---- Scene modifier actions ----
  async _onAddSceneModifierFromPreset(e, t) {
    var o, c, u, d;
    if ((o = e == null ? void 0 : e.preventDefault) == null || o.call(e), (c = e == null ? void 0 : e.stopPropagation) == null || c.call(e), !((u = game.user) != null && u.isGM)) return;
    const i = ((d = t == null ? void 0 : t.closest) == null ? void 0 : d.call(t, ".mwd-gmgadget__root")) ?? this._getRootElement(), n = i instanceof HTMLElement ? i.querySelector('select[name="scene-preset-index"]') : null, s = n instanceof HTMLSelectElement ? Number(n.value) : NaN, r = $l(
      game.settings.get(this.systemId, Rr)
    ), l = Number.isFinite(s) ? r[s] : null;
    l && await this._mutateSceneModifiers((m) => [
      ...m,
      {
        id: foundry.utils.randomID(),
        label: l.label,
        value: l.value,
        enabled: !0,
        attributeFilter: l.attributeFilter || null,
        intentFilter: l.intentFilter || null,
        source: "preset"
      }
    ]);
  }
  async _onAddSceneModifierAdhoc(e, t) {
    var n, s, r, l;
    if ((n = e == null ? void 0 : e.preventDefault) == null || n.call(e), (s = e == null ? void 0 : e.stopPropagation) == null || s.call(e), !((r = game.user) != null && r.isGM)) return;
    const i = this._captureAdhocFormFromDom(t);
    if (!i) {
      (l = ui.notifications) == null || l.warn("Label and a numeric value are required.");
      return;
    }
    await this._mutateSceneModifiers((o) => [...o, i]);
  }
  async _onToggleSceneModifier(e, t) {
    var n, s, r, l;
    if ((n = e == null ? void 0 : e.preventDefault) == null || n.call(e), (s = e == null ? void 0 : e.stopPropagation) == null || s.call(e), !((r = game.user) != null && r.isGM)) return;
    const i = String(((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.modId) ?? "").trim();
    i && await this._mutateSceneModifiers(
      (o) => o.map((c) => c.id === i ? { ...c, enabled: !c.enabled } : c)
    );
  }
  async _onRemoveSceneModifier(e, t) {
    var n, s, r, l;
    if ((n = e == null ? void 0 : e.preventDefault) == null || n.call(e), (s = e == null ? void 0 : e.stopPropagation) == null || s.call(e), !((r = game.user) != null && r.isGM)) return;
    const i = String(((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.modId) ?? "").trim();
    i && await this._mutateSceneModifiers((o) => o.filter((c) => c.id !== i));
  }
  async _onClearSceneModifiers(e, t) {
    var i, n, s;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), (s = game.user) != null && s.isGM && await this._mutateSceneModifiers(() => []);
  }
  async _mutateSceneModifiers(e) {
    const t = canvas == null ? void 0 : canvas.scene;
    if (!t) return;
    const i = Bl(t.getFlag("mwd", In)), n = await e(i);
    return await t.setFlag("mwd", In, n), this.render({ parts: ["body"] });
  }
  _captureAdhocFormFromDom(e) {
    var c;
    const t = ((c = e == null ? void 0 : e.closest) == null ? void 0 : c.call(e, ".mwd-gmgadget__root")) ?? this._getRootElement();
    if (!(t instanceof HTMLElement)) return null;
    const i = (u) => {
      const d = t.querySelector(u);
      return d instanceof HTMLInputElement || d instanceof HTMLSelectElement ? d.value : "";
    }, n = i('[name="scene-adhoc-label"]').trim(), s = i('[name="scene-adhoc-value"]').trim(), r = i('[name="scene-adhoc-attributeFilter"]').trim() || null, l = i('[name="scene-adhoc-intentFilter"]').trim() || null;
    if (!n) return null;
    const o = Number(s);
    return Number.isFinite(o) ? {
      id: foundry.utils.randomID(),
      label: n,
      value: Math.trunc(o),
      enabled: !0,
      attributeFilter: r,
      intentFilter: l,
      source: "adhoc"
    } : null;
  }
};
O(He, "DEFAULT_OPTIONS", {
  id: pg,
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
    switchTab: He.prototype._onSwitchTab,
    setDn: He.prototype._onSetDn,
    clearDn: He.prototype._onClearDn,
    toggleAnnounce: He.prototype._onToggleAnnounce,
    harmInputChange: He.prototype._onHarmInputChange,
    refreshHarmTarget: He.prototype._onRefreshHarmTarget,
    applyHarm: He.prototype._onApplyHarm,
    hazardInputChange: He.prototype._onHazardInputChange,
    refreshHazardTemplate: He.prototype._onRefreshHazardTemplate,
    createHazard: He.prototype._onCreateHazard,
    addSceneModifierFromPreset: He.prototype._onAddSceneModifierFromPreset,
    addSceneModifierAdhoc: He.prototype._onAddSceneModifierAdhoc,
    toggleSceneModifier: He.prototype._onToggleSceneModifier,
    removeSceneModifier: He.prototype._onRemoveSceneModifier,
    clearSceneModifiers: He.prototype._onClearSceneModifiers
  }
}), O(He, "PARTS", {
  body: { template: gg }
});
let Ir = He;
function $l(a) {
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
function Bl(a) {
  return Array.isArray(a) ? a.map((e) => {
    var s, r;
    const t = Yu(e), i = ((s = Io.find((l) => l.value === (t.attributeFilter ?? ""))) == null ? void 0 : s.label) ?? null, n = ((r = Do.find((l) => l.value === (t.intentFilter ?? ""))) == null ? void 0 : r.label) ?? null;
    return {
      ...t,
      attributeFilterLabel: t.attributeFilter ? i : null,
      intentFilterLabel: t.intentFilter ? n : null,
      signedValue: t.value >= 0 ? `+${t.value}` : String(t.value),
      isPositive: t.value > 0
    };
  }) : [];
}
function zl(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
let Vs = null;
function Mg({ systemId: a = "mwd" } = {}) {
  return Vs || (Vs = new Ir({ systemId: a })), Vs;
}
const Cg = "gmDnPresetEditor";
function Pg(a = []) {
  const e = [], t = [], i = /* @__PURE__ */ new Set();
  if ((Array.isArray(a) ? a : []).forEach((n, s) => {
    const r = String((n == null ? void 0 : n.label) ?? "").trim(), l = String((n == null ? void 0 : n.dn) ?? "").trim(), o = `Row ${s + 1}`;
    if (!r) {
      t.push(`${o}: label cannot be blank.`);
      return;
    }
    if (i.has(r.toLowerCase())) {
      t.push(`${o}: duplicate label "${r}".`);
      return;
    }
    i.add(r.toLowerCase());
    const c = Number(l);
    if (!Number.isFinite(c)) {
      t.push(`${o}: DN must be a number.`);
      return;
    }
    if (c < 0) {
      t.push(`${o}: DN cannot be negative.`);
      return;
    }
    e.push({
      label: r,
      dn: Math.trunc(c)
    });
  }), t.length) throw bt(t);
  return ln(e, { strict: !0 });
}
function Ng(a = []) {
  return ln(a, { strict: !1 }).map((e) => ({
    label: e.label,
    dn: String(e.dn)
  }));
}
function Rg(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw bt([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return ln(t, { strict: !0 });
}
function Ig(a = []) {
  return JSON.stringify(
    ln(a, { strict: !1 }),
    null,
    2
  );
}
const Dg = {
  id: "gm-dn-presets",
  menuKey: Cg,
  settingKey: id,
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
  defaultData: Ag,
  createEmptyRow: () => ({
    label: "",
    dn: "1"
  }),
  toRows: Ng,
  rowsToValue: Pg,
  parseBulk: Rg,
  serializeBulk: Ig
};
function Og() {
  Ca(Dg);
}
const _g = "lifeModuleCatalogEditor";
function Lg(a = []) {
  return ea((Array.isArray(a) ? a : []).map((e) => ({
    id: String((e == null ? void 0 : e.id) ?? ""),
    moduleType: String((e == null ? void 0 : e.moduleType) ?? ""),
    label: String((e == null ? void 0 : e.label) ?? ""),
    grants: String((e == null ? void 0 : e.grants) ?? ""),
    requiresAny: String((e == null ? void 0 : e.requiresAny) ?? ""),
    excludesAny: String((e == null ? void 0 : e.excludesAny) ?? "")
  })), { strict: !0 });
}
function xg(a = []) {
  return ea(a, { strict: !1 }).map((e) => ({
    id: e.id,
    moduleType: e.moduleType,
    label: e.label,
    grants: Zp(e.grants),
    requiresAny: e.requiresAny.join(", "),
    excludesAny: e.excludesAny.join(", ")
  }));
}
function $g(a = "") {
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
  return ea(t, { strict: !0 });
}
function Bg(a = []) {
  return JSON.stringify(
    ea(a, { strict: !1 }),
    null,
    2
  );
}
const zg = {
  id: "life-module-catalog",
  menuKey: _g,
  settingKey: ha,
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
      options: Lu
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
  defaultData: Po,
  createEmptyRow: () => ({
    id: "",
    moduleType: "childhood",
    label: "",
    grants: "",
    requiresAny: "",
    excludesAny: ""
  }),
  toRows: xg,
  rowsToValue: Lg,
  parseBulk: $g,
  serializeBulk: Bg
};
function Fg() {
  Ca(zg);
}
const Ug = "personalActionCatalogEditor", Fl = Object.freeze([
  { value: "false", label: "No" },
  { value: "true", label: "Yes" }
]);
function Hg(a = []) {
  try {
    return rn((Array.isArray(a) ? a : []).map((e) => ({
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
    throw bt(
      Array.isArray(e.validationErrors) ? e.validationErrors : [e.message]
    );
  }
}
function Wg(a = []) {
  return rn(a, { strict: !1 }).map((e) => {
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
function jg(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw bt([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  try {
    return rn(t, { strict: !0 });
  } catch (i) {
    throw bt(
      Array.isArray(i.validationErrors) ? i.validationErrors : [i.message]
    );
  }
}
function Gg(a = []) {
  return JSON.stringify(
    rn(a, { strict: !1 }),
    null,
    2
  );
}
const qg = {
  id: "personal-action-catalog",
  menuKey: Ug,
  settingKey: Eu,
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
      options: () => Sr
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
      options: () => Mu
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
      options: () => Fl
    },
    {
      key: "prominentWhenBurning",
      label: "Burn Highlight",
      type: "select",
      options: () => Fl
    }
  ],
  menu: {
    name: "Personal Action Catalog",
    label: "Configure",
    hint: "Edit the personal combat action menus and first-pass action handlers.",
    icon: "fas fa-list-check",
    restricted: !0
  },
  defaultData: vo,
  createEmptyRow: () => {
    var a;
    return {
      id: "",
      label: "",
      category: ((a = Sr[0]) == null ? void 0 : a.value) ?? "standard",
      cost: "1",
      handler: "combatAction",
      reason: "",
      rollIntent: "",
      prominent: "false",
      prominentWhenBurning: "false"
    };
  },
  toRows: Wg,
  rowsToValue: Hg,
  parseBulk: jg,
  serializeBulk: Gg
};
function Kg() {
  Ca(qg);
}
const Vg = "skillSpecializationEditor";
function Dr() {
  return Gn().map((a) => ({
    value: a.code,
    label: a.label
  }));
}
function Yg(a = []) {
  const e = new Set(Dr().map((n) => n.value)), t = {}, i = [];
  if ((Array.isArray(a) ? a : []).forEach((n, s) => {
    const r = String((n == null ? void 0 : n.skillCode) ?? "").trim(), l = String((n == null ? void 0 : n.label) ?? "").trim(), o = `Row ${s + 1}`;
    if (!r) {
      i.push(`${o}: choose a skill.`);
      return;
    }
    if (!e.has(r)) {
      i.push(`${o}: unknown skill code "${r}".`);
      return;
    }
    if (!l) {
      i.push(`${o}: specialization label cannot be blank.`);
      return;
    }
    (t[r] ?? (t[r] = [])).push(l);
  }), i.length) throw bt(i);
  return ms(t, { strict: !0 });
}
function Qg(a = {}) {
  const e = ms(a, { strict: !1 });
  return Object.entries(e).flatMap(
    ([t, i]) => i.map((n) => ({ skillCode: t, label: n }))
  );
}
function Jg(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return {};
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw bt([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return ms(t, { strict: !0 });
}
function Xg(a = {}) {
  return JSON.stringify(
    ms(a, { strict: !1 }),
    null,
    2
  );
}
const Zg = {
  id: "skill-specializations",
  menuKey: Vg,
  settingKey: hr,
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
      options: Dr
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
  defaultData: Yc,
  createEmptyRow: () => {
    var a;
    return {
      skillCode: ((a = Dr()[0]) == null ? void 0 : a.value) ?? "",
      label: ""
    };
  },
  toRows: Qg,
  rowsToValue: Yg,
  parseBulk: Jg,
  serializeBulk: Xg
};
function ey() {
  Ca(Zg);
}
const ty = "statusConditionCatalogEditor";
function iy(a = []) {
  try {
    return Vi((Array.isArray(a) ? a : []).map((e) => ({
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
    throw bt(
      Array.isArray(e.validationErrors) ? e.validationErrors : [e.message]
    );
  }
}
function ay(a = []) {
  return Vi(a, { strict: !1 }).map((e) => ({
    id: String(e.id ?? ""),
    label: String(e.label ?? ""),
    actorGroup: String(e.actorGroup ?? "person"),
    category: String(e.category ?? ""),
    tags: gf(e.tags ?? []),
    icon: String(e.icon ?? ""),
    manual: e.manual ? "true" : "false",
    managed: e.managed ? "true" : "false",
    modifierKey: String(e.modifierKey ?? ""),
    order: String(e.order ?? "0")
  }));
}
function ny(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw bt([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  try {
    return Vi(t, { strict: !0 });
  } catch (i) {
    throw bt(
      Array.isArray(i.validationErrors) ? i.validationErrors : [i.message]
    );
  }
}
function sy(a = []) {
  return JSON.stringify(
    Vi(a, { strict: !1 }),
    null,
    2
  );
}
const ry = {
  id: "status-condition-catalog",
  menuKey: ty,
  settingKey: Xc,
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
    { key: "actorGroup", label: "Actor Group", type: "select", options: () => df },
    { key: "category", label: "Category", type: "text", placeholder: "stability" },
    { key: "tags", label: "Tags", type: "text", placeholder: "movement, piloting" },
    { key: "icon", label: "Icon", type: "text", placeholder: "systems/mwd/img/icons/status/falling.svg" },
    { key: "manual", label: "Manual", type: "select", options: () => Zo },
    { key: "managed", label: "Managed", type: "select", options: () => Zo },
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
  defaultData: iu,
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
  toRows: ay,
  rowsToValue: iy,
  parseBulk: ny,
  serializeBulk: sy
};
function oy() {
  Ca(ry);
}
class ly {
  static register() {
    Og(), Fg(), Kg(), ey(), dg(), oy(), game.settings.register(T, "useDestinyMechanics", {
      name: w.settings.useDestinyMechanics.name,
      hint: w.settings.useDestinyMechanics.hint,
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
    });
  }
  static getSystemProperty(e, t) {
    return game.settings.get(T, e) ?? t;
  }
}
class cy extends Error {
  constructor(e, { severity: t = "error" } = {}) {
    super(e), this.name = "UserFacingRollError", this.userFacing = !0, this.severity = t === "warn" ? "warn" : "error";
  }
}
function zi(a, e = {}) {
  return new cy(a, e);
}
function Ja(a, e = "Unable to execute roll.") {
  var i, n;
  const t = a != null && a.userFacing && (a == null ? void 0 : a.severity) === "warn" ? "warn" : "error";
  (n = (i = ui.notifications) == null ? void 0 : i[t]) == null || n.call(i, (a == null ? void 0 : a.message) ?? e);
}
const Jn = Symbol("SKIP_FIELD");
function nd(a) {
  return a instanceof HTMLInputElement || a instanceof HTMLSelectElement || a instanceof HTMLTextAreaElement;
}
function uy({
  elementKind: a = "input",
  inputType: e = "",
  dtype: t = "",
  value: i = "",
  checked: n = !1
} = {}) {
  const s = String(a ?? "").trim().toLowerCase(), r = String(e ?? "").trim().toLowerCase(), l = String(t ?? "").trim().toLowerCase();
  if (!["input", "select", "textarea"].includes(s))
    return Jn;
  if (s === "input") {
    if (r === "radio")
      return n ? i : Jn;
    if (r === "checkbox")
      return !!n;
  }
  if (l === "number" || s === "input" && r === "number") {
    const o = Number(i);
    return Number.isFinite(o) ? o : 0;
  }
  return l === "boolean" ? i === !0 || i === "true" : i;
}
function dy(a) {
  var e;
  return nd(a) ? uy({
    elementKind: a instanceof HTMLSelectElement ? "select" : a instanceof HTMLTextAreaElement ? "textarea" : "input",
    inputType: a instanceof HTMLInputElement ? a.type : "",
    dtype: String(((e = a.dataset) == null ? void 0 : e.dtype) ?? ""),
    value: a.value,
    checked: a instanceof HTMLInputElement ? a.checked : !1
  }) : Jn;
}
function my({
  root: a,
  document: e,
  selector: t = "input[name], select[name], textarea[name]",
  clampByPath: i = null,
  skipNames: n = []
} = {}) {
  if (!(a instanceof HTMLElement)) return {};
  const s = new Set(Array.isArray(n) ? n : [n]), r = {};
  for (const l of a.querySelectorAll(t)) {
    if (!nd(l) || l.closest("prose-mirror") || l.disabled) continue;
    const o = String(l.getAttribute("name") ?? l.name ?? "").trim();
    if (!o || s.has(o)) continue;
    let c = dy(l);
    c === Jn || (typeof i == "function" && (c = i(o, c)), (e ? foundry.utils.getProperty(e, o) : void 0) === c) || (r[o] = c);
  }
  return r;
}
const { HandlebarsApplicationMixin: fy } = foundry.applications.api, { HTMLField: py } = foundry.data.fields;
function hy(a) {
  const e = new py({ required: !1, blank: !0, initial: "" });
  return e.name = a, e;
}
var zt, en, vi, _i, Or, _r;
const $e = class $e extends fy(foundry.applications.sheets.ActorSheetV2) {
  constructor() {
    super(...arguments);
    Ae(this, _i);
    Ae(this, zt, !1);
    /** Track active CSB tab per group across rerenders */
    Ae(this, en, /* @__PURE__ */ new Map());
    // group -> tabId
    Ae(this, vi, /* @__PURE__ */ new Map());
  }
  /** @override */
  _updatePosition(t) {
    const i = super._updatePosition(t), {
      MIN_WIDTH: n,
      MAX_WIDTH: s,
      MIN_HEIGHT: r,
      MAX_HEIGHT: l
    } = this.constructor;
    return typeof i.width == "number" && (i.width = Math.min(
      s,
      Math.max(n, i.width)
    )), typeof i.height == "number" && (i.height = Math.min(
      l,
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
    return z(this, zt);
  }
  toggleEditing() {
    if (this.isEditable) {
      if (z(this, zt)) {
        this._commitEditsToActor().finally(() => {
          Ie(this, zt, !z(this, zt)), this.render({ force: !0 });
        });
        return;
      }
      Ie(this, zt, !z(this, zt)), this.render({ force: !0 });
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
    var l, o, c, u, d;
    t = super._initializeApplicationOptions(t), t.classes = Array.from(t.classes ?? []);
    const i = (t == null ? void 0 : t.document) ?? this.document, n = (i == null ? void 0 : i.type) ?? ((l = this.actor) == null ? void 0 : l.type);
    n && t.classes.push(String(n));
    const s = ((d = (u = (c = (o = game.system) == null ? void 0 : o.anarchy) == null ? void 0 : c.styles) == null ? void 0 : u.selectCssClass) == null ? void 0 : d.call(u)) ?? "mwd-theme-default", r = ["mwd-theme-default", "mwd-theme-sra"];
    for (let m = t.classes.length - 1; m >= 0; m--)
      r.includes(t.classes[m]) && t.classes.splice(m, 1);
    return t.classes.push(s), t;
  }
  /**
   * No localization: provide a concrete title so Foundry doesn't show "TYPES.Actor.<type>".
   * @override
   */
  get title() {
    var r, l;
    const t = ((r = this.actor) == null ? void 0 : r.type) ?? "actor", n = {
      character: "Character",
      npc: "NPC",
      battlemech: "BattleMech",
      vehicle: "Vehicle",
      device: "Device"
    }[t] ?? String(t).replace(/(^|[-_])([a-z])/g, (o, c, u) => (c ? " " : "") + u.toUpperCase());
    return `${((l = this.actor) == null ? void 0 : l.name) ?? "Actor"} — ${n}`;
  }
  /**
   * Window actions (header/menu). Centralize here and dedupe by action key.
   * @override
   */
  _getHeaderControls() {
    var r, l;
    let t = ((r = super._getHeaderControls) == null ? void 0 : r.call(this)) ?? [];
    const i = ((l = this.document) == null ? void 0 : l.isToken) ?? !1, n = /* @__PURE__ */ new Set();
    i ? (n.add("prototypeToken"), n.add("configurePrototypeToken")) : (n.add("token"), n.add("configureToken")), t = t.filter((o) => {
      const c = (o == null ? void 0 : o.action) ?? "", u = String((o == null ? void 0 : o.label) ?? "");
      return !(n.has(c) || i && u.includes("Prototype") || !i && u === "Token");
    });
    const s = /* @__PURE__ */ new Set();
    return t = t.filter((o) => {
      const c = o == null ? void 0 : o.action, u = c ? `a:${c}` : `il:${(o == null ? void 0 : o.icon) ?? ""}|${(o == null ? void 0 : o.label) ?? ""}`;
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
    var o, c, u;
    const n = ((o = i == null ? void 0 : i.closest) == null ? void 0 : o.call(i, ".csb-tab-link[data-tab]")) ?? ((u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, ".csb-tab-link[data-tab]"));
    if (!n) return;
    const s = n.dataset.tab, r = n.closest(".csb-tabs");
    if (!r || !s) return;
    const l = r.dataset.group || "default";
    z(this, en).set(l, s), E(this, _i, Or).call(this, r, s);
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const n = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!n) return;
    const s = n.dataset.section, r = n.closest(".csb-accordion");
    if (!r || !s) return;
    const l = r.dataset.group || "default", c = (z(this, vi).has(l) ? z(this, vi).get(l) : r.dataset.default || null) === s ? null : s;
    z(this, vi).set(l, c), E(this, _i, _r).call(this, r, c);
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
    const l = !!(t != null && t.shiftKey), o = ((p = game.mwd) == null ? void 0 : p.roll) ?? ((g = (h = game.system) == null ? void 0 : h.mwd) == null ? void 0 : g.roll);
    if (!(o != null && o.execute)) {
      (y = ui.notifications) == null || y.error("MWD roll system not initialized (game.mwd.roll.execute missing).");
      return;
    }
    try {
      return await o.execute({ actor: this.actor, payload: r, event: t, quick: l });
    } catch (b) {
      return console.error("MWD | Failed to execute roll action", b), Ja(b, "Unable to execute that roll."), null;
    }
  }
  async _onEditImage(t, i) {
    var r, l, o;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable || !this.editing) return;
    const n = foundry.applications.apps.FilePicker.implementation;
    new n({
      type: "image",
      current: ((o = this.actor) == null ? void 0 : o.img) ?? "",
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
    var s, r, l, o, c, u, d, m, f, p, h;
    const n = String(
      ((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.itemId) ?? ((o = (l = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, "[data-item-id]")) == null ? void 0 : l.dataset) == null ? void 0 : o.itemId) ?? ((m = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
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
    var l, o, c;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = String(((c = i == null ? void 0 : i.dataset) == null ? void 0 : c.itemType) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = s.items.filter((u) => (u.canonicalType ?? u.type) === n).length;
    await s.createEmbeddedDocuments("Item", [{
      name: `${this._getItemTypeLabel(n)} ${r + 1}`,
      type: n
    }]), this.render({ force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var s, r, l;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = this._getOwnedItemFromTarget(i, t);
    (l = n == null ? void 0 : n.sheet) == null || l.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var r, l;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const n = this._getOwnedItemFromTarget(i, t);
    if (!n) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [n.id]), this.render({ force: !0 });
  }
  async _onToggleOwnedItemEquipped(t, i) {
    var r, l, o, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const n = this._getOwnedItemFromTarget(i, t);
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor;
    await ((c = s.setOwnedItemEquipped) == null ? void 0 : c.call(s, n.id, !((o = n.system) != null && o.equipped))), this.render({ force: !0 });
  }
  async _onSetOwnedItemPrimary(t, i) {
    var r, l, o, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const n = this._getOwnedItemFromTarget(i, t);
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor;
    await ((c = s.setOwnedItemPrimary) == null ? void 0 : c.call(s, n.id, !((o = n.system) != null && o.isPrimary))), this.render({ force: !0 });
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
    var s, r, l;
    (s = super._onRender) == null || s.call(this, t, i);
    const n = this._getRootElement();
    if (n) {
      for (const o of n.querySelectorAll(".csb-tabs")) {
        const c = o.dataset.group || "default", u = z(this, en).get(c), d = o.dataset.default || ((r = o.querySelector(".csb-tab-link[data-tab]")) == null ? void 0 : r.dataset.tab), m = u || d;
        m && E(this, _i, Or).call(this, o, m);
      }
      for (const o of n.querySelectorAll(".csb-accordion")) {
        const c = o.dataset.group || "default", u = z(this, vi).has(c) ? z(this, vi).get(c) : o.dataset.default || null;
        E(this, _i, _r).call(this, o, u);
      }
      n.querySelectorAll(".csb-tabs").length && !n.querySelector(".csb-tab-panel.is-active") && console.warn(`${be} CSB tabs present but no active tab applied. Check element root resolution and CSS .is-active selectors.`, {
        sheet: (l = this.constructor) == null ? void 0 : l.name
      });
      for (const o of n.querySelectorAll('prose-mirror[name="system.biography.history"]'))
        o.addEventListener("change", (c) => {
          c.preventDefault(), this._updateRichTextHistory(o);
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
    const i = my({
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
    var r, l, o, c, u, d, m, f, p, h, g;
    console.log(`${be}BaseActorSheetV2._prepareContext:start`, {
      actorName: (r = this.actor) == null ? void 0 : r.name,
      actorType: (l = this.actor) == null ? void 0 : l.type
    });
    const i = await super._prepareContext(t), n = foundry.utils.deepClone((i == null ? void 0 : i.options) ?? {});
    n.classes = Array.from(((o = this.options) == null ? void 0 : o.classes) ?? []), n.cssClass = n.classes.join(" ");
    const s = foundry.utils.mergeObject(
      i,
      {
        actor: this.actor,
        system: (c = this.actor) == null ? void 0 : c.system,
        editable: this.isEditable,
        owner: ((u = this.document) == null ? void 0 : u.isOwner) ?? !1,
        limited: !(((d = this.document) == null ? void 0 : d.isOwner) ?? !1),
        editing: z(this, zt),
        data: this.actor,
        options: n,
        cssClass: n.cssClass
      },
      { inplace: !1 }
    );
    return s.options.owner = s.owner, s.options.limited = s.limited, s.options.editable = s.editable, s.options.editing = s.editing, s.options.viewMode = !s.editing, s.skillsDisplay = Jc(((m = this.actor) == null ? void 0 : m.system) ?? {}), s.bio = {
      ...s.bio ?? {},
      fields: {
        history: hy("system.biography.history")
      }
    }, s.items ?? (s.items = {}), (f = this.actor) != null && f.items && typeof (se == null ? void 0 : se.classifyInto) == "function" && (se.classifyInto(s.items, this.actor.items), s.items.weapon = [
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
    }, console.log(`${be}BaseActorSheetV2._prepareContext:done`, {
      actorType: (p = this.actor) == null ? void 0 : p.type,
      cssClass: s.cssClass,
      itemCount: ((g = (h = this.actor) == null ? void 0 : h.items) == null ? void 0 : g.size) ?? 0,
      editing: z(this, zt)
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
    const r = n === "burn" ? "system.burn.value" : `system.monitors.${n}.value`, l = Number(foundry.utils.getProperty(this.actor, r) ?? 0), o = n === "armor" ? s : l === s ? 0 : s, c = this.getPersistentActor() ?? this.actor;
    if (typeof (c == null ? void 0 : c.setMonitorValue) == "function")
      return c.setMonitorValue(n, o, { source: "sheet" });
    const u = `system.monitors.${n}`, d = Number(foundry.utils.getProperty(c, `${u}.max`)) || 0, m = Math.min(Math.max(0, o), Math.max(0, d));
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
zt = new WeakMap(), en = new WeakMap(), vi = new WeakMap(), _i = new WeakSet(), /**
 * Apply active-state classes within a single .csb-tabs root.
 * Idempotent: safe to call every render.
 */
Or = function(t, i) {
  t.querySelectorAll(".csb-tab-link").forEach((n) => {
    n.classList.toggle("is-active", n.dataset.tab === i);
  }), t.querySelectorAll(".csb-tab-panel").forEach((n) => {
    n.classList.toggle("is-active", n.dataset.tab === i);
  });
}, _r = function(t, i) {
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
O($e, "MIN_WIDTH", 800), O($e, "MAX_WIDTH", 950), O($e, "MIN_HEIGHT", 600), O($e, "MAX_HEIGHT", 1400), // group -> sectionId|null
/** @override */
O($e, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Vt($e, $e, "DEFAULT_OPTIONS"), {
  classes: ["sheet", "actor", T, "appv2", "mwd-sheet", "mwd-character-sheet"],
  position: { width: 760, height: 760 },
  window: { resizable: !0, minimizable: !0 },
  actions: {
    toggleViewMode: $e.prototype._onToggleViewMode,
    tab: $e.prototype._onClickTab,
    accordion: $e.prototype._onClickAccordion,
    roll: $e.prototype._onRollAction,
    monitorSet: $e.prototype._onMonitorSet,
    editImage: $e.prototype._onEditImage,
    createOwnedItem: $e.prototype._onCreateOwnedItem,
    editOwnedItem: $e.prototype._onEditOwnedItem,
    deleteOwnedItem: $e.prototype._onDeleteOwnedItem,
    toggleOwnedItemEquipped: $e.prototype._onToggleOwnedItemEquipped,
    setOwnedItemPrimary: $e.prototype._onSetOwnedItemPrimary
  }
}, { inplace: !1 }));
let Xa = $e;
function gy(a = {}) {
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
function yy(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(/\s+/).filter(Boolean) : [];
}
function Ln(a) {
  if (!a || typeof a != "object") return a;
  const e = {
    ...a,
    template: a.template ?? gy(a),
    classes: yy(a.classes),
    children: Array.isArray(a.children) ? a.children.map(Ln) : []
  };
  return a.type === "tabs" && (e.tabs = Array.isArray(a.tabs) ? a.tabs.map((t) => ({
    ...t,
    children: Array.isArray(t.children) ? t.children.map(Ln) : []
  })) : []), a.type === "accordion" && (e.sections = Array.isArray(a.sections) ? a.sections.map((t) => ({
    ...t,
    children: Array.isArray(t.children) ? t.children.map(Ln) : []
  })) : []), e;
}
function Ul(a = {}) {
  return {
    ...a,
    root: Ln(a.root ?? { type: "stack", children: [] })
  };
}
var ki, ns, sd;
class Ji {
  static async get(e) {
    if (z(this, ki).has(e)) {
      const n = await z(this, ki).get(e);
      if (Number((n == null ? void 0 : n.version) ?? 0) > 0) return n;
      z(this, ki).delete(e);
    }
    const t = E(this, ns, sd).call(this, e);
    z(this, ki).set(e, t);
    const i = await t;
    return Number((i == null ? void 0 : i.version) ?? 0) <= 0 && z(this, ki).delete(e), i;
  }
}
ki = new WeakMap(), ns = new WeakSet(), sd = async function(e) {
  const t = `systems/${T}/templates/v2/layouts/${e}.layout.json`;
  try {
    const i = await fetch(t);
    if (!i.ok) throw new Error(`HTTP ${i.status} for ${t}`);
    return Ul(await i.json());
  } catch (i) {
    return console.error(`${be}LayoutRegistry.get FAILED`, { layoutId: e, url: t, error: i }), Ul({
      id: e,
      version: 0,
      root: { type: "stack", children: [] }
    });
  }
}, Ae(Ji, ns), Ae(Ji, ki, /* @__PURE__ */ new Map());
function Ms(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function by(a = {}) {
  var i, n, s, r;
  const e = Array.isArray((i = a == null ? void 0 : a.attack) == null ? void 0 : i.targets) ? a.attack.targets : [], t = fi(((n = a == null ? void 0 : a.attack) == null ? void 0 : n.areaEffect) ?? ((r = (s = a == null ? void 0 : a.attack) == null ? void 0 : s.payload) == null ? void 0 : r.areaEffect) ?? {});
  if (!e.length && t.kind !== ut.persistent)
    throw new Error("Attack requires at least one target.");
  return e;
}
async function Sy(a = {}) {
  if (!(a != null && a.actorUuid)) return null;
  try {
    return await fromUuid(a.actorUuid);
  } catch (e) {
    return console.warn("MWD | Unable to resolve attack target actor for CQ", a, e), null;
  }
}
function Ay(a = {}, e = null, t = "") {
  var i, n, s, r, l;
  return Math.max(0, Ms(
    ((i = a == null ? void 0 : a.attributes) == null ? void 0 : i[t]) ?? ((n = e == null ? void 0 : e.getAttributeValue) == null ? void 0 : n.call(e, t)) ?? ((l = (r = (s = e == null ? void 0 : e.system) == null ? void 0 : s.attributes) == null ? void 0 : r[t]) == null ? void 0 : l.value),
    0
  ));
}
function Ty(a = {}, e = null, t = "") {
  var i, n, s, r, l, o;
  return Math.max(0, Ms(
    ((n = (i = a == null ? void 0 : a.skills) == null ? void 0 : i[t]) == null ? void 0 : n.rating) ?? ((s = e == null ? void 0 : e.getSkillRating) == null ? void 0 : s.call(e, t)) ?? ((o = (l = (r = e == null ? void 0 : e.system) == null ? void 0 : r.skills) == null ? void 0 : l[t]) == null ? void 0 : o.rating),
    0
  ));
}
function Hl(a = []) {
  return a.reduce((e, t) => e + Ms(t == null ? void 0 : t.value, 0), 0);
}
async function wy({ attacker: a = null, ctx: e = {}, target: t = {} } = {}) {
  var v, M, N, P, U, K, Y, W, j, L, B, G, X, oe, Se, me, C, V, ne, ae, ke, Ke;
  const i = await Sy(t), n = Math.max(0, Number(((P = (M = (v = e == null ? void 0 : e.attack) == null ? void 0 : v.weapon) == null ? void 0 : M.attackRatingBand) == null ? void 0 : P[(N = e == null ? void 0 : e.attack) == null ? void 0 : N.rangeBand]) ?? 0) || 0), s = Ay(t, i, "reflexes"), r = s + s, l = String(((K = (U = e == null ? void 0 : e.attack) == null ? void 0 : U.skill) == null ? void 0 : K.code) ?? ((W = (Y = e == null ? void 0 : e.attack) == null ? void 0 : Y.weapon) == null ? void 0 : W.skill) ?? "").trim(), o = String(((L = (j = e == null ? void 0 : e.attack) == null ? void 0 : j.skill) == null ? void 0 : L.label) ?? l ?? "Attack Skill").trim() || "Attack Skill", c = l ? Math.max(0, Ms(((B = a == null ? void 0 : a.getSkillRating) == null ? void 0 : B.call(a, l)) ?? ((oe = (X = (G = a == null ? void 0 : a.system) == null ? void 0 : G.skills) == null ? void 0 : X[l]) == null ? void 0 : oe.rating), 0)) : 0, u = Ty(t, i, "tactics"), d = c - u, m = Math.abs(d), f = Math.max(0, Number(((Se = t == null ? void 0 : t.activeArmor) == null ? void 0 : Se.defenseBonus) ?? 0) || 0), p = String(((me = e == null ? void 0 : e.attack) == null ? void 0 : me.rangeBand) ?? "").trim() || "range", g = [{
    id: "weapon.attackRating",
    label: `Weapon AR (${((V = (C = e == null ? void 0 : e.attack) == null ? void 0 : C.weapon) == null ? void 0 : V.type) === "personalWeapon" || (ae = (ne = e == null ? void 0 : e.attack) == null ? void 0 : ne.weapon) != null && ae.isSynthetic ? Ss(p) : p})`,
    value: n
  }], y = [{
    id: "target.reflexesDefense",
    label: "Target REF + REF",
    value: r
  }];
  d > 0 ? g.push({
    id: "skill.attackVsTactics",
    label: `${o} over Tactics`,
    value: m
  }) : d < 0 && y.push({
    id: "target.tacticsAdvantage",
    label: `Tactics over ${o}`,
    value: m
  }), (Ke = (ke = e == null ? void 0 : e.attack) == null ? void 0 : ke.aim) != null && Ke.eligible && g.push({
    id: "state.aim",
    label: `Aim (${o})`,
    value: c
  }), y.push({
    id: "target.armorDefense",
    label: "Armor Defense",
    value: f
  });
  const b = Hl(g), S = Hl(y);
  return {
    ar: {
      parts: g,
      total: b
    },
    dr: {
      parts: y,
      total: S
    },
    comparison: {
      attackSkillCode: l,
      attackSkillLabel: o,
      attackerSkill: c,
      defenderSkillCode: "tactics",
      defenderSkillLabel: "Tactics",
      defenderSkill: u,
      delta: d,
      advantage: m,
      winner: d > 0 ? "attacker" : d < 0 ? "defender" : "none"
    },
    value: b - S
  };
}
function vy(a = {}, e = {}) {
  var m, f, p, h, g, y, b, S;
  const t = (a == null ? void 0 : a.attack) ?? {}, i = String(((f = (m = t == null ? void 0 : t.payload) == null ? void 0 : m.modifies) == null ? void 0 : f.damageType) ?? "").trim(), n = Math.max(0, Number(((p = t == null ? void 0 : t.weapon) == null ? void 0 : p.damage) ?? 0) || 0), s = Gt(i || ((h = t == null ? void 0 : t.weapon) == null ? void 0 : h.damageType), "concussive"), r = Math.max(0, Number((t == null ? void 0 : t.totalAp) ?? ((g = t == null ? void 0 : t.weapon) == null ? void 0 : g.ap) ?? 0) || 0), l = e.outcome === "graze" ? n / 2 : e.outcome === "hit" ? n : 0, o = l + Number(e.netHits ?? 0), c = oo((t == null ? void 0 : t.currentExposure) ?? Di({
    tier: ((y = t == null ? void 0 : t.currentExposure) == null ? void 0 : y.initialTier) ?? ((b = t == null ? void 0 : t.currentExposure) == null ? void 0 : b.tier) ?? "none"
  }), {
    active: !!(t != null && t.evadeActive),
    locked: !!(t != null && t.evadeLocked)
  }), u = fi((t == null ? void 0 : t.areaEffect) ?? ((S = t == null ? void 0 : t.payload) == null ? void 0 : S.areaEffect) ?? {}), d = u.kind === ut.persistent ? o : Gi(o, c.finalTier);
  return {
    baseDamage: n,
    effectiveWeaponDamage: l,
    netHits: Number(e.netHits ?? 0),
    incoming: o,
    scaledIncoming: d,
    ap: r,
    damageType: s,
    damageTypeLabel: qt(s),
    exposure: c,
    areaEffect: u
  };
}
function ky(a = {}) {
  return String((a == null ? void 0 : a.tokenUuid) ?? (a == null ? void 0 : a.actorUuid) ?? (a == null ? void 0 : a.tokenId) ?? (a == null ? void 0 : a.actorId) ?? (a == null ? void 0 : a.name) ?? foundry.utils.randomID()).trim();
}
function Ey({ attacker: a, ctx: e, damage: t } = {}) {
  var i, n, s, r, l;
  return {
    mode: "attackDamage",
    track: A.monitors.physical,
    damage: (t == null ? void 0 : t.scaledIncoming) ?? 0,
    netHits: 0,
    damageType: t == null ? void 0 : t.damageType,
    ap: (t == null ? void 0 : t.ap) ?? 0,
    effects: ((n = (i = e == null ? void 0 : e.attack) == null ? void 0 : i.weapon) == null ? void 0 : n.effects) ?? {},
    source: `${(a == null ? void 0 : a.name) ?? "Attacker"}: ${((r = (s = e == null ? void 0 : e.attack) == null ? void 0 : s.weapon) == null ? void 0 : r.name) ?? "Attack"}`,
    notes: (l = t == null ? void 0 : t.exposure) != null && l.initialTier ? `Exposure ${Ct(t.exposure.initialTier)}${t.exposure.evadeUsed ? ` -> ${Ct(t.exposure.finalTier)}` : ""}` : ""
  };
}
function za(a, e = {}, t = {}, { queued: i = !1, applied: n = !1, skipped: s = !1, reason: r = "" } = {}) {
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
async function My({ attacker: a, ctx: e, target: t, outcome: i, damage: n } = {}) {
  var c;
  if ((i == null ? void 0 : i.outcome) === "miss")
    return za(null, t, n, { skipped: !0, reason: "Missed target." });
  if (((c = n == null ? void 0 : n.areaEffect) == null ? void 0 : c.kind) === ut.persistent)
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
  } catch (u) {
    return console.warn("MWD | Unable to resolve target for queued attack damage", t, u), za(null, t, n, { reason: "Unable to resolve attack target." });
  }
  const l = Ey({ attacker: a, ctx: e, damage: n }), o = await yt.apply({
    actor: r,
    token: s,
    payload: l,
    options: {
      actorId: (r == null ? void 0 : r.id) ?? "",
      dryRun: !0,
      logToChat: !1
    }
  });
  if (o != null && o.ok) {
    const u = za(o, t, n, { queued: !0, applied: !1 });
    return {
      ...u,
      queuedMutation: {
        id: foundry.utils.randomID(),
        type: "attackDamage",
        applied: !1,
        target: {
          name: (t == null ? void 0 : t.name) ?? "Target",
          actorUuid: (t == null ? void 0 : t.actorUuid) ?? null,
          tokenUuid: (t == null ? void 0 : t.tokenUuid) ?? null
        },
        payload: l,
        preview: u
      }
    };
  }
  return za(o, t, n, { reason: "Unable to preview attack damage." });
}
async function Cy({ attacker: a, ctx: e, outcomeModel: t, target: i, previewState: n = {} } = {}) {
  var y, b;
  const s = await wy({ attacker: a, ctx: e, target: i }), r = Number((t == null ? void 0 : t.margin) ?? 0), l = Number(s.value ?? 0), o = r;
  let c = l > 0 ? r >= 1 ? "hit" : r === 0 ? "graze" : "miss" : l < 0 ? r >= 2 ? "hit" : r === 1 ? "graze" : "miss" : r >= 1 ? "hit" : "miss";
  String(((y = e == null ? void 0 : e.attack) == null ? void 0 : y.rangeBand) ?? "").trim().toLowerCase() === "outofrange" && c === "hit" && (c = "graze");
  const u = c === "hit" ? Math.max(0, o) : 0, d = (e == null ? void 0 : e.attack) ?? {}, m = ky(i), f = (n == null ? void 0 : n[m]) ?? {}, p = (i == null ? void 0 : i.exposure) ?? Di({ tier: "none" }), h = vy({
    ...e,
    attack: {
      ...d,
      currentExposure: p,
      areaEffect: (d == null ? void 0 : d.areaEffect) ?? ((b = d == null ? void 0 : d.payload) == null ? void 0 : b.areaEffect) ?? null,
      evadeActive: !!(f != null && f.evadeActive),
      evadeLocked: !!(p != null && p.evadeLocked)
    }
  }, { outcome: c, netHits: u }), g = await My({
    attacker: a,
    ctx: e,
    target: i,
    outcome: { outcome: c },
    damage: h
  });
  return {
    target: {
      name: (i == null ? void 0 : i.name) ?? "Target",
      actorUuid: (i == null ? void 0 : i.actorUuid) ?? null,
      tokenUuid: (i == null ? void 0 : i.tokenUuid) ?? null
    },
    previewKey: m,
    exposure: p,
    evadeActive: !!(f != null && f.evadeActive),
    evadeEdgePoolKey: String((f == null ? void 0 : f.edgePoolKey) ?? "").trim() || null,
    cq: s,
    margin: r,
    rawNetHits: o,
    netHits: u,
    outcome: c,
    damage: h,
    damageResult: g,
    queuedMutation: (g == null ? void 0 : g.queuedMutation) ?? null
  };
}
function Py(a = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of a)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
async function rd({ attacker: a, ctx: e, outcomeModel: t, previewState: i = {}, existingAttackResult: n = null } = {}) {
  var c, u, d, m, f, p;
  const s = by(e), r = [];
  for (const h of s)
    r.push(await Cy({ attacker: a, ctx: e, outcomeModel: t, target: h, previewState: i }));
  const l = fi(((c = e == null ? void 0 : e.attack) == null ? void 0 : c.areaEffect) ?? ((d = (u = e == null ? void 0 : e.attack) == null ? void 0 : u.payload) == null ? void 0 : d.areaEffect) ?? {});
  let o = String((n == null ? void 0 : n.persistentRegionUuid) ?? "").trim() || null;
  if (l.kind === ut.persistent && !o) {
    const h = await dp({
      attacker: a,
      attack: (e == null ? void 0 : e.attack) ?? {},
      targetResult: r[0] ?? null
    });
    o = (h == null ? void 0 : h.uuid) ?? null;
  }
  return {
    targetCount: s.length,
    results: r,
    summary: Py(r),
    areaEffect: l,
    templateGeometry: ei(Oe(
      (m = e == null ? void 0 : e.attack) == null ? void 0 : m.templateGeometry,
      {
        template: (f = e == null ? void 0 : e.attack) == null ? void 0 : f.template,
        placement: (p = e == null ? void 0 : e.attack) == null ? void 0 : p.templatePlacement
      }
    )),
    persistentRegionUuid: o
  };
}
function _e(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
function Ys(a, e = 0, t = Number.POSITIVE_INFINITY) {
  const i = _e(a, e);
  return Math.max(e, Math.min(t, i));
}
function od(a, e = 1) {
  var i;
  const t = _e((i = a == null ? void 0 : a.difficulty) == null ? void 0 : i.dn, _e(e, 1));
  return Math.max(0, t);
}
function Ny(a, e) {
  return Math.max(0, _e(a, 0) - _e(e, 0));
}
function Ry({ convert: a, remainder: e, rate: t = 4 } = {}) {
  const i = Math.max(0, _e(e, 0)), n = Math.max(1, _e(t, 4)), s = Math.max(0, _e(a, 0)), r = Math.floor(s / n) * n;
  return Math.min(i, r);
}
function Oo(a, { rate: e = 4, maxPerRoll: t = Number.POSITIVE_INFINITY } = {}) {
  const i = Math.max(1, _e(e, 4)), n = Math.floor(Math.max(0, _e(a, 0)) / i), s = Number.isFinite(t) ? Math.max(0, _e(t, 0)) : Number.POSITIVE_INFINITY;
  return { amount: Math.min(n, s), rate: i };
}
function _o(a) {
  var i;
  const e = ((i = a == null ? void 0 : a.edge) == null ? void 0 : i.earn) ?? {};
  return {
    enabled: !!(e != null && e.enabled),
    rate: Math.max(1, _e(e == null ? void 0 : e.rate, 4)),
    maxPerRoll: (e == null ? void 0 : e.maxPerRoll) ?? Number.POSITIVE_INFINITY
  };
}
function Xn(a) {
  var t;
  const e = (t = a == null ? void 0 : a.edge) == null ? void 0 : t.pool;
  return e ? String(e) : null;
}
function Iy(a) {
  let e = 0, t = 0;
  const i = (n) => {
    if (!n) return;
    const s = n == null ? void 0 : n.results;
    if (Array.isArray(s))
      for (const l of s) {
        if ((l == null ? void 0 : l.active) === !1) continue;
        const o = Number(l == null ? void 0 : l.result);
        Number.isFinite(o) && (e += 1, o === 1 && (t += 1));
      }
    const r = n == null ? void 0 : n.terms;
    if (Array.isArray(r))
      for (const l of r) i(l);
    if (Array.isArray(n))
      for (const l of n) i(l);
  };
  return i(a), { dice: e, ones: t };
}
function ld(a, e) {
  if (_e(a, 0) !== 0) return !1;
  const { dice: t, ones: i } = Iy(e);
  return t <= 0 ? !1 : i >= Math.ceil(t / 2);
}
function Dy(a, e, t = 4) {
  return !!(a && _e(e, 0) >= _e(t, 4));
}
function Wl(a, e) {
  const t = _e(e == null ? void 0 : e.successes, 0), i = od(a, 1), n = t >= i, s = t - i, r = Dy(n, s, 4), l = ld(t, e == null ? void 0 : e.raw), o = _o(a), c = o.maxPerRoll ?? 1, u = o.enabled && s >= o.rate ? (() => {
    const { amount: m, rate: f } = Oo(s, { rate: o.rate, maxPerRoll: c }), p = Xn(a);
    return m > 0 ? { amount: m, pool: p, reason: "net4", details: { margin: s, rate: f } } : null;
  })() : null;
  return {
    rollType: "simple",
    passed: n,
    successes: t,
    difficulty: { dn: i },
    margin: s,
    criticalSuccess: r,
    criticalFailure: l,
    tier: r ? "criticalSuccess" : l ? "criticalFailure" : n ? "success" : "failure",
    edgeEarned: u
  };
}
function Oy(a, e, t) {
  var m, f;
  const i = _e(e == null ? void 0 : e.successes, 0), n = _e(t == null ? void 0 : t.successes, 0), s = !!((m = a == null ? void 0 : a.opposed) != null && m.net), r = String(((f = a == null ? void 0 : a.opposed) == null ? void 0 : f.dnTies) ?? "stalemate");
  let l = null, o = !1;
  s ? (l = i - n, l > 0 ? o = !0 : l < 0 ? o = !1 : r === "attackerWins" ? o = !0 : o = !1) : i > n ? o = !0 : i < n ? o = !1 : r === "attackerWins" ? o = !0 : o = !1;
  const c = _o(a), u = c.maxPerRoll ?? 1, d = c.enabled && s && typeof l == "number" && l >= c.rate ? (() => {
    const { amount: p, rate: h } = Oo(l, { rate: c.rate, maxPerRoll: u }), g = Xn(a);
    return p > 0 ? { amount: p, pool: g, reason: "net4", details: { netHits: l, rate: h } } : null;
  })() : null;
  return {
    rollType: "opposed",
    passed: o,
    successes: i,
    opposed: {
      attacker: i,
      defender: n,
      netEnabled: s,
      netHits: s ? l : void 0,
      tiePolicy: r
    },
    edgeEarned: d
  };
}
function _y(a, e) {
  var h, g, y;
  const t = _e(e == null ? void 0 : e.successes, 0), i = od(a, 1), n = t >= i, s = ld(t, e == null ? void 0 : e.raw), r = Ny(t, i), l = ((h = a == null ? void 0 : a.net) == null ? void 0 : h.convert) ?? ((g = a == null ? void 0 : a.allocation) == null ? void 0 : g.convert) ?? 0, o = _o(a), c = o.rate, u = Ry({ convert: l, remainder: r, rate: c }), d = r - u, m = o.enabled && u >= c ? (() => {
    const { amount: b } = Oo(u, { rate: c, maxPerRoll: o.maxPerRoll }), S = Xn(a);
    return b > 0 ? { amount: b, pool: S, reason: "convert4", details: { converted: u, rate: c } } : null;
  })() : null, f = s ? { amount: 1, pool: Xn(a), reason: "critFail", details: { onesRule: "halfOrMoreOnes" } } : null, p = [];
  return m && p.push(m), f && p.push(f), p.length === 0 || (p.length === 1 ? p[0] : (p.reduce((b, S) => b + (Number(S == null ? void 0 : S.amount) || 0), 0), (y = p[0]) == null || y.pool)), {
    rollType: "net",
    passed: n,
    successes: t,
    difficulty: { dn: i },
    criticalFailure: s,
    tier: s ? "criticalFailure" : n ? "success" : "failure",
    net: {
      remainder: r,
      convertRequested: _e(l, 0),
      converted: u,
      value: d,
      // the actual net effect magnitude you apply (+net dice, etc.)
      rate: c,
      canConvert: r >= c
    },
    edgeEarned: m
  };
}
function Ly(a, e) {
  var l, o, c, u;
  const t = _e(e == null ? void 0 : e.successes, 0), i = Ys((l = a == null ? void 0 : a.extended) == null ? void 0 : l.target, 1, 1e4), n = Ys((o = a == null ? void 0 : a.extended) == null ? void 0 : o.accumulated, 0, 1e4), s = Ys(n + t, 0, 1e4), r = s >= i;
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
function cd(a, e, t = null) {
  var n;
  switch (String((a == null ? void 0 : a.rollType) ?? "simple")) {
    case "simple":
      return Wl(a, e);
    case "opposed":
      return Oy(a, e, t);
    case "net":
      return _y(a, e);
    case "extended":
      return Ly(a, e);
    default: {
      const s = {
        ...a,
        difficulty: { dn: Number(((n = a == null ? void 0 : a.difficulty) == null ? void 0 : n.dn) ?? 1) || 1 }
      };
      return Wl(s, e);
    }
  }
}
function xy(a, e) {
  var c, u, d, m, f, p, h, g, y;
  const t = a ?? {}, i = Array.isArray((c = t == null ? void 0 : t.modifiers) == null ? void 0 : c.applied) ? t.modifiers.applied : [], n = Number(((u = t == null ? void 0 : t.modifiers) == null ? void 0 : u.total) ?? 0);
  if (i.length) {
    const b = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((S) => S.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${i.map((S) => `${S.label} ${jl(S.value)}`).join(", ")} (Total ${jl(n)})`,
      title: (b == null ? void 0 : b.tooltip) ?? ""
    });
  }
  const s = (t == null ? void 0 : t.edge) ?? null, r = Array.isArray((d = t == null ? void 0 : t.roll) == null ? void 0 : d.failureDiceRefs) ? t.roll.failureDiceRefs : [], l = !!((m = s == null ? void 0 : s.availableActions) != null && m.canPostRerollFailures), o = Array.isArray((f = s == null ? void 0 : s.allowed) == null ? void 0 : f.postPools) ? s.allowed.postPools : [];
  if (s != null && s.domain && (e.edge = {
    domain: s.domain,
    earned: ((p = t == null ? void 0 : t.outcomeModel) == null ? void 0 : p.edgeEarned) ?? null,
    preSpent: Number(((h = s == null ? void 0 : s.pre) == null ? void 0 : h.spent) ?? 0),
    postSpent: Number(((g = s == null ? void 0 : s.post) == null ? void 0 : g.spent) ?? 0),
    canPost: l && r.length > 0 && o.length > 0,
    failureCount: r.length,
    postPools: o
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
function jl(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function $y(a, e) {
  var g, y, b, S, v, M, N, P, U, K, Y, W, j, L, B, G, X, oe, Se, me;
  const t = a ?? {}, i = (t == null ? void 0 : t.attackResult) ?? null;
  if (!i) return;
  const n = Array.isArray(i == null ? void 0 : i.results) ? i.results : [], s = (i == null ? void 0 : i.summary) ?? zy(n), r = n.some((C) => {
    var V;
    return !!((V = C == null ? void 0 : C.queuedMutation) != null && V.applied);
  }), l = n.filter(
    (C) => (C == null ? void 0 : C.queuedMutation) && !C.queuedMutation.applied
  ), o = !!((y = (g = t == null ? void 0 : t.attack) == null ? void 0 : g.capabilityReport) != null && y.isTemplated), c = Array.isArray((b = t == null ? void 0 : t.modifiers) == null ? void 0 : b.applied) ? t.modifiers.applied : [], u = Number(((S = t == null ? void 0 : t.modifiers) == null ? void 0 : S.total) ?? 0);
  if (c.length) {
    const C = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((V) => V.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${c.map((V) => `${V.label} ${ua(V.value)}`).join(", ")} (Total ${ua(u)})`,
      title: (C == null ? void 0 : C.tooltip) ?? ""
    });
  }
  const d = (t == null ? void 0 : t.edge) ?? null, m = Array.isArray((v = t == null ? void 0 : t.roll) == null ? void 0 : v.failureDiceRefs) ? t.roll.failureDiceRefs : [], f = !!((M = d == null ? void 0 : d.availableActions) != null && M.canPostRerollFailures) && !r, p = Array.isArray((N = d == null ? void 0 : d.allowed) == null ? void 0 : N.postPools) ? d.allowed.postPools : [];
  if (d != null && d.domain && (e.edge = {
    domain: d.domain,
    earned: ((P = t == null ? void 0 : t.outcomeModel) == null ? void 0 : P.edgeEarned) ?? null,
    preSpent: Number(((U = d == null ? void 0 : d.pre) == null ? void 0 : U.spent) ?? 0),
    postSpent: Number(((K = d == null ? void 0 : d.post) == null ? void 0 : K.spent) ?? 0),
    canPost: f && m.length > 0 && p.length > 0,
    failureCount: m.length,
    postPools: p
  }, e.metaRows.push({
    text: `Edge: ${d.domain} | pre ${e.edge.preSpent} | post ${e.edge.postSpent}`,
    title: ""
  })), (Y = e.edge) != null && Y.canPost) {
    e.footerRows.push({
      text: `Post-spend: Reroll ${e.edge.failureCount} failure${e.edge.failureCount === 1 ? "" : "s"}`
    });
    for (const C of e.edge.postPools)
      e.actions.push({
        action: "edgePostReroll",
        label: `Spend ${C}`,
        dataset: { "pool-key": C },
        cssClass: "mwd-edge-post"
      });
  }
  const h = String((s == null ? void 0 : s.overallOutcome) ?? "").trim();
  if (e.outcomeText = n.length > 1 ? `ATTACK ${s.hits} HIT / ${s.grazes} GRAZE / ${s.misses} MISS` : h === "hit" ? "HIT!" : h === "graze" ? "GRAZE!" : "MISS!", e.metaRows.push({
    text: `Targets: ${n.length || 0}`,
    title: ""
  }), o && (e.targetRows = n.map((C, V) => {
    var Pt, Nt, Rt, It, Dt, Ot, ft, _t;
    const ne = ((Pt = t == null ? void 0 : t.areaEffectPreviewState) == null ? void 0 : Pt[C == null ? void 0 : C.previewKey]) ?? {}, ae = ((Nt = C == null ? void 0 : C.damage) == null ? void 0 : Nt.exposure) ?? (C == null ? void 0 : C.exposure) ?? null, ke = String((ae == null ? void 0 : ae.initialLabel) ?? "NONE").trim() || "NONE", Ke = String((ae == null ? void 0 : ae.finalLabel) ?? ke).trim() || ke, St = Number(((Rt = C == null ? void 0 : C.damage) == null ? void 0 : Rt.incoming) ?? 0), At = Number(((It = C == null ? void 0 : C.damage) == null ? void 0 : It.scaledIncoming) ?? St), dt = (C == null ? void 0 : C.queuedMutation) ?? null, Tt = !!(dt != null && dt.applied || (Dt = C == null ? void 0 : C.damageResult) != null && Dt.applied), je = (ne == null ? void 0 : ne.reactionPreview) ?? null, mt = [];
    if (!Tt && ke !== "NONE" && ((Ot = C == null ? void 0 : C.damageResult) != null && Ot.ok) && !((ft = C == null ? void 0 : C.damageResult) != null && ft.skipped) && mt.push({
      action: "toggleEvade",
      label: C != null && C.evadeActive ? "Clear Evade" : "Use Reaction",
      dataset: { "preview-key": C.previewKey },
      cssClass: `mwd-target-row__action ${C != null && C.evadeActive ? "is-active" : ""}`
    }), C != null && C.evadeActive && (je != null && je.canSpendEdge) && Array.isArray(je.edgePools))
      for (const k of je.edgePools)
        mt.push({
          action: "toggleEvadeEdge",
          label: (ne == null ? void 0 : ne.edgePoolKey) === k.key ? `Edge: ${k.key}` : `Use ${k.key}`,
          dataset: {
            "preview-key": C.previewKey,
            "pool-key": k.key
          },
          cssClass: `mwd-target-row__action ${(ne == null ? void 0 : ne.edgePoolKey) === k.key ? "is-active" : ""}`
        });
    return dt && !Tt && mt.push({
      action: "applyAttackDamage",
      label: "Apply Damage",
      dataset: { "result-index": String(V) },
      cssClass: "mwd-target-row__action mwd-apply-attack-damage"
    }), {
      targetName: ((_t = C == null ? void 0 : C.target) == null ? void 0 : _t.name) ?? "Target",
      applied: Tt,
      outcomeLabel: String((C == null ? void 0 : C.outcome) ?? "miss").toUpperCase(),
      exposureLabel: ke === Ke ? ke : `${ke} -> ${Ke}`,
      damageLabel: St === At ? String(At) : `${St} -> ${At}`,
      reactionHint: C != null && C.evadeActive ? ne != null && ne.edgePoolKey ? "Evade active. Reaction Burn canceled by Edge." : (je == null ? void 0 : je.burnDelta) > 0 ? `Evade active. This reaction adds +${je.burnDelta} Burn.` : "Evade active." : "",
      rowActions: mt
    };
  })), n.length > 1 && l.length > 1 && e.actions.push({
    action: "applyAllAttackDamage",
    label: `Apply All Damage (${l.length})`,
    cssClass: "mwd-apply-all-attack-damage"
  }), !o)
    for (const C of n) {
      const V = Number(((j = (W = C == null ? void 0 : C.cq) == null ? void 0 : W.ar) == null ? void 0 : j.total) ?? 0), ne = Number(((B = (L = C == null ? void 0 : C.cq) == null ? void 0 : L.dr) == null ? void 0 : B.total) ?? 0);
      e.metaRows.push({
        text: `${((G = C == null ? void 0 : C.target) == null ? void 0 : G.name) ?? "Target"}: ${String((C == null ? void 0 : C.outcome) ?? "miss").toUpperCase()} | CQ ${ua(((X = C == null ? void 0 : C.cq) == null ? void 0 : X.value) ?? 0)} (AR ${V} - DR ${ne}) | Net ${Number((C == null ? void 0 : C.netHits) ?? 0)}`,
        title: By(C == null ? void 0 : C.cq)
      });
    }
  if (!o)
    for (const [C, V] of n.entries()) {
      const ne = (V == null ? void 0 : V.damage) ?? null;
      ne && (V == null ? void 0 : V.outcome) !== "miss" && e.footerRows.push({
        text: `${((oe = V == null ? void 0 : V.target) == null ? void 0 : oe.name) ?? "Target"}: ${ne.damageTypeLabel} ${ua(ne.effectiveWeaponDamage)} weapon${ne.netHits ? ` + ${ne.netHits} net` : ""}`,
        title: ""
      });
      const ae = (V == null ? void 0 : V.damageResult) ?? null;
      if (ae != null && ae.ok && !(ae != null && ae.skipped)) {
        const ke = (V == null ? void 0 : V.queuedMutation) ?? (ae == null ? void 0 : ae.queuedMutation) ?? null, Ke = !!(ke != null && ke.applied || ae != null && ae.applied);
        ke && !Ke && e.actions.push({
          action: "applyAttackDamage",
          label: `Apply Damage: ${ae.actorName ?? ((Se = V == null ? void 0 : V.target) == null ? void 0 : Se.name) ?? "Target"}`,
          dataset: { "result-index": String(C) },
          cssClass: "mwd-apply-attack-damage"
        });
      } else ae != null && ae.reason && e.footerRows.push({
        text: `${((me = V == null ? void 0 : V.target) == null ? void 0 : me.name) ?? "Target"}: ${ae.reason}`,
        title: ""
      });
    }
}
function By(a = {}) {
  var i, n;
  const e = Array.isArray((i = a == null ? void 0 : a.ar) == null ? void 0 : i.parts) ? a.ar.parts : [], t = Array.isArray((n = a == null ? void 0 : a.dr) == null ? void 0 : n.parts) ? a.dr.parts : [];
  return [
    ...e.map((s) => `AR - ${s.label}: ${ua(s.value)}`),
    ...t.map((s) => `DR - ${s.label}: ${ua(s.value)}`)
  ].join(`
`);
}
function zy(a = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of a)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
function ua(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function Fy(a, e) {
  var c;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, n = (i == null ? void 0 : i.net) ?? null;
  if (!n) return;
  e.net = n;
  const s = Number((n == null ? void 0 : n.converted) ?? 0), r = Number((n == null ? void 0 : n.value) ?? 0), l = Number((n == null ? void 0 : n.rate) ?? 4);
  e.metaRows.push({
    text: `Net: ${r} • Converted: ${s} • Rate: ${l}`,
    title: ""
  });
  const o = ((c = i == null ? void 0 : i.edgeEarned) == null ? void 0 : c.amount) > 0 ? i.edgeEarned : null;
  o && e.footerRows.push({
    text: `Edge Earned: +${o.amount}${o.pool ? ` (${o.pool})` : ""}`,
    title: o.reason ?? ""
  });
}
function Uy(a, e) {
  var o, c, u, d;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, n = Number(((o = i == null ? void 0 : i.attacker) == null ? void 0 : o.successes) ?? (i == null ? void 0 : i.attackerHits) ?? NaN), s = Number(((c = i == null ? void 0 : i.defender) == null ? void 0 : c.successes) ?? (i == null ? void 0 : i.defenderHits) ?? NaN), r = Number((i == null ? void 0 : i.netHits) ?? (i == null ? void 0 : i.net) ?? NaN);
  Number.isFinite(n) && Number.isFinite(s) && e.metaRows.push({ text: `Opposed: Att ${n} vs Def ${s} • Net ${Number.isFinite(r) ? r : n - s}` }), (u = t == null ? void 0 : t.incoming) != null && u.label && (e.incoming = { label: t.incoming.label, value: t.incoming.value ?? "" }, e.footerRows.push({ text: `Incoming: ${e.incoming.label} ${e.incoming.value}` }));
  const l = ((d = i == null ? void 0 : i.edgeEarned) == null ? void 0 : d.amount) > 0 ? i.edgeEarned : null;
  l && e.footerRows.push({ text: `Edge Earned: +${l.amount}${l.pool ? ` (${l.pool})` : ""}` });
}
function Hy(a, e) {
  var c;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, n = (i == null ? void 0 : i.extended) ?? null;
  if (!n) return;
  e.extended = n;
  const s = Number((n == null ? void 0 : n.progress) ?? 0), r = Number((n == null ? void 0 : n.target) ?? 0), l = Number((n == null ? void 0 : n.remaining) ?? Math.max(0, r - s));
  e.metaRows.push({
    text: `Extended: ${s}/${r} (Remaining ${l})`,
    title: ""
  }), n != null && n.completed && e.footerRows.push({ text: `Completed in ${Number((n == null ? void 0 : n.rounds) ?? (n == null ? void 0 : n.attempts) ?? 0) || "?"} attempts.` });
  const o = ((c = i == null ? void 0 : i.edgeEarned) == null ? void 0 : c.amount) > 0 ? i.edgeEarned : null;
  o && e.footerRows.push({ text: `Edge Earned: +${o.amount}${o.pool ? ` (${o.pool})` : ""}` });
}
const Wy = {
  skill: xy,
  attack: $y,
  net: Fy,
  opposed: Uy,
  extended: Hy
  // defense: enhanceDefense,
  // edge: enhanceEdge,
};
async function cn({ resolved: a } = {}) {
  const e = a ?? {}, t = jy(e), i = Wy[t.intent];
  return typeof i == "function" && i(e, t), await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-roll-card",
    t
  );
}
function jy(a) {
  var f, p, h, g, y, b, S, v, M, N, P, U, K, Y, W, j, L;
  const e = a ?? {}, t = Number(((f = e == null ? void 0 : e.roll) == null ? void 0 : f.target) ?? 5), i = Number(((p = e == null ? void 0 : e.dn) == null ? void 0 : p.total) ?? ((g = (h = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : h.dn) == null ? void 0 : g.total) ?? ((b = (y = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : y.difficulty) == null ? void 0 : b.dn) ?? 0), n = Number(((S = e == null ? void 0 : e.roll) == null ? void 0 : S.pool) ?? 0), s = Number(((v = e == null ? void 0 : e.outcome) == null ? void 0 : v.hits) ?? 0), r = (e == null ? void 0 : e.outcomeModel) ?? {}, l = typeof r.passed == "boolean" ? r.passed : s >= i, o = Number.isFinite(Number(r.margin)) ? Number(r.margin) : s - i, c = r.tier ?? null, u = Array.isArray(e == null ? void 0 : e.breakdownRows) ? e.breakdownRows.map((B) => `${B.label}: ${B.value}`).join(`
`) : "", d = {
    header: { left: (e == null ? void 0 : e.title) ?? "Roll", right: (e == null ? void 0 : e.subtitle) ?? "" },
    formula: String((e == null ? void 0 : e.formula) ?? "").trim(),
    intent: (e == null ? void 0 : e.intent) ?? "unknown",
    domains: Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [],
    tn: t,
    dn: i,
    pool: n,
    hits: s,
    passed: l,
    margin: o,
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
  }), (N = m == null ? void 0 : m.weapon) != null && N.name) {
    const B = ((P = m == null ? void 0 : m.weapon) == null ? void 0 : P.type) === "personalWeapon" || (U = m == null ? void 0 : m.weapon) != null && U.isSynthetic ? Ss((m == null ? void 0 : m.rangeBand) ?? "") : String((m == null ? void 0 : m.rangeBand) ?? "").trim(), G = String(((K = m == null ? void 0 : m.weapon) == null ? void 0 : K.damageTypeLabel) ?? ((Y = m == null ? void 0 : m.weapon) == null ? void 0 : Y.damageType) ?? "").trim(), X = String(((W = m == null ? void 0 : m.payload) == null ? void 0 : W.label) ?? ((j = m == null ? void 0 : m.weapon) == null ? void 0 : j.payloadLabel) ?? "").trim();
    d.metaRows.push({
      text: `Weapon: ${m.weapon.name}${B ? ` • Range: ${B}` : ""}${G ? ` • Type: ${G}` : ""}${X ? ` • Payload: ${X}` : ""}`,
      title: ""
    }), (L = m == null ? void 0 : m.sourceState) != null && L.isTracked && d.footerRows.push({
      text: `Source: ${Number(m.sourceState.current ?? 0)}/${Number(m.sourceState.max ?? 0)}`,
      title: ""
    });
  }
  return d;
}
function Gy() {
  Hooks.on("renderChatMessageHTML", (a, e) => {
    e.addEventListener("click", (t) => {
      const i = t.target.closest("[data-mwd-action]");
      if (!i) return;
      const n = String(i.dataset.mwdAction || "").trim();
      n && (n === "edgePostReroll" && cb(t, a), n === "toggleEvade" && ib(t, a), n === "toggleEvadeEdge" && ab(t, a), n === "toggleHazardEvade" && sb(t, a), n === "toggleHazardEvadeEdge" && rb(t, a), n === "applyHazardTick" && ob(t, a), n === "applyAttackDamage" && eb(t, a), n === "applyAllAttackDamage" && nb(t, a));
    });
  });
}
function qy(a = {}) {
  var t;
  return (Array.isArray((t = a == null ? void 0 : a.attackResult) == null ? void 0 : t.results) ? a.attackResult.results : []).some((i) => {
    var n;
    return !!((n = i == null ? void 0 : i.queuedMutation) != null && n.applied);
  });
}
function Ky(a) {
  return a === A.monitors.physical ? "Physical" : a === A.monitors.fatigue ? "Fatigue" : String(a ?? "").trim() || "Track";
}
function Vy(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return e === "penetrating" ? "is-penetrating" : e === "energy" ? "is-energy" : e === "thermal" ? "is-thermal" : e === "electrical" ? "is-electrical" : "is-concussive";
}
function Yy(a) {
  const e = Math.max(0, Number(a ?? 0) || 0);
  return e <= 0 ? { key: "is-none", label: "No Penetration" } : e <= 2 ? { key: "is-light", label: "Light Damage" } : e <= 4 ? { key: "is-medium", label: "Moderate Damage" } : e <= 7 ? { key: "is-heavy", label: "Heavy Damage" } : { key: "is-critical", label: "Critical Damage" };
}
function Qy({ actor: a = null, token: e = null } = {}) {
  var s;
  const t = (e == null ? void 0 : e.document) ?? e ?? null, i = String(((s = t == null ? void 0 : t.texture) == null ? void 0 : s.src) ?? "").trim(), n = String((a == null ? void 0 : a.img) ?? "").trim();
  return i || n || "icons/svg/mystery-man.svg";
}
function Jy(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
function Xy({ summary: a = {}, actor: e = null, token: t = null } = {}) {
  const i = String((a == null ? void 0 : a.damageType) ?? "").trim(), n = qt(i || "concussive") || "Damage", s = Ky(a == null ? void 0 : a.track), r = Math.max(0, Number((a == null ? void 0 : a.finalDamage) ?? (a == null ? void 0 : a.appliedDelta) ?? 0) || 0), l = Yy(r), o = r === 1 ? "1 point" : `${r} points`, c = String((a == null ? void 0 : a.actorName) ?? (e == null ? void 0 : e.name) ?? "Target").trim() || "Target", u = [];
  return a != null && a.beforeLabel && (a != null && a.afterLabel) && u.push({
    label: "Monitor",
    value: `${a.beforeLabel} -> ${a.afterLabel}`
  }), u.push({
    label: "Final Damage",
    value: o
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
    classes: ["mwd-damage-card", Vy(i), l.key].join(" "),
    header: {
      left: "Damage Applied",
      right: s
    },
    target: {
      name: c,
      image: Qy({ actor: e, token: t })
    },
    damageTypeLabel: n,
    severityLabel: l.label,
    impactValue: r,
    impactText: r > 0 ? `${n} damage applied to ${s}.` : `${n} damage did not penetrate.`,
    rows: u
  };
}
async function Lo({ summary: a = {}, actor: e = null, token: t = null } = {}) {
  const i = await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-damage-application-card",
    Xy({ summary: a, actor: e, token: t })
  ), n = Jy({
    speaker: ChatMessage.getSpeaker({ actor: e, token: t }),
    content: i
  });
  return ChatMessage.create(n);
}
function Zy(a = {}) {
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
async function ud(a = {}, e = null) {
  var s, r, l;
  const t = Zy(a), i = Number(((s = a == null ? void 0 : a.outcome) == null ? void 0 : s.hits) ?? 0) || 0, n = ((r = a == null ? void 0 : a.outcomeModel) == null ? void 0 : r.edgeEarned) ?? null;
  return a.outcomeModel = cd(t, { successes: i, raw: (l = a == null ? void 0 : a.roll) == null ? void 0 : l.json }, null), a.outcomeModel.edgeEarned = n, t.intent === "attack" && e && t.attack && (a.attackResult = await rd({
    attacker: e,
    ctx: t,
    outcomeModel: a.outcomeModel,
    previewState: a.areaEffectPreviewState ?? {},
    existingAttackResult: a.attackResult ?? null
  })), a;
}
async function eb(a, e) {
  var l, o, c, u, d, m, f;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='applyAttackDamage']"), i = Number((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.resultIndex);
  if (!Number.isInteger(i) || i < 0) return;
  const n = foundry.utils.deepClone((c = (o = e == null ? void 0 : e.flags) == null ? void 0 : o.mwd) == null ? void 0 : c.resolved);
  if (!n) return;
  const s = await dd(n, i);
  if (!s.ok) {
    (d = (u = ui.notifications) == null ? void 0 : u.warn) == null || d.call(u, s.reason ?? "Unable to apply attack damage.");
    return;
  }
  if (s.skipped) {
    (f = (m = ui.notifications) == null ? void 0 : m.info) == null || f.call(m, s.reason ?? "That attack damage has already been applied.");
    return;
  }
  const r = await cn({ resolved: n });
  await e.update({
    content: r,
    "flags.mwd.resolved": n
  }), await Lo({
    summary: s.summary,
    actor: s.targetActor,
    token: s.targetToken
  });
}
async function xo(a = {}) {
  var i, n;
  const e = (i = a == null ? void 0 : a.target) != null && i.actorUuid ? await fromUuid(a.target.actorUuid) : null, t = (n = a == null ? void 0 : a.target) != null && n.tokenUuid ? await fromUuid(a.target.tokenUuid) : null;
  return Cs({
    actor: e,
    token: t,
    edgePoolKey: (a == null ? void 0 : a.evadeEdgePoolKey) ?? ""
  });
}
function tb(a = "") {
  var e, t;
  return ((t = (e = game.messages) == null ? void 0 : e.get) == null ? void 0 : t.call(e, String(a ?? "").trim())) ?? null;
}
async function Cs({ actor: a = null, token: e = null, actorUuid: t = "", tokenUuid: i = "", edgePoolKey: n = "" } = {}) {
  const s = a ?? (t ? await fromUuid(t) : null), r = e ?? (i ? await fromUuid(i) : null);
  return s ? {
    ...x.getReactionSpendPreview(s, { token: r, edgePoolKey: n }) ?? {},
    actor: s,
    token: r
  } : null;
}
async function $o(a, e) {
  var s, r;
  const t = foundry.utils.deepClone((r = (s = a == null ? void 0 : a.flags) == null ? void 0 : s.mwd) == null ? void 0 : r.resolved);
  if (!t) return;
  await e(t);
  const i = await fromUuid(t.actorUuid);
  if (!i) return;
  await ud(t, i);
  const n = await cn({ resolved: t });
  return await a.update({
    content: n,
    "flags.mwd.resolved": t
  }), t;
}
async function Bo(a, e, { active: t = !1, edgePoolKey: i = "" } = {}) {
  var r, l, o, c, u, d, m, f;
  const n = (r = e == null ? void 0 : e.target) != null && r.actorUuid ? await fromUuid(e.target.actorUuid) : null, s = (l = e == null ? void 0 : e.target) != null && l.tokenUuid ? await fromUuid(e.target.tokenUuid) : null;
  if (n) {
    if (!t) {
      const p = x.getSnapshot(n, { token: s }), h = (p == null ? void 0 : p.pendingReaction) ?? null;
      (h == null ? void 0 : h.sourceKind) === "attack" && (h == null ? void 0 : h.messageId) === a.id && (h == null ? void 0 : h.sourceId) === (e == null ? void 0 : e.previewKey) && await x.clearPendingReaction(n, { token: s });
      return;
    }
    await x.setPendingReaction(n, {
      token: s,
      pendingReaction: {
        type: "evade",
        sourceKind: "attack",
        sourceId: (e == null ? void 0 : e.previewKey) ?? null,
        messageId: a.id,
        resultIndex: (e == null ? void 0 : e.resultIndex) ?? null,
        exposureBefore: ((c = (o = e == null ? void 0 : e.damage) == null ? void 0 : o.exposure) == null ? void 0 : c.initialTier) ?? ((u = e == null ? void 0 : e.exposure) == null ? void 0 : u.initialTier) ?? "none",
        exposureAfterPreview: ((m = (d = e == null ? void 0 : e.damage) == null ? void 0 : d.exposure) == null ? void 0 : m.finalTier) ?? ((f = e == null ? void 0 : e.exposure) == null ? void 0 : f.initialTier) ?? "none",
        edgePoolKey: i,
        allowCurrentTurn: !1
      }
    });
  }
}
async function ib(a, e) {
  var r, l;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleEvade']"), i = String(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.previewKey) ?? "").trim();
  if (!i) return;
  const n = await $o(e, async (o) => {
    var f;
    if (o.areaEffectPreviewState ?? (o.areaEffectPreviewState = {}), !!(o.areaEffectPreviewState[i] ?? {}).evadeActive) {
      delete o.areaEffectPreviewState[i];
      return;
    }
    o.areaEffectPreviewState[i] = {
      evadeActive: !0,
      edgePoolKey: null
    };
    const d = (Array.isArray((f = o == null ? void 0 : o.attackResult) == null ? void 0 : f.results) ? o.attackResult.results : []).find((p) => (p == null ? void 0 : p.previewKey) === i) ?? null, m = d ? await xo({ ...d, evadeEdgePoolKey: null }) : null;
    m && (o.areaEffectPreviewState[i].reactionPreview = {
      burnDelta: Number(m.burnDelta ?? 0),
      canSpendEdge: !!m.canSpendEdge,
      edgePools: (m.edgePools ?? []).map((p) => ({
        key: p.key,
        label: p.label,
        value: p.value
      }))
    });
  }), s = (Array.isArray((l = n == null ? void 0 : n.attackResult) == null ? void 0 : l.results) ? n.attackResult.results : []).find((o) => (o == null ? void 0 : o.previewKey) === i) ?? null;
  n && s && await Bo(e, s, {
    active: !!(s != null && s.evadeActive),
    edgePoolKey: String((s == null ? void 0 : s.evadeEdgePoolKey) ?? "").trim()
  });
}
async function ab(a, e) {
  var l, o, c;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleEvadeEdge']"), i = String(((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.previewKey) ?? "").trim(), n = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.poolKey) ?? "").trim();
  if (!i) return;
  const s = await $o(e, async (u) => {
    var h;
    u.areaEffectPreviewState ?? (u.areaEffectPreviewState = {});
    const d = u.areaEffectPreviewState[i] ?? {}, m = d.edgePoolKey === n ? null : n;
    u.areaEffectPreviewState[i] = {
      ...d,
      evadeActive: !0,
      edgePoolKey: m
    };
    const f = (Array.isArray((h = u == null ? void 0 : u.attackResult) == null ? void 0 : h.results) ? u.attackResult.results : []).find((g) => (g == null ? void 0 : g.previewKey) === i) ?? null, p = f ? await xo({ ...f, evadeEdgePoolKey: m }) : null;
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
  s && r && await Bo(e, r, {
    active: !!(r != null && r.evadeActive),
    edgePoolKey: String((r == null ? void 0 : r.evadeEdgePoolKey) ?? "").trim()
  });
}
async function nb(a, e) {
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
  const r = [], l = [];
  for (const b of n) {
    const S = await dd(t, b);
    S.ok && S.applied ? (s += 1, l.push(S)) : S.ok || r.push(S.reason ?? `Target ${b + 1} failed.`);
  }
  if (s <= 0) {
    (h = (p = ui.notifications) == null ? void 0 : p.warn) == null || h.call(p, r[0] ?? "Unable to apply queued attack damage.");
    return;
  }
  const o = await cn({ resolved: t });
  await e.update({
    content: o,
    "flags.mwd.resolved": t
  });
  for (const b of l)
    await Lo({
      summary: b.summary,
      actor: b.targetActor,
      token: b.targetToken
    });
  r.length && ((y = (g = ui.notifications) == null ? void 0 : g.warn) == null || y.call(g, `Applied ${s} queued damage result${s === 1 ? "" : "s"}; ${r.length} failed.`));
}
async function dd(a, e) {
  var o, c, u, d, m, f;
  const t = ((c = (o = a == null ? void 0 : a.attackResult) == null ? void 0 : o.results) == null ? void 0 : c[e]) ?? null, i = (t == null ? void 0 : t.queuedMutation) ?? null;
  if (!i)
    return { ok: !1, reason: "No queued attack damage to apply." };
  if (i.applied)
    return { ok: !0, skipped: !0, reason: "That attack damage has already been applied." };
  let n = null, s = null, r = null;
  try {
    if (s = (u = i.target) != null && u.actorUuid ? await fromUuid(i.target.actorUuid) : null, r = (d = i.target) != null && d.tokenUuid ? await fromUuid(i.target.tokenUuid) : null, t != null && t.evadeActive && s) {
      const p = await x.commitReactionSpend(s, {
        token: r,
        actionId: "evade",
        actionLabel: "Evade",
        actionCategory: "reaction",
        logLabel: `Evade: ${((m = i.target) == null ? void 0 : m.name) ?? ((f = t == null ? void 0 : t.target) == null ? void 0 : f.name) ?? "Target"}`,
        edgePoolKey: String((t == null ? void 0 : t.evadeEdgePoolKey) ?? "").trim()
      });
      if (!(p != null && p.ok))
        return { ok: !1, reason: (p == null ? void 0 : p.reason) ?? "Unable to spend the Evade reaction." };
      await x.clearPendingReaction(s, { token: r });
    }
    n = await yt.apply({
      actor: s,
      token: r,
      payload: i.payload ?? {},
      options: {
        actorId: (s == null ? void 0 : s.id) ?? "",
        logToChat: !1
      }
    });
  } catch (p) {
    return console.warn("MWD | Unable to apply queued attack damage", p), { ok: !1, reason: "Unable to apply attack damage to that target." };
  }
  const l = za(
    n,
    (t == null ? void 0 : t.target) ?? i.target ?? {},
    (t == null ? void 0 : t.damage) ?? {},
    { queued: !1, applied: !!(n != null && n.ok) }
  );
  return n != null && n.ok ? (i.applied = !0, i.appliedResult = l, t.queuedMutation = i, t.damageResult = l, t.evadeApplied = !!t.evadeActive, a.edge ?? (a.edge = {}), a.edge.availableActions = {
    ...a.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, {
    ok: !0,
    applied: !0,
    summary: l,
    targetActor: s,
    targetToken: r
  }) : { ok: !1, reason: l.reason ?? "Unable to apply attack damage." };
}
async function md(a, e) {
  const t = e != null && e.actorUuid ? await fromUuid(e.actorUuid) : null, i = e != null && e.tokenUuid ? await fromUuid(e.tokenUuid) : null, n = await Nu(e, { actor: t, token: i });
  return await a.update({
    content: n,
    "flags.mwd.hazardCard": e
  }), e;
}
async function zo(a, e) {
  var i, n;
  const t = ko(foundry.utils.deepClone(((n = (i = a == null ? void 0 : a.flags) == null ? void 0 : i.mwd) == null ? void 0 : n.hazardCard) ?? {}));
  return t != null && t.actorUuid ? (await e(t), await md(a, t), t) : null;
}
async function Fo(a, e, { active: t = !1, edgePoolKey: i = "" } = {}) {
  var r, l, o;
  const n = e != null && e.actorUuid ? await fromUuid(e.actorUuid) : null, s = e != null && e.tokenUuid ? await fromUuid(e.tokenUuid) : null;
  if (n) {
    if (!t) {
      const c = x.getSnapshot(n, { token: s }), u = (c == null ? void 0 : c.pendingReaction) ?? null;
      (u == null ? void 0 : u.sourceKind) === "hazard" && (u == null ? void 0 : u.messageId) === a.id && (u == null ? void 0 : u.sourceId) === (e == null ? void 0 : e.regionId) && await x.clearPendingReaction(n, { token: s });
      return;
    }
    await x.setPendingReaction(n, {
      token: s,
      pendingReaction: {
        type: "evade",
        sourceKind: "hazard",
        sourceId: (e == null ? void 0 : e.regionId) ?? null,
        messageId: a.id,
        exposureBefore: ((r = e == null ? void 0 : e.exposure) == null ? void 0 : r.initialTier) ?? "none",
        exposureAfterPreview: ((l = e == null ? void 0 : e.preview) == null ? void 0 : l.finalTier) ?? ((o = e == null ? void 0 : e.exposure) == null ? void 0 : o.initialTier) ?? "none",
        edgePoolKey: i,
        allowCurrentTurn: !0
      }
    });
  }
}
async function sb(a, e) {
  var i, n;
  a.preventDefault();
  const t = await zo(e, async (s) => {
    var o, c, u;
    const r = !((o = s == null ? void 0 : s.preview) != null && o.evadeActive), l = oo(Di({
      tier: ((c = s == null ? void 0 : s.exposure) == null ? void 0 : c.initialTier) ?? "none"
    }), {
      active: r,
      locked: !!((u = s == null ? void 0 : s.exposure) != null && u.evadeLocked)
    });
    if (s.preview ?? (s.preview = {}), s.preview.evadeActive = r, s.preview.edgePoolKey = null, s.preview.finalTier = l.finalTier, s.damageAfter = Gi(s.baseDamage ?? 0, l.finalTier), r) {
      const d = await Cs({
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
  t && await Fo(e, t, {
    active: !!((i = t == null ? void 0 : t.preview) != null && i.evadeActive),
    edgePoolKey: String(((n = t == null ? void 0 : t.preview) == null ? void 0 : n.edgePoolKey) ?? "").trim()
  });
}
async function rb(a, e) {
  var s, r, l;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleHazardEvadeEdge']"), i = String(((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.poolKey) ?? "").trim(), n = await zo(e, async (o) => {
    o.preview ?? (o.preview = {}), o.preview.evadeActive = !0, o.preview.edgePoolKey = o.preview.edgePoolKey === i ? null : i;
    const c = await Cs({
      actorUuid: o.actorUuid,
      tokenUuid: o.tokenUuid,
      edgePoolKey: o.preview.edgePoolKey ?? ""
    });
    o.preview.reactionPreview = c ? {
      burnDelta: Number(c.burnDelta ?? 0),
      canSpendEdge: !!c.canSpendEdge,
      edgePools: (c.edgePools ?? []).map((u) => ({
        key: u.key,
        label: u.label,
        value: u.value
      }))
    } : {};
  });
  n && await Fo(e, n, {
    active: !!((r = n == null ? void 0 : n.preview) != null && r.evadeActive),
    edgePoolKey: String(((l = n == null ? void 0 : n.preview) == null ? void 0 : l.edgePoolKey) ?? "").trim()
  });
}
async function ob(a, e) {
  var u, d, m, f, p, h, g, y, b, S, v, M, N, P, U, K, Y, W, j, L, B;
  a.preventDefault();
  const t = ko(foundry.utils.deepClone(((d = (u = e == null ? void 0 : e.flags) == null ? void 0 : u.mwd) == null ? void 0 : d.hazardCard) ?? {}));
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
    const G = await x.commitReactionSpend(i, {
      token: n,
      actionId: "evade",
      actionLabel: "Evade",
      actionCategory: "reaction",
      logLabel: `Evade: ${t.regionName}`,
      edgePoolKey: String(((y = t.preview) == null ? void 0 : y.edgePoolKey) ?? "").trim(),
      allowCurrentTurn: !0
    });
    if (!(G != null && G.ok)) {
      (S = (b = ui.notifications) == null ? void 0 : b.warn) == null || S.call(b, (G == null ? void 0 : G.reason) ?? "Unable to spend the Evade reaction.");
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
    notes: `Hazard exposure ${t.exposure.initialLabel}${(v = t.preview) != null && v.evadeActive ? ` -> ${String(t.preview.finalTier ?? t.exposure.initialTier).toUpperCase()}` : ""}`.trim()
  }, r = await yt.apply({
    actor: i,
    token: n,
    payload: s,
    options: {
      actorId: i.id,
      logToChat: !1
    }
  });
  if (!(r != null && r.ok)) {
    (N = (M = ui.notifications) == null ? void 0 : M.warn) == null || N.call(M, (r == null ? void 0 : r.reason) ?? "Unable to apply hazard damage.");
    return;
  }
  const l = x.getSnapshot(i, { token: n }), o = ((P = l == null ? void 0 : l.hazards) == null ? void 0 : P[t.regionId]) ?? {}, c = De(t.nextTier, t.exposure.finalTier);
  await x.setHazardState(i, {
    token: n,
    regionId: t.regionId,
    hazardState: {
      ...o,
      tier: c,
      turnsExposed: Math.max(Number((o == null ? void 0 : o.turnsExposed) ?? 0), Number(t.turnsExposed ?? 0)) + 1,
      lastProcessedRound: Number(((U = l == null ? void 0 : l.combat) == null ? void 0 : U.round) ?? 0) || 0,
      evadeLocked: !!(o != null && o.evadeLocked) || !!(((K = t.exposure) == null ? void 0 : K.initialTier) === "full" && ((Y = t.preview) == null ? void 0 : Y.finalTier) === "major" && ((W = t.preview) != null && W.evadeActive))
    }
  }), c === "full" && Number((t == null ? void 0 : t.onFullBurnDelta) ?? 0) > 0 && await i.update({
    "system.burn.value": Math.max(0, Number(((L = (j = i.system) == null ? void 0 : j.burn) == null ? void 0 : L.value) ?? 0) + Number(t.onFullBurnDelta ?? 0))
  }), await x.clearPendingReaction(i, { token: n }), t.applied = !0, t.applyReason = "Applied", await md(e, t), await Lo({
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
      notes: `Hazard exposure ${t.exposure.initialLabel}${(B = t.preview) != null && B.evadeActive ? ` -> ${String(t.preview.finalTier ?? "").toUpperCase()}` : ""}`
    },
    actor: i,
    token: n
  });
}
async function lb(a, { token: e = null } = {}) {
  var s, r;
  const t = x.getSnapshot(a, { token: e }), i = (t == null ? void 0 : t.pendingReaction) ?? null;
  if (!(i != null && i.messageId))
    return { ok: !1, reason: "Use an area effect or hazard card to trigger Evade." };
  const n = tb(i.messageId);
  if (!n)
    return await x.clearPendingReaction(a, { token: e }), { ok: !1, reason: "The pending Evade card is no longer available." };
  if (i.sourceKind === "attack") {
    const l = String(i.sourceId ?? "").trim();
    if (!l) return { ok: !1, reason: "Pending Evade target is missing." };
    const o = await $o(n, async (u) => {
      var f;
      u.areaEffectPreviewState ?? (u.areaEffectPreviewState = {}), u.areaEffectPreviewState[l] = {
        ...u.areaEffectPreviewState[l] ?? {},
        evadeActive: !0,
        edgePoolKey: i.edgePoolKey ?? null
      };
      const d = (Array.isArray((f = u == null ? void 0 : u.attackResult) == null ? void 0 : f.results) ? u.attackResult.results : []).find((p) => (p == null ? void 0 : p.previewKey) === l) ?? null, m = d ? await xo({ ...d, evadeEdgePoolKey: i.edgePoolKey ?? "" }) : null;
      m && (u.areaEffectPreviewState[l].reactionPreview = {
        burnDelta: Number(m.burnDelta ?? 0),
        canSpendEdge: !!m.canSpendEdge,
        edgePools: (m.edgePools ?? []).map((p) => ({
          key: p.key,
          label: p.label,
          value: p.value
        }))
      });
    }), c = (Array.isArray((s = o == null ? void 0 : o.attackResult) == null ? void 0 : s.results) ? o.attackResult.results : []).find((u) => (u == null ? void 0 : u.previewKey) === l) ?? null;
    return c && await Bo(n, c, {
      active: !0,
      edgePoolKey: String((c == null ? void 0 : c.evadeEdgePoolKey) ?? i.edgePoolKey ?? "").trim()
    }), { ok: !0 };
  }
  if (i.sourceKind === "hazard") {
    const l = await zo(n, async (o) => {
      var d, m;
      const c = oo(Di({
        tier: ((d = o == null ? void 0 : o.exposure) == null ? void 0 : d.initialTier) ?? "none"
      }), {
        active: !0,
        locked: !!((m = o == null ? void 0 : o.exposure) != null && m.evadeLocked)
      });
      o.preview ?? (o.preview = {}), o.preview.evadeActive = !0, o.preview.edgePoolKey = o.preview.edgePoolKey ?? i.edgePoolKey ?? null, o.preview.finalTier = c.finalTier, o.damageAfter = Gi(o.baseDamage ?? 0, c.finalTier);
      const u = await Cs({
        actorUuid: o.actorUuid,
        tokenUuid: o.tokenUuid,
        edgePoolKey: o.preview.edgePoolKey ?? ""
      });
      o.preview.reactionPreview = u ? {
        burnDelta: Number(u.burnDelta ?? 0),
        canSpendEdge: !!u.canSpendEdge,
        edgePools: (u.edgePools ?? []).map((f) => ({
          key: f.key,
          label: f.label,
          value: f.value
        }))
      } : {};
    });
    return l && await Fo(n, l, {
      active: !0,
      edgePoolKey: String(((r = l == null ? void 0 : l.preview) == null ? void 0 : r.edgePoolKey) ?? i.edgePoolKey ?? "").trim()
    }), { ok: !0 };
  }
  return { ok: !1, reason: "That Evade source is not supported." };
}
async function cb(a, e) {
  var p, h, g, y, b, S, v, M, N, P, U, K, Y, W, j, L, B, G, X;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='edgePostReroll']"), i = String(((p = t == null ? void 0 : t.dataset) == null ? void 0 : p.poolKey) ?? "").trim();
  if (!i) return;
  const n = foundry.utils.deepClone((g = (h = e == null ? void 0 : e.flags) == null ? void 0 : h.mwd) == null ? void 0 : g.resolved);
  if (!n) return;
  if (qy(n)) {
    (b = (y = ui.notifications) == null ? void 0 : y.warn) == null || b.call(y, "Post-roll Edge is disabled after attack damage has been applied.");
    return;
  }
  if (Number(((v = (S = n == null ? void 0 : n.edge) == null ? void 0 : S.post) == null ? void 0 : v.spent) ?? 0) === 1) return;
  if (!(Array.isArray((N = (M = n == null ? void 0 : n.edge) == null ? void 0 : M.allowed) == null ? void 0 : N.postPools) ? n.edge.allowed.postPools : []).includes(i)) {
    (U = (P = ui.notifications) == null ? void 0 : P.warn) == null || U.call(P, `Post-spend pool not allowed: ${i}`);
    return;
  }
  const r = Array.isArray((K = n == null ? void 0 : n.roll) == null ? void 0 : K.failureDiceRefs) ? n.roll.failureDiceRefs : [];
  if (r.length <= 0) {
    (W = (Y = ui.notifications) == null ? void 0 : Y.info) == null || W.call(Y, "No failures to reroll.");
    return;
  }
  const l = await fromUuid(n.actorUuid);
  if (!l) {
    (L = (j = ui.notifications) == null ? void 0 : j.warn) == null || L.call(j, "Actor not found for this roll.");
    return;
  }
  await ((B = l.spendEdge) == null ? void 0 : B.call(l, i, 1));
  const o = Number(((G = n == null ? void 0 : n.roll) == null ? void 0 : G.target) ?? 5), u = (X = (await new Roll(`${r.length}d6cs>=${o}`).evaluate()).dice) == null ? void 0 : X[0], d = Array.isArray(u == null ? void 0 : u.results) ? u.results : [], m = d.filter((oe) => oe.success).length;
  n.outcome = n.outcome ?? {}, n.outcome.hits = Number(n.outcome.hits ?? 0) + m, n.edge = n.edge ?? {}, n.edge.post = { poolKey: i, spent: 1 }, n.edge.availableActions = {
    ...n.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, n.roll = n.roll ?? {}, n.roll.diceGroups = Array.isArray(n.roll.diceGroups) ? n.roll.diceGroups : [], n.roll.diceGroups.push({
    id: "post",
    label: "Post Reroll",
    faces: 6,
    termIndex: null,
    dice: d.map((oe, Se) => {
      const me = Number(oe.result), C = !!oe.success;
      return {
        ref: `post:${Se}`,
        face: me,
        isSuccess: C,
        isFailure: !C,
        tooltip: C ? `Post die ${Se + 1}: ${me} (Success vs TN ${o})` : `Post die ${Se + 1}: ${me} (Failure vs TN ${o})`
      };
    })
  }), await ud(n, l);
  const f = await cn({ resolved: n });
  await e.update({
    content: f,
    "flags.mwd.resolved": n,
    "flags.mwd.payload.edge.post": { poolKey: i, spent: 1 }
  });
}
const Uo = `${T}.ownedWeaponAttack`;
let Gl = !1;
function ub(a, e = null) {
  var r, l, o;
  const t = (a == null ? void 0 : a.actor) ?? null, i = {
    intent: "attack",
    weaponId: (a == null ? void 0 : a.id) ?? "",
    payloadId: ((r = a == null ? void 0 : a.system) == null ? void 0 : r.selectedPayloadId) ?? "",
    edge: { pool: "physical.grit", allowed: ["pre", "post"] },
    tags: ["combat", "attack"],
    sourceTokenId: (e == null ? void 0 : e.id) ?? null
  }, n = t ? x.getSnapshot(t, { token: e }) : null, s = !!((o = (l = n == null ? void 0 : n.state) == null ? void 0 : l.actionState) != null && o.aim);
  return s && (i.aim = { active: !0 }), { payload: i, hasAim: s };
}
function db(a, e = null) {
  return e ?? (a == null ? void 0 : a.token) ?? x.getCurrentSceneTokenDocument(a) ?? null;
}
function fd(a) {
  const e = String((a == null ? void 0 : a.uuid) ?? "").trim();
  return e ? {
    type: Uo,
    uuid: e,
    name: String((a == null ? void 0 : a.name) ?? "Weapon").trim() || "Weapon",
    img: (a == null ? void 0 : a.img) ?? "icons/svg/sword.svg"
  } : null;
}
async function Ps({ weapon: a, event: e = null, token: t = null } = {}) {
  var i, n, s, r, l;
  try {
    if (!((i = a == null ? void 0 : a.isPersonalWeapon) != null && i.call(a)))
      throw new Error("Attack requires an owned personal weapon.");
    const o = a.actor ?? null;
    if (!o)
      throw new Error("Attack requires an owned personal weapon.");
    const c = db(o, t), { payload: u, hasAim: d } = ub(a, c), m = ((n = game.mwd) == null ? void 0 : n.roll) ?? ((r = (s = game.system) == null ? void 0 : s.mwd) == null ? void 0 : r.roll);
    if (!(m != null && m.execute))
      throw new Error("MWD roll system not initialized.");
    const f = await m.execute({ actor: o, payload: u, event: e });
    if (f) {
      d && await x.clearAim(o, { token: c });
      const p = x.getSnapshot(o, { token: c });
      if (p != null && p.hasCombatant) {
        const h = await x.spendResource(o, {
          token: c,
          resource: "sa",
          cost: 2,
          actionId: "attack",
          actionLabel: "Attack",
          actionCostLabel: "2 SA",
          actionCategory: "complex"
        });
        h != null && h.ok || (l = ui.notifications) == null || l.warn((h == null ? void 0 : h.reason) ?? "Unable to record attack action.");
      }
    }
    return f;
  } catch (o) {
    return console.error("MWD | Failed to launch weapon attack", o), Ja(o, "Unable to attack with that weapon."), null;
  }
}
async function mb(a, { event: e = null } = {}) {
  var n, s;
  const t = String(a ?? "").trim();
  if (!t)
    return (n = ui.notifications) == null || n.warn("That weapon shortcut is missing its item reference."), null;
  const i = await fromUuid(t);
  return i ? Ps({ weapon: i, event: e }) : ((s = ui.notifications) == null || s.warn("That weapon shortcut could not find its source item."), null);
}
function fb(a) {
  return `(async () => {
  const attacks = game.mwd?.attacks;
  if (!attacks?.attackWeaponByUuid) {
    return ui.notifications?.error("MWD attack shortcuts are not available right now.");
  }
  await attacks.attackWeaponByUuid(${JSON.stringify(String(a ?? "").trim())});
})();`;
}
async function pb(a, e) {
  var r, l, o, c;
  const t = String((a == null ? void 0 : a.uuid) ?? "").trim();
  if (!t) return;
  const i = String((a == null ? void 0 : a.name) ?? "Weapon Attack").trim() || "Weapon Attack", n = fb(t);
  let s = ((l = (r = game.macros) == null ? void 0 : r.find) == null ? void 0 : l.call(
    r,
    (u) => (u == null ? void 0 : u.type) === "script" && (u == null ? void 0 : u.name) === i && (u == null ? void 0 : u.command) === n
  )) ?? null;
  s || (s = await Macro.create({
    name: i,
    type: "script",
    img: (a == null ? void 0 : a.img) ?? "icons/svg/sword.svg",
    command: n
  })), await ((c = (o = game.user) == null ? void 0 : o.assignHotbarMacro) == null ? void 0 : c.call(o, s, e));
}
function pd(a, e, t) {
  return (e == null ? void 0 : e.type) !== Uo ? !0 : (pb(e, t), !1);
}
function hd() {
  Gl || (Gl = !0, Hooks.on("hotbarDrop", pd));
}
const ql = {
  HOTBAR_ATTACK_TYPE: Uo,
  getOwnedWeaponAttackDragData: fd,
  launchOwnedWeaponAttack: Ps,
  attackWeaponByUuid: mb,
  handleWeaponAttackHotbarDrop: pd,
  registerWeaponAttackHotbarHook: hd
};
function tt(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function hb(a) {
  return String(a ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function xn(a, e = 180) {
  const t = hb(a);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function Ti(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function $n(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim(),
    emphasis: e.emphasis ?? ""
  }));
}
function Bn(a = []) {
  return Ti(a).map((e) => ({ label: e }));
}
function zn(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
const gb = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}, yb = {
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
}, bb = {
  ammo: "Ammunition",
  explosive: "Explosive",
  medical: "Medical",
  repair: "Repair",
  fuel: "Fuel / Power Cell",
  utility: "Utility"
};
function Kl(a) {
  const e = Number(a ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function Vl({
  item: a,
  accordionId: e,
  itemType: t,
  defaultSubtitle: i,
  categoryLabels: n = {},
  ratingLabel: s = "Rating",
  typeLabel: r = "",
  isEditable: l = !1,
  isExpanded: o = !1
} = {}) {
  var p, h, g, y, b, S, v;
  const c = Math.max(0, Math.trunc(tt(((p = a == null ? void 0 : a.system) == null ? void 0 : p.quantity) ?? 1, 1))), u = Math.max(0, Math.trunc(tt(((h = a == null ? void 0 : a.system) == null ? void 0 : h.rating) ?? 0, 0))), d = Ti(((g = a == null ? void 0 : a.system) == null ? void 0 : g.tags) ?? []), m = String(((y = a == null ? void 0 : a.system) == null ? void 0 : y.category) ?? "").trim(), f = n[m] ?? m;
  return {
    id: a.id,
    itemType: t,
    isGear: t === "gear",
    isConsumable: t === "consumable",
    accordionId: e,
    isExpanded: o,
    name: a.name,
    img: a.img,
    subtitle: f || i,
    summaryStats: $n([
      { label: "Qty", value: c, emphasis: "strong" },
      { label: s, value: u }
    ]),
    detailTags: Bn([
      r,
      ...d,
      (b = a == null ? void 0 : a.system) != null && b.inactive ? "Inactive" : ""
    ]),
    detailRows: zn([
      { label: "Quantity", value: c },
      { label: s, value: u },
      { label: "Source", value: ((S = a == null ? void 0 : a.system) == null ? void 0 : S.sourceReference) ?? "" },
      { label: "Category", value: f },
      { label: "Tags", value: d.join(", ") }
    ]),
    detailText: xn((v = a == null ? void 0 : a.system) == null ? void 0 : v.description),
    quantity: c,
    canAdjustQuantity: l
  };
}
function Sb({ defenseBonus: a = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(a ?? 0) || 0;
  i !== 0 && t.push(`Defense ${Kl(i)}`);
  for (const [n, s] of Object.entries(gb)) {
    const r = Number((e == null ? void 0 : e[n]) ?? 0) || 0;
    r !== 0 && t.push(`${s} ${Kl(r)}`);
  }
  return t.join(" | ");
}
function Ab(a = {}, e = ["close", "near", "far", "extreme"]) {
  return e.map((t) => {
    const i = tt(a == null ? void 0 : a[t], 0);
    return `${t.charAt(0).toUpperCase() + t.slice(1)} ${i}`;
  }).join(" | ");
}
function Tb(a = {}) {
  return ["close", "near", "far", "extreme"].map((e) => `${e.charAt(0).toUpperCase()}${tt(a == null ? void 0 : a[e], 0)}`).join(" ");
}
function wb(a = "") {
  const e = String(a ?? "").trim().toLowerCase();
  return e ? e.charAt(0).toUpperCase() + e.slice(1) : "";
}
function st(a) {
  return String(a ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function Yl({ title: a, label: e, options: t = [], confirmLabel: i = "Select" } = {}) {
  const n = Array.isArray(t) ? t.filter((r) => r == null ? void 0 : r.value) : [];
  if (!n.length) return "";
  if (n.length === 1) return String(n[0].value ?? "").trim();
  const s = `<form class="mwd-quick-select"><div class="mwd-field"><label>${st(e)}</label><select name="selection">${n.map((r) => `<option value="${st(r.value)}">${st(r.label ?? r.value)}</option>`).join("")}</select></div></form>`;
  return await Dialog.prompt({
    title: a,
    content: s,
    label: i,
    callback: (r) => {
      var l;
      return String(r.find('select[name="selection"]').val() ?? ((l = n[0]) == null ? void 0 : l.value) ?? "").trim();
    }
  });
}
var kt, Ei, Fi, Ft, ga, D, gd, xr, Fn, yd, bd, Me, xt, Si, Sd, $r, Ad, Td, wd, vd, kd, Ed, Md, $t, la;
const he = class he extends Xa {
  constructor() {
    super(...arguments);
    Ae(this, D);
    Ae(this, kt, null);
    Ae(this, Ei, null);
    Ae(this, Fi, null);
    Ae(this, Ft, /* @__PURE__ */ new Set());
    Ae(this, ga, null);
  }
  /** @override */
  async _prepareContext(t) {
    var j, L, B, G, X, oe, Se, me, C, V, ne, ae, ke, Ke, St, At, dt, Tt, je, mt, Pt, Nt, Rt, It, Dt, Ot, ft, _t;
    const i = await super._prepareContext(t), n = ((j = this.getSheetTokenDocument) == null ? void 0 : j.call(this)) ?? null;
    i._mwdThemeClass = game.system.mwd.styles.selectCssClass(), i.layout = await Ji.get("character");
    const s = ((B = (L = this.actor).getEdgeCap) == null ? void 0 : B.call(L)) ?? Number(((oe = (X = (G = this.actor.system) == null ? void 0 : G.attributes) == null ? void 0 : X.edge) == null ? void 0 : oe.value) ?? 0), r = !!this.isEditable, l = { physical: "Physical", mental: "Mental", social: "Social" }, o = {
      grit: "Grit",
      insight: "Insight",
      legend: "Legend",
      chaos: "Chaos",
      rumor: "Rumor",
      credibility: "Credibility"
    }, c = this.actor.getEdgePoolSummary ? this.actor.getEdgePoolSummary({ groups: to }) : { groups: [] };
    i.edgeConsole = {
      cap: s,
      editable: r,
      capPips: Array.from({ length: Math.max(0, s) }, (k, I) => I + 1),
      groups: (c.groups ?? []).map((k) => ({
        id: k.id,
        label: l[k.id] ?? k.id,
        pools: (k.pools ?? []).map((I) => {
          const Z = Number(I.effectiveValue ?? 0), Te = Number(I.effectiveMax ?? 0), Ee = Array.from({ length: Math.max(0, Te) }, (Ge, Xe) => {
            const pt = Xe + 1;
            return { n: pt, filled: pt <= Z };
          }), Re = String(I.key ?? "").split(".").pop();
          return {
            key: I.key,
            label: o[Re] ?? Re ?? I.key,
            value: Z,
            max: Te,
            rating: Number(I.rating ?? 0),
            ratingBonus: Number(I.ratingBonus ?? 0),
            effectiveRating: Number(I.effectiveRating ?? I.rating ?? 0),
            isCapped: Number(I.effectiveRating ?? I.rating ?? 0) > Number(I.cap ?? s),
            pips: Ee,
            // Paths for edit-mode inputs
            pathRating: `system.counters.edgePools.${I.key}.rating`,
            pathValue: `system.counters.edgePools.${I.key}.value`,
            // Keep the roll payload if you want pool-name click to route through BaseActorSheetV2 roll handler
            roll: JSON.stringify({ intent: "edge", pool: I.key })
          };
        })
      }))
    };
    const u = ["grit", "insight", "legend", "chaos", "rumor", "credibility"], d = /* @__PURE__ */ new Map();
    for (const k of i.edgeConsole.groups ?? [])
      for (const I of k.pools ?? []) {
        const Z = String(I.key ?? "").split(".").pop();
        Z && d.set(Z, I), I.domain = k.id;
      }
    i.edgeConsole.poolsOrdered = u.map((k) => d.get(k)).filter(Boolean);
    const m = this.actor.system ?? {}, f = m.monitors ?? {}, p = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue", label: "Fatigue", kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor", label: "Armor", kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ], h = (k, I, Z = 0) => {
      const Te = foundry.utils.getProperty(k, I), Ee = Number(Te);
      return Number.isFinite(Ee) ? Ee : Z;
    };
    i.conditionMonitors = p.map((k) => {
      const I = (f == null ? void 0 : f[k.id]) ?? {}, Z = Math.max(0, h(I, "max", 0)), Te = Math.min(Math.max(0, h(I, "value", 0)), Z);
      return {
        id: k.id,
        label: k.label,
        kind: k.kind,
        editable: !!this.isEditable,
        value: Te,
        max: Z,
        segments: Array.from({ length: Z }, (Ee, Re) => {
          const Ge = Re + 1;
          return { value: Ge, filled: Ge <= Te };
        }),
        status: k.status ? { label: k.status.label, value: h(I, k.status.path, 0) } : null
      };
    });
    const g = Number(((me = (Se = this.actor.system) == null ? void 0 : Se.burn) == null ? void 0 : me.value) ?? 0), y = 10, b = 6, S = Math.min(g, y);
    i.burnOverflow = Math.max(0, g - y), i.burnPenalty = Math.floor(g / 2), i.burnPips = Array.from({ length: y }, (k, I) => {
      const Z = I + 1;
      return {
        pipValue: Z,
        filled: Z <= S,
        threshold: Z === b
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
      overloaded: !!((V = (C = this.actor.system) == null ? void 0 : C.burn) != null && V.overloaded)
    };
    const v = x.getSnapshot(this.actor, { token: n });
    i.combatDashboard = {
      targeting: v.targeting,
      rollImpact: v.rollImpact,
      states: v.states,
      effects: v.effects,
      activation: v.activation,
      inactiveReason: v.inactiveReason
    };
    const M = x.buildActionModel(this.actor, v), N = new Set((M.menus ?? []).map((k) => k.id));
    z(this, kt) && !N.has(z(this, kt)) && Ie(this, kt, null), i.combatActions = {
      ...M,
      menus: (M.menus ?? []).map((k) => ({
        ...k,
        isOpen: k.id === z(this, kt)
      }))
    };
    const P = ((ae = (ne = this.actor).getPersonalCombatLoadout) == null ? void 0 : ae.call(ne)) ?? null;
    i.personalInventory = {
      warnings: [...(P == null ? void 0 : P.warnings) ?? []],
      weapons: ((P == null ? void 0 : P.weapons) ?? []).map((k) => {
        var we, at, nt, ht, H, ue, ni;
        const I = E(this, D, la).call(this, "weapons", k.id), Z = String((k == null ? void 0 : k.category) ?? "").trim().toLowerCase() !== "melee", Te = !!((we = k == null ? void 0 : k.sourceState) != null && we.isTracked), Ee = String((k == null ? void 0 : k.payloadLabel) ?? "").trim() || "Unloaded", Re = Z && Te ? `${tt((at = k == null ? void 0 : k.sourceState) == null ? void 0 : at.current, 0)}/${tt((nt = k == null ? void 0 : k.sourceState) == null ? void 0 : nt.max, 0)}` : "", Ge = Z ? Te ? `${Ee} ${Re}` : Ee : "", Xe = Z ? Te ? `Payload ${Re}` : `Payload ${Ee}` : "", pt = Ab(k.attackRatingBand), Kt = Tb(k.attackRatingBand), ee = zn([
          { label: "Skill", value: ((ht = k.skillDef) == null ? void 0 : ht.label) ?? k.skill ?? "" },
          { label: "Category", value: k.category ?? "" },
          { label: "Damage Type", value: k.damageTypeLabel ?? k.damageType ?? "" },
          { label: "Max Range", value: wb(((H = k.range) == null ? void 0 : H.max) ?? k.defaultRangeBand ?? "") },
          { label: "CQ Bands", value: pt },
          { label: "Payload", value: Ge },
          { label: "Traits", value: Ti(k.traits ?? []).join(", ") }
        ]);
        return {
          id: k.id,
          accordionId: I,
          isExpanded: z(this, Ft).has(I),
          name: k.name,
          img: k.img,
          subtitle: ((ue = k.skillDef) == null ? void 0 : ue.label) ?? k.category ?? "",
          summaryStats: $n([
            { label: "DV", value: tt(k.damage, 0), emphasis: "strong" },
            { label: "AP", value: tt(k.ap, 0) },
            { label: "Type", value: k.damageTypeLabel ?? k.damageType ?? "" },
            { label: "CQ", value: Kt }
          ]),
          detailTags: Bn([
            k.equipped ? "Equipped" : "",
            k.isPrimary ? "Primary" : "",
            Xe,
            ...Ti(k.traits ?? [])
          ]),
          detailRows: ee,
          detailText: xn(k.notes),
          equipped: !!k.equipped,
          isPrimary: !!k.isPrimary,
          attackUuid: k.uuid ?? "",
          attackRoll: JSON.stringify({
            intent: "attack",
            weaponId: k.id,
            payloadId: ((ni = k == null ? void 0 : k.payloadState) == null ? void 0 : ni.activePayloadId) ?? "",
            edge: { pool: "physical.grit", allowed: ["pre", "post"] },
            tags: ["combat", "attack"]
          })
        };
      }),
      armor: ((P == null ? void 0 : P.armor) ?? []).map((k) => {
        var Ge, Xe, pt, Kt, ee, we, at, nt, ht, H, ue, ni, wt, hi;
        const I = ((Ge = P == null ? void 0 : P.activeArmor) == null ? void 0 : Ge.id) === k.id ? P.activeArmor : null, Z = E(this, D, la).call(this, "armor", k.id), Te = tt(((pt = (Xe = I == null ? void 0 : I.traitState) == null ? void 0 : Xe.reinforced) == null ? void 0 : pt.max) ?? ((ee = (Kt = k == null ? void 0 : k.traitState) == null ? void 0 : Kt.reinforced) == null ? void 0 : ee.max), 0), Ee = Te > 0 ? `${tt(((at = (we = I == null ? void 0 : I.traitState) == null ? void 0 : we.reinforced) == null ? void 0 : at.current) ?? ((ht = (nt = k == null ? void 0 : k.traitState) == null ? void 0 : nt.reinforced) == null ? void 0 : ht.current), 0)}/${Te}` : "", Re = Sb({
          defenseBonus: k.defenseBonus,
          mitigationByType: (I == null ? void 0 : I.mitigationByType) ?? (I == null ? void 0 : I.typedMitigation) ?? k.mitigationByType ?? {}
        });
        return {
          id: k.id,
          accordionId: Z,
          isExpanded: z(this, Ft).has(Z),
          name: k.name,
          img: k.img,
          subtitle: (H = k.tags) != null && H.length ? k.tags.join(", ") : "Armor",
          summaryStats: $n([
            { label: "Rating", value: tt((I == null ? void 0 : I.ratingCurrent) ?? k.rating, 0), emphasis: "strong" },
            { label: "Res", value: tt((I == null ? void 0 : I.baseMitigation) ?? (I == null ? void 0 : I.baseResistance), 0) },
            { label: "Def", value: tt(k.defenseBonus, 0) },
            { label: "Dur", value: `${tt(((ue = I == null ? void 0 : I.durability) == null ? void 0 : ue.current) ?? ((ni = k.durability) == null ? void 0 : ni.current), 0)}/${tt(((wt = I == null ? void 0 : I.durability) == null ? void 0 : wt.max) ?? ((hi = k.durability) == null ? void 0 : hi.max), 0)}` }
          ]),
          detailTags: Bn([
            k.equipped ? "Equipped" : "",
            k.isPrimary ? "Primary" : "",
            Ee ? `Reinforced ${Ee}` : "",
            ...Ti(k.traits ?? [])
          ]),
          detailRows: zn([
            { label: "Modifiers", value: Re },
            { label: "Traits", value: Ti(k.traits ?? []).join(", ") },
            { label: "Tags", value: Ti(k.tags ?? []).join(", ") }
          ]),
          detailText: xn(k.notes),
          equipped: !!k.equipped,
          isPrimary: !!k.isPrimary
        };
      }),
      gear: (((ke = i.items) == null ? void 0 : ke.gear) ?? []).map((k) => {
        const I = E(this, D, la).call(this, "gear", k.id);
        return Vl({
          item: k,
          accordionId: I,
          itemType: "gear",
          defaultSubtitle: "Gear",
          categoryLabels: yb,
          ratingLabel: "Rating",
          isEditable: this.isEditable,
          isExpanded: z(this, Ft).has(I)
        });
      }),
      // Consumables deliberately share the same quantity-tracked record model as
      // gear so stock editing and linked-source authoring stay transferable.
      consumables: (((Ke = i.items) == null ? void 0 : Ke.consumable) ?? []).map((k) => {
        const I = E(this, D, la).call(this, "consumables", k.id);
        return Vl({
          item: k,
          accordionId: I,
          itemType: "consumable",
          defaultSubtitle: "Consumable",
          categoryLabels: bb,
          ratingLabel: "Potency",
          typeLabel: "Consumable",
          isEditable: this.isEditable,
          isExpanded: z(this, Ft).has(I)
        });
      })
    }, i.bio = {
      fields: ((St = i.bio) == null ? void 0 : St.fields) ?? {},
      faction: ((At = m.biography) == null ? void 0 : At.faction) ?? "",
      age: ((dt = m.biography) == null ? void 0 : dt.age) ?? "",
      rank: ((Tt = m.biography) == null ? void 0 : Tt.rank) ?? "",
      height: ((je = m.biography) == null ? void 0 : je.height) ?? "",
      weight: ((mt = m.biography) == null ? void 0 : mt.weight) ?? "",
      xpTotal: ((Nt = (Pt = m.counters) == null ? void 0 : Pt.xp) == null ? void 0 : Nt.total) ?? 0,
      xpSpent: ((It = (Rt = m.counters) == null ? void 0 : Rt.xp) == null ? void 0 : It.value) ?? 0,
      experienceLevel: ((Dt = m.biography) == null ? void 0 : Dt.experienceLevel) ?? "green",
      enrichedHistory: await foundry.applications.ux.TextEditor.implementation.enrichHTML(
        ((Ot = m.biography) == null ? void 0 : Ot.history) ?? "",
        { async: !0, secrets: this.actor.isOwner, relativeTo: this.actor }
      )
    };
    const U = Ii(this.actor);
    i.skillsDisplay = Jc(((ft = this.actor) == null ? void 0 : ft.system) ?? {}, {
      bonusBySkill: U.bonusBySkill
    }), i.lifeModules = U.slotStates.map((k) => {
      const I = k.state;
      return {
        moduleType: k.moduleType,
        label: k.label,
        hasCatalogEntries: k.availableEntries.length > 0,
        emptyState: k.availableEntries.length > 0 ? `Add ${k.label}` : `No ${k.label} catalog entries configured`,
        item: I ? {
          id: I.itemId,
          name: I.label,
          img: I.item.img,
          bonusLabels: [...I.selectedChoiceLabels ?? []],
          warningLabels: [...I.warningLabels ?? []],
          isActive: I.isActive,
          statusLabel: I.isActive ? "Active" : "Inactive",
          statusReason: I.inactiveReason
        } : null
      };
    });
    const K = ["positive", "negative", "narrative"], Y = ["major", "minor"], W = [...((_t = i.items) == null ? void 0 : _t.quality) ?? []].sort((k, I) => {
      const Z = Ht(k.system ?? {}), Te = Ht(I.system ?? {}), Ee = K.indexOf(Z.category) - K.indexOf(Te.category);
      if (Ee !== 0) return Ee;
      const Re = Y.indexOf(Z.tier) - Y.indexOf(Te.tier);
      return Re !== 0 ? Re : String(k.name ?? "").localeCompare(String(I.name ?? ""));
    });
    return i.qualityGroups = K.map((k) => ({
      id: k,
      label: kn(k),
      records: W.filter((I) => Ht(I.system ?? {}).category === k).map((I) => {
        var Ee, Re, Ge, Xe;
        const Z = Ht(I.system ?? {}), Te = E(this, D, la).call(this, "quality", I.id);
        return {
          id: I.id,
          accordionId: Te,
          isExpanded: z(this, Ft).has(Te),
          name: I.name,
          img: I.img,
          subtitle: `${En(Z.tier)} ${kn(Z.category)}`,
          summaryStats: $n([
            { label: "Tier", value: En(Z.tier), emphasis: "strong" },
            { label: "Activation", value: Z.activation || "passive" },
            { label: "Effects", value: String(((Ee = Z.effects) == null ? void 0 : Ee.length) ?? 0) }
          ]),
          detailTags: Bn([
            Z.inactive ? "Inactive" : "",
            ...Z.tags ?? []
          ]),
          detailRows: zn([
            { label: "Category", value: kn(Z.category) },
            { label: "Tier", value: En(Z.tier) },
            { label: "Activation", value: Z.activation || "passive" },
            { label: "Prerequisites", value: String(((Re = Z.prerequisites) == null ? void 0 : Re.length) ?? 0) },
            { label: "Effects", value: String(((Ge = Z.effects) == null ? void 0 : Ge.length) ?? 0) },
            { label: "Tags", value: Ti(Z.tags ?? []).join(", ") }
          ]),
          detailText: xn((Xe = I.system) == null ? void 0 : Xe.description)
        };
      })
    })), i;
  }
  _onRender(t, i) {
    super._onRender(t, i), E(this, D, gd).call(this), E(this, D, bd).call(this), E(this, D, Sd).call(this);
  }
  async close(t = {}) {
    return E(this, D, xr).call(this), E(this, D, $r).call(this), super.close(t);
  }
  requestCombatDashboardRefresh() {
    E(this, D, Me).call(this, { force: !0 });
  }
  async _onEdgeSet(t, i) {
    var c, u, d;
    if (t.preventDefault(), t.stopPropagation(), !this.isEditable) return;
    const n = ((c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-edge-pool][data-edge-value]")) ?? ((d = (u = t == null ? void 0 : t.target) == null ? void 0 : u.closest) == null ? void 0 : d.call(u, "[data-edge-pool][data-edge-value]"));
    if (!n) return;
    const s = String(n.dataset.edgePool ?? "").trim(), r = Number(n.dataset.edgeValue ?? NaN);
    if (!s || !Number.isFinite(r)) return;
    const l = this.actor.getEdgePool(s);
    if (!(l != null && l.hasPools)) return;
    let o = r;
    return r === l.effectiveValue && (o = r - 1), (t.button === 2 || t.type === "contextmenu") && (o = 0), t.altKey && (o = 0), t.shiftKey && (o = l.effectiveMax), this.actor.setEdgePoolValue(s, o);
  }
  async _onToggleCombatMenu(t, i) {
    var s, r, l, o, c, u, d;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = String(
      ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.combatMenu) ?? ((d = (u = (c = (o = t == null ? void 0 : t.target) == null ? void 0 : o.closest) == null ? void 0 : c.call(o, "[data-combat-menu]")) == null ? void 0 : u.dataset) == null ? void 0 : d.combatMenu) ?? ""
    ).trim();
    n && (Ie(this, kt, z(this, kt) === n ? null : n), E(this, D, Me).call(this, !1));
  }
  async _onToggleStatuses(t, i) {
    var r, l, o, c, u, d, m, f;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), E(this, D, $t).call(this, i, t, "Statuses are not available right now.") || !this.isEditable) return;
    const n = this.getPersistentActor() ?? this.actor, s = ((o = this.getSheetTokenDocument) == null ? void 0 : o.call(this)) ?? ((u = x.getSnapshot(n, { token: ((c = this.getSheetTokenDocument) == null ? void 0 : c.call(this)) ?? null })) == null ? void 0 : u.tokenDocument) ?? ((m = x.getSnapshot(this.actor, { token: ((d = this.getSheetTokenDocument) == null ? void 0 : d.call(this)) ?? null })) == null ? void 0 : m.tokenDocument) ?? null;
    if (!s) {
      (f = ui.notifications) == null || f.warn("Statuses require a token for this actor on the current scene.");
      return;
    }
    return cu({
      actor: n,
      token: s
    });
  }
  async _onCombatSpend(t, i) {
    var c, u, d, m, f, p, h, g, y, b;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), E(this, D, $t).call(this, i, t, "That combat action is not available right now.") || !this.isEditable) return;
    const n = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.resource) ?? "").trim(), s = Math.max(0, Number(((m = i == null ? void 0 : i.dataset) == null ? void 0 : m.cost) ?? 0)), r = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.combatAction) ?? "").trim(), l = String(((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.combatLabel) ?? "").trim(), o = String(((h = i == null ? void 0 : i.dataset) == null ? void 0 : h.combatCostLabel) ?? "").trim();
    if (!(!n || !s || !r))
      try {
        const S = this.getPersistentActor() ?? this.actor, v = await x.spendResource(S, {
          token: ((g = this.getSheetTokenDocument) == null ? void 0 : g.call(this)) ?? x.getCurrentSceneTokenDocument(S) ?? x.getCurrentSceneTokenDocument(this.actor),
          resource: n,
          cost: s,
          actionId: r,
          actionLabel: l,
          actionCostLabel: o
        });
        if (!(v != null && v.ok)) {
          (y = ui.notifications) == null || y.warn((v == null ? void 0 : v.reason) ?? "Unable to spend action.");
          return;
        }
        E(this, D, xt).call(this, { rerender: !1 }), E(this, D, Me).call(this, { force: !0 });
      } catch (S) {
        console.error("MWD | Failed to spend combat action", S), (b = ui.notifications) == null || b.error("Unable to spend action.");
      }
  }
  async _onCombatAction(t, i) {
    var s, r, l, o, c, u;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t), E(this, D, $t).call(this, i, t, "That combat action is not available right now.") || !this.isEditable) return;
    const n = String(((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.combatAction) ?? "").trim();
    if (n)
      try {
        const d = this.getPersistentActor() ?? this.actor, m = await E(this, D, Ad).call(this, n);
        if (!m) return;
        const f = await x.executeAction(d, {
          token: ((o = this.getSheetTokenDocument) == null ? void 0 : o.call(this)) ?? x.getCurrentSceneTokenDocument(d) ?? x.getCurrentSceneTokenDocument(this.actor),
          actionId: n,
          metadata: m
        });
        if (!(f != null && f.ok)) {
          (c = ui.notifications) == null || c.warn((f == null ? void 0 : f.reason) ?? "Unable to perform action.");
          return;
        }
        E(this, D, xt).call(this, { rerender: !1 }), E(this, D, Me).call(this, { force: !0 });
      } catch (d) {
        console.error("MWD | Failed to perform combat action", d), (u = ui.notifications) == null || u.error("Unable to perform action.");
      }
  }
  async _onCombatReduceBurn(t, i) {
    var n, s, r, l, o;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !E(this, D, $t).call(this, i, t, "Burn recovery is not available right now.") && this.isEditable)
      try {
        const c = this.getPersistentActor() ?? this.actor, u = await x.reduceBurn(c, {
          token: ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? x.getCurrentSceneTokenDocument(c) ?? x.getCurrentSceneTokenDocument(this.actor)
        });
        if (!(u != null && u.ok)) {
          (l = ui.notifications) == null || l.warn((u == null ? void 0 : u.reason) ?? "Unable to reduce Burn.");
          return;
        }
        E(this, D, xt).call(this, { rerender: !1 }), E(this, D, Me).call(this, { force: !0 });
      } catch (c) {
        console.error("MWD | Failed to reduce Burn", c), (o = ui.notifications) == null || o.error("Unable to reduce Burn.");
      }
  }
  async _onCombatAssist(t, i) {
    var n, s, r, l, o, c, u;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !E(this, D, $t).call(this, i, t, "Assist is not available right now.") && this.isEditable)
      try {
        const d = this.getPersistentActor() ?? this.actor, m = ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? x.getCurrentSceneTokenDocument(d) ?? x.getCurrentSceneTokenDocument(this.actor), f = x.getSnapshot(d, { token: m });
        if (!f.hasCombatant) {
          (l = ui.notifications) == null || l.warn("No combatant on the current scene.");
          return;
        }
        if (f.isCurrentTurn) {
          (o = ui.notifications) == null || o.warn("Only outside your activation.");
          return;
        }
        const p = await E(this, D, kd).call(this, f);
        if (!p) return;
        const h = await x.executeAction(d, {
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
        await E(this, D, Ed).call(this, {
          actor: d,
          token: m,
          target: p,
          costLabel: h.costLabel
        }), E(this, D, xt).call(this, { rerender: !1 }), E(this, D, Me).call(this, { force: !0 });
      } catch (d) {
        console.error("MWD | Failed to assist", d), (u = ui.notifications) == null || u.error("Unable to assist.");
      }
  }
  async _onCombatEvade(t, i) {
    var n, s, r, l, o;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !E(this, D, $t).call(this, i, t, "Evade is not available right now.") && this.isEditable)
      try {
        const c = this.getPersistentActor() ?? this.actor, u = ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? x.getCurrentSceneTokenDocument(c) ?? x.getCurrentSceneTokenDocument(this.actor), d = await lb(c, { token: u });
        if (!(d != null && d.ok)) {
          (l = ui.notifications) == null || l.warn((d == null ? void 0 : d.reason) ?? "Unable to activate Evade.");
          return;
        }
        E(this, D, xt).call(this, { rerender: !1 }), E(this, D, Me).call(this, { force: !0 });
      } catch (c) {
        console.error("MWD | Failed to activate Evade", c), (o = ui.notifications) == null || o.error("Unable to activate Evade.");
      }
  }
  async _onCombatInterrupt(t, i) {
    var n, s, r, l, o, c, u, d;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !E(this, D, $t).call(this, i, t, "Interrupt is not available right now.") && this.isEditable)
      try {
        const m = this.getPersistentActor() ?? this.actor, f = ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? x.getCurrentSceneTokenDocument(m) ?? x.getCurrentSceneTokenDocument(this.actor), p = x.getSnapshot(m, { token: f }), h = x.getPreparedInterrupt(p);
        if (!p.hasCombatant) {
          (l = ui.notifications) == null || l.warn("No combatant on the current scene.");
          return;
        }
        if (p.isCurrentTurn) {
          (o = ui.notifications) == null || o.warn("Only outside your activation.");
          return;
        }
        if (!h) {
          (c = ui.notifications) == null || c.warn("Prepare an interrupt first.");
          return;
        }
        if (!await E(this, D, Td).call(this, h)) return;
        const y = await x.executeAction(m, {
          token: f,
          actionId: "interrupt",
          metadata: h
        });
        if (!(y != null && y.ok)) {
          (u = ui.notifications) == null || u.warn((y == null ? void 0 : y.reason) ?? "Unable to interrupt.");
          return;
        }
        await x.clearPreparedInterrupt(m, { token: f }), await E(this, D, Md).call(this, {
          actor: m,
          token: f,
          preparedInterrupt: h,
          costLabel: y.costLabel
        }), E(this, D, xt).call(this, { rerender: !1 }), E(this, D, Me).call(this, { force: !0 });
      } catch (m) {
        console.error("MWD | Failed to interrupt", m), (d = ui.notifications) == null || d.error("Unable to interrupt.");
      }
  }
  async _onCombatOverloadCheck(t, i) {
    var r, l, o, c, u, d, m, f, p, h, g;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), E(this, D, $t).call(this, i, t, "Overload check is not available right now.") || !this.isEditable) return;
    const n = ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.roll) ?? ((m = (d = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : d.dataset) == null ? void 0 : m.roll);
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
      if (E(this, D, xt).call(this, { rerender: !1 }), !b) {
        E(this, D, Me).call(this, !1);
        return;
      }
      E(this, D, Me).call(this, { force: !0 });
    } catch (y) {
      console.error("MWD | Failed to launch overload check", y), (g = ui.notifications) == null || g.error("Unable to launch overload check.");
    }
  }
  async _onCombatAttack(t, i) {
    var m, f, p, h, g, y, b, S, v, M, N, P, U, K, Y, W, j, L, B, G, X, oe, Se;
    if ((m = t == null ? void 0 : t.preventDefault) == null || m.call(t), (f = t == null ? void 0 : t.stopPropagation) == null || f.call(t), E(this, D, $t).call(this, i, t, "Attack is not available right now.") || !this.isEditable) return;
    const n = this.getPersistentActor() ?? this.actor, s = ((p = this.getSheetTokenDocument) == null ? void 0 : p.call(this)) ?? x.getCurrentSceneTokenDocument(n) ?? x.getCurrentSceneTokenDocument(this.actor), r = String(((h = i == null ? void 0 : i.dataset) == null ? void 0 : h.combatAction) ?? "attack").trim() || "attack", l = String(((g = i == null ? void 0 : i.dataset) == null ? void 0 : g.combatLabel) ?? (r === "opportunity" ? "Opportunity" : "Attack")).trim() || "Attack", o = r === "opportunity", c = x.getSnapshot(n, { token: s }), u = !!((b = (y = c.state) == null ? void 0 : y.actionState) != null && b.aim);
    if (!c.hasCombatant) {
      (S = ui.notifications) == null || S.warn("No combatant on the current scene.");
      return;
    }
    if (o && c.isCurrentTurn) {
      (v = ui.notifications) == null || v.warn("Only outside your activation.");
      return;
    }
    if (!o && !c.isCurrentTurn) {
      (M = ui.notifications) == null || M.warn("Only available during your activation.");
      return;
    }
    if (!o && c.overloaded) {
      (N = ui.notifications) == null || N.warn("Overloaded actors can only recover Burn.");
      return;
    }
    if (!o) {
      const me = 3 + Math.floor((Math.max(0, Number(((K = (U = (P = n.system) == null ? void 0 : P.attributes) == null ? void 0 : U.reflexes) == null ? void 0 : K.value) ?? 0)) + Math.max(0, Number(((j = (W = (Y = n.system) == null ? void 0 : Y.attributes) == null ? void 0 : W.willpower) == null ? void 0 : j.value) ?? 0))) / 2);
      if (Math.max(0, me - Math.max(0, Number(((L = c.state) == null ? void 0 : L.saSpentThisActivation) ?? 0))) < 2) {
        (B = ui.notifications) == null || B.warn("Activation SA cap reached.");
        return;
      }
    }
    const d = {
      intent: "attack",
      mode: "auto",
      fallback: "unarmed",
      edge: { pool: "physical.grit", allowed: ["pre", "post"] },
      tags: o ? ["combat", "attack", "reaction", "opportunity"] : ["combat", "attack"],
      aim: u ? { active: !0 } : null,
      sourceTokenId: (s == null ? void 0 : s.id) ?? null
    };
    try {
      const me = await ((oe = (X = (G = game.mwd) == null ? void 0 : G.roll) == null ? void 0 : X.execute) == null ? void 0 : oe.call(X, { actor: n, payload: d, event: t }));
      if (E(this, D, xt).call(this, { rerender: !1 }), !me) {
        E(this, D, Me).call(this, !1);
        return;
      }
      u && await x.clearAim(n, { token: s });
      const C = o ? await x.executeAction(n, {
        token: s,
        actionId: "opportunity"
      }) : await x.spendResource(n, {
        token: s,
        resource: "sa",
        cost: 2,
        actionId: "attack",
        actionLabel: "Attack",
        actionCostLabel: "2 SA",
        actionCategory: "complex"
      });
      C != null && C.ok || (Se = ui.notifications) == null || Se.warn((C == null ? void 0 : C.reason) ?? `Unable to spend ${l} action.`), E(this, D, Me).call(this, { force: !0 });
    } catch (me) {
      console.error(`MWD | Failed to launch ${l}`, me), Ja(me, `Unable to launch ${l}.`);
    }
  }
  async _onAddSkillSpecialization(t, i) {
    var d, m, f, p;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable || !this.editing) return;
    const n = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.skillKey) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = yr(s.system ?? {}, n), l = fs(s.system ?? {}, n), o = Ki(n).filter((h) => !l.includes(h.key));
    if (o.length === 0) return;
    let c = ((p = o[0]) == null ? void 0 : p.key) ?? "";
    if (o.length > 1) {
      const h = `<form class="mwd-quick-select"><div class="mwd-field"><label>Specialization</label><select name="specialization">${o.map((g) => `<option value="${g.key}">${g.label}</option>`).join("")}</select></div></form>`;
      c = await foundry.applications.api.DialogV2.prompt({
        window: { title: "Add Skill Specialization" },
        content: h,
        ok: {
          label: "Add",
          callback: (g, y) => {
            var b, S;
            return ((b = y.form.elements.specialization) == null ? void 0 : b.value) ?? ((S = o[0]) == null ? void 0 : S.key) ?? "";
          }
        }
      });
    }
    const u = qn(
      r.concat([c])
    );
    await s.update({
      [`system.skills.${n}.specializations`]: u
    }), E(this, D, Me).call(this, { force: !0 });
  }
  async _onRemoveSkillSpecialization(t, i) {
    var o, c, u, d;
    if ((o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable || !this.editing) return;
    const n = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.skillKey) ?? "").trim(), s = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.specializationKey) ?? "").trim();
    if (!n || !s) return;
    const r = this.getPersistentActor() ?? this.actor, l = qn(
      yr(r.system ?? {}, n).filter((m) => m !== s)
    );
    await r.update({
      [`system.skills.${n}.specializations`]: l
    }), E(this, D, Me).call(this, { force: !0 });
  }
  async _onCreateLifeModuleItem(t, i) {
    var d, m, f, p, h;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable) return;
    const n = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.moduleType) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = No(n);
    if (!r.length) {
      (p = ui.notifications) == null || p.warn(`No ${wa(n)} life modules are configured in game settings.`);
      return;
    }
    const l = await Yl({
      title: `Choose ${wa(n)} Life Module`,
      label: "Life Module",
      confirmLabel: "Create",
      options: r.map((g) => ({
        value: g.id,
        label: g.label
      }))
    });
    if (!l) return;
    const o = Ni(l);
    if (!o) {
      (h = ui.notifications) == null || h.warn("That life module catalog entry no longer exists.");
      return;
    }
    const c = Fu(o, {}), u = {};
    for (const g of c.filter((y) => y.hasMultipleChoices)) {
      const y = await Yl({
        title: `Choose Bonus for ${o.label}`,
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
      name: o.label,
      type: "lifeModule",
      system: Va({
        moduleType: n,
        catalogId: o.id,
        selectedGrants: u
      })
    }]), E(this, D, Me).call(this, { force: !0 });
  }
  async _onCreateOwnedItem(t, i) {
    var o, c, u;
    if ((o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable) return;
    const n = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.itemType) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = s.items.filter((d) => d.type === n).length, l = n === "personalWeapon" ? "Personal Weapon" : n === "armor" ? "Armor" : n === "consumable" ? "Consumable" : n.charAt(0).toUpperCase() + n.slice(1);
    await s.createEmbeddedDocuments("Item", [{
      name: `${l} ${r + 1}`,
      type: n
    }]), E(this, D, Me).call(this, { force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var s, r, l;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = E(this, D, Si).call(this, i, t);
    (l = n == null ? void 0 : n.sheet) == null || l.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var r, l;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const n = E(this, D, Si).call(this, i, t);
    if (!n) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [n.id]), E(this, D, Me).call(this, { force: !0 });
  }
  async _onToggleInventoryAccordion(t, i) {
    var s, r, l, o, c, u, d, m, f, p;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = String(
      ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.accordionId) ?? ((u = (c = (o = i == null ? void 0 : i.closest) == null ? void 0 : o.call(i, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((p = (f = (m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-accordion-id]")) == null ? void 0 : f.dataset) == null ? void 0 : p.accordionId) ?? ""
    ).trim();
    n && (z(this, Ft).has(n) ? z(this, Ft).delete(n) : z(this, Ft).add(n), E(this, D, Me).call(this, !1));
  }
  async _onToggleOwnedItemEquipped(t, i) {
    var r, l, o, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const n = E(this, D, Si).call(this, i, t);
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor;
    await ((c = s.setOwnedItemEquipped) == null ? void 0 : c.call(s, n.id, !((o = n.system) != null && o.equipped))), E(this, D, Me).call(this, { force: !0 });
  }
  async _onSetOwnedItemPrimary(t, i) {
    var r, l, o, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const n = E(this, D, Si).call(this, i, t);
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor;
    await ((c = s.setOwnedItemPrimary) == null ? void 0 : c.call(s, n.id, !((o = n.system) != null && o.isPrimary))), E(this, D, Me).call(this, { force: !0 });
  }
  async _onAdjustGearQuantity(t, i) {
    var c, u, d, m, f, p, h, g, y, b, S;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const n = E(this, D, Si).call(this, i, t);
    if (!n || !["gear", "consumable"].includes(String(n.canonicalType ?? n.type ?? "").trim())) return;
    const s = Math.trunc(Number(
      ((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.delta) ?? ((p = (f = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, "[data-delta]")) == null ? void 0 : f.dataset) == null ? void 0 : p.delta) ?? ((b = (y = (g = (h = t == null ? void 0 : t.target) == null ? void 0 : h.closest) == null ? void 0 : g.call(h, "[data-delta]")) == null ? void 0 : y.dataset) == null ? void 0 : b.delta) ?? 0
    ) || 0);
    if (!s) return;
    const l = (this.getPersistentActor() ?? this.actor).items.get(n.id) ?? n, o = Math.max(0, Math.trunc(Number(((S = l.system) == null ? void 0 : S.quantity) ?? 1) || 0) + s);
    await l.update({ "system.quantity": o }), E(this, D, Me).call(this, { force: !0 });
  }
  async _onAttackWeapon(t, i) {
    var o, c, u, d;
    if ((o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), E(this, D, $t).call(this, i, t, "Equip that weapon before attacking.")) return;
    const n = E(this, D, Si).call(this, i, t);
    if (!((u = n == null ? void 0 : n.isPersonalWeapon) != null && u.call(n))) return;
    const s = this.getPersistentActor() ?? this.actor, r = ((d = this.getSheetTokenDocument) == null ? void 0 : d.call(this)) ?? x.getCurrentSceneTokenDocument(s) ?? x.getCurrentSceneTokenDocument(this.actor);
    await Ps({ weapon: n, event: t, token: r }) && E(this, D, Me).call(this, { force: !0 });
  }
};
kt = new WeakMap(), Ei = new WeakMap(), Fi = new WeakMap(), Ft = new WeakMap(), ga = new WeakMap(), D = new WeakSet(), gd = function() {
  E(this, D, xr).call(this), z(this, kt) && (Ie(this, Ei, (t) => {
    var s;
    const i = this._getRootElement();
    if (!i) return;
    const n = t.target;
    if (n instanceof Node && !((s = n.closest) != null && s.call(n, ".mwd-combat-menu"))) {
      if (!i.contains(n)) {
        E(this, D, xt).call(this);
        return;
      }
      E(this, D, xt).call(this);
    }
  }), document.addEventListener("click", z(this, Ei)));
}, xr = function() {
  z(this, Ei) && (document.removeEventListener("click", z(this, Ei)), Ie(this, Ei, null));
}, Fn = function() {
  const t = this._getRootElement();
  return t ? t.querySelector(".mwd-scroll-area") ?? t.querySelector(".csb-tab-panels") : null;
}, yd = function() {
  const t = E(this, D, Fn).call(this);
  if (!(t instanceof HTMLElement)) {
    Ie(this, Fi, null);
    return;
  }
  Ie(this, Fi, {
    top: t.scrollTop,
    left: t.scrollLeft
  });
}, bd = function() {
  const t = z(this, Fi);
  if (!t) return;
  const i = E(this, D, Fn).call(this);
  i instanceof HTMLElement && (i.scrollTop = t.top, i.scrollLeft = t.left, requestAnimationFrame(() => {
    const n = E(this, D, Fn).call(this);
    n instanceof HTMLElement && (n.scrollTop = t.top, n.scrollLeft = t.left);
  }), Ie(this, Fi, null));
}, Me = function(t = !1) {
  E(this, D, yd).call(this), this.render(t);
}, xt = function({ rerender: t = !0 } = {}) {
  z(this, kt) && (Ie(this, kt, null), t && E(this, D, Me).call(this, !1));
}, Si = function(t, i) {
  var s, r, l, o, c, u, d, m;
  const n = String(
    ((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.itemId) ?? ((o = (l = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, "[data-item-id]")) == null ? void 0 : l.dataset) == null ? void 0 : o.itemId) ?? ((m = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
  ).trim();
  return n ? this.actor.items.get(n) ?? null : null;
}, Sd = function() {
  var n;
  const t = (n = this._getRootElement) == null ? void 0 : n.call(this);
  if (!t) return;
  E(this, D, $r).call(this);
  const i = new AbortController();
  Ie(this, ga, i), t.addEventListener("dragstart", (s) => {
    var c, u, d;
    const r = (u = (c = s.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-weapon-attack-uuid]");
    if (!r || !t.contains(r)) return;
    const l = E(this, D, Si).call(this, r, s), o = l ? fd(l) : null;
    if (!o) {
      s.preventDefault();
      return;
    }
    s.stopPropagation(), (d = s.dataTransfer) == null || d.setData("text/plain", JSON.stringify(o)), s.dataTransfer && (s.dataTransfer.effectAllowed = "copy");
  }, { signal: i.signal });
}, $r = function() {
  var t;
  (t = z(this, ga)) == null || t.abort(), Ie(this, ga, null);
}, Ad = async function(t) {
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
}, Td = async function(t = {}) {
  const i = String((t == null ? void 0 : t.condition) ?? "").trim(), n = String((t == null ? void 0 : t.scope) ?? "").trim(), s = `
    <div class="mwd-quick-select">
      <p><strong>Trigger:</strong> ${st(i || "Unspecified trigger")}</p>
      <p><strong>Scope:</strong> ${st(n || "Unspecified response")}</p>
    </div>`;
  return !!await Dialog.confirm({
    title: "Resolve Interrupt",
    content: s,
    yes: () => !0,
    no: () => !1
  });
}, wd = function(t) {
  return t != null && t.combatants ? typeof t.combatants.values == "function" ? Array.from(t.combatants.values()) : Array.from(t.combatants ?? []) : [];
}, vd = function(t) {
  var n;
  const i = String(((n = t == null ? void 0 : t.combatant) == null ? void 0 : n.id) ?? "").trim();
  return E(this, D, wd).call(this, t == null ? void 0 : t.combat).filter((s) => s && String(s.id ?? "").trim() !== i).map((s) => {
    var c;
    const r = ((c = s.token) == null ? void 0 : c.document) ?? s.token ?? null, l = s.actor ?? (r == null ? void 0 : r.actor) ?? null, o = String(s.name ?? (r == null ? void 0 : r.name) ?? (l == null ? void 0 : l.name) ?? "Combatant").trim() || "Combatant";
    return {
      combatantId: String(s.id ?? "").trim(),
      actorUuid: (l == null ? void 0 : l.uuid) ?? null,
      tokenUuid: (r == null ? void 0 : r.uuid) ?? null,
      name: o
    };
  }).filter((s) => s.combatantId && s.name).sort((s, r) => s.name.localeCompare(r.name));
}, kd = async function(t) {
  var r;
  const i = E(this, D, vd).call(this, t);
  if (!i.length)
    return (r = ui.notifications) == null || r.warn("No other combatants are available to assist."), null;
  const n = `
    <form class="mwd-quick-select">
      <div class="mwd-field">
        <label>Assist</label>
        <select name="combatant">
          ${i.map((l) => `<option value="${st(l.combatantId)}">${st(l.name)}</option>`).join("")}
        </select>
      </div>
    </form>`, s = await Dialog.prompt({
    title: "Assist Combatant",
    content: n,
    label: "Assist",
    callback: (l) => {
      var o;
      return String(l.find('select[name="combatant"]').val() ?? ((o = i[0]) == null ? void 0 : o.combatantId) ?? "").trim();
    }
  });
  return s ? i.find((l) => l.combatantId === s) ?? null : null;
}, Ed = async function({ actor: t, token: i = null, target: n = null, costLabel: s = "" } = {}) {
  const r = String((t == null ? void 0 : t.name) ?? "Ally").trim() || "Ally", l = String((n == null ? void 0 : n.name) ?? "an ally").trim() || "an ally", o = String(s ?? "").trim(), c = `
    <div class="mwd-chat-card mwd-chat-card--assist">
      <h3>Assist</h3>
      <p><strong>${st(r)}</strong> assists <strong>${st(l)}</strong>.</p>
      ${o ? `<p><small>Cost: ${st(o)}</small></p>` : ""}
    </div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: t, token: (i == null ? void 0 : i.object) ?? i }),
    content: c
  });
}, Md = async function({ actor: t, token: i = null, preparedInterrupt: n = null, costLabel: s = "" } = {}) {
  const r = String((t == null ? void 0 : t.name) ?? "Combatant").trim() || "Combatant", l = String((n == null ? void 0 : n.condition) ?? "").trim(), o = String((n == null ? void 0 : n.scope) ?? "").trim(), c = String(s ?? "").trim(), u = `
    <div class="mwd-chat-card mwd-chat-card--interrupt">
      <h3>Interrupt</h3>
      <p><strong>${st(r)}</strong> resolves a prepared interrupt.</p>
      ${l ? `<p><strong>Trigger:</strong> ${st(l)}</p>` : ""}
      ${o ? `<p><strong>Scope:</strong> ${st(o)}</p>` : ""}
      ${c ? `<p><small>Cost: ${st(c)}</small></p>` : ""}
    </div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: t, token: (i == null ? void 0 : i.object) ?? i }),
    content: u
  });
}, $t = function(t, i, n = "That action is not available right now.") {
  var l, o, c, u, d;
  const s = ((l = t == null ? void 0 : t.closest) == null ? void 0 : l.call(t, "[data-action-disabled='true']")) ?? ((c = (o = i == null ? void 0 : i.target) == null ? void 0 : o.closest) == null ? void 0 : c.call(o, "[data-action-disabled='true']"));
  if (!s) return !1;
  const r = String(((u = s.dataset) == null ? void 0 : u.actionReason) ?? n).trim() || n;
  return (d = ui.notifications) == null || d.warn(r), !0;
}, la = function(t, i) {
  return `${String(t ?? "").trim()}:${String(i ?? "").trim()}`;
}, O(he, "PARTS", {
  sheet: {
    get template() {
      return `${Q}/v2/actor/character-sheet.hbs`;
    }
  }
}), O(he, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Vt(he, he, "DEFAULT_OPTIONS"), {
  classes: ["character-sheet", T, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
  window: { minWidth: 450, minHeight: 740, resizable: !0 },
  position: { width: 980, height: 900 },
  actions: {
    ...Vt(he, he, "DEFAULT_OPTIONS").actions,
    edgeSet: he.prototype._onEdgeSet,
    toggleCombatMenu: he.prototype._onToggleCombatMenu,
    toggleStatuses: he.prototype._onToggleStatuses,
    combatAction: he.prototype._onCombatAction,
    combatSpend: he.prototype._onCombatSpend,
    combatAssist: he.prototype._onCombatAssist,
    combatEvade: he.prototype._onCombatEvade,
    combatInterrupt: he.prototype._onCombatInterrupt,
    combatReduceBurn: he.prototype._onCombatReduceBurn,
    combatOverloadCheck: he.prototype._onCombatOverloadCheck,
    combatAttack: he.prototype._onCombatAttack,
    createOwnedItem: he.prototype._onCreateOwnedItem,
    addSkillSpecialization: he.prototype._onAddSkillSpecialization,
    removeSkillSpecialization: he.prototype._onRemoveSkillSpecialization,
    createLifeModuleItem: he.prototype._onCreateLifeModuleItem,
    editOwnedItem: he.prototype._onEditOwnedItem,
    deleteOwnedItem: he.prototype._onDeleteOwnedItem,
    toggleInventoryAccordion: he.prototype._onToggleInventoryAccordion,
    toggleOwnedItemEquipped: he.prototype._onToggleOwnedItemEquipped,
    setOwnedItemPrimary: he.prototype._onSetOwnedItemPrimary,
    adjustGearQuantity: he.prototype._onAdjustGearQuantity,
    attackWeapon: he.prototype._onAttackWeapon
  }
}));
let Lr = he;
function vb(a, e, t = "") {
  const i = foundry.utils.getProperty(a, e);
  return i === void 0 ? t : i;
}
function Ho(a, e, t = {}) {
  const {
    document: i = null,
    type: n = "text",
    value: s = vb(i, a, n === "number" ? 0 : ""),
    displayValue: r = s,
    options: l = [],
    placeholder: o = "",
    readOnly: c = !1,
    rows: u = 4,
    help: d = ""
  } = t;
  return {
    path: a,
    label: e,
    value: s,
    displayValue: r,
    placeholder: o,
    readOnly: c,
    rows: u,
    help: d,
    options: l,
    isText: n === "text",
    isNumber: n === "number",
    isSelect: n === "select",
    isTextarea: n === "textarea"
  };
}
function Ql(a, e, t, i = {}) {
  return Ho(e, t, { ...i, document: a, type: "text" });
}
function ca(a, e, t, i = {}) {
  return Ho(e, t, { ...i, document: a, type: "number" });
}
function kb(a, e, t, i = {}) {
  return Ho(e, t, { ...i, document: a, type: "textarea" });
}
function Eb(a, e = []) {
  return e.map(
    (t) => ca(
      a,
      `system.attributes.${t.key}.value`,
      t.label
    )
  );
}
function Sn(a, {
  types: e = [],
  includeTypes: t = [],
  describe: i = (l) => "",
  supportsEquip: n = !1,
  supportsPrimary: s = !1,
  supportsAttack: r = !1
} = {}) {
  const l = new Set([...e ?? [], ...t ?? []].map((o) => String(o ?? "").trim()));
  return Array.from((a == null ? void 0 : a.items) ?? []).filter((o) => l.has(String((o == null ? void 0 : o.canonicalType) ?? (o == null ? void 0 : o.type) ?? "").trim())).sort((o, c) => String(o.name ?? "").localeCompare(String(c.name ?? ""))).map((o) => {
    var c, u, d;
    return {
      id: o.id,
      name: o.name || "Item",
      subtitle: String(i(o) ?? "").trim(),
      equipped: !!((c = o.system) != null && c.equipped),
      isPrimary: !!((u = o.system) != null && u.isPrimary),
      supportsEquip: n,
      supportsPrimary: s,
      supportsAttack: r && !!((d = o.isPersonalWeapon) != null && d.call(o))
    };
  });
}
class Cd extends Xa {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["npc-sheet", T, "actor-sheet-v2"],
      position: { width: 920, height: 860 }
    });
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), i = this.actor;
    return t.layout = await Ji.get("npc"), t.actorSheet = {
      profileFields: [
        Ql(i, "system.role", "Role / Archetype")
      ],
      attributeFields: Eb(i, [
        { key: "strength", label: "Strength" },
        { key: "reflexes", label: "Reflexes" },
        { key: "intelligence", label: "Intelligence" },
        { key: "willpower", label: "Willpower" },
        { key: "charisma", label: "Charisma" },
        { key: "edge", label: "Edge" }
      ]),
      monitorFields: [
        ca(i, "system.monitors.physical.value", "Physical"),
        ca(i, "system.monitors.physical.max", "Physical Max"),
        ca(i, "system.monitors.fatigue.value", "Fatigue"),
        ca(i, "system.monitors.fatigue.max", "Fatigue Max"),
        ca(i, "system.monitors.armor.value", "Armor"),
        Ql(i, "system.monitors.armor.effect", "Armor Effect")
      ],
      itemCollections: {
        traits: Sn(i, {
          types: ["quality"],
          describe: (n) => {
            var s;
            return ((s = n.system) == null ? void 0 : s.category) ?? "";
          }
        }),
        weapons: Sn(i, {
          types: ["personalWeapon"],
          supportsEquip: !0,
          supportsPrimary: !0,
          describe: (n) => {
            var s, r;
            return `${((s = n.system) == null ? void 0 : s.category) ?? "ranged"} | DV ${Number(((r = n.system) == null ? void 0 : r.damage) ?? 0)}`;
          }
        }),
        assetModules: Sn(i, {
          types: ["assetModule"],
          describe: (n) => {
            var s;
            return `Level ${Number(((s = n.system) == null ? void 0 : s.level) ?? 1)}`;
          }
        }),
        inventory: Sn(i, {
          // Consumables share the same quantity-driven row contract as gear on
          // lightweight actor sheets, so we present them in one inventory list.
          types: ["gear", "consumable"],
          describe: (n) => {
            var s, r;
            return `Qty ${Number(((s = n.system) == null ? void 0 : s.quantity) ?? 1)} | Rating ${Number(((r = n.system) == null ? void 0 : r.rating) ?? 0)}`;
          }
        })
      },
      notesField: kb(i, "system.biography", "Notes", { rows: 12 })
    }, t;
  }
}
O(Cd, "PARTS", {
  sheet: {
    template: `${Q}/v2/actor/npc-sheet.hbs`,
    scrollable: [".sheet-body"]
  }
});
function qe(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Mb(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function Cb(a) {
  return String(a ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function Pb(a, e = 180) {
  const t = Cb(a);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function Zn(a = "") {
  return String(a ?? "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (e) => e.toUpperCase());
}
function Qs(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim(),
    emphasis: e.emphasis ?? ""
  }));
}
function Nb(a = []) {
  return Mb(a).map((e) => ({ label: e }));
}
function Jl(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
function Rb(a = {}) {
  return ["close", "near", "far", "extreme", "max"].filter((i) => (a == null ? void 0 : a[i]) !== void 0 && (a == null ? void 0 : a[i]) !== null && String(a[i]).trim() !== "").map((i) => {
    const n = a[i];
    return i === "max" ? `Max ${Zn(n)}` : `${Zn(i)} ${qe(n, 0)}`;
  }).join(" | ");
}
const Ib = Object.freeze({
  handling: "Handling",
  system: "System",
  chassis: "Chassis",
  condition: "Condition"
}), Xl = Object.freeze({
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
var Ui, tn, Br;
const et = class et extends Xa {
  constructor() {
    super(...arguments);
    Ae(this, tn);
    Ae(this, Ui, /* @__PURE__ */ new Set());
  }
  async _prepareContext(t) {
    var n, s, r, l;
    const i = await super._prepareContext(t);
    return i._mwdThemeClass = ((l = (r = (s = (n = game.system) == null ? void 0 : n.mwd) == null ? void 0 : s.styles) == null ? void 0 : r.selectCssClass) == null ? void 0 : l.call(r)) ?? "", i.layout = await Ji.get(this.constructor.LAYOUT_ID ?? et.LAYOUT_ID), i.vehicleSheet = {
      summaryStats: this._buildSummaryStats(),
      alerts: this._buildAlerts(),
      statusAction: {
        label: "Statuses",
        disabled: !this._resolveStatusToken(this.getPersistentActor() ?? this.actor),
        reason: "Statuses require a token for this actor on the current scene."
      },
      attributes: this._buildAttributeCards(),
      sections: this._buildVehicleSections()
    }, i.conditionMonitors = this._buildConditionMonitors(), i;
  }
  _buildSummaryStats() {
    var n, s, r, l, o, c, u;
    const t = ((n = this.actor.system) == null ? void 0 : n.attributes) ?? {}, i = ((r = (s = this.actor.system) == null ? void 0 : s.monitors) == null ? void 0 : r.structure) ?? {};
    return Qs([
      { label: "Handling", value: qe((l = t.handling) == null ? void 0 : l.value, 0), emphasis: "strong" },
      { label: "System", value: qe((o = t.system) == null ? void 0 : o.value, 0) },
      { label: "Chassis", value: qe((c = t.chassis) == null ? void 0 : c.value, 0) },
      { label: "Condition", value: qe((u = t.condition) == null ? void 0 : u.value, 0) },
      { label: "Structure", value: `${qe(i.value, 0)} / ${qe(i.max, 0)}` }
    ]);
  }
  _buildAlerts() {
    return [];
  }
  _buildAttributeCards() {
    var i;
    const t = ((i = this.actor.system) == null ? void 0 : i.attributes) ?? {};
    return Object.entries(Ib).map(([n, s]) => {
      var r;
      return {
        key: n,
        label: s,
        value: qe((r = t == null ? void 0 : t[n]) == null ? void 0 : r.value, 0),
        path: `system.attributes.${n}.value`
      };
    });
  }
  _buildConditionMonitors() {
    var i, n, s, r, l;
    const t = ((n = (i = this.actor.system) == null ? void 0 : i.monitors) == null ? void 0 : n.structure) ?? ((l = (r = (s = this.actor.system) == null ? void 0 : s.mwd) == null ? void 0 : r.monitors) == null ? void 0 : l.structure) ?? {};
    return [{
      id: "structure",
      label: "Structure",
      kind: "wound",
      editable: !!this.isEditable,
      value: Math.max(0, qe(t.value, 0)),
      max: Math.max(0, qe(t.max, 0)),
      segments: Array.from({ length: Math.max(0, qe(t.max, 0)) }, (o, c) => {
        const u = c + 1;
        return {
          value: u,
          filled: u <= Math.max(0, qe(t.value, 0))
        };
      }),
      status: {
        label: "Resist",
        value: qe(t.resistance, 0)
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
      records: Array.from(r ?? []).map((l) => this._buildItemRecord(l, { sectionId: t }))
    };
  }
  _buildItemRecord(t, { sectionId: i = "" } = {}) {
    var f, p, h;
    const n = (t == null ? void 0 : t.system) ?? {}, s = (t == null ? void 0 : t.canonicalType) ?? (t == null ? void 0 : t.type) ?? "", r = typeof (t == null ? void 0 : t.getCombatProfile) == "function" ? t.getCombatProfile() : null, l = `${String(i ?? "").trim()}:${String((t == null ? void 0 : t.id) ?? "").trim()}`, o = Xl[s] ?? Zn(s || "item"), c = n.notes ?? n.description ?? ((f = n.references) == null ? void 0 : f.description) ?? "", u = n.quantity, d = Qs(r ? [
      { label: "DV", value: qe(r.damage, 0), emphasis: "strong" },
      { label: "AP", value: qe(r.ap, 0) },
      { label: "Type", value: r.damageTypeLabel ?? r.damageType ?? "" }
    ] : [
      { label: "Type", value: o },
      ...u !== void 0 ? [{ label: "Qty", value: qe(u, 0) }] : []
    ]), m = Jl(r ? [
      { label: "Skill", value: ((p = r.skillDef) == null ? void 0 : p.label) ?? r.skill ?? "" },
      { label: "Category", value: r.category ?? n.weaponCategory ?? n.category ?? "" },
      { label: "Range", value: Rb(r.range) }
    ] : [
      { label: "Category", value: n.category ?? o },
      { label: "Quantity", value: u !== void 0 ? qe(u, 0) : "" }
    ]);
    return {
      id: (t == null ? void 0 : t.id) ?? "",
      accordionId: l,
      isExpanded: z(this, Ui).has(l),
      name: (t == null ? void 0 : t.name) ?? o,
      img: (t == null ? void 0 : t.img) ?? "icons/svg/item-bag.svg",
      subtitle: ((h = r == null ? void 0 : r.skillDef) == null ? void 0 : h.label) ?? n.category ?? o,
      summaryStats: d,
      detailTags: Nb([
        n.equipped ? "Equipped" : "",
        n.isPrimary ? "Primary" : "",
        n.weaponCategory ?? n.category ?? ""
      ]),
      detailRows: m,
      detailText: Pb(c),
      equipped: !!n.equipped,
      isPrimary: !!n.isPrimary,
      canAdjustQuantity: !1
    };
  }
  async _onCreateOwnedItem(t, i) {
    var o, c, u;
    if ((o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable) return;
    const n = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.itemType) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = Xl[n] ?? Zn(n), l = s.items.filter((d) => d.type === n).length;
    await s.createEmbeddedDocuments("Item", [{
      name: `${r} ${l + 1}`,
      type: n
    }]), this.render({ force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var s, r, l;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = E(this, tn, Br).call(this, i, t);
    (l = n == null ? void 0 : n.sheet) == null || l.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var r, l;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const n = E(this, tn, Br).call(this, i, t);
    if (!n) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [n.id]), this.render({ force: !0 });
  }
  async _onToggleInventoryAccordion(t, i) {
    var s, r, l, o, c, u, d, m, f, p;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = String(
      ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.accordionId) ?? ((u = (c = (o = i == null ? void 0 : i.closest) == null ? void 0 : o.call(i, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((p = (f = (m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-accordion-id]")) == null ? void 0 : f.dataset) == null ? void 0 : p.accordionId) ?? ""
    ).trim();
    n && (z(this, Ui).has(n) ? z(this, Ui).delete(n) : z(this, Ui).add(n), this.render({ force: !1 }));
  }
  async _onToggleStatuses(t, i) {
    var r, l, o, c, u, d;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.actionDisabled) === "true")
      return (u = ui.notifications) == null || u.warn(((c = i == null ? void 0 : i.dataset) == null ? void 0 : c.actionReason) || "Statuses are not available right now."), !1;
    const n = this.getPersistentActor() ?? this.actor, s = this._resolveStatusToken(n);
    return s ? cu({
      actor: n,
      token: s
    }) : ((d = ui.notifications) == null || d.warn("Statuses require a token for this actor on the current scene."), !1);
  }
  _resolveStatusToken(t = this.actor) {
    var i, n, s, r, l, o, c, u, d;
    return ((i = this.getSheetTokenDocument) == null ? void 0 : i.call(this)) ?? ((n = t == null ? void 0 : t.token) == null ? void 0 : n.document) ?? (t == null ? void 0 : t.token) ?? ((l = (r = (s = t == null ? void 0 : t.getActiveTokens) == null ? void 0 : s.call(t, !0, !0)) == null ? void 0 : r[0]) == null ? void 0 : l.document) ?? ((c = (o = t == null ? void 0 : t.getActiveTokens) == null ? void 0 : o.call(t, !0, !0)) == null ? void 0 : c[0]) ?? ((d = Array.from(((u = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : u.placeables) ?? []).find((m) => {
      var f;
      return ((f = m == null ? void 0 : m.actor) == null ? void 0 : f.id) && m.actor.id === (t == null ? void 0 : t.id);
    })) == null ? void 0 : d.document) ?? null;
  }
};
Ui = new WeakMap(), tn = new WeakSet(), Br = function(t, i) {
  var s, r, l, o, c, u, d, m;
  const n = String(
    ((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.itemId) ?? ((o = (l = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, "[data-item-id]")) == null ? void 0 : l.dataset) == null ? void 0 : o.itemId) ?? ((m = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
  ).trim();
  return n ? this.actor.items.get(n) ?? null : null;
}, O(et, "LAYOUT_ID", "vehicle"), O(et, "PARTS", {
  sheet: {
    get template() {
      return `${Q}/v2/actor/vehicle-sheet.hbs`;
    }
  }
}), O(et, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Vt(et, et, "DEFAULT_OPTIONS"), {
  classes: ["vehicle-sheet", T, "actor-sheet-v2", "mwd-vehicle-sheet", "mwd-sheet"],
  window: { minWidth: 520, minHeight: 720, resizable: !0 },
  position: { width: 940, height: 900 },
  actions: {
    ...Vt(et, et, "DEFAULT_OPTIONS").actions,
    createOwnedItem: et.prototype._onCreateOwnedItem,
    editOwnedItem: et.prototype._onEditOwnedItem,
    deleteOwnedItem: et.prototype._onDeleteOwnedItem,
    toggleInventoryAccordion: et.prototype._onToggleInventoryAccordion,
    toggleStatuses: et.prototype._onToggleStatuses
  }
}));
let es = et;
function Fe(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Pd(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function vt(a = "") {
  return String(a ?? "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (e) => e.toUpperCase());
}
function Js(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim(),
    emphasis: e.emphasis ?? ""
  }));
}
function Zl(a = []) {
  return Pd(a).map((e) => ({ label: e }));
}
function ec(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
function yi(a = "") {
  var t, i;
  const e = ((i = (t = w == null ? void 0 : w.actor) == null ? void 0 : t.vehicle) == null ? void 0 : i.quickActions) ?? {};
  return String((e == null ? void 0 : e[a]) ?? vt(a)).trim() || vt(a);
}
var an, Fr;
const Bt = class Bt extends es {
  constructor() {
    super(...arguments);
    Ae(this, an);
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
    var s, r, l, o;
    const t = Fe((r = (s = this.actor.system) == null ? void 0 : s.mwd) == null ? void 0 : r.tonnage, 0), i = ((o = (l = this.actor.system) == null ? void 0 : l.mwd) == null ? void 0 : o.weightClass) ?? "medium", n = { light: "Light", medium: "Medium", heavy: "Heavy", assault: "Assault" };
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
        displayValue: n[i] ?? vt(i),
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
    var s, r, l, o;
    const t = ((r = (s = this.actor.system) == null ? void 0 : s.monitors) == null ? void 0 : r.structure) ?? {}, i = ((o = (l = this.actor.system) == null ? void 0 : l.monitors) == null ? void 0 : o.armor) ?? {}, n = (c, u, d, m) => {
      var f;
      return {
        id: c,
        label: u,
        kind: d,
        editable: !!this.isEditable,
        value: Math.max(0, Fe(m.value, 0)),
        max: Math.max(0, Fe(m.max, 0)),
        segments: Array.from({ length: Math.max(0, Fe(m.max, 0)) }, (p, h) => {
          const g = h + 1;
          return {
            value: g,
            filled: g <= Math.max(0, Fe(m.value, 0))
          };
        }),
        status: {
          label: "Resist",
          value: Fe((f = m.resistance) == null ? void 0 : f.default, 0)
        }
      };
    };
    return [
      n("structure", "Structure", "wound", t),
      n("armor", "Armor", "armor", i)
    ];
  }
  _buildSummaryStats() {
    var s, r, l, o, c, u, d, m, f, p, h, g;
    const t = ((r = (s = this.actor.system) == null ? void 0 : s.mwd) == null ? void 0 : r.loadout) ?? {}, i = ((o = (l = this.actor.system) == null ? void 0 : l.mwd) == null ? void 0 : o.heat) ?? {}, n = ((u = (c = this.actor.system) == null ? void 0 : c.mwd) == null ? void 0 : u.heatStatus) ?? {};
    return Js([
      { label: "Weight", value: vt(((m = (d = this.actor.system) == null ? void 0 : d.mwd) == null ? void 0 : m.weightClass) ?? "medium"), emphasis: "strong" },
      { label: "Tonnage", value: Fe((p = (f = this.actor.system) == null ? void 0 : f.mwd) == null ? void 0 : p.tonnage, 0) },
      { label: "Mounts", value: `${Fe((h = t == null ? void 0 : t.mountPoints) == null ? void 0 : h.used, 0)} / ${Fe((g = t == null ? void 0 : t.mountPoints) == null ? void 0 : g.total, 0)}` },
      { label: "Heat", value: `${Fe(i.current, 0)} / ${Fe(i.max, 0)}` },
      { label: "Status", value: n.label ?? vt(n.code ?? "safe") }
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
    var l, o, c, u;
    const t = ((o = (l = this.actor.system) == null ? void 0 : l.mwd) == null ? void 0 : o.heat) ?? {}, i = ((u = (c = this.actor.system) == null ? void 0 : c.mwd) == null ? void 0 : u.heatStatus) ?? {}, n = Math.max(0, Fe(t.current, 0)), s = Math.max(0, Fe(t.max, 0)), r = t.thresholds ?? {};
    return {
      label: "Heat",
      current: n,
      max: s,
      editable: !!this.isEditable,
      status: i.label ?? vt(i.code ?? "safe"),
      thresholds: {
        runningHot: Fe(r.runningHot, 0),
        overheated: Fe(r.overheated, 0),
        shutdown: Fe(r.shutdown, 0)
      },
      segments: Array.from({ length: s }, (d, m) => {
        const f = m + 1;
        return {
          value: f,
          filled: f <= n,
          breakpoint: Pd([
            f === Fe(r.runningHot, 0) ? "runningHot" : "",
            f === Fe(r.overheated, 0) ? "overheated" : "",
            f === Fe(r.shutdown, 0) ? "shutdown" : ""
          ]).join(" ")
        };
      })
    };
  }
  _buildQuickActions() {
    var r, l, o;
    const t = ((r = this.actor.system) == null ? void 0 : r.quickActions) ?? {}, i = t.primaryWeaponGroup ?? null, n = Array.isArray((l = this.actor.system) == null ? void 0 : l.weaponGroups) && this.actor.system.weaponGroups.length > 0, s = Array.isArray((o = this.actor.system) == null ? void 0 : o.meleeProfiles) && this.actor.system.meleeProfiles.length > 0;
    return [
      {
        label: yi("primaryWeapons"),
        hint: (i == null ? void 0 : i.name) ?? "Primary weapon group",
        handler: "mechAttack",
        disabled: !i,
        dataset: { attackKind: "primary" }
      },
      {
        label: yi("rangedAttack"),
        hint: "Prompt for a weapon group",
        handler: "mechAttack",
        disabled: !n,
        dataset: { attackKind: "ranged" }
      },
      {
        label: yi("meleeAttack"),
        hint: "Prompt for a melee profile",
        handler: "mechAttack",
        disabled: !s,
        dataset: { attackKind: "melee" }
      },
      {
        label: yi("dodgeCheck"),
        hint: "Piloting response",
        handler: "mechRoll",
        disabled: !1,
        dataset: { rollKind: "dodge" }
      },
      {
        label: yi("pilotingCheck"),
        hint: "Vehicle handling test",
        handler: "mechRoll",
        disabled: !1,
        dataset: { rollKind: "piloting" }
      },
      {
        label: yi("sensorSweep"),
        hint: "Perception or technician",
        handler: "mechRoll",
        disabled: !t.hasSensorSweep,
        dataset: { rollKind: "sensor" }
      },
      {
        label: yi("emergencyRepair"),
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
      summaryStats: Js([
        { label: "Weapons", value: Array.isArray(s.weapons) ? s.weapons.length : 0, emphasis: "strong" },
        { label: "Missing", value: Array.isArray(s.missingWeaponIds) ? s.missingWeaponIds.length : 0 }
      ]),
      detailTags: Zl([
        s.isPrimary ? "Primary" : "",
        ...Array.isArray(s.weapons) ? s.weapons.map((r) => {
          var l;
          return ((l = r.system) == null ? void 0 : l.weaponCategory) ?? "";
        }) : []
      ]),
      detailRows: ec([
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
    var r, l, o, c, u;
    const t = ((l = (r = this.actor.system) == null ? void 0 : r.mwd) == null ? void 0 : l.loadout) ?? {}, i = ((o = w == null ? void 0 : w.mwd) == null ? void 0 : o.hardpointType) ?? {}, n = ((c = w == null ? void 0 : w.mwd) == null ? void 0 : c.hardpointSize) ?? {}, s = ((u = w == null ? void 0 : w.mwd) == null ? void 0 : u.hardpointLocation) ?? {};
    return Array.from(t.hardpoints ?? []).map((d) => ({
      id: d.id,
      name: `${i[d.type] ?? vt(d.type)} ${n[d.size] ?? vt(d.size)}`,
      subtitle: s[d.location] ?? vt(d.location),
      summaryStats: Js([
        { label: "Type", value: i[d.type] ?? vt(d.type), emphasis: "strong" },
        { label: "Size", value: n[d.size] ?? vt(d.size) }
      ]),
      detailTags: Zl([
        d.occupiedByName ? `Occupied by ${d.occupiedByName}` : "Open"
      ]),
      detailRows: ec([
        { label: "Location", value: s[d.location] ?? vt(d.location) },
        { label: "Assigned Group", value: d.occupiedByName ?? "Unassigned" }
      ])
    }));
  }
  async _onMechAttack(t, i) {
    var l, o, c, u, d, m, f, p;
    (l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const n = this.getPersistentActor() ?? this.actor, s = String(((c = i == null ? void 0 : i.dataset) == null ? void 0 : c.attackKind) ?? "").trim(), r = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.groupId) ?? "").trim();
    try {
      if (s === "group" && r)
        await E(this, an, Fr).call(this, n, r);
      else if (s === "primary") {
        const h = (((d = n.system) == null ? void 0 : d.weaponGroups) ?? []).find((g) => g == null ? void 0 : g.isPrimary) ?? null;
        h != null && h.id ? await E(this, an, Fr).call(this, n, h.id) : await ((m = n.rollRangedAttack) == null ? void 0 : m.call(n));
      } else s === "melee" ? await ((f = n.rollMeleeAttack) == null ? void 0 : f.call(n)) : await ((p = n.rollRangedAttack) == null ? void 0 : p.call(n));
    } catch (h) {
      console.error("MWD | Failed to launch BattleMech attack", h), Ja(h, "Unable to launch that BattleMech attack.");
    }
  }
  async _onMechRoll(t, i) {
    var r, l, o, c, u, d, m;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t);
    const n = this.getPersistentActor() ?? this.actor, s = String(((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.rollKind) ?? "").trim();
    try {
      s === "dodge" ? await ((c = n.rollDodge) == null ? void 0 : c.call(n)) : s === "piloting" ? await ((u = n.rollPilotingCheck) == null ? void 0 : u.call(n)) : s === "sensor" ? await ((d = n.rollSensorSweep) == null ? void 0 : d.call(n)) : s === "repair" && await ((m = n.rollEmergencyRepair) == null ? void 0 : m.call(n));
    } catch (f) {
      console.error("MWD | Failed to launch BattleMech check", f), Ja(f, "Unable to launch that BattleMech check.");
    }
  }
};
an = new WeakSet(), Fr = async function(t, i) {
  var l, o, c, u, d, m;
  const n = Array.from(((l = t.system) == null ? void 0 : l.weaponGroups) ?? []).find((f) => String((f == null ? void 0 : f.id) ?? "").trim() === String(i ?? "").trim()) ?? null;
  if (!n) {
    (o = ui.notifications) == null || o.warn("That weapon group is no longer available.");
    return;
  }
  const s = Array.from(n.weaponIds ?? []).map((f) => t.items.get(f)).filter(Boolean);
  if (!s.length) {
    (c = ui.notifications) == null || c.warn("That weapon group has no attached weapons.");
    return;
  }
  if (typeof t._rollQuickSkill != "function") {
    await ((u = t.rollRangedAttack) == null ? void 0 : u.call(t));
    return;
  }
  const r = typeof t._serializeWeaponGroup == "function" ? t._serializeWeaponGroup(n, s) : {
    id: n.id,
    name: n.name,
    isPrimary: !!n.isPrimary,
    weaponNames: s.map((f) => f.name)
  };
  await t._rollQuickSkill((m = (d = t.system) == null ? void 0 : d.skills) == null ? void 0 : m.gunnery, {
    quickAction: {
      title: yi("rangedAttack"),
      weaponGroup: r
    }
  });
}, O(Bt, "LAYOUT_ID", "battlemech"), O(Bt, "PARTS", {
  sheet: {
    get template() {
      return `${Q}/v2/actor/battlemech-sheet.hbs`;
    }
  }
}), O(Bt, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Vt(Bt, Bt, "DEFAULT_OPTIONS"), {
  classes: ["battlemech-sheet", T, "actor-sheet-v2", "mwd-battlemech-sheet", "mwd-sheet"],
  position: { width: 980, height: 940 },
  actions: {
    ...Vt(Bt, Bt, "DEFAULT_OPTIONS").actions,
    mechAttack: Bt.prototype._onMechAttack,
    mechRoll: Bt.prototype._onMechRoll
  }
}));
let zr = Bt;
function Db() {
  console.log(`${be}Registering Actor sheets (V2)`);
  const { Actors: a } = foundry.documents.collections;
  a.registerSheet(T, Lr, {
    types: ["character"],
    makeDefault: !0,
    label: "Character (V2)"
  }), a.registerSheet(T, Cd, {
    types: ["npc"],
    makeDefault: !0,
    label: "NPC (V2)"
  }), a.registerSheet(T, es, {
    types: ["vehicle"],
    makeDefault: !0,
    label: "Vehicle (V2)"
  }), a.registerSheet(T, zr, {
    types: ["battlemech"],
    makeDefault: !0,
    label: "BattleMech (V2)"
  });
}
const { HandlebarsApplicationMixin: Ob } = foundry.applications.api, { HTMLField: tc, StringField: _b } = foundry.data.fields, Xs = /* @__PURE__ */ new Set(["system.notes", "system.description"]), Lb = /* @__PURE__ */ new Set(["name"]), xb = Object.freeze({
  [A.itemType.personalWeapon]: `${Q}/v2/item/personal-weapon-root.hbs`,
  [A.itemType.mechWeapon]: `${Q}/v2/item/mech-weapon-root.hbs`,
  [A.itemType.armor]: `${Q}/v2/item/armor-root.hbs`
});
function Zs(a, e) {
  const t = new a({ required: !1, blank: !0, initial: "" });
  return t.name = e, t;
}
function $b(a = {}) {
  return {
    ...a,
    sourceReference: a.sourceReference ?? Zs(_b, "system.sourceReference"),
    notes: a.notes ?? Zs(tc, "system.notes"),
    description: a.description ?? Zs(tc, "system.description")
  };
}
function Bb(a = {}) {
  return Object.fromEntries(
    Object.entries(a ?? {}).filter(([, e]) => e !== void 0)
  );
}
var Hi, Mi, Wi, ya, Zt, Fa, Ur;
const We = class We extends Ob(foundry.applications.sheets.ItemSheetV2) {
  constructor() {
    super(...arguments);
    Ae(this, Zt);
    Ae(this, Hi, /* @__PURE__ */ new Map());
    Ae(this, Mi, /* @__PURE__ */ new Map());
    Ae(this, Wi, null);
    Ae(this, ya, /* @__PURE__ */ new Map());
    /** @override */
    O(this, "tabGroups", {
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
        editImage: We._onEditImage,
        tab: We.prototype._onClickTab,
        accordion: We.prototype._onClickAccordion,
        checkbarElement: We._onClickCheckbar,
        modifierAdd: We._onModifierAdd,
        modifierDelete: We._onModifierDelete,
        modifierValueChange: We._onModifierValueChange,
        modifierConditionChange: We._onModifierConditionChange,
        modifierSelectionChange: We._onModifierSelectionChange,
        effectCreate: We._onEffectCreate,
        effectEdit: We._onEffectEdit,
        effectDelete: We._onEffectDelete,
        effectToggleDisabled: We._onEffectToggleDisabled
      },
      form: {
        submitOnChange: !1,
        closeOnSubmit: !1,
        handler: We.prototype._onSubmitForm
      }
    }, { inplace: !1 });
  }
  static get defaultOptions() {
    return this.DEFAULT_OPTIONS;
  }
  _initializeApplicationOptions(t) {
    var r, l, o, c;
    t = super._initializeApplicationOptions(t), t.classes = Array.from(t.classes ?? []);
    const i = this._getCanonicalItemTypeFromOptions(t);
    i && t.classes.push(String(i));
    const n = ((c = (o = (l = (r = game.system) == null ? void 0 : r.mwd) == null ? void 0 : l.styles) == null ? void 0 : o.selectCssClass) == null ? void 0 : c.call(o)) ?? "mwd-theme-default", s = ["mwd-theme-default", "mwd-theme-sra"];
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
      return xb[n] ?? `${Q}/v2/item/${n}.hbs`;
    }
    return ((i = super._getPartTemplate) == null ? void 0 : i.call(this, t)) ?? "";
  }
  /**
   * Override title to show localized item type and name.
   * @override
   */
  get title() {
    const t = this._getCanonicalItemType();
    return `${Pe.itemType.singular[t] ?? t}: ${this.item.name}`;
  }
  /**
   * Prepare context data for rendering.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The context object
   * @override
   */
  async _prepareContext(t) {
    var P, U, K, Y, W, j, L, B, G;
    const i = await super._prepareContext(t), n = ((U = (P = game.system.mwd.modifiers) == null ? void 0 : P.getEnums) == null ? void 0 : U.call(P)) ?? {}, s = foundry.utils.deepClone((i == null ? void 0 : i.options) ?? {}), r = $b((i == null ? void 0 : i.fields) ?? ((Y = (K = this.item.system) == null ? void 0 : K.schema) == null ? void 0 : Y.fields) ?? {}), l = ((j = (W = this.item.actor) == null ? void 0 : W.getAttributes) == null ? void 0 : j.call(W, this.item)) ?? [], o = this._getCanonicalItemType(), c = !this.item.actor, u = !!this.item.actor, d = Pe.itemType.singular[o] ?? o, m = this._getEffectEntries(), f = m.filter((X) => X.syncedCount > 0).length, p = this.constructor.LAYOUT_ID, h = this.item.actor ? (X) => l.includes(X) : (X) => !0, g = o === A.itemType.skill, b = ["mwd", "item-sheet", this.isEditable ? "editable" : "locked"], S = b.join(" ");
    s.classes = b, s.cssClass = S;
    const v = async (X, { secrets: oe = this.item.isOwner } = {}) => foundry.applications.ux.TextEditor.implementation.enrichHTML(X ?? "", {
      async: !0,
      secrets: oe,
      relativeTo: this.item
    }), M = foundry.utils.expandObject({
      "system.notes": await v(this.item.system.notes ?? ""),
      "system.description": await v(this.item.system.description ?? "")
    }), N = {
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
        ...ye.getEnums(h, g),
        ...n
      },
      MWD: Pe,
      itemSheet: {
        canonicalType: o,
        typeLabel: d,
        isArmorSheet: o === A.itemType.armor,
        isStandalone: c,
        canUseActorControls: u,
        supportsEffectSync: !!((G = (B = this.item).supportsEquippedEffectSync) != null && G.call(B)),
        effectEntries: m,
        effectCount: m.length,
        syncedEffectCount: f,
        summaryChips: this._getSummaryChips(),
        stateChips: this._getStateChips(m)
      },
      cssClass: S,
      tabs: this._getTabs()
    };
    return p && (N.layout = await Ji.get(p)), N;
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
      tone: t.some((l) => l.syncedCount > 0) ? "active" : "muted"
    }), i;
  }
  _getEffectEntries() {
    var n, s, r, l, o, c;
    const t = /* @__PURE__ */ new Map(), i = ((s = (n = this.item).getSyncedActorEffects) == null ? void 0 : s.call(n)) ?? [];
    for (const u of i) {
      const d = (o = (l = (r = u.flags) == null ? void 0 : r[T]) == null ? void 0 : l.equippedItemSync) == null ? void 0 : o.sourceEffectId;
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
    var o, c, u;
    const n = ((o = i == null ? void 0 : i.closest) == null ? void 0 : o.call(i, ".csb-tab-link[data-tab]")) ?? ((u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, ".csb-tab-link[data-tab]"));
    if (!n) return;
    const s = n.closest(".csb-tabs");
    if (!s) return;
    const r = s.dataset.group || "default", l = n.dataset.tab;
    l && (z(this, Hi).set(r, l), E(this, Zt, Fa).call(this, this._getRootElement(), r, l));
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const n = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!n) return;
    const s = n.dataset.section, r = n.closest(".csb-accordion");
    if (!r || !s) return;
    const l = r.dataset.group || "default", c = (z(this, Mi).has(l) ? z(this, Mi).get(l) : r.dataset.default || null) === s ? null : s;
    z(this, Mi).set(l, c), E(this, Zt, Ur).call(this, r, c);
  }
  _onRender(t, i) {
    var r, l, o, c;
    (r = super._onRender) == null || r.call(this, t, i), (l = this.window) != null && l.title && (this.window.title.textContent = this.title);
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
          b && (z(this, Hi).set(d, b), E(this, Zt, Fa).call(this, n, d, b));
        });
      const f = z(this, Hi).get(d), p = u.dataset.default || ((o = m[0]) == null ? void 0 : o.dataset.tab), h = f || p;
      h && E(this, Zt, Fa).call(this, n, d, h);
    }
    for (const u of n.querySelectorAll(".csb-tabs")) {
      const d = u.dataset.group || "default", m = Array.from(u.querySelectorAll(".csb-tab-link[data-tab]"));
      if (!m.length) continue;
      const f = z(this, Hi).get(d), p = u.dataset.default || ((c = m[0]) == null ? void 0 : c.dataset.tab), h = f || p;
      h && E(this, Zt, Fa).call(this, n, d, h);
    }
    for (const u of n.querySelectorAll(".csb-accordion")) {
      const d = u.dataset.group || "default", m = z(this, Mi).has(d) ? z(this, Mi).get(d) : u.dataset.default || null;
      E(this, Zt, Ur).call(this, u, m);
    }
    for (const u of n.querySelectorAll("prose-mirror[name]")) {
      const d = u.getAttribute("name") ?? "";
      Xs.has(d) && u.addEventListener("change", (m) => {
        m.preventDefault(), m.stopPropagation(), this._updateRichTextField(u);
      });
    }
    if (this.isEditable)
      for (const u of n.querySelectorAll("input[name], select[name], textarea[name]")) {
        if (u.closest("prose-mirror") || u.hasAttribute("data-action") || !(u instanceof HTMLElement)) continue;
        const d = String(u.getAttribute("name") ?? "").trim();
        u instanceof HTMLInputElement && !Lb.has(d) && !["checkbox", "radio"].includes(u.type) ? u.addEventListener("input", (m) => {
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
    if (!this.isEditable || !Xs.has(i)) return;
    const n = String(t.value ?? ""), s = String(foundry.utils.getProperty(this.item, i) ?? "");
    if (n !== s)
      try {
        await this.item.update({ [i]: n });
      } catch (l) {
        console.warn("MWD | Rich text item update failed:", l);
      }
  }
  _queueNamedFieldSync(t, i = {}) {
    var l;
    if (!this.isEditable) return;
    const n = String(((l = t == null ? void 0 : t.getAttribute) == null ? void 0 : l.call(t, "name")) ?? "").trim() || foundry.utils.randomID(), s = z(this, ya).get(n);
    s && clearTimeout(s);
    const r = setTimeout(() => {
      z(this, ya).delete(n), this._syncNamedField(t, i);
    }, 180);
    z(this, ya).set(n, r);
  }
  _getNamedFieldUpdate(t) {
    var s, r;
    if (!(t instanceof HTMLElement)) return null;
    const i = String(((s = t.getAttribute) == null ? void 0 : s.call(t, "name")) ?? "").trim();
    if (!i || Xs.has(i)) return null;
    if (t instanceof HTMLInputElement) {
      if (t.type === "radio" && !t.checked) return null;
      if (t.type === "checkbox") return { [i]: t.checked };
      if (t.type === "number") {
        const l = Number(t.value);
        return Number.isFinite(l) ? { [i]: l } : null;
      }
    }
    const n = String(((r = t.dataset) == null ? void 0 : r.dtype) ?? "").trim().toLowerCase();
    if (n === "number") {
      const l = Number(t.value);
      return Number.isFinite(l) ? { [i]: l } : null;
    }
    return n === "boolean" ? { [i]: t.value === "true" } : { [i]: String(t.value ?? "") };
  }
  async _syncNamedField(t, i = {}) {
    if (!this.isEditable) return;
    const n = this._getNamedFieldUpdate(t), s = Bb({
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
      Ie(this, Wi, null);
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
    Ie(this, Wi, i.length ? i : null);
  }
  _restoreScrollPositions() {
    const t = z(this, Wi);
    if (!(t != null && t.length)) return;
    const i = () => {
      const n = this._getRootElement();
      if (n)
        for (const s of t) {
          const r = n.querySelectorAll(s.selector).item(s.index);
          r instanceof HTMLElement && (r.scrollTop = s.top, r.scrollLeft = s.left);
        }
    };
    i(), requestAnimationFrame(i), Ie(this, Wi, null);
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
    const r = s.dataset.monitorCode, l = Number.parseInt(i.dataset.index), o = i.dataset.checked === "true";
    await n.parent.switchMonitorCheck(r, l, o);
  }
  static async _onEditImage(t) {
    var s, r, l;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t), !this.isEditable) return;
    const i = foundry.applications.apps.FilePicker.implementation;
    new i({
      type: "image",
      current: ((l = this.item) == null ? void 0 : l.img) ?? "",
      callback: async (o) => {
        o && await this.item.update({ img: o });
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
    var s, r, l;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const [n] = await this.item.createEmbeddedDocuments("ActiveEffect", [{
      name: `${this.item.name} Effect`,
      img: this.item.img || "icons/svg/aura.svg",
      disabled: !1,
      transfer: !1,
      changes: []
    }]);
    (l = n == null ? void 0 : n.sheet) == null || l.render(!0);
  }
  static async _onEffectEdit(t, i) {
    var r, l, o, c, u, d, m;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t);
    const n = ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.effectId) ?? ((d = (u = (c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : d.effectId);
    if (!n) return;
    const s = this.item.effects.get(n);
    (m = s == null ? void 0 : s.sheet) == null || m.render(!0);
  }
  static async _onEffectDelete(t, i) {
    var s, r, l, o, c, u;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.effectId) ?? ((u = (c = (o = i == null ? void 0 : i.closest) == null ? void 0 : o.call(i, "[data-effect-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.effectId);
    n && await this.item.deleteEmbeddedDocuments("ActiveEffect", [n]);
  }
  static async _onEffectToggleDisabled(t, i) {
    var r, l, o, c, u, d;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t);
    const n = ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.effectId) ?? ((d = (u = (c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : d.effectId);
    if (!n) return;
    const s = this.item.effects.get(n);
    s && await s.update({ disabled: !s.disabled });
  }
};
Hi = new WeakMap(), Mi = new WeakMap(), Wi = new WeakMap(), ya = new WeakMap(), Zt = new WeakSet(), Fa = function(t, i, n) {
  t && (t.querySelectorAll(`.csb-tabs[data-group="${i}"] .csb-tab-link[data-tab]`).forEach((s) => {
    s.classList.toggle("is-active", s.dataset.tab === n);
  }), t.querySelectorAll(`.csb-tabs[data-group="${i}"] .csb-tab-panel[data-tab]`).forEach((s) => {
    s.classList.toggle("is-active", s.dataset.tab === n);
  }), t.querySelectorAll(".sheet-tabs [data-tab]").forEach((s) => {
    var l;
    (((l = s.closest(".sheet-tabs")) == null ? void 0 : l.dataset.group) || "default") === i && s.classList.toggle("active", s.dataset.tab === n);
  }), t.querySelectorAll(`.tab[data-group="${i}"]`).forEach((s) => {
    s.classList.toggle("active", s.dataset.tab === n);
  }));
}, Ur = function(t, i) {
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
}, O(We, "LAYOUT_ID", null), /** @override */
O(We, "PARTS", {
  sheet: {
    template: "",
    // Set dynamically in _getPartTemplate
    scrollable: [".sheet-body"]
  }
}), O(We, "TABS", {
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
let ii = We;
class Hr extends ii {
}
O(Hr, "LAYOUT_ID", "contact"), O(Hr, "PARTS", {
  sheet: {
    template: `${Q}/v2/item/contact.hbs`,
    scrollable: [".sheet-body"]
  }
});
const zb = Object.freeze([
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
]), Fb = Object.freeze([
  { value: "ammo", label: "Ammunition" },
  { value: "explosive", label: "Explosive" },
  { value: "medical", label: "Medical" },
  { value: "repair", label: "Repair" },
  { value: "fuel", label: "Fuel / Power Cell" },
  { value: "utility", label: "Utility" }
]);
function Ub(a) {
  return a === "consumable" ? Fb : zb;
}
class Wr extends ii {
  async _prepareContext(e) {
    var r;
    const t = await super._prepareContext(e), i = this._getCanonicalItemType(), n = this.item.system ?? {}, s = Ub(i);
    return t.system = {
      ...n,
      quantity: Math.max(0, Math.trunc(Number(n.quantity ?? 1) || 0)),
      rating: Math.max(0, Math.trunc(Number(n.rating ?? 0) || 0)),
      category: String(n.category ?? "").trim(),
      tags: Array.isArray(n.tags) ? n.tags.map((l) => String(l ?? "").trim()).filter(Boolean) : []
    }, t.gearEditor = {
      categories: s.map((l) => ({ ...l }))
    }, t.tagsText = t.system.tags.join(", "), t.itemSheet = {
      ...t.itemSheet ?? {},
      summaryChips: [
        { label: "Qty", value: String(t.system.quantity) },
        { label: "Rating", value: String(t.system.rating) },
        {
          label: "Category",
          value: ((r = s.find((l) => l.value === t.system.category)) == null ? void 0 : r.label) ?? "Uncategorized"
        }
      ]
    }, t.layout = await Ji.get(i === "consumable" ? "consumable" : "gear"), t;
  }
}
// One sheet class intentionally backs both gear and consumables so quantity,
// rating, and reference editing never drift into parallel implementations.
O(Wr, "LAYOUT_ID", null), O(Wr, "PARTS", {
  sheet: {
    template: `${Q}/v2/item/gear.hbs`,
    scrollable: [".sheet-body"]
  }
});
class jr extends ii {
  async _prepareContext(e) {
    var r, l;
    const t = await super._prepareContext(e), i = Ht(this.item.system ?? {}), n = yu(), s = Array.isArray((r = t.ENUMS) == null ? void 0 : r.skills) ? t.ENUMS.skills.map((o) => ({
      value: String((o == null ? void 0 : o.value) ?? "").trim(),
      label: String((o == null ? void 0 : o.label) ?? (o == null ? void 0 : o.value) ?? "").trim()
    })).filter((o) => o.value) : [];
    return t.system = {
      ...i,
      effects: (Array.isArray(i.effects) ? i.effects : []).map((o) => ({
        ...o,
        showSkillPicker: gu(o) || Array.isArray(o.skillKeys) && o.skillKeys.length > 0,
        isEdgeEvent: o.type === "edgeEvent"
      }))
    }, t.traitEditor = {
      ...n,
      skills: s
    }, t.itemSheet = {
      ...t.itemSheet ?? {},
      sheetClass: "mwd-item-sheet--quality",
      summaryChips: [
        { label: "Category", value: kn(i.category) },
        { label: "Tier", value: En(i.tier) },
        { label: "Activation", value: String(i.activation ?? "passive").trim() || "Passive" },
        { label: "Effects", value: String(((l = i.effects) == null ? void 0 : l.length) ?? 0) }
      ]
    }, t.tagsText = Array.isArray(i.tags) ? i.tags.join(", ") : "", t;
  }
  _onRender(e, t) {
    var s, r;
    (s = super._onRender) == null || s.call(this, e, t);
    const i = (r = this._getRootElement) == null ? void 0 : r.call(this);
    if (!i) return;
    const n = (l) => {
      var o;
      return (o = this._captureScrollPositions) == null || o.call(this), l();
    };
    i.querySelectorAll(".mwd-quality-prereq-add").forEach((l) => {
      l.addEventListener("click", (o) => {
        o.preventDefault(), o.stopPropagation(), n(() => {
          var c, u;
          return (u = (c = this.item).createQualityPrerequisite) == null ? void 0 : u.call(c);
        });
      });
    }), i.querySelectorAll(".mwd-quality-prereq-delete").forEach((l) => {
      l.addEventListener("click", (o) => {
        o.preventDefault(), o.stopPropagation(), n(() => {
          var c, u;
          return (u = (c = this.item).deleteQualityPrerequisite) == null ? void 0 : u.call(c, l.dataset.prereqId);
        });
      });
    }), i.querySelectorAll(".mwd-quality-prereq-field").forEach((l) => {
      l.addEventListener("change", (o) => {
        o.preventDefault(), o.stopPropagation(), n(() => {
          var c, u;
          return (u = (c = this.item).updateQualityPrerequisite) == null ? void 0 : u.call(
            c,
            l.dataset.prereqId,
            l.dataset.field,
            l.value
          );
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-add").forEach((l) => {
      l.addEventListener("click", (o) => {
        o.preventDefault(), o.stopPropagation(), n(() => {
          var c, u;
          return (u = (c = this.item).createQualityEffect) == null ? void 0 : u.call(c);
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-delete").forEach((l) => {
      l.addEventListener("click", (o) => {
        o.preventDefault(), o.stopPropagation(), n(() => {
          var c, u;
          return (u = (c = this.item).deleteQualityEffect) == null ? void 0 : u.call(c, l.dataset.effectId);
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-field").forEach((l) => {
      l.addEventListener("change", (o) => {
        o.preventDefault(), o.stopPropagation(), n(() => {
          var c, u;
          return (u = (c = this.item).updateQualityEffect) == null ? void 0 : u.call(
            c,
            l.dataset.effectId,
            l.dataset.field,
            l instanceof HTMLSelectElement && l.multiple ? Array.from(l.selectedOptions).map((d) => d.value) : l.value
          );
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-skill-toggle").forEach((l) => {
      l.addEventListener("change", (o) => {
        o.preventDefault(), o.stopPropagation();
        const c = l.dataset.effectId, u = Array.from(i.querySelectorAll(`.mwd-quality-effect-skill-toggle[data-effect-id="${c}"]`)).filter((d) => d instanceof HTMLInputElement && d.checked).map((d) => d.value);
        n(() => {
          var d, m;
          return (m = (d = this.item).updateQualityEffect) == null ? void 0 : m.call(
            d,
            c,
            l.dataset.field,
            u
          );
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-condition-add").forEach((l) => {
      l.addEventListener("click", (o) => {
        o.preventDefault(), o.stopPropagation(), n(() => {
          var c, u;
          return (u = (c = this.item).createQualityEffectCondition) == null ? void 0 : u.call(c, l.dataset.effectId);
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-condition-delete").forEach((l) => {
      l.addEventListener("click", (o) => {
        o.preventDefault(), o.stopPropagation(), n(() => {
          var c, u;
          return (u = (c = this.item).deleteQualityEffectCondition) == null ? void 0 : u.call(c, l.dataset.effectId, l.dataset.conditionId);
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-condition-field").forEach((l) => {
      l.addEventListener("change", (o) => {
        o.preventDefault(), o.stopPropagation(), n(() => {
          var c, u;
          return (u = (c = this.item).updateQualityEffectCondition) == null ? void 0 : u.call(
            c,
            l.dataset.effectId,
            l.dataset.conditionId,
            l.dataset.field,
            l.value
          );
        });
      });
    });
  }
}
O(jr, "LAYOUT_ID", "quality"), O(jr, "PARTS", {
  sheet: {
    template: `${Q}/v2/item/quality.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Gr extends ii {
}
O(Gr, "LAYOUT_ID", "asset-module"), O(Gr, "PARTS", {
  sheet: {
    template: `${Q}/v2/item/assetModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class qr extends ii {
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
    const e = Va(this.item.system ?? {}), t = Ni(e.catalogId), n = ks(t, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }).map((r) => r.choice).filter(Boolean).map((r) => Ka(r, { includeBonusText: !0 })).join(", "), s = this.item.actor ? Ii(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return [
      { label: "Slot", value: wa(e.moduleType) },
      { label: "Module", value: (t == null ? void 0 : t.label) ?? "Unlinked" },
      { label: "Bonuses", value: n || "Pending choice" },
      s ? { label: "Status", value: s.isActive ? "Active" : "Inactive" } : null
    ].filter(Boolean);
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), i = Va(this.item.system ?? {}), n = i.moduleType, s = Ni(i.catalogId), r = n ? No(n) : [], l = Fu(s, i.selectedGrants, { legacySelectedSkill: i.selectedSkill }), o = this.item.actor ? Ii(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return t.lifeModuleEditor = {
      moduleType: n,
      moduleTypeLabel: wa(n),
      moduleTypes: Lu().map((c) => ({
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
      grantFields: l,
      requiresAnyLabels: ((s == null ? void 0 : s.requiresAny) ?? []).map((c) => {
        var u;
        return ((u = Ni(c)) == null ? void 0 : u.label) ?? c;
      }),
      excludesAnyLabels: ((s == null ? void 0 : s.excludesAny) ?? []).map((c) => {
        var u;
        return ((u = Ni(c)) == null ? void 0 : u.label) ?? c;
      }),
      actorState: o,
      warningLabels: [...(o == null ? void 0 : o.warningLabels) ?? []],
      isOwned: !!this.item.actor,
      statusLabel: o ? o.isActive ? "Active" : "Inactive" : s ? "Configured" : "Unlinked",
      statusReason: (o == null ? void 0 : o.inactiveReason) ?? ""
    }, t;
  }
}
O(qr, "LAYOUT_ID", "life-module"), O(qr, "PARTS", {
  sheet: {
    template: `${Q}/v2/item/lifeModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Kr extends ii {
}
O(Kr, "LAYOUT_ID", "skill"), O(Kr, "PARTS", {
  sheet: {
    template: `${Q}/v2/item/skill.hbs`,
    scrollable: [".sheet-body"]
  }
});
const Hb = Object.freeze([
  "firearms",
  "projectileWeapons",
  "heavyWeapons",
  "meleeCombat"
]), Wb = Object.freeze([
  { value: "energy", label: "Energy" },
  { value: "kinetic", label: "Kinetic" },
  { value: "ballistic", label: "Ballistic" },
  { value: "explosive", label: "Explosive" },
  { value: "plasma", label: "Plasma" },
  { value: "electrical", label: "Electrical" },
  { value: "melee", label: "Melee" },
  { value: "none", label: "None" }
]), ic = Object.freeze([
  { value: "quantity", label: "Quantity" },
  { value: "durability.current", label: "Durability" },
  { value: "", label: "Custom Path" }
]), jb = "consumable";
function Gb(a) {
  return String((a == null ? void 0 : a.canonicalType) ?? (a == null ? void 0 : a.type) ?? "item").trim().replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (t) => t.toUpperCase());
}
function Nd(a) {
  return String((a == null ? void 0 : a.canonicalType) ?? (a == null ? void 0 : a.type) ?? "").trim() === jb;
}
function qb(a, e = "") {
  var i;
  const t = String(e ?? "").trim();
  return Array.from(((i = a == null ? void 0 : a.actor) == null ? void 0 : i.items) ?? []).filter((n) => {
    const s = String((n == null ? void 0 : n.id) ?? "").trim();
    return !s || s === (a == null ? void 0 : a.id) ? !1 : s === t || Nd(n);
  }).sort((n, s) => String((n == null ? void 0 : n.name) ?? "").localeCompare(String((s == null ? void 0 : s.name) ?? ""))).map((n) => ({
    value: n.id,
    label: `${n.name || "Unnamed Item"} (${Gb(n)})`
  }));
}
function Vr(a, e, t) {
  const i = String(e ?? "").trim();
  return !i || a.some((n) => n.value === i) ? a : a.concat({ value: i, label: t(i) });
}
function Kb(a, e) {
  var d, m, f, p, h, g, y;
  const t = Jt(e), i = qb(a, (d = t.link) == null ? void 0 : d.itemId), n = Um({
    source: t,
    actor: (a == null ? void 0 : a.actor) ?? null
  }), s = ((h = (f = (m = a == null ? void 0 : a.actor) == null ? void 0 : m.items) == null ? void 0 : f.get) == null ? void 0 : h.call(f, ((p = t.link) == null ? void 0 : p.itemId) ?? "")) ?? null, r = Vr(
    [...ic],
    (g = t.link) == null ? void 0 : g.itemPath,
    (b) => `Custom (${b})`
  ), l = new Set(ic.map((b) => String(b.value ?? "").trim())), o = String(((y = t.link) == null ? void 0 : y.itemPath) ?? "").trim(), c = !!(a != null && a.actor);
  let u = "";
  return t.kind === "itemRef" && (c ? i.length ? s ? Nd(s) ? o ? u = n.isTracked ? `Linked to ${s.name} | Available ${Number(n.current ?? 0)}` : `Linked to ${s.name} | Path not resolving to a tracked value yet.` : u = `Linked to ${s.name}. Pick which field should be consumed.` : u = `Linked to ${s.name} | Legacy non-consumable source. Repoint this to a Consumable item when convenient.` : u = "Pick an owned Consumable item to consume from." : u = "Add an owned Consumable item to the actor, then link this weapon to it." : u = "Embed this weapon in an actor to link it to owned inventory."), {
    ...t,
    resolvedState: n,
    ui: {
      ownedItemOptions: i,
      itemPathOptions: r,
      hasOwnedActor: c,
      linkedItemName: (s == null ? void 0 : s.name) ?? "",
      showCustomItemPath: t.kind === "itemRef" && !l.has(o),
      preview: u
    }
  };
}
class Ns extends ii {
  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        weaponSkillChange: Ns._onWeaponSkillChange
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
    var o, c, u, d, m, f, p;
    const t = await super._prepareContext(e), i = this._getCanonicalItemType();
    t.ENUMS = {
      ...t.ENUMS ?? {},
      defenses: Ne.getDefenses()
    };
    const n = Array.isArray((o = t.ENUMS) == null ? void 0 : o.skills) ? t.ENUMS.skills : [], s = (c = this.item.system) == null ? void 0 : c.skill, r = (u = this.item.system) == null ? void 0 : u.damageType, l = i === "personalWeapon" ? Vr(
      n.filter((h) => Hb.includes(h.value)),
      s,
      (h) => {
        var g;
        return ((g = n.find((y) => y.value === h)) == null ? void 0 : g.label) ?? h;
      }
    ) : n;
    return t.weaponProfile = ((m = (d = this.item).getCombatProfile) == null ? void 0 : m.call(d)) ?? null, t.weaponEditor = {
      skills: l,
      categories: [
        { value: "melee", label: "Melee" },
        { value: "ranged", label: "Ranged" },
        { value: "thrown", label: "Thrown" },
        { value: "other", label: "Other" }
      ],
      damageTypes: Vr(
        i === "personalWeapon" ? [...Wn] : [...Wb],
        r,
        (h) => i === "personalWeapon" ? qt(h) : h
      ),
      ranges: Mt.RANGE_ORDER.map((h) => ({
        value: h,
        label: i === "personalWeapon" ? Qn(h) : h.charAt(0).toUpperCase() + h.slice(1)
      })),
      rangeBandLabels: Object.fromEntries(Mt.RANGE_ORDER.map((h) => [
        h,
        i === "personalWeapon" ? Qn(h) : h.charAt(0).toUpperCase() + h.slice(1)
      ])),
      weaponCapabilityOptions: Qd,
      payloadCapabilityOptions: Jd,
      ammoDamageTypes: [{ value: "", label: "Use Weapon Default" }, ...Wn],
      payloadTemplateShapes: gc,
      payloadTemplatePlacements: yc,
      areaEffectKinds: [
        { value: ut.discrete, label: "Discrete" },
        { value: ut.persistent, label: "Persistent Hazard" }
      ],
      exposureTiers: [
        { value: ie.minor, label: "Minor" },
        { value: ie.major, label: "Major" },
        { value: ie.full, label: "Full" }
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
      consumptionSources: Array.isArray((f = this.item.system) == null ? void 0 : f.consumptionSources) ? this.item.system.consumptionSources.map((h) => Kb(this.item, h)) : []
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
const fa = class fa extends Ns {
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
        attackWeapon: fa._onAttackWeapon,
        reloadWeaponPayload: fa._onReloadWeaponPayload
      }
    }, { inplace: !1 });
  }
  async _prepareContext(e) {
    var r, l, o;
    const t = await super._prepareContext(e), i = this.item.actor ?? null, n = t.weaponProfile ?? null, s = !!(i && typeof i.isCharacterLike == "function" && i.isCharacterLike() && ((l = (r = this.item).isPersonalWeapon) != null && l.call(r)));
    return t.itemSheet = {
      ...t.itemSheet ?? {},
      canAttack: s,
      attackDisabled: !s || !((o = this.item.system) != null && o.equipped)
    }, t.itemSheet.summaryChips = this._getSummaryChips(n), t.itemSheet.reloadState = this._getReloadDisplayState(n), t;
  }
  _getReloadDisplayState(e = ((t) => ((i) => (i = (t = this.item).getCombatProfile) == null ? void 0 : i.call(t))())() ?? null) {
    var d, m, f, p, h;
    const n = ((m = (d = this.item).canReloadActivePayload) == null ? void 0 : m.call(d, { detailed: !0 })) ?? { canReload: !1, reason: "" }, s = !!((f = e == null ? void 0 : e.sourceState) != null && f.isTracked), r = String((e == null ? void 0 : e.payloadLabel) ?? (n == null ? void 0 : n.payloadLabel) ?? "").trim() || "Unloaded", l = Number(((p = e == null ? void 0 : e.sourceState) == null ? void 0 : p.current) ?? (n == null ? void 0 : n.current) ?? 0) || 0, o = Number(((h = e == null ? void 0 : e.sourceState) == null ? void 0 : h.max) ?? (n == null ? void 0 : n.max) ?? 0) || 0, c = s ? `${r} ${l}/${o}` : r, u = n.canReload ? "Click to reload" : String(n.reason ?? "").trim() || "Payload read-only";
    return {
      canReload: !!n.canReload,
      disabled: !n.canReload,
      value: c,
      hint: u,
      title: n.canReload ? `Reload ${r}` : u
    };
  }
  _getSummaryChips(e = ((t) => ((i) => (i = (t = this.item).getCombatProfile) == null ? void 0 : i.call(t))())() ?? null) {
    var s, r, l;
    if (!e) return [];
    const n = [
      { label: "Category", value: String(e.category ?? "").trim() || "Ranged" },
      { label: "Skill", value: ((s = e.skillDef) == null ? void 0 : s.label) ?? e.skill ?? "Firearms" },
      { label: "DV", value: String(Number(e.damage ?? 0)) },
      { label: "AP", value: String(Number(e.ap ?? 0)) },
      { label: "Type", value: qt(e.damageType) || "Penetrating" },
      { label: "Range", value: String(((r = e.range) == null ? void 0 : r.max) ?? "near").trim() || "Near" }
    ];
    return String(e.category ?? "").trim().toLowerCase() !== "melee" && n.push((l = e == null ? void 0 : e.sourceState) != null && l.isTracked ? { label: "Payload", value: `${(e == null ? void 0 : e.payloadLabel) || "Unloaded"} (${Number(e.sourceState.current ?? 0)}/${Number(e.sourceState.max ?? 0)})` } : { label: "Payload", value: (e == null ? void 0 : e.payloadLabel) || "Unloaded" }), n;
  }
  static async _onAttackWeapon(e) {
    var i, n, s, r;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), !(!(this.item.actor ?? null) || !((r = (s = this.item).isPersonalWeapon) != null && r.call(s))) && await Ps({ weapon: this.item, event: e });
  }
  static async _onReloadWeaponPayload(e) {
    var i, n, s, r, l, o, c, u;
    if ((i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), !((r = (s = this.item) == null ? void 0 : s.isPersonalWeapon) != null && r.call(s))) return;
    (l = this._captureScrollPositions) == null || l.call(this);
    const t = await ((c = (o = this.item).reloadActivePayload) == null ? void 0 : c.call(o));
    t != null && t.ok || (u = ui.notifications) == null || u.warn((t == null ? void 0 : t.reason) ?? "Unable to reload that weapon.");
  }
  _onRender(e, t) {
    var s, r;
    (s = super._onRender) == null || s.call(this, e, t);
    const i = (r = this._getRootElement) == null ? void 0 : r.call(this);
    if (!i) return;
    const n = (l) => {
      var o;
      return (o = this._captureScrollPositions) == null || o.call(this), l();
    };
    i.querySelectorAll(".mwd-payload-add").forEach((l) => {
      l.addEventListener("click", (o) => {
        o.preventDefault(), n(() => {
          var c, u;
          return (u = (c = this.item).createPayload) == null ? void 0 : u.call(c);
        });
      });
    }), i.querySelectorAll(".mwd-payload-delete").forEach((l) => {
      l.addEventListener("click", (o) => {
        o.preventDefault(), n(() => {
          var c, u;
          return (u = (c = this.item).deletePayload) == null ? void 0 : u.call(c, l.dataset.payloadId);
        });
      });
    }), i.querySelectorAll(".mwd-payload-field").forEach((l) => {
      l.addEventListener("change", (o) => {
        o.preventDefault(), n(() => {
          var c, u;
          return (u = (c = this.item).updatePayloadField) == null ? void 0 : u.call(
            c,
            l.dataset.payloadId,
            l.dataset.field,
            l.value
          );
        });
      });
    }), i.querySelectorAll(".mwd-source-add").forEach((l) => {
      l.addEventListener("click", (o) => {
        o.preventDefault(), n(() => {
          var c, u;
          return (u = (c = this.item).createConsumptionSource) == null ? void 0 : u.call(c);
        });
      });
    }), i.querySelectorAll(".mwd-source-delete").forEach((l) => {
      l.addEventListener("click", (o) => {
        o.preventDefault(), n(() => {
          var c, u;
          return (u = (c = this.item).deleteConsumptionSource) == null ? void 0 : u.call(c, l.dataset.sourceId);
        });
      });
    }), i.querySelectorAll(".mwd-source-field").forEach((l) => {
      l.addEventListener("change", (o) => {
        o.preventDefault(), n(() => {
          var c, u;
          return (u = (c = this.item).updateConsumptionSourceField) == null ? void 0 : u.call(
            c,
            l.dataset.sourceId,
            l.dataset.field,
            l.value
          );
        });
      });
    }), i.querySelectorAll(".mwd-capability-picker").forEach((l) => {
      l.addEventListener("change", (o) => {
        o.preventDefault();
        const c = String(l.value ?? "").trim();
        if (!c) return;
        const u = String(l.dataset.values ?? "").split(",").map((p) => p.trim()).filter(Boolean), d = Array.from(/* @__PURE__ */ new Set([...u, c]));
        l.value = "";
        const m = String(l.dataset.payloadId ?? "").trim(), f = String(l.dataset.field ?? "").trim();
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
O(fa, "LAYOUT_ID", "personal-weapon"), O(fa, "PARTS", {
  sheet: {
    template: `${Q}/v2/item/personal-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
let Yr = fa;
class Qr extends Ns {
}
O(Qr, "LAYOUT_ID", "mech-weapon"), O(Qr, "PARTS", {
  sheet: {
    template: `${Q}/v2/item/mech-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
const Vb = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
};
function ac(a) {
  const e = Number(a ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function Yb({ defenseBonus: a = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(a ?? 0) || 0;
  i !== 0 && t.push(`Defense ${ac(i)}`);
  const n = ti(e);
  for (const [s, r] of Object.entries(Vb)) {
    const l = Number((n == null ? void 0 : n[s]) ?? 0) || 0;
    l !== 0 && t.push(`${r} ${ac(l)}`);
  }
  return t.join(" | ");
}
class Jr extends ii {
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
    var o, c, u, d, m, f, p, h, g, y, b, S, v, M, N, P;
    const t = await super._prepareContext(e), i = this.item, n = i.actor ?? null, s = ((o = n == null ? void 0 : n.getPersonalCombatLoadout) == null ? void 0 : o.call(n)) ?? null, r = ((c = s == null ? void 0 : s.activeArmor) == null ? void 0 : c.id) ?? null, l = ((u = s == null ? void 0 : s.activeArmor) == null ? void 0 : u.id) === i.id ? s.activeArmor : (d = i.getArmorProfile) == null ? void 0 : d.call(i, { actor: n });
    return t.armorState = l, t.isActiveArmor = r === i.id, t.effectiveDurabilityCurrent = Number(
      ((m = l == null ? void 0 : l.durability) == null ? void 0 : m.current) ?? ((p = (f = i.system) == null ? void 0 : f.durability) == null ? void 0 : p.current) ?? ((g = (h = i.system) == null ? void 0 : h.durability) == null ? void 0 : g.max) ?? ((y = i.system) == null ? void 0 : y.rating) ?? 0
    ), t.effectiveArmorRating = Number(
      (l == null ? void 0 : l.currentArmorRating) ?? (l == null ? void 0 : l.ratingCurrent) ?? Math.min(
        Number(((b = i.system) == null ? void 0 : b.rating) ?? 0),
        Number(((v = (S = i.system) == null ? void 0 : S.durability) == null ? void 0 : v.current) ?? ((N = (M = i.system) == null ? void 0 : M.durability) == null ? void 0 : N.max) ?? ((P = i.system) == null ? void 0 : P.rating) ?? 0)
      )
    ), t.effectiveArmorResist = Number(
      (l == null ? void 0 : l.baseMitigation) ?? (l == null ? void 0 : l.baseResistance) ?? 0
    ), t.armorModifierSummary = this._getArmorModifierSummary(l), t.itemSheet = { ...t.itemSheet ?? {} }, t.itemSheet.summaryChips = this._getSummaryChips(l), t.armorEditor = {
      standardTraits: [...Pm]
    }, t;
  }
  _getSummaryChips(e = null) {
    var s, r, l, o, c, u, d, m, f, p, h, g, y, b, S;
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
        value: `${Number(((l = e == null ? void 0 : e.durability) == null ? void 0 : l.current) ?? ((o = t.durability) == null ? void 0 : o.current) ?? ((c = t.durability) == null ? void 0 : c.max) ?? 0)}/${Number(((u = e == null ? void 0 : e.durability) == null ? void 0 : u.max) ?? ((d = t.durability) == null ? void 0 : d.max) ?? t.rating ?? 0)}`
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
    return Yb({
      defenseBonus: (e == null ? void 0 : e.defenseBonus) ?? t.defenseBonus ?? 0,
      mitigationByType: (e == null ? void 0 : e.mitigationByType) ?? (e == null ? void 0 : e.typedMitigation) ?? t.mitigationByType ?? {}
    });
  }
  _onRender(e, t) {
    var n, s;
    (n = super._onRender) == null || n.call(this, e, t);
    const i = (s = this._getRootElement) == null ? void 0 : s.call(this);
    i && (i.querySelectorAll(".mwd-armor-standard-trait-add").forEach((r) => {
      r.addEventListener("click", (l) => {
        var o, c;
        l.preventDefault(), (c = (o = this.item).createArmorStandardTrait) == null || c.call(o);
      });
    }), i.querySelectorAll(".mwd-armor-standard-trait-delete").forEach((r) => {
      r.addEventListener("click", (l) => {
        var o, c;
        l.preventDefault(), (c = (o = this.item).deleteArmorStandardTrait) == null || c.call(o, r.dataset.traitId);
      });
    }), i.querySelectorAll(".mwd-armor-standard-trait-field").forEach((r) => {
      r.addEventListener("change", (l) => {
        var o, c;
        l.preventDefault(), (c = (o = this.item).updateArmorStandardTrait) == null || c.call(
          o,
          r.dataset.traitId,
          r.dataset.field,
          r.value
        );
      });
    }));
  }
}
O(Jr, "LAYOUT_ID", "armor"), O(Jr, "PARTS", {
  sheet: {
    template: `${Q}/v2/item/armor-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
function Qb() {
  console.log(`${be}Registering Item sheets (V2)`);
  const { Items: a } = foundry.documents.collections;
  a.registerSheet(T, Hr, { types: ["contact"], makeDefault: !0, label: "Contact (V2)" }), a.registerSheet(T, Wr, { types: ["gear", "consumable"], makeDefault: !0, label: "Gear / Consumable (V2)" }), a.registerSheet(T, jr, { types: ["quality"], makeDefault: !0, label: "Quality (V2)" }), a.registerSheet(T, Gr, { types: ["assetModule"], makeDefault: !0, label: "Asset Module (V2)" }), a.registerSheet(T, qr, { types: ["lifeModule"], makeDefault: !0, label: "Life Module (V2)" }), a.registerSheet(T, Kr, { types: ["skill"], makeDefault: !0, label: "Skill (V2)" }), a.registerSheet(T, Yr, { types: ["personalWeapon", "weapon"], makeDefault: !0, label: "Personal Weapon (V2)" }), a.registerSheet(T, Qr, { types: ["mechWeapon"], makeDefault: !0, label: "Mech Weapon (V2)" }), a.registerSheet(T, Jr, { types: ["armor"], makeDefault: !0, label: "Armor (V2)" });
}
const nc = [
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
  `systems/${T}/templates/v2/ui/vehicle/record-section.hbs`,
  `systems/${T}/templates/v2/ui/battlemech/chassis-fields.hbs`,
  `systems/${T}/templates/v2/ui/battlemech/heat-track.hbs`,
  `systems/${T}/templates/v2/ui/battlemech/quick-actions.hbs`,
  `systems/${T}/templates/v2/ui/battlemech/weapon-groups.hbs`,
  `systems/${T}/templates/v2/ui/battlemech/hardpoints.hbs`,
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
function Jb(a) {
  const e = String(a).replaceAll("\\", "/"), t = `systems/${T}/templates/`, i = e.indexOf(t);
  return `mwd.${(i >= 0 ? e.slice(i + t.length) : e).replace(/\.hbs$/i, "").split("/").filter(Boolean).map((l) => l.replace(/^_+/, "")).join(".")}`;
}
function Xb() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
async function Zb() {
  var e, t;
  const a = Xb();
  try {
    const i = {};
    for (const s of nc)
      i[Jb(s)] = s, i[s] = s;
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
    console.log(`${be}preloadTemplatesV2 OK`, { loaded: nc.length });
  } catch (i) {
    throw console.error(`${be}preloadTemplatesV2 FAILED`, i), i;
  }
}
function eS(a = {}) {
  return Object.entries(ti(a)).filter(([, e]) => Number(e) > 0).map(([e, t]) => `${e} +${t}`).join(", ");
}
class tS extends Actor {
  /** @override */
  async _preCreate(e, t, i) {
    super._preCreate && await super._preCreate(e, t, i);
    const n = await Wu("Actor", (e == null ? void 0 : e.type) ?? this.type), s = {};
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
      if (uf(i), i.speed = Math.max(0, Math.trunc(Number(i.speed ?? 12) || 12)), (e = i.skills) != null && e.skills && typeof i.skills.skills == "object") {
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
    const e = this.getEdgeCap(), t = this.type === "character" ? Ii(this).bonusByEdgePool ?? {} : {};
    if (this.type === "character" && this.hasEdgePools()) {
      const s = ((n = (i = this.system) == null ? void 0 : i.counters) == null ? void 0 : n.edgePools) ?? {}, r = {};
      for (const [l, o] of Object.entries(s)) {
        const c = Math.max(0, Number((o == null ? void 0 : o.rating) ?? 0)), u = Math.max(0, Number((o == null ? void 0 : o.value) ?? 0)), d = Math.max(0, Number((t == null ? void 0 : t[l]) ?? 0)), m = c + d, f = Math.min(m, e), p = Math.min(u, f);
        r[l] = {
          key: l,
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
    }).filter(Boolean), n = t.filter((f) => f.equipped), s = i.filter((f) => f.equipped), r = n.filter((f) => f.isPrimary), l = s.filter((f) => f.isPrimary);
    let o = null, c = null, u = !1;
    r.length === 1 ? (c = r[0], o = c) : r.length > 1 ? (e.push("Multiple equipped primary weapons found; attack selection requires a chooser."), u = !0) : n.length === 1 ? o = n[0] : n.length > 1 ? u = !0 : o = Mt.buildDefaultUnarmedProfile(this);
    let d = null, m = null;
    return l.length === 1 ? (d = l[0], m = this._buildActiveArmorState(d)) : l.length > 1 ? (e.push("Multiple equipped primary armor items found; using the first equipped armor."), m = s[0] ? this._buildActiveArmorState(s[0]) : null) : s.length === 1 ? m = this._buildActiveArmorState(s[0]) : s.length > 1 && (e.push("Multiple equipped armor items found without a single primary; using the first equipped armor."), m = this._buildActiveArmorState(s[0])), {
      weapons: t,
      equippedWeapons: n,
      primaryWeapon: c,
      defaultWeapon: o,
      weaponChoiceRequired: u,
      armor: i,
      equippedArmor: s,
      primaryArmor: d,
      activeArmor: m,
      warnings: e
    };
  }
  _buildActiveArmorState(e) {
    var o, c;
    if (!e) return null;
    const t = Math.max(0, Number(((o = e == null ? void 0 : e.durability) == null ? void 0 : o.max) ?? (e == null ? void 0 : e.rating) ?? 0)), i = Math.min(
      t,
      Math.max(0, Number(((c = e == null ? void 0 : e.durability) == null ? void 0 : c.current) ?? (e == null ? void 0 : e.remainingDurability) ?? (e == null ? void 0 : e.currentArmorRating) ?? t))
    ), n = Math.max(0, Number((e == null ? void 0 : e.rating) ?? 0)), s = Math.min(n, i), r = ti(e == null ? void 0 : e.mitigationByType), l = lo(s);
    return {
      ...e,
      armorId: e.id,
      remainingDurability: i,
      currentArmorRating: s,
      baseMitigation: l,
      baseResistance: l,
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
    var r, l, o, c;
    const i = this.getOwnedItem(e);
    if (!i || !((r = i.isPersonalWeapon) != null && r.call(i) || (l = i.isArmor) != null && l.call(i))) return null;
    const n = [], s = !!t;
    if (s)
      for (const u of this.items.filter((d) => d.type === i.type && d.id !== i.id))
        (o = u.system) != null && o.isPrimary && n.push({ _id: u.id, "system.isPrimary": !1 });
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
    const n = this.getEdgePoolRaw(e), s = Math.max(0, Number((n == null ? void 0 : n.rating) ?? 0)), r = Math.max(0, Number((n == null ? void 0 : n.value) ?? 0)), l = Math.max(0, Number(((p = Ii(this).bonusByEdgePool) == null ? void 0 : p[e]) ?? 0)), o = s + l, c = Math.min(o, t), u = Math.min(r, c);
    return {
      key: e,
      value: r,
      rating: s,
      ratingBonus: l,
      effectiveRating: o,
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
    const i = this.getEdgeCap(), n = Math.max(0, Number(t ?? 0)), s = Math.max(0, Number(((c = Ii(this).bonusByEdgePool) == null ? void 0 : c[e]) ?? 0)), r = Math.min(n + s, i), l = Math.max(0, Number(((u = this.getEdgePoolRaw(e)) == null ? void 0 : u.value) ?? 0)), o = Math.min(l, r);
    return this.update({
      [`system.counters.edgePools.${e}.rating`]: n,
      [`system.counters.edgePools.${e}.value`]: o
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
      const l = ((n = (i = this._mwdDerived) == null ? void 0 : i.edgePools) == null ? void 0 : n.pools) ?? {};
      if (e && typeof e == "object") {
        const c = Object.entries(e).map(([u, d]) => {
          const m = (d ?? []).map((f) => {
            const p = l[f] ?? this.getEdgePool(f);
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
      const o = Object.keys(((r = (s = this.system) == null ? void 0 : s.counters) == null ? void 0 : r.edgePools) ?? {}).map((c) => {
        const u = l[c] ?? this.getEdgePool(c);
        return {
          ...u,
          isEmpty: (u.effectiveValue ?? 0) <= 0,
          isCapped: (u.effectiveRating ?? u.rating ?? 0) > (u.cap ?? t)
        };
      });
      return { cap: t, hasPools: !0, groups: [], pools: o };
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
      const l = i.runtime ?? {}, o = {
        poolKey: e,
        amount: n,
        source: String(i.source ?? "").trim(),
        eventKey: String(i.eventKey ?? "").trim()
      }, c = Et({
        actor: this,
        phase: "onEdgeSpend",
        facts: br({ actor: this, packet: o, phase: "onEdgeSpend", runtime: l }),
        packet: o,
        options: { runtime: l, consumeUsage: !0 }
      });
      await mi({ actor: this, mutations: c.mutations, runtime: l }), s = Math.max(0, Number(c.packet.amount ?? n) || 0);
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
      const r = i.runtime ?? {}, l = {
        poolKey: e,
        amount: n,
        source: String(i.source ?? "").trim(),
        eventKey: String(i.eventKey ?? "").trim()
      }, o = Et({
        actor: this,
        phase: "onEdgeGain",
        facts: br({ actor: this, packet: l, phase: "onEdgeGain", runtime: r }),
        packet: l,
        options: { runtime: r, consumeUsage: !0 }
      });
      await mi({ actor: this, mutations: o.mutations, runtime: r }), s = Number(o.packet.amount ?? n) || 0;
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
      const v = Math.max(0, Number(((f = S.system) == null ? void 0 : f.rating) ?? 0) || 0), M = Math.max(0, Number(((h = (p = S.system) == null ? void 0 : p.durability) == null ? void 0 : h.max) ?? 0) || 0), N = M > 0 ? M : v, P = Math.min(Math.max(0, Number(t) || 0), N);
      return this.updateEmbeddedDocuments("Item", [{
        _id: S.id,
        "system.durability.max": N,
        "system.durability.current": P
      }]);
    }
    const n = `system.monitors.${e}`, s = Number(foundry.utils.getProperty(this, `${n}.max`)) || 0, r = Math.max(0, s), l = Math.min(Math.max(0, Number(t) || 0), r), o = { [`${n}.value`]: l }, c = this.type, u = (g = Is == null ? void 0 : Is[c]) == null ? void 0 : g[e];
    if (u != null && u.derived)
      for (const [y, b] of Object.entries(u.derived)) {
        const S = js == null ? void 0 : js[b.fn];
        if (typeof S != "function") continue;
        const v = Gh(this, e, b.source, l);
        o[`${n}.derived.${y}`] = S(v);
      }
    return this.update(o);
  }
  _prepareMonitors() {
    var l, o, c, u, d, m, f, p;
    const e = this.system.monitors ?? {}, t = jh(e);
    (l = this.system).derived ?? (l.derived = {}), this.system.derived.monitors = t;
    const i = Number(((o = t == null ? void 0 : t.physical) == null ? void 0 : o.penalty) ?? 0), n = Number(((c = t == null ? void 0 : t.fatigue) == null ? void 0 : c.penalty) ?? 0), s = Number(((u = t == null ? void 0 : t.armor) == null ? void 0 : u.resistance) ?? 0), r = i + n;
    e.physical ?? (e.physical = {}), (d = e.physical).derived ?? (d.derived = {}), e.physical.derived.penalty = i, e.fatigue ?? (e.fatigue = {}), (m = e.fatigue).derived ?? (m.derived = {}), e.fatigue.derived.penalty = n, e.armor ?? (e.armor = {}), (f = e.armor).derived ?? (f.derived = {}), e.armor.derived.resistance = s, (p = this.system.derived).condition ?? (p.condition = {}), this.system.derived.condition.physicalPenalty = i, this.system.derived.condition.fatiguePenalty = n, this.system.derived.condition.totalPenalty = r, this.system.derived.conditionPenalty = r;
  }
  _preparePersonalCombatDerived() {
    var r, l, o, c, u, d;
    if (!this.isCharacterLike()) return;
    const e = this.getPersonalCombatLoadout({ refresh: !0 }), t = (l = (r = this.system) == null ? void 0 : r.monitors) == null ? void 0 : l.armor;
    if (!t) return;
    const i = e.activeArmor, n = Math.max(0, Number(((o = i == null ? void 0 : i.durability) == null ? void 0 : o.max) ?? 0)), s = Math.max(0, Number((i == null ? void 0 : i.remainingDurability) ?? ((c = i == null ? void 0 : i.durability) == null ? void 0 : c.current) ?? 0));
    t.max = n, t.value = Math.min(n, s), t.resistance = {
      default: Number((i == null ? void 0 : i.baseMitigation) ?? (i == null ? void 0 : i.baseResistance) ?? 0),
      byType: {}
    }, t.resistanceBonusByType = i != null && i.isDestroyed ? {} : (i == null ? void 0 : i.mitigationByType) ?? (i == null ? void 0 : i.typedMitigation) ?? {}, t.derived ?? (t.derived = {}), t.derived.resistance = Number((i == null ? void 0 : i.baseMitigation) ?? (i == null ? void 0 : i.baseResistance) ?? 0), t.effect = i != null && i.isDestroyed ? "Destroyed" : i ? eS(i.mitigationByType ?? i.typedMitigation) : "", (u = this.system).derived ?? (u.derived = {}), this.system.derived.personalCombat = {
      defaultWeaponId: ((d = e.defaultWeapon) == null ? void 0 : d.id) ?? null,
      activeArmorId: (i == null ? void 0 : i.id) ?? null,
      warnings: [...e.warnings ?? []]
    };
  }
}
async function iS({ actor: a, payload: e } = {}) {
  var g, y, b, S, v, M;
  if (!a) throw new Error("resolveSkill requires actor");
  const t = String((e == null ? void 0 : e.key) ?? "").trim(), i = Wt(t);
  if (!i) throw new Error(`Unknown skill: ${t}`);
  const n = a.system ?? {}, s = String((e == null ? void 0 : e.attrKey) ?? i.attribute ?? "").trim();
  if (!s) throw new Error(`Skill ${t} missing attribute key`);
  const r = Number(((y = (g = n == null ? void 0 : n.attributes) == null ? void 0 : g[s]) == null ? void 0 : y.value) ?? 0), l = Number(((S = (b = n == null ? void 0 : n.skills) == null ? void 0 : b[t]) == null ? void 0 : S.rating) ?? 0), o = Number(((M = (v = n == null ? void 0 : n.skills) == null ? void 0 : v[t]) == null ? void 0 : M.bonus) ?? 0), c = new Set(fs(n, t)), u = fo(t, e == null ? void 0 : e.specializationKey), d = u && c.has(u.key) ? u : null, m = d ? co : 0, f = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : i.domains ?? [], p = Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : Number.isFinite(Number(e == null ? void 0 : e.target)) ? Number(e.target) : 5, h = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1;
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
    pool: { attribute: r, skill: l, bonus: o, specialization: m },
    breakdown: [
      { id: "attribute", label: "Attribute", value: r },
      { id: "skill", label: "Skill", value: l },
      { id: "bonus", label: "Bonus", value: o },
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
const aS = /* @__PURE__ */ new Set([
  "grit",
  "chaos",
  "insight",
  "rumor",
  "legend",
  "credibility"
]), nS = {
  grit: "physical",
  chaos: "physical",
  insight: "mental",
  rumor: "mental",
  legend: "social",
  credibility: "social"
};
async function sS({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveEdge requires actor");
  const t = String((e == null ? void 0 : e.pool) ?? "").trim();
  if (!aS.has(t)) throw new Error(`Invalid edge pool: ${t}`);
  const i = a.getEdgePool(t), n = Math.max(0, Number((i == null ? void 0 : i.effectiveValue) ?? 0));
  return {
    intent: "edge",
    title: `Edge — ${t}`,
    subtitle: a.name ?? "Actor",
    domains: [nS[t] ?? "unknown"],
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
async function rS({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Attribute",
    intent: "attribute",
    domainTags: ["general"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function oS({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveCommon requires actor");
  const t = String((e == null ? void 0 : e.id) ?? "").trim();
  if (!t) throw new Error("Common rolls require payload.id");
  const i = bo(t);
  if (!i) throw new Error(`Unknown common check: ${t}`);
  const n = Array.isArray(i.formula) ? i.formula : [];
  if (n.length !== 2)
    throw new Error(`Common check ${t} must define exactly two attributes.`);
  const s = n.map((c) => {
    var d, m, f;
    const u = xf(c);
    if (!u) throw new Error(`Common check ${t} uses unsupported attribute code: ${c}`);
    return {
      code: String(c).trim().toUpperCase(),
      key: u,
      label: $f(c),
      value: Number(((f = (m = (d = a.system) == null ? void 0 : d.attributes) == null ? void 0 : m[u]) == null ? void 0 : f.value) ?? 0)
    };
  }), r = s.reduce((c, u) => c + Number(u.value ?? 0), 0), l = Array.isArray(i.tags) ? [...i.tags] : [], o = Array.isArray(i.domains) ? [...i.domains] : [];
  return {
    intent: "common",
    rollType: "simple",
    title: String(i.label ?? t).trim() || t,
    subtitle: a.name ?? "Actor",
    domains: o,
    tags: l,
    formula: Bf(n),
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
      tags: l,
      attributes: s
    }
  };
}
const lS = 90;
var fc;
const cS = Number(((fc = CONST == null ? void 0 : CONST.REGION_VISIBILITY) == null ? void 0 : fc.ALWAYS) ?? 2) || 2;
function ts() {
  var a, e;
  return Number(((a = canvas.grid) == null ? void 0 : a.size) ?? ((e = canvas.dimensions) == null ? void 0 : e.size) ?? 100) || 100;
}
function uS(a = {}) {
  return Math.max(0, Number((a == null ? void 0 : a.size) ?? 0) || 0);
}
function Pa(a) {
  var t, i, n, s;
  return ((i = (t = canvas.tokens) == null ? void 0 : t.controlled) == null ? void 0 : i.find((r) => {
    var l;
    return ((l = r.actor) == null ? void 0 : l.id) === (a == null ? void 0 : a.id);
  })) ?? null ?? ((s = (n = a == null ? void 0 : a.getActiveTokens) == null ? void 0 : n.call(a, !0, !0)) == null ? void 0 : s[0]) ?? null;
}
function sc(a) {
  var e, t;
  return Number(
    ((e = a == null ? void 0 : a.document) == null ? void 0 : e.disposition) ?? (a == null ? void 0 : a.disposition) ?? ((t = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : t.NEUTRAL) ?? 0
  );
}
function is(a) {
  var r, l, o, c, u;
  const e = (a == null ? void 0 : a.center) ?? ((r = a == null ? void 0 : a.object) == null ? void 0 : r.center);
  if (e) return { x: Number(e.x ?? 0), y: Number(e.y ?? 0) };
  const t = Number((a == null ? void 0 : a.x) ?? ((l = a == null ? void 0 : a.document) == null ? void 0 : l.x) ?? 0), i = Number((a == null ? void 0 : a.y) ?? ((o = a == null ? void 0 : a.document) == null ? void 0 : o.y) ?? 0), n = Number((a == null ? void 0 : a.w) ?? (a == null ? void 0 : a.width) ?? ((c = a == null ? void 0 : a.document) == null ? void 0 : c.width) ?? 1) * ts(), s = Number((a == null ? void 0 : a.h) ?? (a == null ? void 0 : a.height) ?? ((u = a == null ? void 0 : a.document) == null ? void 0 : u.height) ?? 1) * ts();
  return { x: t + n / 2, y: i + s / 2 };
}
function dS(a) {
  var i, n, s, r;
  const e = Number((a == null ? void 0 : a.w) ?? ((i = a == null ? void 0 : a.object) == null ? void 0 : i.w) ?? 0) || Number(((n = a == null ? void 0 : a.document) == null ? void 0 : n.width) ?? 1) * ts(), t = Number((a == null ? void 0 : a.h) ?? ((s = a == null ? void 0 : a.object) == null ? void 0 : s.h) ?? 0) || Number(((r = a == null ? void 0 : a.document) == null ? void 0 : r.height) ?? 1) * ts();
  return Math.max(e, t) / 2;
}
function mS() {
  var t;
  const a = ((t = canvas == null ? void 0 : canvas.stage) == null ? void 0 : t.pivot) ?? null, e = (canvas == null ? void 0 : canvas.dimensions) ?? {};
  return {
    x: Number((a == null ? void 0 : a.x) ?? e.width / 2 ?? 0) || 0,
    y: Number((a == null ? void 0 : a.y) ?? e.height / 2 ?? 0) || 0
  };
}
function fS() {
  var a;
  return Array.from(((a = game.user) == null ? void 0 : a.targets) ?? []).find((e) => e == null ? void 0 : e.actor) ?? null;
}
function pS(a, e) {
  return {
    x: (Number((a == null ? void 0 : a.x) ?? 0) + Number((e == null ? void 0 : e.x) ?? 0)) / 2,
    y: (Number((a == null ? void 0 : a.y) ?? 0) + Number((e == null ? void 0 : e.y) ?? 0)) / 2
  };
}
function hS({ template: a = {}, actor: e = null } = {}) {
  const t = String((a == null ? void 0 : a.placement) ?? "").trim().toLowerCase(), i = Pa(e), n = fS(), s = i ? is(i) : null, r = n ? is(n) : null;
  return t === "origin" && s ? s : t === "targeted" && r ? r : t === "placed" && s && r ? pS(s, r) : mS();
}
function gS({ attack: a = {}, actor: e = null } = {}) {
  const t = (a == null ? void 0 : a.template) ?? null, i = String((t == null ? void 0 : t.shape) ?? "").trim().toLowerCase();
  if (!i) return null;
  const n = hS({ template: t, actor: e });
  return Oe({
    shape: i,
    x: n.x,
    y: n.y,
    direction: 0,
    distance: uS(t),
    angle: i === "cone" ? lS : null,
    width: i === "line" ? 1 : null,
    placementMode: (t == null ? void 0 : t.placement) ?? null
  });
}
function yS() {
  var e, t;
  const a = new PIXI.Container();
  return a.eventMode = "none", a.sortableChildren = !0, (t = (e = canvas.stage) == null ? void 0 : e.addChild) == null || t.call(e, a), a;
}
function bS(a) {
  var e;
  a != null && a.parent && a.parent.removeChild(a), (e = a == null ? void 0 : a.destroy) == null || e.call(a, { children: !0 });
}
function SS() {
  const a = yS(), e = new PIXI.Container();
  e.eventMode = "none", e.zIndex = 5;
  const t = new PIXI.Container();
  return t.eventMode = "none", t.zIndex = 10, a.addChild(e), a.addChild(t), { root: a, templateLayer: e, markerLayer: t };
}
function AS(a) {
  bS((a == null ? void 0 : a.root) ?? a);
}
function TS() {
  var t;
  const a = String(((t = game.user) == null ? void 0 : t.color) ?? "#ff6400").replace("#", "").trim(), e = Number.parseInt(a, 16);
  return Number.isFinite(e) ? e : 16737280;
}
function Rd(a) {
  var e;
  (e = a == null ? void 0 : a.removeChildren) == null || e.call(a).forEach((t) => {
    var i;
    return (i = t.destroy) == null ? void 0 : i.call(t, { children: !0 });
  });
}
function Xr(a) {
  var c, u, d;
  const e = ((c = canvas == null ? void 0 : canvas.app) == null ? void 0 : c.view) ?? null, t = ((u = canvas == null ? void 0 : canvas.app) == null ? void 0 : u.renderer) ?? null, i = (canvas == null ? void 0 : canvas.stage) ?? null;
  if (!e || !i) return null;
  const n = Number((a == null ? void 0 : a.clientX) ?? NaN), s = Number((a == null ? void 0 : a.clientY) ?? NaN);
  if (!Number.isFinite(n) || !Number.isFinite(s)) return null;
  const r = e.getBoundingClientRect();
  if (n < r.left || n > r.right || s < r.top || s > r.bottom) return null;
  const l = new PIXI.Point();
  if (typeof ((d = t == null ? void 0 : t.events) == null ? void 0 : d.mapPositionToPoint) == "function")
    t.events.mapPositionToPoint(l, n, s);
  else {
    const m = Number((t == null ? void 0 : t.resolution) ?? window.devicePixelRatio ?? 1) || 1;
    l.x = (n - r.left) * m, l.y = (s - r.top) * m;
  }
  const o = i.toLocal(l);
  return {
    x: Number((o == null ? void 0 : o.x) ?? 0) || 0,
    y: Number((o == null ? void 0 : o.y) ?? 0) || 0
  };
}
function wS(a, e) {
  const t = Number((e == null ? void 0 : e.x) ?? 0) - Number((a == null ? void 0 : a.x) ?? 0), i = Number((e == null ? void 0 : e.y) ?? 0) - Number((a == null ? void 0 : a.y) ?? 0);
  return t === 0 && i === 0 ? 0 : Math.atan2(i, t) * 180 / Math.PI;
}
function er(a = 0) {
  var i, n, s, r, l;
  const e = Number(((i = canvas.grid) == null ? void 0 : i.size) ?? ((n = canvas.dimensions) == null ? void 0 : n.size) ?? 100) || 100, t = Number(((r = (s = canvas.scene) == null ? void 0 : s.grid) == null ? void 0 : r.distance) ?? ((l = canvas.dimensions) == null ? void 0 : l.distance) ?? 1) || 1;
  return Number(a ?? 0) * (e / t);
}
function vS({ geometry: a = null, pointer: e = null, attack: t = {}, actor: i = null } = {}) {
  var o;
  const n = Oe(a);
  if (!n) return null;
  const s = ei(n) ?? null;
  if (!s || !e) return s;
  const l = String(((o = t == null ? void 0 : t.template) == null ? void 0 : o.placement) ?? s.placementMode ?? "").trim().toLowerCase() !== "origin";
  if (l && (s.x = e.x, s.y = e.y), ["line", "cone", "rect"].includes(String(s.shape ?? "").trim().toLowerCase())) {
    const c = Pa(i), u = c ? is(c) : null, d = l ? u ?? { x: Number(n.x ?? 0), y: Number(n.y ?? 0) } : { x: Number(s.x ?? 0), y: Number(s.y ?? 0) };
    s.direction = wS(d, e);
  }
  return Oe(s);
}
function kS(a, e = null) {
  if (!a) return;
  Rd(a);
  const t = Oe(e);
  if (!t) return;
  const i = TS(), n = new PIXI.Graphics();
  switch (n.lineStyle(3, i, 0.95), n.beginFill(i, 0.18), String(t.shape ?? "").trim().toLowerCase()) {
    case "blast": {
      n.drawCircle(
        Number(t.x ?? 0),
        Number(t.y ?? 0),
        er(t.distance ?? 0)
      );
      break;
    }
    case "rect": {
      const s = er(t.width ?? 0), r = er(t.height ?? 0);
      n.position.set(Number(t.x ?? 0), Number(t.y ?? 0)), n.rotation = Number(t.direction ?? 0) * Math.PI / 180, n.drawRect(
        -(Number(t.anchorX ?? 0) || 0) * s,
        -(Number(t.anchorY ?? 0) || 0) * r,
        s,
        r
      );
      break;
    }
    default: {
      const [s] = ls(t);
      (s == null ? void 0 : s.type) === "polygon" && Array.isArray(s.points) && s.points.length >= 3 && n.drawPolygon(s.points.flatMap((r) => [Number((r == null ? void 0 : r.x) ?? 0), Number((r == null ? void 0 : r.y) ?? 0)]));
      break;
    }
  }
  n.endFill(), a.addChild(n);
}
function ES(a = ie.none) {
  return a === ie.full ? 14042437 : a === ie.major ? 15174447 : a === ie.minor ? 15782993 : 10134706;
}
function MS(a, e = []) {
  if (a) {
    Rd(a);
    for (const t of e) {
      const i = is(t.token), n = Math.max(20, dS(t.token) + 12), s = ES(t.exposureTier), r = new PIXI.Graphics();
      r.lineStyle(4, s, 0.95), r.beginFill(s, 0.14), r.drawCircle(i.x, i.y, n), r.endFill(), r.zIndex = 10;
      const l = new PIXI.Text(Ct(t.exposureTier), {
        fontFamily: "MWD UI",
        fontSize: 18,
        fontWeight: "700",
        fill: s,
        stroke: 1118481,
        strokeThickness: 4,
        align: "center"
      });
      l.anchor.set(0.5, 1), l.position.set(i.x, i.y - n - 6), l.zIndex = 11, a.addChild(r), a.addChild(l);
    }
  }
}
function Id(a, e = {}) {
  var s, r, l, o, c, u, d, m, f, p, h, g, y, b, S, v;
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
      reflexes: Number(((c = (o = (l = t == null ? void 0 : t.system) == null ? void 0 : l.attributes) == null ? void 0 : o.reflexes) == null ? void 0 : c.value) ?? 0) || 0
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
    exposure: Di({
      tier: ((h = e == null ? void 0 : e.exposure) == null ? void 0 : h.initialTier) ?? ((g = e == null ? void 0 : e.exposure) == null ? void 0 : g.tier) ?? (e == null ? void 0 : e.exposureTier) ?? ie.none,
      appliedTier: ((y = e == null ? void 0 : e.exposure) == null ? void 0 : y.finalTier) ?? ((b = e == null ? void 0 : e.exposure) == null ? void 0 : b.appliedTier) ?? (e == null ? void 0 : e.exposureTier) ?? ie.none,
      evadeUsed: !!((S = e == null ? void 0 : e.exposure) != null && S.evadeUsed),
      evadeLocked: !!((v = e == null ? void 0 : e.exposure) != null && v.evadeLocked)
    }),
    areaEffect: e != null && e.areaEffect ? foundry.utils.deepClone(e.areaEffect) : null
  };
}
function CS({ attack: a = {}, geometry: e = null, attacker: t = null } = {}) {
  var l;
  const i = (a == null ? void 0 : a.template) ?? null, n = Oe(e);
  if (!i || !n) return [];
  const s = Pa(t), r = (s == null ? void 0 : s.id) ?? null;
  return (((l = canvas.tokens) == null ? void 0 : l.placeables) ?? []).filter((o) => o == null ? void 0 : o.actor).filter((o) => o.id !== r || (i == null ? void 0 : i.placement) === "origin").filter((o) => os(n, o)).map((o) => {
    const c = Cc({ geometry: n, token: o });
    return Id(o, {
      exposureTier: c,
      areaEffect: {
        templateShape: (i == null ? void 0 : i.shape) ?? "",
        templatePlacement: (i == null ? void 0 : i.placement) ?? "",
        templateGeometry: ei(n)
      }
    });
  }).filter(Boolean);
}
function PS({ attack: a = {}, geometry: e = null, attacker: t = null } = {}) {
  var l;
  const i = (a == null ? void 0 : a.template) ?? null, n = Pa(t), s = (n == null ? void 0 : n.id) ?? null, r = Oe(e);
  return !i || !r ? [] : (((l = canvas.tokens) == null ? void 0 : l.placeables) ?? []).filter((o) => o == null ? void 0 : o.actor).filter((o) => o.id !== s || (i == null ? void 0 : i.placement) === "origin").filter((o) => os(r, o)).map((o) => ({
    token: o,
    exposureTier: Cc({ geometry: r, token: o })
  }));
}
function NS({ geometry: a = null, attack: e = {}, attacker: t = null } = {}) {
  var m, f, p, h;
  const i = (e == null ? void 0 : e.template) ?? null, n = Oe(a);
  if (!i || !n) return [];
  const s = Pa(t), r = (s == null ? void 0 : s.id) ?? null, l = Number(((m = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : m.HOSTILE) ?? -1), o = Number(((f = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : f.FRIENDLY) ?? 1), c = Number(((p = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : p.NEUTRAL) ?? 0), u = sc(s), d = (g) => {
    const y = sc(g);
    return s ? u === o ? y === l : u === l ? y === o : u === c ? y === l : y !== u : !0;
  };
  return (((h = canvas.tokens) == null ? void 0 : h.placeables) ?? []).filter((g) => g == null ? void 0 : g.actor).filter((g) => g.id !== r || (i == null ? void 0 : i.placement) === "origin").filter((g) => os(n, g)).filter(d).map((g) => String(g.id ?? "").trim()).filter(Boolean);
}
function RS(a = {}) {
  var i;
  const e = String(((i = a == null ? void 0 : a.template) == null ? void 0 : i.shape) ?? "template").trim().toLowerCase();
  return `${e ? `${e.slice(0, 1).toUpperCase()}${e.slice(1)}` : "Template"} placement: left-click to place, right-click or Esc to cancel, Enter or Space to confirm.`;
}
async function IS({ attack: a = {} } = {}) {
  var t, i;
  const e = RS(a);
  return e && ((i = (t = ui.notifications) == null ? void 0 : t.info) == null || i.call(t, e)), new Promise((n) => {
    let s = !1;
    const r = () => {
      window.removeEventListener("pointerdown", u, !0), window.removeEventListener("keydown", d, !0), window.removeEventListener("contextmenu", m, !0);
    }, l = (f = !1) => {
      s || (s = !0, r(), n(!!f));
    }, o = (f) => {
      var p, h, g;
      (p = f == null ? void 0 : f.preventDefault) == null || p.call(f), (h = f == null ? void 0 : f.stopPropagation) == null || h.call(f), (g = f == null ? void 0 : f.stopImmediatePropagation) == null || g.call(f);
    }, c = (f) => {
      if (!(f instanceof HTMLElement)) return !1;
      const p = String(f.tagName ?? "").trim().toUpperCase();
      return f.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(p);
    }, u = (f) => {
      const p = Number((f == null ? void 0 : f.button) ?? 0), h = Xr(f);
      if (p === 2 && h) {
        o(f), l(!1);
        return;
      }
      p !== 0 || !h || (o(f), l(!0));
    }, d = (f) => {
      const p = String((f == null ? void 0 : f.key) ?? ""), h = String((f == null ? void 0 : f.code) ?? "");
      if (p === "Escape") {
        o(f), l(!1);
        return;
      }
      c((f == null ? void 0 : f.target) ?? document.activeElement) || (p === "Enter" || p === "NumpadEnter" || p === " " || p === "Spacebar" || h === "Space") && (o(f), l(!0));
    }, m = (f) => {
      Xr(f) && o(f);
    };
    window.addEventListener("pointerdown", u, !0), window.addEventListener("keydown", d, !0), window.addEventListener("contextmenu", m, !0);
  });
}
async function DS({ actor: a = null, attack: e = {}, templateGeometry: t = null } = {}) {
  var l, o, c, u, d, m;
  if (!(canvas != null && canvas.scene) || vc((e == null ? void 0 : e.areaEffect) ?? ((l = e == null ? void 0 : e.payload) == null ? void 0 : l.areaEffect) ?? {})) return null;
  const i = Oe(t, {
    template: e == null ? void 0 : e.template,
    placement: e == null ? void 0 : e.templatePlacement
  });
  if (!i) return null;
  const n = ls(i);
  if (!n.length) return null;
  const s = `${String(((o = e == null ? void 0 : e.weapon) == null ? void 0 : o.name) ?? (e == null ? void 0 : e.name) ?? "Template").trim() || "Template"} Template`, [r] = await canvas.scene.createEmbeddedDocuments("Region", [{
    name: s,
    color: String(((c = game.user) == null ? void 0 : c.color) ?? "#ff6400").trim() || "#ff6400",
    visibility: cS,
    locked: !1,
    shapes: n,
    flags: {
      mwd: {
        templateIndicator: {
          sourceActorUuid: (a == null ? void 0 : a.uuid) ?? null,
          sourceItemUuid: ((u = e == null ? void 0 : e.weapon) == null ? void 0 : u.uuid) ?? null,
          payloadId: ((d = e == null ? void 0 : e.payloadState) == null ? void 0 : d.activePayloadId) ?? ((m = e == null ? void 0 : e.payload) == null ? void 0 : m.id) ?? "",
          label: s,
          templateGeometry: ei(i),
          templatePlacement: foundry.utils.deepClone((e == null ? void 0 : e.templatePlacement) ?? null),
          template: foundry.utils.deepClone((e == null ? void 0 : e.template) ?? null)
        }
      }
    }
  }]);
  return r ?? null;
}
async function OS({ actor: a, attack: e } = {}) {
  if (!(canvas != null && canvas.scene))
    throw zi("Templated attacks require an active scene canvas.", { severity: "warn" });
  const t = (e == null ? void 0 : e.template) ?? null;
  if (!(t != null && t.shape) || !(Number(t == null ? void 0 : t.size) > 0))
    throw zi("Templated attack is missing valid template configuration.", { severity: "warn" });
  if (!Xd.includes(t.shape))
    throw zi(`Template shape "${t.shape}" is normalized but not supported in v1.`, { severity: "warn" });
  const i = Pa(a);
  if (t.placement === "origin" && !i)
    throw zi("Origin-placed templated attacks require the attacker to have a token on the current scene.", { severity: "warn" });
  const n = gS({ attack: e, actor: a });
  if (!n)
    throw zi("Unable to initialize template placement for this attack.", { severity: "warn" });
  const s = SS();
  let r = ei(n), l = "";
  const o = (d = null) => JSON.stringify({
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
    kS(s.templateLayer, r), MS(s.markerLayer, PS({ attack: e, geometry: r, attacker: a }));
  }, u = (d) => {
    const m = Xr(d);
    if (!m) return;
    const f = vS({
      geometry: r,
      pointer: m,
      attack: e,
      actor: a
    });
    if (!f) return;
    const p = o(f);
    p !== l && (r = f, l = p, c());
  };
  try {
    if (l = o(r), c(), window.addEventListener("pointermove", u), !await IS({
      attack: {
        ...e,
        actor: a
      }
    })) return null;
    const m = ei(r);
    if (!m) return null;
    const f = ym(m, t), p = CS({
      attack: e,
      geometry: m,
      attacker: a
    });
    return {
      templateGeometry: ei(m),
      placement: (f == null ? void 0 : f.placement) ?? null,
      autoTargetTokenIds: NS({
        geometry: m,
        attack: e,
        attacker: a
      }),
      targetSnapshots: p
    };
  } finally {
    window.removeEventListener("pointermove", u), AS(s);
  }
}
function _S(a = {}) {
  var e;
  return Array.isArray(a == null ? void 0 : a.targetSnapshots) ? a.targetSnapshots : Array.from(((e = game.user) == null ? void 0 : e.targets) ?? []).map(Id).filter(Boolean);
}
function LS(a, e = {}) {
  var n, s, r, l, o, c, u, d, m;
  const t = String((e == null ? void 0 : e.sourceTokenId) ?? "").trim();
  if (t) {
    const f = ((s = (n = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : n.get) == null ? void 0 : s.call(n, t)) ?? ((o = (l = (r = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : r.placeables) == null ? void 0 : l.find) == null ? void 0 : o.call(l, (p) => (p == null ? void 0 : p.id) === t)) ?? null;
    if (f) return f;
  }
  return ((u = (c = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : c.controlled) == null ? void 0 : u.find((f) => {
    var p;
    return ((p = f.actor) == null ? void 0 : p.id) === (a == null ? void 0 : a.id);
  })) ?? null ?? ((m = (d = a == null ? void 0 : a.getActiveTokens) == null ? void 0 : d.call(a, !0, !0)) == null ? void 0 : m[0]) ?? null;
}
function xS(a = {}) {
  var t, i, n, s, r;
  const e = String((a == null ? void 0 : a.tokenId) ?? "").trim();
  return e ? ((i = (t = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : t.get) == null ? void 0 : i.call(t, e)) ?? ((r = (s = (n = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : n.placeables) == null ? void 0 : s.find) == null ? void 0 : r.call(s, (l) => (l == null ? void 0 : l.id) === e)) ?? null : null;
}
function $S(a, e) {
  var r, l, o, c;
  const t = canvas == null ? void 0 : canvas.grid, i = (a == null ? void 0 : a.center) ?? ((r = a == null ? void 0 : a.object) == null ? void 0 : r.center) ?? null, n = (e == null ? void 0 : e.center) ?? ((l = e == null ? void 0 : e.object) == null ? void 0 : l.center) ?? null;
  if (!t || !i || !n) return null;
  if (typeof t.measurePath == "function")
    try {
      const u = t.measurePath([i, n], { gridSpaces: !0 }), d = Number(
        (u == null ? void 0 : u.distance) ?? (u == null ? void 0 : u.cost) ?? (u == null ? void 0 : u.totalDistance) ?? (u == null ? void 0 : u.totalCost) ?? NaN
      );
      if (Number.isFinite(d)) return d;
    } catch {
    }
  const s = ((c = (o = foundry == null ? void 0 : foundry.canvas) == null ? void 0 : o.geometry) == null ? void 0 : c.Ray) ?? globalThis.Ray;
  if (typeof t.measureDistances == "function" && typeof s == "function")
    try {
      const u = t.measureDistances([{ ray: new s(i, n) }], { gridSpaces: !0 }), d = Number(Array.isArray(u) ? u[0] : NaN);
      if (Number.isFinite(d)) return d;
    } catch {
      return null;
    }
  return null;
}
function BS({ actor: a, payload: e, weapon: t, targets: i = [] } = {}) {
  const n = String((e == null ? void 0 : e.rangeBand) ?? "").trim().toLowerCase();
  if (!(((t == null ? void 0 : t.type) === "personalWeapon" || (t == null ? void 0 : t.isSynthetic)) && i.length === 1))
    return n || String((t == null ? void 0 : t.defaultRangeBand) ?? "close").trim() || "close";
  const r = LS(a, e), l = xS(i[0]), o = $S(r, l), c = Np(o, (t == null ? void 0 : t.range) ?? {}, (t == null ? void 0 : t.defaultRangeBand) ?? "close");
  return c === "outOfRange" ? c : n || ((t == null ? void 0 : t.type) !== "personalWeapon" && !(t != null && t.isSynthetic) || i.length !== 1 ? String((t == null ? void 0 : t.defaultRangeBand) ?? "close").trim() || "close" : c);
}
function zS(a, e) {
  var i, n, s, r, l, o, c;
  if (((i = e == null ? void 0 : e.syntheticWeapon) == null ? void 0 : i.id) === "unarmed") {
    const u = Mt.buildDefaultUnarmedProfile(a);
    return {
      ...u,
      ...e.syntheticWeapon,
      damage: u.damage,
      attackRatingBand: {
        ...((n = e.syntheticWeapon) == null ? void 0 : n.attackRatingBand) ?? u.attackRatingBand,
        close: u.attackRatingBand.close
      },
      isSynthetic: !0,
      defaultRangeBand: "close"
    };
  }
  const t = ((r = (s = a.items) == null ? void 0 : s.get) == null ? void 0 : r.call(s, (e == null ? void 0 : e.weaponId) ?? "")) ?? null;
  if (!t || !(((l = t.isPersonalWeapon) == null ? void 0 : l.call(t)) ?? t.type === "personalWeapon") || !((o = t.system) != null && o.equipped))
    throw new Error("Attack requires an equipped personal weapon.");
  return ((c = t.getCombatProfile) == null ? void 0 : c.call(t, { payloadId: e == null ? void 0 : e.payloadId })) ?? null;
}
async function FS({ actor: a, payload: e } = {}) {
  var N, P, U, K, Y, W, j, L, B, G, X, oe, Se, me, C, V, ne, ae;
  if (!a) throw new Error("resolveAttack requires actor");
  const t = zS(a, e);
  if (!t) throw new Error("Unable to resolve weapon profile.");
  if (Array.isArray((N = t == null ? void 0 : t.capabilityReport) == null ? void 0 : N.errors) && t.capabilityReport.errors.length > 0)
    throw zi(
      ((P = t.capabilityReport.errors[0]) == null ? void 0 : P.message) ?? "Weapon capability data is invalid for this attack.",
      { severity: "warn" }
    );
  const i = Wt(t.skill) ?? {
    code: t.skill,
    label: t.skill || "Attack",
    attribute: "reflexes",
    domains: ["physical"]
  }, n = String(i.attribute ?? "reflexes").trim() || "reflexes", s = ((U = a.getAttributeValue) == null ? void 0 : U.call(a, n)) ?? Number(((W = (Y = (K = a.system) == null ? void 0 : K.attributes) == null ? void 0 : Y[n]) == null ? void 0 : W.value) ?? 0), r = ((j = a.getSkillRating) == null ? void 0 : j.call(a, t.skill)) ?? Number(((G = (B = (L = a.system) == null ? void 0 : L.skills) == null ? void 0 : B[t.skill]) == null ? void 0 : G.rating) ?? 0), l = Number(((Se = (oe = (X = a.system) == null ? void 0 : X.skills) == null ? void 0 : oe[t.skill]) == null ? void 0 : Se.bonus) ?? 0), o = new Set(fs(a.system ?? {}, t.skill)), c = fo(t.skill, e == null ? void 0 : e.specializationKey), u = c && o.has(c.key) ? c : null, d = u ? co : 0, m = Number(((me = t == null ? void 0 : t.effects) == null ? void 0 : me.accuracyMod) ?? 0) || 0, f = l + m, p = _S(e), h = BS({ actor: a, payload: e, weapon: t, targets: p }), g = (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? Ss(h) : h, y = Number(((C = t == null ? void 0 : t.attackRatingBand) == null ? void 0 : C[h]) ?? 0) || 0, b = !!((V = t == null ? void 0 : t.capabilityReport) != null && V.isTemplated), S = (ne = e == null ? void 0 : e.aim) != null && ne.active ? {
    active: !0,
    eligible: !b && p.length === 1,
    ineligibleReason: b ? "Aim cannot apply to template attacks." : p.length !== 1 ? "Aim cannot apply to multi-target attacks." : "",
    skillCode: t.skill,
    skillLabel: i.label ?? t.skill ?? "Attack Skill"
  } : null;
  if (!b && p.length === 0)
    throw zi("Target at least one token to attack.", { severity: "warn" });
  const v = Number(t.ap ?? 0) + Number(((ae = t == null ? void 0 : t.effects) == null ? void 0 : ae.ap) ?? 0), M = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? Pp(h, 1) : 1;
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
      { id: "bonus", label: "Skill Bonus", value: l },
      ...u ? [{
        id: "specialization",
        label: `Specialization (${u.label})`,
        value: d
      }] : [],
      { id: "weaponAccuracy", label: "Weapon Accuracy", value: m },
      { id: "damage", label: "Damage", value: Number(t.damage ?? 0) || 0 },
      { id: "ap", label: "AP", value: v },
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
      totalAp: v
    },
    specialization: u ? {
      key: u.key,
      label: u.label,
      value: d,
      skillKey: i.code ?? t.skill
    } : null
  };
}
async function US({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Defense",
    intent: "defense",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function HS({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Resistance",
    intent: "resistance",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function WS({ actor: a } = {}) {
  var i, n, s, r, l, o;
  const e = Number(((s = (n = (i = a.system) == null ? void 0 : i.attributes) == null ? void 0 : n.reflexes) == null ? void 0 : s.value) ?? 0), t = Number(((o = (l = (r = a.system) == null ? void 0 : r.attributes) == null ? void 0 : l.edge) == null ? void 0 : o.value) ?? 0);
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
async function jS({ actor: a }) {
  var i, n, s, r, l;
  const e = Number(((n = (i = a.system) == null ? void 0 : i.burn) == null ? void 0 : n.value) ?? 0);
  e < 6 && ui.notifications.warn("Overload check is only required at Burn 6+.");
  const t = Number(((l = (r = (s = a.system) == null ? void 0 : s.attributes) == null ? void 0 : r.willpower) == null ? void 0 : l.value) ?? 0);
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
const GS = {
  skill: iS,
  edge: sS,
  attribute: rS,
  common: oS,
  attack: FS,
  defense: US,
  resistance: HS,
  initiative: WS,
  overload: jS
};
async function tr({ actor: a, payload: e, event: t } = {}) {
  if (!a) throw new Error("resolveIntent requires actor");
  const i = String((e == null ? void 0 : e.intent) ?? "").trim();
  if (!i) throw new Error("resolveIntent requires payload.intent");
  const n = GS[i];
  if (!n) throw new Error(`Unsupported roll intent: ${i}`);
  const s = await n({ actor: a, payload: e, event: t });
  return qS(s, { intent: i });
}
function qS(a, { intent: e } = {}) {
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
var ba;
class KS {
  constructor() {
    Ae(this, ba, /* @__PURE__ */ new Map());
  }
  register(e) {
    if (!(e != null && e.id) || typeof e.collect != "function")
      throw new Error("Invalid ModifierProvider: missing id or collect()");
    z(this, ba).has(e.id) || z(this, ba).set(e.id, e);
  }
  async collectAll(e) {
    const t = [];
    for (const i of z(this, ba).values()) {
      const n = await i.collect(e);
      if (console.log("MWD | provider", i.id, "returned", n), !!(n != null && n.length))
        for (const s of n)
          s && typeof s.label == "string" && typeof s.value == "number" && typeof s.source == "string" ? t.push(s) : console.warn("MWD | DROPPED MOD (bad shape)", i.id, s);
    }
    return t;
  }
}
ba = new WeakMap();
const ri = new KS();
function VS(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function YS(a) {
  const e = VS(a == null ? void 0 : a.value);
  return e === null ? null : { ...a, value: e };
}
async function rc({
  actor: a,
  rollType: e,
  skillId: t,
  domains: i,
  // NEW (optional)
  payload: n,
  resolved: s,
  context: r
} = {}) {
  const l = { actor: a, rollType: e, skillId: t, domains: i, payload: n, resolved: s, context: r }, o = await ri.collectAll(l);
  console.log("MWD|condition collect called", l.rollType);
  let c = [];
  for (const d of o ?? []) {
    const m = YS(d);
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
function QS({
  actor: a,
  payload: e,
  ctx: t,
  roll: i,
  target: n,
  pool: s,
  mods: r = [],
  modTotal: l = 0,
  hits: o = null,
  ones: c = null,
  edge: u = null,
  outcomeModel: d = null
} = {}) {
  var K, Y, W, j;
  if (!a) throw new Error("buildResolved requires actor");
  if (!(e != null && e.intent)) throw new Error("buildResolved requires payload.intent");
  if (!i) throw new Error("buildResolved requires roll");
  const m = foundry.utils.randomID(), f = (K = i.dice) == null ? void 0 : K[0], h = (Array.isArray(f == null ? void 0 : f.results) ? f.results : []).map((L, B) => {
    const G = `pool:${B}`, X = Number(L.result), oe = !!L.success;
    return {
      ref: G,
      face: X,
      isSuccess: oe,
      isFailure: !oe,
      tooltip: oe ? `Die ${B + 1}: ${X} (Success vs TN ${Number(n ?? 5)})` : `Die ${B + 1}: ${X} (Failure vs TN ${Number(n ?? 5)})`
    };
  }), g = h.filter((L) => L.isFailure).map((L) => L.ref), y = [{
    id: "pool",
    label: "Pool",
    faces: 6,
    termIndex: 0,
    // informational only
    dice: h
  }], b = (Array.isArray(r) ? r : []).map((L, B) => {
    const G = Number(L.value ?? 0), X = `mod:${XS(L.label ?? "mod")}:${B}`;
    return {
      id: L.id ?? X,
      label: L.label ?? "Modifier",
      value: G,
      domain: L.domain ?? null,
      source: L.source ?? null,
      tooltip: L.tooltip ?? `${L.label ?? "Modifier"} ${oc(G)}`
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
    value: Number(l ?? 0),
    modIds: S,
    tooltip: b.length ? b.map((L) => `${L.label}: ${oc(L.value)}`).join(`
`) : "No roll-time modifiers."
  }), M.push({
    id: "pool.final",
    label: "Final Pool",
    value: Number(s ?? 0),
    tooltip: `Final dice pool rolled: ${Number(s ?? 0)}d6`
  });
  const N = Number.isFinite(Number(o)) ? Number(o) : h.filter((L) => L.isSuccess).length, P = Number.isFinite(Number(c)) ? Number(c) : h.filter((L) => L.face === 1).length, U = JS(u, { payload: e });
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
    dn: (t == null ? void 0 : t.dn) ?? (((Y = t == null ? void 0 : t.difficulty) == null ? void 0 : Y.dn) !== void 0 ? {
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
        pool: ((W = t == null ? void 0 : t.edge) == null ? void 0 : W.pool) ?? null,
        earn: ((j = t == null ? void 0 : t.edge) == null ? void 0 : j.earn) ?? null
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
      hits: N,
      ones: P
    },
    // New: engine-interpreted outcome (margin/net/converted/edgeEarned/etc
    outcomeModel: d,
    // Breakdown + modifiers
    breakdownRows: M,
    modifiers: {
      applied: b,
      total: Number(l ?? 0)
    },
    areaEffectPreviewState: foundry.utils.deepClone((e == null ? void 0 : e.areaEffectPreviewState) ?? {}),
    // Edge snapshot / affordances
    edge: U
  };
}
function JS(a, { payload: e } = {}) {
  var p, h, g, y, b, S, v, M, N, P, U, K, Y, W;
  const t = !!((p = e == null ? void 0 : e.edge) != null && p.enabled), i = (a == null ? void 0 : a.domain) ?? null, n = (a == null ? void 0 : a.pools) ?? null, s = ((h = a == null ? void 0 : a.pre) == null ? void 0 : h.poolKey) ?? ((y = (g = e == null ? void 0 : e.edge) == null ? void 0 : g.pre) == null ? void 0 : y.poolKey) ?? (t ? ((b = e == null ? void 0 : e.edge) == null ? void 0 : b.poolKey) ?? null : null), r = Number(((S = a == null ? void 0 : a.pre) == null ? void 0 : S.spent) ?? ((M = (v = e == null ? void 0 : e.edge) == null ? void 0 : v.pre) == null ? void 0 : M.spent) ?? (t ? 1 : 0)) ? 1 : 0, l = ((N = a == null ? void 0 : a.post) == null ? void 0 : N.poolKey) ?? ((U = (P = e == null ? void 0 : e.edge) == null ? void 0 : P.post) == null ? void 0 : U.poolKey) ?? null, o = Number(((K = a == null ? void 0 : a.post) == null ? void 0 : K.spent) ?? ((W = (Y = e == null ? void 0 : e.edge) == null ? void 0 : Y.post) == null ? void 0 : W.spent) ?? 0) ? 1 : 0, c = (n == null ? void 0 : n.a) ?? null, u = (n == null ? void 0 : n.b) ?? null, d = [c, u].filter(Boolean);
  let m = [c, u].filter(Boolean);
  r && s && (m = m.filter((j) => j !== s));
  const f = {
    canSpendPre: d.length > 0 && !r,
    // spending pre after roll is not a thing
    canSpendPost: m.length > 0 && !o,
    canPostRerollFailures: m.length > 0 && !o
  };
  return {
    domain: i,
    pools: n ? { a: c, b: u } : null,
    pre: { poolKey: s, spent: r },
    post: { poolKey: l, spent: o },
    allowed: {
      prePools: d,
      postPools: m
    },
    availableActions: f
  };
}
function oc(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function XS(a) {
  return String(a).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
const { ApplicationV2: ZS, HandlebarsApplicationMixin: eA } = foundry.applications.api;
function tA(a, e = -3, t = 3) {
  const i = [], n = "../img/dice";
  for (let s = e; s <= t; s++) {
    const r = Math.abs(s), l = r === 0 ? `${n}/BlankDice.webp` : `${n}/D6_${r}.svg`;
    i.push({
      value: s,
      abs: r,
      icon: l,
      active: s === a,
      neg: s < 0,
      pos: s > 0,
      zero: s === 0,
      title: s === 0 ? "0 (neutral)" : s < 0 ? `${s} penalty` : `+${s} bonus`
    });
  }
  return i;
}
function lc(a) {
  return (Array.isArray(a) ? a : []).map((t) => ({
    id: (t == null ? void 0 : t.id) ?? foundry.utils.randomID(),
    label: typeof (t == null ? void 0 : t.label) == "string" ? t.label : "Manual",
    value: Number((t == null ? void 0 : t.value) ?? 0)
  }));
}
function ir(a, e) {
  const t = a == null ? void 0 : a.toggles;
  return t && typeof t == "object" && e in t ? !!t[e] : !!(a != null && a[e]);
}
function iA(a, e) {
  a.useEdge = !!e.useEdge, a.takeRisks = !!e.takeRisks, a.opponentRoll = !!e.opponentRoll, a.toggles = a.toggles && typeof a.toggles == "object" ? a.toggles : {}, a.toggles.useEdge = !!e.useEdge, a.toggles.takeRisks = !!e.takeRisks, a.toggles.opponentRoll = !!e.opponentRoll;
}
function cc(a, e, t) {
  const i = String(t ?? "").trim(), n = i ? of(e, i) : "";
  if (i && n) {
    a.specializationKey = i, a.specializationLabel = n;
    return;
  }
  delete a.specializationKey, delete a.specializationLabel;
}
function aA(a) {
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
var gt;
const Be = class Be extends eA(ZS) {
  constructor({ actor: t, baseContext: i, initialState: n = null, options: s = {} }) {
    var c, u;
    super(s);
    Ae(this, gt, null);
    /** @type {{ baseContext: any, state: any }} */
    O(this, "_mwd", { baseContext: null, state: null });
    this.actor = t, this._mwd.baseContext = i ?? {};
    const r = foundry.utils.deepClone(this._mwd.baseContext.payload ?? {}), l = lc(r.manualModifiers);
    this._mwd.state = foundry.utils.mergeObject(
      {
        payload: r,
        manual: l,
        toggles: {
          useEdge: ir(r, "useEdge"),
          takeRisks: ir(r, "takeRisks"),
          opponentRoll: ir(r, "opponentRoll")
        }
      },
      n ?? {},
      { inplace: !1, insertKeys: !0, insertValues: !0, overwrite: !0 }
    );
    const o = String(((u = (c = r == null ? void 0 : r.edge) == null ? void 0 : c.pre) == null ? void 0 : u.poolKey) ?? "").trim() || null;
    this._mwd.state.edge = {
      prePoolKey: o
    };
  }
  async wait() {
    return new Promise((t) => {
      Ie(this, gt, t), this.render(!0);
    });
  }
  async close(t = {}) {
    if (z(this, gt)) {
      const i = z(this, gt);
      Ie(this, gt, null), i(null);
    }
    return super.close(t);
  }
  /* --------------------------- */
  /* Prepare Context             */
  /* --------------------------- */
  async _prepareContext(t) {
    var K, Y, W, j, L, B, G, X, oe, Se, me, C, V, ne, ae, ke, Ke, St, At, dt, Tt, je, mt, Pt, Nt, Rt, It, Dt, Ot, ft, _t, k, I, Z, Te, Ee, Re, Ge, Xe, pt, Kt;
    const i = this._mwd.baseContext ?? {}, n = this._mwd.state ?? {}, s = Number.isFinite(Number((K = n == null ? void 0 : n.payload) == null ? void 0 : K.dn)) ? Number(n.payload.dn) : Number.isFinite(Number((W = (Y = i == null ? void 0 : i.resolved) == null ? void 0 : Y.dn) == null ? void 0 : W.total)) ? Number(i.resolved.dn.total) : Number.isFinite(Number(i == null ? void 0 : i.dn)) ? Number(i.dn) : Number.isFinite(Number((L = (j = i == null ? void 0 : i.resolved) == null ? void 0 : j.difficulty) == null ? void 0 : L.dn)) ? Number(i.resolved.difficulty.dn) : 1, r = (i == null ? void 0 : i.intent) ?? "skill";
    let l, o;
    const c = Array.isArray(n.manual) ? n.manual.reduce((ee, we) => ee + Number((we == null ? void 0 : we.value) || 0), 0) : 0;
    if (r === "edge") {
      const ee = (i == null ? void 0 : i.resolved) ?? {}, we = Array.isArray(ee.breakdown) ? ee.breakdown : [], at = (ht) => {
        var H;
        return Number(((H = we.find((ue) => ue.id === ht)) == null ? void 0 : H.value) ?? 0);
      }, nt = Number(((B = ee == null ? void 0 : ee.pool) == null ? void 0 : B.attribute) ?? 0);
      l = {
        pool: nt,
        rating: at("rating"),
        cap: at("cap"),
        modifiers: Number(((G = i == null ? void 0 : i.dice) == null ? void 0 : G.modifiers) ?? 0)
      }, o = Math.max(0, nt + l.modifiers + c);
    } else {
      l = {
        attribute: Number(((X = i == null ? void 0 : i.dice) == null ? void 0 : X.attribute) ?? 0),
        skill: Number(((oe = i == null ? void 0 : i.dice) == null ? void 0 : oe.skill) ?? 0),
        bonus: Number(((Se = i == null ? void 0 : i.dice) == null ? void 0 : Se.bonus) ?? 0),
        specialization: Number(((me = i == null ? void 0 : i.dice) == null ? void 0 : me.specialization) ?? 0),
        modifiers: Number(((C = i == null ? void 0 : i.dice) == null ? void 0 : C.modifiers) ?? 0)
      };
      const ee = l.modifiers + c, we = l.attribute + l.skill + l.bonus + l.specialization;
      o = Math.max(0, we + ee);
    }
    const u = Array.isArray((V = i == null ? void 0 : i.resolved) == null ? void 0 : V.domains) ? i.resolved.domains : [], d = u.includes("physical") ? "physical" : u.includes("mental") ? "mental" : u.includes("social") ? "social" : null, f = (d === "physical" ? ["grit", "chaos"] : d === "mental" ? ["insight", "rumor"] : d === "social" ? ["legend", "credibility"] : []).map((ee) => {
      var we, at, nt, ht;
      return {
        key: ee,
        label: ee.charAt(0).toUpperCase() + ee.slice(1),
        available: Number(((nt = (at = (we = this.actor) == null ? void 0 : we.getEdgePool) == null ? void 0 : at.call(we, ee)) == null ? void 0 : nt.effectiveValue) ?? 0),
        selected: ee === (((ht = n.edge) == null ? void 0 : ht.prePoolKey) ?? null)
      };
    }), p = f.find((ee) => ee.selected), h = (p == null ? void 0 : p.label) ?? null, g = ((ne = i == null ? void 0 : i.resolved) == null ? void 0 : ne.attack) ?? null, y = String(
      ((ae = g == null ? void 0 : g.skill) == null ? void 0 : ae.code) ?? ((Ke = (ke = i == null ? void 0 : i.resolved) == null ? void 0 : ke.specialization) == null ? void 0 : Ke.skillKey) ?? ((At = (St = i == null ? void 0 : i.resolved) == null ? void 0 : St.data) == null ? void 0 : At.skillKey) ?? ((dt = i == null ? void 0 : i.payload) == null ? void 0 : dt.key) ?? ""
    ).trim(), b = y ? Qc(((Tt = this.actor) == null ? void 0 : Tt.system) ?? {}, y) : [], S = String(((je = n == null ? void 0 : n.payload) == null ? void 0 : je.specializationKey) ?? "").trim(), v = b.find((ee) => ee.key === S) ?? null;
    if (r !== "edge") {
      l.specialization = v ? Number(((Pt = (mt = i == null ? void 0 : i.resolved) == null ? void 0 : mt.specialization) == null ? void 0 : Pt.value) ?? 2) : 0;
      const ee = l.modifiers + c, we = l.attribute + l.skill + l.bonus + l.specialization;
      o = Math.max(0, we + ee);
    }
    const M = Array.isArray((Nt = g == null ? void 0 : g.payloadState) == null ? void 0 : Nt.payloads) ? g.payloadState.payloads : [], N = String(((Rt = g == null ? void 0 : g.weapon) == null ? void 0 : Rt.category) ?? "").trim().toLowerCase() !== "melee" && M.length > 0, P = String(((It = n == null ? void 0 : n.payload) == null ? void 0 : It.payloadId) ?? ((Dt = g == null ? void 0 : g.payloadState) == null ? void 0 : Dt.activePayloadId) ?? "").trim(), U = M.find((ee) => ee.id === P) ?? null;
    return {
      header: {
        left: ((Ot = i == null ? void 0 : i.header) == null ? void 0 : Ot.left) ?? "Roll",
        right: ((ft = i == null ? void 0 : i.header) == null ? void 0 : ft.right) ?? ((_t = this.actor) == null ? void 0 : _t.name) ?? ""
      },
      formula: String((i == null ? void 0 : i.formula) ?? ((k = i == null ? void 0 : i.resolved) == null ? void 0 : k.formula) ?? "").trim(),
      dice: l,
      modifiers: Array.isArray(i.modifiers) ? i.modifiers : [],
      manual: (n.manual ?? []).map((ee) => ({
        ...ee,
        steps: tA(Number(ee.value ?? 0), -3, 3)
      })),
      edge: {
        domain: d,
        choices: f,
        selectedLabel: h
      },
      toggles: r === "edge" ? { useEdge: !1, takeRisks: !1, opponentRoll: !1 } : n.toggles,
      totalPool: o,
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
        selectedLabel: (v == null ? void 0 : v.label) ?? ""
      } : null,
      attack: g ? {
        weaponName: ((I = g == null ? void 0 : g.weapon) == null ? void 0 : I.name) ?? "Weapon",
        rangeBand: ((Z = g == null ? void 0 : g.weapon) == null ? void 0 : Z.type) === "personalWeapon" || (Te = g == null ? void 0 : g.weapon) != null && Te.isSynthetic ? Ss((g == null ? void 0 : g.rangeBand) ?? "") : (g == null ? void 0 : g.rangeBand) ?? "",
        damageType: ((Ee = U == null ? void 0 : U.modifies) == null ? void 0 : Ee.damageType) || ((Re = g == null ? void 0 : g.weapon) == null ? void 0 : Re.damageTypeLabel) || ((Ge = g == null ? void 0 : g.weapon) == null ? void 0 : Ge.damageType) || "",
        usesPayloads: N,
        source: (g == null ? void 0 : g.sourceState) ?? null,
        payloads: M.map((ee) => {
          var we;
          return {
            id: ee.id,
            name: ee.label,
            damageType: (we = ee.modifies) == null ? void 0 : we.damageType,
            selected: ee.id === P
          };
        }),
        selectedPayloadId: P,
        selectedPayloadLabel: (U == null ? void 0 : U.label) ?? ((Xe = g == null ? void 0 : g.payload) == null ? void 0 : Xe.label) ?? ((pt = g == null ? void 0 : g.weapon) == null ? void 0 : pt.payloadLabel) ?? "",
        selectedSourceLabel: ((Kt = g == null ? void 0 : g.sourceState) == null ? void 0 : Kt.label) ?? ""
      } : null
    };
  }
  /* --------------------------- */
  /* Actions                     */
  /* --------------------------- */
  async _onCancel(t) {
    if (t == null || t.preventDefault(), z(this, gt)) {
      const i = z(this, gt);
      Ie(this, gt, null), i(null);
    }
    return this.close();
  }
  async _onSubmit(t) {
    var n, s, r, l, o, c, u, d, m, f, p, h, g;
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
    }), iA(i.payload, i.toggles ?? {}), cc(
      i.payload,
      ((n = i.payload) == null ? void 0 : n.intent) === "attack" ? ((s = i.payload) == null ? void 0 : s.skillKey) ?? ((c = (o = (l = (r = this._mwd.baseContext) == null ? void 0 : r.resolved) == null ? void 0 : l.attack) == null ? void 0 : o.skill) == null ? void 0 : c.code) : ((u = i.payload) == null ? void 0 : u.key) ?? ((f = (m = (d = this._mwd.baseContext) == null ? void 0 : d.resolved) == null ? void 0 : m.data) == null ? void 0 : f.skillKey),
      (p = i.payload) == null ? void 0 : p.specializationKey
    ), z(this, gt)) {
      const y = z(this, gt);
      Ie(this, gt, null), y({ payload: i.payload });
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
    var l, o;
    t == null || t.preventDefault();
    const n = (l = i == null ? void 0 : i.dataset) == null ? void 0 : l.id, s = (o = i == null ? void 0 : i.dataset) == null ? void 0 : o.field;
    if (!n || !s) return;
    const r = this._mwd.state.manual.find((c) => c.id === n);
    if (r)
      return s === "label" && (r.label = String(i.value ?? "")), s === "value" && (r.value = Number(i.value ?? 0)), this.render(!1);
  }
  async _onSetManualStepper(t, i) {
    var l, o;
    t == null || t.preventDefault();
    const n = (l = i == null ? void 0 : i.dataset) == null ? void 0 : l.id, s = Number((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.value);
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
      return cc(this._mwd.state.payload, n, s), this.render(!1);
  }
  _onRender(t, i) {
    var s, r;
    (s = super._onRender) == null || s.call(this, t, i);
    const n = this.element instanceof HTMLElement ? this.element : (r = this.element) == null ? void 0 : r[0];
    n && (n.querySelectorAll("[data-action='setPayload']").forEach((l) => {
      l.addEventListener("change", (o) => {
        this._onSetPayload(o, o.currentTarget);
      });
    }), n.querySelectorAll("[data-action='setSpecialization']").forEach((l) => {
      l.addEventListener("change", (o) => {
        this._onSetSpecialization(o, o.currentTarget);
      });
    }), n.querySelectorAll("[data-action='setDn']").forEach((l) => {
      l.addEventListener("change", (o) => {
        this._onSetDn(o, o.currentTarget);
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
  static async prompt({ actor: t, basePayload: i, resolved: n, diceParts: s = null, mods: r = [], modTotal: l = 0 } = {}) {
    var h, g;
    const o = foundry.utils.deepClone(i ?? {});
    try {
      const y = (n == null ? void 0 : n.rollType) ?? "simple", b = String((o == null ? void 0 : o.intent) ?? (n == null ? void 0 : n.intent) ?? "").trim().toLowerCase();
      if (y === "simple" && b !== "attack" && (o == null ? void 0 : o.dn) == null) {
        const S = Number(game.settings.get(game.system.id, "gmNextDn"));
        Number.isFinite(S) && (o.dn = Math.max(0, Math.trunc(S)));
      }
    } catch (y) {
      console.warn("MWD: failed to default DN from GM Gadget", y);
    }
    const c = {
      left: (n == null ? void 0 : n.title) ?? "Roll",
      right: (t == null ? void 0 : t.name) ?? ""
    }, u = s ?? aA(n), d = {
      attribute: Number((u == null ? void 0 : u.attribute) ?? 0),
      skill: Number((u == null ? void 0 : u.skill) ?? 0),
      bonus: Number((u == null ? void 0 : u.bonus) ?? 0),
      specialization: Number((u == null ? void 0 : u.specialization) ?? 0),
      modifiers: Number(l ?? 0)
    }, m = (Array.isArray(r) ? r : []).map((y) => ({
      label: y.label ?? "Modifier",
      source: y.source ?? "",
      value: Number(y.value ?? 0)
    }));
    o.manualModifiers = lc(o.manualModifiers);
    const p = await new Be({
      actor: t,
      baseContext: {
        intent: (n == null ? void 0 : n.intent) ?? "skill",
        header: c,
        formula: String((n == null ? void 0 : n.formula) ?? "").trim(),
        dice: d,
        modifiers: m,
        payload: o,
        resolved: n,
        // keep full resolved for edge display
        dn: Number((o == null ? void 0 : o.dn) ?? ((h = n == null ? void 0 : n.dn) == null ? void 0 : h.total) ?? ((g = n == null ? void 0 : n.difficulty) == null ? void 0 : g.dn) ?? 1)
      }
    }).wait();
    return (p == null ? void 0 : p.payload) ?? null;
  }
};
gt = new WeakMap(), O(Be, "DEFAULT_OPTIONS", foundry.utils.mergeObject(
  Vt(Be, Be, "DEFAULT_OPTIONS"),
  {
    id: "mwd-roll-dialog",
    classes: [
      ...Vt(Be, Be, "DEFAULT_OPTIONS").classes ?? [],
      "mwd",
      "mwd-roll-dialog"
    ],
    window: { title: "Roll", resizable: !1 },
    position: { width: 520, height: "auto" },
    actions: {
      submit: Be.prototype._onSubmit,
      cancel: Be.prototype._onCancel,
      addManual: Be.prototype._onAddManual,
      removeManual: Be.prototype._onRemoveManual,
      setManualValue: Be.prototype._onSetManualValue,
      setManualStepper: Be.prototype._onSetManualStepper,
      setEdgePrePool: Be.prototype._onSetEdgePrePool,
      toggleCheckbox: Be.prototype._onToggleCheckbox,
      setDn: Be.prototype._onSetDn,
      setPayload: Be.prototype._onSetPayload,
      setSpecialization: Be.prototype._onSetSpecialization
    }
  },
  { inplace: !1 }
)), O(Be, "PARTS", {
  body: { template: "systems/mwd/templates/v2/roll/mwd-roll-dialog.hbs" }
});
let Zr = Be;
const { ApplicationV2: nA, HandlebarsApplicationMixin: sA } = foundry.applications.api, Wa = class Wa extends sA(nA) {
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
      classes: [game.system.anarchy.styles.selectCssClass(), ...Wa.DEFAULT_OPTIONS.classes],
      window: { title: e }
    };
    return new Wa({ items: t }, i).wait();
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
O(Wa, "PARTS", {
  body: {
    template: `${Q}/dialog/select-item.hbs`
  }
});
let eo = Wa;
const uc = { execute: mA }, rA = {
  physical: ["grit", "chaos"],
  mental: ["insight", "rumor"],
  social: ["legend", "credibility"]
};
function oA(a, e) {
  var s;
  const t = rA[e] ?? [];
  let i = null, n = -1;
  for (const r of t) {
    const l = (s = a.getEdgePool) == null ? void 0 : s.call(a, r), o = Number((l == null ? void 0 : l.rating) ?? 0), c = Number((l == null ? void 0 : l.value) ?? 0), u = Math.max(0, o - c);
    u > n && (n = u, i = r);
  }
  return i ?? t[0] ?? null;
}
function lA(a) {
  const t = (Array.isArray(a == null ? void 0 : a.manualModifiers) ? a.manualModifiers : []).map((n) => ({
    id: n.id ?? foundry.utils.randomID(),
    label: (n.label ?? "Manual").trim() || "Manual",
    value: Number(n.value ?? 0),
    source: "Manual"
  })).filter((n) => Number.isFinite(n.value) && n.value !== 0), i = t.reduce((n, s) => n + s.value, 0);
  return { mods: t, total: i };
}
function dc(a = {}) {
  const e = a.toggles ?? {}, t = String((a == null ? void 0 : a.payloadId) ?? (a == null ? void 0 : a.ammoTypeId) ?? "").trim();
  return {
    ...a,
    ...t ? { payloadId: t } : {},
    toggles: {
      useEdge: !!e.useEdge,
      takeRisks: !!e.takeRisks,
      opponentRoll: !!e.opponentRoll
    },
    manualModifiers: uA(a.manualModifiers)
  };
}
async function cA({ actor: a, payload: e } = {}) {
  var s, r, l, o, c, u, d, m, f, p, h, g;
  if ((e == null ? void 0 : e.intent) !== "attack") return e;
  const t = foundry.utils.deepClone(e ?? {}), i = ((s = a.getPersonalCombatLoadout) == null ? void 0 : s.call(a, { refresh: !0 })) ?? null, n = (y) => {
    var S, v, M, N, P;
    const b = ((v = (S = a.items) == null ? void 0 : S.get) == null ? void 0 : v.call(S, y)) ?? null;
    return !b || !(((M = b.isPersonalWeapon) == null ? void 0 : M.call(b)) ?? b.type === A.itemType.personalWeapon) || !((N = b.system) != null && N.equipped) ? null : ((P = b.getCombatProfile) == null ? void 0 : P.call(b, { payloadId: t == null ? void 0 : t.payloadId })) ?? null;
  };
  if (t.weaponId) {
    const y = n(t.weaponId);
    if (!y)
      throw new Error("Attack requires an owned equipped personal weapon.");
    return t.payloadId = t.payloadId ?? ((r = y == null ? void 0 : y.payloadState) == null ? void 0 : r.activePayloadId) ?? "", t;
  }
  if (t.mode === "auto") {
    if (i != null && i.weaponChoiceRequired) {
      const y = await eo.selectItem(
        "Choose Weapon",
        i.equippedWeapons ?? []
      );
      return y ? (t.weaponId = y.id, t.payloadId = t.payloadId ?? ((l = y == null ? void 0 : y.payloadState) == null ? void 0 : l.activePayloadId) ?? "", delete t.mode, t) : null;
    }
    if ((o = i == null ? void 0 : i.defaultWeapon) != null && o.isSynthetic || ((c = i == null ? void 0 : i.defaultWeapon) == null ? void 0 : c.id) === "unarmed")
      return t.syntheticWeapon = foundry.utils.deepClone(i.defaultWeapon ?? Mt.buildDefaultUnarmedProfile(a)), t.weaponId = t.syntheticWeapon.id, t.payloadId = t.payloadId ?? ((d = (u = t.syntheticWeapon) == null ? void 0 : u.payloadState) == null ? void 0 : d.activePayloadId) ?? "", delete t.mode, t;
    if ((m = i == null ? void 0 : i.defaultWeapon) != null && m.id)
      return t.weaponId = i.defaultWeapon.id, t.payloadId = t.payloadId ?? ((p = (f = i.defaultWeapon) == null ? void 0 : f.payloadState) == null ? void 0 : p.activePayloadId) ?? "", delete t.mode, t;
  }
  if (t.fallback === "unarmed")
    return t.syntheticWeapon = foundry.utils.deepClone(Mt.buildDefaultUnarmedProfile(a)), t.weaponId = t.syntheticWeapon.id, t.payloadId = t.payloadId ?? ((g = (h = t.syntheticWeapon) == null ? void 0 : h.payloadState) == null ? void 0 : g.activePayloadId) ?? "", delete t.mode, t;
  throw new Error("Attack could not resolve a usable weapon.");
}
function uA(a) {
  return Array.isArray(a) ? a.map((e) => ({
    id: (e == null ? void 0 : e.id) ?? foundry.utils.randomID(),
    label: typeof (e == null ? void 0 : e.label) == "string" ? e.label : "Manual",
    value: Number((e == null ? void 0 : e.value) ?? 0)
  })) : [];
}
async function dA(a = []) {
  var t, i, n, s, r, l, o, c, u;
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
    const m = ((r = (s = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : s.get) == null ? void 0 : r.call(s, d)) ?? ((c = (o = (l = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : l.placeables) == null ? void 0 : o.find) == null ? void 0 : c.call(o, (f) => (f == null ? void 0 : f.id) === d)) ?? null;
    (u = m == null ? void 0 : m.setTarget) == null || u.call(m, !0, { releaseOthers: !1, user: game.user });
  }
}
async function mA({ actor: a, payload: e, event: t } = {}) {
  var W, j, L, B, G, X, oe, Se, me, C, V, ne, ae, ke, Ke, St, At, dt, Tt, je, mt, Pt, Nt, Rt, It, Dt, Ot, ft, _t, k, I, Z, Te, Ee, Re, Ge, Xe, pt, Kt, ee, we, at, nt, ht;
  if (a != null && a.actor && (a = a.actor), (W = a == null ? void 0 : a.document) != null && W.actor && (a = a.document.actor), !a) throw new Error("MWD.roll.execute requires actor");
  if (!(e != null && e.intent)) throw new Error("MWD.roll.execute requires payload.intent");
  if (e = dc(e), e = await cA({ actor: a, payload: e }), !e) return null;
  let i = await tr({ actor: a, payload: e, event: t });
  if (e.intent === "attack" && ((L = (j = i == null ? void 0 : i.attack) == null ? void 0 : j.capabilityReport) != null && L.isTemplated)) {
    const H = await OS({
      actor: a,
      attack: i.attack
    });
    if (!H) return null;
    try {
      await DS({
        actor: a,
        attack: i.attack,
        templateGeometry: H.templateGeometry ?? null
      });
    } catch (ue) {
      console.warn("MWD | Unable to create visual template indicator", ue);
    }
    if (await dA(H.autoTargetTokenIds ?? []), !vc(((B = i == null ? void 0 : i.attack) == null ? void 0 : B.areaEffect) ?? ((X = (G = i == null ? void 0 : i.attack) == null ? void 0 : G.payload) == null ? void 0 : X.areaEffect) ?? {}) && (!Array.isArray(H.targetSnapshots) || H.targetSnapshots.length === 0))
      return (oe = ui.notifications) == null || oe.warn("Template placement did not affect any targets."), null;
    e.targetSnapshots = Array.isArray(H.targetSnapshots) ? H.targetSnapshots : [], e.templateGeometry = H.templateGeometry ?? null, e.templatePlacement = H.placement, i = await tr({ actor: a, payload: e, event: t });
  } else e.intent === "attack" && (delete e.targetSnapshots, delete e.templatePlacement, delete e.templateGeometry);
  let n = await rc({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const s = await Zr.prompt({
    actor: a,
    basePayload: e,
    resolved: i,
    diceParts: {
      attribute: ((Se = i == null ? void 0 : i.pool) == null ? void 0 : Se.attribute) ?? 0,
      skill: ((me = i == null ? void 0 : i.pool) == null ? void 0 : me.skill) ?? 0,
      bonus: ((C = i == null ? void 0 : i.pool) == null ? void 0 : C.bonus) ?? 0,
      specialization: ((V = i == null ? void 0 : i.pool) == null ? void 0 : V.specialization) ?? 0
    },
    mods: n.mods,
    modTotal: n.total,
    options: {
      allowEdge: e.intent !== "initiative"
    }
  });
  if (!s) return null;
  if (e = dc(s), i = await tr({ actor: a, payload: e, event: t }), e.intent === "attack" && !((ae = (ne = i == null ? void 0 : i.attack) == null ? void 0 : ne.capabilityReport) != null && ae.isTemplated) && (delete e.targetSnapshots, delete e.templatePlacement, delete e.templateGeometry), e.intent === "attack" && e.weaponId) {
    const H = ((Ke = (ke = a.items) == null ? void 0 : ke.get) == null ? void 0 : Ke.call(ke, e.weaponId)) ?? null;
    if ((St = H == null ? void 0 : H.isPersonalWeapon) != null && St.call(H)) {
      const ue = String(e.payloadId ?? "").trim(), ni = String(((At = H.system) == null ? void 0 : At.selectedPayloadId) ?? "").trim();
      if (ue && ue !== ni && await ((dt = H.setActivePayload) == null ? void 0 : dt.call(H, ue)), !((Tt = H.canConsumePayload) != null && Tt.call(H, { payloadId: ue }))) {
        const wt = (je = H.getPayloadState) == null ? void 0 : je.call(H, { payloadId: ue }), hi = wt != null && wt.payloadLabel ? ` (${wt.payloadLabel})` : "";
        return (mt = ui.notifications) == null || mt.warn(`Not enough payload${hi} for ${H.name}.`), null;
      }
    }
  }
  n = await rc({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const { mods: r, total: l } = n, { mods: o, total: c } = lA(e);
  let u = [...r, ...o], d = Number(l ?? 0) + Number(c ?? 0);
  const m = Number(((Pt = i == null ? void 0 : i.pool) == null ? void 0 : Pt.attribute) ?? 0) + Number(((Nt = i == null ? void 0 : i.pool) == null ? void 0 : Nt.skill) ?? 0) + Number(((Rt = i == null ? void 0 : i.pool) == null ? void 0 : Rt.bonus) ?? 0) + Number(((It = i == null ? void 0 : i.pool) == null ? void 0 : It.specialization) ?? 0), f = Math.max(0, m + Number(d ?? 0)), p = e.intent !== "initiative", h = p ? fA({ actor: a, ctx: i, payload: e }) : null, g = (Dt = h == null ? void 0 : h.pre) != null && Dt.spent ? 4 : Number(i.diceTarget ?? i.target ?? 5), y = {
    snapshot: ((_t = (ft = (Ot = game.mwd) == null ? void 0 : Ot.personalCombat) == null ? void 0 : ft.getSnapshot) == null ? void 0 : _t.call(ft, a)) ?? null
  }, b = Et({
    actor: a,
    phase: "onBuildRoll",
    facts: wo({ actor: a, resolved: i, payload: e, runtime: y }),
    packet: {},
    options: { runtime: y, consumeUsage: !0 }
  });
  await mi({ actor: a, mutations: b.mutations, runtime: y }), p && ((k = h == null ? void 0 : h.pre) != null && k.spent) && ((I = h == null ? void 0 : h.pre) != null && I.poolKey) && await ((Z = a.spendEdge) == null ? void 0 : Z.call(a, h.pre.poolKey, 1));
  let S, v = 0, M = 0;
  if (i.rollType === "sum" && ((Te = i.sum) != null && Te.formula))
    S = await new Roll(i.sum.formula, i.sum.data ?? {}).evaluate(), v = Number(S.total ?? 0) + Number(d ?? 0);
  else {
    S = await new Roll(`${f}d6cs>=${g}`).evaluate();
    const H = (Ee = S.dice) == null ? void 0 : Ee[0];
    v = Array.isArray(H == null ? void 0 : H.results) ? H.results.filter((ue) => ue.success).length : 0, M = Array.isArray(H == null ? void 0 : H.results) ? H.results.filter((ue) => ue.result === 1).length : 0;
  }
  if (i.intent === "initiative" && (S == null ? void 0 : S.total) != null) {
    const H = { total: Number(S.total ?? 0) + Number(d ?? 0) }, ue = Et({
      actor: a,
      phase: "onInitiativeResolved",
      facts: wu({ actor: a, packet: H, runtime: y }),
      packet: H,
      options: { runtime: y, consumeUsage: !0 }
    });
    if (await mi({ actor: a, mutations: ue.mutations, runtime: y }), ue.modifiers.length) {
      const ni = ue.modifiers.reduce((wt, hi) => wt + Number(hi.value ?? 0), 0);
      u = u.concat(ue.modifiers), d += ni, v = Number(ue.packet.total ?? 0), await mc({ actor: a, total: ue.packet.total ?? S.total }), i.breakdown = (i.breakdown ?? []).concat(ue.modifiers.map((wt, hi) => ({
        id: `traitInitiative${hi + 1}`,
        label: wt.label,
        value: Number(wt.value ?? 0)
      })));
    } else
      v = Number(H.total ?? 0), await mc({ actor: a, total: H.total });
  }
  const N = cd(
    i,
    { successes: v, raw: (Re = S == null ? void 0 : S.toJSON) == null ? void 0 : Re.call(S) },
    null
    // opposed rolls can pass defender result later
  ), P = N == null ? void 0 : N.edgeEarned;
  if ((P == null ? void 0 : P.amount) > 0) {
    const H = (Ge = i == null ? void 0 : i.domains) != null && Ge.includes("physical") ? "physical" : (Xe = i == null ? void 0 : i.domains) != null && Xe.includes("mental") ? "mental" : (pt = i == null ? void 0 : i.domains) != null && pt.includes("social") ? "social" : null, ue = oA(a, H);
    await ((Kt = a.gainEdge) == null ? void 0 : Kt.call(a, ue, P.amount)), N.edgeEarned.pool = ue;
  }
  i.intent === "overload" && await gA({ actor: a, passed: N.passed });
  let U = null;
  i.intent === "attack" && (U = await rd({
    attacker: a,
    ctx: i,
    outcomeModel: N
  }));
  const K = QS({
    actor: a,
    payload: e,
    ctx: i,
    roll: S,
    target: g,
    pool: f,
    mods: u,
    modTotal: d,
    hits: v,
    ones: M,
    edge: h,
    outcomeModel: N
  });
  U && (K.attackResult = U);
  const Y = await cn({ resolved: K });
  if (e.intent === "attack" && e.weaponId) {
    const H = ((we = (ee = a.items) == null ? void 0 : ee.get) == null ? void 0 : we.call(ee, e.weaponId)) ?? null;
    (at = H == null ? void 0 : H.isPersonalWeapon) != null && at.call(H) && (await ((nt = H.consumePayload) == null ? void 0 : nt.call(H, { payloadId: e.payloadId })) || (ht = ui.notifications) == null || ht.warn(`Payload could not be consumed for ${H.name}.`));
  }
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: a }),
    content: Y,
    flags: {
      mwd: {
        payload: e,
        resolved: K
      }
    }
  });
}
function fA({ actor: a, ctx: e, payload: t }) {
  var p, h, g, y, b, S, v;
  const i = pA(e == null ? void 0 : e.domains), n = hA[i] ?? null, s = (n == null ? void 0 : n.a) ?? null, r = (n == null ? void 0 : n.b) ?? null, l = [s, r].filter(Boolean), o = !!((p = t == null ? void 0 : t.toggles) != null && p.useEdge) || !!(t != null && t.useEdge);
  let c = String(((g = (h = t == null ? void 0 : t.edge) == null ? void 0 : h.pre) == null ? void 0 : g.poolKey) ?? "").trim() || null;
  c && !l.includes(c) && (c = null);
  const u = o && c ? 1 : 0;
  let d = [...l];
  u && c && (d = d.filter((M) => M !== c));
  let m = String(((b = (y = t == null ? void 0 : t.edge) == null ? void 0 : y.post) == null ? void 0 : b.poolKey) ?? "").trim() || null;
  m && !d.includes(m) && (m = null);
  const f = Number(((v = (S = t == null ? void 0 : t.edge) == null ? void 0 : S.post) == null ? void 0 : v.spent) ?? 0) ? 1 : 0;
  return {
    domain: i,
    pools: n ? { a: s, b: r } : null,
    pre: { poolKey: c, spent: u },
    post: { poolKey: m, spent: f },
    allowed: { prePools: l, postPools: d }
  };
}
function pA(a) {
  return Array.isArray(a) ? a.includes("physical") ? "physical" : a.includes("mental") ? "mental" : a.includes("social") ? "social" : null : null;
}
const hA = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};
async function mc({ actor: a, total: e }) {
  var l, o, c, u, d;
  const t = (o = (l = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : l.controlled) == null ? void 0 : o.find((m) => {
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
async function gA({ actor: a, passed: e }) {
  e || await a.update({ "system.burn.overloaded": !0 });
}
const yA = /* @__PURE__ */ new Set(["physical", "mental", "social"]);
function bA(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function SA(a) {
  if (!a) return;
  const e = String(a).trim().toLowerCase();
  return yA.has(e) ? e : void 0;
}
class AA {
  constructor() {
    O(this, "id", "mwd.itemModifiers");
    O(this, "label", "Item Modifiers");
  }
  collect(e) {
    var n, s;
    const t = e == null ? void 0 : e.actor;
    if (!t) return [];
    const i = [];
    for (const r of t.items) {
      const l = (s = (n = r.flags) == null ? void 0 : n.mwd) == null ? void 0 : s.modifiers;
      if (!(!Array.isArray(l) || l.length === 0))
        for (const o of l) {
          if (!o) continue;
          const c = bA(o.value);
          if (c === null) {
            console.warn("MWD | Dropping item modifier with invalid value", {
              actor: t.name,
              item: r.name,
              modifier: o
            });
            continue;
          }
          i.push({
            label: o.label ?? r.name,
            value: c,
            source: r.name,
            domain: SA(o.domain)
          });
        }
    }
    return i;
  }
}
class TA {
  constructor() {
    O(this, "id", "mwd.statusEffects");
    O(this, "label", "Status Effects");
  }
  collect({ actor: e } = {}) {
    var n;
    const t = e == null ? void 0 : e.statuses;
    if (!e || !t) return [];
    const i = [];
    for (const s of t) {
      const r = hs(s), l = r ? gs(r, e) ? r.modifierKey : "" : s, o = pa == null ? void 0 : pa[l];
      if ((n = o == null ? void 0 : o.mods) != null && n.length)
        for (const c of o.mods) {
          const u = Array.isArray(c.domains) ? c.domains : [], d = c.value;
          if (u.length)
            for (const m of u)
              i.push({
                label: o.label ?? s,
                value: d,
                source: "Status",
                domain: m
              });
          else
            i.push({
              label: o.label ?? s,
              value: d,
              source: "Status"
            });
        }
    }
    return i;
  }
}
class wA {
  constructor() {
    O(this, "id", "mwd.baseRollModifiers");
    O(this, "label", "Roll (Base)");
  }
  collect({ payload: e } = {}) {
    var r, l, o;
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
    const n = ((l = e == null ? void 0 : e.dialog) == null ? void 0 : l.otherMods) ?? ((o = e == null ? void 0 : e.modifiers) == null ? void 0 : o.otherMods) ?? (e == null ? void 0 : e.otherMods) ?? 0, s = Number(n);
    return Number.isFinite(s) && s !== 0 && t.push({
      id: "otherMods",
      label: "Other modifiers",
      value: s,
      source: "Roll"
    }), t;
  }
}
class vA {
  constructor() {
    O(this, "id", "mwd.condition");
    O(this, "label", "Condition");
  }
  collect({ actor: e, rollType: t } = {}) {
    var l, o, c, u, d, m, f, p;
    if (!e) return [];
    if (t === "edge") return [];
    const i = ((l = e.system) == null ? void 0 : l.derived) ?? {}, n = Number(
      ((o = i == null ? void 0 : i.condition) == null ? void 0 : o.physicalPenalty) ?? ((u = (c = i == null ? void 0 : i.monitors) == null ? void 0 : c.physical) == null ? void 0 : u.penalty) ?? 0
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
const kA = {
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
class EA {
  constructor() {
    O(this, "id", "mwd.lifeModules");
    O(this, "label", "Life Modules");
  }
  collect({ actor: e, resolved: t } = {}) {
    return rh({ actor: e, resolved: t });
  }
}
class MA {
  constructor() {
    O(this, "id", "mwd.traits");
    O(this, "label", "Traits");
  }
  collect({ actor: e, resolved: t, payload: i } = {}) {
    var s, r, l;
    if (!e) return [];
    const n = {
      snapshot: ((l = (r = (s = game.mwd) == null ? void 0 : s.personalCombat) == null ? void 0 : r.getSnapshot) == null ? void 0 : l.call(r, e)) ?? null
    };
    return Et({
      actor: e,
      phase: "onBuildRoll",
      facts: wo({ actor: e, resolved: t, payload: i, runtime: n }),
      packet: {},
      options: { runtime: n, consumeUsage: !1 }
    }).modifiers;
  }
}
function CA() {
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
function PA() {
  return {
    get(a) {
      return Wt(a);
    },
    getSkills({ withKnowledge: a = !1 } = {}) {
      return Gn();
    },
    list() {
      return Gn();
    }
  };
}
function NA() {
  return {
    get(a) {
      return Ni(a);
    },
    list() {
      return vs();
    },
    listByType(a) {
      return No(a);
    },
    getTypeLabel(a) {
      return wa(a);
    },
    evaluate(a) {
      return Ii(a);
    }
  };
}
function RA() {
  return {
    normalizeQualitySystem(a) {
      return Ht(a);
    },
    getEditorConfig() {
      return yu();
    },
    evaluatePhase(a) {
      return Et(a);
    },
    applyMutations(a) {
      return mi(a);
    },
    buildRollFacts(a) {
      return wo(a);
    },
    buildActionCostFacts(a) {
      return Tu(a);
    },
    buildBurnFacts(a) {
      return Mn(a);
    },
    buildInitiativeFacts(a) {
      return wu(a);
    },
    buildDamageFacts(a) {
      return vu(a);
    },
    buildEdgeFacts(a) {
      return br(a);
    },
    buildEndOfActivationFacts(a) {
      return ku(a);
    }
  };
}
class Wo {
  static start() {
    const e = new Wo();
    Hooks.once("init", () => e.onInit()), Hooks.once("ready", () => e.onReady());
  }
  async onInit() {
    console.log(be + "AnarchySystem.onInit"), game.system.mwd = this, game.system.anarchy = this, game.mwd ?? (game.mwd = {}), CA(), Gy(), Eg("mwd"), game.mwd.roll = uc, game.mwd.attacks = ql, game.mwd.personalCombat = x, game.mwd.harm = yt, this.roll = uc, this.attacks = ql, this.personalCombat = x, this.harm = yt, this.skills = PA(), this.lifeModules = NA(), this.traits = RA(), this.remoteCall = new fr(), game.system.mwd.skills = this.skills, game.system.mwd.lifeModules = this.lifeModules, game.system.mwd.traits = this.traits, game.mwd.skills = this.skills, game.mwd.lifeModules = this.lifeModules, game.mwd.traits = this.traits, ye.init(), this.modifiers = new ce(), ri.register(new AA()), ri.register(new TA()), ri.register(new wA()), ri.register(new vA()), ri.register(kA), ri.register(new EA()), ri.register(new MA()), ri.register(new Zh()), Handlebars.registerHelper("mwdClassList", (e) => Array.isArray(e) ? e.join(" ") : typeof e == "string" ? e : ""), this.actorClasses = {
      character: Rl,
      npc: Rl,
      vehicle: Vu,
      battlemech: Qh
    }, this.hooks = new qi(), this.styles = new Rh(), this.handlebarsManager = new Ro(), x.init(), ly.register(), Hooks.on("updateSetting", (e) => {
      (e == null ? void 0 : e.key) === `${T}.statusConditionCatalog` && tl();
    }), console.log(be + "AnarchySystem.onInit | loading system"), CONFIG.ANARCHY = Pe, CONFIG.Combat.initiative = { formula: "2d6" }, tl(), CONFIG.Actor.documentClass = tS, CONFIG.Item.documentClass = ka, ka.init(), hd(), If(), Db(), Qb(), await Zb(), console.log(be + "AnarchySystem.onInit | done");
  }
  async onReady() {
    if (console.log(be + "AnarchySystem.onReady"), await x.onReady(), !game.user.isGM) return;
    await eh();
    const e = game.settings.get(T, "enableGMGadget");
    if (!e) {
      console.log(`${be}GMManager render skipped (enableGMGadget=false)`);
      return;
    }
    game.mwd = game.mwd ?? {}, game.mwd.gmGadget = () => Mg({ systemId: T }).render({ force: !0 }), e && game.mwd.gmGadget();
  }
}
Wo.start();
//# sourceMappingURL=index.mjs.map
