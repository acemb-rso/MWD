var Rl = Object.defineProperty;
var Dl = Object.getPrototypeOf;
var Il = Reflect.get;
var Vn = (s) => {
  throw TypeError(s);
};
var Ol = (s, e, t) => e in s ? Rl(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var R = (s, e, t) => Ol(s, typeof e != "symbol" ? e + "" : e, t), ca = (s, e, t) => e.has(s) || Vn("Cannot " + t);
var z = (s, e, t) => (ca(s, e, "read from private field"), t ? t.call(s) : e.get(s)), Te = (s, e, t) => e.has(s) ? Vn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(s) : e.set(s, t), De = (s, e, t, i) => (ca(s, e, "write to private field"), i ? i.call(s, t) : e.set(s, t), t), v = (s, e, t) => (ca(s, e, "access private method"), t);
var bi = (s, e, t) => Il(Dl(s), t, e);
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
}, k = we, T = "mwd", _l = "MechWarrior: Destiny", Da = `system.${T}`, Ll = T, ls = `systems/${T}`, Qr = `${ls}/style`, Hi = `${ls}/third-party/style`, q = `systems/${T}/templates`, Gs = `${ls}/img/icons`, se = `${Gs}/skills`, fe = "MWD | ", $l = 2, xl = 5, Bl = 4, Jr = 8, jt = {
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
}, Ia = {
  autopilot: "autopilot",
  firewall: "firewall",
  knowledge: "knowledge"
}, Ve = {
  grit: "grit",
  chaos: "chaos",
  insight: "insight",
  rumor: "rumor",
  legend: "legend",
  credibility: "credibility"
}, wn = {
  physical: [Ve.grit, Ve.chaos],
  mental: [Ve.insight, Ve.rumor],
  social: [Ve.legend, Ve.credibility]
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
  actorAttributes: jt,
  itemAttributes: Ia,
  attributes: { ...jt, ...Ia },
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
    edgePools: Ve,
    edgePoolGroups: wn,
    physical: {
      grit: Ve.grit,
      chaos: Ve.chaos
    },
    mental: {
      insight: Ve.insight,
      rumor: Ve.rumor
    },
    social: {
      legend: Ve.legend,
      credibility: Ve.credibility
    },
    chaos: Ve.chaos
  },
  area: {
    none: "none",
    shotgun: "shotgun",
    circle: "circle",
    cone: "cone",
    rect: "rect",
    ray: "ray"
  }
}, Fl = Object.freeze({
  physical: "physical",
  mental: "mental",
  social: "social"
});
Object.freeze(Object.values(Fl));
const _i = {
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
}, ua = {
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
}, ze = {
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
  SYSTEM_DESCRIPTION: _l,
  SYSTEM_SOCKET: Da,
  SYSTEM_SCOPE: Ll,
  SYSTEM_PATH: ls,
  STYLE_PATH: Qr,
  THIRD_PARTY_STYLE_PATH: Hi,
  TEMPLATES_PATH: q,
  ICONS_PATH: Gs,
  ICONS_SKILLS_PATH: se,
  LOG_HEAD: fe,
  SPECIALIZATION_BONUS: $l,
  TARGET_SUCCESS: xl,
  TARGET_SUCCESS_EDGE: Bl,
  BASE_MONITOR: Jr,
  ACTOR_ATTRIBUTES: jt,
  ITEM_ATTRIBUTES: Ia,
  EDGE_POOL_GROUPS: wn,
  TEMPLATE: A,
  ANARCHY_SYSTEM: ze
};
const mt = class mt {
  static ascending(e = (t) => t) {
    return (t, i) => mt.sortingBy(e(t), e(i));
  }
  static descending(e = (t) => t) {
    return (t, i) => mt.sortingBy(e(i), e(t));
  }
  static sortingBy(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
  }
  static bySortedArray(e) {
    return (t) => e.indexOf(t);
  }
  static ascendingBySortedArray(e) {
    return mt.ascending(mt.bySortedArray(e));
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
    return e.map(t).filter((i) => i != null).reduce(mt.sum(), 0);
  }
  static divint(e, t) {
    return Math.floor(e / t);
  }
  static divup(e, t) {
    return Math.ceil(e / t);
  }
  static join(e, t = "") {
    return e.reduce(mt.joiner(t));
  }
  static joiner(e = "") {
    return (t, i) => t + e + i;
  }
  static classify(e, t = (i) => i.type) {
    let i = {};
    return mt.classifyInto(i, e, t), i;
  }
  static classifyFirst(e, t) {
    let i = {};
    for (const a of e) {
      const n = t(a);
      i[n] || (i[n] = a);
    }
    return i;
  }
  static classifyInto(e, t, i = (a) => a.type) {
    for (const a of t) {
      const n = i(a);
      let r = e[n];
      r || (r = [], e[n] = r), r.push(a);
    }
  }
  static showControlWhen(e, t) {
    t ? e.show() : e.hide();
  }
  static minmax(e, t, i) {
    return Math.max(t, Math.min(e, i));
  }
};
R(mt, "isString", (e) => typeof e == "string" || e instanceof String);
let Z = mt;
const zl = {
  keyword: "keywords",
  disposition: "dispositions",
  cue: "cues"
}, C = class C {
  /**
   * Initialize enum caches.
   * Call once during system init/setup after config/constants are available.
   */
  static init() {
    var t, i, a, n, r, o, l, c, u, d, m, p;
    C.hbsAttributes = C.mapObjectToKeyValue(k.attributes).filter((f) => f.value !== "knowledge" && f.value !== "noAttribute"), C.hbsItemTypes = C.mapObjectToKeyValue(k.itemType), C.hbsMonitors = C.mapObjectToKeyValue(k.monitor), C.hbsMonitorLetters = C.mapObjectToKeyValue(k.monitorLetter), C.hbsAssetModuleCategories = C.mapObjectToKeyValue(k.assetModuleCategory), (i = (t = k.item) == null ? void 0 : t.lifeModule) != null && i.type ? C.hbsLifeModuleTypes = C.mapObjectToKeyValue(k.item.lifeModule.type) : (console.warn("MWD | MWD.item.lifeModule.type is missing; life module enums disabled."), C.hbsLifeModuleTypes = []), C.hbsAreas = C.mapObjectToKeyValue(k.area), C.hbsRanges = C.mapObjectToKeyValue(k.range), C.hbsVehicleCategories = C.mapObjectToKeyValue(k.vehicleCategory), C.hbsMwdWeightClasses = C.mapObjectToKeyValue((a = k.mwd) == null ? void 0 : a.weightClass), C.hbsMwdHardpointTypes = C.mapObjectToKeyValue((n = k.mwd) == null ? void 0 : n.hardpointType), C.hbsMwdHardpointSizes = C.mapObjectToKeyValue((r = k.mwd) == null ? void 0 : r.hardpointSize), C.hbsMwdHardpointLocations = C.mapObjectToKeyValue((o = k.mwd) == null ? void 0 : o.hardpointLocation), C.hbsMwdPrimaryModes = C.mapObjectToKeyValue((l = k.mwd) == null ? void 0 : l.primarySlotMode), C.hbsMwdWeaponCategories = C.mapObjectToKeyValue((c = k.mwd) == null ? void 0 : c.weaponCategory), C.hbsMwdWeaponDamageTypes = C.mapObjectToKeyValue((u = k.mwd) == null ? void 0 : u.weaponDamageType), C.hbsPersonalWeaponDamageTypes = C.mapObjectToKeyValue((d = k.mwd) == null ? void 0 : d.personalDamageType), C.hbsPersonalWeaponDamageCategories = C.mapObjectToKeyValue((m = k.mwd) == null ? void 0 : m.personalDamageCategory), C.hbsMwdMeleeLocations = C.mapObjectToKeyValue((p = k.mwd) == null ? void 0 : p.meleeLocation), C.hbsDamageTypes = Z.distinct(
      (C.hbsMwdWeaponDamageTypes ?? []).concat(C.hbsPersonalWeaponDamageTypes ?? []),
      (f) => f.value
    );
    const e = Object.values(_i).flat();
    C.sortedAttributeKeys = Z.distinct(
      e.concat(Object.keys(k.attributes ?? {}))
    ), C.registerHandleBarHelpers(), C.ENUMS = C.getEnums();
  }
  static registerHandleBarHelpers() {
    typeof Handlebars > "u" || Handlebars.registerHelper("sortedAttributes", (e) => {
      if (!e || typeof e != "object") return [];
      const t = Object.keys(e), i = C.sortedAttributeKeys ?? [], a = new Map(i.map((n, r) => [n, r]));
      return t.sort((n, r) => {
        const o = a.has(n) ? a.get(n) : 9999, l = a.has(r) ? a.get(r) : 9999;
        return o !== l ? o - l : String(n).localeCompare(String(r));
      }), t.map((n) => {
        const r = e[n];
        return r && typeof r == "object" ? { key: n, ...r } : { key: n, value: r };
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
    return zl;
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
    var a, n, r, o, l;
    const t = ((n = (a = game == null ? void 0 : game.system) == null ? void 0 : a.mwd) == null ? void 0 : n.skills) ?? ((o = (r = game == null ? void 0 : game.system) == null ? void 0 : r.anarchy) == null ? void 0 : o.skills);
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
      const n = e[a];
      let r;
      return n && typeof n == "object" ? r = n.label ?? n.name ?? n.value ?? String(a) : n != null ? r = String(n) : r = String(a), {
        [t]: a,
        [i]: r
      };
    });
  }
  // Backwards-compat alias (the legacy file misspelled this)
  static mapObjetToKeyValue(e, t = "value", i = "label") {
    return C.mapObjectToKeyValue(e, t, i);
  }
};
R(C, "ENUMS"), // HBS-friendly arrays of { value, label } (or key/value depending on caller)
R(C, "hbsAttributes"), R(C, "hbsItemTypes"), R(C, "hbsMonitors"), R(C, "hbsMonitorLetters"), R(C, "hbsAssetModuleCategories"), R(C, "hbsLifeModuleTypes"), R(C, "hbsAreas"), R(C, "hbsRanges"), R(C, "hbsVehicleCategories"), // MWD-specific enum groups
R(C, "hbsMwdWeightClasses"), R(C, "hbsMwdHardpointTypes"), R(C, "hbsMwdHardpointSizes"), R(C, "hbsMwdHardpointLocations"), R(C, "hbsMwdPrimaryModes"), R(C, "hbsMwdWeaponCategories"), R(C, "hbsMwdWeaponDamageTypes"), R(C, "hbsPersonalWeaponDamageTypes"), R(C, "hbsPersonalWeaponDamageCategories"), R(C, "hbsDamageTypes"), R(C, "hbsMwdMeleeLocations"), R(C, "sortedAttributeKeys");
let oe = C;
class Ul {
  static monitor(e) {
    return oe.getFromList(oe.getMonitors(), e) ?? "";
  }
  static letter(e) {
    return oe.getFromList(oe.getMonitorLetters(), e) ?? "";
  }
}
class Wl {
  static toLowerCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}
const Hl = [
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
    return U.iconPath(`${Qr}/${e}`, t);
  }
  static iconPath(e, t) {
    return `<img class="${t}" src="${e}" />`;
  }
  static iconD6(e) {
    if (e < 0 || e > 6)
      throw `Dice ${e} is out of dice range [1..6] or 0 for multidice`;
    return U.fontAwesome(Hl[e]);
  }
}
globalThis.ANARCHY_ICONS = U;
const be = (s, e = {}) => s.replace(/\{(.*?)\}/g, (t, i) => e[i] ?? "");
function Tn(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? Object.values(s).flatMap((e) => Tn(e)) : Array.isArray(s) ? s.map((e) => String(e ?? "").trim()).filter(Boolean) : String(s ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function ts(s = []) {
  return Array.from(new Set(s.map((e) => String(e ?? "").trim()).filter(Boolean)));
}
function ks(s, e = "standard") {
  return String(s ?? "").trim() || e;
}
function jl(s, e = {}) {
  s && (s.movedToKeywords ?? (s.movedToKeywords = []), s.movedToKeywords.push(e));
}
function ql(s, e, t = {}) {
  s && (s.errors ?? (s.errors = []), s.errors.push({ message: e, ...t }));
}
const kn = Object.freeze(["templated"]), Gl = Object.freeze([
  "burstCapable",
  "fullAutoCapable",
  "salvoCapable"
]), Vl = Object.freeze([
  "clustered",
  "mineLayer",
  "smoke",
  "incendiary",
  "emp"
]), Kl = Object.freeze([
  { value: "burstCapable", label: "Burst Capable" },
  { value: "fullAutoCapable", label: "Full Auto Capable" },
  { value: "salvoCapable", label: "Salvo Capable" }
]), Yl = Object.freeze([
  { value: "templated", label: "Templated" },
  { value: "clustered", label: "Clustered" },
  { value: "mineLayer", label: "Mine Layer" },
  { value: "smoke", label: "Smoke" },
  { value: "incendiary", label: "Incendiary" },
  { value: "emp", label: "EMP" }
]), Xr = Object.freeze([
  { value: "blast", label: "Blast" },
  { value: "cone", label: "Cone" },
  { value: "line", label: "Line" },
  { value: "cloud", label: "Cloud" },
  { value: "minefield", label: "Minefield" }
]), Zr = Object.freeze([
  { value: "targeted", label: "Targeted" },
  { value: "origin", label: "Origin" },
  { value: "placed", label: "Placed" }
]), Ql = Object.freeze(["blast", "cone", "line"]);
new Set(kn);
const Jl = /* @__PURE__ */ new Set([
  ...kn,
  ...Gl
]), Xl = /* @__PURE__ */ new Set([
  ...kn,
  ...Vl
]);
function Mn() {
  return {
    movedToKeywords: [],
    errors: []
  };
}
function Ls(s) {
  return ts(Tn(s));
}
function eo({
  traits: s = [],
  keywords: e = [],
  recognized: t = /* @__PURE__ */ new Set(),
  report: i = null,
  owner: a = "weapon",
  path: n = ""
} = {}) {
  const r = Tn(s), o = Ls(e), l = [], c = [...o];
  for (const u of r) {
    if (t.has(u)) {
      l.push(u);
      continue;
    }
    c.push(u), jl(i, {
      owner: a,
      from: n || "traits",
      to: n ? n.replace(/traits$/u, "keywords") : "keywords",
      value: u
    });
  }
  return {
    traits: ts(l),
    keywords: ts(c)
  };
}
function to({
  traits: s = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.traits"
} = {}) {
  return eo({
    traits: s,
    keywords: e,
    recognized: Jl,
    report: t,
    owner: "weapon",
    path: i
  });
}
function io({
  traits: s = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.payloads[].traits"
} = {}) {
  return eo({
    traits: s,
    keywords: e,
    recognized: Xl,
    report: t,
    owner: "payload",
    path: i
  });
}
function so(s = {}, e = "standard") {
  const t = s ?? {}, i = ks(
    t.resolverKey ?? t.damageModel ?? t.resolver,
    e
  ), a = String(t.damageModel ?? "").trim(), n = t.onHitEffect;
  return {
    resolverKey: i,
    damageModel: a,
    onHitEffect: n === null ? null : String(n ?? "").trim() || null
  };
}
function da(s = {}) {
  const e = s ?? {}, t = !!e.enabled, i = e.shots, a = e.accuracyMod, n = e.addHeat, r = e.consumption;
  return {
    enabled: t,
    ...i !== void 0 ? { shots: Math.max(0, Number(i ?? 0) || 0) } : {},
    ...a !== void 0 ? { accuracyMod: Number(a ?? 0) || 0 } : {},
    ...n !== void 0 ? { addHeat: Number(n ?? 0) || 0 } : {},
    ...r !== void 0 ? { consumption: Math.max(0, Number(r ?? 0) || 0) } : {}
  };
}
function Zl(s = {}) {
  const e = s ?? {};
  return {
    single: da(e.single),
    burst: da(e.burst),
    fullAuto: da(e.fullAuto)
  };
}
function ec(s) {
  const e = String(s ?? "").trim().toLowerCase();
  return e === "circle" ? "blast" : e === "ray" ? "line" : Xr.some((t) => t.value === e) ? e : "";
}
function tc(s) {
  const e = String(s ?? "").trim().toLowerCase();
  return ["target", "targeted"].includes(e) ? "targeted" : Zr.some((t) => t.value === e) ? e : "";
}
function ic(s = null) {
  const e = s ?? {}, t = ec(e.shape ?? e.t ?? e.type), i = e.size ?? e.distance ?? e.radius ?? e.length, a = tc(e.placement ?? e.origin ?? e.mode);
  return !t && i === void 0 && !a ? null : {
    shape: t,
    size: Math.max(0, Number(i ?? 0) || 0),
    placement: a || "targeted"
  };
}
function sc({
  weapon: s = {},
  payload: e = {},
  effectiveTraits: t = [],
  effectiveResolution: i = null,
  report: a = null
} = {}) {
  var g, y;
  const n = ts((s == null ? void 0 : s.traits) ?? []), r = ts((e == null ? void 0 : e.traits) ?? []), o = t.includes("templated"), l = n.includes("templated"), c = r.includes("templated"), u = (e == null ? void 0 : e.template) ?? null, d = (s == null ? void 0 : s.template) ?? null, m = ks((g = e == null ? void 0 : e.resolution) == null ? void 0 : g.resolverKey, ""), p = ks((y = s == null ? void 0 : s.resolution) == null ? void 0 : y.resolverKey, ""), f = ks(i == null ? void 0 : i.resolverKey, "standard"), h = [];
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
    ql(a, b, { capability: "templated" });
  return {
    errors: h,
    liveCapabilities: ["templated"],
    template: u,
    resolverKey: f,
    isTemplated: !0
  };
}
const ao = Object.freeze({
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}), $s = Object.freeze(
  Object.entries(ao).map(([s, e]) => ({ value: s, label: e }))
), ac = Object.freeze({
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
}), nc = Object.freeze(
  $s.map((s) => s.value)
), Oa = Object.freeze({}), Vs = Object.freeze({
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
}), rc = Object.freeze(
  Object.values(Vs).map((s) => ({
    value: s.key,
    label: s.label,
    rated: s.rated
  }))
), no = co(Oa), ro = co(Vs);
function Ks(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? Object.values(s).flatMap((e) => Ks(e)) : Array.isArray(s) ? s.map((e) => String(e ?? "").trim()).filter(Boolean) : String(s ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function yt(s, e = "penetrating") {
  const t = String(s ?? "").trim().toLowerCase();
  return ac[t] ?? e;
}
function oo(s) {
  const e = String(s ?? "").trim();
  return e ? yt(e, "") : "";
}
function lo(s) {
  const e = String(s ?? "").trim().toLowerCase();
  return nc.includes(e);
}
function Pt(s) {
  const e = yt(s, "");
  return ao[e] ?? String(s ?? "").trim();
}
function gt(s) {
  const e = s ?? {}, t = Number(e.ballistic ?? 0) || 0, i = Number(e.melee ?? 0) || 0;
  return {
    penetrating: e.penetrating !== void 0 ? Number(e.penetrating ?? 0) || 0 : Math.max(t, i),
    concussive: e.concussive !== void 0 ? Number(e.concussive ?? 0) || 0 : Number(e.explosive ?? 0) || 0,
    energy: Number(e.energy ?? 0) || 0,
    thermal: Number(e.thermal ?? 0) || 0,
    electrical: Number(e.electrical ?? 0) || 0
  };
}
function Ms(s) {
  return Ks(s);
}
function zi(s) {
  return Ks(s);
}
function oc(s) {
  return Ls(s);
}
function vs(s = {}, e = "standard") {
  return so(s, e);
}
function Es(s = {}) {
  return Zl(s);
}
function lc(s = null) {
  return ic(s);
}
function Li(s = "id") {
  var t, i;
  const e = (i = (t = globalThis.foundry) == null ? void 0 : t.utils) == null ? void 0 : i.randomID;
  return typeof e == "function" ? e() : `${s}-${Math.random().toString(36).slice(2, 10)}`;
}
function co(s) {
  const e = {};
  return Object.values(s).forEach((t) => {
    [t.key, ...t.aliases ?? []].forEach((i) => {
      e[is(i)] = t.key;
    });
  }), Object.freeze(e);
}
function is(s) {
  return String(s ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function Ui(s) {
  return Array.isArray(s) ? s : s && typeof s == "object" ? Object.values(s) : s == null || s === "" ? [] : [s];
}
function uo(s, e) {
  return Ui(s).map((t) => cc(t, e)).filter(Boolean);
}
function cc(s, e) {
  if (typeof s == "string" || typeof s == "number") {
    const i = e[is(s)];
    return i ? { id: Li("trait"), key: i, rating: 1 } : null;
  }
  if (!s || typeof s != "object") return null;
  const t = e[is(s.key ?? s.value ?? s.name)];
  return t ? {
    id: String(s.id ?? "").trim() || Li("trait"),
    key: t,
    rating: Math.max(0, Number(s.rating ?? 0) || 0)
  } : null;
}
function ri(s) {
  return uo(s, no);
}
function kt(s) {
  return uo(s, ro);
}
function xs(s) {
  return {
    close: Number((s == null ? void 0 : s.close) ?? (s == null ? void 0 : s.short) ?? 0) || 0,
    near: Number((s == null ? void 0 : s.near) ?? (s == null ? void 0 : s.medium) ?? 0) || 0,
    far: Number((s == null ? void 0 : s.far) ?? (s == null ? void 0 : s.long) ?? 0) || 0,
    extreme: Number((s == null ? void 0 : s.extreme) ?? 0) || 0
  };
}
function uc(s = {}, e = {}) {
  const t = xs(s), i = xs(e);
  return {
    close: t.close + i.close,
    near: t.near + i.near,
    far: t.far + i.far,
    extreme: t.extreme + i.extreme
  };
}
function dc(s, e) {
  var t;
  return ((t = e[s]) == null ? void 0 : t.label) ?? s;
}
function mo(s, e) {
  var a;
  const t = dc(s == null ? void 0 : s.key, e), i = Math.max(0, Number((s == null ? void 0 : s.rating) ?? 0) || 0);
  return (a = e[s == null ? void 0 : s.key]) != null && a.rated && i > 0 ? `${t} ${i}` : t;
}
function po(s, e) {
  return Ui(s).map((t) => {
    const i = t == null ? void 0 : t.key, a = e[i];
    return a != null && a.resolve ? {
      entry: t,
      effect: a.resolve(t),
      label: mo(t, e)
    } : null;
  }).filter(Boolean);
}
function mc(s, e) {
  const t = { ...s ?? {} };
  return Object.entries(e ?? {}).forEach(([i, a]) => {
    t[i] = (Number(t[i] ?? 0) || 0) + (Number(a ?? 0) || 0);
  }), t;
}
function pc(s = []) {
  const e = {}, t = /* @__PURE__ */ new Set();
  for (const i of s.filter(Boolean)) {
    i.accuracyMod !== void 0 && (e.accuracyMod = (Number(e.accuracyMod ?? 0) || 0) + (Number(i.accuracyMod ?? 0) || 0)), i.ap !== void 0 && (e.ap = (Number(e.ap ?? 0) || 0) + (Number(i.ap ?? 0) || 0)), i.addHeat !== void 0 && (e.addHeat = (Number(e.addHeat ?? 0) || 0) + (Number(i.addHeat ?? 0) || 0)), i.bonusVsArmorTag && (e.bonusVsArmorTag = mc(e.bonusVsArmorTag, i.bonusVsArmorTag));
    for (const a of i.flags ?? []) {
      const n = String(a ?? "").trim();
      n && t.add(n);
    }
  }
  return t.size > 0 && (e.flags = Array.from(t)), e;
}
function fc(s = [], e = []) {
  const t = Array.isArray(s) || typeof s == "string" ? { traits: s, standardTraits: e } : s ?? {}, i = zi(t.traits), a = ri(t.standardTraits), n = po(a, Oa), r = i.map((o) => {
    var u;
    const l = no[is(o)];
    if (!l) return null;
    const c = (u = Oa[l]) == null ? void 0 : u.resolve;
    return typeof c == "function" ? c({ key: l, rating: 1 }) : null;
  });
  return pc([
    ...n.map((o) => o.effect),
    ...r
  ]);
}
function hc(s) {
  const e = s ?? {}, t = Mn(), i = io({
    traits: e.traits,
    keywords: e.keywords,
    report: t,
    path: "ammo.types[].traits"
  });
  return {
    id: String(e.id ?? "").trim() || Li("ammo"),
    name: String(e.name ?? "").trim() || "Ammo",
    damageType: oo(e.damageType),
    apMod: Number(e.apMod ?? e.ap ?? 0) || 0,
    attackRatingBandMod: xs(e.attackRatingBandMod ?? e.attackRatingBand),
    traits: i.traits,
    keywords: i.keywords,
    migration: t
  };
}
function gc(s) {
  var l;
  const e = s ?? {}, t = Math.max(0, Number(e.max ?? 0) || 0), i = Number(e.current), a = Number.isFinite(i) ? Math.max(0, Math.min(i, t > 0 ? t : i)) : Math.max(0, t), n = Ui(e.types).map(hc), r = String(e.activeTypeId ?? "").trim(), o = n.some((c) => c.id === r) ? r : ((l = n[0]) == null ? void 0 : l.id) ?? "";
  return {
    current: a,
    max: t,
    consumePerAttack: Math.max(1, Number(e.consumePerAttack ?? 1) || 1),
    activeTypeId: o,
    types: n
  };
}
function yc(s, e = "untracked") {
  const t = String(s ?? "").trim();
  return t ? t === "linked" ? "internal" : t === "perAttack" ? e : ["untracked", "internal", "actorResource", "itemRef"].includes(t) ? t : e : e;
}
function _a(s = {}) {
  const e = s ?? {};
  return {
    amount: Math.max(1, Number(e.amount ?? e.consumePerUse ?? e.consumePerAttack ?? 1) || 1),
    sourceId: String(e.sourceId ?? "").trim()
  };
}
function Kn(s = {}) {
  const e = s ?? {};
  return {
    damageType: oo(e.damageType),
    ap: Number(e.ap ?? e.apMod ?? 0) || 0,
    attackRatingBand: xs(e.attackRatingBand ?? e.attackRatingBandMod)
  };
}
function La(s = {}) {
  return so(s, "standard");
}
function bc(s) {
  return String(s ?? "").trim().toLowerCase() === "unloaded";
}
function Qe(s, { report: e = null, path: t = "system.payloads[]" } = {}) {
  var l;
  const i = s ?? {}, a = String(i.id ?? "").trim() || Li("payload"), n = io({
    traits: i.traits ?? ((l = i.modifies) == null ? void 0 : l.traits),
    keywords: i.keywords,
    report: e,
    path: `${t}.traits`
  }), r = Ks(i.compatibleWith ?? i.compatible), o = lc(i.template);
  return bc(a) ? {
    id: "unloaded",
    label: "Unloaded",
    compatibleWith: [],
    modifies: Kn({}),
    traits: [],
    keywords: [],
    template: null,
    resolution: La({ resolverKey: "standard" }),
    consumption: _a({ amount: 1, sourceId: "" })
  } : {
    id: a,
    label: String(i.label ?? i.name ?? "").trim() || "Payload",
    compatibleWith: r,
    modifies: Kn(i.modifies ?? i),
    traits: n.traits,
    keywords: n.keywords,
    template: o,
    resolution: La(i.resolution ?? i),
    consumption: _a(i.consumption ?? i)
  };
}
function Ct(s) {
  var o, l, c, u, d, m;
  const e = s ?? {}, t = yc(
    e.kind || e.type || ((o = e.link) != null && o.actorPath || e.actorPath ? "actorResource" : "") || ((l = e.link) != null && l.itemId || e.itemId || (c = e.link) != null && c.itemPath || e.itemPath ? "itemRef" : "") || (e.tracking || e.current !== void 0 || e.max !== void 0 ? "internal" : "") || "untracked",
    "untracked"
  ), i = e.tracking ?? e, a = Math.max(0, Number(i.max ?? 0) || 0), n = Number(i.current), r = Number.isFinite(n) ? Math.max(0, Math.min(n, a > 0 ? a : n)) : Math.max(0, a);
  return {
    id: String(e.id ?? "").trim() || Li("source"),
    label: String(e.label ?? e.name ?? "").trim() || "Source",
    kind: t,
    tracking: {
      current: r,
      max: a
    },
    link: {
      actorPath: String(((u = e.link) == null ? void 0 : u.actorPath) ?? e.actorPath ?? "").trim(),
      itemId: String(((d = e.link) == null ? void 0 : d.itemId) ?? e.itemId ?? "").trim(),
      itemPath: String(((m = e.link) == null ? void 0 : m.itemPath) ?? e.itemPath ?? "").trim()
    }
  };
}
function fo({ report: s = null, path: e = "system.payloads" } = {}) {
  return {
    payloads: [Qe({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: s, path: `${e}[0]` })],
    selectedPayloadId: "unloaded",
    consumptionSources: [Ct({
      id: "untracked",
      label: "Untracked",
      kind: "untracked"
    })]
  };
}
function ho(s) {
  return String(s ?? "").trim().toLowerCase() === "melee";
}
function $a(s = [], { report: e = null, path: t = "system.payloads" } = {}) {
  const i = Ui(s).map((a, n) => Qe(a, { report: e, path: `${t}[${n}]` })).filter(Boolean);
  return i.some((a) => a.id === "unloaded") ? i : [
    Qe({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: e, path: `${t}[0]` }),
    ...i
  ];
}
function Ys(s = {}, { report: e = null, path: t = "system.payloads" } = {}) {
  var d;
  const i = gc(s), a = Math.max(1, Number(i.consumePerAttack ?? 1) || 1), n = i.max > 0, r = n ? "internal-magazine" : "untracked", o = [Ct(n ? {
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
  })], l = i.types.length ? i.types.map((m, p) => Qe({
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
      sourceId: n ? r : ""
    }
  }, { report: e, path: `${t}[${p}]` })) : [Qe({
    id: "unloaded",
    label: "Unloaded",
    resolution: { resolverKey: "standard" },
    consumption: {
      amount: a,
      sourceId: n ? r : ""
    }
  }, { report: e, path: `${t}[0]` })], c = $a(l, { report: e, path: t }), u = c.some((m) => m.id === i.activeTypeId) ? i.activeTypeId : ((d = c[0]) == null ? void 0 : d.id) ?? "unloaded";
  return {
    payloads: c,
    selectedPayloadId: u,
    consumptionSources: o
  };
}
function Mt(s, { legacyAmmo: e = null, category: t = "", report: i = null, path: a = "system.payloads" } = {}) {
  if (ho(t)) return [];
  const n = Ui(s).map((r, o) => Qe(r, { report: i, path: `${a}[${o}]` })).filter(Boolean);
  return n.length > 0 ? $a(n, { report: i, path: a }) : e ? $a(Ys(e, { report: i, path: a }).payloads, { report: i, path: a }) : fo({ report: i, path: a }).payloads;
}
function ji(s, { legacyAmmo: e = null } = {}) {
  const t = Ui(s).map(Ct).filter(Boolean);
  return t.length > 0 ? t : e ? Ys(e).consumptionSources : fo().consumptionSources;
}
function Mi(s, e = [], { legacyAmmo: t = null, category: i = "" } = {}) {
  var r;
  if (ho(i)) return "";
  const a = Mt(e, { legacyAmmo: t, category: i }), n = String(s ?? "").trim();
  if (a.some((o) => o.id === n)) return n;
  if (t) {
    const o = Ys(t).selectedPayloadId;
    if (a.some((l) => l.id === o)) return o;
  }
  return ((r = a[0]) == null ? void 0 : r.id) ?? "unloaded";
}
function Yn({ root: s = null, path: e = "", fallback: t = {} } = {}) {
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
  const n = Math.max(0, Number(a ?? t.current ?? 0) || 0), r = Math.max(n, Math.max(0, Number(t.max ?? 0) || 0));
  return {
    current: r > 0 ? Math.min(n, r) : n,
    max: r,
    currentPath: i
  };
}
function Sc({ source: s = null, actor: e = null } = {}) {
  var i, a, n, r, o, l, c;
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
    itemPath: String(((n = s.link) == null ? void 0 : n.itemPath) ?? "").trim()
  };
  if (s.kind === "internal") {
    const u = Math.max(0, Number(((r = s.tracking) == null ? void 0 : r.current) ?? 0) || 0), d = Math.max(0, Number(((o = s.tracking) == null ? void 0 : o.max) ?? 0) || 0);
    return {
      ...t,
      isTracked: d > 0 || u > 0,
      current: u,
      max: d,
      currentPath: ""
    };
  }
  if (s.kind === "actorResource") {
    const u = Yn({
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
    const u = ((c = (l = e == null ? void 0 : e.items) == null ? void 0 : l.get) == null ? void 0 : c.call(l, t.itemId)) ?? null, d = Yn({
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
function xa({
  payloads: s = [],
  selectedPayloadId: e = "",
  consumptionSources: t = [],
  actor: i = null,
  payloadId: a = "",
  category: n = ""
} = {}) {
  const r = Mt(s, { category: n }), o = ji(t), l = Mi(a || e, r, { category: n }), c = r.find((p) => p.id === l) ?? r[0] ?? null, u = (c == null ? void 0 : c.consumption) ?? _a(), d = u.sourceId ? o.find((p) => p.id === u.sourceId) ?? null : o.find((p) => p.kind === "untracked") ?? Ct({
    id: "untracked",
    label: "Untracked",
    kind: "untracked"
  }), m = Sc({ source: d, actor: i });
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
function Ac({
  damageType: s = "penetrating",
  ap: e = 0,
  attackRatingBand: t = {},
  traits: i = [],
  keywords: a = [],
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
  var ee, X, te, ce, Se;
  const g = xa({
    payloads: l != null && l.length ? l : void 0,
    selectedPayloadId: c || f,
    consumptionSources: u,
    actor: m,
    payloadId: d || f,
    category: h
  }), b = ((!l || l.length === 0) && p ? xa({
    ...Ys(p),
    actor: m,
    payloadId: d || f,
    category: h
  }) : null) ?? g, S = b.activePayload, w = to({
    traits: i,
    keywords: a
  }), E = Array.from(/* @__PURE__ */ new Set([
    ...w.traits,
    ...zi(S == null ? void 0 : S.traits)
  ])), I = Ls([
    ...w.keywords,
    ...Ls(S == null ? void 0 : S.keywords)
  ]), N = vs(r, "standard"), L = (ee = S == null ? void 0 : S.resolution) != null && ee.resolverKey ? La(S.resolution) : N, Y = Es(o), Q = Mn(), G = sc({
    weapon: {
      traits: w.traits,
      resolution: N
    },
    payload: S,
    effectiveTraits: E,
    effectiveResolution: L,
    report: Q
  }), H = ri(n), D = fc({
    traits: [],
    standardTraits: H
  }), V = {
    ...b.sourceState
  };
  return delete V.sourceItem, {
    damageType: ((X = S == null ? void 0 : S.modifies) == null ? void 0 : X.damageType) || yt(s),
    ap: (Number(e ?? 0) || 0) + (Number(((te = S == null ? void 0 : S.modifies) == null ? void 0 : te.ap) ?? 0) || 0),
    attackRatingBand: uc(
      t,
      ((ce = S == null ? void 0 : S.modifies) == null ? void 0 : ce.attackRatingBand) ?? {}
    ),
    effects: D,
    traits: E,
    keywords: I,
    standardTraits: H,
    payloadLabel: b.payloadLabel,
    payload: S ? foundry.utils.deepClone(S) : null,
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
    sourceState: foundry.utils.deepClone(V),
    template: G.template ? foundry.utils.deepClone(G.template) : null,
    resolution: foundry.utils.deepClone(L),
    resolverKey: String((L == null ? void 0 : L.resolverKey) ?? "standard").trim() || "standard",
    fireModes: foundry.utils.deepClone(Y),
    capabilityReport: {
      ...Q,
      liveCapabilities: G.liveCapabilities,
      isTemplated: G.isTemplated,
      template: G.template ? foundry.utils.deepClone(G.template) : null,
      resolverKey: String((L == null ? void 0 : L.resolverKey) ?? "standard").trim() || "standard"
    },
    ammoLabel: b.payloadLabel,
    ammoType: S ? foundry.utils.deepClone(S) : null,
    ammoState: {
      current: V.current,
      max: V.max,
      consumePerAttack: V.consumePerUse,
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
      isTracked: V.isTracked,
      ammoLabel: b.payloadLabel
    }
  };
}
function go(s = {}, e = {}) {
  const t = gt(s), i = gt(e);
  return {
    penetrating: t.penetrating + i.penetrating,
    concussive: t.concussive + i.concussive,
    energy: t.energy + i.energy,
    thermal: t.thermal + i.thermal,
    electrical: t.electrical + i.electrical
  };
}
function ma({ standardTraits: s = [], traits: e = [], traitState: t = {} } = {}) {
  var m, p;
  const i = kt(s), n = zi(e).map((f) => {
    const h = ro[is(f)];
    return h ? { id: Li("trait"), key: h, rating: h === "reinforced" ? 1 : 0 } : null;
  }).filter(Boolean), r = po(
    [...i, ...n],
    Vs
  ), o = r.reduce((f, h) => {
    var g;
    return go(f, ((g = h.effect) == null ? void 0 : g.mitigationByType) ?? {});
  }, gt({})), l = r.reduce(
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
function wc({ traits: s = [], standardTraits: e = [] } = {}) {
  return [
    ...zi(s),
    ...kt(e).map((i) => mo(i, Vs))
  ].filter(Boolean);
}
function vn(s) {
  const e = Math.max(0, Number(s ?? 0) || 0);
  return e <= 0 ? 0 : Math.ceil(e / 4);
}
function Tc({
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
  const a = yt(t, "penetrating"), n = gt(e), r = vn(i), o = Number(n[a] ?? 0) || 0;
  return {
    currentArmorRating: i,
    baseMitigation: r,
    typeMitigationMod: o,
    totalMitigation: r + o,
    isDestroyed: !1
  };
}
function kc({ damageIncoming: s = 0, armorTags: e = [], effects: t = {} } = {}) {
  const i = new Set(Ms(e));
  let a = Number(s ?? 0) || 0;
  const n = [];
  return Object.entries((t == null ? void 0 : t.bonusVsArmorTag) ?? {}).forEach(([r, o]) => {
    if (!i.has(r)) return;
    const l = Number(o ?? 0) || 0;
    l && (a *= 1 + l, n.push({ tag: r, bonus: l }));
  }), {
    damageIncoming: a,
    applied: n
  };
}
class hi {
  static checkSufficient(e, t, i) {
    if (t > i) {
      const a = be(k.common.errors.insufficient, {
        resource: e,
        required: t,
        available: i
      });
      throw ui.notifications.error(a), a;
    }
  }
  static checkOutOfRange(e, t, i, a) {
    if (t < i || t > a) {
      const n = be(k.common.errors.outOfRange, {
        resource: e,
        value: t,
        min: i,
        max: a
      });
      throw ui.notifications.error(n), n;
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
      const i = be(k.common.errors.expectedType, {
        type: e.type ? k.itemType.singular[e.type] : e.type,
        expectedType: t
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkActorCanReceiveDamage(e, t, i) {
    if (!t) {
      const a = be(k.common.errors.actorCannotReceiveDamage, {
        actor: i.name,
        damageType: lo(e) ? Pt(e) : k.actor.monitors[e] ?? k.mwd.weaponDamageType[e] ?? k.mwd.personalDamageType[e] ?? e
      });
      throw ui.notifications.error(a), a;
    }
  }
  static checkWeaponDefense(e, t) {
    var a;
    const i = e.getDefense();
    if ((((a = e.isPersonalWeapon) == null ? void 0 : a.call(e)) ?? e.type === A.itemType.personalWeapon) && !i) {
      const n = be(k.common.errors.noDefenseOnWeapon, { actor: t.name, weapon: e.name });
      throw ui.notifications.error(n), n;
    }
  }
  static checkTargetsCount(e, t, i) {
    if (e > 0 && t.length > e) {
      const a = be(k.common.errors.maxTargetsExceedeed, {
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
      const a = be(k.common.errors.actorDoesNotHaveDefense, {
        actor: t.name,
        defense: i.labelkey,
        actorType: k.actorType[t.type]
      });
      throw ui.notifications.error(a), a;
    }
  }
}
function dt(s, e, t, i, a, n = (r) => !0) {
  return {
    code: s,
    labelkey: k.attributeAction[s],
    label: k.attributeAction[s],
    attributeFunction1: e ?? ((r) => {
    }),
    attributeFunction2: t ?? ((r) => {
    }),
    icon: i,
    actorTypes: a,
    condition: n
  };
}
function ds(s, e) {
  return {
    code: s,
    labelkey: k.defense[s],
    label: k.defense[s],
    actionCode: e
  };
}
const Ee = A.actorAttributes, Ce = A.actorTypes, Ge = ze.actions, ms = ze.defenses, pa = [
  dt(Ge.defense, (s) => Ee.reflexes, (s) => Ee.intelligence, U.fontAwesome("fas fa-shield-alt"), [Ce.character, Ce.npc]),
  dt(Ge.defense, (s) => Ee.handling, (s) => Ee.chassis, U.fontAwesome("fas fa-tachometer-alt"), [Ce.vehicle, Ce.battlemech]),
  dt(Ge.resistTorture, (s) => Ee.strength, (s) => Ee.willpower, U.fontAwesome("fas fa-angry"), [Ce.character, Ce.npc]),
  dt(Ge.perception, (s) => Ee.logic, (s) => Ee.willpower, U.fontAwesome("fas fa-eye"), [Ce.character, Ce.npc]),
  dt(Ge.perception, (s) => Ee.system, (s) => Ee.handling, U.fontAwesome("fas fa-video"), [Ce.vehicle, Ce.battlemech]),
  dt(Ge.composure, (s) => Ee.charisma, (s) => Ee.willpower, U.fontAwesome("fas fa-meh"), [Ce.character, Ce.npc]),
  dt(Ge.judgeIntentions, (s) => Ee.charisma, (s) => Ee.charisma, U.fontAwesome("fas fa-theater-masks"), [Ce.character, Ce.npc]),
  dt(Ge.memory, (s) => Ee.logic, (s) => Ee.logic, U.fontAwesome("fas fa-brain"), [Ce.character, Ce.npc]),
  dt(Ge.catch, (s) => Ee.reflexes, (s) => Ee.reflexes, U.fontAwesome("fas fa-baseball-ball"), [Ce.character, Ce.npc]),
  dt(Ge.lift, (s) => Ee.strength, (s) => Ee.strength, U.fontAwesome("fas fa-dumbbell"), [Ce.character, Ce.npc])
], ps = [
  ds(ms.physicalDefense, Ge.defense),
  ds(ms.physicalResistance, Ge.resistTorture),
  ds(ms.socialDefense, Ge.composure),
  ds(ms.mentalResistance, Ge.perception)
];
class ke {
  static init() {
    Handlebars.registerHelper("fixedDefenseCode", (e) => ke.fixedDefenseCode(e));
  }
  static all(e = void 0) {
    return e ? pa.filter(e) : pa;
  }
  static getActorActions(e) {
    return pa.filter((t) => t.actorTypes.includes(e.type) && t.condition(e));
  }
  static fixedDefenseCode(e) {
    return ze.fixedDefenseCode[e] ?? e;
  }
  static getActorDefenses(e) {
    return ps.map((t) => {
      const i = ke.getActorAction(e, t.actionCode);
      return ke._convertToDefense(i, t);
    }).filter((t) => t == null ? void 0 : t.code);
  }
  static getDefenseAttributeAction(e) {
    var t;
    return (t = ps.find((i) => i.code == e)) == null ? void 0 : t.actionCode;
  }
  static getActorAction(e, t) {
    return ke.getActorActions(e).find((i) => i.code == t);
  }
  static getActorDefense(e, t) {
    t = ke.fixedDefenseCode(t);
    const i = ps.find((n) => n.code == t), a = ke.getActorAction(e, i.actionCode);
    return hi.checkActorDefenseAction(a, e, i), ke._convertToDefense(a, i);
  }
  static _convertToDefense(e, t) {
    return e ? foundry.utils.mergeObject(
      t,
      e ?? {},
      { overwrite: !1, inplace: !1 }
    ) : void 0;
  }
  static getDefenses() {
    return ps;
  }
  static prepareShortcut(e, t) {
    const i = ke.getActorActions(e).find((a) => a.code == t);
    if (i)
      return {
        icon: i.icon,
        label: i.labelkey,
        callback: (a) => a.actor.rollAttributeAction(t)
      };
  }
}
class Ba {
  constructor() {
    this.remoteCalls = {}, game.socket.on(Da, async (e) => this.onSocketMessage(e));
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
    return !i || i.condition(game.user) || !i.multiple && at.isUniqueConnectedGM() ? !1 : (game.socket.emit(Da, { msg: e, data: t }), !0);
  }
  async onSocketMessage(e) {
    const t = this.remoteCalls[e.msg];
    if (t) {
      const i = t.condition(game.user), a = t.multiple, n = at.isUniqueConnectedGM();
      i && (a || n) ? t.callback(e.data) : console.log(fe + "RemoteCall.onSocketMessage(", e, ") ignored :", i, a, n);
    } else
      console.log(fe + "RemoteCall: No callback registered for", e);
  }
}
const Qn = "Users.blindMessageToGM";
class at {
  static init() {
    Ba.register(Qn, {
      callback: (e) => at.blindMessageToGM(e),
      condition: (e) => e.isGM
    });
  }
  static blindMessageToGM(e) {
    Ba.call(Qn, e) || ChatMessage.create({
      user: e.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      blind: !0,
      content: be(k.chat.blindMessageToGM, {
        user: game.user.name,
        message: e.content
      })
    });
  }
  static getUsers(e = (t) => !0) {
    return (game.version ? game.users : game.users.entities).filter(e);
  }
  static firstConnectedGM() {
    return at.getUsers((e) => e.isGM && e.active).sort(Z.ascending((e) => e.id)).at(0) ?? {};
  }
  /**
   * @returns true pour un seul utilisateur: le premier GM connecté par ordre d'id
   */
  static isUniqueConnectedGM(e = game.user) {
    return e.id == at.firstConnectedGM().id;
  }
  static firstResponsible(e) {
    if (!(e != null && e.testUserPermission))
      return;
    const t = at.getUsers(
      (i) => i.active && e.testUserPermission(i, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER)
    ).sort(Z.ascending((i) => i.id)).at(0);
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
const Si = k.actor.monitors, wt = k.actor.counters, yo = {
  armor: {
    path: "system.monitors.armor.value",
    monitor: (s) => s.system.monitors.armor,
    iconChecked: U.fontAwesome("fas fa-shield-slash"),
    iconUnchecked: U.fontAwesome("fas fa-shield-alt"),
    iconHit: U.fontAwesome("fas fa-bahai"),
    resource: Si.armor
  },
  fatigue: {
    path: "system.monitors.fatigue.value",
    monitor: (s) => s.system.monitors.fatigue,
    iconChecked: U.fontAwesome("fas fa-grimace"),
    iconUnchecked: U.fontAwesome("far fa-smile"),
    iconHit: U.fontAwesome("fas fa-bahai"),
    resource: Si.fatigue,
    overflow: (s) => A.monitors.physical,
    useArmor: !0
  },
  physical: {
    path: "system.monitors.physical.value",
    monitor: (s) => s.system.monitors.physical,
    iconChecked: U.fontAwesome("fas fa-heartbeat"),
    iconUnchecked: U.fontAwesome("far fa-heart"),
    iconHit: U.fontAwesome("fas fa-bahai"),
    resource: Si.physical,
    useArmor: !0
  },
  structure: {
    path: "system.monitors.structure.value",
    monitor: (s) => s.system.monitors.structure,
    iconChecked: U.fontAwesome("fas fa-car-crash"),
    iconUnchecked: U.fontAwesome("fas fa-car-alt"),
    iconHit: U.fontAwesome("fas fa-bahai"),
    resource: Si.structure
  },
  heat: {
    path: "system.monitors.heat.value",
    monitor: (s) => s.system.monitors.heat,
    iconChecked: U.fontAwesome("fas fa-fire"),
    iconUnchecked: U.fontAwesome("far fa-sun"),
    iconHit: U.fontAwesome("fas fa-temperature-high"),
    resource: Si.heat
  },
  criticals: {
    path: "system.hybrid.criticals.value",
    monitor: (s) => {
      var e;
      return ((e = s.system.hybrid) == null ? void 0 : e.criticals) ?? { value: 0, max: 0 };
    },
    iconChecked: U.fontAwesome("fas fa-bolt"),
    iconUnchecked: U.fontAwesome("far fa-dot-circle"),
    iconHit: U.fontAwesome("fas fa-exclamation-triangle"),
    resource: Si.structure
  },
  anarchy: {
    path: "system.counters.anarchy.value",
    monitor: (s) => ({
      value: s.system.counters.anarchy.value,
      max: 6
    }),
    iconChecked: U.iconPath(`${Hi}/anarchy-point.webp`, "checkbar-img"),
    iconUnchecked: U.iconPath(`${Hi}/anarchy-point-off.webp`, "checkbar-img"),
    resource: wt.anarchy
  },
  plot: {
    path: "system.counters.anarchy.value",
    monitor: (s) => {
      const e = s.system.counters.anarchy.value;
      return { value: e, max: e + 1 };
    },
    iconChecked: U.iconPath(`${Hi}/danger-point.webp`, "checkbar-img"),
    iconUnchecked: U.iconPath(`${Hi}/danger-point-off.webp`, "checkbar-img"),
    resource: wt.anarchy
  },
  sceneAnarchy: {
    path: "system.counters.edgePools.chaos.value",
    monitor: (s) => {
      const e = s.getEdgePoolValue(A.counters.edgePools.chaos), t = s.getAttributeValue(A.actorAttributes.edge);
      return { value: e, max: t };
    },
    iconChecked: U.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    iconUnchecked: U.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    resource: wt.edgePools.chaos
  },
  grit: {
    path: "system.counters.edgePools.grit.value",
    monitor: (s) => ({ value: s.getEdgePoolValue(A.counters.edgePools.grit), max: s.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: U.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    iconUnchecked: U.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    resource: wt.edgePools.grit
  },
  insight: {
    path: "system.counters.edgePools.insight.value",
    monitor: (s) => ({ value: s.getEdgePoolValue(A.counters.edgePools.insight), max: s.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: U.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    iconUnchecked: U.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    resource: wt.edgePools.insight
  },
  legend: {
    path: "system.counters.edgePools.legend.value",
    monitor: (s) => ({ value: s.getEdgePoolValue(A.counters.edgePools.legend), max: s.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: U.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    iconUnchecked: U.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    resource: wt.edgePools.legend
  },
  credibility: {
    path: "system.counters.edgePools.credibility.value",
    monitor: (s) => ({ value: s.getEdgePoolValue(A.counters.edgePools.credibility), max: s.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: U.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    iconUnchecked: U.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    resource: wt.edgePools.credibility
  },
  rumor: {
    path: "system.counters.edgePools.rumor.value",
    monitor: (s) => ({ value: s.getEdgePoolValue(A.counters.edgePools.rumor), max: s.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: U.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    iconUnchecked: U.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    resource: wt.edgePools.rumor
  }
}, it = foundry.utils.mergeObject(yo, {});
class _ {
  static init() {
    Handlebars.registerHelper("iconCheckbar", _.iconCheckbar), Handlebars.registerHelper("iconCheckbarHit", _.iconHit);
  }
  static hackCheckbars(e) {
    if (e) {
      const t = foundry.utils.mergeObject(yo, {});
      foundry.utils.mergeObject(t, e, { recursive: !0 }), foundry.utils.mergeObject(it, t, { overwrite: !0 });
    }
  }
  static iconCheckbar(e, t) {
    return t ? _.iconChecked(e) : _.iconUnchecked(e);
  }
  static iconChecked(e) {
    var t;
    return (t = it[e]) == null ? void 0 : t.iconChecked;
  }
  static iconUnchecked(e) {
    var t;
    return (t = it[e]) == null ? void 0 : t.iconUnchecked;
  }
  static iconHit(e) {
    var t, i;
    return ((t = it[e]) == null ? void 0 : t.iconHit) ?? ((i = it[e]) == null ? void 0 : i.iconChecked);
  }
  static useArmor(e) {
    var t;
    return (t = it[e]) == null ? void 0 : t.useArmor;
  }
  static max(e, t) {
    var a;
    const i = (a = it[t]) == null ? void 0 : a.monitor(e);
    return ((i == null ? void 0 : i.max) ?? 0) + ((i == null ? void 0 : i.maxBonus) ?? 0);
  }
  static value(e, t) {
    var a;
    const i = (a = it[t]) == null ? void 0 : a.monitor(e);
    return (i == null ? void 0 : i.value) ?? 0;
  }
  static resistance(e, t, i = void 0) {
    return _.resistanceDetail(e, t, i).value;
  }
  static resistanceDetail(e, t, i = void 0) {
    var l, c;
    const a = (l = it[t]) == null ? void 0 : l.monitor(e), n = _._resolveResistance(a == null ? void 0 : a.resistance, i), r = _._resolveResistance(a == null ? void 0 : a.resistanceBonus, i), o = i === void 0 ? 0 : Number(((c = a == null ? void 0 : a.resistanceBonusByType) == null ? void 0 : c[i]) ?? 0);
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
  static async switchMonitorCheck(e, t, i, a, n = void 0, r = void 0) {
    await _.setCounter(e, t, _.newValue(i, a), n, r);
  }
  static async addCounter(e, t, i, a = void 0) {
    if (i != 0) {
      const n = _.getCounterValue(e, t, a) ?? 0;
      await _.setCounter(e, t, n + i, a);
    }
  }
  static async setCounter(e, t, i, a = void 0, n = void 0) {
    switch (t) {
      case A.monitors.anarchy:
        return await _.setAnarchy(e, i);
      case A.monitors.sceneAnarchy:
        return await _.setSceneAnarchy(e, i);
    }
    return await _.setCheckbar(e, t, i);
  }
  static getCounterValue(e, t, i) {
    switch (t) {
      case A.monitors.anarchy:
        return _.getAnarchy(e, t);
    }
    return _.value(e, t);
  }
  static async setCheckbar(e, t, i) {
    if (i == _.getCounterValue(e, t))
      return;
    const a = it[t];
    if (a.path) {
      const n = _.max(e, t);
      if (n <= 0)
        return;
      await _._manageOverflow(a, e, t, i, n), i = Math.min(i, n), hi.checkOutOfRange(a.resource, i, 0, n), await e.setCheckbarValue(a.path, i);
    }
  }
  static async _manageOverflow(e, t, i, a, n) {
    if (a > n) {
      const r = e.overflow ? e.overflow(t) : void 0, o = e.recomputeOverflow ? e.recomputeOverflow(a - n) : a - n;
      r && o > 0 && (_._notifyOverflow(t, i, o, r), await _.addCounter(t, r, o));
    }
  }
  static _notifyOverflow(e, t, i, a) {
    const n = be(k.actor.monitors.overflow, {
      actor: e.name,
      monitor: k.actor.monitors[t],
      overflow: i,
      overflowMonitor: k.actor.monitors[a]
    });
    ui.notifications.warn(n);
  }
  static async _manageFatigueOverflow(e, t, i) {
    await _.addCounter(e, A.monitors.physical, t - i);
  }
  static async setAnarchy(e, t) {
    if (e.hasOwnAnarchy()) {
      if (e.hasGMAnarchy()) {
        await game.system.anarchy.gmAnarchy.setAnarchy(t), e.render();
        return;
      }
      await _._setAnarchyMonitor(e, A.monitors.anarchy, t);
    }
  }
  static async setSceneAnarchy(e, t) {
    await _._setAnarchyMonitor(e, A.monitors.sceneAnarchy, t);
  }
  static async _setAnarchyMonitor(e, t, i) {
    const a = _.value(e, t);
    await _.setCheckbar(e, t, i), game.user.isGM || _.notifyAnarchyChange(e, t, a, i);
  }
  static getAnarchy(e, t) {
    return !game.user.isGM && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) || t == wt.anarchy && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) ? 0 : _.value(e, t);
  }
  static notifyAnarchyChange(e, t, i, a) {
    at.blindMessageToGM({
      from: game.user.id,
      content: be(
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
const { loadTemplates: Mc, renderTemplate: vc } = foundry.applications.handlebars, Jn = {
  highlighted: ["far fa-times-circle", "fas fa-dice-one", "fas fa-dice-two", "fas fa-dice-three", "fas fa-dice-four", "fas fa-dice-five", "fas fa-dice-six"],
  dimmed: ["far fa-times-circle", "far fa-dice-one", "far fa-dice-two", "far fa-dice-three", "far fa-dice-four", "far fa-dice-five", "far fa-dice-six"]
};
class vt {
  static init() {
    Hooks.once("ready", async () => await this.onReady()), Handlebars.registerHelper("dice-cursor-array", (e, t) => vt.array(e ?? 0, t ?? 5)), Handlebars.registerHelper("dice-cursor-fas", (e, t) => vt.fasClass(e, t)), Handlebars.registerHelper("dice-cursor-active", (e, t) => vt.activeClass(e, t)), Handlebars.registerHelper("dice-cursor-color", (e, t) => vt.colorClass(e, t));
  }
  static async onReady() {
    await Mc([
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
    return vt.isActive(e, t) ? "active" : "inactive";
  }
  static fasClass(e, t) {
    const i = vt.isActive(e, t) ? Jn.highlighted : Jn.dimmed;
    return vt.$getFas(i, Math.abs(e));
  }
  static colorClass(e, t) {
    return e == 0 || !t ? e < 0 ? "fixed-dice-malus" : "fixed-dice-bonus" : e < 0 ? "variable-dice-malus" : "variable-dice-bonus";
  }
  static $getFas(e, t) {
    return e[t > 6 ? t % 6 : t];
  }
  static async diceCursor({ value: e, min: t, max: i, editable: a }) {
    return await vc("systems/mwd/templates/roll/parts/dice-cursor.hbs", {
      value: e,
      min: t,
      max: i,
      editable: a
    });
  }
}
const Re = {
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
}, Xn = "anarchy-", bo = `${T}.${Re.ANARCHY_HACK}`, Fa = {
  id: T,
  name: "Standard Shadowrun Anarchy",
  hack: {
    checkbars: () => it
  }
};
globalThis.ANARCHY_HOOKS = Re;
globalThis.SETTING_KEY_ANARCHY_HACK = bo;
globalThis.SHADOWRUN_ANARCHY_NO_HACK = Fa;
class di {
  constructor() {
    this.hooks = [], this.hacks = {}, this.hackNames = {}, this.hookMethods = {}, this._register(Re.ANARCHY_HACK), Hooks.on(Re.ANARCHY_HACK, (e) => e(Fa)), Hooks.on("updateSetting", async (e, t, i, a) => this.onUpdateSetting(e, t, i, a)), Hooks.once("ready", () => this.onReady()), Hooks.on("getSceneControlButtons", (e) => {
      var i;
      if (!((i = game.user) != null && i.isGM)) return;
      const t = Array.isArray(e) ? e.find((a) => a.name === "notes") : e == null ? void 0 : e.notes;
      if (!t) {
        const a = Array.isArray(e) ? e.map((n) => n.name) : Object.keys(e ?? {});
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
          var a, n;
          return (n = (a = game.mwd) == null ? void 0 : a.gmGadget) == null ? void 0 : n.call(a);
        }
      });
    });
  }
  async onReady() {
    Hooks.callAll(Re.ANARCHY_HACK, (e) => {
      this.hacks[e.id] = e, this.hackNames[e.id] = e.name;
    }), game.settings.register(T, Re.ANARCHY_HACK, {
      scope: "world",
      name: k.settings.anarchyHack.name,
      hint: k.settings.anarchyHack.hint,
      config: !0,
      default: Fa.id,
      choices: this.hackNames,
      type: String
    }), this.applySelectedAnarchyHack();
  }
  async onUpdateSetting(e, t, i, a) {
    e.key == bo && this.applySelectedAnarchyHack();
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
    return this.hacks[game.settings.get(T, Re.ANARCHY_HACK)];
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
    di.instance()._register(e);
  }
  _register(e) {
    if (console.log(fe + "HooksManager.register", e), !e.startsWith(Xn))
      throw `For safety Anarchy Hooks names must be prefixed by '${Xn}'`;
    this.hooks.push(e);
  }
}
const Zn = [
  A.itemType.assetModule,
  A.itemType.mechWeapon,
  A.itemType.personalWeapon,
  "weapon"
];
class ae {
  constructor() {
    this.modifiers = {
      groups: oe.mapObjetToKeyValue(k.modifier.group, "key", "label"),
      roll: ae._buildGroupOptions("roll"),
      attribute: ae._buildGroupOptions("attribute"),
      monitor: ae._buildGroupOptions("monitor"),
      other: ae._buildGroupOptions("other")
    }, Hooks.once("ready", () => this.onReady());
  }
  static _buildGroupOptions(e) {
    switch (e) {
      case "attribute":
        return {
          label: k.modifier.group[e],
          effects: oe.hbsAttributes.map((t) => ({ key: t.value, label: t.labelkey })),
          categories: []
        };
    }
    return {
      label: k.modifier.group[e],
      effects: oe.mapObjetToKeyValue(k.modifier[e].effect, "key", "label"),
      categories: oe.mapObjetToKeyValue(k.modifier[e].category, "key", "label")
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
                return oe.getDamageTypes().map((n) => ({ key: n.value, label: n.labelkey }));
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
        return oe.getAttributes().map((i) => ({ key: i.value, label: i.labelkey }));
      case "skill":
        return game.system.anarchy.skills.getSkills().map((i) => ({ key: i.code, label: i.labelkey }));
      case "attributeAction":
        const t = ke.all().map((i) => ({ key: i.code, label: i.labelkey }));
        return Z.distinct(t.map((i) => i.key)).map((i) => t.find((a) => a.key == i));
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
            return i.subCategory == e.attributeAction || i.subCategory == ke.getDefenseAttributeAction(e.defenseAction);
        }
      return !1;
    };
  }
  static computeRollModifiers(e, t, i) {
    const a = ae.buildRollModifiersFilter(t, i), n = (c) => c.group == "roll" && c.effect == i && a(c), r = ae._activeItems(e).map((c) => ae.itemModifiers(c, n)).reduce((c, u) => c.concat(u), []).sort(Z.descending((c) => c.modifier.value)), o = ae.$sumAssetModuleModifiers(r.filter((c) => Zn.includes(c.item.type)).map((c) => c.modifier.value)), l = Z.sumValues(r.filter((c) => !Zn.includes(c.item.type)).map((c) => c.modifier.value));
    return {
      value: o + l,
      sources: r
    };
  }
  static $sumAssetModuleModifiers(e) {
    const t = e.find((n) => n > 3) ?? 0, i = Z.sumValues(e.filter((n) => n < 0)), a = Math.min(3, Z.sumValues(e.filter((n) => n > 0 && n <= 3)));
    return i + Math.max(a, t);
  }
  static computeModifiers(e, t, i = void 0, a = void 0) {
    const n = ae._createFilter(t, i, a), r = ae._activeItems(e).map((l) => ae.itemModifiers(l, n)).reduce((l, c) => l.concat(c), []);
    return {
      value: Z.sumValues(r, (l) => l.modifier.value),
      sources: r
    };
  }
  static sumMonitorModifiers(e, t, i, a = void 0) {
    return ae.sumModifiers(ae._activeItems(e), "monitor", t, i, a);
  }
  static sumModifiers(e, t, i, a, n = void 0) {
    const r = ae._createFilter(t, i, a, n), o = ae._activeItems(e).map((l) => ae.itemModifiers(l, r)).reduce((l, c) => l.concat(c), []);
    return Z.sumValues(o, (l) => l.modifier.value);
  }
  static _createFilter(e, t, i, a = void 0) {
    return (n) => n.group == e && n.effect == (t ?? n.effect) && n.category == (i ?? n.category) && (a == null ? !0 : n.subCategory == a);
  }
  static countModifiers(e, t, i = void 0, a = void 0) {
    const n = ae._createFilter(t, i, a);
    return ae._activeItems(e).map((o) => ae.itemModifiers(o, n)).reduce((o, l) => o.concat(l), []).count;
  }
  static itemModifiers(e, t) {
    return ae._listItemModifiers(e, t).map((i) => ae._itemModifier(e, i));
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
const { loadTemplates: fa, renderTemplate: Qf } = foundry.applications.handlebars, pe = {
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
}, er = 4, Ec = [
  // attribute1
  {
    code: "attribute1",
    options: {
      order: 1,
      category: pe.pool,
      hbsTemplateRoll: `${q}/roll/parts/select-attribute.hbs`
    },
    condition: (s) => Object.values(ze.rollType).includes(s.mode),
    isUsed: (s) => !0,
    factory: (s) => {
      var t;
      const e = s.attribute1 ?? ((t = s.skill) == null ? void 0 : t.system.attribute);
      return {
        labelkey: e ? k.attributes[e] : k.attributes.noAttributes,
        value: s.actor.getAttributeValue(e, s.activeItem),
        flags: { editable: s.skill },
        selected: e,
        choices: oe.getAttributes((i) => s.attributes.includes(i))
      };
    }
  },
  // attribute2
  {
    code: "attribute2",
    options: {
      order: 1,
      category: pe.pool,
      hbsTemplateRoll: `${q}/roll/parts/select-attribute.hbs`,
      hbsTemplateChat: `${q}/chat/parts/pool-attribute2.hbs`
    },
    condition: (s) => [ze.rollType.attribute, ze.rollType.attributeAction, ze.rollType.defense].includes(s.mode),
    isUsed: (s) => s.used,
    onChecked: (s, e) => s.used = !!e,
    factory: (s) => {
      const e = s.attribute2;
      return {
        labelkey: e ? k.attributes[e] : k.attributes.noAttributes,
        value: s.actor.getAttributeValue(e, s.activeItem),
        flags: { editable: ze.rollType.attribute == s.mode },
        selected: e,
        choices: oe.getAttributes((t) => s.attributes.includes(t))
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
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`
    },
    condition: (s) => ["skill", "weapon"].includes(s.mode),
    factory: (s) => {
      var t, i, a, n;
      const e = (t = s.actor) != null && t.getSkillRating ? s.actor.getSkillRating(s.skill) : ((a = (i = s.skill) == null ? void 0 : i.system) == null ? void 0 : a.value) ?? 0;
      return {
        label: (n = s.skill) == null ? void 0 : n.name,
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
      hbsTemplateRoll: `${q}/roll/parts/check-option.hbs`
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
      category: pe.pool,
      value: 0,
      labelkey: k.common.roll.modifiers.social.credibility,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`
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
      category: pe.pool,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 4
    },
    factory: (s) => ii.computeRollModifiers(pe.pool, s)
  },
  // wounds
  {
    code: "wounds",
    options: {
      flags: { optional: !0 },
      order: 10,
      category: pe.pool,
      labelkey: k.common.roll.modifiers.wounds,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`
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
      category: pe.pool,
      value: 0,
      labelkey: k.common.roll.modifiers.other,
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
      category: pe.glitch,
      value: 0,
      labelkey: k.common.roll.modifiers.glitch,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${q}/chat/parts/glitch.hbs`,
      min: 0,
      max: 5
    },
    isUsed: (s) => s.value > 0,
    factory: (s) => {
      const e = s.actor.getWounds(), t = ii.computeRollModifiers(pe.glitch, s);
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
      category: pe.glitch,
      value: 0,
      labelkey: k.common.roll.modifiers.social.rumor,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${q}/chat/parts/glitch.hbs`,
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
      category: pe.reroll,
      labelkey: k.common.roll.modifiers.reroll,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: er
    },
    factory: (s) => {
      const e = ii.computeRollModifiers(pe.reroll, s), t = ii.computeRollModifiers(pe.rerollMax, s);
      return foundry.utils.mergeObject(e, {
        max: er + Math.max(0, t.value ?? 0)
      });
    }
  },
  // reduction from opponent
  {
    code: "reduced",
    options: {
      order: 29,
      category: pe.pool,
      labelkey: k.common.roll.modifiers.reduced,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
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
      category: pe.rerollForced,
      labelkey: k.common.roll.modifiers.rerollForced,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 0
    },
    factory: (s) => {
      var t;
      const e = ii.computeRollModifiers(pe.successReroll, s);
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
      category: pe.pool,
      value: 0,
      min: 0,
      max: 3,
      labelkey: k.common.roll.modifiers.anarchyDisposition,
      hbsTemplateRoll: `${q}/roll/parts/check-option.hbs`
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
      category: pe.risk,
      value: 0,
      labelkey: k.common.roll.modifiers.anarchyRisk,
      hbsTemplateRoll: `${q}/roll/parts/check-option.hbs`,
      hbsTemplateChat: `${q}/chat/parts/anarchy-risk.hbs`
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
      category: pe.edge,
      labelkey: k.common.roll.modifiers.edge,
      hbsTemplateRoll: `${q}/roll/parts/check-option.hbs`
    },
    isUsed: (s) => s.used,
    condition: (s) => s.options.canUseEdge && s.actor.getRemainingEdge(),
    onChecked: (s, e) => {
      s.used = e, s.value = e ? 1 : 0;
    },
    factory: (s) => {
      var a;
      const t = [
        A.counters.edgePools.grit,
        A.counters.edgePools.chaos,
        A.counters.edgePools.insight,
        A.counters.edgePools.rumor,
        A.counters.edgePools.legend,
        A.counters.edgePools.credibility
      ].map((n) => {
        const r = s.actor.getEdgePoolValue(n);
        return {
          code: n,
          label: k.actor.counters.edgePools[n] ?? n,
          value: r
        };
      }), i = ((a = t.find((n) => n.value > 0)) == null ? void 0 : a.code) ?? A.counters.edgePools.grit;
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
      labelkey: k.common.roll.modifiers.opponentPool,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (s) => ii.computeRollModifiers(pe.opponentPool, s),
    condition: (s) => !s.attributeAction
  },
  // force opponent rerolls
  {
    code: "opponentReroll",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: pe.opponentReroll,
      value: 0,
      labelkey: k.common.roll.modifiers.opponentReroll,
      hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (s) => ii.computeRollModifiers(pe.opponentReroll, s),
    condition: (s) => !s.attributeAction
  }
];
class ii {
  constructor() {
    this.registeredParameters = {}, di.register(Re.REGISTER_ROLL_PARAMETERS), di.register(Re.MODIFY_ROLL_PARAMETER), Hooks.on(Re.MODIFY_ROLL_PARAMETER, (e) => this._validate(e)), Hooks.once(Re.REGISTER_ROLL_PARAMETERS, (e) => Ec.forEach(
      (t) => e(t)
    )), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(Re.REGISTER_ROLL_PARAMETERS, async (t) => {
      Hooks.callAll(Re.MODIFY_ROLL_PARAMETER, t), t.ignore || await this._register(t);
    });
    const e = Z.distinct([].concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateRoll)).concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateChat)).filter((t) => typeof t == "string" && t.length > 0));
    await fa(Z.distinct(e)), await fa([`${q}/roll/parts/parameter-label.hbs`]);
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
    e && await fa([e]);
  }
  build(e) {
    return Object.values(this.registeredParameters).filter((t) => !t.condition || t.condition(e)).map((t) => this._computeParameter(t, e));
  }
  compute(e) {
    const t = e.filter((n) => this.isParameterUsed(n)), i = Z.classify(t, (n) => n.category), a = {};
    return Object.values(i).forEach((n) => a[n[0].category] = Z.sumValues(n, (r) => r.value ?? (r.optional ? 1 : 0))), a;
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
    }, a = t.actor.items.filter(i);
    return ae.computeRollModifiers(a, t, e);
  }
}
const { ApplicationV2: Cc, HandlebarsApplicationMixin: Pc } = foundry.applications.api, { loadTemplates: Nc, renderTemplate: Rc } = foundry.applications.handlebars;
var qs, So;
const Ie = class Ie extends Pc(Cc) {
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
    await Nc([
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
    const i = foundry.utils.mergeObject(Ie.prepareActorRoll(e), {
      mode: ze.rollType.attribute,
      attribute1: t
    });
    await Ie.create(i);
  }
  static async rollAttributeAction(e, t) {
    const i = foundry.utils.mergeObject(Ie.prepareActorRoll(e), {
      mode: ze.rollType.attributeAction,
      attributeAction: t.code,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e)
    });
    await Ie.create(i);
  }
  static async rollSkill(e, t, i) {
    const a = foundry.utils.mergeObject(Ie.prepareActorRoll(e), {
      mode: ze.rollType.skill,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? A.actorAttributes.reflexes,
      specialization: i
    });
    await Ie.create(a);
  }
  static async rollWeapon(e, t, i, a) {
    const n = foundry.utils.mergeObject(Ie.prepareActorRoll(e), {
      mode: ze.rollType.weapon,
      weapon: i,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? e.getPhysicalAgility(),
      specialization: void 0,
      targeting: a
    });
    await Ie.create(n);
  }
  static async rollDefense(e, t, i) {
    const a = foundry.utils.mergeObject(Ie.prepareActorRoll(e), {
      mode: ze.rollType.defense,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e),
      defenseAction: t.code,
      attackRoll: i.attackRoll,
      tokenId: i.defenderTokenId,
      choiceChatMessageId: i.choiceChatMessageId
    });
    await Ie.create(a);
  }
  static async itemAttributeRoll(e, t) {
    const i = foundry.utils.mergeObject(Ie.prepareActorRoll(e.actor), {
      mode: ze.rollType.attribute,
      item: e,
      attribute1: t,
      attributes: e.actor.getUsableAttributes(e)
    });
    await Ie.create(i);
  }
  static async create(e) {
    var r;
    const t = v(r = Ie, qs, So).call(r, e), i = await Rc(`${q}/roll/roll-dialog-title.hbs`, t), a = {
      id: `roll-dialog-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Ie.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new Ie({ roll: t }, a).render({ force: !0 });
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
      const a = this._getRollParameter(i), n = this._getEventItem(i, this.roll.actor), r = i.currentTarget.value, o = this.roll.actor.getAttributeValue(r, n);
      this.roll[a.code] = r, await this._setParameterSelectedOption(a, r, o);
    }), this.html.find(".check-optional").click(async (i) => {
      const a = this._getRollParameter(i);
      a.onChecked(a, i.currentTarget.checked), a.category == pe.pool && await this._updateParameterValue(a, a.value), a.code == "edge" && this.html.find(`.parameter[data-parameter-code='${a.code}'] .edge-pool-select`).prop("disabled", !a.used);
    }), this.activateDiceParameterClick(), this.html.find("input.parameter-value:not(:disabled)").on("input", async (i) => {
      const a = this._getRollParameter(i), n = Number.parseInt(i.currentTarget.value) ?? 0;
      await this._updateParameterValue(a, n);
    }), this.html.find(".select-option-parameter").change(async (i) => {
      const a = this._getRollParameter(i), n = i.currentTarget.value, r = Number.parseInt(n);
      await this._setParameterSelectedOption(a, n, r);
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
        const a = Number.parseInt(this.html.find(e.currentTarget).attr("data-dice")) ?? 0, n = t.value != a || a == 0 ? a : a > 0 ? a - 1 : a + 1;
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
    return await vt.diceCursor({
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
qs = new WeakSet(), So = function(e) {
  const t = game.system.anarchy.rollParameters.build(e).sort(Z.ascending((i) => i.order ?? 200));
  return foundry.utils.mergeObject(e, {
    ENUMS: oe.getEnums((i) => e.attributes.includes(i)),
    ANARCHY: k,
    parameters: t
  });
}, Te(Ie, qs), R(Ie, "PARTS", {
  body: {
    template: `${q}/roll/roll-dialog.hbs`
  }
});
let ft = Ie;
const En = 2, za = "skillSpecializationCatalog", Dc = [
  { key: "running", label: "Running" },
  { key: "jumping", label: "Jumping" },
  { key: "swimming", label: "Swimming" },
  { key: "climbing", label: "Climbing" },
  { key: "acrobatics", label: "Acrobatics" }
], Ao = /* @__PURE__ */ new Set(), St = [
  // Strength
  { code: "athletics", label: "Athletics", attribute: "strength", icon: `${se}/athletics.svg`, domains: ["physical"], specializations: Dc },
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
].map(Ic);
for (const s of St)
  Ao.add(s.code);
function Ic(s) {
  return {
    ...s,
    label: s.label ?? s.code,
    icon: s.icon ?? `${ls}/icons/skills/skills.svg`,
    specializations: Pn(s.specializations)
  };
}
function Cn(s) {
  return String(s ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function Pn(s = []) {
  const e = /* @__PURE__ */ new Set();
  return (Array.isArray(s) ? s : []).map((t) => {
    const i = Cn((t == null ? void 0 : t.key) ?? (t == null ? void 0 : t.label) ?? t);
    return !i || e.has(i) ? null : (e.add(i), {
      key: i,
      label: String((t == null ? void 0 : t.label) ?? (t == null ? void 0 : t.key) ?? t ?? i).trim() || i
    });
  }).filter(Boolean);
}
function Oc(s = []) {
  const e = new Error(s[0] ?? "Invalid skill specialization data.");
  return e.validationErrors = s, e;
}
function _c() {
  const s = {};
  for (const e of St) {
    const t = (Array.isArray(e.specializations) ? e.specializations : []).map((i) => String((i == null ? void 0 : i.label) ?? "").trim()).filter(Boolean);
    t.length && (s[e.code] = t);
  }
  return s;
}
const Lc = Object.freeze(_c());
function $c(s, e = [], { strict: t = !1, errors: i = [] } = {}) {
  var n, r;
  if (!Array.isArray(e)) {
    if (t) {
      const o = ((n = Ua(s)) == null ? void 0 : n.label) ?? s;
      i.push(`${o}: expected an array of specialization labels.`);
    }
    return [];
  }
  const a = [];
  for (const o of e) {
    const l = String(o ?? "").trim();
    if (!l) {
      if (t) {
        const c = ((r = Ua(s)) == null ? void 0 : r.label) ?? s;
        i.push(`${c}: specialization labels cannot be blank.`);
      }
      continue;
    }
    a.push(l);
  }
  return Pn(a).map((o) => o.label);
}
function Ua(s) {
  return St.find((e) => e.code === s);
}
function wo(s, { strict: e = !1 } = {}) {
  const t = s && typeof s == "object" && !Array.isArray(s) ? s : {}, i = [], a = {};
  for (const [n, r] of Object.entries(t)) {
    if (!Ao.has(n)) {
      e && i.push(`Unknown skill code "${n}".`);
      continue;
    }
    const o = $c(n, r, { strict: e, errors: i });
    o.length && (a[n] = o);
  }
  if (e && i.length) throw Oc(i);
  return Object.fromEntries(
    St.map((n) => [n.code, a[n.code]]).filter(([, n]) => Array.isArray(n) && n.length)
  );
}
function xc() {
  var s, e, t;
  try {
    if ((t = (e = (s = game == null ? void 0 : game.settings) == null ? void 0 : s.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${za}`))
      return game.settings.get(T, za);
  } catch {
  }
  return Mo();
}
function To() {
  const s = wo(xc(), { strict: !1 });
  return Object.fromEntries(
    Object.entries(s).map(([e, t]) => [
      e,
      Pn(t)
    ])
  );
}
function ko(s = [], { allowedKeys: e = null } = {}) {
  const t = /* @__PURE__ */ new Set();
  return (Array.isArray(s) ? s : []).map((i) => Cn(i)).filter((i) => !i || t.has(i) || e && !e.has(i) ? !1 : (t.add(i), !0));
}
function lt(s) {
  const e = Ua(s);
  if (e)
    return {
      ...e,
      specializations: mi(e.code)
    };
}
function Bs() {
  const s = To();
  return [...St].map((e) => ({
    ...e,
    specializations: [...s[e.code] ?? []]
  })).sort((e, t) => e.label.localeCompare(t.label));
}
function mi(s) {
  return [...To()[s] ?? []];
}
function Nn(s, e) {
  const t = Cn(e);
  if (t)
    return mi(s).find((i) => i.key === t);
}
function Bc(s, e) {
  var t;
  return ((t = Nn(s, e)) == null ? void 0 : t.label) ?? "";
}
function Mo() {
  return foundry.utils.deepClone(Lc);
}
function Qs(s, { strict: e = !1 } = {}) {
  return wo(s, { strict: e });
}
function Fs(s = []) {
  return ko(s);
}
function Fc(s, e = []) {
  const t = new Set(mi(s).map((a) => a.key)), i = new Set(ko(e, { allowedKeys: t }));
  return mi(s).filter((a) => i.has(a.key)).map((a) => a.key);
}
function Wa(s, e) {
  var t, i;
  return Fs(
    ((i = (t = s == null ? void 0 : s.skills) == null ? void 0 : t[e]) == null ? void 0 : i.specializations) ?? []
  );
}
function Js(s, e) {
  return Fc(
    e,
    Wa(s, e)
  );
}
function vo(s, e) {
  const t = new Set(Js(s, e));
  return mi(e).filter((i) => t.has(i.key));
}
function zc(s) {
  const e = Math.ceil(s.length / 2);
  return { left: s.slice(0, e), right: s.slice(e) };
}
function Uc(s) {
  var e, t;
  s.skills ?? (s.skills = {});
  for (const i of St) {
    const a = (e = s.skills)[t = i.code] ?? (e[t] = {});
    a.rating == null && (a.rating = 0), a.bonus == null && (a.bonus = 0), a.specializations = Fs(a.specializations);
  }
}
function Eo(s, { bonusBySkill: e = null } = {}) {
  const t = Bs(), { left: i, right: a } = zc(t), n = (r) => {
    var y, b, S, w, E, I;
    const o = r.code, l = r.attribute, c = Number(((b = (y = s == null ? void 0 : s.skills) == null ? void 0 : y[o]) == null ? void 0 : b.rating) ?? 0), u = Number(((w = (S = s == null ? void 0 : s.attributes) == null ? void 0 : S[l]) == null ? void 0 : w.value) ?? 0), d = Number(((I = (E = s == null ? void 0 : s.skills) == null ? void 0 : E[o]) == null ? void 0 : I.bonus) ?? 0), m = Number((e == null ? void 0 : e[o]) ?? 0), p = d + m, f = vo(s, o), h = mi(o).filter((N) => !f.some((L) => L.key === N.key)), g = u + c + p;
    return {
      code: o,
      label: r.label,
      icon: r.icon,
      attribute: l,
      attributeLabel: oe != null && oe.localizeAttribute ? oe.localizeAttribute(l) : l,
      rating: c,
      base: u,
      bonus: p,
      total: g,
      rollPayload: JSON.stringify({ intent: "skill", key: o }),
      canAddSpecialization: h.length > 0,
      specializations: f.map((N) => ({
        ...N,
        bonus: En,
        rollPayload: JSON.stringify({
          intent: "skill",
          key: o,
          specializationKey: N.key,
          specializationLabel: N.label
        })
      })),
      // Input wiring paths (so templates don’t concat strings themselves)
      pathRating: `system.skills.${o}.rating`,
      pathBonus: `system.skills.${o}.bonus`
    };
  };
  return {
    left: i.map(n),
    right: a.map(n)
  };
}
const Wc = /* @__PURE__ */ new Set(["overloaded"]);
function tr(s) {
  return s ? (s == null ? void 0 : s.document) ?? s : null;
}
function Hc(s, e) {
  var i, a, n;
  if (!s) return null;
  const t = tr(e) ?? tr(s == null ? void 0 : s.token);
  return t ? t.isLinked ? t.baseActor ?? ((n = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : n.call(i, ((a = t == null ? void 0 : t.baseActor) == null ? void 0 : a.id) ?? "")) ?? t.actor ?? s : t.actor ?? s : s;
}
function Co(s) {
  const e = String(s ?? "").trim();
  if (!e) return "Status";
  const a = (e.includes(".") ? e.split(".").at(-1) : e).replace(/^status/i, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return a ? a.replace(/\b\w/g, (n) => n.toUpperCase()) : e;
}
function jc(s) {
  const e = String((s == null ? void 0 : s.name) ?? (s == null ? void 0 : s.label) ?? (s == null ? void 0 : s.id) ?? "Status").trim();
  return e ? Co(e) : "Status";
}
function qc(s) {
  const e = typeof (s == null ? void 0 : s.img) == "string" ? s.img.trim() : "";
  if (e) return e;
  const t = s ? Object.getOwnPropertyDescriptor(s, "icon") : null;
  return "value" in (t ?? {}) ? String(t.value ?? "").trim() : "";
}
function zs(s, e) {
  var t, i, a, n, r, o;
  return e === "overloaded" ? !!((i = (t = s == null ? void 0 : s.system) == null ? void 0 : t.burn) != null && i.overloaded) || !!((n = (a = s == null ? void 0 : s.statuses) == null ? void 0 : a.has) != null && n.call(a, e)) : ((o = (r = s == null ? void 0 : s.statuses) == null ? void 0 : r.has) == null ? void 0 : o.call(r, e)) ?? !1;
}
function Rn(s) {
  const e = /* @__PURE__ */ new Set();
  return (CONFIG.statusEffects ?? []).filter((t) => {
    const i = String((t == null ? void 0 : t.id) ?? "").trim();
    return !i || e.has(i) ? !1 : (e.add(i), !0);
  }).map((t) => {
    const i = String(t.id).trim();
    return {
      id: i,
      label: jc(t),
      icon: qc(t),
      active: zs(s, i),
      managed: Wc.has(i)
    };
  }).sort((t, i) => t.active !== i.active ? t.active ? -1 : 1 : t.label.localeCompare(i.label));
}
function Gc(s) {
  if (!s.length)
    return "<p>No token statuses are configured.</p>";
  const e = foundry.utils.escapeHTML;
  return `
    <div class="mwd-token-status-dialog">
      <p style="margin-top: 0;">Toggle the statuses shown on this token.</p>
      <div style="display: grid; gap: 0.2rem; max-height: 20rem; overflow-y: auto; padding-right: 0.25rem;">
        ${s.map((i) => {
    const a = i.active ? "checked" : "", n = i.icon ? `<img src="${e(i.icon)}" alt="" width="20" height="20" style="flex: 0 0 20px; border: 0;" />` : "", r = i.managed ? '<small style="opacity: 0.7;">Managed by system state</small>' : "";
    return `
      <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.2rem 0;">
        <input type="checkbox" name="status" value="${e(i.id)}" ${a} />
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
async function Vc({ actor: s, effects: e, selectedStatusIds: t }) {
  const i = new Set(t);
  for (const a of e) {
    const n = i.has(a.id);
    await Po({ actor: s, statusId: a.id, active: n });
  }
}
async function Po({ actor: s, statusId: e, active: t }) {
  if (!s || !e) return !1;
  const i = zs(s, e);
  return !!t === i ? !1 : e === "overloaded" ? (await s.update({ "system.burn.overloaded": !!t }), !0) : (await s.toggleStatusEffect(e, { active: !!t, overlay: !1 }), !0);
}
async function Kc({ actor: s, token: e } = {}) {
  var a;
  if (!s || !e) return !1;
  const t = Hc(s, e), i = Rn(t);
  return i.length ? foundry.applications.api.DialogV2.wait({
    window: {
      title: `Token Statuses: ${e.name ?? s.name ?? "Token"}`
    },
    position: {
      width: 420
    },
    content: Gc(i),
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
            return await Vc({ actor: t, effects: i, selectedStatusIds: c }), !0;
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
const Yc = Object.freeze({
  STR: jt.strength,
  REF: jt.reflexes,
  WIL: jt.willpower,
  INT: jt.intelligence,
  CHA: jt.charisma
}), Qc = Object.freeze({
  STR: "Strength",
  REF: "Reflexes",
  WIL: "Willpower",
  INT: "Intelligence",
  CHA: "Charisma"
}), Jc = Object.freeze({
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
function Dn(s) {
  const e = String(s ?? "").trim();
  return e ? Jc[e] ?? null : null;
}
function Xc(s) {
  const e = Dn(s);
  return e ? {
    intent: "common",
    id: e.id
  } : null;
}
function Zc(s) {
  return Yc[String(s ?? "").trim().toUpperCase()] ?? null;
}
function eu(s) {
  return Qc[String(s ?? "").trim().toUpperCase()] ?? String(s ?? "").trim().toUpperCase();
}
function tu(s = []) {
  return (Array.isArray(s) ? s : []).map((e) => String(e ?? "").trim().toUpperCase()).filter(Boolean).join(" + ");
}
const In = Object.freeze([
  { value: "positive", label: "Positive" },
  { value: "negative", label: "Negative" },
  { value: "narrative", label: "Narrative" }
]), On = Object.freeze([
  { value: "minor", label: "Minor" },
  { value: "major", label: "Major" }
]), No = Object.freeze([
  { value: "passive", label: "Passive" },
  { value: "triggered", label: "Triggered" }
]), Ro = Object.freeze([
  { value: "rollMod", label: "Roll Modifier" },
  { value: "burnAdjust", label: "Burn Adjust" },
  { value: "actionCostMod", label: "Action Cost Mod" },
  { value: "initiativeMod", label: "Initiative Mod" },
  { value: "damageMod", label: "Damage Intake Mod" },
  { value: "edgeEvent", label: "Edge Event" }
]), Do = Object.freeze([
  { value: "onBuildRoll", label: "Build Roll" },
  { value: "onBeforeBurnApplied", label: "Before Burn Applied" },
  { value: "onBeforeActionCostFinalized", label: "Before Action Cost Finalized" },
  { value: "onInitiativeResolved", label: "Initiative Resolved" },
  { value: "onDamageResolved", label: "Damage Resolved" },
  { value: "onEndOfActivation", label: "End of Activation" },
  { value: "onEdgeSpend", label: "Edge Spend" },
  { value: "onEdgeGain", label: "Edge Gain" }
]), _n = Object.freeze([
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
]), Io = Object.freeze([
  { value: "adjustAmount", label: "Adjust Amount" },
  { value: "grantPool", label: "Grant Pool" }
]), iu = new Set(In.map((s) => s.value)), su = new Set(On.map((s) => s.value)), au = new Set(No.map((s) => s.value)), nu = new Set(Ro.map((s) => s.value)), Oo = new Set(Do.map((s) => s.value)), ru = new Set(_n.map((s) => s.value)), ou = new Set(Io.map((s) => s.value));
function ne(s, e = "") {
  return String(s ?? "").trim() || e;
}
function le(s, e = 0) {
  const t = Number(s);
  return Number.isFinite(t) ? t : e;
}
function Us(s) {
  return foundry.utils.deepClone(s);
}
function _o(s = []) {
  return (Array.isArray(s) ? s : typeof s == "string" ? s.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function lu(s) {
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
function ha(s) {
  const e = Math.max(0, Math.trunc(le(s, 0)));
  return e > 0 ? e : 0;
}
function Yt(s = {}) {
  const e = s && typeof s == "object" ? s : {};
  return {
    perActivation: ha(e.perActivation),
    perRound: ha(e.perRound),
    perScene: ha(e.perScene)
  };
}
function cu(s = {}) {
  const e = s && typeof s == "object" ? s : {}, t = {
    id: ne(e.id, foundry.utils.randomID()),
    fact: ne(e.fact)
  }, i = _n.find((n) => e[n.value] !== void 0 && e[n.value] !== null), a = (i == null ? void 0 : i.value) ?? (ru.has(String(e.comparator ?? "").trim()) ? String(e.comparator).trim() : "eq");
  return t.comparator = a, a !== "truthy" && a !== "falsy" && (t.value = lu(e[a] ?? e.value ?? "")), t;
}
function Et(s = []) {
  return (Array.isArray(s) ? s : []).map(cu);
}
function uu(s = {}) {
  const e = s && typeof s == "object" ? s : {}, t = nu.has(String(e.type ?? "").trim()) ? String(e.type).trim() : "rollMod", i = du(t), a = Oo.has(String(e.phase ?? "").trim()) ? String(e.phase).trim() : i, n = ou.has(String(e.operation ?? "").trim()) ? String(e.operation).trim() : "adjustAmount";
  return {
    id: ne(e.id, foundry.utils.randomID()),
    type: t,
    phase: a,
    selector: ne(e.selector),
    skillKeys: _o(e.skillKeys),
    label: ne(e.label),
    value: le(e.value, 0),
    min: e.min === void 0 || e.min === null || e.min === "" ? null : le(e.min, 0),
    max: e.max === void 0 || e.max === null || e.max === "" ? null : le(e.max, 0),
    pool: ne(e.pool),
    operation: n,
    conditions: Et(e.conditions),
    limit: Yt(e.limit)
  };
}
function Lo(s = {}) {
  const e = ne(s == null ? void 0 : s.selector);
  return e === "intent.skill" || e.startsWith("intent.skill.");
}
function si(s = []) {
  return (Array.isArray(s) ? s : []).map(uu).filter((t) => t.phase && t.type);
}
function nt(s = {}) {
  const e = s && typeof s == "object" ? Us(s) : {}, t = e.positive === !1 ? "negative" : "positive", i = iu.has(String(e.category ?? "").trim()) ? String(e.category).trim() : t, a = su.has(String(e.tier ?? "").trim()) ? String(e.tier).trim() : "minor", n = au.has(String(e.activation ?? "").trim()) ? String(e.activation).trim() : "passive";
  return {
    ...e,
    positive: i === "positive",
    category: i,
    tier: a,
    activation: n,
    tags: _o(e.tags),
    effects: si(e.effects),
    prerequisites: Et(e.prerequisites),
    limits: Yt(e.limits)
  };
}
function $o() {
  return {
    categories: [...In],
    tiers: [...On],
    activations: [...No],
    effectTypes: [...Ro],
    phases: [...Do],
    comparators: [..._n],
    edgeOperations: [...Io]
  };
}
function Cs(s = "") {
  var e;
  return ((e = In.find((t) => t.value === s)) == null ? void 0 : e.label) ?? "Positive";
}
function Ps(s = "") {
  var e;
  return ((e = On.find((t) => t.value === s)) == null ? void 0 : e.label) ?? "Minor";
}
function du(s = "") {
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
function mu(s) {
  return Array.from((s == null ? void 0 : s.items) ?? []).filter((e) => ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === "quality").map((e) => ({
    item: e,
    system: nt(e.system ?? {})
  }));
}
function pu(s = {}, e = {}) {
  const t = Yt(s), i = Yt(e);
  return {
    perActivation: i.perActivation || t.perActivation,
    perRound: i.perRound || t.perRound,
    perScene: i.perScene || t.perScene
  };
}
function xo(s = {}) {
  var a, n, r;
  const e = ne(s.combatId ?? ((a = s.combat) == null ? void 0 : a.id)), t = Math.max(0, Math.trunc(le(s.round ?? ((n = s.combat) == null ? void 0 : n.round), 0))), i = ne(s.sceneId ?? ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id));
  return {
    activationKey: ne(s.activationKey),
    roundKey: e ? `${e}:${t}` : "",
    sceneKey: i
  };
}
function fu(s, e = {}) {
  var n, r, o, l;
  const t = ((n = s == null ? void 0 : s.flags) == null ? void 0 : n[T]) ?? {}, i = ((r = t == null ? void 0 : t.traitUsage) == null ? void 0 : r.scene) ?? {}, a = e.state ?? {};
  return {
    activation: ((o = a == null ? void 0 : a.traitUsage) == null ? void 0 : o.activation) ?? {},
    round: ((l = a == null ? void 0 : a.traitUsage) == null ? void 0 : l.round) ?? {},
    scene: i
  };
}
function hu(s, e, t, i) {
  var a, n, r, o, l;
  switch (t) {
    case "perActivation":
      return Math.max(0, Math.trunc(le((a = s.activation) == null ? void 0 : a[i], 0)));
    case "perRound":
      return Math.max(0, Math.trunc(le((r = (n = s.round) == null ? void 0 : n[e.roundKey]) == null ? void 0 : r[i], 0)));
    case "perScene":
      return Math.max(0, Math.trunc(le((l = (o = s.scene) == null ? void 0 : o[e.sceneKey]) == null ? void 0 : l[i], 0)));
    default:
      return 0;
  }
}
function gu(s, e, t, i) {
  const a = [];
  for (const n of ["perActivation", "perRound", "perScene"]) {
    const r = Math.max(0, Math.trunc(le(t == null ? void 0 : t[n], 0)));
    if (!r) continue;
    hu(s, e, n, i) >= r && a.push(`${n} limit reached`);
  }
  return a;
}
function yu(s, e, t) {
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
function ir(s, e) {
  if (!ne(s == null ? void 0 : s.fact)) return !0;
  const t = foundry.utils.getProperty(e, s.fact);
  return yu(t, s.comparator, s.value);
}
function bu(s = "", e = {}) {
  const t = ne(s);
  return t ? (Array.isArray(e == null ? void 0 : e.selectors) ? e.selectors : []).some(
    (a) => a === t || a.startsWith(`${t}.`)
  ) : !0;
}
function Bo(s, e) {
  return `${s.id}:${e.id}`;
}
function Su(s, e) {
  var t;
  return !!((t = s.system) != null && t.inactive) || !!(e != null && e.inactive);
}
function sr(s = []) {
  return s.map((e) => e.fact).filter(Boolean).join(", ");
}
function Ai(s, e, t) {
  const i = le(s[e], 0);
  let a = i;
  return typeof t.value == "number" && (a += t.value), typeof t.min == "number" && (a = Math.max(t.min, a)), typeof t.max == "number" && (a = Math.min(t.max, a)), s[e] = a, a - i;
}
function Ut(s, e, t, i, a) {
  i && s.push({
    id: `trait:${a}:${e.id}:${t.id}`,
    label: t.label || e.name,
    value: i,
    source: e.name,
    traitItemId: e.id,
    traitEffectId: t.id
  });
}
function Au({ item: s, effect: e, phase: t, packet: i, result: a }) {
  switch (e.type) {
    case "rollMod": {
      const n = le(e.value, 0);
      return Ut(a.modifiers, s, e, n, t), n;
    }
    case "burnAdjust": {
      if (t === "onEndOfActivation") {
        const r = Ai(i, "burnDelta", e);
        return Ut(a.modifiers, s, e, r, t), r;
      }
      const n = Ai(i, "amount", e);
      return Ut(a.modifiers, s, e, n, t), n;
    }
    case "actionCostMod": {
      const n = Ai(i, "cost", e);
      return Ut(a.modifiers, s, e, n, t), n;
    }
    case "initiativeMod": {
      const n = Ai(i, "total", e);
      return Ut(a.modifiers, s, e, n, t), n;
    }
    case "damageMod": {
      const n = Ai(i, "amount", e);
      return Ut(a.modifiers, s, e, n, t), n;
    }
    case "edgeEvent": {
      if (t === "onEndOfActivation" && e.operation === "grantPool" && e.pool)
        return i.edgeAdjustments ?? (i.edgeAdjustments = []), i.edgeAdjustments.push({
          poolKey: e.pool,
          amount: le(e.value, 0),
          label: e.label || s.name,
          source: s.name
        }), Ut(a.modifiers, s, e, le(e.value, 0), t), le(e.value, 0);
      const n = Ai(i, "amount", e);
      return Ut(a.modifiers, s, e, n, t), n;
    }
    default:
      return 0;
  }
}
function wu(s, e, t) {
  const i = Bo(s, e), a = [];
  return t.perActivation > 0 && a.push({ kind: "usage", scope: "perActivation", key: i, delta: 1 }), t.perRound > 0 && a.push({ kind: "usage", scope: "perRound", key: i, delta: 1 }), t.perScene > 0 && a.push({ kind: "usage", scope: "perScene", key: i, delta: 1 }), a;
}
function Tu(s = "") {
  const e = ne(s);
  return e ? [`action.${e}`] : [];
}
function gi(s, e = {}) {
  var n, r, o, l;
  const t = e.snapshot ?? null, i = e.state ?? (t == null ? void 0 : t.state) ?? {};
  return {
    activation: {
      moved: (Array.isArray(i == null ? void 0 : i.actionLog) ? i.actionLog.map((c) => ne(c == null ? void 0 : c.id)).filter(Boolean) : []).includes("move"),
      saSpent: Math.max(0, Math.trunc(le(i == null ? void 0 : i.saSpentThisActivation, 0))),
      attacksThisActivation: Math.max(0, Math.trunc(le(i == null ? void 0 : i.attacksThisActivation, 0))),
      burnThisActivation: Math.max(0, Math.trunc(le(i == null ? void 0 : i.burnThisActivation, 0)))
    },
    burn: {
      current: Math.max(0, Math.trunc(le((r = (n = s == null ? void 0 : s.system) == null ? void 0 : n.burn) == null ? void 0 : r.value, 0))),
      overloaded: !!((l = (o = s == null ? void 0 : s.system) == null ? void 0 : o.burn) != null && l.overloaded)
    },
    timing: {
      firstAttackThisActivation: Math.max(0, Math.trunc(le(i == null ? void 0 : i.attacksThisActivation, 0))) === 0,
      firstExtraSAThisActivation: Math.max(0, Math.trunc(le(i == null ? void 0 : i.saSpentThisActivation, 0))) <= 3
    },
    selectors: []
  };
}
function Ln({ actor: s, resolved: e, payload: t, runtime: i = {} } = {}) {
  var d, m, p, f, h, g, y, b, S, w, E, I;
  const a = gi(s, i), n = ne((e == null ? void 0 : e.intent) ?? (t == null ? void 0 : t.intent), "skill"), r = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [], o = ne(((d = e == null ? void 0 : e.attack) == null ? void 0 : d.rangeBand) ?? (t == null ? void 0 : t.rangeBand)), l = ne(((p = (m = t == null ? void 0 : t.edge) == null ? void 0 : m.pre) == null ? void 0 : p.poolKey) ?? ((f = t == null ? void 0 : t.edge) == null ? void 0 : f.poolKey) ?? ""), c = ne(
    ((h = e == null ? void 0 : e.data) == null ? void 0 : h.skillKey) ?? ((g = e == null ? void 0 : e.specialization) == null ? void 0 : g.skillKey) ?? (n === "skill" ? t == null ? void 0 : t.key : "")
  ), u = ne(
    ((S = (b = (y = e == null ? void 0 : e.breakdown) == null ? void 0 : y.find) == null ? void 0 : b.call(y, (N) => (N == null ? void 0 : N.id) === "skill")) == null ? void 0 : S.label) ?? (e == null ? void 0 : e.title)
  );
  return a.intent = n, a.domains = r, a.rangeBand = o, a.skill = {
    key: c,
    label: u
  }, a.edge = {
    stage: (w = t == null ? void 0 : t.toggles) != null && w.useEdge ? "pre" : "",
    pool: l,
    spent: !!((E = t == null ? void 0 : t.toggles) != null && E.useEdge)
  }, a.selectors.push(`intent.${n}`), r.forEach((N) => a.selectors.push(`domain.${N}`)), o && a.selectors.push(`range.${o}`), n === "skill" && c && a.selectors.push(`skill.${c}`), (I = t == null ? void 0 : t.toggles) != null && I.useEdge && a.selectors.push("edge.pre"), a;
}
function Fo({ actor: s, packet: e = {}, runtime: t = {} } = {}) {
  const i = gi(s, t);
  return i.action = {
    id: ne(e.actionId),
    resource: ne(e.resource),
    cost: le(e.cost, 0)
  }, i.selectors.push(...Tu(e.actionId)), i;
}
function Ha({ actor: s, packet: e = {}, runtime: t = {} } = {}) {
  const i = gi(s, t);
  return i.action = {
    id: ne(e.actionId),
    resource: ne(e.resource)
  }, i.burn = {
    ...i.burn,
    amount: le(e.amount, 0),
    source: ne(e.source)
  }, e.source === "extraSA" && e.extraSaIndex === 1 && i.selectors.push("activation.extraSA:first"), e.source && i.selectors.push(`burn.${e.source}`), i;
}
function zo({ actor: s, packet: e = {}, runtime: t = {} } = {}) {
  const i = gi(s, t);
  return i.intent = "initiative", i.domains = ["combat"], i.initiative = {
    total: le(e.total, 0)
  }, i.selectors.push("intent.initiative"), i;
}
function Uo({ actor: s, packet: e = {}, runtime: t = {} } = {}) {
  const i = gi(s, t);
  return i.damage = {
    amount: le(e.amount, 0),
    track: ne(e.track),
    damageType: ne(e.damageType)
  }, i.selectors.push("incoming"), i;
}
function ja({ actor: s, packet: e = {}, phase: t = "onEdgeGain", runtime: i = {} } = {}) {
  const a = gi(s, i);
  return a.edge = {
    pool: ne(e.poolKey),
    amount: le(e.amount, 0),
    eventKey: ne(e.eventKey),
    source: ne(e.source)
  }, a.selectors.push(t === "onEdgeSpend" ? "edge.spend" : "edge.gain"), a.edge.eventKey && a.selectors.push(`event.${a.edge.eventKey}`), a;
}
function Wo({ actor: s, packet: e = {}, runtime: t = {} } = {}) {
  const i = gi(s, t);
  return i.event = {
    phase: "endOfActivation"
  }, i.selectors.push("endOfActivation"), le(e.burnDelta, 0) !== 0 && i.selectors.push("burn.adjust"), i;
}
function rt({ actor: s, phase: e, facts: t = {}, packet: i = {}, options: a = {} } = {}) {
  var u;
  const n = {
    packet: Us(i),
    modifiers: [],
    mutations: [],
    applied: [],
    skipped: []
  };
  if (!s || !Oo.has(String(e ?? "").trim()))
    return n;
  const r = a.runtime ?? {}, o = fu(s, r), l = xo(r), c = mu(s);
  for (const { item: d, system: m } of c) {
    if (Su(d, m)) {
      n.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: "Trait is inactive"
      });
      continue;
    }
    const p = m.prerequisites.filter((f) => ne(f == null ? void 0 : f.fact)).filter((f) => !ir(f, t));
    if (p.length) {
      n.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: `Prerequisites not met: ${sr(p)}`
      });
      continue;
    }
    for (const f of m.effects.filter((h) => h.phase === e)) {
      if (!bu(f.selector, t)) {
        n.skipped.push({
          traitItemId: d.id,
          traitEffectId: f.id,
          label: f.label || d.name,
          reason: `Selector did not match (${f.selector || "any"})`
        });
        continue;
      }
      if (Lo(f) && f.skillKeys.length) {
        const w = ne((u = t == null ? void 0 : t.skill) == null ? void 0 : u.key);
        if (!w || !f.skillKeys.includes(w)) {
          n.skipped.push({
            traitItemId: d.id,
            traitEffectId: f.id,
            label: f.label || d.name,
            reason: `Skill did not match (${f.skillKeys.join(", ")})`
          });
          continue;
        }
      }
      const h = f.conditions.filter((w) => ne(w == null ? void 0 : w.fact)).filter((w) => !ir(w, t));
      if (h.length) {
        n.skipped.push({
          traitItemId: d.id,
          traitEffectId: f.id,
          label: f.label || d.name,
          reason: `Conditions not met: ${sr(h)}`
        });
        continue;
      }
      const g = pu(m.limits, f.limit), y = Bo(d, f), b = gu(o, l, g, y);
      if (b.length) {
        n.skipped.push({
          traitItemId: d.id,
          traitEffectId: f.id,
          label: f.label || d.name,
          reason: b.join(", ")
        });
        continue;
      }
      const S = Au({
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
        value: S,
        phase: e,
        source: d.name
      }), a.consumeUsage && n.mutations.push(...wu(d, f, g));
    }
  }
  return n;
}
async function Xt({ actor: s, mutations: e = [], runtime: t = {} } = {}) {
  var o, l, c, u, d, m, p, f, h;
  if (!s || !Array.isArray(e) || !e.length) return;
  const i = e.filter((g) => (g == null ? void 0 : g.kind) === "usage");
  if (!i.length) return;
  const a = Us(((c = (l = (o = s.flags) == null ? void 0 : o[T]) == null ? void 0 : l.traitUsage) == null ? void 0 : c.scene) ?? {}), n = t.state ? Us(t.state) : null, r = xo(t);
  for (const g of i) {
    const y = ne(g.key), b = Math.max(0, Math.trunc(le(g.delta, 0)));
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
          a[f = r.sceneKey] ?? (a[f] = {}), a[r.sceneKey][y] = Math.max(0, le(a[r.sceneKey][y], 0) + b);
          break;
        }
      }
  }
  n && ((h = t.combatant) != null && h.id) && await t.combatant.setFlag(T, "personalCombat", n), await s.setFlag(T, "traitUsage", { scene: a });
}
const wi = "mwd", Ti = "personalCombat", Ht = 3, ku = 1, Mu = 1;
function fs(s, e) {
  return !(s != null && s.activation) || !e ? !1 : s.activation.combatId === e.combatId && Number(s.activation.round ?? -1) === Number(e.round ?? -1) && Number(s.activation.turn ?? -1) === Number(e.turn ?? -1) && s.activation.combatantId === e.combatantId;
}
function qa(s = null) {
  return {
    saRemaining: Ht,
    faRemaining: ku,
    raRemaining: Mu,
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
function hs(s, e = null) {
  return foundry.utils.mergeObject(
    qa(e),
    foundry.utils.deepClone(s ?? {}),
    { inplace: !1, overwrite: !0 }
  );
}
function ga(s) {
  return Array.isArray(s) ? s.map((e) => {
    const t = String((e == null ? void 0 : e.label) ?? "").trim();
    return t ? {
      id: String((e == null ? void 0 : e.id) ?? "").trim(),
      label: t,
      costLabel: String((e == null ? void 0 : e.costLabel) ?? "").trim()
    } : null;
  }).filter(Boolean) : [];
}
function vu(s) {
  const e = (CONFIG.statusEffects ?? []).find((i) => String((i == null ? void 0 : i.id) ?? "").trim() === s), t = String((e == null ? void 0 : e.name) ?? (e == null ? void 0 : e.label) ?? s ?? "").trim();
  return Co(t);
}
function ki(s) {
  const e = Number(s);
  return !Number.isFinite(e) || e === 0 ? "0" : e > 0 ? `+${e}` : String(e);
}
function Eu(s) {
  if (typeof s == "number") return Number.isFinite(s) ? s : 0;
  const e = String(s ?? "").trim().match(/[-+]?\d+(\.\d+)?/);
  return e ? Number(e[0]) : 0;
}
function ar(s) {
  var o;
  const e = (s == null ? void 0 : s.document) ?? s ?? null, t = (s == null ? void 0 : s.object) ?? (e == null ? void 0 : e.object) ?? s ?? null, i = String((e == null ? void 0 : e.id) ?? "").trim(), a = de._pendingTokenPositions.get(i) ?? null, n = Number((a == null ? void 0 : a.x) ?? (e == null ? void 0 : e.x)), r = Number((a == null ? void 0 : a.y) ?? (e == null ? void 0 : e.y));
  if (t && Number.isFinite(n) && Number.isFinite(r)) {
    if (typeof t.getCenterPoint == "function")
      return t.getCenterPoint({ x: n, y: r });
    if (typeof t.getCenter == "function")
      return t.getCenter(n, r);
  }
  return (t == null ? void 0 : t.center) ?? ((o = e == null ? void 0 : e.object) == null ? void 0 : o.center) ?? null;
}
function Cu(s, e = "") {
  if (!Number.isFinite(s)) return "";
  const t = Math.round(s * 10) / 10, i = Number.isInteger(t) ? String(t) : t.toFixed(1);
  return e ? `${i} ${e}` : i;
}
class de {
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
    var i, a, n, r;
    const t = this._asTokenDocument(e);
    return ((i = t == null ? void 0 : t.parent) == null ? void 0 : i.id) ?? ((a = t == null ? void 0 : t.scene) == null ? void 0 : a.id) ?? ((r = (n = t == null ? void 0 : t.object) == null ? void 0 : n.scene) == null ? void 0 : r.id) ?? null;
  }
  static _getSceneTokenDocumentById(e, t = ((i) => (i = canvas == null ? void 0 : canvas.scene) == null ? void 0 : i.id)()) {
    var r, o, l, c, u;
    const a = String(e ?? "").trim();
    if (!a || !t) return null;
    const n = ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id) === t ? canvas.scene : (l = (o = game.scenes) == null ? void 0 : o.get) == null ? void 0 : l.call(o, t);
    return ((u = (c = n == null ? void 0 : n.tokens) == null ? void 0 : c.get) == null ? void 0 : u.call(c, a)) ?? null;
  }
  static _collectActorIds(e, t = null) {
    var r, o;
    const i = /* @__PURE__ */ new Set(), a = (l) => {
      const c = String(l ?? "").trim();
      c && i.add(c);
    };
    a(e == null ? void 0 : e.id), a(e == null ? void 0 : e._id);
    const n = this._asTokenDocument(t) ?? this._asTokenDocument(e == null ? void 0 : e.token);
    return a((r = n == null ? void 0 : n.actor) == null ? void 0 : r.id), a((o = n == null ? void 0 : n.baseActor) == null ? void 0 : o.id), a(n == null ? void 0 : n.actorId), i;
  }
  static _tokenDocumentMatchesActor(e, t, i = null) {
    var r, o;
    const a = this._asTokenDocument(e);
    if (!a || !t) return !1;
    const n = i ?? this._collectActorIds(t, a);
    return [
      (r = a == null ? void 0 : a.actor) == null ? void 0 : r.id,
      (o = a == null ? void 0 : a.baseActor) == null ? void 0 : o.id,
      a == null ? void 0 : a.actorId
    ].some((l) => n.has(String(l ?? "").trim()));
  }
  static getPreferredTokenDocument(e) {
    var a, n;
    if (!e) return null;
    const t = this._asTokenDocument(e == null ? void 0 : e.token);
    return t || (((n = (((a = e.getActiveTokens) == null ? void 0 : a.call(e, !0, !0)) ?? [])[0]) == null ? void 0 : n.document) ?? null);
  }
  static getPreferredToken(e) {
    const t = this.getPreferredTokenDocument(e);
    return t ? t.object ?? this._getSceneTokenById(t.id) : null;
  }
  static getCurrentSceneTokenDocument(e, t = null) {
    var f, h, g, y;
    const i = (f = canvas == null ? void 0 : canvas.scene) == null ? void 0 : f.id, a = this._asTokenDocument(t);
    if (this._getTokenSceneId(a) === i) return a;
    const n = String((a == null ? void 0 : a.id) ?? (t == null ? void 0 : t.id) ?? "").trim();
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
      var S, w;
      return ((w = (S = b == null ? void 0 : b.document) == null ? void 0 : S.parent) == null ? void 0 : w.id) === i;
    })) == null ? void 0 : g.document) ?? null;
    if (c) return c;
    const u = Array.from(((y = canvas == null ? void 0 : canvas.scene) == null ? void 0 : y.tokens) ?? []), d = this._collectActorIds(e, r), m = u.filter((b) => this._tokenDocumentMatchesActor(b, e, d));
    return m.find((b) => {
      var S, w, E;
      return ((S = b == null ? void 0 : b.combatant) == null ? void 0 : S.id) === ((E = (w = game.combat) == null ? void 0 : w.combatant) == null ? void 0 : E.id);
    }) ?? null ?? m[0] ?? null;
  }
  static getCurrentSceneToken(e, t = null) {
    const i = this.getCurrentSceneTokenDocument(e, t);
    return i ? i.object ?? this._getSceneTokenById(i.id) : null;
  }
  static _getSceneTokenById(e) {
    var t, i, a, n;
    return e ? ((i = (t = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : t.get) == null ? void 0 : i.call(t, e)) ?? ((n = (a = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : a.placeables) == null ? void 0 : n.find((r) => r.id === e)) ?? null : null;
  }
  static _measureTokenDistance(e, t) {
    var o, l;
    const i = canvas == null ? void 0 : canvas.grid, a = ar(e), n = ar(t);
    if (!i || !a || !n) return null;
    if (typeof i.measurePath == "function")
      try {
        const c = i.measurePath([a, n], { gridSpaces: !0 }), u = Number(
          (c == null ? void 0 : c.distance) ?? (c == null ? void 0 : c.cost) ?? (c == null ? void 0 : c.totalDistance) ?? (c == null ? void 0 : c.totalCost) ?? NaN
        );
        if (Number.isFinite(u)) return u;
      } catch {
      }
    const r = ((l = (o = foundry == null ? void 0 : foundry.canvas) == null ? void 0 : o.geometry) == null ? void 0 : l.Ray) ?? globalThis.Ray;
    if (typeof i.measureDistances == "function" && typeof r == "function")
      try {
        const c = i.measureDistances([{ ray: new r(a, n) }], { gridSpaces: !0 }), u = Number(Array.isArray(c) ? c[0] : NaN);
        if (Number.isFinite(u)) return u;
      } catch {
        return null;
      }
    return null;
  }
  static getUserTargetTokens(e = game.user) {
    var a;
    const i = (Array.isArray((a = e == null ? void 0 : e.targets) == null ? void 0 : a.ids) ? e.targets.ids : []).map((n) => this._getSceneTokenById(n)).filter(Boolean);
    return i.length ? i : Array.from((e == null ? void 0 : e.targets) ?? []).map((n) => (n == null ? void 0 : n.object) ?? n).filter(Boolean);
  }
  static getTargetingSnapshot(e = null, t = game.user) {
    var u, d, m, p, f, h, g, y;
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
    const n = i[0], r = this._measureTokenDistance(e, n), o = String(((d = (u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.grid) == null ? void 0 : d.units) ?? ((p = (m = game.system) == null ? void 0 : m.grid) == null ? void 0 : p.units) ?? "").trim(), l = Cu(r, o), c = String((n == null ? void 0 : n.name) ?? ((f = n == null ? void 0 : n.actor) == null ? void 0 : f.name) ?? "Target").trim() || "Target";
    return {
      count: a,
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
    const t = (Array.isArray(e) ? e : []).map((a) => {
      const n = Eu((a == null ? void 0 : a.numericValue) ?? (a == null ? void 0 : a.value) ?? 0);
      return {
        label: String((a == null ? void 0 : a.label) ?? "").trim() || "Modifier",
        numericValue: n,
        value: String((a == null ? void 0 : a.value) ?? ki(n)).trim() || ki(n)
      };
    }), i = t.reduce((a, n) => a + n.numericValue, 0);
    return {
      total: i,
      totalLabel: ki(i),
      entries: t
    };
  }
  static getCombat(e, t = null) {
    var m, p, f, h;
    const i = (m = canvas == null ? void 0 : canvas.scene) == null ? void 0 : m.id, a = game.combat, n = this.getCurrentSceneTokenDocument(e, t), r = (n == null ? void 0 : n.object) ?? this._getSceneTokenById((n == null ? void 0 : n.id) ?? null);
    if (!a || ((p = a.scene) == null ? void 0 : p.id) !== i)
      return {
        combat: null,
        combatant: null,
        token: r,
        tokenDocument: n
      };
    let o = ((h = (f = n == null ? void 0 : n.combatant) == null ? void 0 : f.combat) == null ? void 0 : h.id) === a.id ? n.combatant : null;
    const l = Array.from(a.combatants ?? []);
    if (!o) {
      const g = this._collectActorIds(e, n), y = l.filter((w) => {
        const E = String((w == null ? void 0 : w.tokenId) ?? "").trim();
        if (n && E === String(n.id ?? "").trim() || g.has(String((w == null ? void 0 : w.actorId) ?? "").trim())) return !0;
        const I = this._asTokenDocument(w == null ? void 0 : w.token) ?? this._getSceneTokenDocumentById(E, i);
        return this._tokenDocumentMatchesActor(I, e, g);
      }), b = y.find((w) => {
        var E;
        return w.id === ((E = a == null ? void 0 : a.combatant) == null ? void 0 : E.id);
      }) ?? null, S = y.find(
        (w) => n && String((w == null ? void 0 : w.tokenId) ?? "").trim() === String(n.id ?? "").trim()
      ) ?? null;
      o = b ?? S ?? y[0] ?? null;
    }
    !o && l.length === 1 && (r || e) && (o = l[0]);
    const c = this._asTokenDocument(o == null ? void 0 : o.token) ?? this._getSceneTokenDocumentById((o == null ? void 0 : o.tokenId) ?? null, i), u = n ?? c ?? null, d = r ?? (c == null ? void 0 : c.object) ?? this._getSceneTokenById((o == null ? void 0 : o.tokenId) ?? null) ?? null;
    return {
      combat: a,
      combatant: o,
      token: d,
      tokenDocument: u
    };
  }
  static getSnapshot(e, { token: t = null } = {}) {
    var w, E, I, N, L;
    const {
      combat: i,
      combatant: a,
      token: n,
      tokenDocument: r
    } = this.getCombat(e, t), o = !!a && ((w = i == null ? void 0 : i.combatant) == null ? void 0 : w.id) === a.id, l = a ? this.getActivationIdentity(i, a) : null, c = a ? a.getFlag(wi, Ti) : null, u = a && o && fs(c, l) ? hs(c, l) : qa(l);
    u.actionLog = ga(u.actionLog);
    const d = Math.max(0, Number(((I = (E = e == null ? void 0 : e.system) == null ? void 0 : E.burn) == null ? void 0 : I.value) ?? 0)), m = Math.floor(d / 2), p = !!((L = (N = e == null ? void 0 : e.system) == null ? void 0 : N.burn) != null && L.overloaded), f = this.getActiveStatuses(e), h = f.filter((Y) => !(p && Y.id === "overloaded")), g = this.getModifierSummary(e, m), y = this.getRollImpact(g), b = Math.max(0, Number(u.burnThisActivation ?? 0)), S = a ? o ? "" : "Waiting for this combatant's activation." : "No combatant on the current scene.";
    return {
      token: n,
      tokenDocument: r,
      combat: i,
      combatant: a,
      hasCombatant: !!a,
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
      summaryText: `SA: ${u.saRemaining} / ${Ht}   FA: ${u.faRemaining}   RA: ${u.raRemaining}`,
      activation: {
        burnThisActivation: b,
        burnThisActivationLabel: `+${b}`,
        items: [
          { label: "SA", value: `${u.saRemaining}/${Ht}` },
          { label: "FA", value: String(u.faRemaining) },
          { label: "RA", value: String(u.raRemaining) },
          { label: "Burn", value: `+${b}`, detail: "this activation" }
        ]
      },
      inactiveReason: S,
      modifierSummary: g
    };
  }
  static getModifierSummary(e, t = Math.floor(Number(((a) => (a = ((i) => (i = e == null ? void 0 : e.system) == null ? void 0 : i.burn)()) == null ? void 0 : a.value)() ?? 0) / 2)) {
    var c, u;
    const n = ((u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.derived) == null ? void 0 : u.condition) ?? {}, r = [];
    t > 0 && r.push({
      label: "Burn Penalty",
      numericValue: -t,
      value: ki(-t)
    });
    const o = Number(n.fatiguePenalty ?? 0);
    o && r.push({
      label: "Fatigue",
      numericValue: o,
      value: ki(o)
    });
    const l = Number(n.physicalPenalty ?? 0);
    return l && r.push({
      label: "Physical",
      numericValue: l,
      value: ki(l)
    }), r.length || r.push({
      label: "Current Modifiers",
      numericValue: 0,
      value: "0"
    }), r;
  }
  static getActiveStatuses(e) {
    return Array.from((e == null ? void 0 : e.statuses) ?? []).map((i) => ({
      id: i,
      label: vu(i)
    })).sort((i, a) => i.label.localeCompare(a.label));
  }
  static buildActionModel(e, t) {
    var h, g, y;
    const i = t.hasCombatant ? "" : "No current-scene combatant.", a = t.isCurrentTurn ? "" : "Only during your activation.", n = t.overloaded ? "Overloaded: only Burn recovery is allowed." : "", r = nr(e, t), o = i || a || n, l = [
      { id: "move", label: "Move", resource: "sa", cost: 1, supported: !0 },
      { id: "aim", label: "Aim", resource: "sa", cost: 1, supported: !0 },
      { id: "reload", label: "Reload", resource: "sa", cost: 1, supported: !0 },
      { id: "assist", label: "Assist", resource: "sa", cost: 1, supported: !0 },
      { id: "stand", label: "Stand", resource: "sa", cost: 1, supported: !0 }
    ].map((b) => this._buildSpendAction(
      t,
      b,
      o || (r < b.cost ? "Activation SA cap reached." : "")
    )), c = i || a || n || (r < 2 ? "Activation SA cap reached." : ""), u = [
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
    ].map((b) => b.handler ? b : this._buildStubAction(b)), d = i || a || (r <= 0 ? "Activation SA cap reached." : "") || (t.burn.value <= 0 ? "Burn is already at 0." : ""), m = i || a || (t.burn.canOverloadCheck ? "" : t.overloaded ? "Already Overloaded." : "Burn below 6."), p = i || a, f = (b) => {
      const S = Dn(b), w = Xc(b);
      return !w || !S ? null : {
        id: b,
        label: S.label,
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
        f("composure"),
        f("judgeIntent"),
        f("memory"),
        f("lift"),
        f("endure")
      ].filter(Boolean),
      summaryPills: [
        { label: "SA", value: `${t.state.saRemaining}/${Ht}` },
        { label: "Cap", value: `${Math.max(0, Number(((h = t.state) == null ? void 0 : h.saSpentThisActivation) ?? 0))}/${Ga(e)}` },
        { label: "FA", value: `${t.state.faRemaining}` },
        { label: "RA", value: `${t.state.raRemaining}` },
        { label: "Burn/Turn", value: `+${Math.max(0, Number(((g = t.state) == null ? void 0 : g.burnThisActivation) ?? 0))}` }
      ],
      activationLog: ga((y = t.state) == null ? void 0 : y.actionLog).map((b, S) => ({
        ...b,
        index: S + 1
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
            }, p),
            this._buildSpendAction(t, {
              id: "spendRA",
              label: "Spend RA",
              resource: "ra",
              cost: 1,
              supported: !0
            }, p)
          ]
        }
      ]
    };
  }
  static _buildSpendAction(e, t, i = "") {
    var l;
    const a = Number(((l = e.state) == null ? void 0 : l[`${t.resource}Remaining`]) ?? 0), n = t.resource === "sa" ? "" : a < t.cost ? `No ${String(t.resource).toUpperCase()} remaining.` : "", r = i || n, o = this._formatCostLabel(t.resource, t.cost);
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
  static _appendActionLog(e, { id: t = "", label: i = "", costLabel: a = "" } = {}) {
    const n = String(i ?? "").trim();
    if (!n) return;
    const r = ga(e == null ? void 0 : e.actionLog);
    r.push({
      id: String(t ?? "").trim(),
      label: n,
      costLabel: String(a ?? "").trim()
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
    const i = this.getActivationIdentity(e, t), a = t.getFlag(wi, Ti);
    fs(a, i) || await t.setFlag(wi, Ti, qa(i));
  }
  static async spendResource(e, {
    token: t = null,
    resource: i = "sa",
    cost: a = 1,
    actionId: n = "",
    actionLabel: r = "",
    actionCostLabel: o = ""
  } = {}) {
    var b, S, w, E, I, N, L;
    const l = this.getSnapshot(e, { token: t });
    if (!l.hasCombatant)
      return { ok: !1, reason: "No combatant on the current scene." };
    if (!l.isCurrentTurn)
      return { ok: !1, reason: "Only available during your activation." };
    const c = {
      combat: l.combat,
      combatant: l.combatant,
      state: hs(l.state, this.getActivationIdentity(l.combat, l.combatant)),
      sceneId: ((b = canvas == null ? void 0 : canvas.scene) == null ? void 0 : b.id) ?? "",
      snapshot: l
    };
    let u = Math.max(0, Number(a ?? 0) || 0);
    const d = rt({
      actor: e,
      phase: "onBeforeActionCostFinalized",
      facts: Fo({
        actor: e,
        packet: { actionId: n, resource: i, cost: u },
        runtime: c
      }),
      packet: { actionId: n, resource: i, cost: u },
      options: { runtime: c, consumeUsage: !0 }
    });
    u = Math.max(0, Number(d.packet.cost ?? u) || 0), c.pendingMutations = (c.pendingMutations ?? []).concat(d.mutations);
    const m = `${i}Remaining`, p = Number(((S = l.state) == null ? void 0 : S[m]) ?? 0);
    if (i !== "sa" && p < u)
      return { ok: !1, reason: `No ${String(i).toUpperCase()} remaining.` };
    const f = c.state, h = i === "sa" ? Ga(e) : 0, g = Math.max(0, Number(((w = l.state) == null ? void 0 : w.saSpentThisActivation) ?? 0) || 0);
    if (i === "sa" && g + u > h)
      return { ok: !1, reason: "Activation SA cap reached." };
    f[m] = Math.max(0, p - u), i === "sa" && (f.saSpentThisActivation = g + u, n === "attack" && (f.attacksThisActivation = Number(f.attacksThisActivation ?? 0) + 1)), this._appendActionLog(f, {
      id: n,
      label: r,
      costLabel: o || this._formatCostLabel(i, u)
    });
    let y = 0;
    if (i === "sa") {
      const Y = Math.max(0, g - Ht), Q = Math.max(0, f.saSpentThisActivation - Ht), G = Math.max(0, Number(((E = l.state) == null ? void 0 : E.attacksThisActivation) ?? 0) || 0), H = Math.max(0, Number(f.attacksThisActivation ?? 0) || 0);
      for (let D = Y + 1; D <= Q; D += 1) {
        const V = rt({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: Ha({
            actor: e,
            packet: {
              actionId: n,
              resource: i,
              amount: 1,
              source: "extraSA",
              extraSaIndex: D
            },
            runtime: c
          }),
          packet: {
            actionId: n,
            resource: i,
            amount: 1,
            source: "extraSA",
            extraSaIndex: D
          },
          options: { runtime: c, consumeUsage: !0 }
        });
        c.pendingMutations = (c.pendingMutations ?? []).concat(V.mutations), y += Math.max(0, Number(V.packet.amount ?? 0) || 0);
      }
      for (let D = G + 1; D <= H; D += 1) {
        if (D <= 1) continue;
        const V = rt({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: Ha({
            actor: e,
            packet: {
              actionId: n,
              resource: i,
              amount: 1,
              source: "attack"
            },
            runtime: c
          }),
          packet: {
            actionId: n,
            resource: i,
            amount: 1,
            source: "attack",
            attackIndex: D
          },
          options: { runtime: c, consumeUsage: !0 }
        });
        c.pendingMutations = (c.pendingMutations ?? []).concat(V.mutations), y += Math.max(0, Number(V.packet.amount ?? 0) || 0);
      }
      f.burnThisActivation = Math.max(0, Number(f.burnThisActivation ?? 0) + y);
    }
    return (I = c.pendingMutations) != null && I.length ? await Xt({
      actor: e,
      mutations: c.pendingMutations,
      runtime: {
        ...c,
        state: f
      }
    }) : await l.combatant.setFlag(wi, Ti, f), y > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((L = (N = e.system) == null ? void 0 : N.burn) == null ? void 0 : L.value) ?? 0) + y) }), { ok: !0, snapshot: this.getSnapshot(e, { token: l.token }) };
  }
  static async reduceBurn(e, { token: t = null } = {}) {
    var o, l, c, u;
    const i = this.getSnapshot(e, { token: t });
    if (!i.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!i.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (nr(e, i) <= 0) return { ok: !1, reason: "Activation SA cap reached." };
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
    const n = Math.max(0, Number(((l = (o = e.system) == null ? void 0 : o.burn) == null ? void 0 : l.value) ?? 0) - 1), r = { "system.burn.value": n };
    return n === 0 && ((u = (c = e.system) == null ? void 0 : c.burn) != null && u.overloaded) && (r["system.burn.overloaded"] = !1), await e.update(r), { ok: !0, snapshot: this.getSnapshot(e, { token: i.token }) };
  }
  static async finalizeActivation(e, t) {
    var m, p, f, h, g, y, b, S;
    if (!game.user.isGM || !t || !e) return;
    const i = ((p = (m = e.combatants) == null ? void 0 : m.get) == null ? void 0 : p.call(m, t)) ?? null, a = (i == null ? void 0 : i.actor) ?? null;
    if (!i || !a) return;
    const n = i.getFlag(wi, Ti), r = fs(n, this.getActivationIdentity(e, i)) ? hs(n, this.getActivationIdentity(e, i)) : hs(n), l = {
      burnDelta: Number(r.saSpentThisActivation ?? 0) <= Ht && Number(r.burnThisActivation ?? 0) <= 0 && Number(r.reactionBurnSinceLastActivation ?? 0) <= 0 ? -2 : 0,
      edgeAdjustments: []
    }, c = {
      combat: e,
      combatant: i,
      state: r,
      sceneId: ((f = e.scene) == null ? void 0 : f.id) ?? ((h = canvas == null ? void 0 : canvas.scene) == null ? void 0 : h.id) ?? ""
    }, u = rt({
      actor: a,
      phase: "onEndOfActivation",
      facts: Wo({ actor: a, packet: l, runtime: c }),
      packet: l,
      options: { runtime: c, consumeUsage: !0 }
    });
    await Xt({ actor: a, mutations: u.mutations, runtime: c });
    const d = Number(u.packet.burnDelta ?? l.burnDelta) || 0;
    if (d) {
      const w = Math.max(0, Number(((y = (g = a.system) == null ? void 0 : g.burn) == null ? void 0 : y.value) ?? 0) + d), E = { "system.burn.value": w };
      w === 0 && ((S = (b = a.system) == null ? void 0 : b.burn) != null && S.overloaded) && (E["system.burn.overloaded"] = !1), await a.update(E);
    }
    for (const w of u.packet.edgeAdjustments ?? []) {
      const E = Number((w == null ? void 0 : w.amount) ?? 0) || 0;
      !E || !(w != null && w.poolKey) || (E > 0 ? await a.gainEdge(w.poolKey, E, { skipTraitHooks: !0, source: "endOfActivationTrait" }) : await a.spendEdge(w.poolKey, Math.abs(E), { skipTraitHooks: !0, source: "endOfActivationTrait" }));
    }
  }
  static async _onUpdateCombat(e, t) {
    if (Object.prototype.hasOwnProperty.call(t ?? {}, "turn") || Object.prototype.hasOwnProperty.call(t ?? {}, "round")) {
      const a = this._lastActivationByCombat.get(e == null ? void 0 : e.id) ?? null, n = typeof a == "string" ? a : (a == null ? void 0 : a.combatantId) ?? null, r = this.getActivationIdentity(e, e == null ? void 0 : e.combatant), o = a && typeof a == "object" ? !fs(a, r) : n && n !== r.combatantId;
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
    foundry.utils.hasProperty(t, `flags.${wi}.${Ti}`) && this.renderOpenCharacterSheets((i = e == null ? void 0 : e.actor) == null ? void 0 : i.id);
  }
  static _onTargetToken(e, t, i) {
    var a;
    (e == null ? void 0 : e.id) === ((a = game.user) == null ? void 0 : a.id) && this.queueCharacterSheetRefresh();
  }
  static _onUpdateToken(e, t) {
    var n, r;
    if (!["x", "y", "elevation"].some(
      (o) => Object.prototype.hasOwnProperty.call(t ?? {}, o)
    ) || ((n = e == null ? void 0 : e.parent) == null ? void 0 : n.id) !== ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id)) return;
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
      ((a = n == null ? void 0 : n.actor) == null ? void 0 : a.type) === "character" && e.add(n);
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
R(de, "_targetRefreshTimeout", null), R(de, "_pendingTokenPositions", /* @__PURE__ */ new Map()), R(de, "_lastActivationByCombat", /* @__PURE__ */ new Map());
function Ga(s) {
  var i, a, n, r, o, l;
  const e = Math.max(0, Number(((n = (a = (i = s == null ? void 0 : s.system) == null ? void 0 : i.attributes) == null ? void 0 : a.reflexes) == null ? void 0 : n.value) ?? 0) || 0), t = Math.max(0, Number(((l = (o = (r = s == null ? void 0 : s.system) == null ? void 0 : r.attributes) == null ? void 0 : o.willpower) == null ? void 0 : l.value) ?? 0) || 0);
  return Ht + Math.floor((e + t) / 2);
}
function nr(s, e) {
  var t;
  return Math.max(0, Ga(s) - Math.max(0, Number(((t = e == null ? void 0 : e.state) == null ? void 0 : t.saSpentThisActivation) ?? 0) || 0));
}
const Ii = "lifeModuleCatalog", Xs = Object.freeze([
  { moduleType: "faction", label: "Faction" },
  { moduleType: "childhood", label: "Childhood" },
  { moduleType: "higherEducation", label: "Higher Education" },
  { moduleType: "realLife", label: "Real Life" }
]), Pu = Object.freeze(
  Object.fromEntries(Xs.map((s) => [s.moduleType, s.label]))
), Nu = new Set(Xs.map((s) => s.moduleType)), Ru = /* @__PURE__ */ new Set(["skill", "edgePool"]), $n = Object.freeze({
  grit: "Grit",
  chaos: "Chaos",
  insight: "Insight",
  rumor: "Rumor",
  legend: "Legend",
  credibility: "Credibility"
}), Ho = Object.freeze(Object.keys($n)), Du = Object.freeze({
  skill: "Skill",
  edgePool: "Edge Pool"
}), Iu = Object.freeze(Bu()), Ou = Object.freeze(Fu()), _u = /* @__PURE__ */ new Set(["artillery", "gunnery", "piloting", "heavyWeapons"]), Lu = /* @__PURE__ */ new Set([
  "artillery",
  "gunnery",
  "heavyWeapons",
  "meleeCombat",
  "piloting",
  "projectileWeapons",
  "firearms"
]), $u = Object.freeze(
  St.map((s) => s.code).filter((s) => !Lu.has(s))
), xu = Object.freeze(yi([
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
        ...$u.map((s) => ({ type: "skill", value: s })),
        ...Ho.map((s) => ({ type: "edgePool", value: s }))
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
    skillChoices: St.map((s) => s.code).filter((s) => !_u.has(s)),
    excludesAny: [
      "higher-education-military-enlistment",
      "higher-education-military-academy",
      "higher-education-family-training",
      "higher-education-officer-candidate-school"
    ]
  }
], { strict: !1 }));
function Bu() {
  const s = /* @__PURE__ */ new Map();
  for (const e of St) {
    const t = String(e.code ?? "").trim(), i = String(e.label ?? "").trim();
    t && (s.set(t.toLowerCase(), t), i && s.set(i.toLowerCase(), t));
  }
  return s;
}
function Fu() {
  const s = /* @__PURE__ */ new Map();
  for (const [e, t] of Object.entries($n))
    s.set(e.toLowerCase(), e), s.set(t.toLowerCase(), e), s.set(`${t.toLowerCase()} pool`, e);
  return s;
}
function zu(s = []) {
  const e = Array.isArray(s) ? s.filter(Boolean) : [String(s ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid life module data.");
  return t.validationErrors = e, t;
}
function jo(s) {
  return Array.isArray(s) ? s : typeof s == "string" ? s.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
function cs(s) {
  return String(s ?? "").trim().toLowerCase().replace(/['\u2019]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function Zs(s) {
  const e = String(s ?? "").trim();
  return Nu.has(e) ? e : "";
}
function ea(s) {
  const e = String(s ?? "").trim();
  return e ? Iu.get(e.toLowerCase()) ?? "" : "";
}
function Uu(s) {
  const e = String(s ?? "").trim();
  return e ? Ou.get(e.toLowerCase()) ?? "" : "";
}
function Wu(s, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const a = /* @__PURE__ */ new Set(), n = [];
  for (const r of jo(s)) {
    const o = ea(r);
    if (!o) {
      e && t.push(`${i}: unknown skill "${r}".`);
      continue;
    }
    a.has(o) || (a.add(o), n.push(o));
  }
  return n;
}
function rr(s) {
  const e = /* @__PURE__ */ new Set();
  return jo(s).map(cs).filter((t) => !t || e.has(t) ? !1 : (e.add(t), !0));
}
function or(s = [], e = /* @__PURE__ */ new Map()) {
  return s.map((t) => {
    var i;
    return ((i = e.get(t)) == null ? void 0 : i.label) ?? t;
  });
}
function $i(s = {}) {
  return `${s.type}:${s.value}`;
}
function Hu(s) {
  var e;
  return ((e = lt(s)) == null ? void 0 : e.label) ?? s;
}
function qo(s) {
  return $n[s] ?? s;
}
function ju(s) {
  return Du[s] ?? s;
}
function qu(s = {}, { includeTypePrefix: e = !1 } = {}) {
  const t = String((s == null ? void 0 : s.type) ?? "").trim(), i = String((s == null ? void 0 : s.value) ?? "").trim();
  if (!t || !i) return "";
  const a = t === "skill" ? Hu(i) : `${qo(i)} Pool`;
  return e ? `${ju(t)}: ${a}` : a;
}
function ss(s = {}, { includeBonusText: e = !1, includeTypePrefix: t = !1 } = {}) {
  const i = qu(s, { includeTypePrefix: t });
  return i ? e ? s.type === "skill" ? `+1 ${i} rolls` : `+1 ${i}` : i : "";
}
function Gu(s) {
  const e = String(s ?? "").trim(), t = e.indexOf(":");
  return t < 0 ? null : {
    type: e.slice(0, t).trim(),
    value: e.slice(t + 1).trim()
  };
}
function Vu(s, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: a = "Bonus" } = {}) {
  const n = typeof s == "string" ? Gu(s) : s, r = String((n == null ? void 0 : n.type) ?? "").trim(), o = String((n == null ? void 0 : n.value) ?? "").trim();
  if (!Ru.has(r))
    return e && t.push(`${i} ${a}: unknown bonus type "${r || s}".`), null;
  const l = r === "skill" ? ea(o) : Uu(o);
  return l ? {
    type: r,
    value: l
  } : (e && t.push(`${i} ${a}: unknown ${r === "skill" ? "skill" : "edge pool"} "${o}".`), null);
}
function Va(s, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: a = "Bonus" } = {}) {
  const n = /* @__PURE__ */ new Set(), r = [], o = Array.isArray(s) ? s : [];
  for (const l of o) {
    const c = Vu(l, { strict: e, errors: t, prefix: i, grantLabel: a });
    if (!c) continue;
    const u = $i(c);
    n.has(u) || (n.add(u), r.push(c));
  }
  return r;
}
function Go(s, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const a = Wu(s, { strict: e, errors: t, prefix: i });
  return a.length ? [{
    id: "skill",
    label: "",
    choices: a.map((n) => ({ type: "skill", value: n }))
  }] : [];
}
function Ku(s, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const a = String(s ?? "").trim();
  return a ? a.split(";").map((r) => r.trim()).filter(Boolean).map((r, o) => {
    const l = `Bonus ${o + 1}`, c = Va(
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
function Vo(s, e = "grant") {
  return cs(s) || e;
}
function Yu(s, e, { strict: t = !1, errors: i = [], prefix: a = "Entry" } = {}) {
  const n = `grant-${e + 1}`, r = `Bonus ${e + 1}`;
  if (typeof s == "string") {
    const u = Va(
      s.split("|").map((d) => d.trim()).filter(Boolean),
      { strict: t, errors: i, prefix: a, grantLabel: r }
    );
    return u.length ? { id: n, label: "", choices: u } : null;
  }
  const o = Vo(s == null ? void 0 : s.id, n), l = String((s == null ? void 0 : s.label) ?? "").trim(), c = Va(s == null ? void 0 : s.choices, { strict: t, errors: i, prefix: a, grantLabel: r });
  return c.length ? { id: o, label: l, choices: c } : (t && i.push(`${a} ${r}: define at least one bonus choice.`), null);
}
function Qu(s, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  if (Array.isArray(s)) {
    if (s.every((n) => typeof n == "string" && !String(n).includes(":")))
      return Go(s, { strict: e, errors: t, prefix: i });
    const a = /* @__PURE__ */ new Set();
    return s.map((n, r) => Yu(n, r, { strict: e, errors: t, prefix: i })).filter((n) => n ? a.has(n.id) ? (e && t.push(`${i}: duplicate bonus id "${n.id}".`), !1) : (a.add(n.id), !0) : !1);
  }
  return typeof s == "string" ? Ku(s, { strict: e, errors: t, prefix: i }) : [];
}
function Ju(s = []) {
  return (Array.isArray(s) ? s : []).map((e) => (Array.isArray(e == null ? void 0 : e.choices) ? e.choices : []).map((i) => `${i.type}:${i.value}`).join("|")).filter(Boolean).join("; ");
}
function xn() {
  return foundry.utils.deepClone(xu);
}
function xi(s) {
  return Pu[s] ?? (String(s ?? "").trim() || "Life Module");
}
function Ko() {
  return Xs.map((s) => ({
    value: s.moduleType,
    label: s.label
  }));
}
function yi(s = [], { strict: e = !1 } = {}) {
  const t = Array.isArray(s) ? s : [], i = [], a = /* @__PURE__ */ new Set(), n = t.map((o, l) => {
    const c = `Entry ${l + 1}`, u = String((o == null ? void 0 : o.label) ?? "").trim(), d = cs((o == null ? void 0 : o.id) ?? u), m = Zs(o == null ? void 0 : o.moduleType), p = (o == null ? void 0 : o.grants) != null ? Qu(o.grants, { strict: e, errors: i, prefix: c }) : Go(o == null ? void 0 : o.skillChoices, { strict: e, errors: i, prefix: c }), f = rr(o == null ? void 0 : o.requiresAny), h = rr(o == null ? void 0 : o.excludesAny);
    return !d && e && i.push(`${c}: id cannot be blank.`), !u && e && i.push(`${c}: label cannot be blank.`), !m && e && i.push(`${c}: choose a valid module type.`), !p.length && e && i.push(`${c}: choose at least one bonus.`), d && a.has(d) && e && i.push(`${c}: duplicate id "${d}".`), d && a.add(d), {
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
  if (e && i.length) throw zu(i);
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
function Yo(s = []) {
  const e = new Map(xn().map((n) => [n.id, n])), t = yi(s, { strict: !1 }), i = [...t], a = new Set(t.map((n) => n.id));
  for (const [n, r] of e.entries())
    a.has(n) || i.push(foundry.utils.deepClone(r));
  return i;
}
async function Xu() {
  var s, e, t;
  try {
    if (!((t = (e = (s = game == null ? void 0 : game.settings) == null ? void 0 : s.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${Ii}`))) return;
    const i = game.settings.get(T, Ii), a = Yo(i);
    JSON.stringify(i) !== JSON.stringify(a) && await game.settings.set(T, Ii, a);
  } catch {
  }
}
function Zu() {
  var s, e, t;
  try {
    if ((t = (e = (s = game == null ? void 0 : game.settings) == null ? void 0 : s.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${Ii}`))
      return Yo(game.settings.get(T, Ii));
  } catch {
  }
  return xn();
}
function ta() {
  return yi(Zu(), { strict: !1 });
}
function Qt(s) {
  const e = cs(s);
  return e ? ta().find((t) => t.id === e) ?? null : null;
}
function Bn(s) {
  const e = Zs(s);
  return ta().filter((t) => t.moduleType === e);
}
function Qo(s) {
  return !s || typeof s != "object" || Array.isArray(s) ? {} : Object.fromEntries(
    Object.entries(s).map(([e, t]) => [Vo(e, ""), String(t ?? "").trim()]).filter(([e]) => !!e)
  );
}
function Jo(s, e = "", { legacySelectedSkill: t = "" } = {}) {
  const i = new Set((Array.isArray(s == null ? void 0 : s.choices) ? s.choices : []).map($i)), a = String(e ?? "").trim();
  if (i.has(a)) return a;
  if (t) {
    const n = ea(t), r = n ? `skill:${n}` : "";
    if (r && i.has(r)) return r;
  }
  return i.size === 1 ? Array.from(i)[0] : "";
}
function Xo(s, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(s == null ? void 0 : s.grants) ? s.grants : [], a = Qo(e);
  return Object.fromEntries(
    i.map((n) => [
      n.id,
      Jo(n, a[n.id], { legacySelectedSkill: t })
    ])
  );
}
function ia(s, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(s == null ? void 0 : s.grants) ? s.grants : [], a = Xo(s, e, { legacySelectedSkill: t });
  return i.map((n, r) => {
    const o = Jo(n, a[n.id], { legacySelectedSkill: t }), l = (Array.isArray(n.choices) ? n.choices : []).find((c) => $i(c) === o) ?? null;
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
function ed(s, e = {}, { legacySelectedSkill: t = "" } = {}) {
  var i;
  return ((i = ia(s, e, { legacySelectedSkill: t }).map((a) => a.choice).find((a) => (a == null ? void 0 : a.type) === "skill")) == null ? void 0 : i.value) ?? "";
}
function as(s = {}) {
  const e = foundry.utils.deepClone(s ?? {}), t = cs(e.catalogId), i = t ? Qt(t) : null, a = Zs(e.moduleType || (i == null ? void 0 : i.moduleType)), n = i ? Xo(i, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }) : Qo(e.selectedGrants);
  return e.moduleType = a, e.catalogId = t, e.selectedGrants = n, e.selectedSkill = i ? ed(i, n, { legacySelectedSkill: e.selectedSkill }) : ea(e.selectedSkill), e;
}
function Zo(s, e = {}, { legacySelectedSkill: t = "" } = {}) {
  return ia(s, e, { legacySelectedSkill: t }).map((i) => {
    var l, c;
    const a = Array.isArray((c = (l = s == null ? void 0 : s.grants) == null ? void 0 : l[i.index]) == null ? void 0 : c.choices) ? s.grants[i.index].choices : [], n = new Set(a.map((u) => u.type)).size > 1, r = a.map((u) => ({
      value: $i(u),
      label: ss(u, { includeTypePrefix: n }),
      selected: $i(u) === i.selectedKey
    })), o = r.length === 1 ? {
      value: r[0].value,
      label: r[0].label,
      displayLabel: ss(a[0], { includeBonusText: !0 })
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
function td(s, e) {
  return s.isDuplicate ? `Duplicate ${xi(s.moduleType)} slot item.` : s.catalog ? s.unresolvedGrantCount > 0 ? "Choose valid bonus options." : s.excludedBy.length ? `Blocked by ${or(s.excludedBy, e).join(", ")}.` : s.requiresAny.length && !s.matchedRequirementIds.length ? `Requires ${or(s.requiresAny, e).join(" or ")}.` : "" : "Catalog entry is missing or unlinked.";
}
function id(s, e = [], t = {}) {
  var a, n, r;
  if (!s || !Array.isArray(e) || !e.length) return [];
  const i = Math.max(0, Number(((r = (n = (a = s.system) == null ? void 0 : a.attributes) == null ? void 0 : n.edge) == null ? void 0 : r.value) ?? 0));
  return e.filter((o) => (o == null ? void 0 : o.type) === "edgePool").map((o) => {
    var f, h, g, y;
    const l = String(o.value ?? "").trim(), c = qo(l), u = Math.max(0, Number(((y = (g = (h = (f = s.system) == null ? void 0 : f.counters) == null ? void 0 : h.edgePools) == null ? void 0 : g[l]) == null ? void 0 : y.rating) ?? 0)), d = Math.max(0, Number((t == null ? void 0 : t[l]) ?? 0)), m = Math.max(0, u + d - i);
    return m ? `${c} Pool bonus loses ${m} ${m === 1 ? "point" : "points"} to the Edge cap.` : "";
  }).filter(Boolean);
}
function Jt(s) {
  var m;
  const e = ta(), t = new Map(e.map((p) => [p.id, p])), i = Array.from((s == null ? void 0 : s.items) ?? []).filter((p) => p.type === A.itemType.lifeModule), a = /* @__PURE__ */ new Map();
  for (const p of i) {
    const f = Zs((m = p.system) == null ? void 0 : m.moduleType);
    !f || a.has(f) || a.set(f, p.id);
  }
  const n = i.map((p) => {
    var E;
    const f = as(p.system ?? {}), h = t.get(f.catalogId) ?? null, g = f.moduleType || (h == null ? void 0 : h.moduleType) || "", y = h ? ia(h, f.selectedGrants, { legacySelectedSkill: f.selectedSkill }) : [], b = y.map((I) => I.choice).filter(Boolean), S = ((E = b.find((I) => I.type === "skill")) == null ? void 0 : E.value) ?? "", w = S ? lt(S) : null;
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
      selectedChoiceLabels: b.map((I) => ss(I, { includeBonusText: !0 })),
      selectedSkill: S,
      selectedSkillLabel: (w == null ? void 0 : w.label) ?? S,
      requiresAny: [...(h == null ? void 0 : h.requiresAny) ?? []],
      excludesAny: [...(h == null ? void 0 : h.excludesAny) ?? []],
      matchedRequirementIds: [],
      excludedBy: [],
      isDuplicate: g ? a.get(g) !== p.id : !1,
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
  const l = Object.fromEntries(St.map((p) => [p.code, 0])), c = Object.fromEntries(Ho.map((p) => [p, 0])), u = /* @__PURE__ */ new Map();
  for (const p of n) {
    const f = p.isActive ? p.selectedChoices : [], h = f.filter((y) => y.type === "skill"), g = f.filter((y) => y.type === "edgePool");
    p.bonus = h.length;
    for (const y of h)
      l[y.value] = Number(l[y.value] ?? 0) + 1;
    for (const y of g)
      c[y.value] = Number(c[y.value] ?? 0) + 1;
    p.inactiveReason = p.isActive ? "" : td(p, t), u.set(p.itemId, p);
  }
  for (const p of n)
    p.warningLabels = p.isActive ? id(s, p.selectedChoices, c) : [];
  const d = Xs.map((p) => {
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
function sd(s = {}) {
  var t, i, a;
  const e = String((s == null ? void 0 : s.intent) ?? "").trim();
  return e === "skill" ? String(((t = s == null ? void 0 : s.data) == null ? void 0 : t.skillKey) ?? "").trim() : e === "attack" ? String(((a = (i = s == null ? void 0 : s.attack) == null ? void 0 : i.skill) == null ? void 0 : a.code) ?? "").trim() : "";
}
function ad({ actor: s, resolved: e } = {}) {
  const t = sd(e);
  return !s || !t ? [] : Jt(s).states.flatMap(
    (i) => i.isActive ? i.selectedChoices.filter((a) => a.type === "skill" && a.value === t).map((a) => ({
      id: `life-module:${i.itemId}:${$i(a)}`,
      label: i.label,
      value: 1,
      source: "Life Module",
      tooltip: `${i.label}: +1 to ${ss(a)} rolls`
    })) : []
  );
}
const lr = Object.freeze({
  weapon: A.itemType.personalWeapon,
  shadowamp: A.itemType.assetModule
}), el = Object.freeze({
  contact: "systems/mwd/img/default/mystery-man.svg",
  gear: "systems/mwd/img/default/Default_Gear.svg",
  quality: "systems/mwd/img/default/card-joker.svg",
  assetModule: "systems/mwd/img/default/upgrade.svg",
  skill: "systems/mwd/img/default/Default_Skill.svg",
  lifeModule: "systems/mwd/img/default/book.svg",
  mechWeapon: "systems/mwd/img/default/Default_Weapon.svg",
  personalWeapon: "systems/mwd/img/colt-m1911.svg",
  armor: "systems/mwd/img/default/Default_Armor.svg"
}), pi = Object.freeze(["close", "near", "far", "extreme"]), cr = Object.freeze({
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
});
function Wi(s) {
  return zi(s);
}
function ur(s = {}) {
  const e = to({
    traits: s.traits,
    keywords: s.keywords,
    report: Mn(),
    path: "system.traits"
  });
  return {
    traits: e.traits,
    keywords: e.keywords
  };
}
function tl(s) {
  return s === "long" ? "extreme" : s === "short" ? "close" : s === "medium" ? "near" : pi.includes(s) ? s : "near";
}
function vi(s) {
  return {
    max: tl((s == null ? void 0 : s.max) ?? "near"),
    close: Number((s == null ? void 0 : s.close) ?? (s == null ? void 0 : s.short) ?? 0) || 0,
    near: Number((s == null ? void 0 : s.near) ?? (s == null ? void 0 : s.medium) ?? 0) || 0,
    far: Number((s == null ? void 0 : s.far) ?? (s == null ? void 0 : s.long) ?? 0) || 0,
    extreme: Number((s == null ? void 0 : s.extreme) ?? 0) || 0
  };
}
function ya(s) {
  return {
    close: Number((s == null ? void 0 : s.close) ?? (s == null ? void 0 : s.short) ?? 0) || 0,
    near: Number((s == null ? void 0 : s.near) ?? (s == null ? void 0 : s.medium) ?? 0) || 0,
    far: Number((s == null ? void 0 : s.far) ?? (s == null ? void 0 : s.long) ?? 0) || 0,
    extreme: Number((s == null ? void 0 : s.extreme) ?? 0) || 0
  };
}
function dr(s, e = 1) {
  const t = Number(s);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function mr(s, e = 0) {
  const t = Number(s);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function pr(s) {
  return String(s ?? "").trim();
}
function fr(s) {
  return (Array.isArray(s) ? s : typeof s == "string" ? s.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function nd(s) {
  const e = pi.indexOf(s);
  return e >= 0 ? e : pi.indexOf("near");
}
function rd(s = vi({})) {
  const e = ["near", "close", "far", "extreme"], t = nd(s.max);
  return e.find((i) => pi.indexOf(i) <= t) ?? "close";
}
function od(s) {
  const e = tl(s == null ? void 0 : s.max), t = pi.indexOf(e);
  return pi.map((i, a) => ({
    key: i,
    allowed: t >= 0 ? a <= t : a === 0,
    value: (s == null ? void 0 : s[i]) ?? void 0,
    labelkey: oe.getFromList(oe.getEnums().ranges, i)
  }));
}
function ld(s, e, t, i) {
  let a = Number(e);
  if (t)
    if (i !== void 0)
      a += Math.ceil(Number(i) / 2);
    else
      return console.warn("Weapon not attached to an actor"), we.item.personalWeapon.weaponWithoutActor;
  return a;
}
function cd(s, e, t) {
  let i = "";
  return t && we.attributes[t] && (i += we.attributes[t].substring(0, 3).toUpperCase() + "/2 + "), i += String(e), i;
}
function ud(s, e) {
  return _.useArmor(s) ? e ? "noArmor" : "withArmor" : "";
}
function hr(s) {
  const e = game.system.mwd.skills.get(s);
  if (!e)
    return {
      img: el.skill,
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
function ba(s = {}) {
  const e = as(s), t = Qt(e.catalogId);
  return {
    system: e,
    ...t ? { name: t.label } : {}
  };
}
function dd(s) {
  const e = String(s ?? "").trim();
  return !!(!e || e.startsWith("icons/svg/") || e === "icons/mystery-man.svg");
}
var rs, ct, Ka, il, Ns;
const Be = class Be extends Item {
  static init() {
    z(this, rs) || (De(this, rs, !0), Hooks.on("createItem", (e, t, i) => {
      var a, n;
      Promise.resolve((a = e.onCreateItem) == null ? void 0 : a.call(e, t, i)).catch((r) => {
        console.error(`${fe}Item create hook failed`, r);
      }), v(n = Be, ct, Ka).call(n, e);
    }), Hooks.on("updateItem", (e) => {
      var t;
      v(t = Be, ct, Ka).call(t, e);
    }), Hooks.on("deleteItem", (e) => {
      var t;
      v(t = Be, ct, il).call(t, e);
    }), Hooks.on("createActiveEffect", (e) => {
      var t;
      v(t = Be, ct, Ns).call(t, e);
    }), Hooks.on("updateActiveEffect", (e) => {
      var t;
      v(t = Be, ct, Ns).call(t, e);
    }), Hooks.on("deleteActiveEffect", (e) => {
      var t;
      v(t = Be, ct, Ns).call(t, e);
    }));
  }
  static canonicalType(e) {
    return lr[e] ?? e;
  }
  static defaultIconForType(e) {
    return el[this.canonicalType(e)];
  }
  get canonicalType() {
    return this.constructor.canonicalType(this.type);
  }
  async onCreateItem(e, t) {
  }
  async _preCreate(e, t, i) {
    super._preCreate && await super._preCreate(e, t, i);
    const a = (e == null ? void 0 : e.type) ?? this.type, n = this.constructor.canonicalType(a), r = {};
    if (a !== n && lr[a] && (r.type = n), dd((e == null ? void 0 : e.img) ?? this.img)) {
      const o = this.constructor.defaultIconForType(n);
      o && (r.img = o);
    }
    if (n === A.itemType.lifeModule && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (r.name = "MWD.itemType.singular.lifeModule"), n === A.itemType.lifeModule) {
      const o = ba((e == null ? void 0 : e.system) ?? this.system ?? {});
      r.system = o.system, o.name && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (r.name = o.name);
    }
    Object.keys(r).length && this.updateSource(r);
  }
  async _preUpdate(e, t, i) {
    var l, c;
    super._preUpdate && await super._preUpdate(e, t, i);
    const a = e != null && e.system ? foundry.utils.mergeObject(foundry.utils.deepClone(this.system ?? {}), foundry.utils.deepClone(e.system), { inplace: !1 }) : null;
    if (a && this.isPersonalWeapon()) {
      e.system ?? (e.system = {});
      const u = a.ammo, d = ur(a);
      e.system.standardTraits = [], e.system.payloads = Mt(a.payloads, { legacyAmmo: u, category: a.category }), e.system.consumptionSources = ji(a.consumptionSources, { legacyAmmo: u }), e.system.selectedPayloadId = Mi(
        a.selectedPayloadId,
        e.system.payloads,
        { legacyAmmo: u, category: a.category }
      ), e.system.traits = d.traits, e.system.keywords = d.keywords, e.system.resolution = vs(a.resolution, "standard"), e.system.fireModes = Es(a.fireModes), e.system.attackRatingBand = ya(a.attackRatingBand), e.system.range = vi(a.range), e.system.damageType = yt(a.damageType), e.system["-=ammo"] = null, delete e.system.ammo;
    }
    if (a && this.isArmor() && (e.system ?? (e.system = {}), e.system.mitigationByType = gt(a.mitigationByType ?? a.mitigation), e.system.tags = Ms(a.tags), e.system.traits = Wi(a.traits), e.system.standardTraits = kt(a.standardTraits), e.system.traitState = ma({
      standardTraits: e.system.standardTraits,
      traits: e.system.traits,
      traitState: a.traitState
    }).traitState), a && this.isLifeModule()) {
      const u = ba(a);
      e.system ?? (e.system = {}), foundry.utils.mergeObject(e.system, u.system, { inplace: !0, overwrite: !0 }), u.name && (e.name = u.name);
      return;
    }
    if (a && this.isQuality()) {
      e.system ?? (e.system = {});
      const u = nt(a);
      foundry.utils.mergeObject(e.system, u, { inplace: !0, overwrite: !0 });
      return;
    }
    if (a && this.isGear()) {
      e.system ?? (e.system = {}), e.system.quantity = dr(a.quantity, 1), e.system.rating = mr(a.rating, 0), e.system.category = pr(a.category), e.system.tags = fr(a.tags);
      return;
    }
    if (!this.isSkill()) return;
    const n = (l = e == null ? void 0 : e.system) == null ? void 0 : l.code;
    if (n === void 0) return;
    const r = this.system.code;
    if (n === r) return;
    const o = hr(n);
    o && ((c = o == null ? void 0 : o.system) == null || delete c.code, foundry.utils.mergeObject(e, o, { inplace: !0 }));
  }
  prepareBaseData() {
    super.prepareBaseData();
    const e = this.canonicalType;
    e === A.itemType.personalWeapon ? this._preparePersonalWeaponBaseData() : e === A.itemType.armor ? this._prepareArmorBaseData() : e === A.itemType.lifeModule ? this._prepareLifeModuleBaseData() : e === A.itemType.quality ? this._prepareQualityBaseData() : e === A.itemType.gear && this._prepareGearBaseData();
  }
  _preparePersonalWeaponBaseData() {
    const e = this.system ?? {}, t = e.ammo;
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = yt(e.damageType), e.attackRatingBand = ya(e.attackRatingBand), e.range = vi(e.range);
    const i = ur(e);
    e.standardTraits = [], e.traits = i.traits, e.keywords = i.keywords, e.resolution = vs(e.resolution, "standard"), e.fireModes = Es(e.fireModes), e.payloads = Mt(e.payloads, { legacyAmmo: t, category: e.category }), e.consumptionSources = ji(e.consumptionSources, { legacyAmmo: t }), e.selectedPayloadId = Mi(e.selectedPayloadId, e.payloads, { legacyAmmo: t, category: e.category }), delete e.ammo, e.notes = String(e.notes ?? "").trim();
  }
  _prepareArmorBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.rating = Math.max(0, Number(e.rating ?? 0)), e.defenseBonus = Number(e.defenseBonus ?? 0) || 0, e.mitigationByType = gt(e.mitigationByType ?? e.mitigation), delete e.mitigation, e.durability ?? (e.durability = {}), e.durability.max = Math.max(0, Number(e.durability.max ?? e.rating ?? 0)), e.durability.current = Math.min(
      e.durability.max,
      Math.max(0, Number(e.durability.current ?? e.durability.max ?? e.rating ?? 0))
    ), e.standardTraits = kt(e.standardTraits), e.tags = Ms(e.tags), e.traits = Wi(e.traits), e.traitState = ma({
      standardTraits: e.standardTraits,
      traits: e.traits,
      traitState: e.traitState
    }).traitState, e.notes = String(e.notes ?? "").trim();
  }
  _prepareLifeModuleBaseData() {
    const e = ba(this.system ?? {});
    foundry.utils.mergeObject(this.system, e.system, { inplace: !0, overwrite: !0 });
  }
  _prepareQualityBaseData() {
    const e = nt(this.system ?? {});
    foundry.utils.mergeObject(this.system, e, { inplace: !0, overwrite: !0 });
  }
  _prepareGearBaseData() {
    const e = this.system ?? {};
    e.quantity = dr(e.quantity, 1), e.rating = mr(e.rating, 0), e.category = pr(e.category), e.tags = fr(e.tags);
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
      var a, n;
      const i = (n = (a = t.flags) == null ? void 0 : a[T]) == null ? void 0 : n[Be.EQUIPPED_EFFECT_FLAG];
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
    const a = /* @__PURE__ */ new Map();
    for (const g of t) {
      const y = (h = (f = (p = g.flags) == null ? void 0 : p[T]) == null ? void 0 : f[Be.EQUIPPED_EFFECT_FLAG]) == null ? void 0 : h.sourceEffectId;
      if (!y) continue;
      const b = a.get(y) ?? [];
      b.push(g), a.set(y, b);
    }
    const n = [], r = [], o = [], l = new Set(i.map((g) => g.id));
    for (const [g, y] of a.entries()) {
      if (!l.has(g)) {
        o.push(...y.map((b) => b.id));
        continue;
      }
      y.length > 1 && o.push(...y.slice(1).map((b) => b.id));
    }
    for (const g of i) {
      const b = (a.get(g.id) ?? [])[0] ?? null, S = this._prepareSyncedActorEffectData(g);
      b ? r.push({ _id: b.id, ...S }) : n.push(S);
    }
    const c = o.length ? await e.deleteEmbeddedDocuments("ActiveEffect", o) : [], u = r.length ? await e.updateEmbeddedDocuments("ActiveEffect", r) : [];
    return { created: n.length ? await e.createEmbeddedDocuments("ActiveEffect", n) : [], updated: u, deleted: c };
  }
  _prepareSyncedActorEffectData(e) {
    const t = e.toObject();
    delete t._id;
    const i = String(e.name ?? "Effect").trim() || "Effect", a = String(this.name ?? "Item").trim() || "Item", n = i.startsWith(a) ? i : `${a}: ${i}`;
    return t.name = n, t.transfer = !1, t.origin = e.uuid ?? this.uuid ?? t.origin ?? null, t.flags = foundry.utils.mergeObject(t.flags ?? {}, {
      [T]: {
        [Be.EQUIPPED_EFFECT_FLAG]: {
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
    this.parent && await ft.itemAttributeRoll(this, e);
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
    Z.reindexIds(t), await this.update({ "system.modifiers": t });
  }
  async _mutateQualitySystem(e = (t) => t) {
    const t = e(foundry.utils.deepClone(nt(this.system ?? {})));
    await this.update({ system: nt(t) });
  }
  async createQualityPrerequisite(e = {}) {
    await this._mutateQualitySystem((t) => (t.prerequisites = Et(t.prerequisites).concat([{
      id: e.id ?? foundry.utils.randomID(),
      fact: e.fact ?? "",
      comparator: e.comparator ?? "eq",
      value: e.value ?? ""
    }]), t));
  }
  async deleteQualityPrerequisite(e) {
    await this._mutateQualitySystem((t) => (t.prerequisites = Et(t.prerequisites).filter((i) => i.id !== e), t));
  }
  async updateQualityPrerequisite(e, t, i) {
    await this._mutateQualitySystem((a) => (a.prerequisites = Et(a.prerequisites).map((n) => (n.id !== e || (t === "fact" && (n.fact = i), t === "comparator" && (n.comparator = i), t === "value" && (n.value = i)), n)), a));
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
      conditions: Et(e.conditions ?? []),
      limit: Yt(e.limit ?? {})
    }]), t));
  }
  async deleteQualityEffect(e) {
    await this._mutateQualitySystem((t) => (t.effects = si(t.effects).filter((i) => i.id !== e), t));
  }
  async updateQualityEffect(e, t, i) {
    await this._mutateQualitySystem((a) => (a.effects = si(a.effects).map((n) => (n.id !== e || (t === "type" && (n.type = i), t === "phase" && (n.phase = i), t === "selector" && (n.selector = i), t === "skillKeys" && (n.skillKeys = Array.isArray(i) ? i : []), t === "label" && (n.label = i), t === "value" && (n.value = Number(i ?? 0) || 0), t === "min" && (n.min = i === "" ? null : Number(i ?? 0)), t === "max" && (n.max = i === "" ? null : Number(i ?? 0)), t === "pool" && (n.pool = i), t === "operation" && (n.operation = i), t === "limit.perActivation" && (n.limit = Yt({ ...n.limit ?? {}, perActivation: i })), t === "limit.perRound" && (n.limit = Yt({ ...n.limit ?? {}, perRound: i })), t === "limit.perScene" && (n.limit = Yt({ ...n.limit ?? {}, perScene: i }))), n)), a));
  }
  async createQualityEffectCondition(e, t = {}) {
    await this._mutateQualitySystem((i) => (i.effects = si(i.effects).map((a) => (a.id !== e || (a.conditions = Et(a.conditions).concat([{
      id: t.id ?? foundry.utils.randomID(),
      fact: t.fact ?? "",
      comparator: t.comparator ?? "eq",
      value: t.value ?? ""
    }])), a)), i));
  }
  async deleteQualityEffectCondition(e, t) {
    await this._mutateQualitySystem((i) => (i.effects = si(i.effects).map((a) => (a.id !== e || (a.conditions = Et(a.conditions).filter((n) => n.id !== t)), a)), i));
  }
  async updateQualityEffectCondition(e, t, i, a) {
    await this._mutateQualitySystem((n) => (n.effects = si(n.effects).map((r) => (r.id !== e || (r.conditions = Et(r.conditions).map((o) => (o.id !== t || (i === "fact" && (o.fact = a), i === "comparator" && (o.comparator = a), i === "value" && (o.value = a)), o))), r)), n));
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
    await this._mutateWeaponStandardTraits((a) => a.map((n) => (n.id !== e || (t === "key" && (n.key = i), t === "rating" && (n.rating = Math.max(0, Number(i ?? 0) || 0))), n)));
  }
  async _mutateArmorStandardTraits(e = (t) => t) {
    var i;
    const t = e(foundry.utils.deepClone(kt((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": kt(t) });
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
    await this._mutateArmorStandardTraits((a) => a.map((n) => (n.id !== e || (t === "key" && (n.key = i), t === "rating" && (n.rating = Math.max(0, Number(i ?? 0) || 0))), n)));
  }
  async _mutatePayloads(e = (t) => t) {
    var a, n, r, o, l, c, u;
    const t = e(foundry.utils.deepClone(
      Mt((a = this.system) == null ? void 0 : a.payloads, {
        legacyAmmo: (n = this.system) == null ? void 0 : n.ammo,
        category: ((r = this.system) == null ? void 0 : r.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
      })
    )).map(Qe), i = Mi((l = this.system) == null ? void 0 : l.selectedPayloadId, t, {
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
      ji((i = this.system) == null ? void 0 : i.consumptionSources, { legacyAmmo: (a = this.system) == null ? void 0 : a.ammo })
    )).map(Ct);
    await this.update({
      "system.consumptionSources": t,
      "system.-=ammo": null
    });
  }
  async updatePayloadField(e, t, i) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((a) => a.map((n) => n.id !== e ? n : (foundry.utils.setProperty(n, t, i), Qe(n))));
  }
  async createPayload(e = {}) {
    await this._mutatePayloads((t) => t.concat([Qe({
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
    const t = ((n = this.system) == null ? void 0 : n.category) ?? ((r = this.system) == null ? void 0 : r.weaponCategory), i = Mt((o = this.system) == null ? void 0 : o.payloads, {
      legacyAmmo: (l = this.system) == null ? void 0 : l.ammo,
      category: t
    }).filter((u) => u.id !== e), a = ((c = i[0]) == null ? void 0 : c.id) ?? "unloaded";
    await this.update({
      "system.payloads": i.length ? i : Mt([], { category: t }),
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
    }]), Qe(a))));
  }
  async deletePayloadStandardTrait(e, t) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((a) => a.id !== e ? a : (a.modifies ?? (a.modifies = {}), a.modifies.standardTraits = ri(a.modifies.standardTraits).filter((n) => n.id !== t), Qe(a))));
  }
  async updatePayloadStandardTrait(e, t, i, a) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((n) => n.map((r) => r.id !== e ? r : (r.modifies ?? (r.modifies = {}), r.modifies.standardTraits = ri(r.modifies.standardTraits).map((o) => (o.id !== t || (i === "key" && (o.key = a), i === "rating" && (o.rating = Math.max(0, Number(a ?? 0) || 0))), o)), Qe(r))));
  }
  async createConsumptionSource(e = {}) {
    await this._mutateConsumptionSources((t) => t.concat([Ct({
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
      return ((a = i == null ? void 0 : i.consumption) == null ? void 0 : a.sourceId) !== e ? i : (i.consumption.sourceId = "", Qe(i));
    }));
  }
  async updateConsumptionSourceField(e, t, i) {
    await this._mutateConsumptionSources((a) => a.map((n) => n.id !== e ? n : (foundry.utils.setProperty(n, t, i), Ct(n))));
  }
  getPayloadState({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var i, a, n, r, o;
    return xa({
      payloads: (i = this.system) == null ? void 0 : i.payloads,
      selectedPayloadId: (a = this.system) == null ? void 0 : a.selectedPayloadId,
      consumptionSources: (n = this.system) == null ? void 0 : n.consumptionSources,
      actor: this.actor ?? null,
      payloadId: e || t,
      category: ((r = this.system) == null ? void 0 : r.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
    });
  }
  getActivePayloadReloadState({ payloadId: e = "", ammoTypeId: t = "", user: i = game.user } = {}) {
    var f, h, g;
    const a = String(((f = this.system) == null ? void 0 : f.category) ?? ((h = this.system) == null ? void 0 : h.weaponCategory) ?? "").trim().toLowerCase(), n = {
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
    if (a === "melee")
      return { ...n, reason: "Melee weapons do not use reloadable payloads." };
    const r = this.getPayloadState({ payloadId: e || t }), o = (r == null ? void 0 : r.sourceState) ?? null, l = (r == null ? void 0 : r.source) ?? null, c = String((r == null ? void 0 : r.activePayloadId) ?? "").trim(), u = String((r == null ? void 0 : r.payloadLabel) ?? "").trim() || "Unloaded", d = Math.max(0, Number((o == null ? void 0 : o.current) ?? 0) || 0), m = Math.max(0, Number((o == null ? void 0 : o.max) ?? 0) || 0), p = !!((g = de.getCombat(this.actor)) != null && g.combatant);
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
    var a;
    const i = this.getActivePayloadReloadState({ payloadId: e, ammoTypeId: t });
    return !i.canReload || !((a = i.source) != null && a.id) ? { ok: !1, ...i } : (await this._mutateConsumptionSources((n) => n.map((r) => {
      var o;
      return r.id !== i.source.id ? r : (r.tracking ?? (r.tracking = {}), r.tracking.max = Math.max(0, Number(((o = r.tracking) == null ? void 0 : o.max) ?? i.max) || i.max), r.tracking.current = i.max, Ct(r));
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
    var i, a, n, r, o, l;
    const t = Mi(
      e,
      Mt((i = this.system) == null ? void 0 : i.payloads, {
        legacyAmmo: (a = this.system) == null ? void 0 : a.ammo,
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
    var a;
    const i = this.getPayloadState({ payloadId: e || t });
    return (a = i == null ? void 0 : i.sourceState) != null && a.isTracked ? Number(i.sourceState.current ?? 0) >= Number(i.sourceState.consumePerUse ?? 1) : !0;
  }
  async consumePayload({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var r;
    const i = this.getPayloadState({ payloadId: e || t });
    if (!((r = i == null ? void 0 : i.sourceState) != null && r.isTracked)) return !0;
    const a = Math.max(1, Number(i.sourceState.consumePerUse ?? 1) || 1), n = Math.max(0, Number(i.sourceState.current ?? 0) || 0);
    return n < a ? !1 : i.sourceState.kind === "internal" ? (await this._mutateConsumptionSources((o) => o.map((l) => {
      var c;
      return l.id !== ((c = i.source) == null ? void 0 : c.id) ? l : (l.tracking ?? (l.tracking = {}), l.tracking.current = Math.max(0, n - a), Ct(l));
    })), !0) : i.sourceState.kind === "actorResource" && this.actor && i.sourceState.currentPath ? (await this.actor.update({
      [i.sourceState.currentPath]: Math.max(0, n - a)
    }), !0) : i.sourceState.kind === "itemRef" && i.sourceState.sourceItem && i.sourceState.currentPath ? (await i.sourceState.sourceItem.update({
      [i.sourceState.currentPath]: Math.max(0, n - a)
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
    const i = this.system ?? {}, a = vi(i.range), n = String(i.skill ?? "").trim(), r = lt(n), o = Number(i.damage ?? 0) || 0, l = String(i.category ?? i.weaponCategory ?? "ranged").trim() || "ranged", c = Ac({
      damageType: i.damageType,
      ap: Number(i.ap ?? i.armorPiercing ?? 0) || 0,
      attackRatingBand: ya(i.attackRatingBand),
      traits: Wi(i.traits),
      keywords: oc(i.keywords),
      standardTraits: [],
      resolution: vs(i.resolution, "standard"),
      fireModes: Es(i.fireModes),
      payloads: Mt(i.payloads, { legacyAmmo: i.ammo, category: l }),
      selectedPayloadId: Mi(i.selectedPayloadId, i.payloads, { legacyAmmo: i.ammo, category: l }),
      consumptionSources: ji(i.consumptionSources, { legacyAmmo: i.ammo }),
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
      damageTypeLabel: Pt(c.damageType),
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
    const t = this.system ?? {}, i = Math.max(0, Number(t.rating ?? 0)), a = Math.max(0, Number(((d = t == null ? void 0 : t.durability) == null ? void 0 : d.max) ?? i)), n = Math.min(
      a,
      Math.max(0, Number(((m = t == null ? void 0 : t.durability) == null ? void 0 : m.current) ?? a))
    ), r = Math.min(i, n), o = gt((t == null ? void 0 : t.mitigationByType) ?? (t == null ? void 0 : t.mitigation)), l = ma({
      standardTraits: kt(t == null ? void 0 : t.standardTraits),
      traits: Wi(t == null ? void 0 : t.traits),
      traitState: t == null ? void 0 : t.traitState
    }), c = Ms(t == null ? void 0 : t.tags), u = vn(r);
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
      mitigationByType: go(o, l.mitigationByType),
      tags: c,
      isDestroyed: n <= 0,
      durability: {
        current: n,
        max: a
      },
      traitState: l.traitState,
      standardTraits: kt(t.standardTraits),
      traits: wc({
        traits: Wi(t.traits),
        standardTraits: kt(t.standardTraits)
      }),
      notes: String(t.notes ?? "").trim()
    };
  }
  getDefaultRangeBand(e = vi(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    return rd(e);
  }
  isWeaponSkill(e) {
    return ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === A.itemType.skill && e.system.code === this.system.skill;
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find((a) => this.isWeaponSkill(a));
    if (e) return e;
    const t = game.items.find((a) => this.isWeaponSkill(a));
    return t || hr(this.system.skill);
  }
  getDefense() {
    if (!this.isPersonalWeapon())
      return this.system.defense ? ke.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return ke.fixedDefenseCode(this.system.defense);
    const e = lt(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? ke.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent) return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0, i = this.isPersonalWeapon() ? this.getCombatProfile() : null;
    return {
      value: ld(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: (i == null ? void 0 : i.damageType) ?? this.system.damageType,
      damageTypeLabel: (i == null ? void 0 : i.damageTypeLabel) ?? this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: ud(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  getDamageCode() {
    return cd(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  getDamageTypeLabel() {
    var t;
    if (this.isPersonalWeapon())
      return Pt(((t = this.getCombatProfile()) == null ? void 0 : t.damageType) ?? this.system.damageType);
    const e = we.mwd.weaponDamageType[this.system.damageType] ?? we.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return od(vi(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  validateTargets(e) {
    var r;
    const t = (r = this.getDamage()) == null ? void 0 : r.monitor, i = at.getTargetTokens(game.user), a = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), n = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (n.length > 0) {
      const o = be(we.common.errors.ignoredTargets, {
        targets: n.reduce(Z.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (a.length === 0) {
      const o = be(we.common.errors.noTargetSelected, {
        weapon: this.name ?? we.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(a);
    return a;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = cr[t] ?? {};
    hi.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = cr[t] ?? {};
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
rs = new WeakMap(), ct = new WeakSet(), Ka = async function(e) {
  if (typeof (e == null ? void 0 : e.syncEquippedActorEffects) == "function")
    try {
      await e.syncEquippedActorEffects();
    } catch (t) {
      console.error(`${fe}Failed to sync equipped item effects`, { item: e, error: t });
    }
}, il = async function(e) {
  if (typeof (e == null ? void 0 : e.removeSyncedActorEffects) == "function")
    try {
      await e.removeSyncedActorEffects({ actor: e.actor ?? e.parent ?? null });
    } catch (t) {
      console.error(`${fe}Failed to remove synced item effects`, { item: e, error: t });
    }
}, Ns = async function(e) {
  const t = e == null ? void 0 : e.parent;
  if (typeof (t == null ? void 0 : t.syncEquippedActorEffects) == "function")
    try {
      await t.syncEquippedActorEffects();
    } catch (i) {
      console.error(`${fe}Failed to sync parent item effects`, { effect: e, error: i });
    }
}, Te(Be, ct), Te(Be, rs, !1), R(Be, "RANGE_ORDER", pi), R(Be, "EQUIPPED_EFFECT_FLAG", "equippedItemSync"), R(Be, "DEFAULT_UNARMED", Object.freeze({
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
let Bi = Be;
const gr = {
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
}, md = {
  code: "weapon-range",
  options: {
    flags: { editable: !0 },
    order: 20,
    category: pe.pool,
    labelkey: we.common.roll.modifiers.weaponRange,
    hbsTemplateRoll: `${q}/roll/parts/select-option.hbs`,
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
}, pd = {
  code: "weapon-area",
  options: {
    used: !0,
    order: 20,
    category: pe.pool,
    labelkey: we.common.roll.modifiers.weaponArea,
    hbsTemplateRoll: `${q}/roll/parts/input-numeric.hbs`,
    hbsTemplateChat: void 0
    //``
  },
  isUsed: (s) => s.used,
  condition: (s) => s.weapon && s.weapon.getArea() != A.area.none,
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
}, ge = class ge extends Bi {
  static buildDefaultUnarmedProfile(e = null) {
    var a, n, r, o, l, c, u, d;
    const t = Math.max(0, Number(
      ((a = e == null ? void 0 : e.getAttributeValue) == null ? void 0 : a.call(e, A.actorAttributes.strength)) ?? ((o = (r = (n = e == null ? void 0 : e.system) == null ? void 0 : n.attributes) == null ? void 0 : r.strength) == null ? void 0 : o.value) ?? 0
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
    Hooks.once(Re.REGISTER_ROLL_PARAMETERS, (e) => {
      e(pd), e(md);
    });
  }
  prepareBaseData() {
    if (super.prepareBaseData(), (this.canonicalType ?? this.type) !== A.itemType.personalWeapon) return;
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = yt(e.damageType), e.attackRatingBand = ge.normalizeAttackRatingBand(e.attackRatingBand), e.range = ge.normalizeRangeData(e.range), e.traits = ge.normalizeTraits(e.traits), e.notes = String(e.notes ?? "").trim();
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
    const t = e ?? {}, i = ge.normalizeRangeKey(t.max ?? "near"), a = ge.maxIndex(i), n = ge.RANGE_ORDER.map((l, c) => ({
      key: l,
      allowed: c <= a,
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
    return e === A.itemType.mechWeapon ? "systems/mwd/img/default/Default_Weapon.svg" : this.defaultIcon;
  }
  static normalizeTraits(e) {
    return zi(e);
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
    const t = this.system ?? {}, i = this.canonicalType ?? this.type, a = ge.normalizeRangeData(t.range), n = String(t.skill ?? "").trim(), r = lt(n), o = Number(t.damage ?? 0) || 0, l = Number(t.ap ?? t.armorPiercing ?? 0) || 0, c = String(t.category ?? t.weaponCategory ?? "ranged").trim() || "ranged", u = ge.normalizeTraits(t.traits);
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
      damageType: i === A.itemType.personalWeapon ? yt(t.damageType) : String(t.damageType ?? "kinetic").trim() || "kinetic",
      attackRatingBand: ge.normalizeAttackRatingBand(t.attackRatingBand),
      range: a,
      defaultRangeBand: this.getDefaultRangeBand(a),
      traits: u,
      effects: {},
      notes: String(t.notes ?? t.description ?? "").trim()
    };
  }
  getDefaultRangeBand(e = ge.normalizeRangeData(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    const i = ["near", "close", "far", "extreme"], a = ge.maxIndex(e.max);
    return i.find((n) => ge.RANGE_ORDER.indexOf(n) <= a) ?? "close";
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find(
      (a) => a.type === A.itemType.skill && a.system.code === this.system.skill
    );
    if (e) return e;
    const t = lt(String(this.system.skill ?? "").trim());
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
      return this.system.defense ? ke.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return ke.fixedDefenseCode(this.system.defense);
    const e = lt(String(this.system.skill ?? "").trim());
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
  static damageValue(e, t, i, a) {
    if (t = Number(t), i)
      if (a !== void 0)
        t = t + Math.ceil(Number(a) / 2);
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
    let a = "";
    return i && we.attributes[i] && (a += we.attributes[i].substring(0, 3).toUpperCase() + "/2 + "), a += String(t), a;
  }
  static armorMode(e, t) {
    return _.useArmor(e) ? t ? "noArmor" : "withArmor" : "";
  }
  getDamageTypeLabel() {
    if ((this.canonicalType ?? this.type) === A.itemType.personalWeapon)
      return Pt(this.system.damageType);
    const e = we.mwd.weaponDamageType[this.system.damageType] ?? we.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return ge.getRangeList(ge.normalizeRangeData(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  _getRange(e) {
    return { value: this.system.range[e], labelkey: oe.getFromList(oe.getEnums().ranges, e) };
  }
  static getRangeList(e) {
    const t = ge.normalizeRangeKey(e == null ? void 0 : e.max), i = ge.RANGE_ORDER.indexOf(t);
    return ge.RANGE_ORDER.map((a, n) => ({
      key: a,
      allowed: i >= 0 ? n <= i : n === 0,
      value: (e == null ? void 0 : e[a]) ?? (a === "extreme" && (e == null ? void 0 : e.long) !== void 0 ? e.long : void 0),
      labelkey: oe.getFromList(oe.getEnums().ranges, a)
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
    const t = (r = this.getDamage()) == null ? void 0 : r.monitor, i = at.getTargetTokens(game.user), a = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), n = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (n.length > 0) {
      const o = be(we.common.errors.ignoredTargets, {
        targets: n.reduce(Z.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (a.length == 0) {
      const o = be(we.common.errors.noTargetSelected, {
        weapon: this.name ?? we.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(a);
    return a;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = gr[t] ?? {};
    hi.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = gr[t] ?? {};
    return i.targets && i.adjust && e <= i.targets ? i.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area == "" ? A.area.none : this.system.area ?? A.area.none;
  }
  _getMonitor() {
    return (this.canonicalType ?? this.type) === A.itemType.personalWeapon ? A.monitors.physical : this.system.monitor || A.monitors.physical;
  }
};
R(ge, "RANGE_ORDER", ["close", "near", "far", "extreme"]), R(ge, "DEFAULT_UNARMED", Bi.DEFAULT_UNARMED);
let ot = ge;
function fd(s) {
  const e = [];
  for (let [t, i] of Object.entries(s ?? {}))
    i !== void 0 && (t = t.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (a, n) => (n ? "-" : "") + a.toLowerCase()), e.push(`data-${t}="${Handlebars.escapeExpression(i)}"`));
  return new Handlebars.SafeString(e.join(" "));
}
function hd({ hash: s }) {
  return s;
}
function gd() {
  var s, e;
  return ((e = (s = foundry == null ? void 0 : foundry.applications) == null ? void 0 : s.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
class Fn {
  constructor() {
    this.registerHelpers(), Hooks.once("init", () => {
      this.registerHelpers(), console.log(`${fe}Handlebars helpers registered (init)`);
    }), console.log(`${fe}Handlebars helpers registered (ctor)`);
  }
  registerHelpers() {
    const e = gd(), t = {
      // Foundry utils
      getProperty: foundry.utils.getProperty,
      // DND5E-inspired utilities
      "mwd-dataset": fd,
      "mwd-object": hd,
      // Simple comparisons
      eq: (i, a) => i === a,
      ne: (i, a) => i !== a,
      // Strings/arrays
      concat: (...i) => Z.join(i.slice(0, -1)),
      join: (i, a = " ") => Array.isArray(i) ? i.join(a) : "",
      includes: (i, a) => i == null ? void 0 : i.includes(a),
      length: (i) => (i == null ? void 0 : i.length) || 0,
      substring: (i, a, n) => i == null ? void 0 : i.substring(a, n),
      toUpperCase: Wl.toUpperCaseNoAccent,
      // Math
      modulo: (i, a) => i % a,
      divint: Z.divint,
      divup: Z.divup,
      sum: (i, a) => i + a,
      diff: (i, a) => i - a,
      times: (i, a) => i * a,
      min: (i, a) => Math.min(i, a),
      max: (i, a) => Math.max(i, a),
      // Utility blocks
      for: Fn.hbsForLoop,
      // fixes “Missing helper: for”
      range: (i, a) => Array.from({ length: a - i + 1 }, (n, r) => i + r),
      ifGte: (i, a, n) => i >= a ? n.fn(this) : n.inverse(this),
      // Damage / weapons (legacy-compatible)
      weaponDamageLetter: Ul.letter,
      weaponDamageCode: ot.damageCode,
      weaponDamageValue: ot.damageValue,
      weaponArmorMode: ot.armorMode,
      weaponRangeList: ot.getRangeList,
      // Icons
      iconFA: U.fontAwesome,
      iconSrc: U.iconSystemPath,
      iconPath: U.iconPath,
      iconD6: U.iconD6,
      // Enums
      localizeAttribute: oe.localizeAttribute
    };
    e.registerHelper(t), e !== Handlebars && Handlebars.registerHelper(t);
  }
  static hbsForLoop(e, t, i) {
    let a = "";
    for (let n = e; n < t; ++n) a += i.fn(n);
    return a;
  }
}
const yr = "sheetTheme", Ya = "mwd-theme-default", yd = "mwd-theme-sra", bd = [
  { name: "Default (CSB)", cssClass: Ya },
  { name: "SRA", cssClass: yd }
];
class Sd {
  constructor() {
    this.availableStyles = {}, di.register(Re.REGISTER_STYLES), Hooks.once(Re.REGISTER_STYLES, (e) => bd.forEach((t) => e(t.cssClass, t.name))), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(Re.REGISTER_STYLES, (e, t) => this.availableStyles[e] = t), console.log(fe + "Loaded styles", this.availableStyles), game.settings.register(T, yr, {
      scope: "world",
      name: "Sheet Theme",
      hint: "Select the visual theme used by MWD sheets.",
      config: !0,
      default: Ya,
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
    const e = game.settings.get(T, yr);
    return this.availableStyles[e] ? e : Ya;
  }
}
function Xi(s) {
  return s ? (s == null ? void 0 : s.document) ?? s : null;
}
function Sa(s, e) {
  var i, a, n;
  if (!s) return null;
  const t = Xi(e) ?? Xi(s == null ? void 0 : s.token);
  return t ? t.isLinked ? t.baseActor ?? ((n = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : n.call(i, ((a = t == null ? void 0 : t.baseActor) == null ? void 0 : a.id) ?? "")) ?? t.actor ?? s : t.actor ?? s : s;
}
function br(s) {
  const e = Number(s ?? 0);
  return Number.isFinite(e) ? Math.trunc(e) : 0;
}
function gs(s, e) {
  var t, i, a;
  return Math.max(0, Number(((a = (i = (t = s == null ? void 0 : s.system) == null ? void 0 : t.monitors) == null ? void 0 : i[e]) == null ? void 0 : a.value) ?? 0) || 0);
}
function Sr(s) {
  var e, t;
  return Math.max(0, Number(((t = (e = s == null ? void 0 : s.system) == null ? void 0 : e.burn) == null ? void 0 : t.value) ?? 0) || 0);
}
function qi(s) {
  return s === A.monitors.physical ? "Physical" : s === A.monitors.fatigue ? "Fatigue" : String(s ?? "").trim() || "Track";
}
function Ad(s, e) {
  var t;
  return ((t = Rn(e).find((i) => i.id === s)) == null ? void 0 : t.label) ?? s;
}
function wd(s) {
  const e = foundry.utils.escapeHTML, t = [];
  if (s.mode === "attackDamage" || s.mode === "trackDelta") {
    const i = s.appliedDelta >= 0 ? "Applied" : "Recovered", a = Math.abs(Number(s.appliedDelta ?? 0)), n = a === 1 ? "point" : "points", r = s.usedArmor ? ` via armor-aware ${e(Pt(s.damageType))}` : "";
    t.push(`<div><b>${i}:</b> ${a} ${n} to ${e(qi(s.track))}${r}</div>`), s.usedArmor && s.mitigation && (t.push(
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
function Td(s) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(s, e), s;
}
class Ze {
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
    return Rn(e).map((t) => ({
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
      const n = Xi(e[0]), r = Sa((n == null ? void 0 : n.actor) ?? null, n);
      return this._resolveSceneTargetResult(r, n);
    }
    const t = Array.from(((a = game.user) == null ? void 0 : a.targets) ?? []);
    if (t.length > 1)
      return { actor: null, token: null, reason: "Target only one token." };
    if (t.length === 1) {
      const n = Xi(t[0]), r = Sa((n == null ? void 0 : n.actor) ?? null, n);
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
  static resolveTarget({ actor: e = null, token: t = null, actorId: i = "", preferSceneTarget: a = !1 } = {}) {
    var o, l;
    const n = Xi(t);
    if (n) {
      const c = Sa((n == null ? void 0 : n.actor) ?? e, n), u = this._resolveSceneTargetResult(c, n);
      if (u.actor) return { ...u, source: "token" };
    }
    if (a) {
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
      reason: a && this.getSceneTarget().reason || "Choose a supported character target."
    };
  }
  static async apply({ actor: e = null, token: t = null, payload: i = {}, options: a = {} } = {}) {
    var l;
    const n = this.resolveTarget({
      actor: e,
      token: t,
      actorId: a.actorId ?? "",
      preferSceneTarget: !!a.preferSceneTarget
    });
    if (!n.actor)
      return { ok: !1, reason: n.reason || "Choose a supported character target." };
    let r;
    switch (String((i == null ? void 0 : i.mode) ?? "").trim()) {
      case "attackDamage":
        r = await this._applyAttackDamage(n.actor, i, a);
        break;
      case "trackDelta":
        r = await this._applyTrackDelta(n.actor, i, a);
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
      dryRun: !!a.dryRun,
      ...r
    };
    if (a.logToChat && !a.dryRun) {
      const c = wd(o), u = Td({
        speaker: ChatMessage.getSpeaker({ actor: n.actor, token: n.token }),
        content: c
      });
      await ChatMessage.create(u);
    }
    return a.dryRun || (l = de.renderOpenCharacterSheets) == null || l.call(de, n.actor.id), o;
  }
  static async _applyTrackDelta(e, t, i = {}) {
    const a = (t == null ? void 0 : t.track) === A.monitors.fatigue ? A.monitors.fatigue : A.monitors.physical, n = br((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0);
    if (!!(t != null && t.useArmor) && n > 0)
      return this._applyPersonalArmorAwareDamage(e, {
        mode: "trackDelta",
        track: a,
        damage: n,
        damageType: t == null ? void 0 : t.damageType,
        ap: (t == null ? void 0 : t.ap) ?? 0,
        effects: (t == null ? void 0 : t.effects) ?? {},
        source: t == null ? void 0 : t.source,
        notes: t == null ? void 0 : t.notes
      }, i);
    const o = gs(e, a);
    i.dryRun || await _.addCounter(e, a, n);
    const l = i.dryRun ? Math.max(0, o + n) : gs(e, a);
    return {
      mode: "trackDelta",
      track: a,
      requestedDelta: n,
      appliedDelta: l - o,
      usedArmor: !1,
      beforeLabel: `${qi(a)} ${o}`,
      afterLabel: `${qi(a)} ${l}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyBurnDelta(e, t) {
    var l, c;
    const i = br((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0), a = Sr(e), n = Math.max(0, a + i), r = { "system.burn.value": n };
    n === 0 && ((c = (l = e.system) == null ? void 0 : l.burn) != null && c.overloaded) && (r["system.burn.overloaded"] = !1), await e.update(r);
    const o = Sr(e);
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
    const a = zs(e, i), n = !!(t != null && t.active);
    await Po({ actor: e, statusId: i, active: n });
    const r = zs(e, i);
    return {
      mode: "status",
      statusId: i,
      statusLabel: Ad(i, e),
      active: r,
      beforeLabel: a ? "Active" : "Inactive",
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
    var H, D, V, ee, X, te, ce, Se, O;
    const a = !!i.dryRun, n = (t == null ? void 0 : t.track) === A.monitors.fatigue ? A.monitors.fatigue : A.monitors.physical, r = Math.max(0, Number((t == null ? void 0 : t.damage) ?? 0) || 0), o = Math.max(0, Number((t == null ? void 0 : t.netHits) ?? 0) || 0), l = (t == null ? void 0 : t.effects) ?? {}, c = ((H = e.getPersonalCombatLoadout) == null ? void 0 : H.call(e, { refresh: !0 })) ?? null, u = (c == null ? void 0 : c.activeArmor) ?? null, d = Math.max(0, Number((u == null ? void 0 : u.currentArmorRating) ?? ((D = u == null ? void 0 : u.durability) == null ? void 0 : D.current) ?? 0) || 0), m = yt(t == null ? void 0 : t.damageType, "concussive"), p = gs(e, n);
    let f = r + o;
    const h = d > 0 ? kc({
      damageIncoming: f,
      armorTags: (u == null ? void 0 : u.tags) ?? [],
      effects: l
    }) : { damageIncoming: f, applied: [] };
    f = h.damageIncoming;
    const g = Tc({
      currentArmorRating: d,
      mitigationByType: (u == null ? void 0 : u.mitigationByType) ?? {},
      damageType: m
    }), y = Math.max(
      0,
      (Number((t == null ? void 0 : t.ap) ?? 0) || 0) + (Number((l == null ? void 0 : l.ap) ?? 0) || 0)
    ), b = g.isDestroyed ? 0 : Math.max(0, g.baseMitigation + g.typeMitigationMod - y);
    let S = Math.max(0, Math.ceil(f - b));
    const w = {
      snapshot: ((V = de.getSnapshot) == null ? void 0 : V.call(de, e)) ?? null
    }, E = rt({
      actor: e,
      phase: "onDamageResolved",
      facts: Uo({
        actor: e,
        packet: {
          amount: S,
          track: n,
          damageType: m
        },
        runtime: w
      }),
      packet: {
        amount: S,
        track: n,
        damageType: m
      },
      options: { runtime: w, consumeUsage: !0 }
    });
    a || await Xt({ actor: e, mutations: E.mutations, runtime: w }), S = Math.max(0, Number(E.packet.amount ?? S) || 0), !a && S > 0 && await _.addCounter(e, n, S);
    const I = Math.max(0, Number(((ee = u == null ? void 0 : u.durability) == null ? void 0 : ee.current) ?? 0) || 0);
    let N = I;
    const L = Math.max(0, Number(((te = (X = u == null ? void 0 : u.traitState) == null ? void 0 : X.reinforced) == null ? void 0 : te.current) ?? 0) || 0), Y = Math.max(0, Number(((Se = (ce = u == null ? void 0 : u.traitState) == null ? void 0 : ce.reinforced) == null ? void 0 : Se.max) ?? 0) || 0);
    let Q = L;
    if (r + o > 0 && ((O = u == null ? void 0 : u.item) != null && O.id)) {
      const F = {};
      L > 0 ? (Q = Math.max(0, L - 1), Q !== L && (F["system.traitState.reinforced.current"] = Q)) : (N = Math.max(0, I - 1), N !== I && (F["system.durability.current"] = N)), !a && Object.keys(F).length > 0 && await u.item.update(F);
    }
    const G = a ? Math.max(0, p + S) : gs(e, n);
    return {
      mode: (t == null ? void 0 : t.mode) ?? "attackDamage",
      track: n,
      requestedDelta: r + o,
      appliedDelta: G - p,
      usedArmor: !0,
      damageType: m,
      effectiveAp: y,
      mitigation: {
        ...g,
        netResistance: b,
        armorBefore: I,
        armorAfter: N,
        reinforcedBefore: L,
        reinforcedAfter: Q,
        reinforcedMax: Y
      },
      damageIncoming: f,
      adjustedIncoming: f,
      finalDamage: S,
      tagEffectResult: h,
      beforeLabel: `${qi(n)} ${p}`,
      afterLabel: `${qi(n)} ${G}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
}
R(Ze, "MODE_OPTIONS", Object.freeze([
  { value: A.monitors.physical, label: "Physical" },
  { value: A.monitors.fatigue, label: "Fatigue" },
  { value: "burn", label: "Burn" },
  { value: "status", label: "Status" }
]));
const kd = $s, Qa = "damage-mode", Md = `${T}.${Qa}`, ys = {}, Aa = {};
class re {
  static init() {
    di.register(Re.PROVIDE_DAMAGE_MODE), Hooks.on("updateSetting", async (e, t, i, a) => re.onUpdateSetting(e, t, i, a)), Hooks.on(Re.PROVIDE_DAMAGE_MODE, (e) => {
      e("resistanceArmorMonitor", k.settings.damageMode.values.resistanceArmorMonitor, re.sufferDamageResistanceArmorMonitor), e("armorResistanceMonitor", k.settings.damageMode.values.armorResistanceMonitor, re.sufferDamageArmorResistanceMonitor), e("armorGivesResistance", k.settings.damageMode.values.armorGivesResistance, re.sufferDamageArmorAsResistance_Earthdawn), e("armorGiveResistanceHitsAvoid", k.settings.damageMode.values.armorGiveResistanceHitsAvoid, re.sufferDamageArmorAsResistance_Cyberpunk);
    }), Hooks.once("ready", () => re.onReady());
  }
  static onReady() {
    re._registerDamageModeSetting(), re._selectDamageMode();
  }
  static _registerDamageModeSetting() {
    Hooks.callAll(Re.PROVIDE_DAMAGE_MODE, (e, t, i) => {
      ys[e] = t, Aa[e] = i;
    }), game.settings.register(T, Qa, {
      scope: "world",
      name: k.settings.damageMode.name,
      hint: k.settings.damageMode.hint,
      config: !0,
      default: Object.keys(ys)[0],
      choices: ys,
      type: String
    });
  }
  static async onUpdateSetting(e, t, i, a) {
    e.key == Md && re._selectDamageMode();
  }
  static _selectDamageMode() {
    let e = game.settings.get(T, Qa);
    Aa[e] || (e = Object.keys(ys)[0]), re.damageModeCode = e, re.damageModeMethod = Aa[e];
  }
  static async sufferDamage(e, t, i, a, n, r, o) {
    const { monitor: l, damageType: c } = re._resolveDamageContext(e, t, o);
    if (hi.checkActorCanReceiveDamage(c ?? l, l, e), re._shouldUsePersonalDamageV2(e, l, o)) {
      await re.sufferPersonalDamageV2(e, l, c, i, a, n, r, o);
      return;
    }
    await (re.damageModeMethod ?? re.sufferDamageResistanceArmorMonitor)(e, l, c, i, a, n, r), await e.applyArmorDamage(l, c, ae.sumModifiers([o], "other", "damageArmor"));
  }
  static _shouldUsePersonalDamageV2(e, t, i) {
    var a, n;
    return !((a = e == null ? void 0 : e.isCharacterLike) != null && a.call(e)) || ![A.monitors.physical, A.monitors.fatigue].includes(t) ? !1 : !!((n = i == null ? void 0 : i.isPersonalWeapon) != null && n.call(i) || (i == null ? void 0 : i.canonicalType) === A.itemType.personalWeapon || (i == null ? void 0 : i.type) === A.itemType.personalWeapon);
  }
  static async sufferPersonalDamageV2(e, t, i, a, n, r, o, l) {
    var d;
    const c = ((d = l == null ? void 0 : l.getCombatProfile) == null ? void 0 : d.call(l)) ?? l ?? null, u = await Ze.apply({
      actor: e,
      payload: {
        mode: "attackDamage",
        track: t,
        damage: Number(a ?? (c == null ? void 0 : c.damage) ?? 0) || 0,
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
    const i = t.armorMitigation ?? {}, a = re._localizeDamageType(t.damageType), n = i.isDestroyed ? "Armor destroyed" : `Base ${Number(i.baseMitigation ?? 0)} + Type ${Number(i.typeMitigationMod ?? 0)} - AP ${Number(t.effectiveAp ?? 0)}`, r = Number(t.adjustedIncoming ?? t.baseIncoming ?? 0), o = Number(t.finalDamage ?? 0), l = (((u = t.tagEffectResult) == null ? void 0 : u.applied) ?? []).map((d) => `${d.tag} +${Math.round((Number(d.bonus ?? 0) || 0) * 100)}%`).join(", "), c = l ? ` [${l}]` : "";
    ui.notifications.info(
      `${e.name} mitigated ${a}: ${n}${c}. Incoming ${r}, final ${o}.`
    );
  }
  static async sufferDamageResistanceArmorMonitor(e, t, i, a, n, r, o) {
    const l = _.resistanceDetail(e, t, i), c = l.value;
    let u = 0;
    if (r) {
      const d = Math.min(c, a), m = Math.min(c - d, n);
      u = a - d, _.useArmor(t) && (u -= await re.damageToArmor(e, i, u)), u += n - m;
    } else
      u = a + n - c, _.useArmor(t) && (u -= await re.damageToArmor(e, i, u));
    u > 0 && await _.addCounter(e, t, u), re._notifyResistanceUsage(e, t, i, l);
  }
  static async sufferDamageArmorResistanceMonitor(e, t, i, a, n, r, o) {
    let l = 0;
    _.useArmor(t) ? r ? (a -= await re.damageToArmor(e, i, a), l = n + a) : (l = n + a, l -= await re.damageToArmor(e, i, l)) : l = a + n;
    const c = _.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await _.addCounter(e, t, l), re._notifyResistanceUsage(e, t, i, c), l;
  }
  static async sufferDamageArmorAsResistance_Cyberpunk(e, t, i, a, n, r, o) {
    let l = a + n;
    if (_.useArmor(t) && l > 0) {
      const u = r ? n : 0, d = Math.max(0, re._computeArmorResistance(e) - u);
      d > 0 && (await _.addCounter(e, "armor", 1), l -= d);
    }
    const c = _.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await _.addCounter(e, t, l), re._notifyResistanceUsage(e, t, i, c), Math.max(l, 0);
  }
  static async sufferDamageArmorAsResistance_Earthdawn(e, t, i, a, n, r, o) {
    let l = a + n;
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
      const a = _.max(e, A.monitors.armor), n = _.getCounterValue(e, A.monitors.armor), r = Math.min(a - n, i), o = _.resistance(e, A.monitors.armor, t), l = Math.max(0, r - o);
      return l > 0 && await _.addCounter(e, A.monitors.armor, l), r;
    } else
      return 0;
  }
  static _resolveDamageContext(e, t, i) {
    var o;
    const a = (typeof t == "object" ? (t == null ? void 0 : t.damageType) ?? (t == null ? void 0 : t.type) : t) ?? ((o = i == null ? void 0 : i.system) == null ? void 0 : o.damageType), n = typeof t == "object" ? (t == null ? void 0 : t.monitor) ?? a : a;
    return { monitor: e.getDamageMonitor(n), damageType: a };
  }
  static _notifyResistanceUsage(e, t, i, a) {
    var u;
    if (!a || t === void 0)
      return;
    const n = k.actor.monitors[t] ?? t, r = re._localizeDamageType(i) ?? n, o = a.usedType ? "type" : "default", l = ((u = k.actor.monitors.resistanceSources) == null ? void 0 : u[o]) ?? o, c = be(k.actor.monitors.resistanceApplied, {
      actor: e.name,
      monitor: n,
      damageType: r,
      value: a.value,
      source: l
    });
    ui.notifications.info(c);
  }
  static _localizeDamageType(e) {
    if (e)
      return lo(e) ? Pt(e) : k.mwd.weaponDamageType[e] ?? k.mwd.personalDamageType[e] ?? k.actor.monitors[e] ?? e;
  }
  static _computeArmorResistance(e) {
    const t = _.max(e, "armor"), i = _.getCounterValue(e, "armor"), a = Math.max(0, t - i);
    return Math.max(0, Math.ceil(a / 3));
  }
  static _computeStrengthResistance(e, t) {
    const i = e.getAttributeValue(A.actorAttributes.strength);
    return Math.max(0, Math.floor(i / 4));
  }
}
class Je extends Actor {
  static init() {
    Hooks.on("updateActor", (e, t, i, a) => {
      var n;
      return (n = at.firstResponsible(e)) == null ? void 0 : n.onUpdateActor(t, i);
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
      const n = i.system.code === "knowledge" || i.system.attribute === "knowledge", r = a.system.code === "knowledge" || a.system.attribute === "knowledge";
      if (n && !r) return 1;
      if (!r && n) return -1;
      if (n && r)
        return i.name > a.name ? 1 : i.name > a.name ? -1 : 0;
      const o = e.getAttributeValue(i.system.attribute) + i.system.value, l = e.getAttributeValue(a.system.attribute) + a.system.value;
      return o > l ? -1 : o < l ? 1 : 0;
    }) : [];
  }
  static sortQualities(e) {
    if (!e)
      return [];
    const t = ["positive", "negative", "narrative"], i = ["major", "minor"];
    return e.sort((a, n) => {
      var m, p, f, h, g, y;
      const r = String(((m = a.system) == null ? void 0 : m.category) ?? (((p = a.system) == null ? void 0 : p.positive) === !1 ? "negative" : "positive")).trim() || "positive", o = String(((f = n.system) == null ? void 0 : f.category) ?? (((h = n.system) == null ? void 0 : h.positive) === !1 ? "negative" : "positive")).trim() || "positive", l = t.indexOf(r) - t.indexOf(o);
      if (l !== 0) return l;
      const c = String(((g = a.system) == null ? void 0 : g.tier) ?? "minor").trim() || "minor", u = String(((y = n.system) == null ? void 0 : y.tier) ?? "minor").trim() || "minor", d = i.indexOf(c) - i.indexOf(u);
      return d !== 0 ? d : String(a.name ?? "").localeCompare(String(n.name ?? ""));
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
      initiative: ae.sumModifiers(this.items, "other", "initiative")
    }, this.system.monitors) {
      const e = oe.getDamageTypes();
      Object.entries(this.system.monitors).forEach((t) => {
        t[1].resistance = Je.normalizeResistance(t[1].resistance), t[1].maxBonus = ae.sumMonitorModifiers(this.items, t[0], "max"), t[1].resistanceBonus = ae.sumMonitorModifiers(this.items, t[0], "resistance"), t[1].resistanceBonusByType = Object.fromEntries(
          e.map((i) => [i.value, ae.sumMonitorModifiers(this.items, t[0], "resistanceByType", i.value)]).filter(([, i]) => i)
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
    return _i[this.type] ?? [];
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
    const e = this.getAttributeValue(A.actorAttributes.edge), t = foundry.utils.getProperty(this.system, "counters.edgePools") ?? {};
    Object.values(A.counters.edgePools).forEach((a) => {
      const n = t[a] ?? {}, r = n.value;
      n.value = r ?? e ?? 0, n.value = Math.min(n.value, e ?? n.value ?? 0), n.max = e ?? n.max ?? 0, t[a] = n;
    }), foundry.utils.setProperty(this.system, "counters.edgePools", t);
  }
  async setCheckbarValue(e, t) {
    return await this.update({ [e]: t });
  }
  _getMonitorMax(e) {
    const t = this.getAttributeValue(e);
    return t == 0 ? 0 : Jr + Z.divup(t, 2);
  }
  getAttributeActions() {
    return ke.getActorActions(this);
  }
  getUsableAttributes(e = void 0) {
    const t = (e ? [e] : this.items).map((a) => a.getAttributes()).reduce((a, n) => a.concat(n), []), i = Z.distinct(this.getAttributes().concat(t));
    return i.sort(Z.ascendingBySortedArray(oe.sortedAttributeKeys)), i;
  }
  getAttributeValue(e, t = void 0) {
    let i = 0;
    if (e = this.getCorrespondingAttribute(e), e) {
      if (this.getAttributes().includes(e))
        i = this.system.attributes[e].value;
      else if (t)
        i = (t == null ? void 0 : t.getAttributeValue(e)) ?? 0;
      else {
        const a = this.items.filter((n) => n.getAttributes().includes(e));
        if (a.length > 0) {
          const n = a.map((r) => r.getAttributeValue(e) ?? 0);
          i = Math.max(...n);
        }
      }
      i += ae.sumModifiers(this.items, "attribute", e);
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
        await re.damageToArmor(this, t, i);
    }
  }
  async rollAttribute(e) {
    await ft.rollAttribute(this, e);
  }
  async rollAttributeAction(e) {
    const t = ke.getActorAction(this, e);
    await ft.rollAttributeAction(this, t);
  }
  async rollSkill(e, t) {
    await ft.rollSkill(this, e, t);
  }
  async rollWeapon(e) {
    var n, r, o;
    hi.checkWeaponDefense(e, this);
    const t = (n = e.validateTargets(this)) == null ? void 0 : n.map((l) => l.id), i = {
      attackerTokenId: (o = (r = game.scenes.current) == null ? void 0 : r.tokens.find((l) => {
        var c;
        return ((c = l.actor) == null ? void 0 : c.id) == this.id;
      })) == null ? void 0 : o.id,
      targetedTokenIds: t
    }, a = this.items.find((l) => e.isWeaponSkill(l));
    await ft.rollWeapon(this, a, e, i);
  }
  async rollDefense(e) {
    const t = e.attack.defense, i = ke.getActorDefense(this, t);
    await ft.rollDefense(this, i, e);
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
    const e = ae.sumModifiers(this.items, "other", "sceneAnarchy");
    e > 0 && await _.setCounter(this, A.monitors.sceneAnarchy, e);
  }
  async onLeaveCombat() {
    await _.setCounter(this, A.monitors.sceneAnarchy, 0);
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
    var a, n;
    const e = this.hasGMAnarchy(), t = (n = (a = game.system) == null ? void 0 : a.anarchy) == null ? void 0 : n.gmAnarchy, i = e && t && typeof t.getAnarchy == "function" ? t.getAnarchy() : {
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
    var n, r;
    const t = this.getAttributeValue(A.actorAttributes.edge), a = ((r = (n = this.getEdgePools()) == null ? void 0 : n[e]) == null ? void 0 : r.value) ?? t ?? 0;
    return Math.min(a, t ?? a ?? 0);
  }
  getRemainingEdge(e = void 0) {
    return e ? this.getEdgePoolValue(e) : Math.max(0, ...Object.values(A.counters.edgePools).map((t) => this.getEdgePoolValue(t)));
  }
  canUseEdge() {
    return this.getAttributes().includes(A.actorAttributes.edge);
  }
  async spendEdgePool(e, t) {
    t != 0 && await _.addCounter(this, e, -t);
  }
  async spendEdge(e, t = A.counters.edgePools.grit) {
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
    const i = Je._prepareFavorite(e, t);
    return !!this.system.favorites.find((a) => Je._isSameFavorite(i, a));
  }
  static _prepareFavorite(e, t) {
    return { type: e, id: t };
  }
  static _isSameFavorite(e, t) {
    return e.id == t.id && e.type == t.type;
  }
  async switchFavorite(e, t, i) {
    const a = Je._prepareFavorite(t, i), n = this.system.favorites.filter((r) => !Je._isSameFavorite(a, r));
    e && n.push(a), this.update({ "system.favorites": n });
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
    const i = Je._prepareFavorite(e, t);
    if (e == "attributeAction") {
      const n = ke.prepareShortcut(this, t);
      if (n)
        return foundry.utils.mergeObject(n, i);
    } else if (Object.values(A.itemType).includes(e)) {
      const n = (a = this.items.get(t)) == null ? void 0 : a.prepareShortcut();
      if (n)
        return foundry.utils.mergeObject(n, i);
    }
    return i;
  }
  async _onSetManualStepper(e, t) {
    var r, o;
    e == null || e.preventDefault();
    const i = (r = t == null ? void 0 : t.dataset) == null ? void 0 : r.id, a = Number((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.value);
    if (!i || Number.isNaN(a)) return;
    const n = this._mwd.state.manual.find((l) => l.id === i);
    if (n)
      return n.value = a, this.render(!1);
  }
}
const { ApplicationV2: vd, HandlebarsApplicationMixin: Ed } = foundry.applications.api, { renderTemplate: Ar } = foundry.applications.handlebars, Cd = `${q}/chat/celebrity-roll.hbs`, Ri = class Ri extends Ed(vd) {
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
        ae.computeModifiers(e.items, "other", "celebrity")
      ),
      other: {
        label: k.common.roll.modifiers.other,
        value: 0
      },
      ANARCHY: k
    }, i = await Ar(`${q}/dialog/roll-celebrite-title.hbs`, t), a = {
      id: `roll-celebrity-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Ri.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new Ri({ roll: t }, a).render({ force: !0 });
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
      await Ri.doRoll(this.roll), await this.close();
    }), i.find('[data-action="cancel"]').on("click", async () => {
      await this.close();
    });
  }
  static async doRoll(e) {
    const t = [
      e.celebrity,
      e.modifiers,
      e.other
    ], i = Z.sumValues(t, (o) => o.value), a = {
      actor: e.actor,
      parameters: t,
      pool: i,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      },
      ANARCHY: k
    }, n = new Roll(`${i}d6cs>=5`);
    await n.evaluate();
    const r = await Ar(Cd, a);
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
R(Ri, "PARTS", {
  body: {
    template: `${q}/dialog/roll-celebrite.hbs`
  }
});
let Ja = Ri;
const { renderTemplate: Pd } = foundry.applications.handlebars, Nd = `${q}/chat/actor-say-word.hbs`;
class wr extends Je {
  static get initiative() {
    return Je.initiative + " + max(@attributes.reflexes.value, @attributes.intelligence.value)";
  }
  hasOwnAnarchy() {
    return this.hasPlayerOwner;
  }
  prepareDerivedData() {
    !this.system.monitors.fatigue && this.system.monitors.stun && (this.system.monitors.fatigue = foundry.utils.duplicate(this.system.monitors.stun)), this.system.monitors.physical.max = this._getMonitorMax(A.actorAttributes.strength), this.system.monitors.fatigue.max = this._getMonitorMax(A.actorAttributes.willpower), super.prepareDerivedData(), this.system.ignoreWounds = ae.sumModifiers(this.items, "other", "ignoreWounds");
  }
  computePhysicalState() {
    var l, c;
    const e = Math.max(0, Number(((l = this.system.monitors.armor) == null ? void 0 : l.max) ?? 0)), t = Math.min(
      e,
      Math.max(0, Number(((c = this.system.monitors.armor) == null ? void 0 : c.value) ?? 0))
    ), i = Math.max(0, e - t), a = Math.max(this.system.monitors.physical.max, this.system.monitors.fatigue.max) + e, n = this.system.monitors.physical.value == this.system.monitors.physical.max, r = this.system.monitors.fatigue.max == this.system.monitors.fatigue.value, o = n || r ? a : Math.max(this.system.monitors.physical.value, this.system.monitors.fatigue.value) + i;
    return {
      max: a,
      value: a - o
    };
  }
  getAttributes() {
    return _i[this.type] ?? _i[A.actorTypes.character];
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
    var a, n;
    const i = (a = this.getWord(e, t)) == null ? void 0 : a.word;
    i && ChatMessage.create({
      speaker: { alias: ((n = this.token) == null ? void 0 : n.name) ?? this.name },
      content: await Pd(
        Nd,
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
    this._mutateWords(e, (a) => a.map((n) => (n.id == t && i(n), n)));
  }
  async deleteWord(e, t) {
    this._mutateWords(e, (i) => i.filter((a) => a.id != t));
  }
  async _mutateWords(e, t = (i) => i) {
    if (!e)
      return;
    let i = t(this.system[e]);
    Z.reindexIds(i), await this.update({ [`system.${e}`]: i });
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
      hi.checkSufficient(k.actor.counters.anarchy, e, i + t);
      const a = Math.min(t, e), n = e - a;
      a > 0 && _.addCounter(this, A.monitors.sceneAnarchy, -a), this.hasPlayerOwner ? (await game.system.anarchy.gmAnarchy.actorGivesAnarchyToGM(this, e), _.addCounter(this, A.monitors.anarchy, -n)) : n > 0 && super.spendAnarchy(n);
    }
  }
  canUseEdge() {
    return !0;
  }
  getWounds() {
    const e = Z.divint(this.system.monitors.fatigue.value, 3) + Z.divint(this.system.monitors.physical.value, 3);
    return Math.max(0, e - this.system.ignoreWounds);
  }
  async rollCelebrity() {
    await Ja.create(this);
  }
}
class sl extends Je {
  prepareDerivedData() {
    this._prepareMwdAttributes(), this._prepareMwdMonitors(), this._prepareMwdItems(), super.prepareDerivedData();
  }
  static get defaultIcon() {
    return `${Gs}/default/Default_Vehicle.svg`;
  }
  static get initiative() {
    return Je.initiative + " + max(@attributes.system.value, @attributes.handling.value)";
  }
  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    };
  }
  getAttributes() {
    return _i[this.type] ?? _i[A.actorTypes.vehicle];
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
    var a;
    const t = ((a = this.system.attributes.handling) == null ? void 0 : a.value) ?? 0, i = this.system.handling;
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
    ), Object.entries(e.attributes).forEach(([a, n]) => {
      var r;
      ((r = i[a]) == null ? void 0 : r.value) === void 0 && (i[a] = i[a] ?? {}, i[a].value = (n == null ? void 0 : n.value) ?? 0);
    });
  }
  _prepareMwdMonitors() {
    var a, n, r, o, l, c, u, d;
    const e = this.system.mwd = this.system.mwd ?? {}, t = this.system.monitors = this.system.monitors ?? {}, i = {
      value: ((a = t.structure) == null ? void 0 : a.value) ?? 0,
      max: ((n = t.structure) == null ? void 0 : n.max) ?? (this.type === A.actorTypes.battlemech ? 18 : 15),
      resistance: Je.normalizeResistance((r = t.structure) == null ? void 0 : r.resistance)
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
        resistance: Je.normalizeResistance((d = t.heat) == null ? void 0 : d.resistance)
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
      Object.entries(t).map(([i, a]) => [
        i,
        this.items.filter((n) => a.includes(n.type))
      ])
    );
  }
}
const Tr = {
  light: 4,
  medium: 5,
  heavy: 6,
  assault: 7
}, Rd = { mode: "normal", allowedWeaponIds: [], typeRestriction: "" }, Dd = {
  baseProfile: { name: "Unarmed", damage: "", notes: "" },
  maxWeapons: 0,
  allowedLocations: []
};
class Id {
  constructor(e) {
    this.actor = e, this.mwd = e.system.mwd ?? {};
  }
  compute() {
    const e = this.mwd.weightClass ?? "medium", t = Tr[e] ?? Tr.medium, i = this._normalizeHardpoints(), a = this._normalizeWeaponGroups(), n = a.find((y) => y.isPrimary), r = a.filter((y) => y.isPrimary), o = this._primarySlot(), l = [], c = [];
    r.length > 1 && l.push(k.mwd.loadout.errors.multiplePrimary);
    const u = n ? t - 1 : t, d = a.length + (n ? 1 : 0);
    a.length > u && l.push(be(k.mwd.loadout.errors.mountPointsExceeded, {
      used: d,
      total: t
    }));
    const m = this._getWeapons((y) => (y.system.weaponCategory ?? "ranged") !== "melee"), p = new Map(m.map((y) => [y.id, y])), f = /* @__PURE__ */ new Set(), h = i.map((y) => ({ ...y, occupiedBy: null, occupiedByName: void 0 }));
    for (const y of a)
      for (const b of y.weaponIds ?? []) {
        const S = p.get(b);
        if (!S) {
          c.push(be(k.mwd.loadout.warnings.weaponMissing, { weapon: b }));
          continue;
        }
        const w = S.system.hardpointType ?? "energy", E = S.system.hardpointSize ?? "small";
        if (f.has(b)) {
          l.push(be(k.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: S.name }));
          continue;
        }
        if (f.add(b), y.isPrimary && this._validatePrimaryWeapon(S, w, E, o, l), (S.system.weaponCategory ?? "ranged") === "melee")
          continue;
        const I = h.find((N) => !N.occupiedBy && N.type === w && N.size === E);
        I ? (I.occupiedBy = y.id, I.occupiedByName = y.name) : l.push(be(k.mwd.loadout.errors.hardpointUnavailable, {
          weapon: S.name,
          type: k.mwd.hardpointType[w] ?? w,
          size: k.mwd.hardpointSize[E] ?? E
        }));
      }
    n && (!n.weaponIds || n.weaponIds.length === 0) && l.push(k.mwd.loadout.errors.primaryWithoutWeapon);
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
      name: e.name || be(k.common.newName, { type: k.itemType.singular.weapon }),
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
    const e = foundry.utils.mergeObject(foundry.utils.duplicate(Rd), this.mwd.primarySlot ?? {});
    return e.allowedWeaponIds = this._asArray(e.allowedWeaponIds), e;
  }
  _computeMeleeState(e) {
    var o, l, c;
    const t = foundry.utils.mergeObject(foundry.utils.duplicate(Dd), this.mwd.melee ?? {}), i = this._getWeapons((u) => (u.system.weaponCategory ?? "ranged") === "melee"), a = [], n = Number(t.maxWeapons ?? 0);
    i.length > n && e.push(be(k.mwd.loadout.errors.meleeLimitExceeded, {
      equipped: i.length,
      limit: n
    }));
    const r = this._asArray(t.allowedLocations);
    return a.push({
      name: ((o = t.baseProfile) == null ? void 0 : o.name) || k.mwd.melee.baseProfile,
      damage: ((l = t.baseProfile) == null ? void 0 : l.damage) ?? "",
      notes: ((c = t.baseProfile) == null ? void 0 : c.notes) ?? ""
    }), i.forEach((u) => {
      var d;
      r.length > 0 && u.system.mountLocation && !r.includes(u.system.mountLocation) && e.push(be(k.mwd.loadout.errors.meleeLocationRestricted, {
        weapon: u.name,
        location: k.mwd.meleeLocation[u.system.mountLocation] ?? u.system.mountLocation
      })), a.push({
        name: u.name,
        damage: u.getDamageCode(),
        notes: ((d = u.system.references) == null ? void 0 : d.description) ?? ""
      });
    }), { profiles: a, limit: n };
  }
  _validatePrimaryWeapon(e, t, i, a, n) {
    var r;
    a.mode === "converted" ? (((r = a.allowedWeaponIds) == null ? void 0 : r.length) > 0 && !a.allowedWeaponIds.includes(e.id) && n.push(be(k.mwd.loadout.errors.primaryNotAllowedWeapon, { weapon: e.name })), a.typeRestriction && t !== a.typeRestriction && n.push(be(k.mwd.loadout.errors.primaryTypeRestriction, {
      weapon: e.name,
      type: k.mwd.hardpointType[a.typeRestriction] ?? a.typeRestriction
    }))) : i !== "large" && n.push(be(k.mwd.loadout.errors.primaryNeedsLarge, { weapon: e.name }));
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
class Od extends sl {
  static get defaultIcon() {
    return `${Gs}/vehicles/apc.svg`;
  }
  prepareDerivedData() {
    var e;
    super.prepareDerivedData(), this.system.mwd = this.system.mwd ?? {}, this.system.mwd.chassis = this.system.mwd.chassis ?? "", this.system.mwd.tonnage = this.system.mwd.tonnage ?? 0, this.system.mwd.loadout = new Id(this).compute(), this.system.mwd.weaponGroupDetails = this._prepareConfiguredWeaponGroups(), this.system.mwd.heat = this._prepareHeatTrack(), this.system.mwd.primaryGroupName = ((e = this.system.mwd.weaponGroupDetails.find((t) => t.isPrimary)) == null ? void 0 : e.name) ?? "", this.system.skills = this._prepareSkillMap(), this.system.weaponGroups = this._prepareWeaponGroups(), this.system.meleeProfiles = this._prepareMeleeProfiles(), this.system.quickActions = {
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
    }, n = foundry.utils.mergeObject(a, i, { inplace: !1 });
    n.thresholds = foundry.utils.mergeObject(a.thresholds, i.thresholds ?? {}, { inplace: !1 }), n.current = t.value ?? n.current, n.max = t.max ?? n.max;
    const r = this._resolveHeatStatus(n.current, n.thresholds, n.max);
    return this.system.mwd.heatStatus = {
      code: r,
      label: k.actor.battlemech.heat.status[r] ?? r
    }, n;
  }
  _resolveHeatStatus(e, t, i) {
    return e >= ((t == null ? void 0 : t.shutdown) ?? i) ? "shutdown" : e >= ((t == null ? void 0 : t.overheated) ?? i) ? "overheated" : e >= ((t == null ? void 0 : t.runningHot) ?? 0) ? "runningHot" : "safe";
  }
  _prepareConfiguredWeaponGroups() {
    var i;
    const e = ((i = this.system.mwd) == null ? void 0 : i.weaponGroups) ?? [], t = new Map(this.items.map((a) => [a.id, a]));
    return e.map((a, n) => {
      const r = Array.isArray(a.weaponIds) ? a.weaponIds : a.weaponIds ? [a.weaponIds] : [], o = r.map((c) => t.get(c)).filter((c) => (c == null ? void 0 : c.type) === A.itemType.mechWeapon), l = r.filter((c) => !t.has(c));
      return {
        id: a.id ?? `group-${n + 1}`,
        index: n,
        name: a.name || be(k.common.newName, { type: k.itemType.singular.weapon }),
        weaponIds: r,
        isPrimary: a.isPrimary ?? !1,
        weapons: o,
        missingWeaponIds: l
      };
    });
  }
  _resolveSkill(e) {
    var a;
    const t = this.items.find((n) => n.type === A.itemType.skill && n.system.code === e);
    if (t)
      return t;
    const i = lt(e);
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
    const t = this.items.filter((r) => r.type === A.itemType.mechWeapon);
    if (t.length === 0)
      return [];
    const i = t.filter((r) => this.hasFavorite(A.itemType.mechWeapon, r.id)), a = [];
    return i.length > 0 && a.push({
      id: "favorite",
      name: k.actor.vehicle.quickActions.primaryWeapons,
      weaponIds: i.map((r) => r.id),
      isPrimary: !0
    }), a.push({
      id: "all",
      name: k.actor.vehicle.quickActions.allWeapons,
      weaponIds: t.map((r) => r.id),
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
    }], t = this.items.filter((i) => i.type === A.itemType.mechWeapon && i.system.skill === "meleeCombat");
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
    var n;
    const i = ((n = e == null ? void 0 : e.system) == null ? void 0 : n.attribute) ?? this.getPhysicalAgility(), a = foundry.utils.mergeObject(ft.prepareActorRoll(this), {
      mode: ze.rollType.skill,
      skill: e,
      attribute1: i,
      specialization: void 0
    });
    t.quickAction && (a.quickAction = t.quickAction), await ft.create(a);
  }
  async _promptWeaponGroup(e) {
    if (e.length === 1)
      return e[0];
    const t = e.find((n) => n.isPrimary) ?? e[0], i = `<form class="mwd-quick-select">${e.map((n) => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${n.id}" ${n.id === t.id ? "checked" : ""}>
        <span>${n.name}${n.isPrimary ? ` (${k.actor.vehicle.quickActions.primaryLabel})` : ""}</span>
      </label>`).join("")}</form>`, a = await Dialog.prompt({
      title: k.actor.vehicle.quickActions.selectWeaponGroup,
      content: i,
      label: k.common.roll.button,
      callback: (n) => n.find('input[name="weapon-group"]:checked').val() ?? t.id
    });
    return e.find((n) => n.id === a) ?? t;
  }
  async _promptMeleeProfile(e) {
    if (e.length === 1)
      return e[0];
    const t = e[0], i = `<form class="mwd-quick-select">${e.map((n) => `
      <label class="quick-select-option">
        <input type="radio" name="melee-profile" value="${n.id}" ${n.id === t.id ? "checked" : ""}>
        <span>${n.name}</span>
      </label>`).join("")}</form>`, a = await Dialog.prompt({
      title: k.actor.vehicle.quickActions.selectMeleeProfile,
      content: i,
      label: k.common.roll.button,
      callback: (n) => n.find('input[name="melee-profile"]:checked').val() ?? t.id
    });
    return e.find((n) => n.id === a) ?? t;
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
const Rs = "activeModifiers", zn = [
  { value: "", label: "All Attributes" },
  { value: "reflexes", label: "Reflexes" },
  { value: "strength", label: "Strength" },
  { value: "willpower", label: "Willpower" },
  { value: "charisma", label: "Charisma" },
  { value: "intelligence", label: "Intelligence" },
  { value: "edge", label: "Edge" }
], Un = [
  { value: "", label: "All Intents" },
  { value: "skill", label: "Skill" },
  { value: "attack", label: "Attack" },
  { value: "defense", label: "Defense" },
  { value: "common", label: "Common" },
  { value: "attribute", label: "Attribute" },
  { value: "edge", label: "Edge" },
  { value: "initiative", label: "Initiative" }
];
function kr(s) {
  const e = String(s ?? "").trim();
  return e === "" ? null : e;
}
function _d(s) {
  return String((s == null ? void 0 : s.intent) ?? "").trim() || null;
}
function Ld(s) {
  var e, t, i;
  return ((e = s == null ? void 0 : s.data) == null ? void 0 : e.attrKey) ?? // skill rolls
  ((i = (t = s == null ? void 0 : s.attack) == null ? void 0 : t.skill) == null ? void 0 : i.attribute) ?? // attack rolls
  null;
}
function Mr(s, e) {
  return s ? e ? s === e : !1 : !0;
}
function al(s) {
  return {
    id: String((s == null ? void 0 : s.id) ?? ""),
    label: String((s == null ? void 0 : s.label) ?? "").trim(),
    value: Math.trunc(Number((s == null ? void 0 : s.value) ?? 0)) || 0,
    enabled: (s == null ? void 0 : s.enabled) !== !1,
    attributeFilter: kr(s == null ? void 0 : s.attributeFilter),
    intentFilter: kr(s == null ? void 0 : s.intentFilter),
    source: (s == null ? void 0 : s.source) === "preset" ? "preset" : "adhoc"
  };
}
class $d {
  constructor() {
    R(this, "id", "mwd.sceneModifiers");
  }
  collect({ resolved: e } = {}) {
    var r;
    const t = (r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.getFlag("mwd", Rs);
    if (!Array.isArray(t) || !t.length) return [];
    const i = _d(e), a = Ld(e), n = [];
    for (const o of t) {
      const l = al(o);
      l.enabled && Mr(l.intentFilter, i) && Mr(l.attributeFilter, a) && n.push({
        id: l.id || `scene:${l.label}`,
        label: l.label,
        value: l.value,
        source: "Scene"
      });
    }
    return n;
  }
}
const xd = `systems/${T}/templates/settings/collection-editor.hbs`, nl = /* @__PURE__ */ new Map(), wa = /* @__PURE__ */ new Map();
function fi(s = []) {
  const e = Array.isArray(s) ? s.filter(Boolean) : [String(s ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid settings data.");
  return t.validationErrors = e, t;
}
function sa(s) {
  Fd(s), nl.set(s.id, s), game.settings.register(T, s.settingKey, {
    scope: "world",
    config: !1,
    type: s.settingType ?? Object,
    default: s.defaultData()
  }), game.settings.registerMenu(T, s.menuKey, {
    name: s.menu.name,
    label: s.menu.label,
    hint: s.menu.hint,
    icon: s.menu.icon,
    type: zd(s.id),
    restricted: s.menu.restricted ?? !0
  });
}
function Bd(s) {
  return nl.get(s) ?? null;
}
function Fd(s) {
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
function zd(s) {
  if (wa.has(s))
    return wa.get(s);
  class e extends rl {
  }
  return R(e, "definitionId", s), wa.set(s, e), e;
}
var K, ol, Xa, Ds, Is, Ei, Za, Gi, ll, cl, We;
class rl extends FormApplication {
  constructor(t = {}, i = {}) {
    super(t, i);
    Te(this, K);
    const a = v(this, K, Is).call(this);
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
      template: xd,
      width: 880,
      height: 760,
      resizable: !0,
      submitOnChange: !1,
      closeOnSubmit: !1
    }, { inplace: !1 });
  }
  get definition() {
    const t = Bd(this.constructor.definitionId);
    if (!t)
      throw new Error(`Missing settings collection definition: ${this.constructor.definitionId}`);
    return t;
  }
  get title() {
    var t;
    return this.definition.title ?? ((t = this.definition.menu) == null ? void 0 : t.name) ?? "Settings Editor";
  }
  getData(t = {}) {
    const i = v(this, K, cl).call(this), a = this.editorState.rows.map((n, r, o) => ({
      index: r,
      fields: i.map((l) => v(this, K, ll).call(this, l, n, r)),
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
      a.addEventListener("click", (n) => {
        var l;
        const r = n.currentTarget, o = String(((l = r == null ? void 0 : r.dataset) == null ? void 0 : l.action) ?? "").trim();
        o && v(this, K, ol).call(this, o, n, r);
      });
    });
  }
  async _onSubmit(t, { updateData: i = null, preventClose: a = !0, preventRender: n = !0 } = {}) {
    return super._onSubmit(t, { updateData: i, preventClose: a, preventRender: n });
  }
  async _updateObject(t, i) {
    var a;
    v(this, K, We).call(this, []);
    try {
      const n = this.editorState.tab === "bulk" ? this.definition.parseBulk(v(this, K, Gi).call(this)) : this.definition.rowsToValue(v(this, K, Za).call(this));
      await game.settings.set(T, this.definition.settingKey, n);
      const r = v(this, K, Is).call(this);
      v(this, K, Ds).call(this, r), await this.close();
    } catch (n) {
      v(this, K, We).call(this, bs(n)), this.editorState.errors.length && ((a = ui.notifications) == null || a.error(this.editorState.errors[0])), this.render(!1);
    }
  }
}
K = new WeakSet(), ol = async function(t, i, a) {
  var n, r, o, l, c, u, d, m;
  switch (i.preventDefault(), i.stopPropagation(), t) {
    case "switchRows":
      v(this, K, Gi).call(this), this.editorState.tab = "rows", v(this, K, We).call(this, []), this.render(!1);
      return;
    case "switchBulk":
      v(this, K, Ei).call(this);
      try {
        const p = this.definition.rowsToValue(this.editorState.rows);
        this.editorState.bulkText = this.definition.serializeBulk(p), this.editorState.tab = "bulk", v(this, K, We).call(this, []);
      } catch (p) {
        v(this, K, We).call(this, bs(p)), this.editorState.errors.length && ((n = ui.notifications) == null || n.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "addRow":
      v(this, K, Ei).call(this), this.editorState.rows.push(((o = (r = this.definition).createEmptyRow) == null ? void 0 : o.call(r)) ?? {}), v(this, K, We).call(this, []), this.render(!1);
      return;
    case "removeRow":
      v(this, K, Ei).call(this), this.editorState.rows.splice(Number(((l = a == null ? void 0 : a.dataset) == null ? void 0 : l.index) ?? -1), 1), v(this, K, We).call(this, []), this.render(!1);
      return;
    case "moveRowUp":
      v(this, K, Ei).call(this), v(this, K, Xa).call(this, Number(((c = a == null ? void 0 : a.dataset) == null ? void 0 : c.index) ?? -1), -1), v(this, K, We).call(this, []), this.render(!1);
      return;
    case "moveRowDown":
      v(this, K, Ei).call(this), v(this, K, Xa).call(this, Number(((u = a == null ? void 0 : a.dataset) == null ? void 0 : u.index) ?? -1), 1), v(this, K, We).call(this, []), this.render(!1);
      return;
    case "loadBulk":
      try {
        const p = this.definition.parseBulk(v(this, K, Gi).call(this));
        this.editorState.rows = this.definition.toRows(p), this.editorState.bulkText = this.definition.serializeBulk(p), this.editorState.tab = "rows", v(this, K, We).call(this, []);
      } catch (p) {
        v(this, K, We).call(this, bs(p)), this.editorState.errors.length && ((d = ui.notifications) == null || d.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "formatBulk":
      try {
        const p = this.definition.parseBulk(v(this, K, Gi).call(this));
        this.editorState.bulkText = this.definition.serializeBulk(p), v(this, K, We).call(this, []);
      } catch (p) {
        v(this, K, We).call(this, bs(p)), this.editorState.errors.length && ((m = ui.notifications) == null || m.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "resetSetting":
      v(this, K, Ds).call(this, v(this, K, Is).call(this)), this.render(!1);
      return;
    case "restoreDefaults":
      v(this, K, Ds).call(this, this.definition.defaultData()), this.render(!1);
      return;
    case "cancel":
      await this.close();
      return;
    default:
      return;
  }
}, Xa = function(t, i) {
  if (!Number.isInteger(t)) return;
  const a = t + i;
  if (t < 0 || a < 0 || a >= this.editorState.rows.length) return;
  const n = [...this.editorState.rows], [r] = n.splice(t, 1);
  n.splice(a, 0, r), this.editorState.rows = n;
}, Ds = function(t) {
  this.editorState.rows = this.definition.toRows(t), this.editorState.bulkText = this.definition.serializeBulk(t), this.editorState.tab = "rows", v(this, K, We).call(this, []);
}, Is = function() {
  const t = game.settings.get(T, this.definition.settingKey);
  return foundry.utils.deepClone(t ?? this.definition.defaultData());
}, Ei = function() {
  this.editorState.rows = v(this, K, Za).call(this);
}, Za = function() {
  const t = foundry.utils.expandObject(this._getSubmitData()), i = (t == null ? void 0 : t.rows) ?? {};
  return Object.keys(i).sort((a, n) => Number(a) - Number(n)).map((a) => {
    const n = i[a] ?? {};
    return Object.fromEntries(
      this.definition.rowSchema.map((r) => [
        r.key,
        String((n == null ? void 0 : n[r.key]) ?? "")
      ])
    );
  });
}, Gi = function() {
  var a;
  const t = this.form, i = (a = t == null ? void 0 : t.querySelector) == null ? void 0 : a.call(t, 'textarea[name="bulkText"]');
  return i instanceof HTMLTextAreaElement && (this.editorState.bulkText = i.value), this.editorState.bulkText ?? "";
}, ll = function(t, i, a) {
  const n = t.type ?? "text", r = String((i == null ? void 0 : i[t.key]) ?? t.default ?? ""), o = n === "select" ? Ud(t).map((l) => ({
    value: String(l.value ?? ""),
    label: String(l.label ?? l.value ?? ""),
    selected: String(l.value ?? "") === r
  })) : [];
  return {
    key: t.key,
    label: t.label,
    type: n,
    inputType: n === "select" ? "text" : n,
    name: `rows.${a}.${t.key}`,
    value: r,
    placeholder: t.placeholder ?? "",
    min: t.min ?? "",
    max: t.max ?? "",
    step: t.step ?? "",
    options: o
  };
}, cl = function() {
  return this.definition.rowSchema.map((t) => ({
    ...t,
    type: t.type ?? "text"
  }));
}, We = function(t = []) {
  this.editorState.errors = Array.isArray(t) ? t.filter(Boolean) : [];
}, R(rl, "definitionId", "");
function Ud(s) {
  const e = typeof s.options == "function" ? s.options() : s.options;
  return Array.isArray(e) ? e : [];
}
function bs(s) {
  const e = Array.isArray(s == null ? void 0 : s.validationErrors) ? s.validationErrors.filter(Boolean) : [String((s == null ? void 0 : s.message) ?? "Unable to save settings.").trim()].filter(Boolean);
  return e.length ? e : ["Unable to save settings."];
}
const en = "sceneModifierTemplates", Wd = "sceneModifierTemplateEditor", Hd = Object.freeze([]);
function Zt(s) {
  const e = String(s ?? "").trim();
  return e === "" ? "" : e;
}
function ul(s = []) {
  const e = [], t = [], i = /* @__PURE__ */ new Set();
  if ((Array.isArray(s) ? s : []).forEach((a, n) => {
    const r = String((a == null ? void 0 : a.label) ?? "").trim(), o = String((a == null ? void 0 : a.value) ?? "").trim(), l = `Row ${n + 1}`;
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
      attributeFilter: Zt(a == null ? void 0 : a.attributeFilter),
      intentFilter: Zt(a == null ? void 0 : a.intentFilter)
    });
  }), t.length) throw fi(t);
  return e;
}
function jd(s = []) {
  return (Array.isArray(s) ? s : []).map((e) => ({
    label: String((e == null ? void 0 : e.label) ?? ""),
    value: String((e == null ? void 0 : e.value) ?? "0"),
    attributeFilter: Zt(e == null ? void 0 : e.attributeFilter),
    intentFilter: Zt(e == null ? void 0 : e.intentFilter)
  }));
}
function qd(s = "") {
  const e = String(s ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw fi([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  if (!Array.isArray(t))
    throw fi(["Bulk JSON must be an array."]);
  return ul(t.map((i) => ({
    label: String((i == null ? void 0 : i.label) ?? ""),
    value: String((i == null ? void 0 : i.value) ?? "0"),
    attributeFilter: Zt(i == null ? void 0 : i.attributeFilter),
    intentFilter: Zt(i == null ? void 0 : i.intentFilter)
  })));
}
function Gd(s = []) {
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
const Vd = {
  id: "scene-modifier-templates",
  menuKey: Wd,
  settingKey: en,
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
      options: zn
    },
    {
      key: "intentFilter",
      label: "Intent Filter",
      type: "select",
      options: Un
    }
  ],
  menu: {
    name: "Scene Modifier Templates",
    label: "Configure",
    hint: "Edit the preset scene modifier templates available in the GM Gadget.",
    icon: "fas fa-cloud",
    restricted: !0
  },
  defaultData: () => foundry.utils.deepClone(Hd),
  createEmptyRow: () => ({
    label: "",
    value: "0",
    attributeFilter: "",
    intentFilter: ""
  }),
  toRows: jd,
  rowsToValue: ul,
  parseBulk: qd,
  serializeBulk: Gd
};
function Kd() {
  sa(Vd);
}
const { ApplicationV2: Yd, HandlebarsApplicationMixin: Qd } = foundry.applications.api, Jd = "mwd-gmgadget", dl = "gmDnPresets", Os = "gmNextDn", Vi = "gmDnAnnounceToChat", Xd = Object.freeze([
  { label: "Standard", dn: 1 },
  { label: "Challenging", dn: 2 },
  { label: "Hard", dn: 3 },
  { label: "Extreme", dn: 4 }
]), Zd = "systems/mwd/templates/v2/mwd-gmgadget.hbs", Ki = Object.freeze({
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
function em(s = "") {
  return String(s ?? "").split(",").map((e) => e.trim()).filter(Boolean).map((e) => {
    const [t, i] = e.split(":").map((r) => (r ?? "").trim()), a = t || "DN", n = Number.isFinite(Number(i)) ? Number(i) : Number(t);
    return {
      label: a,
      dn: Number.isFinite(n) ? Math.max(0, Math.trunc(n)) : null
    };
  }).filter((e) => Number.isFinite(e.dn));
}
function tm(s = []) {
  const e = new Error(s[0] ?? "Invalid GM DN presets.");
  return e.validationErrors = Array.isArray(s) ? s.filter(Boolean) : [], e;
}
function im() {
  return foundry.utils.deepClone(Xd);
}
function us(s, { strict: e = !1 } = {}) {
  const t = typeof s == "string" ? em(s) : Array.isArray(s) ? s : [], i = [], a = [], n = /* @__PURE__ */ new Set();
  if (t.forEach((r, o) => {
    const l = String((r == null ? void 0 : r.label) ?? "").trim(), c = r == null ? void 0 : r.dn, u = `Preset ${o + 1}`;
    if (!l) {
      e && a.push(`${u}: label cannot be blank.`);
      return;
    }
    const d = l.toLowerCase();
    if (n.has(d)) {
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
    n.add(d), i.push({
      label: l,
      dn: Math.trunc(m)
    });
  }), e && a.length) throw tm(a);
  return i;
}
function Ta(s = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(Ki),
    s ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function sm(s) {
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
function am(s) {
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
function nm(s) {
  return Ze.getStatusOptions(s);
}
function rm(s = "mwd") {
  game.settings.register(s, Os, {
    scope: "client",
    config: !1,
    type: Number,
    default: 1
  }), game.settings.register(s, Vi, {
    scope: "client",
    config: !0,
    name: "Announce GM DN changes to chat",
    hint: "If enabled, posts a small chat notice when you change the current DN preset.",
    type: Boolean,
    default: !1
  });
}
const Fe = class Fe extends Qd(Yd) {
  constructor({ systemId: e = "mwd", ...t } = {}) {
    super(t), this.systemId = e, this.activeTab = "difficulty", this.harmState = Ta();
  }
  async render(e = {}) {
    var t;
    return (t = game.user) != null && t.isGM ? super.render(e) : this;
  }
  async _prepareContext(e) {
    var f, h, g, y;
    const t = await super._prepareContext(e), i = us(
      game.settings.get(this.systemId, dl),
      { strict: !1 }
    ), a = Number(game.settings.get(this.systemId, Os) ?? 1), n = !!game.settings.get(this.systemId, Vi), r = Ze.getActorOptions(), o = Ze.getSceneTarget(), l = this.harmState.actorId ? ((h = (f = game.actors) == null ? void 0 : f.get) == null ? void 0 : h.call(f, this.harmState.actorId)) ?? null : null, c = Ze.resolveTarget({
      actor: l,
      actorId: this.harmState.actorId,
      preferSceneTarget: !0
    }), u = nm(c.actor ?? l ?? null), d = Ta(this.harmState);
    !d.statusId && u.length && (d.statusId = u[0].value, this.harmState.statusId = d.statusId);
    const m = vr(
      game.settings.get(this.systemId, en)
    ), p = Er(
      (g = canvas == null ? void 0 : canvas.scene) == null ? void 0 : g.getFlag("mwd", Rs)
    );
    return foundry.utils.mergeObject(t, {
      presets: i,
      currentDn: a,
      currentTab: this.activeTab,
      announce: n,
      isGM: ((y = game.user) == null ? void 0 : y.isGM) ?? !1,
      scene: {
        hasScene: !!(canvas != null && canvas.scene),
        templates: m,
        activeModifiers: p,
        attributeFilterOptions: zn,
        intentFilterOptions: Un
      },
      harm: {
        state: d,
        actorOptions: r,
        modes: Ze.MODE_OPTIONS,
        damageTypes: kd,
        statusOptions: u,
        sceneTarget: sm(o),
        effectiveTarget: am(c),
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
    }, a = (r, o = !1) => {
      const l = t.querySelector(r);
      return l instanceof HTMLInputElement ? l.checked : o;
    };
    return this.harmState = Ta({
      actorId: i('[name="harm-actorId"]', this.harmState.actorId),
      mode: i('[name="harm-mode"]', this.harmState.mode),
      delta: Number(i('[name="harm-delta"]', this.harmState.delta)),
      useArmor: a('[name="harm-useArmor"]', this.harmState.useArmor),
      damageType: i('[name="harm-damageType"]', this.harmState.damageType),
      statusId: i('[name="harm-statusId"]', this.harmState.statusId),
      statusActive: i('[name="harm-statusActive"]', this.harmState.statusActive ? "add" : "remove") !== "remove",
      source: i('[name="harm-source"]', this.harmState.source),
      notes: i('[name="harm-notes"]', this.harmState.notes)
    }), Number.isFinite(Number(this.harmState.delta)) || (this.harmState.delta = Ki.delta), this.harmState;
  }
  async _onSetDn(e, t) {
    var n, r, o;
    if (e.preventDefault(), e.stopPropagation(), !((n = game.user) != null && n.isGM)) return;
    const i = Math.max(0, Math.trunc(Number(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.dn) ?? NaN)));
    if (!Number.isFinite(i)) return;
    if (await game.settings.set(this.systemId, Os, i), !!game.settings.get(this.systemId, Vi)) {
      const l = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.label) ?? `DN ${i}`);
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ user: game.user }),
        content: `<div class="mwd-gm-notice"><b>GM Difficulty:</b> ${foundry.utils.escapeHTML(l)} (DN ${i} hits)</div>`
      });
    }
    return this.render({ parts: ["body"] });
  }
  async _onSwitchTab(e, t) {
    var a, n, r;
    (a = e == null ? void 0 : e.preventDefault) == null || a.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e);
    const i = String(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.tab) ?? "").trim();
    if (!(!i || i === this.activeTab))
      return this._captureHarmStateFromDom(t), this.activeTab = i, this.render({ parts: ["body"] });
  }
  async _onClearDn(e, t) {
    var i;
    if (e.preventDefault(), e.stopPropagation(), !!((i = game.user) != null && i.isGM))
      return await game.settings.set(this.systemId, Os, 1), this.render({ parts: ["body"] });
  }
  async _onToggleAnnounce(e, t) {
    var a;
    if (e.preventDefault(), e.stopPropagation(), !((a = game.user) != null && a.isGM)) return;
    const i = !game.settings.get(this.systemId, Vi);
    return await game.settings.set(this.systemId, Vi, i), this.render({ parts: ["body"] });
  }
  async _onHarmInputChange(e, t) {
    var a, n;
    (a = e == null ? void 0 : e.preventDefault) == null || a.call(e), this._captureHarmStateFromDom(t);
    const i = String(((n = t == null ? void 0 : t.dataset) == null ? void 0 : n.harmKey) ?? "").trim();
    if (["actorId", "mode", "useArmor"].includes(i))
      return this.render({ parts: ["body"] });
  }
  async _onRefreshHarmTarget(e, t) {
    var i, a;
    return (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (a = e == null ? void 0 : e.stopPropagation) == null || a.call(e), this._captureHarmStateFromDom(t), this.render({ parts: ["body"] });
  }
  async _onApplyHarm(e, t) {
    var r, o, l, c, u;
    if ((r = e == null ? void 0 : e.preventDefault) == null || r.call(e), (o = e == null ? void 0 : e.stopPropagation) == null || o.call(e), !((l = game.user) != null && l.isGM)) return;
    const i = this._captureHarmStateFromDom(t), a = this._buildHarmPayload(i);
    if (!a) {
      (c = ui.notifications) == null || c.warn("Choose a valid harm action before applying it.");
      return;
    }
    const n = await Ze.apply({
      payload: a,
      options: {
        actorId: i.actorId,
        preferSceneTarget: !0,
        logToChat: !0
      }
    });
    return n != null && n.ok ? this.render({ parts: ["body"] }) : ((u = ui.notifications) == null || u.warn((n == null ? void 0 : n.reason) ?? "Unable to apply harm."), this.render({ parts: ["body"] }));
  }
  _buildHarmPayload(e) {
    const t = String((e == null ? void 0 : e.source) ?? "").trim(), i = String((e == null ? void 0 : e.notes) ?? "").trim(), a = String((e == null ? void 0 : e.mode) ?? "").trim();
    if (a === "status") {
      const n = String((e == null ? void 0 : e.statusId) ?? "").trim();
      return n ? {
        mode: "status",
        statusId: n,
        active: !!(e != null && e.statusActive),
        source: t,
        notes: i
      } : null;
    }
    return a === "burn" ? {
      mode: "burnDelta",
      delta: Cr(e == null ? void 0 : e.delta, Ki.delta),
      source: t,
      notes: i
    } : a === "physical" || a === "fatigue" ? {
      mode: "trackDelta",
      track: a,
      delta: Cr(e == null ? void 0 : e.delta, Ki.delta),
      useArmor: !!(e != null && e.useArmor),
      damageType: (e == null ? void 0 : e.damageType) ?? Ki.damageType,
      source: t,
      notes: i
    } : null;
  }
  // ---- Scene modifier actions ----
  async _onAddSceneModifierFromPreset(e, t) {
    var l, c, u, d;
    if ((l = e == null ? void 0 : e.preventDefault) == null || l.call(e), (c = e == null ? void 0 : e.stopPropagation) == null || c.call(e), !((u = game.user) != null && u.isGM)) return;
    const i = ((d = t == null ? void 0 : t.closest) == null ? void 0 : d.call(t, ".mwd-gmgadget__root")) ?? this._getRootElement(), a = i instanceof HTMLElement ? i.querySelector('select[name="scene-preset-index"]') : null, n = a instanceof HTMLSelectElement ? Number(a.value) : NaN, r = vr(
      game.settings.get(this.systemId, en)
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
    var a, n, r, o;
    if ((a = e == null ? void 0 : e.preventDefault) == null || a.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), !((r = game.user) != null && r.isGM)) return;
    const i = this._captureAdhocFormFromDom(t);
    if (!i) {
      (o = ui.notifications) == null || o.warn("Label and a numeric value are required.");
      return;
    }
    await this._mutateSceneModifiers((l) => [...l, i]);
  }
  async _onToggleSceneModifier(e, t) {
    var a, n, r, o;
    if ((a = e == null ? void 0 : e.preventDefault) == null || a.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), !((r = game.user) != null && r.isGM)) return;
    const i = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.modId) ?? "").trim();
    i && await this._mutateSceneModifiers(
      (l) => l.map((c) => c.id === i ? { ...c, enabled: !c.enabled } : c)
    );
  }
  async _onRemoveSceneModifier(e, t) {
    var a, n, r, o;
    if ((a = e == null ? void 0 : e.preventDefault) == null || a.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), !((r = game.user) != null && r.isGM)) return;
    const i = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.modId) ?? "").trim();
    i && await this._mutateSceneModifiers((l) => l.filter((c) => c.id !== i));
  }
  async _onClearSceneModifiers(e, t) {
    var i, a, n;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (a = e == null ? void 0 : e.stopPropagation) == null || a.call(e), (n = game.user) != null && n.isGM && await this._mutateSceneModifiers(() => []);
  }
  async _mutateSceneModifiers(e) {
    const t = canvas == null ? void 0 : canvas.scene;
    if (!t) return;
    const i = Er(t.getFlag("mwd", Rs)), a = await e(i);
    return await t.setFlag("mwd", Rs, a), this.render({ parts: ["body"] });
  }
  _captureAdhocFormFromDom(e) {
    var c;
    const t = ((c = e == null ? void 0 : e.closest) == null ? void 0 : c.call(e, ".mwd-gmgadget__root")) ?? this._getRootElement();
    if (!(t instanceof HTMLElement)) return null;
    const i = (u) => {
      const d = t.querySelector(u);
      return d instanceof HTMLInputElement || d instanceof HTMLSelectElement ? d.value : "";
    }, a = i('[name="scene-adhoc-label"]').trim(), n = i('[name="scene-adhoc-value"]').trim(), r = i('[name="scene-adhoc-attributeFilter"]').trim() || null, o = i('[name="scene-adhoc-intentFilter"]').trim() || null;
    if (!a) return null;
    const l = Number(n);
    return Number.isFinite(l) ? {
      id: foundry.utils.randomID(),
      label: a,
      value: Math.trunc(l),
      enabled: !0,
      attributeFilter: r,
      intentFilter: o,
      source: "adhoc"
    } : null;
  }
};
R(Fe, "DEFAULT_OPTIONS", {
  id: Jd,
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
    switchTab: Fe.prototype._onSwitchTab,
    setDn: Fe.prototype._onSetDn,
    clearDn: Fe.prototype._onClearDn,
    toggleAnnounce: Fe.prototype._onToggleAnnounce,
    harmInputChange: Fe.prototype._onHarmInputChange,
    refreshHarmTarget: Fe.prototype._onRefreshHarmTarget,
    applyHarm: Fe.prototype._onApplyHarm,
    addSceneModifierFromPreset: Fe.prototype._onAddSceneModifierFromPreset,
    addSceneModifierAdhoc: Fe.prototype._onAddSceneModifierAdhoc,
    toggleSceneModifier: Fe.prototype._onToggleSceneModifier,
    removeSceneModifier: Fe.prototype._onRemoveSceneModifier,
    clearSceneModifiers: Fe.prototype._onClearSceneModifiers
  }
}), R(Fe, "PARTS", {
  body: { template: Zd }
});
let tn = Fe;
function vr(s) {
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
function Er(s) {
  return Array.isArray(s) ? s.map((e) => {
    var n, r;
    const t = al(e), i = ((n = zn.find((o) => o.value === (t.attributeFilter ?? ""))) == null ? void 0 : n.label) ?? null, a = ((r = Un.find((o) => o.value === (t.intentFilter ?? ""))) == null ? void 0 : r.label) ?? null;
    return {
      ...t,
      attributeFilterLabel: t.attributeFilter ? i : null,
      intentFilterLabel: t.intentFilter ? a : null,
      signedValue: t.value >= 0 ? `+${t.value}` : String(t.value),
      isPositive: t.value > 0
    };
  }) : [];
}
function Cr(s, e = 0) {
  const t = Number(s);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
let ka = null;
function om({ systemId: s = "mwd" } = {}) {
  return ka || (ka = new tn({ systemId: s })), ka;
}
const lm = "gmDnPresetEditor";
function cm(s = []) {
  const e = [], t = [], i = /* @__PURE__ */ new Set();
  if ((Array.isArray(s) ? s : []).forEach((a, n) => {
    const r = String((a == null ? void 0 : a.label) ?? "").trim(), o = String((a == null ? void 0 : a.dn) ?? "").trim(), l = `Row ${n + 1}`;
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
  }), t.length) throw fi(t);
  return us(e, { strict: !0 });
}
function um(s = []) {
  return us(s, { strict: !1 }).map((e) => ({
    label: e.label,
    dn: String(e.dn)
  }));
}
function dm(s = "") {
  const e = String(s ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw fi([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return us(t, { strict: !0 });
}
function mm(s = []) {
  return JSON.stringify(
    us(s, { strict: !1 }),
    null,
    2
  );
}
const pm = {
  id: "gm-dn-presets",
  menuKey: lm,
  settingKey: dl,
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
  defaultData: im,
  createEmptyRow: () => ({
    label: "",
    dn: "1"
  }),
  toRows: um,
  rowsToValue: cm,
  parseBulk: dm,
  serializeBulk: mm
};
function fm() {
  sa(pm);
}
const hm = "lifeModuleCatalogEditor";
function gm(s = []) {
  return yi((Array.isArray(s) ? s : []).map((e) => ({
    id: String((e == null ? void 0 : e.id) ?? ""),
    moduleType: String((e == null ? void 0 : e.moduleType) ?? ""),
    label: String((e == null ? void 0 : e.label) ?? ""),
    grants: String((e == null ? void 0 : e.grants) ?? ""),
    requiresAny: String((e == null ? void 0 : e.requiresAny) ?? ""),
    excludesAny: String((e == null ? void 0 : e.excludesAny) ?? "")
  })), { strict: !0 });
}
function ym(s = []) {
  return yi(s, { strict: !1 }).map((e) => ({
    id: e.id,
    moduleType: e.moduleType,
    label: e.label,
    grants: Ju(e.grants),
    requiresAny: e.requiresAny.join(", "),
    excludesAny: e.excludesAny.join(", ")
  }));
}
function bm(s = "") {
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
  return yi(t, { strict: !0 });
}
function Sm(s = []) {
  return JSON.stringify(
    yi(s, { strict: !1 }),
    null,
    2
  );
}
const Am = {
  id: "life-module-catalog",
  menuKey: hm,
  settingKey: Ii,
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
      options: Ko
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
  defaultData: xn,
  createEmptyRow: () => ({
    id: "",
    moduleType: "childhood",
    label: "",
    grants: "",
    requiresAny: "",
    excludesAny: ""
  }),
  toRows: ym,
  rowsToValue: gm,
  parseBulk: bm,
  serializeBulk: Sm
};
function wm() {
  sa(Am);
}
const Tm = "skillSpecializationEditor";
function sn() {
  return Bs().map((s) => ({
    value: s.code,
    label: s.label
  }));
}
function km(s = []) {
  const e = new Set(sn().map((a) => a.value)), t = {}, i = [];
  if ((Array.isArray(s) ? s : []).forEach((a, n) => {
    const r = String((a == null ? void 0 : a.skillCode) ?? "").trim(), o = String((a == null ? void 0 : a.label) ?? "").trim(), l = `Row ${n + 1}`;
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
  }), i.length) throw fi(i);
  return Qs(t, { strict: !0 });
}
function Mm(s = {}) {
  const e = Qs(s, { strict: !1 });
  return Object.entries(e).flatMap(
    ([t, i]) => i.map((a) => ({ skillCode: t, label: a }))
  );
}
function vm(s = "") {
  const e = String(s ?? "").trim();
  if (!e) return {};
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw fi([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return Qs(t, { strict: !0 });
}
function Em(s = {}) {
  return JSON.stringify(
    Qs(s, { strict: !1 }),
    null,
    2
  );
}
const Cm = {
  id: "skill-specializations",
  menuKey: Tm,
  settingKey: za,
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
      options: sn
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
  defaultData: Mo,
  createEmptyRow: () => {
    var s;
    return {
      skillCode: ((s = sn()[0]) == null ? void 0 : s.value) ?? "",
      label: ""
    };
  },
  toRows: Mm,
  rowsToValue: km,
  parseBulk: vm,
  serializeBulk: Em
};
function Pm() {
  sa(Cm);
}
class Nm {
  static register() {
    fm(), wm(), Pm(), Kd(), game.settings.register(T, "useDestinyMechanics", {
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
class Rm extends Error {
  constructor(e, { severity: t = "error" } = {}) {
    super(e), this.name = "UserFacingRollError", this.userFacing = !0, this.severity = t === "warn" ? "warn" : "error";
  }
}
function Pi(s, e = {}) {
  return new Rm(s, e);
}
function Ws(s, e = "Unable to execute roll.") {
  var i, a;
  const t = s != null && s.userFacing && (s == null ? void 0 : s.severity) === "warn" ? "warn" : "error";
  (a = (i = ui.notifications) == null ? void 0 : i[t]) == null || a.call(i, (s == null ? void 0 : s.message) ?? e);
}
const { HandlebarsApplicationMixin: Dm } = foundry.applications.api, { HTMLField: Im } = foundry.data.fields;
function Om(s) {
  const e = new Im({ required: !1, blank: !0, initial: "" });
  return e.name = s, e;
}
var st, os, qt, ei, an, nn;
const je = class je extends Dm(foundry.applications.sheets.ActorSheetV2) {
  constructor() {
    super(...arguments);
    Te(this, ei);
    Te(this, st, !1);
    /** Track active CSB tab per group across rerenders */
    Te(this, os, /* @__PURE__ */ new Map());
    // group -> tabId
    Te(this, qt, /* @__PURE__ */ new Map());
  }
  /** @override */
  _updatePosition(t) {
    const i = super._updatePosition(t), {
      MIN_WIDTH: a,
      MAX_WIDTH: n,
      MIN_HEIGHT: r,
      MAX_HEIGHT: o
    } = this.constructor;
    return typeof i.width == "number" && (i.width = Math.min(
      n,
      Math.max(a, i.width)
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
    return z(this, st);
  }
  toggleEditing() {
    if (this.isEditable) {
      if (z(this, st)) {
        this._commitEditsToActor().finally(() => {
          De(this, st, !z(this, st)), this.render({ force: !0 });
        });
        return;
      }
      De(this, st, !z(this, st)), this.render({ force: !0 });
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
    const t = this.actor ?? this.document ?? null, i = (t == null ? void 0 : t.token) ?? null, a = (n = this.document) != null && n.isToken ? ((r = this.document) == null ? void 0 : r.token) ?? i ?? null : i;
    return a ? (a == null ? void 0 : a.document) ?? a : null;
  }
  /**
   * Resolve the document that should persist actor-backed state.
   * Linked token sheets should write to the base actor document so state survives scene changes.
   */
  getPersistentActor() {
    var a, n, r;
    const t = this.actor ?? this.document ?? null;
    if (!t) return null;
    const i = this.getSheetTokenDocument();
    return i != null && i.isLinked ? i.baseActor ?? ((r = (a = game.actors) == null ? void 0 : a.get) == null ? void 0 : r.call(a, ((n = i == null ? void 0 : i.baseActor) == null ? void 0 : n.id) ?? "")) ?? i.actor ?? t : t;
  }
  /** @override */
  _initializeApplicationOptions(t) {
    var o, l, c, u, d;
    t = super._initializeApplicationOptions(t), t.classes = Array.from(t.classes ?? []);
    const i = (t == null ? void 0 : t.document) ?? this.document, a = (i == null ? void 0 : i.type) ?? ((o = this.actor) == null ? void 0 : o.type);
    a && t.classes.push(String(a));
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
    const t = ((r = this.actor) == null ? void 0 : r.type) ?? "actor", a = {
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
    var r, o;
    let t = ((r = super._getHeaderControls) == null ? void 0 : r.call(this)) ?? [];
    const i = ((o = this.document) == null ? void 0 : o.isToken) ?? !1, a = /* @__PURE__ */ new Set();
    i ? (a.add("prototypeToken"), a.add("configurePrototypeToken")) : (a.add("token"), a.add("configureToken")), t = t.filter((l) => {
      const c = (l == null ? void 0 : l.action) ?? "", u = String((l == null ? void 0 : l.label) ?? "");
      return !(a.has(c) || i && u.includes("Prototype") || !i && u === "Token");
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
    const a = ((l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, ".csb-tab-link[data-tab]")) ?? ((u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, ".csb-tab-link[data-tab]"));
    if (!a) return;
    const n = a.dataset.tab, r = a.closest(".csb-tabs");
    if (!r || !n) return;
    const o = r.dataset.group || "default";
    z(this, os).set(o, n), v(this, ei, an).call(this, r, n);
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const a = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!a) return;
    const n = a.dataset.section, r = a.closest(".csb-accordion");
    if (!r || !n) return;
    const o = r.dataset.group || "default", c = (z(this, qt).has(o) ? z(this, qt).get(o) : r.dataset.default || null) === n ? null : n;
    z(this, qt).set(o, c), v(this, ei, nn).call(this, r, c);
  }
  /**
   * Universal roll action: data-action="roll" + data-roll='{"intent":"skill","key":"gunnery"}'
   */
  async _onRollAction(t, i) {
    var c, u, d, m, p, f, h, g, y;
    (c = t == null ? void 0 : t.preventDefault) == null || c.call(t);
    const a = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, "[data-roll]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-roll]")), n = (p = a == null ? void 0 : a.dataset) == null ? void 0 : p.roll;
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
      return console.error("MWD | Failed to execute roll action", b), Ws(b, "Unable to execute that roll."), null;
    }
  }
  async _onEditImage(t, i) {
    var r, o, l;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable || !this.editing) return;
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
    var n, r, o;
    (n = super._onRender) == null || n.call(this, t, i);
    const a = this._getRootElement();
    if (a) {
      for (const l of a.querySelectorAll(".csb-tabs")) {
        const c = l.dataset.group || "default", u = z(this, os).get(c), d = l.dataset.default || ((r = l.querySelector(".csb-tab-link[data-tab]")) == null ? void 0 : r.dataset.tab), m = u || d;
        m && v(this, ei, an).call(this, l, m);
      }
      for (const l of a.querySelectorAll(".csb-accordion")) {
        const c = l.dataset.group || "default", u = z(this, qt).has(c) ? z(this, qt).get(c) : l.dataset.default || null;
        v(this, ei, nn).call(this, l, u);
      }
      a.querySelectorAll(".csb-tabs").length && !a.querySelector(".csb-tab-panel.is-active") && console.warn(`${fe} CSB tabs present but no active tab applied. Check element root resolution and CSS .is-active selectors.`, {
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
      } catch (n) {
        console.warn("MWD | Rich text history update failed:", n);
      }
  }
  async _commitEditsToActor() {
    const t = this.element;
    if (!t) return;
    const i = t.querySelectorAll('input[name][data-edit-field="staged"], select[name][data-edit-field="staged"], textarea[name][data-edit-field="staged"]');
    if (!i.length) return;
    const a = {};
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
      typeof o == "number" && Number.isNaN(o) && (o = 0), o = this._clampByPath(r, o), foundry.utils.getProperty(this.actor, r) !== o && (a[r] = o);
    }
    if (Object.keys(a).length)
      try {
        await (this.getPersistentActor() ?? this.actor).update(a);
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
    const i = await super._prepareContext(t), a = foundry.utils.deepClone((i == null ? void 0 : i.options) ?? {});
    a.classes = Array.from(((l = this.options) == null ? void 0 : l.classes) ?? []), a.cssClass = a.classes.join(" ");
    const n = foundry.utils.mergeObject(
      i,
      {
        actor: this.actor,
        system: (c = this.actor) == null ? void 0 : c.system,
        editable: this.isEditable,
        owner: ((u = this.document) == null ? void 0 : u.isOwner) ?? !1,
        limited: !(((d = this.document) == null ? void 0 : d.isOwner) ?? !1),
        editing: z(this, st),
        // Template contract
        data: this.actor,
        // legacy alias
        options: a,
        // safe, template-only
        cssClass: a.cssClass
      },
      { inplace: !1 }
    );
    return n.options.owner = n.owner, n.options.limited = n.limited, n.options.editable = n.editable, n.options.editing = n.editing, n.options.viewMode = !n.editing, n.skillsDisplay = Eo(((m = this.actor) == null ? void 0 : m.system) ?? {}), n.bio = {
      ...n.bio ?? {},
      fields: {
        history: Om("system.biography.history")
      }
    }, n.items ?? (n.items = {}), (p = this.actor) != null && p.items && typeof (Z == null ? void 0 : Z.classifyInto) == "function" && (Z.classifyInto(n.items, this.actor.items), n.items.weapon = [
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
      editing: z(this, st)
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
    const a = String(((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.monitor) ?? "").trim(), n = Number((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.value);
    if (!a || !Number.isFinite(n)) return;
    const r = a === "burn" ? "system.burn.value" : `system.monitors.${a}.value`, o = Number(foundry.utils.getProperty(this.actor, r) ?? 0), l = a === "armor" ? n : o === n ? 0 : n, c = this.getPersistentActor() ?? this.actor;
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
st = new WeakMap(), os = new WeakMap(), qt = new WeakMap(), ei = new WeakSet(), /**
 * Apply active-state classes within a single .csb-tabs root.
 * Idempotent: safe to call every render.
 */
an = function(t, i) {
  t.querySelectorAll(".csb-tab-link").forEach((a) => {
    a.classList.toggle("is-active", a.dataset.tab === i);
  }), t.querySelectorAll(".csb-tab-panel").forEach((a) => {
    a.classList.toggle("is-active", a.dataset.tab === i);
  });
}, nn = function(t, i) {
  t.dataset.activeSection = i ?? "", t.querySelectorAll(".csb-accordion__section").forEach((a) => {
    const n = a.dataset.section === i;
    a.classList.toggle("is-active", n);
  }), t.querySelectorAll(".csb-accordion__trigger").forEach((a) => {
    const n = a.dataset.section === i;
    a.classList.toggle("is-active", n), a.setAttribute("aria-expanded", n ? "true" : "false");
  }), t.querySelectorAll(".csb-accordion__panel").forEach((a) => {
    const n = a.closest(".csb-accordion__section"), r = (n == null ? void 0 : n.dataset.section) === i;
    a.classList.toggle("is-active", r);
  });
}, // ---- Hard minimum size (resize clamp) ----
R(je, "MIN_WIDTH", 800), R(je, "MAX_WIDTH", 950), R(je, "MIN_HEIGHT", 600), R(je, "MAX_HEIGHT", 1400), // group -> sectionId|null
/** @override */
R(je, "DEFAULT_OPTIONS", foundry.utils.mergeObject(bi(je, je, "DEFAULT_OPTIONS"), {
  classes: ["sheet", "actor", T, "appv2", "mwd-sheet", "mwd-character-sheet"],
  position: { width: 760, height: 760 },
  window: { resizable: !0, minimizable: !0 },
  actions: {
    toggleViewMode: je.prototype._onToggleViewMode,
    tab: je.prototype._onClickTab,
    accordion: je.prototype._onClickAccordion,
    roll: je.prototype._onRollAction,
    monitorSet: je.prototype._onMonitorSet,
    editImage: je.prototype._onEditImage
  }
}, { inplace: !1 }));
let Fi = je;
var Gt, ti, ml, pl, fl;
const Zi = class Zi {
  static async get(e) {
    if (z(this, Gt).has(e)) {
      const a = await z(this, Gt).get(e);
      if (Number((a == null ? void 0 : a.version) ?? 0) > 0) return a;
      z(this, Gt).delete(e);
    }
    const t = v(this, ti, ml).call(this, e);
    z(this, Gt).set(e, t);
    const i = await t;
    return Number((i == null ? void 0 : i.version) ?? 0) <= 0 && z(this, Gt).delete(e), i;
  }
};
Gt = new WeakMap(), ti = new WeakSet(), ml = async function(e) {
  const t = `systems/${T}/templates/v2/layouts/${e}.layout.json`;
  let i;
  try {
    const a = await fetch(t);
    if (!a.ok) throw new Error(`HTTP ${a.status} for ${t}`);
    i = await a.json();
  } catch (a) {
    console.error(`${fe}LayoutRegistry.get FAILED`, { layoutId: e, url: t, e: a }), i = { id: e, version: 0, root: { type: "stack", children: [] } };
  }
  return v(this, ti, pl).call(this, i);
}, pl = function(e) {
  const t = (i) => {
    var a;
    return !i || typeof i != "object" || (i.template ?? (i.template = v(a = Zi, ti, fl).call(a, i)), i.children = Array.isArray(i.children) ? i.children : [], Array.isArray(i.classes) || (typeof i.classes == "string" ? i.classes = i.classes.split(/\s+/).filter(Boolean) : i.classes = []), i.children = i.children.map(t), i.type === "tabs" && Array.isArray(i.tabs) && (i.tabs = i.tabs.map((n) => ({
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
}, fl = function(e) {
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
}, Te(Zi, ti), Te(Zi, Gt, /* @__PURE__ */ new Map());
let Hs = Zi;
function He(s, e = 0) {
  const t = Number(s);
  return Number.isFinite(t) ? t : e;
}
function _m(s) {
  return String(s ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function Ss(s, e = 180) {
  const t = _m(s);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function Wt(s = []) {
  return s.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function As(s = []) {
  return s.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim(),
    emphasis: e.emphasis ?? ""
  }));
}
function ws(s = []) {
  return Wt(s).map((e) => ({ label: e }));
}
function Ts(s = []) {
  return s.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
const Lm = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}, $m = {
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
function Pr(s) {
  const e = Number(s ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function xm({ defenseBonus: s = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(s ?? 0) || 0;
  i !== 0 && t.push(`Defense ${Pr(i)}`);
  for (const [a, n] of Object.entries(Lm)) {
    const r = Number((e == null ? void 0 : e[a]) ?? 0) || 0;
    r !== 0 && t.push(`${n} ${Pr(r)}`);
  }
  return t.join(" | ");
}
function Bm(s = {}, e = ["close", "near", "far", "extreme"]) {
  return e.map((t) => {
    const i = He(s == null ? void 0 : s[t], 0);
    return `${t.charAt(0).toUpperCase() + t.slice(1)} ${i}`;
  }).join(" | ");
}
function Fm(s = {}) {
  return ["close", "near", "far", "extreme"].map((e) => `${e.charAt(0).toUpperCase()}${He(s == null ? void 0 : s[e], 0)}`).join(" ");
}
function zm(s = "") {
  const e = String(s ?? "").trim().toLowerCase();
  return e ? e.charAt(0).toUpperCase() + e.slice(1) : "";
}
function Ma(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function Nr({ title: s, label: e, options: t = [], confirmLabel: i = "Select" } = {}) {
  const a = Array.isArray(t) ? t.filter((r) => r == null ? void 0 : r.value) : [];
  if (!a.length) return "";
  if (a.length === 1) return String(a[0].value ?? "").trim();
  const n = `<form class="mwd-quick-select"><div class="mwd-field"><label>${Ma(e)}</label><select name="selection">${a.map((r) => `<option value="${Ma(r.value)}">${Ma(r.label ?? r.value)}</option>`).join("")}</select></div></form>`;
  return await Dialog.prompt({
    title: s,
    content: n,
    label: i,
    callback: (r) => {
      var o;
      return String(r.find('select[name="selection"]').val() ?? ((o = a[0]) == null ? void 0 : o.value) ?? "").trim();
    }
  });
}
var Xe, Vt, oi, pt, B, hl, on, _s, gl, yl, Pe, ai, Ci, ni, Yi;
const ye = class ye extends Fi {
  constructor() {
    super(...arguments);
    Te(this, B);
    Te(this, Xe, null);
    Te(this, Vt, null);
    Te(this, oi, null);
    Te(this, pt, /* @__PURE__ */ new Set());
  }
  /** @override */
  async _prepareContext(t) {
    var H, D, V, ee, X, te, ce, Se, O, F, _e, J, Ke, et, Nt, Rt, Dt, It, Ot, _t, Lt, $t, xt, ut, Bt, Ft, zt;
    const i = await super._prepareContext(t), a = ((H = this.getSheetTokenDocument) == null ? void 0 : H.call(this)) ?? null;
    i._mwdThemeClass = game.system.mwd.styles.selectCssClass(), i.layout = await Hs.get("character");
    const n = ((V = (D = this.actor).getEdgeCap) == null ? void 0 : V.call(D)) ?? Number(((te = (X = (ee = this.actor.system) == null ? void 0 : ee.attributes) == null ? void 0 : X.edge) == null ? void 0 : te.value) ?? 0), r = !!this.isEditable, o = { physical: "Physical", mental: "Mental", social: "Social" }, l = {
      grit: "Grit",
      insight: "Insight",
      legend: "Legend",
      chaos: "Chaos",
      rumor: "Rumor",
      credibility: "Credibility"
    }, c = this.actor.getEdgePoolSummary ? this.actor.getEdgePoolSummary({ groups: wn }) : { groups: [] };
    i.edgeConsole = {
      cap: n,
      editable: r,
      capPips: Array.from({ length: Math.max(0, n) }, (M, P) => P + 1),
      groups: (c.groups ?? []).map((M) => ({
        id: M.id,
        label: o[M.id] ?? M.id,
        pools: (M.pools ?? []).map((P) => {
          const j = Number(P.effectiveValue ?? 0), ue = Number(P.effectiveMax ?? 0), he = Array.from({ length: Math.max(0, ue) }, (ve, W) => {
            const ie = W + 1;
            return { n: ie, filled: ie <= j };
          }), Ae = String(P.key ?? "").split(".").pop();
          return {
            key: P.key,
            label: l[Ae] ?? Ae ?? P.key,
            value: j,
            max: ue,
            rating: Number(P.rating ?? 0),
            ratingBonus: Number(P.ratingBonus ?? 0),
            effectiveRating: Number(P.effectiveRating ?? P.rating ?? 0),
            isCapped: Number(P.effectiveRating ?? P.rating ?? 0) > Number(P.cap ?? n),
            pips: he,
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
    for (const M of i.edgeConsole.groups ?? [])
      for (const P of M.pools ?? []) {
        const j = String(P.key ?? "").split(".").pop();
        j && d.set(j, P), P.domain = M.id;
      }
    i.edgeConsole.poolsOrdered = u.map((M) => d.get(M)).filter(Boolean);
    const m = this.actor.system ?? {}, p = m.monitors ?? {}, f = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue", label: "Fatigue", kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor", label: "Armor", kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ], h = (M, P, j = 0) => {
      const ue = foundry.utils.getProperty(M, P), he = Number(ue);
      return Number.isFinite(he) ? he : j;
    };
    i.conditionMonitors = f.map((M) => {
      const P = (p == null ? void 0 : p[M.id]) ?? {}, j = Math.max(0, h(P, "max", 0)), ue = Math.min(Math.max(0, h(P, "value", 0)), j);
      return {
        id: M.id,
        label: M.label,
        kind: M.kind,
        editable: !!this.isEditable,
        value: ue,
        max: j,
        segments: Array.from({ length: j }, (he, Ae) => {
          const ve = Ae + 1;
          return { value: ve, filled: ve <= ue };
        }),
        status: M.status ? { label: M.status.label, value: h(P, M.status.path, 0) } : null
      };
    });
    const g = Number(((Se = (ce = this.actor.system) == null ? void 0 : ce.burn) == null ? void 0 : Se.value) ?? 0), y = 10, b = 6, S = Math.min(g, y);
    i.burnOverflow = Math.max(0, g - y), i.burnPenalty = Math.floor(g / 2), i.burnPips = Array.from({ length: y }, (M, P) => {
      const j = P + 1;
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
      overloaded: !!((F = (O = this.actor.system) == null ? void 0 : O.burn) != null && F.overloaded)
    };
    const w = de.getSnapshot(this.actor, { token: a });
    i.combatDashboard = {
      targeting: w.targeting,
      rollImpact: w.rollImpact,
      states: w.states,
      effects: w.effects,
      activation: w.activation,
      inactiveReason: w.inactiveReason
    };
    const E = de.buildActionModel(this.actor, w), I = new Set((E.menus ?? []).map((M) => M.id));
    z(this, Xe) && !I.has(z(this, Xe)) && De(this, Xe, null), i.combatActions = {
      ...E,
      menus: (E.menus ?? []).map((M) => ({
        ...M,
        isOpen: M.id === z(this, Xe)
      }))
    };
    const N = ((J = (_e = this.actor).getPersonalCombatLoadout) == null ? void 0 : J.call(_e)) ?? null;
    i.personalInventory = {
      warnings: [...(N == null ? void 0 : N.warnings) ?? []],
      weapons: ((N == null ? void 0 : N.weapons) ?? []).map((M) => {
        var xe, qe, x, me, At, Ue, tt;
        const P = v(this, B, Yi).call(this, "weapons", M.id), j = String((M == null ? void 0 : M.category) ?? "").trim().toLowerCase() !== "melee", ue = !!((xe = M == null ? void 0 : M.sourceState) != null && xe.isTracked), he = String((M == null ? void 0 : M.payloadLabel) ?? "").trim() || "Unloaded", Ae = j && ue ? `${He((qe = M == null ? void 0 : M.sourceState) == null ? void 0 : qe.current, 0)}/${He((x = M == null ? void 0 : M.sourceState) == null ? void 0 : x.max, 0)}` : "", ve = j ? ue ? `${he} ${Ae}` : he : "", W = j ? ue ? `Payload ${Ae}` : `Payload ${he}` : "", ie = Bm(M.attackRatingBand), Le = Fm(M.attackRatingBand), $e = Ts([
          { label: "Skill", value: ((me = M.skillDef) == null ? void 0 : me.label) ?? M.skill ?? "" },
          { label: "Category", value: M.category ?? "" },
          { label: "Damage Type", value: M.damageTypeLabel ?? M.damageType ?? "" },
          { label: "Max Range", value: zm(((At = M.range) == null ? void 0 : At.max) ?? M.defaultRangeBand ?? "") },
          { label: "CQ Bands", value: ie },
          { label: "Payload", value: ve },
          { label: "Traits", value: Wt(M.traits ?? []).join(", ") }
        ]);
        return {
          id: M.id,
          accordionId: P,
          isExpanded: z(this, pt).has(P),
          name: M.name,
          img: M.img,
          subtitle: ((Ue = M.skillDef) == null ? void 0 : Ue.label) ?? M.category ?? "",
          summaryStats: As([
            { label: "DV", value: He(M.damage, 0), emphasis: "strong" },
            { label: "AP", value: He(M.ap, 0) },
            { label: "Type", value: M.damageTypeLabel ?? M.damageType ?? "" },
            { label: "CQ", value: Le }
          ]),
          detailTags: ws([
            M.equipped ? "Equipped" : "",
            M.isPrimary ? "Primary" : "",
            W,
            ...Wt(M.traits ?? [])
          ]),
          detailRows: $e,
          detailText: Ss(M.notes),
          equipped: !!M.equipped,
          isPrimary: !!M.isPrimary,
          attackRoll: JSON.stringify({
            intent: "attack",
            weaponId: M.id,
            payloadId: ((tt = M == null ? void 0 : M.payloadState) == null ? void 0 : tt.activePayloadId) ?? "",
            edge: { pool: "physical.grit", allowed: ["pre", "post"] },
            tags: ["combat", "attack"]
          })
        };
      }),
      armor: ((N == null ? void 0 : N.armor) ?? []).map((M) => {
        var ve, W, ie, Le, $e, xe, qe, x, me, At, Ue, tt, qn, Gn;
        const P = ((ve = N == null ? void 0 : N.activeArmor) == null ? void 0 : ve.id) === M.id ? N.activeArmor : null, j = v(this, B, Yi).call(this, "armor", M.id), ue = He(((ie = (W = P == null ? void 0 : P.traitState) == null ? void 0 : W.reinforced) == null ? void 0 : ie.max) ?? (($e = (Le = M == null ? void 0 : M.traitState) == null ? void 0 : Le.reinforced) == null ? void 0 : $e.max), 0), he = ue > 0 ? `${He(((qe = (xe = P == null ? void 0 : P.traitState) == null ? void 0 : xe.reinforced) == null ? void 0 : qe.current) ?? ((me = (x = M == null ? void 0 : M.traitState) == null ? void 0 : x.reinforced) == null ? void 0 : me.current), 0)}/${ue}` : "", Ae = xm({
          defenseBonus: M.defenseBonus,
          mitigationByType: (P == null ? void 0 : P.mitigationByType) ?? (P == null ? void 0 : P.typedMitigation) ?? M.mitigationByType ?? {}
        });
        return {
          id: M.id,
          accordionId: j,
          isExpanded: z(this, pt).has(j),
          name: M.name,
          img: M.img,
          subtitle: (At = M.tags) != null && At.length ? M.tags.join(", ") : "Armor",
          summaryStats: As([
            { label: "Rating", value: He((P == null ? void 0 : P.ratingCurrent) ?? M.rating, 0), emphasis: "strong" },
            { label: "Res", value: He((P == null ? void 0 : P.baseMitigation) ?? (P == null ? void 0 : P.baseResistance), 0) },
            { label: "Def", value: He(M.defenseBonus, 0) },
            { label: "Dur", value: `${He(((Ue = P == null ? void 0 : P.durability) == null ? void 0 : Ue.current) ?? ((tt = M.durability) == null ? void 0 : tt.current), 0)}/${He(((qn = P == null ? void 0 : P.durability) == null ? void 0 : qn.max) ?? ((Gn = M.durability) == null ? void 0 : Gn.max), 0)}` }
          ]),
          detailTags: ws([
            M.equipped ? "Equipped" : "",
            M.isPrimary ? "Primary" : "",
            he ? `Reinforced ${he}` : "",
            ...Wt(M.traits ?? [])
          ]),
          detailRows: Ts([
            { label: "Modifiers", value: Ae },
            { label: "Traits", value: Wt(M.traits ?? []).join(", ") },
            { label: "Tags", value: Wt(M.tags ?? []).join(", ") }
          ]),
          detailText: Ss(M.notes),
          equipped: !!M.equipped,
          isPrimary: !!M.isPrimary
        };
      }),
      gear: (((Ke = i.items) == null ? void 0 : Ke.gear) ?? []).map((M) => {
        var W, ie, Le, $e, xe, qe, x;
        const P = v(this, B, Yi).call(this, "gear", M.id), j = Math.max(0, Math.trunc(He(((W = M.system) == null ? void 0 : W.quantity) ?? 1, 1))), ue = Math.max(0, Math.trunc(He(((ie = M.system) == null ? void 0 : ie.rating) ?? 0, 0))), he = Wt(((Le = M.system) == null ? void 0 : Le.tags) ?? []), Ae = String((($e = M.system) == null ? void 0 : $e.category) ?? "").trim(), ve = $m[Ae] ?? Ae;
        return {
          id: M.id,
          itemType: "gear",
          isGear: !0,
          accordionId: P,
          isExpanded: z(this, pt).has(P),
          name: M.name,
          img: M.img,
          subtitle: ve || "Gear",
          summaryStats: As([
            { label: "Qty", value: j, emphasis: "strong" },
            { label: "Rating", value: ue }
          ]),
          detailTags: ws([
            ...he,
            (xe = M.system) != null && xe.inactive ? "Inactive" : ""
          ]),
          detailRows: Ts([
            { label: "Quantity", value: j },
            { label: "Rating", value: ue },
            { label: "Source", value: ((qe = M.system) == null ? void 0 : qe.sourceReference) ?? "" },
            { label: "Category", value: ve },
            { label: "Tags", value: he.join(", ") }
          ]),
          detailText: Ss((x = M.system) == null ? void 0 : x.description),
          quantity: j,
          canAdjustQuantity: this.isEditable
        };
      })
    }, i.bio = {
      fields: ((et = i.bio) == null ? void 0 : et.fields) ?? {},
      faction: ((Nt = m.biography) == null ? void 0 : Nt.faction) ?? "",
      age: ((Rt = m.biography) == null ? void 0 : Rt.age) ?? "",
      rank: ((Dt = m.biography) == null ? void 0 : Dt.rank) ?? "",
      height: ((It = m.biography) == null ? void 0 : It.height) ?? "",
      weight: ((Ot = m.biography) == null ? void 0 : Ot.weight) ?? "",
      xpTotal: ((Lt = (_t = m.counters) == null ? void 0 : _t.xp) == null ? void 0 : Lt.total) ?? 0,
      xpSpent: ((xt = ($t = m.counters) == null ? void 0 : $t.xp) == null ? void 0 : xt.value) ?? 0,
      experienceLevel: ((ut = m.biography) == null ? void 0 : ut.experienceLevel) ?? "green",
      enrichedHistory: await foundry.applications.ux.TextEditor.implementation.enrichHTML(
        ((Bt = m.biography) == null ? void 0 : Bt.history) ?? "",
        { async: !0, secrets: this.actor.isOwner, relativeTo: this.actor }
      )
    };
    const L = Jt(this.actor);
    i.skillsDisplay = Eo(((Ft = this.actor) == null ? void 0 : Ft.system) ?? {}, {
      bonusBySkill: L.bonusBySkill
    }), i.lifeModules = L.slotStates.map((M) => {
      const P = M.state;
      return {
        moduleType: M.moduleType,
        label: M.label,
        hasCatalogEntries: M.availableEntries.length > 0,
        emptyState: M.availableEntries.length > 0 ? `Add ${M.label}` : `No ${M.label} catalog entries configured`,
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
    const Y = ["positive", "negative", "narrative"], Q = ["major", "minor"], G = [...((zt = i.items) == null ? void 0 : zt.quality) ?? []].sort((M, P) => {
      const j = nt(M.system ?? {}), ue = nt(P.system ?? {}), he = Y.indexOf(j.category) - Y.indexOf(ue.category);
      if (he !== 0) return he;
      const Ae = Q.indexOf(j.tier) - Q.indexOf(ue.tier);
      return Ae !== 0 ? Ae : String(M.name ?? "").localeCompare(String(P.name ?? ""));
    });
    return i.qualityGroups = Y.map((M) => ({
      id: M,
      label: Cs(M),
      records: G.filter((P) => nt(P.system ?? {}).category === M).map((P) => {
        var he, Ae, ve, W;
        const j = nt(P.system ?? {}), ue = v(this, B, Yi).call(this, "quality", P.id);
        return {
          id: P.id,
          accordionId: ue,
          isExpanded: z(this, pt).has(ue),
          name: P.name,
          img: P.img,
          subtitle: `${Ps(j.tier)} ${Cs(j.category)}`,
          summaryStats: As([
            { label: "Tier", value: Ps(j.tier), emphasis: "strong" },
            { label: "Activation", value: j.activation || "passive" },
            { label: "Effects", value: String(((he = j.effects) == null ? void 0 : he.length) ?? 0) }
          ]),
          detailTags: ws([
            j.inactive ? "Inactive" : "",
            ...j.tags ?? []
          ]),
          detailRows: Ts([
            { label: "Category", value: Cs(j.category) },
            { label: "Tier", value: Ps(j.tier) },
            { label: "Activation", value: j.activation || "passive" },
            { label: "Prerequisites", value: String(((Ae = j.prerequisites) == null ? void 0 : Ae.length) ?? 0) },
            { label: "Effects", value: String(((ve = j.effects) == null ? void 0 : ve.length) ?? 0) },
            { label: "Tags", value: Wt(j.tags ?? []).join(", ") }
          ]),
          detailText: Ss((W = P.system) == null ? void 0 : W.description)
        };
      })
    })), i;
  }
  _onRender(t, i) {
    super._onRender(t, i), v(this, B, hl).call(this), v(this, B, yl).call(this);
  }
  async close(t = {}) {
    return v(this, B, on).call(this), super.close(t);
  }
  requestCombatDashboardRefresh() {
    v(this, B, Pe).call(this, { force: !0 });
  }
  async _onEdgeSet(t, i) {
    var c, u, d;
    if (t.preventDefault(), t.stopPropagation(), !this.isEditable) return;
    const a = ((c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-edge-pool][data-edge-value]")) ?? ((d = (u = t == null ? void 0 : t.target) == null ? void 0 : u.closest) == null ? void 0 : d.call(u, "[data-edge-pool][data-edge-value]"));
    if (!a) return;
    const n = String(a.dataset.edgePool ?? "").trim(), r = Number(a.dataset.edgeValue ?? NaN);
    if (!n || !Number.isFinite(r)) return;
    const o = this.actor.getEdgePool(n);
    if (!(o != null && o.hasPools)) return;
    let l = r;
    return r === o.effectiveValue && (l = r - 1), (t.button === 2 || t.type === "contextmenu") && (l = 0), t.altKey && (l = 0), t.shiftKey && (l = o.effectiveMax), this.actor.setEdgePoolValue(n, l);
  }
  async _onToggleCombatMenu(t, i) {
    var n, r, o, l, c, u, d;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const a = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.combatMenu) ?? ((d = (u = (c = (l = t == null ? void 0 : t.target) == null ? void 0 : l.closest) == null ? void 0 : c.call(l, "[data-combat-menu]")) == null ? void 0 : u.dataset) == null ? void 0 : d.combatMenu) ?? ""
    ).trim();
    a && (De(this, Xe, z(this, Xe) === a ? null : a), v(this, B, Pe).call(this, !1));
  }
  async _onToggleStatuses(t, i) {
    var r, o, l, c, u, d, m, p;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), v(this, B, ni).call(this, i, t, "Statuses are not available right now.") || !this.isEditable) return;
    const a = this.getPersistentActor() ?? this.actor, n = ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? ((u = de.getSnapshot(a, { token: ((c = this.getSheetTokenDocument) == null ? void 0 : c.call(this)) ?? null })) == null ? void 0 : u.tokenDocument) ?? ((m = de.getSnapshot(this.actor, { token: ((d = this.getSheetTokenDocument) == null ? void 0 : d.call(this)) ?? null })) == null ? void 0 : m.tokenDocument) ?? null;
    if (!n) {
      (p = ui.notifications) == null || p.warn("Statuses require a token for this actor on the current scene.");
      return;
    }
    return Kc({
      actor: a,
      token: n
    });
  }
  async _onCombatSpend(t, i) {
    var c, u, d, m, p, f, h, g, y, b;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), v(this, B, ni).call(this, i, t, "That combat action is not available right now.") || !this.isEditable) return;
    const a = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.resource) ?? "").trim(), n = Math.max(0, Number(((m = i == null ? void 0 : i.dataset) == null ? void 0 : m.cost) ?? 0)), r = String(((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.combatAction) ?? "").trim(), o = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.combatLabel) ?? "").trim(), l = String(((h = i == null ? void 0 : i.dataset) == null ? void 0 : h.combatCostLabel) ?? "").trim();
    if (!(!a || !n || !r))
      try {
        const S = this.getPersistentActor() ?? this.actor, w = await de.spendResource(S, {
          token: ((g = this.getSheetTokenDocument) == null ? void 0 : g.call(this)) ?? de.getCurrentSceneTokenDocument(S) ?? de.getCurrentSceneTokenDocument(this.actor),
          resource: a,
          cost: n,
          actionId: r,
          actionLabel: o,
          actionCostLabel: l
        });
        if (!(w != null && w.ok)) {
          (y = ui.notifications) == null || y.warn((w == null ? void 0 : w.reason) ?? "Unable to spend action.");
          return;
        }
        v(this, B, ai).call(this, { rerender: !1 }), v(this, B, Pe).call(this, { force: !0 });
      } catch (S) {
        console.error("MWD | Failed to spend combat action", S), (b = ui.notifications) == null || b.error("Unable to spend action.");
      }
  }
  async _onCombatReduceBurn(t, i) {
    var a, n, r, o, l;
    if ((a = t == null ? void 0 : t.preventDefault) == null || a.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t), !v(this, B, ni).call(this, i, t, "Burn recovery is not available right now.") && this.isEditable)
      try {
        const c = this.getPersistentActor() ?? this.actor, u = await de.reduceBurn(c, {
          token: ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? de.getCurrentSceneTokenDocument(c) ?? de.getCurrentSceneTokenDocument(this.actor)
        });
        if (!(u != null && u.ok)) {
          (o = ui.notifications) == null || o.warn((u == null ? void 0 : u.reason) ?? "Unable to reduce Burn.");
          return;
        }
        v(this, B, ai).call(this, { rerender: !1 }), v(this, B, Pe).call(this, { force: !0 });
      } catch (c) {
        console.error("MWD | Failed to reduce Burn", c), (l = ui.notifications) == null || l.error("Unable to reduce Burn.");
      }
  }
  async _onCombatOverloadCheck(t, i) {
    var r, o, l, c, u, d, m, p, f, h, g;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), v(this, B, ni).call(this, i, t, "Overload check is not available right now.") || !this.isEditable) return;
    const a = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.roll) ?? ((m = (d = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : d.dataset) == null ? void 0 : m.roll);
    if (!a) return;
    let n;
    try {
      n = JSON.parse(a);
    } catch (y) {
      console.warn("MWD | Invalid overload payload", a, y);
      return;
    }
    try {
      const y = this.getPersistentActor() ?? this.actor, b = await ((h = (f = (p = game.mwd) == null ? void 0 : p.roll) == null ? void 0 : f.execute) == null ? void 0 : h.call(f, { actor: y, payload: n, event: t }));
      if (v(this, B, ai).call(this, { rerender: !1 }), !b) {
        v(this, B, Pe).call(this, !1);
        return;
      }
      v(this, B, Pe).call(this, { force: !0 });
    } catch (y) {
      console.error("MWD | Failed to launch overload check", y), (g = ui.notifications) == null || g.error("Unable to launch overload check.");
    }
  }
  async _onCombatAttack(t, i) {
    var u, d, m, p, f, h, g, y, b, S, w, E, I, N, L, Y, Q, G;
    if ((u = t == null ? void 0 : t.preventDefault) == null || u.call(t), (d = t == null ? void 0 : t.stopPropagation) == null || d.call(t), v(this, B, ni).call(this, i, t, "Attack is not available right now.") || !this.isEditable) return;
    const a = this.getPersistentActor() ?? this.actor, n = ((m = this.getSheetTokenDocument) == null ? void 0 : m.call(this)) ?? de.getCurrentSceneTokenDocument(a) ?? de.getCurrentSceneTokenDocument(this.actor), r = de.getSnapshot(a, { token: n });
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
    const o = 3 + Math.floor((Math.max(0, Number(((b = (y = (g = a.system) == null ? void 0 : g.attributes) == null ? void 0 : y.reflexes) == null ? void 0 : b.value) ?? 0)) + Math.max(0, Number(((E = (w = (S = a.system) == null ? void 0 : S.attributes) == null ? void 0 : w.willpower) == null ? void 0 : E.value) ?? 0))) / 2);
    if (Math.max(0, o - Math.max(0, Number(((I = r.state) == null ? void 0 : I.saSpentThisActivation) ?? 0))) < 2) {
      (N = ui.notifications) == null || N.warn("Activation SA cap reached.");
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
      const H = await ((Q = (Y = (L = game.mwd) == null ? void 0 : L.roll) == null ? void 0 : Y.execute) == null ? void 0 : Q.call(Y, { actor: a, payload: c, event: t }));
      if (v(this, B, ai).call(this, { rerender: !1 }), !H) {
        v(this, B, Pe).call(this, !1);
        return;
      }
      const D = await de.spendResource(a, {
        token: n,
        resource: "sa",
        cost: 2,
        actionId: "attack",
        actionLabel: "Attack",
        actionCostLabel: "2 SA"
      });
      D != null && D.ok || (G = ui.notifications) == null || G.warn((D == null ? void 0 : D.reason) ?? "Unable to spend attack action."), v(this, B, Pe).call(this, { force: !0 });
    } catch (H) {
      console.error("MWD | Failed to launch attack", H), Ws(H, "Unable to launch attack.");
    }
  }
  async _onAddSkillSpecialization(t, i) {
    var d, m, p, f;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable || !this.editing) return;
    const a = String(((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.skillKey) ?? "").trim();
    if (!a) return;
    const n = this.getPersistentActor() ?? this.actor, r = Wa(n.system ?? {}, a), o = Js(n.system ?? {}, a), l = mi(a).filter((h) => !o.includes(h.key));
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
            var b, S;
            return ((b = y.form.elements.specialization) == null ? void 0 : b.value) ?? ((S = l[0]) == null ? void 0 : S.key) ?? "";
          }
        }
      });
    }
    const u = Fs(
      r.concat([c])
    );
    await n.update({
      [`system.skills.${a}.specializations`]: u
    }), v(this, B, Pe).call(this, { force: !0 });
  }
  async _onRemoveSkillSpecialization(t, i) {
    var l, c, u, d;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable || !this.editing) return;
    const a = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.skillKey) ?? "").trim(), n = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.specializationKey) ?? "").trim();
    if (!a || !n) return;
    const r = this.getPersistentActor() ?? this.actor, o = Fs(
      Wa(r.system ?? {}, a).filter((m) => m !== n)
    );
    await r.update({
      [`system.skills.${a}.specializations`]: o
    }), v(this, B, Pe).call(this, { force: !0 });
  }
  async _onCreateLifeModuleItem(t, i) {
    var d, m, p, f, h;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable) return;
    const a = String(((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.moduleType) ?? "").trim();
    if (!a) return;
    const n = this.getPersistentActor() ?? this.actor, r = Bn(a);
    if (!r.length) {
      (f = ui.notifications) == null || f.warn(`No ${xi(a)} life modules are configured in game settings.`);
      return;
    }
    const o = await Nr({
      title: `Choose ${xi(a)} Life Module`,
      label: "Life Module",
      confirmLabel: "Create",
      options: r.map((g) => ({
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
    const c = Zo(l, {}), u = {};
    for (const g of c.filter((y) => y.hasMultipleChoices)) {
      const y = await Nr({
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
      system: as({
        moduleType: a,
        catalogId: l.id,
        selectedGrants: u
      })
    }]), v(this, B, Pe).call(this, { force: !0 });
  }
  async _onCreateOwnedItem(t, i) {
    var l, c, u;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable) return;
    const a = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.itemType) ?? "").trim();
    if (!a) return;
    const n = this.getPersistentActor() ?? this.actor, r = n.items.filter((d) => d.type === a).length, o = a === "personalWeapon" ? "Personal Weapon" : a === "armor" ? "Armor" : a.charAt(0).toUpperCase() + a.slice(1);
    await n.createEmbeddedDocuments("Item", [{
      name: `${o} ${r + 1}`,
      type: a
    }]), v(this, B, Pe).call(this, { force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var n, r, o;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const a = v(this, B, Ci).call(this, i, t);
    (o = a == null ? void 0 : a.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var r, o;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const a = v(this, B, Ci).call(this, i, t);
    if (!a) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [a.id]), v(this, B, Pe).call(this, { force: !0 });
  }
  async _onToggleInventoryAccordion(t, i) {
    var n, r, o, l, c, u, d, m, p, f;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const a = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.accordionId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((f = (p = (m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-accordion-id]")) == null ? void 0 : p.dataset) == null ? void 0 : f.accordionId) ?? ""
    ).trim();
    a && (z(this, pt).has(a) ? z(this, pt).delete(a) : z(this, pt).add(a), v(this, B, Pe).call(this, !1));
  }
  async _onToggleOwnedItemEquipped(t, i) {
    var r, o, l, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const a = v(this, B, Ci).call(this, i, t);
    if (!a) return;
    const n = this.getPersistentActor() ?? this.actor;
    await ((c = n.setOwnedItemEquipped) == null ? void 0 : c.call(n, a.id, !((l = a.system) != null && l.equipped))), v(this, B, Pe).call(this, { force: !0 });
  }
  async _onSetOwnedItemPrimary(t, i) {
    var r, o, l, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const a = v(this, B, Ci).call(this, i, t);
    if (!a) return;
    const n = this.getPersistentActor() ?? this.actor;
    await ((c = n.setOwnedItemPrimary) == null ? void 0 : c.call(n, a.id, !((l = a.system) != null && l.isPrimary))), v(this, B, Pe).call(this, { force: !0 });
  }
  async _onAdjustGearQuantity(t, i) {
    var c, u, d, m, p, f, h, g, y, b, S;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const a = v(this, B, Ci).call(this, i, t);
    if (!a || a.canonicalType !== "gear") return;
    const n = Math.trunc(Number(
      ((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.delta) ?? ((f = (p = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, "[data-delta]")) == null ? void 0 : p.dataset) == null ? void 0 : f.delta) ?? ((b = (y = (g = (h = t == null ? void 0 : t.target) == null ? void 0 : h.closest) == null ? void 0 : g.call(h, "[data-delta]")) == null ? void 0 : y.dataset) == null ? void 0 : b.delta) ?? 0
    ) || 0);
    if (!n) return;
    const o = (this.getPersistentActor() ?? this.actor).items.get(a.id) ?? a, l = Math.max(0, Math.trunc(Number(((S = o.system) == null ? void 0 : S.quantity) ?? 1) || 0) + n);
    await o.update({ "system.quantity": l }), v(this, B, Pe).call(this, { force: !0 });
  }
  async _onAttackWeapon(t, i) {
    var r, o, l, c, u, d, m, p, f, h;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), v(this, B, ni).call(this, i, t, "Equip that weapon before attacking.")) return;
    const a = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.roll) ?? ((m = (d = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : d.dataset) == null ? void 0 : m.roll);
    if (!a) return;
    let n;
    try {
      n = JSON.parse(a);
    } catch (g) {
      console.warn("MWD | Invalid attack payload", a, g);
      return;
    }
    try {
      const g = this.getPersistentActor() ?? this.actor;
      if (!await ((h = (f = (p = game.mwd) == null ? void 0 : p.roll) == null ? void 0 : f.execute) == null ? void 0 : h.call(f, { actor: g, payload: n, event: t }))) return;
      v(this, B, Pe).call(this, { force: !0 });
    } catch (g) {
      console.error("MWD | Failed to launch weapon attack", g), Ws(g, "Unable to attack with that weapon.");
    }
  }
};
Xe = new WeakMap(), Vt = new WeakMap(), oi = new WeakMap(), pt = new WeakMap(), B = new WeakSet(), hl = function() {
  v(this, B, on).call(this), z(this, Xe) && (De(this, Vt, (t) => {
    var n;
    const i = this._getRootElement();
    if (!i) return;
    const a = t.target;
    if (a instanceof Node && !((n = a.closest) != null && n.call(a, ".mwd-combat-menu"))) {
      if (!i.contains(a)) {
        v(this, B, ai).call(this);
        return;
      }
      v(this, B, ai).call(this);
    }
  }), document.addEventListener("click", z(this, Vt)));
}, on = function() {
  z(this, Vt) && (document.removeEventListener("click", z(this, Vt)), De(this, Vt, null));
}, _s = function() {
  const t = this._getRootElement();
  return t ? t.querySelector(".mwd-scroll-area") ?? t.querySelector(".csb-tab-panels") : null;
}, gl = function() {
  const t = v(this, B, _s).call(this);
  if (!(t instanceof HTMLElement)) {
    De(this, oi, null);
    return;
  }
  De(this, oi, {
    top: t.scrollTop,
    left: t.scrollLeft
  });
}, yl = function() {
  const t = z(this, oi);
  if (!t) return;
  const i = v(this, B, _s).call(this);
  i instanceof HTMLElement && (i.scrollTop = t.top, i.scrollLeft = t.left, requestAnimationFrame(() => {
    const a = v(this, B, _s).call(this);
    a instanceof HTMLElement && (a.scrollTop = t.top, a.scrollLeft = t.left);
  }), De(this, oi, null));
}, Pe = function(t = !1) {
  v(this, B, gl).call(this), this.render(t);
}, ai = function({ rerender: t = !0 } = {}) {
  z(this, Xe) && (De(this, Xe, null), t && v(this, B, Pe).call(this, !1));
}, Ci = function(t, i) {
  var n, r, o, l, c, u, d, m;
  const a = String(
    ((n = t == null ? void 0 : t.dataset) == null ? void 0 : n.itemId) ?? ((l = (o = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((m = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
  ).trim();
  return a ? this.actor.items.get(a) ?? null : null;
}, ni = function(t, i, a = "That action is not available right now.") {
  var o, l, c, u, d;
  const n = ((o = t == null ? void 0 : t.closest) == null ? void 0 : o.call(t, "[data-action-disabled='true']")) ?? ((c = (l = i == null ? void 0 : i.target) == null ? void 0 : l.closest) == null ? void 0 : c.call(l, "[data-action-disabled='true']"));
  if (!n) return !1;
  const r = String(((u = n.dataset) == null ? void 0 : u.actionReason) ?? a).trim() || a;
  return (d = ui.notifications) == null || d.warn(r), !0;
}, Yi = function(t, i) {
  return `${String(t ?? "").trim()}:${String(i ?? "").trim()}`;
}, R(ye, "PARTS", {
  sheet: {
    get template() {
      return `${q}/v2/actor/character-sheet.hbs`;
    }
  }
}), R(ye, "DEFAULT_OPTIONS", foundry.utils.mergeObject(bi(ye, ye, "DEFAULT_OPTIONS"), {
  classes: ["character-sheet", T, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
  window: { minWidth: 450, minHeight: 740, resizable: !0 },
  position: { width: 980, height: 900 },
  actions: {
    ...bi(ye, ye, "DEFAULT_OPTIONS").actions,
    edgeSet: ye.prototype._onEdgeSet,
    toggleCombatMenu: ye.prototype._onToggleCombatMenu,
    toggleStatuses: ye.prototype._onToggleStatuses,
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
let rn = ye;
class bl extends Fi {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["npc-sheet", T, "actor-sheet-v2"]
    });
  }
}
R(bl, "PARTS", {
  sheet: {
    get template() {
      return `${q}/actor/npc.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class Sl extends Fi {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["vehicle-sheet", T, "actor-sheet-v2"],
      position: { width: 860, height: 820 }
    });
  }
}
R(Sl, "PARTS", {
  sheet: {
    get template() {
      return `${q}/actor/vehicle.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class Al extends Fi {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["battlemech-sheet", T, "actor-sheet-v2"],
      position: { width: 900, height: 820 }
    });
  }
}
R(Al, "PARTS", {
  sheet: {
    get template() {
      return `${q}/actor/battlemech.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
function Um() {
  console.log(`${fe}Registering Actor sheets (V2)`);
  const { Actors: s } = foundry.documents.collections;
  s.registerSheet(T, rn, {
    types: ["character"],
    makeDefault: !0,
    label: "Character (V2)"
  }), s.registerSheet(T, bl, {
    types: ["npc"],
    makeDefault: !0,
    label: "NPC (V2)"
  }), s.registerSheet(T, Sl, {
    types: ["vehicle"],
    makeDefault: !0,
    label: "Vehicle (V2)"
  }), s.registerSheet(T, Al, {
    types: ["battlemech"],
    makeDefault: !0,
    label: "BattleMech (V2)"
  });
}
const { HandlebarsApplicationMixin: Wm } = foundry.applications.api, { HTMLField: Rr, StringField: Hm } = foundry.data.fields, Dr = /* @__PURE__ */ new Set(["system.notes", "system.description"]);
function va(s, e) {
  const t = new s({ required: !1, blank: !0, initial: "" });
  return t.name = e, t;
}
function jm(s = {}) {
  return {
    ...s,
    sourceReference: s.sourceReference ?? va(Hm, "system.sourceReference"),
    notes: s.notes ?? va(Rr, "system.notes"),
    description: s.description ?? va(Rr, "system.description")
  };
}
var li, Kt, ci, ht, Qi, ln;
const Oe = class Oe extends Wm(foundry.applications.sheets.ItemSheetV2) {
  constructor() {
    super(...arguments);
    Te(this, ht);
    Te(this, li, /* @__PURE__ */ new Map());
    Te(this, Kt, /* @__PURE__ */ new Map());
    Te(this, ci, null);
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
      classes: ["sheet", "item", T, "appv2", "mwd-sheet", "item-sheet"],
      position: {
        width: 760,
        height: 860
      },
      window: {
        resizable: !0
      },
      actions: {
        editImage: Oe._onEditImage,
        tab: Oe.prototype._onClickTab,
        accordion: Oe.prototype._onClickAccordion,
        checkbarElement: Oe._onClickCheckbar,
        modifierAdd: Oe._onModifierAdd,
        modifierDelete: Oe._onModifierDelete,
        modifierValueChange: Oe._onModifierValueChange,
        modifierConditionChange: Oe._onModifierConditionChange,
        modifierSelectionChange: Oe._onModifierSelectionChange,
        effectCreate: Oe._onEffectCreate,
        effectEdit: Oe._onEffectEdit,
        effectDelete: Oe._onEffectDelete,
        effectToggleDisabled: Oe._onEffectToggleDisabled
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
    const a = ((c = (l = (o = (r = game.system) == null ? void 0 : r.mwd) == null ? void 0 : o.styles) == null ? void 0 : l.selectCssClass) == null ? void 0 : c.call(l)) ?? "mwd-theme-default", n = ["mwd-theme-default", "mwd-theme-sra"];
    return t.classes = t.classes.filter((u) => !n.includes(u)), t.classes.push(a), t;
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
        [A.itemType.mechWeapon]: `${q}/v2/item/mech-weapon-root.hbs`,
        [A.itemType.armor]: `${q}/v2/item/armor.hbs`
      }[a] ?? `${q}/v2/item/${a}.hbs`;
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
    var N, L, Y, Q, G, H, D, V, ee;
    const i = await super._prepareContext(t), a = ((L = (N = game.system.mwd.modifiers) == null ? void 0 : N.getEnums) == null ? void 0 : L.call(N)) ?? {}, n = foundry.utils.deepClone((i == null ? void 0 : i.options) ?? {}), r = jm((i == null ? void 0 : i.fields) ?? ((Q = (Y = this.item.system) == null ? void 0 : Y.schema) == null ? void 0 : Q.fields) ?? {}), o = ((H = (G = this.item.actor) == null ? void 0 : G.getAttributes) == null ? void 0 : H.call(G, this.item)) ?? [], l = this._getCanonicalItemType(), c = !this.item.actor, u = !!this.item.actor, d = we.itemType.singular[l] ?? l, m = this._getEffectEntries(), p = m.filter((X) => X.syncedCount > 0).length, f = this.constructor.LAYOUT_ID, h = this.item.actor ? (X) => o.includes(X) : (X) => !0, g = l === A.itemType.skill, b = ["mwd", "item-sheet", this.isEditable ? "editable" : "locked"], S = b.join(" ");
    n.classes = b, n.cssClass = S;
    const w = async (X, { secrets: te = this.item.isOwner } = {}) => foundry.applications.ux.TextEditor.implementation.enrichHTML(X ?? "", {
      async: !0,
      secrets: te,
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
      fields: r,
      enriched: E,
      enrichedDescription: ((D = E == null ? void 0 : E.system) == null ? void 0 : D.description) ?? "",
      // Options for templates
      options: {
        ...n,
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
        ...oe.getEnums(h, g),
        ...a
      },
      MWD: we,
      itemSheet: {
        canonicalType: l,
        typeLabel: d,
        isArmorSheet: l === A.itemType.armor,
        isStandalone: c,
        canUseActorControls: u,
        supportsEffectSync: !!((ee = (V = this.item).supportsEquippedEffectSync) != null && ee.call(V)),
        effectEntries: m,
        effectCount: m.length,
        syncedEffectCount: p,
        summaryChips: this._getSummaryChips(),
        stateChips: this._getStateChips(m)
      },
      // CSS class for form element
      cssClass: S,
      // Tab configuration
      tabs: this._getTabs()
    };
    return f && (I.layout = await Hs.get(f)), I;
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
    var a, n, r;
    const i = [];
    return i.push({ kind: "ownership", label: this.item.actor ? "Owned Item" : "World Item" }), Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "equipped") && i.push({
      kind: "equipment",
      label: (a = this.item.system) != null && a.equipped ? "Equipped" : "Unequipped",
      tone: (n = this.item.system) != null && n.equipped ? "active" : "muted"
    }), Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "isPrimary") && ((r = this.item.system) != null && r.isPrimary) && i.push({ kind: "role", label: "Primary", tone: "accent" }), t.length && i.push({
      kind: "effects",
      label: `${t.length} Effect${t.length === 1 ? "" : "s"}`,
      tone: t.some((o) => o.syncedCount > 0) ? "active" : "muted"
    }), i;
  }
  _getEffectEntries() {
    var a, n, r, o, l, c;
    const t = /* @__PURE__ */ new Map(), i = ((n = (a = this.item).getSyncedActorEffects) == null ? void 0 : n.call(a)) ?? [];
    for (const u of i) {
      const d = (l = (o = (r = u.flags) == null ? void 0 : r[T]) == null ? void 0 : o.equippedItemSync) == null ? void 0 : l.sourceEffectId;
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
    const a = ((l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, ".csb-tab-link[data-tab]")) ?? ((u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, ".csb-tab-link[data-tab]"));
    if (!a) return;
    const n = a.closest(".csb-tabs");
    if (!n) return;
    const r = n.dataset.group || "default", o = a.dataset.tab;
    o && (z(this, li).set(r, o), v(this, ht, Qi).call(this, this._getRootElement(), r, o));
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const a = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!a) return;
    const n = a.dataset.section, r = a.closest(".csb-accordion");
    if (!r || !n) return;
    const o = r.dataset.group || "default", c = (z(this, Kt).has(o) ? z(this, Kt).get(o) : r.dataset.default || null) === n ? null : n;
    z(this, Kt).set(o, c), v(this, ht, ln).call(this, r, c);
  }
  _onRender(t, i) {
    var n, r, o, l;
    (n = super._onRender) == null || n.call(this, t, i), (r = this.window) != null && r.title && (this.window.title.textContent = this.title);
    const a = this._getRootElement();
    if (a) {
      for (const c of a.querySelectorAll(".sheet-tabs")) {
        const u = c.dataset.group || "default", d = Array.from(c.querySelectorAll("[data-tab]"));
        if (!d.length) continue;
        for (const h of d)
          h.addEventListener("click", (g) => {
            g.preventDefault(), g.stopPropagation();
            const y = h.dataset.tab;
            y && (z(this, li).set(u, y), v(this, ht, Qi).call(this, a, u, y));
          });
        const m = z(this, li).get(u), p = c.dataset.default || ((o = d[0]) == null ? void 0 : o.dataset.tab), f = m || p;
        f && v(this, ht, Qi).call(this, a, u, f);
      }
      for (const c of a.querySelectorAll(".csb-tabs")) {
        const u = c.dataset.group || "default", d = Array.from(c.querySelectorAll(".csb-tab-link[data-tab]"));
        if (!d.length) continue;
        const m = z(this, li).get(u), p = c.dataset.default || ((l = d[0]) == null ? void 0 : l.dataset.tab), f = m || p;
        f && v(this, ht, Qi).call(this, a, u, f);
      }
      for (const c of a.querySelectorAll(".csb-accordion")) {
        const u = c.dataset.group || "default", d = z(this, Kt).has(u) ? z(this, Kt).get(u) : c.dataset.default || null;
        v(this, ht, ln).call(this, c, d);
      }
      for (const c of a.querySelectorAll("prose-mirror[name]")) {
        const u = c.getAttribute("name") ?? "";
        Dr.has(u) && c.addEventListener("change", (d) => {
          d.preventDefault(), d.stopPropagation(), this._updateRichTextField(c);
        });
      }
      this._restoreScrollPositions();
    }
  }
  async _updateRichTextField(t) {
    var r;
    const i = String(((r = t == null ? void 0 : t.getAttribute) == null ? void 0 : r.call(t, "name")) ?? (t == null ? void 0 : t.name) ?? "");
    if (!this.isEditable || !Dr.has(i)) return;
    const a = String(t.value ?? ""), n = String(foundry.utils.getProperty(this.item, i) ?? "");
    if (a !== n)
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
      De(this, ci, null);
      return;
    }
    const i = [];
    for (const a of this._getScrollRestoreSelectors())
      t.querySelectorAll(a).forEach((n, r) => {
        n instanceof HTMLElement && i.push({
          selector: a,
          index: r,
          top: n.scrollTop,
          left: n.scrollLeft
        });
      });
    De(this, ci, i.length ? i : null);
  }
  _restoreScrollPositions() {
    const t = z(this, ci);
    if (!(t != null && t.length)) return;
    const i = () => {
      const a = this._getRootElement();
      if (a)
        for (const n of t) {
          const r = a.querySelectorAll(n.selector).item(n.index);
          r instanceof HTMLElement && (r.scrollTop = n.top, r.scrollLeft = n.left);
        }
    };
    i(), requestAnimationFrame(i), De(this, ci, null);
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
    const n = i.closest(".checkbar-root");
    if (!n) return;
    const r = n.dataset.monitorCode, o = Number.parseInt(i.dataset.index), l = i.dataset.checked === "true";
    await a.parent.switchMonitorCheck(r, o, l);
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
    const a = i.closest(".define-modifier");
    if (!a) return;
    const n = a.dataset.modifierId;
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
    const a = i.closest(".define-modifier");
    if (!a) return;
    const n = a.dataset.modifierId;
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
    const a = i.closest(".define-modifier");
    if (!a) return;
    const n = a.dataset.modifierId;
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
    const a = i.closest(".define-modifier");
    if (!a) return;
    const n = a.dataset.modifierId, r = i.dataset.modifierSelect;
    n && r && await this.item.changeModifierSelection(n, r, i.value);
  }
  static async _onEffectCreate(t, i) {
    var n, r, o;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
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
    var r, o, l, c, u, d, m;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const a = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.effectId) ?? ((d = (u = (c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : d.effectId);
    if (!a) return;
    const n = this.item.effects.get(a);
    (m = n == null ? void 0 : n.sheet) == null || m.render(!0);
  }
  static async _onEffectDelete(t, i) {
    var n, r, o, l, c, u;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const a = ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.effectId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-effect-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.effectId);
    a && await this.item.deleteEmbeddedDocuments("ActiveEffect", [a]);
  }
  static async _onEffectToggleDisabled(t, i) {
    var r, o, l, c, u, d;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const a = ((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.effectId) ?? ((d = (u = (c = i == null ? void 0 : i.closest) == null ? void 0 : c.call(i, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : d.effectId);
    if (!a) return;
    const n = this.item.effects.get(a);
    n && await n.update({ disabled: !n.disabled });
  }
};
li = new WeakMap(), Kt = new WeakMap(), ci = new WeakMap(), ht = new WeakSet(), Qi = function(t, i, a) {
  t && (t.querySelectorAll(`.csb-tabs[data-group="${i}"] .csb-tab-link[data-tab]`).forEach((n) => {
    n.classList.toggle("is-active", n.dataset.tab === a);
  }), t.querySelectorAll(`.csb-tabs[data-group="${i}"] .csb-tab-panel[data-tab]`).forEach((n) => {
    n.classList.toggle("is-active", n.dataset.tab === a);
  }), t.querySelectorAll(".sheet-tabs [data-tab]").forEach((n) => {
    var o;
    (((o = n.closest(".sheet-tabs")) == null ? void 0 : o.dataset.group) || "default") === i && n.classList.toggle("active", n.dataset.tab === a);
  }), t.querySelectorAll(`.tab[data-group="${i}"]`).forEach((n) => {
    n.classList.toggle("active", n.dataset.tab === a);
  }));
}, ln = function(t, i) {
  t.dataset.activeSection = i ?? "", t.querySelectorAll(".csb-accordion__section").forEach((a) => {
    const n = a.dataset.section === i;
    a.classList.toggle("is-active", n);
  }), t.querySelectorAll(".csb-accordion__trigger").forEach((a) => {
    const n = a.dataset.section === i;
    a.classList.toggle("is-active", n), a.setAttribute("aria-expanded", n ? "true" : "false");
  }), t.querySelectorAll(".csb-accordion__panel").forEach((a) => {
    const n = a.closest(".csb-accordion__section"), r = (n == null ? void 0 : n.dataset.section) === i;
    a.classList.toggle("is-active", r);
  });
}, R(Oe, "LAYOUT_ID", null), /** @override */
R(Oe, "PARTS", {
  sheet: {
    template: "",
    // Set dynamically in _getPartTemplate
    scrollable: [".sheet-body"]
  }
}), R(Oe, "TABS", {
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
let bt = Oe;
class cn extends bt {
}
R(cn, "LAYOUT_ID", "contact"), R(cn, "PARTS", {
  sheet: {
    template: `${q}/v2/item/contact.hbs`,
    scrollable: [".sheet-body"]
  }
});
const Ir = Object.freeze([
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
class un extends bt {
  async _prepareContext(e) {
    var a;
    const t = await super._prepareContext(e), i = this.item.system ?? {};
    return t.system = {
      ...i,
      quantity: Math.max(0, Math.trunc(Number(i.quantity ?? 1) || 0)),
      rating: Math.max(0, Math.trunc(Number(i.rating ?? 0) || 0)),
      category: String(i.category ?? "").trim(),
      tags: Array.isArray(i.tags) ? i.tags.map((n) => String(n ?? "").trim()).filter(Boolean) : []
    }, t.gearEditor = {
      categories: Ir.map((n) => ({ ...n }))
    }, t.tagsText = t.system.tags.join(", "), t.itemSheet = {
      ...t.itemSheet ?? {},
      summaryChips: [
        { label: "Qty", value: String(t.system.quantity) },
        { label: "Rating", value: String(t.system.rating) },
        {
          label: "Category",
          value: ((a = Ir.find((n) => n.value === t.system.category)) == null ? void 0 : a.label) ?? "Uncategorized"
        }
      ]
    }, t;
  }
}
R(un, "LAYOUT_ID", "gear"), R(un, "PARTS", {
  sheet: {
    template: `${q}/v2/item/gear.hbs`,
    scrollable: [".sheet-body"]
  }
});
class dn extends bt {
  async _prepareContext(e) {
    var r, o;
    const t = await super._prepareContext(e), i = nt(this.item.system ?? {}), a = $o(), n = Array.isArray((r = t.ENUMS) == null ? void 0 : r.skills) ? t.ENUMS.skills.map((l) => ({
      value: String((l == null ? void 0 : l.value) ?? "").trim(),
      label: String((l == null ? void 0 : l.label) ?? (l == null ? void 0 : l.value) ?? "").trim()
    })).filter((l) => l.value) : [];
    return t.system = {
      ...i,
      effects: (Array.isArray(i.effects) ? i.effects : []).map((l) => ({
        ...l,
        showSkillPicker: Lo(l) || Array.isArray(l.skillKeys) && l.skillKeys.length > 0,
        isEdgeEvent: l.type === "edgeEvent"
      }))
    }, t.traitEditor = {
      ...a,
      skills: n
    }, t.itemSheet = {
      ...t.itemSheet ?? {},
      sheetClass: "mwd-item-sheet--quality",
      summaryChips: [
        { label: "Category", value: Cs(i.category) },
        { label: "Tier", value: Ps(i.tier) },
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
R(dn, "LAYOUT_ID", "quality"), R(dn, "PARTS", {
  sheet: {
    template: `${q}/v2/item/quality.hbs`,
    scrollable: [".sheet-body"]
  }
});
class mn extends bt {
}
R(mn, "LAYOUT_ID", "asset-module"), R(mn, "PARTS", {
  sheet: {
    template: `${q}/v2/item/assetModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class pn extends bt {
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
    const e = as(this.item.system ?? {}), t = Qt(e.catalogId), a = ia(t, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }).map((r) => r.choice).filter(Boolean).map((r) => ss(r, { includeBonusText: !0 })).join(", "), n = this.item.actor ? Jt(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return [
      { label: "Slot", value: xi(e.moduleType) },
      { label: "Module", value: (t == null ? void 0 : t.label) ?? "Unlinked" },
      { label: "Bonuses", value: a || "Pending choice" },
      n ? { label: "Status", value: n.isActive ? "Active" : "Inactive" } : null
    ].filter(Boolean);
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), i = as(this.item.system ?? {}), a = i.moduleType, n = Qt(i.catalogId), r = a ? Bn(a) : [], o = Zo(n, i.selectedGrants, { legacySelectedSkill: i.selectedSkill }), l = this.item.actor ? Jt(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return t.lifeModuleEditor = {
      moduleType: a,
      moduleTypeLabel: xi(a),
      moduleTypes: Ko().map((c) => ({
        ...c,
        selected: c.value === a
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
        return ((u = Qt(c)) == null ? void 0 : u.label) ?? c;
      }),
      excludesAnyLabels: ((n == null ? void 0 : n.excludesAny) ?? []).map((c) => {
        var u;
        return ((u = Qt(c)) == null ? void 0 : u.label) ?? c;
      }),
      actorState: l,
      warningLabels: [...(l == null ? void 0 : l.warningLabels) ?? []],
      isOwned: !!this.item.actor,
      statusLabel: l ? l.isActive ? "Active" : "Inactive" : n ? "Configured" : "Unlinked",
      statusReason: (l == null ? void 0 : l.inactiveReason) ?? ""
    }, t;
  }
}
R(pn, "LAYOUT_ID", "life-module"), R(pn, "PARTS", {
  sheet: {
    template: `${q}/v2/item/lifeModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class fn extends bt {
}
R(fn, "LAYOUT_ID", "skill"), R(fn, "PARTS", {
  sheet: {
    template: `${q}/v2/item/skill.hbs`,
    scrollable: [".sheet-body"]
  }
});
const qm = Object.freeze([
  "firearms",
  "projectileWeapons",
  "heavyWeapons",
  "meleeCombat"
]), Gm = Object.freeze([
  { value: "energy", label: "Energy" },
  { value: "kinetic", label: "Kinetic" },
  { value: "ballistic", label: "Ballistic" },
  { value: "explosive", label: "Explosive" },
  { value: "plasma", label: "Plasma" },
  { value: "electrical", label: "Electrical" },
  { value: "melee", label: "Melee" },
  { value: "none", label: "None" }
]);
function Or(s, e, t) {
  const i = String(e ?? "").trim();
  return !i || s.some((a) => a.value === i) ? s : s.concat({ value: i, label: t(i) });
}
class aa extends bt {
  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        weaponSkillChange: aa._onWeaponSkillChange
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
    const a = Array.isArray((l = t.ENUMS) == null ? void 0 : l.skills) ? t.ENUMS.skills : [], n = (c = this.item.system) == null ? void 0 : c.skill, r = (u = this.item.system) == null ? void 0 : u.damageType, o = i === "personalWeapon" ? Or(
      a.filter((f) => qm.includes(f.value)),
      n,
      (f) => {
        var h;
        return ((h = a.find((g) => g.value === f)) == null ? void 0 : h.label) ?? f;
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
      damageTypes: Or(
        i === "personalWeapon" ? [...$s] : [...Gm],
        r,
        (f) => i === "personalWeapon" ? Pt(f) : f
      ),
      ranges: ot.RANGE_ORDER.map((f) => ({
        value: f,
        label: f.charAt(0).toUpperCase() + f.slice(1)
      })),
      weaponCapabilityOptions: Kl,
      payloadCapabilityOptions: Yl,
      ammoDamageTypes: [{ value: "", label: "Use Weapon Default" }, ...$s],
      payloadTemplateShapes: Xr,
      payloadTemplatePlacements: Zr,
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
    const i = t.value, a = (r = (n = game.system.mwd.skills) == null ? void 0 : n.get) == null ? void 0 : r.call(n, i);
    a != null && a.defense && await this.item.update({ "system.defense": a.defense }, { render: !1 });
  }
}
const Di = class Di extends aa {
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
    const t = await super._prepareContext(e), i = this.item.actor ?? null, a = t.weaponProfile ?? null, n = !!(i && typeof i.isCharacterLike == "function" && i.isCharacterLike() && ((o = (r = this.item).isPersonalWeapon) != null && o.call(r)));
    return t.itemSheet = {
      ...t.itemSheet ?? {},
      canAttack: n,
      attackDisabled: !n || !((l = this.item.system) != null && l.equipped)
    }, t.itemSheet.summaryChips = this._getSummaryChips(a), t.itemSheet.reloadState = this._getReloadDisplayState(a), t;
  }
  _getReloadDisplayState(e = ((t) => ((i) => (i = (t = this.item).getCombatProfile) == null ? void 0 : i.call(t))())() ?? null) {
    var d, m, p, f, h;
    const a = ((m = (d = this.item).canReloadActivePayload) == null ? void 0 : m.call(d, { detailed: !0 })) ?? { canReload: !1, reason: "" }, n = !!((p = e == null ? void 0 : e.sourceState) != null && p.isTracked), r = String((e == null ? void 0 : e.payloadLabel) ?? (a == null ? void 0 : a.payloadLabel) ?? "").trim() || "Unloaded", o = Number(((f = e == null ? void 0 : e.sourceState) == null ? void 0 : f.current) ?? (a == null ? void 0 : a.current) ?? 0) || 0, l = Number(((h = e == null ? void 0 : e.sourceState) == null ? void 0 : h.max) ?? (a == null ? void 0 : a.max) ?? 0) || 0, c = n ? `${r} ${o}/${l}` : r, u = a.canReload ? "Click to reload" : String(a.reason ?? "").trim() || "Payload read-only";
    return {
      canReload: !!a.canReload,
      disabled: !a.canReload,
      value: c,
      hint: u,
      title: a.canReload ? `Reload ${r}` : u
    };
  }
  _getSummaryChips(e = ((t) => ((i) => (i = (t = this.item).getCombatProfile) == null ? void 0 : i.call(t))())() ?? null) {
    var n, r, o;
    if (!e) return [];
    const a = [
      { label: "Category", value: String(e.category ?? "").trim() || "Ranged" },
      { label: "Skill", value: ((n = e.skillDef) == null ? void 0 : n.label) ?? e.skill ?? "Firearms" },
      { label: "DV", value: String(Number(e.damage ?? 0)) },
      { label: "AP", value: String(Number(e.ap ?? 0)) },
      { label: "Type", value: Pt(e.damageType) || "Penetrating" },
      { label: "Range", value: String(((r = e.range) == null ? void 0 : r.max) ?? "near").trim() || "Near" }
    ];
    return String(e.category ?? "").trim().toLowerCase() !== "melee" && a.push((o = e == null ? void 0 : e.sourceState) != null && o.isTracked ? { label: "Payload", value: `${(e == null ? void 0 : e.payloadLabel) || "Unloaded"} (${Number(e.sourceState.current ?? 0)}/${Number(e.sourceState.max ?? 0)})` } : { label: "Payload", value: (e == null ? void 0 : e.payloadLabel) || "Unloaded" }), a;
  }
  static async _onAttackWeapon(e) {
    var i, a, n, r, o;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (a = e == null ? void 0 : e.stopPropagation) == null || a.call(e);
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
        console.error("MWD | Failed to launch weapon sheet attack", l), Ws(l, "Unable to attack with that weapon.");
      }
  }
  static async _onReloadWeaponPayload(e) {
    var i, a, n, r, o, l, c, u;
    if ((i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (a = e == null ? void 0 : e.stopPropagation) == null || a.call(e), !((r = (n = this.item) == null ? void 0 : n.isPersonalWeapon) != null && r.call(n))) return;
    (o = this._captureScrollPositions) == null || o.call(this);
    const t = await ((c = (l = this.item).reloadActivePayload) == null ? void 0 : c.call(l));
    t != null && t.ok || (u = ui.notifications) == null || u.warn((t == null ? void 0 : t.reason) ?? "Unable to reload that weapon.");
  }
  _onRender(e, t) {
    var n, r;
    (n = super._onRender) == null || n.call(this, e, t);
    const i = (r = this._getRootElement) == null ? void 0 : r.call(this);
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
        const u = String(o.dataset.values ?? "").split(",").map((f) => f.trim()).filter(Boolean), d = Array.from(/* @__PURE__ */ new Set([...u, c]));
        o.value = "";
        const m = String(o.dataset.payloadId ?? "").trim(), p = String(o.dataset.field ?? "").trim();
        if (p) {
          if (m) {
            a(() => {
              var f, h;
              return (h = (f = this.item).updatePayloadField) == null ? void 0 : h.call(f, m, p, d.join(", "));
            });
            return;
          }
          a(() => this.item.update({ [p]: d }));
        }
      });
    });
  }
};
R(Di, "LAYOUT_ID", "personal-weapon"), R(Di, "PARTS", {
  sheet: {
    template: `${q}/v2/item/personal-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
let hn = Di;
class gn extends aa {
}
R(gn, "LAYOUT_ID", "mech-weapon"), R(gn, "PARTS", {
  sheet: {
    template: `${q}/v2/item/mech-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
const Vm = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
};
function _r(s) {
  const e = Number(s ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function Km({ defenseBonus: s = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(s ?? 0) || 0;
  i !== 0 && t.push(`Defense ${_r(i)}`);
  const a = gt(e);
  for (const [n, r] of Object.entries(Vm)) {
    const o = Number((a == null ? void 0 : a[n]) ?? 0) || 0;
    o !== 0 && t.push(`${r} ${_r(o)}`);
  }
  return t.join(" | ");
}
class yn extends bt {
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
    var l, c, u, d, m, p, f, h, g, y, b, S, w, E, I, N;
    const t = await super._prepareContext(e), i = this.item, a = i.actor ?? null, n = ((l = a == null ? void 0 : a.getPersonalCombatLoadout) == null ? void 0 : l.call(a)) ?? null, r = ((c = n == null ? void 0 : n.activeArmor) == null ? void 0 : c.id) ?? null, o = ((u = n == null ? void 0 : n.activeArmor) == null ? void 0 : u.id) === i.id ? n.activeArmor : (d = i.getArmorProfile) == null ? void 0 : d.call(i, { actor: a });
    return t.armorState = o, t.isActiveArmor = r === i.id, t.effectiveDurabilityCurrent = Number(
      ((m = o == null ? void 0 : o.durability) == null ? void 0 : m.current) ?? ((f = (p = i.system) == null ? void 0 : p.durability) == null ? void 0 : f.current) ?? ((g = (h = i.system) == null ? void 0 : h.durability) == null ? void 0 : g.max) ?? ((y = i.system) == null ? void 0 : y.rating) ?? 0
    ), t.effectiveArmorRating = Number(
      (o == null ? void 0 : o.currentArmorRating) ?? (o == null ? void 0 : o.ratingCurrent) ?? Math.min(
        Number(((b = i.system) == null ? void 0 : b.rating) ?? 0),
        Number(((w = (S = i.system) == null ? void 0 : S.durability) == null ? void 0 : w.current) ?? ((I = (E = i.system) == null ? void 0 : E.durability) == null ? void 0 : I.max) ?? ((N = i.system) == null ? void 0 : N.rating) ?? 0)
      )
    ), t.effectiveArmorResist = Number(
      (o == null ? void 0 : o.baseMitigation) ?? (o == null ? void 0 : o.baseResistance) ?? 0
    ), t.armorModifierSummary = this._getArmorModifierSummary(o), t.itemSheet = { ...t.itemSheet ?? {} }, t.itemSheet.summaryChips = this._getSummaryChips(o), t.armorEditor = {
      standardTraits: [...rc]
    }, t;
  }
  _getSummaryChips(e = null) {
    var n, r, o, l, c, u, d, m, p, f, h, g, y, b, S;
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
    ], a = Number(((p = (m = e == null ? void 0 : e.traitState) == null ? void 0 : m.reinforced) == null ? void 0 : p.max) ?? ((h = (f = t == null ? void 0 : t.traitState) == null ? void 0 : f.reinforced) == null ? void 0 : h.max) ?? 0);
    return a > 0 && i.push({
      label: "Reinforced",
      value: `${Number(((y = (g = e == null ? void 0 : e.traitState) == null ? void 0 : g.reinforced) == null ? void 0 : y.current) ?? ((S = (b = t == null ? void 0 : t.traitState) == null ? void 0 : b.reinforced) == null ? void 0 : S.current) ?? 0)}/${a}`
    }), i;
  }
  _getArmorModifierSummary(e = null) {
    const t = this.item.system ?? {};
    return Km({
      defenseBonus: (e == null ? void 0 : e.defenseBonus) ?? t.defenseBonus ?? 0,
      mitigationByType: (e == null ? void 0 : e.mitigationByType) ?? (e == null ? void 0 : e.typedMitigation) ?? t.mitigationByType ?? {}
    });
  }
  _onRender(e, t) {
    var a, n;
    (a = super._onRender) == null || a.call(this, e, t);
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
R(yn, "LAYOUT_ID", "armor"), R(yn, "PARTS", {
  sheet: {
    template: `${q}/v2/item/armor-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
function Ym() {
  console.log(`${fe}Registering Item sheets (V2)`);
  const { Items: s } = foundry.documents.collections;
  s.registerSheet(T, cn, { types: ["contact"], makeDefault: !0, label: "Contact (V2)" }), s.registerSheet(T, un, { types: ["gear"], makeDefault: !0, label: "Gear (V2)" }), s.registerSheet(T, dn, { types: ["quality"], makeDefault: !0, label: "Quality (V2)" }), s.registerSheet(T, mn, { types: ["assetModule"], makeDefault: !0, label: "Asset Module (V2)" }), s.registerSheet(T, pn, { types: ["lifeModule"], makeDefault: !0, label: "Life Module (V2)" }), s.registerSheet(T, fn, { types: ["skill"], makeDefault: !0, label: "Skill (V2)" }), s.registerSheet(T, hn, { types: ["personalWeapon", "weapon"], makeDefault: !0, label: "Personal Weapon (V2)" }), s.registerSheet(T, gn, { types: ["mechWeapon"], makeDefault: !0, label: "Mech Weapon (V2)" }), s.registerSheet(T, yn, { types: ["armor"], makeDefault: !0, label: "Armor (V2)" });
}
const Lr = [
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
function Qm(s) {
  const e = String(s).replaceAll("\\", "/"), t = `systems/${T}/templates/`, i = e.indexOf(t);
  return `mwd.${(i >= 0 ? e.slice(i + t.length) : e).replace(/\.hbs$/i, "").split("/").filter(Boolean).map((o) => o.replace(/^_+/, "")).join(".")}`;
}
function Jm() {
  var s, e;
  return ((e = (s = foundry == null ? void 0 : foundry.applications) == null ? void 0 : s.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
async function Xm() {
  var e, t;
  const s = Jm();
  try {
    const i = {};
    for (const n of Lr)
      i[Qm(n)] = n, i[n] = n;
    await foundry.applications.handlebars.loadTemplates(i);
    const a = "mwd.v2.ui.layout-root";
    if (!((e = Handlebars.partials) != null && e[a])) {
      const n = Object.keys(Handlebars.partials ?? {});
      throw console.error("Missing required partial:", a), console.error("Closest matches:", n.filter((r) => r.includes("layout-root"))), new Error(`Template preload failed: ${a} not registered`);
    }
    if (s !== Handlebars) {
      for (const [n, r] of Object.entries(s.partials ?? {}))
        if (!((t = Handlebars.partials) != null && t[n]))
          try {
            Handlebars.registerPartial(n, r);
          } catch {
          }
    }
    console.log(`${fe}preloadTemplatesV2 OK`, { loaded: Lr.length });
  } catch (i) {
    throw console.error(`${fe}preloadTemplatesV2 FAILED`, i), i;
  }
}
function $r(s) {
  const e = Math.max(0, Number(s) || 0);
  return -Math.floor(e / 3);
}
function Zm(s) {
  const e = Math.max(0, Number(s) || 0);
  return e === 0 ? 0 : Math.ceil(e / 4);
}
function ep(s = {}) {
  const e = s.physical ?? {}, t = s.fatigue ?? {}, i = s.armor ?? {}, a = Number(e.value) || 0, n = Number(t.value) || 0, r = Math.max(Number(i.value) || 0, Number(i.max) || 0);
  return {
    physical: { penalty: $r(a) },
    fatigue: { penalty: $r(n) },
    armor: { resistance: Zm(r) }
  };
}
const Ea = {
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
function tp(s, e, t, i) {
  const a = s.system ?? {}, n = `monitors.${e}`, r = Number(foundry.utils.getProperty(a, `${n}.max`)) || 0, o = Number(foundry.utils.getProperty(a, `${n}.value`)) || 0;
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
function ip(s = {}) {
  return Object.entries(gt(s)).filter(([, e]) => Number(e) > 0).map(([e, t]) => `${e} +${t}`).join(", ");
}
class sp extends Actor {
  /* -------------------------------------------- */
  /* Base & Derived Data                           */
  /* -------------------------------------------- */
  /** @override */
  prepareBaseData() {
    var e, t;
    if (super.prepareBaseData(), this.isCharacterLike()) {
      const i = this.system ?? {};
      if (Uc(i), (e = i.skills) != null && e.skills && typeof i.skills.skills == "object") {
        for (const [a, n] of Object.entries(i.skills.skills))
          (t = i.skills)[a] ?? (t[a] = n);
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
        const n = Object.prototype.hasOwnProperty.call(a, "value"), r = Number(a.value);
        (!n || !Number.isFinite(r)) && (a.value = a.rating), "max" in a && delete a.max;
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
      const n = ((a = (i = this.system) == null ? void 0 : i.counters) == null ? void 0 : a.edgePools) ?? {}, r = {};
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
    const e = [], t = this.items.filter((p) => {
      var f;
      return ((f = p.isPersonalWeapon) == null ? void 0 : f.call(p)) ?? p.type === A.itemType.personalWeapon;
    }).map((p) => {
      var f;
      return ((f = p.getCombatProfile) == null ? void 0 : f.call(p)) ?? null;
    }).filter(Boolean), i = this.items.filter((p) => {
      var f;
      return ((f = p.isArmor) == null ? void 0 : f.call(p)) ?? p.type === A.itemType.armor;
    }).map((p) => {
      var f;
      return ((f = p.getArmorProfile) == null ? void 0 : f.call(p, { actor: this })) ?? null;
    }).filter(Boolean), a = t.filter((p) => p.equipped), n = i.filter((p) => p.equipped), r = a.filter((p) => p.isPrimary), o = n.filter((p) => p.isPrimary);
    let l = null, c = null, u = !1;
    r.length === 1 ? (c = r[0], l = c) : r.length > 1 ? (e.push("Multiple equipped primary weapons found; attack selection requires a chooser."), u = !0) : a.length === 1 ? l = a[0] : a.length > 1 ? u = !0 : l = ot.buildDefaultUnarmedProfile(this);
    let d = null, m = null;
    return o.length === 1 ? (d = o[0], m = this._buildActiveArmorState(d)) : o.length > 1 ? (e.push("Multiple equipped primary armor items found; using the first equipped armor."), m = n[0] ? this._buildActiveArmorState(n[0]) : null) : n.length === 1 ? m = this._buildActiveArmorState(n[0]) : n.length > 1 && (e.push("Multiple equipped armor items found without a single primary; using the first equipped armor."), m = this._buildActiveArmorState(n[0])), {
      weapons: t,
      equippedWeapons: a,
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
    ), a = Math.max(0, Number((e == null ? void 0 : e.rating) ?? 0)), n = Math.min(a, i), r = gt(e == null ? void 0 : e.mitigationByType), o = vn(n);
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
    var a, n, r;
    const i = this.getOwnedItem(e);
    return !i || !((a = i.isPersonalWeapon) != null && a.call(i) || (n = i.isArmor) != null && n.call(i)) ? null : this.updateEmbeddedDocuments("Item", [{
      _id: i.id,
      "system.equipped": !!t,
      "system.isPrimary": t ? !!((r = i.system) != null && r.isPrimary) : !1
    }]);
  }
  async setOwnedItemPrimary(e, t) {
    var r, o, l, c;
    const i = this.getOwnedItem(e);
    if (!i || !((r = i.isPersonalWeapon) != null && r.call(i) || (o = i.isArmor) != null && o.call(i))) return null;
    const a = [], n = !!t;
    if (n)
      for (const u of this.items.filter((d) => d.type === i.type && d.id !== i.id))
        (l = u.system) != null && l.isPrimary && a.push({ _id: u.id, "system.isPrimary": !1 });
    return a.push({
      _id: i.id,
      "system.isPrimary": n,
      "system.equipped": n ? !0 : !!((c = i.system) != null && c.equipped)
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
    const a = this.getEdgePoolRaw(e), n = Math.max(0, Number((a == null ? void 0 : a.rating) ?? 0)), r = Math.max(0, Number((a == null ? void 0 : a.value) ?? 0)), o = Math.max(0, Number(((f = Jt(this).bonusByEdgePool) == null ? void 0 : f[e]) ?? 0)), l = n + o, c = Math.min(l, t), u = Math.min(r, c);
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
    const i = Math.max(0, Number(((r = this.getEdgePool(e)) == null ? void 0 : r.effectiveMax) ?? 0)), a = Number(t ?? 0), n = Math.max(0, Math.min(a, i));
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
    const i = Math.max(0, Number(((n = this.getEdgePoolRaw(e)) == null ? void 0 : n.value) ?? 0)), a = Number(t ?? 0);
    return this.setEdgePoolValue(e, i + a);
  }
  /**
   * Set the RATING (advancement ceiling) for a pool.
   * Stores true rating (not cap-clamped), then clamps current value to new effective max.
   */
  async setEdgePoolRating(e, t) {
    var c, u;
    if (!this.hasEdgePools()) return;
    const i = this.getEdgeCap(), a = Math.max(0, Number(t ?? 0)), n = Math.max(0, Number(((c = Jt(this).bonusByEdgePool) == null ? void 0 : c[e]) ?? 0)), r = Math.min(a + n, i), o = Math.max(0, Number(((u = this.getEdgePoolRaw(e)) == null ? void 0 : u.value) ?? 0)), l = Math.min(o, r);
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
    var i, a, n, r;
    const t = this.getEdgeCap();
    if (this.hasEdgePools()) {
      const o = ((a = (i = this._mwdDerived) == null ? void 0 : i.edgePools) == null ? void 0 : a.pools) ?? {};
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
    const a = Math.max(0, Number(t ?? 1));
    if (!a) return;
    let n = a;
    if (!i.skipTraitHooks) {
      const o = i.runtime ?? {}, l = {
        poolKey: e,
        amount: a,
        source: String(i.source ?? "").trim(),
        eventKey: String(i.eventKey ?? "").trim()
      }, c = rt({
        actor: this,
        phase: "onEdgeSpend",
        facts: ja({ actor: this, packet: l, phase: "onEdgeSpend", runtime: o }),
        packet: l,
        options: { runtime: o, consumeUsage: !0 }
      });
      await Xt({ actor: this, mutations: c.mutations, runtime: o }), n = Math.max(0, Number(c.packet.amount ?? a) || 0);
    }
    const r = n;
    if (r)
      return this.adjustEdgePoolValue(e, -r);
  }
  async gainEdge(e, t = 1, i = {}) {
    if (!this.hasEdgePools()) return;
    const a = Number(t ?? 0);
    if (!a) return;
    let n = a;
    if (!i.skipTraitHooks) {
      const r = i.runtime ?? {}, o = {
        poolKey: e,
        amount: a,
        source: String(i.source ?? "").trim(),
        eventKey: String(i.eventKey ?? "").trim()
      }, l = rt({
        actor: this,
        phase: "onEdgeGain",
        facts: ja({ actor: this, packet: o, phase: "onEdgeGain", runtime: r }),
        packet: o,
        options: { runtime: r, consumeUsage: !0 }
      });
      await Xt({ actor: this, mutations: l.mutations, runtime: r }), n = Number(l.packet.amount ?? a) || 0;
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
  _onCreateDescendantDocuments(e, t, i, a, n, r) {
    super._onCreateDescendantDocuments(e, t, i, a, n, r), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  _onUpdateDescendantDocuments(e, t, i, a, n, r) {
    super._onUpdateDescendantDocuments(e, t, i, a, n, r), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  _onDeleteDescendantDocuments(e, t, i, a, n, r) {
    super._onDeleteDescendantDocuments(e, t, i, a, n, r), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  async _syncOverloadedEffect(e) {
    await this.toggleStatusEffect("overloaded", { active: e, overlay: !1 });
  }
  async _syncOverloadedFieldFromEffects() {
    var i, a, n, r;
    const e = ((a = (i = this.statuses) == null ? void 0 : i.has) == null ? void 0 : a.call(i, "overloaded")) ?? !1, t = !!((r = (n = this.system) == null ? void 0 : n.burn) != null && r.overloaded);
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
      const y = this.getPersonalCombatLoadout({ refresh: !0 }), b = ((d = y == null ? void 0 : y.activeArmor) == null ? void 0 : d.armorId) ?? ((m = y == null ? void 0 : y.activeArmor) == null ? void 0 : m.id) ?? null, S = b ? this.items.get(b) : null;
      if (!(S != null && S.id)) return null;
      const w = Math.max(0, Number(((p = S.system) == null ? void 0 : p.rating) ?? 0) || 0), E = Math.max(0, Number(((h = (f = S.system) == null ? void 0 : f.durability) == null ? void 0 : h.max) ?? 0) || 0), I = E > 0 ? E : w, N = Math.min(Math.max(0, Number(t) || 0), I);
      return this.updateEmbeddedDocuments("Item", [{
        _id: S.id,
        "system.durability.max": I,
        "system.durability.current": N
      }]);
    }
    const a = `system.monitors.${e}`, n = Number(foundry.utils.getProperty(this, `${a}.max`)) || 0, r = Math.max(0, n), o = Math.min(Math.max(0, Number(t) || 0), r), l = { [`${a}.value`]: o }, c = this.type, u = (g = ua == null ? void 0 : ua[c]) == null ? void 0 : g[e];
    if (u != null && u.derived)
      for (const [y, b] of Object.entries(u.derived)) {
        const S = Ea == null ? void 0 : Ea[b.fn];
        if (typeof S != "function") continue;
        const w = tp(this, e, b.source, o);
        l[`${a}.derived.${y}`] = S(w);
      }
    return this.update(l);
  }
  _prepareMonitors() {
    var r, o, l, c;
    const e = this.system.monitors ?? {}, t = ep(e);
    (r = this.system).derived ?? (r.derived = {}), this.system.derived.monitors = t;
    const i = Number(((o = t == null ? void 0 : t.physical) == null ? void 0 : o.penalty) ?? 0), a = Number(((l = t == null ? void 0 : t.fatigue) == null ? void 0 : l.penalty) ?? 0), n = i + a;
    (c = this.system.derived).condition ?? (c.condition = {}), this.system.derived.condition.physicalPenalty = i, this.system.derived.condition.fatiguePenalty = a, this.system.derived.condition.totalPenalty = n, this.system.derived.conditionPenalty = n;
  }
  _preparePersonalCombatDerived() {
    var r, o, l, c, u, d;
    if (!this.isCharacterLike()) return;
    const e = this.getPersonalCombatLoadout({ refresh: !0 }), t = (o = (r = this.system) == null ? void 0 : r.monitors) == null ? void 0 : o.armor;
    if (!t) return;
    const i = e.activeArmor, a = Math.max(0, Number(((l = i == null ? void 0 : i.durability) == null ? void 0 : l.max) ?? 0)), n = Math.max(0, Number((i == null ? void 0 : i.remainingDurability) ?? ((c = i == null ? void 0 : i.durability) == null ? void 0 : c.current) ?? 0));
    t.max = a, t.value = Math.min(a, n), t.resistance = {
      default: Number((i == null ? void 0 : i.baseMitigation) ?? (i == null ? void 0 : i.baseResistance) ?? 0),
      byType: {}
    }, t.resistanceBonusByType = i != null && i.isDestroyed ? {} : (i == null ? void 0 : i.mitigationByType) ?? (i == null ? void 0 : i.typedMitigation) ?? {}, t.derived ?? (t.derived = {}), t.derived.resistance = Number((i == null ? void 0 : i.baseMitigation) ?? (i == null ? void 0 : i.baseResistance) ?? 0), t.effect = i != null && i.isDestroyed ? "Destroyed" : i ? ip(i.mitigationByType ?? i.typedMitigation) : "", (u = this.system).derived ?? (u.derived = {}), this.system.derived.personalCombat = {
      defaultWeaponId: ((d = e.defaultWeapon) == null ? void 0 : d.id) ?? null,
      activeArmorId: (i == null ? void 0 : i.id) ?? null,
      warnings: [...e.warnings ?? []]
    };
  }
}
async function ap({ actor: s, payload: e } = {}) {
  var g, y, b, S, w, E;
  if (!s) throw new Error("resolveSkill requires actor");
  const t = String((e == null ? void 0 : e.key) ?? "").trim(), i = lt(t);
  if (!i) throw new Error(`Unknown skill: ${t}`);
  const a = s.system ?? {}, n = String((e == null ? void 0 : e.attrKey) ?? i.attribute ?? "").trim();
  if (!n) throw new Error(`Skill ${t} missing attribute key`);
  const r = Number(((y = (g = a == null ? void 0 : a.attributes) == null ? void 0 : g[n]) == null ? void 0 : y.value) ?? 0), o = Number(((S = (b = a == null ? void 0 : a.skills) == null ? void 0 : b[t]) == null ? void 0 : S.rating) ?? 0), l = Number(((E = (w = a == null ? void 0 : a.skills) == null ? void 0 : w[t]) == null ? void 0 : E.bonus) ?? 0), c = new Set(Js(a, t)), u = Nn(t, e == null ? void 0 : e.specializationKey), d = u && c.has(u.key) ? u : null, m = d ? En : 0, p = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : i.domains ?? [], f = Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : Number.isFinite(Number(e == null ? void 0 : e.target)) ? Number(e.target) : 5, h = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1;
  return {
    intent: "skill",
    rollType: "simple",
    title: `${i.label} (${n})`,
    subtitle: s.name ?? "Actor",
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
const np = /* @__PURE__ */ new Set([
  "grit",
  "chaos",
  "insight",
  "rumor",
  "legend",
  "credibility"
]), rp = {
  grit: "physical",
  chaos: "physical",
  insight: "mental",
  rumor: "mental",
  legend: "social",
  credibility: "social"
};
async function op({ actor: s, payload: e } = {}) {
  if (!s) throw new Error("resolveEdge requires actor");
  const t = String((e == null ? void 0 : e.pool) ?? "").trim();
  if (!np.has(t)) throw new Error(`Invalid edge pool: ${t}`);
  const i = s.getEdgePool(t), a = Math.max(0, Number((i == null ? void 0 : i.effectiveValue) ?? 0));
  return {
    intent: "edge",
    title: `Edge — ${t}`,
    subtitle: s.name ?? "Actor",
    domains: [rp[t] ?? "unknown"],
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
async function lp({ actor: s, payload: e, event: t } = {}) {
  return {
    title: "Attribute",
    intent: "attribute",
    domainTags: ["general"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function cp({ actor: s, payload: e } = {}) {
  if (!s) throw new Error("resolveCommon requires actor");
  const t = String((e == null ? void 0 : e.id) ?? "").trim();
  if (!t) throw new Error("Common rolls require payload.id");
  const i = Dn(t);
  if (!i) throw new Error(`Unknown common check: ${t}`);
  const a = Array.isArray(i.formula) ? i.formula : [];
  if (a.length !== 2)
    throw new Error(`Common check ${t} must define exactly two attributes.`);
  const n = a.map((c) => {
    var d, m, p;
    const u = Zc(c);
    if (!u) throw new Error(`Common check ${t} uses unsupported attribute code: ${c}`);
    return {
      code: String(c).trim().toUpperCase(),
      key: u,
      label: eu(c),
      value: Number(((p = (m = (d = s.system) == null ? void 0 : d.attributes) == null ? void 0 : m[u]) == null ? void 0 : p.value) ?? 0)
    };
  }), r = n.reduce((c, u) => c + Number(u.value ?? 0), 0), o = Array.isArray(i.tags) ? [...i.tags] : [], l = Array.isArray(i.domains) ? [...i.domains] : [];
  return {
    intent: "common",
    rollType: "simple",
    title: String(i.label ?? t).trim() || t,
    subtitle: s.name ?? "Actor",
    domains: l,
    tags: o,
    formula: tu(a),
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
      formulaCodes: a,
      tags: o,
      attributes: n
    }
  };
}
const na = 90;
function xr(s) {
  const e = canvas.app.view.getBoundingClientRect(), t = new PIXI.Point(
    Number(s.clientX ?? 0) - e.left,
    Number(s.clientY ?? 0) - e.top
  );
  return canvas.stage.worldTransform.applyInverse(t);
}
function ra() {
  var s, e, t;
  return Number(((e = (s = canvas.scene) == null ? void 0 : s.grid) == null ? void 0 : e.distance) ?? ((t = canvas.dimensions) == null ? void 0 : t.distance) ?? 1) || 1;
}
function ns() {
  var s, e;
  return Number(((s = canvas.grid) == null ? void 0 : s.size) ?? ((e = canvas.dimensions) == null ? void 0 : e.size) ?? 100) || 100;
}
function Br(s = 0) {
  return (Number(s ?? 0) || 0) * (ns() / ra());
}
function wl(s = {}) {
  return Math.max(0, Number((s == null ? void 0 : s.size) ?? 0) || 0) * ra();
}
function up(s) {
  let e = Number(s ?? 0) || 0;
  for (; e <= -180; ) e += 360;
  for (; e > 180; ) e -= 360;
  return e;
}
function bn(s) {
  return (Number(s ?? 0) || 0) * (180 / Math.PI);
}
function dp(s) {
  return (Number(s ?? 0) || 0) * (Math.PI / 180);
}
function Fr(s, e) {
  const t = Number((e == null ? void 0 : e.x) ?? 0) - Number((s == null ? void 0 : s.x) ?? 0), i = Number((e == null ? void 0 : e.y) ?? 0) - Number((s == null ? void 0 : s.y) ?? 0);
  return t === 0 && i === 0 ? 0 : bn(Math.atan2(i, t));
}
function Tl(s) {
  var t, i, a, n;
  return ((i = (t = canvas.tokens) == null ? void 0 : t.controlled) == null ? void 0 : i.find((r) => {
    var o;
    return ((o = r.actor) == null ? void 0 : o.id) === (s == null ? void 0 : s.id);
  })) ?? null ?? ((n = (a = s == null ? void 0 : s.getActiveTokens) == null ? void 0 : a.call(s, !0, !0)) == null ? void 0 : n[0]) ?? null;
}
function kl(s) {
  var r, o, l, c, u;
  const e = (s == null ? void 0 : s.center) ?? ((r = s == null ? void 0 : s.object) == null ? void 0 : r.center);
  if (e) return { x: Number(e.x ?? 0), y: Number(e.y ?? 0) };
  const t = Number((s == null ? void 0 : s.x) ?? ((o = s == null ? void 0 : s.document) == null ? void 0 : o.x) ?? 0), i = Number((s == null ? void 0 : s.y) ?? ((l = s == null ? void 0 : s.document) == null ? void 0 : l.y) ?? 0), a = Number((s == null ? void 0 : s.w) ?? (s == null ? void 0 : s.width) ?? ((c = s == null ? void 0 : s.document) == null ? void 0 : c.width) ?? 1) * ns(), n = Number((s == null ? void 0 : s.h) ?? (s == null ? void 0 : s.height) ?? ((u = s == null ? void 0 : s.document) == null ? void 0 : u.height) ?? 1) * ns();
  return { x: t + a / 2, y: i + n / 2 };
}
function mp(s) {
  var i, a, n, r;
  const e = Number((s == null ? void 0 : s.w) ?? ((i = s == null ? void 0 : s.object) == null ? void 0 : i.w) ?? 0) || Number(((a = s == null ? void 0 : s.document) == null ? void 0 : a.width) ?? 1) * ns(), t = Number((s == null ? void 0 : s.h) ?? ((n = s == null ? void 0 : s.object) == null ? void 0 : n.h) ?? 0) || Number(((r = s == null ? void 0 : s.document) == null ? void 0 : r.height) ?? 1) * ns();
  return Math.max(e, t) / 2;
}
function pp(s = {}, e = { x: 0, y: 0 }, t = 0) {
  var a, n;
  const i = {
    user: ((a = game.user) == null ? void 0 : a.id) ?? null,
    x: Number((e == null ? void 0 : e.x) ?? 0) || 0,
    y: Number((e == null ? void 0 : e.y) ?? 0) || 0,
    direction: Number(t ?? 0) || 0,
    distance: wl(s),
    fillColor: ((n = game.user) == null ? void 0 : n.color) ?? "#ff6400"
  };
  switch (s == null ? void 0 : s.shape) {
    case "blast":
      return { ...i, t: "circle" };
    case "cone":
      return { ...i, t: "cone", angle: na };
    case "line":
      return { ...i, t: "ray", width: ra() };
    default:
      return i;
  }
}
function fp({ anchor: s, radiusPx: e, tokenCenter: t, tokenRadius: i }) {
  const a = t.x - s.x, n = t.y - s.y;
  return Math.hypot(a, n) <= e + i;
}
function hp({ anchor: s, distancePx: e, widthPx: t, direction: i, tokenCenter: a, tokenRadius: n }) {
  const r = a.x - s.x, o = a.y - s.y, l = dp(i), c = Math.cos(l), u = Math.sin(l), d = r * c + o * u;
  if (d < -n || d > e + n) return !1;
  const m = s.x + Math.max(0, Math.min(e, d)) * c, p = s.y + Math.max(0, Math.min(e, d)) * u;
  return Math.hypot(a.x - m, a.y - p) <= n + t / 2;
}
function gp({ anchor: s, distancePx: e, direction: t, angle: i, tokenCenter: a, tokenRadius: n }) {
  const r = a.x - s.x, o = a.y - s.y, l = Math.hypot(r, o);
  if (l > e + n) return !1;
  if (l === 0) return !0;
  const c = bn(Math.atan2(o, r)), u = Math.abs(up(c - t)), d = Number(i ?? na) / 2, m = bn(Math.asin(Math.min(1, n / Math.max(l, 1))));
  return u <= d + m;
}
function yp({ template: s, placement: e, token: t }) {
  const i = kl(t), a = mp(t), n = Br(e.distance);
  switch (s == null ? void 0 : s.shape) {
    case "blast":
      return fp({
        anchor: e.anchor,
        radiusPx: n,
        tokenCenter: i,
        tokenRadius: a
      });
    case "line":
      return hp({
        anchor: e.anchor,
        distancePx: n,
        widthPx: Br(ra()),
        direction: e.direction,
        tokenCenter: i,
        tokenRadius: a
      });
    case "cone":
      return gp({
        anchor: e.anchor,
        distancePx: n,
        direction: e.direction,
        angle: e.angle ?? na,
        tokenCenter: i,
        tokenRadius: a
      });
    default:
      return !1;
  }
}
function bp(s = {}) {
  var e, t, i, a, n, r, o;
  s.object && ((i = (t = (e = canvas.templates) == null ? void 0 : e.preview) == null ? void 0 : t.removeChild) == null || i.call(t, s.object), (n = (a = s.object).destroy) == null || n.call(a, { children: !0 })), (o = (r = canvas.templates) == null ? void 0 : r.clearPreviewContainer) == null || o.call(r);
}
async function Sp(s = {}, e = {}, t = { x: 0, y: 0 }, i = 0) {
  var n, r, o, l;
  const a = pp(e, t, i);
  if (!s.object) {
    const c = CONFIG.MeasuredTemplate.documentClass, u = CONFIG.MeasuredTemplate.objectClass, d = new c(a, { parent: canvas.scene }), m = new u(d);
    s.object = m, await m.draw(), canvas.templates.preview.addChild(m);
    return;
  }
  s.object.document.updateSource(a), (r = (n = s.object.renderFlags) == null ? void 0 : n.set) == null || r.call(n, { refreshState: !0, refreshShape: !0, refreshGrid: !0 }), (l = (o = s.object).refresh) == null || l.call(o);
}
function Ap({ template: s, anchor: e, direction: t }) {
  return {
    shape: s.shape,
    placement: s.placement,
    size: Number(s.size ?? 0) || 0,
    distance: wl(s),
    angle: s.shape === "cone" ? na : void 0,
    anchor: {
      x: Number((e == null ? void 0 : e.x) ?? 0) || 0,
      y: Number((e == null ? void 0 : e.y) ?? 0) || 0
    },
    direction: Number(t ?? 0) || 0
  };
}
function Ml(s) {
  var a, n, r, o, l, c, u, d, m, p;
  const e = (s == null ? void 0 : s.actor) ?? null;
  if (!e) return null;
  const t = ((a = e == null ? void 0 : e.getPersonalCombatLoadout) == null ? void 0 : a.call(e)) ?? null, i = (t == null ? void 0 : t.activeArmor) ?? null;
  return {
    tokenId: (s == null ? void 0 : s.id) ?? null,
    tokenUuid: ((n = s == null ? void 0 : s.document) == null ? void 0 : n.uuid) ?? null,
    actorId: e.id,
    actorUuid: e.uuid,
    name: e.name ?? (s == null ? void 0 : s.name) ?? "Target",
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
function wp({ template: s, placement: e, attacker: t } = {}) {
  var n;
  const i = Tl(t), a = (i == null ? void 0 : i.id) ?? null;
  return (((n = canvas.tokens) == null ? void 0 : n.placeables) ?? []).filter((r) => r == null ? void 0 : r.actor).filter((r) => r.id !== a || (s == null ? void 0 : s.placement) === "origin").filter((r) => yp({ template: s, placement: e, token: r })).map(Ml).filter(Boolean);
}
async function Tp({ actor: s, attack: e } = {}) {
  var f;
  if (!(canvas != null && canvas.scene) || !((f = canvas == null ? void 0 : canvas.templates) != null && f.preview))
    throw Pi("Templated attacks require an active scene canvas.", { severity: "warn" });
  const t = (e == null ? void 0 : e.template) ?? null;
  if (!(t != null && t.shape) || !(Number(t == null ? void 0 : t.size) > 0))
    throw Pi("Templated attack is missing valid template configuration.", { severity: "warn" });
  if (!Ql.includes(t.shape))
    throw Pi(`Template shape "${t.shape}" is normalized but not supported in v1.`, { severity: "warn" });
  const i = Tl(s);
  if (t.placement === "origin" && !i)
    throw Pi("Origin-placed templated attacks require the attacker to have a token on the current scene.", { severity: "warn" });
  const a = {}, n = {
    phase: t.placement === "origin" ? "direction" : "anchor",
    anchor: t.placement === "origin" ? kl(i) : null,
    direction: 0
  }, r = async (h, g = null, y = null) => {
    if (window.removeEventListener("keydown", m, !0), canvas.app.view.removeEventListener("pointermove", u), canvas.app.view.removeEventListener("click", p, !0), canvas.app.view.removeEventListener("contextmenu", d, !0), bp(a), y) {
      h(Promise.reject(y));
      return;
    }
    h(g);
  }, o = async (h = null) => {
    !n.anchor && h && (n.anchor = { x: h.x, y: h.y }), n.anchor && (t.shape !== "blast" && h && (n.direction = Fr(n.anchor, h)), await Sp(a, t, n.anchor, n.direction));
  };
  let l = null;
  const c = new Promise((h) => {
    l = h;
  }), u = (h) => {
    const g = xr(h);
    o(g);
  }, d = (h) => {
    h.preventDefault(), r(l, null);
  }, m = (h) => {
    h.key === "Escape" && (h.preventDefault(), r(l, null));
  }, p = (h) => {
    h.preventDefault(), h.stopPropagation();
    const g = xr(h);
    if (n.anchor || (n.anchor = { x: g.x, y: g.y }), n.phase === "anchor" && t.shape !== "blast") {
      n.phase = "direction", o(g);
      return;
    }
    t.shape !== "blast" && (n.direction = Fr(n.anchor, g));
    const y = Ap({
      template: t,
      anchor: n.anchor,
      direction: n.direction
    }), b = wp({ template: t, placement: y, attacker: s });
    r(l, { placement: y, targetSnapshots: b });
  };
  return window.addEventListener("keydown", m, !0), canvas.app.view.addEventListener("pointermove", u), canvas.app.view.addEventListener("click", p, !0), canvas.app.view.addEventListener("contextmenu", d, !0), n.anchor && await o(n.anchor), c;
}
function kp(s = {}) {
  var e;
  return Array.isArray(s == null ? void 0 : s.targetSnapshots) ? s.targetSnapshots : Array.from(((e = game.user) == null ? void 0 : e.targets) ?? []).map(Ml).filter(Boolean);
}
function Mp(s, e) {
  var i, a, n, r, o, l, c;
  if (((i = e == null ? void 0 : e.syntheticWeapon) == null ? void 0 : i.id) === "unarmed") {
    const u = ot.buildDefaultUnarmedProfile(s);
    return {
      ...u,
      ...e.syntheticWeapon,
      damage: u.damage,
      attackRatingBand: {
        ...((a = e.syntheticWeapon) == null ? void 0 : a.attackRatingBand) ?? u.attackRatingBand,
        close: u.attackRatingBand.close
      },
      isSynthetic: !0,
      defaultRangeBand: "close"
    };
  }
  const t = ((r = (n = s.items) == null ? void 0 : n.get) == null ? void 0 : r.call(n, (e == null ? void 0 : e.weaponId) ?? "")) ?? null;
  if (!t || !(((o = t.isPersonalWeapon) == null ? void 0 : o.call(t)) ?? t.type === "personalWeapon") || !((l = t.system) != null && l.equipped))
    throw new Error("Attack requires an equipped personal weapon.");
  return ((c = t.getCombatProfile) == null ? void 0 : c.call(t, { payloadId: e == null ? void 0 : e.payloadId })) ?? null;
}
async function vp({ actor: s, payload: e } = {}) {
  var w, E, I, N, L, Y, Q, G, H, D, V, ee, X, te, ce, Se, O;
  if (!s) throw new Error("resolveAttack requires actor");
  const t = Mp(s, e);
  if (!t) throw new Error("Unable to resolve weapon profile.");
  if (Array.isArray((w = t == null ? void 0 : t.capabilityReport) == null ? void 0 : w.errors) && t.capabilityReport.errors.length > 0)
    throw Pi(
      ((E = t.capabilityReport.errors[0]) == null ? void 0 : E.message) ?? "Weapon capability data is invalid for this attack.",
      { severity: "warn" }
    );
  const i = lt(t.skill) ?? {
    code: t.skill,
    label: t.skill || "Attack",
    attribute: "reflexes",
    domains: ["physical"]
  }, a = String(i.attribute ?? "reflexes").trim() || "reflexes", n = ((I = s.getAttributeValue) == null ? void 0 : I.call(s, a)) ?? Number(((Y = (L = (N = s.system) == null ? void 0 : N.attributes) == null ? void 0 : L[a]) == null ? void 0 : Y.value) ?? 0), r = ((Q = s.getSkillRating) == null ? void 0 : Q.call(s, t.skill)) ?? Number(((D = (H = (G = s.system) == null ? void 0 : G.skills) == null ? void 0 : H[t.skill]) == null ? void 0 : D.rating) ?? 0), o = Number(((X = (ee = (V = s.system) == null ? void 0 : V.skills) == null ? void 0 : ee[t.skill]) == null ? void 0 : X.bonus) ?? 0), l = new Set(Js(s.system ?? {}, t.skill)), c = Nn(t.skill, e == null ? void 0 : e.specializationKey), u = c && l.has(c.key) ? c : null, d = u ? En : 0, m = Number(((te = t == null ? void 0 : t.effects) == null ? void 0 : te.accuracyMod) ?? 0) || 0, p = o + m, f = String((e == null ? void 0 : e.rangeBand) ?? t.defaultRangeBand ?? "close").trim() || "close", h = Number(((ce = t == null ? void 0 : t.attackRatingBand) == null ? void 0 : ce[f]) ?? 0) || 0, g = kp(e);
  if (!!!((Se = t == null ? void 0 : t.capabilityReport) != null && Se.isTemplated) && g.length === 0)
    throw Pi("Target at least one token to attack.", { severity: "warn" });
  const b = Number(t.ap ?? 0) + Number(((O = t == null ? void 0 : t.effects) == null ? void 0 : O.ap) ?? 0), S = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1;
  return {
    intent: "attack",
    rollType: "simple",
    title: `${t.name} Attack`,
    subtitle: s.name ?? "Actor",
    domains: Array.isArray(i.domains) && i.domains.length ? i.domains : ["physical"],
    domainTags: ["combat", "attack"],
    diceTarget: Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : 5,
    difficulty: { dn: S },
    dn: {
      parts: [{
        id: "difficulty.current",
        label: "DN",
        value: S,
        tags: ["manual"]
      }],
      total: S
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
async function Ep({ actor: s, payload: e, event: t } = {}) {
  return {
    title: "Defense",
    intent: "defense",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function Cp({ actor: s, payload: e, event: t } = {}) {
  return {
    title: "Resistance",
    intent: "resistance",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function Pp({ actor: s } = {}) {
  var i, a, n, r, o, l;
  const e = Number(((n = (a = (i = s.system) == null ? void 0 : i.attributes) == null ? void 0 : a.reflexes) == null ? void 0 : n.value) ?? 0), t = Number(((l = (o = (r = s.system) == null ? void 0 : r.attributes) == null ? void 0 : o.edge) == null ? void 0 : l.value) ?? 0);
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
async function Np({ actor: s }) {
  var i, a, n, r, o;
  const e = Number(((a = (i = s.system) == null ? void 0 : i.burn) == null ? void 0 : a.value) ?? 0);
  e < 6 && ui.notifications.warn("Overload check is only required at Burn 6+.");
  const t = Number(((o = (r = (n = s.system) == null ? void 0 : n.attributes) == null ? void 0 : r.willpower) == null ? void 0 : o.value) ?? 0);
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
const Rp = {
  skill: ap,
  edge: op,
  attribute: lp,
  common: cp,
  attack: vp,
  defense: Ep,
  resistance: Cp,
  initiative: Pp,
  overload: Np
};
async function Ca({ actor: s, payload: e, event: t } = {}) {
  if (!s) throw new Error("resolveIntent requires actor");
  const i = String((e == null ? void 0 : e.intent) ?? "").trim();
  if (!i) throw new Error("resolveIntent requires payload.intent");
  const a = Rp[i];
  if (!a) throw new Error(`Unsupported roll intent: ${i}`);
  const n = await a({ actor: s, payload: e, event: t });
  return Dp(n, { intent: i });
}
function Dp(s, { intent: e } = {}) {
  (!s || typeof s != "object") && (s = {}), s.intent = s.intent ?? e ?? "unknown", s.title = String(s.title ?? "Roll"), s.domains = Array.isArray(s.domains) ? s.domains : [], s.breakdown = Array.isArray(s.breakdown) ? s.breakdown : [], s.mods = Array.isArray(s.mods) ? s.mods : [];
  const t = s.pool && typeof s.pool == "object" ? s.pool : {}, i = Number(t.attribute ?? t.base ?? 0), a = Number(t.skill ?? t.rating ?? 0), n = Number(t.bonus ?? 0), r = Number(t.specialization ?? 0);
  if (![i, a, n, r].every(Number.isFinite))
    throw console.error("MWD | Invalid pool parts after intent resolution", { intent: e, ctx: s }), new Error("MWD.roll: pool parts must be numeric (attribute/skill/bonus/specialization).");
  return s.pool = {
    attribute: i,
    skill: a,
    bonus: n,
    specialization: r,
    totalBase: i + a + n + r
  }, s.rollType = s.rollType ?? "simple", s.diceTarget = Number.isFinite(s.diceTarget) ? s.diceTarget : Number(s.target ?? 5), s.difficulty && typeof s.difficulty == "object" ? s.difficulty.dn = Number(s.difficulty.dn ?? 0) : Number.isFinite(s.dn) && (s.difficulty = { dn: Number(s.dn) }), s.breakdown.length || (s.breakdown = [
    { id: "attribute", label: "Attribute", value: i },
    { id: "skill", label: "Skill", value: a },
    { id: "bonus", label: "Bonus", value: n },
    ...r ? [{ id: "specialization", label: "Specialization", value: r }] : []
  ]), s;
}
var Oi;
class Ip {
  constructor() {
    Te(this, Oi, /* @__PURE__ */ new Map());
  }
  register(e) {
    if (!(e != null && e.id) || typeof e.collect != "function")
      throw new Error("Invalid ModifierProvider: missing id or collect()");
    z(this, Oi).has(e.id) || z(this, Oi).set(e.id, e);
  }
  async collectAll(e) {
    const t = [];
    for (const i of z(this, Oi).values()) {
      const a = await i.collect(e);
      if (console.log("MWD | provider", i.id, "returned", a), !!(a != null && a.length))
        for (const n of a)
          n && typeof n.label == "string" && typeof n.value == "number" && typeof n.source == "string" ? t.push(n) : console.warn("MWD | DROPPED MOD (bad shape)", i.id, n);
    }
    return t;
  }
}
Oi = new WeakMap();
const Tt = new Ip();
function Op(s) {
  if (s == null || s === "" || s === "—" || s === "–") return 0;
  const e = Number(s);
  return Number.isFinite(e) ? e : null;
}
function _p(s) {
  const e = Op(s == null ? void 0 : s.value);
  return e === null ? null : { ...s, value: e };
}
async function zr({
  actor: s,
  rollType: e,
  skillId: t,
  domains: i,
  // NEW (optional)
  payload: a,
  resolved: n,
  context: r
} = {}) {
  const o = { actor: s, rollType: e, skillId: t, domains: i, payload: a, resolved: n, context: r }, l = await Tt.collectAll(o);
  console.log("MWD|condition collect called", o.rollType);
  let c = [];
  for (const d of l ?? []) {
    const m = _p(d);
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
function Lp({
  actor: s,
  payload: e,
  ctx: t,
  roll: i,
  target: a,
  pool: n,
  mods: r = [],
  modTotal: o = 0,
  hits: l = null,
  ones: c = null,
  edge: u = null,
  outcomeModel: d = null
} = {}) {
  var Y, Q, G, H;
  if (!s) throw new Error("buildResolved requires actor");
  if (!(e != null && e.intent)) throw new Error("buildResolved requires payload.intent");
  if (!i) throw new Error("buildResolved requires roll");
  const m = foundry.utils.randomID(), p = (Y = i.dice) == null ? void 0 : Y[0], h = (Array.isArray(p == null ? void 0 : p.results) ? p.results : []).map((D, V) => {
    const ee = `pool:${V}`, X = Number(D.result), te = !!D.success;
    return {
      ref: ee,
      face: X,
      isSuccess: te,
      isFailure: !te,
      tooltip: te ? `Die ${V + 1}: ${X} (Success vs TN ${Number(a ?? 5)})` : `Die ${V + 1}: ${X} (Failure vs TN ${Number(a ?? 5)})`
    };
  }), g = h.filter((D) => D.isFailure).map((D) => D.ref), y = [{
    id: "pool",
    label: "Pool",
    faces: 6,
    termIndex: 0,
    // informational only
    dice: h
  }], b = (Array.isArray(r) ? r : []).map((D, V) => {
    const ee = Number(D.value ?? 0), X = `mod:${xp(D.label ?? "mod")}:${V}`;
    return {
      id: D.id ?? X,
      label: D.label ?? "Modifier",
      value: ee,
      domain: D.domain ?? null,
      source: D.source ?? null,
      tooltip: D.tooltip ?? `${D.label ?? "Modifier"} ${Ur(ee)}`
    };
  }), S = b.map((D) => D.id), E = (Array.isArray(t == null ? void 0 : t.breakdown) ? t.breakdown : []).map((D) => ({
    id: `pool.${D.id ?? foundry.utils.randomID()}`,
    label: D.label ?? D.id ?? "Row",
    value: Number(D.value ?? 0),
    tooltip: `Contribution from ${D.label ?? D.id}: ${Number(D.value ?? 0)}`
  }));
  E.push({
    id: "mods.total",
    label: "Mods",
    value: Number(o ?? 0),
    modIds: S,
    tooltip: b.length ? b.map((D) => `${D.label}: ${Ur(D.value)}`).join(`
`) : "No roll-time modifiers."
  }), E.push({
    id: "pool.final",
    label: "Final Pool",
    value: Number(n ?? 0),
    tooltip: `Final dice pool rolled: ${Number(n ?? 0)}d6`
  });
  const I = Number.isFinite(Number(l)) ? Number(l) : h.filter((D) => D.isSuccess).length, N = Number.isFinite(Number(c)) ? Number(c) : h.filter((D) => D.face === 1).length, L = $p(u, { payload: e });
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
        earn: ((H = t == null ? void 0 : t.edge) == null ? void 0 : H.earn) ?? null
      }
    },
    // Roll + dice
    roll: {
      json: i.toJSON(),
      formula: i.formula,
      target: Number(a ?? 5),
      pool: Number(n ?? 0),
      diceGroups: y,
      failureDiceRefs: g
    },
    // Outcome numbers
    outcome: {
      hits: I,
      ones: N
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
function $p(s, { payload: e } = {}) {
  var f, h, g, y, b, S, w, E, I, N, L, Y, Q, G;
  const t = !!((f = e == null ? void 0 : e.edge) != null && f.enabled), i = (s == null ? void 0 : s.domain) ?? null, a = (s == null ? void 0 : s.pools) ?? null, n = ((h = s == null ? void 0 : s.pre) == null ? void 0 : h.poolKey) ?? ((y = (g = e == null ? void 0 : e.edge) == null ? void 0 : g.pre) == null ? void 0 : y.poolKey) ?? (t ? ((b = e == null ? void 0 : e.edge) == null ? void 0 : b.poolKey) ?? null : null), r = Number(((S = s == null ? void 0 : s.pre) == null ? void 0 : S.spent) ?? ((E = (w = e == null ? void 0 : e.edge) == null ? void 0 : w.pre) == null ? void 0 : E.spent) ?? (t ? 1 : 0)) ? 1 : 0, o = ((I = s == null ? void 0 : s.post) == null ? void 0 : I.poolKey) ?? ((L = (N = e == null ? void 0 : e.edge) == null ? void 0 : N.post) == null ? void 0 : L.poolKey) ?? null, l = Number(((Y = s == null ? void 0 : s.post) == null ? void 0 : Y.spent) ?? ((G = (Q = e == null ? void 0 : e.edge) == null ? void 0 : Q.post) == null ? void 0 : G.spent) ?? 0) ? 1 : 0, c = (a == null ? void 0 : a.a) ?? null, u = (a == null ? void 0 : a.b) ?? null, d = [c, u].filter(Boolean);
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
    pools: a ? { a: c, b: u } : null,
    pre: { poolKey: n, spent: r },
    post: { poolKey: o, spent: l },
    allowed: {
      prePools: d,
      postPools: m
    },
    availableActions: p
  };
}
function Ur(s) {
  const e = Number(s ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function xp(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function Bp(s, e) {
  var c, u, d, m, p, f, h, g, y;
  const t = s ?? {}, i = Array.isArray((c = t == null ? void 0 : t.modifiers) == null ? void 0 : c.applied) ? t.modifiers.applied : [], a = Number(((u = t == null ? void 0 : t.modifiers) == null ? void 0 : u.total) ?? 0);
  if (i.length) {
    const b = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((S) => S.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${i.map((S) => `${S.label} ${Wr(S.value)}`).join(", ")} (Total ${Wr(a)})`,
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
function Wr(s) {
  const e = Number(s ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function Fp(s, e) {
  var h, g, y, b, S, w, E, I, N, L, Y, Q, G, H, D, V, ee, X, te, ce, Se;
  const t = s ?? {}, i = (t == null ? void 0 : t.attackResult) ?? null;
  if (!i) return;
  const a = Array.isArray(i == null ? void 0 : i.results) ? i.results : [], n = (i == null ? void 0 : i.summary) ?? Up(a), r = a.some((O) => {
    var F;
    return !!((F = O == null ? void 0 : O.queuedMutation) != null && F.applied);
  }), o = a.filter(
    (O) => (O == null ? void 0 : O.queuedMutation) && !O.queuedMutation.applied
  ), l = Array.isArray((h = t == null ? void 0 : t.modifiers) == null ? void 0 : h.applied) ? t.modifiers.applied : [], c = Number(((g = t == null ? void 0 : t.modifiers) == null ? void 0 : g.total) ?? 0);
  if (l.length) {
    const O = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((F) => F.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${l.map((F) => `${F.label} ${Ni(F.value)}`).join(", ")} (Total ${Ni(c)})`,
      title: (O == null ? void 0 : O.tooltip) ?? ""
    });
  }
  const u = (t == null ? void 0 : t.edge) ?? null, d = Array.isArray((y = t == null ? void 0 : t.roll) == null ? void 0 : y.failureDiceRefs) ? t.roll.failureDiceRefs : [], m = !!((b = u == null ? void 0 : u.availableActions) != null && b.canPostRerollFailures) && !r, p = Array.isArray((S = u == null ? void 0 : u.allowed) == null ? void 0 : S.postPools) ? u.allowed.postPools : [];
  if (u != null && u.domain && (e.edge = {
    domain: u.domain,
    earned: ((w = t == null ? void 0 : t.outcomeModel) == null ? void 0 : w.edgeEarned) ?? null,
    preSpent: Number(((E = u == null ? void 0 : u.pre) == null ? void 0 : E.spent) ?? 0),
    postSpent: Number(((I = u == null ? void 0 : u.post) == null ? void 0 : I.spent) ?? 0),
    canPost: m && d.length > 0 && p.length > 0,
    failureCount: d.length,
    postPools: p
  }, e.metaRows.push({
    text: `Edge: ${u.domain} | pre ${e.edge.preSpent} | post ${e.edge.postSpent}`,
    title: ""
  })), (N = e.edge) != null && N.canPost) {
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
  e.outcomeText = a.length > 1 ? `ATTACK ${n.hits} HIT / ${n.grazes} GRAZE / ${n.misses} MISS` : f === "hit" ? "HIT!" : f === "graze" ? "GRAZE!" : "MISS!", e.metaRows.push({
    text: `Targets: ${a.length || 0}`,
    title: ""
  }), a.length > 1 && o.length > 1 && e.actions.push({
    action: "applyAllAttackDamage",
    label: `Apply All Damage (${o.length})`,
    cssClass: "mwd-apply-all-attack-damage"
  });
  for (const O of a) {
    const F = Number(((Y = (L = O == null ? void 0 : O.cq) == null ? void 0 : L.ar) == null ? void 0 : Y.total) ?? 0), _e = Number(((G = (Q = O == null ? void 0 : O.cq) == null ? void 0 : Q.dr) == null ? void 0 : G.total) ?? 0);
    e.metaRows.push({
      text: `${((H = O == null ? void 0 : O.target) == null ? void 0 : H.name) ?? "Target"}: ${String((O == null ? void 0 : O.outcome) ?? "miss").toUpperCase()} | CQ ${Ni(((D = O == null ? void 0 : O.cq) == null ? void 0 : D.value) ?? 0)} (AR ${F} - DR ${_e}) | Net ${Number((O == null ? void 0 : O.netHits) ?? 0)}`,
      title: zp(O == null ? void 0 : O.cq)
    });
  }
  for (const [O, F] of a.entries()) {
    const _e = (F == null ? void 0 : F.damage) ?? null;
    _e && (F == null ? void 0 : F.outcome) !== "miss" && e.footerRows.push({
      text: `${((V = F == null ? void 0 : F.target) == null ? void 0 : V.name) ?? "Target"}: ${_e.damageTypeLabel} ${Ni(_e.effectiveWeaponDamage)} weapon${_e.netHits ? ` + ${_e.netHits} net` : ""}`,
      title: ""
    });
    const J = (F == null ? void 0 : F.damageResult) ?? null;
    if (J != null && J.ok && !(J != null && J.skipped)) {
      const Ke = (F == null ? void 0 : F.queuedMutation) ?? (J == null ? void 0 : J.queuedMutation) ?? null, et = !!(Ke != null && Ke.applied || J != null && J.applied);
      e.footerRows.push({
        text: `${J.actorName ?? ((ee = F == null ? void 0 : F.target) == null ? void 0 : ee.name) ?? "Target"}: ${et ? "Applied" : "Queued"} ${Number(J.finalDamage ?? J.appliedDelta ?? 0)}`,
        title: ""
      }), J.beforeLabel && J.afterLabel && e.footerRows.push({
        text: `${J.actorName ?? ((X = F == null ? void 0 : F.target) == null ? void 0 : X.name) ?? "Target"} Track: ${J.beforeLabel} -> ${J.afterLabel}`,
        title: ""
      }), J.usedArmor && J.mitigation && e.footerRows.push({
        text: `${J.actorName ?? ((te = F == null ? void 0 : F.target) == null ? void 0 : te.name) ?? "Target"} Mitigation: ${Number(J.mitigation.baseMitigation ?? 0)} + ${Number(J.mitigation.typeMitigationMod ?? 0)} - ${Number(J.effectiveAp ?? 0)} = ${Number(J.mitigation.netResistance ?? 0)}`,
        title: ""
      }), Ke && !et && e.actions.push({
        action: "applyAttackDamage",
        label: `Apply Damage: ${J.actorName ?? ((ce = F == null ? void 0 : F.target) == null ? void 0 : ce.name) ?? "Target"}`,
        dataset: { "result-index": String(O) },
        cssClass: "mwd-apply-attack-damage"
      });
    } else J != null && J.reason && e.footerRows.push({
      text: `${((Se = F == null ? void 0 : F.target) == null ? void 0 : Se.name) ?? "Target"}: ${J.reason}`,
      title: ""
    });
  }
}
function zp(s = {}) {
  var i, a;
  const e = Array.isArray((i = s == null ? void 0 : s.ar) == null ? void 0 : i.parts) ? s.ar.parts : [], t = Array.isArray((a = s == null ? void 0 : s.dr) == null ? void 0 : a.parts) ? s.dr.parts : [];
  return [
    ...e.map((n) => `AR - ${n.label}: ${Ni(n.value)}`),
    ...t.map((n) => `DR - ${n.label}: ${Ni(n.value)}`)
  ].join(`
`);
}
function Up(s = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of s)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
function Ni(s) {
  const e = Number(s ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function Wp(s, e) {
  var c;
  const t = s ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, a = (i == null ? void 0 : i.net) ?? null;
  if (!a) return;
  e.net = a;
  const n = Number((a == null ? void 0 : a.converted) ?? 0), r = Number((a == null ? void 0 : a.value) ?? 0), o = Number((a == null ? void 0 : a.rate) ?? 4);
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
function Hp(s, e) {
  var l, c, u, d;
  const t = s ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, a = Number(((l = i == null ? void 0 : i.attacker) == null ? void 0 : l.successes) ?? (i == null ? void 0 : i.attackerHits) ?? NaN), n = Number(((c = i == null ? void 0 : i.defender) == null ? void 0 : c.successes) ?? (i == null ? void 0 : i.defenderHits) ?? NaN), r = Number((i == null ? void 0 : i.netHits) ?? (i == null ? void 0 : i.net) ?? NaN);
  Number.isFinite(a) && Number.isFinite(n) && e.metaRows.push({ text: `Opposed: Att ${a} vs Def ${n} • Net ${Number.isFinite(r) ? r : a - n}` }), (u = t == null ? void 0 : t.incoming) != null && u.label && (e.incoming = { label: t.incoming.label, value: t.incoming.value ?? "" }, e.footerRows.push({ text: `Incoming: ${e.incoming.label} ${e.incoming.value}` }));
  const o = ((d = i == null ? void 0 : i.edgeEarned) == null ? void 0 : d.amount) > 0 ? i.edgeEarned : null;
  o && e.footerRows.push({ text: `Edge Earned: +${o.amount}${o.pool ? ` (${o.pool})` : ""}` });
}
function jp(s, e) {
  var c;
  const t = s ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, a = (i == null ? void 0 : i.extended) ?? null;
  if (!a) return;
  e.extended = a;
  const n = Number((a == null ? void 0 : a.progress) ?? 0), r = Number((a == null ? void 0 : a.target) ?? 0), o = Number((a == null ? void 0 : a.remaining) ?? Math.max(0, r - n));
  e.metaRows.push({
    text: `Extended: ${n}/${r} (Remaining ${o})`,
    title: ""
  }), a != null && a.completed && e.footerRows.push({ text: `Completed in ${Number((a == null ? void 0 : a.rounds) ?? (a == null ? void 0 : a.attempts) ?? 0) || "?"} attempts.` });
  const l = ((c = i == null ? void 0 : i.edgeEarned) == null ? void 0 : c.amount) > 0 ? i.edgeEarned : null;
  l && e.footerRows.push({ text: `Edge Earned: +${l.amount}${l.pool ? ` (${l.pool})` : ""}` });
}
const qp = {
  skill: Bp,
  attack: Fp,
  net: Wp,
  opposed: Hp,
  extended: jp
  // defense: enhanceDefense,
  // edge: enhanceEdge,
};
async function oa({ resolved: s } = {}) {
  const e = s ?? {}, t = Gp(e), i = qp[t.intent];
  return typeof i == "function" && i(e, t), await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-roll-card",
    t
  );
}
function Gp(s) {
  var p, f, h, g, y, b, S, w, E, I, N, L, Y, Q, G;
  const e = s ?? {}, t = Number(((p = e == null ? void 0 : e.roll) == null ? void 0 : p.target) ?? 5), i = Number(((f = e == null ? void 0 : e.dn) == null ? void 0 : f.total) ?? ((g = (h = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : h.dn) == null ? void 0 : g.total) ?? ((b = (y = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : y.difficulty) == null ? void 0 : b.dn) ?? 0), a = Number(((S = e == null ? void 0 : e.roll) == null ? void 0 : S.pool) ?? 0), n = Number(((w = e == null ? void 0 : e.outcome) == null ? void 0 : w.hits) ?? 0), r = (e == null ? void 0 : e.outcomeModel) ?? {}, o = typeof r.passed == "boolean" ? r.passed : n >= i, l = Number.isFinite(Number(r.margin)) ? Number(r.margin) : n - i, c = r.tier ?? null, u = Array.isArray(e == null ? void 0 : e.breakdownRows) ? e.breakdownRows.map((H) => `${H.label}: ${H.value}`).join(`
`) : "", d = {
    header: { left: (e == null ? void 0 : e.title) ?? "Roll", right: (e == null ? void 0 : e.subtitle) ?? "" },
    formula: String((e == null ? void 0 : e.formula) ?? "").trim(),
    intent: (e == null ? void 0 : e.intent) ?? "unknown",
    domains: Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [],
    tn: t,
    dn: i,
    pool: a,
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
  if ((E = e == null ? void 0 : e.specialization) != null && E.label && d.metaRows.push({
    text: `Specialization: ${e.specialization.label} (+${Number(e.specialization.value ?? 0)})`,
    title: ""
  }), (I = m == null ? void 0 : m.weapon) != null && I.name) {
    const H = String((m == null ? void 0 : m.rangeBand) ?? "").trim(), D = String(((N = m == null ? void 0 : m.weapon) == null ? void 0 : N.damageTypeLabel) ?? ((L = m == null ? void 0 : m.weapon) == null ? void 0 : L.damageType) ?? "").trim(), V = String(((Y = m == null ? void 0 : m.payload) == null ? void 0 : Y.label) ?? ((Q = m == null ? void 0 : m.weapon) == null ? void 0 : Q.payloadLabel) ?? "").trim();
    d.metaRows.push({
      text: `Weapon: ${m.weapon.name}${H ? ` • Range: ${H}` : ""}${D ? ` • Type: ${D}` : ""}${V ? ` • Payload: ${V}` : ""}`,
      title: ""
    }), (G = m == null ? void 0 : m.sourceState) != null && G.isTracked && d.footerRows.push({
      text: `Source: ${Number(m.sourceState.current ?? 0)}/${Number(m.sourceState.max ?? 0)}`,
      title: ""
    });
  }
  return d;
}
function Me(s, e = 0) {
  const t = Number(s);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
function Pa(s, e = 0, t = Number.POSITIVE_INFINITY) {
  const i = Me(s, e);
  return Math.max(e, Math.min(t, i));
}
function vl(s, e = 1) {
  var i;
  const t = Me((i = s == null ? void 0 : s.difficulty) == null ? void 0 : i.dn, Me(e, 1));
  return Math.max(0, t);
}
function Vp(s, e) {
  return Math.max(0, Me(s, 0) - Me(e, 0));
}
function Kp({ convert: s, remainder: e, rate: t = 4 } = {}) {
  const i = Math.max(0, Me(e, 0)), a = Math.max(1, Me(t, 4)), n = Math.max(0, Me(s, 0)), r = Math.floor(n / a) * a;
  return Math.min(i, r);
}
function Wn(s, { rate: e = 4, maxPerRoll: t = Number.POSITIVE_INFINITY } = {}) {
  const i = Math.max(1, Me(e, 4)), a = Math.floor(Math.max(0, Me(s, 0)) / i), n = Number.isFinite(t) ? Math.max(0, Me(t, 0)) : Number.POSITIVE_INFINITY;
  return { amount: Math.min(a, n), rate: i };
}
function Hn(s) {
  var i;
  const e = ((i = s == null ? void 0 : s.edge) == null ? void 0 : i.earn) ?? {};
  return {
    enabled: !!(e != null && e.enabled),
    rate: Math.max(1, Me(e == null ? void 0 : e.rate, 4)),
    maxPerRoll: (e == null ? void 0 : e.maxPerRoll) ?? Number.POSITIVE_INFINITY
  };
}
function js(s) {
  var t;
  const e = (t = s == null ? void 0 : s.edge) == null ? void 0 : t.pool;
  return e ? String(e) : null;
}
function Yp(s) {
  let e = 0, t = 0;
  const i = (a) => {
    if (!a) return;
    const n = a == null ? void 0 : a.results;
    if (Array.isArray(n))
      for (const o of n) {
        if ((o == null ? void 0 : o.active) === !1) continue;
        const l = Number(o == null ? void 0 : o.result);
        Number.isFinite(l) && (e += 1, l === 1 && (t += 1));
      }
    const r = a == null ? void 0 : a.terms;
    if (Array.isArray(r))
      for (const o of r) i(o);
    if (Array.isArray(a))
      for (const o of a) i(o);
  };
  return i(s), { dice: e, ones: t };
}
function El(s, e) {
  if (Me(s, 0) !== 0) return !1;
  const { dice: t, ones: i } = Yp(e);
  return t <= 0 ? !1 : i >= Math.ceil(t / 2);
}
function Qp(s, e, t = 4) {
  return !!(s && Me(e, 0) >= Me(t, 4));
}
function Hr(s, e) {
  const t = Me(e == null ? void 0 : e.successes, 0), i = vl(s, 1), a = t >= i, n = t - i, r = Qp(a, n, 4), o = El(t, e == null ? void 0 : e.raw), l = Hn(s), c = l.maxPerRoll ?? 1, u = l.enabled && n >= l.rate ? (() => {
    const { amount: m, rate: p } = Wn(n, { rate: l.rate, maxPerRoll: c }), f = js(s);
    return m > 0 ? { amount: m, pool: f, reason: "net4", details: { margin: n, rate: p } } : null;
  })() : null;
  return {
    rollType: "simple",
    passed: a,
    successes: t,
    difficulty: { dn: i },
    margin: n,
    criticalSuccess: r,
    criticalFailure: o,
    tier: r ? "criticalSuccess" : o ? "criticalFailure" : a ? "success" : "failure",
    edgeEarned: u
  };
}
function Jp(s, e, t) {
  var m, p;
  const i = Me(e == null ? void 0 : e.successes, 0), a = Me(t == null ? void 0 : t.successes, 0), n = !!((m = s == null ? void 0 : s.opposed) != null && m.net), r = String(((p = s == null ? void 0 : s.opposed) == null ? void 0 : p.dnTies) ?? "stalemate");
  let o = null, l = !1;
  n ? (o = i - a, o > 0 ? l = !0 : o < 0 ? l = !1 : r === "attackerWins" ? l = !0 : l = !1) : i > a ? l = !0 : i < a ? l = !1 : r === "attackerWins" ? l = !0 : l = !1;
  const c = Hn(s), u = c.maxPerRoll ?? 1, d = c.enabled && n && typeof o == "number" && o >= c.rate ? (() => {
    const { amount: f, rate: h } = Wn(o, { rate: c.rate, maxPerRoll: u }), g = js(s);
    return f > 0 ? { amount: f, pool: g, reason: "net4", details: { netHits: o, rate: h } } : null;
  })() : null;
  return {
    rollType: "opposed",
    passed: l,
    successes: i,
    opposed: {
      attacker: i,
      defender: a,
      netEnabled: n,
      netHits: n ? o : void 0,
      tiePolicy: r
    },
    edgeEarned: d
  };
}
function Xp(s, e) {
  var h, g, y;
  const t = Me(e == null ? void 0 : e.successes, 0), i = vl(s, 1), a = t >= i, n = El(t, e == null ? void 0 : e.raw), r = Vp(t, i), o = ((h = s == null ? void 0 : s.net) == null ? void 0 : h.convert) ?? ((g = s == null ? void 0 : s.allocation) == null ? void 0 : g.convert) ?? 0, l = Hn(s), c = l.rate, u = Kp({ convert: o, remainder: r, rate: c }), d = r - u, m = l.enabled && u >= c ? (() => {
    const { amount: b } = Wn(u, { rate: c, maxPerRoll: l.maxPerRoll }), S = js(s);
    return b > 0 ? { amount: b, pool: S, reason: "convert4", details: { converted: u, rate: c } } : null;
  })() : null, p = n ? { amount: 1, pool: js(s), reason: "critFail", details: { onesRule: "halfOrMoreOnes" } } : null, f = [];
  return m && f.push(m), p && f.push(p), f.length === 0 || (f.length === 1 ? f[0] : (f.reduce((b, S) => b + (Number(S == null ? void 0 : S.amount) || 0), 0), (y = f[0]) == null || y.pool)), {
    rollType: "net",
    passed: a,
    successes: t,
    difficulty: { dn: i },
    criticalFailure: n,
    tier: n ? "criticalFailure" : a ? "success" : "failure",
    net: {
      remainder: r,
      convertRequested: Me(o, 0),
      converted: u,
      value: d,
      // the actual net effect magnitude you apply (+net dice, etc.)
      rate: c,
      canConvert: r >= c
    },
    edgeEarned: m
  };
}
function Zp(s, e) {
  var o, l, c, u;
  const t = Me(e == null ? void 0 : e.successes, 0), i = Pa((o = s == null ? void 0 : s.extended) == null ? void 0 : o.target, 1, 1e4), a = Pa((l = s == null ? void 0 : s.extended) == null ? void 0 : l.accumulated, 0, 1e4), n = Pa(a + t, 0, 1e4), r = n >= i;
  return {
    rollType: "extended",
    passed: r,
    successes: t,
    extended: {
      target: i,
      accumulated: a,
      nextAccumulated: n,
      remaining: Math.max(0, i - n),
      completed: r,
      interval: ((c = s == null ? void 0 : s.extended) == null ? void 0 : c.interval) ?? null,
      failureLimit: ((u = s == null ? void 0 : s.extended) == null ? void 0 : u.failureLimit) ?? null
    },
    // NOTE: Edge earn rules for extended are intentionally omitted per your earlier constraint.
    edgeEarned: null
  };
}
function Cl(s, e, t = null) {
  var a;
  switch (String((s == null ? void 0 : s.rollType) ?? "simple")) {
    case "simple":
      return Hr(s, e);
    case "opposed":
      return Jp(s, e, t);
    case "net":
      return Xp(s, e);
    case "extended":
      return Zp(s, e);
    default: {
      const n = {
        ...s,
        difficulty: { dn: Number(((a = s == null ? void 0 : s.difficulty) == null ? void 0 : a.dn) ?? 1) || 1 }
      };
      return Hr(n, e);
    }
  }
}
const { ApplicationV2: ef, HandlebarsApplicationMixin: tf } = foundry.applications.api;
function sf(s, e = -3, t = 3) {
  const i = [], a = "../img/dice";
  for (let n = e; n <= t; n++) {
    const r = Math.abs(n), o = r === 0 ? `${a}/BlankDice.webp` : `${a}/D6_${r}.svg`;
    i.push({
      value: n,
      abs: r,
      icon: o,
      active: n === s,
      neg: n < 0,
      pos: n > 0,
      zero: n === 0,
      title: n === 0 ? "0 (neutral)" : n < 0 ? `${n} penalty` : `+${n} bonus`
    });
  }
  return i;
}
function jr(s) {
  return (Array.isArray(s) ? s : []).map((t) => ({
    id: (t == null ? void 0 : t.id) ?? foundry.utils.randomID(),
    label: typeof (t == null ? void 0 : t.label) == "string" ? t.label : "Manual",
    value: Number((t == null ? void 0 : t.value) ?? 0)
  }));
}
function Na(s, e) {
  const t = s == null ? void 0 : s.toggles;
  return t && typeof t == "object" && e in t ? !!t[e] : !!(s != null && s[e]);
}
function af(s, e) {
  s.useEdge = !!e.useEdge, s.takeRisks = !!e.takeRisks, s.opponentRoll = !!e.opponentRoll, s.toggles = s.toggles && typeof s.toggles == "object" ? s.toggles : {}, s.toggles.useEdge = !!e.useEdge, s.toggles.takeRisks = !!e.takeRisks, s.toggles.opponentRoll = !!e.opponentRoll;
}
function qr(s, e, t) {
  const i = String(t ?? "").trim(), a = i ? Bc(e, i) : "";
  if (i && a) {
    s.specializationKey = i, s.specializationLabel = a;
    return;
  }
  delete s.specializationKey, delete s.specializationLabel;
}
function nf(s) {
  const e = Array.isArray(s == null ? void 0 : s.breakdown) ? s.breakdown : [], t = (i) => {
    var a;
    return Number(((a = e.find((n) => (n == null ? void 0 : n.id) === i)) == null ? void 0 : a.value) ?? 0);
  };
  return {
    attribute: t("attribute"),
    skill: t("skill"),
    bonus: t("bonus"),
    specialization: t("specialization")
  };
}
var Ye;
const Ne = class Ne extends tf(ef) {
  constructor({ actor: t, baseContext: i, initialState: a = null, options: n = {} }) {
    var c, u;
    super(n);
    Te(this, Ye, null);
    /** @type {{ baseContext: any, state: any }} */
    R(this, "_mwd", { baseContext: null, state: null });
    this.actor = t, this._mwd.baseContext = i ?? {};
    const r = foundry.utils.deepClone(this._mwd.baseContext.payload ?? {}), o = jr(r.manualModifiers);
    this._mwd.state = foundry.utils.mergeObject(
      {
        payload: r,
        manual: o,
        toggles: {
          useEdge: Na(r, "useEdge"),
          takeRisks: Na(r, "takeRisks"),
          opponentRoll: Na(r, "opponentRoll")
        }
      },
      a ?? {},
      { inplace: !1, insertKeys: !0, insertValues: !0, overwrite: !0 }
    );
    const l = String(((u = (c = r == null ? void 0 : r.edge) == null ? void 0 : c.pre) == null ? void 0 : u.poolKey) ?? "").trim() || null;
    this._mwd.state.edge = {
      prePoolKey: l
    };
  }
  async wait() {
    return new Promise((t) => {
      De(this, Ye, t), this.render(!0);
    });
  }
  async close(t = {}) {
    if (z(this, Ye)) {
      const i = z(this, Ye);
      De(this, Ye, null), i(null);
    }
    return super.close(t);
  }
  /* --------------------------- */
  /* Prepare Context             */
  /* --------------------------- */
  async _prepareContext(t) {
    var Y, Q, G, H, D, V, ee, X, te, ce, Se, O, F, _e, J, Ke, et, Nt, Rt, Dt, It, Ot, _t, Lt, $t, xt, ut, Bt, Ft, zt, M, P, j, ue, he, Ae, ve;
    const i = this._mwd.baseContext ?? {}, a = this._mwd.state ?? {}, n = Number.isFinite(Number((Y = a == null ? void 0 : a.payload) == null ? void 0 : Y.dn)) ? Number(a.payload.dn) : Number.isFinite(Number(i == null ? void 0 : i.dn)) ? Number(i.dn) : Number.isFinite(Number((G = (Q = i == null ? void 0 : i.resolved) == null ? void 0 : Q.difficulty) == null ? void 0 : G.dn)) ? Number(i.resolved.difficulty.dn) : 1, r = (i == null ? void 0 : i.intent) ?? "skill";
    let o, l;
    const c = Array.isArray(a.manual) ? a.manual.reduce((W, ie) => W + Number((ie == null ? void 0 : ie.value) || 0), 0) : 0;
    if (r === "edge") {
      const W = (i == null ? void 0 : i.resolved) ?? {}, ie = Array.isArray(W.breakdown) ? W.breakdown : [], Le = (xe) => {
        var qe;
        return Number(((qe = ie.find((x) => x.id === xe)) == null ? void 0 : qe.value) ?? 0);
      }, $e = Number(((H = W == null ? void 0 : W.pool) == null ? void 0 : H.attribute) ?? 0);
      o = {
        pool: $e,
        rating: Le("rating"),
        cap: Le("cap"),
        modifiers: Number(((D = i == null ? void 0 : i.dice) == null ? void 0 : D.modifiers) ?? 0)
      }, l = Math.max(0, $e + o.modifiers + c);
    } else {
      o = {
        attribute: Number(((V = i == null ? void 0 : i.dice) == null ? void 0 : V.attribute) ?? 0),
        skill: Number(((ee = i == null ? void 0 : i.dice) == null ? void 0 : ee.skill) ?? 0),
        bonus: Number(((X = i == null ? void 0 : i.dice) == null ? void 0 : X.bonus) ?? 0),
        specialization: Number(((te = i == null ? void 0 : i.dice) == null ? void 0 : te.specialization) ?? 0),
        modifiers: Number(((ce = i == null ? void 0 : i.dice) == null ? void 0 : ce.modifiers) ?? 0)
      };
      const W = o.modifiers + c, ie = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, ie + W);
    }
    const u = Array.isArray((Se = i == null ? void 0 : i.resolved) == null ? void 0 : Se.domains) ? i.resolved.domains : [], d = u.includes("physical") ? "physical" : u.includes("mental") ? "mental" : u.includes("social") ? "social" : null, p = (d === "physical" ? ["grit", "chaos"] : d === "mental" ? ["insight", "rumor"] : d === "social" ? ["legend", "credibility"] : []).map((W) => {
      var ie, Le, $e, xe;
      return {
        key: W,
        label: W.charAt(0).toUpperCase() + W.slice(1),
        available: Number((($e = (Le = (ie = this.actor) == null ? void 0 : ie.getEdgePool) == null ? void 0 : Le.call(ie, W)) == null ? void 0 : $e.effectiveValue) ?? 0),
        selected: W === (((xe = a.edge) == null ? void 0 : xe.prePoolKey) ?? null)
      };
    }), f = p.find((W) => W.selected), h = (f == null ? void 0 : f.label) ?? null, g = ((O = i == null ? void 0 : i.resolved) == null ? void 0 : O.attack) ?? null, y = String(
      ((F = g == null ? void 0 : g.skill) == null ? void 0 : F.code) ?? ((J = (_e = i == null ? void 0 : i.resolved) == null ? void 0 : _e.specialization) == null ? void 0 : J.skillKey) ?? ((et = (Ke = i == null ? void 0 : i.resolved) == null ? void 0 : Ke.data) == null ? void 0 : et.skillKey) ?? ((Nt = i == null ? void 0 : i.payload) == null ? void 0 : Nt.key) ?? ""
    ).trim(), b = y ? vo(((Rt = this.actor) == null ? void 0 : Rt.system) ?? {}, y) : [], S = String(((Dt = a == null ? void 0 : a.payload) == null ? void 0 : Dt.specializationKey) ?? "").trim(), w = b.find((W) => W.key === S) ?? null;
    if (r !== "edge") {
      o.specialization = w ? Number(((Ot = (It = i == null ? void 0 : i.resolved) == null ? void 0 : It.specialization) == null ? void 0 : Ot.value) ?? 2) : 0;
      const W = o.modifiers + c, ie = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, ie + W);
    }
    const E = Array.isArray((_t = g == null ? void 0 : g.payloadState) == null ? void 0 : _t.payloads) ? g.payloadState.payloads : [], I = String(((Lt = g == null ? void 0 : g.weapon) == null ? void 0 : Lt.category) ?? "").trim().toLowerCase() !== "melee" && E.length > 0, N = String((($t = a == null ? void 0 : a.payload) == null ? void 0 : $t.payloadId) ?? ((xt = g == null ? void 0 : g.payloadState) == null ? void 0 : xt.activePayloadId) ?? "").trim(), L = E.find((W) => W.id === N) ?? null;
    return {
      header: {
        left: ((ut = i == null ? void 0 : i.header) == null ? void 0 : ut.left) ?? "Roll",
        right: ((Bt = i == null ? void 0 : i.header) == null ? void 0 : Bt.right) ?? ((Ft = this.actor) == null ? void 0 : Ft.name) ?? ""
      },
      formula: String((i == null ? void 0 : i.formula) ?? ((zt = i == null ? void 0 : i.resolved) == null ? void 0 : zt.formula) ?? "").trim(),
      dice: o,
      modifiers: Array.isArray(i.modifiers) ? i.modifiers : [],
      manual: (a.manual ?? []).map((W) => ({
        ...W,
        steps: sf(Number(W.value ?? 0), -3, 3)
      })),
      edge: {
        domain: d,
        choices: p,
        selectedLabel: h
      },
      toggles: r === "edge" ? { useEdge: !1, takeRisks: !1, opponentRoll: !1 } : a.toggles,
      totalPool: l,
      intent: r,
      dn: n,
      specialization: b.length ? {
        skillCode: y,
        options: b.map((W) => ({
          key: W.key,
          label: W.label,
          selected: W.key === S
        })),
        selectedKey: S,
        selectedLabel: (w == null ? void 0 : w.label) ?? ""
      } : null,
      attack: g ? {
        weaponName: ((M = g == null ? void 0 : g.weapon) == null ? void 0 : M.name) ?? "Weapon",
        rangeBand: (g == null ? void 0 : g.rangeBand) ?? "",
        damageType: ((P = L == null ? void 0 : L.modifies) == null ? void 0 : P.damageType) || ((j = g == null ? void 0 : g.weapon) == null ? void 0 : j.damageTypeLabel) || ((ue = g == null ? void 0 : g.weapon) == null ? void 0 : ue.damageType) || "",
        usesPayloads: I,
        source: (g == null ? void 0 : g.sourceState) ?? null,
        payloads: E.map((W) => {
          var ie;
          return {
            id: W.id,
            name: W.label,
            damageType: (ie = W.modifies) == null ? void 0 : ie.damageType,
            selected: W.id === N
          };
        }),
        selectedPayloadId: N,
        selectedPayloadLabel: (L == null ? void 0 : L.label) ?? ((he = g == null ? void 0 : g.payload) == null ? void 0 : he.label) ?? ((Ae = g == null ? void 0 : g.weapon) == null ? void 0 : Ae.payloadLabel) ?? "",
        selectedSourceLabel: ((ve = g == null ? void 0 : g.sourceState) == null ? void 0 : ve.label) ?? ""
      } : null
    };
  }
  /* --------------------------- */
  /* Actions                     */
  /* --------------------------- */
  async _onCancel(t) {
    if (t == null || t.preventDefault(), z(this, Ye)) {
      const i = z(this, Ye);
      De(this, Ye, null), i(null);
    }
    return this.close();
  }
  async _onSubmit(t) {
    var a, n, r, o, l, c, u, d, m, p, f, h, g;
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
    }), af(i.payload, i.toggles ?? {}), qr(
      i.payload,
      ((a = i.payload) == null ? void 0 : a.intent) === "attack" ? ((n = i.payload) == null ? void 0 : n.skillKey) ?? ((c = (l = (o = (r = this._mwd.baseContext) == null ? void 0 : r.resolved) == null ? void 0 : o.attack) == null ? void 0 : l.skill) == null ? void 0 : c.code) : ((u = i.payload) == null ? void 0 : u.key) ?? ((p = (m = (d = this._mwd.baseContext) == null ? void 0 : d.resolved) == null ? void 0 : m.data) == null ? void 0 : p.skillKey),
      (f = i.payload) == null ? void 0 : f.specializationKey
    ), z(this, Ye)) {
      const y = z(this, Ye);
      De(this, Ye, null), y({ payload: i.payload });
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
    const a = (n = i == null ? void 0 : i.dataset) == null ? void 0 : n.id;
    if (a)
      return this._mwd.state.manual = this._mwd.state.manual.filter((r) => r.id !== a), this.render(!1);
  }
  async _onSetManualValue(t, i) {
    var o, l;
    t == null || t.preventDefault();
    const a = (o = i == null ? void 0 : i.dataset) == null ? void 0 : o.id, n = (l = i == null ? void 0 : i.dataset) == null ? void 0 : l.field;
    if (!a || !n) return;
    const r = this._mwd.state.manual.find((c) => c.id === a);
    if (r)
      return n === "label" && (r.label = String(i.value ?? "")), n === "value" && (r.value = Number(i.value ?? 0)), this.render(!1);
  }
  async _onSetManualStepper(t, i) {
    var o, l;
    t == null || t.preventDefault();
    const a = (o = i == null ? void 0 : i.dataset) == null ? void 0 : o.id, n = Number((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.value);
    if (!a || Number.isNaN(n)) return;
    const r = this._mwd.state.manual.find((c) => c.id === a);
    if (r)
      return r.value = n, this.render(!1);
  }
  async _onSetEdgePrePool(t, i) {
    var n;
    t == null || t.preventDefault();
    const a = String(((n = i == null ? void 0 : i.dataset) == null ? void 0 : n.poolKey) ?? "").trim();
    if (a)
      return this._mwd.state.edge = this._mwd.state.edge ?? {}, this._mwd.state.edge.prePoolKey = a, this._mwd.state.toggles.useEdge = !0, this.render(!1);
  }
  async _onToggleCheckbox(t, i) {
    var n;
    t == null || t.preventDefault();
    const a = (n = i == null ? void 0 : i.dataset) == null ? void 0 : n.key;
    if (a)
      return this._mwd.state.toggles[a] = !!i.checked, this.render(!1);
  }
  async _onSetDn(t, i) {
    t == null || t.preventDefault();
    const a = String((i == null ? void 0 : i.value) ?? "").trim(), n = a === "" ? null : Number(a);
    return this._mwd.state.payload.dn = Number.isFinite(n) ? Math.max(0, Math.trunc(n)) : null, this.render(!1);
  }
  async _onSetPayload(t, i) {
    return t == null || t.preventDefault(), this._mwd.state.payload.payloadId = String((i == null ? void 0 : i.value) ?? "").trim(), this.render(!1);
  }
  async _onSetSpecialization(t, i) {
    var r;
    t == null || t.preventDefault();
    const a = String(((r = i == null ? void 0 : i.dataset) == null ? void 0 : r.skillCode) ?? "").trim(), n = String((i == null ? void 0 : i.value) ?? "").trim();
    if (a)
      return qr(this._mwd.state.payload, a, n), this.render(!1);
  }
  _onRender(t, i) {
    var n, r;
    (n = super._onRender) == null || n.call(this, t, i);
    const a = this.element instanceof HTMLElement ? this.element : (r = this.element) == null ? void 0 : r[0];
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
  static async prompt({ actor: t, basePayload: i, resolved: a, diceParts: n = null, mods: r = [], modTotal: o = 0 } = {}) {
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
    }, u = n ?? nf(a), d = {
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
    l.manualModifiers = jr(l.manualModifiers);
    const f = await new Ne({
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
    return (f == null ? void 0 : f.payload) ?? null;
  }
};
Ye = new WeakMap(), R(Ne, "DEFAULT_OPTIONS", foundry.utils.mergeObject(
  bi(Ne, Ne, "DEFAULT_OPTIONS"),
  {
    id: "mwd-roll-dialog",
    classes: [
      ...bi(Ne, Ne, "DEFAULT_OPTIONS").classes ?? [],
      "mwd",
      "mwd-roll-dialog"
    ],
    window: { title: "Roll", resizable: !1 },
    position: { width: 520, height: "auto" },
    actions: {
      submit: Ne.prototype._onSubmit,
      cancel: Ne.prototype._onCancel,
      addManual: Ne.prototype._onAddManual,
      removeManual: Ne.prototype._onRemoveManual,
      setManualValue: Ne.prototype._onSetManualValue,
      setManualStepper: Ne.prototype._onSetManualStepper,
      setEdgePrePool: Ne.prototype._onSetEdgePrePool,
      toggleCheckbox: Ne.prototype._onToggleCheckbox,
      setDn: Ne.prototype._onSetDn,
      setPayload: Ne.prototype._onSetPayload,
      setSpecialization: Ne.prototype._onSetSpecialization
    }
  },
  { inplace: !1 }
)), R(Ne, "PARTS", {
  body: { template: "systems/mwd/templates/v2/roll/mwd-roll-dialog.hbs" }
});
let Sn = Ne;
const { ApplicationV2: rf, HandlebarsApplicationMixin: of } = foundry.applications.api, es = class es extends of(rf) {
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
      classes: [game.system.anarchy.styles.selectCssClass(), ...es.DEFAULT_OPTIONS.classes],
      window: { title: e }
    };
    return new es({ items: t }, i).wait();
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
R(es, "PARTS", {
  body: {
    template: `${q}/dialog/select-item.hbs`
  }
});
let An = es;
function la(s, e = 0) {
  const t = Number(s);
  return Number.isFinite(t) ? t : e;
}
function lf(s = {}) {
  var t;
  const e = Array.isArray((t = s == null ? void 0 : s.attack) == null ? void 0 : t.targets) ? s.attack.targets : [];
  if (!e.length) throw new Error("Attack requires at least one target.");
  return e;
}
async function cf(s = {}) {
  if (!(s != null && s.actorUuid)) return null;
  try {
    return await fromUuid(s.actorUuid);
  } catch (e) {
    return console.warn("MWD | Unable to resolve attack target actor for CQ", s, e), null;
  }
}
function uf(s = {}, e = null, t = "") {
  var i, a, n, r, o;
  return Math.max(0, la(
    ((i = s == null ? void 0 : s.attributes) == null ? void 0 : i[t]) ?? ((a = e == null ? void 0 : e.getAttributeValue) == null ? void 0 : a.call(e, t)) ?? ((o = (r = (n = e == null ? void 0 : e.system) == null ? void 0 : n.attributes) == null ? void 0 : r[t]) == null ? void 0 : o.value),
    0
  ));
}
function df(s = {}, e = null, t = "") {
  var i, a, n, r, o, l;
  return Math.max(0, la(
    ((a = (i = s == null ? void 0 : s.skills) == null ? void 0 : i[t]) == null ? void 0 : a.rating) ?? ((n = e == null ? void 0 : e.getSkillRating) == null ? void 0 : n.call(e, t)) ?? ((l = (o = (r = e == null ? void 0 : e.system) == null ? void 0 : r.skills) == null ? void 0 : o[t]) == null ? void 0 : l.rating),
    0
  ));
}
function Gr(s = []) {
  return s.reduce((e, t) => e + la(t == null ? void 0 : t.value, 0), 0);
}
async function mf({ attacker: s = null, ctx: e = {}, target: t = {} } = {}) {
  var S, w, E, I, N, L, Y, Q, G, H, D, V, ee, X, te, ce;
  const i = await cf(t), a = Math.max(0, Number(((I = (w = (S = e == null ? void 0 : e.attack) == null ? void 0 : S.weapon) == null ? void 0 : w.attackRatingBand) == null ? void 0 : I[(E = e == null ? void 0 : e.attack) == null ? void 0 : E.rangeBand]) ?? 0) || 0), n = uf(t, i, "reflexes"), r = n + n, o = String(((L = (N = e == null ? void 0 : e.attack) == null ? void 0 : N.skill) == null ? void 0 : L.code) ?? ((Q = (Y = e == null ? void 0 : e.attack) == null ? void 0 : Y.weapon) == null ? void 0 : Q.skill) ?? "").trim(), l = String(((H = (G = e == null ? void 0 : e.attack) == null ? void 0 : G.skill) == null ? void 0 : H.label) ?? o ?? "Attack Skill").trim() || "Attack Skill", c = o ? Math.max(0, la(((D = s == null ? void 0 : s.getSkillRating) == null ? void 0 : D.call(s, o)) ?? ((X = (ee = (V = s == null ? void 0 : s.system) == null ? void 0 : V.skills) == null ? void 0 : ee[o]) == null ? void 0 : X.rating), 0)) : 0, u = df(t, i, "tactics"), d = c - u, m = Math.abs(d), p = Math.max(0, Number(((te = t == null ? void 0 : t.activeArmor) == null ? void 0 : te.defenseBonus) ?? 0) || 0), h = [{
    id: "weapon.attackRating",
    label: `Weapon AR (${String(((ce = e == null ? void 0 : e.attack) == null ? void 0 : ce.rangeBand) ?? "").trim() || "range"})`,
    value: a
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
  const y = Gr(h), b = Gr(g);
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
function pf(s = {}, e = {}) {
  var c, u, d, m, p;
  const t = (s == null ? void 0 : s.attack) ?? {}, i = String(((u = (c = t == null ? void 0 : t.payload) == null ? void 0 : c.modifies) == null ? void 0 : u.damageType) ?? "").trim(), a = Math.max(0, Number(((d = t == null ? void 0 : t.weapon) == null ? void 0 : d.damage) ?? 0) || 0), n = yt(i || ((m = t == null ? void 0 : t.weapon) == null ? void 0 : m.damageType), "concussive"), r = Math.max(0, Number((t == null ? void 0 : t.totalAp) ?? ((p = t == null ? void 0 : t.weapon) == null ? void 0 : p.ap) ?? 0) || 0), o = e.outcome === "graze" ? a / 2 : e.outcome === "hit" ? a : 0, l = o + Number(e.netHits ?? 0);
  return {
    baseDamage: a,
    effectiveWeaponDamage: o,
    netHits: Number(e.netHits ?? 0),
    incoming: l,
    ap: r,
    damageType: n,
    damageTypeLabel: Pt(n)
  };
}
function ff({ attacker: s, ctx: e, damage: t } = {}) {
  var i, a, n, r;
  return {
    mode: "attackDamage",
    track: A.monitors.physical,
    damage: (t == null ? void 0 : t.effectiveWeaponDamage) ?? 0,
    netHits: (t == null ? void 0 : t.netHits) ?? 0,
    damageType: t == null ? void 0 : t.damageType,
    ap: (t == null ? void 0 : t.ap) ?? 0,
    effects: ((a = (i = e == null ? void 0 : e.attack) == null ? void 0 : i.weapon) == null ? void 0 : a.effects) ?? {},
    source: `${(s == null ? void 0 : s.name) ?? "Attacker"}: ${((r = (n = e == null ? void 0 : e.attack) == null ? void 0 : n.weapon) == null ? void 0 : r.name) ?? "Attack"}`
  };
}
function Ji(s, e = {}, t = {}, { queued: i = !1, applied: a = !1, skipped: n = !1, reason: r = "" } = {}) {
  return n ? {
    ok: !0,
    skipped: !0,
    queued: !1,
    applied: !1,
    reason: r || "Missed target."
  } : s != null && s.ok ? {
    ok: !0,
    queued: !!i,
    applied: !!a,
    preview: !!s.dryRun,
    actorName: s.actorName ?? (e == null ? void 0 : e.name) ?? "Target",
    sourceType: s.sourceType ?? null,
    mode: s.mode ?? "attackDamage",
    track: s.track ?? A.monitors.physical,
    requestedDelta: Number(s.requestedDelta ?? 0),
    appliedDelta: Number(s.appliedDelta ?? 0),
    usedArmor: !!s.usedArmor,
    damageType: s.damageType ?? (t == null ? void 0 : t.damageType) ?? "",
    effectiveAp: Number(s.effectiveAp ?? (t == null ? void 0 : t.ap) ?? 0),
    mitigation: s.mitigation ? {
      baseMitigation: Number(s.mitigation.baseMitigation ?? 0),
      typeMitigationMod: Number(s.mitigation.typeMitigationMod ?? 0),
      netResistance: Number(s.mitigation.netResistance ?? 0),
      armorBefore: Number(s.mitigation.armorBefore ?? 0),
      armorAfter: Number(s.mitigation.armorAfter ?? 0),
      reinforcedBefore: Number(s.mitigation.reinforcedBefore ?? 0),
      reinforcedAfter: Number(s.mitigation.reinforcedAfter ?? 0),
      reinforcedMax: Number(s.mitigation.reinforcedMax ?? 0)
    } : null,
    damageIncoming: Number(s.damageIncoming ?? 0),
    adjustedIncoming: Number(s.adjustedIncoming ?? 0),
    finalDamage: Number(s.finalDamage ?? 0),
    beforeLabel: String(s.beforeLabel ?? "").trim(),
    afterLabel: String(s.afterLabel ?? "").trim(),
    source: String(s.source ?? "").trim(),
    notes: String(s.notes ?? "").trim()
  } : {
    ok: !1,
    queued: !1,
    applied: !1,
    reason: (s == null ? void 0 : s.reason) ?? r ?? "Unable to preview attack damage."
  };
}
async function hf({ attacker: s, ctx: e, target: t, outcome: i, damage: a } = {}) {
  if ((i == null ? void 0 : i.outcome) === "miss")
    return Ji(null, t, a, { skipped: !0, reason: "Missed target." });
  let n = null, r = null;
  try {
    n = t != null && t.tokenUuid ? await fromUuid(t.tokenUuid) : null, r = t != null && t.actorUuid ? await fromUuid(t.actorUuid) : null;
  } catch (c) {
    return console.warn("MWD | Unable to resolve target for queued attack damage", t, c), Ji(null, t, a, { reason: "Unable to resolve attack target." });
  }
  const o = ff({ attacker: s, ctx: e, damage: a }), l = await Ze.apply({
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
    const c = Ji(l, t, a, { queued: !0, applied: !1 });
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
  return Ji(l, t, a, { reason: "Unable to preview attack damage." });
}
async function gf({ attacker: s, ctx: e, outcomeModel: t, target: i } = {}) {
  const a = await mf({ attacker: s, ctx: e, target: i }), n = Number((t == null ? void 0 : t.margin) ?? 0), r = Number(a.value ?? 0), o = n, l = r > 0 ? n >= 1 ? "hit" : n === 0 ? "graze" : "miss" : r < 0 ? n >= 2 ? "hit" : n === 1 ? "graze" : "miss" : n >= 1 ? "hit" : "miss", c = l === "hit" ? Math.max(0, o) : 0, u = pf(e, { outcome: l, netHits: c }), d = await hf({
    attacker: s,
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
    cq: a,
    margin: n,
    rawNetHits: o,
    netHits: c,
    outcome: l,
    damage: u,
    damageResult: d,
    queuedMutation: (d == null ? void 0 : d.queuedMutation) ?? null
  };
}
function yf(s = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of s)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
async function Pl({ attacker: s, ctx: e, outcomeModel: t } = {}) {
  const i = lf(e), a = [];
  for (const n of i)
    a.push(await gf({ attacker: s, ctx: e, outcomeModel: t, target: n }));
  return {
    targetCount: i.length,
    results: a,
    summary: yf(a)
  };
}
const Vr = { execute: kf }, bf = {
  physical: ["grit", "chaos"],
  mental: ["insight", "rumor"],
  social: ["legend", "credibility"]
};
function Sf(s, e) {
  var n;
  const t = bf[e] ?? [];
  let i = null, a = -1;
  for (const r of t) {
    const o = (n = s.getEdgePool) == null ? void 0 : n.call(s, r), l = Number((o == null ? void 0 : o.rating) ?? 0), c = Number((o == null ? void 0 : o.value) ?? 0), u = Math.max(0, l - c);
    u > a && (a = u, i = r);
  }
  return i ?? t[0] ?? null;
}
function Af(s) {
  const t = (Array.isArray(s == null ? void 0 : s.manualModifiers) ? s.manualModifiers : []).map((a) => ({
    id: a.id ?? foundry.utils.randomID(),
    label: (a.label ?? "Manual").trim() || "Manual",
    value: Number(a.value ?? 0),
    source: "Manual"
  })).filter((a) => Number.isFinite(a.value) && a.value !== 0), i = t.reduce((a, n) => a + n.value, 0);
  return { mods: t, total: i };
}
function Kr(s = {}) {
  const e = s.toggles ?? {}, t = String((s == null ? void 0 : s.payloadId) ?? (s == null ? void 0 : s.ammoTypeId) ?? "").trim();
  return {
    ...s,
    ...t ? { payloadId: t } : {},
    toggles: {
      useEdge: !!e.useEdge,
      takeRisks: !!e.takeRisks,
      opponentRoll: !!e.opponentRoll
    },
    manualModifiers: Tf(s.manualModifiers)
  };
}
async function wf({ actor: s, payload: e } = {}) {
  var n, r, o, l, c, u, d, m, p, f, h, g;
  if ((e == null ? void 0 : e.intent) !== "attack") return e;
  const t = foundry.utils.deepClone(e ?? {}), i = ((n = s.getPersonalCombatLoadout) == null ? void 0 : n.call(s, { refresh: !0 })) ?? null, a = (y) => {
    var S, w, E, I, N;
    const b = ((w = (S = s.items) == null ? void 0 : S.get) == null ? void 0 : w.call(S, y)) ?? null;
    return !b || !(((E = b.isPersonalWeapon) == null ? void 0 : E.call(b)) ?? b.type === A.itemType.personalWeapon) || !((I = b.system) != null && I.equipped) ? null : ((N = b.getCombatProfile) == null ? void 0 : N.call(b, { payloadId: t == null ? void 0 : t.payloadId })) ?? null;
  };
  if (t.weaponId) {
    const y = a(t.weaponId);
    if (!y)
      throw new Error("Attack requires an owned equipped personal weapon.");
    return t.rangeBand = t.rangeBand ?? y.defaultRangeBand ?? "close", t.payloadId = t.payloadId ?? ((r = y == null ? void 0 : y.payloadState) == null ? void 0 : r.activePayloadId) ?? "", t;
  }
  if (t.mode === "auto") {
    if (i != null && i.weaponChoiceRequired) {
      const y = await An.selectItem(
        "Choose Weapon",
        i.equippedWeapons ?? []
      );
      return y ? (t.weaponId = y.id, t.rangeBand = t.rangeBand ?? y.defaultRangeBand ?? "close", t.payloadId = t.payloadId ?? ((o = y == null ? void 0 : y.payloadState) == null ? void 0 : o.activePayloadId) ?? "", delete t.mode, t) : null;
    }
    if ((l = i == null ? void 0 : i.defaultWeapon) != null && l.isSynthetic || ((c = i == null ? void 0 : i.defaultWeapon) == null ? void 0 : c.id) === "unarmed")
      return t.syntheticWeapon = foundry.utils.deepClone(i.defaultWeapon ?? ot.buildDefaultUnarmedProfile(s)), t.weaponId = t.syntheticWeapon.id, t.rangeBand = t.rangeBand ?? "close", t.payloadId = t.payloadId ?? ((d = (u = t.syntheticWeapon) == null ? void 0 : u.payloadState) == null ? void 0 : d.activePayloadId) ?? "", delete t.mode, t;
    if ((m = i == null ? void 0 : i.defaultWeapon) != null && m.id)
      return t.weaponId = i.defaultWeapon.id, t.rangeBand = t.rangeBand ?? i.defaultWeapon.defaultRangeBand ?? "close", t.payloadId = t.payloadId ?? ((f = (p = i.defaultWeapon) == null ? void 0 : p.payloadState) == null ? void 0 : f.activePayloadId) ?? "", delete t.mode, t;
  }
  if (t.fallback === "unarmed")
    return t.syntheticWeapon = foundry.utils.deepClone(ot.buildDefaultUnarmedProfile(s)), t.weaponId = t.syntheticWeapon.id, t.rangeBand = t.rangeBand ?? "close", t.payloadId = t.payloadId ?? ((g = (h = t.syntheticWeapon) == null ? void 0 : h.payloadState) == null ? void 0 : g.activePayloadId) ?? "", delete t.mode, t;
  throw new Error("Attack could not resolve a usable weapon.");
}
function Tf(s) {
  return Array.isArray(s) ? s.map((e) => ({
    id: (e == null ? void 0 : e.id) ?? foundry.utils.randomID(),
    label: typeof (e == null ? void 0 : e.label) == "string" ? e.label : "Manual",
    value: Number((e == null ? void 0 : e.value) ?? 0)
  })) : [];
}
async function kf({ actor: s, payload: e, event: t } = {}) {
  var G, H, D, V, ee, X, te, ce, Se, O, F, _e, J, Ke, et, Nt, Rt, Dt, It, Ot, _t, Lt, $t, xt, ut, Bt, Ft, zt, M, P, j, ue, he, Ae, ve, W, ie, Le, $e, xe, qe;
  if (s != null && s.actor && (s = s.actor), (G = s == null ? void 0 : s.document) != null && G.actor && (s = s.document.actor), !s) throw new Error("MWD.roll.execute requires actor");
  if (!(e != null && e.intent)) throw new Error("MWD.roll.execute requires payload.intent");
  if (e = Kr(e), e = await wf({ actor: s, payload: e }), !e) return null;
  let i = await Ca({ actor: s, payload: e, event: t }), a = await zr({
    actor: s,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const n = await Sn.prompt({
    actor: s,
    basePayload: e,
    resolved: i,
    diceParts: {
      attribute: ((H = i == null ? void 0 : i.pool) == null ? void 0 : H.attribute) ?? 0,
      skill: ((D = i == null ? void 0 : i.pool) == null ? void 0 : D.skill) ?? 0,
      bonus: ((V = i == null ? void 0 : i.pool) == null ? void 0 : V.bonus) ?? 0,
      specialization: ((ee = i == null ? void 0 : i.pool) == null ? void 0 : ee.specialization) ?? 0
    },
    mods: a.mods,
    modTotal: a.total,
    options: {
      allowEdge: e.intent !== "initiative"
    }
  });
  if (!n) return null;
  if (e = Kr(n), i = await Ca({ actor: s, payload: e, event: t }), e.intent === "attack" && !((te = (X = i == null ? void 0 : i.attack) == null ? void 0 : X.capabilityReport) != null && te.isTemplated) && (delete e.targetSnapshots, delete e.templatePlacement), e.intent === "attack" && e.weaponId) {
    const x = ((Se = (ce = s.items) == null ? void 0 : ce.get) == null ? void 0 : Se.call(ce, e.weaponId)) ?? null;
    if ((O = x == null ? void 0 : x.isPersonalWeapon) != null && O.call(x)) {
      const me = String(e.payloadId ?? "").trim(), At = String(((F = x.system) == null ? void 0 : F.selectedPayloadId) ?? "").trim();
      if (me && me !== At && await ((_e = x.setActivePayload) == null ? void 0 : _e.call(x, me)), !((J = x.canConsumePayload) != null && J.call(x, { payloadId: me }))) {
        const Ue = (Ke = x.getPayloadState) == null ? void 0 : Ke.call(x, { payloadId: me }), tt = Ue != null && Ue.payloadLabel ? ` (${Ue.payloadLabel})` : "";
        return (et = ui.notifications) == null || et.warn(`Not enough payload${tt} for ${x.name}.`), null;
      }
    }
  }
  if (e.intent === "attack" && ((Rt = (Nt = i == null ? void 0 : i.attack) == null ? void 0 : Nt.capabilityReport) != null && Rt.isTemplated)) {
    const x = await Tp({
      actor: s,
      attack: i.attack
    });
    if (!x) return null;
    if (!Array.isArray(x.targetSnapshots) || x.targetSnapshots.length === 0)
      return (Dt = ui.notifications) == null || Dt.warn("Template placement did not affect any targets."), null;
    e.targetSnapshots = x.targetSnapshots, e.templatePlacement = x.placement, i = await Ca({ actor: s, payload: e, event: t });
  }
  a = await zr({
    actor: s,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const { mods: r, total: o } = a, { mods: l, total: c } = Af(e);
  let u = [...r, ...l], d = Number(o ?? 0) + Number(c ?? 0);
  const m = Number(((It = i == null ? void 0 : i.pool) == null ? void 0 : It.attribute) ?? 0) + Number(((Ot = i == null ? void 0 : i.pool) == null ? void 0 : Ot.skill) ?? 0) + Number(((_t = i == null ? void 0 : i.pool) == null ? void 0 : _t.bonus) ?? 0) + Number(((Lt = i == null ? void 0 : i.pool) == null ? void 0 : Lt.specialization) ?? 0), p = Math.max(0, m + Number(d ?? 0)), f = e.intent !== "initiative", h = f ? Mf({ actor: s, ctx: i, payload: e }) : null, g = ($t = h == null ? void 0 : h.pre) != null && $t.spent ? 4 : Number(i.diceTarget ?? i.target ?? 5), y = {
    snapshot: ((Bt = (ut = (xt = game.mwd) == null ? void 0 : xt.personalCombat) == null ? void 0 : ut.getSnapshot) == null ? void 0 : Bt.call(ut, s)) ?? null
  }, b = rt({
    actor: s,
    phase: "onBuildRoll",
    facts: Ln({ actor: s, resolved: i, payload: e, runtime: y }),
    packet: {},
    options: { runtime: y, consumeUsage: !0 }
  });
  await Xt({ actor: s, mutations: b.mutations, runtime: y }), f && ((Ft = h == null ? void 0 : h.pre) != null && Ft.spent) && ((zt = h == null ? void 0 : h.pre) != null && zt.poolKey) && await ((M = s.spendEdge) == null ? void 0 : M.call(s, h.pre.poolKey, 1));
  let S, w = 0, E = 0;
  if (i.rollType === "sum" && ((P = i.sum) != null && P.formula))
    S = await new Roll(i.sum.formula, i.sum.data ?? {}).evaluate(), w = Number(S.total ?? 0) + Number(d ?? 0);
  else {
    S = await new Roll(`${p}d6cs>=${g}`).evaluate();
    const x = (j = S.dice) == null ? void 0 : j[0];
    w = Array.isArray(x == null ? void 0 : x.results) ? x.results.filter((me) => me.success).length : 0, E = Array.isArray(x == null ? void 0 : x.results) ? x.results.filter((me) => me.result === 1).length : 0;
  }
  if (i.intent === "initiative" && (S == null ? void 0 : S.total) != null) {
    const x = { total: Number(S.total ?? 0) + Number(d ?? 0) }, me = rt({
      actor: s,
      phase: "onInitiativeResolved",
      facts: zo({ actor: s, packet: x, runtime: y }),
      packet: x,
      options: { runtime: y, consumeUsage: !0 }
    });
    if (await Xt({ actor: s, mutations: me.mutations, runtime: y }), me.modifiers.length) {
      const At = me.modifiers.reduce((Ue, tt) => Ue + Number(tt.value ?? 0), 0);
      u = u.concat(me.modifiers), d += At, w = Number(me.packet.total ?? 0), await Yr({ actor: s, total: me.packet.total ?? S.total }), i.breakdown = (i.breakdown ?? []).concat(me.modifiers.map((Ue, tt) => ({
        id: `traitInitiative${tt + 1}`,
        label: Ue.label,
        value: Number(Ue.value ?? 0)
      })));
    } else
      w = Number(x.total ?? 0), await Yr({ actor: s, total: x.total });
  }
  const I = Cl(
    i,
    { successes: w, raw: (ue = S == null ? void 0 : S.toJSON) == null ? void 0 : ue.call(S) },
    null
    // opposed rolls can pass defender result later
  ), N = I == null ? void 0 : I.edgeEarned;
  if ((N == null ? void 0 : N.amount) > 0) {
    const x = (he = i == null ? void 0 : i.domains) != null && he.includes("physical") ? "physical" : (Ae = i == null ? void 0 : i.domains) != null && Ae.includes("mental") ? "mental" : (ve = i == null ? void 0 : i.domains) != null && ve.includes("social") ? "social" : null, me = Sf(s, x);
    await ((W = s.gainEdge) == null ? void 0 : W.call(s, me, N.amount)), I.edgeEarned.pool = me;
  }
  i.intent === "overload" && await Cf({ actor: s, passed: I.passed });
  let L = null;
  i.intent === "attack" && (L = await Pl({
    attacker: s,
    ctx: i,
    outcomeModel: I
  }));
  const Y = Lp({
    actor: s,
    payload: e,
    ctx: i,
    roll: S,
    target: g,
    pool: p,
    mods: u,
    modTotal: d,
    hits: w,
    ones: E,
    edge: h,
    outcomeModel: I
  });
  L && (Y.attackResult = L);
  const Q = await oa({ resolved: Y });
  if (e.intent === "attack" && e.weaponId) {
    const x = ((Le = (ie = s.items) == null ? void 0 : ie.get) == null ? void 0 : Le.call(ie, e.weaponId)) ?? null;
    ($e = x == null ? void 0 : x.isPersonalWeapon) != null && $e.call(x) && (await ((xe = x.consumePayload) == null ? void 0 : xe.call(x, { payloadId: e.payloadId })) || (qe = ui.notifications) == null || qe.warn(`Payload could not be consumed for ${x.name}.`));
  }
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: s }),
    content: Q,
    flags: {
      mwd: {
        payload: e,
        resolved: Y
      }
    }
  });
}
function Mf({ actor: s, ctx: e, payload: t }) {
  var f, h, g, y, b, S, w;
  const i = vf(e == null ? void 0 : e.domains), a = Ef[i] ?? null, n = (a == null ? void 0 : a.a) ?? null, r = (a == null ? void 0 : a.b) ?? null, o = [n, r].filter(Boolean), l = !!((f = t == null ? void 0 : t.toggles) != null && f.useEdge) || !!(t != null && t.useEdge);
  let c = String(((g = (h = t == null ? void 0 : t.edge) == null ? void 0 : h.pre) == null ? void 0 : g.poolKey) ?? "").trim() || null;
  c && !o.includes(c) && (c = null);
  const u = l && c ? 1 : 0;
  let d = [...o];
  u && c && (d = d.filter((E) => E !== c));
  let m = String(((b = (y = t == null ? void 0 : t.edge) == null ? void 0 : y.post) == null ? void 0 : b.poolKey) ?? "").trim() || null;
  m && !d.includes(m) && (m = null);
  const p = Number(((w = (S = t == null ? void 0 : t.edge) == null ? void 0 : S.post) == null ? void 0 : w.spent) ?? 0) ? 1 : 0;
  return {
    domain: i,
    pools: a ? { a: n, b: r } : null,
    pre: { poolKey: c, spent: u },
    post: { poolKey: m, spent: p },
    allowed: { prePools: o, postPools: d }
  };
}
function vf(s) {
  return Array.isArray(s) ? s.includes("physical") ? "physical" : s.includes("mental") ? "mental" : s.includes("social") ? "social" : null : null;
}
const Ef = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};
async function Yr({ actor: s, total: e }) {
  var o, l, c, u, d;
  const t = (l = (o = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : o.controlled) == null ? void 0 : l.find((m) => {
    var p;
    return ((p = m.actor) == null ? void 0 : p.id) === s.id;
  }), i = ((u = (c = s.getActiveTokens) == null ? void 0 : c.call(s, !0, !0)) == null ? void 0 : u[0]) ?? null, a = t ?? i;
  if (!a) {
    (d = ui.notifications) == null || d.warn("Initiative requires a token on the current scene.");
    return;
  }
  let n = game.combat;
  n || (n = await Combat.create({
    scene: canvas.scene.id,
    active: !0
  }));
  let r = n.combatants.find((m) => m.tokenId === a.id);
  if (!r) {
    const m = await n.createEmbeddedDocuments("Combatant", [{
      tokenId: a.id,
      actorId: s.id,
      sceneId: canvas.scene.id
    }]);
    r = m == null ? void 0 : m[0];
  }
  r && await r.update({ initiative: Number(e) });
}
async function Cf({ actor: s, passed: e }) {
  e || await s.update({ "system.burn.overloaded": !0 });
}
const Pf = /* @__PURE__ */ new Set(["physical", "mental", "social"]);
function Nf(s) {
  if (s == null || s === "" || s === "—" || s === "–") return 0;
  const e = Number(s);
  return Number.isFinite(e) ? e : null;
}
function Rf(s) {
  if (!s) return;
  const e = String(s).trim().toLowerCase();
  return Pf.has(e) ? e : void 0;
}
class Df {
  constructor() {
    R(this, "id", "mwd.itemModifiers");
    R(this, "label", "Item Modifiers");
  }
  collect(e) {
    var a, n;
    const t = e == null ? void 0 : e.actor;
    if (!t) return [];
    const i = [];
    for (const r of t.items) {
      const o = (n = (a = r.flags) == null ? void 0 : a.mwd) == null ? void 0 : n.modifiers;
      if (!(!Array.isArray(o) || o.length === 0))
        for (const l of o) {
          if (!l) continue;
          const c = Nf(l.value);
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
            domain: Rf(l.domain)
          });
        }
    }
    return i;
  }
}
const Ra = {
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
class If {
  constructor() {
    R(this, "id", "mwd.statusEffects");
    R(this, "label", "Status Effects");
  }
  collect({ actor: e } = {}) {
    var a;
    const t = e == null ? void 0 : e.statuses;
    if (!e || !t) return [];
    const i = [];
    for (const n of t) {
      const r = Ra == null ? void 0 : Ra[n];
      if ((a = r == null ? void 0 : r.mods) != null && a.length)
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
class Of {
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
    const a = ((o = e == null ? void 0 : e.dialog) == null ? void 0 : o.otherMods) ?? ((l = e == null ? void 0 : e.modifiers) == null ? void 0 : l.otherMods) ?? (e == null ? void 0 : e.otherMods) ?? 0, n = Number(a);
    return Number.isFinite(n) && n !== 0 && t.push({
      id: "otherMods",
      label: "Other modifiers",
      value: n,
      source: "Roll"
    }), t;
  }
}
class _f {
  constructor() {
    R(this, "id", "mwd.condition");
    R(this, "label", "Condition");
  }
  collect({ actor: e, rollType: t } = {}) {
    var o, l, c, u, d, m, p, f;
    if (!e) return [];
    if (t === "edge") return [];
    const i = ((o = e.system) == null ? void 0 : o.derived) ?? {}, a = Number(
      ((l = i == null ? void 0 : i.condition) == null ? void 0 : l.physicalPenalty) ?? ((u = (c = i == null ? void 0 : i.monitors) == null ? void 0 : c.physical) == null ? void 0 : u.penalty) ?? 0
    ), n = Number(
      ((d = i == null ? void 0 : i.condition) == null ? void 0 : d.fatiguePenalty) ?? ((p = (m = i == null ? void 0 : i.monitors) == null ? void 0 : m.fatigue) == null ? void 0 : p.penalty) ?? 0
    ), r = [];
    return Number.isFinite(a) && a !== 0 && r.push({
      id: "conditionPhysical",
      label: "Physical Penalty",
      value: a,
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
const Lf = {
  id: "burn",
  async collect(s) {
    var a, n;
    const e = s.actor;
    if (!e) return [];
    const t = Number(((n = (a = e.system) == null ? void 0 : a.burn) == null ? void 0 : n.value) ?? 0), i = Math.floor(t / 2);
    return i <= 0 ? [] : [{
      id: "burn",
      label: "Burn",
      value: -i,
      source: "Burn Track",
      domain: null
    }];
  }
};
class $f {
  constructor() {
    R(this, "id", "mwd.lifeModules");
    R(this, "label", "Life Modules");
  }
  collect({ actor: e, resolved: t } = {}) {
    return ad({ actor: e, resolved: t });
  }
}
class xf {
  constructor() {
    R(this, "id", "mwd.traits");
    R(this, "label", "Traits");
  }
  collect({ actor: e, resolved: t, payload: i } = {}) {
    var n, r, o;
    if (!e) return [];
    const a = {
      snapshot: ((o = (r = (n = game.mwd) == null ? void 0 : n.personalCombat) == null ? void 0 : r.getSnapshot) == null ? void 0 : o.call(r, e)) ?? null
    };
    return rt({
      actor: e,
      phase: "onBuildRoll",
      facts: Ln({ actor: e, resolved: t, payload: i, runtime: a }),
      packet: {},
      options: { runtime: a, consumeUsage: !1 }
    }).modifiers;
  }
}
function Bf() {
  Hooks.on("renderChatMessageHTML", (s, e) => {
    e.addEventListener("click", (t) => {
      const i = t.target.closest("[data-mwd-action]");
      if (!i) return;
      const a = String(i.dataset.mwdAction || "").trim();
      a && (a === "edgePostReroll" && jf(t, s), a === "applyAttackDamage" && Wf(t, s), a === "applyAllAttackDamage" && Hf(t, s));
    });
  });
}
function Ff(s = {}) {
  var t;
  return (Array.isArray((t = s == null ? void 0 : s.attackResult) == null ? void 0 : t.results) ? s.attackResult.results : []).some((i) => {
    var a;
    return !!((a = i == null ? void 0 : i.queuedMutation) != null && a.applied);
  });
}
function zf(s = {}) {
  var i, a, n;
  const e = (s == null ? void 0 : s.ctxSnapshot) ?? {}, t = Number(((i = s == null ? void 0 : s.dn) == null ? void 0 : i.total) ?? ((a = e == null ? void 0 : e.dn) == null ? void 0 : a.total) ?? ((n = e == null ? void 0 : e.difficulty) == null ? void 0 : n.dn) ?? 1);
  return {
    intent: (s == null ? void 0 : s.intent) ?? "unknown",
    rollType: (e == null ? void 0 : e.rollType) ?? "simple",
    difficulty: {
      ...e != null && e.difficulty && typeof e.difficulty == "object" ? e.difficulty : {},
      dn: Number.isFinite(t) ? t : 1
    },
    dn: (s == null ? void 0 : s.dn) ?? (e == null ? void 0 : e.dn) ?? null,
    opposed: (e == null ? void 0 : e.opposed) ?? null,
    net: (e == null ? void 0 : e.net) ?? null,
    edge: (e == null ? void 0 : e.edge) ?? null,
    domains: Array.isArray(s == null ? void 0 : s.domains) ? s.domains : [],
    attack: (s == null ? void 0 : s.attack) ?? null
  };
}
async function Uf(s = {}, e = null) {
  var n, r, o;
  const t = zf(s), i = Number(((n = s == null ? void 0 : s.outcome) == null ? void 0 : n.hits) ?? 0) || 0, a = ((r = s == null ? void 0 : s.outcomeModel) == null ? void 0 : r.edgeEarned) ?? null;
  return s.outcomeModel = Cl(t, { successes: i, raw: (o = s == null ? void 0 : s.roll) == null ? void 0 : o.json }, null), s.outcomeModel.edgeEarned = a, t.intent === "attack" && e && t.attack && (s.attackResult = await Pl({
    attacker: e,
    ctx: t,
    outcomeModel: s.outcomeModel
  })), s;
}
async function Wf(s, e) {
  var o, l, c, u, d, m, p;
  s.preventDefault();
  const t = s.target.closest("[data-mwd-action='applyAttackDamage']"), i = Number((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.resultIndex);
  if (!Number.isInteger(i) || i < 0) return;
  const a = foundry.utils.deepClone((c = (l = e == null ? void 0 : e.flags) == null ? void 0 : l.mwd) == null ? void 0 : c.resolved);
  if (!a) return;
  const n = await Nl(a, i);
  if (!n.ok) {
    (d = (u = ui.notifications) == null ? void 0 : u.warn) == null || d.call(u, n.reason ?? "Unable to apply attack damage.");
    return;
  }
  if (n.skipped) {
    (p = (m = ui.notifications) == null ? void 0 : m.info) == null || p.call(m, n.reason ?? "That attack damage has already been applied.");
    return;
  }
  const r = await oa({ resolved: a });
  await e.update({
    content: r,
    "flags.mwd.resolved": a
  });
}
async function Hf(s, e) {
  var l, c, u, d, m, p, f, h, g;
  s.preventDefault();
  const t = foundry.utils.deepClone((c = (l = e == null ? void 0 : e.flags) == null ? void 0 : l.mwd) == null ? void 0 : c.resolved);
  if (!t) return;
  const a = (Array.isArray((u = t == null ? void 0 : t.attackResult) == null ? void 0 : u.results) ? t.attackResult.results : []).map((y, b) => ({ result: y, index: b })).filter(({ result: y }) => (y == null ? void 0 : y.queuedMutation) && !y.queuedMutation.applied).map(({ index: y }) => y);
  if (!a.length) {
    (m = (d = ui.notifications) == null ? void 0 : d.info) == null || m.call(d, "No queued attack damage remains to apply.");
    return;
  }
  let n = 0;
  const r = [];
  for (const y of a) {
    const b = await Nl(t, y);
    b.ok && b.applied ? n += 1 : b.ok || r.push(b.reason ?? `Target ${y + 1} failed.`);
  }
  if (n <= 0) {
    (f = (p = ui.notifications) == null ? void 0 : p.warn) == null || f.call(p, r[0] ?? "Unable to apply queued attack damage.");
    return;
  }
  const o = await oa({ resolved: t });
  await e.update({
    content: o,
    "flags.mwd.resolved": t
  }), r.length && ((g = (h = ui.notifications) == null ? void 0 : h.warn) == null || g.call(h, `Applied ${n} queued damage result${n === 1 ? "" : "s"}; ${r.length} failed.`));
}
async function Nl(s, e) {
  var r, o, l, c;
  const t = ((o = (r = s == null ? void 0 : s.attackResult) == null ? void 0 : r.results) == null ? void 0 : o[e]) ?? null, i = (t == null ? void 0 : t.queuedMutation) ?? null;
  if (!i)
    return { ok: !1, reason: "No queued attack damage to apply." };
  if (i.applied)
    return { ok: !0, skipped: !0, reason: "That attack damage has already been applied." };
  let a = null;
  try {
    const u = (l = i.target) != null && l.actorUuid ? await fromUuid(i.target.actorUuid) : null, d = (c = i.target) != null && c.tokenUuid ? await fromUuid(i.target.tokenUuid) : null;
    a = await Ze.apply({
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
  const n = Ji(
    a,
    (t == null ? void 0 : t.target) ?? i.target ?? {},
    (t == null ? void 0 : t.damage) ?? {},
    { queued: !1, applied: !!(a != null && a.ok) }
  );
  return a != null && a.ok ? (i.applied = !0, i.appliedResult = n, t.queuedMutation = i, t.damageResult = n, s.edge ?? (s.edge = {}), s.edge.availableActions = {
    ...s.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, { ok: !0, applied: !0 }) : { ok: !1, reason: n.reason ?? "Unable to apply attack damage." };
}
async function jf(s, e) {
  var f, h, g, y, b, S, w, E, I, N, L, Y, Q, G, H, D, V, ee, X;
  s.preventDefault();
  const t = s.target.closest("[data-mwd-action='edgePostReroll']"), i = String(((f = t == null ? void 0 : t.dataset) == null ? void 0 : f.poolKey) ?? "").trim();
  if (!i) return;
  const a = foundry.utils.deepClone((g = (h = e == null ? void 0 : e.flags) == null ? void 0 : h.mwd) == null ? void 0 : g.resolved);
  if (!a) return;
  if (Ff(a)) {
    (b = (y = ui.notifications) == null ? void 0 : y.warn) == null || b.call(y, "Post-roll Edge is disabled after attack damage has been applied.");
    return;
  }
  if (Number(((w = (S = a == null ? void 0 : a.edge) == null ? void 0 : S.post) == null ? void 0 : w.spent) ?? 0) === 1) return;
  if (!(Array.isArray((I = (E = a == null ? void 0 : a.edge) == null ? void 0 : E.allowed) == null ? void 0 : I.postPools) ? a.edge.allowed.postPools : []).includes(i)) {
    (L = (N = ui.notifications) == null ? void 0 : N.warn) == null || L.call(N, `Post-spend pool not allowed: ${i}`);
    return;
  }
  const r = Array.isArray((Y = a == null ? void 0 : a.roll) == null ? void 0 : Y.failureDiceRefs) ? a.roll.failureDiceRefs : [];
  if (r.length <= 0) {
    (G = (Q = ui.notifications) == null ? void 0 : Q.info) == null || G.call(Q, "No failures to reroll.");
    return;
  }
  const o = await fromUuid(a.actorUuid);
  if (!o) {
    (D = (H = ui.notifications) == null ? void 0 : H.warn) == null || D.call(H, "Actor not found for this roll.");
    return;
  }
  await ((V = o.spendEdge) == null ? void 0 : V.call(o, i, 1));
  const l = Number(((ee = a == null ? void 0 : a.roll) == null ? void 0 : ee.target) ?? 5), u = (X = (await new Roll(`${r.length}d6cs>=${l}`).evaluate()).dice) == null ? void 0 : X[0], d = Array.isArray(u == null ? void 0 : u.results) ? u.results : [], m = d.filter((te) => te.success).length;
  a.outcome = a.outcome ?? {}, a.outcome.hits = Number(a.outcome.hits ?? 0) + m, a.edge = a.edge ?? {}, a.edge.post = { poolKey: i, spent: 1 }, a.edge.availableActions = {
    ...a.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, a.roll = a.roll ?? {}, a.roll.diceGroups = Array.isArray(a.roll.diceGroups) ? a.roll.diceGroups : [], a.roll.diceGroups.push({
    id: "post",
    label: "Post Reroll",
    faces: 6,
    termIndex: null,
    dice: d.map((te, ce) => {
      const Se = Number(te.result), O = !!te.success;
      return {
        ref: `post:${ce}`,
        face: Se,
        isSuccess: O,
        isFailure: !O,
        tooltip: O ? `Post die ${ce + 1}: ${Se} (Success vs TN ${l})` : `Post die ${ce + 1}: ${Se} (Failure vs TN ${l})`
      };
    })
  }), await Uf(a, o);
  const p = await oa({ resolved: a });
  await e.update({
    content: p,
    "flags.mwd.resolved": a,
    "flags.mwd.payload.edge.post": { poolKey: i, spent: 1 }
  });
}
function qf() {
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
function Gf() {
  return {
    get(s) {
      return lt(s);
    },
    getSkills({ withKnowledge: s = !1 } = {}) {
      return Bs();
    },
    list() {
      return Bs();
    }
  };
}
function Vf() {
  return {
    get(s) {
      return Qt(s);
    },
    list() {
      return ta();
    },
    listByType(s) {
      return Bn(s);
    },
    getTypeLabel(s) {
      return xi(s);
    },
    evaluate(s) {
      return Jt(s);
    }
  };
}
function Kf() {
  return {
    normalizeQualitySystem(s) {
      return nt(s);
    },
    getEditorConfig() {
      return $o();
    },
    evaluatePhase(s) {
      return rt(s);
    },
    applyMutations(s) {
      return Xt(s);
    },
    buildRollFacts(s) {
      return Ln(s);
    },
    buildActionCostFacts(s) {
      return Fo(s);
    },
    buildBurnFacts(s) {
      return Ha(s);
    },
    buildInitiativeFacts(s) {
      return zo(s);
    },
    buildDamageFacts(s) {
      return Uo(s);
    },
    buildEdgeFacts(s) {
      return ja(s);
    },
    buildEndOfActivationFacts(s) {
      return Wo(s);
    }
  };
}
class jn {
  static start() {
    const e = new jn();
    Hooks.once("init", () => e.onInit()), Hooks.once("ready", () => e.onReady());
  }
  async onInit() {
    console.log(fe + "AnarchySystem.onInit"), game.system.mwd = this, game.system.anarchy = this, game.mwd ?? (game.mwd = {}), qf(), Bf(), rm("mwd"), game.mwd.roll = Vr, game.mwd.personalCombat = de, game.mwd.harm = Ze, this.roll = Vr, this.personalCombat = de, this.harm = Ze, this.skills = Gf(), this.lifeModules = Vf(), this.traits = Kf(), this.remoteCall = new Ba(), game.system.mwd.skills = this.skills, game.system.mwd.lifeModules = this.lifeModules, game.system.mwd.traits = this.traits, game.mwd.skills = this.skills, game.mwd.lifeModules = this.lifeModules, game.mwd.traits = this.traits, oe.init(), this.modifiers = new ae(), Tt.register(new Df()), Tt.register(new If()), Tt.register(new Of()), Tt.register(new _f()), Tt.register(Lf), Tt.register(new $f()), Tt.register(new xf()), Tt.register(new $d()), Handlebars.registerHelper("mwdClassList", (e) => Array.isArray(e) ? e.join(" ") : typeof e == "string" ? e : ""), this.actorClasses = {
      character: wr,
      npc: wr,
      vehicle: sl,
      battlemech: Od
    }, this.hooks = new di(), this.styles = new Sd(), this.handlebarsManager = new Fn(), de.init(), Nm.register(), console.log(fe + "AnarchySystem.onInit | loading system"), CONFIG.ANARCHY = we, CONFIG.Combat.initiative = { formula: "2d6" }, CONFIG.statusEffects.push({
      id: "overloaded",
      name: "Overloaded",
      icon: "systems/mwd/img/icons/status/surge.svg"
    }), CONFIG.Actor.documentClass = sp, CONFIG.Item.documentClass = Bi, Bi.init(), Um(), Ym(), await Xm(), console.log(fe + "AnarchySystem.onInit | done");
  }
  async onReady() {
    if (console.log(fe + "AnarchySystem.onReady"), await de.onReady(), !game.user.isGM) return;
    await Xu();
    const e = game.settings.get(T, "enableGMGadget");
    if (!e) {
      console.log(`${fe}GMManager render skipped (enableGMGadget=false)`);
      return;
    }
    game.mwd = game.mwd ?? {}, game.mwd.gmGadget = () => om({ systemId: T }).render({ force: !0 }), e && game.mwd.gmGadget();
  }
}
jn.start();
//# sourceMappingURL=index.mjs.map
