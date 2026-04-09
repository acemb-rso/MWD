var nu = Object.defineProperty;
var su = Object.getPrototypeOf;
var ru = Reflect.get;
var Wr = (a) => {
  throw TypeError(a);
};
var ou = (a, e, t) => e in a ? nu(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var D = (a, e, t) => ou(a, typeof e != "symbol" ? e + "" : e, t), Gn = (a, e, t) => e.has(a) || Wr("Cannot " + t);
var H = (a, e, t) => (Gn(a, e, "read from private field"), t ? t.call(a) : e.get(a)), Pe = (a, e, t) => e.has(a) ? Wr("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), $e = (a, e, t, i) => (Gn(a, e, "write to private field"), i ? i.call(a, t) : e.set(a, t), t), C = (a, e, t) => (Gn(a, e, "access private method"), t);
var Oi = (a, e, t) => ru(su(a), t, e);
const Ce = {
  TYPES: {
    Actor: {
      character: "Character",
      vehicle: "Vehicle/drone",
      battlemech: "Battlemech"
    },
    Item: {
      contact: "Contact",
      gear: "Gear",
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
}, v = Ce, T = "mwd", lu = "MechWarrior: Destiny", fs = `system.${T}`, cu = T, Ia = `systems/${T}`, sl = `${Ia}/style`, la = `${Ia}/third-party/style`, J = `systems/${T}/templates`, Cn = `${Ia}/img/icons`, le = `${Cn}/skills`, Ae = "MWD | ", uu = 2, du = 5, mu = 4, rl = 8, ri = {
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
}, ps = {
  autopilot: "autopilot",
  firewall: "firewall",
  knowledge: "knowledge"
}, it = {
  grit: "grit",
  chaos: "chaos",
  insight: "insight",
  rumor: "rumor",
  legend: "legend",
  credibility: "credibility"
}, sr = {
  physical: [it.grit, it.chaos],
  mental: [it.insight, it.rumor],
  social: [it.legend, it.credibility]
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
    contact: "contact",
    lifeModule: "lifeModule"
  },
  actorAttributes: ri,
  itemAttributes: ps,
  attributes: { ...ri, ...ps },
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
    edgePools: it,
    edgePoolGroups: sr,
    physical: {
      grit: it.grit,
      chaos: it.chaos
    },
    mental: {
      insight: it.insight,
      rumor: it.rumor
    },
    social: {
      legend: it.legend,
      credibility: it.credibility
    },
    chaos: it.chaos
  },
  area: {
    none: "none",
    shotgun: "shotgun",
    circle: "circle",
    cone: "cone",
    rect: "rect",
    ray: "ray"
  }
}, fu = Object.freeze({
  physical: "physical",
  mental: "mental",
  social: "social"
});
Object.freeze(Object.values(fu));
const Ji = {
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
}, Kn = {
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
}, Ye = {
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
  SYSTEM_DESCRIPTION: lu,
  SYSTEM_SOCKET: fs,
  SYSTEM_SCOPE: cu,
  SYSTEM_PATH: Ia,
  STYLE_PATH: sl,
  THIRD_PARTY_STYLE_PATH: la,
  TEMPLATES_PATH: J,
  ICONS_PATH: Cn,
  ICONS_SKILLS_PATH: le,
  LOG_HEAD: Ae,
  SPECIALIZATION_BONUS: uu,
  TARGET_SUCCESS: du,
  TARGET_SUCCESS_EDGE: mu,
  BASE_MONITOR: rl,
  ACTOR_ATTRIBUTES: ri,
  ITEM_ATTRIBUTES: ps,
  EDGE_POOL_GROUPS: sr,
  TEMPLATE: A,
  ANARCHY_SYSTEM: Ye
};
const zt = class zt {
  static ascending(e = (t) => t) {
    return (t, i) => zt.sortingBy(e(t), e(i));
  }
  static descending(e = (t) => t) {
    return (t, i) => zt.sortingBy(e(i), e(t));
  }
  static sortingBy(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
  }
  static bySortedArray(e) {
    return (t) => e.indexOf(t);
  }
  static ascendingBySortedArray(e) {
    return zt.ascending(zt.bySortedArray(e));
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
    return e.map(t).filter((i) => i != null).reduce(zt.sum(), 0);
  }
  static divint(e, t) {
    return Math.floor(e / t);
  }
  static divup(e, t) {
    return Math.ceil(e / t);
  }
  static join(e, t = "") {
    return e.reduce(zt.joiner(t));
  }
  static joiner(e = "") {
    return (t, i) => t + e + i;
  }
  static classify(e, t = (i) => i.type) {
    let i = {};
    return zt.classifyInto(i, e, t), i;
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
D(zt, "isString", (e) => typeof e == "string" || e instanceof String);
let se = zt;
const pu = {
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
    const e = Object.values(Ji).flat();
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
    return pu;
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
let Se = I;
class hu {
  static monitor(e) {
    return Se.getFromList(Se.getMonitors(), e) ?? "";
  }
  static letter(e) {
    return Se.getFromList(Se.getMonitorLetters(), e) ?? "";
  }
}
class gu {
  static toLowerCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}
const yu = [
  "fas fa-dice",
  "fas fa-dice-one",
  "fas fa-dice-two",
  "fas fa-dice-three",
  "fas fa-dice-four",
  "fas fa-dice-five",
  "fas fa-dice-six"
];
class K {
  static fontAwesome(e) {
    return `<i class="${e}"></i>`;
  }
  static iconSystemPath(e, t) {
    return K.iconPath(`${sl}/${e}`, t);
  }
  static iconPath(e, t) {
    return `<img class="${t}" src="${e}" />`;
  }
  static iconD6(e) {
    if (e < 0 || e > 6)
      throw `Dice ${e} is out of dice range [1..6] or 0 for multidice`;
    return K.fontAwesome(yu[e]);
  }
}
globalThis.ANARCHY_ICONS = K;
const Te = (a, e = {}) => a.replace(/\{(.*?)\}/g, (t, i) => e[i] ?? "");
function rr(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => rr(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function Ta(a = []) {
  return Array.from(new Set(a.map((e) => String(e ?? "").trim()).filter(Boolean)));
}
function Qa(a, e = "standard") {
  return String(a ?? "").trim() || e;
}
function bu(a, e = {}) {
  a && (a.movedToKeywords ?? (a.movedToKeywords = []), a.movedToKeywords.push(e));
}
function Su(a, e, t = {}) {
  a && (a.errors ?? (a.errors = []), a.errors.push({ message: e, ...t }));
}
const or = Object.freeze(["templated"]), Au = Object.freeze([
  "burstCapable",
  "fullAutoCapable",
  "salvoCapable"
]), wu = Object.freeze([
  "clustered",
  "mineLayer",
  "smoke",
  "incendiary",
  "emp"
]), Tu = Object.freeze([
  { value: "burstCapable", label: "Burst Capable" },
  { value: "fullAutoCapable", label: "Full Auto Capable" },
  { value: "salvoCapable", label: "Salvo Capable" }
]), vu = Object.freeze([
  { value: "templated", label: "Templated" },
  { value: "clustered", label: "Clustered" },
  { value: "mineLayer", label: "Mine Layer" },
  { value: "smoke", label: "Smoke" },
  { value: "incendiary", label: "Incendiary" },
  { value: "emp", label: "EMP" }
]), ol = Object.freeze([
  { value: "blast", label: "Blast" },
  { value: "cone", label: "Cone" },
  { value: "line", label: "Line" },
  { value: "cloud", label: "Cloud" },
  { value: "minefield", label: "Minefield" }
]), ll = Object.freeze([
  { value: "targeted", label: "Targeted" },
  { value: "origin", label: "Origin" },
  { value: "placed", label: "Placed" }
]), ku = Object.freeze(["blast", "cone", "line"]);
new Set(or);
const Eu = /* @__PURE__ */ new Set([
  ...or,
  ...Au
]), Mu = /* @__PURE__ */ new Set([
  ...or,
  ...wu
]);
function lr() {
  return {
    movedToKeywords: [],
    errors: []
  };
}
function fn(a) {
  return Ta(rr(a));
}
function cl({
  traits: a = [],
  keywords: e = [],
  recognized: t = /* @__PURE__ */ new Set(),
  report: i = null,
  owner: n = "weapon",
  path: s = ""
} = {}) {
  const r = rr(a), o = fn(e), l = [], c = [...o];
  for (const u of r) {
    if (t.has(u)) {
      l.push(u);
      continue;
    }
    c.push(u), bu(i, {
      owner: n,
      from: s || "traits",
      to: s ? s.replace(/traits$/u, "keywords") : "keywords",
      value: u
    });
  }
  return {
    traits: Ta(l),
    keywords: Ta(c)
  };
}
function ul({
  traits: a = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.traits"
} = {}) {
  return cl({
    traits: a,
    keywords: e,
    recognized: Eu,
    report: t,
    owner: "weapon",
    path: i
  });
}
function dl({
  traits: a = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.payloads[].traits"
} = {}) {
  return cl({
    traits: a,
    keywords: e,
    recognized: Mu,
    report: t,
    owner: "payload",
    path: i
  });
}
function ml(a = {}, e = "standard") {
  const t = a ?? {}, i = Qa(
    t.resolverKey ?? t.damageModel ?? t.resolver,
    e
  ), n = String(t.damageModel ?? "").trim(), s = t.onHitEffect;
  return {
    resolverKey: i,
    damageModel: n,
    onHitEffect: s === null ? null : String(s ?? "").trim() || null
  };
}
function Vn(a = {}) {
  const e = a ?? {}, t = !!e.enabled, i = e.shots, n = e.accuracyMod, s = e.addHeat, r = e.consumption;
  return {
    enabled: t,
    ...i !== void 0 ? { shots: Math.max(0, Number(i ?? 0) || 0) } : {},
    ...n !== void 0 ? { accuracyMod: Number(n ?? 0) || 0 } : {},
    ...s !== void 0 ? { addHeat: Number(s ?? 0) || 0 } : {},
    ...r !== void 0 ? { consumption: Math.max(0, Number(r ?? 0) || 0) } : {}
  };
}
function Cu(a = {}) {
  const e = a ?? {};
  return {
    single: Vn(e.single),
    burst: Vn(e.burst),
    fullAuto: Vn(e.fullAuto)
  };
}
function Pu(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return e === "circle" ? "blast" : e === "ray" ? "line" : ol.some((t) => t.value === e) ? e : "";
}
function Nu(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return ["target", "targeted"].includes(e) ? "targeted" : ll.some((t) => t.value === e) ? e : "";
}
function Ru(a = null) {
  const e = a ?? {}, t = Pu(e.shape ?? e.t ?? e.type), i = e.size ?? e.distance ?? e.radius ?? e.length, n = Nu(e.placement ?? e.origin ?? e.mode);
  return !t && i === void 0 && !n ? null : {
    shape: t,
    size: Math.max(0, Number(i ?? 0) || 0),
    placement: n || "targeted"
  };
}
function Iu({
  weapon: a = {},
  payload: e = {},
  effectiveTraits: t = [],
  effectiveResolution: i = null,
  report: n = null
} = {}) {
  var g, y;
  const s = Ta((a == null ? void 0 : a.traits) ?? []), r = Ta((e == null ? void 0 : e.traits) ?? []), o = t.includes("templated"), l = s.includes("templated"), c = r.includes("templated"), u = (e == null ? void 0 : e.template) ?? null, d = (a == null ? void 0 : a.template) ?? null, m = Qa((g = e == null ? void 0 : e.resolution) == null ? void 0 : g.resolverKey, ""), f = Qa((y = a == null ? void 0 : a.resolution) == null ? void 0 : y.resolverKey, ""), p = Qa(i == null ? void 0 : i.resolverKey, "standard"), h = [];
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
    Su(n, b, { capability: "templated" });
  return {
    errors: h,
    liveCapabilities: ["templated"],
    template: u,
    resolverKey: p,
    isTemplated: !0
  };
}
const va = Object.freeze(["none", "minor", "major", "full"]), ee = Object.freeze({
  none: "none",
  minor: "minor",
  major: "major",
  full: "full"
}), Du = Object.freeze({
  none: 0,
  minor: 0.25,
  major: 0.5,
  full: 1
}), at = Object.freeze({
  discrete: "discrete",
  persistent: "persistent"
});
function ie(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function _u(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return ["true", "1", "yes", "y", "on"].includes(t) ? !0 : ["false", "0", "no", "n", "off"].includes(t) ? !1 : e;
}
function Re(a, e = ee.none) {
  const t = String(a ?? "").trim().toLowerCase();
  return va.includes(t) ? t : e;
}
function hs(a) {
  return Number(Du[Re(a)] ?? 0) || 0;
}
function mi(a) {
  return va.indexOf(Re(a));
}
function gs(a, e = 1) {
  const t = Math.max(0, mi(a)), i = Math.max(0, t - Math.max(0, Math.trunc(ie(e, 1))));
  return va[i] ?? ee.none;
}
function Ou(a, e = 1) {
  const t = Math.max(0, mi(a)), i = Math.min(va.length - 1, t + Math.max(0, Math.trunc(ie(e, 1))));
  return va[i] ?? ee.full;
}
function wt(a) {
  return Re(a).toUpperCase();
}
function cr(a = {}) {
  var n, s, r, o, l;
  const e = a ?? {}, t = Math.max(1, Math.trunc(ie(
    ((n = e == null ? void 0 : e.escalation) == null ? void 0 : n.intervalTurns) ?? ((s = e == null ? void 0 : e.escalation) == null ? void 0 : s.interval) ?? 1,
    1
  ))), i = Math.max(0, Math.trunc(ie(((r = e == null ? void 0 : e.escalation) == null ? void 0 : r.rate) ?? 1, 1)));
  return {
    startExposure: Re(e.startExposure, ee.minor),
    escalation: {
      rate: i,
      intervalTurns: t,
      max: Re((o = e == null ? void 0 : e.escalation) == null ? void 0 : o.max, ee.full)
    },
    onFull: {
      burnDelta: Math.max(0, Math.trunc(ie(((l = e == null ? void 0 : e.onFull) == null ? void 0 : l.burnDelta) ?? 0, 0)))
    },
    clearOnExit: _u(e.clearOnExit, !0)
  };
}
function ti(a = {}) {
  const e = a ?? {}, t = String(e.kind ?? at.discrete).trim().toLowerCase() === at.persistent ? at.persistent : at.discrete;
  return {
    kind: t,
    hazard: t === at.persistent ? cr(e.hazard ?? e) : null
  };
}
function Lu(a = {}) {
  return ti(a).kind === at.persistent;
}
function Mi(a, e) {
  return Math.max(0, Math.ceil(ie(a, 0) * hs(e)));
}
function xu(a) {
  var o, l, c, u, d, m, f, p, h;
  const e = (a == null ? void 0 : a.center) ?? ((o = a == null ? void 0 : a.object) == null ? void 0 : o.center) ?? null;
  if (e)
    return {
      x: ie(e.x, 0),
      y: ie(e.y, 0)
    };
  const t = ie((a == null ? void 0 : a.x) ?? ((l = a == null ? void 0 : a.document) == null ? void 0 : l.x), 0), i = ie((a == null ? void 0 : a.y) ?? ((c = a == null ? void 0 : a.document) == null ? void 0 : c.y), 0), n = ie((a == null ? void 0 : a.w) ?? ((u = a == null ? void 0 : a.object) == null ? void 0 : u.w) ?? ((d = a == null ? void 0 : a.document) == null ? void 0 : d.width), 1), s = ie((a == null ? void 0 : a.h) ?? ((m = a == null ? void 0 : a.object) == null ? void 0 : m.h) ?? ((f = a == null ? void 0 : a.document) == null ? void 0 : f.height), 1), r = ie(((p = canvas == null ? void 0 : canvas.grid) == null ? void 0 : p.size) ?? ((h = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : h.size), 100);
  return {
    x: t + n * r / 2,
    y: i + s * r / 2
  };
}
function $u(a = {}, e = {}) {
  return Math.hypot(ie(a.x, 0) - ie(e.x, 0), ie(a.y, 0) - ie(e.y, 0));
}
function fl() {
  var a, e, t;
  return ie(((e = (a = canvas == null ? void 0 : canvas.scene) == null ? void 0 : a.grid) == null ? void 0 : e.distance) ?? ((t = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : t.distance), 1) || 1;
}
function Bu() {
  var a, e;
  return ie(((a = canvas == null ? void 0 : canvas.grid) == null ? void 0 : a.size) ?? ((e = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : e.size), 100) || 100;
}
function ka(a = 0) {
  return ie(a, 0) * (Bu() / fl());
}
function zu(a = {}, e = {}) {
  const t = ie((e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size), 0);
  return t > 0 ? t : 0;
}
function ur(a) {
  return ie(a, 0) * Math.PI / 180;
}
function Fu({ placement: a = {}, tokenCenter: e = {} } = {}) {
  const t = (a == null ? void 0 : a.anchor) ?? { x: 0, y: 0 }, i = ur((a == null ? void 0 : a.direction) ?? 0), n = ie(e.x, 0) - ie(t.x, 0), s = ie(e.y, 0) - ie(t.y, 0), r = Math.cos(i), o = Math.sin(i);
  return Math.max(0, n * r + s * o);
}
function jr(a = 0, e = 0) {
  if (!(e > 0)) return ee.none;
  const t = Math.max(0, Math.min(1, a / e));
  return t <= 1 / 3 ? ee.full : t <= 2 / 3 ? ee.major : t <= 1 ? ee.minor : ee.none;
}
function pl({ template: a = {}, placement: e = {}, token: t = null } = {}) {
  if (!t) return ee.none;
  const i = xu(t), n = String((a == null ? void 0 : a.shape) ?? (e == null ? void 0 : e.shape) ?? "").trim().toLowerCase(), s = ka(zu(a, e));
  if (!(s > 0)) return ee.none;
  if (n === "line" || n === "cone") {
    const l = Fu({ placement: e, tokenCenter: i });
    return jr(l, s);
  }
  const r = (e == null ? void 0 : e.anchor) ?? { x: 0, y: 0 }, o = $u(r, i);
  return jr(o, s);
}
function gi({ tier: a = ee.none, appliedTier: e = null, evadeUsed: t = !1, evadeLocked: i = !1 } = {}) {
  const n = Re(a, ee.none), s = Re(e ?? n, n);
  return {
    initialTier: n,
    initialLabel: wt(n),
    initialMultiplier: hs(n),
    finalTier: s,
    finalLabel: wt(s),
    finalMultiplier: hs(s),
    evadeUsed: !!t,
    evadeLocked: !!i
  };
}
function dr(a = {}, { locked: e = !1, active: t = !1 } = {}) {
  const i = Re((a == null ? void 0 : a.initialTier) ?? (a == null ? void 0 : a.tier), ee.none);
  if (!t || e || i === ee.none)
    return gi({
      tier: i,
      appliedTier: i,
      evadeUsed: !1,
      evadeLocked: !!e
    });
  const n = gs(i, 1);
  return gi({
    tier: i,
    appliedTier: n,
    evadeUsed: i !== n,
    evadeLocked: !!e
  });
}
function hl(a = []) {
  return a.map((e) => ({
    x: Math.round(ie(e.x, 0)),
    y: Math.round(ie(e.y, 0))
  }));
}
function Uu({ placement: a = {} } = {}) {
  const e = (a == null ? void 0 : a.anchor) ?? { x: 0, y: 0 }, t = ka(ie(a.distance, 0)), i = ka(fl()) / 2, n = ur((a == null ? void 0 : a.direction) ?? 0), s = Math.cos(n), r = Math.sin(n), o = -r, l = s, c = {
    x: ie(e.x, 0) + t * s,
    y: ie(e.y, 0) + t * r
  };
  return {
    type: "polygon",
    points: hl([
      { x: e.x + o * i, y: e.y + l * i },
      { x: c.x + o * i, y: c.y + l * i },
      { x: c.x - o * i, y: c.y - l * i },
      { x: e.x - o * i, y: e.y - l * i }
    ])
  };
}
function Hu({ placement: a = {} } = {}) {
  const e = (a == null ? void 0 : a.anchor) ?? { x: 0, y: 0 }, t = ie(a == null ? void 0 : a.angle, 90), i = ka(ie(a.distance, 0)), n = ie(a == null ? void 0 : a.direction, 0), s = t / 2, r = [{ x: e.x, y: e.y }];
  for (let o = 0; o <= 8; o += 1) {
    const l = -s + t / 8 * o, c = ur(n + l);
    r.push({
      x: ie(e.x, 0) + Math.cos(c) * i,
      y: ie(e.y, 0) + Math.sin(c) * i
    });
  }
  return {
    type: "polygon",
    points: hl(r)
  };
}
function gl({ template: a = {}, placement: e = {} } = {}) {
  var i, n;
  const t = String((a == null ? void 0 : a.shape) ?? (e == null ? void 0 : e.shape) ?? "").trim().toLowerCase();
  if (!t) return [];
  if (t === "blast") {
    const s = ka(ie(e.distance ?? a.size, 0));
    return [{
      type: "ellipse",
      x: Math.round(ie((i = e == null ? void 0 : e.anchor) == null ? void 0 : i.x, 0) - s),
      y: Math.round(ie((n = e == null ? void 0 : e.anchor) == null ? void 0 : n.y, 0) - s),
      radiusX: Math.round(s),
      radiusY: Math.round(s),
      rotation: 0
    }];
  }
  return t === "line" ? [Uu({ placement: e })] : t === "cone" ? [Hu({ placement: e })] : [];
}
const yl = Object.freeze({
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}), pn = Object.freeze(
  Object.entries(yl).map(([a, e]) => ({ value: a, label: e }))
), Wu = Object.freeze({
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
}), ju = Object.freeze(
  pn.map((a) => a.value)
), ys = Object.freeze({}), Pn = Object.freeze({
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
}), qu = Object.freeze(
  Object.values(Pn).map((a) => ({
    value: a.key,
    label: a.label,
    rated: a.rated
  }))
), bl = Tl(ys), Sl = Tl(Pn);
function Nn(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => Nn(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function xt(a, e = "penetrating") {
  const t = String(a ?? "").trim().toLowerCase();
  return Wu[t] ?? e;
}
function Al(a) {
  const e = String(a ?? "").trim();
  return e ? xt(e, "") : "";
}
function wl(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return ju.includes(e);
}
function $t(a) {
  const e = xt(a, "");
  return yl[e] ?? String(a ?? "").trim();
}
function Wt(a) {
  const e = a ?? {}, t = Number(e.ballistic ?? 0) || 0, i = Number(e.melee ?? 0) || 0;
  return {
    penetrating: e.penetrating !== void 0 ? Number(e.penetrating ?? 0) || 0 : Math.max(t, i),
    concussive: e.concussive !== void 0 ? Number(e.concussive ?? 0) || 0 : Number(e.explosive ?? 0) || 0,
    energy: Number(e.energy ?? 0) || 0,
    thermal: Number(e.thermal ?? 0) || 0,
    electrical: Number(e.electrical ?? 0) || 0
  };
}
function Ja(a) {
  return Nn(a);
}
function aa(a) {
  return Nn(a);
}
function Gu(a) {
  return fn(a);
}
function Xa(a = {}, e = "standard") {
  return ml(a, e);
}
function Za(a = {}) {
  return Cu(a);
}
function Ku(a = null) {
  return Ru(a);
}
function Xi(a = "id") {
  var t, i;
  const e = (i = (t = globalThis.foundry) == null ? void 0 : t.utils) == null ? void 0 : i.randomID;
  return typeof e == "function" ? e() : `${a}-${Math.random().toString(36).slice(2, 10)}`;
}
function Tl(a) {
  const e = {};
  return Object.values(a).forEach((t) => {
    [t.key, ...t.aliases ?? []].forEach((i) => {
      e[Ea(i)] = t.key;
    });
  }), Object.freeze(e);
}
function Ea(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function na(a) {
  return Array.isArray(a) ? a : a && typeof a == "object" ? Object.values(a) : a == null || a === "" ? [] : [a];
}
function vl(a, e) {
  return na(a).map((t) => Vu(t, e)).filter(Boolean);
}
function Vu(a, e) {
  if (typeof a == "string" || typeof a == "number") {
    const i = e[Ea(a)];
    return i ? { id: Xi("trait"), key: i, rating: 1 } : null;
  }
  if (!a || typeof a != "object") return null;
  const t = e[Ea(a.key ?? a.value ?? a.name)];
  return t ? {
    id: String(a.id ?? "").trim() || Xi("trait"),
    key: t,
    rating: Math.max(0, Number(a.rating ?? 0) || 0)
  } : null;
}
function Ti(a) {
  return vl(a, bl);
}
function Yt(a) {
  return vl(a, Sl);
}
function hn(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function Yu(a = {}, e = {}) {
  const t = hn(a), i = hn(e);
  return {
    close: t.close + i.close,
    near: t.near + i.near,
    far: t.far + i.far,
    extreme: t.extreme + i.extreme
  };
}
function Qu(a, e) {
  var t;
  return ((t = e[a]) == null ? void 0 : t.label) ?? a;
}
function kl(a, e) {
  var n;
  const t = Qu(a == null ? void 0 : a.key, e), i = Math.max(0, Number((a == null ? void 0 : a.rating) ?? 0) || 0);
  return (n = e[a == null ? void 0 : a.key]) != null && n.rated && i > 0 ? `${t} ${i}` : t;
}
function El(a, e) {
  return na(a).map((t) => {
    const i = t == null ? void 0 : t.key, n = e[i];
    return n != null && n.resolve ? {
      entry: t,
      effect: n.resolve(t),
      label: kl(t, e)
    } : null;
  }).filter(Boolean);
}
function Ju(a, e) {
  const t = { ...a ?? {} };
  return Object.entries(e ?? {}).forEach(([i, n]) => {
    t[i] = (Number(t[i] ?? 0) || 0) + (Number(n ?? 0) || 0);
  }), t;
}
function Xu(a = []) {
  const e = {}, t = /* @__PURE__ */ new Set();
  for (const i of a.filter(Boolean)) {
    i.accuracyMod !== void 0 && (e.accuracyMod = (Number(e.accuracyMod ?? 0) || 0) + (Number(i.accuracyMod ?? 0) || 0)), i.ap !== void 0 && (e.ap = (Number(e.ap ?? 0) || 0) + (Number(i.ap ?? 0) || 0)), i.addHeat !== void 0 && (e.addHeat = (Number(e.addHeat ?? 0) || 0) + (Number(i.addHeat ?? 0) || 0)), i.bonusVsArmorTag && (e.bonusVsArmorTag = Ju(e.bonusVsArmorTag, i.bonusVsArmorTag));
    for (const n of i.flags ?? []) {
      const s = String(n ?? "").trim();
      s && t.add(s);
    }
  }
  return t.size > 0 && (e.flags = Array.from(t)), e;
}
function Zu(a = [], e = []) {
  const t = Array.isArray(a) || typeof a == "string" ? { traits: a, standardTraits: e } : a ?? {}, i = aa(t.traits), n = Ti(t.standardTraits), s = El(n, ys), r = i.map((o) => {
    var u;
    const l = bl[Ea(o)];
    if (!l) return null;
    const c = (u = ys[l]) == null ? void 0 : u.resolve;
    return typeof c == "function" ? c({ key: l, rating: 1 }) : null;
  });
  return Xu([
    ...s.map((o) => o.effect),
    ...r
  ]);
}
function ed(a) {
  const e = a ?? {}, t = lr(), i = dl({
    traits: e.traits,
    keywords: e.keywords,
    report: t,
    path: "ammo.types[].traits"
  });
  return {
    id: String(e.id ?? "").trim() || Xi("ammo"),
    name: String(e.name ?? "").trim() || "Ammo",
    damageType: Al(e.damageType),
    apMod: Number(e.apMod ?? e.ap ?? 0) || 0,
    attackRatingBandMod: hn(e.attackRatingBandMod ?? e.attackRatingBand),
    traits: i.traits,
    keywords: i.keywords,
    migration: t
  };
}
function td(a) {
  var l;
  const e = a ?? {}, t = Math.max(0, Number(e.max ?? 0) || 0), i = Number(e.current), n = Number.isFinite(i) ? Math.max(0, Math.min(i, t > 0 ? t : i)) : Math.max(0, t), s = na(e.types).map(ed), r = String(e.activeTypeId ?? "").trim(), o = s.some((c) => c.id === r) ? r : ((l = s[0]) == null ? void 0 : l.id) ?? "";
  return {
    current: n,
    max: t,
    consumePerAttack: Math.max(1, Number(e.consumePerAttack ?? 1) || 1),
    activeTypeId: o,
    types: s
  };
}
function id(a, e = "untracked") {
  const t = String(a ?? "").trim();
  return t ? t === "linked" ? "internal" : t === "perAttack" ? e : ["untracked", "internal", "actorResource", "itemRef"].includes(t) ? t : e : e;
}
function bs(a = {}) {
  const e = a ?? {};
  return {
    amount: Math.max(1, Number(e.amount ?? e.consumePerUse ?? e.consumePerAttack ?? 1) || 1),
    sourceId: String(e.sourceId ?? "").trim()
  };
}
function qr(a = {}) {
  const e = a ?? {};
  return {
    damageType: Al(e.damageType),
    ap: Number(e.ap ?? e.apMod ?? 0) || 0,
    attackRatingBand: hn(e.attackRatingBand ?? e.attackRatingBandMod)
  };
}
function Ss(a = {}) {
  return ml(a, "standard");
}
function ad(a) {
  return String(a ?? "").trim().toLowerCase() === "unloaded";
}
function dt(a, { report: e = null, path: t = "system.payloads[]" } = {}) {
  var l;
  const i = a ?? {}, n = String(i.id ?? "").trim() || Xi("payload"), s = dl({
    traits: i.traits ?? ((l = i.modifies) == null ? void 0 : l.traits),
    keywords: i.keywords,
    report: e,
    path: `${t}.traits`
  }), r = Nn(i.compatibleWith ?? i.compatible), o = Ku(i.template);
  return ad(n) ? {
    id: "unloaded",
    label: "Unloaded",
    compatibleWith: [],
    modifies: qr({}),
    traits: [],
    keywords: [],
    template: null,
    areaEffect: ti({ kind: "discrete" }),
    resolution: Ss({ resolverKey: "standard" }),
    consumption: bs({ amount: 1, sourceId: "" })
  } : {
    id: n,
    label: String(i.label ?? i.name ?? "").trim() || "Payload",
    compatibleWith: r,
    modifies: qr(i.modifies ?? i),
    traits: s.traits,
    keywords: s.keywords,
    template: o,
    areaEffect: ti(i.areaEffect ?? {}),
    resolution: Ss(i.resolution ?? i),
    consumption: bs(i.consumption ?? i)
  };
}
function Zt(a) {
  var o, l, c, u, d, m;
  const e = a ?? {}, t = id(
    e.kind || e.type || ((o = e.link) != null && o.actorPath || e.actorPath ? "actorResource" : "") || ((l = e.link) != null && l.itemId || e.itemId || (c = e.link) != null && c.itemPath || e.itemPath ? "itemRef" : "") || (e.tracking || e.current !== void 0 || e.max !== void 0 ? "internal" : "") || "untracked",
    "untracked"
  ), i = e.tracking ?? e, n = Math.max(0, Number(i.max ?? 0) || 0), s = Number(i.current), r = Number.isFinite(s) ? Math.max(0, Math.min(s, n > 0 ? n : s)) : Math.max(0, n);
  return {
    id: String(e.id ?? "").trim() || Xi("source"),
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
function Ml({ report: a = null, path: e = "system.payloads" } = {}) {
  return {
    payloads: [dt({
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
function Cl(a) {
  return String(a ?? "").trim().toLowerCase() === "melee";
}
function As(a = [], { report: e = null, path: t = "system.payloads" } = {}) {
  const i = na(a).map((n, s) => dt(n, { report: e, path: `${t}[${s}]` })).filter(Boolean);
  return i.some((n) => n.id === "unloaded") ? i : [
    dt({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: e, path: `${t}[0]` }),
    ...i
  ];
}
function Rn(a = {}, { report: e = null, path: t = "system.payloads" } = {}) {
  var d;
  const i = td(a), n = Math.max(1, Number(i.consumePerAttack ?? 1) || 1), s = i.max > 0, r = s ? "internal-magazine" : "untracked", o = [Zt(s ? {
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
  })], l = i.types.length ? i.types.map((m, f) => dt({
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
  }, { report: e, path: `${t}[${f}]` })) : [dt({
    id: "unloaded",
    label: "Unloaded",
    resolution: { resolverKey: "standard" },
    consumption: {
      amount: n,
      sourceId: s ? r : ""
    }
  }, { report: e, path: `${t}[0]` })], c = As(l, { report: e, path: t }), u = c.some((m) => m.id === i.activeTypeId) ? i.activeTypeId : ((d = c[0]) == null ? void 0 : d.id) ?? "unloaded";
  return {
    payloads: c,
    selectedPayloadId: u,
    consumptionSources: o
  };
}
function Qt(a, { legacyAmmo: e = null, category: t = "", report: i = null, path: n = "system.payloads" } = {}) {
  if (Cl(t)) return [];
  const s = na(a).map((r, o) => dt(r, { report: i, path: `${n}[${o}]` })).filter(Boolean);
  return s.length > 0 ? As(s, { report: i, path: n }) : e ? As(Rn(e, { report: i, path: n }).payloads, { report: i, path: n }) : Ml({ report: i, path: n }).payloads;
}
function ca(a, { legacyAmmo: e = null } = {}) {
  const t = na(a).map(Zt).filter(Boolean);
  return t.length > 0 ? t : e ? Rn(e).consumptionSources : Ml().consumptionSources;
}
function zi(a, e = [], { legacyAmmo: t = null, category: i = "" } = {}) {
  var r;
  if (Cl(i)) return "";
  const n = Qt(e, { legacyAmmo: t, category: i }), s = String(a ?? "").trim();
  if (n.some((o) => o.id === s)) return s;
  if (t) {
    const o = Rn(t).selectedPayloadId;
    if (n.some((l) => l.id === o)) return o;
  }
  return ((r = n[0]) == null ? void 0 : r.id) ?? "unloaded";
}
function Gr({ root: a = null, path: e = "", fallback: t = {} } = {}) {
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
function nd({ source: a = null, actor: e = null } = {}) {
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
    const u = Gr({
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
    const u = ((c = (l = e == null ? void 0 : e.items) == null ? void 0 : l.get) == null ? void 0 : c.call(l, t.itemId)) ?? null, d = Gr({
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
function ws({
  payloads: a = [],
  selectedPayloadId: e = "",
  consumptionSources: t = [],
  actor: i = null,
  payloadId: n = "",
  category: s = ""
} = {}) {
  const r = Qt(a, { category: s }), o = ca(t), l = zi(n || e, r, { category: s }), c = r.find((f) => f.id === l) ?? r[0] ?? null, u = (c == null ? void 0 : c.consumption) ?? bs(), d = u.sourceId ? o.find((f) => f.id === u.sourceId) ?? null : o.find((f) => f.kind === "untracked") ?? Zt({
    id: "untracked",
    label: "Untracked",
    kind: "untracked"
  }), m = nd({ source: d, actor: i });
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
function sd({
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
  var q, Z, ae, ue, oe;
  const g = ws({
    payloads: l != null && l.length ? l : void 0,
    selectedPayloadId: c || p,
    consumptionSources: u,
    actor: m,
    payloadId: d || p,
    category: h
  }), b = ((!l || l.length === 0) && f ? ws({
    ...Rn(f),
    actor: m,
    payloadId: d || p,
    category: h
  }) : null) ?? g, S = b.activePayload, w = ul({
    traits: i,
    keywords: n
  }), M = Array.from(/* @__PURE__ */ new Set([
    ...w.traits,
    ...aa(S == null ? void 0 : S.traits)
  ])), N = fn([
    ...w.keywords,
    ...fn(S == null ? void 0 : S.keywords)
  ]), P = Xa(r, "standard"), L = (q = S == null ? void 0 : S.resolution) != null && q.resolverKey ? Ss(S.resolution) : P, V = Za(o), G = lr(), W = Iu({
    weapon: {
      traits: w.traits,
      resolution: P
    },
    payload: S,
    effectiveTraits: M,
    effectiveResolution: L,
    report: G
  }), j = Ti(s), O = Zu({
    traits: [],
    standardTraits: j
  }), x = {
    ...b.sourceState
  };
  return delete x.sourceItem, {
    damageType: ((Z = S == null ? void 0 : S.modifies) == null ? void 0 : Z.damageType) || xt(a),
    ap: (Number(e ?? 0) || 0) + (Number(((ae = S == null ? void 0 : S.modifies) == null ? void 0 : ae.ap) ?? 0) || 0),
    attackRatingBand: Yu(
      t,
      ((ue = S == null ? void 0 : S.modifies) == null ? void 0 : ue.attackRatingBand) ?? {}
    ),
    effects: O,
    traits: M,
    keywords: N,
    standardTraits: j,
    payloadLabel: b.payloadLabel,
    payload: S ? foundry.utils.deepClone(S) : null,
    payloadState: {
      payloads: b.payloads.map((E) => foundry.utils.deepClone(E)),
      activePayloadId: b.activePayloadId,
      payloadLabel: b.payloadLabel,
      sourceId: ((oe = b.source) == null ? void 0 : oe.id) ?? "",
      sourceLabel: b.sourceState.label ?? "",
      sourceKind: b.sourceState.kind ?? "untracked",
      isTracked: b.sourceState.isTracked,
      current: b.sourceState.current,
      max: b.sourceState.max,
      consumePerUse: b.sourceState.consumePerUse
    },
    source: b.source ? foundry.utils.deepClone(b.source) : null,
    sourceState: foundry.utils.deepClone(x),
    template: W.template ? foundry.utils.deepClone(W.template) : null,
    areaEffect: ti((S == null ? void 0 : S.areaEffect) ?? {}),
    resolution: foundry.utils.deepClone(L),
    resolverKey: String((L == null ? void 0 : L.resolverKey) ?? "standard").trim() || "standard",
    fireModes: foundry.utils.deepClone(V),
    capabilityReport: {
      ...G,
      liveCapabilities: W.liveCapabilities,
      isTemplated: W.isTemplated,
      template: W.template ? foundry.utils.deepClone(W.template) : null,
      resolverKey: String((L == null ? void 0 : L.resolverKey) ?? "standard").trim() || "standard"
    },
    ammoLabel: b.payloadLabel,
    ammoType: S ? foundry.utils.deepClone(S) : null,
    ammoState: {
      current: x.current,
      max: x.max,
      consumePerAttack: x.consumePerUse,
      activeTypeId: b.activePayloadId,
      types: b.payloads.map((E) => {
        var U;
        return {
          id: E.id,
          name: E.label,
          damageType: ((U = E.modifies) == null ? void 0 : U.damageType) ?? "",
          traits: E.traits ?? [],
          keywords: E.keywords ?? []
        };
      }),
      isTracked: x.isTracked,
      ammoLabel: b.payloadLabel
    }
  };
}
function Pl(a = {}, e = {}) {
  const t = Wt(a), i = Wt(e);
  return {
    penetrating: t.penetrating + i.penetrating,
    concussive: t.concussive + i.concussive,
    energy: t.energy + i.energy,
    thermal: t.thermal + i.thermal,
    electrical: t.electrical + i.electrical
  };
}
function Yn({ standardTraits: a = [], traits: e = [], traitState: t = {} } = {}) {
  var m, f;
  const i = Yt(a), s = aa(e).map((p) => {
    const h = Sl[Ea(p)];
    return h ? { id: Xi("trait"), key: h, rating: h === "reinforced" ? 1 : 0 } : null;
  }).filter(Boolean), r = El(
    [...i, ...s],
    Pn
  ), o = r.reduce((p, h) => {
    var g;
    return Pl(p, ((g = h.effect) == null ? void 0 : g.mitigationByType) ?? {});
  }, Wt({})), l = r.reduce(
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
function rd({ traits: a = [], standardTraits: e = [] } = {}) {
  return [
    ...aa(a),
    ...Yt(e).map((i) => kl(i, Pn))
  ].filter(Boolean);
}
function mr(a) {
  const e = Math.max(0, Number(a ?? 0) || 0);
  return e <= 0 ? 0 : Math.ceil(e / 4);
}
function od({
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
  const n = xt(t, "penetrating"), s = Wt(e), r = mr(i), o = Number(s[n] ?? 0) || 0;
  return {
    currentArmorRating: i,
    baseMitigation: r,
    typeMitigationMod: o,
    totalMitigation: r + o,
    isDestroyed: !1
  };
}
function ld({ damageIncoming: a = 0, armorTags: e = [], effects: t = {} } = {}) {
  const i = new Set(Ja(e));
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
class Ri {
  static checkSufficient(e, t, i) {
    if (t > i) {
      const n = Te(v.common.errors.insufficient, {
        resource: e,
        required: t,
        available: i
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkOutOfRange(e, t, i, n) {
    if (t < i || t > n) {
      const s = Te(v.common.errors.outOfRange, {
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
      const i = Te(v.common.errors.expectedType, {
        type: e.type ? v.itemType.singular[e.type] : e.type,
        expectedType: t
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkActorCanReceiveDamage(e, t, i) {
    if (!t) {
      const n = Te(v.common.errors.actorCannotReceiveDamage, {
        actor: i.name,
        damageType: wl(e) ? $t(e) : v.actor.monitors[e] ?? v.mwd.weaponDamageType[e] ?? v.mwd.personalDamageType[e] ?? e
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkWeaponDefense(e, t) {
    var n;
    const i = e.getDefense();
    if ((((n = e.isPersonalWeapon) == null ? void 0 : n.call(e)) ?? e.type === A.itemType.personalWeapon) && !i) {
      const s = Te(v.common.errors.noDefenseOnWeapon, { actor: t.name, weapon: e.name });
      throw ui.notifications.error(s), s;
    }
  }
  static checkTargetsCount(e, t, i) {
    if (e > 0 && t.length > e) {
      const n = Te(v.common.errors.maxTargetsExceedeed, {
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
      const n = Te(v.common.errors.actorDoesNotHaveDefense, {
        actor: t.name,
        defense: i.labelkey,
        actorType: v.actorType[t.type]
      });
      throw ui.notifications.error(n), n;
    }
  }
}
function Bt(a, e, t, i, n, s = (r) => !0) {
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
function $a(a, e) {
  return {
    code: a,
    labelkey: v.defense[a],
    label: v.defense[a],
    actionCode: e
  };
}
const _e = A.actorAttributes, Oe = A.actorTypes, tt = Ye.actions, Ba = Ye.defenses, Qn = [
  Bt(tt.defense, (a) => _e.reflexes, (a) => _e.intelligence, K.fontAwesome("fas fa-shield-alt"), [Oe.character, Oe.npc]),
  Bt(tt.defense, (a) => _e.handling, (a) => _e.chassis, K.fontAwesome("fas fa-tachometer-alt"), [Oe.vehicle, Oe.battlemech]),
  Bt(tt.resistTorture, (a) => _e.strength, (a) => _e.willpower, K.fontAwesome("fas fa-angry"), [Oe.character, Oe.npc]),
  Bt(tt.perception, (a) => _e.logic, (a) => _e.willpower, K.fontAwesome("fas fa-eye"), [Oe.character, Oe.npc]),
  Bt(tt.perception, (a) => _e.system, (a) => _e.handling, K.fontAwesome("fas fa-video"), [Oe.vehicle, Oe.battlemech]),
  Bt(tt.composure, (a) => _e.charisma, (a) => _e.willpower, K.fontAwesome("fas fa-meh"), [Oe.character, Oe.npc]),
  Bt(tt.judgeIntentions, (a) => _e.charisma, (a) => _e.charisma, K.fontAwesome("fas fa-theater-masks"), [Oe.character, Oe.npc]),
  Bt(tt.memory, (a) => _e.logic, (a) => _e.logic, K.fontAwesome("fas fa-brain"), [Oe.character, Oe.npc]),
  Bt(tt.catch, (a) => _e.reflexes, (a) => _e.reflexes, K.fontAwesome("fas fa-baseball-ball"), [Oe.character, Oe.npc]),
  Bt(tt.lift, (a) => _e.strength, (a) => _e.strength, K.fontAwesome("fas fa-dumbbell"), [Oe.character, Oe.npc])
], za = [
  $a(Ba.physicalDefense, tt.defense),
  $a(Ba.physicalResistance, tt.resistTorture),
  $a(Ba.socialDefense, tt.composure),
  $a(Ba.mentalResistance, tt.perception)
];
class Ne {
  static init() {
    Handlebars.registerHelper("fixedDefenseCode", (e) => Ne.fixedDefenseCode(e));
  }
  static all(e = void 0) {
    return e ? Qn.filter(e) : Qn;
  }
  static getActorActions(e) {
    return Qn.filter((t) => t.actorTypes.includes(e.type) && t.condition(e));
  }
  static fixedDefenseCode(e) {
    return Ye.fixedDefenseCode[e] ?? e;
  }
  static getActorDefenses(e) {
    return za.map((t) => {
      const i = Ne.getActorAction(e, t.actionCode);
      return Ne._convertToDefense(i, t);
    }).filter((t) => t == null ? void 0 : t.code);
  }
  static getDefenseAttributeAction(e) {
    var t;
    return (t = za.find((i) => i.code == e)) == null ? void 0 : t.actionCode;
  }
  static getActorAction(e, t) {
    return Ne.getActorActions(e).find((i) => i.code == t);
  }
  static getActorDefense(e, t) {
    t = Ne.fixedDefenseCode(t);
    const i = za.find((s) => s.code == t), n = Ne.getActorAction(e, i.actionCode);
    return Ri.checkActorDefenseAction(n, e, i), Ne._convertToDefense(n, i);
  }
  static _convertToDefense(e, t) {
    return e ? foundry.utils.mergeObject(
      t,
      e ?? {},
      { overwrite: !1, inplace: !1 }
    ) : void 0;
  }
  static getDefenses() {
    return za;
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
class Ts {
  constructor() {
    this.remoteCalls = {}, game.socket.on(fs, async (e) => this.onSocketMessage(e));
  }
  static async register(e, t) {
    game.system.anarchy.remoteCall._register(e, t);
  }
  async _register(e, t) {
    if (this.remoteCalls[e])
      throw `RemoteCall msg ${e} is already registered`;
    foundry.utils.mergeObject(t, {
      callback: (i) => {
        console.log(Ae + "RemoteCall [", e, "] (", i, ")");
      },
      condition: (i) => !0,
      multiple: !1
      /* true if multiple users should handle the message */
    }, { overwrite: !1 }), this.remoteCalls[e] = t, console.log(Ae + "RemoteCall registered", e);
  }
  static call(e, t) {
    return game.system.anarchy.remoteCall._remoteCall(e, t);
  }
  _remoteCall(e, t) {
    const i = this.remoteCalls[e];
    return !i || i.condition(game.user) || !i.multiple && Dt.isUniqueConnectedGM() ? !1 : (game.socket.emit(fs, { msg: e, data: t }), !0);
  }
  async onSocketMessage(e) {
    const t = this.remoteCalls[e.msg];
    if (t) {
      const i = t.condition(game.user), n = t.multiple, s = Dt.isUniqueConnectedGM();
      i && (n || s) ? t.callback(e.data) : console.log(Ae + "RemoteCall.onSocketMessage(", e, ") ignored :", i, n, s);
    } else
      console.log(Ae + "RemoteCall: No callback registered for", e);
  }
}
const Kr = "Users.blindMessageToGM";
class Dt {
  static init() {
    Ts.register(Kr, {
      callback: (e) => Dt.blindMessageToGM(e),
      condition: (e) => e.isGM
    });
  }
  static blindMessageToGM(e) {
    Ts.call(Kr, e) || ChatMessage.create({
      user: e.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      blind: !0,
      content: Te(v.chat.blindMessageToGM, {
        user: game.user.name,
        message: e.content
      })
    });
  }
  static getUsers(e = (t) => !0) {
    return (game.version ? game.users : game.users.entities).filter(e);
  }
  static firstConnectedGM() {
    return Dt.getUsers((e) => e.isGM && e.active).sort(se.ascending((e) => e.id)).at(0) ?? {};
  }
  /**
   * @returns true pour un seul utilisateur: le premier GM connecté par ordre d'id
   */
  static isUniqueConnectedGM(e = game.user) {
    return e.id == Dt.firstConnectedGM().id;
  }
  static firstResponsible(e) {
    if (!(e != null && e.testUserPermission))
      return;
    const t = Dt.getUsers(
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
const Li = v.actor.monitors, Kt = v.actor.counters, Nl = {
  armor: {
    path: "system.monitors.armor.value",
    monitor: (a) => a.system.monitors.armor,
    iconChecked: K.fontAwesome("fas fa-shield-slash"),
    iconUnchecked: K.fontAwesome("fas fa-shield-alt"),
    iconHit: K.fontAwesome("fas fa-bahai"),
    resource: Li.armor
  },
  fatigue: {
    path: "system.monitors.fatigue.value",
    monitor: (a) => a.system.monitors.fatigue,
    iconChecked: K.fontAwesome("fas fa-grimace"),
    iconUnchecked: K.fontAwesome("far fa-smile"),
    iconHit: K.fontAwesome("fas fa-bahai"),
    resource: Li.fatigue,
    overflow: (a) => A.monitors.physical,
    useArmor: !0
  },
  physical: {
    path: "system.monitors.physical.value",
    monitor: (a) => a.system.monitors.physical,
    iconChecked: K.fontAwesome("fas fa-heartbeat"),
    iconUnchecked: K.fontAwesome("far fa-heart"),
    iconHit: K.fontAwesome("fas fa-bahai"),
    resource: Li.physical,
    useArmor: !0
  },
  structure: {
    path: "system.monitors.structure.value",
    monitor: (a) => a.system.monitors.structure,
    iconChecked: K.fontAwesome("fas fa-car-crash"),
    iconUnchecked: K.fontAwesome("fas fa-car-alt"),
    iconHit: K.fontAwesome("fas fa-bahai"),
    resource: Li.structure
  },
  heat: {
    path: "system.monitors.heat.value",
    monitor: (a) => a.system.monitors.heat,
    iconChecked: K.fontAwesome("fas fa-fire"),
    iconUnchecked: K.fontAwesome("far fa-sun"),
    iconHit: K.fontAwesome("fas fa-temperature-high"),
    resource: Li.heat
  },
  criticals: {
    path: "system.hybrid.criticals.value",
    monitor: (a) => {
      var e;
      return ((e = a.system.hybrid) == null ? void 0 : e.criticals) ?? { value: 0, max: 0 };
    },
    iconChecked: K.fontAwesome("fas fa-bolt"),
    iconUnchecked: K.fontAwesome("far fa-dot-circle"),
    iconHit: K.fontAwesome("fas fa-exclamation-triangle"),
    resource: Li.structure
  },
  anarchy: {
    path: "system.counters.anarchy.value",
    monitor: (a) => ({
      value: a.system.counters.anarchy.value,
      max: 6
    }),
    iconChecked: K.iconPath(`${la}/anarchy-point.webp`, "checkbar-img"),
    iconUnchecked: K.iconPath(`${la}/anarchy-point-off.webp`, "checkbar-img"),
    resource: Kt.anarchy
  },
  plot: {
    path: "system.counters.anarchy.value",
    monitor: (a) => {
      const e = a.system.counters.anarchy.value;
      return { value: e, max: e + 1 };
    },
    iconChecked: K.iconPath(`${la}/danger-point.webp`, "checkbar-img"),
    iconUnchecked: K.iconPath(`${la}/danger-point-off.webp`, "checkbar-img"),
    resource: Kt.anarchy
  },
  sceneAnarchy: {
    path: "system.counters.edgePools.chaos.value",
    monitor: (a) => {
      const e = a.getEdgePoolValue(A.counters.edgePools.chaos), t = a.getAttributeValue(A.actorAttributes.edge);
      return { value: e, max: t };
    },
    iconChecked: K.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    iconUnchecked: K.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    resource: Kt.edgePools.chaos
  },
  grit: {
    path: "system.counters.edgePools.grit.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.grit), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: K.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    iconUnchecked: K.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    resource: Kt.edgePools.grit
  },
  insight: {
    path: "system.counters.edgePools.insight.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.insight), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: K.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    iconUnchecked: K.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    resource: Kt.edgePools.insight
  },
  legend: {
    path: "system.counters.edgePools.legend.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.legend), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: K.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    iconUnchecked: K.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    resource: Kt.edgePools.legend
  },
  credibility: {
    path: "system.counters.edgePools.credibility.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.credibility), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: K.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    iconUnchecked: K.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    resource: Kt.edgePools.credibility
  },
  rumor: {
    path: "system.counters.edgePools.rumor.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.rumor), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: K.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    iconUnchecked: K.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    resource: Kt.edgePools.rumor
  }
}, Pt = foundry.utils.mergeObject(Nl, {});
class B {
  static init() {
    Handlebars.registerHelper("iconCheckbar", B.iconCheckbar), Handlebars.registerHelper("iconCheckbarHit", B.iconHit);
  }
  static hackCheckbars(e) {
    if (e) {
      const t = foundry.utils.mergeObject(Nl, {});
      foundry.utils.mergeObject(t, e, { recursive: !0 }), foundry.utils.mergeObject(Pt, t, { overwrite: !0 });
    }
  }
  static iconCheckbar(e, t) {
    return t ? B.iconChecked(e) : B.iconUnchecked(e);
  }
  static iconChecked(e) {
    var t;
    return (t = Pt[e]) == null ? void 0 : t.iconChecked;
  }
  static iconUnchecked(e) {
    var t;
    return (t = Pt[e]) == null ? void 0 : t.iconUnchecked;
  }
  static iconHit(e) {
    var t, i;
    return ((t = Pt[e]) == null ? void 0 : t.iconHit) ?? ((i = Pt[e]) == null ? void 0 : i.iconChecked);
  }
  static useArmor(e) {
    var t;
    return (t = Pt[e]) == null ? void 0 : t.useArmor;
  }
  static max(e, t) {
    var n;
    const i = (n = Pt[t]) == null ? void 0 : n.monitor(e);
    return ((i == null ? void 0 : i.max) ?? 0) + ((i == null ? void 0 : i.maxBonus) ?? 0);
  }
  static value(e, t) {
    var n;
    const i = (n = Pt[t]) == null ? void 0 : n.monitor(e);
    return (i == null ? void 0 : i.value) ?? 0;
  }
  static resistance(e, t, i = void 0) {
    return B.resistanceDetail(e, t, i).value;
  }
  static resistanceDetail(e, t, i = void 0) {
    var l, c;
    const n = (l = Pt[t]) == null ? void 0 : l.monitor(e), s = B._resolveResistance(n == null ? void 0 : n.resistance, i), r = B._resolveResistance(n == null ? void 0 : n.resistanceBonus, i), o = i === void 0 ? 0 : Number(((c = n == null ? void 0 : n.resistanceBonusByType) == null ? void 0 : c[i]) ?? 0);
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
    await B.setCounter(e, t, B.newValue(i, n), s, r);
  }
  static async addCounter(e, t, i, n = void 0) {
    if (i != 0) {
      const s = B.getCounterValue(e, t, n) ?? 0;
      await B.setCounter(e, t, s + i, n);
    }
  }
  static async setCounter(e, t, i, n = void 0, s = void 0) {
    switch (t) {
      case A.monitors.anarchy:
        return await B.setAnarchy(e, i);
      case A.monitors.sceneAnarchy:
        return await B.setSceneAnarchy(e, i);
    }
    return await B.setCheckbar(e, t, i);
  }
  static getCounterValue(e, t, i) {
    switch (t) {
      case A.monitors.anarchy:
        return B.getAnarchy(e, t);
    }
    return B.value(e, t);
  }
  static async setCheckbar(e, t, i) {
    if (i == B.getCounterValue(e, t))
      return;
    const n = Pt[t];
    if (n.path) {
      const s = B.max(e, t);
      if (s <= 0)
        return;
      await B._manageOverflow(n, e, t, i, s), i = Math.min(i, s), Ri.checkOutOfRange(n.resource, i, 0, s), await e.setCheckbarValue(n.path, i);
    }
  }
  static async _manageOverflow(e, t, i, n, s) {
    if (n > s) {
      const r = e.overflow ? e.overflow(t) : void 0, o = e.recomputeOverflow ? e.recomputeOverflow(n - s) : n - s;
      r && o > 0 && (B._notifyOverflow(t, i, o, r), await B.addCounter(t, r, o));
    }
  }
  static _notifyOverflow(e, t, i, n) {
    const s = Te(v.actor.monitors.overflow, {
      actor: e.name,
      monitor: v.actor.monitors[t],
      overflow: i,
      overflowMonitor: v.actor.monitors[n]
    });
    ui.notifications.warn(s);
  }
  static async _manageFatigueOverflow(e, t, i) {
    await B.addCounter(e, A.monitors.physical, t - i);
  }
  static async setAnarchy(e, t) {
    if (e.hasOwnAnarchy()) {
      if (e.hasGMAnarchy()) {
        await game.system.anarchy.gmAnarchy.setAnarchy(t), e.render();
        return;
      }
      await B._setAnarchyMonitor(e, A.monitors.anarchy, t);
    }
  }
  static async setSceneAnarchy(e, t) {
    await B._setAnarchyMonitor(e, A.monitors.sceneAnarchy, t);
  }
  static async _setAnarchyMonitor(e, t, i) {
    const n = B.value(e, t);
    await B.setCheckbar(e, t, i), game.user.isGM || B.notifyAnarchyChange(e, t, n, i);
  }
  static getAnarchy(e, t) {
    return !game.user.isGM && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) || t == Kt.anarchy && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) ? 0 : B.value(e, t);
  }
  static notifyAnarchyChange(e, t, i, n) {
    Dt.blindMessageToGM({
      from: game.user.id,
      content: Te(
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
const { loadTemplates: cd, renderTemplate: ud } = foundry.applications.handlebars, Vr = {
  highlighted: ["far fa-times-circle", "fas fa-dice-one", "fas fa-dice-two", "fas fa-dice-three", "fas fa-dice-four", "fas fa-dice-five", "fas fa-dice-six"],
  dimmed: ["far fa-times-circle", "far fa-dice-one", "far fa-dice-two", "far fa-dice-three", "far fa-dice-four", "far fa-dice-five", "far fa-dice-six"]
};
class Jt {
  static init() {
    Hooks.once("ready", async () => await this.onReady()), Handlebars.registerHelper("dice-cursor-array", (e, t) => Jt.array(e ?? 0, t ?? 5)), Handlebars.registerHelper("dice-cursor-fas", (e, t) => Jt.fasClass(e, t)), Handlebars.registerHelper("dice-cursor-active", (e, t) => Jt.activeClass(e, t)), Handlebars.registerHelper("dice-cursor-color", (e, t) => Jt.colorClass(e, t));
  }
  static async onReady() {
    await cd([
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
    return Jt.isActive(e, t) ? "active" : "inactive";
  }
  static fasClass(e, t) {
    const i = Jt.isActive(e, t) ? Vr.highlighted : Vr.dimmed;
    return Jt.$getFas(i, Math.abs(e));
  }
  static colorClass(e, t) {
    return e == 0 || !t ? e < 0 ? "fixed-dice-malus" : "fixed-dice-bonus" : e < 0 ? "variable-dice-malus" : "variable-dice-bonus";
  }
  static $getFas(e, t) {
    return e[t > 6 ? t % 6 : t];
  }
  static async diceCursor({ value: e, min: t, max: i, editable: n }) {
    return await ud("systems/mwd/templates/roll/parts/dice-cursor.hbs", {
      value: e,
      min: t,
      max: i,
      editable: n
    });
  }
}
const xe = {
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
}, Yr = "anarchy-", Rl = `${T}.${xe.ANARCHY_HACK}`, vs = {
  id: T,
  name: "Standard Shadowrun Anarchy",
  hack: {
    checkbars: () => Pt
  }
};
globalThis.ANARCHY_HOOKS = xe;
globalThis.SETTING_KEY_ANARCHY_HACK = Rl;
globalThis.SHADOWRUN_ANARCHY_NO_HACK = vs;
class Ci {
  constructor() {
    this.hooks = [], this.hacks = {}, this.hackNames = {}, this.hookMethods = {}, this._register(xe.ANARCHY_HACK), Hooks.on(xe.ANARCHY_HACK, (e) => e(vs)), Hooks.on("updateSetting", async (e, t, i, n) => this.onUpdateSetting(e, t, i, n)), Hooks.once("ready", () => this.onReady()), Hooks.on("getSceneControlButtons", (e) => {
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
    Hooks.callAll(xe.ANARCHY_HACK, (e) => {
      this.hacks[e.id] = e, this.hackNames[e.id] = e.name;
    }), game.settings.register(T, xe.ANARCHY_HACK, {
      scope: "world",
      name: v.settings.anarchyHack.name,
      hint: v.settings.anarchyHack.hint,
      config: !0,
      default: vs.id,
      choices: this.hackNames,
      type: String
    }), this.applySelectedAnarchyHack();
  }
  async onUpdateSetting(e, t, i, n) {
    e.key == Rl && this.applySelectedAnarchyHack();
  }
  applySelectedAnarchyHack() {
    const e = this.getSelectedHack();
    e && B.hackCheckbars(e.hack.checkbars());
  }
  selectHookMethod(e, t) {
    Hooks.callAll(t, (i, n) => {
      i == e && (this.hookMethods[t] = n);
    });
  }
  getSelectedHack() {
    return this.hacks[game.settings.get(T, xe.ANARCHY_HACK)];
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
    Ci.instance()._register(e);
  }
  _register(e) {
    if (console.log(Ae + "HooksManager.register", e), !e.startsWith(Yr))
      throw `For safety Anarchy Hooks names must be prefixed by '${Yr}'`;
    this.hooks.push(e);
  }
}
const Qr = [
  A.itemType.assetModule,
  A.itemType.mechWeapon,
  A.itemType.personalWeapon,
  "weapon"
];
class ce {
  constructor() {
    this.modifiers = {
      groups: Se.mapObjetToKeyValue(v.modifier.group, "key", "label"),
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
          label: v.modifier.group[e],
          effects: Se.hbsAttributes.map((t) => ({ key: t.value, label: t.labelkey })),
          categories: []
        };
    }
    return {
      label: v.modifier.group[e],
      effects: Se.mapObjetToKeyValue(v.modifier[e].effect, "key", "label"),
      categories: Se.mapObjetToKeyValue(v.modifier[e].category, "key", "label")
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
                return Se.getDamageTypes().map((s) => ({ key: s.value, label: s.labelkey }));
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
        return Se.getAttributes().map((i) => ({ key: i.value, label: i.labelkey }));
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
    const n = ce.buildRollModifiersFilter(t, i), s = (c) => c.group == "roll" && c.effect == i && n(c), r = ce._activeItems(e).map((c) => ce.itemModifiers(c, s)).reduce((c, u) => c.concat(u), []).sort(se.descending((c) => c.modifier.value)), o = ce.$sumAssetModuleModifiers(r.filter((c) => Qr.includes(c.item.type)).map((c) => c.modifier.value)), l = se.sumValues(r.filter((c) => !Qr.includes(c.item.type)).map((c) => c.modifier.value));
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
    const s = ce._createFilter(t, i, n), r = ce._activeItems(e).map((l) => ce.itemModifiers(l, s)).reduce((l, c) => l.concat(c), []);
    return {
      value: se.sumValues(r, (l) => l.modifier.value),
      sources: r
    };
  }
  static sumMonitorModifiers(e, t, i, n = void 0) {
    return ce.sumModifiers(ce._activeItems(e), "monitor", t, i, n);
  }
  static sumModifiers(e, t, i, n, s = void 0) {
    const r = ce._createFilter(t, i, n, s), o = ce._activeItems(e).map((l) => ce.itemModifiers(l, r)).reduce((l, c) => l.concat(c), []);
    return se.sumValues(o, (l) => l.modifier.value);
  }
  static _createFilter(e, t, i, n = void 0) {
    return (s) => s.group == e && s.effect == (t ?? s.effect) && s.category == (i ?? s.category) && (n == null ? !0 : s.subCategory == n);
  }
  static countModifiers(e, t, i = void 0, n = void 0) {
    const s = ce._createFilter(t, i, n);
    return ce._activeItems(e).map((o) => ce.itemModifiers(o, s)).reduce((o, l) => o.concat(l), []).count;
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
const { loadTemplates: Jn, renderTemplate: ky } = foundry.applications.handlebars, be = {
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
}, Jr = 4, dd = [
  // attribute1
  {
    code: "attribute1",
    options: {
      order: 1,
      category: be.pool,
      hbsTemplateRoll: `${J}/roll/parts/select-attribute.hbs`
    },
    condition: (a) => Object.values(Ye.rollType).includes(a.mode),
    isUsed: (a) => !0,
    factory: (a) => {
      var t;
      const e = a.attribute1 ?? ((t = a.skill) == null ? void 0 : t.system.attribute);
      return {
        labelkey: e ? v.attributes[e] : v.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: a.skill },
        selected: e,
        choices: Se.getAttributes((i) => a.attributes.includes(i))
      };
    }
  },
  // attribute2
  {
    code: "attribute2",
    options: {
      order: 1,
      category: be.pool,
      hbsTemplateRoll: `${J}/roll/parts/select-attribute.hbs`,
      hbsTemplateChat: `${J}/chat/parts/pool-attribute2.hbs`
    },
    condition: (a) => [Ye.rollType.attribute, Ye.rollType.attributeAction, Ye.rollType.defense].includes(a.mode),
    isUsed: (a) => a.used,
    onChecked: (a, e) => a.used = !!e,
    factory: (a) => {
      const e = a.attribute2;
      return {
        labelkey: e ? v.attributes[e] : v.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: Ye.rollType.attribute == a.mode },
        selected: e,
        choices: Se.getAttributes((t) => a.attributes.includes(t))
      };
    }
  },
  // skill
  {
    code: "skill",
    options: {
      flags: {},
      order: 3,
      category: be.pool,
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
      category: be.pool,
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
      category: be.pool,
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
      category: be.pool,
      hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 4
    },
    factory: (a) => Ai.computeRollModifiers(be.pool, a)
  },
  // wounds
  {
    code: "wounds",
    options: {
      flags: { optional: !0 },
      order: 10,
      category: be.pool,
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
      category: be.pool,
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
      category: be.glitch,
      value: 0,
      labelkey: v.common.roll.modifiers.glitch,
      hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${J}/chat/parts/glitch.hbs`,
      min: 0,
      max: 5
    },
    isUsed: (a) => a.value > 0,
    factory: (a) => {
      const e = a.actor.getWounds(), t = Ai.computeRollModifiers(be.glitch, a);
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
      category: be.glitch,
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
      category: be.reroll,
      labelkey: v.common.roll.modifiers.reroll,
      hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: Jr
    },
    factory: (a) => {
      const e = Ai.computeRollModifiers(be.reroll, a), t = Ai.computeRollModifiers(be.rerollMax, a);
      return foundry.utils.mergeObject(e, {
        max: Jr + Math.max(0, t.value ?? 0)
      });
    }
  },
  // reduction from opponent
  {
    code: "reduced",
    options: {
      order: 29,
      category: be.pool,
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
      category: be.rerollForced,
      labelkey: v.common.roll.modifiers.rerollForced,
      hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 0
    },
    factory: (a) => {
      var t;
      const e = Ai.computeRollModifiers(be.successReroll, a);
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
      category: be.pool,
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
      category: be.risk,
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
      category: be.edge,
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
      category: be.opponentPool,
      labelkey: v.common.roll.modifiers.opponentPool,
      hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => Ai.computeRollModifiers(be.opponentPool, a),
    condition: (a) => !a.attributeAction
  },
  // force opponent rerolls
  {
    code: "opponentReroll",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: be.opponentReroll,
      value: 0,
      labelkey: v.common.roll.modifiers.opponentReroll,
      hbsTemplateRoll: `${J}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => Ai.computeRollModifiers(be.opponentReroll, a),
    condition: (a) => !a.attributeAction
  }
];
class Ai {
  constructor() {
    this.registeredParameters = {}, Ci.register(xe.REGISTER_ROLL_PARAMETERS), Ci.register(xe.MODIFY_ROLL_PARAMETER), Hooks.on(xe.MODIFY_ROLL_PARAMETER, (e) => this._validate(e)), Hooks.once(xe.REGISTER_ROLL_PARAMETERS, (e) => dd.forEach(
      (t) => e(t)
    )), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(xe.REGISTER_ROLL_PARAMETERS, async (t) => {
      Hooks.callAll(xe.MODIFY_ROLL_PARAMETER, t), t.ignore || await this._register(t);
    });
    const e = se.distinct([].concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateRoll)).concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateChat)).filter((t) => typeof t == "string" && t.length > 0));
    await Jn(se.distinct(e)), await Jn([`${J}/roll/parts/parameter-label.hbs`]);
  }
  _validate(e) {
    e.code || (console.error(`${Ae} RollParameter does not have a code`, e), e.ignore = !0);
  }
  async _register(e) {
    if (this.registeredParameters[e.code]) {
      console.error(`${Ae} RollParameter ${e.code} is already registered`, e);
      return;
    }
    e.onChecked || (e.onChecked = (t, i) => t.used = i), e.onValue = (t, i) => t.value = i, this.registeredParameters[e.code] = e;
  }
  async _optionalLoadTemplate(e) {
    e && await Jn([e]);
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
const { ApplicationV2: md, HandlebarsApplicationMixin: fd } = foundry.applications.api, { loadTemplates: pd, renderTemplate: hd } = foundry.applications.handlebars;
var Mn, Il;
const Be = class Be extends fd(md) {
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
    await pd([
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
    const i = foundry.utils.mergeObject(Be.prepareActorRoll(e), {
      mode: Ye.rollType.attribute,
      attribute1: t
    });
    await Be.create(i);
  }
  static async rollAttributeAction(e, t) {
    const i = foundry.utils.mergeObject(Be.prepareActorRoll(e), {
      mode: Ye.rollType.attributeAction,
      attributeAction: t.code,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e)
    });
    await Be.create(i);
  }
  static async rollSkill(e, t, i) {
    const n = foundry.utils.mergeObject(Be.prepareActorRoll(e), {
      mode: Ye.rollType.skill,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? A.actorAttributes.reflexes,
      specialization: i
    });
    await Be.create(n);
  }
  static async rollWeapon(e, t, i, n) {
    const s = foundry.utils.mergeObject(Be.prepareActorRoll(e), {
      mode: Ye.rollType.weapon,
      weapon: i,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? e.getPhysicalAgility(),
      specialization: void 0,
      targeting: n
    });
    await Be.create(s);
  }
  static async rollDefense(e, t, i) {
    const n = foundry.utils.mergeObject(Be.prepareActorRoll(e), {
      mode: Ye.rollType.defense,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e),
      defenseAction: t.code,
      attackRoll: i.attackRoll,
      tokenId: i.defenderTokenId,
      choiceChatMessageId: i.choiceChatMessageId
    });
    await Be.create(n);
  }
  static async itemAttributeRoll(e, t) {
    const i = foundry.utils.mergeObject(Be.prepareActorRoll(e.actor), {
      mode: Ye.rollType.attribute,
      item: e,
      attribute1: t,
      attributes: e.actor.getUsableAttributes(e)
    });
    await Be.create(i);
  }
  static async create(e) {
    var r;
    const t = C(r = Be, Mn, Il).call(r, e), i = await hd(`${J}/roll/roll-dialog-title.hbs`, t), n = {
      id: `roll-dialog-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Be.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new Be({ roll: t }, n).render({ force: !0 });
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
      n.onChecked(n, i.currentTarget.checked), n.category == be.pool && await this._updateParameterValue(n, n.value), n.code == "edge" && this.html.find(`.parameter[data-parameter-code='${n.code}'] .edge-pool-select`).prop("disabled", !n.used);
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
    return await Jt.diceCursor({
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
Mn = new WeakSet(), Il = function(e) {
  const t = game.system.anarchy.rollParameters.build(e).sort(se.ascending((i) => i.order ?? 200));
  return foundry.utils.mergeObject(e, {
    ENUMS: Se.getEnums((i) => e.attributes.includes(i)),
    ANARCHY: v,
    parameters: t
  });
}, Pe(Be, Mn), D(Be, "PARTS", {
  body: {
    template: `${J}/roll/roll-dialog.hbs`
  }
});
let Ut = Be;
const fr = 2, ks = "skillSpecializationCatalog", gd = [
  { key: "running", label: "Running" },
  { key: "jumping", label: "Jumping" },
  { key: "swimming", label: "Swimming" },
  { key: "climbing", label: "Climbing" },
  { key: "acrobatics", label: "Acrobatics" }
], Dl = /* @__PURE__ */ new Set(), Gt = [
  // Strength
  { code: "athletics", label: "Athletics", attribute: "strength", icon: `${le}/athletics.svg`, domains: ["physical"], specializations: gd },
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
].map(yd);
for (const a of Gt)
  Dl.add(a.code);
function yd(a) {
  return {
    ...a,
    label: a.label ?? a.code,
    icon: a.icon ?? `${Ia}/icons/skills/skills.svg`,
    specializations: hr(a.specializations)
  };
}
function pr(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function hr(a = []) {
  const e = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((t) => {
    const i = pr((t == null ? void 0 : t.key) ?? (t == null ? void 0 : t.label) ?? t);
    return !i || e.has(i) ? null : (e.add(i), {
      key: i,
      label: String((t == null ? void 0 : t.label) ?? (t == null ? void 0 : t.key) ?? t ?? i).trim() || i
    });
  }).filter(Boolean);
}
function bd(a = []) {
  const e = new Error(a[0] ?? "Invalid skill specialization data.");
  return e.validationErrors = a, e;
}
function Sd() {
  const a = {};
  for (const e of Gt) {
    const t = (Array.isArray(e.specializations) ? e.specializations : []).map((i) => String((i == null ? void 0 : i.label) ?? "").trim()).filter(Boolean);
    t.length && (a[e.code] = t);
  }
  return a;
}
const Ad = Object.freeze(Sd());
function wd(a, e = [], { strict: t = !1, errors: i = [] } = {}) {
  var s, r;
  if (!Array.isArray(e)) {
    if (t) {
      const o = ((s = Es(a)) == null ? void 0 : s.label) ?? a;
      i.push(`${o}: expected an array of specialization labels.`);
    }
    return [];
  }
  const n = [];
  for (const o of e) {
    const l = String(o ?? "").trim();
    if (!l) {
      if (t) {
        const c = ((r = Es(a)) == null ? void 0 : r.label) ?? a;
        i.push(`${c}: specialization labels cannot be blank.`);
      }
      continue;
    }
    n.push(l);
  }
  return hr(n).map((o) => o.label);
}
function Es(a) {
  return Gt.find((e) => e.code === a);
}
function _l(a, { strict: e = !1 } = {}) {
  const t = a && typeof a == "object" && !Array.isArray(a) ? a : {}, i = [], n = {};
  for (const [s, r] of Object.entries(t)) {
    if (!Dl.has(s)) {
      e && i.push(`Unknown skill code "${s}".`);
      continue;
    }
    const o = wd(s, r, { strict: e, errors: i });
    o.length && (n[s] = o);
  }
  if (e && i.length) throw bd(i);
  return Object.fromEntries(
    Gt.map((s) => [s.code, n[s.code]]).filter(([, s]) => Array.isArray(s) && s.length)
  );
}
function Td() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${ks}`))
      return game.settings.get(T, ks);
  } catch {
  }
  return xl();
}
function Ol() {
  const a = _l(Td(), { strict: !1 });
  return Object.fromEntries(
    Object.entries(a).map(([e, t]) => [
      e,
      hr(t)
    ])
  );
}
function Ll(a = [], { allowedKeys: e = null } = {}) {
  const t = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((i) => pr(i)).filter((i) => !i || t.has(i) || e && !e.has(i) ? !1 : (t.add(i), !0));
}
function Ot(a) {
  const e = Es(a);
  if (e)
    return {
      ...e,
      specializations: Pi(e.code)
    };
}
function gn() {
  const a = Ol();
  return [...Gt].map((e) => ({
    ...e,
    specializations: [...a[e.code] ?? []]
  })).sort((e, t) => e.label.localeCompare(t.label));
}
function Pi(a) {
  return [...Ol()[a] ?? []];
}
function gr(a, e) {
  const t = pr(e);
  if (t)
    return Pi(a).find((i) => i.key === t);
}
function vd(a, e) {
  var t;
  return ((t = gr(a, e)) == null ? void 0 : t.label) ?? "";
}
function xl() {
  return foundry.utils.deepClone(Ad);
}
function In(a, { strict: e = !1 } = {}) {
  return _l(a, { strict: e });
}
function yn(a = []) {
  return Ll(a);
}
function kd(a, e = []) {
  const t = new Set(Pi(a).map((n) => n.key)), i = new Set(Ll(e, { allowedKeys: t }));
  return Pi(a).filter((n) => i.has(n.key)).map((n) => n.key);
}
function Ms(a, e) {
  var t, i;
  return yn(
    ((i = (t = a == null ? void 0 : a.skills) == null ? void 0 : t[e]) == null ? void 0 : i.specializations) ?? []
  );
}
function Dn(a, e) {
  return kd(
    e,
    Ms(a, e)
  );
}
function $l(a, e) {
  const t = new Set(Dn(a, e));
  return Pi(e).filter((i) => t.has(i.key));
}
function Ed(a) {
  const e = Math.ceil(a.length / 2);
  return { left: a.slice(0, e), right: a.slice(e) };
}
function Md(a) {
  var e, t;
  a.skills ?? (a.skills = {});
  for (const i of Gt) {
    const n = (e = a.skills)[t = i.code] ?? (e[t] = {});
    n.rating == null && (n.rating = 0), n.bonus == null && (n.bonus = 0), n.specializations = yn(n.specializations);
  }
}
function Bl(a, { bonusBySkill: e = null } = {}) {
  const t = gn(), { left: i, right: n } = Ed(t), s = (r) => {
    var y, b, S, w, M, N;
    const o = r.code, l = r.attribute, c = Number(((b = (y = a == null ? void 0 : a.skills) == null ? void 0 : y[o]) == null ? void 0 : b.rating) ?? 0), u = Number(((w = (S = a == null ? void 0 : a.attributes) == null ? void 0 : S[l]) == null ? void 0 : w.value) ?? 0), d = Number(((N = (M = a == null ? void 0 : a.skills) == null ? void 0 : M[o]) == null ? void 0 : N.bonus) ?? 0), m = Number((e == null ? void 0 : e[o]) ?? 0), f = d + m, p = $l(a, o), h = Pi(o).filter((P) => !p.some((L) => L.key === P.key)), g = u + c + f;
    return {
      code: o,
      label: r.label,
      icon: r.icon,
      attribute: l,
      attributeLabel: Se != null && Se.localizeAttribute ? Se.localizeAttribute(l) : l,
      rating: c,
      base: u,
      bonus: f,
      total: g,
      rollPayload: JSON.stringify({ intent: "skill", key: o }),
      canAddSpecialization: h.length > 0,
      specializations: p.map((P) => ({
        ...P,
        bonus: fr,
        rollPayload: JSON.stringify({
          intent: "skill",
          key: o,
          specializationKey: P.key,
          specializationLabel: P.label
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
const Cd = /* @__PURE__ */ new Set(["overloaded"]);
function Xr(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function Pd(a, e) {
  var i, n, s;
  if (!a) return null;
  const t = Xr(e) ?? Xr(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((s = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : s.call(i, ((n = t == null ? void 0 : t.baseActor) == null ? void 0 : n.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function zl(a) {
  const e = String(a ?? "").trim();
  if (!e) return "Status";
  const n = (e.includes(".") ? e.split(".").at(-1) : e).replace(/^status/i, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return n ? n.replace(/\b\w/g, (s) => s.toUpperCase()) : e;
}
function Nd(a) {
  const e = String((a == null ? void 0 : a.name) ?? (a == null ? void 0 : a.label) ?? (a == null ? void 0 : a.id) ?? "Status").trim();
  return e ? zl(e) : "Status";
}
function Rd(a) {
  const e = typeof (a == null ? void 0 : a.img) == "string" ? a.img.trim() : "";
  if (e) return e;
  const t = a ? Object.getOwnPropertyDescriptor(a, "icon") : null;
  return "value" in (t ?? {}) ? String(t.value ?? "").trim() : "";
}
function bn(a, e) {
  var t, i, n, s, r, o;
  return e === "overloaded" ? !!((i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.burn) != null && i.overloaded) || !!((s = (n = a == null ? void 0 : a.statuses) == null ? void 0 : n.has) != null && s.call(n, e)) : ((o = (r = a == null ? void 0 : a.statuses) == null ? void 0 : r.has) == null ? void 0 : o.call(r, e)) ?? !1;
}
function yr(a) {
  const e = /* @__PURE__ */ new Set();
  return (CONFIG.statusEffects ?? []).filter((t) => {
    const i = String((t == null ? void 0 : t.id) ?? "").trim();
    return !i || e.has(i) ? !1 : (e.add(i), !0);
  }).map((t) => {
    const i = String(t.id).trim();
    return {
      id: i,
      label: Nd(t),
      icon: Rd(t),
      active: bn(a, i),
      managed: Cd.has(i)
    };
  }).sort((t, i) => t.active !== i.active ? t.active ? -1 : 1 : t.label.localeCompare(i.label));
}
function Id(a) {
  if (!a.length)
    return "<p>No token statuses are configured.</p>";
  const e = foundry.utils.escapeHTML;
  return `
    <div class="mwd-token-status-dialog">
      <p style="margin-top: 0;">Toggle the statuses shown on this token.</p>
      <div style="display: grid; gap: 0.2rem; max-height: 20rem; overflow-y: auto; padding-right: 0.25rem;">
        ${a.map((i) => {
    const n = i.active ? "checked" : "", s = i.icon ? `<img src="${e(i.icon)}" alt="" width="20" height="20" style="flex: 0 0 20px; border: 0;" />` : "", r = i.managed ? '<small style="opacity: 0.7;">Managed by system state</small>' : "";
    return `
      <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.2rem 0;">
        <input type="checkbox" name="status" value="${e(i.id)}" ${n} />
        ${s}
        <span style="flex: 1 1 auto;">${e(i.label)}</span>
        ${r}
      </label>
    `;
  }).join("")}
      </div>
    </div>
  `;
}
async function Dd({ actor: a, effects: e, selectedStatusIds: t }) {
  const i = new Set(t);
  for (const n of e) {
    const s = i.has(n.id);
    await Fl({ actor: a, statusId: n.id, active: s });
  }
}
async function Fl({ actor: a, statusId: e, active: t }) {
  if (!a || !e) return !1;
  const i = bn(a, e);
  return !!t === i ? !1 : e === "overloaded" ? (await a.update({ "system.burn.overloaded": !!t }), !0) : (await a.toggleStatusEffect(e, { active: !!t, overlay: !1 }), !0);
}
async function _d({ actor: a, token: e } = {}) {
  var n;
  if (!a || !e) return !1;
  const t = Pd(a, e), i = yr(t);
  return i.length ? foundry.applications.api.DialogV2.wait({
    window: {
      title: `Token Statuses: ${e.name ?? a.name ?? "Token"}`
    },
    position: {
      width: 420
    },
    content: Id(i),
    buttons: [
      {
        action: "apply",
        label: "Apply",
        icon: "fa-solid fa-check",
        default: !0,
        callback: async (s, r) => {
          var o, l;
          try {
            const c = Array.from(
              ((o = r.form) == null ? void 0 : o.querySelectorAll('input[name="status"]:checked')) ?? []
            ).map((u) => u.value);
            return await Dd({ actor: t, effects: i, selectedStatusIds: c }), !0;
          } catch (c) {
            return console.error("MWD | Failed to update token statuses", c), (l = ui.notifications) == null || l.error("Unable to update token statuses."), !1;
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
const Od = Object.freeze({
  STR: ri.strength,
  REF: ri.reflexes,
  WIL: ri.willpower,
  INT: ri.intelligence,
  CHA: ri.charisma
}), Ld = Object.freeze({
  STR: "Strength",
  REF: "Reflexes",
  WIL: "Willpower",
  INT: "Intelligence",
  CHA: "Charisma"
}), xd = Object.freeze({
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
function br(a) {
  const e = String(a ?? "").trim();
  return e ? xd[e] ?? null : null;
}
function $d(a) {
  const e = br(a);
  return e ? {
    intent: "common",
    id: e.id
  } : null;
}
function Bd(a) {
  return Od[String(a ?? "").trim().toUpperCase()] ?? null;
}
function zd(a) {
  return Ld[String(a ?? "").trim().toUpperCase()] ?? String(a ?? "").trim().toUpperCase();
}
function Fd(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => String(e ?? "").trim().toUpperCase()).filter(Boolean).join(" + ");
}
const Sr = Object.freeze([
  { value: "positive", label: "Positive" },
  { value: "negative", label: "Negative" },
  { value: "narrative", label: "Narrative" }
]), Ar = Object.freeze([
  { value: "minor", label: "Minor" },
  { value: "major", label: "Major" }
]), Ul = Object.freeze([
  { value: "passive", label: "Passive" },
  { value: "triggered", label: "Triggered" }
]), Hl = Object.freeze([
  { value: "rollMod", label: "Roll Modifier" },
  { value: "burnAdjust", label: "Burn Adjust" },
  { value: "actionCostMod", label: "Action Cost Mod" },
  { value: "initiativeMod", label: "Initiative Mod" },
  { value: "damageMod", label: "Damage Intake Mod" },
  { value: "edgeEvent", label: "Edge Event" }
]), Wl = Object.freeze([
  { value: "onBuildRoll", label: "Build Roll" },
  { value: "onBeforeBurnApplied", label: "Before Burn Applied" },
  { value: "onBeforeActionCostFinalized", label: "Before Action Cost Finalized" },
  { value: "onInitiativeResolved", label: "Initiative Resolved" },
  { value: "onDamageResolved", label: "Damage Resolved" },
  { value: "onEndOfActivation", label: "End of Activation" },
  { value: "onEdgeSpend", label: "Edge Spend" },
  { value: "onEdgeGain", label: "Edge Gain" }
]), wr = Object.freeze([
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
]), jl = Object.freeze([
  { value: "adjustAmount", label: "Adjust Amount" },
  { value: "grantPool", label: "Grant Pool" }
]), Ud = new Set(Sr.map((a) => a.value)), Hd = new Set(Ar.map((a) => a.value)), Wd = new Set(Ul.map((a) => a.value)), jd = new Set(Hl.map((a) => a.value)), ql = new Set(Wl.map((a) => a.value)), qd = new Set(wr.map((a) => a.value)), Gd = new Set(jl.map((a) => a.value));
function re(a, e = "") {
  return String(a ?? "").trim() || e;
}
function me(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Sn(a) {
  return foundry.utils.deepClone(a);
}
function Gl(a = []) {
  return (Array.isArray(a) ? a : typeof a == "string" ? a.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function Kd(a) {
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
function Xn(a) {
  const e = Math.max(0, Math.trunc(me(a, 0)));
  return e > 0 ? e : 0;
}
function fi(a = {}) {
  const e = a && typeof a == "object" ? a : {};
  return {
    perActivation: Xn(e.perActivation),
    perRound: Xn(e.perRound),
    perScene: Xn(e.perScene)
  };
}
function Vd(a = {}) {
  const e = a && typeof a == "object" ? a : {}, t = {
    id: re(e.id, foundry.utils.randomID()),
    fact: re(e.fact)
  }, i = wr.find((s) => e[s.value] !== void 0 && e[s.value] !== null), n = (i == null ? void 0 : i.value) ?? (qd.has(String(e.comparator ?? "").trim()) ? String(e.comparator).trim() : "eq");
  return t.comparator = n, n !== "truthy" && n !== "falsy" && (t.value = Kd(e[n] ?? e.value ?? "")), t;
}
function Xt(a = []) {
  return (Array.isArray(a) ? a : []).map(Vd);
}
function Yd(a = {}) {
  const e = a && typeof a == "object" ? a : {}, t = jd.has(String(e.type ?? "").trim()) ? String(e.type).trim() : "rollMod", i = Qd(t), n = ql.has(String(e.phase ?? "").trim()) ? String(e.phase).trim() : i, s = Gd.has(String(e.operation ?? "").trim()) ? String(e.operation).trim() : "adjustAmount";
  return {
    id: re(e.id, foundry.utils.randomID()),
    type: t,
    phase: n,
    selector: re(e.selector),
    skillKeys: Gl(e.skillKeys),
    label: re(e.label),
    value: me(e.value, 0),
    min: e.min === void 0 || e.min === null || e.min === "" ? null : me(e.min, 0),
    max: e.max === void 0 || e.max === null || e.max === "" ? null : me(e.max, 0),
    pool: re(e.pool),
    operation: s,
    conditions: Xt(e.conditions),
    limit: fi(e.limit)
  };
}
function Kl(a = {}) {
  const e = re(a == null ? void 0 : a.selector);
  return e === "intent.skill" || e.startsWith("intent.skill.");
}
function wi(a = []) {
  return (Array.isArray(a) ? a : []).map(Yd).filter((t) => t.phase && t.type);
}
function _t(a = {}) {
  const e = a && typeof a == "object" ? Sn(a) : {}, t = e.positive === !1 ? "negative" : "positive", i = Ud.has(String(e.category ?? "").trim()) ? String(e.category).trim() : t, n = Hd.has(String(e.tier ?? "").trim()) ? String(e.tier).trim() : "minor", s = Wd.has(String(e.activation ?? "").trim()) ? String(e.activation).trim() : "passive";
  return {
    ...e,
    positive: i === "positive",
    category: i,
    tier: n,
    activation: s,
    tags: Gl(e.tags),
    effects: wi(e.effects),
    prerequisites: Xt(e.prerequisites),
    limits: fi(e.limits)
  };
}
function Vl() {
  return {
    categories: [...Sr],
    tiers: [...Ar],
    activations: [...Ul],
    effectTypes: [...Hl],
    phases: [...Wl],
    comparators: [...wr],
    edgeOperations: [...jl]
  };
}
function en(a = "") {
  var e;
  return ((e = Sr.find((t) => t.value === a)) == null ? void 0 : e.label) ?? "Positive";
}
function tn(a = "") {
  var e;
  return ((e = Ar.find((t) => t.value === a)) == null ? void 0 : e.label) ?? "Minor";
}
function Qd(a = "") {
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
function Jd(a) {
  return Array.from((a == null ? void 0 : a.items) ?? []).filter((e) => ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === "quality").map((e) => ({
    item: e,
    system: _t(e.system ?? {})
  }));
}
function Xd(a = {}, e = {}) {
  const t = fi(a), i = fi(e);
  return {
    perActivation: i.perActivation || t.perActivation,
    perRound: i.perRound || t.perRound,
    perScene: i.perScene || t.perScene
  };
}
function Yl(a = {}) {
  var n, s, r;
  const e = re(a.combatId ?? ((n = a.combat) == null ? void 0 : n.id)), t = Math.max(0, Math.trunc(me(a.round ?? ((s = a.combat) == null ? void 0 : s.round), 0))), i = re(a.sceneId ?? ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id));
  return {
    activationKey: re(a.activationKey),
    roundKey: e ? `${e}:${t}` : "",
    sceneKey: i
  };
}
function Zd(a, e = {}) {
  var s, r, o, l;
  const t = ((s = a == null ? void 0 : a.flags) == null ? void 0 : s[T]) ?? {}, i = ((r = t == null ? void 0 : t.traitUsage) == null ? void 0 : r.scene) ?? {}, n = e.state ?? {};
  return {
    activation: ((o = n == null ? void 0 : n.traitUsage) == null ? void 0 : o.activation) ?? {},
    round: ((l = n == null ? void 0 : n.traitUsage) == null ? void 0 : l.round) ?? {},
    scene: i
  };
}
function em(a, e, t, i) {
  var n, s, r, o, l;
  switch (t) {
    case "perActivation":
      return Math.max(0, Math.trunc(me((n = a.activation) == null ? void 0 : n[i], 0)));
    case "perRound":
      return Math.max(0, Math.trunc(me((r = (s = a.round) == null ? void 0 : s[e.roundKey]) == null ? void 0 : r[i], 0)));
    case "perScene":
      return Math.max(0, Math.trunc(me((l = (o = a.scene) == null ? void 0 : o[e.sceneKey]) == null ? void 0 : l[i], 0)));
    default:
      return 0;
  }
}
function tm(a, e, t, i) {
  const n = [];
  for (const s of ["perActivation", "perRound", "perScene"]) {
    const r = Math.max(0, Math.trunc(me(t == null ? void 0 : t[s], 0)));
    if (!r) continue;
    em(a, e, s, i) >= r && n.push(`${s} limit reached`);
  }
  return n;
}
function im(a, e, t) {
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
function Zr(a, e) {
  if (!re(a == null ? void 0 : a.fact)) return !0;
  const t = foundry.utils.getProperty(e, a.fact);
  return im(t, a.comparator, a.value);
}
function am(a = "", e = {}) {
  const t = re(a);
  return t ? (Array.isArray(e == null ? void 0 : e.selectors) ? e.selectors : []).some(
    (n) => n === t || n.startsWith(`${t}.`)
  ) : !0;
}
function Ql(a, e) {
  return `${a.id}:${e.id}`;
}
function nm(a, e) {
  var t;
  return !!((t = a.system) != null && t.inactive) || !!(e != null && e.inactive);
}
function eo(a = []) {
  return a.map((e) => e.fact).filter(Boolean).join(", ");
}
function xi(a, e, t) {
  const i = me(a[e], 0);
  let n = i;
  return typeof t.value == "number" && (n += t.value), typeof t.min == "number" && (n = Math.max(t.min, n)), typeof t.max == "number" && (n = Math.min(t.max, n)), a[e] = n, n - i;
}
function ii(a, e, t, i, n) {
  i && a.push({
    id: `trait:${n}:${e.id}:${t.id}`,
    label: t.label || e.name,
    value: i,
    source: e.name,
    traitItemId: e.id,
    traitEffectId: t.id
  });
}
function sm({ item: a, effect: e, phase: t, packet: i, result: n }) {
  switch (e.type) {
    case "rollMod": {
      const s = me(e.value, 0);
      return ii(n.modifiers, a, e, s, t), s;
    }
    case "burnAdjust": {
      if (t === "onEndOfActivation") {
        const r = xi(i, "burnDelta", e);
        return ii(n.modifiers, a, e, r, t), r;
      }
      const s = xi(i, "amount", e);
      return ii(n.modifiers, a, e, s, t), s;
    }
    case "actionCostMod": {
      const s = xi(i, "cost", e);
      return ii(n.modifiers, a, e, s, t), s;
    }
    case "initiativeMod": {
      const s = xi(i, "total", e);
      return ii(n.modifiers, a, e, s, t), s;
    }
    case "damageMod": {
      const s = xi(i, "amount", e);
      return ii(n.modifiers, a, e, s, t), s;
    }
    case "edgeEvent": {
      if (t === "onEndOfActivation" && e.operation === "grantPool" && e.pool)
        return i.edgeAdjustments ?? (i.edgeAdjustments = []), i.edgeAdjustments.push({
          poolKey: e.pool,
          amount: me(e.value, 0),
          label: e.label || a.name,
          source: a.name
        }), ii(n.modifiers, a, e, me(e.value, 0), t), me(e.value, 0);
      const s = xi(i, "amount", e);
      return ii(n.modifiers, a, e, s, t), s;
    }
    default:
      return 0;
  }
}
function rm(a, e, t) {
  const i = Ql(a, e), n = [];
  return t.perActivation > 0 && n.push({ kind: "usage", scope: "perActivation", key: i, delta: 1 }), t.perRound > 0 && n.push({ kind: "usage", scope: "perRound", key: i, delta: 1 }), t.perScene > 0 && n.push({ kind: "usage", scope: "perScene", key: i, delta: 1 }), n;
}
function Jl(a = "") {
  const e = re(a);
  return e ? [`action.${e}`] : [];
}
function Ii(a, e = {}) {
  var o, l, c, u, d;
  const t = e.snapshot ?? null, i = e.state ?? (t == null ? void 0 : t.state) ?? {}, n = Array.isArray(i == null ? void 0 : i.actionLog) ? i.actionLog.map((m) => re(m == null ? void 0 : m.id)).filter(Boolean) : [], s = (i == null ? void 0 : i.actionState) ?? {}, r = [];
  return s != null && s.aim && r.push("state.aim"), s != null && s.preparedInterrupt && r.push("state.preparedInterrupt"), {
    activation: {
      moved: n.includes("move") || !!((o = s == null ? void 0 : s.move) != null && o.moved),
      saSpent: Math.max(0, Math.trunc(me(i == null ? void 0 : i.saSpentThisActivation, 0))),
      attacksThisActivation: Math.max(0, Math.trunc(me(i == null ? void 0 : i.attacksThisActivation, 0))),
      burnThisActivation: Math.max(0, Math.trunc(me(i == null ? void 0 : i.burnThisActivation, 0)))
    },
    actionState: {
      aim: (s == null ? void 0 : s.aim) ?? null,
      move: (s == null ? void 0 : s.move) ?? null,
      preparedInterrupt: (s == null ? void 0 : s.preparedInterrupt) ?? null
    },
    burn: {
      current: Math.max(0, Math.trunc(me((c = (l = a == null ? void 0 : a.system) == null ? void 0 : l.burn) == null ? void 0 : c.value, 0))),
      overloaded: !!((d = (u = a == null ? void 0 : a.system) == null ? void 0 : u.burn) != null && d.overloaded)
    },
    timing: {
      firstAttackThisActivation: Math.max(0, Math.trunc(me(i == null ? void 0 : i.attacksThisActivation, 0))) === 0,
      firstExtraSAThisActivation: Math.max(0, Math.trunc(me(i == null ? void 0 : i.saSpentThisActivation, 0))) <= 3
    },
    selectors: r
  };
}
function Tr({ actor: a, resolved: e, payload: t, runtime: i = {} } = {}) {
  var d, m, f, p, h, g, y, b, S, w, M, N;
  const n = Ii(a, i), s = re((e == null ? void 0 : e.intent) ?? (t == null ? void 0 : t.intent), "skill"), r = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [], o = re(((d = e == null ? void 0 : e.attack) == null ? void 0 : d.rangeBand) ?? (t == null ? void 0 : t.rangeBand)), l = re(((f = (m = t == null ? void 0 : t.edge) == null ? void 0 : m.pre) == null ? void 0 : f.poolKey) ?? ((p = t == null ? void 0 : t.edge) == null ? void 0 : p.poolKey) ?? ""), c = re(
    ((h = e == null ? void 0 : e.data) == null ? void 0 : h.skillKey) ?? ((g = e == null ? void 0 : e.specialization) == null ? void 0 : g.skillKey) ?? (s === "skill" ? t == null ? void 0 : t.key : "")
  ), u = re(
    ((S = (b = (y = e == null ? void 0 : e.breakdown) == null ? void 0 : y.find) == null ? void 0 : b.call(y, (P) => (P == null ? void 0 : P.id) === "skill")) == null ? void 0 : S.label) ?? (e == null ? void 0 : e.title)
  );
  return n.intent = s, n.domains = r, n.rangeBand = o, n.skill = {
    key: c,
    label: u
  }, n.edge = {
    stage: (w = t == null ? void 0 : t.toggles) != null && w.useEdge ? "pre" : "",
    pool: l,
    spent: !!((M = t == null ? void 0 : t.toggles) != null && M.useEdge)
  }, n.selectors.push(`intent.${s}`), r.forEach((P) => n.selectors.push(`domain.${P}`)), o && n.selectors.push(`range.${o}`), s === "skill" && c && n.selectors.push(`skill.${c}`), (N = t == null ? void 0 : t.toggles) != null && N.useEdge && n.selectors.push("edge.pre"), n;
}
function Xl({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Ii(a, t);
  return i.action = {
    id: re(e.actionId),
    category: re(e.category),
    resource: re(e.resource),
    cost: me(e.cost, 0),
    effectiveCost: me(e.effectiveCost ?? e.cost, 0)
  }, i.selectors.push(...Jl(e.actionId)), i.action.category && i.selectors.push(`actionCategory.${i.action.category}`), i.action.resource && i.selectors.push(`actionResource.${i.action.resource}`), i;
}
function an({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Ii(a, t);
  return i.action = {
    id: re(e.actionId),
    category: re(e.category),
    resource: re(e.resource)
  }, i.burn = {
    ...i.burn,
    amount: me(e.amount, 0),
    source: re(e.source)
  }, e.source === "extraSA" && e.extraSaIndex === 1 && i.selectors.push("activation.extraSA:first"), e.source && i.selectors.push(`burn.${e.source}`), i.action.id && i.selectors.push(...Jl(i.action.id)), i.action.category && i.selectors.push(`actionCategory.${i.action.category}`), i.action.category === "reaction" && i.selectors.push(`reaction.${i.action.id}`), i;
}
function Zl({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Ii(a, t);
  return i.intent = "initiative", i.domains = ["combat"], i.initiative = {
    total: me(e.total, 0)
  }, i.selectors.push("intent.initiative"), i;
}
function ec({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Ii(a, t);
  return i.damage = {
    amount: me(e.amount, 0),
    track: re(e.track),
    damageType: re(e.damageType)
  }, i.selectors.push("incoming"), i;
}
function Cs({ actor: a, packet: e = {}, phase: t = "onEdgeGain", runtime: i = {} } = {}) {
  const n = Ii(a, i);
  return n.edge = {
    pool: re(e.poolKey),
    amount: me(e.amount, 0),
    eventKey: re(e.eventKey),
    source: re(e.source)
  }, n.selectors.push(t === "onEdgeSpend" ? "edge.spend" : "edge.gain"), n.edge.eventKey && n.selectors.push(`event.${n.edge.eventKey}`), n;
}
function tc({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Ii(a, t);
  return i.event = {
    phase: "endOfActivation"
  }, i.selectors.push("endOfActivation"), me(e.burnDelta, 0) !== 0 && i.selectors.push("burn.adjust"), i;
}
function St({ actor: a, phase: e, facts: t = {}, packet: i = {}, options: n = {} } = {}) {
  var u;
  const s = {
    packet: Sn(i),
    modifiers: [],
    mutations: [],
    applied: [],
    skipped: []
  };
  if (!a || !ql.has(String(e ?? "").trim()))
    return s;
  const r = n.runtime ?? {}, o = Zd(a, r), l = Yl(r), c = Jd(a);
  for (const { item: d, system: m } of c) {
    if (nm(d, m)) {
      s.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: "Trait is inactive"
      });
      continue;
    }
    const f = m.prerequisites.filter((p) => re(p == null ? void 0 : p.fact)).filter((p) => !Zr(p, t));
    if (f.length) {
      s.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: `Prerequisites not met: ${eo(f)}`
      });
      continue;
    }
    for (const p of m.effects.filter((h) => h.phase === e)) {
      if (!am(p.selector, t)) {
        s.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: `Selector did not match (${p.selector || "any"})`
        });
        continue;
      }
      if (Kl(p) && p.skillKeys.length) {
        const w = re((u = t == null ? void 0 : t.skill) == null ? void 0 : u.key);
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
      const h = p.conditions.filter((w) => re(w == null ? void 0 : w.fact)).filter((w) => !Zr(w, t));
      if (h.length) {
        s.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: `Conditions not met: ${eo(h)}`
        });
        continue;
      }
      const g = Xd(m.limits, p.limit), y = Ql(d, p), b = tm(o, l, g, y);
      if (b.length) {
        s.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: b.join(", ")
        });
        continue;
      }
      const S = sm({
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
      }), n.consumeUsage && s.mutations.push(...rm(d, p, g));
    }
  }
  return s;
}
async function ei({ actor: a, mutations: e = [], runtime: t = {} } = {}) {
  var o, l, c, u, d, m, f, p, h;
  if (!a || !Array.isArray(e) || !e.length) return;
  const i = e.filter((g) => (g == null ? void 0 : g.kind) === "usage");
  if (!i.length) return;
  const n = Sn(((c = (l = (o = a.flags) == null ? void 0 : o[T]) == null ? void 0 : l.traitUsage) == null ? void 0 : c.scene) ?? {}), s = t.state ? Sn(t.state) : null, r = Yl(t);
  for (const g of i) {
    const y = re(g.key), b = Math.max(0, Math.trunc(me(g.delta, 0)));
    if (!(!y || !b))
      switch (g.scope) {
        case "perActivation": {
          if (!s) break;
          s.traitUsage ?? (s.traitUsage = {}), (u = s.traitUsage).activation ?? (u.activation = {}), s.traitUsage.activation[y] = Math.max(0, me(s.traitUsage.activation[y], 0) + b);
          break;
        }
        case "perRound": {
          if (!s || !r.roundKey) break;
          s.traitUsage ?? (s.traitUsage = {}), (d = s.traitUsage).round ?? (d.round = {}), (m = s.traitUsage.round)[f = r.roundKey] ?? (m[f] = {}), s.traitUsage.round[r.roundKey][y] = Math.max(
            0,
            me(s.traitUsage.round[r.roundKey][y], 0) + b
          );
          break;
        }
        case "perScene": {
          if (!r.sceneKey) break;
          n[p = r.sceneKey] ?? (n[p] = {}), n[r.sceneKey][y] = Math.max(0, me(n[r.sceneKey][y], 0) + b);
          break;
        }
      }
  }
  s && ((h = t.combatant) != null && h.id) && await t.combatant.setFlag(T, "personalCombat", s), await a.setFlag(T, "traitUsage", { scene: n });
}
const ic = "personalActionCatalog", Me = Object.freeze({
  standard: "standard",
  complex: "complex",
  free: "free",
  reaction: "reaction",
  recovery: "recovery"
}), Ps = Object.freeze([
  { value: Me.standard, label: "Standard" },
  { value: Me.complex, label: "Complex" },
  { value: Me.free, label: "Free" },
  { value: Me.reaction, label: "Reaction" },
  { value: Me.recovery, label: "Burn & Recovery" }
]), ac = Object.freeze([
  { value: "", label: "Not Implemented / Placeholder" },
  { value: "combatAction", label: "Generic Action" },
  { value: "combatAttack", label: "Attack Pipeline" },
  { value: "combatEvade", label: "Evade" },
  { value: "combatAssist", label: "Assist" },
  { value: "combatInterrupt", label: "Interrupt" },
  { value: "combatReduceBurn", label: "Reduce Burn" },
  { value: "combatOverloadCheck", label: "Overload Check" }
]), to = new Set(Ps.map((a) => a.value)), io = new Set(ac.map((a) => a.value)), nc = Object.freeze([
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
].map((a) => Object.freeze(_n(a)))), om = new Map(nc.map((a) => [a.id, a]));
function _n(a) {
  return JSON.parse(JSON.stringify(a ?? null));
}
function ao(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return ["true", "1", "yes", "y", "on"].includes(t) ? !0 : ["false", "0", "no", "n", "off", ""].includes(t) ? !1 : e;
}
function lm(a, e = null) {
  var i;
  const t = String((a == null ? void 0 : a.rollIntent) ?? ((i = a == null ? void 0 : a.roll) == null ? void 0 : i.intent) ?? (e == null ? void 0 : e.intent) ?? "").trim();
  return t ? { intent: t } : null;
}
function cm(a, { strict: e = !1, index: t = 0 } = {}) {
  const i = String((a == null ? void 0 : a.id) ?? "").trim(), n = om.get(i) ?? {}, s = `Row ${t + 1}`, r = [];
  i || r.push(`${s}: id cannot be blank.`);
  const o = String((a == null ? void 0 : a.category) ?? n.category ?? "").trim();
  to.has(o) || r.push(`${s}: category must be one of ${Array.from(to).join(", ")}.`);
  const l = String((a == null ? void 0 : a.label) ?? n.label ?? "").trim();
  l || r.push(`${s}: label cannot be blank.`);
  const c = (a == null ? void 0 : a.cost) ?? n.cost ?? 0, u = Number(c);
  (!Number.isFinite(u) || u < 0) && r.push(`${s}: cost must be a non-negative number.`);
  const d = String((a == null ? void 0 : a.handler) ?? n.handler ?? "").trim();
  if (io.has(d) || r.push(`${s}: handler must be one of ${Array.from(io).map((p) => p || "(blank)").join(", ")}.`), r.length) {
    if (e) {
      const p = new Error(r[0]);
      throw p.validationErrors = r, p;
    }
    return null;
  }
  const m = {
    ..._n(n),
    id: i,
    label: l,
    category: o,
    cost: Math.trunc(u),
    handler: d,
    description: String((a == null ? void 0 : a.description) ?? n.description ?? "").trim(),
    reason: String((a == null ? void 0 : a.reason) ?? n.reason ?? "").trim(),
    prominent: ao(a == null ? void 0 : a.prominent, !!n.prominent),
    prominentWhenBurning: ao(a == null ? void 0 : a.prominentWhenBurning, !!n.prominentWhenBurning)
  };
  m.id === "opportunity" && !m.handler && (m.handler = "combatAttack", m.reason = ""), m.id === "opportunity" && m.handler === "combatAttack" && m.reason === "Opportunity attacks are not yet implemented." && (m.reason = ""), m.id === "assist" && !m.handler && (m.handler = "combatAssist", m.reason = ""), m.id === "assist" && m.handler === "combatAssist" && m.reason === "Reaction assist effects are not yet implemented." && (m.reason = ""), m.id === "interrupt" && !m.handler && (m.handler = "combatInterrupt", m.reason = ""), m.id === "interrupt" && m.handler === "combatInterrupt" && m.reason === "Prepared interrupt resolution is not yet implemented." && (m.reason = "");
  const f = lm(a, n.roll ?? null);
  return f ? m.roll = f : delete m.roll, m.reason || delete m.reason, m.description || delete m.description, m.prominent || delete m.prominent, m.prominentWhenBurning || delete m.prominentWhenBurning, m;
}
function vr() {
  return _n(nc);
}
function Da(a, { strict: e = !1 } = {}) {
  if (!Array.isArray(a)) {
    if (e) {
      const s = new Error("Action catalog must be an array.");
      throw s.validationErrors = [s.message], s;
    }
    return vr();
  }
  const t = [], i = /* @__PURE__ */ new Set(), n = [];
  if (a.forEach((s, r) => {
    try {
      const o = cm(s, { strict: e, index: r });
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
function sc() {
  var a, e;
  try {
    const t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.get) == null ? void 0 : e.call(a, T, ic);
    return Da(t, { strict: !1 });
  } catch {
    return vr();
  }
}
function nn(a) {
  const e = String(a ?? "").trim();
  return sc().find((t) => t.id === e) ?? null;
}
function um(a) {
  return sc().filter((e) => e.category === a).map((e) => Object.freeze(_n(e)));
}
const An = "hazard";
function dm(a) {
  return a && typeof a == "object" ? a : {};
}
function ya(a) {
  var i, n, s;
  const e = ((i = a == null ? void 0 : a.getFlag) == null ? void 0 : i.call(a, "mwd", An)) ?? ((s = (n = a == null ? void 0 : a.flags) == null ? void 0 : n.mwd) == null ? void 0 : s[An]) ?? null;
  if (!e || typeof e != "object") return null;
  const t = ti(e.areaEffect ?? { kind: at.persistent, hazard: e.hazardDef });
  return {
    ...foundry.utils.deepClone(dm(e)),
    areaEffect: t,
    hazardDef: cr(e.hazardDef ?? t.hazard ?? {})
  };
}
function mm(a) {
  return !!ya(a);
}
async function fm({ attacker: a = null, attack: e = {}, targetResult: t = null } = {}) {
  var u, d, m, f, p, h, g, y, b, S, w, M;
  const i = (canvas == null ? void 0 : canvas.scene) ?? null;
  if (!i) return null;
  const n = (e == null ? void 0 : e.templatePlacement) ?? null, s = (e == null ? void 0 : e.template) ?? null, r = ti((e == null ? void 0 : e.areaEffect) ?? ((u = e == null ? void 0 : e.payload) == null ? void 0 : u.areaEffect) ?? {});
  if (r.kind !== at.persistent || !s || !n) return null;
  const o = gl({ template: s, placement: n });
  if (!o.length) return null;
  const l = {
    sourceActorUuid: (a == null ? void 0 : a.uuid) ?? null,
    sourceItemUuid: ((d = e == null ? void 0 : e.weapon) == null ? void 0 : d.uuid) ?? null,
    payloadId: ((m = e == null ? void 0 : e.payloadState) == null ? void 0 : m.activePayloadId) ?? ((f = e == null ? void 0 : e.payload) == null ? void 0 : f.id) ?? "",
    templatePlacement: foundry.utils.deepClone(n),
    template: foundry.utils.deepClone(s),
    damage: Number(((p = t == null ? void 0 : t.damage) == null ? void 0 : p.effectiveWeaponDamage) ?? ((h = e == null ? void 0 : e.weapon) == null ? void 0 : h.damage) ?? 0) || 0,
    ap: Number((e == null ? void 0 : e.totalAp) ?? ((g = e == null ? void 0 : e.weapon) == null ? void 0 : g.ap) ?? 0) || 0,
    damageType: String(((y = t == null ? void 0 : t.damage) == null ? void 0 : y.damageType) ?? ((b = e == null ? void 0 : e.weapon) == null ? void 0 : b.damageType) ?? "concussive").trim() || "concussive",
    label: `${String(((S = e == null ? void 0 : e.weapon) == null ? void 0 : S.name) ?? "Hazard").trim() || "Hazard"} (${wt(((w = r.hazard) == null ? void 0 : w.startExposure) ?? "minor")})`,
    areaEffect: r,
    hazardDef: r.hazard
  }, [c] = await i.createEmbeddedDocuments("Region", [{
    name: l.label,
    color: ((M = game.user) == null ? void 0 : M.color) ?? "#d86a2c",
    shapes: o,
    flags: {
      mwd: {
        [An]: l
      }
    }
  }]);
  return c ?? null;
}
function no(a = null) {
  const e = (a == null ? void 0 : a.document) ?? a ?? null, t = e == null ? void 0 : e.regions;
  return t ? Array.from(t).map((i) => (i == null ? void 0 : i.document) ?? i).filter(Boolean).filter(mm) : [];
}
function ai(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function pm({ actor: a = null, token: e = null } = {}) {
  var s;
  const t = (e == null ? void 0 : e.document) ?? e ?? null, i = String(((s = t == null ? void 0 : t.texture) == null ? void 0 : s.src) ?? "").trim(), n = String((a == null ? void 0 : a.img) ?? "").trim();
  return i || n || "icons/svg/mystery-man.svg";
}
function hm(a = []) {
  return Array.isArray(a) ? a.map((e) => ({
    key: String((e == null ? void 0 : e.key) ?? "").trim(),
    label: String((e == null ? void 0 : e.label) ?? (e == null ? void 0 : e.key) ?? "").trim(),
    value: ai(e == null ? void 0 : e.value, 0)
  })).filter((e) => e.key) : [];
}
function kr(a = {}) {
  var c, u, d;
  const e = (a == null ? void 0 : a.preview) ?? {}, t = Re(((c = a == null ? void 0 : a.exposure) == null ? void 0 : c.initialTier) ?? (a == null ? void 0 : a.exposureTier) ?? (a == null ? void 0 : a.tier), "none"), i = Re(
    ((u = a == null ? void 0 : a.exposure) == null ? void 0 : u.finalTier) ?? (e.evadeActive ? e.finalTier : t),
    t
  ), n = gi({
    tier: t,
    appliedTier: i,
    evadeUsed: !!(e.evadeActive && t !== i),
    evadeLocked: !!((a == null ? void 0 : a.evadeLocked) ?? ((d = a == null ? void 0 : a.exposure) == null ? void 0 : d.evadeLocked))
  }), s = Math.max(0, ai(a == null ? void 0 : a.baseDamage, 0)), r = Math.max(0, ai(a == null ? void 0 : a.damageBefore, Mi(s, n.initialTier))), o = Math.max(0, ai(a == null ? void 0 : a.damageAfter, Mi(s, n.finalTier))), l = (e == null ? void 0 : e.reactionPreview) ?? {};
  return {
    kind: String((a == null ? void 0 : a.kind) ?? "hazard").trim() || "hazard",
    eventType: String((a == null ? void 0 : a.eventType) ?? "entry").trim() || "entry",
    regionId: String((a == null ? void 0 : a.regionId) ?? "").trim(),
    regionName: String((a == null ? void 0 : a.regionName) ?? (a == null ? void 0 : a.label) ?? "Hazard").trim() || "Hazard",
    actorUuid: String((a == null ? void 0 : a.actorUuid) ?? "").trim() || null,
    tokenUuid: String((a == null ? void 0 : a.tokenUuid) ?? "").trim() || null,
    actorName: String((a == null ? void 0 : a.actorName) ?? "Target").trim() || "Target",
    turnsExposed: Math.max(0, ai(a == null ? void 0 : a.turnsExposed, 0)),
    baseDamage: s,
    ap: Math.max(0, ai(a == null ? void 0 : a.ap, 0)),
    damageType: xt(a == null ? void 0 : a.damageType, "concussive"),
    damageTypeLabel: $t((a == null ? void 0 : a.damageType) ?? "concussive") || "Damage",
    source: String((a == null ? void 0 : a.source) ?? (a == null ? void 0 : a.regionName) ?? "Hazard").trim() || "Hazard",
    applied: !!(a != null && a.applied),
    applyReason: String((a == null ? void 0 : a.applyReason) ?? "").trim(),
    onFullBurnDelta: Math.max(0, ai(a == null ? void 0 : a.onFullBurnDelta, 0)),
    exposure: n,
    damageBefore: r,
    damageAfter: o,
    nextTier: Re(a == null ? void 0 : a.nextTier, n.finalTier),
    nextLabel: wt((a == null ? void 0 : a.nextTier) ?? n.finalTier),
    preview: {
      evadeActive: !!e.evadeActive,
      edgePoolKey: String(e.edgePoolKey ?? "").trim() || null,
      finalTier: n.finalTier,
      burnDelta: ai(l == null ? void 0 : l.burnDelta, 0),
      canSpendEdge: !!(l != null && l.canSpendEdge),
      edgePools: hm(l == null ? void 0 : l.edgePools)
    }
  };
}
function gm(a = {}, { actor: e = null, token: t = null } = {}) {
  const i = kr(a), n = i.eventType === "tick" ? "Hazard Tick" : i.eventType === "exit" ? "Hazard Exit" : "Hazard Entry", s = i.exposure.initialLabel === i.exposure.finalLabel ? i.exposure.initialLabel : `${i.exposure.initialLabel} -> ${i.exposure.finalLabel}`, r = i.damageBefore === i.damageAfter ? String(i.damageAfter) : `${i.damageBefore} -> ${i.damageAfter}`;
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
      image: pm({ actor: e, token: t })
    },
    rows: [
      { label: "Exposure", value: s },
      { label: "Damage", value: r },
      { label: "Next Tier", value: i.nextLabel },
      { label: "Turns Exposed", value: String(i.turnsExposed) }
    ],
    reactionHint: i.exposure.evadeLocked ? "Evade is locked for this hazard." : i.preview.evadeActive ? i.preview.edgePoolKey ? "Evade active. Reaction Burn canceled by Edge." : i.preview.burnDelta > 0 ? `Evade active. This reaction adds +${i.preview.burnDelta} Burn.` : "Evade active." : "",
    actions: i.applied ? [] : ym(i)
  };
}
function ym(a = {}) {
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
async function rc(a = {}, { actor: e = null, token: t = null } = {}) {
  return foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-hazard-card",
    gm(a, { actor: e, token: t })
  );
}
const Ge = "mwd", Ke = "personalCombat", Ns = "preparedInterrupt", Fi = "systems/mwd/img/icons/status/readied_action.svg", si = 3, bm = 1, Sm = 1;
function Fa(a, e) {
  return !(a != null && a.activation) || !e ? !1 : a.activation.combatId === e.combatId && Number(a.activation.round ?? -1) === Number(e.round ?? -1) && Number(a.activation.turn ?? -1) === Number(e.turn ?? -1) && a.activation.combatantId === e.combatantId;
}
function Er(a = null) {
  return {
    saRemaining: si,
    faRemaining: bm,
    raRemaining: Sm,
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
function sn(a, e = null) {
  return foundry.utils.mergeObject(
    Er(e),
    foundry.utils.deepClone(a ?? {}),
    { inplace: !1, overwrite: !0 }
  );
}
function $i(a, e = null) {
  const t = sn(a ?? {}, (a == null ? void 0 : a.activation) ?? e);
  return t.actionLog = ba(t.actionLog), t.hazards = wn(t.hazards), t.pendingReaction = rn(t.pendingReaction), t;
}
function wn(a) {
  return !a || typeof a != "object" ? {} : Object.fromEntries(
    Object.entries(a).map(([e, t]) => {
      const i = String(e ?? "").trim();
      return !i || !t || typeof t != "object" ? null : [i, {
        tier: Re(t.tier, ee.none),
        turnsExposed: Math.max(0, Number(t.turnsExposed ?? 0) || 0),
        evadeLocked: !!t.evadeLocked,
        lastProcessedRound: Number(t.lastProcessedRound ?? 0) || 0
      }];
    }).filter(Boolean)
  );
}
function rn(a) {
  if (!a || typeof a != "object") return null;
  const e = String(a.type ?? "").trim();
  return e ? {
    type: e,
    sourceKind: String(a.sourceKind ?? "").trim() || null,
    sourceId: String(a.sourceId ?? "").trim() || null,
    messageId: String(a.messageId ?? "").trim() || null,
    resultIndex: Number.isInteger(Number(a.resultIndex)) ? Number(a.resultIndex) : null,
    exposureBefore: Re(a.exposureBefore, ee.none),
    exposureAfterPreview: Re(a.exposureAfterPreview, ee.none),
    edgePoolKey: String(a.edgePoolKey ?? "").trim() || null,
    allowCurrentTurn: !!a.allowCurrentTurn
  } : null;
}
function ba(a) {
  return Array.isArray(a) ? a.map((e) => {
    const t = String((e == null ? void 0 : e.label) ?? "").trim();
    return t ? {
      id: String((e == null ? void 0 : e.id) ?? "").trim(),
      label: t,
      costLabel: String((e == null ? void 0 : e.costLabel) ?? "").trim()
    } : null;
  }).filter(Boolean) : [];
}
function Am(a = []) {
  return ba(a).filter((e) => {
    const t = nn(e == null ? void 0 : e.id);
    return (t == null ? void 0 : t.category) === Me.reaction;
  });
}
function so(a = null, e = null) {
  const t = Er(e);
  return t.reactionBurnSinceLastActivation = Math.max(0, Number((a == null ? void 0 : a.reactionBurnSinceLastActivation) ?? 0) || 0), t.actionLog = Am(a == null ? void 0 : a.actionLog), t.hazards = wn(a == null ? void 0 : a.hazards), t;
}
function wm(a, e) {
  return a === "free" ? "Free" : a === "burn" ? `+${e} Burn` : `${e} ${String(a).toUpperCase()}`;
}
function Tm(a = {}, e = "", { snapshot: t = null, metadata: i = {} } = {}) {
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
function ra(a = {}) {
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
function vm(a = null) {
  if (!a) return "";
  const e = [];
  return a.condition && e.push(`Trigger: ${a.condition}`), a.scope && e.push(`Scope: ${a.scope}`), e.join(" | ");
}
function ro() {
  return (CONFIG.statusEffects ?? []).find((a) => String((a == null ? void 0 : a.id) ?? "").trim() === Ns) ?? {
    id: Ns,
    name: "Prepared",
    icon: Fi
  };
}
function km(a) {
  const e = (CONFIG.statusEffects ?? []).find((i) => String((i == null ? void 0 : i.id) ?? "").trim() === a), t = String((e == null ? void 0 : e.name) ?? (e == null ? void 0 : e.label) ?? a ?? "").trim();
  return zl(t);
}
function Bi(a) {
  const e = Number(a);
  return !Number.isFinite(e) || e === 0 ? "0" : e > 0 ? `+${e}` : String(e);
}
function Em(a) {
  if (typeof a == "number") return Number.isFinite(a) ? a : 0;
  const e = String(a ?? "").trim().match(/[-+]?\d+(\.\d+)?/);
  return e ? Number(e[0]) : 0;
}
function oo(a) {
  var o;
  const e = (a == null ? void 0 : a.document) ?? a ?? null, t = (a == null ? void 0 : a.object) ?? (e == null ? void 0 : e.object) ?? a ?? null, i = String((e == null ? void 0 : e.id) ?? "").trim(), n = z._pendingTokenPositions.get(i) ?? null, s = Number((n == null ? void 0 : n.x) ?? (e == null ? void 0 : e.x)), r = Number((n == null ? void 0 : n.y) ?? (e == null ? void 0 : e.y));
  if (t && Number.isFinite(s) && Number.isFinite(r)) {
    if (typeof t.getCenterPoint == "function")
      return t.getCenterPoint({ x: s, y: r });
    if (typeof t.getCenter == "function")
      return t.getCenter(s, r);
  }
  return (t == null ? void 0 : t.center) ?? ((o = e == null ? void 0 : e.object) == null ? void 0 : o.center) ?? null;
}
function Mm(a, e = "") {
  if (!Number.isFinite(a)) return "";
  const t = Math.round(a * 10) / 10, i = Number.isInteger(t) ? String(t) : t.toFixed(1);
  return e ? `${i} ${e}` : i;
}
function lo(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
function co(a) {
  return !!ya(a);
}
function Cm(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [];
  if (!e.length) return "";
  const t = e.slice().sort((n, s) => mi(s == null ? void 0 : s.tier) - mi(n == null ? void 0 : n.tier))[0] ?? null;
  if (!t) return "";
  const i = `HAZARD ${wt(t.tier)} (${Math.max(0, Number(t.turnsExposed ?? 0) || 0)})`;
  return t.evadeLocked ? `${i} LOCK` : i;
}
const Gi = class Gi {
  static init() {
    Hooks.on("updateCombat", (e, t) => this._onUpdateCombat(e, t)), Hooks.on("updateCombatant", (e, t) => this._onUpdateCombatant(e, t)), Hooks.on("updateToken", (e, t) => this._onUpdateToken(e, t)), Hooks.on("refreshToken", (e) => this._onRefreshToken(e)), Hooks.on("createCombatant", (e) => this._onCreateCombatant(e)), Hooks.on("deleteCombatant", (e) => this._onDeleteCombatant(e)), Hooks.on("deleteCombat", (e) => this._onDeleteCombat(e)), Hooks.on("createRegion", (e) => this._onCreateRegion(e)), Hooks.on("updateRegion", (e) => this._onUpdateRegion(e)), Hooks.on("deleteRegion", (e) => this._onDeleteRegion(e)), Hooks.on("targetToken", (e, t, i) => this._onTargetToken(e, t, i));
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
    var l, c;
    const s = this._asTokenDocument(t), r = String((s == null ? void 0 : s.id) ?? "").trim();
    if (!e || !r) return null;
    if (((c = (l = s == null ? void 0 : s.combatant) == null ? void 0 : l.combat) == null ? void 0 : c.id) === e.id) return s.combatant;
    let o = null;
    if (typeof e.getCombatantByToken == "function")
      try {
        o = e.getCombatantByToken(r) ?? null;
      } catch {
        o = null;
      }
    return o || (this._getCombatants(e).find((u) => {
      const d = this._getCombatantTokenDocument(u, i), m = this._getCombatantTokenId(u) || String((d == null ? void 0 : d.id) ?? "").trim(), f = this._getCombatantSceneId(u) || i;
      return m === r && (!i || !f || f === i);
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
    const i = canvas == null ? void 0 : canvas.grid, n = oo(e), s = oo(t);
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
    const s = i[0], r = this._measureTokenDistance(e, s), o = String(((d = (u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.grid) == null ? void 0 : d.units) ?? ((f = (m = game.system) == null ? void 0 : m.grid) == null ? void 0 : f.units) ?? "").trim(), l = Mm(r, o), c = String((s == null ? void 0 : s.name) ?? ((p = s == null ? void 0 : s.actor) == null ? void 0 : p.name) ?? "Target").trim() || "Target";
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
      const s = Em((n == null ? void 0 : n.numericValue) ?? (n == null ? void 0 : n.value) ?? 0);
      return {
        label: String((n == null ? void 0 : n.label) ?? "").trim() || "Modifier",
        numericValue: s,
        value: String((n == null ? void 0 : n.value) ?? Bi(s)).trim() || Bi(s)
      };
    }), i = t.reduce((n, s) => n + s.numericValue, 0);
    return {
      total: i,
      totalLabel: Bi(i),
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
        const N = this._getCombatantTokenId(M), P = this._getCombatantTokenDocument(M, i), L = N || String((P == null ? void 0 : P.id) ?? "").trim();
        return o && y ? L === y : g.has(this._getCombatantActorId(M)) ? !0 : this._tokenDocumentMatchesActor(P, e, g);
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
    const m = this._getCombatantTokenDocument(u, i), f = l ?? m ?? null, p = c ?? (m == null ? void 0 : m.object) ?? this._getSceneTokenById(this._getCombatantTokenId(u)) ?? null;
    return {
      combat: n,
      combatant: u,
      token: p,
      tokenDocument: f
    };
  }
  static getSnapshot(e, { token: t = null } = {}) {
    var P, L, V, G, W;
    const {
      combat: i,
      combatant: n,
      token: s,
      tokenDocument: r
    } = this.getCombat(e, t), o = !!n && ((P = i == null ? void 0 : i.combatant) == null ? void 0 : P.id) === n.id, l = n ? this.getActivationIdentity(i, n) : null, c = n ? n.getFlag(Ge, Ke) : null, u = n ? o ? Fa(c, l) ? $i(c, l) : so(c, l) : $i(c, l) : Er(l);
    u.actionLog = ba(u.actionLog);
    const d = Math.max(0, Number(((V = (L = e == null ? void 0 : e.system) == null ? void 0 : L.burn) == null ? void 0 : V.value) ?? 0)), m = Math.floor(d / 2), f = !!((W = (G = e == null ? void 0 : e.system) == null ? void 0 : G.burn) != null && W.overloaded), p = ra(u), h = this.getActiveStatuses(e), g = h.filter(
      (j) => !(f && j.id === "overloaded") && j.id !== Ns
    ), y = this.getModifierSummary(e, m), b = this.getRollImpact(y), S = Math.max(0, Number(u.burnThisActivation ?? 0)), w = n ? o ? "" : "Waiting for this combatant's activation." : "No combatant on the current scene.", M = [];
    f && M.push({ id: "overloaded", label: "Overloaded" }), p && M.push({
      id: "preparedInterrupt",
      label: "Prepared",
      hint: vm(p)
    });
    const N = Object.entries(u.hazards ?? {});
    if (N.length) {
      const j = N.map(([, O]) => O).sort((O, x) => mi(x == null ? void 0 : x.tier) - mi(O == null ? void 0 : O.tier))[0] ?? null;
      j && M.push({
        id: "hazard",
        label: `Hazard ${wt(j.tier)}`,
        hint: `${N.length} active hazard${N.length === 1 ? "" : "s"}`
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
      summaryText: `SA: ${u.saRemaining} / ${si}   FA: ${u.faRemaining}   RA: ${u.raRemaining}`,
      activation: {
        burnThisActivation: S,
        burnThisActivationLabel: `+${S}`,
        items: [
          { label: "SA", value: `${u.saRemaining}/${si}` },
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
    actionCategory: s = Me.reaction,
    logLabel: r = "",
    edgePoolKey: o = "",
    allowCurrentTurn: l = !1
  } = {}) {
    var h, g, y, b, S;
    const c = this.getReactionSpendPreview(e, { token: t, edgePoolKey: o }), u = c.snapshot;
    if (!u.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!l && u.isCurrentTurn) return { ok: !1, reason: "Only outside your activation." };
    const d = $i(u.combatant.getFlag(Ge, Ke), (h = u.state) == null ? void 0 : h.activation), m = {
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
      const w = c.edgePoolKey ? 0 : 2, M = St({
        actor: e,
        phase: "onBeforeBurnApplied",
        facts: an({
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
    }), (y = m.pendingMutations) != null && y.length ? await ei({ actor: e, mutations: m.pendingMutations, runtime: m }) : await u.combatant.setFlag(Ge, Ke, d), f > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((S = (b = e.system) == null ? void 0 : b.burn) == null ? void 0 : S.value) ?? 0) + f) }), {
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
    const s = $i(n.combatant.getFlag(Ge, Ke), (o = n.state) == null ? void 0 : o.activation), r = typeof i == "function" ? i(s, n) ?? s : s;
    return await n.combatant.setFlag(Ge, Ke, r), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) };
  }
  static async setPendingReaction(e, { token: t = null, pendingReaction: i = null } = {}) {
    return this.updateCombatantState(e, {
      token: t,
      mutate: (n) => (n.pendingReaction = rn(i), n)
    });
  }
  static async clearPendingReaction(e, { token: t = null } = {}) {
    return this.setPendingReaction(e, { token: t, pendingReaction: null });
  }
  static async setHazardState(e, { token: t = null, regionId: i = "", hazardState: n = null } = {}) {
    const s = String(i ?? "").trim();
    return s ? this.updateCombatantState(e, {
      token: t,
      mutate: (r) => (r.hazards ?? (r.hazards = {}), n ? r.hazards[s] = wn({ [s]: n })[s] : delete r.hazards[s], r)
    }) : { ok: !1, reason: "Hazard region id is required." };
  }
  static getModifierSummary(e, t = Math.floor(Number(((n) => (n = ((i) => (i = e == null ? void 0 : e.system) == null ? void 0 : i.burn)()) == null ? void 0 : n.value)() ?? 0) / 2)) {
    var c, u;
    const s = ((u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.derived) == null ? void 0 : u.condition) ?? {}, r = [];
    t > 0 && r.push({
      label: "Burn Penalty",
      numericValue: -t,
      value: Bi(-t)
    });
    const o = Number(s.fatiguePenalty ?? 0);
    o && r.push({
      label: "Fatigue",
      numericValue: o,
      value: Bi(o)
    });
    const l = Number(s.physicalPenalty ?? 0);
    return l && r.push({
      label: "Physical",
      numericValue: l,
      value: Bi(l)
    }), r.length || r.push({
      label: "Current Modifiers",
      numericValue: 0,
      value: "0"
    }), r;
  }
  static getActiveStatuses(e) {
    return Array.from((e == null ? void 0 : e.statuses) ?? []).map((i) => ({
      id: i,
      label: km(i)
    })).sort((i, n) => i.label.localeCompare(n.label));
  }
  static buildActionModel(e, t) {
    var o, l, c, u;
    const i = (d) => {
      const m = br(d), f = $d(d);
      return !f || !m ? null : {
        id: d,
        label: m.label,
        handler: "roll",
        roll: JSON.stringify(f),
        disabled: !1,
        reason: ""
      };
    }, n = (d) => {
      const m = um(d).filter((f) => f.id !== "overloadCheck").filter((f) => !(d === Me.recovery && f.id === "reduceBurn"));
      if (d === Me.standard) {
        const f = nn("reduceBurn");
        f && !m.some((p) => p.id === "reduceBurn") && m.push(f);
      }
      return m.map((f) => this._buildCatalogAction(e, t, f));
    }, s = (d) => {
      const m = nn(d);
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
        { label: "SA", value: `${t.state.saRemaining}/${si}` },
        { label: "Cap", value: `${Math.max(0, Number(((l = t.state) == null ? void 0 : l.saSpentThisActivation) ?? 0))}/${Rs(e)}` },
        { label: "FA", value: `${t.state.faRemaining}` },
        { label: "RA", value: `${t.state.raRemaining}` },
        {
          label: "Burn/Turn",
          value: `+${Math.max(0, Number(((c = t.state) == null ? void 0 : c.burnThisActivation) ?? 0))}`,
          action: r
        }
      ],
      activationLog: ba((u = t.state) == null ? void 0 : u.actionLog).map((d, m) => ({
        ...d,
        index: m + 1
      })),
      menus: [
        {
          id: "standard",
          label: "Standard Actions",
          actions: n(Me.standard)
        },
        {
          id: "complex",
          label: "Complex Actions",
          actions: n(Me.complex)
        },
        {
          id: "free",
          label: "Free Actions",
          actions: n(Me.free)
        },
        {
          id: "reaction",
          label: "Reactions",
          actions: n(Me.reaction)
        },
        {
          id: "burn",
          label: "Burn & Recovery",
          actions: n(Me.recovery)
        }
      ].filter((d) => d.actions.length)
    };
  }
  static _buildCatalogAction(e, t, i) {
    const n = t.hasCombatant ? "" : "No current-scene combatant.", s = t.isCurrentTurn ? "" : "Only during your activation.", r = t.overloaded ? "Overloaded actors can only recover Burn." : "", o = Ua(e, t), l = t.state ?? {}, c = i.category;
    let u = "sa", d = Number(i.cost ?? 0) || 0, m = wm(u, d), f = "";
    if (i.id === "reduceBurn")
      u = "sa", d = 1, m = "1 SA", f = n || s || (o <= 0 ? "Activation SA cap reached." : "") || (t.burn.value <= 0 ? "Burn is already at 0." : "");
    else if (i.id === "overloadCheck")
      u = "check", d = 0, m = "Check", f = n || s || (t.burn.canOverloadCheck ? "" : t.overloaded ? "Already Overloaded." : "Burn below 6.");
    else if (i.id === "interrupt") {
      const p = ra(l);
      u = Number(l.raRemaining ?? 0) > 0 ? "ra" : "burn", d = u === "ra" ? 1 : 2, m = u === "ra" ? "1 RA" : "+2 Burn", f = n || (t.isCurrentTurn ? "Only outside your activation." : "") || (p ? "" : "Prepare an interrupt first.");
    } else if (i.id === "evade") {
      const p = rn(l.pendingReaction), h = t.isCurrentTurn && !(p != null && p.allowCurrentTurn) ? "Only outside your activation." : "";
      u = Number(l.raRemaining ?? 0) > 0 ? "ra" : "burn", d = u === "ra" ? 1 : 2, m = u === "ra" ? "1 RA" : "+2 Burn", f = n || h || (p ? "" : "Use an area effect or hazard card to trigger Evade.");
    } else if (c === Me.standard)
      f = n || s || r || (o < d ? "Activation SA cap reached." : "");
    else if (c === Me.complex)
      f = n || s || r || (o < d ? "Activation SA cap reached." : "");
    else if (c === Me.free) {
      const p = Number(l.faRemaining ?? 0) > 0;
      u = p ? "fa" : "sa", d = 1, m = p ? "Free" : "1 SA", f = n || s || !p && r || (!p && o < 1 ? "Activation SA cap reached." : "");
    } else if (c === Me.reaction) {
      const p = Number(l.raRemaining ?? 0) > 0;
      u = p ? "ra" : "burn", d = p ? 1 : 2, m = p ? "1 RA" : "+2 Burn", f = n || (t.isCurrentTurn ? "Only outside your activation." : "");
    } else c === Me.recovery && (f = n || s);
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
    const s = nn(i);
    return s ? s.handler ? s.category === Me.standard ? this._executeStandardAction(e, { token: t, action: s, metadata: n }) : s.category === Me.free ? this._executeFreeAction(e, { token: t, action: s, metadata: n }) : s.category === Me.reaction ? this._executeReactionAction(e, { token: t, action: s, metadata: n }) : { ok: !1, reason: s.reason || "That action is not implemented yet." } : { ok: !1, reason: s.reason || "That action is not implemented yet." } : { ok: !1, reason: "Unknown combat action." };
  }
  static async _executeStandardAction(e, { token: t = null, action: i, metadata: n = {} } = {}) {
    const s = this.getSnapshot(e, { token: t });
    if (!s.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!s.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (s.overloaded) return { ok: !1, reason: "Overloaded actors can only recover Burn." };
    if (Ua(e, s) < Number(i.cost ?? 1))
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
    if (!r && Ua(e, s) < 1)
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
    const r = rn((d = s.state) == null ? void 0 : d.pendingReaction), o = i.id === "evade" && (r == null ? void 0 : r.allowCurrentTurn);
    if (s.isCurrentTurn && !o) return { ok: !1, reason: "Only outside your activation." };
    if (i.id === "interrupt" && !ra(s.state))
      return { ok: !1, reason: "Prepare an interrupt first." };
    const l = i.id === "assist" && (n != null && n.targetName) ? `${i.label}: ${n.targetName}` : i.id === "interrupt" && (n != null && n.scope) ? `${i.label}: ${String(n.scope).trim()}` : i.label;
    let c = String((n == null ? void 0 : n.edgePoolKey) ?? "").trim();
    !c && Number(((m = s.state) == null ? void 0 : m.raRemaining) ?? 0) <= 0 && (c = await Gi._promptSpendEdgeForReaction(e) ?? "");
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
    const o = Tm(r.state, i, {
      snapshot: r,
      metadata: n
    });
    return await r.combatant.setFlag(Ge, Ke, o), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) };
  }
  static async clearAim(e, { token: t = null } = {}) {
    var s;
    const i = this.getSnapshot(e, { token: t });
    if (!(i != null && i.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const n = $i(i.combatant.getFlag(Ge, Ke), (s = i.state) == null ? void 0 : s.activation);
    return n.actionState ?? (n.actionState = {}), n.actionState.aim ? (n.actionState.aim = null, await i.combatant.setFlag(Ge, Ke, n), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : { ok: !0, snapshot: i };
  }
  static getPreparedInterrupt(e = null) {
    const t = (e == null ? void 0 : e.state) ?? e ?? {};
    return ra(t);
  }
  static async clearPreparedInterrupt(e, { token: t = null } = {}) {
    var s;
    const i = this.getSnapshot(e, { token: t });
    if (!(i != null && i.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const n = $i(i.combatant.getFlag(Ge, Ke), (s = i.state) == null ? void 0 : s.activation);
    return n.actionState ?? (n.actionState = {}), n.actionState.preparedInterrupt ? (n.actionState.preparedInterrupt = null, await i.combatant.setFlag(Ge, Ke, n), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : { ok: !0, snapshot: i };
  }
  static async _syncPreparedIndicatorForCombatant(e) {
    var u, d;
    if (!game.user.isGM || !e) return;
    const t = this._getCombatantSceneId(e) || ((u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.id), i = this._getCombatantTokenDocument(e, t);
    if (!i) return;
    const n = e.getFlag(Ge, Ke), s = !!ra(n), r = ro(), o = Array.from(i.effects ?? ((d = i._source) == null ? void 0 : d.effects) ?? []);
    if (o.includes(Fi) === s) return;
    if (typeof i.toggleActiveEffect == "function") {
      await i.toggleActiveEffect(r, { active: s, overlay: !1 });
      return;
    }
    const c = s ? Array.from(/* @__PURE__ */ new Set([...o, Fi])) : o.filter((m) => m !== Fi);
    await i.update({ effects: c });
  }
  static async syncPreparedIndicators(e = game.combat) {
    if (!(!game.user.isGM || !e))
      for (const t of this._getCombatants(e))
        await this._syncPreparedIndicatorForCombatant(t);
  }
  static async clearPreparedIndicatorForCombatant(e) {
    var r, o;
    if (!game.user.isGM || !e) return;
    const t = this._getCombatantSceneId(e) || ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id), i = this._getCombatantTokenDocument(e, t);
    if (!i) return;
    const n = ro();
    if (typeof i.toggleActiveEffect == "function") {
      await i.toggleActiveEffect(n, { active: !1, overlay: !1 });
      return;
    }
    const s = Array.from(i.effects ?? ((o = i._source) == null ? void 0 : o.effects) ?? []);
    s.includes(Fi) && await i.update({
      effects: s.filter((l) => l !== Fi)
    });
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
    const r = ba(e == null ? void 0 : e.actionLog);
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
    const i = this.getActivationIdentity(e, t), n = t.getFlag(Ge, Ke);
    Fa(n, i) || await t.setFlag(Ge, Ke, so(n, i));
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
    var S, w, M, N, P, L, V;
    const c = this.getSnapshot(e, { token: t });
    if (!c.hasCombatant)
      return { ok: !1, reason: "No combatant on the current scene." };
    if (!c.isCurrentTurn)
      return { ok: !1, reason: "Only available during your activation." };
    const u = {
      combat: c.combat,
      combatant: c.combatant,
      state: sn(c.state, this.getActivationIdentity(c.combat, c.combatant)),
      sceneId: ((S = canvas == null ? void 0 : canvas.scene) == null ? void 0 : S.id) ?? "",
      snapshot: c
    };
    let d = Math.max(0, Number(n ?? 0) || 0);
    const m = St({
      actor: e,
      phase: "onBeforeActionCostFinalized",
      facts: Xl({
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
    const h = u.state, g = i === "sa" ? Rs(e) : 0, y = Math.max(0, Number(((M = c.state) == null ? void 0 : M.saSpentThisActivation) ?? 0) || 0);
    if (i === "sa" && y + d > g)
      return { ok: !1, reason: "Activation SA cap reached." };
    h[f] = Math.max(0, p - d), i === "sa" && (h.saSpentThisActivation = y + d, s === "attack" && (h.attacksThisActivation = Number(h.attacksThisActivation ?? 0) + 1)), this._appendActionLog(h, {
      id: s,
      label: r,
      costLabel: o || this._formatCostLabel(i, d)
    });
    let b = 0;
    if (i === "sa") {
      const G = Math.max(0, y - si), W = Math.max(0, h.saSpentThisActivation - si), j = Math.max(0, Number(((N = c.state) == null ? void 0 : N.attacksThisActivation) ?? 0) || 0), O = Math.max(0, Number(h.attacksThisActivation ?? 0) || 0);
      for (let x = G + 1; x <= W; x += 1) {
        const q = St({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: an({
            actor: e,
            packet: {
              actionId: s,
              category: l,
              resource: i,
              amount: 1,
              source: "extraSA",
              extraSaIndex: x
            },
            runtime: u
          }),
          packet: {
            actionId: s,
            category: l,
            resource: i,
            amount: 1,
            source: "extraSA",
            extraSaIndex: x
          },
          options: { runtime: u, consumeUsage: !0 }
        });
        u.pendingMutations = (u.pendingMutations ?? []).concat(q.mutations), b += Math.max(0, Number(q.packet.amount ?? 0) || 0);
      }
      for (let x = j + 1; x <= O; x += 1) {
        if (x <= 1) continue;
        const q = St({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: an({
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
            attackIndex: x
          },
          options: { runtime: u, consumeUsage: !0 }
        });
        u.pendingMutations = (u.pendingMutations ?? []).concat(q.mutations), b += Math.max(0, Number(q.packet.amount ?? 0) || 0);
      }
      h.burnThisActivation = Math.max(0, Number(h.burnThisActivation ?? 0) + b);
    }
    return (P = u.pendingMutations) != null && P.length ? await ei({
      actor: e,
      mutations: u.pendingMutations,
      runtime: {
        ...u,
        state: h
      }
    }) : await c.combatant.setFlag(Ge, Ke, h), b > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((V = (L = e.system) == null ? void 0 : L.burn) == null ? void 0 : V.value) ?? 0) + b) }), { ok: !0, snapshot: this.getSnapshot(e, { token: c.token }) };
  }
  static async reduceBurn(e, { token: t = null } = {}) {
    var o, l, c, u;
    const i = this.getSnapshot(e, { token: t });
    if (!i.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!i.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (Ua(e, i) <= 0) return { ok: !1, reason: "Activation SA cap reached." };
    if (i.burn.value <= 0) return { ok: !1, reason: "Burn is already at 0." };
    const n = await this.spendResource(e, {
      token: i.token,
      resource: "sa",
      cost: 1,
      actionId: "reduceBurn",
      actionLabel: "Reduce Burn",
      actionCostLabel: "1 SA",
      actionCategory: Me.standard
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
    const s = i.getFlag(Ge, Ke), r = Fa(s, this.getActivationIdentity(e, i)) ? sn(s, this.getActivationIdentity(e, i)) : sn(s), l = {
      burnDelta: Number(r.saSpentThisActivation ?? 0) <= si && Number(r.burnThisActivation ?? 0) <= 0 && Number(r.reactionBurnSinceLastActivation ?? 0) <= 0 ? -2 : 0,
      edgeAdjustments: []
    }, c = {
      combat: e,
      combatant: i,
      state: r,
      sceneId: ((p = e.scene) == null ? void 0 : p.id) ?? ((h = canvas == null ? void 0 : canvas.scene) == null ? void 0 : h.id) ?? ""
    }, u = St({
      actor: n,
      phase: "onEndOfActivation",
      facts: tc({ actor: n, packet: l, runtime: c }),
      packet: l,
      options: { runtime: c, consumeUsage: !0 }
    });
    await ei({ actor: n, mutations: u.mutations, runtime: c });
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
      const n = this._lastActivationByCombat.get(e == null ? void 0 : e.id) ?? null, s = typeof n == "string" ? n : (n == null ? void 0 : n.combatantId) ?? null, r = this.getActivationIdentity(e, e == null ? void 0 : e.combatant), o = n && typeof n == "object" ? !Fa(n, r) : s && s !== r.combatantId;
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
    if (foundry.utils.hasProperty(t, `flags.${Ge}.${Ke}`)) {
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
  static async _onCreateRegion(e) {
    co(e) && await this._syncAllSceneHazards((e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null);
  }
  static async _onUpdateRegion(e) {
    co(e) && await this._syncAllSceneHazards((e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null);
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
    if (e)
      for (const t of Array.from(e.tokens ?? []))
        await this._syncHazardPresenceForToken(t), this._queueHazardOverlayRefresh(t);
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
    wn(n.hazards);
    const s = no(t), r = new Map(
      s.map((h) => {
        const g = ya(h);
        return g ? [String(h.id ?? "").trim(), { region: h, flag: g }] : null;
      }).filter(Boolean)
    ), o = [], l = [];
    await this.updateCombatantState(i, {
      token: t,
      mutate: (h) => {
        var g, y, b, S, w;
        h.hazards ?? (h.hazards = {});
        for (const [M, { flag: N }] of r.entries()) {
          if (h.hazards[M]) continue;
          const P = {
            tier: Re((g = N == null ? void 0 : N.hazardDef) == null ? void 0 : g.startExposure, ee.minor),
            turnsExposed: 0,
            evadeLocked: !1,
            lastProcessedRound: 0
          };
          h.hazards[M] = P, o.push({ regionId: M, flag: N, hazardState: P });
        }
        for (const [M, N] of Object.entries(h.hazards ?? {})) {
          if (r.has(M)) continue;
          const P = ya((S = (b = (y = canvas == null ? void 0 : canvas.scene) == null ? void 0 : y.regions) == null ? void 0 : b.get) == null ? void 0 : S.call(b, M)) ?? null;
          ((w = P == null ? void 0 : P.hazardDef) == null ? void 0 : w.clearOnExit) !== !1 && (delete h.hazards[M], l.push({ regionId: M, hazardState: N, flag: P }));
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
      await ChatMessage.create(lo({
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
      no(i).map((d) => {
        const m = ya(d);
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
    if (!(s > 0 && (i + 1) % n === 0)) return Re(e == null ? void 0 : e.tier, ee.none);
    let o = Re(e == null ? void 0 : e.tier, ee.none);
    for (let m = 0; m < s; m += 1)
      if (o = Ou(o, 1), mi(o) >= mi(((u = t == null ? void 0 : t.escalation) == null ? void 0 : u.max) ?? ee.full)) {
        o = Re((d = t == null ? void 0 : t.escalation) == null ? void 0 : d.max, ee.full);
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
    const c = Re(s == null ? void 0 : s.tier, ee.none), u = Re(o, c), d = l && c !== ee.none && !(s != null && s.evadeLocked) ? this.getReactionSpendPreview(e, { token: t }) : null, m = {
      kind: "hazard",
      eventType: r,
      regionId: String((i == null ? void 0 : i.id) ?? "").trim(),
      regionName: String((n == null ? void 0 : n.label) ?? (i == null ? void 0 : i.name) ?? "Hazard").trim() || "Hazard",
      actorUuid: e.uuid,
      tokenUuid: (t == null ? void 0 : t.uuid) ?? ((h = t == null ? void 0 : t.document) == null ? void 0 : h.uuid) ?? null,
      actorName: e.name ?? "Target",
      turnsExposed: Math.max(0, Number((s == null ? void 0 : s.turnsExposed) ?? 0) || 0),
      baseDamage: Math.max(0, Number((n == null ? void 0 : n.damage) ?? 0) || 0),
      damageBefore: Mi(Number((n == null ? void 0 : n.damage) ?? 0) || 0, c),
      damageAfter: Mi(
        Number((n == null ? void 0 : n.damage) ?? 0) || 0,
        l && !(s != null && s.evadeLocked) ? gs(c, 1) : c
      ),
      damageType: String((n == null ? void 0 : n.damageType) ?? "concussive").trim() || "concussive",
      ap: Math.max(0, Number((n == null ? void 0 : n.ap) ?? 0) || 0),
      onFullBurnDelta: Math.max(0, Number(((y = (g = n == null ? void 0 : n.hazardDef) == null ? void 0 : g.onFull) == null ? void 0 : y.burnDelta) ?? 0) || 0),
      source: String((n == null ? void 0 : n.label) ?? (i == null ? void 0 : i.name) ?? "Hazard").trim() || "Hazard",
      nextTier: u,
      exposure: {
        initialTier: c,
        finalTier: c,
        initialLabel: wt(c),
        finalLabel: wt(c),
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
    }, f = await rc(m, { actor: e, token: t }), p = await ChatMessage.create(lo({
      speaker: ChatMessage.getSpeaker({ actor: e, token: t }),
      content: f,
      flags: {
        mwd: {
          hazardCard: m
        }
      }
    }));
    return p && d && c !== ee.none && !(s != null && s.evadeLocked) && await this.setPendingReaction(e, {
      token: t,
      pendingReaction: {
        type: "evade",
        sourceKind: "hazard",
        sourceId: String((i == null ? void 0 : i.id) ?? "").trim() || null,
        messageId: p.id,
        exposureBefore: c,
        exposureAfterPreview: gs(c, 1),
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
    const n = (i == null ? void 0 : i.actor) ?? null, s = n ? this.getSnapshot(n, { token: i }) : null, r = Object.values((s == null ? void 0 : s.hazards) ?? {}), o = Cm(r);
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
D(Gi, "_targetRefreshTimeout", null), D(Gi, "_pendingTokenPositions", /* @__PURE__ */ new Map()), D(Gi, "_lastActivationByCombat", /* @__PURE__ */ new Map());
let z = Gi;
function Rs(a) {
  var i, n, s, r, o, l;
  const e = Math.max(0, Number(((s = (n = (i = a == null ? void 0 : a.system) == null ? void 0 : i.attributes) == null ? void 0 : n.reflexes) == null ? void 0 : s.value) ?? 0) || 0), t = Math.max(0, Number(((l = (o = (r = a == null ? void 0 : a.system) == null ? void 0 : r.attributes) == null ? void 0 : o.willpower) == null ? void 0 : l.value) ?? 0) || 0);
  return si + Math.floor((e + t) / 2);
}
function Ua(a, e) {
  var t;
  return Math.max(0, Rs(a) - Math.max(0, Number(((t = e == null ? void 0 : e.state) == null ? void 0 : t.saSpentThisActivation) ?? 0) || 0));
}
const Is = Object.freeze([
  Object.freeze({ key: "close", label: "Close", min: 0, max: 5, baseDn: 2 }),
  Object.freeze({ key: "near", label: "Near", min: 6, max: 26, baseDn: 3 }),
  Object.freeze({ key: "far", label: "Far", min: 27, max: 62, baseDn: 4 }),
  Object.freeze({ key: "extreme", label: "Extreme", min: 63, max: 120, baseDn: 5 })
]), Pm = new Map(Is.map((a) => [a.key, a]));
function Ha(a, e) {
  const t = Number(a);
  return !Number.isFinite(t) || t <= 0 ? e : Math.max(0, Math.trunc(t));
}
function On(a = "") {
  return Pm.get(String(a ?? "").trim().toLowerCase()) ?? null;
}
function Tn(a = "") {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return "Out of Range";
  const e = On(a);
  return e ? `${e.label} ${e.min}-${e.max} m` : String(a ?? "").trim() || "Range";
}
function Ln(a = "") {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return "Out of Range";
  const e = On(a);
  return e ? e.label : String(a ?? "").trim() || "Range";
}
function Nm(a = "", e = 1) {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return 6;
  const t = On(a);
  return Number.isFinite(Number(t == null ? void 0 : t.baseDn)) ? Number(t.baseDn) : e;
}
function Mr(a = {}) {
  return {
    max: String((a == null ? void 0 : a.max) ?? "").trim().toLowerCase() || "extreme",
    close: Ha((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short), 5),
    near: Ha((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium), 26),
    far: Ha((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long), 62),
    extreme: Ha(a == null ? void 0 : a.extreme, 120)
  };
}
function Rm(a, e = {}, t = "close") {
  var u;
  const i = Number(a);
  if (!Number.isFinite(i) || i < 0)
    return String(t ?? "close").trim().toLowerCase() || "close";
  const n = Mr(e), s = ((u = On(n.max)) == null ? void 0 : u.key) ?? "extreme", r = Is.findIndex((d) => d.key === s), o = Number((n == null ? void 0 : n[s]) ?? NaN);
  if (Number.isFinite(o) && i > o)
    return "outOfRange";
  let l = "extreme";
  i <= n.close ? l = "close" : i <= n.near ? l = "near" : i <= n.far && (l = "far");
  const c = Is.findIndex((d) => d.key === l);
  return r >= 0 && c > r ? s : l;
}
const Yi = "lifeModuleCatalog", xn = Object.freeze([
  { moduleType: "faction", label: "Faction" },
  { moduleType: "childhood", label: "Childhood" },
  { moduleType: "higherEducation", label: "Higher Education" },
  { moduleType: "realLife", label: "Real Life" }
]), Im = Object.freeze(
  Object.fromEntries(xn.map((a) => [a.moduleType, a.label]))
), Dm = new Set(xn.map((a) => a.moduleType)), _m = /* @__PURE__ */ new Set(["skill", "edgePool"]), Cr = Object.freeze({
  grit: "Grit",
  chaos: "Chaos",
  insight: "Insight",
  rumor: "Rumor",
  legend: "Legend",
  credibility: "Credibility"
}), oc = Object.freeze(Object.keys(Cr)), Om = Object.freeze({
  skill: "Skill",
  edgePool: "Edge Pool"
}), Lm = Object.freeze(Um()), xm = Object.freeze(Hm()), $m = /* @__PURE__ */ new Set(["artillery", "gunnery", "piloting", "heavyWeapons"]), Bm = /* @__PURE__ */ new Set([
  "artillery",
  "gunnery",
  "heavyWeapons",
  "meleeCombat",
  "piloting",
  "projectileWeapons",
  "firearms"
]), zm = Object.freeze(
  Gt.map((a) => a.code).filter((a) => !Bm.has(a))
), Fm = Object.freeze(Di([
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
        ...zm.map((a) => ({ type: "skill", value: a })),
        ...oc.map((a) => ({ type: "edgePool", value: a }))
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
    skillChoices: Gt.map((a) => a.code).filter((a) => !$m.has(a)),
    excludesAny: [
      "higher-education-military-enlistment",
      "higher-education-military-academy",
      "higher-education-family-training",
      "higher-education-officer-candidate-school"
    ]
  }
], { strict: !1 }));
function Um() {
  const a = /* @__PURE__ */ new Map();
  for (const e of Gt) {
    const t = String(e.code ?? "").trim(), i = String(e.label ?? "").trim();
    t && (a.set(t.toLowerCase(), t), i && a.set(i.toLowerCase(), t));
  }
  return a;
}
function Hm() {
  const a = /* @__PURE__ */ new Map();
  for (const [e, t] of Object.entries(Cr))
    a.set(e.toLowerCase(), e), a.set(t.toLowerCase(), e), a.set(`${t.toLowerCase()} pool`, e);
  return a;
}
function Wm(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid life module data.");
  return t.validationErrors = e, t;
}
function lc(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
function _a(a) {
  return String(a ?? "").trim().toLowerCase().replace(/['\u2019]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function $n(a) {
  const e = String(a ?? "").trim();
  return Dm.has(e) ? e : "";
}
function Bn(a) {
  const e = String(a ?? "").trim();
  return e ? Lm.get(e.toLowerCase()) ?? "" : "";
}
function jm(a) {
  const e = String(a ?? "").trim();
  return e ? xm.get(e.toLowerCase()) ?? "" : "";
}
function qm(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const r of lc(a)) {
    const o = Bn(r);
    if (!o) {
      e && t.push(`${i}: unknown skill "${r}".`);
      continue;
    }
    n.has(o) || (n.add(o), s.push(o));
  }
  return s;
}
function uo(a) {
  const e = /* @__PURE__ */ new Set();
  return lc(a).map(_a).filter((t) => !t || e.has(t) ? !1 : (e.add(t), !0));
}
function mo(a = [], e = /* @__PURE__ */ new Map()) {
  return a.map((t) => {
    var i;
    return ((i = e.get(t)) == null ? void 0 : i.label) ?? t;
  });
}
function Zi(a = {}) {
  return `${a.type}:${a.value}`;
}
function Gm(a) {
  var e;
  return ((e = Ot(a)) == null ? void 0 : e.label) ?? a;
}
function cc(a) {
  return Cr[a] ?? a;
}
function Km(a) {
  return Om[a] ?? a;
}
function Vm(a = {}, { includeTypePrefix: e = !1 } = {}) {
  const t = String((a == null ? void 0 : a.type) ?? "").trim(), i = String((a == null ? void 0 : a.value) ?? "").trim();
  if (!t || !i) return "";
  const n = t === "skill" ? Gm(i) : `${cc(i)} Pool`;
  return e ? `${Km(t)}: ${n}` : n;
}
function Ma(a = {}, { includeBonusText: e = !1, includeTypePrefix: t = !1 } = {}) {
  const i = Vm(a, { includeTypePrefix: t });
  return i ? e ? a.type === "skill" ? `+1 ${i} rolls` : `+1 ${i}` : i : "";
}
function Ym(a) {
  const e = String(a ?? "").trim(), t = e.indexOf(":");
  return t < 0 ? null : {
    type: e.slice(0, t).trim(),
    value: e.slice(t + 1).trim()
  };
}
function Qm(a, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: n = "Bonus" } = {}) {
  const s = typeof a == "string" ? Ym(a) : a, r = String((s == null ? void 0 : s.type) ?? "").trim(), o = String((s == null ? void 0 : s.value) ?? "").trim();
  if (!_m.has(r))
    return e && t.push(`${i} ${n}: unknown bonus type "${r || a}".`), null;
  const l = r === "skill" ? Bn(o) : jm(o);
  return l ? {
    type: r,
    value: l
  } : (e && t.push(`${i} ${n}: unknown ${r === "skill" ? "skill" : "edge pool"} "${o}".`), null);
}
function Ds(a, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: n = "Bonus" } = {}) {
  const s = /* @__PURE__ */ new Set(), r = [], o = Array.isArray(a) ? a : [];
  for (const l of o) {
    const c = Qm(l, { strict: e, errors: t, prefix: i, grantLabel: n });
    if (!c) continue;
    const u = Zi(c);
    s.has(u) || (s.add(u), r.push(c));
  }
  return r;
}
function uc(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = qm(a, { strict: e, errors: t, prefix: i });
  return n.length ? [{
    id: "skill",
    label: "",
    choices: n.map((s) => ({ type: "skill", value: s }))
  }] : [];
}
function Jm(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = String(a ?? "").trim();
  return n ? n.split(";").map((r) => r.trim()).filter(Boolean).map((r, o) => {
    const l = `Bonus ${o + 1}`, c = Ds(
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
function dc(a, e = "grant") {
  return _a(a) || e;
}
function Xm(a, e, { strict: t = !1, errors: i = [], prefix: n = "Entry" } = {}) {
  const s = `grant-${e + 1}`, r = `Bonus ${e + 1}`;
  if (typeof a == "string") {
    const u = Ds(
      a.split("|").map((d) => d.trim()).filter(Boolean),
      { strict: t, errors: i, prefix: n, grantLabel: r }
    );
    return u.length ? { id: s, label: "", choices: u } : null;
  }
  const o = dc(a == null ? void 0 : a.id, s), l = String((a == null ? void 0 : a.label) ?? "").trim(), c = Ds(a == null ? void 0 : a.choices, { strict: t, errors: i, prefix: n, grantLabel: r });
  return c.length ? { id: o, label: l, choices: c } : (t && i.push(`${n} ${r}: define at least one bonus choice.`), null);
}
function Zm(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  if (Array.isArray(a)) {
    if (a.every((s) => typeof s == "string" && !String(s).includes(":")))
      return uc(a, { strict: e, errors: t, prefix: i });
    const n = /* @__PURE__ */ new Set();
    return a.map((s, r) => Xm(s, r, { strict: e, errors: t, prefix: i })).filter((s) => s ? n.has(s.id) ? (e && t.push(`${i}: duplicate bonus id "${s.id}".`), !1) : (n.add(s.id), !0) : !1);
  }
  return typeof a == "string" ? Jm(a, { strict: e, errors: t, prefix: i }) : [];
}
function ef(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => (Array.isArray(e == null ? void 0 : e.choices) ? e.choices : []).map((i) => `${i.type}:${i.value}`).join("|")).filter(Boolean).join("; ");
}
function Pr() {
  return foundry.utils.deepClone(Fm);
}
function ea(a) {
  return Im[a] ?? (String(a ?? "").trim() || "Life Module");
}
function mc() {
  return xn.map((a) => ({
    value: a.moduleType,
    label: a.label
  }));
}
function Di(a = [], { strict: e = !1 } = {}) {
  const t = Array.isArray(a) ? a : [], i = [], n = /* @__PURE__ */ new Set(), s = t.map((o, l) => {
    const c = `Entry ${l + 1}`, u = String((o == null ? void 0 : o.label) ?? "").trim(), d = _a((o == null ? void 0 : o.id) ?? u), m = $n(o == null ? void 0 : o.moduleType), f = (o == null ? void 0 : o.grants) != null ? Zm(o.grants, { strict: e, errors: i, prefix: c }) : uc(o == null ? void 0 : o.skillChoices, { strict: e, errors: i, prefix: c }), p = uo(o == null ? void 0 : o.requiresAny), h = uo(o == null ? void 0 : o.excludesAny);
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
  if (e && i.length) throw Wm(i);
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
function fc(a = []) {
  const e = new Map(Pr().map((s) => [s.id, s])), t = Di(a, { strict: !1 }), i = [...t], n = new Set(t.map((s) => s.id));
  for (const [s, r] of e.entries())
    n.has(s) || i.push(foundry.utils.deepClone(r));
  return i;
}
async function tf() {
  var a, e, t;
  try {
    if (!((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${Yi}`))) return;
    const i = game.settings.get(T, Yi), n = fc(i);
    JSON.stringify(i) !== JSON.stringify(n) && await game.settings.set(T, Yi, n);
  } catch {
  }
}
function af() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${Yi}`))
      return fc(game.settings.get(T, Yi));
  } catch {
  }
  return Pr();
}
function zn() {
  return Di(af(), { strict: !1 });
}
function pi(a) {
  const e = _a(a);
  return e ? zn().find((t) => t.id === e) ?? null : null;
}
function Nr(a) {
  const e = $n(a);
  return zn().filter((t) => t.moduleType === e);
}
function pc(a) {
  return !a || typeof a != "object" || Array.isArray(a) ? {} : Object.fromEntries(
    Object.entries(a).map(([e, t]) => [dc(e, ""), String(t ?? "").trim()]).filter(([e]) => !!e)
  );
}
function hc(a, e = "", { legacySelectedSkill: t = "" } = {}) {
  const i = new Set((Array.isArray(a == null ? void 0 : a.choices) ? a.choices : []).map(Zi)), n = String(e ?? "").trim();
  if (i.has(n)) return n;
  if (t) {
    const s = Bn(t), r = s ? `skill:${s}` : "";
    if (r && i.has(r)) return r;
  }
  return i.size === 1 ? Array.from(i)[0] : "";
}
function gc(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(a == null ? void 0 : a.grants) ? a.grants : [], n = pc(e);
  return Object.fromEntries(
    i.map((s) => [
      s.id,
      hc(s, n[s.id], { legacySelectedSkill: t })
    ])
  );
}
function Fn(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(a == null ? void 0 : a.grants) ? a.grants : [], n = gc(a, e, { legacySelectedSkill: t });
  return i.map((s, r) => {
    const o = hc(s, n[s.id], { legacySelectedSkill: t }), l = (Array.isArray(s.choices) ? s.choices : []).find((c) => Zi(c) === o) ?? null;
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
function nf(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  var i;
  return ((i = Fn(a, e, { legacySelectedSkill: t }).map((n) => n.choice).find((n) => (n == null ? void 0 : n.type) === "skill")) == null ? void 0 : i.value) ?? "";
}
function Ca(a = {}) {
  const e = foundry.utils.deepClone(a ?? {}), t = _a(e.catalogId), i = t ? pi(t) : null, n = $n(e.moduleType || (i == null ? void 0 : i.moduleType)), s = i ? gc(i, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }) : pc(e.selectedGrants);
  return e.moduleType = n, e.catalogId = t, e.selectedGrants = s, e.selectedSkill = i ? nf(i, s, { legacySelectedSkill: e.selectedSkill }) : Bn(e.selectedSkill), e;
}
function yc(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  return Fn(a, e, { legacySelectedSkill: t }).map((i) => {
    var l, c;
    const n = Array.isArray((c = (l = a == null ? void 0 : a.grants) == null ? void 0 : l[i.index]) == null ? void 0 : c.choices) ? a.grants[i.index].choices : [], s = new Set(n.map((u) => u.type)).size > 1, r = n.map((u) => ({
      value: Zi(u),
      label: Ma(u, { includeTypePrefix: s }),
      selected: Zi(u) === i.selectedKey
    })), o = r.length === 1 ? {
      value: r[0].value,
      label: r[0].label,
      displayLabel: Ma(n[0], { includeBonusText: !0 })
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
function sf(a, e) {
  return a.isDuplicate ? `Duplicate ${ea(a.moduleType)} slot item.` : a.catalog ? a.unresolvedGrantCount > 0 ? "Choose valid bonus options." : a.excludedBy.length ? `Blocked by ${mo(a.excludedBy, e).join(", ")}.` : a.requiresAny.length && !a.matchedRequirementIds.length ? `Requires ${mo(a.requiresAny, e).join(" or ")}.` : "" : "Catalog entry is missing or unlinked.";
}
function rf(a, e = [], t = {}) {
  var n, s, r;
  if (!a || !Array.isArray(e) || !e.length) return [];
  const i = Math.max(0, Number(((r = (s = (n = a.system) == null ? void 0 : n.attributes) == null ? void 0 : s.edge) == null ? void 0 : r.value) ?? 0));
  return e.filter((o) => (o == null ? void 0 : o.type) === "edgePool").map((o) => {
    var p, h, g, y;
    const l = String(o.value ?? "").trim(), c = cc(l), u = Math.max(0, Number(((y = (g = (h = (p = a.system) == null ? void 0 : p.counters) == null ? void 0 : h.edgePools) == null ? void 0 : g[l]) == null ? void 0 : y.rating) ?? 0)), d = Math.max(0, Number((t == null ? void 0 : t[l]) ?? 0)), m = Math.max(0, u + d - i);
    return m ? `${c} Pool bonus loses ${m} ${m === 1 ? "point" : "points"} to the Edge cap.` : "";
  }).filter(Boolean);
}
function hi(a) {
  var m;
  const e = zn(), t = new Map(e.map((f) => [f.id, f])), i = Array.from((a == null ? void 0 : a.items) ?? []).filter((f) => f.type === A.itemType.lifeModule), n = /* @__PURE__ */ new Map();
  for (const f of i) {
    const p = $n((m = f.system) == null ? void 0 : m.moduleType);
    !p || n.has(p) || n.set(p, f.id);
  }
  const s = i.map((f) => {
    var M;
    const p = Ca(f.system ?? {}), h = t.get(p.catalogId) ?? null, g = p.moduleType || (h == null ? void 0 : h.moduleType) || "", y = h ? Fn(h, p.selectedGrants, { legacySelectedSkill: p.selectedSkill }) : [], b = y.map((N) => N.choice).filter(Boolean), S = ((M = b.find((N) => N.type === "skill")) == null ? void 0 : M.value) ?? "", w = S ? Ot(S) : null;
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
      selectedChoiceLabels: b.map((N) => Ma(N, { includeBonusText: !0 })),
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
  const l = Object.fromEntries(Gt.map((f) => [f.code, 0])), c = Object.fromEntries(oc.map((f) => [f, 0])), u = /* @__PURE__ */ new Map();
  for (const f of s) {
    const p = f.isActive ? f.selectedChoices : [], h = p.filter((y) => y.type === "skill"), g = p.filter((y) => y.type === "edgePool");
    f.bonus = h.length;
    for (const y of h)
      l[y.value] = Number(l[y.value] ?? 0) + 1;
    for (const y of g)
      c[y.value] = Number(c[y.value] ?? 0) + 1;
    f.inactiveReason = f.isActive ? "" : sf(f, t), u.set(f.itemId, f);
  }
  for (const f of s)
    f.warningLabels = f.isActive ? rf(a, f.selectedChoices, c) : [];
  const d = xn.map((f) => {
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
function of(a = {}) {
  var t, i, n;
  const e = String((a == null ? void 0 : a.intent) ?? "").trim();
  return e === "skill" ? String(((t = a == null ? void 0 : a.data) == null ? void 0 : t.skillKey) ?? "").trim() : e === "attack" ? String(((n = (i = a == null ? void 0 : a.attack) == null ? void 0 : i.skill) == null ? void 0 : n.code) ?? "").trim() : "";
}
function lf({ actor: a, resolved: e } = {}) {
  const t = of(e);
  return !a || !t ? [] : hi(a).states.flatMap(
    (i) => i.isActive ? i.selectedChoices.filter((n) => n.type === "skill" && n.value === t).map((n) => ({
      id: `life-module:${i.itemId}:${Zi(n)}`,
      label: i.label,
      value: 1,
      source: "Life Module",
      tooltip: `${i.label}: +1 to ${Ma(n)} rolls`
    })) : []
  );
}
const fo = Object.freeze({
  weapon: A.itemType.personalWeapon,
  shadowamp: A.itemType.assetModule
}), bc = Object.freeze({
  contact: "systems/mwd/img/default/mystery-man.svg",
  gear: "systems/mwd/img/default/Default_Gear.svg",
  quality: "systems/mwd/img/default/card-joker.svg",
  assetModule: "systems/mwd/img/default/upgrade.svg",
  skill: "systems/mwd/img/default/Default_Skill.svg",
  lifeModule: "systems/mwd/img/default/book.svg",
  mechWeapon: "systems/mwd/img/default/Default_Weapon.svg",
  personalWeapon: "systems/mwd/img/colt-m1911.svg",
  armor: "systems/mwd/img/default/Default_Armor.svg"
}), Ni = Object.freeze(["close", "near", "far", "extreme"]), po = Object.freeze({
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
});
function oa(a) {
  return aa(a);
}
function ho(a = {}) {
  const e = ul({
    traits: a.traits,
    keywords: a.keywords,
    report: lr(),
    path: "system.traits"
  });
  return {
    traits: e.traits,
    keywords: e.keywords
  };
}
function Sc(a) {
  return a === "long" ? "extreme" : a === "short" ? "close" : a === "medium" ? "near" : Ni.includes(a) ? a : "near";
}
function Ui(a) {
  const e = Mr(a);
  return e.max = Sc(e.max ?? (a == null ? void 0 : a.max) ?? "extreme"), e;
}
function Zn(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function go(a, e = 1) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function yo(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function bo(a) {
  return String(a ?? "").trim();
}
function So(a) {
  return (Array.isArray(a) ? a : typeof a == "string" ? a.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function cf(a) {
  const e = Ni.indexOf(a);
  return e >= 0 ? e : Ni.indexOf("near");
}
function uf(a = Ui({})) {
  const e = ["near", "close", "far", "extreme"], t = cf(a.max);
  return e.find((i) => Ni.indexOf(i) <= t) ?? "close";
}
function df(a) {
  const e = Sc(a == null ? void 0 : a.max), t = Ni.indexOf(e);
  return Ni.map((i, n) => ({
    key: i,
    allowed: t >= 0 ? n <= t : n === 0,
    value: (a == null ? void 0 : a[i]) ?? void 0,
    labelkey: Tn(i)
  }));
}
function mf(a, e, t, i) {
  let n = Number(e);
  if (t)
    if (i !== void 0)
      n += Math.ceil(Number(i) / 2);
    else
      return console.warn("Weapon not attached to an actor"), Ce.item.personalWeapon.weaponWithoutActor;
  return n;
}
function ff(a, e, t) {
  let i = "";
  return t && Ce.attributes[t] && (i += Ce.attributes[t].substring(0, 3).toUpperCase() + "/2 + "), i += String(e), i;
}
function pf(a, e) {
  return B.useArmor(a) ? e ? "noArmor" : "withArmor" : "";
}
function Ao(a) {
  const e = game.system.mwd.skills.get(a);
  if (!e)
    return {
      img: bc.skill,
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
function es(a = {}) {
  const e = Ca(a), t = pi(e.catalogId);
  return {
    system: e,
    ...t ? { name: t.label } : {}
  };
}
function hf(a) {
  const e = String(a ?? "").trim();
  return !!(!e || e.startsWith("icons/svg/") || e === "icons/mystery-man.svg");
}
var Na, Lt, _s, Ac, on;
const Ve = class Ve extends Item {
  static init() {
    H(this, Na) || ($e(this, Na, !0), Hooks.on("createItem", (e, t, i) => {
      var n, s;
      Promise.resolve((n = e.onCreateItem) == null ? void 0 : n.call(e, t, i)).catch((r) => {
        console.error(`${Ae}Item create hook failed`, r);
      }), C(s = Ve, Lt, _s).call(s, e);
    }), Hooks.on("updateItem", (e) => {
      var t;
      C(t = Ve, Lt, _s).call(t, e);
    }), Hooks.on("deleteItem", (e) => {
      var t;
      C(t = Ve, Lt, Ac).call(t, e);
    }), Hooks.on("createActiveEffect", (e) => {
      var t;
      C(t = Ve, Lt, on).call(t, e);
    }), Hooks.on("updateActiveEffect", (e) => {
      var t;
      C(t = Ve, Lt, on).call(t, e);
    }), Hooks.on("deleteActiveEffect", (e) => {
      var t;
      C(t = Ve, Lt, on).call(t, e);
    }));
  }
  static canonicalType(e) {
    return fo[e] ?? e;
  }
  static defaultIconForType(e) {
    return bc[this.canonicalType(e)];
  }
  get canonicalType() {
    return this.constructor.canonicalType(this.type);
  }
  async onCreateItem(e, t) {
  }
  async _preCreate(e, t, i) {
    super._preCreate && await super._preCreate(e, t, i);
    const n = (e == null ? void 0 : e.type) ?? this.type, s = this.constructor.canonicalType(n), r = {};
    if (n !== s && fo[n] && (r.type = s), hf((e == null ? void 0 : e.img) ?? this.img)) {
      const o = this.constructor.defaultIconForType(s);
      o && (r.img = o);
    }
    if (s === A.itemType.lifeModule && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (r.name = "MWD.itemType.singular.lifeModule"), s === A.itemType.lifeModule) {
      const o = es((e == null ? void 0 : e.system) ?? this.system ?? {});
      r.system = o.system, o.name && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (r.name = o.name);
    }
    Object.keys(r).length && this.updateSource(r);
  }
  async _preUpdate(e, t, i) {
    var l, c;
    super._preUpdate && await super._preUpdate(e, t, i);
    const n = e != null && e.system ? foundry.utils.mergeObject(foundry.utils.deepClone(this.system ?? {}), foundry.utils.deepClone(e.system), { inplace: !1 }) : null;
    if (n && this.isPersonalWeapon()) {
      e.system ?? (e.system = {});
      const u = n.ammo, d = ho(n);
      e.system.standardTraits = [], e.system.payloads = Qt(n.payloads, { legacyAmmo: u, category: n.category }), e.system.consumptionSources = ca(n.consumptionSources, { legacyAmmo: u }), e.system.selectedPayloadId = zi(
        n.selectedPayloadId,
        e.system.payloads,
        { legacyAmmo: u, category: n.category }
      ), e.system.traits = d.traits, e.system.keywords = d.keywords, e.system.resolution = Xa(n.resolution, "standard"), e.system.fireModes = Za(n.fireModes), e.system.attackRatingBand = Zn(n.attackRatingBand), e.system.range = Ui(n.range), e.system.damageType = xt(n.damageType), e.system["-=ammo"] = null, delete e.system.ammo;
    }
    if (n && this.isArmor() && (e.system ?? (e.system = {}), e.system.mitigationByType = Wt(n.mitigationByType ?? n.mitigation), e.system.tags = Ja(n.tags), e.system.traits = oa(n.traits), e.system.standardTraits = Yt(n.standardTraits), e.system.traitState = Yn({
      standardTraits: e.system.standardTraits,
      traits: e.system.traits,
      traitState: n.traitState
    }).traitState), n && this.isLifeModule()) {
      const u = es(n);
      e.system ?? (e.system = {}), foundry.utils.mergeObject(e.system, u.system, { inplace: !0, overwrite: !0 }), u.name && (e.name = u.name);
      return;
    }
    if (n && this.isQuality()) {
      e.system ?? (e.system = {});
      const u = _t(n);
      foundry.utils.mergeObject(e.system, u, { inplace: !0, overwrite: !0 });
      return;
    }
    if (n && this.isGear()) {
      e.system ?? (e.system = {}), e.system.quantity = go(n.quantity, 1), e.system.rating = yo(n.rating, 0), e.system.category = bo(n.category), e.system.tags = So(n.tags);
      return;
    }
    if (!this.isSkill()) return;
    const s = (l = e == null ? void 0 : e.system) == null ? void 0 : l.code;
    if (s === void 0) return;
    const r = this.system.code;
    if (s === r) return;
    const o = Ao(s);
    o && ((c = o == null ? void 0 : o.system) == null || delete c.code, foundry.utils.mergeObject(e, o, { inplace: !0 }));
  }
  prepareBaseData() {
    super.prepareBaseData();
    const e = this.canonicalType;
    e === A.itemType.personalWeapon ? this._preparePersonalWeaponBaseData() : e === A.itemType.armor ? this._prepareArmorBaseData() : e === A.itemType.lifeModule ? this._prepareLifeModuleBaseData() : e === A.itemType.quality ? this._prepareQualityBaseData() : e === A.itemType.gear && this._prepareGearBaseData();
  }
  _preparePersonalWeaponBaseData() {
    const e = this.system ?? {}, t = e.ammo;
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = xt(e.damageType), e.attackRatingBand = Zn(e.attackRatingBand), e.range = Ui(e.range);
    const i = ho(e);
    e.standardTraits = [], e.traits = i.traits, e.keywords = i.keywords, e.resolution = Xa(e.resolution, "standard"), e.fireModes = Za(e.fireModes), e.payloads = Qt(e.payloads, { legacyAmmo: t, category: e.category }), e.consumptionSources = ca(e.consumptionSources, { legacyAmmo: t }), e.selectedPayloadId = zi(e.selectedPayloadId, e.payloads, { legacyAmmo: t, category: e.category }), delete e.ammo, e.notes = String(e.notes ?? "").trim();
  }
  _prepareArmorBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.rating = Math.max(0, Number(e.rating ?? 0)), e.defenseBonus = Number(e.defenseBonus ?? 0) || 0, e.mitigationByType = Wt(e.mitigationByType ?? e.mitigation), delete e.mitigation, e.durability ?? (e.durability = {}), e.durability.max = Math.max(0, Number(e.durability.max ?? e.rating ?? 0)), e.durability.current = Math.min(
      e.durability.max,
      Math.max(0, Number(e.durability.current ?? e.durability.max ?? e.rating ?? 0))
    ), e.standardTraits = Yt(e.standardTraits), e.tags = Ja(e.tags), e.traits = oa(e.traits), e.traitState = Yn({
      standardTraits: e.standardTraits,
      traits: e.traits,
      traitState: e.traitState
    }).traitState, e.notes = String(e.notes ?? "").trim();
  }
  _prepareLifeModuleBaseData() {
    const e = es(this.system ?? {});
    foundry.utils.mergeObject(this.system, e.system, { inplace: !0, overwrite: !0 });
  }
  _prepareQualityBaseData() {
    const e = _t(this.system ?? {});
    foundry.utils.mergeObject(this.system, e, { inplace: !0, overwrite: !0 });
  }
  _prepareGearBaseData() {
    const e = this.system ?? {};
    e.quantity = go(e.quantity, 1), e.rating = yo(e.rating, 0), e.category = bo(e.category), e.tags = So(e.tags);
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
      const i = (s = (n = t.flags) == null ? void 0 : n[T]) == null ? void 0 : s[Ve.EQUIPPED_EFFECT_FLAG];
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
      const y = (h = (p = (f = g.flags) == null ? void 0 : f[T]) == null ? void 0 : p[Ve.EQUIPPED_EFFECT_FLAG]) == null ? void 0 : h.sourceEffectId;
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
        [Ve.EQUIPPED_EFFECT_FLAG]: {
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
    this.parent && await Ut.itemAttributeRoll(this, e);
  }
  async switchMonitorCheck(e, t, i, n = void 0) {
    await B.switchMonitorCheck(this.parent, e, t, i, n, this);
  }
  async setCounter(e, t) {
    await B.setCounter(this, e, t);
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
    const t = e(foundry.utils.deepClone(_t(this.system ?? {})));
    await this.update({ system: _t(t) });
  }
  async createQualityPrerequisite(e = {}) {
    await this._mutateQualitySystem((t) => (t.prerequisites = Xt(t.prerequisites).concat([{
      id: e.id ?? foundry.utils.randomID(),
      fact: e.fact ?? "",
      comparator: e.comparator ?? "eq",
      value: e.value ?? ""
    }]), t));
  }
  async deleteQualityPrerequisite(e) {
    await this._mutateQualitySystem((t) => (t.prerequisites = Xt(t.prerequisites).filter((i) => i.id !== e), t));
  }
  async updateQualityPrerequisite(e, t, i) {
    await this._mutateQualitySystem((n) => (n.prerequisites = Xt(n.prerequisites).map((s) => (s.id !== e || (t === "fact" && (s.fact = i), t === "comparator" && (s.comparator = i), t === "value" && (s.value = i)), s)), n));
  }
  async createQualityEffect(e = {}) {
    await this._mutateQualitySystem((t) => (t.effects = wi(t.effects).concat([{
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
      conditions: Xt(e.conditions ?? []),
      limit: fi(e.limit ?? {})
    }]), t));
  }
  async deleteQualityEffect(e) {
    await this._mutateQualitySystem((t) => (t.effects = wi(t.effects).filter((i) => i.id !== e), t));
  }
  async updateQualityEffect(e, t, i) {
    await this._mutateQualitySystem((n) => (n.effects = wi(n.effects).map((s) => (s.id !== e || (t === "type" && (s.type = i), t === "phase" && (s.phase = i), t === "selector" && (s.selector = i), t === "skillKeys" && (s.skillKeys = Array.isArray(i) ? i : []), t === "label" && (s.label = i), t === "value" && (s.value = Number(i ?? 0) || 0), t === "min" && (s.min = i === "" ? null : Number(i ?? 0)), t === "max" && (s.max = i === "" ? null : Number(i ?? 0)), t === "pool" && (s.pool = i), t === "operation" && (s.operation = i), t === "limit.perActivation" && (s.limit = fi({ ...s.limit ?? {}, perActivation: i })), t === "limit.perRound" && (s.limit = fi({ ...s.limit ?? {}, perRound: i })), t === "limit.perScene" && (s.limit = fi({ ...s.limit ?? {}, perScene: i }))), s)), n));
  }
  async createQualityEffectCondition(e, t = {}) {
    await this._mutateQualitySystem((i) => (i.effects = wi(i.effects).map((n) => (n.id !== e || (n.conditions = Xt(n.conditions).concat([{
      id: t.id ?? foundry.utils.randomID(),
      fact: t.fact ?? "",
      comparator: t.comparator ?? "eq",
      value: t.value ?? ""
    }])), n)), i));
  }
  async deleteQualityEffectCondition(e, t) {
    await this._mutateQualitySystem((i) => (i.effects = wi(i.effects).map((n) => (n.id !== e || (n.conditions = Xt(n.conditions).filter((s) => s.id !== t)), n)), i));
  }
  async updateQualityEffectCondition(e, t, i, n) {
    await this._mutateQualitySystem((s) => (s.effects = wi(s.effects).map((r) => (r.id !== e || (r.conditions = Xt(r.conditions).map((o) => (o.id !== t || (i === "fact" && (o.fact = n), i === "comparator" && (o.comparator = n), i === "value" && (o.value = n)), o))), r)), s));
  }
  async _mutateWeaponStandardTraits(e = (t) => t) {
    var i;
    const t = e(foundry.utils.deepClone(Ti((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": Ti(t) });
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
    const t = e(foundry.utils.deepClone(Yt((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": Yt(t) });
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
      Qt((n = this.system) == null ? void 0 : n.payloads, {
        legacyAmmo: (s = this.system) == null ? void 0 : s.ammo,
        category: ((r = this.system) == null ? void 0 : r.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
      })
    )).map(dt), i = zi((l = this.system) == null ? void 0 : l.selectedPayloadId, t, {
      category: ((c = this.system) == null ? void 0 : c.category) ?? ((u = this.system) == null ? void 0 : u.weaponCategory)
    });
    await this.update({
      "system.payloads": t,
      "system.selectedPayloadId": i,
      "system.-=ammo": null
    });
  }
  async _mutateConsumptionSources(e = (t) => t) {
    var i, n;
    const t = e(foundry.utils.deepClone(
      ca((i = this.system) == null ? void 0 : i.consumptionSources, { legacyAmmo: (n = this.system) == null ? void 0 : n.ammo })
    )).map(Zt);
    await this.update({
      "system.consumptionSources": t,
      "system.-=ammo": null
    });
  }
  async updatePayloadField(e, t, i) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((n) => n.map((s) => s.id !== e ? s : (foundry.utils.setProperty(s, t, i), dt(s))));
  }
  async createPayload(e = {}) {
    await this._mutatePayloads((t) => t.concat([dt({
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
    const t = ((s = this.system) == null ? void 0 : s.category) ?? ((r = this.system) == null ? void 0 : r.weaponCategory), i = Qt((o = this.system) == null ? void 0 : o.payloads, {
      legacyAmmo: (l = this.system) == null ? void 0 : l.ammo,
      category: t
    }).filter((u) => u.id !== e), n = ((c = i[0]) == null ? void 0 : c.id) ?? "unloaded";
    await this.update({
      "system.payloads": i.length ? i : Qt([], { category: t }),
      "system.selectedPayloadId": i.some((u) => {
        var d;
        return u.id === ((d = this.system) == null ? void 0 : d.selectedPayloadId);
      }) ? this.system.selectedPayloadId : i.length ? n : "",
      "system.-=ammo": null
    });
  }
  async createPayloadStandardTrait(e, t = {}) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((n) => n.id !== e ? n : (n.modifies ?? (n.modifies = {}), n.modifies.standardTraits = Ti(n.modifies.standardTraits).concat([{
      id: t.id ?? foundry.utils.randomID(),
      key: t.key ?? "armorPiercing",
      rating: Math.max(0, Number(t.rating ?? 0) || 0)
    }]), dt(n))));
  }
  async deletePayloadStandardTrait(e, t) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((n) => n.id !== e ? n : (n.modifies ?? (n.modifies = {}), n.modifies.standardTraits = Ti(n.modifies.standardTraits).filter((s) => s.id !== t), dt(n))));
  }
  async updatePayloadStandardTrait(e, t, i, n) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((s) => s.map((r) => r.id !== e ? r : (r.modifies ?? (r.modifies = {}), r.modifies.standardTraits = Ti(r.modifies.standardTraits).map((o) => (o.id !== t || (i === "key" && (o.key = n), i === "rating" && (o.rating = Math.max(0, Number(n ?? 0) || 0))), o)), dt(r))));
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
      return ((n = i == null ? void 0 : i.consumption) == null ? void 0 : n.sourceId) !== e ? i : (i.consumption.sourceId = "", dt(i));
    }));
  }
  async updateConsumptionSourceField(e, t, i) {
    await this._mutateConsumptionSources((n) => n.map((s) => s.id !== e ? s : (foundry.utils.setProperty(s, t, i), Zt(s))));
  }
  getPayloadState({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var i, n, s, r, o;
    return ws({
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
    const r = this.getPayloadState({ payloadId: e || t }), o = (r == null ? void 0 : r.sourceState) ?? null, l = (r == null ? void 0 : r.source) ?? null, c = String((r == null ? void 0 : r.activePayloadId) ?? "").trim(), u = String((r == null ? void 0 : r.payloadLabel) ?? "").trim() || "Unloaded", d = Math.max(0, Number((o == null ? void 0 : o.current) ?? 0) || 0), m = Math.max(0, Number((o == null ? void 0 : o.max) ?? 0) || 0), f = !!((g = z.getCombat(this.actor)) != null && g.combatant);
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
    const t = zi(
      e,
      Qt((i = this.system) == null ? void 0 : i.payloads, {
        legacyAmmo: (n = this.system) == null ? void 0 : n.ammo,
        category: ((s = this.system) == null ? void 0 : s.category) ?? ((r = this.system) == null ? void 0 : r.weaponCategory)
      }),
      {
        category: ((o = this.system) == null ? void 0 : o.category) ?? ((l = this.system) == null ? void 0 : l.weaponCategory)
      }
    );
    await this.update({
      "system.selectedPayloadId": t,
      "system.-=ammo": null
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
    const i = this.system ?? {}, n = Ui(i.range), s = String(i.skill ?? "").trim(), r = Ot(s), o = Number(i.damage ?? 0) || 0, l = String(i.category ?? i.weaponCategory ?? "ranged").trim() || "ranged", c = sd({
      damageType: i.damageType,
      ap: Number(i.ap ?? i.armorPiercing ?? 0) || 0,
      attackRatingBand: Zn(i.attackRatingBand),
      traits: oa(i.traits),
      keywords: Gu(i.keywords),
      standardTraits: [],
      resolution: Xa(i.resolution, "standard"),
      fireModes: Za(i.fireModes),
      payloads: Qt(i.payloads, { legacyAmmo: i.ammo, category: l }),
      selectedPayloadId: zi(i.selectedPayloadId, i.payloads, { legacyAmmo: i.ammo, category: l }),
      consumptionSources: ca(i.consumptionSources, { legacyAmmo: i.ammo }),
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
      damageTypeLabel: $t(c.damageType),
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
    ), r = Math.min(i, s), o = Wt((t == null ? void 0 : t.mitigationByType) ?? (t == null ? void 0 : t.mitigation)), l = Yn({
      standardTraits: Yt(t == null ? void 0 : t.standardTraits),
      traits: oa(t == null ? void 0 : t.traits),
      traitState: t == null ? void 0 : t.traitState
    }), c = Ja(t == null ? void 0 : t.tags), u = mr(r);
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
      mitigationByType: Pl(o, l.mitigationByType),
      tags: c,
      isDestroyed: s <= 0,
      durability: {
        current: s,
        max: n
      },
      traitState: l.traitState,
      standardTraits: Yt(t.standardTraits),
      traits: rd({
        traits: oa(t.traits),
        standardTraits: Yt(t.standardTraits)
      }),
      notes: String(t.notes ?? "").trim()
    };
  }
  getDefaultRangeBand(e = Ui(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    return uf(e);
  }
  isWeaponSkill(e) {
    return ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === A.itemType.skill && e.system.code === this.system.skill;
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find((n) => this.isWeaponSkill(n));
    if (e) return e;
    const t = game.items.find((n) => this.isWeaponSkill(n));
    return t || Ao(this.system.skill);
  }
  getDefense() {
    if (!this.isPersonalWeapon())
      return this.system.defense ? Ne.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return Ne.fixedDefenseCode(this.system.defense);
    const e = Ot(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? Ne.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent) return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0, i = this.isPersonalWeapon() ? this.getCombatProfile() : null;
    return {
      value: mf(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: (i == null ? void 0 : i.damageType) ?? this.system.damageType,
      damageTypeLabel: (i == null ? void 0 : i.damageTypeLabel) ?? this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: pf(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  getDamageCode() {
    return ff(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  getDamageTypeLabel() {
    var t;
    if (this.isPersonalWeapon())
      return $t(((t = this.getCombatProfile()) == null ? void 0 : t.damageType) ?? this.system.damageType);
    const e = Ce.mwd.weaponDamageType[this.system.damageType] ?? Ce.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return df(Ui(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  validateTargets(e) {
    var r;
    const t = (r = this.getDamage()) == null ? void 0 : r.monitor, i = Dt.getTargetTokens(game.user), n = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), s = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (s.length > 0) {
      const o = Te(Ce.common.errors.ignoredTargets, {
        targets: s.reduce(se.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (n.length === 0) {
      const o = Te(Ce.common.errors.noTargetSelected, {
        weapon: this.name ?? Ce.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(n);
    return n;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = po[t] ?? {};
    Ri.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = po[t] ?? {};
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
Na = new WeakMap(), Lt = new WeakSet(), _s = async function(e) {
  if (typeof (e == null ? void 0 : e.syncEquippedActorEffects) == "function")
    try {
      await e.syncEquippedActorEffects();
    } catch (t) {
      console.error(`${Ae}Failed to sync equipped item effects`, { item: e, error: t });
    }
}, Ac = async function(e) {
  if (typeof (e == null ? void 0 : e.removeSyncedActorEffects) == "function")
    try {
      await e.removeSyncedActorEffects({ actor: e.actor ?? e.parent ?? null });
    } catch (t) {
      console.error(`${Ae}Failed to remove synced item effects`, { item: e, error: t });
    }
}, on = async function(e) {
  const t = e == null ? void 0 : e.parent;
  if (typeof (t == null ? void 0 : t.syncEquippedActorEffects) == "function")
    try {
      await t.syncEquippedActorEffects();
    } catch (i) {
      console.error(`${Ae}Failed to sync parent item effects`, { effect: e, error: i });
    }
}, Pe(Ve, Lt), Pe(Ve, Na, !1), D(Ve, "RANGE_ORDER", Ni), D(Ve, "EQUIPPED_EFFECT_FLAG", "equippedItemSync"), D(Ve, "DEFAULT_UNARMED", Object.freeze({
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
let ta = Ve;
const wo = {
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
}, gf = {
  code: "weapon-range",
  options: {
    flags: { editable: !0 },
    order: 20,
    category: be.pool,
    labelkey: Ce.common.roll.modifiers.weaponRange,
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
}, yf = {
  code: "weapon-area",
  options: {
    used: !0,
    order: 20,
    category: be.pool,
    labelkey: Ce.common.roll.modifiers.weaponArea,
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
}, pe = class pe extends ta {
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
    Hooks.once(xe.REGISTER_ROLL_PARAMETERS, (e) => {
      e(yf), e(gf);
    });
  }
  prepareBaseData() {
    if (super.prepareBaseData(), (this.canonicalType ?? this.type) !== A.itemType.personalWeapon) return;
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = xt(e.damageType), e.attackRatingBand = pe.normalizeAttackRatingBand(e.attackRatingBand), e.range = pe.normalizePersonalRangeData(e.range), e.traits = pe.normalizeTraits(e.traits), e.notes = String(e.notes ?? "").trim();
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
    const t = e ?? {}, i = pe.normalizeRangeKey(t.max ?? "near"), n = pe.maxIndex(i), s = pe.RANGE_ORDER.map((l, c) => ({
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
    return aa(e);
  }
  static normalizePersonalRangeData(e) {
    const t = Mr(e);
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
    const t = this.system ?? {}, i = this.canonicalType ?? this.type, n = i === A.itemType.personalWeapon ? pe.normalizePersonalRangeData(t.range) : pe.normalizeRangeData(t.range), s = String(t.skill ?? "").trim(), r = Ot(s), o = Number(t.damage ?? 0) || 0, l = Number(t.ap ?? t.armorPiercing ?? 0) || 0, c = String(t.category ?? t.weaponCategory ?? "ranged").trim() || "ranged", u = pe.normalizeTraits(t.traits);
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
      damageType: i === A.itemType.personalWeapon ? xt(t.damageType) : String(t.damageType ?? "kinetic").trim() || "kinetic",
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
      return this.system.defense ? Ne.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return Ne.fixedDefenseCode(this.system.defense);
    const e = Ot(String(this.system.skill ?? "").trim());
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
        return console.warn("Weapon not attached to an actor"), Ce.item.personalWeapon.weaponWithoutActor;
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
    return i && Ce.attributes[i] && (n += Ce.attributes[i].substring(0, 3).toUpperCase() + "/2 + "), n += String(t), n;
  }
  static armorMode(e, t) {
    return B.useArmor(e) ? t ? "noArmor" : "withArmor" : "";
  }
  getDamageTypeLabel() {
    if ((this.canonicalType ?? this.type) === A.itemType.personalWeapon)
      return $t(this.system.damageType);
    const e = Ce.mwd.weaponDamageType[this.system.damageType] ?? Ce.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    const e = (this.canonicalType ?? this.type) === A.itemType.personalWeapon, t = e ? pe.normalizePersonalRangeData(this.system.range) : pe.normalizeRangeData(this.system.range);
    return pe.getRangeList(t, {
      personalScale: e
    }).filter((i) => i.allowed).map((i) => ({ value: i.value, labelkey: i.labelkey }));
  }
  _getRange(e) {
    return { value: this.system.range[e], labelkey: Se.getFromList(Se.getEnums().ranges, e) };
  }
  static getRangeList(e, { personalScale: t = !1 } = {}) {
    const i = pe.normalizeRangeKey(e == null ? void 0 : e.max), n = pe.RANGE_ORDER.indexOf(i);
    return pe.RANGE_ORDER.map((s, r) => ({
      key: s,
      allowed: n >= 0 ? r <= n : r === 0,
      value: (e == null ? void 0 : e[s]) ?? (s === "extreme" && (e == null ? void 0 : e.long) !== void 0 ? e.long : void 0),
      labelkey: t ? Tn(s) : Se.getFromList(Se.getEnums().ranges, s)
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
    const t = (r = this.getDamage()) == null ? void 0 : r.monitor, i = Dt.getTargetTokens(game.user), n = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), s = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (s.length > 0) {
      const o = Te(Ce.common.errors.ignoredTargets, {
        targets: s.reduce(se.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (n.length == 0) {
      const o = Te(Ce.common.errors.noTargetSelected, {
        weapon: this.name ?? Ce.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(n);
    return n;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = wo[t] ?? {};
    Ri.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = wo[t] ?? {};
    return i.targets && i.adjust && e <= i.targets ? i.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area == "" ? A.area.none : this.system.area ?? A.area.none;
  }
  _getMonitor() {
    return (this.canonicalType ?? this.type) === A.itemType.personalWeapon ? A.monitors.physical : this.system.monitor || A.monitors.physical;
  }
};
D(pe, "RANGE_ORDER", ["close", "near", "far", "extreme"]), D(pe, "DEFAULT_UNARMED", ta.DEFAULT_UNARMED);
let At = pe;
function bf(a) {
  const e = [];
  for (let [t, i] of Object.entries(a ?? {}))
    i !== void 0 && (t = t.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (n, s) => (s ? "-" : "") + n.toLowerCase()), e.push(`data-${t}="${Handlebars.escapeExpression(i)}"`));
  return new Handlebars.SafeString(e.join(" "));
}
function Sf({ hash: a }) {
  return a;
}
function Af() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
class Rr {
  constructor() {
    this.registerHelpers(), Hooks.once("init", () => {
      this.registerHelpers(), console.log(`${Ae}Handlebars helpers registered (init)`);
    }), console.log(`${Ae}Handlebars helpers registered (ctor)`);
  }
  registerHelpers() {
    const e = Af(), t = {
      // Foundry utils
      getProperty: foundry.utils.getProperty,
      // DND5E-inspired utilities
      "mwd-dataset": bf,
      "mwd-object": Sf,
      // Simple comparisons
      eq: (i, n) => i === n,
      ne: (i, n) => i !== n,
      // Strings/arrays
      concat: (...i) => se.join(i.slice(0, -1)),
      join: (i, n = " ") => Array.isArray(i) ? i.join(n) : "",
      includes: (i, n) => i == null ? void 0 : i.includes(n),
      length: (i) => (i == null ? void 0 : i.length) || 0,
      substring: (i, n, s) => i == null ? void 0 : i.substring(n, s),
      toUpperCase: gu.toUpperCaseNoAccent,
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
      for: Rr.hbsForLoop,
      // fixes “Missing helper: for”
      range: (i, n) => Array.from({ length: n - i + 1 }, (s, r) => i + r),
      ifGte: (i, n, s) => i >= n ? s.fn(this) : s.inverse(this),
      // Damage / weapons (legacy-compatible)
      weaponDamageLetter: hu.letter,
      weaponDamageCode: At.damageCode,
      weaponDamageValue: At.damageValue,
      weaponArmorMode: At.armorMode,
      weaponRangeList: At.getRangeList,
      // Icons
      iconFA: K.fontAwesome,
      iconSrc: K.iconSystemPath,
      iconPath: K.iconPath,
      iconD6: K.iconD6,
      // Enums
      localizeAttribute: Se.localizeAttribute
    };
    e.registerHelper(t), e !== Handlebars && Handlebars.registerHelper(t);
  }
  static hbsForLoop(e, t, i) {
    let n = "";
    for (let s = e; s < t; ++s) n += i.fn(s);
    return n;
  }
}
const To = "sheetTheme", Os = "mwd-theme-default", wf = "mwd-theme-sra", Tf = [
  { name: "Default (CSB)", cssClass: Os },
  { name: "SRA", cssClass: wf }
];
class vf {
  constructor() {
    this.availableStyles = {}, Ci.register(xe.REGISTER_STYLES), Hooks.once(xe.REGISTER_STYLES, (e) => Tf.forEach((t) => e(t.cssClass, t.name))), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(xe.REGISTER_STYLES, (e, t) => this.availableStyles[e] = t), console.log(Ae + "Loaded styles", this.availableStyles), game.settings.register(T, To, {
      scope: "world",
      name: "Sheet Theme",
      hint: "Select the visual theme used by MWD sheets.",
      config: !0,
      default: Os,
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
    const e = game.settings.get(T, To);
    return this.availableStyles[e] ? e : Os;
  }
}
function Sa(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function ts(a, e) {
  var i, n, s;
  if (!a) return null;
  const t = Sa(e) ?? Sa(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((s = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : s.call(i, ((n = t == null ? void 0 : t.baseActor) == null ? void 0 : n.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function vo(a) {
  const e = Number(a ?? 0);
  return Number.isFinite(e) ? Math.trunc(e) : 0;
}
function Wa(a, e) {
  var t, i, n;
  return Math.max(0, Number(((n = (i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.monitors) == null ? void 0 : i[e]) == null ? void 0 : n.value) ?? 0) || 0);
}
function ko(a) {
  var e, t;
  return Math.max(0, Number(((t = (e = a == null ? void 0 : a.system) == null ? void 0 : e.burn) == null ? void 0 : t.value) ?? 0) || 0);
}
function ua(a) {
  return a === A.monitors.physical ? "Physical" : a === A.monitors.fatigue ? "Fatigue" : String(a ?? "").trim() || "Track";
}
function kf(a, e) {
  var t;
  return ((t = yr(e).find((i) => i.id === a)) == null ? void 0 : t.label) ?? a;
}
function Ef(a) {
  const e = foundry.utils.escapeHTML, t = [];
  if (a.mode === "attackDamage" || a.mode === "trackDelta") {
    const i = a.appliedDelta >= 0 ? "Applied" : "Recovered", n = Math.abs(Number(a.appliedDelta ?? 0)), s = n === 1 ? "point" : "points", r = a.usedArmor ? ` via armor-aware ${e($t(a.damageType))}` : "";
    t.push(`<div><b>${i}:</b> ${n} ${s} to ${e(ua(a.track))}${r}</div>`), a.usedArmor && a.mitigation && (t.push(
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
function Mf(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
class ft {
  static supportsActor(e) {
    return (e == null ? void 0 : e.type) === A.actorTypes.character || (e == null ? void 0 : e.type) === A.actorTypes.npc;
  }
  static getActorOptions() {
    return Array.from(game.actors ?? []).filter((e) => this.supportsActor(e)).sort((e, t) => String(e.name ?? "").localeCompare(String(t.name ?? ""))).map((e) => ({
      id: e.id,
      name: e.name || "Character"
    }));
  }
  static getStatusOptions(e = null) {
    return yr(e).map((t) => ({
      value: t.id,
      label: t.label,
      active: t.active
    }));
  }
  static getSceneTarget() {
    var i, n;
    const e = Array.from(((i = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : i.controlled) ?? []);
    if (e.length > 1)
      return { actor: null, token: null, reason: "Select only one controlled token." };
    if (e.length === 1) {
      const s = Sa(e[0]), r = ts((s == null ? void 0 : s.actor) ?? null, s);
      return this._resolveSceneTargetResult(r, s);
    }
    const t = Array.from(((n = game.user) == null ? void 0 : n.targets) ?? []);
    if (t.length > 1)
      return { actor: null, token: null, reason: "Target only one token." };
    if (t.length === 1) {
      const s = Sa(t[0]), r = ts((s == null ? void 0 : s.actor) ?? null, s);
      return this._resolveSceneTargetResult(r, s);
    }
    return { actor: null, token: null, reason: "No controlled or targeted token." };
  }
  static _resolveSceneTargetResult(e, t) {
    return !t || !e ? { actor: null, token: null, reason: "No controlled or targeted token." } : this.supportsActor(e) ? {
      actor: e,
      token: t,
      reason: ""
    } : {
      actor: null,
      token: t,
      reason: `${e.name || "Token actor"} is not supported by the GM harm tool.`
    };
  }
  static resolveTarget({ actor: e = null, token: t = null, actorId: i = "", preferSceneTarget: n = !1 } = {}) {
    var o, l;
    const s = Sa(t);
    if (s) {
      const c = ts((s == null ? void 0 : s.actor) ?? e, s), u = this._resolveSceneTargetResult(c, s);
      if (u.actor) return { ...u, source: "token" };
    }
    if (n) {
      const c = this.getSceneTarget();
      if (c.actor) return { ...c, source: "scene" };
    }
    if (e && this.supportsActor(e))
      return { actor: e, token: s, reason: "", source: "actor" };
    const r = i ? ((l = (o = game.actors) == null ? void 0 : o.get) == null ? void 0 : l.call(o, i)) ?? null : null;
    return r && this.supportsActor(r) ? { actor: r, token: null, reason: "", source: "fallback" } : {
      actor: null,
      token: s,
      source: null,
      reason: n && this.getSceneTarget().reason || "Choose a supported character target."
    };
  }
  static async apply({ actor: e = null, token: t = null, payload: i = {}, options: n = {} } = {}) {
    var l;
    const s = this.resolveTarget({
      actor: e,
      token: t,
      actorId: n.actorId ?? "",
      preferSceneTarget: !!n.preferSceneTarget
    });
    if (!s.actor)
      return { ok: !1, reason: s.reason || "Choose a supported character target." };
    let r;
    switch (String((i == null ? void 0 : i.mode) ?? "").trim()) {
      case "attackDamage":
        r = await this._applyAttackDamage(s.actor, i, n);
        break;
      case "trackDelta":
        r = await this._applyTrackDelta(s.actor, i, n);
        break;
      case "burnDelta":
        r = await this._applyBurnDelta(s.actor, i);
        break;
      case "status":
        r = await this._applyStatus(s.actor, i);
        break;
      default:
        return { ok: !1, reason: "Unsupported harm mode." };
    }
    const o = {
      ok: !0,
      actor: s.actor,
      token: s.token,
      actorName: s.actor.name || "Character",
      sourceType: s.source,
      dryRun: !!n.dryRun,
      ...r
    };
    if (n.logToChat && !n.dryRun) {
      const c = Ef(o), u = Mf({
        speaker: ChatMessage.getSpeaker({ actor: s.actor, token: s.token }),
        content: c
      });
      await ChatMessage.create(u);
    }
    return n.dryRun || (l = z.renderOpenCharacterSheets) == null || l.call(z, s.actor.id), o;
  }
  static async _applyTrackDelta(e, t, i = {}) {
    const n = (t == null ? void 0 : t.track) === A.monitors.fatigue ? A.monitors.fatigue : A.monitors.physical, s = vo((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0);
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
    const o = Wa(e, n);
    i.dryRun || await B.addCounter(e, n, s);
    const l = i.dryRun ? Math.max(0, o + s) : Wa(e, n);
    return {
      mode: "trackDelta",
      track: n,
      requestedDelta: s,
      appliedDelta: l - o,
      usedArmor: !1,
      beforeLabel: `${ua(n)} ${o}`,
      afterLabel: `${ua(n)} ${l}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyBurnDelta(e, t) {
    var l, c;
    const i = vo((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0), n = ko(e), s = Math.max(0, n + i), r = { "system.burn.value": s };
    s === 0 && ((c = (l = e.system) == null ? void 0 : l.burn) != null && c.overloaded) && (r["system.burn.overloaded"] = !1), await e.update(r);
    const o = ko(e);
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
    const n = bn(e, i), s = !!(t != null && t.active);
    await Fl({ actor: e, statusId: i, active: s });
    const r = bn(e, i);
    return {
      mode: "status",
      statusId: i,
      statusLabel: kf(i, e),
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
    var j, O, x, q, Z, ae, ue, oe, E;
    const n = !!i.dryRun, s = (t == null ? void 0 : t.track) === A.monitors.fatigue ? A.monitors.fatigue : A.monitors.physical, r = Math.max(0, Number((t == null ? void 0 : t.damage) ?? 0) || 0), o = Math.max(0, Number((t == null ? void 0 : t.netHits) ?? 0) || 0), l = (t == null ? void 0 : t.effects) ?? {}, c = ((j = e.getPersonalCombatLoadout) == null ? void 0 : j.call(e, { refresh: !0 })) ?? null, u = (c == null ? void 0 : c.activeArmor) ?? null, d = Math.max(0, Number((u == null ? void 0 : u.currentArmorRating) ?? ((O = u == null ? void 0 : u.durability) == null ? void 0 : O.current) ?? 0) || 0), m = xt(t == null ? void 0 : t.damageType, "concussive"), f = Wa(e, s);
    let p = r + o;
    const h = d > 0 ? ld({
      damageIncoming: p,
      armorTags: (u == null ? void 0 : u.tags) ?? [],
      effects: l
    }) : { damageIncoming: p, applied: [] };
    p = h.damageIncoming;
    const g = od({
      currentArmorRating: d,
      mitigationByType: (u == null ? void 0 : u.mitigationByType) ?? {},
      damageType: m
    }), y = Math.max(
      0,
      (Number((t == null ? void 0 : t.ap) ?? 0) || 0) + (Number((l == null ? void 0 : l.ap) ?? 0) || 0)
    ), b = g.isDestroyed ? 0 : Math.max(0, g.baseMitigation + g.typeMitigationMod - y);
    let S = Math.max(0, Math.ceil(p - b));
    const w = {
      snapshot: ((x = z.getSnapshot) == null ? void 0 : x.call(z, e)) ?? null
    }, M = St({
      actor: e,
      phase: "onDamageResolved",
      facts: ec({
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
    n || await ei({ actor: e, mutations: M.mutations, runtime: w }), S = Math.max(0, Number(M.packet.amount ?? S) || 0), !n && S > 0 && await B.addCounter(e, s, S);
    const N = Math.max(0, Number(((q = u == null ? void 0 : u.durability) == null ? void 0 : q.current) ?? 0) || 0);
    let P = N;
    const L = Math.max(0, Number(((ae = (Z = u == null ? void 0 : u.traitState) == null ? void 0 : Z.reinforced) == null ? void 0 : ae.current) ?? 0) || 0), V = Math.max(0, Number(((oe = (ue = u == null ? void 0 : u.traitState) == null ? void 0 : ue.reinforced) == null ? void 0 : oe.max) ?? 0) || 0);
    let G = L;
    if (r + o > 0 && ((E = u == null ? void 0 : u.item) != null && E.id)) {
      const U = {};
      L > 0 ? (G = Math.max(0, L - 1), G !== L && (U["system.traitState.reinforced.current"] = G)) : (P = Math.max(0, N - 1), P !== N && (U["system.durability.current"] = P)), !n && Object.keys(U).length > 0 && await u.item.update(U);
    }
    const W = n ? Math.max(0, f + S) : Wa(e, s);
    return {
      mode: (t == null ? void 0 : t.mode) ?? "attackDamage",
      track: s,
      requestedDelta: r + o,
      appliedDelta: W - f,
      usedArmor: !0,
      damageType: m,
      effectiveAp: y,
      mitigation: {
        ...g,
        netResistance: b,
        armorBefore: N,
        armorAfter: P,
        reinforcedBefore: L,
        reinforcedAfter: G,
        reinforcedMax: V
      },
      damageIncoming: p,
      adjustedIncoming: p,
      finalDamage: S,
      tagEffectResult: h,
      beforeLabel: `${ua(s)} ${f}`,
      afterLabel: `${ua(s)} ${W}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
}
D(ft, "MODE_OPTIONS", Object.freeze([
  { value: A.monitors.physical, label: "Physical" },
  { value: A.monitors.fatigue, label: "Fatigue" },
  { value: "burn", label: "Burn" },
  { value: "status", label: "Status" }
]));
const Eo = pn, Ls = "damage-mode", Cf = `${T}.${Ls}`, ja = {}, is = {};
class de {
  static init() {
    Ci.register(xe.PROVIDE_DAMAGE_MODE), Hooks.on("updateSetting", async (e, t, i, n) => de.onUpdateSetting(e, t, i, n)), Hooks.on(xe.PROVIDE_DAMAGE_MODE, (e) => {
      e("resistanceArmorMonitor", v.settings.damageMode.values.resistanceArmorMonitor, de.sufferDamageResistanceArmorMonitor), e("armorResistanceMonitor", v.settings.damageMode.values.armorResistanceMonitor, de.sufferDamageArmorResistanceMonitor), e("armorGivesResistance", v.settings.damageMode.values.armorGivesResistance, de.sufferDamageArmorAsResistance_Earthdawn), e("armorGiveResistanceHitsAvoid", v.settings.damageMode.values.armorGiveResistanceHitsAvoid, de.sufferDamageArmorAsResistance_Cyberpunk);
    }), Hooks.once("ready", () => de.onReady());
  }
  static onReady() {
    de._registerDamageModeSetting(), de._selectDamageMode();
  }
  static _registerDamageModeSetting() {
    Hooks.callAll(xe.PROVIDE_DAMAGE_MODE, (e, t, i) => {
      ja[e] = t, is[e] = i;
    }), game.settings.register(T, Ls, {
      scope: "world",
      name: v.settings.damageMode.name,
      hint: v.settings.damageMode.hint,
      config: !0,
      default: Object.keys(ja)[0],
      choices: ja,
      type: String
    });
  }
  static async onUpdateSetting(e, t, i, n) {
    e.key == Cf && de._selectDamageMode();
  }
  static _selectDamageMode() {
    let e = game.settings.get(T, Ls);
    is[e] || (e = Object.keys(ja)[0]), de.damageModeCode = e, de.damageModeMethod = is[e];
  }
  static async sufferDamage(e, t, i, n, s, r, o) {
    const { monitor: l, damageType: c } = de._resolveDamageContext(e, t, o);
    if (Ri.checkActorCanReceiveDamage(c ?? l, l, e), de._shouldUsePersonalDamageV2(e, l, o)) {
      await de.sufferPersonalDamageV2(e, l, c, i, n, s, r, o);
      return;
    }
    await (de.damageModeMethod ?? de.sufferDamageResistanceArmorMonitor)(e, l, c, i, n, s, r), await e.applyArmorDamage(l, c, ce.sumModifiers([o], "other", "damageArmor"));
  }
  static _shouldUsePersonalDamageV2(e, t, i) {
    var n, s;
    return !((n = e == null ? void 0 : e.isCharacterLike) != null && n.call(e)) || ![A.monitors.physical, A.monitors.fatigue].includes(t) ? !1 : !!((s = i == null ? void 0 : i.isPersonalWeapon) != null && s.call(i) || (i == null ? void 0 : i.canonicalType) === A.itemType.personalWeapon || (i == null ? void 0 : i.type) === A.itemType.personalWeapon);
  }
  static async sufferPersonalDamageV2(e, t, i, n, s, r, o, l) {
    var d;
    const c = ((d = l == null ? void 0 : l.getCombatProfile) == null ? void 0 : d.call(l)) ?? l ?? null, u = await ft.apply({
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
    const i = t.armorMitigation ?? {}, n = de._localizeDamageType(t.damageType), s = i.isDestroyed ? "Armor destroyed" : `Base ${Number(i.baseMitigation ?? 0)} + Type ${Number(i.typeMitigationMod ?? 0)} - AP ${Number(t.effectiveAp ?? 0)}`, r = Number(t.adjustedIncoming ?? t.baseIncoming ?? 0), o = Number(t.finalDamage ?? 0), l = (((u = t.tagEffectResult) == null ? void 0 : u.applied) ?? []).map((d) => `${d.tag} +${Math.round((Number(d.bonus ?? 0) || 0) * 100)}%`).join(", "), c = l ? ` [${l}]` : "";
    ui.notifications.info(
      `${e.name} mitigated ${n}: ${s}${c}. Incoming ${r}, final ${o}.`
    );
  }
  static async sufferDamageResistanceArmorMonitor(e, t, i, n, s, r, o) {
    const l = B.resistanceDetail(e, t, i), c = l.value;
    let u = 0;
    if (r) {
      const d = Math.min(c, n), m = Math.min(c - d, s);
      u = n - d, B.useArmor(t) && (u -= await de.damageToArmor(e, i, u)), u += s - m;
    } else
      u = n + s - c, B.useArmor(t) && (u -= await de.damageToArmor(e, i, u));
    u > 0 && await B.addCounter(e, t, u), de._notifyResistanceUsage(e, t, i, l);
  }
  static async sufferDamageArmorResistanceMonitor(e, t, i, n, s, r, o) {
    let l = 0;
    B.useArmor(t) ? r ? (n -= await de.damageToArmor(e, i, n), l = s + n) : (l = s + n, l -= await de.damageToArmor(e, i, l)) : l = n + s;
    const c = B.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await B.addCounter(e, t, l), de._notifyResistanceUsage(e, t, i, c), l;
  }
  static async sufferDamageArmorAsResistance_Cyberpunk(e, t, i, n, s, r, o) {
    let l = n + s;
    if (B.useArmor(t) && l > 0) {
      const u = r ? s : 0, d = Math.max(0, de._computeArmorResistance(e) - u);
      d > 0 && (await B.addCounter(e, "armor", 1), l -= d);
    }
    const c = B.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await B.addCounter(e, t, l), de._notifyResistanceUsage(e, t, i, c), Math.max(l, 0);
  }
  static async sufferDamageArmorAsResistance_Earthdawn(e, t, i, n, s, r, o) {
    let l = n + s;
    if (B.useArmor(t) && !r && l > 0) {
      const u = de._computeArmorResistance(e);
      u > 0 && (await B.addCounter(e, "armor", 1), l -= u);
    }
    l -= de._computeStrengthResistance(e, t);
    const c = B.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await B.addCounter(e, t, l), de._notifyResistanceUsage(e, t, i, c), l;
  }
  static async damageToArmor(e, t, i) {
    if (i > 0) {
      const n = B.max(e, A.monitors.armor), s = B.getCounterValue(e, A.monitors.armor), r = Math.min(n - s, i), o = B.resistance(e, A.monitors.armor, t), l = Math.max(0, r - o);
      return l > 0 && await B.addCounter(e, A.monitors.armor, l), r;
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
    const s = v.actor.monitors[t] ?? t, r = de._localizeDamageType(i) ?? s, o = n.usedType ? "type" : "default", l = ((u = v.actor.monitors.resistanceSources) == null ? void 0 : u[o]) ?? o, c = Te(v.actor.monitors.resistanceApplied, {
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
      return wl(e) ? $t(e) : v.mwd.weaponDamageType[e] ?? v.mwd.personalDamageType[e] ?? v.actor.monitors[e] ?? e;
  }
  static _computeArmorResistance(e) {
    const t = B.max(e, "armor"), i = B.getCounterValue(e, "armor"), n = Math.max(0, t - i);
    return Math.max(0, Math.ceil(n / 3));
  }
  static _computeStrengthResistance(e, t) {
    const i = e.getAttributeValue(A.actorAttributes.strength);
    return Math.max(0, Math.floor(i / 4));
  }
}
class mt extends Actor {
  static init() {
    Hooks.on("updateActor", (e, t, i, n) => {
      var s;
      return (s = Dt.firstResponsible(e)) == null ? void 0 : s.onUpdateActor(t, i);
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
      initiative: ce.sumModifiers(this.items, "other", "initiative")
    }, this.system.monitors) {
      const e = Se.getDamageTypes();
      Object.entries(this.system.monitors).forEach((t) => {
        t[1].resistance = mt.normalizeResistance(t[1].resistance), t[1].maxBonus = ce.sumMonitorModifiers(this.items, t[0], "max"), t[1].resistanceBonus = ce.sumMonitorModifiers(this.items, t[0], "resistance"), t[1].resistanceBonusByType = Object.fromEntries(
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
    return Ji[this.type] ?? [];
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
    return t == 0 ? 0 : rl + se.divup(t, 2);
  }
  getAttributeActions() {
    return Ne.getActorActions(this);
  }
  getUsableAttributes(e = void 0) {
    const t = (e ? [e] : this.items).map((n) => n.getAttributes()).reduce((n, s) => n.concat(s), []), i = se.distinct(this.getAttributes().concat(t));
    return i.sort(se.ascendingBySortedArray(Se.sortedAttributeKeys)), i;
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
    await Ut.rollAttribute(this, e);
  }
  async rollAttributeAction(e) {
    const t = Ne.getActorAction(this, e);
    await Ut.rollAttributeAction(this, t);
  }
  async rollSkill(e, t) {
    await Ut.rollSkill(this, e, t);
  }
  async rollWeapon(e) {
    var s, r, o;
    Ri.checkWeaponDefense(e, this);
    const t = (s = e.validateTargets(this)) == null ? void 0 : s.map((l) => l.id), i = {
      attackerTokenId: (o = (r = game.scenes.current) == null ? void 0 : r.tokens.find((l) => {
        var c;
        return ((c = l.actor) == null ? void 0 : c.id) == this.id;
      })) == null ? void 0 : o.id,
      targetedTokenIds: t
    }, n = this.items.find((l) => e.isWeaponSkill(l));
    await Ut.rollWeapon(this, n, e, i);
  }
  async rollDefense(e) {
    const t = e.attack.defense, i = Ne.getActorDefense(this, t);
    await Ut.rollDefense(this, i, e);
  }
  async switchMonitorCheck(e, t, i, n = void 0) {
    await B.switchMonitorCheck(this, e, t, i, n);
  }
  async addCounter(e, t, i = void 0) {
    await B.addCounter(this, e, t, i);
  }
  async setCounter(e, t, i = void 0) {
    await B.setCounter(this, e, t, i);
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
    e > 0 && await B.setCounter(this, A.monitors.sceneAnarchy, e);
  }
  async onLeaveCombat() {
    await B.setCounter(this, A.monitors.sceneAnarchy, 0);
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
    t != 0 && await B.addCounter(this, e, -t);
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
    const i = mt._prepareFavorite(e, t);
    return !!this.system.favorites.find((n) => mt._isSameFavorite(i, n));
  }
  static _prepareFavorite(e, t) {
    return { type: e, id: t };
  }
  static _isSameFavorite(e, t) {
    return e.id == t.id && e.type == t.type;
  }
  async switchFavorite(e, t, i) {
    const n = mt._prepareFavorite(t, i), s = this.system.favorites.filter((r) => !mt._isSameFavorite(n, r));
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
    const i = mt._prepareFavorite(e, t);
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
    var r, o;
    e == null || e.preventDefault();
    const i = (r = t == null ? void 0 : t.dataset) == null ? void 0 : r.id, n = Number((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.value);
    if (!i || Number.isNaN(n)) return;
    const s = this._mwd.state.manual.find((l) => l.id === i);
    if (s)
      return s.value = n, this.render(!1);
  }
}
const { ApplicationV2: Pf, HandlebarsApplicationMixin: Nf } = foundry.applications.api, { renderTemplate: Mo } = foundry.applications.handlebars, Rf = `${J}/chat/celebrity-roll.hbs`, Ki = class Ki extends Nf(Pf) {
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
        ce.computeModifiers(e.items, "other", "celebrity")
      ),
      other: {
        label: v.common.roll.modifiers.other,
        value: 0
      },
      ANARCHY: v
    }, i = await Mo(`${J}/dialog/roll-celebrite-title.hbs`, t), n = {
      id: `roll-celebrity-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Ki.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new Ki({ roll: t }, n).render({ force: !0 });
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
      await Ki.doRoll(this.roll), await this.close();
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
    const r = await Mo(Rf, n);
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
D(Ki, "PARTS", {
  body: {
    template: `${J}/dialog/roll-celebrite.hbs`
  }
});
let xs = Ki;
const { renderTemplate: If } = foundry.applications.handlebars, Df = `${J}/chat/actor-say-word.hbs`;
class Co extends mt {
  static get initiative() {
    return mt.initiative + " + max(@attributes.reflexes.value, @attributes.intelligence.value)";
  }
  hasOwnAnarchy() {
    return this.hasPlayerOwner;
  }
  prepareDerivedData() {
    !this.system.monitors.fatigue && this.system.monitors.stun && (this.system.monitors.fatigue = foundry.utils.duplicate(this.system.monitors.stun)), this.system.monitors.physical.max = this._getMonitorMax(A.actorAttributes.strength), this.system.monitors.fatigue.max = this._getMonitorMax(A.actorAttributes.willpower), super.prepareDerivedData(), this.system.ignoreWounds = ce.sumModifiers(this.items, "other", "ignoreWounds");
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
    return Ji[this.type] ?? Ji[A.actorTypes.character];
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
      content: await If(
        Df,
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
      Ri.checkSufficient(v.actor.counters.anarchy, e, i + t);
      const n = Math.min(t, e), s = e - n;
      n > 0 && B.addCounter(this, A.monitors.sceneAnarchy, -n), this.hasPlayerOwner ? (await game.system.anarchy.gmAnarchy.actorGivesAnarchyToGM(this, e), B.addCounter(this, A.monitors.anarchy, -s)) : s > 0 && super.spendAnarchy(s);
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
    await xs.create(this);
  }
}
class wc extends mt {
  prepareDerivedData() {
    this._prepareMwdAttributes(), this._prepareMwdMonitors(), this._prepareMwdItems(), super.prepareDerivedData();
  }
  static get defaultIcon() {
    return `${Cn}/default/Default_Vehicle.svg`;
  }
  static get initiative() {
    return mt.initiative + " + max(@attributes.system.value, @attributes.handling.value)";
  }
  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    };
  }
  getAttributes() {
    return Ji[this.type] ?? Ji[A.actorTypes.vehicle];
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
      "system.-=handling": null,
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
    var n, s, r, o, l, c, u, d;
    const e = this.system.mwd = this.system.mwd ?? {}, t = this.system.monitors = this.system.monitors ?? {}, i = {
      value: ((n = t.structure) == null ? void 0 : n.value) ?? 0,
      max: ((s = t.structure) == null ? void 0 : s.max) ?? (this.type === A.actorTypes.battlemech ? 18 : 15),
      resistance: mt.normalizeResistance((r = t.structure) == null ? void 0 : r.resistance)
    };
    if (t.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(i),
      t.structure ?? {},
      { inplace: !1, recursive: !0 }
    ), e.monitors = e.monitors ?? {}, e.monitors.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(i),
      e.monitors.structure ?? {},
      { inplace: !1, recursive: !0 }
    ), this.type === A.actorTypes.battlemech) {
      const m = {
        value: ((o = t.heat) == null ? void 0 : o.value) ?? ((l = e.heat) == null ? void 0 : l.current) ?? 0,
        max: ((c = t.heat) == null ? void 0 : c.max) ?? ((u = e.heat) == null ? void 0 : u.hardMax) ?? 4,
        resistance: mt.normalizeResistance((d = t.heat) == null ? void 0 : d.resistance)
      };
      t.heat = foundry.utils.mergeObject(
        foundry.utils.duplicate(m),
        t.heat ?? {},
        { inplace: !1, recursive: !0 }
      ), e.monitors.heat = foundry.utils.mergeObject(
        foundry.utils.duplicate(m),
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
      gear: ["gear"],
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
const Po = {
  light: 4,
  medium: 5,
  heavy: 6,
  assault: 7
}, _f = { mode: "normal", allowedWeaponIds: [], typeRestriction: "" }, Of = {
  baseProfile: { name: "Unarmed", damage: "", notes: "" },
  maxWeapons: 0,
  allowedLocations: []
};
class Lf {
  constructor(e) {
    this.actor = e, this.mwd = e.system.mwd ?? {};
  }
  compute() {
    const e = this.mwd.weightClass ?? "medium", t = Po[e] ?? Po.medium, i = this._normalizeHardpoints(), n = this._normalizeWeaponGroups(), s = n.find((y) => y.isPrimary), r = n.filter((y) => y.isPrimary), o = this._primarySlot(), l = [], c = [];
    r.length > 1 && l.push(v.mwd.loadout.errors.multiplePrimary);
    const u = s ? t - 1 : t, d = n.length + (s ? 1 : 0);
    n.length > u && l.push(Te(v.mwd.loadout.errors.mountPointsExceeded, {
      used: d,
      total: t
    }));
    const m = this._getWeapons((y) => (y.system.weaponCategory ?? "ranged") !== "melee"), f = new Map(m.map((y) => [y.id, y])), p = /* @__PURE__ */ new Set(), h = i.map((y) => ({ ...y, occupiedBy: null, occupiedByName: void 0 }));
    for (const y of n)
      for (const b of y.weaponIds ?? []) {
        const S = f.get(b);
        if (!S) {
          c.push(Te(v.mwd.loadout.warnings.weaponMissing, { weapon: b }));
          continue;
        }
        const w = S.system.hardpointType ?? "energy", M = S.system.hardpointSize ?? "small";
        if (p.has(b)) {
          l.push(Te(v.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: S.name }));
          continue;
        }
        if (p.add(b), y.isPrimary && this._validatePrimaryWeapon(S, w, M, o, l), (S.system.weaponCategory ?? "ranged") === "melee")
          continue;
        const N = h.find((P) => !P.occupiedBy && P.type === w && P.size === M);
        N ? (N.occupiedBy = y.id, N.occupiedByName = y.name) : l.push(Te(v.mwd.loadout.errors.hardpointUnavailable, {
          weapon: S.name,
          type: v.mwd.hardpointType[w] ?? w,
          size: v.mwd.hardpointSize[M] ?? M
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
      name: e.name || Te(v.common.newName, { type: v.itemType.singular.weapon }),
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
    const e = foundry.utils.mergeObject(foundry.utils.duplicate(_f), this.mwd.primarySlot ?? {});
    return e.allowedWeaponIds = this._asArray(e.allowedWeaponIds), e;
  }
  _computeMeleeState(e) {
    var o, l, c;
    const t = foundry.utils.mergeObject(foundry.utils.duplicate(Of), this.mwd.melee ?? {}), i = this._getWeapons((u) => (u.system.weaponCategory ?? "ranged") === "melee"), n = [], s = Number(t.maxWeapons ?? 0);
    i.length > s && e.push(Te(v.mwd.loadout.errors.meleeLimitExceeded, {
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
      r.length > 0 && u.system.mountLocation && !r.includes(u.system.mountLocation) && e.push(Te(v.mwd.loadout.errors.meleeLocationRestricted, {
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
    n.mode === "converted" ? (((r = n.allowedWeaponIds) == null ? void 0 : r.length) > 0 && !n.allowedWeaponIds.includes(e.id) && s.push(Te(v.mwd.loadout.errors.primaryNotAllowedWeapon, { weapon: e.name })), n.typeRestriction && t !== n.typeRestriction && s.push(Te(v.mwd.loadout.errors.primaryTypeRestriction, {
      weapon: e.name,
      type: v.mwd.hardpointType[n.typeRestriction] ?? n.typeRestriction
    }))) : i !== "large" && s.push(Te(v.mwd.loadout.errors.primaryNeedsLarge, { weapon: e.name }));
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
class xf extends wc {
  static get defaultIcon() {
    return `${Cn}/vehicles/apc.svg`;
  }
  prepareDerivedData() {
    var e;
    super.prepareDerivedData(), this.system.mwd = this.system.mwd ?? {}, this.system.mwd.chassis = this.system.mwd.chassis ?? "", this.system.mwd.tonnage = this.system.mwd.tonnage ?? 0, this.system.mwd.loadout = new Lf(this).compute(), this.system.mwd.weaponGroupDetails = this._prepareConfiguredWeaponGroups(), this.system.mwd.heat = this._prepareHeatTrack(), this.system.mwd.primaryGroupName = ((e = this.system.mwd.weaponGroupDetails.find((t) => t.isPrimary)) == null ? void 0 : e.name) ?? "", this.system.skills = this._prepareSkillMap(), this.system.weaponGroups = this._prepareWeaponGroups(), this.system.meleeProfiles = this._prepareMeleeProfiles(), this.system.quickActions = {
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
        name: n.name || Te(v.common.newName, { type: v.itemType.singular.weapon }),
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
    const i = ((s = e == null ? void 0 : e.system) == null ? void 0 : s.attribute) ?? this.getPhysicalAgility(), n = foundry.utils.mergeObject(Ut.prepareActorRoll(this), {
      mode: Ye.rollType.skill,
      skill: e,
      attribute1: i,
      specialization: void 0
    });
    t.quickAction && (n.quickAction = t.quickAction), await Ut.create(n);
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
const ln = "activeModifiers", Ir = [
  { value: "", label: "All Attributes" },
  { value: "reflexes", label: "Reflexes" },
  { value: "strength", label: "Strength" },
  { value: "willpower", label: "Willpower" },
  { value: "charisma", label: "Charisma" },
  { value: "intelligence", label: "Intelligence" },
  { value: "edge", label: "Edge" }
], Dr = [
  { value: "", label: "All Intents" },
  { value: "skill", label: "Skill" },
  { value: "attack", label: "Attack" },
  { value: "defense", label: "Defense" },
  { value: "common", label: "Common" },
  { value: "attribute", label: "Attribute" },
  { value: "edge", label: "Edge" },
  { value: "initiative", label: "Initiative" }
];
function No(a) {
  const e = String(a ?? "").trim();
  return e === "" ? null : e;
}
function $f(a) {
  return String((a == null ? void 0 : a.intent) ?? "").trim() || null;
}
function Bf(a) {
  var e, t, i;
  return ((e = a == null ? void 0 : a.data) == null ? void 0 : e.attrKey) ?? // skill rolls
  ((i = (t = a == null ? void 0 : a.attack) == null ? void 0 : t.skill) == null ? void 0 : i.attribute) ?? // attack rolls
  null;
}
function Ro(a, e) {
  return a ? e ? a === e : !1 : !0;
}
function Tc(a) {
  return {
    id: String((a == null ? void 0 : a.id) ?? ""),
    label: String((a == null ? void 0 : a.label) ?? "").trim(),
    value: Math.trunc(Number((a == null ? void 0 : a.value) ?? 0)) || 0,
    enabled: (a == null ? void 0 : a.enabled) !== !1,
    attributeFilter: No(a == null ? void 0 : a.attributeFilter),
    intentFilter: No(a == null ? void 0 : a.intentFilter),
    source: (a == null ? void 0 : a.source) === "preset" ? "preset" : "adhoc"
  };
}
class zf {
  constructor() {
    D(this, "id", "mwd.sceneModifiers");
  }
  collect({ resolved: e } = {}) {
    var r;
    const t = (r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.getFlag("mwd", ln);
    if (!Array.isArray(t) || !t.length) return [];
    const i = $f(e), n = Bf(e), s = [];
    for (const o of t) {
      const l = Tc(o);
      l.enabled && Ro(l.intentFilter, i) && Ro(l.attributeFilter, n) && s.push({
        id: l.id || `scene:${l.label}`,
        label: l.label,
        value: l.value,
        source: "Scene"
      });
    }
    return s;
  }
}
const Ff = `systems/${T}/templates/settings/collection-editor.hbs`, vc = /* @__PURE__ */ new Map(), as = /* @__PURE__ */ new Map();
function jt(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid settings data.");
  return t.validationErrors = e, t;
}
function Oa(a) {
  Hf(a), vc.set(a.id, a), game.settings.register(T, a.settingKey, {
    scope: "world",
    config: !1,
    type: a.settingType ?? Object,
    default: a.defaultData()
  }), game.settings.registerMenu(T, a.menuKey, {
    name: a.menu.name,
    label: a.menu.label,
    hint: a.menu.hint,
    icon: a.menu.icon,
    type: Wf(a.id),
    restricted: a.menu.restricted ?? !0
  });
}
function Uf(a) {
  return vc.get(a) ?? null;
}
function Hf(a) {
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
function Wf(a) {
  if (as.has(a))
    return as.get(a);
  class e extends kc {
  }
  return D(e, "definitionId", a), as.set(a, e), e;
}
var X, Ec, $s, cn, un, Hi, Bs, da, Mc, Cc, Qe;
class kc extends FormApplication {
  constructor(t = {}, i = {}) {
    super(t, i);
    Pe(this, X);
    const n = C(this, X, un).call(this);
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
      template: Ff,
      width: 880,
      height: 760,
      resizable: !0,
      submitOnChange: !1,
      closeOnSubmit: !1
    }, { inplace: !1 });
  }
  get definition() {
    const t = Uf(this.constructor.definitionId);
    if (!t)
      throw new Error(`Missing settings collection definition: ${this.constructor.definitionId}`);
    return t;
  }
  get title() {
    var t;
    return this.definition.title ?? ((t = this.definition.menu) == null ? void 0 : t.name) ?? "Settings Editor";
  }
  getData(t = {}) {
    const i = C(this, X, Cc).call(this), n = this.editorState.rows.map((s, r, o) => ({
      index: r,
      fields: i.map((l) => C(this, X, Mc).call(this, l, s, r)),
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
        o && C(this, X, Ec).call(this, o, s, r);
      });
    });
  }
  async _onSubmit(t, { updateData: i = null, preventClose: n = !0, preventRender: s = !0 } = {}) {
    return super._onSubmit(t, { updateData: i, preventClose: n, preventRender: s });
  }
  async _updateObject(t, i) {
    var n;
    C(this, X, Qe).call(this, []);
    try {
      const s = this.editorState.tab === "bulk" ? this.definition.parseBulk(C(this, X, da).call(this)) : this.definition.rowsToValue(C(this, X, Bs).call(this));
      await game.settings.set(T, this.definition.settingKey, s);
      const r = C(this, X, un).call(this);
      C(this, X, cn).call(this, r), await this.close();
    } catch (s) {
      C(this, X, Qe).call(this, qa(s)), this.editorState.errors.length && ((n = ui.notifications) == null || n.error(this.editorState.errors[0])), this.render(!1);
    }
  }
}
X = new WeakSet(), Ec = async function(t, i, n) {
  var s, r, o, l, c, u, d, m;
  switch (i.preventDefault(), i.stopPropagation(), t) {
    case "switchRows":
      C(this, X, da).call(this), this.editorState.tab = "rows", C(this, X, Qe).call(this, []), this.render(!1);
      return;
    case "switchBulk":
      C(this, X, Hi).call(this);
      try {
        const f = this.definition.rowsToValue(this.editorState.rows);
        this.editorState.bulkText = this.definition.serializeBulk(f), this.editorState.tab = "bulk", C(this, X, Qe).call(this, []);
      } catch (f) {
        C(this, X, Qe).call(this, qa(f)), this.editorState.errors.length && ((s = ui.notifications) == null || s.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "addRow":
      C(this, X, Hi).call(this), this.editorState.rows.push(((o = (r = this.definition).createEmptyRow) == null ? void 0 : o.call(r)) ?? {}), C(this, X, Qe).call(this, []), this.render(!1);
      return;
    case "removeRow":
      C(this, X, Hi).call(this), this.editorState.rows.splice(Number(((l = n == null ? void 0 : n.dataset) == null ? void 0 : l.index) ?? -1), 1), C(this, X, Qe).call(this, []), this.render(!1);
      return;
    case "moveRowUp":
      C(this, X, Hi).call(this), C(this, X, $s).call(this, Number(((c = n == null ? void 0 : n.dataset) == null ? void 0 : c.index) ?? -1), -1), C(this, X, Qe).call(this, []), this.render(!1);
      return;
    case "moveRowDown":
      C(this, X, Hi).call(this), C(this, X, $s).call(this, Number(((u = n == null ? void 0 : n.dataset) == null ? void 0 : u.index) ?? -1), 1), C(this, X, Qe).call(this, []), this.render(!1);
      return;
    case "loadBulk":
      try {
        const f = this.definition.parseBulk(C(this, X, da).call(this));
        this.editorState.rows = this.definition.toRows(f), this.editorState.bulkText = this.definition.serializeBulk(f), this.editorState.tab = "rows", C(this, X, Qe).call(this, []);
      } catch (f) {
        C(this, X, Qe).call(this, qa(f)), this.editorState.errors.length && ((d = ui.notifications) == null || d.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "formatBulk":
      try {
        const f = this.definition.parseBulk(C(this, X, da).call(this));
        this.editorState.bulkText = this.definition.serializeBulk(f), C(this, X, Qe).call(this, []);
      } catch (f) {
        C(this, X, Qe).call(this, qa(f)), this.editorState.errors.length && ((m = ui.notifications) == null || m.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "resetSetting":
      C(this, X, cn).call(this, C(this, X, un).call(this)), this.render(!1);
      return;
    case "restoreDefaults":
      C(this, X, cn).call(this, this.definition.defaultData()), this.render(!1);
      return;
    case "cancel":
      await this.close();
      return;
    default:
      return;
  }
}, $s = function(t, i) {
  if (!Number.isInteger(t)) return;
  const n = t + i;
  if (t < 0 || n < 0 || n >= this.editorState.rows.length) return;
  const s = [...this.editorState.rows], [r] = s.splice(t, 1);
  s.splice(n, 0, r), this.editorState.rows = s;
}, cn = function(t) {
  this.editorState.rows = this.definition.toRows(t), this.editorState.bulkText = this.definition.serializeBulk(t), this.editorState.tab = "rows", C(this, X, Qe).call(this, []);
}, un = function() {
  const t = game.settings.get(T, this.definition.settingKey);
  return foundry.utils.deepClone(t ?? this.definition.defaultData());
}, Hi = function() {
  this.editorState.rows = C(this, X, Bs).call(this);
}, Bs = function() {
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
}, da = function() {
  var n;
  const t = this.form, i = (n = t == null ? void 0 : t.querySelector) == null ? void 0 : n.call(t, 'textarea[name="bulkText"]');
  return i instanceof HTMLTextAreaElement && (this.editorState.bulkText = i.value), this.editorState.bulkText ?? "";
}, Mc = function(t, i, n) {
  const s = t.type ?? "text", r = String((i == null ? void 0 : i[t.key]) ?? t.default ?? ""), o = s === "select" ? jf(t).map((l) => ({
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
}, Cc = function() {
  return this.definition.rowSchema.map((t) => ({
    ...t,
    type: t.type ?? "text"
  }));
}, Qe = function(t = []) {
  this.editorState.errors = Array.isArray(t) ? t.filter(Boolean) : [];
}, D(kc, "definitionId", "");
function jf(a) {
  const e = typeof a.options == "function" ? a.options() : a.options;
  return Array.isArray(e) ? e : [];
}
function qa(a) {
  const e = Array.isArray(a == null ? void 0 : a.validationErrors) ? a.validationErrors.filter(Boolean) : [String((a == null ? void 0 : a.message) ?? "Unable to save settings.").trim()].filter(Boolean);
  return e.length ? e : ["Unable to save settings."];
}
const zs = "sceneModifierTemplates", qf = "sceneModifierTemplateEditor", Gf = Object.freeze([]);
function yi(a) {
  const e = String(a ?? "").trim();
  return e === "" ? "" : e;
}
function Pc(a = []) {
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
      attributeFilter: yi(n == null ? void 0 : n.attributeFilter),
      intentFilter: yi(n == null ? void 0 : n.intentFilter)
    });
  }), t.length) throw jt(t);
  return e;
}
function Kf(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => ({
    label: String((e == null ? void 0 : e.label) ?? ""),
    value: String((e == null ? void 0 : e.value) ?? "0"),
    attributeFilter: yi(e == null ? void 0 : e.attributeFilter),
    intentFilter: yi(e == null ? void 0 : e.intentFilter)
  }));
}
function Vf(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw jt([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  if (!Array.isArray(t))
    throw jt(["Bulk JSON must be an array."]);
  return Pc(t.map((i) => ({
    label: String((i == null ? void 0 : i.label) ?? ""),
    value: String((i == null ? void 0 : i.value) ?? "0"),
    attributeFilter: yi(i == null ? void 0 : i.attributeFilter),
    intentFilter: yi(i == null ? void 0 : i.intentFilter)
  })));
}
function Yf(a = []) {
  return JSON.stringify(
    (Array.isArray(a) ? a : []).map((e) => ({
      label: String((e == null ? void 0 : e.label) ?? ""),
      value: Number((e == null ? void 0 : e.value) ?? 0),
      attributeFilter: yi(e == null ? void 0 : e.attributeFilter),
      intentFilter: yi(e == null ? void 0 : e.intentFilter)
    })),
    null,
    2
  );
}
const Qf = {
  id: "scene-modifier-templates",
  menuKey: qf,
  settingKey: zs,
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
      options: Ir
    },
    {
      key: "intentFilter",
      label: "Intent Filter",
      type: "select",
      options: Dr
    }
  ],
  menu: {
    name: "Scene Modifier Templates",
    label: "Configure",
    hint: "Edit the preset scene modifier templates available in the GM Gadget.",
    icon: "fas fa-cloud",
    restricted: !0
  },
  defaultData: () => foundry.utils.deepClone(Gf),
  createEmptyRow: () => ({
    label: "",
    value: "0",
    attributeFilter: "",
    intentFilter: ""
  }),
  toRows: Kf,
  rowsToValue: Pc,
  parseBulk: Vf,
  serializeBulk: Yf
};
function Jf() {
  Oa(Qf);
}
const { ApplicationV2: Xf, HandlebarsApplicationMixin: Zf } = foundry.applications.api, ep = "mwd-gmgadget", Nc = "gmDnPresets", dn = "gmNextDn", ma = "gmDnAnnounceToChat", tp = Object.freeze([
  { label: "Standard", dn: 1 },
  { label: "Challenging", dn: 2 },
  { label: "Hard", dn: 3 },
  { label: "Extreme", dn: 4 }
]), ip = "systems/mwd/templates/v2/mwd-gmgadget.hbs", fa = Object.freeze({
  actorId: "",
  mode: "physical",
  delta: 1,
  useArmor: !1,
  damageType: "concussive",
  statusId: "",
  statusActive: !0,
  source: "",
  notes: ""
}), ap = Object.freeze({
  label: "Hazard Zone",
  startExposure: ee.minor,
  escalationRate: 1,
  escalationIntervalTurns: 1,
  escalationMax: ee.full,
  onFullBurnDelta: 0,
  clearOnExit: !0,
  damage: 6,
  ap: 0,
  damageType: "thermal",
  color: "#d86a2c"
});
function np(a = "") {
  return String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean).map((e) => {
    const [t, i] = e.split(":").map((r) => (r ?? "").trim()), n = t || "DN", s = Number.isFinite(Number(i)) ? Number(i) : Number(t);
    return {
      label: n,
      dn: Number.isFinite(s) ? Math.max(0, Math.trunc(s)) : null
    };
  }).filter((e) => Number.isFinite(e.dn));
}
function sp(a = []) {
  const e = new Error(a[0] ?? "Invalid GM DN presets.");
  return e.validationErrors = Array.isArray(a) ? a.filter(Boolean) : [], e;
}
function rp() {
  return foundry.utils.deepClone(tp);
}
function La(a, { strict: e = !1 } = {}) {
  const t = typeof a == "string" ? np(a) : Array.isArray(a) ? a : [], i = [], n = [], s = /* @__PURE__ */ new Set();
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
  }), e && n.length) throw sp(n);
  return i;
}
function ns(a = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(fa),
    a ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function ss(a = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(ap),
    a ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function Io() {
  var t, i, n, s;
  const a = Array.from(((t = canvas == null ? void 0 : canvas.templates) == null ? void 0 : t.controlled) ?? []);
  if (a.length > 0) return ((i = a[0]) == null ? void 0 : i.document) ?? a[0] ?? null;
  const e = (s = (n = canvas == null ? void 0 : canvas.activeLayer) == null ? void 0 : n.controlled) == null ? void 0 : s[0];
  return (e == null ? void 0 : e.document) ?? e ?? null;
}
function op(a = null) {
  var n, s;
  const e = (a == null ? void 0 : a.document) ?? a ?? null;
  if (!e)
    return {
      label: "No template selected",
      reason: "Select a measured template on the current scene to turn it into a hazard region.",
      supported: !1
    };
  const t = String(e.t ?? e.type ?? "").trim().toLowerCase(), i = t === "circle" ? "blast" : t === "cone" ? "cone" : t === "ray" ? "line" : "";
  return i ? {
    label: `${i.toUpperCase()} ${Number(e.distance ?? 0) || 0}${(s = (n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.grid) != null && s.units ? ` ${canvas.scene.grid.units}` : ""}`.trim(),
    reason: "",
    supported: !0
  } : {
    label: "Unsupported template",
    reason: `The selected template type "${t || "unknown"}" is not supported for hazard conversion yet.`,
    supported: !1
  };
}
function lp(a = null) {
  const e = (a == null ? void 0 : a.document) ?? a ?? null;
  if (!e) return null;
  const t = String(e.t ?? e.type ?? "").trim().toLowerCase(), i = t === "circle" ? "blast" : t === "cone" ? "cone" : t === "ray" ? "line" : "";
  return i ? {
    template: {
      shape: i,
      distance: Number(e.distance ?? 0) || 0,
      size: Number(e.distance ?? 0) || 0
    },
    placement: {
      shape: i,
      anchor: {
        x: Number(e.x ?? 0) || 0,
        y: Number(e.y ?? 0) || 0
      },
      distance: Number(e.distance ?? 0) || 0,
      direction: Number(e.direction ?? 0) || 0,
      angle: Number(e.angle ?? 90) || 90
    }
  } : null;
}
function cp(a) {
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
function up(a) {
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
function dp(a) {
  return ft.getStatusOptions(a);
}
function mp(a = "mwd") {
  game.settings.register(a, dn, {
    scope: "client",
    config: !1,
    type: Number,
    default: 1
  }), game.settings.register(a, ma, {
    scope: "client",
    config: !0,
    name: "Announce GM DN changes to chat",
    hint: "If enabled, posts a small chat notice when you change the current DN preset.",
    type: Boolean,
    default: !1
  });
}
const ze = class ze extends Zf(Xf) {
  constructor({ systemId: e = "mwd", ...t } = {}) {
    super(t), this.systemId = e, this.activeTab = "difficulty", this.harmState = ns(), this.hazardState = ss();
  }
  async render(e = {}) {
    var t;
    return (t = game.user) != null && t.isGM ? super.render(e) : this;
  }
  async _prepareContext(e) {
    var y, b, S, w;
    const t = await super._prepareContext(e), i = La(
      game.settings.get(this.systemId, Nc),
      { strict: !1 }
    ), n = Number(game.settings.get(this.systemId, dn) ?? 1), s = !!game.settings.get(this.systemId, ma), r = ft.getActorOptions(), o = ft.getSceneTarget(), l = this.harmState.actorId ? ((b = (y = game.actors) == null ? void 0 : y.get) == null ? void 0 : b.call(y, this.harmState.actorId)) ?? null : null, c = ft.resolveTarget({
      actor: l,
      actorId: this.harmState.actorId,
      preferSceneTarget: !0
    }), u = dp(c.actor ?? l ?? null), d = ns(this.harmState);
    !d.statusId && u.length && (d.statusId = u[0].value, this.harmState.statusId = d.statusId);
    const m = Do(
      game.settings.get(this.systemId, zs)
    ), f = _o(
      (S = canvas == null ? void 0 : canvas.scene) == null ? void 0 : S.getFlag("mwd", ln)
    ), p = Io(), h = op(p), g = ss(this.hazardState);
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
        attributeFilterOptions: Ir,
        intentFilterOptions: Dr
      },
      harm: {
        state: d,
        actorOptions: r,
        modes: ft.MODE_OPTIONS,
        damageTypes: Eo,
        statusOptions: u,
        sceneTarget: cp(o),
        effectiveTarget: up(c),
        canApply: !!c.actor,
        applyReason: c.reason || "",
        useArmorAvailable: d.mode === "physical" || d.mode === "fatigue",
        showDamageType: (d.mode === "physical" || d.mode === "fatigue") && d.useArmor,
        showStatusFields: d.mode === "status",
        showDeltaFields: d.mode !== "status"
      },
      hazard: {
        state: g,
        template: h,
        exposureTiers: [
          { value: ee.minor, label: "Minor" },
          { value: ee.major, label: "Major" },
          { value: ee.full, label: "Full" }
        ],
        damageTypes: Eo,
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
    return this.harmState = ns({
      actorId: i('[name="harm-actorId"]', this.harmState.actorId),
      mode: i('[name="harm-mode"]', this.harmState.mode),
      delta: Number(i('[name="harm-delta"]', this.harmState.delta)),
      useArmor: n('[name="harm-useArmor"]', this.harmState.useArmor),
      damageType: i('[name="harm-damageType"]', this.harmState.damageType),
      statusId: i('[name="harm-statusId"]', this.harmState.statusId),
      statusActive: i('[name="harm-statusActive"]', this.harmState.statusActive ? "add" : "remove") !== "remove",
      source: i('[name="harm-source"]', this.harmState.source),
      notes: i('[name="harm-notes"]', this.harmState.notes)
    }), Number.isFinite(Number(this.harmState.delta)) || (this.harmState.delta = fa.delta), this.harmState;
  }
  async _onSetDn(e, t) {
    var s, r, o;
    if (e.preventDefault(), e.stopPropagation(), !((s = game.user) != null && s.isGM)) return;
    const i = Math.max(0, Math.trunc(Number(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.dn) ?? NaN)));
    if (!Number.isFinite(i)) return;
    if (await game.settings.set(this.systemId, dn, i), !!game.settings.get(this.systemId, ma)) {
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
      return await game.settings.set(this.systemId, dn, 1), this.render({ parts: ["body"] });
  }
  async _onToggleAnnounce(e, t) {
    var n;
    if (e.preventDefault(), e.stopPropagation(), !((n = game.user) != null && n.isGM)) return;
    const i = !game.settings.get(this.systemId, ma);
    return await game.settings.set(this.systemId, ma, i), this.render({ parts: ["body"] });
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
    const s = await ft.apply({
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
    return this.hazardState = ss({
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
    var l, c, u, d, m, f;
    if ((l = e == null ? void 0 : e.preventDefault) == null || l.call(e), (c = e == null ? void 0 : e.stopPropagation) == null || c.call(e), !((u = game.user) != null && u.isGM)) return;
    const i = this._captureHazardStateFromDom(t), n = Io(), s = lp(n);
    if (!(canvas != null && canvas.scene) || !s) {
      (d = ui.notifications) == null || d.warn("Select a supported measured template before creating a hazard.");
      return;
    }
    const r = cr({
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
    }), o = gl(s);
    if (!o.length) {
      (m = ui.notifications) == null || m.warn("Unable to convert the selected template into a Region shape.");
      return;
    }
    return await canvas.scene.createEmbeddedDocuments("Region", [{
      name: String(i.label ?? "Hazard Zone").trim() || "Hazard Zone",
      color: String(i.color ?? "#d86a2c").trim() || "#d86a2c",
      shapes: o,
      flags: {
        mwd: {
          [An]: {
            sourceActorUuid: null,
            sourceItemUuid: null,
            payloadId: "gm-hazard",
            templatePlacement: foundry.utils.deepClone(s.placement),
            template: foundry.utils.deepClone(s.template),
            damage: Math.max(0, Number(i.damage ?? 0) || 0),
            ap: Math.max(0, Number(i.ap ?? 0) || 0),
            damageType: String(i.damageType ?? "thermal").trim() || "thermal",
            label: `${String(i.label ?? "Hazard Zone").trim() || "Hazard Zone"} (${wt(r.startExposure)})`,
            areaEffect: {
              kind: "persistent",
              hazard: r
            },
            hazardDef: r
          }
        }
      }
    }]), (f = ui.notifications) == null || f.info("Hazard region created from the selected template."), this.render({ parts: ["body"] });
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
      delta: Oo(e == null ? void 0 : e.delta, fa.delta),
      source: t,
      notes: i
    } : n === "physical" || n === "fatigue" ? {
      mode: "trackDelta",
      track: n,
      delta: Oo(e == null ? void 0 : e.delta, fa.delta),
      useArmor: !!(e != null && e.useArmor),
      damageType: (e == null ? void 0 : e.damageType) ?? fa.damageType,
      source: t,
      notes: i
    } : null;
  }
  // ---- Scene modifier actions ----
  async _onAddSceneModifierFromPreset(e, t) {
    var l, c, u, d;
    if ((l = e == null ? void 0 : e.preventDefault) == null || l.call(e), (c = e == null ? void 0 : e.stopPropagation) == null || c.call(e), !((u = game.user) != null && u.isGM)) return;
    const i = ((d = t == null ? void 0 : t.closest) == null ? void 0 : d.call(t, ".mwd-gmgadget__root")) ?? this._getRootElement(), n = i instanceof HTMLElement ? i.querySelector('select[name="scene-preset-index"]') : null, s = n instanceof HTMLSelectElement ? Number(n.value) : NaN, r = Do(
      game.settings.get(this.systemId, zs)
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
    const i = _o(t.getFlag("mwd", ln)), n = await e(i);
    return await t.setFlag("mwd", ln, n), this.render({ parts: ["body"] });
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
D(ze, "DEFAULT_OPTIONS", {
  id: ep,
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
    switchTab: ze.prototype._onSwitchTab,
    setDn: ze.prototype._onSetDn,
    clearDn: ze.prototype._onClearDn,
    toggleAnnounce: ze.prototype._onToggleAnnounce,
    harmInputChange: ze.prototype._onHarmInputChange,
    refreshHarmTarget: ze.prototype._onRefreshHarmTarget,
    applyHarm: ze.prototype._onApplyHarm,
    hazardInputChange: ze.prototype._onHazardInputChange,
    refreshHazardTemplate: ze.prototype._onRefreshHazardTemplate,
    createHazard: ze.prototype._onCreateHazard,
    addSceneModifierFromPreset: ze.prototype._onAddSceneModifierFromPreset,
    addSceneModifierAdhoc: ze.prototype._onAddSceneModifierAdhoc,
    toggleSceneModifier: ze.prototype._onToggleSceneModifier,
    removeSceneModifier: ze.prototype._onRemoveSceneModifier,
    clearSceneModifiers: ze.prototype._onClearSceneModifiers
  }
}), D(ze, "PARTS", {
  body: { template: ip }
});
let Fs = ze;
function Do(a) {
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
function _o(a) {
  return Array.isArray(a) ? a.map((e) => {
    var s, r;
    const t = Tc(e), i = ((s = Ir.find((o) => o.value === (t.attributeFilter ?? ""))) == null ? void 0 : s.label) ?? null, n = ((r = Dr.find((o) => o.value === (t.intentFilter ?? ""))) == null ? void 0 : r.label) ?? null;
    return {
      ...t,
      attributeFilterLabel: t.attributeFilter ? i : null,
      intentFilterLabel: t.intentFilter ? n : null,
      signedValue: t.value >= 0 ? `+${t.value}` : String(t.value),
      isPositive: t.value > 0
    };
  }) : [];
}
function Oo(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
let rs = null;
function fp({ systemId: a = "mwd" } = {}) {
  return rs || (rs = new Fs({ systemId: a })), rs;
}
const pp = "gmDnPresetEditor";
function hp(a = []) {
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
  }), t.length) throw jt(t);
  return La(e, { strict: !0 });
}
function gp(a = []) {
  return La(a, { strict: !1 }).map((e) => ({
    label: e.label,
    dn: String(e.dn)
  }));
}
function yp(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw jt([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return La(t, { strict: !0 });
}
function bp(a = []) {
  return JSON.stringify(
    La(a, { strict: !1 }),
    null,
    2
  );
}
const Sp = {
  id: "gm-dn-presets",
  menuKey: pp,
  settingKey: Nc,
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
  defaultData: rp,
  createEmptyRow: () => ({
    label: "",
    dn: "1"
  }),
  toRows: gp,
  rowsToValue: hp,
  parseBulk: yp,
  serializeBulk: bp
};
function Ap() {
  Oa(Sp);
}
const wp = "lifeModuleCatalogEditor";
function Tp(a = []) {
  return Di((Array.isArray(a) ? a : []).map((e) => ({
    id: String((e == null ? void 0 : e.id) ?? ""),
    moduleType: String((e == null ? void 0 : e.moduleType) ?? ""),
    label: String((e == null ? void 0 : e.label) ?? ""),
    grants: String((e == null ? void 0 : e.grants) ?? ""),
    requiresAny: String((e == null ? void 0 : e.requiresAny) ?? ""),
    excludesAny: String((e == null ? void 0 : e.excludesAny) ?? "")
  })), { strict: !0 });
}
function vp(a = []) {
  return Di(a, { strict: !1 }).map((e) => ({
    id: e.id,
    moduleType: e.moduleType,
    label: e.label,
    grants: ef(e.grants),
    requiresAny: e.requiresAny.join(", "),
    excludesAny: e.excludesAny.join(", ")
  }));
}
function kp(a = "") {
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
  return Di(t, { strict: !0 });
}
function Ep(a = []) {
  return JSON.stringify(
    Di(a, { strict: !1 }),
    null,
    2
  );
}
const Mp = {
  id: "life-module-catalog",
  menuKey: wp,
  settingKey: Yi,
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
      options: mc
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
  defaultData: Pr,
  createEmptyRow: () => ({
    id: "",
    moduleType: "childhood",
    label: "",
    grants: "",
    requiresAny: "",
    excludesAny: ""
  }),
  toRows: vp,
  rowsToValue: Tp,
  parseBulk: kp,
  serializeBulk: Ep
};
function Cp() {
  Oa(Mp);
}
const Pp = "personalActionCatalogEditor", Lo = Object.freeze([
  { value: "false", label: "No" },
  { value: "true", label: "Yes" }
]);
function Np(a = []) {
  try {
    return Da((Array.isArray(a) ? a : []).map((e) => ({
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
    throw jt(
      Array.isArray(e.validationErrors) ? e.validationErrors : [e.message]
    );
  }
}
function Rp(a = []) {
  return Da(a, { strict: !1 }).map((e) => {
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
function Ip(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw jt([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  try {
    return Da(t, { strict: !0 });
  } catch (i) {
    throw jt(
      Array.isArray(i.validationErrors) ? i.validationErrors : [i.message]
    );
  }
}
function Dp(a = []) {
  return JSON.stringify(
    Da(a, { strict: !1 }),
    null,
    2
  );
}
const _p = {
  id: "personal-action-catalog",
  menuKey: Pp,
  settingKey: ic,
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
      options: () => Ps
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
      options: () => ac
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
      options: () => Lo
    },
    {
      key: "prominentWhenBurning",
      label: "Burn Highlight",
      type: "select",
      options: () => Lo
    }
  ],
  menu: {
    name: "Personal Action Catalog",
    label: "Configure",
    hint: "Edit the personal combat action menus and first-pass action handlers.",
    icon: "fas fa-list-check",
    restricted: !0
  },
  defaultData: vr,
  createEmptyRow: () => {
    var a;
    return {
      id: "",
      label: "",
      category: ((a = Ps[0]) == null ? void 0 : a.value) ?? "standard",
      cost: "1",
      handler: "combatAction",
      reason: "",
      rollIntent: "",
      prominent: "false",
      prominentWhenBurning: "false"
    };
  },
  toRows: Rp,
  rowsToValue: Np,
  parseBulk: Ip,
  serializeBulk: Dp
};
function Op() {
  Oa(_p);
}
const Lp = "skillSpecializationEditor";
function Us() {
  return gn().map((a) => ({
    value: a.code,
    label: a.label
  }));
}
function xp(a = []) {
  const e = new Set(Us().map((n) => n.value)), t = {}, i = [];
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
  }), i.length) throw jt(i);
  return In(t, { strict: !0 });
}
function $p(a = {}) {
  const e = In(a, { strict: !1 });
  return Object.entries(e).flatMap(
    ([t, i]) => i.map((n) => ({ skillCode: t, label: n }))
  );
}
function Bp(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return {};
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw jt([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return In(t, { strict: !0 });
}
function zp(a = {}) {
  return JSON.stringify(
    In(a, { strict: !1 }),
    null,
    2
  );
}
const Fp = {
  id: "skill-specializations",
  menuKey: Lp,
  settingKey: ks,
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
      options: Us
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
  defaultData: xl,
  createEmptyRow: () => {
    var a;
    return {
      skillCode: ((a = Us()[0]) == null ? void 0 : a.value) ?? "",
      label: ""
    };
  },
  toRows: $p,
  rowsToValue: xp,
  parseBulk: Bp,
  serializeBulk: zp
};
function Up() {
  Oa(Fp);
}
class Hp {
  static register() {
    Ap(), Cp(), Op(), Up(), Jf(), game.settings.register(T, "useDestinyMechanics", {
      name: v.settings.useDestinyMechanics.name,
      hint: v.settings.useDestinyMechanics.hint,
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
class Wp extends Error {
  constructor(e, { severity: t = "error" } = {}) {
    super(e), this.name = "UserFacingRollError", this.userFacing = !0, this.severity = t === "warn" ? "warn" : "error";
  }
}
function ji(a, e = {}) {
  return new Wp(a, e);
}
function vn(a, e = "Unable to execute roll.") {
  var i, n;
  const t = a != null && a.userFacing && (a == null ? void 0 : a.severity) === "warn" ? "warn" : "error";
  (n = (i = ui.notifications) == null ? void 0 : i[t]) == null || n.call(i, (a == null ? void 0 : a.message) ?? e);
}
const { HandlebarsApplicationMixin: jp } = foundry.applications.api, { HTMLField: qp } = foundry.data.fields;
function Gp(a) {
  const e = new qp({ required: !1, blank: !0, initial: "" });
  return e.name = a, e;
}
var It, Ra, oi, bi, Hs, Ws;
const Xe = class Xe extends jp(foundry.applications.sheets.ActorSheetV2) {
  constructor() {
    super(...arguments);
    Pe(this, bi);
    Pe(this, It, !1);
    /** Track active CSB tab per group across rerenders */
    Pe(this, Ra, /* @__PURE__ */ new Map());
    // group -> tabId
    Pe(this, oi, /* @__PURE__ */ new Map());
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
  // Optional legacy shim if anything still reads defaultOptions
  static get defaultOptions() {
    return this.DEFAULT_OPTIONS;
  }
  /** Editing mode flag for templates */
  get editing() {
    return H(this, It);
  }
  toggleEditing() {
    if (this.isEditable) {
      if (H(this, It)) {
        this._commitEditsToActor().finally(() => {
          $e(this, It, !H(this, It)), this.render({ force: !0 });
        });
        return;
      }
      $e(this, It, !H(this, It)), this.render({ force: !0 });
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
    H(this, Ra).set(o, s), C(this, bi, Hs).call(this, r, s);
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const n = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!n) return;
    const s = n.dataset.section, r = n.closest(".csb-accordion");
    if (!r || !s) return;
    const o = r.dataset.group || "default", c = (H(this, oi).has(o) ? H(this, oi).get(o) : r.dataset.default || null) === s ? null : s;
    H(this, oi).set(o, c), C(this, bi, Ws).call(this, r, c);
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
      return console.error("MWD | Failed to execute roll action", b), vn(b, "Unable to execute that roll."), null;
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
        const c = l.dataset.group || "default", u = H(this, Ra).get(c), d = l.dataset.default || ((r = l.querySelector(".csb-tab-link[data-tab]")) == null ? void 0 : r.dataset.tab), m = u || d;
        m && C(this, bi, Hs).call(this, l, m);
      }
      for (const l of n.querySelectorAll(".csb-accordion")) {
        const c = l.dataset.group || "default", u = H(this, oi).has(c) ? H(this, oi).get(c) : l.dataset.default || null;
        C(this, bi, Ws).call(this, l, u);
      }
      n.querySelectorAll(".csb-tabs").length && !n.querySelector(".csb-tab-panel.is-active") && console.warn(`${Ae} CSB tabs present but no active tab applied. Check element root resolution and CSS .is-active selectors.`, {
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
    const i = t.querySelectorAll('input[name][data-edit-field="staged"], select[name][data-edit-field="staged"], textarea[name][data-edit-field="staged"]');
    if (!i.length) return;
    const n = {};
    for (const s of i) {
      const r = s.getAttribute("name");
      if (!r || s.disabled) continue;
      let o;
      if (s instanceof HTMLInputElement)
        if (s.type === "checkbox") o = s.checked;
        else if (s.type === "radio") {
          if (!s.checked) continue;
          o = s.value;
        } else s.type === "number" ? o = Number(s.value) : o = s.value;
      else
        o = s.value;
      typeof o == "number" && Number.isNaN(o) && (o = 0), o = this._clampByPath(r, o), foundry.utils.getProperty(this.actor, r) !== o && (n[r] = o);
    }
    if (Object.keys(n).length)
      try {
        await (this.getPersistentActor() ?? this.actor).update(n);
      } catch (s) {
        console.warn("MWD | Commit failed (permissions or validation):", s);
      }
  }
  /** @override */
  async _prepareContext(t) {
    var r, o, l, c, u, d, m, f, p, h, g;
    console.log(`${Ae}BaseActorSheetV2._prepareContext:start`, {
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
        editing: H(this, It),
        // Template contract
        data: this.actor,
        // legacy alias
        options: n,
        // safe, template-only
        cssClass: n.cssClass
      },
      { inplace: !1 }
    );
    return s.options.owner = s.owner, s.options.limited = s.limited, s.options.editable = s.editable, s.options.editing = s.editing, s.options.viewMode = !s.editing, s.skillsDisplay = Bl(((m = this.actor) == null ? void 0 : m.system) ?? {}), s.bio = {
      ...s.bio ?? {},
      fields: {
        history: Gp("system.biography.history")
      }
    }, s.items ?? (s.items = {}), (f = this.actor) != null && f.items && typeof (se == null ? void 0 : se.classifyInto) == "function" && (se.classifyInto(s.items, this.actor.items), s.items.weapon = [
      ...s.items.mechWeapon ?? [],
      ...s.items.personalWeapon ?? []
    ]), s.npcItems = {
      traits: s.items.quality ?? [],
      weapons: s.items.weapon ?? [],
      assetModules: s.items.assetModule ?? [],
      inventory: s.items.gear ?? []
    }, console.log(`${Ae}BaseActorSheetV2._prepareContext:done`, {
      actorType: (p = this.actor) == null ? void 0 : p.type,
      cssClass: s.cssClass,
      itemCount: ((g = (h = this.actor) == null ? void 0 : h.items) == null ? void 0 : g.size) ?? 0,
      editing: H(this, It)
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
It = new WeakMap(), Ra = new WeakMap(), oi = new WeakMap(), bi = new WeakSet(), /**
 * Apply active-state classes within a single .csb-tabs root.
 * Idempotent: safe to call every render.
 */
Hs = function(t, i) {
  t.querySelectorAll(".csb-tab-link").forEach((n) => {
    n.classList.toggle("is-active", n.dataset.tab === i);
  }), t.querySelectorAll(".csb-tab-panel").forEach((n) => {
    n.classList.toggle("is-active", n.dataset.tab === i);
  });
}, Ws = function(t, i) {
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
}, // ---- Hard minimum size (resize clamp) ----
D(Xe, "MIN_WIDTH", 800), D(Xe, "MAX_WIDTH", 950), D(Xe, "MIN_HEIGHT", 600), D(Xe, "MAX_HEIGHT", 1400), // group -> sectionId|null
/** @override */
D(Xe, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Oi(Xe, Xe, "DEFAULT_OPTIONS"), {
  classes: ["sheet", "actor", T, "appv2", "mwd-sheet", "mwd-character-sheet"],
  position: { width: 760, height: 760 },
  window: { resizable: !0, minimizable: !0 },
  actions: {
    toggleViewMode: Xe.prototype._onToggleViewMode,
    tab: Xe.prototype._onClickTab,
    accordion: Xe.prototype._onClickAccordion,
    roll: Xe.prototype._onRollAction,
    monitorSet: Xe.prototype._onMonitorSet,
    editImage: Xe.prototype._onEditImage
  }
}, { inplace: !1 }));
let ia = Xe;
var li, Si, Rc, Ic, Dc;
const Aa = class Aa {
  static async get(e) {
    if (H(this, li).has(e)) {
      const n = await H(this, li).get(e);
      if (Number((n == null ? void 0 : n.version) ?? 0) > 0) return n;
      H(this, li).delete(e);
    }
    const t = C(this, Si, Rc).call(this, e);
    H(this, li).set(e, t);
    const i = await t;
    return Number((i == null ? void 0 : i.version) ?? 0) <= 0 && H(this, li).delete(e), i;
  }
};
li = new WeakMap(), Si = new WeakSet(), Rc = async function(e) {
  const t = `systems/${T}/templates/v2/layouts/${e}.layout.json`;
  let i;
  try {
    const n = await fetch(t);
    if (!n.ok) throw new Error(`HTTP ${n.status} for ${t}`);
    i = await n.json();
  } catch (n) {
    console.error(`${Ae}LayoutRegistry.get FAILED`, { layoutId: e, url: t, e: n }), i = { id: e, version: 0, root: { type: "stack", children: [] } };
  }
  return C(this, Si, Ic).call(this, i);
}, Ic = function(e) {
  const t = (i) => {
    var n;
    return !i || typeof i != "object" || (i.template ?? (i.template = C(n = Aa, Si, Dc).call(n, i)), i.children = Array.isArray(i.children) ? i.children : [], Array.isArray(i.classes) || (typeof i.classes == "string" ? i.classes = i.classes.split(/\s+/).filter(Boolean) : i.classes = []), i.children = i.children.map(t), i.type === "tabs" && Array.isArray(i.tabs) && (i.tabs = i.tabs.map((s) => ({
      ...s,
      children: (Array.isArray(s.children) ? s.children : []).map(t)
    }))), i.type === "accordion" && Array.isArray(i.sections) ? i.sections = i.sections.map((s) => ({
      ...s,
      children: (Array.isArray(s.children) ? s.children : []).map(t)
    })) : i.type === "accordion" && (i.sections = [])), i;
  };
  return {
    ...e,
    root: t(e.root ?? { type: "stack", children: [] })
  };
}, Dc = function(e) {
  switch (e.type) {
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
}, Pe(Aa, Si), Pe(Aa, li, /* @__PURE__ */ new Map());
let kn = Aa;
function Un(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Kp(a = {}) {
  var i, n, s, r;
  const e = Array.isArray((i = a == null ? void 0 : a.attack) == null ? void 0 : i.targets) ? a.attack.targets : [], t = ti(((n = a == null ? void 0 : a.attack) == null ? void 0 : n.areaEffect) ?? ((r = (s = a == null ? void 0 : a.attack) == null ? void 0 : s.payload) == null ? void 0 : r.areaEffect) ?? {});
  if (!e.length && t.kind !== at.persistent)
    throw new Error("Attack requires at least one target.");
  return e;
}
async function Vp(a = {}) {
  if (!(a != null && a.actorUuid)) return null;
  try {
    return await fromUuid(a.actorUuid);
  } catch (e) {
    return console.warn("MWD | Unable to resolve attack target actor for CQ", a, e), null;
  }
}
function Yp(a = {}, e = null, t = "") {
  var i, n, s, r, o;
  return Math.max(0, Un(
    ((i = a == null ? void 0 : a.attributes) == null ? void 0 : i[t]) ?? ((n = e == null ? void 0 : e.getAttributeValue) == null ? void 0 : n.call(e, t)) ?? ((o = (r = (s = e == null ? void 0 : e.system) == null ? void 0 : s.attributes) == null ? void 0 : r[t]) == null ? void 0 : o.value),
    0
  ));
}
function Qp(a = {}, e = null, t = "") {
  var i, n, s, r, o, l;
  return Math.max(0, Un(
    ((n = (i = a == null ? void 0 : a.skills) == null ? void 0 : i[t]) == null ? void 0 : n.rating) ?? ((s = e == null ? void 0 : e.getSkillRating) == null ? void 0 : s.call(e, t)) ?? ((l = (o = (r = e == null ? void 0 : e.system) == null ? void 0 : r.skills) == null ? void 0 : o[t]) == null ? void 0 : l.rating),
    0
  ));
}
function xo(a = []) {
  return a.reduce((e, t) => e + Un(t == null ? void 0 : t.value, 0), 0);
}
async function Jp({ attacker: a = null, ctx: e = {}, target: t = {} } = {}) {
  var w, M, N, P, L, V, G, W, j, O, x, q, Z, ae, ue, oe, E, U, ne, te, Ee, je;
  const i = await Vp(t), n = Math.max(0, Number(((P = (M = (w = e == null ? void 0 : e.attack) == null ? void 0 : w.weapon) == null ? void 0 : M.attackRatingBand) == null ? void 0 : P[(N = e == null ? void 0 : e.attack) == null ? void 0 : N.rangeBand]) ?? 0) || 0), s = Yp(t, i, "reflexes"), r = s + s, o = String(((V = (L = e == null ? void 0 : e.attack) == null ? void 0 : L.skill) == null ? void 0 : V.code) ?? ((W = (G = e == null ? void 0 : e.attack) == null ? void 0 : G.weapon) == null ? void 0 : W.skill) ?? "").trim(), l = String(((O = (j = e == null ? void 0 : e.attack) == null ? void 0 : j.skill) == null ? void 0 : O.label) ?? o ?? "Attack Skill").trim() || "Attack Skill", c = o ? Math.max(0, Un(((x = a == null ? void 0 : a.getSkillRating) == null ? void 0 : x.call(a, o)) ?? ((ae = (Z = (q = a == null ? void 0 : a.system) == null ? void 0 : q.skills) == null ? void 0 : Z[o]) == null ? void 0 : ae.rating), 0)) : 0, u = Qp(t, i, "tactics"), d = c - u, m = Math.abs(d), f = Math.max(0, Number(((ue = t == null ? void 0 : t.activeArmor) == null ? void 0 : ue.defenseBonus) ?? 0) || 0), p = String(((oe = e == null ? void 0 : e.attack) == null ? void 0 : oe.rangeBand) ?? "").trim() || "range", g = [{
    id: "weapon.attackRating",
    label: `Weapon AR (${((U = (E = e == null ? void 0 : e.attack) == null ? void 0 : E.weapon) == null ? void 0 : U.type) === "personalWeapon" || (te = (ne = e == null ? void 0 : e.attack) == null ? void 0 : ne.weapon) != null && te.isSynthetic ? Ln(p) : p})`,
    value: n
  }], y = [{
    id: "target.reflexesDefense",
    label: "Target REF + REF",
    value: r
  }];
  d > 0 ? g.push({
    id: "skill.attackVsTactics",
    label: `${l} over Tactics`,
    value: m
  }) : d < 0 && y.push({
    id: "target.tacticsAdvantage",
    label: `Tactics over ${l}`,
    value: m
  }), (je = (Ee = e == null ? void 0 : e.attack) == null ? void 0 : Ee.aim) != null && je.eligible && g.push({
    id: "state.aim",
    label: `Aim (${l})`,
    value: c
  }), y.push({
    id: "target.armorDefense",
    label: "Armor Defense",
    value: f
  });
  const b = xo(g), S = xo(y);
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
      attackSkillCode: o,
      attackSkillLabel: l,
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
function Xp(a = {}, e = {}) {
  var m, f, p, h, g, y, b, S;
  const t = (a == null ? void 0 : a.attack) ?? {}, i = String(((f = (m = t == null ? void 0 : t.payload) == null ? void 0 : m.modifies) == null ? void 0 : f.damageType) ?? "").trim(), n = Math.max(0, Number(((p = t == null ? void 0 : t.weapon) == null ? void 0 : p.damage) ?? 0) || 0), s = xt(i || ((h = t == null ? void 0 : t.weapon) == null ? void 0 : h.damageType), "concussive"), r = Math.max(0, Number((t == null ? void 0 : t.totalAp) ?? ((g = t == null ? void 0 : t.weapon) == null ? void 0 : g.ap) ?? 0) || 0), o = e.outcome === "graze" ? n / 2 : e.outcome === "hit" ? n : 0, l = o + Number(e.netHits ?? 0), c = dr((t == null ? void 0 : t.currentExposure) ?? gi({
    tier: ((y = t == null ? void 0 : t.currentExposure) == null ? void 0 : y.initialTier) ?? ((b = t == null ? void 0 : t.currentExposure) == null ? void 0 : b.tier) ?? "none"
  }), {
    active: !!(t != null && t.evadeActive),
    locked: !!(t != null && t.evadeLocked)
  }), u = ti((t == null ? void 0 : t.areaEffect) ?? ((S = t == null ? void 0 : t.payload) == null ? void 0 : S.areaEffect) ?? {}), d = u.kind === at.persistent ? l : Mi(l, c.finalTier);
  return {
    baseDamage: n,
    effectiveWeaponDamage: o,
    netHits: Number(e.netHits ?? 0),
    incoming: l,
    scaledIncoming: d,
    ap: r,
    damageType: s,
    damageTypeLabel: $t(s),
    exposure: c,
    areaEffect: u
  };
}
function Zp(a = {}) {
  return String((a == null ? void 0 : a.tokenUuid) ?? (a == null ? void 0 : a.actorUuid) ?? (a == null ? void 0 : a.tokenId) ?? (a == null ? void 0 : a.actorId) ?? (a == null ? void 0 : a.name) ?? foundry.utils.randomID()).trim();
}
function eh({ attacker: a, ctx: e, damage: t } = {}) {
  var i, n, s, r, o;
  return {
    mode: "attackDamage",
    track: A.monitors.physical,
    damage: (t == null ? void 0 : t.scaledIncoming) ?? 0,
    netHits: 0,
    damageType: t == null ? void 0 : t.damageType,
    ap: (t == null ? void 0 : t.ap) ?? 0,
    effects: ((n = (i = e == null ? void 0 : e.attack) == null ? void 0 : i.weapon) == null ? void 0 : n.effects) ?? {},
    source: `${(a == null ? void 0 : a.name) ?? "Attacker"}: ${((r = (s = e == null ? void 0 : e.attack) == null ? void 0 : s.weapon) == null ? void 0 : r.name) ?? "Attack"}`,
    notes: (o = t == null ? void 0 : t.exposure) != null && o.initialTier ? `Exposure ${wt(t.exposure.initialTier)}${t.exposure.evadeUsed ? ` -> ${wt(t.exposure.finalTier)}` : ""}` : ""
  };
}
function pa(a, e = {}, t = {}, { queued: i = !1, applied: n = !1, skipped: s = !1, reason: r = "" } = {}) {
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
async function th({ attacker: a, ctx: e, target: t, outcome: i, damage: n } = {}) {
  var c;
  if ((i == null ? void 0 : i.outcome) === "miss")
    return pa(null, t, n, { skipped: !0, reason: "Missed target." });
  if (((c = n == null ? void 0 : n.areaEffect) == null ? void 0 : c.kind) === at.persistent)
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
    return console.warn("MWD | Unable to resolve target for queued attack damage", t, u), pa(null, t, n, { reason: "Unable to resolve attack target." });
  }
  const o = eh({ attacker: a, ctx: e, damage: n }), l = await ft.apply({
    actor: r,
    token: s,
    payload: o,
    options: {
      actorId: (r == null ? void 0 : r.id) ?? "",
      dryRun: !0,
      logToChat: !1
    }
  });
  if (l != null && l.ok) {
    const u = pa(l, t, n, { queued: !0, applied: !1 });
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
        payload: o,
        preview: u
      }
    };
  }
  return pa(l, t, n, { reason: "Unable to preview attack damage." });
}
async function ih({ attacker: a, ctx: e, outcomeModel: t, target: i, previewState: n = {} } = {}) {
  var y, b;
  const s = await Jp({ attacker: a, ctx: e, target: i }), r = Number((t == null ? void 0 : t.margin) ?? 0), o = Number(s.value ?? 0), l = r;
  let c = o > 0 ? r >= 1 ? "hit" : r === 0 ? "graze" : "miss" : o < 0 ? r >= 2 ? "hit" : r === 1 ? "graze" : "miss" : r >= 1 ? "hit" : "miss";
  String(((y = e == null ? void 0 : e.attack) == null ? void 0 : y.rangeBand) ?? "").trim().toLowerCase() === "outofrange" && c === "hit" && (c = "graze");
  const u = c === "hit" ? Math.max(0, l) : 0, d = (e == null ? void 0 : e.attack) ?? {}, m = Zp(i), f = (n == null ? void 0 : n[m]) ?? {}, p = (i == null ? void 0 : i.exposure) ?? gi({ tier: "none" }), h = Xp({
    ...e,
    attack: {
      ...d,
      currentExposure: p,
      areaEffect: (d == null ? void 0 : d.areaEffect) ?? ((b = d == null ? void 0 : d.payload) == null ? void 0 : b.areaEffect) ?? null,
      evadeActive: !!(f != null && f.evadeActive),
      evadeLocked: !!(p != null && p.evadeLocked)
    }
  }, { outcome: c, netHits: u }), g = await th({
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
    rawNetHits: l,
    netHits: u,
    outcome: c,
    damage: h,
    damageResult: g,
    queuedMutation: (g == null ? void 0 : g.queuedMutation) ?? null
  };
}
function ah(a = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of a)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
async function _c({ attacker: a, ctx: e, outcomeModel: t, previewState: i = {}, existingAttackResult: n = null } = {}) {
  var c, u, d;
  const s = Kp(e), r = [];
  for (const m of s)
    r.push(await ih({ attacker: a, ctx: e, outcomeModel: t, target: m, previewState: i }));
  const o = ti(((c = e == null ? void 0 : e.attack) == null ? void 0 : c.areaEffect) ?? ((d = (u = e == null ? void 0 : e.attack) == null ? void 0 : u.payload) == null ? void 0 : d.areaEffect) ?? {});
  let l = String((n == null ? void 0 : n.persistentRegionUuid) ?? "").trim() || null;
  if (o.kind === at.persistent && !l) {
    const m = await fm({
      attacker: a,
      attack: (e == null ? void 0 : e.attack) ?? {},
      targetResult: r[0] ?? null
    });
    l = (m == null ? void 0 : m.uuid) ?? null;
  }
  return {
    targetCount: s.length,
    results: r,
    summary: ah(r),
    areaEffect: o,
    persistentRegionUuid: l
  };
}
function Ie(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
function os(a, e = 0, t = Number.POSITIVE_INFINITY) {
  const i = Ie(a, e);
  return Math.max(e, Math.min(t, i));
}
function Oc(a, e = 1) {
  var i;
  const t = Ie((i = a == null ? void 0 : a.difficulty) == null ? void 0 : i.dn, Ie(e, 1));
  return Math.max(0, t);
}
function nh(a, e) {
  return Math.max(0, Ie(a, 0) - Ie(e, 0));
}
function sh({ convert: a, remainder: e, rate: t = 4 } = {}) {
  const i = Math.max(0, Ie(e, 0)), n = Math.max(1, Ie(t, 4)), s = Math.max(0, Ie(a, 0)), r = Math.floor(s / n) * n;
  return Math.min(i, r);
}
function _r(a, { rate: e = 4, maxPerRoll: t = Number.POSITIVE_INFINITY } = {}) {
  const i = Math.max(1, Ie(e, 4)), n = Math.floor(Math.max(0, Ie(a, 0)) / i), s = Number.isFinite(t) ? Math.max(0, Ie(t, 0)) : Number.POSITIVE_INFINITY;
  return { amount: Math.min(n, s), rate: i };
}
function Or(a) {
  var i;
  const e = ((i = a == null ? void 0 : a.edge) == null ? void 0 : i.earn) ?? {};
  return {
    enabled: !!(e != null && e.enabled),
    rate: Math.max(1, Ie(e == null ? void 0 : e.rate, 4)),
    maxPerRoll: (e == null ? void 0 : e.maxPerRoll) ?? Number.POSITIVE_INFINITY
  };
}
function En(a) {
  var t;
  const e = (t = a == null ? void 0 : a.edge) == null ? void 0 : t.pool;
  return e ? String(e) : null;
}
function rh(a) {
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
function Lc(a, e) {
  if (Ie(a, 0) !== 0) return !1;
  const { dice: t, ones: i } = rh(e);
  return t <= 0 ? !1 : i >= Math.ceil(t / 2);
}
function oh(a, e, t = 4) {
  return !!(a && Ie(e, 0) >= Ie(t, 4));
}
function $o(a, e) {
  const t = Ie(e == null ? void 0 : e.successes, 0), i = Oc(a, 1), n = t >= i, s = t - i, r = oh(n, s, 4), o = Lc(t, e == null ? void 0 : e.raw), l = Or(a), c = l.maxPerRoll ?? 1, u = l.enabled && s >= l.rate ? (() => {
    const { amount: m, rate: f } = _r(s, { rate: l.rate, maxPerRoll: c }), p = En(a);
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
function lh(a, e, t) {
  var m, f;
  const i = Ie(e == null ? void 0 : e.successes, 0), n = Ie(t == null ? void 0 : t.successes, 0), s = !!((m = a == null ? void 0 : a.opposed) != null && m.net), r = String(((f = a == null ? void 0 : a.opposed) == null ? void 0 : f.dnTies) ?? "stalemate");
  let o = null, l = !1;
  s ? (o = i - n, o > 0 ? l = !0 : o < 0 ? l = !1 : r === "attackerWins" ? l = !0 : l = !1) : i > n ? l = !0 : i < n ? l = !1 : r === "attackerWins" ? l = !0 : l = !1;
  const c = Or(a), u = c.maxPerRoll ?? 1, d = c.enabled && s && typeof o == "number" && o >= c.rate ? (() => {
    const { amount: p, rate: h } = _r(o, { rate: c.rate, maxPerRoll: u }), g = En(a);
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
function ch(a, e) {
  var h, g, y;
  const t = Ie(e == null ? void 0 : e.successes, 0), i = Oc(a, 1), n = t >= i, s = Lc(t, e == null ? void 0 : e.raw), r = nh(t, i), o = ((h = a == null ? void 0 : a.net) == null ? void 0 : h.convert) ?? ((g = a == null ? void 0 : a.allocation) == null ? void 0 : g.convert) ?? 0, l = Or(a), c = l.rate, u = sh({ convert: o, remainder: r, rate: c }), d = r - u, m = l.enabled && u >= c ? (() => {
    const { amount: b } = _r(u, { rate: c, maxPerRoll: l.maxPerRoll }), S = En(a);
    return b > 0 ? { amount: b, pool: S, reason: "convert4", details: { converted: u, rate: c } } : null;
  })() : null, f = s ? { amount: 1, pool: En(a), reason: "critFail", details: { onesRule: "halfOrMoreOnes" } } : null, p = [];
  return m && p.push(m), f && p.push(f), p.length === 0 || (p.length === 1 ? p[0] : (p.reduce((b, S) => b + (Number(S == null ? void 0 : S.amount) || 0), 0), (y = p[0]) == null || y.pool)), {
    rollType: "net",
    passed: n,
    successes: t,
    difficulty: { dn: i },
    criticalFailure: s,
    tier: s ? "criticalFailure" : n ? "success" : "failure",
    net: {
      remainder: r,
      convertRequested: Ie(o, 0),
      converted: u,
      value: d,
      // the actual net effect magnitude you apply (+net dice, etc.)
      rate: c,
      canConvert: r >= c
    },
    edgeEarned: m
  };
}
function uh(a, e) {
  var o, l, c, u;
  const t = Ie(e == null ? void 0 : e.successes, 0), i = os((o = a == null ? void 0 : a.extended) == null ? void 0 : o.target, 1, 1e4), n = os((l = a == null ? void 0 : a.extended) == null ? void 0 : l.accumulated, 0, 1e4), s = os(n + t, 0, 1e4), r = s >= i;
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
function xc(a, e, t = null) {
  var n;
  switch (String((a == null ? void 0 : a.rollType) ?? "simple")) {
    case "simple":
      return $o(a, e);
    case "opposed":
      return lh(a, e, t);
    case "net":
      return ch(a, e);
    case "extended":
      return uh(a, e);
    default: {
      const s = {
        ...a,
        difficulty: { dn: Number(((n = a == null ? void 0 : a.difficulty) == null ? void 0 : n.dn) ?? 1) || 1 }
      };
      return $o(s, e);
    }
  }
}
function dh(a, e) {
  var c, u, d, m, f, p, h, g, y;
  const t = a ?? {}, i = Array.isArray((c = t == null ? void 0 : t.modifiers) == null ? void 0 : c.applied) ? t.modifiers.applied : [], n = Number(((u = t == null ? void 0 : t.modifiers) == null ? void 0 : u.total) ?? 0);
  if (i.length) {
    const b = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((S) => S.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${i.map((S) => `${S.label} ${Bo(S.value)}`).join(", ")} (Total ${Bo(n)})`,
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
function Bo(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function mh(a, e) {
  var g, y, b, S, w, M, N, P, L, V, G, W, j, O, x, q, Z, ae, ue, oe;
  const t = a ?? {}, i = (t == null ? void 0 : t.attackResult) ?? null;
  if (!i) return;
  const n = Array.isArray(i == null ? void 0 : i.results) ? i.results : [], s = (i == null ? void 0 : i.summary) ?? ph(n), r = n.some((E) => {
    var U;
    return !!((U = E == null ? void 0 : E.queuedMutation) != null && U.applied);
  }), o = n.filter(
    (E) => (E == null ? void 0 : E.queuedMutation) && !E.queuedMutation.applied
  ), l = !!((y = (g = t == null ? void 0 : t.attack) == null ? void 0 : g.capabilityReport) != null && y.isTemplated), c = Array.isArray((b = t == null ? void 0 : t.modifiers) == null ? void 0 : b.applied) ? t.modifiers.applied : [], u = Number(((S = t == null ? void 0 : t.modifiers) == null ? void 0 : S.total) ?? 0);
  if (c.length) {
    const E = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((U) => U.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${c.map((U) => `${U.label} ${qi(U.value)}`).join(", ")} (Total ${qi(u)})`,
      title: (E == null ? void 0 : E.tooltip) ?? ""
    });
  }
  const d = (t == null ? void 0 : t.edge) ?? null, m = Array.isArray((w = t == null ? void 0 : t.roll) == null ? void 0 : w.failureDiceRefs) ? t.roll.failureDiceRefs : [], f = !!((M = d == null ? void 0 : d.availableActions) != null && M.canPostRerollFailures) && !r, p = Array.isArray((N = d == null ? void 0 : d.allowed) == null ? void 0 : N.postPools) ? d.allowed.postPools : [];
  if (d != null && d.domain && (e.edge = {
    domain: d.domain,
    earned: ((P = t == null ? void 0 : t.outcomeModel) == null ? void 0 : P.edgeEarned) ?? null,
    preSpent: Number(((L = d == null ? void 0 : d.pre) == null ? void 0 : L.spent) ?? 0),
    postSpent: Number(((V = d == null ? void 0 : d.post) == null ? void 0 : V.spent) ?? 0),
    canPost: f && m.length > 0 && p.length > 0,
    failureCount: m.length,
    postPools: p
  }, e.metaRows.push({
    text: `Edge: ${d.domain} | pre ${e.edge.preSpent} | post ${e.edge.postSpent}`,
    title: ""
  })), (G = e.edge) != null && G.canPost) {
    e.footerRows.push({
      text: `Post-spend: Reroll ${e.edge.failureCount} failure${e.edge.failureCount === 1 ? "" : "s"}`
    });
    for (const E of e.edge.postPools)
      e.actions.push({
        action: "edgePostReroll",
        label: `Spend ${E}`,
        dataset: { "pool-key": E },
        cssClass: "mwd-edge-post"
      });
  }
  const h = String((s == null ? void 0 : s.overallOutcome) ?? "").trim();
  if (e.outcomeText = n.length > 1 ? `ATTACK ${s.hits} HIT / ${s.grazes} GRAZE / ${s.misses} MISS` : h === "hit" ? "HIT!" : h === "graze" ? "GRAZE!" : "MISS!", e.metaRows.push({
    text: `Targets: ${n.length || 0}`,
    title: ""
  }), l && (e.targetRows = n.map((E, U) => {
    var Tt, vt, kt, Et, Mt, Ct, rt, k;
    const ne = ((Tt = t == null ? void 0 : t.areaEffectPreviewState) == null ? void 0 : Tt[E == null ? void 0 : E.previewKey]) ?? {}, te = ((vt = E == null ? void 0 : E.damage) == null ? void 0 : vt.exposure) ?? (E == null ? void 0 : E.exposure) ?? null, Ee = String((te == null ? void 0 : te.initialLabel) ?? "NONE").trim() || "NONE", je = String((te == null ? void 0 : te.finalLabel) ?? Ee).trim() || Ee, pt = Number(((kt = E == null ? void 0 : E.damage) == null ? void 0 : kt.incoming) ?? 0), ht = Number(((Et = E == null ? void 0 : E.damage) == null ? void 0 : Et.scaledIncoming) ?? pt), nt = (E == null ? void 0 : E.queuedMutation) ?? null, gt = !!(nt != null && nt.applied || (Mt = E == null ? void 0 : E.damageResult) != null && Mt.applied), Fe = (ne == null ? void 0 : ne.reactionPreview) ?? null, st = [];
    if (!gt && Ee !== "NONE" && ((Ct = E == null ? void 0 : E.damageResult) != null && Ct.ok) && !((rt = E == null ? void 0 : E.damageResult) != null && rt.skipped) && st.push({
      action: "toggleEvade",
      label: E != null && E.evadeActive ? "Clear Evade" : "Use Reaction",
      dataset: { "preview-key": E.previewKey },
      cssClass: `mwd-target-row__action ${E != null && E.evadeActive ? "is-active" : ""}`
    }), E != null && E.evadeActive && (Fe != null && Fe.canSpendEdge) && Array.isArray(Fe.edgePools))
      for (const R of Fe.edgePools)
        st.push({
          action: "toggleEvadeEdge",
          label: (ne == null ? void 0 : ne.edgePoolKey) === R.key ? `Edge: ${R.key}` : `Use ${R.key}`,
          dataset: {
            "preview-key": E.previewKey,
            "pool-key": R.key
          },
          cssClass: `mwd-target-row__action ${(ne == null ? void 0 : ne.edgePoolKey) === R.key ? "is-active" : ""}`
        });
    return nt && !gt && st.push({
      action: "applyAttackDamage",
      label: "Apply Damage",
      dataset: { "result-index": String(U) },
      cssClass: "mwd-target-row__action mwd-apply-attack-damage"
    }), {
      targetName: ((k = E == null ? void 0 : E.target) == null ? void 0 : k.name) ?? "Target",
      applied: gt,
      outcomeLabel: String((E == null ? void 0 : E.outcome) ?? "miss").toUpperCase(),
      exposureLabel: Ee === je ? Ee : `${Ee} -> ${je}`,
      damageLabel: pt === ht ? String(ht) : `${pt} -> ${ht}`,
      reactionHint: E != null && E.evadeActive ? ne != null && ne.edgePoolKey ? "Evade active. Reaction Burn canceled by Edge." : (Fe == null ? void 0 : Fe.burnDelta) > 0 ? `Evade active. This reaction adds +${Fe.burnDelta} Burn.` : "Evade active." : "",
      rowActions: st
    };
  })), n.length > 1 && o.length > 1 && e.actions.push({
    action: "applyAllAttackDamage",
    label: `Apply All Damage (${o.length})`,
    cssClass: "mwd-apply-all-attack-damage"
  }), !l)
    for (const E of n) {
      const U = Number(((j = (W = E == null ? void 0 : E.cq) == null ? void 0 : W.ar) == null ? void 0 : j.total) ?? 0), ne = Number(((x = (O = E == null ? void 0 : E.cq) == null ? void 0 : O.dr) == null ? void 0 : x.total) ?? 0);
      e.metaRows.push({
        text: `${((q = E == null ? void 0 : E.target) == null ? void 0 : q.name) ?? "Target"}: ${String((E == null ? void 0 : E.outcome) ?? "miss").toUpperCase()} | CQ ${qi(((Z = E == null ? void 0 : E.cq) == null ? void 0 : Z.value) ?? 0)} (AR ${U} - DR ${ne}) | Net ${Number((E == null ? void 0 : E.netHits) ?? 0)}`,
        title: fh(E == null ? void 0 : E.cq)
      });
    }
  if (!l)
    for (const [E, U] of n.entries()) {
      const ne = (U == null ? void 0 : U.damage) ?? null;
      ne && (U == null ? void 0 : U.outcome) !== "miss" && e.footerRows.push({
        text: `${((ae = U == null ? void 0 : U.target) == null ? void 0 : ae.name) ?? "Target"}: ${ne.damageTypeLabel} ${qi(ne.effectiveWeaponDamage)} weapon${ne.netHits ? ` + ${ne.netHits} net` : ""}`,
        title: ""
      });
      const te = (U == null ? void 0 : U.damageResult) ?? null;
      if (te != null && te.ok && !(te != null && te.skipped)) {
        const Ee = (U == null ? void 0 : U.queuedMutation) ?? (te == null ? void 0 : te.queuedMutation) ?? null, je = !!(Ee != null && Ee.applied || te != null && te.applied);
        Ee && !je && e.actions.push({
          action: "applyAttackDamage",
          label: `Apply Damage: ${te.actorName ?? ((ue = U == null ? void 0 : U.target) == null ? void 0 : ue.name) ?? "Target"}`,
          dataset: { "result-index": String(E) },
          cssClass: "mwd-apply-attack-damage"
        });
      } else te != null && te.reason && e.footerRows.push({
        text: `${((oe = U == null ? void 0 : U.target) == null ? void 0 : oe.name) ?? "Target"}: ${te.reason}`,
        title: ""
      });
    }
}
function fh(a = {}) {
  var i, n;
  const e = Array.isArray((i = a == null ? void 0 : a.ar) == null ? void 0 : i.parts) ? a.ar.parts : [], t = Array.isArray((n = a == null ? void 0 : a.dr) == null ? void 0 : n.parts) ? a.dr.parts : [];
  return [
    ...e.map((s) => `AR - ${s.label}: ${qi(s.value)}`),
    ...t.map((s) => `DR - ${s.label}: ${qi(s.value)}`)
  ].join(`
`);
}
function ph(a = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of a)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
function qi(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function hh(a, e) {
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
function gh(a, e) {
  var l, c, u, d;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, n = Number(((l = i == null ? void 0 : i.attacker) == null ? void 0 : l.successes) ?? (i == null ? void 0 : i.attackerHits) ?? NaN), s = Number(((c = i == null ? void 0 : i.defender) == null ? void 0 : c.successes) ?? (i == null ? void 0 : i.defenderHits) ?? NaN), r = Number((i == null ? void 0 : i.netHits) ?? (i == null ? void 0 : i.net) ?? NaN);
  Number.isFinite(n) && Number.isFinite(s) && e.metaRows.push({ text: `Opposed: Att ${n} vs Def ${s} • Net ${Number.isFinite(r) ? r : n - s}` }), (u = t == null ? void 0 : t.incoming) != null && u.label && (e.incoming = { label: t.incoming.label, value: t.incoming.value ?? "" }, e.footerRows.push({ text: `Incoming: ${e.incoming.label} ${e.incoming.value}` }));
  const o = ((d = i == null ? void 0 : i.edgeEarned) == null ? void 0 : d.amount) > 0 ? i.edgeEarned : null;
  o && e.footerRows.push({ text: `Edge Earned: +${o.amount}${o.pool ? ` (${o.pool})` : ""}` });
}
function yh(a, e) {
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
const bh = {
  skill: dh,
  attack: mh,
  net: hh,
  opposed: gh,
  extended: yh
  // defense: enhanceDefense,
  // edge: enhanceEdge,
};
async function xa({ resolved: a } = {}) {
  const e = a ?? {}, t = Sh(e), i = bh[t.intent];
  return typeof i == "function" && i(e, t), await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-roll-card",
    t
  );
}
function Sh(a) {
  var f, p, h, g, y, b, S, w, M, N, P, L, V, G, W, j, O;
  const e = a ?? {}, t = Number(((f = e == null ? void 0 : e.roll) == null ? void 0 : f.target) ?? 5), i = Number(((p = e == null ? void 0 : e.dn) == null ? void 0 : p.total) ?? ((g = (h = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : h.dn) == null ? void 0 : g.total) ?? ((b = (y = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : y.difficulty) == null ? void 0 : b.dn) ?? 0), n = Number(((S = e == null ? void 0 : e.roll) == null ? void 0 : S.pool) ?? 0), s = Number(((w = e == null ? void 0 : e.outcome) == null ? void 0 : w.hits) ?? 0), r = (e == null ? void 0 : e.outcomeModel) ?? {}, o = typeof r.passed == "boolean" ? r.passed : s >= i, l = Number.isFinite(Number(r.margin)) ? Number(r.margin) : s - i, c = r.tier ?? null, u = Array.isArray(e == null ? void 0 : e.breakdownRows) ? e.breakdownRows.map((x) => `${x.label}: ${x.value}`).join(`
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
  }), (N = m == null ? void 0 : m.weapon) != null && N.name) {
    const x = ((P = m == null ? void 0 : m.weapon) == null ? void 0 : P.type) === "personalWeapon" || (L = m == null ? void 0 : m.weapon) != null && L.isSynthetic ? Ln((m == null ? void 0 : m.rangeBand) ?? "") : String((m == null ? void 0 : m.rangeBand) ?? "").trim(), q = String(((V = m == null ? void 0 : m.weapon) == null ? void 0 : V.damageTypeLabel) ?? ((G = m == null ? void 0 : m.weapon) == null ? void 0 : G.damageType) ?? "").trim(), Z = String(((W = m == null ? void 0 : m.payload) == null ? void 0 : W.label) ?? ((j = m == null ? void 0 : m.weapon) == null ? void 0 : j.payloadLabel) ?? "").trim();
    d.metaRows.push({
      text: `Weapon: ${m.weapon.name}${x ? ` • Range: ${x}` : ""}${q ? ` • Type: ${q}` : ""}${Z ? ` • Payload: ${Z}` : ""}`,
      title: ""
    }), (O = m == null ? void 0 : m.sourceState) != null && O.isTracked && d.footerRows.push({
      text: `Source: ${Number(m.sourceState.current ?? 0)}/${Number(m.sourceState.max ?? 0)}`,
      title: ""
    });
  }
  return d;
}
function Ah() {
  Hooks.on("renderChatMessageHTML", (a, e) => {
    e.addEventListener("click", (t) => {
      const i = t.target.closest("[data-mwd-action]");
      if (!i) return;
      const n = String(i.dataset.mwdAction || "").trim();
      n && (n === "edgePostReroll" && Bh(t, a), n === "toggleEvade" && Ih(t, a), n === "toggleEvadeEdge" && Dh(t, a), n === "toggleHazardEvade" && Oh(t, a), n === "toggleHazardEvadeEdge" && Lh(t, a), n === "applyHazardTick" && xh(t, a), n === "applyAttackDamage" && Nh(t, a), n === "applyAllAttackDamage" && _h(t, a));
    });
  });
}
function wh(a = {}) {
  var t;
  return (Array.isArray((t = a == null ? void 0 : a.attackResult) == null ? void 0 : t.results) ? a.attackResult.results : []).some((i) => {
    var n;
    return !!((n = i == null ? void 0 : i.queuedMutation) != null && n.applied);
  });
}
function Th(a) {
  return a === A.monitors.physical ? "Physical" : a === A.monitors.fatigue ? "Fatigue" : String(a ?? "").trim() || "Track";
}
function vh(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return e === "penetrating" ? "is-penetrating" : e === "energy" ? "is-energy" : e === "thermal" ? "is-thermal" : e === "electrical" ? "is-electrical" : "is-concussive";
}
function kh(a) {
  const e = Math.max(0, Number(a ?? 0) || 0);
  return e <= 0 ? { key: "is-none", label: "No Penetration" } : e <= 2 ? { key: "is-light", label: "Light Damage" } : e <= 4 ? { key: "is-medium", label: "Moderate Damage" } : e <= 7 ? { key: "is-heavy", label: "Heavy Damage" } : { key: "is-critical", label: "Critical Damage" };
}
function Eh({ actor: a = null, token: e = null } = {}) {
  var s;
  const t = (e == null ? void 0 : e.document) ?? e ?? null, i = String(((s = t == null ? void 0 : t.texture) == null ? void 0 : s.src) ?? "").trim(), n = String((a == null ? void 0 : a.img) ?? "").trim();
  return i || n || "icons/svg/mystery-man.svg";
}
function Mh(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
function Ch({ summary: a = {}, actor: e = null, token: t = null } = {}) {
  const i = String((a == null ? void 0 : a.damageType) ?? "").trim(), n = $t(i || "concussive") || "Damage", s = Th(a == null ? void 0 : a.track), r = Math.max(0, Number((a == null ? void 0 : a.finalDamage) ?? (a == null ? void 0 : a.appliedDelta) ?? 0) || 0), o = kh(r), l = r === 1 ? "1 point" : `${r} points`, c = String((a == null ? void 0 : a.actorName) ?? (e == null ? void 0 : e.name) ?? "Target").trim() || "Target", u = [];
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
    classes: ["mwd-damage-card", vh(i), o.key].join(" "),
    header: {
      left: "Damage Applied",
      right: s
    },
    target: {
      name: c,
      image: Eh({ actor: e, token: t })
    },
    damageTypeLabel: n,
    severityLabel: o.label,
    impactValue: r,
    impactText: r > 0 ? `${n} damage applied to ${s}.` : `${n} damage did not penetrate.`,
    rows: u
  };
}
async function Lr({ summary: a = {}, actor: e = null, token: t = null } = {}) {
  const i = await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-damage-application-card",
    Ch({ summary: a, actor: e, token: t })
  ), n = Mh({
    speaker: ChatMessage.getSpeaker({ actor: e, token: t }),
    content: i
  });
  return ChatMessage.create(n);
}
function Ph(a = {}) {
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
async function $c(a = {}, e = null) {
  var s, r, o;
  const t = Ph(a), i = Number(((s = a == null ? void 0 : a.outcome) == null ? void 0 : s.hits) ?? 0) || 0, n = ((r = a == null ? void 0 : a.outcomeModel) == null ? void 0 : r.edgeEarned) ?? null;
  return a.outcomeModel = xc(t, { successes: i, raw: (o = a == null ? void 0 : a.roll) == null ? void 0 : o.json }, null), a.outcomeModel.edgeEarned = n, t.intent === "attack" && e && t.attack && (a.attackResult = await _c({
    attacker: e,
    ctx: t,
    outcomeModel: a.outcomeModel,
    previewState: a.areaEffectPreviewState ?? {},
    existingAttackResult: a.attackResult ?? null
  })), a;
}
async function Nh(a, e) {
  var o, l, c, u, d, m, f;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='applyAttackDamage']"), i = Number((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.resultIndex);
  if (!Number.isInteger(i) || i < 0) return;
  const n = foundry.utils.deepClone((c = (l = e == null ? void 0 : e.flags) == null ? void 0 : l.mwd) == null ? void 0 : c.resolved);
  if (!n) return;
  const s = await Bc(n, i);
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
  }), await Lr({
    summary: s.summary,
    actor: s.targetActor,
    token: s.targetToken
  });
}
async function xr(a = {}) {
  var i, n;
  const e = (i = a == null ? void 0 : a.target) != null && i.actorUuid ? await fromUuid(a.target.actorUuid) : null, t = (n = a == null ? void 0 : a.target) != null && n.tokenUuid ? await fromUuid(a.target.tokenUuid) : null;
  return Hn({
    actor: e,
    token: t,
    edgePoolKey: (a == null ? void 0 : a.evadeEdgePoolKey) ?? ""
  });
}
function Rh(a = "") {
  var e, t;
  return ((t = (e = game.messages) == null ? void 0 : e.get) == null ? void 0 : t.call(e, String(a ?? "").trim())) ?? null;
}
async function Hn({ actor: a = null, token: e = null, actorUuid: t = "", tokenUuid: i = "", edgePoolKey: n = "" } = {}) {
  const s = a ?? (t ? await fromUuid(t) : null), r = e ?? (i ? await fromUuid(i) : null);
  return s ? {
    ...z.getReactionSpendPreview(s, { token: r, edgePoolKey: n }) ?? {},
    actor: s,
    token: r
  } : null;
}
async function $r(a, e) {
  var s, r;
  const t = foundry.utils.deepClone((r = (s = a == null ? void 0 : a.flags) == null ? void 0 : s.mwd) == null ? void 0 : r.resolved);
  if (!t) return;
  await e(t);
  const i = await fromUuid(t.actorUuid);
  if (!i) return;
  await $c(t, i);
  const n = await xa({ resolved: t });
  return await a.update({
    content: n,
    "flags.mwd.resolved": t
  }), t;
}
async function Br(a, e, { active: t = !1, edgePoolKey: i = "" } = {}) {
  var r, o, l, c, u, d, m, f;
  const n = (r = e == null ? void 0 : e.target) != null && r.actorUuid ? await fromUuid(e.target.actorUuid) : null, s = (o = e == null ? void 0 : e.target) != null && o.tokenUuid ? await fromUuid(e.target.tokenUuid) : null;
  if (n) {
    if (!t) {
      const p = z.getSnapshot(n, { token: s }), h = (p == null ? void 0 : p.pendingReaction) ?? null;
      (h == null ? void 0 : h.sourceKind) === "attack" && (h == null ? void 0 : h.messageId) === a.id && (h == null ? void 0 : h.sourceId) === (e == null ? void 0 : e.previewKey) && await z.clearPendingReaction(n, { token: s });
      return;
    }
    await z.setPendingReaction(n, {
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
async function Ih(a, e) {
  var r, o;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleEvade']"), i = String(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.previewKey) ?? "").trim();
  if (!i) return;
  const n = await $r(e, async (l) => {
    var f;
    if (l.areaEffectPreviewState ?? (l.areaEffectPreviewState = {}), !!(l.areaEffectPreviewState[i] ?? {}).evadeActive) {
      delete l.areaEffectPreviewState[i];
      return;
    }
    l.areaEffectPreviewState[i] = {
      evadeActive: !0,
      edgePoolKey: null
    };
    const d = (Array.isArray((f = l == null ? void 0 : l.attackResult) == null ? void 0 : f.results) ? l.attackResult.results : []).find((p) => (p == null ? void 0 : p.previewKey) === i) ?? null, m = d ? await xr({ ...d, evadeEdgePoolKey: null }) : null;
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
  n && s && await Br(e, s, {
    active: !!(s != null && s.evadeActive),
    edgePoolKey: String((s == null ? void 0 : s.evadeEdgePoolKey) ?? "").trim()
  });
}
async function Dh(a, e) {
  var o, l, c;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleEvadeEdge']"), i = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.previewKey) ?? "").trim(), n = String(((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.poolKey) ?? "").trim();
  if (!i) return;
  const s = await $r(e, async (u) => {
    var h;
    u.areaEffectPreviewState ?? (u.areaEffectPreviewState = {});
    const d = u.areaEffectPreviewState[i] ?? {}, m = d.edgePoolKey === n ? null : n;
    u.areaEffectPreviewState[i] = {
      ...d,
      evadeActive: !0,
      edgePoolKey: m
    };
    const f = (Array.isArray((h = u == null ? void 0 : u.attackResult) == null ? void 0 : h.results) ? u.attackResult.results : []).find((g) => (g == null ? void 0 : g.previewKey) === i) ?? null, p = f ? await xr({ ...f, evadeEdgePoolKey: m }) : null;
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
  s && r && await Br(e, r, {
    active: !!(r != null && r.evadeActive),
    edgePoolKey: String((r == null ? void 0 : r.evadeEdgePoolKey) ?? "").trim()
  });
}
async function _h(a, e) {
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
    const S = await Bc(t, b);
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
    await Lr({
      summary: b.summary,
      actor: b.targetActor,
      token: b.targetToken
    });
  r.length && ((y = (g = ui.notifications) == null ? void 0 : g.warn) == null || y.call(g, `Applied ${s} queued damage result${s === 1 ? "" : "s"}; ${r.length} failed.`));
}
async function Bc(a, e) {
  var l, c, u, d, m, f;
  const t = ((c = (l = a == null ? void 0 : a.attackResult) == null ? void 0 : l.results) == null ? void 0 : c[e]) ?? null, i = (t == null ? void 0 : t.queuedMutation) ?? null;
  if (!i)
    return { ok: !1, reason: "No queued attack damage to apply." };
  if (i.applied)
    return { ok: !0, skipped: !0, reason: "That attack damage has already been applied." };
  let n = null, s = null, r = null;
  try {
    if (s = (u = i.target) != null && u.actorUuid ? await fromUuid(i.target.actorUuid) : null, r = (d = i.target) != null && d.tokenUuid ? await fromUuid(i.target.tokenUuid) : null, t != null && t.evadeActive && s) {
      const p = await z.commitReactionSpend(s, {
        token: r,
        actionId: "evade",
        actionLabel: "Evade",
        actionCategory: "reaction",
        logLabel: `Evade: ${((m = i.target) == null ? void 0 : m.name) ?? ((f = t == null ? void 0 : t.target) == null ? void 0 : f.name) ?? "Target"}`,
        edgePoolKey: String((t == null ? void 0 : t.evadeEdgePoolKey) ?? "").trim()
      });
      if (!(p != null && p.ok))
        return { ok: !1, reason: (p == null ? void 0 : p.reason) ?? "Unable to spend the Evade reaction." };
      await z.clearPendingReaction(s, { token: r });
    }
    n = await ft.apply({
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
  const o = pa(
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
async function zc(a, e) {
  const t = e != null && e.actorUuid ? await fromUuid(e.actorUuid) : null, i = e != null && e.tokenUuid ? await fromUuid(e.tokenUuid) : null, n = await rc(e, { actor: t, token: i });
  return await a.update({
    content: n,
    "flags.mwd.hazardCard": e
  }), e;
}
async function zr(a, e) {
  var i, n;
  const t = kr(foundry.utils.deepClone(((n = (i = a == null ? void 0 : a.flags) == null ? void 0 : i.mwd) == null ? void 0 : n.hazardCard) ?? {}));
  return t != null && t.actorUuid ? (await e(t), await zc(a, t), t) : null;
}
async function Fr(a, e, { active: t = !1, edgePoolKey: i = "" } = {}) {
  var r, o, l;
  const n = e != null && e.actorUuid ? await fromUuid(e.actorUuid) : null, s = e != null && e.tokenUuid ? await fromUuid(e.tokenUuid) : null;
  if (n) {
    if (!t) {
      const c = z.getSnapshot(n, { token: s }), u = (c == null ? void 0 : c.pendingReaction) ?? null;
      (u == null ? void 0 : u.sourceKind) === "hazard" && (u == null ? void 0 : u.messageId) === a.id && (u == null ? void 0 : u.sourceId) === (e == null ? void 0 : e.regionId) && await z.clearPendingReaction(n, { token: s });
      return;
    }
    await z.setPendingReaction(n, {
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
async function Oh(a, e) {
  var i, n;
  a.preventDefault();
  const t = await zr(e, async (s) => {
    var l, c, u;
    const r = !((l = s == null ? void 0 : s.preview) != null && l.evadeActive), o = dr(gi({
      tier: ((c = s == null ? void 0 : s.exposure) == null ? void 0 : c.initialTier) ?? "none"
    }), {
      active: r,
      locked: !!((u = s == null ? void 0 : s.exposure) != null && u.evadeLocked)
    });
    if (s.preview ?? (s.preview = {}), s.preview.evadeActive = r, s.preview.edgePoolKey = null, s.preview.finalTier = o.finalTier, s.damageAfter = Mi(s.baseDamage ?? 0, o.finalTier), r) {
      const d = await Hn({
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
  t && await Fr(e, t, {
    active: !!((i = t == null ? void 0 : t.preview) != null && i.evadeActive),
    edgePoolKey: String(((n = t == null ? void 0 : t.preview) == null ? void 0 : n.edgePoolKey) ?? "").trim()
  });
}
async function Lh(a, e) {
  var s, r, o;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleHazardEvadeEdge']"), i = String(((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.poolKey) ?? "").trim(), n = await zr(e, async (l) => {
    l.preview ?? (l.preview = {}), l.preview.evadeActive = !0, l.preview.edgePoolKey = l.preview.edgePoolKey === i ? null : i;
    const c = await Hn({
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
  n && await Fr(e, n, {
    active: !!((r = n == null ? void 0 : n.preview) != null && r.evadeActive),
    edgePoolKey: String(((o = n == null ? void 0 : n.preview) == null ? void 0 : o.edgePoolKey) ?? "").trim()
  });
}
async function xh(a, e) {
  var u, d, m, f, p, h, g, y, b, S, w, M, N, P, L, V, G, W, j, O, x;
  a.preventDefault();
  const t = kr(foundry.utils.deepClone(((d = (u = e == null ? void 0 : e.flags) == null ? void 0 : u.mwd) == null ? void 0 : d.hazardCard) ?? {}));
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
    const q = await z.commitReactionSpend(i, {
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
    notes: `Hazard exposure ${t.exposure.initialLabel}${(w = t.preview) != null && w.evadeActive ? ` -> ${String(t.preview.finalTier ?? t.exposure.initialTier).toUpperCase()}` : ""}`.trim()
  }, r = await ft.apply({
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
  const o = z.getSnapshot(i, { token: n }), l = ((P = o == null ? void 0 : o.hazards) == null ? void 0 : P[t.regionId]) ?? {}, c = Re(t.nextTier, t.exposure.finalTier);
  await z.setHazardState(i, {
    token: n,
    regionId: t.regionId,
    hazardState: {
      ...l,
      tier: c,
      turnsExposed: Math.max(Number((l == null ? void 0 : l.turnsExposed) ?? 0), Number(t.turnsExposed ?? 0)) + 1,
      lastProcessedRound: Number(((L = o == null ? void 0 : o.combat) == null ? void 0 : L.round) ?? 0) || 0,
      evadeLocked: !!(l != null && l.evadeLocked) || !!(((V = t.exposure) == null ? void 0 : V.initialTier) === "full" && ((G = t.preview) == null ? void 0 : G.finalTier) === "major" && ((W = t.preview) != null && W.evadeActive))
    }
  }), c === "full" && Number((t == null ? void 0 : t.onFullBurnDelta) ?? 0) > 0 && await i.update({
    "system.burn.value": Math.max(0, Number(((O = (j = i.system) == null ? void 0 : j.burn) == null ? void 0 : O.value) ?? 0) + Number(t.onFullBurnDelta ?? 0))
  }), await z.clearPendingReaction(i, { token: n }), t.applied = !0, t.applyReason = "Applied", await zc(e, t), await Lr({
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
      notes: `Hazard exposure ${t.exposure.initialLabel}${(x = t.preview) != null && x.evadeActive ? ` -> ${String(t.preview.finalTier ?? "").toUpperCase()}` : ""}`
    },
    actor: i,
    token: n
  });
}
async function $h(a, { token: e = null } = {}) {
  var s, r;
  const t = z.getSnapshot(a, { token: e }), i = (t == null ? void 0 : t.pendingReaction) ?? null;
  if (!(i != null && i.messageId))
    return { ok: !1, reason: "Use an area effect or hazard card to trigger Evade." };
  const n = Rh(i.messageId);
  if (!n)
    return await z.clearPendingReaction(a, { token: e }), { ok: !1, reason: "The pending Evade card is no longer available." };
  if (i.sourceKind === "attack") {
    const o = String(i.sourceId ?? "").trim();
    if (!o) return { ok: !1, reason: "Pending Evade target is missing." };
    const l = await $r(n, async (u) => {
      var f;
      u.areaEffectPreviewState ?? (u.areaEffectPreviewState = {}), u.areaEffectPreviewState[o] = {
        ...u.areaEffectPreviewState[o] ?? {},
        evadeActive: !0,
        edgePoolKey: i.edgePoolKey ?? null
      };
      const d = (Array.isArray((f = u == null ? void 0 : u.attackResult) == null ? void 0 : f.results) ? u.attackResult.results : []).find((p) => (p == null ? void 0 : p.previewKey) === o) ?? null, m = d ? await xr({ ...d, evadeEdgePoolKey: i.edgePoolKey ?? "" }) : null;
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
    return c && await Br(n, c, {
      active: !0,
      edgePoolKey: String((c == null ? void 0 : c.evadeEdgePoolKey) ?? i.edgePoolKey ?? "").trim()
    }), { ok: !0 };
  }
  if (i.sourceKind === "hazard") {
    const o = await zr(n, async (l) => {
      var d, m;
      const c = dr(gi({
        tier: ((d = l == null ? void 0 : l.exposure) == null ? void 0 : d.initialTier) ?? "none"
      }), {
        active: !0,
        locked: !!((m = l == null ? void 0 : l.exposure) != null && m.evadeLocked)
      });
      l.preview ?? (l.preview = {}), l.preview.evadeActive = !0, l.preview.edgePoolKey = l.preview.edgePoolKey ?? i.edgePoolKey ?? null, l.preview.finalTier = c.finalTier, l.damageAfter = Mi(l.baseDamage ?? 0, c.finalTier);
      const u = await Hn({
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
    return o && await Fr(n, o, {
      active: !0,
      edgePoolKey: String(((r = o == null ? void 0 : o.preview) == null ? void 0 : r.edgePoolKey) ?? i.edgePoolKey ?? "").trim()
    }), { ok: !0 };
  }
  return { ok: !1, reason: "That Evade source is not supported." };
}
async function Bh(a, e) {
  var p, h, g, y, b, S, w, M, N, P, L, V, G, W, j, O, x, q, Z;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='edgePostReroll']"), i = String(((p = t == null ? void 0 : t.dataset) == null ? void 0 : p.poolKey) ?? "").trim();
  if (!i) return;
  const n = foundry.utils.deepClone((g = (h = e == null ? void 0 : e.flags) == null ? void 0 : h.mwd) == null ? void 0 : g.resolved);
  if (!n) return;
  if (wh(n)) {
    (b = (y = ui.notifications) == null ? void 0 : y.warn) == null || b.call(y, "Post-roll Edge is disabled after attack damage has been applied.");
    return;
  }
  if (Number(((w = (S = n == null ? void 0 : n.edge) == null ? void 0 : S.post) == null ? void 0 : w.spent) ?? 0) === 1) return;
  if (!(Array.isArray((N = (M = n == null ? void 0 : n.edge) == null ? void 0 : M.allowed) == null ? void 0 : N.postPools) ? n.edge.allowed.postPools : []).includes(i)) {
    (L = (P = ui.notifications) == null ? void 0 : P.warn) == null || L.call(P, `Post-spend pool not allowed: ${i}`);
    return;
  }
  const r = Array.isArray((V = n == null ? void 0 : n.roll) == null ? void 0 : V.failureDiceRefs) ? n.roll.failureDiceRefs : [];
  if (r.length <= 0) {
    (W = (G = ui.notifications) == null ? void 0 : G.info) == null || W.call(G, "No failures to reroll.");
    return;
  }
  const o = await fromUuid(n.actorUuid);
  if (!o) {
    (O = (j = ui.notifications) == null ? void 0 : j.warn) == null || O.call(j, "Actor not found for this roll.");
    return;
  }
  await ((x = o.spendEdge) == null ? void 0 : x.call(o, i, 1));
  const l = Number(((q = n == null ? void 0 : n.roll) == null ? void 0 : q.target) ?? 5), u = (Z = (await new Roll(`${r.length}d6cs>=${l}`).evaluate()).dice) == null ? void 0 : Z[0], d = Array.isArray(u == null ? void 0 : u.results) ? u.results : [], m = d.filter((ae) => ae.success).length;
  n.outcome = n.outcome ?? {}, n.outcome.hits = Number(n.outcome.hits ?? 0) + m, n.edge = n.edge ?? {}, n.edge.post = { poolKey: i, spent: 1 }, n.edge.availableActions = {
    ...n.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, n.roll = n.roll ?? {}, n.roll.diceGroups = Array.isArray(n.roll.diceGroups) ? n.roll.diceGroups : [], n.roll.diceGroups.push({
    id: "post",
    label: "Post Reroll",
    faces: 6,
    termIndex: null,
    dice: d.map((ae, ue) => {
      const oe = Number(ae.result), E = !!ae.success;
      return {
        ref: `post:${ue}`,
        face: oe,
        isSuccess: E,
        isFailure: !E,
        tooltip: E ? `Post die ${ue + 1}: ${oe} (Success vs TN ${l})` : `Post die ${ue + 1}: ${oe} (Failure vs TN ${l})`
      };
    })
  }), await $c(n, o);
  const f = await xa({ resolved: n });
  await e.update({
    content: f,
    "flags.mwd.resolved": n,
    "flags.mwd.payload.edge.post": { poolKey: i, spent: 1 }
  });
}
function Je(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function zh(a) {
  return String(a ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function Ga(a, e = 180) {
  const t = zh(a);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function ni(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function Ka(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim(),
    emphasis: e.emphasis ?? ""
  }));
}
function Va(a = []) {
  return ni(a).map((e) => ({ label: e }));
}
function Ya(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
const Fh = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}, Uh = {
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
};
function zo(a) {
  const e = Number(a ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function Hh({ defenseBonus: a = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(a ?? 0) || 0;
  i !== 0 && t.push(`Defense ${zo(i)}`);
  for (const [n, s] of Object.entries(Fh)) {
    const r = Number((e == null ? void 0 : e[n]) ?? 0) || 0;
    r !== 0 && t.push(`${s} ${zo(r)}`);
  }
  return t.join(" | ");
}
function Wh(a = {}, e = ["close", "near", "far", "extreme"]) {
  return e.map((t) => {
    const i = Je(a == null ? void 0 : a[t], 0);
    return `${t.charAt(0).toUpperCase() + t.slice(1)} ${i}`;
  }).join(" | ");
}
function jh(a = {}) {
  return ["close", "near", "far", "extreme"].map((e) => `${e.charAt(0).toUpperCase()}${Je(a == null ? void 0 : a[e], 0)}`).join(" ");
}
function qh(a = "") {
  const e = String(a ?? "").trim().toLowerCase();
  return e ? e.charAt(0).toUpperCase() + e.slice(1) : "";
}
function et(a) {
  return String(a ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function Fo({ title: a, label: e, options: t = [], confirmLabel: i = "Select" } = {}) {
  const n = Array.isArray(t) ? t.filter((r) => r == null ? void 0 : r.value) : [];
  if (!n.length) return "";
  if (n.length === 1) return String(n[0].value ?? "").trim();
  const s = `<form class="mwd-quick-select"><div class="mwd-field"><label>${et(e)}</label><select name="selection">${n.map((r) => `<option value="${et(r.value)}">${et(r.label ?? r.value)}</option>`).join("")}</select></div></form>`;
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
var bt, ci, vi, Ft, _, Fc, qs, mn, Uc, Hc, ke, Nt, Wi, Wc, jc, qc, Gc, Kc, Vc, Yc, Rt, ha;
const he = class he extends ia {
  constructor() {
    super(...arguments);
    Pe(this, _);
    Pe(this, bt, null);
    Pe(this, ci, null);
    Pe(this, vi, null);
    Pe(this, Ft, /* @__PURE__ */ new Set());
  }
  /** @override */
  async _prepareContext(t) {
    var j, O, x, q, Z, ae, ue, oe, E, U, ne, te, Ee, je, pt, ht, nt, gt, Fe, st, Tt, vt, kt, Et, Mt, Ct, rt;
    const i = await super._prepareContext(t), n = ((j = this.getSheetTokenDocument) == null ? void 0 : j.call(this)) ?? null;
    i._mwdThemeClass = game.system.mwd.styles.selectCssClass(), i.layout = await kn.get("character");
    const s = ((x = (O = this.actor).getEdgeCap) == null ? void 0 : x.call(O)) ?? Number(((ae = (Z = (q = this.actor.system) == null ? void 0 : q.attributes) == null ? void 0 : Z.edge) == null ? void 0 : ae.value) ?? 0), r = !!this.isEditable, o = { physical: "Physical", mental: "Mental", social: "Social" }, l = {
      grit: "Grit",
      insight: "Insight",
      legend: "Legend",
      chaos: "Chaos",
      rumor: "Rumor",
      credibility: "Credibility"
    }, c = this.actor.getEdgePoolSummary ? this.actor.getEdgePoolSummary({ groups: sr }) : { groups: [] };
    i.edgeConsole = {
      cap: s,
      editable: r,
      capPips: Array.from({ length: Math.max(0, s) }, (k, R) => R + 1),
      groups: (c.groups ?? []).map((k) => ({
        id: k.id,
        label: o[k.id] ?? k.id,
        pools: (k.pools ?? []).map((R) => {
          const Y = Number(R.effectiveValue ?? 0), ge = Number(R.effectiveMax ?? 0), we = Array.from({ length: Math.max(0, ge) }, (De, Ue) => {
            const qe = Ue + 1;
            return { n: qe, filled: qe <= Y };
          }), ve = String(R.key ?? "").split(".").pop();
          return {
            key: R.key,
            label: l[ve] ?? ve ?? R.key,
            value: Y,
            max: ge,
            rating: Number(R.rating ?? 0),
            ratingBonus: Number(R.ratingBonus ?? 0),
            effectiveRating: Number(R.effectiveRating ?? R.rating ?? 0),
            isCapped: Number(R.effectiveRating ?? R.rating ?? 0) > Number(R.cap ?? s),
            pips: we,
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
    for (const k of i.edgeConsole.groups ?? [])
      for (const R of k.pools ?? []) {
        const Y = String(R.key ?? "").split(".").pop();
        Y && d.set(Y, R), R.domain = k.id;
      }
    i.edgeConsole.poolsOrdered = u.map((k) => d.get(k)).filter(Boolean);
    const m = this.actor.system ?? {}, f = m.monitors ?? {}, p = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue", label: "Fatigue", kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor", label: "Armor", kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ], h = (k, R, Y = 0) => {
      const ge = foundry.utils.getProperty(k, R), we = Number(ge);
      return Number.isFinite(we) ? we : Y;
    };
    i.conditionMonitors = p.map((k) => {
      const R = (f == null ? void 0 : f[k.id]) ?? {}, Y = Math.max(0, h(R, "max", 0)), ge = Math.min(Math.max(0, h(R, "value", 0)), Y);
      return {
        id: k.id,
        label: k.label,
        kind: k.kind,
        editable: !!this.isEditable,
        value: ge,
        max: Y,
        segments: Array.from({ length: Y }, (we, ve) => {
          const De = ve + 1;
          return { value: De, filled: De <= ge };
        }),
        status: k.status ? { label: k.status.label, value: h(R, k.status.path, 0) } : null
      };
    });
    const g = Number(((oe = (ue = this.actor.system) == null ? void 0 : ue.burn) == null ? void 0 : oe.value) ?? 0), y = 10, b = 6, S = Math.min(g, y);
    i.burnOverflow = Math.max(0, g - y), i.burnPenalty = Math.floor(g / 2), i.burnPips = Array.from({ length: y }, (k, R) => {
      const Y = R + 1;
      return {
        pipValue: Y,
        filled: Y <= S,
        threshold: Y === b
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
      overloaded: !!((U = (E = this.actor.system) == null ? void 0 : E.burn) != null && U.overloaded)
    };
    const w = z.getSnapshot(this.actor, { token: n });
    i.combatDashboard = {
      targeting: w.targeting,
      rollImpact: w.rollImpact,
      states: w.states,
      effects: w.effects,
      activation: w.activation,
      inactiveReason: w.inactiveReason
    };
    const M = z.buildActionModel(this.actor, w), N = new Set((M.menus ?? []).map((k) => k.id));
    H(this, bt) && !N.has(H(this, bt)) && $e(this, bt, null), i.combatActions = {
      ...M,
      menus: (M.menus ?? []).map((k) => ({
        ...k,
        isOpen: k.id === H(this, bt)
      }))
    };
    const P = ((te = (ne = this.actor).getPersonalCombatLoadout) == null ? void 0 : te.call(ne)) ?? null;
    i.personalInventory = {
      warnings: [...(P == null ? void 0 : P.warnings) ?? []],
      weapons: ((P == null ? void 0 : P.weapons) ?? []).map((k) => {
        var Q, ye, We, Ze, ct, F, fe;
        const R = C(this, _, ha).call(this, "weapons", k.id), Y = String((k == null ? void 0 : k.category) ?? "").trim().toLowerCase() !== "melee", ge = !!((Q = k == null ? void 0 : k.sourceState) != null && Q.isTracked), we = String((k == null ? void 0 : k.payloadLabel) ?? "").trim() || "Unloaded", ve = Y && ge ? `${Je((ye = k == null ? void 0 : k.sourceState) == null ? void 0 : ye.current, 0)}/${Je((We = k == null ? void 0 : k.sourceState) == null ? void 0 : We.max, 0)}` : "", De = Y ? ge ? `${we} ${ve}` : we : "", Ue = Y ? ge ? `Payload ${ve}` : `Payload ${we}` : "", qe = Wh(k.attackRatingBand), ot = jh(k.attackRatingBand), lt = Ya([
          { label: "Skill", value: ((Ze = k.skillDef) == null ? void 0 : Ze.label) ?? k.skill ?? "" },
          { label: "Category", value: k.category ?? "" },
          { label: "Damage Type", value: k.damageTypeLabel ?? k.damageType ?? "" },
          { label: "Max Range", value: qh(((ct = k.range) == null ? void 0 : ct.max) ?? k.defaultRangeBand ?? "") },
          { label: "CQ Bands", value: qe },
          { label: "Payload", value: De },
          { label: "Traits", value: ni(k.traits ?? []).join(", ") }
        ]);
        return {
          id: k.id,
          accordionId: R,
          isExpanded: H(this, Ft).has(R),
          name: k.name,
          img: k.img,
          subtitle: ((F = k.skillDef) == null ? void 0 : F.label) ?? k.category ?? "",
          summaryStats: Ka([
            { label: "DV", value: Je(k.damage, 0), emphasis: "strong" },
            { label: "AP", value: Je(k.ap, 0) },
            { label: "Type", value: k.damageTypeLabel ?? k.damageType ?? "" },
            { label: "CQ", value: ot }
          ]),
          detailTags: Va([
            k.equipped ? "Equipped" : "",
            k.isPrimary ? "Primary" : "",
            Ue,
            ...ni(k.traits ?? [])
          ]),
          detailRows: lt,
          detailText: Ga(k.notes),
          equipped: !!k.equipped,
          isPrimary: !!k.isPrimary,
          attackRoll: JSON.stringify({
            intent: "attack",
            weaponId: k.id,
            payloadId: ((fe = k == null ? void 0 : k.payloadState) == null ? void 0 : fe.activePayloadId) ?? "",
            edge: { pool: "physical.grit", allowed: ["pre", "post"] },
            tags: ["combat", "attack"]
          })
        };
      }),
      armor: ((P == null ? void 0 : P.armor) ?? []).map((k) => {
        var De, Ue, qe, ot, lt, Q, ye, We, Ze, ct, F, fe, _i, yt;
        const R = ((De = P == null ? void 0 : P.activeArmor) == null ? void 0 : De.id) === k.id ? P.activeArmor : null, Y = C(this, _, ha).call(this, "armor", k.id), ge = Je(((qe = (Ue = R == null ? void 0 : R.traitState) == null ? void 0 : Ue.reinforced) == null ? void 0 : qe.max) ?? ((lt = (ot = k == null ? void 0 : k.traitState) == null ? void 0 : ot.reinforced) == null ? void 0 : lt.max), 0), we = ge > 0 ? `${Je(((ye = (Q = R == null ? void 0 : R.traitState) == null ? void 0 : Q.reinforced) == null ? void 0 : ye.current) ?? ((Ze = (We = k == null ? void 0 : k.traitState) == null ? void 0 : We.reinforced) == null ? void 0 : Ze.current), 0)}/${ge}` : "", ve = Hh({
          defenseBonus: k.defenseBonus,
          mitigationByType: (R == null ? void 0 : R.mitigationByType) ?? (R == null ? void 0 : R.typedMitigation) ?? k.mitigationByType ?? {}
        });
        return {
          id: k.id,
          accordionId: Y,
          isExpanded: H(this, Ft).has(Y),
          name: k.name,
          img: k.img,
          subtitle: (ct = k.tags) != null && ct.length ? k.tags.join(", ") : "Armor",
          summaryStats: Ka([
            { label: "Rating", value: Je((R == null ? void 0 : R.ratingCurrent) ?? k.rating, 0), emphasis: "strong" },
            { label: "Res", value: Je((R == null ? void 0 : R.baseMitigation) ?? (R == null ? void 0 : R.baseResistance), 0) },
            { label: "Def", value: Je(k.defenseBonus, 0) },
            { label: "Dur", value: `${Je(((F = R == null ? void 0 : R.durability) == null ? void 0 : F.current) ?? ((fe = k.durability) == null ? void 0 : fe.current), 0)}/${Je(((_i = R == null ? void 0 : R.durability) == null ? void 0 : _i.max) ?? ((yt = k.durability) == null ? void 0 : yt.max), 0)}` }
          ]),
          detailTags: Va([
            k.equipped ? "Equipped" : "",
            k.isPrimary ? "Primary" : "",
            we ? `Reinforced ${we}` : "",
            ...ni(k.traits ?? [])
          ]),
          detailRows: Ya([
            { label: "Modifiers", value: ve },
            { label: "Traits", value: ni(k.traits ?? []).join(", ") },
            { label: "Tags", value: ni(k.tags ?? []).join(", ") }
          ]),
          detailText: Ga(k.notes),
          equipped: !!k.equipped,
          isPrimary: !!k.isPrimary
        };
      }),
      gear: (((Ee = i.items) == null ? void 0 : Ee.gear) ?? []).map((k) => {
        var Ue, qe, ot, lt, Q, ye, We;
        const R = C(this, _, ha).call(this, "gear", k.id), Y = Math.max(0, Math.trunc(Je(((Ue = k.system) == null ? void 0 : Ue.quantity) ?? 1, 1))), ge = Math.max(0, Math.trunc(Je(((qe = k.system) == null ? void 0 : qe.rating) ?? 0, 0))), we = ni(((ot = k.system) == null ? void 0 : ot.tags) ?? []), ve = String(((lt = k.system) == null ? void 0 : lt.category) ?? "").trim(), De = Uh[ve] ?? ve;
        return {
          id: k.id,
          itemType: "gear",
          isGear: !0,
          accordionId: R,
          isExpanded: H(this, Ft).has(R),
          name: k.name,
          img: k.img,
          subtitle: De || "Gear",
          summaryStats: Ka([
            { label: "Qty", value: Y, emphasis: "strong" },
            { label: "Rating", value: ge }
          ]),
          detailTags: Va([
            ...we,
            (Q = k.system) != null && Q.inactive ? "Inactive" : ""
          ]),
          detailRows: Ya([
            { label: "Quantity", value: Y },
            { label: "Rating", value: ge },
            { label: "Source", value: ((ye = k.system) == null ? void 0 : ye.sourceReference) ?? "" },
            { label: "Category", value: De },
            { label: "Tags", value: we.join(", ") }
          ]),
          detailText: Ga((We = k.system) == null ? void 0 : We.description),
          quantity: Y,
          canAdjustQuantity: this.isEditable
        };
      })
    }, i.bio = {
      fields: ((je = i.bio) == null ? void 0 : je.fields) ?? {},
      faction: ((pt = m.biography) == null ? void 0 : pt.faction) ?? "",
      age: ((ht = m.biography) == null ? void 0 : ht.age) ?? "",
      rank: ((nt = m.biography) == null ? void 0 : nt.rank) ?? "",
      height: ((gt = m.biography) == null ? void 0 : gt.height) ?? "",
      weight: ((Fe = m.biography) == null ? void 0 : Fe.weight) ?? "",
      xpTotal: ((Tt = (st = m.counters) == null ? void 0 : st.xp) == null ? void 0 : Tt.total) ?? 0,
      xpSpent: ((kt = (vt = m.counters) == null ? void 0 : vt.xp) == null ? void 0 : kt.value) ?? 0,
      experienceLevel: ((Et = m.biography) == null ? void 0 : Et.experienceLevel) ?? "green",
      enrichedHistory: await foundry.applications.ux.TextEditor.implementation.enrichHTML(
        ((Mt = m.biography) == null ? void 0 : Mt.history) ?? "",
        { async: !0, secrets: this.actor.isOwner, relativeTo: this.actor }
      )
    };
    const L = hi(this.actor);
    i.skillsDisplay = Bl(((Ct = this.actor) == null ? void 0 : Ct.system) ?? {}, {
      bonusBySkill: L.bonusBySkill
    }), i.lifeModules = L.slotStates.map((k) => {
      const R = k.state;
      return {
        moduleType: k.moduleType,
        label: k.label,
        hasCatalogEntries: k.availableEntries.length > 0,
        emptyState: k.availableEntries.length > 0 ? `Add ${k.label}` : `No ${k.label} catalog entries configured`,
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
    const V = ["positive", "negative", "narrative"], G = ["major", "minor"], W = [...((rt = i.items) == null ? void 0 : rt.quality) ?? []].sort((k, R) => {
      const Y = _t(k.system ?? {}), ge = _t(R.system ?? {}), we = V.indexOf(Y.category) - V.indexOf(ge.category);
      if (we !== 0) return we;
      const ve = G.indexOf(Y.tier) - G.indexOf(ge.tier);
      return ve !== 0 ? ve : String(k.name ?? "").localeCompare(String(R.name ?? ""));
    });
    return i.qualityGroups = V.map((k) => ({
      id: k,
      label: en(k),
      records: W.filter((R) => _t(R.system ?? {}).category === k).map((R) => {
        var we, ve, De, Ue;
        const Y = _t(R.system ?? {}), ge = C(this, _, ha).call(this, "quality", R.id);
        return {
          id: R.id,
          accordionId: ge,
          isExpanded: H(this, Ft).has(ge),
          name: R.name,
          img: R.img,
          subtitle: `${tn(Y.tier)} ${en(Y.category)}`,
          summaryStats: Ka([
            { label: "Tier", value: tn(Y.tier), emphasis: "strong" },
            { label: "Activation", value: Y.activation || "passive" },
            { label: "Effects", value: String(((we = Y.effects) == null ? void 0 : we.length) ?? 0) }
          ]),
          detailTags: Va([
            Y.inactive ? "Inactive" : "",
            ...Y.tags ?? []
          ]),
          detailRows: Ya([
            { label: "Category", value: en(Y.category) },
            { label: "Tier", value: tn(Y.tier) },
            { label: "Activation", value: Y.activation || "passive" },
            { label: "Prerequisites", value: String(((ve = Y.prerequisites) == null ? void 0 : ve.length) ?? 0) },
            { label: "Effects", value: String(((De = Y.effects) == null ? void 0 : De.length) ?? 0) },
            { label: "Tags", value: ni(Y.tags ?? []).join(", ") }
          ]),
          detailText: Ga((Ue = R.system) == null ? void 0 : Ue.description)
        };
      })
    })), i;
  }
  _onRender(t, i) {
    super._onRender(t, i), C(this, _, Fc).call(this), C(this, _, Hc).call(this);
  }
  async close(t = {}) {
    return C(this, _, qs).call(this), super.close(t);
  }
  requestCombatDashboardRefresh() {
    C(this, _, ke).call(this, { force: !0 });
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
    n && ($e(this, bt, H(this, bt) === n ? null : n), C(this, _, ke).call(this, !1));
  }
  async _onToggleStatuses(t, i) {
    var r, o, l, c, u, d, m, f;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), C(this, _, Rt).call(this, i, t, "Statuses are not available right now.") || !this.isEditable) return;
    const n = this.getPersistentActor() ?? this.actor, s = ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? ((u = z.getSnapshot(n, { token: ((c = this.getSheetTokenDocument) == null ? void 0 : c.call(this)) ?? null })) == null ? void 0 : u.tokenDocument) ?? ((m = z.getSnapshot(this.actor, { token: ((d = this.getSheetTokenDocument) == null ? void 0 : d.call(this)) ?? null })) == null ? void 0 : m.tokenDocument) ?? null;
    if (!s) {
      (f = ui.notifications) == null || f.warn("Statuses require a token for this actor on the current scene.");
      return;
    }
    return _d({
      actor: n,
      token: s
    });
  }
  async _onCombatSpend(t, i) {
    var c, u, d, m, f, p, h, g, y, b;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), C(this, _, Rt).call(this, i, t, "That combat action is not available right now.") || !this.isEditable) return;
    const n = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.resource) ?? "").trim(), s = Math.max(0, Number(((m = i == null ? void 0 : i.dataset) == null ? void 0 : m.cost) ?? 0)), r = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.combatAction) ?? "").trim(), o = String(((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.combatLabel) ?? "").trim(), l = String(((h = i == null ? void 0 : i.dataset) == null ? void 0 : h.combatCostLabel) ?? "").trim();
    if (!(!n || !s || !r))
      try {
        const S = this.getPersistentActor() ?? this.actor, w = await z.spendResource(S, {
          token: ((g = this.getSheetTokenDocument) == null ? void 0 : g.call(this)) ?? z.getCurrentSceneTokenDocument(S) ?? z.getCurrentSceneTokenDocument(this.actor),
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
        C(this, _, Nt).call(this, { rerender: !1 }), C(this, _, ke).call(this, { force: !0 });
      } catch (S) {
        console.error("MWD | Failed to spend combat action", S), (b = ui.notifications) == null || b.error("Unable to spend action.");
      }
  }
  async _onCombatAction(t, i) {
    var s, r, o, l, c, u;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t), C(this, _, Rt).call(this, i, t, "That combat action is not available right now.") || !this.isEditable) return;
    const n = String(((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.combatAction) ?? "").trim();
    if (n)
      try {
        const d = this.getPersistentActor() ?? this.actor, m = await C(this, _, Wc).call(this, n);
        if (!m) return;
        const f = await z.executeAction(d, {
          token: ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? z.getCurrentSceneTokenDocument(d) ?? z.getCurrentSceneTokenDocument(this.actor),
          actionId: n,
          metadata: m
        });
        if (!(f != null && f.ok)) {
          (c = ui.notifications) == null || c.warn((f == null ? void 0 : f.reason) ?? "Unable to perform action.");
          return;
        }
        C(this, _, Nt).call(this, { rerender: !1 }), C(this, _, ke).call(this, { force: !0 });
      } catch (d) {
        console.error("MWD | Failed to perform combat action", d), (u = ui.notifications) == null || u.error("Unable to perform action.");
      }
  }
  async _onCombatReduceBurn(t, i) {
    var n, s, r, o, l;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !C(this, _, Rt).call(this, i, t, "Burn recovery is not available right now.") && this.isEditable)
      try {
        const c = this.getPersistentActor() ?? this.actor, u = await z.reduceBurn(c, {
          token: ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? z.getCurrentSceneTokenDocument(c) ?? z.getCurrentSceneTokenDocument(this.actor)
        });
        if (!(u != null && u.ok)) {
          (o = ui.notifications) == null || o.warn((u == null ? void 0 : u.reason) ?? "Unable to reduce Burn.");
          return;
        }
        C(this, _, Nt).call(this, { rerender: !1 }), C(this, _, ke).call(this, { force: !0 });
      } catch (c) {
        console.error("MWD | Failed to reduce Burn", c), (l = ui.notifications) == null || l.error("Unable to reduce Burn.");
      }
  }
  async _onCombatAssist(t, i) {
    var n, s, r, o, l, c, u;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !C(this, _, Rt).call(this, i, t, "Assist is not available right now.") && this.isEditable)
      try {
        const d = this.getPersistentActor() ?? this.actor, m = ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? z.getCurrentSceneTokenDocument(d) ?? z.getCurrentSceneTokenDocument(this.actor), f = z.getSnapshot(d, { token: m });
        if (!f.hasCombatant) {
          (o = ui.notifications) == null || o.warn("No combatant on the current scene.");
          return;
        }
        if (f.isCurrentTurn) {
          (l = ui.notifications) == null || l.warn("Only outside your activation.");
          return;
        }
        const p = await C(this, _, Kc).call(this, f);
        if (!p) return;
        const h = await z.executeAction(d, {
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
        await C(this, _, Vc).call(this, {
          actor: d,
          token: m,
          target: p,
          costLabel: h.costLabel
        }), C(this, _, Nt).call(this, { rerender: !1 }), C(this, _, ke).call(this, { force: !0 });
      } catch (d) {
        console.error("MWD | Failed to assist", d), (u = ui.notifications) == null || u.error("Unable to assist.");
      }
  }
  async _onCombatEvade(t, i) {
    var n, s, r, o, l;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !C(this, _, Rt).call(this, i, t, "Evade is not available right now.") && this.isEditable)
      try {
        const c = this.getPersistentActor() ?? this.actor, u = ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? z.getCurrentSceneTokenDocument(c) ?? z.getCurrentSceneTokenDocument(this.actor), d = await $h(c, { token: u });
        if (!(d != null && d.ok)) {
          (o = ui.notifications) == null || o.warn((d == null ? void 0 : d.reason) ?? "Unable to activate Evade.");
          return;
        }
        C(this, _, Nt).call(this, { rerender: !1 }), C(this, _, ke).call(this, { force: !0 });
      } catch (c) {
        console.error("MWD | Failed to activate Evade", c), (l = ui.notifications) == null || l.error("Unable to activate Evade.");
      }
  }
  async _onCombatInterrupt(t, i) {
    var n, s, r, o, l, c, u, d;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !C(this, _, Rt).call(this, i, t, "Interrupt is not available right now.") && this.isEditable)
      try {
        const m = this.getPersistentActor() ?? this.actor, f = ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? z.getCurrentSceneTokenDocument(m) ?? z.getCurrentSceneTokenDocument(this.actor), p = z.getSnapshot(m, { token: f }), h = z.getPreparedInterrupt(p);
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
        if (!await C(this, _, jc).call(this, h)) return;
        const y = await z.executeAction(m, {
          token: f,
          actionId: "interrupt",
          metadata: h
        });
        if (!(y != null && y.ok)) {
          (u = ui.notifications) == null || u.warn((y == null ? void 0 : y.reason) ?? "Unable to interrupt.");
          return;
        }
        await z.clearPreparedInterrupt(m, { token: f }), await C(this, _, Yc).call(this, {
          actor: m,
          token: f,
          preparedInterrupt: h,
          costLabel: y.costLabel
        }), C(this, _, Nt).call(this, { rerender: !1 }), C(this, _, ke).call(this, { force: !0 });
      } catch (m) {
        console.error("MWD | Failed to interrupt", m), (d = ui.notifications) == null || d.error("Unable to interrupt.");
      }
  }
  async _onCombatOverloadCheck(t, i) {
    var r, o, l, c, u, d, m, f, p, h, g;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), C(this, _, Rt).call(this, i, t, "Overload check is not available right now.") || !this.isEditable) return;
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
      if (C(this, _, Nt).call(this, { rerender: !1 }), !b) {
        C(this, _, ke).call(this, !1);
        return;
      }
      C(this, _, ke).call(this, { force: !0 });
    } catch (y) {
      console.error("MWD | Failed to launch overload check", y), (g = ui.notifications) == null || g.error("Unable to launch overload check.");
    }
  }
  async _onCombatAttack(t, i) {
    var m, f, p, h, g, y, b, S, w, M, N, P, L, V, G, W, j, O, x, q, Z, ae, ue;
    if ((m = t == null ? void 0 : t.preventDefault) == null || m.call(t), (f = t == null ? void 0 : t.stopPropagation) == null || f.call(t), C(this, _, Rt).call(this, i, t, "Attack is not available right now.") || !this.isEditable) return;
    const n = this.getPersistentActor() ?? this.actor, s = ((p = this.getSheetTokenDocument) == null ? void 0 : p.call(this)) ?? z.getCurrentSceneTokenDocument(n) ?? z.getCurrentSceneTokenDocument(this.actor), r = String(((h = i == null ? void 0 : i.dataset) == null ? void 0 : h.combatAction) ?? "attack").trim() || "attack", o = String(((g = i == null ? void 0 : i.dataset) == null ? void 0 : g.combatLabel) ?? (r === "opportunity" ? "Opportunity" : "Attack")).trim() || "Attack", l = r === "opportunity", c = z.getSnapshot(n, { token: s }), u = !!((b = (y = c.state) == null ? void 0 : y.actionState) != null && b.aim);
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
      (N = ui.notifications) == null || N.warn("Overloaded actors can only recover Burn.");
      return;
    }
    if (!l) {
      const oe = 3 + Math.floor((Math.max(0, Number(((V = (L = (P = n.system) == null ? void 0 : P.attributes) == null ? void 0 : L.reflexes) == null ? void 0 : V.value) ?? 0)) + Math.max(0, Number(((j = (W = (G = n.system) == null ? void 0 : G.attributes) == null ? void 0 : W.willpower) == null ? void 0 : j.value) ?? 0))) / 2);
      if (Math.max(0, oe - Math.max(0, Number(((O = c.state) == null ? void 0 : O.saSpentThisActivation) ?? 0))) < 2) {
        (x = ui.notifications) == null || x.warn("Activation SA cap reached.");
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
      const oe = await ((ae = (Z = (q = game.mwd) == null ? void 0 : q.roll) == null ? void 0 : Z.execute) == null ? void 0 : ae.call(Z, { actor: n, payload: d, event: t }));
      if (C(this, _, Nt).call(this, { rerender: !1 }), !oe) {
        C(this, _, ke).call(this, !1);
        return;
      }
      u && await z.clearAim(n, { token: s });
      const E = l ? await z.executeAction(n, {
        token: s,
        actionId: "opportunity"
      }) : await z.spendResource(n, {
        token: s,
        resource: "sa",
        cost: 2,
        actionId: "attack",
        actionLabel: "Attack",
        actionCostLabel: "2 SA",
        actionCategory: "complex"
      });
      E != null && E.ok || (ue = ui.notifications) == null || ue.warn((E == null ? void 0 : E.reason) ?? `Unable to spend ${o} action.`), C(this, _, ke).call(this, { force: !0 });
    } catch (oe) {
      console.error(`MWD | Failed to launch ${o}`, oe), vn(oe, `Unable to launch ${o}.`);
    }
  }
  async _onAddSkillSpecialization(t, i) {
    var d, m, f, p;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable || !this.editing) return;
    const n = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.skillKey) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = Ms(s.system ?? {}, n), o = Dn(s.system ?? {}, n), l = Pi(n).filter((h) => !o.includes(h.key));
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
    const u = yn(
      r.concat([c])
    );
    await s.update({
      [`system.skills.${n}.specializations`]: u
    }), C(this, _, ke).call(this, { force: !0 });
  }
  async _onRemoveSkillSpecialization(t, i) {
    var l, c, u, d;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable || !this.editing) return;
    const n = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.skillKey) ?? "").trim(), s = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.specializationKey) ?? "").trim();
    if (!n || !s) return;
    const r = this.getPersistentActor() ?? this.actor, o = yn(
      Ms(r.system ?? {}, n).filter((m) => m !== s)
    );
    await r.update({
      [`system.skills.${n}.specializations`]: o
    }), C(this, _, ke).call(this, { force: !0 });
  }
  async _onCreateLifeModuleItem(t, i) {
    var d, m, f, p, h;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable) return;
    const n = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.moduleType) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = Nr(n);
    if (!r.length) {
      (p = ui.notifications) == null || p.warn(`No ${ea(n)} life modules are configured in game settings.`);
      return;
    }
    const o = await Fo({
      title: `Choose ${ea(n)} Life Module`,
      label: "Life Module",
      confirmLabel: "Create",
      options: r.map((g) => ({
        value: g.id,
        label: g.label
      }))
    });
    if (!o) return;
    const l = pi(o);
    if (!l) {
      (h = ui.notifications) == null || h.warn("That life module catalog entry no longer exists.");
      return;
    }
    const c = yc(l, {}), u = {};
    for (const g of c.filter((y) => y.hasMultipleChoices)) {
      const y = await Fo({
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
      system: Ca({
        moduleType: n,
        catalogId: l.id,
        selectedGrants: u
      })
    }]), C(this, _, ke).call(this, { force: !0 });
  }
  async _onCreateOwnedItem(t, i) {
    var l, c, u;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable) return;
    const n = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.itemType) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = s.items.filter((d) => d.type === n).length, o = n === "personalWeapon" ? "Personal Weapon" : n === "armor" ? "Armor" : n.charAt(0).toUpperCase() + n.slice(1);
    await s.createEmbeddedDocuments("Item", [{
      name: `${o} ${r + 1}`,
      type: n
    }]), C(this, _, ke).call(this, { force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var s, r, o;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = C(this, _, Wi).call(this, i, t);
    (o = n == null ? void 0 : n.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var r, o;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = C(this, _, Wi).call(this, i, t);
    if (!n) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [n.id]), C(this, _, ke).call(this, { force: !0 });
  }
  async _onToggleInventoryAccordion(t, i) {
    var s, r, o, l, c, u, d, m, f, p;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.accordionId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((p = (f = (m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-accordion-id]")) == null ? void 0 : f.dataset) == null ? void 0 : p.accordionId) ?? ""
    ).trim();
    n && (H(this, Ft).has(n) ? H(this, Ft).delete(n) : H(this, Ft).add(n), C(this, _, ke).call(this, !1));
  }
  async _onToggleOwnedItemEquipped(t, i) {
    var r, o, l, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = C(this, _, Wi).call(this, i, t);
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor;
    await ((c = s.setOwnedItemEquipped) == null ? void 0 : c.call(s, n.id, !((l = n.system) != null && l.equipped))), C(this, _, ke).call(this, { force: !0 });
  }
  async _onSetOwnedItemPrimary(t, i) {
    var r, o, l, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = C(this, _, Wi).call(this, i, t);
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor;
    await ((c = s.setOwnedItemPrimary) == null ? void 0 : c.call(s, n.id, !((l = n.system) != null && l.isPrimary))), C(this, _, ke).call(this, { force: !0 });
  }
  async _onAdjustGearQuantity(t, i) {
    var c, u, d, m, f, p, h, g, y, b, S;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const n = C(this, _, Wi).call(this, i, t);
    if (!n || n.canonicalType !== "gear") return;
    const s = Math.trunc(Number(
      ((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.delta) ?? ((p = (f = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, "[data-delta]")) == null ? void 0 : f.dataset) == null ? void 0 : p.delta) ?? ((b = (y = (g = (h = t == null ? void 0 : t.target) == null ? void 0 : h.closest) == null ? void 0 : g.call(h, "[data-delta]")) == null ? void 0 : y.dataset) == null ? void 0 : b.delta) ?? 0
    ) || 0);
    if (!s) return;
    const o = (this.getPersistentActor() ?? this.actor).items.get(n.id) ?? n, l = Math.max(0, Math.trunc(Number(((S = o.system) == null ? void 0 : S.quantity) ?? 1) || 0) + s);
    await o.update({ "system.quantity": l }), C(this, _, ke).call(this, { force: !0 });
  }
  async _onAttackWeapon(t, i) {
    var r, o, l, c, u, d, m, f, p, h, g, y, b;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), C(this, _, Rt).call(this, i, t, "Equip that weapon before attacking.")) return;
    const n = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.roll) ?? ((m = (d = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : d.dataset) == null ? void 0 : m.roll);
    if (!n) return;
    let s;
    try {
      s = JSON.parse(n);
    } catch (S) {
      console.warn("MWD | Invalid attack payload", n, S);
      return;
    }
    try {
      const S = this.getPersistentActor() ?? this.actor, w = ((f = this.getSheetTokenDocument) == null ? void 0 : f.call(this)) ?? z.getCurrentSceneTokenDocument(S) ?? z.getCurrentSceneTokenDocument(this.actor), N = !!((h = (p = z.getSnapshot(S, { token: w }).state) == null ? void 0 : p.actionState) != null && h.aim);
      if (N && (s.aim = { active: !0 }), s.sourceTokenId = (w == null ? void 0 : w.id) ?? null, !await ((b = (y = (g = game.mwd) == null ? void 0 : g.roll) == null ? void 0 : y.execute) == null ? void 0 : b.call(y, { actor: S, payload: s, event: t }))) return;
      N && await z.clearAim(S, { token: w }), C(this, _, ke).call(this, { force: !0 });
    } catch (S) {
      console.error("MWD | Failed to launch weapon attack", S), vn(S, "Unable to attack with that weapon.");
    }
  }
};
bt = new WeakMap(), ci = new WeakMap(), vi = new WeakMap(), Ft = new WeakMap(), _ = new WeakSet(), Fc = function() {
  C(this, _, qs).call(this), H(this, bt) && ($e(this, ci, (t) => {
    var s;
    const i = this._getRootElement();
    if (!i) return;
    const n = t.target;
    if (n instanceof Node && !((s = n.closest) != null && s.call(n, ".mwd-combat-menu"))) {
      if (!i.contains(n)) {
        C(this, _, Nt).call(this);
        return;
      }
      C(this, _, Nt).call(this);
    }
  }), document.addEventListener("click", H(this, ci)));
}, qs = function() {
  H(this, ci) && (document.removeEventListener("click", H(this, ci)), $e(this, ci, null));
}, mn = function() {
  const t = this._getRootElement();
  return t ? t.querySelector(".mwd-scroll-area") ?? t.querySelector(".csb-tab-panels") : null;
}, Uc = function() {
  const t = C(this, _, mn).call(this);
  if (!(t instanceof HTMLElement)) {
    $e(this, vi, null);
    return;
  }
  $e(this, vi, {
    top: t.scrollTop,
    left: t.scrollLeft
  });
}, Hc = function() {
  const t = H(this, vi);
  if (!t) return;
  const i = C(this, _, mn).call(this);
  i instanceof HTMLElement && (i.scrollTop = t.top, i.scrollLeft = t.left, requestAnimationFrame(() => {
    const n = C(this, _, mn).call(this);
    n instanceof HTMLElement && (n.scrollTop = t.top, n.scrollLeft = t.left);
  }), $e(this, vi, null));
}, ke = function(t = !1) {
  C(this, _, Uc).call(this), this.render(t);
}, Nt = function({ rerender: t = !0 } = {}) {
  H(this, bt) && ($e(this, bt, null), t && C(this, _, ke).call(this, !1));
}, Wi = function(t, i) {
  var s, r, o, l, c, u, d, m;
  const n = String(
    ((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.itemId) ?? ((l = (o = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((m = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
  ).trim();
  return n ? this.actor.items.get(n) ?? null : null;
}, Wc = async function(t) {
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
}, jc = async function(t = {}) {
  const i = String((t == null ? void 0 : t.condition) ?? "").trim(), n = String((t == null ? void 0 : t.scope) ?? "").trim(), s = `
    <div class="mwd-quick-select">
      <p><strong>Trigger:</strong> ${et(i || "Unspecified trigger")}</p>
      <p><strong>Scope:</strong> ${et(n || "Unspecified response")}</p>
    </div>`;
  return !!await Dialog.confirm({
    title: "Resolve Interrupt",
    content: s,
    yes: () => !0,
    no: () => !1
  });
}, qc = function(t) {
  return t != null && t.combatants ? typeof t.combatants.values == "function" ? Array.from(t.combatants.values()) : Array.from(t.combatants ?? []) : [];
}, Gc = function(t) {
  var n;
  const i = String(((n = t == null ? void 0 : t.combatant) == null ? void 0 : n.id) ?? "").trim();
  return C(this, _, qc).call(this, t == null ? void 0 : t.combat).filter((s) => s && String(s.id ?? "").trim() !== i).map((s) => {
    var c;
    const r = ((c = s.token) == null ? void 0 : c.document) ?? s.token ?? null, o = s.actor ?? (r == null ? void 0 : r.actor) ?? null, l = String(s.name ?? (r == null ? void 0 : r.name) ?? (o == null ? void 0 : o.name) ?? "Combatant").trim() || "Combatant";
    return {
      combatantId: String(s.id ?? "").trim(),
      actorUuid: (o == null ? void 0 : o.uuid) ?? null,
      tokenUuid: (r == null ? void 0 : r.uuid) ?? null,
      name: l
    };
  }).filter((s) => s.combatantId && s.name).sort((s, r) => s.name.localeCompare(r.name));
}, Kc = async function(t) {
  var r;
  const i = C(this, _, Gc).call(this, t);
  if (!i.length)
    return (r = ui.notifications) == null || r.warn("No other combatants are available to assist."), null;
  const n = `
    <form class="mwd-quick-select">
      <div class="mwd-field">
        <label>Assist</label>
        <select name="combatant">
          ${i.map((o) => `<option value="${et(o.combatantId)}">${et(o.name)}</option>`).join("")}
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
}, Vc = async function({ actor: t, token: i = null, target: n = null, costLabel: s = "" } = {}) {
  const r = String((t == null ? void 0 : t.name) ?? "Ally").trim() || "Ally", o = String((n == null ? void 0 : n.name) ?? "an ally").trim() || "an ally", l = String(s ?? "").trim(), c = `
    <div class="mwd-chat-card mwd-chat-card--assist">
      <h3>Assist</h3>
      <p><strong>${et(r)}</strong> assists <strong>${et(o)}</strong>.</p>
      ${l ? `<p><small>Cost: ${et(l)}</small></p>` : ""}
    </div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: t, token: (i == null ? void 0 : i.object) ?? i }),
    content: c
  });
}, Yc = async function({ actor: t, token: i = null, preparedInterrupt: n = null, costLabel: s = "" } = {}) {
  const r = String((t == null ? void 0 : t.name) ?? "Combatant").trim() || "Combatant", o = String((n == null ? void 0 : n.condition) ?? "").trim(), l = String((n == null ? void 0 : n.scope) ?? "").trim(), c = String(s ?? "").trim(), u = `
    <div class="mwd-chat-card mwd-chat-card--interrupt">
      <h3>Interrupt</h3>
      <p><strong>${et(r)}</strong> resolves a prepared interrupt.</p>
      ${o ? `<p><strong>Trigger:</strong> ${et(o)}</p>` : ""}
      ${l ? `<p><strong>Scope:</strong> ${et(l)}</p>` : ""}
      ${c ? `<p><small>Cost: ${et(c)}</small></p>` : ""}
    </div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: t, token: (i == null ? void 0 : i.object) ?? i }),
    content: u
  });
}, Rt = function(t, i, n = "That action is not available right now.") {
  var o, l, c, u, d;
  const s = ((o = t == null ? void 0 : t.closest) == null ? void 0 : o.call(t, "[data-action-disabled='true']")) ?? ((c = (l = i == null ? void 0 : i.target) == null ? void 0 : l.closest) == null ? void 0 : c.call(l, "[data-action-disabled='true']"));
  if (!s) return !1;
  const r = String(((u = s.dataset) == null ? void 0 : u.actionReason) ?? n).trim() || n;
  return (d = ui.notifications) == null || d.warn(r), !0;
}, ha = function(t, i) {
  return `${String(t ?? "").trim()}:${String(i ?? "").trim()}`;
}, D(he, "PARTS", {
  sheet: {
    get template() {
      return `${J}/v2/actor/character-sheet.hbs`;
    }
  }
}), D(he, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Oi(he, he, "DEFAULT_OPTIONS"), {
  classes: ["character-sheet", T, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
  window: { minWidth: 450, minHeight: 740, resizable: !0 },
  position: { width: 980, height: 900 },
  actions: {
    ...Oi(he, he, "DEFAULT_OPTIONS").actions,
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
let js = he;
class Qc extends ia {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["npc-sheet", T, "actor-sheet-v2"]
    });
  }
}
D(Qc, "PARTS", {
  sheet: {
    get template() {
      return `${J}/actor/npc.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class Jc extends ia {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["vehicle-sheet", T, "actor-sheet-v2"],
      position: { width: 860, height: 820 }
    });
  }
}
D(Jc, "PARTS", {
  sheet: {
    get template() {
      return `${J}/actor/vehicle.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class Xc extends ia {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["battlemech-sheet", T, "actor-sheet-v2"],
      position: { width: 900, height: 820 }
    });
  }
}
D(Xc, "PARTS", {
  sheet: {
    get template() {
      return `${J}/actor/battlemech.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
function Gh() {
  console.log(`${Ae}Registering Actor sheets (V2)`);
  const { Actors: a } = foundry.documents.collections;
  a.registerSheet(T, js, {
    types: ["character"],
    makeDefault: !0,
    label: "Character (V2)"
  }), a.registerSheet(T, Qc, {
    types: ["npc"],
    makeDefault: !0,
    label: "NPC (V2)"
  }), a.registerSheet(T, Jc, {
    types: ["vehicle"],
    makeDefault: !0,
    label: "Vehicle (V2)"
  }), a.registerSheet(T, Xc, {
    types: ["battlemech"],
    makeDefault: !0,
    label: "BattleMech (V2)"
  });
}
const { HandlebarsApplicationMixin: Kh } = foundry.applications.api, { HTMLField: Uo, StringField: Vh } = foundry.data.fields, Ho = /* @__PURE__ */ new Set(["system.notes", "system.description"]);
function ls(a, e) {
  const t = new a({ required: !1, blank: !0, initial: "" });
  return t.name = e, t;
}
function Yh(a = {}) {
  return {
    ...a,
    sourceReference: a.sourceReference ?? ls(Vh, "system.sourceReference"),
    notes: a.notes ?? ls(Uo, "system.notes"),
    description: a.description ?? ls(Uo, "system.description")
  };
}
var ki, di, Ei, Ht, ga, Gs;
const He = class He extends Kh(foundry.applications.sheets.ItemSheetV2) {
  constructor() {
    super(...arguments);
    Pe(this, Ht);
    Pe(this, ki, /* @__PURE__ */ new Map());
    Pe(this, di, /* @__PURE__ */ new Map());
    Pe(this, Ei, null);
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
        editImage: He._onEditImage,
        tab: He.prototype._onClickTab,
        accordion: He.prototype._onClickAccordion,
        checkbarElement: He._onClickCheckbar,
        modifierAdd: He._onModifierAdd,
        modifierDelete: He._onModifierDelete,
        modifierValueChange: He._onModifierValueChange,
        modifierConditionChange: He._onModifierConditionChange,
        modifierSelectionChange: He._onModifierSelectionChange,
        effectCreate: He._onEffectCreate,
        effectEdit: He._onEffectEdit,
        effectDelete: He._onEffectDelete,
        effectToggleDisabled: He._onEffectToggleDisabled
      },
      form: {
        submitOnChange: !0,
        closeOnSubmit: !1
        // NOTE: No custom handler - AppV2 handles form submission automatically
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
      return {
        [A.itemType.mechWeapon]: `${J}/v2/item/mech-weapon-root.hbs`,
        [A.itemType.armor]: `${J}/v2/item/armor.hbs`
      }[n] ?? `${J}/v2/item/${n}.hbs`;
    }
    return ((i = super._getPartTemplate) == null ? void 0 : i.call(this, t)) ?? "";
  }
  /**
   * Override title to show localized item type and name.
   * @override
   */
  get title() {
    const t = this._getCanonicalItemType();
    return `${Ce.itemType.singular[t] ?? t}: ${this.item.name}`;
  }
  /**
   * Prepare context data for rendering.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The context object
   * @override
   */
  async _prepareContext(t) {
    var P, L, V, G, W, j, O, x, q;
    const i = await super._prepareContext(t), n = ((L = (P = game.system.mwd.modifiers) == null ? void 0 : P.getEnums) == null ? void 0 : L.call(P)) ?? {}, s = foundry.utils.deepClone((i == null ? void 0 : i.options) ?? {}), r = Yh((i == null ? void 0 : i.fields) ?? ((G = (V = this.item.system) == null ? void 0 : V.schema) == null ? void 0 : G.fields) ?? {}), o = ((j = (W = this.item.actor) == null ? void 0 : W.getAttributes) == null ? void 0 : j.call(W, this.item)) ?? [], l = this._getCanonicalItemType(), c = !this.item.actor, u = !!this.item.actor, d = Ce.itemType.singular[l] ?? l, m = this._getEffectEntries(), f = m.filter((Z) => Z.syncedCount > 0).length, p = this.constructor.LAYOUT_ID, h = this.item.actor ? (Z) => o.includes(Z) : (Z) => !0, g = l === A.itemType.skill, b = ["mwd", "item-sheet", this.isEditable ? "editable" : "locked"], S = b.join(" ");
    s.classes = b, s.cssClass = S;
    const w = async (Z, { secrets: ae = this.item.isOwner } = {}) => foundry.applications.ux.TextEditor.implementation.enrichHTML(Z ?? "", {
      async: !0,
      secrets: ae,
      relativeTo: this.item
    }), M = foundry.utils.expandObject({
      "system.notes": await w(this.item.system.notes ?? ""),
      "system.description": await w(this.item.system.description ?? "")
    }), N = {
      ...i,
      // Item data
      item: this.item,
      data: this.item,
      system: this.item.system,
      // Form field metadata and enriched content for App V2 rich text helpers
      fields: r,
      enriched: M,
      enrichedDescription: ((O = M == null ? void 0 : M.system) == null ? void 0 : O.description) ?? "",
      // Options for templates
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
      // Configuration data
      ENUMS: {
        ...Se.getEnums(h, g),
        ...n
      },
      MWD: Ce,
      itemSheet: {
        canonicalType: l,
        typeLabel: d,
        isArmorSheet: l === A.itemType.armor,
        isStandalone: c,
        canUseActorControls: u,
        supportsEffectSync: !!((q = (x = this.item).supportsEquippedEffectSync) != null && q.call(x)),
        effectEntries: m,
        effectCount: m.length,
        syncedEffectCount: f,
        summaryChips: this._getSummaryChips(),
        stateChips: this._getStateChips(m)
      },
      // CSS class for form element
      cssClass: S,
      // Tab configuration
      tabs: this._getTabs()
    };
    return p && (N.layout = await kn.get(p)), N;
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
    o && (H(this, ki).set(r, o), C(this, Ht, ga).call(this, this._getRootElement(), r, o));
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const n = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!n) return;
    const s = n.dataset.section, r = n.closest(".csb-accordion");
    if (!r || !s) return;
    const o = r.dataset.group || "default", c = (H(this, di).has(o) ? H(this, di).get(o) : r.dataset.default || null) === s ? null : s;
    H(this, di).set(o, c), C(this, Ht, Gs).call(this, r, c);
  }
  _onRender(t, i) {
    var s, r, o, l;
    (s = super._onRender) == null || s.call(this, t, i), (r = this.window) != null && r.title && (this.window.title.textContent = this.title);
    const n = this._getRootElement();
    if (n) {
      for (const c of n.querySelectorAll(".sheet-tabs")) {
        const u = c.dataset.group || "default", d = Array.from(c.querySelectorAll("[data-tab]"));
        if (!d.length) continue;
        for (const h of d)
          h.addEventListener("click", (g) => {
            g.preventDefault(), g.stopPropagation();
            const y = h.dataset.tab;
            y && (H(this, ki).set(u, y), C(this, Ht, ga).call(this, n, u, y));
          });
        const m = H(this, ki).get(u), f = c.dataset.default || ((o = d[0]) == null ? void 0 : o.dataset.tab), p = m || f;
        p && C(this, Ht, ga).call(this, n, u, p);
      }
      for (const c of n.querySelectorAll(".csb-tabs")) {
        const u = c.dataset.group || "default", d = Array.from(c.querySelectorAll(".csb-tab-link[data-tab]"));
        if (!d.length) continue;
        const m = H(this, ki).get(u), f = c.dataset.default || ((l = d[0]) == null ? void 0 : l.dataset.tab), p = m || f;
        p && C(this, Ht, ga).call(this, n, u, p);
      }
      for (const c of n.querySelectorAll(".csb-accordion")) {
        const u = c.dataset.group || "default", d = H(this, di).has(u) ? H(this, di).get(u) : c.dataset.default || null;
        C(this, Ht, Gs).call(this, c, d);
      }
      for (const c of n.querySelectorAll("prose-mirror[name]")) {
        const u = c.getAttribute("name") ?? "";
        Ho.has(u) && c.addEventListener("change", (d) => {
          d.preventDefault(), d.stopPropagation(), this._updateRichTextField(c);
        });
      }
      this._restoreScrollPositions();
    }
  }
  async _updateRichTextField(t) {
    var r;
    const i = String(((r = t == null ? void 0 : t.getAttribute) == null ? void 0 : r.call(t, "name")) ?? (t == null ? void 0 : t.name) ?? "");
    if (!this.isEditable || !Ho.has(i)) return;
    const n = String(t.value ?? ""), s = String(foundry.utils.getProperty(this.item, i) ?? "");
    if (n !== s)
      try {
        await this.item.update({ [i]: n });
      } catch (o) {
        console.warn("MWD | Rich text item update failed:", o);
      }
  }
  _getScrollRestoreSelectors() {
    return [".sheet-body", ".csb-tab-panels"];
  }
  _captureScrollPositions() {
    const t = this._getRootElement();
    if (!t) {
      $e(this, Ei, null);
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
    $e(this, Ei, i.length ? i : null);
  }
  _restoreScrollPositions() {
    const t = H(this, Ei);
    if (!(t != null && t.length)) return;
    const i = () => {
      const n = this._getRootElement();
      if (n)
        for (const s of t) {
          const r = n.querySelectorAll(s.selector).item(s.index);
          r instanceof HTMLElement && (r.scrollTop = s.top, r.scrollLeft = s.left);
        }
    };
    i(), requestAnimationFrame(i), $e(this, Ei, null);
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
ki = new WeakMap(), di = new WeakMap(), Ei = new WeakMap(), Ht = new WeakSet(), ga = function(t, i, n) {
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
}, Gs = function(t, i) {
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
}, D(He, "LAYOUT_ID", null), /** @override */
D(He, "PARTS", {
  sheet: {
    template: "",
    // Set dynamically in _getPartTemplate
    scrollable: [".sheet-body"]
  }
}), D(He, "TABS", {
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
let qt = He;
class Ks extends qt {
}
D(Ks, "LAYOUT_ID", "contact"), D(Ks, "PARTS", {
  sheet: {
    template: `${J}/v2/item/contact.hbs`,
    scrollable: [".sheet-body"]
  }
});
const Wo = Object.freeze([
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
]);
class Vs extends qt {
  async _prepareContext(e) {
    var n;
    const t = await super._prepareContext(e), i = this.item.system ?? {};
    return t.system = {
      ...i,
      quantity: Math.max(0, Math.trunc(Number(i.quantity ?? 1) || 0)),
      rating: Math.max(0, Math.trunc(Number(i.rating ?? 0) || 0)),
      category: String(i.category ?? "").trim(),
      tags: Array.isArray(i.tags) ? i.tags.map((s) => String(s ?? "").trim()).filter(Boolean) : []
    }, t.gearEditor = {
      categories: Wo.map((s) => ({ ...s }))
    }, t.tagsText = t.system.tags.join(", "), t.itemSheet = {
      ...t.itemSheet ?? {},
      summaryChips: [
        { label: "Qty", value: String(t.system.quantity) },
        { label: "Rating", value: String(t.system.rating) },
        {
          label: "Category",
          value: ((n = Wo.find((s) => s.value === t.system.category)) == null ? void 0 : n.label) ?? "Uncategorized"
        }
      ]
    }, t;
  }
}
D(Vs, "LAYOUT_ID", "gear"), D(Vs, "PARTS", {
  sheet: {
    template: `${J}/v2/item/gear.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Ys extends qt {
  async _prepareContext(e) {
    var r, o;
    const t = await super._prepareContext(e), i = _t(this.item.system ?? {}), n = Vl(), s = Array.isArray((r = t.ENUMS) == null ? void 0 : r.skills) ? t.ENUMS.skills.map((l) => ({
      value: String((l == null ? void 0 : l.value) ?? "").trim(),
      label: String((l == null ? void 0 : l.label) ?? (l == null ? void 0 : l.value) ?? "").trim()
    })).filter((l) => l.value) : [];
    return t.system = {
      ...i,
      effects: (Array.isArray(i.effects) ? i.effects : []).map((l) => ({
        ...l,
        showSkillPicker: Kl(l) || Array.isArray(l.skillKeys) && l.skillKeys.length > 0,
        isEdgeEvent: l.type === "edgeEvent"
      }))
    }, t.traitEditor = {
      ...n,
      skills: s
    }, t.itemSheet = {
      ...t.itemSheet ?? {},
      sheetClass: "mwd-item-sheet--quality",
      summaryChips: [
        { label: "Category", value: en(i.category) },
        { label: "Tier", value: tn(i.tier) },
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
D(Ys, "LAYOUT_ID", "quality"), D(Ys, "PARTS", {
  sheet: {
    template: `${J}/v2/item/quality.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Qs extends qt {
}
D(Qs, "LAYOUT_ID", "asset-module"), D(Qs, "PARTS", {
  sheet: {
    template: `${J}/v2/item/assetModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Js extends qt {
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
    const e = Ca(this.item.system ?? {}), t = pi(e.catalogId), n = Fn(t, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }).map((r) => r.choice).filter(Boolean).map((r) => Ma(r, { includeBonusText: !0 })).join(", "), s = this.item.actor ? hi(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return [
      { label: "Slot", value: ea(e.moduleType) },
      { label: "Module", value: (t == null ? void 0 : t.label) ?? "Unlinked" },
      { label: "Bonuses", value: n || "Pending choice" },
      s ? { label: "Status", value: s.isActive ? "Active" : "Inactive" } : null
    ].filter(Boolean);
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), i = Ca(this.item.system ?? {}), n = i.moduleType, s = pi(i.catalogId), r = n ? Nr(n) : [], o = yc(s, i.selectedGrants, { legacySelectedSkill: i.selectedSkill }), l = this.item.actor ? hi(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return t.lifeModuleEditor = {
      moduleType: n,
      moduleTypeLabel: ea(n),
      moduleTypes: mc().map((c) => ({
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
        return ((u = pi(c)) == null ? void 0 : u.label) ?? c;
      }),
      excludesAnyLabels: ((s == null ? void 0 : s.excludesAny) ?? []).map((c) => {
        var u;
        return ((u = pi(c)) == null ? void 0 : u.label) ?? c;
      }),
      actorState: l,
      warningLabels: [...(l == null ? void 0 : l.warningLabels) ?? []],
      isOwned: !!this.item.actor,
      statusLabel: l ? l.isActive ? "Active" : "Inactive" : s ? "Configured" : "Unlinked",
      statusReason: (l == null ? void 0 : l.inactiveReason) ?? ""
    }, t;
  }
}
D(Js, "LAYOUT_ID", "life-module"), D(Js, "PARTS", {
  sheet: {
    template: `${J}/v2/item/lifeModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Xs extends qt {
}
D(Xs, "LAYOUT_ID", "skill"), D(Xs, "PARTS", {
  sheet: {
    template: `${J}/v2/item/skill.hbs`,
    scrollable: [".sheet-body"]
  }
});
const Qh = Object.freeze([
  "firearms",
  "projectileWeapons",
  "heavyWeapons",
  "meleeCombat"
]), Jh = Object.freeze([
  { value: "energy", label: "Energy" },
  { value: "kinetic", label: "Kinetic" },
  { value: "ballistic", label: "Ballistic" },
  { value: "explosive", label: "Explosive" },
  { value: "plasma", label: "Plasma" },
  { value: "electrical", label: "Electrical" },
  { value: "melee", label: "Melee" },
  { value: "none", label: "None" }
]);
function jo(a, e, t) {
  const i = String(e ?? "").trim();
  return !i || a.some((n) => n.value === i) ? a : a.concat({ value: i, label: t(i) });
}
class Wn extends qt {
  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        weaponSkillChange: Wn._onWeaponSkillChange
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
    var l, c, u, d, m, f;
    const t = await super._prepareContext(e), i = this._getCanonicalItemType();
    t.ENUMS = {
      ...t.ENUMS ?? {},
      defenses: Ne.getDefenses()
    };
    const n = Array.isArray((l = t.ENUMS) == null ? void 0 : l.skills) ? t.ENUMS.skills : [], s = (c = this.item.system) == null ? void 0 : c.skill, r = (u = this.item.system) == null ? void 0 : u.damageType, o = i === "personalWeapon" ? jo(
      n.filter((p) => Qh.includes(p.value)),
      s,
      (p) => {
        var h;
        return ((h = n.find((g) => g.value === p)) == null ? void 0 : h.label) ?? p;
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
      damageTypes: jo(
        i === "personalWeapon" ? [...pn] : [...Jh],
        r,
        (p) => i === "personalWeapon" ? $t(p) : p
      ),
      ranges: At.RANGE_ORDER.map((p) => ({
        value: p,
        label: i === "personalWeapon" ? Tn(p) : p.charAt(0).toUpperCase() + p.slice(1)
      })),
      rangeBandLabels: Object.fromEntries(At.RANGE_ORDER.map((p) => [
        p,
        i === "personalWeapon" ? Tn(p) : p.charAt(0).toUpperCase() + p.slice(1)
      ])),
      weaponCapabilityOptions: Tu,
      payloadCapabilityOptions: vu,
      ammoDamageTypes: [{ value: "", label: "Use Weapon Default" }, ...pn],
      payloadTemplateShapes: ol,
      payloadTemplatePlacements: ll,
      areaEffectKinds: [
        { value: at.discrete, label: "Discrete" },
        { value: at.persistent, label: "Persistent Hazard" }
      ],
      exposureTiers: [
        { value: ee.minor, label: "Minor" },
        { value: ee.major, label: "Major" },
        { value: ee.full, label: "Full" }
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
      ]
    }, t.itemSheet = {
      ...t.itemSheet ?? {},
      isCompactWeaponSheet: !0,
      weaponSheetVariant: i === "mechWeapon" ? "mech" : "personal"
    }, t.itemSheet.stateChips = (t.itemSheet.stateChips ?? []).filter(
      (p) => !["ownership", "equipment", "role"].includes(p.kind)
    ), t.itemSheet.currentPayloadLabel = ((f = t.weaponProfile) == null ? void 0 : f.payloadLabel) ?? "", t;
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
    n != null && n.defense && await this.item.update({ "system.defense": n.defense }, { render: !1 });
  }
}
const Vi = class Vi extends Wn {
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
        attackWeapon: Vi._onAttackWeapon,
        reloadWeaponPayload: Vi._onReloadWeaponPayload
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
      { label: "Type", value: $t(e.damageType) || "Penetrating" },
      { label: "Range", value: String(((r = e.range) == null ? void 0 : r.max) ?? "near").trim() || "Near" }
    ];
    return String(e.category ?? "").trim().toLowerCase() !== "melee" && n.push((o = e == null ? void 0 : e.sourceState) != null && o.isTracked ? { label: "Payload", value: `${(e == null ? void 0 : e.payloadLabel) || "Unloaded"} (${Number(e.sourceState.current ?? 0)}/${Number(e.sourceState.max ?? 0)})` } : { label: "Payload", value: (e == null ? void 0 : e.payloadLabel) || "Unloaded" }), n;
  }
  static async _onAttackWeapon(e) {
    var i, n, s, r, o;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e);
    const t = this.item.actor ?? null;
    if (!(!t || !((r = (s = this.item).isPersonalWeapon) != null && r.call(s))))
      try {
        await game.mwd.roll.execute({
          actor: t,
          payload: {
            intent: "attack",
            weaponId: this.item.id,
            payloadId: ((o = this.item.system) == null ? void 0 : o.selectedPayloadId) ?? "",
            edge: { pool: "physical.grit", allowed: ["pre", "post"] },
            tags: ["combat", "attack"]
          },
          event: e
        });
      } catch (l) {
        console.error("MWD | Failed to launch weapon sheet attack", l), vn(l, "Unable to attack with that weapon.");
      }
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
D(Vi, "LAYOUT_ID", "personal-weapon"), D(Vi, "PARTS", {
  sheet: {
    template: `${J}/v2/item/personal-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
let Zs = Vi;
class er extends Wn {
}
D(er, "LAYOUT_ID", "mech-weapon"), D(er, "PARTS", {
  sheet: {
    template: `${J}/v2/item/mech-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
const Xh = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
};
function qo(a) {
  const e = Number(a ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function Zh({ defenseBonus: a = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(a ?? 0) || 0;
  i !== 0 && t.push(`Defense ${qo(i)}`);
  const n = Wt(e);
  for (const [s, r] of Object.entries(Xh)) {
    const o = Number((n == null ? void 0 : n[s]) ?? 0) || 0;
    o !== 0 && t.push(`${r} ${qo(o)}`);
  }
  return t.join(" | ");
}
class tr extends qt {
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
    var l, c, u, d, m, f, p, h, g, y, b, S, w, M, N, P;
    const t = await super._prepareContext(e), i = this.item, n = i.actor ?? null, s = ((l = n == null ? void 0 : n.getPersonalCombatLoadout) == null ? void 0 : l.call(n)) ?? null, r = ((c = s == null ? void 0 : s.activeArmor) == null ? void 0 : c.id) ?? null, o = ((u = s == null ? void 0 : s.activeArmor) == null ? void 0 : u.id) === i.id ? s.activeArmor : (d = i.getArmorProfile) == null ? void 0 : d.call(i, { actor: n });
    return t.armorState = o, t.isActiveArmor = r === i.id, t.effectiveDurabilityCurrent = Number(
      ((m = o == null ? void 0 : o.durability) == null ? void 0 : m.current) ?? ((p = (f = i.system) == null ? void 0 : f.durability) == null ? void 0 : p.current) ?? ((g = (h = i.system) == null ? void 0 : h.durability) == null ? void 0 : g.max) ?? ((y = i.system) == null ? void 0 : y.rating) ?? 0
    ), t.effectiveArmorRating = Number(
      (o == null ? void 0 : o.currentArmorRating) ?? (o == null ? void 0 : o.ratingCurrent) ?? Math.min(
        Number(((b = i.system) == null ? void 0 : b.rating) ?? 0),
        Number(((w = (S = i.system) == null ? void 0 : S.durability) == null ? void 0 : w.current) ?? ((N = (M = i.system) == null ? void 0 : M.durability) == null ? void 0 : N.max) ?? ((P = i.system) == null ? void 0 : P.rating) ?? 0)
      )
    ), t.effectiveArmorResist = Number(
      (o == null ? void 0 : o.baseMitigation) ?? (o == null ? void 0 : o.baseResistance) ?? 0
    ), t.armorModifierSummary = this._getArmorModifierSummary(o), t.itemSheet = { ...t.itemSheet ?? {} }, t.itemSheet.summaryChips = this._getSummaryChips(o), t.armorEditor = {
      standardTraits: [...qu]
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
    return Zh({
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
D(tr, "LAYOUT_ID", "armor"), D(tr, "PARTS", {
  sheet: {
    template: `${J}/v2/item/armor-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
function eg() {
  console.log(`${Ae}Registering Item sheets (V2)`);
  const { Items: a } = foundry.documents.collections;
  a.registerSheet(T, Ks, { types: ["contact"], makeDefault: !0, label: "Contact (V2)" }), a.registerSheet(T, Vs, { types: ["gear"], makeDefault: !0, label: "Gear (V2)" }), a.registerSheet(T, Ys, { types: ["quality"], makeDefault: !0, label: "Quality (V2)" }), a.registerSheet(T, Qs, { types: ["assetModule"], makeDefault: !0, label: "Asset Module (V2)" }), a.registerSheet(T, Js, { types: ["lifeModule"], makeDefault: !0, label: "Life Module (V2)" }), a.registerSheet(T, Xs, { types: ["skill"], makeDefault: !0, label: "Skill (V2)" }), a.registerSheet(T, Zs, { types: ["personalWeapon", "weapon"], makeDefault: !0, label: "Personal Weapon (V2)" }), a.registerSheet(T, er, { types: ["mechWeapon"], makeDefault: !0, label: "Mech Weapon (V2)" }), a.registerSheet(T, tr, { types: ["armor"], makeDefault: !0, label: "Armor (V2)" });
}
const Go = [
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
  // Sheet wrapper
  `systems/${T}/templates/v2/actor/_sheet-root.hbs`,
  // Placeholders
  `systems/${T}/templates/v2/ui/placeholders/assigned-systems.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/inventory-gear.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/inventory-armor.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/inventory-weapons.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/bio-description.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/bio-traits.hbs`,
  `systems/${T}/templates/v2/ui/placeholders/bio-life-modules.hbs`,
  // V2 item partials
  `systems/${T}/templates/v2/item/_item-sheet-root.hbs`,
  `systems/${T}/templates/v2/item/contact.hbs`,
  `systems/${T}/templates/v2/item/gear.hbs`,
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
  `systems/${T}/templates/v2/actor/character-sheet.hbs`
];
function tg(a) {
  const e = String(a).replaceAll("\\", "/"), t = `systems/${T}/templates/`, i = e.indexOf(t);
  return `mwd.${(i >= 0 ? e.slice(i + t.length) : e).replace(/\.hbs$/i, "").split("/").filter(Boolean).map((o) => o.replace(/^_+/, "")).join(".")}`;
}
function ig() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
async function ag() {
  var e, t;
  const a = ig();
  try {
    const i = {};
    for (const s of Go)
      i[tg(s)] = s, i[s] = s;
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
    console.log(`${Ae}preloadTemplatesV2 OK`, { loaded: Go.length });
  } catch (i) {
    throw console.error(`${Ae}preloadTemplatesV2 FAILED`, i), i;
  }
}
function Ko(a) {
  const e = Math.max(0, Number(a) || 0);
  return -Math.floor(e / 3);
}
function ng(a) {
  const e = Math.max(0, Number(a) || 0);
  return e === 0 ? 0 : Math.ceil(e / 4);
}
function sg(a = {}) {
  const e = a.physical ?? {}, t = a.fatigue ?? {}, i = a.armor ?? {}, n = Number(e.value) || 0, s = Number(t.value) || 0, r = Math.max(Number(i.value) || 0, Number(i.max) || 0);
  return {
    physical: { penalty: Ko(n) },
    fatigue: { penalty: Ko(s) },
    armor: { resistance: ng(r) }
  };
}
const cs = {
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
function rg(a, e, t, i) {
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
function og(a = {}) {
  return Object.entries(Wt(a)).filter(([, e]) => Number(e) > 0).map(([e, t]) => `${e} +${t}`).join(", ");
}
class lg extends Actor {
  /* -------------------------------------------- */
  /* Base & Derived Data                           */
  /* -------------------------------------------- */
  /** @override */
  prepareBaseData() {
    var e, t;
    if (super.prepareBaseData(), this.isCharacterLike()) {
      const i = this.system ?? {};
      if (Md(i), i.speed = Math.max(0, Math.trunc(Number(i.speed ?? 12) || 12)), (e = i.skills) != null && e.skills && typeof i.skills.skills == "object") {
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
    const e = this.getEdgeCap(), t = this.type === "character" ? hi(this).bonusByEdgePool ?? {} : {};
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
    r.length === 1 ? (c = r[0], l = c) : r.length > 1 ? (e.push("Multiple equipped primary weapons found; attack selection requires a chooser."), u = !0) : n.length === 1 ? l = n[0] : n.length > 1 ? u = !0 : l = At.buildDefaultUnarmedProfile(this);
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
    ), n = Math.max(0, Number((e == null ? void 0 : e.rating) ?? 0)), s = Math.min(n, i), r = Wt(e == null ? void 0 : e.mitigationByType), o = mr(s);
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
    const n = this.getEdgePoolRaw(e), s = Math.max(0, Number((n == null ? void 0 : n.rating) ?? 0)), r = Math.max(0, Number((n == null ? void 0 : n.value) ?? 0)), o = Math.max(0, Number(((p = hi(this).bonusByEdgePool) == null ? void 0 : p[e]) ?? 0)), l = s + o, c = Math.min(l, t), u = Math.min(r, c);
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
    const i = this.getEdgeCap(), n = Math.max(0, Number(t ?? 0)), s = Math.max(0, Number(((c = hi(this).bonusByEdgePool) == null ? void 0 : c[e]) ?? 0)), r = Math.min(n + s, i), o = Math.max(0, Number(((u = this.getEdgePoolRaw(e)) == null ? void 0 : u.value) ?? 0)), l = Math.min(o, r);
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
      }, c = St({
        actor: this,
        phase: "onEdgeSpend",
        facts: Cs({ actor: this, packet: l, phase: "onEdgeSpend", runtime: o }),
        packet: l,
        options: { runtime: o, consumeUsage: !0 }
      });
      await ei({ actor: this, mutations: c.mutations, runtime: o }), s = Math.max(0, Number(c.packet.amount ?? n) || 0);
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
      }, l = St({
        actor: this,
        phase: "onEdgeGain",
        facts: Cs({ actor: this, packet: o, phase: "onEdgeGain", runtime: r }),
        packet: o,
        options: { runtime: r, consumeUsage: !0 }
      });
      await ei({ actor: this, mutations: l.mutations, runtime: r }), s = Number(l.packet.amount ?? n) || 0;
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
      const w = Math.max(0, Number(((f = S.system) == null ? void 0 : f.rating) ?? 0) || 0), M = Math.max(0, Number(((h = (p = S.system) == null ? void 0 : p.durability) == null ? void 0 : h.max) ?? 0) || 0), N = M > 0 ? M : w, P = Math.min(Math.max(0, Number(t) || 0), N);
      return this.updateEmbeddedDocuments("Item", [{
        _id: S.id,
        "system.durability.max": N,
        "system.durability.current": P
      }]);
    }
    const n = `system.monitors.${e}`, s = Number(foundry.utils.getProperty(this, `${n}.max`)) || 0, r = Math.max(0, s), o = Math.min(Math.max(0, Number(t) || 0), r), l = { [`${n}.value`]: o }, c = this.type, u = (g = Kn == null ? void 0 : Kn[c]) == null ? void 0 : g[e];
    if (u != null && u.derived)
      for (const [y, b] of Object.entries(u.derived)) {
        const S = cs == null ? void 0 : cs[b.fn];
        if (typeof S != "function") continue;
        const w = rg(this, e, b.source, o);
        l[`${n}.derived.${y}`] = S(w);
      }
    return this.update(l);
  }
  _prepareMonitors() {
    var o, l, c, u, d, m, f, p;
    const e = this.system.monitors ?? {}, t = sg(e);
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
    }, t.resistanceBonusByType = i != null && i.isDestroyed ? {} : (i == null ? void 0 : i.mitigationByType) ?? (i == null ? void 0 : i.typedMitigation) ?? {}, t.derived ?? (t.derived = {}), t.derived.resistance = Number((i == null ? void 0 : i.baseMitigation) ?? (i == null ? void 0 : i.baseResistance) ?? 0), t.effect = i != null && i.isDestroyed ? "Destroyed" : i ? og(i.mitigationByType ?? i.typedMitigation) : "", (u = this.system).derived ?? (u.derived = {}), this.system.derived.personalCombat = {
      defaultWeaponId: ((d = e.defaultWeapon) == null ? void 0 : d.id) ?? null,
      activeArmorId: (i == null ? void 0 : i.id) ?? null,
      warnings: [...e.warnings ?? []]
    };
  }
}
async function cg({ actor: a, payload: e } = {}) {
  var g, y, b, S, w, M;
  if (!a) throw new Error("resolveSkill requires actor");
  const t = String((e == null ? void 0 : e.key) ?? "").trim(), i = Ot(t);
  if (!i) throw new Error(`Unknown skill: ${t}`);
  const n = a.system ?? {}, s = String((e == null ? void 0 : e.attrKey) ?? i.attribute ?? "").trim();
  if (!s) throw new Error(`Skill ${t} missing attribute key`);
  const r = Number(((y = (g = n == null ? void 0 : n.attributes) == null ? void 0 : g[s]) == null ? void 0 : y.value) ?? 0), o = Number(((S = (b = n == null ? void 0 : n.skills) == null ? void 0 : b[t]) == null ? void 0 : S.rating) ?? 0), l = Number(((M = (w = n == null ? void 0 : n.skills) == null ? void 0 : w[t]) == null ? void 0 : M.bonus) ?? 0), c = new Set(Dn(n, t)), u = gr(t, e == null ? void 0 : e.specializationKey), d = u && c.has(u.key) ? u : null, m = d ? fr : 0, f = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : i.domains ?? [], p = Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : Number.isFinite(Number(e == null ? void 0 : e.target)) ? Number(e.target) : 5, h = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1;
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
const ug = /* @__PURE__ */ new Set([
  "grit",
  "chaos",
  "insight",
  "rumor",
  "legend",
  "credibility"
]), dg = {
  grit: "physical",
  chaos: "physical",
  insight: "mental",
  rumor: "mental",
  legend: "social",
  credibility: "social"
};
async function mg({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveEdge requires actor");
  const t = String((e == null ? void 0 : e.pool) ?? "").trim();
  if (!ug.has(t)) throw new Error(`Invalid edge pool: ${t}`);
  const i = a.getEdgePool(t), n = Math.max(0, Number((i == null ? void 0 : i.effectiveValue) ?? 0));
  return {
    intent: "edge",
    title: `Edge — ${t}`,
    subtitle: a.name ?? "Actor",
    domains: [dg[t] ?? "unknown"],
    // drop "edge" tag unless you truly want it
    // ✅ Make it directly rollable by the core roll pipeline
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
async function fg({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Attribute",
    intent: "attribute",
    domainTags: ["general"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function pg({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveCommon requires actor");
  const t = String((e == null ? void 0 : e.id) ?? "").trim();
  if (!t) throw new Error("Common rolls require payload.id");
  const i = br(t);
  if (!i) throw new Error(`Unknown common check: ${t}`);
  const n = Array.isArray(i.formula) ? i.formula : [];
  if (n.length !== 2)
    throw new Error(`Common check ${t} must define exactly two attributes.`);
  const s = n.map((c) => {
    var d, m, f;
    const u = Bd(c);
    if (!u) throw new Error(`Common check ${t} uses unsupported attribute code: ${c}`);
    return {
      code: String(c).trim().toUpperCase(),
      key: u,
      label: zd(c),
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
    formula: Fd(n),
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
const jn = 90;
function Vo(a) {
  const e = canvas.app.view.getBoundingClientRect(), t = new PIXI.Point(
    Number(a.clientX ?? 0) - e.left,
    Number(a.clientY ?? 0) - e.top
  );
  return canvas.stage.worldTransform.applyInverse(t);
}
function qn() {
  var a, e, t;
  return Number(((e = (a = canvas.scene) == null ? void 0 : a.grid) == null ? void 0 : e.distance) ?? ((t = canvas.dimensions) == null ? void 0 : t.distance) ?? 1) || 1;
}
function Pa() {
  var a, e;
  return Number(((a = canvas.grid) == null ? void 0 : a.size) ?? ((e = canvas.dimensions) == null ? void 0 : e.size) ?? 100) || 100;
}
function Yo(a = 0) {
  return (Number(a ?? 0) || 0) * (Pa() / qn());
}
function Zc(a = {}) {
  return Math.max(0, Number((a == null ? void 0 : a.size) ?? 0) || 0) * qn();
}
function hg(a) {
  let e = Number(a ?? 0) || 0;
  for (; e <= -180; ) e += 360;
  for (; e > 180; ) e -= 360;
  return e;
}
function ir(a) {
  return (Number(a ?? 0) || 0) * (180 / Math.PI);
}
function gg(a) {
  return (Number(a ?? 0) || 0) * (Math.PI / 180);
}
function Qo(a, e) {
  const t = Number((e == null ? void 0 : e.x) ?? 0) - Number((a == null ? void 0 : a.x) ?? 0), i = Number((e == null ? void 0 : e.y) ?? 0) - Number((a == null ? void 0 : a.y) ?? 0);
  return t === 0 && i === 0 ? 0 : ir(Math.atan2(i, t));
}
function eu(a) {
  var t, i, n, s;
  return ((i = (t = canvas.tokens) == null ? void 0 : t.controlled) == null ? void 0 : i.find((r) => {
    var o;
    return ((o = r.actor) == null ? void 0 : o.id) === (a == null ? void 0 : a.id);
  })) ?? null ?? ((s = (n = a == null ? void 0 : a.getActiveTokens) == null ? void 0 : n.call(a, !0, !0)) == null ? void 0 : s[0]) ?? null;
}
function Ur(a) {
  var r, o, l, c, u;
  const e = (a == null ? void 0 : a.center) ?? ((r = a == null ? void 0 : a.object) == null ? void 0 : r.center);
  if (e) return { x: Number(e.x ?? 0), y: Number(e.y ?? 0) };
  const t = Number((a == null ? void 0 : a.x) ?? ((o = a == null ? void 0 : a.document) == null ? void 0 : o.x) ?? 0), i = Number((a == null ? void 0 : a.y) ?? ((l = a == null ? void 0 : a.document) == null ? void 0 : l.y) ?? 0), n = Number((a == null ? void 0 : a.w) ?? (a == null ? void 0 : a.width) ?? ((c = a == null ? void 0 : a.document) == null ? void 0 : c.width) ?? 1) * Pa(), s = Number((a == null ? void 0 : a.h) ?? (a == null ? void 0 : a.height) ?? ((u = a == null ? void 0 : a.document) == null ? void 0 : u.height) ?? 1) * Pa();
  return { x: t + n / 2, y: i + s / 2 };
}
function tu(a) {
  var i, n, s, r;
  const e = Number((a == null ? void 0 : a.w) ?? ((i = a == null ? void 0 : a.object) == null ? void 0 : i.w) ?? 0) || Number(((n = a == null ? void 0 : a.document) == null ? void 0 : n.width) ?? 1) * Pa(), t = Number((a == null ? void 0 : a.h) ?? ((s = a == null ? void 0 : a.object) == null ? void 0 : s.h) ?? 0) || Number(((r = a == null ? void 0 : a.document) == null ? void 0 : r.height) ?? 1) * Pa();
  return Math.max(e, t) / 2;
}
function yg(a = {}, e = { x: 0, y: 0 }, t = 0) {
  var n, s;
  const i = {
    user: ((n = game.user) == null ? void 0 : n.id) ?? null,
    x: Number((e == null ? void 0 : e.x) ?? 0) || 0,
    y: Number((e == null ? void 0 : e.y) ?? 0) || 0,
    direction: Number(t ?? 0) || 0,
    distance: Zc(a),
    fillColor: ((s = game.user) == null ? void 0 : s.color) ?? "#ff6400"
  };
  switch (a == null ? void 0 : a.shape) {
    case "blast":
      return { ...i, t: "circle" };
    case "cone":
      return { ...i, t: "cone", angle: jn };
    case "line":
      return { ...i, t: "ray", width: qn() };
    default:
      return i;
  }
}
function bg({ anchor: a, radiusPx: e, tokenCenter: t, tokenRadius: i }) {
  const n = t.x - a.x, s = t.y - a.y;
  return Math.hypot(n, s) <= e + i;
}
function Sg({ anchor: a, distancePx: e, widthPx: t, direction: i, tokenCenter: n, tokenRadius: s }) {
  const r = n.x - a.x, o = n.y - a.y, l = gg(i), c = Math.cos(l), u = Math.sin(l), d = r * c + o * u;
  if (d < -s || d > e + s) return !1;
  const m = a.x + Math.max(0, Math.min(e, d)) * c, f = a.y + Math.max(0, Math.min(e, d)) * u;
  return Math.hypot(n.x - m, n.y - f) <= s + t / 2;
}
function Ag({ anchor: a, distancePx: e, direction: t, angle: i, tokenCenter: n, tokenRadius: s }) {
  const r = n.x - a.x, o = n.y - a.y, l = Math.hypot(r, o);
  if (l > e + s) return !1;
  if (l === 0) return !0;
  const c = ir(Math.atan2(o, r)), u = Math.abs(hg(c - t)), d = Number(i ?? jn) / 2, m = ir(Math.asin(Math.min(1, s / Math.max(l, 1))));
  return u <= d + m;
}
function iu({ template: a, placement: e, token: t }) {
  const i = Ur(t), n = tu(t), s = Yo(e.distance);
  switch (a == null ? void 0 : a.shape) {
    case "blast":
      return bg({
        anchor: e.anchor,
        radiusPx: s,
        tokenCenter: i,
        tokenRadius: n
      });
    case "line":
      return Sg({
        anchor: e.anchor,
        distancePx: s,
        widthPx: Yo(qn()),
        direction: e.direction,
        tokenCenter: i,
        tokenRadius: n
      });
    case "cone":
      return Ag({
        anchor: e.anchor,
        distancePx: s,
        direction: e.direction,
        angle: e.angle ?? jn,
        tokenCenter: i,
        tokenRadius: n
      });
    default:
      return !1;
  }
}
function wg(a = {}) {
  var e, t, i, n, s, r, o, l, c, u, d;
  if (Array.isArray(a.targetMarkers)) {
    for (const m of a.targetMarkers)
      (t = (e = m == null ? void 0 : m.ring) == null ? void 0 : e.destroy) == null || t.call(e, { children: !0 }), (n = (i = m == null ? void 0 : m.label) == null ? void 0 : i.destroy) == null || n.call(i, { children: !0 });
    a.targetMarkers = [];
  }
  a.object && ((o = (r = (s = canvas.templates) == null ? void 0 : s.preview) == null ? void 0 : r.removeChild) == null || o.call(r, a.object), (c = (l = a.object).destroy) == null || c.call(l, { children: !0 })), (d = (u = canvas.templates) == null ? void 0 : u.clearPreviewContainer) == null || d.call(u);
}
async function Tg(a = {}, e = {}, t = { x: 0, y: 0 }, i = 0) {
  var s, r, o, l;
  const n = yg(e, t, i);
  if (!a.object) {
    const c = CONFIG.MeasuredTemplate.documentClass, u = CONFIG.MeasuredTemplate.objectClass, d = new c(n, { parent: canvas.scene }), m = new u(d);
    a.object = m, await m.draw(), canvas.templates.preview.addChild(m);
    return;
  }
  a.object.document.updateSource(n), (r = (s = a.object.renderFlags) == null ? void 0 : s.set) == null || r.call(s, { refreshState: !0, refreshShape: !0, refreshGrid: !0 }), (l = (o = a.object).refresh) == null || l.call(o);
}
function Jo({ template: a, anchor: e, direction: t }) {
  return {
    shape: a.shape,
    placement: a.placement,
    size: Number(a.size ?? 0) || 0,
    distance: Zc(a),
    angle: a.shape === "cone" ? jn : void 0,
    anchor: {
      x: Number((e == null ? void 0 : e.x) ?? 0) || 0,
      y: Number((e == null ? void 0 : e.y) ?? 0) || 0
    },
    direction: Number(t ?? 0) || 0
  };
}
function vg(a = ee.none) {
  return a === ee.full ? 14042437 : a === ee.major ? 15174447 : a === ee.minor ? 15782993 : 10134706;
}
function kg(a = {}, e = []) {
  var t, i, n, s, r;
  if ((t = canvas == null ? void 0 : canvas.templates) != null && t.preview) {
    if (Array.isArray(a.targetMarkers))
      for (const o of a.targetMarkers)
        (n = (i = o == null ? void 0 : o.ring) == null ? void 0 : i.destroy) == null || n.call(i, { children: !0 }), (r = (s = o == null ? void 0 : o.label) == null ? void 0 : s.destroy) == null || r.call(s, { children: !0 });
    a.targetMarkers = [];
    for (const o of e) {
      const l = Ur(o.token), c = Math.max(20, tu(o.token) + 12), u = vg(o.exposureTier), d = new PIXI.Graphics();
      d.lineStyle(4, u, 0.95), d.beginFill(u, 0.14), d.drawCircle(l.x, l.y, c), d.endFill();
      const m = new PIXI.Text(wt(o.exposureTier), {
        fontFamily: "MWD UI",
        fontSize: 18,
        fontWeight: "700",
        fill: u,
        stroke: 1118481,
        strokeThickness: 4,
        align: "center"
      });
      m.anchor.set(0.5, 1), m.position.set(l.x, l.y - c - 6), canvas.templates.preview.addChild(d), canvas.templates.preview.addChild(m), a.targetMarkers.push({ ring: d, label: m });
    }
  }
}
function au(a, e = {}) {
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
    exposure: gi({
      tier: ((h = e == null ? void 0 : e.exposure) == null ? void 0 : h.initialTier) ?? ((g = e == null ? void 0 : e.exposure) == null ? void 0 : g.tier) ?? (e == null ? void 0 : e.exposureTier) ?? ee.none,
      appliedTier: ((y = e == null ? void 0 : e.exposure) == null ? void 0 : y.finalTier) ?? ((b = e == null ? void 0 : e.exposure) == null ? void 0 : b.appliedTier) ?? (e == null ? void 0 : e.exposureTier) ?? ee.none,
      evadeUsed: !!((S = e == null ? void 0 : e.exposure) != null && S.evadeUsed),
      evadeLocked: !!((w = e == null ? void 0 : e.exposure) != null && w.evadeLocked)
    }),
    areaEffect: e != null && e.areaEffect ? foundry.utils.deepClone(e.areaEffect) : null
  };
}
function Eg({ template: a, placement: e, attacker: t } = {}) {
  var s;
  const i = eu(t), n = (i == null ? void 0 : i.id) ?? null;
  return (((s = canvas.tokens) == null ? void 0 : s.placeables) ?? []).filter((r) => r == null ? void 0 : r.actor).filter((r) => r.id !== n || (a == null ? void 0 : a.placement) === "origin").filter((r) => iu({ template: a, placement: e, token: r })).map((r) => {
    const o = pl({ template: a, placement: e, token: r });
    return au(r, {
      exposureTier: o,
      areaEffect: {
        templateShape: (a == null ? void 0 : a.shape) ?? "",
        templatePlacement: (a == null ? void 0 : a.placement) ?? ""
      }
    });
  }).filter(Boolean);
}
async function Mg({ actor: a, attack: e } = {}) {
  var p;
  if (!(canvas != null && canvas.scene) || !((p = canvas == null ? void 0 : canvas.templates) != null && p.preview))
    throw ji("Templated attacks require an active scene canvas.", { severity: "warn" });
  const t = (e == null ? void 0 : e.template) ?? null;
  if (!(t != null && t.shape) || !(Number(t == null ? void 0 : t.size) > 0))
    throw ji("Templated attack is missing valid template configuration.", { severity: "warn" });
  if (!ku.includes(t.shape))
    throw ji(`Template shape "${t.shape}" is normalized but not supported in v1.`, { severity: "warn" });
  const i = eu(a);
  if (t.placement === "origin" && !i)
    throw ji("Origin-placed templated attacks require the attacker to have a token on the current scene.", { severity: "warn" });
  const n = {}, s = {
    phase: t.placement === "origin" ? "direction" : "anchor",
    anchor: t.placement === "origin" ? Ur(i) : null,
    direction: 0
  }, r = async (h, g = null, y = null) => {
    if (window.removeEventListener("keydown", m, !0), canvas.app.view.removeEventListener("pointermove", u), canvas.app.view.removeEventListener("click", f, !0), canvas.app.view.removeEventListener("contextmenu", d, !0), wg(n), y) {
      h(Promise.reject(y));
      return;
    }
    h(g);
  }, o = async (h = null) => {
    var b;
    if (!s.anchor && h && (s.anchor = { x: h.x, y: h.y }), !s.anchor) return;
    t.shape !== "blast" && h && (s.direction = Qo(s.anchor, h)), await Tg(n, t, s.anchor, s.direction);
    const g = Jo({
      template: t,
      anchor: s.anchor,
      direction: s.direction
    }), y = (((b = canvas.tokens) == null ? void 0 : b.placeables) ?? []).filter((S) => S == null ? void 0 : S.actor).filter((S) => iu({ template: t, placement: g, token: S })).map((S) => ({
      token: S,
      exposureTier: pl({ template: t, placement: g, token: S })
    }));
    kg(n, y);
  };
  let l = null;
  const c = new Promise((h) => {
    l = h;
  }), u = (h) => {
    const g = Vo(h);
    o(g);
  }, d = (h) => {
    h.preventDefault(), r(l, null);
  }, m = (h) => {
    h.key === "Escape" && (h.preventDefault(), r(l, null));
  }, f = (h) => {
    h.preventDefault(), h.stopPropagation();
    const g = Vo(h);
    if (s.anchor || (s.anchor = { x: g.x, y: g.y }), s.phase === "anchor" && t.shape !== "blast") {
      s.phase = "direction", o(g);
      return;
    }
    t.shape !== "blast" && (s.direction = Qo(s.anchor, g));
    const y = Jo({
      template: t,
      anchor: s.anchor,
      direction: s.direction
    }), b = Eg({ template: t, placement: y, attacker: a });
    r(l, { placement: y, targetSnapshots: b });
  };
  return window.addEventListener("keydown", m, !0), canvas.app.view.addEventListener("pointermove", u), canvas.app.view.addEventListener("click", f, !0), canvas.app.view.addEventListener("contextmenu", d, !0), s.anchor && await o(s.anchor), c;
}
function Cg(a = {}) {
  var e;
  return Array.isArray(a == null ? void 0 : a.targetSnapshots) ? a.targetSnapshots : Array.from(((e = game.user) == null ? void 0 : e.targets) ?? []).map(au).filter(Boolean);
}
function Pg(a, e = {}) {
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
function Ng(a = {}) {
  var t, i, n, s, r;
  const e = String((a == null ? void 0 : a.tokenId) ?? "").trim();
  return e ? ((i = (t = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : t.get) == null ? void 0 : i.call(t, e)) ?? ((r = (s = (n = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : n.placeables) == null ? void 0 : s.find) == null ? void 0 : r.call(s, (o) => (o == null ? void 0 : o.id) === e)) ?? null : null;
}
function Rg(a, e) {
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
function Ig({ actor: a, payload: e, weapon: t, targets: i = [] } = {}) {
  const n = String((e == null ? void 0 : e.rangeBand) ?? "").trim().toLowerCase();
  if (!(((t == null ? void 0 : t.type) === "personalWeapon" || (t == null ? void 0 : t.isSynthetic)) && i.length === 1))
    return n || String((t == null ? void 0 : t.defaultRangeBand) ?? "close").trim() || "close";
  const r = Pg(a, e), o = Ng(i[0]), l = Rg(r, o), c = Rm(l, (t == null ? void 0 : t.range) ?? {}, (t == null ? void 0 : t.defaultRangeBand) ?? "close");
  return c === "outOfRange" ? c : n || ((t == null ? void 0 : t.type) !== "personalWeapon" && !(t != null && t.isSynthetic) || i.length !== 1 ? String((t == null ? void 0 : t.defaultRangeBand) ?? "close").trim() || "close" : c);
}
function Dg(a, e) {
  var i, n, s, r, o, l, c;
  if (((i = e == null ? void 0 : e.syntheticWeapon) == null ? void 0 : i.id) === "unarmed") {
    const u = At.buildDefaultUnarmedProfile(a);
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
  if (!t || !(((o = t.isPersonalWeapon) == null ? void 0 : o.call(t)) ?? t.type === "personalWeapon") || !((l = t.system) != null && l.equipped))
    throw new Error("Attack requires an equipped personal weapon.");
  return ((c = t.getCombatProfile) == null ? void 0 : c.call(t, { payloadId: e == null ? void 0 : e.payloadId })) ?? null;
}
async function _g({ actor: a, payload: e } = {}) {
  var N, P, L, V, G, W, j, O, x, q, Z, ae, ue, oe, E, U, ne, te;
  if (!a) throw new Error("resolveAttack requires actor");
  const t = Dg(a, e);
  if (!t) throw new Error("Unable to resolve weapon profile.");
  if (Array.isArray((N = t == null ? void 0 : t.capabilityReport) == null ? void 0 : N.errors) && t.capabilityReport.errors.length > 0)
    throw ji(
      ((P = t.capabilityReport.errors[0]) == null ? void 0 : P.message) ?? "Weapon capability data is invalid for this attack.",
      { severity: "warn" }
    );
  const i = Ot(t.skill) ?? {
    code: t.skill,
    label: t.skill || "Attack",
    attribute: "reflexes",
    domains: ["physical"]
  }, n = String(i.attribute ?? "reflexes").trim() || "reflexes", s = ((L = a.getAttributeValue) == null ? void 0 : L.call(a, n)) ?? Number(((W = (G = (V = a.system) == null ? void 0 : V.attributes) == null ? void 0 : G[n]) == null ? void 0 : W.value) ?? 0), r = ((j = a.getSkillRating) == null ? void 0 : j.call(a, t.skill)) ?? Number(((q = (x = (O = a.system) == null ? void 0 : O.skills) == null ? void 0 : x[t.skill]) == null ? void 0 : q.rating) ?? 0), o = Number(((ue = (ae = (Z = a.system) == null ? void 0 : Z.skills) == null ? void 0 : ae[t.skill]) == null ? void 0 : ue.bonus) ?? 0), l = new Set(Dn(a.system ?? {}, t.skill)), c = gr(t.skill, e == null ? void 0 : e.specializationKey), u = c && l.has(c.key) ? c : null, d = u ? fr : 0, m = Number(((oe = t == null ? void 0 : t.effects) == null ? void 0 : oe.accuracyMod) ?? 0) || 0, f = o + m, p = Cg(e), h = Ig({ actor: a, payload: e, weapon: t, targets: p }), g = (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? Ln(h) : h, y = Number(((E = t == null ? void 0 : t.attackRatingBand) == null ? void 0 : E[h]) ?? 0) || 0, b = !!((U = t == null ? void 0 : t.capabilityReport) != null && U.isTemplated), S = (ne = e == null ? void 0 : e.aim) != null && ne.active ? {
    active: !0,
    eligible: !b && p.length === 1,
    ineligibleReason: b ? "Aim cannot apply to template attacks." : p.length !== 1 ? "Aim cannot apply to multi-target attacks." : "",
    skillCode: t.skill,
    skillLabel: i.label ?? t.skill ?? "Attack Skill"
  } : null;
  if (!b && p.length === 0)
    throw ji("Target at least one token to attack.", { severity: "warn" });
  const w = Number(t.ap ?? 0) + Number(((te = t == null ? void 0 : t.effects) == null ? void 0 : te.ap) ?? 0), M = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? Nm(h, 1) : 1;
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
async function Og({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Defense",
    intent: "defense",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function Lg({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Resistance",
    intent: "resistance",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function xg({ actor: a } = {}) {
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
async function $g({ actor: a }) {
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
const Bg = {
  skill: cg,
  edge: mg,
  attribute: fg,
  common: pg,
  attack: _g,
  defense: Og,
  resistance: Lg,
  initiative: xg,
  overload: $g
};
async function us({ actor: a, payload: e, event: t } = {}) {
  if (!a) throw new Error("resolveIntent requires actor");
  const i = String((e == null ? void 0 : e.intent) ?? "").trim();
  if (!i) throw new Error("resolveIntent requires payload.intent");
  const n = Bg[i];
  if (!n) throw new Error(`Unsupported roll intent: ${i}`);
  const s = await n({ actor: a, payload: e, event: t });
  return zg(s, { intent: i });
}
function zg(a, { intent: e } = {}) {
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
var Qi;
class Fg {
  constructor() {
    Pe(this, Qi, /* @__PURE__ */ new Map());
  }
  register(e) {
    if (!(e != null && e.id) || typeof e.collect != "function")
      throw new Error("Invalid ModifierProvider: missing id or collect()");
    H(this, Qi).has(e.id) || H(this, Qi).set(e.id, e);
  }
  async collectAll(e) {
    const t = [];
    for (const i of H(this, Qi).values()) {
      const n = await i.collect(e);
      if (console.log("MWD | provider", i.id, "returned", n), !!(n != null && n.length))
        for (const s of n)
          s && typeof s.label == "string" && typeof s.value == "number" && typeof s.source == "string" ? t.push(s) : console.warn("MWD | DROPPED MOD (bad shape)", i.id, s);
    }
    return t;
  }
}
Qi = new WeakMap();
const Vt = new Fg();
function Ug(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function Hg(a) {
  const e = Ug(a == null ? void 0 : a.value);
  return e === null ? null : { ...a, value: e };
}
async function Xo({
  actor: a,
  rollType: e,
  skillId: t,
  domains: i,
  // NEW (optional)
  payload: n,
  resolved: s,
  context: r
} = {}) {
  const o = { actor: a, rollType: e, skillId: t, domains: i, payload: n, resolved: s, context: r }, l = await Vt.collectAll(o);
  console.log("MWD|condition collect called", o.rollType);
  let c = [];
  for (const d of l ?? []) {
    const m = Hg(d);
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
function Wg({
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
  var V, G, W, j;
  if (!a) throw new Error("buildResolved requires actor");
  if (!(e != null && e.intent)) throw new Error("buildResolved requires payload.intent");
  if (!i) throw new Error("buildResolved requires roll");
  const m = foundry.utils.randomID(), f = (V = i.dice) == null ? void 0 : V[0], h = (Array.isArray(f == null ? void 0 : f.results) ? f.results : []).map((O, x) => {
    const q = `pool:${x}`, Z = Number(O.result), ae = !!O.success;
    return {
      ref: q,
      face: Z,
      isSuccess: ae,
      isFailure: !ae,
      tooltip: ae ? `Die ${x + 1}: ${Z} (Success vs TN ${Number(n ?? 5)})` : `Die ${x + 1}: ${Z} (Failure vs TN ${Number(n ?? 5)})`
    };
  }), g = h.filter((O) => O.isFailure).map((O) => O.ref), y = [{
    id: "pool",
    label: "Pool",
    faces: 6,
    termIndex: 0,
    // informational only
    dice: h
  }], b = (Array.isArray(r) ? r : []).map((O, x) => {
    const q = Number(O.value ?? 0), Z = `mod:${qg(O.label ?? "mod")}:${x}`;
    return {
      id: O.id ?? Z,
      label: O.label ?? "Modifier",
      value: q,
      domain: O.domain ?? null,
      source: O.source ?? null,
      tooltip: O.tooltip ?? `${O.label ?? "Modifier"} ${Zo(q)}`
    };
  }), S = b.map((O) => O.id), M = (Array.isArray(t == null ? void 0 : t.breakdown) ? t.breakdown : []).map((O) => ({
    id: `pool.${O.id ?? foundry.utils.randomID()}`,
    label: O.label ?? O.id ?? "Row",
    value: Number(O.value ?? 0),
    tooltip: `Contribution from ${O.label ?? O.id}: ${Number(O.value ?? 0)}`
  }));
  M.push({
    id: "mods.total",
    label: "Mods",
    value: Number(o ?? 0),
    modIds: S,
    tooltip: b.length ? b.map((O) => `${O.label}: ${Zo(O.value)}`).join(`
`) : "No roll-time modifiers."
  }), M.push({
    id: "pool.final",
    label: "Final Pool",
    value: Number(s ?? 0),
    tooltip: `Final dice pool rolled: ${Number(s ?? 0)}d6`
  });
  const N = Number.isFinite(Number(l)) ? Number(l) : h.filter((O) => O.isSuccess).length, P = Number.isFinite(Number(c)) ? Number(c) : h.filter((O) => O.face === 1).length, L = jg(u, { payload: e });
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
    dn: (t == null ? void 0 : t.dn) ?? (((G = t == null ? void 0 : t.difficulty) == null ? void 0 : G.dn) !== void 0 ? {
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
      total: Number(o ?? 0)
    },
    areaEffectPreviewState: foundry.utils.deepClone((e == null ? void 0 : e.areaEffectPreviewState) ?? {}),
    // Edge snapshot / affordances
    edge: L
  };
}
function jg(a, { payload: e } = {}) {
  var p, h, g, y, b, S, w, M, N, P, L, V, G, W;
  const t = !!((p = e == null ? void 0 : e.edge) != null && p.enabled), i = (a == null ? void 0 : a.domain) ?? null, n = (a == null ? void 0 : a.pools) ?? null, s = ((h = a == null ? void 0 : a.pre) == null ? void 0 : h.poolKey) ?? ((y = (g = e == null ? void 0 : e.edge) == null ? void 0 : g.pre) == null ? void 0 : y.poolKey) ?? (t ? ((b = e == null ? void 0 : e.edge) == null ? void 0 : b.poolKey) ?? null : null), r = Number(((S = a == null ? void 0 : a.pre) == null ? void 0 : S.spent) ?? ((M = (w = e == null ? void 0 : e.edge) == null ? void 0 : w.pre) == null ? void 0 : M.spent) ?? (t ? 1 : 0)) ? 1 : 0, o = ((N = a == null ? void 0 : a.post) == null ? void 0 : N.poolKey) ?? ((L = (P = e == null ? void 0 : e.edge) == null ? void 0 : P.post) == null ? void 0 : L.poolKey) ?? null, l = Number(((V = a == null ? void 0 : a.post) == null ? void 0 : V.spent) ?? ((W = (G = e == null ? void 0 : e.edge) == null ? void 0 : G.post) == null ? void 0 : W.spent) ?? 0) ? 1 : 0, c = (n == null ? void 0 : n.a) ?? null, u = (n == null ? void 0 : n.b) ?? null, d = [c, u].filter(Boolean);
  let m = [c, u].filter(Boolean);
  r && s && (m = m.filter((j) => j !== s));
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
function Zo(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function qg(a) {
  return String(a).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
const { ApplicationV2: Gg, HandlebarsApplicationMixin: Kg } = foundry.applications.api;
function Vg(a, e = -3, t = 3) {
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
function el(a) {
  return (Array.isArray(a) ? a : []).map((t) => ({
    id: (t == null ? void 0 : t.id) ?? foundry.utils.randomID(),
    label: typeof (t == null ? void 0 : t.label) == "string" ? t.label : "Manual",
    value: Number((t == null ? void 0 : t.value) ?? 0)
  }));
}
function ds(a, e) {
  const t = a == null ? void 0 : a.toggles;
  return t && typeof t == "object" && e in t ? !!t[e] : !!(a != null && a[e]);
}
function Yg(a, e) {
  a.useEdge = !!e.useEdge, a.takeRisks = !!e.takeRisks, a.opponentRoll = !!e.opponentRoll, a.toggles = a.toggles && typeof a.toggles == "object" ? a.toggles : {}, a.toggles.useEdge = !!e.useEdge, a.toggles.takeRisks = !!e.takeRisks, a.toggles.opponentRoll = !!e.opponentRoll;
}
function tl(a, e, t) {
  const i = String(t ?? "").trim(), n = i ? vd(e, i) : "";
  if (i && n) {
    a.specializationKey = i, a.specializationLabel = n;
    return;
  }
  delete a.specializationKey, delete a.specializationLabel;
}
function Qg(a) {
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
var ut;
const Le = class Le extends Kg(Gg) {
  constructor({ actor: t, baseContext: i, initialState: n = null, options: s = {} }) {
    var c, u;
    super(s);
    Pe(this, ut, null);
    /** @type {{ baseContext: any, state: any }} */
    D(this, "_mwd", { baseContext: null, state: null });
    this.actor = t, this._mwd.baseContext = i ?? {};
    const r = foundry.utils.deepClone(this._mwd.baseContext.payload ?? {}), o = el(r.manualModifiers);
    this._mwd.state = foundry.utils.mergeObject(
      {
        payload: r,
        manual: o,
        toggles: {
          useEdge: ds(r, "useEdge"),
          takeRisks: ds(r, "takeRisks"),
          opponentRoll: ds(r, "opponentRoll")
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
      $e(this, ut, t), this.render(!0);
    });
  }
  async close(t = {}) {
    if (H(this, ut)) {
      const i = H(this, ut);
      $e(this, ut, null), i(null);
    }
    return super.close(t);
  }
  /* --------------------------- */
  /* Prepare Context             */
  /* --------------------------- */
  async _prepareContext(t) {
    var V, G, W, j, O, x, q, Z, ae, ue, oe, E, U, ne, te, Ee, je, pt, ht, nt, gt, Fe, st, Tt, vt, kt, Et, Mt, Ct, rt, k, R, Y, ge, we, ve, De, Ue, qe, ot, lt;
    const i = this._mwd.baseContext ?? {}, n = this._mwd.state ?? {}, s = Number.isFinite(Number((V = n == null ? void 0 : n.payload) == null ? void 0 : V.dn)) ? Number(n.payload.dn) : Number.isFinite(Number((W = (G = i == null ? void 0 : i.resolved) == null ? void 0 : G.dn) == null ? void 0 : W.total)) ? Number(i.resolved.dn.total) : Number.isFinite(Number(i == null ? void 0 : i.dn)) ? Number(i.dn) : Number.isFinite(Number((O = (j = i == null ? void 0 : i.resolved) == null ? void 0 : j.difficulty) == null ? void 0 : O.dn)) ? Number(i.resolved.difficulty.dn) : 1, r = (i == null ? void 0 : i.intent) ?? "skill";
    let o, l;
    const c = Array.isArray(n.manual) ? n.manual.reduce((Q, ye) => Q + Number((ye == null ? void 0 : ye.value) || 0), 0) : 0;
    if (r === "edge") {
      const Q = (i == null ? void 0 : i.resolved) ?? {}, ye = Array.isArray(Q.breakdown) ? Q.breakdown : [], We = (ct) => {
        var F;
        return Number(((F = ye.find((fe) => fe.id === ct)) == null ? void 0 : F.value) ?? 0);
      }, Ze = Number(((x = Q == null ? void 0 : Q.pool) == null ? void 0 : x.attribute) ?? 0);
      o = {
        pool: Ze,
        rating: We("rating"),
        cap: We("cap"),
        modifiers: Number(((q = i == null ? void 0 : i.dice) == null ? void 0 : q.modifiers) ?? 0)
      }, l = Math.max(0, Ze + o.modifiers + c);
    } else {
      o = {
        attribute: Number(((Z = i == null ? void 0 : i.dice) == null ? void 0 : Z.attribute) ?? 0),
        skill: Number(((ae = i == null ? void 0 : i.dice) == null ? void 0 : ae.skill) ?? 0),
        bonus: Number(((ue = i == null ? void 0 : i.dice) == null ? void 0 : ue.bonus) ?? 0),
        specialization: Number(((oe = i == null ? void 0 : i.dice) == null ? void 0 : oe.specialization) ?? 0),
        modifiers: Number(((E = i == null ? void 0 : i.dice) == null ? void 0 : E.modifiers) ?? 0)
      };
      const Q = o.modifiers + c, ye = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, ye + Q);
    }
    const u = Array.isArray((U = i == null ? void 0 : i.resolved) == null ? void 0 : U.domains) ? i.resolved.domains : [], d = u.includes("physical") ? "physical" : u.includes("mental") ? "mental" : u.includes("social") ? "social" : null, f = (d === "physical" ? ["grit", "chaos"] : d === "mental" ? ["insight", "rumor"] : d === "social" ? ["legend", "credibility"] : []).map((Q) => {
      var ye, We, Ze, ct;
      return {
        key: Q,
        label: Q.charAt(0).toUpperCase() + Q.slice(1),
        available: Number(((Ze = (We = (ye = this.actor) == null ? void 0 : ye.getEdgePool) == null ? void 0 : We.call(ye, Q)) == null ? void 0 : Ze.effectiveValue) ?? 0),
        selected: Q === (((ct = n.edge) == null ? void 0 : ct.prePoolKey) ?? null)
      };
    }), p = f.find((Q) => Q.selected), h = (p == null ? void 0 : p.label) ?? null, g = ((ne = i == null ? void 0 : i.resolved) == null ? void 0 : ne.attack) ?? null, y = String(
      ((te = g == null ? void 0 : g.skill) == null ? void 0 : te.code) ?? ((je = (Ee = i == null ? void 0 : i.resolved) == null ? void 0 : Ee.specialization) == null ? void 0 : je.skillKey) ?? ((ht = (pt = i == null ? void 0 : i.resolved) == null ? void 0 : pt.data) == null ? void 0 : ht.skillKey) ?? ((nt = i == null ? void 0 : i.payload) == null ? void 0 : nt.key) ?? ""
    ).trim(), b = y ? $l(((gt = this.actor) == null ? void 0 : gt.system) ?? {}, y) : [], S = String(((Fe = n == null ? void 0 : n.payload) == null ? void 0 : Fe.specializationKey) ?? "").trim(), w = b.find((Q) => Q.key === S) ?? null;
    if (r !== "edge") {
      o.specialization = w ? Number(((Tt = (st = i == null ? void 0 : i.resolved) == null ? void 0 : st.specialization) == null ? void 0 : Tt.value) ?? 2) : 0;
      const Q = o.modifiers + c, ye = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, ye + Q);
    }
    const M = Array.isArray((vt = g == null ? void 0 : g.payloadState) == null ? void 0 : vt.payloads) ? g.payloadState.payloads : [], N = String(((kt = g == null ? void 0 : g.weapon) == null ? void 0 : kt.category) ?? "").trim().toLowerCase() !== "melee" && M.length > 0, P = String(((Et = n == null ? void 0 : n.payload) == null ? void 0 : Et.payloadId) ?? ((Mt = g == null ? void 0 : g.payloadState) == null ? void 0 : Mt.activePayloadId) ?? "").trim(), L = M.find((Q) => Q.id === P) ?? null;
    return {
      header: {
        left: ((Ct = i == null ? void 0 : i.header) == null ? void 0 : Ct.left) ?? "Roll",
        right: ((rt = i == null ? void 0 : i.header) == null ? void 0 : rt.right) ?? ((k = this.actor) == null ? void 0 : k.name) ?? ""
      },
      formula: String((i == null ? void 0 : i.formula) ?? ((R = i == null ? void 0 : i.resolved) == null ? void 0 : R.formula) ?? "").trim(),
      dice: o,
      modifiers: Array.isArray(i.modifiers) ? i.modifiers : [],
      manual: (n.manual ?? []).map((Q) => ({
        ...Q,
        steps: Vg(Number(Q.value ?? 0), -3, 3)
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
        options: b.map((Q) => ({
          key: Q.key,
          label: Q.label,
          selected: Q.key === S
        })),
        selectedKey: S,
        selectedLabel: (w == null ? void 0 : w.label) ?? ""
      } : null,
      attack: g ? {
        weaponName: ((Y = g == null ? void 0 : g.weapon) == null ? void 0 : Y.name) ?? "Weapon",
        rangeBand: ((ge = g == null ? void 0 : g.weapon) == null ? void 0 : ge.type) === "personalWeapon" || (we = g == null ? void 0 : g.weapon) != null && we.isSynthetic ? Ln((g == null ? void 0 : g.rangeBand) ?? "") : (g == null ? void 0 : g.rangeBand) ?? "",
        damageType: ((ve = L == null ? void 0 : L.modifies) == null ? void 0 : ve.damageType) || ((De = g == null ? void 0 : g.weapon) == null ? void 0 : De.damageTypeLabel) || ((Ue = g == null ? void 0 : g.weapon) == null ? void 0 : Ue.damageType) || "",
        usesPayloads: N,
        source: (g == null ? void 0 : g.sourceState) ?? null,
        payloads: M.map((Q) => {
          var ye;
          return {
            id: Q.id,
            name: Q.label,
            damageType: (ye = Q.modifies) == null ? void 0 : ye.damageType,
            selected: Q.id === P
          };
        }),
        selectedPayloadId: P,
        selectedPayloadLabel: (L == null ? void 0 : L.label) ?? ((qe = g == null ? void 0 : g.payload) == null ? void 0 : qe.label) ?? ((ot = g == null ? void 0 : g.weapon) == null ? void 0 : ot.payloadLabel) ?? "",
        selectedSourceLabel: ((lt = g == null ? void 0 : g.sourceState) == null ? void 0 : lt.label) ?? ""
      } : null
    };
  }
  /* --------------------------- */
  /* Actions                     */
  /* --------------------------- */
  async _onCancel(t) {
    if (t == null || t.preventDefault(), H(this, ut)) {
      const i = H(this, ut);
      $e(this, ut, null), i(null);
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
    }), Yg(i.payload, i.toggles ?? {}), tl(
      i.payload,
      ((n = i.payload) == null ? void 0 : n.intent) === "attack" ? ((s = i.payload) == null ? void 0 : s.skillKey) ?? ((c = (l = (o = (r = this._mwd.baseContext) == null ? void 0 : r.resolved) == null ? void 0 : o.attack) == null ? void 0 : l.skill) == null ? void 0 : c.code) : ((u = i.payload) == null ? void 0 : u.key) ?? ((f = (m = (d = this._mwd.baseContext) == null ? void 0 : d.resolved) == null ? void 0 : m.data) == null ? void 0 : f.skillKey),
      (p = i.payload) == null ? void 0 : p.specializationKey
    ), H(this, ut)) {
      const y = H(this, ut);
      $e(this, ut, null), y({ payload: i.payload });
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
      return tl(this._mwd.state.payload, n, s), this.render(!1);
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
    }, u = s ?? Qg(n), d = {
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
    l.manualModifiers = el(l.manualModifiers);
    const p = await new Le({
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
ut = new WeakMap(), D(Le, "DEFAULT_OPTIONS", foundry.utils.mergeObject(
  Oi(Le, Le, "DEFAULT_OPTIONS"),
  {
    id: "mwd-roll-dialog",
    classes: [
      ...Oi(Le, Le, "DEFAULT_OPTIONS").classes ?? [],
      "mwd",
      "mwd-roll-dialog"
    ],
    window: { title: "Roll", resizable: !1 },
    position: { width: 520, height: "auto" },
    actions: {
      submit: Le.prototype._onSubmit,
      cancel: Le.prototype._onCancel,
      addManual: Le.prototype._onAddManual,
      removeManual: Le.prototype._onRemoveManual,
      setManualValue: Le.prototype._onSetManualValue,
      setManualStepper: Le.prototype._onSetManualStepper,
      setEdgePrePool: Le.prototype._onSetEdgePrePool,
      toggleCheckbox: Le.prototype._onToggleCheckbox,
      setDn: Le.prototype._onSetDn,
      setPayload: Le.prototype._onSetPayload,
      setSpecialization: Le.prototype._onSetSpecialization
    }
  },
  { inplace: !1 }
)), D(Le, "PARTS", {
  body: { template: "systems/mwd/templates/v2/roll/mwd-roll-dialog.hbs" }
});
let ar = Le;
const { ApplicationV2: Jg, HandlebarsApplicationMixin: Xg } = foundry.applications.api, wa = class wa extends Xg(Jg) {
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
      classes: [game.system.anarchy.styles.selectCssClass(), ...wa.DEFAULT_OPTIONS.classes],
      window: { title: e }
    };
    return new wa({ items: t }, i).wait();
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
D(wa, "PARTS", {
  body: {
    template: `${J}/dialog/select-item.hbs`
  }
});
let nr = wa;
const il = { execute: ny }, Zg = {
  physical: ["grit", "chaos"],
  mental: ["insight", "rumor"],
  social: ["legend", "credibility"]
};
function ey(a, e) {
  var s;
  const t = Zg[e] ?? [];
  let i = null, n = -1;
  for (const r of t) {
    const o = (s = a.getEdgePool) == null ? void 0 : s.call(a, r), l = Number((o == null ? void 0 : o.rating) ?? 0), c = Number((o == null ? void 0 : o.value) ?? 0), u = Math.max(0, l - c);
    u > n && (n = u, i = r);
  }
  return i ?? t[0] ?? null;
}
function ty(a) {
  const t = (Array.isArray(a == null ? void 0 : a.manualModifiers) ? a.manualModifiers : []).map((n) => ({
    id: n.id ?? foundry.utils.randomID(),
    label: (n.label ?? "Manual").trim() || "Manual",
    value: Number(n.value ?? 0),
    source: "Manual"
  })).filter((n) => Number.isFinite(n.value) && n.value !== 0), i = t.reduce((n, s) => n + s.value, 0);
  return { mods: t, total: i };
}
function al(a = {}) {
  const e = a.toggles ?? {}, t = String((a == null ? void 0 : a.payloadId) ?? (a == null ? void 0 : a.ammoTypeId) ?? "").trim();
  return {
    ...a,
    ...t ? { payloadId: t } : {},
    toggles: {
      useEdge: !!e.useEdge,
      takeRisks: !!e.takeRisks,
      opponentRoll: !!e.opponentRoll
    },
    manualModifiers: ay(a.manualModifiers)
  };
}
async function iy({ actor: a, payload: e } = {}) {
  var s, r, o, l, c, u, d, m, f, p, h, g;
  if ((e == null ? void 0 : e.intent) !== "attack") return e;
  const t = foundry.utils.deepClone(e ?? {}), i = ((s = a.getPersonalCombatLoadout) == null ? void 0 : s.call(a, { refresh: !0 })) ?? null, n = (y) => {
    var S, w, M, N, P;
    const b = ((w = (S = a.items) == null ? void 0 : S.get) == null ? void 0 : w.call(S, y)) ?? null;
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
      const y = await nr.selectItem(
        "Choose Weapon",
        i.equippedWeapons ?? []
      );
      return y ? (t.weaponId = y.id, t.payloadId = t.payloadId ?? ((o = y == null ? void 0 : y.payloadState) == null ? void 0 : o.activePayloadId) ?? "", delete t.mode, t) : null;
    }
    if ((l = i == null ? void 0 : i.defaultWeapon) != null && l.isSynthetic || ((c = i == null ? void 0 : i.defaultWeapon) == null ? void 0 : c.id) === "unarmed")
      return t.syntheticWeapon = foundry.utils.deepClone(i.defaultWeapon ?? At.buildDefaultUnarmedProfile(a)), t.weaponId = t.syntheticWeapon.id, t.payloadId = t.payloadId ?? ((d = (u = t.syntheticWeapon) == null ? void 0 : u.payloadState) == null ? void 0 : d.activePayloadId) ?? "", delete t.mode, t;
    if ((m = i == null ? void 0 : i.defaultWeapon) != null && m.id)
      return t.weaponId = i.defaultWeapon.id, t.payloadId = t.payloadId ?? ((p = (f = i.defaultWeapon) == null ? void 0 : f.payloadState) == null ? void 0 : p.activePayloadId) ?? "", delete t.mode, t;
  }
  if (t.fallback === "unarmed")
    return t.syntheticWeapon = foundry.utils.deepClone(At.buildDefaultUnarmedProfile(a)), t.weaponId = t.syntheticWeapon.id, t.payloadId = t.payloadId ?? ((g = (h = t.syntheticWeapon) == null ? void 0 : h.payloadState) == null ? void 0 : g.activePayloadId) ?? "", delete t.mode, t;
  throw new Error("Attack could not resolve a usable weapon.");
}
function ay(a) {
  return Array.isArray(a) ? a.map((e) => ({
    id: (e == null ? void 0 : e.id) ?? foundry.utils.randomID(),
    label: typeof (e == null ? void 0 : e.label) == "string" ? e.label : "Manual",
    value: Number((e == null ? void 0 : e.value) ?? 0)
  })) : [];
}
async function ny({ actor: a, payload: e, event: t } = {}) {
  var W, j, O, x, q, Z, ae, ue, oe, E, U, ne, te, Ee, je, pt, ht, nt, gt, Fe, st, Tt, vt, kt, Et, Mt, Ct, rt, k, R, Y, ge, we, ve, De, Ue, qe, ot, lt, Q, ye, We, Ze, ct;
  if (a != null && a.actor && (a = a.actor), (W = a == null ? void 0 : a.document) != null && W.actor && (a = a.document.actor), !a) throw new Error("MWD.roll.execute requires actor");
  if (!(e != null && e.intent)) throw new Error("MWD.roll.execute requires payload.intent");
  if (e = al(e), e = await iy({ actor: a, payload: e }), !e) return null;
  let i = await us({ actor: a, payload: e, event: t }), n = await Xo({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const s = await ar.prompt({
    actor: a,
    basePayload: e,
    resolved: i,
    diceParts: {
      attribute: ((j = i == null ? void 0 : i.pool) == null ? void 0 : j.attribute) ?? 0,
      skill: ((O = i == null ? void 0 : i.pool) == null ? void 0 : O.skill) ?? 0,
      bonus: ((x = i == null ? void 0 : i.pool) == null ? void 0 : x.bonus) ?? 0,
      specialization: ((q = i == null ? void 0 : i.pool) == null ? void 0 : q.specialization) ?? 0
    },
    mods: n.mods,
    modTotal: n.total,
    options: {
      allowEdge: e.intent !== "initiative"
    }
  });
  if (!s) return null;
  if (e = al(s), i = await us({ actor: a, payload: e, event: t }), e.intent === "attack" && !((ae = (Z = i == null ? void 0 : i.attack) == null ? void 0 : Z.capabilityReport) != null && ae.isTemplated) && (delete e.targetSnapshots, delete e.templatePlacement), e.intent === "attack" && e.weaponId) {
    const F = ((oe = (ue = a.items) == null ? void 0 : ue.get) == null ? void 0 : oe.call(ue, e.weaponId)) ?? null;
    if ((E = F == null ? void 0 : F.isPersonalWeapon) != null && E.call(F)) {
      const fe = String(e.payloadId ?? "").trim(), _i = String(((U = F.system) == null ? void 0 : U.selectedPayloadId) ?? "").trim();
      if (fe && fe !== _i && await ((ne = F.setActivePayload) == null ? void 0 : ne.call(F, fe)), !((te = F.canConsumePayload) != null && te.call(F, { payloadId: fe }))) {
        const yt = (Ee = F.getPayloadState) == null ? void 0 : Ee.call(F, { payloadId: fe }), sa = yt != null && yt.payloadLabel ? ` (${yt.payloadLabel})` : "";
        return (je = ui.notifications) == null || je.warn(`Not enough payload${sa} for ${F.name}.`), null;
      }
    }
  }
  if (e.intent === "attack" && ((ht = (pt = i == null ? void 0 : i.attack) == null ? void 0 : pt.capabilityReport) != null && ht.isTemplated)) {
    const F = await Mg({
      actor: a,
      attack: i.attack
    });
    if (!F) return null;
    if (!Lu(((nt = i == null ? void 0 : i.attack) == null ? void 0 : nt.areaEffect) ?? ((Fe = (gt = i == null ? void 0 : i.attack) == null ? void 0 : gt.payload) == null ? void 0 : Fe.areaEffect) ?? {}) && (!Array.isArray(F.targetSnapshots) || F.targetSnapshots.length === 0))
      return (st = ui.notifications) == null || st.warn("Template placement did not affect any targets."), null;
    e.targetSnapshots = Array.isArray(F.targetSnapshots) ? F.targetSnapshots : [], e.templatePlacement = F.placement, i = await us({ actor: a, payload: e, event: t });
  }
  n = await Xo({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const { mods: r, total: o } = n, { mods: l, total: c } = ty(e);
  let u = [...r, ...l], d = Number(o ?? 0) + Number(c ?? 0);
  const m = Number(((Tt = i == null ? void 0 : i.pool) == null ? void 0 : Tt.attribute) ?? 0) + Number(((vt = i == null ? void 0 : i.pool) == null ? void 0 : vt.skill) ?? 0) + Number(((kt = i == null ? void 0 : i.pool) == null ? void 0 : kt.bonus) ?? 0) + Number(((Et = i == null ? void 0 : i.pool) == null ? void 0 : Et.specialization) ?? 0), f = Math.max(0, m + Number(d ?? 0)), p = e.intent !== "initiative", h = p ? sy({ actor: a, ctx: i, payload: e }) : null, g = (Mt = h == null ? void 0 : h.pre) != null && Mt.spent ? 4 : Number(i.diceTarget ?? i.target ?? 5), y = {
    snapshot: ((k = (rt = (Ct = game.mwd) == null ? void 0 : Ct.personalCombat) == null ? void 0 : rt.getSnapshot) == null ? void 0 : k.call(rt, a)) ?? null
  }, b = St({
    actor: a,
    phase: "onBuildRoll",
    facts: Tr({ actor: a, resolved: i, payload: e, runtime: y }),
    packet: {},
    options: { runtime: y, consumeUsage: !0 }
  });
  await ei({ actor: a, mutations: b.mutations, runtime: y }), p && ((R = h == null ? void 0 : h.pre) != null && R.spent) && ((Y = h == null ? void 0 : h.pre) != null && Y.poolKey) && await ((ge = a.spendEdge) == null ? void 0 : ge.call(a, h.pre.poolKey, 1));
  let S, w = 0, M = 0;
  if (i.rollType === "sum" && ((we = i.sum) != null && we.formula))
    S = await new Roll(i.sum.formula, i.sum.data ?? {}).evaluate(), w = Number(S.total ?? 0) + Number(d ?? 0);
  else {
    S = await new Roll(`${f}d6cs>=${g}`).evaluate();
    const F = (ve = S.dice) == null ? void 0 : ve[0];
    w = Array.isArray(F == null ? void 0 : F.results) ? F.results.filter((fe) => fe.success).length : 0, M = Array.isArray(F == null ? void 0 : F.results) ? F.results.filter((fe) => fe.result === 1).length : 0;
  }
  if (i.intent === "initiative" && (S == null ? void 0 : S.total) != null) {
    const F = { total: Number(S.total ?? 0) + Number(d ?? 0) }, fe = St({
      actor: a,
      phase: "onInitiativeResolved",
      facts: Zl({ actor: a, packet: F, runtime: y }),
      packet: F,
      options: { runtime: y, consumeUsage: !0 }
    });
    if (await ei({ actor: a, mutations: fe.mutations, runtime: y }), fe.modifiers.length) {
      const _i = fe.modifiers.reduce((yt, sa) => yt + Number(sa.value ?? 0), 0);
      u = u.concat(fe.modifiers), d += _i, w = Number(fe.packet.total ?? 0), await nl({ actor: a, total: fe.packet.total ?? S.total }), i.breakdown = (i.breakdown ?? []).concat(fe.modifiers.map((yt, sa) => ({
        id: `traitInitiative${sa + 1}`,
        label: yt.label,
        value: Number(yt.value ?? 0)
      })));
    } else
      w = Number(F.total ?? 0), await nl({ actor: a, total: F.total });
  }
  const N = xc(
    i,
    { successes: w, raw: (De = S == null ? void 0 : S.toJSON) == null ? void 0 : De.call(S) },
    null
    // opposed rolls can pass defender result later
  ), P = N == null ? void 0 : N.edgeEarned;
  if ((P == null ? void 0 : P.amount) > 0) {
    const F = (Ue = i == null ? void 0 : i.domains) != null && Ue.includes("physical") ? "physical" : (qe = i == null ? void 0 : i.domains) != null && qe.includes("mental") ? "mental" : (ot = i == null ? void 0 : i.domains) != null && ot.includes("social") ? "social" : null, fe = ey(a, F);
    await ((lt = a.gainEdge) == null ? void 0 : lt.call(a, fe, P.amount)), N.edgeEarned.pool = fe;
  }
  i.intent === "overload" && await ly({ actor: a, passed: N.passed });
  let L = null;
  i.intent === "attack" && (L = await _c({
    attacker: a,
    ctx: i,
    outcomeModel: N
  }));
  const V = Wg({
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
    outcomeModel: N
  });
  L && (V.attackResult = L);
  const G = await xa({ resolved: V });
  if (e.intent === "attack" && e.weaponId) {
    const F = ((ye = (Q = a.items) == null ? void 0 : Q.get) == null ? void 0 : ye.call(Q, e.weaponId)) ?? null;
    (We = F == null ? void 0 : F.isPersonalWeapon) != null && We.call(F) && (await ((Ze = F.consumePayload) == null ? void 0 : Ze.call(F, { payloadId: e.payloadId })) || (ct = ui.notifications) == null || ct.warn(`Payload could not be consumed for ${F.name}.`));
  }
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: a }),
    content: G,
    flags: {
      mwd: {
        payload: e,
        resolved: V
      }
    }
  });
}
function sy({ actor: a, ctx: e, payload: t }) {
  var p, h, g, y, b, S, w;
  const i = ry(e == null ? void 0 : e.domains), n = oy[i] ?? null, s = (n == null ? void 0 : n.a) ?? null, r = (n == null ? void 0 : n.b) ?? null, o = [s, r].filter(Boolean), l = !!((p = t == null ? void 0 : t.toggles) != null && p.useEdge) || !!(t != null && t.useEdge);
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
function ry(a) {
  return Array.isArray(a) ? a.includes("physical") ? "physical" : a.includes("mental") ? "mental" : a.includes("social") ? "social" : null : null;
}
const oy = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};
async function nl({ actor: a, total: e }) {
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
async function ly({ actor: a, passed: e }) {
  e || await a.update({ "system.burn.overloaded": !0 });
}
const cy = /* @__PURE__ */ new Set(["physical", "mental", "social"]);
function uy(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function dy(a) {
  if (!a) return;
  const e = String(a).trim().toLowerCase();
  return cy.has(e) ? e : void 0;
}
class my {
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
          const c = uy(l.value);
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
            domain: dy(l.domain)
          });
        }
    }
    return i;
  }
}
const ms = {
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
};
class fy {
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
      const r = ms == null ? void 0 : ms[s];
      if ((n = r == null ? void 0 : r.mods) != null && n.length)
        for (const o of r.mods) {
          const l = Array.isArray(o.domains) ? o.domains : [], c = o.value;
          if (l.length)
            for (const u of l)
              i.push({
                label: r.label ?? s,
                value: c,
                source: "Status",
                domain: u
              });
          else
            i.push({
              label: r.label ?? s,
              value: c,
              source: "Status"
            });
        }
    }
    return i;
  }
}
class py {
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
class hy {
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
const gy = {
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
class yy {
  constructor() {
    D(this, "id", "mwd.lifeModules");
    D(this, "label", "Life Modules");
  }
  collect({ actor: e, resolved: t } = {}) {
    return lf({ actor: e, resolved: t });
  }
}
class by {
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
    return St({
      actor: e,
      phase: "onBuildRoll",
      facts: Tr({ actor: e, resolved: t, payload: i, runtime: n }),
      packet: {},
      options: { runtime: n, consumeUsage: !1 }
    }).modifiers;
  }
}
function Sy() {
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
function Ay() {
  return {
    get(a) {
      return Ot(a);
    },
    getSkills({ withKnowledge: a = !1 } = {}) {
      return gn();
    },
    list() {
      return gn();
    }
  };
}
function wy() {
  return {
    get(a) {
      return pi(a);
    },
    list() {
      return zn();
    },
    listByType(a) {
      return Nr(a);
    },
    getTypeLabel(a) {
      return ea(a);
    },
    evaluate(a) {
      return hi(a);
    }
  };
}
function Ty() {
  return {
    normalizeQualitySystem(a) {
      return _t(a);
    },
    getEditorConfig() {
      return Vl();
    },
    evaluatePhase(a) {
      return St(a);
    },
    applyMutations(a) {
      return ei(a);
    },
    buildRollFacts(a) {
      return Tr(a);
    },
    buildActionCostFacts(a) {
      return Xl(a);
    },
    buildBurnFacts(a) {
      return an(a);
    },
    buildInitiativeFacts(a) {
      return Zl(a);
    },
    buildDamageFacts(a) {
      return ec(a);
    },
    buildEdgeFacts(a) {
      return Cs(a);
    },
    buildEndOfActivationFacts(a) {
      return tc(a);
    }
  };
}
class Hr {
  static start() {
    const e = new Hr();
    Hooks.once("init", () => e.onInit()), Hooks.once("ready", () => e.onReady());
  }
  async onInit() {
    console.log(Ae + "AnarchySystem.onInit"), game.system.mwd = this, game.system.anarchy = this, game.mwd ?? (game.mwd = {}), Sy(), Ah(), mp("mwd"), game.mwd.roll = il, game.mwd.personalCombat = z, game.mwd.harm = ft, this.roll = il, this.personalCombat = z, this.harm = ft, this.skills = Ay(), this.lifeModules = wy(), this.traits = Ty(), this.remoteCall = new Ts(), game.system.mwd.skills = this.skills, game.system.mwd.lifeModules = this.lifeModules, game.system.mwd.traits = this.traits, game.mwd.skills = this.skills, game.mwd.lifeModules = this.lifeModules, game.mwd.traits = this.traits, Se.init(), this.modifiers = new ce(), Vt.register(new my()), Vt.register(new fy()), Vt.register(new py()), Vt.register(new hy()), Vt.register(gy), Vt.register(new yy()), Vt.register(new by()), Vt.register(new zf()), Handlebars.registerHelper("mwdClassList", (e) => Array.isArray(e) ? e.join(" ") : typeof e == "string" ? e : ""), this.actorClasses = {
      character: Co,
      npc: Co,
      vehicle: wc,
      battlemech: xf
    }, this.hooks = new Ci(), this.styles = new vf(), this.handlebarsManager = new Rr(), z.init(), Hp.register(), console.log(Ae + "AnarchySystem.onInit | loading system"), CONFIG.ANARCHY = Ce, CONFIG.Combat.initiative = { formula: "2d6" }, (CONFIG.statusEffects ?? []).some((e) => (e == null ? void 0 : e.id) === "overloaded") || CONFIG.statusEffects.push({
      id: "overloaded",
      name: "Overloaded",
      icon: "systems/mwd/img/icons/status/surge.svg"
    }), (CONFIG.statusEffects ?? []).some((e) => (e == null ? void 0 : e.id) === "preparedInterrupt") || CONFIG.statusEffects.push({
      id: "preparedInterrupt",
      name: "Prepared",
      icon: "systems/mwd/img/icons/status/readied_action.svg"
    }), CONFIG.Actor.documentClass = lg, CONFIG.Item.documentClass = ta, ta.init(), Gh(), eg(), await ag(), console.log(Ae + "AnarchySystem.onInit | done");
  }
  async onReady() {
    if (console.log(Ae + "AnarchySystem.onReady"), await z.onReady(), !game.user.isGM) return;
    await tf();
    const e = game.settings.get(T, "enableGMGadget");
    if (!e) {
      console.log(`${Ae}GMManager render skipped (enableGMGadget=false)`);
      return;
    }
    game.mwd = game.mwd ?? {}, game.mwd.gmGadget = () => fp({ systemId: T }).render({ force: !0 }), e && game.mwd.gmGadget();
  }
}
Hr.start();
//# sourceMappingURL=index.mjs.map
