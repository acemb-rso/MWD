var kl = Object.defineProperty;
var vl = Object.getPrototypeOf;
var Ml = Reflect.get;
var Hr = (s) => {
  throw TypeError(s);
};
var El = (s, e, t) => e in s ? kl(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var N = (s, e, t) => El(s, typeof e != "symbol" ? e + "" : e, t), aa = (s, e, t) => e.has(s) || Hr("Cannot " + t);
var F = (s, e, t) => (aa(s, e, "read from private field"), t ? t.call(s) : e.get(s)), be = (s, e, t) => e.has(s) ? Hr("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(s) : e.set(s, t), Pe = (s, e, t, i) => (aa(s, e, "write to private field"), i ? i.call(s, t) : e.set(s, t), t), M = (s, e, t) => (aa(s, e, "access private method"), t);
var yi = (s, e, t) => Ml(vl(s), t, e);
const ye = {
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
}, k = ye, T = "mwd", Cl = "MechWarrior: Destiny", Ca = `system.${T}`, Pl = T, rs = `systems/${T}`, Gn = `${rs}/style`, Wi = `${rs}/third-party/style`, G = `systems/${T}/templates`, Us = `${rs}/img/icons`, X = `${Us}/skills`, ce = "MWD | ", Nl = 2, Rl = 5, Dl = 4, qn = 8, jt = {
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
}, Pa = {
  autopilot: "autopilot",
  firewall: "firewall",
  knowledge: "knowledge"
}, je = {
  grit: "grit",
  chaos: "chaos",
  insight: "insight",
  rumor: "rumor",
  legend: "legend",
  credibility: "credibility"
}, gr = {
  physical: [je.grit, je.chaos],
  mental: [je.insight, je.rumor],
  social: [je.legend, je.credibility]
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
  actorAttributes: jt,
  itemAttributes: Pa,
  attributes: { ...jt, ...Pa },
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
    edgePools: je,
    edgePoolGroups: gr,
    physical: {
      grit: je.grit,
      chaos: je.chaos
    },
    mental: {
      insight: je.insight,
      rumor: je.rumor
    },
    social: {
      legend: je.legend,
      credibility: je.credibility
    },
    chaos: je.chaos
  },
  area: {
    none: "none",
    shotgun: "shotgun",
    circle: "circle",
    cone: "cone",
    rect: "rect",
    ray: "ray"
  }
}, Il = Object.freeze({
  physical: "physical",
  mental: "mental",
  social: "social"
});
Object.freeze(Object.values(Il));
const Ii = {
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
}, ra = {
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
}, xe = {
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
  SYSTEM_DESCRIPTION: Cl,
  SYSTEM_SOCKET: Ca,
  SYSTEM_SCOPE: Pl,
  SYSTEM_PATH: rs,
  STYLE_PATH: Gn,
  THIRD_PARTY_STYLE_PATH: Wi,
  TEMPLATES_PATH: G,
  ICONS_PATH: Us,
  ICONS_SKILLS_PATH: X,
  LOG_HEAD: ce,
  SPECIALIZATION_BONUS: Nl,
  TARGET_SUCCESS: Rl,
  TARGET_SUCCESS_EDGE: Dl,
  BASE_MONITOR: qn,
  ACTOR_ATTRIBUTES: jt,
  ITEM_ATTRIBUTES: Pa,
  EDGE_POOL_GROUPS: gr,
  TEMPLATE: S,
  ANARCHY_SYSTEM: xe
};
const lt = class lt {
  static ascending(e = (t) => t) {
    return (t, i) => lt.sortingBy(e(t), e(i));
  }
  static descending(e = (t) => t) {
    return (t, i) => lt.sortingBy(e(i), e(t));
  }
  static sortingBy(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
  }
  static bySortedArray(e) {
    return (t) => e.indexOf(t);
  }
  static ascendingBySortedArray(e) {
    return lt.ascending(lt.bySortedArray(e));
  }
  static sortedMap(e, t = (i, a) => 0) {
    return Object.keys(e).sort(t).reduce(
      (i, a) => (i[a] = e[a], i),
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
    return e.map(t).filter((i) => i != null).reduce(lt.sum(), 0);
  }
  static divint(e, t) {
    return Math.floor(e / t);
  }
  static divup(e, t) {
    return Math.ceil(e / t);
  }
  static join(e, t = "") {
    return e.reduce(lt.joiner(t));
  }
  static joiner(e = "") {
    return (t, i) => t + e + i;
  }
  static classify(e, t = (i) => i.type) {
    let i = {};
    return lt.classifyInto(i, e, t), i;
  }
  static classifyFirst(e, t) {
    let i = {};
    for (const a of e) {
      const r = t(a);
      i[r] || (i[r] = a);
    }
    return i;
  }
  static classifyInto(e, t, i = (a) => a.type) {
    for (const a of t) {
      const r = i(a);
      let n = e[r];
      n || (n = [], e[r] = n), n.push(a);
    }
  }
  static showControlWhen(e, t) {
    t ? e.show() : e.hide();
  }
  static minmax(e, t, i) {
    return Math.max(t, Math.min(e, i));
  }
};
N(lt, "isString", (e) => typeof e == "string" || e instanceof String);
let Q = lt;
const Ol = {
  keyword: "keywords",
  disposition: "dispositions",
  cue: "cues"
}, C = class C {
  /**
   * Initialize enum caches.
   * Call once during system init/setup after config/constants are available.
   */
  static init() {
    var t, i, a, r, n, o, l, c, u, d, m, f;
    C.hbsAttributes = C.mapObjectToKeyValue(k.attributes).filter((p) => p.value !== "knowledge" && p.value !== "noAttribute"), C.hbsItemTypes = C.mapObjectToKeyValue(k.itemType), C.hbsMonitors = C.mapObjectToKeyValue(k.monitor), C.hbsMonitorLetters = C.mapObjectToKeyValue(k.monitorLetter), C.hbsAssetModuleCategories = C.mapObjectToKeyValue(k.assetModuleCategory), (i = (t = k.item) == null ? void 0 : t.lifeModule) != null && i.type ? C.hbsLifeModuleTypes = C.mapObjectToKeyValue(k.item.lifeModule.type) : (console.warn("MWD | MWD.item.lifeModule.type is missing; life module enums disabled."), C.hbsLifeModuleTypes = []), C.hbsAreas = C.mapObjectToKeyValue(k.area), C.hbsRanges = C.mapObjectToKeyValue(k.range), C.hbsVehicleCategories = C.mapObjectToKeyValue(k.vehicleCategory), C.hbsMwdWeightClasses = C.mapObjectToKeyValue((a = k.mwd) == null ? void 0 : a.weightClass), C.hbsMwdHardpointTypes = C.mapObjectToKeyValue((r = k.mwd) == null ? void 0 : r.hardpointType), C.hbsMwdHardpointSizes = C.mapObjectToKeyValue((n = k.mwd) == null ? void 0 : n.hardpointSize), C.hbsMwdHardpointLocations = C.mapObjectToKeyValue((o = k.mwd) == null ? void 0 : o.hardpointLocation), C.hbsMwdPrimaryModes = C.mapObjectToKeyValue((l = k.mwd) == null ? void 0 : l.primarySlotMode), C.hbsMwdWeaponCategories = C.mapObjectToKeyValue((c = k.mwd) == null ? void 0 : c.weaponCategory), C.hbsMwdWeaponDamageTypes = C.mapObjectToKeyValue((u = k.mwd) == null ? void 0 : u.weaponDamageType), C.hbsPersonalWeaponDamageTypes = C.mapObjectToKeyValue((d = k.mwd) == null ? void 0 : d.personalDamageType), C.hbsPersonalWeaponDamageCategories = C.mapObjectToKeyValue((m = k.mwd) == null ? void 0 : m.personalDamageCategory), C.hbsMwdMeleeLocations = C.mapObjectToKeyValue((f = k.mwd) == null ? void 0 : f.meleeLocation), C.hbsDamageTypes = Q.distinct(
      (C.hbsMwdWeaponDamageTypes ?? []).concat(C.hbsPersonalWeaponDamageTypes ?? []),
      (p) => p.value
    );
    const e = Object.values(Ii).flat();
    C.sortedAttributeKeys = Q.distinct(
      e.concat(Object.keys(k.attributes ?? {}))
    ), C.registerHandleBarHelpers(), C.ENUMS = C.getEnums();
  }
  static registerHandleBarHelpers() {
    typeof Handlebars > "u" || Handlebars.registerHelper("sortedAttributes", (e) => {
      if (!e || typeof e != "object") return [];
      const t = Object.keys(e), i = C.sortedAttributeKeys ?? [], a = new Map(i.map((r, n) => [r, n]));
      return t.sort((r, n) => {
        const o = a.has(r) ? a.get(r) : 9999, l = a.has(n) ? a.get(n) : 9999;
        return o !== l ? o - l : String(r).localeCompare(String(n));
      }), t.map((r) => {
        const n = e[r];
        return n && typeof n == "object" ? { key: r, ...n } : { key: r, value: n };
      });
    });
  }
  static getDamageTypes() {
    return C.hbsDamageTypes ?? [];
  }
  static getAttributes(e = () => !0) {
    return (C.hbsAttributes ?? []).filter((t) => e(t.value));
  }
  static getActorWordTypes() {
    return Ol;
  }
  static getMonitors() {
    return C.hbsMonitors ?? [];
  }
  /**
   * Returns a big blob of enums suitable for sheet contexts.
   * `withKnowledge` is passed through to the skills service.
   */
  static getEnums(e = () => !0, t = !1) {
    return {
      attributes: C.getAttributes(e),
      itemTypes: C.hbsItemTypes ?? [],
      monitors: C.hbsMonitors ?? [],
      monitorLetters: C.hbsMonitorLetters ?? [],
      assetModuleCategories: C.hbsAssetModuleCategories ?? [],
      lifeModuleTypes: C.hbsLifeModuleTypes ?? [],
      areas: C.hbsAreas ?? [],
      ranges: C.hbsRanges ?? [],
      vehicleCategories: C.hbsVehicleCategories ?? [],
      // Skills: now sourced from MWD namespace (with safe fallback)
      skills: C.getSkillsEnum({ withKnowledge: t }),
      // MWD enums
      mwdWeightClasses: C.hbsMwdWeightClasses ?? [],
      mwdHardpointTypes: C.hbsMwdHardpointTypes ?? [],
      mwdHardpointSizes: C.hbsMwdHardpointSizes ?? [],
      mwdHardpointLocations: C.hbsMwdHardpointLocations ?? [],
      mwdPrimaryModes: C.hbsMwdPrimaryModes ?? [],
      mwdWeaponCategories: C.hbsMwdWeaponCategories ?? [],
      mwdWeaponDamageTypes: C.hbsMwdWeaponDamageTypes ?? [],
      personalWeaponDamageTypes: C.hbsPersonalWeaponDamageTypes ?? [],
      personalWeaponDamageCategories: C.hbsPersonalWeaponDamageCategories ?? [],
      damageTypes: C.hbsDamageTypes ?? [],
      mwdMeleeLocations: C.hbsMwdMeleeLocations ?? []
    };
  }
  static getSkillsEnum({ withKnowledge: e = !1 } = {}) {
    var a, r, n, o, l;
    const t = ((r = (a = game == null ? void 0 : game.system) == null ? void 0 : a.mwd) == null ? void 0 : r.skills) ?? ((o = (n = game == null ? void 0 : game.system) == null ? void 0 : n.anarchy) == null ? void 0 : o.skills);
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
    return !e || typeof e != "object" ? [] : Object.keys(e).map((a) => {
      const r = e[a];
      let n;
      return r && typeof r == "object" ? n = r.label ?? r.name ?? r.value ?? String(a) : r != null ? n = String(r) : n = String(a), {
        [t]: a,
        [i]: n
      };
    });
  }
  // Backwards-compat alias (the legacy file misspelled this)
  static mapObjetToKeyValue(e, t = "value", i = "label") {
    return C.mapObjectToKeyValue(e, t, i);
  }
};
N(C, "ENUMS"), // HBS-friendly arrays of { value, label } (or key/value depending on caller)
N(C, "hbsAttributes"), N(C, "hbsItemTypes"), N(C, "hbsMonitors"), N(C, "hbsMonitorLetters"), N(C, "hbsAssetModuleCategories"), N(C, "hbsLifeModuleTypes"), N(C, "hbsAreas"), N(C, "hbsRanges"), N(C, "hbsVehicleCategories"), // MWD-specific enum groups
N(C, "hbsMwdWeightClasses"), N(C, "hbsMwdHardpointTypes"), N(C, "hbsMwdHardpointSizes"), N(C, "hbsMwdHardpointLocations"), N(C, "hbsMwdPrimaryModes"), N(C, "hbsMwdWeaponCategories"), N(C, "hbsMwdWeaponDamageTypes"), N(C, "hbsPersonalWeaponDamageTypes"), N(C, "hbsPersonalWeaponDamageCategories"), N(C, "hbsDamageTypes"), N(C, "hbsMwdMeleeLocations"), N(C, "sortedAttributeKeys");
let se = C;
class _l {
  static monitor(e) {
    return se.getFromList(se.getMonitors(), e) ?? "";
  }
  static letter(e) {
    return se.getFromList(se.getMonitorLetters(), e) ?? "";
  }
}
class Ll {
  static toLowerCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}
const $l = [
  "fas fa-dice",
  "fas fa-dice-one",
  "fas fa-dice-two",
  "fas fa-dice-three",
  "fas fa-dice-four",
  "fas fa-dice-five",
  "fas fa-dice-six"
];
class W {
  static fontAwesome(e) {
    return `<i class="${e}"></i>`;
  }
  static iconSystemPath(e, t) {
    return W.iconPath(`${Gn}/${e}`, t);
  }
  static iconPath(e, t) {
    return `<img class="${t}" src="${e}" />`;
  }
  static iconD6(e) {
    if (e < 0 || e > 6)
      throw `Dice ${e} is out of dice range [1..6] or 0 for multidice`;
    return W.fontAwesome($l[e]);
  }
}
globalThis.ANARCHY_ICONS = W;
const pe = (s, e = {}) => s.replace(/\{(.*?)\}/g, (t, i) => e[i] ?? "");
function yr(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? Object.values(s).flatMap((e) => yr(e)) : Array.isArray(s) ? s.map((e) => String(e ?? "").trim()).filter(Boolean) : String(s ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function Xi(s = []) {
  return Array.from(new Set(s.map((e) => String(e ?? "").trim()).filter(Boolean)));
}
function As(s, e = "standard") {
  return String(s ?? "").trim() || e;
}
function xl(s, e = {}) {
  s && (s.movedToKeywords ?? (s.movedToKeywords = []), s.movedToKeywords.push(e));
}
function Bl(s, e, t = {}) {
  s && (s.errors ?? (s.errors = []), s.errors.push({ message: e, ...t }));
}
const br = Object.freeze(["templated"]), Fl = Object.freeze([
  "burstCapable",
  "fullAutoCapable",
  "salvoCapable"
]), zl = Object.freeze([
  "clustered",
  "mineLayer",
  "smoke",
  "incendiary",
  "emp"
]), Wl = Object.freeze([
  { value: "burstCapable", label: "Burst Capable" },
  { value: "fullAutoCapable", label: "Full Auto Capable" },
  { value: "salvoCapable", label: "Salvo Capable" }
]), Hl = Object.freeze([
  { value: "templated", label: "Templated" },
  { value: "clustered", label: "Clustered" },
  { value: "mineLayer", label: "Mine Layer" },
  { value: "smoke", label: "Smoke" },
  { value: "incendiary", label: "Incendiary" },
  { value: "emp", label: "EMP" }
]), Vn = Object.freeze([
  { value: "blast", label: "Blast" },
  { value: "cone", label: "Cone" },
  { value: "line", label: "Line" },
  { value: "cloud", label: "Cloud" },
  { value: "minefield", label: "Minefield" }
]), Kn = Object.freeze([
  { value: "targeted", label: "Targeted" },
  { value: "origin", label: "Origin" },
  { value: "placed", label: "Placed" }
]), Ul = Object.freeze(["blast", "cone", "line"]);
new Set(br);
const jl = /* @__PURE__ */ new Set([
  ...br,
  ...Fl
]), Gl = /* @__PURE__ */ new Set([
  ...br,
  ...zl
]);
function Sr() {
  return {
    movedToKeywords: [],
    errors: []
  };
}
function Is(s) {
  return Xi(yr(s));
}
function Yn({
  traits: s = [],
  keywords: e = [],
  recognized: t = /* @__PURE__ */ new Set(),
  report: i = null,
  owner: a = "weapon",
  path: r = ""
} = {}) {
  const n = yr(s), o = Is(e), l = [], c = [...o];
  for (const u of n) {
    if (t.has(u)) {
      l.push(u);
      continue;
    }
    c.push(u), xl(i, {
      owner: a,
      from: r || "traits",
      to: r ? r.replace(/traits$/u, "keywords") : "keywords",
      value: u
    });
  }
  return {
    traits: Xi(l),
    keywords: Xi(c)
  };
}
function Qn({
  traits: s = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.traits"
} = {}) {
  return Yn({
    traits: s,
    keywords: e,
    recognized: jl,
    report: t,
    owner: "weapon",
    path: i
  });
}
function Jn({
  traits: s = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.payloads[].traits"
} = {}) {
  return Yn({
    traits: s,
    keywords: e,
    recognized: Gl,
    report: t,
    owner: "payload",
    path: i
  });
}
function Xn(s = {}, e = "standard") {
  const t = s ?? {}, i = As(
    t.resolverKey ?? t.damageModel ?? t.resolver,
    e
  ), a = String(t.damageModel ?? "").trim(), r = t.onHitEffect;
  return {
    resolverKey: i,
    damageModel: a,
    onHitEffect: r === null ? null : String(r ?? "").trim() || null
  };
}
function na(s = {}) {
  const e = s ?? {}, t = !!e.enabled, i = e.shots, a = e.accuracyMod, r = e.addHeat, n = e.consumption;
  return {
    enabled: t,
    ...i !== void 0 ? { shots: Math.max(0, Number(i ?? 0) || 0) } : {},
    ...a !== void 0 ? { accuracyMod: Number(a ?? 0) || 0 } : {},
    ...r !== void 0 ? { addHeat: Number(r ?? 0) || 0 } : {},
    ...n !== void 0 ? { consumption: Math.max(0, Number(n ?? 0) || 0) } : {}
  };
}
function ql(s = {}) {
  const e = s ?? {};
  return {
    single: na(e.single),
    burst: na(e.burst),
    fullAuto: na(e.fullAuto)
  };
}
function Vl(s) {
  const e = String(s ?? "").trim().toLowerCase();
  return e === "circle" ? "blast" : e === "ray" ? "line" : Vn.some((t) => t.value === e) ? e : "";
}
function Kl(s) {
  const e = String(s ?? "").trim().toLowerCase();
  return ["target", "targeted"].includes(e) ? "targeted" : Kn.some((t) => t.value === e) ? e : "";
}
function Yl(s = null) {
  const e = s ?? {}, t = Vl(e.shape ?? e.t ?? e.type), i = e.size ?? e.distance ?? e.radius ?? e.length, a = Kl(e.placement ?? e.origin ?? e.mode);
  return !t && i === void 0 && !a ? null : {
    shape: t,
    size: Math.max(0, Number(i ?? 0) || 0),
    placement: a || "targeted"
  };
}
function Ql({
  weapon: s = {},
  payload: e = {},
  effectiveTraits: t = [],
  effectiveResolution: i = null,
  report: a = null
} = {}) {
  var g, y;
  const r = Xi((s == null ? void 0 : s.traits) ?? []), n = Xi((e == null ? void 0 : e.traits) ?? []), o = t.includes("templated"), l = r.includes("templated"), c = n.includes("templated"), u = (e == null ? void 0 : e.template) ?? null, d = (s == null ? void 0 : s.template) ?? null, m = As((g = e == null ? void 0 : e.resolution) == null ? void 0 : g.resolverKey, ""), f = As((y = s == null ? void 0 : s.resolution) == null ? void 0 : y.resolverKey, ""), p = As(i == null ? void 0 : i.resolverKey, "standard"), h = [];
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
    Bl(a, b, { capability: "templated" });
  return {
    errors: h,
    liveCapabilities: ["templated"],
    template: u,
    resolverKey: p,
    isTemplated: !0
  };
}
const Zn = Object.freeze({
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}), Os = Object.freeze(
  Object.entries(Zn).map(([s, e]) => ({ value: s, label: e }))
), Jl = Object.freeze({
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
}), Xl = Object.freeze(
  Os.map((s) => s.value)
), Na = Object.freeze({}), js = Object.freeze({
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
    resolve: (s) => ({ reinforced: Math.max(0, Number((s == null ? void 0 : s.rating) ?? 0) || 0) })
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
}), Zl = Object.freeze(
  Object.values(js).map((s) => ({
    value: s.key,
    label: s.label,
    rated: s.rated
  }))
), eo = ao(Na), to = ao(js);
function Gs(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? Object.values(s).flatMap((e) => Gs(e)) : Array.isArray(s) ? s.map((e) => String(e ?? "").trim()).filter(Boolean) : String(s ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function pt(s, e = "penetrating") {
  const t = String(s ?? "").trim().toLowerCase();
  return Jl[t] ?? e;
}
function io(s) {
  const e = String(s ?? "").trim();
  return e ? pt(e, "") : "";
}
function so(s) {
  const e = String(s ?? "").trim().toLowerCase();
  return Xl.includes(e);
}
function vt(s) {
  const e = pt(s, "");
  return Zn[e] ?? String(s ?? "").trim();
}
function mt(s) {
  const e = s ?? {}, t = Number(e.ballistic ?? 0) || 0, i = Number(e.melee ?? 0) || 0;
  return {
    penetrating: e.penetrating !== void 0 ? Number(e.penetrating ?? 0) || 0 : Math.max(t, i),
    concussive: e.concussive !== void 0 ? Number(e.concussive ?? 0) || 0 : Number(e.explosive ?? 0) || 0,
    energy: Number(e.energy ?? 0) || 0,
    thermal: Number(e.thermal ?? 0) || 0,
    electrical: Number(e.electrical ?? 0) || 0
  };
}
function ws(s) {
  return Gs(s);
}
function Bi(s) {
  return Gs(s);
}
function ec(s) {
  return Is(s);
}
function Ts(s = {}, e = "standard") {
  return Xn(s, e);
}
function ks(s = {}) {
  return ql(s);
}
function tc(s = null) {
  return Yl(s);
}
function Oi(s = "id") {
  var t, i;
  const e = (i = (t = globalThis.foundry) == null ? void 0 : t.utils) == null ? void 0 : i.randomID;
  return typeof e == "function" ? e() : `${s}-${Math.random().toString(36).slice(2, 10)}`;
}
function ao(s) {
  const e = {};
  return Object.values(s).forEach((t) => {
    [t.key, ...t.aliases ?? []].forEach((i) => {
      e[Zi(i)] = t.key;
    });
  }), Object.freeze(e);
}
function Zi(s) {
  return String(s ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function Fi(s) {
  return Array.isArray(s) ? s : s && typeof s == "object" ? Object.values(s) : s == null || s === "" ? [] : [s];
}
function ro(s, e) {
  return Fi(s).map((t) => ic(t, e)).filter(Boolean);
}
function ic(s, e) {
  if (typeof s == "string" || typeof s == "number") {
    const i = e[Zi(s)];
    return i ? { id: Oi("trait"), key: i, rating: 1 } : null;
  }
  if (!s || typeof s != "object") return null;
  const t = e[Zi(s.key ?? s.value ?? s.name)];
  return t ? {
    id: String(s.id ?? "").trim() || Oi("trait"),
    key: t,
    rating: Math.max(0, Number(s.rating ?? 0) || 0)
  } : null;
}
function ri(s) {
  return ro(s, eo);
}
function St(s) {
  return ro(s, to);
}
function _s(s) {
  return {
    close: Number((s == null ? void 0 : s.close) ?? (s == null ? void 0 : s.short) ?? 0) || 0,
    near: Number((s == null ? void 0 : s.near) ?? (s == null ? void 0 : s.medium) ?? 0) || 0,
    far: Number((s == null ? void 0 : s.far) ?? (s == null ? void 0 : s.long) ?? 0) || 0,
    extreme: Number((s == null ? void 0 : s.extreme) ?? 0) || 0
  };
}
function sc(s = {}, e = {}) {
  const t = _s(s), i = _s(e);
  return {
    close: t.close + i.close,
    near: t.near + i.near,
    far: t.far + i.far,
    extreme: t.extreme + i.extreme
  };
}
function ac(s, e) {
  var t;
  return ((t = e[s]) == null ? void 0 : t.label) ?? s;
}
function no(s, e) {
  var a;
  const t = ac(s == null ? void 0 : s.key, e), i = Math.max(0, Number((s == null ? void 0 : s.rating) ?? 0) || 0);
  return (a = e[s == null ? void 0 : s.key]) != null && a.rated && i > 0 ? `${t} ${i}` : t;
}
function oo(s, e) {
  return Fi(s).map((t) => {
    const i = t == null ? void 0 : t.key, a = e[i];
    return a != null && a.resolve ? {
      entry: t,
      effect: a.resolve(t),
      label: no(t, e)
    } : null;
  }).filter(Boolean);
}
function rc(s, e) {
  const t = { ...s ?? {} };
  return Object.entries(e ?? {}).forEach(([i, a]) => {
    t[i] = (Number(t[i] ?? 0) || 0) + (Number(a ?? 0) || 0);
  }), t;
}
function nc(s = []) {
  const e = {}, t = /* @__PURE__ */ new Set();
  for (const i of s.filter(Boolean)) {
    i.accuracyMod !== void 0 && (e.accuracyMod = (Number(e.accuracyMod ?? 0) || 0) + (Number(i.accuracyMod ?? 0) || 0)), i.ap !== void 0 && (e.ap = (Number(e.ap ?? 0) || 0) + (Number(i.ap ?? 0) || 0)), i.addHeat !== void 0 && (e.addHeat = (Number(e.addHeat ?? 0) || 0) + (Number(i.addHeat ?? 0) || 0)), i.bonusVsArmorTag && (e.bonusVsArmorTag = rc(e.bonusVsArmorTag, i.bonusVsArmorTag));
    for (const a of i.flags ?? []) {
      const r = String(a ?? "").trim();
      r && t.add(r);
    }
  }
  return t.size > 0 && (e.flags = Array.from(t)), e;
}
function oc(s = [], e = []) {
  const t = Array.isArray(s) || typeof s == "string" ? { traits: s, standardTraits: e } : s ?? {}, i = Bi(t.traits), a = ri(t.standardTraits), r = oo(a, Na), n = i.map((o) => {
    var u;
    const l = eo[Zi(o)];
    if (!l) return null;
    const c = (u = Na[l]) == null ? void 0 : u.resolve;
    return typeof c == "function" ? c({ key: l, rating: 1 }) : null;
  });
  return nc([
    ...r.map((o) => o.effect),
    ...n
  ]);
}
function lc(s) {
  const e = s ?? {}, t = Sr(), i = Jn({
    traits: e.traits,
    keywords: e.keywords,
    report: t,
    path: "ammo.types[].traits"
  });
  return {
    id: String(e.id ?? "").trim() || Oi("ammo"),
    name: String(e.name ?? "").trim() || "Ammo",
    damageType: io(e.damageType),
    apMod: Number(e.apMod ?? e.ap ?? 0) || 0,
    attackRatingBandMod: _s(e.attackRatingBandMod ?? e.attackRatingBand),
    traits: i.traits,
    keywords: i.keywords,
    migration: t
  };
}
function cc(s) {
  var l;
  const e = s ?? {}, t = Math.max(0, Number(e.max ?? 0) || 0), i = Number(e.current), a = Number.isFinite(i) ? Math.max(0, Math.min(i, t > 0 ? t : i)) : Math.max(0, t), r = Fi(e.types).map(lc), n = String(e.activeTypeId ?? "").trim(), o = r.some((c) => c.id === n) ? n : ((l = r[0]) == null ? void 0 : l.id) ?? "";
  return {
    current: a,
    max: t,
    consumePerAttack: Math.max(1, Number(e.consumePerAttack ?? 1) || 1),
    activeTypeId: o,
    types: r
  };
}
function uc(s, e = "untracked") {
  const t = String(s ?? "").trim();
  return t ? t === "linked" ? "internal" : t === "perAttack" ? e : ["untracked", "internal", "actorResource", "itemRef"].includes(t) ? t : e : e;
}
function Ra(s = {}) {
  const e = s ?? {};
  return {
    amount: Math.max(1, Number(e.amount ?? e.consumePerUse ?? e.consumePerAttack ?? 1) || 1),
    sourceId: String(e.sourceId ?? "").trim()
  };
}
function Ur(s = {}) {
  const e = s ?? {};
  return {
    damageType: io(e.damageType),
    ap: Number(e.ap ?? e.apMod ?? 0) || 0,
    attackRatingBand: _s(e.attackRatingBand ?? e.attackRatingBandMod)
  };
}
function Da(s = {}) {
  return Xn(s, "standard");
}
function dc(s) {
  return String(s ?? "").trim().toLowerCase() === "unloaded";
}
function qe(s, { report: e = null, path: t = "system.payloads[]" } = {}) {
  var l;
  const i = s ?? {}, a = String(i.id ?? "").trim() || Oi("payload"), r = Jn({
    traits: i.traits ?? ((l = i.modifies) == null ? void 0 : l.traits),
    keywords: i.keywords,
    report: e,
    path: `${t}.traits`
  }), n = Gs(i.compatibleWith ?? i.compatible), o = tc(i.template);
  return dc(a) ? {
    id: "unloaded",
    label: "Unloaded",
    compatibleWith: [],
    modifies: Ur({}),
    traits: [],
    keywords: [],
    template: null,
    resolution: Da({ resolverKey: "standard" }),
    consumption: Ra({ amount: 1, sourceId: "" })
  } : {
    id: a,
    label: String(i.label ?? i.name ?? "").trim() || "Payload",
    compatibleWith: n,
    modifies: Ur(i.modifies ?? i),
    traits: r.traits,
    keywords: r.keywords,
    template: o,
    resolution: Da(i.resolution ?? i),
    consumption: Ra(i.consumption ?? i)
  };
}
function kt(s) {
  var o, l, c, u, d, m;
  const e = s ?? {}, t = uc(
    e.kind || e.type || ((o = e.link) != null && o.actorPath || e.actorPath ? "actorResource" : "") || ((l = e.link) != null && l.itemId || e.itemId || (c = e.link) != null && c.itemPath || e.itemPath ? "itemRef" : "") || (e.tracking || e.current !== void 0 || e.max !== void 0 ? "internal" : "") || "untracked",
    "untracked"
  ), i = e.tracking ?? e, a = Math.max(0, Number(i.max ?? 0) || 0), r = Number(i.current), n = Number.isFinite(r) ? Math.max(0, Math.min(r, a > 0 ? a : r)) : Math.max(0, a);
  return {
    id: String(e.id ?? "").trim() || Oi("source"),
    label: String(e.label ?? e.name ?? "").trim() || "Source",
    kind: t,
    tracking: {
      current: n,
      max: a
    },
    link: {
      actorPath: String(((u = e.link) == null ? void 0 : u.actorPath) ?? e.actorPath ?? "").trim(),
      itemId: String(((d = e.link) == null ? void 0 : d.itemId) ?? e.itemId ?? "").trim(),
      itemPath: String(((m = e.link) == null ? void 0 : m.itemPath) ?? e.itemPath ?? "").trim()
    }
  };
}
function lo({ report: s = null, path: e = "system.payloads" } = {}) {
  return {
    payloads: [qe({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: s, path: `${e}[0]` })],
    selectedPayloadId: "unloaded",
    consumptionSources: [kt({
      id: "untracked",
      label: "Untracked",
      kind: "untracked"
    })]
  };
}
function co(s) {
  return String(s ?? "").trim().toLowerCase() === "melee";
}
function Ia(s = [], { report: e = null, path: t = "system.payloads" } = {}) {
  const i = Fi(s).map((a, r) => qe(a, { report: e, path: `${t}[${r}]` })).filter(Boolean);
  return i.some((a) => a.id === "unloaded") ? i : [
    qe({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: e, path: `${t}[0]` }),
    ...i
  ];
}
function qs(s = {}, { report: e = null, path: t = "system.payloads" } = {}) {
  var d;
  const i = cc(s), a = Math.max(1, Number(i.consumePerAttack ?? 1) || 1), r = i.max > 0, n = r ? "internal-magazine" : "untracked", o = [kt(r ? {
    id: n,
    label: "Internal Source",
    kind: "internal",
    tracking: {
      current: i.current,
      max: i.max
    }
  } : {
    id: n,
    label: "Untracked",
    kind: "untracked",
    tracking: {}
  })], l = i.types.length ? i.types.map((m, f) => qe({
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
      amount: a,
      sourceId: r ? n : ""
    }
  }, { report: e, path: `${t}[${f}]` })) : [qe({
    id: "unloaded",
    label: "Unloaded",
    resolution: { resolverKey: "standard" },
    consumption: {
      amount: a,
      sourceId: r ? n : ""
    }
  }, { report: e, path: `${t}[0]` })], c = Ia(l, { report: e, path: t }), u = c.some((m) => m.id === i.activeTypeId) ? i.activeTypeId : ((d = c[0]) == null ? void 0 : d.id) ?? "unloaded";
  return {
    payloads: c,
    selectedPayloadId: u,
    consumptionSources: o
  };
}
function At(s, { legacyAmmo: e = null, category: t = "", report: i = null, path: a = "system.payloads" } = {}) {
  if (co(t)) return [];
  const r = Fi(s).map((n, o) => qe(n, { report: i, path: `${a}[${o}]` })).filter(Boolean);
  return r.length > 0 ? Ia(r, { report: i, path: a }) : e ? Ia(qs(e, { report: i, path: a }).payloads, { report: i, path: a }) : lo({ report: i, path: a }).payloads;
}
function Hi(s, { legacyAmmo: e = null } = {}) {
  const t = Fi(s).map(kt).filter(Boolean);
  return t.length > 0 ? t : e ? qs(e).consumptionSources : lo().consumptionSources;
}
function ki(s, e = [], { legacyAmmo: t = null, category: i = "" } = {}) {
  var n;
  if (co(i)) return "";
  const a = At(e, { legacyAmmo: t, category: i }), r = String(s ?? "").trim();
  if (a.some((o) => o.id === r)) return r;
  if (t) {
    const o = qs(t).selectedPayloadId;
    if (a.some((l) => l.id === o)) return o;
  }
  return ((n = a[0]) == null ? void 0 : n.id) ?? "unloaded";
}
function jr({ root: s = null, path: e = "", fallback: t = {} } = {}) {
  const i = String(e ?? "").trim();
  if (!s || !i)
    return {
      current: Math.max(0, Number(t.current ?? 0) || 0),
      max: Math.max(0, Number(t.max ?? 0) || 0),
      currentPath: i
    };
  const a = foundry.utils.getProperty(s, i);
  if (a && typeof a == "object") {
    const o = Math.max(0, Number(a.max ?? t.max ?? 0) || 0), l = Number(a.current);
    return {
      current: Number.isFinite(l) ? Math.max(0, Math.min(l, o > 0 ? o : l)) : Math.max(0, o),
      max: o,
      currentPath: `${i}.current`
    };
  }
  const r = Math.max(0, Number(a ?? t.current ?? 0) || 0), n = Math.max(r, Math.max(0, Number(t.max ?? 0) || 0));
  return {
    current: n > 0 ? Math.min(r, n) : r,
    max: n,
    currentPath: i
  };
}
function mc({ source: s = null, actor: e = null } = {}) {
  var i, a, r, n, o, l, c;
  if (!s)
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
    id: s.id,
    label: s.label,
    kind: s.kind,
    actorPath: String(((i = s.link) == null ? void 0 : i.actorPath) ?? "").trim(),
    itemId: String(((a = s.link) == null ? void 0 : a.itemId) ?? "").trim(),
    itemPath: String(((r = s.link) == null ? void 0 : r.itemPath) ?? "").trim()
  };
  if (s.kind === "internal") {
    const u = Math.max(0, Number(((n = s.tracking) == null ? void 0 : n.current) ?? 0) || 0), d = Math.max(0, Number(((o = s.tracking) == null ? void 0 : o.max) ?? 0) || 0);
    return {
      ...t,
      isTracked: d > 0 || u > 0,
      current: u,
      max: d,
      currentPath: ""
    };
  }
  if (s.kind === "actorResource") {
    const u = jr({
      root: (e == null ? void 0 : e.system) ?? null,
      path: t.actorPath,
      fallback: s.tracking
    });
    return {
      ...t,
      isTracked: !0,
      current: u.current,
      max: u.max,
      currentPath: u.currentPath
    };
  }
  if (s.kind === "itemRef") {
    const u = ((c = (l = e == null ? void 0 : e.items) == null ? void 0 : l.get) == null ? void 0 : c.call(l, t.itemId)) ?? null, d = jr({
      root: (u == null ? void 0 : u.system) ?? null,
      path: t.itemPath,
      fallback: s.tracking
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
function Oa({
  payloads: s = [],
  selectedPayloadId: e = "",
  consumptionSources: t = [],
  actor: i = null,
  payloadId: a = "",
  category: r = ""
} = {}) {
  const n = At(s, { category: r }), o = Hi(t), l = ki(a || e, n, { category: r }), c = n.find((f) => f.id === l) ?? n[0] ?? null, u = (c == null ? void 0 : c.consumption) ?? Ra(), d = u.sourceId ? o.find((f) => f.id === u.sourceId) ?? null : o.find((f) => f.kind === "untracked") ?? kt({
    id: "untracked",
    label: "Untracked",
    kind: "untracked"
  }), m = mc({ source: d, actor: i });
  return {
    payloads: n,
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
function pc({
  damageType: s = "penetrating",
  ap: e = 0,
  attackRatingBand: t = {},
  traits: i = [],
  keywords: a = [],
  standardTraits: r = [],
  resolution: n = {},
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
  var B, te, he, ge, Ce;
  const g = Oa({
    payloads: l != null && l.length ? l : void 0,
    selectedPayloadId: c || p,
    consumptionSources: u,
    actor: m,
    payloadId: d || p,
    category: h
  }), b = ((!l || l.length === 0) && f ? Oa({
    ...qs(f),
    actor: m,
    payloadId: d || p,
    category: h
  }) : null) ?? g, A = b.activePayload, w = Qn({
    traits: i,
    keywords: a
  }), E = Array.from(/* @__PURE__ */ new Set([
    ...w.traits,
    ...Bi(A == null ? void 0 : A.traits)
  ])), I = Is([
    ...w.keywords,
    ...Is(A == null ? void 0 : A.keywords)
  ]), D = Ts(n, "standard"), L = (B = A == null ? void 0 : A.resolution) != null && B.resolverKey ? Da(A.resolution) : D, V = ks(o), Y = Sr(), K = Ql({
    weapon: {
      traits: w.traits,
      resolution: D
    },
    payload: A,
    effectiveTraits: E,
    effectiveResolution: L,
    report: Y
  }), O = ri(r), R = oc({
    traits: [],
    standardTraits: O
  }), U = {
    ...b.sourceState
  };
  return delete U.sourceItem, {
    damageType: ((te = A == null ? void 0 : A.modifies) == null ? void 0 : te.damageType) || pt(s),
    ap: (Number(e ?? 0) || 0) + (Number(((he = A == null ? void 0 : A.modifies) == null ? void 0 : he.ap) ?? 0) || 0),
    attackRatingBand: sc(
      t,
      ((ge = A == null ? void 0 : A.modifies) == null ? void 0 : ge.attackRatingBand) ?? {}
    ),
    effects: R,
    traits: E,
    keywords: I,
    standardTraits: O,
    payloadLabel: b.payloadLabel,
    payload: A ? foundry.utils.deepClone(A) : null,
    payloadState: {
      payloads: b.payloads.map((De) => foundry.utils.deepClone(De)),
      activePayloadId: b.activePayloadId,
      payloadLabel: b.payloadLabel,
      sourceId: ((Ce = b.source) == null ? void 0 : Ce.id) ?? "",
      sourceLabel: b.sourceState.label ?? "",
      sourceKind: b.sourceState.kind ?? "untracked",
      isTracked: b.sourceState.isTracked,
      current: b.sourceState.current,
      max: b.sourceState.max,
      consumePerUse: b.sourceState.consumePerUse
    },
    source: b.source ? foundry.utils.deepClone(b.source) : null,
    sourceState: foundry.utils.deepClone(U),
    template: K.template ? foundry.utils.deepClone(K.template) : null,
    resolution: foundry.utils.deepClone(L),
    resolverKey: String((L == null ? void 0 : L.resolverKey) ?? "standard").trim() || "standard",
    fireModes: foundry.utils.deepClone(V),
    capabilityReport: {
      ...Y,
      liveCapabilities: K.liveCapabilities,
      isTemplated: K.isTemplated,
      template: K.template ? foundry.utils.deepClone(K.template) : null,
      resolverKey: String((L == null ? void 0 : L.resolverKey) ?? "standard").trim() || "standard"
    },
    ammoLabel: b.payloadLabel,
    ammoType: A ? foundry.utils.deepClone(A) : null,
    ammoState: {
      current: U.current,
      max: U.max,
      consumePerAttack: U.consumePerUse,
      activeTypeId: b.activePayloadId,
      types: b.payloads.map((De) => {
        var Ye;
        return {
          id: De.id,
          name: De.label,
          damageType: ((Ye = De.modifies) == null ? void 0 : Ye.damageType) ?? "",
          traits: De.traits ?? [],
          keywords: De.keywords ?? []
        };
      }),
      isTracked: U.isTracked,
      ammoLabel: b.payloadLabel
    }
  };
}
function uo(s = {}, e = {}) {
  const t = mt(s), i = mt(e);
  return {
    penetrating: t.penetrating + i.penetrating,
    concussive: t.concussive + i.concussive,
    energy: t.energy + i.energy,
    thermal: t.thermal + i.thermal,
    electrical: t.electrical + i.electrical
  };
}
function oa({ standardTraits: s = [], traits: e = [], traitState: t = {} } = {}) {
  var m, f;
  const i = St(s), r = Bi(e).map((p) => {
    const h = to[Zi(p)];
    return h ? { id: Oi("trait"), key: h, rating: h === "reinforced" ? 1 : 0 } : null;
  }).filter(Boolean), n = oo(
    [...i, ...r],
    js
  ), o = n.reduce((p, h) => {
    var g;
    return uo(p, ((g = h.effect) == null ? void 0 : g.mitigationByType) ?? {});
  }, mt({})), l = n.reduce(
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
    labels: n.map((p) => p.label),
    standardTraits: i
  };
}
function fc({ traits: s = [], standardTraits: e = [] } = {}) {
  return [
    ...Bi(s),
    ...St(e).map((i) => no(i, js))
  ].filter(Boolean);
}
function Ar(s) {
  const e = Math.max(0, Number(s ?? 0) || 0);
  return e <= 0 ? 0 : Math.ceil(e / 4);
}
function hc({
  currentArmorRating: s = 0,
  mitigationByType: e = {},
  damageType: t
} = {}) {
  const i = Math.max(0, Number(s ?? 0) || 0);
  if (i <= 0)
    return {
      currentArmorRating: 0,
      baseMitigation: 0,
      typeMitigationMod: 0,
      totalMitigation: 0,
      isDestroyed: !0
    };
  const a = pt(t, "penetrating"), r = mt(e), n = Ar(i), o = Number(r[a] ?? 0) || 0;
  return {
    currentArmorRating: i,
    baseMitigation: n,
    typeMitigationMod: o,
    totalMitigation: n + o,
    isDestroyed: !1
  };
}
function gc({ damageIncoming: s = 0, armorTags: e = [], effects: t = {} } = {}) {
  const i = new Set(ws(e));
  let a = Number(s ?? 0) || 0;
  const r = [];
  return Object.entries((t == null ? void 0 : t.bonusVsArmorTag) ?? {}).forEach(([n, o]) => {
    if (!i.has(n)) return;
    const l = Number(o ?? 0) || 0;
    l && (a *= 1 + l, r.push({ tag: n, bonus: l }));
  }), {
    damageIncoming: a,
    applied: r
  };
}
class fi {
  static checkSufficient(e, t, i) {
    if (t > i) {
      const a = pe(k.common.errors.insufficient, {
        resource: e,
        required: t,
        available: i
      });
      throw ui.notifications.error(a), a;
    }
  }
  static checkOutOfRange(e, t, i, a) {
    if (t < i || t > a) {
      const r = pe(k.common.errors.outOfRange, {
        resource: e,
        value: t,
        min: i,
        max: a
      });
      throw ui.notifications.error(r), r;
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
      const i = pe(k.common.errors.expectedType, {
        type: e.type ? k.itemType.singular[e.type] : e.type,
        expectedType: t
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkActorCanReceiveDamage(e, t, i) {
    if (!t) {
      const a = pe(k.common.errors.actorCannotReceiveDamage, {
        actor: i.name,
        damageType: so(e) ? vt(e) : k.actor.monitors[e] ?? k.mwd.weaponDamageType[e] ?? k.mwd.personalDamageType[e] ?? e
      });
      throw ui.notifications.error(a), a;
    }
  }
  static checkWeaponDefense(e, t) {
    var a;
    const i = e.getDefense();
    if ((((a = e.isPersonalWeapon) == null ? void 0 : a.call(e)) ?? e.type === S.itemType.personalWeapon) && !i) {
      const r = pe(k.common.errors.noDefenseOnWeapon, { actor: t.name, weapon: e.name });
      throw ui.notifications.error(r), r;
    }
  }
  static checkTargetsCount(e, t, i) {
    if (e > 0 && t.length > e) {
      const a = pe(k.common.errors.maxTargetsExceedeed, {
        weapon: this.name,
        area: k.area[i],
        count: t.length,
        max: e
      });
      throw ui.notifications.error(a), a;
    }
  }
  static checkActorDefenseAction(e, t, i) {
    if (!e) {
      const a = pe(k.common.errors.actorDoesNotHaveDefense, {
        actor: t.name,
        defense: i.labelkey,
        actorType: k.actorType[t.type]
      });
      throw ui.notifications.error(a), a;
    }
  }
}
function ot(s, e, t, i, a, r = (n) => !0) {
  return {
    code: s,
    labelkey: k.attributeAction[s],
    label: k.attributeAction[s],
    attributeFunction1: e ?? ((n) => {
    }),
    attributeFunction2: t ?? ((n) => {
    }),
    icon: i,
    actorTypes: a,
    condition: r
  };
}
function ls(s, e) {
  return {
    code: s,
    labelkey: k.defense[s],
    label: k.defense[s],
    actionCode: e
  };
}
const Te = S.actorAttributes, ke = S.actorTypes, Ue = xe.actions, cs = xe.defenses, la = [
  ot(Ue.defense, (s) => Te.reflexes, (s) => Te.intelligence, W.fontAwesome("fas fa-shield-alt"), [ke.character, ke.npc]),
  ot(Ue.defense, (s) => Te.handling, (s) => Te.chassis, W.fontAwesome("fas fa-tachometer-alt"), [ke.vehicle, ke.battlemech]),
  ot(Ue.resistTorture, (s) => Te.strength, (s) => Te.willpower, W.fontAwesome("fas fa-angry"), [ke.character, ke.npc]),
  ot(Ue.perception, (s) => Te.logic, (s) => Te.willpower, W.fontAwesome("fas fa-eye"), [ke.character, ke.npc]),
  ot(Ue.perception, (s) => Te.system, (s) => Te.handling, W.fontAwesome("fas fa-video"), [ke.vehicle, ke.battlemech]),
  ot(Ue.composure, (s) => Te.charisma, (s) => Te.willpower, W.fontAwesome("fas fa-meh"), [ke.character, ke.npc]),
  ot(Ue.judgeIntentions, (s) => Te.charisma, (s) => Te.charisma, W.fontAwesome("fas fa-theater-masks"), [ke.character, ke.npc]),
  ot(Ue.memory, (s) => Te.logic, (s) => Te.logic, W.fontAwesome("fas fa-brain"), [ke.character, ke.npc]),
  ot(Ue.catch, (s) => Te.reflexes, (s) => Te.reflexes, W.fontAwesome("fas fa-baseball-ball"), [ke.character, ke.npc]),
  ot(Ue.lift, (s) => Te.strength, (s) => Te.strength, W.fontAwesome("fas fa-dumbbell"), [ke.character, ke.npc])
], us = [
  ls(cs.physicalDefense, Ue.defense),
  ls(cs.physicalResistance, Ue.resistTorture),
  ls(cs.socialDefense, Ue.composure),
  ls(cs.mentalResistance, Ue.perception)
];
class Se {
  static init() {
    Handlebars.registerHelper("fixedDefenseCode", (e) => Se.fixedDefenseCode(e));
  }
  static all(e = void 0) {
    return e ? la.filter(e) : la;
  }
  static getActorActions(e) {
    return la.filter((t) => t.actorTypes.includes(e.type) && t.condition(e));
  }
  static fixedDefenseCode(e) {
    return xe.fixedDefenseCode[e] ?? e;
  }
  static getActorDefenses(e) {
    return us.map((t) => {
      const i = Se.getActorAction(e, t.actionCode);
      return Se._convertToDefense(i, t);
    }).filter((t) => t == null ? void 0 : t.code);
  }
  static getDefenseAttributeAction(e) {
    var t;
    return (t = us.find((i) => i.code == e)) == null ? void 0 : t.actionCode;
  }
  static getActorAction(e, t) {
    return Se.getActorActions(e).find((i) => i.code == t);
  }
  static getActorDefense(e, t) {
    t = Se.fixedDefenseCode(t);
    const i = us.find((r) => r.code == t), a = Se.getActorAction(e, i.actionCode);
    return fi.checkActorDefenseAction(a, e, i), Se._convertToDefense(a, i);
  }
  static _convertToDefense(e, t) {
    return e ? foundry.utils.mergeObject(
      t,
      e ?? {},
      { overwrite: !1, inplace: !1 }
    ) : void 0;
  }
  static getDefenses() {
    return us;
  }
  static prepareShortcut(e, t) {
    const i = Se.getActorActions(e).find((a) => a.code == t);
    if (i)
      return {
        icon: i.icon,
        label: i.labelkey,
        callback: (a) => a.actor.rollAttributeAction(t)
      };
  }
}
class _a {
  constructor() {
    this.remoteCalls = {}, game.socket.on(Ca, async (e) => this.onSocketMessage(e));
  }
  static async register(e, t) {
    game.system.anarchy.remoteCall._register(e, t);
  }
  async _register(e, t) {
    if (this.remoteCalls[e])
      throw `RemoteCall msg ${e} is already registered`;
    foundry.utils.mergeObject(t, {
      callback: (i) => {
        console.log(ce + "RemoteCall [", e, "] (", i, ")");
      },
      condition: (i) => !0,
      multiple: !1
      /* true if multiple users should handle the message */
    }, { overwrite: !1 }), this.remoteCalls[e] = t, console.log(ce + "RemoteCall registered", e);
  }
  static call(e, t) {
    return game.system.anarchy.remoteCall._remoteCall(e, t);
  }
  _remoteCall(e, t) {
    const i = this.remoteCalls[e];
    return !i || i.condition(game.user) || !i.multiple && et.isUniqueConnectedGM() ? !1 : (game.socket.emit(Ca, { msg: e, data: t }), !0);
  }
  async onSocketMessage(e) {
    const t = this.remoteCalls[e.msg];
    if (t) {
      const i = t.condition(game.user), a = t.multiple, r = et.isUniqueConnectedGM();
      i && (a || r) ? t.callback(e.data) : console.log(ce + "RemoteCall.onSocketMessage(", e, ") ignored :", i, a, r);
    } else
      console.log(ce + "RemoteCall: No callback registered for", e);
  }
}
const Gr = "Users.blindMessageToGM";
class et {
  static init() {
    _a.register(Gr, {
      callback: (e) => et.blindMessageToGM(e),
      condition: (e) => e.isGM
    });
  }
  static blindMessageToGM(e) {
    _a.call(Gr, e) || ChatMessage.create({
      user: e.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      blind: !0,
      content: pe(k.chat.blindMessageToGM, {
        user: game.user.name,
        message: e.content
      })
    });
  }
  static getUsers(e = (t) => !0) {
    return (game.version ? game.users : game.users.entities).filter(e);
  }
  static firstConnectedGM() {
    return et.getUsers((e) => e.isGM && e.active).sort(Q.ascending((e) => e.id)).at(0) ?? {};
  }
  /**
   * @returns true pour un seul utilisateur: le premier GM connecté par ordre d'id
   */
  static isUniqueConnectedGM(e = game.user) {
    return e.id == et.firstConnectedGM().id;
  }
  static firstResponsible(e) {
    if (!(e != null && e.testUserPermission))
      return;
    const t = et.getUsers(
      (i) => i.active && e.testUserPermission(i, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER)
    ).sort(Q.ascending((i) => i.id)).at(0);
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
const bi = k.actor.monitors, yt = k.actor.counters, mo = {
  armor: {
    path: "system.monitors.armor.value",
    monitor: (s) => s.system.monitors.armor,
    iconChecked: W.fontAwesome("fas fa-shield-slash"),
    iconUnchecked: W.fontAwesome("fas fa-shield-alt"),
    iconHit: W.fontAwesome("fas fa-bahai"),
    resource: bi.armor
  },
  fatigue: {
    path: "system.monitors.fatigue.value",
    monitor: (s) => s.system.monitors.fatigue,
    iconChecked: W.fontAwesome("fas fa-grimace"),
    iconUnchecked: W.fontAwesome("far fa-smile"),
    iconHit: W.fontAwesome("fas fa-bahai"),
    resource: bi.fatigue,
    overflow: (s) => S.monitors.physical,
    useArmor: !0
  },
  physical: {
    path: "system.monitors.physical.value",
    monitor: (s) => s.system.monitors.physical,
    iconChecked: W.fontAwesome("fas fa-heartbeat"),
    iconUnchecked: W.fontAwesome("far fa-heart"),
    iconHit: W.fontAwesome("fas fa-bahai"),
    resource: bi.physical,
    useArmor: !0
  },
  structure: {
    path: "system.monitors.structure.value",
    monitor: (s) => s.system.monitors.structure,
    iconChecked: W.fontAwesome("fas fa-car-crash"),
    iconUnchecked: W.fontAwesome("fas fa-car-alt"),
    iconHit: W.fontAwesome("fas fa-bahai"),
    resource: bi.structure
  },
  heat: {
    path: "system.monitors.heat.value",
    monitor: (s) => s.system.monitors.heat,
    iconChecked: W.fontAwesome("fas fa-fire"),
    iconUnchecked: W.fontAwesome("far fa-sun"),
    iconHit: W.fontAwesome("fas fa-temperature-high"),
    resource: bi.heat
  },
  criticals: {
    path: "system.hybrid.criticals.value",
    monitor: (s) => {
      var e;
      return ((e = s.system.hybrid) == null ? void 0 : e.criticals) ?? { value: 0, max: 0 };
    },
    iconChecked: W.fontAwesome("fas fa-bolt"),
    iconUnchecked: W.fontAwesome("far fa-dot-circle"),
    iconHit: W.fontAwesome("fas fa-exclamation-triangle"),
    resource: bi.structure
  },
  anarchy: {
    path: "system.counters.anarchy.value",
    monitor: (s) => ({
      value: s.system.counters.anarchy.value,
      max: 6
    }),
    iconChecked: W.iconPath(`${Wi}/anarchy-point.webp`, "checkbar-img"),
    iconUnchecked: W.iconPath(`${Wi}/anarchy-point-off.webp`, "checkbar-img"),
    resource: yt.anarchy
  },
  plot: {
    path: "system.counters.anarchy.value",
    monitor: (s) => {
      const e = s.system.counters.anarchy.value;
      return { value: e, max: e + 1 };
    },
    iconChecked: W.iconPath(`${Wi}/danger-point.webp`, "checkbar-img"),
    iconUnchecked: W.iconPath(`${Wi}/danger-point-off.webp`, "checkbar-img"),
    resource: yt.anarchy
  },
  sceneAnarchy: {
    path: "system.counters.edgePools.chaos.value",
    monitor: (s) => {
      const e = s.getEdgePoolValue(S.counters.edgePools.chaos), t = s.getAttributeValue(S.actorAttributes.edge);
      return { value: e, max: t };
    },
    iconChecked: W.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    iconUnchecked: W.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    resource: yt.edgePools.chaos
  },
  grit: {
    path: "system.counters.edgePools.grit.value",
    monitor: (s) => ({ value: s.getEdgePoolValue(S.counters.edgePools.grit), max: s.getAttributeValue(S.actorAttributes.edge) }),
    iconChecked: W.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    iconUnchecked: W.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    resource: yt.edgePools.grit
  },
  insight: {
    path: "system.counters.edgePools.insight.value",
    monitor: (s) => ({ value: s.getEdgePoolValue(S.counters.edgePools.insight), max: s.getAttributeValue(S.actorAttributes.edge) }),
    iconChecked: W.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    iconUnchecked: W.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    resource: yt.edgePools.insight
  },
  legend: {
    path: "system.counters.edgePools.legend.value",
    monitor: (s) => ({ value: s.getEdgePoolValue(S.counters.edgePools.legend), max: s.getAttributeValue(S.actorAttributes.edge) }),
    iconChecked: W.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    iconUnchecked: W.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    resource: yt.edgePools.legend
  },
  credibility: {
    path: "system.counters.edgePools.credibility.value",
    monitor: (s) => ({ value: s.getEdgePoolValue(S.counters.edgePools.credibility), max: s.getAttributeValue(S.actorAttributes.edge) }),
    iconChecked: W.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    iconUnchecked: W.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    resource: yt.edgePools.credibility
  },
  rumor: {
    path: "system.counters.edgePools.rumor.value",
    monitor: (s) => ({ value: s.getEdgePoolValue(S.counters.edgePools.rumor), max: s.getAttributeValue(S.actorAttributes.edge) }),
    iconChecked: W.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    iconUnchecked: W.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    resource: yt.edgePools.rumor
  }
}, Je = foundry.utils.mergeObject(mo, {});
class _ {
  static init() {
    Handlebars.registerHelper("iconCheckbar", _.iconCheckbar), Handlebars.registerHelper("iconCheckbarHit", _.iconHit);
  }
  static hackCheckbars(e) {
    if (e) {
      const t = foundry.utils.mergeObject(mo, {});
      foundry.utils.mergeObject(t, e, { recursive: !0 }), foundry.utils.mergeObject(Je, t, { overwrite: !0 });
    }
  }
  static iconCheckbar(e, t) {
    return t ? _.iconChecked(e) : _.iconUnchecked(e);
  }
  static iconChecked(e) {
    var t;
    return (t = Je[e]) == null ? void 0 : t.iconChecked;
  }
  static iconUnchecked(e) {
    var t;
    return (t = Je[e]) == null ? void 0 : t.iconUnchecked;
  }
  static iconHit(e) {
    var t, i;
    return ((t = Je[e]) == null ? void 0 : t.iconHit) ?? ((i = Je[e]) == null ? void 0 : i.iconChecked);
  }
  static useArmor(e) {
    var t;
    return (t = Je[e]) == null ? void 0 : t.useArmor;
  }
  static max(e, t) {
    var a;
    const i = (a = Je[t]) == null ? void 0 : a.monitor(e);
    return ((i == null ? void 0 : i.max) ?? 0) + ((i == null ? void 0 : i.maxBonus) ?? 0);
  }
  static value(e, t) {
    var a;
    const i = (a = Je[t]) == null ? void 0 : a.monitor(e);
    return (i == null ? void 0 : i.value) ?? 0;
  }
  static resistance(e, t, i = void 0) {
    return _.resistanceDetail(e, t, i).value;
  }
  static resistanceDetail(e, t, i = void 0) {
    var l, c;
    const a = (l = Je[t]) == null ? void 0 : l.monitor(e), r = _._resolveResistance(a == null ? void 0 : a.resistance, i), n = _._resolveResistance(a == null ? void 0 : a.resistanceBonus, i), o = i === void 0 ? 0 : Number(((c = a == null ? void 0 : a.resistanceBonusByType) == null ? void 0 : c[i]) ?? 0);
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
  static async switchMonitorCheck(e, t, i, a, r = void 0, n = void 0) {
    await _.setCounter(e, t, _.newValue(i, a), r, n);
  }
  static async addCounter(e, t, i, a = void 0) {
    if (i != 0) {
      const r = _.getCounterValue(e, t, a) ?? 0;
      await _.setCounter(e, t, r + i, a);
    }
  }
  static async setCounter(e, t, i, a = void 0, r = void 0) {
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
    const a = Je[t];
    if (a.path) {
      const r = _.max(e, t);
      if (r <= 0)
        return;
      await _._manageOverflow(a, e, t, i, r), i = Math.min(i, r), fi.checkOutOfRange(a.resource, i, 0, r), await e.setCheckbarValue(a.path, i);
    }
  }
  static async _manageOverflow(e, t, i, a, r) {
    if (a > r) {
      const n = e.overflow ? e.overflow(t) : void 0, o = e.recomputeOverflow ? e.recomputeOverflow(a - r) : a - r;
      n && o > 0 && (_._notifyOverflow(t, i, o, n), await _.addCounter(t, n, o));
    }
  }
  static _notifyOverflow(e, t, i, a) {
    const r = pe(k.actor.monitors.overflow, {
      actor: e.name,
      monitor: k.actor.monitors[t],
      overflow: i,
      overflowMonitor: k.actor.monitors[a]
    });
    ui.notifications.warn(r);
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
    const a = _.value(e, t);
    await _.setCheckbar(e, t, i), game.user.isGM || _.notifyAnarchyChange(e, t, a, i);
  }
  static getAnarchy(e, t) {
    return !game.user.isGM && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) || t == yt.anarchy && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) ? 0 : _.value(e, t);
  }
  static notifyAnarchyChange(e, t, i, a) {
    et.blindMessageToGM({
      from: game.user.id,
      content: pe(
        k.gmManager.playerChangedAnarchy,
        {
          user: game.user.name,
          actor: e.name,
          monitor: k.actor.counters[t],
          from: i,
          to: a
        }
      )
    });
  }
}
const { loadTemplates: yc, renderTemplate: bc } = foundry.applications.handlebars, qr = {
  highlighted: ["far fa-times-circle", "fas fa-dice-one", "fas fa-dice-two", "fas fa-dice-three", "fas fa-dice-four", "fas fa-dice-five", "fas fa-dice-six"],
  dimmed: ["far fa-times-circle", "far fa-dice-one", "far fa-dice-two", "far fa-dice-three", "far fa-dice-four", "far fa-dice-five", "far fa-dice-six"]
};
class wt {
  static init() {
    Hooks.once("ready", async () => await this.onReady()), Handlebars.registerHelper("dice-cursor-array", (e, t) => wt.array(e ?? 0, t ?? 5)), Handlebars.registerHelper("dice-cursor-fas", (e, t) => wt.fasClass(e, t)), Handlebars.registerHelper("dice-cursor-active", (e, t) => wt.activeClass(e, t)), Handlebars.registerHelper("dice-cursor-color", (e, t) => wt.colorClass(e, t));
  }
  static async onReady() {
    await yc([
      "systems/mwd/templates/roll/parts/dice-cursor.hbs"
    ]);
  }
  static array(e, t) {
    if (e > t) throw `min>max: ${e} > ${t}`;
    return Array(t - e + 1).fill().map((i, a) => e + a);
  }
  static isActive(e, t) {
    return t <= e && e < 0 || 0 < e && e <= t;
  }
  static activeClass(e, t) {
    return wt.isActive(e, t) ? "active" : "inactive";
  }
  static fasClass(e, t) {
    const i = wt.isActive(e, t) ? qr.highlighted : qr.dimmed;
    return wt.$getFas(i, Math.abs(e));
  }
  static colorClass(e, t) {
    return e == 0 || !t ? e < 0 ? "fixed-dice-malus" : "fixed-dice-bonus" : e < 0 ? "variable-dice-malus" : "variable-dice-bonus";
  }
  static $getFas(e, t) {
    return e[t > 6 ? t % 6 : t];
  }
  static async diceCursor({ value: e, min: t, max: i, editable: a }) {
    return await bc("systems/mwd/templates/roll/parts/dice-cursor.hbs", {
      value: e,
      min: t,
      max: i,
      editable: a
    });
  }
}
const Ee = {
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
}, Vr = "anarchy-", po = `${T}.${Ee.ANARCHY_HACK}`, La = {
  id: T,
  name: "Standard Shadowrun Anarchy",
  hack: {
    checkbars: () => Je
  }
};
globalThis.ANARCHY_HOOKS = Ee;
globalThis.SETTING_KEY_ANARCHY_HACK = po;
globalThis.SHADOWRUN_ANARCHY_NO_HACK = La;
class ci {
  constructor() {
    this.hooks = [], this.hacks = {}, this.hackNames = {}, this.hookMethods = {}, this._register(Ee.ANARCHY_HACK), Hooks.on(Ee.ANARCHY_HACK, (e) => e(La)), Hooks.on("updateSetting", async (e, t, i, a) => this.onUpdateSetting(e, t, i, a)), Hooks.once("ready", () => this.onReady()), Hooks.on("getSceneControlButtons", (e) => {
      var i;
      if (!((i = game.user) != null && i.isGM)) return;
      const t = Array.isArray(e) ? e.find((a) => a.name === "notes") : e == null ? void 0 : e.notes;
      if (!t) {
        const a = Array.isArray(e) ? e.map((r) => r.name) : Object.keys(e ?? {});
        console.warn("MWD: token controls not found. Available:", a);
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
          var a, r;
          return (r = (a = game.mwd) == null ? void 0 : a.gmGadget) == null ? void 0 : r.call(a);
        }
      });
    });
  }
  async onReady() {
    Hooks.callAll(Ee.ANARCHY_HACK, (e) => {
      this.hacks[e.id] = e, this.hackNames[e.id] = e.name;
    }), game.settings.register(T, Ee.ANARCHY_HACK, {
      scope: "world",
      name: k.settings.anarchyHack.name,
      hint: k.settings.anarchyHack.hint,
      config: !0,
      default: La.id,
      choices: this.hackNames,
      type: String
    }), this.applySelectedAnarchyHack();
  }
  async onUpdateSetting(e, t, i, a) {
    e.key == po && this.applySelectedAnarchyHack();
  }
  applySelectedAnarchyHack() {
    const e = this.getSelectedHack();
    e && _.hackCheckbars(e.hack.checkbars());
  }
  selectHookMethod(e, t) {
    Hooks.callAll(t, (i, a) => {
      i == e && (this.hookMethods[t] = a);
    });
  }
  getSelectedHack() {
    return this.hacks[game.settings.get(T, Ee.ANARCHY_HACK)];
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
    ci.instance()._register(e);
  }
  _register(e) {
    if (console.log(ce + "HooksManager.register", e), !e.startsWith(Vr))
      throw `For safety Anarchy Hooks names must be prefixed by '${Vr}'`;
    this.hooks.push(e);
  }
}
const Kr = [
  S.itemType.assetModule,
  S.itemType.mechWeapon,
  S.itemType.personalWeapon,
  "weapon"
];
class Z {
  constructor() {
    this.modifiers = {
      groups: se.mapObjetToKeyValue(k.modifier.group, "key", "label"),
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
          label: k.modifier.group[e],
          effects: se.hbsAttributes.map((t) => ({ key: t.value, label: t.labelkey })),
          categories: []
        };
    }
    return {
      label: k.modifier.group[e],
      effects: se.mapObjetToKeyValue(k.modifier[e].effect, "key", "label"),
      categories: se.mapObjetToKeyValue(k.modifier[e].category, "key", "label")
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
    var i, a;
    switch (e) {
      case "group":
        return this.modifiers.groups;
      case "effect":
        return (i = this.modifiers[t.hash.group]) == null ? void 0 : i.effects;
      case "category":
        return (a = this.modifiers[t.hash.group]) == null ? void 0 : a.categories;
      case "subCategory":
        switch (t.hash.group) {
          case "roll":
            return this.getSelectRollSubCategories(t.hash.category);
          case "monitor": {
            switch (t.hash.category) {
              case "resistanceByType":
                return se.getDamageTypes().map((r) => ({ key: r.value, label: r.labelkey }));
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
        return se.getAttributes().map((i) => ({ key: i.value, label: i.labelkey }));
      case "skill":
        return game.system.anarchy.skills.getSkills().map((i) => ({ key: i.code, label: i.labelkey }));
      case "attributeAction":
        const t = Se.all().map((i) => ({ key: i.code, label: i.labelkey }));
        return Q.distinct(t.map((i) => i.key)).map((i) => t.find((a) => a.key == i));
    }
    return [];
  }
  getEnums() {
    return { modifiers: this.modifiers };
  }
  static buildRollModifiersFilter(e, t) {
    return (i) => {
      var a;
      if (i.group == "roll" && i.effect == t)
        switch (i.category) {
          case "attribute":
            return [e.attribute1, e.attribute2].includes(i.subCategory);
          case "skill":
            return i.subCategory == ((a = e.skill) == null ? void 0 : a.system.code);
          case "attributeAction":
            return i.subCategory == e.attributeAction || i.subCategory == Se.getDefenseAttributeAction(e.defenseAction);
        }
      return !1;
    };
  }
  static computeRollModifiers(e, t, i) {
    const a = Z.buildRollModifiersFilter(t, i), r = (c) => c.group == "roll" && c.effect == i && a(c), n = Z._activeItems(e).map((c) => Z.itemModifiers(c, r)).reduce((c, u) => c.concat(u), []).sort(Q.descending((c) => c.modifier.value)), o = Z.$sumAssetModuleModifiers(n.filter((c) => Kr.includes(c.item.type)).map((c) => c.modifier.value)), l = Q.sumValues(n.filter((c) => !Kr.includes(c.item.type)).map((c) => c.modifier.value));
    return {
      value: o + l,
      sources: n
    };
  }
  static $sumAssetModuleModifiers(e) {
    const t = e.find((r) => r > 3) ?? 0, i = Q.sumValues(e.filter((r) => r < 0)), a = Math.min(3, Q.sumValues(e.filter((r) => r > 0 && r <= 3)));
    return i + Math.max(a, t);
  }
  static computeModifiers(e, t, i = void 0, a = void 0) {
    const r = Z._createFilter(t, i, a), n = Z._activeItems(e).map((l) => Z.itemModifiers(l, r)).reduce((l, c) => l.concat(c), []);
    return {
      value: Q.sumValues(n, (l) => l.modifier.value),
      sources: n
    };
  }
  static sumMonitorModifiers(e, t, i, a = void 0) {
    return Z.sumModifiers(Z._activeItems(e), "monitor", t, i, a);
  }
  static sumModifiers(e, t, i, a, r = void 0) {
    const n = Z._createFilter(t, i, a, r), o = Z._activeItems(e).map((l) => Z.itemModifiers(l, n)).reduce((l, c) => l.concat(c), []);
    return Q.sumValues(o, (l) => l.modifier.value);
  }
  static _createFilter(e, t, i, a = void 0) {
    return (r) => r.group == e && r.effect == (t ?? r.effect) && r.category == (i ?? r.category) && (a == null ? !0 : r.subCategory == a);
  }
  static countModifiers(e, t, i = void 0, a = void 0) {
    const r = Z._createFilter(t, i, a);
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
const { loadTemplates: ca, renderTemplate: Lf } = foundry.applications.handlebars, le = {
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
}, Yr = 4, Sc = [
  // attribute1
  {
    code: "attribute1",
    options: {
      order: 1,
      category: le.pool,
      hbsTemplateRoll: `${G}/roll/parts/select-attribute.hbs`
    },
    condition: (s) => Object.values(xe.rollType).includes(s.mode),
    isUsed: (s) => !0,
    factory: (s) => {
      var t;
      const e = s.attribute1 ?? ((t = s.skill) == null ? void 0 : t.system.attribute);
      return {
        labelkey: e ? k.attributes[e] : k.attributes.noAttributes,
        value: s.actor.getAttributeValue(e, s.activeItem),
        flags: { editable: s.skill },
        selected: e,
        choices: se.getAttributes((i) => s.attributes.includes(i))
      };
    }
  },
  // attribute2
  {
    code: "attribute2",
    options: {
      order: 1,
      category: le.pool,
      hbsTemplateRoll: `${G}/roll/parts/select-attribute.hbs`,
      hbsTemplateChat: `${G}/chat/parts/pool-attribute2.hbs`
    },
    condition: (s) => [xe.rollType.attribute, xe.rollType.attributeAction, xe.rollType.defense].includes(s.mode),
    isUsed: (s) => s.used,
    onChecked: (s, e) => s.used = !!e,
    factory: (s) => {
      const e = s.attribute2;
      return {
        labelkey: e ? k.attributes[e] : k.attributes.noAttributes,
        value: s.actor.getAttributeValue(e, s.activeItem),
        flags: { editable: xe.rollType.attribute == s.mode },
        selected: e,
        choices: se.getAttributes((t) => s.attributes.includes(t))
      };
    }
  },
  // skill
  {
    code: "skill",
    options: {
      flags: {},
      order: 3,
      category: le.pool,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`
    },
    condition: (s) => ["skill", "weapon"].includes(s.mode),
    factory: (s) => {
      var t, i, a, r;
      const e = (t = s.actor) != null && t.getSkillRating ? s.actor.getSkillRating(s.skill) : ((a = (i = s.skill) == null ? void 0 : i.system) == null ? void 0 : a.value) ?? 0;
      return {
        label: (r = s.skill) == null ? void 0 : r.name,
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
      category: le.pool,
      hbsTemplateRoll: `${G}/roll/parts/check-option.hbs`
    },
    isUsed: (s) => s.used,
    condition: (s) => !!s.specialization,
    onChecked: (s, e) => {
      s.used = e, s.value = e ? 2 : 0;
    },
    factory: (s) => ({
      label: s.specialization,
      used: s.specialization != null,
      value: 2
    })
  },
  // credibility usage
  {
    code: "credibility",
    options: {
      flags: { editDice: !0, editable: !0 },
      order: 5,
      category: le.pool,
      value: 0,
      labelkey: k.common.roll.modifiers.social.credibility,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`
    },
    condition: (s) => {
      var e;
      return ((e = s.skill) == null ? void 0 : e.system.isSocial) && s.actor.getCredibilityValue() > 0;
    },
    factory: (s) => ({
      min: 0,
      max: s.actor.getCredibilityValue()
    })
  },
  // modifiers bonus
  {
    code: "poolModifiers",
    options: {
      flags: { editDice: !0, editable: !0 },
      labelkey: k.common.roll.modifiers.poolModifiers,
      order: 5,
      category: le.pool,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 4
    },
    factory: (s) => ii.computeRollModifiers(le.pool, s)
  },
  // wounds
  {
    code: "wounds",
    options: {
      flags: { optional: !0 },
      order: 10,
      category: le.pool,
      labelkey: k.common.roll.modifiers.wounds,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`
    },
    isUsed: (s) => s.used,
    condition: (s) => s.actor.getWounds(),
    onChecked: (s, e) => {
      s.used = e, s.value = e ? -s.wounds : 0;
    },
    factory: (s) => {
      const e = s.actor.getWounds();
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
      category: le.pool,
      value: 0,
      labelkey: k.common.roll.modifiers.other,
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
      category: le.glitch,
      value: 0,
      labelkey: k.common.roll.modifiers.glitch,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${G}/chat/parts/glitch.hbs`,
      min: 0,
      max: 5
    },
    isUsed: (s) => s.value > 0,
    factory: (s) => {
      const e = s.actor.getWounds(), t = ii.computeRollModifiers(le.glitch, s);
      return {
        value: (e == 0 ? 0 : 1) + (s.glitch ?? 0) + t.value
      };
    }
  },
  // social rumor
  {
    code: "rumor",
    options: {
      flags: { editDice: !0, editable: !0 },
      order: 50,
      category: le.glitch,
      value: 0,
      labelkey: k.common.roll.modifiers.social.rumor,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${G}/chat/parts/glitch.hbs`,
      min: 0,
      max: 1
    },
    condition: (s) => {
      var e;
      return ((e = s.skill) == null ? void 0 : e.system.isSocial) && s.actor.getRumorValue() > 0;
    },
    factory: (s) => ({
      max: s.actor.getRumorValue()
    })
  },
  // rerolls
  {
    code: "reroll",
    options: {
      flags: { editDice: !0, editable: !0 },
      order: 30,
      category: le.reroll,
      labelkey: k.common.roll.modifiers.reroll,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: Yr
    },
    factory: (s) => {
      const e = ii.computeRollModifiers(le.reroll, s), t = ii.computeRollModifiers(le.rerollMax, s);
      return foundry.utils.mergeObject(e, {
        max: Yr + Math.max(0, t.value ?? 0)
      });
    }
  },
  // reduction from opponent
  {
    code: "reduced",
    options: {
      order: 29,
      category: le.pool,
      labelkey: k.common.roll.modifiers.reduced,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 0
    },
    condition: (s) => {
      var e;
      return (((e = s.attackRoll) == null ? void 0 : e.param.opponentPool) ?? 0) != 0;
    },
    factory: (s) => {
      var t;
      const e = -(((t = s.attackRoll) == null ? void 0 : t.param.opponentPool) ?? 0);
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
      category: le.rerollForced,
      labelkey: k.common.roll.modifiers.rerollForced,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 0
    },
    factory: (s) => {
      var t;
      const e = ii.computeRollModifiers(le.successReroll, s);
      return e.value = -e.value - (((t = s.attackRoll) == null ? void 0 : t.param.opponentReroll) ?? 0), foundry.utils.mergeObject(e, {
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
      category: le.pool,
      value: 0,
      min: 0,
      max: 3,
      labelkey: k.common.roll.modifiers.anarchyDisposition,
      hbsTemplateRoll: `${G}/roll/parts/check-option.hbs`
    },
    isUsed: (s) => s.used,
    condition: (s) => s.actor.getAnarchyValue() > 0,
    onChecked: (s, e) => {
      s.used = e, s.value = e ? 3 : 0;
    }
  },
  // anarchy take risks
  {
    code: "anarchyRisk",
    options: {
      flags: { optional: !0, isAnarchy: !0, forceDisplay: !0 },
      order: 70,
      category: le.risk,
      value: 0,
      labelkey: k.common.roll.modifiers.anarchyRisk,
      hbsTemplateRoll: `${G}/roll/parts/check-option.hbs`,
      hbsTemplateChat: `${G}/chat/parts/anarchy-risk.hbs`
    },
    isUsed: (s) => s.used,
    condition: (s) => s.actor.getAnarchyValue() > 0,
    onChecked: (s, e) => {
      s.used = e, s.value = e ? 1 : 0;
    }
  },
  // edge
  {
    code: "edge",
    options: {
      flags: { optional: !0, forceDisplay: !0 },
      value: 0,
      order: 70,
      category: le.edge,
      labelkey: k.common.roll.modifiers.edge,
      hbsTemplateRoll: `${G}/roll/parts/check-option.hbs`
    },
    isUsed: (s) => s.used,
    condition: (s) => s.options.canUseEdge && s.actor.getRemainingEdge(),
    onChecked: (s, e) => {
      s.used = e, s.value = e ? 1 : 0;
    },
    factory: (s) => {
      var a;
      const t = [
        S.counters.edgePools.grit,
        S.counters.edgePools.chaos,
        S.counters.edgePools.insight,
        S.counters.edgePools.rumor,
        S.counters.edgePools.legend,
        S.counters.edgePools.credibility
      ].map((r) => {
        const n = s.actor.getEdgePoolValue(r);
        return {
          code: r,
          label: k.actor.counters.edgePools[r] ?? r,
          value: n
        };
      }), i = ((a = t.find((r) => r.value > 0)) == null ? void 0 : a.code) ?? S.counters.edgePools.grit;
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
      category: le.opponentPool,
      labelkey: k.common.roll.modifiers.opponentPool,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (s) => ii.computeRollModifiers(le.opponentPool, s),
    condition: (s) => !s.attributeAction
  },
  // force opponent rerolls
  {
    code: "opponentReroll",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: le.opponentReroll,
      value: 0,
      labelkey: k.common.roll.modifiers.opponentReroll,
      hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (s) => ii.computeRollModifiers(le.opponentReroll, s),
    condition: (s) => !s.attributeAction
  }
];
class ii {
  constructor() {
    this.registeredParameters = {}, ci.register(Ee.REGISTER_ROLL_PARAMETERS), ci.register(Ee.MODIFY_ROLL_PARAMETER), Hooks.on(Ee.MODIFY_ROLL_PARAMETER, (e) => this._validate(e)), Hooks.once(Ee.REGISTER_ROLL_PARAMETERS, (e) => Sc.forEach(
      (t) => e(t)
    )), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(Ee.REGISTER_ROLL_PARAMETERS, async (t) => {
      Hooks.callAll(Ee.MODIFY_ROLL_PARAMETER, t), t.ignore || await this._register(t);
    });
    const e = Q.distinct([].concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateRoll)).concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateChat)).filter((t) => typeof t == "string" && t.length > 0));
    await ca(Q.distinct(e)), await ca([`${G}/roll/parts/parameter-label.hbs`]);
  }
  _validate(e) {
    e.code || (console.error(`${ce} RollParameter does not have a code`, e), e.ignore = !0);
  }
  async _register(e) {
    if (this.registeredParameters[e.code]) {
      console.error(`${ce} RollParameter ${e.code} is already registered`, e);
      return;
    }
    e.onChecked || (e.onChecked = (t, i) => t.used = i), e.onValue = (t, i) => t.value = i, this.registeredParameters[e.code] = e;
  }
  async _optionalLoadTemplate(e) {
    e && await ca([e]);
  }
  build(e) {
    return Object.values(this.registeredParameters).filter((t) => !t.condition || t.condition(e)).map((t) => this._computeParameter(t, e));
  }
  compute(e) {
    const t = e.filter((r) => this.isParameterUsed(r)), i = Q.classify(t, (r) => r.category), a = {};
    return Object.values(i).forEach((r) => a[r[0].category] = Q.sumValues(r, (n) => n.value ?? (n.optional ? 1 : 0))), a;
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
    }, a = t.actor.items.filter(i);
    return Z.computeRollModifiers(a, t, e);
  }
}
const { ApplicationV2: Ac, HandlebarsApplicationMixin: wc } = foundry.applications.api, { loadTemplates: Tc, renderTemplate: kc } = foundry.applications.handlebars;
var Hs, fo;
const Ne = class Ne extends wc(Ac) {
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
    await Tc([
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
    const i = foundry.utils.mergeObject(Ne.prepareActorRoll(e), {
      mode: xe.rollType.attribute,
      attribute1: t
    });
    await Ne.create(i);
  }
  static async rollAttributeAction(e, t) {
    const i = foundry.utils.mergeObject(Ne.prepareActorRoll(e), {
      mode: xe.rollType.attributeAction,
      attributeAction: t.code,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e)
    });
    await Ne.create(i);
  }
  static async rollSkill(e, t, i) {
    const a = foundry.utils.mergeObject(Ne.prepareActorRoll(e), {
      mode: xe.rollType.skill,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? S.actorAttributes.reflexes,
      specialization: i
    });
    await Ne.create(a);
  }
  static async rollWeapon(e, t, i, a) {
    const r = foundry.utils.mergeObject(Ne.prepareActorRoll(e), {
      mode: xe.rollType.weapon,
      weapon: i,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? e.getPhysicalAgility(),
      specialization: void 0,
      targeting: a
    });
    await Ne.create(r);
  }
  static async rollDefense(e, t, i) {
    const a = foundry.utils.mergeObject(Ne.prepareActorRoll(e), {
      mode: xe.rollType.defense,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e),
      defenseAction: t.code,
      attackRoll: i.attackRoll,
      tokenId: i.defenderTokenId,
      choiceChatMessageId: i.choiceChatMessageId
    });
    await Ne.create(a);
  }
  static async itemAttributeRoll(e, t) {
    const i = foundry.utils.mergeObject(Ne.prepareActorRoll(e.actor), {
      mode: xe.rollType.attribute,
      item: e,
      attribute1: t,
      attributes: e.actor.getUsableAttributes(e)
    });
    await Ne.create(i);
  }
  static async create(e) {
    var n;
    const t = M(n = Ne, Hs, fo).call(n, e), i = await kc(`${G}/roll/roll-dialog-title.hbs`, t), a = {
      id: `roll-dialog-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Ne.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new Ne({ roll: t }, a).render({ force: !0 });
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
      const a = this._getRollParameter(i), r = this._getEventItem(i, this.roll.actor), n = i.currentTarget.value, o = this.roll.actor.getAttributeValue(n, r);
      this.roll[a.code] = n, await this._setParameterSelectedOption(a, n, o);
    }), this.html.find(".check-optional").click(async (i) => {
      const a = this._getRollParameter(i);
      a.onChecked(a, i.currentTarget.checked), a.category == le.pool && await this._updateParameterValue(a, a.value), a.code == "edge" && this.html.find(`.parameter[data-parameter-code='${a.code}'] .edge-pool-select`).prop("disabled", !a.used);
    }), this.activateDiceParameterClick(), this.html.find("input.parameter-value:not(:disabled)").on("input", async (i) => {
      const a = this._getRollParameter(i), r = Number.parseInt(i.currentTarget.value) ?? 0;
      await this._updateParameterValue(a, r);
    }), this.html.find(".select-option-parameter").change(async (i) => {
      const a = this._getRollParameter(i), r = i.currentTarget.value, n = Number.parseInt(r);
      await this._setParameterSelectedOption(a, r, n);
    }), this.html.find(".edge-pool-select").change(async (i) => {
      const a = this._getRollParameter(i);
      a.pool = i.currentTarget.value;
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
        const a = Number.parseInt(this.html.find(e.currentTarget).attr("data-dice")) ?? 0, r = t.value != a || a == 0 ? a : a > 0 ? a - 1 : a + 1;
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
    return await wt.diceCursor({
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
Hs = new WeakSet(), fo = function(e) {
  const t = game.system.anarchy.rollParameters.build(e).sort(Q.ascending((i) => i.order ?? 200));
  return foundry.utils.mergeObject(e, {
    ENUMS: se.getEnums((i) => e.attributes.includes(i)),
    ANARCHY: k,
    parameters: t
  });
}, be(Ne, Hs), N(Ne, "PARTS", {
  body: {
    template: `${G}/roll/roll-dialog.hbs`
  }
});
let ut = Ne;
const wr = 2, $a = "skillSpecializationCatalog", vc = [
  { key: "running", label: "Running" },
  { key: "jumping", label: "Jumping" },
  { key: "swimming", label: "Swimming" },
  { key: "climbing", label: "Climbing" },
  { key: "acrobatics", label: "Acrobatics" }
], ho = /* @__PURE__ */ new Set(), ht = [
  // Strength
  { code: "athletics", label: "Athletics", attribute: "strength", icon: `${X}/athletics.svg`, domains: ["physical"], specializations: vc },
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
].map(Mc);
for (const s of ht)
  ho.add(s.code);
function Mc(s) {
  return {
    ...s,
    label: s.label ?? s.code,
    icon: s.icon ?? `${rs}/icons/skills/skills.svg`,
    specializations: kr(s.specializations)
  };
}
function Tr(s) {
  return String(s ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function kr(s = []) {
  const e = /* @__PURE__ */ new Set();
  return (Array.isArray(s) ? s : []).map((t) => {
    const i = Tr((t == null ? void 0 : t.key) ?? (t == null ? void 0 : t.label) ?? t);
    return !i || e.has(i) ? null : (e.add(i), {
      key: i,
      label: String((t == null ? void 0 : t.label) ?? (t == null ? void 0 : t.key) ?? t ?? i).trim() || i
    });
  }).filter(Boolean);
}
function Ec(s = []) {
  const e = new Error(s[0] ?? "Invalid skill specialization data.");
  return e.validationErrors = s, e;
}
function Cc() {
  const s = {};
  for (const e of ht) {
    const t = (Array.isArray(e.specializations) ? e.specializations : []).map((i) => String((i == null ? void 0 : i.label) ?? "").trim()).filter(Boolean);
    t.length && (s[e.code] = t);
  }
  return s;
}
const Pc = Object.freeze(Cc());
function Nc(s, e = [], { strict: t = !1, errors: i = [] } = {}) {
  var r, n;
  if (!Array.isArray(e)) {
    if (t) {
      const o = ((r = xa(s)) == null ? void 0 : r.label) ?? s;
      i.push(`${o}: expected an array of specialization labels.`);
    }
    return [];
  }
  const a = [];
  for (const o of e) {
    const l = String(o ?? "").trim();
    if (!l) {
      if (t) {
        const c = ((n = xa(s)) == null ? void 0 : n.label) ?? s;
        i.push(`${c}: specialization labels cannot be blank.`);
      }
      continue;
    }
    a.push(l);
  }
  return kr(a).map((o) => o.label);
}
function xa(s) {
  return ht.find((e) => e.code === s);
}
function go(s, { strict: e = !1 } = {}) {
  const t = s && typeof s == "object" && !Array.isArray(s) ? s : {}, i = [], a = {};
  for (const [r, n] of Object.entries(t)) {
    if (!ho.has(r)) {
      e && i.push(`Unknown skill code "${r}".`);
      continue;
    }
    const o = Nc(r, n, { strict: e, errors: i });
    o.length && (a[r] = o);
  }
  if (e && i.length) throw Ec(i);
  return Object.fromEntries(
    ht.map((r) => [r.code, a[r.code]]).filter(([, r]) => Array.isArray(r) && r.length)
  );
}
function Rc() {
  var s, e, t;
  try {
    if ((t = (e = (s = game == null ? void 0 : game.settings) == null ? void 0 : s.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${$a}`))
      return game.settings.get(T, $a);
  } catch {
  }
  return So();
}
function yo() {
  const s = go(Rc(), { strict: !1 });
  return Object.fromEntries(
    Object.entries(s).map(([e, t]) => [
      e,
      kr(t)
    ])
  );
}
function bo(s = [], { allowedKeys: e = null } = {}) {
  const t = /* @__PURE__ */ new Set();
  return (Array.isArray(s) ? s : []).map((i) => Tr(i)).filter((i) => !i || t.has(i) || e && !e.has(i) ? !1 : (t.add(i), !0));
}
function at(s) {
  const e = xa(s);
  if (e)
    return {
      ...e,
      specializations: di(e.code)
    };
}
function Ls() {
  const s = yo();
  return [...ht].map((e) => ({
    ...e,
    specializations: [...s[e.code] ?? []]
  })).sort((e, t) => e.label.localeCompare(t.label));
}
function di(s) {
  return [...yo()[s] ?? []];
}
function vr(s, e) {
  const t = Tr(e);
  if (t)
    return di(s).find((i) => i.key === t);
}
function Dc(s, e) {
  var t;
  return ((t = vr(s, e)) == null ? void 0 : t.label) ?? "";
}
function So() {
  return foundry.utils.deepClone(Pc);
}
function Vs(s, { strict: e = !1 } = {}) {
  return go(s, { strict: e });
}
function $s(s = []) {
  return bo(s);
}
function Ic(s, e = []) {
  const t = new Set(di(s).map((a) => a.key)), i = new Set(bo(e, { allowedKeys: t }));
  return di(s).filter((a) => i.has(a.key)).map((a) => a.key);
}
function Ba(s, e) {
  var t, i;
  return $s(
    ((i = (t = s == null ? void 0 : s.skills) == null ? void 0 : t[e]) == null ? void 0 : i.specializations) ?? []
  );
}
function Ks(s, e) {
  return Ic(
    e,
    Ba(s, e)
  );
}
function Ao(s, e) {
  const t = new Set(Ks(s, e));
  return di(e).filter((i) => t.has(i.key));
}
function Oc(s) {
  const e = Math.ceil(s.length / 2);
  return { left: s.slice(0, e), right: s.slice(e) };
}
function _c(s) {
  var e, t;
  s.skills ?? (s.skills = {});
  for (const i of ht) {
    const a = (e = s.skills)[t = i.code] ?? (e[t] = {});
    a.rating == null && (a.rating = 0), a.bonus == null && (a.bonus = 0), a.specializations = $s(a.specializations);
  }
}
function wo(s, { bonusBySkill: e = null } = {}) {
  const t = Ls(), { left: i, right: a } = Oc(t), r = (n) => {
    var y, b, A, w, E, I;
    const o = n.code, l = n.attribute, c = Number(((b = (y = s == null ? void 0 : s.skills) == null ? void 0 : y[o]) == null ? void 0 : b.rating) ?? 0), u = Number(((w = (A = s == null ? void 0 : s.attributes) == null ? void 0 : A[l]) == null ? void 0 : w.value) ?? 0), d = Number(((I = (E = s == null ? void 0 : s.skills) == null ? void 0 : E[o]) == null ? void 0 : I.bonus) ?? 0), m = Number((e == null ? void 0 : e[o]) ?? 0), f = d + m, p = Ao(s, o), h = di(o).filter((D) => !p.some((L) => L.key === D.key)), g = u + c + f;
    return {
      code: o,
      label: n.label,
      icon: n.icon,
      attribute: l,
      attributeLabel: se != null && se.localizeAttribute ? se.localizeAttribute(l) : l,
      rating: c,
      base: u,
      bonus: f,
      total: g,
      rollPayload: JSON.stringify({ intent: "skill", key: o }),
      canAddSpecialization: h.length > 0,
      specializations: p.map((D) => ({
        ...D,
        bonus: wr,
        rollPayload: JSON.stringify({
          intent: "skill",
          key: o,
          specializationKey: D.key,
          specializationLabel: D.label
        })
      })),
      // Input wiring paths (so templates don’t concat strings themselves)
      pathRating: `system.skills.${o}.rating`,
      pathBonus: `system.skills.${o}.bonus`
    };
  };
  return {
    left: i.map(r),
    right: a.map(r)
  };
}
const Lc = /* @__PURE__ */ new Set(["overloaded"]);
function Qr(s) {
  return s ? (s == null ? void 0 : s.document) ?? s : null;
}
function $c(s, e) {
  var i, a, r;
  if (!s) return null;
  const t = Qr(e) ?? Qr(s == null ? void 0 : s.token);
  return t ? t.isLinked ? t.baseActor ?? ((r = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : r.call(i, ((a = t == null ? void 0 : t.baseActor) == null ? void 0 : a.id) ?? "")) ?? t.actor ?? s : t.actor ?? s : s;
}
function To(s) {
  const e = String(s ?? "").trim();
  if (!e) return "Status";
  const a = (e.includes(".") ? e.split(".").at(-1) : e).replace(/^status/i, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return a ? a.replace(/\b\w/g, (r) => r.toUpperCase()) : e;
}
function xc(s) {
  const e = String((s == null ? void 0 : s.name) ?? (s == null ? void 0 : s.label) ?? (s == null ? void 0 : s.id) ?? "Status").trim();
  return e ? To(e) : "Status";
}
function Bc(s) {
  const e = typeof (s == null ? void 0 : s.img) == "string" ? s.img.trim() : "";
  if (e) return e;
  const t = s ? Object.getOwnPropertyDescriptor(s, "icon") : null;
  return "value" in (t ?? {}) ? String(t.value ?? "").trim() : "";
}
function xs(s, e) {
  var t, i, a, r, n, o;
  return e === "overloaded" ? !!((i = (t = s == null ? void 0 : s.system) == null ? void 0 : t.burn) != null && i.overloaded) || !!((r = (a = s == null ? void 0 : s.statuses) == null ? void 0 : a.has) != null && r.call(a, e)) : ((o = (n = s == null ? void 0 : s.statuses) == null ? void 0 : n.has) == null ? void 0 : o.call(n, e)) ?? !1;
}
function Mr(s) {
  const e = /* @__PURE__ */ new Set();
  return (CONFIG.statusEffects ?? []).filter((t) => {
    const i = String((t == null ? void 0 : t.id) ?? "").trim();
    return !i || e.has(i) ? !1 : (e.add(i), !0);
  }).map((t) => {
    const i = String(t.id).trim();
    return {
      id: i,
      label: xc(t),
      icon: Bc(t),
      active: xs(s, i),
      managed: Lc.has(i)
    };
  }).sort((t, i) => t.active !== i.active ? t.active ? -1 : 1 : t.label.localeCompare(i.label));
}
function Fc(s) {
  if (!s.length)
    return "<p>No token statuses are configured.</p>";
  const e = foundry.utils.escapeHTML;
  return `
    <div class="mwd-token-status-dialog">
      <p style="margin-top: 0;">Toggle the statuses shown on this token.</p>
      <div style="display: grid; gap: 0.2rem; max-height: 20rem; overflow-y: auto; padding-right: 0.25rem;">
        ${s.map((i) => {
    const a = i.active ? "checked" : "", r = i.icon ? `<img src="${e(i.icon)}" alt="" width="20" height="20" style="flex: 0 0 20px; border: 0;" />` : "", n = i.managed ? '<small style="opacity: 0.7;">Managed by system state</small>' : "";
    return `
      <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.2rem 0;">
        <input type="checkbox" name="status" value="${e(i.id)}" ${a} />
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
async function zc({ actor: s, effects: e, selectedStatusIds: t }) {
  const i = new Set(t);
  for (const a of e) {
    const r = i.has(a.id);
    await ko({ actor: s, statusId: a.id, active: r });
  }
}
async function ko({ actor: s, statusId: e, active: t }) {
  if (!s || !e) return !1;
  const i = xs(s, e);
  return !!t === i ? !1 : e === "overloaded" ? (await s.update({ "system.burn.overloaded": !!t }), !0) : (await s.toggleStatusEffect(e, { active: !!t, overlay: !1 }), !0);
}
async function Wc({ actor: s, token: e } = {}) {
  var a;
  if (!s || !e) return !1;
  const t = $c(s, e), i = Mr(t);
  return i.length ? foundry.applications.api.DialogV2.wait({
    window: {
      title: `Token Statuses: ${e.name ?? s.name ?? "Token"}`
    },
    position: {
      width: 420
    },
    content: Fc(i),
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
            return await zc({ actor: t, effects: i, selectedStatusIds: c }), !0;
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
  }) : ((a = ui.notifications) == null || a.warn("No token statuses are configured."), !1);
}
const Hc = Object.freeze({
  STR: jt.strength,
  REF: jt.reflexes,
  WIL: jt.willpower,
  INT: jt.intelligence,
  CHA: jt.charisma
}), Uc = Object.freeze({
  STR: "Strength",
  REF: "Reflexes",
  WIL: "Willpower",
  INT: "Intelligence",
  CHA: "Charisma"
}), jc = Object.freeze({
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
function Er(s) {
  const e = String(s ?? "").trim();
  return e ? jc[e] ?? null : null;
}
function Gc(s) {
  const e = Er(s);
  return e ? {
    intent: "common",
    id: e.id
  } : null;
}
function qc(s) {
  return Hc[String(s ?? "").trim().toUpperCase()] ?? null;
}
function Vc(s) {
  return Uc[String(s ?? "").trim().toUpperCase()] ?? String(s ?? "").trim().toUpperCase();
}
function Kc(s = []) {
  return (Array.isArray(s) ? s : []).map((e) => String(e ?? "").trim().toUpperCase()).filter(Boolean).join(" + ");
}
const Cr = Object.freeze([
  { value: "positive", label: "Positive" },
  { value: "negative", label: "Negative" },
  { value: "narrative", label: "Narrative" }
]), Pr = Object.freeze([
  { value: "minor", label: "Minor" },
  { value: "major", label: "Major" }
]), vo = Object.freeze([
  { value: "passive", label: "Passive" },
  { value: "triggered", label: "Triggered" }
]), Mo = Object.freeze([
  { value: "rollMod", label: "Roll Modifier" },
  { value: "burnAdjust", label: "Burn Adjust" },
  { value: "actionCostMod", label: "Action Cost Mod" },
  { value: "initiativeMod", label: "Initiative Mod" },
  { value: "damageMod", label: "Damage Intake Mod" },
  { value: "edgeEvent", label: "Edge Event" }
]), Eo = Object.freeze([
  { value: "onBuildRoll", label: "Build Roll" },
  { value: "onBeforeBurnApplied", label: "Before Burn Applied" },
  { value: "onBeforeActionCostFinalized", label: "Before Action Cost Finalized" },
  { value: "onInitiativeResolved", label: "Initiative Resolved" },
  { value: "onDamageResolved", label: "Damage Resolved" },
  { value: "onEndOfActivation", label: "End of Activation" },
  { value: "onEdgeSpend", label: "Edge Spend" },
  { value: "onEdgeGain", label: "Edge Gain" }
]), Nr = Object.freeze([
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
]), Co = Object.freeze([
  { value: "adjustAmount", label: "Adjust Amount" },
  { value: "grantPool", label: "Grant Pool" }
]), Yc = new Set(Cr.map((s) => s.value)), Qc = new Set(Pr.map((s) => s.value)), Jc = new Set(vo.map((s) => s.value)), Xc = new Set(Mo.map((s) => s.value)), Po = new Set(Eo.map((s) => s.value)), Zc = new Set(Nr.map((s) => s.value)), eu = new Set(Co.map((s) => s.value));
function ee(s, e = "") {
  return String(s ?? "").trim() || e;
}
function ae(s, e = 0) {
  const t = Number(s);
  return Number.isFinite(t) ? t : e;
}
function Bs(s) {
  return foundry.utils.deepClone(s);
}
function No(s = []) {
  return (Array.isArray(s) ? s : typeof s == "string" ? s.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function tu(s) {
  if (typeof s != "string") return s;
  const e = s.trim();
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
function ua(s) {
  const e = Math.max(0, Math.trunc(ae(s, 0)));
  return e > 0 ? e : 0;
}
function Yt(s = {}) {
  const e = s && typeof s == "object" ? s : {};
  return {
    perActivation: ua(e.perActivation),
    perRound: ua(e.perRound),
    perScene: ua(e.perScene)
  };
}
function iu(s = {}) {
  const e = s && typeof s == "object" ? s : {}, t = {
    id: ee(e.id, foundry.utils.randomID()),
    fact: ee(e.fact)
  }, i = Nr.find((r) => e[r.value] !== void 0 && e[r.value] !== null), a = (i == null ? void 0 : i.value) ?? (Zc.has(String(e.comparator ?? "").trim()) ? String(e.comparator).trim() : "eq");
  return t.comparator = a, a !== "truthy" && a !== "falsy" && (t.value = tu(e[a] ?? e.value ?? "")), t;
}
function Tt(s = []) {
  return (Array.isArray(s) ? s : []).map(iu);
}
function su(s = {}) {
  const e = s && typeof s == "object" ? s : {}, t = Xc.has(String(e.type ?? "").trim()) ? String(e.type).trim() : "rollMod", i = au(t), a = Po.has(String(e.phase ?? "").trim()) ? String(e.phase).trim() : i, r = eu.has(String(e.operation ?? "").trim()) ? String(e.operation).trim() : "adjustAmount";
  return {
    id: ee(e.id, foundry.utils.randomID()),
    type: t,
    phase: a,
    selector: ee(e.selector),
    skillKeys: No(e.skillKeys),
    label: ee(e.label),
    value: ae(e.value, 0),
    min: e.min === void 0 || e.min === null || e.min === "" ? null : ae(e.min, 0),
    max: e.max === void 0 || e.max === null || e.max === "" ? null : ae(e.max, 0),
    pool: ee(e.pool),
    operation: r,
    conditions: Tt(e.conditions),
    limit: Yt(e.limit)
  };
}
function Ro(s = {}) {
  const e = ee(s == null ? void 0 : s.selector);
  return e === "intent.skill" || e.startsWith("intent.skill.");
}
function si(s = []) {
  return (Array.isArray(s) ? s : []).map(su).filter((t) => t.phase && t.type);
}
function tt(s = {}) {
  const e = s && typeof s == "object" ? Bs(s) : {}, t = e.positive === !1 ? "negative" : "positive", i = Yc.has(String(e.category ?? "").trim()) ? String(e.category).trim() : t, a = Qc.has(String(e.tier ?? "").trim()) ? String(e.tier).trim() : "minor", r = Jc.has(String(e.activation ?? "").trim()) ? String(e.activation).trim() : "passive";
  return {
    ...e,
    positive: i === "positive",
    category: i,
    tier: a,
    activation: r,
    tags: No(e.tags),
    effects: si(e.effects),
    prerequisites: Tt(e.prerequisites),
    limits: Yt(e.limits)
  };
}
function Do() {
  return {
    categories: [...Cr],
    tiers: [...Pr],
    activations: [...vo],
    effectTypes: [...Mo],
    phases: [...Eo],
    comparators: [...Nr],
    edgeOperations: [...Co]
  };
}
function vs(s = "") {
  var e;
  return ((e = Cr.find((t) => t.value === s)) == null ? void 0 : e.label) ?? "Positive";
}
function Ms(s = "") {
  var e;
  return ((e = Pr.find((t) => t.value === s)) == null ? void 0 : e.label) ?? "Minor";
}
function au(s = "") {
  switch (s) {
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
function ru(s) {
  return Array.from((s == null ? void 0 : s.items) ?? []).filter((e) => ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === "quality").map((e) => ({
    item: e,
    system: tt(e.system ?? {})
  }));
}
function nu(s = {}, e = {}) {
  const t = Yt(s), i = Yt(e);
  return {
    perActivation: i.perActivation || t.perActivation,
    perRound: i.perRound || t.perRound,
    perScene: i.perScene || t.perScene
  };
}
function Io(s = {}) {
  var a, r, n;
  const e = ee(s.combatId ?? ((a = s.combat) == null ? void 0 : a.id)), t = Math.max(0, Math.trunc(ae(s.round ?? ((r = s.combat) == null ? void 0 : r.round), 0))), i = ee(s.sceneId ?? ((n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.id));
  return {
    activationKey: ee(s.activationKey),
    roundKey: e ? `${e}:${t}` : "",
    sceneKey: i
  };
}
function ou(s, e = {}) {
  var r, n, o, l;
  const t = ((r = s == null ? void 0 : s.flags) == null ? void 0 : r[T]) ?? {}, i = ((n = t == null ? void 0 : t.traitUsage) == null ? void 0 : n.scene) ?? {}, a = e.state ?? {};
  return {
    activation: ((o = a == null ? void 0 : a.traitUsage) == null ? void 0 : o.activation) ?? {},
    round: ((l = a == null ? void 0 : a.traitUsage) == null ? void 0 : l.round) ?? {},
    scene: i
  };
}
function lu(s, e, t, i) {
  var a, r, n, o, l;
  switch (t) {
    case "perActivation":
      return Math.max(0, Math.trunc(ae((a = s.activation) == null ? void 0 : a[i], 0)));
    case "perRound":
      return Math.max(0, Math.trunc(ae((n = (r = s.round) == null ? void 0 : r[e.roundKey]) == null ? void 0 : n[i], 0)));
    case "perScene":
      return Math.max(0, Math.trunc(ae((l = (o = s.scene) == null ? void 0 : o[e.sceneKey]) == null ? void 0 : l[i], 0)));
    default:
      return 0;
  }
}
function cu(s, e, t, i) {
  const a = [];
  for (const r of ["perActivation", "perRound", "perScene"]) {
    const n = Math.max(0, Math.trunc(ae(t == null ? void 0 : t[r], 0)));
    if (!n) continue;
    lu(s, e, r, i) >= n && a.push(`${r} limit reached`);
  }
  return a;
}
function uu(s, e, t) {
  switch (e) {
    case "truthy":
      return !!s;
    case "falsy":
      return !s;
    case "neq":
      return s !== t;
    case "gt":
      return Number(s) > Number(t);
    case "gte":
      return Number(s) >= Number(t);
    case "lt":
      return Number(s) < Number(t);
    case "lte":
      return Number(s) <= Number(t);
    case "includes":
      return Array.isArray(s) ? s.includes(t) : String(s ?? "").includes(String(t ?? ""));
    case "notIncludes":
      return Array.isArray(s) ? !s.includes(t) : !String(s ?? "").includes(String(t ?? ""));
    case "eq":
    default:
      return s === t;
  }
}
function Jr(s, e) {
  if (!ee(s == null ? void 0 : s.fact)) return !0;
  const t = foundry.utils.getProperty(e, s.fact);
  return uu(t, s.comparator, s.value);
}
function du(s = "", e = {}) {
  const t = ee(s);
  return t ? (Array.isArray(e == null ? void 0 : e.selectors) ? e.selectors : []).some(
    (a) => a === t || a.startsWith(`${t}.`)
  ) : !0;
}
function Oo(s, e) {
  return `${s.id}:${e.id}`;
}
function mu(s, e) {
  var t;
  return !!((t = s.system) != null && t.inactive) || !!(e != null && e.inactive);
}
function Xr(s = []) {
  return s.map((e) => e.fact).filter(Boolean).join(", ");
}
function Si(s, e, t) {
  const i = ae(s[e], 0);
  let a = i;
  return typeof t.value == "number" && (a += t.value), typeof t.min == "number" && (a = Math.max(t.min, a)), typeof t.max == "number" && (a = Math.min(t.max, a)), s[e] = a, a - i;
}
function Wt(s, e, t, i, a) {
  i && s.push({
    id: `trait:${a}:${e.id}:${t.id}`,
    label: t.label || e.name,
    value: i,
    source: e.name,
    traitItemId: e.id,
    traitEffectId: t.id
  });
}
function pu({ item: s, effect: e, phase: t, packet: i, result: a }) {
  switch (e.type) {
    case "rollMod": {
      const r = ae(e.value, 0);
      return Wt(a.modifiers, s, e, r, t), r;
    }
    case "burnAdjust": {
      if (t === "onEndOfActivation") {
        const n = Si(i, "burnDelta", e);
        return Wt(a.modifiers, s, e, n, t), n;
      }
      const r = Si(i, "amount", e);
      return Wt(a.modifiers, s, e, r, t), r;
    }
    case "actionCostMod": {
      const r = Si(i, "cost", e);
      return Wt(a.modifiers, s, e, r, t), r;
    }
    case "initiativeMod": {
      const r = Si(i, "total", e);
      return Wt(a.modifiers, s, e, r, t), r;
    }
    case "damageMod": {
      const r = Si(i, "amount", e);
      return Wt(a.modifiers, s, e, r, t), r;
    }
    case "edgeEvent": {
      if (t === "onEndOfActivation" && e.operation === "grantPool" && e.pool)
        return i.edgeAdjustments ?? (i.edgeAdjustments = []), i.edgeAdjustments.push({
          poolKey: e.pool,
          amount: ae(e.value, 0),
          label: e.label || s.name,
          source: s.name
        }), Wt(a.modifiers, s, e, ae(e.value, 0), t), ae(e.value, 0);
      const r = Si(i, "amount", e);
      return Wt(a.modifiers, s, e, r, t), r;
    }
    default:
      return 0;
  }
}
function fu(s, e, t) {
  const i = Oo(s, e), a = [];
  return t.perActivation > 0 && a.push({ kind: "usage", scope: "perActivation", key: i, delta: 1 }), t.perRound > 0 && a.push({ kind: "usage", scope: "perRound", key: i, delta: 1 }), t.perScene > 0 && a.push({ kind: "usage", scope: "perScene", key: i, delta: 1 }), a;
}
function hu(s = "") {
  const e = ee(s);
  return e ? [`action.${e}`] : [];
}
function hi(s, e = {}) {
  var r, n, o, l;
  const t = e.snapshot ?? null, i = e.state ?? (t == null ? void 0 : t.state) ?? {};
  return {
    activation: {
      moved: (Array.isArray(i == null ? void 0 : i.actionLog) ? i.actionLog.map((c) => ee(c == null ? void 0 : c.id)).filter(Boolean) : []).includes("move"),
      saSpent: Math.max(0, Math.trunc(ae(i == null ? void 0 : i.saSpentThisActivation, 0))),
      attacksThisActivation: Math.max(0, Math.trunc(ae(i == null ? void 0 : i.attacksThisActivation, 0))),
      burnThisActivation: Math.max(0, Math.trunc(ae(i == null ? void 0 : i.burnThisActivation, 0)))
    },
    burn: {
      current: Math.max(0, Math.trunc(ae((n = (r = s == null ? void 0 : s.system) == null ? void 0 : r.burn) == null ? void 0 : n.value, 0))),
      overloaded: !!((l = (o = s == null ? void 0 : s.system) == null ? void 0 : o.burn) != null && l.overloaded)
    },
    timing: {
      firstAttackThisActivation: Math.max(0, Math.trunc(ae(i == null ? void 0 : i.attacksThisActivation, 0))) === 0,
      firstExtraSAThisActivation: Math.max(0, Math.trunc(ae(i == null ? void 0 : i.saSpentThisActivation, 0))) <= 3
    },
    selectors: []
  };
}
function Rr({ actor: s, resolved: e, payload: t, runtime: i = {} } = {}) {
  var d, m, f, p, h, g, y, b, A, w, E, I;
  const a = hi(s, i), r = ee((e == null ? void 0 : e.intent) ?? (t == null ? void 0 : t.intent), "skill"), n = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [], o = ee(((d = e == null ? void 0 : e.attack) == null ? void 0 : d.rangeBand) ?? (t == null ? void 0 : t.rangeBand)), l = ee(((f = (m = t == null ? void 0 : t.edge) == null ? void 0 : m.pre) == null ? void 0 : f.poolKey) ?? ((p = t == null ? void 0 : t.edge) == null ? void 0 : p.poolKey) ?? ""), c = ee(
    ((h = e == null ? void 0 : e.data) == null ? void 0 : h.skillKey) ?? ((g = e == null ? void 0 : e.specialization) == null ? void 0 : g.skillKey) ?? (r === "skill" ? t == null ? void 0 : t.key : "")
  ), u = ee(
    ((A = (b = (y = e == null ? void 0 : e.breakdown) == null ? void 0 : y.find) == null ? void 0 : b.call(y, (D) => (D == null ? void 0 : D.id) === "skill")) == null ? void 0 : A.label) ?? (e == null ? void 0 : e.title)
  );
  return a.intent = r, a.domains = n, a.rangeBand = o, a.skill = {
    key: c,
    label: u
  }, a.edge = {
    stage: (w = t == null ? void 0 : t.toggles) != null && w.useEdge ? "pre" : "",
    pool: l,
    spent: !!((E = t == null ? void 0 : t.toggles) != null && E.useEdge)
  }, a.selectors.push(`intent.${r}`), n.forEach((D) => a.selectors.push(`domain.${D}`)), o && a.selectors.push(`range.${o}`), r === "skill" && c && a.selectors.push(`skill.${c}`), (I = t == null ? void 0 : t.toggles) != null && I.useEdge && a.selectors.push("edge.pre"), a;
}
function _o({ actor: s, packet: e = {}, runtime: t = {} } = {}) {
  const i = hi(s, t);
  return i.action = {
    id: ee(e.actionId),
    resource: ee(e.resource),
    cost: ae(e.cost, 0)
  }, i.selectors.push(...hu(e.actionId)), i;
}
function Fa({ actor: s, packet: e = {}, runtime: t = {} } = {}) {
  const i = hi(s, t);
  return i.action = {
    id: ee(e.actionId),
    resource: ee(e.resource)
  }, i.burn = {
    ...i.burn,
    amount: ae(e.amount, 0),
    source: ee(e.source)
  }, e.source === "extraSA" && e.extraSaIndex === 1 && i.selectors.push("activation.extraSA:first"), e.source && i.selectors.push(`burn.${e.source}`), i;
}
function Lo({ actor: s, packet: e = {}, runtime: t = {} } = {}) {
  const i = hi(s, t);
  return i.intent = "initiative", i.domains = ["combat"], i.initiative = {
    total: ae(e.total, 0)
  }, i.selectors.push("intent.initiative"), i;
}
function $o({ actor: s, packet: e = {}, runtime: t = {} } = {}) {
  const i = hi(s, t);
  return i.damage = {
    amount: ae(e.amount, 0),
    track: ee(e.track),
    damageType: ee(e.damageType)
  }, i.selectors.push("incoming"), i;
}
function za({ actor: s, packet: e = {}, phase: t = "onEdgeGain", runtime: i = {} } = {}) {
  const a = hi(s, i);
  return a.edge = {
    pool: ee(e.poolKey),
    amount: ae(e.amount, 0),
    eventKey: ee(e.eventKey),
    source: ee(e.source)
  }, a.selectors.push(t === "onEdgeSpend" ? "edge.spend" : "edge.gain"), a.edge.eventKey && a.selectors.push(`event.${a.edge.eventKey}`), a;
}
function xo({ actor: s, packet: e = {}, runtime: t = {} } = {}) {
  const i = hi(s, t);
  return i.event = {
    phase: "endOfActivation"
  }, i.selectors.push("endOfActivation"), ae(e.burnDelta, 0) !== 0 && i.selectors.push("burn.adjust"), i;
}
function it({ actor: s, phase: e, facts: t = {}, packet: i = {}, options: a = {} } = {}) {
  var u;
  const r = {
    packet: Bs(i),
    modifiers: [],
    mutations: [],
    applied: [],
    skipped: []
  };
  if (!s || !Po.has(String(e ?? "").trim()))
    return r;
  const n = a.runtime ?? {}, o = ou(s, n), l = Io(n), c = ru(s);
  for (const { item: d, system: m } of c) {
    if (mu(d, m)) {
      r.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: "Trait is inactive"
      });
      continue;
    }
    const f = m.prerequisites.filter((p) => ee(p == null ? void 0 : p.fact)).filter((p) => !Jr(p, t));
    if (f.length) {
      r.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: `Prerequisites not met: ${Xr(f)}`
      });
      continue;
    }
    for (const p of m.effects.filter((h) => h.phase === e)) {
      if (!du(p.selector, t)) {
        r.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: `Selector did not match (${p.selector || "any"})`
        });
        continue;
      }
      if (Ro(p) && p.skillKeys.length) {
        const w = ee((u = t == null ? void 0 : t.skill) == null ? void 0 : u.key);
        if (!w || !p.skillKeys.includes(w)) {
          r.skipped.push({
            traitItemId: d.id,
            traitEffectId: p.id,
            label: p.label || d.name,
            reason: `Skill did not match (${p.skillKeys.join(", ")})`
          });
          continue;
        }
      }
      const h = p.conditions.filter((w) => ee(w == null ? void 0 : w.fact)).filter((w) => !Jr(w, t));
      if (h.length) {
        r.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: `Conditions not met: ${Xr(h)}`
        });
        continue;
      }
      const g = nu(m.limits, p.limit), y = Oo(d, p), b = cu(o, l, g, y);
      if (b.length) {
        r.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: b.join(", ")
        });
        continue;
      }
      const A = pu({
        item: d,
        effect: p,
        phase: e,
        packet: r.packet,
        result: r
      });
      r.applied.push({
        traitItemId: d.id,
        traitEffectId: p.id,
        label: p.label || d.name,
        value: A,
        phase: e,
        source: d.name
      }), a.consumeUsage && r.mutations.push(...fu(d, p, g));
    }
  }
  return r;
}
async function Xt({ actor: s, mutations: e = [], runtime: t = {} } = {}) {
  var o, l, c, u, d, m, f, p, h;
  if (!s || !Array.isArray(e) || !e.length) return;
  const i = e.filter((g) => (g == null ? void 0 : g.kind) === "usage");
  if (!i.length) return;
  const a = Bs(((c = (l = (o = s.flags) == null ? void 0 : o[T]) == null ? void 0 : l.traitUsage) == null ? void 0 : c.scene) ?? {}), r = t.state ? Bs(t.state) : null, n = Io(t);
  for (const g of i) {
    const y = ee(g.key), b = Math.max(0, Math.trunc(ae(g.delta, 0)));
    if (!(!y || !b))
      switch (g.scope) {
        case "perActivation": {
          if (!r) break;
          r.traitUsage ?? (r.traitUsage = {}), (u = r.traitUsage).activation ?? (u.activation = {}), r.traitUsage.activation[y] = Math.max(0, ae(r.traitUsage.activation[y], 0) + b);
          break;
        }
        case "perRound": {
          if (!r || !n.roundKey) break;
          r.traitUsage ?? (r.traitUsage = {}), (d = r.traitUsage).round ?? (d.round = {}), (m = r.traitUsage.round)[f = n.roundKey] ?? (m[f] = {}), r.traitUsage.round[n.roundKey][y] = Math.max(
            0,
            ae(r.traitUsage.round[n.roundKey][y], 0) + b
          );
          break;
        }
        case "perScene": {
          if (!n.sceneKey) break;
          a[p = n.sceneKey] ?? (a[p] = {}), a[n.sceneKey][y] = Math.max(0, ae(a[n.sceneKey][y], 0) + b);
          break;
        }
      }
  }
  r && ((h = t.combatant) != null && h.id) && await t.combatant.setFlag(T, "personalCombat", r), await s.setFlag(T, "traitUsage", { scene: a });
}
const Ai = "mwd", wi = "personalCombat", Ut = 3, gu = 1, yu = 1;
function da(s, e) {
  return !(s != null && s.activation) || !e ? !1 : s.activation.combatId === e.combatId && Number(s.activation.round ?? -1) === Number(e.round ?? -1) && Number(s.activation.turn ?? -1) === Number(e.turn ?? -1) && s.activation.combatantId === e.combatantId;
}
function Wa(s = null) {
  return {
    saRemaining: Ut,
    faRemaining: gu,
    raRemaining: yu,
    saSpentThisActivation: 0,
    burnThisActivation: 0,
    attacksThisActivation: 0,
    reactionBurnSinceLastActivation: 0,
    traitUsage: {
      activation: {},
      round: {}
    },
    actionLog: [],
    activation: s
  };
}
function ds(s, e = null) {
  return foundry.utils.mergeObject(
    Wa(e),
    foundry.utils.deepClone(s ?? {}),
    { inplace: !1, overwrite: !0 }
  );
}
function ma(s) {
  return Array.isArray(s) ? s.map((e) => {
    const t = String((e == null ? void 0 : e.label) ?? "").trim();
    return t ? {
      id: String((e == null ? void 0 : e.id) ?? "").trim(),
      label: t,
      costLabel: String((e == null ? void 0 : e.costLabel) ?? "").trim()
    } : null;
  }).filter(Boolean) : [];
}
function bu(s) {
  const e = (CONFIG.statusEffects ?? []).find((i) => String((i == null ? void 0 : i.id) ?? "").trim() === s), t = String((e == null ? void 0 : e.name) ?? (e == null ? void 0 : e.label) ?? s ?? "").trim();
  return To(t);
}
function Ti(s) {
  const e = Number(s);
  return !Number.isFinite(e) || e === 0 ? "0" : e > 0 ? `+${e}` : String(e);
}
function Su(s) {
  if (typeof s == "number") return Number.isFinite(s) ? s : 0;
  const e = String(s ?? "").trim().match(/[-+]?\d+(\.\d+)?/);
  return e ? Number(e[0]) : 0;
}
function Zr(s) {
  var o;
  const e = (s == null ? void 0 : s.document) ?? s ?? null, t = (s == null ? void 0 : s.object) ?? (e == null ? void 0 : e.object) ?? s ?? null, i = String((e == null ? void 0 : e.id) ?? "").trim(), a = ne._pendingTokenPositions.get(i) ?? null, r = Number((a == null ? void 0 : a.x) ?? (e == null ? void 0 : e.x)), n = Number((a == null ? void 0 : a.y) ?? (e == null ? void 0 : e.y));
  return t && Number.isFinite(r) && Number.isFinite(n) && typeof t.getCenter == "function" ? t.getCenter(r, n) : (t == null ? void 0 : t.center) ?? ((o = e == null ? void 0 : e.object) == null ? void 0 : o.center) ?? null;
}
function Au(s, e = "") {
  if (!Number.isFinite(s)) return "";
  const t = Math.round(s * 10) / 10, i = Number.isInteger(t) ? String(t) : t.toFixed(1);
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
    var i, a, r, n;
    const t = this._asTokenDocument(e);
    return ((i = t == null ? void 0 : t.parent) == null ? void 0 : i.id) ?? ((a = t == null ? void 0 : t.scene) == null ? void 0 : a.id) ?? ((n = (r = t == null ? void 0 : t.object) == null ? void 0 : r.scene) == null ? void 0 : n.id) ?? null;
  }
  static _getSceneTokenDocumentById(e, t = ((i) => (i = canvas == null ? void 0 : canvas.scene) == null ? void 0 : i.id)()) {
    var n, o, l, c, u;
    const a = String(e ?? "").trim();
    if (!a || !t) return null;
    const r = ((n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.id) === t ? canvas.scene : (l = (o = game.scenes) == null ? void 0 : o.get) == null ? void 0 : l.call(o, t);
    return ((u = (c = r == null ? void 0 : r.tokens) == null ? void 0 : c.get) == null ? void 0 : u.call(c, a)) ?? null;
  }
  static _collectActorIds(e, t = null) {
    var n, o;
    const i = /* @__PURE__ */ new Set(), a = (l) => {
      const c = String(l ?? "").trim();
      c && i.add(c);
    };
    a(e == null ? void 0 : e.id), a(e == null ? void 0 : e._id);
    const r = this._asTokenDocument(t) ?? this._asTokenDocument(e == null ? void 0 : e.token);
    return a((n = r == null ? void 0 : r.actor) == null ? void 0 : n.id), a((o = r == null ? void 0 : r.baseActor) == null ? void 0 : o.id), a(r == null ? void 0 : r.actorId), i;
  }
  static _tokenDocumentMatchesActor(e, t, i = null) {
    var n, o;
    const a = this._asTokenDocument(e);
    if (!a || !t) return !1;
    const r = i ?? this._collectActorIds(t, a);
    return [
      (n = a == null ? void 0 : a.actor) == null ? void 0 : n.id,
      (o = a == null ? void 0 : a.baseActor) == null ? void 0 : o.id,
      a == null ? void 0 : a.actorId
    ].some((l) => r.has(String(l ?? "").trim()));
  }
  static getPreferredTokenDocument(e) {
    var a, r;
    if (!e) return null;
    const t = this._asTokenDocument(e == null ? void 0 : e.token);
    return t || (((r = (((a = e.getActiveTokens) == null ? void 0 : a.call(e, !0, !0)) ?? [])[0]) == null ? void 0 : r.document) ?? null);
  }
  static getPreferredToken(e) {
    const t = this.getPreferredTokenDocument(e);
    return t ? t.object ?? this._getSceneTokenById(t.id) : null;
  }
  static getCurrentSceneTokenDocument(e, t = null) {
    var p, h, g, y;
    const i = (p = canvas == null ? void 0 : canvas.scene) == null ? void 0 : p.id, a = this._asTokenDocument(t);
    if (this._getTokenSceneId(a) === i) return a;
    const r = String((a == null ? void 0 : a.id) ?? (t == null ? void 0 : t.id) ?? "").trim();
    if (r) {
      const b = this._getSceneTokenDocumentById(r, i);
      if (b) return b;
    }
    const n = this.getPreferredTokenDocument(e);
    if (this._getTokenSceneId(n) === i) return n;
    const o = String((n == null ? void 0 : n.id) ?? "").trim();
    if (o) {
      const b = this._getSceneTokenDocumentById(o, i);
      if (b) return b;
    }
    const c = ((g = (((h = e == null ? void 0 : e.getActiveTokens) == null ? void 0 : h.call(e, !0, !0)) ?? []).find((b) => {
      var A, w;
      return ((w = (A = b == null ? void 0 : b.document) == null ? void 0 : A.parent) == null ? void 0 : w.id) === i;
    })) == null ? void 0 : g.document) ?? null;
    if (c) return c;
    const u = Array.from(((y = canvas == null ? void 0 : canvas.scene) == null ? void 0 : y.tokens) ?? []), d = this._collectActorIds(e, n), m = u.filter((b) => this._tokenDocumentMatchesActor(b, e, d));
    return m.find((b) => {
      var A, w, E;
      return ((A = b == null ? void 0 : b.combatant) == null ? void 0 : A.id) === ((E = (w = game.combat) == null ? void 0 : w.combatant) == null ? void 0 : E.id);
    }) ?? null ?? m[0] ?? null;
  }
  static getCurrentSceneToken(e, t = null) {
    const i = this.getCurrentSceneTokenDocument(e, t);
    return i ? i.object ?? this._getSceneTokenById(i.id) : null;
  }
  static _getSceneTokenById(e) {
    var t, i, a, r;
    return e ? ((i = (t = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : t.get) == null ? void 0 : i.call(t, e)) ?? ((r = (a = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : a.placeables) == null ? void 0 : r.find((n) => n.id === e)) ?? null : null;
  }
  static _measureTokenDistance(e, t) {
    const i = canvas == null ? void 0 : canvas.grid, a = Zr(e), r = Zr(t), n = globalThis.Ray;
    if (!i || !a || !r) return null;
    if (typeof i.measureDistances == "function" && typeof n == "function")
      try {
        const o = i.measureDistances([{ ray: new n(a, r) }], { gridSpaces: !0 }), l = Number(Array.isArray(o) ? o[0] : NaN);
        if (Number.isFinite(l)) return l;
      } catch {
      }
    if (typeof i.measurePath == "function")
      try {
        const o = i.measurePath([a, r], { gridSpaces: !0 }), l = Number(
          (o == null ? void 0 : o.distance) ?? (o == null ? void 0 : o.cost) ?? (o == null ? void 0 : o.totalDistance) ?? (o == null ? void 0 : o.totalCost) ?? NaN
        );
        if (Number.isFinite(l)) return l;
      } catch {
        return null;
      }
    return null;
  }
  static getUserTargetTokens(e = game.user) {
    var a;
    const i = (Array.isArray((a = e == null ? void 0 : e.targets) == null ? void 0 : a.ids) ? e.targets.ids : []).map((r) => this._getSceneTokenById(r)).filter(Boolean);
    return i.length ? i : Array.from((e == null ? void 0 : e.targets) ?? []).map((r) => (r == null ? void 0 : r.object) ?? r).filter(Boolean);
  }
  static getTargetingSnapshot(e = null, t = game.user) {
    var u, d, m, f, p, h, g, y;
    const i = this.getUserTargetTokens(t), a = i.length;
    if (a === 0)
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
    if (a > 1)
      return {
        count: a,
        none: !1,
        single: !1,
        multiple: !0,
        heading: "Targets",
        primaryLabel: `${a} selected`,
        detailRows: [],
        target: null
      };
    const r = i[0], n = this._measureTokenDistance(e, r), o = String(((d = (u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.grid) == null ? void 0 : d.units) ?? ((f = (m = game.system) == null ? void 0 : m.grid) == null ? void 0 : f.units) ?? "").trim(), l = Au(n, o), c = String((r == null ? void 0 : r.name) ?? ((p = r == null ? void 0 : r.actor) == null ? void 0 : p.name) ?? "Target").trim() || "Target";
    return {
      count: a,
      none: !1,
      single: !0,
      multiple: !1,
      heading: "Target",
      primaryLabel: c,
      detailRows: l ? [{ label: "Distance", value: l }] : [],
      target: {
        id: (r == null ? void 0 : r.id) ?? null,
        name: c,
        img: ((g = (h = r == null ? void 0 : r.document) == null ? void 0 : h.texture) == null ? void 0 : g.src) ?? ((y = r == null ? void 0 : r.texture) == null ? void 0 : y.src) ?? "",
        distance: Number.isFinite(n) ? n : null,
        distanceLabel: l
      }
    };
  }
  static getRollImpact(e = []) {
    const t = (Array.isArray(e) ? e : []).map((a) => {
      const r = Su((a == null ? void 0 : a.numericValue) ?? (a == null ? void 0 : a.value) ?? 0);
      return {
        label: String((a == null ? void 0 : a.label) ?? "").trim() || "Modifier",
        numericValue: r,
        value: String((a == null ? void 0 : a.value) ?? Ti(r)).trim() || Ti(r)
      };
    }), i = t.reduce((a, r) => a + r.numericValue, 0);
    return {
      total: i,
      totalLabel: Ti(i),
      entries: t
    };
  }
  static getCombat(e, t = null) {
    var m, f, p, h;
    const i = (m = canvas == null ? void 0 : canvas.scene) == null ? void 0 : m.id, a = game.combat, r = this.getCurrentSceneTokenDocument(e, t), n = (r == null ? void 0 : r.object) ?? this._getSceneTokenById((r == null ? void 0 : r.id) ?? null);
    if (!a || ((f = a.scene) == null ? void 0 : f.id) !== i)
      return {
        combat: null,
        combatant: null,
        token: n,
        tokenDocument: r
      };
    let o = ((h = (p = r == null ? void 0 : r.combatant) == null ? void 0 : p.combat) == null ? void 0 : h.id) === a.id ? r.combatant : null;
    const l = Array.from(a.combatants ?? []);
    if (!o) {
      const g = this._collectActorIds(e, r), y = l.filter((w) => {
        const E = String((w == null ? void 0 : w.tokenId) ?? "").trim();
        if (r && E === String(r.id ?? "").trim() || g.has(String((w == null ? void 0 : w.actorId) ?? "").trim())) return !0;
        const I = this._asTokenDocument(w == null ? void 0 : w.token) ?? this._getSceneTokenDocumentById(E, i);
        return this._tokenDocumentMatchesActor(I, e, g);
      }), b = y.find((w) => {
        var E;
        return w.id === ((E = a == null ? void 0 : a.combatant) == null ? void 0 : E.id);
      }) ?? null, A = y.find(
        (w) => r && String((w == null ? void 0 : w.tokenId) ?? "").trim() === String(r.id ?? "").trim()
      ) ?? null;
      o = b ?? A ?? y[0] ?? null;
    }
    !o && l.length === 1 && (n || e) && (o = l[0]);
    const c = this._asTokenDocument(o == null ? void 0 : o.token) ?? this._getSceneTokenDocumentById((o == null ? void 0 : o.tokenId) ?? null, i), u = r ?? c ?? null, d = n ?? (c == null ? void 0 : c.object) ?? this._getSceneTokenById((o == null ? void 0 : o.tokenId) ?? null) ?? null;
    return {
      combat: a,
      combatant: o,
      token: d,
      tokenDocument: u
    };
  }
  static getSnapshot(e, { token: t = null } = {}) {
    var w, E, I, D, L;
    const {
      combat: i,
      combatant: a,
      token: r,
      tokenDocument: n
    } = this.getCombat(e, t), o = !!a && ((w = i == null ? void 0 : i.combatant) == null ? void 0 : w.id) === a.id, l = a ? this.getActivationIdentity(i, a) : null, c = a ? a.getFlag(Ai, wi) : null, u = a && o && da(c, l) ? ds(c, l) : Wa(l);
    u.actionLog = ma(u.actionLog);
    const d = Math.max(0, Number(((I = (E = e == null ? void 0 : e.system) == null ? void 0 : E.burn) == null ? void 0 : I.value) ?? 0)), m = Math.floor(d / 2), f = !!((L = (D = e == null ? void 0 : e.system) == null ? void 0 : D.burn) != null && L.overloaded), p = this.getActiveStatuses(e), h = p.filter((V) => !(f && V.id === "overloaded")), g = this.getModifierSummary(e, m), y = this.getRollImpact(g), b = Math.max(0, Number(u.burnThisActivation ?? 0)), A = a ? o ? "" : "Waiting for this combatant's activation." : "No combatant on the current scene.";
    return {
      token: r,
      tokenDocument: n,
      combat: i,
      combatant: a,
      hasCombatant: !!a,
      isCurrentTurn: o,
      overloaded: f,
      burn: {
        value: d,
        penalty: m,
        canOverloadCheck: d >= 6 && !f
      },
      state: u,
      targeting: this.getTargetingSnapshot(r),
      states: f ? [{ id: "overloaded", label: "Overloaded" }] : [],
      effects: h,
      statuses: p,
      rollImpact: y,
      summaryText: `SA: ${u.saRemaining} / ${Ut}   FA: ${u.faRemaining}   RA: ${u.raRemaining}`,
      activation: {
        burnThisActivation: b,
        burnThisActivationLabel: `+${b}`,
        items: [
          { label: "SA", value: `${u.saRemaining}/${Ut}` },
          { label: "FA", value: String(u.faRemaining) },
          { label: "RA", value: String(u.raRemaining) },
          { label: "Burn", value: `+${b}`, detail: "this activation" }
        ]
      },
      inactiveReason: A,
      modifierSummary: g
    };
  }
  static getModifierSummary(e, t = Math.floor(Number(((a) => (a = ((i) => (i = e == null ? void 0 : e.system) == null ? void 0 : i.burn)()) == null ? void 0 : a.value)() ?? 0) / 2)) {
    var c, u;
    const r = ((u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.derived) == null ? void 0 : u.condition) ?? {}, n = [];
    t > 0 && n.push({
      label: "Burn Penalty",
      numericValue: -t,
      value: Ti(-t)
    });
    const o = Number(r.fatiguePenalty ?? 0);
    o && n.push({
      label: "Fatigue",
      numericValue: o,
      value: Ti(o)
    });
    const l = Number(r.physicalPenalty ?? 0);
    return l && n.push({
      label: "Physical",
      numericValue: l,
      value: Ti(l)
    }), n.length || n.push({
      label: "Current Modifiers",
      numericValue: 0,
      value: "0"
    }), n;
  }
  static getActiveStatuses(e) {
    return Array.from((e == null ? void 0 : e.statuses) ?? []).map((i) => ({
      id: i,
      label: bu(i)
    })).sort((i, a) => i.label.localeCompare(a.label));
  }
  static buildActionModel(e, t) {
    var h, g, y;
    const i = t.hasCombatant ? "" : "No current-scene combatant.", a = t.isCurrentTurn ? "" : "Only during your activation.", r = t.overloaded ? "Overloaded: only Burn recovery is allowed." : "", n = en(e, t), o = i || a || r, l = [
      { id: "move", label: "Move", resource: "sa", cost: 1, supported: !0 },
      { id: "aim", label: "Aim", resource: "sa", cost: 1, supported: !0 },
      { id: "reload", label: "Reload", resource: "sa", cost: 1, supported: !0 },
      { id: "assist", label: "Assist", resource: "sa", cost: 1, supported: !0 },
      { id: "stand", label: "Stand", resource: "sa", cost: 1, supported: !0 }
    ].map((b) => this._buildSpendAction(
      t,
      b,
      o || (n < b.cost ? "Activation SA cap reached." : "")
    )), c = i || a || r || (n < 2 ? "Activation SA cap reached." : ""), u = [
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
    ].map((b) => b.handler ? b : this._buildStubAction(b)), d = i || a || (n <= 0 ? "Activation SA cap reached." : "") || (t.burn.value <= 0 ? "Burn is already at 0." : ""), m = i || a || (t.burn.canOverloadCheck ? "" : t.overloaded ? "Already Overloaded." : "Burn below 6."), f = i || a, p = (b) => {
      const A = Er(b), w = Gc(b);
      return !w || !A ? null : {
        id: b,
        label: A.label,
        handler: "roll",
        roll: JSON.stringify(w),
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
        p("composure"),
        p("judgeIntent"),
        p("memory"),
        p("lift"),
        p("endure")
      ].filter(Boolean),
      summaryPills: [
        { label: "SA", value: `${t.state.saRemaining}/${Ut}` },
        { label: "Cap", value: `${Math.max(0, Number(((h = t.state) == null ? void 0 : h.saSpentThisActivation) ?? 0))}/${Ha(e)}` },
        { label: "FA", value: `${t.state.faRemaining}` },
        { label: "RA", value: `${t.state.raRemaining}` },
        { label: "Burn/Turn", value: `+${Math.max(0, Number(((g = t.state) == null ? void 0 : g.burnThisActivation) ?? 0))}` }
      ],
      activationLog: ma((y = t.state) == null ? void 0 : y.actionLog).map((b, A) => ({
        ...b,
        index: A + 1
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
              disabled: !!m,
              reason: m,
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
            }, f),
            this._buildSpendAction(t, {
              id: "spendRA",
              label: "Spend RA",
              resource: "ra",
              cost: 1,
              supported: !0
            }, f)
          ]
        }
      ]
    };
  }
  static _buildSpendAction(e, t, i = "") {
    var l;
    const a = Number(((l = e.state) == null ? void 0 : l[`${t.resource}Remaining`]) ?? 0), r = t.resource === "sa" ? "" : a < t.cost ? `No ${String(t.resource).toUpperCase()} remaining.` : "", n = i || r, o = this._formatCostLabel(t.resource, t.cost);
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
  static _appendActionLog(e, { id: t = "", label: i = "", costLabel: a = "" } = {}) {
    const r = String(i ?? "").trim();
    if (!r) return;
    const n = ma(e == null ? void 0 : e.actionLog);
    n.push({
      id: String(t ?? "").trim(),
      label: r,
      costLabel: String(a ?? "").trim()
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
    const i = this.getActivationIdentity(e, t), a = t.getFlag(Ai, wi);
    da(a, i) || await t.setFlag(Ai, wi, Wa(i));
  }
  static async spendResource(e, {
    token: t = null,
    resource: i = "sa",
    cost: a = 1,
    actionId: r = "",
    actionLabel: n = "",
    actionCostLabel: o = ""
  } = {}) {
    var b, A, w, E, I, D, L;
    const l = this.getSnapshot(e, { token: t });
    if (!l.hasCombatant)
      return { ok: !1, reason: "No combatant on the current scene." };
    if (!l.isCurrentTurn)
      return { ok: !1, reason: "Only available during your activation." };
    const c = {
      combat: l.combat,
      combatant: l.combatant,
      state: ds(l.state, this.getActivationIdentity(l.combat, l.combatant)),
      sceneId: ((b = canvas == null ? void 0 : canvas.scene) == null ? void 0 : b.id) ?? "",
      snapshot: l
    };
    let u = Math.max(0, Number(a ?? 0) || 0);
    const d = it({
      actor: e,
      phase: "onBeforeActionCostFinalized",
      facts: _o({
        actor: e,
        packet: { actionId: r, resource: i, cost: u },
        runtime: c
      }),
      packet: { actionId: r, resource: i, cost: u },
      options: { runtime: c, consumeUsage: !0 }
    });
    u = Math.max(0, Number(d.packet.cost ?? u) || 0), c.pendingMutations = (c.pendingMutations ?? []).concat(d.mutations);
    const m = `${i}Remaining`, f = Number(((A = l.state) == null ? void 0 : A[m]) ?? 0);
    if (i !== "sa" && f < u)
      return { ok: !1, reason: `No ${String(i).toUpperCase()} remaining.` };
    const p = c.state, h = i === "sa" ? Ha(e) : 0, g = Math.max(0, Number(((w = l.state) == null ? void 0 : w.saSpentThisActivation) ?? 0) || 0);
    if (i === "sa" && g + u > h)
      return { ok: !1, reason: "Activation SA cap reached." };
    p[m] = Math.max(0, f - u), i === "sa" && (p.saSpentThisActivation = g + u, r === "attack" && (p.attacksThisActivation = Number(p.attacksThisActivation ?? 0) + 1)), this._appendActionLog(p, {
      id: r,
      label: n,
      costLabel: o || this._formatCostLabel(i, u)
    });
    let y = 0;
    if (i === "sa") {
      const V = Math.max(0, g - Ut), Y = Math.max(0, p.saSpentThisActivation - Ut), K = Math.max(0, Number(((E = l.state) == null ? void 0 : E.attacksThisActivation) ?? 0) || 0), O = Math.max(0, Number(p.attacksThisActivation ?? 0) || 0);
      for (let R = V + 1; R <= Y; R += 1) {
        const U = it({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: Fa({
            actor: e,
            packet: {
              actionId: r,
              resource: i,
              amount: 1,
              source: "extraSA",
              extraSaIndex: R
            },
            runtime: c
          }),
          packet: {
            actionId: r,
            resource: i,
            amount: 1,
            source: "extraSA",
            extraSaIndex: R
          },
          options: { runtime: c, consumeUsage: !0 }
        });
        c.pendingMutations = (c.pendingMutations ?? []).concat(U.mutations), y += Math.max(0, Number(U.packet.amount ?? 0) || 0);
      }
      for (let R = K + 1; R <= O; R += 1) {
        if (R <= 1) continue;
        const U = it({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: Fa({
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
            attackIndex: R
          },
          options: { runtime: c, consumeUsage: !0 }
        });
        c.pendingMutations = (c.pendingMutations ?? []).concat(U.mutations), y += Math.max(0, Number(U.packet.amount ?? 0) || 0);
      }
      p.burnThisActivation = Math.max(0, Number(p.burnThisActivation ?? 0) + y);
    }
    return (I = c.pendingMutations) != null && I.length ? await Xt({
      actor: e,
      mutations: c.pendingMutations,
      runtime: {
        ...c,
        state: p
      }
    }) : await l.combatant.setFlag(Ai, wi, p), y > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((L = (D = e.system) == null ? void 0 : D.burn) == null ? void 0 : L.value) ?? 0) + y) }), { ok: !0, snapshot: this.getSnapshot(e, { token: l.token }) };
  }
  static async reduceBurn(e, { token: t = null } = {}) {
    var o, l, c, u;
    const i = this.getSnapshot(e, { token: t });
    if (!i.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!i.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (en(e, i) <= 0) return { ok: !1, reason: "Activation SA cap reached." };
    if (i.burn.value <= 0) return { ok: !1, reason: "Burn is already at 0." };
    const a = await this.spendResource(e, {
      token: i.token,
      resource: "sa",
      cost: 1,
      actionId: "reduceBurn",
      actionLabel: "Reduce Burn",
      actionCostLabel: "1 SA"
    });
    if (!a.ok) return a;
    const r = Math.max(0, Number(((l = (o = e.system) == null ? void 0 : o.burn) == null ? void 0 : l.value) ?? 0) - 1), n = { "system.burn.value": r };
    return r === 0 && ((u = (c = e.system) == null ? void 0 : c.burn) != null && u.overloaded) && (n["system.burn.overloaded"] = !1), await e.update(n), { ok: !0, snapshot: this.getSnapshot(e, { token: i.token }) };
  }
  static async finalizeActivation(e, t) {
    var m, f, p, h, g, y, b, A;
    if (!game.user.isGM || !t || !e) return;
    const i = ((f = (m = e.combatants) == null ? void 0 : m.get) == null ? void 0 : f.call(m, t)) ?? null, a = (i == null ? void 0 : i.actor) ?? null;
    if (!i || !a) return;
    const r = i.getFlag(Ai, wi), n = da(r, this.getActivationIdentity(e, i)) ? ds(r, this.getActivationIdentity(e, i)) : ds(r), l = {
      burnDelta: Number(n.saSpentThisActivation ?? 0) <= Ut && Number(n.burnThisActivation ?? 0) <= 0 && Number(n.reactionBurnSinceLastActivation ?? 0) <= 0 ? -2 : 0,
      edgeAdjustments: []
    }, c = {
      combat: e,
      combatant: i,
      state: n,
      sceneId: ((p = e.scene) == null ? void 0 : p.id) ?? ((h = canvas == null ? void 0 : canvas.scene) == null ? void 0 : h.id) ?? ""
    }, u = it({
      actor: a,
      phase: "onEndOfActivation",
      facts: xo({ actor: a, packet: l, runtime: c }),
      packet: l,
      options: { runtime: c, consumeUsage: !0 }
    });
    await Xt({ actor: a, mutations: u.mutations, runtime: c });
    const d = Number(u.packet.burnDelta ?? l.burnDelta) || 0;
    if (d) {
      const w = Math.max(0, Number(((y = (g = a.system) == null ? void 0 : g.burn) == null ? void 0 : y.value) ?? 0) + d), E = { "system.burn.value": w };
      w === 0 && ((A = (b = a.system) == null ? void 0 : b.burn) != null && A.overloaded) && (E["system.burn.overloaded"] = !1), await a.update(E);
    }
    for (const w of u.packet.edgeAdjustments ?? []) {
      const E = Number((w == null ? void 0 : w.amount) ?? 0) || 0;
      !E || !(w != null && w.poolKey) || (E > 0 ? await a.gainEdge(w.poolKey, E, { skipTraitHooks: !0, source: "endOfActivationTrait" }) : await a.spendEdge(w.poolKey, Math.abs(E), { skipTraitHooks: !0, source: "endOfActivationTrait" }));
    }
  }
  static async _onUpdateCombat(e, t) {
    var a, r;
    if (Object.prototype.hasOwnProperty.call(t ?? {}, "turn") || Object.prototype.hasOwnProperty.call(t ?? {}, "round")) {
      const n = this._lastActivationByCombat.get(e == null ? void 0 : e.id) ?? null;
      n && n !== ((a = e == null ? void 0 : e.combatant) == null ? void 0 : a.id) && await this.finalizeActivation(e, n), await this.ensureCurrentCombatantState(), e != null && e.id && this._lastActivationByCombat.set(e.id, ((r = e.combatant) == null ? void 0 : r.id) ?? null);
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
    foundry.utils.hasProperty(t, `flags.${Ai}.${wi}`) && this.renderOpenCharacterSheets((i = e == null ? void 0 : e.actor) == null ? void 0 : i.id);
  }
  static _onTargetToken(e, t, i) {
    var a;
    (e == null ? void 0 : e.id) === ((a = game.user) == null ? void 0 : a.id) && this.queueCharacterSheetRefresh();
  }
  static _onUpdateToken(e, t) {
    var r, n;
    if (!["x", "y", "elevation"].some(
      (o) => Object.prototype.hasOwnProperty.call(t ?? {}, o)
    ) || ((r = e == null ? void 0 : e.parent) == null ? void 0 : r.id) !== ((n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.id)) return;
    const a = String((e == null ? void 0 : e.id) ?? "").trim();
    if (a) {
      const o = Object.prototype.hasOwnProperty.call(t ?? {}, "x") ? Number(t.x) : Number(e == null ? void 0 : e.x), l = Object.prototype.hasOwnProperty.call(t ?? {}, "y") ? Number(t.y) : Number(e == null ? void 0 : e.y);
      Number.isFinite(o) && Number.isFinite(l) && this._pendingTokenPositions.set(a, { x: o, y: l });
    }
    this.queueCharacterSheetRefresh();
  }
  static queueCharacterSheetRefresh(e = null) {
    this._targetRefreshTimeout && clearTimeout(this._targetRefreshTimeout), this._targetRefreshTimeout = setTimeout(() => {
      this._targetRefreshTimeout = null, this.renderOpenCharacterSheets(e);
    }, 0);
  }
  static _collectOpenCharacterSheetApps() {
    var i, a;
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
      ((a = r == null ? void 0 : r.actor) == null ? void 0 : a.type) === "character" && e.add(r);
    return Array.from(e);
  }
  static renderOpenCharacterSheets(e = null) {
    var i;
    const t = this._collectOpenCharacterSheetApps();
    for (const a of t)
      if (!(e && ((i = a.actor) == null ? void 0 : i.id) !== e)) {
        if (typeof a.requestCombatDashboardRefresh == "function") {
          a.requestCombatDashboardRefresh();
          continue;
        }
        a.render({ force: !0 });
      }
  }
}
N(ne, "_targetRefreshTimeout", null), N(ne, "_pendingTokenPositions", /* @__PURE__ */ new Map()), N(ne, "_lastActivationByCombat", /* @__PURE__ */ new Map());
function Ha(s) {
  var i, a, r, n, o, l;
  const e = Math.max(0, Number(((r = (a = (i = s == null ? void 0 : s.system) == null ? void 0 : i.attributes) == null ? void 0 : a.reflexes) == null ? void 0 : r.value) ?? 0) || 0), t = Math.max(0, Number(((l = (o = (n = s == null ? void 0 : s.system) == null ? void 0 : n.attributes) == null ? void 0 : o.willpower) == null ? void 0 : l.value) ?? 0) || 0);
  return Ut + Math.floor((e + t) / 2);
}
function en(s, e) {
  var t;
  return Math.max(0, Ha(s) - Math.max(0, Number(((t = e == null ? void 0 : e.state) == null ? void 0 : t.saSpentThisActivation) ?? 0) || 0));
}
const Ri = "lifeModuleCatalog", Ys = Object.freeze([
  { moduleType: "faction", label: "Faction" },
  { moduleType: "childhood", label: "Childhood" },
  { moduleType: "higherEducation", label: "Higher Education" },
  { moduleType: "realLife", label: "Real Life" }
]), wu = Object.freeze(
  Object.fromEntries(Ys.map((s) => [s.moduleType, s.label]))
), Tu = new Set(Ys.map((s) => s.moduleType)), ku = /* @__PURE__ */ new Set(["skill", "edgePool"]), Dr = Object.freeze({
  grit: "Grit",
  chaos: "Chaos",
  insight: "Insight",
  rumor: "Rumor",
  legend: "Legend",
  credibility: "Credibility"
}), Bo = Object.freeze(Object.keys(Dr)), vu = Object.freeze({
  skill: "Skill",
  edgePool: "Edge Pool"
}), Mu = Object.freeze(Du()), Eu = Object.freeze(Iu()), Cu = /* @__PURE__ */ new Set(["artillery", "gunnery", "piloting", "heavyWeapons"]), Pu = /* @__PURE__ */ new Set([
  "artillery",
  "gunnery",
  "heavyWeapons",
  "meleeCombat",
  "piloting",
  "projectileWeapons",
  "firearms"
]), Nu = Object.freeze(
  ht.map((s) => s.code).filter((s) => !Pu.has(s))
), Ru = Object.freeze(gi([
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
        ...Nu.map((s) => ({ type: "skill", value: s })),
        ...Bo.map((s) => ({ type: "edgePool", value: s }))
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
    skillChoices: ht.map((s) => s.code).filter((s) => !Cu.has(s)),
    excludesAny: [
      "higher-education-military-enlistment",
      "higher-education-military-academy",
      "higher-education-family-training",
      "higher-education-officer-candidate-school"
    ]
  }
], { strict: !1 }));
function Du() {
  const s = /* @__PURE__ */ new Map();
  for (const e of ht) {
    const t = String(e.code ?? "").trim(), i = String(e.label ?? "").trim();
    t && (s.set(t.toLowerCase(), t), i && s.set(i.toLowerCase(), t));
  }
  return s;
}
function Iu() {
  const s = /* @__PURE__ */ new Map();
  for (const [e, t] of Object.entries(Dr))
    s.set(e.toLowerCase(), e), s.set(t.toLowerCase(), e), s.set(`${t.toLowerCase()} pool`, e);
  return s;
}
function Ou(s = []) {
  const e = Array.isArray(s) ? s.filter(Boolean) : [String(s ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid life module data.");
  return t.validationErrors = e, t;
}
function Fo(s) {
  return Array.isArray(s) ? s : typeof s == "string" ? s.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
function ns(s) {
  return String(s ?? "").trim().toLowerCase().replace(/['\u2019]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function Qs(s) {
  const e = String(s ?? "").trim();
  return Tu.has(e) ? e : "";
}
function Js(s) {
  const e = String(s ?? "").trim();
  return e ? Mu.get(e.toLowerCase()) ?? "" : "";
}
function _u(s) {
  const e = String(s ?? "").trim();
  return e ? Eu.get(e.toLowerCase()) ?? "" : "";
}
function Lu(s, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const a = /* @__PURE__ */ new Set(), r = [];
  for (const n of Fo(s)) {
    const o = Js(n);
    if (!o) {
      e && t.push(`${i}: unknown skill "${n}".`);
      continue;
    }
    a.has(o) || (a.add(o), r.push(o));
  }
  return r;
}
function tn(s) {
  const e = /* @__PURE__ */ new Set();
  return Fo(s).map(ns).filter((t) => !t || e.has(t) ? !1 : (e.add(t), !0));
}
function sn(s = [], e = /* @__PURE__ */ new Map()) {
  return s.map((t) => {
    var i;
    return ((i = e.get(t)) == null ? void 0 : i.label) ?? t;
  });
}
function _i(s = {}) {
  return `${s.type}:${s.value}`;
}
function $u(s) {
  var e;
  return ((e = at(s)) == null ? void 0 : e.label) ?? s;
}
function zo(s) {
  return Dr[s] ?? s;
}
function xu(s) {
  return vu[s] ?? s;
}
function Bu(s = {}, { includeTypePrefix: e = !1 } = {}) {
  const t = String((s == null ? void 0 : s.type) ?? "").trim(), i = String((s == null ? void 0 : s.value) ?? "").trim();
  if (!t || !i) return "";
  const a = t === "skill" ? $u(i) : `${zo(i)} Pool`;
  return e ? `${xu(t)}: ${a}` : a;
}
function es(s = {}, { includeBonusText: e = !1, includeTypePrefix: t = !1 } = {}) {
  const i = Bu(s, { includeTypePrefix: t });
  return i ? e ? s.type === "skill" ? `+1 ${i} rolls` : `+1 ${i}` : i : "";
}
function Fu(s) {
  const e = String(s ?? "").trim(), t = e.indexOf(":");
  return t < 0 ? null : {
    type: e.slice(0, t).trim(),
    value: e.slice(t + 1).trim()
  };
}
function zu(s, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: a = "Bonus" } = {}) {
  const r = typeof s == "string" ? Fu(s) : s, n = String((r == null ? void 0 : r.type) ?? "").trim(), o = String((r == null ? void 0 : r.value) ?? "").trim();
  if (!ku.has(n))
    return e && t.push(`${i} ${a}: unknown bonus type "${n || s}".`), null;
  const l = n === "skill" ? Js(o) : _u(o);
  return l ? {
    type: n,
    value: l
  } : (e && t.push(`${i} ${a}: unknown ${n === "skill" ? "skill" : "edge pool"} "${o}".`), null);
}
function Ua(s, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: a = "Bonus" } = {}) {
  const r = /* @__PURE__ */ new Set(), n = [], o = Array.isArray(s) ? s : [];
  for (const l of o) {
    const c = zu(l, { strict: e, errors: t, prefix: i, grantLabel: a });
    if (!c) continue;
    const u = _i(c);
    r.has(u) || (r.add(u), n.push(c));
  }
  return n;
}
function Wo(s, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const a = Lu(s, { strict: e, errors: t, prefix: i });
  return a.length ? [{
    id: "skill",
    label: "",
    choices: a.map((r) => ({ type: "skill", value: r }))
  }] : [];
}
function Wu(s, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const a = String(s ?? "").trim();
  return a ? a.split(";").map((n) => n.trim()).filter(Boolean).map((n, o) => {
    const l = `Bonus ${o + 1}`, c = Ua(
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
function Ho(s, e = "grant") {
  return ns(s) || e;
}
function Hu(s, e, { strict: t = !1, errors: i = [], prefix: a = "Entry" } = {}) {
  const r = `grant-${e + 1}`, n = `Bonus ${e + 1}`;
  if (typeof s == "string") {
    const u = Ua(
      s.split("|").map((d) => d.trim()).filter(Boolean),
      { strict: t, errors: i, prefix: a, grantLabel: n }
    );
    return u.length ? { id: r, label: "", choices: u } : null;
  }
  const o = Ho(s == null ? void 0 : s.id, r), l = String((s == null ? void 0 : s.label) ?? "").trim(), c = Ua(s == null ? void 0 : s.choices, { strict: t, errors: i, prefix: a, grantLabel: n });
  return c.length ? { id: o, label: l, choices: c } : (t && i.push(`${a} ${n}: define at least one bonus choice.`), null);
}
function Uu(s, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  if (Array.isArray(s)) {
    if (s.every((r) => typeof r == "string" && !String(r).includes(":")))
      return Wo(s, { strict: e, errors: t, prefix: i });
    const a = /* @__PURE__ */ new Set();
    return s.map((r, n) => Hu(r, n, { strict: e, errors: t, prefix: i })).filter((r) => r ? a.has(r.id) ? (e && t.push(`${i}: duplicate bonus id "${r.id}".`), !1) : (a.add(r.id), !0) : !1);
  }
  return typeof s == "string" ? Wu(s, { strict: e, errors: t, prefix: i }) : [];
}
function ju(s = []) {
  return (Array.isArray(s) ? s : []).map((e) => (Array.isArray(e == null ? void 0 : e.choices) ? e.choices : []).map((i) => `${i.type}:${i.value}`).join("|")).filter(Boolean).join("; ");
}
function Ir() {
  return foundry.utils.deepClone(Ru);
}
function Li(s) {
  return wu[s] ?? (String(s ?? "").trim() || "Life Module");
}
function Uo() {
  return Ys.map((s) => ({
    value: s.moduleType,
    label: s.label
  }));
}
function gi(s = [], { strict: e = !1 } = {}) {
  const t = Array.isArray(s) ? s : [], i = [], a = /* @__PURE__ */ new Set(), r = t.map((o, l) => {
    const c = `Entry ${l + 1}`, u = String((o == null ? void 0 : o.label) ?? "").trim(), d = ns((o == null ? void 0 : o.id) ?? u), m = Qs(o == null ? void 0 : o.moduleType), f = (o == null ? void 0 : o.grants) != null ? Uu(o.grants, { strict: e, errors: i, prefix: c }) : Wo(o == null ? void 0 : o.skillChoices, { strict: e, errors: i, prefix: c }), p = tn(o == null ? void 0 : o.requiresAny), h = tn(o == null ? void 0 : o.excludesAny);
    return !d && e && i.push(`${c}: id cannot be blank.`), !u && e && i.push(`${c}: label cannot be blank.`), !m && e && i.push(`${c}: choose a valid module type.`), !f.length && e && i.push(`${c}: choose at least one bonus.`), d && a.has(d) && e && i.push(`${c}: duplicate id "${d}".`), d && a.add(d), {
      id: d,
      label: u,
      moduleType: m,
      grants: f,
      requiresAny: p,
      excludesAny: h
    };
  }), n = new Map(r.map((o) => [o.id, o]));
  for (const o of r) {
    for (const l of o.requiresAny)
      l === o.id && e && i.push(`${o.label || o.id}: cannot require itself.`), !n.has(l) && e && i.push(`${o.label || o.id}: unknown requirement "${l}".`);
    for (const l of o.excludesAny)
      l === o.id && e && i.push(`${o.label || o.id}: cannot exclude itself.`), !n.has(l) && e && i.push(`${o.label || o.id}: unknown exclusion "${l}".`);
  }
  if (e && i.length) throw Ou(i);
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
function jo(s = []) {
  const e = new Map(Ir().map((r) => [r.id, r])), t = gi(s, { strict: !1 }), i = [...t], a = new Set(t.map((r) => r.id));
  for (const [r, n] of e.entries())
    a.has(r) || i.push(foundry.utils.deepClone(n));
  return i;
}
async function Gu() {
  var s, e, t;
  try {
    if (!((t = (e = (s = game == null ? void 0 : game.settings) == null ? void 0 : s.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${Ri}`))) return;
    const i = game.settings.get(T, Ri), a = jo(i);
    JSON.stringify(i) !== JSON.stringify(a) && await game.settings.set(T, Ri, a);
  } catch {
  }
}
function qu() {
  var s, e, t;
  try {
    if ((t = (e = (s = game == null ? void 0 : game.settings) == null ? void 0 : s.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${Ri}`))
      return jo(game.settings.get(T, Ri));
  } catch {
  }
  return Ir();
}
function Xs() {
  return gi(qu(), { strict: !1 });
}
function Qt(s) {
  const e = ns(s);
  return e ? Xs().find((t) => t.id === e) ?? null : null;
}
function Or(s) {
  const e = Qs(s);
  return Xs().filter((t) => t.moduleType === e);
}
function Go(s) {
  return !s || typeof s != "object" || Array.isArray(s) ? {} : Object.fromEntries(
    Object.entries(s).map(([e, t]) => [Ho(e, ""), String(t ?? "").trim()]).filter(([e]) => !!e)
  );
}
function qo(s, e = "", { legacySelectedSkill: t = "" } = {}) {
  const i = new Set((Array.isArray(s == null ? void 0 : s.choices) ? s.choices : []).map(_i)), a = String(e ?? "").trim();
  if (i.has(a)) return a;
  if (t) {
    const r = Js(t), n = r ? `skill:${r}` : "";
    if (n && i.has(n)) return n;
  }
  return i.size === 1 ? Array.from(i)[0] : "";
}
function Vo(s, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(s == null ? void 0 : s.grants) ? s.grants : [], a = Go(e);
  return Object.fromEntries(
    i.map((r) => [
      r.id,
      qo(r, a[r.id], { legacySelectedSkill: t })
    ])
  );
}
function Zs(s, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(s == null ? void 0 : s.grants) ? s.grants : [], a = Vo(s, e, { legacySelectedSkill: t });
  return i.map((r, n) => {
    const o = qo(r, a[r.id], { legacySelectedSkill: t }), l = (Array.isArray(r.choices) ? r.choices : []).find((c) => _i(c) === o) ?? null;
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
function Vu(s, e = {}, { legacySelectedSkill: t = "" } = {}) {
  var i;
  return ((i = Zs(s, e, { legacySelectedSkill: t }).map((a) => a.choice).find((a) => (a == null ? void 0 : a.type) === "skill")) == null ? void 0 : i.value) ?? "";
}
function ts(s = {}) {
  const e = foundry.utils.deepClone(s ?? {}), t = ns(e.catalogId), i = t ? Qt(t) : null, a = Qs(e.moduleType || (i == null ? void 0 : i.moduleType)), r = i ? Vo(i, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }) : Go(e.selectedGrants);
  return e.moduleType = a, e.catalogId = t, e.selectedGrants = r, e.selectedSkill = i ? Vu(i, r, { legacySelectedSkill: e.selectedSkill }) : Js(e.selectedSkill), e;
}
function Ko(s, e = {}, { legacySelectedSkill: t = "" } = {}) {
  return Zs(s, e, { legacySelectedSkill: t }).map((i) => {
    var l, c;
    const a = Array.isArray((c = (l = s == null ? void 0 : s.grants) == null ? void 0 : l[i.index]) == null ? void 0 : c.choices) ? s.grants[i.index].choices : [], r = new Set(a.map((u) => u.type)).size > 1, n = a.map((u) => ({
      value: _i(u),
      label: es(u, { includeTypePrefix: r }),
      selected: _i(u) === i.selectedKey
    })), o = n.length === 1 ? {
      value: n[0].value,
      label: n[0].label,
      displayLabel: es(a[0], { includeBonusText: !0 })
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
function Ku(s, e) {
  return s.isDuplicate ? `Duplicate ${Li(s.moduleType)} slot item.` : s.catalog ? s.unresolvedGrantCount > 0 ? "Choose valid bonus options." : s.excludedBy.length ? `Blocked by ${sn(s.excludedBy, e).join(", ")}.` : s.requiresAny.length && !s.matchedRequirementIds.length ? `Requires ${sn(s.requiresAny, e).join(" or ")}.` : "" : "Catalog entry is missing or unlinked.";
}
function Yu(s, e = [], t = {}) {
  var a, r, n;
  if (!s || !Array.isArray(e) || !e.length) return [];
  const i = Math.max(0, Number(((n = (r = (a = s.system) == null ? void 0 : a.attributes) == null ? void 0 : r.edge) == null ? void 0 : n.value) ?? 0));
  return e.filter((o) => (o == null ? void 0 : o.type) === "edgePool").map((o) => {
    var p, h, g, y;
    const l = String(o.value ?? "").trim(), c = zo(l), u = Math.max(0, Number(((y = (g = (h = (p = s.system) == null ? void 0 : p.counters) == null ? void 0 : h.edgePools) == null ? void 0 : g[l]) == null ? void 0 : y.rating) ?? 0)), d = Math.max(0, Number((t == null ? void 0 : t[l]) ?? 0)), m = Math.max(0, u + d - i);
    return m ? `${c} Pool bonus loses ${m} ${m === 1 ? "point" : "points"} to the Edge cap.` : "";
  }).filter(Boolean);
}
function Jt(s) {
  var m;
  const e = Xs(), t = new Map(e.map((f) => [f.id, f])), i = Array.from((s == null ? void 0 : s.items) ?? []).filter((f) => f.type === S.itemType.lifeModule), a = /* @__PURE__ */ new Map();
  for (const f of i) {
    const p = Qs((m = f.system) == null ? void 0 : m.moduleType);
    !p || a.has(p) || a.set(p, f.id);
  }
  const r = i.map((f) => {
    var E;
    const p = ts(f.system ?? {}), h = t.get(p.catalogId) ?? null, g = p.moduleType || (h == null ? void 0 : h.moduleType) || "", y = h ? Zs(h, p.selectedGrants, { legacySelectedSkill: p.selectedSkill }) : [], b = y.map((I) => I.choice).filter(Boolean), A = ((E = b.find((I) => I.type === "skill")) == null ? void 0 : E.value) ?? "", w = A ? at(A) : null;
    return {
      item: f,
      itemId: f.id,
      moduleType: g,
      catalogId: (h == null ? void 0 : h.id) ?? p.catalogId,
      catalog: h,
      label: (h == null ? void 0 : h.label) ?? f.name,
      selectedGrants: p.selectedGrants,
      resolvedGrants: y,
      unresolvedGrantCount: y.filter((I) => !I.isResolved).length,
      selectedChoices: b,
      selectedChoiceLabels: b.map((I) => es(I, { includeBonusText: !0 })),
      selectedSkill: A,
      selectedSkillLabel: (w == null ? void 0 : w.label) ?? A,
      requiresAny: [...(h == null ? void 0 : h.requiresAny) ?? []],
      excludesAny: [...(h == null ? void 0 : h.excludesAny) ?? []],
      matchedRequirementIds: [],
      excludedBy: [],
      isDuplicate: g ? a.get(g) !== f.id : !1,
      isActive: !1,
      inactiveReason: "",
      bonus: 0
    };
  }), n = /* @__PURE__ */ new Map();
  for (const f of r) {
    if (!f.catalogId) continue;
    const p = n.get(f.catalogId) ?? [];
    p.push(f), n.set(f.catalogId, p);
  }
  for (const f of r)
    f.excludedBy = f.excludesAny.filter((p) => (n.get(p) ?? []).length > 0);
  let o = !0;
  for (; o; ) {
    o = !1;
    for (const f of r) {
      const p = f.requiresAny.filter(
        (g) => (n.get(g) ?? []).some((y) => y.isActive)
      ), h = !f.isDuplicate && !!f.catalog && f.unresolvedGrantCount === 0 && f.excludedBy.length === 0 && (f.requiresAny.length === 0 || p.length > 0);
      f.isActive !== h && (f.isActive = h, o = !0), f.matchedRequirementIds.join("|") !== p.join("|") && (f.matchedRequirementIds = p);
    }
  }
  const l = Object.fromEntries(ht.map((f) => [f.code, 0])), c = Object.fromEntries(Bo.map((f) => [f, 0])), u = /* @__PURE__ */ new Map();
  for (const f of r) {
    const p = f.isActive ? f.selectedChoices : [], h = p.filter((y) => y.type === "skill"), g = p.filter((y) => y.type === "edgePool");
    f.bonus = h.length;
    for (const y of h)
      l[y.value] = Number(l[y.value] ?? 0) + 1;
    for (const y of g)
      c[y.value] = Number(c[y.value] ?? 0) + 1;
    f.inactiveReason = f.isActive ? "" : Ku(f, t), u.set(f.itemId, f);
  }
  for (const f of r)
    f.warningLabels = f.isActive ? Yu(s, f.selectedChoices, c) : [];
  const d = Ys.map((f) => {
    const p = r.find((h) => h.moduleType === f.moduleType && !h.isDuplicate) ?? null;
    return {
      moduleType: f.moduleType,
      label: f.label,
      availableEntries: e.filter((h) => h.moduleType === f.moduleType),
      state: p
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
function Qu(s = {}) {
  var t, i, a;
  const e = String((s == null ? void 0 : s.intent) ?? "").trim();
  return e === "skill" ? String(((t = s == null ? void 0 : s.data) == null ? void 0 : t.skillKey) ?? "").trim() : e === "attack" ? String(((a = (i = s == null ? void 0 : s.attack) == null ? void 0 : i.skill) == null ? void 0 : a.code) ?? "").trim() : "";
}
function Ju({ actor: s, resolved: e } = {}) {
  const t = Qu(e);
  return !s || !t ? [] : Jt(s).states.flatMap(
    (i) => i.isActive ? i.selectedChoices.filter((a) => a.type === "skill" && a.value === t).map((a) => ({
      id: `life-module:${i.itemId}:${_i(a)}`,
      label: i.label,
      value: 1,
      source: "Life Module",
      tooltip: `${i.label}: +1 to ${es(a)} rolls`
    })) : []
  );
}
const an = Object.freeze({
  weapon: S.itemType.personalWeapon,
  shadowamp: S.itemType.assetModule
}), Yo = Object.freeze({
  contact: "systems/mwd/img/default/mystery-man.svg",
  gear: "systems/mwd/img/default/Default_Gear.svg",
  quality: "systems/mwd/img/default/card-joker.svg",
  assetModule: "systems/mwd/img/default/upgrade.svg",
  skill: "systems/mwd/img/default/Default_Skill.svg",
  lifeModule: "systems/mwd/img/default/book.svg",
  mechWeapon: "systems/mwd/img/default/Default_Weapon.svg",
  personalWeapon: "systems/mwd/img/colt-m1911.svg",
  armor: "systems/mwd/img/default/Default_Armor.svg"
}), mi = Object.freeze(["close", "near", "far", "extreme"]), rn = Object.freeze({
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
});
function zi(s) {
  return Bi(s);
}
function nn(s = {}) {
  const e = Qn({
    traits: s.traits,
    keywords: s.keywords,
    report: Sr(),
    path: "system.traits"
  });
  return {
    traits: e.traits,
    keywords: e.keywords
  };
}
function Qo(s) {
  return s === "long" ? "extreme" : s === "short" ? "close" : s === "medium" ? "near" : mi.includes(s) ? s : "near";
}
function vi(s) {
  return {
    max: Qo((s == null ? void 0 : s.max) ?? "near"),
    close: Number((s == null ? void 0 : s.close) ?? (s == null ? void 0 : s.short) ?? 0) || 0,
    near: Number((s == null ? void 0 : s.near) ?? (s == null ? void 0 : s.medium) ?? 0) || 0,
    far: Number((s == null ? void 0 : s.far) ?? (s == null ? void 0 : s.long) ?? 0) || 0,
    extreme: Number((s == null ? void 0 : s.extreme) ?? 0) || 0
  };
}
function pa(s) {
  return {
    close: Number((s == null ? void 0 : s.close) ?? (s == null ? void 0 : s.short) ?? 0) || 0,
    near: Number((s == null ? void 0 : s.near) ?? (s == null ? void 0 : s.medium) ?? 0) || 0,
    far: Number((s == null ? void 0 : s.far) ?? (s == null ? void 0 : s.long) ?? 0) || 0,
    extreme: Number((s == null ? void 0 : s.extreme) ?? 0) || 0
  };
}
function on(s, e = 1) {
  const t = Number(s);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function ln(s, e = 0) {
  const t = Number(s);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function cn(s) {
  return String(s ?? "").trim();
}
function un(s) {
  return (Array.isArray(s) ? s : typeof s == "string" ? s.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function Xu(s) {
  const e = mi.indexOf(s);
  return e >= 0 ? e : mi.indexOf("near");
}
function Zu(s = vi({})) {
  const e = ["near", "close", "far", "extreme"], t = Xu(s.max);
  return e.find((i) => mi.indexOf(i) <= t) ?? "close";
}
function ed(s) {
  const e = Qo(s == null ? void 0 : s.max), t = mi.indexOf(e);
  return mi.map((i, a) => ({
    key: i,
    allowed: t >= 0 ? a <= t : a === 0,
    value: (s == null ? void 0 : s[i]) ?? void 0,
    labelkey: se.getFromList(se.getEnums().ranges, i)
  }));
}
function td(s, e, t, i) {
  let a = Number(e);
  if (t)
    if (i !== void 0)
      a += Math.ceil(Number(i) / 2);
    else
      return console.warn("Weapon not attached to an actor"), ye.item.personalWeapon.weaponWithoutActor;
  return a;
}
function id(s, e, t) {
  let i = "";
  return t && ye.attributes[t] && (i += ye.attributes[t].substring(0, 3).toUpperCase() + "/2 + "), i += String(e), i;
}
function sd(s, e) {
  return _.useArmor(s) ? e ? "noArmor" : "withArmor" : "";
}
function dn(s) {
  const e = game.system.mwd.skills.get(s);
  if (!e)
    return {
      img: Yo.skill,
      system: {
        code: s,
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
function fa(s = {}) {
  const e = ts(s), t = Qt(e.catalogId);
  return {
    system: e,
    ...t ? { name: t.label } : {}
  };
}
function ad(s) {
  const e = String(s ?? "").trim();
  return !!(!e || e.startsWith("icons/svg/") || e === "icons/mystery-man.svg");
}
var ss, rt, ja, Jo, Es;
const Le = class Le extends Item {
  static init() {
    F(this, ss) || (Pe(this, ss, !0), Hooks.on("createItem", (e, t, i) => {
      var a, r;
      Promise.resolve((a = e.onCreateItem) == null ? void 0 : a.call(e, t, i)).catch((n) => {
        console.error(`${ce}Item create hook failed`, n);
      }), M(r = Le, rt, ja).call(r, e);
    }), Hooks.on("updateItem", (e) => {
      var t;
      M(t = Le, rt, ja).call(t, e);
    }), Hooks.on("deleteItem", (e) => {
      var t;
      M(t = Le, rt, Jo).call(t, e);
    }), Hooks.on("createActiveEffect", (e) => {
      var t;
      M(t = Le, rt, Es).call(t, e);
    }), Hooks.on("updateActiveEffect", (e) => {
      var t;
      M(t = Le, rt, Es).call(t, e);
    }), Hooks.on("deleteActiveEffect", (e) => {
      var t;
      M(t = Le, rt, Es).call(t, e);
    }));
  }
  static canonicalType(e) {
    return an[e] ?? e;
  }
  static defaultIconForType(e) {
    return Yo[this.canonicalType(e)];
  }
  get canonicalType() {
    return this.constructor.canonicalType(this.type);
  }
  async onCreateItem(e, t) {
  }
  async _preCreate(e, t, i) {
    super._preCreate && await super._preCreate(e, t, i);
    const a = (e == null ? void 0 : e.type) ?? this.type, r = this.constructor.canonicalType(a), n = {};
    if (a !== r && an[a] && (n.type = r), ad((e == null ? void 0 : e.img) ?? this.img)) {
      const o = this.constructor.defaultIconForType(r);
      o && (n.img = o);
    }
    if (r === S.itemType.lifeModule && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (n.name = "MWD.itemType.singular.lifeModule"), r === S.itemType.lifeModule) {
      const o = fa((e == null ? void 0 : e.system) ?? this.system ?? {});
      n.system = o.system, o.name && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (n.name = o.name);
    }
    Object.keys(n).length && this.updateSource(n);
  }
  async _preUpdate(e, t, i) {
    var l, c;
    super._preUpdate && await super._preUpdate(e, t, i);
    const a = e != null && e.system ? foundry.utils.mergeObject(foundry.utils.deepClone(this.system ?? {}), foundry.utils.deepClone(e.system), { inplace: !1 }) : null;
    if (a && this.isPersonalWeapon()) {
      e.system ?? (e.system = {});
      const u = a.ammo, d = nn(a);
      e.system.standardTraits = [], e.system.payloads = At(a.payloads, { legacyAmmo: u, category: a.category }), e.system.consumptionSources = Hi(a.consumptionSources, { legacyAmmo: u }), e.system.selectedPayloadId = ki(
        a.selectedPayloadId,
        e.system.payloads,
        { legacyAmmo: u, category: a.category }
      ), e.system.traits = d.traits, e.system.keywords = d.keywords, e.system.resolution = Ts(a.resolution, "standard"), e.system.fireModes = ks(a.fireModes), e.system.attackRatingBand = pa(a.attackRatingBand), e.system.range = vi(a.range), e.system.damageType = pt(a.damageType), e.system["-=ammo"] = null, delete e.system.ammo;
    }
    if (a && this.isArmor() && (e.system ?? (e.system = {}), e.system.mitigationByType = mt(a.mitigationByType ?? a.mitigation), e.system.tags = ws(a.tags), e.system.traits = zi(a.traits), e.system.standardTraits = St(a.standardTraits), e.system.traitState = oa({
      standardTraits: e.system.standardTraits,
      traits: e.system.traits,
      traitState: a.traitState
    }).traitState), a && this.isLifeModule()) {
      const u = fa(a);
      e.system ?? (e.system = {}), foundry.utils.mergeObject(e.system, u.system, { inplace: !0, overwrite: !0 }), u.name && (e.name = u.name);
      return;
    }
    if (a && this.isQuality()) {
      e.system ?? (e.system = {});
      const u = tt(a);
      foundry.utils.mergeObject(e.system, u, { inplace: !0, overwrite: !0 });
      return;
    }
    if (a && this.isGear()) {
      e.system ?? (e.system = {}), e.system.quantity = on(a.quantity, 1), e.system.rating = ln(a.rating, 0), e.system.category = cn(a.category), e.system.tags = un(a.tags);
      return;
    }
    if (!this.isSkill()) return;
    const r = (l = e == null ? void 0 : e.system) == null ? void 0 : l.code;
    if (r === void 0) return;
    const n = this.system.code;
    if (r === n) return;
    const o = dn(r);
    o && ((c = o == null ? void 0 : o.system) == null || delete c.code, foundry.utils.mergeObject(e, o, { inplace: !0 }));
  }
  prepareBaseData() {
    super.prepareBaseData();
    const e = this.canonicalType;
    e === S.itemType.personalWeapon ? this._preparePersonalWeaponBaseData() : e === S.itemType.armor ? this._prepareArmorBaseData() : e === S.itemType.lifeModule ? this._prepareLifeModuleBaseData() : e === S.itemType.quality ? this._prepareQualityBaseData() : e === S.itemType.gear && this._prepareGearBaseData();
  }
  _preparePersonalWeaponBaseData() {
    const e = this.system ?? {}, t = e.ammo;
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = pt(e.damageType), e.attackRatingBand = pa(e.attackRatingBand), e.range = vi(e.range);
    const i = nn(e);
    e.standardTraits = [], e.traits = i.traits, e.keywords = i.keywords, e.resolution = Ts(e.resolution, "standard"), e.fireModes = ks(e.fireModes), e.payloads = At(e.payloads, { legacyAmmo: t, category: e.category }), e.consumptionSources = Hi(e.consumptionSources, { legacyAmmo: t }), e.selectedPayloadId = ki(e.selectedPayloadId, e.payloads, { legacyAmmo: t, category: e.category }), delete e.ammo, e.notes = String(e.notes ?? "").trim();
  }
  _prepareArmorBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.rating = Math.max(0, Number(e.rating ?? 0)), e.defenseBonus = Number(e.defenseBonus ?? 0) || 0, e.mitigationByType = mt(e.mitigationByType ?? e.mitigation), delete e.mitigation, e.durability ?? (e.durability = {}), e.durability.max = Math.max(0, Number(e.durability.max ?? e.rating ?? 0)), e.durability.current = Math.min(
      e.durability.max,
      Math.max(0, Number(e.durability.current ?? e.durability.max ?? e.rating ?? 0))
    ), e.standardTraits = St(e.standardTraits), e.tags = ws(e.tags), e.traits = zi(e.traits), e.traitState = oa({
      standardTraits: e.standardTraits,
      traits: e.traits,
      traitState: e.traitState
    }).traitState, e.notes = String(e.notes ?? "").trim();
  }
  _prepareLifeModuleBaseData() {
    const e = fa(this.system ?? {});
    foundry.utils.mergeObject(this.system, e.system, { inplace: !0, overwrite: !0 });
  }
  _prepareQualityBaseData() {
    const e = tt(this.system ?? {});
    foundry.utils.mergeObject(this.system, e, { inplace: !0, overwrite: !0 });
  }
  _prepareGearBaseData() {
    const e = this.system ?? {};
    e.quantity = on(e.quantity, 1), e.rating = ln(e.rating, 0), e.category = cn(e.category), e.tags = un(e.tags);
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
      var a, r;
      const i = (r = (a = t.flags) == null ? void 0 : a[T]) == null ? void 0 : r[Le.EQUIPPED_EFFECT_FLAG];
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
    const a = /* @__PURE__ */ new Map();
    for (const g of t) {
      const y = (h = (p = (f = g.flags) == null ? void 0 : f[T]) == null ? void 0 : p[Le.EQUIPPED_EFFECT_FLAG]) == null ? void 0 : h.sourceEffectId;
      if (!y) continue;
      const b = a.get(y) ?? [];
      b.push(g), a.set(y, b);
    }
    const r = [], n = [], o = [], l = new Set(i.map((g) => g.id));
    for (const [g, y] of a.entries()) {
      if (!l.has(g)) {
        o.push(...y.map((b) => b.id));
        continue;
      }
      y.length > 1 && o.push(...y.slice(1).map((b) => b.id));
    }
    for (const g of i) {
      const b = (a.get(g.id) ?? [])[0] ?? null, A = this._prepareSyncedActorEffectData(g);
      b ? n.push({ _id: b.id, ...A }) : r.push(A);
    }
    const c = o.length ? await e.deleteEmbeddedDocuments("ActiveEffect", o) : [], u = n.length ? await e.updateEmbeddedDocuments("ActiveEffect", n) : [];
    return { created: r.length ? await e.createEmbeddedDocuments("ActiveEffect", r) : [], updated: u, deleted: c };
  }
  _prepareSyncedActorEffectData(e) {
    const t = e.toObject();
    delete t._id;
    const i = String(e.name ?? "Effect").trim() || "Effect", a = String(this.name ?? "Item").trim() || "Item", r = i.startsWith(a) ? i : `${a}: ${i}`;
    return t.name = r, t.transfer = !1, t.origin = e.uuid ?? this.uuid ?? t.origin ?? null, t.flags = foundry.utils.mergeObject(t.flags ?? {}, {
      [T]: {
        [Le.EQUIPPED_EFFECT_FLAG]: {
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
    this.parent && await ut.itemAttributeRoll(this, e);
  }
  async switchMonitorCheck(e, t, i, a = void 0) {
    await _.switchMonitorCheck(this.parent, e, t, i, a, this);
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
    const a = this._computeModifierImpact(t, i);
    this._applyModifierUpdate(e, a);
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
    await this._mutateModifiers((i) => i.map((a) => (a.id === e && t(a), a)));
  }
  async _mutateModifiers(e = (t) => t) {
    const t = e(this.system.modifiers);
    Q.reindexIds(t), await this.update({ "system.modifiers": t });
  }
  async _mutateQualitySystem(e = (t) => t) {
    const t = e(foundry.utils.deepClone(tt(this.system ?? {})));
    await this.update({ system: tt(t) });
  }
  async createQualityPrerequisite(e = {}) {
    await this._mutateQualitySystem((t) => (t.prerequisites = Tt(t.prerequisites).concat([{
      id: e.id ?? foundry.utils.randomID(),
      fact: e.fact ?? "",
      comparator: e.comparator ?? "eq",
      value: e.value ?? ""
    }]), t));
  }
  async deleteQualityPrerequisite(e) {
    await this._mutateQualitySystem((t) => (t.prerequisites = Tt(t.prerequisites).filter((i) => i.id !== e), t));
  }
  async updateQualityPrerequisite(e, t, i) {
    await this._mutateQualitySystem((a) => (a.prerequisites = Tt(a.prerequisites).map((r) => (r.id !== e || (t === "fact" && (r.fact = i), t === "comparator" && (r.comparator = i), t === "value" && (r.value = i)), r)), a));
  }
  async createQualityEffect(e = {}) {
    await this._mutateQualitySystem((t) => (t.effects = si(t.effects).concat([{
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
      conditions: Tt(e.conditions ?? []),
      limit: Yt(e.limit ?? {})
    }]), t));
  }
  async deleteQualityEffect(e) {
    await this._mutateQualitySystem((t) => (t.effects = si(t.effects).filter((i) => i.id !== e), t));
  }
  async updateQualityEffect(e, t, i) {
    await this._mutateQualitySystem((a) => (a.effects = si(a.effects).map((r) => (r.id !== e || (t === "type" && (r.type = i), t === "phase" && (r.phase = i), t === "selector" && (r.selector = i), t === "skillKeys" && (r.skillKeys = Array.isArray(i) ? i : []), t === "label" && (r.label = i), t === "value" && (r.value = Number(i ?? 0) || 0), t === "min" && (r.min = i === "" ? null : Number(i ?? 0)), t === "max" && (r.max = i === "" ? null : Number(i ?? 0)), t === "pool" && (r.pool = i), t === "operation" && (r.operation = i), t === "limit.perActivation" && (r.limit = Yt({ ...r.limit ?? {}, perActivation: i })), t === "limit.perRound" && (r.limit = Yt({ ...r.limit ?? {}, perRound: i })), t === "limit.perScene" && (r.limit = Yt({ ...r.limit ?? {}, perScene: i }))), r)), a));
  }
  async createQualityEffectCondition(e, t = {}) {
    await this._mutateQualitySystem((i) => (i.effects = si(i.effects).map((a) => (a.id !== e || (a.conditions = Tt(a.conditions).concat([{
      id: t.id ?? foundry.utils.randomID(),
      fact: t.fact ?? "",
      comparator: t.comparator ?? "eq",
      value: t.value ?? ""
    }])), a)), i));
  }
  async deleteQualityEffectCondition(e, t) {
    await this._mutateQualitySystem((i) => (i.effects = si(i.effects).map((a) => (a.id !== e || (a.conditions = Tt(a.conditions).filter((r) => r.id !== t)), a)), i));
  }
  async updateQualityEffectCondition(e, t, i, a) {
    await this._mutateQualitySystem((r) => (r.effects = si(r.effects).map((n) => (n.id !== e || (n.conditions = Tt(n.conditions).map((o) => (o.id !== t || (i === "fact" && (o.fact = a), i === "comparator" && (o.comparator = a), i === "value" && (o.value = a)), o))), n)), r));
  }
  async _mutateWeaponStandardTraits(e = (t) => t) {
    var i;
    const t = e(foundry.utils.deepClone(ri((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": ri(t) });
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
    await this._mutateWeaponStandardTraits((a) => a.map((r) => (r.id !== e || (t === "key" && (r.key = i), t === "rating" && (r.rating = Math.max(0, Number(i ?? 0) || 0))), r)));
  }
  async _mutateArmorStandardTraits(e = (t) => t) {
    var i;
    const t = e(foundry.utils.deepClone(St((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": St(t) });
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
    await this._mutateArmorStandardTraits((a) => a.map((r) => (r.id !== e || (t === "key" && (r.key = i), t === "rating" && (r.rating = Math.max(0, Number(i ?? 0) || 0))), r)));
  }
  async _mutatePayloads(e = (t) => t) {
    var a, r, n, o, l, c, u;
    const t = e(foundry.utils.deepClone(
      At((a = this.system) == null ? void 0 : a.payloads, {
        legacyAmmo: (r = this.system) == null ? void 0 : r.ammo,
        category: ((n = this.system) == null ? void 0 : n.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
      })
    )).map(qe), i = ki((l = this.system) == null ? void 0 : l.selectedPayloadId, t, {
      category: ((c = this.system) == null ? void 0 : c.category) ?? ((u = this.system) == null ? void 0 : u.weaponCategory)
    });
    await this.update({
      "system.payloads": t,
      "system.selectedPayloadId": i,
      "system.-=ammo": null
    });
  }
  async _mutateConsumptionSources(e = (t) => t) {
    var i, a;
    const t = e(foundry.utils.deepClone(
      Hi((i = this.system) == null ? void 0 : i.consumptionSources, { legacyAmmo: (a = this.system) == null ? void 0 : a.ammo })
    )).map(kt);
    await this.update({
      "system.consumptionSources": t,
      "system.-=ammo": null
    });
  }
  async updatePayloadField(e, t, i) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((a) => a.map((r) => r.id !== e ? r : (foundry.utils.setProperty(r, t, i), qe(r))));
  }
  async createPayload(e = {}) {
    await this._mutatePayloads((t) => t.concat([qe({
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
    var r, n, o, l, c;
    if (String(e ?? "").trim() === "unloaded") return;
    const t = ((r = this.system) == null ? void 0 : r.category) ?? ((n = this.system) == null ? void 0 : n.weaponCategory), i = At((o = this.system) == null ? void 0 : o.payloads, {
      legacyAmmo: (l = this.system) == null ? void 0 : l.ammo,
      category: t
    }).filter((u) => u.id !== e), a = ((c = i[0]) == null ? void 0 : c.id) ?? "unloaded";
    await this.update({
      "system.payloads": i.length ? i : At([], { category: t }),
      "system.selectedPayloadId": i.some((u) => {
        var d;
        return u.id === ((d = this.system) == null ? void 0 : d.selectedPayloadId);
      }) ? this.system.selectedPayloadId : i.length ? a : "",
      "system.-=ammo": null
    });
  }
  async createPayloadStandardTrait(e, t = {}) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((a) => a.id !== e ? a : (a.modifies ?? (a.modifies = {}), a.modifies.standardTraits = ri(a.modifies.standardTraits).concat([{
      id: t.id ?? foundry.utils.randomID(),
      key: t.key ?? "armorPiercing",
      rating: Math.max(0, Number(t.rating ?? 0) || 0)
    }]), qe(a))));
  }
  async deletePayloadStandardTrait(e, t) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((a) => a.id !== e ? a : (a.modifies ?? (a.modifies = {}), a.modifies.standardTraits = ri(a.modifies.standardTraits).filter((r) => r.id !== t), qe(a))));
  }
  async updatePayloadStandardTrait(e, t, i, a) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((r) => r.map((n) => n.id !== e ? n : (n.modifies ?? (n.modifies = {}), n.modifies.standardTraits = ri(n.modifies.standardTraits).map((o) => (o.id !== t || (i === "key" && (o.key = a), i === "rating" && (o.rating = Math.max(0, Number(a ?? 0) || 0))), o)), qe(n))));
  }
  async createConsumptionSource(e = {}) {
    await this._mutateConsumptionSources((t) => t.concat([kt({
      id: e.id ?? foundry.utils.randomID(),
      label: e.label ?? "Source",
      kind: e.kind ?? "internal",
      tracking: e.tracking ?? { current: 0, max: 0 },
      link: e.link ?? {}
    })]));
  }
  async deleteConsumptionSource(e) {
    await this._mutateConsumptionSources((t) => t.filter((i) => i.id !== e)), await this._mutatePayloads((t) => t.map((i) => {
      var a;
      return ((a = i == null ? void 0 : i.consumption) == null ? void 0 : a.sourceId) !== e ? i : (i.consumption.sourceId = "", qe(i));
    }));
  }
  async updateConsumptionSourceField(e, t, i) {
    await this._mutateConsumptionSources((a) => a.map((r) => r.id !== e ? r : (foundry.utils.setProperty(r, t, i), kt(r))));
  }
  getPayloadState({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var i, a, r, n, o;
    return Oa({
      payloads: (i = this.system) == null ? void 0 : i.payloads,
      selectedPayloadId: (a = this.system) == null ? void 0 : a.selectedPayloadId,
      consumptionSources: (r = this.system) == null ? void 0 : r.consumptionSources,
      actor: this.actor ?? null,
      payloadId: e || t,
      category: ((n = this.system) == null ? void 0 : n.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
    });
  }
  getActivePayloadReloadState({ payloadId: e = "", ammoTypeId: t = "", user: i = game.user } = {}) {
    var p, h, g;
    const a = String(((p = this.system) == null ? void 0 : p.category) ?? ((h = this.system) == null ? void 0 : h.weaponCategory) ?? "").trim().toLowerCase(), r = {
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
      return { ...r, reason: "Only personal weapons can be reloaded from this sheet." };
    if (!this.actor)
      return { ...r, reason: "Reload is only available for weapons owned by an actor." };
    if (a === "melee")
      return { ...r, reason: "Melee weapons do not use reloadable payloads." };
    const n = this.getPayloadState({ payloadId: e || t }), o = (n == null ? void 0 : n.sourceState) ?? null, l = (n == null ? void 0 : n.source) ?? null, c = String((n == null ? void 0 : n.activePayloadId) ?? "").trim(), u = String((n == null ? void 0 : n.payloadLabel) ?? "").trim() || "Unloaded", d = Math.max(0, Number((o == null ? void 0 : o.current) ?? 0) || 0), m = Math.max(0, Number((o == null ? void 0 : o.max) ?? 0) || 0), f = !!((g = ne.getCombat(this.actor)) != null && g.combatant);
    return !c || c === "unloaded" ? {
      ...r,
      reason: "Select a payload before reloading.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: n,
      source: l,
      sourceState: o,
      current: d,
      max: m,
      inCombat: f
    } : o != null && o.isTracked ? o.kind !== "internal" ? {
      ...r,
      reason: "Linked ammo sources are read-only from the weapon sheet.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: n,
      source: l,
      sourceState: o,
      current: d,
      max: m,
      inCombat: f
    } : m <= 0 ? {
      ...r,
      reason: "This payload source has no reloadable capacity.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: n,
      source: l,
      sourceState: o,
      current: d,
      max: m,
      inCombat: f
    } : f && !(i != null && i.isGM) ? {
      ...r,
      reason: "Only a GM can reload from the weapon sheet during combat.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: n,
      source: l,
      sourceState: o,
      current: d,
      max: m,
      inCombat: f
    } : d >= m ? {
      ...r,
      reason: "Magazine already full.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: n,
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
      payloadState: n,
      source: l,
      sourceState: o,
      current: d,
      max: m,
      inCombat: f
    } : {
      ...r,
      reason: "This payload is untracked and does not need to be reloaded.",
      payloadLabel: u,
      activePayloadId: c,
      payloadState: n,
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
    var a;
    const i = this.getActivePayloadReloadState({ payloadId: e, ammoTypeId: t });
    return !i.canReload || !((a = i.source) != null && a.id) ? { ok: !1, ...i } : (await this._mutateConsumptionSources((r) => r.map((n) => {
      var o;
      return n.id !== i.source.id ? n : (n.tracking ?? (n.tracking = {}), n.tracking.max = Math.max(0, Number(((o = n.tracking) == null ? void 0 : o.max) ?? i.max) || i.max), n.tracking.current = i.max, kt(n));
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
    var i, a, r, n, o, l;
    const t = ki(
      e,
      At((i = this.system) == null ? void 0 : i.payloads, {
        legacyAmmo: (a = this.system) == null ? void 0 : a.ammo,
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
    var a;
    const i = this.getPayloadState({ payloadId: e || t });
    return (a = i == null ? void 0 : i.sourceState) != null && a.isTracked ? Number(i.sourceState.current ?? 0) >= Number(i.sourceState.consumePerUse ?? 1) : !0;
  }
  async consumePayload({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var n;
    const i = this.getPayloadState({ payloadId: e || t });
    if (!((n = i == null ? void 0 : i.sourceState) != null && n.isTracked)) return !0;
    const a = Math.max(1, Number(i.sourceState.consumePerUse ?? 1) || 1), r = Math.max(0, Number(i.sourceState.current ?? 0) || 0);
    return r < a ? !1 : i.sourceState.kind === "internal" ? (await this._mutateConsumptionSources((o) => o.map((l) => {
      var c;
      return l.id !== ((c = i.source) == null ? void 0 : c.id) ? l : (l.tracking ?? (l.tracking = {}), l.tracking.current = Math.max(0, r - a), kt(l));
    })), !0) : i.sourceState.kind === "actorResource" && this.actor && i.sourceState.currentPath ? (await this.actor.update({
      [i.sourceState.currentPath]: Math.max(0, r - a)
    }), !0) : i.sourceState.kind === "itemRef" && i.sourceState.sourceItem && i.sourceState.currentPath ? (await i.sourceState.sourceItem.update({
      [i.sourceState.currentPath]: Math.max(0, r - a)
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
    const a = t === "name" ? "label" : t === "damageType" ? "modifies.damageType" : t === "apMod" ? "modifies.ap" : t.startsWith("attackRatingBandMod.") ? `modifies.attackRatingBand.${t.split(".")[1]}` : t === "traits" ? "traits" : t === "keywords" ? "keywords" : t;
    await this.updatePayloadField(e, a, i);
  }
  async createAmmoTypeStandardTrait(e, t = {}) {
    await this.createPayloadStandardTrait(e, t);
  }
  async deleteAmmoTypeStandardTrait(e, t) {
    await this.deletePayloadStandardTrait(e, t);
  }
  async updateAmmoTypeStandardTrait(e, t, i, a) {
    await this.updatePayloadStandardTrait(e, t, i, a);
  }
  getCombatProfile({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    if (!this.isPersonalWeapon()) return null;
    const i = this.system ?? {}, a = vi(i.range), r = String(i.skill ?? "").trim(), n = at(r), o = Number(i.damage ?? 0) || 0, l = String(i.category ?? i.weaponCategory ?? "ranged").trim() || "ranged", c = pc({
      damageType: i.damageType,
      ap: Number(i.ap ?? i.armorPiercing ?? 0) || 0,
      attackRatingBand: pa(i.attackRatingBand),
      traits: zi(i.traits),
      keywords: ec(i.keywords),
      standardTraits: [],
      resolution: Ts(i.resolution, "standard"),
      fireModes: ks(i.fireModes),
      payloads: At(i.payloads, { legacyAmmo: i.ammo, category: l }),
      selectedPayloadId: ki(i.selectedPayloadId, i.payloads, { legacyAmmo: i.ammo, category: l }),
      consumptionSources: Hi(i.consumptionSources, { legacyAmmo: i.ammo }),
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
      damageTypeLabel: vt(c.damageType),
      attackRatingBand: c.attackRatingBand,
      range: a,
      defaultRangeBand: this.getDefaultRangeBand(a),
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
    const t = this.system ?? {}, i = Math.max(0, Number(t.rating ?? 0)), a = Math.max(0, Number(((d = t == null ? void 0 : t.durability) == null ? void 0 : d.max) ?? i)), r = Math.min(
      a,
      Math.max(0, Number(((m = t == null ? void 0 : t.durability) == null ? void 0 : m.current) ?? a))
    ), n = Math.min(i, r), o = mt((t == null ? void 0 : t.mitigationByType) ?? (t == null ? void 0 : t.mitigation)), l = oa({
      standardTraits: St(t == null ? void 0 : t.standardTraits),
      traits: zi(t == null ? void 0 : t.traits),
      traitState: t == null ? void 0 : t.traitState
    }), c = ws(t == null ? void 0 : t.tags), u = Ar(n);
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
      currentArmorRating: n,
      ratingCurrent: n,
      remainingDurability: r,
      baseMitigation: u,
      baseResistance: u,
      mitigationByType: uo(o, l.mitigationByType),
      tags: c,
      isDestroyed: r <= 0,
      durability: {
        current: r,
        max: a
      },
      traitState: l.traitState,
      standardTraits: St(t.standardTraits),
      traits: fc({
        traits: zi(t.traits),
        standardTraits: St(t.standardTraits)
      }),
      notes: String(t.notes ?? "").trim()
    };
  }
  getDefaultRangeBand(e = vi(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    return Zu(e);
  }
  isWeaponSkill(e) {
    return ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === S.itemType.skill && e.system.code === this.system.skill;
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find((a) => this.isWeaponSkill(a));
    if (e) return e;
    const t = game.items.find((a) => this.isWeaponSkill(a));
    return t || dn(this.system.skill);
  }
  getDefense() {
    if (!this.isPersonalWeapon())
      return this.system.defense ? Se.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return Se.fixedDefenseCode(this.system.defense);
    const e = at(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? Se.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent) return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0, i = this.isPersonalWeapon() ? this.getCombatProfile() : null;
    return {
      value: td(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: (i == null ? void 0 : i.damageType) ?? this.system.damageType,
      damageTypeLabel: (i == null ? void 0 : i.damageTypeLabel) ?? this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: sd(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  getDamageCode() {
    return id(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  getDamageTypeLabel() {
    var t;
    if (this.isPersonalWeapon())
      return vt(((t = this.getCombatProfile()) == null ? void 0 : t.damageType) ?? this.system.damageType);
    const e = ye.mwd.weaponDamageType[this.system.damageType] ?? ye.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return ed(vi(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  validateTargets(e) {
    var n;
    const t = (n = this.getDamage()) == null ? void 0 : n.monitor, i = et.getTargetTokens(game.user), a = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), r = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (r.length > 0) {
      const o = pe(ye.common.errors.ignoredTargets, {
        targets: r.reduce(Q.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (a.length === 0) {
      const o = pe(ye.common.errors.noTargetSelected, {
        weapon: this.name ?? ye.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(a);
    return a;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = rn[t] ?? {};
    fi.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = rn[t] ?? {};
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
ss = new WeakMap(), rt = new WeakSet(), ja = async function(e) {
  if (typeof (e == null ? void 0 : e.syncEquippedActorEffects) == "function")
    try {
      await e.syncEquippedActorEffects();
    } catch (t) {
      console.error(`${ce}Failed to sync equipped item effects`, { item: e, error: t });
    }
}, Jo = async function(e) {
  if (typeof (e == null ? void 0 : e.removeSyncedActorEffects) == "function")
    try {
      await e.removeSyncedActorEffects({ actor: e.actor ?? e.parent ?? null });
    } catch (t) {
      console.error(`${ce}Failed to remove synced item effects`, { item: e, error: t });
    }
}, Es = async function(e) {
  const t = e == null ? void 0 : e.parent;
  if (typeof (t == null ? void 0 : t.syncEquippedActorEffects) == "function")
    try {
      await t.syncEquippedActorEffects();
    } catch (i) {
      console.error(`${ce}Failed to sync parent item effects`, { effect: e, error: i });
    }
}, be(Le, rt), be(Le, ss, !1), N(Le, "RANGE_ORDER", mi), N(Le, "EQUIPPED_EFFECT_FLAG", "equippedItemSync"), N(Le, "DEFAULT_UNARMED", Object.freeze({
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
let $i = Le;
const mn = {
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
}, rd = {
  code: "weapon-range",
  options: {
    flags: { editable: !0 },
    order: 20,
    category: le.pool,
    labelkey: ye.common.roll.modifiers.weaponRange,
    hbsTemplateRoll: `${G}/roll/parts/select-option.hbs`,
    hbsTemplateChat: void 0
    //``
  },
  isUsed: (s) => !0,
  condition: (s) => s.weapon,
  factory: (s) => {
    const e = s.weapon.getRanges(), t = e.map((i) => i.value);
    return {
      value: e[0].value,
      min: Math.min(...t),
      max: Math.max(...t),
      choices: e,
      selected: e[0].labelkey
    };
  }
}, nd = {
  code: "weapon-area",
  options: {
    used: !0,
    order: 20,
    category: le.pool,
    labelkey: ye.common.roll.modifiers.weaponArea,
    hbsTemplateRoll: `${G}/roll/parts/input-numeric.hbs`,
    hbsTemplateChat: void 0
    //``
  },
  isUsed: (s) => s.used,
  condition: (s) => s.weapon && s.weapon.getArea() != S.area.none,
  factory: (s) => {
    var i;
    const e = ((i = s.targeting.targetedTokenIds) == null ? void 0 : i.length) ?? 1, t = s.weapon.getAreaModifier(e);
    return {
      value: t,
      min: Math.min(0, t),
      max: Math.max(0, t),
      used: e > 1
    };
  }
}, de = class de extends $i {
  static init() {
    Hooks.once(Ee.REGISTER_ROLL_PARAMETERS, (e) => {
      e(nd), e(rd);
    });
  }
  prepareBaseData() {
    if (super.prepareBaseData(), (this.canonicalType ?? this.type) !== S.itemType.personalWeapon) return;
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = pt(e.damageType), e.attackRatingBand = de.normalizeAttackRatingBand(e.attackRatingBand), e.range = de.normalizeRangeData(e.range), e.traits = de.normalizeTraits(e.traits), e.notes = String(e.notes ?? "").trim();
  }
  static maxIndex(e) {
    const t = de.RANGE_ORDER.indexOf(e);
    return t >= 0 ? t : de.RANGE_ORDER.indexOf("near");
  }
  /**
    * Compute UI-friendly range band data:
    * - cap: normalized max band
    * - bands: [{key, allowed, value}]
    * - optimalKey: highest value among allowed (tie -> closest)
    */
  static getRangeBands(e) {
    const t = e ?? {}, i = de.normalizeRangeKey(t.max ?? "near"), a = de.maxIndex(i), r = de.RANGE_ORDER.map((l, c) => ({
      key: l,
      allowed: c <= a,
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
    return e === S.itemType.mechWeapon ? "systems/mwd/img/default/Default_Weapon.svg" : this.defaultIcon;
  }
  static normalizeTraits(e) {
    return Bi(e);
  }
  static normalizeRangeData(e) {
    return {
      max: de.normalizeRangeKey((e == null ? void 0 : e.max) ?? "near"),
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
    const t = this.system ?? {}, i = this.canonicalType ?? this.type, a = de.normalizeRangeData(t.range), r = String(t.skill ?? "").trim(), n = at(r), o = Number(t.damage ?? 0) || 0, l = Number(t.ap ?? t.armorPiercing ?? 0) || 0, c = String(t.category ?? t.weaponCategory ?? "ranged").trim() || "ranged", u = de.normalizeTraits(t.traits);
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
      damageType: i === S.itemType.personalWeapon ? pt(t.damageType) : String(t.damageType ?? "kinetic").trim() || "kinetic",
      attackRatingBand: de.normalizeAttackRatingBand(t.attackRatingBand),
      range: a,
      defaultRangeBand: this.getDefaultRangeBand(a),
      traits: u,
      effects: {},
      notes: String(t.notes ?? t.description ?? "").trim()
    };
  }
  getDefaultRangeBand(e = de.normalizeRangeData(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    const i = ["near", "close", "far", "extreme"], a = de.maxIndex(e.max);
    return i.find((r) => de.RANGE_ORDER.indexOf(r) <= a) ?? "close";
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find(
      (a) => a.type === S.itemType.skill && a.system.code === this.system.skill
    );
    if (e) return e;
    const t = at(String(this.system.skill ?? "").trim());
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
      return this.system.defense ? Se.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return Se.fixedDefenseCode(this.system.defense);
    const e = at(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? Se.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent)
      return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0;
    return {
      value: de.damageValue(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: this.system.damageType,
      damageTypeLabel: this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: de.armorMode(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  static damageValue(e, t, i, a) {
    if (t = Number(t), i)
      if (a !== void 0)
        t = t + Math.ceil(Number(a) / 2);
      else
        return console.warn("Weapon not attached to an actor"), ye.item.personalWeapon.weaponWithoutActor;
    return t;
  }
  getDamageCode() {
    return de.damageCode(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  static damageCode(e, t, i) {
    let a = "";
    return i && ye.attributes[i] && (a += ye.attributes[i].substring(0, 3).toUpperCase() + "/2 + "), a += String(t), a;
  }
  static armorMode(e, t) {
    return _.useArmor(e) ? t ? "noArmor" : "withArmor" : "";
  }
  getDamageTypeLabel() {
    if ((this.canonicalType ?? this.type) === S.itemType.personalWeapon)
      return vt(this.system.damageType);
    const e = ye.mwd.weaponDamageType[this.system.damageType] ?? ye.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return de.getRangeList(de.normalizeRangeData(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  _getRange(e) {
    return { value: this.system.range[e], labelkey: se.getFromList(se.getEnums().ranges, e) };
  }
  static getRangeList(e) {
    const t = de.normalizeRangeKey(e == null ? void 0 : e.max), i = de.RANGE_ORDER.indexOf(t);
    return de.RANGE_ORDER.map((a, r) => ({
      key: a,
      allowed: i >= 0 ? r <= i : r === 0,
      value: (e == null ? void 0 : e[a]) ?? (a === "extreme" && (e == null ? void 0 : e.long) !== void 0 ? e.long : void 0),
      labelkey: se.getFromList(se.getEnums().ranges, a)
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
    const t = (n = this.getDamage()) == null ? void 0 : n.monitor, i = et.getTargetTokens(game.user), a = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), r = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (r.length > 0) {
      const o = pe(ye.common.errors.ignoredTargets, {
        targets: r.reduce(Q.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (a.length == 0) {
      const o = pe(ye.common.errors.noTargetSelected, {
        weapon: this.name ?? ye.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(a);
    return a;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = mn[t] ?? {};
    fi.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = mn[t] ?? {};
    return i.targets && i.adjust && e <= i.targets ? i.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area == "" ? S.area.none : this.system.area ?? S.area.none;
  }
  _getMonitor() {
    return (this.canonicalType ?? this.type) === S.itemType.personalWeapon ? S.monitors.physical : this.system.monitor || S.monitors.physical;
  }
};
N(de, "RANGE_ORDER", ["close", "near", "far", "extreme"]), N(de, "DEFAULT_UNARMED", $i.DEFAULT_UNARMED);
let st = de;
function od(s) {
  const e = [];
  for (let [t, i] of Object.entries(s ?? {}))
    i !== void 0 && (t = t.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (a, r) => (r ? "-" : "") + a.toLowerCase()), e.push(`data-${t}="${Handlebars.escapeExpression(i)}"`));
  return new Handlebars.SafeString(e.join(" "));
}
function ld({ hash: s }) {
  return s;
}
function cd() {
  var s, e;
  return ((e = (s = foundry == null ? void 0 : foundry.applications) == null ? void 0 : s.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
class _r {
  constructor() {
    this.registerHelpers(), Hooks.once("init", () => {
      this.registerHelpers(), console.log(`${ce}Handlebars helpers registered (init)`);
    }), console.log(`${ce}Handlebars helpers registered (ctor)`);
  }
  registerHelpers() {
    const e = cd(), t = {
      // Foundry utils
      getProperty: foundry.utils.getProperty,
      // DND5E-inspired utilities
      "mwd-dataset": od,
      "mwd-object": ld,
      // Simple comparisons
      eq: (i, a) => i === a,
      ne: (i, a) => i !== a,
      // Strings/arrays
      concat: (...i) => Q.join(i.slice(0, -1)),
      join: (i, a = " ") => Array.isArray(i) ? i.join(a) : "",
      includes: (i, a) => i == null ? void 0 : i.includes(a),
      length: (i) => (i == null ? void 0 : i.length) || 0,
      substring: (i, a, r) => i == null ? void 0 : i.substring(a, r),
      toUpperCase: Ll.toUpperCaseNoAccent,
      // Math
      modulo: (i, a) => i % a,
      divint: Q.divint,
      divup: Q.divup,
      sum: (i, a) => i + a,
      diff: (i, a) => i - a,
      times: (i, a) => i * a,
      min: (i, a) => Math.min(i, a),
      max: (i, a) => Math.max(i, a),
      // Utility blocks
      for: _r.hbsForLoop,
      // fixes “Missing helper: for”
      range: (i, a) => Array.from({ length: a - i + 1 }, (r, n) => i + n),
      ifGte: (i, a, r) => i >= a ? r.fn(this) : r.inverse(this),
      // Damage / weapons (legacy-compatible)
      weaponDamageLetter: _l.letter,
      weaponDamageCode: st.damageCode,
      weaponDamageValue: st.damageValue,
      weaponArmorMode: st.armorMode,
      weaponRangeList: st.getRangeList,
      // Icons
      iconFA: W.fontAwesome,
      iconSrc: W.iconSystemPath,
      iconPath: W.iconPath,
      iconD6: W.iconD6,
      // Enums
      localizeAttribute: se.localizeAttribute
    };
    e.registerHelper(t), e !== Handlebars && Handlebars.registerHelper(t);
  }
  static hbsForLoop(e, t, i) {
    let a = "";
    for (let r = e; r < t; ++r) a += i.fn(r);
    return a;
  }
}
const pn = "sheetTheme", Ga = "mwd-theme-default", ud = "mwd-theme-sra", dd = [
  { name: "Default (CSB)", cssClass: Ga },
  { name: "SRA", cssClass: ud }
];
class md {
  constructor() {
    this.availableStyles = {}, ci.register(Ee.REGISTER_STYLES), Hooks.once(Ee.REGISTER_STYLES, (e) => dd.forEach((t) => e(t.cssClass, t.name))), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(Ee.REGISTER_STYLES, (e, t) => this.availableStyles[e] = t), console.log(ce + "Loaded styles", this.availableStyles), game.settings.register(T, pn, {
      scope: "world",
      name: "Sheet Theme",
      hint: "Select the visual theme used by MWD sheets.",
      config: !0,
      default: Ga,
      choices: this.availableStyles,
      type: String,
      onChange: () => {
        setTimeout(() => {
          var e, t;
          for (const i of Object.values(ui.windows ?? {})) {
            if (typeof (i == null ? void 0 : i.render) != "function") continue;
            const a = i.element instanceof HTMLElement ? i.element : (e = i.element) == null ? void 0 : e[0];
            (t = a == null ? void 0 : a.classList) != null && t.contains("actor-sheet-v2") && i.render(!1);
          }
        }, 0);
      }
    });
  }
  selectCssClass() {
    const e = game.settings.get(T, pn);
    return this.availableStyles[e] ? e : Ga;
  }
}
function Yi(s) {
  return s ? (s == null ? void 0 : s.document) ?? s : null;
}
function ha(s, e) {
  var i, a, r;
  if (!s) return null;
  const t = Yi(e) ?? Yi(s == null ? void 0 : s.token);
  return t ? t.isLinked ? t.baseActor ?? ((r = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : r.call(i, ((a = t == null ? void 0 : t.baseActor) == null ? void 0 : a.id) ?? "")) ?? t.actor ?? s : t.actor ?? s : s;
}
function fn(s) {
  const e = Number(s ?? 0);
  return Number.isFinite(e) ? Math.trunc(e) : 0;
}
function ms(s, e) {
  var t, i, a;
  return Math.max(0, Number(((a = (i = (t = s == null ? void 0 : s.system) == null ? void 0 : t.monitors) == null ? void 0 : i[e]) == null ? void 0 : a.value) ?? 0) || 0);
}
function hn(s) {
  var e, t;
  return Math.max(0, Number(((t = (e = s == null ? void 0 : s.system) == null ? void 0 : e.burn) == null ? void 0 : t.value) ?? 0) || 0);
}
function Ui(s) {
  return s === S.monitors.physical ? "Physical" : s === S.monitors.fatigue ? "Fatigue" : String(s ?? "").trim() || "Track";
}
function pd(s, e) {
  var t;
  return ((t = Mr(e).find((i) => i.id === s)) == null ? void 0 : t.label) ?? s;
}
function fd(s) {
  const e = foundry.utils.escapeHTML, t = [];
  if (s.mode === "attackDamage" || s.mode === "trackDelta") {
    const i = s.appliedDelta >= 0 ? "Applied" : "Recovered", a = Math.abs(Number(s.appliedDelta ?? 0)), r = a === 1 ? "point" : "points", n = s.usedArmor ? ` via armor-aware ${e(vt(s.damageType))}` : "";
    t.push(`<div><b>${i}:</b> ${a} ${r} to ${e(Ui(s.track))}${n}</div>`), s.usedArmor && s.mitigation && (t.push(
      `<div><b>Mitigation:</b> base ${Number(s.mitigation.baseMitigation ?? 0)} + type ${Number(s.mitigation.typeMitigationMod ?? 0)} - AP ${Number(s.effectiveAp ?? 0)} = ${Number(s.mitigation.netResistance ?? 0)}</div>`
    ), Number(s.mitigation.reinforcedMax ?? 0) > 0 && t.push(
      `<div><b>Reinforced:</b> ${Number(s.mitigation.reinforcedAfter ?? 0)}/${Number(s.mitigation.reinforcedMax ?? 0)}</div>`
    ));
  }
  if (s.mode === "burnDelta") {
    const i = s.appliedDelta >= 0 ? "Adjusted Burn +" : "Adjusted Burn -";
    t.push(`<div><b>${i}</b>${Math.abs(Number(s.appliedDelta ?? 0))}</div>`);
  }
  return s.mode === "status" && t.push(
    `<div><b>Status:</b> ${s.active ? "Applied" : "Removed"} ${e(s.statusLabel ?? s.statusId ?? "Status")}</div>`
  ), t.push(`<div><b>Target:</b> ${e(s.actorName ?? "Actor")}</div>`), s.beforeLabel && s.afterLabel && t.push(`<div><b>Result:</b> ${e(s.beforeLabel)} -> ${e(s.afterLabel)}</div>`), s.source && t.push(`<div><b>Source:</b> ${e(s.source)}</div>`), s.notes && t.push(`<div><b>Notes:</b> ${e(s.notes)}</div>`), `<div class="mwd-gm-notice"><b>GM Harm:</b>${t.join("")}</div>`;
}
function hd(s) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(s, e), s;
}
class Ze {
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
    return Mr(e).map((t) => ({
      value: t.id,
      label: t.label,
      active: t.active
    }));
  }
  static getSceneTarget() {
    var i, a;
    const e = Array.from(((i = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : i.controlled) ?? []);
    if (e.length > 1)
      return { actor: null, token: null, reason: "Select only one controlled token." };
    if (e.length === 1) {
      const r = Yi(e[0]), n = ha((r == null ? void 0 : r.actor) ?? null, r);
      return this._resolveSceneTargetResult(n, r);
    }
    const t = Array.from(((a = game.user) == null ? void 0 : a.targets) ?? []);
    if (t.length > 1)
      return { actor: null, token: null, reason: "Target only one token." };
    if (t.length === 1) {
      const r = Yi(t[0]), n = ha((r == null ? void 0 : r.actor) ?? null, r);
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
  static resolveTarget({ actor: e = null, token: t = null, actorId: i = "", preferSceneTarget: a = !1 } = {}) {
    var o, l;
    const r = Yi(t);
    if (r) {
      const c = ha((r == null ? void 0 : r.actor) ?? e, r), u = this._resolveSceneTargetResult(c, r);
      if (u.actor) return { ...u, source: "token" };
    }
    if (a) {
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
      reason: a && this.getSceneTarget().reason || "Choose a supported character target."
    };
  }
  static async apply({ actor: e = null, token: t = null, payload: i = {}, options: a = {} } = {}) {
    var l;
    const r = this.resolveTarget({
      actor: e,
      token: t,
      actorId: a.actorId ?? "",
      preferSceneTarget: !!a.preferSceneTarget
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
    if (a.logToChat) {
      const c = fd(o), u = hd({
        speaker: ChatMessage.getSpeaker({ actor: r.actor, token: r.token }),
        content: c
      });
      await ChatMessage.create(u);
    }
    return (l = ne.renderOpenCharacterSheets) == null || l.call(ne, r.actor.id), o;
  }
  static async _applyTrackDelta(e, t) {
    const i = (t == null ? void 0 : t.track) === S.monitors.fatigue ? S.monitors.fatigue : S.monitors.physical, a = fn((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0);
    if (!!(t != null && t.useArmor) && a > 0)
      return this._applyPersonalArmorAwareDamage(e, {
        mode: "trackDelta",
        track: i,
        damage: a,
        damageType: t == null ? void 0 : t.damageType,
        ap: (t == null ? void 0 : t.ap) ?? 0,
        effects: (t == null ? void 0 : t.effects) ?? {},
        source: t == null ? void 0 : t.source,
        notes: t == null ? void 0 : t.notes
      });
    const n = ms(e, i);
    await _.addCounter(e, i, a);
    const o = ms(e, i);
    return {
      mode: "trackDelta",
      track: i,
      requestedDelta: a,
      appliedDelta: o - n,
      usedArmor: !1,
      beforeLabel: `${Ui(i)} ${n}`,
      afterLabel: `${Ui(i)} ${o}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyBurnDelta(e, t) {
    var l, c;
    const i = fn((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0), a = hn(e), r = Math.max(0, a + i), n = { "system.burn.value": r };
    r === 0 && ((c = (l = e.system) == null ? void 0 : l.burn) != null && c.overloaded) && (n["system.burn.overloaded"] = !1), await e.update(n);
    const o = hn(e);
    return {
      mode: "burnDelta",
      requestedDelta: i,
      appliedDelta: o - a,
      beforeLabel: `Burn ${a}`,
      afterLabel: `Burn ${o}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyStatus(e, t) {
    const i = String((t == null ? void 0 : t.statusId) ?? (t == null ? void 0 : t.status) ?? "").trim();
    if (!i)
      return { mode: "status", statusId: "", active: !1, statusLabel: "Status", beforeLabel: "", afterLabel: "" };
    const a = xs(e, i), r = !!(t != null && t.active);
    await ko({ actor: e, statusId: i, active: r });
    const n = xs(e, i);
    return {
      mode: "status",
      statusId: i,
      statusLabel: pd(i, e),
      active: n,
      beforeLabel: a ? "Active" : "Inactive",
      afterLabel: n ? "Active" : "Inactive",
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyAttackDamage(e, t) {
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
    });
  }
  static async _applyPersonalArmorAwareDamage(e, t) {
    var Y, K, O, R, U, B, te, he, ge;
    const i = (t == null ? void 0 : t.track) === S.monitors.fatigue ? S.monitors.fatigue : S.monitors.physical, a = Math.max(0, Number((t == null ? void 0 : t.damage) ?? 0) || 0), r = Math.max(0, Number((t == null ? void 0 : t.netHits) ?? 0) || 0), n = (t == null ? void 0 : t.effects) ?? {}, o = ((Y = e.getPersonalCombatLoadout) == null ? void 0 : Y.call(e, { refresh: !0 })) ?? null, l = (o == null ? void 0 : o.activeArmor) ?? null, c = Math.max(0, Number((l == null ? void 0 : l.currentArmorRating) ?? ((K = l == null ? void 0 : l.durability) == null ? void 0 : K.current) ?? 0) || 0), u = pt(t == null ? void 0 : t.damageType, "concussive"), d = ms(e, i);
    let m = a + r;
    const f = c > 0 ? gc({
      damageIncoming: m,
      armorTags: (l == null ? void 0 : l.tags) ?? [],
      effects: n
    }) : { damageIncoming: m, applied: [] };
    m = f.damageIncoming;
    const p = hc({
      currentArmorRating: c,
      mitigationByType: (l == null ? void 0 : l.mitigationByType) ?? {},
      damageType: u
    }), h = Math.max(
      0,
      (Number((t == null ? void 0 : t.ap) ?? 0) || 0) + (Number((n == null ? void 0 : n.ap) ?? 0) || 0)
    ), g = p.isDestroyed ? 0 : Math.max(0, p.baseMitigation + p.typeMitigationMod - h);
    let y = Math.max(0, Math.ceil(m - g));
    const b = {
      snapshot: ((O = ne.getSnapshot) == null ? void 0 : O.call(ne, e)) ?? null
    }, A = it({
      actor: e,
      phase: "onDamageResolved",
      facts: $o({
        actor: e,
        packet: {
          amount: y,
          track: i,
          damageType: u
        },
        runtime: b
      }),
      packet: {
        amount: y,
        track: i,
        damageType: u
      },
      options: { runtime: b, consumeUsage: !0 }
    });
    await Xt({ actor: e, mutations: A.mutations, runtime: b }), y = Math.max(0, Number(A.packet.amount ?? y) || 0), y > 0 && await _.addCounter(e, i, y);
    const w = Math.max(0, Number(((R = l == null ? void 0 : l.durability) == null ? void 0 : R.current) ?? 0) || 0);
    let E = w;
    const I = Math.max(0, Number(((B = (U = l == null ? void 0 : l.traitState) == null ? void 0 : U.reinforced) == null ? void 0 : B.current) ?? 0) || 0), D = Math.max(0, Number(((he = (te = l == null ? void 0 : l.traitState) == null ? void 0 : te.reinforced) == null ? void 0 : he.max) ?? 0) || 0);
    let L = I;
    if (a + r > 0 && ((ge = l == null ? void 0 : l.item) != null && ge.id)) {
      const Ce = {};
      I > 0 ? (L = Math.max(0, I - 1), L !== I && (Ce["system.traitState.reinforced.current"] = L)) : (E = Math.max(0, w - 1), E !== w && (Ce["system.durability.current"] = E)), Object.keys(Ce).length > 0 && await l.item.update(Ce);
    }
    const V = ms(e, i);
    return {
      mode: (t == null ? void 0 : t.mode) ?? "attackDamage",
      track: i,
      requestedDelta: a + r,
      appliedDelta: V - d,
      usedArmor: !0,
      damageType: u,
      effectiveAp: h,
      mitigation: {
        ...p,
        netResistance: g,
        armorBefore: w,
        armorAfter: E,
        reinforcedBefore: I,
        reinforcedAfter: L,
        reinforcedMax: D
      },
      damageIncoming: m,
      adjustedIncoming: m,
      finalDamage: y,
      tagEffectResult: f,
      beforeLabel: `${Ui(i)} ${d}`,
      afterLabel: `${Ui(i)} ${V}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
}
N(Ze, "MODE_OPTIONS", Object.freeze([
  { value: S.monitors.physical, label: "Physical" },
  { value: S.monitors.fatigue, label: "Fatigue" },
  { value: "burn", label: "Burn" },
  { value: "status", label: "Status" }
]));
const gd = Os, qa = "damage-mode", yd = `${T}.${qa}`, ps = {}, ga = {};
class ie {
  static init() {
    ci.register(Ee.PROVIDE_DAMAGE_MODE), Hooks.on("updateSetting", async (e, t, i, a) => ie.onUpdateSetting(e, t, i, a)), Hooks.on(Ee.PROVIDE_DAMAGE_MODE, (e) => {
      e("resistanceArmorMonitor", k.settings.damageMode.values.resistanceArmorMonitor, ie.sufferDamageResistanceArmorMonitor), e("armorResistanceMonitor", k.settings.damageMode.values.armorResistanceMonitor, ie.sufferDamageArmorResistanceMonitor), e("armorGivesResistance", k.settings.damageMode.values.armorGivesResistance, ie.sufferDamageArmorAsResistance_Earthdawn), e("armorGiveResistanceHitsAvoid", k.settings.damageMode.values.armorGiveResistanceHitsAvoid, ie.sufferDamageArmorAsResistance_Cyberpunk);
    }), Hooks.once("ready", () => ie.onReady());
  }
  static onReady() {
    ie._registerDamageModeSetting(), ie._selectDamageMode();
  }
  static _registerDamageModeSetting() {
    Hooks.callAll(Ee.PROVIDE_DAMAGE_MODE, (e, t, i) => {
      ps[e] = t, ga[e] = i;
    }), game.settings.register(T, qa, {
      scope: "world",
      name: k.settings.damageMode.name,
      hint: k.settings.damageMode.hint,
      config: !0,
      default: Object.keys(ps)[0],
      choices: ps,
      type: String
    });
  }
  static async onUpdateSetting(e, t, i, a) {
    e.key == yd && ie._selectDamageMode();
  }
  static _selectDamageMode() {
    let e = game.settings.get(T, qa);
    ga[e] || (e = Object.keys(ps)[0]), ie.damageModeCode = e, ie.damageModeMethod = ga[e];
  }
  static async sufferDamage(e, t, i, a, r, n, o) {
    const { monitor: l, damageType: c } = ie._resolveDamageContext(e, t, o);
    if (fi.checkActorCanReceiveDamage(c ?? l, l, e), ie._shouldUsePersonalDamageV2(e, l, o)) {
      await ie.sufferPersonalDamageV2(e, l, c, i, a, r, n, o);
      return;
    }
    await (ie.damageModeMethod ?? ie.sufferDamageResistanceArmorMonitor)(e, l, c, i, a, r, n), await e.applyArmorDamage(l, c, Z.sumModifiers([o], "other", "damageArmor"));
  }
  static _shouldUsePersonalDamageV2(e, t, i) {
    var a, r;
    return !((a = e == null ? void 0 : e.isCharacterLike) != null && a.call(e)) || ![S.monitors.physical, S.monitors.fatigue].includes(t) ? !1 : !!((r = i == null ? void 0 : i.isPersonalWeapon) != null && r.call(i) || (i == null ? void 0 : i.canonicalType) === S.itemType.personalWeapon || (i == null ? void 0 : i.type) === S.itemType.personalWeapon);
  }
  static async sufferPersonalDamageV2(e, t, i, a, r, n, o, l) {
    var d;
    const c = ((d = l == null ? void 0 : l.getCombatProfile) == null ? void 0 : d.call(l)) ?? l ?? null, u = await Ze.apply({
      actor: e,
      payload: {
        mode: "attackDamage",
        track: t,
        damage: Number(a ?? (c == null ? void 0 : c.damage) ?? 0) || 0,
        netHits: Number(r ?? 0) || 0,
        damageType: i ?? (c == null ? void 0 : c.damageType),
        ap: Number((c == null ? void 0 : c.ap) ?? 0) || 0,
        effects: (c == null ? void 0 : c.effects) ?? {}
      },
      options: {
        logToChat: !1
      }
    });
    u != null && u.ok && ie._notifyPersonalArmorMitigation(e, {
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
    const i = t.armorMitigation ?? {}, a = ie._localizeDamageType(t.damageType), r = i.isDestroyed ? "Armor destroyed" : `Base ${Number(i.baseMitigation ?? 0)} + Type ${Number(i.typeMitigationMod ?? 0)} - AP ${Number(t.effectiveAp ?? 0)}`, n = Number(t.adjustedIncoming ?? t.baseIncoming ?? 0), o = Number(t.finalDamage ?? 0), l = (((u = t.tagEffectResult) == null ? void 0 : u.applied) ?? []).map((d) => `${d.tag} +${Math.round((Number(d.bonus ?? 0) || 0) * 100)}%`).join(", "), c = l ? ` [${l}]` : "";
    ui.notifications.info(
      `${e.name} mitigated ${a}: ${r}${c}. Incoming ${n}, final ${o}.`
    );
  }
  static async sufferDamageResistanceArmorMonitor(e, t, i, a, r, n, o) {
    const l = _.resistanceDetail(e, t, i), c = l.value;
    let u = 0;
    if (n) {
      const d = Math.min(c, a), m = Math.min(c - d, r);
      u = a - d, _.useArmor(t) && (u -= await ie.damageToArmor(e, i, u)), u += r - m;
    } else
      u = a + r - c, _.useArmor(t) && (u -= await ie.damageToArmor(e, i, u));
    u > 0 && await _.addCounter(e, t, u), ie._notifyResistanceUsage(e, t, i, l);
  }
  static async sufferDamageArmorResistanceMonitor(e, t, i, a, r, n, o) {
    let l = 0;
    _.useArmor(t) ? n ? (a -= await ie.damageToArmor(e, i, a), l = r + a) : (l = r + a, l -= await ie.damageToArmor(e, i, l)) : l = a + r;
    const c = _.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await _.addCounter(e, t, l), ie._notifyResistanceUsage(e, t, i, c), l;
  }
  static async sufferDamageArmorAsResistance_Cyberpunk(e, t, i, a, r, n, o) {
    let l = a + r;
    if (_.useArmor(t) && l > 0) {
      const u = n ? r : 0, d = Math.max(0, ie._computeArmorResistance(e) - u);
      d > 0 && (await _.addCounter(e, "armor", 1), l -= d);
    }
    const c = _.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await _.addCounter(e, t, l), ie._notifyResistanceUsage(e, t, i, c), Math.max(l, 0);
  }
  static async sufferDamageArmorAsResistance_Earthdawn(e, t, i, a, r, n, o) {
    let l = a + r;
    if (_.useArmor(t) && !n && l > 0) {
      const u = ie._computeArmorResistance(e);
      u > 0 && (await _.addCounter(e, "armor", 1), l -= u);
    }
    l -= ie._computeStrengthResistance(e, t);
    const c = _.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await _.addCounter(e, t, l), ie._notifyResistanceUsage(e, t, i, c), l;
  }
  static async damageToArmor(e, t, i) {
    if (i > 0) {
      const a = _.max(e, S.monitors.armor), r = _.getCounterValue(e, S.monitors.armor), n = Math.min(a - r, i), o = _.resistance(e, S.monitors.armor, t), l = Math.max(0, n - o);
      return l > 0 && await _.addCounter(e, S.monitors.armor, l), n;
    } else
      return 0;
  }
  static _resolveDamageContext(e, t, i) {
    var o;
    const a = (typeof t == "object" ? (t == null ? void 0 : t.damageType) ?? (t == null ? void 0 : t.type) : t) ?? ((o = i == null ? void 0 : i.system) == null ? void 0 : o.damageType), r = typeof t == "object" ? (t == null ? void 0 : t.monitor) ?? a : a;
    return { monitor: e.getDamageMonitor(r), damageType: a };
  }
  static _notifyResistanceUsage(e, t, i, a) {
    var u;
    if (!a || t === void 0)
      return;
    const r = k.actor.monitors[t] ?? t, n = ie._localizeDamageType(i) ?? r, o = a.usedType ? "type" : "default", l = ((u = k.actor.monitors.resistanceSources) == null ? void 0 : u[o]) ?? o, c = pe(k.actor.monitors.resistanceApplied, {
      actor: e.name,
      monitor: r,
      damageType: n,
      value: a.value,
      source: l
    });
    ui.notifications.info(c);
  }
  static _localizeDamageType(e) {
    if (e)
      return so(e) ? vt(e) : k.mwd.weaponDamageType[e] ?? k.mwd.personalDamageType[e] ?? k.actor.monitors[e] ?? e;
  }
  static _computeArmorResistance(e) {
    const t = _.max(e, "armor"), i = _.getCounterValue(e, "armor"), a = Math.max(0, t - i);
    return Math.max(0, Math.ceil(a / 3));
  }
  static _computeStrengthResistance(e, t) {
    const i = e.getAttributeValue(S.actorAttributes.strength);
    return Math.max(0, Math.floor(i / 4));
  }
}
class Ve extends Actor {
  static init() {
    Hooks.on("updateActor", (e, t, i, a) => {
      var r;
      return (r = et.firstResponsible(e)) == null ? void 0 : r.onUpdateActor(t, i);
    });
  }
  constructor(e, t = {}) {
    var i;
    if (!((i = t.anarchy) != null && i.ready)) {
      const a = game.system.anarchy.actorClasses[e.type];
      if (foundry.utils.mergeObject(t, { anarchy: { ready: !0 } }), a)
        return e.img || (e.img = a.defaultIcon), new a(e, t);
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
    return t ? t.sort((i, a) => {
      const r = i.system.code === "knowledge" || i.system.attribute === "knowledge", n = a.system.code === "knowledge" || a.system.attribute === "knowledge";
      if (r && !n) return 1;
      if (!n && r) return -1;
      if (r && n)
        return i.name > a.name ? 1 : i.name > a.name ? -1 : 0;
      const o = e.getAttributeValue(i.system.attribute) + i.system.value, l = e.getAttributeValue(a.system.attribute) + a.system.value;
      return o > l ? -1 : o < l ? 1 : 0;
    }) : [];
  }
  static sortQualities(e) {
    if (!e)
      return [];
    const t = ["positive", "negative", "narrative"], i = ["major", "minor"];
    return e.sort((a, r) => {
      var m, f, p, h, g, y;
      const n = String(((m = a.system) == null ? void 0 : m.category) ?? (((f = a.system) == null ? void 0 : f.positive) === !1 ? "negative" : "positive")).trim() || "positive", o = String(((p = r.system) == null ? void 0 : p.category) ?? (((h = r.system) == null ? void 0 : h.positive) === !1 ? "negative" : "positive")).trim() || "positive", l = t.indexOf(n) - t.indexOf(o);
      if (l !== 0) return l;
      const c = String(((g = a.system) == null ? void 0 : g.tier) ?? "minor").trim() || "minor", u = String(((y = r.system) == null ? void 0 : y.tier) ?? "minor").trim() || "minor", d = i.indexOf(c) - i.indexOf(u);
      return d !== 0 ? d : String(a.name ?? "").localeCompare(String(r.name ?? ""));
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
      initiative: Z.sumModifiers(this.items, "other", "initiative")
    }, this.system.monitors) {
      const e = se.getDamageTypes();
      Object.entries(this.system.monitors).forEach((t) => {
        t[1].resistance = Ve.normalizeResistance(t[1].resistance), t[1].maxBonus = Z.sumMonitorModifiers(this.items, t[0], "max"), t[1].resistanceBonus = Z.sumMonitorModifiers(this.items, t[0], "resistance"), t[1].resistanceBonusByType = Object.fromEntries(
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
    return Ii[this.type] ?? [];
  }
  getPhysicalAgility() {
  }
  getCorrespondingAttribute(e) {
    if (this.getAttributes().includes(e))
      return e;
  }
  async onUpdateActor(e, t) {
    var i, a;
    ((i = e.system) == null ? void 0 : i.monitors) != null && ((a = e.system) == null ? void 0 : a.state) == null && this.update({ "system.state": this.computeState() });
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
    Object.values(S.counters.edgePools).forEach((a) => {
      const r = t[a] ?? {}, n = r.value;
      r.value = n ?? e ?? 0, r.value = Math.min(r.value, e ?? r.value ?? 0), r.max = e ?? r.max ?? 0, t[a] = r;
    }), foundry.utils.setProperty(this.system, "counters.edgePools", t);
  }
  async setCheckbarValue(e, t) {
    return await this.update({ [e]: t });
  }
  _getMonitorMax(e) {
    const t = this.getAttributeValue(e);
    return t == 0 ? 0 : qn + Q.divup(t, 2);
  }
  getAttributeActions() {
    return Se.getActorActions(this);
  }
  getUsableAttributes(e = void 0) {
    const t = (e ? [e] : this.items).map((a) => a.getAttributes()).reduce((a, r) => a.concat(r), []), i = Q.distinct(this.getAttributes().concat(t));
    return i.sort(Q.ascendingBySortedArray(se.sortedAttributeKeys)), i;
  }
  getAttributeValue(e, t = void 0) {
    let i = 0;
    if (e = this.getCorrespondingAttribute(e), e) {
      if (this.getAttributes().includes(e))
        i = this.system.attributes[e].value;
      else if (t)
        i = (t == null ? void 0 : t.getAttributeValue(e)) ?? 0;
      else {
        const a = this.items.filter((r) => r.getAttributes().includes(e));
        if (a.length > 0) {
          const r = a.map((n) => n.getAttributeValue(e) ?? 0);
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
        await ie.damageToArmor(this, t, i);
    }
  }
  async rollAttribute(e) {
    await ut.rollAttribute(this, e);
  }
  async rollAttributeAction(e) {
    const t = Se.getActorAction(this, e);
    await ut.rollAttributeAction(this, t);
  }
  async rollSkill(e, t) {
    await ut.rollSkill(this, e, t);
  }
  async rollWeapon(e) {
    var r, n, o;
    fi.checkWeaponDefense(e, this);
    const t = (r = e.validateTargets(this)) == null ? void 0 : r.map((l) => l.id), i = {
      attackerTokenId: (o = (n = game.scenes.current) == null ? void 0 : n.tokens.find((l) => {
        var c;
        return ((c = l.actor) == null ? void 0 : c.id) == this.id;
      })) == null ? void 0 : o.id,
      targetedTokenIds: t
    }, a = this.items.find((l) => e.isWeaponSkill(l));
    await ut.rollWeapon(this, a, e, i);
  }
  async rollDefense(e) {
    const t = e.attack.defense, i = Se.getActorDefense(this, t);
    await ut.rollDefense(this, i, e);
  }
  async switchMonitorCheck(e, t, i, a = void 0) {
    await _.switchMonitorCheck(this, e, t, i, a);
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
    const e = Z.sumModifiers(this.items, "other", "sceneAnarchy");
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
    var a, r;
    const e = this.hasGMAnarchy(), t = (r = (a = game.system) == null ? void 0 : a.anarchy) == null ? void 0 : r.gmAnarchy, i = e && t && typeof t.getAnarchy == "function" ? t.getAnarchy() : {
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
      const a = (i = (t = game.system) == null ? void 0 : t.anarchy) == null ? void 0 : i.gmAnarchy;
      a != null && a.npcConsumesAnarchy && await a.npcConsumesAnarchy(this, e);
      return;
    }
  }
  getEdgePools() {
    var e;
    return ((e = this.system.counters) == null ? void 0 : e.edgePools) ?? {};
  }
  getEdgePoolValue(e) {
    var r, n;
    const t = this.getAttributeValue(S.actorAttributes.edge), a = ((n = (r = this.getEdgePools()) == null ? void 0 : r[e]) == null ? void 0 : n.value) ?? t ?? 0;
    return Math.min(a, t ?? a ?? 0);
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
        const i = k.actorType[this.type] ?? this.type, a = `${this.name} (${i}) cannot use Edge`;
        throw ui.notifications.warn(a), a;
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
    const a = this.getAttributeValue(i.system.attribute);
    return this.getSkillRating(i) + a + (t ? 2 : 0);
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
      const a = this.clone();
      i = (await Actor.createDocuments([a]))[0];
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
    const i = Ve._prepareFavorite(e, t);
    return !!this.system.favorites.find((a) => Ve._isSameFavorite(i, a));
  }
  static _prepareFavorite(e, t) {
    return { type: e, id: t };
  }
  static _isSameFavorite(e, t) {
    return e.id == t.id && e.type == t.type;
  }
  async switchFavorite(e, t, i) {
    const a = Ve._prepareFavorite(t, i), r = this.system.favorites.filter((n) => !Ve._isSameFavorite(a, n));
    e && r.push(a), this.update({ "system.favorites": r });
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
    var a;
    const i = Ve._prepareFavorite(e, t);
    if (e == "attributeAction") {
      const r = Se.prepareShortcut(this, t);
      if (r)
        return foundry.utils.mergeObject(r, i);
    } else if (Object.values(S.itemType).includes(e)) {
      const r = (a = this.items.get(t)) == null ? void 0 : a.prepareShortcut();
      if (r)
        return foundry.utils.mergeObject(r, i);
    }
    return i;
  }
  async _onSetManualStepper(e, t) {
    var n, o;
    e == null || e.preventDefault();
    const i = (n = t == null ? void 0 : t.dataset) == null ? void 0 : n.id, a = Number((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.value);
    if (!i || Number.isNaN(a)) return;
    const r = this._mwd.state.manual.find((l) => l.id === i);
    if (r)
      return r.value = a, this.render(!1);
  }
}
const { ApplicationV2: bd, HandlebarsApplicationMixin: Sd } = foundry.applications.api, { renderTemplate: gn } = foundry.applications.handlebars, Ad = `${G}/chat/celebrity-roll.hbs`, Pi = class Pi extends Sd(bd) {
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
        Z.computeModifiers(e.items, "other", "celebrity")
      ),
      other: {
        label: k.common.roll.modifiers.other,
        value: 0
      },
      ANARCHY: k
    }, i = await gn(`${G}/dialog/roll-celebrite-title.hbs`, t), a = {
      id: `roll-celebrity-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Pi.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new Pi({ roll: t }, a).render({ force: !0 });
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
    i.find(".input-celebrity-other").on("input", (a) => {
      this.roll.other.value = Number.parseInt(a.currentTarget.value) ?? 0;
    }), i.find('[data-action="roll"]').on("click", async () => {
      await Pi.doRoll(this.roll), await this.close();
    }), i.find('[data-action="cancel"]').on("click", async () => {
      await this.close();
    });
  }
  static async doRoll(e) {
    const t = [
      e.celebrity,
      e.modifiers,
      e.other
    ], i = Q.sumValues(t, (o) => o.value), a = {
      actor: e.actor,
      parameters: t,
      pool: i,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      },
      ANARCHY: k
    }, r = new Roll(`${i}d6cs>=5`);
    await r.evaluate();
    const n = await gn(Ad, a);
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
N(Pi, "PARTS", {
  body: {
    template: `${G}/dialog/roll-celebrite.hbs`
  }
});
let Va = Pi;
const { renderTemplate: wd } = foundry.applications.handlebars, Td = `${G}/chat/actor-say-word.hbs`;
class yn extends Ve {
  static get initiative() {
    return Ve.initiative + " + max(@attributes.reflexes.value, @attributes.intelligence.value)";
  }
  hasOwnAnarchy() {
    return this.hasPlayerOwner;
  }
  prepareDerivedData() {
    !this.system.monitors.fatigue && this.system.monitors.stun && (this.system.monitors.fatigue = foundry.utils.duplicate(this.system.monitors.stun)), this.system.monitors.physical.max = this._getMonitorMax(S.actorAttributes.strength), this.system.monitors.fatigue.max = this._getMonitorMax(S.actorAttributes.willpower), super.prepareDerivedData(), this.system.ignoreWounds = Z.sumModifiers(this.items, "other", "ignoreWounds");
  }
  computePhysicalState() {
    var l, c;
    const e = Math.max(0, Number(((l = this.system.monitors.armor) == null ? void 0 : l.max) ?? 0)), t = Math.min(
      e,
      Math.max(0, Number(((c = this.system.monitors.armor) == null ? void 0 : c.value) ?? 0))
    ), i = Math.max(0, e - t), a = Math.max(this.system.monitors.physical.max, this.system.monitors.fatigue.max) + e, r = this.system.monitors.physical.value == this.system.monitors.physical.max, n = this.system.monitors.fatigue.max == this.system.monitors.fatigue.value, o = r || n ? a : Math.max(this.system.monitors.physical.value, this.system.monitors.fatigue.value) + i;
    return {
      max: a,
      value: a - o
    };
  }
  getAttributes() {
    return Ii[this.type] ?? Ii[S.actorTypes.character];
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
    var a, r;
    const i = (a = this.getWord(e, t)) == null ? void 0 : a.word;
    i && ChatMessage.create({
      speaker: { alias: ((r = this.token) == null ? void 0 : r.name) ?? this.name },
      content: await wd(
        Td,
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
    this._applyWordUpdate(e, t, (a) => foundry.utils.mergeObject(a, { word: i }, { overwrite: !0 }));
  }
  async _applyWordUpdate(e, t, i) {
    this._mutateWords(e, (a) => a.map((r) => (r.id == t && i(r), r)));
  }
  async deleteWord(e, t) {
    this._mutateWords(e, (i) => i.filter((a) => a.id != t));
  }
  async _mutateWords(e, t = (i) => i) {
    if (!e)
      return;
    let i = t(this.system[e]);
    Q.reindexIds(i), await this.update({ [`system.${e}`]: i });
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
      fi.checkSufficient(k.actor.counters.anarchy, e, i + t);
      const a = Math.min(t, e), r = e - a;
      a > 0 && _.addCounter(this, S.monitors.sceneAnarchy, -a), this.hasPlayerOwner ? (await game.system.anarchy.gmAnarchy.actorGivesAnarchyToGM(this, e), _.addCounter(this, S.monitors.anarchy, -r)) : r > 0 && super.spendAnarchy(r);
    }
  }
  canUseEdge() {
    return !0;
  }
  getWounds() {
    const e = Q.divint(this.system.monitors.fatigue.value, 3) + Q.divint(this.system.monitors.physical.value, 3);
    return Math.max(0, e - this.system.ignoreWounds);
  }
  async rollCelebrity() {
    await Va.create(this);
  }
}
class Xo extends Ve {
  prepareDerivedData() {
    this._prepareMwdAttributes(), this._prepareMwdMonitors(), this._prepareMwdItems(), super.prepareDerivedData();
  }
  static get defaultIcon() {
    return `${Us}/default/Default_Vehicle.svg`;
  }
  static get initiative() {
    return Ve.initiative + " + max(@attributes.system.value, @attributes.handling.value)";
  }
  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    };
  }
  getAttributes() {
    return Ii[this.type] ?? Ii[S.actorTypes.vehicle];
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
    var a;
    const t = ((a = this.system.attributes.handling) == null ? void 0 : a.value) ?? 0, i = this.system.handling;
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
    ), Object.entries(e.attributes).forEach(([a, r]) => {
      var n;
      ((n = i[a]) == null ? void 0 : n.value) === void 0 && (i[a] = i[a] ?? {}, i[a].value = (r == null ? void 0 : r.value) ?? 0);
    });
  }
  _prepareMwdMonitors() {
    var a, r, n, o, l, c, u, d;
    const e = this.system.mwd = this.system.mwd ?? {}, t = this.system.monitors = this.system.monitors ?? {}, i = {
      value: ((a = t.structure) == null ? void 0 : a.value) ?? 0,
      max: ((r = t.structure) == null ? void 0 : r.max) ?? (this.type === S.actorTypes.battlemech ? 18 : 15),
      resistance: Ve.normalizeResistance((n = t.structure) == null ? void 0 : n.resistance)
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
        resistance: Ve.normalizeResistance((d = t.heat) == null ? void 0 : d.resistance)
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
      Object.entries(t).map(([i, a]) => [
        i,
        this.items.filter((r) => a.includes(r.type))
      ])
    );
  }
}
const bn = {
  light: 4,
  medium: 5,
  heavy: 6,
  assault: 7
}, kd = { mode: "normal", allowedWeaponIds: [], typeRestriction: "" }, vd = {
  baseProfile: { name: "Unarmed", damage: "", notes: "" },
  maxWeapons: 0,
  allowedLocations: []
};
class Md {
  constructor(e) {
    this.actor = e, this.mwd = e.system.mwd ?? {};
  }
  compute() {
    const e = this.mwd.weightClass ?? "medium", t = bn[e] ?? bn.medium, i = this._normalizeHardpoints(), a = this._normalizeWeaponGroups(), r = a.find((y) => y.isPrimary), n = a.filter((y) => y.isPrimary), o = this._primarySlot(), l = [], c = [];
    n.length > 1 && l.push(k.mwd.loadout.errors.multiplePrimary);
    const u = r ? t - 1 : t, d = a.length + (r ? 1 : 0);
    a.length > u && l.push(pe(k.mwd.loadout.errors.mountPointsExceeded, {
      used: d,
      total: t
    }));
    const m = this._getWeapons((y) => (y.system.weaponCategory ?? "ranged") !== "melee"), f = new Map(m.map((y) => [y.id, y])), p = /* @__PURE__ */ new Set(), h = i.map((y) => ({ ...y, occupiedBy: null, occupiedByName: void 0 }));
    for (const y of a)
      for (const b of y.weaponIds ?? []) {
        const A = f.get(b);
        if (!A) {
          c.push(pe(k.mwd.loadout.warnings.weaponMissing, { weapon: b }));
          continue;
        }
        const w = A.system.hardpointType ?? "energy", E = A.system.hardpointSize ?? "small";
        if (p.has(b)) {
          l.push(pe(k.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: A.name }));
          continue;
        }
        if (p.add(b), y.isPrimary && this._validatePrimaryWeapon(A, w, E, o, l), (A.system.weaponCategory ?? "ranged") === "melee")
          continue;
        const I = h.find((D) => !D.occupiedBy && D.type === w && D.size === E);
        I ? (I.occupiedBy = y.id, I.occupiedByName = y.name) : l.push(pe(k.mwd.loadout.errors.hardpointUnavailable, {
          weapon: A.name,
          type: k.mwd.hardpointType[w] ?? w,
          size: k.mwd.hardpointSize[E] ?? E
        }));
      }
    r && (!r.weaponIds || r.weaponIds.length === 0) && l.push(k.mwd.loadout.errors.primaryWithoutWeapon);
    const g = this._computeMeleeState(l);
    return {
      mountPoints: {
        total: t,
        used: d,
        remaining: Math.max(0, t - d)
      },
      weightClass: e,
      hardpoints: h,
      weaponGroups: a,
      primaryGroupId: r == null ? void 0 : r.id,
      errors: l,
      warnings: c,
      meleeProfiles: g.profiles,
      meleeLimit: g.limit
    };
  }
  _normalizeWeaponGroups() {
    return (this.mwd.weaponGroups ?? []).map((e, t) => ({
      id: e.id ?? `group-${t + 1}`,
      name: e.name || pe(k.common.newName, { type: k.itemType.singular.weapon }),
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
    const e = foundry.utils.mergeObject(foundry.utils.duplicate(kd), this.mwd.primarySlot ?? {});
    return e.allowedWeaponIds = this._asArray(e.allowedWeaponIds), e;
  }
  _computeMeleeState(e) {
    var o, l, c;
    const t = foundry.utils.mergeObject(foundry.utils.duplicate(vd), this.mwd.melee ?? {}), i = this._getWeapons((u) => (u.system.weaponCategory ?? "ranged") === "melee"), a = [], r = Number(t.maxWeapons ?? 0);
    i.length > r && e.push(pe(k.mwd.loadout.errors.meleeLimitExceeded, {
      equipped: i.length,
      limit: r
    }));
    const n = this._asArray(t.allowedLocations);
    return a.push({
      name: ((o = t.baseProfile) == null ? void 0 : o.name) || k.mwd.melee.baseProfile,
      damage: ((l = t.baseProfile) == null ? void 0 : l.damage) ?? "",
      notes: ((c = t.baseProfile) == null ? void 0 : c.notes) ?? ""
    }), i.forEach((u) => {
      var d;
      n.length > 0 && u.system.mountLocation && !n.includes(u.system.mountLocation) && e.push(pe(k.mwd.loadout.errors.meleeLocationRestricted, {
        weapon: u.name,
        location: k.mwd.meleeLocation[u.system.mountLocation] ?? u.system.mountLocation
      })), a.push({
        name: u.name,
        damage: u.getDamageCode(),
        notes: ((d = u.system.references) == null ? void 0 : d.description) ?? ""
      });
    }), { profiles: a, limit: r };
  }
  _validatePrimaryWeapon(e, t, i, a, r) {
    var n;
    a.mode === "converted" ? (((n = a.allowedWeaponIds) == null ? void 0 : n.length) > 0 && !a.allowedWeaponIds.includes(e.id) && r.push(pe(k.mwd.loadout.errors.primaryNotAllowedWeapon, { weapon: e.name })), a.typeRestriction && t !== a.typeRestriction && r.push(pe(k.mwd.loadout.errors.primaryTypeRestriction, {
      weapon: e.name,
      type: k.mwd.hardpointType[a.typeRestriction] ?? a.typeRestriction
    }))) : i !== "large" && r.push(pe(k.mwd.loadout.errors.primaryNeedsLarge, { weapon: e.name }));
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
class Ed extends Xo {
  static get defaultIcon() {
    return `${Us}/vehicles/apc.svg`;
  }
  prepareDerivedData() {
    var e;
    super.prepareDerivedData(), this.system.mwd = this.system.mwd ?? {}, this.system.mwd.chassis = this.system.mwd.chassis ?? "", this.system.mwd.tonnage = this.system.mwd.tonnage ?? 0, this.system.mwd.loadout = new Md(this).compute(), this.system.mwd.weaponGroupDetails = this._prepareConfiguredWeaponGroups(), this.system.mwd.heat = this._prepareHeatTrack(), this.system.mwd.primaryGroupName = ((e = this.system.mwd.weaponGroupDetails.find((t) => t.isPrimary)) == null ? void 0 : e.name) ?? "", this.system.skills = this._prepareSkillMap(), this.system.weaponGroups = this._prepareWeaponGroups(), this.system.meleeProfiles = this._prepareMeleeProfiles(), this.system.quickActions = {
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
    const i = t.weaponIds.map((a) => this.items.get(a)).filter((a) => a);
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
    const e = this.system ?? {}, t = ((o = e.monitors) == null ? void 0 : o.heat) ?? { value: 0, max: 0 }, i = ((l = e.mwd) == null ? void 0 : l.heat) ?? {}, a = {
      current: t.value ?? 0,
      max: t.max ?? 0,
      thresholds: {
        runningHot: 2,
        overheated: 3,
        shutdown: 4
      }
    }, r = foundry.utils.mergeObject(a, i, { inplace: !1 });
    r.thresholds = foundry.utils.mergeObject(a.thresholds, i.thresholds ?? {}, { inplace: !1 }), r.current = t.value ?? r.current, r.max = t.max ?? r.max;
    const n = this._resolveHeatStatus(r.current, r.thresholds, r.max);
    return this.system.mwd.heatStatus = {
      code: n,
      label: k.actor.battlemech.heat.status[n] ?? n
    }, r;
  }
  _resolveHeatStatus(e, t, i) {
    return e >= ((t == null ? void 0 : t.shutdown) ?? i) ? "shutdown" : e >= ((t == null ? void 0 : t.overheated) ?? i) ? "overheated" : e >= ((t == null ? void 0 : t.runningHot) ?? 0) ? "runningHot" : "safe";
  }
  _prepareConfiguredWeaponGroups() {
    var i;
    const e = ((i = this.system.mwd) == null ? void 0 : i.weaponGroups) ?? [], t = new Map(this.items.map((a) => [a.id, a]));
    return e.map((a, r) => {
      const n = Array.isArray(a.weaponIds) ? a.weaponIds : a.weaponIds ? [a.weaponIds] : [], o = n.map((c) => t.get(c)).filter((c) => (c == null ? void 0 : c.type) === S.itemType.mechWeapon), l = n.filter((c) => !t.has(c));
      return {
        id: a.id ?? `group-${r + 1}`,
        index: r,
        name: a.name || pe(k.common.newName, { type: k.itemType.singular.weapon }),
        weaponIds: n,
        isPrimary: a.isPrimary ?? !1,
        weapons: o,
        missingWeaponIds: l
      };
    });
  }
  _resolveSkill(e) {
    var a;
    const t = this.items.find((r) => r.type === S.itemType.skill && r.system.code === e);
    if (t)
      return t;
    const i = at(e);
    if (i)
      return {
        name: i.label ?? ((a = k.skill) == null ? void 0 : a[e]) ?? e,
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
    const t = this.items.filter((n) => n.type === S.itemType.mechWeapon);
    if (t.length === 0)
      return [];
    const i = t.filter((n) => this.hasFavorite(S.itemType.mechWeapon, n.id)), a = [];
    return i.length > 0 && a.push({
      id: "favorite",
      name: k.actor.vehicle.quickActions.primaryWeapons,
      weaponIds: i.map((n) => n.id),
      isPrimary: !0
    }), a.push({
      id: "all",
      name: k.actor.vehicle.quickActions.allWeapons,
      weaponIds: t.map((n) => n.id),
      isPrimary: a.length === 0
    }), a;
  }
  _prepareMeleeProfiles() {
    const e = [{
      id: "unarmed",
      name: k.actor.vehicle.quickActions.unarmed,
      weaponId: null,
      damage: 1,
      notes: k.actor.vehicle.quickActions.unarmedNotes
    }], t = this.items.filter((i) => i.type === S.itemType.mechWeapon && i.system.skill === "meleeCombat");
    return e.push(...t.map((i) => {
      var a;
      return {
        id: i.id,
        name: i.name,
        weaponId: i.id,
        damage: ((a = i.getDamage()) == null ? void 0 : a.value) ?? i.system.damage,
        notes: i.system.description ?? ""
      };
    })), e;
  }
  async _rollQuickSkill(e, t = {}) {
    var r;
    const i = ((r = e == null ? void 0 : e.system) == null ? void 0 : r.attribute) ?? this.getPhysicalAgility(), a = foundry.utils.mergeObject(ut.prepareActorRoll(this), {
      mode: xe.rollType.skill,
      skill: e,
      attribute1: i,
      specialization: void 0
    });
    t.quickAction && (a.quickAction = t.quickAction), await ut.create(a);
  }
  async _promptWeaponGroup(e) {
    if (e.length === 1)
      return e[0];
    const t = e.find((r) => r.isPrimary) ?? e[0], i = `<form class="mwd-quick-select">${e.map((r) => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${r.id}" ${r.id === t.id ? "checked" : ""}>
        <span>${r.name}${r.isPrimary ? ` (${k.actor.vehicle.quickActions.primaryLabel})` : ""}</span>
      </label>`).join("")}</form>`, a = await Dialog.prompt({
      title: k.actor.vehicle.quickActions.selectWeaponGroup,
      content: i,
      label: k.common.roll.button,
      callback: (r) => r.find('input[name="weapon-group"]:checked').val() ?? t.id
    });
    return e.find((r) => r.id === a) ?? t;
  }
  async _promptMeleeProfile(e) {
    if (e.length === 1)
      return e[0];
    const t = e[0], i = `<form class="mwd-quick-select">${e.map((r) => `
      <label class="quick-select-option">
        <input type="radio" name="melee-profile" value="${r.id}" ${r.id === t.id ? "checked" : ""}>
        <span>${r.name}</span>
      </label>`).join("")}</form>`, a = await Dialog.prompt({
      title: k.actor.vehicle.quickActions.selectMeleeProfile,
      content: i,
      label: k.common.roll.button,
      callback: (r) => r.find('input[name="melee-profile"]:checked').val() ?? t.id
    });
    return e.find((r) => r.id === a) ?? t;
  }
  async _promptSensorSweepSkill(e) {
    if (e.length === 1)
      return e[0];
    const t = `<form class="mwd-quick-select">${e.map((a) => `
      <label class="quick-select-option">
        <input type="radio" name="sensor-skill" value="${a.system.code}">
        <span>${a.name}</span>
      </label>`).join("")}</form>`, i = await Dialog.prompt({
      title: k.actor.vehicle.quickActions.selectSensorSkill,
      content: t,
      label: k.common.roll.button,
      callback: (a) => a.find('input[name="sensor-skill"]:checked').val()
    });
    return e.find((a) => a.system.code === i) ?? e[0];
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
const Cs = "activeModifiers", Lr = [
  { value: "", label: "All Attributes" },
  { value: "reflexes", label: "Reflexes" },
  { value: "strength", label: "Strength" },
  { value: "willpower", label: "Willpower" },
  { value: "charisma", label: "Charisma" },
  { value: "intelligence", label: "Intelligence" },
  { value: "edge", label: "Edge" }
], $r = [
  { value: "", label: "All Intents" },
  { value: "skill", label: "Skill" },
  { value: "attack", label: "Attack" },
  { value: "defense", label: "Defense" },
  { value: "common", label: "Common" },
  { value: "attribute", label: "Attribute" },
  { value: "edge", label: "Edge" },
  { value: "initiative", label: "Initiative" }
];
function Sn(s) {
  const e = String(s ?? "").trim();
  return e === "" ? null : e;
}
function Cd(s) {
  return String((s == null ? void 0 : s.intent) ?? "").trim() || null;
}
function Pd(s) {
  var e, t, i;
  return ((e = s == null ? void 0 : s.data) == null ? void 0 : e.attrKey) ?? // skill rolls
  ((i = (t = s == null ? void 0 : s.attack) == null ? void 0 : t.skill) == null ? void 0 : i.attribute) ?? // attack rolls
  null;
}
function An(s, e) {
  return s ? e ? s === e : !1 : !0;
}
function Zo(s) {
  return {
    id: String((s == null ? void 0 : s.id) ?? ""),
    label: String((s == null ? void 0 : s.label) ?? "").trim(),
    value: Math.trunc(Number((s == null ? void 0 : s.value) ?? 0)) || 0,
    enabled: (s == null ? void 0 : s.enabled) !== !1,
    attributeFilter: Sn(s == null ? void 0 : s.attributeFilter),
    intentFilter: Sn(s == null ? void 0 : s.intentFilter),
    source: (s == null ? void 0 : s.source) === "preset" ? "preset" : "adhoc"
  };
}
class Nd {
  constructor() {
    N(this, "id", "mwd.sceneModifiers");
  }
  collect({ resolved: e } = {}) {
    var n;
    const t = (n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.getFlag("mwd", Cs);
    if (!Array.isArray(t) || !t.length) return [];
    const i = Cd(e), a = Pd(e), r = [];
    for (const o of t) {
      const l = Zo(o);
      l.enabled && An(l.intentFilter, i) && An(l.attributeFilter, a) && r.push({
        id: l.id || `scene:${l.label}`,
        label: l.label,
        value: l.value,
        source: "Scene"
      });
    }
    return r;
  }
}
const Rd = `systems/${T}/templates/settings/collection-editor.hbs`, el = /* @__PURE__ */ new Map(), ya = /* @__PURE__ */ new Map();
function pi(s = []) {
  const e = Array.isArray(s) ? s.filter(Boolean) : [String(s ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid settings data.");
  return t.validationErrors = e, t;
}
function ea(s) {
  Id(s), el.set(s.id, s), game.settings.register(T, s.settingKey, {
    scope: "world",
    config: !1,
    type: s.settingType ?? Object,
    default: s.defaultData()
  }), game.settings.registerMenu(T, s.menuKey, {
    name: s.menu.name,
    label: s.menu.label,
    hint: s.menu.hint,
    icon: s.menu.icon,
    type: Od(s.id),
    restricted: s.menu.restricted ?? !0
  });
}
function Dd(s) {
  return el.get(s) ?? null;
}
function Id(s) {
  var e, t;
  if (!(s != null && s.id)) throw new Error("Settings collection definition requires an id.");
  if (!(s != null && s.settingKey)) throw new Error(`Settings collection definition "${s.id}" requires a settingKey.`);
  if (!(s != null && s.menuKey)) throw new Error(`Settings collection definition "${s.id}" requires a menuKey.`);
  if (!((e = s == null ? void 0 : s.menu) != null && e.name) || !((t = s == null ? void 0 : s.menu) != null && t.label))
    throw new Error(`Settings collection definition "${s.id}" requires menu metadata.`);
  if (typeof s.defaultData != "function")
    throw new Error(`Settings collection definition "${s.id}" requires defaultData().`);
  if (typeof s.toRows != "function")
    throw new Error(`Settings collection definition "${s.id}" requires toRows(value).`);
  if (typeof s.rowsToValue != "function")
    throw new Error(`Settings collection definition "${s.id}" requires rowsToValue(rows).`);
  if (typeof s.serializeBulk != "function" || typeof s.parseBulk != "function")
    throw new Error(`Settings collection definition "${s.id}" requires bulk serialization helpers.`);
  if (!Array.isArray(s.rowSchema) || !s.rowSchema.length)
    throw new Error(`Settings collection definition "${s.id}" requires a non-empty rowSchema.`);
}
function Od(s) {
  if (ya.has(s))
    return ya.get(s);
  class e extends tl {
  }
  return N(e, "definitionId", s), ya.set(s, e), e;
}
var q, il, Ka, Ps, Ns, Mi, Ya, ji, sl, al, Fe;
class tl extends FormApplication {
  constructor(t = {}, i = {}) {
    super(t, i);
    be(this, q);
    const a = M(this, q, Ns).call(this);
    this.editorState = {
      tab: "rows",
      rows: this.definition.toRows(a),
      bulkText: this.definition.serializeBulk(a),
      errors: []
    };
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: `${T}-${this.definitionId}-editor`,
      classes: ["mwd", "mwd-settings-editor"],
      template: Rd,
      width: 880,
      height: 760,
      resizable: !0,
      submitOnChange: !1,
      closeOnSubmit: !1
    }, { inplace: !1 });
  }
  get definition() {
    const t = Dd(this.constructor.definitionId);
    if (!t)
      throw new Error(`Missing settings collection definition: ${this.constructor.definitionId}`);
    return t;
  }
  get title() {
    var t;
    return this.definition.title ?? ((t = this.definition.menu) == null ? void 0 : t.name) ?? "Settings Editor";
  }
  getData(t = {}) {
    const i = M(this, q, al).call(this), a = this.editorState.rows.map((r, n, o) => ({
      index: n,
      fields: i.map((l) => M(this, q, sl).call(this, l, r, n)),
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
      rows: a,
      hasRows: a.length > 0,
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
    super.activateListeners(t), t.find("[data-action]").each((i, a) => {
      a.addEventListener("click", (r) => {
        var l;
        const n = r.currentTarget, o = String(((l = n == null ? void 0 : n.dataset) == null ? void 0 : l.action) ?? "").trim();
        o && M(this, q, il).call(this, o, r, n);
      });
    });
  }
  async _onSubmit(t, { updateData: i = null, preventClose: a = !0, preventRender: r = !0 } = {}) {
    return super._onSubmit(t, { updateData: i, preventClose: a, preventRender: r });
  }
  async _updateObject(t, i) {
    var a;
    M(this, q, Fe).call(this, []);
    try {
      const r = this.editorState.tab === "bulk" ? this.definition.parseBulk(M(this, q, ji).call(this)) : this.definition.rowsToValue(M(this, q, Ya).call(this));
      await game.settings.set(T, this.definition.settingKey, r);
      const n = M(this, q, Ns).call(this);
      M(this, q, Ps).call(this, n), await this.close();
    } catch (r) {
      M(this, q, Fe).call(this, fs(r)), this.editorState.errors.length && ((a = ui.notifications) == null || a.error(this.editorState.errors[0])), this.render(!1);
    }
  }
}
q = new WeakSet(), il = async function(t, i, a) {
  var r, n, o, l, c, u, d, m;
  switch (i.preventDefault(), i.stopPropagation(), t) {
    case "switchRows":
      M(this, q, ji).call(this), this.editorState.tab = "rows", M(this, q, Fe).call(this, []), this.render(!1);
      return;
    case "switchBulk":
      M(this, q, Mi).call(this);
      try {
        const f = this.definition.rowsToValue(this.editorState.rows);
        this.editorState.bulkText = this.definition.serializeBulk(f), this.editorState.tab = "bulk", M(this, q, Fe).call(this, []);
      } catch (f) {
        M(this, q, Fe).call(this, fs(f)), this.editorState.errors.length && ((r = ui.notifications) == null || r.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "addRow":
      M(this, q, Mi).call(this), this.editorState.rows.push(((o = (n = this.definition).createEmptyRow) == null ? void 0 : o.call(n)) ?? {}), M(this, q, Fe).call(this, []), this.render(!1);
      return;
    case "removeRow":
      M(this, q, Mi).call(this), this.editorState.rows.splice(Number(((l = a == null ? void 0 : a.dataset) == null ? void 0 : l.index) ?? -1), 1), M(this, q, Fe).call(this, []), this.render(!1);
      return;
    case "moveRowUp":
      M(this, q, Mi).call(this), M(this, q, Ka).call(this, Number(((c = a == null ? void 0 : a.dataset) == null ? void 0 : c.index) ?? -1), -1), M(this, q, Fe).call(this, []), this.render(!1);
      return;
    case "moveRowDown":
      M(this, q, Mi).call(this), M(this, q, Ka).call(this, Number(((u = a == null ? void 0 : a.dataset) == null ? void 0 : u.index) ?? -1), 1), M(this, q, Fe).call(this, []), this.render(!1);
      return;
    case "loadBulk":
      try {
        const f = this.definition.parseBulk(M(this, q, ji).call(this));
        this.editorState.rows = this.definition.toRows(f), this.editorState.bulkText = this.definition.serializeBulk(f), this.editorState.tab = "rows", M(this, q, Fe).call(this, []);
      } catch (f) {
        M(this, q, Fe).call(this, fs(f)), this.editorState.errors.length && ((d = ui.notifications) == null || d.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "formatBulk":
      try {
        const f = this.definition.parseBulk(M(this, q, ji).call(this));
        this.editorState.bulkText = this.definition.serializeBulk(f), M(this, q, Fe).call(this, []);
      } catch (f) {
        M(this, q, Fe).call(this, fs(f)), this.editorState.errors.length && ((m = ui.notifications) == null || m.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "resetSetting":
      M(this, q, Ps).call(this, M(this, q, Ns).call(this)), this.render(!1);
      return;
    case "restoreDefaults":
      M(this, q, Ps).call(this, this.definition.defaultData()), this.render(!1);
      return;
    case "cancel":
      await this.close();
      return;
    default:
      return;
  }
}, Ka = function(t, i) {
  if (!Number.isInteger(t)) return;
  const a = t + i;
  if (t < 0 || a < 0 || a >= this.editorState.rows.length) return;
  const r = [...this.editorState.rows], [n] = r.splice(t, 1);
  r.splice(a, 0, n), this.editorState.rows = r;
}, Ps = function(t) {
  this.editorState.rows = this.definition.toRows(t), this.editorState.bulkText = this.definition.serializeBulk(t), this.editorState.tab = "rows", M(this, q, Fe).call(this, []);
}, Ns = function() {
  const t = game.settings.get(T, this.definition.settingKey);
  return foundry.utils.deepClone(t ?? this.definition.defaultData());
}, Mi = function() {
  this.editorState.rows = M(this, q, Ya).call(this);
}, Ya = function() {
  const t = foundry.utils.expandObject(this._getSubmitData()), i = (t == null ? void 0 : t.rows) ?? {};
  return Object.keys(i).sort((a, r) => Number(a) - Number(r)).map((a) => {
    const r = i[a] ?? {};
    return Object.fromEntries(
      this.definition.rowSchema.map((n) => [
        n.key,
        String((r == null ? void 0 : r[n.key]) ?? "")
      ])
    );
  });
}, ji = function() {
  var a;
  const t = this.form, i = (a = t == null ? void 0 : t.querySelector) == null ? void 0 : a.call(t, 'textarea[name="bulkText"]');
  return i instanceof HTMLTextAreaElement && (this.editorState.bulkText = i.value), this.editorState.bulkText ?? "";
}, sl = function(t, i, a) {
  const r = t.type ?? "text", n = String((i == null ? void 0 : i[t.key]) ?? t.default ?? ""), o = r === "select" ? _d(t).map((l) => ({
    value: String(l.value ?? ""),
    label: String(l.label ?? l.value ?? ""),
    selected: String(l.value ?? "") === n
  })) : [];
  return {
    key: t.key,
    label: t.label,
    type: r,
    inputType: r === "select" ? "text" : r,
    name: `rows.${a}.${t.key}`,
    value: n,
    placeholder: t.placeholder ?? "",
    min: t.min ?? "",
    max: t.max ?? "",
    step: t.step ?? "",
    options: o
  };
}, al = function() {
  return this.definition.rowSchema.map((t) => ({
    ...t,
    type: t.type ?? "text"
  }));
}, Fe = function(t = []) {
  this.editorState.errors = Array.isArray(t) ? t.filter(Boolean) : [];
}, N(tl, "definitionId", "");
function _d(s) {
  const e = typeof s.options == "function" ? s.options() : s.options;
  return Array.isArray(e) ? e : [];
}
function fs(s) {
  const e = Array.isArray(s == null ? void 0 : s.validationErrors) ? s.validationErrors.filter(Boolean) : [String((s == null ? void 0 : s.message) ?? "Unable to save settings.").trim()].filter(Boolean);
  return e.length ? e : ["Unable to save settings."];
}
const Qa = "sceneModifierTemplates", Ld = "sceneModifierTemplateEditor", $d = Object.freeze([]);
function Zt(s) {
  const e = String(s ?? "").trim();
  return e === "" ? "" : e;
}
function rl(s = []) {
  const e = [], t = [], i = /* @__PURE__ */ new Set();
  if ((Array.isArray(s) ? s : []).forEach((a, r) => {
    const n = String((a == null ? void 0 : a.label) ?? "").trim(), o = String((a == null ? void 0 : a.value) ?? "").trim(), l = `Row ${r + 1}`;
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
      attributeFilter: Zt(a == null ? void 0 : a.attributeFilter),
      intentFilter: Zt(a == null ? void 0 : a.intentFilter)
    });
  }), t.length) throw pi(t);
  return e;
}
function xd(s = []) {
  return (Array.isArray(s) ? s : []).map((e) => ({
    label: String((e == null ? void 0 : e.label) ?? ""),
    value: String((e == null ? void 0 : e.value) ?? "0"),
    attributeFilter: Zt(e == null ? void 0 : e.attributeFilter),
    intentFilter: Zt(e == null ? void 0 : e.intentFilter)
  }));
}
function Bd(s = "") {
  const e = String(s ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw pi([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  if (!Array.isArray(t))
    throw pi(["Bulk JSON must be an array."]);
  return rl(t.map((i) => ({
    label: String((i == null ? void 0 : i.label) ?? ""),
    value: String((i == null ? void 0 : i.value) ?? "0"),
    attributeFilter: Zt(i == null ? void 0 : i.attributeFilter),
    intentFilter: Zt(i == null ? void 0 : i.intentFilter)
  })));
}
function Fd(s = []) {
  return JSON.stringify(
    (Array.isArray(s) ? s : []).map((e) => ({
      label: String((e == null ? void 0 : e.label) ?? ""),
      value: Number((e == null ? void 0 : e.value) ?? 0),
      attributeFilter: Zt(e == null ? void 0 : e.attributeFilter),
      intentFilter: Zt(e == null ? void 0 : e.intentFilter)
    })),
    null,
    2
  );
}
const zd = {
  id: "scene-modifier-templates",
  menuKey: Ld,
  settingKey: Qa,
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
      options: Lr
    },
    {
      key: "intentFilter",
      label: "Intent Filter",
      type: "select",
      options: $r
    }
  ],
  menu: {
    name: "Scene Modifier Templates",
    label: "Configure",
    hint: "Edit the preset scene modifier templates available in the GM Gadget.",
    icon: "fas fa-cloud",
    restricted: !0
  },
  defaultData: () => foundry.utils.deepClone($d),
  createEmptyRow: () => ({
    label: "",
    value: "0",
    attributeFilter: "",
    intentFilter: ""
  }),
  toRows: xd,
  rowsToValue: rl,
  parseBulk: Bd,
  serializeBulk: Fd
};
function Wd() {
  ea(zd);
}
const { ApplicationV2: Hd, HandlebarsApplicationMixin: Ud } = foundry.applications.api, jd = "mwd-gmgadget", nl = "gmDnPresets", Rs = "gmNextDn", Gi = "gmDnAnnounceToChat", Gd = Object.freeze([
  { label: "Standard", dn: 1 },
  { label: "Challenging", dn: 2 },
  { label: "Hard", dn: 3 },
  { label: "Extreme", dn: 4 }
]), qd = "systems/mwd/templates/v2/mwd-gmgadget.hbs", qi = Object.freeze({
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
function Vd(s = "") {
  return String(s ?? "").split(",").map((e) => e.trim()).filter(Boolean).map((e) => {
    const [t, i] = e.split(":").map((n) => (n ?? "").trim()), a = t || "DN", r = Number.isFinite(Number(i)) ? Number(i) : Number(t);
    return {
      label: a,
      dn: Number.isFinite(r) ? Math.max(0, Math.trunc(r)) : null
    };
  }).filter((e) => Number.isFinite(e.dn));
}
function Kd(s = []) {
  const e = new Error(s[0] ?? "Invalid GM DN presets.");
  return e.validationErrors = Array.isArray(s) ? s.filter(Boolean) : [], e;
}
function Yd() {
  return foundry.utils.deepClone(Gd);
}
function os(s, { strict: e = !1 } = {}) {
  const t = typeof s == "string" ? Vd(s) : Array.isArray(s) ? s : [], i = [], a = [], r = /* @__PURE__ */ new Set();
  if (t.forEach((n, o) => {
    const l = String((n == null ? void 0 : n.label) ?? "").trim(), c = n == null ? void 0 : n.dn, u = `Preset ${o + 1}`;
    if (!l) {
      e && a.push(`${u}: label cannot be blank.`);
      return;
    }
    const d = l.toLowerCase();
    if (r.has(d)) {
      e && a.push(`${u}: duplicate label "${l}".`);
      return;
    }
    const m = Number(c);
    if (!Number.isFinite(m)) {
      e && a.push(`${u}: DN must be numeric.`);
      return;
    }
    if (m < 0) {
      e && a.push(`${u}: DN cannot be negative.`);
      return;
    }
    r.add(d), i.push({
      label: l,
      dn: Math.trunc(m)
    });
  }), e && a.length) throw Kd(a);
  return i;
}
function ba(s = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(qi),
    s ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function Qd(s) {
  var t, i;
  return !(s != null && s.token) || !(s != null && s.actor) ? {
    label: "No scene target",
    reason: String((s == null ? void 0 : s.reason) ?? "No controlled or targeted token."),
    supported: !1
  } : {
    label: String(((t = s.token) == null ? void 0 : t.name) ?? ((i = s.actor) == null ? void 0 : i.name) ?? "Token").trim(),
    reason: "",
    supported: !0
  };
}
function Jd(s) {
  var t;
  if (!(s != null && s.actor))
    return {
      label: "No target selected",
      source: "",
      reason: String((s == null ? void 0 : s.reason) ?? "Choose a supported character target.")
    };
  const e = s.source === "scene" || s.source === "token" ? "Scene target" : "Actor fallback";
  return {
    label: String(((t = s.actor) == null ? void 0 : t.name) ?? "Character").trim() || "Character",
    source: e,
    reason: ""
  };
}
function Xd(s) {
  return Ze.getStatusOptions(s);
}
function Zd(s = "mwd") {
  game.settings.register(s, Rs, {
    scope: "client",
    config: !1,
    type: Number,
    default: 1
  }), game.settings.register(s, Gi, {
    scope: "client",
    config: !0,
    name: "Announce GM DN changes to chat",
    hint: "If enabled, posts a small chat notice when you change the current DN preset.",
    type: Boolean,
    default: !1
  });
}
const $e = class $e extends Ud(Hd) {
  constructor({ systemId: e = "mwd", ...t } = {}) {
    super(t), this.systemId = e, this.activeTab = "difficulty", this.harmState = ba();
  }
  async render(e = {}) {
    var t;
    return (t = game.user) != null && t.isGM ? super.render(e) : this;
  }
  async _prepareContext(e) {
    var p, h, g, y;
    const t = await super._prepareContext(e), i = os(
      game.settings.get(this.systemId, nl),
      { strict: !1 }
    ), a = Number(game.settings.get(this.systemId, Rs) ?? 1), r = !!game.settings.get(this.systemId, Gi), n = Ze.getActorOptions(), o = Ze.getSceneTarget(), l = this.harmState.actorId ? ((h = (p = game.actors) == null ? void 0 : p.get) == null ? void 0 : h.call(p, this.harmState.actorId)) ?? null : null, c = Ze.resolveTarget({
      actor: l,
      actorId: this.harmState.actorId,
      preferSceneTarget: !0
    }), u = Xd(c.actor ?? l ?? null), d = ba(this.harmState);
    !d.statusId && u.length && (d.statusId = u[0].value, this.harmState.statusId = d.statusId);
    const m = wn(
      game.settings.get(this.systemId, Qa)
    ), f = Tn(
      (g = canvas == null ? void 0 : canvas.scene) == null ? void 0 : g.getFlag("mwd", Cs)
    );
    return foundry.utils.mergeObject(t, {
      presets: i,
      currentDn: a,
      currentTab: this.activeTab,
      announce: r,
      isGM: ((y = game.user) == null ? void 0 : y.isGM) ?? !1,
      scene: {
        hasScene: !!(canvas != null && canvas.scene),
        templates: m,
        activeModifiers: f,
        attributeFilterOptions: Lr,
        intentFilterOptions: $r
      },
      harm: {
        state: d,
        actorOptions: n,
        modes: Ze.MODE_OPTIONS,
        damageTypes: gd,
        statusOptions: u,
        sceneTarget: Qd(o),
        effectiveTarget: Jd(c),
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
    }, a = (n, o = !1) => {
      const l = t.querySelector(n);
      return l instanceof HTMLInputElement ? l.checked : o;
    };
    return this.harmState = ba({
      actorId: i('[name="harm-actorId"]', this.harmState.actorId),
      mode: i('[name="harm-mode"]', this.harmState.mode),
      delta: Number(i('[name="harm-delta"]', this.harmState.delta)),
      useArmor: a('[name="harm-useArmor"]', this.harmState.useArmor),
      damageType: i('[name="harm-damageType"]', this.harmState.damageType),
      statusId: i('[name="harm-statusId"]', this.harmState.statusId),
      statusActive: i('[name="harm-statusActive"]', this.harmState.statusActive ? "add" : "remove") !== "remove",
      source: i('[name="harm-source"]', this.harmState.source),
      notes: i('[name="harm-notes"]', this.harmState.notes)
    }), Number.isFinite(Number(this.harmState.delta)) || (this.harmState.delta = qi.delta), this.harmState;
  }
  async _onSetDn(e, t) {
    var r, n, o;
    if (e.preventDefault(), e.stopPropagation(), !((r = game.user) != null && r.isGM)) return;
    const i = Math.max(0, Math.trunc(Number(((n = t == null ? void 0 : t.dataset) == null ? void 0 : n.dn) ?? NaN)));
    if (!Number.isFinite(i)) return;
    if (await game.settings.set(this.systemId, Rs, i), !!game.settings.get(this.systemId, Gi)) {
      const l = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.label) ?? `DN ${i}`);
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ user: game.user }),
        content: `<div class="mwd-gm-notice"><b>GM Difficulty:</b> ${foundry.utils.escapeHTML(l)} (DN ${i} hits)</div>`
      });
    }
    return this.render({ parts: ["body"] });
  }
  async _onSwitchTab(e, t) {
    var a, r, n;
    (a = e == null ? void 0 : e.preventDefault) == null || a.call(e), (r = e == null ? void 0 : e.stopPropagation) == null || r.call(e);
    const i = String(((n = t == null ? void 0 : t.dataset) == null ? void 0 : n.tab) ?? "").trim();
    if (!(!i || i === this.activeTab))
      return this._captureHarmStateFromDom(t), this.activeTab = i, this.render({ parts: ["body"] });
  }
  async _onClearDn(e, t) {
    var i;
    if (e.preventDefault(), e.stopPropagation(), !!((i = game.user) != null && i.isGM))
      return await game.settings.set(this.systemId, Rs, 1), this.render({ parts: ["body"] });
  }
  async _onToggleAnnounce(e, t) {
    var a;
    if (e.preventDefault(), e.stopPropagation(), !((a = game.user) != null && a.isGM)) return;
    const i = !game.settings.get(this.systemId, Gi);
    return await game.settings.set(this.systemId, Gi, i), this.render({ parts: ["body"] });
  }
  async _onHarmInputChange(e, t) {
    var a, r;
    (a = e == null ? void 0 : e.preventDefault) == null || a.call(e), this._captureHarmStateFromDom(t);
    const i = String(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.harmKey) ?? "").trim();
    if (["actorId", "mode", "useArmor"].includes(i))
      return this.render({ parts: ["body"] });
  }
  async _onRefreshHarmTarget(e, t) {
    var i, a;
    return (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (a = e == null ? void 0 : e.stopPropagation) == null || a.call(e), this._captureHarmStateFromDom(t), this.render({ parts: ["body"] });
  }
  async _onApplyHarm(e, t) {
    var n, o, l, c, u;
    if ((n = e == null ? void 0 : e.preventDefault) == null || n.call(e), (o = e == null ? void 0 : e.stopPropagation) == null || o.call(e), !((l = game.user) != null && l.isGM)) return;
    const i = this._captureHarmStateFromDom(t), a = this._buildHarmPayload(i);
    if (!a) {
      (c = ui.notifications) == null || c.warn("Choose a valid harm action before applying it.");
      return;
    }
    const r = await Ze.apply({
      payload: a,
      options: {
        actorId: i.actorId,
        preferSceneTarget: !0,
        logToChat: !0
      }
    });
    return r != null && r.ok ? this.render({ parts: ["body"] }) : ((u = ui.notifications) == null || u.warn((r == null ? void 0 : r.reason) ?? "Unable to apply harm."), this.render({ parts: ["body"] }));
  }
  _buildHarmPayload(e) {
    const t = String((e == null ? void 0 : e.source) ?? "").trim(), i = String((e == null ? void 0 : e.notes) ?? "").trim(), a = String((e == null ? void 0 : e.mode) ?? "").trim();
    if (a === "status") {
      const r = String((e == null ? void 0 : e.statusId) ?? "").trim();
      return r ? {
        mode: "status",
        statusId: r,
        active: !!(e != null && e.statusActive),
        source: t,
        notes: i
      } : null;
    }
    return a === "burn" ? {
      mode: "burnDelta",
      delta: kn(e == null ? void 0 : e.delta, qi.delta),
      source: t,
      notes: i
    } : a === "physical" || a === "fatigue" ? {
      mode: "trackDelta",
      track: a,
      delta: kn(e == null ? void 0 : e.delta, qi.delta),
      useArmor: !!(e != null && e.useArmor),
      damageType: (e == null ? void 0 : e.damageType) ?? qi.damageType,
      source: t,
      notes: i
    } : null;
  }
  // ---- Scene modifier actions ----
  async _onAddSceneModifierFromPreset(e, t) {
    var l, c, u, d;
    if ((l = e == null ? void 0 : e.preventDefault) == null || l.call(e), (c = e == null ? void 0 : e.stopPropagation) == null || c.call(e), !((u = game.user) != null && u.isGM)) return;
    const i = ((d = t == null ? void 0 : t.closest) == null ? void 0 : d.call(t, ".mwd-gmgadget__root")) ?? this._getRootElement(), a = i instanceof HTMLElement ? i.querySelector('select[name="scene-preset-index"]') : null, r = a instanceof HTMLSelectElement ? Number(a.value) : NaN, n = wn(
      game.settings.get(this.systemId, Qa)
    ), o = Number.isFinite(r) ? n[r] : null;
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
    var a, r, n, o;
    if ((a = e == null ? void 0 : e.preventDefault) == null || a.call(e), (r = e == null ? void 0 : e.stopPropagation) == null || r.call(e), !((n = game.user) != null && n.isGM)) return;
    const i = this._captureAdhocFormFromDom(t);
    if (!i) {
      (o = ui.notifications) == null || o.warn("Label and a numeric value are required.");
      return;
    }
    await this._mutateSceneModifiers((l) => [...l, i]);
  }
  async _onToggleSceneModifier(e, t) {
    var a, r, n, o;
    if ((a = e == null ? void 0 : e.preventDefault) == null || a.call(e), (r = e == null ? void 0 : e.stopPropagation) == null || r.call(e), !((n = game.user) != null && n.isGM)) return;
    const i = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.modId) ?? "").trim();
    i && await this._mutateSceneModifiers(
      (l) => l.map((c) => c.id === i ? { ...c, enabled: !c.enabled } : c)
    );
  }
  async _onRemoveSceneModifier(e, t) {
    var a, r, n, o;
    if ((a = e == null ? void 0 : e.preventDefault) == null || a.call(e), (r = e == null ? void 0 : e.stopPropagation) == null || r.call(e), !((n = game.user) != null && n.isGM)) return;
    const i = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.modId) ?? "").trim();
    i && await this._mutateSceneModifiers((l) => l.filter((c) => c.id !== i));
  }
  async _onClearSceneModifiers(e, t) {
    var i, a, r;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (a = e == null ? void 0 : e.stopPropagation) == null || a.call(e), (r = game.user) != null && r.isGM && await this._mutateSceneModifiers(() => []);
  }
  async _mutateSceneModifiers(e) {
    const t = canvas == null ? void 0 : canvas.scene;
    if (!t) return;
    const i = Tn(t.getFlag("mwd", Cs)), a = await e(i);
    return await t.setFlag("mwd", Cs, a), this.render({ parts: ["body"] });
  }
  _captureAdhocFormFromDom(e) {
    var c;
    const t = ((c = e == null ? void 0 : e.closest) == null ? void 0 : c.call(e, ".mwd-gmgadget__root")) ?? this._getRootElement();
    if (!(t instanceof HTMLElement)) return null;
    const i = (u) => {
      const d = t.querySelector(u);
      return d instanceof HTMLInputElement || d instanceof HTMLSelectElement ? d.value : "";
    }, a = i('[name="scene-adhoc-label"]').trim(), r = i('[name="scene-adhoc-value"]').trim(), n = i('[name="scene-adhoc-attributeFilter"]').trim() || null, o = i('[name="scene-adhoc-intentFilter"]').trim() || null;
    if (!a) return null;
    const l = Number(r);
    return Number.isFinite(l) ? {
      id: foundry.utils.randomID(),
      label: a,
      value: Math.trunc(l),
      enabled: !0,
      attributeFilter: n,
      intentFilter: o,
      source: "adhoc"
    } : null;
  }
};
N($e, "DEFAULT_OPTIONS", {
  id: jd,
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
    switchTab: $e.prototype._onSwitchTab,
    setDn: $e.prototype._onSetDn,
    clearDn: $e.prototype._onClearDn,
    toggleAnnounce: $e.prototype._onToggleAnnounce,
    harmInputChange: $e.prototype._onHarmInputChange,
    refreshHarmTarget: $e.prototype._onRefreshHarmTarget,
    applyHarm: $e.prototype._onApplyHarm,
    addSceneModifierFromPreset: $e.prototype._onAddSceneModifierFromPreset,
    addSceneModifierAdhoc: $e.prototype._onAddSceneModifierAdhoc,
    toggleSceneModifier: $e.prototype._onToggleSceneModifier,
    removeSceneModifier: $e.prototype._onRemoveSceneModifier,
    clearSceneModifiers: $e.prototype._onClearSceneModifiers
  }
}), N($e, "PARTS", {
  body: { template: qd }
});
let Ja = $e;
function wn(s) {
  return Array.isArray(s) ? s.filter((e) => (e == null ? void 0 : e.label) && Number.isFinite(Number(e == null ? void 0 : e.value))).map((e, t) => {
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
function Tn(s) {
  return Array.isArray(s) ? s.map((e) => {
    var r, n;
    const t = Zo(e), i = ((r = Lr.find((o) => o.value === (t.attributeFilter ?? ""))) == null ? void 0 : r.label) ?? null, a = ((n = $r.find((o) => o.value === (t.intentFilter ?? ""))) == null ? void 0 : n.label) ?? null;
    return {
      ...t,
      attributeFilterLabel: t.attributeFilter ? i : null,
      intentFilterLabel: t.intentFilter ? a : null,
      signedValue: t.value >= 0 ? `+${t.value}` : String(t.value),
      isPositive: t.value > 0
    };
  }) : [];
}
function kn(s, e = 0) {
  const t = Number(s);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
let Sa = null;
function em({ systemId: s = "mwd" } = {}) {
  return Sa || (Sa = new Ja({ systemId: s })), Sa;
}
const tm = "gmDnPresetEditor";
function im(s = []) {
  const e = [], t = [], i = /* @__PURE__ */ new Set();
  if ((Array.isArray(s) ? s : []).forEach((a, r) => {
    const n = String((a == null ? void 0 : a.label) ?? "").trim(), o = String((a == null ? void 0 : a.dn) ?? "").trim(), l = `Row ${r + 1}`;
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
  }), t.length) throw pi(t);
  return os(e, { strict: !0 });
}
function sm(s = []) {
  return os(s, { strict: !1 }).map((e) => ({
    label: e.label,
    dn: String(e.dn)
  }));
}
function am(s = "") {
  const e = String(s ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw pi([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return os(t, { strict: !0 });
}
function rm(s = []) {
  return JSON.stringify(
    os(s, { strict: !1 }),
    null,
    2
  );
}
const nm = {
  id: "gm-dn-presets",
  menuKey: tm,
  settingKey: nl,
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
  defaultData: Yd,
  createEmptyRow: () => ({
    label: "",
    dn: "1"
  }),
  toRows: sm,
  rowsToValue: im,
  parseBulk: am,
  serializeBulk: rm
};
function om() {
  ea(nm);
}
const lm = "lifeModuleCatalogEditor";
function cm(s = []) {
  return gi((Array.isArray(s) ? s : []).map((e) => ({
    id: String((e == null ? void 0 : e.id) ?? ""),
    moduleType: String((e == null ? void 0 : e.moduleType) ?? ""),
    label: String((e == null ? void 0 : e.label) ?? ""),
    grants: String((e == null ? void 0 : e.grants) ?? ""),
    requiresAny: String((e == null ? void 0 : e.requiresAny) ?? ""),
    excludesAny: String((e == null ? void 0 : e.excludesAny) ?? "")
  })), { strict: !0 });
}
function um(s = []) {
  return gi(s, { strict: !1 }).map((e) => ({
    id: e.id,
    moduleType: e.moduleType,
    label: e.label,
    grants: ju(e.grants),
    requiresAny: e.requiresAny.join(", "),
    excludesAny: e.excludesAny.join(", ")
  }));
}
function dm(s = "") {
  const e = String(s ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    const a = new Error(`Bulk JSON must be valid JSON: ${i.message}`);
    throw a.validationErrors = [a.message], a;
  }
  if (!Array.isArray(t)) {
    const i = new Error("Bulk JSON must be an array.");
    throw i.validationErrors = [i.message], i;
  }
  return gi(t, { strict: !0 });
}
function mm(s = []) {
  return JSON.stringify(
    gi(s, { strict: !1 }),
    null,
    2
  );
}
const pm = {
  id: "life-module-catalog",
  menuKey: lm,
  settingKey: Ri,
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
      options: Uo
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
  defaultData: Ir,
  createEmptyRow: () => ({
    id: "",
    moduleType: "childhood",
    label: "",
    grants: "",
    requiresAny: "",
    excludesAny: ""
  }),
  toRows: um,
  rowsToValue: cm,
  parseBulk: dm,
  serializeBulk: mm
};
function fm() {
  ea(pm);
}
const hm = "skillSpecializationEditor";
function Xa() {
  return Ls().map((s) => ({
    value: s.code,
    label: s.label
  }));
}
function gm(s = []) {
  const e = new Set(Xa().map((a) => a.value)), t = {}, i = [];
  if ((Array.isArray(s) ? s : []).forEach((a, r) => {
    const n = String((a == null ? void 0 : a.skillCode) ?? "").trim(), o = String((a == null ? void 0 : a.label) ?? "").trim(), l = `Row ${r + 1}`;
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
  }), i.length) throw pi(i);
  return Vs(t, { strict: !0 });
}
function ym(s = {}) {
  const e = Vs(s, { strict: !1 });
  return Object.entries(e).flatMap(
    ([t, i]) => i.map((a) => ({ skillCode: t, label: a }))
  );
}
function bm(s = "") {
  const e = String(s ?? "").trim();
  if (!e) return {};
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw pi([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return Vs(t, { strict: !0 });
}
function Sm(s = {}) {
  return JSON.stringify(
    Vs(s, { strict: !1 }),
    null,
    2
  );
}
const Am = {
  id: "skill-specializations",
  menuKey: hm,
  settingKey: $a,
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
      options: Xa
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
  defaultData: So,
  createEmptyRow: () => {
    var s;
    return {
      skillCode: ((s = Xa()[0]) == null ? void 0 : s.value) ?? "",
      label: ""
    };
  },
  toRows: ym,
  rowsToValue: gm,
  parseBulk: bm,
  serializeBulk: Sm
};
function wm() {
  ea(Am);
}
class Tm {
  static register() {
    om(), fm(), wm(), Wd(), game.settings.register(T, "useDestinyMechanics", {
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
    });
  }
  static getSystemProperty(e, t) {
    return game.settings.get(T, e) ?? t;
  }
}
class km extends Error {
  constructor(e, { severity: t = "error" } = {}) {
    super(e), this.name = "UserFacingRollError", this.userFacing = !0, this.severity = t === "warn" ? "warn" : "error";
  }
}
function Ci(s, e = {}) {
  return new km(s, e);
}
function Fs(s, e = "Unable to execute roll.") {
  var i, a;
  const t = s != null && s.userFacing && (s == null ? void 0 : s.severity) === "warn" ? "warn" : "error";
  (a = (i = ui.notifications) == null ? void 0 : i[t]) == null || a.call(i, (s == null ? void 0 : s.message) ?? e);
}
const { HandlebarsApplicationMixin: vm } = foundry.applications.api, { HTMLField: Mm } = foundry.data.fields;
function Em(s) {
  const e = new Mm({ required: !1, blank: !0, initial: "" });
  return e.name = s, e;
}
var Xe, as, Gt, ei, Za, er;
const We = class We extends vm(foundry.applications.sheets.ActorSheetV2) {
  constructor() {
    super(...arguments);
    be(this, ei);
    be(this, Xe, !1);
    /** Track active CSB tab per group across rerenders */
    be(this, as, /* @__PURE__ */ new Map());
    // group -> tabId
    be(this, Gt, /* @__PURE__ */ new Map());
  }
  /** @override */
  _updatePosition(t) {
    const i = super._updatePosition(t), {
      MIN_WIDTH: a,
      MAX_WIDTH: r,
      MIN_HEIGHT: n,
      MAX_HEIGHT: o
    } = this.constructor;
    return typeof i.width == "number" && (i.width = Math.min(
      r,
      Math.max(a, i.width)
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
    return F(this, Xe);
  }
  toggleEditing() {
    if (this.isEditable) {
      if (F(this, Xe)) {
        this._commitEditsToActor().finally(() => {
          Pe(this, Xe, !F(this, Xe)), this.render({ force: !0 });
        });
        return;
      }
      Pe(this, Xe, !F(this, Xe)), this.render({ force: !0 });
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
    const t = this.actor ?? this.document ?? null, i = (t == null ? void 0 : t.token) ?? null, a = (r = this.document) != null && r.isToken ? ((n = this.document) == null ? void 0 : n.token) ?? i ?? null : i;
    return a ? (a == null ? void 0 : a.document) ?? a : null;
  }
  /**
   * Resolve the document that should persist actor-backed state.
   * Linked token sheets should write to the base actor document so state survives scene changes.
   */
  getPersistentActor() {
    var a, r, n;
    const t = this.actor ?? this.document ?? null;
    if (!t) return null;
    const i = this.getSheetTokenDocument();
    return i != null && i.isLinked ? i.baseActor ?? ((n = (a = game.actors) == null ? void 0 : a.get) == null ? void 0 : n.call(a, ((r = i == null ? void 0 : i.baseActor) == null ? void 0 : r.id) ?? "")) ?? i.actor ?? t : t;
  }
  /** @override */
  _initializeApplicationOptions(t) {
    var o, l, c, u, d;
    t = super._initializeApplicationOptions(t), t.classes = Array.from(t.classes ?? []);
    const i = (t == null ? void 0 : t.document) ?? this.document, a = (i == null ? void 0 : i.type) ?? ((o = this.actor) == null ? void 0 : o.type);
    a && t.classes.push(String(a));
    const r = ((d = (u = (c = (l = game.system) == null ? void 0 : l.anarchy) == null ? void 0 : c.styles) == null ? void 0 : u.selectCssClass) == null ? void 0 : d.call(u)) ?? "mwd-theme-default", n = ["mwd-theme-default", "mwd-theme-sra"];
    for (let m = t.classes.length - 1; m >= 0; m--)
      n.includes(t.classes[m]) && t.classes.splice(m, 1);
    return t.classes.push(r), t;
  }
  /**
   * No localization: provide a concrete title so Foundry doesn't show "TYPES.Actor.<type>".
   * @override
   */
  get title() {
    var n, o;
    const t = ((n = this.actor) == null ? void 0 : n.type) ?? "actor", a = {
      character: "Character",
      npc: "NPC",
      battlemech: "BattleMech",
      vehicle: "Vehicle",
      device: "Device"
    }[t] ?? String(t).replace(/(^|[-_])([a-z])/g, (l, c, u) => (c ? " " : "") + u.toUpperCase());
    return `${((o = this.actor) == null ? void 0 : o.name) ?? "Actor"} — ${a}`;
  }
  /**
   * Window actions (header/menu). Centralize here and dedupe by action key.
   * @override
   */
  _getHeaderControls() {
    var n, o;
    let t = ((n = super._getHeaderControls) == null ? void 0 : n.call(this)) ?? [];
    const i = ((o = this.document) == null ? void 0 : o.isToken) ?? !1, a = /* @__PURE__ */ new Set();
    i ? (a.add("prototypeToken"), a.add("configurePrototypeToken")) : (a.add("token"), a.add("configureToken")), t = t.filter((l) => {
      const c = (l == null ? void 0 : l.action) ?? "", u = String((l == null ? void 0 : l.label) ?? "");
      return !(a.has(c) || i && u.includes("Prototype") || !i && u === "Token");
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
    const a = ((l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, ".csb-tab-link[data-tab]")) ?? ((u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, ".csb-tab-link[data-tab]"));
    if (!a) return;
    const r = a.dataset.tab, n = a.closest(".csb-tabs");
    if (!n || !r) return;
    const o = n.dataset.group || "default";
    F(this, as).set(o, r), M(this, ei, Za).call(this, n, r);
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const a = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!a) return;
    const r = a.dataset.section, n = a.closest(".csb-accordion");
    if (!n || !r) return;
    const o = n.dataset.group || "default", c = (F(this, Gt).has(o) ? F(this, Gt).get(o) : n.dataset.default || null) === r ? null : r;
    F(this, Gt).set(o, c), M(this, ei, er).call(this, n, c);
  }
  /**
   * Universal roll action: data-action="roll" + data-roll='{"intent":"skill","key":"gunnery"}'
   */
  async _onRollAction(t, i) {
    var c, u, d, m, f, p, h, g, y;
    (c = t == null ? void 0 : t.preventDefault) == null || c.call(t);
    const a = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, "[data-roll]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-roll]")), r = (f = a == null ? void 0 : a.dataset) == null ? void 0 : f.roll;
    if (!r) return;
    let n;
    try {
      n = JSON.parse(r);
    } catch (b) {
      console.warn("MWD | Invalid data-roll JSON:", r, b);
      return;
    }
    const o = !!(t != null && t.shiftKey), l = ((p = game.mwd) == null ? void 0 : p.roll) ?? ((g = (h = game.system) == null ? void 0 : h.mwd) == null ? void 0 : g.roll);
    if (!(l != null && l.execute)) {
      (y = ui.notifications) == null || y.error("MWD roll system not initialized (game.mwd.roll.execute missing).");
      return;
    }
    try {
      return await l.execute({ actor: this.actor, payload: n, event: t, quick: o });
    } catch (b) {
      return console.error("MWD | Failed to execute roll action", b), Fs(b, "Unable to execute that roll."), null;
    }
  }
  async _onEditImage(t, i) {
    var n, o, l;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable || !this.editing) return;
    const a = foundry.applications.apps.FilePicker.implementation;
    new a({
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
    const a = this._getRootElement();
    if (a) {
      for (const l of a.querySelectorAll(".csb-tabs")) {
        const c = l.dataset.group || "default", u = F(this, as).get(c), d = l.dataset.default || ((n = l.querySelector(".csb-tab-link[data-tab]")) == null ? void 0 : n.dataset.tab), m = u || d;
        m && M(this, ei, Za).call(this, l, m);
      }
      for (const l of a.querySelectorAll(".csb-accordion")) {
        const c = l.dataset.group || "default", u = F(this, Gt).has(c) ? F(this, Gt).get(c) : l.dataset.default || null;
        M(this, ei, er).call(this, l, u);
      }
      a.querySelectorAll(".csb-tabs").length && !a.querySelector(".csb-tab-panel.is-active") && console.warn(`${ce} CSB tabs present but no active tab applied. Check element root resolution and CSS .is-active selectors.`, {
        sheet: (o = this.constructor) == null ? void 0 : o.name
      });
      for (const l of a.querySelectorAll('prose-mirror[name="system.biography.history"]'))
        l.addEventListener("change", (c) => {
          c.preventDefault(), this._updateRichTextHistory(l);
        });
    }
  }
  async _updateRichTextHistory(t) {
    if (!this.isEditable || (t == null ? void 0 : t.name) !== "system.biography.history") return;
    const i = String(t.value ?? ""), a = String(foundry.utils.getProperty(this.actor, "system.biography.history") ?? "");
    if (i !== a)
      try {
        await (this.getPersistentActor() ?? this.actor).update({ "system.biography.history": i });
      } catch (r) {
        console.warn("MWD | Rich text history update failed:", r);
      }
  }
  async _commitEditsToActor() {
    const t = this.element;
    if (!t) return;
    const i = t.querySelectorAll('input[name][data-edit-field="staged"], select[name][data-edit-field="staged"], textarea[name][data-edit-field="staged"]');
    if (!i.length) return;
    const a = {};
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
      typeof o == "number" && Number.isNaN(o) && (o = 0), o = this._clampByPath(n, o), foundry.utils.getProperty(this.actor, n) !== o && (a[n] = o);
    }
    if (Object.keys(a).length)
      try {
        await (this.getPersistentActor() ?? this.actor).update(a);
      } catch (r) {
        console.warn("MWD | Commit failed (permissions or validation):", r);
      }
  }
  /** @override */
  async _prepareContext(t) {
    var n, o, l, c, u, d, m, f, p, h, g;
    console.log(`${ce}BaseActorSheetV2._prepareContext:start`, {
      actorName: (n = this.actor) == null ? void 0 : n.name,
      actorType: (o = this.actor) == null ? void 0 : o.type
    });
    const i = await super._prepareContext(t), a = foundry.utils.deepClone((i == null ? void 0 : i.options) ?? {});
    a.classes = Array.from(((l = this.options) == null ? void 0 : l.classes) ?? []), a.cssClass = a.classes.join(" ");
    const r = foundry.utils.mergeObject(
      i,
      {
        actor: this.actor,
        system: (c = this.actor) == null ? void 0 : c.system,
        editable: this.isEditable,
        owner: ((u = this.document) == null ? void 0 : u.isOwner) ?? !1,
        limited: !(((d = this.document) == null ? void 0 : d.isOwner) ?? !1),
        editing: F(this, Xe),
        // Template contract
        data: this.actor,
        // legacy alias
        options: a,
        // safe, template-only
        cssClass: a.cssClass
      },
      { inplace: !1 }
    );
    return r.options.owner = r.owner, r.options.limited = r.limited, r.options.editable = r.editable, r.options.editing = r.editing, r.options.viewMode = !r.editing, r.skillsDisplay = wo(((m = this.actor) == null ? void 0 : m.system) ?? {}), r.bio = {
      ...r.bio ?? {},
      fields: {
        history: Em("system.biography.history")
      }
    }, r.items ?? (r.items = {}), (f = this.actor) != null && f.items && typeof (Q == null ? void 0 : Q.classifyInto) == "function" && (Q.classifyInto(r.items, this.actor.items), r.items.weapon = [
      ...r.items.mechWeapon ?? [],
      ...r.items.personalWeapon ?? []
    ]), r.npcItems = {
      traits: r.items.quality ?? [],
      weapons: r.items.weapon ?? [],
      assetModules: r.items.assetModule ?? [],
      inventory: r.items.gear ?? []
    }, console.log(`${ce}BaseActorSheetV2._prepareContext:done`, {
      actorType: (p = this.actor) == null ? void 0 : p.type,
      cssClass: r.cssClass,
      itemCount: ((g = (h = this.actor) == null ? void 0 : h.items) == null ? void 0 : g.size) ?? 0,
      editing: F(this, Xe)
    }), r;
  }
  /** Clamp certain actor system paths to valid ranges */
  _clampByPath(t, i) {
    return typeof i != "number" ? i : ((/^system\.skills\.[^.]+\.rating$/.test(t) || /^system\.attributes\.[^.]+\.value$/.test(t)) && (i = Math.trunc(i)), /^system\.skills\.[^.]+\.rating$/.test(t) ? Math.clamp(i, 0, 12) : /^system\.attributes\.[^.]+\.value$/.test(t) ? Math.clamp(i, 0, 10) : i);
  }
  /** Action handler: Condition Monitor set */
  async _onMonitorSet(t, i) {
    var f, p;
    if (t.preventDefault(), !this.isEditable) return;
    const a = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.monitor) ?? "").trim(), r = Number((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.value);
    if (!a || !Number.isFinite(r)) return;
    const n = a === "burn" ? "system.burn.value" : `system.monitors.${a}.value`, o = Number(foundry.utils.getProperty(this.actor, n) ?? 0), l = a === "armor" ? r : o === r ? 0 : r, c = this.getPersistentActor() ?? this.actor;
    if (typeof (c == null ? void 0 : c.setMonitorValue) == "function")
      return c.setMonitorValue(a, l, { source: "sheet" });
    const u = `system.monitors.${a}`, d = Number(foundry.utils.getProperty(c, `${u}.max`)) || 0, m = Math.min(Math.max(0, l), Math.max(0, d));
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
Xe = new WeakMap(), as = new WeakMap(), Gt = new WeakMap(), ei = new WeakSet(), /**
 * Apply active-state classes within a single .csb-tabs root.
 * Idempotent: safe to call every render.
 */
Za = function(t, i) {
  t.querySelectorAll(".csb-tab-link").forEach((a) => {
    a.classList.toggle("is-active", a.dataset.tab === i);
  }), t.querySelectorAll(".csb-tab-panel").forEach((a) => {
    a.classList.toggle("is-active", a.dataset.tab === i);
  });
}, er = function(t, i) {
  t.dataset.activeSection = i ?? "", t.querySelectorAll(".csb-accordion__section").forEach((a) => {
    const r = a.dataset.section === i;
    a.classList.toggle("is-active", r);
  }), t.querySelectorAll(".csb-accordion__trigger").forEach((a) => {
    const r = a.dataset.section === i;
    a.classList.toggle("is-active", r), a.setAttribute("aria-expanded", r ? "true" : "false");
  }), t.querySelectorAll(".csb-accordion__panel").forEach((a) => {
    const r = a.closest(".csb-accordion__section"), n = (r == null ? void 0 : r.dataset.section) === i;
    a.classList.toggle("is-active", n);
  });
}, // ---- Hard minimum size (resize clamp) ----
N(We, "MIN_WIDTH", 800), N(We, "MAX_WIDTH", 950), N(We, "MIN_HEIGHT", 600), N(We, "MAX_HEIGHT", 1400), // group -> sectionId|null
/** @override */
N(We, "DEFAULT_OPTIONS", foundry.utils.mergeObject(yi(We, We, "DEFAULT_OPTIONS"), {
  classes: ["sheet", "actor", T, "appv2", "mwd-sheet", "mwd-character-sheet"],
  position: { width: 760, height: 760 },
  window: { resizable: !0, minimizable: !0 },
  actions: {
    toggleViewMode: We.prototype._onToggleViewMode,
    tab: We.prototype._onClickTab,
    accordion: We.prototype._onClickAccordion,
    roll: We.prototype._onRollAction,
    monitorSet: We.prototype._onMonitorSet,
    editImage: We.prototype._onEditImage
  }
}, { inplace: !1 }));
let xi = We;
var qt, ti, ol, ll, cl;
const Qi = class Qi {
  static async get(e) {
    if (F(this, qt).has(e)) {
      const a = await F(this, qt).get(e);
      if (Number((a == null ? void 0 : a.version) ?? 0) > 0) return a;
      F(this, qt).delete(e);
    }
    const t = M(this, ti, ol).call(this, e);
    F(this, qt).set(e, t);
    const i = await t;
    return Number((i == null ? void 0 : i.version) ?? 0) <= 0 && F(this, qt).delete(e), i;
  }
};
qt = new WeakMap(), ti = new WeakSet(), ol = async function(e) {
  const t = `systems/${T}/templates/v2/layouts/${e}.layout.json`;
  let i;
  try {
    const a = await fetch(t);
    if (!a.ok) throw new Error(`HTTP ${a.status} for ${t}`);
    i = await a.json();
  } catch (a) {
    console.error(`${ce}LayoutRegistry.get FAILED`, { layoutId: e, url: t, e: a }), i = { id: e, version: 0, root: { type: "stack", children: [] } };
  }
  return M(this, ti, ll).call(this, i);
}, ll = function(e) {
  const t = (i) => {
    var a;
    return !i || typeof i != "object" || (i.template ?? (i.template = M(a = Qi, ti, cl).call(a, i)), i.children = Array.isArray(i.children) ? i.children : [], Array.isArray(i.classes) || (typeof i.classes == "string" ? i.classes = i.classes.split(/\s+/).filter(Boolean) : i.classes = []), i.children = i.children.map(t), i.type === "tabs" && Array.isArray(i.tabs) && (i.tabs = i.tabs.map((r) => ({
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
}, cl = function(e) {
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
}, be(Qi, ti), be(Qi, qt, /* @__PURE__ */ new Map());
let zs = Qi;
function ze(s, e = 0) {
  const t = Number(s);
  return Number.isFinite(t) ? t : e;
}
function Cm(s) {
  return String(s ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function hs(s, e = 180) {
  const t = Cm(s);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function Ht(s = []) {
  return s.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function gs(s = []) {
  return s.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim(),
    emphasis: e.emphasis ?? ""
  }));
}
function ys(s = []) {
  return Ht(s).map((e) => ({ label: e }));
}
function bs(s = []) {
  return s.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
const Pm = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}, Nm = {
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
function vn(s) {
  const e = Number(s ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function Rm({ defenseBonus: s = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(s ?? 0) || 0;
  i !== 0 && t.push(`Defense ${vn(i)}`);
  for (const [a, r] of Object.entries(Pm)) {
    const n = Number((e == null ? void 0 : e[a]) ?? 0) || 0;
    n !== 0 && t.push(`${r} ${vn(n)}`);
  }
  return t.join(" | ");
}
function Dm(s = {}, e = ["close", "near", "far", "extreme"]) {
  return e.map((t) => {
    const i = ze(s == null ? void 0 : s[t], 0);
    return `${t.charAt(0).toUpperCase() + t.slice(1)} ${i}`;
  }).join(" | ");
}
function Im(s = {}) {
  return ["close", "near", "far", "extreme"].map((e) => `${e.charAt(0).toUpperCase()}${ze(s == null ? void 0 : s[e], 0)}`).join(" ");
}
function Om(s = "") {
  const e = String(s ?? "").trim().toLowerCase();
  return e ? e.charAt(0).toUpperCase() + e.slice(1) : "";
}
function Aa(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function Mn({ title: s, label: e, options: t = [], confirmLabel: i = "Select" } = {}) {
  const a = Array.isArray(t) ? t.filter((n) => n == null ? void 0 : n.value) : [];
  if (!a.length) return "";
  if (a.length === 1) return String(a[0].value ?? "").trim();
  const r = `<form class="mwd-quick-select"><div class="mwd-field"><label>${Aa(e)}</label><select name="selection">${a.map((n) => `<option value="${Aa(n.value)}">${Aa(n.label ?? n.value)}</option>`).join("")}</select></div></form>`;
  return await Dialog.prompt({
    title: s,
    content: r,
    label: i,
    callback: (n) => {
      var o;
      return String(n.find('select[name="selection"]').val() ?? ((o = a[0]) == null ? void 0 : o.value) ?? "").trim();
    }
  });
}
var Ke, Vt, ni, ct, z, ul, ir, Ds, dl, ml, ve, ai, Ei, Vi;
const me = class me extends xi {
  constructor() {
    super(...arguments);
    be(this, z);
    be(this, Ke, null);
    be(this, Vt, null);
    be(this, ni, null);
    be(this, ct, /* @__PURE__ */ new Set());
  }
  /** @override */
  async _prepareContext(t) {
    var O, R, U, B, te, he, ge, Ce, De, Ye, Mt, Et, Ct, Pt, Nt, Rt, Dt, It, Ot, _t, Lt, $t, xt, nt, Bt, Ft, zt;
    const i = await super._prepareContext(t), a = ((O = this.getSheetTokenDocument) == null ? void 0 : O.call(this)) ?? null;
    i._mwdThemeClass = game.system.mwd.styles.selectCssClass(), i.layout = await zs.get("character");
    const r = ((U = (R = this.actor).getEdgeCap) == null ? void 0 : U.call(R)) ?? Number(((he = (te = (B = this.actor.system) == null ? void 0 : B.attributes) == null ? void 0 : te.edge) == null ? void 0 : he.value) ?? 0), n = !!this.isEditable, o = { physical: "Physical", mental: "Mental", social: "Social" }, l = {
      grit: "Grit",
      insight: "Insight",
      legend: "Legend",
      chaos: "Chaos",
      rumor: "Rumor",
      credibility: "Credibility"
    }, c = this.actor.getEdgePoolSummary ? this.actor.getEdgePoolSummary({ groups: gr }) : { groups: [] };
    i.edgeConsole = {
      cap: r,
      editable: n,
      capPips: Array.from({ length: Math.max(0, r) }, (v, P) => P + 1),
      groups: (c.groups ?? []).map((v) => ({
        id: v.id,
        label: o[v.id] ?? v.id,
        pools: (v.pools ?? []).map((P) => {
          const j = Number(P.effectiveValue ?? 0), re = Number(P.effectiveMax ?? 0), ue = Array.from({ length: Math.max(0, re) }, (we, H) => {
            const J = H + 1;
            return { n: J, filled: J <= j };
          }), fe = String(P.key ?? "").split(".").pop();
          return {
            key: P.key,
            label: l[fe] ?? fe ?? P.key,
            value: j,
            max: re,
            rating: Number(P.rating ?? 0),
            ratingBonus: Number(P.ratingBonus ?? 0),
            effectiveRating: Number(P.effectiveRating ?? P.rating ?? 0),
            isCapped: Number(P.effectiveRating ?? P.rating ?? 0) > Number(P.cap ?? r),
            pips: ue,
            // Paths for edit-mode inputs
            pathRating: `system.counters.edgePools.${P.key}.rating`,
            pathValue: `system.counters.edgePools.${P.key}.value`,
            // Keep the roll payload if you want pool-name click to route through BaseActorSheetV2 roll handler
            roll: JSON.stringify({ intent: "edge", pool: P.key })
          };
        })
      }))
    };
    const u = ["grit", "insight", "legend", "chaos", "rumor", "credibility"], d = /* @__PURE__ */ new Map();
    for (const v of i.edgeConsole.groups ?? [])
      for (const P of v.pools ?? []) {
        const j = String(P.key ?? "").split(".").pop();
        j && d.set(j, P), P.domain = v.id;
      }
    i.edgeConsole.poolsOrdered = u.map((v) => d.get(v)).filter(Boolean);
    const m = this.actor.system ?? {}, f = m.monitors ?? {}, p = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue", label: "Fatigue", kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor", label: "Armor", kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ], h = (v, P, j = 0) => {
      const re = foundry.utils.getProperty(v, P), ue = Number(re);
      return Number.isFinite(ue) ? ue : j;
    };
    i.conditionMonitors = p.map((v) => {
      const P = (f == null ? void 0 : f[v.id]) ?? {}, j = Math.max(0, h(P, "max", 0)), re = Math.min(Math.max(0, h(P, "value", 0)), j);
      return {
        id: v.id,
        label: v.label,
        kind: v.kind,
        editable: !!this.isEditable,
        value: re,
        max: j,
        segments: Array.from({ length: j }, (ue, fe) => {
          const we = fe + 1;
          return { value: we, filled: we <= re };
        }),
        status: v.status ? { label: v.status.label, value: h(P, v.status.path, 0) } : null
      };
    });
    const g = Number(((Ce = (ge = this.actor.system) == null ? void 0 : ge.burn) == null ? void 0 : Ce.value) ?? 0), y = 10, b = 6, A = Math.min(g, y);
    i.burnOverflow = Math.max(0, g - y), i.burnPenalty = Math.floor(g / 2), i.burnPips = Array.from({ length: y }, (v, P) => {
      const j = P + 1;
      return {
        pipValue: j,
        filled: j <= A,
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
      overloaded: !!((Ye = (De = this.actor.system) == null ? void 0 : De.burn) != null && Ye.overloaded)
    };
    const w = ne.getSnapshot(this.actor, { token: a });
    i.combatDashboard = {
      targeting: w.targeting,
      rollImpact: w.rollImpact,
      states: w.states,
      effects: w.effects,
      activation: w.activation,
      inactiveReason: w.inactiveReason
    };
    const E = ne.buildActionModel(this.actor, w), I = new Set((E.menus ?? []).map((v) => v.id));
    F(this, Ke) && !I.has(F(this, Ke)) && Pe(this, Ke, null), i.combatActions = {
      ...E,
      menus: (E.menus ?? []).map((v) => ({
        ...v,
        isOpen: v.id === F(this, Ke)
      }))
    };
    const D = ((Et = (Mt = this.actor).getPersonalCombatLoadout) == null ? void 0 : Et.call(Mt)) ?? null;
    i.personalInventory = {
      warnings: [...(D == null ? void 0 : D.warnings) ?? []],
      weapons: ((D == null ? void 0 : D.weapons) ?? []).map((v) => {
        var _e, He, x, oe, gt, Be, Qe;
        const P = M(this, z, Vi).call(this, "weapons", v.id), j = String((v == null ? void 0 : v.category) ?? "").trim().toLowerCase() !== "melee", re = !!((_e = v == null ? void 0 : v.sourceState) != null && _e.isTracked), ue = String((v == null ? void 0 : v.payloadLabel) ?? "").trim() || "Unloaded", fe = j && re ? `${ze((He = v == null ? void 0 : v.sourceState) == null ? void 0 : He.current, 0)}/${ze((x = v == null ? void 0 : v.sourceState) == null ? void 0 : x.max, 0)}` : "", we = j ? re ? `${ue} ${fe}` : ue : "", H = j ? re ? `Payload ${fe}` : `Payload ${ue}` : "", J = Dm(v.attackRatingBand), Ie = Im(v.attackRatingBand), Oe = bs([
          { label: "Skill", value: ((oe = v.skillDef) == null ? void 0 : oe.label) ?? v.skill ?? "" },
          { label: "Category", value: v.category ?? "" },
          { label: "Damage Type", value: v.damageTypeLabel ?? v.damageType ?? "" },
          { label: "Max Range", value: Om(((gt = v.range) == null ? void 0 : gt.max) ?? v.defaultRangeBand ?? "") },
          { label: "CQ Bands", value: J },
          { label: "Payload", value: we },
          { label: "Traits", value: Ht(v.traits ?? []).join(", ") }
        ]);
        return {
          id: v.id,
          accordionId: P,
          isExpanded: F(this, ct).has(P),
          name: v.name,
          img: v.img,
          subtitle: ((Be = v.skillDef) == null ? void 0 : Be.label) ?? v.category ?? "",
          summaryStats: gs([
            { label: "DV", value: ze(v.damage, 0), emphasis: "strong" },
            { label: "AP", value: ze(v.ap, 0) },
            { label: "Type", value: v.damageTypeLabel ?? v.damageType ?? "" },
            { label: "CQ", value: Ie }
          ]),
          detailTags: ys([
            v.equipped ? "Equipped" : "",
            v.isPrimary ? "Primary" : "",
            H,
            ...Ht(v.traits ?? [])
          ]),
          detailRows: Oe,
          detailText: hs(v.notes),
          equipped: !!v.equipped,
          isPrimary: !!v.isPrimary,
          attackRoll: JSON.stringify({
            intent: "attack",
            weaponId: v.id,
            payloadId: ((Qe = v == null ? void 0 : v.payloadState) == null ? void 0 : Qe.activePayloadId) ?? "",
            edge: { pool: "physical.grit", allowed: ["pre", "post"] },
            tags: ["combat", "attack"]
          })
        };
      }),
      armor: ((D == null ? void 0 : D.armor) ?? []).map((v) => {
        var we, H, J, Ie, Oe, _e, He, x, oe, gt, Be, Qe, zr, Wr;
        const P = ((we = D == null ? void 0 : D.activeArmor) == null ? void 0 : we.id) === v.id ? D.activeArmor : null, j = M(this, z, Vi).call(this, "armor", v.id), re = ze(((J = (H = P == null ? void 0 : P.traitState) == null ? void 0 : H.reinforced) == null ? void 0 : J.max) ?? ((Oe = (Ie = v == null ? void 0 : v.traitState) == null ? void 0 : Ie.reinforced) == null ? void 0 : Oe.max), 0), ue = re > 0 ? `${ze(((He = (_e = P == null ? void 0 : P.traitState) == null ? void 0 : _e.reinforced) == null ? void 0 : He.current) ?? ((oe = (x = v == null ? void 0 : v.traitState) == null ? void 0 : x.reinforced) == null ? void 0 : oe.current), 0)}/${re}` : "", fe = Rm({
          defenseBonus: v.defenseBonus,
          mitigationByType: (P == null ? void 0 : P.mitigationByType) ?? (P == null ? void 0 : P.typedMitigation) ?? v.mitigationByType ?? {}
        });
        return {
          id: v.id,
          accordionId: j,
          isExpanded: F(this, ct).has(j),
          name: v.name,
          img: v.img,
          subtitle: (gt = v.tags) != null && gt.length ? v.tags.join(", ") : "Armor",
          summaryStats: gs([
            { label: "Rating", value: ze((P == null ? void 0 : P.ratingCurrent) ?? v.rating, 0), emphasis: "strong" },
            { label: "Res", value: ze((P == null ? void 0 : P.baseMitigation) ?? (P == null ? void 0 : P.baseResistance), 0) },
            { label: "Def", value: ze(v.defenseBonus, 0) },
            { label: "Dur", value: `${ze(((Be = P == null ? void 0 : P.durability) == null ? void 0 : Be.current) ?? ((Qe = v.durability) == null ? void 0 : Qe.current), 0)}/${ze(((zr = P == null ? void 0 : P.durability) == null ? void 0 : zr.max) ?? ((Wr = v.durability) == null ? void 0 : Wr.max), 0)}` }
          ]),
          detailTags: ys([
            v.equipped ? "Equipped" : "",
            v.isPrimary ? "Primary" : "",
            ue ? `Reinforced ${ue}` : "",
            ...Ht(v.traits ?? [])
          ]),
          detailRows: bs([
            { label: "Modifiers", value: fe },
            { label: "Traits", value: Ht(v.traits ?? []).join(", ") },
            { label: "Tags", value: Ht(v.tags ?? []).join(", ") }
          ]),
          detailText: hs(v.notes),
          equipped: !!v.equipped,
          isPrimary: !!v.isPrimary
        };
      }),
      gear: (((Ct = i.items) == null ? void 0 : Ct.gear) ?? []).map((v) => {
        var H, J, Ie, Oe, _e, He, x;
        const P = M(this, z, Vi).call(this, "gear", v.id), j = Math.max(0, Math.trunc(ze(((H = v.system) == null ? void 0 : H.quantity) ?? 1, 1))), re = Math.max(0, Math.trunc(ze(((J = v.system) == null ? void 0 : J.rating) ?? 0, 0))), ue = Ht(((Ie = v.system) == null ? void 0 : Ie.tags) ?? []), fe = String(((Oe = v.system) == null ? void 0 : Oe.category) ?? "").trim(), we = Nm[fe] ?? fe;
        return {
          id: v.id,
          itemType: "gear",
          isGear: !0,
          accordionId: P,
          isExpanded: F(this, ct).has(P),
          name: v.name,
          img: v.img,
          subtitle: we || "Gear",
          summaryStats: gs([
            { label: "Qty", value: j, emphasis: "strong" },
            { label: "Rating", value: re }
          ]),
          detailTags: ys([
            ...ue,
            (_e = v.system) != null && _e.inactive ? "Inactive" : ""
          ]),
          detailRows: bs([
            { label: "Quantity", value: j },
            { label: "Rating", value: re },
            { label: "Source", value: ((He = v.system) == null ? void 0 : He.sourceReference) ?? "" },
            { label: "Category", value: we },
            { label: "Tags", value: ue.join(", ") }
          ]),
          detailText: hs((x = v.system) == null ? void 0 : x.description),
          quantity: j,
          canAdjustQuantity: this.isEditable
        };
      })
    }, i.bio = {
      fields: ((Pt = i.bio) == null ? void 0 : Pt.fields) ?? {},
      faction: ((Nt = m.biography) == null ? void 0 : Nt.faction) ?? "",
      age: ((Rt = m.biography) == null ? void 0 : Rt.age) ?? "",
      rank: ((Dt = m.biography) == null ? void 0 : Dt.rank) ?? "",
      height: ((It = m.biography) == null ? void 0 : It.height) ?? "",
      weight: ((Ot = m.biography) == null ? void 0 : Ot.weight) ?? "",
      xpTotal: ((Lt = (_t = m.counters) == null ? void 0 : _t.xp) == null ? void 0 : Lt.total) ?? 0,
      xpSpent: ((xt = ($t = m.counters) == null ? void 0 : $t.xp) == null ? void 0 : xt.value) ?? 0,
      experienceLevel: ((nt = m.biography) == null ? void 0 : nt.experienceLevel) ?? "green",
      enrichedHistory: await foundry.applications.ux.TextEditor.implementation.enrichHTML(
        ((Bt = m.biography) == null ? void 0 : Bt.history) ?? "",
        { async: !0, secrets: this.actor.isOwner, relativeTo: this.actor }
      )
    };
    const L = Jt(this.actor);
    i.skillsDisplay = wo(((Ft = this.actor) == null ? void 0 : Ft.system) ?? {}, {
      bonusBySkill: L.bonusBySkill
    }), i.lifeModules = L.slotStates.map((v) => {
      const P = v.state;
      return {
        moduleType: v.moduleType,
        label: v.label,
        hasCatalogEntries: v.availableEntries.length > 0,
        emptyState: v.availableEntries.length > 0 ? `Add ${v.label}` : `No ${v.label} catalog entries configured`,
        item: P ? {
          id: P.itemId,
          name: P.label,
          img: P.item.img,
          bonusLabels: [...P.selectedChoiceLabels ?? []],
          warningLabels: [...P.warningLabels ?? []],
          isActive: P.isActive,
          statusLabel: P.isActive ? "Active" : "Inactive",
          statusReason: P.inactiveReason
        } : null
      };
    });
    const V = ["positive", "negative", "narrative"], Y = ["major", "minor"], K = [...((zt = i.items) == null ? void 0 : zt.quality) ?? []].sort((v, P) => {
      const j = tt(v.system ?? {}), re = tt(P.system ?? {}), ue = V.indexOf(j.category) - V.indexOf(re.category);
      if (ue !== 0) return ue;
      const fe = Y.indexOf(j.tier) - Y.indexOf(re.tier);
      return fe !== 0 ? fe : String(v.name ?? "").localeCompare(String(P.name ?? ""));
    });
    return i.qualityGroups = V.map((v) => ({
      id: v,
      label: vs(v),
      records: K.filter((P) => tt(P.system ?? {}).category === v).map((P) => {
        var ue, fe, we, H;
        const j = tt(P.system ?? {}), re = M(this, z, Vi).call(this, "quality", P.id);
        return {
          id: P.id,
          accordionId: re,
          isExpanded: F(this, ct).has(re),
          name: P.name,
          img: P.img,
          subtitle: `${Ms(j.tier)} ${vs(j.category)}`,
          summaryStats: gs([
            { label: "Tier", value: Ms(j.tier), emphasis: "strong" },
            { label: "Activation", value: j.activation || "passive" },
            { label: "Effects", value: String(((ue = j.effects) == null ? void 0 : ue.length) ?? 0) }
          ]),
          detailTags: ys([
            j.inactive ? "Inactive" : "",
            ...j.tags ?? []
          ]),
          detailRows: bs([
            { label: "Category", value: vs(j.category) },
            { label: "Tier", value: Ms(j.tier) },
            { label: "Activation", value: j.activation || "passive" },
            { label: "Prerequisites", value: String(((fe = j.prerequisites) == null ? void 0 : fe.length) ?? 0) },
            { label: "Effects", value: String(((we = j.effects) == null ? void 0 : we.length) ?? 0) },
            { label: "Tags", value: Ht(j.tags ?? []).join(", ") }
          ]),
          detailText: hs((H = P.system) == null ? void 0 : H.description)
        };
      })
    })), i;
  }
  _onRender(t, i) {
    super._onRender(t, i), M(this, z, ul).call(this), M(this, z, ml).call(this);
  }
  async close(t = {}) {
    return M(this, z, ir).call(this), super.close(t);
  }
  requestCombatDashboardRefresh() {
    M(this, z, ve).call(this, { force: !0 });
  }
  async _onEdgeSet(t, i) {
    var c, u, d;
    if (t.preventDefault(), t.stopPropagation(), !this.isEditable) return;
    const a = ((c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-edge-pool][data-edge-value]")) ?? ((d = (u = t == null ? void 0 : t.target) == null ? void 0 : u.closest) == null ? void 0 : d.call(u, "[data-edge-pool][data-edge-value]"));
    if (!a) return;
    const r = String(a.dataset.edgePool ?? "").trim(), n = Number(a.dataset.edgeValue ?? NaN);
    if (!r || !Number.isFinite(n)) return;
    const o = this.actor.getEdgePool(r);
    if (!(o != null && o.hasPools)) return;
    let l = n;
    return n === o.effectiveValue && (l = n - 1), (t.button === 2 || t.type === "contextmenu") && (l = 0), t.altKey && (l = 0), t.shiftKey && (l = o.effectiveMax), this.actor.setEdgePoolValue(r, l);
  }
  async _onToggleCombatMenu(t, i) {
    var r, n, o, l, c, u, d;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const a = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.combatMenu) ?? ((d = (u = (c = (l = t == null ? void 0 : t.target) == null ? void 0 : l.closest) == null ? void 0 : c.call(l, "[data-combat-menu]")) == null ? void 0 : u.dataset) == null ? void 0 : d.combatMenu) ?? ""
    ).trim();
    a && (Pe(this, Ke, F(this, Ke) === a ? null : a), M(this, z, ve).call(this, !1));
  }
  async _onToggleStatuses(t) {
    var r, n, o, l, c, u, d, m;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t), !this.isEditable) return;
    const i = this.getPersistentActor() ?? this.actor, a = ((o = this.getSheetTokenDocument) == null ? void 0 : o.call(this)) ?? ((c = ne.getSnapshot(i, { token: ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? null })) == null ? void 0 : c.tokenDocument) ?? ((d = ne.getSnapshot(this.actor, { token: ((u = this.getSheetTokenDocument) == null ? void 0 : u.call(this)) ?? null })) == null ? void 0 : d.tokenDocument) ?? null;
    if (!a) {
      (m = ui.notifications) == null || m.warn("Statuses require a token for this actor on the current scene.");
      return;
    }
    return Wc({
      actor: i,
      token: a
    });
  }
  async _onCombatSpend(t, i) {
    var c, u, d, m, f, p, h, g, y, b;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const a = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.resource) ?? "").trim(), r = Math.max(0, Number(((m = i == null ? void 0 : i.dataset) == null ? void 0 : m.cost) ?? 0)), n = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.combatAction) ?? "").trim(), o = String(((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.combatLabel) ?? "").trim(), l = String(((h = i == null ? void 0 : i.dataset) == null ? void 0 : h.combatCostLabel) ?? "").trim();
    if (!(!a || !r || !n))
      try {
        const A = this.getPersistentActor() ?? this.actor, w = await ne.spendResource(A, {
          token: ((g = this.getSheetTokenDocument) == null ? void 0 : g.call(this)) ?? ne.getCurrentSceneTokenDocument(A) ?? ne.getCurrentSceneTokenDocument(this.actor),
          resource: a,
          cost: r,
          actionId: n,
          actionLabel: o,
          actionCostLabel: l
        });
        if (!(w != null && w.ok)) {
          (y = ui.notifications) == null || y.warn((w == null ? void 0 : w.reason) ?? "Unable to spend action.");
          return;
        }
        M(this, z, ai).call(this, { rerender: !1 }), M(this, z, ve).call(this, { force: !0 });
      } catch (A) {
        console.error("MWD | Failed to spend combat action", A), (b = ui.notifications) == null || b.error("Unable to spend action.");
      }
  }
  async _onCombatReduceBurn(t) {
    var i, a, r, n, o;
    if ((i = t == null ? void 0 : t.preventDefault) == null || i.call(t), (a = t == null ? void 0 : t.stopPropagation) == null || a.call(t), !!this.isEditable)
      try {
        const l = this.getPersistentActor() ?? this.actor, c = await ne.reduceBurn(l, {
          token: ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? ne.getCurrentSceneTokenDocument(l) ?? ne.getCurrentSceneTokenDocument(this.actor)
        });
        if (!(c != null && c.ok)) {
          (n = ui.notifications) == null || n.warn((c == null ? void 0 : c.reason) ?? "Unable to reduce Burn.");
          return;
        }
        M(this, z, ai).call(this, { rerender: !1 }), M(this, z, ve).call(this, { force: !0 });
      } catch (l) {
        console.error("MWD | Failed to reduce Burn", l), (o = ui.notifications) == null || o.error("Unable to reduce Burn.");
      }
  }
  async _onCombatOverloadCheck(t, i) {
    var n, o, l, c, u, d, m, f, p, h, g;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const a = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.roll) ?? ((m = (d = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : d.dataset) == null ? void 0 : m.roll);
    if (!a) return;
    let r;
    try {
      r = JSON.parse(a);
    } catch (y) {
      console.warn("MWD | Invalid overload payload", a, y);
      return;
    }
    try {
      const y = this.getPersistentActor() ?? this.actor, b = await ((h = (p = (f = game.mwd) == null ? void 0 : f.roll) == null ? void 0 : p.execute) == null ? void 0 : h.call(p, { actor: y, payload: r, event: t }));
      if (M(this, z, ai).call(this, { rerender: !1 }), !b) {
        M(this, z, ve).call(this, !1);
        return;
      }
      M(this, z, ve).call(this, { force: !0 });
    } catch (y) {
      console.error("MWD | Failed to launch overload check", y), (g = ui.notifications) == null || g.error("Unable to launch overload check.");
    }
  }
  async _onCombatAttack(t) {
    var c, u, d, m, f, p, h, g, y, b, A, w, E, I, D, L, V, Y;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const i = this.getPersistentActor() ?? this.actor, a = ((d = this.getSheetTokenDocument) == null ? void 0 : d.call(this)) ?? ne.getCurrentSceneTokenDocument(i) ?? ne.getCurrentSceneTokenDocument(this.actor), r = ne.getSnapshot(i, { token: a });
    if (!r.hasCombatant) {
      (m = ui.notifications) == null || m.warn("No combatant on the current scene.");
      return;
    }
    if (!r.isCurrentTurn) {
      (f = ui.notifications) == null || f.warn("Only available during your activation.");
      return;
    }
    if (r.overloaded) {
      (p = ui.notifications) == null || p.warn("Overloaded actors can only recover Burn.");
      return;
    }
    const n = 3 + Math.floor((Math.max(0, Number(((y = (g = (h = i.system) == null ? void 0 : h.attributes) == null ? void 0 : g.reflexes) == null ? void 0 : y.value) ?? 0)) + Math.max(0, Number(((w = (A = (b = i.system) == null ? void 0 : b.attributes) == null ? void 0 : A.willpower) == null ? void 0 : w.value) ?? 0))) / 2);
    if (Math.max(0, n - Math.max(0, Number(((E = r.state) == null ? void 0 : E.saSpentThisActivation) ?? 0))) < 2) {
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
      const K = await ((V = (L = (D = game.mwd) == null ? void 0 : D.roll) == null ? void 0 : L.execute) == null ? void 0 : V.call(L, { actor: i, payload: l, event: t }));
      if (M(this, z, ai).call(this, { rerender: !1 }), !K) {
        M(this, z, ve).call(this, !1);
        return;
      }
      const O = await ne.spendResource(i, {
        token: a,
        resource: "sa",
        cost: 2,
        actionId: "attack",
        actionLabel: "Attack",
        actionCostLabel: "2 SA"
      });
      O != null && O.ok || (Y = ui.notifications) == null || Y.warn((O == null ? void 0 : O.reason) ?? "Unable to spend attack action."), M(this, z, ve).call(this, { force: !0 });
    } catch (K) {
      console.error("MWD | Failed to launch attack", K), Fs(K, "Unable to launch attack.");
    }
  }
  async _onAddSkillSpecialization(t, i) {
    var d, m, f, p;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable || !this.editing) return;
    const a = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.skillKey) ?? "").trim();
    if (!a) return;
    const r = this.getPersistentActor() ?? this.actor, n = Ba(r.system ?? {}, a), o = Ks(r.system ?? {}, a), l = di(a).filter((h) => !o.includes(h.key));
    if (l.length === 0) return;
    let c = ((p = l[0]) == null ? void 0 : p.key) ?? "";
    if (l.length > 1) {
      const h = `<form class="mwd-quick-select"><div class="mwd-field"><label>Specialization</label><select name="specialization">${l.map((g) => `<option value="${g.key}">${g.label}</option>`).join("")}</select></div></form>`;
      c = await Dialog.prompt({
        title: "Add Skill Specialization",
        content: h,
        label: "Add",
        callback: (g) => {
          var y;
          return g.find('select[name="specialization"]').val() ?? ((y = l[0]) == null ? void 0 : y.key) ?? "";
        }
      });
    }
    const u = $s(
      n.concat([c])
    );
    await r.update({
      [`system.skills.${a}.specializations`]: u
    }), M(this, z, ve).call(this, { force: !0 });
  }
  async _onRemoveSkillSpecialization(t, i) {
    var l, c, u, d;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable || !this.editing) return;
    const a = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.skillKey) ?? "").trim(), r = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.specializationKey) ?? "").trim();
    if (!a || !r) return;
    const n = this.getPersistentActor() ?? this.actor, o = $s(
      Ba(n.system ?? {}, a).filter((m) => m !== r)
    );
    await n.update({
      [`system.skills.${a}.specializations`]: o
    }), M(this, z, ve).call(this, { force: !0 });
  }
  async _onCreateLifeModuleItem(t, i) {
    var d, m, f, p, h;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable) return;
    const a = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.moduleType) ?? "").trim();
    if (!a) return;
    const r = this.getPersistentActor() ?? this.actor, n = Or(a);
    if (!n.length) {
      (p = ui.notifications) == null || p.warn(`No ${Li(a)} life modules are configured in game settings.`);
      return;
    }
    const o = await Mn({
      title: `Choose ${Li(a)} Life Module`,
      label: "Life Module",
      confirmLabel: "Create",
      options: n.map((g) => ({
        value: g.id,
        label: g.label
      }))
    });
    if (!o) return;
    const l = Qt(o);
    if (!l) {
      (h = ui.notifications) == null || h.warn("That life module catalog entry no longer exists.");
      return;
    }
    const c = Ko(l, {}), u = {};
    for (const g of c.filter((y) => y.hasMultipleChoices)) {
      const y = await Mn({
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
    await r.createEmbeddedDocuments("Item", [{
      name: l.label,
      type: "lifeModule",
      system: ts({
        moduleType: a,
        catalogId: l.id,
        selectedGrants: u
      })
    }]), M(this, z, ve).call(this, { force: !0 });
  }
  async _onCreateOwnedItem(t, i) {
    var l, c, u;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable) return;
    const a = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.itemType) ?? "").trim();
    if (!a) return;
    const r = this.getPersistentActor() ?? this.actor, n = r.items.filter((d) => d.type === a).length, o = a === "personalWeapon" ? "Personal Weapon" : a === "armor" ? "Armor" : a.charAt(0).toUpperCase() + a.slice(1);
    await r.createEmbeddedDocuments("Item", [{
      name: `${o} ${n + 1}`,
      type: a
    }]), M(this, z, ve).call(this, { force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var r, n, o;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const a = M(this, z, Ei).call(this, i, t);
    (o = a == null ? void 0 : a.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var n, o;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const a = M(this, z, Ei).call(this, i, t);
    if (!a) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [a.id]), M(this, z, ve).call(this, { force: !0 });
  }
  async _onToggleInventoryAccordion(t, i) {
    var r, n, o, l, c, u, d, m, f, p;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const a = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.accordionId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((p = (f = (m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-accordion-id]")) == null ? void 0 : f.dataset) == null ? void 0 : p.accordionId) ?? ""
    ).trim();
    a && (F(this, ct).has(a) ? F(this, ct).delete(a) : F(this, ct).add(a), M(this, z, ve).call(this, !1));
  }
  async _onToggleOwnedItemEquipped(t, i) {
    var n, o, l, c;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const a = M(this, z, Ei).call(this, i, t);
    if (!a) return;
    const r = this.getPersistentActor() ?? this.actor;
    await ((c = r.setOwnedItemEquipped) == null ? void 0 : c.call(r, a.id, !((l = a.system) != null && l.equipped))), M(this, z, ve).call(this, { force: !0 });
  }
  async _onSetOwnedItemPrimary(t, i) {
    var n, o, l, c;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const a = M(this, z, Ei).call(this, i, t);
    if (!a) return;
    const r = this.getPersistentActor() ?? this.actor;
    await ((c = r.setOwnedItemPrimary) == null ? void 0 : c.call(r, a.id, !((l = a.system) != null && l.isPrimary))), M(this, z, ve).call(this, { force: !0 });
  }
  async _onAdjustGearQuantity(t, i) {
    var c, u, d, m, f, p, h, g, y, b, A;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const a = M(this, z, Ei).call(this, i, t);
    if (!a || a.canonicalType !== "gear") return;
    const r = Math.trunc(Number(
      ((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.delta) ?? ((p = (f = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, "[data-delta]")) == null ? void 0 : f.dataset) == null ? void 0 : p.delta) ?? ((b = (y = (g = (h = t == null ? void 0 : t.target) == null ? void 0 : h.closest) == null ? void 0 : g.call(h, "[data-delta]")) == null ? void 0 : y.dataset) == null ? void 0 : b.delta) ?? 0
    ) || 0);
    if (!r) return;
    const o = (this.getPersistentActor() ?? this.actor).items.get(a.id) ?? a, l = Math.max(0, Math.trunc(Number(((A = o.system) == null ? void 0 : A.quantity) ?? 1) || 0) + r);
    await o.update({ "system.quantity": l }), M(this, z, ve).call(this, { force: !0 });
  }
  async _onAttackWeapon(t, i) {
    var n, o, l, c, u, d, m, f, p, h;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const a = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.roll) ?? ((m = (d = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : d.dataset) == null ? void 0 : m.roll);
    if (!a) return;
    let r;
    try {
      r = JSON.parse(a);
    } catch (g) {
      console.warn("MWD | Invalid attack payload", a, g);
      return;
    }
    try {
      const g = this.getPersistentActor() ?? this.actor;
      if (!await ((h = (p = (f = game.mwd) == null ? void 0 : f.roll) == null ? void 0 : p.execute) == null ? void 0 : h.call(p, { actor: g, payload: r, event: t }))) return;
      M(this, z, ve).call(this, { force: !0 });
    } catch (g) {
      console.error("MWD | Failed to launch weapon attack", g), Fs(g, "Unable to attack with that weapon.");
    }
  }
};
Ke = new WeakMap(), Vt = new WeakMap(), ni = new WeakMap(), ct = new WeakMap(), z = new WeakSet(), ul = function() {
  M(this, z, ir).call(this), F(this, Ke) && (Pe(this, Vt, (t) => {
    var r;
    const i = this._getRootElement();
    if (!i) return;
    const a = t.target;
    if (a instanceof Node && !((r = a.closest) != null && r.call(a, ".mwd-combat-menu"))) {
      if (!i.contains(a)) {
        M(this, z, ai).call(this);
        return;
      }
      M(this, z, ai).call(this);
    }
  }), document.addEventListener("click", F(this, Vt)));
}, ir = function() {
  F(this, Vt) && (document.removeEventListener("click", F(this, Vt)), Pe(this, Vt, null));
}, Ds = function() {
  const t = this._getRootElement();
  return t ? t.querySelector(".mwd-scroll-area") ?? t.querySelector(".csb-tab-panels") : null;
}, dl = function() {
  const t = M(this, z, Ds).call(this);
  if (!(t instanceof HTMLElement)) {
    Pe(this, ni, null);
    return;
  }
  Pe(this, ni, {
    top: t.scrollTop,
    left: t.scrollLeft
  });
}, ml = function() {
  const t = F(this, ni);
  if (!t) return;
  const i = M(this, z, Ds).call(this);
  i instanceof HTMLElement && (i.scrollTop = t.top, i.scrollLeft = t.left, requestAnimationFrame(() => {
    const a = M(this, z, Ds).call(this);
    a instanceof HTMLElement && (a.scrollTop = t.top, a.scrollLeft = t.left);
  }), Pe(this, ni, null));
}, ve = function(t = !1) {
  M(this, z, dl).call(this), this.render(t);
}, ai = function({ rerender: t = !0 } = {}) {
  F(this, Ke) && (Pe(this, Ke, null), t && M(this, z, ve).call(this, !1));
}, Ei = function(t, i) {
  var r, n, o, l, c, u, d, m;
  const a = String(
    ((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.itemId) ?? ((l = (o = (n = t == null ? void 0 : t.closest) == null ? void 0 : n.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((m = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
  ).trim();
  return a ? this.actor.items.get(a) ?? null : null;
}, Vi = function(t, i) {
  return `${String(t ?? "").trim()}:${String(i ?? "").trim()}`;
}, N(me, "PARTS", {
  sheet: {
    get template() {
      return `${G}/v2/actor/character-sheet.hbs`;
    }
  }
}), N(me, "DEFAULT_OPTIONS", foundry.utils.mergeObject(yi(me, me, "DEFAULT_OPTIONS"), {
  classes: ["character-sheet", T, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
  window: { minWidth: 450, minHeight: 740, resizable: !0 },
  position: { width: 980, height: 900 },
  actions: {
    ...yi(me, me, "DEFAULT_OPTIONS").actions,
    edgeSet: me.prototype._onEdgeSet,
    toggleCombatMenu: me.prototype._onToggleCombatMenu,
    toggleStatuses: me.prototype._onToggleStatuses,
    combatSpend: me.prototype._onCombatSpend,
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
    attackWeapon: me.prototype._onAttackWeapon
  }
}));
let tr = me;
class pl extends xi {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["npc-sheet", T, "actor-sheet-v2"]
    });
  }
}
N(pl, "PARTS", {
  sheet: {
    get template() {
      return `${G}/actor/npc.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class fl extends xi {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["vehicle-sheet", T, "actor-sheet-v2"],
      position: { width: 860, height: 820 }
    });
  }
}
N(fl, "PARTS", {
  sheet: {
    get template() {
      return `${G}/actor/vehicle.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class hl extends xi {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["battlemech-sheet", T, "actor-sheet-v2"],
      position: { width: 900, height: 820 }
    });
  }
}
N(hl, "PARTS", {
  sheet: {
    get template() {
      return `${G}/actor/battlemech.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
function _m() {
  console.log(`${ce}Registering Actor sheets (V2)`);
  const { Actors: s } = foundry.documents.collections;
  s.registerSheet(T, tr, {
    types: ["character"],
    makeDefault: !0,
    label: "Character (V2)"
  }), s.registerSheet(T, pl, {
    types: ["npc"],
    makeDefault: !0,
    label: "NPC (V2)"
  }), s.registerSheet(T, fl, {
    types: ["vehicle"],
    makeDefault: !0,
    label: "Vehicle (V2)"
  }), s.registerSheet(T, hl, {
    types: ["battlemech"],
    makeDefault: !0,
    label: "BattleMech (V2)"
  });
}
const { HandlebarsApplicationMixin: Lm } = foundry.applications.api, { HTMLField: En, StringField: $m } = foundry.data.fields, Cn = /* @__PURE__ */ new Set(["system.notes", "system.description"]);
function wa(s, e) {
  const t = new s({ required: !1, blank: !0, initial: "" });
  return t.name = e, t;
}
function xm(s = {}) {
  return {
    ...s,
    sourceReference: s.sourceReference ?? wa($m, "system.sourceReference"),
    notes: s.notes ?? wa(En, "system.notes"),
    description: s.description ?? wa(En, "system.description")
  };
}
var oi, Kt, li, dt, Ki, sr;
const Re = class Re extends Lm(foundry.applications.sheets.ItemSheetV2) {
  constructor() {
    super(...arguments);
    be(this, dt);
    be(this, oi, /* @__PURE__ */ new Map());
    be(this, Kt, /* @__PURE__ */ new Map());
    be(this, li, null);
    /** @override */
    N(this, "tabGroups", {
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
        editImage: Re._onEditImage,
        tab: Re.prototype._onClickTab,
        accordion: Re.prototype._onClickAccordion,
        checkbarElement: Re._onClickCheckbar,
        modifierAdd: Re._onModifierAdd,
        modifierDelete: Re._onModifierDelete,
        modifierValueChange: Re._onModifierValueChange,
        modifierConditionChange: Re._onModifierConditionChange,
        modifierSelectionChange: Re._onModifierSelectionChange,
        effectCreate: Re._onEffectCreate,
        effectEdit: Re._onEffectEdit,
        effectDelete: Re._onEffectDelete,
        effectToggleDisabled: Re._onEffectToggleDisabled
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
    const a = ((c = (l = (o = (n = game.system) == null ? void 0 : n.mwd) == null ? void 0 : o.styles) == null ? void 0 : l.selectCssClass) == null ? void 0 : c.call(l)) ?? "mwd-theme-default", r = ["mwd-theme-default", "mwd-theme-sra"];
    return t.classes = t.classes.filter((u) => !r.includes(u)), t.classes.push(a), t;
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
      const a = this._getCanonicalItemType();
      return {
        [S.itemType.mechWeapon]: `${G}/v2/item/mech-weapon-root.hbs`,
        [S.itemType.armor]: `${G}/v2/item/armor.hbs`
      }[a] ?? `${G}/v2/item/${a}.hbs`;
    }
    return ((i = super._getPartTemplate) == null ? void 0 : i.call(this, t)) ?? "";
  }
  /**
   * Override title to show localized item type and name.
   * @override
   */
  get title() {
    const t = this._getCanonicalItemType();
    return `${ye.itemType.singular[t] ?? t}: ${this.item.name}`;
  }
  /**
   * Prepare context data for rendering.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The context object
   * @override
   */
  async _prepareContext(t) {
    var D, L, V, Y, K, O, R, U, B;
    const i = await super._prepareContext(t), a = ((L = (D = game.system.mwd.modifiers) == null ? void 0 : D.getEnums) == null ? void 0 : L.call(D)) ?? {}, r = foundry.utils.deepClone((i == null ? void 0 : i.options) ?? {}), n = xm((i == null ? void 0 : i.fields) ?? ((Y = (V = this.item.system) == null ? void 0 : V.schema) == null ? void 0 : Y.fields) ?? {}), o = ((O = (K = this.item.actor) == null ? void 0 : K.getAttributes) == null ? void 0 : O.call(K, this.item)) ?? [], l = this._getCanonicalItemType(), c = !this.item.actor, u = !!this.item.actor, d = ye.itemType.singular[l] ?? l, m = this._getEffectEntries(), f = m.filter((te) => te.syncedCount > 0).length, p = this.constructor.LAYOUT_ID, h = this.item.actor ? (te) => o.includes(te) : (te) => !0, g = l === S.itemType.skill, b = ["mwd", "item-sheet", this.isEditable ? "editable" : "locked"], A = b.join(" ");
    r.classes = b, r.cssClass = A;
    const w = async (te, { secrets: he = this.item.isOwner } = {}) => foundry.applications.ux.TextEditor.implementation.enrichHTML(te ?? "", {
      async: !0,
      secrets: he,
      relativeTo: this.item
    }), E = foundry.utils.expandObject({
      "system.notes": await w(this.item.system.notes ?? ""),
      "system.description": await w(this.item.system.description ?? "")
    }), I = {
      ...i,
      // Item data
      item: this.item,
      data: this.item,
      system: this.item.system,
      // Form field metadata and enriched content for App V2 rich text helpers
      fields: n,
      enriched: E,
      enrichedDescription: ((R = E == null ? void 0 : E.system) == null ? void 0 : R.description) ?? "",
      // Options for templates
      options: {
        ...r,
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
        ...se.getEnums(h, g),
        ...a
      },
      MWD: ye,
      itemSheet: {
        canonicalType: l,
        typeLabel: d,
        isArmorSheet: l === S.itemType.armor,
        isStandalone: c,
        canUseActorControls: u,
        supportsEffectSync: !!((B = (U = this.item).supportsEquippedEffectSync) != null && B.call(U)),
        effectEntries: m,
        effectCount: m.length,
        syncedEffectCount: f,
        summaryChips: this._getSummaryChips(),
        stateChips: this._getStateChips(m)
      },
      // CSS class for form element
      cssClass: A,
      // Tab configuration
      tabs: this._getTabs()
    };
    return p && (I.layout = await zs.get(p)), I;
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
    var a, r, n;
    const i = [];
    return i.push({ kind: "ownership", label: this.item.actor ? "Owned Item" : "World Item" }), Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "equipped") && i.push({
      kind: "equipment",
      label: (a = this.item.system) != null && a.equipped ? "Equipped" : "Unequipped",
      tone: (r = this.item.system) != null && r.equipped ? "active" : "muted"
    }), Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "isPrimary") && ((n = this.item.system) != null && n.isPrimary) && i.push({ kind: "role", label: "Primary", tone: "accent" }), t.length && i.push({
      kind: "effects",
      label: `${t.length} Effect${t.length === 1 ? "" : "s"}`,
      tone: t.some((o) => o.syncedCount > 0) ? "active" : "muted"
    }), i;
  }
  _getEffectEntries() {
    var a, r, n, o, l, c;
    const t = /* @__PURE__ */ new Map(), i = ((r = (a = this.item).getSyncedActorEffects) == null ? void 0 : r.call(a)) ?? [];
    for (const u of i) {
      const d = (l = (o = (n = u.flags) == null ? void 0 : n[T]) == null ? void 0 : o.equippedItemSync) == null ? void 0 : l.sourceEffectId;
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
    const a = ((l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, ".csb-tab-link[data-tab]")) ?? ((u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, ".csb-tab-link[data-tab]"));
    if (!a) return;
    const r = a.closest(".csb-tabs");
    if (!r) return;
    const n = r.dataset.group || "default", o = a.dataset.tab;
    o && (F(this, oi).set(n, o), M(this, dt, Ki).call(this, this._getRootElement(), n, o));
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const a = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!a) return;
    const r = a.dataset.section, n = a.closest(".csb-accordion");
    if (!n || !r) return;
    const o = n.dataset.group || "default", c = (F(this, Kt).has(o) ? F(this, Kt).get(o) : n.dataset.default || null) === r ? null : r;
    F(this, Kt).set(o, c), M(this, dt, sr).call(this, n, c);
  }
  _onRender(t, i) {
    var r, n, o, l;
    (r = super._onRender) == null || r.call(this, t, i), (n = this.window) != null && n.title && (this.window.title.textContent = this.title);
    const a = this._getRootElement();
    if (a) {
      for (const c of a.querySelectorAll(".sheet-tabs")) {
        const u = c.dataset.group || "default", d = Array.from(c.querySelectorAll("[data-tab]"));
        if (!d.length) continue;
        for (const h of d)
          h.addEventListener("click", (g) => {
            g.preventDefault(), g.stopPropagation();
            const y = h.dataset.tab;
            y && (F(this, oi).set(u, y), M(this, dt, Ki).call(this, a, u, y));
          });
        const m = F(this, oi).get(u), f = c.dataset.default || ((o = d[0]) == null ? void 0 : o.dataset.tab), p = m || f;
        p && M(this, dt, Ki).call(this, a, u, p);
      }
      for (const c of a.querySelectorAll(".csb-tabs")) {
        const u = c.dataset.group || "default", d = Array.from(c.querySelectorAll(".csb-tab-link[data-tab]"));
        if (!d.length) continue;
        const m = F(this, oi).get(u), f = c.dataset.default || ((l = d[0]) == null ? void 0 : l.dataset.tab), p = m || f;
        p && M(this, dt, Ki).call(this, a, u, p);
      }
      for (const c of a.querySelectorAll(".csb-accordion")) {
        const u = c.dataset.group || "default", d = F(this, Kt).has(u) ? F(this, Kt).get(u) : c.dataset.default || null;
        M(this, dt, sr).call(this, c, d);
      }
      for (const c of a.querySelectorAll("prose-mirror[name]")) {
        const u = c.getAttribute("name") ?? "";
        Cn.has(u) && c.addEventListener("change", (d) => {
          d.preventDefault(), d.stopPropagation(), this._updateRichTextField(c);
        });
      }
      this._restoreScrollPositions();
    }
  }
  async _updateRichTextField(t) {
    var n;
    const i = String(((n = t == null ? void 0 : t.getAttribute) == null ? void 0 : n.call(t, "name")) ?? (t == null ? void 0 : t.name) ?? "");
    if (!this.isEditable || !Cn.has(i)) return;
    const a = String(t.value ?? ""), r = String(foundry.utils.getProperty(this.item, i) ?? "");
    if (a !== r)
      try {
        await this.item.update({ [i]: a });
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
      Pe(this, li, null);
      return;
    }
    const i = [];
    for (const a of this._getScrollRestoreSelectors())
      t.querySelectorAll(a).forEach((r, n) => {
        r instanceof HTMLElement && i.push({
          selector: a,
          index: n,
          top: r.scrollTop,
          left: r.scrollLeft
        });
      });
    Pe(this, li, i.length ? i : null);
  }
  _restoreScrollPositions() {
    const t = F(this, li);
    if (!(t != null && t.length)) return;
    const i = () => {
      const a = this._getRootElement();
      if (a)
        for (const r of t) {
          const n = a.querySelectorAll(r.selector).item(r.index);
          n instanceof HTMLElement && (n.scrollTop = r.top, n.scrollLeft = r.left);
        }
    };
    i(), requestAnimationFrame(i), Pe(this, li, null);
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
    const a = this.item;
    if (!a.parent) return;
    const r = i.closest(".checkbar-root");
    if (!r) return;
    const n = r.dataset.monitorCode, o = Number.parseInt(i.dataset.index), l = i.dataset.checked === "true";
    await a.parent.switchMonitorCheck(n, o, l);
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
    const a = i.closest(".define-modifier");
    if (!a) return;
    const r = a.dataset.modifierId;
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
    const a = i.closest(".define-modifier");
    if (!a) return;
    const r = a.dataset.modifierId;
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
    const a = i.closest(".define-modifier");
    if (!a) return;
    const r = a.dataset.modifierId;
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
    const a = i.closest(".define-modifier");
    if (!a) return;
    const r = a.dataset.modifierId, n = i.dataset.modifierSelect;
    r && n && await this.item.changeModifierSelection(r, n, i.value);
  }
  static async _onEffectCreate(t, i) {
    var r, n, o;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const [a] = await this.item.createEmbeddedDocuments("ActiveEffect", [{
      name: `${this.item.name} Effect`,
      img: this.item.img || "icons/svg/aura.svg",
      disabled: !1,
      transfer: !1,
      changes: []
    }]);
    (o = a == null ? void 0 : a.sheet) == null || o.render(!0);
  }
  static async _onEffectEdit(t, i) {
    var n, o, l, c, u, d, m;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const a = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.effectId) ?? ((d = (u = (c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : d.effectId);
    if (!a) return;
    const r = this.item.effects.get(a);
    (m = r == null ? void 0 : r.sheet) == null || m.render(!0);
  }
  static async _onEffectDelete(t, i) {
    var r, n, o, l, c, u;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const a = ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.effectId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-effect-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.effectId);
    a && await this.item.deleteEmbeddedDocuments("ActiveEffect", [a]);
  }
  static async _onEffectToggleDisabled(t, i) {
    var n, o, l, c, u, d;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const a = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.effectId) ?? ((d = (u = (c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : d.effectId);
    if (!a) return;
    const r = this.item.effects.get(a);
    r && await r.update({ disabled: !r.disabled });
  }
};
oi = new WeakMap(), Kt = new WeakMap(), li = new WeakMap(), dt = new WeakSet(), Ki = function(t, i, a) {
  t && (t.querySelectorAll(`.csb-tabs[data-group="${i}"] .csb-tab-link[data-tab]`).forEach((r) => {
    r.classList.toggle("is-active", r.dataset.tab === a);
  }), t.querySelectorAll(`.csb-tabs[data-group="${i}"] .csb-tab-panel[data-tab]`).forEach((r) => {
    r.classList.toggle("is-active", r.dataset.tab === a);
  }), t.querySelectorAll(".sheet-tabs [data-tab]").forEach((r) => {
    var o;
    (((o = r.closest(".sheet-tabs")) == null ? void 0 : o.dataset.group) || "default") === i && r.classList.toggle("active", r.dataset.tab === a);
  }), t.querySelectorAll(`.tab[data-group="${i}"]`).forEach((r) => {
    r.classList.toggle("active", r.dataset.tab === a);
  }));
}, sr = function(t, i) {
  t.dataset.activeSection = i ?? "", t.querySelectorAll(".csb-accordion__section").forEach((a) => {
    const r = a.dataset.section === i;
    a.classList.toggle("is-active", r);
  }), t.querySelectorAll(".csb-accordion__trigger").forEach((a) => {
    const r = a.dataset.section === i;
    a.classList.toggle("is-active", r), a.setAttribute("aria-expanded", r ? "true" : "false");
  }), t.querySelectorAll(".csb-accordion__panel").forEach((a) => {
    const r = a.closest(".csb-accordion__section"), n = (r == null ? void 0 : r.dataset.section) === i;
    a.classList.toggle("is-active", n);
  });
}, N(Re, "LAYOUT_ID", null), /** @override */
N(Re, "PARTS", {
  sheet: {
    template: "",
    // Set dynamically in _getPartTemplate
    scrollable: [".sheet-body"]
  }
}), N(Re, "TABS", {
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
let ft = Re;
class ar extends ft {
}
N(ar, "LAYOUT_ID", "contact"), N(ar, "PARTS", {
  sheet: {
    template: `${G}/v2/item/contact.hbs`,
    scrollable: [".sheet-body"]
  }
});
const Pn = Object.freeze([
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
class rr extends ft {
  async _prepareContext(e) {
    var a;
    const t = await super._prepareContext(e), i = this.item.system ?? {};
    return t.system = {
      ...i,
      quantity: Math.max(0, Math.trunc(Number(i.quantity ?? 1) || 0)),
      rating: Math.max(0, Math.trunc(Number(i.rating ?? 0) || 0)),
      category: String(i.category ?? "").trim(),
      tags: Array.isArray(i.tags) ? i.tags.map((r) => String(r ?? "").trim()).filter(Boolean) : []
    }, t.gearEditor = {
      categories: Pn.map((r) => ({ ...r }))
    }, t.tagsText = t.system.tags.join(", "), t.itemSheet = {
      ...t.itemSheet ?? {},
      summaryChips: [
        { label: "Qty", value: String(t.system.quantity) },
        { label: "Rating", value: String(t.system.rating) },
        {
          label: "Category",
          value: ((a = Pn.find((r) => r.value === t.system.category)) == null ? void 0 : a.label) ?? "Uncategorized"
        }
      ]
    }, t;
  }
}
N(rr, "LAYOUT_ID", "gear"), N(rr, "PARTS", {
  sheet: {
    template: `${G}/v2/item/gear.hbs`,
    scrollable: [".sheet-body"]
  }
});
class nr extends ft {
  async _prepareContext(e) {
    var n, o;
    const t = await super._prepareContext(e), i = tt(this.item.system ?? {}), a = Do(), r = Array.isArray((n = t.ENUMS) == null ? void 0 : n.skills) ? t.ENUMS.skills.map((l) => ({
      value: String((l == null ? void 0 : l.value) ?? "").trim(),
      label: String((l == null ? void 0 : l.label) ?? (l == null ? void 0 : l.value) ?? "").trim()
    })).filter((l) => l.value) : [];
    return t.system = {
      ...i,
      effects: (Array.isArray(i.effects) ? i.effects : []).map((l) => ({
        ...l,
        showSkillPicker: Ro(l) || Array.isArray(l.skillKeys) && l.skillKeys.length > 0,
        isEdgeEvent: l.type === "edgeEvent"
      }))
    }, t.traitEditor = {
      ...a,
      skills: r
    }, t.itemSheet = {
      ...t.itemSheet ?? {},
      sheetClass: "mwd-item-sheet--quality",
      summaryChips: [
        { label: "Category", value: vs(i.category) },
        { label: "Tier", value: Ms(i.tier) },
        { label: "Activation", value: String(i.activation ?? "passive").trim() || "Passive" },
        { label: "Effects", value: String(((o = i.effects) == null ? void 0 : o.length) ?? 0) }
      ]
    }, t.tagsText = Array.isArray(i.tags) ? i.tags.join(", ") : "", t;
  }
  _onRender(e, t) {
    var r, n;
    (r = super._onRender) == null || r.call(this, e, t);
    const i = (n = this._getRootElement) == null ? void 0 : n.call(this);
    if (!i) return;
    const a = (o) => {
      var l;
      return (l = this._captureScrollPositions) == null || l.call(this), o();
    };
    i.querySelectorAll(".mwd-quality-prereq-add").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), l.stopPropagation(), a(() => {
          var c, u;
          return (u = (c = this.item).createQualityPrerequisite) == null ? void 0 : u.call(c);
        });
      });
    }), i.querySelectorAll(".mwd-quality-prereq-delete").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), l.stopPropagation(), a(() => {
          var c, u;
          return (u = (c = this.item).deleteQualityPrerequisite) == null ? void 0 : u.call(c, o.dataset.prereqId);
        });
      });
    }), i.querySelectorAll(".mwd-quality-prereq-field").forEach((o) => {
      o.addEventListener("change", (l) => {
        l.preventDefault(), l.stopPropagation(), a(() => {
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
        l.preventDefault(), l.stopPropagation(), a(() => {
          var c, u;
          return (u = (c = this.item).createQualityEffect) == null ? void 0 : u.call(c);
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-delete").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), l.stopPropagation(), a(() => {
          var c, u;
          return (u = (c = this.item).deleteQualityEffect) == null ? void 0 : u.call(c, o.dataset.effectId);
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-field").forEach((o) => {
      o.addEventListener("change", (l) => {
        l.preventDefault(), l.stopPropagation(), a(() => {
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
        a(() => {
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
        l.preventDefault(), l.stopPropagation(), a(() => {
          var c, u;
          return (u = (c = this.item).createQualityEffectCondition) == null ? void 0 : u.call(c, o.dataset.effectId);
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-condition-delete").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), l.stopPropagation(), a(() => {
          var c, u;
          return (u = (c = this.item).deleteQualityEffectCondition) == null ? void 0 : u.call(c, o.dataset.effectId, o.dataset.conditionId);
        });
      });
    }), i.querySelectorAll(".mwd-quality-effect-condition-field").forEach((o) => {
      o.addEventListener("change", (l) => {
        l.preventDefault(), l.stopPropagation(), a(() => {
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
N(nr, "LAYOUT_ID", "quality"), N(nr, "PARTS", {
  sheet: {
    template: `${G}/v2/item/quality.hbs`,
    scrollable: [".sheet-body"]
  }
});
class or extends ft {
}
N(or, "LAYOUT_ID", "asset-module"), N(or, "PARTS", {
  sheet: {
    template: `${G}/v2/item/assetModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class lr extends ft {
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
    const e = ts(this.item.system ?? {}), t = Qt(e.catalogId), a = Zs(t, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }).map((n) => n.choice).filter(Boolean).map((n) => es(n, { includeBonusText: !0 })).join(", "), r = this.item.actor ? Jt(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return [
      { label: "Slot", value: Li(e.moduleType) },
      { label: "Module", value: (t == null ? void 0 : t.label) ?? "Unlinked" },
      { label: "Bonuses", value: a || "Pending choice" },
      r ? { label: "Status", value: r.isActive ? "Active" : "Inactive" } : null
    ].filter(Boolean);
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), i = ts(this.item.system ?? {}), a = i.moduleType, r = Qt(i.catalogId), n = a ? Or(a) : [], o = Ko(r, i.selectedGrants, { legacySelectedSkill: i.selectedSkill }), l = this.item.actor ? Jt(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return t.lifeModuleEditor = {
      moduleType: a,
      moduleTypeLabel: Li(a),
      moduleTypes: Uo().map((c) => ({
        ...c,
        selected: c.value === a
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
        return ((u = Qt(c)) == null ? void 0 : u.label) ?? c;
      }),
      excludesAnyLabels: ((r == null ? void 0 : r.excludesAny) ?? []).map((c) => {
        var u;
        return ((u = Qt(c)) == null ? void 0 : u.label) ?? c;
      }),
      actorState: l,
      warningLabels: [...(l == null ? void 0 : l.warningLabels) ?? []],
      isOwned: !!this.item.actor,
      statusLabel: l ? l.isActive ? "Active" : "Inactive" : r ? "Configured" : "Unlinked",
      statusReason: (l == null ? void 0 : l.inactiveReason) ?? ""
    }, t;
  }
}
N(lr, "LAYOUT_ID", "life-module"), N(lr, "PARTS", {
  sheet: {
    template: `${G}/v2/item/lifeModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class cr extends ft {
}
N(cr, "LAYOUT_ID", "skill"), N(cr, "PARTS", {
  sheet: {
    template: `${G}/v2/item/skill.hbs`,
    scrollable: [".sheet-body"]
  }
});
const Bm = Object.freeze([
  "firearms",
  "projectileWeapons",
  "heavyWeapons",
  "meleeCombat"
]), Fm = Object.freeze([
  { value: "energy", label: "Energy" },
  { value: "kinetic", label: "Kinetic" },
  { value: "ballistic", label: "Ballistic" },
  { value: "explosive", label: "Explosive" },
  { value: "plasma", label: "Plasma" },
  { value: "electrical", label: "Electrical" },
  { value: "melee", label: "Melee" },
  { value: "none", label: "None" }
]);
function Nn(s, e, t) {
  const i = String(e ?? "").trim();
  return !i || s.some((a) => a.value === i) ? s : s.concat({ value: i, label: t(i) });
}
class ta extends ft {
  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        weaponSkillChange: ta._onWeaponSkillChange
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
      defenses: Se.getDefenses()
    };
    const a = Array.isArray((l = t.ENUMS) == null ? void 0 : l.skills) ? t.ENUMS.skills : [], r = (c = this.item.system) == null ? void 0 : c.skill, n = (u = this.item.system) == null ? void 0 : u.damageType, o = i === "personalWeapon" ? Nn(
      a.filter((p) => Bm.includes(p.value)),
      r,
      (p) => {
        var h;
        return ((h = a.find((g) => g.value === p)) == null ? void 0 : h.label) ?? p;
      }
    ) : a;
    return t.weaponProfile = ((m = (d = this.item).getCombatProfile) == null ? void 0 : m.call(d)) ?? null, t.weaponEditor = {
      skills: o,
      categories: [
        { value: "melee", label: "Melee" },
        { value: "ranged", label: "Ranged" },
        { value: "thrown", label: "Thrown" },
        { value: "other", label: "Other" }
      ],
      damageTypes: Nn(
        i === "personalWeapon" ? [...Os] : [...Fm],
        n,
        (p) => i === "personalWeapon" ? vt(p) : p
      ),
      ranges: st.RANGE_ORDER.map((p) => ({
        value: p,
        label: p.charAt(0).toUpperCase() + p.slice(1)
      })),
      weaponCapabilityOptions: Wl,
      payloadCapabilityOptions: Hl,
      ammoDamageTypes: [{ value: "", label: "Use Weapon Default" }, ...Os],
      payloadTemplateShapes: Vn,
      payloadTemplatePlacements: Kn,
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
    var r, n;
    const i = t.value, a = (n = (r = game.system.mwd.skills) == null ? void 0 : r.get) == null ? void 0 : n.call(r, i);
    a != null && a.defense && await this.item.update({ "system.defense": a.defense }, { render: !1 });
  }
}
const Ni = class Ni extends ta {
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
        attackWeapon: Ni._onAttackWeapon,
        reloadWeaponPayload: Ni._onReloadWeaponPayload
      }
    }, { inplace: !1 });
  }
  async _prepareContext(e) {
    var n, o, l;
    const t = await super._prepareContext(e), i = this.item.actor ?? null, a = t.weaponProfile ?? null, r = !!(i && typeof i.isCharacterLike == "function" && i.isCharacterLike() && ((o = (n = this.item).isPersonalWeapon) != null && o.call(n)));
    return t.itemSheet = {
      ...t.itemSheet ?? {},
      canAttack: r,
      attackDisabled: !r || !((l = this.item.system) != null && l.equipped)
    }, t.itemSheet.summaryChips = this._getSummaryChips(a), t.itemSheet.reloadState = this._getReloadDisplayState(a), t;
  }
  _getReloadDisplayState(e = ((t) => ((i) => (i = (t = this.item).getCombatProfile) == null ? void 0 : i.call(t))())() ?? null) {
    var d, m, f, p, h;
    const a = ((m = (d = this.item).canReloadActivePayload) == null ? void 0 : m.call(d, { detailed: !0 })) ?? { canReload: !1, reason: "" }, r = !!((f = e == null ? void 0 : e.sourceState) != null && f.isTracked), n = String((e == null ? void 0 : e.payloadLabel) ?? (a == null ? void 0 : a.payloadLabel) ?? "").trim() || "Unloaded", o = Number(((p = e == null ? void 0 : e.sourceState) == null ? void 0 : p.current) ?? (a == null ? void 0 : a.current) ?? 0) || 0, l = Number(((h = e == null ? void 0 : e.sourceState) == null ? void 0 : h.max) ?? (a == null ? void 0 : a.max) ?? 0) || 0, c = r ? `${n} ${o}/${l}` : n, u = a.canReload ? "Click to reload" : String(a.reason ?? "").trim() || "Payload read-only";
    return {
      canReload: !!a.canReload,
      disabled: !a.canReload,
      value: c,
      hint: u,
      title: a.canReload ? `Reload ${n}` : u
    };
  }
  _getSummaryChips(e = ((t) => ((i) => (i = (t = this.item).getCombatProfile) == null ? void 0 : i.call(t))())() ?? null) {
    var r, n, o;
    if (!e) return [];
    const a = [
      { label: "Category", value: String(e.category ?? "").trim() || "Ranged" },
      { label: "Skill", value: ((r = e.skillDef) == null ? void 0 : r.label) ?? e.skill ?? "Firearms" },
      { label: "DV", value: String(Number(e.damage ?? 0)) },
      { label: "AP", value: String(Number(e.ap ?? 0)) },
      { label: "Type", value: vt(e.damageType) || "Penetrating" },
      { label: "Range", value: String(((n = e.range) == null ? void 0 : n.max) ?? "near").trim() || "Near" }
    ];
    return String(e.category ?? "").trim().toLowerCase() !== "melee" && a.push((o = e == null ? void 0 : e.sourceState) != null && o.isTracked ? { label: "Payload", value: `${(e == null ? void 0 : e.payloadLabel) || "Unloaded"} (${Number(e.sourceState.current ?? 0)}/${Number(e.sourceState.max ?? 0)})` } : { label: "Payload", value: (e == null ? void 0 : e.payloadLabel) || "Unloaded" }), a;
  }
  static async _onAttackWeapon(e) {
    var i, a, r, n, o;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (a = e == null ? void 0 : e.stopPropagation) == null || a.call(e);
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
        console.error("MWD | Failed to launch weapon sheet attack", l), Fs(l, "Unable to attack with that weapon.");
      }
  }
  static async _onReloadWeaponPayload(e) {
    var i, a, r, n, o, l, c, u;
    if ((i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (a = e == null ? void 0 : e.stopPropagation) == null || a.call(e), !((n = (r = this.item) == null ? void 0 : r.isPersonalWeapon) != null && n.call(r))) return;
    (o = this._captureScrollPositions) == null || o.call(this);
    const t = await ((c = (l = this.item).reloadActivePayload) == null ? void 0 : c.call(l));
    t != null && t.ok || (u = ui.notifications) == null || u.warn((t == null ? void 0 : t.reason) ?? "Unable to reload that weapon.");
  }
  _onRender(e, t) {
    var r, n;
    (r = super._onRender) == null || r.call(this, e, t);
    const i = (n = this._getRootElement) == null ? void 0 : n.call(this);
    if (!i) return;
    const a = (o) => {
      var l;
      return (l = this._captureScrollPositions) == null || l.call(this), o();
    };
    i.querySelectorAll(".mwd-payload-add").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), a(() => {
          var c, u;
          return (u = (c = this.item).createPayload) == null ? void 0 : u.call(c);
        });
      });
    }), i.querySelectorAll(".mwd-payload-delete").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), a(() => {
          var c, u;
          return (u = (c = this.item).deletePayload) == null ? void 0 : u.call(c, o.dataset.payloadId);
        });
      });
    }), i.querySelectorAll(".mwd-payload-field").forEach((o) => {
      o.addEventListener("change", (l) => {
        l.preventDefault(), a(() => {
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
        l.preventDefault(), a(() => {
          var c, u;
          return (u = (c = this.item).createConsumptionSource) == null ? void 0 : u.call(c);
        });
      });
    }), i.querySelectorAll(".mwd-source-delete").forEach((o) => {
      o.addEventListener("click", (l) => {
        l.preventDefault(), a(() => {
          var c, u;
          return (u = (c = this.item).deleteConsumptionSource) == null ? void 0 : u.call(c, o.dataset.sourceId);
        });
      });
    }), i.querySelectorAll(".mwd-source-field").forEach((o) => {
      o.addEventListener("change", (l) => {
        l.preventDefault(), a(() => {
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
            a(() => {
              var p, h;
              return (h = (p = this.item).updatePayloadField) == null ? void 0 : h.call(p, m, f, d.join(", "));
            });
            return;
          }
          a(() => this.item.update({ [f]: d }));
        }
      });
    });
  }
};
N(Ni, "LAYOUT_ID", "personal-weapon"), N(Ni, "PARTS", {
  sheet: {
    template: `${G}/v2/item/personal-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
let ur = Ni;
class dr extends ta {
}
N(dr, "LAYOUT_ID", "mech-weapon"), N(dr, "PARTS", {
  sheet: {
    template: `${G}/v2/item/mech-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
const zm = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
};
function Rn(s) {
  const e = Number(s ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function Wm({ defenseBonus: s = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(s ?? 0) || 0;
  i !== 0 && t.push(`Defense ${Rn(i)}`);
  const a = mt(e);
  for (const [r, n] of Object.entries(zm)) {
    const o = Number((a == null ? void 0 : a[r]) ?? 0) || 0;
    o !== 0 && t.push(`${n} ${Rn(o)}`);
  }
  return t.join(" | ");
}
class mr extends ft {
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
    var l, c, u, d, m, f, p, h, g, y, b, A, w, E, I, D;
    const t = await super._prepareContext(e), i = this.item, a = i.actor ?? null, r = ((l = a == null ? void 0 : a.getPersonalCombatLoadout) == null ? void 0 : l.call(a)) ?? null, n = ((c = r == null ? void 0 : r.activeArmor) == null ? void 0 : c.id) ?? null, o = ((u = r == null ? void 0 : r.activeArmor) == null ? void 0 : u.id) === i.id ? r.activeArmor : (d = i.getArmorProfile) == null ? void 0 : d.call(i, { actor: a });
    return t.armorState = o, t.isActiveArmor = n === i.id, t.effectiveDurabilityCurrent = Number(
      ((m = o == null ? void 0 : o.durability) == null ? void 0 : m.current) ?? ((p = (f = i.system) == null ? void 0 : f.durability) == null ? void 0 : p.current) ?? ((g = (h = i.system) == null ? void 0 : h.durability) == null ? void 0 : g.max) ?? ((y = i.system) == null ? void 0 : y.rating) ?? 0
    ), t.effectiveArmorRating = Number(
      (o == null ? void 0 : o.currentArmorRating) ?? (o == null ? void 0 : o.ratingCurrent) ?? Math.min(
        Number(((b = i.system) == null ? void 0 : b.rating) ?? 0),
        Number(((w = (A = i.system) == null ? void 0 : A.durability) == null ? void 0 : w.current) ?? ((I = (E = i.system) == null ? void 0 : E.durability) == null ? void 0 : I.max) ?? ((D = i.system) == null ? void 0 : D.rating) ?? 0)
      )
    ), t.effectiveArmorResist = Number(
      (o == null ? void 0 : o.baseMitigation) ?? (o == null ? void 0 : o.baseResistance) ?? 0
    ), t.armorModifierSummary = this._getArmorModifierSummary(o), t.itemSheet = { ...t.itemSheet ?? {} }, t.itemSheet.summaryChips = this._getSummaryChips(o), t.armorEditor = {
      standardTraits: [...Zl]
    }, t;
  }
  _getSummaryChips(e = null) {
    var r, n, o, l, c, u, d, m, f, p, h, g, y, b, A;
    const t = this.item.system ?? {}, i = [
      {
        label: "Rating",
        value: String(Number(
          (e == null ? void 0 : e.ratingCurrent) ?? (e == null ? void 0 : e.currentArmorRating) ?? Math.min(
            Number(t.rating ?? 0),
            Number(((r = t.durability) == null ? void 0 : r.current) ?? ((n = t.durability) == null ? void 0 : n.max) ?? t.rating ?? 0)
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
    ], a = Number(((f = (m = e == null ? void 0 : e.traitState) == null ? void 0 : m.reinforced) == null ? void 0 : f.max) ?? ((h = (p = t == null ? void 0 : t.traitState) == null ? void 0 : p.reinforced) == null ? void 0 : h.max) ?? 0);
    return a > 0 && i.push({
      label: "Reinforced",
      value: `${Number(((y = (g = e == null ? void 0 : e.traitState) == null ? void 0 : g.reinforced) == null ? void 0 : y.current) ?? ((A = (b = t == null ? void 0 : t.traitState) == null ? void 0 : b.reinforced) == null ? void 0 : A.current) ?? 0)}/${a}`
    }), i;
  }
  _getArmorModifierSummary(e = null) {
    const t = this.item.system ?? {};
    return Wm({
      defenseBonus: (e == null ? void 0 : e.defenseBonus) ?? t.defenseBonus ?? 0,
      mitigationByType: (e == null ? void 0 : e.mitigationByType) ?? (e == null ? void 0 : e.typedMitigation) ?? t.mitigationByType ?? {}
    });
  }
  _onRender(e, t) {
    var a, r;
    (a = super._onRender) == null || a.call(this, e, t);
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
N(mr, "LAYOUT_ID", "armor"), N(mr, "PARTS", {
  sheet: {
    template: `${G}/v2/item/armor-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
function Hm() {
  console.log(`${ce}Registering Item sheets (V2)`);
  const { Items: s } = foundry.documents.collections;
  s.registerSheet(T, ar, { types: ["contact"], makeDefault: !0, label: "Contact (V2)" }), s.registerSheet(T, rr, { types: ["gear"], makeDefault: !0, label: "Gear (V2)" }), s.registerSheet(T, nr, { types: ["quality"], makeDefault: !0, label: "Quality (V2)" }), s.registerSheet(T, or, { types: ["assetModule"], makeDefault: !0, label: "Asset Module (V2)" }), s.registerSheet(T, lr, { types: ["lifeModule"], makeDefault: !0, label: "Life Module (V2)" }), s.registerSheet(T, cr, { types: ["skill"], makeDefault: !0, label: "Skill (V2)" }), s.registerSheet(T, ur, { types: ["personalWeapon", "weapon"], makeDefault: !0, label: "Personal Weapon (V2)" }), s.registerSheet(T, dr, { types: ["mechWeapon"], makeDefault: !0, label: "Mech Weapon (V2)" }), s.registerSheet(T, mr, { types: ["armor"], makeDefault: !0, label: "Armor (V2)" });
}
const Dn = [
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
function Um(s) {
  const e = String(s).replaceAll("\\", "/"), t = `systems/${T}/templates/`, i = e.indexOf(t);
  return `mwd.${(i >= 0 ? e.slice(i + t.length) : e).replace(/\.hbs$/i, "").split("/").filter(Boolean).map((o) => o.replace(/^_+/, "")).join(".")}`;
}
function jm() {
  var s, e;
  return ((e = (s = foundry == null ? void 0 : foundry.applications) == null ? void 0 : s.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
async function Gm() {
  var e, t;
  const s = jm();
  try {
    const i = {};
    for (const r of Dn)
      i[Um(r)] = r, i[r] = r;
    await foundry.applications.handlebars.loadTemplates(i);
    const a = "mwd.v2.ui.layout-root";
    if (!((e = Handlebars.partials) != null && e[a])) {
      const r = Object.keys(Handlebars.partials ?? {});
      throw console.error("Missing required partial:", a), console.error("Closest matches:", r.filter((n) => n.includes("layout-root"))), new Error(`Template preload failed: ${a} not registered`);
    }
    if (s !== Handlebars) {
      for (const [r, n] of Object.entries(s.partials ?? {}))
        if (!((t = Handlebars.partials) != null && t[r]))
          try {
            Handlebars.registerPartial(r, n);
          } catch {
          }
    }
    console.log(`${ce}preloadTemplatesV2 OK`, { loaded: Dn.length });
  } catch (i) {
    throw console.error(`${ce}preloadTemplatesV2 FAILED`, i), i;
  }
}
function In(s) {
  const e = Math.max(0, Number(s) || 0);
  return -Math.floor(e / 3);
}
function qm(s) {
  const e = Math.max(0, Number(s) || 0);
  return e === 0 ? 0 : Math.ceil(e / 4);
}
function Vm(s = {}) {
  const e = s.physical ?? {}, t = s.fatigue ?? {}, i = s.armor ?? {}, a = Number(e.value) || 0, r = Number(t.value) || 0, n = Math.max(Number(i.value) || 0, Number(i.max) || 0);
  return {
    physical: { penalty: In(a) },
    fatigue: { penalty: In(r) },
    armor: { resistance: qm(n) }
  };
}
const Ta = {
  penaltyPer3Damage: (s) => {
    const e = Math.max(0, Number(s) || 0);
    return -Math.floor(e / 3);
  },
  resistancePerQuarter: (s) => {
    const e = Math.max(0, Number(s) || 0);
    return e === 0 ? 0 : Math.ceil(e / 4);
  }
  // heatPenaltyCurve: ...
};
function Km(s, e, t, i) {
  const a = s.system ?? {}, r = `monitors.${e}`, n = Number(foundry.utils.getProperty(a, `${r}.max`)) || 0, o = Number(foundry.utils.getProperty(a, `${r}.value`)) || 0;
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
function Ym(s = {}) {
  return Object.entries(mt(s)).filter(([, e]) => Number(e) > 0).map(([e, t]) => `${e} +${t}`).join(", ");
}
class Qm extends Actor {
  /* -------------------------------------------- */
  /* Base & Derived Data                           */
  /* -------------------------------------------- */
  /** @override */
  prepareBaseData() {
    var e, t;
    if (super.prepareBaseData(), this.isCharacterLike()) {
      const i = this.system ?? {};
      if (_c(i), (e = i.skills) != null && e.skills && typeof i.skills.skills == "object") {
        for (const [a, r] of Object.entries(i.skills.skills))
          (t = i.skills)[a] ?? (t[a] = r);
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
      for (const a of Object.values(e)) {
        if (!a || typeof a != "object") continue;
        a.rating = Math.max(0, Number(a.rating ?? 0));
        const r = Object.prototype.hasOwnProperty.call(a, "value"), n = Number(a.value);
        (!r || !Number.isFinite(n)) && (a.value = a.rating), "max" in a && delete a.max;
      }
  }
  /**
   * Derived-data prep for Edge pools:
   * - Computes cap/effectiveMax/effectiveValue
   * - Stores in a non-persisted cache on the actor instance
   * - No writes to system data (prevents UI snap-back / loops)
   */
  _prepareEdgePoolsDerived() {
    var i, a;
    this._mwdDerived ?? (this._mwdDerived = {}), this._mwdDerived.edgePools = null;
    const e = this.getEdgeCap(), t = this.type === "character" ? Jt(this).bonusByEdgePool ?? {} : {};
    if (this.type === "character" && this.hasEdgePools()) {
      const r = ((a = (i = this.system) == null ? void 0 : i.counters) == null ? void 0 : a.edgePools) ?? {}, n = {};
      for (const [o, l] of Object.entries(r)) {
        const c = Math.max(0, Number((l == null ? void 0 : l.rating) ?? 0)), u = Math.max(0, Number((l == null ? void 0 : l.value) ?? 0)), d = Math.max(0, Number((t == null ? void 0 : t[o]) ?? 0)), m = c + d, f = Math.min(m, e), p = Math.min(u, f);
        n[o] = {
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
    var t, i, a;
    return Math.max(0, Number(((a = (i = (t = this.system) == null ? void 0 : t.attributes) == null ? void 0 : i[e]) == null ? void 0 : a.value) ?? 0));
  }
  getSkillRating(e) {
    var t, i, a;
    return Math.max(0, Number(((a = (i = (t = this.system) == null ? void 0 : t.skills) == null ? void 0 : i[e]) == null ? void 0 : a.rating) ?? 0));
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
      const a = (i = this._mwdDerived) == null ? void 0 : i.personalCombat;
      if (a) return a;
    }
    const t = this._computePersonalCombatLoadout();
    return this._mwdDerived ?? (this._mwdDerived = {}), this._mwdDerived.personalCombat = t, t;
  }
  _computePersonalCombatLoadout() {
    const e = [], t = this.items.filter((f) => {
      var p;
      return ((p = f.isPersonalWeapon) == null ? void 0 : p.call(f)) ?? f.type === S.itemType.personalWeapon;
    }).map((f) => {
      var p;
      return ((p = f.getCombatProfile) == null ? void 0 : p.call(f)) ?? null;
    }).filter(Boolean), i = this.items.filter((f) => {
      var p;
      return ((p = f.isArmor) == null ? void 0 : p.call(f)) ?? f.type === S.itemType.armor;
    }).map((f) => {
      var p;
      return ((p = f.getArmorProfile) == null ? void 0 : p.call(f, { actor: this })) ?? null;
    }).filter(Boolean), a = t.filter((f) => f.equipped), r = i.filter((f) => f.equipped), n = a.filter((f) => f.isPrimary), o = r.filter((f) => f.isPrimary);
    let l = null, c = null, u = !1;
    n.length === 1 ? (c = n[0], l = c) : n.length > 1 ? (e.push("Multiple equipped primary weapons found; attack selection requires a chooser."), u = !0) : a.length === 1 ? l = a[0] : a.length > 1 ? u = !0 : l = {
      ...st.DEFAULT_UNARMED,
      uuid: null,
      img: null,
      item: null,
      equipped: !0,
      isPrimary: !1,
      defaultRangeBand: "close",
      isSynthetic: !0
    };
    let d = null, m = null;
    return o.length === 1 ? (d = o[0], m = this._buildActiveArmorState(d)) : o.length > 1 ? (e.push("Multiple equipped primary armor items found; using the first equipped armor."), m = r[0] ? this._buildActiveArmorState(r[0]) : null) : r.length === 1 ? m = this._buildActiveArmorState(r[0]) : r.length > 1 && (e.push("Multiple equipped armor items found without a single primary; using the first equipped armor."), m = this._buildActiveArmorState(r[0])), {
      weapons: t,
      equippedWeapons: a,
      primaryWeapon: c,
      defaultWeapon: l,
      weaponChoiceRequired: u,
      armor: i,
      equippedArmor: r,
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
    ), a = Math.max(0, Number((e == null ? void 0 : e.rating) ?? 0)), r = Math.min(a, i), n = mt(e == null ? void 0 : e.mitigationByType), o = Ar(r);
    return {
      ...e,
      armorId: e.id,
      remainingDurability: i,
      currentArmorRating: r,
      baseMitigation: o,
      baseResistance: o,
      mitigationByType: n,
      typedMitigation: n,
      ratingCurrent: r,
      isDestroyed: i <= 0,
      durability: {
        current: i,
        max: t
      }
    };
  }
  async setOwnedItemEquipped(e, t) {
    var a, r, n;
    const i = this.getOwnedItem(e);
    return !i || !((a = i.isPersonalWeapon) != null && a.call(i) || (r = i.isArmor) != null && r.call(i)) ? null : this.updateEmbeddedDocuments("Item", [{
      _id: i.id,
      "system.equipped": !!t,
      "system.isPrimary": t ? !!((n = i.system) != null && n.isPrimary) : !1
    }]);
  }
  async setOwnedItemPrimary(e, t) {
    var n, o, l, c;
    const i = this.getOwnedItem(e);
    if (!i || !((n = i.isPersonalWeapon) != null && n.call(i) || (o = i.isArmor) != null && o.call(i))) return null;
    const a = [], r = !!t;
    if (r)
      for (const u of this.items.filter((d) => d.type === i.type && d.id !== i.id))
        (l = u.system) != null && l.isPrimary && a.push({ _id: u.id, "system.isPrimary": !1 });
    return a.push({
      _id: i.id,
      "system.isPrimary": r,
      "system.equipped": r ? !0 : !!((c = i.system) != null && c.equipped)
    }), this.updateEmbeddedDocuments("Item", a);
  }
  /* -------------------------------------------- */
  /* Edge API (cap + pools w/ rating + current)    */
  /* -------------------------------------------- */
  getEdgeCap() {
    var e, t, i;
    return Math.max(0, Number(((i = (t = (e = this.system) == null ? void 0 : e.attributes) == null ? void 0 : t.edge) == null ? void 0 : i.value) ?? 0));
  }
  getEdgePoolRaw(e) {
    var t, i, a;
    return ((a = (i = (t = this.system) == null ? void 0 : t.counters) == null ? void 0 : i.edgePools) == null ? void 0 : a[e]) ?? null;
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
    const a = this.getEdgePoolRaw(e), r = Math.max(0, Number((a == null ? void 0 : a.rating) ?? 0)), n = Math.max(0, Number((a == null ? void 0 : a.value) ?? 0)), o = Math.max(0, Number(((p = Jt(this).bonusByEdgePool) == null ? void 0 : p[e]) ?? 0)), l = r + o, c = Math.min(l, t), u = Math.min(n, c);
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
    const i = Math.max(0, Number(((n = this.getEdgePool(e)) == null ? void 0 : n.effectiveMax) ?? 0)), a = Number(t ?? 0), r = Math.max(0, Math.min(a, i));
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
    const i = Math.max(0, Number(((r = this.getEdgePoolRaw(e)) == null ? void 0 : r.value) ?? 0)), a = Number(t ?? 0);
    return this.setEdgePoolValue(e, i + a);
  }
  /**
   * Set the RATING (advancement ceiling) for a pool.
   * Stores true rating (not cap-clamped), then clamps current value to new effective max.
   */
  async setEdgePoolRating(e, t) {
    var c, u;
    if (!this.hasEdgePools()) return;
    const i = this.getEdgeCap(), a = Math.max(0, Number(t ?? 0)), r = Math.max(0, Number(((c = Jt(this).bonusByEdgePool) == null ? void 0 : c[e]) ?? 0)), n = Math.min(a + r, i), o = Math.max(0, Number(((u = this.getEdgePoolRaw(e)) == null ? void 0 : u.value) ?? 0)), l = Math.min(o, n);
    return this.update({
      [`system.counters.edgePools.${e}.rating`]: a,
      [`system.counters.edgePools.${e}.value`]: l
    });
  }
  /**
   * Sheet-facing summary for rendering.
   * If `groups` is provided, returns grouped pool arrays.
   */
  getEdgePoolSummary({ groups: e } = {}) {
    var i, a, r, n;
    const t = this.getEdgeCap();
    if (this.hasEdgePools()) {
      const o = ((a = (i = this._mwdDerived) == null ? void 0 : i.edgePools) == null ? void 0 : a.pools) ?? {};
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
    const a = Math.max(0, Number(t ?? 1));
    if (!a) return;
    let r = a;
    if (!i.skipTraitHooks) {
      const o = i.runtime ?? {}, l = {
        poolKey: e,
        amount: a,
        source: String(i.source ?? "").trim(),
        eventKey: String(i.eventKey ?? "").trim()
      }, c = it({
        actor: this,
        phase: "onEdgeSpend",
        facts: za({ actor: this, packet: l, phase: "onEdgeSpend", runtime: o }),
        packet: l,
        options: { runtime: o, consumeUsage: !0 }
      });
      await Xt({ actor: this, mutations: c.mutations, runtime: o }), r = Math.max(0, Number(c.packet.amount ?? a) || 0);
    }
    const n = r;
    if (n)
      return this.adjustEdgePoolValue(e, -n);
  }
  async gainEdge(e, t = 1, i = {}) {
    if (!this.hasEdgePools()) return;
    const a = Number(t ?? 0);
    if (!a) return;
    let r = a;
    if (!i.skipTraitHooks) {
      const n = i.runtime ?? {}, o = {
        poolKey: e,
        amount: a,
        source: String(i.source ?? "").trim(),
        eventKey: String(i.eventKey ?? "").trim()
      }, l = it({
        actor: this,
        phase: "onEdgeGain",
        facts: za({ actor: this, packet: o, phase: "onEdgeGain", runtime: n }),
        packet: o,
        options: { runtime: n, consumeUsage: !0 }
      });
      await Xt({ actor: this, mutations: l.mutations, runtime: n }), r = Number(l.packet.amount ?? a) || 0;
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
  _onCreateDescendantDocuments(e, t, i, a, r, n) {
    super._onCreateDescendantDocuments(e, t, i, a, r, n), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  _onUpdateDescendantDocuments(e, t, i, a, r, n) {
    super._onUpdateDescendantDocuments(e, t, i, a, r, n), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  _onDeleteDescendantDocuments(e, t, i, a, r, n) {
    super._onDeleteDescendantDocuments(e, t, i, a, r, n), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  async _syncOverloadedEffect(e) {
    await this.toggleStatusEffect("overloaded", { active: e, overlay: !1 });
  }
  async _syncOverloadedFieldFromEffects() {
    var i, a, r, n;
    const e = ((a = (i = this.statuses) == null ? void 0 : i.has) == null ? void 0 : a.call(i, "overloaded")) ?? !1, t = !!((n = (r = this.system) == null ? void 0 : r.burn) != null && n.overloaded);
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
      const y = this.getPersonalCombatLoadout({ refresh: !0 }), b = ((d = y == null ? void 0 : y.activeArmor) == null ? void 0 : d.armorId) ?? ((m = y == null ? void 0 : y.activeArmor) == null ? void 0 : m.id) ?? null, A = b ? this.items.get(b) : null;
      if (!(A != null && A.id)) return null;
      const w = Math.max(0, Number(((f = A.system) == null ? void 0 : f.rating) ?? 0) || 0), E = Math.max(0, Number(((h = (p = A.system) == null ? void 0 : p.durability) == null ? void 0 : h.max) ?? 0) || 0), I = E > 0 ? E : w, D = Math.min(Math.max(0, Number(t) || 0), I);
      return this.updateEmbeddedDocuments("Item", [{
        _id: A.id,
        "system.durability.max": I,
        "system.durability.current": D
      }]);
    }
    const a = `system.monitors.${e}`, r = Number(foundry.utils.getProperty(this, `${a}.max`)) || 0, n = Math.max(0, r), o = Math.min(Math.max(0, Number(t) || 0), n), l = { [`${a}.value`]: o }, c = this.type, u = (g = ra == null ? void 0 : ra[c]) == null ? void 0 : g[e];
    if (u != null && u.derived)
      for (const [y, b] of Object.entries(u.derived)) {
        const A = Ta == null ? void 0 : Ta[b.fn];
        if (typeof A != "function") continue;
        const w = Km(this, e, b.source, o);
        l[`${a}.derived.${y}`] = A(w);
      }
    return this.update(l);
  }
  _prepareMonitors() {
    var n, o, l, c;
    const e = this.system.monitors ?? {}, t = Vm(e);
    (n = this.system).derived ?? (n.derived = {}), this.system.derived.monitors = t;
    const i = Number(((o = t == null ? void 0 : t.physical) == null ? void 0 : o.penalty) ?? 0), a = Number(((l = t == null ? void 0 : t.fatigue) == null ? void 0 : l.penalty) ?? 0), r = i + a;
    (c = this.system.derived).condition ?? (c.condition = {}), this.system.derived.condition.physicalPenalty = i, this.system.derived.condition.fatiguePenalty = a, this.system.derived.condition.totalPenalty = r, this.system.derived.conditionPenalty = r;
  }
  _preparePersonalCombatDerived() {
    var n, o, l, c, u, d;
    if (!this.isCharacterLike()) return;
    const e = this.getPersonalCombatLoadout({ refresh: !0 }), t = (o = (n = this.system) == null ? void 0 : n.monitors) == null ? void 0 : o.armor;
    if (!t) return;
    const i = e.activeArmor, a = Math.max(0, Number(((l = i == null ? void 0 : i.durability) == null ? void 0 : l.max) ?? 0)), r = Math.max(0, Number((i == null ? void 0 : i.remainingDurability) ?? ((c = i == null ? void 0 : i.durability) == null ? void 0 : c.current) ?? 0));
    t.max = a, t.value = Math.min(a, r), t.resistance = {
      default: Number((i == null ? void 0 : i.baseMitigation) ?? (i == null ? void 0 : i.baseResistance) ?? 0),
      byType: {}
    }, t.resistanceBonusByType = i != null && i.isDestroyed ? {} : (i == null ? void 0 : i.mitigationByType) ?? (i == null ? void 0 : i.typedMitigation) ?? {}, t.derived ?? (t.derived = {}), t.derived.resistance = Number((i == null ? void 0 : i.baseMitigation) ?? (i == null ? void 0 : i.baseResistance) ?? 0), t.effect = i != null && i.isDestroyed ? "Destroyed" : i ? Ym(i.mitigationByType ?? i.typedMitigation) : "", (u = this.system).derived ?? (u.derived = {}), this.system.derived.personalCombat = {
      defaultWeaponId: ((d = e.defaultWeapon) == null ? void 0 : d.id) ?? null,
      activeArmorId: (i == null ? void 0 : i.id) ?? null,
      warnings: [...e.warnings ?? []]
    };
  }
}
async function Jm({ actor: s, payload: e } = {}) {
  var g, y, b, A, w, E;
  if (!s) throw new Error("resolveSkill requires actor");
  const t = String((e == null ? void 0 : e.key) ?? "").trim(), i = at(t);
  if (!i) throw new Error(`Unknown skill: ${t}`);
  const a = s.system ?? {}, r = String((e == null ? void 0 : e.attrKey) ?? i.attribute ?? "").trim();
  if (!r) throw new Error(`Skill ${t} missing attribute key`);
  const n = Number(((y = (g = a == null ? void 0 : a.attributes) == null ? void 0 : g[r]) == null ? void 0 : y.value) ?? 0), o = Number(((A = (b = a == null ? void 0 : a.skills) == null ? void 0 : b[t]) == null ? void 0 : A.rating) ?? 0), l = Number(((E = (w = a == null ? void 0 : a.skills) == null ? void 0 : w[t]) == null ? void 0 : E.bonus) ?? 0), c = new Set(Ks(a, t)), u = vr(t, e == null ? void 0 : e.specializationKey), d = u && c.has(u.key) ? u : null, m = d ? wr : 0, f = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : i.domains ?? [], p = Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : Number.isFinite(Number(e == null ? void 0 : e.target)) ? Number(e.target) : 5, h = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1;
  return {
    intent: "skill",
    rollType: "simple",
    title: `${i.label} (${r})`,
    subtitle: s.name ?? "Actor",
    domains: f,
    // Per-die threshold (cs>=X). Kept separate from dnHits.
    diceTarget: p,
    // DN = hits needed for success
    difficulty: { dn: h },
    edge: {
      earn: { enabled: !0, rate: 4, maxPerRoll: 1 }
    },
    pool: { attribute: n, skill: o, bonus: l, specialization: m },
    breakdown: [
      { id: "attribute", label: "Attribute", value: n },
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
      attrKey: r,
      label: `${r}+${i.label}`,
      specializationKey: (d == null ? void 0 : d.key) ?? "",
      specializationLabel: (d == null ? void 0 : d.label) ?? ""
    }
  };
}
const Xm = /* @__PURE__ */ new Set([
  "grit",
  "chaos",
  "insight",
  "rumor",
  "legend",
  "credibility"
]), Zm = {
  grit: "physical",
  chaos: "physical",
  insight: "mental",
  rumor: "mental",
  legend: "social",
  credibility: "social"
};
async function ep({ actor: s, payload: e } = {}) {
  if (!s) throw new Error("resolveEdge requires actor");
  const t = String((e == null ? void 0 : e.pool) ?? "").trim();
  if (!Xm.has(t)) throw new Error(`Invalid edge pool: ${t}`);
  const i = s.getEdgePool(t), a = Math.max(0, Number((i == null ? void 0 : i.effectiveValue) ?? 0));
  return {
    intent: "edge",
    title: `Edge — ${t}`,
    subtitle: s.name ?? "Actor",
    domains: [Zm[t] ?? "unknown"],
    // drop "edge" tag unless you truly want it
    // ✅ Make it directly rollable by the core roll pipeline
    target: 5,
    poolTotal: a,
    breakdown: [
      { id: "current", label: "Current", value: Number((i == null ? void 0 : i.value) ?? 0) },
      { id: "rating", label: "Rating", value: Number((i == null ? void 0 : i.rating) ?? 0) },
      { id: "cap", label: "Edge Cap", value: Number((i == null ? void 0 : i.cap) ?? 0) },
      { id: "usable", label: "Usable", value: a }
    ],
    data: { poolKey: t }
  };
}
async function tp({ actor: s, payload: e, event: t } = {}) {
  return {
    title: "Attribute",
    intent: "attribute",
    domainTags: ["general"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function ip({ actor: s, payload: e } = {}) {
  if (!s) throw new Error("resolveCommon requires actor");
  const t = String((e == null ? void 0 : e.id) ?? "").trim();
  if (!t) throw new Error("Common rolls require payload.id");
  const i = Er(t);
  if (!i) throw new Error(`Unknown common check: ${t}`);
  const a = Array.isArray(i.formula) ? i.formula : [];
  if (a.length !== 2)
    throw new Error(`Common check ${t} must define exactly two attributes.`);
  const r = a.map((c) => {
    var d, m, f;
    const u = qc(c);
    if (!u) throw new Error(`Common check ${t} uses unsupported attribute code: ${c}`);
    return {
      code: String(c).trim().toUpperCase(),
      key: u,
      label: Vc(c),
      value: Number(((f = (m = (d = s.system) == null ? void 0 : d.attributes) == null ? void 0 : m[u]) == null ? void 0 : f.value) ?? 0)
    };
  }), n = r.reduce((c, u) => c + Number(u.value ?? 0), 0), o = Array.isArray(i.tags) ? [...i.tags] : [], l = Array.isArray(i.domains) ? [...i.domains] : [];
  return {
    intent: "common",
    rollType: "simple",
    title: String(i.label ?? t).trim() || t,
    subtitle: s.name ?? "Actor",
    domains: l,
    tags: o,
    formula: Kc(a),
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
      formulaCodes: a,
      tags: o,
      attributes: r
    }
  };
}
const ia = 90;
function On(s) {
  const e = canvas.app.view.getBoundingClientRect(), t = new PIXI.Point(
    Number(s.clientX ?? 0) - e.left,
    Number(s.clientY ?? 0) - e.top
  );
  return canvas.stage.worldTransform.applyInverse(t);
}
function sa() {
  var s, e, t;
  return Number(((e = (s = canvas.scene) == null ? void 0 : s.grid) == null ? void 0 : e.distance) ?? ((t = canvas.dimensions) == null ? void 0 : t.distance) ?? 1) || 1;
}
function is() {
  var s, e;
  return Number(((s = canvas.grid) == null ? void 0 : s.size) ?? ((e = canvas.dimensions) == null ? void 0 : e.size) ?? 100) || 100;
}
function _n(s = 0) {
  return (Number(s ?? 0) || 0) * (is() / sa());
}
function gl(s = {}) {
  return Math.max(0, Number((s == null ? void 0 : s.size) ?? 0) || 0) * sa();
}
function sp(s) {
  let e = Number(s ?? 0) || 0;
  for (; e <= -180; ) e += 360;
  for (; e > 180; ) e -= 360;
  return e;
}
function pr(s) {
  return (Number(s ?? 0) || 0) * (180 / Math.PI);
}
function ap(s) {
  return (Number(s ?? 0) || 0) * (Math.PI / 180);
}
function Ln(s, e) {
  const t = Number((e == null ? void 0 : e.x) ?? 0) - Number((s == null ? void 0 : s.x) ?? 0), i = Number((e == null ? void 0 : e.y) ?? 0) - Number((s == null ? void 0 : s.y) ?? 0);
  return t === 0 && i === 0 ? 0 : pr(Math.atan2(i, t));
}
function yl(s) {
  var t, i, a, r;
  return ((i = (t = canvas.tokens) == null ? void 0 : t.controlled) == null ? void 0 : i.find((n) => {
    var o;
    return ((o = n.actor) == null ? void 0 : o.id) === (s == null ? void 0 : s.id);
  })) ?? null ?? ((r = (a = s == null ? void 0 : s.getActiveTokens) == null ? void 0 : a.call(s, !0, !0)) == null ? void 0 : r[0]) ?? null;
}
function bl(s) {
  var n, o, l, c, u;
  const e = (s == null ? void 0 : s.center) ?? ((n = s == null ? void 0 : s.object) == null ? void 0 : n.center);
  if (e) return { x: Number(e.x ?? 0), y: Number(e.y ?? 0) };
  const t = Number((s == null ? void 0 : s.x) ?? ((o = s == null ? void 0 : s.document) == null ? void 0 : o.x) ?? 0), i = Number((s == null ? void 0 : s.y) ?? ((l = s == null ? void 0 : s.document) == null ? void 0 : l.y) ?? 0), a = Number((s == null ? void 0 : s.w) ?? (s == null ? void 0 : s.width) ?? ((c = s == null ? void 0 : s.document) == null ? void 0 : c.width) ?? 1) * is(), r = Number((s == null ? void 0 : s.h) ?? (s == null ? void 0 : s.height) ?? ((u = s == null ? void 0 : s.document) == null ? void 0 : u.height) ?? 1) * is();
  return { x: t + a / 2, y: i + r / 2 };
}
function rp(s) {
  var i, a, r, n;
  const e = Number((s == null ? void 0 : s.w) ?? ((i = s == null ? void 0 : s.object) == null ? void 0 : i.w) ?? 0) || Number(((a = s == null ? void 0 : s.document) == null ? void 0 : a.width) ?? 1) * is(), t = Number((s == null ? void 0 : s.h) ?? ((r = s == null ? void 0 : s.object) == null ? void 0 : r.h) ?? 0) || Number(((n = s == null ? void 0 : s.document) == null ? void 0 : n.height) ?? 1) * is();
  return Math.max(e, t) / 2;
}
function np(s = {}, e = { x: 0, y: 0 }, t = 0) {
  var a, r;
  const i = {
    user: ((a = game.user) == null ? void 0 : a.id) ?? null,
    x: Number((e == null ? void 0 : e.x) ?? 0) || 0,
    y: Number((e == null ? void 0 : e.y) ?? 0) || 0,
    direction: Number(t ?? 0) || 0,
    distance: gl(s),
    fillColor: ((r = game.user) == null ? void 0 : r.color) ?? "#ff6400"
  };
  switch (s == null ? void 0 : s.shape) {
    case "blast":
      return { ...i, t: "circle" };
    case "cone":
      return { ...i, t: "cone", angle: ia };
    case "line":
      return { ...i, t: "ray", width: sa() };
    default:
      return i;
  }
}
function op({ anchor: s, radiusPx: e, tokenCenter: t, tokenRadius: i }) {
  const a = t.x - s.x, r = t.y - s.y;
  return Math.hypot(a, r) <= e + i;
}
function lp({ anchor: s, distancePx: e, widthPx: t, direction: i, tokenCenter: a, tokenRadius: r }) {
  const n = a.x - s.x, o = a.y - s.y, l = ap(i), c = Math.cos(l), u = Math.sin(l), d = n * c + o * u;
  if (d < -r || d > e + r) return !1;
  const m = s.x + Math.max(0, Math.min(e, d)) * c, f = s.y + Math.max(0, Math.min(e, d)) * u;
  return Math.hypot(a.x - m, a.y - f) <= r + t / 2;
}
function cp({ anchor: s, distancePx: e, direction: t, angle: i, tokenCenter: a, tokenRadius: r }) {
  const n = a.x - s.x, o = a.y - s.y, l = Math.hypot(n, o);
  if (l > e + r) return !1;
  if (l === 0) return !0;
  const c = pr(Math.atan2(o, n)), u = Math.abs(sp(c - t)), d = Number(i ?? ia) / 2, m = pr(Math.asin(Math.min(1, r / Math.max(l, 1))));
  return u <= d + m;
}
function up({ template: s, placement: e, token: t }) {
  const i = bl(t), a = rp(t), r = _n(e.distance);
  switch (s == null ? void 0 : s.shape) {
    case "blast":
      return op({
        anchor: e.anchor,
        radiusPx: r,
        tokenCenter: i,
        tokenRadius: a
      });
    case "line":
      return lp({
        anchor: e.anchor,
        distancePx: r,
        widthPx: _n(sa()),
        direction: e.direction,
        tokenCenter: i,
        tokenRadius: a
      });
    case "cone":
      return cp({
        anchor: e.anchor,
        distancePx: r,
        direction: e.direction,
        angle: e.angle ?? ia,
        tokenCenter: i,
        tokenRadius: a
      });
    default:
      return !1;
  }
}
function dp(s = {}) {
  var e, t, i, a, r, n, o;
  s.object && ((i = (t = (e = canvas.templates) == null ? void 0 : e.preview) == null ? void 0 : t.removeChild) == null || i.call(t, s.object), (r = (a = s.object).destroy) == null || r.call(a, { children: !0 })), (o = (n = canvas.templates) == null ? void 0 : n.clearPreviewContainer) == null || o.call(n);
}
async function mp(s = {}, e = {}, t = { x: 0, y: 0 }, i = 0) {
  var r, n, o, l;
  const a = np(e, t, i);
  if (!s.object) {
    const c = CONFIG.MeasuredTemplate.documentClass, u = CONFIG.MeasuredTemplate.objectClass, d = new c(a, { parent: canvas.scene }), m = new u(d);
    s.object = m, await m.draw(), canvas.templates.preview.addChild(m);
    return;
  }
  s.object.document.updateSource(a), (n = (r = s.object.renderFlags) == null ? void 0 : r.set) == null || n.call(r, { refreshState: !0, refreshShape: !0, refreshGrid: !0 }), (l = (o = s.object).refresh) == null || l.call(o);
}
function pp({ template: s, anchor: e, direction: t }) {
  return {
    shape: s.shape,
    placement: s.placement,
    size: Number(s.size ?? 0) || 0,
    distance: gl(s),
    angle: s.shape === "cone" ? ia : void 0,
    anchor: {
      x: Number((e == null ? void 0 : e.x) ?? 0) || 0,
      y: Number((e == null ? void 0 : e.y) ?? 0) || 0
    },
    direction: Number(t ?? 0) || 0
  };
}
function Sl(s) {
  var a, r, n, o;
  const e = (s == null ? void 0 : s.actor) ?? null;
  if (!e) return null;
  const t = ((a = e == null ? void 0 : e.getPersonalCombatLoadout) == null ? void 0 : a.call(e)) ?? null, i = (t == null ? void 0 : t.activeArmor) ?? null;
  return {
    tokenId: (s == null ? void 0 : s.id) ?? null,
    tokenUuid: ((r = s == null ? void 0 : s.document) == null ? void 0 : r.uuid) ?? null,
    actorId: e.id,
    actorUuid: e.uuid,
    name: e.name ?? (s == null ? void 0 : s.name) ?? "Target",
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
function fp({ template: s, placement: e, attacker: t } = {}) {
  var r;
  const i = yl(t), a = (i == null ? void 0 : i.id) ?? null;
  return (((r = canvas.tokens) == null ? void 0 : r.placeables) ?? []).filter((n) => n == null ? void 0 : n.actor).filter((n) => n.id !== a || (s == null ? void 0 : s.placement) === "origin").filter((n) => up({ template: s, placement: e, token: n })).map(Sl).filter(Boolean);
}
async function hp({ actor: s, attack: e } = {}) {
  var p;
  if (!(canvas != null && canvas.scene) || !((p = canvas == null ? void 0 : canvas.templates) != null && p.preview))
    throw Ci("Templated attacks require an active scene canvas.", { severity: "warn" });
  const t = (e == null ? void 0 : e.template) ?? null;
  if (!(t != null && t.shape) || !(Number(t == null ? void 0 : t.size) > 0))
    throw Ci("Templated attack is missing valid template configuration.", { severity: "warn" });
  if (!Ul.includes(t.shape))
    throw Ci(`Template shape "${t.shape}" is normalized but not supported in v1.`, { severity: "warn" });
  const i = yl(s);
  if (t.placement === "origin" && !i)
    throw Ci("Origin-placed templated attacks require the attacker to have a token on the current scene.", { severity: "warn" });
  const a = {}, r = {
    phase: t.placement === "origin" ? "direction" : "anchor",
    anchor: t.placement === "origin" ? bl(i) : null,
    direction: 0
  }, n = async (h, g = null, y = null) => {
    if (window.removeEventListener("keydown", m, !0), canvas.app.view.removeEventListener("pointermove", u), canvas.app.view.removeEventListener("click", f, !0), canvas.app.view.removeEventListener("contextmenu", d, !0), dp(a), y) {
      h(Promise.reject(y));
      return;
    }
    h(g);
  }, o = async (h = null) => {
    !r.anchor && h && (r.anchor = { x: h.x, y: h.y }), r.anchor && (t.shape !== "blast" && h && (r.direction = Ln(r.anchor, h)), await mp(a, t, r.anchor, r.direction));
  };
  let l = null;
  const c = new Promise((h) => {
    l = h;
  }), u = (h) => {
    const g = On(h);
    o(g);
  }, d = (h) => {
    h.preventDefault(), n(l, null);
  }, m = (h) => {
    h.key === "Escape" && (h.preventDefault(), n(l, null));
  }, f = (h) => {
    h.preventDefault(), h.stopPropagation();
    const g = On(h);
    if (r.anchor || (r.anchor = { x: g.x, y: g.y }), r.phase === "anchor" && t.shape !== "blast") {
      r.phase = "direction", o(g);
      return;
    }
    t.shape !== "blast" && (r.direction = Ln(r.anchor, g));
    const y = pp({
      template: t,
      anchor: r.anchor,
      direction: r.direction
    }), b = fp({ template: t, placement: y, attacker: s });
    n(l, { placement: y, targetSnapshots: b });
  };
  return window.addEventListener("keydown", m, !0), canvas.app.view.addEventListener("pointermove", u), canvas.app.view.addEventListener("click", f, !0), canvas.app.view.addEventListener("contextmenu", d, !0), r.anchor && await o(r.anchor), c;
}
function gp(s = {}) {
  var e;
  return Array.isArray(s == null ? void 0 : s.targetSnapshots) ? s.targetSnapshots : Array.from(((e = game.user) == null ? void 0 : e.targets) ?? []).map(Sl).filter(Boolean);
}
function yp(s, e) {
  var i, a, r, n, o, l;
  if (((i = e == null ? void 0 : e.syntheticWeapon) == null ? void 0 : i.id) === "unarmed")
    return {
      ...st.DEFAULT_UNARMED,
      ...e.syntheticWeapon,
      isSynthetic: !0,
      defaultRangeBand: "close"
    };
  const t = ((r = (a = s.items) == null ? void 0 : a.get) == null ? void 0 : r.call(a, (e == null ? void 0 : e.weaponId) ?? "")) ?? null;
  if (!t || !(((n = t.isPersonalWeapon) == null ? void 0 : n.call(t)) ?? t.type === "personalWeapon") || !((o = t.system) != null && o.equipped))
    throw new Error("Attack requires an equipped personal weapon.");
  return ((l = t.getCombatProfile) == null ? void 0 : l.call(t, { payloadId: e == null ? void 0 : e.payloadId })) ?? null;
}
async function bp({ actor: s, payload: e } = {}) {
  var A, w, E, I, D, L, V, Y, K, O, R, U, B, te, he, ge, Ce;
  if (!s) throw new Error("resolveAttack requires actor");
  const t = yp(s, e);
  if (!t) throw new Error("Unable to resolve weapon profile.");
  if (Array.isArray((A = t == null ? void 0 : t.capabilityReport) == null ? void 0 : A.errors) && t.capabilityReport.errors.length > 0)
    throw Ci(
      ((w = t.capabilityReport.errors[0]) == null ? void 0 : w.message) ?? "Weapon capability data is invalid for this attack.",
      { severity: "warn" }
    );
  const i = at(t.skill) ?? {
    code: t.skill,
    label: t.skill || "Attack",
    attribute: "reflexes",
    domains: ["physical"]
  }, a = String(i.attribute ?? "reflexes").trim() || "reflexes", r = ((E = s.getAttributeValue) == null ? void 0 : E.call(s, a)) ?? Number(((L = (D = (I = s.system) == null ? void 0 : I.attributes) == null ? void 0 : D[a]) == null ? void 0 : L.value) ?? 0), n = ((V = s.getSkillRating) == null ? void 0 : V.call(s, t.skill)) ?? Number(((O = (K = (Y = s.system) == null ? void 0 : Y.skills) == null ? void 0 : K[t.skill]) == null ? void 0 : O.rating) ?? 0), o = Number(((B = (U = (R = s.system) == null ? void 0 : R.skills) == null ? void 0 : U[t.skill]) == null ? void 0 : B.bonus) ?? 0), l = new Set(Ks(s.system ?? {}, t.skill)), c = vr(t.skill, e == null ? void 0 : e.specializationKey), u = c && l.has(c.key) ? c : null, d = u ? wr : 0, m = Number(((te = t == null ? void 0 : t.effects) == null ? void 0 : te.accuracyMod) ?? 0) || 0, f = o + m, p = String((e == null ? void 0 : e.rangeBand) ?? t.defaultRangeBand ?? "close").trim() || "close", h = Number(((he = t == null ? void 0 : t.attackRatingBand) == null ? void 0 : he[p]) ?? 0) || 0, g = gp(e);
  if (!!!((ge = t == null ? void 0 : t.capabilityReport) != null && ge.isTemplated) && g.length === 0)
    throw Ci("Target at least one token to attack.", { severity: "warn" });
  const b = Number(t.ap ?? 0) + Number(((Ce = t == null ? void 0 : t.effects) == null ? void 0 : Ce.ap) ?? 0);
  return {
    intent: "attack",
    rollType: "simple",
    title: `${t.name} Attack`,
    subtitle: s.name ?? "Actor",
    domains: Array.isArray(i.domains) && i.domains.length ? i.domains : ["physical"],
    domainTags: ["combat", "attack"],
    diceTarget: Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : 5,
    difficulty: { dn: Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1 },
    edge: {
      earn: { enabled: !0, rate: 4, maxPerRoll: 1 }
    },
    pool: { attribute: r, skill: n, bonus: f, specialization: d },
    breakdown: [
      { id: "attribute", label: "Attribute", value: r },
      { id: "skill", label: i.label, value: n },
      { id: "bonus", label: "Skill Bonus", value: o },
      ...u ? [{
        id: "specialization",
        label: `Specialization (${u.label})`,
        value: d
      }] : [],
      { id: "weaponAccuracy", label: "Weapon Accuracy", value: m },
      { id: "damage", label: "Damage", value: Number(t.damage ?? 0) || 0 },
      { id: "ap", label: "AP", value: b },
      { id: "attackRating", label: `Attack Rating (${p})`, value: h }
    ],
    attack: {
      rangeBand: p,
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
        attribute: a,
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
async function Sp({ actor: s, payload: e, event: t } = {}) {
  return {
    title: "Defense",
    intent: "defense",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function Ap({ actor: s, payload: e, event: t } = {}) {
  return {
    title: "Resistance",
    intent: "resistance",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function wp({ actor: s } = {}) {
  var i, a, r, n, o, l;
  const e = Number(((r = (a = (i = s.system) == null ? void 0 : i.attributes) == null ? void 0 : a.reflexes) == null ? void 0 : r.value) ?? 0), t = Number(((l = (o = (n = s.system) == null ? void 0 : n.attributes) == null ? void 0 : o.edge) == null ? void 0 : l.value) ?? 0);
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
async function Tp({ actor: s }) {
  var i, a, r, n, o;
  const e = Number(((a = (i = s.system) == null ? void 0 : i.burn) == null ? void 0 : a.value) ?? 0);
  e < 6 && ui.notifications.warn("Overload check is only required at Burn 6+.");
  const t = Number(((o = (n = (r = s.system) == null ? void 0 : r.attributes) == null ? void 0 : n.willpower) == null ? void 0 : o.value) ?? 0);
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
const kp = {
  skill: Jm,
  edge: ep,
  attribute: tp,
  common: ip,
  attack: bp,
  defense: Sp,
  resistance: Ap,
  initiative: wp,
  overload: Tp
};
async function ka({ actor: s, payload: e, event: t } = {}) {
  if (!s) throw new Error("resolveIntent requires actor");
  const i = String((e == null ? void 0 : e.intent) ?? "").trim();
  if (!i) throw new Error("resolveIntent requires payload.intent");
  const a = kp[i];
  if (!a) throw new Error(`Unsupported roll intent: ${i}`);
  const r = await a({ actor: s, payload: e, event: t });
  return vp(r, { intent: i });
}
function vp(s, { intent: e } = {}) {
  (!s || typeof s != "object") && (s = {}), s.intent = s.intent ?? e ?? "unknown", s.title = String(s.title ?? "Roll"), s.domains = Array.isArray(s.domains) ? s.domains : [], s.breakdown = Array.isArray(s.breakdown) ? s.breakdown : [], s.mods = Array.isArray(s.mods) ? s.mods : [];
  const t = s.pool && typeof s.pool == "object" ? s.pool : {}, i = Number(t.attribute ?? t.base ?? 0), a = Number(t.skill ?? t.rating ?? 0), r = Number(t.bonus ?? 0), n = Number(t.specialization ?? 0);
  if (![i, a, r, n].every(Number.isFinite))
    throw console.error("MWD | Invalid pool parts after intent resolution", { intent: e, ctx: s }), new Error("MWD.roll: pool parts must be numeric (attribute/skill/bonus/specialization).");
  return s.pool = {
    attribute: i,
    skill: a,
    bonus: r,
    specialization: n,
    totalBase: i + a + r + n
  }, s.rollType = s.rollType ?? "simple", s.diceTarget = Number.isFinite(s.diceTarget) ? s.diceTarget : Number(s.target ?? 5), s.difficulty && typeof s.difficulty == "object" ? s.difficulty.dn = Number(s.difficulty.dn ?? 0) : Number.isFinite(s.dn) && (s.difficulty = { dn: Number(s.dn) }), s.breakdown.length || (s.breakdown = [
    { id: "attribute", label: "Attribute", value: i },
    { id: "skill", label: "Skill", value: a },
    { id: "bonus", label: "Bonus", value: r },
    ...n ? [{ id: "specialization", label: "Specialization", value: n }] : []
  ]), s;
}
var Di;
class Mp {
  constructor() {
    be(this, Di, /* @__PURE__ */ new Map());
  }
  register(e) {
    if (!(e != null && e.id) || typeof e.collect != "function")
      throw new Error("Invalid ModifierProvider: missing id or collect()");
    F(this, Di).has(e.id) || F(this, Di).set(e.id, e);
  }
  async collectAll(e) {
    const t = [];
    for (const i of F(this, Di).values()) {
      const a = await i.collect(e);
      if (console.log("MWD | provider", i.id, "returned", a), !!(a != null && a.length))
        for (const r of a)
          r && typeof r.label == "string" && typeof r.value == "number" && typeof r.source == "string" ? t.push(r) : console.warn("MWD | DROPPED MOD (bad shape)", i.id, r);
    }
    return t;
  }
}
Di = new WeakMap();
const bt = new Mp();
function Ep(s) {
  if (s == null || s === "" || s === "—" || s === "–") return 0;
  const e = Number(s);
  return Number.isFinite(e) ? e : null;
}
function Cp(s) {
  const e = Ep(s == null ? void 0 : s.value);
  return e === null ? null : { ...s, value: e };
}
async function $n({
  actor: s,
  rollType: e,
  skillId: t,
  domains: i,
  // NEW (optional)
  payload: a,
  resolved: r,
  context: n
} = {}) {
  const o = { actor: s, rollType: e, skillId: t, domains: i, payload: a, resolved: r, context: n }, l = await bt.collectAll(o);
  console.log("MWD|condition collect called", o.rollType);
  let c = [];
  for (const d of l ?? []) {
    const m = Cp(d);
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
function Pp({
  actor: s,
  payload: e,
  ctx: t,
  roll: i,
  target: a,
  pool: r,
  mods: n = [],
  modTotal: o = 0,
  hits: l = null,
  ones: c = null,
  edge: u = null,
  outcomeModel: d = null
} = {}) {
  var V, Y, K;
  if (!s) throw new Error("buildResolved requires actor");
  if (!(e != null && e.intent)) throw new Error("buildResolved requires payload.intent");
  if (!i) throw new Error("buildResolved requires roll");
  const m = foundry.utils.randomID(), f = (V = i.dice) == null ? void 0 : V[0], h = (Array.isArray(f == null ? void 0 : f.results) ? f.results : []).map((O, R) => {
    const U = `pool:${R}`, B = Number(O.result), te = !!O.success;
    return {
      ref: U,
      face: B,
      isSuccess: te,
      isFailure: !te,
      tooltip: te ? `Die ${R + 1}: ${B} (Success vs TN ${Number(a ?? 5)})` : `Die ${R + 1}: ${B} (Failure vs TN ${Number(a ?? 5)})`
    };
  }), g = h.filter((O) => O.isFailure).map((O) => O.ref), y = [{
    id: "pool",
    label: "Pool",
    faces: 6,
    termIndex: 0,
    // informational only
    dice: h
  }], b = (Array.isArray(n) ? n : []).map((O, R) => {
    const U = Number(O.value ?? 0), B = `mod:${Rp(O.label ?? "mod")}:${R}`;
    return {
      id: O.id ?? B,
      label: O.label ?? "Modifier",
      value: U,
      domain: O.domain ?? null,
      source: O.source ?? null,
      tooltip: O.tooltip ?? `${O.label ?? "Modifier"} ${xn(U)}`
    };
  }), A = b.map((O) => O.id), E = (Array.isArray(t == null ? void 0 : t.breakdown) ? t.breakdown : []).map((O) => ({
    id: `pool.${O.id ?? foundry.utils.randomID()}`,
    label: O.label ?? O.id ?? "Row",
    value: Number(O.value ?? 0),
    tooltip: `Contribution from ${O.label ?? O.id}: ${Number(O.value ?? 0)}`
  }));
  E.push({
    id: "mods.total",
    label: "Mods",
    value: Number(o ?? 0),
    modIds: A,
    tooltip: b.length ? b.map((O) => `${O.label}: ${xn(O.value)}`).join(`
`) : "No roll-time modifiers."
  }), E.push({
    id: "pool.final",
    label: "Final Pool",
    value: Number(r ?? 0),
    tooltip: `Final dice pool rolled: ${Number(r ?? 0)}d6`
  });
  const I = Number.isFinite(Number(l)) ? Number(l) : h.filter((O) => O.isSuccess).length, D = Number.isFinite(Number(c)) ? Number(c) : h.filter((O) => O.face === 1).length, L = Np(u, { payload: e });
  return {
    version: 2,
    id: m,
    actorUuid: s.uuid,
    // Re-entry
    originPayload: e,
    // Render header
    title: (t == null ? void 0 : t.title) ?? "Roll",
    subtitle: (t == null ? void 0 : t.subtitle) ?? s.name ?? "Actor",
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
        pool: ((Y = t == null ? void 0 : t.edge) == null ? void 0 : Y.pool) ?? null,
        earn: ((K = t == null ? void 0 : t.edge) == null ? void 0 : K.earn) ?? null
      }
    },
    // Roll + dice
    roll: {
      json: i.toJSON(),
      formula: i.formula,
      target: Number(a ?? 5),
      pool: Number(r ?? 0),
      diceGroups: y,
      failureDiceRefs: g
    },
    // Outcome numbers
    outcome: {
      hits: I,
      ones: D
    },
    // New: engine-interpreted outcome (margin/net/converted/edgeEarned/etc
    outcomeModel: d,
    // Breakdown + modifiers
    breakdownRows: E,
    modifiers: {
      applied: b,
      total: Number(o ?? 0)
    },
    // Edge snapshot / affordances
    edge: L
  };
}
function Np(s, { payload: e } = {}) {
  var p, h, g, y, b, A, w, E, I, D, L, V, Y, K;
  const t = !!((p = e == null ? void 0 : e.edge) != null && p.enabled), i = (s == null ? void 0 : s.domain) ?? null, a = (s == null ? void 0 : s.pools) ?? null, r = ((h = s == null ? void 0 : s.pre) == null ? void 0 : h.poolKey) ?? ((y = (g = e == null ? void 0 : e.edge) == null ? void 0 : g.pre) == null ? void 0 : y.poolKey) ?? (t ? ((b = e == null ? void 0 : e.edge) == null ? void 0 : b.poolKey) ?? null : null), n = Number(((A = s == null ? void 0 : s.pre) == null ? void 0 : A.spent) ?? ((E = (w = e == null ? void 0 : e.edge) == null ? void 0 : w.pre) == null ? void 0 : E.spent) ?? (t ? 1 : 0)) ? 1 : 0, o = ((I = s == null ? void 0 : s.post) == null ? void 0 : I.poolKey) ?? ((L = (D = e == null ? void 0 : e.edge) == null ? void 0 : D.post) == null ? void 0 : L.poolKey) ?? null, l = Number(((V = s == null ? void 0 : s.post) == null ? void 0 : V.spent) ?? ((K = (Y = e == null ? void 0 : e.edge) == null ? void 0 : Y.post) == null ? void 0 : K.spent) ?? 0) ? 1 : 0, c = (a == null ? void 0 : a.a) ?? null, u = (a == null ? void 0 : a.b) ?? null, d = [c, u].filter(Boolean);
  let m = [c, u].filter(Boolean);
  n && r && (m = m.filter((O) => O !== r));
  const f = {
    canSpendPre: d.length > 0 && !n,
    // spending pre after roll is not a thing
    canSpendPost: m.length > 0 && !l,
    canPostRerollFailures: m.length > 0 && !l
  };
  return {
    domain: i,
    pools: a ? { a: c, b: u } : null,
    pre: { poolKey: r, spent: n },
    post: { poolKey: o, spent: l },
    allowed: {
      prePools: d,
      postPools: m
    },
    availableActions: f
  };
}
function xn(s) {
  const e = Number(s ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function Rp(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function Dp(s, e) {
  var c, u, d, m, f, p, h, g, y;
  const t = s ?? {}, i = Array.isArray((c = t == null ? void 0 : t.modifiers) == null ? void 0 : c.applied) ? t.modifiers.applied : [], a = Number(((u = t == null ? void 0 : t.modifiers) == null ? void 0 : u.total) ?? 0);
  if (i.length) {
    const b = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((A) => A.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${i.map((A) => `${A.label} ${Bn(A.value)}`).join(", ")} (Total ${Bn(a)})`,
      title: (b == null ? void 0 : b.tooltip) ?? ""
    });
  }
  const r = (t == null ? void 0 : t.edge) ?? null, n = Array.isArray((d = t == null ? void 0 : t.roll) == null ? void 0 : d.failureDiceRefs) ? t.roll.failureDiceRefs : [], o = !!((m = r == null ? void 0 : r.availableActions) != null && m.canPostRerollFailures), l = Array.isArray((f = r == null ? void 0 : r.allowed) == null ? void 0 : f.postPools) ? r.allowed.postPools : [];
  if (r != null && r.domain && (e.edge = {
    domain: r.domain,
    earned: ((p = t == null ? void 0 : t.outcomeModel) == null ? void 0 : p.edgeEarned) ?? null,
    preSpent: Number(((h = r == null ? void 0 : r.pre) == null ? void 0 : h.spent) ?? 0),
    postSpent: Number(((g = r == null ? void 0 : r.post) == null ? void 0 : g.spent) ?? 0),
    canPost: o && n.length > 0 && l.length > 0,
    failureCount: n.length,
    postPools: l
  }, e.metaRows.push({
    text: `Edge: ${r.domain} • pre ${e.edge.preSpent} • post ${e.edge.postSpent}`,
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
function Bn(s) {
  const e = Number(s ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function Ip(s, e) {
  var f, p, h, g, y, b, A, w, E, I, D, L, V, Y, K, O;
  const t = s ?? {}, i = (t == null ? void 0 : t.attackResult) ?? null;
  if (!i) return;
  const a = Array.isArray(i == null ? void 0 : i.results) ? i.results : [], r = (i == null ? void 0 : i.summary) ?? Op(a), n = Array.isArray((f = t == null ? void 0 : t.modifiers) == null ? void 0 : f.applied) ? t.modifiers.applied : [], o = Number(((p = t == null ? void 0 : t.modifiers) == null ? void 0 : p.total) ?? 0);
  if (n.length) {
    const R = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((U) => U.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${n.map((U) => `${U.label} ${Ss(U.value)}`).join(", ")} (Total ${Ss(o)})`,
      title: (R == null ? void 0 : R.tooltip) ?? ""
    });
  }
  const l = (t == null ? void 0 : t.edge) ?? null, c = Array.isArray((h = t == null ? void 0 : t.roll) == null ? void 0 : h.failureDiceRefs) ? t.roll.failureDiceRefs : [], u = !!((g = l == null ? void 0 : l.availableActions) != null && g.canPostRerollFailures), d = Array.isArray((y = l == null ? void 0 : l.allowed) == null ? void 0 : y.postPools) ? l.allowed.postPools : [];
  if (l != null && l.domain && (e.edge = {
    domain: l.domain,
    earned: ((b = t == null ? void 0 : t.outcomeModel) == null ? void 0 : b.edgeEarned) ?? null,
    preSpent: Number(((A = l == null ? void 0 : l.pre) == null ? void 0 : A.spent) ?? 0),
    postSpent: Number(((w = l == null ? void 0 : l.post) == null ? void 0 : w.spent) ?? 0),
    canPost: u && c.length > 0 && d.length > 0,
    failureCount: c.length,
    postPools: d
  }, e.metaRows.push({
    text: `Edge: ${l.domain} | pre ${e.edge.preSpent} | post ${e.edge.postSpent}`,
    title: ""
  })), (E = e.edge) != null && E.canPost) {
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
  const m = String((r == null ? void 0 : r.overallOutcome) ?? "").trim();
  e.outcomeText = a.length > 1 ? `ATTACK ${r.hits} HIT / ${r.grazes} GRAZE / ${r.misses} MISS` : m === "hit" ? "HIT!" : m === "graze" ? "GRAZE!" : "MISS!", e.metaRows.push({
    text: `Targets: ${a.length || 0}`,
    title: ""
  });
  for (const R of a)
    e.metaRows.push({
      text: `${((I = R == null ? void 0 : R.target) == null ? void 0 : I.name) ?? "Target"}: ${String((R == null ? void 0 : R.outcome) ?? "miss").toUpperCase()} | CQ ${Ss(((D = R == null ? void 0 : R.cq) == null ? void 0 : D.value) ?? 0)} | Net ${Number((R == null ? void 0 : R.netHits) ?? 0)}`,
      title: ""
    });
  for (const R of a) {
    const U = (R == null ? void 0 : R.damage) ?? null;
    U && (R == null ? void 0 : R.outcome) !== "miss" && e.footerRows.push({
      text: `${((L = R == null ? void 0 : R.target) == null ? void 0 : L.name) ?? "Target"}: ${U.damageTypeLabel} ${Ss(U.effectiveWeaponDamage)} weapon${U.netHits ? ` + ${U.netHits} net` : ""}`,
      title: ""
    });
    const B = (R == null ? void 0 : R.damageResult) ?? null;
    B != null && B.ok && !(B != null && B.skipped) ? (e.footerRows.push({
      text: `${B.actorName ?? ((V = R == null ? void 0 : R.target) == null ? void 0 : V.name) ?? "Target"}: Applied ${Number(B.finalDamage ?? B.appliedDelta ?? 0)}`,
      title: ""
    }), B.beforeLabel && B.afterLabel && e.footerRows.push({
      text: `${B.actorName ?? ((Y = R == null ? void 0 : R.target) == null ? void 0 : Y.name) ?? "Target"} Track: ${B.beforeLabel} -> ${B.afterLabel}`,
      title: ""
    }), B.usedArmor && B.mitigation && e.footerRows.push({
      text: `${B.actorName ?? ((K = R == null ? void 0 : R.target) == null ? void 0 : K.name) ?? "Target"} Mitigation: ${Number(B.mitigation.baseMitigation ?? 0)} + ${Number(B.mitigation.typeMitigationMod ?? 0)} - ${Number(B.effectiveAp ?? 0)} = ${Number(B.mitigation.netResistance ?? 0)}`,
      title: ""
    })) : B != null && B.reason && e.footerRows.push({
      text: `${((O = R == null ? void 0 : R.target) == null ? void 0 : O.name) ?? "Target"}: ${B.reason}`,
      title: ""
    });
  }
}
function Op(s = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of s)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
function Ss(s) {
  const e = Number(s ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function _p(s, e) {
  var c;
  const t = s ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, a = (i == null ? void 0 : i.net) ?? null;
  if (!a) return;
  e.net = a;
  const r = Number((a == null ? void 0 : a.converted) ?? 0), n = Number((a == null ? void 0 : a.value) ?? 0), o = Number((a == null ? void 0 : a.rate) ?? 4);
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
function Lp(s, e) {
  var l, c, u, d;
  const t = s ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, a = Number(((l = i == null ? void 0 : i.attacker) == null ? void 0 : l.successes) ?? (i == null ? void 0 : i.attackerHits) ?? NaN), r = Number(((c = i == null ? void 0 : i.defender) == null ? void 0 : c.successes) ?? (i == null ? void 0 : i.defenderHits) ?? NaN), n = Number((i == null ? void 0 : i.netHits) ?? (i == null ? void 0 : i.net) ?? NaN);
  Number.isFinite(a) && Number.isFinite(r) && e.metaRows.push({ text: `Opposed: Att ${a} vs Def ${r} • Net ${Number.isFinite(n) ? n : a - r}` }), (u = t == null ? void 0 : t.incoming) != null && u.label && (e.incoming = { label: t.incoming.label, value: t.incoming.value ?? "" }, e.footerRows.push({ text: `Incoming: ${e.incoming.label} ${e.incoming.value}` }));
  const o = ((d = i == null ? void 0 : i.edgeEarned) == null ? void 0 : d.amount) > 0 ? i.edgeEarned : null;
  o && e.footerRows.push({ text: `Edge Earned: +${o.amount}${o.pool ? ` (${o.pool})` : ""}` });
}
function $p(s, e) {
  var c;
  const t = s ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, a = (i == null ? void 0 : i.extended) ?? null;
  if (!a) return;
  e.extended = a;
  const r = Number((a == null ? void 0 : a.progress) ?? 0), n = Number((a == null ? void 0 : a.target) ?? 0), o = Number((a == null ? void 0 : a.remaining) ?? Math.max(0, n - r));
  e.metaRows.push({
    text: `Extended: ${r}/${n} (Remaining ${o})`,
    title: ""
  }), a != null && a.completed && e.footerRows.push({ text: `Completed in ${Number((a == null ? void 0 : a.rounds) ?? (a == null ? void 0 : a.attempts) ?? 0) || "?"} attempts.` });
  const l = ((c = i == null ? void 0 : i.edgeEarned) == null ? void 0 : c.amount) > 0 ? i.edgeEarned : null;
  l && e.footerRows.push({ text: `Edge Earned: +${l.amount}${l.pool ? ` (${l.pool})` : ""}` });
}
const xp = {
  skill: Dp,
  attack: Ip,
  net: _p,
  opposed: Lp,
  extended: $p
  // defense: enhanceDefense,
  // edge: enhanceEdge,
};
async function Al({ resolved: s } = {}) {
  const e = s ?? {}, t = Bp(e), i = xp[t.intent];
  return typeof i == "function" && i(e, t), await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-roll-card",
    t
  );
}
function Bp(s) {
  var f, p, h, g, y, b, A, w, E, I, D, L;
  const e = s ?? {}, t = Number(((f = e == null ? void 0 : e.roll) == null ? void 0 : f.target) ?? 5), i = Number(((h = (p = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : p.difficulty) == null ? void 0 : h.dn) ?? 0), a = Number(((g = e == null ? void 0 : e.roll) == null ? void 0 : g.pool) ?? 0), r = Number(((y = e == null ? void 0 : e.outcome) == null ? void 0 : y.hits) ?? 0), n = (e == null ? void 0 : e.outcomeModel) ?? {}, o = typeof n.passed == "boolean" ? n.passed : r >= i, l = Number.isFinite(Number(n.margin)) ? Number(n.margin) : r - i, c = n.tier ?? null, u = Array.isArray(e == null ? void 0 : e.breakdownRows) ? e.breakdownRows.map((V) => `${V.label}: ${V.value}`).join(`
`) : "", d = {
    header: { left: (e == null ? void 0 : e.title) ?? "Roll", right: (e == null ? void 0 : e.subtitle) ?? "" },
    formula: String((e == null ? void 0 : e.formula) ?? "").trim(),
    intent: (e == null ? void 0 : e.intent) ?? "unknown",
    domains: Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [],
    tn: t,
    dn: i,
    pool: a,
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
  }, m = (e == null ? void 0 : e.attack) ?? null;
  if ((b = e == null ? void 0 : e.specialization) != null && b.label && d.metaRows.push({
    text: `Specialization: ${e.specialization.label} (+${Number(e.specialization.value ?? 0)})`,
    title: ""
  }), (A = m == null ? void 0 : m.weapon) != null && A.name) {
    const V = String((m == null ? void 0 : m.rangeBand) ?? "").trim(), Y = String(((w = m == null ? void 0 : m.weapon) == null ? void 0 : w.damageTypeLabel) ?? ((E = m == null ? void 0 : m.weapon) == null ? void 0 : E.damageType) ?? "").trim(), K = String(((I = m == null ? void 0 : m.payload) == null ? void 0 : I.label) ?? ((D = m == null ? void 0 : m.weapon) == null ? void 0 : D.payloadLabel) ?? "").trim();
    d.metaRows.push({
      text: `Weapon: ${m.weapon.name}${V ? ` • Range: ${V}` : ""}${Y ? ` • Type: ${Y}` : ""}${K ? ` • Payload: ${K}` : ""}`,
      title: ""
    }), (L = m == null ? void 0 : m.sourceState) != null && L.isTracked && d.footerRows.push({
      text: `Source: ${Number(m.sourceState.current ?? 0)}/${Number(m.sourceState.max ?? 0)}`,
      title: ""
    });
  }
  return d;
}
function Ae(s, e = 0) {
  const t = Number(s);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
function va(s, e = 0, t = Number.POSITIVE_INFINITY) {
  const i = Ae(s, e);
  return Math.max(e, Math.min(t, i));
}
function wl(s, e = 1) {
  var i;
  const t = Ae((i = s == null ? void 0 : s.difficulty) == null ? void 0 : i.dn, Ae(e, 1));
  return Math.max(0, t);
}
function Fp(s, e) {
  return Math.max(0, Ae(s, 0) - Ae(e, 0));
}
function zp({ convert: s, remainder: e, rate: t = 4 } = {}) {
  const i = Math.max(0, Ae(e, 0)), a = Math.max(1, Ae(t, 4)), r = Math.max(0, Ae(s, 0)), n = Math.floor(r / a) * a;
  return Math.min(i, n);
}
function xr(s, { rate: e = 4, maxPerRoll: t = Number.POSITIVE_INFINITY } = {}) {
  const i = Math.max(1, Ae(e, 4)), a = Math.floor(Math.max(0, Ae(s, 0)) / i), r = Number.isFinite(t) ? Math.max(0, Ae(t, 0)) : Number.POSITIVE_INFINITY;
  return { amount: Math.min(a, r), rate: i };
}
function Br(s) {
  var i;
  const e = ((i = s == null ? void 0 : s.edge) == null ? void 0 : i.earn) ?? {};
  return {
    enabled: !!(e != null && e.enabled),
    rate: Math.max(1, Ae(e == null ? void 0 : e.rate, 4)),
    maxPerRoll: (e == null ? void 0 : e.maxPerRoll) ?? Number.POSITIVE_INFINITY
  };
}
function Ws(s) {
  var t;
  const e = (t = s == null ? void 0 : s.edge) == null ? void 0 : t.pool;
  return e ? String(e) : null;
}
function Wp(s) {
  let e = 0, t = 0;
  const i = (a) => {
    if (!a) return;
    const r = a == null ? void 0 : a.results;
    if (Array.isArray(r))
      for (const o of r) {
        if ((o == null ? void 0 : o.active) === !1) continue;
        const l = Number(o == null ? void 0 : o.result);
        Number.isFinite(l) && (e += 1, l === 1 && (t += 1));
      }
    const n = a == null ? void 0 : a.terms;
    if (Array.isArray(n))
      for (const o of n) i(o);
    if (Array.isArray(a))
      for (const o of a) i(o);
  };
  return i(s), { dice: e, ones: t };
}
function Tl(s, e) {
  if (Ae(s, 0) !== 0) return !1;
  const { dice: t, ones: i } = Wp(e);
  return t <= 0 ? !1 : i >= Math.ceil(t / 2);
}
function Hp(s, e, t = 4) {
  return !!(s && Ae(e, 0) >= Ae(t, 4));
}
function Fn(s, e) {
  const t = Ae(e == null ? void 0 : e.successes, 0), i = wl(s, 1), a = t >= i, r = t - i, n = Hp(a, r, 4), o = Tl(t, e == null ? void 0 : e.raw), l = Br(s), c = l.maxPerRoll ?? 1, u = l.enabled && r >= l.rate ? (() => {
    const { amount: m, rate: f } = xr(r, { rate: l.rate, maxPerRoll: c }), p = Ws(s);
    return m > 0 ? { amount: m, pool: p, reason: "net4", details: { margin: r, rate: f } } : null;
  })() : null;
  return {
    rollType: "simple",
    passed: a,
    successes: t,
    difficulty: { dn: i },
    margin: r,
    criticalSuccess: n,
    criticalFailure: o,
    tier: n ? "criticalSuccess" : o ? "criticalFailure" : a ? "success" : "failure",
    edgeEarned: u
  };
}
function Up(s, e, t) {
  var m, f;
  const i = Ae(e == null ? void 0 : e.successes, 0), a = Ae(t == null ? void 0 : t.successes, 0), r = !!((m = s == null ? void 0 : s.opposed) != null && m.net), n = String(((f = s == null ? void 0 : s.opposed) == null ? void 0 : f.dnTies) ?? "stalemate");
  let o = null, l = !1;
  r ? (o = i - a, o > 0 ? l = !0 : o < 0 ? l = !1 : n === "attackerWins" ? l = !0 : l = !1) : i > a ? l = !0 : i < a ? l = !1 : n === "attackerWins" ? l = !0 : l = !1;
  const c = Br(s), u = c.maxPerRoll ?? 1, d = c.enabled && r && typeof o == "number" && o >= c.rate ? (() => {
    const { amount: p, rate: h } = xr(o, { rate: c.rate, maxPerRoll: u }), g = Ws(s);
    return p > 0 ? { amount: p, pool: g, reason: "net4", details: { netHits: o, rate: h } } : null;
  })() : null;
  return {
    rollType: "opposed",
    passed: l,
    successes: i,
    opposed: {
      attacker: i,
      defender: a,
      netEnabled: r,
      netHits: r ? o : void 0,
      tiePolicy: n
    },
    edgeEarned: d
  };
}
function jp(s, e) {
  var h, g, y;
  const t = Ae(e == null ? void 0 : e.successes, 0), i = wl(s, 1), a = t >= i, r = Tl(t, e == null ? void 0 : e.raw), n = Fp(t, i), o = ((h = s == null ? void 0 : s.net) == null ? void 0 : h.convert) ?? ((g = s == null ? void 0 : s.allocation) == null ? void 0 : g.convert) ?? 0, l = Br(s), c = l.rate, u = zp({ convert: o, remainder: n, rate: c }), d = n - u, m = l.enabled && u >= c ? (() => {
    const { amount: b } = xr(u, { rate: c, maxPerRoll: l.maxPerRoll }), A = Ws(s);
    return b > 0 ? { amount: b, pool: A, reason: "convert4", details: { converted: u, rate: c } } : null;
  })() : null, f = r ? { amount: 1, pool: Ws(s), reason: "critFail", details: { onesRule: "halfOrMoreOnes" } } : null, p = [];
  return m && p.push(m), f && p.push(f), p.length === 0 || (p.length === 1 ? p[0] : (p.reduce((b, A) => b + (Number(A == null ? void 0 : A.amount) || 0), 0), (y = p[0]) == null || y.pool)), {
    rollType: "net",
    passed: a,
    successes: t,
    difficulty: { dn: i },
    criticalFailure: r,
    tier: r ? "criticalFailure" : a ? "success" : "failure",
    net: {
      remainder: n,
      convertRequested: Ae(o, 0),
      converted: u,
      value: d,
      // the actual net effect magnitude you apply (+net dice, etc.)
      rate: c,
      canConvert: n >= c
    },
    edgeEarned: m
  };
}
function Gp(s, e) {
  var o, l, c, u;
  const t = Ae(e == null ? void 0 : e.successes, 0), i = va((o = s == null ? void 0 : s.extended) == null ? void 0 : o.target, 1, 1e4), a = va((l = s == null ? void 0 : s.extended) == null ? void 0 : l.accumulated, 0, 1e4), r = va(a + t, 0, 1e4), n = r >= i;
  return {
    rollType: "extended",
    passed: n,
    successes: t,
    extended: {
      target: i,
      accumulated: a,
      nextAccumulated: r,
      remaining: Math.max(0, i - r),
      completed: n,
      interval: ((c = s == null ? void 0 : s.extended) == null ? void 0 : c.interval) ?? null,
      failureLimit: ((u = s == null ? void 0 : s.extended) == null ? void 0 : u.failureLimit) ?? null
    },
    // NOTE: Edge earn rules for extended are intentionally omitted per your earlier constraint.
    edgeEarned: null
  };
}
function qp(s, e, t = null) {
  var a;
  switch (String((s == null ? void 0 : s.rollType) ?? "simple")) {
    case "simple":
      return Fn(s, e);
    case "opposed":
      return Up(s, e, t);
    case "net":
      return jp(s, e);
    case "extended":
      return Gp(s, e);
    default: {
      const r = {
        ...s,
        difficulty: { dn: Number(((a = s == null ? void 0 : s.difficulty) == null ? void 0 : a.dn) ?? 1) || 1 }
      };
      return Fn(r, e);
    }
  }
}
const { ApplicationV2: Vp, HandlebarsApplicationMixin: Kp } = foundry.applications.api;
function Yp(s, e = -3, t = 3) {
  const i = [], a = "../img/dice";
  for (let r = e; r <= t; r++) {
    const n = Math.abs(r), o = n === 0 ? `${a}/BlankDice.webp` : `${a}/D6_${n}.svg`;
    i.push({
      value: r,
      abs: n,
      icon: o,
      active: r === s,
      neg: r < 0,
      pos: r > 0,
      zero: r === 0,
      title: r === 0 ? "0 (neutral)" : r < 0 ? `${r} penalty` : `+${r} bonus`
    });
  }
  return i;
}
function zn(s) {
  return (Array.isArray(s) ? s : []).map((t) => ({
    id: (t == null ? void 0 : t.id) ?? foundry.utils.randomID(),
    label: typeof (t == null ? void 0 : t.label) == "string" ? t.label : "Manual",
    value: Number((t == null ? void 0 : t.value) ?? 0)
  }));
}
function Ma(s, e) {
  const t = s == null ? void 0 : s.toggles;
  return t && typeof t == "object" && e in t ? !!t[e] : !!(s != null && s[e]);
}
function Qp(s, e) {
  s.useEdge = !!e.useEdge, s.takeRisks = !!e.takeRisks, s.opponentRoll = !!e.opponentRoll, s.toggles = s.toggles && typeof s.toggles == "object" ? s.toggles : {}, s.toggles.useEdge = !!e.useEdge, s.toggles.takeRisks = !!e.takeRisks, s.toggles.opponentRoll = !!e.opponentRoll;
}
function Wn(s, e, t) {
  const i = String(t ?? "").trim(), a = i ? Dc(e, i) : "";
  if (i && a) {
    s.specializationKey = i, s.specializationLabel = a;
    return;
  }
  delete s.specializationKey, delete s.specializationLabel;
}
function Jp(s) {
  const e = Array.isArray(s == null ? void 0 : s.breakdown) ? s.breakdown : [], t = (i) => {
    var a;
    return Number(((a = e.find((r) => (r == null ? void 0 : r.id) === i)) == null ? void 0 : a.value) ?? 0);
  };
  return {
    attribute: t("attribute"),
    skill: t("skill"),
    bonus: t("bonus"),
    specialization: t("specialization")
  };
}
var Ge;
const Me = class Me extends Kp(Vp) {
  constructor({ actor: t, baseContext: i, initialState: a = null, options: r = {} }) {
    var c, u;
    super(r);
    be(this, Ge, null);
    /** @type {{ baseContext: any, state: any }} */
    N(this, "_mwd", { baseContext: null, state: null });
    this.actor = t, this._mwd.baseContext = i ?? {};
    const n = foundry.utils.deepClone(this._mwd.baseContext.payload ?? {}), o = zn(n.manualModifiers);
    this._mwd.state = foundry.utils.mergeObject(
      {
        payload: n,
        manual: o,
        toggles: {
          useEdge: Ma(n, "useEdge"),
          takeRisks: Ma(n, "takeRisks"),
          opponentRoll: Ma(n, "opponentRoll")
        }
      },
      a ?? {},
      { inplace: !1, insertKeys: !0, insertValues: !0, overwrite: !0 }
    );
    const l = String(((u = (c = n == null ? void 0 : n.edge) == null ? void 0 : c.pre) == null ? void 0 : u.poolKey) ?? "").trim() || null;
    this._mwd.state.edge = {
      prePoolKey: l
    };
  }
  async wait() {
    return new Promise((t) => {
      Pe(this, Ge, t), this.render(!0);
    });
  }
  async close(t = {}) {
    if (F(this, Ge)) {
      const i = F(this, Ge);
      Pe(this, Ge, null), i(null);
    }
    return super.close(t);
  }
  /* --------------------------- */
  /* Prepare Context             */
  /* --------------------------- */
  async _prepareContext(t) {
    var V, Y, K, O, R, U, B, te, he, ge, Ce, De, Ye, Mt, Et, Ct, Pt, Nt, Rt, Dt, It, Ot, _t, Lt, $t, xt, nt, Bt, Ft, zt, v, P, j, re, ue, fe, we;
    const i = this._mwd.baseContext ?? {}, a = this._mwd.state ?? {}, r = Number.isFinite(Number((V = a == null ? void 0 : a.payload) == null ? void 0 : V.dn)) ? Number(a.payload.dn) : Number.isFinite(Number(i == null ? void 0 : i.dn)) ? Number(i.dn) : Number.isFinite(Number((K = (Y = i == null ? void 0 : i.resolved) == null ? void 0 : Y.difficulty) == null ? void 0 : K.dn)) ? Number(i.resolved.difficulty.dn) : 1, n = (i == null ? void 0 : i.intent) ?? "skill";
    let o, l;
    const c = Array.isArray(a.manual) ? a.manual.reduce((H, J) => H + Number((J == null ? void 0 : J.value) || 0), 0) : 0;
    if (n === "edge") {
      const H = (i == null ? void 0 : i.resolved) ?? {}, J = Array.isArray(H.breakdown) ? H.breakdown : [], Ie = (_e) => {
        var He;
        return Number(((He = J.find((x) => x.id === _e)) == null ? void 0 : He.value) ?? 0);
      }, Oe = Number(((O = H == null ? void 0 : H.pool) == null ? void 0 : O.attribute) ?? 0);
      o = {
        pool: Oe,
        rating: Ie("rating"),
        cap: Ie("cap"),
        modifiers: Number(((R = i == null ? void 0 : i.dice) == null ? void 0 : R.modifiers) ?? 0)
      }, l = Math.max(0, Oe + o.modifiers + c);
    } else {
      o = {
        attribute: Number(((U = i == null ? void 0 : i.dice) == null ? void 0 : U.attribute) ?? 0),
        skill: Number(((B = i == null ? void 0 : i.dice) == null ? void 0 : B.skill) ?? 0),
        bonus: Number(((te = i == null ? void 0 : i.dice) == null ? void 0 : te.bonus) ?? 0),
        specialization: Number(((he = i == null ? void 0 : i.dice) == null ? void 0 : he.specialization) ?? 0),
        modifiers: Number(((ge = i == null ? void 0 : i.dice) == null ? void 0 : ge.modifiers) ?? 0)
      };
      const H = o.modifiers + c, J = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, J + H);
    }
    const u = Array.isArray((Ce = i == null ? void 0 : i.resolved) == null ? void 0 : Ce.domains) ? i.resolved.domains : [], d = u.includes("physical") ? "physical" : u.includes("mental") ? "mental" : u.includes("social") ? "social" : null, f = (d === "physical" ? ["grit", "chaos"] : d === "mental" ? ["insight", "rumor"] : d === "social" ? ["legend", "credibility"] : []).map((H) => {
      var J, Ie, Oe, _e;
      return {
        key: H,
        label: H.charAt(0).toUpperCase() + H.slice(1),
        available: Number(((Oe = (Ie = (J = this.actor) == null ? void 0 : J.getEdgePool) == null ? void 0 : Ie.call(J, H)) == null ? void 0 : Oe.effectiveValue) ?? 0),
        selected: H === (((_e = a.edge) == null ? void 0 : _e.prePoolKey) ?? null)
      };
    }), p = f.find((H) => H.selected), h = (p == null ? void 0 : p.label) ?? null, g = ((De = i == null ? void 0 : i.resolved) == null ? void 0 : De.attack) ?? null, y = String(
      ((Ye = g == null ? void 0 : g.skill) == null ? void 0 : Ye.code) ?? ((Et = (Mt = i == null ? void 0 : i.resolved) == null ? void 0 : Mt.specialization) == null ? void 0 : Et.skillKey) ?? ((Pt = (Ct = i == null ? void 0 : i.resolved) == null ? void 0 : Ct.data) == null ? void 0 : Pt.skillKey) ?? ((Nt = i == null ? void 0 : i.payload) == null ? void 0 : Nt.key) ?? ""
    ).trim(), b = y ? Ao(((Rt = this.actor) == null ? void 0 : Rt.system) ?? {}, y) : [], A = String(((Dt = a == null ? void 0 : a.payload) == null ? void 0 : Dt.specializationKey) ?? "").trim(), w = b.find((H) => H.key === A) ?? null;
    if (n !== "edge") {
      o.specialization = w ? Number(((Ot = (It = i == null ? void 0 : i.resolved) == null ? void 0 : It.specialization) == null ? void 0 : Ot.value) ?? 2) : 0;
      const H = o.modifiers + c, J = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, J + H);
    }
    const E = Array.isArray((_t = g == null ? void 0 : g.payloadState) == null ? void 0 : _t.payloads) ? g.payloadState.payloads : [], I = String(((Lt = g == null ? void 0 : g.weapon) == null ? void 0 : Lt.category) ?? "").trim().toLowerCase() !== "melee" && E.length > 0, D = String((($t = a == null ? void 0 : a.payload) == null ? void 0 : $t.payloadId) ?? ((xt = g == null ? void 0 : g.payloadState) == null ? void 0 : xt.activePayloadId) ?? "").trim(), L = E.find((H) => H.id === D) ?? null;
    return {
      header: {
        left: ((nt = i == null ? void 0 : i.header) == null ? void 0 : nt.left) ?? "Roll",
        right: ((Bt = i == null ? void 0 : i.header) == null ? void 0 : Bt.right) ?? ((Ft = this.actor) == null ? void 0 : Ft.name) ?? ""
      },
      formula: String((i == null ? void 0 : i.formula) ?? ((zt = i == null ? void 0 : i.resolved) == null ? void 0 : zt.formula) ?? "").trim(),
      dice: o,
      modifiers: Array.isArray(i.modifiers) ? i.modifiers : [],
      manual: (a.manual ?? []).map((H) => ({
        ...H,
        steps: Yp(Number(H.value ?? 0), -3, 3)
      })),
      edge: {
        domain: d,
        choices: f,
        selectedLabel: h
      },
      toggles: n === "edge" ? { useEdge: !1, takeRisks: !1, opponentRoll: !1 } : a.toggles,
      totalPool: l,
      intent: n,
      dn: r,
      specialization: b.length ? {
        skillCode: y,
        options: b.map((H) => ({
          key: H.key,
          label: H.label,
          selected: H.key === A
        })),
        selectedKey: A,
        selectedLabel: (w == null ? void 0 : w.label) ?? ""
      } : null,
      attack: g ? {
        weaponName: ((v = g == null ? void 0 : g.weapon) == null ? void 0 : v.name) ?? "Weapon",
        rangeBand: (g == null ? void 0 : g.rangeBand) ?? "",
        damageType: ((P = L == null ? void 0 : L.modifies) == null ? void 0 : P.damageType) || ((j = g == null ? void 0 : g.weapon) == null ? void 0 : j.damageTypeLabel) || ((re = g == null ? void 0 : g.weapon) == null ? void 0 : re.damageType) || "",
        usesPayloads: I,
        source: (g == null ? void 0 : g.sourceState) ?? null,
        payloads: E.map((H) => {
          var J;
          return {
            id: H.id,
            name: H.label,
            damageType: (J = H.modifies) == null ? void 0 : J.damageType,
            selected: H.id === D
          };
        }),
        selectedPayloadId: D,
        selectedPayloadLabel: (L == null ? void 0 : L.label) ?? ((ue = g == null ? void 0 : g.payload) == null ? void 0 : ue.label) ?? ((fe = g == null ? void 0 : g.weapon) == null ? void 0 : fe.payloadLabel) ?? "",
        selectedSourceLabel: ((we = g == null ? void 0 : g.sourceState) == null ? void 0 : we.label) ?? ""
      } : null
    };
  }
  /* --------------------------- */
  /* Actions                     */
  /* --------------------------- */
  async _onCancel(t) {
    if (t == null || t.preventDefault(), F(this, Ge)) {
      const i = F(this, Ge);
      Pe(this, Ge, null), i(null);
    }
    return this.close();
  }
  async _onSubmit(t) {
    var a, r, n, o, l, c, u, d, m, f, p, h, g;
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
    }), Qp(i.payload, i.toggles ?? {}), Wn(
      i.payload,
      ((a = i.payload) == null ? void 0 : a.intent) === "attack" ? ((r = i.payload) == null ? void 0 : r.skillKey) ?? ((c = (l = (o = (n = this._mwd.baseContext) == null ? void 0 : n.resolved) == null ? void 0 : o.attack) == null ? void 0 : l.skill) == null ? void 0 : c.code) : ((u = i.payload) == null ? void 0 : u.key) ?? ((f = (m = (d = this._mwd.baseContext) == null ? void 0 : d.resolved) == null ? void 0 : m.data) == null ? void 0 : f.skillKey),
      (p = i.payload) == null ? void 0 : p.specializationKey
    ), F(this, Ge)) {
      const y = F(this, Ge);
      Pe(this, Ge, null), y({ payload: i.payload });
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
    var r;
    t == null || t.preventDefault();
    const a = (r = i == null ? void 0 : i.dataset) == null ? void 0 : r.id;
    if (a)
      return this._mwd.state.manual = this._mwd.state.manual.filter((n) => n.id !== a), this.render(!1);
  }
  async _onSetManualValue(t, i) {
    var o, l;
    t == null || t.preventDefault();
    const a = (o = i == null ? void 0 : i.dataset) == null ? void 0 : o.id, r = (l = i == null ? void 0 : i.dataset) == null ? void 0 : l.field;
    if (!a || !r) return;
    const n = this._mwd.state.manual.find((c) => c.id === a);
    if (n)
      return r === "label" && (n.label = String(i.value ?? "")), r === "value" && (n.value = Number(i.value ?? 0)), this.render(!1);
  }
  async _onSetManualStepper(t, i) {
    var o, l;
    t == null || t.preventDefault();
    const a = (o = i == null ? void 0 : i.dataset) == null ? void 0 : o.id, r = Number((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.value);
    if (!a || Number.isNaN(r)) return;
    const n = this._mwd.state.manual.find((c) => c.id === a);
    if (n)
      return n.value = r, this.render(!1);
  }
  async _onSetEdgePrePool(t, i) {
    var r;
    t == null || t.preventDefault();
    const a = String(((r = i == null ? void 0 : i.dataset) == null ? void 0 : r.poolKey) ?? "").trim();
    if (a)
      return this._mwd.state.edge = this._mwd.state.edge ?? {}, this._mwd.state.edge.prePoolKey = a, this._mwd.state.toggles.useEdge = !0, this.render(!1);
  }
  async _onToggleCheckbox(t, i) {
    var r;
    t == null || t.preventDefault();
    const a = (r = i == null ? void 0 : i.dataset) == null ? void 0 : r.key;
    if (a)
      return this._mwd.state.toggles[a] = !!i.checked, this.render(!1);
  }
  async _onSetDn(t, i) {
    t == null || t.preventDefault();
    const a = String((i == null ? void 0 : i.value) ?? "").trim(), r = a === "" ? null : Number(a);
    return this._mwd.state.payload.dn = Number.isFinite(r) ? Math.max(0, Math.trunc(r)) : null, this.render(!1);
  }
  async _onSetPayload(t, i) {
    return t == null || t.preventDefault(), this._mwd.state.payload.payloadId = String((i == null ? void 0 : i.value) ?? "").trim(), this.render(!1);
  }
  async _onSetSpecialization(t, i) {
    var n;
    t == null || t.preventDefault();
    const a = String(((n = i == null ? void 0 : i.dataset) == null ? void 0 : n.skillCode) ?? "").trim(), r = String((i == null ? void 0 : i.value) ?? "").trim();
    if (a)
      return Wn(this._mwd.state.payload, a, r), this.render(!1);
  }
  _onRender(t, i) {
    var r, n;
    (r = super._onRender) == null || r.call(this, t, i);
    const a = this.element instanceof HTMLElement ? this.element : (n = this.element) == null ? void 0 : n[0];
    a && (a.querySelectorAll("[data-action='setPayload']").forEach((o) => {
      o.addEventListener("change", (l) => {
        this._onSetPayload(l, l.currentTarget);
      });
    }), a.querySelectorAll("[data-action='setSpecialization']").forEach((o) => {
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
  static async prompt({ actor: t, basePayload: i, resolved: a, diceParts: r = null, mods: n = [], modTotal: o = 0 } = {}) {
    var h;
    const l = foundry.utils.deepClone(i ?? {});
    try {
      if (((a == null ? void 0 : a.rollType) ?? "simple") === "simple" && (l == null ? void 0 : l.dn) == null) {
        const y = Number(game.settings.get(game.system.id, "gmNextDn"));
        Number.isFinite(y) && (l.dn = Math.max(0, Math.trunc(y)));
      }
    } catch (g) {
      console.warn("MWD: failed to default DN from GM Gadget", g);
    }
    const c = {
      left: (a == null ? void 0 : a.title) ?? "Roll",
      right: (t == null ? void 0 : t.name) ?? ""
    }, u = r ?? Jp(a), d = {
      attribute: Number((u == null ? void 0 : u.attribute) ?? 0),
      skill: Number((u == null ? void 0 : u.skill) ?? 0),
      bonus: Number((u == null ? void 0 : u.bonus) ?? 0),
      specialization: Number((u == null ? void 0 : u.specialization) ?? 0),
      modifiers: Number(o ?? 0)
    }, m = (Array.isArray(n) ? n : []).map((g) => ({
      label: g.label ?? "Modifier",
      source: g.source ?? "",
      value: Number(g.value ?? 0)
    }));
    l.manualModifiers = zn(l.manualModifiers);
    const p = await new Me({
      actor: t,
      baseContext: {
        intent: (a == null ? void 0 : a.intent) ?? "skill",
        header: c,
        formula: String((a == null ? void 0 : a.formula) ?? "").trim(),
        dice: d,
        modifiers: m,
        payload: l,
        resolved: a,
        // keep full resolved for edge display
        dn: Number((l == null ? void 0 : l.dn) ?? ((h = a == null ? void 0 : a.difficulty) == null ? void 0 : h.dn) ?? 1)
      }
    }).wait();
    return (p == null ? void 0 : p.payload) ?? null;
  }
};
Ge = new WeakMap(), N(Me, "DEFAULT_OPTIONS", foundry.utils.mergeObject(
  yi(Me, Me, "DEFAULT_OPTIONS"),
  {
    id: "mwd-roll-dialog",
    classes: [
      ...yi(Me, Me, "DEFAULT_OPTIONS").classes ?? [],
      "mwd",
      "mwd-roll-dialog"
    ],
    window: { title: "Roll", resizable: !1 },
    position: { width: 520, height: "auto" },
    actions: {
      submit: Me.prototype._onSubmit,
      cancel: Me.prototype._onCancel,
      addManual: Me.prototype._onAddManual,
      removeManual: Me.prototype._onRemoveManual,
      setManualValue: Me.prototype._onSetManualValue,
      setManualStepper: Me.prototype._onSetManualStepper,
      setEdgePrePool: Me.prototype._onSetEdgePrePool,
      toggleCheckbox: Me.prototype._onToggleCheckbox,
      setDn: Me.prototype._onSetDn,
      setPayload: Me.prototype._onSetPayload,
      setSpecialization: Me.prototype._onSetSpecialization
    }
  },
  { inplace: !1 }
)), N(Me, "PARTS", {
  body: { template: "systems/mwd/templates/v2/roll/mwd-roll-dialog.hbs" }
});
let fr = Me;
const { ApplicationV2: Xp, HandlebarsApplicationMixin: Zp } = foundry.applications.api, Ji = class Ji extends Zp(Xp) {
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
      classes: [game.system.anarchy.styles.selectCssClass(), ...Ji.DEFAULT_OPTIONS.classes],
      window: { title: e }
    };
    return new Ji({ items: t }, i).wait();
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
    i.find(".click-select-item").click((a) => this.onSelectItem(a)), i.find('[data-action="cancel"]').on("click", async () => {
      if (this._resolve) {
        const a = this._resolve;
        this._resolve = null, a(null);
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
    const t = $(e.currentTarget).attr("data-item-id"), i = this.items.find((a) => a.id === t) ?? null;
    if (this._selected = !0, this._resolve) {
      const a = this._resolve;
      this._resolve = null, a(i);
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
N(Ji, "PARTS", {
  body: {
    template: `${G}/dialog/select-item.hbs`
  }
});
let hr = Ji;
function ef(s = {}) {
  var t;
  const e = Array.isArray((t = s == null ? void 0 : s.attack) == null ? void 0 : t.targets) ? s.attack.targets : [];
  if (!e.length) throw new Error("Attack requires at least one target.");
  return e;
}
function tf(s = {}, e = {}) {
  var a, r, n, o, l, c;
  const t = Math.max(0, Number(((o = (r = (a = s == null ? void 0 : s.attack) == null ? void 0 : a.weapon) == null ? void 0 : r.attackRatingBand) == null ? void 0 : o[(n = s == null ? void 0 : s.attack) == null ? void 0 : n.rangeBand]) ?? 0) || 0), i = Math.max(0, Number(((l = e == null ? void 0 : e.activeArmor) == null ? void 0 : l.defenseBonus) ?? 0) || 0);
  return {
    ar: {
      parts: [{
        id: "weapon.attackRating",
        label: `Weapon AR (${String(((c = s == null ? void 0 : s.attack) == null ? void 0 : c.rangeBand) ?? "").trim() || "range"})`,
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
function sf(s = {}, e = {}) {
  var c, u, d, m, f;
  const t = (s == null ? void 0 : s.attack) ?? {}, i = String(((u = (c = t == null ? void 0 : t.payload) == null ? void 0 : c.modifies) == null ? void 0 : u.damageType) ?? "").trim(), a = Math.max(0, Number(((d = t == null ? void 0 : t.weapon) == null ? void 0 : d.damage) ?? 0) || 0), r = pt(i || ((m = t == null ? void 0 : t.weapon) == null ? void 0 : m.damageType), "concussive"), n = Math.max(0, Number((t == null ? void 0 : t.totalAp) ?? ((f = t == null ? void 0 : t.weapon) == null ? void 0 : f.ap) ?? 0) || 0), o = e.outcome === "graze" ? a / 2 : e.outcome === "hit" ? a : 0, l = o + Number(e.netHits ?? 0);
  return {
    baseDamage: a,
    effectiveWeaponDamage: o,
    netHits: Number(e.netHits ?? 0),
    incoming: l,
    ap: n,
    damageType: r,
    damageTypeLabel: vt(r)
  };
}
async function af({ attacker: s, ctx: e, target: t, outcome: i, damage: a } = {}) {
  var l, c, u, d;
  if ((i == null ? void 0 : i.outcome) === "miss")
    return {
      ok: !0,
      skipped: !0,
      reason: "Missed target."
    };
  const r = t != null && t.tokenUuid ? await fromUuid(t.tokenUuid) : null, n = t != null && t.actorUuid ? await fromUuid(t.actorUuid) : null, o = await Ze.apply({
    actor: n,
    token: r,
    payload: {
      mode: "attackDamage",
      track: S.monitors.physical,
      damage: (a == null ? void 0 : a.effectiveWeaponDamage) ?? 0,
      netHits: (a == null ? void 0 : a.netHits) ?? 0,
      damageType: a == null ? void 0 : a.damageType,
      ap: (a == null ? void 0 : a.ap) ?? 0,
      effects: ((c = (l = e == null ? void 0 : e.attack) == null ? void 0 : l.weapon) == null ? void 0 : c.effects) ?? {},
      source: `${(s == null ? void 0 : s.name) ?? "Attacker"}: ${((d = (u = e == null ? void 0 : e.attack) == null ? void 0 : u.weapon) == null ? void 0 : d.name) ?? "Attack"}`
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
    track: o.track ?? S.monitors.physical,
    requestedDelta: Number(o.requestedDelta ?? 0),
    appliedDelta: Number(o.appliedDelta ?? 0),
    usedArmor: !!o.usedArmor,
    damageType: o.damageType ?? (a == null ? void 0 : a.damageType) ?? "",
    effectiveAp: Number(o.effectiveAp ?? (a == null ? void 0 : a.ap) ?? 0),
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
async function rf({ attacker: s, ctx: e, outcomeModel: t, target: i } = {}) {
  const a = tf(e, i), r = Number((t == null ? void 0 : t.margin) ?? 0), n = r + Math.min(a.value, r), o = r >= 1 ? n > 0 ? "hit" : "graze" : "miss", l = o === "hit" ? Math.max(0, n) : 0, c = sf(e, { outcome: o, netHits: l }), u = await af({
    attacker: s,
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
    cq: a,
    margin: r,
    rawNetHits: n,
    netHits: l,
    outcome: o,
    damage: c,
    damageResult: u
  };
}
function nf(s = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of s)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
async function of({ attacker: s, ctx: e, outcomeModel: t } = {}) {
  const i = ef(e), a = [];
  for (const r of i)
    a.push(await rf({ attacker: s, ctx: e, outcomeModel: t, target: r }));
  return {
    targetCount: i.length,
    results: a,
    summary: nf(a)
  };
}
const Hn = { execute: pf }, lf = {
  physical: ["grit", "chaos"],
  mental: ["insight", "rumor"],
  social: ["legend", "credibility"]
};
function cf(s, e) {
  var r;
  const t = lf[e] ?? [];
  let i = null, a = -1;
  for (const n of t) {
    const o = (r = s.getEdgePool) == null ? void 0 : r.call(s, n), l = Number((o == null ? void 0 : o.rating) ?? 0), c = Number((o == null ? void 0 : o.value) ?? 0), u = Math.max(0, l - c);
    u > a && (a = u, i = n);
  }
  return i ?? t[0] ?? null;
}
function uf(s) {
  const t = (Array.isArray(s == null ? void 0 : s.manualModifiers) ? s.manualModifiers : []).map((a) => ({
    id: a.id ?? foundry.utils.randomID(),
    label: (a.label ?? "Manual").trim() || "Manual",
    value: Number(a.value ?? 0),
    source: "Manual"
  })).filter((a) => Number.isFinite(a.value) && a.value !== 0), i = t.reduce((a, r) => a + r.value, 0);
  return { mods: t, total: i };
}
function Un(s = {}) {
  const e = s.toggles ?? {}, t = String((s == null ? void 0 : s.payloadId) ?? (s == null ? void 0 : s.ammoTypeId) ?? "").trim();
  return {
    ...s,
    ...t ? { payloadId: t } : {},
    toggles: {
      useEdge: !!e.useEdge,
      takeRisks: !!e.takeRisks,
      opponentRoll: !!e.opponentRoll
    },
    manualModifiers: mf(s.manualModifiers)
  };
}
async function df({ actor: s, payload: e } = {}) {
  var r, n, o, l, c, u, d, m, f, p, h, g;
  if ((e == null ? void 0 : e.intent) !== "attack") return e;
  const t = foundry.utils.deepClone(e ?? {}), i = ((r = s.getPersonalCombatLoadout) == null ? void 0 : r.call(s, { refresh: !0 })) ?? null, a = (y) => {
    var A, w, E, I, D;
    const b = ((w = (A = s.items) == null ? void 0 : A.get) == null ? void 0 : w.call(A, y)) ?? null;
    return !b || !(((E = b.isPersonalWeapon) == null ? void 0 : E.call(b)) ?? b.type === S.itemType.personalWeapon) || !((I = b.system) != null && I.equipped) ? null : ((D = b.getCombatProfile) == null ? void 0 : D.call(b, { payloadId: t == null ? void 0 : t.payloadId })) ?? null;
  };
  if (t.weaponId) {
    const y = a(t.weaponId);
    if (!y)
      throw new Error("Attack requires an owned equipped personal weapon.");
    return t.rangeBand = t.rangeBand ?? y.defaultRangeBand ?? "close", t.payloadId = t.payloadId ?? ((n = y == null ? void 0 : y.payloadState) == null ? void 0 : n.activePayloadId) ?? "", t;
  }
  if (t.mode === "auto") {
    if (i != null && i.weaponChoiceRequired) {
      const y = await hr.selectItem(
        "Choose Weapon",
        i.equippedWeapons ?? []
      );
      return y ? (t.weaponId = y.id, t.rangeBand = t.rangeBand ?? y.defaultRangeBand ?? "close", t.payloadId = t.payloadId ?? ((o = y == null ? void 0 : y.payloadState) == null ? void 0 : o.activePayloadId) ?? "", delete t.mode, t) : null;
    }
    if ((l = i == null ? void 0 : i.defaultWeapon) != null && l.isSynthetic || ((c = i == null ? void 0 : i.defaultWeapon) == null ? void 0 : c.id) === "unarmed")
      return t.syntheticWeapon = foundry.utils.deepClone(i.defaultWeapon ?? st.DEFAULT_UNARMED), t.weaponId = t.syntheticWeapon.id, t.rangeBand = t.rangeBand ?? "close", t.payloadId = t.payloadId ?? ((d = (u = t.syntheticWeapon) == null ? void 0 : u.payloadState) == null ? void 0 : d.activePayloadId) ?? "", delete t.mode, t;
    if ((m = i == null ? void 0 : i.defaultWeapon) != null && m.id)
      return t.weaponId = i.defaultWeapon.id, t.rangeBand = t.rangeBand ?? i.defaultWeapon.defaultRangeBand ?? "close", t.payloadId = t.payloadId ?? ((p = (f = i.defaultWeapon) == null ? void 0 : f.payloadState) == null ? void 0 : p.activePayloadId) ?? "", delete t.mode, t;
  }
  if (t.fallback === "unarmed")
    return t.syntheticWeapon = foundry.utils.deepClone(st.DEFAULT_UNARMED), t.weaponId = t.syntheticWeapon.id, t.rangeBand = t.rangeBand ?? "close", t.payloadId = t.payloadId ?? ((g = (h = t.syntheticWeapon) == null ? void 0 : h.payloadState) == null ? void 0 : g.activePayloadId) ?? "", delete t.mode, t;
  throw new Error("Attack could not resolve a usable weapon.");
}
function mf(s) {
  return Array.isArray(s) ? s.map((e) => ({
    id: (e == null ? void 0 : e.id) ?? foundry.utils.randomID(),
    label: typeof (e == null ? void 0 : e.label) == "string" ? e.label : "Manual",
    value: Number((e == null ? void 0 : e.value) ?? 0)
  })) : [];
}
async function pf({ actor: s, payload: e, event: t } = {}) {
  var K, O, R, U, B, te, he, ge, Ce, De, Ye, Mt, Et, Ct, Pt, Nt, Rt, Dt, It, Ot, _t, Lt, $t, xt, nt, Bt, Ft, zt, v, P, j, re, ue, fe, we, H, J, Ie, Oe, _e, He;
  if (s != null && s.actor && (s = s.actor), (K = s == null ? void 0 : s.document) != null && K.actor && (s = s.document.actor), !s) throw new Error("MWD.roll.execute requires actor");
  if (!(e != null && e.intent)) throw new Error("MWD.roll.execute requires payload.intent");
  if (e = Un(e), e = await df({ actor: s, payload: e }), !e) return null;
  let i = await ka({ actor: s, payload: e, event: t }), a = await $n({
    actor: s,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const r = await fr.prompt({
    actor: s,
    basePayload: e,
    resolved: i,
    diceParts: {
      attribute: ((O = i == null ? void 0 : i.pool) == null ? void 0 : O.attribute) ?? 0,
      skill: ((R = i == null ? void 0 : i.pool) == null ? void 0 : R.skill) ?? 0,
      bonus: ((U = i == null ? void 0 : i.pool) == null ? void 0 : U.bonus) ?? 0,
      specialization: ((B = i == null ? void 0 : i.pool) == null ? void 0 : B.specialization) ?? 0
    },
    mods: a.mods,
    modTotal: a.total,
    options: {
      allowEdge: e.intent !== "initiative"
    }
  });
  if (!r) return null;
  if (e = Un(r), i = await ka({ actor: s, payload: e, event: t }), e.intent === "attack" && !((he = (te = i == null ? void 0 : i.attack) == null ? void 0 : te.capabilityReport) != null && he.isTemplated) && (delete e.targetSnapshots, delete e.templatePlacement), e.intent === "attack" && e.weaponId) {
    const x = ((Ce = (ge = s.items) == null ? void 0 : ge.get) == null ? void 0 : Ce.call(ge, e.weaponId)) ?? null;
    if ((De = x == null ? void 0 : x.isPersonalWeapon) != null && De.call(x)) {
      const oe = String(e.payloadId ?? "").trim(), gt = String(((Ye = x.system) == null ? void 0 : Ye.selectedPayloadId) ?? "").trim();
      if (oe && oe !== gt && await ((Mt = x.setActivePayload) == null ? void 0 : Mt.call(x, oe)), !((Et = x.canConsumePayload) != null && Et.call(x, { payloadId: oe }))) {
        const Be = (Ct = x.getPayloadState) == null ? void 0 : Ct.call(x, { payloadId: oe }), Qe = Be != null && Be.payloadLabel ? ` (${Be.payloadLabel})` : "";
        return (Pt = ui.notifications) == null || Pt.warn(`Not enough payload${Qe} for ${x.name}.`), null;
      }
    }
  }
  if (e.intent === "attack" && ((Rt = (Nt = i == null ? void 0 : i.attack) == null ? void 0 : Nt.capabilityReport) != null && Rt.isTemplated)) {
    const x = await hp({
      actor: s,
      attack: i.attack
    });
    if (!x) return null;
    if (!Array.isArray(x.targetSnapshots) || x.targetSnapshots.length === 0)
      return (Dt = ui.notifications) == null || Dt.warn("Template placement did not affect any targets."), null;
    e.targetSnapshots = x.targetSnapshots, e.templatePlacement = x.placement, i = await ka({ actor: s, payload: e, event: t });
  }
  a = await $n({
    actor: s,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const { mods: n, total: o } = a, { mods: l, total: c } = uf(e);
  let u = [...n, ...l], d = Number(o ?? 0) + Number(c ?? 0);
  const m = Number(((It = i == null ? void 0 : i.pool) == null ? void 0 : It.attribute) ?? 0) + Number(((Ot = i == null ? void 0 : i.pool) == null ? void 0 : Ot.skill) ?? 0) + Number(((_t = i == null ? void 0 : i.pool) == null ? void 0 : _t.bonus) ?? 0) + Number(((Lt = i == null ? void 0 : i.pool) == null ? void 0 : Lt.specialization) ?? 0), f = Math.max(0, m + Number(d ?? 0)), p = e.intent !== "initiative", h = p ? ff({ actor: s, ctx: i, payload: e }) : null, g = ($t = h == null ? void 0 : h.pre) != null && $t.spent ? 4 : Number(i.diceTarget ?? i.target ?? 5), y = {
    snapshot: ((Bt = (nt = (xt = game.mwd) == null ? void 0 : xt.personalCombat) == null ? void 0 : nt.getSnapshot) == null ? void 0 : Bt.call(nt, s)) ?? null
  }, b = it({
    actor: s,
    phase: "onBuildRoll",
    facts: Rr({ actor: s, resolved: i, payload: e, runtime: y }),
    packet: {},
    options: { runtime: y, consumeUsage: !0 }
  });
  await Xt({ actor: s, mutations: b.mutations, runtime: y }), p && ((Ft = h == null ? void 0 : h.pre) != null && Ft.spent) && ((zt = h == null ? void 0 : h.pre) != null && zt.poolKey) && await ((v = s.spendEdge) == null ? void 0 : v.call(s, h.pre.poolKey, 1));
  let A, w = 0, E = 0;
  if (i.rollType === "sum" && ((P = i.sum) != null && P.formula))
    A = await new Roll(i.sum.formula, i.sum.data ?? {}).evaluate({ async: !0 }), w = Number(A.total ?? 0) + Number(d ?? 0);
  else {
    A = await new Roll(`${f}d6cs>=${g}`).evaluate({ async: !0 });
    const x = (j = A.dice) == null ? void 0 : j[0];
    w = Array.isArray(x == null ? void 0 : x.results) ? x.results.filter((oe) => oe.success).length : 0, E = Array.isArray(x == null ? void 0 : x.results) ? x.results.filter((oe) => oe.result === 1).length : 0;
  }
  if (i.intent === "initiative" && (A == null ? void 0 : A.total) != null) {
    const x = { total: Number(A.total ?? 0) + Number(d ?? 0) }, oe = it({
      actor: s,
      phase: "onInitiativeResolved",
      facts: Lo({ actor: s, packet: x, runtime: y }),
      packet: x,
      options: { runtime: y, consumeUsage: !0 }
    });
    if (await Xt({ actor: s, mutations: oe.mutations, runtime: y }), oe.modifiers.length) {
      const gt = oe.modifiers.reduce((Be, Qe) => Be + Number(Qe.value ?? 0), 0);
      u = u.concat(oe.modifiers), d += gt, w = Number(oe.packet.total ?? 0), await jn({ actor: s, total: oe.packet.total ?? A.total }), i.breakdown = (i.breakdown ?? []).concat(oe.modifiers.map((Be, Qe) => ({
        id: `traitInitiative${Qe + 1}`,
        label: Be.label,
        value: Number(Be.value ?? 0)
      })));
    } else
      w = Number(x.total ?? 0), await jn({ actor: s, total: x.total });
  }
  const I = qp(
    i,
    { successes: w, raw: (re = A == null ? void 0 : A.toJSON) == null ? void 0 : re.call(A) },
    null
    // opposed rolls can pass defender result later
  ), D = I == null ? void 0 : I.edgeEarned;
  if ((D == null ? void 0 : D.amount) > 0) {
    const x = (ue = i == null ? void 0 : i.domains) != null && ue.includes("physical") ? "physical" : (fe = i == null ? void 0 : i.domains) != null && fe.includes("mental") ? "mental" : (we = i == null ? void 0 : i.domains) != null && we.includes("social") ? "social" : null, oe = cf(s, x);
    await ((H = s.gainEdge) == null ? void 0 : H.call(s, oe, D.amount)), I.edgeEarned.pool = oe;
  }
  i.intent === "overload" && await yf({ actor: s, passed: I.passed });
  let L = null;
  i.intent === "attack" && (L = await of({
    attacker: s,
    ctx: i,
    outcomeModel: I
  }));
  const V = Pp({
    actor: s,
    payload: e,
    ctx: i,
    roll: A,
    target: g,
    pool: f,
    mods: u,
    modTotal: d,
    hits: w,
    ones: E,
    edge: h,
    outcomeModel: I
  });
  L && (V.attackResult = L, V.damageResult = L.damageResult);
  const Y = await Al({ resolved: V });
  if (e.intent === "attack" && e.weaponId) {
    const x = ((Ie = (J = s.items) == null ? void 0 : J.get) == null ? void 0 : Ie.call(J, e.weaponId)) ?? null;
    (Oe = x == null ? void 0 : x.isPersonalWeapon) != null && Oe.call(x) && (await ((_e = x.consumePayload) == null ? void 0 : _e.call(x, { payloadId: e.payloadId })) || (He = ui.notifications) == null || He.warn(`Payload could not be consumed for ${x.name}.`));
  }
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: s }),
    content: Y,
    flags: {
      mwd: {
        payload: e,
        resolved: V
      }
    }
  });
}
function ff({ actor: s, ctx: e, payload: t }) {
  var p, h, g, y, b, A, w;
  const i = hf(e == null ? void 0 : e.domains), a = gf[i] ?? null, r = (a == null ? void 0 : a.a) ?? null, n = (a == null ? void 0 : a.b) ?? null, o = [r, n].filter(Boolean), l = !!((p = t == null ? void 0 : t.toggles) != null && p.useEdge) || !!(t != null && t.useEdge);
  let c = String(((g = (h = t == null ? void 0 : t.edge) == null ? void 0 : h.pre) == null ? void 0 : g.poolKey) ?? "").trim() || null;
  c && !o.includes(c) && (c = null);
  const u = l && c ? 1 : 0;
  let d = [...o];
  u && c && (d = d.filter((E) => E !== c));
  let m = String(((b = (y = t == null ? void 0 : t.edge) == null ? void 0 : y.post) == null ? void 0 : b.poolKey) ?? "").trim() || null;
  m && !d.includes(m) && (m = null);
  const f = Number(((w = (A = t == null ? void 0 : t.edge) == null ? void 0 : A.post) == null ? void 0 : w.spent) ?? 0) ? 1 : 0;
  return {
    domain: i,
    pools: a ? { a: r, b: n } : null,
    pre: { poolKey: c, spent: u },
    post: { poolKey: m, spent: f },
    allowed: { prePools: o, postPools: d }
  };
}
function hf(s) {
  return Array.isArray(s) ? s.includes("physical") ? "physical" : s.includes("mental") ? "mental" : s.includes("social") ? "social" : null : null;
}
const gf = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};
async function jn({ actor: s, total: e }) {
  var o, l, c, u, d;
  const t = (l = (o = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : o.controlled) == null ? void 0 : l.find((m) => {
    var f;
    return ((f = m.actor) == null ? void 0 : f.id) === s.id;
  }), i = ((u = (c = s.getActiveTokens) == null ? void 0 : c.call(s, !0, !0)) == null ? void 0 : u[0]) ?? null, a = t ?? i;
  if (!a) {
    (d = ui.notifications) == null || d.warn("Initiative requires a token on the current scene.");
    return;
  }
  let r = game.combat;
  r || (r = await Combat.create({
    scene: canvas.scene.id,
    active: !0
  }));
  let n = r.combatants.find((m) => m.tokenId === a.id);
  if (!n) {
    const m = await r.createEmbeddedDocuments("Combatant", [{
      tokenId: a.id,
      actorId: s.id,
      sceneId: canvas.scene.id
    }]);
    n = m == null ? void 0 : m[0];
  }
  n && await n.update({ initiative: Number(e) });
}
async function yf({ actor: s, passed: e }) {
  e || await s.update({ "system.burn.overloaded": !0 });
}
const bf = /* @__PURE__ */ new Set(["physical", "mental", "social"]);
function Sf(s) {
  if (s == null || s === "" || s === "—" || s === "–") return 0;
  const e = Number(s);
  return Number.isFinite(e) ? e : null;
}
function Af(s) {
  if (!s) return;
  const e = String(s).trim().toLowerCase();
  return bf.has(e) ? e : void 0;
}
class wf {
  constructor() {
    N(this, "id", "mwd.itemModifiers");
    N(this, "label", "Item Modifiers");
  }
  collect(e) {
    var a, r;
    const t = e == null ? void 0 : e.actor;
    if (!t) return [];
    const i = [];
    for (const n of t.items) {
      const o = (r = (a = n.flags) == null ? void 0 : a.mwd) == null ? void 0 : r.modifiers;
      if (!(!Array.isArray(o) || o.length === 0))
        for (const l of o) {
          if (!l) continue;
          const c = Sf(l.value);
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
            domain: Af(l.domain)
          });
        }
    }
    return i;
  }
}
const Ea = {
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
class Tf {
  constructor() {
    N(this, "id", "mwd.statusEffects");
    N(this, "label", "Status Effects");
  }
  collect({ actor: e } = {}) {
    var a;
    const t = e == null ? void 0 : e.statuses;
    if (!e || !t) return [];
    const i = [];
    for (const r of t) {
      const n = Ea == null ? void 0 : Ea[r];
      if ((a = n == null ? void 0 : n.mods) != null && a.length)
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
class kf {
  constructor() {
    N(this, "id", "mwd.baseRollModifiers");
    N(this, "label", "Roll (Base)");
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
    const a = ((o = e == null ? void 0 : e.dialog) == null ? void 0 : o.otherMods) ?? ((l = e == null ? void 0 : e.modifiers) == null ? void 0 : l.otherMods) ?? (e == null ? void 0 : e.otherMods) ?? 0, r = Number(a);
    return Number.isFinite(r) && r !== 0 && t.push({
      id: "otherMods",
      label: "Other modifiers",
      value: r,
      source: "Roll"
    }), t;
  }
}
class vf {
  constructor() {
    N(this, "id", "mwd.condition");
    N(this, "label", "Condition");
  }
  collect({ actor: e, rollType: t } = {}) {
    var o, l, c, u, d, m, f, p;
    if (!e) return [];
    if (t === "edge") return [];
    const i = ((o = e.system) == null ? void 0 : o.derived) ?? {}, a = Number(
      ((l = i == null ? void 0 : i.condition) == null ? void 0 : l.physicalPenalty) ?? ((u = (c = i == null ? void 0 : i.monitors) == null ? void 0 : c.physical) == null ? void 0 : u.penalty) ?? 0
    ), r = Number(
      ((d = i == null ? void 0 : i.condition) == null ? void 0 : d.fatiguePenalty) ?? ((f = (m = i == null ? void 0 : i.monitors) == null ? void 0 : m.fatigue) == null ? void 0 : f.penalty) ?? 0
    ), n = [];
    return Number.isFinite(a) && a !== 0 && n.push({
      id: "conditionPhysical",
      label: "Physical Penalty",
      value: a,
      source: "Physical Track"
      // domain: "physical" // optional; leave unset to apply to all domains
    }), Number.isFinite(r) && r !== 0 && n.push({
      id: "conditionFatigue",
      label: "Fatigue Penalty",
      value: r,
      source: "Fatigue Track"
      // domain: "physical" // optional
    }), console.log("MWD|condition derived snapshot", e.name, foundry.utils.deepClone((p = e.system) == null ? void 0 : p.derived)), n;
  }
}
const Mf = {
  id: "burn",
  async collect(s) {
    var a, r;
    const e = s.actor;
    if (!e) return [];
    const t = Number(((r = (a = e.system) == null ? void 0 : a.burn) == null ? void 0 : r.value) ?? 0), i = Math.floor(t / 2);
    return i <= 0 ? [] : [{
      id: "burn",
      label: "Burn",
      value: -i,
      source: "Burn Track",
      domain: null
    }];
  }
};
class Ef {
  constructor() {
    N(this, "id", "mwd.lifeModules");
    N(this, "label", "Life Modules");
  }
  collect({ actor: e, resolved: t } = {}) {
    return Ju({ actor: e, resolved: t });
  }
}
class Cf {
  constructor() {
    N(this, "id", "mwd.traits");
    N(this, "label", "Traits");
  }
  collect({ actor: e, resolved: t, payload: i } = {}) {
    var r, n, o;
    if (!e) return [];
    const a = {
      snapshot: ((o = (n = (r = game.mwd) == null ? void 0 : r.personalCombat) == null ? void 0 : n.getSnapshot) == null ? void 0 : o.call(n, e)) ?? null
    };
    return it({
      actor: e,
      phase: "onBuildRoll",
      facts: Rr({ actor: e, resolved: t, payload: i, runtime: a }),
      packet: {},
      options: { runtime: a, consumeUsage: !1 }
    }).modifiers;
  }
}
function Pf() {
  Hooks.on("renderChatMessageHTML", (s, e) => {
    e.addEventListener("click", (t) => {
      const i = t.target.closest("[data-mwd-action]");
      if (!i) return;
      const a = String(i.dataset.mwdAction || "").trim();
      a && a === "edgePostReroll" && Nf(t, s);
    });
  });
}
async function Nf(s, e) {
  var p, h, g, y, b, A, w, E, I, D, L, V, Y, K, O, R, U;
  s.preventDefault();
  const t = s.target.closest("[data-mwd-action='edgePostReroll']"), i = String(((p = t == null ? void 0 : t.dataset) == null ? void 0 : p.poolKey) ?? "").trim();
  if (!i) return;
  const a = foundry.utils.deepClone((g = (h = e == null ? void 0 : e.flags) == null ? void 0 : h.mwd) == null ? void 0 : g.resolved);
  if (!a || Number(((b = (y = a == null ? void 0 : a.edge) == null ? void 0 : y.post) == null ? void 0 : b.spent) ?? 0) === 1) return;
  if (!(Array.isArray((w = (A = a == null ? void 0 : a.edge) == null ? void 0 : A.allowed) == null ? void 0 : w.postPools) ? a.edge.allowed.postPools : []).includes(i)) {
    (I = (E = ui.notifications) == null ? void 0 : E.warn) == null || I.call(E, `Post-spend pool not allowed: ${i}`);
    return;
  }
  const n = Array.isArray((D = a == null ? void 0 : a.roll) == null ? void 0 : D.failureDiceRefs) ? a.roll.failureDiceRefs : [];
  if (n.length <= 0) {
    (V = (L = ui.notifications) == null ? void 0 : L.info) == null || V.call(L, "No failures to reroll.");
    return;
  }
  const o = await fromUuid(a.actorUuid);
  if (!o) {
    (K = (Y = ui.notifications) == null ? void 0 : Y.warn) == null || K.call(Y, "Actor not found for this roll.");
    return;
  }
  await ((O = o.spendEdge) == null ? void 0 : O.call(o, i, 1));
  const l = Number(((R = a == null ? void 0 : a.roll) == null ? void 0 : R.target) ?? 5), u = (U = (await new Roll(`${n.length}d6cs>=${l}`).evaluate()).dice) == null ? void 0 : U[0], d = Array.isArray(u == null ? void 0 : u.results) ? u.results : [], m = d.filter((B) => B.success).length;
  a.outcome = a.outcome ?? {}, a.outcome.hits = Number(a.outcome.hits ?? 0) + m, a.edge = a.edge ?? {}, a.edge.post = { poolKey: i, spent: 1 }, a.edge.availableActions = {
    ...a.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, a.roll = a.roll ?? {}, a.roll.diceGroups = Array.isArray(a.roll.diceGroups) ? a.roll.diceGroups : [], a.roll.diceGroups.push({
    id: "post",
    label: "Post Reroll",
    faces: 6,
    termIndex: null,
    dice: d.map((B, te) => {
      const he = Number(B.result), ge = !!B.success;
      return {
        ref: `post:${te}`,
        face: he,
        isSuccess: ge,
        isFailure: !ge,
        tooltip: ge ? `Post die ${te + 1}: ${he} (Success vs TN ${l})` : `Post die ${te + 1}: ${he} (Failure vs TN ${l})`
      };
    })
  });
  const f = await Al({ resolved: a });
  await e.update({
    content: f,
    "flags.mwd.resolved": a,
    "flags.mwd.payload.edge.post": { poolKey: i, spent: 1 }
  });
}
function Rf() {
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
function Df() {
  return {
    get(s) {
      return at(s);
    },
    getSkills({ withKnowledge: s = !1 } = {}) {
      return Ls();
    },
    list() {
      return Ls();
    }
  };
}
function If() {
  return {
    get(s) {
      return Qt(s);
    },
    list() {
      return Xs();
    },
    listByType(s) {
      return Or(s);
    },
    getTypeLabel(s) {
      return Li(s);
    },
    evaluate(s) {
      return Jt(s);
    }
  };
}
function Of() {
  return {
    normalizeQualitySystem(s) {
      return tt(s);
    },
    getEditorConfig() {
      return Do();
    },
    evaluatePhase(s) {
      return it(s);
    },
    applyMutations(s) {
      return Xt(s);
    },
    buildRollFacts(s) {
      return Rr(s);
    },
    buildActionCostFacts(s) {
      return _o(s);
    },
    buildBurnFacts(s) {
      return Fa(s);
    },
    buildInitiativeFacts(s) {
      return Lo(s);
    },
    buildDamageFacts(s) {
      return $o(s);
    },
    buildEdgeFacts(s) {
      return za(s);
    },
    buildEndOfActivationFacts(s) {
      return xo(s);
    }
  };
}
class Fr {
  static start() {
    const e = new Fr();
    Hooks.once("init", () => e.onInit()), Hooks.once("ready", () => e.onReady());
  }
  async onInit() {
    console.log(ce + "AnarchySystem.onInit"), game.system.mwd = this, game.system.anarchy = this, game.mwd ?? (game.mwd = {}), Rf(), Pf(), Zd("mwd"), game.mwd.roll = Hn, game.mwd.personalCombat = ne, game.mwd.harm = Ze, this.roll = Hn, this.personalCombat = ne, this.harm = Ze, this.skills = Df(), this.lifeModules = If(), this.traits = Of(), this.remoteCall = new _a(), game.system.mwd.skills = this.skills, game.system.mwd.lifeModules = this.lifeModules, game.system.mwd.traits = this.traits, game.mwd.skills = this.skills, game.mwd.lifeModules = this.lifeModules, game.mwd.traits = this.traits, se.init(), this.modifiers = new Z(), bt.register(new wf()), bt.register(new Tf()), bt.register(new kf()), bt.register(new vf()), bt.register(Mf), bt.register(new Ef()), bt.register(new Cf()), bt.register(new Nd()), Handlebars.registerHelper("mwdClassList", (e) => Array.isArray(e) ? e.join(" ") : typeof e == "string" ? e : ""), this.actorClasses = {
      character: yn,
      npc: yn,
      vehicle: Xo,
      battlemech: Ed
    }, this.hooks = new ci(), this.styles = new md(), this.handlebarsManager = new _r(), ne.init(), Tm.register(), console.log(ce + "AnarchySystem.onInit | loading system"), CONFIG.ANARCHY = ye, CONFIG.Combat.initiative = { formula: "2d6" }, CONFIG.statusEffects.push({
      id: "overloaded",
      name: "Overloaded",
      icon: "systems/mwd/img/icons/status/surge.svg"
    }), CONFIG.Actor.documentClass = Qm, CONFIG.Item.documentClass = $i, $i.init(), _m(), Hm(), await Gm(), console.log(ce + "AnarchySystem.onInit | done");
  }
  async onReady() {
    if (console.log(ce + "AnarchySystem.onReady"), await ne.onReady(), !game.user.isGM) return;
    await Gu();
    const e = game.settings.get(T, "enableGMGadget");
    if (!e) {
      console.log(`${ce}GMManager render skipped (enableGMGadget=false)`);
      return;
    }
    game.mwd = game.mwd ?? {}, game.mwd.gmGadget = () => em({ systemId: T }).render({ force: !0 }), e && game.mwd.gmGadget();
  }
}
Fr.start();
//# sourceMappingURL=index.mjs.map
