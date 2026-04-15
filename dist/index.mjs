var dm = Object.defineProperty;
var mm = Object.getPrototypeOf;
var fm = Reflect.get;
var il = (a) => {
  throw TypeError(a);
};
var pm = (a, e, t) => e in a ? dm(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var D = (a, e, t) => pm(a, typeof e != "symbol" ? e + "" : e, t), Bs = (a, e, t) => e.has(a) || il("Cannot " + t);
var F = (a, e, t) => (Bs(a, e, "read from private field"), t ? t.call(a) : e.get(a)), Me = (a, e, t) => e.has(a) ? il("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), Oe = (a, e, t, i) => (Bs(a, e, "write to private field"), i ? i.call(a, t) : e.set(a, t), t), M = (a, e, t) => (Bs(a, e, "access private method"), t);
var Yt = (a, e, t) => fm(mm(a), t, e);
const Ie = {
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
}, v = Ie, w = "mwd", hm = "MechWarrior: Destiny", mr = `system.${w}`, gm = w, un = `systems/${w}`, _c = `${un}/style`, za = `${un}/third-party/style`, J = `systems/${w}/templates`, ds = `${un}/img/icons`, ce = `${ds}/skills`, ve = "MWD | ", ym = 2, bm = 5, Sm = 4, Lc = 8, Ti = {
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
}, fr = {
  autopilot: "autopilot",
  firewall: "firewall",
  knowledge: "knowledge"
}, St = {
  grit: "grit",
  chaos: "chaos",
  insight: "insight",
  rumor: "rumor",
  legend: "legend",
  credibility: "credibility"
}, mo = {
  physical: [St.grit, St.chaos],
  mental: [St.insight, St.rumor],
  social: [St.legend, St.credibility]
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
  actorAttributes: Ti,
  itemAttributes: fr,
  attributes: { ...Ti, ...fr },
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
    edgePools: St,
    edgePoolGroups: mo,
    physical: {
      grit: St.grit,
      chaos: St.chaos
    },
    mental: {
      insight: St.insight,
      rumor: St.rumor
    },
    social: {
      legend: St.legend,
      credibility: St.credibility
    },
    chaos: St.chaos
  },
  area: {
    none: "none",
    shotgun: "shotgun",
    circle: "circle",
    cone: "cone",
    rect: "rect",
    ray: "ray"
  }
}, Am = Object.freeze({
  physical: "physical",
  mental: "mental",
  social: "social"
});
Object.freeze(Object.values(Am));
const va = {
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
}, zs = {
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
}, ot = {
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
  SYSTEM_NAME: w,
  SYSTEM_DESCRIPTION: hm,
  SYSTEM_SOCKET: mr,
  SYSTEM_SCOPE: gm,
  SYSTEM_PATH: un,
  STYLE_PATH: _c,
  THIRD_PARTY_STYLE_PATH: za,
  TEMPLATES_PATH: J,
  ICONS_PATH: ds,
  ICONS_SKILLS_PATH: ce,
  LOG_HEAD: ve,
  SPECIALIZATION_BONUS: ym,
  TARGET_SUCCESS: bm,
  TARGET_SUCCESS_EDGE: Sm,
  BASE_MONITOR: Lc,
  ACTOR_ATTRIBUTES: Ti,
  ITEM_ATTRIBUTES: fr,
  EDGE_POOL_GROUPS: mo,
  TEMPLATE: A,
  ANARCHY_SYSTEM: ot
};
const Xt = class Xt {
  static ascending(e = (t) => t) {
    return (t, i) => Xt.sortingBy(e(t), e(i));
  }
  static descending(e = (t) => t) {
    return (t, i) => Xt.sortingBy(e(i), e(t));
  }
  static sortingBy(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
  }
  static bySortedArray(e) {
    return (t) => e.indexOf(t);
  }
  static ascendingBySortedArray(e) {
    return Xt.ascending(Xt.bySortedArray(e));
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
    return e.map(t).filter((i) => i != null).reduce(Xt.sum(), 0);
  }
  static divint(e, t) {
    return Math.floor(e / t);
  }
  static divup(e, t) {
    return Math.ceil(e / t);
  }
  static join(e, t = "") {
    return e.reduce(Xt.joiner(t));
  }
  static joiner(e = "") {
    return (t, i) => t + e + i;
  }
  static classify(e, t = (i) => i.type) {
    let i = {};
    return Xt.classifyInto(i, e, t), i;
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
D(Xt, "isString", (e) => typeof e == "string" || e instanceof String);
let se = Xt;
const wm = {
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
    I.hbsAttributes = I.mapObjectToKeyValue(v.attributes).filter((p) => p.value !== "knowledge" && p.value !== "noAttribute"), I.hbsItemTypes = I.mapObjectToKeyValue(v.itemType), I.hbsMonitors = I.mapObjectToKeyValue(v.monitor), I.hbsMonitorLetters = I.mapObjectToKeyValue(v.monitorLetter), I.hbsAssetModuleCategories = I.mapObjectToKeyValue(v.assetModuleCategory), (i = (t = v.item) == null ? void 0 : t.lifeModule) != null && i.type ? I.hbsLifeModuleTypes = I.mapObjectToKeyValue(v.item.lifeModule.type) : (console.warn("MWD | MWD.item.lifeModule.type is missing; life module enums disabled."), I.hbsLifeModuleTypes = []), I.hbsAreas = I.mapObjectToKeyValue(v.area), I.hbsRanges = I.mapObjectToKeyValue(v.range), I.hbsVehicleCategories = I.mapObjectToKeyValue(v.vehicleCategory), I.hbsMwdWeightClasses = I.mapObjectToKeyValue((n = v.mwd) == null ? void 0 : n.weightClass), I.hbsMwdHardpointTypes = I.mapObjectToKeyValue((s = v.mwd) == null ? void 0 : s.hardpointType), I.hbsMwdHardpointSizes = I.mapObjectToKeyValue((r = v.mwd) == null ? void 0 : r.hardpointSize), I.hbsMwdHardpointLocations = I.mapObjectToKeyValue((o = v.mwd) == null ? void 0 : o.hardpointLocation), I.hbsMwdPrimaryModes = I.mapObjectToKeyValue((l = v.mwd) == null ? void 0 : l.primarySlotMode), I.hbsMwdWeaponCategories = I.mapObjectToKeyValue((c = v.mwd) == null ? void 0 : c.weaponCategory), I.hbsMwdWeaponDamageTypes = I.mapObjectToKeyValue((u = v.mwd) == null ? void 0 : u.weaponDamageType), I.hbsPersonalWeaponDamageTypes = I.mapObjectToKeyValue((d = v.mwd) == null ? void 0 : d.personalDamageType), I.hbsPersonalWeaponDamageCategories = I.mapObjectToKeyValue((m = v.mwd) == null ? void 0 : m.personalDamageCategory), I.hbsMwdMeleeLocations = I.mapObjectToKeyValue((f = v.mwd) == null ? void 0 : f.meleeLocation), I.hbsDamageTypes = se.distinct(
      (I.hbsMwdWeaponDamageTypes ?? []).concat(I.hbsPersonalWeaponDamageTypes ?? []),
      (p) => p.value
    );
    const e = Object.values(va).flat();
    I.sortedAttributeKeys = se.distinct(
      e.concat(Object.keys(v.attributes ?? {}))
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
    return wm;
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
let Te = I;
class Tm {
  static monitor(e) {
    return Te.getFromList(Te.getMonitors(), e) ?? "";
  }
  static letter(e) {
    return Te.getFromList(Te.getMonitorLetters(), e) ?? "";
  }
}
class vm {
  static toLowerCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}
const km = [
  "fas fa-dice",
  "fas fa-dice-one",
  "fas fa-dice-two",
  "fas fa-dice-three",
  "fas fa-dice-four",
  "fas fa-dice-five",
  "fas fa-dice-six"
];
class V {
  static fontAwesome(e) {
    return `<i class="${e}"></i>`;
  }
  static iconSystemPath(e, t) {
    return V.iconPath(`${_c}/${e}`, t);
  }
  static iconPath(e, t) {
    return `<img class="${t}" src="${e}" />`;
  }
  static iconD6(e) {
    if (e < 0 || e > 6)
      throw `Dice ${e} is out of dice range [1..6] or 0 for multidice`;
    return V.fontAwesome(km[e]);
  }
}
globalThis.ANARCHY_ICONS = V;
const Ce = (a, e = {}) => a.replace(/\{(.*?)\}/g, (t, i) => e[i] ?? "");
function fo(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => fo(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function Ya(a = []) {
  return Array.from(new Set(a.map((e) => String(e ?? "").trim()).filter(Boolean)));
}
function Mn(a, e = "standard") {
  return String(a ?? "").trim() || e;
}
function Mm(a, e = {}) {
  a && (a.movedToKeywords ?? (a.movedToKeywords = []), a.movedToKeywords.push(e));
}
function Em(a, e, t = {}) {
  a && (a.errors ?? (a.errors = []), a.errors.push({ message: e, ...t }));
}
const po = Object.freeze(["templated"]), Cm = Object.freeze([
  "burstCapable",
  "fullAutoCapable",
  "salvoCapable"
]), Pm = Object.freeze([
  "clustered",
  "mineLayer",
  "smoke",
  "incendiary",
  "emp"
]), Nm = Object.freeze([
  { value: "burstCapable", label: "Burst Capable" },
  { value: "fullAutoCapable", label: "Full Auto Capable" },
  { value: "salvoCapable", label: "Salvo Capable" }
]), Rm = Object.freeze([
  { value: "templated", label: "Templated" },
  { value: "clustered", label: "Clustered" },
  { value: "mineLayer", label: "Mine Layer" },
  { value: "smoke", label: "Smoke" },
  { value: "incendiary", label: "Incendiary" },
  { value: "emp", label: "EMP" }
]), xc = Object.freeze([
  { value: "blast", label: "Blast" },
  { value: "cone", label: "Cone" },
  { value: "line", label: "Line" },
  { value: "cloud", label: "Cloud" },
  { value: "minefield", label: "Minefield" }
]), $c = Object.freeze([
  { value: "targeted", label: "Targeted (start on target)" },
  { value: "origin", label: "Origin (start on attacker)" },
  { value: "placed", label: "Placed (start free)" }
]), Im = Object.freeze(["blast", "cone", "line"]);
new Set(po);
const Dm = /* @__PURE__ */ new Set([
  ...po,
  ...Cm
]), Om = /* @__PURE__ */ new Set([
  ...po,
  ...Pm
]);
function ho() {
  return {
    movedToKeywords: [],
    errors: []
  };
}
function qn(a) {
  return Ya(fo(a));
}
function Bc({
  traits: a = [],
  keywords: e = [],
  recognized: t = /* @__PURE__ */ new Set(),
  report: i = null,
  owner: n = "weapon",
  path: s = ""
} = {}) {
  const r = fo(a), o = qn(e), l = [], c = [...o];
  for (const u of r) {
    if (t.has(u)) {
      l.push(u);
      continue;
    }
    c.push(u), Mm(i, {
      owner: n,
      from: s || "traits",
      to: s ? s.replace(/traits$/u, "keywords") : "keywords",
      value: u
    });
  }
  return {
    traits: Ya(l),
    keywords: Ya(c)
  };
}
function zc({
  traits: a = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.traits"
} = {}) {
  return Bc({
    traits: a,
    keywords: e,
    recognized: Dm,
    report: t,
    owner: "weapon",
    path: i
  });
}
function Fc({
  traits: a = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.payloads[].traits"
} = {}) {
  return Bc({
    traits: a,
    keywords: e,
    recognized: Om,
    report: t,
    owner: "payload",
    path: i
  });
}
function Uc(a = {}, e = "standard") {
  const t = a ?? {}, i = Mn(
    t.resolverKey ?? t.damageModel ?? t.resolver,
    e
  ), n = String(t.damageModel ?? "").trim(), s = t.onHitEffect;
  return {
    resolverKey: i,
    damageModel: n,
    onHitEffect: s === null ? null : String(s ?? "").trim() || null
  };
}
function Fs(a = {}) {
  const e = a ?? {}, t = !!e.enabled, i = e.shots, n = e.accuracyMod, s = e.addHeat, r = e.consumption;
  return {
    enabled: t,
    ...i !== void 0 ? { shots: Math.max(0, Number(i ?? 0) || 0) } : {},
    ...n !== void 0 ? { accuracyMod: Number(n ?? 0) || 0 } : {},
    ...s !== void 0 ? { addHeat: Number(s ?? 0) || 0 } : {},
    ...r !== void 0 ? { consumption: Math.max(0, Number(r ?? 0) || 0) } : {}
  };
}
function _m(a = {}) {
  const e = a ?? {};
  return {
    single: Fs(e.single),
    burst: Fs(e.burst),
    fullAuto: Fs(e.fullAuto)
  };
}
function Lm(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return e === "circle" ? "blast" : e === "ray" ? "line" : xc.some((t) => t.value === e) ? e : "";
}
function xm(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return ["target", "targeted"].includes(e) ? "targeted" : $c.some((t) => t.value === e) ? e : "";
}
function $m(a = null) {
  const e = a ?? {}, t = Lm(e.shape ?? e.t ?? e.type), i = e.size ?? e.distance ?? e.radius ?? e.length, n = xm(e.placement ?? e.origin ?? e.mode);
  return !t && i === void 0 && !n ? null : {
    shape: t,
    size: Math.max(0, Number(i ?? 0) || 0),
    placement: n || "targeted"
  };
}
function Bm({
  weapon: a = {},
  payload: e = {},
  effectiveTraits: t = [],
  effectiveResolution: i = null,
  report: n = null
} = {}) {
  var g, y;
  const s = Ya((a == null ? void 0 : a.traits) ?? []), r = Ya((e == null ? void 0 : e.traits) ?? []), o = t.includes("templated"), l = s.includes("templated"), c = r.includes("templated"), u = (e == null ? void 0 : e.template) ?? null, d = (a == null ? void 0 : a.template) ?? null, m = Mn((g = e == null ? void 0 : e.resolution) == null ? void 0 : g.resolverKey, ""), f = Mn((y = a == null ? void 0 : a.resolution) == null ? void 0 : y.resolverKey, ""), p = Mn(i == null ? void 0 : i.resolverKey, "standard"), h = [];
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
    Em(n, b, { capability: "templated" });
  return {
    errors: h,
    liveCapabilities: ["templated"],
    template: u,
    resolverKey: p,
    isTemplated: !0
  };
}
const Qa = Object.freeze(["none", "minor", "major", "full"]), zm = Object.freeze(["blast", "cone", "line", "rect"]), Fm = Object.freeze({
  blast: "circle",
  cone: "cone",
  line: "ray",
  rect: "rect"
}), Um = Object.freeze({
  circle: "blast",
  cone: "cone",
  ray: "line",
  rect: "rect",
  rectangle: "rect"
}), ae = Object.freeze({
  none: "none",
  minor: "minor",
  major: "major",
  full: "full"
}), Hm = Object.freeze({
  none: 0,
  minor: 0.25,
  major: 0.5,
  full: 1
}), Tt = Object.freeze({
  discrete: "discrete",
  persistent: "persistent"
});
function _(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Wm(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return ["true", "1", "yes", "y", "on"].includes(t) ? !0 : ["false", "0", "no", "n", "off"].includes(t) ? !1 : e;
}
function Hc(a) {
  return foundry.utils.deepClone(a);
}
function _e(a, e = ae.none) {
  const t = String(a ?? "").trim().toLowerCase();
  return Qa.includes(t) ? t : e;
}
function pr(a) {
  return Number(Hm[_e(a)] ?? 0) || 0;
}
function Pi(a) {
  return Qa.indexOf(_e(a));
}
function hr(a, e = 1) {
  const t = Math.max(0, Pi(a)), i = Math.max(0, t - Math.max(0, Math.trunc(_(e, 1))));
  return Qa[i] ?? ae.none;
}
function jm(a, e = 1) {
  const t = Math.max(0, Pi(a)), i = Math.min(Qa.length - 1, t + Math.max(0, Math.trunc(_(e, 1))));
  return Qa[i] ?? ae.full;
}
function Dt(a) {
  return _e(a).toUpperCase();
}
function go(a = {}) {
  var n, s, r, o, l;
  const e = a ?? {}, t = Math.max(1, Math.trunc(_(
    ((n = e == null ? void 0 : e.escalation) == null ? void 0 : n.intervalTurns) ?? ((s = e == null ? void 0 : e.escalation) == null ? void 0 : s.interval) ?? 1,
    1
  ))), i = Math.max(0, Math.trunc(_(((r = e == null ? void 0 : e.escalation) == null ? void 0 : r.rate) ?? 1, 1)));
  return {
    startExposure: _e(e.startExposure, ae.minor),
    escalation: {
      rate: i,
      intervalTurns: t,
      max: _e((o = e == null ? void 0 : e.escalation) == null ? void 0 : o.max, ae.full)
    },
    onFull: {
      burnDelta: Math.max(0, Math.trunc(_(((l = e == null ? void 0 : e.onFull) == null ? void 0 : l.burnDelta) ?? 0, 0)))
    },
    clearOnExit: Wm(e.clearOnExit, !0)
  };
}
function pi(a = {}) {
  const e = a ?? {}, t = String(e.kind ?? Tt.discrete).trim().toLowerCase() === Tt.persistent ? Tt.persistent : Tt.discrete;
  return {
    kind: t,
    hazard: t === Tt.persistent ? go(e.hazard ?? e) : null
  };
}
function Wc(a = {}) {
  return pi(a).kind === Tt.persistent;
}
function qi(a, e) {
  return Math.max(0, Math.ceil(_(a, 0) * pr(e)));
}
function ms(a, e = "") {
  const t = String(a ?? "").trim().toLowerCase();
  return zm.includes(t) ? t : e;
}
function jc(a, e = "circle") {
  return Fm[ms(a)] ?? e;
}
function Km(a, e = "") {
  const t = String(a ?? "").trim().toLowerCase();
  return Um[t] ?? e;
}
function yo(a) {
  let e = _(a, 0);
  for (; e < 0; ) e += 360;
  for (; e >= 360; ) e -= 360;
  return e;
}
function hi() {
  var a, e, t;
  return _(((e = (a = canvas == null ? void 0 : canvas.scene) == null ? void 0 : a.grid) == null ? void 0 : e.distance) ?? ((t = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : t.distance), 1) || 1;
}
function Vn() {
  var a, e;
  return _(((a = canvas == null ? void 0 : canvas.grid) == null ? void 0 : a.size) ?? ((e = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : e.size), 100) || 100;
}
function ut(a = 0) {
  return _(a, 0) * (Vn() / hi());
}
function _a(a = 0) {
  return _(a, 0) * (hi() / Vn());
}
function gr(a = {}, e = {}) {
  return Math.hypot(_(a.x, 0) - _(e.x, 0), _(a.y, 0) - _(e.y, 0));
}
function dn(a) {
  return _(a, 0) * Math.PI / 180;
}
function Gm({ geometry: a = {}, tokenCenter: e = {} } = {}) {
  const t = _(e.x, 0) - _(a.x, 0), i = _(e.y, 0) - _(a.y, 0), n = dn(a.direction ?? 0), s = Math.cos(n), r = Math.sin(n);
  return Math.max(0, t * s + i * r);
}
function Us(a = 0, e = 0) {
  if (!(e > 0)) return ae.none;
  const t = Math.max(0, Math.min(1, a / e));
  return t <= 1 / 3 ? ae.full : t <= 2 / 3 ? ae.major : t <= 1 ? ae.minor : ae.none;
}
function al({ template: a = {}, placement: e = {} } = {}) {
  var l, c;
  const t = ms((e == null ? void 0 : e.shape) ?? (a == null ? void 0 : a.shape), "");
  if (!t) return null;
  const i = _(
    (e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size),
    0
  );
  if (!(i > 0)) return null;
  const n = t === "cone" ? _((e == null ? void 0 : e.angle) ?? 90, 90) : null, s = t === "line" ? _((e == null ? void 0 : e.width) ?? hi(), hi()) : null, r = t === "rect" ? _((e == null ? void 0 : e.width) ?? (a == null ? void 0 : a.width) ?? (e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size), 0) : null, o = t === "rect" ? _((e == null ? void 0 : e.height) ?? (a == null ? void 0 : a.height) ?? (e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size), 0) : null;
  return t === "rect" && (!(r > 0) || !(o > 0)) ? null : {
    shape: t,
    measuredTemplateType: jc(t),
    x: _((l = e == null ? void 0 : e.anchor) == null ? void 0 : l.x, 0),
    y: _((c = e == null ? void 0 : e.anchor) == null ? void 0 : c.y, 0),
    direction: yo((e == null ? void 0 : e.direction) ?? 0),
    distance: t === "rect" ? Math.max(r, o) : i,
    angle: n,
    width: s,
    height: t === "rect" ? o : null,
    anchorX: t === "rect" ? _((e == null ? void 0 : e.anchorX) ?? (a == null ? void 0 : a.anchorX) ?? 0, 0) : null,
    anchorY: t === "rect" ? _((e == null ? void 0 : e.anchorY) ?? (a == null ? void 0 : a.anchorY) ?? 0, 0) : null,
    placementMode: String((a == null ? void 0 : a.placement) ?? (e == null ? void 0 : e.placementMode) ?? "").trim() || null
  };
}
function Le(a = null, { template: e = null, placement: t = null } = {}) {
  var u, d, m, f;
  const i = a && typeof a == "object" ? a : {};
  if ((!i || !Object.keys(i).length) && (e || t))
    return al({ template: e, placement: t });
  const n = String(
    i.measuredTemplateType ?? i.t ?? i.type ?? ""
  ).trim().toLowerCase(), s = ms(
    i.shape ?? Km(n) ?? "",
    ""
  );
  if (!s)
    return e || t ? al({ template: e, placement: t }) : null;
  const r = s === "rect" ? _(i.width ?? (t == null ? void 0 : t.width) ?? (e == null ? void 0 : e.width) ?? i.distance ?? i.size, 0) : 0, o = s === "rect" ? _(i.height ?? (t == null ? void 0 : t.height) ?? (e == null ? void 0 : e.height) ?? i.distance ?? i.size, 0) : 0, l = _(
    i.distance ?? i.size ?? i.templateDistance ?? (t == null ? void 0 : t.distance) ?? (e == null ? void 0 : e.distance) ?? (e == null ? void 0 : e.size),
    0
  );
  if (s === "rect") {
    if (!(r > 0) || !(o > 0)) return null;
  } else if (!(l > 0)) return null;
  return {
    shape: s,
    measuredTemplateType: n || jc(s),
    x: _(i.x ?? ((u = i.anchor) == null ? void 0 : u.x) ?? ((d = t == null ? void 0 : t.anchor) == null ? void 0 : d.x), 0),
    y: _(i.y ?? ((m = i.anchor) == null ? void 0 : m.y) ?? ((f = t == null ? void 0 : t.anchor) == null ? void 0 : f.y), 0),
    direction: yo(i.direction ?? i.rotation ?? (t == null ? void 0 : t.direction) ?? 0),
    distance: s === "rect" ? Math.max(r, o) : l,
    angle: s === "cone" ? _(i.angle ?? (t == null ? void 0 : t.angle) ?? 90, 90) : null,
    width: s === "line" ? _(i.width ?? (t == null ? void 0 : t.width) ?? hi(), hi()) : s === "rect" ? r : null,
    height: s === "rect" ? o : null,
    anchorX: s === "rect" ? _(i.anchorX ?? (t == null ? void 0 : t.anchorX) ?? (e == null ? void 0 : e.anchorX) ?? 0, 0) : null,
    anchorY: s === "rect" ? _(i.anchorY ?? (t == null ? void 0 : t.anchorY) ?? (e == null ? void 0 : e.anchorY) ?? 0, 0) : null,
    placementMode: String(i.placementMode ?? (e == null ? void 0 : e.placement) ?? "").trim() || null
  };
}
function qm(a = null) {
  return a ? typeof (a == null ? void 0 : a.toObject) == "function" ? a.toObject() : typeof (a == null ? void 0 : a.toJSON) == "function" ? a.toJSON() : a && typeof a == "object" ? Hc(a) : null : null;
}
function Vm(a = []) {
  const e = [];
  for (const t of a) {
    const i = Number(t);
    i > 0 && (e.some((n) => Math.abs(n - i) < 1e-3) || e.push(i));
  }
  return e;
}
function Ym(a = null, { placementMode: e = "region", shapeHint: t = "" } = {}) {
  const i = qm(a);
  if (!i || typeof i != "object") return null;
  const n = String(i.type ?? "").trim().toLowerCase(), s = ms(t, "");
  if (n === "circle")
    return Le({
      shape: s || "blast",
      measuredTemplateType: "circle",
      x: i.x,
      y: i.y,
      distance: _a(i.radius),
      placementMode: e
    });
  if (n === "ellipse") {
    const r = _(i.radiusX, 0), o = _(i.radiusY, 0);
    return !(r > 0) || Math.abs(r - o) > 1e-3 ? null : Le({
      shape: s || "blast",
      measuredTemplateType: "circle",
      x: _(i.x, 0) + r,
      y: _(i.y, 0) + o,
      distance: _a(r),
      placementMode: e
    });
  }
  if (n === "cone")
    return Le({
      shape: s || "cone",
      measuredTemplateType: "cone",
      x: i.x,
      y: i.y,
      direction: i.rotation ?? i.direction,
      distance: _a(i.radius),
      angle: i.angle,
      placementMode: e
    });
  if (n === "line") {
    const r = Array.from((a == null ? void 0 : a.measuredSegments) ?? []), o = Vm(r.map((f) => f == null ? void 0 : f.distance)), l = Math.max(
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
    ) || hi(), d = (a == null ? void 0 : a.origin) ?? i.origin ?? {}, m = r.reduce((f, p) => {
      const h = Number((p == null ? void 0 : p.distance) ?? 0), g = Number((f == null ? void 0 : f.distance) ?? 0);
      return h > g ? p : f;
    }, null);
    return Le({
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
  return n === "rectangle" || n === "rect" ? Le({
    shape: s || "rect",
    measuredTemplateType: "rect",
    x: i.x,
    y: i.y,
    direction: i.rotation ?? i.direction,
    width: _a(i.width),
    height: _a(i.height),
    anchorX: i.anchorX,
    anchorY: i.anchorY,
    placementMode: e
  }) : null;
}
function Kc(a = null, { placementMode: e = "region", shapeHint: t = "" } = {}) {
  const i = (a == null ? void 0 : a.document) ?? a ?? null, n = Array.from((i == null ? void 0 : i.shapes) ?? []);
  return n.length !== 1 ? null : Ym(n[0], { placementMode: e, shapeHint: t });
}
function Qm(a = null, e = null) {
  const t = Le(a);
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
function Gc(a) {
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
function Jm(a) {
  var i, n, s, r;
  const e = _((a == null ? void 0 : a.w) ?? ((i = a == null ? void 0 : a.object) == null ? void 0 : i.w) ?? ((n = a == null ? void 0 : a.document) == null ? void 0 : n.width), 1) * Vn(), t = _((a == null ? void 0 : a.h) ?? ((s = a == null ? void 0 : a.object) == null ? void 0 : s.h) ?? ((r = a == null ? void 0 : a.document) == null ? void 0 : r.height), 1) * Vn();
  return Math.max(e, t) / 2;
}
function Xm({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = ut(a.distance);
  return gr({ x: a.x, y: a.y }, e) <= i + t;
}
function Zm({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = ut(a.distance), n = ut(a.width ?? hi()), s = dn(a.direction), r = e.x - a.x, o = e.y - a.y, l = Math.cos(s), c = Math.sin(s), u = r * l + o * c;
  if (u < -t || u > i + t) return !1;
  const d = Math.max(0, Math.min(i, u)), m = a.x + d * l, f = a.y + d * c;
  return Math.hypot(e.x - m, e.y - f) <= t + n / 2;
}
function ef({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = ut(a.distance), n = e.x - a.x, s = e.y - a.y, r = Math.hypot(n, s);
  if (r > i + t) return !1;
  if (r === 0) return !0;
  let l = Math.atan2(s, n) * 180 / Math.PI - a.direction;
  for (; l <= -180; ) l += 360;
  for (; l > 180; ) l -= 360;
  const c = _(a.angle, 90) / 2, u = Math.asin(Math.min(1, t / Math.max(r, 1))) * 180 / Math.PI;
  return Math.abs(l) <= c + u;
}
function tf({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = ut(_(a.width, 0)), n = ut(_(a.height, 0));
  if (!(i > 0) || !(n > 0)) return !1;
  const s = _(a.anchorX, 0), r = _(a.anchorY, 0), o = _(a.x, 0), l = _(a.y, 0), c = o + i * (0.5 - s), u = l + n * (0.5 - r), d = -dn(a.direction ?? 0), m = Math.cos(d), f = Math.sin(d), p = e.x - c, h = e.y - u, g = p * m - h * f, y = p * f + h * m;
  return Math.abs(g) <= i / 2 + t && Math.abs(y) <= n / 2 + t;
}
function fs(a = null, e = null) {
  const t = Le(a);
  if (!t || !e) return !1;
  const i = Gc(e), n = Jm(e);
  return t.shape === "blast" ? Xm({ geometry: t, tokenCenter: i, tokenRadius: n }) : t.shape === "line" ? Zm({ geometry: t, tokenCenter: i, tokenRadius: n }) : t.shape === "cone" ? ef({ geometry: t, tokenCenter: i, tokenRadius: n }) : t.shape === "rect" ? tf({ geometry: t, tokenCenter: i, tokenRadius: n }) : !1;
}
function qc({ template: a = {}, placement: e = {}, geometry: t = null, token: i = null } = {}) {
  if (!i) return ae.none;
  const n = Le(t, { template: a, placement: e });
  if (!n || !fs(n, i))
    return ae.none;
  const s = Gc(i), r = ut(n.distance);
  if (!(r > 0)) return ae.none;
  if (n.shape === "line" || n.shape === "cone") {
    const l = Gm({ geometry: n, tokenCenter: s });
    return Us(l, r);
  }
  if (n.shape === "rect") {
    const l = {
      x: _(n.x, 0) + ut(_(n.width, 0)) * (0.5 - _(n.anchorX, 0)),
      y: _(n.y, 0) + ut(_(n.height, 0)) * (0.5 - _(n.anchorY, 0))
    }, c = gr(l, s);
    return Us(c, r);
  }
  const o = gr({ x: n.x, y: n.y }, s);
  return Us(o, r);
}
function Oi({ tier: a = ae.none, appliedTier: e = null, evadeUsed: t = !1, evadeLocked: i = !1 } = {}) {
  const n = _e(a, ae.none), s = _e(e ?? n, n);
  return {
    initialTier: n,
    initialLabel: Dt(n),
    initialMultiplier: pr(n),
    finalTier: s,
    finalLabel: Dt(s),
    finalMultiplier: pr(s),
    evadeUsed: !!t,
    evadeLocked: !!i
  };
}
function bo(a = {}, { locked: e = !1, active: t = !1 } = {}) {
  const i = _e((a == null ? void 0 : a.initialTier) ?? (a == null ? void 0 : a.tier), ae.none);
  if (!t || e || i === ae.none)
    return Oi({
      tier: i,
      appliedTier: i,
      evadeUsed: !1,
      evadeLocked: !!e
    });
  const n = hr(i, 1);
  return Oi({
    tier: i,
    appliedTier: n,
    evadeUsed: i !== n,
    evadeLocked: !!e
  });
}
function Vc(a = []) {
  return a.map((e) => ({
    x: Math.round(_(e.x, 0)),
    y: Math.round(_(e.y, 0))
  }));
}
function af(a = {}) {
  const e = ut(_(a.distance, 0)), t = ut(_(a.width, hi())) / 2, i = dn(a.direction ?? 0), n = Math.cos(i), s = Math.sin(i), r = -s, o = n, l = {
    x: _(a.x, 0) + e * n,
    y: _(a.y, 0) + e * s
  };
  return {
    type: "polygon",
    points: Vc([
      { x: a.x + r * t, y: a.y + o * t },
      { x: l.x + r * t, y: l.y + o * t },
      { x: l.x - r * t, y: l.y - o * t },
      { x: a.x - r * t, y: a.y - o * t }
    ])
  };
}
function nf(a = {}) {
  const e = _(a.angle, 90), t = ut(_(a.distance, 0)), i = _(a.direction, 0), n = e / 2, s = [{ x: a.x, y: a.y }];
  for (let r = 0; r <= 8; r += 1) {
    const o = -n + e / 8 * r, l = dn(i + o);
    s.push({
      x: _(a.x, 0) + Math.cos(l) * t,
      y: _(a.y, 0) + Math.sin(l) * t
    });
  }
  return {
    type: "polygon",
    points: Vc(s)
  };
}
function sf(a = {}) {
  return {
    type: "rectangle",
    x: Math.round(_(a.x, 0)),
    y: Math.round(_(a.y, 0)),
    width: Math.round(ut(_(a.width, 0))),
    height: Math.round(ut(_(a.height, 0))),
    rotation: yo(a.direction ?? 0),
    anchorX: _(a.anchorX, 0),
    anchorY: _(a.anchorY, 0)
  };
}
function ps(a = null) {
  const e = Le(a);
  if (!e) return [];
  if (e.shape === "blast") {
    const t = ut(_(e.distance, 0));
    return [{
      type: "ellipse",
      x: Math.round(_(e.x, 0) - t),
      y: Math.round(_(e.y, 0) - t),
      radiusX: Math.round(t),
      radiusY: Math.round(t),
      rotation: 0
    }];
  }
  return e.shape === "line" ? [af(e)] : e.shape === "cone" ? [nf(e)] : e.shape === "rect" ? [sf(e)] : [];
}
function ii(a = null) {
  const e = Le(a);
  return e ? Hc(e) : null;
}
const Yc = Object.freeze({
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}), Yn = Object.freeze(
  Object.entries(Yc).map(([a, e]) => ({ value: a, label: e }))
), rf = Object.freeze({
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
}), of = Object.freeze(
  Yn.map((a) => a.value)
), yr = Object.freeze({}), hs = Object.freeze({
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
}), lf = Object.freeze(
  Object.values(hs).map((a) => ({
    value: a.key,
    label: a.label,
    rated: a.rated
  }))
), Qc = eu(yr), Jc = eu(hs);
function gs(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => gs(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function qt(a, e = "penetrating") {
  const t = String(a ?? "").trim().toLowerCase();
  return rf[t] ?? e;
}
function Xc(a) {
  const e = String(a ?? "").trim();
  return e ? qt(e, "") : "";
}
function Zc(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return of.includes(e);
}
function Vt(a) {
  const e = qt(a, "");
  return Yc[e] ?? String(a ?? "").trim();
}
function ai(a) {
  const e = a ?? {}, t = Number(e.ballistic ?? 0) || 0, i = Number(e.melee ?? 0) || 0;
  return {
    penetrating: e.penetrating !== void 0 ? Number(e.penetrating ?? 0) || 0 : Math.max(t, i),
    concussive: e.concussive !== void 0 ? Number(e.concussive ?? 0) || 0 : Number(e.explosive ?? 0) || 0,
    energy: Number(e.energy ?? 0) || 0,
    thermal: Number(e.thermal ?? 0) || 0,
    electrical: Number(e.electrical ?? 0) || 0
  };
}
function En(a) {
  return gs(a);
}
function Na(a) {
  return gs(a);
}
function cf(a) {
  return qn(a);
}
function Cn(a = {}, e = "standard") {
  return Uc(a, e);
}
function Pn(a = {}) {
  return _m(a);
}
function uf(a = null) {
  return $m(a);
}
function ka(a = "id") {
  var t, i;
  const e = (i = (t = globalThis.foundry) == null ? void 0 : t.utils) == null ? void 0 : i.randomID;
  return typeof e == "function" ? e() : `${a}-${Math.random().toString(36).slice(2, 10)}`;
}
function eu(a) {
  const e = {};
  return Object.values(a).forEach((t) => {
    [t.key, ...t.aliases ?? []].forEach((i) => {
      e[Ja(i)] = t.key;
    });
  }), Object.freeze(e);
}
function Ja(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function Ra(a) {
  return Array.isArray(a) ? a : a && typeof a == "object" ? Object.values(a) : a == null || a === "" ? [] : [a];
}
function tu(a, e) {
  return Ra(a).map((t) => df(t, e)).filter(Boolean);
}
function df(a, e) {
  if (typeof a == "string" || typeof a == "number") {
    const i = e[Ja(a)];
    return i ? { id: ka("trait"), key: i, rating: 1 } : null;
  }
  if (!a || typeof a != "object") return null;
  const t = e[Ja(a.key ?? a.value ?? a.name)];
  return t ? {
    id: String(a.id ?? "").trim() || ka("trait"),
    key: t,
    rating: Math.max(0, Number(a.rating ?? 0) || 0)
  } : null;
}
function zi(a) {
  return tu(a, Qc);
}
function li(a) {
  return tu(a, Jc);
}
function Qn(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function mf(a = {}, e = {}) {
  const t = Qn(a), i = Qn(e);
  return {
    close: t.close + i.close,
    near: t.near + i.near,
    far: t.far + i.far,
    extreme: t.extreme + i.extreme
  };
}
function ff(a, e) {
  var t;
  return ((t = e[a]) == null ? void 0 : t.label) ?? a;
}
function iu(a, e) {
  var n;
  const t = ff(a == null ? void 0 : a.key, e), i = Math.max(0, Number((a == null ? void 0 : a.rating) ?? 0) || 0);
  return (n = e[a == null ? void 0 : a.key]) != null && n.rated && i > 0 ? `${t} ${i}` : t;
}
function au(a, e) {
  return Ra(a).map((t) => {
    const i = t == null ? void 0 : t.key, n = e[i];
    return n != null && n.resolve ? {
      entry: t,
      effect: n.resolve(t),
      label: iu(t, e)
    } : null;
  }).filter(Boolean);
}
function pf(a, e) {
  const t = { ...a ?? {} };
  return Object.entries(e ?? {}).forEach(([i, n]) => {
    t[i] = (Number(t[i] ?? 0) || 0) + (Number(n ?? 0) || 0);
  }), t;
}
function hf(a = []) {
  const e = {}, t = /* @__PURE__ */ new Set();
  for (const i of a.filter(Boolean)) {
    i.accuracyMod !== void 0 && (e.accuracyMod = (Number(e.accuracyMod ?? 0) || 0) + (Number(i.accuracyMod ?? 0) || 0)), i.ap !== void 0 && (e.ap = (Number(e.ap ?? 0) || 0) + (Number(i.ap ?? 0) || 0)), i.addHeat !== void 0 && (e.addHeat = (Number(e.addHeat ?? 0) || 0) + (Number(i.addHeat ?? 0) || 0)), i.bonusVsArmorTag && (e.bonusVsArmorTag = pf(e.bonusVsArmorTag, i.bonusVsArmorTag));
    for (const n of i.flags ?? []) {
      const s = String(n ?? "").trim();
      s && t.add(s);
    }
  }
  return t.size > 0 && (e.flags = Array.from(t)), e;
}
function gf(a = [], e = []) {
  const t = Array.isArray(a) || typeof a == "string" ? { traits: a, standardTraits: e } : a ?? {}, i = Na(t.traits), n = zi(t.standardTraits), s = au(n, yr), r = i.map((o) => {
    var u;
    const l = Qc[Ja(o)];
    if (!l) return null;
    const c = (u = yr[l]) == null ? void 0 : u.resolve;
    return typeof c == "function" ? c({ key: l, rating: 1 }) : null;
  });
  return hf([
    ...s.map((o) => o.effect),
    ...r
  ]);
}
function yf(a) {
  const e = a ?? {}, t = ho(), i = Fc({
    traits: e.traits,
    keywords: e.keywords,
    report: t,
    path: "ammo.types[].traits"
  });
  return {
    id: String(e.id ?? "").trim() || ka("ammo"),
    name: String(e.name ?? "").trim() || "Ammo",
    damageType: Xc(e.damageType),
    apMod: Number(e.apMod ?? e.ap ?? 0) || 0,
    attackRatingBandMod: Qn(e.attackRatingBandMod ?? e.attackRatingBand),
    traits: i.traits,
    keywords: i.keywords,
    migration: t
  };
}
function bf(a) {
  var l;
  const e = a ?? {}, t = Math.max(0, Number(e.max ?? 0) || 0), i = Number(e.current), n = Number.isFinite(i) ? Math.max(0, Math.min(i, t > 0 ? t : i)) : Math.max(0, t), s = Ra(e.types).map(yf), r = String(e.activeTypeId ?? "").trim(), o = s.some((c) => c.id === r) ? r : ((l = s[0]) == null ? void 0 : l.id) ?? "";
  return {
    current: n,
    max: t,
    consumePerAttack: Math.max(1, Number(e.consumePerAttack ?? 1) || 1),
    activeTypeId: o,
    types: s
  };
}
function Sf(a, e = "untracked") {
  const t = String(a ?? "").trim();
  return t ? t === "linked" ? "internal" : t === "perAttack" ? e : ["untracked", "internal", "actorResource", "itemRef"].includes(t) ? t : e : e;
}
function br(a = {}) {
  const e = a ?? {};
  return {
    amount: Math.max(1, Number(e.amount ?? e.consumePerUse ?? e.consumePerAttack ?? 1) || 1),
    sourceId: String(e.sourceId ?? "").trim()
  };
}
function nl(a = {}) {
  const e = a ?? {};
  return {
    damageType: Xc(e.damageType),
    ap: Number(e.ap ?? e.apMod ?? 0) || 0,
    attackRatingBand: Qn(e.attackRatingBand ?? e.attackRatingBandMod)
  };
}
function Sr(a = {}) {
  return Uc(a, "standard");
}
function Af(a) {
  return String(a ?? "").trim().toLowerCase() === "unloaded";
}
function At(a, { report: e = null, path: t = "system.payloads[]" } = {}) {
  var l;
  const i = a ?? {}, n = String(i.id ?? "").trim() || ka("payload"), s = Fc({
    traits: i.traits ?? ((l = i.modifies) == null ? void 0 : l.traits),
    keywords: i.keywords,
    report: e,
    path: `${t}.traits`
  }), r = gs(i.compatibleWith ?? i.compatible), o = uf(i.template);
  return Af(n) ? {
    id: "unloaded",
    label: "Unloaded",
    compatibleWith: [],
    modifies: nl({}),
    traits: [],
    keywords: [],
    template: null,
    areaEffect: pi({ kind: "discrete" }),
    resolution: Sr({ resolverKey: "standard" }),
    consumption: br({ amount: 1, sourceId: "" })
  } : {
    id: n,
    label: String(i.label ?? i.name ?? "").trim() || "Payload",
    compatibleWith: r,
    modifies: nl(i.modifies ?? i),
    traits: s.traits,
    keywords: s.keywords,
    template: o,
    areaEffect: pi(i.areaEffect ?? {}),
    resolution: Sr(i.resolution ?? i),
    consumption: br(i.consumption ?? i)
  };
}
function Zt(a) {
  var o, l, c, u, d, m;
  const e = a ?? {}, t = Sf(
    e.kind || e.type || ((o = e.link) != null && o.actorPath || e.actorPath ? "actorResource" : "") || ((l = e.link) != null && l.itemId || e.itemId || (c = e.link) != null && c.itemPath || e.itemPath ? "itemRef" : "") || (e.tracking || e.current !== void 0 || e.max !== void 0 ? "internal" : "") || "untracked",
    "untracked"
  ), i = e.tracking ?? e, n = Math.max(0, Number(i.max ?? 0) || 0), s = Number(i.current), r = Number.isFinite(s) ? Math.max(0, Math.min(s, n > 0 ? n : s)) : Math.max(0, n);
  return {
    id: String(e.id ?? "").trim() || ka("source"),
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
function nu({ report: a = null, path: e = "system.payloads" } = {}) {
  return {
    payloads: [At({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: a, path: `${e}[0]` })],
    selectedPayloadId: "unloaded",
    consumptionSources: [Zt({
      id: "untracked",
      label: "Untracked",
      kind: "untracked"
    })]
  };
}
function su(a) {
  return String(a ?? "").trim().toLowerCase() === "melee";
}
function Ar(a = [], { report: e = null, path: t = "system.payloads" } = {}) {
  const i = Ra(a).map((n, s) => At(n, { report: e, path: `${t}[${s}]` })).filter(Boolean);
  return i.some((n) => n.id === "unloaded") ? i : [
    At({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: e, path: `${t}[0]` }),
    ...i
  ];
}
function ys(a = {}, { report: e = null, path: t = "system.payloads" } = {}) {
  var d;
  const i = bf(a), n = Math.max(1, Number(i.consumePerAttack ?? 1) || 1), s = i.max > 0, r = s ? "internal-magazine" : "untracked", o = [Zt(s ? {
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
  })], l = i.types.length ? i.types.map((m, f) => At({
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
  }, { report: e, path: `${t}[${f}]` })) : [At({
    id: "unloaded",
    label: "Unloaded",
    resolution: { resolverKey: "standard" },
    consumption: {
      amount: n,
      sourceId: s ? r : ""
    }
  }, { report: e, path: `${t}[0]` })], c = Ar(l, { report: e, path: t }), u = c.some((m) => m.id === i.activeTypeId) ? i.activeTypeId : ((d = c[0]) == null ? void 0 : d.id) ?? "unloaded";
  return {
    payloads: c,
    selectedPayloadId: u,
    consumptionSources: o
  };
}
function ci(a, { legacyAmmo: e = null, category: t = "", report: i = null, path: n = "system.payloads" } = {}) {
  if (su(t)) return [];
  const s = Ra(a).map((r, o) => At(r, { report: i, path: `${n}[${o}]` })).filter(Boolean);
  return s.length > 0 ? Ar(s, { report: i, path: n }) : e ? Ar(ys(e, { report: i, path: n }).payloads, { report: i, path: n }) : nu({ report: i, path: n }).payloads;
}
function Fa(a, { legacyAmmo: e = null } = {}) {
  const t = Ra(a).map(Zt).filter(Boolean);
  return t.length > 0 ? t : e ? ys(e).consumptionSources : nu().consumptionSources;
}
function oa(a, e = [], { legacyAmmo: t = null, category: i = "" } = {}) {
  var r;
  if (su(i)) return "";
  const n = ci(e, { legacyAmmo: t, category: i }), s = String(a ?? "").trim();
  if (n.some((o) => o.id === s)) return s;
  if (t) {
    const o = ys(t).selectedPayloadId;
    if (n.some((l) => l.id === o)) return o;
  }
  return ((r = n[0]) == null ? void 0 : r.id) ?? "unloaded";
}
function sl({ root: a = null, path: e = "", fallback: t = {} } = {}) {
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
function ru({ source: a = null, actor: e = null } = {}) {
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
    const u = sl({
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
    const u = ((c = (l = e == null ? void 0 : e.items) == null ? void 0 : l.get) == null ? void 0 : c.call(l, t.itemId)) ?? null, d = sl({
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
function wf({ source: a = null, actor: e = null } = {}) {
  return ru({ source: a, actor: e });
}
function wr({
  payloads: a = [],
  selectedPayloadId: e = "",
  consumptionSources: t = [],
  actor: i = null,
  payloadId: n = "",
  category: s = ""
} = {}) {
  const r = ci(a, { category: s }), o = Fa(t), l = oa(n || e, r, { category: s }), c = r.find((f) => f.id === l) ?? r[0] ?? null, u = (c == null ? void 0 : c.consumption) ?? br(), d = u.sourceId ? o.find((f) => f.id === u.sourceId) ?? null : o.find((f) => f.kind === "untracked") ?? Zt({
    id: "untracked",
    label: "Untracked",
    kind: "untracked"
  }), m = ru({ source: d, actor: i });
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
function Tf({
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
  var q, ee, oe, ke, fe;
  const g = wr({
    payloads: l != null && l.length ? l : void 0,
    selectedPayloadId: c || p,
    consumptionSources: u,
    actor: m,
    payloadId: d || p,
    category: h
  }), b = ((!l || l.length === 0) && f ? wr({
    ...ys(f),
    actor: m,
    payloadId: d || p,
    category: h
  }) : null) ?? g, S = b.activePayload, T = zc({
    traits: i,
    keywords: n
  }), E = Array.from(/* @__PURE__ */ new Set([
    ...T.traits,
    ...Na(S == null ? void 0 : S.traits)
  ])), P = qn([
    ...T.keywords,
    ...qn(S == null ? void 0 : S.keywords)
  ]), C = Cn(r, "standard"), H = (q = S == null ? void 0 : S.resolution) != null && q.resolverKey ? Sr(S.resolution) : C, Y = Pn(o), Q = ho(), K = Bm({
    weapon: {
      traits: T.traits,
      resolution: C
    },
    payload: S,
    effectiveTraits: E,
    effectiveResolution: H,
    report: Q
  }), G = zi(s), L = gf({
    traits: [],
    standardTraits: G
  }), z = {
    ...b.sourceState
  };
  return delete z.sourceItem, {
    damageType: ((ee = S == null ? void 0 : S.modifies) == null ? void 0 : ee.damageType) || qt(a),
    ap: (Number(e ?? 0) || 0) + (Number(((oe = S == null ? void 0 : S.modifies) == null ? void 0 : oe.ap) ?? 0) || 0),
    attackRatingBand: mf(
      t,
      ((ke = S == null ? void 0 : S.modifies) == null ? void 0 : ke.attackRatingBand) ?? {}
    ),
    effects: L,
    traits: E,
    keywords: P,
    standardTraits: G,
    payloadLabel: b.payloadLabel,
    payload: S ? foundry.utils.deepClone(S) : null,
    payloadState: {
      payloads: b.payloads.map((ne) => foundry.utils.deepClone(ne)),
      activePayloadId: b.activePayloadId,
      payloadLabel: b.payloadLabel,
      sourceId: ((fe = b.source) == null ? void 0 : fe.id) ?? "",
      sourceLabel: b.sourceState.label ?? "",
      sourceKind: b.sourceState.kind ?? "untracked",
      isTracked: b.sourceState.isTracked,
      current: b.sourceState.current,
      max: b.sourceState.max,
      consumePerUse: b.sourceState.consumePerUse
    },
    source: b.source ? foundry.utils.deepClone(b.source) : null,
    sourceState: foundry.utils.deepClone(z),
    template: K.template ? foundry.utils.deepClone(K.template) : null,
    areaEffect: pi((S == null ? void 0 : S.areaEffect) ?? {}),
    resolution: foundry.utils.deepClone(H),
    resolverKey: String((H == null ? void 0 : H.resolverKey) ?? "standard").trim() || "standard",
    fireModes: foundry.utils.deepClone(Y),
    capabilityReport: {
      ...Q,
      liveCapabilities: K.liveCapabilities,
      isTemplated: K.isTemplated,
      template: K.template ? foundry.utils.deepClone(K.template) : null,
      resolverKey: String((H == null ? void 0 : H.resolverKey) ?? "standard").trim() || "standard"
    },
    ammoLabel: b.payloadLabel,
    ammoType: S ? foundry.utils.deepClone(S) : null,
    ammoState: {
      current: z.current,
      max: z.max,
      consumePerAttack: z.consumePerUse,
      activeTypeId: b.activePayloadId,
      types: b.payloads.map((ne) => {
        var $e;
        return {
          id: ne.id,
          name: ne.label,
          damageType: (($e = ne.modifies) == null ? void 0 : $e.damageType) ?? "",
          traits: ne.traits ?? [],
          keywords: ne.keywords ?? []
        };
      }),
      isTracked: z.isTracked,
      ammoLabel: b.payloadLabel
    }
  };
}
function ou(a = {}, e = {}) {
  const t = ai(a), i = ai(e);
  return {
    penetrating: t.penetrating + i.penetrating,
    concussive: t.concussive + i.concussive,
    energy: t.energy + i.energy,
    thermal: t.thermal + i.thermal,
    electrical: t.electrical + i.electrical
  };
}
function Hs({ standardTraits: a = [], traits: e = [], traitState: t = {} } = {}) {
  var m, f;
  const i = li(a), s = Na(e).map((p) => {
    const h = Jc[Ja(p)];
    return h ? { id: ka("trait"), key: h, rating: h === "reinforced" ? 1 : 0 } : null;
  }).filter(Boolean), r = au(
    [...i, ...s],
    hs
  ), o = r.reduce((p, h) => {
    var g;
    return ou(p, ((g = h.effect) == null ? void 0 : g.mitigationByType) ?? {});
  }, ai({})), l = r.reduce(
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
function vf({ traits: a = [], standardTraits: e = [] } = {}) {
  return [
    ...Na(a),
    ...li(e).map((i) => iu(i, hs))
  ].filter(Boolean);
}
function So(a) {
  const e = Math.max(0, Number(a ?? 0) || 0);
  return e <= 0 ? 0 : Math.ceil(e / 4);
}
function kf({
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
  const n = qt(t, "penetrating"), s = ai(e), r = So(i), o = Number(s[n] ?? 0) || 0;
  return {
    currentArmorRating: i,
    baseMitigation: r,
    typeMitigationMod: o,
    totalMitigation: r + o,
    isDestroyed: !1
  };
}
function Mf({ damageIncoming: a = 0, armorTags: e = [], effects: t = {} } = {}) {
  const i = new Set(En(e));
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
class ea {
  static checkSufficient(e, t, i) {
    if (t > i) {
      const n = Ce(v.common.errors.insufficient, {
        resource: e,
        required: t,
        available: i
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkOutOfRange(e, t, i, n) {
    if (t < i || t > n) {
      const s = Ce(v.common.errors.outOfRange, {
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
      const e = v.common.errors.onlyGM;
      throw ui.notifications.error(e), e;
    }
  }
  static checkItemType(e, t) {
    if (e.type != t) {
      const i = Ce(v.common.errors.expectedType, {
        type: e.type ? v.itemType.singular[e.type] : e.type,
        expectedType: t
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkActorCanReceiveDamage(e, t, i) {
    if (!t) {
      const n = Ce(v.common.errors.actorCannotReceiveDamage, {
        actor: i.name,
        damageType: Zc(e) ? Vt(e) : v.actor.monitors[e] ?? v.mwd.weaponDamageType[e] ?? v.mwd.personalDamageType[e] ?? e
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkWeaponDefense(e, t) {
    var n;
    const i = e.getDefense();
    if ((((n = e.isPersonalWeapon) == null ? void 0 : n.call(e)) ?? e.type === A.itemType.personalWeapon) && !i) {
      const s = Ce(v.common.errors.noDefenseOnWeapon, { actor: t.name, weapon: e.name });
      throw ui.notifications.error(s), s;
    }
  }
  static checkTargetsCount(e, t, i) {
    if (e > 0 && t.length > e) {
      const n = Ce(v.common.errors.maxTargetsExceedeed, {
        weapon: this.name,
        area: v.area[i],
        count: t.length,
        max: e
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkActorDefenseAction(e, t, i) {
    if (!e) {
      const n = Ce(v.common.errors.actorDoesNotHaveDefense, {
        actor: t.name,
        defense: i.labelkey,
        actorType: v.actorType[t.type]
      });
      throw ui.notifications.error(n), n;
    }
  }
}
function Qt(a, e, t, i, n, s = (r) => !0) {
  return {
    code: a,
    labelkey: v.attributeAction[a],
    label: v.attributeAction[a],
    attributeFunction1: e ?? ((r) => {
    }),
    attributeFunction2: t ?? ((r) => {
    }),
    icon: i,
    actorTypes: n,
    condition: s
  };
}
function hn(a, e) {
  return {
    code: a,
    labelkey: v.defense[a],
    label: v.defense[a],
    actionCode: e
  };
}
const ze = A.actorAttributes, Fe = A.actorTypes, bt = ot.actions, gn = ot.defenses, Ws = [
  Qt(bt.defense, (a) => ze.reflexes, (a) => ze.intelligence, V.fontAwesome("fas fa-shield-alt"), [Fe.character, Fe.npc]),
  Qt(bt.defense, (a) => ze.handling, (a) => ze.chassis, V.fontAwesome("fas fa-tachometer-alt"), [Fe.vehicle, Fe.battlemech]),
  Qt(bt.resistTorture, (a) => ze.strength, (a) => ze.willpower, V.fontAwesome("fas fa-angry"), [Fe.character, Fe.npc]),
  Qt(bt.perception, (a) => ze.logic, (a) => ze.willpower, V.fontAwesome("fas fa-eye"), [Fe.character, Fe.npc]),
  Qt(bt.perception, (a) => ze.system, (a) => ze.handling, V.fontAwesome("fas fa-video"), [Fe.vehicle, Fe.battlemech]),
  Qt(bt.composure, (a) => ze.charisma, (a) => ze.willpower, V.fontAwesome("fas fa-meh"), [Fe.character, Fe.npc]),
  Qt(bt.judgeIntentions, (a) => ze.charisma, (a) => ze.charisma, V.fontAwesome("fas fa-theater-masks"), [Fe.character, Fe.npc]),
  Qt(bt.memory, (a) => ze.logic, (a) => ze.logic, V.fontAwesome("fas fa-brain"), [Fe.character, Fe.npc]),
  Qt(bt.catch, (a) => ze.reflexes, (a) => ze.reflexes, V.fontAwesome("fas fa-baseball-ball"), [Fe.character, Fe.npc]),
  Qt(bt.lift, (a) => ze.strength, (a) => ze.strength, V.fontAwesome("fas fa-dumbbell"), [Fe.character, Fe.npc])
], yn = [
  hn(gn.physicalDefense, bt.defense),
  hn(gn.physicalResistance, bt.resistTorture),
  hn(gn.socialDefense, bt.composure),
  hn(gn.mentalResistance, bt.perception)
];
class De {
  static init() {
    Handlebars.registerHelper("fixedDefenseCode", (e) => De.fixedDefenseCode(e));
  }
  static all(e = void 0) {
    return e ? Ws.filter(e) : Ws;
  }
  static getActorActions(e) {
    return Ws.filter((t) => t.actorTypes.includes(e.type) && t.condition(e));
  }
  static fixedDefenseCode(e) {
    return ot.fixedDefenseCode[e] ?? e;
  }
  static getActorDefenses(e) {
    return yn.map((t) => {
      const i = De.getActorAction(e, t.actionCode);
      return De._convertToDefense(i, t);
    }).filter((t) => t == null ? void 0 : t.code);
  }
  static getDefenseAttributeAction(e) {
    var t;
    return (t = yn.find((i) => i.code == e)) == null ? void 0 : t.actionCode;
  }
  static getActorAction(e, t) {
    return De.getActorActions(e).find((i) => i.code == t);
  }
  static getActorDefense(e, t) {
    t = De.fixedDefenseCode(t);
    const i = yn.find((s) => s.code == t), n = De.getActorAction(e, i.actionCode);
    return ea.checkActorDefenseAction(n, e, i), De._convertToDefense(n, i);
  }
  static _convertToDefense(e, t) {
    return e ? foundry.utils.mergeObject(
      t,
      e ?? {},
      { overwrite: !1, inplace: !1 }
    ) : void 0;
  }
  static getDefenses() {
    return yn;
  }
  static prepareShortcut(e, t) {
    const i = De.getActorActions(e).find((n) => n.code == t);
    if (i)
      return {
        icon: i.icon,
        label: i.labelkey,
        callback: (n) => n.actor.rollAttributeAction(t)
      };
  }
}
class Tr {
  constructor() {
    this.remoteCalls = {}, game.socket.on(mr, async (e) => this.onSocketMessage(e));
  }
  static async register(e, t) {
    game.system.anarchy.remoteCall._register(e, t);
  }
  async _register(e, t) {
    if (this.remoteCalls[e])
      throw `RemoteCall msg ${e} is already registered`;
    foundry.utils.mergeObject(t, {
      callback: (i) => {
        console.log(ve + "RemoteCall [", e, "] (", i, ")");
      },
      condition: (i) => !0,
      multiple: !1
      /* true if multiple users should handle the message */
    }, { overwrite: !1 }), this.remoteCalls[e] = t, console.log(ve + "RemoteCall registered", e);
  }
  static call(e, t) {
    return game.system.anarchy.remoteCall._remoteCall(e, t);
  }
  _remoteCall(e, t) {
    const i = this.remoteCalls[e];
    return !i || i.condition(game.user) || !i.multiple && jt.isUniqueConnectedGM() ? !1 : (game.socket.emit(mr, { msg: e, data: t }), !0);
  }
  async onSocketMessage(e) {
    const t = this.remoteCalls[e.msg];
    if (t) {
      const i = t.condition(game.user), n = t.multiple, s = jt.isUniqueConnectedGM();
      i && (n || s) ? t.callback(e.data) : console.log(ve + "RemoteCall.onSocketMessage(", e, ") ignored :", i, n, s);
    } else
      console.log(ve + "RemoteCall: No callback registered for", e);
  }
}
const rl = "Users.blindMessageToGM";
class jt {
  static init() {
    Tr.register(rl, {
      callback: (e) => jt.blindMessageToGM(e),
      condition: (e) => e.isGM
    });
  }
  static blindMessageToGM(e) {
    Tr.call(rl, e) || ChatMessage.create({
      user: e.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      blind: !0,
      content: Ce(v.chat.blindMessageToGM, {
        user: game.user.name,
        message: e.content
      })
    });
  }
  static getUsers(e = (t) => !0) {
    return (game.version ? game.users : game.users.entities).filter(e);
  }
  static firstConnectedGM() {
    return jt.getUsers((e) => e.isGM && e.active).sort(se.ascending((e) => e.id)).at(0) ?? {};
  }
  /**
   * @returns true pour un seul utilisateur: le premier GM connecté par ordre d'id
   */
  static isUniqueConnectedGM(e = game.user) {
    return e.id == jt.firstConnectedGM().id;
  }
  static firstResponsible(e) {
    if (!(e != null && e.testUserPermission))
      return;
    const t = jt.getUsers(
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
const aa = v.actor.monitors, oi = v.actor.counters, lu = {
  armor: {
    path: "system.monitors.armor.value",
    monitor: (a) => a.system.monitors.armor,
    iconChecked: V.fontAwesome("fas fa-shield-slash"),
    iconUnchecked: V.fontAwesome("fas fa-shield-alt"),
    iconHit: V.fontAwesome("fas fa-bahai"),
    resource: aa.armor
  },
  fatigue: {
    path: "system.monitors.fatigue.value",
    monitor: (a) => a.system.monitors.fatigue,
    iconChecked: V.fontAwesome("fas fa-grimace"),
    iconUnchecked: V.fontAwesome("far fa-smile"),
    iconHit: V.fontAwesome("fas fa-bahai"),
    resource: aa.fatigue,
    overflow: (a) => A.monitors.physical,
    useArmor: !0
  },
  physical: {
    path: "system.monitors.physical.value",
    monitor: (a) => a.system.monitors.physical,
    iconChecked: V.fontAwesome("fas fa-heartbeat"),
    iconUnchecked: V.fontAwesome("far fa-heart"),
    iconHit: V.fontAwesome("fas fa-bahai"),
    resource: aa.physical,
    useArmor: !0
  },
  structure: {
    path: "system.monitors.structure.value",
    monitor: (a) => a.system.monitors.structure,
    iconChecked: V.fontAwesome("fas fa-car-crash"),
    iconUnchecked: V.fontAwesome("fas fa-car-alt"),
    iconHit: V.fontAwesome("fas fa-bahai"),
    resource: aa.structure
  },
  heat: {
    path: "system.monitors.heat.value",
    monitor: (a) => a.system.monitors.heat,
    iconChecked: V.fontAwesome("fas fa-fire"),
    iconUnchecked: V.fontAwesome("far fa-sun"),
    iconHit: V.fontAwesome("fas fa-temperature-high"),
    resource: aa.heat
  },
  criticals: {
    path: "system.hybrid.criticals.value",
    monitor: (a) => {
      var e;
      return ((e = a.system.hybrid) == null ? void 0 : e.criticals) ?? { value: 0, max: 0 };
    },
    iconChecked: V.fontAwesome("fas fa-bolt"),
    iconUnchecked: V.fontAwesome("far fa-dot-circle"),
    iconHit: V.fontAwesome("fas fa-exclamation-triangle"),
    resource: aa.structure
  },
  anarchy: {
    path: "system.counters.anarchy.value",
    monitor: (a) => ({
      value: a.system.counters.anarchy.value,
      max: 6
    }),
    iconChecked: V.iconPath(`${za}/anarchy-point.webp`, "checkbar-img"),
    iconUnchecked: V.iconPath(`${za}/anarchy-point-off.webp`, "checkbar-img"),
    resource: oi.anarchy
  },
  plot: {
    path: "system.counters.anarchy.value",
    monitor: (a) => {
      const e = a.system.counters.anarchy.value;
      return { value: e, max: e + 1 };
    },
    iconChecked: V.iconPath(`${za}/danger-point.webp`, "checkbar-img"),
    iconUnchecked: V.iconPath(`${za}/danger-point-off.webp`, "checkbar-img"),
    resource: oi.anarchy
  },
  sceneAnarchy: {
    path: "system.counters.edgePools.chaos.value",
    monitor: (a) => {
      const e = a.getEdgePoolValue(A.counters.edgePools.chaos), t = a.getAttributeValue(A.actorAttributes.edge);
      return { value: e, max: t };
    },
    iconChecked: V.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    iconUnchecked: V.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    resource: oi.edgePools.chaos
  },
  grit: {
    path: "system.counters.edgePools.grit.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.grit), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: V.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    iconUnchecked: V.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    resource: oi.edgePools.grit
  },
  insight: {
    path: "system.counters.edgePools.insight.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.insight), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: V.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    iconUnchecked: V.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    resource: oi.edgePools.insight
  },
  legend: {
    path: "system.counters.edgePools.legend.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.legend), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: V.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    iconUnchecked: V.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    resource: oi.edgePools.legend
  },
  credibility: {
    path: "system.counters.edgePools.credibility.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.credibility), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: V.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    iconUnchecked: V.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    resource: oi.edgePools.credibility
  },
  rumor: {
    path: "system.counters.edgePools.rumor.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.rumor), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: V.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    iconUnchecked: V.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    resource: oi.edgePools.rumor
  }
}, Bt = foundry.utils.mergeObject(lu, {});
class U {
  static init() {
    Handlebars.registerHelper("iconCheckbar", U.iconCheckbar), Handlebars.registerHelper("iconCheckbarHit", U.iconHit);
  }
  static hackCheckbars(e) {
    if (e) {
      const t = foundry.utils.mergeObject(lu, {});
      foundry.utils.mergeObject(t, e, { recursive: !0 }), foundry.utils.mergeObject(Bt, t, { overwrite: !0 });
    }
  }
  static iconCheckbar(e, t) {
    return t ? U.iconChecked(e) : U.iconUnchecked(e);
  }
  static iconChecked(e) {
    var t;
    return (t = Bt[e]) == null ? void 0 : t.iconChecked;
  }
  static iconUnchecked(e) {
    var t;
    return (t = Bt[e]) == null ? void 0 : t.iconUnchecked;
  }
  static iconHit(e) {
    var t, i;
    return ((t = Bt[e]) == null ? void 0 : t.iconHit) ?? ((i = Bt[e]) == null ? void 0 : i.iconChecked);
  }
  static useArmor(e) {
    var t;
    return (t = Bt[e]) == null ? void 0 : t.useArmor;
  }
  static max(e, t) {
    var n;
    const i = (n = Bt[t]) == null ? void 0 : n.monitor(e);
    return ((i == null ? void 0 : i.max) ?? 0) + ((i == null ? void 0 : i.maxBonus) ?? 0);
  }
  static value(e, t) {
    var n;
    const i = (n = Bt[t]) == null ? void 0 : n.monitor(e);
    return (i == null ? void 0 : i.value) ?? 0;
  }
  static resistance(e, t, i = void 0) {
    return U.resistanceDetail(e, t, i).value;
  }
  static resistanceDetail(e, t, i = void 0) {
    var l, c;
    const n = (l = Bt[t]) == null ? void 0 : l.monitor(e), s = U._resolveResistance(n == null ? void 0 : n.resistance, i), r = U._resolveResistance(n == null ? void 0 : n.resistanceBonus, i), o = i === void 0 ? 0 : Number(((c = n == null ? void 0 : n.resistanceBonusByType) == null ? void 0 : c[i]) ?? 0);
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
    await U.setCounter(e, t, U.newValue(i, n), s, r);
  }
  static async addCounter(e, t, i, n = void 0) {
    if (i != 0) {
      const s = U.getCounterValue(e, t, n) ?? 0;
      await U.setCounter(e, t, s + i, n);
    }
  }
  static async setCounter(e, t, i, n = void 0, s = void 0) {
    switch (t) {
      case A.monitors.anarchy:
        return await U.setAnarchy(e, i);
      case A.monitors.sceneAnarchy:
        return await U.setSceneAnarchy(e, i);
    }
    return await U.setCheckbar(e, t, i);
  }
  static getCounterValue(e, t, i) {
    switch (t) {
      case A.monitors.anarchy:
        return U.getAnarchy(e, t);
    }
    return U.value(e, t);
  }
  static async setCheckbar(e, t, i) {
    if (i == U.getCounterValue(e, t))
      return;
    const n = Bt[t];
    if (n.path) {
      const s = U.max(e, t);
      if (s <= 0)
        return;
      await U._manageOverflow(n, e, t, i, s), i = Math.min(i, s), ea.checkOutOfRange(n.resource, i, 0, s), await e.setCheckbarValue(n.path, i);
    }
  }
  static async _manageOverflow(e, t, i, n, s) {
    if (n > s) {
      const r = e.overflow ? e.overflow(t) : void 0, o = e.recomputeOverflow ? e.recomputeOverflow(n - s) : n - s;
      r && o > 0 && (U._notifyOverflow(t, i, o, r), await U.addCounter(t, r, o));
    }
  }
  static _notifyOverflow(e, t, i, n) {
    const s = Ce(v.actor.monitors.overflow, {
      actor: e.name,
      monitor: v.actor.monitors[t],
      overflow: i,
      overflowMonitor: v.actor.monitors[n]
    });
    ui.notifications.warn(s);
  }
  static async _manageFatigueOverflow(e, t, i) {
    await U.addCounter(e, A.monitors.physical, t - i);
  }
  static async setAnarchy(e, t) {
    if (e.hasOwnAnarchy()) {
      if (e.hasGMAnarchy()) {
        await game.system.anarchy.gmAnarchy.setAnarchy(t), e.render();
        return;
      }
      await U._setAnarchyMonitor(e, A.monitors.anarchy, t);
    }
  }
  static async setSceneAnarchy(e, t) {
    await U._setAnarchyMonitor(e, A.monitors.sceneAnarchy, t);
  }
  static async _setAnarchyMonitor(e, t, i) {
    const n = U.value(e, t);
    await U.setCheckbar(e, t, i), game.user.isGM || U.notifyAnarchyChange(e, t, n, i);
  }
  static getAnarchy(e, t) {
    return !game.user.isGM && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) || t == oi.anarchy && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) ? 0 : U.value(e, t);
  }
  static notifyAnarchyChange(e, t, i, n) {
    jt.blindMessageToGM({
      from: game.user.id,
      content: Ce(
        v.gmManager.playerChangedAnarchy,
        {
          user: game.user.name,
          actor: e.name,
          monitor: v.actor.counters[t],
          from: i,
          to: n
        }
      )
    });
  }
}
const { loadTemplates: Ef, renderTemplate: Cf } = foundry.applications.handlebars, ol = {
  highlighted: ["far fa-times-circle", "fas fa-dice-one", "fas fa-dice-two", "fas fa-dice-three", "fas fa-dice-four", "fas fa-dice-five", "fas fa-dice-six"],
  dimmed: ["far fa-times-circle", "far fa-dice-one", "far fa-dice-two", "far fa-dice-three", "far fa-dice-four", "far fa-dice-five", "far fa-dice-six"]
};
class di {
  static init() {
    Hooks.once("ready", async () => await this.onReady()), Handlebars.registerHelper("dice-cursor-array", (e, t) => di.array(e ?? 0, t ?? 5)), Handlebars.registerHelper("dice-cursor-fas", (e, t) => di.fasClass(e, t)), Handlebars.registerHelper("dice-cursor-active", (e, t) => di.activeClass(e, t)), Handlebars.registerHelper("dice-cursor-color", (e, t) => di.colorClass(e, t));
  }
  static async onReady() {
    await Ef([
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
    return di.isActive(e, t) ? "active" : "inactive";
  }
  static fasClass(e, t) {
    const i = di.isActive(e, t) ? ol.highlighted : ol.dimmed;
    return di.$getFas(i, Math.abs(e));
  }
  static colorClass(e, t) {
    return e == 0 || !t ? e < 0 ? "fixed-dice-malus" : "fixed-dice-bonus" : e < 0 ? "variable-dice-malus" : "variable-dice-bonus";
  }
  static $getFas(e, t) {
    return e[t > 6 ? t % 6 : t];
  }
  static async diceCursor({ value: e, min: t, max: i, editable: n }) {
    return await Cf("systems/mwd/templates/roll/parts/dice-cursor.hbs", {
      value: e,
      min: t,
      max: i,
      editable: n
    });
  }
}
const We = {
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
}, ll = "anarchy-", cu = `${w}.${We.ANARCHY_HACK}`, vr = {
  id: w,
  name: "Standard Shadowrun Anarchy",
  hack: {
    checkbars: () => Bt
  }
};
globalThis.ANARCHY_HOOKS = We;
globalThis.SETTING_KEY_ANARCHY_HACK = cu;
globalThis.SHADOWRUN_ANARCHY_NO_HACK = vr;
class Vi {
  constructor() {
    this.hooks = [], this.hacks = {}, this.hackNames = {}, this.hookMethods = {}, this._register(We.ANARCHY_HACK), Hooks.on(We.ANARCHY_HACK, (e) => e(vr)), Hooks.on("updateSetting", async (e, t, i, n) => this.onUpdateSetting(e, t, i, n)), Hooks.once("ready", () => this.onReady()), Hooks.on("getSceneControlButtons", (e) => {
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
    Hooks.callAll(We.ANARCHY_HACK, (e) => {
      this.hacks[e.id] = e, this.hackNames[e.id] = e.name;
    }), game.settings.register(w, We.ANARCHY_HACK, {
      scope: "world",
      name: v.settings.anarchyHack.name,
      hint: v.settings.anarchyHack.hint,
      config: !0,
      default: vr.id,
      choices: this.hackNames,
      type: String
    }), this.applySelectedAnarchyHack();
  }
  async onUpdateSetting(e, t, i, n) {
    e.key == cu && this.applySelectedAnarchyHack();
  }
  applySelectedAnarchyHack() {
    const e = this.getSelectedHack();
    e && U.hackCheckbars(e.hack.checkbars());
  }
  selectHookMethod(e, t) {
    Hooks.callAll(t, (i, n) => {
      i == e && (this.hookMethods[t] = n);
    });
  }
  getSelectedHack() {
    return this.hacks[game.settings.get(w, We.ANARCHY_HACK)];
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
    Vi.instance()._register(e);
  }
  _register(e) {
    if (console.log(ve + "HooksManager.register", e), !e.startsWith(ll))
      throw `For safety Anarchy Hooks names must be prefixed by '${ll}'`;
    this.hooks.push(e);
  }
}
const cl = [
  A.itemType.assetModule,
  A.itemType.mechWeapon,
  A.itemType.personalWeapon,
  "weapon"
];
class ue {
  constructor() {
    this.modifiers = {
      groups: Te.mapObjetToKeyValue(v.modifier.group, "key", "label"),
      roll: ue._buildGroupOptions("roll"),
      attribute: ue._buildGroupOptions("attribute"),
      monitor: ue._buildGroupOptions("monitor"),
      other: ue._buildGroupOptions("other")
    }, Hooks.once("ready", () => this.onReady());
  }
  static _buildGroupOptions(e) {
    switch (e) {
      case "attribute":
        return {
          label: v.modifier.group[e],
          effects: Te.hbsAttributes.map((t) => ({ key: t.value, label: t.labelkey })),
          categories: []
        };
    }
    return {
      label: v.modifier.group[e],
      effects: Te.mapObjetToKeyValue(v.modifier[e].effect, "key", "label"),
      categories: Te.mapObjetToKeyValue(v.modifier[e].category, "key", "label")
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
                return Te.getDamageTypes().map((s) => ({ key: s.value, label: s.labelkey }));
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
        return Te.getAttributes().map((i) => ({ key: i.value, label: i.labelkey }));
      case "skill":
        return game.system.anarchy.skills.getSkills().map((i) => ({ key: i.code, label: i.labelkey }));
      case "attributeAction":
        const t = De.all().map((i) => ({ key: i.code, label: i.labelkey }));
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
            return i.subCategory == e.attributeAction || i.subCategory == De.getDefenseAttributeAction(e.defenseAction);
        }
      return !1;
    };
  }
  static computeRollModifiers(e, t, i) {
    const n = ue.buildRollModifiersFilter(t, i), s = (c) => c.group == "roll" && c.effect == i && n(c), r = ue._activeItems(e).map((c) => ue.itemModifiers(c, s)).reduce((c, u) => c.concat(u), []).sort(se.descending((c) => c.modifier.value)), o = ue.$sumAssetModuleModifiers(r.filter((c) => cl.includes(c.item.type)).map((c) => c.modifier.value)), l = se.sumValues(r.filter((c) => !cl.includes(c.item.type)).map((c) => c.modifier.value));
    return {
      value: o + l,
      sources: r
    };
  }
  static $sumAssetModuleModifiers(e) {
    const t = e.find((s) => s > 3) ?? 0, i = se.sumValues(e.filter((s) => s < 0)), n = Math.min(3, se.sumValues(e.filter((s) => s > 0 && s <= 3)));
    return i + Math.max(n, t);
  }
  static computeModifiers(e, t, i = void 0, n = void 0) {
    const s = ue._createFilter(t, i, n), r = ue._activeItems(e).map((l) => ue.itemModifiers(l, s)).reduce((l, c) => l.concat(c), []);
    return {
      value: se.sumValues(r, (l) => l.modifier.value),
      sources: r
    };
  }
  static sumMonitorModifiers(e, t, i, n = void 0) {
    return ue.sumModifiers(ue._activeItems(e), "monitor", t, i, n);
  }
  static sumModifiers(e, t, i, n, s = void 0) {
    const r = ue._createFilter(t, i, n, s), o = ue._activeItems(e).map((l) => ue.itemModifiers(l, r)).reduce((l, c) => l.concat(c), []);
    return se.sumValues(o, (l) => l.modifier.value);
  }
  static _createFilter(e, t, i, n = void 0) {
    return (s) => s.group == e && s.effect == (t ?? s.effect) && s.category == (i ?? s.category) && (n == null ? !0 : s.subCategory == n);
  }
  static countModifiers(e, t, i = void 0, n = void 0) {
    const s = ue._createFilter(t, i, n);
    return ue._activeItems(e).map((o) => ue.itemModifiers(o, s)).reduce((o, l) => o.concat(l), []).count;
  }
  static itemModifiers(e, t) {
    return ue._listItemModifiers(e, t).map((i) => ue._itemModifier(e, i));
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
const { loadTemplates: js, renderTemplate: jw } = foundry.applications.handlebars, Ae = {
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
}, ul = 4, Pf = [
  // attribute1
  {
    code: "attribute1",
    options: {
      order: 1,
      category: Ae.pool,
      hbsTemplateRoll: `${J}/roll/parts/select-attribute.hbs`
    },
    condition: (a) => Object.values(ot.rollType).includes(a.mode),
    isUsed: (a) => !0,
    factory: (a) => {
      var t;
      const e = a.attribute1 ?? ((t = a.skill) == null ? void 0 : t.system.attribute);
      return {
        labelkey: e ? v.attributes[e] : v.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: a.skill },
        selected: e,
        choices: Te.getAttributes((i) => a.attributes.includes(i))
      };
    }
  },
  // attribute2
  {
    code: "attribute2",
    options: {
      order: 1,
      category: Ae.pool,
      hbsTemplateRoll: `${J}/roll/parts/select-attribute.hbs`,
      hbsTemplateChat: `${J}/chat/parts/pool-attribute2.hbs`
    },
    condition: (a) => [ot.rollType.attribute, ot.rollType.attributeAction, ot.rollType.defense].includes(a.mode),
    isUsed: (a) => a.used,
    onChecked: (a, e) => a.used = !!e,
    factory: (a) => {
      const e = a.attribute2;
      return {
        labelkey: e ? v.attributes[e] : v.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: ot.rollType.attribute == a.mode },
        selected: e,
        choices: Te.getAttributes((t) => a.attributes.includes(t))
      };
    }
  },
  // skill
  {
    code: "skill",
    options: {
      flags: {},
      order: 3,
      category: Ae.pool,
      hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`
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
      category: Ae.pool,
      hbsTemplateRoll: `${J}/roll/parts/check-option.hbs`
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
      category: Ae.pool,
      value: 0,
      labelkey: v.common.roll.modifiers.social.credibility,
      hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`
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
      labelkey: v.common.roll.modifiers.poolModifiers,
      order: 5,
      category: Ae.pool,
      hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 4
    },
    factory: (a) => xi.computeRollModifiers(Ae.pool, a)
  },
  // wounds
  {
    code: "wounds",
    options: {
      flags: { optional: !0 },
      order: 10,
      category: Ae.pool,
      labelkey: v.common.roll.modifiers.wounds,
      hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`
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
      category: Ae.pool,
      value: 0,
      labelkey: v.common.roll.modifiers.other,
      hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`,
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
      category: Ae.glitch,
      value: 0,
      labelkey: v.common.roll.modifiers.glitch,
      hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${J}/chat/parts/glitch.hbs`,
      min: 0,
      max: 5
    },
    isUsed: (a) => a.value > 0,
    factory: (a) => {
      const e = a.actor.getWounds(), t = xi.computeRollModifiers(Ae.glitch, a);
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
      category: Ae.glitch,
      value: 0,
      labelkey: v.common.roll.modifiers.social.rumor,
      hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${J}/chat/parts/glitch.hbs`,
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
      category: Ae.reroll,
      labelkey: v.common.roll.modifiers.reroll,
      hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: ul
    },
    factory: (a) => {
      const e = xi.computeRollModifiers(Ae.reroll, a), t = xi.computeRollModifiers(Ae.rerollMax, a);
      return foundry.utils.mergeObject(e, {
        max: ul + Math.max(0, t.value ?? 0)
      });
    }
  },
  // reduction from opponent
  {
    code: "reduced",
    options: {
      order: 29,
      category: Ae.pool,
      labelkey: v.common.roll.modifiers.reduced,
      hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`,
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
      category: Ae.rerollForced,
      labelkey: v.common.roll.modifiers.rerollForced,
      hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 0
    },
    factory: (a) => {
      var t;
      const e = xi.computeRollModifiers(Ae.successReroll, a);
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
      category: Ae.pool,
      value: 0,
      min: 0,
      max: 3,
      labelkey: v.common.roll.modifiers.anarchyDisposition,
      hbsTemplateRoll: `${J}/roll/parts/check-option.hbs`
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
      category: Ae.risk,
      value: 0,
      labelkey: v.common.roll.modifiers.anarchyRisk,
      hbsTemplateRoll: `${J}/roll/parts/check-option.hbs`,
      hbsTemplateChat: `${J}/chat/parts/anarchy-risk.hbs`
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
      category: Ae.edge,
      labelkey: v.common.roll.modifiers.edge,
      hbsTemplateRoll: `${J}/roll/parts/check-option.hbs`
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
          label: v.actor.counters.edgePools[s] ?? s,
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
      category: Ae.opponentPool,
      labelkey: v.common.roll.modifiers.opponentPool,
      hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => xi.computeRollModifiers(Ae.opponentPool, a),
    condition: (a) => !a.attributeAction
  },
  // force opponent rerolls
  {
    code: "opponentReroll",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: Ae.opponentReroll,
      value: 0,
      labelkey: v.common.roll.modifiers.opponentReroll,
      hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => xi.computeRollModifiers(Ae.opponentReroll, a),
    condition: (a) => !a.attributeAction
  }
];
class xi {
  constructor() {
    this.registeredParameters = {}, Vi.register(We.REGISTER_ROLL_PARAMETERS), Vi.register(We.MODIFY_ROLL_PARAMETER), Hooks.on(We.MODIFY_ROLL_PARAMETER, (e) => this._validate(e)), Hooks.once(We.REGISTER_ROLL_PARAMETERS, (e) => Pf.forEach(
      (t) => e(t)
    )), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(We.REGISTER_ROLL_PARAMETERS, async (t) => {
      Hooks.callAll(We.MODIFY_ROLL_PARAMETER, t), t.ignore || await this._register(t);
    });
    const e = se.distinct([].concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateRoll)).concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateChat)).filter((t) => typeof t == "string" && t.length > 0));
    await js(se.distinct(e)), await js([`${J}/roll/parts/parameter-label.hbs`]);
  }
  _validate(e) {
    e.code || (console.error(`${ve} RollParameter does not have a code`, e), e.ignore = !0);
  }
  async _register(e) {
    if (this.registeredParameters[e.code]) {
      console.error(`${ve} RollParameter ${e.code} is already registered`, e);
      return;
    }
    e.onChecked || (e.onChecked = (t, i) => t.used = i), e.onValue = (t, i) => t.value = i, this.registeredParameters[e.code] = e;
  }
  async _optionalLoadTemplate(e) {
    e && await js([e]);
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
    return ue.computeRollModifiers(n, t, e);
  }
}
const { ApplicationV2: Nf, HandlebarsApplicationMixin: Rf } = foundry.applications.api, { loadTemplates: If, renderTemplate: Df } = foundry.applications.handlebars;
var cs, uu;
const Ge = class Ge extends Rf(Nf) {
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
    await If([
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
    const i = foundry.utils.mergeObject(Ge.prepareActorRoll(e), {
      mode: ot.rollType.attribute,
      attribute1: t
    });
    await Ge.create(i);
  }
  static async rollAttributeAction(e, t) {
    const i = foundry.utils.mergeObject(Ge.prepareActorRoll(e), {
      mode: ot.rollType.attributeAction,
      attributeAction: t.code,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e)
    });
    await Ge.create(i);
  }
  static async rollSkill(e, t, i) {
    const n = foundry.utils.mergeObject(Ge.prepareActorRoll(e), {
      mode: ot.rollType.skill,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? A.actorAttributes.reflexes,
      specialization: i
    });
    await Ge.create(n);
  }
  static async rollWeapon(e, t, i, n) {
    const s = foundry.utils.mergeObject(Ge.prepareActorRoll(e), {
      mode: ot.rollType.weapon,
      weapon: i,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? e.getPhysicalAgility(),
      specialization: void 0,
      targeting: n
    });
    await Ge.create(s);
  }
  static async rollDefense(e, t, i) {
    const n = foundry.utils.mergeObject(Ge.prepareActorRoll(e), {
      mode: ot.rollType.defense,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e),
      defenseAction: t.code,
      attackRoll: i.attackRoll,
      tokenId: i.defenderTokenId,
      choiceChatMessageId: i.choiceChatMessageId
    });
    await Ge.create(n);
  }
  static async itemAttributeRoll(e, t) {
    const i = foundry.utils.mergeObject(Ge.prepareActorRoll(e.actor), {
      mode: ot.rollType.attribute,
      item: e,
      attribute1: t,
      attributes: e.actor.getUsableAttributes(e)
    });
    await Ge.create(i);
  }
  static async create(e) {
    var r;
    const t = M(r = Ge, cs, uu).call(r, e), i = await Df(`${J}/roll/roll-dialog-title.hbs`, t), n = {
      id: `roll-dialog-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Ge.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new Ge({ roll: t }, n).render({ force: !0 });
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
      n.onChecked(n, i.currentTarget.checked), n.category == Ae.pool && await this._updateParameterValue(n, n.value), n.code == "edge" && this.html.find(`.parameter[data-parameter-code='${n.code}'] .edge-pool-select`).prop("disabled", !n.used);
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
    return await di.diceCursor({
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
cs = new WeakSet(), uu = function(e) {
  const t = game.system.anarchy.rollParameters.build(e).sort(se.ascending((i) => i.order ?? 200));
  return foundry.utils.mergeObject(e, {
    ENUMS: Te.getEnums((i) => e.attributes.includes(i)),
    ANARCHY: v,
    parameters: t
  });
}, Me(Ge, cs), D(Ge, "PARTS", {
  body: {
    template: `${J}/roll/roll-dialog.hbs`
  }
});
let ei = Ge;
const Ao = 2, kr = "skillSpecializationCatalog", Of = [
  { key: "running", label: "Running" },
  { key: "jumping", label: "Jumping" },
  { key: "swimming", label: "Swimming" },
  { key: "climbing", label: "Climbing" },
  { key: "acrobatics", label: "Acrobatics" }
], du = /* @__PURE__ */ new Set(), si = [
  // Strength
  { code: "athletics", label: "Athletics", attribute: "strength", icon: `${ce}/athletics.svg`, domains: ["physical"], specializations: Of },
  { code: "heavyWeapons", label: "Heavy Weapons", attribute: "strength", icon: `${ce}/heavy-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  // Reflexes
  { code: "escapeArtist", label: "Escape Artist", attribute: "reflexes", icon: `${ce}/escape-artist.svg`, domains: ["physical"] },
  { code: "gunnery", label: "Gunnery", attribute: "reflexes", icon: `${ce}/vehicle-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "meleeCombat", label: "Melee Combat", attribute: "reflexes", icon: `${ce}/close-combat.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "piloting", label: "Piloting", attribute: "reflexes", icon: `${ce}/piloting-ground-steering-wheel.svg`, domains: ["physical"] },
  { code: "projectileWeapons", label: "Projectile Weapons", attribute: "reflexes", icon: `${ce}/projectile-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "firearms", label: "Firearms", attribute: "reflexes", icon: `${ce}/firearms.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "stealth", label: "Stealth", attribute: "reflexes", icon: `${ce}/stealth.svg`, domains: ["physical"] },
  { code: "zeroGOps", label: "Zero-G Operations", attribute: "reflexes", icon: `${ce}/fly.svg`, domains: ["physical"] },
  // Intelligence
  { code: "art", label: "Art", attribute: "intelligence", icon: `${ce}/art.svg`, domains: ["mental"] },
  { code: "artillery", label: "Artillery", attribute: "intelligence", icon: `${ce}/artillery.svg`, domains: ["mental"] },
  { code: "systemOps", label: "System Operations", attribute: "intelligence", icon: `${ce}/electronics.svg`, domains: ["mental"] },
  { code: "computers", label: "Computers", attribute: "intelligence", icon: `${ce}/hacking.svg`, domains: ["mental"] },
  { code: "demolitions", label: "Demolitions", attribute: "intelligence", icon: `${ce}/demolition.svg`, domains: ["mental"] },
  { code: "medTech", label: "Medtech", attribute: "intelligence", icon: `${ce}/biotech.svg`, domains: ["mental"] },
  { code: "science", label: "Science", attribute: "intelligence", icon: `${ce}/skills.svg`, domains: ["mental"] },
  { code: "perception", label: "Perception", attribute: "intelligence", icon: `${ce}/skills.svg`, domains: ["mental"] },
  { code: "tactics", label: "Tactics", attribute: "intelligence", icon: `${ce}/skills.svg`, domains: ["mental"] },
  { code: "technician", label: "Technician", attribute: "intelligence", icon: `${ce}/engineering.svg`, domains: ["mental"] },
  { code: "tracking", label: "Tracking", attribute: "intelligence", icon: `${ce}/tracking.svg`, domains: ["physical", "mental"] },
  { code: "navigation", label: "Navigation", attribute: "intelligence", icon: `${ce}/piloting-other.svg`, domains: ["mental"] },
  // Guts
  { code: "administration", label: "Administration", attribute: "willpower", icon: `${ce}/knowledge.svg`, domains: ["social", "mental"] },
  { code: "animalHandling", label: "Animal Handling", attribute: "willpower", icon: `${ce}/animals.svg`, domains: ["physical", "mental"] },
  { code: "survival", label: "Survival", attribute: "willpower", icon: `${ce}/survival.svg`, domains: ["physical", "mental"] },
  // Charisma
  { code: "acting", label: "Acting", attribute: "charisma", icon: `${ce}/con-art.svg`, domains: ["social"] },
  { code: "disguise", label: "Disguise", attribute: "charisma", icon: `${ce}/disguise.svg`, domains: ["social", "mental"] },
  { code: "leadership", label: "Leadership", attribute: "charisma", icon: `${ce}/psychology.svg`, domains: ["social"] },
  { code: "negotiation", label: "Negotiation", attribute: "charisma", icon: `${ce}/negotiation.svg`, domains: ["social"] },
  { code: "etiquette", label: "Etiquette", attribute: "charisma", icon: `${ce}/etiquette.svg`, domains: ["social"] },
  { code: "streetwise", label: "Streetwise", attribute: "charisma", icon: `${ce}/etiquette2.svg`, domains: ["social"] },
  { code: "intimidation", label: "Intimidation", attribute: "charisma", icon: `${ce}/intimidation.svg`, domains: ["social", "mental"] }
].map(_f);
for (const a of si)
  du.add(a.code);
function _f(a) {
  return {
    ...a,
    label: a.label ?? a.code,
    icon: a.icon ?? `${un}/icons/skills/skills.svg`,
    specializations: To(a.specializations)
  };
}
function wo(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function To(a = []) {
  const e = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((t) => {
    const i = wo((t == null ? void 0 : t.key) ?? (t == null ? void 0 : t.label) ?? t);
    return !i || e.has(i) ? null : (e.add(i), {
      key: i,
      label: String((t == null ? void 0 : t.label) ?? (t == null ? void 0 : t.key) ?? t ?? i).trim() || i
    });
  }).filter(Boolean);
}
function Lf(a = []) {
  const e = new Error(a[0] ?? "Invalid skill specialization data.");
  return e.validationErrors = a, e;
}
function xf() {
  const a = {};
  for (const e of si) {
    const t = (Array.isArray(e.specializations) ? e.specializations : []).map((i) => String((i == null ? void 0 : i.label) ?? "").trim()).filter(Boolean);
    t.length && (a[e.code] = t);
  }
  return a;
}
const $f = Object.freeze(xf());
function Bf(a, e = [], { strict: t = !1, errors: i = [] } = {}) {
  var s, r;
  if (!Array.isArray(e)) {
    if (t) {
      const o = ((s = Mr(a)) == null ? void 0 : s.label) ?? a;
      i.push(`${o}: expected an array of specialization labels.`);
    }
    return [];
  }
  const n = [];
  for (const o of e) {
    const l = String(o ?? "").trim();
    if (!l) {
      if (t) {
        const c = ((r = Mr(a)) == null ? void 0 : r.label) ?? a;
        i.push(`${c}: specialization labels cannot be blank.`);
      }
      continue;
    }
    n.push(l);
  }
  return To(n).map((o) => o.label);
}
function Mr(a) {
  return si.find((e) => e.code === a);
}
function mu(a, { strict: e = !1 } = {}) {
  const t = a && typeof a == "object" && !Array.isArray(a) ? a : {}, i = [], n = {};
  for (const [s, r] of Object.entries(t)) {
    if (!du.has(s)) {
      e && i.push(`Unknown skill code "${s}".`);
      continue;
    }
    const o = Bf(s, r, { strict: e, errors: i });
    o.length && (n[s] = o);
  }
  if (e && i.length) throw Lf(i);
  return Object.fromEntries(
    si.map((s) => [s.code, n[s.code]]).filter(([, s]) => Array.isArray(s) && s.length)
  );
}
function zf() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${w}.${kr}`))
      return game.settings.get(w, kr);
  } catch {
  }
  return hu();
}
function fu() {
  const a = mu(zf(), { strict: !1 });
  return Object.fromEntries(
    Object.entries(a).map(([e, t]) => [
      e,
      To(t)
    ])
  );
}
function pu(a = [], { allowedKeys: e = null } = {}) {
  const t = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((i) => wo(i)).filter((i) => !i || t.has(i) || e && !e.has(i) ? !1 : (t.add(i), !0));
}
function Ot(a) {
  const e = Mr(a);
  if (e)
    return {
      ...e,
      specializations: Yi(e.code)
    };
}
function Jn() {
  const a = fu();
  return [...si].map((e) => ({
    ...e,
    specializations: [...a[e.code] ?? []]
  })).sort((e, t) => e.label.localeCompare(t.label));
}
function Yi(a) {
  return [...fu()[a] ?? []];
}
function vo(a, e) {
  const t = wo(e);
  if (t)
    return Yi(a).find((i) => i.key === t);
}
function Ff(a, e) {
  var t;
  return ((t = vo(a, e)) == null ? void 0 : t.label) ?? "";
}
function hu() {
  return foundry.utils.deepClone($f);
}
function bs(a, { strict: e = !1 } = {}) {
  return mu(a, { strict: e });
}
function Xn(a = []) {
  return pu(a);
}
function Uf(a, e = []) {
  const t = new Set(Yi(a).map((n) => n.key)), i = new Set(pu(e, { allowedKeys: t }));
  return Yi(a).filter((n) => i.has(n.key)).map((n) => n.key);
}
function Er(a, e) {
  var t, i;
  return Xn(
    ((i = (t = a == null ? void 0 : a.skills) == null ? void 0 : t[e]) == null ? void 0 : i.specializations) ?? []
  );
}
function Ss(a, e) {
  return Uf(
    e,
    Er(a, e)
  );
}
function gu(a, e) {
  const t = new Set(Ss(a, e));
  return Yi(e).filter((i) => t.has(i.key));
}
function Hf(a) {
  const e = Math.ceil(a.length / 2);
  return { left: a.slice(0, e), right: a.slice(e) };
}
function Wf(a) {
  var e, t;
  a.skills ?? (a.skills = {});
  for (const i of si) {
    const n = (e = a.skills)[t = i.code] ?? (e[t] = {});
    n.rating == null && (n.rating = 0), n.bonus == null && (n.bonus = 0), n.specializations = Xn(n.specializations);
  }
}
function yu(a, { bonusBySkill: e = null } = {}) {
  const t = Jn(), { left: i, right: n } = Hf(t), s = (r) => {
    var y, b, S, T, E, P;
    const o = r.code, l = r.attribute, c = Number(((b = (y = a == null ? void 0 : a.skills) == null ? void 0 : y[o]) == null ? void 0 : b.rating) ?? 0), u = Number(((T = (S = a == null ? void 0 : a.attributes) == null ? void 0 : S[l]) == null ? void 0 : T.value) ?? 0), d = Number(((P = (E = a == null ? void 0 : a.skills) == null ? void 0 : E[o]) == null ? void 0 : P.bonus) ?? 0), m = Number((e == null ? void 0 : e[o]) ?? 0), f = d + m, p = gu(a, o), h = Yi(o).filter((C) => !p.some((H) => H.key === C.key)), g = u + c + f;
    return {
      code: o,
      label: r.label,
      icon: r.icon,
      attribute: l,
      attributeLabel: Te != null && Te.localizeAttribute ? Te.localizeAttribute(l) : l,
      rating: c,
      base: u,
      bonus: f,
      total: g,
      rollPayload: JSON.stringify({ intent: "skill", key: o }),
      canAddSpecialization: h.length > 0,
      specializations: p.map((C) => ({
        ...C,
        bonus: Ao,
        rollPayload: JSON.stringify({
          intent: "skill",
          key: o,
          specializationKey: C.key,
          specializationLabel: C.label
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
const ba = {
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
}, bu = "statusConditionCatalog", jf = Object.freeze([
  { value: "person", label: "Person" },
  { value: "machine", label: "Machine" },
  { value: "all", label: "All Actors" },
  { value: "character", label: "Character" },
  { value: "npc", label: "NPC" },
  { value: "vehicle", label: "Vehicle" },
  { value: "battlemech", label: "BattleMech" }
]), dl = Object.freeze([
  { value: "false", label: "No" },
  { value: "true", label: "Yes" }
]), Su = Object.freeze([
  A.actorTypes.character,
  A.actorTypes.npc
]), Au = Object.freeze([
  A.actorTypes.vehicle,
  A.actorTypes.battlemech
]), Kf = Object.freeze([...Su, ...Au]), Zn = Object.freeze({
  person: Su,
  machine: Au,
  all: Kf,
  character: [A.actorTypes.character],
  npc: [A.actorTypes.npc],
  vehicle: [A.actorTypes.vehicle],
  battlemech: [A.actorTypes.battlemech]
}), wu = "systems/mwd/img/icons/status", Gf = Object.freeze([
  // Person conditions: lightly filtered from the existing status/icon pool.
  ie("prone", "Prone", "person", "physical", ["movement", "posture"], "prone.svg", { modifierKey: "prone", order: 10 }),
  ie("blinded", "Blinded", "person", "sensory", ["vision"], "blinded.svg", { modifierKey: "blinded", order: 20 }),
  ie("frightened", "Frightened", "person", "mental", ["morale"], "brain_injury.svg", { modifierKey: "frightened", order: 30 }),
  ie("deafened", "Deafened", "person", "sensory", ["hearing"], "deafened.svg", { order: 40 }),
  ie("hidden", "Hidden", "person", "tactical", ["stealth"], "hidden.svg", { order: 50 }),
  ie("suppressed", "Suppressed", "person", "tactical", ["offense"], "suppressed.svg", { order: 60 }),
  ie("grappled", "Grappled", "person", "physical", ["movement"], "grappled.svg", { order: 70 }),
  ie("stunned", "Stunned", "person", "physical", ["action"], "concussion.svg", { order: 80 }),
  ie("knockedOut", "Knocked Out", "person", "physical", ["unconscious"], "knockout.svg", { order: 90 }),
  ie("onFire", "On Fire", "all", "hazard", ["fire", "heat", "escalating"], "on_fire.svg", { order: 100 }),
  ie("drugged", "Drugged", "person", "chemical", ["impairment"], "drugged.svg", { order: 110 }),
  ie("radiation", "Radiation", "person", "hazard", ["radiation"], "radiation_low.svg", { order: 120 }),
  ie("overloaded", "Overloaded", "all", "reactor", ["heat", "actionRestriction"], "surge.svg", { managed: !0, modifierKey: "overloaded", order: 130 }),
  ie("preparedInterrupt", "Prepared", "person", "tactical", ["reaction", "prepared"], "readied_action.svg", { manual: !1, managed: !0, order: 140 }),
  ie("machineCritical", "Machine Critical", "machine", "damage", ["critical", "system"], "surge.svg", { manual: !1, managed: !0, order: 150 }),
  // Machine stability and movement.
  ie("unstable", "Unstable", "machine", "stability", ["movement", "piloting", "knockdown"], "falling.svg", { order: 1e3 }),
  ie("staggeredMechanical", "Staggered (Mechanical)", "machine", "stability", ["movement", "actionRestriction"], "falling.svg", { order: 1010 }),
  ie("proneMechFall", "Prone (Mech Fall)", "battlemech", "stability", ["movement", "posture", "standUp"], "prone.svg", { order: 1020 }),
  ie("skidding", "Skidding", "machine", "movement", ["forcedMovement", "tracking"], "falling.svg", { order: 1030 }),
  ie("stalled", "Stalled", "machine", "movement", ["movement", "actionRestriction"], "emp.svg", { order: 1040 }),
  ie("limping", "Limping", "machine", "movement", ["movement", "location"], "broken_leg.svg", { order: 1050 }),
  ie("jumpJetFailure", "Jump Jet Failure", "battlemech", "movement", ["jump", "equipment"], "surge.svg", { order: 1060 }),
  // Machine weapons.
  ie("weaponFailure", "Weapon Failure", "machine", "weapon", ["weapon", "mountScoped"], "broken_weapon.svg", { order: 1100 }),
  ie("jammedBallistic", "Jammed (Ballistic)", "machine", "weapon", ["weapon", "ballistic", "clearAction"], "broken_weapon.svg", { order: 1110 }),
  ie("armDestroyed", "Arm Destroyed", "battlemech", "damage", ["location", "weapon", "arm"], "dismembered_arm.svg", { order: 1120 }),
  // Sensors and electronics.
  ie("sensorDegraded", "Sensor Degraded", "machine", "sensor", ["sensor", "perception"], "all-seeing-eye.webp", { order: 1200 }),
  ie("sensorBlind", "Sensor Blind", "machine", "sensor", ["sensor", "targeting", "rangeLimit"], "damaged_eye.svg", { order: 1210 }),
  ie("ecmJamming", "ECM Jamming", "machine", "electronicWarfare", ["ecm", "tracking"], "emp.svg", { order: 1220 }),
  ie("ecmShrouded", "ECM Shrouded", "machine", "electronicWarfare", ["ecm", "defense"], "hidden.svg", { order: 1230 }),
  ie("eccmBoosted", "ECCM Boosted", "machine", "electronicWarfare", ["eccm", "sensor"], "all-seeing-eye.webp", { order: 1240 }),
  ie("sensorLocked", "Sensor Locked", "machine", "sensor", ["sensor", "targeted"], "all-seeing-eye.webp", { order: 1250 }),
  // Reactor and heat.
  ie("reactorInstability", "Reactor Instability", "machine", "reactor", ["heat", "reactor", "escalating"], "surge.svg", { order: 1300 }),
  ie("shutdown", "Shutdown", "machine", "reactor", ["heat", "actionRestriction"], "emp.svg", { order: 1310 }),
  ie("overheating", "Overheating", "machine", "reactor", ["heat", "escalating"], "on_fire_mild.svg", { order: 1320 }),
  ie("reactorBreach", "Reactor Breach", "machine", "reactor", ["reactor", "catastrophic", "countdown"], "radiation_high.svg", { order: 1330 }),
  // Machine damage and battlefield exposure.
  ie("legDestroyed", "Leg Destroyed", "battlemech", "damage", ["location", "movement", "leg"], "dismembered_leg.svg", { order: 1400 }),
  ie("exposed", "Exposed", "machine", "tactical", ["defense", "vulnerable"], "target.svg", { icon: `${wu}/falling.svg`, order: 1410 }),
  ie("entrenchedHullDown", "Entrenched / Hull Down", "machine", "tactical", ["defense", "cover"], "cover.svg", { order: 1420 }),
  ie("obscured", "Obscured (Smoke/Dust)", "machine", "visibility", ["visibility", "cover"], "hidden.svg", { order: 1430 }),
  // Tactical markers.
  ie("evasiveWeave", "Evasive Weave", "machine", "tactical", ["defense", "attackPenalty", "selfInduced"], "falling.svg", { order: 1500 }),
  ie("braced", "Braced", "machine", "tactical", ["defense", "mobilityPenalty"], "cover.svg", { order: 1510 }),
  ie("overextended", "Overextended", "machine", "tactical", ["attack", "defensePenalty"], "surge.svg", { order: 1520 }),
  ie("targetFocused", "Target Focused", "machine", "tactical", ["targeted", "attack"], "all-seeing-eye.webp", { order: 1530 }),
  ie("suppressedMechanical", "Suppressed", "machine", "tactical", ["offense", "suppressed"], "suppressed.svg", { order: 1540 })
]);
function ie(a, e, t, i, n, s, r = {}) {
  return {
    id: a,
    label: e,
    actorGroup: t,
    category: i,
    tags: n,
    icon: r.icon ?? `${wu}/${s}`,
    manual: r.manual ?? !0,
    managed: r.managed ?? !1,
    modifierKey: r.modifierKey ?? "",
    order: r.order ?? 0
  };
}
function qf() {
  return typeof foundry < "u" && (foundry == null ? void 0 : foundry.utils);
}
function Vf(a) {
  return qf() && typeof foundry.utils.deepClone == "function" ? foundry.utils.deepClone(a) : JSON.parse(JSON.stringify(a));
}
function ml(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return t ? ["true", "1", "yes", "y", "on"].includes(t) : e;
}
function Tu() {
  return Vf(Gf);
}
function ko(a) {
  const e = String(a ?? "").trim();
  if (!e) return "";
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(/[^A-Za-z0-9]+/).map((i) => i.trim()).filter(Boolean);
  return t.length ? t.map((i, n) => {
    const s = i.toLowerCase();
    return n === 0 ? s : `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
  }).join("") : "";
}
function Mo(a = []) {
  const e = Array.isArray(a) ? a : String(a ?? "").split(","), t = /* @__PURE__ */ new Set(), i = [];
  for (const n of e) {
    const s = ko(n);
    !s || t.has(s) || (t.add(s), i.push(s));
  }
  return i;
}
function Yf(a = []) {
  return Mo(a).join(", ");
}
function vu(a, e = "person") {
  const i = String(a ?? "").trim().toLowerCase();
  return i === "battlemech" ? "battlemech" : Object.prototype.hasOwnProperty.call(Zn, i) ? i : e;
}
function Qf(a) {
  return [...Zn[vu(a)] ?? []];
}
function Jf(a = {}, { strict: e = !1, index: t = 0 } = {}) {
  const i = [], n = `Row ${t + 1}`, s = String((a == null ? void 0 : a.id) ?? "").trim(), r = String((a == null ? void 0 : a.label) ?? "").trim(), o = String((a == null ? void 0 : a.actorGroup) ?? "person").trim(), l = vu(o, ""), c = ko((a == null ? void 0 : a.category) ?? "general") || "general", u = Mo(a == null ? void 0 : a.tags), d = String((a == null ? void 0 : a.icon) ?? "").trim(), m = String((a == null ? void 0 : a.modifierKey) ?? "").trim(), f = Number((a == null ? void 0 : a.order) ?? 0);
  if (s || i.push(`${n}: id cannot be blank.`), r || i.push(`${n}: label cannot be blank.`), (!l || o && !Object.prototype.hasOwnProperty.call(Zn, l)) && i.push(`${n}: actorGroup must be one of ${Object.keys(Zn).join(", ")}.`), m && !(ba != null && ba[m]) && i.push(`${n}: modifierKey "${m}" is not a known mechanics-backed status.`), Number.isFinite(f) || i.push(`${n}: order must be numeric.`), e && i.length) {
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
    manual: ml(a == null ? void 0 : a.manual, !0),
    managed: ml(a == null ? void 0 : a.managed, !1),
    modifierKey: m,
    order: Number.isFinite(f) ? Math.trunc(f) : 0
  };
}
function Qi(a = [], { strict: e = !1 } = {}) {
  const t = Array.isArray(a) ? a : [], i = [], n = /* @__PURE__ */ new Set(), s = [];
  if (t.forEach((r, o) => {
    try {
      const l = Jf(r, { strict: e, index: o });
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
function As(a = void 0) {
  var i, n;
  if (a !== void 0) return Qi(a, { strict: !1 });
  const e = (i = globalThis.game) == null ? void 0 : i.settings, t = (n = e == null ? void 0 : e.get) == null ? void 0 : n.call(e, w, bu);
  return Qi(
    Array.isArray(t) ? t : Tu(),
    { strict: !1 }
  );
}
function ws(a, e = As()) {
  const t = String(a ?? "").trim();
  return t ? e.find((i) => String(i.id ?? "").trim() === t) ?? null : null;
}
function ku(a = null) {
  return String(
    typeof a == "string" ? a : (a == null ? void 0 : a.type) ?? ""
  ).trim();
}
function Ts(a, e = null) {
  const t = ku(e);
  return !t || !a ? !1 : Qf(a.actorGroup).includes(t);
}
function Xf({ statusId: a = "", actor: e = null, metadata: t = {}, catalogEntry: i = null } = {}) {
  const n = i ?? ws(a), s = Mo((t == null ? void 0 : t.tags) ?? (n == null ? void 0 : n.tags) ?? []);
  return {
    id: String(a || (n == null ? void 0 : n.id) || "").trim(),
    category: ko((t == null ? void 0 : t.category) ?? (n == null ? void 0 : n.category) ?? "general") || "general",
    tags: s,
    actorGroup: String((t == null ? void 0 : t.actorGroup) ?? (n == null ? void 0 : n.actorGroup) ?? "").trim(),
    actorType: ku(e),
    scope: String((t == null ? void 0 : t.scope) ?? "").trim(),
    location: String((t == null ? void 0 : t.location) ?? "").trim(),
    itemUuid: String((t == null ? void 0 : t.itemUuid) ?? "").trim(),
    targetUuid: String((t == null ? void 0 : t.targetUuid) ?? "").trim(),
    severity: String((t == null ? void 0 : t.severity) ?? "").trim(),
    notes: String((t == null ? void 0 : t.notes) ?? "").trim()
  };
}
function Zf(a = As()) {
  return Qi(a, { strict: !1 }).map((e) => ({
    id: e.id,
    name: e.label,
    label: e.label,
    img: e.icon,
    icon: e.icon
  }));
}
function fl() {
  if (typeof CONFIG > "u") return [];
  const a = Zf();
  return CONFIG.statusEffects = a, a;
}
const ep = /* @__PURE__ */ new Set(["overloaded", "preparedInterrupt"]);
function pl(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function tp(a, e) {
  var i, n, s;
  if (!a) return null;
  const t = pl(e) ?? pl(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((s = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : s.call(i, ((n = t == null ? void 0 : t.baseActor) == null ? void 0 : n.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function Eo(a) {
  const e = String(a ?? "").trim();
  if (!e) return "Status";
  const n = (e.includes(".") ? e.split(".").at(-1) : e).replace(/^status/i, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return n ? n.replace(/\b\w/g, (s) => s.toUpperCase()) : e;
}
function ip(a) {
  const e = String((a == null ? void 0 : a.name) ?? (a == null ? void 0 : a.label) ?? (a == null ? void 0 : a.id) ?? "Status").trim();
  return e ? Eo(e) : "Status";
}
function ap(a) {
  const e = typeof (a == null ? void 0 : a.img) == "string" ? a.img.trim() : "";
  if (e) return e;
  const t = a ? Object.getOwnPropertyDescriptor(a, "icon") : null;
  return "value" in (t ?? {}) ? String(t.value ?? "").trim() : "";
}
function np(a) {
  var e, t;
  return ((t = (e = globalThis.CSS) == null ? void 0 : e.escape) == null ? void 0 : t.call(e, String(a ?? ""))) ?? String(a ?? "").replace(/["\\]/g, "\\$&");
}
function Mu(a) {
  var e;
  return Object.prototype.hasOwnProperty.call(((e = a == null ? void 0 : a.system) == null ? void 0 : e.burn) ?? {}, "overloaded");
}
function Eu(a, e) {
  var n;
  const t = String(e ?? "").trim();
  return !a || !t ? null : Array.from(((n = a.effects) == null ? void 0 : n.contents) ?? a.effects ?? []).find((s) => {
    var r, o, l, c, u, d, m;
    return (o = (r = s == null ? void 0 : s.statuses) == null ? void 0 : r.has) != null && o.call(r, t) || Array.isArray(s == null ? void 0 : s.statuses) && s.statuses.includes(t) || ((c = (l = s == null ? void 0 : s.getFlag) == null ? void 0 : l.call(s, w, "status")) == null ? void 0 : c.id) === t || ((m = (d = (u = s == null ? void 0 : s.flags) == null ? void 0 : u[w]) == null ? void 0 : d.status) == null ? void 0 : m.id) === t ? !0 : String((s == null ? void 0 : s.statusId) ?? (s == null ? void 0 : s.id) ?? "").trim() === t;
  }) ?? null;
}
function Cu(a, e) {
  var i, n, s;
  const t = Eu(a, e);
  return ((i = t == null ? void 0 : t.getFlag) == null ? void 0 : i.call(t, w, "status")) ?? ((s = (n = t == null ? void 0 : t.flags) == null ? void 0 : n[w]) == null ? void 0 : s.status) ?? null;
}
function Ji(a, e) {
  var t, i, n, s, r, o;
  return e === "overloaded" && Mu(a) ? !!((i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.burn) != null && i.overloaded) || !!((s = (n = a == null ? void 0 : a.statuses) == null ? void 0 : n.has) != null && s.call(n, e)) : ((o = (r = a == null ? void 0 : a.statuses) == null ? void 0 : r.has) == null ? void 0 : o.call(r, e)) ?? !1;
}
function sp(a, e) {
  const t = Ji(e, a.id), i = Cu(e, a.id) ?? {};
  return {
    id: a.id,
    label: a.label,
    icon: a.icon,
    active: t,
    managed: !!a.managed || ep.has(a.id),
    manual: !!a.manual,
    legacy: !1,
    category: a.category,
    tags: [...a.tags ?? []],
    scope: String(i.scope ?? "").trim(),
    notes: String(i.notes ?? "").trim()
  };
}
function rp(a, e) {
  const t = (CONFIG.statusEffects ?? []).find((n) => String((n == null ? void 0 : n.id) ?? "").trim() === a) ?? null, i = Cu(e, a) ?? {};
  return {
    id: a,
    label: t ? ip(t) : Eo(a),
    icon: t ? ap(t) : "",
    active: Ji(e, a),
    managed: !1,
    manual: !1,
    legacy: !0,
    category: "",
    tags: [],
    scope: String(i.scope ?? "").trim(),
    notes: String(i.notes ?? "").trim()
  };
}
function Co(a) {
  const e = /* @__PURE__ */ new Set(), t = As(), i = [];
  for (const n of t) {
    const s = String((n == null ? void 0 : n.id) ?? "").trim();
    if (!s || e.has(s)) continue;
    const r = Ji(a, s), o = Ts(n, a);
    !r && (!o || !n.manual) || (e.add(s), i.push(sp(n, a)));
  }
  for (const n of Array.from((a == null ? void 0 : a.statuses) ?? [])) {
    const s = String(n ?? "").trim();
    !s || e.has(s) || (e.add(s), i.push(rp(s, a)));
  }
  return i.sort((n, s) => n.active !== s.active ? n.active ? -1 : 1 : n.legacy !== s.legacy ? n.legacy ? 1 : -1 : n.label.localeCompare(s.label));
}
function op(a) {
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
async function lp({ actor: a, effects: e, selectedStatusIds: t }) {
  const i = new Map(t.map((n) => [n.id, n]));
  for (const n of e) {
    const s = i.get(n.id), r = !!(s != null && s.active);
    await vs({
      actor: a,
      statusId: n.id,
      active: r,
      metadata: (s == null ? void 0 : s.metadata) ?? {}
    });
  }
}
async function hl(a, e, t = {}) {
  const i = ws(e);
  if (!i) return !1;
  const n = Eu(a, e);
  if (!n) return !1;
  const s = Xf({
    actor: a,
    statusId: e,
    metadata: t,
    catalogEntry: i
  }), r = { [`flags.${w}.status`]: s };
  return typeof n.update == "function" ? (await n.update(r), !0) : n.id && typeof a.updateEmbeddedDocuments == "function" ? (await a.updateEmbeddedDocuments("ActiveEffect", [{ _id: n.id, ...r }]), !0) : !1;
}
async function vs({ actor: a, statusId: e, active: t, metadata: i = {} }) {
  if (!a || !e) return !1;
  const n = Ji(a, e);
  if (!!t === n)
    return t ? hl(a, e, i) : !1;
  const s = ws(e), r = s ? Ts(s, a) : !1;
  return t && s && !r ? !1 : e === "overloaded" && Mu(a) ? (await a.update({ "system.burn.overloaded": !!t }), !0) : (await a.toggleStatusEffect(e, { active: !!t, overlay: !1 }), t && await hl(a, e, i), !0);
}
function cp(a) {
  var i, n, s, r, o;
  const e = /* @__PURE__ */ new Map(), t = Array.from(((i = a == null ? void 0 : a.querySelectorAll) == null ? void 0 : i.call(a, "[data-status-id]")) ?? []);
  for (const l of t) {
    const c = String(((n = l == null ? void 0 : l.dataset) == null ? void 0 : n.statusId) ?? "").trim();
    if (!c) continue;
    const u = np(c), d = !!((s = l.querySelector(`input[name="status.${u}.active"]`)) != null && s.checked), m = String(((r = l.querySelector(`input[name="status.${u}.scope"]`)) == null ? void 0 : r.value) ?? "").trim(), f = String(((o = l.querySelector(`input[name="status.${u}.notes"]`)) == null ? void 0 : o.value) ?? "").trim();
    e.set(c, {
      id: c,
      active: d,
      metadata: { scope: m, notes: f }
    });
  }
  return Array.from(e.values());
}
async function Pu({ actor: a, token: e } = {}) {
  var n;
  if (!a || !e) return !1;
  const t = tp(a, e), i = Co(t);
  return i.length ? foundry.applications.api.DialogV2.wait({
    window: {
      title: `Token Statuses: ${e.name ?? a.name ?? "Token"}`
    },
    position: {
      width: 420
    },
    content: op(i),
    buttons: [
      {
        action: "apply",
        label: "Apply",
        icon: "fa-solid fa-check",
        default: !0,
        callback: async (s, r) => {
          var o;
          try {
            const l = cp(r.form);
            return await lp({ actor: t, effects: i, selectedStatusIds: l }), !0;
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
function up() {
  typeof Hooks > "u" || Hooks.on("renderTokenHUD", (a, e, t = {}) => {
    var d, m, f, p, h;
    const i = (t == null ? void 0 : t._id) ?? (t == null ? void 0 : t.id) ?? "", n = ((m = (d = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : d.get) == null ? void 0 : m.call(d, i)) ?? null, s = (n == null ? void 0 : n.actor) ?? null;
    if (!s) return;
    const r = As(), o = new Map(r.map((g) => [g.id, g])), c = typeof jQuery < "u" && e instanceof jQuery ? e[0] : e;
    if (!(c instanceof HTMLElement)) return;
    const u = c.querySelectorAll("[data-status-id], [data-statusId], [data-effect-id]");
    for (const g of u) {
      const y = String(
        ((f = g.dataset) == null ? void 0 : f.statusId) ?? ((p = g.dataset) == null ? void 0 : p.statusid) ?? ((h = g.dataset) == null ? void 0 : h.effectId) ?? ""
      ).trim();
      if (!y) continue;
      const b = o.get(y);
      if (!b) continue;
      !Ji(s, y) && !Ts(b, s) && (g.hidden = !0, g.style.display = "none");
    }
  });
}
const dp = Object.freeze({
  STR: Ti.strength,
  REF: Ti.reflexes,
  WIL: Ti.willpower,
  INT: Ti.intelligence,
  CHA: Ti.charisma
}), mp = Object.freeze({
  STR: "Strength",
  REF: "Reflexes",
  WIL: "Willpower",
  INT: "Intelligence",
  CHA: "Charisma"
}), fp = Object.freeze({
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
function Po(a) {
  const e = String(a ?? "").trim();
  return e ? fp[e] ?? null : null;
}
function pp(a) {
  const e = Po(a);
  return e ? {
    intent: "common",
    id: e.id
  } : null;
}
function hp(a) {
  return dp[String(a ?? "").trim().toUpperCase()] ?? null;
}
function gp(a) {
  return mp[String(a ?? "").trim().toUpperCase()] ?? String(a ?? "").trim().toUpperCase();
}
function yp(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => String(e ?? "").trim().toUpperCase()).filter(Boolean).join(" + ");
}
const No = Object.freeze([
  { value: "positive", label: "Positive" },
  { value: "negative", label: "Negative" },
  { value: "narrative", label: "Narrative" }
]), Ro = Object.freeze([
  { value: "minor", label: "Minor" },
  { value: "major", label: "Major" }
]), Nu = Object.freeze([
  { value: "passive", label: "Passive" },
  { value: "triggered", label: "Triggered" }
]), Ru = Object.freeze([
  { value: "rollMod", label: "Roll Modifier" },
  { value: "burnAdjust", label: "Burn Adjust" },
  { value: "actionCostMod", label: "Action Cost Mod" },
  { value: "initiativeMod", label: "Initiative Mod" },
  { value: "damageMod", label: "Damage Intake Mod" },
  { value: "edgeEvent", label: "Edge Event" }
]), Iu = Object.freeze([
  { value: "onBuildRoll", label: "Build Roll" },
  { value: "onBeforeBurnApplied", label: "Before Burn Applied" },
  { value: "onBeforeActionCostFinalized", label: "Before Action Cost Finalized" },
  { value: "onInitiativeResolved", label: "Initiative Resolved" },
  { value: "onDamageResolved", label: "Damage Resolved" },
  { value: "onEndOfActivation", label: "End of Activation" },
  { value: "onEdgeSpend", label: "Edge Spend" },
  { value: "onEdgeGain", label: "Edge Gain" }
]), Io = Object.freeze([
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
]), Du = Object.freeze([
  { value: "adjustAmount", label: "Adjust Amount" },
  { value: "grantPool", label: "Grant Pool" }
]), bp = new Set(No.map((a) => a.value)), Sp = new Set(Ro.map((a) => a.value)), Ap = new Set(Nu.map((a) => a.value)), wp = new Set(Ru.map((a) => a.value)), Ou = new Set(Iu.map((a) => a.value)), Tp = new Set(Io.map((a) => a.value)), vp = new Set(Du.map((a) => a.value));
function re(a, e = "") {
  return String(a ?? "").trim() || e;
}
function pe(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function es(a) {
  return foundry.utils.deepClone(a);
}
function _u(a = []) {
  return (Array.isArray(a) ? a : typeof a == "string" ? a.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function kp(a) {
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
function Ks(a) {
  const e = Math.max(0, Math.trunc(pe(a, 0)));
  return e > 0 ? e : 0;
}
function Ni(a = {}) {
  const e = a && typeof a == "object" ? a : {};
  return {
    perActivation: Ks(e.perActivation),
    perRound: Ks(e.perRound),
    perScene: Ks(e.perScene)
  };
}
function Mp(a = {}) {
  const e = a && typeof a == "object" ? a : {}, t = {
    id: re(e.id, foundry.utils.randomID()),
    fact: re(e.fact)
  }, i = Io.find((s) => e[s.value] !== void 0 && e[s.value] !== null), n = (i == null ? void 0 : i.value) ?? (Tp.has(String(e.comparator ?? "").trim()) ? String(e.comparator).trim() : "eq");
  return t.comparator = n, n !== "truthy" && n !== "falsy" && (t.value = kp(e[n] ?? e.value ?? "")), t;
}
function mi(a = []) {
  return (Array.isArray(a) ? a : []).map(Mp);
}
function Ep(a = {}) {
  const e = a && typeof a == "object" ? a : {}, t = wp.has(String(e.type ?? "").trim()) ? String(e.type).trim() : "rollMod", i = Cp(t), n = Ou.has(String(e.phase ?? "").trim()) ? String(e.phase).trim() : i, s = vp.has(String(e.operation ?? "").trim()) ? String(e.operation).trim() : "adjustAmount";
  return {
    id: re(e.id, foundry.utils.randomID()),
    type: t,
    phase: n,
    selector: re(e.selector),
    skillKeys: _u(e.skillKeys),
    label: re(e.label),
    value: pe(e.value, 0),
    min: e.min === void 0 || e.min === null || e.min === "" ? null : pe(e.min, 0),
    max: e.max === void 0 || e.max === null || e.max === "" ? null : pe(e.max, 0),
    pool: re(e.pool),
    operation: s,
    conditions: mi(e.conditions),
    limit: Ni(e.limit)
  };
}
function Lu(a = {}) {
  const e = re(a == null ? void 0 : a.selector);
  return e === "intent.skill" || e.startsWith("intent.skill.");
}
function Bi(a = []) {
  return (Array.isArray(a) ? a : []).map(Ep).filter((t) => t.phase && t.type);
}
function Kt(a = {}) {
  const e = a && typeof a == "object" ? es(a) : {}, t = e.positive === !1 ? "negative" : "positive", i = bp.has(String(e.category ?? "").trim()) ? String(e.category).trim() : t, n = Sp.has(String(e.tier ?? "").trim()) ? String(e.tier).trim() : "minor", s = Ap.has(String(e.activation ?? "").trim()) ? String(e.activation).trim() : "passive";
  return {
    ...e,
    positive: i === "positive",
    category: i,
    tier: n,
    activation: s,
    tags: _u(e.tags),
    effects: Bi(e.effects),
    prerequisites: mi(e.prerequisites),
    limits: Ni(e.limits)
  };
}
function xu() {
  return {
    categories: [...No],
    tiers: [...Ro],
    activations: [...Nu],
    effectTypes: [...Ru],
    phases: [...Iu],
    comparators: [...Io],
    edgeOperations: [...Du]
  };
}
function Nn(a = "") {
  var e;
  return ((e = No.find((t) => t.value === a)) == null ? void 0 : e.label) ?? "Positive";
}
function Rn(a = "") {
  var e;
  return ((e = Ro.find((t) => t.value === a)) == null ? void 0 : e.label) ?? "Minor";
}
function Cp(a = "") {
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
function Pp(a) {
  return Array.from((a == null ? void 0 : a.items) ?? []).filter((e) => ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === "quality").map((e) => ({
    item: e,
    system: Kt(e.system ?? {})
  }));
}
function Np(a = {}, e = {}) {
  const t = Ni(a), i = Ni(e);
  return {
    perActivation: i.perActivation || t.perActivation,
    perRound: i.perRound || t.perRound,
    perScene: i.perScene || t.perScene
  };
}
function $u(a = {}) {
  var n, s, r;
  const e = re(a.combatId ?? ((n = a.combat) == null ? void 0 : n.id)), t = Math.max(0, Math.trunc(pe(a.round ?? ((s = a.combat) == null ? void 0 : s.round), 0))), i = re(a.sceneId ?? ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id));
  return {
    activationKey: re(a.activationKey),
    roundKey: e ? `${e}:${t}` : "",
    sceneKey: i
  };
}
function Rp(a, e = {}) {
  var s, r, o, l;
  const t = ((s = a == null ? void 0 : a.flags) == null ? void 0 : s[w]) ?? {}, i = ((r = t == null ? void 0 : t.traitUsage) == null ? void 0 : r.scene) ?? {}, n = e.state ?? {};
  return {
    activation: ((o = n == null ? void 0 : n.traitUsage) == null ? void 0 : o.activation) ?? {},
    round: ((l = n == null ? void 0 : n.traitUsage) == null ? void 0 : l.round) ?? {},
    scene: i
  };
}
function Ip(a, e, t, i) {
  var n, s, r, o, l;
  switch (t) {
    case "perActivation":
      return Math.max(0, Math.trunc(pe((n = a.activation) == null ? void 0 : n[i], 0)));
    case "perRound":
      return Math.max(0, Math.trunc(pe((r = (s = a.round) == null ? void 0 : s[e.roundKey]) == null ? void 0 : r[i], 0)));
    case "perScene":
      return Math.max(0, Math.trunc(pe((l = (o = a.scene) == null ? void 0 : o[e.sceneKey]) == null ? void 0 : l[i], 0)));
    default:
      return 0;
  }
}
function Dp(a, e, t, i) {
  const n = [];
  for (const s of ["perActivation", "perRound", "perScene"]) {
    const r = Math.max(0, Math.trunc(pe(t == null ? void 0 : t[s], 0)));
    if (!r) continue;
    Ip(a, e, s, i) >= r && n.push(`${s} limit reached`);
  }
  return n;
}
function Op(a, e, t) {
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
function gl(a, e) {
  if (!re(a == null ? void 0 : a.fact)) return !0;
  const t = foundry.utils.getProperty(e, a.fact);
  return Op(t, a.comparator, a.value);
}
function _p(a = "", e = {}) {
  const t = re(a);
  return t ? (Array.isArray(e == null ? void 0 : e.selectors) ? e.selectors : []).some(
    (n) => n === t || n.startsWith(`${t}.`)
  ) : !0;
}
function Bu(a, e) {
  return `${a.id}:${e.id}`;
}
function Lp(a, e) {
  var t;
  return !!((t = a.system) != null && t.inactive) || !!(e != null && e.inactive);
}
function yl(a = []) {
  return a.map((e) => e.fact).filter(Boolean).join(", ");
}
function na(a, e, t) {
  const i = pe(a[e], 0);
  let n = i;
  return typeof t.value == "number" && (n += t.value), typeof t.min == "number" && (n = Math.max(t.min, n)), typeof t.max == "number" && (n = Math.min(t.max, n)), a[e] = n, n - i;
}
function yi(a, e, t, i, n) {
  i && a.push({
    id: `trait:${n}:${e.id}:${t.id}`,
    label: t.label || e.name,
    value: i,
    source: e.name,
    traitItemId: e.id,
    traitEffectId: t.id
  });
}
function xp({ item: a, effect: e, phase: t, packet: i, result: n }) {
  switch (e.type) {
    case "rollMod": {
      const s = pe(e.value, 0);
      return yi(n.modifiers, a, e, s, t), s;
    }
    case "burnAdjust": {
      if (t === "onEndOfActivation") {
        const r = na(i, "burnDelta", e);
        return yi(n.modifiers, a, e, r, t), r;
      }
      const s = na(i, "amount", e);
      return yi(n.modifiers, a, e, s, t), s;
    }
    case "actionCostMod": {
      const s = na(i, "cost", e);
      return yi(n.modifiers, a, e, s, t), s;
    }
    case "initiativeMod": {
      const s = na(i, "total", e);
      return yi(n.modifiers, a, e, s, t), s;
    }
    case "damageMod": {
      const s = na(i, "amount", e);
      return yi(n.modifiers, a, e, s, t), s;
    }
    case "edgeEvent": {
      if (t === "onEndOfActivation" && e.operation === "grantPool" && e.pool)
        return i.edgeAdjustments ?? (i.edgeAdjustments = []), i.edgeAdjustments.push({
          poolKey: e.pool,
          amount: pe(e.value, 0),
          label: e.label || a.name,
          source: a.name
        }), yi(n.modifiers, a, e, pe(e.value, 0), t), pe(e.value, 0);
      const s = na(i, "amount", e);
      return yi(n.modifiers, a, e, s, t), s;
    }
    default:
      return 0;
  }
}
function $p(a, e, t) {
  const i = Bu(a, e), n = [];
  return t.perActivation > 0 && n.push({ kind: "usage", scope: "perActivation", key: i, delta: 1 }), t.perRound > 0 && n.push({ kind: "usage", scope: "perRound", key: i, delta: 1 }), t.perScene > 0 && n.push({ kind: "usage", scope: "perScene", key: i, delta: 1 }), n;
}
function zu(a = "") {
  const e = re(a);
  return e ? [`action.${e}`] : [];
}
function ta(a, e = {}) {
  var o, l, c, u, d;
  const t = e.snapshot ?? null, i = e.state ?? (t == null ? void 0 : t.state) ?? {}, n = Array.isArray(i == null ? void 0 : i.actionLog) ? i.actionLog.map((m) => re(m == null ? void 0 : m.id)).filter(Boolean) : [], s = (i == null ? void 0 : i.actionState) ?? {}, r = [];
  return s != null && s.aim && r.push("state.aim"), s != null && s.preparedInterrupt && r.push("state.preparedInterrupt"), {
    activation: {
      moved: n.includes("move") || !!((o = s == null ? void 0 : s.move) != null && o.moved),
      saSpent: Math.max(0, Math.trunc(pe(i == null ? void 0 : i.saSpentThisActivation, 0))),
      attacksThisActivation: Math.max(0, Math.trunc(pe(i == null ? void 0 : i.attacksThisActivation, 0))),
      burnThisActivation: Math.max(0, Math.trunc(pe(i == null ? void 0 : i.burnThisActivation, 0)))
    },
    actionState: {
      aim: (s == null ? void 0 : s.aim) ?? null,
      move: (s == null ? void 0 : s.move) ?? null,
      preparedInterrupt: (s == null ? void 0 : s.preparedInterrupt) ?? null
    },
    burn: {
      current: Math.max(0, Math.trunc(pe((c = (l = a == null ? void 0 : a.system) == null ? void 0 : l.burn) == null ? void 0 : c.value, 0))),
      overloaded: !!((d = (u = a == null ? void 0 : a.system) == null ? void 0 : u.burn) != null && d.overloaded)
    },
    timing: {
      firstAttackThisActivation: Math.max(0, Math.trunc(pe(i == null ? void 0 : i.attacksThisActivation, 0))) === 0,
      firstExtraSAThisActivation: Math.max(0, Math.trunc(pe(i == null ? void 0 : i.saSpentThisActivation, 0))) <= 3
    },
    selectors: r
  };
}
function Do({ actor: a, resolved: e, payload: t, runtime: i = {} } = {}) {
  var d, m, f, p, h, g, y, b, S, T, E, P;
  const n = ta(a, i), s = re((e == null ? void 0 : e.intent) ?? (t == null ? void 0 : t.intent), "skill"), r = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [], o = re(((d = e == null ? void 0 : e.attack) == null ? void 0 : d.rangeBand) ?? (t == null ? void 0 : t.rangeBand)), l = re(((f = (m = t == null ? void 0 : t.edge) == null ? void 0 : m.pre) == null ? void 0 : f.poolKey) ?? ((p = t == null ? void 0 : t.edge) == null ? void 0 : p.poolKey) ?? ""), c = re(
    ((h = e == null ? void 0 : e.data) == null ? void 0 : h.skillKey) ?? ((g = e == null ? void 0 : e.specialization) == null ? void 0 : g.skillKey) ?? (s === "skill" ? t == null ? void 0 : t.key : "")
  ), u = re(
    ((S = (b = (y = e == null ? void 0 : e.breakdown) == null ? void 0 : y.find) == null ? void 0 : b.call(y, (C) => (C == null ? void 0 : C.id) === "skill")) == null ? void 0 : S.label) ?? (e == null ? void 0 : e.title)
  );
  return n.intent = s, n.domains = r, n.rangeBand = o, n.skill = {
    key: c,
    label: u
  }, n.edge = {
    stage: (T = t == null ? void 0 : t.toggles) != null && T.useEdge ? "pre" : "",
    pool: l,
    spent: !!((E = t == null ? void 0 : t.toggles) != null && E.useEdge)
  }, n.selectors.push(`intent.${s}`), r.forEach((C) => n.selectors.push(`domain.${C}`)), o && n.selectors.push(`range.${o}`), s === "skill" && c && n.selectors.push(`skill.${c}`), (P = t == null ? void 0 : t.toggles) != null && P.useEdge && n.selectors.push("edge.pre"), n;
}
function Fu({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = ta(a, t);
  return i.action = {
    id: re(e.actionId),
    category: re(e.category),
    resource: re(e.resource),
    cost: pe(e.cost, 0),
    effectiveCost: pe(e.effectiveCost ?? e.cost, 0)
  }, i.selectors.push(...zu(e.actionId)), i.action.category && i.selectors.push(`actionCategory.${i.action.category}`), i.action.resource && i.selectors.push(`actionResource.${i.action.resource}`), i;
}
function In({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = ta(a, t);
  return i.action = {
    id: re(e.actionId),
    category: re(e.category),
    resource: re(e.resource)
  }, i.burn = {
    ...i.burn,
    amount: pe(e.amount, 0),
    source: re(e.source)
  }, e.source === "extraSA" && e.extraSaIndex === 1 && i.selectors.push("activation.extraSA:first"), e.source && i.selectors.push(`burn.${e.source}`), i.action.id && i.selectors.push(...zu(i.action.id)), i.action.category && i.selectors.push(`actionCategory.${i.action.category}`), i.action.category === "reaction" && i.selectors.push(`reaction.${i.action.id}`), i;
}
function Uu({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = ta(a, t);
  return i.intent = "initiative", i.domains = ["combat"], i.initiative = {
    total: pe(e.total, 0)
  }, i.selectors.push("intent.initiative"), i;
}
function Hu({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = ta(a, t);
  return i.damage = {
    amount: pe(e.amount, 0),
    track: re(e.track),
    damageType: re(e.damageType)
  }, i.selectors.push("incoming"), i;
}
function Cr({ actor: a, packet: e = {}, phase: t = "onEdgeGain", runtime: i = {} } = {}) {
  const n = ta(a, i);
  return n.edge = {
    pool: re(e.poolKey),
    amount: pe(e.amount, 0),
    eventKey: re(e.eventKey),
    source: re(e.source)
  }, n.selectors.push(t === "onEdgeSpend" ? "edge.spend" : "edge.gain"), n.edge.eventKey && n.selectors.push(`event.${n.edge.eventKey}`), n;
}
function Wu({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = ta(a, t);
  return i.event = {
    phase: "endOfActivation"
  }, i.selectors.push("endOfActivation"), pe(e.burnDelta, 0) !== 0 && i.selectors.push("burn.adjust"), i;
}
function Rt({ actor: a, phase: e, facts: t = {}, packet: i = {}, options: n = {} } = {}) {
  var u;
  const s = {
    packet: es(i),
    modifiers: [],
    mutations: [],
    applied: [],
    skipped: []
  };
  if (!a || !Ou.has(String(e ?? "").trim()))
    return s;
  const r = n.runtime ?? {}, o = Rp(a, r), l = $u(r), c = Pp(a);
  for (const { item: d, system: m } of c) {
    if (Lp(d, m)) {
      s.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: "Trait is inactive"
      });
      continue;
    }
    const f = m.prerequisites.filter((p) => re(p == null ? void 0 : p.fact)).filter((p) => !gl(p, t));
    if (f.length) {
      s.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: `Prerequisites not met: ${yl(f)}`
      });
      continue;
    }
    for (const p of m.effects.filter((h) => h.phase === e)) {
      if (!_p(p.selector, t)) {
        s.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: `Selector did not match (${p.selector || "any"})`
        });
        continue;
      }
      if (Lu(p) && p.skillKeys.length) {
        const T = re((u = t == null ? void 0 : t.skill) == null ? void 0 : u.key);
        if (!T || !p.skillKeys.includes(T)) {
          s.skipped.push({
            traitItemId: d.id,
            traitEffectId: p.id,
            label: p.label || d.name,
            reason: `Skill did not match (${p.skillKeys.join(", ")})`
          });
          continue;
        }
      }
      const h = p.conditions.filter((T) => re(T == null ? void 0 : T.fact)).filter((T) => !gl(T, t));
      if (h.length) {
        s.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: `Conditions not met: ${yl(h)}`
        });
        continue;
      }
      const g = Np(m.limits, p.limit), y = Bu(d, p), b = Dp(o, l, g, y);
      if (b.length) {
        s.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: b.join(", ")
        });
        continue;
      }
      const S = xp({
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
      }), n.consumeUsage && s.mutations.push(...$p(d, p, g));
    }
  }
  return s;
}
async function fi({ actor: a, mutations: e = [], runtime: t = {} } = {}) {
  var o, l, c, u, d, m, f, p, h;
  if (!a || !Array.isArray(e) || !e.length) return;
  const i = e.filter((g) => (g == null ? void 0 : g.kind) === "usage");
  if (!i.length) return;
  const n = es(((c = (l = (o = a.flags) == null ? void 0 : o[w]) == null ? void 0 : l.traitUsage) == null ? void 0 : c.scene) ?? {}), s = t.state ? es(t.state) : null, r = $u(t);
  for (const g of i) {
    const y = re(g.key), b = Math.max(0, Math.trunc(pe(g.delta, 0)));
    if (!(!y || !b))
      switch (g.scope) {
        case "perActivation": {
          if (!s) break;
          s.traitUsage ?? (s.traitUsage = {}), (u = s.traitUsage).activation ?? (u.activation = {}), s.traitUsage.activation[y] = Math.max(0, pe(s.traitUsage.activation[y], 0) + b);
          break;
        }
        case "perRound": {
          if (!s || !r.roundKey) break;
          s.traitUsage ?? (s.traitUsage = {}), (d = s.traitUsage).round ?? (d.round = {}), (m = s.traitUsage.round)[f = r.roundKey] ?? (m[f] = {}), s.traitUsage.round[r.roundKey][y] = Math.max(
            0,
            pe(s.traitUsage.round[r.roundKey][y], 0) + b
          );
          break;
        }
        case "perScene": {
          if (!r.sceneKey) break;
          n[p = r.sceneKey] ?? (n[p] = {}), n[r.sceneKey][y] = Math.max(0, pe(n[r.sceneKey][y], 0) + b);
          break;
        }
      }
  }
  s && ((h = t.combatant) != null && h.id) && await t.combatant.setFlag(w, "personalCombat", s), await a.setFlag(w, "traitUsage", { scene: n });
}
const ju = "personalActionCatalog", Re = Object.freeze({
  standard: "standard",
  complex: "complex",
  free: "free",
  reaction: "reaction",
  recovery: "recovery"
}), Pr = Object.freeze([
  { value: Re.standard, label: "Standard" },
  { value: Re.complex, label: "Complex" },
  { value: Re.free, label: "Free" },
  { value: Re.reaction, label: "Reaction" },
  { value: Re.recovery, label: "Burn & Recovery" }
]), Ku = Object.freeze([
  { value: "", label: "Not Implemented / Placeholder" },
  { value: "combatAction", label: "Generic Action" },
  { value: "combatAttack", label: "Attack Pipeline" },
  { value: "combatEvade", label: "Evade" },
  { value: "combatAssist", label: "Assist" },
  { value: "combatInterrupt", label: "Interrupt" },
  { value: "combatReduceBurn", label: "Reduce Burn" },
  { value: "combatOverloadCheck", label: "Overload Check" }
]), bl = new Set(Pr.map((a) => a.value)), Sl = new Set(Ku.map((a) => a.value)), Gu = Object.freeze([
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
].map((a) => Object.freeze(ks(a)))), Bp = new Map(Gu.map((a) => [a.id, a]));
function ks(a) {
  return JSON.parse(JSON.stringify(a ?? null));
}
function Al(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return ["true", "1", "yes", "y", "on"].includes(t) ? !0 : ["false", "0", "no", "n", "off", ""].includes(t) ? !1 : e;
}
function zp(a, e = null) {
  var i;
  const t = String((a == null ? void 0 : a.rollIntent) ?? ((i = a == null ? void 0 : a.roll) == null ? void 0 : i.intent) ?? (e == null ? void 0 : e.intent) ?? "").trim();
  return t ? { intent: t } : null;
}
function Fp(a, { strict: e = !1, index: t = 0 } = {}) {
  const i = String((a == null ? void 0 : a.id) ?? "").trim(), n = Bp.get(i) ?? {}, s = `Row ${t + 1}`, r = [];
  i || r.push(`${s}: id cannot be blank.`);
  const o = String((a == null ? void 0 : a.category) ?? n.category ?? "").trim();
  bl.has(o) || r.push(`${s}: category must be one of ${Array.from(bl).join(", ")}.`);
  const l = String((a == null ? void 0 : a.label) ?? n.label ?? "").trim();
  l || r.push(`${s}: label cannot be blank.`);
  const c = (a == null ? void 0 : a.cost) ?? n.cost ?? 0, u = Number(c);
  (!Number.isFinite(u) || u < 0) && r.push(`${s}: cost must be a non-negative number.`);
  const d = String((a == null ? void 0 : a.handler) ?? n.handler ?? "").trim();
  if (Sl.has(d) || r.push(`${s}: handler must be one of ${Array.from(Sl).map((p) => p || "(blank)").join(", ")}.`), r.length) {
    if (e) {
      const p = new Error(r[0]);
      throw p.validationErrors = r, p;
    }
    return null;
  }
  const m = {
    ...ks(n),
    id: i,
    label: l,
    category: o,
    cost: Math.trunc(u),
    handler: d,
    description: String((a == null ? void 0 : a.description) ?? n.description ?? "").trim(),
    reason: String((a == null ? void 0 : a.reason) ?? n.reason ?? "").trim(),
    prominent: Al(a == null ? void 0 : a.prominent, !!n.prominent),
    prominentWhenBurning: Al(a == null ? void 0 : a.prominentWhenBurning, !!n.prominentWhenBurning)
  };
  m.id === "opportunity" && !m.handler && (m.handler = "combatAttack", m.reason = ""), m.id === "opportunity" && m.handler === "combatAttack" && m.reason === "Opportunity attacks are not yet implemented." && (m.reason = ""), m.id === "assist" && !m.handler && (m.handler = "combatAssist", m.reason = ""), m.id === "assist" && m.handler === "combatAssist" && m.reason === "Reaction assist effects are not yet implemented." && (m.reason = ""), m.id === "interrupt" && !m.handler && (m.handler = "combatInterrupt", m.reason = ""), m.id === "interrupt" && m.handler === "combatInterrupt" && m.reason === "Prepared interrupt resolution is not yet implemented." && (m.reason = "");
  const f = zp(a, n.roll ?? null);
  return f ? m.roll = f : delete m.roll, m.reason || delete m.reason, m.description || delete m.description, m.prominent || delete m.prominent, m.prominentWhenBurning || delete m.prominentWhenBurning, m;
}
function Oo() {
  return ks(Gu);
}
function mn(a, { strict: e = !1 } = {}) {
  if (!Array.isArray(a)) {
    if (e) {
      const s = new Error("Action catalog must be an array.");
      throw s.validationErrors = [s.message], s;
    }
    return Oo();
  }
  const t = [], i = /* @__PURE__ */ new Set(), n = [];
  if (a.forEach((s, r) => {
    try {
      const o = Fp(s, { strict: e, index: r });
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
function qu() {
  var a, e;
  try {
    const t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.get) == null ? void 0 : e.call(a, w, ju);
    return mn(t, { strict: !1 });
  } catch {
    return Oo();
  }
}
function Dn(a) {
  const e = String(a ?? "").trim();
  return qu().find((t) => t.id === e) ?? null;
}
function Up(a) {
  return qu().filter((e) => e.category === a).map((e) => Object.freeze(ks(e)));
}
const Gi = "hazard";
function Hp(a) {
  return a && typeof a == "object" ? a : {};
}
function Ii(a) {
  var n, s, r;
  const e = ((n = a == null ? void 0 : a.getFlag) == null ? void 0 : n.call(a, "mwd", Gi)) ?? ((r = (s = a == null ? void 0 : a.flags) == null ? void 0 : s.mwd) == null ? void 0 : r[Gi]) ?? null;
  if (!e || typeof e != "object") return null;
  const t = pi(e.areaEffect ?? { kind: Tt.persistent, hazard: e.hazardDef }), i = Le(
    e.templateGeometry,
    {
      template: e.template,
      placement: e.templatePlacement
    }
  ) ?? null;
  return {
    ...foundry.utils.deepClone(Hp(e)),
    areaEffect: t,
    hazardDef: go(e.hazardDef ?? t.hazard ?? {}),
    templateGeometry: i
  };
}
function Wp(a) {
  return !!Ii(a);
}
async function Gs(a) {
  var i, n, s;
  const e = ((i = a == null ? void 0 : a.getFlag) == null ? void 0 : i.call(a, "mwd", Gi)) ?? ((s = (n = a == null ? void 0 : a.flags) == null ? void 0 : n.mwd) == null ? void 0 : s[Gi]) ?? null;
  if (!e || typeof e != "object") return null;
  if (e != null && e.templateGeometry) return Ii(a);
  const t = Ii(a);
  return !(t != null && t.templateGeometry) || !(a != null && a.setFlag) ? t : (await a.setFlag("mwd", Gi, {
    ...foundry.utils.deepClone(e),
    templateGeometry: ii(t.templateGeometry)
  }), Ii(a));
}
async function jp({ attacker: a = null, attack: e = {}, targetResult: t = null } = {}) {
  var c, u, d, m, f, p, h, g, y, b, S, T;
  const i = (canvas == null ? void 0 : canvas.scene) ?? null;
  if (!i) return null;
  const n = Le(
    e == null ? void 0 : e.templateGeometry,
    {
      template: e == null ? void 0 : e.template,
      placement: e == null ? void 0 : e.templatePlacement
    }
  ), s = pi((e == null ? void 0 : e.areaEffect) ?? ((c = e == null ? void 0 : e.payload) == null ? void 0 : c.areaEffect) ?? {});
  if (s.kind !== Tt.persistent || !n) return null;
  const r = ps(n);
  if (!r.length) return null;
  const o = {
    sourceActorUuid: (a == null ? void 0 : a.uuid) ?? null,
    sourceItemUuid: ((u = e == null ? void 0 : e.weapon) == null ? void 0 : u.uuid) ?? null,
    payloadId: ((d = e == null ? void 0 : e.payloadState) == null ? void 0 : d.activePayloadId) ?? ((m = e == null ? void 0 : e.payload) == null ? void 0 : m.id) ?? "",
    templateGeometry: ii(n),
    templatePlacement: foundry.utils.deepClone((e == null ? void 0 : e.templatePlacement) ?? null),
    template: foundry.utils.deepClone((e == null ? void 0 : e.template) ?? null),
    damage: Number(((f = t == null ? void 0 : t.damage) == null ? void 0 : f.effectiveWeaponDamage) ?? ((p = e == null ? void 0 : e.weapon) == null ? void 0 : p.damage) ?? 0) || 0,
    ap: Number((e == null ? void 0 : e.totalAp) ?? ((h = e == null ? void 0 : e.weapon) == null ? void 0 : h.ap) ?? 0) || 0,
    damageType: String(((g = t == null ? void 0 : t.damage) == null ? void 0 : g.damageType) ?? ((y = e == null ? void 0 : e.weapon) == null ? void 0 : y.damageType) ?? "concussive").trim() || "concussive",
    label: `${String(((b = e == null ? void 0 : e.weapon) == null ? void 0 : b.name) ?? "Hazard").trim() || "Hazard"} (${Dt(((S = s.hazard) == null ? void 0 : S.startExposure) ?? "minor")})`,
    areaEffect: s,
    hazardDef: s.hazard
  }, [l] = await i.createEmbeddedDocuments("Region", [{
    name: o.label,
    color: ((T = game.user) == null ? void 0 : T.color) ?? "#d86a2c",
    shapes: r,
    flags: {
      mwd: {
        [Gi]: o
      }
    }
  }]);
  return l ?? null;
}
function wl(a = null) {
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
  return Array.from(t.regions ?? []).filter(Wp).filter((c) => {
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
function Kp({ actor: a = null, token: e = null } = {}) {
  var s;
  const t = (e == null ? void 0 : e.document) ?? e ?? null, i = String(((s = t == null ? void 0 : t.texture) == null ? void 0 : s.src) ?? "").trim(), n = String((a == null ? void 0 : a.img) ?? "").trim();
  return i || n || "icons/svg/mystery-man.svg";
}
function Gp(a = []) {
  return Array.isArray(a) ? a.map((e) => ({
    key: String((e == null ? void 0 : e.key) ?? "").trim(),
    label: String((e == null ? void 0 : e.label) ?? (e == null ? void 0 : e.key) ?? "").trim(),
    value: bi(e == null ? void 0 : e.value, 0)
  })).filter((e) => e.key) : [];
}
function _o(a = {}) {
  var c, u, d;
  const e = (a == null ? void 0 : a.preview) ?? {}, t = _e(((c = a == null ? void 0 : a.exposure) == null ? void 0 : c.initialTier) ?? (a == null ? void 0 : a.exposureTier) ?? (a == null ? void 0 : a.tier), "none"), i = _e(
    ((u = a == null ? void 0 : a.exposure) == null ? void 0 : u.finalTier) ?? (e.evadeActive ? e.finalTier : t),
    t
  ), n = Oi({
    tier: t,
    appliedTier: i,
    evadeUsed: !!(e.evadeActive && t !== i),
    evadeLocked: !!((a == null ? void 0 : a.evadeLocked) ?? ((d = a == null ? void 0 : a.exposure) == null ? void 0 : d.evadeLocked))
  }), s = Math.max(0, bi(a == null ? void 0 : a.baseDamage, 0)), r = Math.max(0, bi(a == null ? void 0 : a.damageBefore, qi(s, n.initialTier))), o = Math.max(0, bi(a == null ? void 0 : a.damageAfter, qi(s, n.finalTier))), l = (e == null ? void 0 : e.reactionPreview) ?? {};
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
    damageType: qt(a == null ? void 0 : a.damageType, "concussive"),
    damageTypeLabel: Vt((a == null ? void 0 : a.damageType) ?? "concussive") || "Damage",
    source: String((a == null ? void 0 : a.source) ?? (a == null ? void 0 : a.regionName) ?? "Hazard").trim() || "Hazard",
    applied: !!(a != null && a.applied),
    applyReason: String((a == null ? void 0 : a.applyReason) ?? "").trim(),
    onFullBurnDelta: Math.max(0, bi(a == null ? void 0 : a.onFullBurnDelta, 0)),
    exposure: n,
    damageBefore: r,
    damageAfter: o,
    nextTier: _e(a == null ? void 0 : a.nextTier, n.finalTier),
    nextLabel: Dt((a == null ? void 0 : a.nextTier) ?? n.finalTier),
    preview: {
      evadeActive: !!e.evadeActive,
      edgePoolKey: String(e.edgePoolKey ?? "").trim() || null,
      finalTier: n.finalTier,
      burnDelta: bi(l == null ? void 0 : l.burnDelta, 0),
      canSpendEdge: !!(l != null && l.canSpendEdge),
      edgePools: Gp(l == null ? void 0 : l.edgePools)
    }
  };
}
function qp(a = {}, { actor: e = null, token: t = null } = {}) {
  const i = _o(a), n = i.eventType === "tick" ? "Hazard Tick" : i.eventType === "exit" ? "Hazard Exit" : "Hazard Entry", s = i.exposure.initialLabel === i.exposure.finalLabel ? i.exposure.initialLabel : `${i.exposure.initialLabel} -> ${i.exposure.finalLabel}`, r = i.damageBefore === i.damageAfter ? String(i.damageAfter) : `${i.damageBefore} -> ${i.damageAfter}`;
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
      image: Kp({ actor: e, token: t })
    },
    rows: [
      { label: "Exposure", value: s },
      { label: "Damage", value: r },
      { label: "Next Tier", value: i.nextLabel },
      { label: "Turns Exposed", value: String(i.turnsExposed) }
    ],
    reactionHint: i.exposure.evadeLocked ? "Evade is locked for this hazard." : i.preview.evadeActive ? i.preview.edgePoolKey ? "Evade active. Reaction Burn canceled by Edge." : i.preview.burnDelta > 0 ? `Evade active. This reaction adds +${i.preview.burnDelta} Burn.` : "Evade active." : "",
    actions: i.applied ? [] : Vp(i)
  };
}
function Vp(a = {}) {
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
async function Vu(a = {}, { actor: e = null, token: t = null } = {}) {
  return foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-hazard-card",
    qp(a, { actor: e, token: t })
  );
}
const nt = "mwd", st = "personalCombat", Fi = "preparedInterrupt", Yp = "systems/mwd/img/icons/status/readied_action.svg", Ai = 3, Qp = 1, Jp = 1;
function bn(a, e) {
  return !(a != null && a.activation) || !e ? !1 : a.activation.combatId === e.combatId && Number(a.activation.round ?? -1) === Number(e.round ?? -1) && Number(a.activation.turn ?? -1) === Number(e.turn ?? -1) && a.activation.combatantId === e.combatantId;
}
function Lo(a = null) {
  return {
    saRemaining: Ai,
    faRemaining: Qp,
    raRemaining: Jp,
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
function On(a, e = null) {
  return foundry.utils.mergeObject(
    Lo(e),
    foundry.utils.deepClone(a ?? {}),
    { inplace: !1, overwrite: !0 }
  );
}
function sa(a, e = null) {
  const t = On(a ?? {}, (a == null ? void 0 : a.activation) ?? e);
  return t.actionLog = Ga(t.actionLog), t.hazards = ts(t.hazards), t.pendingReaction = _n(t.pendingReaction), t;
}
function ts(a) {
  return !a || typeof a != "object" ? {} : Object.fromEntries(
    Object.entries(a).map(([e, t]) => {
      const i = String(e ?? "").trim();
      return !i || !t || typeof t != "object" ? null : [i, {
        tier: _e(t.tier, ae.none),
        turnsExposed: Math.max(0, Number(t.turnsExposed ?? 0) || 0),
        evadeLocked: !!t.evadeLocked,
        lastProcessedRound: Number(t.lastProcessedRound ?? 0) || 0
      }];
    }).filter(Boolean)
  );
}
function _n(a) {
  if (!a || typeof a != "object") return null;
  const e = String(a.type ?? "").trim();
  return e ? {
    type: e,
    sourceKind: String(a.sourceKind ?? "").trim() || null,
    sourceId: String(a.sourceId ?? "").trim() || null,
    messageId: String(a.messageId ?? "").trim() || null,
    resultIndex: Number.isInteger(Number(a.resultIndex)) ? Number(a.resultIndex) : null,
    exposureBefore: _e(a.exposureBefore, ae.none),
    exposureAfterPreview: _e(a.exposureAfterPreview, ae.none),
    edgePoolKey: String(a.edgePoolKey ?? "").trim() || null,
    allowCurrentTurn: !!a.allowCurrentTurn
  } : null;
}
function Ga(a) {
  return Array.isArray(a) ? a.map((e) => {
    const t = String((e == null ? void 0 : e.label) ?? "").trim();
    return t ? {
      id: String((e == null ? void 0 : e.id) ?? "").trim(),
      label: t,
      costLabel: String((e == null ? void 0 : e.costLabel) ?? "").trim()
    } : null;
  }).filter(Boolean) : [];
}
function Xp(a = []) {
  return Ga(a).filter((e) => {
    const t = Dn(e == null ? void 0 : e.id);
    return (t == null ? void 0 : t.category) === Re.reaction;
  });
}
function Tl(a = null, e = null) {
  const t = Lo(e);
  return t.reactionBurnSinceLastActivation = Math.max(0, Number((a == null ? void 0 : a.reactionBurnSinceLastActivation) ?? 0) || 0), t.actionLog = Xp(a == null ? void 0 : a.actionLog), t.hazards = ts(a == null ? void 0 : a.hazards), t;
}
function Zp(a, e) {
  return a === "free" ? "Free" : a === "burn" ? `+${e} Burn` : `${e} ${String(a).toUpperCase()}`;
}
function eh(a = {}, e = "", { snapshot: t = null, metadata: i = {} } = {}) {
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
function La(a = {}) {
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
function th(a = null) {
  if (!a) return "";
  const e = [];
  return a.condition && e.push(`Trigger: ${a.condition}`), a.scope && e.push(`Scope: ${a.scope}`), e.join(" | ");
}
function vl() {
  return (CONFIG.statusEffects ?? []).find((a) => String((a == null ? void 0 : a.id) ?? "").trim() === Fi) ?? {
    id: Fi,
    name: "Prepared",
    icon: Yp
  };
}
function ih(a) {
  const e = (CONFIG.statusEffects ?? []).find((i) => String((i == null ? void 0 : i.id) ?? "").trim() === a), t = String((e == null ? void 0 : e.name) ?? (e == null ? void 0 : e.label) ?? a ?? "").trim();
  return Eo(t);
}
function ra(a) {
  const e = Number(a);
  return !Number.isFinite(e) || e === 0 ? "0" : e > 0 ? `+${e}` : String(e);
}
function ah(a) {
  if (typeof a == "number") return Number.isFinite(a) ? a : 0;
  const e = String(a ?? "").trim().match(/[-+]?\d+(\.\d+)?/);
  return e ? Number(e[0]) : 0;
}
function kl(a) {
  var o;
  const e = (a == null ? void 0 : a.document) ?? a ?? null, t = (a == null ? void 0 : a.object) ?? (e == null ? void 0 : e.object) ?? a ?? null, i = String((e == null ? void 0 : e.id) ?? "").trim(), n = x._pendingTokenPositions.get(i) ?? null, s = Number((n == null ? void 0 : n.x) ?? (e == null ? void 0 : e.x)), r = Number((n == null ? void 0 : n.y) ?? (e == null ? void 0 : e.y));
  if (t && Number.isFinite(s) && Number.isFinite(r)) {
    if (typeof t.getCenterPoint == "function")
      return t.getCenterPoint({ x: s, y: r });
    if (typeof t.getCenter == "function")
      return t.getCenter(s, r);
  }
  return (t == null ? void 0 : t.center) ?? ((o = e == null ? void 0 : e.object) == null ? void 0 : o.center) ?? null;
}
function nh(a, e = "") {
  if (!Number.isFinite(a)) return "";
  const t = Math.round(a * 10) / 10, i = Number.isInteger(t) ? String(t) : t.toFixed(1);
  return e ? `${i} ${e}` : i;
}
function Ml(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
function qs(a) {
  return !!Ii(a);
}
function sh(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [];
  if (!e.length) return "";
  const t = e.slice().sort((n, s) => Pi(s == null ? void 0 : s.tier) - Pi(n == null ? void 0 : n.tier))[0] ?? null;
  if (!t) return "";
  const i = `HAZARD ${Dt(t.tier)} (${Math.max(0, Number(t.turnsExposed ?? 0) || 0)})`;
  return t.evadeLocked ? `${i} LOCK` : i;
}
const ha = class ha {
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
      var S, T;
      return ((T = (S = b == null ? void 0 : b.document) == null ? void 0 : S.parent) == null ? void 0 : T.id) === i;
    })) == null ? void 0 : g.document) ?? null;
    if (c) return c;
    const u = Array.from(((y = canvas == null ? void 0 : canvas.scene) == null ? void 0 : y.tokens) ?? []), d = this._collectActorIds(e, r), m = u.filter((b) => this._tokenDocumentMatchesActor(b, e, d));
    return m.find((b) => {
      var S, T, E;
      return ((S = b == null ? void 0 : b.combatant) == null ? void 0 : S.id) === ((E = (T = game.combat) == null ? void 0 : T.combatant) == null ? void 0 : E.id);
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
    const i = canvas == null ? void 0 : canvas.grid, n = kl(e), s = kl(t);
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
    const s = i[0], r = this._measureTokenDistance(e, s), o = String(((d = (u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.grid) == null ? void 0 : d.units) ?? ((f = (m = game.system) == null ? void 0 : m.grid) == null ? void 0 : f.units) ?? "").trim(), l = nh(r, o), c = String((s == null ? void 0 : s.name) ?? ((p = s == null ? void 0 : s.actor) == null ? void 0 : p.name) ?? "Target").trim() || "Target";
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
      const s = ah((n == null ? void 0 : n.numericValue) ?? (n == null ? void 0 : n.value) ?? 0);
      return {
        label: String((n == null ? void 0 : n.label) ?? "").trim() || "Modifier",
        numericValue: s,
        value: String((n == null ? void 0 : n.value) ?? ra(s)).trim() || ra(s)
      };
    }), i = t.reduce((n, s) => n + s.numericValue, 0);
    return {
      total: i,
      totalLabel: ra(i),
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
      const g = this._collectActorIds(e, l), y = String((l == null ? void 0 : l.id) ?? "").trim(), b = d.filter((E) => {
        const P = this._getCombatantTokenId(E), C = this._getCombatantTokenDocument(E, i), H = P || String((C == null ? void 0 : C.id) ?? "").trim();
        return o && y ? H === y : g.has(this._getCombatantActorId(E)) ? !0 : this._tokenDocumentMatchesActor(C, e, g);
      }), S = b.find((E) => {
        var P;
        return E.id === ((P = n == null ? void 0 : n.combatant) == null ? void 0 : P.id);
      }) ?? null;
      u = b.find(
        (E) => {
          var P;
          return y && (this._getCombatantTokenId(E) || String(((P = this._getCombatantTokenDocument(E, i)) == null ? void 0 : P.id) ?? "").trim()) === y;
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
    var C, H, Y, Q, K;
    const {
      combat: i,
      combatant: n,
      token: s,
      tokenDocument: r
    } = this.getCombat(e, t), o = !!n && ((C = i == null ? void 0 : i.combatant) == null ? void 0 : C.id) === n.id, l = n ? this.getActivationIdentity(i, n) : null, c = n ? n.getFlag(nt, st) : null, u = n ? o ? bn(c, l) ? sa(c, l) : Tl(c, l) : sa(c, l) : Lo(l);
    u.actionLog = Ga(u.actionLog);
    const d = Math.max(0, Number(((Y = (H = e == null ? void 0 : e.system) == null ? void 0 : H.burn) == null ? void 0 : Y.value) ?? 0)), m = Math.floor(d / 2), f = !!((K = (Q = e == null ? void 0 : e.system) == null ? void 0 : Q.burn) != null && K.overloaded), p = La(u), h = this.getActiveStatuses(e), g = h.filter(
      (G) => !(f && G.id === "overloaded") && G.id !== Fi
    ), y = this.getModifierSummary(e, m), b = this.getRollImpact(y), S = Math.max(0, Number(u.burnThisActivation ?? 0)), T = n ? o ? "" : "Waiting for this combatant's activation." : "No combatant on the current scene.", E = [];
    f && E.push({ id: "overloaded", label: "Overloaded" }), p && E.push({
      id: "preparedInterrupt",
      label: "Prepared",
      hint: th(p)
    });
    const P = Object.entries(u.hazards ?? {});
    if (P.length) {
      const G = P.map(([, L]) => L).sort((L, z) => Pi(z == null ? void 0 : z.tier) - Pi(L == null ? void 0 : L.tier))[0] ?? null;
      G && E.push({
        id: "hazard",
        label: `Hazard ${Dt(G.tier)}`,
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
      states: E,
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
      inactiveReason: T,
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
    actionCategory: s = Re.reaction,
    logLabel: r = "",
    edgePoolKey: o = "",
    allowCurrentTurn: l = !1
  } = {}) {
    var h, g, y, b, S;
    const c = this.getReactionSpendPreview(e, { token: t, edgePoolKey: o }), u = c.snapshot;
    if (!u.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!l && u.isCurrentTurn) return { ok: !1, reason: "Only outside your activation." };
    const d = sa(u.combatant.getFlag(nt, st), (h = u.state) == null ? void 0 : h.activation), m = {
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
      const T = c.edgePoolKey ? 0 : 2, E = Rt({
        actor: e,
        phase: "onBeforeBurnApplied",
        facts: In({
          actor: e,
          packet: {
            actionId: i,
            category: s,
            resource: "reaction",
            amount: T,
            source: "reaction"
          },
          runtime: m
        }),
        packet: {
          actionId: i,
          category: s,
          resource: "reaction",
          amount: T,
          source: "reaction"
        },
        options: { runtime: m, consumeUsage: !0 }
      });
      m.pendingMutations = (m.pendingMutations ?? []).concat(E.mutations), f = Math.max(0, Number(E.packet.amount ?? T) || 0), c.edgePoolKey ? (await e.spendEdge(c.edgePoolKey, 1, { source: "reactionBurnCancel" }), p = c.edgePoolKey) : f > 0 && (d.reactionBurnSinceLastActivation = Math.max(
        0,
        Number(d.reactionBurnSinceLastActivation ?? 0) + f
      ));
    }
    return this._appendActionLog(d, {
      id: i,
      label: r || n,
      costLabel: c.costLabel
    }), (y = m.pendingMutations) != null && y.length ? await fi({ actor: e, mutations: m.pendingMutations, runtime: m }) : await u.combatant.setFlag(nt, st, d), f > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((S = (b = e.system) == null ? void 0 : b.burn) == null ? void 0 : S.value) ?? 0) + f) }), {
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
    const s = sa(n.combatant.getFlag(nt, st), (o = n.state) == null ? void 0 : o.activation), r = typeof i == "function" ? i(s, n) ?? s : s;
    return await n.combatant.setFlag(nt, st, r), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) };
  }
  static async setPendingReaction(e, { token: t = null, pendingReaction: i = null } = {}) {
    return this.updateCombatantState(e, {
      token: t,
      mutate: (n) => (n.pendingReaction = _n(i), n)
    });
  }
  static async clearPendingReaction(e, { token: t = null } = {}) {
    return this.setPendingReaction(e, { token: t, pendingReaction: null });
  }
  static async setHazardState(e, { token: t = null, regionId: i = "", hazardState: n = null } = {}) {
    const s = String(i ?? "").trim();
    return s ? this.updateCombatantState(e, {
      token: t,
      mutate: (r) => (r.hazards ?? (r.hazards = {}), n ? r.hazards[s] = ts({ [s]: n })[s] : delete r.hazards[s], r)
    }) : { ok: !1, reason: "Hazard region id is required." };
  }
  static getModifierSummary(e, t = Math.floor(Number(((n) => (n = ((i) => (i = e == null ? void 0 : e.system) == null ? void 0 : i.burn)()) == null ? void 0 : n.value)() ?? 0) / 2)) {
    var c, u;
    const s = ((u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.derived) == null ? void 0 : u.condition) ?? {}, r = [];
    t > 0 && r.push({
      label: "Burn Penalty",
      numericValue: -t,
      value: ra(-t)
    });
    const o = Number(s.fatiguePenalty ?? 0);
    o && r.push({
      label: "Fatigue",
      numericValue: o,
      value: ra(o)
    });
    const l = Number(s.physicalPenalty ?? 0);
    return l && r.push({
      label: "Physical",
      numericValue: l,
      value: ra(l)
    }), r.length || r.push({
      label: "Current Modifiers",
      numericValue: 0,
      value: "0"
    }), r;
  }
  static getActiveStatuses(e) {
    return Array.from((e == null ? void 0 : e.statuses) ?? []).map((i) => ({
      id: i,
      label: ih(i)
    })).sort((i, n) => i.label.localeCompare(n.label));
  }
  static buildActionModel(e, t) {
    var o, l, c, u;
    const i = (d) => {
      const m = Po(d), f = pp(d);
      return !f || !m ? null : {
        id: d,
        label: m.label,
        handler: "roll",
        roll: JSON.stringify(f),
        disabled: !1,
        reason: ""
      };
    }, n = (d) => {
      const m = Up(d).filter((f) => f.id !== "overloadCheck").filter((f) => !(d === Re.recovery && f.id === "reduceBurn"));
      if (d === Re.standard) {
        const f = Dn("reduceBurn");
        f && !m.some((p) => p.id === "reduceBurn") && m.push(f);
      }
      return m.map((f) => this._buildCatalogAction(e, t, f));
    }, s = (d) => {
      const m = Dn(d);
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
        { label: "SA", value: `${t.state.saRemaining}/${Ai}` },
        { label: "Cap", value: `${Math.max(0, Number(((l = t.state) == null ? void 0 : l.saSpentThisActivation) ?? 0))}/${Nr(e)}` },
        { label: "FA", value: `${t.state.faRemaining}` },
        { label: "RA", value: `${t.state.raRemaining}` },
        {
          label: "Burn/Turn",
          value: `+${Math.max(0, Number(((c = t.state) == null ? void 0 : c.burnThisActivation) ?? 0))}`,
          action: r
        }
      ],
      activationLog: Ga((u = t.state) == null ? void 0 : u.actionLog).map((d, m) => ({
        ...d,
        index: m + 1
      })),
      menus: [
        {
          id: "standard",
          label: "Standard Actions",
          actions: n(Re.standard)
        },
        {
          id: "complex",
          label: "Complex Actions",
          actions: n(Re.complex)
        },
        {
          id: "free",
          label: "Free Actions",
          actions: n(Re.free)
        },
        {
          id: "reaction",
          label: "Reactions",
          actions: n(Re.reaction)
        },
        {
          id: "burn",
          label: "Burn & Recovery",
          actions: n(Re.recovery)
        }
      ].filter((d) => d.actions.length)
    };
  }
  static _buildCatalogAction(e, t, i) {
    const n = t.hasCombatant ? "" : "No current-scene combatant.", s = t.isCurrentTurn ? "" : "Only during your activation.", r = t.overloaded ? "Overloaded actors can only recover Burn." : "", o = Sn(e, t), l = t.state ?? {}, c = i.category;
    let u = "sa", d = Number(i.cost ?? 0) || 0, m = Zp(u, d), f = "";
    if (i.id === "reduceBurn")
      u = "sa", d = 1, m = "1 SA", f = n || s || (o <= 0 ? "Activation SA cap reached." : "") || (t.burn.value <= 0 ? "Burn is already at 0." : "");
    else if (i.id === "overloadCheck")
      u = "check", d = 0, m = "Check", f = n || s || (t.burn.canOverloadCheck ? "" : t.overloaded ? "Already Overloaded." : "Burn below 6.");
    else if (i.id === "interrupt") {
      const p = La(l);
      u = Number(l.raRemaining ?? 0) > 0 ? "ra" : "burn", d = u === "ra" ? 1 : 2, m = u === "ra" ? "1 RA" : "+2 Burn", f = n || (t.isCurrentTurn ? "Only outside your activation." : "") || (p ? "" : "Prepare an interrupt first.");
    } else if (i.id === "evade") {
      const p = _n(l.pendingReaction), h = t.isCurrentTurn && !(p != null && p.allowCurrentTurn) ? "Only outside your activation." : "";
      u = Number(l.raRemaining ?? 0) > 0 ? "ra" : "burn", d = u === "ra" ? 1 : 2, m = u === "ra" ? "1 RA" : "+2 Burn", f = n || h || (p ? "" : "Use an area effect or hazard card to trigger Evade.");
    } else if (c === Re.standard)
      f = n || s || r || (o < d ? "Activation SA cap reached." : "");
    else if (c === Re.complex)
      f = n || s || r || (o < d ? "Activation SA cap reached." : "");
    else if (c === Re.free) {
      const p = Number(l.faRemaining ?? 0) > 0;
      u = p ? "fa" : "sa", d = 1, m = p ? "Free" : "1 SA", f = n || s || !p && r || (!p && o < 1 ? "Activation SA cap reached." : "");
    } else if (c === Re.reaction) {
      const p = Number(l.raRemaining ?? 0) > 0;
      u = p ? "ra" : "burn", d = p ? 1 : 2, m = p ? "1 RA" : "+2 Burn", f = n || (t.isCurrentTurn ? "Only outside your activation." : "");
    } else c === Re.recovery && (f = n || s);
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
    const s = Dn(i);
    return s ? s.handler ? s.category === Re.standard ? this._executeStandardAction(e, { token: t, action: s, metadata: n }) : s.category === Re.free ? this._executeFreeAction(e, { token: t, action: s, metadata: n }) : s.category === Re.reaction ? this._executeReactionAction(e, { token: t, action: s, metadata: n }) : { ok: !1, reason: s.reason || "That action is not implemented yet." } : { ok: !1, reason: s.reason || "That action is not implemented yet." } : { ok: !1, reason: "Unknown combat action." };
  }
  static async _executeStandardAction(e, { token: t = null, action: i, metadata: n = {} } = {}) {
    const s = this.getSnapshot(e, { token: t });
    if (!s.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!s.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (s.overloaded) return { ok: !1, reason: "Overloaded actors can only recover Burn." };
    if (Sn(e, s) < Number(i.cost ?? 1))
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
    if (!r && Sn(e, s) < 1)
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
    const r = _n((d = s.state) == null ? void 0 : d.pendingReaction), o = i.id === "evade" && (r == null ? void 0 : r.allowCurrentTurn);
    if (s.isCurrentTurn && !o) return { ok: !1, reason: "Only outside your activation." };
    if (i.id === "interrupt" && !La(s.state))
      return { ok: !1, reason: "Prepare an interrupt first." };
    const l = i.id === "assist" && (n != null && n.targetName) ? `${i.label}: ${n.targetName}` : i.id === "interrupt" && (n != null && n.scope) ? `${i.label}: ${String(n.scope).trim()}` : i.label;
    let c = String((n == null ? void 0 : n.edgePoolKey) ?? "").trim();
    !c && Number(((m = s.state) == null ? void 0 : m.raRemaining) ?? 0) <= 0 && (c = await ha._promptSpendEdgeForReaction(e) ?? "");
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
    const o = eh(r.state, i, {
      snapshot: r,
      metadata: n
    });
    return await r.combatant.setFlag(nt, st, o), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) };
  }
  static async clearAim(e, { token: t = null } = {}) {
    var s;
    const i = this.getSnapshot(e, { token: t });
    if (!(i != null && i.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const n = sa(i.combatant.getFlag(nt, st), (s = i.state) == null ? void 0 : s.activation);
    return n.actionState ?? (n.actionState = {}), n.actionState.aim ? (n.actionState.aim = null, await i.combatant.setFlag(nt, st, n), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : { ok: !0, snapshot: i };
  }
  static getPreparedInterrupt(e = null) {
    const t = (e == null ? void 0 : e.state) ?? e ?? {};
    return La(t);
  }
  static async clearPreparedInterrupt(e, { token: t = null } = {}) {
    var s;
    const i = this.getSnapshot(e, { token: t });
    if (!(i != null && i.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const n = sa(i.combatant.getFlag(nt, st), (s = i.state) == null ? void 0 : s.activation);
    return n.actionState ?? (n.actionState = {}), n.actionState.preparedInterrupt ? (n.actionState.preparedInterrupt = null, await i.combatant.setFlag(nt, st, n), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : { ok: !0, snapshot: i };
  }
  static async _syncPreparedIndicatorForCombatant(e) {
    var u, d, m;
    if (!game.user.isGM || !e) return;
    const t = this._getCombatantSceneId(e) || ((u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.id), i = this._getCombatantTokenDocument(e, t), n = (i == null ? void 0 : i.actor) ?? (e == null ? void 0 : e.actor) ?? null;
    if (!i || !n) return;
    const s = e.getFlag(nt, st), r = !!La(s), o = vl(), l = String((o == null ? void 0 : o.id) ?? Fi).trim() || Fi;
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
    const s = vl(), r = String((s == null ? void 0 : s.id) ?? Fi).trim() || Fi;
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
    const r = Ga(e == null ? void 0 : e.actionLog);
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
    const i = this.getActivationIdentity(e, t), n = t.getFlag(nt, st);
    bn(n, i) || await t.setFlag(nt, st, Tl(n, i));
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
    var S, T, E, P, C, H, Y;
    const c = this.getSnapshot(e, { token: t });
    if (!c.hasCombatant)
      return { ok: !1, reason: "No combatant on the current scene." };
    if (!c.isCurrentTurn)
      return { ok: !1, reason: "Only available during your activation." };
    const u = {
      combat: c.combat,
      combatant: c.combatant,
      state: On(c.state, this.getActivationIdentity(c.combat, c.combatant)),
      sceneId: ((S = canvas == null ? void 0 : canvas.scene) == null ? void 0 : S.id) ?? "",
      snapshot: c
    };
    let d = Math.max(0, Number(n ?? 0) || 0);
    const m = Rt({
      actor: e,
      phase: "onBeforeActionCostFinalized",
      facts: Fu({
        actor: e,
        packet: { actionId: s, category: l, resource: i, cost: d, effectiveCost: d },
        runtime: u
      }),
      packet: { actionId: s, category: l, resource: i, cost: d, effectiveCost: d },
      options: { runtime: u, consumeUsage: !0 }
    });
    d = Math.max(0, Number(m.packet.cost ?? d) || 0), u.pendingMutations = (u.pendingMutations ?? []).concat(m.mutations);
    const f = `${i}Remaining`, p = Number(((T = c.state) == null ? void 0 : T[f]) ?? 0);
    if (i !== "sa" && p < d)
      return { ok: !1, reason: `No ${String(i).toUpperCase()} remaining.` };
    const h = u.state, g = i === "sa" ? Nr(e) : 0, y = Math.max(0, Number(((E = c.state) == null ? void 0 : E.saSpentThisActivation) ?? 0) || 0);
    if (i === "sa" && y + d > g)
      return { ok: !1, reason: "Activation SA cap reached." };
    h[f] = Math.max(0, p - d), i === "sa" && (h.saSpentThisActivation = y + d, s === "attack" && (h.attacksThisActivation = Number(h.attacksThisActivation ?? 0) + 1)), this._appendActionLog(h, {
      id: s,
      label: r,
      costLabel: o || this._formatCostLabel(i, d)
    });
    let b = 0;
    if (i === "sa") {
      const Q = Math.max(0, y - Ai), K = Math.max(0, h.saSpentThisActivation - Ai), G = Math.max(0, Number(((P = c.state) == null ? void 0 : P.attacksThisActivation) ?? 0) || 0), L = Math.max(0, Number(h.attacksThisActivation ?? 0) || 0);
      for (let z = Q + 1; z <= K; z += 1) {
        const q = Rt({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: In({
            actor: e,
            packet: {
              actionId: s,
              category: l,
              resource: i,
              amount: 1,
              source: "extraSA",
              extraSaIndex: z
            },
            runtime: u
          }),
          packet: {
            actionId: s,
            category: l,
            resource: i,
            amount: 1,
            source: "extraSA",
            extraSaIndex: z
          },
          options: { runtime: u, consumeUsage: !0 }
        });
        u.pendingMutations = (u.pendingMutations ?? []).concat(q.mutations), b += Math.max(0, Number(q.packet.amount ?? 0) || 0);
      }
      for (let z = G + 1; z <= L; z += 1) {
        if (z <= 1) continue;
        const q = Rt({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: In({
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
            attackIndex: z
          },
          options: { runtime: u, consumeUsage: !0 }
        });
        u.pendingMutations = (u.pendingMutations ?? []).concat(q.mutations), b += Math.max(0, Number(q.packet.amount ?? 0) || 0);
      }
      h.burnThisActivation = Math.max(0, Number(h.burnThisActivation ?? 0) + b);
    }
    return (C = u.pendingMutations) != null && C.length ? await fi({
      actor: e,
      mutations: u.pendingMutations,
      runtime: {
        ...u,
        state: h
      }
    }) : await c.combatant.setFlag(nt, st, h), b > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((Y = (H = e.system) == null ? void 0 : H.burn) == null ? void 0 : Y.value) ?? 0) + b) }), { ok: !0, snapshot: this.getSnapshot(e, { token: c.token }) };
  }
  static async reduceBurn(e, { token: t = null } = {}) {
    var o, l, c, u;
    const i = this.getSnapshot(e, { token: t });
    if (!i.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!i.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (Sn(e, i) <= 0) return { ok: !1, reason: "Activation SA cap reached." };
    if (i.burn.value <= 0) return { ok: !1, reason: "Burn is already at 0." };
    const n = await this.spendResource(e, {
      token: i.token,
      resource: "sa",
      cost: 1,
      actionId: "reduceBurn",
      actionLabel: "Reduce Burn",
      actionCostLabel: "1 SA",
      actionCategory: Re.standard
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
    const s = i.getFlag(nt, st), r = bn(s, this.getActivationIdentity(e, i)) ? On(s, this.getActivationIdentity(e, i)) : On(s), l = {
      burnDelta: Number(r.saSpentThisActivation ?? 0) <= Ai && Number(r.burnThisActivation ?? 0) <= 0 && Number(r.reactionBurnSinceLastActivation ?? 0) <= 0 ? -2 : 0,
      edgeAdjustments: []
    }, c = {
      combat: e,
      combatant: i,
      state: r,
      sceneId: ((p = e.scene) == null ? void 0 : p.id) ?? ((h = canvas == null ? void 0 : canvas.scene) == null ? void 0 : h.id) ?? ""
    }, u = Rt({
      actor: n,
      phase: "onEndOfActivation",
      facts: Wu({ actor: n, packet: l, runtime: c }),
      packet: l,
      options: { runtime: c, consumeUsage: !0 }
    });
    await fi({ actor: n, mutations: u.mutations, runtime: c });
    const d = Number(u.packet.burnDelta ?? l.burnDelta) || 0;
    if (d) {
      const T = Math.max(0, Number(((y = (g = n.system) == null ? void 0 : g.burn) == null ? void 0 : y.value) ?? 0) + d), E = { "system.burn.value": T };
      T === 0 && ((S = (b = n.system) == null ? void 0 : b.burn) != null && S.overloaded) && (E["system.burn.overloaded"] = !1), await n.update(E);
    }
    for (const T of u.packet.edgeAdjustments ?? []) {
      const E = Number((T == null ? void 0 : T.amount) ?? 0) || 0;
      !E || !(T != null && T.poolKey) || (E > 0 ? await n.gainEdge(T.poolKey, E, { skipTraitHooks: !0, source: "endOfActivationTrait" }) : await n.spendEdge(T.poolKey, Math.abs(E), { skipTraitHooks: !0, source: "endOfActivationTrait" }));
    }
  }
  static async _onUpdateCombat(e, t) {
    if (Object.prototype.hasOwnProperty.call(t ?? {}, "turn") || Object.prototype.hasOwnProperty.call(t ?? {}, "round")) {
      const n = this._lastActivationByCombat.get(e == null ? void 0 : e.id) ?? null, s = typeof n == "string" ? n : (n == null ? void 0 : n.combatantId) ?? null, r = this.getActivationIdentity(e, e == null ? void 0 : e.combatant), o = n && typeof n == "object" ? !bn(n, r) : s && s !== r.combatantId;
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
    if (foundry.utils.hasProperty(t, `flags.${nt}.${st}`)) {
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
    qs(e) && (await Gs(e), await this._syncAllSceneHazards((e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null));
  }
  static async _onUpdateRegion(e) {
    qs(e) && (await Gs(e), await this._syncAllSceneHazards((e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null));
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
        qs(t) && await Gs(t);
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
    ts(n.hazards);
    const s = wl(t), r = new Map(
      s.map((h) => {
        const g = Ii(h);
        return g ? [String(h.id ?? "").trim(), { region: h, flag: g }] : null;
      }).filter(Boolean)
    ), o = [], l = [];
    await this.updateCombatantState(i, {
      token: t,
      mutate: (h) => {
        var g, y, b, S, T;
        h.hazards ?? (h.hazards = {});
        for (const [E, { flag: P }] of r.entries()) {
          if (h.hazards[E]) continue;
          const C = {
            tier: _e((g = P == null ? void 0 : P.hazardDef) == null ? void 0 : g.startExposure, ae.minor),
            turnsExposed: 0,
            evadeLocked: !1,
            lastProcessedRound: 0
          };
          h.hazards[E] = C, o.push({ regionId: E, flag: P, hazardState: C });
        }
        for (const [E, P] of Object.entries(h.hazards ?? {})) {
          if (r.has(E)) continue;
          const C = Ii((S = (b = (y = canvas == null ? void 0 : canvas.scene) == null ? void 0 : y.regions) == null ? void 0 : b.get) == null ? void 0 : S.call(b, E)) ?? null;
          ((T = C == null ? void 0 : C.hazardDef) == null ? void 0 : T.clearOnExit) !== !1 && (delete h.hazards[E], l.push({ regionId: E, hazardState: P, flag: C }));
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
      await ChatMessage.create(Ml({
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
      wl(i).map((d) => {
        const m = Ii(d);
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
    if (!(s > 0 && (i + 1) % n === 0)) return _e(e == null ? void 0 : e.tier, ae.none);
    let o = _e(e == null ? void 0 : e.tier, ae.none);
    for (let m = 0; m < s; m += 1)
      if (o = jm(o, 1), Pi(o) >= Pi(((u = t == null ? void 0 : t.escalation) == null ? void 0 : u.max) ?? ae.full)) {
        o = _e((d = t == null ? void 0 : t.escalation) == null ? void 0 : d.max, ae.full);
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
    const c = _e(s == null ? void 0 : s.tier, ae.none), u = _e(o, c), d = l && c !== ae.none && !(s != null && s.evadeLocked) ? this.getReactionSpendPreview(e, { token: t }) : null, m = {
      kind: "hazard",
      eventType: r,
      regionId: String((i == null ? void 0 : i.id) ?? "").trim(),
      regionName: String((n == null ? void 0 : n.label) ?? (i == null ? void 0 : i.name) ?? "Hazard").trim() || "Hazard",
      actorUuid: e.uuid,
      tokenUuid: (t == null ? void 0 : t.uuid) ?? ((h = t == null ? void 0 : t.document) == null ? void 0 : h.uuid) ?? null,
      actorName: e.name ?? "Target",
      turnsExposed: Math.max(0, Number((s == null ? void 0 : s.turnsExposed) ?? 0) || 0),
      baseDamage: Math.max(0, Number((n == null ? void 0 : n.damage) ?? 0) || 0),
      damageBefore: qi(Number((n == null ? void 0 : n.damage) ?? 0) || 0, c),
      damageAfter: qi(
        Number((n == null ? void 0 : n.damage) ?? 0) || 0,
        l && !(s != null && s.evadeLocked) ? hr(c, 1) : c
      ),
      damageType: String((n == null ? void 0 : n.damageType) ?? "concussive").trim() || "concussive",
      ap: Math.max(0, Number((n == null ? void 0 : n.ap) ?? 0) || 0),
      onFullBurnDelta: Math.max(0, Number(((y = (g = n == null ? void 0 : n.hazardDef) == null ? void 0 : g.onFull) == null ? void 0 : y.burnDelta) ?? 0) || 0),
      source: String((n == null ? void 0 : n.label) ?? (i == null ? void 0 : i.name) ?? "Hazard").trim() || "Hazard",
      nextTier: u,
      exposure: {
        initialTier: c,
        finalTier: c,
        initialLabel: Dt(c),
        finalLabel: Dt(c),
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
    }, f = await Vu(m, { actor: e, token: t }), p = await ChatMessage.create(Ml({
      speaker: ChatMessage.getSpeaker({ actor: e, token: t }),
      content: f,
      flags: {
        mwd: {
          hazardCard: m
        }
      }
    }));
    return p && d && c !== ae.none && !(s != null && s.evadeLocked) && await this.setPendingReaction(e, {
      token: t,
      pendingReaction: {
        type: "evade",
        sourceKind: "hazard",
        sourceId: String((i == null ? void 0 : i.id) ?? "").trim() || null,
        messageId: p.id,
        exposureBefore: c,
        exposureAfterPreview: hr(c, 1),
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
    const n = (i == null ? void 0 : i.actor) ?? null, s = n ? this.getSnapshot(n, { token: i }) : null, r = Object.values((s == null ? void 0 : s.hazards) ?? {}), o = sh(r);
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
D(ha, "_targetRefreshTimeout", null), D(ha, "_pendingTokenPositions", /* @__PURE__ */ new Map()), D(ha, "_lastActivationByCombat", /* @__PURE__ */ new Map());
let x = ha;
function Nr(a) {
  var i, n, s, r, o, l;
  const e = Math.max(0, Number(((s = (n = (i = a == null ? void 0 : a.system) == null ? void 0 : i.attributes) == null ? void 0 : n.reflexes) == null ? void 0 : s.value) ?? 0) || 0), t = Math.max(0, Number(((l = (o = (r = a == null ? void 0 : a.system) == null ? void 0 : r.attributes) == null ? void 0 : o.willpower) == null ? void 0 : l.value) ?? 0) || 0);
  return Ai + Math.floor((e + t) / 2);
}
function Sn(a, e) {
  var t;
  return Math.max(0, Nr(a) - Math.max(0, Number(((t = e == null ? void 0 : e.state) == null ? void 0 : t.saSpentThisActivation) ?? 0) || 0));
}
const Rr = Object.freeze([
  Object.freeze({ key: "close", label: "Close", min: 0, max: 5, baseDn: 2 }),
  Object.freeze({ key: "near", label: "Near", min: 6, max: 26, baseDn: 3 }),
  Object.freeze({ key: "far", label: "Far", min: 27, max: 62, baseDn: 4 }),
  Object.freeze({ key: "extreme", label: "Extreme", min: 63, max: 120, baseDn: 5 })
]), rh = new Map(Rr.map((a) => [a.key, a]));
function An(a, e) {
  const t = Number(a);
  return !Number.isFinite(t) || t <= 0 ? e : Math.max(0, Math.trunc(t));
}
function Ms(a = "") {
  return rh.get(String(a ?? "").trim().toLowerCase()) ?? null;
}
function is(a = "") {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return "Out of Range";
  const e = Ms(a);
  return e ? `${e.label} ${e.min}-${e.max} m` : String(a ?? "").trim() || "Range";
}
function Es(a = "") {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return "Out of Range";
  const e = Ms(a);
  return e ? e.label : String(a ?? "").trim() || "Range";
}
function oh(a = "", e = 1) {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return 6;
  const t = Ms(a);
  return Number.isFinite(Number(t == null ? void 0 : t.baseDn)) ? Number(t.baseDn) : e;
}
function xo(a = {}) {
  return {
    max: String((a == null ? void 0 : a.max) ?? "").trim().toLowerCase() || "extreme",
    close: An((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short), 5),
    near: An((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium), 26),
    far: An((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long), 62),
    extreme: An(a == null ? void 0 : a.extreme, 120)
  };
}
function lh(a, e = {}, t = "close") {
  var u;
  const i = Number(a);
  if (!Number.isFinite(i) || i < 0)
    return String(t ?? "close").trim().toLowerCase() || "close";
  const n = xo(e), s = ((u = Ms(n.max)) == null ? void 0 : u.key) ?? "extreme", r = Rr.findIndex((d) => d.key === s), o = Number((n == null ? void 0 : n[s]) ?? NaN);
  if (Number.isFinite(o) && i > o)
    return "outOfRange";
  let l = "extreme";
  i <= n.close ? l = "close" : i <= n.near ? l = "near" : i <= n.far && (l = "far");
  const c = Rr.findIndex((d) => d.key === l);
  return r >= 0 && c > r ? s : l;
}
const Sa = "lifeModuleCatalog", Cs = Object.freeze([
  { moduleType: "faction", label: "Faction" },
  { moduleType: "childhood", label: "Childhood" },
  { moduleType: "higherEducation", label: "Higher Education" },
  { moduleType: "realLife", label: "Real Life" }
]), ch = Object.freeze(
  Object.fromEntries(Cs.map((a) => [a.moduleType, a.label]))
), uh = new Set(Cs.map((a) => a.moduleType)), dh = /* @__PURE__ */ new Set(["skill", "edgePool"]), $o = Object.freeze({
  grit: "Grit",
  chaos: "Chaos",
  insight: "Insight",
  rumor: "Rumor",
  legend: "Legend",
  credibility: "Credibility"
}), Yu = Object.freeze(Object.keys($o)), mh = Object.freeze({
  skill: "Skill",
  edgePool: "Edge Pool"
}), fh = Object.freeze(Sh()), ph = Object.freeze(Ah()), hh = /* @__PURE__ */ new Set(["artillery", "gunnery", "piloting", "heavyWeapons"]), gh = /* @__PURE__ */ new Set([
  "artillery",
  "gunnery",
  "heavyWeapons",
  "meleeCombat",
  "piloting",
  "projectileWeapons",
  "firearms"
]), yh = Object.freeze(
  si.map((a) => a.code).filter((a) => !gh.has(a))
), bh = Object.freeze(ia([
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
        ...yh.map((a) => ({ type: "skill", value: a })),
        ...Yu.map((a) => ({ type: "edgePool", value: a }))
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
    skillChoices: si.map((a) => a.code).filter((a) => !hh.has(a)),
    excludesAny: [
      "higher-education-military-enlistment",
      "higher-education-military-academy",
      "higher-education-family-training",
      "higher-education-officer-candidate-school"
    ]
  }
], { strict: !1 }));
function Sh() {
  const a = /* @__PURE__ */ new Map();
  for (const e of si) {
    const t = String(e.code ?? "").trim(), i = String(e.label ?? "").trim();
    t && (a.set(t.toLowerCase(), t), i && a.set(i.toLowerCase(), t));
  }
  return a;
}
function Ah() {
  const a = /* @__PURE__ */ new Map();
  for (const [e, t] of Object.entries($o))
    a.set(e.toLowerCase(), e), a.set(t.toLowerCase(), e), a.set(`${t.toLowerCase()} pool`, e);
  return a;
}
function wh(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid life module data.");
  return t.validationErrors = e, t;
}
function Qu(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
function fn(a) {
  return String(a ?? "").trim().toLowerCase().replace(/['\u2019]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function Ps(a) {
  const e = String(a ?? "").trim();
  return uh.has(e) ? e : "";
}
function Ns(a) {
  const e = String(a ?? "").trim();
  return e ? fh.get(e.toLowerCase()) ?? "" : "";
}
function Th(a) {
  const e = String(a ?? "").trim();
  return e ? ph.get(e.toLowerCase()) ?? "" : "";
}
function vh(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const r of Qu(a)) {
    const o = Ns(r);
    if (!o) {
      e && t.push(`${i}: unknown skill "${r}".`);
      continue;
    }
    n.has(o) || (n.add(o), s.push(o));
  }
  return s;
}
function El(a) {
  const e = /* @__PURE__ */ new Set();
  return Qu(a).map(fn).filter((t) => !t || e.has(t) ? !1 : (e.add(t), !0));
}
function Cl(a = [], e = /* @__PURE__ */ new Map()) {
  return a.map((t) => {
    var i;
    return ((i = e.get(t)) == null ? void 0 : i.label) ?? t;
  });
}
function Ma(a = {}) {
  return `${a.type}:${a.value}`;
}
function kh(a) {
  var e;
  return ((e = Ot(a)) == null ? void 0 : e.label) ?? a;
}
function Ju(a) {
  return $o[a] ?? a;
}
function Mh(a) {
  return mh[a] ?? a;
}
function Eh(a = {}, { includeTypePrefix: e = !1 } = {}) {
  const t = String((a == null ? void 0 : a.type) ?? "").trim(), i = String((a == null ? void 0 : a.value) ?? "").trim();
  if (!t || !i) return "";
  const n = t === "skill" ? kh(i) : `${Ju(i)} Pool`;
  return e ? `${Mh(t)}: ${n}` : n;
}
function Xa(a = {}, { includeBonusText: e = !1, includeTypePrefix: t = !1 } = {}) {
  const i = Eh(a, { includeTypePrefix: t });
  return i ? e ? a.type === "skill" ? `+1 ${i} rolls` : `+1 ${i}` : i : "";
}
function Ch(a) {
  const e = String(a ?? "").trim(), t = e.indexOf(":");
  return t < 0 ? null : {
    type: e.slice(0, t).trim(),
    value: e.slice(t + 1).trim()
  };
}
function Ph(a, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: n = "Bonus" } = {}) {
  const s = typeof a == "string" ? Ch(a) : a, r = String((s == null ? void 0 : s.type) ?? "").trim(), o = String((s == null ? void 0 : s.value) ?? "").trim();
  if (!dh.has(r))
    return e && t.push(`${i} ${n}: unknown bonus type "${r || a}".`), null;
  const l = r === "skill" ? Ns(o) : Th(o);
  return l ? {
    type: r,
    value: l
  } : (e && t.push(`${i} ${n}: unknown ${r === "skill" ? "skill" : "edge pool"} "${o}".`), null);
}
function Ir(a, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: n = "Bonus" } = {}) {
  const s = /* @__PURE__ */ new Set(), r = [], o = Array.isArray(a) ? a : [];
  for (const l of o) {
    const c = Ph(l, { strict: e, errors: t, prefix: i, grantLabel: n });
    if (!c) continue;
    const u = Ma(c);
    s.has(u) || (s.add(u), r.push(c));
  }
  return r;
}
function Xu(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = vh(a, { strict: e, errors: t, prefix: i });
  return n.length ? [{
    id: "skill",
    label: "",
    choices: n.map((s) => ({ type: "skill", value: s }))
  }] : [];
}
function Nh(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = String(a ?? "").trim();
  return n ? n.split(";").map((r) => r.trim()).filter(Boolean).map((r, o) => {
    const l = `Bonus ${o + 1}`, c = Ir(
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
function Zu(a, e = "grant") {
  return fn(a) || e;
}
function Rh(a, e, { strict: t = !1, errors: i = [], prefix: n = "Entry" } = {}) {
  const s = `grant-${e + 1}`, r = `Bonus ${e + 1}`;
  if (typeof a == "string") {
    const u = Ir(
      a.split("|").map((d) => d.trim()).filter(Boolean),
      { strict: t, errors: i, prefix: n, grantLabel: r }
    );
    return u.length ? { id: s, label: "", choices: u } : null;
  }
  const o = Zu(a == null ? void 0 : a.id, s), l = String((a == null ? void 0 : a.label) ?? "").trim(), c = Ir(a == null ? void 0 : a.choices, { strict: t, errors: i, prefix: n, grantLabel: r });
  return c.length ? { id: o, label: l, choices: c } : (t && i.push(`${n} ${r}: define at least one bonus choice.`), null);
}
function Ih(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  if (Array.isArray(a)) {
    if (a.every((s) => typeof s == "string" && !String(s).includes(":")))
      return Xu(a, { strict: e, errors: t, prefix: i });
    const n = /* @__PURE__ */ new Set();
    return a.map((s, r) => Rh(s, r, { strict: e, errors: t, prefix: i })).filter((s) => s ? n.has(s.id) ? (e && t.push(`${i}: duplicate bonus id "${s.id}".`), !1) : (n.add(s.id), !0) : !1);
  }
  return typeof a == "string" ? Nh(a, { strict: e, errors: t, prefix: i }) : [];
}
function Dh(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => (Array.isArray(e == null ? void 0 : e.choices) ? e.choices : []).map((i) => `${i.type}:${i.value}`).join("|")).filter(Boolean).join("; ");
}
function Bo() {
  return foundry.utils.deepClone(bh);
}
function Ea(a) {
  return ch[a] ?? (String(a ?? "").trim() || "Life Module");
}
function ed() {
  return Cs.map((a) => ({
    value: a.moduleType,
    label: a.label
  }));
}
function ia(a = [], { strict: e = !1 } = {}) {
  const t = Array.isArray(a) ? a : [], i = [], n = /* @__PURE__ */ new Set(), s = t.map((o, l) => {
    const c = `Entry ${l + 1}`, u = String((o == null ? void 0 : o.label) ?? "").trim(), d = fn((o == null ? void 0 : o.id) ?? u), m = Ps(o == null ? void 0 : o.moduleType), f = (o == null ? void 0 : o.grants) != null ? Ih(o.grants, { strict: e, errors: i, prefix: c }) : Xu(o == null ? void 0 : o.skillChoices, { strict: e, errors: i, prefix: c }), p = El(o == null ? void 0 : o.requiresAny), h = El(o == null ? void 0 : o.excludesAny);
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
  if (e && i.length) throw wh(i);
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
function td(a = []) {
  const e = new Map(Bo().map((s) => [s.id, s])), t = ia(a, { strict: !1 }), i = [...t], n = new Set(t.map((s) => s.id));
  for (const [s, r] of e.entries())
    n.has(s) || i.push(foundry.utils.deepClone(r));
  return i;
}
async function Oh() {
  var a, e, t;
  try {
    if (!((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${w}.${Sa}`))) return;
    const i = game.settings.get(w, Sa), n = td(i);
    JSON.stringify(i) !== JSON.stringify(n) && await game.settings.set(w, Sa, n);
  } catch {
  }
}
function _h() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${w}.${Sa}`))
      return td(game.settings.get(w, Sa));
  } catch {
  }
  return Bo();
}
function Rs() {
  return ia(_h(), { strict: !1 });
}
function Ri(a) {
  const e = fn(a);
  return e ? Rs().find((t) => t.id === e) ?? null : null;
}
function zo(a) {
  const e = Ps(a);
  return Rs().filter((t) => t.moduleType === e);
}
function id(a) {
  return !a || typeof a != "object" || Array.isArray(a) ? {} : Object.fromEntries(
    Object.entries(a).map(([e, t]) => [Zu(e, ""), String(t ?? "").trim()]).filter(([e]) => !!e)
  );
}
function ad(a, e = "", { legacySelectedSkill: t = "" } = {}) {
  const i = new Set((Array.isArray(a == null ? void 0 : a.choices) ? a.choices : []).map(Ma)), n = String(e ?? "").trim();
  if (i.has(n)) return n;
  if (t) {
    const s = Ns(t), r = s ? `skill:${s}` : "";
    if (r && i.has(r)) return r;
  }
  return i.size === 1 ? Array.from(i)[0] : "";
}
function nd(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(a == null ? void 0 : a.grants) ? a.grants : [], n = id(e);
  return Object.fromEntries(
    i.map((s) => [
      s.id,
      ad(s, n[s.id], { legacySelectedSkill: t })
    ])
  );
}
function Is(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(a == null ? void 0 : a.grants) ? a.grants : [], n = nd(a, e, { legacySelectedSkill: t });
  return i.map((s, r) => {
    const o = ad(s, n[s.id], { legacySelectedSkill: t }), l = (Array.isArray(s.choices) ? s.choices : []).find((c) => Ma(c) === o) ?? null;
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
function Lh(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  var i;
  return ((i = Is(a, e, { legacySelectedSkill: t }).map((n) => n.choice).find((n) => (n == null ? void 0 : n.type) === "skill")) == null ? void 0 : i.value) ?? "";
}
function Za(a = {}) {
  const e = foundry.utils.deepClone(a ?? {}), t = fn(e.catalogId), i = t ? Ri(t) : null, n = Ps(e.moduleType || (i == null ? void 0 : i.moduleType)), s = i ? nd(i, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }) : id(e.selectedGrants);
  return e.moduleType = n, e.catalogId = t, e.selectedGrants = s, e.selectedSkill = i ? Lh(i, s, { legacySelectedSkill: e.selectedSkill }) : Ns(e.selectedSkill), e;
}
function sd(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  return Is(a, e, { legacySelectedSkill: t }).map((i) => {
    var l, c;
    const n = Array.isArray((c = (l = a == null ? void 0 : a.grants) == null ? void 0 : l[i.index]) == null ? void 0 : c.choices) ? a.grants[i.index].choices : [], s = new Set(n.map((u) => u.type)).size > 1, r = n.map((u) => ({
      value: Ma(u),
      label: Xa(u, { includeTypePrefix: s }),
      selected: Ma(u) === i.selectedKey
    })), o = r.length === 1 ? {
      value: r[0].value,
      label: r[0].label,
      displayLabel: Xa(n[0], { includeBonusText: !0 })
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
function xh(a, e) {
  return a.isDuplicate ? `Duplicate ${Ea(a.moduleType)} slot item.` : a.catalog ? a.unresolvedGrantCount > 0 ? "Choose valid bonus options." : a.excludedBy.length ? `Blocked by ${Cl(a.excludedBy, e).join(", ")}.` : a.requiresAny.length && !a.matchedRequirementIds.length ? `Requires ${Cl(a.requiresAny, e).join(" or ")}.` : "" : "Catalog entry is missing or unlinked.";
}
function $h(a, e = [], t = {}) {
  var n, s, r;
  if (!a || !Array.isArray(e) || !e.length) return [];
  const i = Math.max(0, Number(((r = (s = (n = a.system) == null ? void 0 : n.attributes) == null ? void 0 : s.edge) == null ? void 0 : r.value) ?? 0));
  return e.filter((o) => (o == null ? void 0 : o.type) === "edgePool").map((o) => {
    var p, h, g, y;
    const l = String(o.value ?? "").trim(), c = Ju(l), u = Math.max(0, Number(((y = (g = (h = (p = a.system) == null ? void 0 : p.counters) == null ? void 0 : h.edgePools) == null ? void 0 : g[l]) == null ? void 0 : y.rating) ?? 0)), d = Math.max(0, Number((t == null ? void 0 : t[l]) ?? 0)), m = Math.max(0, u + d - i);
    return m ? `${c} Pool bonus loses ${m} ${m === 1 ? "point" : "points"} to the Edge cap.` : "";
  }).filter(Boolean);
}
function Di(a) {
  var m;
  const e = Rs(), t = new Map(e.map((f) => [f.id, f])), i = Array.from((a == null ? void 0 : a.items) ?? []).filter((f) => f.type === A.itemType.lifeModule), n = /* @__PURE__ */ new Map();
  for (const f of i) {
    const p = Ps((m = f.system) == null ? void 0 : m.moduleType);
    !p || n.has(p) || n.set(p, f.id);
  }
  const s = i.map((f) => {
    var E;
    const p = Za(f.system ?? {}), h = t.get(p.catalogId) ?? null, g = p.moduleType || (h == null ? void 0 : h.moduleType) || "", y = h ? Is(h, p.selectedGrants, { legacySelectedSkill: p.selectedSkill }) : [], b = y.map((P) => P.choice).filter(Boolean), S = ((E = b.find((P) => P.type === "skill")) == null ? void 0 : E.value) ?? "", T = S ? Ot(S) : null;
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
      selectedChoiceLabels: b.map((P) => Xa(P, { includeBonusText: !0 })),
      selectedSkill: S,
      selectedSkillLabel: (T == null ? void 0 : T.label) ?? S,
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
  const l = Object.fromEntries(si.map((f) => [f.code, 0])), c = Object.fromEntries(Yu.map((f) => [f, 0])), u = /* @__PURE__ */ new Map();
  for (const f of s) {
    const p = f.isActive ? f.selectedChoices : [], h = p.filter((y) => y.type === "skill"), g = p.filter((y) => y.type === "edgePool");
    f.bonus = h.length;
    for (const y of h)
      l[y.value] = Number(l[y.value] ?? 0) + 1;
    for (const y of g)
      c[y.value] = Number(c[y.value] ?? 0) + 1;
    f.inactiveReason = f.isActive ? "" : xh(f, t), u.set(f.itemId, f);
  }
  for (const f of s)
    f.warningLabels = f.isActive ? $h(a, f.selectedChoices, c) : [];
  const d = Cs.map((f) => {
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
function Bh(a = {}) {
  var t, i, n;
  const e = String((a == null ? void 0 : a.intent) ?? "").trim();
  return e === "skill" ? String(((t = a == null ? void 0 : a.data) == null ? void 0 : t.skillKey) ?? "").trim() : e === "attack" ? String(((n = (i = a == null ? void 0 : a.attack) == null ? void 0 : i.skill) == null ? void 0 : n.code) ?? "").trim() : "";
}
function zh({ actor: a, resolved: e } = {}) {
  const t = Bh(e);
  return !a || !t ? [] : Di(a).states.flatMap(
    (i) => i.isActive ? i.selectedChoices.filter((n) => n.type === "skill" && n.value === t).map((n) => ({
      id: `life-module:${i.itemId}:${Ma(n)}`,
      label: i.label,
      value: 1,
      source: "Life Module",
      tooltip: `${i.label}: +1 to ${Xa(n)} rolls`
    })) : []
  );
}
const Fh = {
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
}, Uh = {
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
}, Ds = {
  Actor: Fh,
  Item: Uh
}, Pl = Object.freeze({
  Actor: /* @__PURE__ */ new Set(["prototypeToken"]),
  Item: /* @__PURE__ */ new Set()
});
function en(a) {
  return !!a && typeof a == "object" && !Array.isArray(a);
}
function Ca(a) {
  return typeof structuredClone == "function" ? structuredClone(a) : JSON.parse(JSON.stringify(a));
}
function tn(a = {}, e = {}) {
  const t = Ca(a);
  for (const [i, n] of Object.entries(e ?? {})) {
    if (en(n) && en(t[i])) {
      t[i] = tn(t[i], n);
      continue;
    }
    t[i] = Ca(n);
  }
  return t;
}
function rd(a = "", e = Ds) {
  const t = e == null ? void 0 : e[a];
  return en(t) ? t : {};
}
function od(a = Ds, e = "", t = "", i = /* @__PURE__ */ new Set()) {
  var c;
  const n = String(t ?? "").trim();
  if (!n || i.has(n)) return {};
  const s = rd(e, a), r = (c = s == null ? void 0 : s.templates) == null ? void 0 : c[n];
  if (!en(r)) return {};
  i.add(n);
  let o = {};
  for (const u of Array.from(r.templates ?? []))
    o = tn(
      o,
      od(a, e, u, i)
    );
  const l = Ca(r);
  return delete l.templates, tn(o, l);
}
function Hh(a = Ds, e = "", t = "") {
  const i = String(t ?? "").trim();
  if (!i) return {};
  const n = rd(e, a), s = n == null ? void 0 : n[i];
  if (!en(s)) return {};
  let r = {};
  for (const l of Array.from(s.templates ?? []))
    r = tn(
      r,
      od(a, e, l)
    );
  const o = Ca(s);
  return delete o.templates, tn(r, o);
}
function Wh(a = "", e = "", t = Ds) {
  const i = Hh(t, a, e), n = Pl[a] ?? Pl.Item, s = { system: {} };
  for (const [r, o] of Object.entries(i))
    n.has(r) ? s[r] = Ca(o) : s.system[r] = Ca(o);
  return s;
}
async function ld(a = "", e = "") {
  return Wh(a, e);
}
const cd = Object.freeze({
  weapon: A.itemType.personalWeapon,
  shadowamp: A.itemType.assetModule
}), jh = Object.freeze({
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
function ud(a) {
  return cd[a] ?? a;
}
function Kh(a) {
  return jh[ud(a)];
}
function Gh(a) {
  return Object.prototype.hasOwnProperty.call(cd, a);
}
const Xi = Object.freeze(["close", "near", "far", "extreme"]), Nl = Object.freeze({
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
});
function xa() {
  return foundry.data.operators.ForcedDeletion;
}
function qh(a, e) {
  const t = String(e ?? "").split(".").map((n) => n.trim()).filter(Boolean);
  if (!a || typeof a != "object" || t.length < 2) return a;
  let i = a;
  for (let n = 0; n < t.length - 1; n += 1) {
    const s = t[n], r = i == null ? void 0 : i[s];
    (!r || typeof r != "object" || Array.isArray(r)) && (i[s] = {}), i = i[s];
  }
  return a;
}
function Vh(a, e) {
  const t = String(e ?? "").trim();
  if (!a || typeof a != "object" || !t) return !1;
  if (t.startsWith("areaEffect.hazard.")) {
    (!a.areaEffect || typeof a.areaEffect != "object" || Array.isArray(a.areaEffect)) && (a.areaEffect = {});
    const i = String(a.areaEffect.kind ?? "").trim().toLowerCase();
    if (i && i !== "persistent")
      return !1;
    a.areaEffect.kind = "persistent";
  }
  return qh(a, t), !0;
}
function $a(a) {
  return Na(a);
}
function Rl(a = {}) {
  const e = zc({
    traits: a.traits,
    keywords: a.keywords,
    report: ho(),
    path: "system.traits"
  });
  return {
    traits: e.traits,
    keywords: e.keywords
  };
}
function dd(a) {
  return a === "long" ? "extreme" : a === "short" ? "close" : a === "medium" ? "near" : Xi.includes(a) ? a : "near";
}
function la(a) {
  const e = xo(a);
  return e.max = dd(e.max ?? (a == null ? void 0 : a.max) ?? "extreme"), e;
}
function Vs(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function Il(a, e = 1) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function Dl(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function Ol(a) {
  return String(a ?? "").trim();
}
function _l(a) {
  return (Array.isArray(a) ? a : typeof a == "string" ? a.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function Yh(a) {
  const e = Xi.indexOf(a);
  return e >= 0 ? e : Xi.indexOf("near");
}
function Qh(a = la({})) {
  const e = ["near", "close", "far", "extreme"], t = Yh(a.max);
  return e.find((i) => Xi.indexOf(i) <= t) ?? "close";
}
function Jh(a) {
  const e = dd(a == null ? void 0 : a.max), t = Xi.indexOf(e);
  return Xi.map((i, n) => ({
    key: i,
    allowed: t >= 0 ? n <= t : n === 0,
    value: (a == null ? void 0 : a[i]) ?? void 0,
    labelkey: is(i)
  }));
}
function Xh(a, e, t, i) {
  let n = Number(e);
  if (t)
    if (i !== void 0)
      n += Math.ceil(Number(i) / 2);
    else
      return console.warn("Weapon not attached to an actor"), Ie.item.personalWeapon.weaponWithoutActor;
  return n;
}
function Zh(a, e, t) {
  let i = "";
  return t && Ie.attributes[t] && (i += Ie.attributes[t].substring(0, 3).toUpperCase() + "/2 + "), i += String(e), i;
}
function eg(a, e) {
  return U.useArmor(a) ? e ? "noArmor" : "withArmor" : "";
}
function Ll(a) {
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
function Ys(a = {}) {
  const e = Za(a), t = Ri(e.catalogId);
  return {
    system: e,
    ...t ? { name: t.label } : {}
  };
}
function tg(a) {
  const e = String(a ?? "").trim();
  return !!(!e || e.startsWith("icons/svg/") || e === "icons/mystery-man.svg");
}
var rn, Gt, Dr, md, Ln;
const rt = class rt extends Item {
  static init() {
    F(this, rn) || (Oe(this, rn, !0), Hooks.on("createItem", (e, t, i) => {
      var n, s;
      Promise.resolve((n = e.onCreateItem) == null ? void 0 : n.call(e, t, i)).catch((r) => {
        console.error(`${ve}Item create hook failed`, r);
      }), M(s = rt, Gt, Dr).call(s, e);
    }), Hooks.on("updateItem", (e) => {
      var t;
      M(t = rt, Gt, Dr).call(t, e);
    }), Hooks.on("deleteItem", (e) => {
      var t;
      M(t = rt, Gt, md).call(t, e);
    }), Hooks.on("createActiveEffect", (e) => {
      var t;
      M(t = rt, Gt, Ln).call(t, e);
    }), Hooks.on("updateActiveEffect", (e) => {
      var t;
      M(t = rt, Gt, Ln).call(t, e);
    }), Hooks.on("deleteActiveEffect", (e) => {
      var t;
      M(t = rt, Gt, Ln).call(t, e);
    }));
  }
  static canonicalType(e) {
    return ud(e);
  }
  static defaultIconForType(e) {
    return Kh(e);
  }
  get canonicalType() {
    return this.constructor.canonicalType(this.type);
  }
  async onCreateItem(e, t) {
  }
  async _preCreate(e, t, i) {
    super._preCreate && await super._preCreate(e, t, i);
    const n = (e == null ? void 0 : e.type) ?? this.type, s = this.constructor.canonicalType(n), r = {}, o = await ld("Item", s);
    if (o.system && Object.keys(o.system).length && (r.system = foundry.utils.mergeObject(
      foundry.utils.deepClone(o.system),
      foundry.utils.deepClone((e == null ? void 0 : e.system) ?? this.system ?? {}),
      { inplace: !1, recursive: !0, overwrite: !0 }
    )), n !== s && Gh(n) && (r.type = s), tg((e == null ? void 0 : e.img) ?? this.img)) {
      const l = this.constructor.defaultIconForType(s);
      l && (r.img = l);
    }
    if (s === A.itemType.lifeModule && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (r.name = "MWD.itemType.singular.lifeModule"), s === A.itemType.lifeModule) {
      const l = Ys(r.system ?? (e == null ? void 0 : e.system) ?? this.system ?? {});
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
      const u = n.ammo, d = Rl(n);
      e.system.standardTraits = [], e.system.payloads = ci(n.payloads, { legacyAmmo: u, category: n.category }), e.system.consumptionSources = Fa(n.consumptionSources, { legacyAmmo: u }), e.system.selectedPayloadId = oa(
        n.selectedPayloadId,
        e.system.payloads,
        { legacyAmmo: u, category: n.category }
      ), e.system.traits = d.traits, e.system.keywords = d.keywords, e.system.resolution = Cn(n.resolution, "standard"), e.system.fireModes = Pn(n.fireModes), e.system.attackRatingBand = Vs(n.attackRatingBand), e.system.range = la(n.range), e.system.damageType = qt(n.damageType), e.system.ammo = xa();
    }
    if (n && this.isArmor() && (e.system ?? (e.system = {}), e.system.mitigationByType = ai(n.mitigationByType ?? n.mitigation), e.system.tags = En(n.tags), e.system.traits = $a(n.traits), e.system.standardTraits = li(n.standardTraits), e.system.traitState = Hs({
      standardTraits: e.system.standardTraits,
      traits: e.system.traits,
      traitState: n.traitState
    }).traitState), n && this.isLifeModule()) {
      const u = Ys(n);
      e.system ?? (e.system = {}), foundry.utils.mergeObject(e.system, u.system, { inplace: !0, overwrite: !0 }), u.name && (e.name = u.name);
      return;
    }
    if (n && this.isQuality()) {
      e.system ?? (e.system = {});
      const u = Kt(n);
      foundry.utils.mergeObject(e.system, u, { inplace: !0, overwrite: !0 });
      return;
    }
    if (n && this.isQuantityTrackedInventoryItem()) {
      e.system ?? (e.system = {}), e.system.quantity = Il(n.quantity, 1), e.system.rating = Dl(n.rating, 0), e.system.category = Ol(n.category), e.system.tags = _l(n.tags);
      return;
    }
    if (!this.isSkill()) return;
    const s = (l = e == null ? void 0 : e.system) == null ? void 0 : l.code;
    if (s === void 0) return;
    const r = this.system.code;
    if (s === r) return;
    const o = Ll(s);
    o && ((c = o == null ? void 0 : o.system) == null || delete c.code, foundry.utils.mergeObject(e, o, { inplace: !0 }));
  }
  prepareBaseData() {
    super.prepareBaseData();
    const e = this.canonicalType;
    e === A.itemType.personalWeapon ? this._preparePersonalWeaponBaseData() : e === A.itemType.armor ? this._prepareArmorBaseData() : e === A.itemType.lifeModule ? this._prepareLifeModuleBaseData() : e === A.itemType.quality ? this._prepareQualityBaseData() : [A.itemType.gear, A.itemType.consumable].includes(e) && this._prepareGearBaseData();
  }
  _preparePersonalWeaponBaseData() {
    const e = this.system ?? {}, t = e.ammo;
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = qt(e.damageType), e.attackRatingBand = Vs(e.attackRatingBand), e.range = la(e.range);
    const i = Rl(e);
    e.standardTraits = [], e.traits = i.traits, e.keywords = i.keywords, e.resolution = Cn(e.resolution, "standard"), e.fireModes = Pn(e.fireModes), e.payloads = ci(e.payloads, { legacyAmmo: t, category: e.category }), e.consumptionSources = Fa(e.consumptionSources, { legacyAmmo: t }), e.selectedPayloadId = oa(e.selectedPayloadId, e.payloads, { legacyAmmo: t, category: e.category }), delete e.ammo, e.notes = String(e.notes ?? "").trim();
  }
  _prepareArmorBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.rating = Math.max(0, Number(e.rating ?? 0)), e.defenseBonus = Number(e.defenseBonus ?? 0) || 0, e.mitigationByType = ai(e.mitigationByType ?? e.mitigation), delete e.mitigation, e.durability ?? (e.durability = {}), e.durability.max = Math.max(0, Number(e.durability.max ?? e.rating ?? 0)), e.durability.current = Math.min(
      e.durability.max,
      Math.max(0, Number(e.durability.current ?? e.durability.max ?? e.rating ?? 0))
    ), e.standardTraits = li(e.standardTraits), e.tags = En(e.tags), e.traits = $a(e.traits), e.traitState = Hs({
      standardTraits: e.standardTraits,
      traits: e.traits,
      traitState: e.traitState
    }).traitState, e.notes = String(e.notes ?? "").trim();
  }
  _prepareLifeModuleBaseData() {
    const e = Ys(this.system ?? {});
    foundry.utils.mergeObject(this.system, e.system, { inplace: !0, overwrite: !0 });
  }
  _prepareQualityBaseData() {
    const e = Kt(this.system ?? {});
    foundry.utils.mergeObject(this.system, e, { inplace: !0, overwrite: !0 });
  }
  _prepareGearBaseData() {
    const e = this.system ?? {};
    e.quantity = Il(e.quantity, 1), e.rating = Dl(e.rating, 0), e.category = Ol(e.category), e.tags = _l(e.tags);
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
      const i = (s = (n = t.flags) == null ? void 0 : n[w]) == null ? void 0 : s[rt.EQUIPPED_EFFECT_FLAG];
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
      const y = (h = (p = (f = g.flags) == null ? void 0 : f[w]) == null ? void 0 : p[rt.EQUIPPED_EFFECT_FLAG]) == null ? void 0 : h.sourceEffectId;
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
      [w]: {
        [rt.EQUIPPED_EFFECT_FLAG]: {
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
    this.parent && await ei.itemAttributeRoll(this, e);
  }
  async switchMonitorCheck(e, t, i, n = void 0) {
    await U.switchMonitorCheck(this.parent, e, t, i, n, this);
  }
  async setCounter(e, t) {
    await U.setCounter(this, e, t);
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
    const t = e(foundry.utils.deepClone(Kt(this.system ?? {})));
    await this.update({ system: Kt(t) });
  }
  async createQualityPrerequisite(e = {}) {
    await this._mutateQualitySystem((t) => (t.prerequisites = mi(t.prerequisites).concat([{
      id: e.id ?? foundry.utils.randomID(),
      fact: e.fact ?? "",
      comparator: e.comparator ?? "eq",
      value: e.value ?? ""
    }]), t));
  }
  async deleteQualityPrerequisite(e) {
    await this._mutateQualitySystem((t) => (t.prerequisites = mi(t.prerequisites).filter((i) => i.id !== e), t));
  }
  async updateQualityPrerequisite(e, t, i) {
    await this._mutateQualitySystem((n) => (n.prerequisites = mi(n.prerequisites).map((s) => (s.id !== e || (t === "fact" && (s.fact = i), t === "comparator" && (s.comparator = i), t === "value" && (s.value = i)), s)), n));
  }
  async createQualityEffect(e = {}) {
    await this._mutateQualitySystem((t) => (t.effects = Bi(t.effects).concat([{
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
      conditions: mi(e.conditions ?? []),
      limit: Ni(e.limit ?? {})
    }]), t));
  }
  async deleteQualityEffect(e) {
    await this._mutateQualitySystem((t) => (t.effects = Bi(t.effects).filter((i) => i.id !== e), t));
  }
  async updateQualityEffect(e, t, i) {
    await this._mutateQualitySystem((n) => (n.effects = Bi(n.effects).map((s) => (s.id !== e || (t === "type" && (s.type = i), t === "phase" && (s.phase = i), t === "selector" && (s.selector = i), t === "skillKeys" && (s.skillKeys = Array.isArray(i) ? i : []), t === "label" && (s.label = i), t === "value" && (s.value = Number(i ?? 0) || 0), t === "min" && (s.min = i === "" ? null : Number(i ?? 0)), t === "max" && (s.max = i === "" ? null : Number(i ?? 0)), t === "pool" && (s.pool = i), t === "operation" && (s.operation = i), t === "limit.perActivation" && (s.limit = Ni({ ...s.limit ?? {}, perActivation: i })), t === "limit.perRound" && (s.limit = Ni({ ...s.limit ?? {}, perRound: i })), t === "limit.perScene" && (s.limit = Ni({ ...s.limit ?? {}, perScene: i }))), s)), n));
  }
  async createQualityEffectCondition(e, t = {}) {
    await this._mutateQualitySystem((i) => (i.effects = Bi(i.effects).map((n) => (n.id !== e || (n.conditions = mi(n.conditions).concat([{
      id: t.id ?? foundry.utils.randomID(),
      fact: t.fact ?? "",
      comparator: t.comparator ?? "eq",
      value: t.value ?? ""
    }])), n)), i));
  }
  async deleteQualityEffectCondition(e, t) {
    await this._mutateQualitySystem((i) => (i.effects = Bi(i.effects).map((n) => (n.id !== e || (n.conditions = mi(n.conditions).filter((s) => s.id !== t)), n)), i));
  }
  async updateQualityEffectCondition(e, t, i, n) {
    await this._mutateQualitySystem((s) => (s.effects = Bi(s.effects).map((r) => (r.id !== e || (r.conditions = mi(r.conditions).map((o) => (o.id !== t || (i === "fact" && (o.fact = n), i === "comparator" && (o.comparator = n), i === "value" && (o.value = n)), o))), r)), s));
  }
  async _mutateWeaponStandardTraits(e = (t) => t) {
    var i;
    const t = e(foundry.utils.deepClone(zi((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": zi(t) });
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
    const t = e(foundry.utils.deepClone(li((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": li(t) });
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
      ci((n = this.system) == null ? void 0 : n.payloads, {
        legacyAmmo: (s = this.system) == null ? void 0 : s.ammo,
        category: ((r = this.system) == null ? void 0 : r.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
      })
    )).map(At), i = oa((l = this.system) == null ? void 0 : l.selectedPayloadId, t, {
      category: ((c = this.system) == null ? void 0 : c.category) ?? ((u = this.system) == null ? void 0 : u.weaponCategory)
    });
    await this.update({
      "system.payloads": t,
      "system.selectedPayloadId": i,
      "system.ammo": xa()
    });
  }
  async _mutateConsumptionSources(e = (t) => t) {
    var i, n;
    const t = e(foundry.utils.deepClone(
      Fa((i = this.system) == null ? void 0 : i.consumptionSources, { legacyAmmo: (n = this.system) == null ? void 0 : n.ammo })
    )).map(Zt);
    await this.update({
      "system.consumptionSources": t,
      "system.ammo": xa()
    });
  }
  async updatePayloadField(e, t, i) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((n) => n.map((s) => s.id !== e ? s : (Vh(s, t) && foundry.utils.setProperty(s, t, i), At(s))));
  }
  async createPayload(e = {}) {
    await this._mutatePayloads((t) => t.concat([At({
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
    const t = ((s = this.system) == null ? void 0 : s.category) ?? ((r = this.system) == null ? void 0 : r.weaponCategory), i = ci((o = this.system) == null ? void 0 : o.payloads, {
      legacyAmmo: (l = this.system) == null ? void 0 : l.ammo,
      category: t
    }).filter((u) => u.id !== e), n = ((c = i[0]) == null ? void 0 : c.id) ?? "unloaded";
    await this.update({
      "system.payloads": i.length ? i : ci([], { category: t }),
      "system.selectedPayloadId": i.some((u) => {
        var d;
        return u.id === ((d = this.system) == null ? void 0 : d.selectedPayloadId);
      }) ? this.system.selectedPayloadId : i.length ? n : "",
      "system.ammo": xa()
    });
  }
  async createPayloadStandardTrait(e, t = {}) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((n) => n.id !== e ? n : (n.modifies ?? (n.modifies = {}), n.modifies.standardTraits = zi(n.modifies.standardTraits).concat([{
      id: t.id ?? foundry.utils.randomID(),
      key: t.key ?? "armorPiercing",
      rating: Math.max(0, Number(t.rating ?? 0) || 0)
    }]), At(n))));
  }
  async deletePayloadStandardTrait(e, t) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((n) => n.id !== e ? n : (n.modifies ?? (n.modifies = {}), n.modifies.standardTraits = zi(n.modifies.standardTraits).filter((s) => s.id !== t), At(n))));
  }
  async updatePayloadStandardTrait(e, t, i, n) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((s) => s.map((r) => r.id !== e ? r : (r.modifies ?? (r.modifies = {}), r.modifies.standardTraits = zi(r.modifies.standardTraits).map((o) => (o.id !== t || (i === "key" && (o.key = n), i === "rating" && (o.rating = Math.max(0, Number(n ?? 0) || 0))), o)), At(r))));
  }
  async createConsumptionSource(e = {}) {
    await this._mutateConsumptionSources((t) => t.concat([Zt({
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
      return ((n = i == null ? void 0 : i.consumption) == null ? void 0 : n.sourceId) !== e ? i : (i.consumption.sourceId = "", At(i));
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
      return Zt(s);
    }));
  }
  getPayloadState({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var i, n, s, r, o;
    return wr({
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
    const r = this.getPayloadState({ payloadId: e || t }), o = (r == null ? void 0 : r.sourceState) ?? null, l = (r == null ? void 0 : r.source) ?? null, c = String((r == null ? void 0 : r.activePayloadId) ?? "").trim(), u = String((r == null ? void 0 : r.payloadLabel) ?? "").trim() || "Unloaded", d = Math.max(0, Number((o == null ? void 0 : o.current) ?? 0) || 0), m = Math.max(0, Number((o == null ? void 0 : o.max) ?? 0) || 0), f = !!((g = x.getCombat(this.actor)) != null && g.combatant);
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
      return r.id !== i.source.id ? r : (r.tracking ?? (r.tracking = {}), r.tracking.max = Math.max(0, Number(((o = r.tracking) == null ? void 0 : o.max) ?? i.max) || i.max), r.tracking.current = i.max, Zt(r));
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
    const t = oa(
      e,
      ci((i = this.system) == null ? void 0 : i.payloads, {
        legacyAmmo: (n = this.system) == null ? void 0 : n.ammo,
        category: ((s = this.system) == null ? void 0 : s.category) ?? ((r = this.system) == null ? void 0 : r.weaponCategory)
      }),
      {
        category: ((o = this.system) == null ? void 0 : o.category) ?? ((l = this.system) == null ? void 0 : l.weaponCategory)
      }
    );
    await this.update({
      "system.selectedPayloadId": t,
      "system.ammo": xa()
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
      return l.id !== ((c = i.source) == null ? void 0 : c.id) ? l : (l.tracking ?? (l.tracking = {}), l.tracking.current = Math.max(0, s - n), Zt(l));
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
    const i = this.system ?? {}, n = la(i.range), s = String(i.skill ?? "").trim(), r = Ot(s), o = Number(i.damage ?? 0) || 0, l = String(i.category ?? i.weaponCategory ?? "ranged").trim() || "ranged", c = Tf({
      damageType: i.damageType,
      ap: Number(i.ap ?? i.armorPiercing ?? 0) || 0,
      attackRatingBand: Vs(i.attackRatingBand),
      traits: $a(i.traits),
      keywords: cf(i.keywords),
      standardTraits: [],
      resolution: Cn(i.resolution, "standard"),
      fireModes: Pn(i.fireModes),
      payloads: ci(i.payloads, { legacyAmmo: i.ammo, category: l }),
      selectedPayloadId: oa(i.selectedPayloadId, i.payloads, { legacyAmmo: i.ammo, category: l }),
      consumptionSources: Fa(i.consumptionSources, { legacyAmmo: i.ammo }),
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
      damageTypeLabel: Vt(c.damageType),
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
    ), r = Math.min(i, s), o = ai((t == null ? void 0 : t.mitigationByType) ?? (t == null ? void 0 : t.mitigation)), l = Hs({
      standardTraits: li(t == null ? void 0 : t.standardTraits),
      traits: $a(t == null ? void 0 : t.traits),
      traitState: t == null ? void 0 : t.traitState
    }), c = En(t == null ? void 0 : t.tags), u = So(r);
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
      mitigationByType: ou(o, l.mitigationByType),
      tags: c,
      isDestroyed: s <= 0,
      durability: {
        current: s,
        max: n
      },
      traitState: l.traitState,
      standardTraits: li(t.standardTraits),
      traits: vf({
        traits: $a(t.traits),
        standardTraits: li(t.standardTraits)
      }),
      notes: String(t.notes ?? "").trim()
    };
  }
  getDefaultRangeBand(e = la(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    return Qh(e);
  }
  isWeaponSkill(e) {
    return ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === A.itemType.skill && e.system.code === this.system.skill;
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find((n) => this.isWeaponSkill(n));
    if (e) return e;
    const t = game.items.find((n) => this.isWeaponSkill(n));
    return t || Ll(this.system.skill);
  }
  getDefense() {
    if (!this.isPersonalWeapon())
      return this.system.defense ? De.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return De.fixedDefenseCode(this.system.defense);
    const e = Ot(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? De.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent) return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0, i = this.isPersonalWeapon() ? this.getCombatProfile() : null;
    return {
      value: Xh(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: (i == null ? void 0 : i.damageType) ?? this.system.damageType,
      damageTypeLabel: (i == null ? void 0 : i.damageTypeLabel) ?? this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: eg(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  getDamageCode() {
    return Zh(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  getDamageTypeLabel() {
    var t;
    if (this.isPersonalWeapon())
      return Vt(((t = this.getCombatProfile()) == null ? void 0 : t.damageType) ?? this.system.damageType);
    const e = Ie.mwd.weaponDamageType[this.system.damageType] ?? Ie.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return Jh(la(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  validateTargets(e) {
    var r;
    const t = (r = this.getDamage()) == null ? void 0 : r.monitor, i = jt.getTargetTokens(game.user), n = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), s = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (s.length > 0) {
      const o = Ce(Ie.common.errors.ignoredTargets, {
        targets: s.reduce(se.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (n.length === 0) {
      const o = Ce(Ie.common.errors.noTargetSelected, {
        weapon: this.name ?? Ie.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(n);
    return n;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = Nl[t] ?? {};
    ea.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = Nl[t] ?? {};
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
rn = new WeakMap(), Gt = new WeakSet(), Dr = async function(e) {
  if (typeof (e == null ? void 0 : e.syncEquippedActorEffects) == "function")
    try {
      await e.syncEquippedActorEffects();
    } catch (t) {
      console.error(`${ve}Failed to sync equipped item effects`, { item: e, error: t });
    }
}, md = async function(e) {
  if (typeof (e == null ? void 0 : e.removeSyncedActorEffects) == "function")
    try {
      await e.removeSyncedActorEffects({ actor: e.actor ?? e.parent ?? null });
    } catch (t) {
      console.error(`${ve}Failed to remove synced item effects`, { item: e, error: t });
    }
}, Ln = async function(e) {
  const t = e == null ? void 0 : e.parent;
  if (typeof (t == null ? void 0 : t.syncEquippedActorEffects) == "function")
    try {
      await t.syncEquippedActorEffects();
    } catch (i) {
      console.error(`${ve}Failed to sync parent item effects`, { effect: e, error: i });
    }
}, Me(rt, Gt), Me(rt, rn, !1), D(rt, "RANGE_ORDER", Xi), D(rt, "EQUIPPED_EFFECT_FLAG", "equippedItemSync"), D(rt, "DEFAULT_UNARMED", Object.freeze({
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
let Pa = rt;
const xl = {
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
}, ig = {
  code: "weapon-range",
  options: {
    flags: { editable: !0 },
    order: 20,
    category: Ae.pool,
    labelkey: Ie.common.roll.modifiers.weaponRange,
    hbsTemplateRoll: `${J}/roll/parts/select-option.hbs`,
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
}, ag = {
  code: "weapon-area",
  options: {
    used: !0,
    order: 20,
    category: Ae.pool,
    labelkey: Ie.common.roll.modifiers.weaponArea,
    hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`,
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
}, ge = class ge extends Pa {
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
    Hooks.once(We.REGISTER_ROLL_PARAMETERS, (e) => {
      e(ag), e(ig);
    });
  }
  prepareBaseData() {
    if (super.prepareBaseData(), (this.canonicalType ?? this.type) !== A.itemType.personalWeapon) return;
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = qt(e.damageType), e.attackRatingBand = ge.normalizeAttackRatingBand(e.attackRatingBand), e.range = ge.normalizePersonalRangeData(e.range), e.traits = ge.normalizeTraits(e.traits), e.notes = String(e.notes ?? "").trim();
  }
  static maxIndex(e) {
    const t = ge.RANGE_ORDER.indexOf(e);
    return t >= 0 ? t : ge.RANGE_ORDER.indexOf("near");
  }
  /**
    * Compute UI-friendly range band data:
    * - cap: normalized max band
    * - bands: [{key, allowed, value}]
    * - optimalKey: highest value among allowed (tie -> closest)
    */
  static getRangeBands(e) {
    const t = e ?? {}, i = ge.normalizeRangeKey(t.max ?? "near"), n = ge.maxIndex(i), s = ge.RANGE_ORDER.map((l, c) => ({
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
    return Na(e);
  }
  static normalizePersonalRangeData(e) {
    const t = xo(e);
    return t.max = ge.normalizeRangeKey(t.max ?? (e == null ? void 0 : e.max) ?? "extreme"), t;
  }
  static normalizeRangeData(e) {
    return {
      max: ge.normalizeRangeKey((e == null ? void 0 : e.max) ?? "near"),
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
    const t = this.system ?? {}, i = this.canonicalType ?? this.type, n = i === A.itemType.personalWeapon ? ge.normalizePersonalRangeData(t.range) : ge.normalizeRangeData(t.range), s = String(t.skill ?? "").trim(), r = Ot(s), o = Number(t.damage ?? 0) || 0, l = Number(t.ap ?? t.armorPiercing ?? 0) || 0, c = String(t.category ?? t.weaponCategory ?? "ranged").trim() || "ranged", u = ge.normalizeTraits(t.traits);
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
      damageType: i === A.itemType.personalWeapon ? qt(t.damageType) : String(t.damageType ?? "kinetic").trim() || "kinetic",
      attackRatingBand: ge.normalizeAttackRatingBand(t.attackRatingBand),
      range: n,
      defaultRangeBand: this.getDefaultRangeBand(n),
      traits: u,
      effects: {},
      notes: String(t.notes ?? t.description ?? "").trim()
    };
  }
  getDefaultRangeBand(e = ge.normalizeRangeData(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    const i = ["near", "close", "far", "extreme"], n = ge.maxIndex(e.max);
    return i.find((s) => ge.RANGE_ORDER.indexOf(s) <= n) ?? "close";
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find(
      (n) => n.type === A.itemType.skill && n.system.code === this.system.skill
    );
    if (e) return e;
    const t = Ot(String(this.system.skill ?? "").trim());
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
      return this.system.defense ? De.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return De.fixedDefenseCode(this.system.defense);
    const e = Ot(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? De.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent)
      return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0;
    return {
      value: ge.damageValue(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: this.system.damageType,
      damageTypeLabel: this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: ge.armorMode(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  static damageValue(e, t, i, n) {
    if (t = Number(t), i)
      if (n !== void 0)
        t = t + Math.ceil(Number(n) / 2);
      else
        return console.warn("Weapon not attached to an actor"), Ie.item.personalWeapon.weaponWithoutActor;
    return t;
  }
  getDamageCode() {
    return ge.damageCode(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  static damageCode(e, t, i) {
    let n = "";
    return i && Ie.attributes[i] && (n += Ie.attributes[i].substring(0, 3).toUpperCase() + "/2 + "), n += String(t), n;
  }
  static armorMode(e, t) {
    return U.useArmor(e) ? t ? "noArmor" : "withArmor" : "";
  }
  getDamageTypeLabel() {
    if ((this.canonicalType ?? this.type) === A.itemType.personalWeapon)
      return Vt(this.system.damageType);
    const e = Ie.mwd.weaponDamageType[this.system.damageType] ?? Ie.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    const e = (this.canonicalType ?? this.type) === A.itemType.personalWeapon, t = e ? ge.normalizePersonalRangeData(this.system.range) : ge.normalizeRangeData(this.system.range);
    return ge.getRangeList(t, {
      personalScale: e
    }).filter((i) => i.allowed).map((i) => ({ value: i.value, labelkey: i.labelkey }));
  }
  _getRange(e) {
    return { value: this.system.range[e], labelkey: Te.getFromList(Te.getEnums().ranges, e) };
  }
  static getRangeList(e, { personalScale: t = !1 } = {}) {
    const i = ge.normalizeRangeKey(e == null ? void 0 : e.max), n = ge.RANGE_ORDER.indexOf(i);
    return ge.RANGE_ORDER.map((s, r) => ({
      key: s,
      allowed: n >= 0 ? r <= n : r === 0,
      value: (e == null ? void 0 : e[s]) ?? (s === "extreme" && (e == null ? void 0 : e.long) !== void 0 ? e.long : void 0),
      labelkey: t ? is(s) : Te.getFromList(Te.getEnums().ranges, s)
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
    const t = (r = this.getDamage()) == null ? void 0 : r.monitor, i = jt.getTargetTokens(game.user), n = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), s = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (s.length > 0) {
      const o = Ce(Ie.common.errors.ignoredTargets, {
        targets: s.reduce(se.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (n.length == 0) {
      const o = Ce(Ie.common.errors.noTargetSelected, {
        weapon: this.name ?? Ie.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(n);
    return n;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = xl[t] ?? {};
    ea.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = xl[t] ?? {};
    return i.targets && i.adjust && e <= i.targets ? i.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area == "" ? A.area.none : this.system.area ?? A.area.none;
  }
  _getMonitor() {
    return (this.canonicalType ?? this.type) === A.itemType.personalWeapon ? A.monitors.physical : this.system.monitor || A.monitors.physical;
  }
};
D(ge, "RANGE_ORDER", ["close", "near", "far", "extreme"]), D(ge, "DEFAULT_UNARMED", Pa.DEFAULT_UNARMED);
let It = ge;
function ng(a) {
  const e = [];
  for (let [t, i] of Object.entries(a ?? {}))
    i !== void 0 && (t = t.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (n, s) => (s ? "-" : "") + n.toLowerCase()), e.push(`data-${t}="${Handlebars.escapeExpression(i)}"`));
  return new Handlebars.SafeString(e.join(" "));
}
function sg({ hash: a }) {
  return a;
}
function rg() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
class Fo {
  constructor() {
    this.registerHelpers(), Hooks.once("init", () => {
      this.registerHelpers(), console.log(`${ve}Handlebars helpers registered (init)`);
    }), console.log(`${ve}Handlebars helpers registered (ctor)`);
  }
  registerHelpers() {
    const e = rg(), t = {
      // Foundry utils
      getProperty: foundry.utils.getProperty,
      // DND5E-inspired utilities
      "mwd-dataset": ng,
      "mwd-object": sg,
      // Simple comparisons
      eq: (i, n) => i === n,
      ne: (i, n) => i !== n,
      // Strings/arrays
      concat: (...i) => se.join(i.slice(0, -1)),
      join: (i, n = " ") => Array.isArray(i) ? i.join(n) : "",
      includes: (i, n) => i == null ? void 0 : i.includes(n),
      length: (i) => (i == null ? void 0 : i.length) || 0,
      substring: (i, n, s) => i == null ? void 0 : i.substring(n, s),
      toUpperCase: vm.toUpperCaseNoAccent,
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
      for: Fo.hbsForLoop,
      // fixes “Missing helper: for”
      range: (i, n) => Array.from({ length: n - i + 1 }, (s, r) => i + r),
      ifGte: (i, n, s) => i >= n ? s.fn(this) : s.inverse(this),
      // Damage / weapons (legacy-compatible)
      weaponDamageLetter: Tm.letter,
      weaponDamageCode: It.damageCode,
      weaponDamageValue: It.damageValue,
      weaponArmorMode: It.armorMode,
      weaponRangeList: It.getRangeList,
      // Icons
      iconFA: V.fontAwesome,
      iconSrc: V.iconSystemPath,
      iconPath: V.iconPath,
      iconD6: V.iconD6,
      // Enums
      localizeAttribute: Te.localizeAttribute
    };
    e.registerHelper(t), e !== Handlebars && Handlebars.registerHelper(t);
  }
  static hbsForLoop(e, t, i) {
    let n = "";
    for (let s = e; s < t; ++s) n += i.fn(s);
    return n;
  }
}
const $l = "sheetTheme", Or = "mwd-theme-default", og = "mwd-theme-sra", lg = [
  { name: "Default (CSB)", cssClass: Or },
  { name: "SRA", cssClass: og }
];
class cg {
  constructor() {
    this.availableStyles = {}, Vi.register(We.REGISTER_STYLES), Hooks.once(We.REGISTER_STYLES, (e) => lg.forEach((t) => e(t.cssClass, t.name))), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(We.REGISTER_STYLES, (e, t) => this.availableStyles[e] = t), console.log(ve + "Loaded styles", this.availableStyles), game.settings.register(w, $l, {
      scope: "world",
      name: "Sheet Theme",
      hint: "Select the visual theme used by MWD sheets.",
      config: !0,
      default: Or,
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
    const e = game.settings.get(w, $l);
    return this.availableStyles[e] ? e : Or;
  }
}
const ug = /* @__PURE__ */ new Set([A.actorTypes.vehicle, A.actorTypes.battlemech]), dg = Object.freeze({
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
function mg(a) {
  const e = Math.trunc(Number(a ?? 0));
  return Number.isFinite(e) ? Math.min(18, Math.max(3, e)) : 10;
}
function fd(a = null) {
  return String((a == null ? void 0 : a.type) ?? a ?? "").trim();
}
function fg(a = null) {
  var t, i;
  const e = ((i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.mwd) == null ? void 0 : i.locations) ?? {};
  return Object.entries(e).filter(([, n]) => (n == null ? void 0 : n.enabled) !== !1).map(([n]) => n);
}
function we(a, e = [], t = "core") {
  const i = new Set(fg(a));
  return e.find((n) => i.has(n)) ?? e[0] ?? t;
}
function pg(a = "") {
  return a === "head" ? "head" : a.includes("Arm") ? "arms" : a.includes("Leg") ? "legs" : ["front", "side", "rear", "rotor"].includes(a) ? "motive" : a === "turret" ? "weapon" : a.includes("torso") ? "torso" : "core";
}
function hg(a, e) {
  return e <= 4 ? { locationKey: we(a, ["core", "torsoFront"]), family: "critical" } : e === 5 ? { locationKey: we(a, ["leftLeg", "rightLeg"]), family: "legs" } : e === 6 ? { locationKey: we(a, ["rightLeg", "leftLeg"]), family: "legs" } : e === 7 ? { locationKey: we(a, ["leftArm", "rightArm"]), family: "arms" } : e === 8 ? { locationKey: we(a, ["rightArm", "leftArm"]), family: "arms" } : e <= 10 ? { locationKey: we(a, ["torsoFront", "core"]), family: "torso" } : e === 11 ? { locationKey: we(a, ["core", "torsoFront"]), family: "core" } : e <= 13 ? { locationKey: we(a, ["torsoRear", "core"]), family: "torso" } : e === 14 ? { locationKey: we(a, ["leftArm", "rightArm"]), family: "arms" } : e === 15 ? { locationKey: we(a, ["rightArm", "leftArm"]), family: "arms" } : e === 16 ? { locationKey: we(a, ["leftArm", "rightArm"]), family: "arms" } : e === 17 ? { locationKey: we(a, ["leftLeg", "rightLeg"]), family: "legs" } : { locationKey: we(a, ["head", "torsoFront", "core"]), family: "head" };
}
function gg(a, e) {
  return e <= 4 ? { locationKey: we(a, ["core", "front"]), family: "critical" } : e === 5 ? { locationKey: we(a, ["front", "core"]), family: "motive" } : e <= 7 ? { locationKey: we(a, ["side", "front"]), family: "motive" } : e === 8 ? { locationKey: we(a, ["rear", "side"]), family: "motive" } : e === 9 ? { locationKey: we(a, ["front", "core"]), family: "motive" } : e === 10 ? { locationKey: we(a, ["core", "front"]), family: "core" } : e === 11 ? { locationKey: we(a, ["turret", "core"]), family: "weapon" } : e === 12 ? { locationKey: we(a, ["side", "front"]), family: "motive" } : e === 13 ? { locationKey: we(a, ["rear", "side"]), family: "motive" } : e === 14 ? { locationKey: we(a, ["front", "side"]), family: "motive" } : e === 15 ? { locationKey: we(a, ["core", "rear"]), family: "core" } : e === 16 ? { locationKey: we(a, ["turret", "core"]), family: "weapon" } : e === 17 ? { locationKey: we(a, ["side", "front", "rotor"]), family: "motive" } : { locationKey: we(a, ["core", "front"]), family: "core" };
}
function as(a = "") {
  return dg[a] ?? (String(a ?? "").trim() || "Location");
}
function Os(a = null) {
  return ug.has(fd(a));
}
function pd() {
  if (typeof Roll == "function")
    try {
      const a = new Roll("3d6"), e = a.evaluate({ async: !1 });
      return Number((e == null ? void 0 : e.total) ?? a.total ?? 10) || 10;
    } catch {
    }
  return Array.from({ length: 3 }, () => 1 + Math.floor(Math.random() * 6)).reduce((a, e) => a + e, 0);
}
function hd({
  actor: a = null,
  rollTotal: e = pd(),
  armorBefore: t = 0,
  structureBefore: i = 0
} = {}) {
  const n = fd(a), s = mg(e), r = Math.max(0, Number(t ?? 0) || 0) <= 0, o = n === A.actorTypes.battlemech ? hg(a, s) : gg(a, s), l = s <= 4, c = r && s >= 16, u = l || c, d = !u && s >= 16, m = s === 18 && n === A.actorTypes.battlemech ? we(a, ["torsoFront", "core"]) : o.locationKey, f = o.family || pg(o.locationKey);
  return {
    rollTotal: s,
    actorType: n,
    locationKey: o.locationKey,
    locationLabel: as(o.locationKey),
    locationFamily: f,
    isForcedCritical: l,
    isStructureCritical: c,
    isAutomaticCritical: u,
    chaosCriticalOption: d,
    chaosTargetLocationKey: m,
    chaosTargetLocationLabel: as(m),
    descriptiveOnly: !u,
    pureStructureHit: r,
    armorBefore: Math.max(0, Number(t ?? 0) || 0),
    structureBefore: Math.max(0, Number(i ?? 0) || 0)
  };
}
const _r = Object.freeze({
  emergencyRepair: Object.freeze({
    key: "emergencyRepair",
    label: "Emergency Repair",
    actionId: "machineCritEmergencyRepair",
    actionLabel: "Emergency Repair",
    resource: "sa",
    cost: 2,
    category: "complex"
  }),
  systemReset: Object.freeze({
    key: "systemReset",
    label: "System Reset",
    actionId: "machineCritSystemReset",
    actionLabel: "System Reset",
    resource: "sa",
    cost: 2,
    category: "complex"
  }),
  coolantDump: Object.freeze({
    key: "coolantDump",
    label: "Coolant Dump",
    actionId: "machineCritCoolantDump",
    actionLabel: "Coolant Dump",
    resource: "sa",
    cost: 2,
    category: "complex"
  }),
  feedReset: Object.freeze({
    key: "feedReset",
    label: "Feed Reset",
    actionId: "machineCritFeedReset",
    actionLabel: "Feed Reset",
    resource: "sa",
    cost: 2,
    category: "complex"
  }),
  pilotRecovery: Object.freeze({
    key: "pilotRecovery",
    label: "Pilot Recovery",
    actionId: "machineCritPilotRecovery",
    actionLabel: "Pilot Recovery",
    resource: "sa",
    cost: 2,
    category: "complex"
  })
});
function Uo(a = "") {
  const e = String(a ?? "").trim();
  return _r[e] ?? _r.emergencyRepair;
}
function yg(a = "") {
  return Object.prototype.hasOwnProperty.call(_r, String(a ?? "").trim());
}
const gd = "machineCritical", xn = "machineCriticalTableGeneralUuid", yd = "machineCriticalTableBattlemechUuid", bd = "machineCriticalTableVehicleUuid", vi = Object.freeze({
  general: "Compendium.mwd.critical-hit-tables.RollTable.MWDGeneralCrit01",
  battlemech: "Compendium.mwd.critical-hit-tables.RollTable.MWDMechCrits0001",
  vehicle: "Compendium.mwd.critical-hit-tables.RollTable.MWDVehicleCrit1"
}), bg = /* @__PURE__ */ new Set(["physical", "fatigue", ""]), Bl = Object.freeze({
  2: Object.freeze({ key: "cascade", remedyKey: "emergencyRepair", gates: [], mods: [], resourceEffects: {}, pilotDamage: {}, escalationKey: "cascade" }),
  3: Object.freeze({ key: "weaponFeedDamage", remedyKey: "feedReset", gates: ["attack", "groupFire"], mods: ["attackCQPenalty"], resourceEffects: {}, pilotDamage: {}, escalationKey: "" }),
  4: Object.freeze({ key: "sensorDisruption", remedyKey: "systemReset", gates: ["sensor"], mods: ["sensorPenalty"], resourceEffects: {}, pilotDamage: {}, escalationKey: "" }),
  5: Object.freeze({ key: "motiveDamage", remedyKey: "emergencyRepair", gates: ["move"], mods: ["pilotingPenalty"], resourceEffects: {}, pilotDamage: {}, escalationKey: "" }),
  6: Object.freeze({ key: "heatSpike", remedyKey: "coolantDump", gates: [], mods: [], resourceEffects: { heatImmediate: 1, heatPerAttack: 0 }, pilotDamage: {}, escalationKey: "heat" }),
  7: Object.freeze({ key: "weaponMountDamage", remedyKey: "emergencyRepair", gates: ["attack"], mods: ["attackCQPenalty"], resourceEffects: {}, pilotDamage: {}, escalationKey: "" }),
  8: Object.freeze({ key: "controlsJolt", remedyKey: "pilotRecovery", gates: [], mods: ["pilotingPenalty"], resourceEffects: {}, pilotDamage: { track: "fatigue", amount: 1 }, escalationKey: "" }),
  9: Object.freeze({ key: "actuatorDamage", remedyKey: "emergencyRepair", gates: ["move"], mods: ["pilotingPenalty"], resourceEffects: {}, pilotDamage: {}, escalationKey: "" }),
  10: Object.freeze({ key: "targetingFault", remedyKey: "systemReset", gates: ["attack", "sensor"], mods: ["attackCQPenalty", "sensorPenalty"], resourceEffects: {}, pilotDamage: {}, escalationKey: "" }),
  11: Object.freeze({ key: "coolingLeak", remedyKey: "coolantDump", gates: [], mods: [], resourceEffects: { heatPerAttack: 1, heatImmediate: 0 }, pilotDamage: {}, escalationKey: "heat" }),
  12: Object.freeze({ key: "reactorInstability", remedyKey: "coolantDump", gates: ["move"], mods: ["pilotingPenalty"], resourceEffects: { heatImmediate: 1, heatPerAttack: 1 }, pilotDamage: {}, escalationKey: "reactor" })
});
function Sd() {
  return typeof foundry < "u" && (foundry == null ? void 0 : foundry.utils);
}
function Ho(a) {
  return Sd() && typeof foundry.utils.deepClone == "function" ? foundry.utils.deepClone(a) : JSON.parse(JSON.stringify(a ?? null));
}
function Sg() {
  return Sd() && typeof foundry.utils.randomID == "function" ? foundry.utils.randomID() : Math.random().toString(36).slice(2, 18).padEnd(16, "0").slice(0, 16);
}
function Ag() {
  try {
    return (/* @__PURE__ */ new Date()).toISOString();
  } catch {
    return "";
  }
}
function zl(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
function Fl(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? a : {};
}
function wg(a = {}) {
  var e, t, i, n, s, r, o, l;
  return ((t = (e = a == null ? void 0 : a.flags) == null ? void 0 : e.mwd) == null ? void 0 : t.crit) ?? ((s = (n = (i = a == null ? void 0 : a.document) == null ? void 0 : i.flags) == null ? void 0 : n.mwd) == null ? void 0 : s.crit) ?? ((l = (o = (r = a == null ? void 0 : a.data) == null ? void 0 : r.flags) == null ? void 0 : o.mwd) == null ? void 0 : l.crit) ?? a;
}
function Tg(a, e, t) {
  if (!t) return null;
  const i = new Error(a);
  throw i.validationErrors = e.length ? e : [a], i;
}
function Ul(a = 7) {
  const e = Math.min(12, Math.max(2, Math.trunc(Number(a ?? 7)) || 7));
  return Ho(Bl[e] ?? Bl[7]);
}
function an(a = {}, { strict: e = !1 } = {}) {
  const t = wg(a), i = [], n = String((t == null ? void 0 : t.key) ?? "").trim(), s = String((t == null ? void 0 : t.remedyKey) ?? "emergencyRepair").trim() || "emergencyRepair", r = zl(t == null ? void 0 : t.gates).map((f) => String(f ?? "").trim()).filter(Boolean), o = zl(t == null ? void 0 : t.mods).map((f) => String(f ?? "").trim()).filter(Boolean), l = Fl(t == null ? void 0 : t.resourceEffects), c = Fl(t == null ? void 0 : t.pilotDamage), u = String((t == null ? void 0 : t.escalationKey) ?? "").trim();
  n || i.push("Critical signal key cannot be blank."), yg(s) || i.push(`Unknown machine critical remedy "${s}".`);
  for (const [f, p] of Object.entries(l))
    Number.isFinite(Number(p)) || i.push(`Resource effect "${f}" must be numeric.`);
  const d = String((c == null ? void 0 : c.track) ?? "").trim(), m = Number((c == null ? void 0 : c.amount) ?? 0);
  return bg.has(d) || i.push(`Pilot damage track "${d}" is invalid.`), (!Number.isFinite(m) || m < 0) && i.push("Pilot damage amount must be non-negative."), i.length ? (Tg(i[0], i, e), null) : {
    key: n,
    remedyKey: s,
    gates: r,
    mods: o,
    resourceEffects: Object.fromEntries(
      Object.entries(l).map(([f, p]) => [String(f), Number(p)])
    ),
    pilotDamage: d || m ? { track: d || "fatigue", amount: Math.trunc(m) } : {},
    escalationKey: u
  };
}
function Ad(a, e = {}) {
  var i, n;
  return (Array.isArray((n = (i = a == null ? void 0 : a.system) == null ? void 0 : i.mwd) == null ? void 0 : n.crits) ? a.system.mwd.crits : []).filter((s) => s && s.active !== !1).filter((s) => !e.key || s.key === e.key).filter((s) => !e.locationKey || s.locationKey === e.locationKey).filter((s) => !e.locationFamily || s.locationFamily === e.locationFamily).filter((s) => !e.gate || Array.isArray(s.gates) && s.gates.includes(e.gate)).filter((s) => !e.mod || Array.isArray(s.mods) && s.mods.includes(e.mod));
}
function Hl(a, e) {
  var s, r;
  const t = ((r = (s = a == null ? void 0 : a.system) == null ? void 0 : s.monitors) == null ? void 0 : r[e]) ?? {}, i = Math.max(0, Number(t.max ?? 0) || 0), n = Math.min(i, Math.max(0, Number(t.value ?? 0) || 0));
  return {
    max: i,
    value: n,
    remaining: Math.max(0, i - n)
  };
}
function vg(a) {
  return (a == null ? void 0 : a.type) === A.actorTypes.vehicle || (a == null ? void 0 : a.type) === A.actorTypes.battlemech;
}
function kg(a, e, t, i) {
  return {
    ...e != null && e.hitLocation && typeof e.hitLocation == "object" ? e.hitLocation : hd({
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
function wd(a = {}, e = !1) {
  return e && a.chaosTargetLocationKey ? {
    locationKey: a.chaosTargetLocationKey,
    locationFamily: a.locationFamily === "head" ? "torso" : a.locationFamily,
    locationLabel: a.chaosTargetLocationLabel ?? as(a.chaosTargetLocationKey)
  } : {
    locationKey: a.locationKey,
    locationFamily: a.locationFamily,
    locationLabel: a.locationLabel ?? as(a.locationKey)
  };
}
function Mg(a = {}, e = !1) {
  return !!(a.isAutomaticCritical || a.chaosCriticalOption && e);
}
function Eg({
  actor: a = null,
  payload: e = {},
  hitLocation: t = null,
  chaosCriticalSelected: i = !1
} = {}) {
  if (!vg(a)) return { ok: !1, reason: "Machine damage requires a vehicle or BattleMech actor." };
  const n = Math.max(0, Math.ceil(Number((e == null ? void 0 : e.damage) ?? (e == null ? void 0 : e.amount) ?? 0) || 0)), s = Hl(a, A.monitors.armor), r = Hl(a, A.monitors.structure), o = t ? { ...t, armorBefore: s.remaining, structureBefore: r.remaining, pureStructureHit: s.remaining <= 0 } : kg(a, e, s.remaining, r.remaining), l = Math.min(n, a.type === A.actorTypes.vehicle && s.max <= 0 ? 0 : s.remaining), c = Math.min(r.remaining, Math.max(0, n - l)), u = Math.min(s.max, s.value + l), d = Math.min(r.max, r.value + c), m = Mg(o, i), f = wd(o, i), p = c > 0 || m;
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
function Ba(a, e = "") {
  var t, i;
  try {
    return ((i = (t = game == null ? void 0 : game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, w, a)) || e;
  } catch {
    return e;
  }
}
function Cg(a = null) {
  return (a == null ? void 0 : a.type) === A.actorTypes.battlemech ? Ba(yd, vi.battlemech) || Ba(xn, vi.general) : (a == null ? void 0 : a.type) === A.actorTypes.vehicle && Ba(bd, vi.vehicle) || Ba(xn, vi.general);
}
async function Pg(a = null, e = "") {
  const t = String(e || Cg(a)).trim();
  if (!t || typeof fromUuid != "function") return null;
  try {
    return await fromUuid(t);
  } catch (i) {
    return console.warn("MWD | Unable to resolve machine critical table", t, i), null;
  }
}
async function Wl({ actor: a = null, drawFn: e = null, tableUuid: t = "", recursiveCascade: i = !1 } = {}) {
  var l;
  if (typeof e == "function") {
    const c = await e({ actor: a, recursiveCascade: i }), u = an((c == null ? void 0 : c.signal) ?? c, { strict: !0 });
    return {
      signal: u,
      label: String((c == null ? void 0 : c.label) ?? u.key).trim() || u.key,
      tableUuid: String((c == null ? void 0 : c.tableUuid) ?? t ?? "").trim(),
      resultId: String((c == null ? void 0 : c.resultId) ?? "").trim(),
      rollTotal: Number((c == null ? void 0 : c.rollTotal) ?? 0) || null
    };
  }
  const n = await Pg(a, t);
  if (!(n != null && n.draw)) return { error: "Machine critical table is not configured." };
  const s = await n.draw({ displayChat: !1 }), r = Array.from((s == null ? void 0 : s.results) ?? [])[0] ?? null;
  if (!r) return { error: "Machine critical table returned no result." };
  const o = an(r, { strict: !0 });
  return {
    signal: o,
    label: String((r == null ? void 0 : r.text) ?? (r == null ? void 0 : r.name) ?? o.key).trim() || o.key,
    tableUuid: n.uuid ?? t,
    resultId: r.id ?? r._id ?? "",
    rollTotal: Number(((l = s == null ? void 0 : s.roll) == null ? void 0 : l.total) ?? 0) || null
  };
}
function Qs({ actor: a, drawn: e, hitLocation: t, source: i = {}, cascade: n = !1 } = {}) {
  var l, c;
  const s = an((e == null ? void 0 : e.signal) ?? e, { strict: !0 }), r = Uo(s.remedyKey), o = wd(t, !1);
  return {
    id: Sg(),
    key: s.key,
    label: String((e == null ? void 0 : e.label) ?? s.key).trim() || s.key,
    tableUuid: String((e == null ? void 0 : e.tableUuid) ?? "").trim(),
    resultId: String((e == null ? void 0 : e.resultId) ?? "").trim(),
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
    createdRound: Number(((c = (l = globalThis.game) == null ? void 0 : l.combat) == null ? void 0 : c.round) ?? 0) || 0,
    createdAt: Ag(),
    source: Ho(i ?? {}),
    actorType: (a == null ? void 0 : a.type) ?? ""
  };
}
async function Ng({
  actor: a = null,
  hitLocation: e = {},
  source: t = {},
  drawFn: i = null,
  tableUuid: n = ""
} = {}) {
  try {
    const s = await Wl({ actor: a, drawFn: i, tableUuid: n, recursiveCascade: !1 });
    if (s != null && s.error) return { ok: !1, reason: s.error, crits: [] };
    const r = an(s.signal, { strict: !0 });
    if (r.key !== "cascade")
      return { ok: !0, crits: [Qs({ actor: a, drawn: s, hitLocation: e, source: t })], cascade: !1 };
    const o = await Wl({ actor: a, drawFn: i, tableUuid: n, recursiveCascade: !0 }), l = o != null && o.error ? Ul(12) : an(o.signal, { strict: !0 }), c = l.key === "cascade" ? { signal: Ul(12), label: "Reactor Instability", tableUuid: (o == null ? void 0 : o.tableUuid) ?? "", resultId: (o == null ? void 0 : o.resultId) ?? "" } : { ...o, signal: l };
    return {
      ok: !0,
      cascade: !0,
      crits: [
        Qs({ actor: a, drawn: { ...s, signal: r }, hitLocation: e, source: t, cascade: !0 }),
        Qs({ actor: a, drawn: c, hitLocation: e, source: t })
      ]
    };
  } catch (s) {
    return { ok: !1, reason: (s == null ? void 0 : s.message) ?? "Unable to draw machine critical.", crits: [] };
  }
}
function Rg(a, e) {
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
async function Ig(a, e) {
  if (!(!(a != null && a.toggleStatusEffect) || !e))
    try {
      await vs({
        actor: a,
        statusId: gd,
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
async function Dg({
  actor: a = null,
  token: e = null,
  payload: t = {},
  options: i = {}
} = {}) {
  var c, u;
  const n = Eg({
    actor: a,
    payload: t,
    chaosCriticalSelected: !!(t != null && t.chaosCriticalSelected)
  });
  if (!n.ok) return n;
  const s = !!i.dryRun;
  let r = { ok: !0, crits: [] };
  !s && n.critical.selected && (r = await Ng({
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
  const o = Array.isArray((u = (c = a == null ? void 0 : a.system) == null ? void 0 : c.mwd) == null ? void 0 : u.crits) ? Ho(a.system.mwd.crits) : [], l = r.ok && r.crits.length ? o.concat(r.crits) : o;
  if (!s) {
    const d = {
      "system.monitors.armor.value": n.machine.armorDamageAfter,
      "system.monitors.structure.value": n.machine.structureDamageAfter,
      ...Rg(a, n)
    };
    r.ok && r.crits.length && (d["system.mwd.crits"] = l), await a.update(d), await Ig(a, l.some((m) => (m == null ? void 0 : m.active) !== !1));
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
function jl(a) {
  const e = Number(a ?? 0);
  return Number.isFinite(e) ? Math.trunc(e) : 0;
}
function Ua(a) {
  return a === A.monitors.physical ? "Physical" : a === A.monitors.fatigue ? "Fatigue" : String(a ?? "").trim() || "Track";
}
function Og({
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
function qa(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function Js(a, e) {
  var i, n, s;
  if (!a) return null;
  const t = qa(e) ?? qa(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((s = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : s.call(i, ((n = t == null ? void 0 : t.baseActor) == null ? void 0 : n.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function wn(a, e) {
  var t, i, n;
  return Math.max(0, Number(((n = (i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.monitors) == null ? void 0 : i[e]) == null ? void 0 : n.value) ?? 0) || 0);
}
function Kl(a) {
  var e, t;
  return Math.max(0, Number(((t = (e = a == null ? void 0 : a.system) == null ? void 0 : e.burn) == null ? void 0 : t.value) ?? 0) || 0);
}
function _g(a) {
  return (a == null ? void 0 : a.type) === A.actorTypes.character || (a == null ? void 0 : a.type) === A.actorTypes.npc;
}
function Lg(a) {
  return (a == null ? void 0 : a.type) === A.actorTypes.vehicle || (a == null ? void 0 : a.type) === A.actorTypes.battlemech;
}
function xg(a) {
  return [
    A.actorTypes.character,
    A.actorTypes.npc,
    A.actorTypes.vehicle,
    A.actorTypes.battlemech
  ].includes(a == null ? void 0 : a.type);
}
function $g(a, e) {
  const t = String(a ?? "").trim();
  return t === "status" ? xg(e) : t === "machineAttackDamage" ? Lg(e) : _g(e);
}
function Bg(a, e) {
  var t;
  return ((t = Co(e).find((i) => i.id === a)) == null ? void 0 : t.label) ?? a;
}
function zg(a) {
  var i, n, s, r;
  const e = foundry.utils.escapeHTML, t = [];
  if (a.mode === "machineAttackDamage") {
    const o = a.appliedDelta >= 0 ? "Applied" : "Recovered";
    t.push(`<div><b>${o}:</b> ${Number(a.damageIncoming ?? a.requestedDelta ?? 0)} machine damage</div>`), (i = a.hitLocation) != null && i.locationLabel && t.push(`<div><b>Location:</b> ${e(a.hitLocation.locationLabel)} (${Number(a.hitLocation.rollTotal ?? 0)})</div>`), a.machine && (t.push(`<div><b>Armor:</b> ${Number(a.machine.armorBefore ?? 0)} -> ${Number(a.machine.armorAfter ?? 0)}</div>`), t.push(`<div><b>Structure:</b> ${Number(a.machine.structureBefore ?? 0)} -> ${Number(a.machine.structureAfter ?? 0)}</div>`)), (s = (n = a.critical) == null ? void 0 : n.records) != null && s.length ? t.push(`<div><b>Critical:</b> ${e(a.critical.records.map((l) => l.label).join(", "))}</div>`) : (r = a.critical) != null && r.reason && t.push(`<div><b>Critical:</b> ${e(a.critical.reason)}</div>`);
  }
  if (a.mode === "attackDamage" || a.mode === "trackDelta") {
    const o = a.appliedDelta >= 0 ? "Applied" : "Recovered", l = Math.abs(Number(a.appliedDelta ?? 0)), c = l === 1 ? "point" : "points", u = a.usedArmor ? ` via armor-aware ${e(Vt(a.damageType))}` : "";
    t.push(`<div><b>${o}:</b> ${l} ${c} to ${e(Ua(a.track))}${u}</div>`), a.usedArmor && a.mitigation && (t.push(
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
function Fg(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
class vt {
  static supportsActor(e, { mode: t = "" } = {}) {
    return $g(t, e);
  }
  static getActorOptions({ mode: e = "" } = {}) {
    return Array.from(game.actors ?? []).filter((t) => this.supportsActor(t, { mode: e })).sort((t, i) => String(t.name ?? "").localeCompare(String(i.name ?? ""))).map((t) => ({
      id: t.id,
      name: t.name || "Character"
    }));
  }
  static getStatusOptions(e = null) {
    return Co(e).map((t) => ({
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
      const r = qa(t[0]), o = Js((r == null ? void 0 : r.actor) ?? null, r);
      return this._resolveSceneTargetResult(o, r, { mode: e });
    }
    const i = Array.from(((s = game.user) == null ? void 0 : s.targets) ?? []);
    if (i.length > 1)
      return { actor: null, token: null, reason: "Target only one token." };
    if (i.length === 1) {
      const r = qa(i[0]), o = Js((r == null ? void 0 : r.actor) ?? null, r);
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
    const r = qa(t);
    if (r) {
      const u = Js((r == null ? void 0 : r.actor) ?? e, r), d = this._resolveSceneTargetResult(u, r, { mode: s });
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
      const u = zg(l), d = Fg({
        speaker: ChatMessage.getSpeaker({ actor: r.actor, token: r.token }),
        content: u
      });
      await ChatMessage.create(d);
    }
    return n.dryRun || (c = x.renderOpenCharacterSheets) == null || c.call(x, r.actor.id), l;
  }
  static async _applyTrackDelta(e, t, i = {}) {
    const n = (t == null ? void 0 : t.track) === A.monitors.fatigue ? A.monitors.fatigue : A.monitors.physical, s = jl((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0);
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
    const o = wn(e, n);
    i.dryRun || await U.addCounter(e, n, s);
    const l = i.dryRun ? Math.max(0, o + s) : wn(e, n);
    return {
      mode: "trackDelta",
      track: n,
      requestedDelta: s,
      appliedDelta: l - o,
      usedArmor: !1,
      beforeLabel: `${Ua(n)} ${o}`,
      afterLabel: `${Ua(n)} ${l}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyBurnDelta(e, t) {
    var l, c;
    const i = jl((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0), n = Kl(e), s = Math.max(0, n + i), r = { "system.burn.value": s };
    s === 0 && ((c = (l = e.system) == null ? void 0 : l.burn) != null && c.overloaded) && (r["system.burn.overloaded"] = !1), await e.update(r);
    const o = Kl(e);
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
    const n = Ji(e, i), s = !!(t != null && t.active);
    await vs({
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
    const r = Ji(e, i);
    return {
      mode: "status",
      statusId: i,
      statusLabel: Bg(i, e),
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
    return Dg({ actor: e, token: t, payload: i, options: n });
  }
  static async _applyPersonalArmorAwareDamage(e, t, i = {}) {
    var H, Y, Q, K, G, L, z, q, ee;
    const n = !!i.dryRun, s = (t == null ? void 0 : t.track) === A.monitors.fatigue ? A.monitors.fatigue : A.monitors.physical, r = Math.max(0, Number((t == null ? void 0 : t.damage) ?? 0) || 0), o = Math.max(0, Number((t == null ? void 0 : t.netHits) ?? 0) || 0), l = (t == null ? void 0 : t.effects) ?? {}, c = ((H = e.getPersonalCombatLoadout) == null ? void 0 : H.call(e, { refresh: !0 })) ?? null, u = (c == null ? void 0 : c.activeArmor) ?? null, d = Math.max(0, Number((u == null ? void 0 : u.currentArmorRating) ?? ((Y = u == null ? void 0 : u.durability) == null ? void 0 : Y.current) ?? 0) || 0), m = qt(t == null ? void 0 : t.damageType, "concussive"), f = wn(e, s);
    let p = r + o;
    const h = d > 0 ? Mf({
      damageIncoming: p,
      armorTags: (u == null ? void 0 : u.tags) ?? [],
      effects: l
    }) : { damageIncoming: p, applied: [] };
    p = h.damageIncoming;
    const g = kf({
      currentArmorRating: d,
      mitigationByType: (u == null ? void 0 : u.mitigationByType) ?? {},
      damageType: m
    }), y = Math.max(
      0,
      (Number((t == null ? void 0 : t.ap) ?? 0) || 0) + (Number((l == null ? void 0 : l.ap) ?? 0) || 0)
    ), b = g.isDestroyed ? 0 : Math.max(0, g.baseMitigation + g.typeMitigationMod - y);
    let S = Math.max(0, Math.ceil(p - b));
    const T = {
      snapshot: ((Q = x.getSnapshot) == null ? void 0 : Q.call(x, e)) ?? null
    }, E = Rt({
      actor: e,
      phase: "onDamageResolved",
      facts: Hu({
        actor: e,
        packet: {
          amount: S,
          track: s,
          damageType: m
        },
        runtime: T
      }),
      packet: {
        amount: S,
        track: s,
        damageType: m
      },
      options: { runtime: T, consumeUsage: !0 }
    });
    n || await fi({ actor: e, mutations: E.mutations, runtime: T }), S = Math.max(0, Number(E.packet.amount ?? S) || 0), !n && S > 0 && await U.addCounter(e, s, S);
    const P = Og({
      incomingDamage: r + o,
      armorBefore: ((K = u == null ? void 0 : u.durability) == null ? void 0 : K.current) ?? 0,
      reinforcedBefore: ((L = (G = u == null ? void 0 : u.traitState) == null ? void 0 : G.reinforced) == null ? void 0 : L.current) ?? 0,
      reinforcedMax: ((q = (z = u == null ? void 0 : u.traitState) == null ? void 0 : z.reinforced) == null ? void 0 : q.max) ?? 0,
      hasArmorItem: !!((ee = u == null ? void 0 : u.item) != null && ee.id)
    });
    !n && Object.keys(P.update).length > 0 && await u.item.update(P.update);
    const C = n ? Math.max(0, f + S) : wn(e, s);
    return {
      mode: (t == null ? void 0 : t.mode) ?? "attackDamage",
      track: s,
      requestedDelta: r + o,
      appliedDelta: C - f,
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
      beforeLabel: `${Ua(s)} ${f}`,
      afterLabel: `${Ua(s)} ${C}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
}
D(vt, "MODE_OPTIONS", Object.freeze([
  { value: A.monitors.physical, label: "Physical" },
  { value: A.monitors.fatigue, label: "Fatigue" },
  { value: "burn", label: "Burn" },
  { value: "status", label: "Status" }
]));
const Gl = Yn, Lr = "damage-mode", Ug = `${w}.${Lr}`, Tn = {}, Xs = {};
class me {
  static init() {
    Vi.register(We.PROVIDE_DAMAGE_MODE), Hooks.on("updateSetting", async (e, t, i, n) => me.onUpdateSetting(e, t, i, n)), Hooks.on(We.PROVIDE_DAMAGE_MODE, (e) => {
      e("resistanceArmorMonitor", v.settings.damageMode.values.resistanceArmorMonitor, me.sufferDamageResistanceArmorMonitor), e("armorResistanceMonitor", v.settings.damageMode.values.armorResistanceMonitor, me.sufferDamageArmorResistanceMonitor), e("armorGivesResistance", v.settings.damageMode.values.armorGivesResistance, me.sufferDamageArmorAsResistance_Earthdawn), e("armorGiveResistanceHitsAvoid", v.settings.damageMode.values.armorGiveResistanceHitsAvoid, me.sufferDamageArmorAsResistance_Cyberpunk);
    }), Hooks.once("ready", () => me.onReady());
  }
  static onReady() {
    me._registerDamageModeSetting(), me._selectDamageMode();
  }
  static _registerDamageModeSetting() {
    Hooks.callAll(We.PROVIDE_DAMAGE_MODE, (e, t, i) => {
      Tn[e] = t, Xs[e] = i;
    }), game.settings.register(w, Lr, {
      scope: "world",
      name: v.settings.damageMode.name,
      hint: v.settings.damageMode.hint,
      config: !0,
      default: Object.keys(Tn)[0],
      choices: Tn,
      type: String
    });
  }
  static async onUpdateSetting(e, t, i, n) {
    e.key == Ug && me._selectDamageMode();
  }
  static _selectDamageMode() {
    let e = game.settings.get(w, Lr);
    Xs[e] || (e = Object.keys(Tn)[0]), me.damageModeCode = e, me.damageModeMethod = Xs[e];
  }
  static async sufferDamage(e, t, i, n, s, r, o) {
    const { monitor: l, damageType: c } = me._resolveDamageContext(e, t, o);
    if (ea.checkActorCanReceiveDamage(c ?? l, l, e), me._shouldUsePersonalDamageV2(e, l, o)) {
      await me.sufferPersonalDamageV2(e, l, c, i, n, s, r, o);
      return;
    }
    await (me.damageModeMethod ?? me.sufferDamageResistanceArmorMonitor)(e, l, c, i, n, s, r), await e.applyArmorDamage(l, c, ue.sumModifiers([o], "other", "damageArmor"));
  }
  static _shouldUsePersonalDamageV2(e, t, i) {
    var n, s;
    return !((n = e == null ? void 0 : e.isCharacterLike) != null && n.call(e)) || ![A.monitors.physical, A.monitors.fatigue].includes(t) ? !1 : !!((s = i == null ? void 0 : i.isPersonalWeapon) != null && s.call(i) || (i == null ? void 0 : i.canonicalType) === A.itemType.personalWeapon || (i == null ? void 0 : i.type) === A.itemType.personalWeapon);
  }
  static async sufferPersonalDamageV2(e, t, i, n, s, r, o, l) {
    var d;
    const c = ((d = l == null ? void 0 : l.getCombatProfile) == null ? void 0 : d.call(l)) ?? l ?? null, u = await vt.apply({
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
    u != null && u.ok && me._notifyPersonalArmorMitigation(e, {
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
    const i = t.armorMitigation ?? {}, n = me._localizeDamageType(t.damageType), s = i.isDestroyed ? "Armor destroyed" : `Base ${Number(i.baseMitigation ?? 0)} + Type ${Number(i.typeMitigationMod ?? 0)} - AP ${Number(t.effectiveAp ?? 0)}`, r = Number(t.adjustedIncoming ?? t.baseIncoming ?? 0), o = Number(t.finalDamage ?? 0), l = (((u = t.tagEffectResult) == null ? void 0 : u.applied) ?? []).map((d) => `${d.tag} +${Math.round((Number(d.bonus ?? 0) || 0) * 100)}%`).join(", "), c = l ? ` [${l}]` : "";
    ui.notifications.info(
      `${e.name} mitigated ${n}: ${s}${c}. Incoming ${r}, final ${o}.`
    );
  }
  static async sufferDamageResistanceArmorMonitor(e, t, i, n, s, r, o) {
    const l = U.resistanceDetail(e, t, i), c = l.value;
    let u = 0;
    if (r) {
      const d = Math.min(c, n), m = Math.min(c - d, s);
      u = n - d, U.useArmor(t) && (u -= await me.damageToArmor(e, i, u)), u += s - m;
    } else
      u = n + s - c, U.useArmor(t) && (u -= await me.damageToArmor(e, i, u));
    u > 0 && await U.addCounter(e, t, u), me._notifyResistanceUsage(e, t, i, l);
  }
  static async sufferDamageArmorResistanceMonitor(e, t, i, n, s, r, o) {
    let l = 0;
    U.useArmor(t) ? r ? (n -= await me.damageToArmor(e, i, n), l = s + n) : (l = s + n, l -= await me.damageToArmor(e, i, l)) : l = n + s;
    const c = U.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await U.addCounter(e, t, l), me._notifyResistanceUsage(e, t, i, c), l;
  }
  static async sufferDamageArmorAsResistance_Cyberpunk(e, t, i, n, s, r, o) {
    let l = n + s;
    if (U.useArmor(t) && l > 0) {
      const u = r ? s : 0, d = Math.max(0, me._computeArmorResistance(e) - u);
      d > 0 && (await U.addCounter(e, "armor", 1), l -= d);
    }
    const c = U.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await U.addCounter(e, t, l), me._notifyResistanceUsage(e, t, i, c), Math.max(l, 0);
  }
  static async sufferDamageArmorAsResistance_Earthdawn(e, t, i, n, s, r, o) {
    let l = n + s;
    if (U.useArmor(t) && !r && l > 0) {
      const u = me._computeArmorResistance(e);
      u > 0 && (await U.addCounter(e, "armor", 1), l -= u);
    }
    l -= me._computeStrengthResistance(e, t);
    const c = U.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await U.addCounter(e, t, l), me._notifyResistanceUsage(e, t, i, c), l;
  }
  static async damageToArmor(e, t, i) {
    if (i > 0) {
      const n = U.max(e, A.monitors.armor), s = U.getCounterValue(e, A.monitors.armor), r = Math.min(n - s, i), o = U.resistance(e, A.monitors.armor, t), l = Math.max(0, r - o);
      return l > 0 && await U.addCounter(e, A.monitors.armor, l), r;
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
    const s = v.actor.monitors[t] ?? t, r = me._localizeDamageType(i) ?? s, o = n.usedType ? "type" : "default", l = ((u = v.actor.monitors.resistanceSources) == null ? void 0 : u[o]) ?? o, c = Ce(v.actor.monitors.resistanceApplied, {
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
      return Zc(e) ? Vt(e) : v.mwd.weaponDamageType[e] ?? v.mwd.personalDamageType[e] ?? v.actor.monitors[e] ?? e;
  }
  static _computeArmorResistance(e) {
    const t = U.max(e, "armor"), i = U.getCounterValue(e, "armor"), n = Math.max(0, t - i);
    return Math.max(0, Math.ceil(n / 3));
  }
  static _computeStrengthResistance(e, t) {
    const i = e.getAttributeValue(A.actorAttributes.strength);
    return Math.max(0, Math.floor(i / 4));
  }
}
class wt extends Actor {
  static init() {
    Hooks.on("updateActor", (e, t, i, n) => {
      var s;
      return (s = jt.firstResponsible(e)) == null ? void 0 : s.onUpdateActor(t, i);
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
      initiative: ue.sumModifiers(this.items, "other", "initiative")
    }, this.system.monitors) {
      const e = Te.getDamageTypes();
      Object.entries(this.system.monitors).forEach((t) => {
        t[1].resistance = wt.normalizeResistance(t[1].resistance), t[1].maxBonus = ue.sumMonitorModifiers(this.items, t[0], "max"), t[1].resistanceBonus = ue.sumMonitorModifiers(this.items, t[0], "resistance"), t[1].resistanceBonusByType = Object.fromEntries(
          e.map((i) => [i.value, ue.sumMonitorModifiers(this.items, t[0], "resistanceByType", i.value)]).filter(([, i]) => i)
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
    return va[this.type] ?? [];
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
    return t == 0 ? 0 : Lc + se.divup(t, 2);
  }
  getAttributeActions() {
    return De.getActorActions(this);
  }
  getUsableAttributes(e = void 0) {
    const t = (e ? [e] : this.items).map((n) => n.getAttributes()).reduce((n, s) => n.concat(s), []), i = se.distinct(this.getAttributes().concat(t));
    return i.sort(se.ascendingBySortedArray(Te.sortedAttributeKeys)), i;
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
      i += ue.sumModifiers(this.items, "attribute", e);
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
        await me.damageToArmor(this, t, i);
    }
  }
  async rollAttribute(e) {
    await ei.rollAttribute(this, e);
  }
  async rollAttributeAction(e) {
    const t = De.getActorAction(this, e);
    await ei.rollAttributeAction(this, t);
  }
  async rollSkill(e, t) {
    await ei.rollSkill(this, e, t);
  }
  async rollWeapon(e) {
    var s, r, o;
    ea.checkWeaponDefense(e, this);
    const t = (s = e.validateTargets(this)) == null ? void 0 : s.map((l) => l.id), i = {
      attackerTokenId: (o = (r = game.scenes.current) == null ? void 0 : r.tokens.find((l) => {
        var c;
        return ((c = l.actor) == null ? void 0 : c.id) == this.id;
      })) == null ? void 0 : o.id,
      targetedTokenIds: t
    }, n = this.items.find((l) => e.isWeaponSkill(l));
    await ei.rollWeapon(this, n, e, i);
  }
  async rollDefense(e) {
    const t = e.attack.defense, i = De.getActorDefense(this, t);
    await ei.rollDefense(this, i, e);
  }
  async switchMonitorCheck(e, t, i, n = void 0) {
    await U.switchMonitorCheck(this, e, t, i, n);
  }
  async addCounter(e, t, i = void 0) {
    await U.addCounter(this, e, t, i);
  }
  async setCounter(e, t, i = void 0) {
    await U.setCounter(this, e, t, i);
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
    const e = ue.sumModifiers(this.items, "other", "sceneAnarchy");
    e > 0 && await U.setCounter(this, A.monitors.sceneAnarchy, e);
  }
  async onLeaveCombat() {
    await U.setCounter(this, A.monitors.sceneAnarchy, 0);
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
    t != 0 && await U.addCounter(this, e, -t);
  }
  async spendEdge(e, t = A.counters.edgePools.grit) {
    if (e != 0) {
      if (!this.canUseEdge()) {
        const i = v.actorType[this.type] ?? this.type, n = `${this.name} (${i}) cannot use Edge`;
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
    const i = wt._prepareFavorite(e, t);
    return !!this.system.favorites.find((n) => wt._isSameFavorite(i, n));
  }
  static _prepareFavorite(e, t) {
    return { type: e, id: t };
  }
  static _isSameFavorite(e, t) {
    return e.id == t.id && e.type == t.type;
  }
  async switchFavorite(e, t, i) {
    const n = wt._prepareFavorite(t, i), s = this.system.favorites.filter((r) => !wt._isSameFavorite(n, r));
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
    const i = wt._prepareFavorite(e, t);
    if (e == "attributeAction") {
      const s = De.prepareShortcut(this, t);
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
const { ApplicationV2: Hg, HandlebarsApplicationMixin: Wg } = foundry.applications.api, { renderTemplate: ql } = foundry.applications.handlebars, jg = `${J}/chat/celebrity-roll.hbs`, ga = class ga extends Wg(Hg) {
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
        label: v.actor.counters.edgePools.legend,
        value: e.getCelebrityValue()
      },
      modifiers: foundry.utils.mergeObject(
        { label: v.item.tabs.modifiers },
        ue.computeModifiers(e.items, "other", "celebrity")
      ),
      other: {
        label: v.common.roll.modifiers.other,
        value: 0
      },
      ANARCHY: v
    }, i = await ql(`${J}/dialog/roll-celebrite-title.hbs`, t), n = {
      id: `roll-celebrity-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...ga.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new ga({ roll: t }, n).render({ force: !0 });
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
      await ga.doRoll(this.roll), await this.close();
    }), i.find('[data-action="cancel"]').on("click", async () => {
      await this.close();
    });
  }
  static async doRoll(e) {
    const t = [
      e.celebrity,
      e.modifiers,
      e.other
    ], i = se.sumValues(t, (o) => o.value), n = {
      actor: e.actor,
      parameters: t,
      pool: i,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      },
      ANARCHY: v
    }, s = new Roll(`${i}d6cs>=5`);
    await s.evaluate();
    const r = await ql(jg, n);
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
D(ga, "PARTS", {
  body: {
    template: `${J}/dialog/roll-celebrite.hbs`
  }
});
let xr = ga;
const { renderTemplate: Kg } = foundry.applications.handlebars, Gg = `${J}/chat/actor-say-word.hbs`;
class Vl extends wt {
  static get initiative() {
    return wt.initiative + " + max(@attributes.reflexes.value, @attributes.intelligence.value)";
  }
  hasOwnAnarchy() {
    return this.hasPlayerOwner;
  }
  prepareDerivedData() {
    !this.system.monitors.fatigue && this.system.monitors.stun && (this.system.monitors.fatigue = foundry.utils.duplicate(this.system.monitors.stun)), this.system.monitors.physical.max = this._getMonitorMax(A.actorAttributes.strength), this.system.monitors.fatigue.max = this._getMonitorMax(A.actorAttributes.willpower), super.prepareDerivedData(), this.system.ignoreWounds = ue.sumModifiers(this.items, "other", "ignoreWounds");
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
    return va[this.type] ?? va[A.actorTypes.character];
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
      content: await Kg(
        Gg,
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
      ea.checkSufficient(v.actor.counters.anarchy, e, i + t);
      const n = Math.min(t, e), s = e - n;
      n > 0 && U.addCounter(this, A.monitors.sceneAnarchy, -n), this.hasPlayerOwner ? (await game.system.anarchy.gmAnarchy.actorGivesAnarchyToGM(this, e), U.addCounter(this, A.monitors.anarchy, -s)) : s > 0 && super.spendAnarchy(s);
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
    await xr.create(this);
  }
}
function Yl(a) {
  const e = Math.max(0, Number(a) || 0);
  return -Math.floor(e / 3);
}
function $r(a) {
  const e = Math.max(0, Number(a) || 0);
  return e === 0 ? 0 : Math.ceil(e / 4);
}
function qg(a = {}) {
  const e = a.physical ?? {}, t = a.fatigue ?? {}, i = a.armor ?? {}, n = Number(e.value) || 0, s = Number(t.value) || 0, r = Math.max(Number(i.value) || 0, Number(i.max) || 0);
  return {
    physical: { penalty: Yl(n) },
    fatigue: { penalty: Yl(s) },
    armor: { resistance: $r(r) }
  };
}
const Zs = {
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
function Vg(a, e, t, i) {
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
function Yg() {
  return foundry.data.operators.ForcedDeletion;
}
class Td extends wt {
  prepareDerivedData() {
    this._prepareMwdAttributes(), this._prepareMwdMonitors(), this._prepareMwdItems(), super.prepareDerivedData();
  }
  static get defaultIcon() {
    return `${ds}/default/Default_Vehicle.svg`;
  }
  static get initiative() {
    return wt.initiative + " + max(@attributes.system.value, @attributes.handling.value)";
  }
  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    };
  }
  getAttributes() {
    return va[this.type] ?? va[A.actorTypes.vehicle];
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
      "system.handling": Yg(),
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
      { value: 0, max: n, resistance: wt.normalizeResistance((l = t.armor) == null ? void 0 : l.resistance) },
      t.armor ?? {},
      { inplace: !1, recursive: !0 }
    ), t.armor.resistance = {
      default: $r(n),
      byType: ((c = t.armor.resistance) == null ? void 0 : c.byType) ?? {}
    };
    const s = $r(n), r = {
      value: ((u = t.structure) == null ? void 0 : u.value) ?? 0,
      max: ((d = t.structure) == null ? void 0 : d.max) ?? (this.type === A.actorTypes.battlemech ? 18 : 15),
      resistance: wt.normalizeResistance((m = t.structure) == null ? void 0 : m.resistance)
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
        resistance: wt.normalizeResistance((b = t.heat) == null ? void 0 : b.resistance)
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
const Ql = {
  light: 4,
  medium: 5,
  heavy: 6,
  assault: 7
}, Qg = { mode: "normal", allowedWeaponIds: [], typeRestriction: "" }, Jg = {
  baseProfile: { name: "Unarmed", damage: "", notes: "" },
  maxWeapons: 0,
  allowedLocations: []
};
class Xg {
  constructor(e) {
    this.actor = e, this.mwd = e.system.mwd ?? {};
  }
  compute() {
    const e = this.mwd.weightClass ?? "medium", t = Ql[e] ?? Ql.medium, i = this._normalizeHardpoints(), n = this._normalizeWeaponGroups(), s = n.find((y) => y.isPrimary), r = n.filter((y) => y.isPrimary), o = this._primarySlot(), l = [], c = [];
    r.length > 1 && l.push(v.mwd.loadout.errors.multiplePrimary);
    const u = s ? t - 1 : t, d = n.length + (s ? 1 : 0);
    n.length > u && l.push(Ce(v.mwd.loadout.errors.mountPointsExceeded, {
      used: d,
      total: t
    }));
    const m = this._getWeapons((y) => (y.system.weaponCategory ?? "ranged") !== "melee"), f = new Map(m.map((y) => [y.id, y])), p = /* @__PURE__ */ new Set(), h = i.map((y) => ({ ...y, occupiedBy: null, occupiedByName: void 0 }));
    for (const y of n)
      for (const b of y.weaponIds ?? []) {
        const S = f.get(b);
        if (!S) {
          c.push(Ce(v.mwd.loadout.warnings.weaponMissing, { weapon: b }));
          continue;
        }
        const T = S.system.hardpointType ?? "energy", E = S.system.hardpointSize ?? "small";
        if (p.has(b)) {
          l.push(Ce(v.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: S.name }));
          continue;
        }
        if (p.add(b), y.isPrimary && this._validatePrimaryWeapon(S, T, E, o, l), (S.system.weaponCategory ?? "ranged") === "melee")
          continue;
        const P = h.find((C) => !C.occupiedBy && C.type === T && C.size === E);
        P ? (P.occupiedBy = y.id, P.occupiedByName = y.name) : l.push(Ce(v.mwd.loadout.errors.hardpointUnavailable, {
          weapon: S.name,
          type: v.mwd.hardpointType[T] ?? T,
          size: v.mwd.hardpointSize[E] ?? E
        }));
      }
    s && (!s.weaponIds || s.weaponIds.length === 0) && l.push(v.mwd.loadout.errors.primaryWithoutWeapon);
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
      name: e.name || Ce(v.common.newName, { type: v.itemType.singular.weapon }),
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
    const e = foundry.utils.mergeObject(foundry.utils.duplicate(Qg), this.mwd.primarySlot ?? {});
    return e.allowedWeaponIds = this._asArray(e.allowedWeaponIds), e;
  }
  _computeMeleeState(e) {
    var o, l, c;
    const t = foundry.utils.mergeObject(foundry.utils.duplicate(Jg), this.mwd.melee ?? {}), i = this._getWeapons((u) => (u.system.weaponCategory ?? "ranged") === "melee"), n = [], s = Number(t.maxWeapons ?? 0);
    i.length > s && e.push(Ce(v.mwd.loadout.errors.meleeLimitExceeded, {
      equipped: i.length,
      limit: s
    }));
    const r = this._asArray(t.allowedLocations);
    return n.push({
      name: ((o = t.baseProfile) == null ? void 0 : o.name) || v.mwd.melee.baseProfile,
      damage: ((l = t.baseProfile) == null ? void 0 : l.damage) ?? "",
      notes: ((c = t.baseProfile) == null ? void 0 : c.notes) ?? ""
    }), i.forEach((u) => {
      var d;
      r.length > 0 && u.system.mountLocation && !r.includes(u.system.mountLocation) && e.push(Ce(v.mwd.loadout.errors.meleeLocationRestricted, {
        weapon: u.name,
        location: v.mwd.meleeLocation[u.system.mountLocation] ?? u.system.mountLocation
      })), n.push({
        name: u.name,
        damage: u.getDamageCode(),
        notes: ((d = u.system.references) == null ? void 0 : d.description) ?? ""
      });
    }), { profiles: n, limit: s };
  }
  _validatePrimaryWeapon(e, t, i, n, s) {
    var r;
    n.mode === "converted" ? (((r = n.allowedWeaponIds) == null ? void 0 : r.length) > 0 && !n.allowedWeaponIds.includes(e.id) && s.push(Ce(v.mwd.loadout.errors.primaryNotAllowedWeapon, { weapon: e.name })), n.typeRestriction && t !== n.typeRestriction && s.push(Ce(v.mwd.loadout.errors.primaryTypeRestriction, {
      weapon: e.name,
      type: v.mwd.hardpointType[n.typeRestriction] ?? n.typeRestriction
    }))) : i !== "large" && s.push(Ce(v.mwd.loadout.errors.primaryNeedsLarge, { weapon: e.name }));
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
class Zg extends Td {
  static get defaultIcon() {
    return `${ds}/vehicles/apc.svg`;
  }
  prepareDerivedData() {
    var e;
    super.prepareDerivedData(), this.system.mwd = this.system.mwd ?? {}, this.system.mwd.chassis = this.system.mwd.chassis ?? "", this.system.mwd.tonnage = this.system.mwd.tonnage ?? 0, this.system.mwd.loadout = new Xg(this).compute(), this.system.mwd.weaponGroupDetails = this._prepareConfiguredWeaponGroups(), this.system.mwd.heat = this._prepareHeatTrack(), this.system.mwd.primaryGroupName = ((e = this.system.mwd.weaponGroupDetails.find((t) => t.isPrimary)) == null ? void 0 : e.name) ?? "", this.system.skills = this._prepareSkillMap(), this.system.weaponGroups = this._prepareWeaponGroups(), this.system.meleeProfiles = this._prepareMeleeProfiles(), this.system.quickActions = {
      primaryWeaponGroup: this.system.weaponGroups.find((t) => t.isPrimary),
      hasSensorSweep: !!(this.system.skills.perception || this.system.skills.technician)
    };
  }
  async rollRangedAttack() {
    const e = this.system.weaponGroups ?? [];
    if (e.length === 0) {
      ui.notifications.warn(v.actor.vehicle.quickActions.errors.noRanged);
      return;
    }
    const t = await this._promptWeaponGroup(e);
    if (!t)
      return;
    const i = t.weaponIds.map((n) => this.items.get(n)).filter((n) => n);
    await this._rollQuickSkill(this.system.skills.gunnery, {
      quickAction: {
        title: v.actor.vehicle.quickActions.rangedAttack,
        weaponGroup: this._serializeWeaponGroup(t, i)
      }
    });
  }
  async rollMeleeAttack() {
    const e = this.system.meleeProfiles ?? [];
    if (e.length === 0) {
      ui.notifications.warn(v.actor.vehicle.quickActions.errors.noMelee);
      return;
    }
    const t = await this._promptMeleeProfile(e);
    t && await this._rollQuickSkill(this.system.skills.melee, {
      quickAction: {
        title: v.actor.vehicle.quickActions.meleeAttack,
        meleeProfile: t
      }
    });
  }
  async rollDodge() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: v.actor.vehicle.quickActions.dodgeCheck }
    });
  }
  async rollPilotingCheck() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: v.actor.vehicle.quickActions.pilotingCheck }
    });
  }
  async rollSensorSweep() {
    const e = [this.system.skills.perception, this.system.skills.technician].filter((i) => i);
    if (e.length === 0) {
      ui.notifications.warn(v.actor.vehicle.quickActions.errors.noSensorSweep);
      return;
    }
    const t = await this._promptSensorSweepSkill(e);
    t && await this._rollQuickSkill(t, {
      quickAction: {
        title: v.actor.vehicle.quickActions.sensorSweep,
        skillName: t.name
      }
    });
  }
  async rollEmergencyRepair() {
    await this._rollQuickSkill(this.system.skills.technician, {
      quickAction: { title: v.actor.vehicle.quickActions.emergencyRepair }
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
      label: v.actor.battlemech.heat.status[r] ?? r
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
        name: n.name || Ce(v.common.newName, { type: v.itemType.singular.weapon }),
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
    const i = Ot(e);
    if (i)
      return {
        name: i.label ?? ((n = v.skill) == null ? void 0 : n[e]) ?? e,
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
      name: v.actor.vehicle.quickActions.primaryWeapons,
      weaponIds: i.map((r) => r.id),
      isPrimary: !0
    }), n.push({
      id: "all",
      name: v.actor.vehicle.quickActions.allWeapons,
      weaponIds: t.map((r) => r.id),
      isPrimary: n.length === 0
    }), n;
  }
  _prepareMeleeProfiles() {
    const e = [{
      id: "unarmed",
      name: v.actor.vehicle.quickActions.unarmed,
      weaponId: null,
      damage: 1,
      notes: v.actor.vehicle.quickActions.unarmedNotes
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
    const i = ((s = e == null ? void 0 : e.system) == null ? void 0 : s.attribute) ?? this.getPhysicalAgility(), n = foundry.utils.mergeObject(ei.prepareActorRoll(this), {
      mode: ot.rollType.skill,
      skill: e,
      attribute1: i,
      specialization: void 0
    });
    t.quickAction && (n.quickAction = t.quickAction), await ei.create(n);
  }
  async _promptWeaponGroup(e) {
    if (e.length === 1)
      return e[0];
    const t = e.find((s) => s.isPrimary) ?? e[0], i = `<form class="mwd-quick-select">${e.map((s) => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${s.id}" ${s.id === t.id ? "checked" : ""}>
        <span>${s.name}${s.isPrimary ? ` (${v.actor.vehicle.quickActions.primaryLabel})` : ""}</span>
      </label>`).join("")}</form>`, n = await Dialog.prompt({
      title: v.actor.vehicle.quickActions.selectWeaponGroup,
      content: i,
      label: v.common.roll.button,
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
      title: v.actor.vehicle.quickActions.selectMeleeProfile,
      content: i,
      label: v.common.roll.button,
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
      title: v.actor.vehicle.quickActions.selectSensorSkill,
      content: t,
      label: v.common.roll.button,
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
const $n = "activeModifiers", Wo = [
  { value: "", label: "All Attributes" },
  { value: "reflexes", label: "Reflexes" },
  { value: "strength", label: "Strength" },
  { value: "willpower", label: "Willpower" },
  { value: "charisma", label: "Charisma" },
  { value: "intelligence", label: "Intelligence" },
  { value: "edge", label: "Edge" }
], jo = [
  { value: "", label: "All Intents" },
  { value: "skill", label: "Skill" },
  { value: "attack", label: "Attack" },
  { value: "defense", label: "Defense" },
  { value: "common", label: "Common" },
  { value: "attribute", label: "Attribute" },
  { value: "edge", label: "Edge" },
  { value: "initiative", label: "Initiative" }
];
function Jl(a) {
  const e = String(a ?? "").trim();
  return e === "" ? null : e;
}
function ey(a) {
  return String((a == null ? void 0 : a.intent) ?? "").trim() || null;
}
function ty(a) {
  var e, t, i;
  return ((e = a == null ? void 0 : a.data) == null ? void 0 : e.attrKey) ?? // skill rolls
  ((i = (t = a == null ? void 0 : a.attack) == null ? void 0 : t.skill) == null ? void 0 : i.attribute) ?? // attack rolls
  null;
}
function Xl(a, e) {
  return a ? e ? a === e : !1 : !0;
}
function vd(a) {
  return {
    id: String((a == null ? void 0 : a.id) ?? ""),
    label: String((a == null ? void 0 : a.label) ?? "").trim(),
    value: Math.trunc(Number((a == null ? void 0 : a.value) ?? 0)) || 0,
    enabled: (a == null ? void 0 : a.enabled) !== !1,
    attributeFilter: Jl(a == null ? void 0 : a.attributeFilter),
    intentFilter: Jl(a == null ? void 0 : a.intentFilter),
    source: (a == null ? void 0 : a.source) === "preset" ? "preset" : "adhoc"
  };
}
class iy {
  constructor() {
    D(this, "id", "mwd.sceneModifiers");
  }
  collect({ resolved: e } = {}) {
    var r;
    const t = (r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.getFlag("mwd", $n);
    if (!Array.isArray(t) || !t.length) return [];
    const i = ey(e), n = ty(e), s = [];
    for (const o of t) {
      const l = vd(o);
      l.enabled && Xl(l.intentFilter, i) && Xl(l.attributeFilter, n) && s.push({
        id: l.id || `scene:${l.label}`,
        label: l.label,
        value: l.value,
        source: "Scene"
      });
    }
    return s;
  }
}
const ay = `systems/${w}/templates/settings/collection-editor.hbs`, kd = /* @__PURE__ */ new Map(), er = /* @__PURE__ */ new Map();
function Et(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid settings data.");
  return t.validationErrors = e, t;
}
function Ia(a) {
  sy(a), kd.set(a.id, a), game.settings.register(w, a.settingKey, {
    scope: "world",
    config: !1,
    type: a.settingType ?? Object,
    default: a.defaultData()
  }), game.settings.registerMenu(w, a.menuKey, {
    name: a.menu.name,
    label: a.menu.label,
    hint: a.menu.hint,
    icon: a.menu.icon,
    type: ry(a.id),
    restricted: a.menu.restricted ?? !0
  });
}
function ny(a) {
  return kd.get(a) ?? null;
}
function sy(a) {
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
function ry(a) {
  if (er.has(a))
    return er.get(a);
  class e extends Md {
  }
  return D(e, "definitionId", a), er.set(a, e), e;
}
var Z, Ed, Br, Bn, zn, ca, zr, Ha, Cd, Pd, lt;
class Md extends FormApplication {
  constructor(t = {}, i = {}) {
    super(t, i);
    Me(this, Z);
    const n = M(this, Z, zn).call(this);
    this.editorState = {
      tab: "rows",
      rows: this.definition.toRows(n),
      bulkText: this.definition.serializeBulk(n),
      errors: []
    };
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: `${w}-${this.definitionId}-editor`,
      classes: ["mwd", "mwd-settings-editor"],
      template: ay,
      width: 880,
      height: 760,
      resizable: !0,
      submitOnChange: !1,
      closeOnSubmit: !1
    }, { inplace: !1 });
  }
  get definition() {
    const t = ny(this.constructor.definitionId);
    if (!t)
      throw new Error(`Missing settings collection definition: ${this.constructor.definitionId}`);
    return t;
  }
  get title() {
    var t;
    return this.definition.title ?? ((t = this.definition.menu) == null ? void 0 : t.name) ?? "Settings Editor";
  }
  getData(t = {}) {
    const i = M(this, Z, Pd).call(this), n = this.editorState.rows.map((s, r, o) => ({
      index: r,
      fields: i.map((l) => M(this, Z, Cd).call(this, l, s, r)),
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
        o && M(this, Z, Ed).call(this, o, s, r);
      });
    });
  }
  async _onSubmit(t, { updateData: i = null, preventClose: n = !0, preventRender: s = !0 } = {}) {
    return super._onSubmit(t, { updateData: i, preventClose: n, preventRender: s });
  }
  async _updateObject(t, i) {
    var n;
    M(this, Z, lt).call(this, []);
    try {
      const s = this.editorState.tab === "bulk" ? this.definition.parseBulk(M(this, Z, Ha).call(this)) : this.definition.rowsToValue(M(this, Z, zr).call(this));
      await game.settings.set(w, this.definition.settingKey, s);
      const r = M(this, Z, zn).call(this);
      M(this, Z, Bn).call(this, r), await this.close();
    } catch (s) {
      M(this, Z, lt).call(this, vn(s)), this.editorState.errors.length && ((n = ui.notifications) == null || n.error(this.editorState.errors[0])), this.render(!1);
    }
  }
}
Z = new WeakSet(), Ed = async function(t, i, n) {
  var s, r, o, l, c, u, d, m;
  switch (i.preventDefault(), i.stopPropagation(), t) {
    case "switchRows":
      M(this, Z, Ha).call(this), this.editorState.tab = "rows", M(this, Z, lt).call(this, []), this.render(!1);
      return;
    case "switchBulk":
      M(this, Z, ca).call(this);
      try {
        const f = this.definition.rowsToValue(this.editorState.rows);
        this.editorState.bulkText = this.definition.serializeBulk(f), this.editorState.tab = "bulk", M(this, Z, lt).call(this, []);
      } catch (f) {
        M(this, Z, lt).call(this, vn(f)), this.editorState.errors.length && ((s = ui.notifications) == null || s.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "addRow":
      M(this, Z, ca).call(this), this.editorState.rows.push(((o = (r = this.definition).createEmptyRow) == null ? void 0 : o.call(r)) ?? {}), M(this, Z, lt).call(this, []), this.render(!1);
      return;
    case "removeRow":
      M(this, Z, ca).call(this), this.editorState.rows.splice(Number(((l = n == null ? void 0 : n.dataset) == null ? void 0 : l.index) ?? -1), 1), M(this, Z, lt).call(this, []), this.render(!1);
      return;
    case "moveRowUp":
      M(this, Z, ca).call(this), M(this, Z, Br).call(this, Number(((c = n == null ? void 0 : n.dataset) == null ? void 0 : c.index) ?? -1), -1), M(this, Z, lt).call(this, []), this.render(!1);
      return;
    case "moveRowDown":
      M(this, Z, ca).call(this), M(this, Z, Br).call(this, Number(((u = n == null ? void 0 : n.dataset) == null ? void 0 : u.index) ?? -1), 1), M(this, Z, lt).call(this, []), this.render(!1);
      return;
    case "loadBulk":
      try {
        const f = this.definition.parseBulk(M(this, Z, Ha).call(this));
        this.editorState.rows = this.definition.toRows(f), this.editorState.bulkText = this.definition.serializeBulk(f), this.editorState.tab = "rows", M(this, Z, lt).call(this, []);
      } catch (f) {
        M(this, Z, lt).call(this, vn(f)), this.editorState.errors.length && ((d = ui.notifications) == null || d.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "formatBulk":
      try {
        const f = this.definition.parseBulk(M(this, Z, Ha).call(this));
        this.editorState.bulkText = this.definition.serializeBulk(f), M(this, Z, lt).call(this, []);
      } catch (f) {
        M(this, Z, lt).call(this, vn(f)), this.editorState.errors.length && ((m = ui.notifications) == null || m.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "resetSetting":
      M(this, Z, Bn).call(this, M(this, Z, zn).call(this)), this.render(!1);
      return;
    case "restoreDefaults":
      M(this, Z, Bn).call(this, this.definition.defaultData()), this.render(!1);
      return;
    case "cancel":
      await this.close();
      return;
    default:
      return;
  }
}, Br = function(t, i) {
  if (!Number.isInteger(t)) return;
  const n = t + i;
  if (t < 0 || n < 0 || n >= this.editorState.rows.length) return;
  const s = [...this.editorState.rows], [r] = s.splice(t, 1);
  s.splice(n, 0, r), this.editorState.rows = s;
}, Bn = function(t) {
  this.editorState.rows = this.definition.toRows(t), this.editorState.bulkText = this.definition.serializeBulk(t), this.editorState.tab = "rows", M(this, Z, lt).call(this, []);
}, zn = function() {
  const t = game.settings.get(w, this.definition.settingKey);
  return foundry.utils.deepClone(t ?? this.definition.defaultData());
}, ca = function() {
  this.editorState.rows = M(this, Z, zr).call(this);
}, zr = function() {
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
}, Ha = function() {
  var n;
  const t = this.form, i = (n = t == null ? void 0 : t.querySelector) == null ? void 0 : n.call(t, 'textarea[name="bulkText"]');
  return i instanceof HTMLTextAreaElement && (this.editorState.bulkText = i.value), this.editorState.bulkText ?? "";
}, Cd = function(t, i, n) {
  const s = t.type ?? "text", r = String((i == null ? void 0 : i[t.key]) ?? t.default ?? ""), o = s === "select" ? oy(t).map((l) => ({
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
}, Pd = function() {
  return this.definition.rowSchema.map((t) => ({
    ...t,
    type: t.type ?? "text"
  }));
}, lt = function(t = []) {
  this.editorState.errors = Array.isArray(t) ? t.filter(Boolean) : [];
}, D(Md, "definitionId", "");
function oy(a) {
  const e = typeof a.options == "function" ? a.options() : a.options;
  return Array.isArray(e) ? e : [];
}
function vn(a) {
  const e = Array.isArray(a == null ? void 0 : a.validationErrors) ? a.validationErrors.filter(Boolean) : [String((a == null ? void 0 : a.message) ?? "Unable to save settings.").trim()].filter(Boolean);
  return e.length ? e : ["Unable to save settings."];
}
const Fr = "sceneModifierTemplates", ly = "sceneModifierTemplateEditor", cy = Object.freeze([]);
function _i(a) {
  const e = String(a ?? "").trim();
  return e === "" ? "" : e;
}
function Nd(a = []) {
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
      attributeFilter: _i(n == null ? void 0 : n.attributeFilter),
      intentFilter: _i(n == null ? void 0 : n.intentFilter)
    });
  }), t.length) throw Et(t);
  return e;
}
function uy(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => ({
    label: String((e == null ? void 0 : e.label) ?? ""),
    value: String((e == null ? void 0 : e.value) ?? "0"),
    attributeFilter: _i(e == null ? void 0 : e.attributeFilter),
    intentFilter: _i(e == null ? void 0 : e.intentFilter)
  }));
}
function dy(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw Et([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  if (!Array.isArray(t))
    throw Et(["Bulk JSON must be an array."]);
  return Nd(t.map((i) => ({
    label: String((i == null ? void 0 : i.label) ?? ""),
    value: String((i == null ? void 0 : i.value) ?? "0"),
    attributeFilter: _i(i == null ? void 0 : i.attributeFilter),
    intentFilter: _i(i == null ? void 0 : i.intentFilter)
  })));
}
function my(a = []) {
  return JSON.stringify(
    (Array.isArray(a) ? a : []).map((e) => ({
      label: String((e == null ? void 0 : e.label) ?? ""),
      value: Number((e == null ? void 0 : e.value) ?? 0),
      attributeFilter: _i(e == null ? void 0 : e.attributeFilter),
      intentFilter: _i(e == null ? void 0 : e.intentFilter)
    })),
    null,
    2
  );
}
const fy = {
  id: "scene-modifier-templates",
  menuKey: ly,
  settingKey: Fr,
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
      options: Wo
    },
    {
      key: "intentFilter",
      label: "Intent Filter",
      type: "select",
      options: jo
    }
  ],
  menu: {
    name: "Scene Modifier Templates",
    label: "Configure",
    hint: "Edit the preset scene modifier templates available in the GM Gadget.",
    icon: "fas fa-cloud",
    restricted: !0
  },
  defaultData: () => foundry.utils.deepClone(cy),
  createEmptyRow: () => ({
    label: "",
    value: "0",
    attributeFilter: "",
    intentFilter: ""
  }),
  toRows: uy,
  rowsToValue: Nd,
  parseBulk: dy,
  serializeBulk: my
};
function py() {
  Ia(fy);
}
const { ApplicationV2: hy, HandlebarsApplicationMixin: gy } = foundry.applications.api, yy = "mwd-gmgadget", Rd = "gmDnPresets", Fn = "gmNextDn", Wa = "gmDnAnnounceToChat", by = Object.freeze([
  { label: "Standard", dn: 1 },
  { label: "Challenging", dn: 2 },
  { label: "Hard", dn: 3 },
  { label: "Extreme", dn: 4 }
]), Sy = "systems/mwd/templates/v2/mwd-gmgadget.hbs", ja = Object.freeze({
  actorId: "",
  mode: "physical",
  delta: 1,
  useArmor: !1,
  damageType: "concussive",
  statusId: "",
  statusActive: !0,
  source: "",
  notes: ""
}), Ay = Object.freeze({
  label: "Hazard Zone",
  startExposure: ae.minor,
  escalationRate: 1,
  escalationIntervalTurns: 1,
  escalationMax: ae.full,
  onFullBurnDelta: 0,
  clearOnExit: !0,
  damage: 6,
  ap: 0,
  damageType: "thermal",
  color: "#d86a2c"
});
function wy(a = "") {
  return String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean).map((e) => {
    const [t, i] = e.split(":").map((r) => (r ?? "").trim()), n = t || "DN", s = Number.isFinite(Number(i)) ? Number(i) : Number(t);
    return {
      label: n,
      dn: Number.isFinite(s) ? Math.max(0, Math.trunc(s)) : null
    };
  }).filter((e) => Number.isFinite(e.dn));
}
function Ty(a = []) {
  const e = new Error(a[0] ?? "Invalid GM DN presets.");
  return e.validationErrors = Array.isArray(a) ? a.filter(Boolean) : [], e;
}
function vy() {
  return foundry.utils.deepClone(by);
}
function pn(a, { strict: e = !1 } = {}) {
  const t = typeof a == "string" ? wy(a) : Array.isArray(a) ? a : [], i = [], n = [], s = /* @__PURE__ */ new Set();
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
  }), e && n.length) throw Ty(n);
  return i;
}
function tr(a = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(ja),
    a ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function ir(a = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(Ay),
    a ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function Id(a = null) {
  const e = (a == null ? void 0 : a.document) ?? a ?? null, t = Array.from((e == null ? void 0 : e.shapes) ?? []);
  if (t.length !== 1) return t.length > 1 ? "multiple" : "";
  const i = t[0], n = typeof (i == null ? void 0 : i.toObject) == "function" ? i.toObject() : i && typeof i == "object" ? i : null;
  return String((n == null ? void 0 : n.type) ?? "").trim().toLowerCase();
}
function Zl(a = null) {
  return !!Id(a);
}
function ec() {
  var i, n;
  const a = Array.from(((i = canvas == null ? void 0 : canvas.regions) == null ? void 0 : i.controlled) ?? []).map((s) => (s == null ? void 0 : s.document) ?? s ?? null).find(Zl);
  if (a) return a;
  const e = ((n = canvas == null ? void 0 : canvas.regions) == null ? void 0 : n.hover) ?? null, t = (e == null ? void 0 : e.document) ?? e ?? null;
  return Zl(t) ? t : null;
}
function ky(a = null) {
  var o, l;
  const e = (a == null ? void 0 : a.document) ?? a ?? null;
  if (!e)
    return {
      label: "No region selected",
      reason: "Select a Region created in Measured Template Mode on the current scene to turn it into a hazard.",
      supported: !1
    };
  const t = Id(e), i = Kc(e);
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
function My(a) {
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
function Ey(a) {
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
function Cy(a) {
  return vt.getStatusOptions(a);
}
function Py(a = "mwd") {
  game.settings.register(a, Fn, {
    scope: "client",
    config: !1,
    type: Number,
    default: 1
  }), game.settings.register(a, Wa, {
    scope: "client",
    config: !0,
    name: "Announce GM DN changes to chat",
    hint: "If enabled, posts a small chat notice when you change the current DN preset.",
    type: Boolean,
    default: !1
  });
}
const qe = class qe extends gy(hy) {
  constructor({ systemId: e = "mwd", ...t } = {}) {
    super(t), this.systemId = e, this.activeTab = "difficulty", this.harmState = tr(), this.hazardState = ir();
  }
  async render(e = {}) {
    var t;
    return (t = game.user) != null && t.isGM ? super.render(e) : this;
  }
  async _prepareContext(e) {
    var y, b, S, T;
    const t = await super._prepareContext(e), i = pn(
      game.settings.get(this.systemId, Rd),
      { strict: !1 }
    ), n = Number(game.settings.get(this.systemId, Fn) ?? 1), s = !!game.settings.get(this.systemId, Wa), r = tr(this.harmState), o = vt.getActorOptions({ mode: r.mode }), l = vt.getSceneTarget({ mode: r.mode }), c = this.harmState.actorId ? ((b = (y = game.actors) == null ? void 0 : y.get) == null ? void 0 : b.call(y, this.harmState.actorId)) ?? null : null, u = vt.resolveTarget({
      actor: c,
      actorId: this.harmState.actorId,
      preferSceneTarget: !0,
      mode: r.mode
    }), d = Cy(u.actor ?? c ?? null);
    d.length && !d.some((E) => E.value === r.statusId) && (r.statusId = d[0].value, this.harmState.statusId = r.statusId);
    const m = tc(
      game.settings.get(this.systemId, Fr)
    ), f = ic(
      (S = canvas == null ? void 0 : canvas.scene) == null ? void 0 : S.getFlag("mwd", $n)
    ), p = ec(), h = ky(p), g = ir(this.hazardState);
    return foundry.utils.mergeObject(t, {
      presets: i,
      currentDn: n,
      currentTab: this.activeTab,
      announce: s,
      isGM: ((T = game.user) == null ? void 0 : T.isGM) ?? !1,
      scene: {
        hasScene: !!(canvas != null && canvas.scene),
        templates: m,
        activeModifiers: f,
        attributeFilterOptions: Wo,
        intentFilterOptions: jo
      },
      harm: {
        state: r,
        actorOptions: o,
        modes: vt.MODE_OPTIONS,
        damageTypes: Gl,
        statusOptions: d,
        sceneTarget: My(l),
        effectiveTarget: Ey(u),
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
          { value: ae.minor, label: "Minor" },
          { value: ae.major, label: "Major" },
          { value: ae.full, label: "Full" }
        ],
        damageTypes: Gl,
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
    return this.harmState = tr({
      actorId: i('[name="harm-actorId"]', this.harmState.actorId),
      mode: i('[name="harm-mode"]', this.harmState.mode),
      delta: Number(i('[name="harm-delta"]', this.harmState.delta)),
      useArmor: n('[name="harm-useArmor"]', this.harmState.useArmor),
      damageType: i('[name="harm-damageType"]', this.harmState.damageType),
      statusId: i('[name="harm-statusId"]', this.harmState.statusId),
      statusActive: i('[name="harm-statusActive"]', this.harmState.statusActive ? "add" : "remove") !== "remove",
      source: i('[name="harm-source"]', this.harmState.source),
      notes: i('[name="harm-notes"]', this.harmState.notes)
    }), Number.isFinite(Number(this.harmState.delta)) || (this.harmState.delta = ja.delta), this.harmState;
  }
  async _onSetDn(e, t) {
    var s, r, o;
    if (e.preventDefault(), e.stopPropagation(), !((s = game.user) != null && s.isGM)) return;
    const i = Math.max(0, Math.trunc(Number(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.dn) ?? NaN)));
    if (!Number.isFinite(i)) return;
    if (await game.settings.set(this.systemId, Fn, i), !!game.settings.get(this.systemId, Wa)) {
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
      return await game.settings.set(this.systemId, Fn, 1), this.render({ parts: ["body"] });
  }
  async _onToggleAnnounce(e, t) {
    var n;
    if (e.preventDefault(), e.stopPropagation(), !((n = game.user) != null && n.isGM)) return;
    const i = !game.settings.get(this.systemId, Wa);
    return await game.settings.set(this.systemId, Wa, i), this.render({ parts: ["body"] });
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
    const s = await vt.apply({
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
    return this.hazardState = ir({
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
    const i = this._captureHazardStateFromDom(t), n = ec(), s = Kc(n);
    if (!(canvas != null && canvas.scene) || !s) {
      (m = ui.notifications) == null || m.warn("Select a supported Region in Measured Template Mode before creating a hazard.");
      return;
    }
    const r = go({
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
    }), o = ps(s);
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
          [Gi]: {
            sourceActorUuid: null,
            sourceItemUuid: null,
            payloadId: "gm-hazard",
            templateGeometry: ii(s),
            damage: Math.max(0, Number(i.damage ?? 0) || 0),
            ap: Math.max(0, Number(i.ap ?? 0) || 0),
            damageType: String(i.damageType ?? "thermal").trim() || "thermal",
            label: `${String(i.label ?? "Hazard Zone").trim() || "Hazard Zone"} (${Dt(r.startExposure)})`,
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
      delta: ac(e == null ? void 0 : e.delta, ja.delta),
      source: t,
      notes: i
    } : n === "physical" || n === "fatigue" ? {
      mode: "trackDelta",
      track: n,
      delta: ac(e == null ? void 0 : e.delta, ja.delta),
      useArmor: !!(e != null && e.useArmor),
      damageType: (e == null ? void 0 : e.damageType) ?? ja.damageType,
      source: t,
      notes: i
    } : null;
  }
  // ---- Scene modifier actions ----
  async _onAddSceneModifierFromPreset(e, t) {
    var l, c, u, d;
    if ((l = e == null ? void 0 : e.preventDefault) == null || l.call(e), (c = e == null ? void 0 : e.stopPropagation) == null || c.call(e), !((u = game.user) != null && u.isGM)) return;
    const i = ((d = t == null ? void 0 : t.closest) == null ? void 0 : d.call(t, ".mwd-gmgadget__root")) ?? this._getRootElement(), n = i instanceof HTMLElement ? i.querySelector('select[name="scene-preset-index"]') : null, s = n instanceof HTMLSelectElement ? Number(n.value) : NaN, r = tc(
      game.settings.get(this.systemId, Fr)
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
    const i = ic(t.getFlag("mwd", $n)), n = await e(i);
    return await t.setFlag("mwd", $n, n), this.render({ parts: ["body"] });
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
D(qe, "DEFAULT_OPTIONS", {
  id: yy,
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
    switchTab: qe.prototype._onSwitchTab,
    setDn: qe.prototype._onSetDn,
    clearDn: qe.prototype._onClearDn,
    toggleAnnounce: qe.prototype._onToggleAnnounce,
    harmInputChange: qe.prototype._onHarmInputChange,
    refreshHarmTarget: qe.prototype._onRefreshHarmTarget,
    applyHarm: qe.prototype._onApplyHarm,
    hazardInputChange: qe.prototype._onHazardInputChange,
    refreshHazardTemplate: qe.prototype._onRefreshHazardTemplate,
    createHazard: qe.prototype._onCreateHazard,
    addSceneModifierFromPreset: qe.prototype._onAddSceneModifierFromPreset,
    addSceneModifierAdhoc: qe.prototype._onAddSceneModifierAdhoc,
    toggleSceneModifier: qe.prototype._onToggleSceneModifier,
    removeSceneModifier: qe.prototype._onRemoveSceneModifier,
    clearSceneModifiers: qe.prototype._onClearSceneModifiers
  }
}), D(qe, "PARTS", {
  body: { template: Sy }
});
let Ur = qe;
function tc(a) {
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
function ic(a) {
  return Array.isArray(a) ? a.map((e) => {
    var s, r;
    const t = vd(e), i = ((s = Wo.find((o) => o.value === (t.attributeFilter ?? ""))) == null ? void 0 : s.label) ?? null, n = ((r = jo.find((o) => o.value === (t.intentFilter ?? ""))) == null ? void 0 : r.label) ?? null;
    return {
      ...t,
      attributeFilterLabel: t.attributeFilter ? i : null,
      intentFilterLabel: t.intentFilter ? n : null,
      signedValue: t.value >= 0 ? `+${t.value}` : String(t.value),
      isPositive: t.value > 0
    };
  }) : [];
}
function ac(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
let ar = null;
function Ny({ systemId: a = "mwd" } = {}) {
  return ar || (ar = new Ur({ systemId: a })), ar;
}
const Ry = "gmDnPresetEditor";
function Iy(a = []) {
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
  }), t.length) throw Et(t);
  return pn(e, { strict: !0 });
}
function Dy(a = []) {
  return pn(a, { strict: !1 }).map((e) => ({
    label: e.label,
    dn: String(e.dn)
  }));
}
function Oy(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw Et([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return pn(t, { strict: !0 });
}
function _y(a = []) {
  return JSON.stringify(
    pn(a, { strict: !1 }),
    null,
    2
  );
}
const Ly = {
  id: "gm-dn-presets",
  menuKey: Ry,
  settingKey: Rd,
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
  defaultData: vy,
  createEmptyRow: () => ({
    label: "",
    dn: "1"
  }),
  toRows: Dy,
  rowsToValue: Iy,
  parseBulk: Oy,
  serializeBulk: _y
};
function xy() {
  Ia(Ly);
}
const $y = "lifeModuleCatalogEditor";
function By(a = []) {
  return ia((Array.isArray(a) ? a : []).map((e) => ({
    id: String((e == null ? void 0 : e.id) ?? ""),
    moduleType: String((e == null ? void 0 : e.moduleType) ?? ""),
    label: String((e == null ? void 0 : e.label) ?? ""),
    grants: String((e == null ? void 0 : e.grants) ?? ""),
    requiresAny: String((e == null ? void 0 : e.requiresAny) ?? ""),
    excludesAny: String((e == null ? void 0 : e.excludesAny) ?? "")
  })), { strict: !0 });
}
function zy(a = []) {
  return ia(a, { strict: !1 }).map((e) => ({
    id: e.id,
    moduleType: e.moduleType,
    label: e.label,
    grants: Dh(e.grants),
    requiresAny: e.requiresAny.join(", "),
    excludesAny: e.excludesAny.join(", ")
  }));
}
function Fy(a = "") {
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
  return ia(t, { strict: !0 });
}
function Uy(a = []) {
  return JSON.stringify(
    ia(a, { strict: !1 }),
    null,
    2
  );
}
const Hy = {
  id: "life-module-catalog",
  menuKey: $y,
  settingKey: Sa,
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
      options: ed
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
  defaultData: Bo,
  createEmptyRow: () => ({
    id: "",
    moduleType: "childhood",
    label: "",
    grants: "",
    requiresAny: "",
    excludesAny: ""
  }),
  toRows: zy,
  rowsToValue: By,
  parseBulk: Fy,
  serializeBulk: Uy
};
function Wy() {
  Ia(Hy);
}
const jy = "personalActionCatalogEditor", nc = Object.freeze([
  { value: "false", label: "No" },
  { value: "true", label: "Yes" }
]);
function Ky(a = []) {
  try {
    return mn((Array.isArray(a) ? a : []).map((e) => ({
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
    throw Et(
      Array.isArray(e.validationErrors) ? e.validationErrors : [e.message]
    );
  }
}
function Gy(a = []) {
  return mn(a, { strict: !1 }).map((e) => {
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
function qy(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw Et([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  try {
    return mn(t, { strict: !0 });
  } catch (i) {
    throw Et(
      Array.isArray(i.validationErrors) ? i.validationErrors : [i.message]
    );
  }
}
function Vy(a = []) {
  return JSON.stringify(
    mn(a, { strict: !1 }),
    null,
    2
  );
}
const Yy = {
  id: "personal-action-catalog",
  menuKey: jy,
  settingKey: ju,
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
      options: () => Pr
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
      options: () => Ku
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
      options: () => nc
    },
    {
      key: "prominentWhenBurning",
      label: "Burn Highlight",
      type: "select",
      options: () => nc
    }
  ],
  menu: {
    name: "Personal Action Catalog",
    label: "Configure",
    hint: "Edit the personal combat action menus and first-pass action handlers.",
    icon: "fas fa-list-check",
    restricted: !0
  },
  defaultData: Oo,
  createEmptyRow: () => {
    var a;
    return {
      id: "",
      label: "",
      category: ((a = Pr[0]) == null ? void 0 : a.value) ?? "standard",
      cost: "1",
      handler: "combatAction",
      reason: "",
      rollIntent: "",
      prominent: "false",
      prominentWhenBurning: "false"
    };
  },
  toRows: Gy,
  rowsToValue: Ky,
  parseBulk: qy,
  serializeBulk: Vy
};
function Qy() {
  Ia(Yy);
}
const Jy = "skillSpecializationEditor";
function Hr() {
  return Jn().map((a) => ({
    value: a.code,
    label: a.label
  }));
}
function Xy(a = []) {
  const e = new Set(Hr().map((n) => n.value)), t = {}, i = [];
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
  }), i.length) throw Et(i);
  return bs(t, { strict: !0 });
}
function Zy(a = {}) {
  const e = bs(a, { strict: !1 });
  return Object.entries(e).flatMap(
    ([t, i]) => i.map((n) => ({ skillCode: t, label: n }))
  );
}
function eb(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return {};
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw Et([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return bs(t, { strict: !0 });
}
function tb(a = {}) {
  return JSON.stringify(
    bs(a, { strict: !1 }),
    null,
    2
  );
}
const ib = {
  id: "skill-specializations",
  menuKey: Jy,
  settingKey: kr,
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
      options: Hr
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
  defaultData: hu,
  createEmptyRow: () => {
    var a;
    return {
      skillCode: ((a = Hr()[0]) == null ? void 0 : a.value) ?? "",
      label: ""
    };
  },
  toRows: Zy,
  rowsToValue: Xy,
  parseBulk: eb,
  serializeBulk: tb
};
function ab() {
  Ia(ib);
}
const nb = "statusConditionCatalogEditor";
function sb(a = []) {
  try {
    return Qi((Array.isArray(a) ? a : []).map((e) => ({
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
    throw Et(
      Array.isArray(e.validationErrors) ? e.validationErrors : [e.message]
    );
  }
}
function rb(a = []) {
  return Qi(a, { strict: !1 }).map((e) => ({
    id: String(e.id ?? ""),
    label: String(e.label ?? ""),
    actorGroup: String(e.actorGroup ?? "person"),
    category: String(e.category ?? ""),
    tags: Yf(e.tags ?? []),
    icon: String(e.icon ?? ""),
    manual: e.manual ? "true" : "false",
    managed: e.managed ? "true" : "false",
    modifierKey: String(e.modifierKey ?? ""),
    order: String(e.order ?? "0")
  }));
}
function ob(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw Et([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  try {
    return Qi(t, { strict: !0 });
  } catch (i) {
    throw Et(
      Array.isArray(i.validationErrors) ? i.validationErrors : [i.message]
    );
  }
}
function lb(a = []) {
  return JSON.stringify(
    Qi(a, { strict: !1 }),
    null,
    2
  );
}
const cb = {
  id: "status-condition-catalog",
  menuKey: nb,
  settingKey: bu,
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
    { key: "actorGroup", label: "Actor Group", type: "select", options: () => jf },
    { key: "category", label: "Category", type: "text", placeholder: "stability" },
    { key: "tags", label: "Tags", type: "text", placeholder: "movement, piloting" },
    { key: "icon", label: "Icon", type: "text", placeholder: "systems/mwd/img/icons/status/falling.svg" },
    { key: "manual", label: "Manual", type: "select", options: () => dl },
    { key: "managed", label: "Managed", type: "select", options: () => dl },
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
  defaultData: Tu,
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
  toRows: rb,
  rowsToValue: sb,
  parseBulk: ob,
  serializeBulk: lb
};
function ub() {
  Ia(cb);
}
class db {
  static register() {
    xy(), Wy(), Qy(), ab(), py(), ub(), game.settings.register(w, "useDestinyMechanics", {
      name: v.settings.useDestinyMechanics.name,
      hint: v.settings.useDestinyMechanics.hint,
      scope: "world",
      config: !0,
      type: Boolean,
      default: !0
    }), game.settings.register(w, "enableGMGadget", {
      name: "Enable GM Gadget",
      hint: "If enabled, renders the new AppV2 GM Gadget UI on startup.",
      scope: "world",
      config: !0,
      type: Boolean,
      default: !0
    }), game.settings.register(w, xn, {
      name: "Machine Critical Table: General",
      hint: "RollTable UUID used when no actor-specific machine critical table is configured.",
      scope: "world",
      config: !0,
      type: String,
      default: vi.general
    }), game.settings.register(w, yd, {
      name: "Machine Critical Table: BattleMech",
      hint: "RollTable UUID used for BattleMech critical hits.",
      scope: "world",
      config: !0,
      type: String,
      default: vi.battlemech
    }), game.settings.register(w, bd, {
      name: "Machine Critical Table: Vehicle",
      hint: "RollTable UUID used for vehicle critical hits.",
      scope: "world",
      config: !0,
      type: String,
      default: vi.vehicle
    });
  }
  static getSystemProperty(e, t) {
    return game.settings.get(w, e) ?? t;
  }
}
class mb extends Error {
  constructor(e, { severity: t = "error" } = {}) {
    super(e), this.name = "UserFacingRollError", this.userFacing = !0, this.severity = t === "warn" ? "warn" : "error";
  }
}
function Ui(a, e = {}) {
  return new mb(a, e);
}
function nn(a, e = "Unable to execute roll.") {
  var i, n;
  const t = a != null && a.userFacing && (a == null ? void 0 : a.severity) === "warn" ? "warn" : "error";
  (n = (i = ui.notifications) == null ? void 0 : i[t]) == null || n.call(i, (a == null ? void 0 : a.message) ?? e);
}
const ns = Symbol("SKIP_FIELD");
function Dd(a) {
  return a instanceof HTMLInputElement || a instanceof HTMLSelectElement || a instanceof HTMLTextAreaElement;
}
function fb({
  elementKind: a = "input",
  inputType: e = "",
  dtype: t = "",
  value: i = "",
  checked: n = !1
} = {}) {
  const s = String(a ?? "").trim().toLowerCase(), r = String(e ?? "").trim().toLowerCase(), o = String(t ?? "").trim().toLowerCase();
  if (!["input", "select", "textarea"].includes(s))
    return ns;
  if (s === "input") {
    if (r === "radio")
      return n ? i : ns;
    if (r === "checkbox")
      return !!n;
  }
  if (o === "number" || s === "input" && r === "number") {
    const l = Number(i);
    return Number.isFinite(l) ? l : 0;
  }
  return o === "boolean" ? i === !0 || i === "true" : i;
}
function pb(a) {
  var e;
  return Dd(a) ? fb({
    elementKind: a instanceof HTMLSelectElement ? "select" : a instanceof HTMLTextAreaElement ? "textarea" : "input",
    inputType: a instanceof HTMLInputElement ? a.type : "",
    dtype: String(((e = a.dataset) == null ? void 0 : e.dtype) ?? ""),
    value: a.value,
    checked: a instanceof HTMLInputElement ? a.checked : !1
  }) : ns;
}
function hb({
  root: a,
  document: e,
  selector: t = "input[name], select[name], textarea[name]",
  clampByPath: i = null,
  skipNames: n = []
} = {}) {
  if (!(a instanceof HTMLElement)) return {};
  const s = new Set(Array.isArray(n) ? n : [n]), r = {};
  for (const o of a.querySelectorAll(t)) {
    if (!Dd(o) || o.closest("prose-mirror") || o.disabled) continue;
    const l = String(o.getAttribute("name") ?? o.name ?? "").trim();
    if (!l || s.has(l)) continue;
    let c = pb(o);
    c === ns || (typeof i == "function" && (c = i(l, c)), (e ? foundry.utils.getProperty(e, l) : void 0) === c) || (r[l] = c);
  }
  return r;
}
const { HandlebarsApplicationMixin: gb } = foundry.applications.api, { HTMLField: yb } = foundry.data.fields;
function bb(a) {
  const e = new yb({ required: !1, blank: !0, initial: "" });
  return e.name = a, e;
}
var Ht, on, ki, Li, Wr, jr;
const Ue = class Ue extends gb(foundry.applications.sheets.ActorSheetV2) {
  constructor() {
    super(...arguments);
    Me(this, Li);
    Me(this, Ht, !1);
    /** Track active CSB tab per group across rerenders */
    Me(this, on, /* @__PURE__ */ new Map());
    // group -> tabId
    Me(this, ki, /* @__PURE__ */ new Map());
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
    return F(this, Ht);
  }
  toggleEditing() {
    if (this.isEditable) {
      if (F(this, Ht)) {
        this._commitEditsToActor().finally(() => {
          Oe(this, Ht, !F(this, Ht)), this.render({ force: !0 });
        });
        return;
      }
      Oe(this, Ht, !F(this, Ht)), this.render({ force: !0 });
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
    F(this, on).set(o, s), M(this, Li, Wr).call(this, r, s);
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const n = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!n) return;
    const s = n.dataset.section, r = n.closest(".csb-accordion");
    if (!r || !s) return;
    const o = r.dataset.group || "default", c = (F(this, ki).has(o) ? F(this, ki).get(o) : r.dataset.default || null) === s ? null : s;
    F(this, ki).set(o, c), M(this, Li, jr).call(this, r, c);
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
      return console.error("MWD | Failed to execute roll action", b), nn(b, "Unable to execute that roll."), null;
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
        const c = l.dataset.group || "default", u = F(this, on).get(c), d = l.dataset.default || ((r = l.querySelector(".csb-tab-link[data-tab]")) == null ? void 0 : r.dataset.tab), m = u || d;
        m && M(this, Li, Wr).call(this, l, m);
      }
      for (const l of n.querySelectorAll(".csb-accordion")) {
        const c = l.dataset.group || "default", u = F(this, ki).has(c) ? F(this, ki).get(c) : l.dataset.default || null;
        M(this, Li, jr).call(this, l, u);
      }
      n.querySelectorAll(".csb-tabs").length && !n.querySelector(".csb-tab-panel.is-active") && console.warn(`${ve} CSB tabs present but no active tab applied. Check element root resolution and CSS .is-active selectors.`, {
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
    const i = hb({
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
    console.log(`${ve}BaseActorSheetV2._prepareContext:start`, {
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
        editing: F(this, Ht),
        data: this.actor,
        options: n,
        cssClass: n.cssClass
      },
      { inplace: !1 }
    );
    return s.options.owner = s.owner, s.options.limited = s.limited, s.options.editable = s.editable, s.options.editing = s.editing, s.options.viewMode = !s.editing, s.skillsDisplay = yu(((m = this.actor) == null ? void 0 : m.system) ?? {}), s.bio = {
      ...s.bio ?? {},
      fields: {
        history: bb("system.biography.history")
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
    }, console.log(`${ve}BaseActorSheetV2._prepareContext:done`, {
      actorType: (p = this.actor) == null ? void 0 : p.type,
      cssClass: s.cssClass,
      itemCount: ((g = (h = this.actor) == null ? void 0 : h.items) == null ? void 0 : g.size) ?? 0,
      editing: F(this, Ht)
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
Ht = new WeakMap(), on = new WeakMap(), ki = new WeakMap(), Li = new WeakSet(), /**
 * Apply active-state classes within a single .csb-tabs root.
 * Idempotent: safe to call every render.
 */
Wr = function(t, i) {
  t.querySelectorAll(".csb-tab-link").forEach((n) => {
    n.classList.toggle("is-active", n.dataset.tab === i);
  }), t.querySelectorAll(".csb-tab-panel").forEach((n) => {
    n.classList.toggle("is-active", n.dataset.tab === i);
  });
}, jr = function(t, i) {
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
D(Ue, "MIN_WIDTH", 800), D(Ue, "MAX_WIDTH", 950), D(Ue, "MIN_HEIGHT", 600), D(Ue, "MAX_HEIGHT", 1400), // group -> sectionId|null
/** @override */
D(Ue, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Yt(Ue, Ue, "DEFAULT_OPTIONS"), {
  classes: ["sheet", "actor", w, "appv2", "mwd-sheet", "mwd-character-sheet"],
  position: { width: 760, height: 760 },
  window: { resizable: !0, minimizable: !0 },
  actions: {
    toggleViewMode: Ue.prototype._onToggleViewMode,
    tab: Ue.prototype._onClickTab,
    accordion: Ue.prototype._onClickAccordion,
    roll: Ue.prototype._onRollAction,
    monitorSet: Ue.prototype._onMonitorSet,
    editImage: Ue.prototype._onEditImage,
    createOwnedItem: Ue.prototype._onCreateOwnedItem,
    editOwnedItem: Ue.prototype._onEditOwnedItem,
    deleteOwnedItem: Ue.prototype._onDeleteOwnedItem,
    toggleOwnedItemEquipped: Ue.prototype._onToggleOwnedItemEquipped,
    setOwnedItemPrimary: Ue.prototype._onSetOwnedItemPrimary
  }
}, { inplace: !1 }));
let sn = Ue;
function Sb(a = {}) {
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
function Ab(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(/\s+/).filter(Boolean) : [];
}
function Un(a) {
  if (!a || typeof a != "object") return a;
  const e = {
    ...a,
    template: a.template ?? Sb(a),
    classes: Ab(a.classes),
    children: Array.isArray(a.children) ? a.children.map(Un) : []
  };
  return a.type === "tabs" && (e.tabs = Array.isArray(a.tabs) ? a.tabs.map((t) => ({
    ...t,
    children: Array.isArray(t.children) ? t.children.map(Un) : []
  })) : []), a.type === "accordion" && (e.sections = Array.isArray(a.sections) ? a.sections.map((t) => ({
    ...t,
    children: Array.isArray(t.children) ? t.children.map(Un) : []
  })) : []), e;
}
function sc(a = {}) {
  return {
    ...a,
    root: Un(a.root ?? { type: "stack", children: [] })
  };
}
var Mi, us, Od;
class Zi {
  static async get(e) {
    if (F(this, Mi).has(e)) {
      const n = await F(this, Mi).get(e);
      if (Number((n == null ? void 0 : n.version) ?? 0) > 0) return n;
      F(this, Mi).delete(e);
    }
    const t = M(this, us, Od).call(this, e);
    F(this, Mi).set(e, t);
    const i = await t;
    return Number((i == null ? void 0 : i.version) ?? 0) <= 0 && F(this, Mi).delete(e), i;
  }
}
Mi = new WeakMap(), us = new WeakSet(), Od = async function(e) {
  const t = `systems/${w}/templates/v2/layouts/${e}.layout.json`;
  try {
    const i = await fetch(t);
    if (!i.ok) throw new Error(`HTTP ${i.status} for ${t}`);
    return sc(await i.json());
  } catch (i) {
    return console.error(`${ve}LayoutRegistry.get FAILED`, { layoutId: e, url: t, error: i }), sc({
      id: e,
      version: 0,
      root: { type: "stack", children: [] }
    });
  }
}, Me(Zi, us), Me(Zi, Mi, /* @__PURE__ */ new Map());
function _s(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function wb(a = {}) {
  var i, n, s, r;
  const e = Array.isArray((i = a == null ? void 0 : a.attack) == null ? void 0 : i.targets) ? a.attack.targets : [], t = pi(((n = a == null ? void 0 : a.attack) == null ? void 0 : n.areaEffect) ?? ((r = (s = a == null ? void 0 : a.attack) == null ? void 0 : s.payload) == null ? void 0 : r.areaEffect) ?? {});
  if (!e.length && t.kind !== Tt.persistent)
    throw new Error("Attack requires at least one target.");
  return e;
}
async function _d(a = {}) {
  if (!(a != null && a.actorUuid)) return null;
  try {
    return await fromUuid(a.actorUuid);
  } catch (e) {
    return console.warn("MWD | Unable to resolve attack target actor for CQ", a, e), null;
  }
}
function Tb(a = {}, e = null, t = "") {
  var i, n, s, r, o;
  return Math.max(0, _s(
    ((i = a == null ? void 0 : a.attributes) == null ? void 0 : i[t]) ?? ((n = e == null ? void 0 : e.getAttributeValue) == null ? void 0 : n.call(e, t)) ?? ((o = (r = (s = e == null ? void 0 : e.system) == null ? void 0 : s.attributes) == null ? void 0 : r[t]) == null ? void 0 : o.value),
    0
  ));
}
function vb(a = {}, e = null, t = "") {
  var i, n, s, r, o, l;
  return Math.max(0, _s(
    ((n = (i = a == null ? void 0 : a.skills) == null ? void 0 : i[t]) == null ? void 0 : n.rating) ?? ((s = e == null ? void 0 : e.getSkillRating) == null ? void 0 : s.call(e, t)) ?? ((l = (o = (r = e == null ? void 0 : e.system) == null ? void 0 : r.skills) == null ? void 0 : o[t]) == null ? void 0 : l.rating),
    0
  ));
}
function rc(a = []) {
  return a.reduce((e, t) => e + _s(t == null ? void 0 : t.value, 0), 0);
}
async function kb({ attacker: a = null, ctx: e = {}, target: t = {} } = {}) {
  var H, Y, Q, K, G, L, z, q, ee, oe, ke, fe, ne, $e, Qe, Je, it, dt, mt, ft, pt, ht;
  const i = await _d(t), n = Math.max(0, Number(((K = (Y = (H = e == null ? void 0 : e.attack) == null ? void 0 : H.weapon) == null ? void 0 : Y.attackRatingBand) == null ? void 0 : K[(Q = e == null ? void 0 : e.attack) == null ? void 0 : Q.rangeBand]) ?? 0) || 0), s = Os(i), r = s ? A.actorAttributes.handling : "reflexes", o = Tb(t, i, r), l = o + o, c = String(((L = (G = e == null ? void 0 : e.attack) == null ? void 0 : G.skill) == null ? void 0 : L.code) ?? ((q = (z = e == null ? void 0 : e.attack) == null ? void 0 : z.weapon) == null ? void 0 : q.skill) ?? "").trim(), u = String(((oe = (ee = e == null ? void 0 : e.attack) == null ? void 0 : ee.skill) == null ? void 0 : oe.label) ?? c ?? "Attack Skill").trim() || "Attack Skill", d = c ? Math.max(0, _s(((ke = a == null ? void 0 : a.getSkillRating) == null ? void 0 : ke.call(a, c)) ?? (($e = (ne = (fe = a == null ? void 0 : a.system) == null ? void 0 : fe.skills) == null ? void 0 : ne[c]) == null ? void 0 : $e.rating), 0)) : 0, m = s ? "piloting" : "tactics", f = s ? "Piloting" : "Tactics", p = vb(t, i, m), h = d - p, g = Math.abs(h), y = Math.max(0, Number(((Qe = t == null ? void 0 : t.activeArmor) == null ? void 0 : Qe.defenseBonus) ?? 0) || 0), b = String(((Je = e == null ? void 0 : e.attack) == null ? void 0 : Je.rangeBand) ?? "").trim() || "range", T = [{
    id: "weapon.attackRating",
    label: `Weapon AR (${((dt = (it = e == null ? void 0 : e.attack) == null ? void 0 : it.weapon) == null ? void 0 : dt.type) === "personalWeapon" || (ft = (mt = e == null ? void 0 : e.attack) == null ? void 0 : mt.weapon) != null && ft.isSynthetic ? Es(b) : b})`,
    value: n
  }], E = [{
    id: s ? "target.handlingDefense" : "target.reflexesDefense",
    label: s ? "Target Handling + Handling" : "Target REF + REF",
    value: l
  }];
  h > 0 ? T.push({
    id: "skill.attackVsTactics",
    label: `${u} over Tactics`,
    value: g
  }) : h < 0 && E.push({
    id: "target.tacticsAdvantage",
    label: `${f} over ${u}`,
    value: g
  }), (ht = (pt = e == null ? void 0 : e.attack) == null ? void 0 : pt.aim) != null && ht.eligible && T.push({
    id: "state.aim",
    label: `Aim (${u})`,
    value: d
  }), E.push({
    id: "target.armorDefense",
    label: "Armor Defense",
    value: y
  });
  const P = rc(T), C = rc(E);
  return {
    ar: {
      parts: T,
      total: P
    },
    dr: {
      parts: E,
      total: C
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
    value: P - C
  };
}
function Mb(a = {}, e = {}) {
  var p, h, g, y, b, S, T, E;
  const t = (a == null ? void 0 : a.attack) ?? {}, i = String(((h = (p = t == null ? void 0 : t.payload) == null ? void 0 : p.modifies) == null ? void 0 : h.damageType) ?? "").trim(), n = Math.max(0, Number(((g = t == null ? void 0 : t.weapon) == null ? void 0 : g.damage) ?? 0) || 0), s = !!(a != null && a.targetIsMachine), r = i || ((y = t == null ? void 0 : t.weapon) == null ? void 0 : y.damageType), o = s ? String(r ?? "kinetic").trim() || "kinetic" : qt(r, "concussive"), l = Math.max(0, Number((t == null ? void 0 : t.totalAp) ?? ((b = t == null ? void 0 : t.weapon) == null ? void 0 : b.ap) ?? 0) || 0), c = e.outcome === "graze" ? n / 2 : e.outcome === "hit" ? n : 0, u = c + Number(e.netHits ?? 0), d = bo((t == null ? void 0 : t.currentExposure) ?? Oi({
    tier: ((S = t == null ? void 0 : t.currentExposure) == null ? void 0 : S.initialTier) ?? ((T = t == null ? void 0 : t.currentExposure) == null ? void 0 : T.tier) ?? "none"
  }), {
    active: !!(t != null && t.evadeActive),
    locked: !!(t != null && t.evadeLocked)
  }), m = pi((t == null ? void 0 : t.areaEffect) ?? ((E = t == null ? void 0 : t.payload) == null ? void 0 : E.areaEffect) ?? {}), f = m.kind === Tt.persistent ? u : qi(u, d.finalTier);
  return {
    baseDamage: n,
    effectiveWeaponDamage: c,
    netHits: Number(e.netHits ?? 0),
    incoming: u,
    scaledIncoming: f,
    ap: l,
    damageType: o,
    damageTypeLabel: s ? o : Vt(o),
    exposure: d,
    areaEffect: m
  };
}
function Eb(a = {}) {
  return String((a == null ? void 0 : a.tokenUuid) ?? (a == null ? void 0 : a.actorUuid) ?? (a == null ? void 0 : a.tokenId) ?? (a == null ? void 0 : a.actorId) ?? (a == null ? void 0 : a.name) ?? foundry.utils.randomID()).trim();
}
function oc(a, e) {
  var s, r;
  const t = ((r = (s = a == null ? void 0 : a.system) == null ? void 0 : s.monitors) == null ? void 0 : r[e]) ?? {}, i = Math.max(0, Number(t.max ?? 0) || 0), n = Math.min(i, Math.max(0, Number(t.value ?? 0) || 0));
  return Math.max(0, i - n);
}
function Cb({ attacker: a, ctx: e, damage: t, targetActor: i = null, hitLocation: n = null } = {}) {
  var s, r, o, l, c, u, d, m, f, p, h;
  return Os(i) ? {
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
    notes: (h = t == null ? void 0 : t.exposure) != null && h.initialTier ? `Exposure ${Dt(t.exposure.initialTier)}${t.exposure.evadeUsed ? ` -> ${Dt(t.exposure.finalTier)}` : ""}` : ""
  };
}
function ma(a, e = {}, t = {}, { queued: i = !1, applied: n = !1, skipped: s = !1, reason: r = "" } = {}) {
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
async function Pb({ attacker: a, ctx: e, target: t, outcome: i, damage: n } = {}) {
  var d;
  if ((i == null ? void 0 : i.outcome) === "miss")
    return ma(null, t, n, { skipped: !0, reason: "Missed target." });
  if (((d = n == null ? void 0 : n.areaEffect) == null ? void 0 : d.kind) === Tt.persistent)
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
    return console.warn("MWD | Unable to resolve target for queued attack damage", t, m), ma(null, t, n, { reason: "Unable to resolve attack target." });
  }
  const l = Os(r) ? hd({
    actor: r,
    rollTotal: pd(),
    armorBefore: oc(r, A.monitors.armor),
    structureBefore: oc(r, A.monitors.structure)
  }) : null, c = Cb({ attacker: a, ctx: e, damage: n, targetActor: r, hitLocation: l }), u = await vt.apply({
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
    const m = ma(u, t, n, { queued: !0, applied: !1 });
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
  return ma(u, t, n, { reason: "Unable to preview attack damage." });
}
async function Nb({ attacker: a, ctx: e, outcomeModel: t, target: i, previewState: n = {} } = {}) {
  var b, S;
  const s = await kb({ attacker: a, ctx: e, target: i }), r = await _d(i), o = Number((t == null ? void 0 : t.margin) ?? 0), l = Number(s.value ?? 0), c = o;
  let u = l > 0 ? o >= 1 ? "hit" : o === 0 ? "graze" : "miss" : l < 0 ? o >= 2 ? "hit" : o === 1 ? "graze" : "miss" : o >= 1 ? "hit" : "miss";
  String(((b = e == null ? void 0 : e.attack) == null ? void 0 : b.rangeBand) ?? "").trim().toLowerCase() === "outofrange" && u === "hit" && (u = "graze");
  const d = u === "hit" ? Math.max(0, c) : 0, m = (e == null ? void 0 : e.attack) ?? {}, f = Eb(i), p = (n == null ? void 0 : n[f]) ?? {}, h = (i == null ? void 0 : i.exposure) ?? Oi({ tier: "none" }), g = Mb({
    ...e,
    targetIsMachine: Os(r),
    attack: {
      ...m,
      currentExposure: h,
      areaEffect: (m == null ? void 0 : m.areaEffect) ?? ((S = m == null ? void 0 : m.payload) == null ? void 0 : S.areaEffect) ?? null,
      evadeActive: !!(p != null && p.evadeActive),
      evadeLocked: !!(h != null && h.evadeLocked)
    }
  }, { outcome: u, netHits: d }), y = await Pb({
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
function Rb(a = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of a)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
async function Ld({ attacker: a, ctx: e, outcomeModel: t, previewState: i = {}, existingAttackResult: n = null } = {}) {
  var c, u, d, m, f, p;
  const s = wb(e), r = [];
  for (const h of s)
    r.push(await Nb({ attacker: a, ctx: e, outcomeModel: t, target: h, previewState: i }));
  const o = pi(((c = e == null ? void 0 : e.attack) == null ? void 0 : c.areaEffect) ?? ((d = (u = e == null ? void 0 : e.attack) == null ? void 0 : u.payload) == null ? void 0 : d.areaEffect) ?? {});
  let l = String((n == null ? void 0 : n.persistentRegionUuid) ?? "").trim() || null;
  if (o.kind === Tt.persistent && !l) {
    const h = await jp({
      attacker: a,
      attack: (e == null ? void 0 : e.attack) ?? {},
      targetResult: r[0] ?? null
    });
    l = (h == null ? void 0 : h.uuid) ?? null;
  }
  return {
    targetCount: s.length,
    results: r,
    summary: Rb(r),
    areaEffect: o,
    templateGeometry: ii(Le(
      (m = e == null ? void 0 : e.attack) == null ? void 0 : m.templateGeometry,
      {
        template: (f = e == null ? void 0 : e.attack) == null ? void 0 : f.template,
        placement: (p = e == null ? void 0 : e.attack) == null ? void 0 : p.templatePlacement
      }
    )),
    persistentRegionUuid: l
  };
}
function xe(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
function nr(a, e = 0, t = Number.POSITIVE_INFINITY) {
  const i = xe(a, e);
  return Math.max(e, Math.min(t, i));
}
function xd(a, e = 1) {
  var i;
  const t = xe((i = a == null ? void 0 : a.difficulty) == null ? void 0 : i.dn, xe(e, 1));
  return Math.max(0, t);
}
function Ib(a, e) {
  return Math.max(0, xe(a, 0) - xe(e, 0));
}
function Db({ convert: a, remainder: e, rate: t = 4 } = {}) {
  const i = Math.max(0, xe(e, 0)), n = Math.max(1, xe(t, 4)), s = Math.max(0, xe(a, 0)), r = Math.floor(s / n) * n;
  return Math.min(i, r);
}
function Ko(a, { rate: e = 4, maxPerRoll: t = Number.POSITIVE_INFINITY } = {}) {
  const i = Math.max(1, xe(e, 4)), n = Math.floor(Math.max(0, xe(a, 0)) / i), s = Number.isFinite(t) ? Math.max(0, xe(t, 0)) : Number.POSITIVE_INFINITY;
  return { amount: Math.min(n, s), rate: i };
}
function Go(a) {
  var i;
  const e = ((i = a == null ? void 0 : a.edge) == null ? void 0 : i.earn) ?? {};
  return {
    enabled: !!(e != null && e.enabled),
    rate: Math.max(1, xe(e == null ? void 0 : e.rate, 4)),
    maxPerRoll: (e == null ? void 0 : e.maxPerRoll) ?? Number.POSITIVE_INFINITY
  };
}
function ss(a) {
  var t;
  const e = (t = a == null ? void 0 : a.edge) == null ? void 0 : t.pool;
  return e ? String(e) : null;
}
function Ob(a) {
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
function $d(a, e) {
  if (xe(a, 0) !== 0) return !1;
  const { dice: t, ones: i } = Ob(e);
  return t <= 0 ? !1 : i >= Math.ceil(t / 2);
}
function _b(a, e, t = 4) {
  return !!(a && xe(e, 0) >= xe(t, 4));
}
function lc(a, e) {
  const t = xe(e == null ? void 0 : e.successes, 0), i = xd(a, 1), n = t >= i, s = t - i, r = _b(n, s, 4), o = $d(t, e == null ? void 0 : e.raw), l = Go(a), c = l.maxPerRoll ?? 1, u = l.enabled && s >= l.rate ? (() => {
    const { amount: m, rate: f } = Ko(s, { rate: l.rate, maxPerRoll: c }), p = ss(a);
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
function Lb(a, e, t) {
  var m, f;
  const i = xe(e == null ? void 0 : e.successes, 0), n = xe(t == null ? void 0 : t.successes, 0), s = !!((m = a == null ? void 0 : a.opposed) != null && m.net), r = String(((f = a == null ? void 0 : a.opposed) == null ? void 0 : f.dnTies) ?? "stalemate");
  let o = null, l = !1;
  s ? (o = i - n, o > 0 ? l = !0 : o < 0 ? l = !1 : r === "attackerWins" ? l = !0 : l = !1) : i > n ? l = !0 : i < n ? l = !1 : r === "attackerWins" ? l = !0 : l = !1;
  const c = Go(a), u = c.maxPerRoll ?? 1, d = c.enabled && s && typeof o == "number" && o >= c.rate ? (() => {
    const { amount: p, rate: h } = Ko(o, { rate: c.rate, maxPerRoll: u }), g = ss(a);
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
function xb(a, e) {
  var h, g, y;
  const t = xe(e == null ? void 0 : e.successes, 0), i = xd(a, 1), n = t >= i, s = $d(t, e == null ? void 0 : e.raw), r = Ib(t, i), o = ((h = a == null ? void 0 : a.net) == null ? void 0 : h.convert) ?? ((g = a == null ? void 0 : a.allocation) == null ? void 0 : g.convert) ?? 0, l = Go(a), c = l.rate, u = Db({ convert: o, remainder: r, rate: c }), d = r - u, m = l.enabled && u >= c ? (() => {
    const { amount: b } = Ko(u, { rate: c, maxPerRoll: l.maxPerRoll }), S = ss(a);
    return b > 0 ? { amount: b, pool: S, reason: "convert4", details: { converted: u, rate: c } } : null;
  })() : null, f = s ? { amount: 1, pool: ss(a), reason: "critFail", details: { onesRule: "halfOrMoreOnes" } } : null, p = [];
  return m && p.push(m), f && p.push(f), p.length === 0 || (p.length === 1 ? p[0] : (p.reduce((b, S) => b + (Number(S == null ? void 0 : S.amount) || 0), 0), (y = p[0]) == null || y.pool)), {
    rollType: "net",
    passed: n,
    successes: t,
    difficulty: { dn: i },
    criticalFailure: s,
    tier: s ? "criticalFailure" : n ? "success" : "failure",
    net: {
      remainder: r,
      convertRequested: xe(o, 0),
      converted: u,
      value: d,
      // the actual net effect magnitude you apply (+net dice, etc.)
      rate: c,
      canConvert: r >= c
    },
    edgeEarned: m
  };
}
function $b(a, e) {
  var o, l, c, u;
  const t = xe(e == null ? void 0 : e.successes, 0), i = nr((o = a == null ? void 0 : a.extended) == null ? void 0 : o.target, 1, 1e4), n = nr((l = a == null ? void 0 : a.extended) == null ? void 0 : l.accumulated, 0, 1e4), s = nr(n + t, 0, 1e4), r = s >= i;
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
function Bd(a, e, t = null) {
  var n;
  switch (String((a == null ? void 0 : a.rollType) ?? "simple")) {
    case "simple":
      return lc(a, e);
    case "opposed":
      return Lb(a, e, t);
    case "net":
      return xb(a, e);
    case "extended":
      return $b(a, e);
    default: {
      const s = {
        ...a,
        difficulty: { dn: Number(((n = a == null ? void 0 : a.difficulty) == null ? void 0 : n.dn) ?? 1) || 1 }
      };
      return lc(s, e);
    }
  }
}
function Bb(a, e) {
  var c, u, d, m, f, p, h, g, y;
  const t = a ?? {}, i = Array.isArray((c = t == null ? void 0 : t.modifiers) == null ? void 0 : c.applied) ? t.modifiers.applied : [], n = Number(((u = t == null ? void 0 : t.modifiers) == null ? void 0 : u.total) ?? 0);
  if (i.length) {
    const b = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((S) => S.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${i.map((S) => `${S.label} ${cc(S.value)}`).join(", ")} (Total ${cc(n)})`,
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
function cc(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function zb(a, e) {
  var g, y, b, S, T, E, P, C, H, Y, Q, K, G, L, z, q, ee, oe, ke, fe, ne, $e, Qe, Je, it, dt, mt, ft, pt, ht, _t, Lt, xt, $t;
  const t = a ?? {}, i = (t == null ? void 0 : t.attackResult) ?? null;
  if (!i) return;
  const n = Array.isArray(i == null ? void 0 : i.results) ? i.results : [], s = (i == null ? void 0 : i.summary) ?? Ub(n), r = n.some((R) => {
    var B;
    return !!((B = R == null ? void 0 : R.queuedMutation) != null && B.applied);
  }), o = n.filter(
    (R) => (R == null ? void 0 : R.queuedMutation) && !R.queuedMutation.applied
  ), l = !!((y = (g = t == null ? void 0 : t.attack) == null ? void 0 : g.capabilityReport) != null && y.isTemplated), c = Array.isArray((b = t == null ? void 0 : t.modifiers) == null ? void 0 : b.applied) ? t.modifiers.applied : [], u = Number(((S = t == null ? void 0 : t.modifiers) == null ? void 0 : S.total) ?? 0);
  if (c.length) {
    const R = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((B) => B.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${c.map((B) => `${B.label} ${fa(B.value)}`).join(", ")} (Total ${fa(u)})`,
      title: (R == null ? void 0 : R.tooltip) ?? ""
    });
  }
  const d = (t == null ? void 0 : t.edge) ?? null, m = Array.isArray((T = t == null ? void 0 : t.roll) == null ? void 0 : T.failureDiceRefs) ? t.roll.failureDiceRefs : [], f = !!((E = d == null ? void 0 : d.availableActions) != null && E.canPostRerollFailures) && !r, p = Array.isArray((P = d == null ? void 0 : d.allowed) == null ? void 0 : P.postPools) ? d.allowed.postPools : [];
  if (d != null && d.domain && (e.edge = {
    domain: d.domain,
    earned: ((C = t == null ? void 0 : t.outcomeModel) == null ? void 0 : C.edgeEarned) ?? null,
    preSpent: Number(((H = d == null ? void 0 : d.pre) == null ? void 0 : H.spent) ?? 0),
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
    for (const R of e.edge.postPools)
      e.actions.push({
        action: "edgePostReroll",
        label: `Spend ${R}`,
        dataset: { "pool-key": R },
        cssClass: "mwd-edge-post"
      });
  }
  const h = String((s == null ? void 0 : s.overallOutcome) ?? "").trim();
  if (e.outcomeText = n.length > 1 ? `ATTACK ${s.hits} HIT / ${s.grazes} GRAZE / ${s.misses} MISS` : h === "hit" ? "HIT!" : h === "graze" ? "GRAZE!" : "MISS!", e.metaRows.push({
    text: `Targets: ${n.length || 0}`,
    title: ""
  }), l && (e.targetRows = n.map((R, B) => {
    var Be, Ye, at, kt, X, Se, Xe, Ze;
    const be = ((Be = t == null ? void 0 : t.areaEffectPreviewState) == null ? void 0 : Be[R == null ? void 0 : R.previewKey]) ?? {}, te = ((Ye = R == null ? void 0 : R.damage) == null ? void 0 : Ye.exposure) ?? (R == null ? void 0 : R.exposure) ?? null, Pe = String((te == null ? void 0 : te.initialLabel) ?? "NONE").trim() || "NONE", gt = String((te == null ? void 0 : te.finalLabel) ?? Pe).trim() || Pe, k = Number(((at = R == null ? void 0 : R.damage) == null ? void 0 : at.incoming) ?? 0), N = Number(((kt = R == null ? void 0 : R.damage) == null ? void 0 : kt.scaledIncoming) ?? k), j = (R == null ? void 0 : R.queuedMutation) ?? null, he = !!(j != null && j.applied || (X = R == null ? void 0 : R.damageResult) != null && X.applied), le = (be == null ? void 0 : be.reactionPreview) ?? null, Ee = [];
    if (!he && Pe !== "NONE" && ((Se = R == null ? void 0 : R.damageResult) != null && Se.ok) && !((Xe = R == null ? void 0 : R.damageResult) != null && Xe.skipped) && Ee.push({
      action: "toggleEvade",
      label: R != null && R.evadeActive ? "Clear Evade" : "Use Reaction",
      dataset: { "preview-key": R.previewKey },
      cssClass: `mwd-target-row__action ${R != null && R.evadeActive ? "is-active" : ""}`
    }), R != null && R.evadeActive && (le != null && le.canSpendEdge) && Array.isArray(le.edgePools))
      for (const je of le.edgePools)
        Ee.push({
          action: "toggleEvadeEdge",
          label: (be == null ? void 0 : be.edgePoolKey) === je.key ? `Edge: ${je.key}` : `Use ${je.key}`,
          dataset: {
            "preview-key": R.previewKey,
            "pool-key": je.key
          },
          cssClass: `mwd-target-row__action ${(be == null ? void 0 : be.edgePoolKey) === je.key ? "is-active" : ""}`
        });
    return j && !he && Ee.push({
      action: "applyAttackDamage",
      label: "Apply Damage",
      dataset: { "result-index": String(B) },
      cssClass: "mwd-target-row__action mwd-apply-attack-damage"
    }), {
      targetName: ((Ze = R == null ? void 0 : R.target) == null ? void 0 : Ze.name) ?? "Target",
      applied: he,
      outcomeLabel: String((R == null ? void 0 : R.outcome) ?? "miss").toUpperCase(),
      exposureLabel: Pe === gt ? Pe : `${Pe} -> ${gt}`,
      damageLabel: k === N ? String(N) : `${k} -> ${N}`,
      reactionHint: R != null && R.evadeActive ? be != null && be.edgePoolKey ? "Evade active. Reaction Burn canceled by Edge." : (le == null ? void 0 : le.burnDelta) > 0 ? `Evade active. This reaction adds +${le.burnDelta} Burn.` : "Evade active." : "",
      rowActions: Ee
    };
  })), n.length > 1 && o.length > 1 && e.actions.push({
    action: "applyAllAttackDamage",
    label: `Apply All Damage (${o.length})`,
    cssClass: "mwd-apply-all-attack-damage"
  }), !l)
    for (const R of n) {
      const B = Number(((G = (K = R == null ? void 0 : R.cq) == null ? void 0 : K.ar) == null ? void 0 : G.total) ?? 0), be = Number(((z = (L = R == null ? void 0 : R.cq) == null ? void 0 : L.dr) == null ? void 0 : z.total) ?? 0);
      e.metaRows.push({
        text: `${((q = R == null ? void 0 : R.target) == null ? void 0 : q.name) ?? "Target"}: ${String((R == null ? void 0 : R.outcome) ?? "miss").toUpperCase()} | CQ ${fa(((ee = R == null ? void 0 : R.cq) == null ? void 0 : ee.value) ?? 0)} (AR ${B} - DR ${be}) | Net ${Number((R == null ? void 0 : R.netHits) ?? 0)}`,
        title: Fb(R == null ? void 0 : R.cq)
      });
    }
  if (!l)
    for (const [R, B] of n.entries()) {
      const be = (B == null ? void 0 : B.damage) ?? null;
      be && (B == null ? void 0 : B.outcome) !== "miss" && e.footerRows.push({
        text: `${((oe = B == null ? void 0 : B.target) == null ? void 0 : oe.name) ?? "Target"}: ${be.damageTypeLabel} ${fa(be.effectiveWeaponDamage)} weapon${be.netHits ? ` + ${be.netHits} net` : ""}`,
        title: ""
      });
      const te = (B == null ? void 0 : B.damageResult) ?? null;
      if (te != null && te.ok && !(te != null && te.skipped)) {
        const Pe = (B == null ? void 0 : B.queuedMutation) ?? (te == null ? void 0 : te.queuedMutation) ?? null, gt = !!(Pe != null && Pe.applied || te != null && te.applied);
        if (te.mode === "machineAttackDamage") {
          const k = te.machine ?? {}, N = te.hitLocation ?? {};
          e.footerRows.push({
            text: `${((ke = B == null ? void 0 : B.target) == null ? void 0 : ke.name) ?? "Target"}: Location ${N.locationLabel ?? "Location"}${N.rollTotal ? ` (${N.rollTotal})` : ""} | Armor ${Number(k.armorBefore ?? 0)} -> ${Number(k.armorAfter ?? 0)} | Structure ${Number(k.structureBefore ?? 0)} -> ${Number(k.structureAfter ?? 0)}`,
            title: ""
          }), (fe = te.critical) != null && fe.automatic ? e.footerRows.push({
            text: `${((ne = B == null ? void 0 : B.target) == null ? void 0 : ne.name) ?? "Target"}: Automatic critical pending`,
            title: ""
          }) : ($e = te.critical) != null && $e.optional ? e.footerRows.push({
            text: `${((Qe = B == null ? void 0 : B.target) == null ? void 0 : Qe.name) ?? "Target"}: Chaos Edge can convert this location hit to a critical`,
            title: ""
          }) : e.footerRows.push({
            text: `${((Je = B == null ? void 0 : B.target) == null ? void 0 : Je.name) ?? "Target"}: Location hit is descriptive only`,
            title: ""
          });
          for (const j of ((it = te.critical) == null ? void 0 : it.records) ?? [])
            e.footerRows.push({
              text: `${((dt = B == null ? void 0 : B.target) == null ? void 0 : dt.name) ?? "Target"}: Critical - ${j.label}${j.locationLabel ? ` (${j.locationLabel})` : ""}`,
              title: ""
            }), j.active !== !1 && e.actions.push({
              action: "machineCritRemedy",
              label: `Remedy: ${j.label}`,
              dataset: {
                "machine-actor-uuid": ((mt = B == null ? void 0 : B.target) == null ? void 0 : mt.actorUuid) ?? "",
                "crit-id": j.id,
                "remedy-key": j.remedyKey,
                "gm-override": "true"
              },
              cssClass: "mwd-machine-crit-remedy"
            });
        }
        Pe && !gt && ((ft = te == null ? void 0 : te.critical) != null && ft.optional) && e.actions.push({
          action: "toggleMachineChaosCrit",
          label: (pt = Pe.payload) != null && pt.chaosCriticalSelected ? `Clear Chaos Critical: ${te.actorName ?? ((ht = B == null ? void 0 : B.target) == null ? void 0 : ht.name) ?? "Target"}` : `Spend Chaos Edge: ${te.actorName ?? ((_t = B == null ? void 0 : B.target) == null ? void 0 : _t.name) ?? "Target"}`,
          dataset: { "result-index": String(R) },
          cssClass: `mwd-toggle-machine-chaos ${(Lt = Pe.payload) != null && Lt.chaosCriticalSelected ? "is-active" : ""}`
        }), Pe && !gt && e.actions.push({
          action: "applyAttackDamage",
          label: `Apply Damage: ${te.actorName ?? ((xt = B == null ? void 0 : B.target) == null ? void 0 : xt.name) ?? "Target"}`,
          dataset: { "result-index": String(R) },
          cssClass: "mwd-apply-attack-damage"
        });
      } else te != null && te.reason && e.footerRows.push({
        text: `${(($t = B == null ? void 0 : B.target) == null ? void 0 : $t.name) ?? "Target"}: ${te.reason}`,
        title: ""
      });
    }
}
function Fb(a = {}) {
  var i, n;
  const e = Array.isArray((i = a == null ? void 0 : a.ar) == null ? void 0 : i.parts) ? a.ar.parts : [], t = Array.isArray((n = a == null ? void 0 : a.dr) == null ? void 0 : n.parts) ? a.dr.parts : [];
  return [
    ...e.map((s) => `AR - ${s.label}: ${fa(s.value)}`),
    ...t.map((s) => `DR - ${s.label}: ${fa(s.value)}`)
  ].join(`
`);
}
function Ub(a = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of a)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
function fa(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function Hb(a, e) {
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
function Wb(a, e) {
  var l, c, u, d;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, n = Number(((l = i == null ? void 0 : i.attacker) == null ? void 0 : l.successes) ?? (i == null ? void 0 : i.attackerHits) ?? NaN), s = Number(((c = i == null ? void 0 : i.defender) == null ? void 0 : c.successes) ?? (i == null ? void 0 : i.defenderHits) ?? NaN), r = Number((i == null ? void 0 : i.netHits) ?? (i == null ? void 0 : i.net) ?? NaN);
  Number.isFinite(n) && Number.isFinite(s) && e.metaRows.push({ text: `Opposed: Att ${n} vs Def ${s} • Net ${Number.isFinite(r) ? r : n - s}` }), (u = t == null ? void 0 : t.incoming) != null && u.label && (e.incoming = { label: t.incoming.label, value: t.incoming.value ?? "" }, e.footerRows.push({ text: `Incoming: ${e.incoming.label} ${e.incoming.value}` }));
  const o = ((d = i == null ? void 0 : i.edgeEarned) == null ? void 0 : d.amount) > 0 ? i.edgeEarned : null;
  o && e.footerRows.push({ text: `Edge Earned: +${o.amount}${o.pool ? ` (${o.pool})` : ""}` });
}
function jb(a, e) {
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
const Kb = {
  skill: Bb,
  attack: zb,
  net: Hb,
  opposed: Wb,
  extended: jb
  // defense: enhanceDefense,
  // edge: enhanceEdge,
};
async function Da({ resolved: a } = {}) {
  const e = a ?? {}, t = Gb(e), i = Kb[t.intent];
  return typeof i == "function" && i(e, t), await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-roll-card",
    t
  );
}
function Gb(a) {
  var f, p, h, g, y, b, S, T, E, P, C, H, Y, Q, K, G, L;
  const e = a ?? {}, t = Number(((f = e == null ? void 0 : e.roll) == null ? void 0 : f.target) ?? 5), i = Number(((p = e == null ? void 0 : e.dn) == null ? void 0 : p.total) ?? ((g = (h = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : h.dn) == null ? void 0 : g.total) ?? ((b = (y = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : y.difficulty) == null ? void 0 : b.dn) ?? 0), n = Number(((S = e == null ? void 0 : e.roll) == null ? void 0 : S.pool) ?? 0), s = Number(((T = e == null ? void 0 : e.outcome) == null ? void 0 : T.hits) ?? 0), r = (e == null ? void 0 : e.outcomeModel) ?? {}, o = typeof r.passed == "boolean" ? r.passed : s >= i, l = Number.isFinite(Number(r.margin)) ? Number(r.margin) : s - i, c = r.tier ?? null, u = Array.isArray(e == null ? void 0 : e.breakdownRows) ? e.breakdownRows.map((z) => `${z.label}: ${z.value}`).join(`
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
  if ((E = e == null ? void 0 : e.specialization) != null && E.label && d.metaRows.push({
    text: `Specialization: ${e.specialization.label} (+${Number(e.specialization.value ?? 0)})`,
    title: ""
  }), (P = m == null ? void 0 : m.weapon) != null && P.name) {
    const z = ((C = m == null ? void 0 : m.weapon) == null ? void 0 : C.type) === "personalWeapon" || (H = m == null ? void 0 : m.weapon) != null && H.isSynthetic ? Es((m == null ? void 0 : m.rangeBand) ?? "") : String((m == null ? void 0 : m.rangeBand) ?? "").trim(), q = String(((Y = m == null ? void 0 : m.weapon) == null ? void 0 : Y.damageTypeLabel) ?? ((Q = m == null ? void 0 : m.weapon) == null ? void 0 : Q.damageType) ?? "").trim(), ee = String(((K = m == null ? void 0 : m.payload) == null ? void 0 : K.label) ?? ((G = m == null ? void 0 : m.weapon) == null ? void 0 : G.payloadLabel) ?? "").trim();
    d.metaRows.push({
      text: `Weapon: ${m.weapon.name}${z ? ` • Range: ${z}` : ""}${q ? ` • Type: ${q}` : ""}${ee ? ` • Payload: ${ee}` : ""}`,
      title: ""
    }), (L = m == null ? void 0 : m.sourceState) != null && L.isTracked && d.footerRows.push({
      text: `Source: ${Number(m.sourceState.current ?? 0)}/${Number(m.sourceState.max ?? 0)}`,
      title: ""
    });
  }
  return d;
}
async function uc(a = "") {
  const e = String(a ?? "").trim();
  if (!e || typeof fromUuid != "function") return null;
  try {
    return await fromUuid(e);
  } catch {
    return null;
  }
}
async function zd({
  machineActor: a = null,
  operatorActorUuid: e = ""
} = {}) {
  var r, o, l, c, u, d, m, f, p, h, g, y, b;
  const t = await uc(e);
  if (t)
    return { actor: t, uuid: t.uuid ?? e, source: "explicit", reason: "" };
  const i = String(
    ((o = (r = a == null ? void 0 : a.system) == null ? void 0 : r.pilot) == null ? void 0 : o.uuid) ?? ((u = (c = (l = a == null ? void 0 : a.system) == null ? void 0 : l.mwd) == null ? void 0 : c.pilot) == null ? void 0 : u.uuid) ?? ((f = (m = (d = a == null ? void 0 : a.system) == null ? void 0 : d.mwd) == null ? void 0 : m.crew) == null ? void 0 : f.operatorActorUuid) ?? ((g = (h = (p = a == null ? void 0 : a.system) == null ? void 0 : p.mwd) == null ? void 0 : h.crew) == null ? void 0 : g.pilotActorUuid) ?? ""
  ).trim(), n = await uc(i);
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
async function qb(a = "") {
  const e = String(a ?? "").trim();
  if (!e || typeof fromUuid != "function") return null;
  try {
    return await fromUuid(e);
  } catch {
    return null;
  }
}
function Vb(a) {
  var e, t;
  return Array.isArray((t = (e = a == null ? void 0 : a.system) == null ? void 0 : e.mwd) == null ? void 0 : t.crits) ? a.system.mwd.crits.filter((i) => (i == null ? void 0 : i.active) !== !1) : [];
}
async function Yb(a) {
  if (!(Vb(a).length || !(a != null && a.toggleStatusEffect)))
    try {
      await vs({
        actor: a,
        statusId: gd,
        active: !1
      });
    } catch (e) {
      console.warn("MWD | Unable to clear machine critical status", e);
    }
}
async function Fd(a = {}, e = {}) {
  var d, m, f, p, h;
  if (String((a == null ? void 0 : a.intent) ?? "") !== "machine_crit_remedy")
    return { ok: !1, reason: "Unsupported machine intent." };
  const t = await qb(a.machineActorUuid);
  if (!t) return { ok: !1, reason: "Machine actor could not be resolved." };
  const i = String(a.critId ?? "").trim(), n = Array.isArray((m = (d = t.system) == null ? void 0 : d.mwd) == null ? void 0 : m.crits) ? t.system.mwd.crits.slice() : [], s = n.findIndex((g) => String((g == null ? void 0 : g.id) ?? "") === i && (g == null ? void 0 : g.active) !== !1);
  if (s < 0) return { ok: !1, reason: "That critical effect is no longer active." };
  const r = n[s], o = Uo(a.remedyKey || r.remedyKey), l = !!(e.gmOverride ?? ((p = (f = globalThis.game) == null ? void 0 : f.user) == null ? void 0 : p.isGM)), c = await zd({
    machineActor: t,
    operatorActorUuid: a.operatorActorUuid
  });
  if (!c.actor && !l)
    return { ok: !1, reason: c.reason || "No linked operator or pilot actor." };
  let u = { ok: !0, skipped: !0 };
  return c.actor && !l && (u = await (e.spendResource ?? x.spendResource.bind(x))(c.actor, {
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
  }, await t.update({ "system.mwd.crits": n }), await Yb(t), {
    ok: !0,
    machineActor: t,
    operatorActor: c.actor,
    crit: n[s],
    remedy: o,
    spend: u
  });
}
function Qb() {
  Hooks.on("renderChatMessageHTML", (a, e) => {
    e.addEventListener("click", (t) => {
      const i = t.target.closest("[data-mwd-action]");
      if (!i) return;
      const n = String(i.dataset.mwdAction || "").trim();
      n && (n === "edgePostReroll" && yS(t, a), n === "toggleEvade" && oS(t, a), n === "toggleEvadeEdge" && lS(t, a), n === "toggleHazardEvade" && fS(t, a), n === "toggleHazardEvadeEdge" && pS(t, a), n === "applyHazardTick" && hS(t, a), n === "toggleMachineChaosCrit" && dS(t, a), n === "machineCritRemedy" && mS(t), n === "applyAttackDamage" && sS(t, a), n === "applyAllAttackDamage" && cS(t, a));
    });
  });
}
function Jb(a = {}) {
  var t;
  return (Array.isArray((t = a == null ? void 0 : a.attackResult) == null ? void 0 : t.results) ? a.attackResult.results : []).some((i) => {
    var n;
    return !!((n = i == null ? void 0 : i.queuedMutation) != null && n.applied);
  });
}
function Xb(a) {
  return a === A.monitors.physical ? "Physical" : a === A.monitors.fatigue ? "Fatigue" : String(a ?? "").trim() || "Track";
}
function Zb(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return e === "penetrating" ? "is-penetrating" : e === "energy" ? "is-energy" : e === "thermal" ? "is-thermal" : e === "electrical" ? "is-electrical" : "is-concussive";
}
function eS(a) {
  const e = Math.max(0, Number(a ?? 0) || 0);
  return e <= 0 ? { key: "is-none", label: "No Penetration" } : e <= 2 ? { key: "is-light", label: "Light Damage" } : e <= 4 ? { key: "is-medium", label: "Moderate Damage" } : e <= 7 ? { key: "is-heavy", label: "Heavy Damage" } : { key: "is-critical", label: "Critical Damage" };
}
function tS({ actor: a = null, token: e = null } = {}) {
  var s;
  const t = (e == null ? void 0 : e.document) ?? e ?? null, i = String(((s = t == null ? void 0 : t.texture) == null ? void 0 : s.src) ?? "").trim(), n = String((a == null ? void 0 : a.img) ?? "").trim();
  return i || n || "icons/svg/mystery-man.svg";
}
function iS(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
function aS({ summary: a = {}, actor: e = null, token: t = null } = {}) {
  const i = String((a == null ? void 0 : a.damageType) ?? "").trim(), n = Vt(i || "concussive") || "Damage", s = Xb(a == null ? void 0 : a.track), r = Math.max(0, Number((a == null ? void 0 : a.finalDamage) ?? (a == null ? void 0 : a.appliedDelta) ?? 0) || 0), o = eS(r), l = r === 1 ? "1 point" : `${r} points`, c = String((a == null ? void 0 : a.actorName) ?? (e == null ? void 0 : e.name) ?? "Target").trim() || "Target", u = [];
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
    classes: ["mwd-damage-card", Zb(i), o.key].join(" "),
    header: {
      left: "Damage Applied",
      right: s
    },
    target: {
      name: c,
      image: tS({ actor: e, token: t })
    },
    damageTypeLabel: n,
    severityLabel: o.label,
    impactValue: r,
    impactText: r > 0 ? `${n} damage applied to ${s}.` : `${n} damage did not penetrate.`,
    rows: u
  };
}
async function qo({ summary: a = {}, actor: e = null, token: t = null } = {}) {
  const i = await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-damage-application-card",
    aS({ summary: a, actor: e, token: t })
  ), n = iS({
    speaker: ChatMessage.getSpeaker({ actor: e, token: t }),
    content: i
  });
  return ChatMessage.create(n);
}
function nS(a = {}) {
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
async function Ud(a = {}, e = null) {
  var s, r, o;
  const t = nS(a), i = Number(((s = a == null ? void 0 : a.outcome) == null ? void 0 : s.hits) ?? 0) || 0, n = ((r = a == null ? void 0 : a.outcomeModel) == null ? void 0 : r.edgeEarned) ?? null;
  return a.outcomeModel = Bd(t, { successes: i, raw: (o = a == null ? void 0 : a.roll) == null ? void 0 : o.json }, null), a.outcomeModel.edgeEarned = n, t.intent === "attack" && e && t.attack && (a.attackResult = await Ld({
    attacker: e,
    ctx: t,
    outcomeModel: a.outcomeModel,
    previewState: a.areaEffectPreviewState ?? {},
    existingAttackResult: a.attackResult ?? null
  })), a;
}
async function sS(a, e) {
  var o, l, c, u, d, m, f;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='applyAttackDamage']"), i = Number((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.resultIndex);
  if (!Number.isInteger(i) || i < 0) return;
  const n = foundry.utils.deepClone((c = (l = e == null ? void 0 : e.flags) == null ? void 0 : l.mwd) == null ? void 0 : c.resolved);
  if (!n) return;
  const s = await Hd(n, i);
  if (!s.ok) {
    (d = (u = ui.notifications) == null ? void 0 : u.warn) == null || d.call(u, s.reason ?? "Unable to apply attack damage.");
    return;
  }
  if (s.skipped) {
    (f = (m = ui.notifications) == null ? void 0 : m.info) == null || f.call(m, s.reason ?? "That attack damage has already been applied.");
    return;
  }
  const r = await Da({ resolved: n });
  await e.update({
    content: r,
    "flags.mwd.resolved": n
  }), await qo({
    summary: s.summary,
    actor: s.targetActor,
    token: s.targetToken
  });
}
async function Vo(a = {}) {
  var i, n;
  const e = (i = a == null ? void 0 : a.target) != null && i.actorUuid ? await fromUuid(a.target.actorUuid) : null, t = (n = a == null ? void 0 : a.target) != null && n.tokenUuid ? await fromUuid(a.target.tokenUuid) : null;
  return Ls({
    actor: e,
    token: t,
    edgePoolKey: (a == null ? void 0 : a.evadeEdgePoolKey) ?? ""
  });
}
function rS(a = "") {
  var e, t;
  return ((t = (e = game.messages) == null ? void 0 : e.get) == null ? void 0 : t.call(e, String(a ?? "").trim())) ?? null;
}
async function Ls({ actor: a = null, token: e = null, actorUuid: t = "", tokenUuid: i = "", edgePoolKey: n = "" } = {}) {
  const s = a ?? (t ? await fromUuid(t) : null), r = e ?? (i ? await fromUuid(i) : null);
  return s ? {
    ...x.getReactionSpendPreview(s, { token: r, edgePoolKey: n }) ?? {},
    actor: s,
    token: r
  } : null;
}
async function Yo(a, e) {
  var s, r;
  const t = foundry.utils.deepClone((r = (s = a == null ? void 0 : a.flags) == null ? void 0 : s.mwd) == null ? void 0 : r.resolved);
  if (!t) return;
  await e(t);
  const i = await fromUuid(t.actorUuid);
  if (!i) return;
  await Ud(t, i);
  const n = await Da({ resolved: t });
  return await a.update({
    content: n,
    "flags.mwd.resolved": t
  }), t;
}
async function Qo(a, e, { active: t = !1, edgePoolKey: i = "" } = {}) {
  var r, o, l, c, u, d, m, f;
  const n = (r = e == null ? void 0 : e.target) != null && r.actorUuid ? await fromUuid(e.target.actorUuid) : null, s = (o = e == null ? void 0 : e.target) != null && o.tokenUuid ? await fromUuid(e.target.tokenUuid) : null;
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
        exposureBefore: ((c = (l = e == null ? void 0 : e.damage) == null ? void 0 : l.exposure) == null ? void 0 : c.initialTier) ?? ((u = e == null ? void 0 : e.exposure) == null ? void 0 : u.initialTier) ?? "none",
        exposureAfterPreview: ((m = (d = e == null ? void 0 : e.damage) == null ? void 0 : d.exposure) == null ? void 0 : m.finalTier) ?? ((f = e == null ? void 0 : e.exposure) == null ? void 0 : f.initialTier) ?? "none",
        edgePoolKey: i,
        allowCurrentTurn: !1
      }
    });
  }
}
async function oS(a, e) {
  var r, o;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleEvade']"), i = String(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.previewKey) ?? "").trim();
  if (!i) return;
  const n = await Yo(e, async (l) => {
    var f;
    if (l.areaEffectPreviewState ?? (l.areaEffectPreviewState = {}), !!(l.areaEffectPreviewState[i] ?? {}).evadeActive) {
      delete l.areaEffectPreviewState[i];
      return;
    }
    l.areaEffectPreviewState[i] = {
      evadeActive: !0,
      edgePoolKey: null
    };
    const d = (Array.isArray((f = l == null ? void 0 : l.attackResult) == null ? void 0 : f.results) ? l.attackResult.results : []).find((p) => (p == null ? void 0 : p.previewKey) === i) ?? null, m = d ? await Vo({ ...d, evadeEdgePoolKey: null }) : null;
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
  n && s && await Qo(e, s, {
    active: !!(s != null && s.evadeActive),
    edgePoolKey: String((s == null ? void 0 : s.evadeEdgePoolKey) ?? "").trim()
  });
}
async function lS(a, e) {
  var o, l, c;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleEvadeEdge']"), i = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.previewKey) ?? "").trim(), n = String(((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.poolKey) ?? "").trim();
  if (!i) return;
  const s = await Yo(e, async (u) => {
    var h;
    u.areaEffectPreviewState ?? (u.areaEffectPreviewState = {});
    const d = u.areaEffectPreviewState[i] ?? {}, m = d.edgePoolKey === n ? null : n;
    u.areaEffectPreviewState[i] = {
      ...d,
      evadeActive: !0,
      edgePoolKey: m
    };
    const f = (Array.isArray((h = u == null ? void 0 : u.attackResult) == null ? void 0 : h.results) ? u.attackResult.results : []).find((g) => (g == null ? void 0 : g.previewKey) === i) ?? null, p = f ? await Vo({ ...f, evadeEdgePoolKey: m }) : null;
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
  s && r && await Qo(e, r, {
    active: !!(r != null && r.evadeActive),
    edgePoolKey: String((r == null ? void 0 : r.evadeEdgePoolKey) ?? "").trim()
  });
}
async function cS(a, e) {
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
    const S = await Hd(t, b);
    S.ok && S.applied ? (s += 1, o.push(S)) : S.ok || r.push(S.reason ?? `Target ${b + 1} failed.`);
  }
  if (s <= 0) {
    (h = (p = ui.notifications) == null ? void 0 : p.warn) == null || h.call(p, r[0] ?? "Unable to apply queued attack damage.");
    return;
  }
  const l = await Da({ resolved: t });
  await e.update({
    content: l,
    "flags.mwd.resolved": t
  });
  for (const b of o)
    await qo({
      summary: b.summary,
      actor: b.targetActor,
      token: b.targetToken
    });
  r.length && ((y = (g = ui.notifications) == null ? void 0 : g.warn) == null || y.call(g, `Applied ${s} queued damage result${s === 1 ? "" : "s"}; ${r.length} failed.`));
}
async function Hd(a, e) {
  var l, c, u, d, m, f, p, h, g;
  const t = ((c = (l = a == null ? void 0 : a.attackResult) == null ? void 0 : l.results) == null ? void 0 : c[e]) ?? null, i = (t == null ? void 0 : t.queuedMutation) ?? null;
  if (!i)
    return { ok: !1, reason: "No queued attack damage to apply." };
  if (i.applied)
    return { ok: !0, skipped: !0, reason: "That attack damage has already been applied." };
  let n = null, s = null, r = null;
  try {
    if (s = (u = i.target) != null && u.actorUuid ? await fromUuid(i.target.actorUuid) : null, r = (d = i.target) != null && d.tokenUuid ? await fromUuid(i.target.tokenUuid) : null, t != null && t.evadeActive && s) {
      const y = await x.commitReactionSpend(s, {
        token: r,
        actionId: "evade",
        actionLabel: "Evade",
        actionCategory: "reaction",
        logLabel: `Evade: ${((m = i.target) == null ? void 0 : m.name) ?? ((f = t == null ? void 0 : t.target) == null ? void 0 : f.name) ?? "Target"}`,
        edgePoolKey: String((t == null ? void 0 : t.evadeEdgePoolKey) ?? "").trim()
      });
      if (!(y != null && y.ok))
        return { ok: !1, reason: (y == null ? void 0 : y.reason) ?? "Unable to spend the Evade reaction." };
      await x.clearPendingReaction(s, { token: r });
    }
    if (((p = i.payload) == null ? void 0 : p.mode) === "machineAttackDamage" && ((h = i.payload) != null && h.chaosCriticalSelected)) {
      const y = await uS({
        machineActor: s,
        operatorActorUuid: (g = i.payload) == null ? void 0 : g.operatorActorUuid
      });
      if (!y.ok) return y;
    }
    n = await vt.apply({
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
  const o = ma(
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
async function uS({ machineActor: a = null, operatorActorUuid: e = "" } = {}) {
  var s, r, o, l, c, u, d, m;
  const t = await zd({ machineActor: a, operatorActorUuid: e });
  if (!t.actor)
    return (s = game.user) != null && s.isGM ? { ok: !0, gmOverride: !0 } : { ok: !1, reason: t.reason || "No linked operator or pilot actor for Chaos Edge." };
  const i = A.counters.edgePools.chaos, n = Number(((o = (r = t.actor).getRemainingEdge) == null ? void 0 : o.call(r, i)) ?? ((c = (l = t.actor).getEdgePoolValue) == null ? void 0 : c.call(l, i)) ?? 0);
  return n <= 0 && !((u = game.user) != null && u.isGM) ? { ok: !1, reason: `${t.actor.name ?? "Operator"} has no Chaos Edge remaining.` } : (n > 0 && await ((m = (d = t.actor).spendEdge) == null ? void 0 : m.call(d, i, 1, { source: "machineChaosCritical" })), { ok: !0, operatorActor: t.actor });
}
async function dS(a, e) {
  var m, f, p, h, g, y;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleMachineChaosCrit']"), i = Number(((m = t == null ? void 0 : t.dataset) == null ? void 0 : m.resultIndex) ?? -1), n = foundry.utils.deepClone(e.getFlag("mwd", "resolved")), s = ((p = (f = n == null ? void 0 : n.attackResult) == null ? void 0 : f.results) == null ? void 0 : p[i]) ?? null, r = (s == null ? void 0 : s.queuedMutation) ?? null;
  if (!r || r.applied || ((h = r.payload) == null ? void 0 : h.mode) !== "machineAttackDamage") return;
  r.payload.chaosCriticalSelected = !r.payload.chaosCriticalSelected;
  const o = (g = r.target) != null && g.actorUuid ? await fromUuid(r.target.actorUuid) : null, l = (y = r.target) != null && y.tokenUuid ? await fromUuid(r.target.tokenUuid) : null, c = await vt.apply({
    actor: o,
    token: l,
    payload: r.payload,
    options: {
      actorId: (o == null ? void 0 : o.id) ?? "",
      dryRun: !0,
      logToChat: !1
    }
  }), u = ma(
    c,
    (s == null ? void 0 : s.target) ?? r.target ?? {},
    (s == null ? void 0 : s.damage) ?? {},
    { queued: !0, applied: !1 }
  );
  r.preview = u, s.queuedMutation = r, s.damageResult = u;
  const d = await Da({ resolved: n });
  await e.update({
    content: d,
    "flags.mwd.resolved": n
  });
}
async function mS(a, e) {
  var s, r, o, l, c, u, d, m, f, p, h;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='machineCritRemedy']"), i = {
    intent: "machine_crit_remedy",
    machineActorUuid: ((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.machineActorUuid) ?? "",
    critId: ((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.critId) ?? "",
    remedyKey: ((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.remedyKey) ?? "",
    operatorActorUuid: ((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.operatorActorUuid) ?? ""
  }, n = await Fd(i, {
    gmOverride: !!((c = game.user) != null && c.isGM && ((u = t == null ? void 0 : t.dataset) == null ? void 0 : u.gmOverride) === "true")
  });
  if (!n.ok) {
    (m = (d = ui.notifications) == null ? void 0 : d.warn) == null || m.call(d, n.reason ?? "Unable to resolve machine critical remedy.");
    return;
  }
  (h = (f = ui.notifications) == null ? void 0 : f.info) == null || h.call(f, `Resolved ${((p = n.crit) == null ? void 0 : p.label) ?? "machine critical"}.`);
}
async function Wd(a, e) {
  const t = e != null && e.actorUuid ? await fromUuid(e.actorUuid) : null, i = e != null && e.tokenUuid ? await fromUuid(e.tokenUuid) : null, n = await Vu(e, { actor: t, token: i });
  return await a.update({
    content: n,
    "flags.mwd.hazardCard": e
  }), e;
}
async function Jo(a, e) {
  var i, n;
  const t = _o(foundry.utils.deepClone(((n = (i = a == null ? void 0 : a.flags) == null ? void 0 : i.mwd) == null ? void 0 : n.hazardCard) ?? {}));
  return t != null && t.actorUuid ? (await e(t), await Wd(a, t), t) : null;
}
async function Xo(a, e, { active: t = !1, edgePoolKey: i = "" } = {}) {
  var r, o, l;
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
        exposureAfterPreview: ((o = e == null ? void 0 : e.preview) == null ? void 0 : o.finalTier) ?? ((l = e == null ? void 0 : e.exposure) == null ? void 0 : l.initialTier) ?? "none",
        edgePoolKey: i,
        allowCurrentTurn: !0
      }
    });
  }
}
async function fS(a, e) {
  var i, n;
  a.preventDefault();
  const t = await Jo(e, async (s) => {
    var l, c, u;
    const r = !((l = s == null ? void 0 : s.preview) != null && l.evadeActive), o = bo(Oi({
      tier: ((c = s == null ? void 0 : s.exposure) == null ? void 0 : c.initialTier) ?? "none"
    }), {
      active: r,
      locked: !!((u = s == null ? void 0 : s.exposure) != null && u.evadeLocked)
    });
    if (s.preview ?? (s.preview = {}), s.preview.evadeActive = r, s.preview.edgePoolKey = null, s.preview.finalTier = o.finalTier, s.damageAfter = qi(s.baseDamage ?? 0, o.finalTier), r) {
      const d = await Ls({
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
  t && await Xo(e, t, {
    active: !!((i = t == null ? void 0 : t.preview) != null && i.evadeActive),
    edgePoolKey: String(((n = t == null ? void 0 : t.preview) == null ? void 0 : n.edgePoolKey) ?? "").trim()
  });
}
async function pS(a, e) {
  var s, r, o;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleHazardEvadeEdge']"), i = String(((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.poolKey) ?? "").trim(), n = await Jo(e, async (l) => {
    l.preview ?? (l.preview = {}), l.preview.evadeActive = !0, l.preview.edgePoolKey = l.preview.edgePoolKey === i ? null : i;
    const c = await Ls({
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
  n && await Xo(e, n, {
    active: !!((r = n == null ? void 0 : n.preview) != null && r.evadeActive),
    edgePoolKey: String(((o = n == null ? void 0 : n.preview) == null ? void 0 : o.edgePoolKey) ?? "").trim()
  });
}
async function hS(a, e) {
  var u, d, m, f, p, h, g, y, b, S, T, E, P, C, H, Y, Q, K, G, L, z;
  a.preventDefault();
  const t = _o(foundry.utils.deepClone(((d = (u = e == null ? void 0 : e.flags) == null ? void 0 : u.mwd) == null ? void 0 : d.hazardCard) ?? {}));
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
    const q = await x.commitReactionSpend(i, {
      token: n,
      actionId: "evade",
      actionLabel: "Evade",
      actionCategory: "reaction",
      logLabel: `Evade: ${t.regionName}`,
      edgePoolKey: String(((y = t.preview) == null ? void 0 : y.edgePoolKey) ?? "").trim(),
      allowCurrentTurn: !0
    });
    if (!(q != null && q.ok)) {
      (S = (b = ui.notifications) == null ? void 0 : b.warn) == null || S.call(b, (q == null ? void 0 : q.reason) ?? "Unable to spend the Evade reaction.");
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
    notes: `Hazard exposure ${t.exposure.initialLabel}${(T = t.preview) != null && T.evadeActive ? ` -> ${String(t.preview.finalTier ?? t.exposure.initialTier).toUpperCase()}` : ""}`.trim()
  }, r = await vt.apply({
    actor: i,
    token: n,
    payload: s,
    options: {
      actorId: i.id,
      logToChat: !1
    }
  });
  if (!(r != null && r.ok)) {
    (P = (E = ui.notifications) == null ? void 0 : E.warn) == null || P.call(E, (r == null ? void 0 : r.reason) ?? "Unable to apply hazard damage.");
    return;
  }
  const o = x.getSnapshot(i, { token: n }), l = ((C = o == null ? void 0 : o.hazards) == null ? void 0 : C[t.regionId]) ?? {}, c = _e(t.nextTier, t.exposure.finalTier);
  await x.setHazardState(i, {
    token: n,
    regionId: t.regionId,
    hazardState: {
      ...l,
      tier: c,
      turnsExposed: Math.max(Number((l == null ? void 0 : l.turnsExposed) ?? 0), Number(t.turnsExposed ?? 0)) + 1,
      lastProcessedRound: Number(((H = o == null ? void 0 : o.combat) == null ? void 0 : H.round) ?? 0) || 0,
      evadeLocked: !!(l != null && l.evadeLocked) || !!(((Y = t.exposure) == null ? void 0 : Y.initialTier) === "full" && ((Q = t.preview) == null ? void 0 : Q.finalTier) === "major" && ((K = t.preview) != null && K.evadeActive))
    }
  }), c === "full" && Number((t == null ? void 0 : t.onFullBurnDelta) ?? 0) > 0 && await i.update({
    "system.burn.value": Math.max(0, Number(((L = (G = i.system) == null ? void 0 : G.burn) == null ? void 0 : L.value) ?? 0) + Number(t.onFullBurnDelta ?? 0))
  }), await x.clearPendingReaction(i, { token: n }), t.applied = !0, t.applyReason = "Applied", await Wd(e, t), await qo({
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
      notes: `Hazard exposure ${t.exposure.initialLabel}${(z = t.preview) != null && z.evadeActive ? ` -> ${String(t.preview.finalTier ?? "").toUpperCase()}` : ""}`
    },
    actor: i,
    token: n
  });
}
async function gS(a, { token: e = null } = {}) {
  var s, r;
  const t = x.getSnapshot(a, { token: e }), i = (t == null ? void 0 : t.pendingReaction) ?? null;
  if (!(i != null && i.messageId))
    return { ok: !1, reason: "Use an area effect or hazard card to trigger Evade." };
  const n = rS(i.messageId);
  if (!n)
    return await x.clearPendingReaction(a, { token: e }), { ok: !1, reason: "The pending Evade card is no longer available." };
  if (i.sourceKind === "attack") {
    const o = String(i.sourceId ?? "").trim();
    if (!o) return { ok: !1, reason: "Pending Evade target is missing." };
    const l = await Yo(n, async (u) => {
      var f;
      u.areaEffectPreviewState ?? (u.areaEffectPreviewState = {}), u.areaEffectPreviewState[o] = {
        ...u.areaEffectPreviewState[o] ?? {},
        evadeActive: !0,
        edgePoolKey: i.edgePoolKey ?? null
      };
      const d = (Array.isArray((f = u == null ? void 0 : u.attackResult) == null ? void 0 : f.results) ? u.attackResult.results : []).find((p) => (p == null ? void 0 : p.previewKey) === o) ?? null, m = d ? await Vo({ ...d, evadeEdgePoolKey: i.edgePoolKey ?? "" }) : null;
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
    return c && await Qo(n, c, {
      active: !0,
      edgePoolKey: String((c == null ? void 0 : c.evadeEdgePoolKey) ?? i.edgePoolKey ?? "").trim()
    }), { ok: !0 };
  }
  if (i.sourceKind === "hazard") {
    const o = await Jo(n, async (l) => {
      var d, m;
      const c = bo(Oi({
        tier: ((d = l == null ? void 0 : l.exposure) == null ? void 0 : d.initialTier) ?? "none"
      }), {
        active: !0,
        locked: !!((m = l == null ? void 0 : l.exposure) != null && m.evadeLocked)
      });
      l.preview ?? (l.preview = {}), l.preview.evadeActive = !0, l.preview.edgePoolKey = l.preview.edgePoolKey ?? i.edgePoolKey ?? null, l.preview.finalTier = c.finalTier, l.damageAfter = qi(l.baseDamage ?? 0, c.finalTier);
      const u = await Ls({
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
    return o && await Xo(n, o, {
      active: !0,
      edgePoolKey: String(((r = o == null ? void 0 : o.preview) == null ? void 0 : r.edgePoolKey) ?? i.edgePoolKey ?? "").trim()
    }), { ok: !0 };
  }
  return { ok: !1, reason: "That Evade source is not supported." };
}
async function yS(a, e) {
  var p, h, g, y, b, S, T, E, P, C, H, Y, Q, K, G, L, z, q, ee;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='edgePostReroll']"), i = String(((p = t == null ? void 0 : t.dataset) == null ? void 0 : p.poolKey) ?? "").trim();
  if (!i) return;
  const n = foundry.utils.deepClone((g = (h = e == null ? void 0 : e.flags) == null ? void 0 : h.mwd) == null ? void 0 : g.resolved);
  if (!n) return;
  if (Jb(n)) {
    (b = (y = ui.notifications) == null ? void 0 : y.warn) == null || b.call(y, "Post-roll Edge is disabled after attack damage has been applied.");
    return;
  }
  if (Number(((T = (S = n == null ? void 0 : n.edge) == null ? void 0 : S.post) == null ? void 0 : T.spent) ?? 0) === 1) return;
  if (!(Array.isArray((P = (E = n == null ? void 0 : n.edge) == null ? void 0 : E.allowed) == null ? void 0 : P.postPools) ? n.edge.allowed.postPools : []).includes(i)) {
    (H = (C = ui.notifications) == null ? void 0 : C.warn) == null || H.call(C, `Post-spend pool not allowed: ${i}`);
    return;
  }
  const r = Array.isArray((Y = n == null ? void 0 : n.roll) == null ? void 0 : Y.failureDiceRefs) ? n.roll.failureDiceRefs : [];
  if (r.length <= 0) {
    (K = (Q = ui.notifications) == null ? void 0 : Q.info) == null || K.call(Q, "No failures to reroll.");
    return;
  }
  const o = await fromUuid(n.actorUuid);
  if (!o) {
    (L = (G = ui.notifications) == null ? void 0 : G.warn) == null || L.call(G, "Actor not found for this roll.");
    return;
  }
  await ((z = o.spendEdge) == null ? void 0 : z.call(o, i, 1));
  const l = Number(((q = n == null ? void 0 : n.roll) == null ? void 0 : q.target) ?? 5), u = (ee = (await new Roll(`${r.length}d6cs>=${l}`).evaluate()).dice) == null ? void 0 : ee[0], d = Array.isArray(u == null ? void 0 : u.results) ? u.results : [], m = d.filter((oe) => oe.success).length;
  n.outcome = n.outcome ?? {}, n.outcome.hits = Number(n.outcome.hits ?? 0) + m, n.edge = n.edge ?? {}, n.edge.post = { poolKey: i, spent: 1 }, n.edge.availableActions = {
    ...n.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, n.roll = n.roll ?? {}, n.roll.diceGroups = Array.isArray(n.roll.diceGroups) ? n.roll.diceGroups : [], n.roll.diceGroups.push({
    id: "post",
    label: "Post Reroll",
    faces: 6,
    termIndex: null,
    dice: d.map((oe, ke) => {
      const fe = Number(oe.result), ne = !!oe.success;
      return {
        ref: `post:${ke}`,
        face: fe,
        isSuccess: ne,
        isFailure: !ne,
        tooltip: ne ? `Post die ${ke + 1}: ${fe} (Success vs TN ${l})` : `Post die ${ke + 1}: ${fe} (Failure vs TN ${l})`
      };
    })
  }), await Ud(n, o);
  const f = await Da({ resolved: n });
  await e.update({
    content: f,
    "flags.mwd.resolved": n,
    "flags.mwd.payload.edge.post": { poolKey: i, spent: 1 }
  });
}
const Zo = `${w}.ownedWeaponAttack`;
let dc = !1;
function bS(a, e = null) {
  var r, o, l;
  const t = (a == null ? void 0 : a.actor) ?? null, i = {
    intent: "attack",
    weaponId: (a == null ? void 0 : a.id) ?? "",
    payloadId: ((r = a == null ? void 0 : a.system) == null ? void 0 : r.selectedPayloadId) ?? "",
    edge: { pool: "physical.grit", allowed: ["pre", "post"] },
    tags: ["combat", "attack"],
    sourceTokenId: (e == null ? void 0 : e.id) ?? null
  }, n = t ? x.getSnapshot(t, { token: e }) : null, s = !!((l = (o = n == null ? void 0 : n.state) == null ? void 0 : o.actionState) != null && l.aim);
  return s && (i.aim = { active: !0 }), { payload: i, hasAim: s };
}
function SS(a, e = null) {
  return e ?? (a == null ? void 0 : a.token) ?? x.getCurrentSceneTokenDocument(a) ?? null;
}
function jd(a) {
  const e = String((a == null ? void 0 : a.uuid) ?? "").trim();
  return e ? {
    type: Zo,
    uuid: e,
    name: String((a == null ? void 0 : a.name) ?? "Weapon").trim() || "Weapon",
    img: (a == null ? void 0 : a.img) ?? "icons/svg/sword.svg"
  } : null;
}
async function xs({ weapon: a, event: e = null, token: t = null } = {}) {
  var i, n, s, r, o;
  try {
    if (!((i = a == null ? void 0 : a.isPersonalWeapon) != null && i.call(a)))
      throw new Error("Attack requires an owned personal weapon.");
    const l = a.actor ?? null;
    if (!l)
      throw new Error("Attack requires an owned personal weapon.");
    const c = SS(l, t), { payload: u, hasAim: d } = bS(a, c), m = ((n = game.mwd) == null ? void 0 : n.roll) ?? ((r = (s = game.system) == null ? void 0 : s.mwd) == null ? void 0 : r.roll);
    if (!(m != null && m.execute))
      throw new Error("MWD roll system not initialized.");
    const f = await m.execute({ actor: l, payload: u, event: e });
    if (f) {
      d && await x.clearAim(l, { token: c });
      const p = x.getSnapshot(l, { token: c });
      if (p != null && p.hasCombatant) {
        const h = await x.spendResource(l, {
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
    return console.error("MWD | Failed to launch weapon attack", l), nn(l, "Unable to attack with that weapon."), null;
  }
}
async function AS(a, { event: e = null } = {}) {
  var n, s;
  const t = String(a ?? "").trim();
  if (!t)
    return (n = ui.notifications) == null || n.warn("That weapon shortcut is missing its item reference."), null;
  const i = await fromUuid(t);
  return i ? xs({ weapon: i, event: e }) : ((s = ui.notifications) == null || s.warn("That weapon shortcut could not find its source item."), null);
}
function wS(a) {
  return `(async () => {
  const attacks = game.mwd?.attacks;
  if (!attacks?.attackWeaponByUuid) {
    return ui.notifications?.error("MWD attack shortcuts are not available right now.");
  }
  await attacks.attackWeaponByUuid(${JSON.stringify(String(a ?? "").trim())});
})();`;
}
async function TS(a, e) {
  var r, o, l, c;
  const t = String((a == null ? void 0 : a.uuid) ?? "").trim();
  if (!t) return;
  const i = String((a == null ? void 0 : a.name) ?? "Weapon Attack").trim() || "Weapon Attack", n = wS(t);
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
function Kd(a, e, t) {
  return (e == null ? void 0 : e.type) !== Zo ? !0 : (TS(e, t), !1);
}
function Gd() {
  dc || (dc = !0, Hooks.on("hotbarDrop", Kd));
}
const mc = {
  HOTBAR_ATTACK_TYPE: Zo,
  getOwnedWeaponAttackDragData: jd,
  launchOwnedWeaponAttack: xs,
  attackWeaponByUuid: AS,
  handleWeaponAttackHotbarDrop: Kd,
  registerWeaponAttackHotbarHook: Gd
};
function ct(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function vS(a) {
  return String(a ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function Hn(a, e = 180) {
  const t = vS(a);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function wi(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function Wn(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim(),
    emphasis: e.emphasis ?? ""
  }));
}
function jn(a = []) {
  return wi(a).map((e) => ({ label: e }));
}
function Kn(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
const kS = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}, MS = {
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
}, ES = {
  ammo: "Ammunition",
  explosive: "Explosive",
  medical: "Medical",
  repair: "Repair",
  fuel: "Fuel / Power Cell",
  utility: "Utility"
};
function fc(a) {
  const e = Number(a ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function pc({
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
  var p, h, g, y, b, S, T;
  const c = Math.max(0, Math.trunc(ct(((p = a == null ? void 0 : a.system) == null ? void 0 : p.quantity) ?? 1, 1))), u = Math.max(0, Math.trunc(ct(((h = a == null ? void 0 : a.system) == null ? void 0 : h.rating) ?? 0, 0))), d = wi(((g = a == null ? void 0 : a.system) == null ? void 0 : g.tags) ?? []), m = String(((y = a == null ? void 0 : a.system) == null ? void 0 : y.category) ?? "").trim(), f = n[m] ?? m;
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
    summaryStats: Wn([
      { label: "Qty", value: c, emphasis: "strong" },
      { label: s, value: u }
    ]),
    detailTags: jn([
      r,
      ...d,
      (b = a == null ? void 0 : a.system) != null && b.inactive ? "Inactive" : ""
    ]),
    detailRows: Kn([
      { label: "Quantity", value: c },
      { label: s, value: u },
      { label: "Source", value: ((S = a == null ? void 0 : a.system) == null ? void 0 : S.sourceReference) ?? "" },
      { label: "Category", value: f },
      { label: "Tags", value: d.join(", ") }
    ]),
    detailText: Hn((T = a == null ? void 0 : a.system) == null ? void 0 : T.description),
    quantity: c,
    canAdjustQuantity: o
  };
}
function CS({ defenseBonus: a = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(a ?? 0) || 0;
  i !== 0 && t.push(`Defense ${fc(i)}`);
  for (const [n, s] of Object.entries(kS)) {
    const r = Number((e == null ? void 0 : e[n]) ?? 0) || 0;
    r !== 0 && t.push(`${s} ${fc(r)}`);
  }
  return t.join(" | ");
}
function PS(a = {}, e = ["close", "near", "far", "extreme"]) {
  return e.map((t) => {
    const i = ct(a == null ? void 0 : a[t], 0);
    return `${t.charAt(0).toUpperCase() + t.slice(1)} ${i}`;
  }).join(" | ");
}
function NS(a = {}) {
  return ["close", "near", "far", "extreme"].map((e) => `${e.charAt(0).toUpperCase()}${ct(a == null ? void 0 : a[e], 0)}`).join(" ");
}
function RS(a = "") {
  const e = String(a ?? "").trim().toLowerCase();
  return e ? e.charAt(0).toUpperCase() + e.slice(1) : "";
}
function yt(a) {
  return String(a ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function hc({ title: a, label: e, options: t = [], confirmLabel: i = "Select" } = {}) {
  const n = Array.isArray(t) ? t.filter((r) => r == null ? void 0 : r.value) : [];
  if (!n.length) return "";
  if (n.length === 1) return String(n[0].value ?? "").trim();
  const s = `<form class="mwd-quick-select"><div class="mwd-field"><label>${yt(e)}</label><select name="selection">${n.map((r) => `<option value="${yt(r.value)}">${yt(r.label ?? r.value)}</option>`).join("")}</select></div></form>`;
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
var Nt, Ei, Hi, Wt, Aa, O, qd, Gr, Gn, Vd, Yd, Ne, zt, Si, Qd, qr, Jd, Xd, Zd, em, tm, im, am, Ft, ua;
const ye = class ye extends sn {
  constructor() {
    super(...arguments);
    Me(this, O);
    Me(this, Nt, null);
    Me(this, Ei, null);
    Me(this, Hi, null);
    Me(this, Wt, /* @__PURE__ */ new Set());
    Me(this, Aa, null);
  }
  /** @override */
  async _prepareContext(t) {
    var G, L, z, q, ee, oe, ke, fe, ne, $e, Qe, Je, it, dt, mt, ft, pt, ht, _t, Lt, xt, $t, R, B, be, te, Pe, gt;
    const i = await super._prepareContext(t), n = ((G = this.getSheetTokenDocument) == null ? void 0 : G.call(this)) ?? null;
    i._mwdThemeClass = game.system.mwd.styles.selectCssClass(), i.layout = await Zi.get("character");
    const s = ((z = (L = this.actor).getEdgeCap) == null ? void 0 : z.call(L)) ?? Number(((oe = (ee = (q = this.actor.system) == null ? void 0 : q.attributes) == null ? void 0 : ee.edge) == null ? void 0 : oe.value) ?? 0), r = !!this.isEditable, o = { physical: "Physical", mental: "Mental", social: "Social" }, l = {
      grit: "Grit",
      insight: "Insight",
      legend: "Legend",
      chaos: "Chaos",
      rumor: "Rumor",
      credibility: "Credibility"
    }, c = this.actor.getEdgePoolSummary ? this.actor.getEdgePoolSummary({ groups: mo }) : { groups: [] };
    i.edgeConsole = {
      cap: s,
      editable: r,
      capPips: Array.from({ length: Math.max(0, s) }, (k, N) => N + 1),
      groups: (c.groups ?? []).map((k) => ({
        id: k.id,
        label: o[k.id] ?? k.id,
        pools: (k.pools ?? []).map((N) => {
          const j = Number(N.effectiveValue ?? 0), he = Number(N.effectiveMax ?? 0), le = Array.from({ length: Math.max(0, he) }, (Be, Ye) => {
            const at = Ye + 1;
            return { n: at, filled: at <= j };
          }), Ee = String(N.key ?? "").split(".").pop();
          return {
            key: N.key,
            label: l[Ee] ?? Ee ?? N.key,
            value: j,
            max: he,
            rating: Number(N.rating ?? 0),
            ratingBonus: Number(N.ratingBonus ?? 0),
            effectiveRating: Number(N.effectiveRating ?? N.rating ?? 0),
            isCapped: Number(N.effectiveRating ?? N.rating ?? 0) > Number(N.cap ?? s),
            pips: le,
            // Paths for edit-mode inputs
            pathRating: `system.counters.edgePools.${N.key}.rating`,
            pathValue: `system.counters.edgePools.${N.key}.value`,
            // Keep the roll payload if you want pool-name click to route through BaseActorSheetV2 roll handler
            roll: JSON.stringify({ intent: "edge", pool: N.key })
          };
        })
      }))
    };
    const u = ["grit", "insight", "legend", "chaos", "rumor", "credibility"], d = /* @__PURE__ */ new Map();
    for (const k of i.edgeConsole.groups ?? [])
      for (const N of k.pools ?? []) {
        const j = String(N.key ?? "").split(".").pop();
        j && d.set(j, N), N.domain = k.id;
      }
    i.edgeConsole.poolsOrdered = u.map((k) => d.get(k)).filter(Boolean);
    const m = this.actor.system ?? {}, f = m.monitors ?? {}, p = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue", label: "Fatigue", kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor", label: "Armor", kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ], h = (k, N, j = 0) => {
      const he = foundry.utils.getProperty(k, N), le = Number(he);
      return Number.isFinite(le) ? le : j;
    };
    i.conditionMonitors = p.map((k) => {
      const N = (f == null ? void 0 : f[k.id]) ?? {}, j = Math.max(0, h(N, "max", 0)), he = Math.min(Math.max(0, h(N, "value", 0)), j);
      return {
        id: k.id,
        label: k.label,
        kind: k.kind,
        editable: !!this.isEditable,
        value: he,
        max: j,
        segments: Array.from({ length: j }, (le, Ee) => {
          const Be = Ee + 1;
          return { value: Be, filled: Be <= he };
        }),
        status: k.status ? { label: k.status.label, value: h(N, k.status.path, 0) } : null
      };
    });
    const g = Number(((fe = (ke = this.actor.system) == null ? void 0 : ke.burn) == null ? void 0 : fe.value) ?? 0), y = 10, b = 6, S = Math.min(g, y);
    i.burnOverflow = Math.max(0, g - y), i.burnPenalty = Math.floor(g / 2), i.burnPips = Array.from({ length: y }, (k, N) => {
      const j = N + 1;
      return {
        pipValue: j,
        filled: j <= S,
        threshold: j === b
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
      overloaded: !!(($e = (ne = this.actor.system) == null ? void 0 : ne.burn) != null && $e.overloaded)
    };
    const T = x.getSnapshot(this.actor, { token: n });
    i.combatDashboard = {
      targeting: T.targeting,
      rollImpact: T.rollImpact,
      states: T.states,
      effects: T.effects,
      activation: T.activation,
      inactiveReason: T.inactiveReason
    };
    const E = x.buildActionModel(this.actor, T), P = new Set((E.menus ?? []).map((k) => k.id));
    F(this, Nt) && !P.has(F(this, Nt)) && Oe(this, Nt, null), i.combatActions = {
      ...E,
      menus: (E.menus ?? []).map((k) => ({
        ...k,
        isOpen: k.id === F(this, Nt)
      }))
    };
    const C = ((Je = (Qe = this.actor).getPersonalCombatLoadout) == null ? void 0 : Je.call(Qe)) ?? null;
    i.personalInventory = {
      warnings: [...(C == null ? void 0 : C.warnings) ?? []],
      weapons: ((C == null ? void 0 : C.weapons) ?? []).map((k) => {
        var Se, Xe, Ze, je, W, de, ri;
        const N = M(this, O, ua).call(this, "weapons", k.id), j = String((k == null ? void 0 : k.category) ?? "").trim().toLowerCase() !== "melee", he = !!((Se = k == null ? void 0 : k.sourceState) != null && Se.isTracked), le = String((k == null ? void 0 : k.payloadLabel) ?? "").trim() || "Unloaded", Ee = j && he ? `${ct((Xe = k == null ? void 0 : k.sourceState) == null ? void 0 : Xe.current, 0)}/${ct((Ze = k == null ? void 0 : k.sourceState) == null ? void 0 : Ze.max, 0)}` : "", Be = j ? he ? `${le} ${Ee}` : le : "", Ye = j ? he ? `Payload ${Ee}` : `Payload ${le}` : "", at = PS(k.attackRatingBand), kt = NS(k.attackRatingBand), X = Kn([
          { label: "Skill", value: ((je = k.skillDef) == null ? void 0 : je.label) ?? k.skill ?? "" },
          { label: "Category", value: k.category ?? "" },
          { label: "Damage Type", value: k.damageTypeLabel ?? k.damageType ?? "" },
          { label: "Max Range", value: RS(((W = k.range) == null ? void 0 : W.max) ?? k.defaultRangeBand ?? "") },
          { label: "CQ Bands", value: at },
          { label: "Payload", value: Be },
          { label: "Traits", value: wi(k.traits ?? []).join(", ") }
        ]);
        return {
          id: k.id,
          accordionId: N,
          isExpanded: F(this, Wt).has(N),
          name: k.name,
          img: k.img,
          subtitle: ((de = k.skillDef) == null ? void 0 : de.label) ?? k.category ?? "",
          summaryStats: Wn([
            { label: "DV", value: ct(k.damage, 0), emphasis: "strong" },
            { label: "AP", value: ct(k.ap, 0) },
            { label: "Type", value: k.damageTypeLabel ?? k.damageType ?? "" },
            { label: "CQ", value: kt }
          ]),
          detailTags: jn([
            k.equipped ? "Equipped" : "",
            k.isPrimary ? "Primary" : "",
            Ye,
            ...wi(k.traits ?? [])
          ]),
          detailRows: X,
          detailText: Hn(k.notes),
          equipped: !!k.equipped,
          isPrimary: !!k.isPrimary,
          attackUuid: k.uuid ?? "",
          attackRoll: JSON.stringify({
            intent: "attack",
            weaponId: k.id,
            payloadId: ((ri = k == null ? void 0 : k.payloadState) == null ? void 0 : ri.activePayloadId) ?? "",
            edge: { pool: "physical.grit", allowed: ["pre", "post"] },
            tags: ["combat", "attack"]
          })
        };
      }),
      armor: ((C == null ? void 0 : C.armor) ?? []).map((k) => {
        var Be, Ye, at, kt, X, Se, Xe, Ze, je, W, de, ri, Ct, gi;
        const N = ((Be = C == null ? void 0 : C.activeArmor) == null ? void 0 : Be.id) === k.id ? C.activeArmor : null, j = M(this, O, ua).call(this, "armor", k.id), he = ct(((at = (Ye = N == null ? void 0 : N.traitState) == null ? void 0 : Ye.reinforced) == null ? void 0 : at.max) ?? ((X = (kt = k == null ? void 0 : k.traitState) == null ? void 0 : kt.reinforced) == null ? void 0 : X.max), 0), le = he > 0 ? `${ct(((Xe = (Se = N == null ? void 0 : N.traitState) == null ? void 0 : Se.reinforced) == null ? void 0 : Xe.current) ?? ((je = (Ze = k == null ? void 0 : k.traitState) == null ? void 0 : Ze.reinforced) == null ? void 0 : je.current), 0)}/${he}` : "", Ee = CS({
          defenseBonus: k.defenseBonus,
          mitigationByType: (N == null ? void 0 : N.mitigationByType) ?? (N == null ? void 0 : N.typedMitigation) ?? k.mitigationByType ?? {}
        });
        return {
          id: k.id,
          accordionId: j,
          isExpanded: F(this, Wt).has(j),
          name: k.name,
          img: k.img,
          subtitle: (W = k.tags) != null && W.length ? k.tags.join(", ") : "Armor",
          summaryStats: Wn([
            { label: "Rating", value: ct((N == null ? void 0 : N.ratingCurrent) ?? k.rating, 0), emphasis: "strong" },
            { label: "Res", value: ct((N == null ? void 0 : N.baseMitigation) ?? (N == null ? void 0 : N.baseResistance), 0) },
            { label: "Def", value: ct(k.defenseBonus, 0) },
            { label: "Dur", value: `${ct(((de = N == null ? void 0 : N.durability) == null ? void 0 : de.current) ?? ((ri = k.durability) == null ? void 0 : ri.current), 0)}/${ct(((Ct = N == null ? void 0 : N.durability) == null ? void 0 : Ct.max) ?? ((gi = k.durability) == null ? void 0 : gi.max), 0)}` }
          ]),
          detailTags: jn([
            k.equipped ? "Equipped" : "",
            k.isPrimary ? "Primary" : "",
            le ? `Reinforced ${le}` : "",
            ...wi(k.traits ?? [])
          ]),
          detailRows: Kn([
            { label: "Modifiers", value: Ee },
            { label: "Traits", value: wi(k.traits ?? []).join(", ") },
            { label: "Tags", value: wi(k.tags ?? []).join(", ") }
          ]),
          detailText: Hn(k.notes),
          equipped: !!k.equipped,
          isPrimary: !!k.isPrimary
        };
      }),
      gear: (((it = i.items) == null ? void 0 : it.gear) ?? []).map((k) => {
        const N = M(this, O, ua).call(this, "gear", k.id);
        return pc({
          item: k,
          accordionId: N,
          itemType: "gear",
          defaultSubtitle: "Gear",
          categoryLabels: MS,
          ratingLabel: "Rating",
          isEditable: this.isEditable,
          isExpanded: F(this, Wt).has(N)
        });
      }),
      // Consumables deliberately share the same quantity-tracked record model as
      // gear so stock editing and linked-source authoring stay transferable.
      consumables: (((dt = i.items) == null ? void 0 : dt.consumable) ?? []).map((k) => {
        const N = M(this, O, ua).call(this, "consumables", k.id);
        return pc({
          item: k,
          accordionId: N,
          itemType: "consumable",
          defaultSubtitle: "Consumable",
          categoryLabels: ES,
          ratingLabel: "Potency",
          typeLabel: "Consumable",
          isEditable: this.isEditable,
          isExpanded: F(this, Wt).has(N)
        });
      })
    }, i.bio = {
      fields: ((mt = i.bio) == null ? void 0 : mt.fields) ?? {},
      faction: ((ft = m.biography) == null ? void 0 : ft.faction) ?? "",
      age: ((pt = m.biography) == null ? void 0 : pt.age) ?? "",
      rank: ((ht = m.biography) == null ? void 0 : ht.rank) ?? "",
      height: ((_t = m.biography) == null ? void 0 : _t.height) ?? "",
      weight: ((Lt = m.biography) == null ? void 0 : Lt.weight) ?? "",
      xpTotal: (($t = (xt = m.counters) == null ? void 0 : xt.xp) == null ? void 0 : $t.total) ?? 0,
      xpSpent: ((B = (R = m.counters) == null ? void 0 : R.xp) == null ? void 0 : B.value) ?? 0,
      experienceLevel: ((be = m.biography) == null ? void 0 : be.experienceLevel) ?? "green",
      enrichedHistory: await foundry.applications.ux.TextEditor.implementation.enrichHTML(
        ((te = m.biography) == null ? void 0 : te.history) ?? "",
        { async: !0, secrets: this.actor.isOwner, relativeTo: this.actor }
      )
    };
    const H = Di(this.actor);
    i.skillsDisplay = yu(((Pe = this.actor) == null ? void 0 : Pe.system) ?? {}, {
      bonusBySkill: H.bonusBySkill
    }), i.lifeModules = H.slotStates.map((k) => {
      const N = k.state;
      return {
        moduleType: k.moduleType,
        label: k.label,
        hasCatalogEntries: k.availableEntries.length > 0,
        emptyState: k.availableEntries.length > 0 ? `Add ${k.label}` : `No ${k.label} catalog entries configured`,
        item: N ? {
          id: N.itemId,
          name: N.label,
          img: N.item.img,
          bonusLabels: [...N.selectedChoiceLabels ?? []],
          warningLabels: [...N.warningLabels ?? []],
          isActive: N.isActive,
          statusLabel: N.isActive ? "Active" : "Inactive",
          statusReason: N.inactiveReason
        } : null
      };
    });
    const Y = ["positive", "negative", "narrative"], Q = ["major", "minor"], K = [...((gt = i.items) == null ? void 0 : gt.quality) ?? []].sort((k, N) => {
      const j = Kt(k.system ?? {}), he = Kt(N.system ?? {}), le = Y.indexOf(j.category) - Y.indexOf(he.category);
      if (le !== 0) return le;
      const Ee = Q.indexOf(j.tier) - Q.indexOf(he.tier);
      return Ee !== 0 ? Ee : String(k.name ?? "").localeCompare(String(N.name ?? ""));
    });
    return i.qualityGroups = Y.map((k) => ({
      id: k,
      label: Nn(k),
      records: K.filter((N) => Kt(N.system ?? {}).category === k).map((N) => {
        var le, Ee, Be, Ye;
        const j = Kt(N.system ?? {}), he = M(this, O, ua).call(this, "quality", N.id);
        return {
          id: N.id,
          accordionId: he,
          isExpanded: F(this, Wt).has(he),
          name: N.name,
          img: N.img,
          subtitle: `${Rn(j.tier)} ${Nn(j.category)}`,
          summaryStats: Wn([
            { label: "Tier", value: Rn(j.tier), emphasis: "strong" },
            { label: "Activation", value: j.activation || "passive" },
            { label: "Effects", value: String(((le = j.effects) == null ? void 0 : le.length) ?? 0) }
          ]),
          detailTags: jn([
            j.inactive ? "Inactive" : "",
            ...j.tags ?? []
          ]),
          detailRows: Kn([
            { label: "Category", value: Nn(j.category) },
            { label: "Tier", value: Rn(j.tier) },
            { label: "Activation", value: j.activation || "passive" },
            { label: "Prerequisites", value: String(((Ee = j.prerequisites) == null ? void 0 : Ee.length) ?? 0) },
            { label: "Effects", value: String(((Be = j.effects) == null ? void 0 : Be.length) ?? 0) },
            { label: "Tags", value: wi(j.tags ?? []).join(", ") }
          ]),
          detailText: Hn((Ye = N.system) == null ? void 0 : Ye.description)
        };
      })
    })), i;
  }
  _onRender(t, i) {
    super._onRender(t, i), M(this, O, qd).call(this), M(this, O, Yd).call(this), M(this, O, Qd).call(this);
  }
  async close(t = {}) {
    return M(this, O, Gr).call(this), M(this, O, qr).call(this), super.close(t);
  }
  requestCombatDashboardRefresh() {
    M(this, O, Ne).call(this, { force: !0 });
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
    n && (Oe(this, Nt, F(this, Nt) === n ? null : n), M(this, O, Ne).call(this, !1));
  }
  async _onToggleStatuses(t, i) {
    var r, o, l, c, u, d, m, f;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), M(this, O, Ft).call(this, i, t, "Statuses are not available right now.") || !this.isEditable) return;
    const n = this.getPersistentActor() ?? this.actor, s = ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? ((u = x.getSnapshot(n, { token: ((c = this.getSheetTokenDocument) == null ? void 0 : c.call(this)) ?? null })) == null ? void 0 : u.tokenDocument) ?? ((m = x.getSnapshot(this.actor, { token: ((d = this.getSheetTokenDocument) == null ? void 0 : d.call(this)) ?? null })) == null ? void 0 : m.tokenDocument) ?? null;
    if (!s) {
      (f = ui.notifications) == null || f.warn("Statuses require a token for this actor on the current scene.");
      return;
    }
    return Pu({
      actor: n,
      token: s
    });
  }
  async _onCombatSpend(t, i) {
    var c, u, d, m, f, p, h, g, y, b;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), M(this, O, Ft).call(this, i, t, "That combat action is not available right now.") || !this.isEditable) return;
    const n = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.resource) ?? "").trim(), s = Math.max(0, Number(((m = i == null ? void 0 : i.dataset) == null ? void 0 : m.cost) ?? 0)), r = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.combatAction) ?? "").trim(), o = String(((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.combatLabel) ?? "").trim(), l = String(((h = i == null ? void 0 : i.dataset) == null ? void 0 : h.combatCostLabel) ?? "").trim();
    if (!(!n || !s || !r))
      try {
        const S = this.getPersistentActor() ?? this.actor, T = await x.spendResource(S, {
          token: ((g = this.getSheetTokenDocument) == null ? void 0 : g.call(this)) ?? x.getCurrentSceneTokenDocument(S) ?? x.getCurrentSceneTokenDocument(this.actor),
          resource: n,
          cost: s,
          actionId: r,
          actionLabel: o,
          actionCostLabel: l
        });
        if (!(T != null && T.ok)) {
          (y = ui.notifications) == null || y.warn((T == null ? void 0 : T.reason) ?? "Unable to spend action.");
          return;
        }
        M(this, O, zt).call(this, { rerender: !1 }), M(this, O, Ne).call(this, { force: !0 });
      } catch (S) {
        console.error("MWD | Failed to spend combat action", S), (b = ui.notifications) == null || b.error("Unable to spend action.");
      }
  }
  async _onCombatAction(t, i) {
    var s, r, o, l, c, u;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t), M(this, O, Ft).call(this, i, t, "That combat action is not available right now.") || !this.isEditable) return;
    const n = String(((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.combatAction) ?? "").trim();
    if (n)
      try {
        const d = this.getPersistentActor() ?? this.actor, m = await M(this, O, Jd).call(this, n);
        if (!m) return;
        const f = await x.executeAction(d, {
          token: ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? x.getCurrentSceneTokenDocument(d) ?? x.getCurrentSceneTokenDocument(this.actor),
          actionId: n,
          metadata: m
        });
        if (!(f != null && f.ok)) {
          (c = ui.notifications) == null || c.warn((f == null ? void 0 : f.reason) ?? "Unable to perform action.");
          return;
        }
        M(this, O, zt).call(this, { rerender: !1 }), M(this, O, Ne).call(this, { force: !0 });
      } catch (d) {
        console.error("MWD | Failed to perform combat action", d), (u = ui.notifications) == null || u.error("Unable to perform action.");
      }
  }
  async _onCombatReduceBurn(t, i) {
    var n, s, r, o, l;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !M(this, O, Ft).call(this, i, t, "Burn recovery is not available right now.") && this.isEditable)
      try {
        const c = this.getPersistentActor() ?? this.actor, u = await x.reduceBurn(c, {
          token: ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? x.getCurrentSceneTokenDocument(c) ?? x.getCurrentSceneTokenDocument(this.actor)
        });
        if (!(u != null && u.ok)) {
          (o = ui.notifications) == null || o.warn((u == null ? void 0 : u.reason) ?? "Unable to reduce Burn.");
          return;
        }
        M(this, O, zt).call(this, { rerender: !1 }), M(this, O, Ne).call(this, { force: !0 });
      } catch (c) {
        console.error("MWD | Failed to reduce Burn", c), (l = ui.notifications) == null || l.error("Unable to reduce Burn.");
      }
  }
  async _onCombatAssist(t, i) {
    var n, s, r, o, l, c, u;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !M(this, O, Ft).call(this, i, t, "Assist is not available right now.") && this.isEditable)
      try {
        const d = this.getPersistentActor() ?? this.actor, m = ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? x.getCurrentSceneTokenDocument(d) ?? x.getCurrentSceneTokenDocument(this.actor), f = x.getSnapshot(d, { token: m });
        if (!f.hasCombatant) {
          (o = ui.notifications) == null || o.warn("No combatant on the current scene.");
          return;
        }
        if (f.isCurrentTurn) {
          (l = ui.notifications) == null || l.warn("Only outside your activation.");
          return;
        }
        const p = await M(this, O, tm).call(this, f);
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
        await M(this, O, im).call(this, {
          actor: d,
          token: m,
          target: p,
          costLabel: h.costLabel
        }), M(this, O, zt).call(this, { rerender: !1 }), M(this, O, Ne).call(this, { force: !0 });
      } catch (d) {
        console.error("MWD | Failed to assist", d), (u = ui.notifications) == null || u.error("Unable to assist.");
      }
  }
  async _onCombatEvade(t, i) {
    var n, s, r, o, l;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !M(this, O, Ft).call(this, i, t, "Evade is not available right now.") && this.isEditable)
      try {
        const c = this.getPersistentActor() ?? this.actor, u = ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? x.getCurrentSceneTokenDocument(c) ?? x.getCurrentSceneTokenDocument(this.actor), d = await gS(c, { token: u });
        if (!(d != null && d.ok)) {
          (o = ui.notifications) == null || o.warn((d == null ? void 0 : d.reason) ?? "Unable to activate Evade.");
          return;
        }
        M(this, O, zt).call(this, { rerender: !1 }), M(this, O, Ne).call(this, { force: !0 });
      } catch (c) {
        console.error("MWD | Failed to activate Evade", c), (l = ui.notifications) == null || l.error("Unable to activate Evade.");
      }
  }
  async _onCombatInterrupt(t, i) {
    var n, s, r, o, l, c, u, d;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !M(this, O, Ft).call(this, i, t, "Interrupt is not available right now.") && this.isEditable)
      try {
        const m = this.getPersistentActor() ?? this.actor, f = ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? x.getCurrentSceneTokenDocument(m) ?? x.getCurrentSceneTokenDocument(this.actor), p = x.getSnapshot(m, { token: f }), h = x.getPreparedInterrupt(p);
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
        if (!await M(this, O, Xd).call(this, h)) return;
        const y = await x.executeAction(m, {
          token: f,
          actionId: "interrupt",
          metadata: h
        });
        if (!(y != null && y.ok)) {
          (u = ui.notifications) == null || u.warn((y == null ? void 0 : y.reason) ?? "Unable to interrupt.");
          return;
        }
        await x.clearPreparedInterrupt(m, { token: f }), await M(this, O, am).call(this, {
          actor: m,
          token: f,
          preparedInterrupt: h,
          costLabel: y.costLabel
        }), M(this, O, zt).call(this, { rerender: !1 }), M(this, O, Ne).call(this, { force: !0 });
      } catch (m) {
        console.error("MWD | Failed to interrupt", m), (d = ui.notifications) == null || d.error("Unable to interrupt.");
      }
  }
  async _onCombatOverloadCheck(t, i) {
    var r, o, l, c, u, d, m, f, p, h, g;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), M(this, O, Ft).call(this, i, t, "Overload check is not available right now.") || !this.isEditable) return;
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
      if (M(this, O, zt).call(this, { rerender: !1 }), !b) {
        M(this, O, Ne).call(this, !1);
        return;
      }
      M(this, O, Ne).call(this, { force: !0 });
    } catch (y) {
      console.error("MWD | Failed to launch overload check", y), (g = ui.notifications) == null || g.error("Unable to launch overload check.");
    }
  }
  async _onCombatAttack(t, i) {
    var m, f, p, h, g, y, b, S, T, E, P, C, H, Y, Q, K, G, L, z, q, ee, oe, ke;
    if ((m = t == null ? void 0 : t.preventDefault) == null || m.call(t), (f = t == null ? void 0 : t.stopPropagation) == null || f.call(t), M(this, O, Ft).call(this, i, t, "Attack is not available right now.") || !this.isEditable) return;
    const n = this.getPersistentActor() ?? this.actor, s = ((p = this.getSheetTokenDocument) == null ? void 0 : p.call(this)) ?? x.getCurrentSceneTokenDocument(n) ?? x.getCurrentSceneTokenDocument(this.actor), r = String(((h = i == null ? void 0 : i.dataset) == null ? void 0 : h.combatAction) ?? "attack").trim() || "attack", o = String(((g = i == null ? void 0 : i.dataset) == null ? void 0 : g.combatLabel) ?? (r === "opportunity" ? "Opportunity" : "Attack")).trim() || "Attack", l = r === "opportunity", c = x.getSnapshot(n, { token: s }), u = !!((b = (y = c.state) == null ? void 0 : y.actionState) != null && b.aim);
    if (!c.hasCombatant) {
      (S = ui.notifications) == null || S.warn("No combatant on the current scene.");
      return;
    }
    if (l && c.isCurrentTurn) {
      (T = ui.notifications) == null || T.warn("Only outside your activation.");
      return;
    }
    if (!l && !c.isCurrentTurn) {
      (E = ui.notifications) == null || E.warn("Only available during your activation.");
      return;
    }
    if (!l && c.overloaded) {
      (P = ui.notifications) == null || P.warn("Overloaded actors can only recover Burn.");
      return;
    }
    if (!l) {
      const fe = 3 + Math.floor((Math.max(0, Number(((Y = (H = (C = n.system) == null ? void 0 : C.attributes) == null ? void 0 : H.reflexes) == null ? void 0 : Y.value) ?? 0)) + Math.max(0, Number(((G = (K = (Q = n.system) == null ? void 0 : Q.attributes) == null ? void 0 : K.willpower) == null ? void 0 : G.value) ?? 0))) / 2);
      if (Math.max(0, fe - Math.max(0, Number(((L = c.state) == null ? void 0 : L.saSpentThisActivation) ?? 0))) < 2) {
        (z = ui.notifications) == null || z.warn("Activation SA cap reached.");
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
      const fe = await ((oe = (ee = (q = game.mwd) == null ? void 0 : q.roll) == null ? void 0 : ee.execute) == null ? void 0 : oe.call(ee, { actor: n, payload: d, event: t }));
      if (M(this, O, zt).call(this, { rerender: !1 }), !fe) {
        M(this, O, Ne).call(this, !1);
        return;
      }
      u && await x.clearAim(n, { token: s });
      const ne = l ? await x.executeAction(n, {
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
      ne != null && ne.ok || (ke = ui.notifications) == null || ke.warn((ne == null ? void 0 : ne.reason) ?? `Unable to spend ${o} action.`), M(this, O, Ne).call(this, { force: !0 });
    } catch (fe) {
      console.error(`MWD | Failed to launch ${o}`, fe), nn(fe, `Unable to launch ${o}.`);
    }
  }
  async _onAddSkillSpecialization(t, i) {
    var d, m, f, p;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable || !this.editing) return;
    const n = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.skillKey) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = Er(s.system ?? {}, n), o = Ss(s.system ?? {}, n), l = Yi(n).filter((h) => !o.includes(h.key));
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
    const u = Xn(
      r.concat([c])
    );
    await s.update({
      [`system.skills.${n}.specializations`]: u
    }), M(this, O, Ne).call(this, { force: !0 });
  }
  async _onRemoveSkillSpecialization(t, i) {
    var l, c, u, d;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable || !this.editing) return;
    const n = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.skillKey) ?? "").trim(), s = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.specializationKey) ?? "").trim();
    if (!n || !s) return;
    const r = this.getPersistentActor() ?? this.actor, o = Xn(
      Er(r.system ?? {}, n).filter((m) => m !== s)
    );
    await r.update({
      [`system.skills.${n}.specializations`]: o
    }), M(this, O, Ne).call(this, { force: !0 });
  }
  async _onCreateLifeModuleItem(t, i) {
    var d, m, f, p, h;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable) return;
    const n = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.moduleType) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = zo(n);
    if (!r.length) {
      (p = ui.notifications) == null || p.warn(`No ${Ea(n)} life modules are configured in game settings.`);
      return;
    }
    const o = await hc({
      title: `Choose ${Ea(n)} Life Module`,
      label: "Life Module",
      confirmLabel: "Create",
      options: r.map((g) => ({
        value: g.id,
        label: g.label
      }))
    });
    if (!o) return;
    const l = Ri(o);
    if (!l) {
      (h = ui.notifications) == null || h.warn("That life module catalog entry no longer exists.");
      return;
    }
    const c = sd(l, {}), u = {};
    for (const g of c.filter((y) => y.hasMultipleChoices)) {
      const y = await hc({
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
      system: Za({
        moduleType: n,
        catalogId: l.id,
        selectedGrants: u
      })
    }]), M(this, O, Ne).call(this, { force: !0 });
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
    }]), M(this, O, Ne).call(this, { force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var s, r, o;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = M(this, O, Si).call(this, i, t);
    (o = n == null ? void 0 : n.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var r, o;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = M(this, O, Si).call(this, i, t);
    if (!n) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [n.id]), M(this, O, Ne).call(this, { force: !0 });
  }
  async _onToggleInventoryAccordion(t, i) {
    var s, r, o, l, c, u, d, m, f, p;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.accordionId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((p = (f = (m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-accordion-id]")) == null ? void 0 : f.dataset) == null ? void 0 : p.accordionId) ?? ""
    ).trim();
    n && (F(this, Wt).has(n) ? F(this, Wt).delete(n) : F(this, Wt).add(n), M(this, O, Ne).call(this, !1));
  }
  async _onToggleOwnedItemEquipped(t, i) {
    var r, o, l, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = M(this, O, Si).call(this, i, t);
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor;
    await ((c = s.setOwnedItemEquipped) == null ? void 0 : c.call(s, n.id, !((l = n.system) != null && l.equipped))), M(this, O, Ne).call(this, { force: !0 });
  }
  async _onSetOwnedItemPrimary(t, i) {
    var r, o, l, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = M(this, O, Si).call(this, i, t);
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor;
    await ((c = s.setOwnedItemPrimary) == null ? void 0 : c.call(s, n.id, !((l = n.system) != null && l.isPrimary))), M(this, O, Ne).call(this, { force: !0 });
  }
  async _onAdjustGearQuantity(t, i) {
    var c, u, d, m, f, p, h, g, y, b, S;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const n = M(this, O, Si).call(this, i, t);
    if (!n || !["gear", "consumable"].includes(String(n.canonicalType ?? n.type ?? "").trim())) return;
    const s = Math.trunc(Number(
      ((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.delta) ?? ((p = (f = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, "[data-delta]")) == null ? void 0 : f.dataset) == null ? void 0 : p.delta) ?? ((b = (y = (g = (h = t == null ? void 0 : t.target) == null ? void 0 : h.closest) == null ? void 0 : g.call(h, "[data-delta]")) == null ? void 0 : y.dataset) == null ? void 0 : b.delta) ?? 0
    ) || 0);
    if (!s) return;
    const o = (this.getPersistentActor() ?? this.actor).items.get(n.id) ?? n, l = Math.max(0, Math.trunc(Number(((S = o.system) == null ? void 0 : S.quantity) ?? 1) || 0) + s);
    await o.update({ "system.quantity": l }), M(this, O, Ne).call(this, { force: !0 });
  }
  async _onAttackWeapon(t, i) {
    var l, c, u, d;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), M(this, O, Ft).call(this, i, t, "Equip that weapon before attacking.")) return;
    const n = M(this, O, Si).call(this, i, t);
    if (!((u = n == null ? void 0 : n.isPersonalWeapon) != null && u.call(n))) return;
    const s = this.getPersistentActor() ?? this.actor, r = ((d = this.getSheetTokenDocument) == null ? void 0 : d.call(this)) ?? x.getCurrentSceneTokenDocument(s) ?? x.getCurrentSceneTokenDocument(this.actor);
    await xs({ weapon: n, event: t, token: r }) && M(this, O, Ne).call(this, { force: !0 });
  }
};
Nt = new WeakMap(), Ei = new WeakMap(), Hi = new WeakMap(), Wt = new WeakMap(), Aa = new WeakMap(), O = new WeakSet(), qd = function() {
  M(this, O, Gr).call(this), F(this, Nt) && (Oe(this, Ei, (t) => {
    var s;
    const i = this._getRootElement();
    if (!i) return;
    const n = t.target;
    if (n instanceof Node && !((s = n.closest) != null && s.call(n, ".mwd-combat-menu"))) {
      if (!i.contains(n)) {
        M(this, O, zt).call(this);
        return;
      }
      M(this, O, zt).call(this);
    }
  }), document.addEventListener("click", F(this, Ei)));
}, Gr = function() {
  F(this, Ei) && (document.removeEventListener("click", F(this, Ei)), Oe(this, Ei, null));
}, Gn = function() {
  const t = this._getRootElement();
  return t ? t.querySelector(".mwd-scroll-area") ?? t.querySelector(".csb-tab-panels") : null;
}, Vd = function() {
  const t = M(this, O, Gn).call(this);
  if (!(t instanceof HTMLElement)) {
    Oe(this, Hi, null);
    return;
  }
  Oe(this, Hi, {
    top: t.scrollTop,
    left: t.scrollLeft
  });
}, Yd = function() {
  const t = F(this, Hi);
  if (!t) return;
  const i = M(this, O, Gn).call(this);
  i instanceof HTMLElement && (i.scrollTop = t.top, i.scrollLeft = t.left, requestAnimationFrame(() => {
    const n = M(this, O, Gn).call(this);
    n instanceof HTMLElement && (n.scrollTop = t.top, n.scrollLeft = t.left);
  }), Oe(this, Hi, null));
}, Ne = function(t = !1) {
  M(this, O, Vd).call(this), this.render(t);
}, zt = function({ rerender: t = !0 } = {}) {
  F(this, Nt) && (Oe(this, Nt, null), t && M(this, O, Ne).call(this, !1));
}, Si = function(t, i) {
  var s, r, o, l, c, u, d, m;
  const n = String(
    ((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.itemId) ?? ((l = (o = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((m = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
  ).trim();
  return n ? this.actor.items.get(n) ?? null : null;
}, Qd = function() {
  var n;
  const t = (n = this._getRootElement) == null ? void 0 : n.call(this);
  if (!t) return;
  M(this, O, qr).call(this);
  const i = new AbortController();
  Oe(this, Aa, i), t.addEventListener("dragstart", (s) => {
    var c, u, d;
    const r = (u = (c = s.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-weapon-attack-uuid]");
    if (!r || !t.contains(r)) return;
    const o = M(this, O, Si).call(this, r, s), l = o ? jd(o) : null;
    if (!l) {
      s.preventDefault();
      return;
    }
    s.stopPropagation(), (d = s.dataTransfer) == null || d.setData("text/plain", JSON.stringify(l)), s.dataTransfer && (s.dataTransfer.effectAllowed = "copy");
  }, { signal: i.signal });
}, qr = function() {
  var t;
  (t = F(this, Aa)) == null || t.abort(), Oe(this, Aa, null);
}, Jd = async function(t) {
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
}, Xd = async function(t = {}) {
  const i = String((t == null ? void 0 : t.condition) ?? "").trim(), n = String((t == null ? void 0 : t.scope) ?? "").trim(), s = `
    <div class="mwd-quick-select">
      <p><strong>Trigger:</strong> ${yt(i || "Unspecified trigger")}</p>
      <p><strong>Scope:</strong> ${yt(n || "Unspecified response")}</p>
    </div>`;
  return !!await Dialog.confirm({
    title: "Resolve Interrupt",
    content: s,
    yes: () => !0,
    no: () => !1
  });
}, Zd = function(t) {
  return t != null && t.combatants ? typeof t.combatants.values == "function" ? Array.from(t.combatants.values()) : Array.from(t.combatants ?? []) : [];
}, em = function(t) {
  var n;
  const i = String(((n = t == null ? void 0 : t.combatant) == null ? void 0 : n.id) ?? "").trim();
  return M(this, O, Zd).call(this, t == null ? void 0 : t.combat).filter((s) => s && String(s.id ?? "").trim() !== i).map((s) => {
    var c;
    const r = ((c = s.token) == null ? void 0 : c.document) ?? s.token ?? null, o = s.actor ?? (r == null ? void 0 : r.actor) ?? null, l = String(s.name ?? (r == null ? void 0 : r.name) ?? (o == null ? void 0 : o.name) ?? "Combatant").trim() || "Combatant";
    return {
      combatantId: String(s.id ?? "").trim(),
      actorUuid: (o == null ? void 0 : o.uuid) ?? null,
      tokenUuid: (r == null ? void 0 : r.uuid) ?? null,
      name: l
    };
  }).filter((s) => s.combatantId && s.name).sort((s, r) => s.name.localeCompare(r.name));
}, tm = async function(t) {
  var r;
  const i = M(this, O, em).call(this, t);
  if (!i.length)
    return (r = ui.notifications) == null || r.warn("No other combatants are available to assist."), null;
  const n = `
    <form class="mwd-quick-select">
      <div class="mwd-field">
        <label>Assist</label>
        <select name="combatant">
          ${i.map((o) => `<option value="${yt(o.combatantId)}">${yt(o.name)}</option>`).join("")}
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
}, im = async function({ actor: t, token: i = null, target: n = null, costLabel: s = "" } = {}) {
  const r = String((t == null ? void 0 : t.name) ?? "Ally").trim() || "Ally", o = String((n == null ? void 0 : n.name) ?? "an ally").trim() || "an ally", l = String(s ?? "").trim(), c = `
    <div class="mwd-chat-card mwd-chat-card--assist">
      <h3>Assist</h3>
      <p><strong>${yt(r)}</strong> assists <strong>${yt(o)}</strong>.</p>
      ${l ? `<p><small>Cost: ${yt(l)}</small></p>` : ""}
    </div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: t, token: (i == null ? void 0 : i.object) ?? i }),
    content: c
  });
}, am = async function({ actor: t, token: i = null, preparedInterrupt: n = null, costLabel: s = "" } = {}) {
  const r = String((t == null ? void 0 : t.name) ?? "Combatant").trim() || "Combatant", o = String((n == null ? void 0 : n.condition) ?? "").trim(), l = String((n == null ? void 0 : n.scope) ?? "").trim(), c = String(s ?? "").trim(), u = `
    <div class="mwd-chat-card mwd-chat-card--interrupt">
      <h3>Interrupt</h3>
      <p><strong>${yt(r)}</strong> resolves a prepared interrupt.</p>
      ${o ? `<p><strong>Trigger:</strong> ${yt(o)}</p>` : ""}
      ${l ? `<p><strong>Scope:</strong> ${yt(l)}</p>` : ""}
      ${c ? `<p><small>Cost: ${yt(c)}</small></p>` : ""}
    </div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: t, token: (i == null ? void 0 : i.object) ?? i }),
    content: u
  });
}, Ft = function(t, i, n = "That action is not available right now.") {
  var o, l, c, u, d;
  const s = ((o = t == null ? void 0 : t.closest) == null ? void 0 : o.call(t, "[data-action-disabled='true']")) ?? ((c = (l = i == null ? void 0 : i.target) == null ? void 0 : l.closest) == null ? void 0 : c.call(l, "[data-action-disabled='true']"));
  if (!s) return !1;
  const r = String(((u = s.dataset) == null ? void 0 : u.actionReason) ?? n).trim() || n;
  return (d = ui.notifications) == null || d.warn(r), !0;
}, ua = function(t, i) {
  return `${String(t ?? "").trim()}:${String(i ?? "").trim()}`;
}, D(ye, "PARTS", {
  sheet: {
    get template() {
      return `${J}/v2/actor/character-sheet.hbs`;
    }
  }
}), D(ye, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Yt(ye, ye, "DEFAULT_OPTIONS"), {
  classes: ["character-sheet", w, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
  window: { minWidth: 450, minHeight: 740, resizable: !0 },
  position: { width: 980, height: 900 },
  actions: {
    ...Yt(ye, ye, "DEFAULT_OPTIONS").actions,
    edgeSet: ye.prototype._onEdgeSet,
    toggleCombatMenu: ye.prototype._onToggleCombatMenu,
    toggleStatuses: ye.prototype._onToggleStatuses,
    combatAction: ye.prototype._onCombatAction,
    combatSpend: ye.prototype._onCombatSpend,
    combatAssist: ye.prototype._onCombatAssist,
    combatEvade: ye.prototype._onCombatEvade,
    combatInterrupt: ye.prototype._onCombatInterrupt,
    combatReduceBurn: ye.prototype._onCombatReduceBurn,
    combatOverloadCheck: ye.prototype._onCombatOverloadCheck,
    combatAttack: ye.prototype._onCombatAttack,
    createOwnedItem: ye.prototype._onCreateOwnedItem,
    addSkillSpecialization: ye.prototype._onAddSkillSpecialization,
    removeSkillSpecialization: ye.prototype._onRemoveSkillSpecialization,
    createLifeModuleItem: ye.prototype._onCreateLifeModuleItem,
    editOwnedItem: ye.prototype._onEditOwnedItem,
    deleteOwnedItem: ye.prototype._onDeleteOwnedItem,
    toggleInventoryAccordion: ye.prototype._onToggleInventoryAccordion,
    toggleOwnedItemEquipped: ye.prototype._onToggleOwnedItemEquipped,
    setOwnedItemPrimary: ye.prototype._onSetOwnedItemPrimary,
    adjustGearQuantity: ye.prototype._onAdjustGearQuantity,
    attackWeapon: ye.prototype._onAttackWeapon
  }
}, { inplace: !1 }));
let Kr = ye;
function IS(a, e, t = "") {
  const i = foundry.utils.getProperty(a, e);
  return i === void 0 ? t : i;
}
function el(a, e, t = {}) {
  const {
    document: i = null,
    type: n = "text",
    value: s = IS(i, a, n === "number" ? 0 : ""),
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
function gc(a, e, t, i = {}) {
  return el(e, t, { ...i, document: a, type: "text" });
}
function da(a, e, t, i = {}) {
  return el(e, t, { ...i, document: a, type: "number" });
}
function DS(a, e, t, i = {}) {
  return el(e, t, { ...i, document: a, type: "textarea" });
}
function OS(a, e = []) {
  return e.map(
    (t) => da(
      a,
      `system.attributes.${t.key}.value`,
      t.label
    )
  );
}
function kn(a, {
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
class nm extends sn {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["npc-sheet", w, "actor-sheet-v2"],
      position: { width: 920, height: 860 }
    }, { inplace: !1 });
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), i = this.actor;
    return t.layout = await Zi.get("npc"), t.actorSheet = {
      profileFields: [
        gc(i, "system.role", "Role / Archetype")
      ],
      attributeFields: OS(i, [
        { key: "strength", label: "Strength" },
        { key: "reflexes", label: "Reflexes" },
        { key: "intelligence", label: "Intelligence" },
        { key: "willpower", label: "Willpower" },
        { key: "charisma", label: "Charisma" },
        { key: "edge", label: "Edge" }
      ]),
      monitorFields: [
        da(i, "system.monitors.physical.value", "Physical"),
        da(i, "system.monitors.physical.max", "Physical Max"),
        da(i, "system.monitors.fatigue.value", "Fatigue"),
        da(i, "system.monitors.fatigue.max", "Fatigue Max"),
        da(i, "system.monitors.armor.value", "Armor"),
        gc(i, "system.monitors.armor.effect", "Armor Effect")
      ],
      itemCollections: {
        traits: kn(i, {
          types: ["quality"],
          describe: (n) => {
            var s;
            return ((s = n.system) == null ? void 0 : s.category) ?? "";
          }
        }),
        weapons: kn(i, {
          types: ["personalWeapon"],
          supportsEquip: !0,
          supportsPrimary: !0,
          describe: (n) => {
            var s, r;
            return `${((s = n.system) == null ? void 0 : s.category) ?? "ranged"} | DV ${Number(((r = n.system) == null ? void 0 : r.damage) ?? 0)}`;
          }
        }),
        assetModules: kn(i, {
          types: ["assetModule"],
          describe: (n) => {
            var s;
            return `Level ${Number(((s = n.system) == null ? void 0 : s.level) ?? 1)}`;
          }
        }),
        inventory: kn(i, {
          // Consumables share the same quantity-driven row contract as gear on
          // lightweight actor sheets, so we present them in one inventory list.
          types: ["gear", "consumable"],
          describe: (n) => {
            var s, r;
            return `Qty ${Number(((s = n.system) == null ? void 0 : s.quantity) ?? 1)} | Rating ${Number(((r = n.system) == null ? void 0 : r.rating) ?? 0)}`;
          }
        })
      },
      notesField: DS(i, "system.biography", "Notes", { rows: 12 })
    }, t;
  }
}
D(nm, "PARTS", {
  sheet: {
    template: `${J}/v2/actor/npc-sheet.hbs`,
    scrollable: [".sheet-body"]
  }
});
function et(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function sm(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function _S(a) {
  return String(a ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function LS(a, e = 180) {
  const t = _S(a);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function pa(a = "") {
  return String(a ?? "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (e) => e.toUpperCase());
}
function sr(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim(),
    emphasis: e.emphasis ?? ""
  }));
}
function xS(a = []) {
  return sm(a).map((e) => ({ label: e }));
}
function yc(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
function $S(a = {}) {
  return ["close", "near", "far", "extreme", "max"].filter((i) => (a == null ? void 0 : a[i]) !== void 0 && (a == null ? void 0 : a[i]) !== null && String(a[i]).trim() !== "").map((i) => {
    const n = a[i];
    return i === "max" ? `Max ${pa(n)}` : `${pa(i)} ${et(n, 0)}`;
  }).join(" | ");
}
const BS = Object.freeze({
  handling: "Handling",
  system: "System",
  chassis: "Chassis",
  condition: "Condition"
}), bc = Object.freeze({
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
var Wi, ln, Vr;
const tt = class tt extends sn {
  constructor() {
    super(...arguments);
    Me(this, ln);
    Me(this, Wi, /* @__PURE__ */ new Set());
  }
  async _prepareContext(t) {
    var n, s, r, o;
    const i = await super._prepareContext(t);
    return i._mwdThemeClass = ((o = (r = (s = (n = game.system) == null ? void 0 : n.mwd) == null ? void 0 : s.styles) == null ? void 0 : r.selectCssClass) == null ? void 0 : o.call(r)) ?? "", i.layout = await Zi.get(this.constructor.LAYOUT_ID ?? tt.LAYOUT_ID), i.vehicleSheet = {
      summaryStats: this._buildSummaryStats(),
      alerts: this._buildAlerts(),
      statusAction: {
        label: "Statuses",
        disabled: !this._resolveStatusToken(this.getPersistentActor() ?? this.actor),
        reason: "Statuses require a token for this actor on the current scene."
      },
      activeCrits: this._buildActiveCrits(),
      attributes: this._buildAttributeCards(),
      sections: this._buildVehicleSections()
    }, i.conditionMonitors = this._buildConditionMonitors(), i;
  }
  _buildSummaryStats() {
    var n, s, r, o, l, c, u;
    const t = ((n = this.actor.system) == null ? void 0 : n.attributes) ?? {}, i = ((r = (s = this.actor.system) == null ? void 0 : s.monitors) == null ? void 0 : r.structure) ?? {};
    return sr([
      { label: "Handling", value: et((o = t.handling) == null ? void 0 : o.value, 0), emphasis: "strong" },
      { label: "System", value: et((l = t.system) == null ? void 0 : l.value, 0) },
      { label: "Chassis", value: et((c = t.chassis) == null ? void 0 : c.value, 0) },
      { label: "Condition", value: et((u = t.condition) == null ? void 0 : u.value, 0) },
      { label: "Structure", value: `${et(i.value, 0)} / ${et(i.max, 0)}` }
    ]);
  }
  _buildAlerts() {
    return [];
  }
  _buildAttributeCards() {
    var i;
    const t = ((i = this.actor.system) == null ? void 0 : i.attributes) ?? {};
    return Object.entries(BS).map(([n, s]) => {
      var r;
      return {
        key: n,
        label: s,
        value: et((r = t == null ? void 0 : t[n]) == null ? void 0 : r.value, 0),
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
      value: Math.max(0, et(t.value, 0)),
      max: Math.max(0, et(t.max, 0)),
      segments: Array.from({ length: Math.max(0, et(t.max, 0)) }, (l, c) => {
        const u = c + 1;
        return {
          value: u,
          filled: u <= Math.max(0, et(t.value, 0))
        };
      }),
      status: {
        label: "Resist",
        value: et(t.resistance, 0)
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
    const n = (t == null ? void 0 : t.system) ?? {}, s = (t == null ? void 0 : t.canonicalType) ?? (t == null ? void 0 : t.type) ?? "", r = typeof (t == null ? void 0 : t.getCombatProfile) == "function" ? t.getCombatProfile() : null, o = `${String(i ?? "").trim()}:${String((t == null ? void 0 : t.id) ?? "").trim()}`, l = bc[s] ?? pa(s || "item"), c = n.notes ?? n.description ?? ((f = n.references) == null ? void 0 : f.description) ?? "", u = n.quantity, d = sr(r ? [
      { label: "DV", value: et(r.damage, 0), emphasis: "strong" },
      { label: "AP", value: et(r.ap, 0) },
      { label: "Type", value: r.damageTypeLabel ?? r.damageType ?? "" }
    ] : [
      { label: "Type", value: l },
      ...u !== void 0 ? [{ label: "Qty", value: et(u, 0) }] : []
    ]), m = yc(r ? [
      { label: "Skill", value: ((p = r.skillDef) == null ? void 0 : p.label) ?? r.skill ?? "" },
      { label: "Category", value: r.category ?? n.weaponCategory ?? n.category ?? "" },
      { label: "Range", value: $S(r.range) }
    ] : [
      { label: "Category", value: n.category ?? l },
      { label: "Quantity", value: u !== void 0 ? et(u, 0) : "" }
    ]);
    return {
      id: (t == null ? void 0 : t.id) ?? "",
      accordionId: o,
      isExpanded: F(this, Wi).has(o),
      name: (t == null ? void 0 : t.name) ?? l,
      img: (t == null ? void 0 : t.img) ?? "icons/svg/item-bag.svg",
      subtitle: ((h = r == null ? void 0 : r.skillDef) == null ? void 0 : h.label) ?? n.category ?? l,
      summaryStats: d,
      detailTags: xS([
        n.equipped ? "Equipped" : "",
        n.isPrimary ? "Primary" : "",
        n.weaponCategory ?? n.category ?? ""
      ]),
      detailRows: m,
      detailText: LS(c),
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
    const s = this.getPersistentActor() ?? this.actor, r = bc[n] ?? pa(n), o = s.items.filter((d) => d.type === n).length;
    await s.createEmbeddedDocuments("Item", [{
      name: `${r} ${o + 1}`,
      type: n
    }]), this.render({ force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var s, r, o;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = M(this, ln, Vr).call(this, i, t);
    (o = n == null ? void 0 : n.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var r, o;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = M(this, ln, Vr).call(this, i, t);
    if (!n) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [n.id]), this.render({ force: !0 });
  }
  async _onToggleInventoryAccordion(t, i) {
    var s, r, o, l, c, u, d, m, f, p;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.accordionId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((p = (f = (m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-accordion-id]")) == null ? void 0 : f.dataset) == null ? void 0 : p.accordionId) ?? ""
    ).trim();
    n && (F(this, Wi).has(n) ? F(this, Wi).delete(n) : F(this, Wi).add(n), this.render({ force: !1 }));
  }
  _buildActiveCrits() {
    var i;
    const t = ((i = this.getPersistentActor) == null ? void 0 : i.call(this)) ?? this.actor;
    return Ad(t).map((n) => {
      const s = Uo(n.remedyKey);
      return {
        id: n.id,
        label: n.label ?? pa(n.key),
        locationLabel: n.locationLabel ?? pa(n.locationKey),
        detail: sm([
          Array.isArray(n.gates) && n.gates.length ? `Gates: ${n.gates.join(", ")}` : "",
          Array.isArray(n.mods) && n.mods.length ? `Mods: ${n.mods.join(", ")}` : "",
          n.escalationKey ? `Escalates: ${n.escalationKey}` : ""
        ]).join(" | "),
        remedyLabel: s.label,
        remedyKey: s.key,
        machineActorUuid: (t == null ? void 0 : t.uuid) ?? ""
      };
    });
  }
  async _onToggleStatuses(t, i) {
    var r, o, l, c, u, d;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.actionDisabled) === "true")
      return (u = ui.notifications) == null || u.warn(((c = i == null ? void 0 : i.dataset) == null ? void 0 : c.actionReason) || "Statuses are not available right now."), !1;
    const n = this.getPersistentActor() ?? this.actor, s = this._resolveStatusToken(n);
    return s ? Pu({
      actor: n,
      token: s
    }) : ((d = ui.notifications) == null || d.warn("Statuses require a token for this actor on the current scene."), !1);
  }
  async _onMachineWeaponAttack(t, i) {
    var u, d, m, f, p, h, g, y, b, S, T, E;
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
      const P = ((T = x.getSnapshot) == null ? void 0 : T.call(x, n, { token: l })) ?? null;
      if (P != null && P.hasCombatant) {
        const C = await x.spendResource(n, {
          token: l,
          resource: "sa",
          cost: 2,
          actionId: "attack",
          actionLabel: "Attack",
          actionCostLabel: "2 SA",
          actionCategory: "complex"
        });
        C != null && C.ok || (E = ui.notifications) == null || E.warn((C == null ? void 0 : C.reason) ?? "Unable to record attack action.");
      }
    }
    return !!c;
  }
  async _onMachineCritRemedy(t, i) {
    var r, o, l, c, u, d, m;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const n = this.getPersistentActor() ?? this.actor, s = await Fd({
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
Wi = new WeakMap(), ln = new WeakSet(), Vr = function(t, i) {
  var s, r, o, l, c, u, d, m;
  const n = String(
    ((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.itemId) ?? ((l = (o = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((m = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
  ).trim();
  return n ? this.actor.items.get(n) ?? null : null;
}, D(tt, "LAYOUT_ID", "vehicle"), D(tt, "PARTS", {
  sheet: {
    get template() {
      return `${J}/v2/actor/vehicle-sheet.hbs`;
    }
  }
}), D(tt, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Yt(tt, tt, "DEFAULT_OPTIONS"), {
  classes: ["vehicle-sheet", w, "actor-sheet-v2", "mwd-vehicle-sheet", "mwd-sheet"],
  window: { minWidth: 520, minHeight: 720, resizable: !0 },
  position: { width: 940, height: 900 },
  actions: {
    ...Yt(tt, tt, "DEFAULT_OPTIONS").actions,
    createOwnedItem: tt.prototype._onCreateOwnedItem,
    editOwnedItem: tt.prototype._onEditOwnedItem,
    deleteOwnedItem: tt.prototype._onDeleteOwnedItem,
    toggleInventoryAccordion: tt.prototype._onToggleInventoryAccordion,
    machineWeaponAttack: tt.prototype._onMachineWeaponAttack,
    toggleStatuses: tt.prototype._onToggleStatuses,
    machineCritRemedy: tt.prototype._onMachineCritRemedy
  }
}, { inplace: !1 }));
let rs = tt;
function Ke(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function rm(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function Pt(a = "") {
  return String(a ?? "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (e) => e.toUpperCase());
}
function rr(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim(),
    emphasis: e.emphasis ?? ""
  }));
}
function Sc(a = []) {
  return rm(a).map((e) => ({ label: e }));
}
function Ac(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
function $i(a = "") {
  var t, i;
  const e = ((i = (t = v == null ? void 0 : v.actor) == null ? void 0 : t.vehicle) == null ? void 0 : i.quickActions) ?? {};
  return String((e == null ? void 0 : e[a]) ?? Pt(a)).trim() || Pt(a);
}
var cn, Qr;
const Ut = class Ut extends rs {
  constructor() {
    super(...arguments);
    Me(this, cn);
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
    const t = Ke((r = (s = this.actor.system) == null ? void 0 : s.mwd) == null ? void 0 : r.tonnage, 0), i = ((l = (o = this.actor.system) == null ? void 0 : o.mwd) == null ? void 0 : l.weightClass) ?? "medium", n = { light: "Light", medium: "Medium", heavy: "Heavy", assault: "Assault" };
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
        displayValue: n[i] ?? Pt(i),
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
        value: Math.max(0, Ke(m.value, 0)),
        max: Math.max(0, Ke(m.max, 0)),
        segments: Array.from({ length: Math.max(0, Ke(m.max, 0)) }, (p, h) => {
          const g = h + 1;
          return {
            value: g,
            filled: g <= Math.max(0, Ke(m.value, 0))
          };
        }),
        status: {
          label: "Resist",
          value: Ke((f = m.resistance) == null ? void 0 : f.default, 0)
        }
      };
    };
    return [
      n("structure", "Structure", "wound", t),
      n("armor", "Armor", "armor", i)
    ];
  }
  _buildSummaryStats() {
    var s, r, o, l, c, u, d, m, f, p, h, g;
    const t = ((r = (s = this.actor.system) == null ? void 0 : s.mwd) == null ? void 0 : r.loadout) ?? {}, i = ((l = (o = this.actor.system) == null ? void 0 : o.mwd) == null ? void 0 : l.heat) ?? {}, n = ((u = (c = this.actor.system) == null ? void 0 : c.mwd) == null ? void 0 : u.heatStatus) ?? {};
    return rr([
      { label: "Weight", value: Pt(((m = (d = this.actor.system) == null ? void 0 : d.mwd) == null ? void 0 : m.weightClass) ?? "medium"), emphasis: "strong" },
      { label: "Tonnage", value: Ke((p = (f = this.actor.system) == null ? void 0 : f.mwd) == null ? void 0 : p.tonnage, 0) },
      { label: "Mounts", value: `${Ke((h = t == null ? void 0 : t.mountPoints) == null ? void 0 : h.used, 0)} / ${Ke((g = t == null ? void 0 : t.mountPoints) == null ? void 0 : g.total, 0)}` },
      { label: "Heat", value: `${Ke(i.current, 0)} / ${Ke(i.max, 0)}` },
      { label: "Status", value: n.label ?? Pt(n.code ?? "safe") }
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
    const t = ((l = (o = this.actor.system) == null ? void 0 : o.mwd) == null ? void 0 : l.heat) ?? {}, i = ((u = (c = this.actor.system) == null ? void 0 : c.mwd) == null ? void 0 : u.heatStatus) ?? {}, n = Math.max(0, Ke(t.current, 0)), s = Math.max(0, Ke(t.max, 0)), r = t.thresholds ?? {};
    return {
      label: "Heat",
      current: n,
      max: s,
      editable: !!this.isEditable,
      status: i.label ?? Pt(i.code ?? "safe"),
      thresholds: {
        runningHot: Ke(r.runningHot, 0),
        overheated: Ke(r.overheated, 0),
        shutdown: Ke(r.shutdown, 0)
      },
      segments: Array.from({ length: s }, (d, m) => {
        const f = m + 1;
        return {
          value: f,
          filled: f <= n,
          breakpoint: rm([
            f === Ke(r.runningHot, 0) ? "runningHot" : "",
            f === Ke(r.overheated, 0) ? "overheated" : "",
            f === Ke(r.shutdown, 0) ? "shutdown" : ""
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
        label: $i("primaryWeapons"),
        hint: (i == null ? void 0 : i.name) ?? "Primary weapon group",
        handler: "mechAttack",
        disabled: !i,
        dataset: { attackKind: "primary" }
      },
      {
        label: $i("rangedAttack"),
        hint: "Prompt for a weapon group",
        handler: "mechAttack",
        disabled: !n,
        dataset: { attackKind: "ranged" }
      },
      {
        label: $i("meleeAttack"),
        hint: "Prompt for a melee profile",
        handler: "mechAttack",
        disabled: !s,
        dataset: { attackKind: "melee" }
      },
      {
        label: $i("dodgeCheck"),
        hint: "Piloting response",
        handler: "mechRoll",
        disabled: !1,
        dataset: { rollKind: "dodge" }
      },
      {
        label: $i("pilotingCheck"),
        hint: "Vehicle handling test",
        handler: "mechRoll",
        disabled: !1,
        dataset: { rollKind: "piloting" }
      },
      {
        label: $i("sensorSweep"),
        hint: "Perception or technician",
        handler: "mechRoll",
        disabled: !t.hasSensorSweep,
        dataset: { rollKind: "sensor" }
      },
      {
        label: $i("emergencyRepair"),
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
      summaryStats: rr([
        { label: "Weapons", value: Array.isArray(s.weapons) ? s.weapons.length : 0, emphasis: "strong" },
        { label: "Missing", value: Array.isArray(s.missingWeaponIds) ? s.missingWeaponIds.length : 0 }
      ]),
      detailTags: Sc([
        s.isPrimary ? "Primary" : "",
        ...Array.isArray(s.weapons) ? s.weapons.map((r) => {
          var o;
          return ((o = r.system) == null ? void 0 : o.weaponCategory) ?? "";
        }) : []
      ]),
      detailRows: Ac([
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
    const t = ((o = (r = this.actor.system) == null ? void 0 : r.mwd) == null ? void 0 : o.loadout) ?? {}, i = ((l = v == null ? void 0 : v.mwd) == null ? void 0 : l.hardpointType) ?? {}, n = ((c = v == null ? void 0 : v.mwd) == null ? void 0 : c.hardpointSize) ?? {}, s = ((u = v == null ? void 0 : v.mwd) == null ? void 0 : u.hardpointLocation) ?? {};
    return Array.from(t.hardpoints ?? []).map((d) => ({
      id: d.id,
      name: `${i[d.type] ?? Pt(d.type)} ${n[d.size] ?? Pt(d.size)}`,
      subtitle: s[d.location] ?? Pt(d.location),
      summaryStats: rr([
        { label: "Type", value: i[d.type] ?? Pt(d.type), emphasis: "strong" },
        { label: "Size", value: n[d.size] ?? Pt(d.size) }
      ]),
      detailTags: Sc([
        d.occupiedByName ? `Occupied by ${d.occupiedByName}` : "Open"
      ]),
      detailRows: Ac([
        { label: "Location", value: s[d.location] ?? Pt(d.location) },
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
        await M(this, cn, Qr).call(this, n, r);
      else if (s === "primary") {
        const h = (((d = n.system) == null ? void 0 : d.weaponGroups) ?? []).find((g) => g == null ? void 0 : g.isPrimary) ?? null;
        h != null && h.id ? await M(this, cn, Qr).call(this, n, h.id) : await ((m = n.rollRangedAttack) == null ? void 0 : m.call(n));
      } else s === "melee" ? await ((f = n.rollMeleeAttack) == null ? void 0 : f.call(n)) : await ((p = n.rollRangedAttack) == null ? void 0 : p.call(n));
    } catch (h) {
      console.error("MWD | Failed to launch BattleMech attack", h), nn(h, "Unable to launch that BattleMech attack.");
    }
  }
  async _onMechRoll(t, i) {
    var r, o, l, c, u, d, m;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const n = this.getPersistentActor() ?? this.actor, s = String(((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.rollKind) ?? "").trim();
    try {
      s === "dodge" ? await ((c = n.rollDodge) == null ? void 0 : c.call(n)) : s === "piloting" ? await ((u = n.rollPilotingCheck) == null ? void 0 : u.call(n)) : s === "sensor" ? await ((d = n.rollSensorSweep) == null ? void 0 : d.call(n)) : s === "repair" && await ((m = n.rollEmergencyRepair) == null ? void 0 : m.call(n));
    } catch (f) {
      console.error("MWD | Failed to launch BattleMech check", f), nn(f, "Unable to launch that BattleMech check.");
    }
  }
};
cn = new WeakSet(), Qr = async function(t, i) {
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
    const b = ((g = x.getSnapshot) == null ? void 0 : g.call(x, t, { token: o })) ?? null;
    if (b != null && b.hasCombatant) {
      const S = await x.spendResource(t, {
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
}, D(Ut, "LAYOUT_ID", "battlemech"), D(Ut, "PARTS", {
  sheet: {
    get template() {
      return `${J}/v2/actor/battlemech-sheet.hbs`;
    }
  }
}), D(Ut, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Yt(Ut, Ut, "DEFAULT_OPTIONS"), {
  classes: ["battlemech-sheet", w, "actor-sheet-v2", "mwd-battlemech-sheet", "mwd-sheet"],
  position: { width: 980, height: 940 },
  actions: {
    ...Yt(Ut, Ut, "DEFAULT_OPTIONS").actions,
    mechAttack: Ut.prototype._onMechAttack,
    mechRoll: Ut.prototype._onMechRoll
  }
}, { inplace: !1 }));
let Yr = Ut;
function zS() {
  console.log(`${ve}Registering Actor sheets (V2)`);
  const { Actors: a } = foundry.documents.collections;
  a.registerSheet(w, Kr, {
    types: ["character"],
    makeDefault: !0,
    label: "Character (V2)"
  }), a.registerSheet(w, nm, {
    types: ["npc"],
    makeDefault: !0,
    label: "NPC (V2)"
  }), a.registerSheet(w, rs, {
    types: ["vehicle"],
    makeDefault: !0,
    label: "Vehicle (V2)"
  }), a.registerSheet(w, Yr, {
    types: ["battlemech"],
    makeDefault: !0,
    label: "BattleMech (V2)"
  });
}
const { HandlebarsApplicationMixin: FS } = foundry.applications.api, { HTMLField: wc, StringField: US } = foundry.data.fields, or = /* @__PURE__ */ new Set(["system.notes", "system.description"]), HS = /* @__PURE__ */ new Set(["name"]), WS = Object.freeze({
  [A.itemType.personalWeapon]: `${J}/v2/item/personal-weapon-root.hbs`,
  [A.itemType.mechWeapon]: `${J}/v2/item/mech-weapon-root.hbs`,
  [A.itemType.armor]: `${J}/v2/item/armor-root.hbs`
});
function lr(a, e) {
  const t = new a({ required: !1, blank: !0, initial: "" });
  return t.name = e, t;
}
function jS(a = {}) {
  return {
    ...a,
    sourceReference: a.sourceReference ?? lr(US, "system.sourceReference"),
    notes: a.notes ?? lr(wc, "system.notes"),
    description: a.description ?? lr(wc, "system.description")
  };
}
function KS(a = {}) {
  return Object.fromEntries(
    Object.entries(a ?? {}).filter(([, e]) => e !== void 0)
  );
}
var ji, Ci, Ki, wa, ti, Ka, Jr;
const Ve = class Ve extends FS(foundry.applications.sheets.ItemSheetV2) {
  constructor() {
    super(...arguments);
    Me(this, ti);
    Me(this, ji, /* @__PURE__ */ new Map());
    Me(this, Ci, /* @__PURE__ */ new Map());
    Me(this, Ki, null);
    Me(this, wa, /* @__PURE__ */ new Map());
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
      classes: ["sheet", "item", w, "appv2", "mwd-sheet", "item-sheet"],
      position: {
        width: 760,
        height: 860
      },
      window: {
        resizable: !0
      },
      actions: {
        editImage: Ve._onEditImage,
        tab: Ve.prototype._onClickTab,
        accordion: Ve.prototype._onClickAccordion,
        checkbarElement: Ve._onClickCheckbar,
        modifierAdd: Ve._onModifierAdd,
        modifierDelete: Ve._onModifierDelete,
        modifierValueChange: Ve._onModifierValueChange,
        modifierConditionChange: Ve._onModifierConditionChange,
        modifierSelectionChange: Ve._onModifierSelectionChange,
        effectCreate: Ve._onEffectCreate,
        effectEdit: Ve._onEffectEdit,
        effectDelete: Ve._onEffectDelete,
        effectToggleDisabled: Ve._onEffectToggleDisabled
      },
      form: {
        submitOnChange: !1,
        closeOnSubmit: !1,
        handler: Ve.prototype._onSubmitForm
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
      return WS[n] ?? `${J}/v2/item/${n}.hbs`;
    }
    return ((i = super._getPartTemplate) == null ? void 0 : i.call(this, t)) ?? "";
  }
  /**
   * Override title to show localized item type and name.
   * @override
   */
  get title() {
    const t = this._getCanonicalItemType();
    return `${Ie.itemType.singular[t] ?? t}: ${this.item.name}`;
  }
  /**
   * Prepare context data for rendering.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The context object
   * @override
   */
  async _prepareContext(t) {
    var C, H, Y, Q, K, G, L, z, q;
    const i = await super._prepareContext(t), n = ((H = (C = game.system.mwd.modifiers) == null ? void 0 : C.getEnums) == null ? void 0 : H.call(C)) ?? {}, s = foundry.utils.deepClone((i == null ? void 0 : i.options) ?? {}), r = jS((i == null ? void 0 : i.fields) ?? ((Q = (Y = this.item.system) == null ? void 0 : Y.schema) == null ? void 0 : Q.fields) ?? {}), o = ((G = (K = this.item.actor) == null ? void 0 : K.getAttributes) == null ? void 0 : G.call(K, this.item)) ?? [], l = this._getCanonicalItemType(), c = !this.item.actor, u = !!this.item.actor, d = Ie.itemType.singular[l] ?? l, m = this._getEffectEntries(), f = m.filter((ee) => ee.syncedCount > 0).length, p = this.constructor.LAYOUT_ID, h = this.item.actor ? (ee) => o.includes(ee) : (ee) => !0, g = l === A.itemType.skill, b = ["mwd", "item-sheet", this.isEditable ? "editable" : "locked"], S = b.join(" ");
    s.classes = b, s.cssClass = S;
    const T = async (ee, { secrets: oe = this.item.isOwner } = {}) => foundry.applications.ux.TextEditor.implementation.enrichHTML(ee ?? "", {
      async: !0,
      secrets: oe,
      relativeTo: this.item
    }), E = foundry.utils.expandObject({
      "system.notes": await T(this.item.system.notes ?? ""),
      "system.description": await T(this.item.system.description ?? "")
    }), P = {
      ...i,
      item: this.item,
      data: this.item,
      system: this.item.system,
      // AppV2 prose editors need both raw field definitions and pre-enriched
      // HTML. Keeping both here avoids template-specific enrichment branches.
      fields: r,
      enriched: E,
      enrichedDescription: ((L = E == null ? void 0 : E.system) == null ? void 0 : L.description) ?? "",
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
        ...Te.getEnums(h, g),
        ...n
      },
      MWD: Ie,
      itemSheet: {
        canonicalType: l,
        typeLabel: d,
        isArmorSheet: l === A.itemType.armor,
        isStandalone: c,
        canUseActorControls: u,
        supportsEffectSync: !!((q = (z = this.item).supportsEquippedEffectSync) != null && q.call(z)),
        effectEntries: m,
        effectCount: m.length,
        syncedEffectCount: f,
        summaryChips: this._getSummaryChips(),
        stateChips: this._getStateChips(m)
      },
      cssClass: S,
      tabs: this._getTabs()
    };
    return p && (P.layout = await Zi.get(p)), P;
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
      const d = (l = (o = (r = u.flags) == null ? void 0 : r[w]) == null ? void 0 : o.equippedItemSync) == null ? void 0 : l.sourceEffectId;
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
    o && (F(this, ji).set(r, o), M(this, ti, Ka).call(this, this._getRootElement(), r, o));
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const n = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!n) return;
    const s = n.dataset.section, r = n.closest(".csb-accordion");
    if (!r || !s) return;
    const o = r.dataset.group || "default", c = (F(this, Ci).has(o) ? F(this, Ci).get(o) : r.dataset.default || null) === s ? null : s;
    F(this, Ci).set(o, c), M(this, ti, Jr).call(this, r, c);
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
          b && (F(this, ji).set(d, b), M(this, ti, Ka).call(this, n, d, b));
        });
      const f = F(this, ji).get(d), p = u.dataset.default || ((l = m[0]) == null ? void 0 : l.dataset.tab), h = f || p;
      h && M(this, ti, Ka).call(this, n, d, h);
    }
    for (const u of n.querySelectorAll(".csb-tabs")) {
      const d = u.dataset.group || "default", m = Array.from(u.querySelectorAll(".csb-tab-link[data-tab]"));
      if (!m.length) continue;
      const f = F(this, ji).get(d), p = u.dataset.default || ((c = m[0]) == null ? void 0 : c.dataset.tab), h = f || p;
      h && M(this, ti, Ka).call(this, n, d, h);
    }
    for (const u of n.querySelectorAll(".csb-accordion")) {
      const d = u.dataset.group || "default", m = F(this, Ci).has(d) ? F(this, Ci).get(d) : u.dataset.default || null;
      M(this, ti, Jr).call(this, u, m);
    }
    for (const u of n.querySelectorAll("prose-mirror[name]")) {
      const d = u.getAttribute("name") ?? "";
      or.has(d) && u.addEventListener("change", (m) => {
        m.preventDefault(), m.stopPropagation(), this._updateRichTextField(u);
      });
    }
    if (this.isEditable)
      for (const u of n.querySelectorAll("input[name], select[name], textarea[name]")) {
        if (u.closest("prose-mirror") || u.hasAttribute("data-action") || !(u instanceof HTMLElement)) continue;
        const d = String(u.getAttribute("name") ?? "").trim();
        u instanceof HTMLInputElement && !HS.has(d) && !["checkbox", "radio"].includes(u.type) ? u.addEventListener("input", (m) => {
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
    if (!this.isEditable || !or.has(i)) return;
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
    const n = String(((o = t == null ? void 0 : t.getAttribute) == null ? void 0 : o.call(t, "name")) ?? "").trim() || foundry.utils.randomID(), s = F(this, wa).get(n);
    s && clearTimeout(s);
    const r = setTimeout(() => {
      F(this, wa).delete(n), this._syncNamedField(t, i);
    }, 180);
    F(this, wa).set(n, r);
  }
  _getNamedFieldUpdate(t) {
    var s, r;
    if (!(t instanceof HTMLElement)) return null;
    const i = String(((s = t.getAttribute) == null ? void 0 : s.call(t, "name")) ?? "").trim();
    if (!i || or.has(i)) return null;
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
    const n = this._getNamedFieldUpdate(t), s = KS({
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
      Oe(this, Ki, null);
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
    Oe(this, Ki, i.length ? i : null);
  }
  _restoreScrollPositions() {
    const t = F(this, Ki);
    if (!(t != null && t.length)) return;
    const i = () => {
      const n = this._getRootElement();
      if (n)
        for (const s of t) {
          const r = n.querySelectorAll(s.selector).item(s.index);
          r instanceof HTMLElement && (r.scrollTop = s.top, r.scrollLeft = s.left);
        }
    };
    i(), requestAnimationFrame(i), Oe(this, Ki, null);
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
ji = new WeakMap(), Ci = new WeakMap(), Ki = new WeakMap(), wa = new WeakMap(), ti = new WeakSet(), Ka = function(t, i, n) {
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
}, Jr = function(t, i) {
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
}, D(Ve, "LAYOUT_ID", null), /** @override */
D(Ve, "PARTS", {
  sheet: {
    template: "",
    // Set dynamically in _getPartTemplate
    scrollable: [".sheet-body"]
  }
}), D(Ve, "TABS", {
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
let ni = Ve;
class Xr extends ni {
}
D(Xr, "LAYOUT_ID", "contact"), D(Xr, "PARTS", {
  sheet: {
    template: `${J}/v2/item/contact.hbs`,
    scrollable: [".sheet-body"]
  }
});
const GS = Object.freeze([
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
]), qS = Object.freeze([
  { value: "ammo", label: "Ammunition" },
  { value: "explosive", label: "Explosive" },
  { value: "medical", label: "Medical" },
  { value: "repair", label: "Repair" },
  { value: "fuel", label: "Fuel / Power Cell" },
  { value: "utility", label: "Utility" }
]);
function VS(a) {
  return a === "consumable" ? qS : GS;
}
class Zr extends ni {
  async _prepareContext(e) {
    var r;
    const t = await super._prepareContext(e), i = this._getCanonicalItemType(), n = this.item.system ?? {}, s = VS(i);
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
    }, t.layout = await Zi.get(i === "consumable" ? "consumable" : "gear"), t;
  }
}
// One sheet class intentionally backs both gear and consumables so quantity,
// rating, and reference editing never drift into parallel implementations.
D(Zr, "LAYOUT_ID", null), D(Zr, "PARTS", {
  sheet: {
    template: `${J}/v2/item/gear.hbs`,
    scrollable: [".sheet-body"]
  }
});
class eo extends ni {
  async _prepareContext(e) {
    var r, o;
    const t = await super._prepareContext(e), i = Kt(this.item.system ?? {}), n = xu(), s = Array.isArray((r = t.ENUMS) == null ? void 0 : r.skills) ? t.ENUMS.skills.map((l) => ({
      value: String((l == null ? void 0 : l.value) ?? "").trim(),
      label: String((l == null ? void 0 : l.label) ?? (l == null ? void 0 : l.value) ?? "").trim()
    })).filter((l) => l.value) : [];
    return t.system = {
      ...i,
      effects: (Array.isArray(i.effects) ? i.effects : []).map((l) => ({
        ...l,
        showSkillPicker: Lu(l) || Array.isArray(l.skillKeys) && l.skillKeys.length > 0,
        isEdgeEvent: l.type === "edgeEvent"
      }))
    }, t.traitEditor = {
      ...n,
      skills: s
    }, t.itemSheet = {
      ...t.itemSheet ?? {},
      sheetClass: "mwd-item-sheet--quality",
      summaryChips: [
        { label: "Category", value: Nn(i.category) },
        { label: "Tier", value: Rn(i.tier) },
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
D(eo, "LAYOUT_ID", "quality"), D(eo, "PARTS", {
  sheet: {
    template: `${J}/v2/item/quality.hbs`,
    scrollable: [".sheet-body"]
  }
});
class to extends ni {
}
D(to, "LAYOUT_ID", "asset-module"), D(to, "PARTS", {
  sheet: {
    template: `${J}/v2/item/assetModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class io extends ni {
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
    const e = Za(this.item.system ?? {}), t = Ri(e.catalogId), n = Is(t, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }).map((r) => r.choice).filter(Boolean).map((r) => Xa(r, { includeBonusText: !0 })).join(", "), s = this.item.actor ? Di(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return [
      { label: "Slot", value: Ea(e.moduleType) },
      { label: "Module", value: (t == null ? void 0 : t.label) ?? "Unlinked" },
      { label: "Bonuses", value: n || "Pending choice" },
      s ? { label: "Status", value: s.isActive ? "Active" : "Inactive" } : null
    ].filter(Boolean);
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), i = Za(this.item.system ?? {}), n = i.moduleType, s = Ri(i.catalogId), r = n ? zo(n) : [], o = sd(s, i.selectedGrants, { legacySelectedSkill: i.selectedSkill }), l = this.item.actor ? Di(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return t.lifeModuleEditor = {
      moduleType: n,
      moduleTypeLabel: Ea(n),
      moduleTypes: ed().map((c) => ({
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
        return ((u = Ri(c)) == null ? void 0 : u.label) ?? c;
      }),
      excludesAnyLabels: ((s == null ? void 0 : s.excludesAny) ?? []).map((c) => {
        var u;
        return ((u = Ri(c)) == null ? void 0 : u.label) ?? c;
      }),
      actorState: l,
      warningLabels: [...(l == null ? void 0 : l.warningLabels) ?? []],
      isOwned: !!this.item.actor,
      statusLabel: l ? l.isActive ? "Active" : "Inactive" : s ? "Configured" : "Unlinked",
      statusReason: (l == null ? void 0 : l.inactiveReason) ?? ""
    }, t;
  }
}
D(io, "LAYOUT_ID", "life-module"), D(io, "PARTS", {
  sheet: {
    template: `${J}/v2/item/lifeModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class ao extends ni {
}
D(ao, "LAYOUT_ID", "skill"), D(ao, "PARTS", {
  sheet: {
    template: `${J}/v2/item/skill.hbs`,
    scrollable: [".sheet-body"]
  }
});
const YS = Object.freeze([
  "firearms",
  "projectileWeapons",
  "heavyWeapons",
  "meleeCombat"
]), QS = Object.freeze([
  { value: "energy", label: "Energy" },
  { value: "kinetic", label: "Kinetic" },
  { value: "ballistic", label: "Ballistic" },
  { value: "explosive", label: "Explosive" },
  { value: "plasma", label: "Plasma" },
  { value: "electrical", label: "Electrical" },
  { value: "melee", label: "Melee" },
  { value: "none", label: "None" }
]), Tc = Object.freeze([
  { value: "quantity", label: "Quantity" },
  { value: "durability.current", label: "Durability" },
  { value: "", label: "Custom Path" }
]), JS = "consumable";
function XS(a) {
  return String((a == null ? void 0 : a.canonicalType) ?? (a == null ? void 0 : a.type) ?? "item").trim().replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (t) => t.toUpperCase());
}
function om(a) {
  return String((a == null ? void 0 : a.canonicalType) ?? (a == null ? void 0 : a.type) ?? "").trim() === JS;
}
function ZS(a, e = "") {
  var i;
  const t = String(e ?? "").trim();
  return Array.from(((i = a == null ? void 0 : a.actor) == null ? void 0 : i.items) ?? []).filter((n) => {
    const s = String((n == null ? void 0 : n.id) ?? "").trim();
    return !s || s === (a == null ? void 0 : a.id) ? !1 : s === t || om(n);
  }).sort((n, s) => String((n == null ? void 0 : n.name) ?? "").localeCompare(String((s == null ? void 0 : s.name) ?? ""))).map((n) => ({
    value: n.id,
    label: `${n.name || "Unnamed Item"} (${XS(n)})`
  }));
}
function no(a, e, t) {
  const i = String(e ?? "").trim();
  return !i || a.some((n) => n.value === i) ? a : a.concat({ value: i, label: t(i) });
}
function eA(a, e) {
  var d, m, f, p, h, g, y;
  const t = Zt(e), i = ZS(a, (d = t.link) == null ? void 0 : d.itemId), n = wf({
    source: t,
    actor: (a == null ? void 0 : a.actor) ?? null
  }), s = ((h = (f = (m = a == null ? void 0 : a.actor) == null ? void 0 : m.items) == null ? void 0 : f.get) == null ? void 0 : h.call(f, ((p = t.link) == null ? void 0 : p.itemId) ?? "")) ?? null, r = no(
    [...Tc],
    (g = t.link) == null ? void 0 : g.itemPath,
    (b) => `Custom (${b})`
  ), o = new Set(Tc.map((b) => String(b.value ?? "").trim())), l = String(((y = t.link) == null ? void 0 : y.itemPath) ?? "").trim(), c = !!(a != null && a.actor);
  let u = "";
  return t.kind === "itemRef" && (c ? i.length ? s ? om(s) ? l ? u = n.isTracked ? `Linked to ${s.name} | Available ${Number(n.current ?? 0)}` : `Linked to ${s.name} | Path not resolving to a tracked value yet.` : u = `Linked to ${s.name}. Pick which field should be consumed.` : u = `Linked to ${s.name} | Legacy non-consumable source. Repoint this to a Consumable item when convenient.` : u = "Pick an owned Consumable item to consume from." : u = "Add an owned Consumable item to the actor, then link this weapon to it." : u = "Embed this weapon in an actor to link it to owned inventory."), {
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
class $s extends ni {
  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        weaponSkillChange: $s._onWeaponSkillChange
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
      defenses: De.getDefenses()
    };
    const n = Array.isArray((l = t.ENUMS) == null ? void 0 : l.skills) ? t.ENUMS.skills : [], s = (c = this.item.system) == null ? void 0 : c.skill, r = (u = this.item.system) == null ? void 0 : u.damageType, o = i === "personalWeapon" ? no(
      n.filter((h) => YS.includes(h.value)),
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
      damageTypes: no(
        i === "personalWeapon" ? [...Yn] : [...QS],
        r,
        (h) => i === "personalWeapon" ? Vt(h) : h
      ),
      ranges: It.RANGE_ORDER.map((h) => ({
        value: h,
        label: i === "personalWeapon" ? is(h) : h.charAt(0).toUpperCase() + h.slice(1)
      })),
      rangeBandLabels: Object.fromEntries(It.RANGE_ORDER.map((h) => [
        h,
        i === "personalWeapon" ? is(h) : h.charAt(0).toUpperCase() + h.slice(1)
      ])),
      weaponCapabilityOptions: Nm,
      payloadCapabilityOptions: Rm,
      ammoDamageTypes: [{ value: "", label: "Use Weapon Default" }, ...Yn],
      payloadTemplateShapes: xc,
      payloadTemplatePlacements: $c,
      areaEffectKinds: [
        { value: Tt.discrete, label: "Discrete" },
        { value: Tt.persistent, label: "Persistent Hazard" }
      ],
      exposureTiers: [
        { value: ae.minor, label: "Minor" },
        { value: ae.major, label: "Major" },
        { value: ae.full, label: "Full" }
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
      consumptionSources: Array.isArray((f = this.item.system) == null ? void 0 : f.consumptionSources) ? this.item.system.consumptionSources.map((h) => eA(this.item, h)) : []
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
const ya = class ya extends $s {
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
        attackWeapon: ya._onAttackWeapon,
        reloadWeaponPayload: ya._onReloadWeaponPayload
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
      { label: "Type", value: Vt(e.damageType) || "Penetrating" },
      { label: "Range", value: String(((r = e.range) == null ? void 0 : r.max) ?? "near").trim() || "Near" }
    ];
    return String(e.category ?? "").trim().toLowerCase() !== "melee" && n.push((o = e == null ? void 0 : e.sourceState) != null && o.isTracked ? { label: "Payload", value: `${(e == null ? void 0 : e.payloadLabel) || "Unloaded"} (${Number(e.sourceState.current ?? 0)}/${Number(e.sourceState.max ?? 0)})` } : { label: "Payload", value: (e == null ? void 0 : e.payloadLabel) || "Unloaded" }), n;
  }
  static async _onAttackWeapon(e) {
    var i, n, s, r;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), !(!(this.item.actor ?? null) || !((r = (s = this.item).isPersonalWeapon) != null && r.call(s))) && await xs({ weapon: this.item, event: e });
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
D(ya, "LAYOUT_ID", "personal-weapon"), D(ya, "PARTS", {
  sheet: {
    template: `${J}/v2/item/personal-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
let so = ya;
class ro extends $s {
}
D(ro, "LAYOUT_ID", "mech-weapon"), D(ro, "PARTS", {
  sheet: {
    template: `${J}/v2/item/mech-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
const tA = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
};
function vc(a) {
  const e = Number(a ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function iA({ defenseBonus: a = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(a ?? 0) || 0;
  i !== 0 && t.push(`Defense ${vc(i)}`);
  const n = ai(e);
  for (const [s, r] of Object.entries(tA)) {
    const o = Number((n == null ? void 0 : n[s]) ?? 0) || 0;
    o !== 0 && t.push(`${r} ${vc(o)}`);
  }
  return t.join(" | ");
}
class oo extends ni {
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
    var l, c, u, d, m, f, p, h, g, y, b, S, T, E, P, C;
    const t = await super._prepareContext(e), i = this.item, n = i.actor ?? null, s = ((l = n == null ? void 0 : n.getPersonalCombatLoadout) == null ? void 0 : l.call(n)) ?? null, r = ((c = s == null ? void 0 : s.activeArmor) == null ? void 0 : c.id) ?? null, o = ((u = s == null ? void 0 : s.activeArmor) == null ? void 0 : u.id) === i.id ? s.activeArmor : (d = i.getArmorProfile) == null ? void 0 : d.call(i, { actor: n });
    return t.armorState = o, t.isActiveArmor = r === i.id, t.effectiveDurabilityCurrent = Number(
      ((m = o == null ? void 0 : o.durability) == null ? void 0 : m.current) ?? ((p = (f = i.system) == null ? void 0 : f.durability) == null ? void 0 : p.current) ?? ((g = (h = i.system) == null ? void 0 : h.durability) == null ? void 0 : g.max) ?? ((y = i.system) == null ? void 0 : y.rating) ?? 0
    ), t.effectiveArmorRating = Number(
      (o == null ? void 0 : o.currentArmorRating) ?? (o == null ? void 0 : o.ratingCurrent) ?? Math.min(
        Number(((b = i.system) == null ? void 0 : b.rating) ?? 0),
        Number(((T = (S = i.system) == null ? void 0 : S.durability) == null ? void 0 : T.current) ?? ((P = (E = i.system) == null ? void 0 : E.durability) == null ? void 0 : P.max) ?? ((C = i.system) == null ? void 0 : C.rating) ?? 0)
      )
    ), t.effectiveArmorResist = Number(
      (o == null ? void 0 : o.baseMitigation) ?? (o == null ? void 0 : o.baseResistance) ?? 0
    ), t.armorModifierSummary = this._getArmorModifierSummary(o), t.itemSheet = { ...t.itemSheet ?? {} }, t.itemSheet.summaryChips = this._getSummaryChips(o), t.armorEditor = {
      standardTraits: [...lf]
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
    return iA({
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
D(oo, "LAYOUT_ID", "armor"), D(oo, "PARTS", {
  sheet: {
    template: `${J}/v2/item/armor-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
function aA() {
  console.log(`${ve}Registering Item sheets (V2)`);
  const { Items: a } = foundry.documents.collections;
  a.registerSheet(w, Xr, { types: ["contact"], makeDefault: !0, label: "Contact (V2)" }), a.registerSheet(w, Zr, { types: ["gear", "consumable"], makeDefault: !0, label: "Gear / Consumable (V2)" }), a.registerSheet(w, eo, { types: ["quality"], makeDefault: !0, label: "Quality (V2)" }), a.registerSheet(w, to, { types: ["assetModule"], makeDefault: !0, label: "Asset Module (V2)" }), a.registerSheet(w, io, { types: ["lifeModule"], makeDefault: !0, label: "Life Module (V2)" }), a.registerSheet(w, ao, { types: ["skill"], makeDefault: !0, label: "Skill (V2)" }), a.registerSheet(w, so, { types: ["personalWeapon", "weapon"], makeDefault: !0, label: "Personal Weapon (V2)" }), a.registerSheet(w, ro, { types: ["mechWeapon"], makeDefault: !0, label: "Mech Weapon (V2)" }), a.registerSheet(w, oo, { types: ["armor"], makeDefault: !0, label: "Armor (V2)" });
}
const kc = [
  // UI (CSB render entry point + node types)
  `systems/${w}/templates/v2/ui/layout-root.hbs`,
  `systems/${w}/templates/v2/ui/nodes/hexabox.hbs`,
  `systems/${w}/templates/v2/ui/nodes/stack.hbs`,
  `systems/${w}/templates/v2/ui/nodes/panel.hbs`,
  `systems/${w}/templates/v2/ui/nodes/include.hbs`,
  `systems/${w}/templates/v2/ui/nodes/tabs.hbs`,
  `systems/${w}/templates/v2/ui/nodes/accordion.hbs`,
  `systems/${w}/templates/v2/ui/nodes/unknown.hbs`,
  `systems/${w}/templates/common/view-mode.hbs`,
  `systems/${w}/templates/common/label.hbs`,
  `systems/${w}/templates/common/enum-value-label.hbs`,
  `systems/${w}/templates/common/damage-code.hbs`,
  `systems/${w}/templates/common/damage-armor.hbs`,
  `systems/${w}/templates/v2/ui/mod-stepper.hbs`,
  `systems/${w}/templates/v2/ui/condition-monitors.hbs`,
  `systems/${w}/templates/v2/roll/_mwd-roll-card.hbs`,
  `systems/${w}/templates/v2/roll/_mwd-damage-application-card.hbs`,
  `systems/${w}/templates/v2/roll/_mwd-hazard-card.hbs`,
  `systems/${w}/templates/v2/components/checkbox.hbs`,
  `systems/${w}/templates/v2/components/radio.hbs`,
  // Character UI
  `systems/${w}/templates/v2/ui/character/attributes.hbs`,
  `systems/${w}/templates/v2/ui/character/combat-actions.hbs`,
  `systems/${w}/templates/v2/ui/character/skills-column.hbs`,
  `systems/${w}/templates/v2/ui/character/skill-row.hbs`,
  `systems/${w}/templates/v2/ui/character/edge-console.hbs`,
  `systems/${w}/templates/v2/ui/character/burn-monitor.hbs`,
  `systems/${w}/templates/v2/ui/character/status-dashboard.hbs`,
  `systems/${w}/templates/v2/ui/character/inventory-section.hbs`,
  `systems/${w}/templates/v2/ui/character/inventory-record.hbs`,
  `systems/${w}/templates/v2/ui/character/bio-identity.hbs`,
  `systems/${w}/templates/v2/ui/character/bio-history.hbs`,
  `systems/${w}/templates/v2/ui/vehicle/summary-bar.hbs`,
  `systems/${w}/templates/v2/ui/vehicle/attributes-grid.hbs`,
  `systems/${w}/templates/v2/ui/vehicle/active-crits.hbs`,
  `systems/${w}/templates/v2/ui/vehicle/record-section.hbs`,
  `systems/${w}/templates/v2/ui/battlemech/chassis-fields.hbs`,
  `systems/${w}/templates/v2/ui/battlemech/heat-track.hbs`,
  `systems/${w}/templates/v2/ui/battlemech/quick-actions.hbs`,
  `systems/${w}/templates/v2/ui/battlemech/weapon-groups.hbs`,
  `systems/${w}/templates/v2/ui/battlemech/hardpoints.hbs`,
  // Sheet wrapper
  `systems/${w}/templates/v2/actor/_sheet-root.hbs`,
  `systems/${w}/templates/v2/actor/npc-sheet.hbs`,
  `systems/${w}/templates/v2/actor/vehicle-sheet.hbs`,
  `systems/${w}/templates/v2/actor/battlemech-sheet.hbs`,
  // Placeholders
  `systems/${w}/templates/v2/ui/placeholders/assigned-systems.hbs`,
  `systems/${w}/templates/v2/ui/placeholders/inventory-gear.hbs`,
  `systems/${w}/templates/v2/ui/placeholders/inventory-consumables.hbs`,
  `systems/${w}/templates/v2/ui/placeholders/inventory-armor.hbs`,
  `systems/${w}/templates/v2/ui/placeholders/inventory-weapons.hbs`,
  `systems/${w}/templates/v2/ui/placeholders/bio-description.hbs`,
  `systems/${w}/templates/v2/ui/placeholders/bio-traits.hbs`,
  `systems/${w}/templates/v2/ui/placeholders/bio-life-modules.hbs`,
  `systems/${w}/templates/v2/ui/actor/field-grid.hbs`,
  `systems/${w}/templates/v2/ui/actor/owned-item-list.hbs`,
  `systems/${w}/templates/v2/ui/actor/action-buttons.hbs`,
  `systems/${w}/templates/v2/ui/actor/notes-editor.hbs`,
  `systems/${w}/templates/v2/ui/actor/hardpoint-list.hbs`,
  `systems/${w}/templates/v2/ui/actor/weapon-group-list.hbs`,
  // V2 item partials
  `systems/${w}/templates/v2/item/_item-sheet-root.hbs`,
  `systems/${w}/templates/v2/item/contact.hbs`,
  `systems/${w}/templates/v2/item/gear.hbs`,
  `systems/${w}/templates/v2/item/consumable.hbs`,
  `systems/${w}/templates/v2/item/assetModule.hbs`,
  `systems/${w}/templates/v2/item/skill.hbs`,
  `systems/${w}/templates/v2/item/lifeModule.hbs`,
  `systems/${w}/templates/v2/item/quality.hbs`,
  `systems/${w}/templates/v2/item/personal-weapon-root.hbs`,
  `systems/${w}/templates/v2/item/mech-weapon-root.hbs`,
  `systems/${w}/templates/v2/item/armor-root.hbs`,
  `systems/${w}/templates/v2/item/parts/itemname.hbs`,
  `systems/${w}/templates/v2/item/parts/inactive.hbs`,
  `systems/${w}/templates/v2/item/parts/references.hbs`,
  `systems/${w}/templates/v2/item/parts/gear-main.hbs`,
  `systems/${w}/templates/v2/item/parts/consumable-main.hbs`,
  `systems/${w}/templates/v2/item/parts/skill-main.hbs`,
  `systems/${w}/templates/v2/item/parts/life-module-main.hbs`,
  `systems/${w}/templates/v2/item/parts/quality-main.hbs`,
  `systems/${w}/templates/v2/item/parts/quality-limits.hbs`,
  `systems/${w}/templates/v2/item/parts/quality-prerequisites.hbs`,
  `systems/${w}/templates/v2/item/parts/quality-effects.hbs`,
  `systems/${w}/templates/v2/item/parts/modifier.hbs`,
  `systems/${w}/templates/v2/item/parts/modifiers.hbs`,
  `systems/${w}/templates/v2/item/parts/weapon-main.hbs`,
  `systems/${w}/templates/v2/item/parts/weapon-compact-main.hbs`,
  `systems/${w}/templates/v2/item/parts/weapon-summary-hero.hbs`,
  `systems/${w}/templates/v2/item/parts/weapon-combat-essentials.hbs`,
  `systems/${w}/templates/v2/item/parts/weapon-usage-bands.hbs`,
  `systems/${w}/templates/v2/item/parts/weapon-ammo-profiles.hbs`,
  `systems/${w}/templates/v2/item/parts/weapon-consumption-sources.hbs`,
  `systems/${w}/templates/v2/item/parts/weapon-notes-reference.hbs`,
  `systems/${w}/templates/v2/item/parts/armor-main.hbs`,
  `systems/${w}/templates/v2/item/parts/armor-summary-hero.hbs`,
  `systems/${w}/templates/v2/item/parts/armor-combat-essentials.hbs`,
  `systems/${w}/templates/v2/item/parts/armor-usage-protection.hbs`,
  `systems/${w}/templates/v2/item/parts/armor-resistance-modifiers.hbs`,
  `systems/${w}/templates/v2/item/parts/armor-identity-fields.hbs`,
  `systems/${w}/templates/v2/item/parts/armor-standard-traits.hbs`,
  `systems/${w}/templates/v2/item/parts/armor-notes-reference.hbs`,
  `systems/${w}/templates/v2/item/parts/item-effects.hbs`,
  // Actors
  `systems/${w}/templates/v2/actor/character-sheet.hbs`,
  `systems/${w}/templates/v2/actor/vehicle-sheet.hbs`,
  `systems/${w}/templates/v2/actor/battlemech-sheet.hbs`
];
function nA(a) {
  const e = String(a).replaceAll("\\", "/"), t = `systems/${w}/templates/`, i = e.indexOf(t);
  return `mwd.${(i >= 0 ? e.slice(i + t.length) : e).replace(/\.hbs$/i, "").split("/").filter(Boolean).map((o) => o.replace(/^_+/, "")).join(".")}`;
}
function sA() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
async function rA() {
  var e, t;
  const a = sA();
  try {
    const i = {};
    for (const s of kc)
      i[nA(s)] = s, i[s] = s;
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
    console.log(`${ve}preloadTemplatesV2 OK`, { loaded: kc.length });
  } catch (i) {
    throw console.error(`${ve}preloadTemplatesV2 FAILED`, i), i;
  }
}
function oA(a = {}) {
  return Object.entries(ai(a)).filter(([, e]) => Number(e) > 0).map(([e, t]) => `${e} +${t}`).join(", ");
}
class lA extends Actor {
  /** @override */
  async _preCreate(e, t, i) {
    super._preCreate && await super._preCreate(e, t, i);
    const n = await ld("Actor", (e == null ? void 0 : e.type) ?? this.type), s = {};
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
      if (Wf(i), i.speed = Math.max(0, Math.trunc(Number(i.speed ?? 12) || 12)), (e = i.skills) != null && e.skills && typeof i.skills.skills == "object") {
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
    const e = this.getEdgeCap(), t = this.type === "character" ? Di(this).bonusByEdgePool ?? {} : {};
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
    r.length === 1 ? (c = r[0], l = c) : r.length > 1 ? (e.push("Multiple equipped primary weapons found; attack selection requires a chooser."), u = !0) : n.length === 1 ? l = n[0] : n.length > 1 ? u = !0 : l = It.buildDefaultUnarmedProfile(this);
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
    ), n = Math.max(0, Number((e == null ? void 0 : e.rating) ?? 0)), s = Math.min(n, i), r = ai(e == null ? void 0 : e.mitigationByType), o = So(s);
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
    const n = this.getEdgePoolRaw(e), s = Math.max(0, Number((n == null ? void 0 : n.rating) ?? 0)), r = Math.max(0, Number((n == null ? void 0 : n.value) ?? 0)), o = Math.max(0, Number(((p = Di(this).bonusByEdgePool) == null ? void 0 : p[e]) ?? 0)), l = s + o, c = Math.min(l, t), u = Math.min(r, c);
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
    const i = this.getEdgeCap(), n = Math.max(0, Number(t ?? 0)), s = Math.max(0, Number(((c = Di(this).bonusByEdgePool) == null ? void 0 : c[e]) ?? 0)), r = Math.min(n + s, i), o = Math.max(0, Number(((u = this.getEdgePoolRaw(e)) == null ? void 0 : u.value) ?? 0)), l = Math.min(o, r);
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
      }, c = Rt({
        actor: this,
        phase: "onEdgeSpend",
        facts: Cr({ actor: this, packet: l, phase: "onEdgeSpend", runtime: o }),
        packet: l,
        options: { runtime: o, consumeUsage: !0 }
      });
      await fi({ actor: this, mutations: c.mutations, runtime: o }), s = Math.max(0, Number(c.packet.amount ?? n) || 0);
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
      }, l = Rt({
        actor: this,
        phase: "onEdgeGain",
        facts: Cr({ actor: this, packet: o, phase: "onEdgeGain", runtime: r }),
        packet: o,
        options: { runtime: r, consumeUsage: !0 }
      });
      await fi({ actor: this, mutations: l.mutations, runtime: r }), s = Number(l.packet.amount ?? n) || 0;
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
      const T = Math.max(0, Number(((f = S.system) == null ? void 0 : f.rating) ?? 0) || 0), E = Math.max(0, Number(((h = (p = S.system) == null ? void 0 : p.durability) == null ? void 0 : h.max) ?? 0) || 0), P = E > 0 ? E : T, C = Math.min(Math.max(0, Number(t) || 0), P);
      return this.updateEmbeddedDocuments("Item", [{
        _id: S.id,
        "system.durability.max": P,
        "system.durability.current": C
      }]);
    }
    const n = `system.monitors.${e}`, s = Number(foundry.utils.getProperty(this, `${n}.max`)) || 0, r = Math.max(0, s), o = Math.min(Math.max(0, Number(t) || 0), r), l = { [`${n}.value`]: o }, c = this.type, u = (g = zs == null ? void 0 : zs[c]) == null ? void 0 : g[e];
    if (u != null && u.derived)
      for (const [y, b] of Object.entries(u.derived)) {
        const S = Zs == null ? void 0 : Zs[b.fn];
        if (typeof S != "function") continue;
        const T = Vg(this, e, b.source, o);
        l[`${n}.derived.${y}`] = S(T);
      }
    return this.update(l);
  }
  _prepareMonitors() {
    var o, l, c, u, d, m, f, p;
    const e = this.system.monitors ?? {}, t = qg(e);
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
    }, t.resistanceBonusByType = i != null && i.isDestroyed ? {} : (i == null ? void 0 : i.mitigationByType) ?? (i == null ? void 0 : i.typedMitigation) ?? {}, t.derived ?? (t.derived = {}), t.derived.resistance = Number((i == null ? void 0 : i.baseMitigation) ?? (i == null ? void 0 : i.baseResistance) ?? 0), t.effect = i != null && i.isDestroyed ? "Destroyed" : i ? oA(i.mitigationByType ?? i.typedMitigation) : "", (u = this.system).derived ?? (u.derived = {}), this.system.derived.personalCombat = {
      defaultWeaponId: ((d = e.defaultWeapon) == null ? void 0 : d.id) ?? null,
      activeArmorId: (i == null ? void 0 : i.id) ?? null,
      warnings: [...e.warnings ?? []]
    };
  }
}
async function cA({ actor: a, payload: e } = {}) {
  var g, y, b, S, T, E;
  if (!a) throw new Error("resolveSkill requires actor");
  const t = String((e == null ? void 0 : e.key) ?? "").trim(), i = Ot(t);
  if (!i) throw new Error(`Unknown skill: ${t}`);
  const n = a.system ?? {}, s = String((e == null ? void 0 : e.attrKey) ?? i.attribute ?? "").trim();
  if (!s) throw new Error(`Skill ${t} missing attribute key`);
  const r = Number(((y = (g = n == null ? void 0 : n.attributes) == null ? void 0 : g[s]) == null ? void 0 : y.value) ?? 0), o = Number(((S = (b = n == null ? void 0 : n.skills) == null ? void 0 : b[t]) == null ? void 0 : S.rating) ?? 0), l = Number(((E = (T = n == null ? void 0 : n.skills) == null ? void 0 : T[t]) == null ? void 0 : E.bonus) ?? 0), c = new Set(Ss(n, t)), u = vo(t, e == null ? void 0 : e.specializationKey), d = u && c.has(u.key) ? u : null, m = d ? Ao : 0, f = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : i.domains ?? [], p = Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : Number.isFinite(Number(e == null ? void 0 : e.target)) ? Number(e.target) : 5, h = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1;
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
const uA = /* @__PURE__ */ new Set([
  "grit",
  "chaos",
  "insight",
  "rumor",
  "legend",
  "credibility"
]), dA = {
  grit: "physical",
  chaos: "physical",
  insight: "mental",
  rumor: "mental",
  legend: "social",
  credibility: "social"
};
async function mA({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveEdge requires actor");
  const t = String((e == null ? void 0 : e.pool) ?? "").trim();
  if (!uA.has(t)) throw new Error(`Invalid edge pool: ${t}`);
  const i = a.getEdgePool(t), n = Math.max(0, Number((i == null ? void 0 : i.effectiveValue) ?? 0));
  return {
    intent: "edge",
    title: `Edge — ${t}`,
    subtitle: a.name ?? "Actor",
    domains: [dA[t] ?? "unknown"],
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
async function fA({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Attribute",
    intent: "attribute",
    domainTags: ["general"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function pA({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveCommon requires actor");
  const t = String((e == null ? void 0 : e.id) ?? "").trim();
  if (!t) throw new Error("Common rolls require payload.id");
  const i = Po(t);
  if (!i) throw new Error(`Unknown common check: ${t}`);
  const n = Array.isArray(i.formula) ? i.formula : [];
  if (n.length !== 2)
    throw new Error(`Common check ${t} must define exactly two attributes.`);
  const s = n.map((c) => {
    var d, m, f;
    const u = hp(c);
    if (!u) throw new Error(`Common check ${t} uses unsupported attribute code: ${c}`);
    return {
      code: String(c).trim().toUpperCase(),
      key: u,
      label: gp(c),
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
    formula: yp(n),
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
const hA = 90;
var Oc;
const gA = Number(((Oc = CONST == null ? void 0 : CONST.REGION_VISIBILITY) == null ? void 0 : Oc.ALWAYS) ?? 2) || 2;
function os() {
  var a, e;
  return Number(((a = canvas.grid) == null ? void 0 : a.size) ?? ((e = canvas.dimensions) == null ? void 0 : e.size) ?? 100) || 100;
}
function yA(a = {}) {
  return Math.max(0, Number((a == null ? void 0 : a.size) ?? 0) || 0);
}
function Oa(a) {
  var t, i, n, s;
  return ((i = (t = canvas.tokens) == null ? void 0 : t.controlled) == null ? void 0 : i.find((r) => {
    var o;
    return ((o = r.actor) == null ? void 0 : o.id) === (a == null ? void 0 : a.id);
  })) ?? null ?? ((s = (n = a == null ? void 0 : a.getActiveTokens) == null ? void 0 : n.call(a, !0, !0)) == null ? void 0 : s[0]) ?? null;
}
function Mc(a) {
  var e, t;
  return Number(
    ((e = a == null ? void 0 : a.document) == null ? void 0 : e.disposition) ?? (a == null ? void 0 : a.disposition) ?? ((t = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : t.NEUTRAL) ?? 0
  );
}
function ls(a) {
  var r, o, l, c, u;
  const e = (a == null ? void 0 : a.center) ?? ((r = a == null ? void 0 : a.object) == null ? void 0 : r.center);
  if (e) return { x: Number(e.x ?? 0), y: Number(e.y ?? 0) };
  const t = Number((a == null ? void 0 : a.x) ?? ((o = a == null ? void 0 : a.document) == null ? void 0 : o.x) ?? 0), i = Number((a == null ? void 0 : a.y) ?? ((l = a == null ? void 0 : a.document) == null ? void 0 : l.y) ?? 0), n = Number((a == null ? void 0 : a.w) ?? (a == null ? void 0 : a.width) ?? ((c = a == null ? void 0 : a.document) == null ? void 0 : c.width) ?? 1) * os(), s = Number((a == null ? void 0 : a.h) ?? (a == null ? void 0 : a.height) ?? ((u = a == null ? void 0 : a.document) == null ? void 0 : u.height) ?? 1) * os();
  return { x: t + n / 2, y: i + s / 2 };
}
function bA(a) {
  var i, n, s, r;
  const e = Number((a == null ? void 0 : a.w) ?? ((i = a == null ? void 0 : a.object) == null ? void 0 : i.w) ?? 0) || Number(((n = a == null ? void 0 : a.document) == null ? void 0 : n.width) ?? 1) * os(), t = Number((a == null ? void 0 : a.h) ?? ((s = a == null ? void 0 : a.object) == null ? void 0 : s.h) ?? 0) || Number(((r = a == null ? void 0 : a.document) == null ? void 0 : r.height) ?? 1) * os();
  return Math.max(e, t) / 2;
}
function SA() {
  var t;
  const a = ((t = canvas == null ? void 0 : canvas.stage) == null ? void 0 : t.pivot) ?? null, e = (canvas == null ? void 0 : canvas.dimensions) ?? {};
  return {
    x: Number((a == null ? void 0 : a.x) ?? e.width / 2 ?? 0) || 0,
    y: Number((a == null ? void 0 : a.y) ?? e.height / 2 ?? 0) || 0
  };
}
function AA() {
  var a;
  return Array.from(((a = game.user) == null ? void 0 : a.targets) ?? []).find((e) => e == null ? void 0 : e.actor) ?? null;
}
function wA(a, e) {
  return {
    x: (Number((a == null ? void 0 : a.x) ?? 0) + Number((e == null ? void 0 : e.x) ?? 0)) / 2,
    y: (Number((a == null ? void 0 : a.y) ?? 0) + Number((e == null ? void 0 : e.y) ?? 0)) / 2
  };
}
function TA({ template: a = {}, actor: e = null } = {}) {
  const t = String((a == null ? void 0 : a.placement) ?? "").trim().toLowerCase(), i = Oa(e), n = AA(), s = i ? ls(i) : null, r = n ? ls(n) : null;
  return t === "origin" && s ? s : t === "targeted" && r ? r : t === "placed" && s && r ? wA(s, r) : SA();
}
function vA({ attack: a = {}, actor: e = null } = {}) {
  const t = (a == null ? void 0 : a.template) ?? null, i = String((t == null ? void 0 : t.shape) ?? "").trim().toLowerCase();
  if (!i) return null;
  const n = TA({ template: t, actor: e });
  return Le({
    shape: i,
    x: n.x,
    y: n.y,
    direction: 0,
    distance: yA(t),
    angle: i === "cone" ? hA : null,
    width: i === "line" ? 1 : null,
    placementMode: (t == null ? void 0 : t.placement) ?? null
  });
}
function kA() {
  var e, t;
  const a = new PIXI.Container();
  return a.eventMode = "none", a.sortableChildren = !0, (t = (e = canvas.stage) == null ? void 0 : e.addChild) == null || t.call(e, a), a;
}
function MA(a) {
  var e;
  a != null && a.parent && a.parent.removeChild(a), (e = a == null ? void 0 : a.destroy) == null || e.call(a, { children: !0 });
}
function EA() {
  const a = kA(), e = new PIXI.Container();
  e.eventMode = "none", e.zIndex = 5;
  const t = new PIXI.Container();
  return t.eventMode = "none", t.zIndex = 10, a.addChild(e), a.addChild(t), { root: a, templateLayer: e, markerLayer: t };
}
function CA(a) {
  MA((a == null ? void 0 : a.root) ?? a);
}
function PA() {
  var t;
  const a = String(((t = game.user) == null ? void 0 : t.color) ?? "#ff6400").replace("#", "").trim(), e = Number.parseInt(a, 16);
  return Number.isFinite(e) ? e : 16737280;
}
function lm(a) {
  var e;
  (e = a == null ? void 0 : a.removeChildren) == null || e.call(a).forEach((t) => {
    var i;
    return (i = t.destroy) == null ? void 0 : i.call(t, { children: !0 });
  });
}
function lo(a) {
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
function NA(a, e) {
  const t = Number((e == null ? void 0 : e.x) ?? 0) - Number((a == null ? void 0 : a.x) ?? 0), i = Number((e == null ? void 0 : e.y) ?? 0) - Number((a == null ? void 0 : a.y) ?? 0);
  return t === 0 && i === 0 ? 0 : Math.atan2(i, t) * 180 / Math.PI;
}
function cr(a = 0) {
  var i, n, s, r, o;
  const e = Number(((i = canvas.grid) == null ? void 0 : i.size) ?? ((n = canvas.dimensions) == null ? void 0 : n.size) ?? 100) || 100, t = Number(((r = (s = canvas.scene) == null ? void 0 : s.grid) == null ? void 0 : r.distance) ?? ((o = canvas.dimensions) == null ? void 0 : o.distance) ?? 1) || 1;
  return Number(a ?? 0) * (e / t);
}
function RA({ geometry: a = null, pointer: e = null, attack: t = {}, actor: i = null } = {}) {
  var l;
  const n = Le(a);
  if (!n) return null;
  const s = ii(n) ?? null;
  if (!s || !e) return s;
  const o = String(((l = t == null ? void 0 : t.template) == null ? void 0 : l.placement) ?? s.placementMode ?? "").trim().toLowerCase() !== "origin";
  if (o && (s.x = e.x, s.y = e.y), ["line", "cone", "rect"].includes(String(s.shape ?? "").trim().toLowerCase())) {
    const c = Oa(i), u = c ? ls(c) : null, d = o ? u ?? { x: Number(n.x ?? 0), y: Number(n.y ?? 0) } : { x: Number(s.x ?? 0), y: Number(s.y ?? 0) };
    s.direction = NA(d, e);
  }
  return Le(s);
}
function IA(a, e = null) {
  if (!a) return;
  lm(a);
  const t = Le(e);
  if (!t) return;
  const i = PA(), n = new PIXI.Graphics();
  switch (n.lineStyle(3, i, 0.95), n.beginFill(i, 0.18), String(t.shape ?? "").trim().toLowerCase()) {
    case "blast": {
      n.drawCircle(
        Number(t.x ?? 0),
        Number(t.y ?? 0),
        cr(t.distance ?? 0)
      );
      break;
    }
    case "rect": {
      const s = cr(t.width ?? 0), r = cr(t.height ?? 0);
      n.position.set(Number(t.x ?? 0), Number(t.y ?? 0)), n.rotation = Number(t.direction ?? 0) * Math.PI / 180, n.drawRect(
        -(Number(t.anchorX ?? 0) || 0) * s,
        -(Number(t.anchorY ?? 0) || 0) * r,
        s,
        r
      );
      break;
    }
    default: {
      const [s] = ps(t);
      (s == null ? void 0 : s.type) === "polygon" && Array.isArray(s.points) && s.points.length >= 3 && n.drawPolygon(s.points.flatMap((r) => [Number((r == null ? void 0 : r.x) ?? 0), Number((r == null ? void 0 : r.y) ?? 0)]));
      break;
    }
  }
  n.endFill(), a.addChild(n);
}
function DA(a = ae.none) {
  return a === ae.full ? 14042437 : a === ae.major ? 15174447 : a === ae.minor ? 15782993 : 10134706;
}
function OA(a, e = []) {
  if (a) {
    lm(a);
    for (const t of e) {
      const i = ls(t.token), n = Math.max(20, bA(t.token) + 12), s = DA(t.exposureTier), r = new PIXI.Graphics();
      r.lineStyle(4, s, 0.95), r.beginFill(s, 0.14), r.drawCircle(i.x, i.y, n), r.endFill(), r.zIndex = 10;
      const o = new PIXI.Text(Dt(t.exposureTier), {
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
function cm(a, e = {}) {
  var s, r, o, l, c, u, d, m, f, p, h, g, y, b, S, T;
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
    exposure: Oi({
      tier: ((h = e == null ? void 0 : e.exposure) == null ? void 0 : h.initialTier) ?? ((g = e == null ? void 0 : e.exposure) == null ? void 0 : g.tier) ?? (e == null ? void 0 : e.exposureTier) ?? ae.none,
      appliedTier: ((y = e == null ? void 0 : e.exposure) == null ? void 0 : y.finalTier) ?? ((b = e == null ? void 0 : e.exposure) == null ? void 0 : b.appliedTier) ?? (e == null ? void 0 : e.exposureTier) ?? ae.none,
      evadeUsed: !!((S = e == null ? void 0 : e.exposure) != null && S.evadeUsed),
      evadeLocked: !!((T = e == null ? void 0 : e.exposure) != null && T.evadeLocked)
    }),
    areaEffect: e != null && e.areaEffect ? foundry.utils.deepClone(e.areaEffect) : null
  };
}
function _A({ attack: a = {}, geometry: e = null, attacker: t = null } = {}) {
  var o;
  const i = (a == null ? void 0 : a.template) ?? null, n = Le(e);
  if (!i || !n) return [];
  const s = Oa(t), r = (s == null ? void 0 : s.id) ?? null;
  return (((o = canvas.tokens) == null ? void 0 : o.placeables) ?? []).filter((l) => l == null ? void 0 : l.actor).filter((l) => l.id !== r || (i == null ? void 0 : i.placement) === "origin").filter((l) => fs(n, l)).map((l) => {
    const c = qc({ geometry: n, token: l });
    return cm(l, {
      exposureTier: c,
      areaEffect: {
        templateShape: (i == null ? void 0 : i.shape) ?? "",
        templatePlacement: (i == null ? void 0 : i.placement) ?? "",
        templateGeometry: ii(n)
      }
    });
  }).filter(Boolean);
}
function LA({ attack: a = {}, geometry: e = null, attacker: t = null } = {}) {
  var o;
  const i = (a == null ? void 0 : a.template) ?? null, n = Oa(t), s = (n == null ? void 0 : n.id) ?? null, r = Le(e);
  return !i || !r ? [] : (((o = canvas.tokens) == null ? void 0 : o.placeables) ?? []).filter((l) => l == null ? void 0 : l.actor).filter((l) => l.id !== s || (i == null ? void 0 : i.placement) === "origin").filter((l) => fs(r, l)).map((l) => ({
    token: l,
    exposureTier: qc({ geometry: r, token: l })
  }));
}
function xA({ geometry: a = null, attack: e = {}, attacker: t = null } = {}) {
  var m, f, p, h;
  const i = (e == null ? void 0 : e.template) ?? null, n = Le(a);
  if (!i || !n) return [];
  const s = Oa(t), r = (s == null ? void 0 : s.id) ?? null, o = Number(((m = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : m.HOSTILE) ?? -1), l = Number(((f = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : f.FRIENDLY) ?? 1), c = Number(((p = CONST == null ? void 0 : CONST.TOKEN_DISPOSITIONS) == null ? void 0 : p.NEUTRAL) ?? 0), u = Mc(s), d = (g) => {
    const y = Mc(g);
    return s ? u === l ? y === o : u === o ? y === l : u === c ? y === o : y !== u : !0;
  };
  return (((h = canvas.tokens) == null ? void 0 : h.placeables) ?? []).filter((g) => g == null ? void 0 : g.actor).filter((g) => g.id !== r || (i == null ? void 0 : i.placement) === "origin").filter((g) => fs(n, g)).filter(d).map((g) => String(g.id ?? "").trim()).filter(Boolean);
}
function $A(a = {}) {
  var i;
  const e = String(((i = a == null ? void 0 : a.template) == null ? void 0 : i.shape) ?? "template").trim().toLowerCase();
  return `${e ? `${e.slice(0, 1).toUpperCase()}${e.slice(1)}` : "Template"} placement: left-click to place, right-click or Esc to cancel, Enter or Space to confirm.`;
}
async function BA({ attack: a = {} } = {}) {
  var t, i;
  const e = $A(a);
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
      const p = Number((f == null ? void 0 : f.button) ?? 0), h = lo(f);
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
      lo(f) && l(f);
    };
    window.addEventListener("pointerdown", u, !0), window.addEventListener("keydown", d, !0), window.addEventListener("contextmenu", m, !0);
  });
}
async function zA({ actor: a = null, attack: e = {}, templateGeometry: t = null } = {}) {
  var o, l, c, u, d, m;
  if (!(canvas != null && canvas.scene) || Wc((e == null ? void 0 : e.areaEffect) ?? ((o = e == null ? void 0 : e.payload) == null ? void 0 : o.areaEffect) ?? {})) return null;
  const i = Le(t, {
    template: e == null ? void 0 : e.template,
    placement: e == null ? void 0 : e.templatePlacement
  });
  if (!i) return null;
  const n = ps(i);
  if (!n.length) return null;
  const s = `${String(((l = e == null ? void 0 : e.weapon) == null ? void 0 : l.name) ?? (e == null ? void 0 : e.name) ?? "Template").trim() || "Template"} Template`, [r] = await canvas.scene.createEmbeddedDocuments("Region", [{
    name: s,
    color: String(((c = game.user) == null ? void 0 : c.color) ?? "#ff6400").trim() || "#ff6400",
    visibility: gA,
    locked: !1,
    shapes: n,
    flags: {
      mwd: {
        templateIndicator: {
          sourceActorUuid: (a == null ? void 0 : a.uuid) ?? null,
          sourceItemUuid: ((u = e == null ? void 0 : e.weapon) == null ? void 0 : u.uuid) ?? null,
          payloadId: ((d = e == null ? void 0 : e.payloadState) == null ? void 0 : d.activePayloadId) ?? ((m = e == null ? void 0 : e.payload) == null ? void 0 : m.id) ?? "",
          label: s,
          templateGeometry: ii(i),
          templatePlacement: foundry.utils.deepClone((e == null ? void 0 : e.templatePlacement) ?? null),
          template: foundry.utils.deepClone((e == null ? void 0 : e.template) ?? null)
        }
      }
    }
  }]);
  return r ?? null;
}
async function FA({ actor: a, attack: e } = {}) {
  if (!(canvas != null && canvas.scene))
    throw Ui("Templated attacks require an active scene canvas.", { severity: "warn" });
  const t = (e == null ? void 0 : e.template) ?? null;
  if (!(t != null && t.shape) || !(Number(t == null ? void 0 : t.size) > 0))
    throw Ui("Templated attack is missing valid template configuration.", { severity: "warn" });
  if (!Im.includes(t.shape))
    throw Ui(`Template shape "${t.shape}" is normalized but not supported in v1.`, { severity: "warn" });
  const i = Oa(a);
  if (t.placement === "origin" && !i)
    throw Ui("Origin-placed templated attacks require the attacker to have a token on the current scene.", { severity: "warn" });
  const n = vA({ attack: e, actor: a });
  if (!n)
    throw Ui("Unable to initialize template placement for this attack.", { severity: "warn" });
  const s = EA();
  let r = ii(n), o = "";
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
    IA(s.templateLayer, r), OA(s.markerLayer, LA({ attack: e, geometry: r, attacker: a }));
  }, u = (d) => {
    const m = lo(d);
    if (!m) return;
    const f = RA({
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
    if (o = l(r), c(), window.addEventListener("pointermove", u), !await BA({
      attack: {
        ...e,
        actor: a
      }
    })) return null;
    const m = ii(r);
    if (!m) return null;
    const f = Qm(m, t), p = _A({
      attack: e,
      geometry: m,
      attacker: a
    });
    return {
      templateGeometry: ii(m),
      placement: (f == null ? void 0 : f.placement) ?? null,
      autoTargetTokenIds: xA({
        geometry: m,
        attack: e,
        attacker: a
      }),
      targetSnapshots: p
    };
  } finally {
    window.removeEventListener("pointermove", u), CA(s);
  }
}
function UA(a = {}) {
  var e;
  return Array.isArray(a == null ? void 0 : a.targetSnapshots) ? a.targetSnapshots : Array.from(((e = game.user) == null ? void 0 : e.targets) ?? []).map(cm).filter(Boolean);
}
function HA(a, e = {}) {
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
function WA(a = {}) {
  var t, i, n, s, r;
  const e = String((a == null ? void 0 : a.tokenId) ?? "").trim();
  return e ? ((i = (t = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : t.get) == null ? void 0 : i.call(t, e)) ?? ((r = (s = (n = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : n.placeables) == null ? void 0 : s.find) == null ? void 0 : r.call(s, (o) => (o == null ? void 0 : o.id) === e)) ?? null : null;
}
function jA(a, e) {
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
function KA({ actor: a, payload: e, weapon: t, targets: i = [] } = {}) {
  const n = String((e == null ? void 0 : e.rangeBand) ?? "").trim().toLowerCase();
  if (!(((t == null ? void 0 : t.type) === "personalWeapon" || (t == null ? void 0 : t.isSynthetic)) && i.length === 1))
    return n || String((t == null ? void 0 : t.defaultRangeBand) ?? "close").trim() || "close";
  const r = HA(a, e), o = WA(i[0]), l = jA(r, o), c = lh(l, (t == null ? void 0 : t.range) ?? {}, (t == null ? void 0 : t.defaultRangeBand) ?? "close");
  return c === "outOfRange" ? c : n || ((t == null ? void 0 : t.type) !== "personalWeapon" && !(t != null && t.isSynthetic) || i.length !== 1 ? String((t == null ? void 0 : t.defaultRangeBand) ?? "close").trim() || "close" : c);
}
function GA(a) {
  return (a == null ? void 0 : a.type) === A.actorTypes.vehicle || (a == null ? void 0 : a.type) === A.actorTypes.battlemech;
}
function um(a) {
  return ["mechWeapon", "vehicleWeapon"].includes((a == null ? void 0 : a.canonicalType) ?? (a == null ? void 0 : a.type));
}
function qA(a = {}, e = {}) {
  return {
    close: Number(a.close ?? 0) + Number(e.close ?? 0),
    near: Number(a.near ?? 0) + Number(e.near ?? 0),
    far: Number(a.far ?? 0) + Number(e.far ?? 0),
    extreme: Number(a.extreme ?? 0) + Number(e.extreme ?? 0)
  };
}
function VA(a, e) {
  var m, f, p, h;
  const t = String((e == null ? void 0 : e.weaponGroupId) ?? ((m = e == null ? void 0 : e.machineWeaponGroup) == null ? void 0 : m.id) ?? "").trim();
  if (!t) return null;
  const i = Array.from(((f = a.system) == null ? void 0 : f.weaponGroups) ?? ((h = (p = a.system) == null ? void 0 : p.mwd) == null ? void 0 : h.weaponGroupDetails) ?? []).find((g) => String((g == null ? void 0 : g.id) ?? "").trim() === t) ?? null, n = Array.isArray(i == null ? void 0 : i.weaponIds) ? i.weaponIds : Array.isArray(i == null ? void 0 : i.weapons) ? i.weapons.map((g) => g == null ? void 0 : g.id).filter(Boolean) : [], s = n.map((g) => {
    var y, b;
    return (b = (y = a.items) == null ? void 0 : y.get) == null ? void 0 : b.call(y, g);
  }).filter((g) => g && um(g));
  if (!i || !s.length) return null;
  const r = s.map((g) => {
    var y;
    return ((y = g.getCombatProfile) == null ? void 0 : y.call(g)) ?? null;
  }).filter(Boolean), o = r[0] ?? {}, l = r.reduce((g, y) => qA(g, y.attackRatingBand), {}), c = r.reduce((g, y) => g + (Number(y.damage ?? 0) || 0), 0), u = Math.max(0, ...r.map((g) => Number(g.ap ?? 0) || 0)), d = String(o.skill ?? "gunnery").trim() || "gunnery";
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
    skillDef: Ot(d),
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
function YA(a, e) {
  var i, n, s, r, o, l, c, u, d, m;
  if (((i = e == null ? void 0 : e.syntheticWeapon) == null ? void 0 : i.id) === "unarmed") {
    const f = It.buildDefaultUnarmedProfile(a);
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
  if (GA(a)) {
    const f = VA(a, e);
    if (f) return f;
    const p = ((r = (s = a.items) == null ? void 0 : s.get) == null ? void 0 : r.call(s, (e == null ? void 0 : e.weaponId) ?? "")) ?? null;
    if (!p || !um(p))
      throw new Error("Machine attack requires an owned vehicle or BattleMech weapon.");
    return ((o = p.getCombatProfile) == null ? void 0 : o.call(p)) ?? null;
  }
  const t = ((c = (l = a.items) == null ? void 0 : l.get) == null ? void 0 : c.call(l, (e == null ? void 0 : e.weaponId) ?? "")) ?? null;
  if (!t || !(((u = t.isPersonalWeapon) == null ? void 0 : u.call(t)) ?? t.type === "personalWeapon") || !((d = t.system) != null && d.equipped))
    throw new Error("Attack requires an equipped personal weapon.");
  return ((m = t.getCombatProfile) == null ? void 0 : m.call(t, { payloadId: e == null ? void 0 : e.payloadId })) ?? null;
}
async function QA({ actor: a, payload: e } = {}) {
  var P, C, H, Y, Q, K, G, L, z, q, ee, oe, ke, fe, ne, $e, Qe, Je;
  if (!a) throw new Error("resolveAttack requires actor");
  const t = YA(a, e);
  if (!t) throw new Error("Unable to resolve weapon profile.");
  if (Array.isArray((P = t == null ? void 0 : t.capabilityReport) == null ? void 0 : P.errors) && t.capabilityReport.errors.length > 0)
    throw Ui(
      ((C = t.capabilityReport.errors[0]) == null ? void 0 : C.message) ?? "Weapon capability data is invalid for this attack.",
      { severity: "warn" }
    );
  const i = Ot(t.skill) ?? {
    code: t.skill,
    label: t.skill || "Attack",
    attribute: "reflexes",
    domains: ["physical"]
  }, n = String(i.attribute ?? "reflexes").trim() || "reflexes", s = ((H = a.getAttributeValue) == null ? void 0 : H.call(a, n)) ?? Number(((K = (Q = (Y = a.system) == null ? void 0 : Y.attributes) == null ? void 0 : Q[n]) == null ? void 0 : K.value) ?? 0), r = ((G = a.getSkillRating) == null ? void 0 : G.call(a, t.skill)) ?? Number(((q = (z = (L = a.system) == null ? void 0 : L.skills) == null ? void 0 : z[t.skill]) == null ? void 0 : q.rating) ?? 0), o = Number(((ke = (oe = (ee = a.system) == null ? void 0 : ee.skills) == null ? void 0 : oe[t.skill]) == null ? void 0 : ke.bonus) ?? 0), l = new Set(Ss(a.system ?? {}, t.skill)), c = vo(t.skill, e == null ? void 0 : e.specializationKey), u = c && l.has(c.key) ? c : null, d = u ? Ao : 0, m = Number(((fe = t == null ? void 0 : t.effects) == null ? void 0 : fe.accuracyMod) ?? 0) || 0, f = o + m, p = UA(e), h = KA({ actor: a, payload: e, weapon: t, targets: p }), g = (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? Es(h) : h, y = Number(((ne = t == null ? void 0 : t.attackRatingBand) == null ? void 0 : ne[h]) ?? 0) || 0, b = !!(($e = t == null ? void 0 : t.capabilityReport) != null && $e.isTemplated), S = (Qe = e == null ? void 0 : e.aim) != null && Qe.active ? {
    active: !0,
    eligible: !b && p.length === 1,
    ineligibleReason: b ? "Aim cannot apply to template attacks." : p.length !== 1 ? "Aim cannot apply to multi-target attacks." : "",
    skillCode: t.skill,
    skillLabel: i.label ?? t.skill ?? "Attack Skill"
  } : null;
  if (!b && p.length === 0)
    throw Ui("Target at least one token to attack.", { severity: "warn" });
  const T = Number(t.ap ?? 0) + Number(((Je = t == null ? void 0 : t.effects) == null ? void 0 : Je.ap) ?? 0), E = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? oh(h, 1) : 1;
  return {
    intent: "attack",
    rollType: "simple",
    title: `${t.name} Attack`,
    subtitle: a.name ?? "Actor",
    domains: Array.isArray(i.domains) && i.domains.length ? i.domains : ["physical"],
    domainTags: ["combat", "attack"],
    diceTarget: Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : 5,
    difficulty: { dn: E },
    dn: {
      parts: [{
        id: "difficulty.current",
        label: (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? `Base DN (${g})` : "DN",
        value: E,
        tags: ["manual"]
      }],
      total: E
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
      { id: "ap", label: "AP", value: T },
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
      totalAp: T
    },
    specialization: u ? {
      key: u.key,
      label: u.label,
      value: d,
      skillKey: i.code ?? t.skill
    } : null
  };
}
async function JA({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Defense",
    intent: "defense",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function XA({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Resistance",
    intent: "resistance",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function ZA({ actor: a } = {}) {
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
async function ew({ actor: a }) {
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
const tw = {
  skill: cA,
  edge: mA,
  attribute: fA,
  common: pA,
  attack: QA,
  defense: JA,
  resistance: XA,
  initiative: ZA,
  overload: ew
};
async function ur({ actor: a, payload: e, event: t } = {}) {
  if (!a) throw new Error("resolveIntent requires actor");
  const i = String((e == null ? void 0 : e.intent) ?? "").trim();
  if (!i) throw new Error("resolveIntent requires payload.intent");
  const n = tw[i];
  if (!n) throw new Error(`Unsupported roll intent: ${i}`);
  const s = await n({ actor: a, payload: e, event: t });
  return iw(s, { intent: i });
}
function iw(a, { intent: e } = {}) {
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
var Ta;
class aw {
  constructor() {
    Me(this, Ta, /* @__PURE__ */ new Map());
  }
  register(e) {
    if (!(e != null && e.id) || typeof e.collect != "function")
      throw new Error("Invalid ModifierProvider: missing id or collect()");
    F(this, Ta).has(e.id) || F(this, Ta).set(e.id, e);
  }
  async collectAll(e) {
    const t = [];
    for (const i of F(this, Ta).values()) {
      const n = await i.collect(e);
      if (console.log("MWD | provider", i.id, "returned", n), !!(n != null && n.length))
        for (const s of n)
          s && typeof s.label == "string" && typeof s.value == "number" && typeof s.source == "string" ? t.push(s) : console.warn("MWD | DROPPED MOD (bad shape)", i.id, s);
    }
    return t;
  }
}
Ta = new WeakMap();
const Jt = new aw();
function nw(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function sw(a) {
  const e = nw(a == null ? void 0 : a.value);
  return e === null ? null : { ...a, value: e };
}
async function Ec({
  actor: a,
  rollType: e,
  skillId: t,
  domains: i,
  // NEW (optional)
  payload: n,
  resolved: s,
  context: r
} = {}) {
  const o = { actor: a, rollType: e, skillId: t, domains: i, payload: n, resolved: s, context: r }, l = await Jt.collectAll(o);
  console.log("MWD|condition collect called", o.rollType);
  let c = [];
  for (const d of l ?? []) {
    const m = sw(d);
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
function rw({
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
  var Y, Q, K, G;
  if (!a) throw new Error("buildResolved requires actor");
  if (!(e != null && e.intent)) throw new Error("buildResolved requires payload.intent");
  if (!i) throw new Error("buildResolved requires roll");
  const m = foundry.utils.randomID(), f = (Y = i.dice) == null ? void 0 : Y[0], h = (Array.isArray(f == null ? void 0 : f.results) ? f.results : []).map((L, z) => {
    const q = `pool:${z}`, ee = Number(L.result), oe = !!L.success;
    return {
      ref: q,
      face: ee,
      isSuccess: oe,
      isFailure: !oe,
      tooltip: oe ? `Die ${z + 1}: ${ee} (Success vs TN ${Number(n ?? 5)})` : `Die ${z + 1}: ${ee} (Failure vs TN ${Number(n ?? 5)})`
    };
  }), g = h.filter((L) => L.isFailure).map((L) => L.ref), y = [{
    id: "pool",
    label: "Pool",
    faces: 6,
    termIndex: 0,
    // informational only
    dice: h
  }], b = (Array.isArray(r) ? r : []).map((L, z) => {
    const q = Number(L.value ?? 0), ee = `mod:${lw(L.label ?? "mod")}:${z}`;
    return {
      id: L.id ?? ee,
      label: L.label ?? "Modifier",
      value: q,
      domain: L.domain ?? null,
      source: L.source ?? null,
      tooltip: L.tooltip ?? `${L.label ?? "Modifier"} ${Cc(q)}`
    };
  }), S = b.map((L) => L.id), E = (Array.isArray(t == null ? void 0 : t.breakdown) ? t.breakdown : []).map((L) => ({
    id: `pool.${L.id ?? foundry.utils.randomID()}`,
    label: L.label ?? L.id ?? "Row",
    value: Number(L.value ?? 0),
    tooltip: `Contribution from ${L.label ?? L.id}: ${Number(L.value ?? 0)}`
  }));
  E.push({
    id: "mods.total",
    label: "Mods",
    value: Number(o ?? 0),
    modIds: S,
    tooltip: b.length ? b.map((L) => `${L.label}: ${Cc(L.value)}`).join(`
`) : "No roll-time modifiers."
  }), E.push({
    id: "pool.final",
    label: "Final Pool",
    value: Number(s ?? 0),
    tooltip: `Final dice pool rolled: ${Number(s ?? 0)}d6`
  });
  const P = Number.isFinite(Number(l)) ? Number(l) : h.filter((L) => L.isSuccess).length, C = Number.isFinite(Number(c)) ? Number(c) : h.filter((L) => L.face === 1).length, H = ow(u, { payload: e });
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
        pool: ((K = t == null ? void 0 : t.edge) == null ? void 0 : K.pool) ?? null,
        earn: ((G = t == null ? void 0 : t.edge) == null ? void 0 : G.earn) ?? null
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
      ones: C
    },
    // New: engine-interpreted outcome (margin/net/converted/edgeEarned/etc
    outcomeModel: d,
    // Breakdown + modifiers
    breakdownRows: E,
    modifiers: {
      applied: b,
      total: Number(o ?? 0)
    },
    areaEffectPreviewState: foundry.utils.deepClone((e == null ? void 0 : e.areaEffectPreviewState) ?? {}),
    // Edge snapshot / affordances
    edge: H
  };
}
function ow(a, { payload: e } = {}) {
  var p, h, g, y, b, S, T, E, P, C, H, Y, Q, K;
  const t = !!((p = e == null ? void 0 : e.edge) != null && p.enabled), i = (a == null ? void 0 : a.domain) ?? null, n = (a == null ? void 0 : a.pools) ?? null, s = ((h = a == null ? void 0 : a.pre) == null ? void 0 : h.poolKey) ?? ((y = (g = e == null ? void 0 : e.edge) == null ? void 0 : g.pre) == null ? void 0 : y.poolKey) ?? (t ? ((b = e == null ? void 0 : e.edge) == null ? void 0 : b.poolKey) ?? null : null), r = Number(((S = a == null ? void 0 : a.pre) == null ? void 0 : S.spent) ?? ((E = (T = e == null ? void 0 : e.edge) == null ? void 0 : T.pre) == null ? void 0 : E.spent) ?? (t ? 1 : 0)) ? 1 : 0, o = ((P = a == null ? void 0 : a.post) == null ? void 0 : P.poolKey) ?? ((H = (C = e == null ? void 0 : e.edge) == null ? void 0 : C.post) == null ? void 0 : H.poolKey) ?? null, l = Number(((Y = a == null ? void 0 : a.post) == null ? void 0 : Y.spent) ?? ((K = (Q = e == null ? void 0 : e.edge) == null ? void 0 : Q.post) == null ? void 0 : K.spent) ?? 0) ? 1 : 0, c = (n == null ? void 0 : n.a) ?? null, u = (n == null ? void 0 : n.b) ?? null, d = [c, u].filter(Boolean);
  let m = [c, u].filter(Boolean);
  r && s && (m = m.filter((G) => G !== s));
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
function Cc(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function lw(a) {
  return String(a).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
const { ApplicationV2: cw, HandlebarsApplicationMixin: uw } = foundry.applications.api;
function dw(a, e = -3, t = 3) {
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
function Pc(a) {
  return (Array.isArray(a) ? a : []).map((t) => ({
    id: (t == null ? void 0 : t.id) ?? foundry.utils.randomID(),
    label: typeof (t == null ? void 0 : t.label) == "string" ? t.label : "Manual",
    value: Number((t == null ? void 0 : t.value) ?? 0)
  }));
}
function dr(a, e) {
  const t = a == null ? void 0 : a.toggles;
  return t && typeof t == "object" && e in t ? !!t[e] : !!(a != null && a[e]);
}
function mw(a, e) {
  a.useEdge = !!e.useEdge, a.takeRisks = !!e.takeRisks, a.opponentRoll = !!e.opponentRoll, a.toggles = a.toggles && typeof a.toggles == "object" ? a.toggles : {}, a.toggles.useEdge = !!e.useEdge, a.toggles.takeRisks = !!e.takeRisks, a.toggles.opponentRoll = !!e.opponentRoll;
}
function Nc(a, e, t) {
  const i = String(t ?? "").trim(), n = i ? Ff(e, i) : "";
  if (i && n) {
    a.specializationKey = i, a.specializationLabel = n;
    return;
  }
  delete a.specializationKey, delete a.specializationLabel;
}
function fw(a) {
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
var Mt;
const He = class He extends uw(cw) {
  constructor({ actor: t, baseContext: i, initialState: n = null, options: s = {} }) {
    var c, u;
    super(s);
    Me(this, Mt, null);
    /** @type {{ baseContext: any, state: any }} */
    D(this, "_mwd", { baseContext: null, state: null });
    this.actor = t, this._mwd.baseContext = i ?? {};
    const r = foundry.utils.deepClone(this._mwd.baseContext.payload ?? {}), o = Pc(r.manualModifiers);
    this._mwd.state = foundry.utils.mergeObject(
      {
        payload: r,
        manual: o,
        toggles: {
          useEdge: dr(r, "useEdge"),
          takeRisks: dr(r, "takeRisks"),
          opponentRoll: dr(r, "opponentRoll")
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
      Oe(this, Mt, t), this.render(!0);
    });
  }
  async close(t = {}) {
    if (F(this, Mt)) {
      const i = F(this, Mt);
      Oe(this, Mt, null), i(null);
    }
    return super.close(t);
  }
  /* --------------------------- */
  /* Prepare Context             */
  /* --------------------------- */
  async _prepareContext(t) {
    var Y, Q, K, G, L, z, q, ee, oe, ke, fe, ne, $e, Qe, Je, it, dt, mt, ft, pt, ht, _t, Lt, xt, $t, R, B, be, te, Pe, gt, k, N, j, he, le, Ee, Be, Ye, at, kt;
    const i = this._mwd.baseContext ?? {}, n = this._mwd.state ?? {}, s = Number.isFinite(Number((Y = n == null ? void 0 : n.payload) == null ? void 0 : Y.dn)) ? Number(n.payload.dn) : Number.isFinite(Number((K = (Q = i == null ? void 0 : i.resolved) == null ? void 0 : Q.dn) == null ? void 0 : K.total)) ? Number(i.resolved.dn.total) : Number.isFinite(Number(i == null ? void 0 : i.dn)) ? Number(i.dn) : Number.isFinite(Number((L = (G = i == null ? void 0 : i.resolved) == null ? void 0 : G.difficulty) == null ? void 0 : L.dn)) ? Number(i.resolved.difficulty.dn) : 1, r = (i == null ? void 0 : i.intent) ?? "skill";
    let o, l;
    const c = Array.isArray(n.manual) ? n.manual.reduce((X, Se) => X + Number((Se == null ? void 0 : Se.value) || 0), 0) : 0;
    if (r === "edge") {
      const X = (i == null ? void 0 : i.resolved) ?? {}, Se = Array.isArray(X.breakdown) ? X.breakdown : [], Xe = (je) => {
        var W;
        return Number(((W = Se.find((de) => de.id === je)) == null ? void 0 : W.value) ?? 0);
      }, Ze = Number(((z = X == null ? void 0 : X.pool) == null ? void 0 : z.attribute) ?? 0);
      o = {
        pool: Ze,
        rating: Xe("rating"),
        cap: Xe("cap"),
        modifiers: Number(((q = i == null ? void 0 : i.dice) == null ? void 0 : q.modifiers) ?? 0)
      }, l = Math.max(0, Ze + o.modifiers + c);
    } else {
      o = {
        attribute: Number(((ee = i == null ? void 0 : i.dice) == null ? void 0 : ee.attribute) ?? 0),
        skill: Number(((oe = i == null ? void 0 : i.dice) == null ? void 0 : oe.skill) ?? 0),
        bonus: Number(((ke = i == null ? void 0 : i.dice) == null ? void 0 : ke.bonus) ?? 0),
        specialization: Number(((fe = i == null ? void 0 : i.dice) == null ? void 0 : fe.specialization) ?? 0),
        modifiers: Number(((ne = i == null ? void 0 : i.dice) == null ? void 0 : ne.modifiers) ?? 0)
      };
      const X = o.modifiers + c, Se = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, Se + X);
    }
    const u = Array.isArray(($e = i == null ? void 0 : i.resolved) == null ? void 0 : $e.domains) ? i.resolved.domains : [], d = u.includes("physical") ? "physical" : u.includes("mental") ? "mental" : u.includes("social") ? "social" : null, f = (d === "physical" ? ["grit", "chaos"] : d === "mental" ? ["insight", "rumor"] : d === "social" ? ["legend", "credibility"] : []).map((X) => {
      var Se, Xe, Ze, je;
      return {
        key: X,
        label: X.charAt(0).toUpperCase() + X.slice(1),
        available: Number(((Ze = (Xe = (Se = this.actor) == null ? void 0 : Se.getEdgePool) == null ? void 0 : Xe.call(Se, X)) == null ? void 0 : Ze.effectiveValue) ?? 0),
        selected: X === (((je = n.edge) == null ? void 0 : je.prePoolKey) ?? null)
      };
    }), p = f.find((X) => X.selected), h = (p == null ? void 0 : p.label) ?? null, g = ((Qe = i == null ? void 0 : i.resolved) == null ? void 0 : Qe.attack) ?? null, y = String(
      ((Je = g == null ? void 0 : g.skill) == null ? void 0 : Je.code) ?? ((dt = (it = i == null ? void 0 : i.resolved) == null ? void 0 : it.specialization) == null ? void 0 : dt.skillKey) ?? ((ft = (mt = i == null ? void 0 : i.resolved) == null ? void 0 : mt.data) == null ? void 0 : ft.skillKey) ?? ((pt = i == null ? void 0 : i.payload) == null ? void 0 : pt.key) ?? ""
    ).trim(), b = y ? gu(((ht = this.actor) == null ? void 0 : ht.system) ?? {}, y) : [], S = String(((_t = n == null ? void 0 : n.payload) == null ? void 0 : _t.specializationKey) ?? "").trim(), T = b.find((X) => X.key === S) ?? null;
    if (r !== "edge") {
      o.specialization = T ? Number(((xt = (Lt = i == null ? void 0 : i.resolved) == null ? void 0 : Lt.specialization) == null ? void 0 : xt.value) ?? 2) : 0;
      const X = o.modifiers + c, Se = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, Se + X);
    }
    const E = Array.isArray(($t = g == null ? void 0 : g.payloadState) == null ? void 0 : $t.payloads) ? g.payloadState.payloads : [], P = String(((R = g == null ? void 0 : g.weapon) == null ? void 0 : R.category) ?? "").trim().toLowerCase() !== "melee" && E.length > 0, C = String(((B = n == null ? void 0 : n.payload) == null ? void 0 : B.payloadId) ?? ((be = g == null ? void 0 : g.payloadState) == null ? void 0 : be.activePayloadId) ?? "").trim(), H = E.find((X) => X.id === C) ?? null;
    return {
      header: {
        left: ((te = i == null ? void 0 : i.header) == null ? void 0 : te.left) ?? "Roll",
        right: ((Pe = i == null ? void 0 : i.header) == null ? void 0 : Pe.right) ?? ((gt = this.actor) == null ? void 0 : gt.name) ?? ""
      },
      formula: String((i == null ? void 0 : i.formula) ?? ((k = i == null ? void 0 : i.resolved) == null ? void 0 : k.formula) ?? "").trim(),
      dice: o,
      modifiers: Array.isArray(i.modifiers) ? i.modifiers : [],
      manual: (n.manual ?? []).map((X) => ({
        ...X,
        steps: dw(Number(X.value ?? 0), -3, 3)
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
        options: b.map((X) => ({
          key: X.key,
          label: X.label,
          selected: X.key === S
        })),
        selectedKey: S,
        selectedLabel: (T == null ? void 0 : T.label) ?? ""
      } : null,
      attack: g ? {
        weaponName: ((N = g == null ? void 0 : g.weapon) == null ? void 0 : N.name) ?? "Weapon",
        rangeBand: ((j = g == null ? void 0 : g.weapon) == null ? void 0 : j.type) === "personalWeapon" || (he = g == null ? void 0 : g.weapon) != null && he.isSynthetic ? Es((g == null ? void 0 : g.rangeBand) ?? "") : (g == null ? void 0 : g.rangeBand) ?? "",
        damageType: ((le = H == null ? void 0 : H.modifies) == null ? void 0 : le.damageType) || ((Ee = g == null ? void 0 : g.weapon) == null ? void 0 : Ee.damageTypeLabel) || ((Be = g == null ? void 0 : g.weapon) == null ? void 0 : Be.damageType) || "",
        usesPayloads: P,
        source: (g == null ? void 0 : g.sourceState) ?? null,
        payloads: E.map((X) => {
          var Se;
          return {
            id: X.id,
            name: X.label,
            damageType: (Se = X.modifies) == null ? void 0 : Se.damageType,
            selected: X.id === C
          };
        }),
        selectedPayloadId: C,
        selectedPayloadLabel: (H == null ? void 0 : H.label) ?? ((Ye = g == null ? void 0 : g.payload) == null ? void 0 : Ye.label) ?? ((at = g == null ? void 0 : g.weapon) == null ? void 0 : at.payloadLabel) ?? "",
        selectedSourceLabel: ((kt = g == null ? void 0 : g.sourceState) == null ? void 0 : kt.label) ?? ""
      } : null
    };
  }
  /* --------------------------- */
  /* Actions                     */
  /* --------------------------- */
  async _onCancel(t) {
    if (t == null || t.preventDefault(), F(this, Mt)) {
      const i = F(this, Mt);
      Oe(this, Mt, null), i(null);
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
    }), mw(i.payload, i.toggles ?? {}), Nc(
      i.payload,
      ((n = i.payload) == null ? void 0 : n.intent) === "attack" ? ((s = i.payload) == null ? void 0 : s.skillKey) ?? ((c = (l = (o = (r = this._mwd.baseContext) == null ? void 0 : r.resolved) == null ? void 0 : o.attack) == null ? void 0 : l.skill) == null ? void 0 : c.code) : ((u = i.payload) == null ? void 0 : u.key) ?? ((f = (m = (d = this._mwd.baseContext) == null ? void 0 : d.resolved) == null ? void 0 : m.data) == null ? void 0 : f.skillKey),
      (p = i.payload) == null ? void 0 : p.specializationKey
    ), F(this, Mt)) {
      const y = F(this, Mt);
      Oe(this, Mt, null), y({ payload: i.payload });
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
      return Nc(this._mwd.state.payload, n, s), this.render(!1);
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
    }, u = s ?? fw(n), d = {
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
    l.manualModifiers = Pc(l.manualModifiers);
    const p = await new He({
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
Mt = new WeakMap(), D(He, "DEFAULT_OPTIONS", foundry.utils.mergeObject(
  Yt(He, He, "DEFAULT_OPTIONS"),
  {
    id: "mwd-roll-dialog",
    classes: [
      ...Yt(He, He, "DEFAULT_OPTIONS").classes ?? [],
      "mwd",
      "mwd-roll-dialog"
    ],
    window: { title: "Roll", resizable: !1 },
    position: { width: 520, height: "auto" },
    actions: {
      submit: He.prototype._onSubmit,
      cancel: He.prototype._onCancel,
      addManual: He.prototype._onAddManual,
      removeManual: He.prototype._onRemoveManual,
      setManualValue: He.prototype._onSetManualValue,
      setManualStepper: He.prototype._onSetManualStepper,
      setEdgePrePool: He.prototype._onSetEdgePrePool,
      toggleCheckbox: He.prototype._onToggleCheckbox,
      setDn: He.prototype._onSetDn,
      setPayload: He.prototype._onSetPayload,
      setSpecialization: He.prototype._onSetSpecialization
    }
  },
  { inplace: !1 }
)), D(He, "PARTS", {
  body: { template: "systems/mwd/templates/v2/roll/mwd-roll-dialog.hbs" }
});
let co = He;
const { ApplicationV2: pw, HandlebarsApplicationMixin: hw } = foundry.applications.api, Va = class Va extends hw(pw) {
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
      classes: [game.system.anarchy.styles.selectCssClass(), ...Va.DEFAULT_OPTIONS.classes],
      window: { title: e }
    };
    return new Va({ items: t }, i).wait();
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
D(Va, "PARTS", {
  body: {
    template: `${J}/dialog/select-item.hbs`
  }
});
let uo = Va;
const Rc = { execute: Tw }, gw = {
  physical: ["grit", "chaos"],
  mental: ["insight", "rumor"],
  social: ["legend", "credibility"]
};
function yw(a, e) {
  var s;
  const t = gw[e] ?? [];
  let i = null, n = -1;
  for (const r of t) {
    const o = (s = a.getEdgePool) == null ? void 0 : s.call(a, r), l = Number((o == null ? void 0 : o.rating) ?? 0), c = Number((o == null ? void 0 : o.value) ?? 0), u = Math.max(0, l - c);
    u > n && (n = u, i = r);
  }
  return i ?? t[0] ?? null;
}
function bw(a) {
  const t = (Array.isArray(a == null ? void 0 : a.manualModifiers) ? a.manualModifiers : []).map((n) => ({
    id: n.id ?? foundry.utils.randomID(),
    label: (n.label ?? "Manual").trim() || "Manual",
    value: Number(n.value ?? 0),
    source: "Manual"
  })).filter((n) => Number.isFinite(n.value) && n.value !== 0), i = t.reduce((n, s) => n + s.value, 0);
  return { mods: t, total: i };
}
function Ic(a = {}) {
  const e = a.toggles ?? {}, t = String((a == null ? void 0 : a.payloadId) ?? (a == null ? void 0 : a.ammoTypeId) ?? "").trim();
  return {
    ...a,
    ...t ? { payloadId: t } : {},
    toggles: {
      useEdge: !!e.useEdge,
      takeRisks: !!e.takeRisks,
      opponentRoll: !!e.opponentRoll
    },
    manualModifiers: Aw(a.manualModifiers)
  };
}
async function Sw({ actor: a, payload: e } = {}) {
  var s, r, o, l, c, u, d, m, f, p, h, g;
  if ((e == null ? void 0 : e.intent) !== "attack") return e;
  const t = foundry.utils.deepClone(e ?? {}), i = ((s = a.getPersonalCombatLoadout) == null ? void 0 : s.call(a, { refresh: !0 })) ?? null, n = (y) => {
    var S, T, E, P, C;
    const b = ((T = (S = a.items) == null ? void 0 : S.get) == null ? void 0 : T.call(S, y)) ?? null;
    return !b || !(((E = b.isPersonalWeapon) == null ? void 0 : E.call(b)) ?? b.type === A.itemType.personalWeapon) || !((P = b.system) != null && P.equipped) ? null : ((C = b.getCombatProfile) == null ? void 0 : C.call(b, { payloadId: t == null ? void 0 : t.payloadId })) ?? null;
  };
  if (t.weaponId) {
    const y = n(t.weaponId);
    if (!y)
      throw new Error("Attack requires an owned equipped personal weapon.");
    return t.payloadId = t.payloadId ?? ((r = y == null ? void 0 : y.payloadState) == null ? void 0 : r.activePayloadId) ?? "", t;
  }
  if (t.mode === "auto") {
    if (i != null && i.weaponChoiceRequired) {
      const y = await uo.selectItem(
        "Choose Weapon",
        i.equippedWeapons ?? []
      );
      return y ? (t.weaponId = y.id, t.payloadId = t.payloadId ?? ((o = y == null ? void 0 : y.payloadState) == null ? void 0 : o.activePayloadId) ?? "", delete t.mode, t) : null;
    }
    if ((l = i == null ? void 0 : i.defaultWeapon) != null && l.isSynthetic || ((c = i == null ? void 0 : i.defaultWeapon) == null ? void 0 : c.id) === "unarmed")
      return t.syntheticWeapon = foundry.utils.deepClone(i.defaultWeapon ?? It.buildDefaultUnarmedProfile(a)), t.weaponId = t.syntheticWeapon.id, t.payloadId = t.payloadId ?? ((d = (u = t.syntheticWeapon) == null ? void 0 : u.payloadState) == null ? void 0 : d.activePayloadId) ?? "", delete t.mode, t;
    if ((m = i == null ? void 0 : i.defaultWeapon) != null && m.id)
      return t.weaponId = i.defaultWeapon.id, t.payloadId = t.payloadId ?? ((p = (f = i.defaultWeapon) == null ? void 0 : f.payloadState) == null ? void 0 : p.activePayloadId) ?? "", delete t.mode, t;
  }
  if (t.fallback === "unarmed")
    return t.syntheticWeapon = foundry.utils.deepClone(It.buildDefaultUnarmedProfile(a)), t.weaponId = t.syntheticWeapon.id, t.payloadId = t.payloadId ?? ((g = (h = t.syntheticWeapon) == null ? void 0 : h.payloadState) == null ? void 0 : g.activePayloadId) ?? "", delete t.mode, t;
  throw new Error("Attack could not resolve a usable weapon.");
}
function Aw(a) {
  return Array.isArray(a) ? a.map((e) => ({
    id: (e == null ? void 0 : e.id) ?? foundry.utils.randomID(),
    label: typeof (e == null ? void 0 : e.label) == "string" ? e.label : "Manual",
    value: Number((e == null ? void 0 : e.value) ?? 0)
  })) : [];
}
async function ww(a = []) {
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
async function Tw({ actor: a, payload: e, event: t } = {}) {
  var K, G, L, z, q, ee, oe, ke, fe, ne, $e, Qe, Je, it, dt, mt, ft, pt, ht, _t, Lt, xt, $t, R, B, be, te, Pe, gt, k, N, j, he, le, Ee, Be, Ye, at, kt, X, Se, Xe, Ze, je;
  if (a != null && a.actor && (a = a.actor), (K = a == null ? void 0 : a.document) != null && K.actor && (a = a.document.actor), !a) throw new Error("MWD.roll.execute requires actor");
  if (!(e != null && e.intent)) throw new Error("MWD.roll.execute requires payload.intent");
  if (e = Ic(e), e = await Sw({ actor: a, payload: e }), !e) return null;
  let i = await ur({ actor: a, payload: e, event: t });
  if (e.intent === "attack" && ((L = (G = i == null ? void 0 : i.attack) == null ? void 0 : G.capabilityReport) != null && L.isTemplated)) {
    const W = await FA({
      actor: a,
      attack: i.attack
    });
    if (!W) return null;
    try {
      await zA({
        actor: a,
        attack: i.attack,
        templateGeometry: W.templateGeometry ?? null
      });
    } catch (de) {
      console.warn("MWD | Unable to create visual template indicator", de);
    }
    if (await ww(W.autoTargetTokenIds ?? []), !Wc(((z = i == null ? void 0 : i.attack) == null ? void 0 : z.areaEffect) ?? ((ee = (q = i == null ? void 0 : i.attack) == null ? void 0 : q.payload) == null ? void 0 : ee.areaEffect) ?? {}) && (!Array.isArray(W.targetSnapshots) || W.targetSnapshots.length === 0))
      return (oe = ui.notifications) == null || oe.warn("Template placement did not affect any targets."), null;
    e.targetSnapshots = Array.isArray(W.targetSnapshots) ? W.targetSnapshots : [], e.templateGeometry = W.templateGeometry ?? null, e.templatePlacement = W.placement, i = await ur({ actor: a, payload: e, event: t });
  } else e.intent === "attack" && (delete e.targetSnapshots, delete e.templatePlacement, delete e.templateGeometry);
  let n = await Ec({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const s = await co.prompt({
    actor: a,
    basePayload: e,
    resolved: i,
    diceParts: {
      attribute: ((ke = i == null ? void 0 : i.pool) == null ? void 0 : ke.attribute) ?? 0,
      skill: ((fe = i == null ? void 0 : i.pool) == null ? void 0 : fe.skill) ?? 0,
      bonus: ((ne = i == null ? void 0 : i.pool) == null ? void 0 : ne.bonus) ?? 0,
      specialization: (($e = i == null ? void 0 : i.pool) == null ? void 0 : $e.specialization) ?? 0
    },
    mods: n.mods,
    modTotal: n.total,
    options: {
      allowEdge: e.intent !== "initiative"
    }
  });
  if (!s) return null;
  if (e = Ic(s), i = await ur({ actor: a, payload: e, event: t }), e.intent === "attack" && !((Je = (Qe = i == null ? void 0 : i.attack) == null ? void 0 : Qe.capabilityReport) != null && Je.isTemplated) && (delete e.targetSnapshots, delete e.templatePlacement, delete e.templateGeometry), e.intent === "attack" && e.weaponId) {
    const W = ((dt = (it = a.items) == null ? void 0 : it.get) == null ? void 0 : dt.call(it, e.weaponId)) ?? null;
    if ((mt = W == null ? void 0 : W.isPersonalWeapon) != null && mt.call(W)) {
      const de = String(e.payloadId ?? "").trim(), ri = String(((ft = W.system) == null ? void 0 : ft.selectedPayloadId) ?? "").trim();
      if (de && de !== ri && await ((pt = W.setActivePayload) == null ? void 0 : pt.call(W, de)), !((ht = W.canConsumePayload) != null && ht.call(W, { payloadId: de }))) {
        const Ct = (_t = W.getPayloadState) == null ? void 0 : _t.call(W, { payloadId: de }), gi = Ct != null && Ct.payloadLabel ? ` (${Ct.payloadLabel})` : "";
        return (Lt = ui.notifications) == null || Lt.warn(`Not enough payload${gi} for ${W.name}.`), null;
      }
    }
  }
  n = await Ec({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const { mods: r, total: o } = n, { mods: l, total: c } = bw(e);
  let u = [...r, ...l], d = Number(o ?? 0) + Number(c ?? 0);
  const m = Number(((xt = i == null ? void 0 : i.pool) == null ? void 0 : xt.attribute) ?? 0) + Number((($t = i == null ? void 0 : i.pool) == null ? void 0 : $t.skill) ?? 0) + Number(((R = i == null ? void 0 : i.pool) == null ? void 0 : R.bonus) ?? 0) + Number(((B = i == null ? void 0 : i.pool) == null ? void 0 : B.specialization) ?? 0), f = Math.max(0, m + Number(d ?? 0)), p = e.intent !== "initiative", h = p ? vw({ actor: a, ctx: i, payload: e }) : null, g = (be = h == null ? void 0 : h.pre) != null && be.spent ? 4 : Number(i.diceTarget ?? i.target ?? 5), y = {
    snapshot: ((gt = (Pe = (te = game.mwd) == null ? void 0 : te.personalCombat) == null ? void 0 : Pe.getSnapshot) == null ? void 0 : gt.call(Pe, a)) ?? null
  }, b = Rt({
    actor: a,
    phase: "onBuildRoll",
    facts: Do({ actor: a, resolved: i, payload: e, runtime: y }),
    packet: {},
    options: { runtime: y, consumeUsage: !0 }
  });
  await fi({ actor: a, mutations: b.mutations, runtime: y }), p && ((k = h == null ? void 0 : h.pre) != null && k.spent) && ((N = h == null ? void 0 : h.pre) != null && N.poolKey) && await ((j = a.spendEdge) == null ? void 0 : j.call(a, h.pre.poolKey, 1));
  let S, T = 0, E = 0;
  if (i.rollType === "sum" && ((he = i.sum) != null && he.formula))
    S = await new Roll(i.sum.formula, i.sum.data ?? {}).evaluate(), T = Number(S.total ?? 0) + Number(d ?? 0);
  else {
    S = await new Roll(`${f}d6cs>=${g}`).evaluate();
    const W = (le = S.dice) == null ? void 0 : le[0];
    T = Array.isArray(W == null ? void 0 : W.results) ? W.results.filter((de) => de.success).length : 0, E = Array.isArray(W == null ? void 0 : W.results) ? W.results.filter((de) => de.result === 1).length : 0;
  }
  if (i.intent === "initiative" && (S == null ? void 0 : S.total) != null) {
    const W = { total: Number(S.total ?? 0) + Number(d ?? 0) }, de = Rt({
      actor: a,
      phase: "onInitiativeResolved",
      facts: Uu({ actor: a, packet: W, runtime: y }),
      packet: W,
      options: { runtime: y, consumeUsage: !0 }
    });
    if (await fi({ actor: a, mutations: de.mutations, runtime: y }), de.modifiers.length) {
      const ri = de.modifiers.reduce((Ct, gi) => Ct + Number(gi.value ?? 0), 0);
      u = u.concat(de.modifiers), d += ri, T = Number(de.packet.total ?? 0), await Dc({ actor: a, total: de.packet.total ?? S.total }), i.breakdown = (i.breakdown ?? []).concat(de.modifiers.map((Ct, gi) => ({
        id: `traitInitiative${gi + 1}`,
        label: Ct.label,
        value: Number(Ct.value ?? 0)
      })));
    } else
      T = Number(W.total ?? 0), await Dc({ actor: a, total: W.total });
  }
  const P = Bd(
    i,
    { successes: T, raw: (Ee = S == null ? void 0 : S.toJSON) == null ? void 0 : Ee.call(S) },
    null
    // opposed rolls can pass defender result later
  ), C = P == null ? void 0 : P.edgeEarned;
  if ((C == null ? void 0 : C.amount) > 0) {
    const W = (Be = i == null ? void 0 : i.domains) != null && Be.includes("physical") ? "physical" : (Ye = i == null ? void 0 : i.domains) != null && Ye.includes("mental") ? "mental" : (at = i == null ? void 0 : i.domains) != null && at.includes("social") ? "social" : null, de = yw(a, W);
    await ((kt = a.gainEdge) == null ? void 0 : kt.call(a, de, C.amount)), P.edgeEarned.pool = de;
  }
  i.intent === "overload" && await Ew({ actor: a, passed: P.passed });
  let H = null;
  i.intent === "attack" && (H = await Ld({
    attacker: a,
    ctx: i,
    outcomeModel: P
  }));
  const Y = rw({
    actor: a,
    payload: e,
    ctx: i,
    roll: S,
    target: g,
    pool: f,
    mods: u,
    modTotal: d,
    hits: T,
    ones: E,
    edge: h,
    outcomeModel: P
  });
  H && (Y.attackResult = H);
  const Q = await Da({ resolved: Y });
  if (e.intent === "attack" && e.weaponId) {
    const W = ((Se = (X = a.items) == null ? void 0 : X.get) == null ? void 0 : Se.call(X, e.weaponId)) ?? null;
    (Xe = W == null ? void 0 : W.isPersonalWeapon) != null && Xe.call(W) && (await ((Ze = W.consumePayload) == null ? void 0 : Ze.call(W, { payloadId: e.payloadId })) || (je = ui.notifications) == null || je.warn(`Payload could not be consumed for ${W.name}.`));
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
function vw({ actor: a, ctx: e, payload: t }) {
  var p, h, g, y, b, S, T;
  const i = kw(e == null ? void 0 : e.domains), n = Mw[i] ?? null, s = (n == null ? void 0 : n.a) ?? null, r = (n == null ? void 0 : n.b) ?? null, o = [s, r].filter(Boolean), l = !!((p = t == null ? void 0 : t.toggles) != null && p.useEdge) || !!(t != null && t.useEdge);
  let c = String(((g = (h = t == null ? void 0 : t.edge) == null ? void 0 : h.pre) == null ? void 0 : g.poolKey) ?? "").trim() || null;
  c && !o.includes(c) && (c = null);
  const u = l && c ? 1 : 0;
  let d = [...o];
  u && c && (d = d.filter((E) => E !== c));
  let m = String(((b = (y = t == null ? void 0 : t.edge) == null ? void 0 : y.post) == null ? void 0 : b.poolKey) ?? "").trim() || null;
  m && !d.includes(m) && (m = null);
  const f = Number(((T = (S = t == null ? void 0 : t.edge) == null ? void 0 : S.post) == null ? void 0 : T.spent) ?? 0) ? 1 : 0;
  return {
    domain: i,
    pools: n ? { a: s, b: r } : null,
    pre: { poolKey: c, spent: u },
    post: { poolKey: m, spent: f },
    allowed: { prePools: o, postPools: d }
  };
}
function kw(a) {
  return Array.isArray(a) ? a.includes("physical") ? "physical" : a.includes("mental") ? "mental" : a.includes("social") ? "social" : null : null;
}
const Mw = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};
async function Dc({ actor: a, total: e }) {
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
async function Ew({ actor: a, passed: e }) {
  e || await a.update({ "system.burn.overloaded": !0 });
}
const Cw = /* @__PURE__ */ new Set(["physical", "mental", "social"]);
function Pw(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function Nw(a) {
  if (!a) return;
  const e = String(a).trim().toLowerCase();
  return Cw.has(e) ? e : void 0;
}
class Rw {
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
          const c = Pw(l.value);
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
            domain: Nw(l.domain)
          });
        }
    }
    return i;
  }
}
class Iw {
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
      const r = ws(s), o = r ? Ts(r, e) ? r.modifierKey : "" : s, l = ba == null ? void 0 : ba[o];
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
class Dw {
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
class Ow {
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
const _w = {
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
class Lw {
  constructor() {
    D(this, "id", "mwd.lifeModules");
    D(this, "label", "Life Modules");
  }
  collect({ actor: e, resolved: t } = {}) {
    return zh({ actor: e, resolved: t });
  }
}
class xw {
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
    return Rt({
      actor: e,
      phase: "onBuildRoll",
      facts: Do({ actor: e, resolved: t, payload: i, runtime: n }),
      packet: {},
      options: { runtime: n, consumeUsage: !1 }
    }).modifiers;
  }
}
const $w = Object.freeze({
  attackCQPenalty: { value: -1, intents: ["attack"], label: "Attack CQ Penalty" },
  sensorPenalty: { value: -1, skills: ["perception", "technician"], label: "Sensor Penalty" },
  pilotingPenalty: { value: -1, skills: ["piloting"], label: "Piloting Penalty" }
});
class Bw {
  constructor() {
    D(this, "id", "mwd.machineCriticals");
    D(this, "label", "Machine Criticals");
  }
  collect({ actor: e, resolved: t, payload: i } = {}) {
    var l, c, u;
    const n = Ad(e);
    if (!n.length) return [];
    const s = String((t == null ? void 0 : t.intent) ?? (i == null ? void 0 : i.intent) ?? "").trim(), r = String(((c = (l = t == null ? void 0 : t.attack) == null ? void 0 : l.skill) == null ? void 0 : c.code) ?? ((u = t == null ? void 0 : t.skill) == null ? void 0 : u.code) ?? (i == null ? void 0 : i.key) ?? "").trim(), o = [];
    for (const d of n)
      for (const m of d.mods ?? []) {
        const f = $w[m];
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
function zw() {
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
function Fw() {
  return {
    get(a) {
      return Ot(a);
    },
    getSkills({ withKnowledge: a = !1 } = {}) {
      return Jn();
    },
    list() {
      return Jn();
    }
  };
}
function Uw() {
  return {
    get(a) {
      return Ri(a);
    },
    list() {
      return Rs();
    },
    listByType(a) {
      return zo(a);
    },
    getTypeLabel(a) {
      return Ea(a);
    },
    evaluate(a) {
      return Di(a);
    }
  };
}
function Hw() {
  return {
    normalizeQualitySystem(a) {
      return Kt(a);
    },
    getEditorConfig() {
      return xu();
    },
    evaluatePhase(a) {
      return Rt(a);
    },
    applyMutations(a) {
      return fi(a);
    },
    buildRollFacts(a) {
      return Do(a);
    },
    buildActionCostFacts(a) {
      return Fu(a);
    },
    buildBurnFacts(a) {
      return In(a);
    },
    buildInitiativeFacts(a) {
      return Uu(a);
    },
    buildDamageFacts(a) {
      return Hu(a);
    },
    buildEdgeFacts(a) {
      return Cr(a);
    },
    buildEndOfActivationFacts(a) {
      return Wu(a);
    }
  };
}
class tl {
  static start() {
    const e = new tl();
    Hooks.once("init", () => e.onInit()), Hooks.once("ready", () => e.onReady());
  }
  async onInit() {
    console.log(ve + "AnarchySystem.onInit"), game.system.mwd = this, game.system.anarchy = this, game.mwd ?? (game.mwd = {}), zw(), Qb(), Py("mwd"), game.mwd.roll = Rc, game.mwd.attacks = mc, game.mwd.personalCombat = x, game.mwd.harm = vt, this.roll = Rc, this.attacks = mc, this.personalCombat = x, this.harm = vt, this.skills = Fw(), this.lifeModules = Uw(), this.traits = Hw(), this.remoteCall = new Tr(), game.system.mwd.skills = this.skills, game.system.mwd.lifeModules = this.lifeModules, game.system.mwd.traits = this.traits, game.mwd.skills = this.skills, game.mwd.lifeModules = this.lifeModules, game.mwd.traits = this.traits, Te.init(), this.modifiers = new ue(), Jt.register(new Rw()), Jt.register(new Iw()), Jt.register(new Dw()), Jt.register(new Ow()), Jt.register(_w), Jt.register(new Lw()), Jt.register(new xw()), Jt.register(new Bw()), Jt.register(new iy()), Handlebars.registerHelper("mwdClassList", (e) => Array.isArray(e) ? e.join(" ") : typeof e == "string" ? e : ""), this.actorClasses = {
      character: Vl,
      npc: Vl,
      vehicle: Td,
      battlemech: Zg
    }, this.hooks = new Vi(), this.styles = new cg(), this.handlebarsManager = new Fo(), x.init(), db.register(), Hooks.on("updateSetting", (e) => {
      (e == null ? void 0 : e.key) === `${w}.statusConditionCatalog` && fl();
    }), console.log(ve + "AnarchySystem.onInit | loading system"), CONFIG.ANARCHY = Ie, CONFIG.Combat.initiative = { formula: "2d6" }, fl(), CONFIG.Actor.documentClass = lA, CONFIG.Item.documentClass = Pa, Pa.init(), Gd(), up(), zS(), aA(), await rA(), console.log(ve + "AnarchySystem.onInit | done");
  }
  async onReady() {
    if (console.log(ve + "AnarchySystem.onReady"), await x.onReady(), !game.user.isGM) return;
    await Oh();
    const e = game.settings.get(w, "enableGMGadget");
    if (!e) {
      console.log(`${ve}GMManager render skipped (enableGMGadget=false)`);
      return;
    }
    game.mwd = game.mwd ?? {}, game.mwd.gmGadget = () => Ny({ systemId: w }).render({ force: !0 }), e && game.mwd.gmGadget();
  }
}
tl.start();
//# sourceMappingURL=index.mjs.map
