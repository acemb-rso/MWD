var Vl = Object.defineProperty;
var Kl = Object.getPrototypeOf;
var Yl = Reflect.get;
var tr = (a) => {
  throw TypeError(a);
};
var Ql = (a, e, t) => e in a ? Vl(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var R = (a, e, t) => Ql(a, typeof e != "symbol" ? e + "" : e, t), gs = (a, e, t) => e.has(a) || tr("Cannot " + t);
var z = (a, e, t) => (gs(a, e, "read from private field"), t ? t.call(a) : e.get(a)), Te = (a, e, t) => e.has(a) ? tr("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), De = (a, e, t, i) => (gs(a, e, "write to private field"), i ? i.call(a, t) : e.set(a, t), t), M = (a, e, t) => (gs(a, e, "access private method"), t);
var wi = (a, e, t) => Yl(Kl(a), t, e);
const we = {
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
}, T = we, w = "mwd", Jl = "MechWarrior: Destiny", Fs = `system.${w}`, Xl = w, ca = `systems/${w}`, oo = `${ca}/style`, Hi = `${ca}/third-party/style`, G = `systems/${w}/templates`, Za = `${ca}/img/icons`, se = `${Za}/skills`, fe = "MWD | ", Zl = 2, ec = 5, tc = 4, lo = 8, Jt = {
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
}, zs = {
  autopilot: "autopilot",
  firewall: "firewall",
  knowledge: "knowledge"
}, Ke = {
  grit: "grit",
  chaos: "chaos",
  insight: "insight",
  rumor: "rumor",
  legend: "legend",
  credibility: "credibility"
}, Pn = {
  physical: [Ke.grit, Ke.chaos],
  mental: [Ke.insight, Ke.rumor],
  social: [Ke.legend, Ke.credibility]
}, S = {
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
  actorAttributes: Jt,
  itemAttributes: zs,
  attributes: { ...Jt, ...zs },
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
    edgePools: Ke,
    edgePoolGroups: Pn,
    physical: {
      grit: Ke.grit,
      chaos: Ke.chaos
    },
    mental: {
      insight: Ke.insight,
      rumor: Ke.rumor
    },
    social: {
      legend: Ke.legend,
      credibility: Ke.credibility
    },
    chaos: Ke.chaos
  },
  area: {
    none: "none",
    shotgun: "shotgun",
    circle: "circle",
    cone: "cone",
    rect: "rect",
    ray: "ray"
  }
}, ic = Object.freeze({
  physical: "physical",
  mental: "mental",
  social: "social"
});
Object.freeze(Object.values(ic));
const Li = {
  [S.actorTypes.character]: [
    S.actorAttributes.strength,
    S.actorAttributes.reflexes,
    S.actorAttributes.willpower,
    S.actorAttributes.intelligence,
    S.actorAttributes.charisma,
    S.actorAttributes.edge
  ],
  [S.actorTypes.npc]: [
    S.actorAttributes.strength,
    S.actorAttributes.reflexes,
    S.actorAttributes.willpower,
    S.actorAttributes.intelligence,
    S.actorAttributes.charisma,
    S.actorAttributes.edge
  ],
  [S.actorTypes.vehicle]: [
    S.actorAttributes.handling,
    S.actorAttributes.system,
    S.actorAttributes.chassis,
    S.actorAttributes.condition
  ],
  [S.actorTypes.battlemech]: [
    S.actorAttributes.handling,
    S.actorAttributes.system,
    S.actorAttributes.chassis,
    S.actorAttributes.condition
  ]
}, ys = {
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
}, We = {
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
  SYSTEM_DESCRIPTION: Jl,
  SYSTEM_SOCKET: Fs,
  SYSTEM_SCOPE: Xl,
  SYSTEM_PATH: ca,
  STYLE_PATH: oo,
  THIRD_PARTY_STYLE_PATH: Hi,
  TEMPLATES_PATH: G,
  ICONS_PATH: Za,
  ICONS_SKILLS_PATH: se,
  LOG_HEAD: fe,
  SPECIALIZATION_BONUS: Zl,
  TARGET_SUCCESS: ec,
  TARGET_SUCCESS_EDGE: tc,
  BASE_MONITOR: lo,
  ACTOR_ATTRIBUTES: Jt,
  ITEM_ATTRIBUTES: zs,
  EDGE_POOL_GROUPS: Pn,
  TEMPLATE: S,
  ANARCHY_SYSTEM: We
};
const pt = class pt {
  static ascending(e = (t) => t) {
    return (t, i) => pt.sortingBy(e(t), e(i));
  }
  static descending(e = (t) => t) {
    return (t, i) => pt.sortingBy(e(i), e(t));
  }
  static sortingBy(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
  }
  static bySortedArray(e) {
    return (t) => e.indexOf(t);
  }
  static ascendingBySortedArray(e) {
    return pt.ascending(pt.bySortedArray(e));
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
    return e.map(t).filter((i) => i != null).reduce(pt.sum(), 0);
  }
  static divint(e, t) {
    return Math.floor(e / t);
  }
  static divup(e, t) {
    return Math.ceil(e / t);
  }
  static join(e, t = "") {
    return e.reduce(pt.joiner(t));
  }
  static joiner(e = "") {
    return (t, i) => t + e + i;
  }
  static classify(e, t = (i) => i.type) {
    let i = {};
    return pt.classifyInto(i, e, t), i;
  }
  static classifyFirst(e, t) {
    let i = {};
    for (const s of e) {
      const n = t(s);
      i[n] || (i[n] = s);
    }
    return i;
  }
  static classifyInto(e, t, i = (s) => s.type) {
    for (const s of t) {
      const n = i(s);
      let r = e[n];
      r || (r = [], e[n] = r), r.push(s);
    }
  }
  static showControlWhen(e, t) {
    t ? e.show() : e.hide();
  }
  static minmax(e, t, i) {
    return Math.max(t, Math.min(e, i));
  }
};
R(pt, "isString", (e) => typeof e == "string" || e instanceof String);
let ee = pt;
const ac = {
  keyword: "keywords",
  disposition: "dispositions",
  cue: "cues"
}, E = class E {
  /**
   * Initialize enum caches.
   * Call once during system init/setup after config/constants are available.
   */
  static init() {
    var t, i, s, n, r, o, l, c, u, d, m, p;
    E.hbsAttributes = E.mapObjectToKeyValue(T.attributes).filter((f) => f.value !== "knowledge" && f.value !== "noAttribute"), E.hbsItemTypes = E.mapObjectToKeyValue(T.itemType), E.hbsMonitors = E.mapObjectToKeyValue(T.monitor), E.hbsMonitorLetters = E.mapObjectToKeyValue(T.monitorLetter), E.hbsAssetModuleCategories = E.mapObjectToKeyValue(T.assetModuleCategory), (i = (t = T.item) == null ? void 0 : t.lifeModule) != null && i.type ? E.hbsLifeModuleTypes = E.mapObjectToKeyValue(T.item.lifeModule.type) : (console.warn("MWD | MWD.item.lifeModule.type is missing; life module enums disabled."), E.hbsLifeModuleTypes = []), E.hbsAreas = E.mapObjectToKeyValue(T.area), E.hbsRanges = E.mapObjectToKeyValue(T.range), E.hbsVehicleCategories = E.mapObjectToKeyValue(T.vehicleCategory), E.hbsMwdWeightClasses = E.mapObjectToKeyValue((s = T.mwd) == null ? void 0 : s.weightClass), E.hbsMwdHardpointTypes = E.mapObjectToKeyValue((n = T.mwd) == null ? void 0 : n.hardpointType), E.hbsMwdHardpointSizes = E.mapObjectToKeyValue((r = T.mwd) == null ? void 0 : r.hardpointSize), E.hbsMwdHardpointLocations = E.mapObjectToKeyValue((o = T.mwd) == null ? void 0 : o.hardpointLocation), E.hbsMwdPrimaryModes = E.mapObjectToKeyValue((l = T.mwd) == null ? void 0 : l.primarySlotMode), E.hbsMwdWeaponCategories = E.mapObjectToKeyValue((c = T.mwd) == null ? void 0 : c.weaponCategory), E.hbsMwdWeaponDamageTypes = E.mapObjectToKeyValue((u = T.mwd) == null ? void 0 : u.weaponDamageType), E.hbsPersonalWeaponDamageTypes = E.mapObjectToKeyValue((d = T.mwd) == null ? void 0 : d.personalDamageType), E.hbsPersonalWeaponDamageCategories = E.mapObjectToKeyValue((m = T.mwd) == null ? void 0 : m.personalDamageCategory), E.hbsMwdMeleeLocations = E.mapObjectToKeyValue((p = T.mwd) == null ? void 0 : p.meleeLocation), E.hbsDamageTypes = ee.distinct(
      (E.hbsMwdWeaponDamageTypes ?? []).concat(E.hbsPersonalWeaponDamageTypes ?? []),
      (f) => f.value
    );
    const e = Object.values(Li).flat();
    E.sortedAttributeKeys = ee.distinct(
      e.concat(Object.keys(T.attributes ?? {}))
    ), E.registerHandleBarHelpers(), E.ENUMS = E.getEnums();
  }
  static registerHandleBarHelpers() {
    typeof Handlebars > "u" || Handlebars.registerHelper("sortedAttributes", (e) => {
      if (!e || typeof e != "object") return [];
      const t = Object.keys(e), i = E.sortedAttributeKeys ?? [], s = new Map(i.map((n, r) => [n, r]));
      return t.sort((n, r) => {
        const o = s.has(n) ? s.get(n) : 9999, l = s.has(r) ? s.get(r) : 9999;
        return o !== l ? o - l : String(n).localeCompare(String(r));
      }), t.map((n) => {
        const r = e[n];
        return r && typeof r == "object" ? { key: n, ...r } : { key: n, value: r };
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
    return ac;
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
    var s, n, r, o, l;
    const t = ((n = (s = game == null ? void 0 : game.system) == null ? void 0 : s.mwd) == null ? void 0 : n.skills) ?? ((o = (r = game == null ? void 0 : game.system) == null ? void 0 : r.anarchy) == null ? void 0 : o.skills);
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
      const n = e[s];
      let r;
      return n && typeof n == "object" ? r = n.label ?? n.name ?? n.value ?? String(s) : n != null ? r = String(n) : r = String(s), {
        [t]: s,
        [i]: r
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
let ce = E;
class sc {
  static monitor(e) {
    return ce.getFromList(ce.getMonitors(), e) ?? "";
  }
  static letter(e) {
    return ce.getFromList(ce.getMonitorLetters(), e) ?? "";
  }
}
class nc {
  static toLowerCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}
const rc = [
  "fas fa-dice",
  "fas fa-dice-one",
  "fas fa-dice-two",
  "fas fa-dice-three",
  "fas fa-dice-four",
  "fas fa-dice-five",
  "fas fa-dice-six"
];
class U {
  static fontAwesome(e) {
    return `<i class="${e}"></i>`;
  }
  static iconSystemPath(e, t) {
    return U.iconPath(`${oo}/${e}`, t);
  }
  static iconPath(e, t) {
    return `<img class="${t}" src="${e}" />`;
  }
  static iconD6(e) {
    if (e < 0 || e > 6)
      throw `Dice ${e} is out of dice range [1..6] or 0 for multidice`;
    return U.fontAwesome(rc[e]);
  }
}
globalThis.ANARCHY_ICONS = U;
const be = (a, e = {}) => a.replace(/\{(.*?)\}/g, (t, i) => e[i] ?? "");
function Nn(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => Nn(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function ia(a = []) {
  return Array.from(new Set(a.map((e) => String(e ?? "").trim()).filter(Boolean)));
}
function Ca(a, e = "standard") {
  return String(a ?? "").trim() || e;
}
function oc(a, e = {}) {
  a && (a.movedToKeywords ?? (a.movedToKeywords = []), a.movedToKeywords.push(e));
}
function lc(a, e, t = {}) {
  a && (a.errors ?? (a.errors = []), a.errors.push({ message: e, ...t }));
}
const Rn = Object.freeze(["templated"]), cc = Object.freeze([
  "burstCapable",
  "fullAutoCapable",
  "salvoCapable"
]), uc = Object.freeze([
  "clustered",
  "mineLayer",
  "smoke",
  "incendiary",
  "emp"
]), dc = Object.freeze([
  { value: "burstCapable", label: "Burst Capable" },
  { value: "fullAutoCapable", label: "Full Auto Capable" },
  { value: "salvoCapable", label: "Salvo Capable" }
]), mc = Object.freeze([
  { value: "templated", label: "Templated" },
  { value: "clustered", label: "Clustered" },
  { value: "mineLayer", label: "Mine Layer" },
  { value: "smoke", label: "Smoke" },
  { value: "incendiary", label: "Incendiary" },
  { value: "emp", label: "EMP" }
]), co = Object.freeze([
  { value: "blast", label: "Blast" },
  { value: "cone", label: "Cone" },
  { value: "line", label: "Line" },
  { value: "cloud", label: "Cloud" },
  { value: "minefield", label: "Minefield" }
]), uo = Object.freeze([
  { value: "targeted", label: "Targeted" },
  { value: "origin", label: "Origin" },
  { value: "placed", label: "Placed" }
]), pc = Object.freeze(["blast", "cone", "line"]);
new Set(Rn);
const fc = /* @__PURE__ */ new Set([
  ...Rn,
  ...cc
]), hc = /* @__PURE__ */ new Set([
  ...Rn,
  ...uc
]);
function In() {
  return {
    movedToKeywords: [],
    errors: []
  };
}
function Ua(a) {
  return ia(Nn(a));
}
function mo({
  traits: a = [],
  keywords: e = [],
  recognized: t = /* @__PURE__ */ new Set(),
  report: i = null,
  owner: s = "weapon",
  path: n = ""
} = {}) {
  const r = Nn(a), o = Ua(e), l = [], c = [...o];
  for (const u of r) {
    if (t.has(u)) {
      l.push(u);
      continue;
    }
    c.push(u), oc(i, {
      owner: s,
      from: n || "traits",
      to: n ? n.replace(/traits$/u, "keywords") : "keywords",
      value: u
    });
  }
  return {
    traits: ia(l),
    keywords: ia(c)
  };
}
function po({
  traits: a = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.traits"
} = {}) {
  return mo({
    traits: a,
    keywords: e,
    recognized: fc,
    report: t,
    owner: "weapon",
    path: i
  });
}
function fo({
  traits: a = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.payloads[].traits"
} = {}) {
  return mo({
    traits: a,
    keywords: e,
    recognized: hc,
    report: t,
    owner: "payload",
    path: i
  });
}
function ho(a = {}, e = "standard") {
  const t = a ?? {}, i = Ca(
    t.resolverKey ?? t.damageModel ?? t.resolver,
    e
  ), s = String(t.damageModel ?? "").trim(), n = t.onHitEffect;
  return {
    resolverKey: i,
    damageModel: s,
    onHitEffect: n === null ? null : String(n ?? "").trim() || null
  };
}
function bs(a = {}) {
  const e = a ?? {}, t = !!e.enabled, i = e.shots, s = e.accuracyMod, n = e.addHeat, r = e.consumption;
  return {
    enabled: t,
    ...i !== void 0 ? { shots: Math.max(0, Number(i ?? 0) || 0) } : {},
    ...s !== void 0 ? { accuracyMod: Number(s ?? 0) || 0 } : {},
    ...n !== void 0 ? { addHeat: Number(n ?? 0) || 0 } : {},
    ...r !== void 0 ? { consumption: Math.max(0, Number(r ?? 0) || 0) } : {}
  };
}
function gc(a = {}) {
  const e = a ?? {};
  return {
    single: bs(e.single),
    burst: bs(e.burst),
    fullAuto: bs(e.fullAuto)
  };
}
function yc(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return e === "circle" ? "blast" : e === "ray" ? "line" : co.some((t) => t.value === e) ? e : "";
}
function bc(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return ["target", "targeted"].includes(e) ? "targeted" : uo.some((t) => t.value === e) ? e : "";
}
function Sc(a = null) {
  const e = a ?? {}, t = yc(e.shape ?? e.t ?? e.type), i = e.size ?? e.distance ?? e.radius ?? e.length, s = bc(e.placement ?? e.origin ?? e.mode);
  return !t && i === void 0 && !s ? null : {
    shape: t,
    size: Math.max(0, Number(i ?? 0) || 0),
    placement: s || "targeted"
  };
}
function Ac({
  weapon: a = {},
  payload: e = {},
  effectiveTraits: t = [],
  effectiveResolution: i = null,
  report: s = null
} = {}) {
  var g, y;
  const n = ia((a == null ? void 0 : a.traits) ?? []), r = ia((e == null ? void 0 : e.traits) ?? []), o = t.includes("templated"), l = n.includes("templated"), c = r.includes("templated"), u = (e == null ? void 0 : e.template) ?? null, d = (a == null ? void 0 : a.template) ?? null, m = Ca((g = e == null ? void 0 : e.resolution) == null ? void 0 : g.resolverKey, ""), p = Ca((y = a == null ? void 0 : a.resolution) == null ? void 0 : y.resolverKey, ""), f = Ca(i == null ? void 0 : i.resolverKey, "standard"), h = [];
  if (!o)
    return {
      errors: h,
      liveCapabilities: [],
      template: null,
      resolverKey: f,
      isTemplated: !1
    };
  l && h.push("Weapon-authored templated attacks are not supported in personal weapon capability v1."), l && c && h.push("Templated capability cannot be authored on both weapon and payload."), d && h.push("Template configuration must be authored on the payload for templated attacks."), c || h.push("Templated attacks require the active payload to author the templated capability."), (!(u != null && u.shape) || !(Number(u == null ? void 0 : u.size) > 0)) && h.push("Templated payloads require a valid template shape and size."), u != null && u.placement || h.push("Templated payloads require a template placement mode."), f !== "template" && h.push("Templated attacks require resolution.resolverKey to be template."), m && m !== "template" && h.push("Payload templated attacks must author resolution.resolverKey as template."), p === "template" && h.push("Weapon-level template resolver routing is not supported for personal weapon capability v1.");
  for (const b of h)
    lc(s, b, { capability: "templated" });
  return {
    errors: h,
    liveCapabilities: ["templated"],
    template: u,
    resolverKey: f,
    isTemplated: !0
  };
}
const go = Object.freeze({
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}), ja = Object.freeze(
  Object.entries(go).map(([a, e]) => ({ value: a, label: e }))
), wc = Object.freeze({
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
}), Tc = Object.freeze(
  ja.map((a) => a.value)
), Ws = Object.freeze({}), es = Object.freeze({
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
}), kc = Object.freeze(
  Object.values(es).map((a) => ({
    value: a.key,
    label: a.label,
    rated: a.rated
  }))
), yo = wo(Ws), bo = wo(es);
function ts(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => ts(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function bt(a, e = "penetrating") {
  const t = String(a ?? "").trim().toLowerCase();
  return wc[t] ?? e;
}
function So(a) {
  const e = String(a ?? "").trim();
  return e ? bt(e, "") : "";
}
function Ao(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return Tc.includes(e);
}
function Ot(a) {
  const e = bt(a, "");
  return go[e] ?? String(a ?? "").trim();
}
function yt(a) {
  const e = a ?? {}, t = Number(e.ballistic ?? 0) || 0, i = Number(e.melee ?? 0) || 0;
  return {
    penetrating: e.penetrating !== void 0 ? Number(e.penetrating ?? 0) || 0 : Math.max(t, i),
    concussive: e.concussive !== void 0 ? Number(e.concussive ?? 0) || 0 : Number(e.explosive ?? 0) || 0,
    energy: Number(e.energy ?? 0) || 0,
    thermal: Number(e.thermal ?? 0) || 0,
    electrical: Number(e.electrical ?? 0) || 0
  };
}
function Ea(a) {
  return ts(a);
}
function Wi(a) {
  return ts(a);
}
function vc(a) {
  return Ua(a);
}
function Pa(a = {}, e = "standard") {
  return ho(a, e);
}
function Na(a = {}) {
  return gc(a);
}
function Mc(a = null) {
  return Sc(a);
}
function $i(a = "id") {
  var t, i;
  const e = (i = (t = globalThis.foundry) == null ? void 0 : t.utils) == null ? void 0 : i.randomID;
  return typeof e == "function" ? e() : `${a}-${Math.random().toString(36).slice(2, 10)}`;
}
function wo(a) {
  const e = {};
  return Object.values(a).forEach((t) => {
    [t.key, ...t.aliases ?? []].forEach((i) => {
      e[aa(i)] = t.key;
    });
  }), Object.freeze(e);
}
function aa(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function Ui(a) {
  return Array.isArray(a) ? a : a && typeof a == "object" ? Object.values(a) : a == null || a === "" ? [] : [a];
}
function To(a, e) {
  return Ui(a).map((t) => Cc(t, e)).filter(Boolean);
}
function Cc(a, e) {
  if (typeof a == "string" || typeof a == "number") {
    const i = e[aa(a)];
    return i ? { id: $i("trait"), key: i, rating: 1 } : null;
  }
  if (!a || typeof a != "object") return null;
  const t = e[aa(a.key ?? a.value ?? a.name)];
  return t ? {
    id: String(a.id ?? "").trim() || $i("trait"),
    key: t,
    rating: Math.max(0, Number(a.rating ?? 0) || 0)
  } : null;
}
function di(a) {
  return To(a, yo);
}
function Et(a) {
  return To(a, bo);
}
function Ha(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function Ec(a = {}, e = {}) {
  const t = Ha(a), i = Ha(e);
  return {
    close: t.close + i.close,
    near: t.near + i.near,
    far: t.far + i.far,
    extreme: t.extreme + i.extreme
  };
}
function Pc(a, e) {
  var t;
  return ((t = e[a]) == null ? void 0 : t.label) ?? a;
}
function ko(a, e) {
  var s;
  const t = Pc(a == null ? void 0 : a.key, e), i = Math.max(0, Number((a == null ? void 0 : a.rating) ?? 0) || 0);
  return (s = e[a == null ? void 0 : a.key]) != null && s.rated && i > 0 ? `${t} ${i}` : t;
}
function vo(a, e) {
  return Ui(a).map((t) => {
    const i = t == null ? void 0 : t.key, s = e[i];
    return s != null && s.resolve ? {
      entry: t,
      effect: s.resolve(t),
      label: ko(t, e)
    } : null;
  }).filter(Boolean);
}
function Nc(a, e) {
  const t = { ...a ?? {} };
  return Object.entries(e ?? {}).forEach(([i, s]) => {
    t[i] = (Number(t[i] ?? 0) || 0) + (Number(s ?? 0) || 0);
  }), t;
}
function Rc(a = []) {
  const e = {}, t = /* @__PURE__ */ new Set();
  for (const i of a.filter(Boolean)) {
    i.accuracyMod !== void 0 && (e.accuracyMod = (Number(e.accuracyMod ?? 0) || 0) + (Number(i.accuracyMod ?? 0) || 0)), i.ap !== void 0 && (e.ap = (Number(e.ap ?? 0) || 0) + (Number(i.ap ?? 0) || 0)), i.addHeat !== void 0 && (e.addHeat = (Number(e.addHeat ?? 0) || 0) + (Number(i.addHeat ?? 0) || 0)), i.bonusVsArmorTag && (e.bonusVsArmorTag = Nc(e.bonusVsArmorTag, i.bonusVsArmorTag));
    for (const s of i.flags ?? []) {
      const n = String(s ?? "").trim();
      n && t.add(n);
    }
  }
  return t.size > 0 && (e.flags = Array.from(t)), e;
}
function Ic(a = [], e = []) {
  const t = Array.isArray(a) || typeof a == "string" ? { traits: a, standardTraits: e } : a ?? {}, i = Wi(t.traits), s = di(t.standardTraits), n = vo(s, Ws), r = i.map((o) => {
    var u;
    const l = yo[aa(o)];
    if (!l) return null;
    const c = (u = Ws[l]) == null ? void 0 : u.resolve;
    return typeof c == "function" ? c({ key: l, rating: 1 }) : null;
  });
  return Rc([
    ...n.map((o) => o.effect),
    ...r
  ]);
}
function Dc(a) {
  const e = a ?? {}, t = In(), i = fo({
    traits: e.traits,
    keywords: e.keywords,
    report: t,
    path: "ammo.types[].traits"
  });
  return {
    id: String(e.id ?? "").trim() || $i("ammo"),
    name: String(e.name ?? "").trim() || "Ammo",
    damageType: So(e.damageType),
    apMod: Number(e.apMod ?? e.ap ?? 0) || 0,
    attackRatingBandMod: Ha(e.attackRatingBandMod ?? e.attackRatingBand),
    traits: i.traits,
    keywords: i.keywords,
    migration: t
  };
}
function Oc(a) {
  var l;
  const e = a ?? {}, t = Math.max(0, Number(e.max ?? 0) || 0), i = Number(e.current), s = Number.isFinite(i) ? Math.max(0, Math.min(i, t > 0 ? t : i)) : Math.max(0, t), n = Ui(e.types).map(Dc), r = String(e.activeTypeId ?? "").trim(), o = n.some((c) => c.id === r) ? r : ((l = n[0]) == null ? void 0 : l.id) ?? "";
  return {
    current: s,
    max: t,
    consumePerAttack: Math.max(1, Number(e.consumePerAttack ?? 1) || 1),
    activeTypeId: o,
    types: n
  };
}
function _c(a, e = "untracked") {
  const t = String(a ?? "").trim();
  return t ? t === "linked" ? "internal" : t === "perAttack" ? e : ["untracked", "internal", "actorResource", "itemRef"].includes(t) ? t : e : e;
}
function Us(a = {}) {
  const e = a ?? {};
  return {
    amount: Math.max(1, Number(e.amount ?? e.consumePerUse ?? e.consumePerAttack ?? 1) || 1),
    sourceId: String(e.sourceId ?? "").trim()
  };
}
function ir(a = {}) {
  const e = a ?? {};
  return {
    damageType: So(e.damageType),
    ap: Number(e.ap ?? e.apMod ?? 0) || 0,
    attackRatingBand: Ha(e.attackRatingBand ?? e.attackRatingBandMod)
  };
}
function js(a = {}) {
  return ho(a, "standard");
}
function Lc(a) {
  return String(a ?? "").trim().toLowerCase() === "unloaded";
}
function Je(a, { report: e = null, path: t = "system.payloads[]" } = {}) {
  var l;
  const i = a ?? {}, s = String(i.id ?? "").trim() || $i("payload"), n = fo({
    traits: i.traits ?? ((l = i.modifies) == null ? void 0 : l.traits),
    keywords: i.keywords,
    report: e,
    path: `${t}.traits`
  }), r = ts(i.compatibleWith ?? i.compatible), o = Mc(i.template);
  return Lc(s) ? {
    id: "unloaded",
    label: "Unloaded",
    compatibleWith: [],
    modifies: ir({}),
    traits: [],
    keywords: [],
    template: null,
    resolution: js({ resolverKey: "standard" }),
    consumption: Us({ amount: 1, sourceId: "" })
  } : {
    id: s,
    label: String(i.label ?? i.name ?? "").trim() || "Payload",
    compatibleWith: r,
    modifies: ir(i.modifies ?? i),
    traits: n.traits,
    keywords: n.keywords,
    template: o,
    resolution: js(i.resolution ?? i),
    consumption: Us(i.consumption ?? i)
  };
}
function It(a) {
  var o, l, c, u, d, m;
  const e = a ?? {}, t = _c(
    e.kind || e.type || ((o = e.link) != null && o.actorPath || e.actorPath ? "actorResource" : "") || ((l = e.link) != null && l.itemId || e.itemId || (c = e.link) != null && c.itemPath || e.itemPath ? "itemRef" : "") || (e.tracking || e.current !== void 0 || e.max !== void 0 ? "internal" : "") || "untracked",
    "untracked"
  ), i = e.tracking ?? e, s = Math.max(0, Number(i.max ?? 0) || 0), n = Number(i.current), r = Number.isFinite(n) ? Math.max(0, Math.min(n, s > 0 ? s : n)) : Math.max(0, s);
  return {
    id: String(e.id ?? "").trim() || $i("source"),
    label: String(e.label ?? e.name ?? "").trim() || "Source",
    kind: t,
    tracking: {
      current: r,
      max: s
    },
    link: {
      actorPath: String(((u = e.link) == null ? void 0 : u.actorPath) ?? e.actorPath ?? "").trim(),
      itemId: String(((d = e.link) == null ? void 0 : d.itemId) ?? e.itemId ?? "").trim(),
      itemPath: String(((m = e.link) == null ? void 0 : m.itemPath) ?? e.itemPath ?? "").trim()
    }
  };
}
function Mo({ report: a = null, path: e = "system.payloads" } = {}) {
  return {
    payloads: [Je({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: a, path: `${e}[0]` })],
    selectedPayloadId: "unloaded",
    consumptionSources: [It({
      id: "untracked",
      label: "Untracked",
      kind: "untracked"
    })]
  };
}
function Co(a) {
  return String(a ?? "").trim().toLowerCase() === "melee";
}
function Hs(a = [], { report: e = null, path: t = "system.payloads" } = {}) {
  const i = Ui(a).map((s, n) => Je(s, { report: e, path: `${t}[${n}]` })).filter(Boolean);
  return i.some((s) => s.id === "unloaded") ? i : [
    Je({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: e, path: `${t}[0]` }),
    ...i
  ];
}
function is(a = {}, { report: e = null, path: t = "system.payloads" } = {}) {
  var d;
  const i = Oc(a), s = Math.max(1, Number(i.consumePerAttack ?? 1) || 1), n = i.max > 0, r = n ? "internal-magazine" : "untracked", o = [It(n ? {
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
  })], l = i.types.length ? i.types.map((m, p) => Je({
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
      amount: s,
      sourceId: n ? r : ""
    }
  }, { report: e, path: `${t}[${p}]` })) : [Je({
    id: "unloaded",
    label: "Unloaded",
    resolution: { resolverKey: "standard" },
    consumption: {
      amount: s,
      sourceId: n ? r : ""
    }
  }, { report: e, path: `${t}[0]` })], c = Hs(l, { report: e, path: t }), u = c.some((m) => m.id === i.activeTypeId) ? i.activeTypeId : ((d = c[0]) == null ? void 0 : d.id) ?? "unloaded";
  return {
    payloads: c,
    selectedPayloadId: u,
    consumptionSources: o
  };
}
function Pt(a, { legacyAmmo: e = null, category: t = "", report: i = null, path: s = "system.payloads" } = {}) {
  if (Co(t)) return [];
  const n = Ui(a).map((r, o) => Je(r, { report: i, path: `${s}[${o}]` })).filter(Boolean);
  return n.length > 0 ? Hs(n, { report: i, path: s }) : e ? Hs(is(e, { report: i, path: s }).payloads, { report: i, path: s }) : Mo({ report: i, path: s }).payloads;
}
function qi(a, { legacyAmmo: e = null } = {}) {
  const t = Ui(a).map(It).filter(Boolean);
  return t.length > 0 ? t : e ? is(e).consumptionSources : Mo().consumptionSources;
}
function Mi(a, e = [], { legacyAmmo: t = null, category: i = "" } = {}) {
  var r;
  if (Co(i)) return "";
  const s = Pt(e, { legacyAmmo: t, category: i }), n = String(a ?? "").trim();
  if (s.some((o) => o.id === n)) return n;
  if (t) {
    const o = is(t).selectedPayloadId;
    if (s.some((l) => l.id === o)) return o;
  }
  return ((r = s[0]) == null ? void 0 : r.id) ?? "unloaded";
}
function ar({ root: a = null, path: e = "", fallback: t = {} } = {}) {
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
  const n = Math.max(0, Number(s ?? t.current ?? 0) || 0), r = Math.max(n, Math.max(0, Number(t.max ?? 0) || 0));
  return {
    current: r > 0 ? Math.min(n, r) : n,
    max: r,
    currentPath: i
  };
}
function $c({ source: a = null, actor: e = null } = {}) {
  var i, s, n, r, o, l, c;
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
    itemPath: String(((n = a.link) == null ? void 0 : n.itemPath) ?? "").trim()
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
    const u = ar({
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
    const u = ((c = (l = e == null ? void 0 : e.items) == null ? void 0 : l.get) == null ? void 0 : c.call(l, t.itemId)) ?? null, d = ar({
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
function qs({
  payloads: a = [],
  selectedPayloadId: e = "",
  consumptionSources: t = [],
  actor: i = null,
  payloadId: s = "",
  category: n = ""
} = {}) {
  const r = Pt(a, { category: n }), o = qi(t), l = Mi(s || e, r, { category: n }), c = r.find((p) => p.id === l) ?? r[0] ?? null, u = (c == null ? void 0 : c.consumption) ?? Us(), d = u.sourceId ? o.find((p) => p.id === u.sourceId) ?? null : o.find((p) => p.kind === "untracked") ?? It({
    id: "untracked",
    label: "Untracked",
    kind: "untracked"
  }), m = $c({ source: d, actor: i });
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
function xc({
  damageType: a = "penetrating",
  ap: e = 0,
  attackRatingBand: t = {},
  traits: i = [],
  keywords: s = [],
  standardTraits: n = [],
  resolution: r = {},
  fireModes: o = {},
  payloads: l = [],
  selectedPayloadId: c = "",
  consumptionSources: u = [],
  payloadId: d = "",
  actor: m = null,
  ammo: p = null,
  ammoTypeId: f = "",
  category: h = ""
} = {}) {
  var X, Z, ie, ue, Se;
  const g = qs({
    payloads: l != null && l.length ? l : void 0,
    selectedPayloadId: c || f,
    consumptionSources: u,
    actor: m,
    payloadId: d || f,
    category: h
  }), b = ((!l || l.length === 0) && p ? qs({
    ...is(p),
    actor: m,
    payloadId: d || f,
    category: h
  }) : null) ?? g, A = b.activePayload, v = po({
    traits: i,
    keywords: s
  }), C = Array.from(/* @__PURE__ */ new Set([
    ...v.traits,
    ...Wi(A == null ? void 0 : A.traits)
  ])), I = Ua([
    ...v.keywords,
    ...Ua(A == null ? void 0 : A.keywords)
  ]), P = Pa(r, "standard"), x = (X = A == null ? void 0 : A.resolution) != null && X.resolverKey ? js(A.resolution) : P, V = Na(o), Q = In(), K = Ac({
    weapon: {
      traits: v.traits,
      resolution: P
    },
    payload: A,
    effectiveTraits: C,
    effectiveResolution: x,
    report: Q
  }), H = di(n), D = Ic({
    traits: [],
    standardTraits: H
  }), W = {
    ...b.sourceState
  };
  return delete W.sourceItem, {
    damageType: ((Z = A == null ? void 0 : A.modifies) == null ? void 0 : Z.damageType) || bt(a),
    ap: (Number(e ?? 0) || 0) + (Number(((ie = A == null ? void 0 : A.modifies) == null ? void 0 : ie.ap) ?? 0) || 0),
    attackRatingBand: Ec(
      t,
      ((ue = A == null ? void 0 : A.modifies) == null ? void 0 : ue.attackRatingBand) ?? {}
    ),
    effects: D,
    traits: C,
    keywords: I,
    standardTraits: H,
    payloadLabel: b.payloadLabel,
    payload: A ? foundry.utils.deepClone(A) : null,
    payloadState: {
      payloads: b.payloads.map((O) => foundry.utils.deepClone(O)),
      activePayloadId: b.activePayloadId,
      payloadLabel: b.payloadLabel,
      sourceId: ((Se = b.source) == null ? void 0 : Se.id) ?? "",
      sourceLabel: b.sourceState.label ?? "",
      sourceKind: b.sourceState.kind ?? "untracked",
      isTracked: b.sourceState.isTracked,
      current: b.sourceState.current,
      max: b.sourceState.max,
      consumePerUse: b.sourceState.consumePerUse
    },
    source: b.source ? foundry.utils.deepClone(b.source) : null,
    sourceState: foundry.utils.deepClone(W),
    template: K.template ? foundry.utils.deepClone(K.template) : null,
    resolution: foundry.utils.deepClone(x),
    resolverKey: String((x == null ? void 0 : x.resolverKey) ?? "standard").trim() || "standard",
    fireModes: foundry.utils.deepClone(V),
    capabilityReport: {
      ...Q,
      liveCapabilities: K.liveCapabilities,
      isTemplated: K.isTemplated,
      template: K.template ? foundry.utils.deepClone(K.template) : null,
      resolverKey: String((x == null ? void 0 : x.resolverKey) ?? "standard").trim() || "standard"
    },
    ammoLabel: b.payloadLabel,
    ammoType: A ? foundry.utils.deepClone(A) : null,
    ammoState: {
      current: W.current,
      max: W.max,
      consumePerAttack: W.consumePerUse,
      activeTypeId: b.activePayloadId,
      types: b.payloads.map((O) => {
        var F;
        return {
          id: O.id,
          name: O.label,
          damageType: ((F = O.modifies) == null ? void 0 : F.damageType) ?? "",
          traits: O.traits ?? [],
          keywords: O.keywords ?? []
        };
      }),
      isTracked: W.isTracked,
      ammoLabel: b.payloadLabel
    }
  };
}
function Eo(a = {}, e = {}) {
  const t = yt(a), i = yt(e);
  return {
    penetrating: t.penetrating + i.penetrating,
    concussive: t.concussive + i.concussive,
    energy: t.energy + i.energy,
    thermal: t.thermal + i.thermal,
    electrical: t.electrical + i.electrical
  };
}
function Ss({ standardTraits: a = [], traits: e = [], traitState: t = {} } = {}) {
  var m, p;
  const i = Et(a), n = Wi(e).map((f) => {
    const h = bo[aa(f)];
    return h ? { id: $i("trait"), key: h, rating: h === "reinforced" ? 1 : 0 } : null;
  }).filter(Boolean), r = vo(
    [...i, ...n],
    es
  ), o = r.reduce((f, h) => {
    var g;
    return Eo(f, ((g = h.effect) == null ? void 0 : g.mitigationByType) ?? {});
  }, yt({})), l = r.reduce(
    (f, h) => {
      var g;
      return f + Math.max(0, Number(((g = h.effect) == null ? void 0 : g.reinforced) ?? 0) || 0);
    },
    0
  ), c = Number((m = t == null ? void 0 : t.reinforced) == null ? void 0 : m.current), u = Number((p = t == null ? void 0 : t.reinforced) == null ? void 0 : p.max), d = Number.isFinite(c) ? c : Number.isFinite(u) ? u : l;
  return {
    mitigationByType: o,
    reinforcedMax: l,
    traitState: {
      reinforced: {
        current: Math.min(l, Math.max(0, d || 0)),
        max: l
      }
    },
    labels: r.map((f) => f.label),
    standardTraits: i
  };
}
function Bc({ traits: a = [], standardTraits: e = [] } = {}) {
  return [
    ...Wi(a),
    ...Et(e).map((i) => ko(i, es))
  ].filter(Boolean);
}
function Dn(a) {
  const e = Math.max(0, Number(a ?? 0) || 0);
  return e <= 0 ? 0 : Math.ceil(e / 4);
}
function Fc({
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
  const s = bt(t, "penetrating"), n = yt(e), r = Dn(i), o = Number(n[s] ?? 0) || 0;
  return {
    currentArmorRating: i,
    baseMitigation: r,
    typeMitigationMod: o,
    totalMitigation: r + o,
    isDestroyed: !1
  };
}
function zc({ damageIncoming: a = 0, armorTags: e = [], effects: t = {} } = {}) {
  const i = new Set(Ea(e));
  let s = Number(a ?? 0) || 0;
  const n = [];
  return Object.entries((t == null ? void 0 : t.bonusVsArmorTag) ?? {}).forEach(([r, o]) => {
    if (!i.has(r)) return;
    const l = Number(o ?? 0) || 0;
    l && (s *= 1 + l, n.push({ tag: r, bonus: l }));
  }), {
    damageIncoming: s,
    applied: n
  };
}
class bi {
  static checkSufficient(e, t, i) {
    if (t > i) {
      const s = be(T.common.errors.insufficient, {
        resource: e,
        required: t,
        available: i
      });
      throw ui.notifications.error(s), s;
    }
  }
  static checkOutOfRange(e, t, i, s) {
    if (t < i || t > s) {
      const n = be(T.common.errors.outOfRange, {
        resource: e,
        value: t,
        min: i,
        max: s
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkUserGM() {
    if (!game.user.isGM) {
      const e = T.common.errors.onlyGM;
      throw ui.notifications.error(e), e;
    }
  }
  static checkItemType(e, t) {
    if (e.type != t) {
      const i = be(T.common.errors.expectedType, {
        type: e.type ? T.itemType.singular[e.type] : e.type,
        expectedType: t
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkActorCanReceiveDamage(e, t, i) {
    if (!t) {
      const s = be(T.common.errors.actorCannotReceiveDamage, {
        actor: i.name,
        damageType: Ao(e) ? Ot(e) : T.actor.monitors[e] ?? T.mwd.weaponDamageType[e] ?? T.mwd.personalDamageType[e] ?? e
      });
      throw ui.notifications.error(s), s;
    }
  }
  static checkWeaponDefense(e, t) {
    var s;
    const i = e.getDefense();
    if ((((s = e.isPersonalWeapon) == null ? void 0 : s.call(e)) ?? e.type === S.itemType.personalWeapon) && !i) {
      const n = be(T.common.errors.noDefenseOnWeapon, { actor: t.name, weapon: e.name });
      throw ui.notifications.error(n), n;
    }
  }
  static checkTargetsCount(e, t, i) {
    if (e > 0 && t.length > e) {
      const s = be(T.common.errors.maxTargetsExceedeed, {
        weapon: this.name,
        area: T.area[i],
        count: t.length,
        max: e
      });
      throw ui.notifications.error(s), s;
    }
  }
  static checkActorDefenseAction(e, t, i) {
    if (!e) {
      const s = be(T.common.errors.actorDoesNotHaveDefense, {
        actor: t.name,
        defense: i.labelkey,
        actorType: T.actorType[t.type]
      });
      throw ui.notifications.error(s), s;
    }
  }
}
function mt(a, e, t, i, s, n = (r) => !0) {
  return {
    code: a,
    labelkey: T.attributeAction[a],
    label: T.attributeAction[a],
    attributeFunction1: e ?? ((r) => {
    }),
    attributeFunction2: t ?? ((r) => {
    }),
    icon: i,
    actorTypes: s,
    condition: n
  };
}
function fa(a, e) {
  return {
    code: a,
    labelkey: T.defense[a],
    label: T.defense[a],
    actionCode: e
  };
}
const Pe = S.actorAttributes, Ne = S.actorTypes, Ve = We.actions, ha = We.defenses, As = [
  mt(Ve.defense, (a) => Pe.reflexes, (a) => Pe.intelligence, U.fontAwesome("fas fa-shield-alt"), [Ne.character, Ne.npc]),
  mt(Ve.defense, (a) => Pe.handling, (a) => Pe.chassis, U.fontAwesome("fas fa-tachometer-alt"), [Ne.vehicle, Ne.battlemech]),
  mt(Ve.resistTorture, (a) => Pe.strength, (a) => Pe.willpower, U.fontAwesome("fas fa-angry"), [Ne.character, Ne.npc]),
  mt(Ve.perception, (a) => Pe.logic, (a) => Pe.willpower, U.fontAwesome("fas fa-eye"), [Ne.character, Ne.npc]),
  mt(Ve.perception, (a) => Pe.system, (a) => Pe.handling, U.fontAwesome("fas fa-video"), [Ne.vehicle, Ne.battlemech]),
  mt(Ve.composure, (a) => Pe.charisma, (a) => Pe.willpower, U.fontAwesome("fas fa-meh"), [Ne.character, Ne.npc]),
  mt(Ve.judgeIntentions, (a) => Pe.charisma, (a) => Pe.charisma, U.fontAwesome("fas fa-theater-masks"), [Ne.character, Ne.npc]),
  mt(Ve.memory, (a) => Pe.logic, (a) => Pe.logic, U.fontAwesome("fas fa-brain"), [Ne.character, Ne.npc]),
  mt(Ve.catch, (a) => Pe.reflexes, (a) => Pe.reflexes, U.fontAwesome("fas fa-baseball-ball"), [Ne.character, Ne.npc]),
  mt(Ve.lift, (a) => Pe.strength, (a) => Pe.strength, U.fontAwesome("fas fa-dumbbell"), [Ne.character, Ne.npc])
], ga = [
  fa(ha.physicalDefense, Ve.defense),
  fa(ha.physicalResistance, Ve.resistTorture),
  fa(ha.socialDefense, Ve.composure),
  fa(ha.mentalResistance, Ve.perception)
];
class ke {
  static init() {
    Handlebars.registerHelper("fixedDefenseCode", (e) => ke.fixedDefenseCode(e));
  }
  static all(e = void 0) {
    return e ? As.filter(e) : As;
  }
  static getActorActions(e) {
    return As.filter((t) => t.actorTypes.includes(e.type) && t.condition(e));
  }
  static fixedDefenseCode(e) {
    return We.fixedDefenseCode[e] ?? e;
  }
  static getActorDefenses(e) {
    return ga.map((t) => {
      const i = ke.getActorAction(e, t.actionCode);
      return ke._convertToDefense(i, t);
    }).filter((t) => t == null ? void 0 : t.code);
  }
  static getDefenseAttributeAction(e) {
    var t;
    return (t = ga.find((i) => i.code == e)) == null ? void 0 : t.actionCode;
  }
  static getActorAction(e, t) {
    return ke.getActorActions(e).find((i) => i.code == t);
  }
  static getActorDefense(e, t) {
    t = ke.fixedDefenseCode(t);
    const i = ga.find((n) => n.code == t), s = ke.getActorAction(e, i.actionCode);
    return bi.checkActorDefenseAction(s, e, i), ke._convertToDefense(s, i);
  }
  static _convertToDefense(e, t) {
    return e ? foundry.utils.mergeObject(
      t,
      e ?? {},
      { overwrite: !1, inplace: !1 }
    ) : void 0;
  }
  static getDefenses() {
    return ga;
  }
  static prepareShortcut(e, t) {
    const i = ke.getActorActions(e).find((s) => s.code == t);
    if (i)
      return {
        icon: i.icon,
        label: i.labelkey,
        callback: (s) => s.actor.rollAttributeAction(t)
      };
  }
}
class Gs {
  constructor() {
    this.remoteCalls = {}, game.socket.on(Fs, async (e) => this.onSocketMessage(e));
  }
  static async register(e, t) {
    game.system.anarchy.remoteCall._register(e, t);
  }
  async _register(e, t) {
    if (this.remoteCalls[e])
      throw `RemoteCall msg ${e} is already registered`;
    foundry.utils.mergeObject(t, {
      callback: (i) => {
        console.log(fe + "RemoteCall [", e, "] (", i, ")");
      },
      condition: (i) => !0,
      multiple: !1
      /* true if multiple users should handle the message */
    }, { overwrite: !1 }), this.remoteCalls[e] = t, console.log(fe + "RemoteCall registered", e);
  }
  static call(e, t) {
    return game.system.anarchy.remoteCall._remoteCall(e, t);
  }
  _remoteCall(e, t) {
    const i = this.remoteCalls[e];
    return !i || i.condition(game.user) || !i.multiple && rt.isUniqueConnectedGM() ? !1 : (game.socket.emit(Fs, { msg: e, data: t }), !0);
  }
  async onSocketMessage(e) {
    const t = this.remoteCalls[e.msg];
    if (t) {
      const i = t.condition(game.user), s = t.multiple, n = rt.isUniqueConnectedGM();
      i && (s || n) ? t.callback(e.data) : console.log(fe + "RemoteCall.onSocketMessage(", e, ") ignored :", i, s, n);
    } else
      console.log(fe + "RemoteCall: No callback registered for", e);
  }
}
const sr = "Users.blindMessageToGM";
class rt {
  static init() {
    Gs.register(sr, {
      callback: (e) => rt.blindMessageToGM(e),
      condition: (e) => e.isGM
    });
  }
  static blindMessageToGM(e) {
    Gs.call(sr, e) || ChatMessage.create({
      user: e.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      blind: !0,
      content: be(T.chat.blindMessageToGM, {
        user: game.user.name,
        message: e.content
      })
    });
  }
  static getUsers(e = (t) => !0) {
    return (game.version ? game.users : game.users.entities).filter(e);
  }
  static firstConnectedGM() {
    return rt.getUsers((e) => e.isGM && e.active).sort(ee.ascending((e) => e.id)).at(0) ?? {};
  }
  /**
   * @returns true pour un seul utilisateur: le premier GM connecté par ordre d'id
   */
  static isUniqueConnectedGM(e = game.user) {
    return e.id == rt.firstConnectedGM().id;
  }
  static firstResponsible(e) {
    if (!(e != null && e.testUserPermission))
      return;
    const t = rt.getUsers(
      (i) => i.active && e.testUserPermission(i, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER)
    ).sort(ee.ascending((i) => i.id)).at(0);
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
const Ti = T.actor.monitors, Mt = T.actor.counters, Po = {
  armor: {
    path: "system.monitors.armor.value",
    monitor: (a) => a.system.monitors.armor,
    iconChecked: U.fontAwesome("fas fa-shield-slash"),
    iconUnchecked: U.fontAwesome("fas fa-shield-alt"),
    iconHit: U.fontAwesome("fas fa-bahai"),
    resource: Ti.armor
  },
  fatigue: {
    path: "system.monitors.fatigue.value",
    monitor: (a) => a.system.monitors.fatigue,
    iconChecked: U.fontAwesome("fas fa-grimace"),
    iconUnchecked: U.fontAwesome("far fa-smile"),
    iconHit: U.fontAwesome("fas fa-bahai"),
    resource: Ti.fatigue,
    overflow: (a) => S.monitors.physical,
    useArmor: !0
  },
  physical: {
    path: "system.monitors.physical.value",
    monitor: (a) => a.system.monitors.physical,
    iconChecked: U.fontAwesome("fas fa-heartbeat"),
    iconUnchecked: U.fontAwesome("far fa-heart"),
    iconHit: U.fontAwesome("fas fa-bahai"),
    resource: Ti.physical,
    useArmor: !0
  },
  structure: {
    path: "system.monitors.structure.value",
    monitor: (a) => a.system.monitors.structure,
    iconChecked: U.fontAwesome("fas fa-car-crash"),
    iconUnchecked: U.fontAwesome("fas fa-car-alt"),
    iconHit: U.fontAwesome("fas fa-bahai"),
    resource: Ti.structure
  },
  heat: {
    path: "system.monitors.heat.value",
    monitor: (a) => a.system.monitors.heat,
    iconChecked: U.fontAwesome("fas fa-fire"),
    iconUnchecked: U.fontAwesome("far fa-sun"),
    iconHit: U.fontAwesome("fas fa-temperature-high"),
    resource: Ti.heat
  },
  criticals: {
    path: "system.hybrid.criticals.value",
    monitor: (a) => {
      var e;
      return ((e = a.system.hybrid) == null ? void 0 : e.criticals) ?? { value: 0, max: 0 };
    },
    iconChecked: U.fontAwesome("fas fa-bolt"),
    iconUnchecked: U.fontAwesome("far fa-dot-circle"),
    iconHit: U.fontAwesome("fas fa-exclamation-triangle"),
    resource: Ti.structure
  },
  anarchy: {
    path: "system.counters.anarchy.value",
    monitor: (a) => ({
      value: a.system.counters.anarchy.value,
      max: 6
    }),
    iconChecked: U.iconPath(`${Hi}/anarchy-point.webp`, "checkbar-img"),
    iconUnchecked: U.iconPath(`${Hi}/anarchy-point-off.webp`, "checkbar-img"),
    resource: Mt.anarchy
  },
  plot: {
    path: "system.counters.anarchy.value",
    monitor: (a) => {
      const e = a.system.counters.anarchy.value;
      return { value: e, max: e + 1 };
    },
    iconChecked: U.iconPath(`${Hi}/danger-point.webp`, "checkbar-img"),
    iconUnchecked: U.iconPath(`${Hi}/danger-point-off.webp`, "checkbar-img"),
    resource: Mt.anarchy
  },
  sceneAnarchy: {
    path: "system.counters.edgePools.chaos.value",
    monitor: (a) => {
      const e = a.getEdgePoolValue(S.counters.edgePools.chaos), t = a.getAttributeValue(S.actorAttributes.edge);
      return { value: e, max: t };
    },
    iconChecked: U.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    iconUnchecked: U.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    resource: Mt.edgePools.chaos
  },
  grit: {
    path: "system.counters.edgePools.grit.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(S.counters.edgePools.grit), max: a.getAttributeValue(S.actorAttributes.edge) }),
    iconChecked: U.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    iconUnchecked: U.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    resource: Mt.edgePools.grit
  },
  insight: {
    path: "system.counters.edgePools.insight.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(S.counters.edgePools.insight), max: a.getAttributeValue(S.actorAttributes.edge) }),
    iconChecked: U.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    iconUnchecked: U.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    resource: Mt.edgePools.insight
  },
  legend: {
    path: "system.counters.edgePools.legend.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(S.counters.edgePools.legend), max: a.getAttributeValue(S.actorAttributes.edge) }),
    iconChecked: U.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    iconUnchecked: U.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    resource: Mt.edgePools.legend
  },
  credibility: {
    path: "system.counters.edgePools.credibility.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(S.counters.edgePools.credibility), max: a.getAttributeValue(S.actorAttributes.edge) }),
    iconChecked: U.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    iconUnchecked: U.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    resource: Mt.edgePools.credibility
  },
  rumor: {
    path: "system.counters.edgePools.rumor.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(S.counters.edgePools.rumor), max: a.getAttributeValue(S.actorAttributes.edge) }),
    iconChecked: U.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    iconUnchecked: U.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    resource: Mt.edgePools.rumor
  }
}, st = foundry.utils.mergeObject(Po, {});
class _ {
  static init() {
    Handlebars.registerHelper("iconCheckbar", _.iconCheckbar), Handlebars.registerHelper("iconCheckbarHit", _.iconHit);
  }
  static hackCheckbars(e) {
    if (e) {
      const t = foundry.utils.mergeObject(Po, {});
      foundry.utils.mergeObject(t, e, { recursive: !0 }), foundry.utils.mergeObject(st, t, { overwrite: !0 });
    }
  }
  static iconCheckbar(e, t) {
    return t ? _.iconChecked(e) : _.iconUnchecked(e);
  }
  static iconChecked(e) {
    var t;
    return (t = st[e]) == null ? void 0 : t.iconChecked;
  }
  static iconUnchecked(e) {
    var t;
    return (t = st[e]) == null ? void 0 : t.iconUnchecked;
  }
  static iconHit(e) {
    var t, i;
    return ((t = st[e]) == null ? void 0 : t.iconHit) ?? ((i = st[e]) == null ? void 0 : i.iconChecked);
  }
  static useArmor(e) {
    var t;
    return (t = st[e]) == null ? void 0 : t.useArmor;
  }
  static max(e, t) {
    var s;
    const i = (s = st[t]) == null ? void 0 : s.monitor(e);
    return ((i == null ? void 0 : i.max) ?? 0) + ((i == null ? void 0 : i.maxBonus) ?? 0);
  }
  static value(e, t) {
    var s;
    const i = (s = st[t]) == null ? void 0 : s.monitor(e);
    return (i == null ? void 0 : i.value) ?? 0;
  }
  static resistance(e, t, i = void 0) {
    return _.resistanceDetail(e, t, i).value;
  }
  static resistanceDetail(e, t, i = void 0) {
    var l, c;
    const s = (l = st[t]) == null ? void 0 : l.monitor(e), n = _._resolveResistance(s == null ? void 0 : s.resistance, i), r = _._resolveResistance(s == null ? void 0 : s.resistanceBonus, i), o = i === void 0 ? 0 : Number(((c = s == null ? void 0 : s.resistanceBonusByType) == null ? void 0 : c[i]) ?? 0);
    return {
      value: n.value + r.value + o,
      damageType: i,
      source: n.source,
      bonusSource: r.source,
      bonusByType: o,
      usedType: n.source === "type" || r.source === "type" || o !== 0
    };
  }
  static _resolveResistance(e, t = void 0) {
    var n;
    if (typeof e == "number")
      return { value: e ?? 0, source: "legacy" };
    const i = t !== void 0 ? (n = e == null ? void 0 : e.byType) == null ? void 0 : n[t] : void 0;
    return i !== void 0 ? { value: Number(i) || 0, source: "type" } : { value: Number((e == null ? void 0 : e.default) ?? 0) || 0, source: "default" };
  }
  static newValue(e, t) {
    return e + (t ? 0 : 1);
  }
  static async switchMonitorCheck(e, t, i, s, n = void 0, r = void 0) {
    await _.setCounter(e, t, _.newValue(i, s), n, r);
  }
  static async addCounter(e, t, i, s = void 0) {
    if (i != 0) {
      const n = _.getCounterValue(e, t, s) ?? 0;
      await _.setCounter(e, t, n + i, s);
    }
  }
  static async setCounter(e, t, i, s = void 0, n = void 0) {
    switch (t) {
      case S.monitors.anarchy:
        return await _.setAnarchy(e, i);
      case S.monitors.sceneAnarchy:
        return await _.setSceneAnarchy(e, i);
    }
    return await _.setCheckbar(e, t, i);
  }
  static getCounterValue(e, t, i) {
    switch (t) {
      case S.monitors.anarchy:
        return _.getAnarchy(e, t);
    }
    return _.value(e, t);
  }
  static async setCheckbar(e, t, i) {
    if (i == _.getCounterValue(e, t))
      return;
    const s = st[t];
    if (s.path) {
      const n = _.max(e, t);
      if (n <= 0)
        return;
      await _._manageOverflow(s, e, t, i, n), i = Math.min(i, n), bi.checkOutOfRange(s.resource, i, 0, n), await e.setCheckbarValue(s.path, i);
    }
  }
  static async _manageOverflow(e, t, i, s, n) {
    if (s > n) {
      const r = e.overflow ? e.overflow(t) : void 0, o = e.recomputeOverflow ? e.recomputeOverflow(s - n) : s - n;
      r && o > 0 && (_._notifyOverflow(t, i, o, r), await _.addCounter(t, r, o));
    }
  }
  static _notifyOverflow(e, t, i, s) {
    const n = be(T.actor.monitors.overflow, {
      actor: e.name,
      monitor: T.actor.monitors[t],
      overflow: i,
      overflowMonitor: T.actor.monitors[s]
    });
    ui.notifications.warn(n);
  }
  static async _manageFatigueOverflow(e, t, i) {
    await _.addCounter(e, S.monitors.physical, t - i);
  }
  static async setAnarchy(e, t) {
    if (e.hasOwnAnarchy()) {
      if (e.hasGMAnarchy()) {
        await game.system.anarchy.gmAnarchy.setAnarchy(t), e.render();
        return;
      }
      await _._setAnarchyMonitor(e, S.monitors.anarchy, t);
    }
  }
  static async setSceneAnarchy(e, t) {
    await _._setAnarchyMonitor(e, S.monitors.sceneAnarchy, t);
  }
  static async _setAnarchyMonitor(e, t, i) {
    const s = _.value(e, t);
    await _.setCheckbar(e, t, i), game.user.isGM || _.notifyAnarchyChange(e, t, s, i);
  }
  static getAnarchy(e, t) {
    return !game.user.isGM && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) || t == Mt.anarchy && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) ? 0 : _.value(e, t);
  }
  static notifyAnarchyChange(e, t, i, s) {
    rt.blindMessageToGM({
      from: game.user.id,
      content: be(
        T.gmManager.playerChangedAnarchy,
        {
          user: game.user.name,
          actor: e.name,
          monitor: T.actor.counters[t],
          from: i,
          to: s
        }
      )
    });
  }
}
const { loadTemplates: Wc, renderTemplate: Uc } = foundry.applications.handlebars, nr = {
  highlighted: ["far fa-times-circle", "fas fa-dice-one", "fas fa-dice-two", "fas fa-dice-three", "fas fa-dice-four", "fas fa-dice-five", "fas fa-dice-six"],
  dimmed: ["far fa-times-circle", "far fa-dice-one", "far fa-dice-two", "far fa-dice-three", "far fa-dice-four", "far fa-dice-five", "far fa-dice-six"]
};
class Nt {
  static init() {
    Hooks.once("ready", async () => await this.onReady()), Handlebars.registerHelper("dice-cursor-array", (e, t) => Nt.array(e ?? 0, t ?? 5)), Handlebars.registerHelper("dice-cursor-fas", (e, t) => Nt.fasClass(e, t)), Handlebars.registerHelper("dice-cursor-active", (e, t) => Nt.activeClass(e, t)), Handlebars.registerHelper("dice-cursor-color", (e, t) => Nt.colorClass(e, t));
  }
  static async onReady() {
    await Wc([
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
    return Nt.isActive(e, t) ? "active" : "inactive";
  }
  static fasClass(e, t) {
    const i = Nt.isActive(e, t) ? nr.highlighted : nr.dimmed;
    return Nt.$getFas(i, Math.abs(e));
  }
  static colorClass(e, t) {
    return e == 0 || !t ? e < 0 ? "fixed-dice-malus" : "fixed-dice-bonus" : e < 0 ? "variable-dice-malus" : "variable-dice-bonus";
  }
  static $getFas(e, t) {
    return e[t > 6 ? t % 6 : t];
  }
  static async diceCursor({ value: e, min: t, max: i, editable: s }) {
    return await Uc("systems/mwd/templates/roll/parts/dice-cursor.hbs", {
      value: e,
      min: t,
      max: i,
      editable: s
    });
  }
}
const Ie = {
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
}, rr = "anarchy-", No = `${w}.${Ie.ANARCHY_HACK}`, Vs = {
  id: w,
  name: "Standard Shadowrun Anarchy",
  hack: {
    checkbars: () => st
  }
};
globalThis.ANARCHY_HOOKS = Ie;
globalThis.SETTING_KEY_ANARCHY_HACK = No;
globalThis.SHADOWRUN_ANARCHY_NO_HACK = Vs;
class hi {
  constructor() {
    this.hooks = [], this.hacks = {}, this.hackNames = {}, this.hookMethods = {}, this._register(Ie.ANARCHY_HACK), Hooks.on(Ie.ANARCHY_HACK, (e) => e(Vs)), Hooks.on("updateSetting", async (e, t, i, s) => this.onUpdateSetting(e, t, i, s)), Hooks.once("ready", () => this.onReady()), Hooks.on("getSceneControlButtons", (e) => {
      var i;
      if (!((i = game.user) != null && i.isGM)) return;
      const t = Array.isArray(e) ? e.find((s) => s.name === "notes") : e == null ? void 0 : e.notes;
      if (!t) {
        const s = Array.isArray(e) ? e.map((n) => n.name) : Object.keys(e ?? {});
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
          var s, n;
          return (n = (s = game.mwd) == null ? void 0 : s.gmGadget) == null ? void 0 : n.call(s);
        }
      });
    });
  }
  async onReady() {
    Hooks.callAll(Ie.ANARCHY_HACK, (e) => {
      this.hacks[e.id] = e, this.hackNames[e.id] = e.name;
    }), game.settings.register(w, Ie.ANARCHY_HACK, {
      scope: "world",
      name: T.settings.anarchyHack.name,
      hint: T.settings.anarchyHack.hint,
      config: !0,
      default: Vs.id,
      choices: this.hackNames,
      type: String
    }), this.applySelectedAnarchyHack();
  }
  async onUpdateSetting(e, t, i, s) {
    e.key == No && this.applySelectedAnarchyHack();
  }
  applySelectedAnarchyHack() {
    const e = this.getSelectedHack();
    e && _.hackCheckbars(e.hack.checkbars());
  }
  selectHookMethod(e, t) {
    Hooks.callAll(t, (i, s) => {
      i == e && (this.hookMethods[t] = s);
    });
  }
  getSelectedHack() {
    return this.hacks[game.settings.get(w, Ie.ANARCHY_HACK)];
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
    hi.instance()._register(e);
  }
  _register(e) {
    if (console.log(fe + "HooksManager.register", e), !e.startsWith(rr))
      throw `For safety Anarchy Hooks names must be prefixed by '${rr}'`;
    this.hooks.push(e);
  }
}
const or = [
  S.itemType.assetModule,
  S.itemType.mechWeapon,
  S.itemType.personalWeapon,
  "weapon"
];
class ne {
  constructor() {
    this.modifiers = {
      groups: ce.mapObjetToKeyValue(T.modifier.group, "key", "label"),
      roll: ne._buildGroupOptions("roll"),
      attribute: ne._buildGroupOptions("attribute"),
      monitor: ne._buildGroupOptions("monitor"),
      other: ne._buildGroupOptions("other")
    }, Hooks.once("ready", () => this.onReady());
  }
  static _buildGroupOptions(e) {
    switch (e) {
      case "attribute":
        return {
          label: T.modifier.group[e],
          effects: ce.hbsAttributes.map((t) => ({ key: t.value, label: t.labelkey })),
          categories: []
        };
    }
    return {
      label: T.modifier.group[e],
      effects: ce.mapObjetToKeyValue(T.modifier[e].effect, "key", "label"),
      categories: ce.mapObjetToKeyValue(T.modifier[e].category, "key", "label")
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
                return ce.getDamageTypes().map((n) => ({ key: n.value, label: n.labelkey }));
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
        return ce.getAttributes().map((i) => ({ key: i.value, label: i.labelkey }));
      case "skill":
        return game.system.anarchy.skills.getSkills().map((i) => ({ key: i.code, label: i.labelkey }));
      case "attributeAction":
        const t = ke.all().map((i) => ({ key: i.code, label: i.labelkey }));
        return ee.distinct(t.map((i) => i.key)).map((i) => t.find((s) => s.key == i));
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
            return i.subCategory == e.attributeAction || i.subCategory == ke.getDefenseAttributeAction(e.defenseAction);
        }
      return !1;
    };
  }
  static computeRollModifiers(e, t, i) {
    const s = ne.buildRollModifiersFilter(t, i), n = (c) => c.group == "roll" && c.effect == i && s(c), r = ne._activeItems(e).map((c) => ne.itemModifiers(c, n)).reduce((c, u) => c.concat(u), []).sort(ee.descending((c) => c.modifier.value)), o = ne.$sumAssetModuleModifiers(r.filter((c) => or.includes(c.item.type)).map((c) => c.modifier.value)), l = ee.sumValues(r.filter((c) => !or.includes(c.item.type)).map((c) => c.modifier.value));
    return {
      value: o + l,
      sources: r
    };
  }
  static $sumAssetModuleModifiers(e) {
    const t = e.find((n) => n > 3) ?? 0, i = ee.sumValues(e.filter((n) => n < 0)), s = Math.min(3, ee.sumValues(e.filter((n) => n > 0 && n <= 3)));
    return i + Math.max(s, t);
  }
  static computeModifiers(e, t, i = void 0, s = void 0) {
    const n = ne._createFilter(t, i, s), r = ne._activeItems(e).map((l) => ne.itemModifiers(l, n)).reduce((l, c) => l.concat(c), []);
    return {
      value: ee.sumValues(r, (l) => l.modifier.value),
      sources: r
    };
  }
  static sumMonitorModifiers(e, t, i, s = void 0) {
    return ne.sumModifiers(ne._activeItems(e), "monitor", t, i, s);
  }
  static sumModifiers(e, t, i, s, n = void 0) {
    const r = ne._createFilter(t, i, s, n), o = ne._activeItems(e).map((l) => ne.itemModifiers(l, r)).reduce((l, c) => l.concat(c), []);
    return ee.sumValues(o, (l) => l.modifier.value);
  }
  static _createFilter(e, t, i, s = void 0) {
    return (n) => n.group == e && n.effect == (t ?? n.effect) && n.category == (i ?? n.category) && (s == null ? !0 : n.subCategory == s);
  }
  static countModifiers(e, t, i = void 0, s = void 0) {
    const n = ne._createFilter(t, i, s);
    return ne._activeItems(e).map((o) => ne.itemModifiers(o, n)).reduce((o, l) => o.concat(l), []).count;
  }
  static itemModifiers(e, t) {
    return ne._listItemModifiers(e, t).map((i) => ne._itemModifier(e, i));
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
const { loadTemplates: ws, renderTemplate: Mh } = foundry.applications.handlebars, pe = {
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
}, lr = 4, jc = [
  // attribute1
  {
    code: "attribute1",
    options: {
      order: 1,
      category: pe.pool,
      hbsTemplateRoll: `${G}/roll/parts/select-attribute.hbs`
    },
    condition: (a) => Object.values(We.rollType).includes(a.mode),
    isUsed: (a) => !0,
    factory: (a) => {
      var t;
      const e = a.attribute1 ?? ((t = a.skill) == null ? void 0 : t.system.attribute);
      return {
        labelkey: e ? T.attributes[e] : T.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: a.skill },
        selected: e,
        choices: ce.getAttributes((i) => a.attributes.includes(i))
      };
    }
  },
  // attribute2
  {
    code: "attribute2",
    options: {
      order: 1,
      category: pe.pool,
      hbsTemplateRoll: `${G}/roll/parts/select-attribute.hbs`,
      hbsTemplateChat: `${G}/chat/parts/pool-attribute2.hbs`
    },
    condition: (a) => [We.rollType.attribute, We.rollType.attributeAction, We.rollType.defense].includes(a.mode),
    isUsed: (a) => a.used,
    onChecked: (a, e) => a.used = !!e,
    factory: (a) => {
      const e = a.attribute2;
      return {
        labelkey: e ? T.attributes[e] : T.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: We.rollType.attribute == a.mode },
        selected: e,
        choices: ce.getAttributes((t) => a.attributes.includes(t))
      };
    }
  },
  // skill
  {
    code: "skill",
    options: {
      flags: {},
      order: 3,
      category: pe.pool,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`
    },
    condition: (a) => ["skill", "weapon"].includes(a.mode),
    factory: (a) => {
      var t, i, s, n;
      const e = (t = a.actor) != null && t.getSkillRating ? a.actor.getSkillRating(a.skill) : ((s = (i = a.skill) == null ? void 0 : i.system) == null ? void 0 : s.value) ?? 0;
      return {
        label: (n = a.skill) == null ? void 0 : n.name,
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
      category: pe.pool,
      hbsTemplateRoll: `${G}/roll/parts/check-option.hbs`
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
      category: pe.pool,
      value: 0,
      labelkey: T.common.roll.modifiers.social.credibility,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`
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
      labelkey: T.common.roll.modifiers.poolModifiers,
      order: 5,
      category: pe.pool,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 4
    },
    factory: (a) => li.computeRollModifiers(pe.pool, a)
  },
  // wounds
  {
    code: "wounds",
    options: {
      flags: { optional: !0 },
      order: 10,
      category: pe.pool,
      labelkey: T.common.roll.modifiers.wounds,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`
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
      category: pe.pool,
      value: 0,
      labelkey: T.common.roll.modifiers.other,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
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
      category: pe.glitch,
      value: 0,
      labelkey: T.common.roll.modifiers.glitch,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${G}/chat/parts/glitch.hbs`,
      min: 0,
      max: 5
    },
    isUsed: (a) => a.value > 0,
    factory: (a) => {
      const e = a.actor.getWounds(), t = li.computeRollModifiers(pe.glitch, a);
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
      category: pe.glitch,
      value: 0,
      labelkey: T.common.roll.modifiers.social.rumor,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${G}/chat/parts/glitch.hbs`,
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
      category: pe.reroll,
      labelkey: T.common.roll.modifiers.reroll,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: lr
    },
    factory: (a) => {
      const e = li.computeRollModifiers(pe.reroll, a), t = li.computeRollModifiers(pe.rerollMax, a);
      return foundry.utils.mergeObject(e, {
        max: lr + Math.max(0, t.value ?? 0)
      });
    }
  },
  // reduction from opponent
  {
    code: "reduced",
    options: {
      order: 29,
      category: pe.pool,
      labelkey: T.common.roll.modifiers.reduced,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
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
      category: pe.rerollForced,
      labelkey: T.common.roll.modifiers.rerollForced,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 0
    },
    factory: (a) => {
      var t;
      const e = li.computeRollModifiers(pe.successReroll, a);
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
      category: pe.pool,
      value: 0,
      min: 0,
      max: 3,
      labelkey: T.common.roll.modifiers.anarchyDisposition,
      hbsTemplateRoll: `${G}/roll/parts/check-option.hbs`
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
      category: pe.risk,
      value: 0,
      labelkey: T.common.roll.modifiers.anarchyRisk,
      hbsTemplateRoll: `${G}/roll/parts/check-option.hbs`,
      hbsTemplateChat: `${G}/chat/parts/anarchy-risk.hbs`
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
      category: pe.edge,
      labelkey: T.common.roll.modifiers.edge,
      hbsTemplateRoll: `${G}/roll/parts/check-option.hbs`
    },
    isUsed: (a) => a.used,
    condition: (a) => a.options.canUseEdge && a.actor.getRemainingEdge(),
    onChecked: (a, e) => {
      a.used = e, a.value = e ? 1 : 0;
    },
    factory: (a) => {
      var s;
      const t = [
        S.counters.edgePools.grit,
        S.counters.edgePools.chaos,
        S.counters.edgePools.insight,
        S.counters.edgePools.rumor,
        S.counters.edgePools.legend,
        S.counters.edgePools.credibility
      ].map((n) => {
        const r = a.actor.getEdgePoolValue(n);
        return {
          code: n,
          label: T.actor.counters.edgePools[n] ?? n,
          value: r
        };
      }), i = ((s = t.find((n) => n.value > 0)) == null ? void 0 : s.code) ?? S.counters.edgePools.grit;
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
      category: pe.opponentPool,
      labelkey: T.common.roll.modifiers.opponentPool,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => li.computeRollModifiers(pe.opponentPool, a),
    condition: (a) => !a.attributeAction
  },
  // force opponent rerolls
  {
    code: "opponentReroll",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: pe.opponentReroll,
      value: 0,
      labelkey: T.common.roll.modifiers.opponentReroll,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => li.computeRollModifiers(pe.opponentReroll, a),
    condition: (a) => !a.attributeAction
  }
];
class li {
  constructor() {
    this.registeredParameters = {}, hi.register(Ie.REGISTER_ROLL_PARAMETERS), hi.register(Ie.MODIFY_ROLL_PARAMETER), Hooks.on(Ie.MODIFY_ROLL_PARAMETER, (e) => this._validate(e)), Hooks.once(Ie.REGISTER_ROLL_PARAMETERS, (e) => jc.forEach(
      (t) => e(t)
    )), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(Ie.REGISTER_ROLL_PARAMETERS, async (t) => {
      Hooks.callAll(Ie.MODIFY_ROLL_PARAMETER, t), t.ignore || await this._register(t);
    });
    const e = ee.distinct([].concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateRoll)).concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateChat)).filter((t) => typeof t == "string" && t.length > 0));
    await ws(ee.distinct(e)), await ws([`${G}/roll/parts/parameter-label.hbs`]);
  }
  _validate(e) {
    e.code || (console.error(`${fe} RollParameter does not have a code`, e), e.ignore = !0);
  }
  async _register(e) {
    if (this.registeredParameters[e.code]) {
      console.error(`${fe} RollParameter ${e.code} is already registered`, e);
      return;
    }
    e.onChecked || (e.onChecked = (t, i) => t.used = i), e.onValue = (t, i) => t.value = i, this.registeredParameters[e.code] = e;
  }
  async _optionalLoadTemplate(e) {
    e && await ws([e]);
  }
  build(e) {
    return Object.values(this.registeredParameters).filter((t) => !t.condition || t.condition(e)).map((t) => this._computeParameter(t, e));
  }
  compute(e) {
    const t = e.filter((n) => this.isParameterUsed(n)), i = ee.classify(t, (n) => n.category), s = {};
    return Object.values(i).forEach((n) => s[n[0].category] = ee.sumValues(n, (r) => r.value ?? (r.optional ? 1 : 0))), s;
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
    const i = (n) => {
      var r;
      return !((r = n.isWeapon) != null && r.call(n)) || t.weapon && n.id == t.weapon.id;
    }, s = t.actor.items.filter(i);
    return ne.computeRollModifiers(s, t, e);
  }
}
const { ApplicationV2: Hc, HandlebarsApplicationMixin: qc } = foundry.applications.api, { loadTemplates: Gc, renderTemplate: Vc } = foundry.applications.handlebars;
var Xa, Ro;
const Oe = class Oe extends qc(Hc) {
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
    await Gc([
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
    const i = foundry.utils.mergeObject(Oe.prepareActorRoll(e), {
      mode: We.rollType.attribute,
      attribute1: t
    });
    await Oe.create(i);
  }
  static async rollAttributeAction(e, t) {
    const i = foundry.utils.mergeObject(Oe.prepareActorRoll(e), {
      mode: We.rollType.attributeAction,
      attributeAction: t.code,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e)
    });
    await Oe.create(i);
  }
  static async rollSkill(e, t, i) {
    const s = foundry.utils.mergeObject(Oe.prepareActorRoll(e), {
      mode: We.rollType.skill,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? S.actorAttributes.reflexes,
      specialization: i
    });
    await Oe.create(s);
  }
  static async rollWeapon(e, t, i, s) {
    const n = foundry.utils.mergeObject(Oe.prepareActorRoll(e), {
      mode: We.rollType.weapon,
      weapon: i,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? e.getPhysicalAgility(),
      specialization: void 0,
      targeting: s
    });
    await Oe.create(n);
  }
  static async rollDefense(e, t, i) {
    const s = foundry.utils.mergeObject(Oe.prepareActorRoll(e), {
      mode: We.rollType.defense,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e),
      defenseAction: t.code,
      attackRoll: i.attackRoll,
      tokenId: i.defenderTokenId,
      choiceChatMessageId: i.choiceChatMessageId
    });
    await Oe.create(s);
  }
  static async itemAttributeRoll(e, t) {
    const i = foundry.utils.mergeObject(Oe.prepareActorRoll(e.actor), {
      mode: We.rollType.attribute,
      item: e,
      attribute1: t,
      attributes: e.actor.getUsableAttributes(e)
    });
    await Oe.create(i);
  }
  static async create(e) {
    var r;
    const t = M(r = Oe, Xa, Ro).call(r, e), i = await Vc(`${G}/roll/roll-dialog-title.hbs`, t), s = {
      id: `roll-dialog-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Oe.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new Oe({ roll: t }, s).render({ force: !0 });
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
      const s = this._getRollParameter(i), n = this._getEventItem(i, this.roll.actor), r = i.currentTarget.value, o = this.roll.actor.getAttributeValue(r, n);
      this.roll[s.code] = r, await this._setParameterSelectedOption(s, r, o);
    }), this.html.find(".check-optional").click(async (i) => {
      const s = this._getRollParameter(i);
      s.onChecked(s, i.currentTarget.checked), s.category == pe.pool && await this._updateParameterValue(s, s.value), s.code == "edge" && this.html.find(`.parameter[data-parameter-code='${s.code}'] .edge-pool-select`).prop("disabled", !s.used);
    }), this.activateDiceParameterClick(), this.html.find("input.parameter-value:not(:disabled)").on("input", async (i) => {
      const s = this._getRollParameter(i), n = Number.parseInt(i.currentTarget.value) ?? 0;
      await this._updateParameterValue(s, n);
    }), this.html.find(".select-option-parameter").change(async (i) => {
      const s = this._getRollParameter(i), n = i.currentTarget.value, r = Number.parseInt(n);
      await this._setParameterSelectedOption(s, n, r);
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
        const s = Number.parseInt(this.html.find(e.currentTarget).attr("data-dice")) ?? 0, n = t.value != s || s == 0 ? s : s > 0 ? s - 1 : s + 1;
        await this._updateParameterValue(t, n);
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
    return await Nt.diceCursor({
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
Xa = new WeakSet(), Ro = function(e) {
  const t = game.system.anarchy.rollParameters.build(e).sort(ee.ascending((i) => i.order ?? 200));
  return foundry.utils.mergeObject(e, {
    ENUMS: ce.getEnums((i) => e.attributes.includes(i)),
    ANARCHY: T,
    parameters: t
  });
}, Te(Oe, Xa), R(Oe, "PARTS", {
  body: {
    template: `${G}/roll/roll-dialog.hbs`
  }
});
let ht = Oe;
const On = 2, Ks = "skillSpecializationCatalog", Kc = [
  { key: "running", label: "Running" },
  { key: "jumping", label: "Jumping" },
  { key: "swimming", label: "Swimming" },
  { key: "climbing", label: "Climbing" },
  { key: "acrobatics", label: "Acrobatics" }
], Io = /* @__PURE__ */ new Set(), wt = [
  // Strength
  { code: "athletics", label: "Athletics", attribute: "strength", icon: `${se}/athletics.svg`, domains: ["physical"], specializations: Kc },
  { code: "heavyWeapons", label: "Heavy Weapons", attribute: "strength", icon: `${se}/heavy-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  // Reflexes
  { code: "escapeArtist", label: "Escape Artist", attribute: "reflexes", icon: `${se}/escape-artist.svg`, domains: ["physical"] },
  { code: "gunnery", label: "Gunnery", attribute: "reflexes", icon: `${se}/vehicle-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "meleeCombat", label: "Melee Combat", attribute: "reflexes", icon: `${se}/close-combat.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "piloting", label: "Piloting", attribute: "reflexes", icon: `${se}/piloting-ground-steering-wheel.svg`, domains: ["physical"] },
  { code: "projectileWeapons", label: "Projectile Weapons", attribute: "reflexes", icon: `${se}/projectile-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "firearms", label: "Firearms", attribute: "reflexes", icon: `${se}/firearms.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "stealth", label: "Stealth", attribute: "reflexes", icon: `${se}/stealth.svg`, domains: ["physical"] },
  { code: "zeroGOps", label: "Zero-G Operations", attribute: "reflexes", icon: `${se}/fly.svg`, domains: ["physical"] },
  // Intelligence
  { code: "art", label: "Art", attribute: "intelligence", icon: `${se}/art.svg`, domains: ["mental"] },
  { code: "artillery", label: "Artillery", attribute: "intelligence", icon: `${se}/artillery.svg`, domains: ["mental"] },
  { code: "systemOps", label: "System Operations", attribute: "intelligence", icon: `${se}/electronics.svg`, domains: ["mental"] },
  { code: "computers", label: "Computers", attribute: "intelligence", icon: `${se}/hacking.svg`, domains: ["mental"] },
  { code: "demolitions", label: "Demolitions", attribute: "intelligence", icon: `${se}/demolition.svg`, domains: ["mental"] },
  { code: "medTech", label: "Medtech", attribute: "intelligence", icon: `${se}/biotech.svg`, domains: ["mental"] },
  { code: "science", label: "Science", attribute: "intelligence", icon: `${se}/skills.svg`, domains: ["mental"] },
  { code: "perception", label: "Perception", attribute: "intelligence", icon: `${se}/skills.svg`, domains: ["mental"] },
  { code: "tactics", label: "Tactics", attribute: "intelligence", icon: `${se}/skills.svg`, domains: ["mental"] },
  { code: "technician", label: "Technician", attribute: "intelligence", icon: `${se}/engineering.svg`, domains: ["mental"] },
  { code: "tracking", label: "Tracking", attribute: "intelligence", icon: `${se}/tracking.svg`, domains: ["physical", "mental"] },
  { code: "navigation", label: "Navigation", attribute: "intelligence", icon: `${se}/piloting-other.svg`, domains: ["mental"] },
  // Guts
  { code: "administration", label: "Administration", attribute: "willpower", icon: `${se}/knowledge.svg`, domains: ["social", "mental"] },
  { code: "animalHandling", label: "Animal Handling", attribute: "willpower", icon: `${se}/animals.svg`, domains: ["physical", "mental"] },
  { code: "survival", label: "Survival", attribute: "willpower", icon: `${se}/survival.svg`, domains: ["physical", "mental"] },
  // Charisma
  { code: "acting", label: "Acting", attribute: "charisma", icon: `${se}/con-art.svg`, domains: ["social"] },
  { code: "disguise", label: "Disguise", attribute: "charisma", icon: `${se}/disguise.svg`, domains: ["social", "mental"] },
  { code: "leadership", label: "Leadership", attribute: "charisma", icon: `${se}/psychology.svg`, domains: ["social"] },
  { code: "negotiation", label: "Negotiation", attribute: "charisma", icon: `${se}/negotiation.svg`, domains: ["social"] },
  { code: "etiquette", label: "Etiquette", attribute: "charisma", icon: `${se}/etiquette.svg`, domains: ["social"] },
  { code: "streetwise", label: "Streetwise", attribute: "charisma", icon: `${se}/etiquette2.svg`, domains: ["social"] },
  { code: "intimidation", label: "Intimidation", attribute: "charisma", icon: `${se}/intimidation.svg`, domains: ["social", "mental"] }
].map(Yc);
for (const a of wt)
  Io.add(a.code);
function Yc(a) {
  return {
    ...a,
    label: a.label ?? a.code,
    icon: a.icon ?? `${ca}/icons/skills/skills.svg`,
    specializations: Ln(a.specializations)
  };
}
function _n(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function Ln(a = []) {
  const e = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((t) => {
    const i = _n((t == null ? void 0 : t.key) ?? (t == null ? void 0 : t.label) ?? t);
    return !i || e.has(i) ? null : (e.add(i), {
      key: i,
      label: String((t == null ? void 0 : t.label) ?? (t == null ? void 0 : t.key) ?? t ?? i).trim() || i
    });
  }).filter(Boolean);
}
function Qc(a = []) {
  const e = new Error(a[0] ?? "Invalid skill specialization data.");
  return e.validationErrors = a, e;
}
function Jc() {
  const a = {};
  for (const e of wt) {
    const t = (Array.isArray(e.specializations) ? e.specializations : []).map((i) => String((i == null ? void 0 : i.label) ?? "").trim()).filter(Boolean);
    t.length && (a[e.code] = t);
  }
  return a;
}
const Xc = Object.freeze(Jc());
function Zc(a, e = [], { strict: t = !1, errors: i = [] } = {}) {
  var n, r;
  if (!Array.isArray(e)) {
    if (t) {
      const o = ((n = Ys(a)) == null ? void 0 : n.label) ?? a;
      i.push(`${o}: expected an array of specialization labels.`);
    }
    return [];
  }
  const s = [];
  for (const o of e) {
    const l = String(o ?? "").trim();
    if (!l) {
      if (t) {
        const c = ((r = Ys(a)) == null ? void 0 : r.label) ?? a;
        i.push(`${c}: specialization labels cannot be blank.`);
      }
      continue;
    }
    s.push(l);
  }
  return Ln(s).map((o) => o.label);
}
function Ys(a) {
  return wt.find((e) => e.code === a);
}
function Do(a, { strict: e = !1 } = {}) {
  const t = a && typeof a == "object" && !Array.isArray(a) ? a : {}, i = [], s = {};
  for (const [n, r] of Object.entries(t)) {
    if (!Io.has(n)) {
      e && i.push(`Unknown skill code "${n}".`);
      continue;
    }
    const o = Zc(n, r, { strict: e, errors: i });
    o.length && (s[n] = o);
  }
  if (e && i.length) throw Qc(i);
  return Object.fromEntries(
    wt.map((n) => [n.code, s[n.code]]).filter(([, n]) => Array.isArray(n) && n.length)
  );
}
function eu() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${w}.${Ks}`))
      return game.settings.get(w, Ks);
  } catch {
  }
  return Lo();
}
function Oo() {
  const a = Do(eu(), { strict: !1 });
  return Object.fromEntries(
    Object.entries(a).map(([e, t]) => [
      e,
      Ln(t)
    ])
  );
}
function _o(a = [], { allowedKeys: e = null } = {}) {
  const t = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((i) => _n(i)).filter((i) => !i || t.has(i) || e && !e.has(i) ? !1 : (t.add(i), !0));
}
function ct(a) {
  const e = Ys(a);
  if (e)
    return {
      ...e,
      specializations: gi(e.code)
    };
}
function qa() {
  const a = Oo();
  return [...wt].map((e) => ({
    ...e,
    specializations: [...a[e.code] ?? []]
  })).sort((e, t) => e.label.localeCompare(t.label));
}
function gi(a) {
  return [...Oo()[a] ?? []];
}
function $n(a, e) {
  const t = _n(e);
  if (t)
    return gi(a).find((i) => i.key === t);
}
function tu(a, e) {
  var t;
  return ((t = $n(a, e)) == null ? void 0 : t.label) ?? "";
}
function Lo() {
  return foundry.utils.deepClone(Xc);
}
function as(a, { strict: e = !1 } = {}) {
  return Do(a, { strict: e });
}
function Ga(a = []) {
  return _o(a);
}
function iu(a, e = []) {
  const t = new Set(gi(a).map((s) => s.key)), i = new Set(_o(e, { allowedKeys: t }));
  return gi(a).filter((s) => i.has(s.key)).map((s) => s.key);
}
function Qs(a, e) {
  var t, i;
  return Ga(
    ((i = (t = a == null ? void 0 : a.skills) == null ? void 0 : t[e]) == null ? void 0 : i.specializations) ?? []
  );
}
function ss(a, e) {
  return iu(
    e,
    Qs(a, e)
  );
}
function $o(a, e) {
  const t = new Set(ss(a, e));
  return gi(e).filter((i) => t.has(i.key));
}
function au(a) {
  const e = Math.ceil(a.length / 2);
  return { left: a.slice(0, e), right: a.slice(e) };
}
function su(a) {
  var e, t;
  a.skills ?? (a.skills = {});
  for (const i of wt) {
    const s = (e = a.skills)[t = i.code] ?? (e[t] = {});
    s.rating == null && (s.rating = 0), s.bonus == null && (s.bonus = 0), s.specializations = Ga(s.specializations);
  }
}
function xo(a, { bonusBySkill: e = null } = {}) {
  const t = qa(), { left: i, right: s } = au(t), n = (r) => {
    var y, b, A, v, C, I;
    const o = r.code, l = r.attribute, c = Number(((b = (y = a == null ? void 0 : a.skills) == null ? void 0 : y[o]) == null ? void 0 : b.rating) ?? 0), u = Number(((v = (A = a == null ? void 0 : a.attributes) == null ? void 0 : A[l]) == null ? void 0 : v.value) ?? 0), d = Number(((I = (C = a == null ? void 0 : a.skills) == null ? void 0 : C[o]) == null ? void 0 : I.bonus) ?? 0), m = Number((e == null ? void 0 : e[o]) ?? 0), p = d + m, f = $o(a, o), h = gi(o).filter((P) => !f.some((x) => x.key === P.key)), g = u + c + p;
    return {
      code: o,
      label: r.label,
      icon: r.icon,
      attribute: l,
      attributeLabel: ce != null && ce.localizeAttribute ? ce.localizeAttribute(l) : l,
      rating: c,
      base: u,
      bonus: p,
      total: g,
      rollPayload: JSON.stringify({ intent: "skill", key: o }),
      canAddSpecialization: h.length > 0,
      specializations: f.map((P) => ({
        ...P,
        bonus: On,
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
    left: i.map(n),
    right: s.map(n)
  };
}
const nu = /* @__PURE__ */ new Set(["overloaded"]);
function cr(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function ru(a, e) {
  var i, s, n;
  if (!a) return null;
  const t = cr(e) ?? cr(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((n = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : n.call(i, ((s = t == null ? void 0 : t.baseActor) == null ? void 0 : s.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function Bo(a) {
  const e = String(a ?? "").trim();
  if (!e) return "Status";
  const s = (e.includes(".") ? e.split(".").at(-1) : e).replace(/^status/i, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return s ? s.replace(/\b\w/g, (n) => n.toUpperCase()) : e;
}
function ou(a) {
  const e = String((a == null ? void 0 : a.name) ?? (a == null ? void 0 : a.label) ?? (a == null ? void 0 : a.id) ?? "Status").trim();
  return e ? Bo(e) : "Status";
}
function lu(a) {
  const e = typeof (a == null ? void 0 : a.img) == "string" ? a.img.trim() : "";
  if (e) return e;
  const t = a ? Object.getOwnPropertyDescriptor(a, "icon") : null;
  return "value" in (t ?? {}) ? String(t.value ?? "").trim() : "";
}
function Va(a, e) {
  var t, i, s, n, r, o;
  return e === "overloaded" ? !!((i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.burn) != null && i.overloaded) || !!((n = (s = a == null ? void 0 : a.statuses) == null ? void 0 : s.has) != null && n.call(s, e)) : ((o = (r = a == null ? void 0 : a.statuses) == null ? void 0 : r.has) == null ? void 0 : o.call(r, e)) ?? !1;
}
function xn(a) {
  const e = /* @__PURE__ */ new Set();
  return (CONFIG.statusEffects ?? []).filter((t) => {
    const i = String((t == null ? void 0 : t.id) ?? "").trim();
    return !i || e.has(i) ? !1 : (e.add(i), !0);
  }).map((t) => {
    const i = String(t.id).trim();
    return {
      id: i,
      label: ou(t),
      icon: lu(t),
      active: Va(a, i),
      managed: nu.has(i)
    };
  }).sort((t, i) => t.active !== i.active ? t.active ? -1 : 1 : t.label.localeCompare(i.label));
}
function cu(a) {
  if (!a.length)
    return "<p>No token statuses are configured.</p>";
  const e = foundry.utils.escapeHTML;
  return `
    <div class="mwd-token-status-dialog">
      <p style="margin-top: 0;">Toggle the statuses shown on this token.</p>
      <div style="display: grid; gap: 0.2rem; max-height: 20rem; overflow-y: auto; padding-right: 0.25rem;">
        ${a.map((i) => {
    const s = i.active ? "checked" : "", n = i.icon ? `<img src="${e(i.icon)}" alt="" width="20" height="20" style="flex: 0 0 20px; border: 0;" />` : "", r = i.managed ? '<small style="opacity: 0.7;">Managed by system state</small>' : "";
    return `
      <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.2rem 0;">
        <input type="checkbox" name="status" value="${e(i.id)}" ${s} />
        ${n}
        <span style="flex: 1 1 auto;">${e(i.label)}</span>
        ${r}
      </label>
    `;
  }).join("")}
      </div>
    </div>
  `;
}
async function uu({ actor: a, effects: e, selectedStatusIds: t }) {
  const i = new Set(t);
  for (const s of e) {
    const n = i.has(s.id);
    await Fo({ actor: a, statusId: s.id, active: n });
  }
}
async function Fo({ actor: a, statusId: e, active: t }) {
  if (!a || !e) return !1;
  const i = Va(a, e);
  return !!t === i ? !1 : e === "overloaded" ? (await a.update({ "system.burn.overloaded": !!t }), !0) : (await a.toggleStatusEffect(e, { active: !!t, overlay: !1 }), !0);
}
async function du({ actor: a, token: e } = {}) {
  var s;
  if (!a || !e) return !1;
  const t = ru(a, e), i = xn(t);
  return i.length ? foundry.applications.api.DialogV2.wait({
    window: {
      title: `Token Statuses: ${e.name ?? a.name ?? "Token"}`
    },
    position: {
      width: 420
    },
    content: cu(i),
    buttons: [
      {
        action: "apply",
        label: "Apply",
        icon: "fa-solid fa-check",
        default: !0,
        callback: async (n, r) => {
          var o, l;
          try {
            const c = Array.from(
              ((o = r.form) == null ? void 0 : o.querySelectorAll('input[name="status"]:checked')) ?? []
            ).map((u) => u.value);
            return await uu({ actor: t, effects: i, selectedStatusIds: c }), !0;
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
const mu = Object.freeze({
  STR: Jt.strength,
  REF: Jt.reflexes,
  WIL: Jt.willpower,
  INT: Jt.intelligence,
  CHA: Jt.charisma
}), pu = Object.freeze({
  STR: "Strength",
  REF: "Reflexes",
  WIL: "Willpower",
  INT: "Intelligence",
  CHA: "Charisma"
}), fu = Object.freeze({
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
function Bn(a) {
  const e = String(a ?? "").trim();
  return e ? fu[e] ?? null : null;
}
function hu(a) {
  const e = Bn(a);
  return e ? {
    intent: "common",
    id: e.id
  } : null;
}
function gu(a) {
  return mu[String(a ?? "").trim().toUpperCase()] ?? null;
}
function yu(a) {
  return pu[String(a ?? "").trim().toUpperCase()] ?? String(a ?? "").trim().toUpperCase();
}
function bu(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => String(e ?? "").trim().toUpperCase()).filter(Boolean).join(" + ");
}
const Fn = Object.freeze([
  { value: "positive", label: "Positive" },
  { value: "negative", label: "Negative" },
  { value: "narrative", label: "Narrative" }
]), zn = Object.freeze([
  { value: "minor", label: "Minor" },
  { value: "major", label: "Major" }
]), zo = Object.freeze([
  { value: "passive", label: "Passive" },
  { value: "triggered", label: "Triggered" }
]), Wo = Object.freeze([
  { value: "rollMod", label: "Roll Modifier" },
  { value: "burnAdjust", label: "Burn Adjust" },
  { value: "actionCostMod", label: "Action Cost Mod" },
  { value: "initiativeMod", label: "Initiative Mod" },
  { value: "damageMod", label: "Damage Intake Mod" },
  { value: "edgeEvent", label: "Edge Event" }
]), Uo = Object.freeze([
  { value: "onBuildRoll", label: "Build Roll" },
  { value: "onBeforeBurnApplied", label: "Before Burn Applied" },
  { value: "onBeforeActionCostFinalized", label: "Before Action Cost Finalized" },
  { value: "onInitiativeResolved", label: "Initiative Resolved" },
  { value: "onDamageResolved", label: "Damage Resolved" },
  { value: "onEndOfActivation", label: "End of Activation" },
  { value: "onEdgeSpend", label: "Edge Spend" },
  { value: "onEdgeGain", label: "Edge Gain" }
]), Wn = Object.freeze([
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
]), jo = Object.freeze([
  { value: "adjustAmount", label: "Adjust Amount" },
  { value: "grantPool", label: "Grant Pool" }
]), Su = new Set(Fn.map((a) => a.value)), Au = new Set(zn.map((a) => a.value)), wu = new Set(zo.map((a) => a.value)), Tu = new Set(Wo.map((a) => a.value)), Ho = new Set(Uo.map((a) => a.value)), ku = new Set(Wn.map((a) => a.value)), vu = new Set(jo.map((a) => a.value));
function te(a, e = "") {
  return String(a ?? "").trim() || e;
}
function le(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Ka(a) {
  return foundry.utils.deepClone(a);
}
function qo(a = []) {
  return (Array.isArray(a) ? a : typeof a == "string" ? a.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function Mu(a) {
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
function Ts(a) {
  const e = Math.max(0, Math.trunc(le(a, 0)));
  return e > 0 ? e : 0;
}
function ii(a = {}) {
  const e = a && typeof a == "object" ? a : {};
  return {
    perActivation: Ts(e.perActivation),
    perRound: Ts(e.perRound),
    perScene: Ts(e.perScene)
  };
}
function Cu(a = {}) {
  const e = a && typeof a == "object" ? a : {}, t = {
    id: te(e.id, foundry.utils.randomID()),
    fact: te(e.fact)
  }, i = Wn.find((n) => e[n.value] !== void 0 && e[n.value] !== null), s = (i == null ? void 0 : i.value) ?? (ku.has(String(e.comparator ?? "").trim()) ? String(e.comparator).trim() : "eq");
  return t.comparator = s, s !== "truthy" && s !== "falsy" && (t.value = Mu(e[s] ?? e.value ?? "")), t;
}
function Rt(a = []) {
  return (Array.isArray(a) ? a : []).map(Cu);
}
function Eu(a = {}) {
  const e = a && typeof a == "object" ? a : {}, t = Tu.has(String(e.type ?? "").trim()) ? String(e.type).trim() : "rollMod", i = Pu(t), s = Ho.has(String(e.phase ?? "").trim()) ? String(e.phase).trim() : i, n = vu.has(String(e.operation ?? "").trim()) ? String(e.operation).trim() : "adjustAmount";
  return {
    id: te(e.id, foundry.utils.randomID()),
    type: t,
    phase: s,
    selector: te(e.selector),
    skillKeys: qo(e.skillKeys),
    label: te(e.label),
    value: le(e.value, 0),
    min: e.min === void 0 || e.min === null || e.min === "" ? null : le(e.min, 0),
    max: e.max === void 0 || e.max === null || e.max === "" ? null : le(e.max, 0),
    pool: te(e.pool),
    operation: n,
    conditions: Rt(e.conditions),
    limit: ii(e.limit)
  };
}
function Go(a = {}) {
  const e = te(a == null ? void 0 : a.selector);
  return e === "intent.skill" || e.startsWith("intent.skill.");
}
function ci(a = []) {
  return (Array.isArray(a) ? a : []).map(Eu).filter((t) => t.phase && t.type);
}
function ot(a = {}) {
  const e = a && typeof a == "object" ? Ka(a) : {}, t = e.positive === !1 ? "negative" : "positive", i = Su.has(String(e.category ?? "").trim()) ? String(e.category).trim() : t, s = Au.has(String(e.tier ?? "").trim()) ? String(e.tier).trim() : "minor", n = wu.has(String(e.activation ?? "").trim()) ? String(e.activation).trim() : "passive";
  return {
    ...e,
    positive: i === "positive",
    category: i,
    tier: s,
    activation: n,
    tags: qo(e.tags),
    effects: ci(e.effects),
    prerequisites: Rt(e.prerequisites),
    limits: ii(e.limits)
  };
}
function Vo() {
  return {
    categories: [...Fn],
    tiers: [...zn],
    activations: [...zo],
    effectTypes: [...Wo],
    phases: [...Uo],
    comparators: [...Wn],
    edgeOperations: [...jo]
  };
}
function Ra(a = "") {
  var e;
  return ((e = Fn.find((t) => t.value === a)) == null ? void 0 : e.label) ?? "Positive";
}
function Ia(a = "") {
  var e;
  return ((e = zn.find((t) => t.value === a)) == null ? void 0 : e.label) ?? "Minor";
}
function Pu(a = "") {
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
function Nu(a) {
  return Array.from((a == null ? void 0 : a.items) ?? []).filter((e) => ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === "quality").map((e) => ({
    item: e,
    system: ot(e.system ?? {})
  }));
}
function Ru(a = {}, e = {}) {
  const t = ii(a), i = ii(e);
  return {
    perActivation: i.perActivation || t.perActivation,
    perRound: i.perRound || t.perRound,
    perScene: i.perScene || t.perScene
  };
}
function Ko(a = {}) {
  var s, n, r;
  const e = te(a.combatId ?? ((s = a.combat) == null ? void 0 : s.id)), t = Math.max(0, Math.trunc(le(a.round ?? ((n = a.combat) == null ? void 0 : n.round), 0))), i = te(a.sceneId ?? ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id));
  return {
    activationKey: te(a.activationKey),
    roundKey: e ? `${e}:${t}` : "",
    sceneKey: i
  };
}
function Iu(a, e = {}) {
  var n, r, o, l;
  const t = ((n = a == null ? void 0 : a.flags) == null ? void 0 : n[w]) ?? {}, i = ((r = t == null ? void 0 : t.traitUsage) == null ? void 0 : r.scene) ?? {}, s = e.state ?? {};
  return {
    activation: ((o = s == null ? void 0 : s.traitUsage) == null ? void 0 : o.activation) ?? {},
    round: ((l = s == null ? void 0 : s.traitUsage) == null ? void 0 : l.round) ?? {},
    scene: i
  };
}
function Du(a, e, t, i) {
  var s, n, r, o, l;
  switch (t) {
    case "perActivation":
      return Math.max(0, Math.trunc(le((s = a.activation) == null ? void 0 : s[i], 0)));
    case "perRound":
      return Math.max(0, Math.trunc(le((r = (n = a.round) == null ? void 0 : n[e.roundKey]) == null ? void 0 : r[i], 0)));
    case "perScene":
      return Math.max(0, Math.trunc(le((l = (o = a.scene) == null ? void 0 : o[e.sceneKey]) == null ? void 0 : l[i], 0)));
    default:
      return 0;
  }
}
function Ou(a, e, t, i) {
  const s = [];
  for (const n of ["perActivation", "perRound", "perScene"]) {
    const r = Math.max(0, Math.trunc(le(t == null ? void 0 : t[n], 0)));
    if (!r) continue;
    Du(a, e, n, i) >= r && s.push(`${n} limit reached`);
  }
  return s;
}
function _u(a, e, t) {
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
function ur(a, e) {
  if (!te(a == null ? void 0 : a.fact)) return !0;
  const t = foundry.utils.getProperty(e, a.fact);
  return _u(t, a.comparator, a.value);
}
function Lu(a = "", e = {}) {
  const t = te(a);
  return t ? (Array.isArray(e == null ? void 0 : e.selectors) ? e.selectors : []).some(
    (s) => s === t || s.startsWith(`${t}.`)
  ) : !0;
}
function Yo(a, e) {
  return `${a.id}:${e.id}`;
}
function $u(a, e) {
  var t;
  return !!((t = a.system) != null && t.inactive) || !!(e != null && e.inactive);
}
function dr(a = []) {
  return a.map((e) => e.fact).filter(Boolean).join(", ");
}
function ki(a, e, t) {
  const i = le(a[e], 0);
  let s = i;
  return typeof t.value == "number" && (s += t.value), typeof t.min == "number" && (s = Math.max(t.min, s)), typeof t.max == "number" && (s = Math.min(t.max, s)), a[e] = s, s - i;
}
function Gt(a, e, t, i, s) {
  i && a.push({
    id: `trait:${s}:${e.id}:${t.id}`,
    label: t.label || e.name,
    value: i,
    source: e.name,
    traitItemId: e.id,
    traitEffectId: t.id
  });
}
function xu({ item: a, effect: e, phase: t, packet: i, result: s }) {
  switch (e.type) {
    case "rollMod": {
      const n = le(e.value, 0);
      return Gt(s.modifiers, a, e, n, t), n;
    }
    case "burnAdjust": {
      if (t === "onEndOfActivation") {
        const r = ki(i, "burnDelta", e);
        return Gt(s.modifiers, a, e, r, t), r;
      }
      const n = ki(i, "amount", e);
      return Gt(s.modifiers, a, e, n, t), n;
    }
    case "actionCostMod": {
      const n = ki(i, "cost", e);
      return Gt(s.modifiers, a, e, n, t), n;
    }
    case "initiativeMod": {
      const n = ki(i, "total", e);
      return Gt(s.modifiers, a, e, n, t), n;
    }
    case "damageMod": {
      const n = ki(i, "amount", e);
      return Gt(s.modifiers, a, e, n, t), n;
    }
    case "edgeEvent": {
      if (t === "onEndOfActivation" && e.operation === "grantPool" && e.pool)
        return i.edgeAdjustments ?? (i.edgeAdjustments = []), i.edgeAdjustments.push({
          poolKey: e.pool,
          amount: le(e.value, 0),
          label: e.label || a.name,
          source: a.name
        }), Gt(s.modifiers, a, e, le(e.value, 0), t), le(e.value, 0);
      const n = ki(i, "amount", e);
      return Gt(s.modifiers, a, e, n, t), n;
    }
    default:
      return 0;
  }
}
function Bu(a, e, t) {
  const i = Yo(a, e), s = [];
  return t.perActivation > 0 && s.push({ kind: "usage", scope: "perActivation", key: i, delta: 1 }), t.perRound > 0 && s.push({ kind: "usage", scope: "perRound", key: i, delta: 1 }), t.perScene > 0 && s.push({ kind: "usage", scope: "perScene", key: i, delta: 1 }), s;
}
function Qo(a = "") {
  const e = te(a);
  return e ? [`action.${e}`] : [];
}
function Si(a, e = {}) {
  var o, l, c, u, d;
  const t = e.snapshot ?? null, i = e.state ?? (t == null ? void 0 : t.state) ?? {}, s = Array.isArray(i == null ? void 0 : i.actionLog) ? i.actionLog.map((m) => te(m == null ? void 0 : m.id)).filter(Boolean) : [], n = (i == null ? void 0 : i.actionState) ?? {}, r = [];
  return n != null && n.aim && r.push("state.aim"), n != null && n.preparedInterrupt && r.push("state.preparedInterrupt"), {
    activation: {
      moved: s.includes("move") || !!((o = n == null ? void 0 : n.move) != null && o.moved),
      saSpent: Math.max(0, Math.trunc(le(i == null ? void 0 : i.saSpentThisActivation, 0))),
      attacksThisActivation: Math.max(0, Math.trunc(le(i == null ? void 0 : i.attacksThisActivation, 0))),
      burnThisActivation: Math.max(0, Math.trunc(le(i == null ? void 0 : i.burnThisActivation, 0)))
    },
    actionState: {
      aim: (n == null ? void 0 : n.aim) ?? null,
      move: (n == null ? void 0 : n.move) ?? null,
      preparedInterrupt: (n == null ? void 0 : n.preparedInterrupt) ?? null
    },
    burn: {
      current: Math.max(0, Math.trunc(le((c = (l = a == null ? void 0 : a.system) == null ? void 0 : l.burn) == null ? void 0 : c.value, 0))),
      overloaded: !!((d = (u = a == null ? void 0 : a.system) == null ? void 0 : u.burn) != null && d.overloaded)
    },
    timing: {
      firstAttackThisActivation: Math.max(0, Math.trunc(le(i == null ? void 0 : i.attacksThisActivation, 0))) === 0,
      firstExtraSAThisActivation: Math.max(0, Math.trunc(le(i == null ? void 0 : i.saSpentThisActivation, 0))) <= 3
    },
    selectors: r
  };
}
function Un({ actor: a, resolved: e, payload: t, runtime: i = {} } = {}) {
  var d, m, p, f, h, g, y, b, A, v, C, I;
  const s = Si(a, i), n = te((e == null ? void 0 : e.intent) ?? (t == null ? void 0 : t.intent), "skill"), r = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [], o = te(((d = e == null ? void 0 : e.attack) == null ? void 0 : d.rangeBand) ?? (t == null ? void 0 : t.rangeBand)), l = te(((p = (m = t == null ? void 0 : t.edge) == null ? void 0 : m.pre) == null ? void 0 : p.poolKey) ?? ((f = t == null ? void 0 : t.edge) == null ? void 0 : f.poolKey) ?? ""), c = te(
    ((h = e == null ? void 0 : e.data) == null ? void 0 : h.skillKey) ?? ((g = e == null ? void 0 : e.specialization) == null ? void 0 : g.skillKey) ?? (n === "skill" ? t == null ? void 0 : t.key : "")
  ), u = te(
    ((A = (b = (y = e == null ? void 0 : e.breakdown) == null ? void 0 : y.find) == null ? void 0 : b.call(y, (P) => (P == null ? void 0 : P.id) === "skill")) == null ? void 0 : A.label) ?? (e == null ? void 0 : e.title)
  );
  return s.intent = n, s.domains = r, s.rangeBand = o, s.skill = {
    key: c,
    label: u
  }, s.edge = {
    stage: (v = t == null ? void 0 : t.toggles) != null && v.useEdge ? "pre" : "",
    pool: l,
    spent: !!((C = t == null ? void 0 : t.toggles) != null && C.useEdge)
  }, s.selectors.push(`intent.${n}`), r.forEach((P) => s.selectors.push(`domain.${P}`)), o && s.selectors.push(`range.${o}`), n === "skill" && c && s.selectors.push(`skill.${c}`), (I = t == null ? void 0 : t.toggles) != null && I.useEdge && s.selectors.push("edge.pre"), s;
}
function Jo({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Si(a, t);
  return i.action = {
    id: te(e.actionId),
    category: te(e.category),
    resource: te(e.resource),
    cost: le(e.cost, 0),
    effectiveCost: le(e.effectiveCost ?? e.cost, 0)
  }, i.selectors.push(...Qo(e.actionId)), i.action.category && i.selectors.push(`actionCategory.${i.action.category}`), i.action.resource && i.selectors.push(`actionResource.${i.action.resource}`), i;
}
function Da({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Si(a, t);
  return i.action = {
    id: te(e.actionId),
    category: te(e.category),
    resource: te(e.resource)
  }, i.burn = {
    ...i.burn,
    amount: le(e.amount, 0),
    source: te(e.source)
  }, e.source === "extraSA" && e.extraSaIndex === 1 && i.selectors.push("activation.extraSA:first"), e.source && i.selectors.push(`burn.${e.source}`), i.action.id && i.selectors.push(...Qo(i.action.id)), i.action.category && i.selectors.push(`actionCategory.${i.action.category}`), i.action.category === "reaction" && i.selectors.push(`reaction.${i.action.id}`), i;
}
function Xo({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Si(a, t);
  return i.intent = "initiative", i.domains = ["combat"], i.initiative = {
    total: le(e.total, 0)
  }, i.selectors.push("intent.initiative"), i;
}
function Zo({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Si(a, t);
  return i.damage = {
    amount: le(e.amount, 0),
    track: te(e.track),
    damageType: te(e.damageType)
  }, i.selectors.push("incoming"), i;
}
function Js({ actor: a, packet: e = {}, phase: t = "onEdgeGain", runtime: i = {} } = {}) {
  const s = Si(a, i);
  return s.edge = {
    pool: te(e.poolKey),
    amount: le(e.amount, 0),
    eventKey: te(e.eventKey),
    source: te(e.source)
  }, s.selectors.push(t === "onEdgeSpend" ? "edge.spend" : "edge.gain"), s.edge.eventKey && s.selectors.push(`event.${s.edge.eventKey}`), s;
}
function el({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Si(a, t);
  return i.event = {
    phase: "endOfActivation"
  }, i.selectors.push("endOfActivation"), le(e.burnDelta, 0) !== 0 && i.selectors.push("burn.adjust"), i;
}
function et({ actor: a, phase: e, facts: t = {}, packet: i = {}, options: s = {} } = {}) {
  var u;
  const n = {
    packet: Ka(i),
    modifiers: [],
    mutations: [],
    applied: [],
    skipped: []
  };
  if (!a || !Ho.has(String(e ?? "").trim()))
    return n;
  const r = s.runtime ?? {}, o = Iu(a, r), l = Ko(r), c = Nu(a);
  for (const { item: d, system: m } of c) {
    if ($u(d, m)) {
      n.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: "Trait is inactive"
      });
      continue;
    }
    const p = m.prerequisites.filter((f) => te(f == null ? void 0 : f.fact)).filter((f) => !ur(f, t));
    if (p.length) {
      n.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: `Prerequisites not met: ${dr(p)}`
      });
      continue;
    }
    for (const f of m.effects.filter((h) => h.phase === e)) {
      if (!Lu(f.selector, t)) {
        n.skipped.push({
          traitItemId: d.id,
          traitEffectId: f.id,
          label: f.label || d.name,
          reason: `Selector did not match (${f.selector || "any"})`
        });
        continue;
      }
      if (Go(f) && f.skillKeys.length) {
        const v = te((u = t == null ? void 0 : t.skill) == null ? void 0 : u.key);
        if (!v || !f.skillKeys.includes(v)) {
          n.skipped.push({
            traitItemId: d.id,
            traitEffectId: f.id,
            label: f.label || d.name,
            reason: `Skill did not match (${f.skillKeys.join(", ")})`
          });
          continue;
        }
      }
      const h = f.conditions.filter((v) => te(v == null ? void 0 : v.fact)).filter((v) => !ur(v, t));
      if (h.length) {
        n.skipped.push({
          traitItemId: d.id,
          traitEffectId: f.id,
          label: f.label || d.name,
          reason: `Conditions not met: ${dr(h)}`
        });
        continue;
      }
      const g = Ru(m.limits, f.limit), y = Yo(d, f), b = Ou(o, l, g, y);
      if (b.length) {
        n.skipped.push({
          traitItemId: d.id,
          traitEffectId: f.id,
          label: f.label || d.name,
          reason: b.join(", ")
        });
        continue;
      }
      const A = xu({
        item: d,
        effect: f,
        phase: e,
        packet: n.packet,
        result: n
      });
      n.applied.push({
        traitItemId: d.id,
        traitEffectId: f.id,
        label: f.label || d.name,
        value: A,
        phase: e,
        source: d.name
      }), s.consumeUsage && n.mutations.push(...Bu(d, f, g));
    }
  }
  return n;
}
async function Dt({ actor: a, mutations: e = [], runtime: t = {} } = {}) {
  var o, l, c, u, d, m, p, f, h;
  if (!a || !Array.isArray(e) || !e.length) return;
  const i = e.filter((g) => (g == null ? void 0 : g.kind) === "usage");
  if (!i.length) return;
  const s = Ka(((c = (l = (o = a.flags) == null ? void 0 : o[w]) == null ? void 0 : l.traitUsage) == null ? void 0 : c.scene) ?? {}), n = t.state ? Ka(t.state) : null, r = Ko(t);
  for (const g of i) {
    const y = te(g.key), b = Math.max(0, Math.trunc(le(g.delta, 0)));
    if (!(!y || !b))
      switch (g.scope) {
        case "perActivation": {
          if (!n) break;
          n.traitUsage ?? (n.traitUsage = {}), (u = n.traitUsage).activation ?? (u.activation = {}), n.traitUsage.activation[y] = Math.max(0, le(n.traitUsage.activation[y], 0) + b);
          break;
        }
        case "perRound": {
          if (!n || !r.roundKey) break;
          n.traitUsage ?? (n.traitUsage = {}), (d = n.traitUsage).round ?? (d.round = {}), (m = n.traitUsage.round)[p = r.roundKey] ?? (m[p] = {}), n.traitUsage.round[r.roundKey][y] = Math.max(
            0,
            le(n.traitUsage.round[r.roundKey][y], 0) + b
          );
          break;
        }
        case "perScene": {
          if (!r.sceneKey) break;
          s[f = r.sceneKey] ?? (s[f] = {}), s[r.sceneKey][y] = Math.max(0, le(s[r.sceneKey][y], 0) + b);
          break;
        }
      }
  }
  n && ((h = t.combatant) != null && h.id) && await t.combatant.setFlag(w, "personalCombat", n), await a.setFlag(w, "traitUsage", { scene: s });
}
const tl = "personalActionCatalog", Me = Object.freeze({
  standard: "standard",
  complex: "complex",
  free: "free",
  reaction: "reaction",
  recovery: "recovery"
}), Xs = Object.freeze([
  { value: Me.standard, label: "Standard" },
  { value: Me.complex, label: "Complex" },
  { value: Me.free, label: "Free" },
  { value: Me.reaction, label: "Reaction" },
  { value: Me.recovery, label: "Burn & Recovery" }
]), il = Object.freeze([
  { value: "", label: "Not Implemented / Placeholder" },
  { value: "combatAction", label: "Generic Action" },
  { value: "combatAttack", label: "Attack Pipeline" },
  { value: "combatReduceBurn", label: "Reduce Burn" },
  { value: "combatOverloadCheck", label: "Overload Check" }
]), mr = new Set(Xs.map((a) => a.value)), pr = new Set(il.map((a) => a.value)), al = Object.freeze([
  { id: "move", label: "Move", category: "standard", cost: 1, handler: "combatAction", state: "move" },
  { id: "aim", label: "Aim", category: "standard", cost: 1, handler: "combatAction", state: "aim" },
  { id: "interact", label: "Interact", category: "standard", cost: 1, handler: "combatAction" },
  { id: "assess", label: "Assess", category: "standard", cost: 1, handler: "combatAction" },
  { id: "attack", label: "Attack", category: "complex", cost: 2, handler: "combatAttack", prominent: !0 },
  { id: "firstAid", label: "First Aid", category: "complex", cost: 2, handler: "", reason: "Recovery resolver not yet implemented." },
  { id: "readyItem", label: "Ready Item", category: "free", cost: 0, handler: "combatAction" },
  { id: "prepare", label: "Prepare", category: "free", cost: 0, handler: "combatAction", state: "preparedInterrupt" },
  { id: "drop", label: "Drop", category: "free", cost: 0, handler: "combatAction" },
  { id: "communicate", label: "Communicate", category: "free", cost: 0, handler: "combatAction" },
  { id: "adjust", label: "Adjust", category: "free", cost: 0, handler: "combatAction" },
  { id: "activateItem", label: "Activate Item", category: "free", cost: 0, handler: "combatAction" },
  { id: "react", label: "React", category: "reaction", cost: 0, handler: "combatAction" },
  { id: "evade", label: "Evade", category: "reaction", cost: 0, handler: "", reason: "Evade mitigation is not yet implemented." },
  { id: "opportunity", label: "Opportunity", category: "reaction", cost: 0, handler: "", reason: "Opportunity attacks are not yet implemented." },
  { id: "assist", label: "Assist", category: "reaction", cost: 0, handler: "", reason: "Reaction assist effects are not yet implemented." },
  { id: "interrupt", label: "Interrupt", category: "reaction", cost: 0, handler: "", reason: "Prepared interrupt resolution is not yet implemented." },
  { id: "reduceBurn", label: "Reduce Burn", category: "standard", cost: 1, handler: "combatReduceBurn", prominentWhenBurning: !0 },
  { id: "overloadCheck", label: "Overload Check", category: "recovery", cost: 0, handler: "combatOverloadCheck", roll: { intent: "overload" }, prominentWhenBurning: !0 }
].map((a) => Object.freeze(ns(a)))), Fu = new Map(al.map((a) => [a.id, a]));
function ns(a) {
  return JSON.parse(JSON.stringify(a ?? null));
}
function fr(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return ["true", "1", "yes", "y", "on"].includes(t) ? !0 : ["false", "0", "no", "n", "off", ""].includes(t) ? !1 : e;
}
function zu(a, e = null) {
  var i;
  const t = String((a == null ? void 0 : a.rollIntent) ?? ((i = a == null ? void 0 : a.roll) == null ? void 0 : i.intent) ?? (e == null ? void 0 : e.intent) ?? "").trim();
  return t ? { intent: t } : null;
}
function Wu(a, { strict: e = !1, index: t = 0 } = {}) {
  const i = String((a == null ? void 0 : a.id) ?? "").trim(), s = Fu.get(i) ?? {}, n = `Row ${t + 1}`, r = [];
  i || r.push(`${n}: id cannot be blank.`);
  const o = String((a == null ? void 0 : a.category) ?? s.category ?? "").trim();
  mr.has(o) || r.push(`${n}: category must be one of ${Array.from(mr).join(", ")}.`);
  const l = String((a == null ? void 0 : a.label) ?? s.label ?? "").trim();
  l || r.push(`${n}: label cannot be blank.`);
  const c = (a == null ? void 0 : a.cost) ?? s.cost ?? 0, u = Number(c);
  (!Number.isFinite(u) || u < 0) && r.push(`${n}: cost must be a non-negative number.`);
  const d = String((a == null ? void 0 : a.handler) ?? s.handler ?? "").trim();
  if (pr.has(d) || r.push(`${n}: handler must be one of ${Array.from(pr).map((f) => f || "(blank)").join(", ")}.`), r.length) {
    if (e) {
      const f = new Error(r[0]);
      throw f.validationErrors = r, f;
    }
    return null;
  }
  const m = {
    ...ns(s),
    id: i,
    label: l,
    category: o,
    cost: Math.trunc(u),
    handler: d,
    reason: String((a == null ? void 0 : a.reason) ?? s.reason ?? "").trim(),
    prominent: fr(a == null ? void 0 : a.prominent, !!s.prominent),
    prominentWhenBurning: fr(a == null ? void 0 : a.prominentWhenBurning, !!s.prominentWhenBurning)
  }, p = zu(a, s.roll ?? null);
  return p ? m.roll = p : delete m.roll, m.reason || delete m.reason, m.prominent || delete m.prominent, m.prominentWhenBurning || delete m.prominentWhenBurning, m;
}
function jn() {
  return ns(al);
}
function ua(a, { strict: e = !1 } = {}) {
  if (!Array.isArray(a)) {
    if (e) {
      const n = new Error("Action catalog must be an array.");
      throw n.validationErrors = [n.message], n;
    }
    return jn();
  }
  const t = [], i = /* @__PURE__ */ new Set(), s = [];
  if (a.forEach((n, r) => {
    try {
      const o = Wu(n, { strict: e, index: r });
      if (!o) return;
      const l = o.id.toLowerCase();
      if (i.has(l)) {
        const c = `Row ${r + 1}: duplicate action id "${o.id}".`;
        e && s.push(c);
        return;
      }
      i.add(l), t.push(o);
    } catch (o) {
      e && s.push(...Array.isArray(o.validationErrors) ? o.validationErrors : [o.message]);
    }
  }), s.length) {
    const n = new Error(s[0]);
    throw n.validationErrors = s, n;
  }
  return t;
}
function sl() {
  var a, e;
  try {
    const t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.get) == null ? void 0 : e.call(a, w, tl);
    return ua(t, { strict: !1 });
  } catch {
    return jn();
  }
}
function ks(a) {
  const e = String(a ?? "").trim();
  return sl().find((t) => t.id === e) ?? null;
}
function Uu(a) {
  return sl().filter((e) => e.category === a).map((e) => Object.freeze(ns(e)));
}
const kt = "mwd", vt = "personalCombat", Qt = 3, ju = 1, Hu = 1;
function ya(a, e) {
  return !(a != null && a.activation) || !e ? !1 : a.activation.combatId === e.combatId && Number(a.activation.round ?? -1) === Number(e.round ?? -1) && Number(a.activation.turn ?? -1) === Number(e.turn ?? -1) && a.activation.combatantId === e.combatantId;
}
function Oa(a = null) {
  return {
    saRemaining: Qt,
    faRemaining: ju,
    raRemaining: Hu,
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
    actionLog: [],
    activation: a
  };
}
function _a(a, e = null) {
  return foundry.utils.mergeObject(
    Oa(e),
    foundry.utils.deepClone(a ?? {}),
    { inplace: !1, overwrite: !0 }
  );
}
function vs(a, e = null) {
  const t = _a(a ?? {}, (a == null ? void 0 : a.activation) ?? e);
  return t.actionLog = La(t.actionLog), t;
}
function La(a) {
  return Array.isArray(a) ? a.map((e) => {
    const t = String((e == null ? void 0 : e.label) ?? "").trim();
    return t ? {
      id: String((e == null ? void 0 : e.id) ?? "").trim(),
      label: t,
      costLabel: String((e == null ? void 0 : e.costLabel) ?? "").trim()
    } : null;
  }).filter(Boolean) : [];
}
function qu(a, e) {
  return a === "free" ? "Free" : a === "burn" ? `+${e} Burn` : `${e} ${String(a).toUpperCase()}`;
}
function Gu(a = {}, e = "", { snapshot: t = null, metadata: i = {} } = {}) {
  var r, o, l, c;
  const s = foundry.utils.deepClone(a ?? {});
  s.actionState ?? (s.actionState = {});
  const n = {
    actionId: e,
    round: Number(((r = t == null ? void 0 : t.combat) == null ? void 0 : r.round) ?? 0),
    turn: Number(((o = t == null ? void 0 : t.combat) == null ? void 0 : o.turn) ?? 0),
    combatantId: ((l = t == null ? void 0 : t.combatant) == null ? void 0 : l.id) ?? null
  };
  return e === "aim" && (s.actionState.aim = {
    ...n,
    target: ((c = t == null ? void 0 : t.targeting) == null ? void 0 : c.target) ?? null
  }), e === "move" && (s.actionState.move = {
    ...n,
    moved: !0
  }), e === "prepare" && (s.actionState.preparedInterrupt = {
    ...n,
    condition: String((i == null ? void 0 : i.condition) ?? "").trim(),
    scope: String((i == null ? void 0 : i.scope) ?? "").trim()
  }), s;
}
function Vu(a) {
  const e = (CONFIG.statusEffects ?? []).find((i) => String((i == null ? void 0 : i.id) ?? "").trim() === a), t = String((e == null ? void 0 : e.name) ?? (e == null ? void 0 : e.label) ?? a ?? "").trim();
  return Bo(t);
}
function vi(a) {
  const e = Number(a);
  return !Number.isFinite(e) || e === 0 ? "0" : e > 0 ? `+${e}` : String(e);
}
function Ku(a) {
  if (typeof a == "number") return Number.isFinite(a) ? a : 0;
  const e = String(a ?? "").trim().match(/[-+]?\d+(\.\d+)?/);
  return e ? Number(e[0]) : 0;
}
function hr(a) {
  var o;
  const e = (a == null ? void 0 : a.document) ?? a ?? null, t = (a == null ? void 0 : a.object) ?? (e == null ? void 0 : e.object) ?? a ?? null, i = String((e == null ? void 0 : e.id) ?? "").trim(), s = oe._pendingTokenPositions.get(i) ?? null, n = Number((s == null ? void 0 : s.x) ?? (e == null ? void 0 : e.x)), r = Number((s == null ? void 0 : s.y) ?? (e == null ? void 0 : e.y));
  if (t && Number.isFinite(n) && Number.isFinite(r)) {
    if (typeof t.getCenterPoint == "function")
      return t.getCenterPoint({ x: n, y: r });
    if (typeof t.getCenter == "function")
      return t.getCenter(n, r);
  }
  return (t == null ? void 0 : t.center) ?? ((o = e == null ? void 0 : e.object) == null ? void 0 : o.center) ?? null;
}
function Yu(a, e = "") {
  if (!Number.isFinite(a)) return "";
  const t = Math.round(a * 10) / 10, i = Number.isInteger(t) ? String(t) : t.toFixed(1);
  return e ? `${i} ${e}` : i;
}
class oe {
  static init() {
    Hooks.on("updateCombat", (e, t) => this._onUpdateCombat(e, t)), Hooks.on("updateCombatant", (e, t) => this._onUpdateCombatant(e, t)), Hooks.on("updateToken", (e, t) => this._onUpdateToken(e, t)), Hooks.on("createCombatant", (e) => this._onCreateCombatant(e)), Hooks.on("deleteCombatant", (e) => this._onDeleteCombatant(e)), Hooks.on("deleteCombat", (e) => this._onDeleteCombat(e)), Hooks.on("targetToken", (e, t, i) => this._onTargetToken(e, t, i));
  }
  static async onReady() {
    var e;
    await this.ensureCurrentCombatantState(), (e = game.combat) != null && e.id && this._lastActivationByCombat.set(
      game.combat.id,
      this.getActivationIdentity(game.combat, game.combat.combatant)
    ), this.renderOpenCharacterSheets();
  }
  static _asTokenDocument(e) {
    return e ? (e == null ? void 0 : e.document) ?? e : null;
  }
  static _getTokenSceneId(e) {
    var i, s, n, r;
    const t = this._asTokenDocument(e);
    return ((i = t == null ? void 0 : t.parent) == null ? void 0 : i.id) ?? ((s = t == null ? void 0 : t.scene) == null ? void 0 : s.id) ?? ((r = (n = t == null ? void 0 : t.object) == null ? void 0 : n.scene) == null ? void 0 : r.id) ?? null;
  }
  static _getSceneTokenDocumentById(e, t = ((i) => (i = canvas == null ? void 0 : canvas.scene) == null ? void 0 : i.id)()) {
    var r, o, l, c, u;
    const s = String(e ?? "").trim();
    if (!s || !t) return null;
    const n = ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id) === t ? canvas.scene : (l = (o = game.scenes) == null ? void 0 : o.get) == null ? void 0 : l.call(o, t);
    return ((u = (c = n == null ? void 0 : n.tokens) == null ? void 0 : c.get) == null ? void 0 : u.call(c, s)) ?? null;
  }
  static _getCombatantTokenDocument(e, t = ((i) => (i = canvas == null ? void 0 : canvas.scene) == null ? void 0 : i.id)()) {
    const s = this._asTokenDocument(e == null ? void 0 : e.token);
    return s && typeof s == "object" ? s : this._getSceneTokenDocumentById(this._getCombatantTokenId(e), t);
  }
  static _getCombatantTokenId(e) {
    var t, i, s, n, r;
    return String(
      (e == null ? void 0 : e.tokenId) ?? ((t = e == null ? void 0 : e.token) == null ? void 0 : t.id) ?? ((i = e == null ? void 0 : e.token) == null ? void 0 : i._id) ?? ((n = (s = e == null ? void 0 : e.token) == null ? void 0 : s.document) == null ? void 0 : n.id) ?? ((r = e == null ? void 0 : e._source) == null ? void 0 : r.tokenId) ?? ""
    ).trim();
  }
  static _getCombatantActorId(e) {
    var i, s, n, r;
    const t = this._asTokenDocument(e == null ? void 0 : e.token);
    return String(
      (e == null ? void 0 : e.actorId) ?? ((i = e == null ? void 0 : e.actor) == null ? void 0 : i.id) ?? ((s = e == null ? void 0 : e._source) == null ? void 0 : s.actorId) ?? (t == null ? void 0 : t.actorId) ?? ((n = t == null ? void 0 : t.actor) == null ? void 0 : n.id) ?? ((r = t == null ? void 0 : t.baseActor) == null ? void 0 : r.id) ?? ""
    ).trim();
  }
  static _getCombatants(e) {
    return e != null && e.combatants ? typeof e.combatants.values == "function" ? Array.from(e.combatants.values()) : Array.from(e.combatants ?? []) : [];
  }
  static _getCombatSceneId(e) {
    var t, i, s;
    return String(
      ((t = e == null ? void 0 : e.scene) == null ? void 0 : t.id) ?? (e == null ? void 0 : e.sceneId) ?? ((i = e == null ? void 0 : e._source) == null ? void 0 : i.scene) ?? ((s = e == null ? void 0 : e._source) == null ? void 0 : s.sceneId) ?? ""
    ).trim();
  }
  static _getCombatantSceneId(e) {
    var i, s, n, r, o;
    const t = this._asTokenDocument(e == null ? void 0 : e.token);
    return String(
      (e == null ? void 0 : e.sceneId) ?? ((i = e == null ? void 0 : e._source) == null ? void 0 : i.sceneId) ?? ((s = t == null ? void 0 : t.parent) == null ? void 0 : s.id) ?? ((n = t == null ? void 0 : t.scene) == null ? void 0 : n.id) ?? ((o = (r = t == null ? void 0 : t.object) == null ? void 0 : r.scene) == null ? void 0 : o.id) ?? ""
    ).trim();
  }
  static _findCombatantForToken(e, t = null, i = ((s) => (s = canvas == null ? void 0 : canvas.scene) == null ? void 0 : s.id)()) {
    var l, c;
    const n = this._asTokenDocument(t), r = String((n == null ? void 0 : n.id) ?? "").trim();
    if (!e || !r) return null;
    if (((c = (l = n == null ? void 0 : n.combatant) == null ? void 0 : l.combat) == null ? void 0 : c.id) === e.id) return n.combatant;
    let o = null;
    if (typeof e.getCombatantByToken == "function")
      try {
        o = e.getCombatantByToken(r) ?? null;
      } catch {
        o = null;
      }
    return o || (this._getCombatants(e).find((u) => {
      const d = this._getCombatantTokenDocument(u, i), m = this._getCombatantTokenId(u) || String((d == null ? void 0 : d.id) ?? "").trim(), p = this._getCombatantSceneId(u) || i;
      return m === r && (!i || !p || p === i);
    }) ?? null);
  }
  static _collectActorIds(e, t = null) {
    var r, o;
    const i = /* @__PURE__ */ new Set(), s = (l) => {
      const c = String(l ?? "").trim();
      c && i.add(c);
    };
    s(e == null ? void 0 : e.id), s(e == null ? void 0 : e._id);
    const n = this._asTokenDocument(t) ?? this._asTokenDocument(e == null ? void 0 : e.token);
    return s((r = n == null ? void 0 : n.actor) == null ? void 0 : r.id), s((o = n == null ? void 0 : n.baseActor) == null ? void 0 : o.id), s(n == null ? void 0 : n.actorId), i;
  }
  static _tokenDocumentMatchesActor(e, t, i = null) {
    var r, o;
    const s = this._asTokenDocument(e);
    if (!s || !t) return !1;
    const n = i ?? this._collectActorIds(t, s);
    return [
      (r = s == null ? void 0 : s.actor) == null ? void 0 : r.id,
      (o = s == null ? void 0 : s.baseActor) == null ? void 0 : o.id,
      s == null ? void 0 : s.actorId
    ].some((l) => n.has(String(l ?? "").trim()));
  }
  static getPreferredTokenDocument(e) {
    var s, n;
    if (!e) return null;
    const t = this._asTokenDocument(e == null ? void 0 : e.token);
    return t || (((n = (((s = e.getActiveTokens) == null ? void 0 : s.call(e, !0, !0)) ?? [])[0]) == null ? void 0 : n.document) ?? null);
  }
  static getPreferredToken(e) {
    const t = this.getPreferredTokenDocument(e);
    return t ? t.object ?? this._getSceneTokenById(t.id) : null;
  }
  static getCurrentSceneTokenDocument(e, t = null) {
    var f, h, g, y;
    const i = (f = canvas == null ? void 0 : canvas.scene) == null ? void 0 : f.id, s = this._asTokenDocument(t);
    if (this._getTokenSceneId(s) === i) return s;
    const n = String((s == null ? void 0 : s.id) ?? (t == null ? void 0 : t.id) ?? "").trim();
    if (n) {
      const b = this._getSceneTokenDocumentById(n, i);
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
      var A, v;
      return ((v = (A = b == null ? void 0 : b.document) == null ? void 0 : A.parent) == null ? void 0 : v.id) === i;
    })) == null ? void 0 : g.document) ?? null;
    if (c) return c;
    const u = Array.from(((y = canvas == null ? void 0 : canvas.scene) == null ? void 0 : y.tokens) ?? []), d = this._collectActorIds(e, r), m = u.filter((b) => this._tokenDocumentMatchesActor(b, e, d));
    return m.find((b) => {
      var A, v, C;
      return ((A = b == null ? void 0 : b.combatant) == null ? void 0 : A.id) === ((C = (v = game.combat) == null ? void 0 : v.combatant) == null ? void 0 : C.id);
    }) ?? null ?? m[0] ?? null;
  }
  static getCurrentSceneToken(e, t = null) {
    const i = this.getCurrentSceneTokenDocument(e, t);
    return i ? i.object ?? this._getSceneTokenById(i.id) : null;
  }
  static _getSceneTokenById(e) {
    var t, i, s, n;
    return e ? ((i = (t = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : t.get) == null ? void 0 : i.call(t, e)) ?? ((n = (s = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : s.placeables) == null ? void 0 : n.find((r) => r.id === e)) ?? null : null;
  }
  static _measureTokenDistance(e, t) {
    var o, l;
    const i = canvas == null ? void 0 : canvas.grid, s = hr(e), n = hr(t);
    if (!i || !s || !n) return null;
    if (typeof i.measurePath == "function")
      try {
        const c = i.measurePath([s, n], { gridSpaces: !0 }), u = Number(
          (c == null ? void 0 : c.distance) ?? (c == null ? void 0 : c.cost) ?? (c == null ? void 0 : c.totalDistance) ?? (c == null ? void 0 : c.totalCost) ?? NaN
        );
        if (Number.isFinite(u)) return u;
      } catch {
      }
    const r = ((l = (o = foundry == null ? void 0 : foundry.canvas) == null ? void 0 : o.geometry) == null ? void 0 : l.Ray) ?? globalThis.Ray;
    if (typeof i.measureDistances == "function" && typeof r == "function")
      try {
        const c = i.measureDistances([{ ray: new r(s, n) }], { gridSpaces: !0 }), u = Number(Array.isArray(c) ? c[0] : NaN);
        if (Number.isFinite(u)) return u;
      } catch {
        return null;
      }
    return null;
  }
  static getUserTargetTokens(e = game.user) {
    var s;
    const i = (Array.isArray((s = e == null ? void 0 : e.targets) == null ? void 0 : s.ids) ? e.targets.ids : []).map((n) => this._getSceneTokenById(n)).filter(Boolean);
    return i.length ? i : Array.from((e == null ? void 0 : e.targets) ?? []).map((n) => (n == null ? void 0 : n.object) ?? n).filter(Boolean);
  }
  static getTargetingSnapshot(e = null, t = game.user) {
    var u, d, m, p, f, h, g, y;
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
    const n = i[0], r = this._measureTokenDistance(e, n), o = String(((d = (u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.grid) == null ? void 0 : d.units) ?? ((p = (m = game.system) == null ? void 0 : m.grid) == null ? void 0 : p.units) ?? "").trim(), l = Yu(r, o), c = String((n == null ? void 0 : n.name) ?? ((f = n == null ? void 0 : n.actor) == null ? void 0 : f.name) ?? "Target").trim() || "Target";
    return {
      count: s,
      none: !1,
      single: !0,
      multiple: !1,
      heading: "Target",
      primaryLabel: c,
      detailRows: l ? [{ label: "Distance", value: l }] : [],
      target: {
        id: (n == null ? void 0 : n.id) ?? null,
        name: c,
        img: ((g = (h = n == null ? void 0 : n.document) == null ? void 0 : h.texture) == null ? void 0 : g.src) ?? ((y = n == null ? void 0 : n.texture) == null ? void 0 : y.src) ?? "",
        distance: Number.isFinite(r) ? r : null,
        distanceLabel: l
      }
    };
  }
  static getRollImpact(e = []) {
    const t = (Array.isArray(e) ? e : []).map((s) => {
      const n = Ku((s == null ? void 0 : s.numericValue) ?? (s == null ? void 0 : s.value) ?? 0);
      return {
        label: String((s == null ? void 0 : s.label) ?? "").trim() || "Modifier",
        numericValue: n,
        value: String((s == null ? void 0 : s.value) ?? vi(n)).trim() || vi(n)
      };
    }), i = t.reduce((s, n) => s + n.numericValue, 0);
    return {
      total: i,
      totalLabel: vi(i),
      entries: t
    };
  }
  static getCombat(e, t = null) {
    var h;
    const i = (h = canvas == null ? void 0 : canvas.scene) == null ? void 0 : h.id, s = game.combat, n = this._getCombatSceneId(s), o = !!this._asTokenDocument(t), l = this.getCurrentSceneTokenDocument(e, t), c = (l == null ? void 0 : l.object) ?? this._getSceneTokenById((l == null ? void 0 : l.id) ?? null);
    if (!s || n && i && n !== i)
      return {
        combat: null,
        combatant: null,
        token: c,
        tokenDocument: l
      };
    let u = this._findCombatantForToken(s, l, i);
    const d = this._getCombatants(s);
    if (!u) {
      const g = this._collectActorIds(e, l), y = String((l == null ? void 0 : l.id) ?? "").trim(), b = d.filter((C) => {
        const I = this._getCombatantTokenId(C), P = this._getCombatantTokenDocument(C, i), x = I || String((P == null ? void 0 : P.id) ?? "").trim();
        return o && y ? x === y : g.has(this._getCombatantActorId(C)) ? !0 : this._tokenDocumentMatchesActor(P, e, g);
      }), A = b.find((C) => {
        var I;
        return C.id === ((I = s == null ? void 0 : s.combatant) == null ? void 0 : I.id);
      }) ?? null;
      u = b.find(
        (C) => {
          var I;
          return y && (this._getCombatantTokenId(C) || String(((I = this._getCombatantTokenDocument(C, i)) == null ? void 0 : I.id) ?? "").trim()) === y;
        }
      ) ?? null ?? A ?? b[0] ?? null;
    }
    const m = this._getCombatantTokenDocument(u, i), p = l ?? m ?? null, f = c ?? (m == null ? void 0 : m.object) ?? this._getSceneTokenById(this._getCombatantTokenId(u)) ?? null;
    return {
      combat: s,
      combatant: u,
      token: f,
      tokenDocument: p
    };
  }
  static getSnapshot(e, { token: t = null } = {}) {
    var v, C, I, P, x;
    const {
      combat: i,
      combatant: s,
      token: n,
      tokenDocument: r
    } = this.getCombat(e, t), o = !!s && ((v = i == null ? void 0 : i.combatant) == null ? void 0 : v.id) === s.id, l = s ? this.getActivationIdentity(i, s) : null, c = s ? s.getFlag(kt, vt) : null, u = s ? o ? ya(c, l) ? vs(c, l) : Oa(l) : vs(c, l) : Oa(l);
    u.actionLog = La(u.actionLog);
    const d = Math.max(0, Number(((I = (C = e == null ? void 0 : e.system) == null ? void 0 : C.burn) == null ? void 0 : I.value) ?? 0)), m = Math.floor(d / 2), p = !!((x = (P = e == null ? void 0 : e.system) == null ? void 0 : P.burn) != null && x.overloaded), f = this.getActiveStatuses(e), h = f.filter((V) => !(p && V.id === "overloaded")), g = this.getModifierSummary(e, m), y = this.getRollImpact(g), b = Math.max(0, Number(u.burnThisActivation ?? 0)), A = s ? o ? "" : "Waiting for this combatant's activation." : "No combatant on the current scene.";
    return {
      token: n,
      tokenDocument: r,
      combat: i,
      combatant: s,
      hasCombatant: !!s,
      isCurrentTurn: o,
      overloaded: p,
      burn: {
        value: d,
        penalty: m,
        canOverloadCheck: d >= 6 && !p
      },
      state: u,
      targeting: this.getTargetingSnapshot(n),
      states: p ? [{ id: "overloaded", label: "Overloaded" }] : [],
      effects: h,
      statuses: f,
      rollImpact: y,
      summaryText: `SA: ${u.saRemaining} / ${Qt}   FA: ${u.faRemaining}   RA: ${u.raRemaining}`,
      activation: {
        burnThisActivation: b,
        burnThisActivationLabel: `+${b}`,
        items: [
          { label: "SA", value: `${u.saRemaining}/${Qt}` },
          { label: "FA", value: String(u.faRemaining) },
          { label: "RA", value: String(u.raRemaining) },
          { label: "Burn", value: `+${b}`, detail: "this activation" }
        ]
      },
      inactiveReason: A,
      modifierSummary: g
    };
  }
  static getModifierSummary(e, t = Math.floor(Number(((s) => (s = ((i) => (i = e == null ? void 0 : e.system) == null ? void 0 : i.burn)()) == null ? void 0 : s.value)() ?? 0) / 2)) {
    var c, u;
    const n = ((u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.derived) == null ? void 0 : u.condition) ?? {}, r = [];
    t > 0 && r.push({
      label: "Burn Penalty",
      numericValue: -t,
      value: vi(-t)
    });
    const o = Number(n.fatiguePenalty ?? 0);
    o && r.push({
      label: "Fatigue",
      numericValue: o,
      value: vi(o)
    });
    const l = Number(n.physicalPenalty ?? 0);
    return l && r.push({
      label: "Physical",
      numericValue: l,
      value: vi(l)
    }), r.length || r.push({
      label: "Current Modifiers",
      numericValue: 0,
      value: "0"
    }), r;
  }
  static getActiveStatuses(e) {
    return Array.from((e == null ? void 0 : e.statuses) ?? []).map((i) => ({
      id: i,
      label: Vu(i)
    })).sort((i, s) => i.label.localeCompare(s.label));
  }
  static buildActionModel(e, t) {
    var o, l, c, u;
    const i = (d) => {
      const m = Bn(d), p = hu(d);
      return !p || !m ? null : {
        id: d,
        label: m.label,
        handler: "roll",
        roll: JSON.stringify(p),
        disabled: !1,
        reason: ""
      };
    }, s = (d) => {
      const m = Uu(d).filter((p) => p.id !== "overloadCheck").filter((p) => !(d === Me.recovery && p.id === "reduceBurn"));
      if (d === Me.standard) {
        const p = ks("reduceBurn");
        p && !m.some((f) => f.id === "reduceBurn") && m.push(p);
      }
      return m.map((p) => this._buildCatalogAction(e, t, p));
    }, n = (d) => {
      const m = ks(d);
      if (!m) return null;
      const p = this._buildCatalogAction(e, t, m);
      return p.disabled ? null : p;
    }, r = (o = t.burn) != null && o.canOverloadCheck ? n("overloadCheck") : null;
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
        { label: "SA", value: `${t.state.saRemaining}/${Qt}` },
        { label: "Cap", value: `${Math.max(0, Number(((l = t.state) == null ? void 0 : l.saSpentThisActivation) ?? 0))}/${Zs(e)}` },
        { label: "FA", value: `${t.state.faRemaining}` },
        { label: "RA", value: `${t.state.raRemaining}` },
        {
          label: "Burn/Turn",
          value: `+${Math.max(0, Number(((c = t.state) == null ? void 0 : c.burnThisActivation) ?? 0))}`,
          action: r
        }
      ],
      activationLog: La((u = t.state) == null ? void 0 : u.actionLog).map((d, m) => ({
        ...d,
        index: m + 1
      })),
      menus: [
        {
          id: "standard",
          label: "Standard Actions",
          actions: s(Me.standard)
        },
        {
          id: "complex",
          label: "Complex Actions",
          actions: s(Me.complex)
        },
        {
          id: "free",
          label: "Free Actions",
          actions: s(Me.free)
        },
        {
          id: "reaction",
          label: "Reactions",
          actions: s(Me.reaction)
        },
        {
          id: "burn",
          label: "Burn & Recovery",
          actions: s(Me.recovery)
        }
      ].filter((d) => d.actions.length)
    };
  }
  static _buildCatalogAction(e, t, i) {
    const s = t.hasCombatant ? "" : "No current-scene combatant.", n = t.isCurrentTurn ? "" : "Only during your activation.", r = t.overloaded ? "Overloaded actors can only recover Burn." : "", o = ba(e, t), l = t.state ?? {}, c = i.category;
    let u = "sa", d = Number(i.cost ?? 0) || 0, m = qu(u, d), p = "";
    if (i.id === "reduceBurn")
      u = "sa", d = 1, m = "1 SA", p = s || n || (o <= 0 ? "Activation SA cap reached." : "") || (t.burn.value <= 0 ? "Burn is already at 0." : "");
    else if (i.id === "overloadCheck")
      u = "check", d = 0, m = "Check", p = s || n || (t.burn.canOverloadCheck ? "" : t.overloaded ? "Already Overloaded." : "Burn below 6.");
    else if (c === Me.standard)
      p = s || n || r || (o < d ? "Activation SA cap reached." : "");
    else if (c === Me.complex)
      p = s || n || r || (o < d ? "Activation SA cap reached." : "");
    else if (c === Me.free) {
      const f = Number(l.faRemaining ?? 0) > 0;
      u = f ? "fa" : "sa", d = 1, m = f ? "Free" : "1 SA", p = s || n || !f && r || (!f && o < 1 ? "Activation SA cap reached." : "");
    } else if (c === Me.reaction) {
      const f = Number(l.raRemaining ?? 0) > 0;
      u = f ? "ra" : "burn", d = f ? 1 : 2, m = f ? "1 RA" : "+2 Burn", p = s || (t.isCurrentTurn ? "Only outside your activation." : "");
    } else c === Me.recovery && (p = s || n);
    return i.handler || (p = i.reason || "Not yet implemented."), {
      id: i.id,
      label: i.label,
      category: c,
      handler: i.handler,
      resource: u,
      cost: d,
      costLabel: m,
      disabled: !!p,
      reason: p,
      roll: i.roll ? JSON.stringify(i.roll) : "",
      prominent: !!(i.prominent || i.prominentWhenBurning && t.burn.value >= 6)
    };
  }
  static async executeAction(e, { token: t = null, actionId: i = "", metadata: s = {} } = {}) {
    const n = ks(i);
    return n ? n.handler ? n.category === Me.standard ? this._executeStandardAction(e, { token: t, action: n, metadata: s }) : n.category === Me.free ? this._executeFreeAction(e, { token: t, action: n, metadata: s }) : n.category === Me.reaction ? this._executeReactionAction(e, { token: t, action: n, metadata: s }) : { ok: !1, reason: n.reason || "That action is not implemented yet." } : { ok: !1, reason: n.reason || "That action is not implemented yet." } : { ok: !1, reason: "Unknown combat action." };
  }
  static async _executeStandardAction(e, { token: t = null, action: i, metadata: s = {} } = {}) {
    const n = this.getSnapshot(e, { token: t });
    if (!n.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!n.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (n.overloaded) return { ok: !1, reason: "Overloaded actors can only recover Burn." };
    if (ba(e, n) < Number(i.cost ?? 1))
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
      metadata: s,
      snapshot: r.snapshot
    }), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : r;
  }
  static async _executeFreeAction(e, { token: t = null, action: i, metadata: s = {} } = {}) {
    var l;
    const n = this.getSnapshot(e, { token: t });
    if (!n.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!n.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    const r = Number(((l = n.state) == null ? void 0 : l.faRemaining) ?? 0) > 0;
    if (!r && n.overloaded)
      return { ok: !1, reason: "Overloaded actors can only recover Burn." };
    if (!r && ba(e, n) < 1)
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
      metadata: s,
      snapshot: o.snapshot
    }), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : o;
  }
  static async _executeReactionAction(e, { token: t = null, action: i, metadata: s = {} } = {}) {
    var d, m, p, f, h;
    const n = this.getSnapshot(e, { token: t });
    if (!n.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (n.isCurrentTurn) return { ok: !1, reason: "Only outside your activation." };
    const r = vs(n.combatant.getFlag(kt, vt), (d = n.state) == null ? void 0 : d.activation), o = Number(r.raRemaining ?? 0) > 0, l = {
      combat: n.combat,
      combatant: n.combatant,
      state: r,
      sceneId: ((m = canvas == null ? void 0 : canvas.scene) == null ? void 0 : m.id) ?? "",
      snapshot: { ...n, state: r }
    };
    let c = 0, u = "1 RA";
    if (o)
      r.raRemaining = Math.max(0, Number(r.raRemaining ?? 0) - 1);
    else {
      const g = et({
        actor: e,
        phase: "onBeforeBurnApplied",
        facts: Da({
          actor: e,
          packet: {
            actionId: i.id,
            category: i.category,
            resource: "reaction",
            amount: 2,
            source: "reaction"
          },
          runtime: l
        }),
        packet: {
          actionId: i.id,
          category: i.category,
          resource: "reaction",
          amount: 2,
          source: "reaction"
        },
        options: { runtime: l, consumeUsage: !0 }
      });
      c = Math.max(0, Number(g.packet.amount ?? 0) || 0), l.pendingMutations = (l.pendingMutations ?? []).concat(g.mutations), r.reactionBurnSinceLastActivation = Math.max(
        0,
        Number(r.reactionBurnSinceLastActivation ?? 0) + c
      ), u = `+${c} Burn`;
    }
    return this._appendActionLog(r, {
      id: i.id,
      label: i.label,
      costLabel: u
    }), (p = l.pendingMutations) != null && p.length ? await Dt({ actor: e, mutations: l.pendingMutations, runtime: l }) : await n.combatant.setFlag(kt, vt, r), c > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((h = (f = e.system) == null ? void 0 : f.burn) == null ? void 0 : h.value) ?? 0) + c) }), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) };
  }
  static async _applyActionState(e, { token: t = null, actionId: i = "", metadata: s = {}, snapshot: n = null } = {}) {
    const r = n ?? this.getSnapshot(e, { token: t });
    if (!(r != null && r.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const o = Gu(r.state, i, {
      snapshot: r,
      metadata: s
    });
    return await r.combatant.setFlag(kt, vt, o), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) };
  }
  static _buildSpendAction(e, t, i = "") {
    var l;
    const s = Number(((l = e.state) == null ? void 0 : l[`${t.resource}Remaining`]) ?? 0), n = t.resource === "sa" ? "" : s < t.cost ? `No ${String(t.resource).toUpperCase()} remaining.` : "", r = i || n, o = this._formatCostLabel(t.resource, t.cost);
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
  static _appendActionLog(e, { id: t = "", label: i = "", costLabel: s = "" } = {}) {
    const n = String(i ?? "").trim();
    if (!n) return;
    const r = La(e == null ? void 0 : e.actionLog);
    r.push({
      id: String(t ?? "").trim(),
      label: n,
      costLabel: String(s ?? "").trim()
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
    var n, r;
    if (!game.user.isGM) return;
    const e = game.combat, t = e == null ? void 0 : e.combatant;
    if (!e || !t || ((n = e.scene) == null ? void 0 : n.id) !== ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id)) return;
    const i = this.getActivationIdentity(e, t), s = t.getFlag(kt, vt);
    ya(s, i) || await t.setFlag(kt, vt, Oa(i));
  }
  static async spendResource(e, {
    token: t = null,
    resource: i = "sa",
    cost: s = 1,
    actionId: n = "",
    actionLabel: r = "",
    actionCostLabel: o = "",
    actionCategory: l = ""
  } = {}) {
    var A, v, C, I, P, x, V;
    const c = this.getSnapshot(e, { token: t });
    if (!c.hasCombatant)
      return { ok: !1, reason: "No combatant on the current scene." };
    if (!c.isCurrentTurn)
      return { ok: !1, reason: "Only available during your activation." };
    const u = {
      combat: c.combat,
      combatant: c.combatant,
      state: _a(c.state, this.getActivationIdentity(c.combat, c.combatant)),
      sceneId: ((A = canvas == null ? void 0 : canvas.scene) == null ? void 0 : A.id) ?? "",
      snapshot: c
    };
    let d = Math.max(0, Number(s ?? 0) || 0);
    const m = et({
      actor: e,
      phase: "onBeforeActionCostFinalized",
      facts: Jo({
        actor: e,
        packet: { actionId: n, category: l, resource: i, cost: d, effectiveCost: d },
        runtime: u
      }),
      packet: { actionId: n, category: l, resource: i, cost: d, effectiveCost: d },
      options: { runtime: u, consumeUsage: !0 }
    });
    d = Math.max(0, Number(m.packet.cost ?? d) || 0), u.pendingMutations = (u.pendingMutations ?? []).concat(m.mutations);
    const p = `${i}Remaining`, f = Number(((v = c.state) == null ? void 0 : v[p]) ?? 0);
    if (i !== "sa" && f < d)
      return { ok: !1, reason: `No ${String(i).toUpperCase()} remaining.` };
    const h = u.state, g = i === "sa" ? Zs(e) : 0, y = Math.max(0, Number(((C = c.state) == null ? void 0 : C.saSpentThisActivation) ?? 0) || 0);
    if (i === "sa" && y + d > g)
      return { ok: !1, reason: "Activation SA cap reached." };
    h[p] = Math.max(0, f - d), i === "sa" && (h.saSpentThisActivation = y + d, n === "attack" && (h.attacksThisActivation = Number(h.attacksThisActivation ?? 0) + 1)), this._appendActionLog(h, {
      id: n,
      label: r,
      costLabel: o || this._formatCostLabel(i, d)
    });
    let b = 0;
    if (i === "sa") {
      const Q = Math.max(0, y - Qt), K = Math.max(0, h.saSpentThisActivation - Qt), H = Math.max(0, Number(((I = c.state) == null ? void 0 : I.attacksThisActivation) ?? 0) || 0), D = Math.max(0, Number(h.attacksThisActivation ?? 0) || 0);
      for (let W = Q + 1; W <= K; W += 1) {
        const X = et({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: Da({
            actor: e,
            packet: {
              actionId: n,
              category: l,
              resource: i,
              amount: 1,
              source: "extraSA",
              extraSaIndex: W
            },
            runtime: u
          }),
          packet: {
            actionId: n,
            category: l,
            resource: i,
            amount: 1,
            source: "extraSA",
            extraSaIndex: W
          },
          options: { runtime: u, consumeUsage: !0 }
        });
        u.pendingMutations = (u.pendingMutations ?? []).concat(X.mutations), b += Math.max(0, Number(X.packet.amount ?? 0) || 0);
      }
      for (let W = H + 1; W <= D; W += 1) {
        if (W <= 1) continue;
        const X = et({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: Da({
            actor: e,
            packet: {
              actionId: n,
              category: l,
              resource: i,
              amount: 1,
              source: "attack"
            },
            runtime: u
          }),
          packet: {
            actionId: n,
            category: l,
            resource: i,
            amount: 1,
            source: "attack",
            attackIndex: W
          },
          options: { runtime: u, consumeUsage: !0 }
        });
        u.pendingMutations = (u.pendingMutations ?? []).concat(X.mutations), b += Math.max(0, Number(X.packet.amount ?? 0) || 0);
      }
      h.burnThisActivation = Math.max(0, Number(h.burnThisActivation ?? 0) + b);
    }
    return (P = u.pendingMutations) != null && P.length ? await Dt({
      actor: e,
      mutations: u.pendingMutations,
      runtime: {
        ...u,
        state: h
      }
    }) : await c.combatant.setFlag(kt, vt, h), b > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((V = (x = e.system) == null ? void 0 : x.burn) == null ? void 0 : V.value) ?? 0) + b) }), { ok: !0, snapshot: this.getSnapshot(e, { token: c.token }) };
  }
  static async reduceBurn(e, { token: t = null } = {}) {
    var o, l, c, u;
    const i = this.getSnapshot(e, { token: t });
    if (!i.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!i.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (ba(e, i) <= 0) return { ok: !1, reason: "Activation SA cap reached." };
    if (i.burn.value <= 0) return { ok: !1, reason: "Burn is already at 0." };
    const s = await this.spendResource(e, {
      token: i.token,
      resource: "sa",
      cost: 1,
      actionId: "reduceBurn",
      actionLabel: "Reduce Burn",
      actionCostLabel: "1 SA",
      actionCategory: Me.standard
    });
    if (!s.ok) return s;
    const n = Math.max(0, Number(((l = (o = e.system) == null ? void 0 : o.burn) == null ? void 0 : l.value) ?? 0) - 1), r = { "system.burn.value": n };
    return n === 0 && ((u = (c = e.system) == null ? void 0 : c.burn) != null && u.overloaded) && (r["system.burn.overloaded"] = !1), await e.update(r), { ok: !0, snapshot: this.getSnapshot(e, { token: i.token }) };
  }
  static async finalizeActivation(e, t) {
    var m, p, f, h, g, y, b, A;
    if (!game.user.isGM || !t || !e) return;
    const i = ((p = (m = e.combatants) == null ? void 0 : m.get) == null ? void 0 : p.call(m, t)) ?? null, s = (i == null ? void 0 : i.actor) ?? null;
    if (!i || !s) return;
    const n = i.getFlag(kt, vt), r = ya(n, this.getActivationIdentity(e, i)) ? _a(n, this.getActivationIdentity(e, i)) : _a(n), l = {
      burnDelta: Number(r.saSpentThisActivation ?? 0) <= Qt && Number(r.burnThisActivation ?? 0) <= 0 && Number(r.reactionBurnSinceLastActivation ?? 0) <= 0 ? -2 : 0,
      edgeAdjustments: []
    }, c = {
      combat: e,
      combatant: i,
      state: r,
      sceneId: ((f = e.scene) == null ? void 0 : f.id) ?? ((h = canvas == null ? void 0 : canvas.scene) == null ? void 0 : h.id) ?? ""
    }, u = et({
      actor: s,
      phase: "onEndOfActivation",
      facts: el({ actor: s, packet: l, runtime: c }),
      packet: l,
      options: { runtime: c, consumeUsage: !0 }
    });
    await Dt({ actor: s, mutations: u.mutations, runtime: c });
    const d = Number(u.packet.burnDelta ?? l.burnDelta) || 0;
    if (d) {
      const v = Math.max(0, Number(((y = (g = s.system) == null ? void 0 : g.burn) == null ? void 0 : y.value) ?? 0) + d), C = { "system.burn.value": v };
      v === 0 && ((A = (b = s.system) == null ? void 0 : b.burn) != null && A.overloaded) && (C["system.burn.overloaded"] = !1), await s.update(C);
    }
    for (const v of u.packet.edgeAdjustments ?? []) {
      const C = Number((v == null ? void 0 : v.amount) ?? 0) || 0;
      !C || !(v != null && v.poolKey) || (C > 0 ? await s.gainEdge(v.poolKey, C, { skipTraitHooks: !0, source: "endOfActivationTrait" }) : await s.spendEdge(v.poolKey, Math.abs(C), { skipTraitHooks: !0, source: "endOfActivationTrait" }));
    }
  }
  static async _onUpdateCombat(e, t) {
    if (Object.prototype.hasOwnProperty.call(t ?? {}, "turn") || Object.prototype.hasOwnProperty.call(t ?? {}, "round")) {
      const s = this._lastActivationByCombat.get(e == null ? void 0 : e.id) ?? null, n = typeof s == "string" ? s : (s == null ? void 0 : s.combatantId) ?? null, r = this.getActivationIdentity(e, e == null ? void 0 : e.combatant), o = s && typeof s == "object" ? !ya(s, r) : n && n !== r.combatantId;
      n && o && await this.finalizeActivation(e, n), await this.ensureCurrentCombatantState(), e != null && e.id && this._lastActivationByCombat.set(e.id, r);
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
    foundry.utils.hasProperty(t, `flags.${kt}.${vt}`) && this.renderOpenCharacterSheets((i = e == null ? void 0 : e.actor) == null ? void 0 : i.id);
  }
  static _onTargetToken(e, t, i) {
    var s;
    (e == null ? void 0 : e.id) === ((s = game.user) == null ? void 0 : s.id) && this.queueCharacterSheetRefresh();
  }
  static _onUpdateToken(e, t) {
    var n, r;
    if (!["x", "y", "elevation"].some(
      (o) => Object.prototype.hasOwnProperty.call(t ?? {}, o)
    ) || ((n = e == null ? void 0 : e.parent) == null ? void 0 : n.id) !== ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id)) return;
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
    const e = /* @__PURE__ */ new Set(), t = (n) => {
      var r;
      for (const o of Object.values((n == null ? void 0 : n.apps) ?? {}))
        ((r = o == null ? void 0 : o.actor) == null ? void 0 : r.type) === "character" && e.add(o);
    };
    for (const n of Array.from(game.actors ?? []))
      t(n);
    for (const n of Array.from(((i = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : i.placeables) ?? []))
      t(n == null ? void 0 : n.actor);
    for (const n of Object.values(ui.windows ?? {}))
      ((s = n == null ? void 0 : n.actor) == null ? void 0 : s.type) === "character" && e.add(n);
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
R(oe, "_targetRefreshTimeout", null), R(oe, "_pendingTokenPositions", /* @__PURE__ */ new Map()), R(oe, "_lastActivationByCombat", /* @__PURE__ */ new Map());
function Zs(a) {
  var i, s, n, r, o, l;
  const e = Math.max(0, Number(((n = (s = (i = a == null ? void 0 : a.system) == null ? void 0 : i.attributes) == null ? void 0 : s.reflexes) == null ? void 0 : n.value) ?? 0) || 0), t = Math.max(0, Number(((l = (o = (r = a == null ? void 0 : a.system) == null ? void 0 : r.attributes) == null ? void 0 : o.willpower) == null ? void 0 : l.value) ?? 0) || 0);
  return Qt + Math.floor((e + t) / 2);
}
function ba(a, e) {
  var t;
  return Math.max(0, Zs(a) - Math.max(0, Number(((t = e == null ? void 0 : e.state) == null ? void 0 : t.saSpentThisActivation) ?? 0) || 0));
}
const Oi = "lifeModuleCatalog", rs = Object.freeze([
  { moduleType: "faction", label: "Faction" },
  { moduleType: "childhood", label: "Childhood" },
  { moduleType: "higherEducation", label: "Higher Education" },
  { moduleType: "realLife", label: "Real Life" }
]), Qu = Object.freeze(
  Object.fromEntries(rs.map((a) => [a.moduleType, a.label]))
), Ju = new Set(rs.map((a) => a.moduleType)), Xu = /* @__PURE__ */ new Set(["skill", "edgePool"]), Hn = Object.freeze({
  grit: "Grit",
  chaos: "Chaos",
  insight: "Insight",
  rumor: "Rumor",
  legend: "Legend",
  credibility: "Credibility"
}), nl = Object.freeze(Object.keys(Hn)), Zu = Object.freeze({
  skill: "Skill",
  edgePool: "Edge Pool"
}), ed = Object.freeze(rd()), td = Object.freeze(od()), id = /* @__PURE__ */ new Set(["artillery", "gunnery", "piloting", "heavyWeapons"]), ad = /* @__PURE__ */ new Set([
  "artillery",
  "gunnery",
  "heavyWeapons",
  "meleeCombat",
  "piloting",
  "projectileWeapons",
  "firearms"
]), sd = Object.freeze(
  wt.map((a) => a.code).filter((a) => !ad.has(a))
), nd = Object.freeze(Ai([
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
        ...sd.map((a) => ({ type: "skill", value: a })),
        ...nl.map((a) => ({ type: "edgePool", value: a }))
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
    skillChoices: wt.map((a) => a.code).filter((a) => !id.has(a)),
    excludesAny: [
      "higher-education-military-enlistment",
      "higher-education-military-academy",
      "higher-education-family-training",
      "higher-education-officer-candidate-school"
    ]
  }
], { strict: !1 }));
function rd() {
  const a = /* @__PURE__ */ new Map();
  for (const e of wt) {
    const t = String(e.code ?? "").trim(), i = String(e.label ?? "").trim();
    t && (a.set(t.toLowerCase(), t), i && a.set(i.toLowerCase(), t));
  }
  return a;
}
function od() {
  const a = /* @__PURE__ */ new Map();
  for (const [e, t] of Object.entries(Hn))
    a.set(e.toLowerCase(), e), a.set(t.toLowerCase(), e), a.set(`${t.toLowerCase()} pool`, e);
  return a;
}
function ld(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid life module data.");
  return t.validationErrors = e, t;
}
function rl(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
function da(a) {
  return String(a ?? "").trim().toLowerCase().replace(/['\u2019]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function os(a) {
  const e = String(a ?? "").trim();
  return Ju.has(e) ? e : "";
}
function ls(a) {
  const e = String(a ?? "").trim();
  return e ? ed.get(e.toLowerCase()) ?? "" : "";
}
function cd(a) {
  const e = String(a ?? "").trim();
  return e ? td.get(e.toLowerCase()) ?? "" : "";
}
function ud(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const s = /* @__PURE__ */ new Set(), n = [];
  for (const r of rl(a)) {
    const o = ls(r);
    if (!o) {
      e && t.push(`${i}: unknown skill "${r}".`);
      continue;
    }
    s.has(o) || (s.add(o), n.push(o));
  }
  return n;
}
function gr(a) {
  const e = /* @__PURE__ */ new Set();
  return rl(a).map(da).filter((t) => !t || e.has(t) ? !1 : (e.add(t), !0));
}
function yr(a = [], e = /* @__PURE__ */ new Map()) {
  return a.map((t) => {
    var i;
    return ((i = e.get(t)) == null ? void 0 : i.label) ?? t;
  });
}
function xi(a = {}) {
  return `${a.type}:${a.value}`;
}
function dd(a) {
  var e;
  return ((e = ct(a)) == null ? void 0 : e.label) ?? a;
}
function ol(a) {
  return Hn[a] ?? a;
}
function md(a) {
  return Zu[a] ?? a;
}
function pd(a = {}, { includeTypePrefix: e = !1 } = {}) {
  const t = String((a == null ? void 0 : a.type) ?? "").trim(), i = String((a == null ? void 0 : a.value) ?? "").trim();
  if (!t || !i) return "";
  const s = t === "skill" ? dd(i) : `${ol(i)} Pool`;
  return e ? `${md(t)}: ${s}` : s;
}
function sa(a = {}, { includeBonusText: e = !1, includeTypePrefix: t = !1 } = {}) {
  const i = pd(a, { includeTypePrefix: t });
  return i ? e ? a.type === "skill" ? `+1 ${i} rolls` : `+1 ${i}` : i : "";
}
function fd(a) {
  const e = String(a ?? "").trim(), t = e.indexOf(":");
  return t < 0 ? null : {
    type: e.slice(0, t).trim(),
    value: e.slice(t + 1).trim()
  };
}
function hd(a, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: s = "Bonus" } = {}) {
  const n = typeof a == "string" ? fd(a) : a, r = String((n == null ? void 0 : n.type) ?? "").trim(), o = String((n == null ? void 0 : n.value) ?? "").trim();
  if (!Xu.has(r))
    return e && t.push(`${i} ${s}: unknown bonus type "${r || a}".`), null;
  const l = r === "skill" ? ls(o) : cd(o);
  return l ? {
    type: r,
    value: l
  } : (e && t.push(`${i} ${s}: unknown ${r === "skill" ? "skill" : "edge pool"} "${o}".`), null);
}
function en(a, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: s = "Bonus" } = {}) {
  const n = /* @__PURE__ */ new Set(), r = [], o = Array.isArray(a) ? a : [];
  for (const l of o) {
    const c = hd(l, { strict: e, errors: t, prefix: i, grantLabel: s });
    if (!c) continue;
    const u = xi(c);
    n.has(u) || (n.add(u), r.push(c));
  }
  return r;
}
function ll(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const s = ud(a, { strict: e, errors: t, prefix: i });
  return s.length ? [{
    id: "skill",
    label: "",
    choices: s.map((n) => ({ type: "skill", value: n }))
  }] : [];
}
function gd(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const s = String(a ?? "").trim();
  return s ? s.split(";").map((r) => r.trim()).filter(Boolean).map((r, o) => {
    const l = `Bonus ${o + 1}`, c = en(
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
function cl(a, e = "grant") {
  return da(a) || e;
}
function yd(a, e, { strict: t = !1, errors: i = [], prefix: s = "Entry" } = {}) {
  const n = `grant-${e + 1}`, r = `Bonus ${e + 1}`;
  if (typeof a == "string") {
    const u = en(
      a.split("|").map((d) => d.trim()).filter(Boolean),
      { strict: t, errors: i, prefix: s, grantLabel: r }
    );
    return u.length ? { id: n, label: "", choices: u } : null;
  }
  const o = cl(a == null ? void 0 : a.id, n), l = String((a == null ? void 0 : a.label) ?? "").trim(), c = en(a == null ? void 0 : a.choices, { strict: t, errors: i, prefix: s, grantLabel: r });
  return c.length ? { id: o, label: l, choices: c } : (t && i.push(`${s} ${r}: define at least one bonus choice.`), null);
}
function bd(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  if (Array.isArray(a)) {
    if (a.every((n) => typeof n == "string" && !String(n).includes(":")))
      return ll(a, { strict: e, errors: t, prefix: i });
    const s = /* @__PURE__ */ new Set();
    return a.map((n, r) => yd(n, r, { strict: e, errors: t, prefix: i })).filter((n) => n ? s.has(n.id) ? (e && t.push(`${i}: duplicate bonus id "${n.id}".`), !1) : (s.add(n.id), !0) : !1);
  }
  return typeof a == "string" ? gd(a, { strict: e, errors: t, prefix: i }) : [];
}
function Sd(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => (Array.isArray(e == null ? void 0 : e.choices) ? e.choices : []).map((i) => `${i.type}:${i.value}`).join("|")).filter(Boolean).join("; ");
}
function qn() {
  return foundry.utils.deepClone(nd);
}
function Bi(a) {
  return Qu[a] ?? (String(a ?? "").trim() || "Life Module");
}
function ul() {
  return rs.map((a) => ({
    value: a.moduleType,
    label: a.label
  }));
}
function Ai(a = [], { strict: e = !1 } = {}) {
  const t = Array.isArray(a) ? a : [], i = [], s = /* @__PURE__ */ new Set(), n = t.map((o, l) => {
    const c = `Entry ${l + 1}`, u = String((o == null ? void 0 : o.label) ?? "").trim(), d = da((o == null ? void 0 : o.id) ?? u), m = os(o == null ? void 0 : o.moduleType), p = (o == null ? void 0 : o.grants) != null ? bd(o.grants, { strict: e, errors: i, prefix: c }) : ll(o == null ? void 0 : o.skillChoices, { strict: e, errors: i, prefix: c }), f = gr(o == null ? void 0 : o.requiresAny), h = gr(o == null ? void 0 : o.excludesAny);
    return !d && e && i.push(`${c}: id cannot be blank.`), !u && e && i.push(`${c}: label cannot be blank.`), !m && e && i.push(`${c}: choose a valid module type.`), !p.length && e && i.push(`${c}: choose at least one bonus.`), d && s.has(d) && e && i.push(`${c}: duplicate id "${d}".`), d && s.add(d), {
      id: d,
      label: u,
      moduleType: m,
      grants: p,
      requiresAny: f,
      excludesAny: h
    };
  }), r = new Map(n.map((o) => [o.id, o]));
  for (const o of n) {
    for (const l of o.requiresAny)
      l === o.id && e && i.push(`${o.label || o.id}: cannot require itself.`), !r.has(l) && e && i.push(`${o.label || o.id}: unknown requirement "${l}".`);
    for (const l of o.excludesAny)
      l === o.id && e && i.push(`${o.label || o.id}: cannot exclude itself.`), !r.has(l) && e && i.push(`${o.label || o.id}: unknown exclusion "${l}".`);
  }
  if (e && i.length) throw ld(i);
  return n.filter((o) => o.id && o.label && o.moduleType && o.grants.length).map((o) => ({
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
function dl(a = []) {
  const e = new Map(qn().map((n) => [n.id, n])), t = Ai(a, { strict: !1 }), i = [...t], s = new Set(t.map((n) => n.id));
  for (const [n, r] of e.entries())
    s.has(n) || i.push(foundry.utils.deepClone(r));
  return i;
}
async function Ad() {
  var a, e, t;
  try {
    if (!((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${w}.${Oi}`))) return;
    const i = game.settings.get(w, Oi), s = dl(i);
    JSON.stringify(i) !== JSON.stringify(s) && await game.settings.set(w, Oi, s);
  } catch {
  }
}
function wd() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${w}.${Oi}`))
      return dl(game.settings.get(w, Oi));
  } catch {
  }
  return qn();
}
function cs() {
  return Ai(wd(), { strict: !1 });
}
function ai(a) {
  const e = da(a);
  return e ? cs().find((t) => t.id === e) ?? null : null;
}
function Gn(a) {
  const e = os(a);
  return cs().filter((t) => t.moduleType === e);
}
function ml(a) {
  return !a || typeof a != "object" || Array.isArray(a) ? {} : Object.fromEntries(
    Object.entries(a).map(([e, t]) => [cl(e, ""), String(t ?? "").trim()]).filter(([e]) => !!e)
  );
}
function pl(a, e = "", { legacySelectedSkill: t = "" } = {}) {
  const i = new Set((Array.isArray(a == null ? void 0 : a.choices) ? a.choices : []).map(xi)), s = String(e ?? "").trim();
  if (i.has(s)) return s;
  if (t) {
    const n = ls(t), r = n ? `skill:${n}` : "";
    if (r && i.has(r)) return r;
  }
  return i.size === 1 ? Array.from(i)[0] : "";
}
function fl(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(a == null ? void 0 : a.grants) ? a.grants : [], s = ml(e);
  return Object.fromEntries(
    i.map((n) => [
      n.id,
      pl(n, s[n.id], { legacySelectedSkill: t })
    ])
  );
}
function us(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(a == null ? void 0 : a.grants) ? a.grants : [], s = fl(a, e, { legacySelectedSkill: t });
  return i.map((n, r) => {
    const o = pl(n, s[n.id], { legacySelectedSkill: t }), l = (Array.isArray(n.choices) ? n.choices : []).find((c) => xi(c) === o) ?? null;
    return {
      id: n.id,
      index: r,
      label: String((n == null ? void 0 : n.label) ?? "").trim() || (i.length > 1 ? `Bonus ${r + 1}` : "Granted Bonus"),
      selectedKey: o,
      choice: l,
      isResolved: !!l,
      requiresSelection: (Array.isArray(n == null ? void 0 : n.choices) ? n.choices : []).length > 1
    };
  });
}
function Td(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  var i;
  return ((i = us(a, e, { legacySelectedSkill: t }).map((s) => s.choice).find((s) => (s == null ? void 0 : s.type) === "skill")) == null ? void 0 : i.value) ?? "";
}
function na(a = {}) {
  const e = foundry.utils.deepClone(a ?? {}), t = da(e.catalogId), i = t ? ai(t) : null, s = os(e.moduleType || (i == null ? void 0 : i.moduleType)), n = i ? fl(i, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }) : ml(e.selectedGrants);
  return e.moduleType = s, e.catalogId = t, e.selectedGrants = n, e.selectedSkill = i ? Td(i, n, { legacySelectedSkill: e.selectedSkill }) : ls(e.selectedSkill), e;
}
function hl(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  return us(a, e, { legacySelectedSkill: t }).map((i) => {
    var l, c;
    const s = Array.isArray((c = (l = a == null ? void 0 : a.grants) == null ? void 0 : l[i.index]) == null ? void 0 : c.choices) ? a.grants[i.index].choices : [], n = new Set(s.map((u) => u.type)).size > 1, r = s.map((u) => ({
      value: xi(u),
      label: sa(u, { includeTypePrefix: n }),
      selected: xi(u) === i.selectedKey
    })), o = r.length === 1 ? {
      value: r[0].value,
      label: r[0].label,
      displayLabel: sa(s[0], { includeBonusText: !0 })
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
function kd(a, e) {
  return a.isDuplicate ? `Duplicate ${Bi(a.moduleType)} slot item.` : a.catalog ? a.unresolvedGrantCount > 0 ? "Choose valid bonus options." : a.excludedBy.length ? `Blocked by ${yr(a.excludedBy, e).join(", ")}.` : a.requiresAny.length && !a.matchedRequirementIds.length ? `Requires ${yr(a.requiresAny, e).join(" or ")}.` : "" : "Catalog entry is missing or unlinked.";
}
function vd(a, e = [], t = {}) {
  var s, n, r;
  if (!a || !Array.isArray(e) || !e.length) return [];
  const i = Math.max(0, Number(((r = (n = (s = a.system) == null ? void 0 : s.attributes) == null ? void 0 : n.edge) == null ? void 0 : r.value) ?? 0));
  return e.filter((o) => (o == null ? void 0 : o.type) === "edgePool").map((o) => {
    var f, h, g, y;
    const l = String(o.value ?? "").trim(), c = ol(l), u = Math.max(0, Number(((y = (g = (h = (f = a.system) == null ? void 0 : f.counters) == null ? void 0 : h.edgePools) == null ? void 0 : g[l]) == null ? void 0 : y.rating) ?? 0)), d = Math.max(0, Number((t == null ? void 0 : t[l]) ?? 0)), m = Math.max(0, u + d - i);
    return m ? `${c} Pool bonus loses ${m} ${m === 1 ? "point" : "points"} to the Edge cap.` : "";
  }).filter(Boolean);
}
function si(a) {
  var m;
  const e = cs(), t = new Map(e.map((p) => [p.id, p])), i = Array.from((a == null ? void 0 : a.items) ?? []).filter((p) => p.type === S.itemType.lifeModule), s = /* @__PURE__ */ new Map();
  for (const p of i) {
    const f = os((m = p.system) == null ? void 0 : m.moduleType);
    !f || s.has(f) || s.set(f, p.id);
  }
  const n = i.map((p) => {
    var C;
    const f = na(p.system ?? {}), h = t.get(f.catalogId) ?? null, g = f.moduleType || (h == null ? void 0 : h.moduleType) || "", y = h ? us(h, f.selectedGrants, { legacySelectedSkill: f.selectedSkill }) : [], b = y.map((I) => I.choice).filter(Boolean), A = ((C = b.find((I) => I.type === "skill")) == null ? void 0 : C.value) ?? "", v = A ? ct(A) : null;
    return {
      item: p,
      itemId: p.id,
      moduleType: g,
      catalogId: (h == null ? void 0 : h.id) ?? f.catalogId,
      catalog: h,
      label: (h == null ? void 0 : h.label) ?? p.name,
      selectedGrants: f.selectedGrants,
      resolvedGrants: y,
      unresolvedGrantCount: y.filter((I) => !I.isResolved).length,
      selectedChoices: b,
      selectedChoiceLabels: b.map((I) => sa(I, { includeBonusText: !0 })),
      selectedSkill: A,
      selectedSkillLabel: (v == null ? void 0 : v.label) ?? A,
      requiresAny: [...(h == null ? void 0 : h.requiresAny) ?? []],
      excludesAny: [...(h == null ? void 0 : h.excludesAny) ?? []],
      matchedRequirementIds: [],
      excludedBy: [],
      isDuplicate: g ? s.get(g) !== p.id : !1,
      isActive: !1,
      inactiveReason: "",
      bonus: 0
    };
  }), r = /* @__PURE__ */ new Map();
  for (const p of n) {
    if (!p.catalogId) continue;
    const f = r.get(p.catalogId) ?? [];
    f.push(p), r.set(p.catalogId, f);
  }
  for (const p of n)
    p.excludedBy = p.excludesAny.filter((f) => (r.get(f) ?? []).length > 0);
  let o = !0;
  for (; o; ) {
    o = !1;
    for (const p of n) {
      const f = p.requiresAny.filter(
        (g) => (r.get(g) ?? []).some((y) => y.isActive)
      ), h = !p.isDuplicate && !!p.catalog && p.unresolvedGrantCount === 0 && p.excludedBy.length === 0 && (p.requiresAny.length === 0 || f.length > 0);
      p.isActive !== h && (p.isActive = h, o = !0), p.matchedRequirementIds.join("|") !== f.join("|") && (p.matchedRequirementIds = f);
    }
  }
  const l = Object.fromEntries(wt.map((p) => [p.code, 0])), c = Object.fromEntries(nl.map((p) => [p, 0])), u = /* @__PURE__ */ new Map();
  for (const p of n) {
    const f = p.isActive ? p.selectedChoices : [], h = f.filter((y) => y.type === "skill"), g = f.filter((y) => y.type === "edgePool");
    p.bonus = h.length;
    for (const y of h)
      l[y.value] = Number(l[y.value] ?? 0) + 1;
    for (const y of g)
      c[y.value] = Number(c[y.value] ?? 0) + 1;
    p.inactiveReason = p.isActive ? "" : kd(p, t), u.set(p.itemId, p);
  }
  for (const p of n)
    p.warningLabels = p.isActive ? vd(a, p.selectedChoices, c) : [];
  const d = rs.map((p) => {
    const f = n.find((h) => h.moduleType === p.moduleType && !h.isDuplicate) ?? null;
    return {
      moduleType: p.moduleType,
      label: p.label,
      availableEntries: e.filter((h) => h.moduleType === p.moduleType),
      state: f
    };
  });
  return {
    catalog: e,
    states: n,
    stateByItemId: u,
    slotStates: d,
    bonusBySkill: l,
    bonusByEdgePool: c
  };
}
function Md(a = {}) {
  var t, i, s;
  const e = String((a == null ? void 0 : a.intent) ?? "").trim();
  return e === "skill" ? String(((t = a == null ? void 0 : a.data) == null ? void 0 : t.skillKey) ?? "").trim() : e === "attack" ? String(((s = (i = a == null ? void 0 : a.attack) == null ? void 0 : i.skill) == null ? void 0 : s.code) ?? "").trim() : "";
}
function Cd({ actor: a, resolved: e } = {}) {
  const t = Md(e);
  return !a || !t ? [] : si(a).states.flatMap(
    (i) => i.isActive ? i.selectedChoices.filter((s) => s.type === "skill" && s.value === t).map((s) => ({
      id: `life-module:${i.itemId}:${xi(s)}`,
      label: i.label,
      value: 1,
      source: "Life Module",
      tooltip: `${i.label}: +1 to ${sa(s)} rolls`
    })) : []
  );
}
const br = Object.freeze({
  weapon: S.itemType.personalWeapon,
  shadowamp: S.itemType.assetModule
}), gl = Object.freeze({
  contact: "systems/mwd/img/default/mystery-man.svg",
  gear: "systems/mwd/img/default/Default_Gear.svg",
  quality: "systems/mwd/img/default/card-joker.svg",
  assetModule: "systems/mwd/img/default/upgrade.svg",
  skill: "systems/mwd/img/default/Default_Skill.svg",
  lifeModule: "systems/mwd/img/default/book.svg",
  mechWeapon: "systems/mwd/img/default/Default_Weapon.svg",
  personalWeapon: "systems/mwd/img/colt-m1911.svg",
  armor: "systems/mwd/img/default/Default_Armor.svg"
}), yi = Object.freeze(["close", "near", "far", "extreme"]), Sr = Object.freeze({
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
});
function ji(a) {
  return Wi(a);
}
function Ar(a = {}) {
  const e = po({
    traits: a.traits,
    keywords: a.keywords,
    report: In(),
    path: "system.traits"
  });
  return {
    traits: e.traits,
    keywords: e.keywords
  };
}
function yl(a) {
  return a === "long" ? "extreme" : a === "short" ? "close" : a === "medium" ? "near" : yi.includes(a) ? a : "near";
}
function Ci(a) {
  return {
    max: yl((a == null ? void 0 : a.max) ?? "near"),
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function Ms(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function wr(a, e = 1) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function Tr(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function kr(a) {
  return String(a ?? "").trim();
}
function vr(a) {
  return (Array.isArray(a) ? a : typeof a == "string" ? a.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function Ed(a) {
  const e = yi.indexOf(a);
  return e >= 0 ? e : yi.indexOf("near");
}
function Pd(a = Ci({})) {
  const e = ["near", "close", "far", "extreme"], t = Ed(a.max);
  return e.find((i) => yi.indexOf(i) <= t) ?? "close";
}
function Nd(a) {
  const e = yl(a == null ? void 0 : a.max), t = yi.indexOf(e);
  return yi.map((i, s) => ({
    key: i,
    allowed: t >= 0 ? s <= t : s === 0,
    value: (a == null ? void 0 : a[i]) ?? void 0,
    labelkey: ce.getFromList(ce.getEnums().ranges, i)
  }));
}
function Rd(a, e, t, i) {
  let s = Number(e);
  if (t)
    if (i !== void 0)
      s += Math.ceil(Number(i) / 2);
    else
      return console.warn("Weapon not attached to an actor"), we.item.personalWeapon.weaponWithoutActor;
  return s;
}
function Id(a, e, t) {
  let i = "";
  return t && we.attributes[t] && (i += we.attributes[t].substring(0, 3).toUpperCase() + "/2 + "), i += String(e), i;
}
function Dd(a, e) {
  return _.useArmor(a) ? e ? "noArmor" : "withArmor" : "";
}
function Mr(a) {
  const e = game.system.mwd.skills.get(a);
  if (!e)
    return {
      img: gl.skill,
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
function Cs(a = {}) {
  const e = na(a), t = ai(e.catalogId);
  return {
    system: e,
    ...t ? { name: t.label } : {}
  };
}
function Od(a) {
  const e = String(a ?? "").trim();
  return !!(!e || e.startsWith("icons/svg/") || e === "icons/mystery-man.svg");
}
var oa, ut, tn, bl, $a;
const Fe = class Fe extends Item {
  static init() {
    z(this, oa) || (De(this, oa, !0), Hooks.on("createItem", (e, t, i) => {
      var s, n;
      Promise.resolve((s = e.onCreateItem) == null ? void 0 : s.call(e, t, i)).catch((r) => {
        console.error(`${fe}Item create hook failed`, r);
      }), M(n = Fe, ut, tn).call(n, e);
    }), Hooks.on("updateItem", (e) => {
      var t;
      M(t = Fe, ut, tn).call(t, e);
    }), Hooks.on("deleteItem", (e) => {
      var t;
      M(t = Fe, ut, bl).call(t, e);
    }), Hooks.on("createActiveEffect", (e) => {
      var t;
      M(t = Fe, ut, $a).call(t, e);
    }), Hooks.on("updateActiveEffect", (e) => {
      var t;
      M(t = Fe, ut, $a).call(t, e);
    }), Hooks.on("deleteActiveEffect", (e) => {
      var t;
      M(t = Fe, ut, $a).call(t, e);
    }));
  }
  static canonicalType(e) {
    return br[e] ?? e;
  }
  static defaultIconForType(e) {
    return gl[this.canonicalType(e)];
  }
  get canonicalType() {
    return this.constructor.canonicalType(this.type);
  }
  async onCreateItem(e, t) {
  }
  async _preCreate(e, t, i) {
    super._preCreate && await super._preCreate(e, t, i);
    const s = (e == null ? void 0 : e.type) ?? this.type, n = this.constructor.canonicalType(s), r = {};
    if (s !== n && br[s] && (r.type = n), Od((e == null ? void 0 : e.img) ?? this.img)) {
      const o = this.constructor.defaultIconForType(n);
      o && (r.img = o);
    }
    if (n === S.itemType.lifeModule && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (r.name = "MWD.itemType.singular.lifeModule"), n === S.itemType.lifeModule) {
      const o = Cs((e == null ? void 0 : e.system) ?? this.system ?? {});
      r.system = o.system, o.name && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (r.name = o.name);
    }
    Object.keys(r).length && this.updateSource(r);
  }
  async _preUpdate(e, t, i) {
    var l, c;
    super._preUpdate && await super._preUpdate(e, t, i);
    const s = e != null && e.system ? foundry.utils.mergeObject(foundry.utils.deepClone(this.system ?? {}), foundry.utils.deepClone(e.system), { inplace: !1 }) : null;
    if (s && this.isPersonalWeapon()) {
      e.system ?? (e.system = {});
      const u = s.ammo, d = Ar(s);
      e.system.standardTraits = [], e.system.payloads = Pt(s.payloads, { legacyAmmo: u, category: s.category }), e.system.consumptionSources = qi(s.consumptionSources, { legacyAmmo: u }), e.system.selectedPayloadId = Mi(
        s.selectedPayloadId,
        e.system.payloads,
        { legacyAmmo: u, category: s.category }
      ), e.system.traits = d.traits, e.system.keywords = d.keywords, e.system.resolution = Pa(s.resolution, "standard"), e.system.fireModes = Na(s.fireModes), e.system.attackRatingBand = Ms(s.attackRatingBand), e.system.range = Ci(s.range), e.system.damageType = bt(s.damageType), e.system["-=ammo"] = null, delete e.system.ammo;
    }
    if (s && this.isArmor() && (e.system ?? (e.system = {}), e.system.mitigationByType = yt(s.mitigationByType ?? s.mitigation), e.system.tags = Ea(s.tags), e.system.traits = ji(s.traits), e.system.standardTraits = Et(s.standardTraits), e.system.traitState = Ss({
      standardTraits: e.system.standardTraits,
      traits: e.system.traits,
      traitState: s.traitState
    }).traitState), s && this.isLifeModule()) {
      const u = Cs(s);
      e.system ?? (e.system = {}), foundry.utils.mergeObject(e.system, u.system, { inplace: !0, overwrite: !0 }), u.name && (e.name = u.name);
      return;
    }
    if (s && this.isQuality()) {
      e.system ?? (e.system = {});
      const u = ot(s);
      foundry.utils.mergeObject(e.system, u, { inplace: !0, overwrite: !0 });
      return;
    }
    if (s && this.isGear()) {
      e.system ?? (e.system = {}), e.system.quantity = wr(s.quantity, 1), e.system.rating = Tr(s.rating, 0), e.system.category = kr(s.category), e.system.tags = vr(s.tags);
      return;
    }
    if (!this.isSkill()) return;
    const n = (l = e == null ? void 0 : e.system) == null ? void 0 : l.code;
    if (n === void 0) return;
    const r = this.system.code;
    if (n === r) return;
    const o = Mr(n);
    o && ((c = o == null ? void 0 : o.system) == null || delete c.code, foundry.utils.mergeObject(e, o, { inplace: !0 }));
  }
  prepareBaseData() {
    super.prepareBaseData();
    const e = this.canonicalType;
    e === S.itemType.personalWeapon ? this._preparePersonalWeaponBaseData() : e === S.itemType.armor ? this._prepareArmorBaseData() : e === S.itemType.lifeModule ? this._prepareLifeModuleBaseData() : e === S.itemType.quality ? this._prepareQualityBaseData() : e === S.itemType.gear && this._prepareGearBaseData();
  }
  _preparePersonalWeaponBaseData() {
    const e = this.system ?? {}, t = e.ammo;
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = bt(e.damageType), e.attackRatingBand = Ms(e.attackRatingBand), e.range = Ci(e.range);
    const i = Ar(e);
    e.standardTraits = [], e.traits = i.traits, e.keywords = i.keywords, e.resolution = Pa(e.resolution, "standard"), e.fireModes = Na(e.fireModes), e.payloads = Pt(e.payloads, { legacyAmmo: t, category: e.category }), e.consumptionSources = qi(e.consumptionSources, { legacyAmmo: t }), e.selectedPayloadId = Mi(e.selectedPayloadId, e.payloads, { legacyAmmo: t, category: e.category }), delete e.ammo, e.notes = String(e.notes ?? "").trim();
  }
  _prepareArmorBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.rating = Math.max(0, Number(e.rating ?? 0)), e.defenseBonus = Number(e.defenseBonus ?? 0) || 0, e.mitigationByType = yt(e.mitigationByType ?? e.mitigation), delete e.mitigation, e.durability ?? (e.durability = {}), e.durability.max = Math.max(0, Number(e.durability.max ?? e.rating ?? 0)), e.durability.current = Math.min(
      e.durability.max,
      Math.max(0, Number(e.durability.current ?? e.durability.max ?? e.rating ?? 0))
    ), e.standardTraits = Et(e.standardTraits), e.tags = Ea(e.tags), e.traits = ji(e.traits), e.traitState = Ss({
      standardTraits: e.standardTraits,
      traits: e.traits,
      traitState: e.traitState
    }).traitState, e.notes = String(e.notes ?? "").trim();
  }
  _prepareLifeModuleBaseData() {
    const e = Cs(this.system ?? {});
    foundry.utils.mergeObject(this.system, e.system, { inplace: !0, overwrite: !0 });
  }
  _prepareQualityBaseData() {
    const e = ot(this.system ?? {});
    foundry.utils.mergeObject(this.system, e, { inplace: !0, overwrite: !0 });
  }
  _prepareGearBaseData() {
    const e = this.system ?? {};
    e.quantity = wr(e.quantity, 1), e.rating = Tr(e.rating, 0), e.category = kr(e.category), e.tags = vr(e.tags);
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
    return [S.itemType.mechWeapon, S.itemType.personalWeapon].includes(this.canonicalType);
  }
  isPersonalWeapon() {
    return this.canonicalType === S.itemType.personalWeapon;
  }
  isArmor() {
    return this.canonicalType === S.itemType.armor;
  }
  isLifeModule() {
    return this.canonicalType === S.itemType.lifeModule;
  }
  isQuality() {
    return this.canonicalType === S.itemType.quality;
  }
  isGear() {
    return this.canonicalType === S.itemType.gear;
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
      var s, n;
      const i = (n = (s = t.flags) == null ? void 0 : s[w]) == null ? void 0 : n[Fe.EQUIPPED_EFFECT_FLAG];
      return (i == null ? void 0 : i.sourceItemId) === this.id;
    }) : [];
  }
  async removeSyncedActorEffects({ actor: e = this.actor } = {}) {
    const t = this.getSyncedActorEffects({ actor: e });
    return !t.length || !e ? [] : e.deleteEmbeddedDocuments("ActiveEffect", t.map((i) => i.id));
  }
  async syncEquippedActorEffects({ actor: e = this.actor } = {}) {
    var m, p, f, h;
    if (!e || !this.supportsEquippedEffectSync()) return { created: [], updated: [], deleted: [] };
    const t = this.getSyncedActorEffects({ actor: e }), i = Array.from(((m = this.effects) == null ? void 0 : m.contents) ?? []);
    if (!this.shouldApplyEquippedEffects()) {
      if (!t.length) return { created: [], updated: [], deleted: [] };
      const g = await e.deleteEmbeddedDocuments("ActiveEffect", t.map((y) => y.id));
      return { created: [], updated: [], deleted: g };
    }
    const s = /* @__PURE__ */ new Map();
    for (const g of t) {
      const y = (h = (f = (p = g.flags) == null ? void 0 : p[w]) == null ? void 0 : f[Fe.EQUIPPED_EFFECT_FLAG]) == null ? void 0 : h.sourceEffectId;
      if (!y) continue;
      const b = s.get(y) ?? [];
      b.push(g), s.set(y, b);
    }
    const n = [], r = [], o = [], l = new Set(i.map((g) => g.id));
    for (const [g, y] of s.entries()) {
      if (!l.has(g)) {
        o.push(...y.map((b) => b.id));
        continue;
      }
      y.length > 1 && o.push(...y.slice(1).map((b) => b.id));
    }
    for (const g of i) {
      const b = (s.get(g.id) ?? [])[0] ?? null, A = this._prepareSyncedActorEffectData(g);
      b ? r.push({ _id: b.id, ...A }) : n.push(A);
    }
    const c = o.length ? await e.deleteEmbeddedDocuments("ActiveEffect", o) : [], u = r.length ? await e.updateEmbeddedDocuments("ActiveEffect", r) : [];
    return { created: n.length ? await e.createEmbeddedDocuments("ActiveEffect", n) : [], updated: u, deleted: c };
  }
  _prepareSyncedActorEffectData(e) {
    const t = e.toObject();
    delete t._id;
    const i = String(e.name ?? "Effect").trim() || "Effect", s = String(this.name ?? "Item").trim() || "Item", n = i.startsWith(s) ? i : `${s}: ${i}`;
    return t.name = n, t.transfer = !1, t.origin = e.uuid ?? this.uuid ?? t.origin ?? null, t.flags = foundry.utils.mergeObject(t.flags ?? {}, {
      [w]: {
        [Fe.EQUIPPED_EFFECT_FLAG]: {
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
    return this.canonicalType === S.itemType.skill;
  }
  async rollAttribute(e) {
    this.parent && await ht.itemAttributeRoll(this, e);
  }
  async switchMonitorCheck(e, t, i, s = void 0) {
    await _.switchMonitorCheck(this.parent, e, t, i, s, this);
  }
  async setCounter(e, t) {
    await _.setCounter(this, e, t);
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
    ee.reindexIds(t), await this.update({ "system.modifiers": t });
  }
  async _mutateQualitySystem(e = (t) => t) {
    const t = e(foundry.utils.deepClone(ot(this.system ?? {})));
    await this.update({ system: ot(t) });
  }
  async createQualityPrerequisite(e = {}) {
    await this._mutateQualitySystem((t) => (t.prerequisites = Rt(t.prerequisites).concat([{
      id: e.id ?? foundry.utils.randomID(),
      fact: e.fact ?? "",
      comparator: e.comparator ?? "eq",
      value: e.value ?? ""
    }]), t));
  }
  async deleteQualityPrerequisite(e) {
    await this._mutateQualitySystem((t) => (t.prerequisites = Rt(t.prerequisites).filter((i) => i.id !== e), t));
  }
  async updateQualityPrerequisite(e, t, i) {
    await this._mutateQualitySystem((s) => (s.prerequisites = Rt(s.prerequisites).map((n) => (n.id !== e || (t === "fact" && (n.fact = i), t === "comparator" && (n.comparator = i), t === "value" && (n.value = i)), n)), s));
  }
  async createQualityEffect(e = {}) {
    await this._mutateQualitySystem((t) => (t.effects = ci(t.effects).concat([{
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
      conditions: Rt(e.conditions ?? []),
      limit: ii(e.limit ?? {})
    }]), t));
  }
  async deleteQualityEffect(e) {
    await this._mutateQualitySystem((t) => (t.effects = ci(t.effects).filter((i) => i.id !== e), t));
  }
  async updateQualityEffect(e, t, i) {
    await this._mutateQualitySystem((s) => (s.effects = ci(s.effects).map((n) => (n.id !== e || (t === "type" && (n.type = i), t === "phase" && (n.phase = i), t === "selector" && (n.selector = i), t === "skillKeys" && (n.skillKeys = Array.isArray(i) ? i : []), t === "label" && (n.label = i), t === "value" && (n.value = Number(i ?? 0) || 0), t === "min" && (n.min = i === "" ? null : Number(i ?? 0)), t === "max" && (n.max = i === "" ? null : Number(i ?? 0)), t === "pool" && (n.pool = i), t === "operation" && (n.operation = i), t === "limit.perActivation" && (n.limit = ii({ ...n.limit ?? {}, perActivation: i })), t === "limit.perRound" && (n.limit = ii({ ...n.limit ?? {}, perRound: i })), t === "limit.perScene" && (n.limit = ii({ ...n.limit ?? {}, perScene: i }))), n)), s));
  }
  async createQualityEffectCondition(e, t = {}) {
    await this._mutateQualitySystem((i) => (i.effects = ci(i.effects).map((s) => (s.id !== e || (s.conditions = Rt(s.conditions).concat([{
      id: t.id ?? foundry.utils.randomID(),
      fact: t.fact ?? "",
      comparator: t.comparator ?? "eq",
      value: t.value ?? ""
    }])), s)), i));
  }
  async deleteQualityEffectCondition(e, t) {
    await this._mutateQualitySystem((i) => (i.effects = ci(i.effects).map((s) => (s.id !== e || (s.conditions = Rt(s.conditions).filter((n) => n.id !== t)), s)), i));
  }
  async updateQualityEffectCondition(e, t, i, s) {
    await this._mutateQualitySystem((n) => (n.effects = ci(n.effects).map((r) => (r.id !== e || (r.conditions = Rt(r.conditions).map((o) => (o.id !== t || (i === "fact" && (o.fact = s), i === "comparator" && (o.comparator = s), i === "value" && (o.value = s)), o))), r)), n));
  }
  async _mutateWeaponStandardTraits(e = (t) => t) {
    var i;
    const t = e(foundry.utils.deepClone(di((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": di(t) });
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
    await this._mutateWeaponStandardTraits((s) => s.map((n) => (n.id !== e || (t === "key" && (n.key = i), t === "rating" && (n.rating = Math.max(0, Number(i ?? 0) || 0))), n)));
  }
  async _mutateArmorStandardTraits(e = (t) => t) {
    var i;
    const t = e(foundry.utils.deepClone(Et((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": Et(t) });
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
    await this._mutateArmorStandardTraits((s) => s.map((n) => (n.id !== e || (t === "key" && (n.key = i), t === "rating" && (n.rating = Math.max(0, Number(i ?? 0) || 0))), n)));
  }
  async _mutatePayloads(e = (t) => t) {
    var s, n, r, o, l, c, u;
    const t = e(foundry.utils.deepClone(
      Pt((s = this.system) == null ? void 0 : s.payloads, {
        legacyAmmo: (n = this.system) == null ? void 0 : n.ammo,
        category: ((r = this.system) == null ? void 0 : r.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
      })
    )).map(Je), i = Mi((l = this.system) == null ? void 0 : l.selectedPayloadId, t, {
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
      qi((i = this.system) == null ? void 0 : i.consumptionSources, { legacyAmmo: (s = this.system) == null ? void 0 : s.ammo })
    )).map(It);
    await this.update({
      "system.consumptionSources": t,
      "system.-=ammo": null
    });
  }
  async updatePayloadField(e, t, i) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((s) => s.map((n) => n.id !== e ? n : (foundry.utils.setProperty(n, t, i), Je(n))));
  }
  async createPayload(e = {}) {
    await this._mutatePayloads((t) => t.concat([Je({
      id: e.id ?? foundry.utils.randomID(),
      label: e.label ?? e.name ?? "Payload",
      compatibleWith: e.compatibleWith ?? [],
      modifies: e.modifies ?? {},
      traits: e.traits ?? [],
      keywords: e.keywords ?? [],
      template: e.template ?? null,
      resolution: e.resolution ?? { resolverKey: "standard" },
      consumption: e.consumption ?? { amount: 1, sourceId: "" }
    })]));
  }
  async deletePayload(e) {
    var n, r, o, l, c;
    if (String(e ?? "").trim() === "unloaded") return;
    const t = ((n = this.system) == null ? void 0 : n.category) ?? ((r = this.system) == null ? void 0 : r.weaponCategory), i = Pt((o = this.system) == null ? void 0 : o.payloads, {
      legacyAmmo: (l = this.system) == null ? void 0 : l.ammo,
      category: t
    }).filter((u) => u.id !== e), s = ((c = i[0]) == null ? void 0 : c.id) ?? "unloaded";
    await this.update({
      "system.payloads": i.length ? i : Pt([], { category: t }),
      "system.selectedPayloadId": i.some((u) => {
        var d;
        return u.id === ((d = this.system) == null ? void 0 : d.selectedPayloadId);
      }) ? this.system.selectedPayloadId : i.length ? s : "",
      "system.-=ammo": null
    });
  }
  async createPayloadStandardTrait(e, t = {}) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((s) => s.id !== e ? s : (s.modifies ?? (s.modifies = {}), s.modifies.standardTraits = di(s.modifies.standardTraits).concat([{
      id: t.id ?? foundry.utils.randomID(),
      key: t.key ?? "armorPiercing",
      rating: Math.max(0, Number(t.rating ?? 0) || 0)
    }]), Je(s))));
  }
  async deletePayloadStandardTrait(e, t) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((s) => s.id !== e ? s : (s.modifies ?? (s.modifies = {}), s.modifies.standardTraits = di(s.modifies.standardTraits).filter((n) => n.id !== t), Je(s))));
  }
  async updatePayloadStandardTrait(e, t, i, s) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((n) => n.map((r) => r.id !== e ? r : (r.modifies ?? (r.modifies = {}), r.modifies.standardTraits = di(r.modifies.standardTraits).map((o) => (o.id !== t || (i === "key" && (o.key = s), i === "rating" && (o.rating = Math.max(0, Number(s ?? 0) || 0))), o)), Je(r))));
  }
  async createConsumptionSource(e = {}) {
    await this._mutateConsumptionSources((t) => t.concat([It({
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
      return ((s = i == null ? void 0 : i.consumption) == null ? void 0 : s.sourceId) !== e ? i : (i.consumption.sourceId = "", Je(i));
    }));
  }
  async updateConsumptionSourceField(e, t, i) {
    await this._mutateConsumptionSources((s) => s.map((n) => n.id !== e ? n : (foundry.utils.setProperty(n, t, i), It(n))));
  }
  getPayloadState({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var i, s, n, r, o;
    return qs({
      payloads: (i = this.system) == null ? void 0 : i.payloads,
      selectedPayloadId: (s = this.system) == null ? void 0 : s.selectedPayloadId,
      consumptionSources: (n = this.system) == null ? void 0 : n.consumptionSources,
      actor: this.actor ?? null,
      payloadId: e || t,
      category: ((r = this.system) == null ? void 0 : r.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
    });
  }
  getActivePayloadReloadState({ payloadId: e = "", ammoTypeId: t = "", user: i = game.user } = {}) {
    var f, h, g;
    const s = String(((f = this.system) == null ? void 0 : f.category) ?? ((h = this.system) == null ? void 0 : h.weaponCategory) ?? "").trim().toLowerCase(), n = {
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
      return { ...n, reason: "Only personal weapons can be reloaded from this sheet." };
    if (!this.actor)
      return { ...n, reason: "Reload is only available for weapons owned by an actor." };
    if (s === "melee")
      return { ...n, reason: "Melee weapons do not use reloadable payloads." };
    const r = this.getPayloadState({ payloadId: e || t }), o = (r == null ? void 0 : r.sourceState) ?? null, l = (r == null ? void 0 : r.source) ?? null, c = String((r == null ? void 0 : r.activePayloadId) ?? "").trim(), u = String((r == null ? void 0 : r.payloadLabel) ?? "").trim() || "Unloaded", d = Math.max(0, Number((o == null ? void 0 : o.current) ?? 0) || 0), m = Math.max(0, Number((o == null ? void 0 : o.max) ?? 0) || 0), p = !!((g = oe.getCombat(this.actor)) != null && g.combatant);
    return !c || c === "unloaded" ? {
      ...n,
      reason: "Select a payload before reloading.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: l,
      sourceState: o,
      current: d,
      max: m,
      inCombat: p
    } : o != null && o.isTracked ? o.kind !== "internal" ? {
      ...n,
      reason: "Linked ammo sources are read-only from the weapon sheet.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: l,
      sourceState: o,
      current: d,
      max: m,
      inCombat: p
    } : m <= 0 ? {
      ...n,
      reason: "This payload source has no reloadable capacity.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: l,
      sourceState: o,
      current: d,
      max: m,
      inCombat: p
    } : p && !(i != null && i.isGM) ? {
      ...n,
      reason: "Only a GM can reload from the weapon sheet during combat.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: l,
      sourceState: o,
      current: d,
      max: m,
      inCombat: p
    } : d >= m ? {
      ...n,
      reason: "Magazine already full.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: l,
      sourceState: o,
      current: d,
      max: m,
      inCombat: p
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
      inCombat: p
    } : {
      ...n,
      reason: "This payload is untracked and does not need to be reloaded.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: r,
      source: l,
      sourceState: o,
      current: d,
      max: m,
      inCombat: p
    };
  }
  canReloadActivePayload({ detailed: e = !1, ...t } = {}) {
    const i = this.getActivePayloadReloadState(t);
    return e ? i : i.canReload;
  }
  async reloadActivePayload({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var s;
    const i = this.getActivePayloadReloadState({ payloadId: e, ammoTypeId: t });
    return !i.canReload || !((s = i.source) != null && s.id) ? { ok: !1, ...i } : (await this._mutateConsumptionSources((n) => n.map((r) => {
      var o;
      return r.id !== i.source.id ? r : (r.tracking ?? (r.tracking = {}), r.tracking.max = Math.max(0, Number(((o = r.tracking) == null ? void 0 : o.max) ?? i.max) || i.max), r.tracking.current = i.max, It(r));
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
    var i, s, n, r, o, l;
    const t = Mi(
      e,
      Pt((i = this.system) == null ? void 0 : i.payloads, {
        legacyAmmo: (s = this.system) == null ? void 0 : s.ammo,
        category: ((n = this.system) == null ? void 0 : n.category) ?? ((r = this.system) == null ? void 0 : r.weaponCategory)
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
    var r;
    const i = this.getPayloadState({ payloadId: e || t });
    if (!((r = i == null ? void 0 : i.sourceState) != null && r.isTracked)) return !0;
    const s = Math.max(1, Number(i.sourceState.consumePerUse ?? 1) || 1), n = Math.max(0, Number(i.sourceState.current ?? 0) || 0);
    return n < s ? !1 : i.sourceState.kind === "internal" ? (await this._mutateConsumptionSources((o) => o.map((l) => {
      var c;
      return l.id !== ((c = i.source) == null ? void 0 : c.id) ? l : (l.tracking ?? (l.tracking = {}), l.tracking.current = Math.max(0, n - s), It(l));
    })), !0) : i.sourceState.kind === "actorResource" && this.actor && i.sourceState.currentPath ? (await this.actor.update({
      [i.sourceState.currentPath]: Math.max(0, n - s)
    }), !0) : i.sourceState.kind === "itemRef" && i.sourceState.sourceItem && i.sourceState.currentPath ? (await i.sourceState.sourceItem.update({
      [i.sourceState.currentPath]: Math.max(0, n - s)
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
    const s = t === "name" ? "label" : t === "damageType" ? "modifies.damageType" : t === "apMod" ? "modifies.ap" : t.startsWith("attackRatingBandMod.") ? `modifies.attackRatingBand.${t.split(".")[1]}` : t === "traits" ? "traits" : t === "keywords" ? "keywords" : t;
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
    const i = this.system ?? {}, s = Ci(i.range), n = String(i.skill ?? "").trim(), r = ct(n), o = Number(i.damage ?? 0) || 0, l = String(i.category ?? i.weaponCategory ?? "ranged").trim() || "ranged", c = xc({
      damageType: i.damageType,
      ap: Number(i.ap ?? i.armorPiercing ?? 0) || 0,
      attackRatingBand: Ms(i.attackRatingBand),
      traits: ji(i.traits),
      keywords: vc(i.keywords),
      standardTraits: [],
      resolution: Pa(i.resolution, "standard"),
      fireModes: Na(i.fireModes),
      payloads: Pt(i.payloads, { legacyAmmo: i.ammo, category: l }),
      selectedPayloadId: Mi(i.selectedPayloadId, i.payloads, { legacyAmmo: i.ammo, category: l }),
      consumptionSources: qi(i.consumptionSources, { legacyAmmo: i.ammo }),
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
      skill: n || "firearms",
      skillDef: r,
      damage: o,
      ap: c.ap,
      damageType: c.damageType,
      damageTypeLabel: Ot(c.damageType),
      attackRatingBand: c.attackRatingBand,
      range: s,
      defaultRangeBand: this.getDefaultRangeBand(s),
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
    const t = this.system ?? {}, i = Math.max(0, Number(t.rating ?? 0)), s = Math.max(0, Number(((d = t == null ? void 0 : t.durability) == null ? void 0 : d.max) ?? i)), n = Math.min(
      s,
      Math.max(0, Number(((m = t == null ? void 0 : t.durability) == null ? void 0 : m.current) ?? s))
    ), r = Math.min(i, n), o = yt((t == null ? void 0 : t.mitigationByType) ?? (t == null ? void 0 : t.mitigation)), l = Ss({
      standardTraits: Et(t == null ? void 0 : t.standardTraits),
      traits: ji(t == null ? void 0 : t.traits),
      traitState: t == null ? void 0 : t.traitState
    }), c = Ea(t == null ? void 0 : t.tags), u = Dn(r);
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
      remainingDurability: n,
      baseMitigation: u,
      baseResistance: u,
      mitigationByType: Eo(o, l.mitigationByType),
      tags: c,
      isDestroyed: n <= 0,
      durability: {
        current: n,
        max: s
      },
      traitState: l.traitState,
      standardTraits: Et(t.standardTraits),
      traits: Bc({
        traits: ji(t.traits),
        standardTraits: Et(t.standardTraits)
      }),
      notes: String(t.notes ?? "").trim()
    };
  }
  getDefaultRangeBand(e = Ci(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    return Pd(e);
  }
  isWeaponSkill(e) {
    return ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === S.itemType.skill && e.system.code === this.system.skill;
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find((s) => this.isWeaponSkill(s));
    if (e) return e;
    const t = game.items.find((s) => this.isWeaponSkill(s));
    return t || Mr(this.system.skill);
  }
  getDefense() {
    if (!this.isPersonalWeapon())
      return this.system.defense ? ke.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return ke.fixedDefenseCode(this.system.defense);
    const e = ct(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? ke.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent) return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0, i = this.isPersonalWeapon() ? this.getCombatProfile() : null;
    return {
      value: Rd(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: (i == null ? void 0 : i.damageType) ?? this.system.damageType,
      damageTypeLabel: (i == null ? void 0 : i.damageTypeLabel) ?? this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: Dd(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  getDamageCode() {
    return Id(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  getDamageTypeLabel() {
    var t;
    if (this.isPersonalWeapon())
      return Ot(((t = this.getCombatProfile()) == null ? void 0 : t.damageType) ?? this.system.damageType);
    const e = we.mwd.weaponDamageType[this.system.damageType] ?? we.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return Nd(Ci(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  validateTargets(e) {
    var r;
    const t = (r = this.getDamage()) == null ? void 0 : r.monitor, i = rt.getTargetTokens(game.user), s = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), n = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (n.length > 0) {
      const o = be(we.common.errors.ignoredTargets, {
        targets: n.reduce(ee.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (s.length === 0) {
      const o = be(we.common.errors.noTargetSelected, {
        weapon: this.name ?? we.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(s);
    return s;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = Sr[t] ?? {};
    bi.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = Sr[t] ?? {};
    return i.targets && i.adjust && e <= i.targets ? i.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area === "" ? S.area.none : this.system.area ?? S.area.none;
  }
  _getMonitor() {
    return this.isPersonalWeapon() ? S.monitors.physical : this.system.monitor || S.monitors.physical;
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
oa = new WeakMap(), ut = new WeakSet(), tn = async function(e) {
  if (typeof (e == null ? void 0 : e.syncEquippedActorEffects) == "function")
    try {
      await e.syncEquippedActorEffects();
    } catch (t) {
      console.error(`${fe}Failed to sync equipped item effects`, { item: e, error: t });
    }
}, bl = async function(e) {
  if (typeof (e == null ? void 0 : e.removeSyncedActorEffects) == "function")
    try {
      await e.removeSyncedActorEffects({ actor: e.actor ?? e.parent ?? null });
    } catch (t) {
      console.error(`${fe}Failed to remove synced item effects`, { item: e, error: t });
    }
}, $a = async function(e) {
  const t = e == null ? void 0 : e.parent;
  if (typeof (t == null ? void 0 : t.syncEquippedActorEffects) == "function")
    try {
      await t.syncEquippedActorEffects();
    } catch (i) {
      console.error(`${fe}Failed to sync parent item effects`, { effect: e, error: i });
    }
}, Te(Fe, ut), Te(Fe, oa, !1), R(Fe, "RANGE_ORDER", yi), R(Fe, "EQUIPPED_EFFECT_FLAG", "equippedItemSync"), R(Fe, "DEFAULT_UNARMED", Object.freeze({
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
let Fi = Fe;
const Cr = {
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
}, _d = {
  code: "weapon-range",
  options: {
    flags: { editable: !0 },
    order: 20,
    category: pe.pool,
    labelkey: we.common.roll.modifiers.weaponRange,
    hbsTemplateRoll: `${G}/roll/parts/select-option.hbs`,
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
}, Ld = {
  code: "weapon-area",
  options: {
    used: !0,
    order: 20,
    category: pe.pool,
    labelkey: we.common.roll.modifiers.weaponArea,
    hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
    hbsTemplateChat: void 0
    //``
  },
  isUsed: (a) => a.used,
  condition: (a) => a.weapon && a.weapon.getArea() != S.area.none,
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
}, ge = class ge extends Fi {
  static buildDefaultUnarmedProfile(e = null) {
    var s, n, r, o, l, c, u, d;
    const t = Math.max(0, Number(
      ((s = e == null ? void 0 : e.getAttributeValue) == null ? void 0 : s.call(e, S.actorAttributes.strength)) ?? ((o = (r = (n = e == null ? void 0 : e.system) == null ? void 0 : n.attributes) == null ? void 0 : r.strength) == null ? void 0 : o.value) ?? 0
    ) || 0), i = Math.max(0, Number(
      ((l = e == null ? void 0 : e.getAttributeValue) == null ? void 0 : l.call(e, S.actorAttributes.reflexes)) ?? ((d = (u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.attributes) == null ? void 0 : u.reflexes) == null ? void 0 : d.value) ?? 0
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
    Hooks.once(Ie.REGISTER_ROLL_PARAMETERS, (e) => {
      e(Ld), e(_d);
    });
  }
  prepareBaseData() {
    if (super.prepareBaseData(), (this.canonicalType ?? this.type) !== S.itemType.personalWeapon) return;
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = bt(e.damageType), e.attackRatingBand = ge.normalizeAttackRatingBand(e.attackRatingBand), e.range = ge.normalizeRangeData(e.range), e.traits = ge.normalizeTraits(e.traits), e.notes = String(e.notes ?? "").trim();
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
    const t = e ?? {}, i = ge.normalizeRangeKey(t.max ?? "near"), s = ge.maxIndex(i), n = ge.RANGE_ORDER.map((l, c) => ({
      key: l,
      allowed: c <= s,
      value: Number(t[l] ?? (l === "extreme" && t.long !== void 0 ? t.long : 0))
    }));
    let r = "close", o = -1 / 0;
    for (const l of n)
      l.allowed && l.value > o && (o = l.value, r = l.key);
    return { cap: i, bands: n, optimalKey: r };
  }
  static get defaultIcon() {
    return "systems/mwd/img/colt-m1911.svg";
  }
  static defaultIconForType(e) {
    return e === S.itemType.mechWeapon ? "systems/mwd/img/default/Default_Weapon.svg" : this.defaultIcon;
  }
  static normalizeTraits(e) {
    return Wi(e);
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
    if ((this.canonicalType ?? this.type) === S.itemType.personalWeapon)
      return super.getCombatProfile(e);
    const t = this.system ?? {}, i = this.canonicalType ?? this.type, s = ge.normalizeRangeData(t.range), n = String(t.skill ?? "").trim(), r = ct(n), o = Number(t.damage ?? 0) || 0, l = Number(t.ap ?? t.armorPiercing ?? 0) || 0, c = String(t.category ?? t.weaponCategory ?? "ranged").trim() || "ranged", u = ge.normalizeTraits(t.traits);
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
      skill: n || "firearms",
      skillDef: r,
      damage: o,
      ap: l,
      damageType: i === S.itemType.personalWeapon ? bt(t.damageType) : String(t.damageType ?? "kinetic").trim() || "kinetic",
      attackRatingBand: ge.normalizeAttackRatingBand(t.attackRatingBand),
      range: s,
      defaultRangeBand: this.getDefaultRangeBand(s),
      traits: u,
      effects: {},
      notes: String(t.notes ?? t.description ?? "").trim()
    };
  }
  getDefaultRangeBand(e = ge.normalizeRangeData(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    const i = ["near", "close", "far", "extreme"], s = ge.maxIndex(e.max);
    return i.find((n) => ge.RANGE_ORDER.indexOf(n) <= s) ?? "close";
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find(
      (s) => s.type === S.itemType.skill && s.system.code === this.system.skill
    );
    if (e) return e;
    const t = ct(String(this.system.skill ?? "").trim());
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
    if ((this.canonicalType ?? this.type) !== S.itemType.personalWeapon)
      return this.system.defense ? ke.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return ke.fixedDefenseCode(this.system.defense);
    const e = ct(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? ke.fixedDefenseCode(e.defense) : void 0;
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
  static damageValue(e, t, i, s) {
    if (t = Number(t), i)
      if (s !== void 0)
        t = t + Math.ceil(Number(s) / 2);
      else
        return console.warn("Weapon not attached to an actor"), we.item.personalWeapon.weaponWithoutActor;
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
    let s = "";
    return i && we.attributes[i] && (s += we.attributes[i].substring(0, 3).toUpperCase() + "/2 + "), s += String(t), s;
  }
  static armorMode(e, t) {
    return _.useArmor(e) ? t ? "noArmor" : "withArmor" : "";
  }
  getDamageTypeLabel() {
    if ((this.canonicalType ?? this.type) === S.itemType.personalWeapon)
      return Ot(this.system.damageType);
    const e = we.mwd.weaponDamageType[this.system.damageType] ?? we.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return ge.getRangeList(ge.normalizeRangeData(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  _getRange(e) {
    return { value: this.system.range[e], labelkey: ce.getFromList(ce.getEnums().ranges, e) };
  }
  static getRangeList(e) {
    const t = ge.normalizeRangeKey(e == null ? void 0 : e.max), i = ge.RANGE_ORDER.indexOf(t);
    return ge.RANGE_ORDER.map((s, n) => ({
      key: s,
      allowed: i >= 0 ? n <= i : n === 0,
      value: (e == null ? void 0 : e[s]) ?? (s === "extreme" && (e == null ? void 0 : e.long) !== void 0 ? e.long : void 0),
      labelkey: ce.getFromList(ce.getEnums().ranges, s)
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
    const t = (r = this.getDamage()) == null ? void 0 : r.monitor, i = rt.getTargetTokens(game.user), s = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), n = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (n.length > 0) {
      const o = be(we.common.errors.ignoredTargets, {
        targets: n.reduce(ee.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (s.length == 0) {
      const o = be(we.common.errors.noTargetSelected, {
        weapon: this.name ?? we.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(s);
    return s;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = Cr[t] ?? {};
    bi.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = Cr[t] ?? {};
    return i.targets && i.adjust && e <= i.targets ? i.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area == "" ? S.area.none : this.system.area ?? S.area.none;
  }
  _getMonitor() {
    return (this.canonicalType ?? this.type) === S.itemType.personalWeapon ? S.monitors.physical : this.system.monitor || S.monitors.physical;
  }
};
R(ge, "RANGE_ORDER", ["close", "near", "far", "extreme"]), R(ge, "DEFAULT_UNARMED", Fi.DEFAULT_UNARMED);
let lt = ge;
function $d(a) {
  const e = [];
  for (let [t, i] of Object.entries(a ?? {}))
    i !== void 0 && (t = t.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (s, n) => (n ? "-" : "") + s.toLowerCase()), e.push(`data-${t}="${Handlebars.escapeExpression(i)}"`));
  return new Handlebars.SafeString(e.join(" "));
}
function xd({ hash: a }) {
  return a;
}
function Bd() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
class Vn {
  constructor() {
    this.registerHelpers(), Hooks.once("init", () => {
      this.registerHelpers(), console.log(`${fe}Handlebars helpers registered (init)`);
    }), console.log(`${fe}Handlebars helpers registered (ctor)`);
  }
  registerHelpers() {
    const e = Bd(), t = {
      // Foundry utils
      getProperty: foundry.utils.getProperty,
      // DND5E-inspired utilities
      "mwd-dataset": $d,
      "mwd-object": xd,
      // Simple comparisons
      eq: (i, s) => i === s,
      ne: (i, s) => i !== s,
      // Strings/arrays
      concat: (...i) => ee.join(i.slice(0, -1)),
      join: (i, s = " ") => Array.isArray(i) ? i.join(s) : "",
      includes: (i, s) => i == null ? void 0 : i.includes(s),
      length: (i) => (i == null ? void 0 : i.length) || 0,
      substring: (i, s, n) => i == null ? void 0 : i.substring(s, n),
      toUpperCase: nc.toUpperCaseNoAccent,
      // Math
      modulo: (i, s) => i % s,
      divint: ee.divint,
      divup: ee.divup,
      sum: (i, s) => i + s,
      diff: (i, s) => i - s,
      times: (i, s) => i * s,
      min: (i, s) => Math.min(i, s),
      max: (i, s) => Math.max(i, s),
      // Utility blocks
      for: Vn.hbsForLoop,
      // fixes “Missing helper: for”
      range: (i, s) => Array.from({ length: s - i + 1 }, (n, r) => i + r),
      ifGte: (i, s, n) => i >= s ? n.fn(this) : n.inverse(this),
      // Damage / weapons (legacy-compatible)
      weaponDamageLetter: sc.letter,
      weaponDamageCode: lt.damageCode,
      weaponDamageValue: lt.damageValue,
      weaponArmorMode: lt.armorMode,
      weaponRangeList: lt.getRangeList,
      // Icons
      iconFA: U.fontAwesome,
      iconSrc: U.iconSystemPath,
      iconPath: U.iconPath,
      iconD6: U.iconD6,
      // Enums
      localizeAttribute: ce.localizeAttribute
    };
    e.registerHelper(t), e !== Handlebars && Handlebars.registerHelper(t);
  }
  static hbsForLoop(e, t, i) {
    let s = "";
    for (let n = e; n < t; ++n) s += i.fn(n);
    return s;
  }
}
const Er = "sheetTheme", an = "mwd-theme-default", Fd = "mwd-theme-sra", zd = [
  { name: "Default (CSB)", cssClass: an },
  { name: "SRA", cssClass: Fd }
];
class Wd {
  constructor() {
    this.availableStyles = {}, hi.register(Ie.REGISTER_STYLES), Hooks.once(Ie.REGISTER_STYLES, (e) => zd.forEach((t) => e(t.cssClass, t.name))), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(Ie.REGISTER_STYLES, (e, t) => this.availableStyles[e] = t), console.log(fe + "Loaded styles", this.availableStyles), game.settings.register(w, Er, {
      scope: "world",
      name: "Sheet Theme",
      hint: "Select the visual theme used by MWD sheets.",
      config: !0,
      default: an,
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
    const e = game.settings.get(w, Er);
    return this.availableStyles[e] ? e : an;
  }
}
function Zi(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function Es(a, e) {
  var i, s, n;
  if (!a) return null;
  const t = Zi(e) ?? Zi(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((n = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : n.call(i, ((s = t == null ? void 0 : t.baseActor) == null ? void 0 : s.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function Pr(a) {
  const e = Number(a ?? 0);
  return Number.isFinite(e) ? Math.trunc(e) : 0;
}
function Sa(a, e) {
  var t, i, s;
  return Math.max(0, Number(((s = (i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.monitors) == null ? void 0 : i[e]) == null ? void 0 : s.value) ?? 0) || 0);
}
function Nr(a) {
  var e, t;
  return Math.max(0, Number(((t = (e = a == null ? void 0 : a.system) == null ? void 0 : e.burn) == null ? void 0 : t.value) ?? 0) || 0);
}
function Gi(a) {
  return a === S.monitors.physical ? "Physical" : a === S.monitors.fatigue ? "Fatigue" : String(a ?? "").trim() || "Track";
}
function Ud(a, e) {
  var t;
  return ((t = xn(e).find((i) => i.id === a)) == null ? void 0 : t.label) ?? a;
}
function jd(a) {
  const e = foundry.utils.escapeHTML, t = [];
  if (a.mode === "attackDamage" || a.mode === "trackDelta") {
    const i = a.appliedDelta >= 0 ? "Applied" : "Recovered", s = Math.abs(Number(a.appliedDelta ?? 0)), n = s === 1 ? "point" : "points", r = a.usedArmor ? ` via armor-aware ${e(Ot(a.damageType))}` : "";
    t.push(`<div><b>${i}:</b> ${s} ${n} to ${e(Gi(a.track))}${r}</div>`), a.usedArmor && a.mitigation && (t.push(
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
function Hd(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
class tt {
  static supportsActor(e) {
    return (e == null ? void 0 : e.type) === S.actorTypes.character || (e == null ? void 0 : e.type) === S.actorTypes.npc;
  }
  static getActorOptions() {
    return Array.from(game.actors ?? []).filter((e) => this.supportsActor(e)).sort((e, t) => String(e.name ?? "").localeCompare(String(t.name ?? ""))).map((e) => ({
      id: e.id,
      name: e.name || "Character"
    }));
  }
  static getStatusOptions(e = null) {
    return xn(e).map((t) => ({
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
      const n = Zi(e[0]), r = Es((n == null ? void 0 : n.actor) ?? null, n);
      return this._resolveSceneTargetResult(r, n);
    }
    const t = Array.from(((s = game.user) == null ? void 0 : s.targets) ?? []);
    if (t.length > 1)
      return { actor: null, token: null, reason: "Target only one token." };
    if (t.length === 1) {
      const n = Zi(t[0]), r = Es((n == null ? void 0 : n.actor) ?? null, n);
      return this._resolveSceneTargetResult(r, n);
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
    const n = Zi(t);
    if (n) {
      const c = Es((n == null ? void 0 : n.actor) ?? e, n), u = this._resolveSceneTargetResult(c, n);
      if (u.actor) return { ...u, source: "token" };
    }
    if (s) {
      const c = this.getSceneTarget();
      if (c.actor) return { ...c, source: "scene" };
    }
    if (e && this.supportsActor(e))
      return { actor: e, token: n, reason: "", source: "actor" };
    const r = i ? ((l = (o = game.actors) == null ? void 0 : o.get) == null ? void 0 : l.call(o, i)) ?? null : null;
    return r && this.supportsActor(r) ? { actor: r, token: null, reason: "", source: "fallback" } : {
      actor: null,
      token: n,
      source: null,
      reason: s && this.getSceneTarget().reason || "Choose a supported character target."
    };
  }
  static async apply({ actor: e = null, token: t = null, payload: i = {}, options: s = {} } = {}) {
    var l;
    const n = this.resolveTarget({
      actor: e,
      token: t,
      actorId: s.actorId ?? "",
      preferSceneTarget: !!s.preferSceneTarget
    });
    if (!n.actor)
      return { ok: !1, reason: n.reason || "Choose a supported character target." };
    let r;
    switch (String((i == null ? void 0 : i.mode) ?? "").trim()) {
      case "attackDamage":
        r = await this._applyAttackDamage(n.actor, i, s);
        break;
      case "trackDelta":
        r = await this._applyTrackDelta(n.actor, i, s);
        break;
      case "burnDelta":
        r = await this._applyBurnDelta(n.actor, i);
        break;
      case "status":
        r = await this._applyStatus(n.actor, i);
        break;
      default:
        return { ok: !1, reason: "Unsupported harm mode." };
    }
    const o = {
      ok: !0,
      actor: n.actor,
      token: n.token,
      actorName: n.actor.name || "Character",
      sourceType: n.source,
      dryRun: !!s.dryRun,
      ...r
    };
    if (s.logToChat && !s.dryRun) {
      const c = jd(o), u = Hd({
        speaker: ChatMessage.getSpeaker({ actor: n.actor, token: n.token }),
        content: c
      });
      await ChatMessage.create(u);
    }
    return s.dryRun || (l = oe.renderOpenCharacterSheets) == null || l.call(oe, n.actor.id), o;
  }
  static async _applyTrackDelta(e, t, i = {}) {
    const s = (t == null ? void 0 : t.track) === S.monitors.fatigue ? S.monitors.fatigue : S.monitors.physical, n = Pr((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0);
    if (!!(t != null && t.useArmor) && n > 0)
      return this._applyPersonalArmorAwareDamage(e, {
        mode: "trackDelta",
        track: s,
        damage: n,
        damageType: t == null ? void 0 : t.damageType,
        ap: (t == null ? void 0 : t.ap) ?? 0,
        effects: (t == null ? void 0 : t.effects) ?? {},
        source: t == null ? void 0 : t.source,
        notes: t == null ? void 0 : t.notes
      }, i);
    const o = Sa(e, s);
    i.dryRun || await _.addCounter(e, s, n);
    const l = i.dryRun ? Math.max(0, o + n) : Sa(e, s);
    return {
      mode: "trackDelta",
      track: s,
      requestedDelta: n,
      appliedDelta: l - o,
      usedArmor: !1,
      beforeLabel: `${Gi(s)} ${o}`,
      afterLabel: `${Gi(s)} ${l}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyBurnDelta(e, t) {
    var l, c;
    const i = Pr((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0), s = Nr(e), n = Math.max(0, s + i), r = { "system.burn.value": n };
    n === 0 && ((c = (l = e.system) == null ? void 0 : l.burn) != null && c.overloaded) && (r["system.burn.overloaded"] = !1), await e.update(r);
    const o = Nr(e);
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
    const s = Va(e, i), n = !!(t != null && t.active);
    await Fo({ actor: e, statusId: i, active: n });
    const r = Va(e, i);
    return {
      mode: "status",
      statusId: i,
      statusLabel: Ud(i, e),
      active: r,
      beforeLabel: s ? "Active" : "Inactive",
      afterLabel: r ? "Active" : "Inactive",
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyAttackDamage(e, t, i = {}) {
    return this._applyPersonalArmorAwareDamage(e, {
      mode: "attackDamage",
      track: (t == null ? void 0 : t.track) ?? S.monitors.physical,
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
    var H, D, W, X, Z, ie, ue, Se, O;
    const s = !!i.dryRun, n = (t == null ? void 0 : t.track) === S.monitors.fatigue ? S.monitors.fatigue : S.monitors.physical, r = Math.max(0, Number((t == null ? void 0 : t.damage) ?? 0) || 0), o = Math.max(0, Number((t == null ? void 0 : t.netHits) ?? 0) || 0), l = (t == null ? void 0 : t.effects) ?? {}, c = ((H = e.getPersonalCombatLoadout) == null ? void 0 : H.call(e, { refresh: !0 })) ?? null, u = (c == null ? void 0 : c.activeArmor) ?? null, d = Math.max(0, Number((u == null ? void 0 : u.currentArmorRating) ?? ((D = u == null ? void 0 : u.durability) == null ? void 0 : D.current) ?? 0) || 0), m = bt(t == null ? void 0 : t.damageType, "concussive"), p = Sa(e, n);
    let f = r + o;
    const h = d > 0 ? zc({
      damageIncoming: f,
      armorTags: (u == null ? void 0 : u.tags) ?? [],
      effects: l
    }) : { damageIncoming: f, applied: [] };
    f = h.damageIncoming;
    const g = Fc({
      currentArmorRating: d,
      mitigationByType: (u == null ? void 0 : u.mitigationByType) ?? {},
      damageType: m
    }), y = Math.max(
      0,
      (Number((t == null ? void 0 : t.ap) ?? 0) || 0) + (Number((l == null ? void 0 : l.ap) ?? 0) || 0)
    ), b = g.isDestroyed ? 0 : Math.max(0, g.baseMitigation + g.typeMitigationMod - y);
    let A = Math.max(0, Math.ceil(f - b));
    const v = {
      snapshot: ((W = oe.getSnapshot) == null ? void 0 : W.call(oe, e)) ?? null
    }, C = et({
      actor: e,
      phase: "onDamageResolved",
      facts: Zo({
        actor: e,
        packet: {
          amount: A,
          track: n,
          damageType: m
        },
        runtime: v
      }),
      packet: {
        amount: A,
        track: n,
        damageType: m
      },
      options: { runtime: v, consumeUsage: !0 }
    });
    s || await Dt({ actor: e, mutations: C.mutations, runtime: v }), A = Math.max(0, Number(C.packet.amount ?? A) || 0), !s && A > 0 && await _.addCounter(e, n, A);
    const I = Math.max(0, Number(((X = u == null ? void 0 : u.durability) == null ? void 0 : X.current) ?? 0) || 0);
    let P = I;
    const x = Math.max(0, Number(((ie = (Z = u == null ? void 0 : u.traitState) == null ? void 0 : Z.reinforced) == null ? void 0 : ie.current) ?? 0) || 0), V = Math.max(0, Number(((Se = (ue = u == null ? void 0 : u.traitState) == null ? void 0 : ue.reinforced) == null ? void 0 : Se.max) ?? 0) || 0);
    let Q = x;
    if (r + o > 0 && ((O = u == null ? void 0 : u.item) != null && O.id)) {
      const F = {};
      x > 0 ? (Q = Math.max(0, x - 1), Q !== x && (F["system.traitState.reinforced.current"] = Q)) : (P = Math.max(0, I - 1), P !== I && (F["system.durability.current"] = P)), !s && Object.keys(F).length > 0 && await u.item.update(F);
    }
    const K = s ? Math.max(0, p + A) : Sa(e, n);
    return {
      mode: (t == null ? void 0 : t.mode) ?? "attackDamage",
      track: n,
      requestedDelta: r + o,
      appliedDelta: K - p,
      usedArmor: !0,
      damageType: m,
      effectiveAp: y,
      mitigation: {
        ...g,
        netResistance: b,
        armorBefore: I,
        armorAfter: P,
        reinforcedBefore: x,
        reinforcedAfter: Q,
        reinforcedMax: V
      },
      damageIncoming: f,
      adjustedIncoming: f,
      finalDamage: A,
      tagEffectResult: h,
      beforeLabel: `${Gi(n)} ${p}`,
      afterLabel: `${Gi(n)} ${K}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
}
R(tt, "MODE_OPTIONS", Object.freeze([
  { value: S.monitors.physical, label: "Physical" },
  { value: S.monitors.fatigue, label: "Fatigue" },
  { value: "burn", label: "Burn" },
  { value: "status", label: "Status" }
]));
const qd = ja, sn = "damage-mode", Gd = `${w}.${sn}`, Aa = {}, Ps = {};
class re {
  static init() {
    hi.register(Ie.PROVIDE_DAMAGE_MODE), Hooks.on("updateSetting", async (e, t, i, s) => re.onUpdateSetting(e, t, i, s)), Hooks.on(Ie.PROVIDE_DAMAGE_MODE, (e) => {
      e("resistanceArmorMonitor", T.settings.damageMode.values.resistanceArmorMonitor, re.sufferDamageResistanceArmorMonitor), e("armorResistanceMonitor", T.settings.damageMode.values.armorResistanceMonitor, re.sufferDamageArmorResistanceMonitor), e("armorGivesResistance", T.settings.damageMode.values.armorGivesResistance, re.sufferDamageArmorAsResistance_Earthdawn), e("armorGiveResistanceHitsAvoid", T.settings.damageMode.values.armorGiveResistanceHitsAvoid, re.sufferDamageArmorAsResistance_Cyberpunk);
    }), Hooks.once("ready", () => re.onReady());
  }
  static onReady() {
    re._registerDamageModeSetting(), re._selectDamageMode();
  }
  static _registerDamageModeSetting() {
    Hooks.callAll(Ie.PROVIDE_DAMAGE_MODE, (e, t, i) => {
      Aa[e] = t, Ps[e] = i;
    }), game.settings.register(w, sn, {
      scope: "world",
      name: T.settings.damageMode.name,
      hint: T.settings.damageMode.hint,
      config: !0,
      default: Object.keys(Aa)[0],
      choices: Aa,
      type: String
    });
  }
  static async onUpdateSetting(e, t, i, s) {
    e.key == Gd && re._selectDamageMode();
  }
  static _selectDamageMode() {
    let e = game.settings.get(w, sn);
    Ps[e] || (e = Object.keys(Aa)[0]), re.damageModeCode = e, re.damageModeMethod = Ps[e];
  }
  static async sufferDamage(e, t, i, s, n, r, o) {
    const { monitor: l, damageType: c } = re._resolveDamageContext(e, t, o);
    if (bi.checkActorCanReceiveDamage(c ?? l, l, e), re._shouldUsePersonalDamageV2(e, l, o)) {
      await re.sufferPersonalDamageV2(e, l, c, i, s, n, r, o);
      return;
    }
    await (re.damageModeMethod ?? re.sufferDamageResistanceArmorMonitor)(e, l, c, i, s, n, r), await e.applyArmorDamage(l, c, ne.sumModifiers([o], "other", "damageArmor"));
  }
  static _shouldUsePersonalDamageV2(e, t, i) {
    var s, n;
    return !((s = e == null ? void 0 : e.isCharacterLike) != null && s.call(e)) || ![S.monitors.physical, S.monitors.fatigue].includes(t) ? !1 : !!((n = i == null ? void 0 : i.isPersonalWeapon) != null && n.call(i) || (i == null ? void 0 : i.canonicalType) === S.itemType.personalWeapon || (i == null ? void 0 : i.type) === S.itemType.personalWeapon);
  }
  static async sufferPersonalDamageV2(e, t, i, s, n, r, o, l) {
    var d;
    const c = ((d = l == null ? void 0 : l.getCombatProfile) == null ? void 0 : d.call(l)) ?? l ?? null, u = await tt.apply({
      actor: e,
      payload: {
        mode: "attackDamage",
        track: t,
        damage: Number(s ?? (c == null ? void 0 : c.damage) ?? 0) || 0,
        netHits: Number(n ?? 0) || 0,
        damageType: i ?? (c == null ? void 0 : c.damageType),
        ap: Number((c == null ? void 0 : c.ap) ?? 0) || 0,
        effects: (c == null ? void 0 : c.effects) ?? {}
      },
      options: {
        logToChat: !1
      }
    });
    u != null && u.ok && re._notifyPersonalArmorMitigation(e, {
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
    const i = t.armorMitigation ?? {}, s = re._localizeDamageType(t.damageType), n = i.isDestroyed ? "Armor destroyed" : `Base ${Number(i.baseMitigation ?? 0)} + Type ${Number(i.typeMitigationMod ?? 0)} - AP ${Number(t.effectiveAp ?? 0)}`, r = Number(t.adjustedIncoming ?? t.baseIncoming ?? 0), o = Number(t.finalDamage ?? 0), l = (((u = t.tagEffectResult) == null ? void 0 : u.applied) ?? []).map((d) => `${d.tag} +${Math.round((Number(d.bonus ?? 0) || 0) * 100)}%`).join(", "), c = l ? ` [${l}]` : "";
    ui.notifications.info(
      `${e.name} mitigated ${s}: ${n}${c}. Incoming ${r}, final ${o}.`
    );
  }
  static async sufferDamageResistanceArmorMonitor(e, t, i, s, n, r, o) {
    const l = _.resistanceDetail(e, t, i), c = l.value;
    let u = 0;
    if (r) {
      const d = Math.min(c, s), m = Math.min(c - d, n);
      u = s - d, _.useArmor(t) && (u -= await re.damageToArmor(e, i, u)), u += n - m;
    } else
      u = s + n - c, _.useArmor(t) && (u -= await re.damageToArmor(e, i, u));
    u > 0 && await _.addCounter(e, t, u), re._notifyResistanceUsage(e, t, i, l);
  }
  static async sufferDamageArmorResistanceMonitor(e, t, i, s, n, r, o) {
    let l = 0;
    _.useArmor(t) ? r ? (s -= await re.damageToArmor(e, i, s), l = n + s) : (l = n + s, l -= await re.damageToArmor(e, i, l)) : l = s + n;
    const c = _.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await _.addCounter(e, t, l), re._notifyResistanceUsage(e, t, i, c), l;
  }
  static async sufferDamageArmorAsResistance_Cyberpunk(e, t, i, s, n, r, o) {
    let l = s + n;
    if (_.useArmor(t) && l > 0) {
      const u = r ? n : 0, d = Math.max(0, re._computeArmorResistance(e) - u);
      d > 0 && (await _.addCounter(e, "armor", 1), l -= d);
    }
    const c = _.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await _.addCounter(e, t, l), re._notifyResistanceUsage(e, t, i, c), Math.max(l, 0);
  }
  static async sufferDamageArmorAsResistance_Earthdawn(e, t, i, s, n, r, o) {
    let l = s + n;
    if (_.useArmor(t) && !r && l > 0) {
      const u = re._computeArmorResistance(e);
      u > 0 && (await _.addCounter(e, "armor", 1), l -= u);
    }
    l -= re._computeStrengthResistance(e, t);
    const c = _.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await _.addCounter(e, t, l), re._notifyResistanceUsage(e, t, i, c), l;
  }
  static async damageToArmor(e, t, i) {
    if (i > 0) {
      const s = _.max(e, S.monitors.armor), n = _.getCounterValue(e, S.monitors.armor), r = Math.min(s - n, i), o = _.resistance(e, S.monitors.armor, t), l = Math.max(0, r - o);
      return l > 0 && await _.addCounter(e, S.monitors.armor, l), r;
    } else
      return 0;
  }
  static _resolveDamageContext(e, t, i) {
    var o;
    const s = (typeof t == "object" ? (t == null ? void 0 : t.damageType) ?? (t == null ? void 0 : t.type) : t) ?? ((o = i == null ? void 0 : i.system) == null ? void 0 : o.damageType), n = typeof t == "object" ? (t == null ? void 0 : t.monitor) ?? s : s;
    return { monitor: e.getDamageMonitor(n), damageType: s };
  }
  static _notifyResistanceUsage(e, t, i, s) {
    var u;
    if (!s || t === void 0)
      return;
    const n = T.actor.monitors[t] ?? t, r = re._localizeDamageType(i) ?? n, o = s.usedType ? "type" : "default", l = ((u = T.actor.monitors.resistanceSources) == null ? void 0 : u[o]) ?? o, c = be(T.actor.monitors.resistanceApplied, {
      actor: e.name,
      monitor: n,
      damageType: r,
      value: s.value,
      source: l
    });
    ui.notifications.info(c);
  }
  static _localizeDamageType(e) {
    if (e)
      return Ao(e) ? Ot(e) : T.mwd.weaponDamageType[e] ?? T.mwd.personalDamageType[e] ?? T.actor.monitors[e] ?? e;
  }
  static _computeArmorResistance(e) {
    const t = _.max(e, "armor"), i = _.getCounterValue(e, "armor"), s = Math.max(0, t - i);
    return Math.max(0, Math.ceil(s / 3));
  }
  static _computeStrengthResistance(e, t) {
    const i = e.getAttributeValue(S.actorAttributes.strength);
    return Math.max(0, Math.floor(i / 4));
  }
}
class Xe extends Actor {
  static init() {
    Hooks.on("updateActor", (e, t, i, s) => {
      var n;
      return (n = rt.firstResponsible(e)) == null ? void 0 : n.onUpdateActor(t, i);
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
      const n = i.system.code === "knowledge" || i.system.attribute === "knowledge", r = s.system.code === "knowledge" || s.system.attribute === "knowledge";
      if (n && !r) return 1;
      if (!r && n) return -1;
      if (n && r)
        return i.name > s.name ? 1 : i.name > s.name ? -1 : 0;
      const o = e.getAttributeValue(i.system.attribute) + i.system.value, l = e.getAttributeValue(s.system.attribute) + s.system.value;
      return o > l ? -1 : o < l ? 1 : 0;
    }) : [];
  }
  static sortQualities(e) {
    if (!e)
      return [];
    const t = ["positive", "negative", "narrative"], i = ["major", "minor"];
    return e.sort((s, n) => {
      var m, p, f, h, g, y;
      const r = String(((m = s.system) == null ? void 0 : m.category) ?? (((p = s.system) == null ? void 0 : p.positive) === !1 ? "negative" : "positive")).trim() || "positive", o = String(((f = n.system) == null ? void 0 : f.category) ?? (((h = n.system) == null ? void 0 : h.positive) === !1 ? "negative" : "positive")).trim() || "positive", l = t.indexOf(r) - t.indexOf(o);
      if (l !== 0) return l;
      const c = String(((g = s.system) == null ? void 0 : g.tier) ?? "minor").trim() || "minor", u = String(((y = n.system) == null ? void 0 : y.tier) ?? "minor").trim() || "minor", d = i.indexOf(c) - i.indexOf(u);
      return d !== 0 ? d : String(s.name ?? "").localeCompare(String(n.name ?? ""));
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
    return [S.actorTypes.vehicle, S.actorTypes.battlemech].includes(this.type);
  }
  prepareData() {
    super.prepareData(), this._prepareEdgePools(), this.cleanupFavorites();
  }
  prepareDerivedData() {
    if (this.system.modifiers = {
      initiative: ne.sumModifiers(this.items, "other", "initiative")
    }, this.system.monitors) {
      const e = ce.getDamageTypes();
      Object.entries(this.system.monitors).forEach((t) => {
        t[1].resistance = Xe.normalizeResistance(t[1].resistance), t[1].maxBonus = ne.sumMonitorModifiers(this.items, t[0], "max"), t[1].resistanceBonus = ne.sumMonitorModifiers(this.items, t[0], "resistance"), t[1].resistanceBonusByType = Object.fromEntries(
          e.map((i) => [i.value, ne.sumMonitorModifiers(this.items, t[0], "resistanceByType", i.value)]).filter(([, i]) => i)
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
    return Li[this.type] ?? [];
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
    const e = this.getAttributeValue(S.actorAttributes.edge), t = foundry.utils.getProperty(this.system, "counters.edgePools") ?? {};
    Object.values(S.counters.edgePools).forEach((s) => {
      const n = t[s] ?? {}, r = n.value;
      n.value = r ?? e ?? 0, n.value = Math.min(n.value, e ?? n.value ?? 0), n.max = e ?? n.max ?? 0, t[s] = n;
    }), foundry.utils.setProperty(this.system, "counters.edgePools", t);
  }
  async setCheckbarValue(e, t) {
    return await this.update({ [e]: t });
  }
  _getMonitorMax(e) {
    const t = this.getAttributeValue(e);
    return t == 0 ? 0 : lo + ee.divup(t, 2);
  }
  getAttributeActions() {
    return ke.getActorActions(this);
  }
  getUsableAttributes(e = void 0) {
    const t = (e ? [e] : this.items).map((s) => s.getAttributes()).reduce((s, n) => s.concat(n), []), i = ee.distinct(this.getAttributes().concat(t));
    return i.sort(ee.ascendingBySortedArray(ce.sortedAttributeKeys)), i;
  }
  getAttributeValue(e, t = void 0) {
    let i = 0;
    if (e = this.getCorrespondingAttribute(e), e) {
      if (this.getAttributes().includes(e))
        i = this.system.attributes[e].value;
      else if (t)
        i = (t == null ? void 0 : t.getAttributeValue(e)) ?? 0;
      else {
        const s = this.items.filter((n) => n.getAttributes().includes(e));
        if (s.length > 0) {
          const n = s.map((r) => r.getAttributeValue(e) ?? 0);
          i = Math.max(...n);
        }
      }
      i += ne.sumModifiers(this.items, "attribute", e);
    }
    return i;
  }
  resolveDamageType(e) {
    switch (e) {
      case "stun":
        return S.monitors.fatigue;
    }
    return e;
  }
  getDamageMonitor(e) {
    e = this.resolveDamageType(e);
  }
  async applyArmorDamage(e, t, i = 0) {
    switch (e = this.resolveDamageType(e), e) {
      case S.monitors.physical:
      case S.monitors.fatigue:
        await re.damageToArmor(this, t, i);
    }
  }
  async rollAttribute(e) {
    await ht.rollAttribute(this, e);
  }
  async rollAttributeAction(e) {
    const t = ke.getActorAction(this, e);
    await ht.rollAttributeAction(this, t);
  }
  async rollSkill(e, t) {
    await ht.rollSkill(this, e, t);
  }
  async rollWeapon(e) {
    var n, r, o;
    bi.checkWeaponDefense(e, this);
    const t = (n = e.validateTargets(this)) == null ? void 0 : n.map((l) => l.id), i = {
      attackerTokenId: (o = (r = game.scenes.current) == null ? void 0 : r.tokens.find((l) => {
        var c;
        return ((c = l.actor) == null ? void 0 : c.id) == this.id;
      })) == null ? void 0 : o.id,
      targetedTokenIds: t
    }, s = this.items.find((l) => e.isWeaponSkill(l));
    await ht.rollWeapon(this, s, e, i);
  }
  async rollDefense(e) {
    const t = e.attack.defense, i = ke.getActorDefense(this, t);
    await ht.rollDefense(this, i, e);
  }
  async switchMonitorCheck(e, t, i, s = void 0) {
    await _.switchMonitorCheck(this, e, t, i, s);
  }
  async addCounter(e, t, i = void 0) {
    await _.addCounter(this, e, t, i);
  }
  async setCounter(e, t, i = void 0) {
    await _.setCounter(this, e, t, i);
  }
  canSetMarks() {
    return !1;
  }
  getCyberdeck() {
  }
  canApplyDamage(e) {
    switch (e) {
      case S.monitors.physical:
      case S.monitors.fatigue:
        return this.getDamageMonitor(e) != null;
    }
    return !1;
  }
  canReceiveDamage(e) {
    return this.canApplyDamage(e);
  }
  async onEnterCombat() {
    const e = ne.sumModifiers(this.items, "other", "sceneAnarchy");
    e > 0 && await _.setCounter(this, S.monitors.sceneAnarchy, e);
  }
  async onLeaveCombat() {
    await _.setCounter(this, S.monitors.sceneAnarchy, 0);
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
    var s, n;
    const e = this.hasGMAnarchy(), t = (n = (s = game.system) == null ? void 0 : s.anarchy) == null ? void 0 : n.gmAnarchy, i = e && t && typeof t.getAnarchy == "function" ? t.getAnarchy() : {
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
    await this.spendEdgePool(S.counters.social.credibility, e);
  }
  async spendRumor(e) {
    await this.spendEdgePool(S.counters.mental.rumor, e);
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
    var n, r;
    const t = this.getAttributeValue(S.actorAttributes.edge), s = ((r = (n = this.getEdgePools()) == null ? void 0 : n[e]) == null ? void 0 : r.value) ?? t ?? 0;
    return Math.min(s, t ?? s ?? 0);
  }
  getRemainingEdge(e = void 0) {
    return e ? this.getEdgePoolValue(e) : Math.max(0, ...Object.values(S.counters.edgePools).map((t) => this.getEdgePoolValue(t)));
  }
  canUseEdge() {
    return this.getAttributes().includes(S.actorAttributes.edge);
  }
  async spendEdgePool(e, t) {
    t != 0 && await _.addCounter(this, e, -t);
  }
  async spendEdge(e, t = S.counters.edgePools.grit) {
    if (e != 0) {
      if (!this.canUseEdge()) {
        const i = T.actorType[this.type] ?? this.type, s = `${this.name} (${i}) cannot use Edge`;
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
    const i = Xe._prepareFavorite(e, t);
    return !!this.system.favorites.find((s) => Xe._isSameFavorite(i, s));
  }
  static _prepareFavorite(e, t) {
    return { type: e, id: t };
  }
  static _isSameFavorite(e, t) {
    return e.id == t.id && e.type == t.type;
  }
  async switchFavorite(e, t, i) {
    const s = Xe._prepareFavorite(t, i), n = this.system.favorites.filter((r) => !Xe._isSameFavorite(s, r));
    e && n.push(s), this.update({ "system.favorites": n });
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
    const i = Xe._prepareFavorite(e, t);
    if (e == "attributeAction") {
      const n = ke.prepareShortcut(this, t);
      if (n)
        return foundry.utils.mergeObject(n, i);
    } else if (Object.values(S.itemType).includes(e)) {
      const n = (s = this.items.get(t)) == null ? void 0 : s.prepareShortcut();
      if (n)
        return foundry.utils.mergeObject(n, i);
    }
    return i;
  }
  async _onSetManualStepper(e, t) {
    var r, o;
    e == null || e.preventDefault();
    const i = (r = t == null ? void 0 : t.dataset) == null ? void 0 : r.id, s = Number((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.value);
    if (!i || Number.isNaN(s)) return;
    const n = this._mwd.state.manual.find((l) => l.id === i);
    if (n)
      return n.value = s, this.render(!1);
  }
}
const { ApplicationV2: Vd, HandlebarsApplicationMixin: Kd } = foundry.applications.api, { renderTemplate: Rr } = foundry.applications.handlebars, Yd = `${G}/chat/celebrity-roll.hbs`, Ii = class Ii extends Kd(Vd) {
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
        label: T.actor.counters.edgePools.legend,
        value: e.getCelebrityValue()
      },
      modifiers: foundry.utils.mergeObject(
        { label: T.item.tabs.modifiers },
        ne.computeModifiers(e.items, "other", "celebrity")
      ),
      other: {
        label: T.common.roll.modifiers.other,
        value: 0
      },
      ANARCHY: T
    }, i = await Rr(`${G}/dialog/roll-celebrite-title.hbs`, t), s = {
      id: `roll-celebrity-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Ii.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new Ii({ roll: t }, s).render({ force: !0 });
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
      await Ii.doRoll(this.roll), await this.close();
    }), i.find('[data-action="cancel"]').on("click", async () => {
      await this.close();
    });
  }
  static async doRoll(e) {
    const t = [
      e.celebrity,
      e.modifiers,
      e.other
    ], i = ee.sumValues(t, (o) => o.value), s = {
      actor: e.actor,
      parameters: t,
      pool: i,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      },
      ANARCHY: T
    }, n = new Roll(`${i}d6cs>=5`);
    await n.evaluate();
    const r = await Rr(Yd, s);
    await n.toMessage({ flavor: r });
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
R(Ii, "PARTS", {
  body: {
    template: `${G}/dialog/roll-celebrite.hbs`
  }
});
let nn = Ii;
const { renderTemplate: Qd } = foundry.applications.handlebars, Jd = `${G}/chat/actor-say-word.hbs`;
class Ir extends Xe {
  static get initiative() {
    return Xe.initiative + " + max(@attributes.reflexes.value, @attributes.intelligence.value)";
  }
  hasOwnAnarchy() {
    return this.hasPlayerOwner;
  }
  prepareDerivedData() {
    !this.system.monitors.fatigue && this.system.monitors.stun && (this.system.monitors.fatigue = foundry.utils.duplicate(this.system.monitors.stun)), this.system.monitors.physical.max = this._getMonitorMax(S.actorAttributes.strength), this.system.monitors.fatigue.max = this._getMonitorMax(S.actorAttributes.willpower), super.prepareDerivedData(), this.system.ignoreWounds = ne.sumModifiers(this.items, "other", "ignoreWounds");
  }
  computePhysicalState() {
    var l, c;
    const e = Math.max(0, Number(((l = this.system.monitors.armor) == null ? void 0 : l.max) ?? 0)), t = Math.min(
      e,
      Math.max(0, Number(((c = this.system.monitors.armor) == null ? void 0 : c.value) ?? 0))
    ), i = Math.max(0, e - t), s = Math.max(this.system.monitors.physical.max, this.system.monitors.fatigue.max) + e, n = this.system.monitors.physical.value == this.system.monitors.physical.max, r = this.system.monitors.fatigue.max == this.system.monitors.fatigue.value, o = n || r ? s : Math.max(this.system.monitors.physical.value, this.system.monitors.fatigue.value) + i;
    return {
      max: s,
      value: s - o
    };
  }
  getAttributes() {
    return Li[this.type] ?? Li[S.actorTypes.character];
  }
  getPhysicalAgility() {
    return S.actorAttributes.reflexes;
  }
  getCorrespondingAttribute(e) {
    return S.itemAttributes.firewall == e ? S.itemAttributes.firewall : super.getCorrespondingAttribute(e);
  }
  getDamageMonitor(e) {
    switch (e = this.resolveDamageType(e), e) {
      case S.monitors.fatigue:
      case S.monitors.physical:
        return e;
    }
    return super.getDamageMonitor(e);
  }
  async createWord(e, t) {
    this._mutateWords(e, (i) => i.concat([{ word: t, audio: "" }]));
  }
  async sayWord(e, t) {
    var s, n;
    const i = (s = this.getWord(e, t)) == null ? void 0 : s.word;
    i && ChatMessage.create({
      speaker: { alias: ((n = this.token) == null ? void 0 : n.name) ?? this.name },
      content: await Qd(
        Jd,
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
    this._mutateWords(e, (s) => s.map((n) => (n.id == t && i(n), n)));
  }
  async deleteWord(e, t) {
    this._mutateWords(e, (i) => i.filter((s) => s.id != t));
  }
  async _mutateWords(e, t = (i) => i) {
    if (!e)
      return;
    let i = t(this.system[e]);
    ee.reindexIds(i), await this.update({ [`system.${e}`]: i });
  }
  getCelebrityValue() {
    return this.getEdgePoolValue(S.counters.social.legend);
  }
  getCredibilityValue() {
    return this.getEdgePoolValue(S.counters.social.credibility);
  }
  getRumorValue() {
    return this.getEdgePoolValue(S.counters.mental.rumor);
  }
  getAnarchy() {
    return this.hasOwnAnarchy() ? {
      value: this.system.counters.anarchy.value,
      max: this.system.counters.anarchy.max,
      scene: this.getAnarchyScene()
    } : super.getAnarchy();
  }
  getAnarchyScene() {
    return this.getEdgePoolValue(S.counters.edgePools.chaos);
  }
  async spendAnarchy(e) {
    if (e > 0) {
      const t = this.getAnarchyScene(), i = this.getAnarchyValue();
      bi.checkSufficient(T.actor.counters.anarchy, e, i + t);
      const s = Math.min(t, e), n = e - s;
      s > 0 && _.addCounter(this, S.monitors.sceneAnarchy, -s), this.hasPlayerOwner ? (await game.system.anarchy.gmAnarchy.actorGivesAnarchyToGM(this, e), _.addCounter(this, S.monitors.anarchy, -n)) : n > 0 && super.spendAnarchy(n);
    }
  }
  canUseEdge() {
    return !0;
  }
  getWounds() {
    const e = ee.divint(this.system.monitors.fatigue.value, 3) + ee.divint(this.system.monitors.physical.value, 3);
    return Math.max(0, e - this.system.ignoreWounds);
  }
  async rollCelebrity() {
    await nn.create(this);
  }
}
class Sl extends Xe {
  prepareDerivedData() {
    this._prepareMwdAttributes(), this._prepareMwdMonitors(), this._prepareMwdItems(), super.prepareDerivedData();
  }
  static get defaultIcon() {
    return `${Za}/default/Default_Vehicle.svg`;
  }
  static get initiative() {
    return Xe.initiative + " + max(@attributes.system.value, @attributes.handling.value)";
  }
  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    };
  }
  getAttributes() {
    return Li[this.type] ?? Li[S.actorTypes.vehicle];
  }
  getPhysicalAgility() {
    return S.actorAttributes.handling;
  }
  getDamageMonitor(e) {
    switch (e = this.resolveDamageType(e), e) {
      case S.monitors.physical:
        return S.monitors.structure;
      case S.monitors.fatigue:
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
      [S.actorAttributes.handling]: { value: 0 },
      [S.actorAttributes.system]: { value: 0 },
      [S.actorAttributes.condition]: { value: 0 },
      [S.actorAttributes.chassis]: { value: 0 }
    }, i = foundry.utils.mergeObject(
      foundry.utils.duplicate(t),
      this.system.attributes ?? {},
      { inplace: !1, recursive: !0 }
    );
    this.system.attributes = i, e.attributes = foundry.utils.mergeObject(
      foundry.utils.duplicate(t),
      e.attributes ?? {},
      { inplace: !1, recursive: !0 }
    ), Object.entries(e.attributes).forEach(([s, n]) => {
      var r;
      ((r = i[s]) == null ? void 0 : r.value) === void 0 && (i[s] = i[s] ?? {}, i[s].value = (n == null ? void 0 : n.value) ?? 0);
    });
  }
  _prepareMwdMonitors() {
    var s, n, r, o, l, c, u, d;
    const e = this.system.mwd = this.system.mwd ?? {}, t = this.system.monitors = this.system.monitors ?? {}, i = {
      value: ((s = t.structure) == null ? void 0 : s.value) ?? 0,
      max: ((n = t.structure) == null ? void 0 : n.max) ?? (this.type === S.actorTypes.battlemech ? 18 : 15),
      resistance: Xe.normalizeResistance((r = t.structure) == null ? void 0 : r.resistance)
    };
    if (t.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(i),
      t.structure ?? {},
      { inplace: !1, recursive: !0 }
    ), e.monitors = e.monitors ?? {}, e.monitors.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(i),
      e.monitors.structure ?? {},
      { inplace: !1, recursive: !0 }
    ), this.type === S.actorTypes.battlemech) {
      const m = {
        value: ((o = t.heat) == null ? void 0 : o.value) ?? ((l = e.heat) == null ? void 0 : l.current) ?? 0,
        max: ((c = t.heat) == null ? void 0 : c.max) ?? ((u = e.heat) == null ? void 0 : u.hardMax) ?? 4,
        resistance: Xe.normalizeResistance((d = t.heat) == null ? void 0 : d.resistance)
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
      traits: ["trait", S.itemType.quality],
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
        this.items.filter((n) => s.includes(n.type))
      ])
    );
  }
}
const Dr = {
  light: 4,
  medium: 5,
  heavy: 6,
  assault: 7
}, Xd = { mode: "normal", allowedWeaponIds: [], typeRestriction: "" }, Zd = {
  baseProfile: { name: "Unarmed", damage: "", notes: "" },
  maxWeapons: 0,
  allowedLocations: []
};
class em {
  constructor(e) {
    this.actor = e, this.mwd = e.system.mwd ?? {};
  }
  compute() {
    const e = this.mwd.weightClass ?? "medium", t = Dr[e] ?? Dr.medium, i = this._normalizeHardpoints(), s = this._normalizeWeaponGroups(), n = s.find((y) => y.isPrimary), r = s.filter((y) => y.isPrimary), o = this._primarySlot(), l = [], c = [];
    r.length > 1 && l.push(T.mwd.loadout.errors.multiplePrimary);
    const u = n ? t - 1 : t, d = s.length + (n ? 1 : 0);
    s.length > u && l.push(be(T.mwd.loadout.errors.mountPointsExceeded, {
      used: d,
      total: t
    }));
    const m = this._getWeapons((y) => (y.system.weaponCategory ?? "ranged") !== "melee"), p = new Map(m.map((y) => [y.id, y])), f = /* @__PURE__ */ new Set(), h = i.map((y) => ({ ...y, occupiedBy: null, occupiedByName: void 0 }));
    for (const y of s)
      for (const b of y.weaponIds ?? []) {
        const A = p.get(b);
        if (!A) {
          c.push(be(T.mwd.loadout.warnings.weaponMissing, { weapon: b }));
          continue;
        }
        const v = A.system.hardpointType ?? "energy", C = A.system.hardpointSize ?? "small";
        if (f.has(b)) {
          l.push(be(T.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: A.name }));
          continue;
        }
        if (f.add(b), y.isPrimary && this._validatePrimaryWeapon(A, v, C, o, l), (A.system.weaponCategory ?? "ranged") === "melee")
          continue;
        const I = h.find((P) => !P.occupiedBy && P.type === v && P.size === C);
        I ? (I.occupiedBy = y.id, I.occupiedByName = y.name) : l.push(be(T.mwd.loadout.errors.hardpointUnavailable, {
          weapon: A.name,
          type: T.mwd.hardpointType[v] ?? v,
          size: T.mwd.hardpointSize[C] ?? C
        }));
      }
    n && (!n.weaponIds || n.weaponIds.length === 0) && l.push(T.mwd.loadout.errors.primaryWithoutWeapon);
    const g = this._computeMeleeState(l);
    return {
      mountPoints: {
        total: t,
        used: d,
        remaining: Math.max(0, t - d)
      },
      weightClass: e,
      hardpoints: h,
      weaponGroups: s,
      primaryGroupId: n == null ? void 0 : n.id,
      errors: l,
      warnings: c,
      meleeProfiles: g.profiles,
      meleeLimit: g.limit
    };
  }
  _normalizeWeaponGroups() {
    return (this.mwd.weaponGroups ?? []).map((e, t) => ({
      id: e.id ?? `group-${t + 1}`,
      name: e.name || be(T.common.newName, { type: T.itemType.singular.weapon }),
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
    const e = foundry.utils.mergeObject(foundry.utils.duplicate(Xd), this.mwd.primarySlot ?? {});
    return e.allowedWeaponIds = this._asArray(e.allowedWeaponIds), e;
  }
  _computeMeleeState(e) {
    var o, l, c;
    const t = foundry.utils.mergeObject(foundry.utils.duplicate(Zd), this.mwd.melee ?? {}), i = this._getWeapons((u) => (u.system.weaponCategory ?? "ranged") === "melee"), s = [], n = Number(t.maxWeapons ?? 0);
    i.length > n && e.push(be(T.mwd.loadout.errors.meleeLimitExceeded, {
      equipped: i.length,
      limit: n
    }));
    const r = this._asArray(t.allowedLocations);
    return s.push({
      name: ((o = t.baseProfile) == null ? void 0 : o.name) || T.mwd.melee.baseProfile,
      damage: ((l = t.baseProfile) == null ? void 0 : l.damage) ?? "",
      notes: ((c = t.baseProfile) == null ? void 0 : c.notes) ?? ""
    }), i.forEach((u) => {
      var d;
      r.length > 0 && u.system.mountLocation && !r.includes(u.system.mountLocation) && e.push(be(T.mwd.loadout.errors.meleeLocationRestricted, {
        weapon: u.name,
        location: T.mwd.meleeLocation[u.system.mountLocation] ?? u.system.mountLocation
      })), s.push({
        name: u.name,
        damage: u.getDamageCode(),
        notes: ((d = u.system.references) == null ? void 0 : d.description) ?? ""
      });
    }), { profiles: s, limit: n };
  }
  _validatePrimaryWeapon(e, t, i, s, n) {
    var r;
    s.mode === "converted" ? (((r = s.allowedWeaponIds) == null ? void 0 : r.length) > 0 && !s.allowedWeaponIds.includes(e.id) && n.push(be(T.mwd.loadout.errors.primaryNotAllowedWeapon, { weapon: e.name })), s.typeRestriction && t !== s.typeRestriction && n.push(be(T.mwd.loadout.errors.primaryTypeRestriction, {
      weapon: e.name,
      type: T.mwd.hardpointType[s.typeRestriction] ?? s.typeRestriction
    }))) : i !== "large" && n.push(be(T.mwd.loadout.errors.primaryNeedsLarge, { weapon: e.name }));
  }
  _getWeapons(e) {
    return this.actor.items.filter((t) => t.type === S.itemType.mechWeapon).filter((t) => {
      var i;
      return (i = t.isActive) == null ? void 0 : i.call(t);
    }).filter(e);
  }
  _asArray(e) {
    return Array.isArray(e) ? e : e == null || e === "" ? [] : [e];
  }
}
class tm extends Sl {
  static get defaultIcon() {
    return `${Za}/vehicles/apc.svg`;
  }
  prepareDerivedData() {
    var e;
    super.prepareDerivedData(), this.system.mwd = this.system.mwd ?? {}, this.system.mwd.chassis = this.system.mwd.chassis ?? "", this.system.mwd.tonnage = this.system.mwd.tonnage ?? 0, this.system.mwd.loadout = new em(this).compute(), this.system.mwd.weaponGroupDetails = this._prepareConfiguredWeaponGroups(), this.system.mwd.heat = this._prepareHeatTrack(), this.system.mwd.primaryGroupName = ((e = this.system.mwd.weaponGroupDetails.find((t) => t.isPrimary)) == null ? void 0 : e.name) ?? "", this.system.skills = this._prepareSkillMap(), this.system.weaponGroups = this._prepareWeaponGroups(), this.system.meleeProfiles = this._prepareMeleeProfiles(), this.system.quickActions = {
      primaryWeaponGroup: this.system.weaponGroups.find((t) => t.isPrimary),
      hasSensorSweep: !!(this.system.skills.perception || this.system.skills.technician)
    };
  }
  async rollRangedAttack() {
    const e = this.system.weaponGroups ?? [];
    if (e.length === 0) {
      ui.notifications.warn(T.actor.vehicle.quickActions.errors.noRanged);
      return;
    }
    const t = await this._promptWeaponGroup(e);
    if (!t)
      return;
    const i = t.weaponIds.map((s) => this.items.get(s)).filter((s) => s);
    await this._rollQuickSkill(this.system.skills.gunnery, {
      quickAction: {
        title: T.actor.vehicle.quickActions.rangedAttack,
        weaponGroup: this._serializeWeaponGroup(t, i)
      }
    });
  }
  async rollMeleeAttack() {
    const e = this.system.meleeProfiles ?? [];
    if (e.length === 0) {
      ui.notifications.warn(T.actor.vehicle.quickActions.errors.noMelee);
      return;
    }
    const t = await this._promptMeleeProfile(e);
    t && await this._rollQuickSkill(this.system.skills.melee, {
      quickAction: {
        title: T.actor.vehicle.quickActions.meleeAttack,
        meleeProfile: t
      }
    });
  }
  async rollDodge() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: T.actor.vehicle.quickActions.dodgeCheck }
    });
  }
  async rollPilotingCheck() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: T.actor.vehicle.quickActions.pilotingCheck }
    });
  }
  async rollSensorSweep() {
    const e = [this.system.skills.perception, this.system.skills.technician].filter((i) => i);
    if (e.length === 0) {
      ui.notifications.warn(T.actor.vehicle.quickActions.errors.noSensorSweep);
      return;
    }
    const t = await this._promptSensorSweepSkill(e);
    t && await this._rollQuickSkill(t, {
      quickAction: {
        title: T.actor.vehicle.quickActions.sensorSweep,
        skillName: t.name
      }
    });
  }
  async rollEmergencyRepair() {
    await this._rollQuickSkill(this.system.skills.technician, {
      quickAction: { title: T.actor.vehicle.quickActions.emergencyRepair }
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
    }, n = foundry.utils.mergeObject(s, i, { inplace: !1 });
    n.thresholds = foundry.utils.mergeObject(s.thresholds, i.thresholds ?? {}, { inplace: !1 }), n.current = t.value ?? n.current, n.max = t.max ?? n.max;
    const r = this._resolveHeatStatus(n.current, n.thresholds, n.max);
    return this.system.mwd.heatStatus = {
      code: r,
      label: T.actor.battlemech.heat.status[r] ?? r
    }, n;
  }
  _resolveHeatStatus(e, t, i) {
    return e >= ((t == null ? void 0 : t.shutdown) ?? i) ? "shutdown" : e >= ((t == null ? void 0 : t.overheated) ?? i) ? "overheated" : e >= ((t == null ? void 0 : t.runningHot) ?? 0) ? "runningHot" : "safe";
  }
  _prepareConfiguredWeaponGroups() {
    var i;
    const e = ((i = this.system.mwd) == null ? void 0 : i.weaponGroups) ?? [], t = new Map(this.items.map((s) => [s.id, s]));
    return e.map((s, n) => {
      const r = Array.isArray(s.weaponIds) ? s.weaponIds : s.weaponIds ? [s.weaponIds] : [], o = r.map((c) => t.get(c)).filter((c) => (c == null ? void 0 : c.type) === S.itemType.mechWeapon), l = r.filter((c) => !t.has(c));
      return {
        id: s.id ?? `group-${n + 1}`,
        index: n,
        name: s.name || be(T.common.newName, { type: T.itemType.singular.weapon }),
        weaponIds: r,
        isPrimary: s.isPrimary ?? !1,
        weapons: o,
        missingWeaponIds: l
      };
    });
  }
  _resolveSkill(e) {
    var s;
    const t = this.items.find((n) => n.type === S.itemType.skill && n.system.code === e);
    if (t)
      return t;
    const i = ct(e);
    if (i)
      return {
        name: i.label ?? ((s = T.skill) == null ? void 0 : s[e]) ?? e,
        system: {
          code: e,
          attribute: i.attribute,
          value: 0
        }
      };
  }
  _prepareWeaponGroups() {
    var n;
    const e = (((n = this.system.mwd) == null ? void 0 : n.weaponGroupDetails) ?? []).map((r) => ({
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
    const t = this.items.filter((r) => r.type === S.itemType.mechWeapon);
    if (t.length === 0)
      return [];
    const i = t.filter((r) => this.hasFavorite(S.itemType.mechWeapon, r.id)), s = [];
    return i.length > 0 && s.push({
      id: "favorite",
      name: T.actor.vehicle.quickActions.primaryWeapons,
      weaponIds: i.map((r) => r.id),
      isPrimary: !0
    }), s.push({
      id: "all",
      name: T.actor.vehicle.quickActions.allWeapons,
      weaponIds: t.map((r) => r.id),
      isPrimary: s.length === 0
    }), s;
  }
  _prepareMeleeProfiles() {
    const e = [{
      id: "unarmed",
      name: T.actor.vehicle.quickActions.unarmed,
      weaponId: null,
      damage: 1,
      notes: T.actor.vehicle.quickActions.unarmedNotes
    }], t = this.items.filter((i) => i.type === S.itemType.mechWeapon && i.system.skill === "meleeCombat");
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
    var n;
    const i = ((n = e == null ? void 0 : e.system) == null ? void 0 : n.attribute) ?? this.getPhysicalAgility(), s = foundry.utils.mergeObject(ht.prepareActorRoll(this), {
      mode: We.rollType.skill,
      skill: e,
      attribute1: i,
      specialization: void 0
    });
    t.quickAction && (s.quickAction = t.quickAction), await ht.create(s);
  }
  async _promptWeaponGroup(e) {
    if (e.length === 1)
      return e[0];
    const t = e.find((n) => n.isPrimary) ?? e[0], i = `<form class="mwd-quick-select">${e.map((n) => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${n.id}" ${n.id === t.id ? "checked" : ""}>
        <span>${n.name}${n.isPrimary ? ` (${T.actor.vehicle.quickActions.primaryLabel})` : ""}</span>
      </label>`).join("")}</form>`, s = await Dialog.prompt({
      title: T.actor.vehicle.quickActions.selectWeaponGroup,
      content: i,
      label: T.common.roll.button,
      callback: (n) => n.find('input[name="weapon-group"]:checked').val() ?? t.id
    });
    return e.find((n) => n.id === s) ?? t;
  }
  async _promptMeleeProfile(e) {
    if (e.length === 1)
      return e[0];
    const t = e[0], i = `<form class="mwd-quick-select">${e.map((n) => `
      <label class="quick-select-option">
        <input type="radio" name="melee-profile" value="${n.id}" ${n.id === t.id ? "checked" : ""}>
        <span>${n.name}</span>
      </label>`).join("")}</form>`, s = await Dialog.prompt({
      title: T.actor.vehicle.quickActions.selectMeleeProfile,
      content: i,
      label: T.common.roll.button,
      callback: (n) => n.find('input[name="melee-profile"]:checked').val() ?? t.id
    });
    return e.find((n) => n.id === s) ?? t;
  }
  async _promptSensorSweepSkill(e) {
    if (e.length === 1)
      return e[0];
    const t = `<form class="mwd-quick-select">${e.map((s) => `
      <label class="quick-select-option">
        <input type="radio" name="sensor-skill" value="${s.system.code}">
        <span>${s.name}</span>
      </label>`).join("")}</form>`, i = await Dialog.prompt({
      title: T.actor.vehicle.quickActions.selectSensorSkill,
      content: t,
      label: T.common.roll.button,
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
const xa = "activeModifiers", Kn = [
  { value: "", label: "All Attributes" },
  { value: "reflexes", label: "Reflexes" },
  { value: "strength", label: "Strength" },
  { value: "willpower", label: "Willpower" },
  { value: "charisma", label: "Charisma" },
  { value: "intelligence", label: "Intelligence" },
  { value: "edge", label: "Edge" }
], Yn = [
  { value: "", label: "All Intents" },
  { value: "skill", label: "Skill" },
  { value: "attack", label: "Attack" },
  { value: "defense", label: "Defense" },
  { value: "common", label: "Common" },
  { value: "attribute", label: "Attribute" },
  { value: "edge", label: "Edge" },
  { value: "initiative", label: "Initiative" }
];
function Or(a) {
  const e = String(a ?? "").trim();
  return e === "" ? null : e;
}
function im(a) {
  return String((a == null ? void 0 : a.intent) ?? "").trim() || null;
}
function am(a) {
  var e, t, i;
  return ((e = a == null ? void 0 : a.data) == null ? void 0 : e.attrKey) ?? // skill rolls
  ((i = (t = a == null ? void 0 : a.attack) == null ? void 0 : t.skill) == null ? void 0 : i.attribute) ?? // attack rolls
  null;
}
function _r(a, e) {
  return a ? e ? a === e : !1 : !0;
}
function Al(a) {
  return {
    id: String((a == null ? void 0 : a.id) ?? ""),
    label: String((a == null ? void 0 : a.label) ?? "").trim(),
    value: Math.trunc(Number((a == null ? void 0 : a.value) ?? 0)) || 0,
    enabled: (a == null ? void 0 : a.enabled) !== !1,
    attributeFilter: Or(a == null ? void 0 : a.attributeFilter),
    intentFilter: Or(a == null ? void 0 : a.intentFilter),
    source: (a == null ? void 0 : a.source) === "preset" ? "preset" : "adhoc"
  };
}
class sm {
  constructor() {
    R(this, "id", "mwd.sceneModifiers");
  }
  collect({ resolved: e } = {}) {
    var r;
    const t = (r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.getFlag("mwd", xa);
    if (!Array.isArray(t) || !t.length) return [];
    const i = im(e), s = am(e), n = [];
    for (const o of t) {
      const l = Al(o);
      l.enabled && _r(l.intentFilter, i) && _r(l.attributeFilter, s) && n.push({
        id: l.id || `scene:${l.label}`,
        label: l.label,
        value: l.value,
        source: "Scene"
      });
    }
    return n;
  }
}
const nm = `systems/${w}/templates/settings/collection-editor.hbs`, wl = /* @__PURE__ */ new Map(), Ns = /* @__PURE__ */ new Map();
function St(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid settings data.");
  return t.validationErrors = e, t;
}
function ma(a) {
  om(a), wl.set(a.id, a), game.settings.register(w, a.settingKey, {
    scope: "world",
    config: !1,
    type: a.settingType ?? Object,
    default: a.defaultData()
  }), game.settings.registerMenu(w, a.menuKey, {
    name: a.menu.name,
    label: a.menu.label,
    hint: a.menu.hint,
    icon: a.menu.icon,
    type: lm(a.id),
    restricted: a.menu.restricted ?? !0
  });
}
function rm(a) {
  return wl.get(a) ?? null;
}
function om(a) {
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
function lm(a) {
  if (Ns.has(a))
    return Ns.get(a);
  class e extends Tl {
  }
  return R(e, "definitionId", a), Ns.set(a, e), e;
}
var Y, kl, rn, Ba, Fa, Ei, on, Vi, vl, Ml, je;
class Tl extends FormApplication {
  constructor(t = {}, i = {}) {
    super(t, i);
    Te(this, Y);
    const s = M(this, Y, Fa).call(this);
    this.editorState = {
      tab: "rows",
      rows: this.definition.toRows(s),
      bulkText: this.definition.serializeBulk(s),
      errors: []
    };
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: `${w}-${this.definitionId}-editor`,
      classes: ["mwd", "mwd-settings-editor"],
      template: nm,
      width: 880,
      height: 760,
      resizable: !0,
      submitOnChange: !1,
      closeOnSubmit: !1
    }, { inplace: !1 });
  }
  get definition() {
    const t = rm(this.constructor.definitionId);
    if (!t)
      throw new Error(`Missing settings collection definition: ${this.constructor.definitionId}`);
    return t;
  }
  get title() {
    var t;
    return this.definition.title ?? ((t = this.definition.menu) == null ? void 0 : t.name) ?? "Settings Editor";
  }
  getData(t = {}) {
    const i = M(this, Y, Ml).call(this), s = this.editorState.rows.map((n, r, o) => ({
      index: r,
      fields: i.map((l) => M(this, Y, vl).call(this, l, n, r)),
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
      columns: i.map((n) => ({ key: n.key, label: n.label })),
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
      s.addEventListener("click", (n) => {
        var l;
        const r = n.currentTarget, o = String(((l = r == null ? void 0 : r.dataset) == null ? void 0 : l.action) ?? "").trim();
        o && M(this, Y, kl).call(this, o, n, r);
      });
    });
  }
  async _onSubmit(t, { updateData: i = null, preventClose: s = !0, preventRender: n = !0 } = {}) {
    return super._onSubmit(t, { updateData: i, preventClose: s, preventRender: n });
  }
  async _updateObject(t, i) {
    var s;
    M(this, Y, je).call(this, []);
    try {
      const n = this.editorState.tab === "bulk" ? this.definition.parseBulk(M(this, Y, Vi).call(this)) : this.definition.rowsToValue(M(this, Y, on).call(this));
      await game.settings.set(w, this.definition.settingKey, n);
      const r = M(this, Y, Fa).call(this);
      M(this, Y, Ba).call(this, r), await this.close();
    } catch (n) {
      M(this, Y, je).call(this, wa(n)), this.editorState.errors.length && ((s = ui.notifications) == null || s.error(this.editorState.errors[0])), this.render(!1);
    }
  }
}
Y = new WeakSet(), kl = async function(t, i, s) {
  var n, r, o, l, c, u, d, m;
  switch (i.preventDefault(), i.stopPropagation(), t) {
    case "switchRows":
      M(this, Y, Vi).call(this), this.editorState.tab = "rows", M(this, Y, je).call(this, []), this.render(!1);
      return;
    case "switchBulk":
      M(this, Y, Ei).call(this);
      try {
        const p = this.definition.rowsToValue(this.editorState.rows);
        this.editorState.bulkText = this.definition.serializeBulk(p), this.editorState.tab = "bulk", M(this, Y, je).call(this, []);
      } catch (p) {
        M(this, Y, je).call(this, wa(p)), this.editorState.errors.length && ((n = ui.notifications) == null || n.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "addRow":
      M(this, Y, Ei).call(this), this.editorState.rows.push(((o = (r = this.definition).createEmptyRow) == null ? void 0 : o.call(r)) ?? {}), M(this, Y, je).call(this, []), this.render(!1);
      return;
    case "removeRow":
      M(this, Y, Ei).call(this), this.editorState.rows.splice(Number(((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.index) ?? -1), 1), M(this, Y, je).call(this, []), this.render(!1);
      return;
    case "moveRowUp":
      M(this, Y, Ei).call(this), M(this, Y, rn).call(this, Number(((c = s == null ? void 0 : s.dataset) == null ? void 0 : c.index) ?? -1), -1), M(this, Y, je).call(this, []), this.render(!1);
      return;
    case "moveRowDown":
      M(this, Y, Ei).call(this), M(this, Y, rn).call(this, Number(((u = s == null ? void 0 : s.dataset) == null ? void 0 : u.index) ?? -1), 1), M(this, Y, je).call(this, []), this.render(!1);
      return;
    case "loadBulk":
      try {
        const p = this.definition.parseBulk(M(this, Y, Vi).call(this));
        this.editorState.rows = this.definition.toRows(p), this.editorState.bulkText = this.definition.serializeBulk(p), this.editorState.tab = "rows", M(this, Y, je).call(this, []);
      } catch (p) {
        M(this, Y, je).call(this, wa(p)), this.editorState.errors.length && ((d = ui.notifications) == null || d.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "formatBulk":
      try {
        const p = this.definition.parseBulk(M(this, Y, Vi).call(this));
        this.editorState.bulkText = this.definition.serializeBulk(p), M(this, Y, je).call(this, []);
      } catch (p) {
        M(this, Y, je).call(this, wa(p)), this.editorState.errors.length && ((m = ui.notifications) == null || m.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "resetSetting":
      M(this, Y, Ba).call(this, M(this, Y, Fa).call(this)), this.render(!1);
      return;
    case "restoreDefaults":
      M(this, Y, Ba).call(this, this.definition.defaultData()), this.render(!1);
      return;
    case "cancel":
      await this.close();
      return;
    default:
      return;
  }
}, rn = function(t, i) {
  if (!Number.isInteger(t)) return;
  const s = t + i;
  if (t < 0 || s < 0 || s >= this.editorState.rows.length) return;
  const n = [...this.editorState.rows], [r] = n.splice(t, 1);
  n.splice(s, 0, r), this.editorState.rows = n;
}, Ba = function(t) {
  this.editorState.rows = this.definition.toRows(t), this.editorState.bulkText = this.definition.serializeBulk(t), this.editorState.tab = "rows", M(this, Y, je).call(this, []);
}, Fa = function() {
  const t = game.settings.get(w, this.definition.settingKey);
  return foundry.utils.deepClone(t ?? this.definition.defaultData());
}, Ei = function() {
  this.editorState.rows = M(this, Y, on).call(this);
}, on = function() {
  const t = foundry.utils.expandObject(this._getSubmitData()), i = (t == null ? void 0 : t.rows) ?? {};
  return Object.keys(i).sort((s, n) => Number(s) - Number(n)).map((s) => {
    const n = i[s] ?? {};
    return Object.fromEntries(
      this.definition.rowSchema.map((r) => [
        r.key,
        String((n == null ? void 0 : n[r.key]) ?? "")
      ])
    );
  });
}, Vi = function() {
  var s;
  const t = this.form, i = (s = t == null ? void 0 : t.querySelector) == null ? void 0 : s.call(t, 'textarea[name="bulkText"]');
  return i instanceof HTMLTextAreaElement && (this.editorState.bulkText = i.value), this.editorState.bulkText ?? "";
}, vl = function(t, i, s) {
  const n = t.type ?? "text", r = String((i == null ? void 0 : i[t.key]) ?? t.default ?? ""), o = n === "select" ? cm(t).map((l) => ({
    value: String(l.value ?? ""),
    label: String(l.label ?? l.value ?? ""),
    selected: String(l.value ?? "") === r
  })) : [];
  return {
    key: t.key,
    label: t.label,
    type: n,
    inputType: n === "select" ? "text" : n,
    name: `rows.${s}.${t.key}`,
    value: r,
    placeholder: t.placeholder ?? "",
    min: t.min ?? "",
    max: t.max ?? "",
    step: t.step ?? "",
    options: o
  };
}, Ml = function() {
  return this.definition.rowSchema.map((t) => ({
    ...t,
    type: t.type ?? "text"
  }));
}, je = function(t = []) {
  this.editorState.errors = Array.isArray(t) ? t.filter(Boolean) : [];
}, R(Tl, "definitionId", "");
function cm(a) {
  const e = typeof a.options == "function" ? a.options() : a.options;
  return Array.isArray(e) ? e : [];
}
function wa(a) {
  const e = Array.isArray(a == null ? void 0 : a.validationErrors) ? a.validationErrors.filter(Boolean) : [String((a == null ? void 0 : a.message) ?? "Unable to save settings.").trim()].filter(Boolean);
  return e.length ? e : ["Unable to save settings."];
}
const ln = "sceneModifierTemplates", um = "sceneModifierTemplateEditor", dm = Object.freeze([]);
function ni(a) {
  const e = String(a ?? "").trim();
  return e === "" ? "" : e;
}
function Cl(a = []) {
  const e = [], t = [], i = /* @__PURE__ */ new Set();
  if ((Array.isArray(a) ? a : []).forEach((s, n) => {
    const r = String((s == null ? void 0 : s.label) ?? "").trim(), o = String((s == null ? void 0 : s.value) ?? "").trim(), l = `Row ${n + 1}`;
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
      attributeFilter: ni(s == null ? void 0 : s.attributeFilter),
      intentFilter: ni(s == null ? void 0 : s.intentFilter)
    });
  }), t.length) throw St(t);
  return e;
}
function mm(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => ({
    label: String((e == null ? void 0 : e.label) ?? ""),
    value: String((e == null ? void 0 : e.value) ?? "0"),
    attributeFilter: ni(e == null ? void 0 : e.attributeFilter),
    intentFilter: ni(e == null ? void 0 : e.intentFilter)
  }));
}
function pm(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw St([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  if (!Array.isArray(t))
    throw St(["Bulk JSON must be an array."]);
  return Cl(t.map((i) => ({
    label: String((i == null ? void 0 : i.label) ?? ""),
    value: String((i == null ? void 0 : i.value) ?? "0"),
    attributeFilter: ni(i == null ? void 0 : i.attributeFilter),
    intentFilter: ni(i == null ? void 0 : i.intentFilter)
  })));
}
function fm(a = []) {
  return JSON.stringify(
    (Array.isArray(a) ? a : []).map((e) => ({
      label: String((e == null ? void 0 : e.label) ?? ""),
      value: Number((e == null ? void 0 : e.value) ?? 0),
      attributeFilter: ni(e == null ? void 0 : e.attributeFilter),
      intentFilter: ni(e == null ? void 0 : e.intentFilter)
    })),
    null,
    2
  );
}
const hm = {
  id: "scene-modifier-templates",
  menuKey: um,
  settingKey: ln,
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
      options: Kn
    },
    {
      key: "intentFilter",
      label: "Intent Filter",
      type: "select",
      options: Yn
    }
  ],
  menu: {
    name: "Scene Modifier Templates",
    label: "Configure",
    hint: "Edit the preset scene modifier templates available in the GM Gadget.",
    icon: "fas fa-cloud",
    restricted: !0
  },
  defaultData: () => foundry.utils.deepClone(dm),
  createEmptyRow: () => ({
    label: "",
    value: "0",
    attributeFilter: "",
    intentFilter: ""
  }),
  toRows: mm,
  rowsToValue: Cl,
  parseBulk: pm,
  serializeBulk: fm
};
function gm() {
  ma(hm);
}
const { ApplicationV2: ym, HandlebarsApplicationMixin: bm } = foundry.applications.api, Sm = "mwd-gmgadget", El = "gmDnPresets", za = "gmNextDn", Ki = "gmDnAnnounceToChat", Am = Object.freeze([
  { label: "Standard", dn: 1 },
  { label: "Challenging", dn: 2 },
  { label: "Hard", dn: 3 },
  { label: "Extreme", dn: 4 }
]), wm = "systems/mwd/templates/v2/mwd-gmgadget.hbs", Yi = Object.freeze({
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
function Tm(a = "") {
  return String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean).map((e) => {
    const [t, i] = e.split(":").map((r) => (r ?? "").trim()), s = t || "DN", n = Number.isFinite(Number(i)) ? Number(i) : Number(t);
    return {
      label: s,
      dn: Number.isFinite(n) ? Math.max(0, Math.trunc(n)) : null
    };
  }).filter((e) => Number.isFinite(e.dn));
}
function km(a = []) {
  const e = new Error(a[0] ?? "Invalid GM DN presets.");
  return e.validationErrors = Array.isArray(a) ? a.filter(Boolean) : [], e;
}
function vm() {
  return foundry.utils.deepClone(Am);
}
function pa(a, { strict: e = !1 } = {}) {
  const t = typeof a == "string" ? Tm(a) : Array.isArray(a) ? a : [], i = [], s = [], n = /* @__PURE__ */ new Set();
  if (t.forEach((r, o) => {
    const l = String((r == null ? void 0 : r.label) ?? "").trim(), c = r == null ? void 0 : r.dn, u = `Preset ${o + 1}`;
    if (!l) {
      e && s.push(`${u}: label cannot be blank.`);
      return;
    }
    const d = l.toLowerCase();
    if (n.has(d)) {
      e && s.push(`${u}: duplicate label "${l}".`);
      return;
    }
    const m = Number(c);
    if (!Number.isFinite(m)) {
      e && s.push(`${u}: DN must be numeric.`);
      return;
    }
    if (m < 0) {
      e && s.push(`${u}: DN cannot be negative.`);
      return;
    }
    n.add(d), i.push({
      label: l,
      dn: Math.trunc(m)
    });
  }), e && s.length) throw km(s);
  return i;
}
function Rs(a = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(Yi),
    a ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function Mm(a) {
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
function Cm(a) {
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
function Em(a) {
  return tt.getStatusOptions(a);
}
function Pm(a = "mwd") {
  game.settings.register(a, za, {
    scope: "client",
    config: !1,
    type: Number,
    default: 1
  }), game.settings.register(a, Ki, {
    scope: "client",
    config: !0,
    name: "Announce GM DN changes to chat",
    hint: "If enabled, posts a small chat notice when you change the current DN preset.",
    type: Boolean,
    default: !1
  });
}
const ze = class ze extends bm(ym) {
  constructor({ systemId: e = "mwd", ...t } = {}) {
    super(t), this.systemId = e, this.activeTab = "difficulty", this.harmState = Rs();
  }
  async render(e = {}) {
    var t;
    return (t = game.user) != null && t.isGM ? super.render(e) : this;
  }
  async _prepareContext(e) {
    var f, h, g, y;
    const t = await super._prepareContext(e), i = pa(
      game.settings.get(this.systemId, El),
      { strict: !1 }
    ), s = Number(game.settings.get(this.systemId, za) ?? 1), n = !!game.settings.get(this.systemId, Ki), r = tt.getActorOptions(), o = tt.getSceneTarget(), l = this.harmState.actorId ? ((h = (f = game.actors) == null ? void 0 : f.get) == null ? void 0 : h.call(f, this.harmState.actorId)) ?? null : null, c = tt.resolveTarget({
      actor: l,
      actorId: this.harmState.actorId,
      preferSceneTarget: !0
    }), u = Em(c.actor ?? l ?? null), d = Rs(this.harmState);
    !d.statusId && u.length && (d.statusId = u[0].value, this.harmState.statusId = d.statusId);
    const m = Lr(
      game.settings.get(this.systemId, ln)
    ), p = $r(
      (g = canvas == null ? void 0 : canvas.scene) == null ? void 0 : g.getFlag("mwd", xa)
    );
    return foundry.utils.mergeObject(t, {
      presets: i,
      currentDn: s,
      currentTab: this.activeTab,
      announce: n,
      isGM: ((y = game.user) == null ? void 0 : y.isGM) ?? !1,
      scene: {
        hasScene: !!(canvas != null && canvas.scene),
        templates: m,
        activeModifiers: p,
        attributeFilterOptions: Kn,
        intentFilterOptions: Yn
      },
      harm: {
        state: d,
        actorOptions: r,
        modes: tt.MODE_OPTIONS,
        damageTypes: qd,
        statusOptions: u,
        sceneTarget: Mm(o),
        effectiveTarget: Cm(c),
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
    var n;
    const t = ((n = e == null ? void 0 : e.closest) == null ? void 0 : n.call(e, ".mwd-gmgadget__root")) ?? this._getRootElement();
    if (!(t instanceof HTMLElement)) return this.harmState;
    const i = (r, o = "") => {
      const l = t.querySelector(r);
      return l instanceof HTMLInputElement || l instanceof HTMLSelectElement || l instanceof HTMLTextAreaElement ? l.value : o;
    }, s = (r, o = !1) => {
      const l = t.querySelector(r);
      return l instanceof HTMLInputElement ? l.checked : o;
    };
    return this.harmState = Rs({
      actorId: i('[name="harm-actorId"]', this.harmState.actorId),
      mode: i('[name="harm-mode"]', this.harmState.mode),
      delta: Number(i('[name="harm-delta"]', this.harmState.delta)),
      useArmor: s('[name="harm-useArmor"]', this.harmState.useArmor),
      damageType: i('[name="harm-damageType"]', this.harmState.damageType),
      statusId: i('[name="harm-statusId"]', this.harmState.statusId),
      statusActive: i('[name="harm-statusActive"]', this.harmState.statusActive ? "add" : "remove") !== "remove",
      source: i('[name="harm-source"]', this.harmState.source),
      notes: i('[name="harm-notes"]', this.harmState.notes)
    }), Number.isFinite(Number(this.harmState.delta)) || (this.harmState.delta = Yi.delta), this.harmState;
  }
  async _onSetDn(e, t) {
    var n, r, o;
    if (e.preventDefault(), e.stopPropagation(), !((n = game.user) != null && n.isGM)) return;
    const i = Math.max(0, Math.trunc(Number(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.dn) ?? NaN)));
    if (!Number.isFinite(i)) return;
    if (await game.settings.set(this.systemId, za, i), !!game.settings.get(this.systemId, Ki)) {
      const l = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.label) ?? `DN ${i}`);
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ user: game.user }),
        content: `<div class="mwd-gm-notice"><b>GM Difficulty:</b> ${foundry.utils.escapeHTML(l)} (DN ${i} hits)</div>`
      });
    }
    return this.render({ parts: ["body"] });
  }
  async _onSwitchTab(e, t) {
    var s, n, r;
    (s = e == null ? void 0 : e.preventDefault) == null || s.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e);
    const i = String(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.tab) ?? "").trim();
    if (!(!i || i === this.activeTab))
      return this._captureHarmStateFromDom(t), this.activeTab = i, this.render({ parts: ["body"] });
  }
  async _onClearDn(e, t) {
    var i;
    if (e.preventDefault(), e.stopPropagation(), !!((i = game.user) != null && i.isGM))
      return await game.settings.set(this.systemId, za, 1), this.render({ parts: ["body"] });
  }
  async _onToggleAnnounce(e, t) {
    var s;
    if (e.preventDefault(), e.stopPropagation(), !((s = game.user) != null && s.isGM)) return;
    const i = !game.settings.get(this.systemId, Ki);
    return await game.settings.set(this.systemId, Ki, i), this.render({ parts: ["body"] });
  }
  async _onHarmInputChange(e, t) {
    var s, n;
    (s = e == null ? void 0 : e.preventDefault) == null || s.call(e), this._captureHarmStateFromDom(t);
    const i = String(((n = t == null ? void 0 : t.dataset) == null ? void 0 : n.harmKey) ?? "").trim();
    if (["actorId", "mode", "useArmor"].includes(i))
      return this.render({ parts: ["body"] });
  }
  async _onRefreshHarmTarget(e, t) {
    var i, s;
    return (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (s = e == null ? void 0 : e.stopPropagation) == null || s.call(e), this._captureHarmStateFromDom(t), this.render({ parts: ["body"] });
  }
  async _onApplyHarm(e, t) {
    var r, o, l, c, u;
    if ((r = e == null ? void 0 : e.preventDefault) == null || r.call(e), (o = e == null ? void 0 : e.stopPropagation) == null || o.call(e), !((l = game.user) != null && l.isGM)) return;
    const i = this._captureHarmStateFromDom(t), s = this._buildHarmPayload(i);
    if (!s) {
      (c = ui.notifications) == null || c.warn("Choose a valid harm action before applying it.");
      return;
    }
    const n = await tt.apply({
      payload: s,
      options: {
        actorId: i.actorId,
        preferSceneTarget: !0,
        logToChat: !0
      }
    });
    return n != null && n.ok ? this.render({ parts: ["body"] }) : ((u = ui.notifications) == null || u.warn((n == null ? void 0 : n.reason) ?? "Unable to apply harm."), this.render({ parts: ["body"] }));
  }
  _buildHarmPayload(e) {
    const t = String((e == null ? void 0 : e.source) ?? "").trim(), i = String((e == null ? void 0 : e.notes) ?? "").trim(), s = String((e == null ? void 0 : e.mode) ?? "").trim();
    if (s === "status") {
      const n = String((e == null ? void 0 : e.statusId) ?? "").trim();
      return n ? {
        mode: "status",
        statusId: n,
        active: !!(e != null && e.statusActive),
        source: t,
        notes: i
      } : null;
    }
    return s === "burn" ? {
      mode: "burnDelta",
      delta: xr(e == null ? void 0 : e.delta, Yi.delta),
      source: t,
      notes: i
    } : s === "physical" || s === "fatigue" ? {
      mode: "trackDelta",
      track: s,
      delta: xr(e == null ? void 0 : e.delta, Yi.delta),
      useArmor: !!(e != null && e.useArmor),
      damageType: (e == null ? void 0 : e.damageType) ?? Yi.damageType,
      source: t,
      notes: i
    } : null;
  }
  // ---- Scene modifier actions ----
  async _onAddSceneModifierFromPreset(e, t) {
    var l, c, u, d;
    if ((l = e == null ? void 0 : e.preventDefault) == null || l.call(e), (c = e == null ? void 0 : e.stopPropagation) == null || c.call(e), !((u = game.user) != null && u.isGM)) return;
    const i = ((d = t == null ? void 0 : t.closest) == null ? void 0 : d.call(t, ".mwd-gmgadget__root")) ?? this._getRootElement(), s = i instanceof HTMLElement ? i.querySelector('select[name="scene-preset-index"]') : null, n = s instanceof HTMLSelectElement ? Number(s.value) : NaN, r = Lr(
      game.settings.get(this.systemId, ln)
    ), o = Number.isFinite(n) ? r[n] : null;
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
    var s, n, r, o;
    if ((s = e == null ? void 0 : e.preventDefault) == null || s.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), !((r = game.user) != null && r.isGM)) return;
    const i = this._captureAdhocFormFromDom(t);
    if (!i) {
      (o = ui.notifications) == null || o.warn("Label and a numeric value are required.");
      return;
    }
    await this._mutateSceneModifiers((l) => [...l, i]);
  }
  async _onToggleSceneModifier(e, t) {
    var s, n, r, o;
    if ((s = e == null ? void 0 : e.preventDefault) == null || s.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), !((r = game.user) != null && r.isGM)) return;
    const i = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.modId) ?? "").trim();
    i && await this._mutateSceneModifiers(
      (l) => l.map((c) => c.id === i ? { ...c, enabled: !c.enabled } : c)
    );
  }
  async _onRemoveSceneModifier(e, t) {
    var s, n, r, o;
    if ((s = e == null ? void 0 : e.preventDefault) == null || s.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), !((r = game.user) != null && r.isGM)) return;
    const i = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.modId) ?? "").trim();
    i && await this._mutateSceneModifiers((l) => l.filter((c) => c.id !== i));
  }
  async _onClearSceneModifiers(e, t) {
    var i, s, n;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (s = e == null ? void 0 : e.stopPropagation) == null || s.call(e), (n = game.user) != null && n.isGM && await this._mutateSceneModifiers(() => []);
  }
  async _mutateSceneModifiers(e) {
    const t = canvas == null ? void 0 : canvas.scene;
    if (!t) return;
    const i = $r(t.getFlag("mwd", xa)), s = await e(i);
    return await t.setFlag("mwd", xa, s), this.render({ parts: ["body"] });
  }
  _captureAdhocFormFromDom(e) {
    var c;
    const t = ((c = e == null ? void 0 : e.closest) == null ? void 0 : c.call(e, ".mwd-gmgadget__root")) ?? this._getRootElement();
    if (!(t instanceof HTMLElement)) return null;
    const i = (u) => {
      const d = t.querySelector(u);
      return d instanceof HTMLInputElement || d instanceof HTMLSelectElement ? d.value : "";
    }, s = i('[name="scene-adhoc-label"]').trim(), n = i('[name="scene-adhoc-value"]').trim(), r = i('[name="scene-adhoc-attributeFilter"]').trim() || null, o = i('[name="scene-adhoc-intentFilter"]').trim() || null;
    if (!s) return null;
    const l = Number(n);
    return Number.isFinite(l) ? {
      id: foundry.utils.randomID(),
      label: s,
      value: Math.trunc(l),
      enabled: !0,
      attributeFilter: r,
      intentFilter: o,
      source: "adhoc"
    } : null;
  }
};
R(ze, "DEFAULT_OPTIONS", {
  id: Sm,
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
    addSceneModifierFromPreset: ze.prototype._onAddSceneModifierFromPreset,
    addSceneModifierAdhoc: ze.prototype._onAddSceneModifierAdhoc,
    toggleSceneModifier: ze.prototype._onToggleSceneModifier,
    removeSceneModifier: ze.prototype._onRemoveSceneModifier,
    clearSceneModifiers: ze.prototype._onClearSceneModifiers
  }
}), R(ze, "PARTS", {
  body: { template: wm }
});
let cn = ze;
function Lr(a) {
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
function $r(a) {
  return Array.isArray(a) ? a.map((e) => {
    var n, r;
    const t = Al(e), i = ((n = Kn.find((o) => o.value === (t.attributeFilter ?? ""))) == null ? void 0 : n.label) ?? null, s = ((r = Yn.find((o) => o.value === (t.intentFilter ?? ""))) == null ? void 0 : r.label) ?? null;
    return {
      ...t,
      attributeFilterLabel: t.attributeFilter ? i : null,
      intentFilterLabel: t.intentFilter ? s : null,
      signedValue: t.value >= 0 ? `+${t.value}` : String(t.value),
      isPositive: t.value > 0
    };
  }) : [];
}
function xr(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
let Is = null;
function Nm({ systemId: a = "mwd" } = {}) {
  return Is || (Is = new cn({ systemId: a })), Is;
}
const Rm = "gmDnPresetEditor";
function Im(a = []) {
  const e = [], t = [], i = /* @__PURE__ */ new Set();
  if ((Array.isArray(a) ? a : []).forEach((s, n) => {
    const r = String((s == null ? void 0 : s.label) ?? "").trim(), o = String((s == null ? void 0 : s.dn) ?? "").trim(), l = `Row ${n + 1}`;
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
  }), t.length) throw St(t);
  return pa(e, { strict: !0 });
}
function Dm(a = []) {
  return pa(a, { strict: !1 }).map((e) => ({
    label: e.label,
    dn: String(e.dn)
  }));
}
function Om(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw St([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return pa(t, { strict: !0 });
}
function _m(a = []) {
  return JSON.stringify(
    pa(a, { strict: !1 }),
    null,
    2
  );
}
const Lm = {
  id: "gm-dn-presets",
  menuKey: Rm,
  settingKey: El,
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
  defaultData: vm,
  createEmptyRow: () => ({
    label: "",
    dn: "1"
  }),
  toRows: Dm,
  rowsToValue: Im,
  parseBulk: Om,
  serializeBulk: _m
};
function $m() {
  ma(Lm);
}
const xm = "lifeModuleCatalogEditor";
function Bm(a = []) {
  return Ai((Array.isArray(a) ? a : []).map((e) => ({
    id: String((e == null ? void 0 : e.id) ?? ""),
    moduleType: String((e == null ? void 0 : e.moduleType) ?? ""),
    label: String((e == null ? void 0 : e.label) ?? ""),
    grants: String((e == null ? void 0 : e.grants) ?? ""),
    requiresAny: String((e == null ? void 0 : e.requiresAny) ?? ""),
    excludesAny: String((e == null ? void 0 : e.excludesAny) ?? "")
  })), { strict: !0 });
}
function Fm(a = []) {
  return Ai(a, { strict: !1 }).map((e) => ({
    id: e.id,
    moduleType: e.moduleType,
    label: e.label,
    grants: Sd(e.grants),
    requiresAny: e.requiresAny.join(", "),
    excludesAny: e.excludesAny.join(", ")
  }));
}
function zm(a = "") {
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
  return Ai(t, { strict: !0 });
}
function Wm(a = []) {
  return JSON.stringify(
    Ai(a, { strict: !1 }),
    null,
    2
  );
}
const Um = {
  id: "life-module-catalog",
  menuKey: xm,
  settingKey: Oi,
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
      options: ul
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
  defaultData: qn,
  createEmptyRow: () => ({
    id: "",
    moduleType: "childhood",
    label: "",
    grants: "",
    requiresAny: "",
    excludesAny: ""
  }),
  toRows: Fm,
  rowsToValue: Bm,
  parseBulk: zm,
  serializeBulk: Wm
};
function jm() {
  ma(Um);
}
const Hm = "personalActionCatalogEditor", Br = Object.freeze([
  { value: "false", label: "No" },
  { value: "true", label: "Yes" }
]);
function qm(a = []) {
  try {
    return ua((Array.isArray(a) ? a : []).map((e) => ({
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
    throw St(
      Array.isArray(e.validationErrors) ? e.validationErrors : [e.message]
    );
  }
}
function Gm(a = []) {
  return ua(a, { strict: !1 }).map((e) => {
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
function Vm(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw St([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  try {
    return ua(t, { strict: !0 });
  } catch (i) {
    throw St(
      Array.isArray(i.validationErrors) ? i.validationErrors : [i.message]
    );
  }
}
function Km(a = []) {
  return JSON.stringify(
    ua(a, { strict: !1 }),
    null,
    2
  );
}
const Ym = {
  id: "personal-action-catalog",
  menuKey: Hm,
  settingKey: tl,
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
      options: () => Xs
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
      options: () => il
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
      options: () => Br
    },
    {
      key: "prominentWhenBurning",
      label: "Burn Highlight",
      type: "select",
      options: () => Br
    }
  ],
  menu: {
    name: "Personal Action Catalog",
    label: "Configure",
    hint: "Edit the personal combat action menus and first-pass action handlers.",
    icon: "fas fa-list-check",
    restricted: !0
  },
  defaultData: jn,
  createEmptyRow: () => {
    var a;
    return {
      id: "",
      label: "",
      category: ((a = Xs[0]) == null ? void 0 : a.value) ?? "standard",
      cost: "1",
      handler: "combatAction",
      reason: "",
      rollIntent: "",
      prominent: "false",
      prominentWhenBurning: "false"
    };
  },
  toRows: Gm,
  rowsToValue: qm,
  parseBulk: Vm,
  serializeBulk: Km
};
function Qm() {
  ma(Ym);
}
const Jm = "skillSpecializationEditor";
function un() {
  return qa().map((a) => ({
    value: a.code,
    label: a.label
  }));
}
function Xm(a = []) {
  const e = new Set(un().map((s) => s.value)), t = {}, i = [];
  if ((Array.isArray(a) ? a : []).forEach((s, n) => {
    const r = String((s == null ? void 0 : s.skillCode) ?? "").trim(), o = String((s == null ? void 0 : s.label) ?? "").trim(), l = `Row ${n + 1}`;
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
  }), i.length) throw St(i);
  return as(t, { strict: !0 });
}
function Zm(a = {}) {
  const e = as(a, { strict: !1 });
  return Object.entries(e).flatMap(
    ([t, i]) => i.map((s) => ({ skillCode: t, label: s }))
  );
}
function ep(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return {};
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw St([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return as(t, { strict: !0 });
}
function tp(a = {}) {
  return JSON.stringify(
    as(a, { strict: !1 }),
    null,
    2
  );
}
const ip = {
  id: "skill-specializations",
  menuKey: Jm,
  settingKey: Ks,
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
      options: un
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
  defaultData: Lo,
  createEmptyRow: () => {
    var a;
    return {
      skillCode: ((a = un()[0]) == null ? void 0 : a.value) ?? "",
      label: ""
    };
  },
  toRows: Zm,
  rowsToValue: Xm,
  parseBulk: ep,
  serializeBulk: tp
};
function ap() {
  ma(ip);
}
class sp {
  static register() {
    $m(), jm(), Qm(), ap(), gm(), game.settings.register(w, "useDestinyMechanics", {
      name: T.settings.useDestinyMechanics.name,
      hint: T.settings.useDestinyMechanics.hint,
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
    });
  }
  static getSystemProperty(e, t) {
    return game.settings.get(w, e) ?? t;
  }
}
class np extends Error {
  constructor(e, { severity: t = "error" } = {}) {
    super(e), this.name = "UserFacingRollError", this.userFacing = !0, this.severity = t === "warn" ? "warn" : "error";
  }
}
function Ni(a, e = {}) {
  return new np(a, e);
}
function Ya(a, e = "Unable to execute roll.") {
  var i, s;
  const t = a != null && a.userFacing && (a == null ? void 0 : a.severity) === "warn" ? "warn" : "error";
  (s = (i = ui.notifications) == null ? void 0 : i[t]) == null || s.call(i, (a == null ? void 0 : a.message) ?? e);
}
const { HandlebarsApplicationMixin: rp } = foundry.applications.api, { HTMLField: op } = foundry.data.fields;
function lp(a) {
  const e = new op({ required: !1, blank: !0, initial: "" });
  return e.name = a, e;
}
var nt, la, Xt, ri, dn, mn;
const qe = class qe extends rp(foundry.applications.sheets.ActorSheetV2) {
  constructor() {
    super(...arguments);
    Te(this, ri);
    Te(this, nt, !1);
    /** Track active CSB tab per group across rerenders */
    Te(this, la, /* @__PURE__ */ new Map());
    // group -> tabId
    Te(this, Xt, /* @__PURE__ */ new Map());
  }
  /** @override */
  _updatePosition(t) {
    const i = super._updatePosition(t), {
      MIN_WIDTH: s,
      MAX_WIDTH: n,
      MIN_HEIGHT: r,
      MAX_HEIGHT: o
    } = this.constructor;
    return typeof i.width == "number" && (i.width = Math.min(
      n,
      Math.max(s, i.width)
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
    return z(this, nt);
  }
  toggleEditing() {
    if (this.isEditable) {
      if (z(this, nt)) {
        this._commitEditsToActor().finally(() => {
          De(this, nt, !z(this, nt)), this.render({ force: !0 });
        });
        return;
      }
      De(this, nt, !z(this, nt)), this.render({ force: !0 });
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
    var n, r;
    const t = this.actor ?? this.document ?? null, i = (t == null ? void 0 : t.token) ?? null, s = (n = this.document) != null && n.isToken ? ((r = this.document) == null ? void 0 : r.token) ?? i ?? null : i;
    return s ? (s == null ? void 0 : s.document) ?? s : null;
  }
  /**
   * Resolve the document that should persist actor-backed state.
   * Linked token sheets should write to the base actor document so state survives scene changes.
   */
  getPersistentActor() {
    var s, n, r;
    const t = this.actor ?? this.document ?? null;
    if (!t) return null;
    const i = this.getSheetTokenDocument();
    return i != null && i.isLinked ? i.baseActor ?? ((r = (s = game.actors) == null ? void 0 : s.get) == null ? void 0 : r.call(s, ((n = i == null ? void 0 : i.baseActor) == null ? void 0 : n.id) ?? "")) ?? i.actor ?? t : t;
  }
  /** @override */
  _initializeApplicationOptions(t) {
    var o, l, c, u, d;
    t = super._initializeApplicationOptions(t), t.classes = Array.from(t.classes ?? []);
    const i = (t == null ? void 0 : t.document) ?? this.document, s = (i == null ? void 0 : i.type) ?? ((o = this.actor) == null ? void 0 : o.type);
    s && t.classes.push(String(s));
    const n = ((d = (u = (c = (l = game.system) == null ? void 0 : l.anarchy) == null ? void 0 : c.styles) == null ? void 0 : u.selectCssClass) == null ? void 0 : d.call(u)) ?? "mwd-theme-default", r = ["mwd-theme-default", "mwd-theme-sra"];
    for (let m = t.classes.length - 1; m >= 0; m--)
      r.includes(t.classes[m]) && t.classes.splice(m, 1);
    return t.classes.push(n), t;
  }
  /**
   * No localization: provide a concrete title so Foundry doesn't show "TYPES.Actor.<type>".
   * @override
   */
  get title() {
    var r, o;
    const t = ((r = this.actor) == null ? void 0 : r.type) ?? "actor", s = {
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
    var r, o;
    let t = ((r = super._getHeaderControls) == null ? void 0 : r.call(this)) ?? [];
    const i = ((o = this.document) == null ? void 0 : o.isToken) ?? !1, s = /* @__PURE__ */ new Set();
    i ? (s.add("prototypeToken"), s.add("configurePrototypeToken")) : (s.add("token"), s.add("configureToken")), t = t.filter((l) => {
      const c = (l == null ? void 0 : l.action) ?? "", u = String((l == null ? void 0 : l.label) ?? "");
      return !(s.has(c) || i && u.includes("Prototype") || !i && u === "Token");
    });
    const n = /* @__PURE__ */ new Set();
    return t = t.filter((l) => {
      const c = l == null ? void 0 : l.action, u = c ? `a:${c}` : `il:${(l == null ? void 0 : l.icon) ?? ""}|${(l == null ? void 0 : l.label) ?? ""}`;
      return n.has(u) ? !1 : (n.add(u), !0);
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
    const n = s.dataset.tab, r = s.closest(".csb-tabs");
    if (!r || !n) return;
    const o = r.dataset.group || "default";
    z(this, la).set(o, n), M(this, ri, dn).call(this, r, n);
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const s = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!s) return;
    const n = s.dataset.section, r = s.closest(".csb-accordion");
    if (!r || !n) return;
    const o = r.dataset.group || "default", c = (z(this, Xt).has(o) ? z(this, Xt).get(o) : r.dataset.default || null) === n ? null : n;
    z(this, Xt).set(o, c), M(this, ri, mn).call(this, r, c);
  }
  /**
   * Universal roll action: data-action="roll" + data-roll='{"intent":"skill","key":"gunnery"}'
   */
  async _onRollAction(t, i) {
    var c, u, d, m, p, f, h, g, y;
    (c = t == null ? void 0 : t.preventDefault) == null || c.call(t);
    const s = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, "[data-roll]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-roll]")), n = (p = s == null ? void 0 : s.dataset) == null ? void 0 : p.roll;
    if (!n) return;
    let r;
    try {
      r = JSON.parse(n);
    } catch (b) {
      console.warn("MWD | Invalid data-roll JSON:", n, b);
      return;
    }
    const o = !!(t != null && t.shiftKey), l = ((f = game.mwd) == null ? void 0 : f.roll) ?? ((g = (h = game.system) == null ? void 0 : h.mwd) == null ? void 0 : g.roll);
    if (!(l != null && l.execute)) {
      (y = ui.notifications) == null || y.error("MWD roll system not initialized (game.mwd.roll.execute missing).");
      return;
    }
    try {
      return await l.execute({ actor: this.actor, payload: r, event: t, quick: o });
    } catch (b) {
      return console.error("MWD | Failed to execute roll action", b), Ya(b, "Unable to execute that roll."), null;
    }
  }
  async _onEditImage(t, i) {
    var r, o, l;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable || !this.editing) return;
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
    var n, r, o;
    (n = super._onRender) == null || n.call(this, t, i);
    const s = this._getRootElement();
    if (s) {
      for (const l of s.querySelectorAll(".csb-tabs")) {
        const c = l.dataset.group || "default", u = z(this, la).get(c), d = l.dataset.default || ((r = l.querySelector(".csb-tab-link[data-tab]")) == null ? void 0 : r.dataset.tab), m = u || d;
        m && M(this, ri, dn).call(this, l, m);
      }
      for (const l of s.querySelectorAll(".csb-accordion")) {
        const c = l.dataset.group || "default", u = z(this, Xt).has(c) ? z(this, Xt).get(c) : l.dataset.default || null;
        M(this, ri, mn).call(this, l, u);
      }
      s.querySelectorAll(".csb-tabs").length && !s.querySelector(".csb-tab-panel.is-active") && console.warn(`${fe} CSB tabs present but no active tab applied. Check element root resolution and CSS .is-active selectors.`, {
        sheet: (o = this.constructor) == null ? void 0 : o.name
      });
      for (const l of s.querySelectorAll('prose-mirror[name="system.biography.history"]'))
        l.addEventListener("change", (c) => {
          c.preventDefault(), this._updateRichTextHistory(l);
        });
    }
  }
  async _updateRichTextHistory(t) {
    if (!this.isEditable || (t == null ? void 0 : t.name) !== "system.biography.history") return;
    const i = String(t.value ?? ""), s = String(foundry.utils.getProperty(this.actor, "system.biography.history") ?? "");
    if (i !== s)
      try {
        await (this.getPersistentActor() ?? this.actor).update({ "system.biography.history": i });
      } catch (n) {
        console.warn("MWD | Rich text history update failed:", n);
      }
  }
  async _commitEditsToActor() {
    const t = this.element;
    if (!t) return;
    const i = t.querySelectorAll('input[name][data-edit-field="staged"], select[name][data-edit-field="staged"], textarea[name][data-edit-field="staged"]');
    if (!i.length) return;
    const s = {};
    for (const n of i) {
      const r = n.getAttribute("name");
      if (!r || n.disabled) continue;
      let o;
      if (n instanceof HTMLInputElement)
        if (n.type === "checkbox") o = n.checked;
        else if (n.type === "radio") {
          if (!n.checked) continue;
          o = n.value;
        } else n.type === "number" ? o = Number(n.value) : o = n.value;
      else
        o = n.value;
      typeof o == "number" && Number.isNaN(o) && (o = 0), o = this._clampByPath(r, o), foundry.utils.getProperty(this.actor, r) !== o && (s[r] = o);
    }
    if (Object.keys(s).length)
      try {
        await (this.getPersistentActor() ?? this.actor).update(s);
      } catch (n) {
        console.warn("MWD | Commit failed (permissions or validation):", n);
      }
  }
  /** @override */
  async _prepareContext(t) {
    var r, o, l, c, u, d, m, p, f, h, g;
    console.log(`${fe}BaseActorSheetV2._prepareContext:start`, {
      actorName: (r = this.actor) == null ? void 0 : r.name,
      actorType: (o = this.actor) == null ? void 0 : o.type
    });
    const i = await super._prepareContext(t), s = foundry.utils.deepClone((i == null ? void 0 : i.options) ?? {});
    s.classes = Array.from(((l = this.options) == null ? void 0 : l.classes) ?? []), s.cssClass = s.classes.join(" ");
    const n = foundry.utils.mergeObject(
      i,
      {
        actor: this.actor,
        system: (c = this.actor) == null ? void 0 : c.system,
        editable: this.isEditable,
        owner: ((u = this.document) == null ? void 0 : u.isOwner) ?? !1,
        limited: !(((d = this.document) == null ? void 0 : d.isOwner) ?? !1),
        editing: z(this, nt),
        // Template contract
        data: this.actor,
        // legacy alias
        options: s,
        // safe, template-only
        cssClass: s.cssClass
      },
      { inplace: !1 }
    );
    return n.options.owner = n.owner, n.options.limited = n.limited, n.options.editable = n.editable, n.options.editing = n.editing, n.options.viewMode = !n.editing, n.skillsDisplay = xo(((m = this.actor) == null ? void 0 : m.system) ?? {}), n.bio = {
      ...n.bio ?? {},
      fields: {
        history: lp("system.biography.history")
      }
    }, n.items ?? (n.items = {}), (p = this.actor) != null && p.items && typeof (ee == null ? void 0 : ee.classifyInto) == "function" && (ee.classifyInto(n.items, this.actor.items), n.items.weapon = [
      ...n.items.mechWeapon ?? [],
      ...n.items.personalWeapon ?? []
    ]), n.npcItems = {
      traits: n.items.quality ?? [],
      weapons: n.items.weapon ?? [],
      assetModules: n.items.assetModule ?? [],
      inventory: n.items.gear ?? []
    }, console.log(`${fe}BaseActorSheetV2._prepareContext:done`, {
      actorType: (f = this.actor) == null ? void 0 : f.type,
      cssClass: n.cssClass,
      itemCount: ((g = (h = this.actor) == null ? void 0 : h.items) == null ? void 0 : g.size) ?? 0,
      editing: z(this, nt)
    }), n;
  }
  /** Clamp certain actor system paths to valid ranges */
  _clampByPath(t, i) {
    return typeof i != "number" ? i : ((/^system\.skills\.[^.]+\.rating$/.test(t) || /^system\.attributes\.[^.]+\.value$/.test(t)) && (i = Math.trunc(i)), /^system\.skills\.[^.]+\.rating$/.test(t) ? Math.clamp(i, 0, 12) : /^system\.attributes\.[^.]+\.value$/.test(t) ? Math.clamp(i, 0, 10) : i);
  }
  /** Action handler: Condition Monitor set */
  async _onMonitorSet(t, i) {
    var p, f;
    if (t.preventDefault(), !this.isEditable) return;
    const s = String(((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.monitor) ?? "").trim(), n = Number((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.value);
    if (!s || !Number.isFinite(n)) return;
    const r = s === "burn" ? "system.burn.value" : `system.monitors.${s}.value`, o = Number(foundry.utils.getProperty(this.actor, r) ?? 0), l = s === "armor" ? n : o === n ? 0 : n, c = this.getPersistentActor() ?? this.actor;
    if (typeof (c == null ? void 0 : c.setMonitorValue) == "function")
      return c.setMonitorValue(s, l, { source: "sheet" });
    const u = `system.monitors.${s}`, d = Number(foundry.utils.getProperty(c, `${u}.max`)) || 0, m = Math.min(Math.max(0, l), Math.max(0, d));
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
nt = new WeakMap(), la = new WeakMap(), Xt = new WeakMap(), ri = new WeakSet(), /**
 * Apply active-state classes within a single .csb-tabs root.
 * Idempotent: safe to call every render.
 */
dn = function(t, i) {
  t.querySelectorAll(".csb-tab-link").forEach((s) => {
    s.classList.toggle("is-active", s.dataset.tab === i);
  }), t.querySelectorAll(".csb-tab-panel").forEach((s) => {
    s.classList.toggle("is-active", s.dataset.tab === i);
  });
}, mn = function(t, i) {
  t.dataset.activeSection = i ?? "", t.querySelectorAll(".csb-accordion__section").forEach((s) => {
    const n = s.dataset.section === i;
    s.classList.toggle("is-active", n);
  }), t.querySelectorAll(".csb-accordion__trigger").forEach((s) => {
    const n = s.dataset.section === i;
    s.classList.toggle("is-active", n), s.setAttribute("aria-expanded", n ? "true" : "false");
  }), t.querySelectorAll(".csb-accordion__panel").forEach((s) => {
    const n = s.closest(".csb-accordion__section"), r = (n == null ? void 0 : n.dataset.section) === i;
    s.classList.toggle("is-active", r);
  });
}, // ---- Hard minimum size (resize clamp) ----
R(qe, "MIN_WIDTH", 800), R(qe, "MAX_WIDTH", 950), R(qe, "MIN_HEIGHT", 600), R(qe, "MAX_HEIGHT", 1400), // group -> sectionId|null
/** @override */
R(qe, "DEFAULT_OPTIONS", foundry.utils.mergeObject(wi(qe, qe, "DEFAULT_OPTIONS"), {
  classes: ["sheet", "actor", w, "appv2", "mwd-sheet", "mwd-character-sheet"],
  position: { width: 760, height: 760 },
  window: { resizable: !0, minimizable: !0 },
  actions: {
    toggleViewMode: qe.prototype._onToggleViewMode,
    tab: qe.prototype._onClickTab,
    accordion: qe.prototype._onClickAccordion,
    roll: qe.prototype._onRollAction,
    monitorSet: qe.prototype._onMonitorSet,
    editImage: qe.prototype._onEditImage
  }
}, { inplace: !1 }));
let zi = qe;
var Zt, oi, Pl, Nl, Rl;
const ea = class ea {
  static async get(e) {
    if (z(this, Zt).has(e)) {
      const s = await z(this, Zt).get(e);
      if (Number((s == null ? void 0 : s.version) ?? 0) > 0) return s;
      z(this, Zt).delete(e);
    }
    const t = M(this, oi, Pl).call(this, e);
    z(this, Zt).set(e, t);
    const i = await t;
    return Number((i == null ? void 0 : i.version) ?? 0) <= 0 && z(this, Zt).delete(e), i;
  }
};
Zt = new WeakMap(), oi = new WeakSet(), Pl = async function(e) {
  const t = `systems/${w}/templates/v2/layouts/${e}.layout.json`;
  let i;
  try {
    const s = await fetch(t);
    if (!s.ok) throw new Error(`HTTP ${s.status} for ${t}`);
    i = await s.json();
  } catch (s) {
    console.error(`${fe}LayoutRegistry.get FAILED`, { layoutId: e, url: t, e: s }), i = { id: e, version: 0, root: { type: "stack", children: [] } };
  }
  return M(this, oi, Nl).call(this, i);
}, Nl = function(e) {
  const t = (i) => {
    var s;
    return !i || typeof i != "object" || (i.template ?? (i.template = M(s = ea, oi, Rl).call(s, i)), i.children = Array.isArray(i.children) ? i.children : [], Array.isArray(i.classes) || (typeof i.classes == "string" ? i.classes = i.classes.split(/\s+/).filter(Boolean) : i.classes = []), i.children = i.children.map(t), i.type === "tabs" && Array.isArray(i.tabs) && (i.tabs = i.tabs.map((n) => ({
      ...n,
      children: (Array.isArray(n.children) ? n.children : []).map(t)
    }))), i.type === "accordion" && Array.isArray(i.sections) ? i.sections = i.sections.map((n) => ({
      ...n,
      children: (Array.isArray(n.children) ? n.children : []).map(t)
    })) : i.type === "accordion" && (i.sections = [])), i;
  };
  return {
    ...e,
    root: t(e.root ?? { type: "stack", children: [] })
  };
}, Rl = function(e) {
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
}, Te(ea, oi), Te(ea, Zt, /* @__PURE__ */ new Map());
let Qa = ea;
function He(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function cp(a) {
  return String(a ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function Ta(a, e = 180) {
  const t = cp(a);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function Vt(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function ka(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim(),
    emphasis: e.emphasis ?? ""
  }));
}
function va(a = []) {
  return Vt(a).map((e) => ({ label: e }));
}
function Ma(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
const up = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}, dp = {
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
function Fr(a) {
  const e = Number(a ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function mp({ defenseBonus: a = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(a ?? 0) || 0;
  i !== 0 && t.push(`Defense ${Fr(i)}`);
  for (const [s, n] of Object.entries(up)) {
    const r = Number((e == null ? void 0 : e[s]) ?? 0) || 0;
    r !== 0 && t.push(`${n} ${Fr(r)}`);
  }
  return t.join(" | ");
}
function pp(a = {}, e = ["close", "near", "far", "extreme"]) {
  return e.map((t) => {
    const i = He(a == null ? void 0 : a[t], 0);
    return `${t.charAt(0).toUpperCase() + t.slice(1)} ${i}`;
  }).join(" | ");
}
function fp(a = {}) {
  return ["close", "near", "far", "extreme"].map((e) => `${e.charAt(0).toUpperCase()}${He(a == null ? void 0 : a[e], 0)}`).join(" ");
}
function hp(a = "") {
  const e = String(a ?? "").trim().toLowerCase();
  return e ? e.charAt(0).toUpperCase() + e.slice(1) : "";
}
function Ds(a) {
  return String(a ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function zr({ title: a, label: e, options: t = [], confirmLabel: i = "Select" } = {}) {
  const s = Array.isArray(t) ? t.filter((r) => r == null ? void 0 : r.value) : [];
  if (!s.length) return "";
  if (s.length === 1) return String(s[0].value ?? "").trim();
  const n = `<form class="mwd-quick-select"><div class="mwd-field"><label>${Ds(e)}</label><select name="selection">${s.map((r) => `<option value="${Ds(r.value)}">${Ds(r.label ?? r.value)}</option>`).join("")}</select></div></form>`;
  return await Dialog.prompt({
    title: a,
    content: n,
    label: i,
    callback: (r) => {
      var o;
      return String(r.find('select[name="selection"]').val() ?? ((o = s[0]) == null ? void 0 : o.value) ?? "").trim();
    }
  });
}
var Ze, ei, mi, ft, L, Il, fn, Wa, Dl, Ol, ve, Kt, Pi, _l, Yt, Qi;
const ye = class ye extends zi {
  constructor() {
    super(...arguments);
    Te(this, L);
    Te(this, Ze, null);
    Te(this, ei, null);
    Te(this, mi, null);
    Te(this, ft, /* @__PURE__ */ new Set());
  }
  /** @override */
  async _prepareContext(t) {
    var H, D, W, X, Z, ie, ue, Se, O, F, Le, J, Ye, it, _t, Lt, $t, xt, Bt, Ft, zt, Wt, Ut, dt, jt, Ht, qt;
    const i = await super._prepareContext(t), s = ((H = this.getSheetTokenDocument) == null ? void 0 : H.call(this)) ?? null;
    i._mwdThemeClass = game.system.mwd.styles.selectCssClass(), i.layout = await Qa.get("character");
    const n = ((W = (D = this.actor).getEdgeCap) == null ? void 0 : W.call(D)) ?? Number(((ie = (Z = (X = this.actor.system) == null ? void 0 : X.attributes) == null ? void 0 : Z.edge) == null ? void 0 : ie.value) ?? 0), r = !!this.isEditable, o = { physical: "Physical", mental: "Mental", social: "Social" }, l = {
      grit: "Grit",
      insight: "Insight",
      legend: "Legend",
      chaos: "Chaos",
      rumor: "Rumor",
      credibility: "Credibility"
    }, c = this.actor.getEdgePoolSummary ? this.actor.getEdgePoolSummary({ groups: Pn }) : { groups: [] };
    i.edgeConsole = {
      cap: n,
      editable: r,
      capPips: Array.from({ length: Math.max(0, n) }, (k, N) => N + 1),
      groups: (c.groups ?? []).map((k) => ({
        id: k.id,
        label: o[k.id] ?? k.id,
        pools: (k.pools ?? []).map((N) => {
          const q = Number(N.effectiveValue ?? 0), de = Number(N.effectiveMax ?? 0), he = Array.from({ length: Math.max(0, de) }, (Ee, j) => {
            const ae = j + 1;
            return { n: ae, filled: ae <= q };
          }), Ae = String(N.key ?? "").split(".").pop();
          return {
            key: N.key,
            label: l[Ae] ?? Ae ?? N.key,
            value: q,
            max: de,
            rating: Number(N.rating ?? 0),
            ratingBonus: Number(N.ratingBonus ?? 0),
            effectiveRating: Number(N.effectiveRating ?? N.rating ?? 0),
            isCapped: Number(N.effectiveRating ?? N.rating ?? 0) > Number(N.cap ?? n),
            pips: he,
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
        const q = String(N.key ?? "").split(".").pop();
        q && d.set(q, N), N.domain = k.id;
      }
    i.edgeConsole.poolsOrdered = u.map((k) => d.get(k)).filter(Boolean);
    const m = this.actor.system ?? {}, p = m.monitors ?? {}, f = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue", label: "Fatigue", kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor", label: "Armor", kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ], h = (k, N, q = 0) => {
      const de = foundry.utils.getProperty(k, N), he = Number(de);
      return Number.isFinite(he) ? he : q;
    };
    i.conditionMonitors = f.map((k) => {
      const N = (p == null ? void 0 : p[k.id]) ?? {}, q = Math.max(0, h(N, "max", 0)), de = Math.min(Math.max(0, h(N, "value", 0)), q);
      return {
        id: k.id,
        label: k.label,
        kind: k.kind,
        editable: !!this.isEditable,
        value: de,
        max: q,
        segments: Array.from({ length: q }, (he, Ae) => {
          const Ee = Ae + 1;
          return { value: Ee, filled: Ee <= de };
        }),
        status: k.status ? { label: k.status.label, value: h(N, k.status.path, 0) } : null
      };
    });
    const g = Number(((Se = (ue = this.actor.system) == null ? void 0 : ue.burn) == null ? void 0 : Se.value) ?? 0), y = 10, b = 6, A = Math.min(g, y);
    i.burnOverflow = Math.max(0, g - y), i.burnPenalty = Math.floor(g / 2), i.burnPips = Array.from({ length: y }, (k, N) => {
      const q = N + 1;
      return {
        pipValue: q,
        filled: q <= A,
        threshold: q === b
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
      overloaded: !!((F = (O = this.actor.system) == null ? void 0 : O.burn) != null && F.overloaded)
    };
    const v = oe.getSnapshot(this.actor, { token: s });
    i.combatDashboard = {
      targeting: v.targeting,
      rollImpact: v.rollImpact,
      states: v.states,
      effects: v.effects,
      activation: v.activation,
      inactiveReason: v.inactiveReason
    };
    const C = oe.buildActionModel(this.actor, v), I = new Set((C.menus ?? []).map((k) => k.id));
    z(this, Ze) && !I.has(z(this, Ze)) && De(this, Ze, null), i.combatActions = {
      ...C,
      menus: (C.menus ?? []).map((k) => ({
        ...k,
        isOpen: k.id === z(this, Ze)
      }))
    };
    const P = ((J = (Le = this.actor).getPersonalCombatLoadout) == null ? void 0 : J.call(Le)) ?? null;
    i.personalInventory = {
      warnings: [...(P == null ? void 0 : P.warnings) ?? []],
      weapons: ((P == null ? void 0 : P.weapons) ?? []).map((k) => {
        var Be, Ge, B, me, Tt, Ue, at;
        const N = M(this, L, Qi).call(this, "weapons", k.id), q = String((k == null ? void 0 : k.category) ?? "").trim().toLowerCase() !== "melee", de = !!((Be = k == null ? void 0 : k.sourceState) != null && Be.isTracked), he = String((k == null ? void 0 : k.payloadLabel) ?? "").trim() || "Unloaded", Ae = q && de ? `${He((Ge = k == null ? void 0 : k.sourceState) == null ? void 0 : Ge.current, 0)}/${He((B = k == null ? void 0 : k.sourceState) == null ? void 0 : B.max, 0)}` : "", Ee = q ? de ? `${he} ${Ae}` : he : "", j = q ? de ? `Payload ${Ae}` : `Payload ${he}` : "", ae = pp(k.attackRatingBand), $e = fp(k.attackRatingBand), xe = Ma([
          { label: "Skill", value: ((me = k.skillDef) == null ? void 0 : me.label) ?? k.skill ?? "" },
          { label: "Category", value: k.category ?? "" },
          { label: "Damage Type", value: k.damageTypeLabel ?? k.damageType ?? "" },
          { label: "Max Range", value: hp(((Tt = k.range) == null ? void 0 : Tt.max) ?? k.defaultRangeBand ?? "") },
          { label: "CQ Bands", value: ae },
          { label: "Payload", value: Ee },
          { label: "Traits", value: Vt(k.traits ?? []).join(", ") }
        ]);
        return {
          id: k.id,
          accordionId: N,
          isExpanded: z(this, ft).has(N),
          name: k.name,
          img: k.img,
          subtitle: ((Ue = k.skillDef) == null ? void 0 : Ue.label) ?? k.category ?? "",
          summaryStats: ka([
            { label: "DV", value: He(k.damage, 0), emphasis: "strong" },
            { label: "AP", value: He(k.ap, 0) },
            { label: "Type", value: k.damageTypeLabel ?? k.damageType ?? "" },
            { label: "CQ", value: $e }
          ]),
          detailTags: va([
            k.equipped ? "Equipped" : "",
            k.isPrimary ? "Primary" : "",
            j,
            ...Vt(k.traits ?? [])
          ]),
          detailRows: xe,
          detailText: Ta(k.notes),
          equipped: !!k.equipped,
          isPrimary: !!k.isPrimary,
          attackRoll: JSON.stringify({
            intent: "attack",
            weaponId: k.id,
            payloadId: ((at = k == null ? void 0 : k.payloadState) == null ? void 0 : at.activePayloadId) ?? "",
            edge: { pool: "physical.grit", allowed: ["pre", "post"] },
            tags: ["combat", "attack"]
          })
        };
      }),
      armor: ((P == null ? void 0 : P.armor) ?? []).map((k) => {
        var Ee, j, ae, $e, xe, Be, Ge, B, me, Tt, Ue, at, Zn, er;
        const N = ((Ee = P == null ? void 0 : P.activeArmor) == null ? void 0 : Ee.id) === k.id ? P.activeArmor : null, q = M(this, L, Qi).call(this, "armor", k.id), de = He(((ae = (j = N == null ? void 0 : N.traitState) == null ? void 0 : j.reinforced) == null ? void 0 : ae.max) ?? ((xe = ($e = k == null ? void 0 : k.traitState) == null ? void 0 : $e.reinforced) == null ? void 0 : xe.max), 0), he = de > 0 ? `${He(((Ge = (Be = N == null ? void 0 : N.traitState) == null ? void 0 : Be.reinforced) == null ? void 0 : Ge.current) ?? ((me = (B = k == null ? void 0 : k.traitState) == null ? void 0 : B.reinforced) == null ? void 0 : me.current), 0)}/${de}` : "", Ae = mp({
          defenseBonus: k.defenseBonus,
          mitigationByType: (N == null ? void 0 : N.mitigationByType) ?? (N == null ? void 0 : N.typedMitigation) ?? k.mitigationByType ?? {}
        });
        return {
          id: k.id,
          accordionId: q,
          isExpanded: z(this, ft).has(q),
          name: k.name,
          img: k.img,
          subtitle: (Tt = k.tags) != null && Tt.length ? k.tags.join(", ") : "Armor",
          summaryStats: ka([
            { label: "Rating", value: He((N == null ? void 0 : N.ratingCurrent) ?? k.rating, 0), emphasis: "strong" },
            { label: "Res", value: He((N == null ? void 0 : N.baseMitigation) ?? (N == null ? void 0 : N.baseResistance), 0) },
            { label: "Def", value: He(k.defenseBonus, 0) },
            { label: "Dur", value: `${He(((Ue = N == null ? void 0 : N.durability) == null ? void 0 : Ue.current) ?? ((at = k.durability) == null ? void 0 : at.current), 0)}/${He(((Zn = N == null ? void 0 : N.durability) == null ? void 0 : Zn.max) ?? ((er = k.durability) == null ? void 0 : er.max), 0)}` }
          ]),
          detailTags: va([
            k.equipped ? "Equipped" : "",
            k.isPrimary ? "Primary" : "",
            he ? `Reinforced ${he}` : "",
            ...Vt(k.traits ?? [])
          ]),
          detailRows: Ma([
            { label: "Modifiers", value: Ae },
            { label: "Traits", value: Vt(k.traits ?? []).join(", ") },
            { label: "Tags", value: Vt(k.tags ?? []).join(", ") }
          ]),
          detailText: Ta(k.notes),
          equipped: !!k.equipped,
          isPrimary: !!k.isPrimary
        };
      }),
      gear: (((Ye = i.items) == null ? void 0 : Ye.gear) ?? []).map((k) => {
        var j, ae, $e, xe, Be, Ge, B;
        const N = M(this, L, Qi).call(this, "gear", k.id), q = Math.max(0, Math.trunc(He(((j = k.system) == null ? void 0 : j.quantity) ?? 1, 1))), de = Math.max(0, Math.trunc(He(((ae = k.system) == null ? void 0 : ae.rating) ?? 0, 0))), he = Vt((($e = k.system) == null ? void 0 : $e.tags) ?? []), Ae = String(((xe = k.system) == null ? void 0 : xe.category) ?? "").trim(), Ee = dp[Ae] ?? Ae;
        return {
          id: k.id,
          itemType: "gear",
          isGear: !0,
          accordionId: N,
          isExpanded: z(this, ft).has(N),
          name: k.name,
          img: k.img,
          subtitle: Ee || "Gear",
          summaryStats: ka([
            { label: "Qty", value: q, emphasis: "strong" },
            { label: "Rating", value: de }
          ]),
          detailTags: va([
            ...he,
            (Be = k.system) != null && Be.inactive ? "Inactive" : ""
          ]),
          detailRows: Ma([
            { label: "Quantity", value: q },
            { label: "Rating", value: de },
            { label: "Source", value: ((Ge = k.system) == null ? void 0 : Ge.sourceReference) ?? "" },
            { label: "Category", value: Ee },
            { label: "Tags", value: he.join(", ") }
          ]),
          detailText: Ta((B = k.system) == null ? void 0 : B.description),
          quantity: q,
          canAdjustQuantity: this.isEditable
        };
      })
    }, i.bio = {
      fields: ((it = i.bio) == null ? void 0 : it.fields) ?? {},
      faction: ((_t = m.biography) == null ? void 0 : _t.faction) ?? "",
      age: ((Lt = m.biography) == null ? void 0 : Lt.age) ?? "",
      rank: (($t = m.biography) == null ? void 0 : $t.rank) ?? "",
      height: ((xt = m.biography) == null ? void 0 : xt.height) ?? "",
      weight: ((Bt = m.biography) == null ? void 0 : Bt.weight) ?? "",
      xpTotal: ((zt = (Ft = m.counters) == null ? void 0 : Ft.xp) == null ? void 0 : zt.total) ?? 0,
      xpSpent: ((Ut = (Wt = m.counters) == null ? void 0 : Wt.xp) == null ? void 0 : Ut.value) ?? 0,
      experienceLevel: ((dt = m.biography) == null ? void 0 : dt.experienceLevel) ?? "green",
      enrichedHistory: await foundry.applications.ux.TextEditor.implementation.enrichHTML(
        ((jt = m.biography) == null ? void 0 : jt.history) ?? "",
        { async: !0, secrets: this.actor.isOwner, relativeTo: this.actor }
      )
    };
    const x = si(this.actor);
    i.skillsDisplay = xo(((Ht = this.actor) == null ? void 0 : Ht.system) ?? {}, {
      bonusBySkill: x.bonusBySkill
    }), i.lifeModules = x.slotStates.map((k) => {
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
    const V = ["positive", "negative", "narrative"], Q = ["major", "minor"], K = [...((qt = i.items) == null ? void 0 : qt.quality) ?? []].sort((k, N) => {
      const q = ot(k.system ?? {}), de = ot(N.system ?? {}), he = V.indexOf(q.category) - V.indexOf(de.category);
      if (he !== 0) return he;
      const Ae = Q.indexOf(q.tier) - Q.indexOf(de.tier);
      return Ae !== 0 ? Ae : String(k.name ?? "").localeCompare(String(N.name ?? ""));
    });
    return i.qualityGroups = V.map((k) => ({
      id: k,
      label: Ra(k),
      records: K.filter((N) => ot(N.system ?? {}).category === k).map((N) => {
        var he, Ae, Ee, j;
        const q = ot(N.system ?? {}), de = M(this, L, Qi).call(this, "quality", N.id);
        return {
          id: N.id,
          accordionId: de,
          isExpanded: z(this, ft).has(de),
          name: N.name,
          img: N.img,
          subtitle: `${Ia(q.tier)} ${Ra(q.category)}`,
          summaryStats: ka([
            { label: "Tier", value: Ia(q.tier), emphasis: "strong" },
            { label: "Activation", value: q.activation || "passive" },
            { label: "Effects", value: String(((he = q.effects) == null ? void 0 : he.length) ?? 0) }
          ]),
          detailTags: va([
            q.inactive ? "Inactive" : "",
            ...q.tags ?? []
          ]),
          detailRows: Ma([
            { label: "Category", value: Ra(q.category) },
            { label: "Tier", value: Ia(q.tier) },
            { label: "Activation", value: q.activation || "passive" },
            { label: "Prerequisites", value: String(((Ae = q.prerequisites) == null ? void 0 : Ae.length) ?? 0) },
            { label: "Effects", value: String(((Ee = q.effects) == null ? void 0 : Ee.length) ?? 0) },
            { label: "Tags", value: Vt(q.tags ?? []).join(", ") }
          ]),
          detailText: Ta((j = N.system) == null ? void 0 : j.description)
        };
      })
    })), i;
  }
  _onRender(t, i) {
    super._onRender(t, i), M(this, L, Il).call(this), M(this, L, Ol).call(this);
  }
  async close(t = {}) {
    return M(this, L, fn).call(this), super.close(t);
  }
  requestCombatDashboardRefresh() {
    M(this, L, ve).call(this, { force: !0 });
  }
  async _onEdgeSet(t, i) {
    var c, u, d;
    if (t.preventDefault(), t.stopPropagation(), !this.isEditable) return;
    const s = ((c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-edge-pool][data-edge-value]")) ?? ((d = (u = t == null ? void 0 : t.target) == null ? void 0 : u.closest) == null ? void 0 : d.call(u, "[data-edge-pool][data-edge-value]"));
    if (!s) return;
    const n = String(s.dataset.edgePool ?? "").trim(), r = Number(s.dataset.edgeValue ?? NaN);
    if (!n || !Number.isFinite(r)) return;
    const o = this.actor.getEdgePool(n);
    if (!(o != null && o.hasPools)) return;
    let l = r;
    return r === o.effectiveValue && (l = r - 1), (t.button === 2 || t.type === "contextmenu") && (l = 0), t.altKey && (l = 0), t.shiftKey && (l = o.effectiveMax), this.actor.setEdgePoolValue(n, l);
  }
  async _onToggleCombatMenu(t, i) {
    var n, r, o, l, c, u, d;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const s = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.combatMenu) ?? ((d = (u = (c = (l = t == null ? void 0 : t.target) == null ? void 0 : l.closest) == null ? void 0 : c.call(l, "[data-combat-menu]")) == null ? void 0 : u.dataset) == null ? void 0 : d.combatMenu) ?? ""
    ).trim();
    s && (De(this, Ze, z(this, Ze) === s ? null : s), M(this, L, ve).call(this, !1));
  }
  async _onToggleStatuses(t, i) {
    var r, o, l, c, u, d, m, p;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), M(this, L, Yt).call(this, i, t, "Statuses are not available right now.") || !this.isEditable) return;
    const s = this.getPersistentActor() ?? this.actor, n = ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? ((u = oe.getSnapshot(s, { token: ((c = this.getSheetTokenDocument) == null ? void 0 : c.call(this)) ?? null })) == null ? void 0 : u.tokenDocument) ?? ((m = oe.getSnapshot(this.actor, { token: ((d = this.getSheetTokenDocument) == null ? void 0 : d.call(this)) ?? null })) == null ? void 0 : m.tokenDocument) ?? null;
    if (!n) {
      (p = ui.notifications) == null || p.warn("Statuses require a token for this actor on the current scene.");
      return;
    }
    return du({
      actor: s,
      token: n
    });
  }
  async _onCombatSpend(t, i) {
    var c, u, d, m, p, f, h, g, y, b;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), M(this, L, Yt).call(this, i, t, "That combat action is not available right now.") || !this.isEditable) return;
    const s = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.resource) ?? "").trim(), n = Math.max(0, Number(((m = i == null ? void 0 : i.dataset) == null ? void 0 : m.cost) ?? 0)), r = String(((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.combatAction) ?? "").trim(), o = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.combatLabel) ?? "").trim(), l = String(((h = i == null ? void 0 : i.dataset) == null ? void 0 : h.combatCostLabel) ?? "").trim();
    if (!(!s || !n || !r))
      try {
        const A = this.getPersistentActor() ?? this.actor, v = await oe.spendResource(A, {
          token: ((g = this.getSheetTokenDocument) == null ? void 0 : g.call(this)) ?? oe.getCurrentSceneTokenDocument(A) ?? oe.getCurrentSceneTokenDocument(this.actor),
          resource: s,
          cost: n,
          actionId: r,
          actionLabel: o,
          actionCostLabel: l
        });
        if (!(v != null && v.ok)) {
          (y = ui.notifications) == null || y.warn((v == null ? void 0 : v.reason) ?? "Unable to spend action.");
          return;
        }
        M(this, L, Kt).call(this, { rerender: !1 }), M(this, L, ve).call(this, { force: !0 });
      } catch (A) {
        console.error("MWD | Failed to spend combat action", A), (b = ui.notifications) == null || b.error("Unable to spend action.");
      }
  }
  async _onCombatAction(t, i) {
    var n, r, o, l, c, u;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t), M(this, L, Yt).call(this, i, t, "That combat action is not available right now.") || !this.isEditable) return;
    const s = String(((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.combatAction) ?? "").trim();
    if (s)
      try {
        const d = this.getPersistentActor() ?? this.actor, m = await M(this, L, _l).call(this, s);
        if (!m) return;
        const p = await oe.executeAction(d, {
          token: ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? oe.getCurrentSceneTokenDocument(d) ?? oe.getCurrentSceneTokenDocument(this.actor),
          actionId: s,
          metadata: m
        });
        if (!(p != null && p.ok)) {
          (c = ui.notifications) == null || c.warn((p == null ? void 0 : p.reason) ?? "Unable to perform action.");
          return;
        }
        M(this, L, Kt).call(this, { rerender: !1 }), M(this, L, ve).call(this, { force: !0 });
      } catch (d) {
        console.error("MWD | Failed to perform combat action", d), (u = ui.notifications) == null || u.error("Unable to perform action.");
      }
  }
  async _onCombatReduceBurn(t, i) {
    var s, n, r, o, l;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t), !M(this, L, Yt).call(this, i, t, "Burn recovery is not available right now.") && this.isEditable)
      try {
        const c = this.getPersistentActor() ?? this.actor, u = await oe.reduceBurn(c, {
          token: ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? oe.getCurrentSceneTokenDocument(c) ?? oe.getCurrentSceneTokenDocument(this.actor)
        });
        if (!(u != null && u.ok)) {
          (o = ui.notifications) == null || o.warn((u == null ? void 0 : u.reason) ?? "Unable to reduce Burn.");
          return;
        }
        M(this, L, Kt).call(this, { rerender: !1 }), M(this, L, ve).call(this, { force: !0 });
      } catch (c) {
        console.error("MWD | Failed to reduce Burn", c), (l = ui.notifications) == null || l.error("Unable to reduce Burn.");
      }
  }
  async _onCombatOverloadCheck(t, i) {
    var r, o, l, c, u, d, m, p, f, h, g;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), M(this, L, Yt).call(this, i, t, "Overload check is not available right now.") || !this.isEditable) return;
    const s = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.roll) ?? ((m = (d = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : d.dataset) == null ? void 0 : m.roll);
    if (!s) return;
    let n;
    try {
      n = JSON.parse(s);
    } catch (y) {
      console.warn("MWD | Invalid overload payload", s, y);
      return;
    }
    try {
      const y = this.getPersistentActor() ?? this.actor, b = await ((h = (f = (p = game.mwd) == null ? void 0 : p.roll) == null ? void 0 : f.execute) == null ? void 0 : h.call(f, { actor: y, payload: n, event: t }));
      if (M(this, L, Kt).call(this, { rerender: !1 }), !b) {
        M(this, L, ve).call(this, !1);
        return;
      }
      M(this, L, ve).call(this, { force: !0 });
    } catch (y) {
      console.error("MWD | Failed to launch overload check", y), (g = ui.notifications) == null || g.error("Unable to launch overload check.");
    }
  }
  async _onCombatAttack(t, i) {
    var u, d, m, p, f, h, g, y, b, A, v, C, I, P, x, V, Q, K;
    if ((u = t == null ? void 0 : t.preventDefault) == null || u.call(t), (d = t == null ? void 0 : t.stopPropagation) == null || d.call(t), M(this, L, Yt).call(this, i, t, "Attack is not available right now.") || !this.isEditable) return;
    const s = this.getPersistentActor() ?? this.actor, n = ((m = this.getSheetTokenDocument) == null ? void 0 : m.call(this)) ?? oe.getCurrentSceneTokenDocument(s) ?? oe.getCurrentSceneTokenDocument(this.actor), r = oe.getSnapshot(s, { token: n });
    if (!r.hasCombatant) {
      (p = ui.notifications) == null || p.warn("No combatant on the current scene.");
      return;
    }
    if (!r.isCurrentTurn) {
      (f = ui.notifications) == null || f.warn("Only available during your activation.");
      return;
    }
    if (r.overloaded) {
      (h = ui.notifications) == null || h.warn("Overloaded actors can only recover Burn.");
      return;
    }
    const o = 3 + Math.floor((Math.max(0, Number(((b = (y = (g = s.system) == null ? void 0 : g.attributes) == null ? void 0 : y.reflexes) == null ? void 0 : b.value) ?? 0)) + Math.max(0, Number(((C = (v = (A = s.system) == null ? void 0 : A.attributes) == null ? void 0 : v.willpower) == null ? void 0 : C.value) ?? 0))) / 2);
    if (Math.max(0, o - Math.max(0, Number(((I = r.state) == null ? void 0 : I.saSpentThisActivation) ?? 0))) < 2) {
      (P = ui.notifications) == null || P.warn("Activation SA cap reached.");
      return;
    }
    const c = {
      intent: "attack",
      mode: "auto",
      fallback: "unarmed",
      edge: { pool: "physical.grit", allowed: ["pre", "post"] },
      tags: ["combat", "attack"]
    };
    try {
      const H = await ((Q = (V = (x = game.mwd) == null ? void 0 : x.roll) == null ? void 0 : V.execute) == null ? void 0 : Q.call(V, { actor: s, payload: c, event: t }));
      if (M(this, L, Kt).call(this, { rerender: !1 }), !H) {
        M(this, L, ve).call(this, !1);
        return;
      }
      const D = await oe.spendResource(s, {
        token: n,
        resource: "sa",
        cost: 2,
        actionId: "attack",
        actionLabel: "Attack",
        actionCostLabel: "2 SA",
        actionCategory: "complex"
      });
      D != null && D.ok || (K = ui.notifications) == null || K.warn((D == null ? void 0 : D.reason) ?? "Unable to spend attack action."), M(this, L, ve).call(this, { force: !0 });
    } catch (H) {
      console.error("MWD | Failed to launch attack", H), Ya(H, "Unable to launch attack.");
    }
  }
  async _onAddSkillSpecialization(t, i) {
    var d, m, p, f;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable || !this.editing) return;
    const s = String(((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.skillKey) ?? "").trim();
    if (!s) return;
    const n = this.getPersistentActor() ?? this.actor, r = Qs(n.system ?? {}, s), o = ss(n.system ?? {}, s), l = gi(s).filter((h) => !o.includes(h.key));
    if (l.length === 0) return;
    let c = ((f = l[0]) == null ? void 0 : f.key) ?? "";
    if (l.length > 1) {
      const h = `<form class="mwd-quick-select"><div class="mwd-field"><label>Specialization</label><select name="specialization">${l.map((g) => `<option value="${g.key}">${g.label}</option>`).join("")}</select></div></form>`;
      c = await foundry.applications.api.DialogV2.prompt({
        window: { title: "Add Skill Specialization" },
        content: h,
        ok: {
          label: "Add",
          callback: (g, y) => {
            var b, A;
            return ((b = y.form.elements.specialization) == null ? void 0 : b.value) ?? ((A = l[0]) == null ? void 0 : A.key) ?? "";
          }
        }
      });
    }
    const u = Ga(
      r.concat([c])
    );
    await n.update({
      [`system.skills.${s}.specializations`]: u
    }), M(this, L, ve).call(this, { force: !0 });
  }
  async _onRemoveSkillSpecialization(t, i) {
    var l, c, u, d;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable || !this.editing) return;
    const s = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.skillKey) ?? "").trim(), n = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.specializationKey) ?? "").trim();
    if (!s || !n) return;
    const r = this.getPersistentActor() ?? this.actor, o = Ga(
      Qs(r.system ?? {}, s).filter((m) => m !== n)
    );
    await r.update({
      [`system.skills.${s}.specializations`]: o
    }), M(this, L, ve).call(this, { force: !0 });
  }
  async _onCreateLifeModuleItem(t, i) {
    var d, m, p, f, h;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable) return;
    const s = String(((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.moduleType) ?? "").trim();
    if (!s) return;
    const n = this.getPersistentActor() ?? this.actor, r = Gn(s);
    if (!r.length) {
      (f = ui.notifications) == null || f.warn(`No ${Bi(s)} life modules are configured in game settings.`);
      return;
    }
    const o = await zr({
      title: `Choose ${Bi(s)} Life Module`,
      label: "Life Module",
      confirmLabel: "Create",
      options: r.map((g) => ({
        value: g.id,
        label: g.label
      }))
    });
    if (!o) return;
    const l = ai(o);
    if (!l) {
      (h = ui.notifications) == null || h.warn("That life module catalog entry no longer exists.");
      return;
    }
    const c = hl(l, {}), u = {};
    for (const g of c.filter((y) => y.hasMultipleChoices)) {
      const y = await zr({
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
    await n.createEmbeddedDocuments("Item", [{
      name: l.label,
      type: "lifeModule",
      system: na({
        moduleType: s,
        catalogId: l.id,
        selectedGrants: u
      })
    }]), M(this, L, ve).call(this, { force: !0 });
  }
  async _onCreateOwnedItem(t, i) {
    var l, c, u;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable) return;
    const s = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.itemType) ?? "").trim();
    if (!s) return;
    const n = this.getPersistentActor() ?? this.actor, r = n.items.filter((d) => d.type === s).length, o = s === "personalWeapon" ? "Personal Weapon" : s === "armor" ? "Armor" : s.charAt(0).toUpperCase() + s.slice(1);
    await n.createEmbeddedDocuments("Item", [{
      name: `${o} ${r + 1}`,
      type: s
    }]), M(this, L, ve).call(this, { force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var n, r, o;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const s = M(this, L, Pi).call(this, i, t);
    (o = s == null ? void 0 : s.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var r, o;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const s = M(this, L, Pi).call(this, i, t);
    if (!s) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [s.id]), M(this, L, ve).call(this, { force: !0 });
  }
  async _onToggleInventoryAccordion(t, i) {
    var n, r, o, l, c, u, d, m, p, f;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const s = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.accordionId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((f = (p = (m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-accordion-id]")) == null ? void 0 : p.dataset) == null ? void 0 : f.accordionId) ?? ""
    ).trim();
    s && (z(this, ft).has(s) ? z(this, ft).delete(s) : z(this, ft).add(s), M(this, L, ve).call(this, !1));
  }
  async _onToggleOwnedItemEquipped(t, i) {
    var r, o, l, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const s = M(this, L, Pi).call(this, i, t);
    if (!s) return;
    const n = this.getPersistentActor() ?? this.actor;
    await ((c = n.setOwnedItemEquipped) == null ? void 0 : c.call(n, s.id, !((l = s.system) != null && l.equipped))), M(this, L, ve).call(this, { force: !0 });
  }
  async _onSetOwnedItemPrimary(t, i) {
    var r, o, l, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const s = M(this, L, Pi).call(this, i, t);
    if (!s) return;
    const n = this.getPersistentActor() ?? this.actor;
    await ((c = n.setOwnedItemPrimary) == null ? void 0 : c.call(n, s.id, !((l = s.system) != null && l.isPrimary))), M(this, L, ve).call(this, { force: !0 });
  }
  async _onAdjustGearQuantity(t, i) {
    var c, u, d, m, p, f, h, g, y, b, A;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const s = M(this, L, Pi).call(this, i, t);
    if (!s || s.canonicalType !== "gear") return;
    const n = Math.trunc(Number(
      ((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.delta) ?? ((f = (p = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, "[data-delta]")) == null ? void 0 : p.dataset) == null ? void 0 : f.delta) ?? ((b = (y = (g = (h = t == null ? void 0 : t.target) == null ? void 0 : h.closest) == null ? void 0 : g.call(h, "[data-delta]")) == null ? void 0 : y.dataset) == null ? void 0 : b.delta) ?? 0
    ) || 0);
    if (!n) return;
    const o = (this.getPersistentActor() ?? this.actor).items.get(s.id) ?? s, l = Math.max(0, Math.trunc(Number(((A = o.system) == null ? void 0 : A.quantity) ?? 1) || 0) + n);
    await o.update({ "system.quantity": l }), M(this, L, ve).call(this, { force: !0 });
  }
  async _onAttackWeapon(t, i) {
    var r, o, l, c, u, d, m, p, f, h;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), M(this, L, Yt).call(this, i, t, "Equip that weapon before attacking.")) return;
    const s = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.roll) ?? ((m = (d = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : d.dataset) == null ? void 0 : m.roll);
    if (!s) return;
    let n;
    try {
      n = JSON.parse(s);
    } catch (g) {
      console.warn("MWD | Invalid attack payload", s, g);
      return;
    }
    try {
      const g = this.getPersistentActor() ?? this.actor;
      if (!await ((h = (f = (p = game.mwd) == null ? void 0 : p.roll) == null ? void 0 : f.execute) == null ? void 0 : h.call(f, { actor: g, payload: n, event: t }))) return;
      M(this, L, ve).call(this, { force: !0 });
    } catch (g) {
      console.error("MWD | Failed to launch weapon attack", g), Ya(g, "Unable to attack with that weapon.");
    }
  }
};
Ze = new WeakMap(), ei = new WeakMap(), mi = new WeakMap(), ft = new WeakMap(), L = new WeakSet(), Il = function() {
  M(this, L, fn).call(this), z(this, Ze) && (De(this, ei, (t) => {
    var n;
    const i = this._getRootElement();
    if (!i) return;
    const s = t.target;
    if (s instanceof Node && !((n = s.closest) != null && n.call(s, ".mwd-combat-menu"))) {
      if (!i.contains(s)) {
        M(this, L, Kt).call(this);
        return;
      }
      M(this, L, Kt).call(this);
    }
  }), document.addEventListener("click", z(this, ei)));
}, fn = function() {
  z(this, ei) && (document.removeEventListener("click", z(this, ei)), De(this, ei, null));
}, Wa = function() {
  const t = this._getRootElement();
  return t ? t.querySelector(".mwd-scroll-area") ?? t.querySelector(".csb-tab-panels") : null;
}, Dl = function() {
  const t = M(this, L, Wa).call(this);
  if (!(t instanceof HTMLElement)) {
    De(this, mi, null);
    return;
  }
  De(this, mi, {
    top: t.scrollTop,
    left: t.scrollLeft
  });
}, Ol = function() {
  const t = z(this, mi);
  if (!t) return;
  const i = M(this, L, Wa).call(this);
  i instanceof HTMLElement && (i.scrollTop = t.top, i.scrollLeft = t.left, requestAnimationFrame(() => {
    const s = M(this, L, Wa).call(this);
    s instanceof HTMLElement && (s.scrollTop = t.top, s.scrollLeft = t.left);
  }), De(this, mi, null));
}, ve = function(t = !1) {
  M(this, L, Dl).call(this), this.render(t);
}, Kt = function({ rerender: t = !0 } = {}) {
  z(this, Ze) && (De(this, Ze, null), t && M(this, L, ve).call(this, !1));
}, Pi = function(t, i) {
  var n, r, o, l, c, u, d, m;
  const s = String(
    ((n = t == null ? void 0 : t.dataset) == null ? void 0 : n.itemId) ?? ((l = (o = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((m = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
  ).trim();
  return s ? this.actor.items.get(s) ?? null : null;
}, _l = async function(t) {
  if (t !== "prepare") return {};
  const s = await Dialog.prompt({
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
    callback: (n) => ({
      condition: String(n.find('input[name="condition"]').val() ?? "").trim(),
      scope: String(n.find('input[name="scope"]').val() ?? "").trim()
    })
  });
  return s || null;
}, Yt = function(t, i, s = "That action is not available right now.") {
  var o, l, c, u, d;
  const n = ((o = t == null ? void 0 : t.closest) == null ? void 0 : o.call(t, "[data-action-disabled='true']")) ?? ((c = (l = i == null ? void 0 : i.target) == null ? void 0 : l.closest) == null ? void 0 : c.call(l, "[data-action-disabled='true']"));
  if (!n) return !1;
  const r = String(((u = n.dataset) == null ? void 0 : u.actionReason) ?? s).trim() || s;
  return (d = ui.notifications) == null || d.warn(r), !0;
}, Qi = function(t, i) {
  return `${String(t ?? "").trim()}:${String(i ?? "").trim()}`;
}, R(ye, "PARTS", {
  sheet: {
    get template() {
      return `${G}/v2/actor/character-sheet.hbs`;
    }
  }
}), R(ye, "DEFAULT_OPTIONS", foundry.utils.mergeObject(wi(ye, ye, "DEFAULT_OPTIONS"), {
  classes: ["character-sheet", w, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
  window: { minWidth: 450, minHeight: 740, resizable: !0 },
  position: { width: 980, height: 900 },
  actions: {
    ...wi(ye, ye, "DEFAULT_OPTIONS").actions,
    edgeSet: ye.prototype._onEdgeSet,
    toggleCombatMenu: ye.prototype._onToggleCombatMenu,
    toggleStatuses: ye.prototype._onToggleStatuses,
    combatAction: ye.prototype._onCombatAction,
    combatSpend: ye.prototype._onCombatSpend,
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
}));
let pn = ye;
class Ll extends zi {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["npc-sheet", w, "actor-sheet-v2"]
    });
  }
}
R(Ll, "PARTS", {
  sheet: {
    get template() {
      return `${G}/actor/npc.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class $l extends zi {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["vehicle-sheet", w, "actor-sheet-v2"],
      position: { width: 860, height: 820 }
    });
  }
}
R($l, "PARTS", {
  sheet: {
    get template() {
      return `${G}/actor/vehicle.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class xl extends zi {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["battlemech-sheet", w, "actor-sheet-v2"],
      position: { width: 900, height: 820 }
    });
  }
}
R(xl, "PARTS", {
  sheet: {
    get template() {
      return `${G}/actor/battlemech.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
function gp() {
  console.log(`${fe}Registering Actor sheets (V2)`);
  const { Actors: a } = foundry.documents.collections;
  a.registerSheet(w, pn, {
    types: ["character"],
    makeDefault: !0,
    label: "Character (V2)"
  }), a.registerSheet(w, Ll, {
    types: ["npc"],
    makeDefault: !0,
    label: "NPC (V2)"
  }), a.registerSheet(w, $l, {
    types: ["vehicle"],
    makeDefault: !0,
    label: "Vehicle (V2)"
  }), a.registerSheet(w, xl, {
    types: ["battlemech"],
    makeDefault: !0,
    label: "BattleMech (V2)"
  });
}
const { HandlebarsApplicationMixin: yp } = foundry.applications.api, { HTMLField: Wr, StringField: bp } = foundry.data.fields, Ur = /* @__PURE__ */ new Set(["system.notes", "system.description"]);
function Os(a, e) {
  const t = new a({ required: !1, blank: !0, initial: "" });
  return t.name = e, t;
}
function Sp(a = {}) {
  return {
    ...a,
    sourceReference: a.sourceReference ?? Os(bp, "system.sourceReference"),
    notes: a.notes ?? Os(Wr, "system.notes"),
    description: a.description ?? Os(Wr, "system.description")
  };
}
var pi, ti, fi, gt, Ji, hn;
const _e = class _e extends yp(foundry.applications.sheets.ItemSheetV2) {
  constructor() {
    super(...arguments);
    Te(this, gt);
    Te(this, pi, /* @__PURE__ */ new Map());
    Te(this, ti, /* @__PURE__ */ new Map());
    Te(this, fi, null);
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
      classes: ["sheet", "item", w, "appv2", "mwd-sheet", "item-sheet"],
      position: {
        width: 760,
        height: 860
      },
      window: {
        resizable: !0
      },
      actions: {
        editImage: _e._onEditImage,
        tab: _e.prototype._onClickTab,
        accordion: _e.prototype._onClickAccordion,
        checkbarElement: _e._onClickCheckbar,
        modifierAdd: _e._onModifierAdd,
        modifierDelete: _e._onModifierDelete,
        modifierValueChange: _e._onModifierValueChange,
        modifierConditionChange: _e._onModifierConditionChange,
        modifierSelectionChange: _e._onModifierSelectionChange,
        effectCreate: _e._onEffectCreate,
        effectEdit: _e._onEffectEdit,
        effectDelete: _e._onEffectDelete,
        effectToggleDisabled: _e._onEffectToggleDisabled
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
    const s = ((c = (l = (o = (r = game.system) == null ? void 0 : r.mwd) == null ? void 0 : o.styles) == null ? void 0 : l.selectCssClass) == null ? void 0 : c.call(l)) ?? "mwd-theme-default", n = ["mwd-theme-default", "mwd-theme-sra"];
    return t.classes = t.classes.filter((u) => !n.includes(u)), t.classes.push(s), t;
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
        [S.itemType.mechWeapon]: `${G}/v2/item/mech-weapon-root.hbs`,
        [S.itemType.armor]: `${G}/v2/item/armor.hbs`
      }[s] ?? `${G}/v2/item/${s}.hbs`;
    }
    return ((i = super._getPartTemplate) == null ? void 0 : i.call(this, t)) ?? "";
  }
  /**
   * Override title to show localized item type and name.
   * @override
   */
  get title() {
    const t = this._getCanonicalItemType();
    return `${we.itemType.singular[t] ?? t}: ${this.item.name}`;
  }
  /**
   * Prepare context data for rendering.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The context object
   * @override
   */
  async _prepareContext(t) {
    var P, x, V, Q, K, H, D, W, X;
    const i = await super._prepareContext(t), s = ((x = (P = game.system.mwd.modifiers) == null ? void 0 : P.getEnums) == null ? void 0 : x.call(P)) ?? {}, n = foundry.utils.deepClone((i == null ? void 0 : i.options) ?? {}), r = Sp((i == null ? void 0 : i.fields) ?? ((Q = (V = this.item.system) == null ? void 0 : V.schema) == null ? void 0 : Q.fields) ?? {}), o = ((H = (K = this.item.actor) == null ? void 0 : K.getAttributes) == null ? void 0 : H.call(K, this.item)) ?? [], l = this._getCanonicalItemType(), c = !this.item.actor, u = !!this.item.actor, d = we.itemType.singular[l] ?? l, m = this._getEffectEntries(), p = m.filter((Z) => Z.syncedCount > 0).length, f = this.constructor.LAYOUT_ID, h = this.item.actor ? (Z) => o.includes(Z) : (Z) => !0, g = l === S.itemType.skill, b = ["mwd", "item-sheet", this.isEditable ? "editable" : "locked"], A = b.join(" ");
    n.classes = b, n.cssClass = A;
    const v = async (Z, { secrets: ie = this.item.isOwner } = {}) => foundry.applications.ux.TextEditor.implementation.enrichHTML(Z ?? "", {
      async: !0,
      secrets: ie,
      relativeTo: this.item
    }), C = foundry.utils.expandObject({
      "system.notes": await v(this.item.system.notes ?? ""),
      "system.description": await v(this.item.system.description ?? "")
    }), I = {
      ...i,
      // Item data
      item: this.item,
      data: this.item,
      system: this.item.system,
      // Form field metadata and enriched content for App V2 rich text helpers
      fields: r,
      enriched: C,
      enrichedDescription: ((D = C == null ? void 0 : C.system) == null ? void 0 : D.description) ?? "",
      // Options for templates
      options: {
        ...n,
        isGM: game.user.isGM,
        limited: !this.document.isOwner,
        owner: this.document.isOwner,
        isOwned: !!this.item.actor,
        editable: this.isEditable,
        cssClass: A,
        viewMode: !1
        // Items don't have view mode like actors do
      },
      // Configuration data
      ENUMS: {
        ...ce.getEnums(h, g),
        ...s
      },
      MWD: we,
      itemSheet: {
        canonicalType: l,
        typeLabel: d,
        isArmorSheet: l === S.itemType.armor,
        isStandalone: c,
        canUseActorControls: u,
        supportsEffectSync: !!((X = (W = this.item).supportsEquippedEffectSync) != null && X.call(W)),
        effectEntries: m,
        effectCount: m.length,
        syncedEffectCount: p,
        summaryChips: this._getSummaryChips(),
        stateChips: this._getStateChips(m)
      },
      // CSS class for form element
      cssClass: A,
      // Tab configuration
      tabs: this._getTabs()
    };
    return f && (I.layout = await Qa.get(f)), I;
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
    var s, n, r;
    const i = [];
    return i.push({ kind: "ownership", label: this.item.actor ? "Owned Item" : "World Item" }), Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "equipped") && i.push({
      kind: "equipment",
      label: (s = this.item.system) != null && s.equipped ? "Equipped" : "Unequipped",
      tone: (n = this.item.system) != null && n.equipped ? "active" : "muted"
    }), Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "isPrimary") && ((r = this.item.system) != null && r.isPrimary) && i.push({ kind: "role", label: "Primary", tone: "accent" }), t.length && i.push({
      kind: "effects",
      label: `${t.length} Effect${t.length === 1 ? "" : "s"}`,
      tone: t.some((o) => o.syncedCount > 0) ? "active" : "muted"
    }), i;
  }
  _getEffectEntries() {
    var s, n, r, o, l, c;
    const t = /* @__PURE__ */ new Map(), i = ((n = (s = this.item).getSyncedActorEffects) == null ? void 0 : n.call(s)) ?? [];
    for (const u of i) {
      const d = (l = (o = (r = u.flags) == null ? void 0 : r[w]) == null ? void 0 : o.equippedItemSync) == null ? void 0 : l.sourceEffectId;
      if (!d) continue;
      const m = t.get(d) ?? [];
      m.push(u), t.set(d, m);
    }
    return Array.from(((c = this.item.effects) == null ? void 0 : c.contents) ?? []).map((u) => {
      var m, p, f, h, g, y, b;
      const d = t.get(u.id) ?? [];
      return {
        id: u.id,
        name: u.name || "New Effect",
        img: u.img || "icons/svg/aura.svg",
        disabled: !!u.disabled,
        transfer: !!u.transfer,
        changesCount: Array.isArray(u.changes) ? u.changes.length : 0,
        statusesCount: Number(((m = u.statuses) == null ? void 0 : m.size) ?? ((p = u.statuses) == null ? void 0 : p.length) ?? 0),
        durationLabel: (f = u.duration) != null && f.seconds ? `${u.duration.seconds}s` : (h = u.duration) != null && h.rounds ? `${u.duration.rounds} rounds` : "Passive",
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
    const s = ((l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, ".csb-tab-link[data-tab]")) ?? ((u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, ".csb-tab-link[data-tab]"));
    if (!s) return;
    const n = s.closest(".csb-tabs");
    if (!n) return;
    const r = n.dataset.group || "default", o = s.dataset.tab;
    o && (z(this, pi).set(r, o), M(this, gt, Ji).call(this, this._getRootElement(), r, o));
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const s = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!s) return;
    const n = s.dataset.section, r = s.closest(".csb-accordion");
    if (!r || !n) return;
    const o = r.dataset.group || "default", c = (z(this, ti).has(o) ? z(this, ti).get(o) : r.dataset.default || null) === n ? null : n;
    z(this, ti).set(o, c), M(this, gt, hn).call(this, r, c);
  }
  _onRender(t, i) {
    var n, r, o, l;
    (n = super._onRender) == null || n.call(this, t, i), (r = this.window) != null && r.title && (this.window.title.textContent = this.title);
    const s = this._getRootElement();
    if (s) {
      for (const c of s.querySelectorAll(".sheet-tabs")) {
        const u = c.dataset.group || "default", d = Array.from(c.querySelectorAll("[data-tab]"));
        if (!d.length) continue;
        for (const h of d)
          h.addEventListener("click", (g) => {
            g.preventDefault(), g.stopPropagation();
            const y = h.dataset.tab;
            y && (z(this, pi).set(u, y), M(this, gt, Ji).call(this, s, u, y));
          });
        const m = z(this, pi).get(u), p = c.dataset.default || ((o = d[0]) == null ? void 0 : o.dataset.tab), f = m || p;
        f && M(this, gt, Ji).call(this, s, u, f);
      }
      for (const c of s.querySelectorAll(".csb-tabs")) {
        const u = c.dataset.group || "default", d = Array.from(c.querySelectorAll(".csb-tab-link[data-tab]"));
        if (!d.length) continue;
        const m = z(this, pi).get(u), p = c.dataset.default || ((l = d[0]) == null ? void 0 : l.dataset.tab), f = m || p;
        f && M(this, gt, Ji).call(this, s, u, f);
      }
      for (const c of s.querySelectorAll(".csb-accordion")) {
        const u = c.dataset.group || "default", d = z(this, ti).has(u) ? z(this, ti).get(u) : c.dataset.default || null;
        M(this, gt, hn).call(this, c, d);
      }
      for (const c of s.querySelectorAll("prose-mirror[name]")) {
        const u = c.getAttribute("name") ?? "";
        Ur.has(u) && c.addEventListener("change", (d) => {
          d.preventDefault(), d.stopPropagation(), this._updateRichTextField(c);
        });
      }
      this._restoreScrollPositions();
    }
  }
  async _updateRichTextField(t) {
    var r;
    const i = String(((r = t == null ? void 0 : t.getAttribute) == null ? void 0 : r.call(t, "name")) ?? (t == null ? void 0 : t.name) ?? "");
    if (!this.isEditable || !Ur.has(i)) return;
    const s = String(t.value ?? ""), n = String(foundry.utils.getProperty(this.item, i) ?? "");
    if (s !== n)
      try {
        await this.item.update({ [i]: s });
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
      De(this, fi, null);
      return;
    }
    const i = [];
    for (const s of this._getScrollRestoreSelectors())
      t.querySelectorAll(s).forEach((n, r) => {
        n instanceof HTMLElement && i.push({
          selector: s,
          index: r,
          top: n.scrollTop,
          left: n.scrollLeft
        });
      });
    De(this, fi, i.length ? i : null);
  }
  _restoreScrollPositions() {
    const t = z(this, fi);
    if (!(t != null && t.length)) return;
    const i = () => {
      const s = this._getRootElement();
      if (s)
        for (const n of t) {
          const r = s.querySelectorAll(n.selector).item(n.index);
          r instanceof HTMLElement && (r.scrollTop = n.top, r.scrollLeft = n.left);
        }
    };
    i(), requestAnimationFrame(i), De(this, fi, null);
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
    const n = i.closest(".checkbar-root");
    if (!n) return;
    const r = n.dataset.monitorCode, o = Number.parseInt(i.dataset.index), l = i.dataset.checked === "true";
    await s.parent.switchMonitorCheck(r, o, l);
  }
  static async _onEditImage(t) {
    var n, r, o;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t), !this.isEditable) return;
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
    const n = s.dataset.modifierId;
    n && await this.item.deleteModifier(n);
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
    const n = s.dataset.modifierId;
    n && await this.item.changeModifierValue(n, i.value);
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
    const n = s.dataset.modifierId;
    n && await this.item.changeModifierCondition(n, i.value);
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
    const n = s.dataset.modifierId, r = i.dataset.modifierSelect;
    n && r && await this.item.changeModifierSelection(n, r, i.value);
  }
  static async _onEffectCreate(t, i) {
    var n, r, o;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
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
    var r, o, l, c, u, d, m;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const s = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.effectId) ?? ((d = (u = (c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : d.effectId);
    if (!s) return;
    const n = this.item.effects.get(s);
    (m = n == null ? void 0 : n.sheet) == null || m.render(!0);
  }
  static async _onEffectDelete(t, i) {
    var n, r, o, l, c, u;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const s = ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.effectId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-effect-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.effectId);
    s && await this.item.deleteEmbeddedDocuments("ActiveEffect", [s]);
  }
  static async _onEffectToggleDisabled(t, i) {
    var r, o, l, c, u, d;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const s = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.effectId) ?? ((d = (u = (c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : d.effectId);
    if (!s) return;
    const n = this.item.effects.get(s);
    n && await n.update({ disabled: !n.disabled });
  }
};
pi = new WeakMap(), ti = new WeakMap(), fi = new WeakMap(), gt = new WeakSet(), Ji = function(t, i, s) {
  t && (t.querySelectorAll(`.csb-tabs[data-group="${i}"] .csb-tab-link[data-tab]`).forEach((n) => {
    n.classList.toggle("is-active", n.dataset.tab === s);
  }), t.querySelectorAll(`.csb-tabs[data-group="${i}"] .csb-tab-panel[data-tab]`).forEach((n) => {
    n.classList.toggle("is-active", n.dataset.tab === s);
  }), t.querySelectorAll(".sheet-tabs [data-tab]").forEach((n) => {
    var o;
    (((o = n.closest(".sheet-tabs")) == null ? void 0 : o.dataset.group) || "default") === i && n.classList.toggle("active", n.dataset.tab === s);
  }), t.querySelectorAll(`.tab[data-group="${i}"]`).forEach((n) => {
    n.classList.toggle("active", n.dataset.tab === s);
  }));
}, hn = function(t, i) {
  t.dataset.activeSection = i ?? "", t.querySelectorAll(".csb-accordion__section").forEach((s) => {
    const n = s.dataset.section === i;
    s.classList.toggle("is-active", n);
  }), t.querySelectorAll(".csb-accordion__trigger").forEach((s) => {
    const n = s.dataset.section === i;
    s.classList.toggle("is-active", n), s.setAttribute("aria-expanded", n ? "true" : "false");
  }), t.querySelectorAll(".csb-accordion__panel").forEach((s) => {
    const n = s.closest(".csb-accordion__section"), r = (n == null ? void 0 : n.dataset.section) === i;
    s.classList.toggle("is-active", r);
  });
}, R(_e, "LAYOUT_ID", null), /** @override */
R(_e, "PARTS", {
  sheet: {
    template: "",
    // Set dynamically in _getPartTemplate
    scrollable: [".sheet-body"]
  }
}), R(_e, "TABS", {
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
let At = _e;
class gn extends At {
}
R(gn, "LAYOUT_ID", "contact"), R(gn, "PARTS", {
  sheet: {
    template: `${G}/v2/item/contact.hbs`,
    scrollable: [".sheet-body"]
  }
});
const jr = Object.freeze([
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
class yn extends At {
  async _prepareContext(e) {
    var s;
    const t = await super._prepareContext(e), i = this.item.system ?? {};
    return t.system = {
      ...i,
      quantity: Math.max(0, Math.trunc(Number(i.quantity ?? 1) || 0)),
      rating: Math.max(0, Math.trunc(Number(i.rating ?? 0) || 0)),
      category: String(i.category ?? "").trim(),
      tags: Array.isArray(i.tags) ? i.tags.map((n) => String(n ?? "").trim()).filter(Boolean) : []
    }, t.gearEditor = {
      categories: jr.map((n) => ({ ...n }))
    }, t.tagsText = t.system.tags.join(", "), t.itemSheet = {
      ...t.itemSheet ?? {},
      summaryChips: [
        { label: "Qty", value: String(t.system.quantity) },
        { label: "Rating", value: String(t.system.rating) },
        {
          label: "Category",
          value: ((s = jr.find((n) => n.value === t.system.category)) == null ? void 0 : s.label) ?? "Uncategorized"
        }
      ]
    }, t;
  }
}
R(yn, "LAYOUT_ID", "gear"), R(yn, "PARTS", {
  sheet: {
    template: `${G}/v2/item/gear.hbs`,
    scrollable: [".sheet-body"]
  }
});
class bn extends At {
  async _prepareContext(e) {
    var r, o;
    const t = await super._prepareContext(e), i = ot(this.item.system ?? {}), s = Vo(), n = Array.isArray((r = t.ENUMS) == null ? void 0 : r.skills) ? t.ENUMS.skills.map((l) => ({
      value: String((l == null ? void 0 : l.value) ?? "").trim(),
      label: String((l == null ? void 0 : l.label) ?? (l == null ? void 0 : l.value) ?? "").trim()
    })).filter((l) => l.value) : [];
    return t.system = {
      ...i,
      effects: (Array.isArray(i.effects) ? i.effects : []).map((l) => ({
        ...l,
        showSkillPicker: Go(l) || Array.isArray(l.skillKeys) && l.skillKeys.length > 0,
        isEdgeEvent: l.type === "edgeEvent"
      }))
    }, t.traitEditor = {
      ...s,
      skills: n
    }, t.itemSheet = {
      ...t.itemSheet ?? {},
      sheetClass: "mwd-item-sheet--quality",
      summaryChips: [
        { label: "Category", value: Ra(i.category) },
        { label: "Tier", value: Ia(i.tier) },
        { label: "Activation", value: String(i.activation ?? "passive").trim() || "Passive" },
        { label: "Effects", value: String(((o = i.effects) == null ? void 0 : o.length) ?? 0) }
      ]
    }, t.tagsText = Array.isArray(i.tags) ? i.tags.join(", ") : "", t;
  }
  _onRender(e, t) {
    var n, r;
    (n = super._onRender) == null || n.call(this, e, t);
    const i = (r = this._getRootElement) == null ? void 0 : r.call(this);
    if (!i) return;
    const s = (o) => {
      var l;
      return (l = this._captureScrollPositions) == null || l.call(this), o();
    };
    i.querySelectorAll(".mwd-quality-prereq-add").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), l.stopPropagation(), s(() => {
          var c, u;
          return (u = (c = this.item).createQualityPrerequisite) == null ? void 0 : u.call(c);
        });
      });
    }), i.querySelectorAll(".mwd-quality-prereq-delete").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), l.stopPropagation(), s(() => {
          var c, u;
          return (u = (c = this.item).deleteQualityPrerequisite) == null ? void 0 : u.call(c, o.dataset.prereqId);
        });
      });
    }), i.querySelectorAll(".mwd-quality-prereq-field").forEach((o) => {
      o.addEventListener("change", (l) => {
        l.preventDefault(), l.stopPropagation(), s(() => {
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
        l.preventDefault(), l.stopPropagation(), s(() => {
          var c, u;
          return (u = (c = this.item).createQualityEffect) == null ? void 0 : u.call(c);
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-delete").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), l.stopPropagation(), s(() => {
          var c, u;
          return (u = (c = this.item).deleteQualityEffect) == null ? void 0 : u.call(c, o.dataset.effectId);
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-field").forEach((o) => {
      o.addEventListener("change", (l) => {
        l.preventDefault(), l.stopPropagation(), s(() => {
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
        s(() => {
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
        l.preventDefault(), l.stopPropagation(), s(() => {
          var c, u;
          return (u = (c = this.item).createQualityEffectCondition) == null ? void 0 : u.call(c, o.dataset.effectId);
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-condition-delete").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), l.stopPropagation(), s(() => {
          var c, u;
          return (u = (c = this.item).deleteQualityEffectCondition) == null ? void 0 : u.call(c, o.dataset.effectId, o.dataset.conditionId);
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-condition-field").forEach((o) => {
      o.addEventListener("change", (l) => {
        l.preventDefault(), l.stopPropagation(), s(() => {
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
R(bn, "LAYOUT_ID", "quality"), R(bn, "PARTS", {
  sheet: {
    template: `${G}/v2/item/quality.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Sn extends At {
}
R(Sn, "LAYOUT_ID", "asset-module"), R(Sn, "PARTS", {
  sheet: {
    template: `${G}/v2/item/assetModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class An extends At {
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
    const e = na(this.item.system ?? {}), t = ai(e.catalogId), s = us(t, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }).map((r) => r.choice).filter(Boolean).map((r) => sa(r, { includeBonusText: !0 })).join(", "), n = this.item.actor ? si(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return [
      { label: "Slot", value: Bi(e.moduleType) },
      { label: "Module", value: (t == null ? void 0 : t.label) ?? "Unlinked" },
      { label: "Bonuses", value: s || "Pending choice" },
      n ? { label: "Status", value: n.isActive ? "Active" : "Inactive" } : null
    ].filter(Boolean);
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), i = na(this.item.system ?? {}), s = i.moduleType, n = ai(i.catalogId), r = s ? Gn(s) : [], o = hl(n, i.selectedGrants, { legacySelectedSkill: i.selectedSkill }), l = this.item.actor ? si(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return t.lifeModuleEditor = {
      moduleType: s,
      moduleTypeLabel: Bi(s),
      moduleTypes: ul().map((c) => ({
        ...c,
        selected: c.value === s
      })),
      availableEntries: r.map((c) => ({
        id: c.id,
        label: c.label,
        selected: c.id === i.catalogId
      })),
      hasAvailableEntries: r.length > 0,
      selectedEntry: n,
      selectedGrants: i.selectedGrants,
      grantFields: o,
      requiresAnyLabels: ((n == null ? void 0 : n.requiresAny) ?? []).map((c) => {
        var u;
        return ((u = ai(c)) == null ? void 0 : u.label) ?? c;
      }),
      excludesAnyLabels: ((n == null ? void 0 : n.excludesAny) ?? []).map((c) => {
        var u;
        return ((u = ai(c)) == null ? void 0 : u.label) ?? c;
      }),
      actorState: l,
      warningLabels: [...(l == null ? void 0 : l.warningLabels) ?? []],
      isOwned: !!this.item.actor,
      statusLabel: l ? l.isActive ? "Active" : "Inactive" : n ? "Configured" : "Unlinked",
      statusReason: (l == null ? void 0 : l.inactiveReason) ?? ""
    }, t;
  }
}
R(An, "LAYOUT_ID", "life-module"), R(An, "PARTS", {
  sheet: {
    template: `${G}/v2/item/lifeModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class wn extends At {
}
R(wn, "LAYOUT_ID", "skill"), R(wn, "PARTS", {
  sheet: {
    template: `${G}/v2/item/skill.hbs`,
    scrollable: [".sheet-body"]
  }
});
const Ap = Object.freeze([
  "firearms",
  "projectileWeapons",
  "heavyWeapons",
  "meleeCombat"
]), wp = Object.freeze([
  { value: "energy", label: "Energy" },
  { value: "kinetic", label: "Kinetic" },
  { value: "ballistic", label: "Ballistic" },
  { value: "explosive", label: "Explosive" },
  { value: "plasma", label: "Plasma" },
  { value: "electrical", label: "Electrical" },
  { value: "melee", label: "Melee" },
  { value: "none", label: "None" }
]);
function Hr(a, e, t) {
  const i = String(e ?? "").trim();
  return !i || a.some((s) => s.value === i) ? a : a.concat({ value: i, label: t(i) });
}
class ds extends At {
  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        weaponSkillChange: ds._onWeaponSkillChange
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
    var l, c, u, d, m, p;
    const t = await super._prepareContext(e), i = this._getCanonicalItemType();
    t.ENUMS = {
      ...t.ENUMS ?? {},
      defenses: ke.getDefenses()
    };
    const s = Array.isArray((l = t.ENUMS) == null ? void 0 : l.skills) ? t.ENUMS.skills : [], n = (c = this.item.system) == null ? void 0 : c.skill, r = (u = this.item.system) == null ? void 0 : u.damageType, o = i === "personalWeapon" ? Hr(
      s.filter((f) => Ap.includes(f.value)),
      n,
      (f) => {
        var h;
        return ((h = s.find((g) => g.value === f)) == null ? void 0 : h.label) ?? f;
      }
    ) : s;
    return t.weaponProfile = ((m = (d = this.item).getCombatProfile) == null ? void 0 : m.call(d)) ?? null, t.weaponEditor = {
      skills: o,
      categories: [
        { value: "melee", label: "Melee" },
        { value: "ranged", label: "Ranged" },
        { value: "thrown", label: "Thrown" },
        { value: "other", label: "Other" }
      ],
      damageTypes: Hr(
        i === "personalWeapon" ? [...ja] : [...wp],
        r,
        (f) => i === "personalWeapon" ? Ot(f) : f
      ),
      ranges: lt.RANGE_ORDER.map((f) => ({
        value: f,
        label: f.charAt(0).toUpperCase() + f.slice(1)
      })),
      weaponCapabilityOptions: dc,
      payloadCapabilityOptions: mc,
      ammoDamageTypes: [{ value: "", label: "Use Weapon Default" }, ...ja],
      payloadTemplateShapes: co,
      payloadTemplatePlacements: uo,
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
      (f) => !["ownership", "equipment", "role"].includes(f.kind)
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
    var n, r;
    const i = t.value, s = (r = (n = game.system.mwd.skills) == null ? void 0 : n.get) == null ? void 0 : r.call(n, i);
    s != null && s.defense && await this.item.update({ "system.defense": s.defense }, { render: !1 });
  }
}
const Di = class Di extends ds {
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
        attackWeapon: Di._onAttackWeapon,
        reloadWeaponPayload: Di._onReloadWeaponPayload
      }
    }, { inplace: !1 });
  }
  async _prepareContext(e) {
    var r, o, l;
    const t = await super._prepareContext(e), i = this.item.actor ?? null, s = t.weaponProfile ?? null, n = !!(i && typeof i.isCharacterLike == "function" && i.isCharacterLike() && ((o = (r = this.item).isPersonalWeapon) != null && o.call(r)));
    return t.itemSheet = {
      ...t.itemSheet ?? {},
      canAttack: n,
      attackDisabled: !n || !((l = this.item.system) != null && l.equipped)
    }, t.itemSheet.summaryChips = this._getSummaryChips(s), t.itemSheet.reloadState = this._getReloadDisplayState(s), t;
  }
  _getReloadDisplayState(e = ((t) => ((i) => (i = (t = this.item).getCombatProfile) == null ? void 0 : i.call(t))())() ?? null) {
    var d, m, p, f, h;
    const s = ((m = (d = this.item).canReloadActivePayload) == null ? void 0 : m.call(d, { detailed: !0 })) ?? { canReload: !1, reason: "" }, n = !!((p = e == null ? void 0 : e.sourceState) != null && p.isTracked), r = String((e == null ? void 0 : e.payloadLabel) ?? (s == null ? void 0 : s.payloadLabel) ?? "").trim() || "Unloaded", o = Number(((f = e == null ? void 0 : e.sourceState) == null ? void 0 : f.current) ?? (s == null ? void 0 : s.current) ?? 0) || 0, l = Number(((h = e == null ? void 0 : e.sourceState) == null ? void 0 : h.max) ?? (s == null ? void 0 : s.max) ?? 0) || 0, c = n ? `${r} ${o}/${l}` : r, u = s.canReload ? "Click to reload" : String(s.reason ?? "").trim() || "Payload read-only";
    return {
      canReload: !!s.canReload,
      disabled: !s.canReload,
      value: c,
      hint: u,
      title: s.canReload ? `Reload ${r}` : u
    };
  }
  _getSummaryChips(e = ((t) => ((i) => (i = (t = this.item).getCombatProfile) == null ? void 0 : i.call(t))())() ?? null) {
    var n, r, o;
    if (!e) return [];
    const s = [
      { label: "Category", value: String(e.category ?? "").trim() || "Ranged" },
      { label: "Skill", value: ((n = e.skillDef) == null ? void 0 : n.label) ?? e.skill ?? "Firearms" },
      { label: "DV", value: String(Number(e.damage ?? 0)) },
      { label: "AP", value: String(Number(e.ap ?? 0)) },
      { label: "Type", value: Ot(e.damageType) || "Penetrating" },
      { label: "Range", value: String(((r = e.range) == null ? void 0 : r.max) ?? "near").trim() || "Near" }
    ];
    return String(e.category ?? "").trim().toLowerCase() !== "melee" && s.push((o = e == null ? void 0 : e.sourceState) != null && o.isTracked ? { label: "Payload", value: `${(e == null ? void 0 : e.payloadLabel) || "Unloaded"} (${Number(e.sourceState.current ?? 0)}/${Number(e.sourceState.max ?? 0)})` } : { label: "Payload", value: (e == null ? void 0 : e.payloadLabel) || "Unloaded" }), s;
  }
  static async _onAttackWeapon(e) {
    var i, s, n, r, o;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (s = e == null ? void 0 : e.stopPropagation) == null || s.call(e);
    const t = this.item.actor ?? null;
    if (!(!t || !((r = (n = this.item).isPersonalWeapon) != null && r.call(n))))
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
        console.error("MWD | Failed to launch weapon sheet attack", l), Ya(l, "Unable to attack with that weapon.");
      }
  }
  static async _onReloadWeaponPayload(e) {
    var i, s, n, r, o, l, c, u;
    if ((i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (s = e == null ? void 0 : e.stopPropagation) == null || s.call(e), !((r = (n = this.item) == null ? void 0 : n.isPersonalWeapon) != null && r.call(n))) return;
    (o = this._captureScrollPositions) == null || o.call(this);
    const t = await ((c = (l = this.item).reloadActivePayload) == null ? void 0 : c.call(l));
    t != null && t.ok || (u = ui.notifications) == null || u.warn((t == null ? void 0 : t.reason) ?? "Unable to reload that weapon.");
  }
  _onRender(e, t) {
    var n, r;
    (n = super._onRender) == null || n.call(this, e, t);
    const i = (r = this._getRootElement) == null ? void 0 : r.call(this);
    if (!i) return;
    const s = (o) => {
      var l;
      return (l = this._captureScrollPositions) == null || l.call(this), o();
    };
    i.querySelectorAll(".mwd-payload-add").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), s(() => {
          var c, u;
          return (u = (c = this.item).createPayload) == null ? void 0 : u.call(c);
        });
      });
    }), i.querySelectorAll(".mwd-payload-delete").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), s(() => {
          var c, u;
          return (u = (c = this.item).deletePayload) == null ? void 0 : u.call(c, o.dataset.payloadId);
        });
      });
    }), i.querySelectorAll(".mwd-payload-field").forEach((o) => {
      o.addEventListener("change", (l) => {
        l.preventDefault(), s(() => {
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
        l.preventDefault(), s(() => {
          var c, u;
          return (u = (c = this.item).createConsumptionSource) == null ? void 0 : u.call(c);
        });
      });
    }), i.querySelectorAll(".mwd-source-delete").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), s(() => {
          var c, u;
          return (u = (c = this.item).deleteConsumptionSource) == null ? void 0 : u.call(c, o.dataset.sourceId);
        });
      });
    }), i.querySelectorAll(".mwd-source-field").forEach((o) => {
      o.addEventListener("change", (l) => {
        l.preventDefault(), s(() => {
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
        const u = String(o.dataset.values ?? "").split(",").map((f) => f.trim()).filter(Boolean), d = Array.from(/* @__PURE__ */ new Set([...u, c]));
        o.value = "";
        const m = String(o.dataset.payloadId ?? "").trim(), p = String(o.dataset.field ?? "").trim();
        if (p) {
          if (m) {
            s(() => {
              var f, h;
              return (h = (f = this.item).updatePayloadField) == null ? void 0 : h.call(f, m, p, d.join(", "));
            });
            return;
          }
          s(() => this.item.update({ [p]: d }));
        }
      });
    });
  }
};
R(Di, "LAYOUT_ID", "personal-weapon"), R(Di, "PARTS", {
  sheet: {
    template: `${G}/v2/item/personal-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
let Tn = Di;
class kn extends ds {
}
R(kn, "LAYOUT_ID", "mech-weapon"), R(kn, "PARTS", {
  sheet: {
    template: `${G}/v2/item/mech-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
const Tp = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
};
function qr(a) {
  const e = Number(a ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function kp({ defenseBonus: a = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(a ?? 0) || 0;
  i !== 0 && t.push(`Defense ${qr(i)}`);
  const s = yt(e);
  for (const [n, r] of Object.entries(Tp)) {
    const o = Number((s == null ? void 0 : s[n]) ?? 0) || 0;
    o !== 0 && t.push(`${r} ${qr(o)}`);
  }
  return t.join(" | ");
}
class vn extends At {
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
    var l, c, u, d, m, p, f, h, g, y, b, A, v, C, I, P;
    const t = await super._prepareContext(e), i = this.item, s = i.actor ?? null, n = ((l = s == null ? void 0 : s.getPersonalCombatLoadout) == null ? void 0 : l.call(s)) ?? null, r = ((c = n == null ? void 0 : n.activeArmor) == null ? void 0 : c.id) ?? null, o = ((u = n == null ? void 0 : n.activeArmor) == null ? void 0 : u.id) === i.id ? n.activeArmor : (d = i.getArmorProfile) == null ? void 0 : d.call(i, { actor: s });
    return t.armorState = o, t.isActiveArmor = r === i.id, t.effectiveDurabilityCurrent = Number(
      ((m = o == null ? void 0 : o.durability) == null ? void 0 : m.current) ?? ((f = (p = i.system) == null ? void 0 : p.durability) == null ? void 0 : f.current) ?? ((g = (h = i.system) == null ? void 0 : h.durability) == null ? void 0 : g.max) ?? ((y = i.system) == null ? void 0 : y.rating) ?? 0
    ), t.effectiveArmorRating = Number(
      (o == null ? void 0 : o.currentArmorRating) ?? (o == null ? void 0 : o.ratingCurrent) ?? Math.min(
        Number(((b = i.system) == null ? void 0 : b.rating) ?? 0),
        Number(((v = (A = i.system) == null ? void 0 : A.durability) == null ? void 0 : v.current) ?? ((I = (C = i.system) == null ? void 0 : C.durability) == null ? void 0 : I.max) ?? ((P = i.system) == null ? void 0 : P.rating) ?? 0)
      )
    ), t.effectiveArmorResist = Number(
      (o == null ? void 0 : o.baseMitigation) ?? (o == null ? void 0 : o.baseResistance) ?? 0
    ), t.armorModifierSummary = this._getArmorModifierSummary(o), t.itemSheet = { ...t.itemSheet ?? {} }, t.itemSheet.summaryChips = this._getSummaryChips(o), t.armorEditor = {
      standardTraits: [...kc]
    }, t;
  }
  _getSummaryChips(e = null) {
    var n, r, o, l, c, u, d, m, p, f, h, g, y, b, A;
    const t = this.item.system ?? {}, i = [
      {
        label: "Rating",
        value: String(Number(
          (e == null ? void 0 : e.ratingCurrent) ?? (e == null ? void 0 : e.currentArmorRating) ?? Math.min(
            Number(t.rating ?? 0),
            Number(((n = t.durability) == null ? void 0 : n.current) ?? ((r = t.durability) == null ? void 0 : r.max) ?? t.rating ?? 0)
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
    ], s = Number(((p = (m = e == null ? void 0 : e.traitState) == null ? void 0 : m.reinforced) == null ? void 0 : p.max) ?? ((h = (f = t == null ? void 0 : t.traitState) == null ? void 0 : f.reinforced) == null ? void 0 : h.max) ?? 0);
    return s > 0 && i.push({
      label: "Reinforced",
      value: `${Number(((y = (g = e == null ? void 0 : e.traitState) == null ? void 0 : g.reinforced) == null ? void 0 : y.current) ?? ((A = (b = t == null ? void 0 : t.traitState) == null ? void 0 : b.reinforced) == null ? void 0 : A.current) ?? 0)}/${s}`
    }), i;
  }
  _getArmorModifierSummary(e = null) {
    const t = this.item.system ?? {};
    return kp({
      defenseBonus: (e == null ? void 0 : e.defenseBonus) ?? t.defenseBonus ?? 0,
      mitigationByType: (e == null ? void 0 : e.mitigationByType) ?? (e == null ? void 0 : e.typedMitigation) ?? t.mitigationByType ?? {}
    });
  }
  _onRender(e, t) {
    var s, n;
    (s = super._onRender) == null || s.call(this, e, t);
    const i = (n = this._getRootElement) == null ? void 0 : n.call(this);
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
R(vn, "LAYOUT_ID", "armor"), R(vn, "PARTS", {
  sheet: {
    template: `${G}/v2/item/armor-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
function vp() {
  console.log(`${fe}Registering Item sheets (V2)`);
  const { Items: a } = foundry.documents.collections;
  a.registerSheet(w, gn, { types: ["contact"], makeDefault: !0, label: "Contact (V2)" }), a.registerSheet(w, yn, { types: ["gear"], makeDefault: !0, label: "Gear (V2)" }), a.registerSheet(w, bn, { types: ["quality"], makeDefault: !0, label: "Quality (V2)" }), a.registerSheet(w, Sn, { types: ["assetModule"], makeDefault: !0, label: "Asset Module (V2)" }), a.registerSheet(w, An, { types: ["lifeModule"], makeDefault: !0, label: "Life Module (V2)" }), a.registerSheet(w, wn, { types: ["skill"], makeDefault: !0, label: "Skill (V2)" }), a.registerSheet(w, Tn, { types: ["personalWeapon", "weapon"], makeDefault: !0, label: "Personal Weapon (V2)" }), a.registerSheet(w, kn, { types: ["mechWeapon"], makeDefault: !0, label: "Mech Weapon (V2)" }), a.registerSheet(w, vn, { types: ["armor"], makeDefault: !0, label: "Armor (V2)" });
}
const Gr = [
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
  // Sheet wrapper
  `systems/${w}/templates/v2/actor/_sheet-root.hbs`,
  // Placeholders
  `systems/${w}/templates/v2/ui/placeholders/assigned-systems.hbs`,
  `systems/${w}/templates/v2/ui/placeholders/inventory-gear.hbs`,
  `systems/${w}/templates/v2/ui/placeholders/inventory-armor.hbs`,
  `systems/${w}/templates/v2/ui/placeholders/inventory-weapons.hbs`,
  `systems/${w}/templates/v2/ui/placeholders/bio-description.hbs`,
  `systems/${w}/templates/v2/ui/placeholders/bio-traits.hbs`,
  `systems/${w}/templates/v2/ui/placeholders/bio-life-modules.hbs`,
  // V2 item partials
  `systems/${w}/templates/v2/item/_item-sheet-root.hbs`,
  `systems/${w}/templates/v2/item/contact.hbs`,
  `systems/${w}/templates/v2/item/gear.hbs`,
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
  `systems/${w}/templates/v2/actor/character-sheet.hbs`
];
function Mp(a) {
  const e = String(a).replaceAll("\\", "/"), t = `systems/${w}/templates/`, i = e.indexOf(t);
  return `mwd.${(i >= 0 ? e.slice(i + t.length) : e).replace(/\.hbs$/i, "").split("/").filter(Boolean).map((o) => o.replace(/^_+/, "")).join(".")}`;
}
function Cp() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
async function Ep() {
  var e, t;
  const a = Cp();
  try {
    const i = {};
    for (const n of Gr)
      i[Mp(n)] = n, i[n] = n;
    await foundry.applications.handlebars.loadTemplates(i);
    const s = "mwd.v2.ui.layout-root";
    if (!((e = Handlebars.partials) != null && e[s])) {
      const n = Object.keys(Handlebars.partials ?? {});
      throw console.error("Missing required partial:", s), console.error("Closest matches:", n.filter((r) => r.includes("layout-root"))), new Error(`Template preload failed: ${s} not registered`);
    }
    if (a !== Handlebars) {
      for (const [n, r] of Object.entries(a.partials ?? {}))
        if (!((t = Handlebars.partials) != null && t[n]))
          try {
            Handlebars.registerPartial(n, r);
          } catch {
          }
    }
    console.log(`${fe}preloadTemplatesV2 OK`, { loaded: Gr.length });
  } catch (i) {
    throw console.error(`${fe}preloadTemplatesV2 FAILED`, i), i;
  }
}
function Vr(a) {
  const e = Math.max(0, Number(a) || 0);
  return -Math.floor(e / 3);
}
function Pp(a) {
  const e = Math.max(0, Number(a) || 0);
  return e === 0 ? 0 : Math.ceil(e / 4);
}
function Np(a = {}) {
  const e = a.physical ?? {}, t = a.fatigue ?? {}, i = a.armor ?? {}, s = Number(e.value) || 0, n = Number(t.value) || 0, r = Math.max(Number(i.value) || 0, Number(i.max) || 0);
  return {
    physical: { penalty: Vr(s) },
    fatigue: { penalty: Vr(n) },
    armor: { resistance: Pp(r) }
  };
}
const _s = {
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
function Rp(a, e, t, i) {
  const s = a.system ?? {}, n = `monitors.${e}`, r = Number(foundry.utils.getProperty(s, `${n}.max`)) || 0, o = Number(foundry.utils.getProperty(s, `${n}.value`)) || 0;
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
function Ip(a = {}) {
  return Object.entries(yt(a)).filter(([, e]) => Number(e) > 0).map(([e, t]) => `${e} +${t}`).join(", ");
}
class Dp extends Actor {
  /* -------------------------------------------- */
  /* Base & Derived Data                           */
  /* -------------------------------------------- */
  /** @override */
  prepareBaseData() {
    var e, t;
    if (super.prepareBaseData(), this.isCharacterLike()) {
      const i = this.system ?? {};
      if (su(i), (e = i.skills) != null && e.skills && typeof i.skills.skills == "object") {
        for (const [s, n] of Object.entries(i.skills.skills))
          (t = i.skills)[s] ?? (t[s] = n);
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
        const n = Object.prototype.hasOwnProperty.call(s, "value"), r = Number(s.value);
        (!n || !Number.isFinite(r)) && (s.value = s.rating), "max" in s && delete s.max;
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
    const e = this.getEdgeCap(), t = this.type === "character" ? si(this).bonusByEdgePool ?? {} : {};
    if (this.type === "character" && this.hasEdgePools()) {
      const n = ((s = (i = this.system) == null ? void 0 : i.counters) == null ? void 0 : s.edgePools) ?? {}, r = {};
      for (const [o, l] of Object.entries(n)) {
        const c = Math.max(0, Number((l == null ? void 0 : l.rating) ?? 0)), u = Math.max(0, Number((l == null ? void 0 : l.value) ?? 0)), d = Math.max(0, Number((t == null ? void 0 : t[o]) ?? 0)), m = c + d, p = Math.min(m, e), f = Math.min(u, p);
        r[o] = {
          key: o,
          rating: c,
          ratingBonus: d,
          effectiveRating: m,
          value: u,
          cap: e,
          effectiveMax: p,
          effectiveValue: f,
          hasPools: !0,
          isEmpty: f <= 0,
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
    const e = [], t = this.items.filter((p) => {
      var f;
      return ((f = p.isPersonalWeapon) == null ? void 0 : f.call(p)) ?? p.type === S.itemType.personalWeapon;
    }).map((p) => {
      var f;
      return ((f = p.getCombatProfile) == null ? void 0 : f.call(p)) ?? null;
    }).filter(Boolean), i = this.items.filter((p) => {
      var f;
      return ((f = p.isArmor) == null ? void 0 : f.call(p)) ?? p.type === S.itemType.armor;
    }).map((p) => {
      var f;
      return ((f = p.getArmorProfile) == null ? void 0 : f.call(p, { actor: this })) ?? null;
    }).filter(Boolean), s = t.filter((p) => p.equipped), n = i.filter((p) => p.equipped), r = s.filter((p) => p.isPrimary), o = n.filter((p) => p.isPrimary);
    let l = null, c = null, u = !1;
    r.length === 1 ? (c = r[0], l = c) : r.length > 1 ? (e.push("Multiple equipped primary weapons found; attack selection requires a chooser."), u = !0) : s.length === 1 ? l = s[0] : s.length > 1 ? u = !0 : l = lt.buildDefaultUnarmedProfile(this);
    let d = null, m = null;
    return o.length === 1 ? (d = o[0], m = this._buildActiveArmorState(d)) : o.length > 1 ? (e.push("Multiple equipped primary armor items found; using the first equipped armor."), m = n[0] ? this._buildActiveArmorState(n[0]) : null) : n.length === 1 ? m = this._buildActiveArmorState(n[0]) : n.length > 1 && (e.push("Multiple equipped armor items found without a single primary; using the first equipped armor."), m = this._buildActiveArmorState(n[0])), {
      weapons: t,
      equippedWeapons: s,
      primaryWeapon: c,
      defaultWeapon: l,
      weaponChoiceRequired: u,
      armor: i,
      equippedArmor: n,
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
    ), s = Math.max(0, Number((e == null ? void 0 : e.rating) ?? 0)), n = Math.min(s, i), r = yt(e == null ? void 0 : e.mitigationByType), o = Dn(n);
    return {
      ...e,
      armorId: e.id,
      remainingDurability: i,
      currentArmorRating: n,
      baseMitigation: o,
      baseResistance: o,
      mitigationByType: r,
      typedMitigation: r,
      ratingCurrent: n,
      isDestroyed: i <= 0,
      durability: {
        current: i,
        max: t
      }
    };
  }
  async setOwnedItemEquipped(e, t) {
    var s, n, r;
    const i = this.getOwnedItem(e);
    return !i || !((s = i.isPersonalWeapon) != null && s.call(i) || (n = i.isArmor) != null && n.call(i)) ? null : this.updateEmbeddedDocuments("Item", [{
      _id: i.id,
      "system.equipped": !!t,
      "system.isPrimary": t ? !!((r = i.system) != null && r.isPrimary) : !1
    }]);
  }
  async setOwnedItemPrimary(e, t) {
    var r, o, l, c;
    const i = this.getOwnedItem(e);
    if (!i || !((r = i.isPersonalWeapon) != null && r.call(i) || (o = i.isArmor) != null && o.call(i))) return null;
    const s = [], n = !!t;
    if (n)
      for (const u of this.items.filter((d) => d.type === i.type && d.id !== i.id))
        (l = u.system) != null && l.isPrimary && s.push({ _id: u.id, "system.isPrimary": !1 });
    return s.push({
      _id: i.id,
      "system.isPrimary": n,
      "system.equipped": n ? !0 : !!((c = i.system) != null && c.equipped)
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
    var d, m, p, f;
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
    const i = (p = (m = (d = this._mwdDerived) == null ? void 0 : d.edgePools) == null ? void 0 : m.pools) == null ? void 0 : p[e];
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
    const s = this.getEdgePoolRaw(e), n = Math.max(0, Number((s == null ? void 0 : s.rating) ?? 0)), r = Math.max(0, Number((s == null ? void 0 : s.value) ?? 0)), o = Math.max(0, Number(((f = si(this).bonusByEdgePool) == null ? void 0 : f[e]) ?? 0)), l = n + o, c = Math.min(l, t), u = Math.min(r, c);
    return {
      key: e,
      value: r,
      rating: n,
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
    const i = Math.max(0, Number(((r = this.getEdgePool(e)) == null ? void 0 : r.effectiveMax) ?? 0)), s = Number(t ?? 0), n = Math.max(0, Math.min(s, i));
    return this.update({
      [`system.counters.edgePools.${e}.value`]: n
    });
  }
  /**
   * Convenience: adjust CURRENT value by delta (e.g., spend -1, award +1).
   */
  async adjustEdgePoolValue(e, t) {
    var n;
    if (!this.hasEdgePools()) return;
    const i = Math.max(0, Number(((n = this.getEdgePoolRaw(e)) == null ? void 0 : n.value) ?? 0)), s = Number(t ?? 0);
    return this.setEdgePoolValue(e, i + s);
  }
  /**
   * Set the RATING (advancement ceiling) for a pool.
   * Stores true rating (not cap-clamped), then clamps current value to new effective max.
   */
  async setEdgePoolRating(e, t) {
    var c, u;
    if (!this.hasEdgePools()) return;
    const i = this.getEdgeCap(), s = Math.max(0, Number(t ?? 0)), n = Math.max(0, Number(((c = si(this).bonusByEdgePool) == null ? void 0 : c[e]) ?? 0)), r = Math.min(s + n, i), o = Math.max(0, Number(((u = this.getEdgePoolRaw(e)) == null ? void 0 : u.value) ?? 0)), l = Math.min(o, r);
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
    var i, s, n, r;
    const t = this.getEdgeCap();
    if (this.hasEdgePools()) {
      const o = ((s = (i = this._mwdDerived) == null ? void 0 : i.edgePools) == null ? void 0 : s.pools) ?? {};
      if (e && typeof e == "object") {
        const c = Object.entries(e).map(([u, d]) => {
          const m = (d ?? []).map((p) => {
            const f = o[p] ?? this.getEdgePool(p);
            return {
              ...f,
              isEmpty: (f.effectiveValue ?? 0) <= 0,
              isCapped: (f.effectiveRating ?? f.rating ?? 0) > (f.cap ?? t)
            };
          });
          return { id: u, pools: m };
        });
        return { cap: t, hasPools: !0, groups: c, pools: [] };
      }
      const l = Object.keys(((r = (n = this.system) == null ? void 0 : n.counters) == null ? void 0 : r.edgePools) ?? {}).map((c) => {
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
    let n = s;
    if (!i.skipTraitHooks) {
      const o = i.runtime ?? {}, l = {
        poolKey: e,
        amount: s,
        source: String(i.source ?? "").trim(),
        eventKey: String(i.eventKey ?? "").trim()
      }, c = et({
        actor: this,
        phase: "onEdgeSpend",
        facts: Js({ actor: this, packet: l, phase: "onEdgeSpend", runtime: o }),
        packet: l,
        options: { runtime: o, consumeUsage: !0 }
      });
      await Dt({ actor: this, mutations: c.mutations, runtime: o }), n = Math.max(0, Number(c.packet.amount ?? s) || 0);
    }
    const r = n;
    if (r)
      return this.adjustEdgePoolValue(e, -r);
  }
  async gainEdge(e, t = 1, i = {}) {
    if (!this.hasEdgePools()) return;
    const s = Number(t ?? 0);
    if (!s) return;
    let n = s;
    if (!i.skipTraitHooks) {
      const r = i.runtime ?? {}, o = {
        poolKey: e,
        amount: s,
        source: String(i.source ?? "").trim(),
        eventKey: String(i.eventKey ?? "").trim()
      }, l = et({
        actor: this,
        phase: "onEdgeGain",
        facts: Js({ actor: this, packet: o, phase: "onEdgeGain", runtime: r }),
        packet: o,
        options: { runtime: r, consumeUsage: !0 }
      });
      await Dt({ actor: this, mutations: l.mutations, runtime: r }), n = Number(l.packet.amount ?? s) || 0;
    }
    return this.adjustEdgePoolValue(e, n);
  }
  /* -------------------------------------------- */
  /* Document Lifecycle                            */
  /* -------------------------------------------- */
  /** @override */
  async _onUpdate(e, t, i) {
    await super._onUpdate(e, t, i), game.userId === i && (t != null && t.mwdSyncOverloadedFromEffect || foundry.utils.hasProperty(e, "system.burn.overloaded") && await this._syncOverloadedEffect(!!e.system.burn.overloaded));
  }
  _onCreateDescendantDocuments(e, t, i, s, n, r) {
    super._onCreateDescendantDocuments(e, t, i, s, n, r), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  _onUpdateDescendantDocuments(e, t, i, s, n, r) {
    super._onUpdateDescendantDocuments(e, t, i, s, n, r), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  _onDeleteDescendantDocuments(e, t, i, s, n, r) {
    super._onDeleteDescendantDocuments(e, t, i, s, n, r), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  async _syncOverloadedEffect(e) {
    await this.toggleStatusEffect("overloaded", { active: e, overlay: !1 });
  }
  async _syncOverloadedFieldFromEffects() {
    var i, s, n, r;
    const e = ((s = (i = this.statuses) == null ? void 0 : i.has) == null ? void 0 : s.call(i, "overloaded")) ?? !1, t = !!((r = (n = this.system) == null ? void 0 : n.burn) != null && r.overloaded);
    e !== t && await this.update(
      { "system.burn.overloaded": e },
      { mwdSyncOverloadedFromEffect: !0 }
    );
  }
  /* -------------------------------------------- */
  /* Condition Monitors                            */
  /* -------------------------------------------- */
  async setMonitorValue(e, t, { source: i = "unknown" } = {}) {
    var d, m, p, f, h, g;
    if (e === "burn") {
      const y = Math.max(0, Number(t) || 0);
      return this.update({ "system.burn.value": y });
    }
    if (e === "armor" && this.isCharacterLike()) {
      const y = this.getPersonalCombatLoadout({ refresh: !0 }), b = ((d = y == null ? void 0 : y.activeArmor) == null ? void 0 : d.armorId) ?? ((m = y == null ? void 0 : y.activeArmor) == null ? void 0 : m.id) ?? null, A = b ? this.items.get(b) : null;
      if (!(A != null && A.id)) return null;
      const v = Math.max(0, Number(((p = A.system) == null ? void 0 : p.rating) ?? 0) || 0), C = Math.max(0, Number(((h = (f = A.system) == null ? void 0 : f.durability) == null ? void 0 : h.max) ?? 0) || 0), I = C > 0 ? C : v, P = Math.min(Math.max(0, Number(t) || 0), I);
      return this.updateEmbeddedDocuments("Item", [{
        _id: A.id,
        "system.durability.max": I,
        "system.durability.current": P
      }]);
    }
    const s = `system.monitors.${e}`, n = Number(foundry.utils.getProperty(this, `${s}.max`)) || 0, r = Math.max(0, n), o = Math.min(Math.max(0, Number(t) || 0), r), l = { [`${s}.value`]: o }, c = this.type, u = (g = ys == null ? void 0 : ys[c]) == null ? void 0 : g[e];
    if (u != null && u.derived)
      for (const [y, b] of Object.entries(u.derived)) {
        const A = _s == null ? void 0 : _s[b.fn];
        if (typeof A != "function") continue;
        const v = Rp(this, e, b.source, o);
        l[`${s}.derived.${y}`] = A(v);
      }
    return this.update(l);
  }
  _prepareMonitors() {
    var o, l, c, u, d, m, p, f;
    const e = this.system.monitors ?? {}, t = Np(e);
    (o = this.system).derived ?? (o.derived = {}), this.system.derived.monitors = t;
    const i = Number(((l = t == null ? void 0 : t.physical) == null ? void 0 : l.penalty) ?? 0), s = Number(((c = t == null ? void 0 : t.fatigue) == null ? void 0 : c.penalty) ?? 0), n = Number(((u = t == null ? void 0 : t.armor) == null ? void 0 : u.resistance) ?? 0), r = i + s;
    e.physical ?? (e.physical = {}), (d = e.physical).derived ?? (d.derived = {}), e.physical.derived.penalty = i, e.fatigue ?? (e.fatigue = {}), (m = e.fatigue).derived ?? (m.derived = {}), e.fatigue.derived.penalty = s, e.armor ?? (e.armor = {}), (p = e.armor).derived ?? (p.derived = {}), e.armor.derived.resistance = n, (f = this.system.derived).condition ?? (f.condition = {}), this.system.derived.condition.physicalPenalty = i, this.system.derived.condition.fatiguePenalty = s, this.system.derived.condition.totalPenalty = r, this.system.derived.conditionPenalty = r;
  }
  _preparePersonalCombatDerived() {
    var r, o, l, c, u, d;
    if (!this.isCharacterLike()) return;
    const e = this.getPersonalCombatLoadout({ refresh: !0 }), t = (o = (r = this.system) == null ? void 0 : r.monitors) == null ? void 0 : o.armor;
    if (!t) return;
    const i = e.activeArmor, s = Math.max(0, Number(((l = i == null ? void 0 : i.durability) == null ? void 0 : l.max) ?? 0)), n = Math.max(0, Number((i == null ? void 0 : i.remainingDurability) ?? ((c = i == null ? void 0 : i.durability) == null ? void 0 : c.current) ?? 0));
    t.max = s, t.value = Math.min(s, n), t.resistance = {
      default: Number((i == null ? void 0 : i.baseMitigation) ?? (i == null ? void 0 : i.baseResistance) ?? 0),
      byType: {}
    }, t.resistanceBonusByType = i != null && i.isDestroyed ? {} : (i == null ? void 0 : i.mitigationByType) ?? (i == null ? void 0 : i.typedMitigation) ?? {}, t.derived ?? (t.derived = {}), t.derived.resistance = Number((i == null ? void 0 : i.baseMitigation) ?? (i == null ? void 0 : i.baseResistance) ?? 0), t.effect = i != null && i.isDestroyed ? "Destroyed" : i ? Ip(i.mitigationByType ?? i.typedMitigation) : "", (u = this.system).derived ?? (u.derived = {}), this.system.derived.personalCombat = {
      defaultWeaponId: ((d = e.defaultWeapon) == null ? void 0 : d.id) ?? null,
      activeArmorId: (i == null ? void 0 : i.id) ?? null,
      warnings: [...e.warnings ?? []]
    };
  }
}
async function Op({ actor: a, payload: e } = {}) {
  var g, y, b, A, v, C;
  if (!a) throw new Error("resolveSkill requires actor");
  const t = String((e == null ? void 0 : e.key) ?? "").trim(), i = ct(t);
  if (!i) throw new Error(`Unknown skill: ${t}`);
  const s = a.system ?? {}, n = String((e == null ? void 0 : e.attrKey) ?? i.attribute ?? "").trim();
  if (!n) throw new Error(`Skill ${t} missing attribute key`);
  const r = Number(((y = (g = s == null ? void 0 : s.attributes) == null ? void 0 : g[n]) == null ? void 0 : y.value) ?? 0), o = Number(((A = (b = s == null ? void 0 : s.skills) == null ? void 0 : b[t]) == null ? void 0 : A.rating) ?? 0), l = Number(((C = (v = s == null ? void 0 : s.skills) == null ? void 0 : v[t]) == null ? void 0 : C.bonus) ?? 0), c = new Set(ss(s, t)), u = $n(t, e == null ? void 0 : e.specializationKey), d = u && c.has(u.key) ? u : null, m = d ? On : 0, p = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : i.domains ?? [], f = Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : Number.isFinite(Number(e == null ? void 0 : e.target)) ? Number(e.target) : 5, h = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1;
  return {
    intent: "skill",
    rollType: "simple",
    title: `${i.label} (${n})`,
    subtitle: a.name ?? "Actor",
    domains: p,
    // Per-die threshold (cs>=X). Kept separate from dnHits.
    diceTarget: f,
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
      attrKey: n,
      label: `${n}+${i.label}`,
      specializationKey: (d == null ? void 0 : d.key) ?? "",
      specializationLabel: (d == null ? void 0 : d.label) ?? ""
    }
  };
}
const _p = /* @__PURE__ */ new Set([
  "grit",
  "chaos",
  "insight",
  "rumor",
  "legend",
  "credibility"
]), Lp = {
  grit: "physical",
  chaos: "physical",
  insight: "mental",
  rumor: "mental",
  legend: "social",
  credibility: "social"
};
async function $p({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveEdge requires actor");
  const t = String((e == null ? void 0 : e.pool) ?? "").trim();
  if (!_p.has(t)) throw new Error(`Invalid edge pool: ${t}`);
  const i = a.getEdgePool(t), s = Math.max(0, Number((i == null ? void 0 : i.effectiveValue) ?? 0));
  return {
    intent: "edge",
    title: `Edge — ${t}`,
    subtitle: a.name ?? "Actor",
    domains: [Lp[t] ?? "unknown"],
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
async function xp({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Attribute",
    intent: "attribute",
    domainTags: ["general"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function Bp({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveCommon requires actor");
  const t = String((e == null ? void 0 : e.id) ?? "").trim();
  if (!t) throw new Error("Common rolls require payload.id");
  const i = Bn(t);
  if (!i) throw new Error(`Unknown common check: ${t}`);
  const s = Array.isArray(i.formula) ? i.formula : [];
  if (s.length !== 2)
    throw new Error(`Common check ${t} must define exactly two attributes.`);
  const n = s.map((c) => {
    var d, m, p;
    const u = gu(c);
    if (!u) throw new Error(`Common check ${t} uses unsupported attribute code: ${c}`);
    return {
      code: String(c).trim().toUpperCase(),
      key: u,
      label: yu(c),
      value: Number(((p = (m = (d = a.system) == null ? void 0 : d.attributes) == null ? void 0 : m[u]) == null ? void 0 : p.value) ?? 0)
    };
  }), r = n.reduce((c, u) => c + Number(u.value ?? 0), 0), o = Array.isArray(i.tags) ? [...i.tags] : [], l = Array.isArray(i.domains) ? [...i.domains] : [];
  return {
    intent: "common",
    rollType: "simple",
    title: String(i.label ?? t).trim() || t,
    subtitle: a.name ?? "Actor",
    domains: l,
    tags: o,
    formula: bu(s),
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
    breakdown: n.map((c) => ({
      id: `attribute.${c.code.toLowerCase()}`,
      label: c.label,
      value: c.value
    })),
    data: {
      commonCheckId: t,
      label: String(i.label ?? t).trim() || t,
      formulaCodes: s,
      tags: o,
      attributes: n
    }
  };
}
const ms = 90;
function Kr(a) {
  const e = canvas.app.view.getBoundingClientRect(), t = new PIXI.Point(
    Number(a.clientX ?? 0) - e.left,
    Number(a.clientY ?? 0) - e.top
  );
  return canvas.stage.worldTransform.applyInverse(t);
}
function ps() {
  var a, e, t;
  return Number(((e = (a = canvas.scene) == null ? void 0 : a.grid) == null ? void 0 : e.distance) ?? ((t = canvas.dimensions) == null ? void 0 : t.distance) ?? 1) || 1;
}
function ra() {
  var a, e;
  return Number(((a = canvas.grid) == null ? void 0 : a.size) ?? ((e = canvas.dimensions) == null ? void 0 : e.size) ?? 100) || 100;
}
function Yr(a = 0) {
  return (Number(a ?? 0) || 0) * (ra() / ps());
}
function Bl(a = {}) {
  return Math.max(0, Number((a == null ? void 0 : a.size) ?? 0) || 0) * ps();
}
function Fp(a) {
  let e = Number(a ?? 0) || 0;
  for (; e <= -180; ) e += 360;
  for (; e > 180; ) e -= 360;
  return e;
}
function Mn(a) {
  return (Number(a ?? 0) || 0) * (180 / Math.PI);
}
function zp(a) {
  return (Number(a ?? 0) || 0) * (Math.PI / 180);
}
function Qr(a, e) {
  const t = Number((e == null ? void 0 : e.x) ?? 0) - Number((a == null ? void 0 : a.x) ?? 0), i = Number((e == null ? void 0 : e.y) ?? 0) - Number((a == null ? void 0 : a.y) ?? 0);
  return t === 0 && i === 0 ? 0 : Mn(Math.atan2(i, t));
}
function Fl(a) {
  var t, i, s, n;
  return ((i = (t = canvas.tokens) == null ? void 0 : t.controlled) == null ? void 0 : i.find((r) => {
    var o;
    return ((o = r.actor) == null ? void 0 : o.id) === (a == null ? void 0 : a.id);
  })) ?? null ?? ((n = (s = a == null ? void 0 : a.getActiveTokens) == null ? void 0 : s.call(a, !0, !0)) == null ? void 0 : n[0]) ?? null;
}
function zl(a) {
  var r, o, l, c, u;
  const e = (a == null ? void 0 : a.center) ?? ((r = a == null ? void 0 : a.object) == null ? void 0 : r.center);
  if (e) return { x: Number(e.x ?? 0), y: Number(e.y ?? 0) };
  const t = Number((a == null ? void 0 : a.x) ?? ((o = a == null ? void 0 : a.document) == null ? void 0 : o.x) ?? 0), i = Number((a == null ? void 0 : a.y) ?? ((l = a == null ? void 0 : a.document) == null ? void 0 : l.y) ?? 0), s = Number((a == null ? void 0 : a.w) ?? (a == null ? void 0 : a.width) ?? ((c = a == null ? void 0 : a.document) == null ? void 0 : c.width) ?? 1) * ra(), n = Number((a == null ? void 0 : a.h) ?? (a == null ? void 0 : a.height) ?? ((u = a == null ? void 0 : a.document) == null ? void 0 : u.height) ?? 1) * ra();
  return { x: t + s / 2, y: i + n / 2 };
}
function Wp(a) {
  var i, s, n, r;
  const e = Number((a == null ? void 0 : a.w) ?? ((i = a == null ? void 0 : a.object) == null ? void 0 : i.w) ?? 0) || Number(((s = a == null ? void 0 : a.document) == null ? void 0 : s.width) ?? 1) * ra(), t = Number((a == null ? void 0 : a.h) ?? ((n = a == null ? void 0 : a.object) == null ? void 0 : n.h) ?? 0) || Number(((r = a == null ? void 0 : a.document) == null ? void 0 : r.height) ?? 1) * ra();
  return Math.max(e, t) / 2;
}
function Up(a = {}, e = { x: 0, y: 0 }, t = 0) {
  var s, n;
  const i = {
    user: ((s = game.user) == null ? void 0 : s.id) ?? null,
    x: Number((e == null ? void 0 : e.x) ?? 0) || 0,
    y: Number((e == null ? void 0 : e.y) ?? 0) || 0,
    direction: Number(t ?? 0) || 0,
    distance: Bl(a),
    fillColor: ((n = game.user) == null ? void 0 : n.color) ?? "#ff6400"
  };
  switch (a == null ? void 0 : a.shape) {
    case "blast":
      return { ...i, t: "circle" };
    case "cone":
      return { ...i, t: "cone", angle: ms };
    case "line":
      return { ...i, t: "ray", width: ps() };
    default:
      return i;
  }
}
function jp({ anchor: a, radiusPx: e, tokenCenter: t, tokenRadius: i }) {
  const s = t.x - a.x, n = t.y - a.y;
  return Math.hypot(s, n) <= e + i;
}
function Hp({ anchor: a, distancePx: e, widthPx: t, direction: i, tokenCenter: s, tokenRadius: n }) {
  const r = s.x - a.x, o = s.y - a.y, l = zp(i), c = Math.cos(l), u = Math.sin(l), d = r * c + o * u;
  if (d < -n || d > e + n) return !1;
  const m = a.x + Math.max(0, Math.min(e, d)) * c, p = a.y + Math.max(0, Math.min(e, d)) * u;
  return Math.hypot(s.x - m, s.y - p) <= n + t / 2;
}
function qp({ anchor: a, distancePx: e, direction: t, angle: i, tokenCenter: s, tokenRadius: n }) {
  const r = s.x - a.x, o = s.y - a.y, l = Math.hypot(r, o);
  if (l > e + n) return !1;
  if (l === 0) return !0;
  const c = Mn(Math.atan2(o, r)), u = Math.abs(Fp(c - t)), d = Number(i ?? ms) / 2, m = Mn(Math.asin(Math.min(1, n / Math.max(l, 1))));
  return u <= d + m;
}
function Gp({ template: a, placement: e, token: t }) {
  const i = zl(t), s = Wp(t), n = Yr(e.distance);
  switch (a == null ? void 0 : a.shape) {
    case "blast":
      return jp({
        anchor: e.anchor,
        radiusPx: n,
        tokenCenter: i,
        tokenRadius: s
      });
    case "line":
      return Hp({
        anchor: e.anchor,
        distancePx: n,
        widthPx: Yr(ps()),
        direction: e.direction,
        tokenCenter: i,
        tokenRadius: s
      });
    case "cone":
      return qp({
        anchor: e.anchor,
        distancePx: n,
        direction: e.direction,
        angle: e.angle ?? ms,
        tokenCenter: i,
        tokenRadius: s
      });
    default:
      return !1;
  }
}
function Vp(a = {}) {
  var e, t, i, s, n, r, o;
  a.object && ((i = (t = (e = canvas.templates) == null ? void 0 : e.preview) == null ? void 0 : t.removeChild) == null || i.call(t, a.object), (n = (s = a.object).destroy) == null || n.call(s, { children: !0 })), (o = (r = canvas.templates) == null ? void 0 : r.clearPreviewContainer) == null || o.call(r);
}
async function Kp(a = {}, e = {}, t = { x: 0, y: 0 }, i = 0) {
  var n, r, o, l;
  const s = Up(e, t, i);
  if (!a.object) {
    const c = CONFIG.MeasuredTemplate.documentClass, u = CONFIG.MeasuredTemplate.objectClass, d = new c(s, { parent: canvas.scene }), m = new u(d);
    a.object = m, await m.draw(), canvas.templates.preview.addChild(m);
    return;
  }
  a.object.document.updateSource(s), (r = (n = a.object.renderFlags) == null ? void 0 : n.set) == null || r.call(n, { refreshState: !0, refreshShape: !0, refreshGrid: !0 }), (l = (o = a.object).refresh) == null || l.call(o);
}
function Yp({ template: a, anchor: e, direction: t }) {
  return {
    shape: a.shape,
    placement: a.placement,
    size: Number(a.size ?? 0) || 0,
    distance: Bl(a),
    angle: a.shape === "cone" ? ms : void 0,
    anchor: {
      x: Number((e == null ? void 0 : e.x) ?? 0) || 0,
      y: Number((e == null ? void 0 : e.y) ?? 0) || 0
    },
    direction: Number(t ?? 0) || 0
  };
}
function Wl(a) {
  var s, n, r, o, l, c, u, d, m, p;
  const e = (a == null ? void 0 : a.actor) ?? null;
  if (!e) return null;
  const t = ((s = e == null ? void 0 : e.getPersonalCombatLoadout) == null ? void 0 : s.call(e)) ?? null, i = (t == null ? void 0 : t.activeArmor) ?? null;
  return {
    tokenId: (a == null ? void 0 : a.id) ?? null,
    tokenUuid: ((n = a == null ? void 0 : a.document) == null ? void 0 : n.uuid) ?? null,
    actorId: e.id,
    actorUuid: e.uuid,
    name: e.name ?? (a == null ? void 0 : a.name) ?? "Target",
    attributes: {
      reflexes: Number(((l = (o = (r = e == null ? void 0 : e.system) == null ? void 0 : r.attributes) == null ? void 0 : o.reflexes) == null ? void 0 : l.value) ?? 0) || 0
    },
    skills: {
      tactics: {
        rating: Number(((d = (u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.skills) == null ? void 0 : u.tactics) == null ? void 0 : d.rating) ?? 0) || 0
      }
    },
    activeArmor: i ? {
      armorId: i.id,
      rating: Number(i.ratingCurrent ?? i.rating ?? 0),
      currentArmorRating: Number(i.currentArmorRating ?? ((m = i.durability) == null ? void 0 : m.current) ?? 0),
      remainingDurability: Number(i.remainingDurability ?? ((p = i.durability) == null ? void 0 : p.current) ?? 0),
      baseMitigation: Number(i.baseMitigation ?? i.baseResistance ?? 0),
      baseResistance: Number(i.baseMitigation ?? i.baseResistance ?? 0),
      mitigationByType: { ...i.mitigationByType ?? i.typedMitigation ?? {} },
      tags: [...i.tags ?? []],
      isDestroyed: !!i.isDestroyed,
      defenseBonus: Number(i.defenseBonus ?? 0)
    } : null
  };
}
function Qp({ template: a, placement: e, attacker: t } = {}) {
  var n;
  const i = Fl(t), s = (i == null ? void 0 : i.id) ?? null;
  return (((n = canvas.tokens) == null ? void 0 : n.placeables) ?? []).filter((r) => r == null ? void 0 : r.actor).filter((r) => r.id !== s || (a == null ? void 0 : a.placement) === "origin").filter((r) => Gp({ template: a, placement: e, token: r })).map(Wl).filter(Boolean);
}
async function Jp({ actor: a, attack: e } = {}) {
  var f;
  if (!(canvas != null && canvas.scene) || !((f = canvas == null ? void 0 : canvas.templates) != null && f.preview))
    throw Ni("Templated attacks require an active scene canvas.", { severity: "warn" });
  const t = (e == null ? void 0 : e.template) ?? null;
  if (!(t != null && t.shape) || !(Number(t == null ? void 0 : t.size) > 0))
    throw Ni("Templated attack is missing valid template configuration.", { severity: "warn" });
  if (!pc.includes(t.shape))
    throw Ni(`Template shape "${t.shape}" is normalized but not supported in v1.`, { severity: "warn" });
  const i = Fl(a);
  if (t.placement === "origin" && !i)
    throw Ni("Origin-placed templated attacks require the attacker to have a token on the current scene.", { severity: "warn" });
  const s = {}, n = {
    phase: t.placement === "origin" ? "direction" : "anchor",
    anchor: t.placement === "origin" ? zl(i) : null,
    direction: 0
  }, r = async (h, g = null, y = null) => {
    if (window.removeEventListener("keydown", m, !0), canvas.app.view.removeEventListener("pointermove", u), canvas.app.view.removeEventListener("click", p, !0), canvas.app.view.removeEventListener("contextmenu", d, !0), Vp(s), y) {
      h(Promise.reject(y));
      return;
    }
    h(g);
  }, o = async (h = null) => {
    !n.anchor && h && (n.anchor = { x: h.x, y: h.y }), n.anchor && (t.shape !== "blast" && h && (n.direction = Qr(n.anchor, h)), await Kp(s, t, n.anchor, n.direction));
  };
  let l = null;
  const c = new Promise((h) => {
    l = h;
  }), u = (h) => {
    const g = Kr(h);
    o(g);
  }, d = (h) => {
    h.preventDefault(), r(l, null);
  }, m = (h) => {
    h.key === "Escape" && (h.preventDefault(), r(l, null));
  }, p = (h) => {
    h.preventDefault(), h.stopPropagation();
    const g = Kr(h);
    if (n.anchor || (n.anchor = { x: g.x, y: g.y }), n.phase === "anchor" && t.shape !== "blast") {
      n.phase = "direction", o(g);
      return;
    }
    t.shape !== "blast" && (n.direction = Qr(n.anchor, g));
    const y = Yp({
      template: t,
      anchor: n.anchor,
      direction: n.direction
    }), b = Qp({ template: t, placement: y, attacker: a });
    r(l, { placement: y, targetSnapshots: b });
  };
  return window.addEventListener("keydown", m, !0), canvas.app.view.addEventListener("pointermove", u), canvas.app.view.addEventListener("click", p, !0), canvas.app.view.addEventListener("contextmenu", d, !0), n.anchor && await o(n.anchor), c;
}
function Xp(a = {}) {
  var e;
  return Array.isArray(a == null ? void 0 : a.targetSnapshots) ? a.targetSnapshots : Array.from(((e = game.user) == null ? void 0 : e.targets) ?? []).map(Wl).filter(Boolean);
}
function Zp(a, e) {
  var i, s, n, r, o, l, c;
  if (((i = e == null ? void 0 : e.syntheticWeapon) == null ? void 0 : i.id) === "unarmed") {
    const u = lt.buildDefaultUnarmedProfile(a);
    return {
      ...u,
      ...e.syntheticWeapon,
      damage: u.damage,
      attackRatingBand: {
        ...((s = e.syntheticWeapon) == null ? void 0 : s.attackRatingBand) ?? u.attackRatingBand,
        close: u.attackRatingBand.close
      },
      isSynthetic: !0,
      defaultRangeBand: "close"
    };
  }
  const t = ((r = (n = a.items) == null ? void 0 : n.get) == null ? void 0 : r.call(n, (e == null ? void 0 : e.weaponId) ?? "")) ?? null;
  if (!t || !(((o = t.isPersonalWeapon) == null ? void 0 : o.call(t)) ?? t.type === "personalWeapon") || !((l = t.system) != null && l.equipped))
    throw new Error("Attack requires an equipped personal weapon.");
  return ((c = t.getCombatProfile) == null ? void 0 : c.call(t, { payloadId: e == null ? void 0 : e.payloadId })) ?? null;
}
async function ef({ actor: a, payload: e } = {}) {
  var v, C, I, P, x, V, Q, K, H, D, W, X, Z, ie, ue, Se, O;
  if (!a) throw new Error("resolveAttack requires actor");
  const t = Zp(a, e);
  if (!t) throw new Error("Unable to resolve weapon profile.");
  if (Array.isArray((v = t == null ? void 0 : t.capabilityReport) == null ? void 0 : v.errors) && t.capabilityReport.errors.length > 0)
    throw Ni(
      ((C = t.capabilityReport.errors[0]) == null ? void 0 : C.message) ?? "Weapon capability data is invalid for this attack.",
      { severity: "warn" }
    );
  const i = ct(t.skill) ?? {
    code: t.skill,
    label: t.skill || "Attack",
    attribute: "reflexes",
    domains: ["physical"]
  }, s = String(i.attribute ?? "reflexes").trim() || "reflexes", n = ((I = a.getAttributeValue) == null ? void 0 : I.call(a, s)) ?? Number(((V = (x = (P = a.system) == null ? void 0 : P.attributes) == null ? void 0 : x[s]) == null ? void 0 : V.value) ?? 0), r = ((Q = a.getSkillRating) == null ? void 0 : Q.call(a, t.skill)) ?? Number(((D = (H = (K = a.system) == null ? void 0 : K.skills) == null ? void 0 : H[t.skill]) == null ? void 0 : D.rating) ?? 0), o = Number(((Z = (X = (W = a.system) == null ? void 0 : W.skills) == null ? void 0 : X[t.skill]) == null ? void 0 : Z.bonus) ?? 0), l = new Set(ss(a.system ?? {}, t.skill)), c = $n(t.skill, e == null ? void 0 : e.specializationKey), u = c && l.has(c.key) ? c : null, d = u ? On : 0, m = Number(((ie = t == null ? void 0 : t.effects) == null ? void 0 : ie.accuracyMod) ?? 0) || 0, p = o + m, f = String((e == null ? void 0 : e.rangeBand) ?? t.defaultRangeBand ?? "close").trim() || "close", h = Number(((ue = t == null ? void 0 : t.attackRatingBand) == null ? void 0 : ue[f]) ?? 0) || 0, g = Xp(e);
  if (!!!((Se = t == null ? void 0 : t.capabilityReport) != null && Se.isTemplated) && g.length === 0)
    throw Ni("Target at least one token to attack.", { severity: "warn" });
  const b = Number(t.ap ?? 0) + Number(((O = t == null ? void 0 : t.effects) == null ? void 0 : O.ap) ?? 0), A = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1;
  return {
    intent: "attack",
    rollType: "simple",
    title: `${t.name} Attack`,
    subtitle: a.name ?? "Actor",
    domains: Array.isArray(i.domains) && i.domains.length ? i.domains : ["physical"],
    domainTags: ["combat", "attack"],
    diceTarget: Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : 5,
    difficulty: { dn: A },
    dn: {
      parts: [{
        id: "difficulty.current",
        label: "DN",
        value: A,
        tags: ["manual"]
      }],
      total: A
    },
    edge: {
      earn: { enabled: !0, rate: 4, maxPerRoll: 1 }
    },
    pool: { attribute: n, skill: r, bonus: p, specialization: d },
    breakdown: [
      { id: "attribute", label: "Attribute", value: n },
      { id: "skill", label: i.label, value: r },
      { id: "bonus", label: "Skill Bonus", value: o },
      ...u ? [{
        id: "specialization",
        label: `Specialization (${u.label})`,
        value: d
      }] : [],
      { id: "weaponAccuracy", label: "Weapon Accuracy", value: m },
      { id: "damage", label: "Damage", value: Number(t.damage ?? 0) || 0 },
      { id: "ap", label: "AP", value: b },
      { id: "attackRating", label: `Attack Rating (${f})`, value: h }
    ],
    attack: {
      rangeBand: f,
      weapon: t,
      payload: (t == null ? void 0 : t.payload) ?? null,
      payloadState: (t == null ? void 0 : t.payloadState) ?? null,
      source: (t == null ? void 0 : t.source) ?? null,
      sourceState: (t == null ? void 0 : t.sourceState) ?? null,
      template: (t == null ? void 0 : t.template) ?? null,
      templatePlacement: (e == null ? void 0 : e.templatePlacement) ?? null,
      resolution: (t == null ? void 0 : t.resolution) ?? null,
      resolverKey: (t == null ? void 0 : t.resolverKey) ?? "standard",
      fireModes: (t == null ? void 0 : t.fireModes) ?? null,
      keywords: (t == null ? void 0 : t.keywords) ?? [],
      capabilityReport: (t == null ? void 0 : t.capabilityReport) ?? null,
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
      targets: g,
      totalAp: b
    },
    specialization: u ? {
      key: u.key,
      label: u.label,
      value: d,
      skillKey: i.code ?? t.skill
    } : null
  };
}
async function tf({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Defense",
    intent: "defense",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function af({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Resistance",
    intent: "resistance",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function sf({ actor: a } = {}) {
  var i, s, n, r, o, l;
  const e = Number(((n = (s = (i = a.system) == null ? void 0 : i.attributes) == null ? void 0 : s.reflexes) == null ? void 0 : n.value) ?? 0), t = Number(((l = (o = (r = a.system) == null ? void 0 : r.attributes) == null ? void 0 : o.edge) == null ? void 0 : l.value) ?? 0);
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
async function nf({ actor: a }) {
  var i, s, n, r, o;
  const e = Number(((s = (i = a.system) == null ? void 0 : i.burn) == null ? void 0 : s.value) ?? 0);
  e < 6 && ui.notifications.warn("Overload check is only required at Burn 6+.");
  const t = Number(((o = (r = (n = a.system) == null ? void 0 : n.attributes) == null ? void 0 : r.willpower) == null ? void 0 : o.value) ?? 0);
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
const rf = {
  skill: Op,
  edge: $p,
  attribute: xp,
  common: Bp,
  attack: ef,
  defense: tf,
  resistance: af,
  initiative: sf,
  overload: nf
};
async function Ls({ actor: a, payload: e, event: t } = {}) {
  if (!a) throw new Error("resolveIntent requires actor");
  const i = String((e == null ? void 0 : e.intent) ?? "").trim();
  if (!i) throw new Error("resolveIntent requires payload.intent");
  const s = rf[i];
  if (!s) throw new Error(`Unsupported roll intent: ${i}`);
  const n = await s({ actor: a, payload: e, event: t });
  return of(n, { intent: i });
}
function of(a, { intent: e } = {}) {
  (!a || typeof a != "object") && (a = {}), a.intent = a.intent ?? e ?? "unknown", a.title = String(a.title ?? "Roll"), a.domains = Array.isArray(a.domains) ? a.domains : [], a.breakdown = Array.isArray(a.breakdown) ? a.breakdown : [], a.mods = Array.isArray(a.mods) ? a.mods : [];
  const t = a.pool && typeof a.pool == "object" ? a.pool : {}, i = Number(t.attribute ?? t.base ?? 0), s = Number(t.skill ?? t.rating ?? 0), n = Number(t.bonus ?? 0), r = Number(t.specialization ?? 0);
  if (![i, s, n, r].every(Number.isFinite))
    throw console.error("MWD | Invalid pool parts after intent resolution", { intent: e, ctx: a }), new Error("MWD.roll: pool parts must be numeric (attribute/skill/bonus/specialization).");
  return a.pool = {
    attribute: i,
    skill: s,
    bonus: n,
    specialization: r,
    totalBase: i + s + n + r
  }, a.rollType = a.rollType ?? "simple", a.diceTarget = Number.isFinite(a.diceTarget) ? a.diceTarget : Number(a.target ?? 5), a.difficulty && typeof a.difficulty == "object" ? a.difficulty.dn = Number(a.difficulty.dn ?? 0) : Number.isFinite(a.dn) && (a.difficulty = { dn: Number(a.dn) }), a.breakdown.length || (a.breakdown = [
    { id: "attribute", label: "Attribute", value: i },
    { id: "skill", label: "Skill", value: s },
    { id: "bonus", label: "Bonus", value: n },
    ...r ? [{ id: "specialization", label: "Specialization", value: r }] : []
  ]), a;
}
var _i;
class lf {
  constructor() {
    Te(this, _i, /* @__PURE__ */ new Map());
  }
  register(e) {
    if (!(e != null && e.id) || typeof e.collect != "function")
      throw new Error("Invalid ModifierProvider: missing id or collect()");
    z(this, _i).has(e.id) || z(this, _i).set(e.id, e);
  }
  async collectAll(e) {
    const t = [];
    for (const i of z(this, _i).values()) {
      const s = await i.collect(e);
      if (console.log("MWD | provider", i.id, "returned", s), !!(s != null && s.length))
        for (const n of s)
          n && typeof n.label == "string" && typeof n.value == "number" && typeof n.source == "string" ? t.push(n) : console.warn("MWD | DROPPED MOD (bad shape)", i.id, n);
    }
    return t;
  }
}
_i = new WeakMap();
const Ct = new lf();
function cf(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function uf(a) {
  const e = cf(a == null ? void 0 : a.value);
  return e === null ? null : { ...a, value: e };
}
async function Jr({
  actor: a,
  rollType: e,
  skillId: t,
  domains: i,
  // NEW (optional)
  payload: s,
  resolved: n,
  context: r
} = {}) {
  const o = { actor: a, rollType: e, skillId: t, domains: i, payload: s, resolved: n, context: r }, l = await Ct.collectAll(o);
  console.log("MWD|condition collect called", o.rollType);
  let c = [];
  for (const d of l ?? []) {
    const m = uf(d);
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
function df({
  actor: a,
  payload: e,
  ctx: t,
  roll: i,
  target: s,
  pool: n,
  mods: r = [],
  modTotal: o = 0,
  hits: l = null,
  ones: c = null,
  edge: u = null,
  outcomeModel: d = null
} = {}) {
  var V, Q, K, H;
  if (!a) throw new Error("buildResolved requires actor");
  if (!(e != null && e.intent)) throw new Error("buildResolved requires payload.intent");
  if (!i) throw new Error("buildResolved requires roll");
  const m = foundry.utils.randomID(), p = (V = i.dice) == null ? void 0 : V[0], h = (Array.isArray(p == null ? void 0 : p.results) ? p.results : []).map((D, W) => {
    const X = `pool:${W}`, Z = Number(D.result), ie = !!D.success;
    return {
      ref: X,
      face: Z,
      isSuccess: ie,
      isFailure: !ie,
      tooltip: ie ? `Die ${W + 1}: ${Z} (Success vs TN ${Number(s ?? 5)})` : `Die ${W + 1}: ${Z} (Failure vs TN ${Number(s ?? 5)})`
    };
  }), g = h.filter((D) => D.isFailure).map((D) => D.ref), y = [{
    id: "pool",
    label: "Pool",
    faces: 6,
    termIndex: 0,
    // informational only
    dice: h
  }], b = (Array.isArray(r) ? r : []).map((D, W) => {
    const X = Number(D.value ?? 0), Z = `mod:${pf(D.label ?? "mod")}:${W}`;
    return {
      id: D.id ?? Z,
      label: D.label ?? "Modifier",
      value: X,
      domain: D.domain ?? null,
      source: D.source ?? null,
      tooltip: D.tooltip ?? `${D.label ?? "Modifier"} ${Xr(X)}`
    };
  }), A = b.map((D) => D.id), C = (Array.isArray(t == null ? void 0 : t.breakdown) ? t.breakdown : []).map((D) => ({
    id: `pool.${D.id ?? foundry.utils.randomID()}`,
    label: D.label ?? D.id ?? "Row",
    value: Number(D.value ?? 0),
    tooltip: `Contribution from ${D.label ?? D.id}: ${Number(D.value ?? 0)}`
  }));
  C.push({
    id: "mods.total",
    label: "Mods",
    value: Number(o ?? 0),
    modIds: A,
    tooltip: b.length ? b.map((D) => `${D.label}: ${Xr(D.value)}`).join(`
`) : "No roll-time modifiers."
  }), C.push({
    id: "pool.final",
    label: "Final Pool",
    value: Number(n ?? 0),
    tooltip: `Final dice pool rolled: ${Number(n ?? 0)}d6`
  });
  const I = Number.isFinite(Number(l)) ? Number(l) : h.filter((D) => D.isSuccess).length, P = Number.isFinite(Number(c)) ? Number(c) : h.filter((D) => D.face === 1).length, x = mf(u, { payload: e });
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
        earn: ((H = t == null ? void 0 : t.edge) == null ? void 0 : H.earn) ?? null
      }
    },
    // Roll + dice
    roll: {
      json: i.toJSON(),
      formula: i.formula,
      target: Number(s ?? 5),
      pool: Number(n ?? 0),
      diceGroups: y,
      failureDiceRefs: g
    },
    // Outcome numbers
    outcome: {
      hits: I,
      ones: P
    },
    // New: engine-interpreted outcome (margin/net/converted/edgeEarned/etc
    outcomeModel: d,
    // Breakdown + modifiers
    breakdownRows: C,
    modifiers: {
      applied: b,
      total: Number(o ?? 0)
    },
    // Edge snapshot / affordances
    edge: x
  };
}
function mf(a, { payload: e } = {}) {
  var f, h, g, y, b, A, v, C, I, P, x, V, Q, K;
  const t = !!((f = e == null ? void 0 : e.edge) != null && f.enabled), i = (a == null ? void 0 : a.domain) ?? null, s = (a == null ? void 0 : a.pools) ?? null, n = ((h = a == null ? void 0 : a.pre) == null ? void 0 : h.poolKey) ?? ((y = (g = e == null ? void 0 : e.edge) == null ? void 0 : g.pre) == null ? void 0 : y.poolKey) ?? (t ? ((b = e == null ? void 0 : e.edge) == null ? void 0 : b.poolKey) ?? null : null), r = Number(((A = a == null ? void 0 : a.pre) == null ? void 0 : A.spent) ?? ((C = (v = e == null ? void 0 : e.edge) == null ? void 0 : v.pre) == null ? void 0 : C.spent) ?? (t ? 1 : 0)) ? 1 : 0, o = ((I = a == null ? void 0 : a.post) == null ? void 0 : I.poolKey) ?? ((x = (P = e == null ? void 0 : e.edge) == null ? void 0 : P.post) == null ? void 0 : x.poolKey) ?? null, l = Number(((V = a == null ? void 0 : a.post) == null ? void 0 : V.spent) ?? ((K = (Q = e == null ? void 0 : e.edge) == null ? void 0 : Q.post) == null ? void 0 : K.spent) ?? 0) ? 1 : 0, c = (s == null ? void 0 : s.a) ?? null, u = (s == null ? void 0 : s.b) ?? null, d = [c, u].filter(Boolean);
  let m = [c, u].filter(Boolean);
  r && n && (m = m.filter((H) => H !== n));
  const p = {
    canSpendPre: d.length > 0 && !r,
    // spending pre after roll is not a thing
    canSpendPost: m.length > 0 && !l,
    canPostRerollFailures: m.length > 0 && !l
  };
  return {
    domain: i,
    pools: s ? { a: c, b: u } : null,
    pre: { poolKey: n, spent: r },
    post: { poolKey: o, spent: l },
    allowed: {
      prePools: d,
      postPools: m
    },
    availableActions: p
  };
}
function Xr(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function pf(a) {
  return String(a).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function ff(a, e) {
  var c, u, d, m, p, f, h, g, y;
  const t = a ?? {}, i = Array.isArray((c = t == null ? void 0 : t.modifiers) == null ? void 0 : c.applied) ? t.modifiers.applied : [], s = Number(((u = t == null ? void 0 : t.modifiers) == null ? void 0 : u.total) ?? 0);
  if (i.length) {
    const b = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((A) => A.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${i.map((A) => `${A.label} ${Zr(A.value)}`).join(", ")} (Total ${Zr(s)})`,
      title: (b == null ? void 0 : b.tooltip) ?? ""
    });
  }
  const n = (t == null ? void 0 : t.edge) ?? null, r = Array.isArray((d = t == null ? void 0 : t.roll) == null ? void 0 : d.failureDiceRefs) ? t.roll.failureDiceRefs : [], o = !!((m = n == null ? void 0 : n.availableActions) != null && m.canPostRerollFailures), l = Array.isArray((p = n == null ? void 0 : n.allowed) == null ? void 0 : p.postPools) ? n.allowed.postPools : [];
  if (n != null && n.domain && (e.edge = {
    domain: n.domain,
    earned: ((f = t == null ? void 0 : t.outcomeModel) == null ? void 0 : f.edgeEarned) ?? null,
    preSpent: Number(((h = n == null ? void 0 : n.pre) == null ? void 0 : h.spent) ?? 0),
    postSpent: Number(((g = n == null ? void 0 : n.post) == null ? void 0 : g.spent) ?? 0),
    canPost: o && r.length > 0 && l.length > 0,
    failureCount: r.length,
    postPools: l
  }, e.metaRows.push({
    text: `Edge: ${n.domain} • pre ${e.edge.preSpent} • post ${e.edge.postSpent}`,
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
function Zr(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function hf(a, e) {
  var h, g, y, b, A, v, C, I, P, x, V, Q, K, H, D, W, X, Z, ie, ue, Se;
  const t = a ?? {}, i = (t == null ? void 0 : t.attackResult) ?? null;
  if (!i) return;
  const s = Array.isArray(i == null ? void 0 : i.results) ? i.results : [], n = (i == null ? void 0 : i.summary) ?? yf(s), r = s.some((O) => {
    var F;
    return !!((F = O == null ? void 0 : O.queuedMutation) != null && F.applied);
  }), o = s.filter(
    (O) => (O == null ? void 0 : O.queuedMutation) && !O.queuedMutation.applied
  ), l = Array.isArray((h = t == null ? void 0 : t.modifiers) == null ? void 0 : h.applied) ? t.modifiers.applied : [], c = Number(((g = t == null ? void 0 : t.modifiers) == null ? void 0 : g.total) ?? 0);
  if (l.length) {
    const O = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((F) => F.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${l.map((F) => `${F.label} ${Ri(F.value)}`).join(", ")} (Total ${Ri(c)})`,
      title: (O == null ? void 0 : O.tooltip) ?? ""
    });
  }
  const u = (t == null ? void 0 : t.edge) ?? null, d = Array.isArray((y = t == null ? void 0 : t.roll) == null ? void 0 : y.failureDiceRefs) ? t.roll.failureDiceRefs : [], m = !!((b = u == null ? void 0 : u.availableActions) != null && b.canPostRerollFailures) && !r, p = Array.isArray((A = u == null ? void 0 : u.allowed) == null ? void 0 : A.postPools) ? u.allowed.postPools : [];
  if (u != null && u.domain && (e.edge = {
    domain: u.domain,
    earned: ((v = t == null ? void 0 : t.outcomeModel) == null ? void 0 : v.edgeEarned) ?? null,
    preSpent: Number(((C = u == null ? void 0 : u.pre) == null ? void 0 : C.spent) ?? 0),
    postSpent: Number(((I = u == null ? void 0 : u.post) == null ? void 0 : I.spent) ?? 0),
    canPost: m && d.length > 0 && p.length > 0,
    failureCount: d.length,
    postPools: p
  }, e.metaRows.push({
    text: `Edge: ${u.domain} | pre ${e.edge.preSpent} | post ${e.edge.postSpent}`,
    title: ""
  })), (P = e.edge) != null && P.canPost) {
    e.footerRows.push({
      text: `Post-spend: Reroll ${e.edge.failureCount} failure${e.edge.failureCount === 1 ? "" : "s"}`
    });
    for (const O of e.edge.postPools)
      e.actions.push({
        action: "edgePostReroll",
        label: `Spend ${O}`,
        dataset: { "pool-key": O },
        cssClass: "mwd-edge-post"
      });
  }
  const f = String((n == null ? void 0 : n.overallOutcome) ?? "").trim();
  e.outcomeText = s.length > 1 ? `ATTACK ${n.hits} HIT / ${n.grazes} GRAZE / ${n.misses} MISS` : f === "hit" ? "HIT!" : f === "graze" ? "GRAZE!" : "MISS!", e.metaRows.push({
    text: `Targets: ${s.length || 0}`,
    title: ""
  }), s.length > 1 && o.length > 1 && e.actions.push({
    action: "applyAllAttackDamage",
    label: `Apply All Damage (${o.length})`,
    cssClass: "mwd-apply-all-attack-damage"
  });
  for (const O of s) {
    const F = Number(((V = (x = O == null ? void 0 : O.cq) == null ? void 0 : x.ar) == null ? void 0 : V.total) ?? 0), Le = Number(((K = (Q = O == null ? void 0 : O.cq) == null ? void 0 : Q.dr) == null ? void 0 : K.total) ?? 0);
    e.metaRows.push({
      text: `${((H = O == null ? void 0 : O.target) == null ? void 0 : H.name) ?? "Target"}: ${String((O == null ? void 0 : O.outcome) ?? "miss").toUpperCase()} | CQ ${Ri(((D = O == null ? void 0 : O.cq) == null ? void 0 : D.value) ?? 0)} (AR ${F} - DR ${Le}) | Net ${Number((O == null ? void 0 : O.netHits) ?? 0)}`,
      title: gf(O == null ? void 0 : O.cq)
    });
  }
  for (const [O, F] of s.entries()) {
    const Le = (F == null ? void 0 : F.damage) ?? null;
    Le && (F == null ? void 0 : F.outcome) !== "miss" && e.footerRows.push({
      text: `${((W = F == null ? void 0 : F.target) == null ? void 0 : W.name) ?? "Target"}: ${Le.damageTypeLabel} ${Ri(Le.effectiveWeaponDamage)} weapon${Le.netHits ? ` + ${Le.netHits} net` : ""}`,
      title: ""
    });
    const J = (F == null ? void 0 : F.damageResult) ?? null;
    if (J != null && J.ok && !(J != null && J.skipped)) {
      const Ye = (F == null ? void 0 : F.queuedMutation) ?? (J == null ? void 0 : J.queuedMutation) ?? null, it = !!(Ye != null && Ye.applied || J != null && J.applied);
      e.footerRows.push({
        text: `${J.actorName ?? ((X = F == null ? void 0 : F.target) == null ? void 0 : X.name) ?? "Target"}: ${it ? "Applied" : "Queued"} ${Number(J.finalDamage ?? J.appliedDelta ?? 0)}`,
        title: ""
      }), J.beforeLabel && J.afterLabel && e.footerRows.push({
        text: `${J.actorName ?? ((Z = F == null ? void 0 : F.target) == null ? void 0 : Z.name) ?? "Target"} Track: ${J.beforeLabel} -> ${J.afterLabel}`,
        title: ""
      }), J.usedArmor && J.mitigation && e.footerRows.push({
        text: `${J.actorName ?? ((ie = F == null ? void 0 : F.target) == null ? void 0 : ie.name) ?? "Target"} Mitigation: ${Number(J.mitigation.baseMitigation ?? 0)} + ${Number(J.mitigation.typeMitigationMod ?? 0)} - ${Number(J.effectiveAp ?? 0)} = ${Number(J.mitigation.netResistance ?? 0)}`,
        title: ""
      }), Ye && !it && e.actions.push({
        action: "applyAttackDamage",
        label: `Apply Damage: ${J.actorName ?? ((ue = F == null ? void 0 : F.target) == null ? void 0 : ue.name) ?? "Target"}`,
        dataset: { "result-index": String(O) },
        cssClass: "mwd-apply-attack-damage"
      });
    } else J != null && J.reason && e.footerRows.push({
      text: `${((Se = F == null ? void 0 : F.target) == null ? void 0 : Se.name) ?? "Target"}: ${J.reason}`,
      title: ""
    });
  }
}
function gf(a = {}) {
  var i, s;
  const e = Array.isArray((i = a == null ? void 0 : a.ar) == null ? void 0 : i.parts) ? a.ar.parts : [], t = Array.isArray((s = a == null ? void 0 : a.dr) == null ? void 0 : s.parts) ? a.dr.parts : [];
  return [
    ...e.map((n) => `AR - ${n.label}: ${Ri(n.value)}`),
    ...t.map((n) => `DR - ${n.label}: ${Ri(n.value)}`)
  ].join(`
`);
}
function yf(a = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of a)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
function Ri(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function bf(a, e) {
  var c;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, s = (i == null ? void 0 : i.net) ?? null;
  if (!s) return;
  e.net = s;
  const n = Number((s == null ? void 0 : s.converted) ?? 0), r = Number((s == null ? void 0 : s.value) ?? 0), o = Number((s == null ? void 0 : s.rate) ?? 4);
  e.metaRows.push({
    text: `Net: ${r} • Converted: ${n} • Rate: ${o}`,
    title: ""
  });
  const l = ((c = i == null ? void 0 : i.edgeEarned) == null ? void 0 : c.amount) > 0 ? i.edgeEarned : null;
  l && e.footerRows.push({
    text: `Edge Earned: +${l.amount}${l.pool ? ` (${l.pool})` : ""}`,
    title: l.reason ?? ""
  });
}
function Sf(a, e) {
  var l, c, u, d;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, s = Number(((l = i == null ? void 0 : i.attacker) == null ? void 0 : l.successes) ?? (i == null ? void 0 : i.attackerHits) ?? NaN), n = Number(((c = i == null ? void 0 : i.defender) == null ? void 0 : c.successes) ?? (i == null ? void 0 : i.defenderHits) ?? NaN), r = Number((i == null ? void 0 : i.netHits) ?? (i == null ? void 0 : i.net) ?? NaN);
  Number.isFinite(s) && Number.isFinite(n) && e.metaRows.push({ text: `Opposed: Att ${s} vs Def ${n} • Net ${Number.isFinite(r) ? r : s - n}` }), (u = t == null ? void 0 : t.incoming) != null && u.label && (e.incoming = { label: t.incoming.label, value: t.incoming.value ?? "" }, e.footerRows.push({ text: `Incoming: ${e.incoming.label} ${e.incoming.value}` }));
  const o = ((d = i == null ? void 0 : i.edgeEarned) == null ? void 0 : d.amount) > 0 ? i.edgeEarned : null;
  o && e.footerRows.push({ text: `Edge Earned: +${o.amount}${o.pool ? ` (${o.pool})` : ""}` });
}
function Af(a, e) {
  var c;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, s = (i == null ? void 0 : i.extended) ?? null;
  if (!s) return;
  e.extended = s;
  const n = Number((s == null ? void 0 : s.progress) ?? 0), r = Number((s == null ? void 0 : s.target) ?? 0), o = Number((s == null ? void 0 : s.remaining) ?? Math.max(0, r - n));
  e.metaRows.push({
    text: `Extended: ${n}/${r} (Remaining ${o})`,
    title: ""
  }), s != null && s.completed && e.footerRows.push({ text: `Completed in ${Number((s == null ? void 0 : s.rounds) ?? (s == null ? void 0 : s.attempts) ?? 0) || "?"} attempts.` });
  const l = ((c = i == null ? void 0 : i.edgeEarned) == null ? void 0 : c.amount) > 0 ? i.edgeEarned : null;
  l && e.footerRows.push({ text: `Edge Earned: +${l.amount}${l.pool ? ` (${l.pool})` : ""}` });
}
const wf = {
  skill: ff,
  attack: hf,
  net: bf,
  opposed: Sf,
  extended: Af
  // defense: enhanceDefense,
  // edge: enhanceEdge,
};
async function fs({ resolved: a } = {}) {
  const e = a ?? {}, t = Tf(e), i = wf[t.intent];
  return typeof i == "function" && i(e, t), await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-roll-card",
    t
  );
}
function Tf(a) {
  var p, f, h, g, y, b, A, v, C, I, P, x, V, Q, K;
  const e = a ?? {}, t = Number(((p = e == null ? void 0 : e.roll) == null ? void 0 : p.target) ?? 5), i = Number(((f = e == null ? void 0 : e.dn) == null ? void 0 : f.total) ?? ((g = (h = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : h.dn) == null ? void 0 : g.total) ?? ((b = (y = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : y.difficulty) == null ? void 0 : b.dn) ?? 0), s = Number(((A = e == null ? void 0 : e.roll) == null ? void 0 : A.pool) ?? 0), n = Number(((v = e == null ? void 0 : e.outcome) == null ? void 0 : v.hits) ?? 0), r = (e == null ? void 0 : e.outcomeModel) ?? {}, o = typeof r.passed == "boolean" ? r.passed : n >= i, l = Number.isFinite(Number(r.margin)) ? Number(r.margin) : n - i, c = r.tier ?? null, u = Array.isArray(e == null ? void 0 : e.breakdownRows) ? e.breakdownRows.map((H) => `${H.label}: ${H.value}`).join(`
`) : "", d = {
    header: { left: (e == null ? void 0 : e.title) ?? "Roll", right: (e == null ? void 0 : e.subtitle) ?? "" },
    formula: String((e == null ? void 0 : e.formula) ?? "").trim(),
    intent: (e == null ? void 0 : e.intent) ?? "unknown",
    domains: Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [],
    tn: t,
    dn: i,
    pool: s,
    hits: n,
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
  }, m = (e == null ? void 0 : e.attack) ?? null;
  if ((C = e == null ? void 0 : e.specialization) != null && C.label && d.metaRows.push({
    text: `Specialization: ${e.specialization.label} (+${Number(e.specialization.value ?? 0)})`,
    title: ""
  }), (I = m == null ? void 0 : m.weapon) != null && I.name) {
    const H = String((m == null ? void 0 : m.rangeBand) ?? "").trim(), D = String(((P = m == null ? void 0 : m.weapon) == null ? void 0 : P.damageTypeLabel) ?? ((x = m == null ? void 0 : m.weapon) == null ? void 0 : x.damageType) ?? "").trim(), W = String(((V = m == null ? void 0 : m.payload) == null ? void 0 : V.label) ?? ((Q = m == null ? void 0 : m.weapon) == null ? void 0 : Q.payloadLabel) ?? "").trim();
    d.metaRows.push({
      text: `Weapon: ${m.weapon.name}${H ? ` • Range: ${H}` : ""}${D ? ` • Type: ${D}` : ""}${W ? ` • Payload: ${W}` : ""}`,
      title: ""
    }), (K = m == null ? void 0 : m.sourceState) != null && K.isTracked && d.footerRows.push({
      text: `Source: ${Number(m.sourceState.current ?? 0)}/${Number(m.sourceState.max ?? 0)}`,
      title: ""
    });
  }
  return d;
}
function Ce(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
function $s(a, e = 0, t = Number.POSITIVE_INFINITY) {
  const i = Ce(a, e);
  return Math.max(e, Math.min(t, i));
}
function Ul(a, e = 1) {
  var i;
  const t = Ce((i = a == null ? void 0 : a.difficulty) == null ? void 0 : i.dn, Ce(e, 1));
  return Math.max(0, t);
}
function kf(a, e) {
  return Math.max(0, Ce(a, 0) - Ce(e, 0));
}
function vf({ convert: a, remainder: e, rate: t = 4 } = {}) {
  const i = Math.max(0, Ce(e, 0)), s = Math.max(1, Ce(t, 4)), n = Math.max(0, Ce(a, 0)), r = Math.floor(n / s) * s;
  return Math.min(i, r);
}
function Qn(a, { rate: e = 4, maxPerRoll: t = Number.POSITIVE_INFINITY } = {}) {
  const i = Math.max(1, Ce(e, 4)), s = Math.floor(Math.max(0, Ce(a, 0)) / i), n = Number.isFinite(t) ? Math.max(0, Ce(t, 0)) : Number.POSITIVE_INFINITY;
  return { amount: Math.min(s, n), rate: i };
}
function Jn(a) {
  var i;
  const e = ((i = a == null ? void 0 : a.edge) == null ? void 0 : i.earn) ?? {};
  return {
    enabled: !!(e != null && e.enabled),
    rate: Math.max(1, Ce(e == null ? void 0 : e.rate, 4)),
    maxPerRoll: (e == null ? void 0 : e.maxPerRoll) ?? Number.POSITIVE_INFINITY
  };
}
function Ja(a) {
  var t;
  const e = (t = a == null ? void 0 : a.edge) == null ? void 0 : t.pool;
  return e ? String(e) : null;
}
function Mf(a) {
  let e = 0, t = 0;
  const i = (s) => {
    if (!s) return;
    const n = s == null ? void 0 : s.results;
    if (Array.isArray(n))
      for (const o of n) {
        if ((o == null ? void 0 : o.active) === !1) continue;
        const l = Number(o == null ? void 0 : o.result);
        Number.isFinite(l) && (e += 1, l === 1 && (t += 1));
      }
    const r = s == null ? void 0 : s.terms;
    if (Array.isArray(r))
      for (const o of r) i(o);
    if (Array.isArray(s))
      for (const o of s) i(o);
  };
  return i(a), { dice: e, ones: t };
}
function jl(a, e) {
  if (Ce(a, 0) !== 0) return !1;
  const { dice: t, ones: i } = Mf(e);
  return t <= 0 ? !1 : i >= Math.ceil(t / 2);
}
function Cf(a, e, t = 4) {
  return !!(a && Ce(e, 0) >= Ce(t, 4));
}
function eo(a, e) {
  const t = Ce(e == null ? void 0 : e.successes, 0), i = Ul(a, 1), s = t >= i, n = t - i, r = Cf(s, n, 4), o = jl(t, e == null ? void 0 : e.raw), l = Jn(a), c = l.maxPerRoll ?? 1, u = l.enabled && n >= l.rate ? (() => {
    const { amount: m, rate: p } = Qn(n, { rate: l.rate, maxPerRoll: c }), f = Ja(a);
    return m > 0 ? { amount: m, pool: f, reason: "net4", details: { margin: n, rate: p } } : null;
  })() : null;
  return {
    rollType: "simple",
    passed: s,
    successes: t,
    difficulty: { dn: i },
    margin: n,
    criticalSuccess: r,
    criticalFailure: o,
    tier: r ? "criticalSuccess" : o ? "criticalFailure" : s ? "success" : "failure",
    edgeEarned: u
  };
}
function Ef(a, e, t) {
  var m, p;
  const i = Ce(e == null ? void 0 : e.successes, 0), s = Ce(t == null ? void 0 : t.successes, 0), n = !!((m = a == null ? void 0 : a.opposed) != null && m.net), r = String(((p = a == null ? void 0 : a.opposed) == null ? void 0 : p.dnTies) ?? "stalemate");
  let o = null, l = !1;
  n ? (o = i - s, o > 0 ? l = !0 : o < 0 ? l = !1 : r === "attackerWins" ? l = !0 : l = !1) : i > s ? l = !0 : i < s ? l = !1 : r === "attackerWins" ? l = !0 : l = !1;
  const c = Jn(a), u = c.maxPerRoll ?? 1, d = c.enabled && n && typeof o == "number" && o >= c.rate ? (() => {
    const { amount: f, rate: h } = Qn(o, { rate: c.rate, maxPerRoll: u }), g = Ja(a);
    return f > 0 ? { amount: f, pool: g, reason: "net4", details: { netHits: o, rate: h } } : null;
  })() : null;
  return {
    rollType: "opposed",
    passed: l,
    successes: i,
    opposed: {
      attacker: i,
      defender: s,
      netEnabled: n,
      netHits: n ? o : void 0,
      tiePolicy: r
    },
    edgeEarned: d
  };
}
function Pf(a, e) {
  var h, g, y;
  const t = Ce(e == null ? void 0 : e.successes, 0), i = Ul(a, 1), s = t >= i, n = jl(t, e == null ? void 0 : e.raw), r = kf(t, i), o = ((h = a == null ? void 0 : a.net) == null ? void 0 : h.convert) ?? ((g = a == null ? void 0 : a.allocation) == null ? void 0 : g.convert) ?? 0, l = Jn(a), c = l.rate, u = vf({ convert: o, remainder: r, rate: c }), d = r - u, m = l.enabled && u >= c ? (() => {
    const { amount: b } = Qn(u, { rate: c, maxPerRoll: l.maxPerRoll }), A = Ja(a);
    return b > 0 ? { amount: b, pool: A, reason: "convert4", details: { converted: u, rate: c } } : null;
  })() : null, p = n ? { amount: 1, pool: Ja(a), reason: "critFail", details: { onesRule: "halfOrMoreOnes" } } : null, f = [];
  return m && f.push(m), p && f.push(p), f.length === 0 || (f.length === 1 ? f[0] : (f.reduce((b, A) => b + (Number(A == null ? void 0 : A.amount) || 0), 0), (y = f[0]) == null || y.pool)), {
    rollType: "net",
    passed: s,
    successes: t,
    difficulty: { dn: i },
    criticalFailure: n,
    tier: n ? "criticalFailure" : s ? "success" : "failure",
    net: {
      remainder: r,
      convertRequested: Ce(o, 0),
      converted: u,
      value: d,
      // the actual net effect magnitude you apply (+net dice, etc.)
      rate: c,
      canConvert: r >= c
    },
    edgeEarned: m
  };
}
function Nf(a, e) {
  var o, l, c, u;
  const t = Ce(e == null ? void 0 : e.successes, 0), i = $s((o = a == null ? void 0 : a.extended) == null ? void 0 : o.target, 1, 1e4), s = $s((l = a == null ? void 0 : a.extended) == null ? void 0 : l.accumulated, 0, 1e4), n = $s(s + t, 0, 1e4), r = n >= i;
  return {
    rollType: "extended",
    passed: r,
    successes: t,
    extended: {
      target: i,
      accumulated: s,
      nextAccumulated: n,
      remaining: Math.max(0, i - n),
      completed: r,
      interval: ((c = a == null ? void 0 : a.extended) == null ? void 0 : c.interval) ?? null,
      failureLimit: ((u = a == null ? void 0 : a.extended) == null ? void 0 : u.failureLimit) ?? null
    },
    // NOTE: Edge earn rules for extended are intentionally omitted per your earlier constraint.
    edgeEarned: null
  };
}
function Hl(a, e, t = null) {
  var s;
  switch (String((a == null ? void 0 : a.rollType) ?? "simple")) {
    case "simple":
      return eo(a, e);
    case "opposed":
      return Ef(a, e, t);
    case "net":
      return Pf(a, e);
    case "extended":
      return Nf(a, e);
    default: {
      const n = {
        ...a,
        difficulty: { dn: Number(((s = a == null ? void 0 : a.difficulty) == null ? void 0 : s.dn) ?? 1) || 1 }
      };
      return eo(n, e);
    }
  }
}
const { ApplicationV2: Rf, HandlebarsApplicationMixin: If } = foundry.applications.api;
function Df(a, e = -3, t = 3) {
  const i = [], s = "../img/dice";
  for (let n = e; n <= t; n++) {
    const r = Math.abs(n), o = r === 0 ? `${s}/BlankDice.webp` : `${s}/D6_${r}.svg`;
    i.push({
      value: n,
      abs: r,
      icon: o,
      active: n === a,
      neg: n < 0,
      pos: n > 0,
      zero: n === 0,
      title: n === 0 ? "0 (neutral)" : n < 0 ? `${n} penalty` : `+${n} bonus`
    });
  }
  return i;
}
function to(a) {
  return (Array.isArray(a) ? a : []).map((t) => ({
    id: (t == null ? void 0 : t.id) ?? foundry.utils.randomID(),
    label: typeof (t == null ? void 0 : t.label) == "string" ? t.label : "Manual",
    value: Number((t == null ? void 0 : t.value) ?? 0)
  }));
}
function xs(a, e) {
  const t = a == null ? void 0 : a.toggles;
  return t && typeof t == "object" && e in t ? !!t[e] : !!(a != null && a[e]);
}
function Of(a, e) {
  a.useEdge = !!e.useEdge, a.takeRisks = !!e.takeRisks, a.opponentRoll = !!e.opponentRoll, a.toggles = a.toggles && typeof a.toggles == "object" ? a.toggles : {}, a.toggles.useEdge = !!e.useEdge, a.toggles.takeRisks = !!e.takeRisks, a.toggles.opponentRoll = !!e.opponentRoll;
}
function io(a, e, t) {
  const i = String(t ?? "").trim(), s = i ? tu(e, i) : "";
  if (i && s) {
    a.specializationKey = i, a.specializationLabel = s;
    return;
  }
  delete a.specializationKey, delete a.specializationLabel;
}
function _f(a) {
  const e = Array.isArray(a == null ? void 0 : a.breakdown) ? a.breakdown : [], t = (i) => {
    var s;
    return Number(((s = e.find((n) => (n == null ? void 0 : n.id) === i)) == null ? void 0 : s.value) ?? 0);
  };
  return {
    attribute: t("attribute"),
    skill: t("skill"),
    bonus: t("bonus"),
    specialization: t("specialization")
  };
}
var Qe;
const Re = class Re extends If(Rf) {
  constructor({ actor: t, baseContext: i, initialState: s = null, options: n = {} }) {
    var c, u;
    super(n);
    Te(this, Qe, null);
    /** @type {{ baseContext: any, state: any }} */
    R(this, "_mwd", { baseContext: null, state: null });
    this.actor = t, this._mwd.baseContext = i ?? {};
    const r = foundry.utils.deepClone(this._mwd.baseContext.payload ?? {}), o = to(r.manualModifiers);
    this._mwd.state = foundry.utils.mergeObject(
      {
        payload: r,
        manual: o,
        toggles: {
          useEdge: xs(r, "useEdge"),
          takeRisks: xs(r, "takeRisks"),
          opponentRoll: xs(r, "opponentRoll")
        }
      },
      s ?? {},
      { inplace: !1, insertKeys: !0, insertValues: !0, overwrite: !0 }
    );
    const l = String(((u = (c = r == null ? void 0 : r.edge) == null ? void 0 : c.pre) == null ? void 0 : u.poolKey) ?? "").trim() || null;
    this._mwd.state.edge = {
      prePoolKey: l
    };
  }
  async wait() {
    return new Promise((t) => {
      De(this, Qe, t), this.render(!0);
    });
  }
  async close(t = {}) {
    if (z(this, Qe)) {
      const i = z(this, Qe);
      De(this, Qe, null), i(null);
    }
    return super.close(t);
  }
  /* --------------------------- */
  /* Prepare Context             */
  /* --------------------------- */
  async _prepareContext(t) {
    var V, Q, K, H, D, W, X, Z, ie, ue, Se, O, F, Le, J, Ye, it, _t, Lt, $t, xt, Bt, Ft, zt, Wt, Ut, dt, jt, Ht, qt, k, N, q, de, he, Ae, Ee;
    const i = this._mwd.baseContext ?? {}, s = this._mwd.state ?? {}, n = Number.isFinite(Number((V = s == null ? void 0 : s.payload) == null ? void 0 : V.dn)) ? Number(s.payload.dn) : Number.isFinite(Number(i == null ? void 0 : i.dn)) ? Number(i.dn) : Number.isFinite(Number((K = (Q = i == null ? void 0 : i.resolved) == null ? void 0 : Q.difficulty) == null ? void 0 : K.dn)) ? Number(i.resolved.difficulty.dn) : 1, r = (i == null ? void 0 : i.intent) ?? "skill";
    let o, l;
    const c = Array.isArray(s.manual) ? s.manual.reduce((j, ae) => j + Number((ae == null ? void 0 : ae.value) || 0), 0) : 0;
    if (r === "edge") {
      const j = (i == null ? void 0 : i.resolved) ?? {}, ae = Array.isArray(j.breakdown) ? j.breakdown : [], $e = (Be) => {
        var Ge;
        return Number(((Ge = ae.find((B) => B.id === Be)) == null ? void 0 : Ge.value) ?? 0);
      }, xe = Number(((H = j == null ? void 0 : j.pool) == null ? void 0 : H.attribute) ?? 0);
      o = {
        pool: xe,
        rating: $e("rating"),
        cap: $e("cap"),
        modifiers: Number(((D = i == null ? void 0 : i.dice) == null ? void 0 : D.modifiers) ?? 0)
      }, l = Math.max(0, xe + o.modifiers + c);
    } else {
      o = {
        attribute: Number(((W = i == null ? void 0 : i.dice) == null ? void 0 : W.attribute) ?? 0),
        skill: Number(((X = i == null ? void 0 : i.dice) == null ? void 0 : X.skill) ?? 0),
        bonus: Number(((Z = i == null ? void 0 : i.dice) == null ? void 0 : Z.bonus) ?? 0),
        specialization: Number(((ie = i == null ? void 0 : i.dice) == null ? void 0 : ie.specialization) ?? 0),
        modifiers: Number(((ue = i == null ? void 0 : i.dice) == null ? void 0 : ue.modifiers) ?? 0)
      };
      const j = o.modifiers + c, ae = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, ae + j);
    }
    const u = Array.isArray((Se = i == null ? void 0 : i.resolved) == null ? void 0 : Se.domains) ? i.resolved.domains : [], d = u.includes("physical") ? "physical" : u.includes("mental") ? "mental" : u.includes("social") ? "social" : null, p = (d === "physical" ? ["grit", "chaos"] : d === "mental" ? ["insight", "rumor"] : d === "social" ? ["legend", "credibility"] : []).map((j) => {
      var ae, $e, xe, Be;
      return {
        key: j,
        label: j.charAt(0).toUpperCase() + j.slice(1),
        available: Number(((xe = ($e = (ae = this.actor) == null ? void 0 : ae.getEdgePool) == null ? void 0 : $e.call(ae, j)) == null ? void 0 : xe.effectiveValue) ?? 0),
        selected: j === (((Be = s.edge) == null ? void 0 : Be.prePoolKey) ?? null)
      };
    }), f = p.find((j) => j.selected), h = (f == null ? void 0 : f.label) ?? null, g = ((O = i == null ? void 0 : i.resolved) == null ? void 0 : O.attack) ?? null, y = String(
      ((F = g == null ? void 0 : g.skill) == null ? void 0 : F.code) ?? ((J = (Le = i == null ? void 0 : i.resolved) == null ? void 0 : Le.specialization) == null ? void 0 : J.skillKey) ?? ((it = (Ye = i == null ? void 0 : i.resolved) == null ? void 0 : Ye.data) == null ? void 0 : it.skillKey) ?? ((_t = i == null ? void 0 : i.payload) == null ? void 0 : _t.key) ?? ""
    ).trim(), b = y ? $o(((Lt = this.actor) == null ? void 0 : Lt.system) ?? {}, y) : [], A = String((($t = s == null ? void 0 : s.payload) == null ? void 0 : $t.specializationKey) ?? "").trim(), v = b.find((j) => j.key === A) ?? null;
    if (r !== "edge") {
      o.specialization = v ? Number(((Bt = (xt = i == null ? void 0 : i.resolved) == null ? void 0 : xt.specialization) == null ? void 0 : Bt.value) ?? 2) : 0;
      const j = o.modifiers + c, ae = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, ae + j);
    }
    const C = Array.isArray((Ft = g == null ? void 0 : g.payloadState) == null ? void 0 : Ft.payloads) ? g.payloadState.payloads : [], I = String(((zt = g == null ? void 0 : g.weapon) == null ? void 0 : zt.category) ?? "").trim().toLowerCase() !== "melee" && C.length > 0, P = String(((Wt = s == null ? void 0 : s.payload) == null ? void 0 : Wt.payloadId) ?? ((Ut = g == null ? void 0 : g.payloadState) == null ? void 0 : Ut.activePayloadId) ?? "").trim(), x = C.find((j) => j.id === P) ?? null;
    return {
      header: {
        left: ((dt = i == null ? void 0 : i.header) == null ? void 0 : dt.left) ?? "Roll",
        right: ((jt = i == null ? void 0 : i.header) == null ? void 0 : jt.right) ?? ((Ht = this.actor) == null ? void 0 : Ht.name) ?? ""
      },
      formula: String((i == null ? void 0 : i.formula) ?? ((qt = i == null ? void 0 : i.resolved) == null ? void 0 : qt.formula) ?? "").trim(),
      dice: o,
      modifiers: Array.isArray(i.modifiers) ? i.modifiers : [],
      manual: (s.manual ?? []).map((j) => ({
        ...j,
        steps: Df(Number(j.value ?? 0), -3, 3)
      })),
      edge: {
        domain: d,
        choices: p,
        selectedLabel: h
      },
      toggles: r === "edge" ? { useEdge: !1, takeRisks: !1, opponentRoll: !1 } : s.toggles,
      totalPool: l,
      intent: r,
      dn: n,
      specialization: b.length ? {
        skillCode: y,
        options: b.map((j) => ({
          key: j.key,
          label: j.label,
          selected: j.key === A
        })),
        selectedKey: A,
        selectedLabel: (v == null ? void 0 : v.label) ?? ""
      } : null,
      attack: g ? {
        weaponName: ((k = g == null ? void 0 : g.weapon) == null ? void 0 : k.name) ?? "Weapon",
        rangeBand: (g == null ? void 0 : g.rangeBand) ?? "",
        damageType: ((N = x == null ? void 0 : x.modifies) == null ? void 0 : N.damageType) || ((q = g == null ? void 0 : g.weapon) == null ? void 0 : q.damageTypeLabel) || ((de = g == null ? void 0 : g.weapon) == null ? void 0 : de.damageType) || "",
        usesPayloads: I,
        source: (g == null ? void 0 : g.sourceState) ?? null,
        payloads: C.map((j) => {
          var ae;
          return {
            id: j.id,
            name: j.label,
            damageType: (ae = j.modifies) == null ? void 0 : ae.damageType,
            selected: j.id === P
          };
        }),
        selectedPayloadId: P,
        selectedPayloadLabel: (x == null ? void 0 : x.label) ?? ((he = g == null ? void 0 : g.payload) == null ? void 0 : he.label) ?? ((Ae = g == null ? void 0 : g.weapon) == null ? void 0 : Ae.payloadLabel) ?? "",
        selectedSourceLabel: ((Ee = g == null ? void 0 : g.sourceState) == null ? void 0 : Ee.label) ?? ""
      } : null
    };
  }
  /* --------------------------- */
  /* Actions                     */
  /* --------------------------- */
  async _onCancel(t) {
    if (t == null || t.preventDefault(), z(this, Qe)) {
      const i = z(this, Qe);
      De(this, Qe, null), i(null);
    }
    return this.close();
  }
  async _onSubmit(t) {
    var s, n, r, o, l, c, u, d, m, p, f, h, g;
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
    }), Of(i.payload, i.toggles ?? {}), io(
      i.payload,
      ((s = i.payload) == null ? void 0 : s.intent) === "attack" ? ((n = i.payload) == null ? void 0 : n.skillKey) ?? ((c = (l = (o = (r = this._mwd.baseContext) == null ? void 0 : r.resolved) == null ? void 0 : o.attack) == null ? void 0 : l.skill) == null ? void 0 : c.code) : ((u = i.payload) == null ? void 0 : u.key) ?? ((p = (m = (d = this._mwd.baseContext) == null ? void 0 : d.resolved) == null ? void 0 : m.data) == null ? void 0 : p.skillKey),
      (f = i.payload) == null ? void 0 : f.specializationKey
    ), z(this, Qe)) {
      const y = z(this, Qe);
      De(this, Qe, null), y({ payload: i.payload });
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
    var n;
    t == null || t.preventDefault();
    const s = (n = i == null ? void 0 : i.dataset) == null ? void 0 : n.id;
    if (s)
      return this._mwd.state.manual = this._mwd.state.manual.filter((r) => r.id !== s), this.render(!1);
  }
  async _onSetManualValue(t, i) {
    var o, l;
    t == null || t.preventDefault();
    const s = (o = i == null ? void 0 : i.dataset) == null ? void 0 : o.id, n = (l = i == null ? void 0 : i.dataset) == null ? void 0 : l.field;
    if (!s || !n) return;
    const r = this._mwd.state.manual.find((c) => c.id === s);
    if (r)
      return n === "label" && (r.label = String(i.value ?? "")), n === "value" && (r.value = Number(i.value ?? 0)), this.render(!1);
  }
  async _onSetManualStepper(t, i) {
    var o, l;
    t == null || t.preventDefault();
    const s = (o = i == null ? void 0 : i.dataset) == null ? void 0 : o.id, n = Number((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.value);
    if (!s || Number.isNaN(n)) return;
    const r = this._mwd.state.manual.find((c) => c.id === s);
    if (r)
      return r.value = n, this.render(!1);
  }
  async _onSetEdgePrePool(t, i) {
    var n;
    t == null || t.preventDefault();
    const s = String(((n = i == null ? void 0 : i.dataset) == null ? void 0 : n.poolKey) ?? "").trim();
    if (s)
      return this._mwd.state.edge = this._mwd.state.edge ?? {}, this._mwd.state.edge.prePoolKey = s, this._mwd.state.toggles.useEdge = !0, this.render(!1);
  }
  async _onToggleCheckbox(t, i) {
    var n;
    t == null || t.preventDefault();
    const s = (n = i == null ? void 0 : i.dataset) == null ? void 0 : n.key;
    if (s)
      return this._mwd.state.toggles[s] = !!i.checked, this.render(!1);
  }
  async _onSetDn(t, i) {
    t == null || t.preventDefault();
    const s = String((i == null ? void 0 : i.value) ?? "").trim(), n = s === "" ? null : Number(s);
    return this._mwd.state.payload.dn = Number.isFinite(n) ? Math.max(0, Math.trunc(n)) : null, this.render(!1);
  }
  async _onSetPayload(t, i) {
    return t == null || t.preventDefault(), this._mwd.state.payload.payloadId = String((i == null ? void 0 : i.value) ?? "").trim(), this.render(!1);
  }
  async _onSetSpecialization(t, i) {
    var r;
    t == null || t.preventDefault();
    const s = String(((r = i == null ? void 0 : i.dataset) == null ? void 0 : r.skillCode) ?? "").trim(), n = String((i == null ? void 0 : i.value) ?? "").trim();
    if (s)
      return io(this._mwd.state.payload, s, n), this.render(!1);
  }
  _onRender(t, i) {
    var n, r;
    (n = super._onRender) == null || n.call(this, t, i);
    const s = this.element instanceof HTMLElement ? this.element : (r = this.element) == null ? void 0 : r[0];
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
  static async prompt({ actor: t, basePayload: i, resolved: s, diceParts: n = null, mods: r = [], modTotal: o = 0 } = {}) {
    var h;
    const l = foundry.utils.deepClone(i ?? {});
    try {
      if (((s == null ? void 0 : s.rollType) ?? "simple") === "simple" && (l == null ? void 0 : l.dn) == null) {
        const y = Number(game.settings.get(game.system.id, "gmNextDn"));
        Number.isFinite(y) && (l.dn = Math.max(0, Math.trunc(y)));
      }
    } catch (g) {
      console.warn("MWD: failed to default DN from GM Gadget", g);
    }
    const c = {
      left: (s == null ? void 0 : s.title) ?? "Roll",
      right: (t == null ? void 0 : t.name) ?? ""
    }, u = n ?? _f(s), d = {
      attribute: Number((u == null ? void 0 : u.attribute) ?? 0),
      skill: Number((u == null ? void 0 : u.skill) ?? 0),
      bonus: Number((u == null ? void 0 : u.bonus) ?? 0),
      specialization: Number((u == null ? void 0 : u.specialization) ?? 0),
      modifiers: Number(o ?? 0)
    }, m = (Array.isArray(r) ? r : []).map((g) => ({
      label: g.label ?? "Modifier",
      source: g.source ?? "",
      value: Number(g.value ?? 0)
    }));
    l.manualModifiers = to(l.manualModifiers);
    const f = await new Re({
      actor: t,
      baseContext: {
        intent: (s == null ? void 0 : s.intent) ?? "skill",
        header: c,
        formula: String((s == null ? void 0 : s.formula) ?? "").trim(),
        dice: d,
        modifiers: m,
        payload: l,
        resolved: s,
        // keep full resolved for edge display
        dn: Number((l == null ? void 0 : l.dn) ?? ((h = s == null ? void 0 : s.difficulty) == null ? void 0 : h.dn) ?? 1)
      }
    }).wait();
    return (f == null ? void 0 : f.payload) ?? null;
  }
};
Qe = new WeakMap(), R(Re, "DEFAULT_OPTIONS", foundry.utils.mergeObject(
  wi(Re, Re, "DEFAULT_OPTIONS"),
  {
    id: "mwd-roll-dialog",
    classes: [
      ...wi(Re, Re, "DEFAULT_OPTIONS").classes ?? [],
      "mwd",
      "mwd-roll-dialog"
    ],
    window: { title: "Roll", resizable: !1 },
    position: { width: 520, height: "auto" },
    actions: {
      submit: Re.prototype._onSubmit,
      cancel: Re.prototype._onCancel,
      addManual: Re.prototype._onAddManual,
      removeManual: Re.prototype._onRemoveManual,
      setManualValue: Re.prototype._onSetManualValue,
      setManualStepper: Re.prototype._onSetManualStepper,
      setEdgePrePool: Re.prototype._onSetEdgePrePool,
      toggleCheckbox: Re.prototype._onToggleCheckbox,
      setDn: Re.prototype._onSetDn,
      setPayload: Re.prototype._onSetPayload,
      setSpecialization: Re.prototype._onSetSpecialization
    }
  },
  { inplace: !1 }
)), R(Re, "PARTS", {
  body: { template: "systems/mwd/templates/v2/roll/mwd-roll-dialog.hbs" }
});
let Cn = Re;
const { ApplicationV2: Lf, HandlebarsApplicationMixin: $f } = foundry.applications.api, ta = class ta extends $f(Lf) {
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
      classes: [game.system.anarchy.styles.selectCssClass(), ...ta.DEFAULT_OPTIONS.classes],
      window: { title: e }
    };
    return new ta({ items: t }, i).wait();
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
R(ta, "PARTS", {
  body: {
    template: `${G}/dialog/select-item.hbs`
  }
});
let En = ta;
function hs(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function xf(a = {}) {
  var t;
  const e = Array.isArray((t = a == null ? void 0 : a.attack) == null ? void 0 : t.targets) ? a.attack.targets : [];
  if (!e.length) throw new Error("Attack requires at least one target.");
  return e;
}
async function Bf(a = {}) {
  if (!(a != null && a.actorUuid)) return null;
  try {
    return await fromUuid(a.actorUuid);
  } catch (e) {
    return console.warn("MWD | Unable to resolve attack target actor for CQ", a, e), null;
  }
}
function Ff(a = {}, e = null, t = "") {
  var i, s, n, r, o;
  return Math.max(0, hs(
    ((i = a == null ? void 0 : a.attributes) == null ? void 0 : i[t]) ?? ((s = e == null ? void 0 : e.getAttributeValue) == null ? void 0 : s.call(e, t)) ?? ((o = (r = (n = e == null ? void 0 : e.system) == null ? void 0 : n.attributes) == null ? void 0 : r[t]) == null ? void 0 : o.value),
    0
  ));
}
function zf(a = {}, e = null, t = "") {
  var i, s, n, r, o, l;
  return Math.max(0, hs(
    ((s = (i = a == null ? void 0 : a.skills) == null ? void 0 : i[t]) == null ? void 0 : s.rating) ?? ((n = e == null ? void 0 : e.getSkillRating) == null ? void 0 : n.call(e, t)) ?? ((l = (o = (r = e == null ? void 0 : e.system) == null ? void 0 : r.skills) == null ? void 0 : o[t]) == null ? void 0 : l.rating),
    0
  ));
}
function ao(a = []) {
  return a.reduce((e, t) => e + hs(t == null ? void 0 : t.value, 0), 0);
}
async function Wf({ attacker: a = null, ctx: e = {}, target: t = {} } = {}) {
  var A, v, C, I, P, x, V, Q, K, H, D, W, X, Z, ie, ue;
  const i = await Bf(t), s = Math.max(0, Number(((I = (v = (A = e == null ? void 0 : e.attack) == null ? void 0 : A.weapon) == null ? void 0 : v.attackRatingBand) == null ? void 0 : I[(C = e == null ? void 0 : e.attack) == null ? void 0 : C.rangeBand]) ?? 0) || 0), n = Ff(t, i, "reflexes"), r = n + n, o = String(((x = (P = e == null ? void 0 : e.attack) == null ? void 0 : P.skill) == null ? void 0 : x.code) ?? ((Q = (V = e == null ? void 0 : e.attack) == null ? void 0 : V.weapon) == null ? void 0 : Q.skill) ?? "").trim(), l = String(((H = (K = e == null ? void 0 : e.attack) == null ? void 0 : K.skill) == null ? void 0 : H.label) ?? o ?? "Attack Skill").trim() || "Attack Skill", c = o ? Math.max(0, hs(((D = a == null ? void 0 : a.getSkillRating) == null ? void 0 : D.call(a, o)) ?? ((Z = (X = (W = a == null ? void 0 : a.system) == null ? void 0 : W.skills) == null ? void 0 : X[o]) == null ? void 0 : Z.rating), 0)) : 0, u = zf(t, i, "tactics"), d = c - u, m = Math.abs(d), p = Math.max(0, Number(((ie = t == null ? void 0 : t.activeArmor) == null ? void 0 : ie.defenseBonus) ?? 0) || 0), h = [{
    id: "weapon.attackRating",
    label: `Weapon AR (${String(((ue = e == null ? void 0 : e.attack) == null ? void 0 : ue.rangeBand) ?? "").trim() || "range"})`,
    value: s
  }], g = [{
    id: "target.reflexesDefense",
    label: "Target REF + REF",
    value: r
  }];
  d > 0 ? h.push({
    id: "skill.attackVsTactics",
    label: `${l} over Tactics`,
    value: m
  }) : d < 0 && g.push({
    id: "target.tacticsAdvantage",
    label: `Tactics over ${l}`,
    value: m
  }), g.push({
    id: "target.armorDefense",
    label: "Armor Defense",
    value: p
  });
  const y = ao(h), b = ao(g);
  return {
    ar: {
      parts: h,
      total: y
    },
    dr: {
      parts: g,
      total: b
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
    value: y - b
  };
}
function Uf(a = {}, e = {}) {
  var c, u, d, m, p;
  const t = (a == null ? void 0 : a.attack) ?? {}, i = String(((u = (c = t == null ? void 0 : t.payload) == null ? void 0 : c.modifies) == null ? void 0 : u.damageType) ?? "").trim(), s = Math.max(0, Number(((d = t == null ? void 0 : t.weapon) == null ? void 0 : d.damage) ?? 0) || 0), n = bt(i || ((m = t == null ? void 0 : t.weapon) == null ? void 0 : m.damageType), "concussive"), r = Math.max(0, Number((t == null ? void 0 : t.totalAp) ?? ((p = t == null ? void 0 : t.weapon) == null ? void 0 : p.ap) ?? 0) || 0), o = e.outcome === "graze" ? s / 2 : e.outcome === "hit" ? s : 0, l = o + Number(e.netHits ?? 0);
  return {
    baseDamage: s,
    effectiveWeaponDamage: o,
    netHits: Number(e.netHits ?? 0),
    incoming: l,
    ap: r,
    damageType: n,
    damageTypeLabel: Ot(n)
  };
}
function jf({ attacker: a, ctx: e, damage: t } = {}) {
  var i, s, n, r;
  return {
    mode: "attackDamage",
    track: S.monitors.physical,
    damage: (t == null ? void 0 : t.effectiveWeaponDamage) ?? 0,
    netHits: (t == null ? void 0 : t.netHits) ?? 0,
    damageType: t == null ? void 0 : t.damageType,
    ap: (t == null ? void 0 : t.ap) ?? 0,
    effects: ((s = (i = e == null ? void 0 : e.attack) == null ? void 0 : i.weapon) == null ? void 0 : s.effects) ?? {},
    source: `${(a == null ? void 0 : a.name) ?? "Attacker"}: ${((r = (n = e == null ? void 0 : e.attack) == null ? void 0 : n.weapon) == null ? void 0 : r.name) ?? "Attack"}`
  };
}
function Xi(a, e = {}, t = {}, { queued: i = !1, applied: s = !1, skipped: n = !1, reason: r = "" } = {}) {
  return n ? {
    ok: !0,
    skipped: !0,
    queued: !1,
    applied: !1,
    reason: r || "Missed target."
  } : a != null && a.ok ? {
    ok: !0,
    queued: !!i,
    applied: !!s,
    preview: !!a.dryRun,
    actorName: a.actorName ?? (e == null ? void 0 : e.name) ?? "Target",
    sourceType: a.sourceType ?? null,
    mode: a.mode ?? "attackDamage",
    track: a.track ?? S.monitors.physical,
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
async function Hf({ attacker: a, ctx: e, target: t, outcome: i, damage: s } = {}) {
  if ((i == null ? void 0 : i.outcome) === "miss")
    return Xi(null, t, s, { skipped: !0, reason: "Missed target." });
  let n = null, r = null;
  try {
    n = t != null && t.tokenUuid ? await fromUuid(t.tokenUuid) : null, r = t != null && t.actorUuid ? await fromUuid(t.actorUuid) : null;
  } catch (c) {
    return console.warn("MWD | Unable to resolve target for queued attack damage", t, c), Xi(null, t, s, { reason: "Unable to resolve attack target." });
  }
  const o = jf({ attacker: a, ctx: e, damage: s }), l = await tt.apply({
    actor: r,
    token: n,
    payload: o,
    options: {
      actorId: (r == null ? void 0 : r.id) ?? "",
      dryRun: !0,
      logToChat: !1
    }
  });
  if (l != null && l.ok) {
    const c = Xi(l, t, s, { queued: !0, applied: !1 });
    return {
      ...c,
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
        preview: c
      }
    };
  }
  return Xi(l, t, s, { reason: "Unable to preview attack damage." });
}
async function qf({ attacker: a, ctx: e, outcomeModel: t, target: i } = {}) {
  const s = await Wf({ attacker: a, ctx: e, target: i }), n = Number((t == null ? void 0 : t.margin) ?? 0), r = Number(s.value ?? 0), o = n, l = r > 0 ? n >= 1 ? "hit" : n === 0 ? "graze" : "miss" : r < 0 ? n >= 2 ? "hit" : n === 1 ? "graze" : "miss" : n >= 1 ? "hit" : "miss", c = l === "hit" ? Math.max(0, o) : 0, u = Uf(e, { outcome: l, netHits: c }), d = await Hf({
    attacker: a,
    ctx: e,
    target: i,
    outcome: { outcome: l },
    damage: u
  });
  return {
    target: {
      name: (i == null ? void 0 : i.name) ?? "Target",
      actorUuid: (i == null ? void 0 : i.actorUuid) ?? null,
      tokenUuid: (i == null ? void 0 : i.tokenUuid) ?? null
    },
    cq: s,
    margin: n,
    rawNetHits: o,
    netHits: c,
    outcome: l,
    damage: u,
    damageResult: d,
    queuedMutation: (d == null ? void 0 : d.queuedMutation) ?? null
  };
}
function Gf(a = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of a)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
async function ql({ attacker: a, ctx: e, outcomeModel: t } = {}) {
  const i = xf(e), s = [];
  for (const n of i)
    s.push(await qf({ attacker: a, ctx: e, outcomeModel: t, target: n }));
  return {
    targetCount: i.length,
    results: s,
    summary: Gf(s)
  };
}
const so = { execute: Xf }, Vf = {
  physical: ["grit", "chaos"],
  mental: ["insight", "rumor"],
  social: ["legend", "credibility"]
};
function Kf(a, e) {
  var n;
  const t = Vf[e] ?? [];
  let i = null, s = -1;
  for (const r of t) {
    const o = (n = a.getEdgePool) == null ? void 0 : n.call(a, r), l = Number((o == null ? void 0 : o.rating) ?? 0), c = Number((o == null ? void 0 : o.value) ?? 0), u = Math.max(0, l - c);
    u > s && (s = u, i = r);
  }
  return i ?? t[0] ?? null;
}
function Yf(a) {
  const t = (Array.isArray(a == null ? void 0 : a.manualModifiers) ? a.manualModifiers : []).map((s) => ({
    id: s.id ?? foundry.utils.randomID(),
    label: (s.label ?? "Manual").trim() || "Manual",
    value: Number(s.value ?? 0),
    source: "Manual"
  })).filter((s) => Number.isFinite(s.value) && s.value !== 0), i = t.reduce((s, n) => s + n.value, 0);
  return { mods: t, total: i };
}
function no(a = {}) {
  const e = a.toggles ?? {}, t = String((a == null ? void 0 : a.payloadId) ?? (a == null ? void 0 : a.ammoTypeId) ?? "").trim();
  return {
    ...a,
    ...t ? { payloadId: t } : {},
    toggles: {
      useEdge: !!e.useEdge,
      takeRisks: !!e.takeRisks,
      opponentRoll: !!e.opponentRoll
    },
    manualModifiers: Jf(a.manualModifiers)
  };
}
async function Qf({ actor: a, payload: e } = {}) {
  var n, r, o, l, c, u, d, m, p, f, h, g;
  if ((e == null ? void 0 : e.intent) !== "attack") return e;
  const t = foundry.utils.deepClone(e ?? {}), i = ((n = a.getPersonalCombatLoadout) == null ? void 0 : n.call(a, { refresh: !0 })) ?? null, s = (y) => {
    var A, v, C, I, P;
    const b = ((v = (A = a.items) == null ? void 0 : A.get) == null ? void 0 : v.call(A, y)) ?? null;
    return !b || !(((C = b.isPersonalWeapon) == null ? void 0 : C.call(b)) ?? b.type === S.itemType.personalWeapon) || !((I = b.system) != null && I.equipped) ? null : ((P = b.getCombatProfile) == null ? void 0 : P.call(b, { payloadId: t == null ? void 0 : t.payloadId })) ?? null;
  };
  if (t.weaponId) {
    const y = s(t.weaponId);
    if (!y)
      throw new Error("Attack requires an owned equipped personal weapon.");
    return t.rangeBand = t.rangeBand ?? y.defaultRangeBand ?? "close", t.payloadId = t.payloadId ?? ((r = y == null ? void 0 : y.payloadState) == null ? void 0 : r.activePayloadId) ?? "", t;
  }
  if (t.mode === "auto") {
    if (i != null && i.weaponChoiceRequired) {
      const y = await En.selectItem(
        "Choose Weapon",
        i.equippedWeapons ?? []
      );
      return y ? (t.weaponId = y.id, t.rangeBand = t.rangeBand ?? y.defaultRangeBand ?? "close", t.payloadId = t.payloadId ?? ((o = y == null ? void 0 : y.payloadState) == null ? void 0 : o.activePayloadId) ?? "", delete t.mode, t) : null;
    }
    if ((l = i == null ? void 0 : i.defaultWeapon) != null && l.isSynthetic || ((c = i == null ? void 0 : i.defaultWeapon) == null ? void 0 : c.id) === "unarmed")
      return t.syntheticWeapon = foundry.utils.deepClone(i.defaultWeapon ?? lt.buildDefaultUnarmedProfile(a)), t.weaponId = t.syntheticWeapon.id, t.rangeBand = t.rangeBand ?? "close", t.payloadId = t.payloadId ?? ((d = (u = t.syntheticWeapon) == null ? void 0 : u.payloadState) == null ? void 0 : d.activePayloadId) ?? "", delete t.mode, t;
    if ((m = i == null ? void 0 : i.defaultWeapon) != null && m.id)
      return t.weaponId = i.defaultWeapon.id, t.rangeBand = t.rangeBand ?? i.defaultWeapon.defaultRangeBand ?? "close", t.payloadId = t.payloadId ?? ((f = (p = i.defaultWeapon) == null ? void 0 : p.payloadState) == null ? void 0 : f.activePayloadId) ?? "", delete t.mode, t;
  }
  if (t.fallback === "unarmed")
    return t.syntheticWeapon = foundry.utils.deepClone(lt.buildDefaultUnarmedProfile(a)), t.weaponId = t.syntheticWeapon.id, t.rangeBand = t.rangeBand ?? "close", t.payloadId = t.payloadId ?? ((g = (h = t.syntheticWeapon) == null ? void 0 : h.payloadState) == null ? void 0 : g.activePayloadId) ?? "", delete t.mode, t;
  throw new Error("Attack could not resolve a usable weapon.");
}
function Jf(a) {
  return Array.isArray(a) ? a.map((e) => ({
    id: (e == null ? void 0 : e.id) ?? foundry.utils.randomID(),
    label: typeof (e == null ? void 0 : e.label) == "string" ? e.label : "Manual",
    value: Number((e == null ? void 0 : e.value) ?? 0)
  })) : [];
}
async function Xf({ actor: a, payload: e, event: t } = {}) {
  var K, H, D, W, X, Z, ie, ue, Se, O, F, Le, J, Ye, it, _t, Lt, $t, xt, Bt, Ft, zt, Wt, Ut, dt, jt, Ht, qt, k, N, q, de, he, Ae, Ee, j, ae, $e, xe, Be, Ge;
  if (a != null && a.actor && (a = a.actor), (K = a == null ? void 0 : a.document) != null && K.actor && (a = a.document.actor), !a) throw new Error("MWD.roll.execute requires actor");
  if (!(e != null && e.intent)) throw new Error("MWD.roll.execute requires payload.intent");
  if (e = no(e), e = await Qf({ actor: a, payload: e }), !e) return null;
  let i = await Ls({ actor: a, payload: e, event: t }), s = await Jr({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const n = await Cn.prompt({
    actor: a,
    basePayload: e,
    resolved: i,
    diceParts: {
      attribute: ((H = i == null ? void 0 : i.pool) == null ? void 0 : H.attribute) ?? 0,
      skill: ((D = i == null ? void 0 : i.pool) == null ? void 0 : D.skill) ?? 0,
      bonus: ((W = i == null ? void 0 : i.pool) == null ? void 0 : W.bonus) ?? 0,
      specialization: ((X = i == null ? void 0 : i.pool) == null ? void 0 : X.specialization) ?? 0
    },
    mods: s.mods,
    modTotal: s.total,
    options: {
      allowEdge: e.intent !== "initiative"
    }
  });
  if (!n) return null;
  if (e = no(n), i = await Ls({ actor: a, payload: e, event: t }), e.intent === "attack" && !((ie = (Z = i == null ? void 0 : i.attack) == null ? void 0 : Z.capabilityReport) != null && ie.isTemplated) && (delete e.targetSnapshots, delete e.templatePlacement), e.intent === "attack" && e.weaponId) {
    const B = ((Se = (ue = a.items) == null ? void 0 : ue.get) == null ? void 0 : Se.call(ue, e.weaponId)) ?? null;
    if ((O = B == null ? void 0 : B.isPersonalWeapon) != null && O.call(B)) {
      const me = String(e.payloadId ?? "").trim(), Tt = String(((F = B.system) == null ? void 0 : F.selectedPayloadId) ?? "").trim();
      if (me && me !== Tt && await ((Le = B.setActivePayload) == null ? void 0 : Le.call(B, me)), !((J = B.canConsumePayload) != null && J.call(B, { payloadId: me }))) {
        const Ue = (Ye = B.getPayloadState) == null ? void 0 : Ye.call(B, { payloadId: me }), at = Ue != null && Ue.payloadLabel ? ` (${Ue.payloadLabel})` : "";
        return (it = ui.notifications) == null || it.warn(`Not enough payload${at} for ${B.name}.`), null;
      }
    }
  }
  if (e.intent === "attack" && ((Lt = (_t = i == null ? void 0 : i.attack) == null ? void 0 : _t.capabilityReport) != null && Lt.isTemplated)) {
    const B = await Jp({
      actor: a,
      attack: i.attack
    });
    if (!B) return null;
    if (!Array.isArray(B.targetSnapshots) || B.targetSnapshots.length === 0)
      return ($t = ui.notifications) == null || $t.warn("Template placement did not affect any targets."), null;
    e.targetSnapshots = B.targetSnapshots, e.templatePlacement = B.placement, i = await Ls({ actor: a, payload: e, event: t });
  }
  s = await Jr({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const { mods: r, total: o } = s, { mods: l, total: c } = Yf(e);
  let u = [...r, ...l], d = Number(o ?? 0) + Number(c ?? 0);
  const m = Number(((xt = i == null ? void 0 : i.pool) == null ? void 0 : xt.attribute) ?? 0) + Number(((Bt = i == null ? void 0 : i.pool) == null ? void 0 : Bt.skill) ?? 0) + Number(((Ft = i == null ? void 0 : i.pool) == null ? void 0 : Ft.bonus) ?? 0) + Number(((zt = i == null ? void 0 : i.pool) == null ? void 0 : zt.specialization) ?? 0), p = Math.max(0, m + Number(d ?? 0)), f = e.intent !== "initiative", h = f ? Zf({ actor: a, ctx: i, payload: e }) : null, g = (Wt = h == null ? void 0 : h.pre) != null && Wt.spent ? 4 : Number(i.diceTarget ?? i.target ?? 5), y = {
    snapshot: ((jt = (dt = (Ut = game.mwd) == null ? void 0 : Ut.personalCombat) == null ? void 0 : dt.getSnapshot) == null ? void 0 : jt.call(dt, a)) ?? null
  }, b = et({
    actor: a,
    phase: "onBuildRoll",
    facts: Un({ actor: a, resolved: i, payload: e, runtime: y }),
    packet: {},
    options: { runtime: y, consumeUsage: !0 }
  });
  await Dt({ actor: a, mutations: b.mutations, runtime: y }), f && ((Ht = h == null ? void 0 : h.pre) != null && Ht.spent) && ((qt = h == null ? void 0 : h.pre) != null && qt.poolKey) && await ((k = a.spendEdge) == null ? void 0 : k.call(a, h.pre.poolKey, 1));
  let A, v = 0, C = 0;
  if (i.rollType === "sum" && ((N = i.sum) != null && N.formula))
    A = await new Roll(i.sum.formula, i.sum.data ?? {}).evaluate(), v = Number(A.total ?? 0) + Number(d ?? 0);
  else {
    A = await new Roll(`${p}d6cs>=${g}`).evaluate();
    const B = (q = A.dice) == null ? void 0 : q[0];
    v = Array.isArray(B == null ? void 0 : B.results) ? B.results.filter((me) => me.success).length : 0, C = Array.isArray(B == null ? void 0 : B.results) ? B.results.filter((me) => me.result === 1).length : 0;
  }
  if (i.intent === "initiative" && (A == null ? void 0 : A.total) != null) {
    const B = { total: Number(A.total ?? 0) + Number(d ?? 0) }, me = et({
      actor: a,
      phase: "onInitiativeResolved",
      facts: Xo({ actor: a, packet: B, runtime: y }),
      packet: B,
      options: { runtime: y, consumeUsage: !0 }
    });
    if (await Dt({ actor: a, mutations: me.mutations, runtime: y }), me.modifiers.length) {
      const Tt = me.modifiers.reduce((Ue, at) => Ue + Number(at.value ?? 0), 0);
      u = u.concat(me.modifiers), d += Tt, v = Number(me.packet.total ?? 0), await ro({ actor: a, total: me.packet.total ?? A.total }), i.breakdown = (i.breakdown ?? []).concat(me.modifiers.map((Ue, at) => ({
        id: `traitInitiative${at + 1}`,
        label: Ue.label,
        value: Number(Ue.value ?? 0)
      })));
    } else
      v = Number(B.total ?? 0), await ro({ actor: a, total: B.total });
  }
  const I = Hl(
    i,
    { successes: v, raw: (de = A == null ? void 0 : A.toJSON) == null ? void 0 : de.call(A) },
    null
    // opposed rolls can pass defender result later
  ), P = I == null ? void 0 : I.edgeEarned;
  if ((P == null ? void 0 : P.amount) > 0) {
    const B = (he = i == null ? void 0 : i.domains) != null && he.includes("physical") ? "physical" : (Ae = i == null ? void 0 : i.domains) != null && Ae.includes("mental") ? "mental" : (Ee = i == null ? void 0 : i.domains) != null && Ee.includes("social") ? "social" : null, me = Kf(a, B);
    await ((j = a.gainEdge) == null ? void 0 : j.call(a, me, P.amount)), I.edgeEarned.pool = me;
  }
  i.intent === "overload" && await ih({ actor: a, passed: I.passed });
  let x = null;
  i.intent === "attack" && (x = await ql({
    attacker: a,
    ctx: i,
    outcomeModel: I
  }));
  const V = df({
    actor: a,
    payload: e,
    ctx: i,
    roll: A,
    target: g,
    pool: p,
    mods: u,
    modTotal: d,
    hits: v,
    ones: C,
    edge: h,
    outcomeModel: I
  });
  x && (V.attackResult = x);
  const Q = await fs({ resolved: V });
  if (e.intent === "attack" && e.weaponId) {
    const B = (($e = (ae = a.items) == null ? void 0 : ae.get) == null ? void 0 : $e.call(ae, e.weaponId)) ?? null;
    (xe = B == null ? void 0 : B.isPersonalWeapon) != null && xe.call(B) && (await ((Be = B.consumePayload) == null ? void 0 : Be.call(B, { payloadId: e.payloadId })) || (Ge = ui.notifications) == null || Ge.warn(`Payload could not be consumed for ${B.name}.`));
  }
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: a }),
    content: Q,
    flags: {
      mwd: {
        payload: e,
        resolved: V
      }
    }
  });
}
function Zf({ actor: a, ctx: e, payload: t }) {
  var f, h, g, y, b, A, v;
  const i = eh(e == null ? void 0 : e.domains), s = th[i] ?? null, n = (s == null ? void 0 : s.a) ?? null, r = (s == null ? void 0 : s.b) ?? null, o = [n, r].filter(Boolean), l = !!((f = t == null ? void 0 : t.toggles) != null && f.useEdge) || !!(t != null && t.useEdge);
  let c = String(((g = (h = t == null ? void 0 : t.edge) == null ? void 0 : h.pre) == null ? void 0 : g.poolKey) ?? "").trim() || null;
  c && !o.includes(c) && (c = null);
  const u = l && c ? 1 : 0;
  let d = [...o];
  u && c && (d = d.filter((C) => C !== c));
  let m = String(((b = (y = t == null ? void 0 : t.edge) == null ? void 0 : y.post) == null ? void 0 : b.poolKey) ?? "").trim() || null;
  m && !d.includes(m) && (m = null);
  const p = Number(((v = (A = t == null ? void 0 : t.edge) == null ? void 0 : A.post) == null ? void 0 : v.spent) ?? 0) ? 1 : 0;
  return {
    domain: i,
    pools: s ? { a: n, b: r } : null,
    pre: { poolKey: c, spent: u },
    post: { poolKey: m, spent: p },
    allowed: { prePools: o, postPools: d }
  };
}
function eh(a) {
  return Array.isArray(a) ? a.includes("physical") ? "physical" : a.includes("mental") ? "mental" : a.includes("social") ? "social" : null : null;
}
const th = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};
async function ro({ actor: a, total: e }) {
  var o, l, c, u, d;
  const t = (l = (o = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : o.controlled) == null ? void 0 : l.find((m) => {
    var p;
    return ((p = m.actor) == null ? void 0 : p.id) === a.id;
  }), i = ((u = (c = a.getActiveTokens) == null ? void 0 : c.call(a, !0, !0)) == null ? void 0 : u[0]) ?? null, s = t ?? i;
  if (!s) {
    (d = ui.notifications) == null || d.warn("Initiative requires a token on the current scene.");
    return;
  }
  let n = game.combat;
  n || (n = await Combat.create({
    scene: canvas.scene.id,
    active: !0
  }));
  let r = n.combatants.find((m) => m.tokenId === s.id);
  if (!r) {
    const m = await n.createEmbeddedDocuments("Combatant", [{
      tokenId: s.id,
      actorId: a.id,
      sceneId: canvas.scene.id
    }]);
    r = m == null ? void 0 : m[0];
  }
  r && await r.update({ initiative: Number(e) });
}
async function ih({ actor: a, passed: e }) {
  e || await a.update({ "system.burn.overloaded": !0 });
}
const ah = /* @__PURE__ */ new Set(["physical", "mental", "social"]);
function sh(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function nh(a) {
  if (!a) return;
  const e = String(a).trim().toLowerCase();
  return ah.has(e) ? e : void 0;
}
class rh {
  constructor() {
    R(this, "id", "mwd.itemModifiers");
    R(this, "label", "Item Modifiers");
  }
  collect(e) {
    var s, n;
    const t = e == null ? void 0 : e.actor;
    if (!t) return [];
    const i = [];
    for (const r of t.items) {
      const o = (n = (s = r.flags) == null ? void 0 : s.mwd) == null ? void 0 : n.modifiers;
      if (!(!Array.isArray(o) || o.length === 0))
        for (const l of o) {
          if (!l) continue;
          const c = sh(l.value);
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
            domain: nh(l.domain)
          });
        }
    }
    return i;
  }
}
const Bs = {
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
class oh {
  constructor() {
    R(this, "id", "mwd.statusEffects");
    R(this, "label", "Status Effects");
  }
  collect({ actor: e } = {}) {
    var s;
    const t = e == null ? void 0 : e.statuses;
    if (!e || !t) return [];
    const i = [];
    for (const n of t) {
      const r = Bs == null ? void 0 : Bs[n];
      if ((s = r == null ? void 0 : r.mods) != null && s.length)
        for (const o of r.mods) {
          const l = Array.isArray(o.domains) ? o.domains : [], c = o.value;
          if (l.length)
            for (const u of l)
              i.push({
                label: r.label ?? n,
                value: c,
                source: "Status",
                domain: u
              });
          else
            i.push({
              label: r.label ?? n,
              value: c,
              source: "Status"
            });
        }
    }
    return i;
  }
}
class lh {
  constructor() {
    R(this, "id", "mwd.baseRollModifiers");
    R(this, "label", "Roll (Base)");
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
    const s = ((o = e == null ? void 0 : e.dialog) == null ? void 0 : o.otherMods) ?? ((l = e == null ? void 0 : e.modifiers) == null ? void 0 : l.otherMods) ?? (e == null ? void 0 : e.otherMods) ?? 0, n = Number(s);
    return Number.isFinite(n) && n !== 0 && t.push({
      id: "otherMods",
      label: "Other modifiers",
      value: n,
      source: "Roll"
    }), t;
  }
}
class ch {
  constructor() {
    R(this, "id", "mwd.condition");
    R(this, "label", "Condition");
  }
  collect({ actor: e, rollType: t } = {}) {
    var o, l, c, u, d, m, p, f;
    if (!e) return [];
    if (t === "edge") return [];
    const i = ((o = e.system) == null ? void 0 : o.derived) ?? {}, s = Number(
      ((l = i == null ? void 0 : i.condition) == null ? void 0 : l.physicalPenalty) ?? ((u = (c = i == null ? void 0 : i.monitors) == null ? void 0 : c.physical) == null ? void 0 : u.penalty) ?? 0
    ), n = Number(
      ((d = i == null ? void 0 : i.condition) == null ? void 0 : d.fatiguePenalty) ?? ((p = (m = i == null ? void 0 : i.monitors) == null ? void 0 : m.fatigue) == null ? void 0 : p.penalty) ?? 0
    ), r = [];
    return Number.isFinite(s) && s !== 0 && r.push({
      id: "conditionPhysical",
      label: "Physical Penalty",
      value: s,
      source: "Physical Track"
      // domain: "physical" // optional; leave unset to apply to all domains
    }), Number.isFinite(n) && n !== 0 && r.push({
      id: "conditionFatigue",
      label: "Fatigue Penalty",
      value: n,
      source: "Fatigue Track"
      // domain: "physical" // optional
    }), console.log("MWD|condition derived snapshot", e.name, foundry.utils.deepClone((f = e.system) == null ? void 0 : f.derived)), r;
  }
}
const uh = {
  id: "burn",
  async collect(a) {
    var s, n;
    const e = a.actor;
    if (!e) return [];
    const t = Number(((n = (s = e.system) == null ? void 0 : s.burn) == null ? void 0 : n.value) ?? 0), i = Math.floor(t / 2);
    return i <= 0 ? [] : [{
      id: "burn",
      label: "Burn",
      value: -i,
      source: "Burn Track",
      domain: null
    }];
  }
};
class dh {
  constructor() {
    R(this, "id", "mwd.lifeModules");
    R(this, "label", "Life Modules");
  }
  collect({ actor: e, resolved: t } = {}) {
    return Cd({ actor: e, resolved: t });
  }
}
class mh {
  constructor() {
    R(this, "id", "mwd.traits");
    R(this, "label", "Traits");
  }
  collect({ actor: e, resolved: t, payload: i } = {}) {
    var n, r, o;
    if (!e) return [];
    const s = {
      snapshot: ((o = (r = (n = game.mwd) == null ? void 0 : n.personalCombat) == null ? void 0 : r.getSnapshot) == null ? void 0 : o.call(r, e)) ?? null
    };
    return et({
      actor: e,
      phase: "onBuildRoll",
      facts: Un({ actor: e, resolved: t, payload: i, runtime: s }),
      packet: {},
      options: { runtime: s, consumeUsage: !1 }
    }).modifiers;
  }
}
function ph() {
  Hooks.on("renderChatMessageHTML", (a, e) => {
    e.addEventListener("click", (t) => {
      const i = t.target.closest("[data-mwd-action]");
      if (!i) return;
      const s = String(i.dataset.mwdAction || "").trim();
      s && (s === "edgePostReroll" && Sh(t, a), s === "applyAttackDamage" && yh(t, a), s === "applyAllAttackDamage" && bh(t, a));
    });
  });
}
function fh(a = {}) {
  var t;
  return (Array.isArray((t = a == null ? void 0 : a.attackResult) == null ? void 0 : t.results) ? a.attackResult.results : []).some((i) => {
    var s;
    return !!((s = i == null ? void 0 : i.queuedMutation) != null && s.applied);
  });
}
function hh(a = {}) {
  var i, s, n;
  const e = (a == null ? void 0 : a.ctxSnapshot) ?? {}, t = Number(((i = a == null ? void 0 : a.dn) == null ? void 0 : i.total) ?? ((s = e == null ? void 0 : e.dn) == null ? void 0 : s.total) ?? ((n = e == null ? void 0 : e.difficulty) == null ? void 0 : n.dn) ?? 1);
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
async function gh(a = {}, e = null) {
  var n, r, o;
  const t = hh(a), i = Number(((n = a == null ? void 0 : a.outcome) == null ? void 0 : n.hits) ?? 0) || 0, s = ((r = a == null ? void 0 : a.outcomeModel) == null ? void 0 : r.edgeEarned) ?? null;
  return a.outcomeModel = Hl(t, { successes: i, raw: (o = a == null ? void 0 : a.roll) == null ? void 0 : o.json }, null), a.outcomeModel.edgeEarned = s, t.intent === "attack" && e && t.attack && (a.attackResult = await ql({
    attacker: e,
    ctx: t,
    outcomeModel: a.outcomeModel
  })), a;
}
async function yh(a, e) {
  var o, l, c, u, d, m, p;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='applyAttackDamage']"), i = Number((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.resultIndex);
  if (!Number.isInteger(i) || i < 0) return;
  const s = foundry.utils.deepClone((c = (l = e == null ? void 0 : e.flags) == null ? void 0 : l.mwd) == null ? void 0 : c.resolved);
  if (!s) return;
  const n = await Gl(s, i);
  if (!n.ok) {
    (d = (u = ui.notifications) == null ? void 0 : u.warn) == null || d.call(u, n.reason ?? "Unable to apply attack damage.");
    return;
  }
  if (n.skipped) {
    (p = (m = ui.notifications) == null ? void 0 : m.info) == null || p.call(m, n.reason ?? "That attack damage has already been applied.");
    return;
  }
  const r = await fs({ resolved: s });
  await e.update({
    content: r,
    "flags.mwd.resolved": s
  });
}
async function bh(a, e) {
  var l, c, u, d, m, p, f, h, g;
  a.preventDefault();
  const t = foundry.utils.deepClone((c = (l = e == null ? void 0 : e.flags) == null ? void 0 : l.mwd) == null ? void 0 : c.resolved);
  if (!t) return;
  const s = (Array.isArray((u = t == null ? void 0 : t.attackResult) == null ? void 0 : u.results) ? t.attackResult.results : []).map((y, b) => ({ result: y, index: b })).filter(({ result: y }) => (y == null ? void 0 : y.queuedMutation) && !y.queuedMutation.applied).map(({ index: y }) => y);
  if (!s.length) {
    (m = (d = ui.notifications) == null ? void 0 : d.info) == null || m.call(d, "No queued attack damage remains to apply.");
    return;
  }
  let n = 0;
  const r = [];
  for (const y of s) {
    const b = await Gl(t, y);
    b.ok && b.applied ? n += 1 : b.ok || r.push(b.reason ?? `Target ${y + 1} failed.`);
  }
  if (n <= 0) {
    (f = (p = ui.notifications) == null ? void 0 : p.warn) == null || f.call(p, r[0] ?? "Unable to apply queued attack damage.");
    return;
  }
  const o = await fs({ resolved: t });
  await e.update({
    content: o,
    "flags.mwd.resolved": t
  }), r.length && ((g = (h = ui.notifications) == null ? void 0 : h.warn) == null || g.call(h, `Applied ${n} queued damage result${n === 1 ? "" : "s"}; ${r.length} failed.`));
}
async function Gl(a, e) {
  var r, o, l, c;
  const t = ((o = (r = a == null ? void 0 : a.attackResult) == null ? void 0 : r.results) == null ? void 0 : o[e]) ?? null, i = (t == null ? void 0 : t.queuedMutation) ?? null;
  if (!i)
    return { ok: !1, reason: "No queued attack damage to apply." };
  if (i.applied)
    return { ok: !0, skipped: !0, reason: "That attack damage has already been applied." };
  let s = null;
  try {
    const u = (l = i.target) != null && l.actorUuid ? await fromUuid(i.target.actorUuid) : null, d = (c = i.target) != null && c.tokenUuid ? await fromUuid(i.target.tokenUuid) : null;
    s = await tt.apply({
      actor: u,
      token: d,
      payload: i.payload ?? {},
      options: {
        actorId: (u == null ? void 0 : u.id) ?? "",
        logToChat: !1
      }
    });
  } catch (u) {
    return console.warn("MWD | Unable to apply queued attack damage", u), { ok: !1, reason: "Unable to apply attack damage to that target." };
  }
  const n = Xi(
    s,
    (t == null ? void 0 : t.target) ?? i.target ?? {},
    (t == null ? void 0 : t.damage) ?? {},
    { queued: !1, applied: !!(s != null && s.ok) }
  );
  return s != null && s.ok ? (i.applied = !0, i.appliedResult = n, t.queuedMutation = i, t.damageResult = n, a.edge ?? (a.edge = {}), a.edge.availableActions = {
    ...a.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, { ok: !0, applied: !0 }) : { ok: !1, reason: n.reason ?? "Unable to apply attack damage." };
}
async function Sh(a, e) {
  var f, h, g, y, b, A, v, C, I, P, x, V, Q, K, H, D, W, X, Z;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='edgePostReroll']"), i = String(((f = t == null ? void 0 : t.dataset) == null ? void 0 : f.poolKey) ?? "").trim();
  if (!i) return;
  const s = foundry.utils.deepClone((g = (h = e == null ? void 0 : e.flags) == null ? void 0 : h.mwd) == null ? void 0 : g.resolved);
  if (!s) return;
  if (fh(s)) {
    (b = (y = ui.notifications) == null ? void 0 : y.warn) == null || b.call(y, "Post-roll Edge is disabled after attack damage has been applied.");
    return;
  }
  if (Number(((v = (A = s == null ? void 0 : s.edge) == null ? void 0 : A.post) == null ? void 0 : v.spent) ?? 0) === 1) return;
  if (!(Array.isArray((I = (C = s == null ? void 0 : s.edge) == null ? void 0 : C.allowed) == null ? void 0 : I.postPools) ? s.edge.allowed.postPools : []).includes(i)) {
    (x = (P = ui.notifications) == null ? void 0 : P.warn) == null || x.call(P, `Post-spend pool not allowed: ${i}`);
    return;
  }
  const r = Array.isArray((V = s == null ? void 0 : s.roll) == null ? void 0 : V.failureDiceRefs) ? s.roll.failureDiceRefs : [];
  if (r.length <= 0) {
    (K = (Q = ui.notifications) == null ? void 0 : Q.info) == null || K.call(Q, "No failures to reroll.");
    return;
  }
  const o = await fromUuid(s.actorUuid);
  if (!o) {
    (D = (H = ui.notifications) == null ? void 0 : H.warn) == null || D.call(H, "Actor not found for this roll.");
    return;
  }
  await ((W = o.spendEdge) == null ? void 0 : W.call(o, i, 1));
  const l = Number(((X = s == null ? void 0 : s.roll) == null ? void 0 : X.target) ?? 5), u = (Z = (await new Roll(`${r.length}d6cs>=${l}`).evaluate()).dice) == null ? void 0 : Z[0], d = Array.isArray(u == null ? void 0 : u.results) ? u.results : [], m = d.filter((ie) => ie.success).length;
  s.outcome = s.outcome ?? {}, s.outcome.hits = Number(s.outcome.hits ?? 0) + m, s.edge = s.edge ?? {}, s.edge.post = { poolKey: i, spent: 1 }, s.edge.availableActions = {
    ...s.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, s.roll = s.roll ?? {}, s.roll.diceGroups = Array.isArray(s.roll.diceGroups) ? s.roll.diceGroups : [], s.roll.diceGroups.push({
    id: "post",
    label: "Post Reroll",
    faces: 6,
    termIndex: null,
    dice: d.map((ie, ue) => {
      const Se = Number(ie.result), O = !!ie.success;
      return {
        ref: `post:${ue}`,
        face: Se,
        isSuccess: O,
        isFailure: !O,
        tooltip: O ? `Post die ${ue + 1}: ${Se} (Success vs TN ${l})` : `Post die ${ue + 1}: ${Se} (Failure vs TN ${l})`
      };
    })
  }), await gh(s, o);
  const p = await fs({ resolved: s });
  await e.update({
    content: p,
    "flags.mwd.resolved": s,
    "flags.mwd.payload.edge.post": { poolKey: i, spent: 1 }
  });
}
function Ah() {
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
function wh() {
  return {
    get(a) {
      return ct(a);
    },
    getSkills({ withKnowledge: a = !1 } = {}) {
      return qa();
    },
    list() {
      return qa();
    }
  };
}
function Th() {
  return {
    get(a) {
      return ai(a);
    },
    list() {
      return cs();
    },
    listByType(a) {
      return Gn(a);
    },
    getTypeLabel(a) {
      return Bi(a);
    },
    evaluate(a) {
      return si(a);
    }
  };
}
function kh() {
  return {
    normalizeQualitySystem(a) {
      return ot(a);
    },
    getEditorConfig() {
      return Vo();
    },
    evaluatePhase(a) {
      return et(a);
    },
    applyMutations(a) {
      return Dt(a);
    },
    buildRollFacts(a) {
      return Un(a);
    },
    buildActionCostFacts(a) {
      return Jo(a);
    },
    buildBurnFacts(a) {
      return Da(a);
    },
    buildInitiativeFacts(a) {
      return Xo(a);
    },
    buildDamageFacts(a) {
      return Zo(a);
    },
    buildEdgeFacts(a) {
      return Js(a);
    },
    buildEndOfActivationFacts(a) {
      return el(a);
    }
  };
}
class Xn {
  static start() {
    const e = new Xn();
    Hooks.once("init", () => e.onInit()), Hooks.once("ready", () => e.onReady());
  }
  async onInit() {
    console.log(fe + "AnarchySystem.onInit"), game.system.mwd = this, game.system.anarchy = this, game.mwd ?? (game.mwd = {}), Ah(), ph(), Pm("mwd"), game.mwd.roll = so, game.mwd.personalCombat = oe, game.mwd.harm = tt, this.roll = so, this.personalCombat = oe, this.harm = tt, this.skills = wh(), this.lifeModules = Th(), this.traits = kh(), this.remoteCall = new Gs(), game.system.mwd.skills = this.skills, game.system.mwd.lifeModules = this.lifeModules, game.system.mwd.traits = this.traits, game.mwd.skills = this.skills, game.mwd.lifeModules = this.lifeModules, game.mwd.traits = this.traits, ce.init(), this.modifiers = new ne(), Ct.register(new rh()), Ct.register(new oh()), Ct.register(new lh()), Ct.register(new ch()), Ct.register(uh), Ct.register(new dh()), Ct.register(new mh()), Ct.register(new sm()), Handlebars.registerHelper("mwdClassList", (e) => Array.isArray(e) ? e.join(" ") : typeof e == "string" ? e : ""), this.actorClasses = {
      character: Ir,
      npc: Ir,
      vehicle: Sl,
      battlemech: tm
    }, this.hooks = new hi(), this.styles = new Wd(), this.handlebarsManager = new Vn(), oe.init(), sp.register(), console.log(fe + "AnarchySystem.onInit | loading system"), CONFIG.ANARCHY = we, CONFIG.Combat.initiative = { formula: "2d6" }, CONFIG.statusEffects.push({
      id: "overloaded",
      name: "Overloaded",
      icon: "systems/mwd/img/icons/status/surge.svg"
    }), CONFIG.Actor.documentClass = Dp, CONFIG.Item.documentClass = Fi, Fi.init(), gp(), vp(), await Ep(), console.log(fe + "AnarchySystem.onInit | done");
  }
  async onReady() {
    if (console.log(fe + "AnarchySystem.onReady"), await oe.onReady(), !game.user.isGM) return;
    await Ad();
    const e = game.settings.get(w, "enableGMGadget");
    if (!e) {
      console.log(`${fe}GMManager render skipped (enableGMGadget=false)`);
      return;
    }
    game.mwd = game.mwd ?? {}, game.mwd.gmGadget = () => Nm({ systemId: w }).render({ force: !0 }), e && game.mwd.gmGadget();
  }
}
Xn.start();
//# sourceMappingURL=index.mjs.map
