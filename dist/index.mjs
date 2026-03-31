var $o = Object.defineProperty;
var xo = Object.getPrototypeOf;
var Bo = Reflect.get;
var Sr = (a) => {
  throw TypeError(a);
};
var Fo = (a, e, t) => e in a ? $o(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var R = (a, e, t) => Fo(a, typeof e != "symbol" ? e + "" : e, t), Gs = (a, e, t) => e.has(a) || Sr("Cannot " + t);
var B = (a, e, t) => (Gs(a, e, "read from private field"), t ? t.call(a) : e.get(a)), ye = (a, e, t) => e.has(a) ? Sr("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), Re = (a, e, t, i) => (Gs(a, e, "write to private field"), i ? i.call(a, t) : e.set(a, t), t), M = (a, e, t) => (Gs(a, e, "access private method"), t);
var mi = (a, e, t) => Bo(xo(a), t, e);
const fe = {
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
    description: "Description",
    gmnotes: "GM notes"
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
}, w = fe, v = "mwd", zo = "MechWarrior: Destiny", ma = `system.${v}`, Wo = v, Ji = `systems/${v}`, dn = `${Ji}/style`, Oi = `${Ji}/third-party/style`, q = `systems/${v}/templates`, Is = `${Ji}/img/icons`, X = `${Is}/skills`, oe = "MWD | ", Uo = 2, Ho = 5, jo = 4, mn = 8, zt = {
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
}, pa = {
  autopilot: "autopilot",
  firewall: "firewall",
  knowledge: "knowledge"
}, ze = {
  grit: "grit",
  chaos: "chaos",
  insight: "insight",
  rumor: "rumor",
  legend: "legend",
  credibility: "credibility"
}, Ga = {
  physical: [ze.grit, ze.chaos],
  mental: [ze.insight, ze.rumor],
  social: [ze.legend, ze.credibility]
}, b = {
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
  actorAttributes: zt,
  itemAttributes: pa,
  attributes: { ...zt, ...pa },
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
    edgePools: ze,
    edgePoolGroups: Ga,
    physical: {
      grit: ze.grit,
      chaos: ze.chaos
    },
    mental: {
      insight: ze.insight,
      rumor: ze.rumor
    },
    social: {
      legend: ze.legend,
      credibility: ze.credibility
    },
    chaos: ze.chaos
  },
  area: {
    none: "none",
    shotgun: "shotgun",
    circle: "circle",
    cone: "cone",
    rect: "rect",
    ray: "ray"
  }
}, qo = Object.freeze({
  physical: "physical",
  mental: "mental",
  social: "social"
});
Object.freeze(Object.values(qo));
const Mi = {
  [b.actorTypes.character]: [
    b.actorAttributes.strength,
    b.actorAttributes.reflexes,
    b.actorAttributes.willpower,
    b.actorAttributes.intelligence,
    b.actorAttributes.charisma,
    b.actorAttributes.edge
  ],
  [b.actorTypes.npc]: [
    b.actorAttributes.strength,
    b.actorAttributes.reflexes,
    b.actorAttributes.willpower,
    b.actorAttributes.intelligence,
    b.actorAttributes.charisma,
    b.actorAttributes.edge
  ],
  [b.actorTypes.vehicle]: [
    b.actorAttributes.handling,
    b.actorAttributes.system,
    b.actorAttributes.chassis,
    b.actorAttributes.condition
  ],
  [b.actorTypes.battlemech]: [
    b.actorAttributes.handling,
    b.actorAttributes.system,
    b.actorAttributes.chassis,
    b.actorAttributes.condition
  ]
}, Vs = {
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
}, Oe = {
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
  SYSTEM_NAME: v,
  SYSTEM_DESCRIPTION: zo,
  SYSTEM_SOCKET: ma,
  SYSTEM_SCOPE: Wo,
  SYSTEM_PATH: Ji,
  STYLE_PATH: dn,
  THIRD_PARTY_STYLE_PATH: Oi,
  TEMPLATES_PATH: q,
  ICONS_PATH: Is,
  ICONS_SKILLS_PATH: X,
  LOG_HEAD: oe,
  SPECIALIZATION_BONUS: Uo,
  TARGET_SUCCESS: Ho,
  TARGET_SUCCESS_EDGE: jo,
  BASE_MONITOR: mn,
  ACTOR_ATTRIBUTES: zt,
  ITEM_ATTRIBUTES: pa,
  EDGE_POOL_GROUPS: Ga,
  TEMPLATE: b,
  ANARCHY_SYSTEM: Oe
};
const at = class at {
  static ascending(e = (t) => t) {
    return (t, i) => at.sortingBy(e(t), e(i));
  }
  static descending(e = (t) => t) {
    return (t, i) => at.sortingBy(e(i), e(t));
  }
  static sortingBy(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
  }
  static bySortedArray(e) {
    return (t) => e.indexOf(t);
  }
  static ascendingBySortedArray(e) {
    return at.ascending(at.bySortedArray(e));
  }
  static sortedMap(e, t = (i, s) => 0) {
    return Object.keys(e).sort(t).reduce(
      (i, s) => (i[s] = e[s], i),
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
    return e.map(t).filter((i) => i != null).reduce(at.sum(), 0);
  }
  static divint(e, t) {
    return Math.floor(e / t);
  }
  static divup(e, t) {
    return Math.ceil(e / t);
  }
  static join(e, t = "") {
    return e.reduce(at.joiner(t));
  }
  static joiner(e = "") {
    return (t, i) => t + e + i;
  }
  static classify(e, t = (i) => i.type) {
    let i = {};
    return at.classifyInto(i, e, t), i;
  }
  static classifyFirst(e, t) {
    let i = {};
    for (const s of e) {
      const r = t(s);
      i[r] || (i[r] = s);
    }
    return i;
  }
  static classifyInto(e, t, i = (s) => s.type) {
    for (const s of t) {
      const r = i(s);
      let n = e[r];
      n || (n = [], e[r] = n), n.push(s);
    }
  }
  static showControlWhen(e, t) {
    t ? e.show() : e.hide();
  }
  static minmax(e, t, i) {
    return Math.max(t, Math.min(e, i));
  }
};
R(at, "isString", (e) => typeof e == "string" || e instanceof String);
let J = at;
const Go = {
  keyword: "keywords",
  disposition: "dispositions",
  cue: "cues"
}, E = class E {
  /**
   * Initialize enum caches.
   * Call once during system init/setup after config/constants are available.
   */
  static init() {
    var t, i, s, r, n, o, l, c, u, d, p, m;
    E.hbsAttributes = E.mapObjectToKeyValue(w.attributes).filter((f) => f.value !== "knowledge" && f.value !== "noAttribute"), E.hbsItemTypes = E.mapObjectToKeyValue(w.itemType), E.hbsMonitors = E.mapObjectToKeyValue(w.monitor), E.hbsMonitorLetters = E.mapObjectToKeyValue(w.monitorLetter), E.hbsAssetModuleCategories = E.mapObjectToKeyValue(w.assetModuleCategory), (i = (t = w.item) == null ? void 0 : t.lifeModule) != null && i.type ? E.hbsLifeModuleTypes = E.mapObjectToKeyValue(w.item.lifeModule.type) : (console.warn("MWD | MWD.item.lifeModule.type is missing; life module enums disabled."), E.hbsLifeModuleTypes = []), E.hbsAreas = E.mapObjectToKeyValue(w.area), E.hbsRanges = E.mapObjectToKeyValue(w.range), E.hbsVehicleCategories = E.mapObjectToKeyValue(w.vehicleCategory), E.hbsMwdWeightClasses = E.mapObjectToKeyValue((s = w.mwd) == null ? void 0 : s.weightClass), E.hbsMwdHardpointTypes = E.mapObjectToKeyValue((r = w.mwd) == null ? void 0 : r.hardpointType), E.hbsMwdHardpointSizes = E.mapObjectToKeyValue((n = w.mwd) == null ? void 0 : n.hardpointSize), E.hbsMwdHardpointLocations = E.mapObjectToKeyValue((o = w.mwd) == null ? void 0 : o.hardpointLocation), E.hbsMwdPrimaryModes = E.mapObjectToKeyValue((l = w.mwd) == null ? void 0 : l.primarySlotMode), E.hbsMwdWeaponCategories = E.mapObjectToKeyValue((c = w.mwd) == null ? void 0 : c.weaponCategory), E.hbsMwdWeaponDamageTypes = E.mapObjectToKeyValue((u = w.mwd) == null ? void 0 : u.weaponDamageType), E.hbsPersonalWeaponDamageTypes = E.mapObjectToKeyValue((d = w.mwd) == null ? void 0 : d.personalDamageType), E.hbsPersonalWeaponDamageCategories = E.mapObjectToKeyValue((p = w.mwd) == null ? void 0 : p.personalDamageCategory), E.hbsMwdMeleeLocations = E.mapObjectToKeyValue((m = w.mwd) == null ? void 0 : m.meleeLocation), E.hbsDamageTypes = J.distinct(
      (E.hbsMwdWeaponDamageTypes ?? []).concat(E.hbsPersonalWeaponDamageTypes ?? []),
      (f) => f.value
    );
    const e = Object.values(Mi).flat();
    E.sortedAttributeKeys = J.distinct(
      e.concat(Object.keys(w.attributes ?? {}))
    ), E.registerHandleBarHelpers(), E.ENUMS = E.getEnums();
  }
  static registerHandleBarHelpers() {
    typeof Handlebars > "u" || Handlebars.registerHelper("sortedAttributes", (e) => {
      if (!e || typeof e != "object") return [];
      const t = Object.keys(e), i = E.sortedAttributeKeys ?? [], s = new Map(i.map((r, n) => [r, n]));
      return t.sort((r, n) => {
        const o = s.has(r) ? s.get(r) : 9999, l = s.has(n) ? s.get(n) : 9999;
        return o !== l ? o - l : String(r).localeCompare(String(n));
      }), t.map((r) => {
        const n = e[r];
        return n && typeof n == "object" ? { key: r, ...n } : { key: r, value: n };
      });
    });
  }
  static getDamageTypes() {
    return E.hbsDamageTypes ?? [];
  }
  static getAttributes(e = () => !0) {
    return (E.hbsAttributes ?? []).filter((t) => e(t.value));
  }
  static getActorWordTypes() {
    return Go;
  }
  static getMonitors() {
    return E.hbsMonitors ?? [];
  }
  /**
   * Returns a big blob of enums suitable for sheet contexts.
   * `withKnowledge` is passed through to the skills service.
   */
  static getEnums(e = () => !0, t = !1) {
    return {
      attributes: E.getAttributes(e),
      itemTypes: E.hbsItemTypes ?? [],
      monitors: E.hbsMonitors ?? [],
      monitorLetters: E.hbsMonitorLetters ?? [],
      assetModuleCategories: E.hbsAssetModuleCategories ?? [],
      lifeModuleTypes: E.hbsLifeModuleTypes ?? [],
      areas: E.hbsAreas ?? [],
      ranges: E.hbsRanges ?? [],
      vehicleCategories: E.hbsVehicleCategories ?? [],
      // Skills: now sourced from MWD namespace (with safe fallback)
      skills: E.getSkillsEnum({ withKnowledge: t }),
      // MWD enums
      mwdWeightClasses: E.hbsMwdWeightClasses ?? [],
      mwdHardpointTypes: E.hbsMwdHardpointTypes ?? [],
      mwdHardpointSizes: E.hbsMwdHardpointSizes ?? [],
      mwdHardpointLocations: E.hbsMwdHardpointLocations ?? [],
      mwdPrimaryModes: E.hbsMwdPrimaryModes ?? [],
      mwdWeaponCategories: E.hbsMwdWeaponCategories ?? [],
      mwdWeaponDamageTypes: E.hbsMwdWeaponDamageTypes ?? [],
      personalWeaponDamageTypes: E.hbsPersonalWeaponDamageTypes ?? [],
      personalWeaponDamageCategories: E.hbsPersonalWeaponDamageCategories ?? [],
      damageTypes: E.hbsDamageTypes ?? [],
      mwdMeleeLocations: E.hbsMwdMeleeLocations ?? []
    };
  }
  static getSkillsEnum({ withKnowledge: e = !1 } = {}) {
    var s, r, n, o, l;
    const t = ((r = (s = game == null ? void 0 : game.system) == null ? void 0 : s.mwd) == null ? void 0 : r.skills) ?? ((o = (n = game == null ? void 0 : game.system) == null ? void 0 : n.anarchy) == null ? void 0 : o.skills);
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
    return !e || typeof e != "object" ? [] : Object.keys(e).map((s) => {
      const r = e[s];
      let n;
      return r && typeof r == "object" ? n = r.label ?? r.name ?? r.value ?? String(s) : r != null ? n = String(r) : n = String(s), {
        [t]: s,
        [i]: n
      };
    });
  }
  // Backwards-compat alias (the legacy file misspelled this)
  static mapObjetToKeyValue(e, t = "value", i = "label") {
    return E.mapObjectToKeyValue(e, t, i);
  }
};
R(E, "ENUMS"), // HBS-friendly arrays of { value, label } (or key/value depending on caller)
R(E, "hbsAttributes"), R(E, "hbsItemTypes"), R(E, "hbsMonitors"), R(E, "hbsMonitorLetters"), R(E, "hbsAssetModuleCategories"), R(E, "hbsLifeModuleTypes"), R(E, "hbsAreas"), R(E, "hbsRanges"), R(E, "hbsVehicleCategories"), // MWD-specific enum groups
R(E, "hbsMwdWeightClasses"), R(E, "hbsMwdHardpointTypes"), R(E, "hbsMwdHardpointSizes"), R(E, "hbsMwdHardpointLocations"), R(E, "hbsMwdPrimaryModes"), R(E, "hbsMwdWeaponCategories"), R(E, "hbsMwdWeaponDamageTypes"), R(E, "hbsPersonalWeaponDamageTypes"), R(E, "hbsPersonalWeaponDamageCategories"), R(E, "hbsDamageTypes"), R(E, "hbsMwdMeleeLocations"), R(E, "sortedAttributeKeys");
let te = E;
class Vo {
  static monitor(e) {
    return te.getFromList(te.getMonitors(), e) ?? "";
  }
  static letter(e) {
    return te.getFromList(te.getMonitorLetters(), e) ?? "";
  }
}
class Ko {
  static toLowerCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}
const Yo = [
  "fas fa-dice",
  "fas fa-dice-one",
  "fas fa-dice-two",
  "fas fa-dice-three",
  "fas fa-dice-four",
  "fas fa-dice-five",
  "fas fa-dice-six"
];
class F {
  static fontAwesome(e) {
    return `<i class="${e}"></i>`;
  }
  static iconSystemPath(e, t) {
    return F.iconPath(`${dn}/${e}`, t);
  }
  static iconPath(e, t) {
    return `<img class="${t}" src="${e}" />`;
  }
  static iconD6(e) {
    if (e < 0 || e > 6)
      throw `Dice ${e} is out of dice range [1..6] or 0 for multidice`;
    return F.fontAwesome(Yo[e]);
  }
}
globalThis.ANARCHY_ICONS = F;
const ce = (a, e = {}) => a.replace(/\{(.*?)\}/g, (t, i) => e[i] ?? ""), pn = Object.freeze({
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}), Ts = Object.freeze(
  Object.entries(pn).map(([a, e]) => ({ value: a, label: e }))
), Qo = Object.freeze({
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
}), Jo = Object.freeze(
  Ts.map((a) => a.value)
), Ei = Object.freeze({
  armorPiercing: Object.freeze({
    key: "armorPiercing",
    label: "Armor Piercing",
    rated: !1,
    aliases: ["armor piercing", "armorpiercing"],
    resolve: () => ({ ap: 2 })
  }),
  antiFerro: Object.freeze({
    key: "antiFerro",
    label: "Anti-Ferro",
    rated: !1,
    aliases: ["anti-ferro", "antiferro"],
    resolve: () => ({ bonusVsArmorTag: { ferroFibrous: 0.33 } })
  }),
  blast: Object.freeze({
    key: "blast",
    label: "Blast",
    rated: !1,
    aliases: ["blast"],
    resolve: () => ({ flags: ["blast", "area"] })
  }),
  corrosive: Object.freeze({
    key: "corrosive",
    label: "Corrosive",
    rated: !1,
    aliases: ["corrosive"],
    resolve: () => ({ flags: ["corrosive"] })
  }),
  emp: Object.freeze({
    key: "emp",
    label: "EMP",
    rated: !1,
    aliases: ["emp"],
    resolve: () => ({ flags: ["emp"] })
  }),
  inaccurate: Object.freeze({
    key: "inaccurate",
    label: "Inaccurate",
    rated: !1,
    aliases: ["inaccurate"],
    resolve: () => ({ accuracyMod: -1 })
  })
}), Os = Object.freeze({
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
}), Xo = Object.freeze(
  Object.values(Ei).map((a) => ({
    value: a.key,
    label: a.label,
    rated: a.rated
  }))
), Zo = Object.freeze(
  Object.values(Os).map((a) => ({
    value: a.key,
    label: a.label,
    rated: a.rated
  }))
), fn = bn(Ei), hn = bn(Os);
Object.freeze(
  Object.fromEntries(
    Object.values(Ei).flatMap((a) => [a.key, ...a.aliases ?? []].map((t) => [String(t).trim().toLowerCase(), a.resolve]))
  )
);
function _s(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => _s(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function lt(a, e = "penetrating") {
  const t = String(a ?? "").trim().toLowerCase();
  return Qo[t] ?? e;
}
function gn(a) {
  const e = String(a ?? "").trim();
  return e ? lt(e, "") : "";
}
function yn(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return Jo.includes(e);
}
function St(a) {
  const e = lt(a, "");
  return pn[e] ?? String(a ?? "").trim();
}
function bt(a) {
  const e = a ?? {}, t = Number(e.ballistic ?? 0) || 0, i = Number(e.melee ?? 0) || 0;
  return {
    penetrating: e.penetrating !== void 0 ? Number(e.penetrating ?? 0) || 0 : Math.max(t, i),
    concussive: e.concussive !== void 0 ? Number(e.concussive ?? 0) || 0 : Number(e.explosive ?? 0) || 0,
    energy: Number(e.energy ?? 0) || 0,
    thermal: Number(e.thermal ?? 0) || 0,
    electrical: Number(e.electrical ?? 0) || 0
  };
}
function ps(a) {
  return _s(a);
}
function ct(a) {
  return _s(a);
}
function Ci(a = "id") {
  var t, i;
  const e = (i = (t = globalThis.foundry) == null ? void 0 : t.utils) == null ? void 0 : i.randomID;
  return typeof e == "function" ? e() : `${a}-${Math.random().toString(36).slice(2, 10)}`;
}
function bn(a) {
  const e = {};
  return Object.values(a).forEach((t) => {
    [t.key, ...t.aliases ?? []].forEach((i) => {
      e[Gi(i)] = t.key;
    });
  }), Object.freeze(e);
}
function Gi(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function Ii(a) {
  return Array.isArray(a) ? a : a && typeof a == "object" ? Object.values(a) : a == null || a === "" ? [] : [a];
}
function Sn(a, e) {
  return Ii(a).map((t) => el(t, e)).filter(Boolean);
}
function el(a, e) {
  if (typeof a == "string" || typeof a == "number") {
    const i = e[Gi(a)];
    return i ? { id: Ci("trait"), key: i, rating: 1 } : null;
  }
  if (!a || typeof a != "object") return null;
  const t = e[Gi(a.key ?? a.value ?? a.name)];
  return t ? {
    id: String(a.id ?? "").trim() || Ci("trait"),
    key: t,
    rating: Math.max(0, Number(a.rating ?? 0) || 0)
  } : null;
}
function We(a) {
  return Sn(a, fn);
}
function ft(a) {
  return Sn(a, hn);
}
function ks(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function tl(a = {}, e = {}) {
  const t = ks(a), i = ks(e);
  return {
    close: t.close + i.close,
    near: t.near + i.near,
    far: t.far + i.far,
    extreme: t.extreme + i.extreme
  };
}
function il(a, e) {
  var t;
  return ((t = e[a]) == null ? void 0 : t.label) ?? a;
}
function Va(a, e) {
  var s;
  const t = il(a == null ? void 0 : a.key, e), i = Math.max(0, Number((a == null ? void 0 : a.rating) ?? 0) || 0);
  return (s = e[a == null ? void 0 : a.key]) != null && s.rated && i > 0 ? `${t} ${i}` : t;
}
function An(a, e) {
  return Ii(a).map((t) => {
    const i = t == null ? void 0 : t.key, s = e[i];
    return s != null && s.resolve ? {
      entry: t,
      effect: s.resolve(t),
      label: Va(t, e)
    } : null;
  }).filter(Boolean);
}
function sl(a, e) {
  const t = { ...a ?? {} };
  return Object.entries(e ?? {}).forEach(([i, s]) => {
    t[i] = (Number(t[i] ?? 0) || 0) + (Number(s ?? 0) || 0);
  }), t;
}
function al(a = []) {
  const e = {}, t = /* @__PURE__ */ new Set();
  for (const i of a.filter(Boolean)) {
    i.accuracyMod !== void 0 && (e.accuracyMod = (Number(e.accuracyMod ?? 0) || 0) + (Number(i.accuracyMod ?? 0) || 0)), i.ap !== void 0 && (e.ap = (Number(e.ap ?? 0) || 0) + (Number(i.ap ?? 0) || 0)), i.addHeat !== void 0 && (e.addHeat = (Number(e.addHeat ?? 0) || 0) + (Number(i.addHeat ?? 0) || 0)), i.bonusVsArmorTag && (e.bonusVsArmorTag = sl(e.bonusVsArmorTag, i.bonusVsArmorTag));
    for (const s of i.flags ?? []) {
      const r = String(s ?? "").trim();
      r && t.add(r);
    }
  }
  return t.size > 0 && (e.flags = Array.from(t)), e;
}
function rl(a = [], e = []) {
  const t = Array.isArray(a) || typeof a == "string" ? { traits: a, standardTraits: e } : a ?? {}, i = ct(t.traits), s = We(t.standardTraits), r = An(s, Ei), n = i.map((o) => {
    var u;
    const l = fn[Gi(o)];
    if (!l) return null;
    const c = (u = Ei[l]) == null ? void 0 : u.resolve;
    return typeof c == "function" ? c({ key: l, rating: 1 }) : null;
  });
  return al([
    ...r.map((o) => o.effect),
    ...n
  ]);
}
function nl({ traits: a = [], standardTraits: e = [] } = {}) {
  return [
    ...ct(a),
    ...We(e).map((i) => Va(i, Ei))
  ].filter(Boolean);
}
function ol(a) {
  const e = a ?? {};
  return {
    id: String(e.id ?? "").trim() || Ci("ammo"),
    name: String(e.name ?? "").trim() || "Ammo",
    damageType: gn(e.damageType),
    apMod: Number(e.apMod ?? e.ap ?? 0) || 0,
    attackRatingBandMod: ks(e.attackRatingBandMod ?? e.attackRatingBand),
    standardTraits: We(e.standardTraits),
    traits: ct(e.traits)
  };
}
function ll(a) {
  var l;
  const e = a ?? {}, t = Math.max(0, Number(e.max ?? 0) || 0), i = Number(e.current), s = Number.isFinite(i) ? Math.max(0, Math.min(i, t > 0 ? t : i)) : Math.max(0, t), r = Ii(e.types).map(ol), n = String(e.activeTypeId ?? "").trim(), o = r.some((c) => c.id === n) ? n : ((l = r[0]) == null ? void 0 : l.id) ?? "";
  return {
    current: s,
    max: t,
    consumePerAttack: Math.max(1, Number(e.consumePerAttack ?? 1) || 1),
    activeTypeId: o,
    types: r
  };
}
function cl(a, e = "untracked") {
  const t = String(a ?? "").trim();
  return t ? t === "linked" ? "internal" : t === "perAttack" ? e : ["untracked", "internal", "actorResource", "itemRef"].includes(t) ? t : e : e;
}
function fa(a = {}) {
  const e = a ?? {};
  return {
    amount: Math.max(1, Number(e.amount ?? e.consumePerUse ?? e.consumePerAttack ?? 1) || 1),
    sourceId: String(e.sourceId ?? "").trim()
  };
}
function Ar(a = {}) {
  const e = a ?? {};
  return {
    damageType: gn(e.damageType),
    ap: Number(e.ap ?? e.apMod ?? 0) || 0,
    attackRatingBand: ks(e.attackRatingBand ?? e.attackRatingBandMod),
    standardTraits: We(e.standardTraits),
    traits: ct(e.traits)
  };
}
function wr(a = {}) {
  const e = a ?? {}, t = String(e.resolverKey ?? e.damageModel ?? e.resolver ?? "standard").trim() || "standard", i = String(e.damageModel ?? "").trim(), s = e.onHitEffect;
  return {
    resolverKey: t,
    damageModel: i,
    onHitEffect: s === null ? null : String(s ?? "").trim() || null
  };
}
function ul(a) {
  return String(a ?? "").trim().toLowerCase() === "unloaded";
}
function je(a) {
  const e = a ?? {}, t = String(e.id ?? "").trim() || Ci("payload");
  return ul(t) ? {
    id: "unloaded",
    label: "Unloaded",
    family: "state",
    compatibleWith: [],
    modifies: Ar({}),
    resolution: wr({ resolverKey: "standard" }),
    consumption: fa({ amount: 1, sourceId: "" })
  } : {
    id: t,
    label: String(e.label ?? e.name ?? "").trim() || "Payload",
    family: String(e.family ?? e.kind ?? "munition").trim() || "munition",
    compatibleWith: _s(e.compatibleWith ?? e.compatible),
    modifies: Ar(e.modifies ?? e),
    resolution: wr(e.resolution ?? e),
    consumption: fa(e.consumption ?? e)
  };
}
function jt(a) {
  var o, l, c, u, d, p;
  const e = a ?? {}, t = cl(
    e.kind || e.type || ((o = e.link) != null && o.actorPath || e.actorPath ? "actorResource" : "") || ((l = e.link) != null && l.itemId || e.itemId || (c = e.link) != null && c.itemPath || e.itemPath ? "itemRef" : "") || (e.tracking || e.current !== void 0 || e.max !== void 0 ? "internal" : "") || "untracked",
    "untracked"
  ), i = e.tracking ?? e, s = Math.max(0, Number(i.max ?? 0) || 0), r = Number(i.current), n = Number.isFinite(r) ? Math.max(0, Math.min(r, s > 0 ? s : r)) : Math.max(0, s);
  return {
    id: String(e.id ?? "").trim() || Ci("source"),
    label: String(e.label ?? e.name ?? "").trim() || "Source",
    kind: t,
    tracking: {
      current: n,
      max: s
    },
    link: {
      actorPath: String(((u = e.link) == null ? void 0 : u.actorPath) ?? e.actorPath ?? "").trim(),
      itemId: String(((d = e.link) == null ? void 0 : d.itemId) ?? e.itemId ?? "").trim(),
      itemPath: String(((p = e.link) == null ? void 0 : p.itemPath) ?? e.itemPath ?? "").trim()
    }
  };
}
function wn() {
  return {
    payloads: [je({
      id: "unloaded",
      label: "Unloaded",
      family: "munition",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    })],
    selectedPayloadId: "unloaded",
    consumptionSources: [jt({
      id: "untracked",
      label: "Untracked",
      kind: "untracked"
    })]
  };
}
function Tn(a) {
  return String(a ?? "").trim().toLowerCase() === "melee";
}
function ha(a = []) {
  const e = Ii(a).map(je).filter(Boolean);
  return e.some((t) => t.id === "unloaded") ? e : [
    je({
      id: "unloaded",
      label: "Unloaded",
      family: "munition",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }),
    ...e
  ];
}
function Ls(a = {}) {
  var c;
  const e = ll(a), t = Math.max(1, Number(e.consumePerAttack ?? 1) || 1), i = e.max > 0, s = i ? "internal-magazine" : "untracked", r = [jt(i ? {
    id: s,
    label: "Internal Source",
    kind: "internal",
    tracking: {
      current: e.current,
      max: e.max
    }
  } : {
    id: s,
    label: "Untracked",
    kind: "untracked",
    tracking: {}
  })], n = e.types.length ? e.types.map((u) => je({
    id: u.id,
    label: u.name,
    family: "munition",
    modifies: {
      damageType: u.damageType,
      ap: u.apMod,
      attackRatingBand: u.attackRatingBandMod,
      standardTraits: u.standardTraits,
      traits: u.traits
    },
    resolution: { resolverKey: "standard" },
    consumption: {
      amount: t,
      sourceId: i ? s : ""
    }
  })) : [je({
    id: "unloaded",
    label: "Unloaded",
    family: "munition",
    resolution: { resolverKey: "standard" },
    consumption: {
      amount: t,
      sourceId: i ? s : ""
    }
  })], o = ha(n), l = o.some((u) => u.id === e.activeTypeId) ? e.activeTypeId : ((c = o[0]) == null ? void 0 : c.id) ?? "unloaded";
  return {
    payloads: o,
    selectedPayloadId: l,
    consumptionSources: r
  };
}
function ht(a, { legacyAmmo: e = null, category: t = "" } = {}) {
  if (Tn(t)) return [];
  const i = Ii(a).map(je).filter(Boolean);
  return i.length > 0 ? ha(i) : e ? ha(Ls(e).payloads) : wn().payloads;
}
function _i(a, { legacyAmmo: e = null } = {}) {
  const t = Ii(a).map(jt).filter(Boolean);
  return t.length > 0 ? t : e ? Ls(e).consumptionSources : wn().consumptionSources;
}
function bi(a, e = [], { legacyAmmo: t = null, category: i = "" } = {}) {
  var n;
  if (Tn(i)) return "";
  const s = ht(e, { legacyAmmo: t, category: i }), r = String(a ?? "").trim();
  if (s.some((o) => o.id === r)) return r;
  if (t) {
    const o = Ls(t).selectedPayloadId;
    if (s.some((l) => l.id === o)) return o;
  }
  return ((n = s[0]) == null ? void 0 : n.id) ?? "unloaded";
}
function Tr({ root: a = null, path: e = "", fallback: t = {} } = {}) {
  const i = String(e ?? "").trim();
  if (!a || !i)
    return {
      current: Math.max(0, Number(t.current ?? 0) || 0),
      max: Math.max(0, Number(t.max ?? 0) || 0),
      currentPath: i
    };
  const s = foundry.utils.getProperty(a, i);
  if (s && typeof s == "object") {
    const o = Math.max(0, Number(s.max ?? t.max ?? 0) || 0), l = Number(s.current);
    return {
      current: Number.isFinite(l) ? Math.max(0, Math.min(l, o > 0 ? o : l)) : Math.max(0, o),
      max: o,
      currentPath: `${i}.current`
    };
  }
  const r = Math.max(0, Number(s ?? t.current ?? 0) || 0), n = Math.max(r, Math.max(0, Number(t.max ?? 0) || 0));
  return {
    current: n > 0 ? Math.min(r, n) : r,
    max: n,
    currentPath: i
  };
}
function dl({ source: a = null, actor: e = null } = {}) {
  var i, s, r, n, o, l, c;
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
    itemId: String(((s = a.link) == null ? void 0 : s.itemId) ?? "").trim(),
    itemPath: String(((r = a.link) == null ? void 0 : r.itemPath) ?? "").trim()
  };
  if (a.kind === "internal") {
    const u = Math.max(0, Number(((n = a.tracking) == null ? void 0 : n.current) ?? 0) || 0), d = Math.max(0, Number(((o = a.tracking) == null ? void 0 : o.max) ?? 0) || 0);
    return {
      ...t,
      isTracked: d > 0 || u > 0,
      current: u,
      max: d,
      currentPath: ""
    };
  }
  if (a.kind === "actorResource") {
    const u = Tr({
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
    const u = ((c = (l = e == null ? void 0 : e.items) == null ? void 0 : l.get) == null ? void 0 : c.call(l, t.itemId)) ?? null, d = Tr({
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
function ga({
  payloads: a = [],
  selectedPayloadId: e = "",
  consumptionSources: t = [],
  actor: i = null,
  payloadId: s = "",
  category: r = ""
} = {}) {
  const n = ht(a, { category: r }), o = _i(t), l = bi(s || e, n, { category: r }), c = n.find((m) => m.id === l) ?? n[0] ?? null, u = (c == null ? void 0 : c.consumption) ?? fa(), d = u.sourceId ? o.find((m) => m.id === u.sourceId) ?? null : o.find((m) => m.kind === "untracked") ?? jt({
    id: "untracked",
    label: "Untracked",
    kind: "untracked"
  }), p = dl({ source: d, actor: i });
  return {
    payloads: n,
    activePayload: c,
    activePayloadId: (c == null ? void 0 : c.id) ?? "",
    payloadLabel: (c == null ? void 0 : c.label) ?? "",
    source: d,
    sourceState: {
      ...p,
      consumePerUse: Math.max(1, Number(u.amount ?? 1) || 1),
      sourceId: (d == null ? void 0 : d.id) ?? ""
    }
  };
}
function ml({
  damageType: a = "penetrating",
  ap: e = 0,
  attackRatingBand: t = {},
  traits: i = [],
  standardTraits: s = [],
  payloads: r = [],
  selectedPayloadId: n = "",
  consumptionSources: o = [],
  payloadId: l = "",
  actor: c = null,
  ammo: u = null,
  ammoTypeId: d = "",
  category: p = ""
} = {}) {
  var P, I, O, x, j, V, K;
  const m = ga({
    payloads: r != null && r.length ? r : void 0,
    selectedPayloadId: n || d,
    consumptionSources: o,
    actor: c,
    payloadId: l || d,
    category: p
  }), y = ((!r || r.length === 0) && u ? ga({
    ...Ls(u),
    actor: c,
    payloadId: l || d,
    category: p
  }) : null) ?? m, h = y.activePayload, g = [
    ...We(s),
    ...We((P = h == null ? void 0 : h.modifies) == null ? void 0 : P.standardTraits)
  ], S = [
    ...ct(i),
    ...ct((I = h == null ? void 0 : h.modifies) == null ? void 0 : I.traits)
  ], T = rl({
    traits: S,
    standardTraits: g
  }), k = {
    ...y.sourceState
  };
  return delete k.sourceItem, {
    damageType: ((O = h == null ? void 0 : h.modifies) == null ? void 0 : O.damageType) || lt(a),
    ap: (Number(e ?? 0) || 0) + (Number(((x = h == null ? void 0 : h.modifies) == null ? void 0 : x.ap) ?? 0) || 0),
    attackRatingBand: tl(
      t,
      ((j = h == null ? void 0 : h.modifies) == null ? void 0 : j.attackRatingBand) ?? {}
    ),
    effects: T,
    traits: nl({
      traits: S,
      standardTraits: g
    }),
    standardTraits: g,
    payloadLabel: y.payloadLabel,
    payload: h ? foundry.utils.deepClone(h) : null,
    payloadState: {
      payloads: y.payloads.map((D) => foundry.utils.deepClone(D)),
      activePayloadId: y.activePayloadId,
      payloadLabel: y.payloadLabel,
      sourceId: ((V = y.source) == null ? void 0 : V.id) ?? "",
      sourceLabel: y.sourceState.label ?? "",
      sourceKind: y.sourceState.kind ?? "untracked",
      isTracked: y.sourceState.isTracked,
      current: y.sourceState.current,
      max: y.sourceState.max,
      consumePerUse: y.sourceState.consumePerUse
    },
    source: y.source ? foundry.utils.deepClone(y.source) : null,
    sourceState: foundry.utils.deepClone(k),
    resolverKey: String(((K = h == null ? void 0 : h.resolution) == null ? void 0 : K.resolverKey) ?? "standard").trim() || "standard",
    ammoLabel: y.payloadLabel,
    ammoType: h ? foundry.utils.deepClone(h) : null,
    ammoState: {
      current: k.current,
      max: k.max,
      consumePerAttack: k.consumePerUse,
      activeTypeId: y.activePayloadId,
      types: y.payloads.map((D) => {
        var N;
        return {
          id: D.id,
          name: D.label,
          damageType: ((N = D.modifies) == null ? void 0 : N.damageType) ?? ""
        };
      }),
      isTracked: k.isTracked,
      ammoLabel: y.payloadLabel
    }
  };
}
function kn(a = {}, e = {}) {
  const t = bt(a), i = bt(e);
  return {
    penetrating: t.penetrating + i.penetrating,
    concussive: t.concussive + i.concussive,
    energy: t.energy + i.energy,
    thermal: t.thermal + i.thermal,
    electrical: t.electrical + i.electrical
  };
}
function Ks({ standardTraits: a = [], traits: e = [], traitState: t = {} } = {}) {
  var p, m;
  const i = ft(a), r = ct(e).map((f) => {
    const y = hn[Gi(f)];
    return y ? { id: Ci("trait"), key: y, rating: y === "reinforced" ? 1 : 0 } : null;
  }).filter(Boolean), n = An(
    [...i, ...r],
    Os
  ), o = n.reduce((f, y) => {
    var h;
    return kn(f, ((h = y.effect) == null ? void 0 : h.mitigationByType) ?? {});
  }, bt({})), l = n.reduce(
    (f, y) => {
      var h;
      return f + Math.max(0, Number(((h = y.effect) == null ? void 0 : h.reinforced) ?? 0) || 0);
    },
    0
  ), c = Number((p = t == null ? void 0 : t.reinforced) == null ? void 0 : p.current), u = Number((m = t == null ? void 0 : t.reinforced) == null ? void 0 : m.max), d = Number.isFinite(c) ? c : Number.isFinite(u) ? u : l;
  return {
    mitigationByType: o,
    reinforcedMax: l,
    traitState: {
      reinforced: {
        current: Math.min(l, Math.max(0, d || 0)),
        max: l
      }
    },
    labels: n.map((f) => f.label),
    standardTraits: i
  };
}
function pl({ traits: a = [], standardTraits: e = [] } = {}) {
  return [
    ...ct(a),
    ...ft(e).map((i) => Va(i, Os))
  ].filter(Boolean);
}
function Ka(a) {
  const e = Math.max(0, Number(a ?? 0) || 0);
  return e <= 0 ? 0 : Math.ceil(e / 4);
}
function fl({
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
  const s = lt(t, "penetrating"), r = bt(e), n = Ka(i), o = Number(r[s] ?? 0) || 0;
  return {
    currentArmorRating: i,
    baseMitigation: n,
    typeMitigationMod: o,
    totalMitigation: n + o,
    isDestroyed: !1
  };
}
function hl({ damageIncoming: a = 0, armorTags: e = [], effects: t = {} } = {}) {
  const i = new Set(ps(e));
  let s = Number(a ?? 0) || 0;
  const r = [];
  return Object.entries((t == null ? void 0 : t.bonusVsArmorTag) ?? {}).forEach(([n, o]) => {
    if (!i.has(n)) return;
    const l = Number(o ?? 0) || 0;
    l && (s *= 1 + l, r.push({ tag: n, bonus: l }));
  }), {
    damageIncoming: s,
    applied: r
  };
}
class li {
  static checkSufficient(e, t, i) {
    if (t > i) {
      const s = ce(w.common.errors.insufficient, {
        resource: e,
        required: t,
        available: i
      });
      throw ui.notifications.error(s), s;
    }
  }
  static checkOutOfRange(e, t, i, s) {
    if (t < i || t > s) {
      const r = ce(w.common.errors.outOfRange, {
        resource: e,
        value: t,
        min: i,
        max: s
      });
      throw ui.notifications.error(r), r;
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
      const i = ce(w.common.errors.expectedType, {
        type: e.type ? w.itemType.singular[e.type] : e.type,
        expectedType: t
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkActorCanReceiveDamage(e, t, i) {
    if (!t) {
      const s = ce(w.common.errors.actorCannotReceiveDamage, {
        actor: i.name,
        damageType: yn(e) ? St(e) : w.actor.monitors[e] ?? w.mwd.weaponDamageType[e] ?? w.mwd.personalDamageType[e] ?? e
      });
      throw ui.notifications.error(s), s;
    }
  }
  static checkWeaponDefense(e, t) {
    var s;
    const i = e.getDefense();
    if ((((s = e.isPersonalWeapon) == null ? void 0 : s.call(e)) ?? e.type === b.itemType.personalWeapon) && !i) {
      const r = ce(w.common.errors.noDefenseOnWeapon, { actor: t.name, weapon: e.name });
      throw ui.notifications.error(r), r;
    }
  }
  static checkTargetsCount(e, t, i) {
    if (e > 0 && t.length > e) {
      const s = ce(w.common.errors.maxTargetsExceedeed, {
        weapon: this.name,
        area: w.area[i],
        count: t.length,
        max: e
      });
      throw ui.notifications.error(s), s;
    }
  }
  static checkActorDefenseAction(e, t, i) {
    if (!e) {
      const s = ce(w.common.errors.actorDoesNotHaveDefense, {
        actor: t.name,
        defense: i.labelkey,
        actorType: w.actorType[t.type]
      });
      throw ui.notifications.error(s), s;
    }
  }
}
function st(a, e, t, i, s, r = (n) => !0) {
  return {
    code: a,
    labelkey: w.attributeAction[a],
    label: w.attributeAction[a],
    attributeFunction1: e ?? ((n) => {
    }),
    attributeFunction2: t ?? ((n) => {
    }),
    icon: i,
    actorTypes: s,
    condition: r
  };
}
function ts(a, e) {
  return {
    code: a,
    labelkey: w.defense[a],
    label: w.defense[a],
    actionCode: e
  };
}
const Ae = b.actorAttributes, we = b.actorTypes, Fe = Oe.actions, is = Oe.defenses, Ys = [
  st(Fe.defense, (a) => Ae.reflexes, (a) => Ae.intelligence, F.fontAwesome("fas fa-shield-alt"), [we.character, we.npc]),
  st(Fe.defense, (a) => Ae.handling, (a) => Ae.chassis, F.fontAwesome("fas fa-tachometer-alt"), [we.vehicle, we.battlemech]),
  st(Fe.resistTorture, (a) => Ae.strength, (a) => Ae.willpower, F.fontAwesome("fas fa-angry"), [we.character, we.npc]),
  st(Fe.perception, (a) => Ae.logic, (a) => Ae.willpower, F.fontAwesome("fas fa-eye"), [we.character, we.npc]),
  st(Fe.perception, (a) => Ae.system, (a) => Ae.handling, F.fontAwesome("fas fa-video"), [we.vehicle, we.battlemech]),
  st(Fe.composure, (a) => Ae.charisma, (a) => Ae.willpower, F.fontAwesome("fas fa-meh"), [we.character, we.npc]),
  st(Fe.judgeIntentions, (a) => Ae.charisma, (a) => Ae.charisma, F.fontAwesome("fas fa-theater-masks"), [we.character, we.npc]),
  st(Fe.memory, (a) => Ae.logic, (a) => Ae.logic, F.fontAwesome("fas fa-brain"), [we.character, we.npc]),
  st(Fe.catch, (a) => Ae.reflexes, (a) => Ae.reflexes, F.fontAwesome("fas fa-baseball-ball"), [we.character, we.npc]),
  st(Fe.lift, (a) => Ae.strength, (a) => Ae.strength, F.fontAwesome("fas fa-dumbbell"), [we.character, we.npc])
], ss = [
  ts(is.physicalDefense, Fe.defense),
  ts(is.physicalResistance, Fe.resistTorture),
  ts(is.socialDefense, Fe.composure),
  ts(is.mentalResistance, Fe.perception)
];
class he {
  static init() {
    Handlebars.registerHelper("fixedDefenseCode", (e) => he.fixedDefenseCode(e));
  }
  static all(e = void 0) {
    return e ? Ys.filter(e) : Ys;
  }
  static getActorActions(e) {
    return Ys.filter((t) => t.actorTypes.includes(e.type) && t.condition(e));
  }
  static fixedDefenseCode(e) {
    return Oe.fixedDefenseCode[e] ?? e;
  }
  static getActorDefenses(e) {
    return ss.map((t) => {
      const i = he.getActorAction(e, t.actionCode);
      return he._convertToDefense(i, t);
    }).filter((t) => t == null ? void 0 : t.code);
  }
  static getDefenseAttributeAction(e) {
    var t;
    return (t = ss.find((i) => i.code == e)) == null ? void 0 : t.actionCode;
  }
  static getActorAction(e, t) {
    return he.getActorActions(e).find((i) => i.code == t);
  }
  static getActorDefense(e, t) {
    t = he.fixedDefenseCode(t);
    const i = ss.find((r) => r.code == t), s = he.getActorAction(e, i.actionCode);
    return li.checkActorDefenseAction(s, e, i), he._convertToDefense(s, i);
  }
  static _convertToDefense(e, t) {
    return e ? foundry.utils.mergeObject(
      t,
      e ?? {},
      { overwrite: !1, inplace: !1 }
    ) : void 0;
  }
  static getDefenses() {
    return ss;
  }
  static prepareShortcut(e, t) {
    const i = he.getActorActions(e).find((s) => s.code == t);
    if (i)
      return {
        icon: i.icon,
        label: i.labelkey,
        callback: (s) => s.actor.rollAttributeAction(t)
      };
  }
}
class ya {
  constructor() {
    this.remoteCalls = {}, game.socket.on(ma, async (e) => this.onSocketMessage(e));
  }
  static async register(e, t) {
    game.system.anarchy.remoteCall._register(e, t);
  }
  async _register(e, t) {
    if (this.remoteCalls[e])
      throw `RemoteCall msg ${e} is already registered`;
    foundry.utils.mergeObject(t, {
      callback: (i) => {
        console.log(oe + "RemoteCall [", e, "] (", i, ")");
      },
      condition: (i) => !0,
      multiple: !1
      /* true if multiple users should handle the message */
    }, { overwrite: !1 }), this.remoteCalls[e] = t, console.log(oe + "RemoteCall registered", e);
  }
  static call(e, t) {
    return game.system.anarchy.remoteCall._remoteCall(e, t);
  }
  _remoteCall(e, t) {
    const i = this.remoteCalls[e];
    return !i || i.condition(game.user) || !i.multiple && Qe.isUniqueConnectedGM() ? !1 : (game.socket.emit(ma, { msg: e, data: t }), !0);
  }
  async onSocketMessage(e) {
    const t = this.remoteCalls[e.msg];
    if (t) {
      const i = t.condition(game.user), s = t.multiple, r = Qe.isUniqueConnectedGM();
      i && (s || r) ? t.callback(e.data) : console.log(oe + "RemoteCall.onSocketMessage(", e, ") ignored :", i, s, r);
    } else
      console.log(oe + "RemoteCall: No callback registered for", e);
  }
}
const kr = "Users.blindMessageToGM";
class Qe {
  static init() {
    ya.register(kr, {
      callback: (e) => Qe.blindMessageToGM(e),
      condition: (e) => e.isGM
    });
  }
  static blindMessageToGM(e) {
    ya.call(kr, e) || ChatMessage.create({
      user: e.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      blind: !0,
      content: ce(w.chat.blindMessageToGM, {
        user: game.user.name,
        message: e.content
      })
    });
  }
  static getUsers(e = (t) => !0) {
    return (game.version ? game.users : game.users.entities).filter(e);
  }
  static firstConnectedGM() {
    return Qe.getUsers((e) => e.isGM && e.active).sort(J.ascending((e) => e.id)).at(0) ?? {};
  }
  /**
   * @returns true pour un seul utilisateur: le premier GM connecté par ordre d'id
   */
  static isUniqueConnectedGM(e = game.user) {
    return e.id == Qe.firstConnectedGM().id;
  }
  static firstResponsible(e) {
    if (!(e != null && e.testUserPermission))
      return;
    const t = Qe.getUsers(
      (i) => i.active && e.testUserPermission(i, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER)
    ).sort(J.ascending((i) => i.id)).at(0);
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
const pi = w.actor.monitors, mt = w.actor.counters, vn = {
  armor: {
    path: "system.monitors.armor.value",
    monitor: (a) => a.system.monitors.armor,
    iconChecked: F.fontAwesome("fas fa-shield-slash"),
    iconUnchecked: F.fontAwesome("fas fa-shield-alt"),
    iconHit: F.fontAwesome("fas fa-bahai"),
    resource: pi.armor
  },
  fatigue: {
    path: "system.monitors.fatigue.value",
    monitor: (a) => a.system.monitors.fatigue,
    iconChecked: F.fontAwesome("fas fa-grimace"),
    iconUnchecked: F.fontAwesome("far fa-smile"),
    iconHit: F.fontAwesome("fas fa-bahai"),
    resource: pi.fatigue,
    overflow: (a) => b.monitors.physical,
    useArmor: !0
  },
  physical: {
    path: "system.monitors.physical.value",
    monitor: (a) => a.system.monitors.physical,
    iconChecked: F.fontAwesome("fas fa-heartbeat"),
    iconUnchecked: F.fontAwesome("far fa-heart"),
    iconHit: F.fontAwesome("fas fa-bahai"),
    resource: pi.physical,
    useArmor: !0
  },
  structure: {
    path: "system.monitors.structure.value",
    monitor: (a) => a.system.monitors.structure,
    iconChecked: F.fontAwesome("fas fa-car-crash"),
    iconUnchecked: F.fontAwesome("fas fa-car-alt"),
    iconHit: F.fontAwesome("fas fa-bahai"),
    resource: pi.structure
  },
  heat: {
    path: "system.monitors.heat.value",
    monitor: (a) => a.system.monitors.heat,
    iconChecked: F.fontAwesome("fas fa-fire"),
    iconUnchecked: F.fontAwesome("far fa-sun"),
    iconHit: F.fontAwesome("fas fa-temperature-high"),
    resource: pi.heat
  },
  criticals: {
    path: "system.hybrid.criticals.value",
    monitor: (a) => {
      var e;
      return ((e = a.system.hybrid) == null ? void 0 : e.criticals) ?? { value: 0, max: 0 };
    },
    iconChecked: F.fontAwesome("fas fa-bolt"),
    iconUnchecked: F.fontAwesome("far fa-dot-circle"),
    iconHit: F.fontAwesome("fas fa-exclamation-triangle"),
    resource: pi.structure
  },
  anarchy: {
    path: "system.counters.anarchy.value",
    monitor: (a) => ({
      value: a.system.counters.anarchy.value,
      max: 6
    }),
    iconChecked: F.iconPath(`${Oi}/anarchy-point.webp`, "checkbar-img"),
    iconUnchecked: F.iconPath(`${Oi}/anarchy-point-off.webp`, "checkbar-img"),
    resource: mt.anarchy
  },
  plot: {
    path: "system.counters.anarchy.value",
    monitor: (a) => {
      const e = a.system.counters.anarchy.value;
      return { value: e, max: e + 1 };
    },
    iconChecked: F.iconPath(`${Oi}/danger-point.webp`, "checkbar-img"),
    iconUnchecked: F.iconPath(`${Oi}/danger-point-off.webp`, "checkbar-img"),
    resource: mt.anarchy
  },
  sceneAnarchy: {
    path: "system.counters.edgePools.chaos.value",
    monitor: (a) => {
      const e = a.getEdgePoolValue(b.counters.edgePools.chaos), t = a.getAttributeValue(b.actorAttributes.edge);
      return { value: e, max: t };
    },
    iconChecked: F.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    iconUnchecked: F.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    resource: mt.edgePools.chaos
  },
  grit: {
    path: "system.counters.edgePools.grit.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(b.counters.edgePools.grit), max: a.getAttributeValue(b.actorAttributes.edge) }),
    iconChecked: F.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    iconUnchecked: F.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    resource: mt.edgePools.grit
  },
  insight: {
    path: "system.counters.edgePools.insight.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(b.counters.edgePools.insight), max: a.getAttributeValue(b.actorAttributes.edge) }),
    iconChecked: F.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    iconUnchecked: F.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    resource: mt.edgePools.insight
  },
  legend: {
    path: "system.counters.edgePools.legend.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(b.counters.edgePools.legend), max: a.getAttributeValue(b.actorAttributes.edge) }),
    iconChecked: F.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    iconUnchecked: F.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    resource: mt.edgePools.legend
  },
  credibility: {
    path: "system.counters.edgePools.credibility.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(b.counters.edgePools.credibility), max: a.getAttributeValue(b.actorAttributes.edge) }),
    iconChecked: F.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    iconUnchecked: F.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    resource: mt.edgePools.credibility
  },
  rumor: {
    path: "system.counters.edgePools.rumor.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(b.counters.edgePools.rumor), max: a.getAttributeValue(b.actorAttributes.edge) }),
    iconChecked: F.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    iconUnchecked: F.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    resource: mt.edgePools.rumor
  }
}, Ve = foundry.utils.mergeObject(vn, {});
class L {
  static init() {
    Handlebars.registerHelper("iconCheckbar", L.iconCheckbar), Handlebars.registerHelper("iconCheckbarHit", L.iconHit);
  }
  static hackCheckbars(e) {
    if (e) {
      const t = foundry.utils.mergeObject(vn, {});
      foundry.utils.mergeObject(t, e, { recursive: !0 }), foundry.utils.mergeObject(Ve, t, { overwrite: !0 });
    }
  }
  static iconCheckbar(e, t) {
    return t ? L.iconChecked(e) : L.iconUnchecked(e);
  }
  static iconChecked(e) {
    var t;
    return (t = Ve[e]) == null ? void 0 : t.iconChecked;
  }
  static iconUnchecked(e) {
    var t;
    return (t = Ve[e]) == null ? void 0 : t.iconUnchecked;
  }
  static iconHit(e) {
    var t, i;
    return ((t = Ve[e]) == null ? void 0 : t.iconHit) ?? ((i = Ve[e]) == null ? void 0 : i.iconChecked);
  }
  static useArmor(e) {
    var t;
    return (t = Ve[e]) == null ? void 0 : t.useArmor;
  }
  static max(e, t) {
    var s;
    const i = (s = Ve[t]) == null ? void 0 : s.monitor(e);
    return ((i == null ? void 0 : i.max) ?? 0) + ((i == null ? void 0 : i.maxBonus) ?? 0);
  }
  static value(e, t) {
    var s;
    const i = (s = Ve[t]) == null ? void 0 : s.monitor(e);
    return (i == null ? void 0 : i.value) ?? 0;
  }
  static resistance(e, t, i = void 0) {
    return L.resistanceDetail(e, t, i).value;
  }
  static resistanceDetail(e, t, i = void 0) {
    var l, c;
    const s = (l = Ve[t]) == null ? void 0 : l.monitor(e), r = L._resolveResistance(s == null ? void 0 : s.resistance, i), n = L._resolveResistance(s == null ? void 0 : s.resistanceBonus, i), o = i === void 0 ? 0 : Number(((c = s == null ? void 0 : s.resistanceBonusByType) == null ? void 0 : c[i]) ?? 0);
    return {
      value: r.value + n.value + o,
      damageType: i,
      source: r.source,
      bonusSource: n.source,
      bonusByType: o,
      usedType: r.source === "type" || n.source === "type" || o !== 0
    };
  }
  static _resolveResistance(e, t = void 0) {
    var r;
    if (typeof e == "number")
      return { value: e ?? 0, source: "legacy" };
    const i = t !== void 0 ? (r = e == null ? void 0 : e.byType) == null ? void 0 : r[t] : void 0;
    return i !== void 0 ? { value: Number(i) || 0, source: "type" } : { value: Number((e == null ? void 0 : e.default) ?? 0) || 0, source: "default" };
  }
  static newValue(e, t) {
    return e + (t ? 0 : 1);
  }
  static async switchMonitorCheck(e, t, i, s, r = void 0, n = void 0) {
    await L.setCounter(e, t, L.newValue(i, s), r, n);
  }
  static async addCounter(e, t, i, s = void 0) {
    if (i != 0) {
      const r = L.getCounterValue(e, t, s) ?? 0;
      await L.setCounter(e, t, r + i, s);
    }
  }
  static async setCounter(e, t, i, s = void 0, r = void 0) {
    switch (t) {
      case b.monitors.anarchy:
        return await L.setAnarchy(e, i);
      case b.monitors.sceneAnarchy:
        return await L.setSceneAnarchy(e, i);
    }
    return await L.setCheckbar(e, t, i);
  }
  static getCounterValue(e, t, i) {
    switch (t) {
      case b.monitors.anarchy:
        return L.getAnarchy(e, t);
    }
    return L.value(e, t);
  }
  static async setCheckbar(e, t, i) {
    if (i == L.getCounterValue(e, t))
      return;
    const s = Ve[t];
    if (s.path) {
      const r = L.max(e, t);
      if (r <= 0)
        return;
      await L._manageOverflow(s, e, t, i, r), i = Math.min(i, r), li.checkOutOfRange(s.resource, i, 0, r), await e.setCheckbarValue(s.path, i);
    }
  }
  static async _manageOverflow(e, t, i, s, r) {
    if (s > r) {
      const n = e.overflow ? e.overflow(t) : void 0, o = e.recomputeOverflow ? e.recomputeOverflow(s - r) : s - r;
      n && o > 0 && (L._notifyOverflow(t, i, o, n), await L.addCounter(t, n, o));
    }
  }
  static _notifyOverflow(e, t, i, s) {
    const r = ce(w.actor.monitors.overflow, {
      actor: e.name,
      monitor: w.actor.monitors[t],
      overflow: i,
      overflowMonitor: w.actor.monitors[s]
    });
    ui.notifications.warn(r);
  }
  static async _manageFatigueOverflow(e, t, i) {
    await L.addCounter(e, b.monitors.physical, t - i);
  }
  static async setAnarchy(e, t) {
    if (e.hasOwnAnarchy()) {
      if (e.hasGMAnarchy()) {
        await game.system.anarchy.gmAnarchy.setAnarchy(t), e.render();
        return;
      }
      await L._setAnarchyMonitor(e, b.monitors.anarchy, t);
    }
  }
  static async setSceneAnarchy(e, t) {
    await L._setAnarchyMonitor(e, b.monitors.sceneAnarchy, t);
  }
  static async _setAnarchyMonitor(e, t, i) {
    const s = L.value(e, t);
    await L.setCheckbar(e, t, i), game.user.isGM || L.notifyAnarchyChange(e, t, s, i);
  }
  static getAnarchy(e, t) {
    return !game.user.isGM && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) || t == mt.anarchy && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) ? 0 : L.value(e, t);
  }
  static notifyAnarchyChange(e, t, i, s) {
    Qe.blindMessageToGM({
      from: game.user.id,
      content: ce(
        w.gmManager.playerChangedAnarchy,
        {
          user: game.user.name,
          actor: e.name,
          monitor: w.actor.counters[t],
          from: i,
          to: s
        }
      )
    });
  }
}
const { loadTemplates: gl, renderTemplate: yl } = foundry.applications.handlebars, vr = {
  highlighted: ["far fa-times-circle", "fas fa-dice-one", "fas fa-dice-two", "fas fa-dice-three", "fas fa-dice-four", "fas fa-dice-five", "fas fa-dice-six"],
  dimmed: ["far fa-times-circle", "far fa-dice-one", "far fa-dice-two", "far fa-dice-three", "far fa-dice-four", "far fa-dice-five", "far fa-dice-six"]
};
class gt {
  static init() {
    Hooks.once("ready", async () => await this.onReady()), Handlebars.registerHelper("dice-cursor-array", (e, t) => gt.array(e ?? 0, t ?? 5)), Handlebars.registerHelper("dice-cursor-fas", (e, t) => gt.fasClass(e, t)), Handlebars.registerHelper("dice-cursor-active", (e, t) => gt.activeClass(e, t)), Handlebars.registerHelper("dice-cursor-color", (e, t) => gt.colorClass(e, t));
  }
  static async onReady() {
    await gl([
      "systems/mwd/templates/roll/parts/dice-cursor.hbs"
    ]);
  }
  static array(e, t) {
    if (e > t) throw `min>max: ${e} > ${t}`;
    return Array(t - e + 1).fill().map((i, s) => e + s);
  }
  static isActive(e, t) {
    return t <= e && e < 0 || 0 < e && e <= t;
  }
  static activeClass(e, t) {
    return gt.isActive(e, t) ? "active" : "inactive";
  }
  static fasClass(e, t) {
    const i = gt.isActive(e, t) ? vr.highlighted : vr.dimmed;
    return gt.$getFas(i, Math.abs(e));
  }
  static colorClass(e, t) {
    return e == 0 || !t ? e < 0 ? "fixed-dice-malus" : "fixed-dice-bonus" : e < 0 ? "variable-dice-malus" : "variable-dice-bonus";
  }
  static $getFas(e, t) {
    return e[t > 6 ? t % 6 : t];
  }
  static async diceCursor({ value: e, min: t, max: i, editable: s }) {
    return await yl("systems/mwd/templates/roll/parts/dice-cursor.hbs", {
      value: e,
      min: t,
      max: i,
      editable: s
    });
  }
}
const ke = {
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
}, Mr = "anarchy-", Mn = `${v}.${ke.ANARCHY_HACK}`, ba = {
  id: v,
  name: "Standard Shadowrun Anarchy",
  hack: {
    checkbars: () => Ve
  }
};
globalThis.ANARCHY_HOOKS = ke;
globalThis.SETTING_KEY_ANARCHY_HACK = Mn;
globalThis.SHADOWRUN_ANARCHY_NO_HACK = ba;
class ai {
  constructor() {
    this.hooks = [], this.hacks = {}, this.hackNames = {}, this.hookMethods = {}, this._register(ke.ANARCHY_HACK), Hooks.on(ke.ANARCHY_HACK, (e) => e(ba)), Hooks.on("updateSetting", async (e, t, i, s) => this.onUpdateSetting(e, t, i, s)), Hooks.once("ready", () => this.onReady()), Hooks.on("getSceneControlButtons", (e) => {
      var i;
      if (!((i = game.user) != null && i.isGM)) return;
      const t = Array.isArray(e) ? e.find((s) => s.name === "notes") : e == null ? void 0 : e.notes;
      if (!t) {
        const s = Array.isArray(e) ? e.map((r) => r.name) : Object.keys(e ?? {});
        console.warn("MWD: token controls not found. Available:", s);
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
          var s, r;
          return (r = (s = game.mwd) == null ? void 0 : s.gmGadget) == null ? void 0 : r.call(s);
        }
      });
    });
  }
  async onReady() {
    Hooks.callAll(ke.ANARCHY_HACK, (e) => {
      this.hacks[e.id] = e, this.hackNames[e.id] = e.name;
    }), game.settings.register(v, ke.ANARCHY_HACK, {
      scope: "world",
      name: w.settings.anarchyHack.name,
      hint: w.settings.anarchyHack.hint,
      config: !0,
      default: ba.id,
      choices: this.hackNames,
      type: String
    }), this.applySelectedAnarchyHack();
  }
  async onUpdateSetting(e, t, i, s) {
    e.key == Mn && this.applySelectedAnarchyHack();
  }
  applySelectedAnarchyHack() {
    const e = this.getSelectedHack();
    e && L.hackCheckbars(e.hack.checkbars());
  }
  selectHookMethod(e, t) {
    Hooks.callAll(t, (i, s) => {
      i == e && (this.hookMethods[t] = s);
    });
  }
  getSelectedHack() {
    return this.hacks[game.settings.get(v, ke.ANARCHY_HACK)];
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
    ai.instance()._register(e);
  }
  _register(e) {
    if (console.log(oe + "HooksManager.register", e), !e.startsWith(Mr))
      throw `For safety Anarchy Hooks names must be prefixed by '${Mr}'`;
    this.hooks.push(e);
  }
}
const Er = [
  b.itemType.assetModule,
  b.itemType.mechWeapon,
  b.itemType.personalWeapon,
  "weapon"
];
class Z {
  constructor() {
    this.modifiers = {
      groups: te.mapObjetToKeyValue(w.modifier.group, "key", "label"),
      roll: Z._buildGroupOptions("roll"),
      attribute: Z._buildGroupOptions("attribute"),
      monitor: Z._buildGroupOptions("monitor"),
      other: Z._buildGroupOptions("other")
    }, Hooks.once("ready", () => this.onReady());
  }
  static _buildGroupOptions(e) {
    switch (e) {
      case "attribute":
        return {
          label: w.modifier.group[e],
          effects: te.hbsAttributes.map((t) => ({ key: t.value, label: t.labelkey })),
          categories: []
        };
    }
    return {
      label: w.modifier.group[e],
      effects: te.mapObjetToKeyValue(w.modifier[e].effect, "key", "label"),
      categories: te.mapObjetToKeyValue(w.modifier[e].category, "key", "label")
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
    var i, s;
    switch (e) {
      case "group":
        return this.modifiers.groups;
      case "effect":
        return (i = this.modifiers[t.hash.group]) == null ? void 0 : i.effects;
      case "category":
        return (s = this.modifiers[t.hash.group]) == null ? void 0 : s.categories;
      case "subCategory":
        switch (t.hash.group) {
          case "roll":
            return this.getSelectRollSubCategories(t.hash.category);
          case "monitor": {
            switch (t.hash.category) {
              case "resistanceByType":
                return te.getDamageTypes().map((r) => ({ key: r.value, label: r.labelkey }));
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
        return te.getAttributes().map((i) => ({ key: i.value, label: i.labelkey }));
      case "skill":
        return game.system.anarchy.skills.getSkills().map((i) => ({ key: i.code, label: i.labelkey }));
      case "attributeAction":
        const t = he.all().map((i) => ({ key: i.code, label: i.labelkey }));
        return J.distinct(t.map((i) => i.key)).map((i) => t.find((s) => s.key == i));
    }
    return [];
  }
  getEnums() {
    return { modifiers: this.modifiers };
  }
  static buildRollModifiersFilter(e, t) {
    return (i) => {
      var s;
      if (i.group == "roll" && i.effect == t)
        switch (i.category) {
          case "attribute":
            return [e.attribute1, e.attribute2].includes(i.subCategory);
          case "skill":
            return i.subCategory == ((s = e.skill) == null ? void 0 : s.system.code);
          case "attributeAction":
            return i.subCategory == e.attributeAction || i.subCategory == he.getDefenseAttributeAction(e.defenseAction);
        }
      return !1;
    };
  }
  static computeRollModifiers(e, t, i) {
    const s = Z.buildRollModifiersFilter(t, i), r = (c) => c.group == "roll" && c.effect == i && s(c), n = Z._activeItems(e).map((c) => Z.itemModifiers(c, r)).reduce((c, u) => c.concat(u), []).sort(J.descending((c) => c.modifier.value)), o = Z.$sumAssetModuleModifiers(n.filter((c) => Er.includes(c.item.type)).map((c) => c.modifier.value)), l = J.sumValues(n.filter((c) => !Er.includes(c.item.type)).map((c) => c.modifier.value));
    return {
      value: o + l,
      sources: n
    };
  }
  static $sumAssetModuleModifiers(e) {
    const t = e.find((r) => r > 3) ?? 0, i = J.sumValues(e.filter((r) => r < 0)), s = Math.min(3, J.sumValues(e.filter((r) => r > 0 && r <= 3)));
    return i + Math.max(s, t);
  }
  static computeModifiers(e, t, i = void 0, s = void 0) {
    const r = Z._createFilter(t, i, s), n = Z._activeItems(e).map((l) => Z.itemModifiers(l, r)).reduce((l, c) => l.concat(c), []);
    return {
      value: J.sumValues(n, (l) => l.modifier.value),
      sources: n
    };
  }
  static sumMonitorModifiers(e, t, i, s = void 0) {
    return Z.sumModifiers(Z._activeItems(e), "monitor", t, i, s);
  }
  static sumModifiers(e, t, i, s, r = void 0) {
    const n = Z._createFilter(t, i, s, r), o = Z._activeItems(e).map((l) => Z.itemModifiers(l, n)).reduce((l, c) => l.concat(c), []);
    return J.sumValues(o, (l) => l.modifier.value);
  }
  static _createFilter(e, t, i, s = void 0) {
    return (r) => r.group == e && r.effect == (t ?? r.effect) && r.category == (i ?? r.category) && (s == null ? !0 : r.subCategory == s);
  }
  static countModifiers(e, t, i = void 0, s = void 0) {
    const r = Z._createFilter(t, i, s);
    return Z._activeItems(e).map((o) => Z.itemModifiers(o, r)).reduce((o, l) => o.concat(l), []).count;
  }
  static itemModifiers(e, t) {
    return Z._listItemModifiers(e, t).map((i) => Z._itemModifier(e, i));
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
const { loadTemplates: Qs, renderTemplate: fp } = foundry.applications.handlebars, re = {
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
}, Cr = 4, bl = [
  // attribute1
  {
    code: "attribute1",
    options: {
      order: 1,
      category: re.pool,
      hbsTemplateRoll: `${q}/roll/parts/select-attribute.hbs`
    },
    condition: (a) => Object.values(Oe.rollType).includes(a.mode),
    isUsed: (a) => !0,
    factory: (a) => {
      var t;
      const e = a.attribute1 ?? ((t = a.skill) == null ? void 0 : t.system.attribute);
      return {
        labelkey: e ? w.attributes[e] : w.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: a.skill },
        selected: e,
        choices: te.getAttributes((i) => a.attributes.includes(i))
      };
    }
  },
  // attribute2
  {
    code: "attribute2",
    options: {
      order: 1,
      category: re.pool,
      hbsTemplateRoll: `${q}/roll/parts/select-attribute.hbs`,
      hbsTemplateChat: `${q}/chat/parts/pool-attribute2.hbs`
    },
    condition: (a) => [Oe.rollType.attribute, Oe.rollType.attributeAction, Oe.rollType.defense].includes(a.mode),
    isUsed: (a) => a.used,
    onChecked: (a, e) => a.used = !!e,
    factory: (a) => {
      const e = a.attribute2;
      return {
        labelkey: e ? w.attributes[e] : w.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: Oe.rollType.attribute == a.mode },
        selected: e,
        choices: te.getAttributes((t) => a.attributes.includes(t))
      };
    }
  },
  // skill
  {
    code: "skill",
    options: {
      flags: {},
      order: 3,
      category: re.pool,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`
    },
    condition: (a) => ["skill", "weapon"].includes(a.mode),
    factory: (a) => {
      var t, i, s, r;
      const e = (t = a.actor) != null && t.getSkillRating ? a.actor.getSkillRating(a.skill) : ((s = (i = a.skill) == null ? void 0 : i.system) == null ? void 0 : s.value) ?? 0;
      return {
        label: (r = a.skill) == null ? void 0 : r.name,
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
      category: re.pool,
      hbsTemplateRoll: `${q}/roll/parts/check-option.hbs`
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
      category: re.pool,
      value: 0,
      labelkey: w.common.roll.modifiers.social.credibility,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`
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
      category: re.pool,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 4
    },
    factory: (a) => Xt.computeRollModifiers(re.pool, a)
  },
  // wounds
  {
    code: "wounds",
    options: {
      flags: { optional: !0 },
      order: 10,
      category: re.pool,
      labelkey: w.common.roll.modifiers.wounds,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`
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
      category: re.pool,
      value: 0,
      labelkey: w.common.roll.modifiers.other,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
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
      category: re.glitch,
      value: 0,
      labelkey: w.common.roll.modifiers.glitch,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${q}/chat/parts/glitch.hbs`,
      min: 0,
      max: 5
    },
    isUsed: (a) => a.value > 0,
    factory: (a) => {
      const e = a.actor.getWounds(), t = Xt.computeRollModifiers(re.glitch, a);
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
      category: re.glitch,
      value: 0,
      labelkey: w.common.roll.modifiers.social.rumor,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${q}/chat/parts/glitch.hbs`,
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
      category: re.reroll,
      labelkey: w.common.roll.modifiers.reroll,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: Cr
    },
    factory: (a) => {
      const e = Xt.computeRollModifiers(re.reroll, a), t = Xt.computeRollModifiers(re.rerollMax, a);
      return foundry.utils.mergeObject(e, {
        max: Cr + Math.max(0, t.value ?? 0)
      });
    }
  },
  // reduction from opponent
  {
    code: "reduced",
    options: {
      order: 29,
      category: re.pool,
      labelkey: w.common.roll.modifiers.reduced,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
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
      category: re.rerollForced,
      labelkey: w.common.roll.modifiers.rerollForced,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 0
    },
    factory: (a) => {
      var t;
      const e = Xt.computeRollModifiers(re.successReroll, a);
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
      category: re.pool,
      value: 0,
      min: 0,
      max: 3,
      labelkey: w.common.roll.modifiers.anarchyDisposition,
      hbsTemplateRoll: `${q}/roll/parts/check-option.hbs`
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
      category: re.risk,
      value: 0,
      labelkey: w.common.roll.modifiers.anarchyRisk,
      hbsTemplateRoll: `${q}/roll/parts/check-option.hbs`,
      hbsTemplateChat: `${q}/chat/parts/anarchy-risk.hbs`
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
      category: re.edge,
      labelkey: w.common.roll.modifiers.edge,
      hbsTemplateRoll: `${q}/roll/parts/check-option.hbs`
    },
    isUsed: (a) => a.used,
    condition: (a) => a.options.canUseEdge && a.actor.getRemainingEdge(),
    onChecked: (a, e) => {
      a.used = e, a.value = e ? 1 : 0;
    },
    factory: (a) => {
      var s;
      const t = [
        b.counters.edgePools.grit,
        b.counters.edgePools.chaos,
        b.counters.edgePools.insight,
        b.counters.edgePools.rumor,
        b.counters.edgePools.legend,
        b.counters.edgePools.credibility
      ].map((r) => {
        const n = a.actor.getEdgePoolValue(r);
        return {
          code: r,
          label: w.actor.counters.edgePools[r] ?? r,
          value: n
        };
      }), i = ((s = t.find((r) => r.value > 0)) == null ? void 0 : s.code) ?? b.counters.edgePools.grit;
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
      category: re.opponentPool,
      labelkey: w.common.roll.modifiers.opponentPool,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => Xt.computeRollModifiers(re.opponentPool, a),
    condition: (a) => !a.attributeAction
  },
  // force opponent rerolls
  {
    code: "opponentReroll",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: re.opponentReroll,
      value: 0,
      labelkey: w.common.roll.modifiers.opponentReroll,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => Xt.computeRollModifiers(re.opponentReroll, a),
    condition: (a) => !a.attributeAction
  }
];
class Xt {
  constructor() {
    this.registeredParameters = {}, ai.register(ke.REGISTER_ROLL_PARAMETERS), ai.register(ke.MODIFY_ROLL_PARAMETER), Hooks.on(ke.MODIFY_ROLL_PARAMETER, (e) => this._validate(e)), Hooks.once(ke.REGISTER_ROLL_PARAMETERS, (e) => bl.forEach(
      (t) => e(t)
    )), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(ke.REGISTER_ROLL_PARAMETERS, async (t) => {
      Hooks.callAll(ke.MODIFY_ROLL_PARAMETER, t), t.ignore || await this._register(t);
    });
    const e = J.distinct([].concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateRoll)).concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateChat)).filter((t) => typeof t == "string" && t.length > 0));
    await Qs(J.distinct(e)), await Qs([`${q}/roll/parts/parameter-label.hbs`]);
  }
  _validate(e) {
    e.code || (console.error(`${oe} RollParameter does not have a code`, e), e.ignore = !0);
  }
  async _register(e) {
    if (this.registeredParameters[e.code]) {
      console.error(`${oe} RollParameter ${e.code} is already registered`, e);
      return;
    }
    e.onChecked || (e.onChecked = (t, i) => t.used = i), e.onValue = (t, i) => t.value = i, this.registeredParameters[e.code] = e;
  }
  async _optionalLoadTemplate(e) {
    e && await Qs([e]);
  }
  build(e) {
    return Object.values(this.registeredParameters).filter((t) => !t.condition || t.condition(e)).map((t) => this._computeParameter(t, e));
  }
  compute(e) {
    const t = e.filter((r) => this.isParameterUsed(r)), i = J.classify(t, (r) => r.category), s = {};
    return Object.values(i).forEach((r) => s[r[0].category] = J.sumValues(r, (n) => n.value ?? (n.optional ? 1 : 0))), s;
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
    const i = (r) => {
      var n;
      return !((n = r.isWeapon) != null && n.call(r)) || t.weapon && r.id == t.weapon.id;
    }, s = t.actor.items.filter(i);
    return Z.computeRollModifiers(s, t, e);
  }
}
const { ApplicationV2: Sl, HandlebarsApplicationMixin: Al } = foundry.applications.api, { loadTemplates: wl, renderTemplate: Tl } = foundry.applications.handlebars;
var Ds, En;
const Ee = class Ee extends Al(Sl) {
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
    await wl([
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
    const i = foundry.utils.mergeObject(Ee.prepareActorRoll(e), {
      mode: Oe.rollType.attribute,
      attribute1: t
    });
    await Ee.create(i);
  }
  static async rollAttributeAction(e, t) {
    const i = foundry.utils.mergeObject(Ee.prepareActorRoll(e), {
      mode: Oe.rollType.attributeAction,
      attributeAction: t.code,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e)
    });
    await Ee.create(i);
  }
  static async rollSkill(e, t, i) {
    const s = foundry.utils.mergeObject(Ee.prepareActorRoll(e), {
      mode: Oe.rollType.skill,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? b.actorAttributes.reflexes,
      specialization: i
    });
    await Ee.create(s);
  }
  static async rollWeapon(e, t, i, s) {
    const r = foundry.utils.mergeObject(Ee.prepareActorRoll(e), {
      mode: Oe.rollType.weapon,
      weapon: i,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? e.getPhysicalAgility(),
      specialization: void 0,
      targeting: s
    });
    await Ee.create(r);
  }
  static async rollDefense(e, t, i) {
    const s = foundry.utils.mergeObject(Ee.prepareActorRoll(e), {
      mode: Oe.rollType.defense,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e),
      defenseAction: t.code,
      attackRoll: i.attackRoll,
      tokenId: i.defenderTokenId,
      choiceChatMessageId: i.choiceChatMessageId
    });
    await Ee.create(s);
  }
  static async itemAttributeRoll(e, t) {
    const i = foundry.utils.mergeObject(Ee.prepareActorRoll(e.actor), {
      mode: Oe.rollType.attribute,
      item: e,
      attribute1: t,
      attributes: e.actor.getUsableAttributes(e)
    });
    await Ee.create(i);
  }
  static async create(e) {
    var n;
    const t = M(n = Ee, Ds, En).call(n, e), i = await Tl(`${q}/roll/roll-dialog-title.hbs`, t), s = {
      id: `roll-dialog-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Ee.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new Ee({ roll: t }, s).render({ force: !0 });
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
      const s = this._getRollParameter(i), r = this._getEventItem(i, this.roll.actor), n = i.currentTarget.value, o = this.roll.actor.getAttributeValue(n, r);
      this.roll[s.code] = n, await this._setParameterSelectedOption(s, n, o);
    }), this.html.find(".check-optional").click(async (i) => {
      const s = this._getRollParameter(i);
      s.onChecked(s, i.currentTarget.checked), s.category == re.pool && await this._updateParameterValue(s, s.value), s.code == "edge" && this.html.find(`.parameter[data-parameter-code='${s.code}'] .edge-pool-select`).prop("disabled", !s.used);
    }), this.activateDiceParameterClick(), this.html.find("input.parameter-value:not(:disabled)").on("input", async (i) => {
      const s = this._getRollParameter(i), r = Number.parseInt(i.currentTarget.value) ?? 0;
      await this._updateParameterValue(s, r);
    }), this.html.find(".select-option-parameter").change(async (i) => {
      const s = this._getRollParameter(i), r = i.currentTarget.value, n = Number.parseInt(r);
      await this._setParameterSelectedOption(s, r, n);
    }), this.html.find(".edge-pool-select").change(async (i) => {
      const s = this._getRollParameter(i);
      s.pool = i.currentTarget.value;
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
        const s = Number.parseInt(this.html.find(e.currentTarget).attr("data-dice")) ?? 0, r = t.value != s || s == 0 ? s : s > 0 ? s - 1 : s + 1;
        await this._updateParameterValue(t, r);
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
    return await gt.diceCursor({
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
Ds = new WeakSet(), En = function(e) {
  const t = game.system.anarchy.rollParameters.build(e).sort(J.ascending((i) => i.order ?? 200));
  return foundry.utils.mergeObject(e, {
    ENUMS: te.getEnums((i) => e.attributes.includes(i)),
    ANARCHY: w,
    parameters: t
  });
}, ye(Ee, Ds), R(Ee, "PARTS", {
  body: {
    template: `${q}/roll/roll-dialog.hbs`
  }
});
let nt = Ee;
const Ya = 2, Sa = "skillSpecializationCatalog", kl = [
  { key: "running", label: "Running" },
  { key: "jumping", label: "Jumping" },
  { key: "swimming", label: "Swimming" },
  { key: "climbing", label: "Climbing" },
  { key: "acrobatics", label: "Acrobatics" }
], Cn = /* @__PURE__ */ new Set(), dt = [
  // Strength
  { code: "athletics", label: "Athletics", attribute: "strength", icon: `${X}/athletics.svg`, domains: ["physical"], specializations: kl },
  { code: "heavyWeapons", label: "Heavy Weapons", attribute: "strength", icon: `${X}/heavy-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  // Reflexes
  { code: "escapeArtist", label: "Escape Artist", attribute: "reflexes", icon: `${X}/escape-artist.svg`, domains: ["physical"] },
  { code: "gunnery", label: "Gunnery", attribute: "reflexes", icon: `${X}/vehicle-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "meleeCombat", label: "Melee Combat", attribute: "reflexes", icon: `${X}/close-combat.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "piloting", label: "Piloting", attribute: "reflexes", icon: `${X}/piloting-ground-steering-wheel.svg`, domains: ["physical"] },
  { code: "projectileWeapons", label: "Projectile Weapons", attribute: "reflexes", icon: `${X}/projectile-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "firearms", label: "Firearms", attribute: "reflexes", icon: `${X}/firearms.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "stealth", label: "Stealth", attribute: "reflexes", icon: `${X}/stealth.svg`, domains: ["physical"] },
  { code: "zeroGOps", label: "Zero-G Operations", attribute: "reflexes", icon: `${X}/fly.svg`, domains: ["physical"] },
  // Intelligence
  { code: "art", label: "Art", attribute: "intelligence", icon: `${X}/art.svg`, domains: ["mental"] },
  { code: "artillery", label: "Artillery", attribute: "intelligence", icon: `${X}/artillery.svg`, domains: ["mental"] },
  { code: "systemOps", label: "System Operations", attribute: "intelligence", icon: `${X}/electronics.svg`, domains: ["mental"] },
  { code: "computers", label: "Computers", attribute: "intelligence", icon: `${X}/hacking.svg`, domains: ["mental"] },
  { code: "demolitions", label: "Demolitions", attribute: "intelligence", icon: `${X}/demolition.svg`, domains: ["mental"] },
  { code: "medTech", label: "Medtech", attribute: "intelligence", icon: `${X}/biotech.svg`, domains: ["mental"] },
  { code: "science", label: "Science", attribute: "intelligence", icon: `${X}/skills.svg`, domains: ["mental"] },
  { code: "perception", label: "Perception", attribute: "intelligence", icon: `${X}/skills.svg`, domains: ["mental"] },
  { code: "tactics", label: "Tactics", attribute: "intelligence", icon: `${X}/skills.svg`, domains: ["mental"] },
  { code: "technician", label: "Technician", attribute: "intelligence", icon: `${X}/engineering.svg`, domains: ["mental"] },
  { code: "tracking", label: "Tracking", attribute: "intelligence", icon: `${X}/tracking.svg`, domains: ["physical", "mental"] },
  { code: "navigation", label: "Navigation", attribute: "intelligence", icon: `${X}/piloting-other.svg`, domains: ["mental"] },
  // Guts
  { code: "administration", label: "Administration", attribute: "willpower", icon: `${X}/knowledge.svg`, domains: ["social", "mental"] },
  { code: "animalHandling", label: "Animal Handling", attribute: "willpower", icon: `${X}/animals.svg`, domains: ["physical", "mental"] },
  { code: "survival", label: "Survival", attribute: "willpower", icon: `${X}/survival.svg`, domains: ["physical", "mental"] },
  // Charisma
  { code: "acting", label: "Acting", attribute: "charisma", icon: `${X}/con-art.svg`, domains: ["social"] },
  { code: "disguise", label: "Disguise", attribute: "charisma", icon: `${X}/disguise.svg`, domains: ["social", "mental"] },
  { code: "leadership", label: "Leadership", attribute: "charisma", icon: `${X}/psychology.svg`, domains: ["social"] },
  { code: "negotiation", label: "Negotiation", attribute: "charisma", icon: `${X}/negotiation.svg`, domains: ["social"] },
  { code: "etiquette", label: "Etiquette", attribute: "charisma", icon: `${X}/etiquette.svg`, domains: ["social"] },
  { code: "streetwise", label: "Streetwise", attribute: "charisma", icon: `${X}/etiquette2.svg`, domains: ["social"] },
  { code: "intimidation", label: "Intimidation", attribute: "charisma", icon: `${X}/intimidation.svg`, domains: ["social", "mental"] }
].map(vl);
for (const a of dt)
  Cn.add(a.code);
function vl(a) {
  return {
    ...a,
    label: a.label ?? a.code,
    icon: a.icon ?? `${Ji}/icons/skills/skills.svg`,
    specializations: Ja(a.specializations)
  };
}
function Qa(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function Ja(a = []) {
  const e = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((t) => {
    const i = Qa((t == null ? void 0 : t.key) ?? (t == null ? void 0 : t.label) ?? t);
    return !i || e.has(i) ? null : (e.add(i), {
      key: i,
      label: String((t == null ? void 0 : t.label) ?? (t == null ? void 0 : t.key) ?? t ?? i).trim() || i
    });
  }).filter(Boolean);
}
function Ml(a = []) {
  const e = new Error(a[0] ?? "Invalid skill specialization data.");
  return e.validationErrors = a, e;
}
function El() {
  const a = {};
  for (const e of dt) {
    const t = (Array.isArray(e.specializations) ? e.specializations : []).map((i) => String((i == null ? void 0 : i.label) ?? "").trim()).filter(Boolean);
    t.length && (a[e.code] = t);
  }
  return a;
}
const Cl = Object.freeze(El());
function Pl(a, e = [], { strict: t = !1, errors: i = [] } = {}) {
  var r, n;
  if (!Array.isArray(e)) {
    if (t) {
      const o = ((r = Aa(a)) == null ? void 0 : r.label) ?? a;
      i.push(`${o}: expected an array of specialization labels.`);
    }
    return [];
  }
  const s = [];
  for (const o of e) {
    const l = String(o ?? "").trim();
    if (!l) {
      if (t) {
        const c = ((n = Aa(a)) == null ? void 0 : n.label) ?? a;
        i.push(`${c}: specialization labels cannot be blank.`);
      }
      continue;
    }
    s.push(l);
  }
  return Ja(s).map((o) => o.label);
}
function Aa(a) {
  return dt.find((e) => e.code === a);
}
function Pn(a, { strict: e = !1 } = {}) {
  const t = a && typeof a == "object" && !Array.isArray(a) ? a : {}, i = [], s = {};
  for (const [r, n] of Object.entries(t)) {
    if (!Cn.has(r)) {
      e && i.push(`Unknown skill code "${r}".`);
      continue;
    }
    const o = Pl(r, n, { strict: e, errors: i });
    o.length && (s[r] = o);
  }
  if (e && i.length) throw Ml(i);
  return Object.fromEntries(
    dt.map((r) => [r.code, s[r.code]]).filter(([, r]) => Array.isArray(r) && r.length)
  );
}
function Nl() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${v}.${Sa}`))
      return game.settings.get(v, Sa);
  } catch {
  }
  return Dn();
}
function Nn() {
  const a = Pn(Nl(), { strict: !1 });
  return Object.fromEntries(
    Object.entries(a).map(([e, t]) => [
      e,
      Ja(t)
    ])
  );
}
function Rn(a = [], { allowedKeys: e = null } = {}) {
  const t = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((i) => Qa(i)).filter((i) => !i || t.has(i) || e && !e.has(i) ? !1 : (t.add(i), !0));
}
function et(a) {
  const e = Aa(a);
  if (e)
    return {
      ...e,
      specializations: ri(e.code)
    };
}
function vs() {
  const a = Nn();
  return [...dt].map((e) => ({
    ...e,
    specializations: [...a[e.code] ?? []]
  })).sort((e, t) => e.label.localeCompare(t.label));
}
function ri(a) {
  return [...Nn()[a] ?? []];
}
function Xa(a, e) {
  const t = Qa(e);
  if (t)
    return ri(a).find((i) => i.key === t);
}
function Rl(a, e) {
  var t;
  return ((t = Xa(a, e)) == null ? void 0 : t.label) ?? "";
}
function Dn() {
  return foundry.utils.deepClone(Cl);
}
function $s(a, { strict: e = !1 } = {}) {
  return Pn(a, { strict: e });
}
function Ms(a = []) {
  return Rn(a);
}
function Dl(a, e = []) {
  const t = new Set(ri(a).map((s) => s.key)), i = new Set(Rn(e, { allowedKeys: t }));
  return ri(a).filter((s) => i.has(s.key)).map((s) => s.key);
}
function wa(a, e) {
  var t, i;
  return Ms(
    ((i = (t = a == null ? void 0 : a.skills) == null ? void 0 : t[e]) == null ? void 0 : i.specializations) ?? []
  );
}
function xs(a, e) {
  return Dl(
    e,
    wa(a, e)
  );
}
function In(a, e) {
  const t = new Set(xs(a, e));
  return ri(e).filter((i) => t.has(i.key));
}
function Il(a) {
  const e = Math.ceil(a.length / 2);
  return { left: a.slice(0, e), right: a.slice(e) };
}
function Ol(a) {
  var e, t;
  a.skills ?? (a.skills = {});
  for (const i of dt) {
    const s = (e = a.skills)[t = i.code] ?? (e[t] = {});
    s.rating == null && (s.rating = 0), s.bonus == null && (s.bonus = 0), s.specializations = Ms(s.specializations);
  }
}
function On(a, { bonusBySkill: e = null } = {}) {
  const t = vs(), { left: i, right: s } = Il(t), r = (n) => {
    var g, S, T, k, P, I;
    const o = n.code, l = n.attribute, c = Number(((S = (g = a == null ? void 0 : a.skills) == null ? void 0 : g[o]) == null ? void 0 : S.rating) ?? 0), u = Number(((k = (T = a == null ? void 0 : a.attributes) == null ? void 0 : T[l]) == null ? void 0 : k.value) ?? 0), d = Number(((I = (P = a == null ? void 0 : a.skills) == null ? void 0 : P[o]) == null ? void 0 : I.bonus) ?? 0), p = Number((e == null ? void 0 : e[o]) ?? 0), m = d + p, f = In(a, o), y = ri(o).filter((O) => !f.some((x) => x.key === O.key)), h = u + c + m;
    return {
      code: o,
      label: n.label,
      icon: n.icon,
      attribute: l,
      attributeLabel: te != null && te.localizeAttribute ? te.localizeAttribute(l) : l,
      rating: c,
      base: u,
      bonus: m,
      total: h,
      rollPayload: JSON.stringify({ intent: "skill", key: o }),
      canAddSpecialization: y.length > 0,
      specializations: f.map((O) => ({
        ...O,
        bonus: Ya,
        rollPayload: JSON.stringify({
          intent: "skill",
          key: o,
          specializationKey: O.key,
          specializationLabel: O.label
        })
      })),
      // Input wiring paths (so templates don’t concat strings themselves)
      pathRating: `system.skills.${o}.rating`,
      pathBonus: `system.skills.${o}.bonus`
    };
  };
  return {
    left: i.map(r),
    right: s.map(r)
  };
}
const Ti = "lifeModuleCatalog", Bs = Object.freeze([
  { moduleType: "faction", label: "Faction" },
  { moduleType: "childhood", label: "Childhood" },
  { moduleType: "higherEducation", label: "Higher Education" },
  { moduleType: "realLife", label: "Real Life" }
]), _l = Object.freeze(
  Object.fromEntries(Bs.map((a) => [a.moduleType, a.label]))
), Ll = new Set(Bs.map((a) => a.moduleType)), $l = /* @__PURE__ */ new Set(["skill", "edgePool"]), Za = Object.freeze({
  grit: "Grit",
  chaos: "Chaos",
  insight: "Insight",
  rumor: "Rumor",
  legend: "Legend",
  credibility: "Credibility"
}), _n = Object.freeze(Object.keys(Za)), xl = Object.freeze({
  skill: "Skill",
  edgePool: "Edge Pool"
}), Bl = Object.freeze(jl()), Fl = Object.freeze(ql()), zl = /* @__PURE__ */ new Set(["artillery", "gunnery", "piloting", "heavyWeapons"]), Wl = /* @__PURE__ */ new Set([
  "artillery",
  "gunnery",
  "heavyWeapons",
  "meleeCombat",
  "piloting",
  "projectileWeapons",
  "firearms"
]), Ul = Object.freeze(
  dt.map((a) => a.code).filter((a) => !Wl.has(a))
), Hl = Object.freeze(ci([
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
        ...Ul.map((a) => ({ type: "skill", value: a })),
        ..._n.map((a) => ({ type: "edgePool", value: a }))
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
    skillChoices: dt.map((a) => a.code).filter((a) => !zl.has(a)),
    excludesAny: [
      "higher-education-military-enlistment",
      "higher-education-military-academy",
      "higher-education-family-training",
      "higher-education-officer-candidate-school"
    ]
  }
], { strict: !1 }));
function jl() {
  const a = /* @__PURE__ */ new Map();
  for (const e of dt) {
    const t = String(e.code ?? "").trim(), i = String(e.label ?? "").trim();
    t && (a.set(t.toLowerCase(), t), i && a.set(i.toLowerCase(), t));
  }
  return a;
}
function ql() {
  const a = /* @__PURE__ */ new Map();
  for (const [e, t] of Object.entries(Za))
    a.set(e.toLowerCase(), e), a.set(t.toLowerCase(), e), a.set(`${t.toLowerCase()} pool`, e);
  return a;
}
function Gl(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid life module data.");
  return t.validationErrors = e, t;
}
function Ln(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
function Xi(a) {
  return String(a ?? "").trim().toLowerCase().replace(/['\u2019]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function Fs(a) {
  const e = String(a ?? "").trim();
  return Ll.has(e) ? e : "";
}
function zs(a) {
  const e = String(a ?? "").trim();
  return e ? Bl.get(e.toLowerCase()) ?? "" : "";
}
function Vl(a) {
  const e = String(a ?? "").trim();
  return e ? Fl.get(e.toLowerCase()) ?? "" : "";
}
function Kl(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const s = /* @__PURE__ */ new Set(), r = [];
  for (const n of Ln(a)) {
    const o = zs(n);
    if (!o) {
      e && t.push(`${i}: unknown skill "${n}".`);
      continue;
    }
    s.has(o) || (s.add(o), r.push(o));
  }
  return r;
}
function Pr(a) {
  const e = /* @__PURE__ */ new Set();
  return Ln(a).map(Xi).filter((t) => !t || e.has(t) ? !1 : (e.add(t), !0));
}
function Nr(a = [], e = /* @__PURE__ */ new Map()) {
  return a.map((t) => {
    var i;
    return ((i = e.get(t)) == null ? void 0 : i.label) ?? t;
  });
}
function Pi(a = {}) {
  return `${a.type}:${a.value}`;
}
function Yl(a) {
  var e;
  return ((e = et(a)) == null ? void 0 : e.label) ?? a;
}
function $n(a) {
  return Za[a] ?? a;
}
function Ql(a) {
  return xl[a] ?? a;
}
function Jl(a = {}, { includeTypePrefix: e = !1 } = {}) {
  const t = String((a == null ? void 0 : a.type) ?? "").trim(), i = String((a == null ? void 0 : a.value) ?? "").trim();
  if (!t || !i) return "";
  const s = t === "skill" ? Yl(i) : `${$n(i)} Pool`;
  return e ? `${Ql(t)}: ${s}` : s;
}
function Vi(a = {}, { includeBonusText: e = !1, includeTypePrefix: t = !1 } = {}) {
  const i = Jl(a, { includeTypePrefix: t });
  return i ? e ? a.type === "skill" ? `+1 ${i} rolls` : `+1 ${i}` : i : "";
}
function Xl(a) {
  const e = String(a ?? "").trim(), t = e.indexOf(":");
  return t < 0 ? null : {
    type: e.slice(0, t).trim(),
    value: e.slice(t + 1).trim()
  };
}
function Zl(a, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: s = "Bonus" } = {}) {
  const r = typeof a == "string" ? Xl(a) : a, n = String((r == null ? void 0 : r.type) ?? "").trim(), o = String((r == null ? void 0 : r.value) ?? "").trim();
  if (!$l.has(n))
    return e && t.push(`${i} ${s}: unknown bonus type "${n || a}".`), null;
  const l = n === "skill" ? zs(o) : Vl(o);
  return l ? {
    type: n,
    value: l
  } : (e && t.push(`${i} ${s}: unknown ${n === "skill" ? "skill" : "edge pool"} "${o}".`), null);
}
function Ta(a, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: s = "Bonus" } = {}) {
  const r = /* @__PURE__ */ new Set(), n = [], o = Array.isArray(a) ? a : [];
  for (const l of o) {
    const c = Zl(l, { strict: e, errors: t, prefix: i, grantLabel: s });
    if (!c) continue;
    const u = Pi(c);
    r.has(u) || (r.add(u), n.push(c));
  }
  return n;
}
function xn(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const s = Kl(a, { strict: e, errors: t, prefix: i });
  return s.length ? [{
    id: "skill",
    label: "",
    choices: s.map((r) => ({ type: "skill", value: r }))
  }] : [];
}
function ec(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const s = String(a ?? "").trim();
  return s ? s.split(";").map((n) => n.trim()).filter(Boolean).map((n, o) => {
    const l = `Bonus ${o + 1}`, c = Ta(
      n.split("|").map((u) => u.trim()).filter(Boolean),
      { strict: e, errors: t, prefix: i, grantLabel: l }
    );
    return {
      id: `grant-${o + 1}`,
      label: "",
      choices: c
    };
  }).filter((n) => n.choices.length) : [];
}
function Bn(a, e = "grant") {
  return Xi(a) || e;
}
function tc(a, e, { strict: t = !1, errors: i = [], prefix: s = "Entry" } = {}) {
  const r = `grant-${e + 1}`, n = `Bonus ${e + 1}`;
  if (typeof a == "string") {
    const u = Ta(
      a.split("|").map((d) => d.trim()).filter(Boolean),
      { strict: t, errors: i, prefix: s, grantLabel: n }
    );
    return u.length ? { id: r, label: "", choices: u } : null;
  }
  const o = Bn(a == null ? void 0 : a.id, r), l = String((a == null ? void 0 : a.label) ?? "").trim(), c = Ta(a == null ? void 0 : a.choices, { strict: t, errors: i, prefix: s, grantLabel: n });
  return c.length ? { id: o, label: l, choices: c } : (t && i.push(`${s} ${n}: define at least one bonus choice.`), null);
}
function ic(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  if (Array.isArray(a)) {
    if (a.every((r) => typeof r == "string" && !String(r).includes(":")))
      return xn(a, { strict: e, errors: t, prefix: i });
    const s = /* @__PURE__ */ new Set();
    return a.map((r, n) => tc(r, n, { strict: e, errors: t, prefix: i })).filter((r) => r ? s.has(r.id) ? (e && t.push(`${i}: duplicate bonus id "${r.id}".`), !1) : (s.add(r.id), !0) : !1);
  }
  return typeof a == "string" ? ec(a, { strict: e, errors: t, prefix: i }) : [];
}
function sc(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => (Array.isArray(e == null ? void 0 : e.choices) ? e.choices : []).map((i) => `${i.type}:${i.value}`).join("|")).filter(Boolean).join("; ");
}
function er() {
  return foundry.utils.deepClone(Hl);
}
function Ni(a) {
  return _l[a] ?? (String(a ?? "").trim() || "Life Module");
}
function Fn() {
  return Bs.map((a) => ({
    value: a.moduleType,
    label: a.label
  }));
}
function ci(a = [], { strict: e = !1 } = {}) {
  const t = Array.isArray(a) ? a : [], i = [], s = /* @__PURE__ */ new Set(), r = t.map((o, l) => {
    const c = `Entry ${l + 1}`, u = String((o == null ? void 0 : o.label) ?? "").trim(), d = Xi((o == null ? void 0 : o.id) ?? u), p = Fs(o == null ? void 0 : o.moduleType), m = (o == null ? void 0 : o.grants) != null ? ic(o.grants, { strict: e, errors: i, prefix: c }) : xn(o == null ? void 0 : o.skillChoices, { strict: e, errors: i, prefix: c }), f = Pr(o == null ? void 0 : o.requiresAny), y = Pr(o == null ? void 0 : o.excludesAny);
    return !d && e && i.push(`${c}: id cannot be blank.`), !u && e && i.push(`${c}: label cannot be blank.`), !p && e && i.push(`${c}: choose a valid module type.`), !m.length && e && i.push(`${c}: choose at least one bonus.`), d && s.has(d) && e && i.push(`${c}: duplicate id "${d}".`), d && s.add(d), {
      id: d,
      label: u,
      moduleType: p,
      grants: m,
      requiresAny: f,
      excludesAny: y
    };
  }), n = new Map(r.map((o) => [o.id, o]));
  for (const o of r) {
    for (const l of o.requiresAny)
      l === o.id && e && i.push(`${o.label || o.id}: cannot require itself.`), !n.has(l) && e && i.push(`${o.label || o.id}: unknown requirement "${l}".`);
    for (const l of o.excludesAny)
      l === o.id && e && i.push(`${o.label || o.id}: cannot exclude itself.`), !n.has(l) && e && i.push(`${o.label || o.id}: unknown exclusion "${l}".`);
  }
  if (e && i.length) throw Gl(i);
  return r.filter((o) => o.id && o.label && o.moduleType && o.grants.length).map((o) => ({
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
function zn(a = []) {
  const e = new Map(er().map((r) => [r.id, r])), t = ci(a, { strict: !1 }), i = [...t], s = new Set(t.map((r) => r.id));
  for (const [r, n] of e.entries())
    s.has(r) || i.push(foundry.utils.deepClone(n));
  return i;
}
async function ac() {
  var a, e, t;
  try {
    if (!((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${v}.${Ti}`))) return;
    const i = game.settings.get(v, Ti), s = zn(i);
    JSON.stringify(i) !== JSON.stringify(s) && await game.settings.set(v, Ti, s);
  } catch {
  }
}
function rc() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${v}.${Ti}`))
      return zn(game.settings.get(v, Ti));
  } catch {
  }
  return er();
}
function Ws() {
  return ci(rc(), { strict: !1 });
}
function qt(a) {
  const e = Xi(a);
  return e ? Ws().find((t) => t.id === e) ?? null : null;
}
function tr(a) {
  const e = Fs(a);
  return Ws().filter((t) => t.moduleType === e);
}
function Wn(a) {
  return !a || typeof a != "object" || Array.isArray(a) ? {} : Object.fromEntries(
    Object.entries(a).map(([e, t]) => [Bn(e, ""), String(t ?? "").trim()]).filter(([e]) => !!e)
  );
}
function Un(a, e = "", { legacySelectedSkill: t = "" } = {}) {
  const i = new Set((Array.isArray(a == null ? void 0 : a.choices) ? a.choices : []).map(Pi)), s = String(e ?? "").trim();
  if (i.has(s)) return s;
  if (t) {
    const r = zs(t), n = r ? `skill:${r}` : "";
    if (n && i.has(n)) return n;
  }
  return i.size === 1 ? Array.from(i)[0] : "";
}
function Hn(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(a == null ? void 0 : a.grants) ? a.grants : [], s = Wn(e);
  return Object.fromEntries(
    i.map((r) => [
      r.id,
      Un(r, s[r.id], { legacySelectedSkill: t })
    ])
  );
}
function Us(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(a == null ? void 0 : a.grants) ? a.grants : [], s = Hn(a, e, { legacySelectedSkill: t });
  return i.map((r, n) => {
    const o = Un(r, s[r.id], { legacySelectedSkill: t }), l = (Array.isArray(r.choices) ? r.choices : []).find((c) => Pi(c) === o) ?? null;
    return {
      id: r.id,
      index: n,
      label: String((r == null ? void 0 : r.label) ?? "").trim() || (i.length > 1 ? `Bonus ${n + 1}` : "Granted Bonus"),
      selectedKey: o,
      choice: l,
      isResolved: !!l,
      requiresSelection: (Array.isArray(r == null ? void 0 : r.choices) ? r.choices : []).length > 1
    };
  });
}
function nc(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  var i;
  return ((i = Us(a, e, { legacySelectedSkill: t }).map((s) => s.choice).find((s) => (s == null ? void 0 : s.type) === "skill")) == null ? void 0 : i.value) ?? "";
}
function Ki(a = {}) {
  const e = foundry.utils.deepClone(a ?? {}), t = Xi(e.catalogId), i = t ? qt(t) : null, s = Fs(e.moduleType || (i == null ? void 0 : i.moduleType)), r = i ? Hn(i, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }) : Wn(e.selectedGrants);
  return e.moduleType = s, e.catalogId = t, e.selectedGrants = r, e.selectedSkill = i ? nc(i, r, { legacySelectedSkill: e.selectedSkill }) : zs(e.selectedSkill), e;
}
function jn(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  return Us(a, e, { legacySelectedSkill: t }).map((i) => {
    var l, c;
    const s = Array.isArray((c = (l = a == null ? void 0 : a.grants) == null ? void 0 : l[i.index]) == null ? void 0 : c.choices) ? a.grants[i.index].choices : [], r = new Set(s.map((u) => u.type)).size > 1, n = s.map((u) => ({
      value: Pi(u),
      label: Vi(u, { includeTypePrefix: r }),
      selected: Pi(u) === i.selectedKey
    })), o = n.length === 1 ? {
      value: n[0].value,
      label: n[0].label,
      displayLabel: Vi(s[0], { includeBonusText: !0 })
    } : null;
    return {
      id: i.id,
      label: i.label,
      selectionPath: `system.selectedGrants.${i.id}`,
      selectedKey: i.selectedKey,
      options: n,
      singleOption: o,
      hasMultipleChoices: n.length > 1
    };
  });
}
function oc(a, e) {
  return a.isDuplicate ? `Duplicate ${Ni(a.moduleType)} slot item.` : a.catalog ? a.unresolvedGrantCount > 0 ? "Choose valid bonus options." : a.excludedBy.length ? `Blocked by ${Nr(a.excludedBy, e).join(", ")}.` : a.requiresAny.length && !a.matchedRequirementIds.length ? `Requires ${Nr(a.requiresAny, e).join(" or ")}.` : "" : "Catalog entry is missing or unlinked.";
}
function lc(a, e = [], t = {}) {
  var s, r, n;
  if (!a || !Array.isArray(e) || !e.length) return [];
  const i = Math.max(0, Number(((n = (r = (s = a.system) == null ? void 0 : s.attributes) == null ? void 0 : r.edge) == null ? void 0 : n.value) ?? 0));
  return e.filter((o) => (o == null ? void 0 : o.type) === "edgePool").map((o) => {
    var f, y, h, g;
    const l = String(o.value ?? "").trim(), c = $n(l), u = Math.max(0, Number(((g = (h = (y = (f = a.system) == null ? void 0 : f.counters) == null ? void 0 : y.edgePools) == null ? void 0 : h[l]) == null ? void 0 : g.rating) ?? 0)), d = Math.max(0, Number((t == null ? void 0 : t[l]) ?? 0)), p = Math.max(0, u + d - i);
    return p ? `${c} Pool bonus loses ${p} ${p === 1 ? "point" : "points"} to the Edge cap.` : "";
  }).filter(Boolean);
}
function Vt(a) {
  var p;
  const e = Ws(), t = new Map(e.map((m) => [m.id, m])), i = Array.from((a == null ? void 0 : a.items) ?? []).filter((m) => m.type === b.itemType.lifeModule), s = /* @__PURE__ */ new Map();
  for (const m of i) {
    const f = Fs((p = m.system) == null ? void 0 : p.moduleType);
    !f || s.has(f) || s.set(f, m.id);
  }
  const r = i.map((m) => {
    var P;
    const f = Ki(m.system ?? {}), y = t.get(f.catalogId) ?? null, h = f.moduleType || (y == null ? void 0 : y.moduleType) || "", g = y ? Us(y, f.selectedGrants, { legacySelectedSkill: f.selectedSkill }) : [], S = g.map((I) => I.choice).filter(Boolean), T = ((P = S.find((I) => I.type === "skill")) == null ? void 0 : P.value) ?? "", k = T ? et(T) : null;
    return {
      item: m,
      itemId: m.id,
      moduleType: h,
      catalogId: (y == null ? void 0 : y.id) ?? f.catalogId,
      catalog: y,
      label: (y == null ? void 0 : y.label) ?? m.name,
      selectedGrants: f.selectedGrants,
      resolvedGrants: g,
      unresolvedGrantCount: g.filter((I) => !I.isResolved).length,
      selectedChoices: S,
      selectedChoiceLabels: S.map((I) => Vi(I, { includeBonusText: !0 })),
      selectedSkill: T,
      selectedSkillLabel: (k == null ? void 0 : k.label) ?? T,
      requiresAny: [...(y == null ? void 0 : y.requiresAny) ?? []],
      excludesAny: [...(y == null ? void 0 : y.excludesAny) ?? []],
      matchedRequirementIds: [],
      excludedBy: [],
      isDuplicate: h ? s.get(h) !== m.id : !1,
      isActive: !1,
      inactiveReason: "",
      bonus: 0
    };
  }), n = /* @__PURE__ */ new Map();
  for (const m of r) {
    if (!m.catalogId) continue;
    const f = n.get(m.catalogId) ?? [];
    f.push(m), n.set(m.catalogId, f);
  }
  for (const m of r)
    m.excludedBy = m.excludesAny.filter((f) => (n.get(f) ?? []).length > 0);
  let o = !0;
  for (; o; ) {
    o = !1;
    for (const m of r) {
      const f = m.requiresAny.filter(
        (h) => (n.get(h) ?? []).some((g) => g.isActive)
      ), y = !m.isDuplicate && !!m.catalog && m.unresolvedGrantCount === 0 && m.excludedBy.length === 0 && (m.requiresAny.length === 0 || f.length > 0);
      m.isActive !== y && (m.isActive = y, o = !0), m.matchedRequirementIds.join("|") !== f.join("|") && (m.matchedRequirementIds = f);
    }
  }
  const l = Object.fromEntries(dt.map((m) => [m.code, 0])), c = Object.fromEntries(_n.map((m) => [m, 0])), u = /* @__PURE__ */ new Map();
  for (const m of r) {
    const f = m.isActive ? m.selectedChoices : [], y = f.filter((g) => g.type === "skill"), h = f.filter((g) => g.type === "edgePool");
    m.bonus = y.length;
    for (const g of y)
      l[g.value] = Number(l[g.value] ?? 0) + 1;
    for (const g of h)
      c[g.value] = Number(c[g.value] ?? 0) + 1;
    m.inactiveReason = m.isActive ? "" : oc(m, t), u.set(m.itemId, m);
  }
  for (const m of r)
    m.warningLabels = m.isActive ? lc(a, m.selectedChoices, c) : [];
  const d = Bs.map((m) => {
    const f = r.find((y) => y.moduleType === m.moduleType && !y.isDuplicate) ?? null;
    return {
      moduleType: m.moduleType,
      label: m.label,
      availableEntries: e.filter((y) => y.moduleType === m.moduleType),
      state: f
    };
  });
  return {
    catalog: e,
    states: r,
    stateByItemId: u,
    slotStates: d,
    bonusBySkill: l,
    bonusByEdgePool: c
  };
}
function cc(a = {}) {
  var t, i, s;
  const e = String((a == null ? void 0 : a.intent) ?? "").trim();
  return e === "skill" ? String(((t = a == null ? void 0 : a.data) == null ? void 0 : t.skillKey) ?? "").trim() : e === "attack" ? String(((s = (i = a == null ? void 0 : a.attack) == null ? void 0 : i.skill) == null ? void 0 : s.code) ?? "").trim() : "";
}
function uc({ actor: a, resolved: e } = {}) {
  const t = cc(e);
  return !a || !t ? [] : Vt(a).states.flatMap(
    (i) => i.isActive ? i.selectedChoices.filter((s) => s.type === "skill" && s.value === t).map((s) => ({
      id: `life-module:${i.itemId}:${Pi(s)}`,
      label: i.label,
      value: 1,
      source: "Life Module",
      tooltip: `${i.label}: +1 to ${Vi(s)} rolls`
    })) : []
  );
}
const ir = Object.freeze([
  { value: "positive", label: "Positive" },
  { value: "negative", label: "Negative" },
  { value: "narrative", label: "Narrative" }
]), sr = Object.freeze([
  { value: "minor", label: "Minor" },
  { value: "major", label: "Major" }
]), qn = Object.freeze([
  { value: "passive", label: "Passive" },
  { value: "triggered", label: "Triggered" }
]), Gn = Object.freeze([
  { value: "rollMod", label: "Roll Modifier" },
  { value: "burnAdjust", label: "Burn Adjust" },
  { value: "actionCostMod", label: "Action Cost Mod" },
  { value: "initiativeMod", label: "Initiative Mod" },
  { value: "damageMod", label: "Damage Intake Mod" },
  { value: "edgeEvent", label: "Edge Event" }
]), Vn = Object.freeze([
  { value: "onBuildRoll", label: "Build Roll" },
  { value: "onBeforeBurnApplied", label: "Before Burn Applied" },
  { value: "onBeforeActionCostFinalized", label: "Before Action Cost Finalized" },
  { value: "onInitiativeResolved", label: "Initiative Resolved" },
  { value: "onDamageResolved", label: "Damage Resolved" },
  { value: "onEndOfActivation", label: "End of Activation" },
  { value: "onEdgeSpend", label: "Edge Spend" },
  { value: "onEdgeGain", label: "Edge Gain" }
]), ar = Object.freeze([
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
]), Kn = Object.freeze([
  { value: "adjustAmount", label: "Adjust Amount" },
  { value: "grantPool", label: "Grant Pool" }
]), dc = new Set(ir.map((a) => a.value)), mc = new Set(sr.map((a) => a.value)), pc = new Set(qn.map((a) => a.value)), fc = new Set(Gn.map((a) => a.value)), Yn = new Set(Vn.map((a) => a.value)), hc = new Set(ar.map((a) => a.value)), gc = new Set(Kn.map((a) => a.value));
function ue(a, e = "") {
  return String(a ?? "").trim() || e;
}
function ie(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Es(a) {
  return foundry.utils.deepClone(a);
}
function yc(a = []) {
  return (Array.isArray(a) ? a : typeof a == "string" ? a.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function bc(a) {
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
function Js(a) {
  const e = Math.max(0, Math.trunc(ie(a, 0)));
  return e > 0 ? e : 0;
}
function Gt(a = {}) {
  const e = a && typeof a == "object" ? a : {};
  return {
    perActivation: Js(e.perActivation),
    perRound: Js(e.perRound),
    perScene: Js(e.perScene)
  };
}
function Sc(a = {}) {
  const e = a && typeof a == "object" ? a : {}, t = {
    id: ue(e.id, foundry.utils.randomID()),
    fact: ue(e.fact)
  }, i = ar.find((r) => e[r.value] !== void 0 && e[r.value] !== null), s = (i == null ? void 0 : i.value) ?? (hc.has(String(e.comparator ?? "").trim()) ? String(e.comparator).trim() : "eq");
  return t.comparator = s, s !== "truthy" && s !== "falsy" && (t.value = bc(e[s] ?? e.value ?? "")), t;
}
function yt(a = []) {
  return (Array.isArray(a) ? a : []).map(Sc).filter((t) => t.fact);
}
function Ac(a = {}) {
  const e = a && typeof a == "object" ? a : {}, t = fc.has(String(e.type ?? "").trim()) ? String(e.type).trim() : "rollMod", i = wc(t), s = Yn.has(String(e.phase ?? "").trim()) ? String(e.phase).trim() : i, r = gc.has(String(e.operation ?? "").trim()) ? String(e.operation).trim() : "adjustAmount";
  return {
    id: ue(e.id, foundry.utils.randomID()),
    type: t,
    phase: s,
    selector: ue(e.selector),
    label: ue(e.label),
    value: ie(e.value, 0),
    min: e.min === void 0 || e.min === null || e.min === "" ? null : ie(e.min, 0),
    max: e.max === void 0 || e.max === null || e.max === "" ? null : ie(e.max, 0),
    pool: ue(e.pool),
    operation: r,
    conditions: yt(e.conditions),
    limit: Gt(e.limit)
  };
}
function ei(a = []) {
  return (Array.isArray(a) ? a : []).map(Ac).filter((t) => t.phase && t.type);
}
function Je(a = {}) {
  const e = a && typeof a == "object" ? Es(a) : {}, t = e.positive === !1 ? "negative" : "positive", i = dc.has(String(e.category ?? "").trim()) ? String(e.category).trim() : t, s = mc.has(String(e.tier ?? "").trim()) ? String(e.tier).trim() : "minor", r = pc.has(String(e.activation ?? "").trim()) ? String(e.activation).trim() : "passive";
  return {
    ...e,
    positive: i === "positive",
    category: i,
    tier: s,
    activation: r,
    tags: yc(e.tags),
    effects: ei(e.effects),
    prerequisites: yt(e.prerequisites),
    limits: Gt(e.limits)
  };
}
function Qn() {
  return {
    categories: [...ir],
    tiers: [...sr],
    activations: [...qn],
    effectTypes: [...Gn],
    phases: [...Vn],
    comparators: [...ar],
    edgeOperations: [...Kn]
  };
}
function fs(a = "") {
  var e;
  return ((e = ir.find((t) => t.value === a)) == null ? void 0 : e.label) ?? "Positive";
}
function hs(a = "") {
  var e;
  return ((e = sr.find((t) => t.value === a)) == null ? void 0 : e.label) ?? "Minor";
}
function wc(a = "") {
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
function Tc(a) {
  return Array.from((a == null ? void 0 : a.items) ?? []).filter((e) => ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === "quality").map((e) => ({
    item: e,
    system: Je(e.system ?? {})
  }));
}
function kc(a = {}, e = {}) {
  const t = Gt(a), i = Gt(e);
  return {
    perActivation: i.perActivation || t.perActivation,
    perRound: i.perRound || t.perRound,
    perScene: i.perScene || t.perScene
  };
}
function Jn(a = {}) {
  var s, r, n;
  const e = ue(a.combatId ?? ((s = a.combat) == null ? void 0 : s.id)), t = Math.max(0, Math.trunc(ie(a.round ?? ((r = a.combat) == null ? void 0 : r.round), 0))), i = ue(a.sceneId ?? ((n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.id));
  return {
    activationKey: ue(a.activationKey),
    roundKey: e ? `${e}:${t}` : "",
    sceneKey: i
  };
}
function vc(a, e = {}) {
  var r, n, o, l;
  const t = ((r = a == null ? void 0 : a.flags) == null ? void 0 : r[v]) ?? {}, i = ((n = t == null ? void 0 : t.traitUsage) == null ? void 0 : n.scene) ?? {}, s = e.state ?? {};
  return {
    activation: ((o = s == null ? void 0 : s.traitUsage) == null ? void 0 : o.activation) ?? {},
    round: ((l = s == null ? void 0 : s.traitUsage) == null ? void 0 : l.round) ?? {},
    scene: i
  };
}
function Mc(a, e, t, i) {
  var s, r, n, o, l;
  switch (t) {
    case "perActivation":
      return Math.max(0, Math.trunc(ie((s = a.activation) == null ? void 0 : s[i], 0)));
    case "perRound":
      return Math.max(0, Math.trunc(ie((n = (r = a.round) == null ? void 0 : r[e.roundKey]) == null ? void 0 : n[i], 0)));
    case "perScene":
      return Math.max(0, Math.trunc(ie((l = (o = a.scene) == null ? void 0 : o[e.sceneKey]) == null ? void 0 : l[i], 0)));
    default:
      return 0;
  }
}
function Ec(a, e, t, i) {
  const s = [];
  for (const r of ["perActivation", "perRound", "perScene"]) {
    const n = Math.max(0, Math.trunc(ie(t == null ? void 0 : t[r], 0)));
    if (!n) continue;
    Mc(a, e, r, i) >= n && s.push(`${r} limit reached`);
  }
  return s;
}
function Cc(a, e, t) {
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
function Rr(a, e) {
  const t = foundry.utils.getProperty(e, a.fact);
  return Cc(t, a.comparator, a.value);
}
function Pc(a = "", e = {}) {
  const t = ue(a);
  return t ? (Array.isArray(e == null ? void 0 : e.selectors) ? e.selectors : []).some(
    (s) => s === t || s.startsWith(`${t}.`)
  ) : !0;
}
function Xn(a, e) {
  return `${a.id}:${e.id}`;
}
function Nc(a, e) {
  var t;
  return !!((t = a.system) != null && t.inactive) || !!(e != null && e.inactive);
}
function Dr(a = []) {
  return a.map((e) => e.fact).filter(Boolean).join(", ");
}
function fi(a, e, t) {
  const i = ie(a[e], 0);
  let s = i;
  return typeof t.value == "number" && (s += t.value), typeof t.min == "number" && (s = Math.max(t.min, s)), typeof t.max == "number" && (s = Math.min(t.max, s)), a[e] = s, s - i;
}
function xt(a, e, t, i, s) {
  i && a.push({
    id: `trait:${s}:${e.id}:${t.id}`,
    label: t.label || e.name,
    value: i,
    source: e.name,
    traitItemId: e.id,
    traitEffectId: t.id
  });
}
function Rc({ item: a, effect: e, phase: t, packet: i, result: s }) {
  switch (e.type) {
    case "rollMod": {
      const r = ie(e.value, 0);
      return xt(s.modifiers, a, e, r, t), r;
    }
    case "burnAdjust": {
      if (t === "onEndOfActivation") {
        const n = fi(i, "burnDelta", e);
        return xt(s.modifiers, a, e, n, t), n;
      }
      const r = fi(i, "amount", e);
      return xt(s.modifiers, a, e, r, t), r;
    }
    case "actionCostMod": {
      const r = fi(i, "cost", e);
      return xt(s.modifiers, a, e, r, t), r;
    }
    case "initiativeMod": {
      const r = fi(i, "total", e);
      return xt(s.modifiers, a, e, r, t), r;
    }
    case "damageMod": {
      const r = fi(i, "amount", e);
      return xt(s.modifiers, a, e, r, t), r;
    }
    case "edgeEvent": {
      if (t === "onEndOfActivation" && e.operation === "grantPool" && e.pool)
        return i.edgeAdjustments ?? (i.edgeAdjustments = []), i.edgeAdjustments.push({
          poolKey: e.pool,
          amount: ie(e.value, 0),
          label: e.label || a.name,
          source: a.name
        }), xt(s.modifiers, a, e, ie(e.value, 0), t), ie(e.value, 0);
      const r = fi(i, "amount", e);
      return xt(s.modifiers, a, e, r, t), r;
    }
    default:
      return 0;
  }
}
function Dc(a, e, t) {
  const i = Xn(a, e), s = [];
  return t.perActivation > 0 && s.push({ kind: "usage", scope: "perActivation", key: i, delta: 1 }), t.perRound > 0 && s.push({ kind: "usage", scope: "perRound", key: i, delta: 1 }), t.perScene > 0 && s.push({ kind: "usage", scope: "perScene", key: i, delta: 1 }), s;
}
function Ic(a = "") {
  const e = ue(a);
  return e ? [`action.${e}`] : [];
}
function di(a, e = {}) {
  var r, n, o, l;
  const t = e.snapshot ?? null, i = e.state ?? (t == null ? void 0 : t.state) ?? {};
  return {
    activation: {
      moved: (Array.isArray(i == null ? void 0 : i.actionLog) ? i.actionLog.map((c) => ue(c == null ? void 0 : c.id)).filter(Boolean) : []).includes("move"),
      saSpent: Math.max(0, Math.trunc(ie(i == null ? void 0 : i.saSpentThisActivation, 0))),
      attacksThisActivation: Math.max(0, Math.trunc(ie(i == null ? void 0 : i.attacksThisActivation, 0))),
      burnThisActivation: Math.max(0, Math.trunc(ie(i == null ? void 0 : i.burnThisActivation, 0)))
    },
    burn: {
      current: Math.max(0, Math.trunc(ie((n = (r = a == null ? void 0 : a.system) == null ? void 0 : r.burn) == null ? void 0 : n.value, 0))),
      overloaded: !!((l = (o = a == null ? void 0 : a.system) == null ? void 0 : o.burn) != null && l.overloaded)
    },
    timing: {
      firstAttackThisActivation: Math.max(0, Math.trunc(ie(i == null ? void 0 : i.attacksThisActivation, 0))) === 0,
      firstExtraSAThisActivation: Math.max(0, Math.trunc(ie(i == null ? void 0 : i.saSpentThisActivation, 0))) <= 3
    },
    selectors: []
  };
}
function rr({ actor: a, resolved: e, payload: t, runtime: i = {} } = {}) {
  var c, u, d, p, m, f, y;
  const s = di(a, i), r = ue((e == null ? void 0 : e.intent) ?? (t == null ? void 0 : t.intent), "skill"), n = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [], o = ue(((c = e == null ? void 0 : e.attack) == null ? void 0 : c.rangeBand) ?? (t == null ? void 0 : t.rangeBand)), l = ue(((d = (u = t == null ? void 0 : t.edge) == null ? void 0 : u.pre) == null ? void 0 : d.poolKey) ?? ((p = t == null ? void 0 : t.edge) == null ? void 0 : p.poolKey) ?? "");
  return s.intent = r, s.domains = n, s.rangeBand = o, s.edge = {
    stage: (m = t == null ? void 0 : t.toggles) != null && m.useEdge ? "pre" : "",
    pool: l,
    spent: !!((f = t == null ? void 0 : t.toggles) != null && f.useEdge)
  }, s.selectors.push(`intent.${r}`), n.forEach((h) => s.selectors.push(`domain.${h}`)), o && s.selectors.push(`range.${o}`), (y = t == null ? void 0 : t.toggles) != null && y.useEdge && s.selectors.push("edge.pre"), s;
}
function Zn({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = di(a, t);
  return i.action = {
    id: ue(e.actionId),
    resource: ue(e.resource),
    cost: ie(e.cost, 0)
  }, i.selectors.push(...Ic(e.actionId)), i;
}
function ka({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = di(a, t);
  return i.action = {
    id: ue(e.actionId),
    resource: ue(e.resource)
  }, i.burn = {
    ...i.burn,
    amount: ie(e.amount, 0),
    source: ue(e.source)
  }, e.source === "extraSA" && e.extraSaIndex === 1 && i.selectors.push("activation.extraSA:first"), e.source && i.selectors.push(`burn.${e.source}`), i;
}
function eo({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = di(a, t);
  return i.intent = "initiative", i.domains = ["combat"], i.initiative = {
    total: ie(e.total, 0)
  }, i.selectors.push("intent.initiative"), i;
}
function to({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = di(a, t);
  return i.damage = {
    amount: ie(e.amount, 0),
    track: ue(e.track),
    damageType: ue(e.damageType)
  }, i.selectors.push("incoming"), i;
}
function va({ actor: a, packet: e = {}, phase: t = "onEdgeGain", runtime: i = {} } = {}) {
  const s = di(a, i);
  return s.edge = {
    pool: ue(e.poolKey),
    amount: ie(e.amount, 0),
    eventKey: ue(e.eventKey),
    source: ue(e.source)
  }, s.selectors.push(t === "onEdgeSpend" ? "edge.spend" : "edge.gain"), s.edge.eventKey && s.selectors.push(`event.${s.edge.eventKey}`), s;
}
function io({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = di(a, t);
  return i.event = {
    phase: "endOfActivation"
  }, i.selectors.push("endOfActivation"), ie(e.burnDelta, 0) !== 0 && i.selectors.push("burn.adjust"), i;
}
function Xe({ actor: a, phase: e, facts: t = {}, packet: i = {}, options: s = {} } = {}) {
  const r = {
    packet: Es(i),
    modifiers: [],
    mutations: [],
    applied: [],
    skipped: []
  };
  if (!a || !Yn.has(String(e ?? "").trim()))
    return r;
  const n = s.runtime ?? {}, o = vc(a, n), l = Jn(n), c = Tc(a);
  for (const { item: u, system: d } of c) {
    if (Nc(u, d)) {
      r.skipped.push({
        traitItemId: u.id,
        traitEffectId: "",
        label: u.name,
        reason: "Trait is inactive"
      });
      continue;
    }
    const p = d.prerequisites.filter((m) => !Rr(m, t));
    if (p.length) {
      r.skipped.push({
        traitItemId: u.id,
        traitEffectId: "",
        label: u.name,
        reason: `Prerequisites not met: ${Dr(p)}`
      });
      continue;
    }
    for (const m of d.effects.filter((f) => f.phase === e)) {
      if (!Pc(m.selector, t)) {
        r.skipped.push({
          traitItemId: u.id,
          traitEffectId: m.id,
          label: m.label || u.name,
          reason: `Selector did not match (${m.selector || "any"})`
        });
        continue;
      }
      const f = m.conditions.filter((T) => !Rr(T, t));
      if (f.length) {
        r.skipped.push({
          traitItemId: u.id,
          traitEffectId: m.id,
          label: m.label || u.name,
          reason: `Conditions not met: ${Dr(f)}`
        });
        continue;
      }
      const y = kc(d.limits, m.limit), h = Xn(u, m), g = Ec(o, l, y, h);
      if (g.length) {
        r.skipped.push({
          traitItemId: u.id,
          traitEffectId: m.id,
          label: m.label || u.name,
          reason: g.join(", ")
        });
        continue;
      }
      const S = Rc({
        item: u,
        effect: m,
        phase: e,
        packet: r.packet,
        result: r
      });
      r.applied.push({
        traitItemId: u.id,
        traitEffectId: m.id,
        label: m.label || u.name,
        value: S,
        phase: e,
        source: u.name
      }), s.consumeUsage && r.mutations.push(...Dc(u, m, y));
    }
  }
  return r;
}
async function Kt({ actor: a, mutations: e = [], runtime: t = {} } = {}) {
  var o, l, c, u, d, p, m, f, y;
  if (!a || !Array.isArray(e) || !e.length) return;
  const i = e.filter((h) => (h == null ? void 0 : h.kind) === "usage");
  if (!i.length) return;
  const s = Es(((c = (l = (o = a.flags) == null ? void 0 : o[v]) == null ? void 0 : l.traitUsage) == null ? void 0 : c.scene) ?? {}), r = t.state ? Es(t.state) : null, n = Jn(t);
  for (const h of i) {
    const g = ue(h.key), S = Math.max(0, Math.trunc(ie(h.delta, 0)));
    if (!(!g || !S))
      switch (h.scope) {
        case "perActivation": {
          if (!r) break;
          r.traitUsage ?? (r.traitUsage = {}), (u = r.traitUsage).activation ?? (u.activation = {}), r.traitUsage.activation[g] = Math.max(0, ie(r.traitUsage.activation[g], 0) + S);
          break;
        }
        case "perRound": {
          if (!r || !n.roundKey) break;
          r.traitUsage ?? (r.traitUsage = {}), (d = r.traitUsage).round ?? (d.round = {}), (p = r.traitUsage.round)[m = n.roundKey] ?? (p[m] = {}), r.traitUsage.round[n.roundKey][g] = Math.max(
            0,
            ie(r.traitUsage.round[n.roundKey][g], 0) + S
          );
          break;
        }
        case "perScene": {
          if (!n.sceneKey) break;
          s[f = n.sceneKey] ?? (s[f] = {}), s[n.sceneKey][g] = Math.max(0, ie(s[n.sceneKey][g], 0) + S);
          break;
        }
      }
  }
  r && ((y = t.combatant) != null && y.id) && await t.combatant.setFlag(v, "personalCombat", r), await a.setFlag(v, "traitUsage", { scene: s });
}
const Ir = Object.freeze({
  weapon: b.itemType.personalWeapon,
  shadowamp: b.itemType.assetModule
}), so = Object.freeze({
  contact: "systems/mwd/img/default/mystery-man.svg",
  gear: "systems/mwd/img/default/Default_Gear.svg",
  quality: "systems/mwd/img/default/card-joker.svg",
  assetModule: "systems/mwd/img/default/upgrade.svg",
  skill: "systems/mwd/img/default/Default_Skill.svg",
  lifeModule: "systems/mwd/img/default/book.svg",
  mechWeapon: "systems/mwd/img/default/Default_Weapon.svg",
  personalWeapon: "systems/mwd/img/colt-m1911.svg",
  armor: "systems/mwd/img/default/Default_Armor.svg"
}), ni = Object.freeze(["close", "near", "far", "extreme"]), Or = Object.freeze({
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
});
function Zt(a) {
  return ct(a);
}
function ao(a) {
  return a === "long" ? "extreme" : a === "short" ? "close" : a === "medium" ? "near" : ni.includes(a) ? a : "near";
}
function Si(a) {
  return {
    max: ao((a == null ? void 0 : a.max) ?? "near"),
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function Xs(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function Oc(a) {
  const e = ni.indexOf(a);
  return e >= 0 ? e : ni.indexOf("near");
}
function _c(a = Si({})) {
  const e = ["near", "close", "far", "extreme"], t = Oc(a.max);
  return e.find((i) => ni.indexOf(i) <= t) ?? "close";
}
function Lc(a) {
  const e = ao(a == null ? void 0 : a.max), t = ni.indexOf(e);
  return ni.map((i, s) => ({
    key: i,
    allowed: t >= 0 ? s <= t : s === 0,
    value: (a == null ? void 0 : a[i]) ?? void 0,
    labelkey: te.getFromList(te.getEnums().ranges, i)
  }));
}
function $c(a, e, t, i) {
  let s = Number(e);
  if (t)
    if (i !== void 0)
      s += Math.ceil(Number(i) / 2);
    else
      return console.warn("Weapon not attached to an actor"), fe.item.personalWeapon.weaponWithoutActor;
  return s;
}
function xc(a, e, t) {
  let i = "";
  return t && fe.attributes[t] && (i += fe.attributes[t].substring(0, 3).toUpperCase() + "/2 + "), i += String(e), i;
}
function Bc(a, e) {
  return L.useArmor(a) ? e ? "noArmor" : "withArmor" : "";
}
function _r(a) {
  const e = game.system.mwd.skills.get(a);
  if (!e)
    return {
      img: so.skill,
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
function Zs(a = {}) {
  const e = Ki(a), t = qt(e.catalogId);
  return {
    system: e,
    ...t ? { name: t.label } : {}
  };
}
function Fc(a) {
  const e = String(a ?? "").trim();
  return !!(!e || e.startsWith("icons/svg/") || e === "icons/mystery-man.svg");
}
var Yi, tt, Ma, ro, gs;
const De = class De extends Item {
  static init() {
    B(this, Yi) || (Re(this, Yi, !0), Hooks.on("createItem", (e, t, i) => {
      var s, r;
      Promise.resolve((s = e.onCreateItem) == null ? void 0 : s.call(e, t, i)).catch((n) => {
        console.error(`${oe}Item create hook failed`, n);
      }), M(r = De, tt, Ma).call(r, e);
    }), Hooks.on("updateItem", (e) => {
      var t;
      M(t = De, tt, Ma).call(t, e);
    }), Hooks.on("deleteItem", (e) => {
      var t;
      M(t = De, tt, ro).call(t, e);
    }), Hooks.on("createActiveEffect", (e) => {
      var t;
      M(t = De, tt, gs).call(t, e);
    }), Hooks.on("updateActiveEffect", (e) => {
      var t;
      M(t = De, tt, gs).call(t, e);
    }), Hooks.on("deleteActiveEffect", (e) => {
      var t;
      M(t = De, tt, gs).call(t, e);
    }));
  }
  static canonicalType(e) {
    return Ir[e] ?? e;
  }
  static defaultIconForType(e) {
    return so[this.canonicalType(e)];
  }
  get canonicalType() {
    return this.constructor.canonicalType(this.type);
  }
  async onCreateItem(e, t) {
  }
  async _preCreate(e, t, i) {
    super._preCreate && await super._preCreate(e, t, i);
    const s = (e == null ? void 0 : e.type) ?? this.type, r = this.constructor.canonicalType(s), n = {};
    if (s !== r && Ir[s] && (n.type = r), Fc((e == null ? void 0 : e.img) ?? this.img)) {
      const o = this.constructor.defaultIconForType(r);
      o && (n.img = o);
    }
    if (r === b.itemType.lifeModule && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (n.name = "MWD.itemType.singular.lifeModule"), r === b.itemType.lifeModule) {
      const o = Zs((e == null ? void 0 : e.system) ?? this.system ?? {});
      n.system = o.system, o.name && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (n.name = o.name);
    }
    Object.keys(n).length && this.updateSource(n);
  }
  async _preUpdate(e, t, i) {
    var l, c;
    super._preUpdate && await super._preUpdate(e, t, i);
    const s = e != null && e.system ? foundry.utils.mergeObject(foundry.utils.deepClone(this.system ?? {}), foundry.utils.deepClone(e.system), { inplace: !1 }) : null;
    if (s && this.isPersonalWeapon()) {
      e.system ?? (e.system = {});
      const u = s.ammo;
      e.system.standardTraits = We(s.standardTraits), e.system.payloads = ht(s.payloads, { legacyAmmo: u, category: s.category }), e.system.consumptionSources = _i(s.consumptionSources, { legacyAmmo: u }), e.system.selectedPayloadId = bi(
        s.selectedPayloadId,
        e.system.payloads,
        { legacyAmmo: u, category: s.category }
      ), e.system.traits = Zt(s.traits), e.system.attackRatingBand = Xs(s.attackRatingBand), e.system.range = Si(s.range), e.system.damageType = lt(s.damageType), e.system["-=ammo"] = null, delete e.system.ammo;
    }
    if (s && this.isArmor() && (e.system ?? (e.system = {}), e.system.mitigationByType = bt(s.mitigationByType ?? s.mitigation), e.system.tags = ps(s.tags), e.system.traits = Zt(s.traits), e.system.standardTraits = ft(s.standardTraits), e.system.traitState = Ks({
      standardTraits: e.system.standardTraits,
      traits: e.system.traits,
      traitState: s.traitState
    }).traitState), s && this.isLifeModule()) {
      const u = Zs(s);
      e.system ?? (e.system = {}), foundry.utils.mergeObject(e.system, u.system, { inplace: !0, overwrite: !0 }), u.name && (e.name = u.name);
      return;
    }
    if (s && this.isQuality()) {
      e.system ?? (e.system = {});
      const u = Je(s);
      foundry.utils.mergeObject(e.system, u, { inplace: !0, overwrite: !0 });
      return;
    }
    if (!this.isSkill()) return;
    const r = (l = e == null ? void 0 : e.system) == null ? void 0 : l.code;
    if (r === void 0) return;
    const n = this.system.code;
    if (r === n) return;
    const o = _r(r);
    o && ((c = o == null ? void 0 : o.system) == null || delete c.code, foundry.utils.mergeObject(e, o, { inplace: !0 }));
  }
  prepareBaseData() {
    super.prepareBaseData();
    const e = this.canonicalType;
    e === b.itemType.personalWeapon ? this._preparePersonalWeaponBaseData() : e === b.itemType.armor ? this._prepareArmorBaseData() : e === b.itemType.lifeModule ? this._prepareLifeModuleBaseData() : e === b.itemType.quality && this._prepareQualityBaseData();
  }
  _preparePersonalWeaponBaseData() {
    const e = this.system ?? {}, t = e.ammo;
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = lt(e.damageType), e.attackRatingBand = Xs(e.attackRatingBand), e.range = Si(e.range), e.standardTraits = We(e.standardTraits), e.payloads = ht(e.payloads, { legacyAmmo: t, category: e.category }), e.consumptionSources = _i(e.consumptionSources, { legacyAmmo: t }), e.selectedPayloadId = bi(e.selectedPayloadId, e.payloads, { legacyAmmo: t, category: e.category }), delete e.ammo, e.traits = Zt(e.traits), e.notes = String(e.notes ?? "").trim();
  }
  _prepareArmorBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.rating = Math.max(0, Number(e.rating ?? 0)), e.defenseBonus = Number(e.defenseBonus ?? 0) || 0, e.mitigationByType = bt(e.mitigationByType ?? e.mitigation), delete e.mitigation, e.durability ?? (e.durability = {}), e.durability.max = Math.max(0, Number(e.durability.max ?? e.rating ?? 0)), e.durability.current = Math.min(
      e.durability.max,
      Math.max(0, Number(e.durability.current ?? e.durability.max ?? e.rating ?? 0))
    ), e.standardTraits = ft(e.standardTraits), e.tags = ps(e.tags), e.traits = Zt(e.traits), e.traitState = Ks({
      standardTraits: e.standardTraits,
      traits: e.traits,
      traitState: e.traitState
    }).traitState, e.notes = String(e.notes ?? "").trim();
  }
  _prepareLifeModuleBaseData() {
    const e = Zs(this.system ?? {});
    foundry.utils.mergeObject(this.system, e.system, { inplace: !0, overwrite: !0 });
  }
  _prepareQualityBaseData() {
    const e = Je(this.system ?? {});
    foundry.utils.mergeObject(this.system, e, { inplace: !0, overwrite: !0 });
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
    return [b.itemType.mechWeapon, b.itemType.personalWeapon].includes(this.canonicalType);
  }
  isPersonalWeapon() {
    return this.canonicalType === b.itemType.personalWeapon;
  }
  isArmor() {
    return this.canonicalType === b.itemType.armor;
  }
  isLifeModule() {
    return this.canonicalType === b.itemType.lifeModule;
  }
  isQuality() {
    return this.canonicalType === b.itemType.quality;
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
      var s, r;
      const i = (r = (s = t.flags) == null ? void 0 : s[v]) == null ? void 0 : r[De.EQUIPPED_EFFECT_FLAG];
      return (i == null ? void 0 : i.sourceItemId) === this.id;
    }) : [];
  }
  async removeSyncedActorEffects({ actor: e = this.actor } = {}) {
    const t = this.getSyncedActorEffects({ actor: e });
    return !t.length || !e ? [] : e.deleteEmbeddedDocuments("ActiveEffect", t.map((i) => i.id));
  }
  async syncEquippedActorEffects({ actor: e = this.actor } = {}) {
    var p, m, f, y;
    if (!e || !this.supportsEquippedEffectSync()) return { created: [], updated: [], deleted: [] };
    const t = this.getSyncedActorEffects({ actor: e }), i = Array.from(((p = this.effects) == null ? void 0 : p.contents) ?? []);
    if (!this.shouldApplyEquippedEffects()) {
      if (!t.length) return { created: [], updated: [], deleted: [] };
      const h = await e.deleteEmbeddedDocuments("ActiveEffect", t.map((g) => g.id));
      return { created: [], updated: [], deleted: h };
    }
    const s = /* @__PURE__ */ new Map();
    for (const h of t) {
      const g = (y = (f = (m = h.flags) == null ? void 0 : m[v]) == null ? void 0 : f[De.EQUIPPED_EFFECT_FLAG]) == null ? void 0 : y.sourceEffectId;
      if (!g) continue;
      const S = s.get(g) ?? [];
      S.push(h), s.set(g, S);
    }
    const r = [], n = [], o = [], l = new Set(i.map((h) => h.id));
    for (const [h, g] of s.entries()) {
      if (!l.has(h)) {
        o.push(...g.map((S) => S.id));
        continue;
      }
      g.length > 1 && o.push(...g.slice(1).map((S) => S.id));
    }
    for (const h of i) {
      const S = (s.get(h.id) ?? [])[0] ?? null, T = this._prepareSyncedActorEffectData(h);
      S ? n.push({ _id: S.id, ...T }) : r.push(T);
    }
    const c = o.length ? await e.deleteEmbeddedDocuments("ActiveEffect", o) : [], u = n.length ? await e.updateEmbeddedDocuments("ActiveEffect", n) : [];
    return { created: r.length ? await e.createEmbeddedDocuments("ActiveEffect", r) : [], updated: u, deleted: c };
  }
  _prepareSyncedActorEffectData(e) {
    const t = e.toObject();
    delete t._id;
    const i = String(e.name ?? "Effect").trim() || "Effect", s = String(this.name ?? "Item").trim() || "Item", r = i.startsWith(s) ? i : `${s}: ${i}`;
    return t.name = r, t.transfer = !1, t.origin = e.uuid ?? this.uuid ?? t.origin ?? null, t.flags = foundry.utils.mergeObject(t.flags ?? {}, {
      [v]: {
        [De.EQUIPPED_EFFECT_FLAG]: {
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
    return this.canonicalType === b.itemType.skill;
  }
  async rollAttribute(e) {
    this.parent && await nt.itemAttributeRoll(this, e);
  }
  async switchMonitorCheck(e, t, i, s = void 0) {
    await L.switchMonitorCheck(this.parent, e, t, i, s, this);
  }
  async setCounter(e, t) {
    await L.setCounter(this, e, t);
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
    const s = this._computeModifierImpact(t, i);
    this._applyModifierUpdate(e, s);
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
    await this._mutateModifiers((i) => i.map((s) => (s.id === e && t(s), s)));
  }
  async _mutateModifiers(e = (t) => t) {
    const t = e(this.system.modifiers);
    J.reindexIds(t), await this.update({ "system.modifiers": t });
  }
  async _mutateQualitySystem(e = (t) => t) {
    const t = e(foundry.utils.deepClone(Je(this.system ?? {})));
    await this.update({ system: Je(t) });
  }
  async createQualityPrerequisite(e = {}) {
    await this._mutateQualitySystem((t) => (t.prerequisites = yt(t.prerequisites).concat([{
      id: e.id ?? foundry.utils.randomID(),
      fact: e.fact ?? "",
      comparator: e.comparator ?? "eq",
      value: e.value ?? ""
    }]), t));
  }
  async deleteQualityPrerequisite(e) {
    await this._mutateQualitySystem((t) => (t.prerequisites = yt(t.prerequisites).filter((i) => i.id !== e), t));
  }
  async updateQualityPrerequisite(e, t, i) {
    await this._mutateQualitySystem((s) => (s.prerequisites = yt(s.prerequisites).map((r) => (r.id !== e || (t === "fact" && (r.fact = i), t === "comparator" && (r.comparator = i), t === "value" && (r.value = i)), r)), s));
  }
  async createQualityEffect(e = {}) {
    await this._mutateQualitySystem((t) => (t.effects = ei(t.effects).concat([{
      id: e.id ?? foundry.utils.randomID(),
      type: e.type ?? "rollMod",
      phase: e.phase ?? "onBuildRoll",
      selector: e.selector ?? "",
      label: e.label ?? "",
      value: Number(e.value ?? 0) || 0,
      min: e.min ?? null,
      max: e.max ?? null,
      pool: e.pool ?? "",
      operation: e.operation ?? "adjustAmount",
      conditions: yt(e.conditions ?? []),
      limit: Gt(e.limit ?? {})
    }]), t));
  }
  async deleteQualityEffect(e) {
    await this._mutateQualitySystem((t) => (t.effects = ei(t.effects).filter((i) => i.id !== e), t));
  }
  async updateQualityEffect(e, t, i) {
    await this._mutateQualitySystem((s) => (s.effects = ei(s.effects).map((r) => (r.id !== e || (t === "type" && (r.type = i), t === "phase" && (r.phase = i), t === "selector" && (r.selector = i), t === "label" && (r.label = i), t === "value" && (r.value = Number(i ?? 0) || 0), t === "min" && (r.min = i === "" ? null : Number(i ?? 0)), t === "max" && (r.max = i === "" ? null : Number(i ?? 0)), t === "pool" && (r.pool = i), t === "operation" && (r.operation = i), t === "limit.perActivation" && (r.limit = Gt({ ...r.limit ?? {}, perActivation: i })), t === "limit.perRound" && (r.limit = Gt({ ...r.limit ?? {}, perRound: i })), t === "limit.perScene" && (r.limit = Gt({ ...r.limit ?? {}, perScene: i }))), r)), s));
  }
  async createQualityEffectCondition(e, t = {}) {
    await this._mutateQualitySystem((i) => (i.effects = ei(i.effects).map((s) => (s.id !== e || (s.conditions = yt(s.conditions).concat([{
      id: t.id ?? foundry.utils.randomID(),
      fact: t.fact ?? "",
      comparator: t.comparator ?? "eq",
      value: t.value ?? ""
    }])), s)), i));
  }
  async deleteQualityEffectCondition(e, t) {
    await this._mutateQualitySystem((i) => (i.effects = ei(i.effects).map((s) => (s.id !== e || (s.conditions = yt(s.conditions).filter((r) => r.id !== t)), s)), i));
  }
  async updateQualityEffectCondition(e, t, i, s) {
    await this._mutateQualitySystem((r) => (r.effects = ei(r.effects).map((n) => (n.id !== e || (n.conditions = yt(n.conditions).map((o) => (o.id !== t || (i === "fact" && (o.fact = s), i === "comparator" && (o.comparator = s), i === "value" && (o.value = s)), o))), n)), r));
  }
  async _mutateWeaponStandardTraits(e = (t) => t) {
    var i;
    const t = e(foundry.utils.deepClone(We((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": We(t) });
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
    await this._mutateWeaponStandardTraits((s) => s.map((r) => (r.id !== e || (t === "key" && (r.key = i), t === "rating" && (r.rating = Math.max(0, Number(i ?? 0) || 0))), r)));
  }
  async _mutateArmorStandardTraits(e = (t) => t) {
    var i;
    const t = e(foundry.utils.deepClone(ft((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": ft(t) });
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
    await this._mutateArmorStandardTraits((s) => s.map((r) => (r.id !== e || (t === "key" && (r.key = i), t === "rating" && (r.rating = Math.max(0, Number(i ?? 0) || 0))), r)));
  }
  async _mutatePayloads(e = (t) => t) {
    var s, r, n, o, l, c, u;
    const t = e(foundry.utils.deepClone(
      ht((s = this.system) == null ? void 0 : s.payloads, {
        legacyAmmo: (r = this.system) == null ? void 0 : r.ammo,
        category: ((n = this.system) == null ? void 0 : n.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
      })
    )).map(je), i = bi((l = this.system) == null ? void 0 : l.selectedPayloadId, t, {
      category: ((c = this.system) == null ? void 0 : c.category) ?? ((u = this.system) == null ? void 0 : u.weaponCategory)
    });
    await this.update({
      "system.payloads": t,
      "system.selectedPayloadId": i,
      "system.-=ammo": null
    });
  }
  async _mutateConsumptionSources(e = (t) => t) {
    var i, s;
    const t = e(foundry.utils.deepClone(
      _i((i = this.system) == null ? void 0 : i.consumptionSources, { legacyAmmo: (s = this.system) == null ? void 0 : s.ammo })
    )).map(jt);
    await this.update({
      "system.consumptionSources": t,
      "system.-=ammo": null
    });
  }
  async updatePayloadField(e, t, i) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((s) => s.map((r) => r.id !== e ? r : (foundry.utils.setProperty(r, t, i), je(r))));
  }
  async createPayload(e = {}) {
    await this._mutatePayloads((t) => t.concat([je({
      id: e.id ?? foundry.utils.randomID(),
      label: e.label ?? e.name ?? "Payload",
      family: e.family ?? "munition",
      compatibleWith: e.compatibleWith ?? [],
      modifies: e.modifies ?? {},
      resolution: e.resolution ?? { resolverKey: "standard" },
      consumption: e.consumption ?? { amount: 1, sourceId: "" }
    })]));
  }
  async deletePayload(e) {
    var r, n, o, l, c;
    if (String(e ?? "").trim() === "unloaded") return;
    const t = ((r = this.system) == null ? void 0 : r.category) ?? ((n = this.system) == null ? void 0 : n.weaponCategory), i = ht((o = this.system) == null ? void 0 : o.payloads, {
      legacyAmmo: (l = this.system) == null ? void 0 : l.ammo,
      category: t
    }).filter((u) => u.id !== e), s = ((c = i[0]) == null ? void 0 : c.id) ?? "unloaded";
    await this.update({
      "system.payloads": i.length ? i : ht([], { category: t }),
      "system.selectedPayloadId": i.some((u) => {
        var d;
        return u.id === ((d = this.system) == null ? void 0 : d.selectedPayloadId);
      }) ? this.system.selectedPayloadId : i.length ? s : "",
      "system.-=ammo": null
    });
  }
  async createPayloadStandardTrait(e, t = {}) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((s) => s.id !== e ? s : (s.modifies ?? (s.modifies = {}), s.modifies.standardTraits = We(s.modifies.standardTraits).concat([{
      id: t.id ?? foundry.utils.randomID(),
      key: t.key ?? "armorPiercing",
      rating: Math.max(0, Number(t.rating ?? 0) || 0)
    }]), je(s))));
  }
  async deletePayloadStandardTrait(e, t) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((s) => s.id !== e ? s : (s.modifies ?? (s.modifies = {}), s.modifies.standardTraits = We(s.modifies.standardTraits).filter((r) => r.id !== t), je(s))));
  }
  async updatePayloadStandardTrait(e, t, i, s) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((r) => r.map((n) => n.id !== e ? n : (n.modifies ?? (n.modifies = {}), n.modifies.standardTraits = We(n.modifies.standardTraits).map((o) => (o.id !== t || (i === "key" && (o.key = s), i === "rating" && (o.rating = Math.max(0, Number(s ?? 0) || 0))), o)), je(n))));
  }
  async createConsumptionSource(e = {}) {
    await this._mutateConsumptionSources((t) => t.concat([jt({
      id: e.id ?? foundry.utils.randomID(),
      label: e.label ?? "Source",
      kind: e.kind ?? "internal",
      tracking: e.tracking ?? { current: 0, max: 0 },
      link: e.link ?? {}
    })]));
  }
  async deleteConsumptionSource(e) {
    await this._mutateConsumptionSources((t) => t.filter((i) => i.id !== e)), await this._mutatePayloads((t) => t.map((i) => {
      var s;
      return ((s = i == null ? void 0 : i.consumption) == null ? void 0 : s.sourceId) !== e ? i : (i.consumption.sourceId = "", je(i));
    }));
  }
  async updateConsumptionSourceField(e, t, i) {
    await this._mutateConsumptionSources((s) => s.map((r) => r.id !== e ? r : (foundry.utils.setProperty(r, t, i), jt(r))));
  }
  getPayloadState({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var i, s, r, n, o;
    return ga({
      payloads: (i = this.system) == null ? void 0 : i.payloads,
      selectedPayloadId: (s = this.system) == null ? void 0 : s.selectedPayloadId,
      consumptionSources: (r = this.system) == null ? void 0 : r.consumptionSources,
      actor: this.actor ?? null,
      payloadId: e || t,
      category: ((n = this.system) == null ? void 0 : n.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
    });
  }
  async setActivePayload(e) {
    var i, s, r, n, o, l;
    const t = bi(
      e,
      ht((i = this.system) == null ? void 0 : i.payloads, {
        legacyAmmo: (s = this.system) == null ? void 0 : s.ammo,
        category: ((r = this.system) == null ? void 0 : r.category) ?? ((n = this.system) == null ? void 0 : n.weaponCategory)
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
    var s;
    const i = this.getPayloadState({ payloadId: e || t });
    return (s = i == null ? void 0 : i.sourceState) != null && s.isTracked ? Number(i.sourceState.current ?? 0) >= Number(i.sourceState.consumePerUse ?? 1) : !0;
  }
  async consumePayload({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var n;
    const i = this.getPayloadState({ payloadId: e || t });
    if (!((n = i == null ? void 0 : i.sourceState) != null && n.isTracked)) return !0;
    const s = Math.max(1, Number(i.sourceState.consumePerUse ?? 1) || 1), r = Math.max(0, Number(i.sourceState.current ?? 0) || 0);
    return r < s ? !1 : i.sourceState.kind === "internal" ? (await this._mutateConsumptionSources((o) => o.map((l) => {
      var c;
      return l.id !== ((c = i.source) == null ? void 0 : c.id) ? l : (l.tracking ?? (l.tracking = {}), l.tracking.current = Math.max(0, r - s), jt(l));
    })), !0) : i.sourceState.kind === "actorResource" && this.actor && i.sourceState.currentPath ? (await this.actor.update({
      [i.sourceState.currentPath]: Math.max(0, r - s)
    }), !0) : i.sourceState.kind === "itemRef" && i.sourceState.sourceItem && i.sourceState.currentPath ? (await i.sourceState.sourceItem.update({
      [i.sourceState.currentPath]: Math.max(0, r - s)
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
    const s = t === "name" ? "label" : t === "damageType" ? "modifies.damageType" : t === "apMod" ? "modifies.ap" : t.startsWith("attackRatingBandMod.") ? `modifies.attackRatingBand.${t.split(".")[1]}` : t === "traits" ? "modifies.traits" : t;
    await this.updatePayloadField(e, s, i);
  }
  async createAmmoTypeStandardTrait(e, t = {}) {
    await this.createPayloadStandardTrait(e, t);
  }
  async deleteAmmoTypeStandardTrait(e, t) {
    await this.deletePayloadStandardTrait(e, t);
  }
  async updateAmmoTypeStandardTrait(e, t, i, s) {
    await this.updatePayloadStandardTrait(e, t, i, s);
  }
  getCombatProfile({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    if (!this.isPersonalWeapon()) return null;
    const i = this.system ?? {}, s = Si(i.range), r = String(i.skill ?? "").trim(), n = et(r), o = Number(i.damage ?? 0) || 0, l = String(i.category ?? i.weaponCategory ?? "ranged").trim() || "ranged", c = ml({
      damageType: i.damageType,
      ap: Number(i.ap ?? i.armorPiercing ?? 0) || 0,
      attackRatingBand: Xs(i.attackRatingBand),
      traits: Zt(i.traits),
      standardTraits: We(i.standardTraits),
      payloads: ht(i.payloads, { legacyAmmo: i.ammo, category: l }),
      selectedPayloadId: bi(i.selectedPayloadId, i.payloads, { legacyAmmo: i.ammo, category: l }),
      consumptionSources: _i(i.consumptionSources, { legacyAmmo: i.ammo }),
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
      skill: r || "firearms",
      skillDef: n,
      damage: o,
      ap: c.ap,
      damageType: c.damageType,
      damageTypeLabel: St(c.damageType),
      attackRatingBand: c.attackRatingBand,
      range: s,
      defaultRangeBand: this.getDefaultRangeBand(s),
      traits: c.traits,
      standardTraits: c.standardTraits,
      effects: c.effects,
      payloadLabel: c.payloadLabel,
      payload: c.payload,
      payloadState: c.payloadState,
      source: c.source,
      sourceState: c.sourceState,
      resolverKey: c.resolverKey,
      ammoLabel: c.payloadLabel,
      ammoType: c.payload,
      ammoState: c.ammoState,
      notes: String(i.notes ?? i.description ?? "").trim()
    };
  }
  getArmorProfile({ actor: e = this.actor } = {}) {
    var u, d;
    if (!this.isArmor()) return null;
    const t = this.system ?? {}, i = Math.max(0, Number(t.rating ?? 0)), s = Math.max(0, Number(((u = t == null ? void 0 : t.durability) == null ? void 0 : u.max) ?? i)), r = Math.min(
      s,
      Math.max(0, Number(((d = t == null ? void 0 : t.durability) == null ? void 0 : d.current) ?? s))
    ), n = bt((t == null ? void 0 : t.mitigationByType) ?? (t == null ? void 0 : t.mitigation)), o = Ks({
      standardTraits: ft(t == null ? void 0 : t.standardTraits),
      traits: Zt(t == null ? void 0 : t.traits),
      traitState: t == null ? void 0 : t.traitState
    }), l = ps(t == null ? void 0 : t.tags), c = Ka(r);
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
      baseMitigation: c,
      baseResistance: c,
      mitigationByType: kn(n, o.mitigationByType),
      tags: l,
      isDestroyed: r <= 0,
      durability: {
        current: r,
        max: s
      },
      traitState: o.traitState,
      standardTraits: ft(t.standardTraits),
      traits: pl({
        traits: Zt(t.traits),
        standardTraits: ft(t.standardTraits)
      }),
      notes: String(t.notes ?? "").trim()
    };
  }
  getDefaultRangeBand(e = Si(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    return _c(e);
  }
  isWeaponSkill(e) {
    return ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === b.itemType.skill && e.system.code === this.system.skill;
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find((s) => this.isWeaponSkill(s));
    if (e) return e;
    const t = game.items.find((s) => this.isWeaponSkill(s));
    return t || _r(this.system.skill);
  }
  getDefense() {
    if (!this.isPersonalWeapon())
      return this.system.defense ? he.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return he.fixedDefenseCode(this.system.defense);
    const e = et(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? he.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent) return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0, i = this.isPersonalWeapon() ? this.getCombatProfile() : null;
    return {
      value: $c(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: (i == null ? void 0 : i.damageType) ?? this.system.damageType,
      damageTypeLabel: (i == null ? void 0 : i.damageTypeLabel) ?? this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: Bc(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  getDamageCode() {
    return xc(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  getDamageTypeLabel() {
    var t;
    if (this.isPersonalWeapon())
      return St(((t = this.getCombatProfile()) == null ? void 0 : t.damageType) ?? this.system.damageType);
    const e = fe.mwd.weaponDamageType[this.system.damageType] ?? fe.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return Lc(Si(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  validateTargets(e) {
    var n;
    const t = (n = this.getDamage()) == null ? void 0 : n.monitor, i = Qe.getTargetTokens(game.user), s = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), r = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (r.length > 0) {
      const o = ce(fe.common.errors.ignoredTargets, {
        targets: r.reduce(J.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (s.length === 0) {
      const o = ce(fe.common.errors.noTargetSelected, {
        weapon: this.name ?? fe.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(s);
    return s;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = Or[t] ?? {};
    li.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = Or[t] ?? {};
    return i.targets && i.adjust && e <= i.targets ? i.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area === "" ? b.area.none : this.system.area ?? b.area.none;
  }
  _getMonitor() {
    return this.isPersonalWeapon() ? b.monitors.physical : this.system.monitor || b.monitors.physical;
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
Yi = new WeakMap(), tt = new WeakSet(), Ma = async function(e) {
  if (typeof (e == null ? void 0 : e.syncEquippedActorEffects) == "function")
    try {
      await e.syncEquippedActorEffects();
    } catch (t) {
      console.error(`${oe}Failed to sync equipped item effects`, { item: e, error: t });
    }
}, ro = async function(e) {
  if (typeof (e == null ? void 0 : e.removeSyncedActorEffects) == "function")
    try {
      await e.removeSyncedActorEffects({ actor: e.actor ?? e.parent ?? null });
    } catch (t) {
      console.error(`${oe}Failed to remove synced item effects`, { item: e, error: t });
    }
}, gs = async function(e) {
  const t = e == null ? void 0 : e.parent;
  if (typeof (t == null ? void 0 : t.syncEquippedActorEffects) == "function")
    try {
      await t.syncEquippedActorEffects();
    } catch (i) {
      console.error(`${oe}Failed to sync parent item effects`, { effect: e, error: i });
    }
}, ye(De, tt), ye(De, Yi, !1), R(De, "RANGE_ORDER", ni), R(De, "EQUIPPED_EFFECT_FLAG", "equippedItemSync"), R(De, "DEFAULT_UNARMED", Object.freeze({
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
let Ri = De;
const Lr = {
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
}, zc = {
  code: "weapon-range",
  options: {
    flags: { editable: !0 },
    order: 20,
    category: re.pool,
    labelkey: fe.common.roll.modifiers.weaponRange,
    hbsTemplateRoll: `${q}/roll/parts/select-option.hbs`,
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
}, Wc = {
  code: "weapon-area",
  options: {
    used: !0,
    order: 20,
    category: re.pool,
    labelkey: fe.common.roll.modifiers.weaponArea,
    hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
    hbsTemplateChat: void 0
    //``
  },
  isUsed: (a) => a.used,
  condition: (a) => a.weapon && a.weapon.getArea() != b.area.none,
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
}, le = class le extends Ri {
  static init() {
    Hooks.once(ke.REGISTER_ROLL_PARAMETERS, (e) => {
      e(Wc), e(zc);
    });
  }
  prepareBaseData() {
    if (super.prepareBaseData(), (this.canonicalType ?? this.type) !== b.itemType.personalWeapon) return;
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = lt(e.damageType), e.attackRatingBand = le.normalizeAttackRatingBand(e.attackRatingBand), e.range = le.normalizeRangeData(e.range), e.traits = le.normalizeTraits(e.traits), e.notes = String(e.notes ?? "").trim();
  }
  static maxIndex(e) {
    const t = le.RANGE_ORDER.indexOf(e);
    return t >= 0 ? t : le.RANGE_ORDER.indexOf("near");
  }
  /**
    * Compute UI-friendly range band data:
    * - cap: normalized max band
    * - bands: [{key, allowed, value}]
    * - optimalKey: highest value among allowed (tie -> closest)
    */
  static getRangeBands(e) {
    const t = e ?? {}, i = le.normalizeRangeKey(t.max ?? "near"), s = le.maxIndex(i), r = le.RANGE_ORDER.map((l, c) => ({
      key: l,
      allowed: c <= s,
      value: Number(t[l] ?? (l === "extreme" && t.long !== void 0 ? t.long : 0))
    }));
    let n = "close", o = -1 / 0;
    for (const l of r)
      l.allowed && l.value > o && (o = l.value, n = l.key);
    return { cap: i, bands: r, optimalKey: n };
  }
  static get defaultIcon() {
    return "systems/mwd/img/colt-m1911.svg";
  }
  static defaultIconForType(e) {
    return e === b.itemType.mechWeapon ? "systems/mwd/img/default/Default_Weapon.svg" : this.defaultIcon;
  }
  static normalizeTraits(e) {
    return ct(e);
  }
  static normalizeRangeData(e) {
    return {
      max: le.normalizeRangeKey((e == null ? void 0 : e.max) ?? "near"),
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
    if ((this.canonicalType ?? this.type) === b.itemType.personalWeapon)
      return super.getCombatProfile(e);
    const t = this.system ?? {}, i = this.canonicalType ?? this.type, s = le.normalizeRangeData(t.range), r = String(t.skill ?? "").trim(), n = et(r), o = Number(t.damage ?? 0) || 0, l = Number(t.ap ?? t.armorPiercing ?? 0) || 0, c = String(t.category ?? t.weaponCategory ?? "ranged").trim() || "ranged", u = le.normalizeTraits(t.traits);
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
      skill: r || "firearms",
      skillDef: n,
      damage: o,
      ap: l,
      damageType: i === b.itemType.personalWeapon ? lt(t.damageType) : String(t.damageType ?? "kinetic").trim() || "kinetic",
      attackRatingBand: le.normalizeAttackRatingBand(t.attackRatingBand),
      range: s,
      defaultRangeBand: this.getDefaultRangeBand(s),
      traits: u,
      effects: {},
      notes: String(t.notes ?? t.description ?? "").trim()
    };
  }
  getDefaultRangeBand(e = le.normalizeRangeData(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    const i = ["near", "close", "far", "extreme"], s = le.maxIndex(e.max);
    return i.find((r) => le.RANGE_ORDER.indexOf(r) <= s) ?? "close";
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find(
      (s) => s.type === b.itemType.skill && s.system.code === this.system.skill
    );
    if (e) return e;
    const t = et(String(this.system.skill ?? "").trim());
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
    if ((this.canonicalType ?? this.type) !== b.itemType.personalWeapon)
      return this.system.defense ? he.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return he.fixedDefenseCode(this.system.defense);
    const e = et(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? he.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent)
      return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0;
    return {
      value: le.damageValue(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: this.system.damageType,
      damageTypeLabel: this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: le.armorMode(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  static damageValue(e, t, i, s) {
    if (t = Number(t), i)
      if (s !== void 0)
        t = t + Math.ceil(Number(s) / 2);
      else
        return console.warn("Weapon not attached to an actor"), fe.item.personalWeapon.weaponWithoutActor;
    return t;
  }
  getDamageCode() {
    return le.damageCode(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  static damageCode(e, t, i) {
    let s = "";
    return i && fe.attributes[i] && (s += fe.attributes[i].substring(0, 3).toUpperCase() + "/2 + "), s += String(t), s;
  }
  static armorMode(e, t) {
    return L.useArmor(e) ? t ? "noArmor" : "withArmor" : "";
  }
  getDamageTypeLabel() {
    if ((this.canonicalType ?? this.type) === b.itemType.personalWeapon)
      return St(this.system.damageType);
    const e = fe.mwd.weaponDamageType[this.system.damageType] ?? fe.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return le.getRangeList(le.normalizeRangeData(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  _getRange(e) {
    return { value: this.system.range[e], labelkey: te.getFromList(te.getEnums().ranges, e) };
  }
  static getRangeList(e) {
    const t = le.normalizeRangeKey(e == null ? void 0 : e.max), i = le.RANGE_ORDER.indexOf(t);
    return le.RANGE_ORDER.map((s, r) => ({
      key: s,
      allowed: i >= 0 ? r <= i : r === 0,
      value: (e == null ? void 0 : e[s]) ?? (s === "extreme" && (e == null ? void 0 : e.long) !== void 0 ? e.long : void 0),
      labelkey: te.getFromList(te.getEnums().ranges, s)
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
    var n;
    const t = (n = this.getDamage()) == null ? void 0 : n.monitor, i = Qe.getTargetTokens(game.user), s = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), r = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (r.length > 0) {
      const o = ce(fe.common.errors.ignoredTargets, {
        targets: r.reduce(J.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (s.length == 0) {
      const o = ce(fe.common.errors.noTargetSelected, {
        weapon: this.name ?? fe.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(s);
    return s;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = Lr[t] ?? {};
    li.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = Lr[t] ?? {};
    return i.targets && i.adjust && e <= i.targets ? i.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area == "" ? b.area.none : this.system.area ?? b.area.none;
  }
  _getMonitor() {
    return (this.canonicalType ?? this.type) === b.itemType.personalWeapon ? b.monitors.physical : this.system.monitor || b.monitors.physical;
  }
};
R(le, "RANGE_ORDER", ["close", "near", "far", "extreme"]), R(le, "DEFAULT_UNARMED", Ri.DEFAULT_UNARMED);
let Ze = le;
function Uc(a) {
  const e = [];
  for (let [t, i] of Object.entries(a ?? {}))
    i !== void 0 && (t = t.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (s, r) => (r ? "-" : "") + s.toLowerCase()), e.push(`data-${t}="${Handlebars.escapeExpression(i)}"`));
  return new Handlebars.SafeString(e.join(" "));
}
function Hc({ hash: a }) {
  return a;
}
function jc() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
class nr {
  constructor() {
    this.registerHelpers(), Hooks.once("init", () => {
      this.registerHelpers(), console.log(`${oe}Handlebars helpers registered (init)`);
    }), console.log(`${oe}Handlebars helpers registered (ctor)`);
  }
  registerHelpers() {
    const e = jc(), t = {
      // Foundry utils
      getProperty: foundry.utils.getProperty,
      // DND5E-inspired utilities
      "mwd-dataset": Uc,
      "mwd-object": Hc,
      // Simple comparisons
      eq: (i, s) => i === s,
      ne: (i, s) => i !== s,
      // Strings/arrays
      concat: (...i) => J.join(i.slice(0, -1)),
      join: (i, s = " ") => Array.isArray(i) ? i.join(s) : "",
      includes: (i, s) => i == null ? void 0 : i.includes(s),
      length: (i) => (i == null ? void 0 : i.length) || 0,
      substring: (i, s, r) => i == null ? void 0 : i.substring(s, r),
      toUpperCase: Ko.toUpperCaseNoAccent,
      // Math
      modulo: (i, s) => i % s,
      divint: J.divint,
      divup: J.divup,
      sum: (i, s) => i + s,
      diff: (i, s) => i - s,
      times: (i, s) => i * s,
      min: (i, s) => Math.min(i, s),
      max: (i, s) => Math.max(i, s),
      // Utility blocks
      for: nr.hbsForLoop,
      // fixes “Missing helper: for”
      range: (i, s) => Array.from({ length: s - i + 1 }, (r, n) => i + n),
      ifGte: (i, s, r) => i >= s ? r.fn(this) : r.inverse(this),
      // Damage / weapons (legacy-compatible)
      weaponDamageLetter: Vo.letter,
      weaponDamageCode: Ze.damageCode,
      weaponDamageValue: Ze.damageValue,
      weaponArmorMode: Ze.armorMode,
      weaponRangeList: Ze.getRangeList,
      // Icons
      iconFA: F.fontAwesome,
      iconSrc: F.iconSystemPath,
      iconPath: F.iconPath,
      iconD6: F.iconD6,
      // Enums
      localizeAttribute: te.localizeAttribute
    };
    e.registerHelper(t), e !== Handlebars && Handlebars.registerHelper(t);
  }
  static hbsForLoop(e, t, i) {
    let s = "";
    for (let r = e; r < t; ++r) s += i.fn(r);
    return s;
  }
}
const $r = "sheetTheme", Ea = "mwd-theme-default", qc = "mwd-theme-sra", Gc = [
  { name: "Default (CSB)", cssClass: Ea },
  { name: "SRA", cssClass: qc }
];
class Vc {
  constructor() {
    this.availableStyles = {}, ai.register(ke.REGISTER_STYLES), Hooks.once(ke.REGISTER_STYLES, (e) => Gc.forEach((t) => e(t.cssClass, t.name))), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(ke.REGISTER_STYLES, (e, t) => this.availableStyles[e] = t), console.log(oe + "Loaded styles", this.availableStyles), game.settings.register(v, $r, {
      scope: "world",
      name: "Sheet Theme",
      hint: "Select the visual theme used by MWD sheets.",
      config: !0,
      default: Ea,
      choices: this.availableStyles,
      type: String,
      onChange: () => {
        setTimeout(() => {
          var e, t;
          for (const i of Object.values(ui.windows ?? {})) {
            if (typeof (i == null ? void 0 : i.render) != "function") continue;
            const s = i.element instanceof HTMLElement ? i.element : (e = i.element) == null ? void 0 : e[0];
            (t = s == null ? void 0 : s.classList) != null && t.contains("actor-sheet-v2") && i.render(!1);
          }
        }, 0);
      }
    });
  }
  selectCssClass() {
    const e = game.settings.get(v, $r);
    return this.availableStyles[e] ? e : Ea;
  }
}
const Kc = /* @__PURE__ */ new Set(["overloaded"]);
function xr(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function Yc(a, e) {
  var i, s, r;
  if (!a) return null;
  const t = xr(e) ?? xr(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((r = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : r.call(i, ((s = t == null ? void 0 : t.baseActor) == null ? void 0 : s.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function no(a) {
  const e = String(a ?? "").trim();
  if (!e) return "Status";
  const s = (e.includes(".") ? e.split(".").at(-1) : e).replace(/^status/i, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return s ? s.replace(/\b\w/g, (r) => r.toUpperCase()) : e;
}
function Qc(a) {
  const e = String((a == null ? void 0 : a.name) ?? (a == null ? void 0 : a.label) ?? (a == null ? void 0 : a.id) ?? "Status").trim();
  return e ? no(e) : "Status";
}
function Jc(a) {
  const e = typeof (a == null ? void 0 : a.img) == "string" ? a.img.trim() : "";
  if (e) return e;
  const t = a ? Object.getOwnPropertyDescriptor(a, "icon") : null;
  return "value" in (t ?? {}) ? String(t.value ?? "").trim() : "";
}
function Cs(a, e) {
  var t, i, s, r, n, o;
  return e === "overloaded" ? !!((i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.burn) != null && i.overloaded) || !!((r = (s = a == null ? void 0 : a.statuses) == null ? void 0 : s.has) != null && r.call(s, e)) : ((o = (n = a == null ? void 0 : a.statuses) == null ? void 0 : n.has) == null ? void 0 : o.call(n, e)) ?? !1;
}
function or(a) {
  const e = /* @__PURE__ */ new Set();
  return (CONFIG.statusEffects ?? []).filter((t) => {
    const i = String((t == null ? void 0 : t.id) ?? "").trim();
    return !i || e.has(i) ? !1 : (e.add(i), !0);
  }).map((t) => {
    const i = String(t.id).trim();
    return {
      id: i,
      label: Qc(t),
      icon: Jc(t),
      active: Cs(a, i),
      managed: Kc.has(i)
    };
  }).sort((t, i) => t.active !== i.active ? t.active ? -1 : 1 : t.label.localeCompare(i.label));
}
function Xc(a) {
  if (!a.length)
    return "<p>No token statuses are configured.</p>";
  const e = foundry.utils.escapeHTML;
  return `
    <div class="mwd-token-status-dialog">
      <p style="margin-top: 0;">Toggle the statuses shown on this token.</p>
      <div style="display: grid; gap: 0.2rem; max-height: 20rem; overflow-y: auto; padding-right: 0.25rem;">
        ${a.map((i) => {
    const s = i.active ? "checked" : "", r = i.icon ? `<img src="${e(i.icon)}" alt="" width="20" height="20" style="flex: 0 0 20px; border: 0;" />` : "", n = i.managed ? '<small style="opacity: 0.7;">Managed by system state</small>' : "";
    return `
      <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.2rem 0;">
        <input type="checkbox" name="status" value="${e(i.id)}" ${s} />
        ${r}
        <span style="flex: 1 1 auto;">${e(i.label)}</span>
        ${n}
      </label>
    `;
  }).join("")}
      </div>
    </div>
  `;
}
async function Zc({ actor: a, effects: e, selectedStatusIds: t }) {
  const i = new Set(t);
  for (const s of e) {
    const r = i.has(s.id);
    await oo({ actor: a, statusId: s.id, active: r });
  }
}
async function oo({ actor: a, statusId: e, active: t }) {
  if (!a || !e) return !1;
  const i = Cs(a, e);
  return !!t === i ? !1 : e === "overloaded" ? (await a.update({ "system.burn.overloaded": !!t }), !0) : (await a.toggleStatusEffect(e, { active: !!t, overlay: !1 }), !0);
}
async function eu({ actor: a, token: e } = {}) {
  var s;
  if (!a || !e) return !1;
  const t = Yc(a, e), i = or(t);
  return i.length ? foundry.applications.api.DialogV2.wait({
    window: {
      title: `Token Statuses: ${e.name ?? a.name ?? "Token"}`
    },
    position: {
      width: 420
    },
    content: Xc(i),
    buttons: [
      {
        action: "apply",
        label: "Apply",
        icon: "fa-solid fa-check",
        default: !0,
        callback: async (r, n) => {
          var o, l;
          try {
            const c = Array.from(
              ((o = n.form) == null ? void 0 : o.querySelectorAll('input[name="status"]:checked')) ?? []
            ).map((u) => u.value);
            return await Zc({ actor: t, effects: i, selectedStatusIds: c }), !0;
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
  }) : ((s = ui.notifications) == null || s.warn("No token statuses are configured."), !1);
}
const tu = Object.freeze({
  STR: zt.strength,
  REF: zt.reflexes,
  WIL: zt.willpower,
  INT: zt.intelligence,
  CHA: zt.charisma
}), iu = Object.freeze({
  STR: "Strength",
  REF: "Reflexes",
  WIL: "Willpower",
  INT: "Intelligence",
  CHA: "Charisma"
}), su = Object.freeze({
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
function lr(a) {
  const e = String(a ?? "").trim();
  return e ? su[e] ?? null : null;
}
function au(a) {
  const e = lr(a);
  return e ? {
    intent: "common",
    id: e.id
  } : null;
}
function ru(a) {
  return tu[String(a ?? "").trim().toUpperCase()] ?? null;
}
function nu(a) {
  return iu[String(a ?? "").trim().toUpperCase()] ?? String(a ?? "").trim().toUpperCase();
}
function ou(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => String(e ?? "").trim().toUpperCase()).filter(Boolean).join(" + ");
}
const hi = "mwd", gi = "personalCombat", Ft = 3, lu = 1, cu = 1;
function ea(a, e) {
  return !(a != null && a.activation) || !e ? !1 : a.activation.combatId === e.combatId && Number(a.activation.round ?? -1) === Number(e.round ?? -1) && Number(a.activation.turn ?? -1) === Number(e.turn ?? -1) && a.activation.combatantId === e.combatantId;
}
function Ca(a = null) {
  return {
    saRemaining: Ft,
    faRemaining: lu,
    raRemaining: cu,
    saSpentThisActivation: 0,
    burnThisActivation: 0,
    attacksThisActivation: 0,
    reactionBurnSinceLastActivation: 0,
    traitUsage: {
      activation: {},
      round: {}
    },
    actionLog: [],
    activation: a
  };
}
function as(a, e = null) {
  return foundry.utils.mergeObject(
    Ca(e),
    foundry.utils.deepClone(a ?? {}),
    { inplace: !1, overwrite: !0 }
  );
}
function ta(a) {
  return Array.isArray(a) ? a.map((e) => {
    const t = String((e == null ? void 0 : e.label) ?? "").trim();
    return t ? {
      id: String((e == null ? void 0 : e.id) ?? "").trim(),
      label: t,
      costLabel: String((e == null ? void 0 : e.costLabel) ?? "").trim()
    } : null;
  }).filter(Boolean) : [];
}
function uu(a) {
  const e = (CONFIG.statusEffects ?? []).find((i) => String((i == null ? void 0 : i.id) ?? "").trim() === a), t = String((e == null ? void 0 : e.name) ?? (e == null ? void 0 : e.label) ?? a ?? "").trim();
  return no(t);
}
function yi(a) {
  const e = Number(a);
  return !Number.isFinite(e) || e === 0 ? "0" : e > 0 ? `+${e}` : String(e);
}
function du(a) {
  if (typeof a == "number") return Number.isFinite(a) ? a : 0;
  const e = String(a ?? "").trim().match(/[-+]?\d+(\.\d+)?/);
  return e ? Number(e[0]) : 0;
}
function Br(a) {
  var o;
  const e = (a == null ? void 0 : a.document) ?? a ?? null, t = (a == null ? void 0 : a.object) ?? (e == null ? void 0 : e.object) ?? a ?? null, i = String((e == null ? void 0 : e.id) ?? "").trim(), s = ne._pendingTokenPositions.get(i) ?? null, r = Number((s == null ? void 0 : s.x) ?? (e == null ? void 0 : e.x)), n = Number((s == null ? void 0 : s.y) ?? (e == null ? void 0 : e.y));
  return t && Number.isFinite(r) && Number.isFinite(n) && typeof t.getCenter == "function" ? t.getCenter(r, n) : (t == null ? void 0 : t.center) ?? ((o = e == null ? void 0 : e.object) == null ? void 0 : o.center) ?? null;
}
function mu(a, e = "") {
  if (!Number.isFinite(a)) return "";
  const t = Math.round(a * 10) / 10, i = Number.isInteger(t) ? String(t) : t.toFixed(1);
  return e ? `${i} ${e}` : i;
}
class ne {
  static init() {
    Hooks.on("updateCombat", (e, t) => this._onUpdateCombat(e, t)), Hooks.on("updateCombatant", (e, t) => this._onUpdateCombatant(e, t)), Hooks.on("updateToken", (e, t) => this._onUpdateToken(e, t)), Hooks.on("createCombatant", (e) => this._onCreateCombatant(e)), Hooks.on("deleteCombatant", (e) => this._onDeleteCombatant(e)), Hooks.on("deleteCombat", (e) => this._onDeleteCombat(e)), Hooks.on("targetToken", (e, t, i) => this._onTargetToken(e, t, i));
  }
  static async onReady() {
    var e, t;
    await this.ensureCurrentCombatantState(), (e = game.combat) != null && e.id && this._lastActivationByCombat.set(game.combat.id, ((t = game.combat.combatant) == null ? void 0 : t.id) ?? null), this.renderOpenCharacterSheets();
  }
  static _asTokenDocument(e) {
    return e ? (e == null ? void 0 : e.document) ?? e : null;
  }
  static _getTokenSceneId(e) {
    var i, s, r, n;
    const t = this._asTokenDocument(e);
    return ((i = t == null ? void 0 : t.parent) == null ? void 0 : i.id) ?? ((s = t == null ? void 0 : t.scene) == null ? void 0 : s.id) ?? ((n = (r = t == null ? void 0 : t.object) == null ? void 0 : r.scene) == null ? void 0 : n.id) ?? null;
  }
  static _getSceneTokenDocumentById(e, t = ((i) => (i = canvas == null ? void 0 : canvas.scene) == null ? void 0 : i.id)()) {
    var n, o, l, c, u;
    const s = String(e ?? "").trim();
    if (!s || !t) return null;
    const r = ((n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.id) === t ? canvas.scene : (l = (o = game.scenes) == null ? void 0 : o.get) == null ? void 0 : l.call(o, t);
    return ((u = (c = r == null ? void 0 : r.tokens) == null ? void 0 : c.get) == null ? void 0 : u.call(c, s)) ?? null;
  }
  static _collectActorIds(e, t = null) {
    var n, o;
    const i = /* @__PURE__ */ new Set(), s = (l) => {
      const c = String(l ?? "").trim();
      c && i.add(c);
    };
    s(e == null ? void 0 : e.id), s(e == null ? void 0 : e._id);
    const r = this._asTokenDocument(t) ?? this._asTokenDocument(e == null ? void 0 : e.token);
    return s((n = r == null ? void 0 : r.actor) == null ? void 0 : n.id), s((o = r == null ? void 0 : r.baseActor) == null ? void 0 : o.id), s(r == null ? void 0 : r.actorId), i;
  }
  static _tokenDocumentMatchesActor(e, t, i = null) {
    var n, o;
    const s = this._asTokenDocument(e);
    if (!s || !t) return !1;
    const r = i ?? this._collectActorIds(t, s);
    return [
      (n = s == null ? void 0 : s.actor) == null ? void 0 : n.id,
      (o = s == null ? void 0 : s.baseActor) == null ? void 0 : o.id,
      s == null ? void 0 : s.actorId
    ].some((l) => r.has(String(l ?? "").trim()));
  }
  static getPreferredTokenDocument(e) {
    var s, r;
    if (!e) return null;
    const t = this._asTokenDocument(e == null ? void 0 : e.token);
    return t || (((r = (((s = e.getActiveTokens) == null ? void 0 : s.call(e, !0, !0)) ?? [])[0]) == null ? void 0 : r.document) ?? null);
  }
  static getPreferredToken(e) {
    const t = this.getPreferredTokenDocument(e);
    return t ? t.object ?? this._getSceneTokenById(t.id) : null;
  }
  static getCurrentSceneTokenDocument(e, t = null) {
    var f, y, h, g;
    const i = (f = canvas == null ? void 0 : canvas.scene) == null ? void 0 : f.id, s = this._asTokenDocument(t);
    if (this._getTokenSceneId(s) === i) return s;
    const r = String((s == null ? void 0 : s.id) ?? (t == null ? void 0 : t.id) ?? "").trim();
    if (r) {
      const S = this._getSceneTokenDocumentById(r, i);
      if (S) return S;
    }
    const n = this.getPreferredTokenDocument(e);
    if (this._getTokenSceneId(n) === i) return n;
    const o = String((n == null ? void 0 : n.id) ?? "").trim();
    if (o) {
      const S = this._getSceneTokenDocumentById(o, i);
      if (S) return S;
    }
    const c = ((h = (((y = e == null ? void 0 : e.getActiveTokens) == null ? void 0 : y.call(e, !0, !0)) ?? []).find((S) => {
      var T, k;
      return ((k = (T = S == null ? void 0 : S.document) == null ? void 0 : T.parent) == null ? void 0 : k.id) === i;
    })) == null ? void 0 : h.document) ?? null;
    if (c) return c;
    const u = Array.from(((g = canvas == null ? void 0 : canvas.scene) == null ? void 0 : g.tokens) ?? []), d = this._collectActorIds(e, n), p = u.filter((S) => this._tokenDocumentMatchesActor(S, e, d));
    return p.find((S) => {
      var T, k, P;
      return ((T = S == null ? void 0 : S.combatant) == null ? void 0 : T.id) === ((P = (k = game.combat) == null ? void 0 : k.combatant) == null ? void 0 : P.id);
    }) ?? null ?? p[0] ?? null;
  }
  static getCurrentSceneToken(e, t = null) {
    const i = this.getCurrentSceneTokenDocument(e, t);
    return i ? i.object ?? this._getSceneTokenById(i.id) : null;
  }
  static _getSceneTokenById(e) {
    var t, i, s, r;
    return e ? ((i = (t = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : t.get) == null ? void 0 : i.call(t, e)) ?? ((r = (s = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : s.placeables) == null ? void 0 : r.find((n) => n.id === e)) ?? null : null;
  }
  static _measureTokenDistance(e, t) {
    const i = canvas == null ? void 0 : canvas.grid, s = Br(e), r = Br(t), n = globalThis.Ray;
    if (!i || !s || !r) return null;
    if (typeof i.measureDistances == "function" && typeof n == "function")
      try {
        const o = i.measureDistances([{ ray: new n(s, r) }], { gridSpaces: !0 }), l = Number(Array.isArray(o) ? o[0] : NaN);
        if (Number.isFinite(l)) return l;
      } catch {
      }
    if (typeof i.measurePath == "function")
      try {
        const o = i.measurePath([s, r], { gridSpaces: !0 }), l = Number(
          (o == null ? void 0 : o.distance) ?? (o == null ? void 0 : o.cost) ?? (o == null ? void 0 : o.totalDistance) ?? (o == null ? void 0 : o.totalCost) ?? NaN
        );
        if (Number.isFinite(l)) return l;
      } catch {
        return null;
      }
    return null;
  }
  static getUserTargetTokens(e = game.user) {
    var s;
    const i = (Array.isArray((s = e == null ? void 0 : e.targets) == null ? void 0 : s.ids) ? e.targets.ids : []).map((r) => this._getSceneTokenById(r)).filter(Boolean);
    return i.length ? i : Array.from((e == null ? void 0 : e.targets) ?? []).map((r) => (r == null ? void 0 : r.object) ?? r).filter(Boolean);
  }
  static getTargetingSnapshot(e = null, t = game.user) {
    var u, d, p, m, f, y, h, g;
    const i = this.getUserTargetTokens(t), s = i.length;
    if (s === 0)
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
    if (s > 1)
      return {
        count: s,
        none: !1,
        single: !1,
        multiple: !0,
        heading: "Targets",
        primaryLabel: `${s} selected`,
        detailRows: [],
        target: null
      };
    const r = i[0], n = this._measureTokenDistance(e, r), o = String(((d = (u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.grid) == null ? void 0 : d.units) ?? ((m = (p = game.system) == null ? void 0 : p.grid) == null ? void 0 : m.units) ?? "").trim(), l = mu(n, o), c = String((r == null ? void 0 : r.name) ?? ((f = r == null ? void 0 : r.actor) == null ? void 0 : f.name) ?? "Target").trim() || "Target";
    return {
      count: s,
      none: !1,
      single: !0,
      multiple: !1,
      heading: "Target",
      primaryLabel: c,
      detailRows: l ? [{ label: "Distance", value: l }] : [],
      target: {
        id: (r == null ? void 0 : r.id) ?? null,
        name: c,
        img: ((h = (y = r == null ? void 0 : r.document) == null ? void 0 : y.texture) == null ? void 0 : h.src) ?? ((g = r == null ? void 0 : r.texture) == null ? void 0 : g.src) ?? "",
        distance: Number.isFinite(n) ? n : null,
        distanceLabel: l
      }
    };
  }
  static getRollImpact(e = []) {
    const t = (Array.isArray(e) ? e : []).map((s) => {
      const r = du((s == null ? void 0 : s.numericValue) ?? (s == null ? void 0 : s.value) ?? 0);
      return {
        label: String((s == null ? void 0 : s.label) ?? "").trim() || "Modifier",
        numericValue: r,
        value: String((s == null ? void 0 : s.value) ?? yi(r)).trim() || yi(r)
      };
    }), i = t.reduce((s, r) => s + r.numericValue, 0);
    return {
      total: i,
      totalLabel: yi(i),
      entries: t
    };
  }
  static getCombat(e, t = null) {
    var p, m, f, y;
    const i = (p = canvas == null ? void 0 : canvas.scene) == null ? void 0 : p.id, s = game.combat, r = this.getCurrentSceneTokenDocument(e, t), n = (r == null ? void 0 : r.object) ?? this._getSceneTokenById((r == null ? void 0 : r.id) ?? null);
    if (!s || ((m = s.scene) == null ? void 0 : m.id) !== i)
      return {
        combat: null,
        combatant: null,
        token: n,
        tokenDocument: r
      };
    let o = ((y = (f = r == null ? void 0 : r.combatant) == null ? void 0 : f.combat) == null ? void 0 : y.id) === s.id ? r.combatant : null;
    const l = Array.from(s.combatants ?? []);
    if (!o) {
      const h = this._collectActorIds(e, r), g = l.filter((k) => {
        const P = String((k == null ? void 0 : k.tokenId) ?? "").trim();
        if (r && P === String(r.id ?? "").trim() || h.has(String((k == null ? void 0 : k.actorId) ?? "").trim())) return !0;
        const I = this._asTokenDocument(k == null ? void 0 : k.token) ?? this._getSceneTokenDocumentById(P, i);
        return this._tokenDocumentMatchesActor(I, e, h);
      }), S = g.find((k) => {
        var P;
        return k.id === ((P = s == null ? void 0 : s.combatant) == null ? void 0 : P.id);
      }) ?? null, T = g.find(
        (k) => r && String((k == null ? void 0 : k.tokenId) ?? "").trim() === String(r.id ?? "").trim()
      ) ?? null;
      o = S ?? T ?? g[0] ?? null;
    }
    !o && l.length === 1 && (n || e) && (o = l[0]);
    const c = this._asTokenDocument(o == null ? void 0 : o.token) ?? this._getSceneTokenDocumentById((o == null ? void 0 : o.tokenId) ?? null, i), u = r ?? c ?? null, d = n ?? (c == null ? void 0 : c.object) ?? this._getSceneTokenById((o == null ? void 0 : o.tokenId) ?? null) ?? null;
    return {
      combat: s,
      combatant: o,
      token: d,
      tokenDocument: u
    };
  }
  static getSnapshot(e, { token: t = null } = {}) {
    var k, P, I, O, x;
    const {
      combat: i,
      combatant: s,
      token: r,
      tokenDocument: n
    } = this.getCombat(e, t), o = !!s && ((k = i == null ? void 0 : i.combatant) == null ? void 0 : k.id) === s.id, l = s ? this.getActivationIdentity(i, s) : null, c = s ? s.getFlag(hi, gi) : null, u = s && o && ea(c, l) ? as(c, l) : Ca(l);
    u.actionLog = ta(u.actionLog);
    const d = Math.max(0, Number(((I = (P = e == null ? void 0 : e.system) == null ? void 0 : P.burn) == null ? void 0 : I.value) ?? 0)), p = Math.floor(d / 2), m = !!((x = (O = e == null ? void 0 : e.system) == null ? void 0 : O.burn) != null && x.overloaded), f = this.getActiveStatuses(e), y = f.filter((j) => !(m && j.id === "overloaded")), h = this.getModifierSummary(e, p), g = this.getRollImpact(h), S = Math.max(0, Number(u.burnThisActivation ?? 0)), T = s ? o ? "" : "Waiting for this combatant's activation." : "No combatant on the current scene.";
    return {
      token: r,
      tokenDocument: n,
      combat: i,
      combatant: s,
      hasCombatant: !!s,
      isCurrentTurn: o,
      overloaded: m,
      burn: {
        value: d,
        penalty: p,
        canOverloadCheck: d >= 6 && !m
      },
      state: u,
      targeting: this.getTargetingSnapshot(r),
      states: m ? [{ id: "overloaded", label: "Overloaded" }] : [],
      effects: y,
      statuses: f,
      rollImpact: g,
      summaryText: `SA: ${u.saRemaining} / ${Ft}   FA: ${u.faRemaining}   RA: ${u.raRemaining}`,
      activation: {
        burnThisActivation: S,
        burnThisActivationLabel: `+${S}`,
        items: [
          { label: "SA", value: `${u.saRemaining}/${Ft}` },
          { label: "FA", value: String(u.faRemaining) },
          { label: "RA", value: String(u.raRemaining) },
          { label: "Burn", value: `+${S}`, detail: "this activation" }
        ]
      },
      inactiveReason: T,
      modifierSummary: h
    };
  }
  static getModifierSummary(e, t = Math.floor(Number(((s) => (s = ((i) => (i = e == null ? void 0 : e.system) == null ? void 0 : i.burn)()) == null ? void 0 : s.value)() ?? 0) / 2)) {
    var c, u;
    const r = ((u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.derived) == null ? void 0 : u.condition) ?? {}, n = [];
    t > 0 && n.push({
      label: "Burn Penalty",
      numericValue: -t,
      value: yi(-t)
    });
    const o = Number(r.fatiguePenalty ?? 0);
    o && n.push({
      label: "Fatigue",
      numericValue: o,
      value: yi(o)
    });
    const l = Number(r.physicalPenalty ?? 0);
    return l && n.push({
      label: "Physical",
      numericValue: l,
      value: yi(l)
    }), n.length || n.push({
      label: "Current Modifiers",
      numericValue: 0,
      value: "0"
    }), n;
  }
  static getActiveStatuses(e) {
    return Array.from((e == null ? void 0 : e.statuses) ?? []).map((i) => ({
      id: i,
      label: uu(i)
    })).sort((i, s) => i.label.localeCompare(s.label));
  }
  static buildActionModel(e, t) {
    var y, h, g;
    const i = t.hasCombatant ? "" : "No current-scene combatant.", s = t.isCurrentTurn ? "" : "Only during your activation.", r = t.overloaded ? "Overloaded: only Burn recovery is allowed." : "", n = Fr(e, t), o = i || s || r, l = [
      { id: "move", label: "Move", resource: "sa", cost: 1, supported: !0 },
      { id: "aim", label: "Aim", resource: "sa", cost: 1, supported: !0 },
      { id: "reload", label: "Reload", resource: "sa", cost: 1, supported: !0 },
      { id: "assist", label: "Assist", resource: "sa", cost: 1, supported: !0 },
      { id: "stand", label: "Stand", resource: "sa", cost: 1, supported: !0 }
    ].map((S) => this._buildSpendAction(
      t,
      S,
      o || (n < S.cost ? "Activation SA cap reached." : "")
    )), c = i || s || r || (n < 2 ? "Activation SA cap reached." : ""), u = [
      {
        id: "attack",
        label: "Attack",
        costLabel: "2 SA",
        handler: "combatAttack",
        disabled: !!c,
        reason: c,
        prominent: !0
      },
      { id: "firstAid", label: "First Aid", costLabel: "2 SA" },
      { id: "emergencyRepair", label: "Emergency Repair", costLabel: "2 SA" }
    ].map((S) => S.handler ? S : this._buildStubAction(S)), d = i || s || (n <= 0 ? "Activation SA cap reached." : "") || (t.burn.value <= 0 ? "Burn is already at 0." : ""), p = i || s || (t.burn.canOverloadCheck ? "" : t.overloaded ? "Already Overloaded." : "Burn below 6."), m = i || s, f = (S) => {
      const T = lr(S), k = au(S);
      return !k || !T ? null : {
        id: S,
        label: T.label,
        handler: "roll",
        roll: JSON.stringify(k),
        disabled: !1,
        reason: ""
      };
    };
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
        f("composure"),
        f("judgeIntent"),
        f("memory"),
        f("lift"),
        f("endure")
      ].filter(Boolean),
      summaryPills: [
        { label: "SA", value: `${t.state.saRemaining}/${Ft}` },
        { label: "Cap", value: `${Math.max(0, Number(((y = t.state) == null ? void 0 : y.saSpentThisActivation) ?? 0))}/${Pa(e)}` },
        { label: "FA", value: `${t.state.faRemaining}` },
        { label: "RA", value: `${t.state.raRemaining}` },
        { label: "Burn/Turn", value: `+${Math.max(0, Number(((h = t.state) == null ? void 0 : h.burnThisActivation) ?? 0))}` }
      ],
      activationLog: ta((g = t.state) == null ? void 0 : g.actionLog).map((S, T) => ({
        ...S,
        index: T + 1
      })),
      menus: [
        {
          id: "simple",
          label: "Simple Actions",
          actions: l
        },
        {
          id: "burn",
          label: "Burn & Recovery",
          actions: [
            {
              id: "reduceBurn",
              label: "Reduce Burn",
              costLabel: "1 SA",
              handler: "combatReduceBurn",
              disabled: !!d,
              reason: d,
              prominent: t.burn.value >= 6
            },
            {
              id: "overloadCheck",
              label: "Overload Check",
              costLabel: "Check",
              handler: "combatOverloadCheck",
              disabled: !!p,
              reason: p,
              roll: JSON.stringify({ intent: "overload" }),
              prominent: t.burn.value >= 6
            }
          ]
        },
        {
          id: "complex",
          label: "Complex Actions",
          actions: u
        },
        {
          id: "reaction",
          label: "Free & Reaction",
          actions: [
            this._buildSpendAction(t, {
              id: "spendFA",
              label: "Spend FA",
              resource: "fa",
              cost: 1,
              supported: !0
            }, m),
            this._buildSpendAction(t, {
              id: "spendRA",
              label: "Spend RA",
              resource: "ra",
              cost: 1,
              supported: !0
            }, m)
          ]
        }
      ]
    };
  }
  static _buildSpendAction(e, t, i = "") {
    var l;
    const s = Number(((l = e.state) == null ? void 0 : l[`${t.resource}Remaining`]) ?? 0), r = t.resource === "sa" ? "" : s < t.cost ? `No ${String(t.resource).toUpperCase()} remaining.` : "", n = i || r, o = this._formatCostLabel(t.resource, t.cost);
    return {
      id: t.id,
      label: t.label,
      costLabel: o,
      handler: "combatSpend",
      resource: t.resource,
      cost: t.cost,
      disabled: !!n,
      reason: n,
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
  static _appendActionLog(e, { id: t = "", label: i = "", costLabel: s = "" } = {}) {
    const r = String(i ?? "").trim();
    if (!r) return;
    const n = ta(e == null ? void 0 : e.actionLog);
    n.push({
      id: String(t ?? "").trim(),
      label: r,
      costLabel: String(s ?? "").trim()
    }), e.actionLog = n;
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
    var r, n;
    if (!game.user.isGM) return;
    const e = game.combat, t = e == null ? void 0 : e.combatant;
    if (!e || !t || ((r = e.scene) == null ? void 0 : r.id) !== ((n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.id)) return;
    const i = this.getActivationIdentity(e, t), s = t.getFlag(hi, gi);
    ea(s, i) || await t.setFlag(hi, gi, Ca(i));
  }
  static async spendResource(e, {
    token: t = null,
    resource: i = "sa",
    cost: s = 1,
    actionId: r = "",
    actionLabel: n = "",
    actionCostLabel: o = ""
  } = {}) {
    var S, T, k, P, I, O, x;
    const l = this.getSnapshot(e, { token: t });
    if (!l.hasCombatant)
      return { ok: !1, reason: "No combatant on the current scene." };
    if (!l.isCurrentTurn)
      return { ok: !1, reason: "Only available during your activation." };
    const c = {
      combat: l.combat,
      combatant: l.combatant,
      state: as(l.state, this.getActivationIdentity(l.combat, l.combatant)),
      sceneId: ((S = canvas == null ? void 0 : canvas.scene) == null ? void 0 : S.id) ?? "",
      snapshot: l
    };
    let u = Math.max(0, Number(s ?? 0) || 0);
    const d = Xe({
      actor: e,
      phase: "onBeforeActionCostFinalized",
      facts: Zn({
        actor: e,
        packet: { actionId: r, resource: i, cost: u },
        runtime: c
      }),
      packet: { actionId: r, resource: i, cost: u },
      options: { runtime: c, consumeUsage: !0 }
    });
    u = Math.max(0, Number(d.packet.cost ?? u) || 0), c.pendingMutations = (c.pendingMutations ?? []).concat(d.mutations);
    const p = `${i}Remaining`, m = Number(((T = l.state) == null ? void 0 : T[p]) ?? 0);
    if (i !== "sa" && m < u)
      return { ok: !1, reason: `No ${String(i).toUpperCase()} remaining.` };
    const f = c.state, y = i === "sa" ? Pa(e) : 0, h = Math.max(0, Number(((k = l.state) == null ? void 0 : k.saSpentThisActivation) ?? 0) || 0);
    if (i === "sa" && h + u > y)
      return { ok: !1, reason: "Activation SA cap reached." };
    f[p] = Math.max(0, m - u), i === "sa" && (f.saSpentThisActivation = h + u, r === "attack" && (f.attacksThisActivation = Number(f.attacksThisActivation ?? 0) + 1)), this._appendActionLog(f, {
      id: r,
      label: n,
      costLabel: o || this._formatCostLabel(i, u)
    });
    let g = 0;
    if (i === "sa") {
      const j = Math.max(0, h - Ft), V = Math.max(0, f.saSpentThisActivation - Ft), K = Math.max(0, Number(((P = l.state) == null ? void 0 : P.attacksThisActivation) ?? 0) || 0), D = Math.max(0, Number(f.attacksThisActivation ?? 0) || 0);
      for (let N = j + 1; N <= V; N += 1) {
        const Y = Xe({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: ka({
            actor: e,
            packet: {
              actionId: r,
              resource: i,
              amount: 1,
              source: "extraSA",
              extraSaIndex: N
            },
            runtime: c
          }),
          packet: {
            actionId: r,
            resource: i,
            amount: 1,
            source: "extraSA",
            extraSaIndex: N
          },
          options: { runtime: c, consumeUsage: !0 }
        });
        c.pendingMutations = (c.pendingMutations ?? []).concat(Y.mutations), g += Math.max(0, Number(Y.packet.amount ?? 0) || 0);
      }
      for (let N = K + 1; N <= D; N += 1) {
        if (N <= 1) continue;
        const Y = Xe({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: ka({
            actor: e,
            packet: {
              actionId: r,
              resource: i,
              amount: 1,
              source: "attack"
            },
            runtime: c
          }),
          packet: {
            actionId: r,
            resource: i,
            amount: 1,
            source: "attack",
            attackIndex: N
          },
          options: { runtime: c, consumeUsage: !0 }
        });
        c.pendingMutations = (c.pendingMutations ?? []).concat(Y.mutations), g += Math.max(0, Number(Y.packet.amount ?? 0) || 0);
      }
      f.burnThisActivation = Math.max(0, Number(f.burnThisActivation ?? 0) + g);
    }
    return (I = c.pendingMutations) != null && I.length ? await Kt({
      actor: e,
      mutations: c.pendingMutations,
      runtime: {
        ...c,
        state: f
      }
    }) : await l.combatant.setFlag(hi, gi, f), g > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((x = (O = e.system) == null ? void 0 : O.burn) == null ? void 0 : x.value) ?? 0) + g) }), { ok: !0, snapshot: this.getSnapshot(e, { token: l.token }) };
  }
  static async reduceBurn(e, { token: t = null } = {}) {
    var o, l, c, u;
    const i = this.getSnapshot(e, { token: t });
    if (!i.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!i.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (Fr(e, i) <= 0) return { ok: !1, reason: "Activation SA cap reached." };
    if (i.burn.value <= 0) return { ok: !1, reason: "Burn is already at 0." };
    const s = await this.spendResource(e, {
      token: i.token,
      resource: "sa",
      cost: 1,
      actionId: "reduceBurn",
      actionLabel: "Reduce Burn",
      actionCostLabel: "1 SA"
    });
    if (!s.ok) return s;
    const r = Math.max(0, Number(((l = (o = e.system) == null ? void 0 : o.burn) == null ? void 0 : l.value) ?? 0) - 1), n = { "system.burn.value": r };
    return r === 0 && ((u = (c = e.system) == null ? void 0 : c.burn) != null && u.overloaded) && (n["system.burn.overloaded"] = !1), await e.update(n), { ok: !0, snapshot: this.getSnapshot(e, { token: i.token }) };
  }
  static async finalizeActivation(e, t) {
    var p, m, f, y, h, g, S, T;
    if (!game.user.isGM || !t || !e) return;
    const i = ((m = (p = e.combatants) == null ? void 0 : p.get) == null ? void 0 : m.call(p, t)) ?? null, s = (i == null ? void 0 : i.actor) ?? null;
    if (!i || !s) return;
    const r = i.getFlag(hi, gi), n = ea(r, this.getActivationIdentity(e, i)) ? as(r, this.getActivationIdentity(e, i)) : as(r), l = {
      burnDelta: Number(n.saSpentThisActivation ?? 0) <= Ft && Number(n.burnThisActivation ?? 0) <= 0 && Number(n.reactionBurnSinceLastActivation ?? 0) <= 0 ? -2 : 0,
      edgeAdjustments: []
    }, c = {
      combat: e,
      combatant: i,
      state: n,
      sceneId: ((f = e.scene) == null ? void 0 : f.id) ?? ((y = canvas == null ? void 0 : canvas.scene) == null ? void 0 : y.id) ?? ""
    }, u = Xe({
      actor: s,
      phase: "onEndOfActivation",
      facts: io({ actor: s, packet: l, runtime: c }),
      packet: l,
      options: { runtime: c, consumeUsage: !0 }
    });
    await Kt({ actor: s, mutations: u.mutations, runtime: c });
    const d = Number(u.packet.burnDelta ?? l.burnDelta) || 0;
    if (d) {
      const k = Math.max(0, Number(((g = (h = s.system) == null ? void 0 : h.burn) == null ? void 0 : g.value) ?? 0) + d), P = { "system.burn.value": k };
      k === 0 && ((T = (S = s.system) == null ? void 0 : S.burn) != null && T.overloaded) && (P["system.burn.overloaded"] = !1), await s.update(P);
    }
    for (const k of u.packet.edgeAdjustments ?? []) {
      const P = Number((k == null ? void 0 : k.amount) ?? 0) || 0;
      !P || !(k != null && k.poolKey) || (P > 0 ? await s.gainEdge(k.poolKey, P, { skipTraitHooks: !0, source: "endOfActivationTrait" }) : await s.spendEdge(k.poolKey, Math.abs(P), { skipTraitHooks: !0, source: "endOfActivationTrait" }));
    }
  }
  static async _onUpdateCombat(e, t) {
    var s, r;
    if (Object.prototype.hasOwnProperty.call(t ?? {}, "turn") || Object.prototype.hasOwnProperty.call(t ?? {}, "round")) {
      const n = this._lastActivationByCombat.get(e == null ? void 0 : e.id) ?? null;
      n && n !== ((s = e == null ? void 0 : e.combatant) == null ? void 0 : s.id) && await this.finalizeActivation(e, n), await this.ensureCurrentCombatantState(), e != null && e.id && this._lastActivationByCombat.set(e.id, ((r = e.combatant) == null ? void 0 : r.id) ?? null);
    }
    this.renderOpenCharacterSheets();
  }
  static async _onCreateCombatant(e) {
    var i;
    const t = e == null ? void 0 : e.combat;
    ((i = t == null ? void 0 : t.combatant) == null ? void 0 : i.id) === (e == null ? void 0 : e.id) && await this.ensureCurrentCombatantState(), this.renderOpenCharacterSheets();
  }
  static _onDeleteCombatant(e) {
    this.renderOpenCharacterSheets();
  }
  static _onDeleteCombat(e) {
    e != null && e.id && this._lastActivationByCombat.delete(e.id), this.renderOpenCharacterSheets();
  }
  static _onUpdateCombatant(e, t) {
    var i;
    foundry.utils.hasProperty(t, `flags.${hi}.${gi}`) && this.renderOpenCharacterSheets((i = e == null ? void 0 : e.actor) == null ? void 0 : i.id);
  }
  static _onTargetToken(e, t, i) {
    var s;
    (e == null ? void 0 : e.id) === ((s = game.user) == null ? void 0 : s.id) && this.queueCharacterSheetRefresh();
  }
  static _onUpdateToken(e, t) {
    var r, n;
    if (!["x", "y", "elevation"].some(
      (o) => Object.prototype.hasOwnProperty.call(t ?? {}, o)
    ) || ((r = e == null ? void 0 : e.parent) == null ? void 0 : r.id) !== ((n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.id)) return;
    const s = String((e == null ? void 0 : e.id) ?? "").trim();
    if (s) {
      const o = Object.prototype.hasOwnProperty.call(t ?? {}, "x") ? Number(t.x) : Number(e == null ? void 0 : e.x), l = Object.prototype.hasOwnProperty.call(t ?? {}, "y") ? Number(t.y) : Number(e == null ? void 0 : e.y);
      Number.isFinite(o) && Number.isFinite(l) && this._pendingTokenPositions.set(s, { x: o, y: l });
    }
    this.queueCharacterSheetRefresh();
  }
  static queueCharacterSheetRefresh(e = null) {
    this._targetRefreshTimeout && clearTimeout(this._targetRefreshTimeout), this._targetRefreshTimeout = setTimeout(() => {
      this._targetRefreshTimeout = null, this.renderOpenCharacterSheets(e);
    }, 0);
  }
  static _collectOpenCharacterSheetApps() {
    var i, s;
    const e = /* @__PURE__ */ new Set(), t = (r) => {
      var n;
      for (const o of Object.values((r == null ? void 0 : r.apps) ?? {}))
        ((n = o == null ? void 0 : o.actor) == null ? void 0 : n.type) === "character" && e.add(o);
    };
    for (const r of Array.from(game.actors ?? []))
      t(r);
    for (const r of Array.from(((i = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : i.placeables) ?? []))
      t(r == null ? void 0 : r.actor);
    for (const r of Object.values(ui.windows ?? {}))
      ((s = r == null ? void 0 : r.actor) == null ? void 0 : s.type) === "character" && e.add(r);
    return Array.from(e);
  }
  static renderOpenCharacterSheets(e = null) {
    var i;
    const t = this._collectOpenCharacterSheetApps();
    for (const s of t)
      if (!(e && ((i = s.actor) == null ? void 0 : i.id) !== e)) {
        if (typeof s.requestCombatDashboardRefresh == "function") {
          s.requestCombatDashboardRefresh();
          continue;
        }
        s.render({ force: !0 });
      }
  }
}
R(ne, "_targetRefreshTimeout", null), R(ne, "_pendingTokenPositions", /* @__PURE__ */ new Map()), R(ne, "_lastActivationByCombat", /* @__PURE__ */ new Map());
function Pa(a) {
  var i, s, r, n, o, l;
  const e = Math.max(0, Number(((r = (s = (i = a == null ? void 0 : a.system) == null ? void 0 : i.attributes) == null ? void 0 : s.reflexes) == null ? void 0 : r.value) ?? 0) || 0), t = Math.max(0, Number(((l = (o = (n = a == null ? void 0 : a.system) == null ? void 0 : n.attributes) == null ? void 0 : o.willpower) == null ? void 0 : l.value) ?? 0) || 0);
  return Ft + Math.floor((e + t) / 2);
}
function Fr(a, e) {
  var t;
  return Math.max(0, Pa(a) - Math.max(0, Number(((t = e == null ? void 0 : e.state) == null ? void 0 : t.saSpentThisActivation) ?? 0) || 0));
}
function Ui(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function ia(a, e) {
  var i, s, r;
  if (!a) return null;
  const t = Ui(e) ?? Ui(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((r = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : r.call(i, ((s = t == null ? void 0 : t.baseActor) == null ? void 0 : s.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function zr(a) {
  const e = Number(a ?? 0);
  return Number.isFinite(e) ? Math.trunc(e) : 0;
}
function rs(a, e) {
  var t, i, s;
  return Math.max(0, Number(((s = (i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.monitors) == null ? void 0 : i[e]) == null ? void 0 : s.value) ?? 0) || 0);
}
function Wr(a) {
  var e, t;
  return Math.max(0, Number(((t = (e = a == null ? void 0 : a.system) == null ? void 0 : e.burn) == null ? void 0 : t.value) ?? 0) || 0);
}
function Li(a) {
  return a === b.monitors.physical ? "Physical" : a === b.monitors.fatigue ? "Fatigue" : String(a ?? "").trim() || "Track";
}
function pu(a, e) {
  var t;
  return ((t = or(e).find((i) => i.id === a)) == null ? void 0 : t.label) ?? a;
}
function fu(a) {
  const e = foundry.utils.escapeHTML, t = [];
  if (a.mode === "attackDamage" || a.mode === "trackDelta") {
    const i = a.appliedDelta >= 0 ? "Applied" : "Recovered", s = Math.abs(Number(a.appliedDelta ?? 0)), r = s === 1 ? "point" : "points", n = a.usedArmor ? ` via armor-aware ${e(St(a.damageType))}` : "";
    t.push(`<div><b>${i}:</b> ${s} ${r} to ${e(Li(a.track))}${n}</div>`), a.usedArmor && a.mitigation && (t.push(
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
function hu(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
class Ye {
  static supportsActor(e) {
    return (e == null ? void 0 : e.type) === b.actorTypes.character || (e == null ? void 0 : e.type) === b.actorTypes.npc;
  }
  static getActorOptions() {
    return Array.from(game.actors ?? []).filter((e) => this.supportsActor(e)).sort((e, t) => String(e.name ?? "").localeCompare(String(t.name ?? ""))).map((e) => ({
      id: e.id,
      name: e.name || "Character"
    }));
  }
  static getStatusOptions(e = null) {
    return or(e).map((t) => ({
      value: t.id,
      label: t.label,
      active: t.active
    }));
  }
  static getSceneTarget() {
    var i, s;
    const e = Array.from(((i = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : i.controlled) ?? []);
    if (e.length > 1)
      return { actor: null, token: null, reason: "Select only one controlled token." };
    if (e.length === 1) {
      const r = Ui(e[0]), n = ia((r == null ? void 0 : r.actor) ?? null, r);
      return this._resolveSceneTargetResult(n, r);
    }
    const t = Array.from(((s = game.user) == null ? void 0 : s.targets) ?? []);
    if (t.length > 1)
      return { actor: null, token: null, reason: "Target only one token." };
    if (t.length === 1) {
      const r = Ui(t[0]), n = ia((r == null ? void 0 : r.actor) ?? null, r);
      return this._resolveSceneTargetResult(n, r);
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
  static resolveTarget({ actor: e = null, token: t = null, actorId: i = "", preferSceneTarget: s = !1 } = {}) {
    var o, l;
    const r = Ui(t);
    if (r) {
      const c = ia((r == null ? void 0 : r.actor) ?? e, r), u = this._resolveSceneTargetResult(c, r);
      if (u.actor) return { ...u, source: "token" };
    }
    if (s) {
      const c = this.getSceneTarget();
      if (c.actor) return { ...c, source: "scene" };
    }
    if (e && this.supportsActor(e))
      return { actor: e, token: r, reason: "", source: "actor" };
    const n = i ? ((l = (o = game.actors) == null ? void 0 : o.get) == null ? void 0 : l.call(o, i)) ?? null : null;
    return n && this.supportsActor(n) ? { actor: n, token: null, reason: "", source: "fallback" } : {
      actor: null,
      token: r,
      source: null,
      reason: s && this.getSceneTarget().reason || "Choose a supported character target."
    };
  }
  static async apply({ actor: e = null, token: t = null, payload: i = {}, options: s = {} } = {}) {
    var l;
    const r = this.resolveTarget({
      actor: e,
      token: t,
      actorId: s.actorId ?? "",
      preferSceneTarget: !!s.preferSceneTarget
    });
    if (!r.actor)
      return { ok: !1, reason: r.reason || "Choose a supported character target." };
    let n;
    switch (String((i == null ? void 0 : i.mode) ?? "").trim()) {
      case "attackDamage":
        n = await this._applyAttackDamage(r.actor, i);
        break;
      case "trackDelta":
        n = await this._applyTrackDelta(r.actor, i);
        break;
      case "burnDelta":
        n = await this._applyBurnDelta(r.actor, i);
        break;
      case "status":
        n = await this._applyStatus(r.actor, i);
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
      ...n
    };
    if (s.logToChat) {
      const c = fu(o), u = hu({
        speaker: ChatMessage.getSpeaker({ actor: r.actor, token: r.token }),
        content: c
      });
      await ChatMessage.create(u);
    }
    return (l = ne.renderOpenCharacterSheets) == null || l.call(ne, r.actor.id), o;
  }
  static async _applyTrackDelta(e, t) {
    const i = (t == null ? void 0 : t.track) === b.monitors.fatigue ? b.monitors.fatigue : b.monitors.physical, s = zr((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0);
    if (!!(t != null && t.useArmor) && s > 0)
      return this._applyPersonalArmorAwareDamage(e, {
        mode: "trackDelta",
        track: i,
        damage: s,
        damageType: t == null ? void 0 : t.damageType,
        ap: (t == null ? void 0 : t.ap) ?? 0,
        effects: (t == null ? void 0 : t.effects) ?? {},
        source: t == null ? void 0 : t.source,
        notes: t == null ? void 0 : t.notes
      });
    const n = rs(e, i);
    await L.addCounter(e, i, s);
    const o = rs(e, i);
    return {
      mode: "trackDelta",
      track: i,
      requestedDelta: s,
      appliedDelta: o - n,
      usedArmor: !1,
      beforeLabel: `${Li(i)} ${n}`,
      afterLabel: `${Li(i)} ${o}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyBurnDelta(e, t) {
    var l, c;
    const i = zr((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0), s = Wr(e), r = Math.max(0, s + i), n = { "system.burn.value": r };
    r === 0 && ((c = (l = e.system) == null ? void 0 : l.burn) != null && c.overloaded) && (n["system.burn.overloaded"] = !1), await e.update(n);
    const o = Wr(e);
    return {
      mode: "burnDelta",
      requestedDelta: i,
      appliedDelta: o - s,
      beforeLabel: `Burn ${s}`,
      afterLabel: `Burn ${o}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyStatus(e, t) {
    const i = String((t == null ? void 0 : t.statusId) ?? (t == null ? void 0 : t.status) ?? "").trim();
    if (!i)
      return { mode: "status", statusId: "", active: !1, statusLabel: "Status", beforeLabel: "", afterLabel: "" };
    const s = Cs(e, i), r = !!(t != null && t.active);
    await oo({ actor: e, statusId: i, active: r });
    const n = Cs(e, i);
    return {
      mode: "status",
      statusId: i,
      statusLabel: pu(i, e),
      active: n,
      beforeLabel: s ? "Active" : "Inactive",
      afterLabel: n ? "Active" : "Inactive",
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyAttackDamage(e, t) {
    return this._applyPersonalArmorAwareDamage(e, {
      mode: "attackDamage",
      track: (t == null ? void 0 : t.track) ?? b.monitors.physical,
      damage: (t == null ? void 0 : t.damage) ?? 0,
      netHits: (t == null ? void 0 : t.netHits) ?? 0,
      damageType: t == null ? void 0 : t.damageType,
      ap: (t == null ? void 0 : t.ap) ?? 0,
      effects: (t == null ? void 0 : t.effects) ?? {},
      source: t == null ? void 0 : t.source,
      notes: t == null ? void 0 : t.notes
    });
  }
  static async _applyPersonalArmorAwareDamage(e, t) {
    var V, K, D, N, Y, z, ge, _e, Le;
    const i = (t == null ? void 0 : t.track) === b.monitors.fatigue ? b.monitors.fatigue : b.monitors.physical, s = Math.max(0, Number((t == null ? void 0 : t.damage) ?? 0) || 0), r = Math.max(0, Number((t == null ? void 0 : t.netHits) ?? 0) || 0), n = (t == null ? void 0 : t.effects) ?? {}, o = ((V = e.getPersonalCombatLoadout) == null ? void 0 : V.call(e, { refresh: !0 })) ?? null, l = (o == null ? void 0 : o.activeArmor) ?? null, c = Math.max(0, Number((l == null ? void 0 : l.currentArmorRating) ?? ((K = l == null ? void 0 : l.durability) == null ? void 0 : K.current) ?? 0) || 0), u = lt(t == null ? void 0 : t.damageType, "concussive"), d = rs(e, i);
    let p = s + r;
    const m = c > 0 ? hl({
      damageIncoming: p,
      armorTags: (l == null ? void 0 : l.tags) ?? [],
      effects: n
    }) : { damageIncoming: p, applied: [] };
    p = m.damageIncoming;
    const f = fl({
      currentArmorRating: c,
      mitigationByType: (l == null ? void 0 : l.mitigationByType) ?? {},
      damageType: u
    }), y = Math.max(
      0,
      (Number((t == null ? void 0 : t.ap) ?? 0) || 0) + (Number((n == null ? void 0 : n.ap) ?? 0) || 0)
    ), h = f.isDestroyed ? 0 : Math.max(0, f.baseMitigation + f.typeMitigationMod - y);
    let g = Math.max(0, Math.ceil(p - h));
    const S = {
      snapshot: ((D = ne.getSnapshot) == null ? void 0 : D.call(ne, e)) ?? null
    }, T = Xe({
      actor: e,
      phase: "onDamageResolved",
      facts: to({
        actor: e,
        packet: {
          amount: g,
          track: i,
          damageType: u
        },
        runtime: S
      }),
      packet: {
        amount: g,
        track: i,
        damageType: u
      },
      options: { runtime: S, consumeUsage: !0 }
    });
    await Kt({ actor: e, mutations: T.mutations, runtime: S }), g = Math.max(0, Number(T.packet.amount ?? g) || 0), g > 0 && await L.addCounter(e, i, g);
    const k = Math.max(0, Number(((N = l == null ? void 0 : l.durability) == null ? void 0 : N.current) ?? 0) || 0);
    let P = k;
    const I = Math.max(0, Number(((z = (Y = l == null ? void 0 : l.traitState) == null ? void 0 : Y.reinforced) == null ? void 0 : z.current) ?? 0) || 0), O = Math.max(0, Number(((_e = (ge = l == null ? void 0 : l.traitState) == null ? void 0 : ge.reinforced) == null ? void 0 : _e.max) ?? 0) || 0);
    let x = I;
    if (s + r > 0 && ((Le = l == null ? void 0 : l.item) != null && Le.id)) {
      const Ue = {};
      I > 0 ? (x = Math.max(0, I - 1), x !== I && (Ue["system.traitState.reinforced.current"] = x)) : (P = Math.max(0, k - 1), P !== k && (Ue["system.durability.current"] = P)), Object.keys(Ue).length > 0 && await l.item.update(Ue);
    }
    const j = rs(e, i);
    return {
      mode: (t == null ? void 0 : t.mode) ?? "attackDamage",
      track: i,
      requestedDelta: s + r,
      appliedDelta: j - d,
      usedArmor: !0,
      damageType: u,
      effectiveAp: y,
      mitigation: {
        ...f,
        netResistance: h,
        armorBefore: k,
        armorAfter: P,
        reinforcedBefore: I,
        reinforcedAfter: x,
        reinforcedMax: O
      },
      damageIncoming: p,
      adjustedIncoming: p,
      finalDamage: g,
      tagEffectResult: m,
      beforeLabel: `${Li(i)} ${d}`,
      afterLabel: `${Li(i)} ${j}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
}
R(Ye, "MODE_OPTIONS", Object.freeze([
  { value: b.monitors.physical, label: "Physical" },
  { value: b.monitors.fatigue, label: "Fatigue" },
  { value: "burn", label: "Burn" },
  { value: "status", label: "Status" }
]));
const gu = Ts, Na = "damage-mode", yu = `${v}.${Na}`, ns = {}, sa = {};
class ee {
  static init() {
    ai.register(ke.PROVIDE_DAMAGE_MODE), Hooks.on("updateSetting", async (e, t, i, s) => ee.onUpdateSetting(e, t, i, s)), Hooks.on(ke.PROVIDE_DAMAGE_MODE, (e) => {
      e("resistanceArmorMonitor", w.settings.damageMode.values.resistanceArmorMonitor, ee.sufferDamageResistanceArmorMonitor), e("armorResistanceMonitor", w.settings.damageMode.values.armorResistanceMonitor, ee.sufferDamageArmorResistanceMonitor), e("armorGivesResistance", w.settings.damageMode.values.armorGivesResistance, ee.sufferDamageArmorAsResistance_Earthdawn), e("armorGiveResistanceHitsAvoid", w.settings.damageMode.values.armorGiveResistanceHitsAvoid, ee.sufferDamageArmorAsResistance_Cyberpunk);
    }), Hooks.once("ready", () => ee.onReady());
  }
  static onReady() {
    ee._registerDamageModeSetting(), ee._selectDamageMode();
  }
  static _registerDamageModeSetting() {
    Hooks.callAll(ke.PROVIDE_DAMAGE_MODE, (e, t, i) => {
      ns[e] = t, sa[e] = i;
    }), game.settings.register(v, Na, {
      scope: "world",
      name: w.settings.damageMode.name,
      hint: w.settings.damageMode.hint,
      config: !0,
      default: Object.keys(ns)[0],
      choices: ns,
      type: String
    });
  }
  static async onUpdateSetting(e, t, i, s) {
    e.key == yu && ee._selectDamageMode();
  }
  static _selectDamageMode() {
    let e = game.settings.get(v, Na);
    sa[e] || (e = Object.keys(ns)[0]), ee.damageModeCode = e, ee.damageModeMethod = sa[e];
  }
  static async sufferDamage(e, t, i, s, r, n, o) {
    const { monitor: l, damageType: c } = ee._resolveDamageContext(e, t, o);
    if (li.checkActorCanReceiveDamage(c ?? l, l, e), ee._shouldUsePersonalDamageV2(e, l, o)) {
      await ee.sufferPersonalDamageV2(e, l, c, i, s, r, n, o);
      return;
    }
    await (ee.damageModeMethod ?? ee.sufferDamageResistanceArmorMonitor)(e, l, c, i, s, r, n), await e.applyArmorDamage(l, c, Z.sumModifiers([o], "other", "damageArmor"));
  }
  static _shouldUsePersonalDamageV2(e, t, i) {
    var s, r;
    return !((s = e == null ? void 0 : e.isCharacterLike) != null && s.call(e)) || ![b.monitors.physical, b.monitors.fatigue].includes(t) ? !1 : !!((r = i == null ? void 0 : i.isPersonalWeapon) != null && r.call(i) || (i == null ? void 0 : i.canonicalType) === b.itemType.personalWeapon || (i == null ? void 0 : i.type) === b.itemType.personalWeapon);
  }
  static async sufferPersonalDamageV2(e, t, i, s, r, n, o, l) {
    var d;
    const c = ((d = l == null ? void 0 : l.getCombatProfile) == null ? void 0 : d.call(l)) ?? l ?? null, u = await Ye.apply({
      actor: e,
      payload: {
        mode: "attackDamage",
        track: t,
        damage: Number(s ?? (c == null ? void 0 : c.damage) ?? 0) || 0,
        netHits: Number(r ?? 0) || 0,
        damageType: i ?? (c == null ? void 0 : c.damageType),
        ap: Number((c == null ? void 0 : c.ap) ?? 0) || 0,
        effects: (c == null ? void 0 : c.effects) ?? {}
      },
      options: {
        logToChat: !1
      }
    });
    u != null && u.ok && ee._notifyPersonalArmorMitigation(e, {
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
    const i = t.armorMitigation ?? {}, s = ee._localizeDamageType(t.damageType), r = i.isDestroyed ? "Armor destroyed" : `Base ${Number(i.baseMitigation ?? 0)} + Type ${Number(i.typeMitigationMod ?? 0)} - AP ${Number(t.effectiveAp ?? 0)}`, n = Number(t.adjustedIncoming ?? t.baseIncoming ?? 0), o = Number(t.finalDamage ?? 0), l = (((u = t.tagEffectResult) == null ? void 0 : u.applied) ?? []).map((d) => `${d.tag} +${Math.round((Number(d.bonus ?? 0) || 0) * 100)}%`).join(", "), c = l ? ` [${l}]` : "";
    ui.notifications.info(
      `${e.name} mitigated ${s}: ${r}${c}. Incoming ${n}, final ${o}.`
    );
  }
  static async sufferDamageResistanceArmorMonitor(e, t, i, s, r, n, o) {
    const l = L.resistanceDetail(e, t, i), c = l.value;
    let u = 0;
    if (n) {
      const d = Math.min(c, s), p = Math.min(c - d, r);
      u = s - d, L.useArmor(t) && (u -= await ee.damageToArmor(e, i, u)), u += r - p;
    } else
      u = s + r - c, L.useArmor(t) && (u -= await ee.damageToArmor(e, i, u));
    u > 0 && await L.addCounter(e, t, u), ee._notifyResistanceUsage(e, t, i, l);
  }
  static async sufferDamageArmorResistanceMonitor(e, t, i, s, r, n, o) {
    let l = 0;
    L.useArmor(t) ? n ? (s -= await ee.damageToArmor(e, i, s), l = r + s) : (l = r + s, l -= await ee.damageToArmor(e, i, l)) : l = s + r;
    const c = L.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await L.addCounter(e, t, l), ee._notifyResistanceUsage(e, t, i, c), l;
  }
  static async sufferDamageArmorAsResistance_Cyberpunk(e, t, i, s, r, n, o) {
    let l = s + r;
    if (L.useArmor(t) && l > 0) {
      const u = n ? r : 0, d = Math.max(0, ee._computeArmorResistance(e) - u);
      d > 0 && (await L.addCounter(e, "armor", 1), l -= d);
    }
    const c = L.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await L.addCounter(e, t, l), ee._notifyResistanceUsage(e, t, i, c), Math.max(l, 0);
  }
  static async sufferDamageArmorAsResistance_Earthdawn(e, t, i, s, r, n, o) {
    let l = s + r;
    if (L.useArmor(t) && !n && l > 0) {
      const u = ee._computeArmorResistance(e);
      u > 0 && (await L.addCounter(e, "armor", 1), l -= u);
    }
    l -= ee._computeStrengthResistance(e, t);
    const c = L.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await L.addCounter(e, t, l), ee._notifyResistanceUsage(e, t, i, c), l;
  }
  static async damageToArmor(e, t, i) {
    if (i > 0) {
      const s = L.max(e, b.monitors.armor), r = L.getCounterValue(e, b.monitors.armor), n = Math.min(s - r, i), o = L.resistance(e, b.monitors.armor, t), l = Math.max(0, n - o);
      return l > 0 && await L.addCounter(e, b.monitors.armor, l), n;
    } else
      return 0;
  }
  static _resolveDamageContext(e, t, i) {
    var o;
    const s = (typeof t == "object" ? (t == null ? void 0 : t.damageType) ?? (t == null ? void 0 : t.type) : t) ?? ((o = i == null ? void 0 : i.system) == null ? void 0 : o.damageType), r = typeof t == "object" ? (t == null ? void 0 : t.monitor) ?? s : s;
    return { monitor: e.getDamageMonitor(r), damageType: s };
  }
  static _notifyResistanceUsage(e, t, i, s) {
    var u;
    if (!s || t === void 0)
      return;
    const r = w.actor.monitors[t] ?? t, n = ee._localizeDamageType(i) ?? r, o = s.usedType ? "type" : "default", l = ((u = w.actor.monitors.resistanceSources) == null ? void 0 : u[o]) ?? o, c = ce(w.actor.monitors.resistanceApplied, {
      actor: e.name,
      monitor: r,
      damageType: n,
      value: s.value,
      source: l
    });
    ui.notifications.info(c);
  }
  static _localizeDamageType(e) {
    if (e)
      return yn(e) ? St(e) : w.mwd.weaponDamageType[e] ?? w.mwd.personalDamageType[e] ?? w.actor.monitors[e] ?? e;
  }
  static _computeArmorResistance(e) {
    const t = L.max(e, "armor"), i = L.getCounterValue(e, "armor"), s = Math.max(0, t - i);
    return Math.max(0, Math.ceil(s / 3));
  }
  static _computeStrengthResistance(e, t) {
    const i = e.getAttributeValue(b.actorAttributes.strength);
    return Math.max(0, Math.floor(i / 4));
  }
}
class qe extends Actor {
  static init() {
    Hooks.on("updateActor", (e, t, i, s) => {
      var r;
      return (r = Qe.firstResponsible(e)) == null ? void 0 : r.onUpdateActor(t, i);
    });
  }
  constructor(e, t = {}) {
    var i;
    if (!((i = t.anarchy) != null && i.ready)) {
      const s = game.system.anarchy.actorClasses[e.type];
      if (foundry.utils.mergeObject(t, { anarchy: { ready: !0 } }), s)
        return e.img || (e.img = s.defaultIcon), new s(e, t);
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
    return t ? t.sort((i, s) => {
      const r = i.system.code === "knowledge" || i.system.attribute === "knowledge", n = s.system.code === "knowledge" || s.system.attribute === "knowledge";
      if (r && !n) return 1;
      if (!n && r) return -1;
      if (r && n)
        return i.name > s.name ? 1 : i.name > s.name ? -1 : 0;
      const o = e.getAttributeValue(i.system.attribute) + i.system.value, l = e.getAttributeValue(s.system.attribute) + s.system.value;
      return o > l ? -1 : o < l ? 1 : 0;
    }) : [];
  }
  static sortQualities(e) {
    if (!e)
      return [];
    const t = ["positive", "negative", "narrative"], i = ["major", "minor"];
    return e.sort((s, r) => {
      var p, m, f, y, h, g;
      const n = String(((p = s.system) == null ? void 0 : p.category) ?? (((m = s.system) == null ? void 0 : m.positive) === !1 ? "negative" : "positive")).trim() || "positive", o = String(((f = r.system) == null ? void 0 : f.category) ?? (((y = r.system) == null ? void 0 : y.positive) === !1 ? "negative" : "positive")).trim() || "positive", l = t.indexOf(n) - t.indexOf(o);
      if (l !== 0) return l;
      const c = String(((h = s.system) == null ? void 0 : h.tier) ?? "minor").trim() || "minor", u = String(((g = r.system) == null ? void 0 : g.tier) ?? "minor").trim() || "minor", d = i.indexOf(c) - i.indexOf(u);
      return d !== 0 ? d : String(s.name ?? "").localeCompare(String(r.name ?? ""));
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
    return [b.actorTypes.vehicle, b.actorTypes.battlemech].includes(this.type);
  }
  prepareData() {
    super.prepareData(), this._prepareEdgePools(), this.cleanupFavorites();
  }
  prepareDerivedData() {
    if (this.system.modifiers = {
      initiative: Z.sumModifiers(this.items, "other", "initiative")
    }, this.system.monitors) {
      const e = te.getDamageTypes();
      Object.entries(this.system.monitors).forEach((t) => {
        t[1].resistance = qe.normalizeResistance(t[1].resistance), t[1].maxBonus = Z.sumMonitorModifiers(this.items, t[0], "max"), t[1].resistanceBonus = Z.sumMonitorModifiers(this.items, t[0], "resistance"), t[1].resistanceBonusByType = Object.fromEntries(
          e.map((i) => [i.value, Z.sumMonitorModifiers(this.items, t[0], "resistanceByType", i.value)]).filter(([, i]) => i)
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
    return Mi[this.type] ?? [];
  }
  getPhysicalAgility() {
  }
  getCorrespondingAttribute(e) {
    if (this.getAttributes().includes(e))
      return e;
  }
  async onUpdateActor(e, t) {
    var i, s;
    ((i = e.system) == null ? void 0 : i.monitors) != null && ((s = e.system) == null ? void 0 : s.state) == null && this.update({ "system.state": this.computeState() });
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
    const e = this.getAttributeValue(b.actorAttributes.edge), t = foundry.utils.getProperty(this.system, "counters.edgePools") ?? {};
    Object.values(b.counters.edgePools).forEach((s) => {
      const r = t[s] ?? {}, n = r.value;
      r.value = n ?? e ?? 0, r.value = Math.min(r.value, e ?? r.value ?? 0), r.max = e ?? r.max ?? 0, t[s] = r;
    }), foundry.utils.setProperty(this.system, "counters.edgePools", t);
  }
  async setCheckbarValue(e, t) {
    return await this.update({ [e]: t });
  }
  _getMonitorMax(e) {
    const t = this.getAttributeValue(e);
    return t == 0 ? 0 : mn + J.divup(t, 2);
  }
  getAttributeActions() {
    return he.getActorActions(this);
  }
  getUsableAttributes(e = void 0) {
    const t = (e ? [e] : this.items).map((s) => s.getAttributes()).reduce((s, r) => s.concat(r), []), i = J.distinct(this.getAttributes().concat(t));
    return i.sort(J.ascendingBySortedArray(te.sortedAttributeKeys)), i;
  }
  getAttributeValue(e, t = void 0) {
    let i = 0;
    if (e = this.getCorrespondingAttribute(e), e) {
      if (this.getAttributes().includes(e))
        i = this.system.attributes[e].value;
      else if (t)
        i = (t == null ? void 0 : t.getAttributeValue(e)) ?? 0;
      else {
        const s = this.items.filter((r) => r.getAttributes().includes(e));
        if (s.length > 0) {
          const r = s.map((n) => n.getAttributeValue(e) ?? 0);
          i = Math.max(...r);
        }
      }
      i += Z.sumModifiers(this.items, "attribute", e);
    }
    return i;
  }
  resolveDamageType(e) {
    switch (e) {
      case "stun":
        return b.monitors.fatigue;
    }
    return e;
  }
  getDamageMonitor(e) {
    e = this.resolveDamageType(e);
  }
  async applyArmorDamage(e, t, i = 0) {
    switch (e = this.resolveDamageType(e), e) {
      case b.monitors.physical:
      case b.monitors.fatigue:
        await ee.damageToArmor(this, t, i);
    }
  }
  async rollAttribute(e) {
    await nt.rollAttribute(this, e);
  }
  async rollAttributeAction(e) {
    const t = he.getActorAction(this, e);
    await nt.rollAttributeAction(this, t);
  }
  async rollSkill(e, t) {
    await nt.rollSkill(this, e, t);
  }
  async rollWeapon(e) {
    var r, n, o;
    li.checkWeaponDefense(e, this);
    const t = (r = e.validateTargets(this)) == null ? void 0 : r.map((l) => l.id), i = {
      attackerTokenId: (o = (n = game.scenes.current) == null ? void 0 : n.tokens.find((l) => {
        var c;
        return ((c = l.actor) == null ? void 0 : c.id) == this.id;
      })) == null ? void 0 : o.id,
      targetedTokenIds: t
    }, s = this.items.find((l) => e.isWeaponSkill(l));
    await nt.rollWeapon(this, s, e, i);
  }
  async rollDefense(e) {
    const t = e.attack.defense, i = he.getActorDefense(this, t);
    await nt.rollDefense(this, i, e);
  }
  async switchMonitorCheck(e, t, i, s = void 0) {
    await L.switchMonitorCheck(this, e, t, i, s);
  }
  async addCounter(e, t, i = void 0) {
    await L.addCounter(this, e, t, i);
  }
  async setCounter(e, t, i = void 0) {
    await L.setCounter(this, e, t, i);
  }
  canSetMarks() {
    return !1;
  }
  getCyberdeck() {
  }
  canApplyDamage(e) {
    switch (e) {
      case b.monitors.physical:
      case b.monitors.fatigue:
        return this.getDamageMonitor(e) != null;
    }
    return !1;
  }
  canReceiveDamage(e) {
    return this.canApplyDamage(e);
  }
  async onEnterCombat() {
    const e = Z.sumModifiers(this.items, "other", "sceneAnarchy");
    e > 0 && await L.setCounter(this, b.monitors.sceneAnarchy, e);
  }
  async onLeaveCombat() {
    await L.setCounter(this, b.monitors.sceneAnarchy, 0);
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
    var s, r;
    const e = this.hasGMAnarchy(), t = (r = (s = game.system) == null ? void 0 : s.anarchy) == null ? void 0 : r.gmAnarchy, i = e && t && typeof t.getAnarchy == "function" ? t.getAnarchy() : {
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
    await this.spendEdgePool(b.counters.social.credibility, e);
  }
  async spendRumor(e) {
    await this.spendEdgePool(b.counters.mental.rumor, e);
  }
  async spendAnarchy(e) {
    var t, i;
    if (e && !this.hasPlayerOwner) {
      const s = (i = (t = game.system) == null ? void 0 : t.anarchy) == null ? void 0 : i.gmAnarchy;
      s != null && s.npcConsumesAnarchy && await s.npcConsumesAnarchy(this, e);
      return;
    }
  }
  getEdgePools() {
    var e;
    return ((e = this.system.counters) == null ? void 0 : e.edgePools) ?? {};
  }
  getEdgePoolValue(e) {
    var r, n;
    const t = this.getAttributeValue(b.actorAttributes.edge), s = ((n = (r = this.getEdgePools()) == null ? void 0 : r[e]) == null ? void 0 : n.value) ?? t ?? 0;
    return Math.min(s, t ?? s ?? 0);
  }
  getRemainingEdge(e = void 0) {
    return e ? this.getEdgePoolValue(e) : Math.max(0, ...Object.values(b.counters.edgePools).map((t) => this.getEdgePoolValue(t)));
  }
  canUseEdge() {
    return this.getAttributes().includes(b.actorAttributes.edge);
  }
  async spendEdgePool(e, t) {
    t != 0 && await L.addCounter(this, e, -t);
  }
  async spendEdge(e, t = b.counters.edgePools.grit) {
    if (e != 0) {
      if (!this.canUseEdge()) {
        const i = w.actorType[this.type] ?? this.type, s = `${this.name} (${i}) cannot use Edge`;
        throw ui.notifications.warn(s), s;
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
    const s = this.getAttributeValue(i.system.attribute);
    return this.getSkillRating(i) + s + (t ? 2 : 0);
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
      const s = this.clone();
      i = (await Actor.createDocuments([s]))[0];
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
    const i = qe._prepareFavorite(e, t);
    return !!this.system.favorites.find((s) => qe._isSameFavorite(i, s));
  }
  static _prepareFavorite(e, t) {
    return { type: e, id: t };
  }
  static _isSameFavorite(e, t) {
    return e.id == t.id && e.type == t.type;
  }
  async switchFavorite(e, t, i) {
    const s = qe._prepareFavorite(t, i), r = this.system.favorites.filter((n) => !qe._isSameFavorite(s, n));
    e && r.push(s), this.update({ "system.favorites": r });
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
    var s;
    const i = qe._prepareFavorite(e, t);
    if (e == "attributeAction") {
      const r = he.prepareShortcut(this, t);
      if (r)
        return foundry.utils.mergeObject(r, i);
    } else if (Object.values(b.itemType).includes(e)) {
      const r = (s = this.items.get(t)) == null ? void 0 : s.prepareShortcut();
      if (r)
        return foundry.utils.mergeObject(r, i);
    }
    return i;
  }
  async _onSetManualStepper(e, t) {
    var n, o;
    e == null || e.preventDefault();
    const i = (n = t == null ? void 0 : t.dataset) == null ? void 0 : n.id, s = Number((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.value);
    if (!i || Number.isNaN(s)) return;
    const r = this._mwd.state.manual.find((l) => l.id === i);
    if (r)
      return r.value = s, this.render(!1);
  }
}
const { ApplicationV2: bu, HandlebarsApplicationMixin: Su } = foundry.applications.api, { renderTemplate: Ur } = foundry.applications.handlebars, Au = `${q}/chat/celebrity-roll.hbs`, wi = class wi extends Su(bu) {
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
        Z.computeModifiers(e.items, "other", "celebrity")
      ),
      other: {
        label: w.common.roll.modifiers.other,
        value: 0
      },
      ANARCHY: w
    }, i = await Ur(`${q}/dialog/roll-celebrite-title.hbs`, t), s = {
      id: `roll-celebrity-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...wi.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new wi({ roll: t }, s).render({ force: !0 });
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
    i.find(".input-celebrity-other").on("input", (s) => {
      this.roll.other.value = Number.parseInt(s.currentTarget.value) ?? 0;
    }), i.find('[data-action="roll"]').on("click", async () => {
      await wi.doRoll(this.roll), await this.close();
    }), i.find('[data-action="cancel"]').on("click", async () => {
      await this.close();
    });
  }
  static async doRoll(e) {
    const t = [
      e.celebrity,
      e.modifiers,
      e.other
    ], i = J.sumValues(t, (o) => o.value), s = {
      actor: e.actor,
      parameters: t,
      pool: i,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      },
      ANARCHY: w
    }, r = new Roll(`${i}d6cs>=5`);
    await r.evaluate();
    const n = await Ur(Au, s);
    await r.toMessage({ flavor: n });
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
R(wi, "PARTS", {
  body: {
    template: `${q}/dialog/roll-celebrite.hbs`
  }
});
let Ra = wi;
const { renderTemplate: wu } = foundry.applications.handlebars, Tu = `${q}/chat/actor-say-word.hbs`;
class Hr extends qe {
  static get initiative() {
    return qe.initiative + " + max(@attributes.reflexes.value, @attributes.intelligence.value)";
  }
  hasOwnAnarchy() {
    return this.hasPlayerOwner;
  }
  prepareDerivedData() {
    !this.system.monitors.fatigue && this.system.monitors.stun && (this.system.monitors.fatigue = foundry.utils.duplicate(this.system.monitors.stun)), this.system.monitors.physical.max = this._getMonitorMax(b.actorAttributes.strength), this.system.monitors.fatigue.max = this._getMonitorMax(b.actorAttributes.willpower), super.prepareDerivedData(), this.system.ignoreWounds = Z.sumModifiers(this.items, "other", "ignoreWounds");
  }
  computePhysicalState() {
    var l, c;
    const e = Math.max(0, Number(((l = this.system.monitors.armor) == null ? void 0 : l.max) ?? 0)), t = Math.min(
      e,
      Math.max(0, Number(((c = this.system.monitors.armor) == null ? void 0 : c.value) ?? 0))
    ), i = Math.max(0, e - t), s = Math.max(this.system.monitors.physical.max, this.system.monitors.fatigue.max) + e, r = this.system.monitors.physical.value == this.system.monitors.physical.max, n = this.system.monitors.fatigue.max == this.system.monitors.fatigue.value, o = r || n ? s : Math.max(this.system.monitors.physical.value, this.system.monitors.fatigue.value) + i;
    return {
      max: s,
      value: s - o
    };
  }
  getAttributes() {
    return Mi[this.type] ?? Mi[b.actorTypes.character];
  }
  getPhysicalAgility() {
    return b.actorAttributes.reflexes;
  }
  getCorrespondingAttribute(e) {
    return b.itemAttributes.firewall == e ? b.itemAttributes.firewall : super.getCorrespondingAttribute(e);
  }
  getDamageMonitor(e) {
    switch (e = this.resolveDamageType(e), e) {
      case b.monitors.fatigue:
      case b.monitors.physical:
        return e;
    }
    return super.getDamageMonitor(e);
  }
  async createWord(e, t) {
    this._mutateWords(e, (i) => i.concat([{ word: t, audio: "" }]));
  }
  async sayWord(e, t) {
    var s, r;
    const i = (s = this.getWord(e, t)) == null ? void 0 : s.word;
    i && ChatMessage.create({
      speaker: { alias: ((r = this.token) == null ? void 0 : r.name) ?? this.name },
      content: await wu(
        Tu,
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
    this._applyWordUpdate(e, t, (s) => foundry.utils.mergeObject(s, { word: i }, { overwrite: !0 }));
  }
  async _applyWordUpdate(e, t, i) {
    this._mutateWords(e, (s) => s.map((r) => (r.id == t && i(r), r)));
  }
  async deleteWord(e, t) {
    this._mutateWords(e, (i) => i.filter((s) => s.id != t));
  }
  async _mutateWords(e, t = (i) => i) {
    if (!e)
      return;
    let i = t(this.system[e]);
    J.reindexIds(i), await this.update({ [`system.${e}`]: i });
  }
  getCelebrityValue() {
    return this.getEdgePoolValue(b.counters.social.legend);
  }
  getCredibilityValue() {
    return this.getEdgePoolValue(b.counters.social.credibility);
  }
  getRumorValue() {
    return this.getEdgePoolValue(b.counters.mental.rumor);
  }
  getAnarchy() {
    return this.hasOwnAnarchy() ? {
      value: this.system.counters.anarchy.value,
      max: this.system.counters.anarchy.max,
      scene: this.getAnarchyScene()
    } : super.getAnarchy();
  }
  getAnarchyScene() {
    return this.getEdgePoolValue(b.counters.edgePools.chaos);
  }
  async spendAnarchy(e) {
    if (e > 0) {
      const t = this.getAnarchyScene(), i = this.getAnarchyValue();
      li.checkSufficient(w.actor.counters.anarchy, e, i + t);
      const s = Math.min(t, e), r = e - s;
      s > 0 && L.addCounter(this, b.monitors.sceneAnarchy, -s), this.hasPlayerOwner ? (await game.system.anarchy.gmAnarchy.actorGivesAnarchyToGM(this, e), L.addCounter(this, b.monitors.anarchy, -r)) : r > 0 && super.spendAnarchy(r);
    }
  }
  canUseEdge() {
    return !0;
  }
  getWounds() {
    const e = J.divint(this.system.monitors.fatigue.value, 3) + J.divint(this.system.monitors.physical.value, 3);
    return Math.max(0, e - this.system.ignoreWounds);
  }
  async rollCelebrity() {
    await Ra.create(this);
  }
}
class lo extends qe {
  prepareDerivedData() {
    this._prepareMwdAttributes(), this._prepareMwdMonitors(), this._prepareMwdItems(), super.prepareDerivedData();
  }
  static get defaultIcon() {
    return `${Is}/default/Default_Vehicle.svg`;
  }
  static get initiative() {
    return qe.initiative + " + max(@attributes.system.value, @attributes.handling.value)";
  }
  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    };
  }
  getAttributes() {
    return Mi[this.type] ?? Mi[b.actorTypes.vehicle];
  }
  getPhysicalAgility() {
    return b.actorAttributes.handling;
  }
  getDamageMonitor(e) {
    switch (e = this.resolveDamageType(e), e) {
      case b.monitors.physical:
        return b.monitors.structure;
      case b.monitors.fatigue:
        return;
    }
    return super.getDamageMonitor(e);
  }
  getRightToDefend() {
    return CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER;
  }
  async _migrateHandlingToAttribute(e) {
    var s;
    const t = ((s = this.system.attributes.handling) == null ? void 0 : s.value) ?? 0, i = this.system.handling;
    i && t < i && await this.update({
      "system.-=handling": null,
      "system.attributes.handling.value": i
    });
  }
  _prepareMwdAttributes() {
    const e = this.system.mwd = this.system.mwd ?? {}, t = {
      [b.actorAttributes.handling]: { value: 0 },
      [b.actorAttributes.system]: { value: 0 },
      [b.actorAttributes.condition]: { value: 0 },
      [b.actorAttributes.chassis]: { value: 0 }
    }, i = foundry.utils.mergeObject(
      foundry.utils.duplicate(t),
      this.system.attributes ?? {},
      { inplace: !1, recursive: !0 }
    );
    this.system.attributes = i, e.attributes = foundry.utils.mergeObject(
      foundry.utils.duplicate(t),
      e.attributes ?? {},
      { inplace: !1, recursive: !0 }
    ), Object.entries(e.attributes).forEach(([s, r]) => {
      var n;
      ((n = i[s]) == null ? void 0 : n.value) === void 0 && (i[s] = i[s] ?? {}, i[s].value = (r == null ? void 0 : r.value) ?? 0);
    });
  }
  _prepareMwdMonitors() {
    var s, r, n, o, l, c, u, d;
    const e = this.system.mwd = this.system.mwd ?? {}, t = this.system.monitors = this.system.monitors ?? {}, i = {
      value: ((s = t.structure) == null ? void 0 : s.value) ?? 0,
      max: ((r = t.structure) == null ? void 0 : r.max) ?? (this.type === b.actorTypes.battlemech ? 18 : 15),
      resistance: qe.normalizeResistance((n = t.structure) == null ? void 0 : n.resistance)
    };
    if (t.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(i),
      t.structure ?? {},
      { inplace: !1, recursive: !0 }
    ), e.monitors = e.monitors ?? {}, e.monitors.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(i),
      e.monitors.structure ?? {},
      { inplace: !1, recursive: !0 }
    ), this.type === b.actorTypes.battlemech) {
      const p = {
        value: ((o = t.heat) == null ? void 0 : o.value) ?? ((l = e.heat) == null ? void 0 : l.current) ?? 0,
        max: ((c = t.heat) == null ? void 0 : c.max) ?? ((u = e.heat) == null ? void 0 : u.hardMax) ?? 4,
        resistance: qe.normalizeResistance((d = t.heat) == null ? void 0 : d.resistance)
      };
      t.heat = foundry.utils.mergeObject(
        foundry.utils.duplicate(p),
        t.heat ?? {},
        { inplace: !1, recursive: !0 }
      ), e.monitors.heat = foundry.utils.mergeObject(
        foundry.utils.duplicate(p),
        e.monitors.heat ?? {},
        { inplace: !1, recursive: !0 }
      );
    }
  }
  _prepareMwdItems() {
    const e = this.system.mwd = this.system.mwd ?? {}, t = {
      skills: ["skill"],
      traits: ["trait", b.itemType.quality],
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
      Object.entries(t).map(([i, s]) => [
        i,
        this.items.filter((r) => s.includes(r.type))
      ])
    );
  }
}
const jr = {
  light: 4,
  medium: 5,
  heavy: 6,
  assault: 7
}, ku = { mode: "normal", allowedWeaponIds: [], typeRestriction: "" }, vu = {
  baseProfile: { name: "Unarmed", damage: "", notes: "" },
  maxWeapons: 0,
  allowedLocations: []
};
class Mu {
  constructor(e) {
    this.actor = e, this.mwd = e.system.mwd ?? {};
  }
  compute() {
    const e = this.mwd.weightClass ?? "medium", t = jr[e] ?? jr.medium, i = this._normalizeHardpoints(), s = this._normalizeWeaponGroups(), r = s.find((g) => g.isPrimary), n = s.filter((g) => g.isPrimary), o = this._primarySlot(), l = [], c = [];
    n.length > 1 && l.push(w.mwd.loadout.errors.multiplePrimary);
    const u = r ? t - 1 : t, d = s.length + (r ? 1 : 0);
    s.length > u && l.push(ce(w.mwd.loadout.errors.mountPointsExceeded, {
      used: d,
      total: t
    }));
    const p = this._getWeapons((g) => (g.system.weaponCategory ?? "ranged") !== "melee"), m = new Map(p.map((g) => [g.id, g])), f = /* @__PURE__ */ new Set(), y = i.map((g) => ({ ...g, occupiedBy: null, occupiedByName: void 0 }));
    for (const g of s)
      for (const S of g.weaponIds ?? []) {
        const T = m.get(S);
        if (!T) {
          c.push(ce(w.mwd.loadout.warnings.weaponMissing, { weapon: S }));
          continue;
        }
        const k = T.system.hardpointType ?? "energy", P = T.system.hardpointSize ?? "small";
        if (f.has(S)) {
          l.push(ce(w.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: T.name }));
          continue;
        }
        if (f.add(S), g.isPrimary && this._validatePrimaryWeapon(T, k, P, o, l), (T.system.weaponCategory ?? "ranged") === "melee")
          continue;
        const I = y.find((O) => !O.occupiedBy && O.type === k && O.size === P);
        I ? (I.occupiedBy = g.id, I.occupiedByName = g.name) : l.push(ce(w.mwd.loadout.errors.hardpointUnavailable, {
          weapon: T.name,
          type: w.mwd.hardpointType[k] ?? k,
          size: w.mwd.hardpointSize[P] ?? P
        }));
      }
    r && (!r.weaponIds || r.weaponIds.length === 0) && l.push(w.mwd.loadout.errors.primaryWithoutWeapon);
    const h = this._computeMeleeState(l);
    return {
      mountPoints: {
        total: t,
        used: d,
        remaining: Math.max(0, t - d)
      },
      weightClass: e,
      hardpoints: y,
      weaponGroups: s,
      primaryGroupId: r == null ? void 0 : r.id,
      errors: l,
      warnings: c,
      meleeProfiles: h.profiles,
      meleeLimit: h.limit
    };
  }
  _normalizeWeaponGroups() {
    return (this.mwd.weaponGroups ?? []).map((e, t) => ({
      id: e.id ?? `group-${t + 1}`,
      name: e.name || ce(w.common.newName, { type: w.itemType.singular.weapon }),
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
    const e = foundry.utils.mergeObject(foundry.utils.duplicate(ku), this.mwd.primarySlot ?? {});
    return e.allowedWeaponIds = this._asArray(e.allowedWeaponIds), e;
  }
  _computeMeleeState(e) {
    var o, l, c;
    const t = foundry.utils.mergeObject(foundry.utils.duplicate(vu), this.mwd.melee ?? {}), i = this._getWeapons((u) => (u.system.weaponCategory ?? "ranged") === "melee"), s = [], r = Number(t.maxWeapons ?? 0);
    i.length > r && e.push(ce(w.mwd.loadout.errors.meleeLimitExceeded, {
      equipped: i.length,
      limit: r
    }));
    const n = this._asArray(t.allowedLocations);
    return s.push({
      name: ((o = t.baseProfile) == null ? void 0 : o.name) || w.mwd.melee.baseProfile,
      damage: ((l = t.baseProfile) == null ? void 0 : l.damage) ?? "",
      notes: ((c = t.baseProfile) == null ? void 0 : c.notes) ?? ""
    }), i.forEach((u) => {
      var d;
      n.length > 0 && u.system.mountLocation && !n.includes(u.system.mountLocation) && e.push(ce(w.mwd.loadout.errors.meleeLocationRestricted, {
        weapon: u.name,
        location: w.mwd.meleeLocation[u.system.mountLocation] ?? u.system.mountLocation
      })), s.push({
        name: u.name,
        damage: u.getDamageCode(),
        notes: ((d = u.system.references) == null ? void 0 : d.description) ?? ""
      });
    }), { profiles: s, limit: r };
  }
  _validatePrimaryWeapon(e, t, i, s, r) {
    var n;
    s.mode === "converted" ? (((n = s.allowedWeaponIds) == null ? void 0 : n.length) > 0 && !s.allowedWeaponIds.includes(e.id) && r.push(ce(w.mwd.loadout.errors.primaryNotAllowedWeapon, { weapon: e.name })), s.typeRestriction && t !== s.typeRestriction && r.push(ce(w.mwd.loadout.errors.primaryTypeRestriction, {
      weapon: e.name,
      type: w.mwd.hardpointType[s.typeRestriction] ?? s.typeRestriction
    }))) : i !== "large" && r.push(ce(w.mwd.loadout.errors.primaryNeedsLarge, { weapon: e.name }));
  }
  _getWeapons(e) {
    return this.actor.items.filter((t) => t.type === b.itemType.mechWeapon).filter((t) => {
      var i;
      return (i = t.isActive) == null ? void 0 : i.call(t);
    }).filter(e);
  }
  _asArray(e) {
    return Array.isArray(e) ? e : e == null || e === "" ? [] : [e];
  }
}
class Eu extends lo {
  static get defaultIcon() {
    return `${Is}/vehicles/apc.svg`;
  }
  prepareDerivedData() {
    var e;
    super.prepareDerivedData(), this.system.mwd = this.system.mwd ?? {}, this.system.mwd.chassis = this.system.mwd.chassis ?? "", this.system.mwd.tonnage = this.system.mwd.tonnage ?? 0, this.system.mwd.loadout = new Mu(this).compute(), this.system.mwd.weaponGroupDetails = this._prepareConfiguredWeaponGroups(), this.system.mwd.heat = this._prepareHeatTrack(), this.system.mwd.primaryGroupName = ((e = this.system.mwd.weaponGroupDetails.find((t) => t.isPrimary)) == null ? void 0 : e.name) ?? "", this.system.skills = this._prepareSkillMap(), this.system.weaponGroups = this._prepareWeaponGroups(), this.system.meleeProfiles = this._prepareMeleeProfiles(), this.system.quickActions = {
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
    const i = t.weaponIds.map((s) => this.items.get(s)).filter((s) => s);
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
    var o, l;
    const e = this.system ?? {}, t = ((o = e.monitors) == null ? void 0 : o.heat) ?? { value: 0, max: 0 }, i = ((l = e.mwd) == null ? void 0 : l.heat) ?? {}, s = {
      current: t.value ?? 0,
      max: t.max ?? 0,
      thresholds: {
        runningHot: 2,
        overheated: 3,
        shutdown: 4
      }
    }, r = foundry.utils.mergeObject(s, i, { inplace: !1 });
    r.thresholds = foundry.utils.mergeObject(s.thresholds, i.thresholds ?? {}, { inplace: !1 }), r.current = t.value ?? r.current, r.max = t.max ?? r.max;
    const n = this._resolveHeatStatus(r.current, r.thresholds, r.max);
    return this.system.mwd.heatStatus = {
      code: n,
      label: w.actor.battlemech.heat.status[n] ?? n
    }, r;
  }
  _resolveHeatStatus(e, t, i) {
    return e >= ((t == null ? void 0 : t.shutdown) ?? i) ? "shutdown" : e >= ((t == null ? void 0 : t.overheated) ?? i) ? "overheated" : e >= ((t == null ? void 0 : t.runningHot) ?? 0) ? "runningHot" : "safe";
  }
  _prepareConfiguredWeaponGroups() {
    var i;
    const e = ((i = this.system.mwd) == null ? void 0 : i.weaponGroups) ?? [], t = new Map(this.items.map((s) => [s.id, s]));
    return e.map((s, r) => {
      const n = Array.isArray(s.weaponIds) ? s.weaponIds : s.weaponIds ? [s.weaponIds] : [], o = n.map((c) => t.get(c)).filter((c) => (c == null ? void 0 : c.type) === b.itemType.mechWeapon), l = n.filter((c) => !t.has(c));
      return {
        id: s.id ?? `group-${r + 1}`,
        index: r,
        name: s.name || ce(w.common.newName, { type: w.itemType.singular.weapon }),
        weaponIds: n,
        isPrimary: s.isPrimary ?? !1,
        weapons: o,
        missingWeaponIds: l
      };
    });
  }
  _resolveSkill(e) {
    var s;
    const t = this.items.find((r) => r.type === b.itemType.skill && r.system.code === e);
    if (t)
      return t;
    const i = et(e);
    if (i)
      return {
        name: i.label ?? ((s = w.skill) == null ? void 0 : s[e]) ?? e,
        system: {
          code: e,
          attribute: i.attribute,
          value: 0
        }
      };
  }
  _prepareWeaponGroups() {
    var r;
    const e = (((r = this.system.mwd) == null ? void 0 : r.weaponGroupDetails) ?? []).map((n) => ({
      ...n,
      weapons: n.weapons ?? []
    })).filter((n) => n.weapons.length > 0);
    if (e.length > 0)
      return e.map((n) => ({
        id: n.id,
        name: n.name,
        weaponIds: n.weapons.map((o) => o.id),
        isPrimary: n.isPrimary ?? !1
      }));
    const t = this.items.filter((n) => n.type === b.itemType.mechWeapon);
    if (t.length === 0)
      return [];
    const i = t.filter((n) => this.hasFavorite(b.itemType.mechWeapon, n.id)), s = [];
    return i.length > 0 && s.push({
      id: "favorite",
      name: w.actor.vehicle.quickActions.primaryWeapons,
      weaponIds: i.map((n) => n.id),
      isPrimary: !0
    }), s.push({
      id: "all",
      name: w.actor.vehicle.quickActions.allWeapons,
      weaponIds: t.map((n) => n.id),
      isPrimary: s.length === 0
    }), s;
  }
  _prepareMeleeProfiles() {
    const e = [{
      id: "unarmed",
      name: w.actor.vehicle.quickActions.unarmed,
      weaponId: null,
      damage: 1,
      notes: w.actor.vehicle.quickActions.unarmedNotes
    }], t = this.items.filter((i) => i.type === b.itemType.mechWeapon && i.system.skill === "meleeCombat");
    return e.push(...t.map((i) => {
      var s;
      return {
        id: i.id,
        name: i.name,
        weaponId: i.id,
        damage: ((s = i.getDamage()) == null ? void 0 : s.value) ?? i.system.damage,
        notes: i.system.description ?? ""
      };
    })), e;
  }
  async _rollQuickSkill(e, t = {}) {
    var r;
    const i = ((r = e == null ? void 0 : e.system) == null ? void 0 : r.attribute) ?? this.getPhysicalAgility(), s = foundry.utils.mergeObject(nt.prepareActorRoll(this), {
      mode: Oe.rollType.skill,
      skill: e,
      attribute1: i,
      specialization: void 0
    });
    t.quickAction && (s.quickAction = t.quickAction), await nt.create(s);
  }
  async _promptWeaponGroup(e) {
    if (e.length === 1)
      return e[0];
    const t = e.find((r) => r.isPrimary) ?? e[0], i = `<form class="mwd-quick-select">${e.map((r) => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${r.id}" ${r.id === t.id ? "checked" : ""}>
        <span>${r.name}${r.isPrimary ? ` (${w.actor.vehicle.quickActions.primaryLabel})` : ""}</span>
      </label>`).join("")}</form>`, s = await Dialog.prompt({
      title: w.actor.vehicle.quickActions.selectWeaponGroup,
      content: i,
      label: w.common.roll.button,
      callback: (r) => r.find('input[name="weapon-group"]:checked').val() ?? t.id
    });
    return e.find((r) => r.id === s) ?? t;
  }
  async _promptMeleeProfile(e) {
    if (e.length === 1)
      return e[0];
    const t = e[0], i = `<form class="mwd-quick-select">${e.map((r) => `
      <label class="quick-select-option">
        <input type="radio" name="melee-profile" value="${r.id}" ${r.id === t.id ? "checked" : ""}>
        <span>${r.name}</span>
      </label>`).join("")}</form>`, s = await Dialog.prompt({
      title: w.actor.vehicle.quickActions.selectMeleeProfile,
      content: i,
      label: w.common.roll.button,
      callback: (r) => r.find('input[name="melee-profile"]:checked').val() ?? t.id
    });
    return e.find((r) => r.id === s) ?? t;
  }
  async _promptSensorSweepSkill(e) {
    if (e.length === 1)
      return e[0];
    const t = `<form class="mwd-quick-select">${e.map((s) => `
      <label class="quick-select-option">
        <input type="radio" name="sensor-skill" value="${s.system.code}">
        <span>${s.name}</span>
      </label>`).join("")}</form>`, i = await Dialog.prompt({
      title: w.actor.vehicle.quickActions.selectSensorSkill,
      content: t,
      label: w.common.roll.button,
      callback: (s) => s.find('input[name="sensor-skill"]:checked').val()
    });
    return e.find((s) => s.system.code === i) ?? e[0];
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
const ys = "activeModifiers", cr = [
  { value: "", label: "All Attributes" },
  { value: "reflexes", label: "Reflexes" },
  { value: "strength", label: "Strength" },
  { value: "willpower", label: "Willpower" },
  { value: "charisma", label: "Charisma" },
  { value: "intelligence", label: "Intelligence" },
  { value: "edge", label: "Edge" }
], ur = [
  { value: "", label: "All Intents" },
  { value: "skill", label: "Skill" },
  { value: "attack", label: "Attack" },
  { value: "defense", label: "Defense" },
  { value: "common", label: "Common" },
  { value: "attribute", label: "Attribute" },
  { value: "edge", label: "Edge" },
  { value: "initiative", label: "Initiative" }
];
function qr(a) {
  const e = String(a ?? "").trim();
  return e === "" ? null : e;
}
function Cu(a) {
  return String((a == null ? void 0 : a.intent) ?? "").trim() || null;
}
function Pu(a) {
  var e, t, i;
  return ((e = a == null ? void 0 : a.data) == null ? void 0 : e.attrKey) ?? // skill rolls
  ((i = (t = a == null ? void 0 : a.attack) == null ? void 0 : t.skill) == null ? void 0 : i.attribute) ?? // attack rolls
  null;
}
function Gr(a, e) {
  return a ? e ? a === e : !1 : !0;
}
function co(a) {
  return {
    id: String((a == null ? void 0 : a.id) ?? ""),
    label: String((a == null ? void 0 : a.label) ?? "").trim(),
    value: Math.trunc(Number((a == null ? void 0 : a.value) ?? 0)) || 0,
    enabled: (a == null ? void 0 : a.enabled) !== !1,
    attributeFilter: qr(a == null ? void 0 : a.attributeFilter),
    intentFilter: qr(a == null ? void 0 : a.intentFilter),
    source: (a == null ? void 0 : a.source) === "preset" ? "preset" : "adhoc"
  };
}
class Nu {
  constructor() {
    R(this, "id", "mwd.sceneModifiers");
  }
  collect({ resolved: e } = {}) {
    var n;
    const t = (n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.getFlag("mwd", ys);
    if (!Array.isArray(t) || !t.length) return [];
    const i = Cu(e), s = Pu(e), r = [];
    for (const o of t) {
      const l = co(o);
      l.enabled && Gr(l.intentFilter, i) && Gr(l.attributeFilter, s) && r.push({
        id: l.id || `scene:${l.label}`,
        label: l.label,
        value: l.value,
        source: "Scene"
      });
    }
    return r;
  }
}
const Ru = `systems/${v}/templates/settings/collection-editor.hbs`, uo = /* @__PURE__ */ new Map(), aa = /* @__PURE__ */ new Map();
function oi(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid settings data.");
  return t.validationErrors = e, t;
}
function Hs(a) {
  Iu(a), uo.set(a.id, a), game.settings.register(v, a.settingKey, {
    scope: "world",
    config: !1,
    type: a.settingType ?? Object,
    default: a.defaultData()
  }), game.settings.registerMenu(v, a.menuKey, {
    name: a.menu.name,
    label: a.menu.label,
    hint: a.menu.hint,
    icon: a.menu.icon,
    type: Ou(a.id),
    restricted: a.menu.restricted ?? !0
  });
}
function Du(a) {
  return uo.get(a) ?? null;
}
function Iu(a) {
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
function Ou(a) {
  if (aa.has(a))
    return aa.get(a);
  class e extends mo {
  }
  return R(e, "definitionId", a), aa.set(a, e), e;
}
var G, po, Da, bs, Ss, Ai, Ia, $i, fo, ho, $e;
class mo extends FormApplication {
  constructor(t = {}, i = {}) {
    super(t, i);
    ye(this, G);
    const s = M(this, G, Ss).call(this);
    this.editorState = {
      tab: "rows",
      rows: this.definition.toRows(s),
      bulkText: this.definition.serializeBulk(s),
      errors: []
    };
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: `${v}-${this.definitionId}-editor`,
      classes: ["mwd", "mwd-settings-editor"],
      template: Ru,
      width: 880,
      height: 760,
      resizable: !0,
      submitOnChange: !1,
      closeOnSubmit: !1
    }, { inplace: !1 });
  }
  get definition() {
    const t = Du(this.constructor.definitionId);
    if (!t)
      throw new Error(`Missing settings collection definition: ${this.constructor.definitionId}`);
    return t;
  }
  get title() {
    var t;
    return this.definition.title ?? ((t = this.definition.menu) == null ? void 0 : t.name) ?? "Settings Editor";
  }
  getData(t = {}) {
    const i = M(this, G, ho).call(this), s = this.editorState.rows.map((r, n, o) => ({
      index: n,
      fields: i.map((l) => M(this, G, fo).call(this, l, r, n)),
      canMoveUp: n > 0,
      canMoveDown: n < o.length - 1
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
      columns: i.map((r) => ({ key: r.key, label: r.label })),
      rows: s,
      hasRows: s.length > 0,
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
    super.activateListeners(t), t.find("[data-action]").each((i, s) => {
      s.addEventListener("click", (r) => {
        var l;
        const n = r.currentTarget, o = String(((l = n == null ? void 0 : n.dataset) == null ? void 0 : l.action) ?? "").trim();
        o && M(this, G, po).call(this, o, r, n);
      });
    });
  }
  async _onSubmit(t, { updateData: i = null, preventClose: s = !0, preventRender: r = !0 } = {}) {
    return super._onSubmit(t, { updateData: i, preventClose: s, preventRender: r });
  }
  async _updateObject(t, i) {
    var s;
    M(this, G, $e).call(this, []);
    try {
      const r = this.editorState.tab === "bulk" ? this.definition.parseBulk(M(this, G, $i).call(this)) : this.definition.rowsToValue(M(this, G, Ia).call(this));
      await game.settings.set(v, this.definition.settingKey, r);
      const n = M(this, G, Ss).call(this);
      M(this, G, bs).call(this, n), await this.close();
    } catch (r) {
      M(this, G, $e).call(this, os(r)), this.editorState.errors.length && ((s = ui.notifications) == null || s.error(this.editorState.errors[0])), this.render(!1);
    }
  }
}
G = new WeakSet(), po = async function(t, i, s) {
  var r, n, o, l, c, u, d, p;
  switch (i.preventDefault(), i.stopPropagation(), t) {
    case "switchRows":
      M(this, G, $i).call(this), this.editorState.tab = "rows", M(this, G, $e).call(this, []), this.render(!1);
      return;
    case "switchBulk":
      M(this, G, Ai).call(this);
      try {
        const m = this.definition.rowsToValue(this.editorState.rows);
        this.editorState.bulkText = this.definition.serializeBulk(m), this.editorState.tab = "bulk", M(this, G, $e).call(this, []);
      } catch (m) {
        M(this, G, $e).call(this, os(m)), this.editorState.errors.length && ((r = ui.notifications) == null || r.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "addRow":
      M(this, G, Ai).call(this), this.editorState.rows.push(((o = (n = this.definition).createEmptyRow) == null ? void 0 : o.call(n)) ?? {}), M(this, G, $e).call(this, []), this.render(!1);
      return;
    case "removeRow":
      M(this, G, Ai).call(this), this.editorState.rows.splice(Number(((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.index) ?? -1), 1), M(this, G, $e).call(this, []), this.render(!1);
      return;
    case "moveRowUp":
      M(this, G, Ai).call(this), M(this, G, Da).call(this, Number(((c = s == null ? void 0 : s.dataset) == null ? void 0 : c.index) ?? -1), -1), M(this, G, $e).call(this, []), this.render(!1);
      return;
    case "moveRowDown":
      M(this, G, Ai).call(this), M(this, G, Da).call(this, Number(((u = s == null ? void 0 : s.dataset) == null ? void 0 : u.index) ?? -1), 1), M(this, G, $e).call(this, []), this.render(!1);
      return;
    case "loadBulk":
      try {
        const m = this.definition.parseBulk(M(this, G, $i).call(this));
        this.editorState.rows = this.definition.toRows(m), this.editorState.bulkText = this.definition.serializeBulk(m), this.editorState.tab = "rows", M(this, G, $e).call(this, []);
      } catch (m) {
        M(this, G, $e).call(this, os(m)), this.editorState.errors.length && ((d = ui.notifications) == null || d.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "formatBulk":
      try {
        const m = this.definition.parseBulk(M(this, G, $i).call(this));
        this.editorState.bulkText = this.definition.serializeBulk(m), M(this, G, $e).call(this, []);
      } catch (m) {
        M(this, G, $e).call(this, os(m)), this.editorState.errors.length && ((p = ui.notifications) == null || p.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "resetSetting":
      M(this, G, bs).call(this, M(this, G, Ss).call(this)), this.render(!1);
      return;
    case "restoreDefaults":
      M(this, G, bs).call(this, this.definition.defaultData()), this.render(!1);
      return;
    case "cancel":
      await this.close();
      return;
    default:
      return;
  }
}, Da = function(t, i) {
  if (!Number.isInteger(t)) return;
  const s = t + i;
  if (t < 0 || s < 0 || s >= this.editorState.rows.length) return;
  const r = [...this.editorState.rows], [n] = r.splice(t, 1);
  r.splice(s, 0, n), this.editorState.rows = r;
}, bs = function(t) {
  this.editorState.rows = this.definition.toRows(t), this.editorState.bulkText = this.definition.serializeBulk(t), this.editorState.tab = "rows", M(this, G, $e).call(this, []);
}, Ss = function() {
  const t = game.settings.get(v, this.definition.settingKey);
  return foundry.utils.deepClone(t ?? this.definition.defaultData());
}, Ai = function() {
  this.editorState.rows = M(this, G, Ia).call(this);
}, Ia = function() {
  const t = foundry.utils.expandObject(this._getSubmitData()), i = (t == null ? void 0 : t.rows) ?? {};
  return Object.keys(i).sort((s, r) => Number(s) - Number(r)).map((s) => {
    const r = i[s] ?? {};
    return Object.fromEntries(
      this.definition.rowSchema.map((n) => [
        n.key,
        String((r == null ? void 0 : r[n.key]) ?? "")
      ])
    );
  });
}, $i = function() {
  var s;
  const t = this.form, i = (s = t == null ? void 0 : t.querySelector) == null ? void 0 : s.call(t, 'textarea[name="bulkText"]');
  return i instanceof HTMLTextAreaElement && (this.editorState.bulkText = i.value), this.editorState.bulkText ?? "";
}, fo = function(t, i, s) {
  const r = t.type ?? "text", n = String((i == null ? void 0 : i[t.key]) ?? t.default ?? ""), o = r === "select" ? _u(t).map((l) => ({
    value: String(l.value ?? ""),
    label: String(l.label ?? l.value ?? ""),
    selected: String(l.value ?? "") === n
  })) : [];
  return {
    key: t.key,
    label: t.label,
    type: r,
    inputType: r === "select" ? "text" : r,
    name: `rows.${s}.${t.key}`,
    value: n,
    placeholder: t.placeholder ?? "",
    min: t.min ?? "",
    max: t.max ?? "",
    step: t.step ?? "",
    options: o
  };
}, ho = function() {
  return this.definition.rowSchema.map((t) => ({
    ...t,
    type: t.type ?? "text"
  }));
}, $e = function(t = []) {
  this.editorState.errors = Array.isArray(t) ? t.filter(Boolean) : [];
}, R(mo, "definitionId", "");
function _u(a) {
  const e = typeof a.options == "function" ? a.options() : a.options;
  return Array.isArray(e) ? e : [];
}
function os(a) {
  const e = Array.isArray(a == null ? void 0 : a.validationErrors) ? a.validationErrors.filter(Boolean) : [String((a == null ? void 0 : a.message) ?? "Unable to save settings.").trim()].filter(Boolean);
  return e.length ? e : ["Unable to save settings."];
}
const Oa = "sceneModifierTemplates", Lu = "sceneModifierTemplateEditor", $u = Object.freeze([]);
function Yt(a) {
  const e = String(a ?? "").trim();
  return e === "" ? "" : e;
}
function go(a = []) {
  const e = [], t = [], i = /* @__PURE__ */ new Set();
  if ((Array.isArray(a) ? a : []).forEach((s, r) => {
    const n = String((s == null ? void 0 : s.label) ?? "").trim(), o = String((s == null ? void 0 : s.value) ?? "").trim(), l = `Row ${r + 1}`;
    if (!n) {
      t.push(`${l}: label cannot be blank.`);
      return;
    }
    if (i.has(n.toLowerCase())) {
      t.push(`${l}: duplicate label "${n}".`);
      return;
    }
    i.add(n.toLowerCase());
    const c = Number(o);
    if (!Number.isFinite(c)) {
      t.push(`${l}: value must be a number.`);
      return;
    }
    e.push({
      label: n,
      value: Math.trunc(c),
      attributeFilter: Yt(s == null ? void 0 : s.attributeFilter),
      intentFilter: Yt(s == null ? void 0 : s.intentFilter)
    });
  }), t.length) throw oi(t);
  return e;
}
function xu(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => ({
    label: String((e == null ? void 0 : e.label) ?? ""),
    value: String((e == null ? void 0 : e.value) ?? "0"),
    attributeFilter: Yt(e == null ? void 0 : e.attributeFilter),
    intentFilter: Yt(e == null ? void 0 : e.intentFilter)
  }));
}
function Bu(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw oi([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  if (!Array.isArray(t))
    throw oi(["Bulk JSON must be an array."]);
  return go(t.map((i) => ({
    label: String((i == null ? void 0 : i.label) ?? ""),
    value: String((i == null ? void 0 : i.value) ?? "0"),
    attributeFilter: Yt(i == null ? void 0 : i.attributeFilter),
    intentFilter: Yt(i == null ? void 0 : i.intentFilter)
  })));
}
function Fu(a = []) {
  return JSON.stringify(
    (Array.isArray(a) ? a : []).map((e) => ({
      label: String((e == null ? void 0 : e.label) ?? ""),
      value: Number((e == null ? void 0 : e.value) ?? 0),
      attributeFilter: Yt(e == null ? void 0 : e.attributeFilter),
      intentFilter: Yt(e == null ? void 0 : e.intentFilter)
    })),
    null,
    2
  );
}
const zu = {
  id: "scene-modifier-templates",
  menuKey: Lu,
  settingKey: Oa,
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
      options: cr
    },
    {
      key: "intentFilter",
      label: "Intent Filter",
      type: "select",
      options: ur
    }
  ],
  menu: {
    name: "Scene Modifier Templates",
    label: "Configure",
    hint: "Edit the preset scene modifier templates available in the GM Gadget.",
    icon: "fas fa-cloud",
    restricted: !0
  },
  defaultData: () => foundry.utils.deepClone($u),
  createEmptyRow: () => ({
    label: "",
    value: "0",
    attributeFilter: "",
    intentFilter: ""
  }),
  toRows: xu,
  rowsToValue: go,
  parseBulk: Bu,
  serializeBulk: Fu
};
function Wu() {
  Hs(zu);
}
const { ApplicationV2: Uu, HandlebarsApplicationMixin: Hu } = foundry.applications.api, ju = "mwd-gmgadget", yo = "gmDnPresets", As = "gmNextDn", xi = "gmDnAnnounceToChat", qu = Object.freeze([
  { label: "Standard", dn: 1 },
  { label: "Challenging", dn: 2 },
  { label: "Hard", dn: 3 },
  { label: "Extreme", dn: 4 }
]), Gu = "systems/mwd/templates/v2/mwd-gmgadget.hbs", Bi = Object.freeze({
  actorId: "",
  mode: "physical",
  delta: 1,
  useArmor: !1,
  damageType: "concussive",
  statusId: "",
  statusActive: !0,
  source: "",
  notes: ""
});
function Vu(a = "") {
  return String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean).map((e) => {
    const [t, i] = e.split(":").map((n) => (n ?? "").trim()), s = t || "DN", r = Number.isFinite(Number(i)) ? Number(i) : Number(t);
    return {
      label: s,
      dn: Number.isFinite(r) ? Math.max(0, Math.trunc(r)) : null
    };
  }).filter((e) => Number.isFinite(e.dn));
}
function Ku(a = []) {
  const e = new Error(a[0] ?? "Invalid GM DN presets.");
  return e.validationErrors = Array.isArray(a) ? a.filter(Boolean) : [], e;
}
function Yu() {
  return foundry.utils.deepClone(qu);
}
function Zi(a, { strict: e = !1 } = {}) {
  const t = typeof a == "string" ? Vu(a) : Array.isArray(a) ? a : [], i = [], s = [], r = /* @__PURE__ */ new Set();
  if (t.forEach((n, o) => {
    const l = String((n == null ? void 0 : n.label) ?? "").trim(), c = n == null ? void 0 : n.dn, u = `Preset ${o + 1}`;
    if (!l) {
      e && s.push(`${u}: label cannot be blank.`);
      return;
    }
    const d = l.toLowerCase();
    if (r.has(d)) {
      e && s.push(`${u}: duplicate label "${l}".`);
      return;
    }
    const p = Number(c);
    if (!Number.isFinite(p)) {
      e && s.push(`${u}: DN must be numeric.`);
      return;
    }
    if (p < 0) {
      e && s.push(`${u}: DN cannot be negative.`);
      return;
    }
    r.add(d), i.push({
      label: l,
      dn: Math.trunc(p)
    });
  }), e && s.length) throw Ku(s);
  return i;
}
function ra(a = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(Bi),
    a ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function Qu(a) {
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
function Ju(a) {
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
function Xu(a) {
  return Ye.getStatusOptions(a);
}
function Zu(a = "mwd") {
  game.settings.register(a, As, {
    scope: "client",
    config: !1,
    type: Number,
    default: 1
  }), game.settings.register(a, xi, {
    scope: "client",
    config: !0,
    name: "Announce GM DN changes to chat",
    hint: "If enabled, posts a small chat notice when you change the current DN preset.",
    type: Boolean,
    default: !1
  });
}
const Ie = class Ie extends Hu(Uu) {
  constructor({ systemId: e = "mwd", ...t } = {}) {
    super(t), this.systemId = e, this.activeTab = "difficulty", this.harmState = ra();
  }
  async render(e = {}) {
    var t;
    return (t = game.user) != null && t.isGM ? super.render(e) : this;
  }
  async _prepareContext(e) {
    var f, y, h, g;
    const t = await super._prepareContext(e), i = Zi(
      game.settings.get(this.systemId, yo),
      { strict: !1 }
    ), s = Number(game.settings.get(this.systemId, As) ?? 1), r = !!game.settings.get(this.systemId, xi), n = Ye.getActorOptions(), o = Ye.getSceneTarget(), l = this.harmState.actorId ? ((y = (f = game.actors) == null ? void 0 : f.get) == null ? void 0 : y.call(f, this.harmState.actorId)) ?? null : null, c = Ye.resolveTarget({
      actor: l,
      actorId: this.harmState.actorId,
      preferSceneTarget: !0
    }), u = Xu(c.actor ?? l ?? null), d = ra(this.harmState);
    !d.statusId && u.length && (d.statusId = u[0].value, this.harmState.statusId = d.statusId);
    const p = Vr(
      game.settings.get(this.systemId, Oa)
    ), m = Kr(
      (h = canvas == null ? void 0 : canvas.scene) == null ? void 0 : h.getFlag("mwd", ys)
    );
    return foundry.utils.mergeObject(t, {
      presets: i,
      currentDn: s,
      currentTab: this.activeTab,
      announce: r,
      isGM: ((g = game.user) == null ? void 0 : g.isGM) ?? !1,
      scene: {
        hasScene: !!(canvas != null && canvas.scene),
        templates: p,
        activeModifiers: m,
        attributeFilterOptions: cr,
        intentFilterOptions: ur
      },
      harm: {
        state: d,
        actorOptions: n,
        modes: Ye.MODE_OPTIONS,
        damageTypes: gu,
        statusOptions: u,
        sceneTarget: Qu(o),
        effectiveTarget: Ju(c),
        canApply: !!c.actor,
        applyReason: c.reason || "",
        useArmorAvailable: d.mode === "physical" || d.mode === "fatigue",
        showDamageType: (d.mode === "physical" || d.mode === "fatigue") && d.useArmor,
        showStatusFields: d.mode === "status",
        showDeltaFields: d.mode !== "status"
      }
    });
  }
  _getRootElement() {
    var e;
    return this.element instanceof HTMLElement ? this.element : (e = this.element) == null ? void 0 : e[0];
  }
  _captureHarmStateFromDom(e = null) {
    var r;
    const t = ((r = e == null ? void 0 : e.closest) == null ? void 0 : r.call(e, ".mwd-gmgadget__root")) ?? this._getRootElement();
    if (!(t instanceof HTMLElement)) return this.harmState;
    const i = (n, o = "") => {
      const l = t.querySelector(n);
      return l instanceof HTMLInputElement || l instanceof HTMLSelectElement || l instanceof HTMLTextAreaElement ? l.value : o;
    }, s = (n, o = !1) => {
      const l = t.querySelector(n);
      return l instanceof HTMLInputElement ? l.checked : o;
    };
    return this.harmState = ra({
      actorId: i('[name="harm-actorId"]', this.harmState.actorId),
      mode: i('[name="harm-mode"]', this.harmState.mode),
      delta: Number(i('[name="harm-delta"]', this.harmState.delta)),
      useArmor: s('[name="harm-useArmor"]', this.harmState.useArmor),
      damageType: i('[name="harm-damageType"]', this.harmState.damageType),
      statusId: i('[name="harm-statusId"]', this.harmState.statusId),
      statusActive: i('[name="harm-statusActive"]', this.harmState.statusActive ? "add" : "remove") !== "remove",
      source: i('[name="harm-source"]', this.harmState.source),
      notes: i('[name="harm-notes"]', this.harmState.notes)
    }), Number.isFinite(Number(this.harmState.delta)) || (this.harmState.delta = Bi.delta), this.harmState;
  }
  async _onSetDn(e, t) {
    var r, n, o;
    if (e.preventDefault(), e.stopPropagation(), !((r = game.user) != null && r.isGM)) return;
    const i = Math.max(0, Math.trunc(Number(((n = t == null ? void 0 : t.dataset) == null ? void 0 : n.dn) ?? NaN)));
    if (!Number.isFinite(i)) return;
    if (await game.settings.set(this.systemId, As, i), !!game.settings.get(this.systemId, xi)) {
      const l = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.label) ?? `DN ${i}`);
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ user: game.user }),
        content: `<div class="mwd-gm-notice"><b>GM Difficulty:</b> ${foundry.utils.escapeHTML(l)} (DN ${i} hits)</div>`
      });
    }
    return this.render({ parts: ["body"] });
  }
  async _onSwitchTab(e, t) {
    var s, r, n;
    (s = e == null ? void 0 : e.preventDefault) == null || s.call(e), (r = e == null ? void 0 : e.stopPropagation) == null || r.call(e);
    const i = String(((n = t == null ? void 0 : t.dataset) == null ? void 0 : n.tab) ?? "").trim();
    if (!(!i || i === this.activeTab))
      return this._captureHarmStateFromDom(t), this.activeTab = i, this.render({ parts: ["body"] });
  }
  async _onClearDn(e, t) {
    var i;
    if (e.preventDefault(), e.stopPropagation(), !!((i = game.user) != null && i.isGM))
      return await game.settings.set(this.systemId, As, 1), this.render({ parts: ["body"] });
  }
  async _onToggleAnnounce(e, t) {
    var s;
    if (e.preventDefault(), e.stopPropagation(), !((s = game.user) != null && s.isGM)) return;
    const i = !game.settings.get(this.systemId, xi);
    return await game.settings.set(this.systemId, xi, i), this.render({ parts: ["body"] });
  }
  async _onHarmInputChange(e, t) {
    var s, r;
    (s = e == null ? void 0 : e.preventDefault) == null || s.call(e), this._captureHarmStateFromDom(t);
    const i = String(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.harmKey) ?? "").trim();
    if (["actorId", "mode", "useArmor"].includes(i))
      return this.render({ parts: ["body"] });
  }
  async _onRefreshHarmTarget(e, t) {
    var i, s;
    return (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (s = e == null ? void 0 : e.stopPropagation) == null || s.call(e), this._captureHarmStateFromDom(t), this.render({ parts: ["body"] });
  }
  async _onApplyHarm(e, t) {
    var n, o, l, c, u;
    if ((n = e == null ? void 0 : e.preventDefault) == null || n.call(e), (o = e == null ? void 0 : e.stopPropagation) == null || o.call(e), !((l = game.user) != null && l.isGM)) return;
    const i = this._captureHarmStateFromDom(t), s = this._buildHarmPayload(i);
    if (!s) {
      (c = ui.notifications) == null || c.warn("Choose a valid harm action before applying it.");
      return;
    }
    const r = await Ye.apply({
      payload: s,
      options: {
        actorId: i.actorId,
        preferSceneTarget: !0,
        logToChat: !0
      }
    });
    return r != null && r.ok ? this.render({ parts: ["body"] }) : ((u = ui.notifications) == null || u.warn((r == null ? void 0 : r.reason) ?? "Unable to apply harm."), this.render({ parts: ["body"] }));
  }
  _buildHarmPayload(e) {
    const t = String((e == null ? void 0 : e.source) ?? "").trim(), i = String((e == null ? void 0 : e.notes) ?? "").trim(), s = String((e == null ? void 0 : e.mode) ?? "").trim();
    if (s === "status") {
      const r = String((e == null ? void 0 : e.statusId) ?? "").trim();
      return r ? {
        mode: "status",
        statusId: r,
        active: !!(e != null && e.statusActive),
        source: t,
        notes: i
      } : null;
    }
    return s === "burn" ? {
      mode: "burnDelta",
      delta: Yr(e == null ? void 0 : e.delta, Bi.delta),
      source: t,
      notes: i
    } : s === "physical" || s === "fatigue" ? {
      mode: "trackDelta",
      track: s,
      delta: Yr(e == null ? void 0 : e.delta, Bi.delta),
      useArmor: !!(e != null && e.useArmor),
      damageType: (e == null ? void 0 : e.damageType) ?? Bi.damageType,
      source: t,
      notes: i
    } : null;
  }
  // ---- Scene modifier actions ----
  async _onAddSceneModifierFromPreset(e, t) {
    var l, c, u, d;
    if ((l = e == null ? void 0 : e.preventDefault) == null || l.call(e), (c = e == null ? void 0 : e.stopPropagation) == null || c.call(e), !((u = game.user) != null && u.isGM)) return;
    const i = ((d = t == null ? void 0 : t.closest) == null ? void 0 : d.call(t, ".mwd-gmgadget__root")) ?? this._getRootElement(), s = i instanceof HTMLElement ? i.querySelector('select[name="scene-preset-index"]') : null, r = s instanceof HTMLSelectElement ? Number(s.value) : NaN, n = Vr(
      game.settings.get(this.systemId, Oa)
    ), o = Number.isFinite(r) ? n[r] : null;
    o && await this._mutateSceneModifiers((p) => [
      ...p,
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
    var s, r, n, o;
    if ((s = e == null ? void 0 : e.preventDefault) == null || s.call(e), (r = e == null ? void 0 : e.stopPropagation) == null || r.call(e), !((n = game.user) != null && n.isGM)) return;
    const i = this._captureAdhocFormFromDom(t);
    if (!i) {
      (o = ui.notifications) == null || o.warn("Label and a numeric value are required.");
      return;
    }
    await this._mutateSceneModifiers((l) => [...l, i]);
  }
  async _onToggleSceneModifier(e, t) {
    var s, r, n, o;
    if ((s = e == null ? void 0 : e.preventDefault) == null || s.call(e), (r = e == null ? void 0 : e.stopPropagation) == null || r.call(e), !((n = game.user) != null && n.isGM)) return;
    const i = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.modId) ?? "").trim();
    i && await this._mutateSceneModifiers(
      (l) => l.map((c) => c.id === i ? { ...c, enabled: !c.enabled } : c)
    );
  }
  async _onRemoveSceneModifier(e, t) {
    var s, r, n, o;
    if ((s = e == null ? void 0 : e.preventDefault) == null || s.call(e), (r = e == null ? void 0 : e.stopPropagation) == null || r.call(e), !((n = game.user) != null && n.isGM)) return;
    const i = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.modId) ?? "").trim();
    i && await this._mutateSceneModifiers((l) => l.filter((c) => c.id !== i));
  }
  async _onClearSceneModifiers(e, t) {
    var i, s, r;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (s = e == null ? void 0 : e.stopPropagation) == null || s.call(e), (r = game.user) != null && r.isGM && await this._mutateSceneModifiers(() => []);
  }
  async _mutateSceneModifiers(e) {
    const t = canvas == null ? void 0 : canvas.scene;
    if (!t) return;
    const i = Kr(t.getFlag("mwd", ys)), s = await e(i);
    return await t.setFlag("mwd", ys, s), this.render({ parts: ["body"] });
  }
  _captureAdhocFormFromDom(e) {
    var c;
    const t = ((c = e == null ? void 0 : e.closest) == null ? void 0 : c.call(e, ".mwd-gmgadget__root")) ?? this._getRootElement();
    if (!(t instanceof HTMLElement)) return null;
    const i = (u) => {
      const d = t.querySelector(u);
      return d instanceof HTMLInputElement || d instanceof HTMLSelectElement ? d.value : "";
    }, s = i('[name="scene-adhoc-label"]').trim(), r = i('[name="scene-adhoc-value"]').trim(), n = i('[name="scene-adhoc-attributeFilter"]').trim() || null, o = i('[name="scene-adhoc-intentFilter"]').trim() || null;
    if (!s) return null;
    const l = Number(r);
    return Number.isFinite(l) ? {
      id: foundry.utils.randomID(),
      label: s,
      value: Math.trunc(l),
      enabled: !0,
      attributeFilter: n,
      intentFilter: o,
      source: "adhoc"
    } : null;
  }
};
R(Ie, "DEFAULT_OPTIONS", {
  id: ju,
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
    switchTab: Ie.prototype._onSwitchTab,
    setDn: Ie.prototype._onSetDn,
    clearDn: Ie.prototype._onClearDn,
    toggleAnnounce: Ie.prototype._onToggleAnnounce,
    harmInputChange: Ie.prototype._onHarmInputChange,
    refreshHarmTarget: Ie.prototype._onRefreshHarmTarget,
    applyHarm: Ie.prototype._onApplyHarm,
    addSceneModifierFromPreset: Ie.prototype._onAddSceneModifierFromPreset,
    addSceneModifierAdhoc: Ie.prototype._onAddSceneModifierAdhoc,
    toggleSceneModifier: Ie.prototype._onToggleSceneModifier,
    removeSceneModifier: Ie.prototype._onRemoveSceneModifier,
    clearSceneModifiers: Ie.prototype._onClearSceneModifiers
  }
}), R(Ie, "PARTS", {
  body: { template: Gu }
});
let _a = Ie;
function Vr(a) {
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
function Kr(a) {
  return Array.isArray(a) ? a.map((e) => {
    var r, n;
    const t = co(e), i = ((r = cr.find((o) => o.value === (t.attributeFilter ?? ""))) == null ? void 0 : r.label) ?? null, s = ((n = ur.find((o) => o.value === (t.intentFilter ?? ""))) == null ? void 0 : n.label) ?? null;
    return {
      ...t,
      attributeFilterLabel: t.attributeFilter ? i : null,
      intentFilterLabel: t.intentFilter ? s : null,
      signedValue: t.value >= 0 ? `+${t.value}` : String(t.value),
      isPositive: t.value > 0
    };
  }) : [];
}
function Yr(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
let na = null;
function ed({ systemId: a = "mwd" } = {}) {
  return na || (na = new _a({ systemId: a })), na;
}
const td = "gmDnPresetEditor";
function id(a = []) {
  const e = [], t = [], i = /* @__PURE__ */ new Set();
  if ((Array.isArray(a) ? a : []).forEach((s, r) => {
    const n = String((s == null ? void 0 : s.label) ?? "").trim(), o = String((s == null ? void 0 : s.dn) ?? "").trim(), l = `Row ${r + 1}`;
    if (!n) {
      t.push(`${l}: label cannot be blank.`);
      return;
    }
    if (i.has(n.toLowerCase())) {
      t.push(`${l}: duplicate label "${n}".`);
      return;
    }
    i.add(n.toLowerCase());
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
      label: n,
      dn: Math.trunc(c)
    });
  }), t.length) throw oi(t);
  return Zi(e, { strict: !0 });
}
function sd(a = []) {
  return Zi(a, { strict: !1 }).map((e) => ({
    label: e.label,
    dn: String(e.dn)
  }));
}
function ad(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw oi([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return Zi(t, { strict: !0 });
}
function rd(a = []) {
  return JSON.stringify(
    Zi(a, { strict: !1 }),
    null,
    2
  );
}
const nd = {
  id: "gm-dn-presets",
  menuKey: td,
  settingKey: yo,
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
  defaultData: Yu,
  createEmptyRow: () => ({
    label: "",
    dn: "1"
  }),
  toRows: sd,
  rowsToValue: id,
  parseBulk: ad,
  serializeBulk: rd
};
function od() {
  Hs(nd);
}
const ld = "lifeModuleCatalogEditor";
function cd(a = []) {
  return ci((Array.isArray(a) ? a : []).map((e) => ({
    id: String((e == null ? void 0 : e.id) ?? ""),
    moduleType: String((e == null ? void 0 : e.moduleType) ?? ""),
    label: String((e == null ? void 0 : e.label) ?? ""),
    grants: String((e == null ? void 0 : e.grants) ?? ""),
    requiresAny: String((e == null ? void 0 : e.requiresAny) ?? ""),
    excludesAny: String((e == null ? void 0 : e.excludesAny) ?? "")
  })), { strict: !0 });
}
function ud(a = []) {
  return ci(a, { strict: !1 }).map((e) => ({
    id: e.id,
    moduleType: e.moduleType,
    label: e.label,
    grants: sc(e.grants),
    requiresAny: e.requiresAny.join(", "),
    excludesAny: e.excludesAny.join(", ")
  }));
}
function dd(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    const s = new Error(`Bulk JSON must be valid JSON: ${i.message}`);
    throw s.validationErrors = [s.message], s;
  }
  if (!Array.isArray(t)) {
    const i = new Error("Bulk JSON must be an array.");
    throw i.validationErrors = [i.message], i;
  }
  return ci(t, { strict: !0 });
}
function md(a = []) {
  return JSON.stringify(
    ci(a, { strict: !1 }),
    null,
    2
  );
}
const pd = {
  id: "life-module-catalog",
  menuKey: ld,
  settingKey: Ti,
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
      options: Fn
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
  defaultData: er,
  createEmptyRow: () => ({
    id: "",
    moduleType: "childhood",
    label: "",
    grants: "",
    requiresAny: "",
    excludesAny: ""
  }),
  toRows: ud,
  rowsToValue: cd,
  parseBulk: dd,
  serializeBulk: md
};
function fd() {
  Hs(pd);
}
const hd = "skillSpecializationEditor";
function La() {
  return vs().map((a) => ({
    value: a.code,
    label: a.label
  }));
}
function gd(a = []) {
  const e = new Set(La().map((s) => s.value)), t = {}, i = [];
  if ((Array.isArray(a) ? a : []).forEach((s, r) => {
    const n = String((s == null ? void 0 : s.skillCode) ?? "").trim(), o = String((s == null ? void 0 : s.label) ?? "").trim(), l = `Row ${r + 1}`;
    if (!n) {
      i.push(`${l}: choose a skill.`);
      return;
    }
    if (!e.has(n)) {
      i.push(`${l}: unknown skill code "${n}".`);
      return;
    }
    if (!o) {
      i.push(`${l}: specialization label cannot be blank.`);
      return;
    }
    (t[n] ?? (t[n] = [])).push(o);
  }), i.length) throw oi(i);
  return $s(t, { strict: !0 });
}
function yd(a = {}) {
  const e = $s(a, { strict: !1 });
  return Object.entries(e).flatMap(
    ([t, i]) => i.map((s) => ({ skillCode: t, label: s }))
  );
}
function bd(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return {};
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw oi([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return $s(t, { strict: !0 });
}
function Sd(a = {}) {
  return JSON.stringify(
    $s(a, { strict: !1 }),
    null,
    2
  );
}
const Ad = {
  id: "skill-specializations",
  menuKey: hd,
  settingKey: Sa,
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
      options: La
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
  defaultData: Dn,
  createEmptyRow: () => {
    var a;
    return {
      skillCode: ((a = La()[0]) == null ? void 0 : a.value) ?? "",
      label: ""
    };
  },
  toRows: yd,
  rowsToValue: gd,
  parseBulk: bd,
  serializeBulk: Sd
};
function wd() {
  Hs(Ad);
}
class Td {
  static register() {
    od(), fd(), wd(), Wu(), game.settings.register(v, "useDestinyMechanics", {
      name: w.settings.useDestinyMechanics.name,
      hint: w.settings.useDestinyMechanics.hint,
      scope: "world",
      config: !0,
      type: Boolean,
      default: !0
    }), game.settings.register(v, "enableGMGadget", {
      name: "Enable GM Gadget",
      hint: "If enabled, renders the new AppV2 GM Gadget UI on startup.",
      scope: "world",
      config: !0,
      type: Boolean,
      default: !0
    });
  }
  static getSystemProperty(e, t) {
    return game.settings.get(v, e) ?? t;
  }
}
class kd extends Error {
  constructor(e, { severity: t = "error" } = {}) {
    super(e), this.name = "UserFacingRollError", this.userFacing = !0, this.severity = t === "warn" ? "warn" : "error";
  }
}
function vd(a, e = {}) {
  return new kd(a, e);
}
function Ps(a, e = "Unable to execute roll.") {
  var i, s;
  const t = a != null && a.userFacing && (a == null ? void 0 : a.severity) === "warn" ? "warn" : "error";
  (s = (i = ui.notifications) == null ? void 0 : i[t]) == null || s.call(i, (a == null ? void 0 : a.message) ?? e);
}
const { HandlebarsApplicationMixin: Md } = foundry.applications.api;
var Ke, Qi, Wt, Qt, $a, xa;
const xe = class xe extends Md(foundry.applications.sheets.ActorSheetV2) {
  constructor() {
    super(...arguments);
    ye(this, Qt);
    ye(this, Ke, !1);
    /** Track active CSB tab per group across rerenders */
    ye(this, Qi, /* @__PURE__ */ new Map());
    // group -> tabId
    ye(this, Wt, /* @__PURE__ */ new Map());
  }
  /** @override */
  _updatePosition(t) {
    const i = super._updatePosition(t), {
      MIN_WIDTH: s,
      MAX_WIDTH: r,
      MIN_HEIGHT: n,
      MAX_HEIGHT: o
    } = this.constructor;
    return typeof i.width == "number" && (i.width = Math.min(
      r,
      Math.max(s, i.width)
    )), typeof i.height == "number" && (i.height = Math.min(
      o,
      Math.max(n, i.height)
    )), i;
  }
  // Optional legacy shim if anything still reads defaultOptions
  static get defaultOptions() {
    return this.DEFAULT_OPTIONS;
  }
  /** Editing mode flag for templates */
  get editing() {
    return B(this, Ke);
  }
  toggleEditing() {
    if (this.isEditable) {
      if (B(this, Ke)) {
        this._commitEditsToActor().finally(() => {
          Re(this, Ke, !B(this, Ke)), this.render({ force: !0 });
        });
        return;
      }
      Re(this, Ke, !B(this, Ke)), this.render({ force: !0 });
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
    var r, n;
    const t = this.actor ?? this.document ?? null, i = (t == null ? void 0 : t.token) ?? null, s = (r = this.document) != null && r.isToken ? ((n = this.document) == null ? void 0 : n.token) ?? i ?? null : i;
    return s ? (s == null ? void 0 : s.document) ?? s : null;
  }
  /**
   * Resolve the document that should persist actor-backed state.
   * Linked token sheets should write to the base actor document so state survives scene changes.
   */
  getPersistentActor() {
    var s, r, n;
    const t = this.actor ?? this.document ?? null;
    if (!t) return null;
    const i = this.getSheetTokenDocument();
    return i != null && i.isLinked ? i.baseActor ?? ((n = (s = game.actors) == null ? void 0 : s.get) == null ? void 0 : n.call(s, ((r = i == null ? void 0 : i.baseActor) == null ? void 0 : r.id) ?? "")) ?? i.actor ?? t : t;
  }
  /** @override */
  _initializeApplicationOptions(t) {
    var o, l, c, u, d;
    t = super._initializeApplicationOptions(t), t.classes = Array.from(t.classes ?? []);
    const i = (t == null ? void 0 : t.document) ?? this.document, s = (i == null ? void 0 : i.type) ?? ((o = this.actor) == null ? void 0 : o.type);
    s && t.classes.push(String(s));
    const r = ((d = (u = (c = (l = game.system) == null ? void 0 : l.anarchy) == null ? void 0 : c.styles) == null ? void 0 : u.selectCssClass) == null ? void 0 : d.call(u)) ?? "mwd-theme-default", n = ["mwd-theme-default", "mwd-theme-sra"];
    for (let p = t.classes.length - 1; p >= 0; p--)
      n.includes(t.classes[p]) && t.classes.splice(p, 1);
    return t.classes.push(r), t;
  }
  /**
   * No localization: provide a concrete title so Foundry doesn't show "TYPES.Actor.<type>".
   * @override
   */
  get title() {
    var n, o;
    const t = ((n = this.actor) == null ? void 0 : n.type) ?? "actor", s = {
      character: "Character",
      npc: "NPC",
      battlemech: "BattleMech",
      vehicle: "Vehicle",
      device: "Device"
    }[t] ?? String(t).replace(/(^|[-_])([a-z])/g, (l, c, u) => (c ? " " : "") + u.toUpperCase());
    return `${((o = this.actor) == null ? void 0 : o.name) ?? "Actor"} — ${s}`;
  }
  /**
   * Window actions (header/menu). Centralize here and dedupe by action key.
   * @override
   */
  _getHeaderControls() {
    var n, o;
    let t = ((n = super._getHeaderControls) == null ? void 0 : n.call(this)) ?? [];
    const i = ((o = this.document) == null ? void 0 : o.isToken) ?? !1, s = /* @__PURE__ */ new Set();
    i ? (s.add("prototypeToken"), s.add("configurePrototypeToken")) : (s.add("token"), s.add("configureToken")), t = t.filter((l) => {
      const c = (l == null ? void 0 : l.action) ?? "", u = String((l == null ? void 0 : l.label) ?? "");
      return !(s.has(c) || i && u.includes("Prototype") || !i && u === "Token");
    });
    const r = /* @__PURE__ */ new Set();
    return t = t.filter((l) => {
      const c = l == null ? void 0 : l.action, u = c ? `a:${c}` : `il:${(l == null ? void 0 : l.icon) ?? ""}|${(l == null ? void 0 : l.label) ?? ""}`;
      return r.has(u) ? !1 : (r.add(u), !0);
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
    const s = ((l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, ".csb-tab-link[data-tab]")) ?? ((u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, ".csb-tab-link[data-tab]"));
    if (!s) return;
    const r = s.dataset.tab, n = s.closest(".csb-tabs");
    if (!n || !r) return;
    const o = n.dataset.group || "default";
    B(this, Qi).set(o, r), M(this, Qt, $a).call(this, n, r);
  }
  _onClickAccordion(t, i) {
    var u, d, p;
    const s = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((p = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : p.call(d, ".csb-accordion__trigger[data-section]"));
    if (!s) return;
    const r = s.dataset.section, n = s.closest(".csb-accordion");
    if (!n || !r) return;
    const o = n.dataset.group || "default", c = (B(this, Wt).has(o) ? B(this, Wt).get(o) : n.dataset.default || null) === r ? null : r;
    B(this, Wt).set(o, c), M(this, Qt, xa).call(this, n, c);
  }
  /**
   * Universal roll action: data-action="roll" + data-roll='{"intent":"skill","key":"gunnery"}'
   */
  async _onRollAction(t, i) {
    var c, u, d, p, m, f, y, h, g;
    (c = t == null ? void 0 : t.preventDefault) == null || c.call(t);
    const s = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, "[data-roll]")) ?? ((p = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : p.call(d, "[data-roll]")), r = (m = s == null ? void 0 : s.dataset) == null ? void 0 : m.roll;
    if (!r) return;
    let n;
    try {
      n = JSON.parse(r);
    } catch (S) {
      console.warn("MWD | Invalid data-roll JSON:", r, S);
      return;
    }
    const o = !!(t != null && t.shiftKey), l = ((f = game.mwd) == null ? void 0 : f.roll) ?? ((h = (y = game.system) == null ? void 0 : y.mwd) == null ? void 0 : h.roll);
    if (!(l != null && l.execute)) {
      (g = ui.notifications) == null || g.error("MWD roll system not initialized (game.mwd.roll.execute missing).");
      return;
    }
    try {
      return await l.execute({ actor: this.actor, payload: n, event: t, quick: o });
    } catch (S) {
      return console.error("MWD | Failed to execute roll action", S), Ps(S, "Unable to execute that roll."), null;
    }
  }
  async _onEditImage(t, i) {
    var n, o, l;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable || !this.editing) return;
    const s = foundry.applications.apps.FilePicker.implementation;
    new s({
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
    var r, n, o;
    (r = super._onRender) == null || r.call(this, t, i);
    const s = this._getRootElement();
    if (s) {
      for (const l of s.querySelectorAll(".csb-tabs")) {
        const c = l.dataset.group || "default", u = B(this, Qi).get(c), d = l.dataset.default || ((n = l.querySelector(".csb-tab-link[data-tab]")) == null ? void 0 : n.dataset.tab), p = u || d;
        p && M(this, Qt, $a).call(this, l, p);
      }
      for (const l of s.querySelectorAll(".csb-accordion")) {
        const c = l.dataset.group || "default", u = B(this, Wt).has(c) ? B(this, Wt).get(c) : l.dataset.default || null;
        M(this, Qt, xa).call(this, l, u);
      }
      s.querySelectorAll(".csb-tabs").length && !s.querySelector(".csb-tab-panel.is-active") && console.warn(`${oe} CSB tabs present but no active tab applied. Check element root resolution and CSS .is-active selectors.`, {
        sheet: (o = this.constructor) == null ? void 0 : o.name
      });
    }
  }
  async _commitEditsToActor() {
    const t = this.element;
    if (!t) return;
    const i = t.querySelectorAll('input[name][data-edit-field="staged"], select[name][data-edit-field="staged"], textarea[name][data-edit-field="staged"]');
    if (!i.length) return;
    const s = {};
    for (const r of i) {
      const n = r.getAttribute("name");
      if (!n || r.disabled) continue;
      let o;
      if (r instanceof HTMLInputElement)
        if (r.type === "checkbox") o = r.checked;
        else if (r.type === "radio") {
          if (!r.checked) continue;
          o = r.value;
        } else r.type === "number" ? o = Number(r.value) : o = r.value;
      else
        o = r.value;
      typeof o == "number" && Number.isNaN(o) && (o = 0), o = this._clampByPath(n, o), foundry.utils.getProperty(this.actor, n) !== o && (s[n] = o);
    }
    if (Object.keys(s).length)
      try {
        await (this.getPersistentActor() ?? this.actor).update(s);
      } catch (r) {
        console.warn("MWD | Commit failed (permissions or validation):", r);
      }
  }
  /** @override */
  async _prepareContext(t) {
    var n, o, l, c, u, d, p, m, f, y, h;
    console.log(`${oe}BaseActorSheetV2._prepareContext:start`, {
      actorName: (n = this.actor) == null ? void 0 : n.name,
      actorType: (o = this.actor) == null ? void 0 : o.type
    });
    const i = await super._prepareContext(t), s = foundry.utils.deepClone((i == null ? void 0 : i.options) ?? {});
    s.classes = Array.from(((l = this.options) == null ? void 0 : l.classes) ?? []), s.cssClass = s.classes.join(" ");
    const r = foundry.utils.mergeObject(
      i,
      {
        actor: this.actor,
        system: (c = this.actor) == null ? void 0 : c.system,
        editable: this.isEditable,
        owner: ((u = this.document) == null ? void 0 : u.isOwner) ?? !1,
        limited: !(((d = this.document) == null ? void 0 : d.isOwner) ?? !1),
        editing: B(this, Ke),
        // Template contract
        data: this.actor,
        // legacy alias
        options: s,
        // safe, template-only
        cssClass: s.cssClass
      },
      { inplace: !1 }
    );
    return r.options.owner = r.owner, r.options.limited = r.limited, r.options.editable = r.editable, r.options.editing = r.editing, r.options.viewMode = !r.editing, r.skillsDisplay = On(((p = this.actor) == null ? void 0 : p.system) ?? {}), r.items ?? (r.items = {}), (m = this.actor) != null && m.items && typeof (J == null ? void 0 : J.classifyInto) == "function" && (J.classifyInto(r.items, this.actor.items), r.items.weapon = [
      ...r.items.mechWeapon ?? [],
      ...r.items.personalWeapon ?? []
    ]), r.npcItems = {
      traits: r.items.quality ?? [],
      weapons: r.items.weapon ?? [],
      assetModules: r.items.assetModule ?? [],
      inventory: r.items.gear ?? []
    }, console.log(`${oe}BaseActorSheetV2._prepareContext:done`, {
      actorType: (f = this.actor) == null ? void 0 : f.type,
      cssClass: r.cssClass,
      itemCount: ((h = (y = this.actor) == null ? void 0 : y.items) == null ? void 0 : h.size) ?? 0,
      editing: B(this, Ke)
    }), r;
  }
  /** Clamp certain actor system paths to valid ranges */
  _clampByPath(t, i) {
    return typeof i != "number" ? i : ((/^system\.skills\.[^.]+\.rating$/.test(t) || /^system\.attributes\.[^.]+\.value$/.test(t)) && (i = Math.trunc(i)), /^system\.skills\.[^.]+\.rating$/.test(t) ? Math.clamp(i, 0, 12) : /^system\.attributes\.[^.]+\.value$/.test(t) ? Math.clamp(i, 0, 10) : i);
  }
  /** Action handler: Condition Monitor set */
  async _onMonitorSet(t, i) {
    var m, f;
    if (t.preventDefault(), !this.isEditable) return;
    const s = String(((m = i == null ? void 0 : i.dataset) == null ? void 0 : m.monitor) ?? "").trim(), r = Number((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.value);
    if (!s || !Number.isFinite(r)) return;
    const n = s === "burn" ? "system.burn.value" : `system.monitors.${s}.value`, o = Number(foundry.utils.getProperty(this.actor, n) ?? 0), l = s === "armor" ? r : o === r ? 0 : r, c = this.getPersistentActor() ?? this.actor;
    if (typeof (c == null ? void 0 : c.setMonitorValue) == "function")
      return c.setMonitorValue(s, l, { source: "sheet" });
    const u = `system.monitors.${s}`, d = Number(foundry.utils.getProperty(c, `${u}.max`)) || 0, p = Math.min(Math.max(0, l), Math.max(0, d));
    return c.update({ [`${u}.value`]: p });
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
Ke = new WeakMap(), Qi = new WeakMap(), Wt = new WeakMap(), Qt = new WeakSet(), /**
 * Apply active-state classes within a single .csb-tabs root.
 * Idempotent: safe to call every render.
 */
$a = function(t, i) {
  t.querySelectorAll(".csb-tab-link").forEach((s) => {
    s.classList.toggle("is-active", s.dataset.tab === i);
  }), t.querySelectorAll(".csb-tab-panel").forEach((s) => {
    s.classList.toggle("is-active", s.dataset.tab === i);
  });
}, xa = function(t, i) {
  t.dataset.activeSection = i ?? "", t.querySelectorAll(".csb-accordion__section").forEach((s) => {
    const r = s.dataset.section === i;
    s.classList.toggle("is-active", r);
  }), t.querySelectorAll(".csb-accordion__trigger").forEach((s) => {
    const r = s.dataset.section === i;
    s.classList.toggle("is-active", r), s.setAttribute("aria-expanded", r ? "true" : "false");
  }), t.querySelectorAll(".csb-accordion__panel").forEach((s) => {
    const r = s.closest(".csb-accordion__section"), n = (r == null ? void 0 : r.dataset.section) === i;
    s.classList.toggle("is-active", n);
  });
}, // ---- Hard minimum size (resize clamp) ----
R(xe, "MIN_WIDTH", 800), R(xe, "MAX_WIDTH", 950), R(xe, "MIN_HEIGHT", 600), R(xe, "MAX_HEIGHT", 1400), // group -> sectionId|null
/** @override */
R(xe, "DEFAULT_OPTIONS", foundry.utils.mergeObject(mi(xe, xe, "DEFAULT_OPTIONS"), {
  classes: ["sheet", "actor", v, "appv2", "mwd-sheet", "mwd-character-sheet"],
  position: { width: 760, height: 760 },
  window: { resizable: !0, minimizable: !0 },
  actions: {
    toggleViewMode: xe.prototype._onToggleViewMode,
    tab: xe.prototype._onClickTab,
    accordion: xe.prototype._onClickAccordion,
    roll: xe.prototype._onRollAction,
    monitorSet: xe.prototype._onMonitorSet,
    editImage: xe.prototype._onEditImage
  }
}, { inplace: !1 }));
let Di = xe;
var ki, Jt, bo, So, Ao;
const Hi = class Hi {
  static async get(e) {
    if (B(this, ki).has(e)) return B(this, ki).get(e);
    const t = M(this, Jt, bo).call(this, e);
    return B(this, ki).set(e, t), t;
  }
};
ki = new WeakMap(), Jt = new WeakSet(), bo = async function(e) {
  const t = `systems/${v}/templates/v2/layouts/${e}.layout.json`;
  let i;
  try {
    const s = await fetch(t);
    if (!s.ok) throw new Error(`HTTP ${s.status} for ${t}`);
    i = await s.json();
  } catch (s) {
    console.error(`${oe}LayoutRegistry.get FAILED`, { layoutId: e, url: t, e: s }), i = { id: e, version: 0, root: { type: "stack", children: [] } };
  }
  return M(this, Jt, So).call(this, i);
}, So = function(e) {
  const t = (i) => {
    var s;
    return !i || typeof i != "object" || (i.template ?? (i.template = M(s = Hi, Jt, Ao).call(s, i)), i.children = Array.isArray(i.children) ? i.children : [], Array.isArray(i.classes) || (typeof i.classes == "string" ? i.classes = i.classes.split(/\s+/).filter(Boolean) : i.classes = []), i.children = i.children.map(t), i.type === "tabs" && Array.isArray(i.tabs) && (i.tabs = i.tabs.map((r) => ({
      ...r,
      children: (Array.isArray(r.children) ? r.children : []).map(t)
    }))), i.type === "accordion" && Array.isArray(i.sections) ? i.sections = i.sections.map((r) => ({
      ...r,
      children: (Array.isArray(r.children) ? r.children : []).map(t)
    })) : i.type === "accordion" && (i.sections = [])), i;
  };
  return {
    ...e,
    root: t(e.root ?? { type: "stack", children: [] })
  };
}, Ao = function(e) {
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
}, ye(Hi, Jt), ye(Hi, ki, /* @__PURE__ */ new Map());
let Ns = Hi;
function Be(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Ed(a) {
  return String(a ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function ls(a, e = 180) {
  const t = Ed(a);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function Bt(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function cs(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim(),
    emphasis: e.emphasis ?? ""
  }));
}
function us(a = []) {
  return Bt(a).map((e) => ({ label: e }));
}
function ds(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
function Cd(a = {}, e = ["close", "near", "far", "extreme"]) {
  return e.map((t) => {
    const i = Be(a == null ? void 0 : a[t], 0);
    return `${t.charAt(0).toUpperCase() + t.slice(1)} ${i}`;
  }).join(" | ");
}
function Pd(a = "") {
  const e = String(a ?? "").trim().toLowerCase();
  return e ? e.charAt(0).toUpperCase() + e.slice(1) : "";
}
function oa(a) {
  return String(a ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function Qr({ title: a, label: e, options: t = [], confirmLabel: i = "Select" } = {}) {
  const s = Array.isArray(t) ? t.filter((n) => n == null ? void 0 : n.value) : [];
  if (!s.length) return "";
  if (s.length === 1) return String(s[0].value ?? "").trim();
  const r = `<form class="mwd-quick-select"><div class="mwd-field"><label>${oa(e)}</label><select name="selection">${s.map((n) => `<option value="${oa(n.value)}">${oa(n.label ?? n.value)}</option>`).join("")}</select></div></form>`;
  return await Dialog.prompt({
    title: a,
    content: r,
    label: i,
    callback: (n) => {
      var o;
      return String(n.find('select[name="selection"]').val() ?? ((o = s[0]) == null ? void 0 : o.value) ?? "").trim();
    }
  });
}
var Ge, Ut, ii, rt, W, wo, Fa, ws, To, ko, Me, ti, Fi, zi;
const de = class de extends Di {
  constructor() {
    super(...arguments);
    ye(this, W);
    ye(this, Ge, null);
    ye(this, Ut, null);
    ye(this, ii, null);
    ye(this, rt, /* @__PURE__ */ new Set());
  }
  /** @override */
  async _prepareContext(t) {
    var D, N, Y, z, ge, _e, Le, Ue, At, wt, Tt, kt, vt, Mt, Et, Ct, Pt, Nt, it, Rt, Dt, It, Ot, _t, Lt, $t;
    const i = await super._prepareContext(t), s = ((D = this.getSheetTokenDocument) == null ? void 0 : D.call(this)) ?? null;
    i._mwdThemeClass = game.system.mwd.styles.selectCssClass(), i.layout = await Ns.get("character");
    const r = ((Y = (N = this.actor).getEdgeCap) == null ? void 0 : Y.call(N)) ?? Number(((_e = (ge = (z = this.actor.system) == null ? void 0 : z.attributes) == null ? void 0 : ge.edge) == null ? void 0 : _e.value) ?? 0), n = !!this.isEditable, o = { physical: "Physical", mental: "Mental", social: "Social" }, l = {
      grit: "Grit",
      insight: "Insight",
      legend: "Legend",
      chaos: "Chaos",
      rumor: "Rumor",
      credibility: "Credibility"
    }, c = this.actor.getEdgePoolSummary ? this.actor.getEdgePoolSummary({ groups: Ga }) : { groups: [] };
    i.edgeConsole = {
      cap: r,
      editable: n,
      capPips: Array.from({ length: Math.max(0, r) }, (A, C) => C + 1),
      groups: (c.groups ?? []).map((A) => ({
        id: A.id,
        label: o[A.id] ?? A.id,
        pools: (A.pools ?? []).map((C) => {
          const H = Number(C.effectiveValue ?? 0), se = Number(C.effectiveMax ?? 0), ae = Array.from({ length: Math.max(0, se) }, (Se, ve) => {
            const U = ve + 1;
            return { n: U, filled: U <= H };
          }), me = String(C.key ?? "").split(".").pop();
          return {
            key: C.key,
            label: l[me] ?? me ?? C.key,
            value: H,
            max: se,
            rating: Number(C.rating ?? 0),
            ratingBonus: Number(C.ratingBonus ?? 0),
            effectiveRating: Number(C.effectiveRating ?? C.rating ?? 0),
            isCapped: Number(C.effectiveRating ?? C.rating ?? 0) > Number(C.cap ?? r),
            pips: ae,
            // Paths for edit-mode inputs
            pathRating: `system.counters.edgePools.${C.key}.rating`,
            pathValue: `system.counters.edgePools.${C.key}.value`,
            // Keep the roll payload if you want pool-name click to route through BaseActorSheetV2 roll handler
            roll: JSON.stringify({ intent: "edge", pool: C.key })
          };
        })
      }))
    };
    const u = ["grit", "insight", "legend", "chaos", "rumor", "credibility"], d = /* @__PURE__ */ new Map();
    for (const A of i.edgeConsole.groups ?? [])
      for (const C of A.pools ?? []) {
        const H = String(C.key ?? "").split(".").pop();
        H && d.set(H, C), C.domain = A.id;
      }
    i.edgeConsole.poolsOrdered = u.map((A) => d.get(A)).filter(Boolean);
    const p = this.actor.system ?? {}, m = p.monitors ?? {}, f = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue", label: "Fatigue", kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor", label: "Armor", kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ], y = (A, C, H = 0) => {
      const se = foundry.utils.getProperty(A, C), ae = Number(se);
      return Number.isFinite(ae) ? ae : H;
    };
    i.conditionMonitors = f.map((A) => {
      const C = (m == null ? void 0 : m[A.id]) ?? {}, H = Math.max(0, y(C, "max", 0)), se = Math.min(Math.max(0, y(C, "value", 0)), H);
      return {
        id: A.id,
        label: A.label,
        kind: A.kind,
        editable: !!this.isEditable,
        value: se,
        max: H,
        segments: Array.from({ length: H }, (ae, me) => {
          const Se = me + 1;
          return { value: Se, filled: Se <= se };
        }),
        status: A.status ? { label: A.status.label, value: y(C, A.status.path, 0) } : null
      };
    });
    const h = Number(((Ue = (Le = this.actor.system) == null ? void 0 : Le.burn) == null ? void 0 : Ue.value) ?? 0), g = 10, S = 6, T = Math.min(h, g);
    i.burnOverflow = Math.max(0, h - g), i.burnPenalty = Math.floor(h / 2), i.burnPips = Array.from({ length: g }, (A, C) => {
      const H = C + 1;
      return {
        pipValue: H,
        filled: H <= T,
        threshold: H === S
      };
    }), i.combat = {
      roll: {
        initiative: JSON.stringify({ intent: "initiative" }),
        overload: JSON.stringify({ intent: "overload" })
      }
    }, i.burn = {
      value: h,
      penalty: Math.floor(h / 2),
      overflow: Math.max(0, h - 10),
      canOverloadCheck: h >= 6,
      overloaded: !!((wt = (At = this.actor.system) == null ? void 0 : At.burn) != null && wt.overloaded)
    };
    const k = ne.getSnapshot(this.actor, { token: s });
    i.combatDashboard = {
      targeting: k.targeting,
      rollImpact: k.rollImpact,
      states: k.states,
      effects: k.effects,
      activation: k.activation,
      inactiveReason: k.inactiveReason
    };
    const P = ne.buildActionModel(this.actor, k), I = new Set((P.menus ?? []).map((A) => A.id));
    B(this, Ge) && !I.has(B(this, Ge)) && Re(this, Ge, null), i.combatActions = {
      ...P,
      menus: (P.menus ?? []).map((A) => ({
        ...A,
        isOpen: A.id === B(this, Ge)
      }))
    };
    const O = ((kt = (Tt = this.actor).getPersonalCombatLoadout) == null ? void 0 : kt.call(Tt)) ?? null;
    i.personalInventory = {
      warnings: [...(O == null ? void 0 : O.warnings) ?? []],
      weapons: ((O == null ? void 0 : O.weapons) ?? []).map((A) => {
        var ve, U, _, Q, Ce, pe, Ne;
        const C = M(this, W, zi).call(this, "weapons", A.id), H = String((A == null ? void 0 : A.category) ?? "").trim().toLowerCase() !== "melee", se = !!((ve = A == null ? void 0 : A.sourceState) != null && ve.isTracked), ae = H && (A != null && A.payloadLabel) ? `Loaded ${A.payloadLabel}` : "", me = H && se ? `${Be((U = A == null ? void 0 : A.sourceState) == null ? void 0 : U.current, 0)}/${Be((_ = A == null ? void 0 : A.sourceState) == null ? void 0 : _.max, 0)}` : "", Se = ds([
          { label: "Skill", value: ((Q = A.skillDef) == null ? void 0 : Q.label) ?? A.skill ?? "" },
          { label: "Category", value: A.category ?? "" },
          { label: "Max Range", value: Pd(((Ce = A.range) == null ? void 0 : Ce.max) ?? A.defaultRangeBand ?? "") },
          { label: "Attack Rating", value: Cd(A.attackRatingBand) },
          { label: "Payload", value: H ? se ? `${me} tracked` : A.payloadLabel || "Unloaded" : "" },
          { label: "Traits", value: Bt(A.traits ?? []).join(", ") }
        ]);
        return {
          id: A.id,
          accordionId: C,
          isExpanded: B(this, rt).has(C),
          name: A.name,
          img: A.img,
          subtitle: ((pe = A.skillDef) == null ? void 0 : pe.label) ?? A.category ?? "",
          summaryStats: cs([
            { label: "DV", value: Be(A.damage, 0), emphasis: "strong" },
            { label: "AP", value: Be(A.ap, 0) },
            { label: "Type", value: A.damageTypeLabel ?? A.damageType ?? "" },
            { label: "Payload", value: H ? se ? me : A.payloadLabel || "Unloaded" : "" }
          ]),
          detailTags: us([
            A.equipped ? "Equipped" : "",
            A.isPrimary ? "Primary" : "",
            ae,
            ...Bt(A.traits ?? [])
          ]),
          detailRows: Se,
          detailText: ls(A.notes),
          equipped: !!A.equipped,
          isPrimary: !!A.isPrimary,
          attackRoll: JSON.stringify({
            intent: "attack",
            weaponId: A.id,
            payloadId: ((Ne = A == null ? void 0 : A.payloadState) == null ? void 0 : Ne.activePayloadId) ?? "",
            edge: { pool: "physical.grit", allowed: ["pre", "post"] },
            tags: ["combat", "attack"]
          })
        };
      }),
      armor: ((O == null ? void 0 : O.armor) ?? []).map((A) => {
        var Se, ve, U, _, Q, Ce, pe, Ne, es, fr, hr, gr, yr, br;
        const C = ((Se = O == null ? void 0 : O.activeArmor) == null ? void 0 : Se.id) === A.id ? O.activeArmor : null, H = M(this, W, zi).call(this, "armor", A.id), se = Be(((U = (ve = C == null ? void 0 : C.traitState) == null ? void 0 : ve.reinforced) == null ? void 0 : U.max) ?? ((Q = (_ = A == null ? void 0 : A.traitState) == null ? void 0 : _.reinforced) == null ? void 0 : Q.max), 0), ae = se > 0 ? `${Be(((pe = (Ce = C == null ? void 0 : C.traitState) == null ? void 0 : Ce.reinforced) == null ? void 0 : pe.current) ?? ((es = (Ne = A == null ? void 0 : A.traitState) == null ? void 0 : Ne.reinforced) == null ? void 0 : es.current), 0)}/${se}` : "", me = [
          Object.entries((C == null ? void 0 : C.mitigationByType) ?? (C == null ? void 0 : C.typedMitigation) ?? A.mitigationByType ?? {}).filter(([, qs]) => Number(qs) > 0).map(([qs, Lo]) => `${qs} +${Lo}`).join(", "),
          ae ? `Reinforced ${ae}` : ""
        ].filter(Boolean).join(" | ");
        return {
          id: A.id,
          accordionId: H,
          isExpanded: B(this, rt).has(H),
          name: A.name,
          img: A.img,
          subtitle: (fr = A.tags) != null && fr.length ? A.tags.join(", ") : "Armor",
          summaryStats: cs([
            { label: "Rating", value: Be((C == null ? void 0 : C.ratingCurrent) ?? A.rating, 0), emphasis: "strong" },
            { label: "Res", value: Be((C == null ? void 0 : C.baseMitigation) ?? (C == null ? void 0 : C.baseResistance), 0) },
            { label: "Def", value: Be(A.defenseBonus, 0) },
            { label: "Dur", value: `${Be(((hr = C == null ? void 0 : C.durability) == null ? void 0 : hr.current) ?? ((gr = A.durability) == null ? void 0 : gr.current), 0)}/${Be(((yr = C == null ? void 0 : C.durability) == null ? void 0 : yr.max) ?? ((br = A.durability) == null ? void 0 : br.max), 0)}` }
          ]),
          detailTags: us([
            A.equipped ? "Equipped" : "",
            A.isPrimary ? "Primary" : "",
            ae ? `Reinforced ${ae}` : "",
            ...Bt(A.traits ?? [])
          ]),
          detailRows: ds([
            { label: "Mitigation", value: me },
            { label: "Defense Bonus", value: Be(A.defenseBonus, 0) },
            { label: "Traits", value: Bt(A.traits ?? []).join(", ") },
            { label: "Tags", value: Bt(A.tags ?? []).join(", ") }
          ]),
          detailText: ls(A.notes),
          equipped: !!A.equipped,
          isPrimary: !!A.isPrimary
        };
      }),
      gear: (((vt = i.items) == null ? void 0 : vt.gear) ?? []).map((A) => {
        var ae, me, Se, ve, U, _, Q, Ce, pe, Ne;
        const C = M(this, W, zi).call(this, "gear", A.id), H = Be(((ae = A.system) == null ? void 0 : ae.quantity) ?? 1, 1) || 1, se = Bt(((me = A.system) == null ? void 0 : me.tags) ?? ((Se = A.system) == null ? void 0 : Se.traits) ?? []);
        return {
          id: A.id,
          accordionId: C,
          isExpanded: B(this, rt).has(C),
          name: A.name,
          img: A.img,
          subtitle: ((ve = A.system) == null ? void 0 : ve.category) ?? A.type ?? "Gear",
          summaryStats: cs([
            { label: "Qty", value: H, emphasis: "strong" },
            { label: "State", value: (U = A.system) != null && U.equipped ? "Readied" : "" }
          ]),
          detailTags: us([
            (_ = A.system) != null && _.equipped ? "Readied" : "",
            ...se
          ]),
          detailRows: ds([
            { label: "Quantity", value: H },
            { label: "Source", value: ((Q = A.system) == null ? void 0 : Q.sourceReference) ?? "" },
            { label: "Tags", value: se.join(", ") }
          ]),
          detailText: ls(((Ce = A.system) == null ? void 0 : Ce.notes) ?? ((pe = A.system) == null ? void 0 : pe.description)),
          equipped: !!((Ne = A.system) != null && Ne.equipped)
        };
      })
    }, i.bio = {
      faction: ((Mt = p.biography) == null ? void 0 : Mt.faction) ?? "",
      age: ((Et = p.biography) == null ? void 0 : Et.age) ?? "",
      rank: ((Ct = p.biography) == null ? void 0 : Ct.rank) ?? "",
      height: ((Pt = p.biography) == null ? void 0 : Pt.height) ?? "",
      weight: ((Nt = p.biography) == null ? void 0 : Nt.weight) ?? "",
      xpTotal: ((Rt = (it = p.counters) == null ? void 0 : it.xp) == null ? void 0 : Rt.total) ?? 0,
      xpSpent: ((It = (Dt = p.counters) == null ? void 0 : Dt.xp) == null ? void 0 : It.value) ?? 0,
      experienceLevel: ((Ot = p.biography) == null ? void 0 : Ot.experienceLevel) ?? "green",
      enrichedHistory: await foundry.applications.ux.TextEditor.implementation.enrichHTML(
        ((_t = p.biography) == null ? void 0 : _t.history) ?? "",
        { async: !0, secrets: this.actor.isOwner, relativeTo: this.actor }
      )
    };
    const x = Vt(this.actor);
    i.skillsDisplay = On(((Lt = this.actor) == null ? void 0 : Lt.system) ?? {}, {
      bonusBySkill: x.bonusBySkill
    }), i.lifeModules = x.slotStates.map((A) => {
      const C = A.state;
      return {
        moduleType: A.moduleType,
        label: A.label,
        hasCatalogEntries: A.availableEntries.length > 0,
        emptyState: A.availableEntries.length > 0 ? `Add ${A.label}` : `No ${A.label} catalog entries configured`,
        item: C ? {
          id: C.itemId,
          name: C.label,
          img: C.item.img,
          bonusLabels: [...C.selectedChoiceLabels ?? []],
          warningLabels: [...C.warningLabels ?? []],
          isActive: C.isActive,
          statusLabel: C.isActive ? "Active" : "Inactive",
          statusReason: C.inactiveReason
        } : null
      };
    });
    const j = ["positive", "negative", "narrative"], V = ["major", "minor"], K = [...(($t = i.items) == null ? void 0 : $t.quality) ?? []].sort((A, C) => {
      const H = Je(A.system ?? {}), se = Je(C.system ?? {}), ae = j.indexOf(H.category) - j.indexOf(se.category);
      if (ae !== 0) return ae;
      const me = V.indexOf(H.tier) - V.indexOf(se.tier);
      return me !== 0 ? me : String(A.name ?? "").localeCompare(String(C.name ?? ""));
    });
    return i.qualityGroups = j.map((A) => ({
      id: A,
      label: fs(A),
      records: K.filter((C) => Je(C.system ?? {}).category === A).map((C) => {
        var ae, me, Se, ve;
        const H = Je(C.system ?? {}), se = M(this, W, zi).call(this, "quality", C.id);
        return {
          id: C.id,
          accordionId: se,
          isExpanded: B(this, rt).has(se),
          name: C.name,
          img: C.img,
          subtitle: `${hs(H.tier)} ${fs(H.category)}`,
          summaryStats: cs([
            { label: "Tier", value: hs(H.tier), emphasis: "strong" },
            { label: "Activation", value: H.activation || "passive" },
            { label: "Effects", value: String(((ae = H.effects) == null ? void 0 : ae.length) ?? 0) }
          ]),
          detailTags: us([
            H.inactive ? "Inactive" : "",
            ...H.tags ?? []
          ]),
          detailRows: ds([
            { label: "Category", value: fs(H.category) },
            { label: "Tier", value: hs(H.tier) },
            { label: "Activation", value: H.activation || "passive" },
            { label: "Prerequisites", value: String(((me = H.prerequisites) == null ? void 0 : me.length) ?? 0) },
            { label: "Effects", value: String(((Se = H.effects) == null ? void 0 : Se.length) ?? 0) },
            { label: "Tags", value: Bt(H.tags ?? []).join(", ") }
          ]),
          detailText: ls((ve = C.system) == null ? void 0 : ve.description)
        };
      })
    })), i;
  }
  _onRender(t, i) {
    super._onRender(t, i), M(this, W, wo).call(this), M(this, W, ko).call(this);
  }
  async close(t = {}) {
    return M(this, W, Fa).call(this), super.close(t);
  }
  requestCombatDashboardRefresh() {
    M(this, W, Me).call(this, { force: !0 });
  }
  async _onEdgeSet(t, i) {
    var c, u, d;
    if (t.preventDefault(), t.stopPropagation(), !this.isEditable) return;
    const s = ((c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-edge-pool][data-edge-value]")) ?? ((d = (u = t == null ? void 0 : t.target) == null ? void 0 : u.closest) == null ? void 0 : d.call(u, "[data-edge-pool][data-edge-value]"));
    if (!s) return;
    const r = String(s.dataset.edgePool ?? "").trim(), n = Number(s.dataset.edgeValue ?? NaN);
    if (!r || !Number.isFinite(n)) return;
    const o = this.actor.getEdgePool(r);
    if (!(o != null && o.hasPools)) return;
    let l = n;
    return n === o.effectiveValue && (l = n - 1), (t.button === 2 || t.type === "contextmenu") && (l = 0), t.altKey && (l = 0), t.shiftKey && (l = o.effectiveMax), this.actor.setEdgePoolValue(r, l);
  }
  async _onToggleCombatMenu(t, i) {
    var r, n, o, l, c, u, d;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const s = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.combatMenu) ?? ((d = (u = (c = (l = t == null ? void 0 : t.target) == null ? void 0 : l.closest) == null ? void 0 : c.call(l, "[data-combat-menu]")) == null ? void 0 : u.dataset) == null ? void 0 : d.combatMenu) ?? ""
    ).trim();
    s && (Re(this, Ge, B(this, Ge) === s ? null : s), M(this, W, Me).call(this, !1));
  }
  async _onToggleStatuses(t) {
    var r, n, o, l, c, u, d, p;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t), !this.isEditable) return;
    const i = this.getPersistentActor() ?? this.actor, s = ((o = this.getSheetTokenDocument) == null ? void 0 : o.call(this)) ?? ((c = ne.getSnapshot(i, { token: ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? null })) == null ? void 0 : c.tokenDocument) ?? ((d = ne.getSnapshot(this.actor, { token: ((u = this.getSheetTokenDocument) == null ? void 0 : u.call(this)) ?? null })) == null ? void 0 : d.tokenDocument) ?? null;
    if (!s) {
      (p = ui.notifications) == null || p.warn("Statuses require a token for this actor on the current scene.");
      return;
    }
    return eu({
      actor: i,
      token: s
    });
  }
  async _onCombatSpend(t, i) {
    var c, u, d, p, m, f, y, h, g, S;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const s = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.resource) ?? "").trim(), r = Math.max(0, Number(((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.cost) ?? 0)), n = String(((m = i == null ? void 0 : i.dataset) == null ? void 0 : m.combatAction) ?? "").trim(), o = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.combatLabel) ?? "").trim(), l = String(((y = i == null ? void 0 : i.dataset) == null ? void 0 : y.combatCostLabel) ?? "").trim();
    if (!(!s || !r || !n))
      try {
        const T = this.getPersistentActor() ?? this.actor, k = await ne.spendResource(T, {
          token: ((h = this.getSheetTokenDocument) == null ? void 0 : h.call(this)) ?? ne.getCurrentSceneTokenDocument(T) ?? ne.getCurrentSceneTokenDocument(this.actor),
          resource: s,
          cost: r,
          actionId: n,
          actionLabel: o,
          actionCostLabel: l
        });
        if (!(k != null && k.ok)) {
          (g = ui.notifications) == null || g.warn((k == null ? void 0 : k.reason) ?? "Unable to spend action.");
          return;
        }
        M(this, W, ti).call(this, { rerender: !1 }), M(this, W, Me).call(this, { force: !0 });
      } catch (T) {
        console.error("MWD | Failed to spend combat action", T), (S = ui.notifications) == null || S.error("Unable to spend action.");
      }
  }
  async _onCombatReduceBurn(t) {
    var i, s, r, n, o;
    if ((i = t == null ? void 0 : t.preventDefault) == null || i.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !!this.isEditable)
      try {
        const l = this.getPersistentActor() ?? this.actor, c = await ne.reduceBurn(l, {
          token: ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? ne.getCurrentSceneTokenDocument(l) ?? ne.getCurrentSceneTokenDocument(this.actor)
        });
        if (!(c != null && c.ok)) {
          (n = ui.notifications) == null || n.warn((c == null ? void 0 : c.reason) ?? "Unable to reduce Burn.");
          return;
        }
        M(this, W, ti).call(this, { rerender: !1 }), M(this, W, Me).call(this, { force: !0 });
      } catch (l) {
        console.error("MWD | Failed to reduce Burn", l), (o = ui.notifications) == null || o.error("Unable to reduce Burn.");
      }
  }
  async _onCombatOverloadCheck(t, i) {
    var n, o, l, c, u, d, p, m, f, y, h;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const s = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.roll) ?? ((p = (d = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : d.dataset) == null ? void 0 : p.roll);
    if (!s) return;
    let r;
    try {
      r = JSON.parse(s);
    } catch (g) {
      console.warn("MWD | Invalid overload payload", s, g);
      return;
    }
    try {
      const g = this.getPersistentActor() ?? this.actor, S = await ((y = (f = (m = game.mwd) == null ? void 0 : m.roll) == null ? void 0 : f.execute) == null ? void 0 : y.call(f, { actor: g, payload: r, event: t }));
      if (M(this, W, ti).call(this, { rerender: !1 }), !S) {
        M(this, W, Me).call(this, !1);
        return;
      }
      M(this, W, Me).call(this, { force: !0 });
    } catch (g) {
      console.error("MWD | Failed to launch overload check", g), (h = ui.notifications) == null || h.error("Unable to launch overload check.");
    }
  }
  async _onCombatAttack(t) {
    var c, u, d, p, m, f, y, h, g, S, T, k, P, I, O, x, j, V;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const i = this.getPersistentActor() ?? this.actor, s = ((d = this.getSheetTokenDocument) == null ? void 0 : d.call(this)) ?? ne.getCurrentSceneTokenDocument(i) ?? ne.getCurrentSceneTokenDocument(this.actor), r = ne.getSnapshot(i, { token: s });
    if (!r.hasCombatant) {
      (p = ui.notifications) == null || p.warn("No combatant on the current scene.");
      return;
    }
    if (!r.isCurrentTurn) {
      (m = ui.notifications) == null || m.warn("Only available during your activation.");
      return;
    }
    if (r.overloaded) {
      (f = ui.notifications) == null || f.warn("Overloaded actors can only recover Burn.");
      return;
    }
    const n = 3 + Math.floor((Math.max(0, Number(((g = (h = (y = i.system) == null ? void 0 : y.attributes) == null ? void 0 : h.reflexes) == null ? void 0 : g.value) ?? 0)) + Math.max(0, Number(((k = (T = (S = i.system) == null ? void 0 : S.attributes) == null ? void 0 : T.willpower) == null ? void 0 : k.value) ?? 0))) / 2);
    if (Math.max(0, n - Math.max(0, Number(((P = r.state) == null ? void 0 : P.saSpentThisActivation) ?? 0))) < 2) {
      (I = ui.notifications) == null || I.warn("Activation SA cap reached.");
      return;
    }
    const l = {
      intent: "attack",
      mode: "auto",
      fallback: "unarmed",
      edge: { pool: "physical.grit", allowed: ["pre", "post"] },
      tags: ["combat", "attack"]
    };
    try {
      const K = await ((j = (x = (O = game.mwd) == null ? void 0 : O.roll) == null ? void 0 : x.execute) == null ? void 0 : j.call(x, { actor: i, payload: l, event: t }));
      if (M(this, W, ti).call(this, { rerender: !1 }), !K) {
        M(this, W, Me).call(this, !1);
        return;
      }
      const D = await ne.spendResource(i, {
        token: s,
        resource: "sa",
        cost: 2,
        actionId: "attack",
        actionLabel: "Attack",
        actionCostLabel: "2 SA"
      });
      D != null && D.ok || (V = ui.notifications) == null || V.warn((D == null ? void 0 : D.reason) ?? "Unable to spend attack action."), M(this, W, Me).call(this, { force: !0 });
    } catch (K) {
      console.error("MWD | Failed to launch attack", K), Ps(K, "Unable to launch attack.");
    }
  }
  async _onAddSkillSpecialization(t, i) {
    var d, p, m, f;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (p = t == null ? void 0 : t.stopPropagation) == null || p.call(t), !this.isEditable || !this.editing) return;
    const s = String(((m = i == null ? void 0 : i.dataset) == null ? void 0 : m.skillKey) ?? "").trim();
    if (!s) return;
    const r = this.getPersistentActor() ?? this.actor, n = wa(r.system ?? {}, s), o = xs(r.system ?? {}, s), l = ri(s).filter((y) => !o.includes(y.key));
    if (l.length === 0) return;
    let c = ((f = l[0]) == null ? void 0 : f.key) ?? "";
    if (l.length > 1) {
      const y = `<form class="mwd-quick-select"><div class="mwd-field"><label>Specialization</label><select name="specialization">${l.map((h) => `<option value="${h.key}">${h.label}</option>`).join("")}</select></div></form>`;
      c = await Dialog.prompt({
        title: "Add Skill Specialization",
        content: y,
        label: "Add",
        callback: (h) => {
          var g;
          return h.find('select[name="specialization"]').val() ?? ((g = l[0]) == null ? void 0 : g.key) ?? "";
        }
      });
    }
    const u = Ms(
      n.concat([c])
    );
    await r.update({
      [`system.skills.${s}.specializations`]: u
    }), M(this, W, Me).call(this, { force: !0 });
  }
  async _onRemoveSkillSpecialization(t, i) {
    var l, c, u, d;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable || !this.editing) return;
    const s = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.skillKey) ?? "").trim(), r = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.specializationKey) ?? "").trim();
    if (!s || !r) return;
    const n = this.getPersistentActor() ?? this.actor, o = Ms(
      wa(n.system ?? {}, s).filter((p) => p !== r)
    );
    await n.update({
      [`system.skills.${s}.specializations`]: o
    }), M(this, W, Me).call(this, { force: !0 });
  }
  async _onCreateLifeModuleItem(t, i) {
    var d, p, m, f, y;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (p = t == null ? void 0 : t.stopPropagation) == null || p.call(t), !this.isEditable) return;
    const s = String(((m = i == null ? void 0 : i.dataset) == null ? void 0 : m.moduleType) ?? "").trim();
    if (!s) return;
    const r = this.getPersistentActor() ?? this.actor, n = tr(s);
    if (!n.length) {
      (f = ui.notifications) == null || f.warn(`No ${Ni(s)} life modules are configured in game settings.`);
      return;
    }
    const o = await Qr({
      title: `Choose ${Ni(s)} Life Module`,
      label: "Life Module",
      confirmLabel: "Create",
      options: n.map((h) => ({
        value: h.id,
        label: h.label
      }))
    });
    if (!o) return;
    const l = qt(o);
    if (!l) {
      (y = ui.notifications) == null || y.warn("That life module catalog entry no longer exists.");
      return;
    }
    const c = jn(l, {}), u = {};
    for (const h of c.filter((g) => g.hasMultipleChoices)) {
      const g = await Qr({
        title: `Choose Bonus for ${l.label}`,
        label: h.label,
        confirmLabel: "Apply",
        options: h.options.map((S) => ({
          value: S.value,
          label: S.label
        }))
      });
      if (!g) return;
      u[h.id] = g;
    }
    await r.createEmbeddedDocuments("Item", [{
      name: l.label,
      type: "lifeModule",
      system: Ki({
        moduleType: s,
        catalogId: l.id,
        selectedGrants: u
      })
    }]), M(this, W, Me).call(this, { force: !0 });
  }
  async _onCreateOwnedItem(t, i) {
    var l, c, u;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable) return;
    const s = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.itemType) ?? "").trim();
    if (!s) return;
    const r = this.getPersistentActor() ?? this.actor, n = r.items.filter((d) => d.type === s).length, o = s === "personalWeapon" ? "Personal Weapon" : s === "armor" ? "Armor" : s.charAt(0).toUpperCase() + s.slice(1);
    await r.createEmbeddedDocuments("Item", [{
      name: `${o} ${n + 1}`,
      type: s
    }]), M(this, W, Me).call(this, { force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var r, n, o;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const s = M(this, W, Fi).call(this, i, t);
    (o = s == null ? void 0 : s.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var n, o;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const s = M(this, W, Fi).call(this, i, t);
    if (!s) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [s.id]), M(this, W, Me).call(this, { force: !0 });
  }
  async _onToggleInventoryAccordion(t, i) {
    var r, n, o, l, c, u, d, p, m, f;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const s = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.accordionId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((f = (m = (p = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : p.call(d, "[data-accordion-id]")) == null ? void 0 : m.dataset) == null ? void 0 : f.accordionId) ?? ""
    ).trim();
    s && (B(this, rt).has(s) ? B(this, rt).delete(s) : B(this, rt).add(s), M(this, W, Me).call(this, !1));
  }
  async _onToggleOwnedItemEquipped(t, i) {
    var n, o, l, c;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const s = M(this, W, Fi).call(this, i, t);
    if (!s) return;
    const r = this.getPersistentActor() ?? this.actor;
    await ((c = r.setOwnedItemEquipped) == null ? void 0 : c.call(r, s.id, !((l = s.system) != null && l.equipped))), M(this, W, Me).call(this, { force: !0 });
  }
  async _onSetOwnedItemPrimary(t, i) {
    var n, o, l, c;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const s = M(this, W, Fi).call(this, i, t);
    if (!s) return;
    const r = this.getPersistentActor() ?? this.actor;
    await ((c = r.setOwnedItemPrimary) == null ? void 0 : c.call(r, s.id, !((l = s.system) != null && l.isPrimary))), M(this, W, Me).call(this, { force: !0 });
  }
  async _onAttackWeapon(t, i) {
    var n, o, l, c, u, d, p, m, f, y;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const s = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.roll) ?? ((p = (d = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : d.dataset) == null ? void 0 : p.roll);
    if (!s) return;
    let r;
    try {
      r = JSON.parse(s);
    } catch (h) {
      console.warn("MWD | Invalid attack payload", s, h);
      return;
    }
    try {
      const h = this.getPersistentActor() ?? this.actor;
      if (!await ((y = (f = (m = game.mwd) == null ? void 0 : m.roll) == null ? void 0 : f.execute) == null ? void 0 : y.call(f, { actor: h, payload: r, event: t }))) return;
      M(this, W, Me).call(this, { force: !0 });
    } catch (h) {
      console.error("MWD | Failed to launch weapon attack", h), Ps(h, "Unable to attack with that weapon.");
    }
  }
};
Ge = new WeakMap(), Ut = new WeakMap(), ii = new WeakMap(), rt = new WeakMap(), W = new WeakSet(), wo = function() {
  M(this, W, Fa).call(this), B(this, Ge) && (Re(this, Ut, (t) => {
    var r;
    const i = this._getRootElement();
    if (!i) return;
    const s = t.target;
    if (s instanceof Node && !((r = s.closest) != null && r.call(s, ".mwd-combat-menu"))) {
      if (!i.contains(s)) {
        M(this, W, ti).call(this);
        return;
      }
      M(this, W, ti).call(this);
    }
  }), document.addEventListener("click", B(this, Ut)));
}, Fa = function() {
  B(this, Ut) && (document.removeEventListener("click", B(this, Ut)), Re(this, Ut, null));
}, ws = function() {
  const t = this._getRootElement();
  return t ? t.querySelector(".mwd-scroll-area") ?? t.querySelector(".csb-tab-panels") : null;
}, To = function() {
  const t = M(this, W, ws).call(this);
  if (!(t instanceof HTMLElement)) {
    Re(this, ii, null);
    return;
  }
  Re(this, ii, {
    top: t.scrollTop,
    left: t.scrollLeft
  });
}, ko = function() {
  const t = B(this, ii);
  if (!t) return;
  const i = M(this, W, ws).call(this);
  i instanceof HTMLElement && (i.scrollTop = t.top, i.scrollLeft = t.left, requestAnimationFrame(() => {
    const s = M(this, W, ws).call(this);
    s instanceof HTMLElement && (s.scrollTop = t.top, s.scrollLeft = t.left);
  }), Re(this, ii, null));
}, Me = function(t = !1) {
  M(this, W, To).call(this), this.render(t);
}, ti = function({ rerender: t = !0 } = {}) {
  B(this, Ge) && (Re(this, Ge, null), t && M(this, W, Me).call(this, !1));
}, Fi = function(t, i) {
  var r, n, o, l, c, u, d, p;
  const s = String(
    ((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.itemId) ?? ((l = (o = (n = t == null ? void 0 : t.closest) == null ? void 0 : n.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((p = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : p.itemId) ?? ""
  ).trim();
  return s ? this.actor.items.get(s) ?? null : null;
}, zi = function(t, i) {
  return `${String(t ?? "").trim()}:${String(i ?? "").trim()}`;
}, R(de, "PARTS", {
  sheet: {
    get template() {
      return `${q}/v2/actor/character-sheet.hbs`;
    }
  }
}), R(de, "DEFAULT_OPTIONS", foundry.utils.mergeObject(mi(de, de, "DEFAULT_OPTIONS"), {
  classes: ["character-sheet", v, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
  window: { minWidth: 450, minHeight: 740, resizable: !0 },
  position: { width: 980, height: 900 },
  actions: {
    ...mi(de, de, "DEFAULT_OPTIONS").actions,
    edgeSet: de.prototype._onEdgeSet,
    toggleCombatMenu: de.prototype._onToggleCombatMenu,
    toggleStatuses: de.prototype._onToggleStatuses,
    combatSpend: de.prototype._onCombatSpend,
    combatReduceBurn: de.prototype._onCombatReduceBurn,
    combatOverloadCheck: de.prototype._onCombatOverloadCheck,
    combatAttack: de.prototype._onCombatAttack,
    createOwnedItem: de.prototype._onCreateOwnedItem,
    addSkillSpecialization: de.prototype._onAddSkillSpecialization,
    removeSkillSpecialization: de.prototype._onRemoveSkillSpecialization,
    createLifeModuleItem: de.prototype._onCreateLifeModuleItem,
    editOwnedItem: de.prototype._onEditOwnedItem,
    deleteOwnedItem: de.prototype._onDeleteOwnedItem,
    toggleInventoryAccordion: de.prototype._onToggleInventoryAccordion,
    toggleOwnedItemEquipped: de.prototype._onToggleOwnedItemEquipped,
    setOwnedItemPrimary: de.prototype._onSetOwnedItemPrimary,
    attackWeapon: de.prototype._onAttackWeapon
  }
}));
let Ba = de;
class vo extends Di {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["npc-sheet", v, "actor-sheet-v2"]
    });
  }
}
R(vo, "PARTS", {
  sheet: {
    get template() {
      return `${q}/actor/npc.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class Mo extends Di {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["vehicle-sheet", v, "actor-sheet-v2"],
      position: { width: 860, height: 820 }
    });
  }
}
R(Mo, "PARTS", {
  sheet: {
    get template() {
      return `${q}/actor/vehicle.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class Eo extends Di {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["battlemech-sheet", v, "actor-sheet-v2"],
      position: { width: 900, height: 820 }
    });
  }
}
R(Eo, "PARTS", {
  sheet: {
    get template() {
      return `${q}/actor/battlemech.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
function Nd() {
  console.log(`${oe}Registering Actor sheets (V2)`);
  const { Actors: a } = foundry.documents.collections;
  a.registerSheet(v, Ba, {
    types: ["character"],
    makeDefault: !0,
    label: "Character (V2)"
  }), a.registerSheet(v, vo, {
    types: ["npc"],
    makeDefault: !0,
    label: "NPC (V2)"
  }), a.registerSheet(v, Mo, {
    types: ["vehicle"],
    makeDefault: !0,
    label: "Vehicle (V2)"
  }), a.registerSheet(v, Eo, {
    types: ["battlemech"],
    makeDefault: !0,
    label: "BattleMech (V2)"
  });
}
const { HandlebarsApplicationMixin: Rd } = foundry.applications.api;
var si, Ht, ot, Wi, za;
const Pe = class Pe extends Rd(foundry.applications.sheets.ItemSheetV2) {
  constructor() {
    super(...arguments);
    ye(this, ot);
    ye(this, si, /* @__PURE__ */ new Map());
    ye(this, Ht, /* @__PURE__ */ new Map());
    /** @override */
    R(this, "tabGroups", {
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
      classes: ["sheet", "item", v, "appv2", "mwd-sheet", "item-sheet"],
      position: {
        width: 760,
        height: 860
      },
      window: {
        resizable: !0
      },
      actions: {
        editImage: Pe._onEditImage,
        tab: Pe.prototype._onClickTab,
        accordion: Pe.prototype._onClickAccordion,
        checkbarElement: Pe._onClickCheckbar,
        modifierAdd: Pe._onModifierAdd,
        modifierDelete: Pe._onModifierDelete,
        modifierValueChange: Pe._onModifierValueChange,
        modifierConditionChange: Pe._onModifierConditionChange,
        modifierSelectionChange: Pe._onModifierSelectionChange,
        effectCreate: Pe._onEffectCreate,
        effectEdit: Pe._onEffectEdit,
        effectDelete: Pe._onEffectDelete,
        effectToggleDisabled: Pe._onEffectToggleDisabled
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
    var n, o, l, c;
    t = super._initializeApplicationOptions(t), t.classes = Array.from(t.classes ?? []);
    const i = this._getCanonicalItemTypeFromOptions(t);
    i && t.classes.push(String(i));
    const s = ((c = (l = (o = (n = game.system) == null ? void 0 : n.mwd) == null ? void 0 : o.styles) == null ? void 0 : l.selectCssClass) == null ? void 0 : c.call(l)) ?? "mwd-theme-default", r = ["mwd-theme-default", "mwd-theme-sra"];
    return t.classes = t.classes.filter((u) => !r.includes(u)), t.classes.push(s), t;
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
      const s = this._getCanonicalItemType();
      return {
        [b.itemType.mechWeapon]: `${q}/v2/item/mech-weapon-root.hbs`,
        [b.itemType.armor]: `${q}/v2/item/armor.hbs`
      }[s] ?? `${q}/v2/item/${s}.hbs`;
    }
    return ((i = super._getPartTemplate) == null ? void 0 : i.call(this, t)) ?? "";
  }
  /**
   * Override title to show localized item type and name.
   * @override
   */
  get title() {
    const t = this._getCanonicalItemType();
    return `${fe.itemType.singular[t] ?? t}: ${this.item.name}`;
  }
  /**
   * Prepare context data for rendering.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The context object
   * @override
   */
  async _prepareContext(t) {
    var I, O, x, j, V, K;
    const i = await super._prepareContext(t), s = ((O = (I = game.system.mwd.modifiers) == null ? void 0 : I.getEnums) == null ? void 0 : O.call(I)) ?? {}, r = foundry.utils.deepClone((i == null ? void 0 : i.options) ?? {}), n = ((j = (x = this.item.actor) == null ? void 0 : x.getAttributes) == null ? void 0 : j.call(x, this.item)) ?? [], o = this._getCanonicalItemType(), l = !this.item.actor, c = !!this.item.actor, u = fe.itemType.singular[o] ?? o, d = this._getEffectEntries(), p = d.filter((D) => D.syncedCount > 0).length, m = this.constructor.LAYOUT_ID, f = this.item.actor ? (D) => n.includes(D) : (D) => !0, y = o === b.itemType.skill, g = ["mwd", "item-sheet", this.isEditable ? "editable" : "locked"], S = g.join(" ");
    r.classes = g, r.cssClass = S;
    const T = await foundry.applications.ux.TextEditor.implementation.enrichHTML(this.item.system.description ?? "", {
      async: !0,
      secrets: this.item.isOwner,
      relativeTo: this.item
    }), k = game.user.isGM && this.item.system.gmnotes ? await foundry.applications.ux.TextEditor.implementation.enrichHTML(this.item.system.gmnotes, {
      async: !0,
      secrets: !0,
      relativeTo: this.item
    }) : "", P = foundry.utils.mergeObject(i, {
      // Item data
      item: this.item,
      data: this.item,
      system: this.item.system,
      // Enriched content
      enrichedDescription: T,
      enrichedGMNotes: k,
      // Options for templates
      options: {
        ...r,
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
      ENUMS: foundry.utils.mergeObject(
        te.getEnums(f, y),
        s
      ),
      MWD: fe,
      itemSheet: {
        canonicalType: o,
        typeLabel: u,
        isArmorSheet: o === b.itemType.armor,
        isStandalone: l,
        canUseActorControls: c,
        supportsEffectSync: !!((K = (V = this.item).supportsEquippedEffectSync) != null && K.call(V)),
        effectEntries: d,
        effectCount: d.length,
        syncedEffectCount: p,
        summaryChips: this._getSummaryChips(),
        stateChips: this._getStateChips(d)
      },
      // CSS class for form element
      cssClass: S,
      // Tab configuration
      tabs: this._getTabs()
    });
    return m && (P.layout = await Ns.get(m)), P;
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
    var s, r, n;
    const i = [];
    return i.push({ kind: "ownership", label: this.item.actor ? "Owned Item" : "World Item" }), Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "equipped") && i.push({
      kind: "equipment",
      label: (s = this.item.system) != null && s.equipped ? "Equipped" : "Unequipped",
      tone: (r = this.item.system) != null && r.equipped ? "active" : "muted"
    }), Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "isPrimary") && ((n = this.item.system) != null && n.isPrimary) && i.push({ kind: "role", label: "Primary", tone: "accent" }), t.length && i.push({
      kind: "effects",
      label: `${t.length} Effect${t.length === 1 ? "" : "s"}`,
      tone: t.some((o) => o.syncedCount > 0) ? "active" : "muted"
    }), i;
  }
  _getEffectEntries() {
    var s, r, n, o, l, c;
    const t = /* @__PURE__ */ new Map(), i = ((r = (s = this.item).getSyncedActorEffects) == null ? void 0 : r.call(s)) ?? [];
    for (const u of i) {
      const d = (l = (o = (n = u.flags) == null ? void 0 : n[v]) == null ? void 0 : o.equippedItemSync) == null ? void 0 : l.sourceEffectId;
      if (!d) continue;
      const p = t.get(d) ?? [];
      p.push(u), t.set(d, p);
    }
    return Array.from(((c = this.item.effects) == null ? void 0 : c.contents) ?? []).map((u) => {
      var p, m, f, y, h, g, S;
      const d = t.get(u.id) ?? [];
      return {
        id: u.id,
        name: u.name || "New Effect",
        img: u.img || "icons/svg/aura.svg",
        disabled: !!u.disabled,
        transfer: !!u.transfer,
        changesCount: Array.isArray(u.changes) ? u.changes.length : 0,
        statusesCount: Number(((p = u.statuses) == null ? void 0 : p.size) ?? ((m = u.statuses) == null ? void 0 : m.length) ?? 0),
        durationLabel: (f = u.duration) != null && f.seconds ? `${u.duration.seconds}s` : (y = u.duration) != null && y.rounds ? `${u.duration.rounds} rounds` : "Passive",
        syncedCount: d.length,
        syncLabel: this.item.actor ? (g = (h = this.item).supportsEquippedEffectSync) != null && g.call(h) ? (S = this.item.system) != null && S.equipped ? d.length ? `Synced to actor (${d.length})` : "Pending sync" : "Applies when equipped" : "No equip sync" : "World item"
      };
    });
  }
  _getRootElement() {
    var t;
    return this.element instanceof HTMLElement ? this.element : (t = this.element) == null ? void 0 : t[0];
  }
  _onClickTab(t, i) {
    var l, c, u;
    const s = ((l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, ".csb-tab-link[data-tab]")) ?? ((u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, ".csb-tab-link[data-tab]"));
    if (!s) return;
    const r = s.closest(".csb-tabs");
    if (!r) return;
    const n = r.dataset.group || "default", o = s.dataset.tab;
    o && (B(this, si).set(n, o), M(this, ot, Wi).call(this, this._getRootElement(), n, o));
  }
  _onClickAccordion(t, i) {
    var u, d, p;
    const s = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((p = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : p.call(d, ".csb-accordion__trigger[data-section]"));
    if (!s) return;
    const r = s.dataset.section, n = s.closest(".csb-accordion");
    if (!n || !r) return;
    const o = n.dataset.group || "default", c = (B(this, Ht).has(o) ? B(this, Ht).get(o) : n.dataset.default || null) === r ? null : r;
    B(this, Ht).set(o, c), M(this, ot, za).call(this, n, c);
  }
  _onRender(t, i) {
    var r, n, o, l;
    (r = super._onRender) == null || r.call(this, t, i), (n = this.window) != null && n.title && (this.window.title.textContent = this.title);
    const s = this._getRootElement();
    if (s) {
      for (const c of s.querySelectorAll(".sheet-tabs")) {
        const u = c.dataset.group || "default", d = Array.from(c.querySelectorAll("[data-tab]"));
        if (!d.length) continue;
        for (const y of d)
          y.addEventListener("click", (h) => {
            h.preventDefault(), h.stopPropagation();
            const g = y.dataset.tab;
            g && (B(this, si).set(u, g), M(this, ot, Wi).call(this, s, u, g));
          });
        const p = B(this, si).get(u), m = c.dataset.default || ((o = d[0]) == null ? void 0 : o.dataset.tab), f = p || m;
        f && M(this, ot, Wi).call(this, s, u, f);
      }
      for (const c of s.querySelectorAll(".csb-tabs")) {
        const u = c.dataset.group || "default", d = Array.from(c.querySelectorAll(".csb-tab-link[data-tab]"));
        if (!d.length) continue;
        const p = B(this, si).get(u), m = c.dataset.default || ((l = d[0]) == null ? void 0 : l.dataset.tab), f = p || m;
        f && M(this, ot, Wi).call(this, s, u, f);
      }
      for (const c of s.querySelectorAll(".csb-accordion")) {
        const u = c.dataset.group || "default", d = B(this, Ht).has(u) ? B(this, Ht).get(u) : c.dataset.default || null;
        M(this, ot, za).call(this, c, d);
      }
    }
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
    const s = this.item;
    if (!s.parent) return;
    const r = i.closest(".checkbar-root");
    if (!r) return;
    const n = r.dataset.monitorCode, o = Number.parseInt(i.dataset.index), l = i.dataset.checked === "true";
    await s.parent.switchMonitorCheck(n, o, l);
  }
  static async _onEditImage(t) {
    var r, n, o;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t), !this.isEditable) return;
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
    const s = i.closest(".define-modifier");
    if (!s) return;
    const r = s.dataset.modifierId;
    r && await this.item.deleteModifier(r);
  }
  /**
   * Handle changing a modifier's value.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The input element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierValueChange(t, i) {
    const s = i.closest(".define-modifier");
    if (!s) return;
    const r = s.dataset.modifierId;
    r && await this.item.changeModifierValue(r, i.value);
  }
  /**
   * Handle changing a modifier's condition.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The input element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierConditionChange(t, i) {
    const s = i.closest(".define-modifier");
    if (!s) return;
    const r = s.dataset.modifierId;
    r && await this.item.changeModifierCondition(r, i.value);
  }
  /**
   * Handle changing a modifier's selection (dropdown).
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The select element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierSelectionChange(t, i) {
    const s = i.closest(".define-modifier");
    if (!s) return;
    const r = s.dataset.modifierId, n = i.dataset.modifierSelect;
    r && n && await this.item.changeModifierSelection(r, n, i.value);
  }
  static async _onEffectCreate(t, i) {
    var r, n, o;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const [s] = await this.item.createEmbeddedDocuments("ActiveEffect", [{
      name: `${this.item.name} Effect`,
      img: this.item.img || "icons/svg/aura.svg",
      disabled: !1,
      transfer: !1,
      changes: []
    }]);
    (o = s == null ? void 0 : s.sheet) == null || o.render(!0);
  }
  static async _onEffectEdit(t, i) {
    var n, o, l, c, u, d, p;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const s = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.effectId) ?? ((d = (u = (c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : d.effectId);
    if (!s) return;
    const r = this.item.effects.get(s);
    (p = r == null ? void 0 : r.sheet) == null || p.render(!0);
  }
  static async _onEffectDelete(t, i) {
    var r, n, o, l, c, u;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const s = ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.effectId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-effect-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.effectId);
    s && await this.item.deleteEmbeddedDocuments("ActiveEffect", [s]);
  }
  static async _onEffectToggleDisabled(t, i) {
    var n, o, l, c, u, d;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const s = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.effectId) ?? ((d = (u = (c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : d.effectId);
    if (!s) return;
    const r = this.item.effects.get(s);
    r && await r.update({ disabled: !r.disabled });
  }
};
si = new WeakMap(), Ht = new WeakMap(), ot = new WeakSet(), Wi = function(t, i, s) {
  t && (t.querySelectorAll(`.csb-tabs[data-group="${i}"] .csb-tab-link[data-tab]`).forEach((r) => {
    r.classList.toggle("is-active", r.dataset.tab === s);
  }), t.querySelectorAll(`.csb-tabs[data-group="${i}"] .csb-tab-panel[data-tab]`).forEach((r) => {
    r.classList.toggle("is-active", r.dataset.tab === s);
  }), t.querySelectorAll(".sheet-tabs [data-tab]").forEach((r) => {
    var o;
    (((o = r.closest(".sheet-tabs")) == null ? void 0 : o.dataset.group) || "default") === i && r.classList.toggle("active", r.dataset.tab === s);
  }), t.querySelectorAll(`.tab[data-group="${i}"]`).forEach((r) => {
    r.classList.toggle("active", r.dataset.tab === s);
  }));
}, za = function(t, i) {
  t.dataset.activeSection = i ?? "", t.querySelectorAll(".csb-accordion__section").forEach((s) => {
    const r = s.dataset.section === i;
    s.classList.toggle("is-active", r);
  }), t.querySelectorAll(".csb-accordion__trigger").forEach((s) => {
    const r = s.dataset.section === i;
    s.classList.toggle("is-active", r), s.setAttribute("aria-expanded", r ? "true" : "false");
  }), t.querySelectorAll(".csb-accordion__panel").forEach((s) => {
    const r = s.closest(".csb-accordion__section"), n = (r == null ? void 0 : r.dataset.section) === i;
    s.classList.toggle("is-active", n);
  });
}, R(Pe, "LAYOUT_ID", null), /** @override */
R(Pe, "PARTS", {
  sheet: {
    template: "",
    // Set dynamically in _getPartTemplate
    scrollable: [".sheet-body"]
  }
}), R(Pe, "TABS", {
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
let ut = Pe;
class Co extends ut {
}
R(Co, "PARTS", {
  sheet: {
    template: `${q}/v2/item/contact.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Po extends ut {
}
R(Po, "PARTS", {
  sheet: {
    template: `${q}/v2/item/gear.hbs`,
    scrollable: [".sheet-body"]
  }
});
class No extends ut {
  async _prepareContext(e) {
    var r;
    const t = await super._prepareContext(e), i = Je(this.item.system ?? {}), s = Qn();
    return t.system = i, t.traitEditor = s, t.itemSheet = foundry.utils.mergeObject(t.itemSheet ?? {}, {
      summaryChips: [
        { label: "Category", value: fs(i.category) },
        { label: "Tier", value: hs(i.tier) },
        { label: "Activation", value: String(i.activation ?? "passive").trim() || "Passive" },
        { label: "Effects", value: String(((r = i.effects) == null ? void 0 : r.length) ?? 0) }
      ]
    }), t.tagsText = Array.isArray(i.tags) ? i.tags.join(", ") : "", t;
  }
  _onRender(e, t) {
    var s, r;
    (s = super._onRender) == null || s.call(this, e, t);
    const i = (r = this._getRootElement) == null ? void 0 : r.call(this);
    i && (i.querySelectorAll(".mwd-quality-prereq-add").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).createQualityPrerequisite) == null || c.call(l);
      });
    }), i.querySelectorAll(".mwd-quality-prereq-delete").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).deleteQualityPrerequisite) == null || c.call(l, n.dataset.prereqId);
      });
    }), i.querySelectorAll(".mwd-quality-prereq-field").forEach((n) => {
      n.addEventListener("change", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).updateQualityPrerequisite) == null || c.call(
          l,
          n.dataset.prereqId,
          n.dataset.field,
          n.value
        );
      });
    }), i.querySelectorAll(".mwd-quality-effect-add").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).createQualityEffect) == null || c.call(l);
      });
    }), i.querySelectorAll(".mwd-quality-effect-delete").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).deleteQualityEffect) == null || c.call(l, n.dataset.effectId);
      });
    }), i.querySelectorAll(".mwd-quality-effect-field").forEach((n) => {
      n.addEventListener("change", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).updateQualityEffect) == null || c.call(
          l,
          n.dataset.effectId,
          n.dataset.field,
          n.value
        );
      });
    }), i.querySelectorAll(".mwd-quality-effect-condition-add").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).createQualityEffectCondition) == null || c.call(l, n.dataset.effectId);
      });
    }), i.querySelectorAll(".mwd-quality-effect-condition-delete").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).deleteQualityEffectCondition) == null || c.call(l, n.dataset.effectId, n.dataset.conditionId);
      });
    }), i.querySelectorAll(".mwd-quality-effect-condition-field").forEach((n) => {
      n.addEventListener("change", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).updateQualityEffectCondition) == null || c.call(
          l,
          n.dataset.effectId,
          n.dataset.conditionId,
          n.dataset.field,
          n.value
        );
      });
    }));
  }
}
R(No, "PARTS", {
  sheet: {
    template: `${q}/v2/item/quality.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Ro extends ut {
}
R(Ro, "PARTS", {
  sheet: {
    template: `${q}/v2/item/assetModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Dd extends ut {
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
    const e = Ki(this.item.system ?? {}), t = qt(e.catalogId), s = Us(t, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }).map((n) => n.choice).filter(Boolean).map((n) => Vi(n, { includeBonusText: !0 })).join(", "), r = this.item.actor ? Vt(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return [
      { label: "Slot", value: Ni(e.moduleType) },
      { label: "Module", value: (t == null ? void 0 : t.label) ?? "Unlinked" },
      { label: "Bonuses", value: s || "Pending choice" },
      r ? { label: "Status", value: r.isActive ? "Active" : "Inactive" } : null
    ].filter(Boolean);
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), i = Ki(this.item.system ?? {}), s = i.moduleType, r = qt(i.catalogId), n = s ? tr(s) : [], o = jn(r, i.selectedGrants, { legacySelectedSkill: i.selectedSkill }), l = this.item.actor ? Vt(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return t.lifeModuleEditor = {
      moduleType: s,
      moduleTypeLabel: Ni(s),
      moduleTypes: Fn().map((c) => ({
        ...c,
        selected: c.value === s
      })),
      availableEntries: n.map((c) => ({
        id: c.id,
        label: c.label,
        selected: c.id === i.catalogId
      })),
      hasAvailableEntries: n.length > 0,
      selectedEntry: r,
      selectedGrants: i.selectedGrants,
      grantFields: o,
      requiresAnyLabels: ((r == null ? void 0 : r.requiresAny) ?? []).map((c) => {
        var u;
        return ((u = qt(c)) == null ? void 0 : u.label) ?? c;
      }),
      excludesAnyLabels: ((r == null ? void 0 : r.excludesAny) ?? []).map((c) => {
        var u;
        return ((u = qt(c)) == null ? void 0 : u.label) ?? c;
      }),
      actorState: l,
      warningLabels: [...(l == null ? void 0 : l.warningLabels) ?? []],
      isOwned: !!this.item.actor,
      statusLabel: l ? l.isActive ? "Active" : "Inactive" : r ? "Configured" : "Unlinked",
      statusReason: (l == null ? void 0 : l.inactiveReason) ?? ""
    }, t;
  }
}
class Do extends ut {
}
R(Do, "PARTS", {
  sheet: {
    template: `${q}/v2/item/skill.hbs`,
    scrollable: [".sheet-body"]
  }
});
const Id = Object.freeze([
  "firearms",
  "projectileWeapons",
  "heavyWeapons",
  "meleeCombat"
]), Od = Object.freeze([
  { value: "energy", label: "Energy" },
  { value: "kinetic", label: "Kinetic" },
  { value: "ballistic", label: "Ballistic" },
  { value: "explosive", label: "Explosive" },
  { value: "plasma", label: "Plasma" },
  { value: "electrical", label: "Electrical" },
  { value: "melee", label: "Melee" },
  { value: "none", label: "None" }
]);
function Jr(a, e, t) {
  const i = String(e ?? "").trim();
  return !i || a.some((s) => s.value === i) ? a : a.concat({ value: i, label: t(i) });
}
class js extends ut {
  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        weaponSkillChange: js._onWeaponSkillChange
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
    var l, c, u, d, p, m;
    const t = await super._prepareContext(e), i = this._getCanonicalItemType();
    t.ENUMS = foundry.utils.mergeObject(
      { defenses: he.getDefenses() },
      t.ENUMS
    );
    const s = Array.isArray((l = t.ENUMS) == null ? void 0 : l.skills) ? t.ENUMS.skills : [], r = (c = this.item.system) == null ? void 0 : c.skill, n = (u = this.item.system) == null ? void 0 : u.damageType, o = i === "personalWeapon" ? Jr(
      s.filter((f) => Id.includes(f.value)),
      r,
      (f) => {
        var y;
        return ((y = s.find((h) => h.value === f)) == null ? void 0 : y.label) ?? f;
      }
    ) : s;
    return t.weaponProfile = ((p = (d = this.item).getCombatProfile) == null ? void 0 : p.call(d)) ?? null, t.weaponEditor = {
      skills: o,
      categories: [
        { value: "melee", label: "Melee" },
        { value: "ranged", label: "Ranged" },
        { value: "thrown", label: "Thrown" },
        { value: "other", label: "Other" }
      ],
      damageTypes: Jr(
        i === "personalWeapon" ? [...Ts] : [...Od],
        n,
        (f) => i === "personalWeapon" ? St(f) : f
      ),
      ranges: Ze.RANGE_ORDER.map((f) => ({
        value: f,
        label: f.charAt(0).toUpperCase() + f.slice(1)
      })),
      standardTraits: [...Xo],
      ammoDamageTypes: [{ value: "", label: "Use Weapon Default" }, ...Ts],
      payloadSourceKinds: [
        { value: "untracked", label: "Untracked" },
        { value: "internal", label: "Internal" },
        { value: "actorResource", label: "Actor Resource" },
        { value: "itemRef", label: "Linked Item" }
      ]
    }, t.itemSheet = foundry.utils.mergeObject(t.itemSheet ?? {}, {
      isCompactWeaponSheet: !0,
      weaponSheetVariant: i === "mechWeapon" ? "mech" : "personal"
    }), t.itemSheet.stateChips = (t.itemSheet.stateChips ?? []).filter(
      (f) => !["ownership", "equipment", "role"].includes(f.kind)
    ), t.itemSheet.currentPayloadLabel = ((m = t.weaponProfile) == null ? void 0 : m.payloadLabel) ?? "", t;
  }
  /**
   * Handle changing the weapon skill, which updates the defense attribute.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The changed select element
   * @static
   * @async
   */
  static async _onWeaponSkillChange(e, t) {
    var r, n;
    const i = t.value, s = (n = (r = game.system.mwd.skills) == null ? void 0 : r.get) == null ? void 0 : n.call(r, i);
    s != null && s.defense && await this.item.update({ "system.defense": s.defense }, { render: !1 });
  }
}
const ji = class ji extends js {
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
        attackWeapon: ji._onAttackWeapon
      }
    }, { inplace: !1 });
  }
  async _prepareContext(e) {
    var r, n, o;
    const t = await super._prepareContext(e), i = this.item.actor ?? null, s = !!(i && typeof i.isCharacterLike == "function" && i.isCharacterLike() && ((n = (r = this.item).isPersonalWeapon) != null && n.call(r)));
    return t.itemSheet = foundry.utils.mergeObject(t.itemSheet ?? {}, {
      canAttack: s,
      attackDisabled: !s || !((o = this.item.system) != null && o.equipped)
    }), t.itemSheet.summaryChips = this._getSummaryChips(t.weaponProfile ?? null), t;
  }
  _getSummaryChips(e = ((t) => ((i) => (i = (t = this.item).getCombatProfile) == null ? void 0 : i.call(t))())() ?? null) {
    var r, n, o;
    if (!e) return [];
    const s = [
      { label: "Category", value: String(e.category ?? "").trim() || "Ranged" },
      { label: "Skill", value: ((r = e.skillDef) == null ? void 0 : r.label) ?? e.skill ?? "Firearms" },
      { label: "DV", value: String(Number(e.damage ?? 0)) },
      { label: "AP", value: String(Number(e.ap ?? 0)) },
      { label: "Type", value: St(e.damageType) || "Penetrating" },
      { label: "Range", value: String(((n = e.range) == null ? void 0 : n.max) ?? "near").trim() || "Near" }
    ];
    return String(e.category ?? "").trim().toLowerCase() !== "melee" && s.push((o = e == null ? void 0 : e.sourceState) != null && o.isTracked ? { label: "Payload", value: `${(e == null ? void 0 : e.payloadLabel) || "Unloaded"} (${Number(e.sourceState.current ?? 0)}/${Number(e.sourceState.max ?? 0)})` } : { label: "Payload", value: (e == null ? void 0 : e.payloadLabel) || "Unloaded" }), s;
  }
  static async _onAttackWeapon(e) {
    var i, s, r, n, o;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (s = e == null ? void 0 : e.stopPropagation) == null || s.call(e);
    const t = this.item.actor ?? null;
    if (!(!t || !((n = (r = this.item).isPersonalWeapon) != null && n.call(r))))
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
        console.error("MWD | Failed to launch weapon sheet attack", l), Ps(l, "Unable to attack with that weapon.");
      }
  }
  _onRender(e, t) {
    var s, r;
    (s = super._onRender) == null || s.call(this, e, t);
    const i = (r = this._getRootElement) == null ? void 0 : r.call(this);
    i && (i.querySelectorAll(".mwd-standard-trait-add").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).createWeaponStandardTrait) == null || c.call(l);
      });
    }), i.querySelectorAll(".mwd-standard-trait-delete").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).deleteWeaponStandardTrait) == null || c.call(l, n.dataset.traitId);
      });
    }), i.querySelectorAll(".mwd-standard-trait-field").forEach((n) => {
      n.addEventListener("change", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).updateWeaponStandardTrait) == null || c.call(
          l,
          n.dataset.traitId,
          n.dataset.field,
          n.value
        );
      });
    }), i.querySelectorAll(".mwd-payload-add").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).createPayload) == null || c.call(l);
      });
    }), i.querySelectorAll(".mwd-payload-delete").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).deletePayload) == null || c.call(l, n.dataset.payloadId);
      });
    }), i.querySelectorAll(".mwd-payload-field").forEach((n) => {
      n.addEventListener("change", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).updatePayloadField) == null || c.call(
          l,
          n.dataset.payloadId,
          n.dataset.field,
          n.value
        );
      });
    }), i.querySelectorAll(".mwd-payload-standard-trait-add").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).createPayloadStandardTrait) == null || c.call(l, n.dataset.payloadId);
      });
    }), i.querySelectorAll(".mwd-payload-standard-trait-delete").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).deletePayloadStandardTrait) == null || c.call(l, n.dataset.payloadId, n.dataset.traitId);
      });
    }), i.querySelectorAll(".mwd-payload-standard-trait-field").forEach((n) => {
      n.addEventListener("change", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).updatePayloadStandardTrait) == null || c.call(
          l,
          n.dataset.payloadId,
          n.dataset.traitId,
          n.dataset.field,
          n.value
        );
      });
    }), i.querySelectorAll(".mwd-source-add").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).createConsumptionSource) == null || c.call(l);
      });
    }), i.querySelectorAll(".mwd-source-delete").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).deleteConsumptionSource) == null || c.call(l, n.dataset.sourceId);
      });
    }), i.querySelectorAll(".mwd-source-field").forEach((n) => {
      n.addEventListener("change", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).updateConsumptionSourceField) == null || c.call(
          l,
          n.dataset.sourceId,
          n.dataset.field,
          n.value
        );
      });
    }));
  }
};
R(ji, "LAYOUT_ID", "personal-weapon"), R(ji, "PARTS", {
  sheet: {
    template: `${q}/v2/item/personal-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
let Wa = ji;
class Ua extends js {
}
R(Ua, "LAYOUT_ID", "mech-weapon"), R(Ua, "PARTS", {
  sheet: {
    template: `${q}/v2/item/mech-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Ha extends ut {
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
    var l, c, u, d, p, m, f, y, h;
    const t = await super._prepareContext(e), i = this.item, s = i.actor ?? null, r = ((l = s == null ? void 0 : s.getPersonalCombatLoadout) == null ? void 0 : l.call(s)) ?? null, n = ((c = r == null ? void 0 : r.activeArmor) == null ? void 0 : c.id) ?? null, o = ((u = r == null ? void 0 : r.activeArmor) == null ? void 0 : u.id) === i.id ? r.activeArmor : null;
    return t.armorState = o, t.isActiveArmor = n === i.id, t.effectiveDurabilityCurrent = Number(
      ((d = o == null ? void 0 : o.durability) == null ? void 0 : d.current) ?? ((m = (p = i.system) == null ? void 0 : p.durability) == null ? void 0 : m.current) ?? ((y = (f = i.system) == null ? void 0 : f.durability) == null ? void 0 : y.max) ?? ((h = i.system) == null ? void 0 : h.rating) ?? 0
    ), t.itemSheet = foundry.utils.mergeObject(t.itemSheet ?? {}, {}), t.itemSheet.summaryChips = this._getSummaryChips(o), t.armorEditor = {
      standardTraits: [...Zo]
    }, t;
  }
  _getSummaryChips(e = null) {
    var r, n, o, l, c, u, d, p, m, f, y, h, g;
    const t = this.item.system ?? {}, i = [
      { label: "Rating", value: String(Number((e == null ? void 0 : e.ratingCurrent) ?? t.rating ?? 0)) },
      { label: "Defense", value: String(Number(t.defenseBonus ?? 0)) },
      {
        label: "Durability",
        value: `${Number(((r = e == null ? void 0 : e.durability) == null ? void 0 : r.current) ?? ((n = t.durability) == null ? void 0 : n.current) ?? ((o = t.durability) == null ? void 0 : o.max) ?? 0)}/${Number(((l = e == null ? void 0 : e.durability) == null ? void 0 : l.max) ?? ((c = t.durability) == null ? void 0 : c.max) ?? t.rating ?? 0)}`
      },
      {
        label: "Resist",
        value: String(Number((e == null ? void 0 : e.baseMitigation) ?? (e == null ? void 0 : e.baseResistance) ?? 0))
      }
    ], s = Number(((d = (u = e == null ? void 0 : e.traitState) == null ? void 0 : u.reinforced) == null ? void 0 : d.max) ?? ((m = (p = t == null ? void 0 : t.traitState) == null ? void 0 : p.reinforced) == null ? void 0 : m.max) ?? 0);
    return s > 0 && i.push({
      label: "Reinforced",
      value: `${Number(((y = (f = e == null ? void 0 : e.traitState) == null ? void 0 : f.reinforced) == null ? void 0 : y.current) ?? ((g = (h = t == null ? void 0 : t.traitState) == null ? void 0 : h.reinforced) == null ? void 0 : g.current) ?? 0)}/${s}`
    }), i;
  }
  _onRender(e, t) {
    var s, r;
    (s = super._onRender) == null || s.call(this, e, t);
    const i = (r = this._getRootElement) == null ? void 0 : r.call(this);
    i && (i.querySelectorAll(".mwd-armor-standard-trait-add").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).createArmorStandardTrait) == null || c.call(l);
      });
    }), i.querySelectorAll(".mwd-armor-standard-trait-delete").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).deleteArmorStandardTrait) == null || c.call(l, n.dataset.traitId);
      });
    }), i.querySelectorAll(".mwd-armor-standard-trait-field").forEach((n) => {
      n.addEventListener("change", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).updateArmorStandardTrait) == null || c.call(
          l,
          n.dataset.traitId,
          n.dataset.field,
          n.value
        );
      });
    }));
  }
}
R(Ha, "LAYOUT_ID", "armor"), R(Ha, "PARTS", {
  sheet: {
    template: `${q}/v2/item/armor-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
function _d() {
  console.log(`${oe}Registering Item sheets (V2)`);
  const { Items: a } = foundry.documents.collections;
  a.registerSheet(v, Co, { types: ["contact"], makeDefault: !0, label: "Contact (V2)" }), a.registerSheet(v, Po, { types: ["gear"], makeDefault: !0, label: "Gear (V2)" }), a.registerSheet(v, No, { types: ["quality"], makeDefault: !0, label: "Quality (V2)" }), a.registerSheet(v, Ro, { types: ["assetModule"], makeDefault: !0, label: "Asset Module (V2)" }), a.registerSheet(v, Dd, { types: ["lifeModule"], makeDefault: !0, label: "Life Module (V2)" }), a.registerSheet(v, Do, { types: ["skill"], makeDefault: !0, label: "Skill (V2)" }), a.registerSheet(v, Wa, { types: ["personalWeapon", "weapon"], makeDefault: !0, label: "Personal Weapon (V2)" }), a.registerSheet(v, Ua, { types: ["mechWeapon"], makeDefault: !0, label: "Mech Weapon (V2)" }), a.registerSheet(v, Ha, { types: ["armor"], makeDefault: !0, label: "Armor (V2)" });
}
const Xr = [
  // UI (CSB render entry point + node types)
  `systems/${v}/templates/v2/ui/layout-root.hbs`,
  `systems/${v}/templates/v2/ui/nodes/hexabox.hbs`,
  `systems/${v}/templates/v2/ui/nodes/stack.hbs`,
  `systems/${v}/templates/v2/ui/nodes/panel.hbs`,
  `systems/${v}/templates/v2/ui/nodes/include.hbs`,
  `systems/${v}/templates/v2/ui/nodes/tabs.hbs`,
  `systems/${v}/templates/v2/ui/nodes/accordion.hbs`,
  `systems/${v}/templates/v2/ui/nodes/unknown.hbs`,
  `systems/${v}/templates/common/view-mode.hbs`,
  `systems/${v}/templates/common/label.hbs`,
  `systems/${v}/templates/common/enum-value-label.hbs`,
  `systems/${v}/templates/common/damage-code.hbs`,
  `systems/${v}/templates/common/damage-armor.hbs`,
  `systems/${v}/templates/v2/ui/mod-stepper.hbs`,
  `systems/${v}/templates/v2/ui/condition-monitors.hbs`,
  `systems/${v}/templates/v2/roll/_mwd-roll-card.hbs`,
  `systems/${v}/templates/v2/components/checkbox.hbs`,
  `systems/${v}/templates/v2/components/radio.hbs`,
  // Character UI
  `systems/${v}/templates/v2/ui/character/attributes.hbs`,
  `systems/${v}/templates/v2/ui/character/combat-actions.hbs`,
  `systems/${v}/templates/v2/ui/character/skills-column.hbs`,
  `systems/${v}/templates/v2/ui/character/skill-row.hbs`,
  `systems/${v}/templates/v2/ui/character/edge-console.hbs`,
  `systems/${v}/templates/v2/ui/character/burn-monitor.hbs`,
  `systems/${v}/templates/v2/ui/character/status-dashboard.hbs`,
  `systems/${v}/templates/v2/ui/character/inventory-section.hbs`,
  `systems/${v}/templates/v2/ui/character/inventory-record.hbs`,
  `systems/${v}/templates/v2/ui/character/bio-identity.hbs`,
  `systems/${v}/templates/v2/ui/character/bio-history.hbs`,
  // Sheet wrapper
  `systems/${v}/templates/v2/actor/_sheet-root.hbs`,
  // Placeholders
  `systems/${v}/templates/v2/ui/placeholders/assigned-systems.hbs`,
  `systems/${v}/templates/v2/ui/placeholders/inventory-gear.hbs`,
  `systems/${v}/templates/v2/ui/placeholders/inventory-armor.hbs`,
  `systems/${v}/templates/v2/ui/placeholders/inventory-weapons.hbs`,
  `systems/${v}/templates/v2/ui/placeholders/bio-description.hbs`,
  `systems/${v}/templates/v2/ui/placeholders/bio-traits.hbs`,
  `systems/${v}/templates/v2/ui/placeholders/bio-life-modules.hbs`,
  // V2 item partials
  `systems/${v}/templates/v2/item/_item-sheet-root.hbs`,
  `systems/${v}/templates/v2/item/personal-weapon-root.hbs`,
  `systems/${v}/templates/v2/item/mech-weapon-root.hbs`,
  `systems/${v}/templates/v2/item/armor-root.hbs`,
  `systems/${v}/templates/v2/item/parts/itemname.hbs`,
  `systems/${v}/templates/v2/item/parts/inactive.hbs`,
  `systems/${v}/templates/v2/item/parts/references.hbs`,
  `systems/${v}/templates/v2/item/parts/modifier.hbs`,
  `systems/${v}/templates/v2/item/parts/modifiers.hbs`,
  `systems/${v}/templates/v2/item/parts/weapon-main.hbs`,
  `systems/${v}/templates/v2/item/parts/weapon-compact-main.hbs`,
  `systems/${v}/templates/v2/item/parts/weapon-summary-hero.hbs`,
  `systems/${v}/templates/v2/item/parts/weapon-combat-essentials.hbs`,
  `systems/${v}/templates/v2/item/parts/weapon-usage-bands.hbs`,
  `systems/${v}/templates/v2/item/parts/weapon-standard-traits.hbs`,
  `systems/${v}/templates/v2/item/parts/weapon-ammo-profiles.hbs`,
  `systems/${v}/templates/v2/item/parts/weapon-consumption-sources.hbs`,
  `systems/${v}/templates/v2/item/parts/weapon-notes-reference.hbs`,
  `systems/${v}/templates/v2/item/parts/armor-main.hbs`,
  `systems/${v}/templates/v2/item/parts/armor-summary-hero.hbs`,
  `systems/${v}/templates/v2/item/parts/armor-combat-essentials.hbs`,
  `systems/${v}/templates/v2/item/parts/armor-usage-protection.hbs`,
  `systems/${v}/templates/v2/item/parts/armor-identity-fields.hbs`,
  `systems/${v}/templates/v2/item/parts/armor-standard-traits.hbs`,
  `systems/${v}/templates/v2/item/parts/armor-notes-reference.hbs`,
  `systems/${v}/templates/v2/item/parts/item-effects.hbs`,
  // Actors
  `systems/${v}/templates/v2/actor/character-sheet.hbs`
];
function Ld(a) {
  const e = String(a).replaceAll("\\", "/"), t = `systems/${v}/templates/`, i = e.indexOf(t);
  return `mwd.${(i >= 0 ? e.slice(i + t.length) : e).replace(/\.hbs$/i, "").split("/").filter(Boolean).map((o) => o.replace(/^_+/, "")).join(".")}`;
}
function $d() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
async function xd() {
  var e, t;
  const a = $d();
  try {
    const i = {};
    for (const r of Xr)
      i[Ld(r)] = r, i[r] = r;
    await foundry.applications.handlebars.loadTemplates(i);
    const s = "mwd.v2.ui.layout-root";
    if (!((e = Handlebars.partials) != null && e[s])) {
      const r = Object.keys(Handlebars.partials ?? {});
      throw console.error("Missing required partial:", s), console.error("Closest matches:", r.filter((n) => n.includes("layout-root"))), new Error(`Template preload failed: ${s} not registered`);
    }
    if (a !== Handlebars) {
      for (const [r, n] of Object.entries(a.partials ?? {}))
        if (!((t = Handlebars.partials) != null && t[r]))
          try {
            Handlebars.registerPartial(r, n);
          } catch {
          }
    }
    console.log(`${oe}preloadTemplatesV2 OK`, { loaded: Xr.length });
  } catch (i) {
    throw console.error(`${oe}preloadTemplatesV2 FAILED`, i), i;
  }
}
function Zr(a) {
  const e = Math.max(0, Number(a) || 0);
  return -Math.floor(e / 3);
}
function Bd(a) {
  const e = Math.max(0, Number(a) || 0);
  return e === 0 ? 0 : Math.ceil(e / 4);
}
function Fd(a = {}) {
  const e = a.physical ?? {}, t = a.fatigue ?? {}, i = a.armor ?? {}, s = Number(e.value) || 0, r = Number(t.value) || 0, n = Math.max(Number(i.value) || 0, Number(i.max) || 0);
  return {
    physical: { penalty: Zr(s) },
    fatigue: { penalty: Zr(r) },
    armor: { resistance: Bd(n) }
  };
}
const la = {
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
function zd(a, e, t, i) {
  const s = a.system ?? {}, r = `monitors.${e}`, n = Number(foundry.utils.getProperty(s, `${r}.max`)) || 0, o = Number(foundry.utils.getProperty(s, `${r}.value`)) || 0;
  switch (t) {
    case "value":
      return i;
    case "armorPersonalBase":
      return i;
    case "mechArmorBase":
      return Math.max(i, n, o);
    case "vehicleArmorBase":
      return Math.max(i, n, o);
    default:
      return i;
  }
}
function Wd(a = {}) {
  return Object.entries(bt(a)).filter(([, e]) => Number(e) > 0).map(([e, t]) => `${e} +${t}`).join(", ");
}
class Ud extends Actor {
  /* -------------------------------------------- */
  /* Base & Derived Data                           */
  /* -------------------------------------------- */
  /** @override */
  prepareBaseData() {
    var e, t;
    if (super.prepareBaseData(), this.isCharacterLike()) {
      const i = this.system ?? {};
      if (Ol(i), (e = i.skills) != null && e.skills && typeof i.skills.skills == "object") {
        for (const [s, r] of Object.entries(i.skills.skills))
          (t = i.skills)[s] ?? (t[s] = r);
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
      for (const s of Object.values(e)) {
        if (!s || typeof s != "object") continue;
        s.rating = Math.max(0, Number(s.rating ?? 0));
        const r = Object.prototype.hasOwnProperty.call(s, "value"), n = Number(s.value);
        (!r || !Number.isFinite(n)) && (s.value = s.rating), "max" in s && delete s.max;
      }
  }
  /**
   * Derived-data prep for Edge pools:
   * - Computes cap/effectiveMax/effectiveValue
   * - Stores in a non-persisted cache on the actor instance
   * - No writes to system data (prevents UI snap-back / loops)
   */
  _prepareEdgePoolsDerived() {
    var i, s;
    this._mwdDerived ?? (this._mwdDerived = {}), this._mwdDerived.edgePools = null;
    const e = this.getEdgeCap(), t = this.type === "character" ? Vt(this).bonusByEdgePool ?? {} : {};
    if (this.type === "character" && this.hasEdgePools()) {
      const r = ((s = (i = this.system) == null ? void 0 : i.counters) == null ? void 0 : s.edgePools) ?? {}, n = {};
      for (const [o, l] of Object.entries(r)) {
        const c = Math.max(0, Number((l == null ? void 0 : l.rating) ?? 0)), u = Math.max(0, Number((l == null ? void 0 : l.value) ?? 0)), d = Math.max(0, Number((t == null ? void 0 : t[o]) ?? 0)), p = c + d, m = Math.min(p, e), f = Math.min(u, m);
        n[o] = {
          key: o,
          rating: c,
          ratingBonus: d,
          effectiveRating: p,
          value: u,
          cap: e,
          effectiveMax: m,
          effectiveValue: f,
          hasPools: !0,
          isEmpty: f <= 0,
          isCapped: p > e
        };
      }
      this._mwdDerived.edgePools = { cap: e, pools: n };
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
    var t, i, s;
    return Math.max(0, Number(((s = (i = (t = this.system) == null ? void 0 : t.attributes) == null ? void 0 : i[e]) == null ? void 0 : s.value) ?? 0));
  }
  getSkillRating(e) {
    var t, i, s;
    return Math.max(0, Number(((s = (i = (t = this.system) == null ? void 0 : t.skills) == null ? void 0 : i[e]) == null ? void 0 : s.rating) ?? 0));
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
      const s = (i = this._mwdDerived) == null ? void 0 : i.personalCombat;
      if (s) return s;
    }
    const t = this._computePersonalCombatLoadout();
    return this._mwdDerived ?? (this._mwdDerived = {}), this._mwdDerived.personalCombat = t, t;
  }
  _computePersonalCombatLoadout() {
    const e = [], t = this.items.filter((m) => {
      var f;
      return ((f = m.isPersonalWeapon) == null ? void 0 : f.call(m)) ?? m.type === b.itemType.personalWeapon;
    }).map((m) => {
      var f;
      return ((f = m.getCombatProfile) == null ? void 0 : f.call(m)) ?? null;
    }).filter(Boolean), i = this.items.filter((m) => {
      var f;
      return ((f = m.isArmor) == null ? void 0 : f.call(m)) ?? m.type === b.itemType.armor;
    }).map((m) => {
      var f;
      return ((f = m.getArmorProfile) == null ? void 0 : f.call(m, { actor: this })) ?? null;
    }).filter(Boolean), s = t.filter((m) => m.equipped), r = i.filter((m) => m.equipped), n = s.filter((m) => m.isPrimary), o = r.filter((m) => m.isPrimary);
    let l = null, c = null, u = !1;
    n.length === 1 ? (c = n[0], l = c) : n.length > 1 ? (e.push("Multiple equipped primary weapons found; attack selection requires a chooser."), u = !0) : s.length === 1 ? l = s[0] : s.length > 1 ? u = !0 : l = {
      ...Ze.DEFAULT_UNARMED,
      uuid: null,
      img: null,
      item: null,
      equipped: !0,
      isPrimary: !1,
      defaultRangeBand: "close",
      isSynthetic: !0
    };
    let d = null, p = null;
    return o.length === 1 ? (d = o[0], p = this._buildActiveArmorState(d)) : o.length > 1 ? (e.push("Multiple equipped primary armor items found; using the first equipped armor."), p = r[0] ? this._buildActiveArmorState(r[0]) : null) : r.length === 1 ? p = this._buildActiveArmorState(r[0]) : r.length > 1 && (e.push("Multiple equipped armor items found without a single primary; using the first equipped armor."), p = this._buildActiveArmorState(r[0])), {
      weapons: t,
      equippedWeapons: s,
      primaryWeapon: c,
      defaultWeapon: l,
      weaponChoiceRequired: u,
      armor: i,
      equippedArmor: r,
      primaryArmor: d,
      activeArmor: p,
      warnings: e
    };
  }
  _buildActiveArmorState(e) {
    var n, o;
    if (!e) return null;
    const t = Math.max(0, Number(((n = e == null ? void 0 : e.durability) == null ? void 0 : n.max) ?? (e == null ? void 0 : e.rating) ?? 0)), i = Math.min(
      t,
      Math.max(0, Number(((o = e == null ? void 0 : e.durability) == null ? void 0 : o.current) ?? (e == null ? void 0 : e.currentArmorRating) ?? t))
    ), s = bt(e == null ? void 0 : e.mitigationByType), r = Ka(i);
    return {
      ...e,
      armorId: e.id,
      remainingDurability: i,
      currentArmorRating: i,
      baseMitigation: r,
      baseResistance: r,
      mitigationByType: s,
      typedMitigation: s,
      ratingCurrent: i,
      isDestroyed: i <= 0,
      durability: {
        current: i,
        max: t
      }
    };
  }
  async setOwnedItemEquipped(e, t) {
    var s, r, n;
    const i = this.getOwnedItem(e);
    return !i || !((s = i.isPersonalWeapon) != null && s.call(i) || (r = i.isArmor) != null && r.call(i)) ? null : this.updateEmbeddedDocuments("Item", [{
      _id: i.id,
      "system.equipped": !!t,
      "system.isPrimary": t ? !!((n = i.system) != null && n.isPrimary) : !1
    }]);
  }
  async setOwnedItemPrimary(e, t) {
    var n, o, l, c;
    const i = this.getOwnedItem(e);
    if (!i || !((n = i.isPersonalWeapon) != null && n.call(i) || (o = i.isArmor) != null && o.call(i))) return null;
    const s = [], r = !!t;
    if (r)
      for (const u of this.items.filter((d) => d.type === i.type && d.id !== i.id))
        (l = u.system) != null && l.isPrimary && s.push({ _id: u.id, "system.isPrimary": !1 });
    return s.push({
      _id: i.id,
      "system.isPrimary": r,
      "system.equipped": r ? !0 : !!((c = i.system) != null && c.equipped)
    }), this.updateEmbeddedDocuments("Item", s);
  }
  /* -------------------------------------------- */
  /* Edge API (cap + pools w/ rating + current)    */
  /* -------------------------------------------- */
  getEdgeCap() {
    var e, t, i;
    return Math.max(0, Number(((i = (t = (e = this.system) == null ? void 0 : e.attributes) == null ? void 0 : t.edge) == null ? void 0 : i.value) ?? 0));
  }
  getEdgePoolRaw(e) {
    var t, i, s;
    return ((s = (i = (t = this.system) == null ? void 0 : t.counters) == null ? void 0 : i.edgePools) == null ? void 0 : s[e]) ?? null;
  }
  /**
   * Canonical pool accessor.
   * - Character: returns raw + effective values (effective is clamped by cap)
   * - NPC: no pools; Edge attribute acts as a single “pool” (effective max/value = cap)
   * - Vehicle/Mech: safe zeros
   */
  getEdgePool(e) {
    var d, p, m, f;
    const t = this.getEdgeCap();
    if (this.type === "npc" && !this.hasEdgePools()) {
      const y = t, h = t;
      return {
        key: e,
        value: h,
        rating: y,
        effectiveValue: h,
        effectiveMax: y,
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
    const i = (m = (p = (d = this._mwdDerived) == null ? void 0 : d.edgePools) == null ? void 0 : p.pools) == null ? void 0 : m[e];
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
    const s = this.getEdgePoolRaw(e), r = Math.max(0, Number((s == null ? void 0 : s.rating) ?? 0)), n = Math.max(0, Number((s == null ? void 0 : s.value) ?? 0)), o = Math.max(0, Number(((f = Vt(this).bonusByEdgePool) == null ? void 0 : f[e]) ?? 0)), l = r + o, c = Math.min(l, t), u = Math.min(n, c);
    return {
      key: e,
      value: n,
      rating: r,
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
    var n;
    if (!this.hasEdgePools()) return;
    const i = Math.max(0, Number(((n = this.getEdgePool(e)) == null ? void 0 : n.effectiveMax) ?? 0)), s = Number(t ?? 0), r = Math.max(0, Math.min(s, i));
    return this.update({
      [`system.counters.edgePools.${e}.value`]: r
    });
  }
  /**
   * Convenience: adjust CURRENT value by delta (e.g., spend -1, award +1).
   */
  async adjustEdgePoolValue(e, t) {
    var r;
    if (!this.hasEdgePools()) return;
    const i = Math.max(0, Number(((r = this.getEdgePoolRaw(e)) == null ? void 0 : r.value) ?? 0)), s = Number(t ?? 0);
    return this.setEdgePoolValue(e, i + s);
  }
  /**
   * Set the RATING (advancement ceiling) for a pool.
   * Stores true rating (not cap-clamped), then clamps current value to new effective max.
   */
  async setEdgePoolRating(e, t) {
    var c, u;
    if (!this.hasEdgePools()) return;
    const i = this.getEdgeCap(), s = Math.max(0, Number(t ?? 0)), r = Math.max(0, Number(((c = Vt(this).bonusByEdgePool) == null ? void 0 : c[e]) ?? 0)), n = Math.min(s + r, i), o = Math.max(0, Number(((u = this.getEdgePoolRaw(e)) == null ? void 0 : u.value) ?? 0)), l = Math.min(o, n);
    return this.update({
      [`system.counters.edgePools.${e}.rating`]: s,
      [`system.counters.edgePools.${e}.value`]: l
    });
  }
  /**
   * Sheet-facing summary for rendering.
   * If `groups` is provided, returns grouped pool arrays.
   */
  getEdgePoolSummary({ groups: e } = {}) {
    var i, s, r, n;
    const t = this.getEdgeCap();
    if (this.hasEdgePools()) {
      const o = ((s = (i = this._mwdDerived) == null ? void 0 : i.edgePools) == null ? void 0 : s.pools) ?? {};
      if (e && typeof e == "object") {
        const c = Object.entries(e).map(([u, d]) => {
          const p = (d ?? []).map((m) => {
            const f = o[m] ?? this.getEdgePool(m);
            return {
              ...f,
              isEmpty: (f.effectiveValue ?? 0) <= 0,
              isCapped: (f.effectiveRating ?? f.rating ?? 0) > (f.cap ?? t)
            };
          });
          return { id: u, pools: p };
        });
        return { cap: t, hasPools: !0, groups: c, pools: [] };
      }
      const l = Object.keys(((n = (r = this.system) == null ? void 0 : r.counters) == null ? void 0 : n.edgePools) ?? {}).map((c) => {
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
    const s = Math.max(0, Number(t ?? 1));
    if (!s) return;
    let r = s;
    if (!i.skipTraitHooks) {
      const o = i.runtime ?? {}, l = {
        poolKey: e,
        amount: s,
        source: String(i.source ?? "").trim(),
        eventKey: String(i.eventKey ?? "").trim()
      }, c = Xe({
        actor: this,
        phase: "onEdgeSpend",
        facts: va({ actor: this, packet: l, phase: "onEdgeSpend", runtime: o }),
        packet: l,
        options: { runtime: o, consumeUsage: !0 }
      });
      await Kt({ actor: this, mutations: c.mutations, runtime: o }), r = Math.max(0, Number(c.packet.amount ?? s) || 0);
    }
    const n = r;
    if (n)
      return this.adjustEdgePoolValue(e, -n);
  }
  async gainEdge(e, t = 1, i = {}) {
    if (!this.hasEdgePools()) return;
    const s = Number(t ?? 0);
    if (!s) return;
    let r = s;
    if (!i.skipTraitHooks) {
      const n = i.runtime ?? {}, o = {
        poolKey: e,
        amount: s,
        source: String(i.source ?? "").trim(),
        eventKey: String(i.eventKey ?? "").trim()
      }, l = Xe({
        actor: this,
        phase: "onEdgeGain",
        facts: va({ actor: this, packet: o, phase: "onEdgeGain", runtime: n }),
        packet: o,
        options: { runtime: n, consumeUsage: !0 }
      });
      await Kt({ actor: this, mutations: l.mutations, runtime: n }), r = Number(l.packet.amount ?? s) || 0;
    }
    return this.adjustEdgePoolValue(e, r);
  }
  /* -------------------------------------------- */
  /* Document Lifecycle                            */
  /* -------------------------------------------- */
  /** @override */
  async _onUpdate(e, t, i) {
    await super._onUpdate(e, t, i), game.userId === i && (t != null && t.mwdSyncOverloadedFromEffect || foundry.utils.hasProperty(e, "system.burn.overloaded") && await this._syncOverloadedEffect(!!e.system.burn.overloaded));
  }
  _onCreateDescendantDocuments(e, t, i, s, r, n) {
    super._onCreateDescendantDocuments(e, t, i, s, r, n), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  _onUpdateDescendantDocuments(e, t, i, s, r, n) {
    super._onUpdateDescendantDocuments(e, t, i, s, r, n), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  _onDeleteDescendantDocuments(e, t, i, s, r, n) {
    super._onDeleteDescendantDocuments(e, t, i, s, r, n), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  async _syncOverloadedEffect(e) {
    await this.toggleStatusEffect("overloaded", { active: e, overlay: !1 });
  }
  async _syncOverloadedFieldFromEffects() {
    var i, s, r, n;
    const e = ((s = (i = this.statuses) == null ? void 0 : i.has) == null ? void 0 : s.call(i, "overloaded")) ?? !1, t = !!((n = (r = this.system) == null ? void 0 : r.burn) != null && n.overloaded);
    e !== t && await this.update(
      { "system.burn.overloaded": e },
      { mwdSyncOverloadedFromEffect: !0 }
    );
  }
  /* -------------------------------------------- */
  /* Condition Monitors                            */
  /* -------------------------------------------- */
  async setMonitorValue(e, t, { source: i = "unknown" } = {}) {
    var d, p, m, f, y, h;
    if (e === "burn") {
      const g = Math.max(0, Number(t) || 0);
      return this.update({ "system.burn.value": g });
    }
    if (e === "armor" && this.isCharacterLike()) {
      const g = this.getPersonalCombatLoadout({ refresh: !0 }), S = ((d = g == null ? void 0 : g.activeArmor) == null ? void 0 : d.armorId) ?? ((p = g == null ? void 0 : g.activeArmor) == null ? void 0 : p.id) ?? null, T = S ? this.items.get(S) : null;
      if (!(T != null && T.id)) return null;
      const k = Math.max(0, Number(((m = T.system) == null ? void 0 : m.rating) ?? 0) || 0), P = Math.max(0, Number(((y = (f = T.system) == null ? void 0 : f.durability) == null ? void 0 : y.max) ?? 0) || 0), I = P > 0 ? P : k, O = Math.min(Math.max(0, Number(t) || 0), I);
      return this.updateEmbeddedDocuments("Item", [{
        _id: T.id,
        "system.durability.max": I,
        "system.durability.current": O
      }]);
    }
    const s = `system.monitors.${e}`, r = Number(foundry.utils.getProperty(this, `${s}.max`)) || 0, n = Math.max(0, r), o = Math.min(Math.max(0, Number(t) || 0), n), l = { [`${s}.value`]: o }, c = this.type, u = (h = Vs == null ? void 0 : Vs[c]) == null ? void 0 : h[e];
    if (u != null && u.derived)
      for (const [g, S] of Object.entries(u.derived)) {
        const T = la == null ? void 0 : la[S.fn];
        if (typeof T != "function") continue;
        const k = zd(this, e, S.source, o);
        l[`${s}.derived.${g}`] = T(k);
      }
    return this.update(l);
  }
  _prepareMonitors() {
    var n, o, l, c;
    const e = this.system.monitors ?? {}, t = Fd(e);
    (n = this.system).derived ?? (n.derived = {}), this.system.derived.monitors = t;
    const i = Number(((o = t == null ? void 0 : t.physical) == null ? void 0 : o.penalty) ?? 0), s = Number(((l = t == null ? void 0 : t.fatigue) == null ? void 0 : l.penalty) ?? 0), r = i + s;
    (c = this.system.derived).condition ?? (c.condition = {}), this.system.derived.condition.physicalPenalty = i, this.system.derived.condition.fatiguePenalty = s, this.system.derived.condition.totalPenalty = r, this.system.derived.conditionPenalty = r;
  }
  _preparePersonalCombatDerived() {
    var n, o, l, c, u, d;
    if (!this.isCharacterLike()) return;
    const e = this.getPersonalCombatLoadout({ refresh: !0 }), t = (o = (n = this.system) == null ? void 0 : n.monitors) == null ? void 0 : o.armor;
    if (!t) return;
    const i = e.activeArmor, s = Math.max(0, Number(((l = i == null ? void 0 : i.durability) == null ? void 0 : l.max) ?? 0)), r = Math.max(0, Number((i == null ? void 0 : i.currentArmorRating) ?? ((c = i == null ? void 0 : i.durability) == null ? void 0 : c.current) ?? 0));
    t.max = s, t.value = Math.min(s, r), t.resistance = {
      default: Number((i == null ? void 0 : i.baseMitigation) ?? (i == null ? void 0 : i.baseResistance) ?? 0),
      byType: {}
    }, t.resistanceBonusByType = i != null && i.isDestroyed ? {} : (i == null ? void 0 : i.mitigationByType) ?? (i == null ? void 0 : i.typedMitigation) ?? {}, t.derived ?? (t.derived = {}), t.derived.resistance = Number((i == null ? void 0 : i.baseMitigation) ?? (i == null ? void 0 : i.baseResistance) ?? 0), t.effect = i != null && i.isDestroyed ? "Destroyed" : i ? Wd(i.mitigationByType ?? i.typedMitigation) : "", (u = this.system).derived ?? (u.derived = {}), this.system.derived.personalCombat = {
      defaultWeaponId: ((d = e.defaultWeapon) == null ? void 0 : d.id) ?? null,
      activeArmorId: (i == null ? void 0 : i.id) ?? null,
      warnings: [...e.warnings ?? []]
    };
  }
}
async function Hd({ actor: a, payload: e } = {}) {
  var h, g, S, T, k, P;
  if (!a) throw new Error("resolveSkill requires actor");
  const t = String((e == null ? void 0 : e.key) ?? "").trim(), i = et(t);
  if (!i) throw new Error(`Unknown skill: ${t}`);
  const s = a.system ?? {}, r = String((e == null ? void 0 : e.attrKey) ?? i.attribute ?? "").trim();
  if (!r) throw new Error(`Skill ${t} missing attribute key`);
  const n = Number(((g = (h = s == null ? void 0 : s.attributes) == null ? void 0 : h[r]) == null ? void 0 : g.value) ?? 0), o = Number(((T = (S = s == null ? void 0 : s.skills) == null ? void 0 : S[t]) == null ? void 0 : T.rating) ?? 0), l = Number(((P = (k = s == null ? void 0 : s.skills) == null ? void 0 : k[t]) == null ? void 0 : P.bonus) ?? 0), c = new Set(xs(s, t)), u = Xa(t, e == null ? void 0 : e.specializationKey), d = u && c.has(u.key) ? u : null, p = d ? Ya : 0, m = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : i.domains ?? [], f = Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : Number.isFinite(Number(e == null ? void 0 : e.target)) ? Number(e.target) : 5, y = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1;
  return {
    intent: "skill",
    rollType: "simple",
    title: `${i.label} (${r})`,
    subtitle: a.name ?? "Actor",
    domains: m,
    // Per-die threshold (cs>=X). Kept separate from dnHits.
    diceTarget: f,
    // DN = hits needed for success
    difficulty: { dn: y },
    edge: {
      earn: { enabled: !0, rate: 4, maxPerRoll: 1 }
    },
    pool: { attribute: n, skill: o, bonus: l, specialization: p },
    breakdown: [
      { id: "attribute", label: "Attribute", value: n },
      { id: "skill", label: "Skill", value: o },
      { id: "bonus", label: "Bonus", value: l },
      ...d ? [{
        id: "specialization",
        label: `Specialization (${d.label})`,
        value: p
      }] : []
    ],
    specialization: d ? {
      key: d.key,
      label: d.label,
      value: p,
      skillKey: t
    } : null,
    // optional extra metadata (safe to stash)
    data: {
      skillKey: t,
      attrKey: r,
      label: `${r}+${i.label}`,
      specializationKey: (d == null ? void 0 : d.key) ?? "",
      specializationLabel: (d == null ? void 0 : d.label) ?? ""
    }
  };
}
const jd = /* @__PURE__ */ new Set([
  "grit",
  "chaos",
  "insight",
  "rumor",
  "legend",
  "credibility"
]), qd = {
  grit: "physical",
  chaos: "physical",
  insight: "mental",
  rumor: "mental",
  legend: "social",
  credibility: "social"
};
async function Gd({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveEdge requires actor");
  const t = String((e == null ? void 0 : e.pool) ?? "").trim();
  if (!jd.has(t)) throw new Error(`Invalid edge pool: ${t}`);
  const i = a.getEdgePool(t), s = Math.max(0, Number((i == null ? void 0 : i.effectiveValue) ?? 0));
  return {
    intent: "edge",
    title: `Edge — ${t}`,
    subtitle: a.name ?? "Actor",
    domains: [qd[t] ?? "unknown"],
    // drop "edge" tag unless you truly want it
    // ✅ Make it directly rollable by the core roll pipeline
    target: 5,
    poolTotal: s,
    breakdown: [
      { id: "current", label: "Current", value: Number((i == null ? void 0 : i.value) ?? 0) },
      { id: "rating", label: "Rating", value: Number((i == null ? void 0 : i.rating) ?? 0) },
      { id: "cap", label: "Edge Cap", value: Number((i == null ? void 0 : i.cap) ?? 0) },
      { id: "usable", label: "Usable", value: s }
    ],
    data: { poolKey: t }
  };
}
async function Vd({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Attribute",
    intent: "attribute",
    domainTags: ["general"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function Kd({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveCommon requires actor");
  const t = String((e == null ? void 0 : e.id) ?? "").trim();
  if (!t) throw new Error("Common rolls require payload.id");
  const i = lr(t);
  if (!i) throw new Error(`Unknown common check: ${t}`);
  const s = Array.isArray(i.formula) ? i.formula : [];
  if (s.length !== 2)
    throw new Error(`Common check ${t} must define exactly two attributes.`);
  const r = s.map((c) => {
    var d, p, m;
    const u = ru(c);
    if (!u) throw new Error(`Common check ${t} uses unsupported attribute code: ${c}`);
    return {
      code: String(c).trim().toUpperCase(),
      key: u,
      label: nu(c),
      value: Number(((m = (p = (d = a.system) == null ? void 0 : d.attributes) == null ? void 0 : p[u]) == null ? void 0 : m.value) ?? 0)
    };
  }), n = r.reduce((c, u) => c + Number(u.value ?? 0), 0), o = Array.isArray(i.tags) ? [...i.tags] : [], l = Array.isArray(i.domains) ? [...i.domains] : [];
  return {
    intent: "common",
    rollType: "simple",
    title: String(i.label ?? t).trim() || t,
    subtitle: a.name ?? "Actor",
    domains: l,
    tags: o,
    formula: ou(s),
    difficulty: {
      dn: Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1
    },
    edge: {
      earn: { enabled: !0, rate: 4, maxPerRoll: 1 }
    },
    pool: {
      attribute: n,
      skill: 0,
      bonus: 0,
      specialization: 0
    },
    breakdown: r.map((c) => ({
      id: `attribute.${c.code.toLowerCase()}`,
      label: c.label,
      value: c.value
    })),
    data: {
      commonCheckId: t,
      label: String(i.label ?? t).trim() || t,
      formulaCodes: s,
      tags: o,
      attributes: r
    }
  };
}
function Yd() {
  var a;
  return Array.from(((a = game.user) == null ? void 0 : a.targets) ?? []);
}
function Qd(a) {
  var s, r, n, o;
  const e = (a == null ? void 0 : a.actor) ?? null;
  if (!e) return null;
  const t = ((s = e == null ? void 0 : e.getPersonalCombatLoadout) == null ? void 0 : s.call(e)) ?? null, i = (t == null ? void 0 : t.activeArmor) ?? null;
  return {
    tokenId: (a == null ? void 0 : a.id) ?? null,
    tokenUuid: ((r = a == null ? void 0 : a.document) == null ? void 0 : r.uuid) ?? null,
    actorId: e.id,
    actorUuid: e.uuid,
    name: e.name ?? (a == null ? void 0 : a.name) ?? "Target",
    activeArmor: i ? {
      armorId: i.id,
      rating: Number(i.ratingCurrent ?? i.rating ?? 0),
      currentArmorRating: Number(i.currentArmorRating ?? ((n = i.durability) == null ? void 0 : n.current) ?? 0),
      remainingDurability: Number(i.remainingDurability ?? ((o = i.durability) == null ? void 0 : o.current) ?? 0),
      baseMitigation: Number(i.baseMitigation ?? i.baseResistance ?? 0),
      baseResistance: Number(i.baseMitigation ?? i.baseResistance ?? 0),
      mitigationByType: { ...i.mitigationByType ?? i.typedMitigation ?? {} },
      tags: [...i.tags ?? []],
      isDestroyed: !!i.isDestroyed,
      defenseBonus: Number(i.defenseBonus ?? 0)
    } : null
  };
}
function Jd(a, e) {
  var i, s, r, n, o, l;
  if (((i = e == null ? void 0 : e.syntheticWeapon) == null ? void 0 : i.id) === "unarmed")
    return {
      ...Ze.DEFAULT_UNARMED,
      ...e.syntheticWeapon,
      isSynthetic: !0,
      defaultRangeBand: "close"
    };
  const t = ((r = (s = a.items) == null ? void 0 : s.get) == null ? void 0 : r.call(s, (e == null ? void 0 : e.weaponId) ?? "")) ?? null;
  if (!t || !(((n = t.isPersonalWeapon) == null ? void 0 : n.call(t)) ?? t.type === "personalWeapon") || !((o = t.system) != null && o.equipped))
    throw new Error("Attack requires an equipped personal weapon.");
  return ((l = t.getCombatProfile) == null ? void 0 : l.call(t, { payloadId: e == null ? void 0 : e.payloadId })) ?? null;
}
async function Xd({ actor: a, payload: e } = {}) {
  var S, T, k, P, I, O, x, j, V, K, D, N, Y, z;
  if (!a) throw new Error("resolveAttack requires actor");
  const t = Jd(a, e);
  if (!t) throw new Error("Unable to resolve weapon profile.");
  const i = et(t.skill) ?? {
    code: t.skill,
    label: t.skill || "Attack",
    attribute: "reflexes",
    domains: ["physical"]
  }, s = String(i.attribute ?? "reflexes").trim() || "reflexes", r = ((S = a.getAttributeValue) == null ? void 0 : S.call(a, s)) ?? Number(((P = (k = (T = a.system) == null ? void 0 : T.attributes) == null ? void 0 : k[s]) == null ? void 0 : P.value) ?? 0), n = ((I = a.getSkillRating) == null ? void 0 : I.call(a, t.skill)) ?? Number(((j = (x = (O = a.system) == null ? void 0 : O.skills) == null ? void 0 : x[t.skill]) == null ? void 0 : j.rating) ?? 0), o = Number(((D = (K = (V = a.system) == null ? void 0 : V.skills) == null ? void 0 : K[t.skill]) == null ? void 0 : D.bonus) ?? 0), l = new Set(xs(a.system ?? {}, t.skill)), c = Xa(t.skill, e == null ? void 0 : e.specializationKey), u = c && l.has(c.key) ? c : null, d = u ? Ya : 0, p = Number(((N = t == null ? void 0 : t.effects) == null ? void 0 : N.accuracyMod) ?? 0) || 0, m = o + p, f = String((e == null ? void 0 : e.rangeBand) ?? t.defaultRangeBand ?? "close").trim() || "close", y = Number(((Y = t == null ? void 0 : t.attackRatingBand) == null ? void 0 : Y[f]) ?? 0) || 0, h = Yd().map(Qd).filter(Boolean);
  if (h.length === 0)
    throw vd("Target at least one token to attack.", { severity: "warn" });
  const g = Number(t.ap ?? 0) + Number(((z = t == null ? void 0 : t.effects) == null ? void 0 : z.ap) ?? 0);
  return {
    intent: "attack",
    rollType: "simple",
    title: `${t.name} Attack`,
    subtitle: a.name ?? "Actor",
    domains: Array.isArray(i.domains) && i.domains.length ? i.domains : ["physical"],
    domainTags: ["combat", "attack"],
    diceTarget: Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : 5,
    difficulty: { dn: Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1 },
    edge: {
      earn: { enabled: !0, rate: 4, maxPerRoll: 1 }
    },
    pool: { attribute: r, skill: n, bonus: m, specialization: d },
    breakdown: [
      { id: "attribute", label: "Attribute", value: r },
      { id: "skill", label: i.label, value: n },
      { id: "bonus", label: "Skill Bonus", value: o },
      ...u ? [{
        id: "specialization",
        label: `Specialization (${u.label})`,
        value: d
      }] : [],
      { id: "weaponAccuracy", label: "Weapon Accuracy", value: p },
      { id: "damage", label: "Damage", value: Number(t.damage ?? 0) || 0 },
      { id: "ap", label: "AP", value: g },
      { id: "attackRating", label: `Attack Rating (${f})`, value: y }
    ],
    attack: {
      rangeBand: f,
      weapon: t,
      payload: (t == null ? void 0 : t.payload) ?? null,
      payloadState: (t == null ? void 0 : t.payloadState) ?? null,
      source: (t == null ? void 0 : t.source) ?? null,
      sourceState: (t == null ? void 0 : t.sourceState) ?? null,
      resolverKey: (t == null ? void 0 : t.resolverKey) ?? "standard",
      skill: {
        code: i.code ?? t.skill,
        label: i.label ?? t.skill,
        attribute: s,
        specialization: u ? {
          key: u.key,
          label: u.label,
          value: d
        } : null
      },
      targets: h,
      totalAp: g
    },
    specialization: u ? {
      key: u.key,
      label: u.label,
      value: d,
      skillKey: i.code ?? t.skill
    } : null
  };
}
async function Zd({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Defense",
    intent: "defense",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function em({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Resistance",
    intent: "resistance",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function tm({ actor: a } = {}) {
  var i, s, r, n, o, l;
  const e = Number(((r = (s = (i = a.system) == null ? void 0 : i.attributes) == null ? void 0 : s.reflexes) == null ? void 0 : r.value) ?? 0), t = Number(((l = (o = (n = a.system) == null ? void 0 : n.attributes) == null ? void 0 : o.edge) == null ? void 0 : l.value) ?? 0);
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
async function im({ actor: a }) {
  var i, s, r, n, o;
  const e = Number(((s = (i = a.system) == null ? void 0 : i.burn) == null ? void 0 : s.value) ?? 0);
  e < 6 && ui.notifications.warn("Overload check is only required at Burn 6+.");
  const t = Number(((o = (n = (r = a.system) == null ? void 0 : r.attributes) == null ? void 0 : n.willpower) == null ? void 0 : o.value) ?? 0);
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
const sm = {
  skill: Hd,
  edge: Gd,
  attribute: Vd,
  common: Kd,
  attack: Xd,
  defense: Zd,
  resistance: em,
  initiative: tm,
  overload: im
};
async function en({ actor: a, payload: e, event: t } = {}) {
  if (!a) throw new Error("resolveIntent requires actor");
  const i = String((e == null ? void 0 : e.intent) ?? "").trim();
  if (!i) throw new Error("resolveIntent requires payload.intent");
  const s = sm[i];
  if (!s) throw new Error(`Unsupported roll intent: ${i}`);
  const r = await s({ actor: a, payload: e, event: t });
  return am(r, { intent: i });
}
function am(a, { intent: e } = {}) {
  (!a || typeof a != "object") && (a = {}), a.intent = a.intent ?? e ?? "unknown", a.title = String(a.title ?? "Roll"), a.domains = Array.isArray(a.domains) ? a.domains : [], a.breakdown = Array.isArray(a.breakdown) ? a.breakdown : [], a.mods = Array.isArray(a.mods) ? a.mods : [];
  const t = a.pool && typeof a.pool == "object" ? a.pool : {}, i = Number(t.attribute ?? t.base ?? 0), s = Number(t.skill ?? t.rating ?? 0), r = Number(t.bonus ?? 0), n = Number(t.specialization ?? 0);
  if (![i, s, r, n].every(Number.isFinite))
    throw console.error("MWD | Invalid pool parts after intent resolution", { intent: e, ctx: a }), new Error("MWD.roll: pool parts must be numeric (attribute/skill/bonus/specialization).");
  return a.pool = {
    attribute: i,
    skill: s,
    bonus: r,
    specialization: n,
    totalBase: i + s + r + n
  }, a.rollType = a.rollType ?? "simple", a.diceTarget = Number.isFinite(a.diceTarget) ? a.diceTarget : Number(a.target ?? 5), a.difficulty && typeof a.difficulty == "object" ? a.difficulty.dn = Number(a.difficulty.dn ?? 0) : Number.isFinite(a.dn) && (a.difficulty = { dn: Number(a.dn) }), a.breakdown.length || (a.breakdown = [
    { id: "attribute", label: "Attribute", value: i },
    { id: "skill", label: "Skill", value: s },
    { id: "bonus", label: "Bonus", value: r },
    ...n ? [{ id: "specialization", label: "Specialization", value: n }] : []
  ]), a;
}
var vi;
class rm {
  constructor() {
    ye(this, vi, /* @__PURE__ */ new Map());
  }
  register(e) {
    if (!(e != null && e.id) || typeof e.collect != "function")
      throw new Error("Invalid ModifierProvider: missing id or collect()");
    B(this, vi).has(e.id) || B(this, vi).set(e.id, e);
  }
  async collectAll(e) {
    const t = [];
    for (const i of B(this, vi).values()) {
      const s = await i.collect(e);
      if (console.log("MWD | provider", i.id, "returned", s), !!(s != null && s.length))
        for (const r of s)
          r && typeof r.label == "string" && typeof r.value == "number" && typeof r.source == "string" ? t.push(r) : console.warn("MWD | DROPPED MOD (bad shape)", i.id, r);
    }
    return t;
  }
}
vi = new WeakMap();
const pt = new rm();
function nm(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function om(a) {
  const e = nm(a == null ? void 0 : a.value);
  return e === null ? null : { ...a, value: e };
}
async function tn({
  actor: a,
  rollType: e,
  skillId: t,
  domains: i,
  // NEW (optional)
  payload: s,
  resolved: r,
  context: n
} = {}) {
  const o = { actor: a, rollType: e, skillId: t, domains: i, payload: s, resolved: r, context: n }, l = await pt.collectAll(o);
  console.log("MWD|condition collect called", o.rollType);
  let c = [];
  for (const d of l ?? []) {
    const p = om(d);
    if (!p) {
      console.warn("MWD | Dropping invalid modifier value", d);
      continue;
    }
    c.push(p);
  }
  Array.isArray(i) && i.length && (c = c.filter((d) => !d.domain || i.includes(d.domain)));
  const u = c.reduce((d, p) => d + p.value, 0);
  return { mods: c, total: u };
}
function lm({
  actor: a,
  payload: e,
  ctx: t,
  roll: i,
  target: s,
  pool: r,
  mods: n = [],
  modTotal: o = 0,
  hits: l = null,
  ones: c = null,
  edge: u = null,
  outcomeModel: d = null
} = {}) {
  var j, V, K;
  if (!a) throw new Error("buildResolved requires actor");
  if (!(e != null && e.intent)) throw new Error("buildResolved requires payload.intent");
  if (!i) throw new Error("buildResolved requires roll");
  const p = foundry.utils.randomID(), m = (j = i.dice) == null ? void 0 : j[0], y = (Array.isArray(m == null ? void 0 : m.results) ? m.results : []).map((D, N) => {
    const Y = `pool:${N}`, z = Number(D.result), ge = !!D.success;
    return {
      ref: Y,
      face: z,
      isSuccess: ge,
      isFailure: !ge,
      tooltip: ge ? `Die ${N + 1}: ${z} (Success vs TN ${Number(s ?? 5)})` : `Die ${N + 1}: ${z} (Failure vs TN ${Number(s ?? 5)})`
    };
  }), h = y.filter((D) => D.isFailure).map((D) => D.ref), g = [{
    id: "pool",
    label: "Pool",
    faces: 6,
    termIndex: 0,
    // informational only
    dice: y
  }], S = (Array.isArray(n) ? n : []).map((D, N) => {
    const Y = Number(D.value ?? 0), z = `mod:${um(D.label ?? "mod")}:${N}`;
    return {
      id: D.id ?? z,
      label: D.label ?? "Modifier",
      value: Y,
      domain: D.domain ?? null,
      source: D.source ?? null,
      tooltip: D.tooltip ?? `${D.label ?? "Modifier"} ${sn(Y)}`
    };
  }), T = S.map((D) => D.id), P = (Array.isArray(t == null ? void 0 : t.breakdown) ? t.breakdown : []).map((D) => ({
    id: `pool.${D.id ?? foundry.utils.randomID()}`,
    label: D.label ?? D.id ?? "Row",
    value: Number(D.value ?? 0),
    tooltip: `Contribution from ${D.label ?? D.id}: ${Number(D.value ?? 0)}`
  }));
  P.push({
    id: "mods.total",
    label: "Mods",
    value: Number(o ?? 0),
    modIds: T,
    tooltip: S.length ? S.map((D) => `${D.label}: ${sn(D.value)}`).join(`
`) : "No roll-time modifiers."
  }), P.push({
    id: "pool.final",
    label: "Final Pool",
    value: Number(r ?? 0),
    tooltip: `Final dice pool rolled: ${Number(r ?? 0)}d6`
  });
  const I = Number.isFinite(Number(l)) ? Number(l) : y.filter((D) => D.isSuccess).length, O = Number.isFinite(Number(c)) ? Number(c) : y.filter((D) => D.face === 1).length, x = cm(u, { payload: e });
  return {
    version: 2,
    id: p,
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
    // Minimal context snapshot so chat-actions can recompute interpretation
    // after post-spend rerolls mutate hits.
    ctxSnapshot: {
      rollType: (t == null ? void 0 : t.rollType) ?? "simple",
      difficulty: (t == null ? void 0 : t.difficulty) ?? null,
      opposed: (t == null ? void 0 : t.opposed) ?? null,
      net: (t == null ? void 0 : t.net) ?? null,
      edge: {
        pool: ((V = t == null ? void 0 : t.edge) == null ? void 0 : V.pool) ?? null,
        earn: ((K = t == null ? void 0 : t.edge) == null ? void 0 : K.earn) ?? null
      }
    },
    // Roll + dice
    roll: {
      json: i.toJSON(),
      formula: i.formula,
      target: Number(s ?? 5),
      pool: Number(r ?? 0),
      diceGroups: g,
      failureDiceRefs: h
    },
    // Outcome numbers
    outcome: {
      hits: I,
      ones: O
    },
    // New: engine-interpreted outcome (margin/net/converted/edgeEarned/etc
    outcomeModel: d,
    // Breakdown + modifiers
    breakdownRows: P,
    modifiers: {
      applied: S,
      total: Number(o ?? 0)
    },
    // Edge snapshot / affordances
    edge: x
  };
}
function cm(a, { payload: e } = {}) {
  var f, y, h, g, S, T, k, P, I, O, x, j, V, K;
  const t = !!((f = e == null ? void 0 : e.edge) != null && f.enabled), i = (a == null ? void 0 : a.domain) ?? null, s = (a == null ? void 0 : a.pools) ?? null, r = ((y = a == null ? void 0 : a.pre) == null ? void 0 : y.poolKey) ?? ((g = (h = e == null ? void 0 : e.edge) == null ? void 0 : h.pre) == null ? void 0 : g.poolKey) ?? (t ? ((S = e == null ? void 0 : e.edge) == null ? void 0 : S.poolKey) ?? null : null), n = Number(((T = a == null ? void 0 : a.pre) == null ? void 0 : T.spent) ?? ((P = (k = e == null ? void 0 : e.edge) == null ? void 0 : k.pre) == null ? void 0 : P.spent) ?? (t ? 1 : 0)) ? 1 : 0, o = ((I = a == null ? void 0 : a.post) == null ? void 0 : I.poolKey) ?? ((x = (O = e == null ? void 0 : e.edge) == null ? void 0 : O.post) == null ? void 0 : x.poolKey) ?? null, l = Number(((j = a == null ? void 0 : a.post) == null ? void 0 : j.spent) ?? ((K = (V = e == null ? void 0 : e.edge) == null ? void 0 : V.post) == null ? void 0 : K.spent) ?? 0) ? 1 : 0, c = (s == null ? void 0 : s.a) ?? null, u = (s == null ? void 0 : s.b) ?? null, d = [c, u].filter(Boolean);
  let p = [c, u].filter(Boolean);
  n && r && (p = p.filter((D) => D !== r));
  const m = {
    canSpendPre: d.length > 0 && !n,
    // spending pre after roll is not a thing
    canSpendPost: p.length > 0 && !l,
    canPostRerollFailures: p.length > 0 && !l
  };
  return {
    domain: i,
    pools: s ? { a: c, b: u } : null,
    pre: { poolKey: r, spent: n },
    post: { poolKey: o, spent: l },
    allowed: {
      prePools: d,
      postPools: p
    },
    availableActions: m
  };
}
function sn(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function um(a) {
  return String(a).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function dm(a, e) {
  var c, u, d, p, m, f, y, h, g;
  const t = a ?? {}, i = Array.isArray((c = t == null ? void 0 : t.modifiers) == null ? void 0 : c.applied) ? t.modifiers.applied : [], s = Number(((u = t == null ? void 0 : t.modifiers) == null ? void 0 : u.total) ?? 0);
  if (i.length) {
    const S = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((T) => T.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${i.map((T) => `${T.label} ${an(T.value)}`).join(", ")} (Total ${an(s)})`,
      title: (S == null ? void 0 : S.tooltip) ?? ""
    });
  }
  const r = (t == null ? void 0 : t.edge) ?? null, n = Array.isArray((d = t == null ? void 0 : t.roll) == null ? void 0 : d.failureDiceRefs) ? t.roll.failureDiceRefs : [], o = !!((p = r == null ? void 0 : r.availableActions) != null && p.canPostRerollFailures), l = Array.isArray((m = r == null ? void 0 : r.allowed) == null ? void 0 : m.postPools) ? r.allowed.postPools : [];
  if (r != null && r.domain && (e.edge = {
    domain: r.domain,
    earned: ((f = t == null ? void 0 : t.outcomeModel) == null ? void 0 : f.edgeEarned) ?? null,
    preSpent: Number(((y = r == null ? void 0 : r.pre) == null ? void 0 : y.spent) ?? 0),
    postSpent: Number(((h = r == null ? void 0 : r.post) == null ? void 0 : h.spent) ?? 0),
    canPost: o && n.length > 0 && l.length > 0,
    failureCount: n.length,
    postPools: l
  }, e.metaRows.push({
    text: `Edge: ${r.domain} • pre ${e.edge.preSpent} • post ${e.edge.postSpent}`,
    title: ""
  })), (g = e.edge) != null && g.canPost) {
    e.footerRows.push({
      text: `Post-spend: Reroll ${e.edge.failureCount} failure${e.edge.failureCount === 1 ? "" : "s"}`
    });
    for (const S of e.edge.postPools)
      e.actions.push({
        action: "edgePostReroll",
        label: `Spend ${S}`,
        dataset: { "pool-key": S },
        cssClass: "mwd-edge-post"
      });
  }
}
function an(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function mm(a, e) {
  var m, f, y, h, g, S, T, k, P, I, O, x, j, V, K, D;
  const t = a ?? {}, i = (t == null ? void 0 : t.attackResult) ?? null;
  if (!i) return;
  const s = Array.isArray(i == null ? void 0 : i.results) ? i.results : [], r = (i == null ? void 0 : i.summary) ?? pm(s), n = Array.isArray((m = t == null ? void 0 : t.modifiers) == null ? void 0 : m.applied) ? t.modifiers.applied : [], o = Number(((f = t == null ? void 0 : t.modifiers) == null ? void 0 : f.total) ?? 0);
  if (n.length) {
    const N = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((Y) => Y.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${n.map((Y) => `${Y.label} ${ms(Y.value)}`).join(", ")} (Total ${ms(o)})`,
      title: (N == null ? void 0 : N.tooltip) ?? ""
    });
  }
  const l = (t == null ? void 0 : t.edge) ?? null, c = Array.isArray((y = t == null ? void 0 : t.roll) == null ? void 0 : y.failureDiceRefs) ? t.roll.failureDiceRefs : [], u = !!((h = l == null ? void 0 : l.availableActions) != null && h.canPostRerollFailures), d = Array.isArray((g = l == null ? void 0 : l.allowed) == null ? void 0 : g.postPools) ? l.allowed.postPools : [];
  if (l != null && l.domain && (e.edge = {
    domain: l.domain,
    earned: ((S = t == null ? void 0 : t.outcomeModel) == null ? void 0 : S.edgeEarned) ?? null,
    preSpent: Number(((T = l == null ? void 0 : l.pre) == null ? void 0 : T.spent) ?? 0),
    postSpent: Number(((k = l == null ? void 0 : l.post) == null ? void 0 : k.spent) ?? 0),
    canPost: u && c.length > 0 && d.length > 0,
    failureCount: c.length,
    postPools: d
  }, e.metaRows.push({
    text: `Edge: ${l.domain} | pre ${e.edge.preSpent} | post ${e.edge.postSpent}`,
    title: ""
  })), (P = e.edge) != null && P.canPost) {
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
  const p = String((r == null ? void 0 : r.overallOutcome) ?? "").trim();
  e.outcomeText = s.length > 1 ? `ATTACK ${r.hits} HIT / ${r.grazes} GRAZE / ${r.misses} MISS` : p === "hit" ? "HIT!" : p === "graze" ? "GRAZE!" : "MISS!", e.metaRows.push({
    text: `Targets: ${s.length || 0}`,
    title: ""
  });
  for (const N of s)
    e.metaRows.push({
      text: `${((I = N == null ? void 0 : N.target) == null ? void 0 : I.name) ?? "Target"}: ${String((N == null ? void 0 : N.outcome) ?? "miss").toUpperCase()} | CQ ${ms(((O = N == null ? void 0 : N.cq) == null ? void 0 : O.value) ?? 0)} | Net ${Number((N == null ? void 0 : N.netHits) ?? 0)}`,
      title: ""
    });
  for (const N of s) {
    const Y = (N == null ? void 0 : N.damage) ?? null;
    Y && (N == null ? void 0 : N.outcome) !== "miss" && e.footerRows.push({
      text: `${((x = N == null ? void 0 : N.target) == null ? void 0 : x.name) ?? "Target"}: ${Y.damageTypeLabel} ${ms(Y.effectiveWeaponDamage)} weapon${Y.netHits ? ` + ${Y.netHits} net` : ""}`,
      title: ""
    });
    const z = (N == null ? void 0 : N.damageResult) ?? null;
    z != null && z.ok && !(z != null && z.skipped) ? (e.footerRows.push({
      text: `${z.actorName ?? ((j = N == null ? void 0 : N.target) == null ? void 0 : j.name) ?? "Target"}: Applied ${Number(z.finalDamage ?? z.appliedDelta ?? 0)}`,
      title: ""
    }), z.beforeLabel && z.afterLabel && e.footerRows.push({
      text: `${z.actorName ?? ((V = N == null ? void 0 : N.target) == null ? void 0 : V.name) ?? "Target"} Track: ${z.beforeLabel} -> ${z.afterLabel}`,
      title: ""
    }), z.usedArmor && z.mitigation && e.footerRows.push({
      text: `${z.actorName ?? ((K = N == null ? void 0 : N.target) == null ? void 0 : K.name) ?? "Target"} Mitigation: ${Number(z.mitigation.baseMitigation ?? 0)} + ${Number(z.mitigation.typeMitigationMod ?? 0)} - ${Number(z.effectiveAp ?? 0)} = ${Number(z.mitigation.netResistance ?? 0)}`,
      title: ""
    })) : z != null && z.reason && e.footerRows.push({
      text: `${((D = N == null ? void 0 : N.target) == null ? void 0 : D.name) ?? "Target"}: ${z.reason}`,
      title: ""
    });
  }
}
function pm(a = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of a)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
function ms(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function fm(a, e) {
  var c;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, s = (i == null ? void 0 : i.net) ?? null;
  if (!s) return;
  e.net = s;
  const r = Number((s == null ? void 0 : s.converted) ?? 0), n = Number((s == null ? void 0 : s.value) ?? 0), o = Number((s == null ? void 0 : s.rate) ?? 4);
  e.metaRows.push({
    text: `Net: ${n} • Converted: ${r} • Rate: ${o}`,
    title: ""
  });
  const l = ((c = i == null ? void 0 : i.edgeEarned) == null ? void 0 : c.amount) > 0 ? i.edgeEarned : null;
  l && e.footerRows.push({
    text: `Edge Earned: +${l.amount}${l.pool ? ` (${l.pool})` : ""}`,
    title: l.reason ?? ""
  });
}
function hm(a, e) {
  var l, c, u, d;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, s = Number(((l = i == null ? void 0 : i.attacker) == null ? void 0 : l.successes) ?? (i == null ? void 0 : i.attackerHits) ?? NaN), r = Number(((c = i == null ? void 0 : i.defender) == null ? void 0 : c.successes) ?? (i == null ? void 0 : i.defenderHits) ?? NaN), n = Number((i == null ? void 0 : i.netHits) ?? (i == null ? void 0 : i.net) ?? NaN);
  Number.isFinite(s) && Number.isFinite(r) && e.metaRows.push({ text: `Opposed: Att ${s} vs Def ${r} • Net ${Number.isFinite(n) ? n : s - r}` }), (u = t == null ? void 0 : t.incoming) != null && u.label && (e.incoming = { label: t.incoming.label, value: t.incoming.value ?? "" }, e.footerRows.push({ text: `Incoming: ${e.incoming.label} ${e.incoming.value}` }));
  const o = ((d = i == null ? void 0 : i.edgeEarned) == null ? void 0 : d.amount) > 0 ? i.edgeEarned : null;
  o && e.footerRows.push({ text: `Edge Earned: +${o.amount}${o.pool ? ` (${o.pool})` : ""}` });
}
function gm(a, e) {
  var c;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, s = (i == null ? void 0 : i.extended) ?? null;
  if (!s) return;
  e.extended = s;
  const r = Number((s == null ? void 0 : s.progress) ?? 0), n = Number((s == null ? void 0 : s.target) ?? 0), o = Number((s == null ? void 0 : s.remaining) ?? Math.max(0, n - r));
  e.metaRows.push({
    text: `Extended: ${r}/${n} (Remaining ${o})`,
    title: ""
  }), s != null && s.completed && e.footerRows.push({ text: `Completed in ${Number((s == null ? void 0 : s.rounds) ?? (s == null ? void 0 : s.attempts) ?? 0) || "?"} attempts.` });
  const l = ((c = i == null ? void 0 : i.edgeEarned) == null ? void 0 : c.amount) > 0 ? i.edgeEarned : null;
  l && e.footerRows.push({ text: `Edge Earned: +${l.amount}${l.pool ? ` (${l.pool})` : ""}` });
}
const ym = {
  skill: dm,
  attack: mm,
  net: fm,
  opposed: hm,
  extended: gm
  // defense: enhanceDefense,
  // edge: enhanceEdge,
};
async function Io({ resolved: a } = {}) {
  const e = a ?? {}, t = bm(e), i = ym[t.intent];
  return typeof i == "function" && i(e, t), await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-roll-card",
    t
  );
}
function bm(a) {
  var m, f, y, h, g, S, T, k, P, I, O, x;
  const e = a ?? {}, t = Number(((m = e == null ? void 0 : e.roll) == null ? void 0 : m.target) ?? 5), i = Number(((y = (f = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : f.difficulty) == null ? void 0 : y.dn) ?? 0), s = Number(((h = e == null ? void 0 : e.roll) == null ? void 0 : h.pool) ?? 0), r = Number(((g = e == null ? void 0 : e.outcome) == null ? void 0 : g.hits) ?? 0), n = (e == null ? void 0 : e.outcomeModel) ?? {}, o = typeof n.passed == "boolean" ? n.passed : r >= i, l = Number.isFinite(Number(n.margin)) ? Number(n.margin) : r - i, c = n.tier ?? null, u = Array.isArray(e == null ? void 0 : e.breakdownRows) ? e.breakdownRows.map((j) => `${j.label}: ${j.value}`).join(`
`) : "", d = {
    header: { left: (e == null ? void 0 : e.title) ?? "Roll", right: (e == null ? void 0 : e.subtitle) ?? "" },
    formula: String((e == null ? void 0 : e.formula) ?? "").trim(),
    intent: (e == null ? void 0 : e.intent) ?? "unknown",
    domains: Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [],
    tn: t,
    dn: i,
    pool: s,
    hits: r,
    passed: o,
    margin: l,
    tier: c,
    breakdownTooltip: u,
    metaRows: [],
    actions: [],
    footerRows: [],
    incoming: null,
    edge: null,
    net: null,
    opposed: null,
    extended: null
  }, p = (e == null ? void 0 : e.attack) ?? null;
  if ((S = e == null ? void 0 : e.specialization) != null && S.label && d.metaRows.push({
    text: `Specialization: ${e.specialization.label} (+${Number(e.specialization.value ?? 0)})`,
    title: ""
  }), (T = p == null ? void 0 : p.weapon) != null && T.name) {
    const j = String((p == null ? void 0 : p.rangeBand) ?? "").trim(), V = String(((k = p == null ? void 0 : p.weapon) == null ? void 0 : k.damageTypeLabel) ?? ((P = p == null ? void 0 : p.weapon) == null ? void 0 : P.damageType) ?? "").trim(), K = String(((I = p == null ? void 0 : p.payload) == null ? void 0 : I.label) ?? ((O = p == null ? void 0 : p.weapon) == null ? void 0 : O.payloadLabel) ?? "").trim();
    d.metaRows.push({
      text: `Weapon: ${p.weapon.name}${j ? ` • Range: ${j}` : ""}${V ? ` • Type: ${V}` : ""}${K ? ` • Payload: ${K}` : ""}`,
      title: ""
    }), (x = p == null ? void 0 : p.sourceState) != null && x.isTracked && d.footerRows.push({
      text: `Source: ${Number(p.sourceState.current ?? 0)}/${Number(p.sourceState.max ?? 0)}`,
      title: ""
    });
  }
  return d;
}
function be(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
function ca(a, e = 0, t = Number.POSITIVE_INFINITY) {
  const i = be(a, e);
  return Math.max(e, Math.min(t, i));
}
function Oo(a, e = 1) {
  var i;
  const t = be((i = a == null ? void 0 : a.difficulty) == null ? void 0 : i.dn, be(e, 1));
  return Math.max(0, t);
}
function Sm(a, e) {
  return Math.max(0, be(a, 0) - be(e, 0));
}
function Am({ convert: a, remainder: e, rate: t = 4 } = {}) {
  const i = Math.max(0, be(e, 0)), s = Math.max(1, be(t, 4)), r = Math.max(0, be(a, 0)), n = Math.floor(r / s) * s;
  return Math.min(i, n);
}
function dr(a, { rate: e = 4, maxPerRoll: t = Number.POSITIVE_INFINITY } = {}) {
  const i = Math.max(1, be(e, 4)), s = Math.floor(Math.max(0, be(a, 0)) / i), r = Number.isFinite(t) ? Math.max(0, be(t, 0)) : Number.POSITIVE_INFINITY;
  return { amount: Math.min(s, r), rate: i };
}
function mr(a) {
  var i;
  const e = ((i = a == null ? void 0 : a.edge) == null ? void 0 : i.earn) ?? {};
  return {
    enabled: !!(e != null && e.enabled),
    rate: Math.max(1, be(e == null ? void 0 : e.rate, 4)),
    maxPerRoll: (e == null ? void 0 : e.maxPerRoll) ?? Number.POSITIVE_INFINITY
  };
}
function Rs(a) {
  var t;
  const e = (t = a == null ? void 0 : a.edge) == null ? void 0 : t.pool;
  return e ? String(e) : null;
}
function wm(a) {
  let e = 0, t = 0;
  const i = (s) => {
    if (!s) return;
    const r = s == null ? void 0 : s.results;
    if (Array.isArray(r))
      for (const o of r) {
        if ((o == null ? void 0 : o.active) === !1) continue;
        const l = Number(o == null ? void 0 : o.result);
        Number.isFinite(l) && (e += 1, l === 1 && (t += 1));
      }
    const n = s == null ? void 0 : s.terms;
    if (Array.isArray(n))
      for (const o of n) i(o);
    if (Array.isArray(s))
      for (const o of s) i(o);
  };
  return i(a), { dice: e, ones: t };
}
function _o(a, e) {
  if (be(a, 0) !== 0) return !1;
  const { dice: t, ones: i } = wm(e);
  return t <= 0 ? !1 : i >= Math.ceil(t / 2);
}
function Tm(a, e, t = 4) {
  return !!(a && be(e, 0) >= be(t, 4));
}
function rn(a, e) {
  const t = be(e == null ? void 0 : e.successes, 0), i = Oo(a, 1), s = t >= i, r = t - i, n = Tm(s, r, 4), o = _o(t, e == null ? void 0 : e.raw), l = mr(a), c = l.maxPerRoll ?? 1, u = l.enabled && r >= l.rate ? (() => {
    const { amount: p, rate: m } = dr(r, { rate: l.rate, maxPerRoll: c }), f = Rs(a);
    return p > 0 ? { amount: p, pool: f, reason: "net4", details: { margin: r, rate: m } } : null;
  })() : null;
  return {
    rollType: "simple",
    passed: s,
    successes: t,
    difficulty: { dn: i },
    margin: r,
    criticalSuccess: n,
    criticalFailure: o,
    tier: n ? "criticalSuccess" : o ? "criticalFailure" : s ? "success" : "failure",
    edgeEarned: u
  };
}
function km(a, e, t) {
  var p, m;
  const i = be(e == null ? void 0 : e.successes, 0), s = be(t == null ? void 0 : t.successes, 0), r = !!((p = a == null ? void 0 : a.opposed) != null && p.net), n = String(((m = a == null ? void 0 : a.opposed) == null ? void 0 : m.dnTies) ?? "stalemate");
  let o = null, l = !1;
  r ? (o = i - s, o > 0 ? l = !0 : o < 0 ? l = !1 : n === "attackerWins" ? l = !0 : l = !1) : i > s ? l = !0 : i < s ? l = !1 : n === "attackerWins" ? l = !0 : l = !1;
  const c = mr(a), u = c.maxPerRoll ?? 1, d = c.enabled && r && typeof o == "number" && o >= c.rate ? (() => {
    const { amount: f, rate: y } = dr(o, { rate: c.rate, maxPerRoll: u }), h = Rs(a);
    return f > 0 ? { amount: f, pool: h, reason: "net4", details: { netHits: o, rate: y } } : null;
  })() : null;
  return {
    rollType: "opposed",
    passed: l,
    successes: i,
    opposed: {
      attacker: i,
      defender: s,
      netEnabled: r,
      netHits: r ? o : void 0,
      tiePolicy: n
    },
    edgeEarned: d
  };
}
function vm(a, e) {
  var y, h, g;
  const t = be(e == null ? void 0 : e.successes, 0), i = Oo(a, 1), s = t >= i, r = _o(t, e == null ? void 0 : e.raw), n = Sm(t, i), o = ((y = a == null ? void 0 : a.net) == null ? void 0 : y.convert) ?? ((h = a == null ? void 0 : a.allocation) == null ? void 0 : h.convert) ?? 0, l = mr(a), c = l.rate, u = Am({ convert: o, remainder: n, rate: c }), d = n - u, p = l.enabled && u >= c ? (() => {
    const { amount: S } = dr(u, { rate: c, maxPerRoll: l.maxPerRoll }), T = Rs(a);
    return S > 0 ? { amount: S, pool: T, reason: "convert4", details: { converted: u, rate: c } } : null;
  })() : null, m = r ? { amount: 1, pool: Rs(a), reason: "critFail", details: { onesRule: "halfOrMoreOnes" } } : null, f = [];
  return p && f.push(p), m && f.push(m), f.length === 0 || (f.length === 1 ? f[0] : (f.reduce((S, T) => S + (Number(T == null ? void 0 : T.amount) || 0), 0), (g = f[0]) == null || g.pool)), {
    rollType: "net",
    passed: s,
    successes: t,
    difficulty: { dn: i },
    criticalFailure: r,
    tier: r ? "criticalFailure" : s ? "success" : "failure",
    net: {
      remainder: n,
      convertRequested: be(o, 0),
      converted: u,
      value: d,
      // the actual net effect magnitude you apply (+net dice, etc.)
      rate: c,
      canConvert: n >= c
    },
    edgeEarned: p
  };
}
function Mm(a, e) {
  var o, l, c, u;
  const t = be(e == null ? void 0 : e.successes, 0), i = ca((o = a == null ? void 0 : a.extended) == null ? void 0 : o.target, 1, 1e4), s = ca((l = a == null ? void 0 : a.extended) == null ? void 0 : l.accumulated, 0, 1e4), r = ca(s + t, 0, 1e4), n = r >= i;
  return {
    rollType: "extended",
    passed: n,
    successes: t,
    extended: {
      target: i,
      accumulated: s,
      nextAccumulated: r,
      remaining: Math.max(0, i - r),
      completed: n,
      interval: ((c = a == null ? void 0 : a.extended) == null ? void 0 : c.interval) ?? null,
      failureLimit: ((u = a == null ? void 0 : a.extended) == null ? void 0 : u.failureLimit) ?? null
    },
    // NOTE: Edge earn rules for extended are intentionally omitted per your earlier constraint.
    edgeEarned: null
  };
}
function Em(a, e, t = null) {
  var s;
  switch (String((a == null ? void 0 : a.rollType) ?? "simple")) {
    case "simple":
      return rn(a, e);
    case "opposed":
      return km(a, e, t);
    case "net":
      return vm(a, e);
    case "extended":
      return Mm(a, e);
    default: {
      const r = {
        ...a,
        difficulty: { dn: Number(((s = a == null ? void 0 : a.difficulty) == null ? void 0 : s.dn) ?? 1) || 1 }
      };
      return rn(r, e);
    }
  }
}
const { ApplicationV2: Cm, HandlebarsApplicationMixin: Pm } = foundry.applications.api;
function Nm(a, e = -3, t = 3) {
  const i = [], s = "../img/dice";
  for (let r = e; r <= t; r++) {
    const n = Math.abs(r), o = n === 0 ? `${s}/BlankDice.webp` : `${s}/D6_${n}.svg`;
    i.push({
      value: r,
      abs: n,
      icon: o,
      active: r === a,
      neg: r < 0,
      pos: r > 0,
      zero: r === 0,
      title: r === 0 ? "0 (neutral)" : r < 0 ? `${r} penalty` : `+${r} bonus`
    });
  }
  return i;
}
function nn(a) {
  return (Array.isArray(a) ? a : []).map((t) => ({
    id: (t == null ? void 0 : t.id) ?? foundry.utils.randomID(),
    label: typeof (t == null ? void 0 : t.label) == "string" ? t.label : "Manual",
    value: Number((t == null ? void 0 : t.value) ?? 0)
  }));
}
function ua(a, e) {
  const t = a == null ? void 0 : a.toggles;
  return t && typeof t == "object" && e in t ? !!t[e] : !!(a != null && a[e]);
}
function Rm(a, e) {
  a.useEdge = !!e.useEdge, a.takeRisks = !!e.takeRisks, a.opponentRoll = !!e.opponentRoll, a.toggles = a.toggles && typeof a.toggles == "object" ? a.toggles : {}, a.toggles.useEdge = !!e.useEdge, a.toggles.takeRisks = !!e.takeRisks, a.toggles.opponentRoll = !!e.opponentRoll;
}
function on(a, e, t) {
  const i = String(t ?? "").trim(), s = i ? Rl(e, i) : "";
  if (i && s) {
    a.specializationKey = i, a.specializationLabel = s;
    return;
  }
  delete a.specializationKey, delete a.specializationLabel;
}
function Dm(a) {
  const e = Array.isArray(a == null ? void 0 : a.breakdown) ? a.breakdown : [], t = (i) => {
    var s;
    return Number(((s = e.find((r) => (r == null ? void 0 : r.id) === i)) == null ? void 0 : s.value) ?? 0);
  };
  return {
    attribute: t("attribute"),
    skill: t("skill"),
    bonus: t("bonus"),
    specialization: t("specialization")
  };
}
var He;
const Te = class Te extends Pm(Cm) {
  constructor({ actor: t, baseContext: i, initialState: s = null, options: r = {} }) {
    var c, u;
    super(r);
    ye(this, He, null);
    /** @type {{ baseContext: any, state: any }} */
    R(this, "_mwd", { baseContext: null, state: null });
    this.actor = t, this._mwd.baseContext = i ?? {};
    const n = foundry.utils.deepClone(this._mwd.baseContext.payload ?? {}), o = nn(n.manualModifiers);
    this._mwd.state = foundry.utils.mergeObject(
      {
        payload: n,
        manual: o,
        toggles: {
          useEdge: ua(n, "useEdge"),
          takeRisks: ua(n, "takeRisks"),
          opponentRoll: ua(n, "opponentRoll")
        }
      },
      s ?? {},
      { inplace: !1, insertKeys: !0, insertValues: !0, overwrite: !0 }
    );
    const l = String(((u = (c = n == null ? void 0 : n.edge) == null ? void 0 : c.pre) == null ? void 0 : u.poolKey) ?? "").trim() || null;
    this._mwd.state.edge = {
      prePoolKey: l
    };
  }
  async wait() {
    return new Promise((t) => {
      Re(this, He, t), this.render(!0);
    });
  }
  async close(t = {}) {
    if (B(this, He)) {
      const i = B(this, He);
      Re(this, He, null), i(null);
    }
    return super.close(t);
  }
  /* --------------------------- */
  /* Prepare Context             */
  /* --------------------------- */
  async _prepareContext(t) {
    var j, V, K, D, N, Y, z, ge, _e, Le, Ue, At, wt, Tt, kt, vt, Mt, Et, Ct, Pt, Nt, it, Rt, Dt, It, Ot, _t, Lt, $t, A, C, H, se, ae, me, Se, ve;
    const i = this._mwd.baseContext ?? {}, s = this._mwd.state ?? {}, r = Number.isFinite(Number((j = s == null ? void 0 : s.payload) == null ? void 0 : j.dn)) ? Number(s.payload.dn) : Number.isFinite(Number(i == null ? void 0 : i.dn)) ? Number(i.dn) : Number.isFinite(Number((K = (V = i == null ? void 0 : i.resolved) == null ? void 0 : V.difficulty) == null ? void 0 : K.dn)) ? Number(i.resolved.difficulty.dn) : 1, n = (i == null ? void 0 : i.intent) ?? "skill";
    let o, l;
    const c = Array.isArray(s.manual) ? s.manual.reduce((U, _) => U + Number((_ == null ? void 0 : _.value) || 0), 0) : 0;
    if (n === "edge") {
      const U = (i == null ? void 0 : i.resolved) ?? {}, _ = Array.isArray(U.breakdown) ? U.breakdown : [], Q = (pe) => {
        var Ne;
        return Number(((Ne = _.find((es) => es.id === pe)) == null ? void 0 : Ne.value) ?? 0);
      }, Ce = Number(((D = U == null ? void 0 : U.pool) == null ? void 0 : D.attribute) ?? 0);
      o = {
        pool: Ce,
        rating: Q("rating"),
        cap: Q("cap"),
        modifiers: Number(((N = i == null ? void 0 : i.dice) == null ? void 0 : N.modifiers) ?? 0)
      }, l = Math.max(0, Ce + o.modifiers + c);
    } else {
      o = {
        attribute: Number(((Y = i == null ? void 0 : i.dice) == null ? void 0 : Y.attribute) ?? 0),
        skill: Number(((z = i == null ? void 0 : i.dice) == null ? void 0 : z.skill) ?? 0),
        bonus: Number(((ge = i == null ? void 0 : i.dice) == null ? void 0 : ge.bonus) ?? 0),
        specialization: Number(((_e = i == null ? void 0 : i.dice) == null ? void 0 : _e.specialization) ?? 0),
        modifiers: Number(((Le = i == null ? void 0 : i.dice) == null ? void 0 : Le.modifiers) ?? 0)
      };
      const U = o.modifiers + c, _ = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, _ + U);
    }
    const u = Array.isArray((Ue = i == null ? void 0 : i.resolved) == null ? void 0 : Ue.domains) ? i.resolved.domains : [], d = u.includes("physical") ? "physical" : u.includes("mental") ? "mental" : u.includes("social") ? "social" : null, m = (d === "physical" ? ["grit", "chaos"] : d === "mental" ? ["insight", "rumor"] : d === "social" ? ["legend", "credibility"] : []).map((U) => {
      var _, Q, Ce, pe;
      return {
        key: U,
        label: U.charAt(0).toUpperCase() + U.slice(1),
        available: Number(((Ce = (Q = (_ = this.actor) == null ? void 0 : _.getEdgePool) == null ? void 0 : Q.call(_, U)) == null ? void 0 : Ce.effectiveValue) ?? 0),
        selected: U === (((pe = s.edge) == null ? void 0 : pe.prePoolKey) ?? null)
      };
    }), f = m.find((U) => U.selected), y = (f == null ? void 0 : f.label) ?? null, h = ((At = i == null ? void 0 : i.resolved) == null ? void 0 : At.attack) ?? null, g = String(
      ((wt = h == null ? void 0 : h.skill) == null ? void 0 : wt.code) ?? ((kt = (Tt = i == null ? void 0 : i.resolved) == null ? void 0 : Tt.specialization) == null ? void 0 : kt.skillKey) ?? ((Mt = (vt = i == null ? void 0 : i.resolved) == null ? void 0 : vt.data) == null ? void 0 : Mt.skillKey) ?? ((Et = i == null ? void 0 : i.payload) == null ? void 0 : Et.key) ?? ""
    ).trim(), S = g ? In(((Ct = this.actor) == null ? void 0 : Ct.system) ?? {}, g) : [], T = String(((Pt = s == null ? void 0 : s.payload) == null ? void 0 : Pt.specializationKey) ?? "").trim(), k = S.find((U) => U.key === T) ?? null;
    if (n !== "edge") {
      o.specialization = k ? Number(((it = (Nt = i == null ? void 0 : i.resolved) == null ? void 0 : Nt.specialization) == null ? void 0 : it.value) ?? 2) : 0;
      const U = o.modifiers + c, _ = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, _ + U);
    }
    const P = Array.isArray((Rt = h == null ? void 0 : h.payloadState) == null ? void 0 : Rt.payloads) ? h.payloadState.payloads : [], I = String(((Dt = h == null ? void 0 : h.weapon) == null ? void 0 : Dt.category) ?? "").trim().toLowerCase() !== "melee" && P.length > 0, O = String(((It = s == null ? void 0 : s.payload) == null ? void 0 : It.payloadId) ?? ((Ot = h == null ? void 0 : h.payloadState) == null ? void 0 : Ot.activePayloadId) ?? "").trim(), x = P.find((U) => U.id === O) ?? null;
    return {
      header: {
        left: ((_t = i == null ? void 0 : i.header) == null ? void 0 : _t.left) ?? "Roll",
        right: ((Lt = i == null ? void 0 : i.header) == null ? void 0 : Lt.right) ?? (($t = this.actor) == null ? void 0 : $t.name) ?? ""
      },
      formula: String((i == null ? void 0 : i.formula) ?? ((A = i == null ? void 0 : i.resolved) == null ? void 0 : A.formula) ?? "").trim(),
      dice: o,
      modifiers: Array.isArray(i.modifiers) ? i.modifiers : [],
      manual: (s.manual ?? []).map((U) => ({
        ...U,
        steps: Nm(Number(U.value ?? 0), -3, 3)
      })),
      edge: {
        domain: d,
        choices: m,
        selectedLabel: y
      },
      toggles: n === "edge" ? { useEdge: !1, takeRisks: !1, opponentRoll: !1 } : s.toggles,
      totalPool: l,
      intent: n,
      dn: r,
      specialization: S.length ? {
        skillCode: g,
        options: S.map((U) => ({
          key: U.key,
          label: U.label,
          selected: U.key === T
        })),
        selectedKey: T,
        selectedLabel: (k == null ? void 0 : k.label) ?? ""
      } : null,
      attack: h ? {
        weaponName: ((C = h == null ? void 0 : h.weapon) == null ? void 0 : C.name) ?? "Weapon",
        rangeBand: (h == null ? void 0 : h.rangeBand) ?? "",
        damageType: ((H = x == null ? void 0 : x.modifies) == null ? void 0 : H.damageType) || ((se = h == null ? void 0 : h.weapon) == null ? void 0 : se.damageTypeLabel) || ((ae = h == null ? void 0 : h.weapon) == null ? void 0 : ae.damageType) || "",
        usesPayloads: I,
        source: (h == null ? void 0 : h.sourceState) ?? null,
        payloads: P.map((U) => {
          var _;
          return {
            id: U.id,
            name: U.label,
            damageType: (_ = U.modifies) == null ? void 0 : _.damageType,
            selected: U.id === O
          };
        }),
        selectedPayloadId: O,
        selectedPayloadLabel: (x == null ? void 0 : x.label) ?? ((me = h == null ? void 0 : h.payload) == null ? void 0 : me.label) ?? ((Se = h == null ? void 0 : h.weapon) == null ? void 0 : Se.payloadLabel) ?? "",
        selectedSourceLabel: ((ve = h == null ? void 0 : h.sourceState) == null ? void 0 : ve.label) ?? ""
      } : null
    };
  }
  /* --------------------------- */
  /* Actions                     */
  /* --------------------------- */
  async _onCancel(t) {
    if (t == null || t.preventDefault(), B(this, He)) {
      const i = B(this, He);
      Re(this, He, null), i(null);
    }
    return this.close();
  }
  async _onSubmit(t) {
    var s, r, n, o, l, c, u, d, p, m, f, y, h;
    t == null || t.preventDefault();
    const i = this._mwd.state;
    if (i.payload.manualModifiers = (i.manual ?? []).filter((g) => {
      var S;
      return g && (((S = g.label) == null ? void 0 : S.trim()) || Number(g.value));
    }).map((g) => {
      var S;
      return {
        id: g.id,
        label: ((S = g.label) == null ? void 0 : S.trim()) || "Manual",
        value: Number(g.value ?? 0)
      };
    }), Rm(i.payload, i.toggles ?? {}), on(
      i.payload,
      ((s = i.payload) == null ? void 0 : s.intent) === "attack" ? ((r = i.payload) == null ? void 0 : r.skillKey) ?? ((c = (l = (o = (n = this._mwd.baseContext) == null ? void 0 : n.resolved) == null ? void 0 : o.attack) == null ? void 0 : l.skill) == null ? void 0 : c.code) : ((u = i.payload) == null ? void 0 : u.key) ?? ((m = (p = (d = this._mwd.baseContext) == null ? void 0 : d.resolved) == null ? void 0 : p.data) == null ? void 0 : m.skillKey),
      (f = i.payload) == null ? void 0 : f.specializationKey
    ), B(this, He)) {
      const g = B(this, He);
      Re(this, He, null), g({ payload: i.payload });
    }
    if (i.payload.edge = i.payload.edge && typeof i.payload.edge == "object" ? i.payload.edge : {}, i.payload.edge.pre = i.payload.edge.pre && typeof i.payload.edge.pre == "object" ? i.payload.edge.pre : {}, (y = i.toggles) != null && y.useEdge) {
      const g = String(((h = i.edge) == null ? void 0 : h.prePoolKey) ?? "").trim() || null;
      i.payload.edge.pre.poolKey = g, i.payload.edge.pre.spent = g ? 1 : 0;
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
    var r;
    t == null || t.preventDefault();
    const s = (r = i == null ? void 0 : i.dataset) == null ? void 0 : r.id;
    if (s)
      return this._mwd.state.manual = this._mwd.state.manual.filter((n) => n.id !== s), this.render(!1);
  }
  async _onSetManualValue(t, i) {
    var o, l;
    t == null || t.preventDefault();
    const s = (o = i == null ? void 0 : i.dataset) == null ? void 0 : o.id, r = (l = i == null ? void 0 : i.dataset) == null ? void 0 : l.field;
    if (!s || !r) return;
    const n = this._mwd.state.manual.find((c) => c.id === s);
    if (n)
      return r === "label" && (n.label = String(i.value ?? "")), r === "value" && (n.value = Number(i.value ?? 0)), this.render(!1);
  }
  async _onSetManualStepper(t, i) {
    var o, l;
    t == null || t.preventDefault();
    const s = (o = i == null ? void 0 : i.dataset) == null ? void 0 : o.id, r = Number((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.value);
    if (!s || Number.isNaN(r)) return;
    const n = this._mwd.state.manual.find((c) => c.id === s);
    if (n)
      return n.value = r, this.render(!1);
  }
  async _onSetEdgePrePool(t, i) {
    var r;
    t == null || t.preventDefault();
    const s = String(((r = i == null ? void 0 : i.dataset) == null ? void 0 : r.poolKey) ?? "").trim();
    if (s)
      return this._mwd.state.edge = this._mwd.state.edge ?? {}, this._mwd.state.edge.prePoolKey = s, this._mwd.state.toggles.useEdge = !0, this.render(!1);
  }
  async _onToggleCheckbox(t, i) {
    var r;
    t == null || t.preventDefault();
    const s = (r = i == null ? void 0 : i.dataset) == null ? void 0 : r.key;
    if (s)
      return this._mwd.state.toggles[s] = !!i.checked, this.render(!1);
  }
  async _onSetDn(t, i) {
    t == null || t.preventDefault();
    const s = String((i == null ? void 0 : i.value) ?? "").trim(), r = s === "" ? null : Number(s);
    return this._mwd.state.payload.dn = Number.isFinite(r) ? Math.max(0, Math.trunc(r)) : null, this.render(!1);
  }
  async _onSetPayload(t, i) {
    return t == null || t.preventDefault(), this._mwd.state.payload.payloadId = String((i == null ? void 0 : i.value) ?? "").trim(), this.render(!1);
  }
  async _onSetSpecialization(t, i) {
    var n;
    t == null || t.preventDefault();
    const s = String(((n = i == null ? void 0 : i.dataset) == null ? void 0 : n.skillCode) ?? "").trim(), r = String((i == null ? void 0 : i.value) ?? "").trim();
    if (s)
      return on(this._mwd.state.payload, s, r), this.render(!1);
  }
  _onRender(t, i) {
    var r, n;
    (r = super._onRender) == null || r.call(this, t, i);
    const s = this.element instanceof HTMLElement ? this.element : (n = this.element) == null ? void 0 : n[0];
    s && (s.querySelectorAll("[data-action='setPayload']").forEach((o) => {
      o.addEventListener("change", (l) => {
        this._onSetPayload(l, l.currentTarget);
      });
    }), s.querySelectorAll("[data-action='setSpecialization']").forEach((o) => {
      o.addEventListener("change", (l) => {
        this._onSetSpecialization(l, l.currentTarget);
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
  static async prompt({ actor: t, basePayload: i, resolved: s, diceParts: r = null, mods: n = [], modTotal: o = 0 } = {}) {
    var y;
    const l = foundry.utils.deepClone(i ?? {});
    try {
      if (((s == null ? void 0 : s.rollType) ?? "simple") === "simple" && (l == null ? void 0 : l.dn) == null) {
        const g = Number(game.settings.get(game.system.id, "gmNextDn"));
        Number.isFinite(g) && (l.dn = Math.max(0, Math.trunc(g)));
      }
    } catch (h) {
      console.warn("MWD: failed to default DN from GM Gadget", h);
    }
    const c = {
      left: (s == null ? void 0 : s.title) ?? "Roll",
      right: (t == null ? void 0 : t.name) ?? ""
    }, u = r ?? Dm(s), d = {
      attribute: Number((u == null ? void 0 : u.attribute) ?? 0),
      skill: Number((u == null ? void 0 : u.skill) ?? 0),
      bonus: Number((u == null ? void 0 : u.bonus) ?? 0),
      specialization: Number((u == null ? void 0 : u.specialization) ?? 0),
      modifiers: Number(o ?? 0)
    }, p = (Array.isArray(n) ? n : []).map((h) => ({
      label: h.label ?? "Modifier",
      source: h.source ?? "",
      value: Number(h.value ?? 0)
    }));
    l.manualModifiers = nn(l.manualModifiers);
    const f = await new Te({
      actor: t,
      baseContext: {
        intent: (s == null ? void 0 : s.intent) ?? "skill",
        header: c,
        formula: String((s == null ? void 0 : s.formula) ?? "").trim(),
        dice: d,
        modifiers: p,
        payload: l,
        resolved: s,
        // keep full resolved for edge display
        dn: Number((l == null ? void 0 : l.dn) ?? ((y = s == null ? void 0 : s.difficulty) == null ? void 0 : y.dn) ?? 1)
      }
    }).wait();
    return (f == null ? void 0 : f.payload) ?? null;
  }
};
He = new WeakMap(), R(Te, "DEFAULT_OPTIONS", foundry.utils.mergeObject(
  mi(Te, Te, "DEFAULT_OPTIONS"),
  {
    id: "mwd-roll-dialog",
    classes: [
      ...mi(Te, Te, "DEFAULT_OPTIONS").classes ?? [],
      "mwd",
      "mwd-roll-dialog"
    ],
    window: { title: "Roll", resizable: !1 },
    position: { width: 520, height: "auto" },
    actions: {
      submit: Te.prototype._onSubmit,
      cancel: Te.prototype._onCancel,
      addManual: Te.prototype._onAddManual,
      removeManual: Te.prototype._onRemoveManual,
      setManualValue: Te.prototype._onSetManualValue,
      setManualStepper: Te.prototype._onSetManualStepper,
      setEdgePrePool: Te.prototype._onSetEdgePrePool,
      toggleCheckbox: Te.prototype._onToggleCheckbox,
      setDn: Te.prototype._onSetDn,
      setPayload: Te.prototype._onSetPayload,
      setSpecialization: Te.prototype._onSetSpecialization
    }
  },
  { inplace: !1 }
)), R(Te, "PARTS", {
  body: { template: "systems/mwd/templates/v2/roll/mwd-roll-dialog.hbs" }
});
let ja = Te;
const { ApplicationV2: Im, HandlebarsApplicationMixin: Om } = foundry.applications.api, qi = class qi extends Om(Im) {
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
      classes: [game.system.anarchy.styles.selectCssClass(), ...qi.DEFAULT_OPTIONS.classes],
      window: { title: e }
    };
    return new qi({ items: t }, i).wait();
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
    i.find(".click-select-item").click((s) => this.onSelectItem(s)), i.find('[data-action="cancel"]').on("click", async () => {
      if (this._resolve) {
        const s = this._resolve;
        this._resolve = null, s(null);
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
    const t = $(e.currentTarget).attr("data-item-id"), i = this.items.find((s) => s.id === t) ?? null;
    if (this._selected = !0, this._resolve) {
      const s = this._resolve;
      this._resolve = null, s(i);
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
R(qi, "PARTS", {
  body: {
    template: `${q}/dialog/select-item.hbs`
  }
});
let qa = qi;
function _m(a = {}) {
  var t;
  const e = Array.isArray((t = a == null ? void 0 : a.attack) == null ? void 0 : t.targets) ? a.attack.targets : [];
  if (!e.length) throw new Error("Attack requires at least one target.");
  return e;
}
function Lm(a = {}, e = {}) {
  var s, r, n, o, l, c;
  const t = Math.max(0, Number(((o = (r = (s = a == null ? void 0 : a.attack) == null ? void 0 : s.weapon) == null ? void 0 : r.attackRatingBand) == null ? void 0 : o[(n = a == null ? void 0 : a.attack) == null ? void 0 : n.rangeBand]) ?? 0) || 0), i = Math.max(0, Number(((l = e == null ? void 0 : e.activeArmor) == null ? void 0 : l.defenseBonus) ?? 0) || 0);
  return {
    ar: {
      parts: [{
        id: "weapon.attackRating",
        label: `Weapon AR (${String(((c = a == null ? void 0 : a.attack) == null ? void 0 : c.rangeBand) ?? "").trim() || "range"})`,
        value: t
      }],
      total: t
    },
    dr: {
      parts: [{
        id: "target.armorDefense",
        label: "Armor Defense",
        value: i
      }],
      total: i
    },
    value: t - i
  };
}
function $m(a = {}, e = {}) {
  var c, u, d, p, m;
  const t = (a == null ? void 0 : a.attack) ?? {}, i = String(((u = (c = t == null ? void 0 : t.payload) == null ? void 0 : c.modifies) == null ? void 0 : u.damageType) ?? "").trim(), s = Math.max(0, Number(((d = t == null ? void 0 : t.weapon) == null ? void 0 : d.damage) ?? 0) || 0), r = lt(i || ((p = t == null ? void 0 : t.weapon) == null ? void 0 : p.damageType), "concussive"), n = Math.max(0, Number((t == null ? void 0 : t.totalAp) ?? ((m = t == null ? void 0 : t.weapon) == null ? void 0 : m.ap) ?? 0) || 0), o = e.outcome === "graze" ? s / 2 : e.outcome === "hit" ? s : 0, l = o + Number(e.netHits ?? 0);
  return {
    baseDamage: s,
    effectiveWeaponDamage: o,
    netHits: Number(e.netHits ?? 0),
    incoming: l,
    ap: n,
    damageType: r,
    damageTypeLabel: St(r)
  };
}
async function xm({ attacker: a, ctx: e, target: t, outcome: i, damage: s } = {}) {
  var l, c, u, d;
  if ((i == null ? void 0 : i.outcome) === "miss")
    return {
      ok: !0,
      skipped: !0,
      reason: "Missed target."
    };
  const r = t != null && t.tokenUuid ? await fromUuid(t.tokenUuid) : null, n = t != null && t.actorUuid ? await fromUuid(t.actorUuid) : null, o = await Ye.apply({
    actor: n,
    token: r,
    payload: {
      mode: "attackDamage",
      track: b.monitors.physical,
      damage: (s == null ? void 0 : s.effectiveWeaponDamage) ?? 0,
      netHits: (s == null ? void 0 : s.netHits) ?? 0,
      damageType: s == null ? void 0 : s.damageType,
      ap: (s == null ? void 0 : s.ap) ?? 0,
      effects: ((c = (l = e == null ? void 0 : e.attack) == null ? void 0 : l.weapon) == null ? void 0 : c.effects) ?? {},
      source: `${(a == null ? void 0 : a.name) ?? "Attacker"}: ${((d = (u = e == null ? void 0 : e.attack) == null ? void 0 : u.weapon) == null ? void 0 : d.name) ?? "Attack"}`
    },
    options: {
      actorId: (n == null ? void 0 : n.id) ?? "",
      logToChat: !1
    }
  });
  return o != null && o.ok ? {
    ok: !0,
    actorName: o.actorName ?? (t == null ? void 0 : t.name) ?? "Target",
    sourceType: o.sourceType ?? null,
    mode: o.mode ?? "attackDamage",
    track: o.track ?? b.monitors.physical,
    requestedDelta: Number(o.requestedDelta ?? 0),
    appliedDelta: Number(o.appliedDelta ?? 0),
    usedArmor: !!o.usedArmor,
    damageType: o.damageType ?? (s == null ? void 0 : s.damageType) ?? "",
    effectiveAp: Number(o.effectiveAp ?? (s == null ? void 0 : s.ap) ?? 0),
    mitigation: o.mitigation ? {
      baseMitigation: Number(o.mitigation.baseMitigation ?? 0),
      typeMitigationMod: Number(o.mitigation.typeMitigationMod ?? 0),
      netResistance: Number(o.mitigation.netResistance ?? 0),
      armorBefore: Number(o.mitigation.armorBefore ?? 0),
      armorAfter: Number(o.mitigation.armorAfter ?? 0),
      reinforcedBefore: Number(o.mitigation.reinforcedBefore ?? 0),
      reinforcedAfter: Number(o.mitigation.reinforcedAfter ?? 0),
      reinforcedMax: Number(o.mitigation.reinforcedMax ?? 0)
    } : null,
    damageIncoming: Number(o.damageIncoming ?? 0),
    adjustedIncoming: Number(o.adjustedIncoming ?? 0),
    finalDamage: Number(o.finalDamage ?? 0),
    beforeLabel: String(o.beforeLabel ?? "").trim(),
    afterLabel: String(o.afterLabel ?? "").trim(),
    source: String(o.source ?? "").trim(),
    notes: String(o.notes ?? "").trim()
  } : { ok: !1, reason: (o == null ? void 0 : o.reason) ?? "Unable to apply attack damage." };
}
async function Bm({ attacker: a, ctx: e, outcomeModel: t, target: i } = {}) {
  const s = Lm(e, i), r = Number((t == null ? void 0 : t.margin) ?? 0), n = r + Math.min(s.value, r), o = r >= 1 ? n > 0 ? "hit" : "graze" : "miss", l = o === "hit" ? Math.max(0, n) : 0, c = $m(e, { outcome: o, netHits: l }), u = await xm({
    attacker: a,
    ctx: e,
    target: i,
    outcome: { outcome: o },
    damage: c
  });
  return {
    target: {
      name: (i == null ? void 0 : i.name) ?? "Target",
      actorUuid: (i == null ? void 0 : i.actorUuid) ?? null,
      tokenUuid: (i == null ? void 0 : i.tokenUuid) ?? null
    },
    cq: s,
    margin: r,
    rawNetHits: n,
    netHits: l,
    outcome: o,
    damage: c,
    damageResult: u
  };
}
function Fm(a = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of a)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
async function zm({ attacker: a, ctx: e, outcomeModel: t } = {}) {
  const i = _m(e), s = [];
  for (const r of i)
    s.push(await Bm({ attacker: a, ctx: e, outcomeModel: t, target: r }));
  return {
    targetCount: i.length,
    results: s,
    summary: Fm(s)
  };
}
const ln = { execute: Gm }, Wm = {
  physical: ["grit", "chaos"],
  mental: ["insight", "rumor"],
  social: ["legend", "credibility"]
};
function Um(a, e) {
  var r;
  const t = Wm[e] ?? [];
  let i = null, s = -1;
  for (const n of t) {
    const o = (r = a.getEdgePool) == null ? void 0 : r.call(a, n), l = Number((o == null ? void 0 : o.rating) ?? 0), c = Number((o == null ? void 0 : o.value) ?? 0), u = Math.max(0, l - c);
    u > s && (s = u, i = n);
  }
  return i ?? t[0] ?? null;
}
function Hm(a) {
  const t = (Array.isArray(a == null ? void 0 : a.manualModifiers) ? a.manualModifiers : []).map((s) => ({
    id: s.id ?? foundry.utils.randomID(),
    label: (s.label ?? "Manual").trim() || "Manual",
    value: Number(s.value ?? 0),
    source: "Manual"
  })).filter((s) => Number.isFinite(s.value) && s.value !== 0), i = t.reduce((s, r) => s + r.value, 0);
  return { mods: t, total: i };
}
function cn(a = {}) {
  const e = a.toggles ?? {}, t = String((a == null ? void 0 : a.payloadId) ?? (a == null ? void 0 : a.ammoTypeId) ?? "").trim();
  return {
    ...a,
    ...t ? { payloadId: t } : {},
    toggles: {
      useEdge: !!e.useEdge,
      takeRisks: !!e.takeRisks,
      opponentRoll: !!e.opponentRoll
    },
    manualModifiers: qm(a.manualModifiers)
  };
}
async function jm({ actor: a, payload: e } = {}) {
  var r, n, o, l, c, u, d, p, m, f, y, h;
  if ((e == null ? void 0 : e.intent) !== "attack") return e;
  const t = foundry.utils.deepClone(e ?? {}), i = ((r = a.getPersonalCombatLoadout) == null ? void 0 : r.call(a, { refresh: !0 })) ?? null, s = (g) => {
    var T, k, P, I, O;
    const S = ((k = (T = a.items) == null ? void 0 : T.get) == null ? void 0 : k.call(T, g)) ?? null;
    return !S || !(((P = S.isPersonalWeapon) == null ? void 0 : P.call(S)) ?? S.type === b.itemType.personalWeapon) || !((I = S.system) != null && I.equipped) ? null : ((O = S.getCombatProfile) == null ? void 0 : O.call(S, { payloadId: t == null ? void 0 : t.payloadId })) ?? null;
  };
  if (t.weaponId) {
    const g = s(t.weaponId);
    if (!g)
      throw new Error("Attack requires an owned equipped personal weapon.");
    return t.rangeBand = t.rangeBand ?? g.defaultRangeBand ?? "close", t.payloadId = t.payloadId ?? ((n = g == null ? void 0 : g.payloadState) == null ? void 0 : n.activePayloadId) ?? "", t;
  }
  if (t.mode === "auto") {
    if (i != null && i.weaponChoiceRequired) {
      const g = await qa.selectItem(
        "Choose Weapon",
        i.equippedWeapons ?? []
      );
      return g ? (t.weaponId = g.id, t.rangeBand = t.rangeBand ?? g.defaultRangeBand ?? "close", t.payloadId = t.payloadId ?? ((o = g == null ? void 0 : g.payloadState) == null ? void 0 : o.activePayloadId) ?? "", delete t.mode, t) : null;
    }
    if ((l = i == null ? void 0 : i.defaultWeapon) != null && l.isSynthetic || ((c = i == null ? void 0 : i.defaultWeapon) == null ? void 0 : c.id) === "unarmed")
      return t.syntheticWeapon = foundry.utils.deepClone(i.defaultWeapon ?? Ze.DEFAULT_UNARMED), t.weaponId = t.syntheticWeapon.id, t.rangeBand = t.rangeBand ?? "close", t.payloadId = t.payloadId ?? ((d = (u = t.syntheticWeapon) == null ? void 0 : u.payloadState) == null ? void 0 : d.activePayloadId) ?? "", delete t.mode, t;
    if ((p = i == null ? void 0 : i.defaultWeapon) != null && p.id)
      return t.weaponId = i.defaultWeapon.id, t.rangeBand = t.rangeBand ?? i.defaultWeapon.defaultRangeBand ?? "close", t.payloadId = t.payloadId ?? ((f = (m = i.defaultWeapon) == null ? void 0 : m.payloadState) == null ? void 0 : f.activePayloadId) ?? "", delete t.mode, t;
  }
  if (t.fallback === "unarmed")
    return t.syntheticWeapon = foundry.utils.deepClone(Ze.DEFAULT_UNARMED), t.weaponId = t.syntheticWeapon.id, t.rangeBand = t.rangeBand ?? "close", t.payloadId = t.payloadId ?? ((h = (y = t.syntheticWeapon) == null ? void 0 : y.payloadState) == null ? void 0 : h.activePayloadId) ?? "", delete t.mode, t;
  throw new Error("Attack could not resolve a usable weapon.");
}
function qm(a) {
  return Array.isArray(a) ? a.map((e) => ({
    id: (e == null ? void 0 : e.id) ?? foundry.utils.randomID(),
    label: typeof (e == null ? void 0 : e.label) == "string" ? e.label : "Manual",
    value: Number((e == null ? void 0 : e.value) ?? 0)
  })) : [];
}
async function Gm({ actor: a, payload: e, event: t } = {}) {
  var K, D, N, Y, z, ge, _e, Le, Ue, At, wt, Tt, kt, vt, Mt, Et, Ct, Pt, Nt, it, Rt, Dt, It, Ot, _t, Lt, $t, A, C, H, se, ae, me, Se, ve, U;
  if (a != null && a.actor && (a = a.actor), (K = a == null ? void 0 : a.document) != null && K.actor && (a = a.document.actor), !a) throw new Error("MWD.roll.execute requires actor");
  if (!(e != null && e.intent)) throw new Error("MWD.roll.execute requires payload.intent");
  if (e = cn(e), e = await jm({ actor: a, payload: e }), !e) return null;
  let i = await en({ actor: a, payload: e, event: t }), s = await tn({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const r = await ja.prompt({
    actor: a,
    basePayload: e,
    resolved: i,
    diceParts: {
      attribute: ((D = i == null ? void 0 : i.pool) == null ? void 0 : D.attribute) ?? 0,
      skill: ((N = i == null ? void 0 : i.pool) == null ? void 0 : N.skill) ?? 0,
      bonus: ((Y = i == null ? void 0 : i.pool) == null ? void 0 : Y.bonus) ?? 0,
      specialization: ((z = i == null ? void 0 : i.pool) == null ? void 0 : z.specialization) ?? 0
    },
    mods: s.mods,
    modTotal: s.total,
    options: {
      allowEdge: e.intent !== "initiative"
    }
  });
  if (!r) return null;
  if (e = cn(r), i = await en({ actor: a, payload: e, event: t }), e.intent === "attack" && e.weaponId) {
    const _ = ((_e = (ge = a.items) == null ? void 0 : ge.get) == null ? void 0 : _e.call(ge, e.weaponId)) ?? null;
    if ((Le = _ == null ? void 0 : _.isPersonalWeapon) != null && Le.call(_)) {
      const Q = String(e.payloadId ?? "").trim(), Ce = String(((Ue = _.system) == null ? void 0 : Ue.selectedPayloadId) ?? "").trim();
      if (Q && Q !== Ce && await ((At = _.setActivePayload) == null ? void 0 : At.call(_, Q)), !((wt = _.canConsumePayload) != null && wt.call(_, { payloadId: Q }))) {
        const pe = (Tt = _.getPayloadState) == null ? void 0 : Tt.call(_, { payloadId: Q }), Ne = pe != null && pe.payloadLabel ? ` (${pe.payloadLabel})` : "";
        return (kt = ui.notifications) == null || kt.warn(`Not enough payload${Ne} for ${_.name}.`), null;
      }
    }
  }
  s = await tn({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const { mods: n, total: o } = s, { mods: l, total: c } = Hm(e);
  let u = [...n, ...l], d = Number(o ?? 0) + Number(c ?? 0);
  const p = Number(((vt = i == null ? void 0 : i.pool) == null ? void 0 : vt.attribute) ?? 0) + Number(((Mt = i == null ? void 0 : i.pool) == null ? void 0 : Mt.skill) ?? 0) + Number(((Et = i == null ? void 0 : i.pool) == null ? void 0 : Et.bonus) ?? 0) + Number(((Ct = i == null ? void 0 : i.pool) == null ? void 0 : Ct.specialization) ?? 0), m = Math.max(0, p + Number(d ?? 0)), f = e.intent !== "initiative", y = f ? Vm({ actor: a, ctx: i, payload: e }) : null, h = (Pt = y == null ? void 0 : y.pre) != null && Pt.spent ? 4 : Number(i.diceTarget ?? i.target ?? 5), g = {
    snapshot: ((Rt = (it = (Nt = game.mwd) == null ? void 0 : Nt.personalCombat) == null ? void 0 : it.getSnapshot) == null ? void 0 : Rt.call(it, a)) ?? null
  }, S = Xe({
    actor: a,
    phase: "onBuildRoll",
    facts: rr({ actor: a, resolved: i, payload: e, runtime: g }),
    packet: {},
    options: { runtime: g, consumeUsage: !0 }
  });
  await Kt({ actor: a, mutations: S.mutations, runtime: g }), f && ((Dt = y == null ? void 0 : y.pre) != null && Dt.spent) && ((It = y == null ? void 0 : y.pre) != null && It.poolKey) && await ((Ot = a.spendEdge) == null ? void 0 : Ot.call(a, y.pre.poolKey, 1));
  let T, k = 0, P = 0;
  if (i.rollType === "sum" && ((_t = i.sum) != null && _t.formula))
    T = await new Roll(i.sum.formula, i.sum.data ?? {}).evaluate({ async: !0 }), k = Number(T.total ?? 0) + Number(d ?? 0);
  else {
    T = await new Roll(`${m}d6cs>=${h}`).evaluate({ async: !0 });
    const _ = (Lt = T.dice) == null ? void 0 : Lt[0];
    k = Array.isArray(_ == null ? void 0 : _.results) ? _.results.filter((Q) => Q.success).length : 0, P = Array.isArray(_ == null ? void 0 : _.results) ? _.results.filter((Q) => Q.result === 1).length : 0;
  }
  if (i.intent === "initiative" && (T == null ? void 0 : T.total) != null) {
    const _ = { total: Number(T.total ?? 0) + Number(d ?? 0) }, Q = Xe({
      actor: a,
      phase: "onInitiativeResolved",
      facts: eo({ actor: a, packet: _, runtime: g }),
      packet: _,
      options: { runtime: g, consumeUsage: !0 }
    });
    if (await Kt({ actor: a, mutations: Q.mutations, runtime: g }), Q.modifiers.length) {
      const Ce = Q.modifiers.reduce((pe, Ne) => pe + Number(Ne.value ?? 0), 0);
      u = u.concat(Q.modifiers), d += Ce, k = Number(Q.packet.total ?? 0), await un({ actor: a, total: Q.packet.total ?? T.total }), i.breakdown = (i.breakdown ?? []).concat(Q.modifiers.map((pe, Ne) => ({
        id: `traitInitiative${Ne + 1}`,
        label: pe.label,
        value: Number(pe.value ?? 0)
      })));
    } else
      k = Number(_.total ?? 0), await un({ actor: a, total: _.total });
  }
  const I = Em(
    i,
    { successes: k, raw: ($t = T == null ? void 0 : T.toJSON) == null ? void 0 : $t.call(T) },
    null
    // opposed rolls can pass defender result later
  ), O = I == null ? void 0 : I.edgeEarned;
  if ((O == null ? void 0 : O.amount) > 0) {
    const _ = (A = i == null ? void 0 : i.domains) != null && A.includes("physical") ? "physical" : (C = i == null ? void 0 : i.domains) != null && C.includes("mental") ? "mental" : (H = i == null ? void 0 : i.domains) != null && H.includes("social") ? "social" : null, Q = Um(a, _);
    await ((se = a.gainEdge) == null ? void 0 : se.call(a, Q, O.amount)), I.edgeEarned.pool = Q;
  }
  i.intent === "overload" && await Qm({ actor: a, passed: I.passed });
  let x = null;
  i.intent === "attack" && (x = await zm({
    attacker: a,
    ctx: i,
    outcomeModel: I
  }));
  const j = lm({
    actor: a,
    payload: e,
    ctx: i,
    roll: T,
    target: h,
    pool: m,
    mods: u,
    modTotal: d,
    hits: k,
    ones: P,
    edge: y,
    outcomeModel: I
  });
  x && (j.attackResult = x, j.damageResult = x.damageResult);
  const V = await Io({ resolved: j });
  if (e.intent === "attack" && e.weaponId) {
    const _ = ((me = (ae = a.items) == null ? void 0 : ae.get) == null ? void 0 : me.call(ae, e.weaponId)) ?? null;
    (Se = _ == null ? void 0 : _.isPersonalWeapon) != null && Se.call(_) && (await ((ve = _.consumePayload) == null ? void 0 : ve.call(_, { payloadId: e.payloadId })) || (U = ui.notifications) == null || U.warn(`Payload could not be consumed for ${_.name}.`));
  }
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: a }),
    content: V,
    flags: {
      mwd: {
        payload: e,
        resolved: j
      }
    }
  });
}
function Vm({ actor: a, ctx: e, payload: t }) {
  var f, y, h, g, S, T, k;
  const i = Km(e == null ? void 0 : e.domains), s = Ym[i] ?? null, r = (s == null ? void 0 : s.a) ?? null, n = (s == null ? void 0 : s.b) ?? null, o = [r, n].filter(Boolean), l = !!((f = t == null ? void 0 : t.toggles) != null && f.useEdge) || !!(t != null && t.useEdge);
  let c = String(((h = (y = t == null ? void 0 : t.edge) == null ? void 0 : y.pre) == null ? void 0 : h.poolKey) ?? "").trim() || null;
  c && !o.includes(c) && (c = null);
  const u = l && c ? 1 : 0;
  let d = [...o];
  u && c && (d = d.filter((P) => P !== c));
  let p = String(((S = (g = t == null ? void 0 : t.edge) == null ? void 0 : g.post) == null ? void 0 : S.poolKey) ?? "").trim() || null;
  p && !d.includes(p) && (p = null);
  const m = Number(((k = (T = t == null ? void 0 : t.edge) == null ? void 0 : T.post) == null ? void 0 : k.spent) ?? 0) ? 1 : 0;
  return {
    domain: i,
    pools: s ? { a: r, b: n } : null,
    pre: { poolKey: c, spent: u },
    post: { poolKey: p, spent: m },
    allowed: { prePools: o, postPools: d }
  };
}
function Km(a) {
  return Array.isArray(a) ? a.includes("physical") ? "physical" : a.includes("mental") ? "mental" : a.includes("social") ? "social" : null : null;
}
const Ym = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};
async function un({ actor: a, total: e }) {
  var o, l, c, u, d;
  const t = (l = (o = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : o.controlled) == null ? void 0 : l.find((p) => {
    var m;
    return ((m = p.actor) == null ? void 0 : m.id) === a.id;
  }), i = ((u = (c = a.getActiveTokens) == null ? void 0 : c.call(a, !0, !0)) == null ? void 0 : u[0]) ?? null, s = t ?? i;
  if (!s) {
    (d = ui.notifications) == null || d.warn("Initiative requires a token on the current scene.");
    return;
  }
  let r = game.combat;
  r || (r = await Combat.create({
    scene: canvas.scene.id,
    active: !0
  }));
  let n = r.combatants.find((p) => p.tokenId === s.id);
  if (!n) {
    const p = await r.createEmbeddedDocuments("Combatant", [{
      tokenId: s.id,
      actorId: a.id,
      sceneId: canvas.scene.id
    }]);
    n = p == null ? void 0 : p[0];
  }
  n && await n.update({ initiative: Number(e) });
}
async function Qm({ actor: a, passed: e }) {
  e || await a.update({ "system.burn.overloaded": !0 });
}
const Jm = /* @__PURE__ */ new Set(["physical", "mental", "social"]);
function Xm(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function Zm(a) {
  if (!a) return;
  const e = String(a).trim().toLowerCase();
  return Jm.has(e) ? e : void 0;
}
class ep {
  constructor() {
    R(this, "id", "mwd.itemModifiers");
    R(this, "label", "Item Modifiers");
  }
  collect(e) {
    var s, r;
    const t = e == null ? void 0 : e.actor;
    if (!t) return [];
    const i = [];
    for (const n of t.items) {
      const o = (r = (s = n.flags) == null ? void 0 : s.mwd) == null ? void 0 : r.modifiers;
      if (!(!Array.isArray(o) || o.length === 0))
        for (const l of o) {
          if (!l) continue;
          const c = Xm(l.value);
          if (c === null) {
            console.warn("MWD | Dropping item modifier with invalid value", {
              actor: t.name,
              item: n.name,
              modifier: l
            });
            continue;
          }
          i.push({
            label: l.label ?? n.name,
            value: c,
            source: n.name,
            domain: Zm(l.domain)
          });
        }
    }
    return i;
  }
}
const da = {
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
class tp {
  constructor() {
    R(this, "id", "mwd.statusEffects");
    R(this, "label", "Status Effects");
  }
  collect({ actor: e } = {}) {
    var s;
    const t = e == null ? void 0 : e.statuses;
    if (!e || !t) return [];
    const i = [];
    for (const r of t) {
      const n = da == null ? void 0 : da[r];
      if ((s = n == null ? void 0 : n.mods) != null && s.length)
        for (const o of n.mods) {
          const l = Array.isArray(o.domains) ? o.domains : [], c = o.value;
          if (l.length)
            for (const u of l)
              i.push({
                label: n.label ?? r,
                value: c,
                source: "Status",
                domain: u
              });
          else
            i.push({
              label: n.label ?? r,
              value: c,
              source: "Status"
            });
        }
    }
    return i;
  }
}
class ip {
  constructor() {
    R(this, "id", "mwd.baseRollModifiers");
    R(this, "label", "Roll (Base)");
  }
  collect({ payload: e } = {}) {
    var n, o, l;
    const t = [], i = (n = e == null ? void 0 : e.modifiers) == null ? void 0 : n.manual;
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
    const s = ((o = e == null ? void 0 : e.dialog) == null ? void 0 : o.otherMods) ?? ((l = e == null ? void 0 : e.modifiers) == null ? void 0 : l.otherMods) ?? (e == null ? void 0 : e.otherMods) ?? 0, r = Number(s);
    return Number.isFinite(r) && r !== 0 && t.push({
      id: "otherMods",
      label: "Other modifiers",
      value: r,
      source: "Roll"
    }), t;
  }
}
class sp {
  constructor() {
    R(this, "id", "mwd.condition");
    R(this, "label", "Condition");
  }
  collect({ actor: e, rollType: t } = {}) {
    var o, l, c, u, d, p, m, f;
    if (!e) return [];
    if (t === "edge") return [];
    const i = ((o = e.system) == null ? void 0 : o.derived) ?? {}, s = Number(
      ((l = i == null ? void 0 : i.condition) == null ? void 0 : l.physicalPenalty) ?? ((u = (c = i == null ? void 0 : i.monitors) == null ? void 0 : c.physical) == null ? void 0 : u.penalty) ?? 0
    ), r = Number(
      ((d = i == null ? void 0 : i.condition) == null ? void 0 : d.fatiguePenalty) ?? ((m = (p = i == null ? void 0 : i.monitors) == null ? void 0 : p.fatigue) == null ? void 0 : m.penalty) ?? 0
    ), n = [];
    return Number.isFinite(s) && s !== 0 && n.push({
      id: "conditionPhysical",
      label: "Physical Penalty",
      value: s,
      source: "Physical Track"
      // domain: "physical" // optional; leave unset to apply to all domains
    }), Number.isFinite(r) && r !== 0 && n.push({
      id: "conditionFatigue",
      label: "Fatigue Penalty",
      value: r,
      source: "Fatigue Track"
      // domain: "physical" // optional
    }), console.log("MWD|condition derived snapshot", e.name, foundry.utils.deepClone((f = e.system) == null ? void 0 : f.derived)), n;
  }
}
const ap = {
  id: "burn",
  async collect(a) {
    var s, r;
    const e = a.actor;
    if (!e) return [];
    const t = Number(((r = (s = e.system) == null ? void 0 : s.burn) == null ? void 0 : r.value) ?? 0), i = Math.floor(t / 2);
    return i <= 0 ? [] : [{
      id: "burn",
      label: "Burn",
      value: -i,
      source: "Burn Track",
      domain: null
    }];
  }
};
class rp {
  constructor() {
    R(this, "id", "mwd.lifeModules");
    R(this, "label", "Life Modules");
  }
  collect({ actor: e, resolved: t } = {}) {
    return uc({ actor: e, resolved: t });
  }
}
class np {
  constructor() {
    R(this, "id", "mwd.traits");
    R(this, "label", "Traits");
  }
  collect({ actor: e, resolved: t, payload: i } = {}) {
    var r, n, o;
    if (!e) return [];
    const s = {
      snapshot: ((o = (n = (r = game.mwd) == null ? void 0 : r.personalCombat) == null ? void 0 : n.getSnapshot) == null ? void 0 : o.call(n, e)) ?? null
    };
    return Xe({
      actor: e,
      phase: "onBuildRoll",
      facts: rr({ actor: e, resolved: t, payload: i, runtime: s }),
      packet: {},
      options: { runtime: s, consumeUsage: !1 }
    }).modifiers;
  }
}
function op() {
  Hooks.on("renderChatMessageHTML", (a, e) => {
    e.addEventListener("click", (t) => {
      const i = t.target.closest("[data-mwd-action]");
      if (!i) return;
      const s = String(i.dataset.mwdAction || "").trim();
      s && s === "edgePostReroll" && lp(t, a);
    });
  });
}
async function lp(a, e) {
  var f, y, h, g, S, T, k, P, I, O, x, j, V, K, D, N, Y;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='edgePostReroll']"), i = String(((f = t == null ? void 0 : t.dataset) == null ? void 0 : f.poolKey) ?? "").trim();
  if (!i) return;
  const s = foundry.utils.deepClone((h = (y = e == null ? void 0 : e.flags) == null ? void 0 : y.mwd) == null ? void 0 : h.resolved);
  if (!s || Number(((S = (g = s == null ? void 0 : s.edge) == null ? void 0 : g.post) == null ? void 0 : S.spent) ?? 0) === 1) return;
  if (!(Array.isArray((k = (T = s == null ? void 0 : s.edge) == null ? void 0 : T.allowed) == null ? void 0 : k.postPools) ? s.edge.allowed.postPools : []).includes(i)) {
    (I = (P = ui.notifications) == null ? void 0 : P.warn) == null || I.call(P, `Post-spend pool not allowed: ${i}`);
    return;
  }
  const n = Array.isArray((O = s == null ? void 0 : s.roll) == null ? void 0 : O.failureDiceRefs) ? s.roll.failureDiceRefs : [];
  if (n.length <= 0) {
    (j = (x = ui.notifications) == null ? void 0 : x.info) == null || j.call(x, "No failures to reroll.");
    return;
  }
  const o = await fromUuid(s.actorUuid);
  if (!o) {
    (K = (V = ui.notifications) == null ? void 0 : V.warn) == null || K.call(V, "Actor not found for this roll.");
    return;
  }
  await ((D = o.spendEdge) == null ? void 0 : D.call(o, i, 1));
  const l = Number(((N = s == null ? void 0 : s.roll) == null ? void 0 : N.target) ?? 5), u = (Y = (await new Roll(`${n.length}d6cs>=${l}`).evaluate()).dice) == null ? void 0 : Y[0], d = Array.isArray(u == null ? void 0 : u.results) ? u.results : [], p = d.filter((z) => z.success).length;
  s.outcome = s.outcome ?? {}, s.outcome.hits = Number(s.outcome.hits ?? 0) + p, s.edge = s.edge ?? {}, s.edge.post = { poolKey: i, spent: 1 }, s.edge.availableActions = {
    ...s.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, s.roll = s.roll ?? {}, s.roll.diceGroups = Array.isArray(s.roll.diceGroups) ? s.roll.diceGroups : [], s.roll.diceGroups.push({
    id: "post",
    label: "Post Reroll",
    faces: 6,
    termIndex: null,
    dice: d.map((z, ge) => {
      const _e = Number(z.result), Le = !!z.success;
      return {
        ref: `post:${ge}`,
        face: _e,
        isSuccess: Le,
        isFailure: !Le,
        tooltip: Le ? `Post die ${ge + 1}: ${_e} (Success vs TN ${l})` : `Post die ${ge + 1}: ${_e} (Failure vs TN ${l})`
      };
    })
  });
  const m = await Io({ resolved: s });
  await e.update({
    content: m,
    "flags.mwd.resolved": s,
    "flags.mwd.payload.edge.post": { poolKey: i, spent: 1 }
  });
}
function cp() {
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
function up() {
  return {
    get(a) {
      return et(a);
    },
    getSkills({ withKnowledge: a = !1 } = {}) {
      return vs();
    },
    list() {
      return vs();
    }
  };
}
function dp() {
  return {
    get(a) {
      return qt(a);
    },
    list() {
      return Ws();
    },
    listByType(a) {
      return tr(a);
    },
    getTypeLabel(a) {
      return Ni(a);
    },
    evaluate(a) {
      return Vt(a);
    }
  };
}
function mp() {
  return {
    normalizeQualitySystem(a) {
      return Je(a);
    },
    getEditorConfig() {
      return Qn();
    },
    evaluatePhase(a) {
      return Xe(a);
    },
    applyMutations(a) {
      return Kt(a);
    },
    buildRollFacts(a) {
      return rr(a);
    },
    buildActionCostFacts(a) {
      return Zn(a);
    },
    buildBurnFacts(a) {
      return ka(a);
    },
    buildInitiativeFacts(a) {
      return eo(a);
    },
    buildDamageFacts(a) {
      return to(a);
    },
    buildEdgeFacts(a) {
      return va(a);
    },
    buildEndOfActivationFacts(a) {
      return io(a);
    }
  };
}
class pr {
  static start() {
    const e = new pr();
    Hooks.once("init", () => e.onInit()), Hooks.once("ready", () => e.onReady());
  }
  async onInit() {
    console.log(oe + "AnarchySystem.onInit"), game.system.mwd = this, game.system.anarchy = this, game.mwd ?? (game.mwd = {}), cp(), op(), Zu("mwd"), game.mwd.roll = ln, game.mwd.personalCombat = ne, game.mwd.harm = Ye, this.roll = ln, this.personalCombat = ne, this.harm = Ye, this.skills = up(), this.lifeModules = dp(), this.traits = mp(), this.remoteCall = new ya(), game.system.mwd.skills = this.skills, game.system.mwd.lifeModules = this.lifeModules, game.system.mwd.traits = this.traits, game.mwd.skills = this.skills, game.mwd.lifeModules = this.lifeModules, game.mwd.traits = this.traits, te.init(), this.modifiers = new Z(), pt.register(new ep()), pt.register(new tp()), pt.register(new ip()), pt.register(new sp()), pt.register(ap), pt.register(new rp()), pt.register(new np()), pt.register(new Nu()), Handlebars.registerHelper("mwdClassList", (e) => Array.isArray(e) ? e.join(" ") : typeof e == "string" ? e : ""), this.actorClasses = {
      character: Hr,
      npc: Hr,
      vehicle: lo,
      battlemech: Eu
    }, this.hooks = new ai(), this.styles = new Vc(), this.handlebarsManager = new nr(), ne.init(), Td.register(), console.log(oe + "AnarchySystem.onInit | loading system"), CONFIG.ANARCHY = fe, CONFIG.Combat.initiative = { formula: "2d6" }, CONFIG.statusEffects.push({
      id: "overloaded",
      name: "Overloaded",
      icon: "systems/mwd/img/icons/status/surge.svg"
    }), CONFIG.Actor.documentClass = Ud, CONFIG.Item.documentClass = Ri, Ri.init(), Nd(), _d(), await xd(), console.log(oe + "AnarchySystem.onInit | done");
  }
  async onReady() {
    if (console.log(oe + "AnarchySystem.onReady"), await ne.onReady(), !game.user.isGM) return;
    await ac();
    const e = game.settings.get(v, "enableGMGadget");
    if (!e) {
      console.log(`${oe}GMManager render skipped (enableGMGadget=false)`);
      return;
    }
    game.mwd = game.mwd ?? {}, game.mwd.gmGadget = () => ed({ systemId: v }).render({ force: !0 }), e && game.mwd.gmGadget();
  }
}
pr.start();
//# sourceMappingURL=index.mjs.map
