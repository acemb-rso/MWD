var on = Object.defineProperty;
var ln = Object.getPrototypeOf;
var cn = Reflect.get;
var ba = (a) => {
  throw TypeError(a);
};
var un = (a, e, t) => e in a ? on(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var C = (a, e, t) => un(a, typeof e != "symbol" ? e + "" : e, t), oi = (a, e, t) => e.has(a) || ba("Cannot " + t);
var H = (a, e, t) => (oi(a, e, "read from private field"), t ? t.call(a) : e.get(a)), Se = (a, e, t) => e.has(a) ? ba("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), Ee = (a, e, t, s) => (oi(a, e, "write to private field"), s ? s.call(a, t) : e.set(a, t), t), E = (a, e, t) => (oi(a, e, "access private method"), t);
var Gt = (a, e, t) => cn(ln(a), t, e);
const ce = {
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
      positive: "Positive if checked"
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
}, S = ce, T = "mwd", dn = "MechWarrior: Destiny", vi = `system.${T}`, mn = T, Cs = `systems/${T}`, ar = `${Cs}/style`, ds = `${Cs}/third-party/style`, x = `systems/${T}/templates`, Zs = `${Cs}/img/icons`, q = `${Zs}/skills`, te = "MWD | ", pn = 2, hn = 5, fn = 4, rr = 8, Et = {
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
}, Ri = {
  autopilot: "autopilot",
  firewall: "firewall",
  knowledge: "knowledge"
}, _e = {
  grit: "grit",
  chaos: "chaos",
  insight: "insight",
  rumor: "rumor",
  legend: "legend",
  credibility: "credibility"
}, sa = {
  physical: [_e.grit, _e.chaos],
  mental: [_e.insight, _e.rumor],
  social: [_e.legend, _e.credibility]
}, y = {
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
  actorAttributes: Et,
  itemAttributes: Ri,
  attributes: { ...Et, ...Ri },
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
    edgePools: _e,
    edgePoolGroups: sa,
    physical: {
      grit: _e.grit,
      chaos: _e.chaos
    },
    mental: {
      insight: _e.insight,
      rumor: _e.rumor
    },
    social: {
      legend: _e.legend,
      credibility: _e.credibility
    },
    chaos: _e.chaos
  },
  area: {
    none: "none",
    shotgun: "shotgun",
    circle: "circle",
    cone: "cone",
    rect: "rect",
    ray: "ray"
  }
}, gn = Object.freeze({
  physical: "physical",
  mental: "mental",
  social: "social"
});
Object.freeze(Object.values(gn));
const ts = {
  [y.actorTypes.character]: [
    y.actorAttributes.strength,
    y.actorAttributes.reflexes,
    y.actorAttributes.willpower,
    y.actorAttributes.intelligence,
    y.actorAttributes.charisma,
    y.actorAttributes.edge
  ],
  [y.actorTypes.npc]: [
    y.actorAttributes.strength,
    y.actorAttributes.reflexes,
    y.actorAttributes.willpower,
    y.actorAttributes.intelligence,
    y.actorAttributes.charisma,
    y.actorAttributes.edge
  ],
  [y.actorTypes.vehicle]: [
    y.actorAttributes.handling,
    y.actorAttributes.system,
    y.actorAttributes.chassis,
    y.actorAttributes.condition
  ],
  [y.actorTypes.battlemech]: [
    y.actorAttributes.handling,
    y.actorAttributes.system,
    y.actorAttributes.chassis,
    y.actorAttributes.condition
  ]
}, li = {
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
}, Re = {
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
  SYSTEM_DESCRIPTION: dn,
  SYSTEM_SOCKET: vi,
  SYSTEM_SCOPE: mn,
  SYSTEM_PATH: Cs,
  STYLE_PATH: ar,
  THIRD_PARTY_STYLE_PATH: ds,
  TEMPLATES_PATH: x,
  ICONS_PATH: Zs,
  ICONS_SKILLS_PATH: q,
  LOG_HEAD: te,
  SPECIALIZATION_BONUS: pn,
  TARGET_SUCCESS: hn,
  TARGET_SUCCESS_EDGE: fn,
  BASE_MONITOR: rr,
  ACTOR_ATTRIBUTES: Et,
  ITEM_ATTRIBUTES: Ri,
  EDGE_POOL_GROUPS: sa,
  TEMPLATE: y,
  ANARCHY_SYSTEM: Re
};
const Je = class Je {
  static ascending(e = (t) => t) {
    return (t, s) => Je.sortingBy(e(t), e(s));
  }
  static descending(e = (t) => t) {
    return (t, s) => Je.sortingBy(e(s), e(t));
  }
  static sortingBy(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
  }
  static bySortedArray(e) {
    return (t) => e.indexOf(t);
  }
  static ascendingBySortedArray(e) {
    return Je.ascending(Je.bySortedArray(e));
  }
  static sortedMap(e, t = (s, i) => 0) {
    return Object.keys(e).sort(t).reduce(
      (s, i) => (s[i] = e[i], s),
      {}
    );
  }
  static reindexIds(e) {
    let t = 1;
    return e.forEach((s) => s.id = t++), e;
  }
  static distinct(e) {
    return [...new Set(e)];
  }
  static sum() {
    return (e, t) => e + t;
  }
  static sumValues(e, t = (s) => s) {
    return e.map(t).filter((s) => s != null).reduce(Je.sum(), 0);
  }
  static divint(e, t) {
    return Math.floor(e / t);
  }
  static divup(e, t) {
    return Math.ceil(e / t);
  }
  static join(e, t = "") {
    return e.reduce(Je.joiner(t));
  }
  static joiner(e = "") {
    return (t, s) => t + e + s;
  }
  static classify(e, t = (s) => s.type) {
    let s = {};
    return Je.classifyInto(s, e, t), s;
  }
  static classifyFirst(e, t) {
    let s = {};
    for (const i of e) {
      const r = t(i);
      s[r] || (s[r] = i);
    }
    return s;
  }
  static classifyInto(e, t, s = (i) => i.type) {
    for (const i of t) {
      const r = s(i);
      let n = e[r];
      n || (n = [], e[r] = n), n.push(i);
    }
  }
  static showControlWhen(e, t) {
    t ? e.show() : e.hide();
  }
  static minmax(e, t, s) {
    return Math.max(t, Math.min(e, s));
  }
};
C(Je, "isString", (e) => typeof e == "string" || e instanceof String);
let V = Je;
const yn = {
  keyword: "keywords",
  disposition: "dispositions",
  cue: "cues"
}, P = class P {
  /**
   * Initialize enum caches.
   * Call once during system init/setup after config/constants are available.
   */
  static init() {
    var t, s, i, r, n, o, l, c, u, d, m, h;
    P.hbsAttributes = P.mapObjectToKeyValue(S.attributes).filter((g) => g.value !== "knowledge" && g.value !== "noAttribute"), P.hbsItemTypes = P.mapObjectToKeyValue(S.itemType), P.hbsMonitors = P.mapObjectToKeyValue(S.monitor), P.hbsMonitorLetters = P.mapObjectToKeyValue(S.monitorLetter), P.hbsAssetModuleCategories = P.mapObjectToKeyValue(S.assetModuleCategory), (s = (t = S.item) == null ? void 0 : t.lifeModule) != null && s.type ? P.hbsLifeModuleTypes = P.mapObjectToKeyValue(S.item.lifeModule.type) : (console.warn("MWD | MWD.item.lifeModule.type is missing; life module enums disabled."), P.hbsLifeModuleTypes = []), P.hbsAreas = P.mapObjectToKeyValue(S.area), P.hbsRanges = P.mapObjectToKeyValue(S.range), P.hbsVehicleCategories = P.mapObjectToKeyValue(S.vehicleCategory), P.hbsMwdWeightClasses = P.mapObjectToKeyValue((i = S.mwd) == null ? void 0 : i.weightClass), P.hbsMwdHardpointTypes = P.mapObjectToKeyValue((r = S.mwd) == null ? void 0 : r.hardpointType), P.hbsMwdHardpointSizes = P.mapObjectToKeyValue((n = S.mwd) == null ? void 0 : n.hardpointSize), P.hbsMwdHardpointLocations = P.mapObjectToKeyValue((o = S.mwd) == null ? void 0 : o.hardpointLocation), P.hbsMwdPrimaryModes = P.mapObjectToKeyValue((l = S.mwd) == null ? void 0 : l.primarySlotMode), P.hbsMwdWeaponCategories = P.mapObjectToKeyValue((c = S.mwd) == null ? void 0 : c.weaponCategory), P.hbsMwdWeaponDamageTypes = P.mapObjectToKeyValue((u = S.mwd) == null ? void 0 : u.weaponDamageType), P.hbsPersonalWeaponDamageTypes = P.mapObjectToKeyValue((d = S.mwd) == null ? void 0 : d.personalDamageType), P.hbsPersonalWeaponDamageCategories = P.mapObjectToKeyValue((m = S.mwd) == null ? void 0 : m.personalDamageCategory), P.hbsMwdMeleeLocations = P.mapObjectToKeyValue((h = S.mwd) == null ? void 0 : h.meleeLocation), P.hbsDamageTypes = V.distinct(
      (P.hbsMwdWeaponDamageTypes ?? []).concat(P.hbsPersonalWeaponDamageTypes ?? []),
      (g) => g.value
    );
    const e = Object.values(ts).flat();
    P.sortedAttributeKeys = V.distinct(
      e.concat(Object.keys(S.attributes ?? {}))
    ), P.registerHandleBarHelpers(), P.ENUMS = P.getEnums();
  }
  static registerHandleBarHelpers() {
    typeof Handlebars > "u" || Handlebars.registerHelper("sortedAttributes", (e) => {
      if (!e || typeof e != "object") return [];
      const t = Object.keys(e), s = P.sortedAttributeKeys ?? [], i = new Map(s.map((r, n) => [r, n]));
      return t.sort((r, n) => {
        const o = i.has(r) ? i.get(r) : 9999, l = i.has(n) ? i.get(n) : 9999;
        return o !== l ? o - l : String(r).localeCompare(String(n));
      }), t.map((r) => {
        const n = e[r];
        return n && typeof n == "object" ? { key: r, ...n } : { key: r, value: n };
      });
    });
  }
  static getDamageTypes() {
    return P.hbsDamageTypes ?? [];
  }
  static getAttributes(e = () => !0) {
    return (P.hbsAttributes ?? []).filter((t) => e(t.value));
  }
  static getActorWordTypes() {
    return yn;
  }
  static getMonitors() {
    return P.hbsMonitors ?? [];
  }
  /**
   * Returns a big blob of enums suitable for sheet contexts.
   * `withKnowledge` is passed through to the skills service.
   */
  static getEnums(e = () => !0, t = !1) {
    return {
      attributes: P.getAttributes(e),
      itemTypes: P.hbsItemTypes ?? [],
      monitors: P.hbsMonitors ?? [],
      monitorLetters: P.hbsMonitorLetters ?? [],
      assetModuleCategories: P.hbsAssetModuleCategories ?? [],
      lifeModuleTypes: P.hbsLifeModuleTypes ?? [],
      areas: P.hbsAreas ?? [],
      ranges: P.hbsRanges ?? [],
      vehicleCategories: P.hbsVehicleCategories ?? [],
      // Skills: now sourced from MWD namespace (with safe fallback)
      skills: P.getSkillsEnum({ withKnowledge: t }),
      // MWD enums
      mwdWeightClasses: P.hbsMwdWeightClasses ?? [],
      mwdHardpointTypes: P.hbsMwdHardpointTypes ?? [],
      mwdHardpointSizes: P.hbsMwdHardpointSizes ?? [],
      mwdHardpointLocations: P.hbsMwdHardpointLocations ?? [],
      mwdPrimaryModes: P.hbsMwdPrimaryModes ?? [],
      mwdWeaponCategories: P.hbsMwdWeaponCategories ?? [],
      mwdWeaponDamageTypes: P.hbsMwdWeaponDamageTypes ?? [],
      personalWeaponDamageTypes: P.hbsPersonalWeaponDamageTypes ?? [],
      personalWeaponDamageCategories: P.hbsPersonalWeaponDamageCategories ?? [],
      damageTypes: P.hbsDamageTypes ?? [],
      mwdMeleeLocations: P.hbsMwdMeleeLocations ?? []
    };
  }
  static getSkillsEnum({ withKnowledge: e = !1 } = {}) {
    var i, r, n, o, l;
    const t = ((r = (i = game == null ? void 0 : game.system) == null ? void 0 : i.mwd) == null ? void 0 : r.skills) ?? ((o = (n = game == null ? void 0 : game.system) == null ? void 0 : n.anarchy) == null ? void 0 : o.skills);
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
  static mapObjectToKeyValue(e, t = "value", s = "label") {
    return !e || typeof e != "object" ? [] : Object.keys(e).map((i) => {
      const r = e[i];
      let n;
      return r && typeof r == "object" ? n = r.label ?? r.name ?? r.value ?? String(i) : r != null ? n = String(r) : n = String(i), {
        [t]: i,
        [s]: n
      };
    });
  }
  // Backwards-compat alias (the legacy file misspelled this)
  static mapObjetToKeyValue(e, t = "value", s = "label") {
    return P.mapObjectToKeyValue(e, t, s);
  }
};
C(P, "ENUMS"), // HBS-friendly arrays of { value, label } (or key/value depending on caller)
C(P, "hbsAttributes"), C(P, "hbsItemTypes"), C(P, "hbsMonitors"), C(P, "hbsMonitorLetters"), C(P, "hbsAssetModuleCategories"), C(P, "hbsLifeModuleTypes"), C(P, "hbsAreas"), C(P, "hbsRanges"), C(P, "hbsVehicleCategories"), // MWD-specific enum groups
C(P, "hbsMwdWeightClasses"), C(P, "hbsMwdHardpointTypes"), C(P, "hbsMwdHardpointSizes"), C(P, "hbsMwdHardpointLocations"), C(P, "hbsMwdPrimaryModes"), C(P, "hbsMwdWeaponCategories"), C(P, "hbsMwdWeaponDamageTypes"), C(P, "hbsPersonalWeaponDamageTypes"), C(P, "hbsPersonalWeaponDamageCategories"), C(P, "hbsDamageTypes"), C(P, "hbsMwdMeleeLocations"), C(P, "sortedAttributeKeys");
let Q = P;
class bn {
  static monitor(e) {
    return Q.getFromList(Q.getMonitors(), e) ?? "";
  }
  static letter(e) {
    return Q.getFromList(Q.getMonitorLetters(), e) ?? "";
  }
}
class Sn {
  static toLowerCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}
const wn = [
  "fas fa-dice",
  "fas fa-dice-one",
  "fas fa-dice-two",
  "fas fa-dice-three",
  "fas fa-dice-four",
  "fas fa-dice-five",
  "fas fa-dice-six"
];
class _ {
  static fontAwesome(e) {
    return `<i class="${e}"></i>`;
  }
  static iconSystemPath(e, t) {
    return _.iconPath(`${ar}/${e}`, t);
  }
  static iconPath(e, t) {
    return `<img class="${t}" src="${e}" />`;
  }
  static iconD6(e) {
    if (e < 0 || e > 6)
      throw `Dice ${e} is out of dice range [1..6] or 0 for multidice`;
    return _.fontAwesome(wn[e]);
  }
}
globalThis.ANARCHY_ICONS = _;
const re = (a, e = {}) => a.replace(/\{(.*?)\}/g, (t, s) => e[s] ?? ""), nr = Object.freeze({
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}), Vs = Object.freeze(
  Object.entries(nr).map(([a, e]) => ({ value: a, label: e }))
), An = Object.freeze({
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
}), Tn = Object.freeze(
  Vs.map((a) => a.value)
), ss = Object.freeze({
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
}), ei = Object.freeze({
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
}), kn = Object.freeze(
  Object.values(ss).map((a) => ({
    value: a.key,
    label: a.label,
    rated: a.rated
  }))
), Mn = Object.freeze(
  Object.values(ei).map((a) => ({
    value: a.key,
    label: a.label,
    rated: a.rated
  }))
), or = dr(ss), lr = dr(ei);
Object.freeze(
  Object.fromEntries(
    Object.values(ss).flatMap((a) => [a.key, ...a.aliases ?? []].map((t) => [String(t).trim().toLowerCase(), a.resolve]))
  )
);
function ti(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => ti(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function lt(a, e = "penetrating") {
  const t = String(a ?? "").trim().toLowerCase();
  return An[t] ?? e;
}
function cr(a) {
  const e = String(a ?? "").trim();
  return e ? lt(e, "") : "";
}
function ur(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return Tn.includes(e);
}
function Rt(a) {
  const e = lt(a, "");
  return nr[e] ?? String(a ?? "").trim();
}
function nt(a) {
  const e = a ?? {}, t = Number(e.ballistic ?? 0) || 0, s = Number(e.melee ?? 0) || 0;
  return {
    penetrating: e.penetrating !== void 0 ? Number(e.penetrating ?? 0) || 0 : Math.max(t, s),
    concussive: e.concussive !== void 0 ? Number(e.concussive ?? 0) || 0 : Number(e.explosive ?? 0) || 0,
    energy: Number(e.energy ?? 0) || 0,
    thermal: Number(e.thermal ?? 0) || 0,
    electrical: Number(e.electrical ?? 0) || 0
  };
}
function Ls(a) {
  return ti(a);
}
function Ze(a) {
  return ti(a);
}
function is(a = "id") {
  var t, s;
  const e = (s = (t = globalThis.foundry) == null ? void 0 : t.utils) == null ? void 0 : s.randomID;
  return typeof e == "function" ? e() : `${a}-${Math.random().toString(36).slice(2, 10)}`;
}
function dr(a) {
  const e = {};
  return Object.values(a).forEach((t) => {
    [t.key, ...t.aliases ?? []].forEach((s) => {
      e[ks(s)] = t.key;
    });
  }), Object.freeze(e);
}
function ks(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function ns(a) {
  return Array.isArray(a) ? a : a && typeof a == "object" ? Object.values(a) : a == null || a === "" ? [] : [a];
}
function mr(a, e) {
  return ns(a).map((t) => Pn(t, e)).filter(Boolean);
}
function Pn(a, e) {
  if (typeof a == "string" || typeof a == "number") {
    const s = e[ks(a)];
    return s ? { id: is("trait"), key: s, rating: 1 } : null;
  }
  if (!a || typeof a != "object") return null;
  const t = e[ks(a.key ?? a.value ?? a.name)];
  return t ? {
    id: String(a.id ?? "").trim() || is("trait"),
    key: t,
    rating: Math.max(0, Number(a.rating ?? 0) || 0)
  } : null;
}
function $e(a) {
  return mr(a, or);
}
function st(a) {
  return mr(a, lr);
}
function Gs(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function En(a = {}, e = {}) {
  const t = Gs(a), s = Gs(e);
  return {
    close: t.close + s.close,
    near: t.near + s.near,
    far: t.far + s.far,
    extreme: t.extreme + s.extreme
  };
}
function Cn(a, e) {
  var t;
  return ((t = e[a]) == null ? void 0 : t.label) ?? a;
}
function ia(a, e) {
  var i;
  const t = Cn(a == null ? void 0 : a.key, e), s = Math.max(0, Number((a == null ? void 0 : a.rating) ?? 0) || 0);
  return (i = e[a == null ? void 0 : a.key]) != null && i.rated && s > 0 ? `${t} ${s}` : t;
}
function pr(a, e) {
  return ns(a).map((t) => {
    const s = t == null ? void 0 : t.key, i = e[s];
    return i != null && i.resolve ? {
      entry: t,
      effect: i.resolve(t),
      label: ia(t, e)
    } : null;
  }).filter(Boolean);
}
function vn(a, e) {
  const t = { ...a ?? {} };
  return Object.entries(e ?? {}).forEach(([s, i]) => {
    t[s] = (Number(t[s] ?? 0) || 0) + (Number(i ?? 0) || 0);
  }), t;
}
function Rn(a = []) {
  const e = {}, t = /* @__PURE__ */ new Set();
  for (const s of a.filter(Boolean)) {
    s.accuracyMod !== void 0 && (e.accuracyMod = (Number(e.accuracyMod ?? 0) || 0) + (Number(s.accuracyMod ?? 0) || 0)), s.ap !== void 0 && (e.ap = (Number(e.ap ?? 0) || 0) + (Number(s.ap ?? 0) || 0)), s.addHeat !== void 0 && (e.addHeat = (Number(e.addHeat ?? 0) || 0) + (Number(s.addHeat ?? 0) || 0)), s.bonusVsArmorTag && (e.bonusVsArmorTag = vn(e.bonusVsArmorTag, s.bonusVsArmorTag));
    for (const i of s.flags ?? []) {
      const r = String(i ?? "").trim();
      r && t.add(r);
    }
  }
  return t.size > 0 && (e.flags = Array.from(t)), e;
}
function Nn(a = [], e = []) {
  const t = Array.isArray(a) || typeof a == "string" ? { traits: a, standardTraits: e } : a ?? {}, s = Ze(t.traits), i = $e(t.standardTraits), r = pr(i, ss), n = s.map((o) => {
    var u;
    const l = or[ks(o)];
    if (!l) return null;
    const c = (u = ss[l]) == null ? void 0 : u.resolve;
    return typeof c == "function" ? c({ key: l, rating: 1 }) : null;
  });
  return Rn([
    ...r.map((o) => o.effect),
    ...n
  ]);
}
function Dn({ traits: a = [], standardTraits: e = [] } = {}) {
  return [
    ...Ze(a),
    ...$e(e).map((s) => ia(s, ss))
  ].filter(Boolean);
}
function In(a) {
  const e = a ?? {};
  return {
    id: String(e.id ?? "").trim() || is("ammo"),
    name: String(e.name ?? "").trim() || "Ammo",
    damageType: cr(e.damageType),
    apMod: Number(e.apMod ?? e.ap ?? 0) || 0,
    attackRatingBandMod: Gs(e.attackRatingBandMod ?? e.attackRatingBand),
    standardTraits: $e(e.standardTraits),
    traits: Ze(e.traits)
  };
}
function On(a) {
  var l;
  const e = a ?? {}, t = Math.max(0, Number(e.max ?? 0) || 0), s = Number(e.current), i = Number.isFinite(s) ? Math.max(0, Math.min(s, t > 0 ? t : s)) : Math.max(0, t), r = ns(e.types).map(In), n = String(e.activeTypeId ?? "").trim(), o = r.some((c) => c.id === n) ? n : ((l = r[0]) == null ? void 0 : l.id) ?? "";
  return {
    current: i,
    max: t,
    consumePerAttack: Math.max(1, Number(e.consumePerAttack ?? 1) || 1),
    activeTypeId: o,
    types: r
  };
}
function _n(a, e = "untracked") {
  const t = String(a ?? "").trim();
  return t ? t === "linked" ? "internal" : t === "perAttack" ? e : ["untracked", "internal", "actorResource", "itemRef"].includes(t) ? t : e : e;
}
function Ni(a = {}) {
  const e = a ?? {};
  return {
    amount: Math.max(1, Number(e.amount ?? e.consumePerUse ?? e.consumePerAttack ?? 1) || 1),
    sourceId: String(e.sourceId ?? "").trim()
  };
}
function Sa(a = {}) {
  const e = a ?? {};
  return {
    damageType: cr(e.damageType),
    ap: Number(e.ap ?? e.apMod ?? 0) || 0,
    attackRatingBand: Gs(e.attackRatingBand ?? e.attackRatingBandMod),
    standardTraits: $e(e.standardTraits),
    traits: Ze(e.traits)
  };
}
function wa(a = {}) {
  const e = a ?? {}, t = String(e.resolverKey ?? e.damageModel ?? e.resolver ?? "standard").trim() || "standard", s = String(e.damageModel ?? "").trim(), i = e.onHitEffect;
  return {
    resolverKey: t,
    damageModel: s,
    onHitEffect: i === null ? null : String(i ?? "").trim() || null
  };
}
function $n(a) {
  return String(a ?? "").trim().toLowerCase() === "unloaded";
}
function Be(a) {
  const e = a ?? {}, t = String(e.id ?? "").trim() || is("payload");
  return $n(t) ? {
    id: "unloaded",
    label: "Unloaded",
    family: "state",
    compatibleWith: [],
    modifies: Sa({}),
    resolution: wa({ resolverKey: "standard" }),
    consumption: Ni({ amount: 1, sourceId: "" })
  } : {
    id: t,
    label: String(e.label ?? e.name ?? "").trim() || "Payload",
    family: String(e.family ?? e.kind ?? "munition").trim() || "munition",
    compatibleWith: ti(e.compatibleWith ?? e.compatible),
    modifies: Sa(e.modifies ?? e),
    resolution: wa(e.resolution ?? e),
    consumption: Ni(e.consumption ?? e)
  };
}
function vt(a) {
  var o, l, c, u, d, m;
  const e = a ?? {}, t = _n(
    e.kind || e.type || ((o = e.link) != null && o.actorPath || e.actorPath ? "actorResource" : "") || ((l = e.link) != null && l.itemId || e.itemId || (c = e.link) != null && c.itemPath || e.itemPath ? "itemRef" : "") || (e.tracking || e.current !== void 0 || e.max !== void 0 ? "internal" : "") || "untracked",
    "untracked"
  ), s = e.tracking ?? e, i = Math.max(0, Number(s.max ?? 0) || 0), r = Number(s.current), n = Number.isFinite(r) ? Math.max(0, Math.min(r, i > 0 ? i : r)) : Math.max(0, i);
  return {
    id: String(e.id ?? "").trim() || is("source"),
    label: String(e.label ?? e.name ?? "").trim() || "Source",
    kind: t,
    tracking: {
      current: n,
      max: i
    },
    link: {
      actorPath: String(((u = e.link) == null ? void 0 : u.actorPath) ?? e.actorPath ?? "").trim(),
      itemId: String(((d = e.link) == null ? void 0 : d.itemId) ?? e.itemId ?? "").trim(),
      itemPath: String(((m = e.link) == null ? void 0 : m.itemPath) ?? e.itemPath ?? "").trim()
    }
  };
}
function hr() {
  return {
    payloads: [Be({
      id: "unloaded",
      label: "Unloaded",
      family: "munition",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    })],
    selectedPayloadId: "unloaded",
    consumptionSources: [vt({
      id: "untracked",
      label: "Untracked",
      kind: "untracked"
    })]
  };
}
function fr(a) {
  return String(a ?? "").trim().toLowerCase() === "melee";
}
function Di(a = []) {
  const e = ns(a).map(Be).filter(Boolean);
  return e.some((t) => t.id === "unloaded") ? e : [
    Be({
      id: "unloaded",
      label: "Unloaded",
      family: "munition",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }),
    ...e
  ];
}
function si(a = {}) {
  var c;
  const e = On(a), t = Math.max(1, Number(e.consumePerAttack ?? 1) || 1), s = e.max > 0, i = s ? "internal-magazine" : "untracked", r = [vt(s ? {
    id: i,
    label: "Internal Source",
    kind: "internal",
    tracking: {
      current: e.current,
      max: e.max
    }
  } : {
    id: i,
    label: "Untracked",
    kind: "untracked",
    tracking: {}
  })], n = e.types.length ? e.types.map((u) => Be({
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
      sourceId: s ? i : ""
    }
  })) : [Be({
    id: "unloaded",
    label: "Unloaded",
    family: "munition",
    resolution: { resolverKey: "standard" },
    consumption: {
      amount: t,
      sourceId: s ? i : ""
    }
  })], o = Di(n), l = o.some((u) => u.id === e.activeTypeId) ? e.activeTypeId : ((c = o[0]) == null ? void 0 : c.id) ?? "unloaded";
  return {
    payloads: o,
    selectedPayloadId: l,
    consumptionSources: r
  };
}
function it(a, { legacyAmmo: e = null, category: t = "" } = {}) {
  if (fr(t)) return [];
  const s = ns(a).map(Be).filter(Boolean);
  return s.length > 0 ? Di(s) : e ? Di(si(e).payloads) : hr().payloads;
}
function ms(a, { legacyAmmo: e = null } = {}) {
  const t = ns(a).map(vt).filter(Boolean);
  return t.length > 0 ? t : e ? si(e).consumptionSources : hr().consumptionSources;
}
function Yt(a, e = [], { legacyAmmo: t = null, category: s = "" } = {}) {
  var n;
  if (fr(s)) return "";
  const i = it(e, { legacyAmmo: t, category: s }), r = String(a ?? "").trim();
  if (i.some((o) => o.id === r)) return r;
  if (t) {
    const o = si(t).selectedPayloadId;
    if (i.some((l) => l.id === o)) return o;
  }
  return ((n = i[0]) == null ? void 0 : n.id) ?? "unloaded";
}
function Aa({ root: a = null, path: e = "", fallback: t = {} } = {}) {
  const s = String(e ?? "").trim();
  if (!a || !s)
    return {
      current: Math.max(0, Number(t.current ?? 0) || 0),
      max: Math.max(0, Number(t.max ?? 0) || 0),
      currentPath: s
    };
  const i = foundry.utils.getProperty(a, s);
  if (i && typeof i == "object") {
    const o = Math.max(0, Number(i.max ?? t.max ?? 0) || 0), l = Number(i.current);
    return {
      current: Number.isFinite(l) ? Math.max(0, Math.min(l, o > 0 ? o : l)) : Math.max(0, o),
      max: o,
      currentPath: `${s}.current`
    };
  }
  const r = Math.max(0, Number(i ?? t.current ?? 0) || 0), n = Math.max(r, Math.max(0, Number(t.max ?? 0) || 0));
  return {
    current: n > 0 ? Math.min(r, n) : r,
    max: n,
    currentPath: s
  };
}
function Ln({ source: a = null, actor: e = null } = {}) {
  var s, i, r, n, o, l, c;
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
    actorPath: String(((s = a.link) == null ? void 0 : s.actorPath) ?? "").trim(),
    itemId: String(((i = a.link) == null ? void 0 : i.itemId) ?? "").trim(),
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
    const u = Aa({
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
    const u = ((c = (l = e == null ? void 0 : e.items) == null ? void 0 : l.get) == null ? void 0 : c.call(l, t.itemId)) ?? null, d = Aa({
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
function Ii({
  payloads: a = [],
  selectedPayloadId: e = "",
  consumptionSources: t = [],
  actor: s = null,
  payloadId: i = "",
  category: r = ""
} = {}) {
  const n = it(a, { category: r }), o = ms(t), l = Yt(i || e, n, { category: r }), c = n.find((h) => h.id === l) ?? n[0] ?? null, u = (c == null ? void 0 : c.consumption) ?? Ni(), d = u.sourceId ? o.find((h) => h.id === u.sourceId) ?? null : o.find((h) => h.kind === "untracked") ?? vt({
    id: "untracked",
    label: "Untracked",
    kind: "untracked"
  }), m = Ln({ source: d, actor: s });
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
function xn({
  damageType: a = "penetrating",
  ap: e = 0,
  attackRatingBand: t = {},
  traits: s = [],
  standardTraits: i = [],
  payloads: r = [],
  selectedPayloadId: n = "",
  consumptionSources: o = [],
  payloadId: l = "",
  actor: c = null,
  ammo: u = null,
  ammoTypeId: d = "",
  category: m = ""
} = {}) {
  var R, F, I, W, U, G, Y;
  const h = Ii({
    payloads: r != null && r.length ? r : void 0,
    selectedPayloadId: n || d,
    consumptionSources: o,
    actor: c,
    payloadId: l || d,
    category: m
  }), b = ((!r || r.length === 0) && u ? Ii({
    ...si(u),
    actor: c,
    payloadId: l || d,
    category: m
  }) : null) ?? h, p = b.activePayload, f = [
    ...$e(i),
    ...$e((R = p == null ? void 0 : p.modifies) == null ? void 0 : R.standardTraits)
  ], w = [
    ...Ze(s),
    ...Ze((F = p == null ? void 0 : p.modifies) == null ? void 0 : F.traits)
  ], M = Nn({
    traits: w,
    standardTraits: f
  }), k = {
    ...b.sourceState
  };
  return delete k.sourceItem, {
    damageType: ((I = p == null ? void 0 : p.modifies) == null ? void 0 : I.damageType) || lt(a),
    ap: (Number(e ?? 0) || 0) + (Number(((W = p == null ? void 0 : p.modifies) == null ? void 0 : W.ap) ?? 0) || 0),
    attackRatingBand: En(
      t,
      ((U = p == null ? void 0 : p.modifies) == null ? void 0 : U.attackRatingBand) ?? {}
    ),
    effects: M,
    traits: Dn({
      traits: w,
      standardTraits: f
    }),
    standardTraits: f,
    payloadLabel: b.payloadLabel,
    payload: p ? foundry.utils.deepClone(p) : null,
    payloadState: {
      payloads: b.payloads.map((D) => foundry.utils.deepClone(D)),
      activePayloadId: b.activePayloadId,
      payloadLabel: b.payloadLabel,
      sourceId: ((G = b.source) == null ? void 0 : G.id) ?? "",
      sourceLabel: b.sourceState.label ?? "",
      sourceKind: b.sourceState.kind ?? "untracked",
      isTracked: b.sourceState.isTracked,
      current: b.sourceState.current,
      max: b.sourceState.max,
      consumePerUse: b.sourceState.consumePerUse
    },
    source: b.source ? foundry.utils.deepClone(b.source) : null,
    sourceState: foundry.utils.deepClone(k),
    resolverKey: String(((Y = p == null ? void 0 : p.resolution) == null ? void 0 : Y.resolverKey) ?? "standard").trim() || "standard",
    ammoLabel: b.payloadLabel,
    ammoType: p ? foundry.utils.deepClone(p) : null,
    ammoState: {
      current: k.current,
      max: k.max,
      consumePerAttack: k.consumePerUse,
      activeTypeId: b.activePayloadId,
      types: b.payloads.map((D) => {
        var Z;
        return {
          id: D.id,
          name: D.label,
          damageType: ((Z = D.modifies) == null ? void 0 : Z.damageType) ?? ""
        };
      }),
      isTracked: k.isTracked,
      ammoLabel: b.payloadLabel
    }
  };
}
function gr(a = {}, e = {}) {
  const t = nt(a), s = nt(e);
  return {
    penetrating: t.penetrating + s.penetrating,
    concussive: t.concussive + s.concussive,
    energy: t.energy + s.energy,
    thermal: t.thermal + s.thermal,
    electrical: t.electrical + s.electrical
  };
}
function ci({ standardTraits: a = [], traits: e = [], traitState: t = {} } = {}) {
  var m, h;
  const s = st(a), r = Ze(e).map((g) => {
    const b = lr[ks(g)];
    return b ? { id: is("trait"), key: b, rating: b === "reinforced" ? 1 : 0 } : null;
  }).filter(Boolean), n = pr(
    [...s, ...r],
    ei
  ), o = n.reduce((g, b) => {
    var p;
    return gr(g, ((p = b.effect) == null ? void 0 : p.mitigationByType) ?? {});
  }, nt({})), l = n.reduce(
    (g, b) => {
      var p;
      return g + Math.max(0, Number(((p = b.effect) == null ? void 0 : p.reinforced) ?? 0) || 0);
    },
    0
  ), c = Number((m = t == null ? void 0 : t.reinforced) == null ? void 0 : m.current), u = Number((h = t == null ? void 0 : t.reinforced) == null ? void 0 : h.max), d = Number.isFinite(c) ? c : Number.isFinite(u) ? u : l;
  return {
    mitigationByType: o,
    reinforcedMax: l,
    traitState: {
      reinforced: {
        current: Math.min(l, Math.max(0, d || 0)),
        max: l
      }
    },
    labels: n.map((g) => g.label),
    standardTraits: s
  };
}
function Fn({ traits: a = [], standardTraits: e = [] } = {}) {
  return [
    ...Ze(a),
    ...st(e).map((s) => ia(s, ei))
  ].filter(Boolean);
}
function aa(a) {
  const e = Math.max(0, Number(a ?? 0) || 0);
  return e <= 0 ? 0 : Math.ceil(e / 4);
}
function Bn({
  currentArmorRating: a = 0,
  mitigationByType: e = {},
  damageType: t
} = {}) {
  const s = Math.max(0, Number(a ?? 0) || 0);
  if (s <= 0)
    return {
      currentArmorRating: 0,
      baseMitigation: 0,
      typeMitigationMod: 0,
      totalMitigation: 0,
      isDestroyed: !0
    };
  const i = lt(t, "penetrating"), r = nt(e), n = aa(s), o = Number(r[i] ?? 0) || 0;
  return {
    currentArmorRating: s,
    baseMitigation: n,
    typeMitigationMod: o,
    totalMitigation: n + o,
    isDestroyed: !1
  };
}
function zn({ damageIncoming: a = 0, armorTags: e = [], effects: t = {} } = {}) {
  const s = new Set(Ls(e));
  let i = Number(a ?? 0) || 0;
  const r = [];
  return Object.entries((t == null ? void 0 : t.bonusVsArmorTag) ?? {}).forEach(([n, o]) => {
    if (!s.has(n)) return;
    const l = Number(o ?? 0) || 0;
    l && (i *= 1 + l, r.push({ tag: n, bonus: l }));
  }), {
    damageIncoming: i,
    applied: r
  };
}
class Vt {
  static checkSufficient(e, t, s) {
    if (t > s) {
      const i = re(S.common.errors.insufficient, {
        resource: e,
        required: t,
        available: s
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkOutOfRange(e, t, s, i) {
    if (t < s || t > i) {
      const r = re(S.common.errors.outOfRange, {
        resource: e,
        value: t,
        min: s,
        max: i
      });
      throw ui.notifications.error(r), r;
    }
  }
  static checkUserGM() {
    if (!game.user.isGM) {
      const e = S.common.errors.onlyGM;
      throw ui.notifications.error(e), e;
    }
  }
  static checkItemType(e, t) {
    if (e.type != t) {
      const s = re(S.common.errors.expectedType, {
        type: e.type ? S.itemType.singular[e.type] : e.type,
        expectedType: t
      });
      throw ui.notifications.error(s), s;
    }
  }
  static checkActorCanReceiveDamage(e, t, s) {
    if (!t) {
      const i = re(S.common.errors.actorCannotReceiveDamage, {
        actor: s.name,
        damageType: ur(e) ? Rt(e) : S.actor.monitors[e] ?? S.mwd.weaponDamageType[e] ?? S.mwd.personalDamageType[e] ?? e
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkWeaponDefense(e, t) {
    var i;
    const s = e.getDefense();
    if ((((i = e.isPersonalWeapon) == null ? void 0 : i.call(e)) ?? e.type === y.itemType.personalWeapon) && !s) {
      const r = re(S.common.errors.noDefenseOnWeapon, { actor: t.name, weapon: e.name });
      throw ui.notifications.error(r), r;
    }
  }
  static checkTargetsCount(e, t, s) {
    if (e > 0 && t.length > e) {
      const i = re(S.common.errors.maxTargetsExceedeed, {
        weapon: this.name,
        area: S.area[s],
        count: t.length,
        max: e
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkActorDefenseAction(e, t, s) {
    if (!e) {
      const i = re(S.common.errors.actorDoesNotHaveDefense, {
        actor: t.name,
        defense: s.labelkey,
        actorType: S.actorType[t.type]
      });
      throw ui.notifications.error(i), i;
    }
  }
}
function Ye(a, e, t, s, i, r = (n) => !0) {
  return {
    code: a,
    labelkey: S.attributeAction[a],
    label: S.attributeAction[a],
    attributeFunction1: e ?? ((n) => {
    }),
    attributeFunction2: t ?? ((n) => {
    }),
    icon: s,
    actorTypes: i,
    condition: r
  };
}
function Ns(a, e) {
  return {
    code: a,
    labelkey: S.defense[a],
    label: S.defense[a],
    actionCode: e
  };
}
const fe = y.actorAttributes, ge = y.actorTypes, Oe = Re.actions, Ds = Re.defenses, di = [
  Ye(Oe.defense, (a) => fe.reflexes, (a) => fe.intelligence, _.fontAwesome("fas fa-shield-alt"), [ge.character, ge.npc]),
  Ye(Oe.defense, (a) => fe.handling, (a) => fe.chassis, _.fontAwesome("fas fa-tachometer-alt"), [ge.vehicle, ge.battlemech]),
  Ye(Oe.resistTorture, (a) => fe.strength, (a) => fe.willpower, _.fontAwesome("fas fa-angry"), [ge.character, ge.npc]),
  Ye(Oe.perception, (a) => fe.logic, (a) => fe.willpower, _.fontAwesome("fas fa-eye"), [ge.character, ge.npc]),
  Ye(Oe.perception, (a) => fe.system, (a) => fe.handling, _.fontAwesome("fas fa-video"), [ge.vehicle, ge.battlemech]),
  Ye(Oe.composure, (a) => fe.charisma, (a) => fe.willpower, _.fontAwesome("fas fa-meh"), [ge.character, ge.npc]),
  Ye(Oe.judgeIntentions, (a) => fe.charisma, (a) => fe.charisma, _.fontAwesome("fas fa-theater-masks"), [ge.character, ge.npc]),
  Ye(Oe.memory, (a) => fe.logic, (a) => fe.logic, _.fontAwesome("fas fa-brain"), [ge.character, ge.npc]),
  Ye(Oe.catch, (a) => fe.reflexes, (a) => fe.reflexes, _.fontAwesome("fas fa-baseball-ball"), [ge.character, ge.npc]),
  Ye(Oe.lift, (a) => fe.strength, (a) => fe.strength, _.fontAwesome("fas fa-dumbbell"), [ge.character, ge.npc])
], Is = [
  Ns(Ds.physicalDefense, Oe.defense),
  Ns(Ds.physicalResistance, Oe.resistTorture),
  Ns(Ds.socialDefense, Oe.composure),
  Ns(Ds.mentalResistance, Oe.perception)
];
class de {
  static init() {
    Handlebars.registerHelper("fixedDefenseCode", (e) => de.fixedDefenseCode(e));
  }
  static all(e = void 0) {
    return e ? di.filter(e) : di;
  }
  static getActorActions(e) {
    return di.filter((t) => t.actorTypes.includes(e.type) && t.condition(e));
  }
  static fixedDefenseCode(e) {
    return Re.fixedDefenseCode[e] ?? e;
  }
  static getActorDefenses(e) {
    return Is.map((t) => {
      const s = de.getActorAction(e, t.actionCode);
      return de._convertToDefense(s, t);
    }).filter((t) => t == null ? void 0 : t.code);
  }
  static getDefenseAttributeAction(e) {
    var t;
    return (t = Is.find((s) => s.code == e)) == null ? void 0 : t.actionCode;
  }
  static getActorAction(e, t) {
    return de.getActorActions(e).find((s) => s.code == t);
  }
  static getActorDefense(e, t) {
    t = de.fixedDefenseCode(t);
    const s = Is.find((r) => r.code == t), i = de.getActorAction(e, s.actionCode);
    return Vt.checkActorDefenseAction(i, e, s), de._convertToDefense(i, s);
  }
  static _convertToDefense(e, t) {
    return e ? foundry.utils.mergeObject(
      t,
      e ?? {},
      { overwrite: !1, inplace: !1 }
    ) : void 0;
  }
  static getDefenses() {
    return Is;
  }
  static prepareShortcut(e, t) {
    const s = de.getActorActions(e).find((i) => i.code == t);
    if (s)
      return {
        icon: s.icon,
        label: s.labelkey,
        callback: (i) => i.actor.rollAttributeAction(t)
      };
  }
}
class Oi {
  constructor() {
    this.remoteCalls = {}, game.socket.on(vi, async (e) => this.onSocketMessage(e));
  }
  static async register(e, t) {
    game.system.anarchy.remoteCall._register(e, t);
  }
  async _register(e, t) {
    if (this.remoteCalls[e])
      throw `RemoteCall msg ${e} is already registered`;
    foundry.utils.mergeObject(t, {
      callback: (s) => {
        console.log(te + "RemoteCall [", e, "] (", s, ")");
      },
      condition: (s) => !0,
      multiple: !1
      /* true if multiple users should handle the message */
    }, { overwrite: !1 }), this.remoteCalls[e] = t, console.log(te + "RemoteCall registered", e);
  }
  static call(e, t) {
    return game.system.anarchy.remoteCall._remoteCall(e, t);
  }
  _remoteCall(e, t) {
    const s = this.remoteCalls[e];
    return !s || s.condition(game.user) || !s.multiple && Ge.isUniqueConnectedGM() ? !1 : (game.socket.emit(vi, { msg: e, data: t }), !0);
  }
  async onSocketMessage(e) {
    const t = this.remoteCalls[e.msg];
    if (t) {
      const s = t.condition(game.user), i = t.multiple, r = Ge.isUniqueConnectedGM();
      s && (i || r) ? t.callback(e.data) : console.log(te + "RemoteCall.onSocketMessage(", e, ") ignored :", s, i, r);
    } else
      console.log(te + "RemoteCall: No callback registered for", e);
  }
}
const Ta = "Users.blindMessageToGM";
class Ge {
  static init() {
    Oi.register(Ta, {
      callback: (e) => Ge.blindMessageToGM(e),
      condition: (e) => e.isGM
    });
  }
  static blindMessageToGM(e) {
    Oi.call(Ta, e) || ChatMessage.create({
      user: e.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      blind: !0,
      content: re(S.chat.blindMessageToGM, {
        user: game.user.name,
        message: e.content
      })
    });
  }
  static getUsers(e = (t) => !0) {
    return (game.version ? game.users : game.users.entities).filter(e);
  }
  static firstConnectedGM() {
    return Ge.getUsers((e) => e.isGM && e.active).sort(V.ascending((e) => e.id)).at(0) ?? {};
  }
  /**
   * @returns true pour un seul utilisateur: le premier GM connecté par ordre d'id
   */
  static isUniqueConnectedGM(e = game.user) {
    return e.id == Ge.firstConnectedGM().id;
  }
  static firstResponsible(e) {
    if (!(e != null && e.testUserPermission))
      return;
    const t = Ge.getUsers(
      (s) => s.active && e.testUserPermission(s, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER)
    ).sort(V.ascending((s) => s.id)).at(0);
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
const qt = S.actor.monitors, tt = S.actor.counters, yr = {
  armor: {
    path: "system.monitors.armor.value",
    monitor: (a) => a.system.monitors.armor,
    iconChecked: _.fontAwesome("fas fa-shield-slash"),
    iconUnchecked: _.fontAwesome("fas fa-shield-alt"),
    iconHit: _.fontAwesome("fas fa-bahai"),
    resource: qt.armor
  },
  fatigue: {
    path: "system.monitors.fatigue.value",
    monitor: (a) => a.system.monitors.fatigue,
    iconChecked: _.fontAwesome("fas fa-grimace"),
    iconUnchecked: _.fontAwesome("far fa-smile"),
    iconHit: _.fontAwesome("fas fa-bahai"),
    resource: qt.fatigue,
    overflow: (a) => y.monitors.physical,
    useArmor: !0
  },
  physical: {
    path: "system.monitors.physical.value",
    monitor: (a) => a.system.monitors.physical,
    iconChecked: _.fontAwesome("fas fa-heartbeat"),
    iconUnchecked: _.fontAwesome("far fa-heart"),
    iconHit: _.fontAwesome("fas fa-bahai"),
    resource: qt.physical,
    useArmor: !0
  },
  structure: {
    path: "system.monitors.structure.value",
    monitor: (a) => a.system.monitors.structure,
    iconChecked: _.fontAwesome("fas fa-car-crash"),
    iconUnchecked: _.fontAwesome("fas fa-car-alt"),
    iconHit: _.fontAwesome("fas fa-bahai"),
    resource: qt.structure
  },
  heat: {
    path: "system.monitors.heat.value",
    monitor: (a) => a.system.monitors.heat,
    iconChecked: _.fontAwesome("fas fa-fire"),
    iconUnchecked: _.fontAwesome("far fa-sun"),
    iconHit: _.fontAwesome("fas fa-temperature-high"),
    resource: qt.heat
  },
  criticals: {
    path: "system.hybrid.criticals.value",
    monitor: (a) => {
      var e;
      return ((e = a.system.hybrid) == null ? void 0 : e.criticals) ?? { value: 0, max: 0 };
    },
    iconChecked: _.fontAwesome("fas fa-bolt"),
    iconUnchecked: _.fontAwesome("far fa-dot-circle"),
    iconHit: _.fontAwesome("fas fa-exclamation-triangle"),
    resource: qt.structure
  },
  anarchy: {
    path: "system.counters.anarchy.value",
    monitor: (a) => ({
      value: a.system.counters.anarchy.value,
      max: 6
    }),
    iconChecked: _.iconPath(`${ds}/anarchy-point.webp`, "checkbar-img"),
    iconUnchecked: _.iconPath(`${ds}/anarchy-point-off.webp`, "checkbar-img"),
    resource: tt.anarchy
  },
  plot: {
    path: "system.counters.anarchy.value",
    monitor: (a) => {
      const e = a.system.counters.anarchy.value;
      return { value: e, max: e + 1 };
    },
    iconChecked: _.iconPath(`${ds}/danger-point.webp`, "checkbar-img"),
    iconUnchecked: _.iconPath(`${ds}/danger-point-off.webp`, "checkbar-img"),
    resource: tt.anarchy
  },
  sceneAnarchy: {
    path: "system.counters.edgePools.chaos.value",
    monitor: (a) => {
      const e = a.getEdgePoolValue(y.counters.edgePools.chaos), t = a.getAttributeValue(y.actorAttributes.edge);
      return { value: e, max: t };
    },
    iconChecked: _.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    iconUnchecked: _.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    resource: tt.edgePools.chaos
  },
  grit: {
    path: "system.counters.edgePools.grit.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(y.counters.edgePools.grit), max: a.getAttributeValue(y.actorAttributes.edge) }),
    iconChecked: _.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    iconUnchecked: _.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    resource: tt.edgePools.grit
  },
  insight: {
    path: "system.counters.edgePools.insight.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(y.counters.edgePools.insight), max: a.getAttributeValue(y.actorAttributes.edge) }),
    iconChecked: _.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    iconUnchecked: _.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    resource: tt.edgePools.insight
  },
  legend: {
    path: "system.counters.edgePools.legend.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(y.counters.edgePools.legend), max: a.getAttributeValue(y.actorAttributes.edge) }),
    iconChecked: _.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    iconUnchecked: _.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    resource: tt.edgePools.legend
  },
  credibility: {
    path: "system.counters.edgePools.credibility.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(y.counters.edgePools.credibility), max: a.getAttributeValue(y.actorAttributes.edge) }),
    iconChecked: _.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    iconUnchecked: _.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    resource: tt.edgePools.credibility
  },
  rumor: {
    path: "system.counters.edgePools.rumor.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(y.counters.edgePools.rumor), max: a.getAttributeValue(y.actorAttributes.edge) }),
    iconChecked: _.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    iconUnchecked: _.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    resource: tt.edgePools.rumor
  }
}, je = foundry.utils.mergeObject(yr, {});
class N {
  static init() {
    Handlebars.registerHelper("iconCheckbar", N.iconCheckbar), Handlebars.registerHelper("iconCheckbarHit", N.iconHit);
  }
  static hackCheckbars(e) {
    if (e) {
      const t = foundry.utils.mergeObject(yr, {});
      foundry.utils.mergeObject(t, e, { recursive: !0 }), foundry.utils.mergeObject(je, t, { overwrite: !0 });
    }
  }
  static iconCheckbar(e, t) {
    return t ? N.iconChecked(e) : N.iconUnchecked(e);
  }
  static iconChecked(e) {
    var t;
    return (t = je[e]) == null ? void 0 : t.iconChecked;
  }
  static iconUnchecked(e) {
    var t;
    return (t = je[e]) == null ? void 0 : t.iconUnchecked;
  }
  static iconHit(e) {
    var t, s;
    return ((t = je[e]) == null ? void 0 : t.iconHit) ?? ((s = je[e]) == null ? void 0 : s.iconChecked);
  }
  static useArmor(e) {
    var t;
    return (t = je[e]) == null ? void 0 : t.useArmor;
  }
  static max(e, t) {
    var i;
    const s = (i = je[t]) == null ? void 0 : i.monitor(e);
    return ((s == null ? void 0 : s.max) ?? 0) + ((s == null ? void 0 : s.maxBonus) ?? 0);
  }
  static value(e, t) {
    var i;
    const s = (i = je[t]) == null ? void 0 : i.monitor(e);
    return (s == null ? void 0 : s.value) ?? 0;
  }
  static resistance(e, t, s = void 0) {
    return N.resistanceDetail(e, t, s).value;
  }
  static resistanceDetail(e, t, s = void 0) {
    var l, c;
    const i = (l = je[t]) == null ? void 0 : l.monitor(e), r = N._resolveResistance(i == null ? void 0 : i.resistance, s), n = N._resolveResistance(i == null ? void 0 : i.resistanceBonus, s), o = s === void 0 ? 0 : Number(((c = i == null ? void 0 : i.resistanceBonusByType) == null ? void 0 : c[s]) ?? 0);
    return {
      value: r.value + n.value + o,
      damageType: s,
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
    const s = t !== void 0 ? (r = e == null ? void 0 : e.byType) == null ? void 0 : r[t] : void 0;
    return s !== void 0 ? { value: Number(s) || 0, source: "type" } : { value: Number((e == null ? void 0 : e.default) ?? 0) || 0, source: "default" };
  }
  static newValue(e, t) {
    return e + (t ? 0 : 1);
  }
  static async switchMonitorCheck(e, t, s, i, r = void 0, n = void 0) {
    await N.setCounter(e, t, N.newValue(s, i), r, n);
  }
  static async addCounter(e, t, s, i = void 0) {
    if (s != 0) {
      const r = N.getCounterValue(e, t, i) ?? 0;
      await N.setCounter(e, t, r + s, i);
    }
  }
  static async setCounter(e, t, s, i = void 0, r = void 0) {
    switch (t) {
      case y.monitors.anarchy:
        return await N.setAnarchy(e, s);
      case y.monitors.sceneAnarchy:
        return await N.setSceneAnarchy(e, s);
    }
    return await N.setCheckbar(e, t, s);
  }
  static getCounterValue(e, t, s) {
    switch (t) {
      case y.monitors.anarchy:
        return N.getAnarchy(e, t);
    }
    return N.value(e, t);
  }
  static async setCheckbar(e, t, s) {
    if (s == N.getCounterValue(e, t))
      return;
    const i = je[t];
    if (i.path) {
      const r = N.max(e, t);
      if (r <= 0)
        return;
      await N._manageOverflow(i, e, t, s, r), s = Math.min(s, r), Vt.checkOutOfRange(i.resource, s, 0, r), await e.setCheckbarValue(i.path, s);
    }
  }
  static async _manageOverflow(e, t, s, i, r) {
    if (i > r) {
      const n = e.overflow ? e.overflow(t) : void 0, o = e.recomputeOverflow ? e.recomputeOverflow(i - r) : i - r;
      n && o > 0 && (N._notifyOverflow(t, s, o, n), await N.addCounter(t, n, o));
    }
  }
  static _notifyOverflow(e, t, s, i) {
    const r = re(S.actor.monitors.overflow, {
      actor: e.name,
      monitor: S.actor.monitors[t],
      overflow: s,
      overflowMonitor: S.actor.monitors[i]
    });
    ui.notifications.warn(r);
  }
  static async _manageFatigueOverflow(e, t, s) {
    await N.addCounter(e, y.monitors.physical, t - s);
  }
  static async setAnarchy(e, t) {
    if (e.hasOwnAnarchy()) {
      if (e.hasGMAnarchy()) {
        await game.system.anarchy.gmAnarchy.setAnarchy(t), e.render();
        return;
      }
      await N._setAnarchyMonitor(e, y.monitors.anarchy, t);
    }
  }
  static async setSceneAnarchy(e, t) {
    await N._setAnarchyMonitor(e, y.monitors.sceneAnarchy, t);
  }
  static async _setAnarchyMonitor(e, t, s) {
    const i = N.value(e, t);
    await N.setCheckbar(e, t, s), game.user.isGM || N.notifyAnarchyChange(e, t, i, s);
  }
  static getAnarchy(e, t) {
    return !game.user.isGM && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) || t == tt.anarchy && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) ? 0 : N.value(e, t);
  }
  static notifyAnarchyChange(e, t, s, i) {
    Ge.blindMessageToGM({
      from: game.user.id,
      content: re(
        S.gmManager.playerChangedAnarchy,
        {
          user: game.user.name,
          actor: e.name,
          monitor: S.actor.counters[t],
          from: s,
          to: i
        }
      )
    });
  }
}
const { loadTemplates: Hn, renderTemplate: Wn } = foundry.applications.handlebars, ka = {
  highlighted: ["far fa-times-circle", "fas fa-dice-one", "fas fa-dice-two", "fas fa-dice-three", "fas fa-dice-four", "fas fa-dice-five", "fas fa-dice-six"],
  dimmed: ["far fa-times-circle", "far fa-dice-one", "far fa-dice-two", "far fa-dice-three", "far fa-dice-four", "far fa-dice-five", "far fa-dice-six"]
};
class at {
  static init() {
    Hooks.once("ready", async () => await this.onReady()), Handlebars.registerHelper("dice-cursor-array", (e, t) => at.array(e ?? 0, t ?? 5)), Handlebars.registerHelper("dice-cursor-fas", (e, t) => at.fasClass(e, t)), Handlebars.registerHelper("dice-cursor-active", (e, t) => at.activeClass(e, t)), Handlebars.registerHelper("dice-cursor-color", (e, t) => at.colorClass(e, t));
  }
  static async onReady() {
    await Hn([
      "systems/mwd/templates/roll/parts/dice-cursor.hbs"
    ]);
  }
  static array(e, t) {
    if (e > t) throw `min>max: ${e} > ${t}`;
    return Array(t - e + 1).fill().map((s, i) => e + i);
  }
  static isActive(e, t) {
    return t <= e && e < 0 || 0 < e && e <= t;
  }
  static activeClass(e, t) {
    return at.isActive(e, t) ? "active" : "inactive";
  }
  static fasClass(e, t) {
    const s = at.isActive(e, t) ? ka.highlighted : ka.dimmed;
    return at.$getFas(s, Math.abs(e));
  }
  static colorClass(e, t) {
    return e == 0 || !t ? e < 0 ? "fixed-dice-malus" : "fixed-dice-bonus" : e < 0 ? "variable-dice-malus" : "variable-dice-bonus";
  }
  static $getFas(e, t) {
    return e[t > 6 ? t % 6 : t];
  }
  static async diceCursor({ value: e, min: t, max: s, editable: i }) {
    return await Wn("systems/mwd/templates/roll/parts/dice-cursor.hbs", {
      value: e,
      min: t,
      max: s,
      editable: i
    });
  }
}
const be = {
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
}, Ma = "anarchy-", br = `${T}.${be.ANARCHY_HACK}`, _i = {
  id: T,
  name: "Standard Shadowrun Anarchy",
  hack: {
    checkbars: () => je
  }
};
globalThis.ANARCHY_HOOKS = be;
globalThis.SETTING_KEY_ANARCHY_HACK = br;
globalThis.SHADOWRUN_ANARCHY_NO_HACK = _i;
class Ht {
  constructor() {
    this.hooks = [], this.hacks = {}, this.hackNames = {}, this.hookMethods = {}, this._register(be.ANARCHY_HACK), Hooks.on(be.ANARCHY_HACK, (e) => e(_i)), Hooks.on("updateSetting", async (e, t, s, i) => this.onUpdateSetting(e, t, s, i)), Hooks.once("ready", () => this.onReady()), Hooks.on("getSceneControlButtons", (e) => {
      var s;
      if (!((s = game.user) != null && s.isGM)) return;
      const t = Array.isArray(e) ? e.find((i) => i.name === "notes") : e == null ? void 0 : e.notes;
      if (!t) {
        const i = Array.isArray(e) ? e.map((r) => r.name) : Object.keys(e ?? {});
        console.warn("MWD: token controls not found. Available:", i);
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
          var i, r;
          return (r = (i = game.mwd) == null ? void 0 : i.gmGadget) == null ? void 0 : r.call(i);
        }
      });
    });
  }
  async onReady() {
    Hooks.callAll(be.ANARCHY_HACK, (e) => {
      this.hacks[e.id] = e, this.hackNames[e.id] = e.name;
    }), game.settings.register(T, be.ANARCHY_HACK, {
      scope: "world",
      name: S.settings.anarchyHack.name,
      hint: S.settings.anarchyHack.hint,
      config: !0,
      default: _i.id,
      choices: this.hackNames,
      type: String
    }), this.applySelectedAnarchyHack();
  }
  async onUpdateSetting(e, t, s, i) {
    e.key == br && this.applySelectedAnarchyHack();
  }
  applySelectedAnarchyHack() {
    const e = this.getSelectedHack();
    e && N.hackCheckbars(e.hack.checkbars());
  }
  selectHookMethod(e, t) {
    Hooks.callAll(t, (s, i) => {
      s == e && (this.hookMethods[t] = i);
    });
  }
  getSelectedHack() {
    return this.hacks[game.settings.get(T, be.ANARCHY_HACK)];
  }
  getHookMethod(e, t) {
    return this.hookMethods[e] ?? t;
  }
  callHookMethod(e, ...t) {
    const s = this.hookMethods[e];
    return s ? s(...t) : void 0;
  }
  static instance() {
    return game.system.anarchy.hooks;
  }
  static register(e) {
    Ht.instance()._register(e);
  }
  _register(e) {
    if (console.log(te + "HooksManager.register", e), !e.startsWith(Ma))
      throw `For safety Anarchy Hooks names must be prefixed by '${Ma}'`;
    this.hooks.push(e);
  }
}
const Pa = [
  y.itemType.assetModule,
  y.itemType.mechWeapon,
  y.itemType.personalWeapon,
  "weapon"
];
class K {
  constructor() {
    this.modifiers = {
      groups: Q.mapObjetToKeyValue(S.modifier.group, "key", "label"),
      roll: K._buildGroupOptions("roll"),
      attribute: K._buildGroupOptions("attribute"),
      monitor: K._buildGroupOptions("monitor"),
      other: K._buildGroupOptions("other")
    }, Hooks.once("ready", () => this.onReady());
  }
  static _buildGroupOptions(e) {
    switch (e) {
      case "attribute":
        return {
          label: S.modifier.group[e],
          effects: Q.hbsAttributes.map((t) => ({ key: t.value, label: t.labelkey })),
          categories: []
        };
    }
    return {
      label: S.modifier.group[e],
      effects: Q.mapObjetToKeyValue(S.modifier[e].effect, "key", "label"),
      categories: Q.mapObjetToKeyValue(S.modifier[e].category, "key", "label")
    };
  }
  async onReady() {
    Handlebars.registerHelper("modifierHasSubCategory", (e, t, s) => this.hasSubCategory(e, t, s)), Handlebars.registerHelper("modifierSelectOption", (e, t) => this.getSelectOptions(e, t));
  }
  hasSubCategory(e, t, s) {
    switch (e) {
      case "roll":
        return !0;
      case "monitor":
        return s === "resistanceByType";
    }
    return !1;
  }
  getSelectOptions(e, t) {
    var s, i;
    switch (e) {
      case "group":
        return this.modifiers.groups;
      case "effect":
        return (s = this.modifiers[t.hash.group]) == null ? void 0 : s.effects;
      case "category":
        return (i = this.modifiers[t.hash.group]) == null ? void 0 : i.categories;
      case "subCategory":
        switch (t.hash.group) {
          case "roll":
            return this.getSelectRollSubCategories(t.hash.category);
          case "monitor": {
            switch (t.hash.category) {
              case "resistanceByType":
                return Q.getDamageTypes().map((r) => ({ key: r.value, label: r.labelkey }));
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
        return Q.getAttributes().map((s) => ({ key: s.value, label: s.labelkey }));
      case "skill":
        return game.system.anarchy.skills.getSkills().map((s) => ({ key: s.code, label: s.labelkey }));
      case "attributeAction":
        const t = de.all().map((s) => ({ key: s.code, label: s.labelkey }));
        return V.distinct(t.map((s) => s.key)).map((s) => t.find((i) => i.key == s));
    }
    return [];
  }
  getEnums() {
    return { modifiers: this.modifiers };
  }
  static buildRollModifiersFilter(e, t) {
    return (s) => {
      var i;
      if (s.group == "roll" && s.effect == t)
        switch (s.category) {
          case "attribute":
            return [e.attribute1, e.attribute2].includes(s.subCategory);
          case "skill":
            return s.subCategory == ((i = e.skill) == null ? void 0 : i.system.code);
          case "attributeAction":
            return s.subCategory == e.attributeAction || s.subCategory == de.getDefenseAttributeAction(e.defenseAction);
        }
      return !1;
    };
  }
  static computeRollModifiers(e, t, s) {
    const i = K.buildRollModifiersFilter(t, s), r = (c) => c.group == "roll" && c.effect == s && i(c), n = K._activeItems(e).map((c) => K.itemModifiers(c, r)).reduce((c, u) => c.concat(u), []).sort(V.descending((c) => c.modifier.value)), o = K.$sumAssetModuleModifiers(n.filter((c) => Pa.includes(c.item.type)).map((c) => c.modifier.value)), l = V.sumValues(n.filter((c) => !Pa.includes(c.item.type)).map((c) => c.modifier.value));
    return {
      value: o + l,
      sources: n
    };
  }
  static $sumAssetModuleModifiers(e) {
    const t = e.find((r) => r > 3) ?? 0, s = V.sumValues(e.filter((r) => r < 0)), i = Math.min(3, V.sumValues(e.filter((r) => r > 0 && r <= 3)));
    return s + Math.max(i, t);
  }
  static computeModifiers(e, t, s = void 0, i = void 0) {
    const r = K._createFilter(t, s, i), n = K._activeItems(e).map((l) => K.itemModifiers(l, r)).reduce((l, c) => l.concat(c), []);
    return {
      value: V.sumValues(n, (l) => l.modifier.value),
      sources: n
    };
  }
  static sumMonitorModifiers(e, t, s, i = void 0) {
    return K.sumModifiers(K._activeItems(e), "monitor", t, s, i);
  }
  static sumModifiers(e, t, s, i, r = void 0) {
    const n = K._createFilter(t, s, i, r), o = K._activeItems(e).map((l) => K.itemModifiers(l, n)).reduce((l, c) => l.concat(c), []);
    return V.sumValues(o, (l) => l.modifier.value);
  }
  static _createFilter(e, t, s, i = void 0) {
    return (r) => r.group == e && r.effect == (t ?? r.effect) && r.category == (s ?? r.category) && (i == null ? !0 : r.subCategory == i);
  }
  static countModifiers(e, t, s = void 0, i = void 0) {
    const r = K._createFilter(t, s, i);
    return K._activeItems(e).map((o) => K.itemModifiers(o, r)).reduce((o, l) => o.concat(l), []).count;
  }
  static itemModifiers(e, t) {
    return K._listItemModifiers(e, t).map((s) => K._itemModifier(e, s));
  }
  static _listItemModifiers(e, t = (s) => !0) {
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
const { loadTemplates: mi, renderTemplate: wu } = foundry.applications.handlebars, ee = {
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
}, Ea = 4, Un = [
  // attribute1
  {
    code: "attribute1",
    options: {
      order: 1,
      category: ee.pool,
      hbsTemplateRoll: `${x}/roll/parts/select-attribute.hbs`
    },
    condition: (a) => Object.values(Re.rollType).includes(a.mode),
    isUsed: (a) => !0,
    factory: (a) => {
      var t;
      const e = a.attribute1 ?? ((t = a.skill) == null ? void 0 : t.system.attribute);
      return {
        labelkey: e ? S.attributes[e] : S.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: a.skill },
        selected: e,
        choices: Q.getAttributes((s) => a.attributes.includes(s))
      };
    }
  },
  // attribute2
  {
    code: "attribute2",
    options: {
      order: 1,
      category: ee.pool,
      hbsTemplateRoll: `${x}/roll/parts/select-attribute.hbs`,
      hbsTemplateChat: `${x}/chat/parts/pool-attribute2.hbs`
    },
    condition: (a) => [Re.rollType.attribute, Re.rollType.attributeAction, Re.rollType.defense].includes(a.mode),
    isUsed: (a) => a.used,
    onChecked: (a, e) => a.used = !!e,
    factory: (a) => {
      const e = a.attribute2;
      return {
        labelkey: e ? S.attributes[e] : S.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: Re.rollType.attribute == a.mode },
        selected: e,
        choices: Q.getAttributes((t) => a.attributes.includes(t))
      };
    }
  },
  // skill
  {
    code: "skill",
    options: {
      flags: {},
      order: 3,
      category: ee.pool,
      hbsTemplateRoll: `${x}/roll/parts/input-numeric.hbs`
    },
    condition: (a) => ["skill", "weapon"].includes(a.mode),
    factory: (a) => {
      var t, s, i, r;
      const e = (t = a.actor) != null && t.getSkillRating ? a.actor.getSkillRating(a.skill) : ((i = (s = a.skill) == null ? void 0 : s.system) == null ? void 0 : i.value) ?? 0;
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
      category: ee.pool,
      hbsTemplateRoll: `${x}/roll/parts/check-option.hbs`
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
      category: ee.pool,
      value: 0,
      labelkey: S.common.roll.modifiers.social.credibility,
      hbsTemplateRoll: `${x}/roll/parts/input-numeric.hbs`
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
      labelkey: S.common.roll.modifiers.poolModifiers,
      order: 5,
      category: ee.pool,
      hbsTemplateRoll: `${x}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 4
    },
    factory: (a) => Ot.computeRollModifiers(ee.pool, a)
  },
  // wounds
  {
    code: "wounds",
    options: {
      flags: { optional: !0 },
      order: 10,
      category: ee.pool,
      labelkey: S.common.roll.modifiers.wounds,
      hbsTemplateRoll: `${x}/roll/parts/input-numeric.hbs`
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
      category: ee.pool,
      value: 0,
      labelkey: S.common.roll.modifiers.other,
      hbsTemplateRoll: `${x}/roll/parts/input-numeric.hbs`,
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
      category: ee.glitch,
      value: 0,
      labelkey: S.common.roll.modifiers.glitch,
      hbsTemplateRoll: `${x}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${x}/chat/parts/glitch.hbs`,
      min: 0,
      max: 5
    },
    isUsed: (a) => a.value > 0,
    factory: (a) => {
      const e = a.actor.getWounds(), t = Ot.computeRollModifiers(ee.glitch, a);
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
      category: ee.glitch,
      value: 0,
      labelkey: S.common.roll.modifiers.social.rumor,
      hbsTemplateRoll: `${x}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${x}/chat/parts/glitch.hbs`,
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
      category: ee.reroll,
      labelkey: S.common.roll.modifiers.reroll,
      hbsTemplateRoll: `${x}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: Ea
    },
    factory: (a) => {
      const e = Ot.computeRollModifiers(ee.reroll, a), t = Ot.computeRollModifiers(ee.rerollMax, a);
      return foundry.utils.mergeObject(e, {
        max: Ea + Math.max(0, t.value ?? 0)
      });
    }
  },
  // reduction from opponent
  {
    code: "reduced",
    options: {
      order: 29,
      category: ee.pool,
      labelkey: S.common.roll.modifiers.reduced,
      hbsTemplateRoll: `${x}/roll/parts/input-numeric.hbs`,
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
      category: ee.rerollForced,
      labelkey: S.common.roll.modifiers.rerollForced,
      hbsTemplateRoll: `${x}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 0
    },
    factory: (a) => {
      var t;
      const e = Ot.computeRollModifiers(ee.successReroll, a);
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
      category: ee.pool,
      value: 0,
      min: 0,
      max: 3,
      labelkey: S.common.roll.modifiers.anarchyDisposition,
      hbsTemplateRoll: `${x}/roll/parts/check-option.hbs`
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
      category: ee.risk,
      value: 0,
      labelkey: S.common.roll.modifiers.anarchyRisk,
      hbsTemplateRoll: `${x}/roll/parts/check-option.hbs`,
      hbsTemplateChat: `${x}/chat/parts/anarchy-risk.hbs`
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
      category: ee.edge,
      labelkey: S.common.roll.modifiers.edge,
      hbsTemplateRoll: `${x}/roll/parts/check-option.hbs`
    },
    isUsed: (a) => a.used,
    condition: (a) => a.options.canUseEdge && a.actor.getRemainingEdge(),
    onChecked: (a, e) => {
      a.used = e, a.value = e ? 1 : 0;
    },
    factory: (a) => {
      var i;
      const t = [
        y.counters.edgePools.grit,
        y.counters.edgePools.chaos,
        y.counters.edgePools.insight,
        y.counters.edgePools.rumor,
        y.counters.edgePools.legend,
        y.counters.edgePools.credibility
      ].map((r) => {
        const n = a.actor.getEdgePoolValue(r);
        return {
          code: r,
          label: S.actor.counters.edgePools[r] ?? r,
          value: n
        };
      }), s = ((i = t.find((r) => r.value > 0)) == null ? void 0 : i.code) ?? y.counters.edgePools.grit;
      return {
        edgePools: t,
        pool: s
      };
    }
  },
  // reduce opponent pool
  {
    code: "opponentPool",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: ee.opponentPool,
      labelkey: S.common.roll.modifiers.opponentPool,
      hbsTemplateRoll: `${x}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => Ot.computeRollModifiers(ee.opponentPool, a),
    condition: (a) => !a.attributeAction
  },
  // force opponent rerolls
  {
    code: "opponentReroll",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: ee.opponentReroll,
      value: 0,
      labelkey: S.common.roll.modifiers.opponentReroll,
      hbsTemplateRoll: `${x}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => Ot.computeRollModifiers(ee.opponentReroll, a),
    condition: (a) => !a.attributeAction
  }
];
class Ot {
  constructor() {
    this.registeredParameters = {}, Ht.register(be.REGISTER_ROLL_PARAMETERS), Ht.register(be.MODIFY_ROLL_PARAMETER), Hooks.on(be.MODIFY_ROLL_PARAMETER, (e) => this._validate(e)), Hooks.once(be.REGISTER_ROLL_PARAMETERS, (e) => Un.forEach(
      (t) => e(t)
    )), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(be.REGISTER_ROLL_PARAMETERS, async (t) => {
      Hooks.callAll(be.MODIFY_ROLL_PARAMETER, t), t.ignore || await this._register(t);
    });
    const e = V.distinct([].concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateRoll)).concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateChat)).filter((t) => typeof t == "string" && t.length > 0));
    await mi(V.distinct(e)), await mi([`${x}/roll/parts/parameter-label.hbs`]);
  }
  _validate(e) {
    e.code || (console.error(`${te} RollParameter does not have a code`, e), e.ignore = !0);
  }
  async _register(e) {
    if (this.registeredParameters[e.code]) {
      console.error(`${te} RollParameter ${e.code} is already registered`, e);
      return;
    }
    e.onChecked || (e.onChecked = (t, s) => t.used = s), e.onValue = (t, s) => t.value = s, this.registeredParameters[e.code] = e;
  }
  async _optionalLoadTemplate(e) {
    e && await mi([e]);
  }
  build(e) {
    return Object.values(this.registeredParameters).filter((t) => !t.condition || t.condition(e)).map((t) => this._computeParameter(t, e));
  }
  compute(e) {
    const t = e.filter((r) => this.isParameterUsed(r)), s = V.classify(t, (r) => r.category), i = {};
    return Object.values(s).forEach((r) => i[r[0].category] = V.sumValues(r, (n) => n.value ?? (n.optional ? 1 : 0))), i;
  }
  isParameterUsed(e) {
    const t = this.findParameter(e.code);
    return (t == null ? void 0 : t.isUsed) != null ? t.isUsed(e) : e.value != null ? e.value != 0 : (console.error(`registered parameter ${t.code} does not have isUsed method`, t), !1);
  }
  findParameter(e) {
    return this.registeredParameters[e];
  }
  _computeParameter(e, t) {
    const s = {
      code: e.code,
      onChecked: e.onChecked,
      onValue: e.onValue,
      isUsed: e.isUsed
    };
    return foundry.utils.mergeObject(s, e.options), e.factory && foundry.utils.mergeObject(s, e.factory(t, e.options)), foundry.utils.mergeObject(s, {
      used: s.used || s.value,
      min: s.min ?? 0,
      max: s.max ?? s.value ?? 0
    }), s;
  }
  static computeRollModifiers(e, t) {
    const s = (r) => {
      var n;
      return !((n = r.isWeapon) != null && n.call(r)) || t.weapon && r.id == t.weapon.id;
    }, i = t.actor.items.filter(s);
    return K.computeRollModifiers(i, t, e);
  }
}
const { ApplicationV2: jn, HandlebarsApplicationMixin: Vn } = foundry.applications.api, { loadTemplates: Gn, renderTemplate: qn } = foundry.applications.handlebars;
var Xs, Sr;
const Ae = class Ae extends Vn(jn) {
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
    await Gn([
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
    var s;
    return {
      actor: e,
      tokenId: (s = e.token) == null ? void 0 : s.id,
      attributes: e.getUsableAttributes(t),
      options: {
        canUseEdge: e.canUseEdge()
      }
    };
  }
  static async rollAttribute(e, t) {
    const s = foundry.utils.mergeObject(Ae.prepareActorRoll(e), {
      mode: Re.rollType.attribute,
      attribute1: t
    });
    await Ae.create(s);
  }
  static async rollAttributeAction(e, t) {
    const s = foundry.utils.mergeObject(Ae.prepareActorRoll(e), {
      mode: Re.rollType.attributeAction,
      attributeAction: t.code,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e)
    });
    await Ae.create(s);
  }
  static async rollSkill(e, t, s) {
    const i = foundry.utils.mergeObject(Ae.prepareActorRoll(e), {
      mode: Re.rollType.skill,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? y.actorAttributes.reflexes,
      specialization: s
    });
    await Ae.create(i);
  }
  static async rollWeapon(e, t, s, i) {
    const r = foundry.utils.mergeObject(Ae.prepareActorRoll(e), {
      mode: Re.rollType.weapon,
      weapon: s,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? e.getPhysicalAgility(),
      specialization: void 0,
      targeting: i
    });
    await Ae.create(r);
  }
  static async rollDefense(e, t, s) {
    const i = foundry.utils.mergeObject(Ae.prepareActorRoll(e), {
      mode: Re.rollType.defense,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e),
      defenseAction: t.code,
      attackRoll: s.attackRoll,
      tokenId: s.defenderTokenId,
      choiceChatMessageId: s.choiceChatMessageId
    });
    await Ae.create(i);
  }
  static async itemAttributeRoll(e, t) {
    const s = foundry.utils.mergeObject(Ae.prepareActorRoll(e.actor), {
      mode: Re.rollType.attribute,
      item: e,
      attribute1: t,
      attributes: e.actor.getUsableAttributes(e)
    });
    await Ae.create(s);
  }
  static async create(e) {
    var n;
    const t = E(n = Ae, Xs, Sr).call(n, e), s = await qn(`${x}/roll/roll-dialog-title.hbs`, t), i = {
      id: `roll-dialog-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Ae.DEFAULT_OPTIONS.classes],
      window: { title: s }
    };
    return new Ae({ roll: t }, i).render({ force: !0 });
  }
  constructor(e = {}, t = {}) {
    super(e, t), this.roll = e.roll;
  }
  async _prepareContext() {
    return this.roll;
  }
  async activateListeners(e) {
    const t = e instanceof HTMLElement ? e : e[0];
    await super.activateListeners(t), this.html = t instanceof HTMLElement ? $(t) : e, this.html.find(".select-attribute-parameter").change(async (s) => {
      const i = this._getRollParameter(s), r = this._getEventItem(s, this.roll.actor), n = s.currentTarget.value, o = this.roll.actor.getAttributeValue(n, r);
      this.roll[i.code] = n, await this._setParameterSelectedOption(i, n, o);
    }), this.html.find(".check-optional").click(async (s) => {
      const i = this._getRollParameter(s);
      i.onChecked(i, s.currentTarget.checked), i.category == ee.pool && await this._updateParameterValue(i, i.value), i.code == "edge" && this.html.find(`.parameter[data-parameter-code='${i.code}'] .edge-pool-select`).prop("disabled", !i.used);
    }), this.activateDiceParameterClick(), this.html.find("input.parameter-value:not(:disabled)").on("input", async (s) => {
      const i = this._getRollParameter(s), r = Number.parseInt(s.currentTarget.value) ?? 0;
      await this._updateParameterValue(i, r);
    }), this.html.find(".select-option-parameter").change(async (s) => {
      const i = this._getRollParameter(s), r = s.currentTarget.value, n = Number.parseInt(r);
      await this._setParameterSelectedOption(i, r, n);
    }), this.html.find(".edge-pool-select").change(async (s) => {
      const i = this._getRollParameter(s);
      i.pool = s.currentTarget.value;
    }), this.html.find('[data-action="roll"]').on("click", async (s) => {
      s.preventDefault(), await game.system.anarchy.rollManager.roll(this.roll), await this.close();
    }), this.html.find('[data-action="cancel"]').on("click", async (s) => {
      s.preventDefault(), await this.close();
    });
  }
  activateDiceParameterClick() {
    this.html.find(".input-cursor-parameter a").click(async (e) => {
      var s;
      const t = this._getRollParameter(e);
      if ((s = t.flags) != null && s.editDice) {
        const i = Number.parseInt(this.html.find(e.currentTarget).attr("data-dice")) ?? 0, r = t.value != i || i == 0 ? i : i > 0 ? i - 1 : i + 1;
        await this._updateParameterValue(t, r);
      }
    });
  }
  async _setParameterSelectedOption(e, t, s) {
    e.onChecked(e, t), e.max = s, await this._updateParameterValue(e, s);
  }
  async _updateParameterValue(e, t) {
    e.onValue(e, t), this.html.find(`.parameter[data-parameter-code='${e.code}'] .parameter-value`).text(t);
    const s = await this.renderDiceCursor(e);
    this.html.find(`.parameter[data-parameter-code='${e.code}'] .input-cursor-parameter`).empty().append(s), this.activateDiceParameterClick(), this.html.find(`.parameter[data-parameter-code='${e.code}'] input.parameter-value`).val(e.value);
  }
  async renderDiceCursor(e) {
    var t;
    return await at.diceCursor({
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
    const s = this.html.find(e.currentTarget).closest(".parameter").attr("data-item-id");
    return s ? t.items.get(s) : void 0;
  }
  _getRollParameter(e) {
    const t = this.html.find(e.currentTarget).closest(".parameter").attr("data-parameter-code");
    return this.roll.parameters.find((s) => s.code == t);
  }
};
Xs = new WeakSet(), Sr = function(e) {
  const t = game.system.anarchy.rollParameters.build(e).sort(V.ascending((s) => s.order ?? 200));
  return foundry.utils.mergeObject(e, {
    ENUMS: Q.getEnums((s) => e.attributes.includes(s)),
    ANARCHY: S,
    parameters: t
  });
}, Se(Ae, Xs), C(Ae, "PARTS", {
  body: {
    template: `${x}/roll/roll-dialog.hbs`
  }
});
let Qe = Ae;
const ra = 2, $i = "skillSpecializationCatalog", Kn = [
  { key: "running", label: "Running" },
  { key: "jumping", label: "Jumping" },
  { key: "swimming", label: "Swimming" },
  { key: "climbing", label: "Climbing" },
  { key: "acrobatics", label: "Acrobatics" }
], wr = /* @__PURE__ */ new Set(), os = [
  // Strength
  { code: "athletics", label: "Athletics", attribute: "strength", icon: `${q}/athletics.svg`, domains: ["physical"], specializations: Kn },
  { code: "heavyWeapons", label: "Heavy Weapons", attribute: "strength", icon: `${q}/heavy-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  // Reflexes
  { code: "escapeArtist", label: "Escape Artist", attribute: "reflexes", icon: `${q}/escape-artist.svg`, domains: ["physical"] },
  { code: "gunnery", label: "Gunnery", attribute: "reflexes", icon: `${q}/vehicle-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "meleeCombat", label: "Melee Combat", attribute: "reflexes", icon: `${q}/close-combat.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "piloting", label: "Piloting", attribute: "reflexes", icon: `${q}/piloting-ground-steering-wheel.svg`, domains: ["physical"] },
  { code: "projectileWeapons", label: "Projectile Weapons", attribute: "reflexes", icon: `${q}/projectile-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "firearms", label: "Firearms", attribute: "reflexes", icon: `${q}/firearms.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "stealth", label: "Stealth", attribute: "reflexes", icon: `${q}/stealth.svg`, domains: ["physical"] },
  { code: "zeroGOps", label: "Zero-G Operations", attribute: "reflexes", icon: `${q}/fly.svg`, domains: ["physical"] },
  // Intelligence
  { code: "art", label: "Art", attribute: "intelligence", icon: `${q}/art.svg`, domains: ["mental"] },
  { code: "artillery", label: "Artillery", attribute: "intelligence", icon: `${q}/artillery.svg`, domains: ["mental"] },
  { code: "systemOps", label: "System Operations", attribute: "intelligence", icon: `${q}/electronics.svg`, domains: ["mental"] },
  { code: "computers", label: "Computers", attribute: "intelligence", icon: `${q}/hacking.svg`, domains: ["mental"] },
  { code: "demolitions", label: "Demolitions", attribute: "intelligence", icon: `${q}/demolition.svg`, domains: ["mental"] },
  { code: "medTech", label: "Medtech", attribute: "intelligence", icon: `${q}/biotech.svg`, domains: ["mental"] },
  { code: "science", label: "Science", attribute: "intelligence", icon: `${q}/skills.svg`, domains: ["mental"] },
  { code: "perception", label: "Perception", attribute: "intelligence", icon: `${q}/skills.svg`, domains: ["mental"] },
  { code: "tactics", label: "Tactics", attribute: "intelligence", icon: `${q}/skills.svg`, domains: ["mental"] },
  { code: "technician", label: "Technician", attribute: "intelligence", icon: `${q}/engineering.svg`, domains: ["mental"] },
  { code: "tracking", label: "Tracking", attribute: "intelligence", icon: `${q}/tracking.svg`, domains: ["physical", "mental"] },
  { code: "navigation", label: "Navigation", attribute: "intelligence", icon: `${q}/piloting-other.svg`, domains: ["mental"] },
  // Guts
  { code: "administration", label: "Administration", attribute: "willpower", icon: `${q}/knowledge.svg`, domains: ["social", "mental"] },
  { code: "animalHandling", label: "Animal Handling", attribute: "willpower", icon: `${q}/animals.svg`, domains: ["physical", "mental"] },
  { code: "survival", label: "Survival", attribute: "willpower", icon: `${q}/survival.svg`, domains: ["physical", "mental"] },
  // Charisma
  { code: "acting", label: "Acting", attribute: "charisma", icon: `${q}/con-art.svg`, domains: ["social"] },
  { code: "disguise", label: "Disguise", attribute: "charisma", icon: `${q}/disguise.svg`, domains: ["social", "mental"] },
  { code: "leadership", label: "Leadership", attribute: "charisma", icon: `${q}/psychology.svg`, domains: ["social"] },
  { code: "negotiation", label: "Negotiation", attribute: "charisma", icon: `${q}/negotiation.svg`, domains: ["social"] },
  { code: "etiquette", label: "Etiquette", attribute: "charisma", icon: `${q}/etiquette.svg`, domains: ["social"] },
  { code: "streetwise", label: "Streetwise", attribute: "charisma", icon: `${q}/etiquette2.svg`, domains: ["social"] },
  { code: "intimidation", label: "Intimidation", attribute: "charisma", icon: `${q}/intimidation.svg`, domains: ["social", "mental"] }
].map(Yn);
for (const a of os)
  wr.add(a.code);
function Yn(a) {
  return {
    ...a,
    label: a.label ?? a.code,
    icon: a.icon ?? `${Cs}/icons/skills/skills.svg`,
    specializations: oa(a.specializations)
  };
}
function na(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function oa(a = []) {
  const e = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((t) => {
    const s = na((t == null ? void 0 : t.key) ?? (t == null ? void 0 : t.label) ?? t);
    return !s || e.has(s) ? null : (e.add(s), {
      key: s,
      label: String((t == null ? void 0 : t.label) ?? (t == null ? void 0 : t.key) ?? t ?? s).trim() || s
    });
  }).filter(Boolean);
}
function Jn(a = []) {
  const e = new Error(a[0] ?? "Invalid skill specialization data.");
  return e.validationErrors = a, e;
}
function Qn() {
  const a = {};
  for (const e of os) {
    const t = (Array.isArray(e.specializations) ? e.specializations : []).map((s) => String((s == null ? void 0 : s.label) ?? "").trim()).filter(Boolean);
    t.length && (a[e.code] = t);
  }
  return a;
}
const Xn = Object.freeze(Qn());
function Zn(a, e = [], { strict: t = !1, errors: s = [] } = {}) {
  var r, n;
  if (!Array.isArray(e)) {
    if (t) {
      const o = ((r = Li(a)) == null ? void 0 : r.label) ?? a;
      s.push(`${o}: expected an array of specialization labels.`);
    }
    return [];
  }
  const i = [];
  for (const o of e) {
    const l = String(o ?? "").trim();
    if (!l) {
      if (t) {
        const c = ((n = Li(a)) == null ? void 0 : n.label) ?? a;
        s.push(`${c}: specialization labels cannot be blank.`);
      }
      continue;
    }
    i.push(l);
  }
  return oa(i).map((o) => o.label);
}
function Li(a) {
  return os.find((e) => e.code === a);
}
function Ar(a, { strict: e = !1 } = {}) {
  const t = a && typeof a == "object" && !Array.isArray(a) ? a : {}, s = [], i = {};
  for (const [r, n] of Object.entries(t)) {
    if (!wr.has(r)) {
      e && s.push(`Unknown skill code "${r}".`);
      continue;
    }
    const o = Zn(r, n, { strict: e, errors: s });
    o.length && (i[r] = o);
  }
  if (e && s.length) throw Jn(s);
  return Object.fromEntries(
    os.map((r) => [r.code, i[r.code]]).filter(([, r]) => Array.isArray(r) && r.length)
  );
}
function eo() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${T}.${$i}`))
      return game.settings.get(T, $i);
  } catch {
  }
  return Mr();
}
function Tr() {
  const a = Ar(eo(), { strict: !1 });
  return Object.fromEntries(
    Object.entries(a).map(([e, t]) => [
      e,
      oa(t)
    ])
  );
}
function kr(a = [], { allowedKeys: e = null } = {}) {
  const t = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((s) => na(s)).filter((s) => !s || t.has(s) || e && !e.has(s) ? !1 : (t.add(s), !0));
}
function ot(a) {
  const e = Li(a);
  if (e)
    return {
      ...e,
      specializations: Wt(e.code)
    };
}
function qs() {
  const a = Tr();
  return [...os].map((e) => ({
    ...e,
    specializations: [...a[e.code] ?? []]
  })).sort((e, t) => e.label.localeCompare(t.label));
}
function Wt(a) {
  return [...Tr()[a] ?? []];
}
function la(a, e) {
  const t = na(e);
  if (t)
    return Wt(a).find((s) => s.key === t);
}
function to(a, e) {
  var t;
  return ((t = la(a, e)) == null ? void 0 : t.label) ?? "";
}
function Mr() {
  return foundry.utils.deepClone(Xn);
}
function ii(a, { strict: e = !1 } = {}) {
  return Ar(a, { strict: e });
}
function Ks(a = []) {
  return kr(a);
}
function so(a, e = []) {
  const t = new Set(Wt(a).map((i) => i.key)), s = new Set(kr(e, { allowedKeys: t }));
  return Wt(a).filter((i) => s.has(i.key)).map((i) => i.key);
}
function xi(a, e) {
  var t, s;
  return Ks(
    ((s = (t = a == null ? void 0 : a.skills) == null ? void 0 : t[e]) == null ? void 0 : s.specializations) ?? []
  );
}
function ai(a, e) {
  return so(
    e,
    xi(a, e)
  );
}
function Pr(a, e) {
  const t = new Set(ai(a, e));
  return Wt(e).filter((s) => t.has(s.key));
}
function io(a) {
  const e = Math.ceil(a.length / 2);
  return { left: a.slice(0, e), right: a.slice(e) };
}
function ao(a) {
  var e, t;
  a.skills ?? (a.skills = {});
  for (const s of os) {
    const i = (e = a.skills)[t = s.code] ?? (e[t] = {});
    i.rating == null && (i.rating = 0), i.bonus == null && (i.bonus = 0), i.specializations = Ks(i.specializations);
  }
}
function ro(a) {
  const e = qs(), { left: t, right: s } = io(e), i = (r) => {
    var g, b, p, f, w, M;
    const n = r.code, o = r.attribute, l = Number(((b = (g = a == null ? void 0 : a.skills) == null ? void 0 : g[n]) == null ? void 0 : b.rating) ?? 0), c = Number(((f = (p = a == null ? void 0 : a.attributes) == null ? void 0 : p[o]) == null ? void 0 : f.value) ?? 0), u = Number(((M = (w = a == null ? void 0 : a.skills) == null ? void 0 : w[n]) == null ? void 0 : M.bonus) ?? 0), d = Pr(a, n), m = Wt(n).filter((k) => !d.some((R) => R.key === k.key)), h = c + l + u;
    return {
      code: n,
      label: r.label,
      icon: r.icon,
      attribute: o,
      attributeLabel: Q != null && Q.localizeAttribute ? Q.localizeAttribute(o) : o,
      rating: l,
      base: c,
      bonus: u,
      total: h,
      rollPayload: JSON.stringify({ intent: "skill", key: n }),
      canAddSpecialization: m.length > 0,
      specializations: d.map((k) => ({
        ...k,
        bonus: ra,
        rollPayload: JSON.stringify({
          intent: "skill",
          key: n,
          specializationKey: k.key,
          specializationLabel: k.label
        })
      })),
      // Input wiring paths (so templates don’t concat strings themselves)
      pathRating: `system.skills.${n}.rating`,
      pathBonus: `system.skills.${n}.bonus`
    };
  };
  return {
    left: t.map(i),
    right: s.map(i)
  };
}
const Ca = Object.freeze({
  weapon: y.itemType.personalWeapon,
  shadowamp: y.itemType.assetModule
}), Er = Object.freeze({
  contact: "systems/mwd/img/default/mystery-man.svg",
  gear: "systems/mwd/img/default/Default_Gear.svg",
  quality: "systems/mwd/img/default/card-joker.svg",
  assetModule: "systems/mwd/img/default/upgrade.svg",
  skill: "systems/mwd/img/default/Default_Skill.svg",
  lifeModule: "systems/mwd/img/default/book.svg",
  mechWeapon: "systems/mwd/img/default/Default_Weapon.svg",
  personalWeapon: "systems/mwd/img/colt-m1911.svg",
  armor: "systems/mwd/img/default/Default_Armor.svg"
}), Ut = Object.freeze(["close", "near", "far", "extreme"]), va = Object.freeze({
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
});
function _t(a) {
  return Ze(a);
}
function Cr(a) {
  return a === "long" ? "extreme" : a === "short" ? "close" : a === "medium" ? "near" : Ut.includes(a) ? a : "near";
}
function Jt(a) {
  return {
    max: Cr((a == null ? void 0 : a.max) ?? "near"),
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function pi(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function no(a) {
  const e = Ut.indexOf(a);
  return e >= 0 ? e : Ut.indexOf("near");
}
function oo(a = Jt({})) {
  const e = ["near", "close", "far", "extreme"], t = no(a.max);
  return e.find((s) => Ut.indexOf(s) <= t) ?? "close";
}
function lo(a) {
  const e = Cr(a == null ? void 0 : a.max), t = Ut.indexOf(e);
  return Ut.map((s, i) => ({
    key: s,
    allowed: t >= 0 ? i <= t : i === 0,
    value: (a == null ? void 0 : a[s]) ?? void 0,
    labelkey: Q.getFromList(Q.getEnums().ranges, s)
  }));
}
function co(a, e, t, s) {
  let i = Number(e);
  if (t)
    if (s !== void 0)
      i += Math.ceil(Number(s) / 2);
    else
      return console.warn("Weapon not attached to an actor"), ce.item.personalWeapon.weaponWithoutActor;
  return i;
}
function uo(a, e, t) {
  let s = "";
  return t && ce.attributes[t] && (s += ce.attributes[t].substring(0, 3).toUpperCase() + "/2 + "), s += String(e), s;
}
function mo(a, e) {
  return N.useArmor(a) ? e ? "noArmor" : "withArmor" : "";
}
function Ra(a) {
  const e = game.system.mwd.skills.get(a);
  if (!e)
    return {
      img: Er.skill,
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
function po(a) {
  const e = String(a ?? "").trim();
  return !!(!e || e.startsWith("icons/svg/") || e === "icons/mystery-man.svg");
}
var Ms, Ke, Fi, vr, xs;
const Ce = class Ce extends Item {
  static init() {
    H(this, Ms) || (Ee(this, Ms, !0), Hooks.on("createItem", (e, t, s) => {
      var i, r;
      Promise.resolve((i = e.onCreateItem) == null ? void 0 : i.call(e, t, s)).catch((n) => {
        console.error(`${te}Item create hook failed`, n);
      }), E(r = Ce, Ke, Fi).call(r, e);
    }), Hooks.on("updateItem", (e) => {
      var t;
      E(t = Ce, Ke, Fi).call(t, e);
    }), Hooks.on("deleteItem", (e) => {
      var t;
      E(t = Ce, Ke, vr).call(t, e);
    }), Hooks.on("createActiveEffect", (e) => {
      var t;
      E(t = Ce, Ke, xs).call(t, e);
    }), Hooks.on("updateActiveEffect", (e) => {
      var t;
      E(t = Ce, Ke, xs).call(t, e);
    }), Hooks.on("deleteActiveEffect", (e) => {
      var t;
      E(t = Ce, Ke, xs).call(t, e);
    }));
  }
  static canonicalType(e) {
    return Ca[e] ?? e;
  }
  static defaultIconForType(e) {
    return Er[this.canonicalType(e)];
  }
  get canonicalType() {
    return this.constructor.canonicalType(this.type);
  }
  async onCreateItem(e, t) {
  }
  async _preCreate(e, t, s) {
    super._preCreate && await super._preCreate(e, t, s);
    const i = (e == null ? void 0 : e.type) ?? this.type, r = this.constructor.canonicalType(i), n = {};
    if (i !== r && Ca[i] && (n.type = r), po((e == null ? void 0 : e.img) ?? this.img)) {
      const o = this.constructor.defaultIconForType(r);
      o && (n.img = o);
    }
    r === y.itemType.lifeModule && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (n.name = "MWD.itemType.singular.lifeModule"), Object.keys(n).length && this.updateSource(n);
  }
  async _preUpdate(e, t, s) {
    var l, c;
    super._preUpdate && await super._preUpdate(e, t, s);
    const i = e != null && e.system ? foundry.utils.mergeObject(foundry.utils.deepClone(this.system ?? {}), foundry.utils.deepClone(e.system), { inplace: !1 }) : null;
    if (i && this.isPersonalWeapon()) {
      e.system ?? (e.system = {});
      const u = i.ammo;
      e.system.standardTraits = $e(i.standardTraits), e.system.payloads = it(i.payloads, { legacyAmmo: u, category: i.category }), e.system.consumptionSources = ms(i.consumptionSources, { legacyAmmo: u }), e.system.selectedPayloadId = Yt(
        i.selectedPayloadId,
        e.system.payloads,
        { legacyAmmo: u, category: i.category }
      ), e.system.traits = _t(i.traits), e.system.attackRatingBand = pi(i.attackRatingBand), e.system.range = Jt(i.range), e.system.damageType = lt(i.damageType), e.system["-=ammo"] = null, delete e.system.ammo;
    }
    if (i && this.isArmor() && (e.system ?? (e.system = {}), e.system.mitigationByType = nt(i.mitigationByType ?? i.mitigation), e.system.tags = Ls(i.tags), e.system.traits = _t(i.traits), e.system.standardTraits = st(i.standardTraits), e.system.traitState = ci({
      standardTraits: e.system.standardTraits,
      traits: e.system.traits,
      traitState: i.traitState
    }).traitState), !this.isSkill()) return;
    const r = (l = e == null ? void 0 : e.system) == null ? void 0 : l.code;
    if (r === void 0) return;
    const n = this.system.code;
    if (r === n) return;
    const o = Ra(r);
    o && ((c = o == null ? void 0 : o.system) == null || delete c.code, foundry.utils.mergeObject(e, o, { inplace: !0 }));
  }
  prepareBaseData() {
    super.prepareBaseData();
    const e = this.canonicalType;
    e === y.itemType.personalWeapon ? this._preparePersonalWeaponBaseData() : e === y.itemType.armor && this._prepareArmorBaseData();
  }
  _preparePersonalWeaponBaseData() {
    const e = this.system ?? {}, t = e.ammo;
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = lt(e.damageType), e.attackRatingBand = pi(e.attackRatingBand), e.range = Jt(e.range), e.standardTraits = $e(e.standardTraits), e.payloads = it(e.payloads, { legacyAmmo: t, category: e.category }), e.consumptionSources = ms(e.consumptionSources, { legacyAmmo: t }), e.selectedPayloadId = Yt(e.selectedPayloadId, e.payloads, { legacyAmmo: t, category: e.category }), delete e.ammo, e.traits = _t(e.traits), e.notes = String(e.notes ?? "").trim();
  }
  _prepareArmorBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.rating = Math.max(0, Number(e.rating ?? 0)), e.defenseBonus = Number(e.defenseBonus ?? 0) || 0, e.mitigationByType = nt(e.mitigationByType ?? e.mitigation), delete e.mitigation, e.durability ?? (e.durability = {}), e.durability.max = Math.max(0, Number(e.durability.max ?? e.rating ?? 0)), e.durability.current = Math.min(
      e.durability.max,
      Math.max(0, Number(e.durability.current ?? e.durability.max ?? e.rating ?? 0))
    ), e.standardTraits = st(e.standardTraits), e.tags = Ls(e.tags), e.traits = _t(e.traits), e.traitState = ci({
      standardTraits: e.standardTraits,
      traits: e.traits,
      traitState: e.traitState
    }).traitState, e.notes = String(e.notes ?? "").trim();
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
    return [y.itemType.mechWeapon, y.itemType.personalWeapon].includes(this.canonicalType);
  }
  isPersonalWeapon() {
    return this.canonicalType === y.itemType.personalWeapon;
  }
  isArmor() {
    return this.canonicalType === y.itemType.armor;
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
      var i, r;
      const s = (r = (i = t.flags) == null ? void 0 : i[T]) == null ? void 0 : r[Ce.EQUIPPED_EFFECT_FLAG];
      return (s == null ? void 0 : s.sourceItemId) === this.id;
    }) : [];
  }
  async removeSyncedActorEffects({ actor: e = this.actor } = {}) {
    const t = this.getSyncedActorEffects({ actor: e });
    return !t.length || !e ? [] : e.deleteEmbeddedDocuments("ActiveEffect", t.map((s) => s.id));
  }
  async syncEquippedActorEffects({ actor: e = this.actor } = {}) {
    var m, h, g, b;
    if (!e || !this.supportsEquippedEffectSync()) return { created: [], updated: [], deleted: [] };
    const t = this.getSyncedActorEffects({ actor: e }), s = Array.from(((m = this.effects) == null ? void 0 : m.contents) ?? []);
    if (!this.shouldApplyEquippedEffects()) {
      if (!t.length) return { created: [], updated: [], deleted: [] };
      const p = await e.deleteEmbeddedDocuments("ActiveEffect", t.map((f) => f.id));
      return { created: [], updated: [], deleted: p };
    }
    const i = /* @__PURE__ */ new Map();
    for (const p of t) {
      const f = (b = (g = (h = p.flags) == null ? void 0 : h[T]) == null ? void 0 : g[Ce.EQUIPPED_EFFECT_FLAG]) == null ? void 0 : b.sourceEffectId;
      if (!f) continue;
      const w = i.get(f) ?? [];
      w.push(p), i.set(f, w);
    }
    const r = [], n = [], o = [], l = new Set(s.map((p) => p.id));
    for (const [p, f] of i.entries()) {
      if (!l.has(p)) {
        o.push(...f.map((w) => w.id));
        continue;
      }
      f.length > 1 && o.push(...f.slice(1).map((w) => w.id));
    }
    for (const p of s) {
      const w = (i.get(p.id) ?? [])[0] ?? null, M = this._prepareSyncedActorEffectData(p);
      w ? n.push({ _id: w.id, ...M }) : r.push(M);
    }
    const c = o.length ? await e.deleteEmbeddedDocuments("ActiveEffect", o) : [], u = n.length ? await e.updateEmbeddedDocuments("ActiveEffect", n) : [];
    return { created: r.length ? await e.createEmbeddedDocuments("ActiveEffect", r) : [], updated: u, deleted: c };
  }
  _prepareSyncedActorEffectData(e) {
    const t = e.toObject();
    delete t._id;
    const s = String(e.name ?? "Effect").trim() || "Effect", i = String(this.name ?? "Item").trim() || "Item", r = s.startsWith(i) ? s : `${i}: ${s}`;
    return t.name = r, t.transfer = !1, t.origin = e.uuid ?? this.uuid ?? t.origin ?? null, t.flags = foundry.utils.mergeObject(t.flags ?? {}, {
      [T]: {
        [Ce.EQUIPPED_EFFECT_FLAG]: {
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
    return this.canonicalType === y.itemType.skill;
  }
  async rollAttribute(e) {
    this.parent && await Qe.itemAttributeRoll(this, e);
  }
  async switchMonitorCheck(e, t, s, i = void 0) {
    await N.switchMonitorCheck(this.parent, e, t, s, i, this);
  }
  async setCounter(e, t) {
    await N.setCounter(this, e, t);
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
    await this._mutateModifiers((t) => t.filter((s) => s.id !== e));
  }
  async changeModifierSelection(e, t, s) {
    const i = this._computeModifierImpact(t, s);
    this._applyModifierUpdate(e, i);
  }
  _computeModifierImpact(e, t) {
    switch (e) {
      case "group":
        return (s) => {
          s.group !== t && (s.group = t, s.effect = "", s.category = "", s.subCategory = "");
        };
      case "effect":
        return (s) => s.effect = t;
      case "category":
        return (s) => {
          s.category !== t && (s.category = t, s.subCategory = "");
        };
      case "subCategory":
        return (s) => s.subCategory = t;
    }
    return (s) => {
    };
  }
  async changeModifierValue(e, t) {
    this._applyModifierUpdate(e, (s) => s.value = Number(t));
  }
  async changeModifierCondition(e, t) {
    this._applyModifierUpdate(e, (s) => s.condition = t);
  }
  async _applyModifierUpdate(e, t = (s) => {
  }) {
    await this._mutateModifiers((s) => s.map((i) => (i.id === e && t(i), i)));
  }
  async _mutateModifiers(e = (t) => t) {
    const t = e(this.system.modifiers);
    V.reindexIds(t), await this.update({ "system.modifiers": t });
  }
  async _mutateWeaponStandardTraits(e = (t) => t) {
    var s;
    const t = e(foundry.utils.deepClone($e((s = this.system) == null ? void 0 : s.standardTraits)));
    await this.update({ "system.standardTraits": $e(t) });
  }
  async createWeaponStandardTrait(e = {}) {
    await this._mutateWeaponStandardTraits((t) => t.concat([{
      id: e.id ?? foundry.utils.randomID(),
      key: e.key ?? "armorPiercing",
      rating: Math.max(0, Number(e.rating ?? 0) || 0)
    }]));
  }
  async deleteWeaponStandardTrait(e) {
    await this._mutateWeaponStandardTraits((t) => t.filter((s) => s.id !== e));
  }
  async updateWeaponStandardTrait(e, t, s) {
    await this._mutateWeaponStandardTraits((i) => i.map((r) => (r.id !== e || (t === "key" && (r.key = s), t === "rating" && (r.rating = Math.max(0, Number(s ?? 0) || 0))), r)));
  }
  async _mutateArmorStandardTraits(e = (t) => t) {
    var s;
    const t = e(foundry.utils.deepClone(st((s = this.system) == null ? void 0 : s.standardTraits)));
    await this.update({ "system.standardTraits": st(t) });
  }
  async createArmorStandardTrait(e = {}) {
    await this._mutateArmorStandardTraits((t) => t.concat([{
      id: e.id ?? foundry.utils.randomID(),
      key: e.key ?? "ablative",
      rating: Math.max(0, Number(e.rating ?? 0) || 0)
    }]));
  }
  async deleteArmorStandardTrait(e) {
    await this._mutateArmorStandardTraits((t) => t.filter((s) => s.id !== e));
  }
  async updateArmorStandardTrait(e, t, s) {
    await this._mutateArmorStandardTraits((i) => i.map((r) => (r.id !== e || (t === "key" && (r.key = s), t === "rating" && (r.rating = Math.max(0, Number(s ?? 0) || 0))), r)));
  }
  async _mutatePayloads(e = (t) => t) {
    var i, r, n, o, l, c, u;
    const t = e(foundry.utils.deepClone(
      it((i = this.system) == null ? void 0 : i.payloads, {
        legacyAmmo: (r = this.system) == null ? void 0 : r.ammo,
        category: ((n = this.system) == null ? void 0 : n.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
      })
    )).map(Be), s = Yt((l = this.system) == null ? void 0 : l.selectedPayloadId, t, {
      category: ((c = this.system) == null ? void 0 : c.category) ?? ((u = this.system) == null ? void 0 : u.weaponCategory)
    });
    await this.update({
      "system.payloads": t,
      "system.selectedPayloadId": s,
      "system.-=ammo": null
    });
  }
  async _mutateConsumptionSources(e = (t) => t) {
    var s, i;
    const t = e(foundry.utils.deepClone(
      ms((s = this.system) == null ? void 0 : s.consumptionSources, { legacyAmmo: (i = this.system) == null ? void 0 : i.ammo })
    )).map(vt);
    await this.update({
      "system.consumptionSources": t,
      "system.-=ammo": null
    });
  }
  async updatePayloadField(e, t, s) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((r) => r.id !== e ? r : (foundry.utils.setProperty(r, t, s), Be(r))));
  }
  async createPayload(e = {}) {
    await this._mutatePayloads((t) => t.concat([Be({
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
    const t = ((r = this.system) == null ? void 0 : r.category) ?? ((n = this.system) == null ? void 0 : n.weaponCategory), s = it((o = this.system) == null ? void 0 : o.payloads, {
      legacyAmmo: (l = this.system) == null ? void 0 : l.ammo,
      category: t
    }).filter((u) => u.id !== e), i = ((c = s[0]) == null ? void 0 : c.id) ?? "unloaded";
    await this.update({
      "system.payloads": s.length ? s : it([], { category: t }),
      "system.selectedPayloadId": s.some((u) => {
        var d;
        return u.id === ((d = this.system) == null ? void 0 : d.selectedPayloadId);
      }) ? this.system.selectedPayloadId : s.length ? i : "",
      "system.-=ammo": null
    });
  }
  async createPayloadStandardTrait(e, t = {}) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((s) => s.map((i) => i.id !== e ? i : (i.modifies ?? (i.modifies = {}), i.modifies.standardTraits = $e(i.modifies.standardTraits).concat([{
      id: t.id ?? foundry.utils.randomID(),
      key: t.key ?? "armorPiercing",
      rating: Math.max(0, Number(t.rating ?? 0) || 0)
    }]), Be(i))));
  }
  async deletePayloadStandardTrait(e, t) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((s) => s.map((i) => i.id !== e ? i : (i.modifies ?? (i.modifies = {}), i.modifies.standardTraits = $e(i.modifies.standardTraits).filter((r) => r.id !== t), Be(i))));
  }
  async updatePayloadStandardTrait(e, t, s, i) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((r) => r.map((n) => n.id !== e ? n : (n.modifies ?? (n.modifies = {}), n.modifies.standardTraits = $e(n.modifies.standardTraits).map((o) => (o.id !== t || (s === "key" && (o.key = i), s === "rating" && (o.rating = Math.max(0, Number(i ?? 0) || 0))), o)), Be(n))));
  }
  async createConsumptionSource(e = {}) {
    await this._mutateConsumptionSources((t) => t.concat([vt({
      id: e.id ?? foundry.utils.randomID(),
      label: e.label ?? "Source",
      kind: e.kind ?? "internal",
      tracking: e.tracking ?? { current: 0, max: 0 },
      link: e.link ?? {}
    })]));
  }
  async deleteConsumptionSource(e) {
    await this._mutateConsumptionSources((t) => t.filter((s) => s.id !== e)), await this._mutatePayloads((t) => t.map((s) => {
      var i;
      return ((i = s == null ? void 0 : s.consumption) == null ? void 0 : i.sourceId) !== e ? s : (s.consumption.sourceId = "", Be(s));
    }));
  }
  async updateConsumptionSourceField(e, t, s) {
    await this._mutateConsumptionSources((i) => i.map((r) => r.id !== e ? r : (foundry.utils.setProperty(r, t, s), vt(r))));
  }
  getPayloadState({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var s, i, r, n, o;
    return Ii({
      payloads: (s = this.system) == null ? void 0 : s.payloads,
      selectedPayloadId: (i = this.system) == null ? void 0 : i.selectedPayloadId,
      consumptionSources: (r = this.system) == null ? void 0 : r.consumptionSources,
      actor: this.actor ?? null,
      payloadId: e || t,
      category: ((n = this.system) == null ? void 0 : n.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
    });
  }
  async setActivePayload(e) {
    var s, i, r, n, o, l;
    const t = Yt(
      e,
      it((s = this.system) == null ? void 0 : s.payloads, {
        legacyAmmo: (i = this.system) == null ? void 0 : i.ammo,
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
    var i;
    const s = this.getPayloadState({ payloadId: e || t });
    return (i = s == null ? void 0 : s.sourceState) != null && i.isTracked ? Number(s.sourceState.current ?? 0) >= Number(s.sourceState.consumePerUse ?? 1) : !0;
  }
  async consumePayload({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var n;
    const s = this.getPayloadState({ payloadId: e || t });
    if (!((n = s == null ? void 0 : s.sourceState) != null && n.isTracked)) return !0;
    const i = Math.max(1, Number(s.sourceState.consumePerUse ?? 1) || 1), r = Math.max(0, Number(s.sourceState.current ?? 0) || 0);
    return r < i ? !1 : s.sourceState.kind === "internal" ? (await this._mutateConsumptionSources((o) => o.map((l) => {
      var c;
      return l.id !== ((c = s.source) == null ? void 0 : c.id) ? l : (l.tracking ?? (l.tracking = {}), l.tracking.current = Math.max(0, r - i), vt(l));
    })), !0) : s.sourceState.kind === "actorResource" && this.actor && s.sourceState.currentPath ? (await this.actor.update({
      [s.sourceState.currentPath]: Math.max(0, r - i)
    }), !0) : s.sourceState.kind === "itemRef" && s.sourceState.sourceItem && s.sourceState.currentPath ? (await s.sourceState.sourceItem.update({
      [s.sourceState.currentPath]: Math.max(0, r - i)
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
  async updateAmmoType(e, t, s) {
    const i = t === "name" ? "label" : t === "damageType" ? "modifies.damageType" : t === "apMod" ? "modifies.ap" : t.startsWith("attackRatingBandMod.") ? `modifies.attackRatingBand.${t.split(".")[1]}` : t === "traits" ? "modifies.traits" : t;
    await this.updatePayloadField(e, i, s);
  }
  async createAmmoTypeStandardTrait(e, t = {}) {
    await this.createPayloadStandardTrait(e, t);
  }
  async deleteAmmoTypeStandardTrait(e, t) {
    await this.deletePayloadStandardTrait(e, t);
  }
  async updateAmmoTypeStandardTrait(e, t, s, i) {
    await this.updatePayloadStandardTrait(e, t, s, i);
  }
  getCombatProfile({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    if (!this.isPersonalWeapon()) return null;
    const s = this.system ?? {}, i = Jt(s.range), r = String(s.skill ?? "").trim(), n = ot(r), o = Number(s.damage ?? 0) || 0, l = String(s.category ?? s.weaponCategory ?? "ranged").trim() || "ranged", c = xn({
      damageType: s.damageType,
      ap: Number(s.ap ?? s.armorPiercing ?? 0) || 0,
      attackRatingBand: pi(s.attackRatingBand),
      traits: _t(s.traits),
      standardTraits: $e(s.standardTraits),
      payloads: it(s.payloads, { legacyAmmo: s.ammo, category: l }),
      selectedPayloadId: Yt(s.selectedPayloadId, s.payloads, { legacyAmmo: s.ammo, category: l }),
      consumptionSources: ms(s.consumptionSources, { legacyAmmo: s.ammo }),
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
      equipped: !!s.equipped,
      isPrimary: !!s.isPrimary,
      category: l,
      skill: r || "firearms",
      skillDef: n,
      damage: o,
      ap: c.ap,
      damageType: c.damageType,
      damageTypeLabel: Rt(c.damageType),
      attackRatingBand: c.attackRatingBand,
      range: i,
      defaultRangeBand: this.getDefaultRangeBand(i),
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
      notes: String(s.notes ?? s.description ?? "").trim()
    };
  }
  getArmorProfile({ actor: e = this.actor } = {}) {
    var u, d;
    if (!this.isArmor()) return null;
    const t = this.system ?? {}, s = Math.max(0, Number(t.rating ?? 0)), i = Math.max(0, Number(((u = t == null ? void 0 : t.durability) == null ? void 0 : u.max) ?? s)), r = Math.min(
      i,
      Math.max(0, Number(((d = t == null ? void 0 : t.durability) == null ? void 0 : d.current) ?? i))
    ), n = nt((t == null ? void 0 : t.mitigationByType) ?? (t == null ? void 0 : t.mitigation)), o = ci({
      standardTraits: st(t == null ? void 0 : t.standardTraits),
      traits: _t(t == null ? void 0 : t.traits),
      traitState: t == null ? void 0 : t.traitState
    }), l = Ls(t == null ? void 0 : t.tags), c = aa(r);
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
      rating: s,
      defenseBonus: Number(t.defenseBonus ?? 0) || 0,
      currentArmorRating: r,
      baseMitigation: c,
      baseResistance: c,
      mitigationByType: gr(n, o.mitigationByType),
      tags: l,
      isDestroyed: r <= 0,
      durability: {
        current: r,
        max: i
      },
      traitState: o.traitState,
      standardTraits: st(t.standardTraits),
      traits: Fn({
        traits: _t(t.traits),
        standardTraits: st(t.standardTraits)
      }),
      notes: String(t.notes ?? "").trim()
    };
  }
  getDefaultRangeBand(e = Jt(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    return oo(e);
  }
  isWeaponSkill(e) {
    return ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === y.itemType.skill && e.system.code === this.system.skill;
  }
  getWeaponSkill() {
    var s;
    const e = (s = this.actor) == null ? void 0 : s.items.find((i) => this.isWeaponSkill(i));
    if (e) return e;
    const t = game.items.find((i) => this.isWeaponSkill(i));
    return t || Ra(this.system.skill);
  }
  getDefense() {
    if (!this.isPersonalWeapon())
      return this.system.defense ? de.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return de.fixedDefenseCode(this.system.defense);
    const e = ot(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? de.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent) return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0, s = this.isPersonalWeapon() ? this.getCombatProfile() : null;
    return {
      value: co(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: (s == null ? void 0 : s.damageType) ?? this.system.damageType,
      damageTypeLabel: (s == null ? void 0 : s.damageTypeLabel) ?? this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: mo(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  getDamageCode() {
    return uo(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  getDamageTypeLabel() {
    var t;
    if (this.isPersonalWeapon())
      return Rt(((t = this.getCombatProfile()) == null ? void 0 : t.damageType) ?? this.system.damageType);
    const e = ce.mwd.weaponDamageType[this.system.damageType] ?? ce.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return lo(Jt(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  validateTargets(e) {
    var n;
    const t = (n = this.getDamage()) == null ? void 0 : n.monitor, s = Ge.getTargetTokens(game.user), i = s.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), r = s.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (r.length > 0) {
      const o = re(ce.common.errors.ignoredTargets, {
        targets: r.reduce(V.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (i.length === 0) {
      const o = re(ce.common.errors.noTargetSelected, {
        weapon: this.name ?? ce.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(i);
    return i;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, s = va[t] ?? {};
    Vt.checkTargetsCount(s.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), s = va[t] ?? {};
    return s.targets && s.adjust && e <= s.targets ? s.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area === "" ? y.area.none : this.system.area ?? y.area.none;
  }
  _getMonitor() {
    return this.isPersonalWeapon() ? y.monitors.physical : this.system.monitor || y.monitors.physical;
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
Ms = new WeakMap(), Ke = new WeakSet(), Fi = async function(e) {
  if (typeof (e == null ? void 0 : e.syncEquippedActorEffects) == "function")
    try {
      await e.syncEquippedActorEffects();
    } catch (t) {
      console.error(`${te}Failed to sync equipped item effects`, { item: e, error: t });
    }
}, vr = async function(e) {
  if (typeof (e == null ? void 0 : e.removeSyncedActorEffects) == "function")
    try {
      await e.removeSyncedActorEffects({ actor: e.actor ?? e.parent ?? null });
    } catch (t) {
      console.error(`${te}Failed to remove synced item effects`, { item: e, error: t });
    }
}, xs = async function(e) {
  const t = e == null ? void 0 : e.parent;
  if (typeof (t == null ? void 0 : t.syncEquippedActorEffects) == "function")
    try {
      await t.syncEquippedActorEffects();
    } catch (s) {
      console.error(`${te}Failed to sync parent item effects`, { effect: e, error: s });
    }
}, Se(Ce, Ke), Se(Ce, Ms, !1), C(Ce, "RANGE_ORDER", Ut), C(Ce, "EQUIPPED_EFFECT_FLAG", "equippedItemSync"), C(Ce, "DEFAULT_UNARMED", Object.freeze({
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
let as = Ce;
const Na = {
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
}, ho = {
  code: "weapon-range",
  options: {
    flags: { editable: !0 },
    order: 20,
    category: ee.pool,
    labelkey: ce.common.roll.modifiers.weaponRange,
    hbsTemplateRoll: `${x}/roll/parts/select-option.hbs`,
    hbsTemplateChat: void 0
    //``
  },
  isUsed: (a) => !0,
  condition: (a) => a.weapon,
  factory: (a) => {
    const e = a.weapon.getRanges(), t = e.map((s) => s.value);
    return {
      value: e[0].value,
      min: Math.min(...t),
      max: Math.max(...t),
      choices: e,
      selected: e[0].labelkey
    };
  }
}, fo = {
  code: "weapon-area",
  options: {
    used: !0,
    order: 20,
    category: ee.pool,
    labelkey: ce.common.roll.modifiers.weaponArea,
    hbsTemplateRoll: `${x}/roll/parts/input-numeric.hbs`,
    hbsTemplateChat: void 0
    //``
  },
  isUsed: (a) => a.used,
  condition: (a) => a.weapon && a.weapon.getArea() != y.area.none,
  factory: (a) => {
    var s;
    const e = ((s = a.targeting.targetedTokenIds) == null ? void 0 : s.length) ?? 1, t = a.weapon.getAreaModifier(e);
    return {
      value: t,
      min: Math.min(0, t),
      max: Math.max(0, t),
      used: e > 1
    };
  }
}, se = class se extends as {
  static init() {
    Hooks.once(be.REGISTER_ROLL_PARAMETERS, (e) => {
      e(fo), e(ho);
    });
  }
  prepareBaseData() {
    if (super.prepareBaseData(), (this.canonicalType ?? this.type) !== y.itemType.personalWeapon) return;
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = lt(e.damageType), e.attackRatingBand = se.normalizeAttackRatingBand(e.attackRatingBand), e.range = se.normalizeRangeData(e.range), e.traits = se.normalizeTraits(e.traits), e.notes = String(e.notes ?? "").trim();
  }
  static maxIndex(e) {
    const t = se.RANGE_ORDER.indexOf(e);
    return t >= 0 ? t : se.RANGE_ORDER.indexOf("near");
  }
  /**
    * Compute UI-friendly range band data:
    * - cap: normalized max band
    * - bands: [{key, allowed, value}]
    * - optimalKey: highest value among allowed (tie -> closest)
    */
  static getRangeBands(e) {
    const t = e ?? {}, s = se.normalizeRangeKey(t.max ?? "near"), i = se.maxIndex(s), r = se.RANGE_ORDER.map((l, c) => ({
      key: l,
      allowed: c <= i,
      value: Number(t[l] ?? (l === "extreme" && t.long !== void 0 ? t.long : 0))
    }));
    let n = "close", o = -1 / 0;
    for (const l of r)
      l.allowed && l.value > o && (o = l.value, n = l.key);
    return { cap: s, bands: r, optimalKey: n };
  }
  static get defaultIcon() {
    return "systems/mwd/img/colt-m1911.svg";
  }
  static defaultIconForType(e) {
    return e === y.itemType.mechWeapon ? "systems/mwd/img/default/Default_Weapon.svg" : this.defaultIcon;
  }
  static normalizeTraits(e) {
    return Ze(e);
  }
  static normalizeRangeData(e) {
    return {
      max: se.normalizeRangeKey((e == null ? void 0 : e.max) ?? "near"),
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
    if ((this.canonicalType ?? this.type) === y.itemType.personalWeapon)
      return super.getCombatProfile(e);
    const t = this.system ?? {}, s = this.canonicalType ?? this.type, i = se.normalizeRangeData(t.range), r = String(t.skill ?? "").trim(), n = ot(r), o = Number(t.damage ?? 0) || 0, l = Number(t.ap ?? t.armorPiercing ?? 0) || 0, c = String(t.category ?? t.weaponCategory ?? "ranged").trim() || "ranged", u = se.normalizeTraits(t.traits);
    return {
      id: this.id ?? "weapon",
      uuid: this.uuid ?? null,
      name: this.name ?? "Weapon",
      img: this.img,
      item: this,
      type: s,
      equipped: !!t.equipped,
      isPrimary: !!t.isPrimary,
      category: c,
      skill: r || "firearms",
      skillDef: n,
      damage: o,
      ap: l,
      damageType: s === y.itemType.personalWeapon ? lt(t.damageType) : String(t.damageType ?? "kinetic").trim() || "kinetic",
      attackRatingBand: se.normalizeAttackRatingBand(t.attackRatingBand),
      range: i,
      defaultRangeBand: this.getDefaultRangeBand(i),
      traits: u,
      effects: {},
      notes: String(t.notes ?? t.description ?? "").trim()
    };
  }
  getDefaultRangeBand(e = se.normalizeRangeData(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    const s = ["near", "close", "far", "extreme"], i = se.maxIndex(e.max);
    return s.find((r) => se.RANGE_ORDER.indexOf(r) <= i) ?? "close";
  }
  getWeaponSkill() {
    var s;
    const e = (s = this.actor) == null ? void 0 : s.items.find(
      (i) => i.type === y.itemType.skill && i.system.code === this.system.skill
    );
    if (e) return e;
    const t = ot(String(this.system.skill ?? "").trim());
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
    if ((this.canonicalType ?? this.type) !== y.itemType.personalWeapon)
      return this.system.defense ? de.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return de.fixedDefenseCode(this.system.defense);
    const e = ot(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? de.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent)
      return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0;
    return {
      value: se.damageValue(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: this.system.damageType,
      damageTypeLabel: this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: se.armorMode(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  static damageValue(e, t, s, i) {
    if (t = Number(t), s)
      if (i !== void 0)
        t = t + Math.ceil(Number(i) / 2);
      else
        return console.warn("Weapon not attached to an actor"), ce.item.personalWeapon.weaponWithoutActor;
    return t;
  }
  getDamageCode() {
    return se.damageCode(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  static damageCode(e, t, s) {
    let i = "";
    return s && ce.attributes[s] && (i += ce.attributes[s].substring(0, 3).toUpperCase() + "/2 + "), i += String(t), i;
  }
  static armorMode(e, t) {
    return N.useArmor(e) ? t ? "noArmor" : "withArmor" : "";
  }
  getDamageTypeLabel() {
    if ((this.canonicalType ?? this.type) === y.itemType.personalWeapon)
      return Rt(this.system.damageType);
    const e = ce.mwd.weaponDamageType[this.system.damageType] ?? ce.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return se.getRangeList(se.normalizeRangeData(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  _getRange(e) {
    return { value: this.system.range[e], labelkey: Q.getFromList(Q.getEnums().ranges, e) };
  }
  static getRangeList(e) {
    const t = se.normalizeRangeKey(e == null ? void 0 : e.max), s = se.RANGE_ORDER.indexOf(t);
    return se.RANGE_ORDER.map((i, r) => ({
      key: i,
      allowed: s >= 0 ? r <= s : r === 0,
      value: (e == null ? void 0 : e[i]) ?? (i === "extreme" && (e == null ? void 0 : e.long) !== void 0 ? e.long : void 0),
      labelkey: Q.getFromList(Q.getEnums().ranges, i)
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
    const t = (n = this.getDamage()) == null ? void 0 : n.monitor, s = Ge.getTargetTokens(game.user), i = s.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), r = s.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (r.length > 0) {
      const o = re(ce.common.errors.ignoredTargets, {
        targets: r.reduce(V.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (i.length == 0) {
      const o = re(ce.common.errors.noTargetSelected, {
        weapon: this.name ?? ce.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(i);
    return i;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, s = Na[t] ?? {};
    Vt.checkTargetsCount(s.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), s = Na[t] ?? {};
    return s.targets && s.adjust && e <= s.targets ? s.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area == "" ? y.area.none : this.system.area ?? y.area.none;
  }
  _getMonitor() {
    return (this.canonicalType ?? this.type) === y.itemType.personalWeapon ? y.monitors.physical : this.system.monitor || y.monitors.physical;
  }
};
C(se, "RANGE_ORDER", ["close", "near", "far", "extreme"]), C(se, "DEFAULT_UNARMED", as.DEFAULT_UNARMED);
let qe = se;
function go(a) {
  const e = [];
  for (let [t, s] of Object.entries(a ?? {}))
    s !== void 0 && (t = t.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (i, r) => (r ? "-" : "") + i.toLowerCase()), e.push(`data-${t}="${Handlebars.escapeExpression(s)}"`));
  return new Handlebars.SafeString(e.join(" "));
}
function yo({ hash: a }) {
  return a;
}
function bo() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
class ca {
  constructor() {
    this.registerHelpers(), Hooks.once("init", () => {
      this.registerHelpers(), console.log(`${te}Handlebars helpers registered (init)`);
    }), console.log(`${te}Handlebars helpers registered (ctor)`);
  }
  registerHelpers() {
    const e = bo(), t = {
      // Foundry utils
      getProperty: foundry.utils.getProperty,
      // DND5E-inspired utilities
      "mwd-dataset": go,
      "mwd-object": yo,
      // Simple comparisons
      eq: (s, i) => s === i,
      ne: (s, i) => s !== i,
      // Strings/arrays
      concat: (...s) => V.join(s.slice(0, -1)),
      join: (s, i = " ") => Array.isArray(s) ? s.join(i) : "",
      includes: (s, i) => s == null ? void 0 : s.includes(i),
      length: (s) => (s == null ? void 0 : s.length) || 0,
      substring: (s, i, r) => s == null ? void 0 : s.substring(i, r),
      toUpperCase: Sn.toUpperCaseNoAccent,
      // Math
      modulo: (s, i) => s % i,
      divint: V.divint,
      divup: V.divup,
      sum: (s, i) => s + i,
      diff: (s, i) => s - i,
      times: (s, i) => s * i,
      min: (s, i) => Math.min(s, i),
      max: (s, i) => Math.max(s, i),
      // Utility blocks
      for: ca.hbsForLoop,
      // fixes “Missing helper: for”
      range: (s, i) => Array.from({ length: i - s + 1 }, (r, n) => s + n),
      ifGte: (s, i, r) => s >= i ? r.fn(this) : r.inverse(this),
      // Damage / weapons (legacy-compatible)
      weaponDamageLetter: bn.letter,
      weaponDamageCode: qe.damageCode,
      weaponDamageValue: qe.damageValue,
      weaponArmorMode: qe.armorMode,
      weaponRangeList: qe.getRangeList,
      // Icons
      iconFA: _.fontAwesome,
      iconSrc: _.iconSystemPath,
      iconPath: _.iconPath,
      iconD6: _.iconD6,
      // Enums
      localizeAttribute: Q.localizeAttribute
    };
    e.registerHelper(t), e !== Handlebars && Handlebars.registerHelper(t);
  }
  static hbsForLoop(e, t, s) {
    let i = "";
    for (let r = e; r < t; ++r) i += s.fn(r);
    return i;
  }
}
const Da = "sheetTheme", Bi = "mwd-theme-default", So = "mwd-theme-sra", wo = [
  { name: "Default (CSB)", cssClass: Bi },
  { name: "SRA", cssClass: So }
];
class Ao {
  constructor() {
    this.availableStyles = {}, Ht.register(be.REGISTER_STYLES), Hooks.once(be.REGISTER_STYLES, (e) => wo.forEach((t) => e(t.cssClass, t.name))), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(be.REGISTER_STYLES, (e, t) => this.availableStyles[e] = t), console.log(te + "Loaded styles", this.availableStyles), game.settings.register(T, Da, {
      scope: "world",
      name: "Sheet Theme",
      hint: "Select the visual theme used by MWD sheets.",
      config: !0,
      default: Bi,
      choices: this.availableStyles,
      type: String,
      onChange: () => {
        setTimeout(() => {
          var e, t;
          for (const s of Object.values(ui.windows ?? {})) {
            if (typeof (s == null ? void 0 : s.render) != "function") continue;
            const i = s.element instanceof HTMLElement ? s.element : (e = s.element) == null ? void 0 : e[0];
            (t = i == null ? void 0 : i.classList) != null && t.contains("actor-sheet-v2") && s.render(!1);
          }
        }, 0);
      }
    });
  }
  selectCssClass() {
    const e = game.settings.get(T, Da);
    return this.availableStyles[e] ? e : Bi;
  }
}
const To = /* @__PURE__ */ new Set(["overloaded"]);
function Ia(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function ko(a, e) {
  var s, i, r;
  if (!a) return null;
  const t = Ia(e) ?? Ia(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((r = (s = game.actors) == null ? void 0 : s.get) == null ? void 0 : r.call(s, ((i = t == null ? void 0 : t.baseActor) == null ? void 0 : i.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function Rr(a) {
  const e = String(a ?? "").trim();
  if (!e) return "Status";
  const i = (e.includes(".") ? e.split(".").at(-1) : e).replace(/^status/i, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return i ? i.replace(/\b\w/g, (r) => r.toUpperCase()) : e;
}
function Mo(a) {
  const e = String((a == null ? void 0 : a.name) ?? (a == null ? void 0 : a.label) ?? (a == null ? void 0 : a.id) ?? "Status").trim();
  return e ? Rr(e) : "Status";
}
function Po(a) {
  const e = typeof (a == null ? void 0 : a.img) == "string" ? a.img.trim() : "";
  if (e) return e;
  const t = a ? Object.getOwnPropertyDescriptor(a, "icon") : null;
  return "value" in (t ?? {}) ? String(t.value ?? "").trim() : "";
}
function Ys(a, e) {
  var t, s, i, r, n, o;
  return e === "overloaded" ? !!((s = (t = a == null ? void 0 : a.system) == null ? void 0 : t.burn) != null && s.overloaded) || !!((r = (i = a == null ? void 0 : a.statuses) == null ? void 0 : i.has) != null && r.call(i, e)) : ((o = (n = a == null ? void 0 : a.statuses) == null ? void 0 : n.has) == null ? void 0 : o.call(n, e)) ?? !1;
}
function ua(a) {
  const e = /* @__PURE__ */ new Set();
  return (CONFIG.statusEffects ?? []).filter((t) => {
    const s = String((t == null ? void 0 : t.id) ?? "").trim();
    return !s || e.has(s) ? !1 : (e.add(s), !0);
  }).map((t) => {
    const s = String(t.id).trim();
    return {
      id: s,
      label: Mo(t),
      icon: Po(t),
      active: Ys(a, s),
      managed: To.has(s)
    };
  }).sort((t, s) => t.active !== s.active ? t.active ? -1 : 1 : t.label.localeCompare(s.label));
}
function Eo(a) {
  if (!a.length)
    return "<p>No token statuses are configured.</p>";
  const e = foundry.utils.escapeHTML;
  return `
    <div class="mwd-token-status-dialog">
      <p style="margin-top: 0;">Toggle the statuses shown on this token.</p>
      <div style="display: grid; gap: 0.2rem; max-height: 20rem; overflow-y: auto; padding-right: 0.25rem;">
        ${a.map((s) => {
    const i = s.active ? "checked" : "", r = s.icon ? `<img src="${e(s.icon)}" alt="" width="20" height="20" style="flex: 0 0 20px; border: 0;" />` : "", n = s.managed ? '<small style="opacity: 0.7;">Managed by system state</small>' : "";
    return `
      <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.2rem 0;">
        <input type="checkbox" name="status" value="${e(s.id)}" ${i} />
        ${r}
        <span style="flex: 1 1 auto;">${e(s.label)}</span>
        ${n}
      </label>
    `;
  }).join("")}
      </div>
    </div>
  `;
}
async function Co({ actor: a, effects: e, selectedStatusIds: t }) {
  const s = new Set(t);
  for (const i of e) {
    const r = s.has(i.id);
    await Nr({ actor: a, statusId: i.id, active: r });
  }
}
async function Nr({ actor: a, statusId: e, active: t }) {
  if (!a || !e) return !1;
  const s = Ys(a, e);
  return !!t === s ? !1 : e === "overloaded" ? (await a.update({ "system.burn.overloaded": !!t }), !0) : (await a.toggleStatusEffect(e, { active: !!t, overlay: !1 }), !0);
}
async function vo({ actor: a, token: e } = {}) {
  var i;
  if (!a || !e) return !1;
  const t = ko(a, e), s = ua(t);
  return s.length ? foundry.applications.api.DialogV2.wait({
    window: {
      title: `Token Statuses: ${e.name ?? a.name ?? "Token"}`
    },
    position: {
      width: 420
    },
    content: Eo(s),
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
            return await Co({ actor: t, effects: s, selectedStatusIds: c }), !0;
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
  }) : ((i = ui.notifications) == null || i.warn("No token statuses are configured."), !1);
}
const Ro = Object.freeze({
  STR: Et.strength,
  REF: Et.reflexes,
  WIL: Et.willpower,
  INT: Et.intelligence,
  CHA: Et.charisma
}), No = Object.freeze({
  STR: "Strength",
  REF: "Reflexes",
  WIL: "Willpower",
  INT: "Intelligence",
  CHA: "Charisma"
}), Do = Object.freeze({
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
function Dr(a) {
  const e = String(a ?? "").trim();
  return e ? Do[e] ?? null : null;
}
function Io(a) {
  const e = Dr(a);
  return e ? {
    intent: "common",
    id: e.id,
    label: e.label,
    formula: [...e.formula],
    tags: [...e.tags],
    domains: [...e.domains]
  } : null;
}
function Oo(a) {
  return Ro[String(a ?? "").trim().toUpperCase()] ?? null;
}
function _o(a) {
  return No[String(a ?? "").trim().toUpperCase()] ?? String(a ?? "").trim().toUpperCase();
}
function $o(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => String(e ?? "").trim().toUpperCase()).filter(Boolean).join(" + ");
}
const cs = "mwd", us = "personalCombat", Fs = 3, Lo = 1, xo = 1;
function Oa(a, e) {
  return !(a != null && a.activation) || !e ? !1 : a.activation.combatId === e.combatId && Number(a.activation.round ?? -1) === Number(e.round ?? -1) && Number(a.activation.turn ?? -1) === Number(e.turn ?? -1) && a.activation.combatantId === e.combatantId;
}
function zi(a = null) {
  return {
    saRemaining: Fs,
    faRemaining: Lo,
    raRemaining: xo,
    saSpentThisActivation: 0,
    burnThisActivation: 0,
    attacksThisActivation: 0,
    actionLog: [],
    activation: a
  };
}
function _a(a, e = null) {
  return foundry.utils.mergeObject(
    zi(e),
    foundry.utils.deepClone(a ?? {}),
    { inplace: !1, overwrite: !0 }
  );
}
function hi(a) {
  return Array.isArray(a) ? a.map((e) => {
    const t = String((e == null ? void 0 : e.label) ?? "").trim();
    return t ? {
      id: String((e == null ? void 0 : e.id) ?? "").trim(),
      label: t,
      costLabel: String((e == null ? void 0 : e.costLabel) ?? "").trim()
    } : null;
  }).filter(Boolean) : [];
}
function Fo(a) {
  const e = (CONFIG.statusEffects ?? []).find((s) => String((s == null ? void 0 : s.id) ?? "").trim() === a), t = String((e == null ? void 0 : e.name) ?? (e == null ? void 0 : e.label) ?? a ?? "").trim();
  return Rr(t);
}
function Kt(a) {
  const e = Number(a);
  return !Number.isFinite(e) || e === 0 ? "0" : e > 0 ? `+${e}` : String(e);
}
function Bo(a) {
  if (typeof a == "number") return Number.isFinite(a) ? a : 0;
  const e = String(a ?? "").trim().match(/[-+]?\d+(\.\d+)?/);
  return e ? Number(e[0]) : 0;
}
function $a(a) {
  var o;
  const e = (a == null ? void 0 : a.document) ?? a ?? null, t = (a == null ? void 0 : a.object) ?? (e == null ? void 0 : e.object) ?? a ?? null, s = String((e == null ? void 0 : e.id) ?? "").trim(), i = le._pendingTokenPositions.get(s) ?? null, r = Number((i == null ? void 0 : i.x) ?? (e == null ? void 0 : e.x)), n = Number((i == null ? void 0 : i.y) ?? (e == null ? void 0 : e.y));
  return t && Number.isFinite(r) && Number.isFinite(n) && typeof t.getCenter == "function" ? t.getCenter(r, n) : (t == null ? void 0 : t.center) ?? ((o = e == null ? void 0 : e.object) == null ? void 0 : o.center) ?? null;
}
function zo(a, e = "") {
  if (!Number.isFinite(a)) return "";
  const t = Math.round(a * 10) / 10, s = Number.isInteger(t) ? String(t) : t.toFixed(1);
  return e ? `${s} ${e}` : s;
}
class le {
  static init() {
    Hooks.on("updateCombat", (e, t) => this._onUpdateCombat(e, t)), Hooks.on("updateCombatant", (e, t) => this._onUpdateCombatant(e, t)), Hooks.on("updateToken", (e, t) => this._onUpdateToken(e, t)), Hooks.on("createCombatant", (e) => this._onCreateCombatant(e)), Hooks.on("deleteCombatant", (e) => this._onDeleteCombatant(e)), Hooks.on("deleteCombat", (e) => this._onDeleteCombat(e)), Hooks.on("targetToken", (e, t, s) => this._onTargetToken(e, t, s));
  }
  static async onReady() {
    await this.ensureCurrentCombatantState(), this.renderOpenCharacterSheets();
  }
  static _asTokenDocument(e) {
    return e ? (e == null ? void 0 : e.document) ?? e : null;
  }
  static _getTokenSceneId(e) {
    var s, i, r, n;
    const t = this._asTokenDocument(e);
    return ((s = t == null ? void 0 : t.parent) == null ? void 0 : s.id) ?? ((i = t == null ? void 0 : t.scene) == null ? void 0 : i.id) ?? ((n = (r = t == null ? void 0 : t.object) == null ? void 0 : r.scene) == null ? void 0 : n.id) ?? null;
  }
  static _getSceneTokenDocumentById(e, t = ((s) => (s = canvas == null ? void 0 : canvas.scene) == null ? void 0 : s.id)()) {
    var n, o, l, c, u;
    const i = String(e ?? "").trim();
    if (!i || !t) return null;
    const r = ((n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.id) === t ? canvas.scene : (l = (o = game.scenes) == null ? void 0 : o.get) == null ? void 0 : l.call(o, t);
    return ((u = (c = r == null ? void 0 : r.tokens) == null ? void 0 : c.get) == null ? void 0 : u.call(c, i)) ?? null;
  }
  static _collectActorIds(e, t = null) {
    var n, o;
    const s = /* @__PURE__ */ new Set(), i = (l) => {
      const c = String(l ?? "").trim();
      c && s.add(c);
    };
    i(e == null ? void 0 : e.id), i(e == null ? void 0 : e._id);
    const r = this._asTokenDocument(t) ?? this._asTokenDocument(e == null ? void 0 : e.token);
    return i((n = r == null ? void 0 : r.actor) == null ? void 0 : n.id), i((o = r == null ? void 0 : r.baseActor) == null ? void 0 : o.id), i(r == null ? void 0 : r.actorId), s;
  }
  static _tokenDocumentMatchesActor(e, t, s = null) {
    var n, o;
    const i = this._asTokenDocument(e);
    if (!i || !t) return !1;
    const r = s ?? this._collectActorIds(t, i);
    return [
      (n = i == null ? void 0 : i.actor) == null ? void 0 : n.id,
      (o = i == null ? void 0 : i.baseActor) == null ? void 0 : o.id,
      i == null ? void 0 : i.actorId
    ].some((l) => r.has(String(l ?? "").trim()));
  }
  static getPreferredTokenDocument(e) {
    var i, r;
    if (!e) return null;
    const t = this._asTokenDocument(e == null ? void 0 : e.token);
    return t || (((r = (((i = e.getActiveTokens) == null ? void 0 : i.call(e, !0, !0)) ?? [])[0]) == null ? void 0 : r.document) ?? null);
  }
  static getPreferredToken(e) {
    const t = this.getPreferredTokenDocument(e);
    return t ? t.object ?? this._getSceneTokenById(t.id) : null;
  }
  static getCurrentSceneTokenDocument(e, t = null) {
    var g, b, p, f;
    const s = (g = canvas == null ? void 0 : canvas.scene) == null ? void 0 : g.id, i = this._asTokenDocument(t);
    if (this._getTokenSceneId(i) === s) return i;
    const r = String((i == null ? void 0 : i.id) ?? (t == null ? void 0 : t.id) ?? "").trim();
    if (r) {
      const w = this._getSceneTokenDocumentById(r, s);
      if (w) return w;
    }
    const n = this.getPreferredTokenDocument(e);
    if (this._getTokenSceneId(n) === s) return n;
    const o = String((n == null ? void 0 : n.id) ?? "").trim();
    if (o) {
      const w = this._getSceneTokenDocumentById(o, s);
      if (w) return w;
    }
    const c = ((p = (((b = e == null ? void 0 : e.getActiveTokens) == null ? void 0 : b.call(e, !0, !0)) ?? []).find((w) => {
      var M, k;
      return ((k = (M = w == null ? void 0 : w.document) == null ? void 0 : M.parent) == null ? void 0 : k.id) === s;
    })) == null ? void 0 : p.document) ?? null;
    if (c) return c;
    const u = Array.from(((f = canvas == null ? void 0 : canvas.scene) == null ? void 0 : f.tokens) ?? []), d = this._collectActorIds(e, n), m = u.filter((w) => this._tokenDocumentMatchesActor(w, e, d));
    return m.find((w) => {
      var M, k, R;
      return ((M = w == null ? void 0 : w.combatant) == null ? void 0 : M.id) === ((R = (k = game.combat) == null ? void 0 : k.combatant) == null ? void 0 : R.id);
    }) ?? null ?? m[0] ?? null;
  }
  static getCurrentSceneToken(e, t = null) {
    const s = this.getCurrentSceneTokenDocument(e, t);
    return s ? s.object ?? this._getSceneTokenById(s.id) : null;
  }
  static _getSceneTokenById(e) {
    var t, s, i, r;
    return e ? ((s = (t = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : t.get) == null ? void 0 : s.call(t, e)) ?? ((r = (i = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : i.placeables) == null ? void 0 : r.find((n) => n.id === e)) ?? null : null;
  }
  static _measureTokenDistance(e, t) {
    const s = canvas == null ? void 0 : canvas.grid, i = $a(e), r = $a(t), n = globalThis.Ray;
    if (!s || !i || !r) return null;
    if (typeof s.measureDistances == "function" && typeof n == "function")
      try {
        const o = s.measureDistances([{ ray: new n(i, r) }], { gridSpaces: !0 }), l = Number(Array.isArray(o) ? o[0] : NaN);
        if (Number.isFinite(l)) return l;
      } catch {
      }
    if (typeof s.measurePath == "function")
      try {
        const o = s.measurePath([i, r], { gridSpaces: !0 }), l = Number(
          (o == null ? void 0 : o.distance) ?? (o == null ? void 0 : o.cost) ?? (o == null ? void 0 : o.totalDistance) ?? (o == null ? void 0 : o.totalCost) ?? NaN
        );
        if (Number.isFinite(l)) return l;
      } catch {
        return null;
      }
    return null;
  }
  static getUserTargetTokens(e = game.user) {
    var i;
    const s = (Array.isArray((i = e == null ? void 0 : e.targets) == null ? void 0 : i.ids) ? e.targets.ids : []).map((r) => this._getSceneTokenById(r)).filter(Boolean);
    return s.length ? s : Array.from((e == null ? void 0 : e.targets) ?? []).map((r) => (r == null ? void 0 : r.object) ?? r).filter(Boolean);
  }
  static getTargetingSnapshot(e = null, t = game.user) {
    var u, d, m, h, g, b, p, f;
    const s = this.getUserTargetTokens(t), i = s.length;
    if (i === 0)
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
    if (i > 1)
      return {
        count: i,
        none: !1,
        single: !1,
        multiple: !0,
        heading: "Targets",
        primaryLabel: `${i} selected`,
        detailRows: [],
        target: null
      };
    const r = s[0], n = this._measureTokenDistance(e, r), o = String(((d = (u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.grid) == null ? void 0 : d.units) ?? ((h = (m = game.system) == null ? void 0 : m.grid) == null ? void 0 : h.units) ?? "").trim(), l = zo(n, o), c = String((r == null ? void 0 : r.name) ?? ((g = r == null ? void 0 : r.actor) == null ? void 0 : g.name) ?? "Target").trim() || "Target";
    return {
      count: i,
      none: !1,
      single: !0,
      multiple: !1,
      heading: "Target",
      primaryLabel: c,
      detailRows: l ? [{ label: "Distance", value: l }] : [],
      target: {
        id: (r == null ? void 0 : r.id) ?? null,
        name: c,
        img: ((p = (b = r == null ? void 0 : r.document) == null ? void 0 : b.texture) == null ? void 0 : p.src) ?? ((f = r == null ? void 0 : r.texture) == null ? void 0 : f.src) ?? "",
        distance: Number.isFinite(n) ? n : null,
        distanceLabel: l
      }
    };
  }
  static getRollImpact(e = []) {
    const t = (Array.isArray(e) ? e : []).map((i) => {
      const r = Bo((i == null ? void 0 : i.numericValue) ?? (i == null ? void 0 : i.value) ?? 0);
      return {
        label: String((i == null ? void 0 : i.label) ?? "").trim() || "Modifier",
        numericValue: r,
        value: String((i == null ? void 0 : i.value) ?? Kt(r)).trim() || Kt(r)
      };
    }), s = t.reduce((i, r) => i + r.numericValue, 0);
    return {
      total: s,
      totalLabel: Kt(s),
      entries: t
    };
  }
  static getCombat(e, t = null) {
    var m, h, g, b;
    const s = (m = canvas == null ? void 0 : canvas.scene) == null ? void 0 : m.id, i = game.combat, r = this.getCurrentSceneTokenDocument(e, t), n = (r == null ? void 0 : r.object) ?? this._getSceneTokenById((r == null ? void 0 : r.id) ?? null);
    if (!i || ((h = i.scene) == null ? void 0 : h.id) !== s)
      return {
        combat: null,
        combatant: null,
        token: n,
        tokenDocument: r
      };
    let o = ((b = (g = r == null ? void 0 : r.combatant) == null ? void 0 : g.combat) == null ? void 0 : b.id) === i.id ? r.combatant : null;
    const l = Array.from(i.combatants ?? []);
    if (!o) {
      const p = this._collectActorIds(e, r), f = l.filter((k) => {
        const R = String((k == null ? void 0 : k.tokenId) ?? "").trim();
        if (r && R === String(r.id ?? "").trim() || p.has(String((k == null ? void 0 : k.actorId) ?? "").trim())) return !0;
        const F = this._asTokenDocument(k == null ? void 0 : k.token) ?? this._getSceneTokenDocumentById(R, s);
        return this._tokenDocumentMatchesActor(F, e, p);
      }), w = f.find((k) => {
        var R;
        return k.id === ((R = i == null ? void 0 : i.combatant) == null ? void 0 : R.id);
      }) ?? null, M = f.find(
        (k) => r && String((k == null ? void 0 : k.tokenId) ?? "").trim() === String(r.id ?? "").trim()
      ) ?? null;
      o = w ?? M ?? f[0] ?? null;
    }
    !o && l.length === 1 && (n || e) && (o = l[0]);
    const c = this._asTokenDocument(o == null ? void 0 : o.token) ?? this._getSceneTokenDocumentById((o == null ? void 0 : o.tokenId) ?? null, s), u = r ?? c ?? null, d = n ?? (c == null ? void 0 : c.object) ?? this._getSceneTokenById((o == null ? void 0 : o.tokenId) ?? null) ?? null;
    return {
      combat: i,
      combatant: o,
      token: d,
      tokenDocument: u
    };
  }
  static getSnapshot(e, { token: t = null } = {}) {
    var k, R, F, I, W;
    const {
      combat: s,
      combatant: i,
      token: r,
      tokenDocument: n
    } = this.getCombat(e, t), o = !!i && ((k = s == null ? void 0 : s.combatant) == null ? void 0 : k.id) === i.id, l = i ? this.getActivationIdentity(s, i) : null, c = i ? i.getFlag(cs, us) : null, u = i && o && Oa(c, l) ? _a(c, l) : zi(l);
    u.actionLog = hi(u.actionLog);
    const d = Math.max(0, Number(((F = (R = e == null ? void 0 : e.system) == null ? void 0 : R.burn) == null ? void 0 : F.value) ?? 0)), m = Math.floor(d / 2), h = !!((W = (I = e == null ? void 0 : e.system) == null ? void 0 : I.burn) != null && W.overloaded), g = this.getActiveStatuses(e), b = g.filter((U) => !(h && U.id === "overloaded")), p = this.getModifierSummary(e, m), f = this.getRollImpact(p), w = Math.max(0, Number(u.burnThisActivation ?? 0)), M = i ? o ? "" : "Waiting for this combatant's activation." : "No combatant on the current scene.";
    return {
      token: r,
      tokenDocument: n,
      combat: s,
      combatant: i,
      hasCombatant: !!i,
      isCurrentTurn: o,
      overloaded: h,
      burn: {
        value: d,
        penalty: m,
        canOverloadCheck: d >= 6 && !h
      },
      state: u,
      targeting: this.getTargetingSnapshot(r),
      states: h ? [{ id: "overloaded", label: "Overloaded" }] : [],
      effects: b,
      statuses: g,
      rollImpact: f,
      summaryText: `SA: ${u.saRemaining} / ${Fs}   FA: ${u.faRemaining}   RA: ${u.raRemaining}`,
      activation: {
        burnThisActivation: w,
        burnThisActivationLabel: `+${w}`,
        items: [
          { label: "SA", value: `${u.saRemaining}/${Fs}` },
          { label: "FA", value: String(u.faRemaining) },
          { label: "RA", value: String(u.raRemaining) },
          { label: "Burn", value: `+${w}`, detail: "this activation" }
        ]
      },
      inactiveReason: M,
      modifierSummary: p
    };
  }
  static getModifierSummary(e, t = Math.floor(Number(((i) => (i = ((s) => (s = e == null ? void 0 : e.system) == null ? void 0 : s.burn)()) == null ? void 0 : i.value)() ?? 0) / 2)) {
    var c, u;
    const r = ((u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.derived) == null ? void 0 : u.condition) ?? {}, n = [];
    t > 0 && n.push({
      label: "Burn Penalty",
      numericValue: -t,
      value: Kt(-t)
    });
    const o = Number(r.fatiguePenalty ?? 0);
    o && n.push({
      label: "Fatigue",
      numericValue: o,
      value: Kt(o)
    });
    const l = Number(r.physicalPenalty ?? 0);
    return l && n.push({
      label: "Physical",
      numericValue: l,
      value: Kt(l)
    }), n.length || n.push({
      label: "Current Modifiers",
      numericValue: 0,
      value: "0"
    }), n;
  }
  static getActiveStatuses(e) {
    return Array.from((e == null ? void 0 : e.statuses) ?? []).map((s) => ({
      id: s,
      label: Fo(s)
    })).sort((s, i) => s.label.localeCompare(i.label));
  }
  static buildActionModel(e, t) {
    var g, b;
    const s = t.hasCombatant ? "" : "No current-scene combatant.", i = t.isCurrentTurn ? "" : "Only during your activation.", r = t.overloaded ? "Overloaded: only Burn recovery is allowed." : "", n = s || i || r, o = [
      { id: "move", label: "Move", resource: "sa", cost: 1, supported: !0 },
      { id: "aim", label: "Aim", resource: "sa", cost: 1, supported: !0 },
      { id: "reload", label: "Reload", resource: "sa", cost: 1, supported: !0 },
      { id: "assist", label: "Assist", resource: "sa", cost: 1, supported: !0 },
      { id: "stand", label: "Stand", resource: "sa", cost: 1, supported: !0 }
    ].map((p) => this._buildSpendAction(t, p, n)), l = s || i || r || (t.state.saRemaining < 2 ? "Need 2 SA remaining." : ""), c = [
      {
        id: "attack",
        label: "Attack",
        costLabel: "2 SA",
        handler: "combatAttack",
        disabled: !!l,
        reason: l,
        prominent: !0
      },
      { id: "firstAid", label: "First Aid", costLabel: "2 SA" },
      { id: "emergencyRepair", label: "Emergency Repair", costLabel: "2 SA" }
    ].map((p) => p.handler ? p : this._buildStubAction(p)), u = s || i || (t.state.saRemaining <= 0 ? "No SA remaining." : "") || (t.burn.value <= 0 ? "Burn is already at 0." : ""), d = s || i || (t.burn.canOverloadCheck ? "" : t.overloaded ? "Already Overloaded." : "Burn below 6."), m = s || i, h = (p) => {
      const f = Io(p);
      return f ? {
        id: p,
        label: f.label,
        handler: "roll",
        roll: JSON.stringify(f),
        disabled: !1,
        reason: ""
      } : null;
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
        h("composure"),
        h("judgeIntent"),
        h("memory"),
        h("lift"),
        h("endure")
      ].filter(Boolean),
      summaryPills: [
        { label: "SA", value: `${t.state.saRemaining}/${Fs}` },
        { label: "FA", value: `${t.state.faRemaining}` },
        { label: "RA", value: `${t.state.raRemaining}` },
        { label: "Burn/Turn", value: `+${Math.max(0, Number(((g = t.state) == null ? void 0 : g.burnThisActivation) ?? 0))}` }
      ],
      activationLog: hi((b = t.state) == null ? void 0 : b.actionLog).map((p, f) => ({
        ...p,
        index: f + 1
      })),
      menus: [
        {
          id: "simple",
          label: "Simple Actions",
          actions: o
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
              disabled: !!u,
              reason: u,
              prominent: t.burn.value >= 6
            },
            {
              id: "overloadCheck",
              label: "Overload Check",
              costLabel: "Check",
              handler: "combatOverloadCheck",
              disabled: !!d,
              reason: d,
              roll: JSON.stringify({ intent: "overload" }),
              prominent: t.burn.value >= 6
            }
          ]
        },
        {
          id: "complex",
          label: "Complex Actions",
          actions: c
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
  static _buildSpendAction(e, t, s = "") {
    var l;
    const r = Number(((l = e.state) == null ? void 0 : l[`${t.resource}Remaining`]) ?? 0) < t.cost ? `No ${String(t.resource).toUpperCase()} remaining.` : "", n = s || r, o = this._formatCostLabel(t.resource, t.cost);
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
  static _appendActionLog(e, { id: t = "", label: s = "", costLabel: i = "" } = {}) {
    const r = String(s ?? "").trim();
    if (!r) return;
    const n = hi(e == null ? void 0 : e.actionLog);
    n.push({
      id: String(t ?? "").trim(),
      label: r,
      costLabel: String(i ?? "").trim()
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
    const s = this.getActivationIdentity(e, t), i = t.getFlag(cs, us);
    Oa(i, s) || await t.setFlag(cs, us, zi(s));
  }
  static async spendResource(e, {
    token: t = null,
    resource: s = "sa",
    cost: i = 1,
    actionId: r = "",
    actionLabel: n = "",
    actionCostLabel: o = ""
  } = {}) {
    var m;
    const l = this.getSnapshot(e, { token: t });
    if (!l.hasCombatant)
      return { ok: !1, reason: "No combatant on the current scene." };
    if (!l.isCurrentTurn)
      return { ok: !1, reason: "Only available during your activation." };
    const c = `${s}Remaining`, u = Number(((m = l.state) == null ? void 0 : m[c]) ?? 0);
    if (u < i)
      return { ok: !1, reason: `No ${String(s).toUpperCase()} remaining.` };
    const d = _a(l.state, this.getActivationIdentity(l.combat, l.combatant));
    return d[c] = Math.max(0, u - i), s === "sa" && (d.saSpentThisActivation = Number(d.saSpentThisActivation ?? 0) + i, r === "attack" && (d.attacksThisActivation = Number(d.attacksThisActivation ?? 0) + 1)), this._appendActionLog(d, {
      id: r,
      label: n,
      costLabel: o || this._formatCostLabel(s, i)
    }), await l.combatant.setFlag(cs, us, d), { ok: !0, snapshot: this.getSnapshot(e, { token: l.token }) };
  }
  static async reduceBurn(e, { token: t = null } = {}) {
    var o, l, c, u;
    const s = this.getSnapshot(e, { token: t });
    if (!s.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!s.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (s.state.saRemaining <= 0) return { ok: !1, reason: "No SA remaining." };
    if (s.burn.value <= 0) return { ok: !1, reason: "Burn is already at 0." };
    const i = await this.spendResource(e, {
      token: s.token,
      resource: "sa",
      cost: 1,
      actionId: "reduceBurn",
      actionLabel: "Reduce Burn",
      actionCostLabel: "1 SA"
    });
    if (!i.ok) return i;
    const r = Math.max(0, Number(((l = (o = e.system) == null ? void 0 : o.burn) == null ? void 0 : l.value) ?? 0) - 1), n = { "system.burn.value": r };
    return r === 0 && ((u = (c = e.system) == null ? void 0 : c.burn) != null && u.overloaded) && (n["system.burn.overloaded"] = !1), await e.update(n), { ok: !0, snapshot: this.getSnapshot(e, { token: s.token }) };
  }
  static async _onUpdateCombat(e, t) {
    (Object.prototype.hasOwnProperty.call(t ?? {}, "turn") || Object.prototype.hasOwnProperty.call(t ?? {}, "round")) && await this.ensureCurrentCombatantState(), this.renderOpenCharacterSheets();
  }
  static async _onCreateCombatant(e) {
    var s;
    const t = e == null ? void 0 : e.combat;
    ((s = t == null ? void 0 : t.combatant) == null ? void 0 : s.id) === (e == null ? void 0 : e.id) && await this.ensureCurrentCombatantState(), this.renderOpenCharacterSheets();
  }
  static _onDeleteCombatant(e) {
    this.renderOpenCharacterSheets();
  }
  static _onDeleteCombat(e) {
    this.renderOpenCharacterSheets();
  }
  static _onUpdateCombatant(e, t) {
    var s;
    foundry.utils.hasProperty(t, `flags.${cs}.${us}`) && this.renderOpenCharacterSheets((s = e == null ? void 0 : e.actor) == null ? void 0 : s.id);
  }
  static _onTargetToken(e, t, s) {
    var i;
    (e == null ? void 0 : e.id) === ((i = game.user) == null ? void 0 : i.id) && this.queueCharacterSheetRefresh();
  }
  static _onUpdateToken(e, t) {
    var r, n;
    if (!["x", "y", "elevation"].some(
      (o) => Object.prototype.hasOwnProperty.call(t ?? {}, o)
    ) || ((r = e == null ? void 0 : e.parent) == null ? void 0 : r.id) !== ((n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.id)) return;
    const i = String((e == null ? void 0 : e.id) ?? "").trim();
    if (i) {
      const o = Object.prototype.hasOwnProperty.call(t ?? {}, "x") ? Number(t.x) : Number(e == null ? void 0 : e.x), l = Object.prototype.hasOwnProperty.call(t ?? {}, "y") ? Number(t.y) : Number(e == null ? void 0 : e.y);
      Number.isFinite(o) && Number.isFinite(l) && this._pendingTokenPositions.set(i, { x: o, y: l });
    }
    this.queueCharacterSheetRefresh();
  }
  static queueCharacterSheetRefresh(e = null) {
    this._targetRefreshTimeout && clearTimeout(this._targetRefreshTimeout), this._targetRefreshTimeout = setTimeout(() => {
      this._targetRefreshTimeout = null, this.renderOpenCharacterSheets(e);
    }, 0);
  }
  static _collectOpenCharacterSheetApps() {
    var s, i;
    const e = /* @__PURE__ */ new Set(), t = (r) => {
      var n;
      for (const o of Object.values((r == null ? void 0 : r.apps) ?? {}))
        ((n = o == null ? void 0 : o.actor) == null ? void 0 : n.type) === "character" && e.add(o);
    };
    for (const r of Array.from(game.actors ?? []))
      t(r);
    for (const r of Array.from(((s = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : s.placeables) ?? []))
      t(r == null ? void 0 : r.actor);
    for (const r of Object.values(ui.windows ?? {}))
      ((i = r == null ? void 0 : r.actor) == null ? void 0 : i.type) === "character" && e.add(r);
    return Array.from(e);
  }
  static renderOpenCharacterSheets(e = null) {
    var s;
    const t = this._collectOpenCharacterSheetApps();
    for (const i of t)
      if (!(e && ((s = i.actor) == null ? void 0 : s.id) !== e)) {
        if (typeof i.requestCombatDashboardRefresh == "function") {
          i.requestCombatDashboardRefresh();
          continue;
        }
        i.render({ force: !0 });
      }
  }
}
C(le, "_targetRefreshTimeout", null), C(le, "_pendingTokenPositions", /* @__PURE__ */ new Map());
function Ss(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function fi(a, e) {
  var s, i, r;
  if (!a) return null;
  const t = Ss(e) ?? Ss(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((r = (s = game.actors) == null ? void 0 : s.get) == null ? void 0 : r.call(s, ((i = t == null ? void 0 : t.baseActor) == null ? void 0 : i.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function La(a) {
  const e = Number(a ?? 0);
  return Number.isFinite(e) ? Math.trunc(e) : 0;
}
function Os(a, e) {
  var t, s, i;
  return Math.max(0, Number(((i = (s = (t = a == null ? void 0 : a.system) == null ? void 0 : t.monitors) == null ? void 0 : s[e]) == null ? void 0 : i.value) ?? 0) || 0);
}
function xa(a) {
  var e, t;
  return Math.max(0, Number(((t = (e = a == null ? void 0 : a.system) == null ? void 0 : e.burn) == null ? void 0 : t.value) ?? 0) || 0);
}
function ps(a) {
  return a === y.monitors.physical ? "Physical" : a === y.monitors.fatigue ? "Fatigue" : String(a ?? "").trim() || "Track";
}
function Ho(a, e) {
  var t;
  return ((t = ua(e).find((s) => s.id === a)) == null ? void 0 : t.label) ?? a;
}
function Wo(a) {
  const e = foundry.utils.escapeHTML, t = [];
  if (a.mode === "attackDamage" || a.mode === "trackDelta") {
    const s = a.appliedDelta >= 0 ? "Applied" : "Recovered", i = Math.abs(Number(a.appliedDelta ?? 0)), r = i === 1 ? "point" : "points", n = a.usedArmor ? ` via armor-aware ${e(Rt(a.damageType))}` : "";
    t.push(`<div><b>${s}:</b> ${i} ${r} to ${e(ps(a.track))}${n}</div>`), a.usedArmor && a.mitigation && (t.push(
      `<div><b>Mitigation:</b> base ${Number(a.mitigation.baseMitigation ?? 0)} + type ${Number(a.mitigation.typeMitigationMod ?? 0)} - AP ${Number(a.effectiveAp ?? 0)} = ${Number(a.mitigation.netResistance ?? 0)}</div>`
    ), Number(a.mitigation.reinforcedMax ?? 0) > 0 && t.push(
      `<div><b>Reinforced:</b> ${Number(a.mitigation.reinforcedAfter ?? 0)}/${Number(a.mitigation.reinforcedMax ?? 0)}</div>`
    ));
  }
  if (a.mode === "burnDelta") {
    const s = a.appliedDelta >= 0 ? "Adjusted Burn +" : "Adjusted Burn -";
    t.push(`<div><b>${s}</b>${Math.abs(Number(a.appliedDelta ?? 0))}</div>`);
  }
  return a.mode === "status" && t.push(
    `<div><b>Status:</b> ${a.active ? "Applied" : "Removed"} ${e(a.statusLabel ?? a.statusId ?? "Status")}</div>`
  ), t.push(`<div><b>Target:</b> ${e(a.actorName ?? "Actor")}</div>`), a.beforeLabel && a.afterLabel && t.push(`<div><b>Result:</b> ${e(a.beforeLabel)} -> ${e(a.afterLabel)}</div>`), a.source && t.push(`<div><b>Source:</b> ${e(a.source)}</div>`), a.notes && t.push(`<div><b>Notes:</b> ${e(a.notes)}</div>`), `<div class="mwd-gm-notice"><b>GM Harm:</b>${t.join("")}</div>`;
}
function Uo(a) {
  var t, s;
  const e = (s = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : s.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
class Xe {
  static supportsActor(e) {
    return (e == null ? void 0 : e.type) === y.actorTypes.character;
  }
  static getActorOptions() {
    return Array.from(game.actors ?? []).filter((e) => this.supportsActor(e)).sort((e, t) => String(e.name ?? "").localeCompare(String(t.name ?? ""))).map((e) => ({
      id: e.id,
      name: e.name || "Character"
    }));
  }
  static getStatusOptions(e = null) {
    return ua(e).map((t) => ({
      value: t.id,
      label: t.label,
      active: t.active
    }));
  }
  static getSceneTarget() {
    var s, i;
    const e = Array.from(((s = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : s.controlled) ?? []);
    if (e.length > 1)
      return { actor: null, token: null, reason: "Select only one controlled token." };
    if (e.length === 1) {
      const r = Ss(e[0]), n = fi((r == null ? void 0 : r.actor) ?? null, r);
      return this._resolveSceneTargetResult(n, r);
    }
    const t = Array.from(((i = game.user) == null ? void 0 : i.targets) ?? []);
    if (t.length > 1)
      return { actor: null, token: null, reason: "Target only one token." };
    if (t.length === 1) {
      const r = Ss(t[0]), n = fi((r == null ? void 0 : r.actor) ?? null, r);
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
  static resolveTarget({ actor: e = null, token: t = null, actorId: s = "", preferSceneTarget: i = !1 } = {}) {
    var o, l;
    const r = Ss(t);
    if (r) {
      const c = fi((r == null ? void 0 : r.actor) ?? e, r), u = this._resolveSceneTargetResult(c, r);
      if (u.actor) return { ...u, source: "token" };
    }
    if (i) {
      const c = this.getSceneTarget();
      if (c.actor) return { ...c, source: "scene" };
    }
    if (e && this.supportsActor(e))
      return { actor: e, token: r, reason: "", source: "actor" };
    const n = s ? ((l = (o = game.actors) == null ? void 0 : o.get) == null ? void 0 : l.call(o, s)) ?? null : null;
    return n && this.supportsActor(n) ? { actor: n, token: null, reason: "", source: "fallback" } : {
      actor: null,
      token: r,
      source: null,
      reason: i && this.getSceneTarget().reason || "Choose a supported character target."
    };
  }
  static async apply({ actor: e = null, token: t = null, payload: s = {}, options: i = {} } = {}) {
    var l;
    const r = this.resolveTarget({
      actor: e,
      token: t,
      actorId: i.actorId ?? "",
      preferSceneTarget: !!i.preferSceneTarget
    });
    if (!r.actor)
      return { ok: !1, reason: r.reason || "Choose a supported character target." };
    let n;
    switch (String((s == null ? void 0 : s.mode) ?? "").trim()) {
      case "attackDamage":
        n = await this._applyAttackDamage(r.actor, s);
        break;
      case "trackDelta":
        n = await this._applyTrackDelta(r.actor, s);
        break;
      case "burnDelta":
        n = await this._applyBurnDelta(r.actor, s);
        break;
      case "status":
        n = await this._applyStatus(r.actor, s);
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
    if (i.logToChat) {
      const c = Wo(o), u = Uo({
        speaker: ChatMessage.getSpeaker({ actor: r.actor, token: r.token }),
        content: c
      });
      await ChatMessage.create(u);
    }
    return (l = le.renderOpenCharacterSheets) == null || l.call(le, r.actor.id), o;
  }
  static async _applyTrackDelta(e, t) {
    const s = (t == null ? void 0 : t.track) === y.monitors.fatigue ? y.monitors.fatigue : y.monitors.physical, i = La((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0);
    if (!!(t != null && t.useArmor) && i > 0)
      return this._applyPersonalArmorAwareDamage(e, {
        mode: "trackDelta",
        track: s,
        damage: i,
        damageType: t == null ? void 0 : t.damageType,
        ap: (t == null ? void 0 : t.ap) ?? 0,
        effects: (t == null ? void 0 : t.effects) ?? {},
        source: t == null ? void 0 : t.source,
        notes: t == null ? void 0 : t.notes
      });
    const n = Os(e, s);
    await N.addCounter(e, s, i);
    const o = Os(e, s);
    return {
      mode: "trackDelta",
      track: s,
      requestedDelta: i,
      appliedDelta: o - n,
      usedArmor: !1,
      beforeLabel: `${ps(s)} ${n}`,
      afterLabel: `${ps(s)} ${o}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyBurnDelta(e, t) {
    var l, c;
    const s = La((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0), i = xa(e), r = Math.max(0, i + s), n = { "system.burn.value": r };
    r === 0 && ((c = (l = e.system) == null ? void 0 : l.burn) != null && c.overloaded) && (n["system.burn.overloaded"] = !1), await e.update(n);
    const o = xa(e);
    return {
      mode: "burnDelta",
      requestedDelta: s,
      appliedDelta: o - i,
      beforeLabel: `Burn ${i}`,
      afterLabel: `Burn ${o}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyStatus(e, t) {
    const s = String((t == null ? void 0 : t.statusId) ?? (t == null ? void 0 : t.status) ?? "").trim();
    if (!s)
      return { mode: "status", statusId: "", active: !1, statusLabel: "Status", beforeLabel: "", afterLabel: "" };
    const i = Ys(e, s), r = !!(t != null && t.active);
    await Nr({ actor: e, statusId: s, active: r });
    const n = Ys(e, s);
    return {
      mode: "status",
      statusId: s,
      statusLabel: Ho(s, e),
      active: n,
      beforeLabel: i ? "Active" : "Inactive",
      afterLabel: n ? "Active" : "Inactive",
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyAttackDamage(e, t) {
    return this._applyPersonalArmorAwareDamage(e, {
      mode: "attackDamage",
      track: (t == null ? void 0 : t.track) ?? y.monitors.physical,
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
    var W, U, G, Y, D, Z, ue, ne;
    const s = (t == null ? void 0 : t.track) === y.monitors.fatigue ? y.monitors.fatigue : y.monitors.physical, i = Math.max(0, Number((t == null ? void 0 : t.damage) ?? 0) || 0), r = Math.max(0, Number((t == null ? void 0 : t.netHits) ?? 0) || 0), n = (t == null ? void 0 : t.effects) ?? {}, o = ((W = e.getPersonalCombatLoadout) == null ? void 0 : W.call(e, { refresh: !0 })) ?? null, l = (o == null ? void 0 : o.activeArmor) ?? null, c = Math.max(0, Number((l == null ? void 0 : l.currentArmorRating) ?? ((U = l == null ? void 0 : l.durability) == null ? void 0 : U.current) ?? 0) || 0), u = lt(t == null ? void 0 : t.damageType, "concussive"), d = Os(e, s);
    let m = i + r;
    const h = c > 0 ? zn({
      damageIncoming: m,
      armorTags: (l == null ? void 0 : l.tags) ?? [],
      effects: n
    }) : { damageIncoming: m, applied: [] };
    m = h.damageIncoming;
    const g = Bn({
      currentArmorRating: c,
      mitigationByType: (l == null ? void 0 : l.mitigationByType) ?? {},
      damageType: u
    }), b = Math.max(
      0,
      (Number((t == null ? void 0 : t.ap) ?? 0) || 0) + (Number((n == null ? void 0 : n.ap) ?? 0) || 0)
    ), p = g.isDestroyed ? 0 : Math.max(0, g.baseMitigation + g.typeMitigationMod - b), f = Math.max(0, Math.ceil(m - p));
    f > 0 && await N.addCounter(e, s, f);
    const w = Math.max(0, Number(((G = l == null ? void 0 : l.durability) == null ? void 0 : G.current) ?? 0) || 0);
    let M = w;
    const k = Math.max(0, Number(((D = (Y = l == null ? void 0 : l.traitState) == null ? void 0 : Y.reinforced) == null ? void 0 : D.current) ?? 0) || 0), R = Math.max(0, Number(((ue = (Z = l == null ? void 0 : l.traitState) == null ? void 0 : Z.reinforced) == null ? void 0 : ue.max) ?? 0) || 0);
    let F = k;
    if (i + r > 0 && ((ne = l == null ? void 0 : l.item) != null && ne.id)) {
      const me = {};
      k > 0 ? (F = Math.max(0, k - 1), F !== k && (me["system.traitState.reinforced.current"] = F)) : (M = Math.max(0, w - 1), M !== w && (me["system.durability.current"] = M)), Object.keys(me).length > 0 && await l.item.update(me);
    }
    const I = Os(e, s);
    return {
      mode: (t == null ? void 0 : t.mode) ?? "attackDamage",
      track: s,
      requestedDelta: i + r,
      appliedDelta: I - d,
      usedArmor: !0,
      damageType: u,
      effectiveAp: b,
      mitigation: {
        ...g,
        netResistance: p,
        armorBefore: w,
        armorAfter: M,
        reinforcedBefore: k,
        reinforcedAfter: F,
        reinforcedMax: R
      },
      damageIncoming: m,
      adjustedIncoming: m,
      finalDamage: f,
      tagEffectResult: h,
      beforeLabel: `${ps(s)} ${d}`,
      afterLabel: `${ps(s)} ${I}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
}
C(Xe, "MODE_OPTIONS", Object.freeze([
  { value: y.monitors.physical, label: "Physical" },
  { value: y.monitors.fatigue, label: "Fatigue" },
  { value: "burn", label: "Burn" },
  { value: "status", label: "Status" }
]));
const jo = Vs, Hi = "damage-mode", Vo = `${T}.${Hi}`, _s = {}, gi = {};
class J {
  static init() {
    Ht.register(be.PROVIDE_DAMAGE_MODE), Hooks.on("updateSetting", async (e, t, s, i) => J.onUpdateSetting(e, t, s, i)), Hooks.on(be.PROVIDE_DAMAGE_MODE, (e) => {
      e("resistanceArmorMonitor", S.settings.damageMode.values.resistanceArmorMonitor, J.sufferDamageResistanceArmorMonitor), e("armorResistanceMonitor", S.settings.damageMode.values.armorResistanceMonitor, J.sufferDamageArmorResistanceMonitor), e("armorGivesResistance", S.settings.damageMode.values.armorGivesResistance, J.sufferDamageArmorAsResistance_Earthdawn), e("armorGiveResistanceHitsAvoid", S.settings.damageMode.values.armorGiveResistanceHitsAvoid, J.sufferDamageArmorAsResistance_Cyberpunk);
    }), Hooks.once("ready", () => J.onReady());
  }
  static onReady() {
    J._registerDamageModeSetting(), J._selectDamageMode();
  }
  static _registerDamageModeSetting() {
    Hooks.callAll(be.PROVIDE_DAMAGE_MODE, (e, t, s) => {
      _s[e] = t, gi[e] = s;
    }), game.settings.register(T, Hi, {
      scope: "world",
      name: S.settings.damageMode.name,
      hint: S.settings.damageMode.hint,
      config: !0,
      default: Object.keys(_s)[0],
      choices: _s,
      type: String
    });
  }
  static async onUpdateSetting(e, t, s, i) {
    e.key == Vo && J._selectDamageMode();
  }
  static _selectDamageMode() {
    let e = game.settings.get(T, Hi);
    gi[e] || (e = Object.keys(_s)[0]), J.damageModeCode = e, J.damageModeMethod = gi[e];
  }
  static async sufferDamage(e, t, s, i, r, n, o) {
    const { monitor: l, damageType: c } = J._resolveDamageContext(e, t, o);
    if (Vt.checkActorCanReceiveDamage(c ?? l, l, e), J._shouldUsePersonalDamageV2(e, l, o)) {
      await J.sufferPersonalDamageV2(e, l, c, s, i, r, n, o);
      return;
    }
    await (J.damageModeMethod ?? J.sufferDamageResistanceArmorMonitor)(e, l, c, s, i, r, n), await e.applyArmorDamage(l, c, K.sumModifiers([o], "other", "damageArmor"));
  }
  static _shouldUsePersonalDamageV2(e, t, s) {
    var i, r;
    return !((i = e == null ? void 0 : e.isCharacterLike) != null && i.call(e)) || ![y.monitors.physical, y.monitors.fatigue].includes(t) ? !1 : !!((r = s == null ? void 0 : s.isPersonalWeapon) != null && r.call(s) || (s == null ? void 0 : s.canonicalType) === y.itemType.personalWeapon || (s == null ? void 0 : s.type) === y.itemType.personalWeapon);
  }
  static async sufferPersonalDamageV2(e, t, s, i, r, n, o, l) {
    var d;
    const c = ((d = l == null ? void 0 : l.getCombatProfile) == null ? void 0 : d.call(l)) ?? l ?? null, u = await Xe.apply({
      actor: e,
      payload: {
        mode: "attackDamage",
        track: t,
        damage: Number(i ?? (c == null ? void 0 : c.damage) ?? 0) || 0,
        netHits: Number(r ?? 0) || 0,
        damageType: s ?? (c == null ? void 0 : c.damageType),
        ap: Number((c == null ? void 0 : c.ap) ?? 0) || 0,
        effects: (c == null ? void 0 : c.effects) ?? {}
      },
      options: {
        logToChat: !1
      }
    });
    u != null && u.ok && J._notifyPersonalArmorMitigation(e, {
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
    const s = t.armorMitigation ?? {}, i = J._localizeDamageType(t.damageType), r = s.isDestroyed ? "Armor destroyed" : `Base ${Number(s.baseMitigation ?? 0)} + Type ${Number(s.typeMitigationMod ?? 0)} - AP ${Number(t.effectiveAp ?? 0)}`, n = Number(t.adjustedIncoming ?? t.baseIncoming ?? 0), o = Number(t.finalDamage ?? 0), l = (((u = t.tagEffectResult) == null ? void 0 : u.applied) ?? []).map((d) => `${d.tag} +${Math.round((Number(d.bonus ?? 0) || 0) * 100)}%`).join(", "), c = l ? ` [${l}]` : "";
    ui.notifications.info(
      `${e.name} mitigated ${i}: ${r}${c}. Incoming ${n}, final ${o}.`
    );
  }
  static async sufferDamageResistanceArmorMonitor(e, t, s, i, r, n, o) {
    const l = N.resistanceDetail(e, t, s), c = l.value;
    let u = 0;
    if (n) {
      const d = Math.min(c, i), m = Math.min(c - d, r);
      u = i - d, N.useArmor(t) && (u -= await J.damageToArmor(e, s, u)), u += r - m;
    } else
      u = i + r - c, N.useArmor(t) && (u -= await J.damageToArmor(e, s, u));
    u > 0 && await N.addCounter(e, t, u), J._notifyResistanceUsage(e, t, s, l);
  }
  static async sufferDamageArmorResistanceMonitor(e, t, s, i, r, n, o) {
    let l = 0;
    N.useArmor(t) ? n ? (i -= await J.damageToArmor(e, s, i), l = r + i) : (l = r + i, l -= await J.damageToArmor(e, s, l)) : l = i + r;
    const c = N.resistanceDetail(e, t, s);
    return l -= c.value, l > 0 && await N.addCounter(e, t, l), J._notifyResistanceUsage(e, t, s, c), l;
  }
  static async sufferDamageArmorAsResistance_Cyberpunk(e, t, s, i, r, n, o) {
    let l = i + r;
    if (N.useArmor(t) && l > 0) {
      const u = n ? r : 0, d = Math.max(0, J._computeArmorResistance(e) - u);
      d > 0 && (await N.addCounter(e, "armor", 1), l -= d);
    }
    const c = N.resistanceDetail(e, t, s);
    return l -= c.value, l > 0 && await N.addCounter(e, t, l), J._notifyResistanceUsage(e, t, s, c), Math.max(l, 0);
  }
  static async sufferDamageArmorAsResistance_Earthdawn(e, t, s, i, r, n, o) {
    let l = i + r;
    if (N.useArmor(t) && !n && l > 0) {
      const u = J._computeArmorResistance(e);
      u > 0 && (await N.addCounter(e, "armor", 1), l -= u);
    }
    l -= J._computeStrengthResistance(e, t);
    const c = N.resistanceDetail(e, t, s);
    return l -= c.value, l > 0 && await N.addCounter(e, t, l), J._notifyResistanceUsage(e, t, s, c), l;
  }
  static async damageToArmor(e, t, s) {
    if (s > 0) {
      const i = N.max(e, y.monitors.armor), r = N.getCounterValue(e, y.monitors.armor), n = Math.min(i - r, s), o = N.resistance(e, y.monitors.armor, t), l = Math.max(0, n - o);
      return l > 0 && await N.addCounter(e, y.monitors.armor, l), n;
    } else
      return 0;
  }
  static _resolveDamageContext(e, t, s) {
    var o;
    const i = (typeof t == "object" ? (t == null ? void 0 : t.damageType) ?? (t == null ? void 0 : t.type) : t) ?? ((o = s == null ? void 0 : s.system) == null ? void 0 : o.damageType), r = typeof t == "object" ? (t == null ? void 0 : t.monitor) ?? i : i;
    return { monitor: e.getDamageMonitor(r), damageType: i };
  }
  static _notifyResistanceUsage(e, t, s, i) {
    var u;
    if (!i || t === void 0)
      return;
    const r = S.actor.monitors[t] ?? t, n = J._localizeDamageType(s) ?? r, o = i.usedType ? "type" : "default", l = ((u = S.actor.monitors.resistanceSources) == null ? void 0 : u[o]) ?? o, c = re(S.actor.monitors.resistanceApplied, {
      actor: e.name,
      monitor: r,
      damageType: n,
      value: i.value,
      source: l
    });
    ui.notifications.info(c);
  }
  static _localizeDamageType(e) {
    if (e)
      return ur(e) ? Rt(e) : S.mwd.weaponDamageType[e] ?? S.mwd.personalDamageType[e] ?? S.actor.monitors[e] ?? e;
  }
  static _computeArmorResistance(e) {
    const t = N.max(e, "armor"), s = N.getCounterValue(e, "armor"), i = Math.max(0, t - s);
    return Math.max(0, Math.ceil(i / 3));
  }
  static _computeStrengthResistance(e, t) {
    const s = e.getAttributeValue(y.actorAttributes.strength);
    return Math.max(0, Math.floor(s / 4));
  }
}
class ze extends Actor {
  static init() {
    Hooks.on("updateActor", (e, t, s, i) => {
      var r;
      return (r = Ge.firstResponsible(e)) == null ? void 0 : r.onUpdateActor(t, s);
    });
  }
  constructor(e, t = {}) {
    var s;
    if (!((s = t.anarchy) != null && s.ready)) {
      const i = game.system.anarchy.actorClasses[e.type];
      if (foundry.utils.mergeObject(t, { anarchy: { ready: !0 } }), i)
        return e.img || (e.img = i.defaultIcon), new i(e, t);
    }
    t.anarchy = void 0, super(e, t);
  }
  static get initiative() {
    return "2d6 + @modifiers.initiative";
  }
  static get defaultIcon() {
  }
  static padWordListToMin(e, t) {
    for (let s = e.length; s < t; s++)
      e.push({
        word: "",
        id: s + 1,
        audio: "",
        no_delete: !1
      });
    for (let s = 0; s < t; s++)
      e[s].no_delete = !0;
    return e;
  }
  static sortSkills(e, t) {
    return t ? t.sort((s, i) => {
      const r = s.system.code === "knowledge" || s.system.attribute === "knowledge", n = i.system.code === "knowledge" || i.system.attribute === "knowledge";
      if (r && !n) return 1;
      if (!n && r) return -1;
      if (r && n)
        return s.name > i.name ? 1 : s.name > i.name ? -1 : 0;
      const o = e.getAttributeValue(s.system.attribute) + s.system.value, l = e.getAttributeValue(i.system.attribute) + i.system.value;
      return o > l ? -1 : o < l ? 1 : 0;
    }) : [];
  }
  static sortQualities(e) {
    return e ? e.sort((t, s) => t.system.positive === s.system.positive ? t.name > s.name ? 1 : t.name < s.name ? -1 : 0 : t.system.positive ? -1 : s.system.positive ? 1 : 0) : [];
  }
  static sortAssetModules(e) {
    return e ? e.sort((t, s) => t.system.level > s.system.level ? -1 : t.system.level < s.system.level || t.name > s.name ? 1 : t.name < s.name ? -1 : 0) : [];
  }
  static sortAttributeButton(e) {
    return e ? e.sort((t, s) => t.labelkey > s.labelkey ? 1 : t.labelkey < s.labelkey ? -1 : 0) : [];
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
    return [y.actorTypes.vehicle, y.actorTypes.battlemech].includes(this.type);
  }
  prepareData() {
    super.prepareData(), this._prepareEdgePools(), this.cleanupFavorites();
  }
  prepareDerivedData() {
    if (this.system.modifiers = {
      initiative: K.sumModifiers(this.items, "other", "initiative")
    }, this.system.monitors) {
      const e = Q.getDamageTypes();
      Object.entries(this.system.monitors).forEach((t) => {
        t[1].resistance = ze.normalizeResistance(t[1].resistance), t[1].maxBonus = K.sumMonitorModifiers(this.items, t[0], "max"), t[1].resistanceBonus = K.sumMonitorModifiers(this.items, t[0], "resistance"), t[1].resistanceBonusByType = Object.fromEntries(
          e.map((s) => [s.value, K.sumMonitorModifiers(this.items, t[0], "resistanceByType", s.value)]).filter(([, s]) => s)
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
    return ts[this.type] ?? [];
  }
  getPhysicalAgility() {
  }
  getCorrespondingAttribute(e) {
    if (this.getAttributes().includes(e))
      return e;
  }
  async onUpdateActor(e, t) {
    var s, i;
    ((s = e.system) == null ? void 0 : s.monitors) != null && ((i = e.system) == null ? void 0 : i.state) == null && this.update({ "system.state": this.computeState() });
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
    var s;
    if (!((s = this.system) != null && s.counters))
      return;
    const e = this.getAttributeValue(y.actorAttributes.edge), t = foundry.utils.getProperty(this.system, "counters.edgePools") ?? {};
    Object.values(y.counters.edgePools).forEach((i) => {
      const r = t[i] ?? {}, n = r.value;
      r.value = n ?? e ?? 0, r.value = Math.min(r.value, e ?? r.value ?? 0), r.max = e ?? r.max ?? 0, t[i] = r;
    }), foundry.utils.setProperty(this.system, "counters.edgePools", t);
  }
  async setCheckbarValue(e, t) {
    return await this.update({ [e]: t });
  }
  _getMonitorMax(e) {
    const t = this.getAttributeValue(e);
    return t == 0 ? 0 : rr + V.divup(t, 2);
  }
  getAttributeActions() {
    return de.getActorActions(this);
  }
  getUsableAttributes(e = void 0) {
    const t = (e ? [e] : this.items).map((i) => i.getAttributes()).reduce((i, r) => i.concat(r), []), s = V.distinct(this.getAttributes().concat(t));
    return s.sort(V.ascendingBySortedArray(Q.sortedAttributeKeys)), s;
  }
  getAttributeValue(e, t = void 0) {
    let s = 0;
    if (e = this.getCorrespondingAttribute(e), e) {
      if (this.getAttributes().includes(e))
        s = this.system.attributes[e].value;
      else if (t)
        s = (t == null ? void 0 : t.getAttributeValue(e)) ?? 0;
      else {
        const i = this.items.filter((r) => r.getAttributes().includes(e));
        if (i.length > 0) {
          const r = i.map((n) => n.getAttributeValue(e) ?? 0);
          s = Math.max(...r);
        }
      }
      s += K.sumModifiers(this.items, "attribute", e);
    }
    return s;
  }
  resolveDamageType(e) {
    switch (e) {
      case "stun":
        return y.monitors.fatigue;
    }
    return e;
  }
  getDamageMonitor(e) {
    e = this.resolveDamageType(e);
  }
  async applyArmorDamage(e, t, s = 0) {
    switch (e = this.resolveDamageType(e), e) {
      case y.monitors.physical:
      case y.monitors.fatigue:
        await J.damageToArmor(this, t, s);
    }
  }
  async rollAttribute(e) {
    await Qe.rollAttribute(this, e);
  }
  async rollAttributeAction(e) {
    const t = de.getActorAction(this, e);
    await Qe.rollAttributeAction(this, t);
  }
  async rollSkill(e, t) {
    await Qe.rollSkill(this, e, t);
  }
  async rollWeapon(e) {
    var r, n, o;
    Vt.checkWeaponDefense(e, this);
    const t = (r = e.validateTargets(this)) == null ? void 0 : r.map((l) => l.id), s = {
      attackerTokenId: (o = (n = game.scenes.current) == null ? void 0 : n.tokens.find((l) => {
        var c;
        return ((c = l.actor) == null ? void 0 : c.id) == this.id;
      })) == null ? void 0 : o.id,
      targetedTokenIds: t
    }, i = this.items.find((l) => e.isWeaponSkill(l));
    await Qe.rollWeapon(this, i, e, s);
  }
  async rollDefense(e) {
    const t = e.attack.defense, s = de.getActorDefense(this, t);
    await Qe.rollDefense(this, s, e);
  }
  async switchMonitorCheck(e, t, s, i = void 0) {
    await N.switchMonitorCheck(this, e, t, s, i);
  }
  async addCounter(e, t, s = void 0) {
    await N.addCounter(this, e, t, s);
  }
  async setCounter(e, t, s = void 0) {
    await N.setCounter(this, e, t, s);
  }
  canSetMarks() {
    return !1;
  }
  getCyberdeck() {
  }
  canApplyDamage(e) {
    switch (e) {
      case y.monitors.physical:
      case y.monitors.fatigue:
        return this.getDamageMonitor(e) != null;
    }
    return !1;
  }
  canReceiveDamage(e) {
    return this.canApplyDamage(e);
  }
  async onEnterCombat() {
    const e = K.sumModifiers(this.items, "other", "sceneAnarchy");
    e > 0 && await N.setCounter(this, y.monitors.sceneAnarchy, e);
  }
  async onLeaveCombat() {
    await N.setCounter(this, y.monitors.sceneAnarchy, 0);
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
    var i, r;
    const e = this.hasGMAnarchy(), t = (r = (i = game.system) == null ? void 0 : i.anarchy) == null ? void 0 : r.gmAnarchy, s = e && t && typeof t.getAnarchy == "function" ? t.getAnarchy() : {
      isGM: !1,
      value: 0,
      max: 0
    };
    return s.scene = this.getAnarchyScene(), s;
  }
  getAnarchyScene() {
    return 0;
  }
  getAnarchyValue() {
    return this.getAnarchy().value ?? 0;
  }
  async spendCredibility(e) {
    await this.spendEdgePool(y.counters.social.credibility, e);
  }
  async spendRumor(e) {
    await this.spendEdgePool(y.counters.mental.rumor, e);
  }
  async spendAnarchy(e) {
    var t, s;
    if (e && !this.hasPlayerOwner) {
      const i = (s = (t = game.system) == null ? void 0 : t.anarchy) == null ? void 0 : s.gmAnarchy;
      i != null && i.npcConsumesAnarchy && await i.npcConsumesAnarchy(this, e);
      return;
    }
  }
  getEdgePools() {
    var e;
    return ((e = this.system.counters) == null ? void 0 : e.edgePools) ?? {};
  }
  getEdgePoolValue(e) {
    var r, n;
    const t = this.getAttributeValue(y.actorAttributes.edge), i = ((n = (r = this.getEdgePools()) == null ? void 0 : r[e]) == null ? void 0 : n.value) ?? t ?? 0;
    return Math.min(i, t ?? i ?? 0);
  }
  getRemainingEdge(e = void 0) {
    return e ? this.getEdgePoolValue(e) : Math.max(0, ...Object.values(y.counters.edgePools).map((t) => this.getEdgePoolValue(t)));
  }
  canUseEdge() {
    return this.getAttributes().includes(y.actorAttributes.edge);
  }
  async spendEdgePool(e, t) {
    t != 0 && await N.addCounter(this, e, -t);
  }
  async spendEdge(e, t = y.counters.edgePools.grit) {
    if (e != 0) {
      if (!this.canUseEdge()) {
        const s = S.actorType[this.type] ?? this.type, i = `${this.name} (${s}) cannot use Edge`;
        throw ui.notifications.warn(i), i;
      }
      await this.spendEdgePool(t, e);
    }
  }
  getSkillRating(e) {
    var s;
    const t = typeof e == "string" ? this.items.get(e) : e;
    return ((s = t == null ? void 0 : t.system) == null ? void 0 : s.value) ?? 0;
  }
  getSkillValue(e, t = void 0) {
    const s = typeof e == "string" ? this.items.get(e) : e;
    if (!s)
      return 0;
    const i = this.getAttributeValue(s.system.attribute);
    return this.getSkillRating(s) + i + (t ? 2 : 0);
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
    let s = this;
    if (t == "copy") {
      const i = this.clone();
      s = (await Actor.createDocuments([i]))[0];
    }
    await s.update({ "system.ownerId": (e == null ? void 0 : e.id) ?? "" }), e == null || e.render(), this.render();
  }
  getOwnerActor() {
    if (this.system.ownerId)
      return game.actors.get(this.system.ownerId);
  }
  getOwnedActors() {
    return game.actors.filter((e) => e.system.ownerId == this.id);
  }
  hasFavorite(e, t) {
    const s = ze._prepareFavorite(e, t);
    return !!this.system.favorites.find((i) => ze._isSameFavorite(s, i));
  }
  static _prepareFavorite(e, t) {
    return { type: e, id: t };
  }
  static _isSameFavorite(e, t) {
    return e.id == t.id && e.type == t.type;
  }
  async switchFavorite(e, t, s) {
    const i = ze._prepareFavorite(t, s), r = this.system.favorites.filter((n) => !ze._isSameFavorite(i, n));
    e && r.push(i), this.update({ "system.favorites": r });
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
    var i;
    const s = ze._prepareFavorite(e, t);
    if (e == "attributeAction") {
      const r = de.prepareShortcut(this, t);
      if (r)
        return foundry.utils.mergeObject(r, s);
    } else if (Object.values(y.itemType).includes(e)) {
      const r = (i = this.items.get(t)) == null ? void 0 : i.prepareShortcut();
      if (r)
        return foundry.utils.mergeObject(r, s);
    }
    return s;
  }
  async _onSetManualStepper(e, t) {
    var n, o;
    e == null || e.preventDefault();
    const s = (n = t == null ? void 0 : t.dataset) == null ? void 0 : n.id, i = Number((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.value);
    if (!s || Number.isNaN(i)) return;
    const r = this._mwd.state.manual.find((l) => l.id === s);
    if (r)
      return r.value = i, this.render(!1);
  }
}
const { ApplicationV2: Go, HandlebarsApplicationMixin: qo } = foundry.applications.api, { renderTemplate: Fa } = foundry.applications.handlebars, Ko = `${x}/chat/celebrity-roll.hbs`, Xt = class Xt extends qo(Go) {
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
        label: S.actor.counters.edgePools.legend,
        value: e.getCelebrityValue()
      },
      modifiers: foundry.utils.mergeObject(
        { label: S.item.tabs.modifiers },
        K.computeModifiers(e.items, "other", "celebrity")
      ),
      other: {
        label: S.common.roll.modifiers.other,
        value: 0
      },
      ANARCHY: S
    }, s = await Fa(`${x}/dialog/roll-celebrite-title.hbs`, t), i = {
      id: `roll-celebrity-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Xt.DEFAULT_OPTIONS.classes],
      window: { title: s }
    };
    return new Xt({ roll: t }, i).render({ force: !0 });
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
    const s = $(t);
    s.find(".input-celebrity-other").on("input", (i) => {
      this.roll.other.value = Number.parseInt(i.currentTarget.value) ?? 0;
    }), s.find('[data-action="roll"]').on("click", async () => {
      await Xt.doRoll(this.roll), await this.close();
    }), s.find('[data-action="cancel"]').on("click", async () => {
      await this.close();
    });
  }
  static async doRoll(e) {
    const t = [
      e.celebrity,
      e.modifiers,
      e.other
    ], s = V.sumValues(t, (o) => o.value), i = {
      actor: e.actor,
      parameters: t,
      pool: s,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      },
      ANARCHY: S
    }, r = new Roll(`${s}d6cs>=5`);
    await r.evaluate();
    const n = await Fa(Ko, i);
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
C(Xt, "PARTS", {
  body: {
    template: `${x}/dialog/roll-celebrite.hbs`
  }
});
let Wi = Xt;
const { renderTemplate: Yo } = foundry.applications.handlebars, Jo = `${x}/chat/actor-say-word.hbs`;
class Ba extends ze {
  static get initiative() {
    return ze.initiative + " + max(@attributes.reflexes.value, @attributes.intelligence.value)";
  }
  hasOwnAnarchy() {
    return this.hasPlayerOwner;
  }
  prepareDerivedData() {
    !this.system.monitors.fatigue && this.system.monitors.stun && (this.system.monitors.fatigue = foundry.utils.duplicate(this.system.monitors.stun)), this.system.monitors.physical.max = this._getMonitorMax(y.actorAttributes.strength), this.system.monitors.fatigue.max = this._getMonitorMax(y.actorAttributes.willpower), super.prepareDerivedData(), this.system.ignoreWounds = K.sumModifiers(this.items, "other", "ignoreWounds");
  }
  computePhysicalState() {
    var l, c;
    const e = Math.max(0, Number(((l = this.system.monitors.armor) == null ? void 0 : l.max) ?? 0)), t = Math.min(
      e,
      Math.max(0, Number(((c = this.system.monitors.armor) == null ? void 0 : c.value) ?? 0))
    ), s = Math.max(0, e - t), i = Math.max(this.system.monitors.physical.max, this.system.monitors.fatigue.max) + e, r = this.system.monitors.physical.value == this.system.monitors.physical.max, n = this.system.monitors.fatigue.max == this.system.monitors.fatigue.value, o = r || n ? i : Math.max(this.system.monitors.physical.value, this.system.monitors.fatigue.value) + s;
    return {
      max: i,
      value: i - o
    };
  }
  getAttributes() {
    return ts[this.type] ?? ts[y.actorTypes.character];
  }
  getPhysicalAgility() {
    return y.actorAttributes.reflexes;
  }
  getCorrespondingAttribute(e) {
    return y.itemAttributes.firewall == e ? y.itemAttributes.firewall : super.getCorrespondingAttribute(e);
  }
  getDamageMonitor(e) {
    switch (e = this.resolveDamageType(e), e) {
      case y.monitors.fatigue:
      case y.monitors.physical:
        return e;
    }
    return super.getDamageMonitor(e);
  }
  async createWord(e, t) {
    this._mutateWords(e, (s) => s.concat([{ word: t, audio: "" }]));
  }
  async sayWord(e, t) {
    var i, r;
    const s = (i = this.getWord(e, t)) == null ? void 0 : i.word;
    s && ChatMessage.create({
      speaker: { alias: ((r = this.token) == null ? void 0 : r.name) ?? this.name },
      content: await Yo(
        Jo,
        {
          actor: this,
          wordsToSay: s
        }
      )
    });
  }
  getWord(e, t) {
    return e ? this.system[e].find((s) => s.id == t) : void 0;
  }
  async updateWord(e, t, s) {
    this._applyWordUpdate(e, t, (i) => foundry.utils.mergeObject(i, { word: s }, { overwrite: !0 }));
  }
  async _applyWordUpdate(e, t, s) {
    this._mutateWords(e, (i) => i.map((r) => (r.id == t && s(r), r)));
  }
  async deleteWord(e, t) {
    this._mutateWords(e, (s) => s.filter((i) => i.id != t));
  }
  async _mutateWords(e, t = (s) => s) {
    if (!e)
      return;
    let s = t(this.system[e]);
    V.reindexIds(s), await this.update({ [`system.${e}`]: s });
  }
  getCelebrityValue() {
    return this.getEdgePoolValue(y.counters.social.legend);
  }
  getCredibilityValue() {
    return this.getEdgePoolValue(y.counters.social.credibility);
  }
  getRumorValue() {
    return this.getEdgePoolValue(y.counters.mental.rumor);
  }
  getAnarchy() {
    return this.hasOwnAnarchy() ? {
      value: this.system.counters.anarchy.value,
      max: this.system.counters.anarchy.max,
      scene: this.getAnarchyScene()
    } : super.getAnarchy();
  }
  getAnarchyScene() {
    return this.getEdgePoolValue(y.counters.edgePools.chaos);
  }
  async spendAnarchy(e) {
    if (e > 0) {
      const t = this.getAnarchyScene(), s = this.getAnarchyValue();
      Vt.checkSufficient(S.actor.counters.anarchy, e, s + t);
      const i = Math.min(t, e), r = e - i;
      i > 0 && N.addCounter(this, y.monitors.sceneAnarchy, -i), this.hasPlayerOwner ? (await game.system.anarchy.gmAnarchy.actorGivesAnarchyToGM(this, e), N.addCounter(this, y.monitors.anarchy, -r)) : r > 0 && super.spendAnarchy(r);
    }
  }
  canUseEdge() {
    return !0;
  }
  getWounds() {
    const e = V.divint(this.system.monitors.fatigue.value, 3) + V.divint(this.system.monitors.physical.value, 3);
    return Math.max(0, e - this.system.ignoreWounds);
  }
  async rollCelebrity() {
    await Wi.create(this);
  }
}
class Ir extends ze {
  prepareDerivedData() {
    this._prepareMwdAttributes(), this._prepareMwdMonitors(), this._prepareMwdItems(), super.prepareDerivedData();
  }
  static get defaultIcon() {
    return `${Zs}/default/Default_Vehicle.svg`;
  }
  static get initiative() {
    return ze.initiative + " + max(@attributes.system.value, @attributes.handling.value)";
  }
  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    };
  }
  getAttributes() {
    return ts[this.type] ?? ts[y.actorTypes.vehicle];
  }
  getPhysicalAgility() {
    return y.actorAttributes.handling;
  }
  getDamageMonitor(e) {
    switch (e = this.resolveDamageType(e), e) {
      case y.monitors.physical:
        return y.monitors.structure;
      case y.monitors.fatigue:
        return;
    }
    return super.getDamageMonitor(e);
  }
  getRightToDefend() {
    return CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER;
  }
  async _migrateHandlingToAttribute(e) {
    var i;
    const t = ((i = this.system.attributes.handling) == null ? void 0 : i.value) ?? 0, s = this.system.handling;
    s && t < s && await this.update({
      "system.-=handling": null,
      "system.attributes.handling.value": s
    });
  }
  _prepareMwdAttributes() {
    const e = this.system.mwd = this.system.mwd ?? {}, t = {
      [y.actorAttributes.handling]: { value: 0 },
      [y.actorAttributes.system]: { value: 0 },
      [y.actorAttributes.condition]: { value: 0 },
      [y.actorAttributes.chassis]: { value: 0 }
    }, s = foundry.utils.mergeObject(
      foundry.utils.duplicate(t),
      this.system.attributes ?? {},
      { inplace: !1, recursive: !0 }
    );
    this.system.attributes = s, e.attributes = foundry.utils.mergeObject(
      foundry.utils.duplicate(t),
      e.attributes ?? {},
      { inplace: !1, recursive: !0 }
    ), Object.entries(e.attributes).forEach(([i, r]) => {
      var n;
      ((n = s[i]) == null ? void 0 : n.value) === void 0 && (s[i] = s[i] ?? {}, s[i].value = (r == null ? void 0 : r.value) ?? 0);
    });
  }
  _prepareMwdMonitors() {
    var i, r, n, o, l, c, u, d;
    const e = this.system.mwd = this.system.mwd ?? {}, t = this.system.monitors = this.system.monitors ?? {}, s = {
      value: ((i = t.structure) == null ? void 0 : i.value) ?? 0,
      max: ((r = t.structure) == null ? void 0 : r.max) ?? (this.type === y.actorTypes.battlemech ? 18 : 15),
      resistance: ze.normalizeResistance((n = t.structure) == null ? void 0 : n.resistance)
    };
    if (t.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(s),
      t.structure ?? {},
      { inplace: !1, recursive: !0 }
    ), e.monitors = e.monitors ?? {}, e.monitors.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(s),
      e.monitors.structure ?? {},
      { inplace: !1, recursive: !0 }
    ), this.type === y.actorTypes.battlemech) {
      const m = {
        value: ((o = t.heat) == null ? void 0 : o.value) ?? ((l = e.heat) == null ? void 0 : l.current) ?? 0,
        max: ((c = t.heat) == null ? void 0 : c.max) ?? ((u = e.heat) == null ? void 0 : u.hardMax) ?? 4,
        resistance: ze.normalizeResistance((d = t.heat) == null ? void 0 : d.resistance)
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
      traits: ["trait", y.itemType.quality],
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
      Object.entries(t).map(([s, i]) => [
        s,
        this.items.filter((r) => i.includes(r.type))
      ])
    );
  }
}
const za = {
  light: 4,
  medium: 5,
  heavy: 6,
  assault: 7
}, Qo = { mode: "normal", allowedWeaponIds: [], typeRestriction: "" }, Xo = {
  baseProfile: { name: "Unarmed", damage: "", notes: "" },
  maxWeapons: 0,
  allowedLocations: []
};
class Zo {
  constructor(e) {
    this.actor = e, this.mwd = e.system.mwd ?? {};
  }
  compute() {
    const e = this.mwd.weightClass ?? "medium", t = za[e] ?? za.medium, s = this._normalizeHardpoints(), i = this._normalizeWeaponGroups(), r = i.find((f) => f.isPrimary), n = i.filter((f) => f.isPrimary), o = this._primarySlot(), l = [], c = [];
    n.length > 1 && l.push(S.mwd.loadout.errors.multiplePrimary);
    const u = r ? t - 1 : t, d = i.length + (r ? 1 : 0);
    i.length > u && l.push(re(S.mwd.loadout.errors.mountPointsExceeded, {
      used: d,
      total: t
    }));
    const m = this._getWeapons((f) => (f.system.weaponCategory ?? "ranged") !== "melee"), h = new Map(m.map((f) => [f.id, f])), g = /* @__PURE__ */ new Set(), b = s.map((f) => ({ ...f, occupiedBy: null, occupiedByName: void 0 }));
    for (const f of i)
      for (const w of f.weaponIds ?? []) {
        const M = h.get(w);
        if (!M) {
          c.push(re(S.mwd.loadout.warnings.weaponMissing, { weapon: w }));
          continue;
        }
        const k = M.system.hardpointType ?? "energy", R = M.system.hardpointSize ?? "small";
        if (g.has(w)) {
          l.push(re(S.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: M.name }));
          continue;
        }
        if (g.add(w), f.isPrimary && this._validatePrimaryWeapon(M, k, R, o, l), (M.system.weaponCategory ?? "ranged") === "melee")
          continue;
        const F = b.find((I) => !I.occupiedBy && I.type === k && I.size === R);
        F ? (F.occupiedBy = f.id, F.occupiedByName = f.name) : l.push(re(S.mwd.loadout.errors.hardpointUnavailable, {
          weapon: M.name,
          type: S.mwd.hardpointType[k] ?? k,
          size: S.mwd.hardpointSize[R] ?? R
        }));
      }
    r && (!r.weaponIds || r.weaponIds.length === 0) && l.push(S.mwd.loadout.errors.primaryWithoutWeapon);
    const p = this._computeMeleeState(l);
    return {
      mountPoints: {
        total: t,
        used: d,
        remaining: Math.max(0, t - d)
      },
      weightClass: e,
      hardpoints: b,
      weaponGroups: i,
      primaryGroupId: r == null ? void 0 : r.id,
      errors: l,
      warnings: c,
      meleeProfiles: p.profiles,
      meleeLimit: p.limit
    };
  }
  _normalizeWeaponGroups() {
    return (this.mwd.weaponGroups ?? []).map((e, t) => ({
      id: e.id ?? `group-${t + 1}`,
      name: e.name || re(S.common.newName, { type: S.itemType.singular.weapon }),
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
    const e = foundry.utils.mergeObject(foundry.utils.duplicate(Qo), this.mwd.primarySlot ?? {});
    return e.allowedWeaponIds = this._asArray(e.allowedWeaponIds), e;
  }
  _computeMeleeState(e) {
    var o, l, c;
    const t = foundry.utils.mergeObject(foundry.utils.duplicate(Xo), this.mwd.melee ?? {}), s = this._getWeapons((u) => (u.system.weaponCategory ?? "ranged") === "melee"), i = [], r = Number(t.maxWeapons ?? 0);
    s.length > r && e.push(re(S.mwd.loadout.errors.meleeLimitExceeded, {
      equipped: s.length,
      limit: r
    }));
    const n = this._asArray(t.allowedLocations);
    return i.push({
      name: ((o = t.baseProfile) == null ? void 0 : o.name) || S.mwd.melee.baseProfile,
      damage: ((l = t.baseProfile) == null ? void 0 : l.damage) ?? "",
      notes: ((c = t.baseProfile) == null ? void 0 : c.notes) ?? ""
    }), s.forEach((u) => {
      var d;
      n.length > 0 && u.system.mountLocation && !n.includes(u.system.mountLocation) && e.push(re(S.mwd.loadout.errors.meleeLocationRestricted, {
        weapon: u.name,
        location: S.mwd.meleeLocation[u.system.mountLocation] ?? u.system.mountLocation
      })), i.push({
        name: u.name,
        damage: u.getDamageCode(),
        notes: ((d = u.system.references) == null ? void 0 : d.description) ?? ""
      });
    }), { profiles: i, limit: r };
  }
  _validatePrimaryWeapon(e, t, s, i, r) {
    var n;
    i.mode === "converted" ? (((n = i.allowedWeaponIds) == null ? void 0 : n.length) > 0 && !i.allowedWeaponIds.includes(e.id) && r.push(re(S.mwd.loadout.errors.primaryNotAllowedWeapon, { weapon: e.name })), i.typeRestriction && t !== i.typeRestriction && r.push(re(S.mwd.loadout.errors.primaryTypeRestriction, {
      weapon: e.name,
      type: S.mwd.hardpointType[i.typeRestriction] ?? i.typeRestriction
    }))) : s !== "large" && r.push(re(S.mwd.loadout.errors.primaryNeedsLarge, { weapon: e.name }));
  }
  _getWeapons(e) {
    return this.actor.items.filter((t) => t.type === y.itemType.mechWeapon).filter((t) => {
      var s;
      return (s = t.isActive) == null ? void 0 : s.call(t);
    }).filter(e);
  }
  _asArray(e) {
    return Array.isArray(e) ? e : e == null || e === "" ? [] : [e];
  }
}
class el extends Ir {
  static get defaultIcon() {
    return `${Zs}/vehicles/apc.svg`;
  }
  prepareDerivedData() {
    var e;
    super.prepareDerivedData(), this.system.mwd = this.system.mwd ?? {}, this.system.mwd.chassis = this.system.mwd.chassis ?? "", this.system.mwd.tonnage = this.system.mwd.tonnage ?? 0, this.system.mwd.loadout = new Zo(this).compute(), this.system.mwd.weaponGroupDetails = this._prepareConfiguredWeaponGroups(), this.system.mwd.heat = this._prepareHeatTrack(), this.system.mwd.primaryGroupName = ((e = this.system.mwd.weaponGroupDetails.find((t) => t.isPrimary)) == null ? void 0 : e.name) ?? "", this.system.skills = this._prepareSkillMap(), this.system.weaponGroups = this._prepareWeaponGroups(), this.system.meleeProfiles = this._prepareMeleeProfiles(), this.system.quickActions = {
      primaryWeaponGroup: this.system.weaponGroups.find((t) => t.isPrimary),
      hasSensorSweep: !!(this.system.skills.perception || this.system.skills.technician)
    };
  }
  async rollRangedAttack() {
    const e = this.system.weaponGroups ?? [];
    if (e.length === 0) {
      ui.notifications.warn(S.actor.vehicle.quickActions.errors.noRanged);
      return;
    }
    const t = await this._promptWeaponGroup(e);
    if (!t)
      return;
    const s = t.weaponIds.map((i) => this.items.get(i)).filter((i) => i);
    await this._rollQuickSkill(this.system.skills.gunnery, {
      quickAction: {
        title: S.actor.vehicle.quickActions.rangedAttack,
        weaponGroup: this._serializeWeaponGroup(t, s)
      }
    });
  }
  async rollMeleeAttack() {
    const e = this.system.meleeProfiles ?? [];
    if (e.length === 0) {
      ui.notifications.warn(S.actor.vehicle.quickActions.errors.noMelee);
      return;
    }
    const t = await this._promptMeleeProfile(e);
    t && await this._rollQuickSkill(this.system.skills.melee, {
      quickAction: {
        title: S.actor.vehicle.quickActions.meleeAttack,
        meleeProfile: t
      }
    });
  }
  async rollDodge() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: S.actor.vehicle.quickActions.dodgeCheck }
    });
  }
  async rollPilotingCheck() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: S.actor.vehicle.quickActions.pilotingCheck }
    });
  }
  async rollSensorSweep() {
    const e = [this.system.skills.perception, this.system.skills.technician].filter((s) => s);
    if (e.length === 0) {
      ui.notifications.warn(S.actor.vehicle.quickActions.errors.noSensorSweep);
      return;
    }
    const t = await this._promptSensorSweepSkill(e);
    t && await this._rollQuickSkill(t, {
      quickAction: {
        title: S.actor.vehicle.quickActions.sensorSweep,
        skillName: t.name
      }
    });
  }
  async rollEmergencyRepair() {
    await this._rollQuickSkill(this.system.skills.technician, {
      quickAction: { title: S.actor.vehicle.quickActions.emergencyRepair }
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
    const e = this.system ?? {}, t = ((o = e.monitors) == null ? void 0 : o.heat) ?? { value: 0, max: 0 }, s = ((l = e.mwd) == null ? void 0 : l.heat) ?? {}, i = {
      current: t.value ?? 0,
      max: t.max ?? 0,
      thresholds: {
        runningHot: 2,
        overheated: 3,
        shutdown: 4
      }
    }, r = foundry.utils.mergeObject(i, s, { inplace: !1 });
    r.thresholds = foundry.utils.mergeObject(i.thresholds, s.thresholds ?? {}, { inplace: !1 }), r.current = t.value ?? r.current, r.max = t.max ?? r.max;
    const n = this._resolveHeatStatus(r.current, r.thresholds, r.max);
    return this.system.mwd.heatStatus = {
      code: n,
      label: S.actor.battlemech.heat.status[n] ?? n
    }, r;
  }
  _resolveHeatStatus(e, t, s) {
    return e >= ((t == null ? void 0 : t.shutdown) ?? s) ? "shutdown" : e >= ((t == null ? void 0 : t.overheated) ?? s) ? "overheated" : e >= ((t == null ? void 0 : t.runningHot) ?? 0) ? "runningHot" : "safe";
  }
  _prepareConfiguredWeaponGroups() {
    var s;
    const e = ((s = this.system.mwd) == null ? void 0 : s.weaponGroups) ?? [], t = new Map(this.items.map((i) => [i.id, i]));
    return e.map((i, r) => {
      const n = Array.isArray(i.weaponIds) ? i.weaponIds : i.weaponIds ? [i.weaponIds] : [], o = n.map((c) => t.get(c)).filter((c) => (c == null ? void 0 : c.type) === y.itemType.mechWeapon), l = n.filter((c) => !t.has(c));
      return {
        id: i.id ?? `group-${r + 1}`,
        index: r,
        name: i.name || re(S.common.newName, { type: S.itemType.singular.weapon }),
        weaponIds: n,
        isPrimary: i.isPrimary ?? !1,
        weapons: o,
        missingWeaponIds: l
      };
    });
  }
  _resolveSkill(e) {
    var i;
    const t = this.items.find((r) => r.type === y.itemType.skill && r.system.code === e);
    if (t)
      return t;
    const s = ot(e);
    if (s)
      return {
        name: s.label ?? ((i = S.skill) == null ? void 0 : i[e]) ?? e,
        system: {
          code: e,
          attribute: s.attribute,
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
    const t = this.items.filter((n) => n.type === y.itemType.mechWeapon);
    if (t.length === 0)
      return [];
    const s = t.filter((n) => this.hasFavorite(y.itemType.mechWeapon, n.id)), i = [];
    return s.length > 0 && i.push({
      id: "favorite",
      name: S.actor.vehicle.quickActions.primaryWeapons,
      weaponIds: s.map((n) => n.id),
      isPrimary: !0
    }), i.push({
      id: "all",
      name: S.actor.vehicle.quickActions.allWeapons,
      weaponIds: t.map((n) => n.id),
      isPrimary: i.length === 0
    }), i;
  }
  _prepareMeleeProfiles() {
    const e = [{
      id: "unarmed",
      name: S.actor.vehicle.quickActions.unarmed,
      weaponId: null,
      damage: 1,
      notes: S.actor.vehicle.quickActions.unarmedNotes
    }], t = this.items.filter((s) => s.type === y.itemType.mechWeapon && s.system.skill === "meleeCombat");
    return e.push(...t.map((s) => {
      var i;
      return {
        id: s.id,
        name: s.name,
        weaponId: s.id,
        damage: ((i = s.getDamage()) == null ? void 0 : i.value) ?? s.system.damage,
        notes: s.system.description ?? ""
      };
    })), e;
  }
  async _rollQuickSkill(e, t = {}) {
    var r;
    const s = ((r = e == null ? void 0 : e.system) == null ? void 0 : r.attribute) ?? this.getPhysicalAgility(), i = foundry.utils.mergeObject(Qe.prepareActorRoll(this), {
      mode: Re.rollType.skill,
      skill: e,
      attribute1: s,
      specialization: void 0
    });
    t.quickAction && (i.quickAction = t.quickAction), await Qe.create(i);
  }
  async _promptWeaponGroup(e) {
    if (e.length === 1)
      return e[0];
    const t = e.find((r) => r.isPrimary) ?? e[0], s = `<form class="mwd-quick-select">${e.map((r) => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${r.id}" ${r.id === t.id ? "checked" : ""}>
        <span>${r.name}${r.isPrimary ? ` (${S.actor.vehicle.quickActions.primaryLabel})` : ""}</span>
      </label>`).join("")}</form>`, i = await Dialog.prompt({
      title: S.actor.vehicle.quickActions.selectWeaponGroup,
      content: s,
      label: S.common.roll.button,
      callback: (r) => r.find('input[name="weapon-group"]:checked').val() ?? t.id
    });
    return e.find((r) => r.id === i) ?? t;
  }
  async _promptMeleeProfile(e) {
    if (e.length === 1)
      return e[0];
    const t = e[0], s = `<form class="mwd-quick-select">${e.map((r) => `
      <label class="quick-select-option">
        <input type="radio" name="melee-profile" value="${r.id}" ${r.id === t.id ? "checked" : ""}>
        <span>${r.name}</span>
      </label>`).join("")}</form>`, i = await Dialog.prompt({
      title: S.actor.vehicle.quickActions.selectMeleeProfile,
      content: s,
      label: S.common.roll.button,
      callback: (r) => r.find('input[name="melee-profile"]:checked').val() ?? t.id
    });
    return e.find((r) => r.id === i) ?? t;
  }
  async _promptSensorSweepSkill(e) {
    if (e.length === 1)
      return e[0];
    const t = `<form class="mwd-quick-select">${e.map((i) => `
      <label class="quick-select-option">
        <input type="radio" name="sensor-skill" value="${i.system.code}">
        <span>${i.name}</span>
      </label>`).join("")}</form>`, s = await Dialog.prompt({
      title: S.actor.vehicle.quickActions.selectSensorSkill,
      content: t,
      label: S.common.roll.button,
      callback: (i) => i.find('input[name="sensor-skill"]:checked').val()
    });
    return e.find((i) => i.system.code === s) ?? e[0];
  }
  _serializeWeaponGroup(e, t) {
    return {
      id: e.id,
      name: e.name,
      isPrimary: e.isPrimary,
      weaponNames: t.map((s) => s.name)
    };
  }
}
const Bs = "activeModifiers", da = [
  { value: "", label: "All Attributes" },
  { value: "reflexes", label: "Reflexes" },
  { value: "strength", label: "Strength" },
  { value: "willpower", label: "Willpower" },
  { value: "charisma", label: "Charisma" },
  { value: "intelligence", label: "Intelligence" },
  { value: "edge", label: "Edge" }
], ma = [
  { value: "", label: "All Intents" },
  { value: "skill", label: "Skill" },
  { value: "attack", label: "Attack" },
  { value: "defense", label: "Defense" },
  { value: "common", label: "Common" },
  { value: "attribute", label: "Attribute" },
  { value: "edge", label: "Edge" },
  { value: "initiative", label: "Initiative" }
];
function Ha(a) {
  const e = String(a ?? "").trim();
  return e === "" ? null : e;
}
function tl(a) {
  return String((a == null ? void 0 : a.intent) ?? "").trim() || null;
}
function sl(a) {
  var e, t, s;
  return ((e = a == null ? void 0 : a.data) == null ? void 0 : e.attrKey) ?? // skill rolls
  ((s = (t = a == null ? void 0 : a.attack) == null ? void 0 : t.skill) == null ? void 0 : s.attribute) ?? // attack rolls
  null;
}
function Wa(a, e) {
  return a ? e ? a === e : !1 : !0;
}
function Or(a) {
  return {
    id: String((a == null ? void 0 : a.id) ?? ""),
    label: String((a == null ? void 0 : a.label) ?? "").trim(),
    value: Math.trunc(Number((a == null ? void 0 : a.value) ?? 0)) || 0,
    enabled: (a == null ? void 0 : a.enabled) !== !1,
    attributeFilter: Ha(a == null ? void 0 : a.attributeFilter),
    intentFilter: Ha(a == null ? void 0 : a.intentFilter),
    source: (a == null ? void 0 : a.source) === "preset" ? "preset" : "adhoc"
  };
}
class il {
  constructor() {
    C(this, "id", "mwd.sceneModifiers");
  }
  collect({ resolved: e } = {}) {
    var n;
    const t = (n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.getFlag("mwd", Bs);
    if (!Array.isArray(t) || !t.length) return [];
    const s = tl(e), i = sl(e), r = [];
    for (const o of t) {
      const l = Or(o);
      l.enabled && Wa(l.intentFilter, s) && Wa(l.attributeFilter, i) && r.push({
        id: l.id || `scene:${l.label}`,
        label: l.label,
        value: l.value,
        source: "Scene"
      });
    }
    return r;
  }
}
const al = `systems/${T}/templates/settings/collection-editor.hbs`, _r = /* @__PURE__ */ new Map(), yi = /* @__PURE__ */ new Map();
function jt(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid settings data.");
  return t.validationErrors = e, t;
}
function pa(a) {
  nl(a), _r.set(a.id, a), game.settings.register(T, a.settingKey, {
    scope: "world",
    config: !1,
    type: a.settingType ?? Object,
    default: a.defaultData()
  }), game.settings.registerMenu(T, a.menuKey, {
    name: a.menu.name,
    label: a.menu.label,
    hint: a.menu.hint,
    icon: a.menu.icon,
    type: ol(a.id),
    restricted: a.menu.restricted ?? !0
  });
}
function rl(a) {
  return _r.get(a) ?? null;
}
function nl(a) {
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
function ol(a) {
  if (yi.has(a))
    return yi.get(a);
  class e extends $r {
  }
  return C(e, "definitionId", a), yi.set(a, e), e;
}
var B, Lr, Ui, zs, Hs, Qt, ji, hs, xr, Fr, Ne;
class $r extends FormApplication {
  constructor(t = {}, s = {}) {
    super(t, s);
    Se(this, B);
    const i = E(this, B, Hs).call(this);
    this.editorState = {
      tab: "rows",
      rows: this.definition.toRows(i),
      bulkText: this.definition.serializeBulk(i),
      errors: []
    };
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: `${T}-${this.definitionId}-editor`,
      classes: ["mwd", "mwd-settings-editor"],
      template: al,
      width: 880,
      height: 760,
      resizable: !0,
      submitOnChange: !1,
      closeOnSubmit: !1
    }, { inplace: !1 });
  }
  get definition() {
    const t = rl(this.constructor.definitionId);
    if (!t)
      throw new Error(`Missing settings collection definition: ${this.constructor.definitionId}`);
    return t;
  }
  get title() {
    var t;
    return this.definition.title ?? ((t = this.definition.menu) == null ? void 0 : t.name) ?? "Settings Editor";
  }
  getData(t = {}) {
    const s = E(this, B, Fr).call(this), i = this.editorState.rows.map((r, n, o) => ({
      index: n,
      fields: s.map((l) => E(this, B, xr).call(this, l, r, n)),
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
      columns: s.map((r) => ({ key: r.key, label: r.label })),
      rows: i,
      hasRows: i.length > 0,
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
    super.activateListeners(t), t.find("[data-action]").each((s, i) => {
      i.addEventListener("click", (r) => {
        var l;
        const n = r.currentTarget, o = String(((l = n == null ? void 0 : n.dataset) == null ? void 0 : l.action) ?? "").trim();
        o && E(this, B, Lr).call(this, o, r, n);
      });
    });
  }
  async _onSubmit(t, { updateData: s = null, preventClose: i = !0, preventRender: r = !0 } = {}) {
    return super._onSubmit(t, { updateData: s, preventClose: i, preventRender: r });
  }
  async _updateObject(t, s) {
    var i;
    E(this, B, Ne).call(this, []);
    try {
      const r = this.editorState.tab === "bulk" ? this.definition.parseBulk(E(this, B, hs).call(this)) : this.definition.rowsToValue(E(this, B, ji).call(this));
      await game.settings.set(T, this.definition.settingKey, r);
      const n = E(this, B, Hs).call(this);
      E(this, B, zs).call(this, n), await this.close();
    } catch (r) {
      E(this, B, Ne).call(this, $s(r)), this.editorState.errors.length && ((i = ui.notifications) == null || i.error(this.editorState.errors[0])), this.render(!1);
    }
  }
}
B = new WeakSet(), Lr = async function(t, s, i) {
  var r, n, o, l, c, u, d, m;
  switch (s.preventDefault(), s.stopPropagation(), t) {
    case "switchRows":
      E(this, B, hs).call(this), this.editorState.tab = "rows", E(this, B, Ne).call(this, []), this.render(!1);
      return;
    case "switchBulk":
      E(this, B, Qt).call(this);
      try {
        const h = this.definition.rowsToValue(this.editorState.rows);
        this.editorState.bulkText = this.definition.serializeBulk(h), this.editorState.tab = "bulk", E(this, B, Ne).call(this, []);
      } catch (h) {
        E(this, B, Ne).call(this, $s(h)), this.editorState.errors.length && ((r = ui.notifications) == null || r.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "addRow":
      E(this, B, Qt).call(this), this.editorState.rows.push(((o = (n = this.definition).createEmptyRow) == null ? void 0 : o.call(n)) ?? {}), E(this, B, Ne).call(this, []), this.render(!1);
      return;
    case "removeRow":
      E(this, B, Qt).call(this), this.editorState.rows.splice(Number(((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.index) ?? -1), 1), E(this, B, Ne).call(this, []), this.render(!1);
      return;
    case "moveRowUp":
      E(this, B, Qt).call(this), E(this, B, Ui).call(this, Number(((c = i == null ? void 0 : i.dataset) == null ? void 0 : c.index) ?? -1), -1), E(this, B, Ne).call(this, []), this.render(!1);
      return;
    case "moveRowDown":
      E(this, B, Qt).call(this), E(this, B, Ui).call(this, Number(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.index) ?? -1), 1), E(this, B, Ne).call(this, []), this.render(!1);
      return;
    case "loadBulk":
      try {
        const h = this.definition.parseBulk(E(this, B, hs).call(this));
        this.editorState.rows = this.definition.toRows(h), this.editorState.bulkText = this.definition.serializeBulk(h), this.editorState.tab = "rows", E(this, B, Ne).call(this, []);
      } catch (h) {
        E(this, B, Ne).call(this, $s(h)), this.editorState.errors.length && ((d = ui.notifications) == null || d.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "formatBulk":
      try {
        const h = this.definition.parseBulk(E(this, B, hs).call(this));
        this.editorState.bulkText = this.definition.serializeBulk(h), E(this, B, Ne).call(this, []);
      } catch (h) {
        E(this, B, Ne).call(this, $s(h)), this.editorState.errors.length && ((m = ui.notifications) == null || m.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "resetSetting":
      E(this, B, zs).call(this, E(this, B, Hs).call(this)), this.render(!1);
      return;
    case "restoreDefaults":
      E(this, B, zs).call(this, this.definition.defaultData()), this.render(!1);
      return;
    case "cancel":
      await this.close();
      return;
    default:
      return;
  }
}, Ui = function(t, s) {
  if (!Number.isInteger(t)) return;
  const i = t + s;
  if (t < 0 || i < 0 || i >= this.editorState.rows.length) return;
  const r = [...this.editorState.rows], [n] = r.splice(t, 1);
  r.splice(i, 0, n), this.editorState.rows = r;
}, zs = function(t) {
  this.editorState.rows = this.definition.toRows(t), this.editorState.bulkText = this.definition.serializeBulk(t), this.editorState.tab = "rows", E(this, B, Ne).call(this, []);
}, Hs = function() {
  const t = game.settings.get(T, this.definition.settingKey);
  return foundry.utils.deepClone(t ?? this.definition.defaultData());
}, Qt = function() {
  this.editorState.rows = E(this, B, ji).call(this);
}, ji = function() {
  const t = foundry.utils.expandObject(this._getSubmitData()), s = (t == null ? void 0 : t.rows) ?? {};
  return Object.keys(s).sort((i, r) => Number(i) - Number(r)).map((i) => {
    const r = s[i] ?? {};
    return Object.fromEntries(
      this.definition.rowSchema.map((n) => [
        n.key,
        String((r == null ? void 0 : r[n.key]) ?? "")
      ])
    );
  });
}, hs = function() {
  var i;
  const t = this.form, s = (i = t == null ? void 0 : t.querySelector) == null ? void 0 : i.call(t, 'textarea[name="bulkText"]');
  return s instanceof HTMLTextAreaElement && (this.editorState.bulkText = s.value), this.editorState.bulkText ?? "";
}, xr = function(t, s, i) {
  const r = t.type ?? "text", n = String((s == null ? void 0 : s[t.key]) ?? t.default ?? ""), o = r === "select" ? ll(t).map((l) => ({
    value: String(l.value ?? ""),
    label: String(l.label ?? l.value ?? ""),
    selected: String(l.value ?? "") === n
  })) : [];
  return {
    key: t.key,
    label: t.label,
    type: r,
    inputType: r === "select" ? "text" : r,
    name: `rows.${i}.${t.key}`,
    value: n,
    placeholder: t.placeholder ?? "",
    min: t.min ?? "",
    max: t.max ?? "",
    step: t.step ?? "",
    options: o
  };
}, Fr = function() {
  return this.definition.rowSchema.map((t) => ({
    ...t,
    type: t.type ?? "text"
  }));
}, Ne = function(t = []) {
  this.editorState.errors = Array.isArray(t) ? t.filter(Boolean) : [];
}, C($r, "definitionId", "");
function ll(a) {
  const e = typeof a.options == "function" ? a.options() : a.options;
  return Array.isArray(e) ? e : [];
}
function $s(a) {
  const e = Array.isArray(a == null ? void 0 : a.validationErrors) ? a.validationErrors.filter(Boolean) : [String((a == null ? void 0 : a.message) ?? "Unable to save settings.").trim()].filter(Boolean);
  return e.length ? e : ["Unable to save settings."];
}
const Vi = "sceneModifierTemplates", cl = "sceneModifierTemplateEditor", ul = Object.freeze([]);
function Nt(a) {
  const e = String(a ?? "").trim();
  return e === "" ? "" : e;
}
function Br(a = []) {
  const e = [], t = [], s = /* @__PURE__ */ new Set();
  if ((Array.isArray(a) ? a : []).forEach((i, r) => {
    const n = String((i == null ? void 0 : i.label) ?? "").trim(), o = String((i == null ? void 0 : i.value) ?? "").trim(), l = `Row ${r + 1}`;
    if (!n) {
      t.push(`${l}: label cannot be blank.`);
      return;
    }
    if (s.has(n.toLowerCase())) {
      t.push(`${l}: duplicate label "${n}".`);
      return;
    }
    s.add(n.toLowerCase());
    const c = Number(o);
    if (!Number.isFinite(c)) {
      t.push(`${l}: value must be a number.`);
      return;
    }
    e.push({
      label: n,
      value: Math.trunc(c),
      attributeFilter: Nt(i == null ? void 0 : i.attributeFilter),
      intentFilter: Nt(i == null ? void 0 : i.intentFilter)
    });
  }), t.length) throw jt(t);
  return e;
}
function dl(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => ({
    label: String((e == null ? void 0 : e.label) ?? ""),
    value: String((e == null ? void 0 : e.value) ?? "0"),
    attributeFilter: Nt(e == null ? void 0 : e.attributeFilter),
    intentFilter: Nt(e == null ? void 0 : e.intentFilter)
  }));
}
function ml(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (s) {
    throw jt([
      `Bulk JSON must be valid JSON: ${s.message}`
    ]);
  }
  if (!Array.isArray(t))
    throw jt(["Bulk JSON must be an array."]);
  return Br(t.map((s) => ({
    label: String((s == null ? void 0 : s.label) ?? ""),
    value: String((s == null ? void 0 : s.value) ?? "0"),
    attributeFilter: Nt(s == null ? void 0 : s.attributeFilter),
    intentFilter: Nt(s == null ? void 0 : s.intentFilter)
  })));
}
function pl(a = []) {
  return JSON.stringify(
    (Array.isArray(a) ? a : []).map((e) => ({
      label: String((e == null ? void 0 : e.label) ?? ""),
      value: Number((e == null ? void 0 : e.value) ?? 0),
      attributeFilter: Nt(e == null ? void 0 : e.attributeFilter),
      intentFilter: Nt(e == null ? void 0 : e.intentFilter)
    })),
    null,
    2
  );
}
const hl = {
  id: "scene-modifier-templates",
  menuKey: cl,
  settingKey: Vi,
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
      options: da
    },
    {
      key: "intentFilter",
      label: "Intent Filter",
      type: "select",
      options: ma
    }
  ],
  menu: {
    name: "Scene Modifier Templates",
    label: "Configure",
    hint: "Edit the preset scene modifier templates available in the GM Gadget.",
    icon: "fas fa-cloud",
    restricted: !0
  },
  defaultData: () => foundry.utils.deepClone(ul),
  createEmptyRow: () => ({
    label: "",
    value: "0",
    attributeFilter: "",
    intentFilter: ""
  }),
  toRows: dl,
  rowsToValue: Br,
  parseBulk: ml,
  serializeBulk: pl
};
function fl() {
  pa(hl);
}
const { ApplicationV2: gl, HandlebarsApplicationMixin: yl } = foundry.applications.api, bl = "mwd-gmgadget", zr = "gmDnPresets", Ws = "gmNextDn", fs = "gmDnAnnounceToChat", Sl = Object.freeze([
  { label: "Standard", dn: 1 },
  { label: "Challenging", dn: 2 },
  { label: "Hard", dn: 3 },
  { label: "Extreme", dn: 4 }
]), wl = "systems/mwd/templates/v2/mwd-gmgadget.hbs", gs = Object.freeze({
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
function Al(a = "") {
  return String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean).map((e) => {
    const [t, s] = e.split(":").map((n) => (n ?? "").trim()), i = t || "DN", r = Number.isFinite(Number(s)) ? Number(s) : Number(t);
    return {
      label: i,
      dn: Number.isFinite(r) ? Math.max(0, Math.trunc(r)) : null
    };
  }).filter((e) => Number.isFinite(e.dn));
}
function Tl(a = []) {
  const e = new Error(a[0] ?? "Invalid GM DN presets.");
  return e.validationErrors = Array.isArray(a) ? a.filter(Boolean) : [], e;
}
function kl() {
  return foundry.utils.deepClone(Sl);
}
function vs(a, { strict: e = !1 } = {}) {
  const t = typeof a == "string" ? Al(a) : Array.isArray(a) ? a : [], s = [], i = [], r = /* @__PURE__ */ new Set();
  if (t.forEach((n, o) => {
    const l = String((n == null ? void 0 : n.label) ?? "").trim(), c = n == null ? void 0 : n.dn, u = `Preset ${o + 1}`;
    if (!l) {
      e && i.push(`${u}: label cannot be blank.`);
      return;
    }
    const d = l.toLowerCase();
    if (r.has(d)) {
      e && i.push(`${u}: duplicate label "${l}".`);
      return;
    }
    const m = Number(c);
    if (!Number.isFinite(m)) {
      e && i.push(`${u}: DN must be numeric.`);
      return;
    }
    if (m < 0) {
      e && i.push(`${u}: DN cannot be negative.`);
      return;
    }
    r.add(d), s.push({
      label: l,
      dn: Math.trunc(m)
    });
  }), e && i.length) throw Tl(i);
  return s;
}
function bi(a = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(gs),
    a ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function Ml(a) {
  var t, s;
  return !(a != null && a.token) || !(a != null && a.actor) ? {
    label: "No scene target",
    reason: String((a == null ? void 0 : a.reason) ?? "No controlled or targeted token."),
    supported: !1
  } : {
    label: String(((t = a.token) == null ? void 0 : t.name) ?? ((s = a.actor) == null ? void 0 : s.name) ?? "Token").trim(),
    reason: "",
    supported: !0
  };
}
function Pl(a) {
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
function El(a) {
  return Xe.getStatusOptions(a);
}
function Cl(a = "mwd") {
  game.settings.register(a, Ws, {
    scope: "client",
    config: !1,
    type: Number,
    default: 1
  }), game.settings.register(a, fs, {
    scope: "client",
    config: !0,
    name: "Announce GM DN changes to chat",
    hint: "If enabled, posts a small chat notice when you change the current DN preset.",
    type: Boolean,
    default: !1
  });
}
const ve = class ve extends yl(gl) {
  constructor({ systemId: e = "mwd", ...t } = {}) {
    super(t), this.systemId = e, this.activeTab = "difficulty", this.harmState = bi();
  }
  async render(e = {}) {
    var t;
    return (t = game.user) != null && t.isGM ? super.render(e) : this;
  }
  async _prepareContext(e) {
    var g, b, p, f;
    const t = await super._prepareContext(e), s = vs(
      game.settings.get(this.systemId, zr),
      { strict: !1 }
    ), i = Number(game.settings.get(this.systemId, Ws) ?? 1), r = !!game.settings.get(this.systemId, fs), n = Xe.getActorOptions(), o = Xe.getSceneTarget(), l = this.harmState.actorId ? ((b = (g = game.actors) == null ? void 0 : g.get) == null ? void 0 : b.call(g, this.harmState.actorId)) ?? null : null, c = Xe.resolveTarget({
      actor: l,
      actorId: this.harmState.actorId,
      preferSceneTarget: !0
    }), u = El(c.actor ?? l ?? null), d = bi(this.harmState);
    !d.statusId && u.length && (d.statusId = u[0].value, this.harmState.statusId = d.statusId);
    const m = Ua(
      game.settings.get(this.systemId, Vi)
    ), h = ja(
      (p = canvas == null ? void 0 : canvas.scene) == null ? void 0 : p.getFlag("mwd", Bs)
    );
    return foundry.utils.mergeObject(t, {
      presets: s,
      currentDn: i,
      currentTab: this.activeTab,
      announce: r,
      isGM: ((f = game.user) == null ? void 0 : f.isGM) ?? !1,
      scene: {
        hasScene: !!(canvas != null && canvas.scene),
        templates: m,
        activeModifiers: h,
        attributeFilterOptions: da,
        intentFilterOptions: ma
      },
      harm: {
        state: d,
        actorOptions: n,
        modes: Xe.MODE_OPTIONS,
        damageTypes: jo,
        statusOptions: u,
        sceneTarget: Ml(o),
        effectiveTarget: Pl(c),
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
    const s = (n, o = "") => {
      const l = t.querySelector(n);
      return l instanceof HTMLInputElement || l instanceof HTMLSelectElement || l instanceof HTMLTextAreaElement ? l.value : o;
    }, i = (n, o = !1) => {
      const l = t.querySelector(n);
      return l instanceof HTMLInputElement ? l.checked : o;
    };
    return this.harmState = bi({
      actorId: s('[name="harm-actorId"]', this.harmState.actorId),
      mode: s('[name="harm-mode"]', this.harmState.mode),
      delta: Number(s('[name="harm-delta"]', this.harmState.delta)),
      useArmor: i('[name="harm-useArmor"]', this.harmState.useArmor),
      damageType: s('[name="harm-damageType"]', this.harmState.damageType),
      statusId: s('[name="harm-statusId"]', this.harmState.statusId),
      statusActive: s('[name="harm-statusActive"]', this.harmState.statusActive ? "add" : "remove") !== "remove",
      source: s('[name="harm-source"]', this.harmState.source),
      notes: s('[name="harm-notes"]', this.harmState.notes)
    }), Number.isFinite(Number(this.harmState.delta)) || (this.harmState.delta = gs.delta), this.harmState;
  }
  async _onSetDn(e, t) {
    var r, n, o;
    if (e.preventDefault(), e.stopPropagation(), !((r = game.user) != null && r.isGM)) return;
    const s = Math.max(0, Math.trunc(Number(((n = t == null ? void 0 : t.dataset) == null ? void 0 : n.dn) ?? NaN)));
    if (!Number.isFinite(s)) return;
    if (await game.settings.set(this.systemId, Ws, s), !!game.settings.get(this.systemId, fs)) {
      const l = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.label) ?? `DN ${s}`);
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ user: game.user }),
        content: `<div class="mwd-gm-notice"><b>GM Difficulty:</b> ${foundry.utils.escapeHTML(l)} (DN ${s} hits)</div>`
      });
    }
    return this.render({ parts: ["body"] });
  }
  async _onSwitchTab(e, t) {
    var i, r, n;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (r = e == null ? void 0 : e.stopPropagation) == null || r.call(e);
    const s = String(((n = t == null ? void 0 : t.dataset) == null ? void 0 : n.tab) ?? "").trim();
    if (!(!s || s === this.activeTab))
      return this._captureHarmStateFromDom(t), this.activeTab = s, this.render({ parts: ["body"] });
  }
  async _onClearDn(e, t) {
    var s;
    if (e.preventDefault(), e.stopPropagation(), !!((s = game.user) != null && s.isGM))
      return await game.settings.set(this.systemId, Ws, 1), this.render({ parts: ["body"] });
  }
  async _onToggleAnnounce(e, t) {
    var i;
    if (e.preventDefault(), e.stopPropagation(), !((i = game.user) != null && i.isGM)) return;
    const s = !game.settings.get(this.systemId, fs);
    return await game.settings.set(this.systemId, fs, s), this.render({ parts: ["body"] });
  }
  async _onHarmInputChange(e, t) {
    var i, r;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), this._captureHarmStateFromDom(t);
    const s = String(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.harmKey) ?? "").trim();
    if (["actorId", "mode", "useArmor"].includes(s))
      return this.render({ parts: ["body"] });
  }
  async _onRefreshHarmTarget(e, t) {
    var s, i;
    return (s = e == null ? void 0 : e.preventDefault) == null || s.call(e), (i = e == null ? void 0 : e.stopPropagation) == null || i.call(e), this._captureHarmStateFromDom(t), this.render({ parts: ["body"] });
  }
  async _onApplyHarm(e, t) {
    var n, o, l, c, u;
    if ((n = e == null ? void 0 : e.preventDefault) == null || n.call(e), (o = e == null ? void 0 : e.stopPropagation) == null || o.call(e), !((l = game.user) != null && l.isGM)) return;
    const s = this._captureHarmStateFromDom(t), i = this._buildHarmPayload(s);
    if (!i) {
      (c = ui.notifications) == null || c.warn("Choose a valid harm action before applying it.");
      return;
    }
    const r = await Xe.apply({
      payload: i,
      options: {
        actorId: s.actorId,
        preferSceneTarget: !0,
        logToChat: !0
      }
    });
    return r != null && r.ok ? this.render({ parts: ["body"] }) : ((u = ui.notifications) == null || u.warn((r == null ? void 0 : r.reason) ?? "Unable to apply harm."), this.render({ parts: ["body"] }));
  }
  _buildHarmPayload(e) {
    const t = String((e == null ? void 0 : e.source) ?? "").trim(), s = String((e == null ? void 0 : e.notes) ?? "").trim(), i = String((e == null ? void 0 : e.mode) ?? "").trim();
    if (i === "status") {
      const r = String((e == null ? void 0 : e.statusId) ?? "").trim();
      return r ? {
        mode: "status",
        statusId: r,
        active: !!(e != null && e.statusActive),
        source: t,
        notes: s
      } : null;
    }
    return i === "burn" ? {
      mode: "burnDelta",
      delta: Va(e == null ? void 0 : e.delta, gs.delta),
      source: t,
      notes: s
    } : i === "physical" || i === "fatigue" ? {
      mode: "trackDelta",
      track: i,
      delta: Va(e == null ? void 0 : e.delta, gs.delta),
      useArmor: !!(e != null && e.useArmor),
      damageType: (e == null ? void 0 : e.damageType) ?? gs.damageType,
      source: t,
      notes: s
    } : null;
  }
  // ---- Scene modifier actions ----
  async _onAddSceneModifierFromPreset(e, t) {
    var l, c, u, d;
    if ((l = e == null ? void 0 : e.preventDefault) == null || l.call(e), (c = e == null ? void 0 : e.stopPropagation) == null || c.call(e), !((u = game.user) != null && u.isGM)) return;
    const s = ((d = t == null ? void 0 : t.closest) == null ? void 0 : d.call(t, ".mwd-gmgadget__root")) ?? this._getRootElement(), i = s instanceof HTMLElement ? s.querySelector('select[name="scene-preset-index"]') : null, r = i instanceof HTMLSelectElement ? Number(i.value) : NaN, n = Ua(
      game.settings.get(this.systemId, Vi)
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
    var i, r, n, o;
    if ((i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (r = e == null ? void 0 : e.stopPropagation) == null || r.call(e), !((n = game.user) != null && n.isGM)) return;
    const s = this._captureAdhocFormFromDom(t);
    if (!s) {
      (o = ui.notifications) == null || o.warn("Label and a numeric value are required.");
      return;
    }
    await this._mutateSceneModifiers((l) => [...l, s]);
  }
  async _onToggleSceneModifier(e, t) {
    var i, r, n, o;
    if ((i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (r = e == null ? void 0 : e.stopPropagation) == null || r.call(e), !((n = game.user) != null && n.isGM)) return;
    const s = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.modId) ?? "").trim();
    s && await this._mutateSceneModifiers(
      (l) => l.map((c) => c.id === s ? { ...c, enabled: !c.enabled } : c)
    );
  }
  async _onRemoveSceneModifier(e, t) {
    var i, r, n, o;
    if ((i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (r = e == null ? void 0 : e.stopPropagation) == null || r.call(e), !((n = game.user) != null && n.isGM)) return;
    const s = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.modId) ?? "").trim();
    s && await this._mutateSceneModifiers((l) => l.filter((c) => c.id !== s));
  }
  async _onClearSceneModifiers(e, t) {
    var s, i, r;
    (s = e == null ? void 0 : e.preventDefault) == null || s.call(e), (i = e == null ? void 0 : e.stopPropagation) == null || i.call(e), (r = game.user) != null && r.isGM && await this._mutateSceneModifiers(() => []);
  }
  async _mutateSceneModifiers(e) {
    const t = canvas == null ? void 0 : canvas.scene;
    if (!t) return;
    const s = ja(t.getFlag("mwd", Bs)), i = await e(s);
    return await t.setFlag("mwd", Bs, i), this.render({ parts: ["body"] });
  }
  _captureAdhocFormFromDom(e) {
    var c;
    const t = ((c = e == null ? void 0 : e.closest) == null ? void 0 : c.call(e, ".mwd-gmgadget__root")) ?? this._getRootElement();
    if (!(t instanceof HTMLElement)) return null;
    const s = (u) => {
      const d = t.querySelector(u);
      return d instanceof HTMLInputElement || d instanceof HTMLSelectElement ? d.value : "";
    }, i = s('[name="scene-adhoc-label"]').trim(), r = s('[name="scene-adhoc-value"]').trim(), n = s('[name="scene-adhoc-attributeFilter"]').trim() || null, o = s('[name="scene-adhoc-intentFilter"]').trim() || null;
    if (!i) return null;
    const l = Number(r);
    return Number.isFinite(l) ? {
      id: foundry.utils.randomID(),
      label: i,
      value: Math.trunc(l),
      enabled: !0,
      attributeFilter: n,
      intentFilter: o,
      source: "adhoc"
    } : null;
  }
};
C(ve, "DEFAULT_OPTIONS", {
  id: bl,
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
    switchTab: ve.prototype._onSwitchTab,
    setDn: ve.prototype._onSetDn,
    clearDn: ve.prototype._onClearDn,
    toggleAnnounce: ve.prototype._onToggleAnnounce,
    harmInputChange: ve.prototype._onHarmInputChange,
    refreshHarmTarget: ve.prototype._onRefreshHarmTarget,
    applyHarm: ve.prototype._onApplyHarm,
    addSceneModifierFromPreset: ve.prototype._onAddSceneModifierFromPreset,
    addSceneModifierAdhoc: ve.prototype._onAddSceneModifierAdhoc,
    toggleSceneModifier: ve.prototype._onToggleSceneModifier,
    removeSceneModifier: ve.prototype._onRemoveSceneModifier,
    clearSceneModifiers: ve.prototype._onClearSceneModifiers
  }
}), C(ve, "PARTS", {
  body: { template: wl }
});
let Gi = ve;
function Ua(a) {
  return Array.isArray(a) ? a.filter((e) => (e == null ? void 0 : e.label) && Number.isFinite(Number(e == null ? void 0 : e.value))).map((e, t) => {
    const s = Math.trunc(Number(e.value));
    return {
      index: t,
      label: String(e.label).trim(),
      value: s,
      signedValue: s >= 0 ? `+${s}` : String(s),
      attributeFilter: String(e.attributeFilter ?? "").trim() || null,
      intentFilter: String(e.intentFilter ?? "").trim() || null
    };
  }) : [];
}
function ja(a) {
  return Array.isArray(a) ? a.map((e) => {
    var r, n;
    const t = Or(e), s = ((r = da.find((o) => o.value === (t.attributeFilter ?? ""))) == null ? void 0 : r.label) ?? null, i = ((n = ma.find((o) => o.value === (t.intentFilter ?? ""))) == null ? void 0 : n.label) ?? null;
    return {
      ...t,
      attributeFilterLabel: t.attributeFilter ? s : null,
      intentFilterLabel: t.intentFilter ? i : null,
      signedValue: t.value >= 0 ? `+${t.value}` : String(t.value),
      isPositive: t.value > 0
    };
  }) : [];
}
function Va(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
let Si = null;
function vl({ systemId: a = "mwd" } = {}) {
  return Si || (Si = new Gi({ systemId: a })), Si;
}
const Rl = "gmDnPresetEditor";
function Nl(a = []) {
  const e = [], t = [], s = /* @__PURE__ */ new Set();
  if ((Array.isArray(a) ? a : []).forEach((i, r) => {
    const n = String((i == null ? void 0 : i.label) ?? "").trim(), o = String((i == null ? void 0 : i.dn) ?? "").trim(), l = `Row ${r + 1}`;
    if (!n) {
      t.push(`${l}: label cannot be blank.`);
      return;
    }
    if (s.has(n.toLowerCase())) {
      t.push(`${l}: duplicate label "${n}".`);
      return;
    }
    s.add(n.toLowerCase());
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
  }), t.length) throw jt(t);
  return vs(e, { strict: !0 });
}
function Dl(a = []) {
  return vs(a, { strict: !1 }).map((e) => ({
    label: e.label,
    dn: String(e.dn)
  }));
}
function Il(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (s) {
    throw jt([
      `Bulk JSON must be valid JSON: ${s.message}`
    ]);
  }
  return vs(t, { strict: !0 });
}
function Ol(a = []) {
  return JSON.stringify(
    vs(a, { strict: !1 }),
    null,
    2
  );
}
const _l = {
  id: "gm-dn-presets",
  menuKey: Rl,
  settingKey: zr,
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
  defaultData: kl,
  createEmptyRow: () => ({
    label: "",
    dn: "1"
  }),
  toRows: Dl,
  rowsToValue: Nl,
  parseBulk: Il,
  serializeBulk: Ol
};
function $l() {
  pa(_l);
}
const Ll = "skillSpecializationEditor";
function qi() {
  return qs().map((a) => ({
    value: a.code,
    label: a.label
  }));
}
function xl(a = []) {
  const e = new Set(qi().map((i) => i.value)), t = {}, s = [];
  if ((Array.isArray(a) ? a : []).forEach((i, r) => {
    const n = String((i == null ? void 0 : i.skillCode) ?? "").trim(), o = String((i == null ? void 0 : i.label) ?? "").trim(), l = `Row ${r + 1}`;
    if (!n) {
      s.push(`${l}: choose a skill.`);
      return;
    }
    if (!e.has(n)) {
      s.push(`${l}: unknown skill code "${n}".`);
      return;
    }
    if (!o) {
      s.push(`${l}: specialization label cannot be blank.`);
      return;
    }
    (t[n] ?? (t[n] = [])).push(o);
  }), s.length) throw jt(s);
  return ii(t, { strict: !0 });
}
function Fl(a = {}) {
  const e = ii(a, { strict: !1 });
  return Object.entries(e).flatMap(
    ([t, s]) => s.map((i) => ({ skillCode: t, label: i }))
  );
}
function Bl(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return {};
  let t;
  try {
    t = JSON.parse(e);
  } catch (s) {
    throw jt([
      `Bulk JSON must be valid JSON: ${s.message}`
    ]);
  }
  return ii(t, { strict: !0 });
}
function zl(a = {}) {
  return JSON.stringify(
    ii(a, { strict: !1 }),
    null,
    2
  );
}
const Hl = {
  id: "skill-specializations",
  menuKey: Ll,
  settingKey: $i,
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
      options: qi
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
  defaultData: Mr,
  createEmptyRow: () => {
    var a;
    return {
      skillCode: ((a = qi()[0]) == null ? void 0 : a.value) ?? "",
      label: ""
    };
  },
  toRows: Fl,
  rowsToValue: xl,
  parseBulk: Bl,
  serializeBulk: zl
};
function Wl() {
  pa(Hl);
}
class Ul {
  static register() {
    $l(), Wl(), fl(), game.settings.register(T, "useDestinyMechanics", {
      name: S.settings.useDestinyMechanics.name,
      hint: S.settings.useDestinyMechanics.hint,
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
const { HandlebarsApplicationMixin: jl } = foundry.applications.api;
var Ve, Ps, Es, Ki;
const Ie = class Ie extends jl(foundry.applications.sheets.ActorSheetV2) {
  constructor() {
    super(...arguments);
    Se(this, Es);
    Se(this, Ve, !1);
    /** Track active CSB tab per group across rerenders */
    Se(this, Ps, /* @__PURE__ */ new Map());
  }
  /** @override */
  _updatePosition(t) {
    const s = super._updatePosition(t), {
      MIN_WIDTH: i,
      MAX_WIDTH: r,
      MIN_HEIGHT: n,
      MAX_HEIGHT: o
    } = this.constructor;
    return typeof s.width == "number" && (s.width = Math.min(
      r,
      Math.max(i, s.width)
    )), typeof s.height == "number" && (s.height = Math.min(
      o,
      Math.max(n, s.height)
    )), s;
  }
  // Optional legacy shim if anything still reads defaultOptions
  static get defaultOptions() {
    return this.DEFAULT_OPTIONS;
  }
  /** Editing mode flag for templates */
  get editing() {
    return H(this, Ve);
  }
  toggleEditing() {
    if (this.isEditable) {
      if (H(this, Ve)) {
        this._commitEditsToActor().finally(() => {
          Ee(this, Ve, !H(this, Ve)), this.render({ force: !0 });
        });
        return;
      }
      Ee(this, Ve, !H(this, Ve)), this.render({ force: !0 });
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
    const t = this.actor ?? this.document ?? null, s = (t == null ? void 0 : t.token) ?? null, i = (r = this.document) != null && r.isToken ? ((n = this.document) == null ? void 0 : n.token) ?? s ?? null : s;
    return i ? (i == null ? void 0 : i.document) ?? i : null;
  }
  /**
   * Resolve the document that should persist actor-backed state.
   * Linked token sheets should write to the base actor document so state survives scene changes.
   */
  getPersistentActor() {
    var i, r, n;
    const t = this.actor ?? this.document ?? null;
    if (!t) return null;
    const s = this.getSheetTokenDocument();
    return s != null && s.isLinked ? s.baseActor ?? ((n = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : n.call(i, ((r = s == null ? void 0 : s.baseActor) == null ? void 0 : r.id) ?? "")) ?? s.actor ?? t : t;
  }
  /** @override */
  _initializeApplicationOptions(t) {
    var o, l, c, u, d;
    t = super._initializeApplicationOptions(t), t.classes = Array.from(t.classes ?? []);
    const s = (t == null ? void 0 : t.document) ?? this.document, i = (s == null ? void 0 : s.type) ?? ((o = this.actor) == null ? void 0 : o.type);
    i && t.classes.push(String(i));
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
    const t = ((n = this.actor) == null ? void 0 : n.type) ?? "actor", i = {
      character: "Character",
      npc: "NPC",
      battlemech: "BattleMech",
      vehicle: "Vehicle",
      device: "Device"
    }[t] ?? String(t).replace(/(^|[-_])([a-z])/g, (l, c, u) => (c ? " " : "") + u.toUpperCase());
    return `${((o = this.actor) == null ? void 0 : o.name) ?? "Actor"} — ${i}`;
  }
  /**
   * Window actions (header/menu). Centralize here and dedupe by action key.
   * @override
   */
  _getHeaderControls() {
    var n, o;
    let t = ((n = super._getHeaderControls) == null ? void 0 : n.call(this)) ?? [];
    const s = ((o = this.document) == null ? void 0 : o.isToken) ?? !1, i = /* @__PURE__ */ new Set();
    s ? (i.add("prototypeToken"), i.add("configurePrototypeToken")) : (i.add("token"), i.add("configureToken")), t = t.filter((l) => {
      const c = (l == null ? void 0 : l.action) ?? "", u = String((l == null ? void 0 : l.label) ?? "");
      return !(i.has(c) || s && u.includes("Prototype") || !s && u === "Token");
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
    var s;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), this.toggleEditing();
  }
  /**
   * AppV2 action handler: CSB tab click.
   * Defensive: derive the tab link from target or event.
   */
  _onClickTab(t, s) {
    var l, c, u;
    const i = ((l = s == null ? void 0 : s.closest) == null ? void 0 : l.call(s, ".csb-tab-link[data-tab]")) ?? ((u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, ".csb-tab-link[data-tab]"));
    if (!i) return;
    const r = i.dataset.tab, n = i.closest(".csb-tabs");
    if (!n || !r) return;
    const o = n.dataset.group || "default";
    H(this, Ps).set(o, r), E(this, Es, Ki).call(this, n, r);
  }
  /**
   * Universal roll action: data-action="roll" + data-roll='{"intent":"skill","key":"gunnery"}'
   */
  async _onRollAction(t, s) {
    var c, u, d, m, h, g, b, p, f;
    (c = t == null ? void 0 : t.preventDefault) == null || c.call(t);
    const i = ((u = s == null ? void 0 : s.closest) == null ? void 0 : u.call(s, "[data-roll]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-roll]")), r = (h = i == null ? void 0 : i.dataset) == null ? void 0 : h.roll;
    if (!r) return;
    let n;
    try {
      n = JSON.parse(r);
    } catch (w) {
      console.warn("MWD | Invalid data-roll JSON:", r, w);
      return;
    }
    const o = !!(t != null && t.shiftKey), l = ((g = game.mwd) == null ? void 0 : g.roll) ?? ((p = (b = game.system) == null ? void 0 : b.mwd) == null ? void 0 : p.roll);
    if (!(l != null && l.execute)) {
      (f = ui.notifications) == null || f.error("MWD roll system not initialized (game.mwd.roll.execute missing).");
      return;
    }
    return l.execute({ actor: this.actor, payload: n, event: t, quick: o });
  }
  async _onEditImage(t, s) {
    var n, o, l;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable || !this.editing) return;
    const i = foundry.applications.apps.FilePicker.implementation;
    new i({
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
  _onRender(t, s) {
    var r, n, o;
    (r = super._onRender) == null || r.call(this, t, s);
    const i = this._getRootElement();
    if (i) {
      for (const l of i.querySelectorAll(".csb-tabs")) {
        const c = l.dataset.group || "default", u = H(this, Ps).get(c), d = l.dataset.default || ((n = l.querySelector(".csb-tab-link[data-tab]")) == null ? void 0 : n.dataset.tab), m = u || d;
        m && E(this, Es, Ki).call(this, l, m);
      }
      i.querySelectorAll(".csb-tabs").length && !i.querySelector(".csb-tab-panel.is-active") && console.warn(`${te} CSB tabs present but no active tab applied. Check element root resolution and CSS .is-active selectors.`, {
        sheet: (o = this.constructor) == null ? void 0 : o.name
      });
    }
  }
  async _commitEditsToActor() {
    const t = this.element;
    if (!t) return;
    const s = t.querySelectorAll('input[name][data-edit-field="staged"], select[name][data-edit-field="staged"], textarea[name][data-edit-field="staged"]');
    if (!s.length) return;
    const i = {};
    for (const r of s) {
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
      typeof o == "number" && Number.isNaN(o) && (o = 0), o = this._clampByPath(n, o), foundry.utils.getProperty(this.actor, n) !== o && (i[n] = o);
    }
    if (Object.keys(i).length)
      try {
        await (this.getPersistentActor() ?? this.actor).update(i);
      } catch (r) {
        console.warn("MWD | Commit failed (permissions or validation):", r);
      }
  }
  /** @override */
  async _prepareContext(t) {
    var n, o, l, c, u, d, m, h, g, b, p;
    console.log(`${te}BaseActorSheetV2._prepareContext:start`, {
      actorName: (n = this.actor) == null ? void 0 : n.name,
      actorType: (o = this.actor) == null ? void 0 : o.type
    });
    const s = await super._prepareContext(t), i = foundry.utils.deepClone((s == null ? void 0 : s.options) ?? {});
    i.classes = Array.from(((l = this.options) == null ? void 0 : l.classes) ?? []), i.cssClass = i.classes.join(" ");
    const r = foundry.utils.mergeObject(
      s,
      {
        actor: this.actor,
        system: (c = this.actor) == null ? void 0 : c.system,
        editable: this.isEditable,
        owner: ((u = this.document) == null ? void 0 : u.isOwner) ?? !1,
        limited: !(((d = this.document) == null ? void 0 : d.isOwner) ?? !1),
        editing: H(this, Ve),
        // Template contract
        data: this.actor,
        // legacy alias
        options: i,
        // safe, template-only
        cssClass: i.cssClass
      },
      { inplace: !1 }
    );
    return r.options.owner = r.owner, r.options.limited = r.limited, r.options.editable = r.editable, r.options.editing = r.editing, r.options.viewMode = !r.editing, r.skillsDisplay = ro(((m = this.actor) == null ? void 0 : m.system) ?? {}), r.items ?? (r.items = {}), (h = this.actor) != null && h.items && typeof (V == null ? void 0 : V.classifyInto) == "function" && (V.classifyInto(r.items, this.actor.items), r.items.weapon = [
      ...r.items.mechWeapon ?? [],
      ...r.items.personalWeapon ?? []
    ]), r.npcItems = {
      traits: r.items.quality ?? [],
      weapons: r.items.weapon ?? [],
      assetModules: r.items.assetModule ?? [],
      inventory: r.items.gear ?? []
    }, console.log(`${te}BaseActorSheetV2._prepareContext:done`, {
      actorType: (g = this.actor) == null ? void 0 : g.type,
      cssClass: r.cssClass,
      itemCount: ((p = (b = this.actor) == null ? void 0 : b.items) == null ? void 0 : p.size) ?? 0,
      editing: H(this, Ve)
    }), r;
  }
  /** Clamp certain actor system paths to valid ranges */
  _clampByPath(t, s) {
    return typeof s != "number" ? s : ((/^system\.skills\.[^.]+\.rating$/.test(t) || /^system\.attributes\.[^.]+\.value$/.test(t)) && (s = Math.trunc(s)), /^system\.skills\.[^.]+\.rating$/.test(t) ? Math.clamp(s, 0, 12) : /^system\.attributes\.[^.]+\.value$/.test(t) ? Math.clamp(s, 0, 10) : s);
  }
  /** Action handler: Condition Monitor set */
  async _onMonitorSet(t, s) {
    var h, g;
    if (t.preventDefault(), !this.isEditable) return;
    const i = String(((h = s == null ? void 0 : s.dataset) == null ? void 0 : h.monitor) ?? "").trim(), r = Number((g = s == null ? void 0 : s.dataset) == null ? void 0 : g.value);
    if (!i || !Number.isFinite(r)) return;
    const n = i === "burn" ? "system.burn.value" : `system.monitors.${i}.value`, o = Number(foundry.utils.getProperty(this.actor, n) ?? 0), l = i === "armor" ? r : o === r ? 0 : r, c = this.getPersistentActor() ?? this.actor;
    if (typeof (c == null ? void 0 : c.setMonitorValue) == "function")
      return c.setMonitorValue(i, l, { source: "sheet" });
    const u = `system.monitors.${i}`, d = Number(foundry.utils.getProperty(c, `${u}.max`)) || 0, m = Math.min(Math.max(0, l), Math.max(0, d));
    return c.update({ [`${u}.value`]: m });
  }
  /**
  * Compute -1 penalty per 3 full damage (3,6,9...)
  * Returns 0, -1, -2, ...
  */
  static _mwdPenaltyFromDamage(t) {
    const s = Math.max(0, Number(t) || 0);
    return -Math.floor(s / 3);
  }
  /**
   * Compute resistance = ceil(value / 4), with 0 -> 0
   * 1-4 => 1, 5-8 => 2, ...
   */
  static _mwdResistanceFromValue(t) {
    const s = Math.max(0, Number(t) || 0);
    return s === 0 ? 0 : Math.ceil(s / 4);
  }
};
Ve = new WeakMap(), Ps = new WeakMap(), Es = new WeakSet(), /**
 * Apply active-state classes within a single .csb-tabs root.
 * Idempotent: safe to call every render.
 */
Ki = function(t, s) {
  t.querySelectorAll(".csb-tab-link").forEach((i) => {
    i.classList.toggle("is-active", i.dataset.tab === s);
  }), t.querySelectorAll(".csb-tab-panel").forEach((i) => {
    i.classList.toggle("is-active", i.dataset.tab === s);
  });
}, // ---- Hard minimum size (resize clamp) ----
C(Ie, "MIN_WIDTH", 800), C(Ie, "MAX_WIDTH", 950), C(Ie, "MIN_HEIGHT", 600), C(Ie, "MAX_HEIGHT", 1400), // group -> tabId
/** @override */
C(Ie, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Gt(Ie, Ie, "DEFAULT_OPTIONS"), {
  classes: ["sheet", "actor", T, "appv2", "mwd-sheet", "mwd-character-sheet"],
  position: { width: 760, height: 760 },
  window: { resizable: !0, minimizable: !0 },
  actions: {
    toggleViewMode: Ie.prototype._onToggleViewMode,
    tab: Ie.prototype._onClickTab,
    roll: Ie.prototype._onRollAction,
    monitorSet: Ie.prototype._onMonitorSet,
    editImage: Ie.prototype._onEditImage
  }
}, { inplace: !1 }));
let rs = Ie;
var Zt, Dt, Hr, Wr, Ur;
const ws = class ws {
  static async get(e) {
    if (H(this, Zt).has(e)) return H(this, Zt).get(e);
    const t = E(this, Dt, Hr).call(this, e);
    return H(this, Zt).set(e, t), t;
  }
};
Zt = new WeakMap(), Dt = new WeakSet(), Hr = async function(e) {
  const t = `systems/${T}/templates/v2/layouts/${e}.layout.json`;
  let s;
  try {
    const i = await fetch(t);
    if (!i.ok) throw new Error(`HTTP ${i.status} for ${t}`);
    s = await i.json();
  } catch (i) {
    console.error(`${te}LayoutRegistry.get FAILED`, { layoutId: e, url: t, e: i }), s = { id: e, version: 0, root: { type: "stack", children: [] } };
  }
  return E(this, Dt, Wr).call(this, s);
}, Wr = function(e) {
  const t = (s) => {
    var i;
    return !s || typeof s != "object" || (s.template ?? (s.template = E(i = ws, Dt, Ur).call(i, s)), s.children = Array.isArray(s.children) ? s.children : [], Array.isArray(s.classes) || (typeof s.classes == "string" ? s.classes = s.classes.split(/\s+/).filter(Boolean) : s.classes = []), s.children = s.children.map(t), s.type === "tabs" && Array.isArray(s.tabs) && (s.tabs = s.tabs.map((r) => ({
      ...r,
      children: (Array.isArray(r.children) ? r.children : []).map(t)
    })))), s;
  };
  return {
    ...e,
    root: t(e.root ?? { type: "stack", children: [] })
  };
}, Ur = function(e) {
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
    default:
      return "mwd.v2.ui.nodes.unknown";
  }
}, Se(ws, Dt), Se(ws, Zt, /* @__PURE__ */ new Map());
let Js = ws;
function De(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Vl(a) {
  return String(a ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function wi(a, e = 180) {
  const t = Vl(a);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function $t(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function Ai(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim(),
    emphasis: e.emphasis ?? ""
  }));
}
function Ti(a = []) {
  return $t(a).map((e) => ({ label: e }));
}
function ki(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
function Gl(a = {}, e = ["close", "near", "far", "extreme"]) {
  return e.map((t) => {
    const s = De(a == null ? void 0 : a[t], 0);
    return `${t.charAt(0).toUpperCase() + t.slice(1)} ${s}`;
  }).join(" | ");
}
function ql(a = "") {
  const e = String(a ?? "").trim().toLowerCase();
  return e ? e.charAt(0).toUpperCase() + e.slice(1) : "";
}
var Ue, Ct, Ft, rt, L, jr, Ji, Us, Vr, Gr, we, Lt, ys, js;
const oe = class oe extends rs {
  constructor() {
    super(...arguments);
    Se(this, L);
    Se(this, Ue, null);
    Se(this, Ct, null);
    Se(this, Ft, null);
    Se(this, rt, /* @__PURE__ */ new Set());
  }
  /** @override */
  async _prepareContext(t) {
    var G, Y, D, Z, ue, ne, me, He, We, ct, ut, dt, mt, pt, ht, ft, gt, yt, bt, St, wt, At, Tt, kt;
    const s = await super._prepareContext(t), i = ((G = this.getSheetTokenDocument) == null ? void 0 : G.call(this)) ?? null;
    s._mwdThemeClass = game.system.mwd.styles.selectCssClass(), s.layout = await Js.get("character");
    const r = ((D = (Y = this.actor).getEdgeCap) == null ? void 0 : D.call(Y)) ?? Number(((ne = (ue = (Z = this.actor.system) == null ? void 0 : Z.attributes) == null ? void 0 : ue.edge) == null ? void 0 : ne.value) ?? 0), n = !!this.isEditable, o = { physical: "Physical", mental: "Mental", social: "Social" }, l = {
      grit: "Grit",
      insight: "Insight",
      legend: "Legend",
      chaos: "Chaos",
      rumor: "Rumor",
      credibility: "Credibility"
    }, c = this.actor.getEdgePoolSummary ? this.actor.getEdgePoolSummary({ groups: sa }) : { groups: [] };
    s.edgeConsole = {
      cap: r,
      editable: n,
      capPips: Array.from({ length: Math.max(0, r) }, (A, v) => v + 1),
      groups: (c.groups ?? []).map((A) => ({
        id: A.id,
        label: o[A.id] ?? A.id,
        pools: (A.pools ?? []).map((v) => {
          const j = Number(v.effectiveValue ?? 0), ie = Number(v.effectiveMax ?? 0), pe = Array.from({ length: Math.max(0, ie) }, (ke, O) => {
            const X = O + 1;
            return { n: X, filled: X <= j };
          }), Te = String(v.key ?? "").split(".").pop();
          return {
            key: v.key,
            label: l[Te] ?? Te ?? v.key,
            value: j,
            max: ie,
            rating: Number(v.rating ?? 0),
            isCapped: Number(v.rating ?? 0) > Number(v.cap ?? r),
            pips: pe,
            // Paths for edit-mode inputs
            pathRating: `system.counters.edgePools.${v.key}.rating`,
            pathValue: `system.counters.edgePools.${v.key}.value`,
            // Keep the roll payload if you want pool-name click to route through BaseActorSheetV2 roll handler
            roll: JSON.stringify({ intent: "edge", pool: v.key })
          };
        })
      }))
    };
    const u = ["grit", "insight", "legend", "chaos", "rumor", "credibility"], d = /* @__PURE__ */ new Map();
    for (const A of s.edgeConsole.groups ?? [])
      for (const v of A.pools ?? []) {
        const j = String(v.key ?? "").split(".").pop();
        j && d.set(j, v), v.domain = A.id;
      }
    s.edgeConsole.poolsOrdered = u.map((A) => d.get(A)).filter(Boolean);
    const m = this.actor.system ?? {}, h = m.monitors ?? {}, g = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue", label: "Fatigue", kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor", label: "Armor", kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ], b = (A, v, j = 0) => {
      const ie = foundry.utils.getProperty(A, v), pe = Number(ie);
      return Number.isFinite(pe) ? pe : j;
    };
    s.conditionMonitors = g.map((A) => {
      const v = (h == null ? void 0 : h[A.id]) ?? {}, j = Math.max(0, b(v, "max", 0)), ie = Math.min(Math.max(0, b(v, "value", 0)), j);
      return {
        id: A.id,
        label: A.label,
        kind: A.kind,
        editable: !!this.isEditable,
        value: ie,
        max: j,
        segments: Array.from({ length: j }, (pe, Te) => {
          const ke = Te + 1;
          return { value: ke, filled: ke <= ie };
        }),
        status: A.status ? { label: A.status.label, value: b(v, A.status.path, 0) } : null
      };
    });
    const p = Number(((He = (me = this.actor.system) == null ? void 0 : me.burn) == null ? void 0 : He.value) ?? 0), f = 10, w = 6, M = Math.min(p, f);
    s.burnOverflow = Math.max(0, p - f), s.burnPenalty = Math.floor(p / 2), s.burnPips = Array.from({ length: f }, (A, v) => {
      const j = v + 1;
      return {
        pipValue: j,
        filled: j <= M,
        threshold: j === w
      };
    }), s.combat = {
      roll: {
        initiative: JSON.stringify({ intent: "initiative" }),
        overload: JSON.stringify({ intent: "overload" })
      }
    }, s.burn = {
      value: p,
      penalty: Math.floor(p / 2),
      overflow: Math.max(0, p - 10),
      canOverloadCheck: p >= 6,
      overloaded: !!((ct = (We = this.actor.system) == null ? void 0 : We.burn) != null && ct.overloaded)
    };
    const k = le.getSnapshot(this.actor, { token: i });
    s.combatDashboard = {
      targeting: k.targeting,
      rollImpact: k.rollImpact,
      states: k.states,
      effects: k.effects,
      activation: k.activation,
      inactiveReason: k.inactiveReason
    };
    const R = le.buildActionModel(this.actor, k), F = new Set((R.menus ?? []).map((A) => A.id));
    H(this, Ue) && !F.has(H(this, Ue)) && Ee(this, Ue, null), s.combatActions = {
      ...R,
      menus: (R.menus ?? []).map((A) => ({
        ...A,
        isOpen: A.id === H(this, Ue)
      }))
    };
    const I = ((dt = (ut = this.actor).getPersonalCombatLoadout) == null ? void 0 : dt.call(ut)) ?? null;
    s.personalInventory = {
      warnings: [...(I == null ? void 0 : I.warnings) ?? []],
      weapons: ((I == null ? void 0 : I.weapons) ?? []).map((A) => {
        var O, X, Le, Pe, xe, z, ae;
        const v = E(this, L, js).call(this, "weapons", A.id), j = String((A == null ? void 0 : A.category) ?? "").trim().toLowerCase() !== "melee", ie = !!((O = A == null ? void 0 : A.sourceState) != null && O.isTracked), pe = j && (A != null && A.payloadLabel) ? `Loaded ${A.payloadLabel}` : "", Te = j && ie ? `${De((X = A == null ? void 0 : A.sourceState) == null ? void 0 : X.current, 0)}/${De((Le = A == null ? void 0 : A.sourceState) == null ? void 0 : Le.max, 0)}` : "", ke = ki([
          { label: "Skill", value: ((Pe = A.skillDef) == null ? void 0 : Pe.label) ?? A.skill ?? "" },
          { label: "Category", value: A.category ?? "" },
          { label: "Max Range", value: ql(((xe = A.range) == null ? void 0 : xe.max) ?? A.defaultRangeBand ?? "") },
          { label: "Attack Rating", value: Gl(A.attackRatingBand) },
          { label: "Payload", value: j ? ie ? `${Te} tracked` : A.payloadLabel || "Unloaded" : "" },
          { label: "Traits", value: $t(A.traits ?? []).join(", ") }
        ]);
        return {
          id: A.id,
          accordionId: v,
          isExpanded: H(this, rt).has(v),
          name: A.name,
          img: A.img,
          subtitle: ((z = A.skillDef) == null ? void 0 : z.label) ?? A.category ?? "",
          summaryStats: Ai([
            { label: "DV", value: De(A.damage, 0), emphasis: "strong" },
            { label: "AP", value: De(A.ap, 0) },
            { label: "Type", value: A.damageTypeLabel ?? A.damageType ?? "" },
            { label: "Payload", value: j ? ie ? Te : A.payloadLabel || "Unloaded" : "" }
          ]),
          detailTags: Ti([
            A.equipped ? "Equipped" : "",
            A.isPrimary ? "Primary" : "",
            pe,
            ...$t(A.traits ?? [])
          ]),
          detailRows: ke,
          detailText: wi(A.notes),
          equipped: !!A.equipped,
          isPrimary: !!A.isPrimary,
          attackRoll: JSON.stringify({
            intent: "attack",
            weaponId: A.id,
            payloadId: ((ae = A == null ? void 0 : A.payloadState) == null ? void 0 : ae.activePayloadId) ?? "",
            edge: { pool: "physical.grit", allowed: ["pre", "post"] },
            tags: ["combat", "attack"]
          })
        };
      }),
      armor: ((I == null ? void 0 : I.armor) ?? []).map((A) => {
        var ke, O, X, Le, Pe, xe, z, ae, Mt, Pt, It, ls, Rs, ya;
        const v = ((ke = I == null ? void 0 : I.activeArmor) == null ? void 0 : ke.id) === A.id ? I.activeArmor : null, j = E(this, L, js).call(this, "armor", A.id), ie = De(((X = (O = v == null ? void 0 : v.traitState) == null ? void 0 : O.reinforced) == null ? void 0 : X.max) ?? ((Pe = (Le = A == null ? void 0 : A.traitState) == null ? void 0 : Le.reinforced) == null ? void 0 : Pe.max), 0), pe = ie > 0 ? `${De(((z = (xe = v == null ? void 0 : v.traitState) == null ? void 0 : xe.reinforced) == null ? void 0 : z.current) ?? ((Mt = (ae = A == null ? void 0 : A.traitState) == null ? void 0 : ae.reinforced) == null ? void 0 : Mt.current), 0)}/${ie}` : "", Te = [
          Object.entries((v == null ? void 0 : v.mitigationByType) ?? (v == null ? void 0 : v.typedMitigation) ?? A.mitigationByType ?? {}).filter(([, ni]) => Number(ni) > 0).map(([ni, nn]) => `${ni} +${nn}`).join(", "),
          pe ? `Reinforced ${pe}` : ""
        ].filter(Boolean).join(" | ");
        return {
          id: A.id,
          accordionId: j,
          isExpanded: H(this, rt).has(j),
          name: A.name,
          img: A.img,
          subtitle: (Pt = A.tags) != null && Pt.length ? A.tags.join(", ") : "Armor",
          summaryStats: Ai([
            { label: "Rating", value: De((v == null ? void 0 : v.ratingCurrent) ?? A.rating, 0), emphasis: "strong" },
            { label: "Res", value: De((v == null ? void 0 : v.baseMitigation) ?? (v == null ? void 0 : v.baseResistance), 0) },
            { label: "Def", value: De(A.defenseBonus, 0) },
            { label: "Dur", value: `${De(((It = v == null ? void 0 : v.durability) == null ? void 0 : It.current) ?? ((ls = A.durability) == null ? void 0 : ls.current), 0)}/${De(((Rs = v == null ? void 0 : v.durability) == null ? void 0 : Rs.max) ?? ((ya = A.durability) == null ? void 0 : ya.max), 0)}` }
          ]),
          detailTags: Ti([
            A.equipped ? "Equipped" : "",
            A.isPrimary ? "Primary" : "",
            pe ? `Reinforced ${pe}` : "",
            ...$t(A.traits ?? [])
          ]),
          detailRows: ki([
            { label: "Mitigation", value: Te },
            { label: "Defense Bonus", value: De(A.defenseBonus, 0) },
            { label: "Traits", value: $t(A.traits ?? []).join(", ") },
            { label: "Tags", value: $t(A.tags ?? []).join(", ") }
          ]),
          detailText: wi(A.notes),
          equipped: !!A.equipped,
          isPrimary: !!A.isPrimary
        };
      }),
      gear: (((mt = s.items) == null ? void 0 : mt.gear) ?? []).map((A) => {
        var pe, Te, ke, O, X, Le, Pe, xe, z, ae;
        const v = E(this, L, js).call(this, "gear", A.id), j = De(((pe = A.system) == null ? void 0 : pe.quantity) ?? 1, 1) || 1, ie = $t(((Te = A.system) == null ? void 0 : Te.tags) ?? ((ke = A.system) == null ? void 0 : ke.traits) ?? []);
        return {
          id: A.id,
          accordionId: v,
          isExpanded: H(this, rt).has(v),
          name: A.name,
          img: A.img,
          subtitle: ((O = A.system) == null ? void 0 : O.category) ?? A.type ?? "Gear",
          summaryStats: Ai([
            { label: "Qty", value: j, emphasis: "strong" },
            { label: "State", value: (X = A.system) != null && X.equipped ? "Readied" : "" }
          ]),
          detailTags: Ti([
            (Le = A.system) != null && Le.equipped ? "Readied" : "",
            ...ie
          ]),
          detailRows: ki([
            { label: "Quantity", value: j },
            { label: "Source", value: ((Pe = A.system) == null ? void 0 : Pe.sourceReference) ?? "" },
            { label: "Tags", value: ie.join(", ") }
          ]),
          detailText: wi(((xe = A.system) == null ? void 0 : xe.notes) ?? ((z = A.system) == null ? void 0 : z.description)),
          equipped: !!((ae = A.system) != null && ae.equipped)
        };
      })
    }, s.bio = {
      faction: ((pt = m.biography) == null ? void 0 : pt.faction) ?? "",
      age: ((ht = m.biography) == null ? void 0 : ht.age) ?? "",
      rank: ((ft = m.biography) == null ? void 0 : ft.rank) ?? "",
      height: ((gt = m.biography) == null ? void 0 : gt.height) ?? "",
      weight: ((yt = m.biography) == null ? void 0 : yt.weight) ?? "",
      xpTotal: ((St = (bt = m.counters) == null ? void 0 : bt.xp) == null ? void 0 : St.total) ?? 0,
      xpSpent: ((At = (wt = m.counters) == null ? void 0 : wt.xp) == null ? void 0 : At.value) ?? 0,
      experienceLevel: ((Tt = m.biography) == null ? void 0 : Tt.experienceLevel) ?? "green",
      enrichedHistory: await foundry.applications.ux.TextEditor.implementation.enrichHTML(
        ((kt = m.biography) == null ? void 0 : kt.history) ?? "",
        { async: !0, secrets: this.actor.isOwner, relativeTo: this.actor }
      )
    };
    const W = [
      { moduleType: "faction", label: "Faction" },
      { moduleType: "childhood", label: "Childhood" },
      { moduleType: "higherEducation", label: "Higher Education" },
      { moduleType: "realLife", label: "Real Life" }
    ], U = (this.actor.items ?? []).filter((A) => A.type === "lifeModule");
    return s.lifeModules = W.map((A) => {
      const v = U.find((j) => {
        var ie;
        return ((ie = j.system) == null ? void 0 : ie.moduleType) === A.moduleType;
      }) ?? null;
      return {
        moduleType: A.moduleType,
        label: A.label,
        item: v ? { id: v.id, name: v.name, img: v.img } : null
      };
    }), s;
  }
  _onRender(t, s) {
    super._onRender(t, s), E(this, L, jr).call(this), E(this, L, Gr).call(this);
  }
  async close(t = {}) {
    return E(this, L, Ji).call(this), super.close(t);
  }
  requestCombatDashboardRefresh() {
    E(this, L, we).call(this, { force: !0 });
  }
  async _onEdgeSet(t, s) {
    var c, u, d;
    if (t.preventDefault(), t.stopPropagation(), !this.isEditable) return;
    const i = ((c = s == null ? void 0 : s.closest) == null ? void 0 : c.call(s, "[data-edge-pool][data-edge-value]")) ?? ((d = (u = t == null ? void 0 : t.target) == null ? void 0 : u.closest) == null ? void 0 : d.call(u, "[data-edge-pool][data-edge-value]"));
    if (!i) return;
    const r = String(i.dataset.edgePool ?? "").trim(), n = Number(i.dataset.edgeValue ?? NaN);
    if (!r || !Number.isFinite(n)) return;
    const o = this.actor.getEdgePool(r);
    if (!(o != null && o.hasPools)) return;
    let l = n;
    return n === o.effectiveValue && (l = n - 1), (t.button === 2 || t.type === "contextmenu") && (l = 0), t.altKey && (l = 0), t.shiftKey && (l = o.effectiveMax), this.actor.setEdgePoolValue(r, l);
  }
  async _onToggleCombatMenu(t, s) {
    var r, n, o, l, c, u, d;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const i = String(
      ((o = s == null ? void 0 : s.dataset) == null ? void 0 : o.combatMenu) ?? ((d = (u = (c = (l = t == null ? void 0 : t.target) == null ? void 0 : l.closest) == null ? void 0 : c.call(l, "[data-combat-menu]")) == null ? void 0 : u.dataset) == null ? void 0 : d.combatMenu) ?? ""
    ).trim();
    i && (Ee(this, Ue, H(this, Ue) === i ? null : i), E(this, L, we).call(this, !1));
  }
  async _onToggleStatuses(t) {
    var r, n, o, l, c, u, d, m;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t), !this.isEditable) return;
    const s = this.getPersistentActor() ?? this.actor, i = ((o = this.getSheetTokenDocument) == null ? void 0 : o.call(this)) ?? ((c = le.getSnapshot(s, { token: ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? null })) == null ? void 0 : c.tokenDocument) ?? ((d = le.getSnapshot(this.actor, { token: ((u = this.getSheetTokenDocument) == null ? void 0 : u.call(this)) ?? null })) == null ? void 0 : d.tokenDocument) ?? null;
    if (!i) {
      (m = ui.notifications) == null || m.warn("Statuses require a token for this actor on the current scene.");
      return;
    }
    return vo({
      actor: s,
      token: i
    });
  }
  async _onCombatSpend(t, s) {
    var c, u, d, m, h, g, b, p, f, w;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const i = String(((d = s == null ? void 0 : s.dataset) == null ? void 0 : d.resource) ?? "").trim(), r = Math.max(0, Number(((m = s == null ? void 0 : s.dataset) == null ? void 0 : m.cost) ?? 0)), n = String(((h = s == null ? void 0 : s.dataset) == null ? void 0 : h.combatAction) ?? "").trim(), o = String(((g = s == null ? void 0 : s.dataset) == null ? void 0 : g.combatLabel) ?? "").trim(), l = String(((b = s == null ? void 0 : s.dataset) == null ? void 0 : b.combatCostLabel) ?? "").trim();
    if (!(!i || !r || !n))
      try {
        const M = this.getPersistentActor() ?? this.actor, k = await le.spendResource(M, {
          token: ((p = this.getSheetTokenDocument) == null ? void 0 : p.call(this)) ?? le.getCurrentSceneTokenDocument(M) ?? le.getCurrentSceneTokenDocument(this.actor),
          resource: i,
          cost: r,
          actionId: n,
          actionLabel: o,
          actionCostLabel: l
        });
        if (!(k != null && k.ok)) {
          (f = ui.notifications) == null || f.warn((k == null ? void 0 : k.reason) ?? "Unable to spend action.");
          return;
        }
        E(this, L, Lt).call(this, { rerender: !1 }), E(this, L, we).call(this, { force: !0 });
      } catch (M) {
        console.error("MWD | Failed to spend combat action", M), (w = ui.notifications) == null || w.error("Unable to spend action.");
      }
  }
  async _onCombatReduceBurn(t) {
    var s, i, r, n, o;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (i = t == null ? void 0 : t.stopPropagation) == null || i.call(t), !!this.isEditable)
      try {
        const l = this.getPersistentActor() ?? this.actor, c = await le.reduceBurn(l, {
          token: ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? le.getCurrentSceneTokenDocument(l) ?? le.getCurrentSceneTokenDocument(this.actor)
        });
        if (!(c != null && c.ok)) {
          (n = ui.notifications) == null || n.warn((c == null ? void 0 : c.reason) ?? "Unable to reduce Burn.");
          return;
        }
        E(this, L, Lt).call(this, { rerender: !1 }), E(this, L, we).call(this, { force: !0 });
      } catch (l) {
        console.error("MWD | Failed to reduce Burn", l), (o = ui.notifications) == null || o.error("Unable to reduce Burn.");
      }
  }
  async _onCombatOverloadCheck(t, s) {
    var n, o, l, c, u, d, m, h, g, b, p;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const i = ((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.roll) ?? ((m = (d = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : d.dataset) == null ? void 0 : m.roll);
    if (!i) return;
    let r;
    try {
      r = JSON.parse(i);
    } catch (f) {
      console.warn("MWD | Invalid overload payload", i, f);
      return;
    }
    try {
      const f = this.getPersistentActor() ?? this.actor, w = await ((b = (g = (h = game.mwd) == null ? void 0 : h.roll) == null ? void 0 : g.execute) == null ? void 0 : b.call(g, { actor: f, payload: r, event: t }));
      if (E(this, L, Lt).call(this, { rerender: !1 }), !w) {
        E(this, L, we).call(this, !1);
        return;
      }
      E(this, L, we).call(this, { force: !0 });
    } catch (f) {
      console.error("MWD | Failed to launch overload check", f), (p = ui.notifications) == null || p.error("Unable to launch overload check.");
    }
  }
  async _onCombatAttack(t) {
    var o, l, c, u, d, m, h, g, b, p, f, w;
    if ((o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const s = this.getPersistentActor() ?? this.actor, i = ((c = this.getSheetTokenDocument) == null ? void 0 : c.call(this)) ?? le.getCurrentSceneTokenDocument(s) ?? le.getCurrentSceneTokenDocument(this.actor), r = le.getSnapshot(s, { token: i });
    if (!r.hasCombatant) {
      (u = ui.notifications) == null || u.warn("No combatant on the current scene.");
      return;
    }
    if (!r.isCurrentTurn) {
      (d = ui.notifications) == null || d.warn("Only available during your activation.");
      return;
    }
    if (r.overloaded) {
      (m = ui.notifications) == null || m.warn("Overloaded actors can only recover Burn.");
      return;
    }
    if (r.state.saRemaining < 2) {
      (h = ui.notifications) == null || h.warn("Need 2 SA remaining to attack.");
      return;
    }
    const n = {
      intent: "attack",
      mode: "auto",
      fallback: "unarmed",
      edge: { pool: "physical.grit", allowed: ["pre", "post"] },
      tags: ["combat", "attack"]
    };
    try {
      const M = await ((p = (b = (g = game.mwd) == null ? void 0 : g.roll) == null ? void 0 : b.execute) == null ? void 0 : p.call(b, { actor: s, payload: n, event: t }));
      if (E(this, L, Lt).call(this, { rerender: !1 }), !M) {
        E(this, L, we).call(this, !1);
        return;
      }
      const k = await le.spendResource(s, {
        token: i,
        resource: "sa",
        cost: 2,
        actionId: "attack",
        actionLabel: "Attack",
        actionCostLabel: "2 SA"
      });
      k != null && k.ok || (f = ui.notifications) == null || f.warn((k == null ? void 0 : k.reason) ?? "Unable to spend attack action."), E(this, L, we).call(this, { force: !0 });
    } catch (M) {
      console.error("MWD | Failed to launch attack", M), (w = ui.notifications) == null || w.error((M == null ? void 0 : M.message) ?? "Unable to launch attack.");
    }
  }
  async _onAddSkillSpecialization(t, s) {
    var d, m, h, g;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable || !this.editing) return;
    const i = String(((h = s == null ? void 0 : s.dataset) == null ? void 0 : h.skillKey) ?? "").trim();
    if (!i) return;
    const r = this.getPersistentActor() ?? this.actor, n = xi(r.system ?? {}, i), o = ai(r.system ?? {}, i), l = Wt(i).filter((b) => !o.includes(b.key));
    if (l.length === 0) return;
    let c = ((g = l[0]) == null ? void 0 : g.key) ?? "";
    if (l.length > 1) {
      const b = `<form class="mwd-quick-select"><div class="mwd-field"><label>Specialization</label><select name="specialization">${l.map((p) => `<option value="${p.key}">${p.label}</option>`).join("")}</select></div></form>`;
      c = await Dialog.prompt({
        title: "Add Skill Specialization",
        content: b,
        label: "Add",
        callback: (p) => {
          var f;
          return p.find('select[name="specialization"]').val() ?? ((f = l[0]) == null ? void 0 : f.key) ?? "";
        }
      });
    }
    const u = Ks(
      n.concat([c])
    );
    await r.update({
      [`system.skills.${i}.specializations`]: u
    }), E(this, L, we).call(this, { force: !0 });
  }
  async _onRemoveSkillSpecialization(t, s) {
    var l, c, u, d;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable || !this.editing) return;
    const i = String(((u = s == null ? void 0 : s.dataset) == null ? void 0 : u.skillKey) ?? "").trim(), r = String(((d = s == null ? void 0 : s.dataset) == null ? void 0 : d.specializationKey) ?? "").trim();
    if (!i || !r) return;
    const n = this.getPersistentActor() ?? this.actor, o = Ks(
      xi(n.system ?? {}, i).filter((m) => m !== r)
    );
    await n.update({
      [`system.skills.${i}.specializations`]: o
    }), E(this, L, we).call(this, { force: !0 });
  }
  async _onCreateLifeModuleItem(t, s) {
    var o, l, c;
    if ((o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const i = String(((c = s == null ? void 0 : s.dataset) == null ? void 0 : c.moduleType) ?? "").trim();
    if (!i) return;
    const r = this.getPersistentActor() ?? this.actor, n = {
      faction: "Faction",
      childhood: "Childhood",
      higherEducation: "Higher Education",
      realLife: "Real Life"
    };
    await r.createEmbeddedDocuments("Item", [{
      name: n[i] ?? i,
      type: "lifeModule",
      system: { moduleType: i }
    }]), E(this, L, we).call(this, { force: !0 });
  }
  async _onCreateOwnedItem(t, s) {
    var l, c, u;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable) return;
    const i = String(((u = s == null ? void 0 : s.dataset) == null ? void 0 : u.itemType) ?? "").trim();
    if (!i) return;
    const r = this.getPersistentActor() ?? this.actor, n = r.items.filter((d) => d.type === i).length, o = i === "personalWeapon" ? "Personal Weapon" : i === "armor" ? "Armor" : i.charAt(0).toUpperCase() + i.slice(1);
    await r.createEmbeddedDocuments("Item", [{
      name: `${o} ${n + 1}`,
      type: i
    }]), E(this, L, we).call(this, { force: !0 });
  }
  async _onEditOwnedItem(t, s) {
    var r, n, o;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const i = E(this, L, ys).call(this, s, t);
    (o = i == null ? void 0 : i.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, s) {
    var n, o;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const i = E(this, L, ys).call(this, s, t);
    if (!i) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [i.id]), E(this, L, we).call(this, { force: !0 });
  }
  async _onToggleInventoryAccordion(t, s) {
    var r, n, o, l, c, u, d, m, h, g;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const i = String(
      ((o = s == null ? void 0 : s.dataset) == null ? void 0 : o.accordionId) ?? ((u = (c = (l = s == null ? void 0 : s.closest) == null ? void 0 : l.call(s, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((g = (h = (m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-accordion-id]")) == null ? void 0 : h.dataset) == null ? void 0 : g.accordionId) ?? ""
    ).trim();
    i && (H(this, rt).has(i) ? H(this, rt).delete(i) : H(this, rt).add(i), E(this, L, we).call(this, !1));
  }
  async _onToggleOwnedItemEquipped(t, s) {
    var n, o, l, c;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const i = E(this, L, ys).call(this, s, t);
    if (!i) return;
    const r = this.getPersistentActor() ?? this.actor;
    await ((c = r.setOwnedItemEquipped) == null ? void 0 : c.call(r, i.id, !((l = i.system) != null && l.equipped))), E(this, L, we).call(this, { force: !0 });
  }
  async _onSetOwnedItemPrimary(t, s) {
    var n, o, l, c;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const i = E(this, L, ys).call(this, s, t);
    if (!i) return;
    const r = this.getPersistentActor() ?? this.actor;
    await ((c = r.setOwnedItemPrimary) == null ? void 0 : c.call(r, i.id, !((l = i.system) != null && l.isPrimary))), E(this, L, we).call(this, { force: !0 });
  }
  async _onAttackWeapon(t, s) {
    var n, o, l, c, u, d, m, h, g, b, p;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const i = ((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.roll) ?? ((m = (d = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : d.dataset) == null ? void 0 : m.roll);
    if (!i) return;
    let r;
    try {
      r = JSON.parse(i);
    } catch (f) {
      console.warn("MWD | Invalid attack payload", i, f);
      return;
    }
    try {
      const f = this.getPersistentActor() ?? this.actor;
      if (!await ((b = (g = (h = game.mwd) == null ? void 0 : h.roll) == null ? void 0 : g.execute) == null ? void 0 : b.call(g, { actor: f, payload: r, event: t }))) return;
      E(this, L, we).call(this, { force: !0 });
    } catch (f) {
      console.error("MWD | Failed to launch weapon attack", f), (p = ui.notifications) == null || p.error((f == null ? void 0 : f.message) ?? "Unable to attack with that weapon.");
    }
  }
};
Ue = new WeakMap(), Ct = new WeakMap(), Ft = new WeakMap(), rt = new WeakMap(), L = new WeakSet(), jr = function() {
  E(this, L, Ji).call(this), H(this, Ue) && (Ee(this, Ct, (t) => {
    var r;
    const s = this._getRootElement();
    if (!s) return;
    const i = t.target;
    if (i instanceof Node && !((r = i.closest) != null && r.call(i, ".mwd-combat-menu"))) {
      if (!s.contains(i)) {
        E(this, L, Lt).call(this);
        return;
      }
      E(this, L, Lt).call(this);
    }
  }), document.addEventListener("click", H(this, Ct)));
}, Ji = function() {
  H(this, Ct) && (document.removeEventListener("click", H(this, Ct)), Ee(this, Ct, null));
}, Us = function() {
  const t = this._getRootElement();
  return t ? t.querySelector(".mwd-scroll-area") ?? t.querySelector(".csb-tab-panels") : null;
}, Vr = function() {
  const t = E(this, L, Us).call(this);
  if (!(t instanceof HTMLElement)) {
    Ee(this, Ft, null);
    return;
  }
  Ee(this, Ft, {
    top: t.scrollTop,
    left: t.scrollLeft
  });
}, Gr = function() {
  const t = H(this, Ft);
  if (!t) return;
  const s = E(this, L, Us).call(this);
  s instanceof HTMLElement && (s.scrollTop = t.top, s.scrollLeft = t.left, requestAnimationFrame(() => {
    const i = E(this, L, Us).call(this);
    i instanceof HTMLElement && (i.scrollTop = t.top, i.scrollLeft = t.left);
  }), Ee(this, Ft, null));
}, we = function(t = !1) {
  E(this, L, Vr).call(this), this.render(t);
}, Lt = function({ rerender: t = !0 } = {}) {
  H(this, Ue) && (Ee(this, Ue, null), t && E(this, L, we).call(this, !1));
}, ys = function(t, s) {
  var r, n, o, l, c, u, d, m;
  const i = String(
    ((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.itemId) ?? ((l = (o = (n = t == null ? void 0 : t.closest) == null ? void 0 : n.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((m = (d = (u = (c = s == null ? void 0 : s.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
  ).trim();
  return i ? this.actor.items.get(i) ?? null : null;
}, js = function(t, s) {
  return `${String(t ?? "").trim()}:${String(s ?? "").trim()}`;
}, C(oe, "PARTS", {
  sheet: {
    get template() {
      return `${x}/v2/actor/character-sheet.hbs`;
    }
  }
}), C(oe, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Gt(oe, oe, "DEFAULT_OPTIONS"), {
  classes: ["character-sheet", T, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
  window: { minWidth: 450, minHeight: 740, resizable: !0 },
  position: { width: 980, height: 900 },
  actions: {
    ...Gt(oe, oe, "DEFAULT_OPTIONS").actions,
    edgeSet: oe.prototype._onEdgeSet,
    toggleCombatMenu: oe.prototype._onToggleCombatMenu,
    toggleStatuses: oe.prototype._onToggleStatuses,
    combatSpend: oe.prototype._onCombatSpend,
    combatReduceBurn: oe.prototype._onCombatReduceBurn,
    combatOverloadCheck: oe.prototype._onCombatOverloadCheck,
    combatAttack: oe.prototype._onCombatAttack,
    createOwnedItem: oe.prototype._onCreateOwnedItem,
    addSkillSpecialization: oe.prototype._onAddSkillSpecialization,
    removeSkillSpecialization: oe.prototype._onRemoveSkillSpecialization,
    createLifeModuleItem: oe.prototype._onCreateLifeModuleItem,
    editOwnedItem: oe.prototype._onEditOwnedItem,
    deleteOwnedItem: oe.prototype._onDeleteOwnedItem,
    toggleInventoryAccordion: oe.prototype._onToggleInventoryAccordion,
    toggleOwnedItemEquipped: oe.prototype._onToggleOwnedItemEquipped,
    setOwnedItemPrimary: oe.prototype._onSetOwnedItemPrimary,
    attackWeapon: oe.prototype._onAttackWeapon
  }
}));
let Yi = oe;
class qr extends rs {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["npc-sheet", T, "actor-sheet-v2"]
    });
  }
}
C(qr, "PARTS", {
  sheet: {
    get template() {
      return `${x}/actor/npc.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class Kr extends rs {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["vehicle-sheet", T, "actor-sheet-v2"],
      position: { width: 860, height: 820 }
    });
  }
}
C(Kr, "PARTS", {
  sheet: {
    get template() {
      return `${x}/actor/vehicle.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class Yr extends rs {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["battlemech-sheet", T, "actor-sheet-v2"],
      position: { width: 900, height: 820 }
    });
  }
}
C(Yr, "PARTS", {
  sheet: {
    get template() {
      return `${x}/actor/battlemech.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
function Kl() {
  console.log(`${te}Registering Actor sheets (V2)`);
  const { Actors: a } = foundry.documents.collections;
  a.registerSheet(T, Yi, {
    types: ["character"],
    makeDefault: !0,
    label: "Character (V2)"
  }), a.registerSheet(T, qr, {
    types: ["npc"],
    makeDefault: !0,
    label: "NPC (V2)"
  }), a.registerSheet(T, Kr, {
    types: ["vehicle"],
    makeDefault: !0,
    label: "Vehicle (V2)"
  }), a.registerSheet(T, Yr, {
    types: ["battlemech"],
    makeDefault: !0,
    label: "BattleMech (V2)"
  });
}
const { HandlebarsApplicationMixin: Yl } = foundry.applications.api;
var Bt, zt, bs;
const Me = class Me extends Yl(foundry.applications.sheets.ItemSheetV2) {
  constructor() {
    super(...arguments);
    Se(this, zt);
    Se(this, Bt, /* @__PURE__ */ new Map());
    /** @override */
    C(this, "tabGroups", {
      primary: "main"
      // Default tab
    });
  }
  _getCanonicalItemType() {
    var t, s;
    return ((t = this.item) == null ? void 0 : t.canonicalType) ?? ((s = this.item) == null ? void 0 : s.type);
  }
  _getCanonicalItemTypeFromOptions(t) {
    const s = t == null ? void 0 : t.document;
    return (s == null ? void 0 : s.canonicalType) ?? (s == null ? void 0 : s.type);
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
        editImage: Me._onEditImage,
        tab: Me.prototype._onClickTab,
        checkbarElement: Me._onClickCheckbar,
        modifierAdd: Me._onModifierAdd,
        modifierDelete: Me._onModifierDelete,
        modifierValueChange: Me._onModifierValueChange,
        modifierConditionChange: Me._onModifierConditionChange,
        modifierSelectionChange: Me._onModifierSelectionChange,
        effectCreate: Me._onEffectCreate,
        effectEdit: Me._onEffectEdit,
        effectDelete: Me._onEffectDelete,
        effectToggleDisabled: Me._onEffectToggleDisabled
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
    const s = this._getCanonicalItemTypeFromOptions(t);
    s && t.classes.push(String(s));
    const i = ((c = (l = (o = (n = game.system) == null ? void 0 : n.mwd) == null ? void 0 : o.styles) == null ? void 0 : l.selectCssClass) == null ? void 0 : c.call(l)) ?? "mwd-theme-default", r = ["mwd-theme-default", "mwd-theme-sra"];
    return t.classes = t.classes.filter((u) => !r.includes(u)), t.classes.push(i), t;
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
    var s;
    if (t === "sheet") {
      const i = this._getCanonicalItemType();
      return {
        [y.itemType.mechWeapon]: `${x}/v2/item/mech-weapon-root.hbs`,
        [y.itemType.armor]: `${x}/v2/item/armor.hbs`
      }[i] ?? `${x}/v2/item/${i}.hbs`;
    }
    return ((s = super._getPartTemplate) == null ? void 0 : s.call(this, t)) ?? "";
  }
  /**
   * Override title to show localized item type and name.
   * @override
   */
  get title() {
    const t = this._getCanonicalItemType();
    return `${ce.itemType.singular[t] ?? t}: ${this.item.name}`;
  }
  /**
   * Prepare context data for rendering.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The context object
   * @override
   */
  async _prepareContext(t) {
    var F, I, W, U, G, Y;
    const s = await super._prepareContext(t), i = ((I = (F = game.system.mwd.modifiers) == null ? void 0 : F.getEnums) == null ? void 0 : I.call(F)) ?? {}, r = foundry.utils.deepClone((s == null ? void 0 : s.options) ?? {}), n = ((U = (W = this.item.actor) == null ? void 0 : W.getAttributes) == null ? void 0 : U.call(W, this.item)) ?? [], o = this._getCanonicalItemType(), l = !this.item.actor, c = !!this.item.actor, u = ce.itemType.singular[o] ?? o, d = this._getEffectEntries(), m = d.filter((D) => D.syncedCount > 0).length, h = this.constructor.LAYOUT_ID, g = this.item.actor ? (D) => n.includes(D) : (D) => !0, b = o === y.itemType.skill, f = ["mwd", "item-sheet", this.isEditable ? "editable" : "locked"], w = f.join(" ");
    r.classes = f, r.cssClass = w;
    const M = await foundry.applications.ux.TextEditor.implementation.enrichHTML(this.item.system.description ?? "", {
      async: !0,
      secrets: this.item.isOwner,
      relativeTo: this.item
    }), k = game.user.isGM && this.item.system.gmnotes ? await foundry.applications.ux.TextEditor.implementation.enrichHTML(this.item.system.gmnotes, {
      async: !0,
      secrets: !0,
      relativeTo: this.item
    }) : "", R = foundry.utils.mergeObject(s, {
      // Item data
      item: this.item,
      data: this.item,
      system: this.item.system,
      // Enriched content
      enrichedDescription: M,
      enrichedGMNotes: k,
      // Options for templates
      options: {
        ...r,
        isGM: game.user.isGM,
        limited: !this.document.isOwner,
        owner: this.document.isOwner,
        isOwned: !!this.item.actor,
        editable: this.isEditable,
        cssClass: w,
        viewMode: !1
        // Items don't have view mode like actors do
      },
      // Configuration data
      ENUMS: foundry.utils.mergeObject(
        Q.getEnums(g, b),
        i
      ),
      MWD: ce,
      itemSheet: {
        canonicalType: o,
        typeLabel: u,
        isArmorSheet: o === y.itemType.armor,
        isStandalone: l,
        canUseActorControls: c,
        supportsEffectSync: !!((Y = (G = this.item).supportsEquippedEffectSync) != null && Y.call(G)),
        effectEntries: d,
        effectCount: d.length,
        syncedEffectCount: m,
        summaryChips: this._getSummaryChips(),
        stateChips: this._getStateChips(d)
      },
      // CSS class for form element
      cssClass: w,
      // Tab configuration
      tabs: this._getTabs()
    });
    return h && (R.layout = await Js.get(h)), R;
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
    var i, r, n;
    const s = [];
    return s.push({ kind: "ownership", label: this.item.actor ? "Owned Item" : "World Item" }), Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "equipped") && s.push({
      kind: "equipment",
      label: (i = this.item.system) != null && i.equipped ? "Equipped" : "Unequipped",
      tone: (r = this.item.system) != null && r.equipped ? "active" : "muted"
    }), Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "isPrimary") && ((n = this.item.system) != null && n.isPrimary) && s.push({ kind: "role", label: "Primary", tone: "accent" }), t.length && s.push({
      kind: "effects",
      label: `${t.length} Effect${t.length === 1 ? "" : "s"}`,
      tone: t.some((o) => o.syncedCount > 0) ? "active" : "muted"
    }), s;
  }
  _getEffectEntries() {
    var i, r, n, o, l, c;
    const t = /* @__PURE__ */ new Map(), s = ((r = (i = this.item).getSyncedActorEffects) == null ? void 0 : r.call(i)) ?? [];
    for (const u of s) {
      const d = (l = (o = (n = u.flags) == null ? void 0 : n[T]) == null ? void 0 : o.equippedItemSync) == null ? void 0 : l.sourceEffectId;
      if (!d) continue;
      const m = t.get(d) ?? [];
      m.push(u), t.set(d, m);
    }
    return Array.from(((c = this.item.effects) == null ? void 0 : c.contents) ?? []).map((u) => {
      var m, h, g, b, p, f, w;
      const d = t.get(u.id) ?? [];
      return {
        id: u.id,
        name: u.name || "New Effect",
        img: u.img || "icons/svg/aura.svg",
        disabled: !!u.disabled,
        transfer: !!u.transfer,
        changesCount: Array.isArray(u.changes) ? u.changes.length : 0,
        statusesCount: Number(((m = u.statuses) == null ? void 0 : m.size) ?? ((h = u.statuses) == null ? void 0 : h.length) ?? 0),
        durationLabel: (g = u.duration) != null && g.seconds ? `${u.duration.seconds}s` : (b = u.duration) != null && b.rounds ? `${u.duration.rounds} rounds` : "Passive",
        syncedCount: d.length,
        syncLabel: this.item.actor ? (f = (p = this.item).supportsEquippedEffectSync) != null && f.call(p) ? (w = this.item.system) != null && w.equipped ? d.length ? `Synced to actor (${d.length})` : "Pending sync" : "Applies when equipped" : "No equip sync" : "World item"
      };
    });
  }
  _getRootElement() {
    var t;
    return this.element instanceof HTMLElement ? this.element : (t = this.element) == null ? void 0 : t[0];
  }
  _onClickTab(t, s) {
    var l, c, u;
    const i = ((l = s == null ? void 0 : s.closest) == null ? void 0 : l.call(s, ".csb-tab-link[data-tab]")) ?? ((u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, ".csb-tab-link[data-tab]"));
    if (!i) return;
    const r = i.closest(".csb-tabs");
    if (!r) return;
    const n = r.dataset.group || "default", o = i.dataset.tab;
    o && (H(this, Bt).set(n, o), E(this, zt, bs).call(this, this._getRootElement(), n, o));
  }
  _onRender(t, s) {
    var r, n, o, l;
    (r = super._onRender) == null || r.call(this, t, s), (n = this.window) != null && n.title && (this.window.title.textContent = this.title);
    const i = this._getRootElement();
    if (i) {
      for (const c of i.querySelectorAll(".sheet-tabs")) {
        const u = c.dataset.group || "default", d = Array.from(c.querySelectorAll("[data-tab]"));
        if (!d.length) continue;
        for (const b of d)
          b.addEventListener("click", (p) => {
            p.preventDefault(), p.stopPropagation();
            const f = b.dataset.tab;
            f && (H(this, Bt).set(u, f), E(this, zt, bs).call(this, i, u, f));
          });
        const m = H(this, Bt).get(u), h = c.dataset.default || ((o = d[0]) == null ? void 0 : o.dataset.tab), g = m || h;
        g && E(this, zt, bs).call(this, i, u, g);
      }
      for (const c of i.querySelectorAll(".csb-tabs")) {
        const u = c.dataset.group || "default", d = Array.from(c.querySelectorAll(".csb-tab-link[data-tab]"));
        if (!d.length) continue;
        const m = H(this, Bt).get(u), h = c.dataset.default || ((l = d[0]) == null ? void 0 : l.dataset.tab), g = m || h;
        g && E(this, zt, bs).call(this, i, u, g);
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
  static async _onClickCheckbar(t, s) {
    const i = this.item;
    if (!i.parent) return;
    const r = s.closest(".checkbar-root");
    if (!r) return;
    const n = r.dataset.monitorCode, o = Number.parseInt(s.dataset.index), l = s.dataset.checked === "true";
    await i.parent.switchMonitorCheck(n, o, l);
  }
  static async _onEditImage(t) {
    var r, n, o;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t), !this.isEditable) return;
    const s = foundry.applications.apps.FilePicker.implementation;
    new s({
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
  static async _onModifierAdd(t, s) {
    await this.item.createModifier();
  }
  /**
   * Handle deleting a modifier.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The clicked element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierDelete(t, s) {
    const i = s.closest(".define-modifier");
    if (!i) return;
    const r = i.dataset.modifierId;
    r && await this.item.deleteModifier(r);
  }
  /**
   * Handle changing a modifier's value.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The input element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierValueChange(t, s) {
    const i = s.closest(".define-modifier");
    if (!i) return;
    const r = i.dataset.modifierId;
    r && await this.item.changeModifierValue(r, s.value);
  }
  /**
   * Handle changing a modifier's condition.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The input element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierConditionChange(t, s) {
    const i = s.closest(".define-modifier");
    if (!i) return;
    const r = i.dataset.modifierId;
    r && await this.item.changeModifierCondition(r, s.value);
  }
  /**
   * Handle changing a modifier's selection (dropdown).
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The select element
   * @returns {Promise<void>}
   * @static
   */
  static async _onModifierSelectionChange(t, s) {
    const i = s.closest(".define-modifier");
    if (!i) return;
    const r = i.dataset.modifierId, n = s.dataset.modifierSelect;
    r && n && await this.item.changeModifierSelection(r, n, s.value);
  }
  static async _onEffectCreate(t, s) {
    var r, n, o;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const [i] = await this.item.createEmbeddedDocuments("ActiveEffect", [{
      name: `${this.item.name} Effect`,
      img: this.item.img || "icons/svg/aura.svg",
      disabled: !1,
      transfer: !1,
      changes: []
    }]);
    (o = i == null ? void 0 : i.sheet) == null || o.render(!0);
  }
  static async _onEffectEdit(t, s) {
    var n, o, l, c, u, d, m;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const i = ((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.effectId) ?? ((d = (u = (c = s == null ? void 0 : s.closest) == null ? void 0 : c.call(s, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : d.effectId);
    if (!i) return;
    const r = this.item.effects.get(i);
    (m = r == null ? void 0 : r.sheet) == null || m.render(!0);
  }
  static async _onEffectDelete(t, s) {
    var r, n, o, l, c, u;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const i = ((o = s == null ? void 0 : s.dataset) == null ? void 0 : o.effectId) ?? ((u = (c = (l = s == null ? void 0 : s.closest) == null ? void 0 : l.call(s, "[data-effect-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.effectId);
    i && await this.item.deleteEmbeddedDocuments("ActiveEffect", [i]);
  }
  static async _onEffectToggleDisabled(t, s) {
    var n, o, l, c, u, d;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const i = ((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.effectId) ?? ((d = (u = (c = s == null ? void 0 : s.closest) == null ? void 0 : c.call(s, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : d.effectId);
    if (!i) return;
    const r = this.item.effects.get(i);
    r && await r.update({ disabled: !r.disabled });
  }
};
Bt = new WeakMap(), zt = new WeakSet(), bs = function(t, s, i) {
  t && (t.querySelectorAll(`.csb-tabs[data-group="${s}"] .csb-tab-link[data-tab]`).forEach((r) => {
    r.classList.toggle("is-active", r.dataset.tab === i);
  }), t.querySelectorAll(`.csb-tabs[data-group="${s}"] .csb-tab-panel[data-tab]`).forEach((r) => {
    r.classList.toggle("is-active", r.dataset.tab === i);
  }), t.querySelectorAll(".sheet-tabs [data-tab]").forEach((r) => {
    var o;
    (((o = r.closest(".sheet-tabs")) == null ? void 0 : o.dataset.group) || "default") === s && r.classList.toggle("active", r.dataset.tab === i);
  }), t.querySelectorAll(`.tab[data-group="${s}"]`).forEach((r) => {
    r.classList.toggle("active", r.dataset.tab === i);
  }));
}, C(Me, "LAYOUT_ID", null), /** @override */
C(Me, "PARTS", {
  sheet: {
    template: "",
    // Set dynamically in _getPartTemplate
    scrollable: [".sheet-body"]
  }
}), C(Me, "TABS", {
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
let et = Me;
class Jr extends et {
}
C(Jr, "PARTS", {
  sheet: {
    template: `${x}/v2/item/contact.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Qr extends et {
}
C(Qr, "PARTS", {
  sheet: {
    template: `${x}/v2/item/gear.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Xr extends et {
}
C(Xr, "PARTS", {
  sheet: {
    template: `${x}/v2/item/quality.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Zr extends et {
}
C(Zr, "PARTS", {
  sheet: {
    template: `${x}/v2/item/assetModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class en extends et {
}
C(en, "PARTS", {
  sheet: {
    template: `${x}/v2/item/lifeModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class tn extends et {
}
C(tn, "PARTS", {
  sheet: {
    template: `${x}/v2/item/skill.hbs`,
    scrollable: [".sheet-body"]
  }
});
const Jl = Object.freeze([
  "firearms",
  "projectileWeapons",
  "heavyWeapons",
  "meleeCombat"
]), Ql = Object.freeze([
  { value: "energy", label: "Energy" },
  { value: "kinetic", label: "Kinetic" },
  { value: "ballistic", label: "Ballistic" },
  { value: "explosive", label: "Explosive" },
  { value: "plasma", label: "Plasma" },
  { value: "electrical", label: "Electrical" },
  { value: "melee", label: "Melee" },
  { value: "none", label: "None" }
]);
function Ga(a, e, t) {
  const s = String(e ?? "").trim();
  return !s || a.some((i) => i.value === s) ? a : a.concat({ value: s, label: t(s) });
}
class ri extends et {
  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        weaponSkillChange: ri._onWeaponSkillChange
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
    var l, c, u, d, m, h;
    const t = await super._prepareContext(e), s = this._getCanonicalItemType();
    t.ENUMS = foundry.utils.mergeObject(
      { defenses: de.getDefenses() },
      t.ENUMS
    );
    const i = Array.isArray((l = t.ENUMS) == null ? void 0 : l.skills) ? t.ENUMS.skills : [], r = (c = this.item.system) == null ? void 0 : c.skill, n = (u = this.item.system) == null ? void 0 : u.damageType, o = s === "personalWeapon" ? Ga(
      i.filter((g) => Jl.includes(g.value)),
      r,
      (g) => {
        var b;
        return ((b = i.find((p) => p.value === g)) == null ? void 0 : b.label) ?? g;
      }
    ) : i;
    return t.weaponProfile = ((m = (d = this.item).getCombatProfile) == null ? void 0 : m.call(d)) ?? null, t.weaponEditor = {
      skills: o,
      categories: [
        { value: "melee", label: "Melee" },
        { value: "ranged", label: "Ranged" },
        { value: "thrown", label: "Thrown" },
        { value: "other", label: "Other" }
      ],
      damageTypes: Ga(
        s === "personalWeapon" ? [...Vs] : [...Ql],
        n,
        (g) => s === "personalWeapon" ? Rt(g) : g
      ),
      ranges: qe.RANGE_ORDER.map((g) => ({
        value: g,
        label: g.charAt(0).toUpperCase() + g.slice(1)
      })),
      standardTraits: [...kn],
      ammoDamageTypes: [{ value: "", label: "Use Weapon Default" }, ...Vs],
      payloadSourceKinds: [
        { value: "untracked", label: "Untracked" },
        { value: "internal", label: "Internal" },
        { value: "actorResource", label: "Actor Resource" },
        { value: "itemRef", label: "Linked Item" }
      ]
    }, t.itemSheet = foundry.utils.mergeObject(t.itemSheet ?? {}, {
      isCompactWeaponSheet: !0,
      weaponSheetVariant: s === "mechWeapon" ? "mech" : "personal"
    }), t.itemSheet.stateChips = (t.itemSheet.stateChips ?? []).filter(
      (g) => !["ownership", "equipment", "role"].includes(g.kind)
    ), t.itemSheet.currentPayloadLabel = ((h = t.weaponProfile) == null ? void 0 : h.payloadLabel) ?? "", t;
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
    const s = t.value, i = (n = (r = game.system.mwd.skills) == null ? void 0 : r.get) == null ? void 0 : n.call(r, s);
    i != null && i.defense && await this.item.update({ "system.defense": i.defense }, { render: !1 });
  }
}
const As = class As extends ri {
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
        attackWeapon: As._onAttackWeapon
      }
    }, { inplace: !1 });
  }
  async _prepareContext(e) {
    var r, n, o;
    const t = await super._prepareContext(e), s = this.item.actor ?? null, i = !!(s && typeof s.isCharacterLike == "function" && s.isCharacterLike() && ((n = (r = this.item).isPersonalWeapon) != null && n.call(r)));
    return t.itemSheet = foundry.utils.mergeObject(t.itemSheet ?? {}, {
      canAttack: i,
      attackDisabled: !i || !((o = this.item.system) != null && o.equipped)
    }), t.itemSheet.summaryChips = this._getSummaryChips(t.weaponProfile ?? null), t;
  }
  _getSummaryChips(e = ((t) => ((s) => (s = (t = this.item).getCombatProfile) == null ? void 0 : s.call(t))())() ?? null) {
    var r, n, o;
    if (!e) return [];
    const i = [
      { label: "Category", value: String(e.category ?? "").trim() || "Ranged" },
      { label: "Skill", value: ((r = e.skillDef) == null ? void 0 : r.label) ?? e.skill ?? "Firearms" },
      { label: "DV", value: String(Number(e.damage ?? 0)) },
      { label: "AP", value: String(Number(e.ap ?? 0)) },
      { label: "Type", value: Rt(e.damageType) || "Penetrating" },
      { label: "Range", value: String(((n = e.range) == null ? void 0 : n.max) ?? "near").trim() || "Near" }
    ];
    return String(e.category ?? "").trim().toLowerCase() !== "melee" && i.push((o = e == null ? void 0 : e.sourceState) != null && o.isTracked ? { label: "Payload", value: `${(e == null ? void 0 : e.payloadLabel) || "Unloaded"} (${Number(e.sourceState.current ?? 0)}/${Number(e.sourceState.max ?? 0)})` } : { label: "Payload", value: (e == null ? void 0 : e.payloadLabel) || "Unloaded" }), i;
  }
  static async _onAttackWeapon(e) {
    var s, i, r, n, o;
    (s = e == null ? void 0 : e.preventDefault) == null || s.call(e), (i = e == null ? void 0 : e.stopPropagation) == null || i.call(e);
    const t = this.item.actor ?? null;
    !t || !((n = (r = this.item).isPersonalWeapon) != null && n.call(r)) || await game.mwd.roll.execute({
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
  }
  _onRender(e, t) {
    var i, r;
    (i = super._onRender) == null || i.call(this, e, t);
    const s = (r = this._getRootElement) == null ? void 0 : r.call(this);
    s && (s.querySelectorAll(".mwd-standard-trait-add").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).createWeaponStandardTrait) == null || c.call(l);
      });
    }), s.querySelectorAll(".mwd-standard-trait-delete").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).deleteWeaponStandardTrait) == null || c.call(l, n.dataset.traitId);
      });
    }), s.querySelectorAll(".mwd-standard-trait-field").forEach((n) => {
      n.addEventListener("change", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).updateWeaponStandardTrait) == null || c.call(
          l,
          n.dataset.traitId,
          n.dataset.field,
          n.value
        );
      });
    }), s.querySelectorAll(".mwd-payload-add").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).createPayload) == null || c.call(l);
      });
    }), s.querySelectorAll(".mwd-payload-delete").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).deletePayload) == null || c.call(l, n.dataset.payloadId);
      });
    }), s.querySelectorAll(".mwd-payload-field").forEach((n) => {
      n.addEventListener("change", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).updatePayloadField) == null || c.call(
          l,
          n.dataset.payloadId,
          n.dataset.field,
          n.value
        );
      });
    }), s.querySelectorAll(".mwd-payload-standard-trait-add").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).createPayloadStandardTrait) == null || c.call(l, n.dataset.payloadId);
      });
    }), s.querySelectorAll(".mwd-payload-standard-trait-delete").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).deletePayloadStandardTrait) == null || c.call(l, n.dataset.payloadId, n.dataset.traitId);
      });
    }), s.querySelectorAll(".mwd-payload-standard-trait-field").forEach((n) => {
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
    }), s.querySelectorAll(".mwd-source-add").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).createConsumptionSource) == null || c.call(l);
      });
    }), s.querySelectorAll(".mwd-source-delete").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).deleteConsumptionSource) == null || c.call(l, n.dataset.sourceId);
      });
    }), s.querySelectorAll(".mwd-source-field").forEach((n) => {
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
C(As, "LAYOUT_ID", "personal-weapon"), C(As, "PARTS", {
  sheet: {
    template: `${x}/v2/item/personal-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
let Qi = As;
class Xi extends ri {
}
C(Xi, "LAYOUT_ID", "mech-weapon"), C(Xi, "PARTS", {
  sheet: {
    template: `${x}/v2/item/mech-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Zi extends et {
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
    var l, c, u, d, m, h, g, b, p;
    const t = await super._prepareContext(e), s = this.item, i = s.actor ?? null, r = ((l = i == null ? void 0 : i.getPersonalCombatLoadout) == null ? void 0 : l.call(i)) ?? null, n = ((c = r == null ? void 0 : r.activeArmor) == null ? void 0 : c.id) ?? null, o = ((u = r == null ? void 0 : r.activeArmor) == null ? void 0 : u.id) === s.id ? r.activeArmor : null;
    return t.armorState = o, t.isActiveArmor = n === s.id, t.effectiveDurabilityCurrent = Number(
      ((d = o == null ? void 0 : o.durability) == null ? void 0 : d.current) ?? ((h = (m = s.system) == null ? void 0 : m.durability) == null ? void 0 : h.current) ?? ((b = (g = s.system) == null ? void 0 : g.durability) == null ? void 0 : b.max) ?? ((p = s.system) == null ? void 0 : p.rating) ?? 0
    ), t.itemSheet = foundry.utils.mergeObject(t.itemSheet ?? {}, {}), t.itemSheet.summaryChips = this._getSummaryChips(o), t.armorEditor = {
      standardTraits: [...Mn]
    }, t;
  }
  _getSummaryChips(e = null) {
    var r, n, o, l, c, u, d, m, h, g, b, p, f;
    const t = this.item.system ?? {}, s = [
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
    ], i = Number(((d = (u = e == null ? void 0 : e.traitState) == null ? void 0 : u.reinforced) == null ? void 0 : d.max) ?? ((h = (m = t == null ? void 0 : t.traitState) == null ? void 0 : m.reinforced) == null ? void 0 : h.max) ?? 0);
    return i > 0 && s.push({
      label: "Reinforced",
      value: `${Number(((b = (g = e == null ? void 0 : e.traitState) == null ? void 0 : g.reinforced) == null ? void 0 : b.current) ?? ((f = (p = t == null ? void 0 : t.traitState) == null ? void 0 : p.reinforced) == null ? void 0 : f.current) ?? 0)}/${i}`
    }), s;
  }
  _onRender(e, t) {
    var i, r;
    (i = super._onRender) == null || i.call(this, e, t);
    const s = (r = this._getRootElement) == null ? void 0 : r.call(this);
    s && (s.querySelectorAll(".mwd-armor-standard-trait-add").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).createArmorStandardTrait) == null || c.call(l);
      });
    }), s.querySelectorAll(".mwd-armor-standard-trait-delete").forEach((n) => {
      n.addEventListener("click", (o) => {
        var l, c;
        o.preventDefault(), (c = (l = this.item).deleteArmorStandardTrait) == null || c.call(l, n.dataset.traitId);
      });
    }), s.querySelectorAll(".mwd-armor-standard-trait-field").forEach((n) => {
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
C(Zi, "LAYOUT_ID", "armor"), C(Zi, "PARTS", {
  sheet: {
    template: `${x}/v2/item/armor-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
function Xl() {
  console.log(`${te}Registering Item sheets (V2)`);
  const { Items: a } = foundry.documents.collections;
  a.registerSheet(T, Jr, { types: ["contact"], makeDefault: !0, label: "Contact (V2)" }), a.registerSheet(T, Qr, { types: ["gear"], makeDefault: !0, label: "Gear (V2)" }), a.registerSheet(T, Xr, { types: ["quality"], makeDefault: !0, label: "Quality (V2)" }), a.registerSheet(T, Zr, { types: ["assetModule"], makeDefault: !0, label: "Asset Module (V2)" }), a.registerSheet(T, en, { types: ["lifeModule"], makeDefault: !0, label: "Life Module (V2)" }), a.registerSheet(T, tn, { types: ["skill"], makeDefault: !0, label: "Skill (V2)" }), a.registerSheet(T, Qi, { types: ["personalWeapon", "weapon"], makeDefault: !0, label: "Personal Weapon (V2)" }), a.registerSheet(T, Xi, { types: ["mechWeapon"], makeDefault: !0, label: "Mech Weapon (V2)" }), a.registerSheet(T, Zi, { types: ["armor"], makeDefault: !0, label: "Armor (V2)" });
}
const qa = [
  // UI (CSB render entry point + node types)
  `systems/${T}/templates/v2/ui/layout-root.hbs`,
  `systems/${T}/templates/v2/ui/nodes/hexabox.hbs`,
  `systems/${T}/templates/v2/ui/nodes/stack.hbs`,
  `systems/${T}/templates/v2/ui/nodes/panel.hbs`,
  `systems/${T}/templates/v2/ui/nodes/include.hbs`,
  `systems/${T}/templates/v2/ui/nodes/tabs.hbs`,
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
  `systems/${T}/templates/v2/ui/placeholders/bio-life-modules.hbs`,
  // V2 item partials
  `systems/${T}/templates/v2/item/_item-sheet-root.hbs`,
  `systems/${T}/templates/v2/item/personal-weapon-root.hbs`,
  `systems/${T}/templates/v2/item/mech-weapon-root.hbs`,
  `systems/${T}/templates/v2/item/armor-root.hbs`,
  `systems/${T}/templates/v2/item/parts/itemname.hbs`,
  `systems/${T}/templates/v2/item/parts/references.hbs`,
  `systems/${T}/templates/v2/item/parts/modifier.hbs`,
  `systems/${T}/templates/v2/item/parts/modifiers.hbs`,
  `systems/${T}/templates/v2/item/parts/weapon-main.hbs`,
  `systems/${T}/templates/v2/item/parts/weapon-compact-main.hbs`,
  `systems/${T}/templates/v2/item/parts/weapon-summary-hero.hbs`,
  `systems/${T}/templates/v2/item/parts/weapon-combat-essentials.hbs`,
  `systems/${T}/templates/v2/item/parts/weapon-usage-bands.hbs`,
  `systems/${T}/templates/v2/item/parts/weapon-standard-traits.hbs`,
  `systems/${T}/templates/v2/item/parts/weapon-ammo-profiles.hbs`,
  `systems/${T}/templates/v2/item/parts/weapon-consumption-sources.hbs`,
  `systems/${T}/templates/v2/item/parts/weapon-notes-reference.hbs`,
  `systems/${T}/templates/v2/item/parts/armor-main.hbs`,
  `systems/${T}/templates/v2/item/parts/armor-summary-hero.hbs`,
  `systems/${T}/templates/v2/item/parts/armor-combat-essentials.hbs`,
  `systems/${T}/templates/v2/item/parts/armor-usage-protection.hbs`,
  `systems/${T}/templates/v2/item/parts/armor-identity-fields.hbs`,
  `systems/${T}/templates/v2/item/parts/armor-standard-traits.hbs`,
  `systems/${T}/templates/v2/item/parts/armor-notes-reference.hbs`,
  `systems/${T}/templates/v2/item/parts/item-effects.hbs`,
  // Actors
  `systems/${T}/templates/v2/actor/character-sheet.hbs`
];
function Zl(a) {
  const e = String(a).replaceAll("\\", "/"), t = `systems/${T}/templates/`, s = e.indexOf(t);
  return `mwd.${(s >= 0 ? e.slice(s + t.length) : e).replace(/\.hbs$/i, "").split("/").filter(Boolean).map((o) => o.replace(/^_+/, "")).join(".")}`;
}
function ec() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
async function tc() {
  var e, t;
  const a = ec();
  try {
    const s = {};
    for (const r of qa)
      s[Zl(r)] = r, s[r] = r;
    await foundry.applications.handlebars.loadTemplates(s);
    const i = "mwd.v2.ui.layout-root";
    if (!((e = Handlebars.partials) != null && e[i])) {
      const r = Object.keys(Handlebars.partials ?? {});
      throw console.error("Missing required partial:", i), console.error("Closest matches:", r.filter((n) => n.includes("layout-root"))), new Error(`Template preload failed: ${i} not registered`);
    }
    if (a !== Handlebars) {
      for (const [r, n] of Object.entries(a.partials ?? {}))
        if (!((t = Handlebars.partials) != null && t[r]))
          try {
            Handlebars.registerPartial(r, n);
          } catch {
          }
    }
    console.log(`${te}preloadTemplatesV2 OK`, { loaded: qa.length });
  } catch (s) {
    throw console.error(`${te}preloadTemplatesV2 FAILED`, s), s;
  }
}
function Ka(a) {
  const e = Math.max(0, Number(a) || 0);
  return -Math.floor(e / 3);
}
function sc(a) {
  const e = Math.max(0, Number(a) || 0);
  return e === 0 ? 0 : Math.ceil(e / 4);
}
function ic(a = {}) {
  const e = a.physical ?? {}, t = a.fatigue ?? {}, s = a.armor ?? {}, i = Number(e.value) || 0, r = Number(t.value) || 0, n = Math.max(Number(s.value) || 0, Number(s.max) || 0);
  return {
    physical: { penalty: Ka(i) },
    fatigue: { penalty: Ka(r) },
    armor: { resistance: sc(n) }
  };
}
const Mi = {
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
function ac(a, e, t, s) {
  const i = a.system ?? {}, r = `monitors.${e}`, n = Number(foundry.utils.getProperty(i, `${r}.max`)) || 0, o = Number(foundry.utils.getProperty(i, `${r}.value`)) || 0;
  switch (t) {
    case "value":
      return s;
    case "armorPersonalBase":
      return s;
    case "mechArmorBase":
      return Math.max(s, n, o);
    case "vehicleArmorBase":
      return Math.max(s, n, o);
    default:
      return s;
  }
}
function rc(a = {}) {
  return Object.entries(nt(a)).filter(([, e]) => Number(e) > 0).map(([e, t]) => `${e} +${t}`).join(", ");
}
class nc extends Actor {
  /* -------------------------------------------- */
  /* Base & Derived Data                           */
  /* -------------------------------------------- */
  /** @override */
  prepareBaseData() {
    var e, t;
    if (super.prepareBaseData(), this.isCharacterLike()) {
      const s = this.system ?? {};
      if (ao(s), (e = s.skills) != null && e.skills && typeof s.skills.skills == "object") {
        for (const [i, r] of Object.entries(s.skills.skills))
          (t = s.skills)[i] ?? (t[i] = r);
        delete s.skills.skills;
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
    var t, s;
    if (this.type !== "character") return;
    const e = (s = (t = this.system) == null ? void 0 : t.counters) == null ? void 0 : s.edgePools;
    if (!(!e || typeof e != "object"))
      for (const i of Object.values(e)) {
        if (!i || typeof i != "object") continue;
        i.rating = Math.max(0, Number(i.rating ?? 0));
        const r = Object.prototype.hasOwnProperty.call(i, "value"), n = Number(i.value);
        (!r || !Number.isFinite(n)) && (i.value = i.rating), "max" in i && delete i.max;
      }
  }
  /**
   * Derived-data prep for Edge pools:
   * - Computes cap/effectiveMax/effectiveValue
   * - Stores in a non-persisted cache on the actor instance
   * - No writes to system data (prevents UI snap-back / loops)
   */
  _prepareEdgePoolsDerived() {
    var t, s;
    this._mwdDerived ?? (this._mwdDerived = {}), this._mwdDerived.edgePools = null;
    const e = this.getEdgeCap();
    if (this.type === "character" && this.hasEdgePools()) {
      const i = ((s = (t = this.system) == null ? void 0 : t.counters) == null ? void 0 : s.edgePools) ?? {}, r = {};
      for (const [n, o] of Object.entries(i)) {
        const l = Math.max(0, Number((o == null ? void 0 : o.rating) ?? 0)), c = Math.max(0, Number((o == null ? void 0 : o.value) ?? 0)), u = Math.min(l, e), d = Math.min(c, u);
        r[n] = {
          key: n,
          rating: l,
          value: c,
          cap: e,
          effectiveMax: u,
          effectiveValue: d,
          hasPools: !0,
          isEmpty: d <= 0,
          isCapped: l > e
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
    var t, s, i;
    return Math.max(0, Number(((i = (s = (t = this.system) == null ? void 0 : t.attributes) == null ? void 0 : s[e]) == null ? void 0 : i.value) ?? 0));
  }
  getSkillRating(e) {
    var t, s, i;
    return Math.max(0, Number(((i = (s = (t = this.system) == null ? void 0 : t.skills) == null ? void 0 : s[e]) == null ? void 0 : i.rating) ?? 0));
  }
  getOwnedItem(e) {
    var t, s;
    return ((s = (t = this.items) == null ? void 0 : t.get) == null ? void 0 : s.call(t, e)) ?? null;
  }
  async setCheckbarValue(e, t) {
    return await this.update({ [e]: t });
  }
  getPersonalCombatLoadout({ refresh: e = !1 } = {}) {
    var s;
    if (!e) {
      const i = (s = this._mwdDerived) == null ? void 0 : s.personalCombat;
      if (i) return i;
    }
    const t = this._computePersonalCombatLoadout();
    return this._mwdDerived ?? (this._mwdDerived = {}), this._mwdDerived.personalCombat = t, t;
  }
  _computePersonalCombatLoadout() {
    const e = [], t = this.items.filter((h) => {
      var g;
      return ((g = h.isPersonalWeapon) == null ? void 0 : g.call(h)) ?? h.type === y.itemType.personalWeapon;
    }).map((h) => {
      var g;
      return ((g = h.getCombatProfile) == null ? void 0 : g.call(h)) ?? null;
    }).filter(Boolean), s = this.items.filter((h) => {
      var g;
      return ((g = h.isArmor) == null ? void 0 : g.call(h)) ?? h.type === y.itemType.armor;
    }).map((h) => {
      var g;
      return ((g = h.getArmorProfile) == null ? void 0 : g.call(h, { actor: this })) ?? null;
    }).filter(Boolean), i = t.filter((h) => h.equipped), r = s.filter((h) => h.equipped), n = i.filter((h) => h.isPrimary), o = r.filter((h) => h.isPrimary);
    let l = null, c = null, u = !1;
    n.length === 1 ? (c = n[0], l = c) : n.length > 1 ? (e.push("Multiple equipped primary weapons found; attack selection requires a chooser."), u = !0) : i.length === 1 ? l = i[0] : i.length > 1 ? u = !0 : l = {
      ...qe.DEFAULT_UNARMED,
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
      equippedWeapons: i,
      primaryWeapon: c,
      defaultWeapon: l,
      weaponChoiceRequired: u,
      armor: s,
      equippedArmor: r,
      primaryArmor: d,
      activeArmor: m,
      warnings: e
    };
  }
  _buildActiveArmorState(e) {
    var n, o;
    if (!e) return null;
    const t = Math.max(0, Number(((n = e == null ? void 0 : e.durability) == null ? void 0 : n.max) ?? (e == null ? void 0 : e.rating) ?? 0)), s = Math.min(
      t,
      Math.max(0, Number(((o = e == null ? void 0 : e.durability) == null ? void 0 : o.current) ?? (e == null ? void 0 : e.currentArmorRating) ?? t))
    ), i = nt(e == null ? void 0 : e.mitigationByType), r = aa(s);
    return {
      ...e,
      armorId: e.id,
      remainingDurability: s,
      currentArmorRating: s,
      baseMitigation: r,
      baseResistance: r,
      mitigationByType: i,
      typedMitigation: i,
      ratingCurrent: s,
      isDestroyed: s <= 0,
      durability: {
        current: s,
        max: t
      }
    };
  }
  async setOwnedItemEquipped(e, t) {
    var i, r, n;
    const s = this.getOwnedItem(e);
    return !s || !((i = s.isPersonalWeapon) != null && i.call(s) || (r = s.isArmor) != null && r.call(s)) ? null : this.updateEmbeddedDocuments("Item", [{
      _id: s.id,
      "system.equipped": !!t,
      "system.isPrimary": t ? !!((n = s.system) != null && n.isPrimary) : !1
    }]);
  }
  async setOwnedItemPrimary(e, t) {
    var n, o, l, c;
    const s = this.getOwnedItem(e);
    if (!s || !((n = s.isPersonalWeapon) != null && n.call(s) || (o = s.isArmor) != null && o.call(s))) return null;
    const i = [], r = !!t;
    if (r)
      for (const u of this.items.filter((d) => d.type === s.type && d.id !== s.id))
        (l = u.system) != null && l.isPrimary && i.push({ _id: u.id, "system.isPrimary": !1 });
    return i.push({
      _id: s.id,
      "system.isPrimary": r,
      "system.equipped": r ? !0 : !!((c = s.system) != null && c.equipped)
    }), this.updateEmbeddedDocuments("Item", i);
  }
  /* -------------------------------------------- */
  /* Edge API (cap + pools w/ rating + current)    */
  /* -------------------------------------------- */
  getEdgeCap() {
    var e, t, s;
    return Math.max(0, Number(((s = (t = (e = this.system) == null ? void 0 : e.attributes) == null ? void 0 : t.edge) == null ? void 0 : s.value) ?? 0));
  }
  getEdgePoolRaw(e) {
    var t, s, i;
    return ((i = (s = (t = this.system) == null ? void 0 : t.counters) == null ? void 0 : s.edgePools) == null ? void 0 : i[e]) ?? null;
  }
  /**
   * Canonical pool accessor.
   * - Character: returns raw + effective values (effective is clamped by cap)
   * - NPC: no pools; Edge attribute acts as a single “pool” (effective max/value = cap)
   * - Vehicle/Mech: safe zeros
   */
  getEdgePool(e) {
    var c, u, d;
    const t = this.getEdgeCap();
    if (this.type === "npc" && !this.hasEdgePools()) {
      const m = t, h = t;
      return {
        key: e,
        value: h,
        rating: m,
        effectiveValue: h,
        effectiveMax: m,
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
    const s = (d = (u = (c = this._mwdDerived) == null ? void 0 : c.edgePools) == null ? void 0 : u.pools) == null ? void 0 : d[e];
    if (s)
      return {
        key: s.key,
        value: s.value,
        rating: s.rating,
        effectiveValue: s.effectiveValue,
        effectiveMax: s.effectiveMax,
        cap: s.cap,
        hasPools: !0
      };
    const i = this.getEdgePoolRaw(e), r = Math.max(0, Number((i == null ? void 0 : i.rating) ?? 0)), n = Math.max(0, Number((i == null ? void 0 : i.value) ?? 0)), o = Math.min(r, t), l = Math.min(n, o);
    return {
      key: e,
      value: n,
      rating: r,
      effectiveValue: l,
      effectiveMax: o,
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
    if (!this.hasEdgePools()) return;
    const s = this.getEdgeCap(), i = this.getEdgePoolRaw(e), r = Math.max(0, Number((i == null ? void 0 : i.rating) ?? 0)), n = Math.min(r, s), o = Number(t ?? 0), l = Math.max(0, Math.min(o, n));
    return this.update({
      [`system.counters.edgePools.${e}.value`]: l
    });
  }
  /**
   * Convenience: adjust CURRENT value by delta (e.g., spend -1, award +1).
   */
  async adjustEdgePoolValue(e, t) {
    var r;
    if (!this.hasEdgePools()) return;
    const s = Math.max(0, Number(((r = this.getEdgePoolRaw(e)) == null ? void 0 : r.value) ?? 0)), i = Number(t ?? 0);
    return this.setEdgePoolValue(e, s + i);
  }
  /**
   * Set the RATING (advancement ceiling) for a pool.
   * Stores true rating (not cap-clamped), then clamps current value to new effective max.
   */
  async setEdgePoolRating(e, t) {
    var l;
    if (!this.hasEdgePools()) return;
    const s = this.getEdgeCap(), i = Math.max(0, Number(t ?? 0)), r = Math.min(i, s), n = Math.max(0, Number(((l = this.getEdgePoolRaw(e)) == null ? void 0 : l.value) ?? 0)), o = Math.min(n, r);
    return this.update({
      [`system.counters.edgePools.${e}.rating`]: i,
      [`system.counters.edgePools.${e}.value`]: o
    });
  }
  /**
   * Sheet-facing summary for rendering.
   * If `groups` is provided, returns grouped pool arrays.
   */
  getEdgePoolSummary({ groups: e } = {}) {
    var s, i, r, n;
    const t = this.getEdgeCap();
    if (this.hasEdgePools()) {
      const o = ((i = (s = this._mwdDerived) == null ? void 0 : s.edgePools) == null ? void 0 : i.pools) ?? {};
      if (e && typeof e == "object") {
        const c = Object.entries(e).map(([u, d]) => {
          const m = (d ?? []).map((h) => {
            const g = o[h] ?? this.getEdgePool(h);
            return {
              ...g,
              isEmpty: (g.effectiveValue ?? 0) <= 0,
              isCapped: (g.rating ?? 0) > (g.cap ?? t)
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
          isCapped: (u.rating ?? 0) > (u.cap ?? t)
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
  async spendEdge(e, t = 1) {
    if (!this.hasEdgePools()) return;
    const s = Math.max(0, Number(t ?? 1));
    if (s)
      return this.adjustEdgePoolValue(e, -s);
  }
  async gainEdge(e, t = 1) {
    var i;
    if (!this.hasEdgePools()) return;
    Math.max(
      0,
      Number(((i = this.getEdgePoolRaw(e)) == null ? void 0 : i.value) ?? 0)
    );
    const s = Number(t ?? 0);
    return this.adjustEdgePoolValue(e, s);
  }
  /* -------------------------------------------- */
  /* Document Lifecycle                            */
  /* -------------------------------------------- */
  /** @override */
  async _onUpdate(e, t, s) {
    await super._onUpdate(e, t, s), game.userId === s && (t != null && t.mwdSyncOverloadedFromEffect || foundry.utils.hasProperty(e, "system.burn.overloaded") && await this._syncOverloadedEffect(!!e.system.burn.overloaded));
  }
  _onCreateDescendantDocuments(e, t, s, i, r, n) {
    super._onCreateDescendantDocuments(e, t, s, i, r, n), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  _onUpdateDescendantDocuments(e, t, s, i, r, n) {
    super._onUpdateDescendantDocuments(e, t, s, i, r, n), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  _onDeleteDescendantDocuments(e, t, s, i, r, n) {
    super._onDeleteDescendantDocuments(e, t, s, i, r, n), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  async _syncOverloadedEffect(e) {
    await this.toggleStatusEffect("overloaded", { active: e, overlay: !1 });
  }
  async _syncOverloadedFieldFromEffects() {
    var s, i, r, n;
    const e = ((i = (s = this.statuses) == null ? void 0 : s.has) == null ? void 0 : i.call(s, "overloaded")) ?? !1, t = !!((n = (r = this.system) == null ? void 0 : r.burn) != null && n.overloaded);
    e !== t && await this.update(
      { "system.burn.overloaded": e },
      { mwdSyncOverloadedFromEffect: !0 }
    );
  }
  /* -------------------------------------------- */
  /* Condition Monitors                            */
  /* -------------------------------------------- */
  async setMonitorValue(e, t, { source: s = "unknown" } = {}) {
    var d, m, h, g, b, p;
    if (e === "burn") {
      const f = Math.max(0, Number(t) || 0);
      return this.update({ "system.burn.value": f });
    }
    if (e === "armor" && this.isCharacterLike()) {
      const f = this.getPersonalCombatLoadout({ refresh: !0 }), w = ((d = f == null ? void 0 : f.activeArmor) == null ? void 0 : d.armorId) ?? ((m = f == null ? void 0 : f.activeArmor) == null ? void 0 : m.id) ?? null, M = w ? this.items.get(w) : null;
      if (!(M != null && M.id)) return null;
      const k = Math.max(0, Number(((h = M.system) == null ? void 0 : h.rating) ?? 0) || 0), R = Math.max(0, Number(((b = (g = M.system) == null ? void 0 : g.durability) == null ? void 0 : b.max) ?? 0) || 0), F = R > 0 ? R : k, I = Math.min(Math.max(0, Number(t) || 0), F);
      return this.updateEmbeddedDocuments("Item", [{
        _id: M.id,
        "system.durability.max": F,
        "system.durability.current": I
      }]);
    }
    const i = `system.monitors.${e}`, r = Number(foundry.utils.getProperty(this, `${i}.max`)) || 0, n = Math.max(0, r), o = Math.min(Math.max(0, Number(t) || 0), n), l = { [`${i}.value`]: o }, c = this.type, u = (p = li == null ? void 0 : li[c]) == null ? void 0 : p[e];
    if (u != null && u.derived)
      for (const [f, w] of Object.entries(u.derived)) {
        const M = Mi == null ? void 0 : Mi[w.fn];
        if (typeof M != "function") continue;
        const k = ac(this, e, w.source, o);
        l[`${i}.derived.${f}`] = M(k);
      }
    return this.update(l);
  }
  _prepareMonitors() {
    var n, o, l, c;
    const e = this.system.monitors ?? {}, t = ic(e);
    (n = this.system).derived ?? (n.derived = {}), this.system.derived.monitors = t;
    const s = Number(((o = t == null ? void 0 : t.physical) == null ? void 0 : o.penalty) ?? 0), i = Number(((l = t == null ? void 0 : t.fatigue) == null ? void 0 : l.penalty) ?? 0), r = s + i;
    (c = this.system.derived).condition ?? (c.condition = {}), this.system.derived.condition.physicalPenalty = s, this.system.derived.condition.fatiguePenalty = i, this.system.derived.condition.totalPenalty = r, this.system.derived.conditionPenalty = r;
  }
  _preparePersonalCombatDerived() {
    var n, o, l, c, u, d;
    if (!this.isCharacterLike()) return;
    const e = this.getPersonalCombatLoadout({ refresh: !0 }), t = (o = (n = this.system) == null ? void 0 : n.monitors) == null ? void 0 : o.armor;
    if (!t) return;
    const s = e.activeArmor, i = Math.max(0, Number(((l = s == null ? void 0 : s.durability) == null ? void 0 : l.max) ?? 0)), r = Math.max(0, Number((s == null ? void 0 : s.currentArmorRating) ?? ((c = s == null ? void 0 : s.durability) == null ? void 0 : c.current) ?? 0));
    t.max = i, t.value = Math.min(i, r), t.resistance = {
      default: Number((s == null ? void 0 : s.baseMitigation) ?? (s == null ? void 0 : s.baseResistance) ?? 0),
      byType: {}
    }, t.resistanceBonusByType = s != null && s.isDestroyed ? {} : (s == null ? void 0 : s.mitigationByType) ?? (s == null ? void 0 : s.typedMitigation) ?? {}, t.derived ?? (t.derived = {}), t.derived.resistance = Number((s == null ? void 0 : s.baseMitigation) ?? (s == null ? void 0 : s.baseResistance) ?? 0), t.effect = s != null && s.isDestroyed ? "Destroyed" : s ? rc(s.mitigationByType ?? s.typedMitigation) : "", (u = this.system).derived ?? (u.derived = {}), this.system.derived.personalCombat = {
      defaultWeaponId: ((d = e.defaultWeapon) == null ? void 0 : d.id) ?? null,
      activeArmorId: (s == null ? void 0 : s.id) ?? null,
      warnings: [...e.warnings ?? []]
    };
  }
}
async function oc({ actor: a, payload: e } = {}) {
  var p, f, w, M, k, R;
  if (!a) throw new Error("resolveSkill requires actor");
  const t = String((e == null ? void 0 : e.key) ?? "").trim(), s = ot(t);
  if (!s) throw new Error(`Unknown skill: ${t}`);
  const i = a.system ?? {}, r = String((e == null ? void 0 : e.attrKey) ?? s.attribute ?? "").trim();
  if (!r) throw new Error(`Skill ${t} missing attribute key`);
  const n = Number(((f = (p = i == null ? void 0 : i.attributes) == null ? void 0 : p[r]) == null ? void 0 : f.value) ?? 0), o = Number(((M = (w = i == null ? void 0 : i.skills) == null ? void 0 : w[t]) == null ? void 0 : M.rating) ?? 0), l = Number(((R = (k = i == null ? void 0 : i.skills) == null ? void 0 : k[t]) == null ? void 0 : R.bonus) ?? 0), c = new Set(ai(i, t)), u = la(t, e == null ? void 0 : e.specializationKey), d = u && c.has(u.key) ? u : null, m = d ? ra : 0, h = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : s.domains ?? [], g = Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : Number.isFinite(Number(e == null ? void 0 : e.target)) ? Number(e.target) : 5, b = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1;
  return {
    intent: "skill",
    rollType: "simple",
    title: `${s.label} (${r})`,
    subtitle: a.name ?? "Actor",
    domains: h,
    // Per-die threshold (cs>=X). Kept separate from dnHits.
    diceTarget: g,
    // DN = hits needed for success
    difficulty: { dn: b },
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
      label: `${r}+${s.label}`,
      specializationKey: (d == null ? void 0 : d.key) ?? "",
      specializationLabel: (d == null ? void 0 : d.label) ?? ""
    }
  };
}
const lc = /* @__PURE__ */ new Set([
  "grit",
  "chaos",
  "insight",
  "rumor",
  "legend",
  "credibility"
]), cc = {
  grit: "physical",
  chaos: "physical",
  insight: "mental",
  rumor: "mental",
  legend: "social",
  credibility: "social"
};
async function uc({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveEdge requires actor");
  const t = String((e == null ? void 0 : e.pool) ?? "").trim();
  if (!lc.has(t)) throw new Error(`Invalid edge pool: ${t}`);
  const s = a.getEdgePool(t), i = Math.max(0, Number((s == null ? void 0 : s.effectiveValue) ?? 0));
  return {
    intent: "edge",
    title: `Edge — ${t}`,
    subtitle: a.name ?? "Actor",
    domains: [cc[t] ?? "unknown"],
    // drop "edge" tag unless you truly want it
    // ✅ Make it directly rollable by the core roll pipeline
    target: 5,
    poolTotal: i,
    breakdown: [
      { id: "current", label: "Current", value: Number((s == null ? void 0 : s.value) ?? 0) },
      { id: "rating", label: "Rating", value: Number((s == null ? void 0 : s.rating) ?? 0) },
      { id: "cap", label: "Edge Cap", value: Number((s == null ? void 0 : s.cap) ?? 0) },
      { id: "usable", label: "Usable", value: i }
    ],
    data: { poolKey: t }
  };
}
async function dc({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Attribute",
    intent: "attribute",
    domainTags: ["general"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function mc({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveCommon requires actor");
  const t = String((e == null ? void 0 : e.id) ?? "").trim();
  if (!t) throw new Error("Common rolls require payload.id");
  const s = Dr(t);
  if (!s) throw new Error(`Unknown common check: ${t}`);
  const i = Array.isArray(s.formula) ? s.formula : [];
  if (i.length !== 2)
    throw new Error(`Common check ${t} must define exactly two attributes.`);
  const r = i.map((c) => {
    var d, m, h;
    const u = Oo(c);
    if (!u) throw new Error(`Common check ${t} uses unsupported attribute code: ${c}`);
    return {
      code: String(c).trim().toUpperCase(),
      key: u,
      label: _o(c),
      value: Number(((h = (m = (d = a.system) == null ? void 0 : d.attributes) == null ? void 0 : m[u]) == null ? void 0 : h.value) ?? 0)
    };
  }), n = r.reduce((c, u) => c + Number(u.value ?? 0), 0), o = Array.isArray(s.tags) ? [...s.tags] : [], l = Array.isArray(s.domains) ? [...s.domains] : [];
  return {
    intent: "common",
    rollType: "simple",
    title: String(s.label ?? (e == null ? void 0 : e.label) ?? t).trim() || t,
    subtitle: a.name ?? "Actor",
    domains: l,
    tags: o,
    formula: $o(i),
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
      label: String(s.label ?? (e == null ? void 0 : e.label) ?? t).trim() || t,
      formulaCodes: i,
      tags: o,
      attributes: r
    }
  };
}
function pc() {
  var a;
  return Array.from(((a = game.user) == null ? void 0 : a.targets) ?? []);
}
function hc(a) {
  var i, r, n, o;
  const e = (a == null ? void 0 : a.actor) ?? null;
  if (!e) return null;
  const t = ((i = e == null ? void 0 : e.getPersonalCombatLoadout) == null ? void 0 : i.call(e)) ?? null, s = (t == null ? void 0 : t.activeArmor) ?? null;
  return {
    tokenId: (a == null ? void 0 : a.id) ?? null,
    tokenUuid: ((r = a == null ? void 0 : a.document) == null ? void 0 : r.uuid) ?? null,
    actorId: e.id,
    actorUuid: e.uuid,
    name: e.name ?? (a == null ? void 0 : a.name) ?? "Target",
    activeArmor: s ? {
      armorId: s.id,
      rating: Number(s.ratingCurrent ?? s.rating ?? 0),
      currentArmorRating: Number(s.currentArmorRating ?? ((n = s.durability) == null ? void 0 : n.current) ?? 0),
      remainingDurability: Number(s.remainingDurability ?? ((o = s.durability) == null ? void 0 : o.current) ?? 0),
      baseMitigation: Number(s.baseMitigation ?? s.baseResistance ?? 0),
      baseResistance: Number(s.baseMitigation ?? s.baseResistance ?? 0),
      mitigationByType: { ...s.mitigationByType ?? s.typedMitigation ?? {} },
      tags: [...s.tags ?? []],
      isDestroyed: !!s.isDestroyed,
      defenseBonus: Number(s.defenseBonus ?? 0)
    } : null
  };
}
function fc(a, e) {
  var s, i, r, n, o, l;
  if (((s = e == null ? void 0 : e.syntheticWeapon) == null ? void 0 : s.id) === "unarmed")
    return {
      ...qe.DEFAULT_UNARMED,
      ...e.syntheticWeapon,
      isSynthetic: !0,
      defaultRangeBand: "close"
    };
  const t = ((r = (i = a.items) == null ? void 0 : i.get) == null ? void 0 : r.call(i, (e == null ? void 0 : e.weaponId) ?? "")) ?? null;
  if (!t || !(((n = t.isPersonalWeapon) == null ? void 0 : n.call(t)) ?? t.type === "personalWeapon") || !((o = t.system) != null && o.equipped))
    throw new Error("Attack requires an equipped personal weapon.");
  return ((l = t.getCombatProfile) == null ? void 0 : l.call(t, { payloadId: e == null ? void 0 : e.payloadId })) ?? null;
}
async function gc({ actor: a, payload: e } = {}) {
  var w, M, k, R, F, I, W, U, G, Y, D, Z, ue, ne;
  if (!a) throw new Error("resolveAttack requires actor");
  const t = fc(a, e);
  if (!t) throw new Error("Unable to resolve weapon profile.");
  const s = ot(t.skill) ?? {
    code: t.skill,
    label: t.skill || "Attack",
    attribute: "reflexes",
    domains: ["physical"]
  }, i = String(s.attribute ?? "reflexes").trim() || "reflexes", r = ((w = a.getAttributeValue) == null ? void 0 : w.call(a, i)) ?? Number(((R = (k = (M = a.system) == null ? void 0 : M.attributes) == null ? void 0 : k[i]) == null ? void 0 : R.value) ?? 0), n = ((F = a.getSkillRating) == null ? void 0 : F.call(a, t.skill)) ?? Number(((U = (W = (I = a.system) == null ? void 0 : I.skills) == null ? void 0 : W[t.skill]) == null ? void 0 : U.rating) ?? 0), o = Number(((D = (Y = (G = a.system) == null ? void 0 : G.skills) == null ? void 0 : Y[t.skill]) == null ? void 0 : D.bonus) ?? 0), l = new Set(ai(a.system ?? {}, t.skill)), c = la(t.skill, e == null ? void 0 : e.specializationKey), u = c && l.has(c.key) ? c : null, d = u ? ra : 0, m = Number(((Z = t == null ? void 0 : t.effects) == null ? void 0 : Z.accuracyMod) ?? 0) || 0, h = o + m, g = String((e == null ? void 0 : e.rangeBand) ?? t.defaultRangeBand ?? "close").trim() || "close", b = Number(((ue = t == null ? void 0 : t.attackRatingBand) == null ? void 0 : ue[g]) ?? 0) || 0, p = pc().map(hc).filter(Boolean), f = Number(t.ap ?? 0) + Number(((ne = t == null ? void 0 : t.effects) == null ? void 0 : ne.ap) ?? 0);
  return {
    intent: "attack",
    rollType: "simple",
    title: `${t.name} Attack`,
    subtitle: a.name ?? "Actor",
    domains: Array.isArray(s.domains) && s.domains.length ? s.domains : ["physical"],
    domainTags: ["combat", "attack"],
    diceTarget: Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : 5,
    difficulty: { dn: Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1 },
    edge: {
      earn: { enabled: !0, rate: 4, maxPerRoll: 1 }
    },
    pool: { attribute: r, skill: n, bonus: h, specialization: d },
    breakdown: [
      { id: "attribute", label: "Attribute", value: r },
      { id: "skill", label: s.label, value: n },
      { id: "bonus", label: "Skill Bonus", value: o },
      ...u ? [{
        id: "specialization",
        label: `Specialization (${u.label})`,
        value: d
      }] : [],
      { id: "weaponAccuracy", label: "Weapon Accuracy", value: m },
      { id: "damage", label: "Damage", value: Number(t.damage ?? 0) || 0 },
      { id: "ap", label: "AP", value: f },
      { id: "attackRating", label: `Attack Rating (${g})`, value: b }
    ],
    attack: {
      rangeBand: g,
      weapon: t,
      payload: (t == null ? void 0 : t.payload) ?? null,
      payloadState: (t == null ? void 0 : t.payloadState) ?? null,
      source: (t == null ? void 0 : t.source) ?? null,
      sourceState: (t == null ? void 0 : t.sourceState) ?? null,
      resolverKey: (t == null ? void 0 : t.resolverKey) ?? "standard",
      skill: {
        code: s.code ?? t.skill,
        label: s.label ?? t.skill,
        attribute: i,
        specialization: u ? {
          key: u.key,
          label: u.label,
          value: d
        } : null
      },
      targets: p,
      totalAp: f
    },
    specialization: u ? {
      key: u.key,
      label: u.label,
      value: d,
      skillKey: s.code ?? t.skill
    } : null
  };
}
async function yc({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Defense",
    intent: "defense",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function bc({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Resistance",
    intent: "resistance",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function Sc({ actor: a } = {}) {
  var s, i, r, n, o, l;
  const e = Number(((r = (i = (s = a.system) == null ? void 0 : s.attributes) == null ? void 0 : i.reflexes) == null ? void 0 : r.value) ?? 0), t = Number(((l = (o = (n = a.system) == null ? void 0 : n.attributes) == null ? void 0 : o.edge) == null ? void 0 : l.value) ?? 0);
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
async function wc({ actor: a }) {
  var s, i, r, n, o;
  const e = Number(((i = (s = a.system) == null ? void 0 : s.burn) == null ? void 0 : i.value) ?? 0);
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
const Ac = {
  skill: oc,
  edge: uc,
  attribute: dc,
  common: mc,
  attack: gc,
  defense: yc,
  resistance: bc,
  initiative: Sc,
  overload: wc
};
async function Ya({ actor: a, payload: e, event: t } = {}) {
  if (!a) throw new Error("resolveIntent requires actor");
  const s = String((e == null ? void 0 : e.intent) ?? "").trim();
  if (!s) throw new Error("resolveIntent requires payload.intent");
  const i = Ac[s];
  if (!i) throw new Error(`Unsupported roll intent: ${s}`);
  const r = await i({ actor: a, payload: e, event: t });
  return Tc(r, { intent: s });
}
function Tc(a, { intent: e } = {}) {
  (!a || typeof a != "object") && (a = {}), a.intent = a.intent ?? e ?? "unknown", a.title = String(a.title ?? "Roll"), a.domains = Array.isArray(a.domains) ? a.domains : [], a.breakdown = Array.isArray(a.breakdown) ? a.breakdown : [], a.mods = Array.isArray(a.mods) ? a.mods : [];
  const t = a.pool && typeof a.pool == "object" ? a.pool : {}, s = Number(t.attribute ?? t.base ?? 0), i = Number(t.skill ?? t.rating ?? 0), r = Number(t.bonus ?? 0), n = Number(t.specialization ?? 0);
  if (![s, i, r, n].every(Number.isFinite))
    throw console.error("MWD | Invalid pool parts after intent resolution", { intent: e, ctx: a }), new Error("MWD.roll: pool parts must be numeric (attribute/skill/bonus/specialization).");
  return a.pool = {
    attribute: s,
    skill: i,
    bonus: r,
    specialization: n,
    totalBase: s + i + r + n
  }, a.rollType = a.rollType ?? "simple", a.diceTarget = Number.isFinite(a.diceTarget) ? a.diceTarget : Number(a.target ?? 5), a.difficulty && typeof a.difficulty == "object" ? a.difficulty.dn = Number(a.difficulty.dn ?? 0) : Number.isFinite(a.dn) && (a.difficulty = { dn: Number(a.dn) }), a.breakdown.length || (a.breakdown = [
    { id: "attribute", label: "Attribute", value: s },
    { id: "skill", label: "Skill", value: i },
    { id: "bonus", label: "Bonus", value: r },
    ...n ? [{ id: "specialization", label: "Specialization", value: n }] : []
  ]), a;
}
var es;
class kc {
  constructor() {
    Se(this, es, /* @__PURE__ */ new Map());
  }
  register(e) {
    if (!(e != null && e.id) || typeof e.collect != "function")
      throw new Error("Invalid ModifierProvider: missing id or collect()");
    H(this, es).has(e.id) || H(this, es).set(e.id, e);
  }
  async collectAll(e) {
    const t = [];
    for (const s of H(this, es).values()) {
      const i = await s.collect(e);
      if (console.log("MWD | provider", s.id, "returned", i), !!(i != null && i.length))
        for (const r of i)
          r && typeof r.label == "string" && typeof r.value == "number" && typeof r.source == "string" ? t.push(r) : console.warn("MWD | DROPPED MOD (bad shape)", s.id, r);
    }
    return t;
  }
}
es = new WeakMap();
const xt = new kc();
function Mc(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function Pc(a) {
  const e = Mc(a == null ? void 0 : a.value);
  return e === null ? null : { ...a, value: e };
}
async function Ja({
  actor: a,
  rollType: e,
  skillId: t,
  domains: s,
  // NEW (optional)
  payload: i,
  resolved: r,
  context: n
} = {}) {
  const o = { actor: a, rollType: e, skillId: t, domains: s, payload: i, resolved: r, context: n }, l = await xt.collectAll(o);
  console.log("MWD|condition collect called", o.rollType);
  let c = [];
  for (const d of l ?? []) {
    const m = Pc(d);
    if (!m) {
      console.warn("MWD | Dropping invalid modifier value", d);
      continue;
    }
    c.push(m);
  }
  Array.isArray(s) && s.length && (c = c.filter((d) => !d.domain || s.includes(d.domain)));
  const u = c.reduce((d, m) => d + m.value, 0);
  return { mods: c, total: u };
}
function Ec({
  actor: a,
  payload: e,
  ctx: t,
  roll: s,
  target: i,
  pool: r,
  mods: n = [],
  modTotal: o = 0,
  hits: l = null,
  ones: c = null,
  edge: u = null,
  outcomeModel: d = null
} = {}) {
  var U, G, Y;
  if (!a) throw new Error("buildResolved requires actor");
  if (!(e != null && e.intent)) throw new Error("buildResolved requires payload.intent");
  if (!s) throw new Error("buildResolved requires roll");
  const m = foundry.utils.randomID(), h = (U = s.dice) == null ? void 0 : U[0], b = (Array.isArray(h == null ? void 0 : h.results) ? h.results : []).map((D, Z) => {
    const ue = `pool:${Z}`, ne = Number(D.result), me = !!D.success;
    return {
      ref: ue,
      face: ne,
      isSuccess: me,
      isFailure: !me,
      tooltip: me ? `Die ${Z + 1}: ${ne} (Success vs TN ${Number(i ?? 5)})` : `Die ${Z + 1}: ${ne} (Failure vs TN ${Number(i ?? 5)})`
    };
  }), p = b.filter((D) => D.isFailure).map((D) => D.ref), f = [{
    id: "pool",
    label: "Pool",
    faces: 6,
    termIndex: 0,
    // informational only
    dice: b
  }], w = (Array.isArray(n) ? n : []).map((D, Z) => {
    const ue = Number(D.value ?? 0), ne = `mod:${vc(D.label ?? "mod")}:${Z}`;
    return {
      id: D.id ?? ne,
      label: D.label ?? "Modifier",
      value: ue,
      domain: D.domain ?? null,
      source: D.source ?? null,
      tooltip: D.tooltip ?? `${D.label ?? "Modifier"} ${Qa(ue)}`
    };
  }), M = w.map((D) => D.id), R = (Array.isArray(t == null ? void 0 : t.breakdown) ? t.breakdown : []).map((D) => ({
    id: `pool.${D.id ?? foundry.utils.randomID()}`,
    label: D.label ?? D.id ?? "Row",
    value: Number(D.value ?? 0),
    tooltip: `Contribution from ${D.label ?? D.id}: ${Number(D.value ?? 0)}`
  }));
  R.push({
    id: "mods.total",
    label: "Mods",
    value: Number(o ?? 0),
    modIds: M,
    tooltip: w.length ? w.map((D) => `${D.label}: ${Qa(D.value)}`).join(`
`) : "No roll-time modifiers."
  }), R.push({
    id: "pool.final",
    label: "Final Pool",
    value: Number(r ?? 0),
    tooltip: `Final dice pool rolled: ${Number(r ?? 0)}d6`
  });
  const F = Number.isFinite(Number(l)) ? Number(l) : b.filter((D) => D.isSuccess).length, I = Number.isFinite(Number(c)) ? Number(c) : b.filter((D) => D.face === 1).length, W = Cc(u, { payload: e });
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
    // Minimal context snapshot so chat-actions can recompute interpretation
    // after post-spend rerolls mutate hits.
    ctxSnapshot: {
      rollType: (t == null ? void 0 : t.rollType) ?? "simple",
      difficulty: (t == null ? void 0 : t.difficulty) ?? null,
      opposed: (t == null ? void 0 : t.opposed) ?? null,
      net: (t == null ? void 0 : t.net) ?? null,
      edge: {
        pool: ((G = t == null ? void 0 : t.edge) == null ? void 0 : G.pool) ?? null,
        earn: ((Y = t == null ? void 0 : t.edge) == null ? void 0 : Y.earn) ?? null
      }
    },
    // Roll + dice
    roll: {
      json: s.toJSON(),
      formula: s.formula,
      target: Number(i ?? 5),
      pool: Number(r ?? 0),
      diceGroups: f,
      failureDiceRefs: p
    },
    // Outcome numbers
    outcome: {
      hits: F,
      ones: I
    },
    // New: engine-interpreted outcome (margin/net/converted/edgeEarned/etc
    outcomeModel: d,
    // Breakdown + modifiers
    breakdownRows: R,
    modifiers: {
      applied: w,
      total: Number(o ?? 0)
    },
    // Edge snapshot / affordances
    edge: W
  };
}
function Cc(a, { payload: e } = {}) {
  var g, b, p, f, w, M, k, R, F, I, W, U, G, Y;
  const t = !!((g = e == null ? void 0 : e.edge) != null && g.enabled), s = (a == null ? void 0 : a.domain) ?? null, i = (a == null ? void 0 : a.pools) ?? null, r = ((b = a == null ? void 0 : a.pre) == null ? void 0 : b.poolKey) ?? ((f = (p = e == null ? void 0 : e.edge) == null ? void 0 : p.pre) == null ? void 0 : f.poolKey) ?? (t ? ((w = e == null ? void 0 : e.edge) == null ? void 0 : w.poolKey) ?? null : null), n = Number(((M = a == null ? void 0 : a.pre) == null ? void 0 : M.spent) ?? ((R = (k = e == null ? void 0 : e.edge) == null ? void 0 : k.pre) == null ? void 0 : R.spent) ?? (t ? 1 : 0)) ? 1 : 0, o = ((F = a == null ? void 0 : a.post) == null ? void 0 : F.poolKey) ?? ((W = (I = e == null ? void 0 : e.edge) == null ? void 0 : I.post) == null ? void 0 : W.poolKey) ?? null, l = Number(((U = a == null ? void 0 : a.post) == null ? void 0 : U.spent) ?? ((Y = (G = e == null ? void 0 : e.edge) == null ? void 0 : G.post) == null ? void 0 : Y.spent) ?? 0) ? 1 : 0, c = (i == null ? void 0 : i.a) ?? null, u = (i == null ? void 0 : i.b) ?? null, d = [c, u].filter(Boolean);
  let m = [c, u].filter(Boolean);
  n && r && (m = m.filter((D) => D !== r));
  const h = {
    canSpendPre: d.length > 0 && !n,
    // spending pre after roll is not a thing
    canSpendPost: m.length > 0 && !l,
    canPostRerollFailures: m.length > 0 && !l
  };
  return {
    domain: s,
    pools: i ? { a: c, b: u } : null,
    pre: { poolKey: r, spent: n },
    post: { poolKey: o, spent: l },
    allowed: {
      prePools: d,
      postPools: m
    },
    availableActions: h
  };
}
function Qa(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function vc(a) {
  return String(a).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function Rc(a, e) {
  var c, u, d, m, h, g, b, p, f;
  const t = a ?? {}, s = Array.isArray((c = t == null ? void 0 : t.modifiers) == null ? void 0 : c.applied) ? t.modifiers.applied : [], i = Number(((u = t == null ? void 0 : t.modifiers) == null ? void 0 : u.total) ?? 0);
  if (s.length) {
    const w = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((M) => M.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${s.map((M) => `${M.label} ${Xa(M.value)}`).join(", ")} (Total ${Xa(i)})`,
      title: (w == null ? void 0 : w.tooltip) ?? ""
    });
  }
  const r = (t == null ? void 0 : t.edge) ?? null, n = Array.isArray((d = t == null ? void 0 : t.roll) == null ? void 0 : d.failureDiceRefs) ? t.roll.failureDiceRefs : [], o = !!((m = r == null ? void 0 : r.availableActions) != null && m.canPostRerollFailures), l = Array.isArray((h = r == null ? void 0 : r.allowed) == null ? void 0 : h.postPools) ? r.allowed.postPools : [];
  if (r != null && r.domain && (e.edge = {
    domain: r.domain,
    earned: ((g = t == null ? void 0 : t.outcomeModel) == null ? void 0 : g.edgeEarned) ?? null,
    preSpent: Number(((b = r == null ? void 0 : r.pre) == null ? void 0 : b.spent) ?? 0),
    postSpent: Number(((p = r == null ? void 0 : r.post) == null ? void 0 : p.spent) ?? 0),
    canPost: o && n.length > 0 && l.length > 0,
    failureCount: n.length,
    postPools: l
  }, e.metaRows.push({
    text: `Edge: ${r.domain} • pre ${e.edge.preSpent} • post ${e.edge.postSpent}`,
    title: ""
  })), (f = e.edge) != null && f.canPost) {
    e.footerRows.push({
      text: `Post-spend: Reroll ${e.edge.failureCount} failure${e.edge.failureCount === 1 ? "" : "s"}`
    });
    for (const w of e.edge.postPools)
      e.actions.push({
        action: "edgePostReroll",
        label: `Spend ${w}`,
        dataset: { "pool-key": w },
        cssClass: "mwd-edge-post"
      });
  }
}
function Xa(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function Nc(a, e) {
  var c;
  const t = a ?? {}, s = (t == null ? void 0 : t.outcomeModel) ?? {}, i = (s == null ? void 0 : s.net) ?? null;
  if (!i) return;
  e.net = i;
  const r = Number((i == null ? void 0 : i.converted) ?? 0), n = Number((i == null ? void 0 : i.value) ?? 0), o = Number((i == null ? void 0 : i.rate) ?? 4);
  e.metaRows.push({
    text: `Net: ${n} • Converted: ${r} • Rate: ${o}`,
    title: ""
  });
  const l = ((c = s == null ? void 0 : s.edgeEarned) == null ? void 0 : c.amount) > 0 ? s.edgeEarned : null;
  l && e.footerRows.push({
    text: `Edge Earned: +${l.amount}${l.pool ? ` (${l.pool})` : ""}`,
    title: l.reason ?? ""
  });
}
function Dc(a, e) {
  var l, c, u, d;
  const t = a ?? {}, s = (t == null ? void 0 : t.outcomeModel) ?? {}, i = Number(((l = s == null ? void 0 : s.attacker) == null ? void 0 : l.successes) ?? (s == null ? void 0 : s.attackerHits) ?? NaN), r = Number(((c = s == null ? void 0 : s.defender) == null ? void 0 : c.successes) ?? (s == null ? void 0 : s.defenderHits) ?? NaN), n = Number((s == null ? void 0 : s.netHits) ?? (s == null ? void 0 : s.net) ?? NaN);
  Number.isFinite(i) && Number.isFinite(r) && e.metaRows.push({ text: `Opposed: Att ${i} vs Def ${r} • Net ${Number.isFinite(n) ? n : i - r}` }), (u = t == null ? void 0 : t.incoming) != null && u.label && (e.incoming = { label: t.incoming.label, value: t.incoming.value ?? "" }, e.footerRows.push({ text: `Incoming: ${e.incoming.label} ${e.incoming.value}` }));
  const o = ((d = s == null ? void 0 : s.edgeEarned) == null ? void 0 : d.amount) > 0 ? s.edgeEarned : null;
  o && e.footerRows.push({ text: `Edge Earned: +${o.amount}${o.pool ? ` (${o.pool})` : ""}` });
}
function Ic(a, e) {
  var c;
  const t = a ?? {}, s = (t == null ? void 0 : t.outcomeModel) ?? {}, i = (s == null ? void 0 : s.extended) ?? null;
  if (!i) return;
  e.extended = i;
  const r = Number((i == null ? void 0 : i.progress) ?? 0), n = Number((i == null ? void 0 : i.target) ?? 0), o = Number((i == null ? void 0 : i.remaining) ?? Math.max(0, n - r));
  e.metaRows.push({
    text: `Extended: ${r}/${n} (Remaining ${o})`,
    title: ""
  }), i != null && i.completed && e.footerRows.push({ text: `Completed in ${Number((i == null ? void 0 : i.rounds) ?? (i == null ? void 0 : i.attempts) ?? 0) || "?"} attempts.` });
  const l = ((c = s == null ? void 0 : s.edgeEarned) == null ? void 0 : c.amount) > 0 ? s.edgeEarned : null;
  l && e.footerRows.push({ text: `Edge Earned: +${l.amount}${l.pool ? ` (${l.pool})` : ""}` });
}
const Oc = {
  skill: Rc,
  net: Nc,
  opposed: Dc,
  extended: Ic
  // defense: enhanceDefense,
  // edge: enhanceEdge,
};
async function sn({ resolved: a } = {}) {
  const e = a ?? {}, t = _c(e), s = Oc[t.intent];
  return typeof s == "function" && s(e, t), await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-roll-card",
    t
  );
}
function _c(a) {
  var h, g, b, p, f, w, M, k, R, F, I, W;
  const e = a ?? {}, t = Number(((h = e == null ? void 0 : e.roll) == null ? void 0 : h.target) ?? 5), s = Number(((b = (g = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : g.difficulty) == null ? void 0 : b.dn) ?? 0), i = Number(((p = e == null ? void 0 : e.roll) == null ? void 0 : p.pool) ?? 0), r = Number(((f = e == null ? void 0 : e.outcome) == null ? void 0 : f.hits) ?? 0), n = (e == null ? void 0 : e.outcomeModel) ?? {}, o = typeof n.passed == "boolean" ? n.passed : r >= s, l = Number.isFinite(Number(n.margin)) ? Number(n.margin) : r - s, c = n.tier ?? null, u = Array.isArray(e == null ? void 0 : e.breakdownRows) ? e.breakdownRows.map((U) => `${U.label}: ${U.value}`).join(`
`) : "", d = {
    header: { left: (e == null ? void 0 : e.title) ?? "Roll", right: (e == null ? void 0 : e.subtitle) ?? "" },
    formula: String((e == null ? void 0 : e.formula) ?? "").trim(),
    intent: (e == null ? void 0 : e.intent) ?? "unknown",
    domains: Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [],
    tn: t,
    dn: s,
    pool: i,
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
  if ((w = e == null ? void 0 : e.specialization) != null && w.label && d.metaRows.push({
    text: `Specialization: ${e.specialization.label} (+${Number(e.specialization.value ?? 0)})`,
    title: ""
  }), (M = m == null ? void 0 : m.weapon) != null && M.name) {
    const U = String((m == null ? void 0 : m.rangeBand) ?? "").trim(), G = String(((k = m == null ? void 0 : m.weapon) == null ? void 0 : k.damageTypeLabel) ?? ((R = m == null ? void 0 : m.weapon) == null ? void 0 : R.damageType) ?? "").trim(), Y = String(((F = m == null ? void 0 : m.payload) == null ? void 0 : F.label) ?? ((I = m == null ? void 0 : m.weapon) == null ? void 0 : I.payloadLabel) ?? "").trim();
    d.metaRows.push({
      text: `Weapon: ${m.weapon.name}${U ? ` • Range: ${U}` : ""}${G ? ` • Type: ${G}` : ""}${Y ? ` • Payload: ${Y}` : ""}`,
      title: ""
    }), (W = m == null ? void 0 : m.sourceState) != null && W.isTracked && d.footerRows.push({
      text: `Source: ${Number(m.sourceState.current ?? 0)}/${Number(m.sourceState.max ?? 0)}`,
      title: ""
    });
  }
  return d;
}
function he(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
function Pi(a, e = 0, t = Number.POSITIVE_INFINITY) {
  const s = he(a, e);
  return Math.max(e, Math.min(t, s));
}
function an(a, e = 1) {
  var s;
  const t = he((s = a == null ? void 0 : a.difficulty) == null ? void 0 : s.dn, he(e, 1));
  return Math.max(0, t);
}
function $c(a, e) {
  return Math.max(0, he(a, 0) - he(e, 0));
}
function Lc({ convert: a, remainder: e, rate: t = 4 } = {}) {
  const s = Math.max(0, he(e, 0)), i = Math.max(1, he(t, 4)), r = Math.max(0, he(a, 0)), n = Math.floor(r / i) * i;
  return Math.min(s, n);
}
function ha(a, { rate: e = 4, maxPerRoll: t = Number.POSITIVE_INFINITY } = {}) {
  const s = Math.max(1, he(e, 4)), i = Math.floor(Math.max(0, he(a, 0)) / s), r = Number.isFinite(t) ? Math.max(0, he(t, 0)) : Number.POSITIVE_INFINITY;
  return { amount: Math.min(i, r), rate: s };
}
function fa(a) {
  var s;
  const e = ((s = a == null ? void 0 : a.edge) == null ? void 0 : s.earn) ?? {};
  return {
    enabled: !!(e != null && e.enabled),
    rate: Math.max(1, he(e == null ? void 0 : e.rate, 4)),
    maxPerRoll: (e == null ? void 0 : e.maxPerRoll) ?? Number.POSITIVE_INFINITY
  };
}
function Qs(a) {
  var t;
  const e = (t = a == null ? void 0 : a.edge) == null ? void 0 : t.pool;
  return e ? String(e) : null;
}
function xc(a) {
  let e = 0, t = 0;
  const s = (i) => {
    if (!i) return;
    const r = i == null ? void 0 : i.results;
    if (Array.isArray(r))
      for (const o of r) {
        if ((o == null ? void 0 : o.active) === !1) continue;
        const l = Number(o == null ? void 0 : o.result);
        Number.isFinite(l) && (e += 1, l === 1 && (t += 1));
      }
    const n = i == null ? void 0 : i.terms;
    if (Array.isArray(n))
      for (const o of n) s(o);
    if (Array.isArray(i))
      for (const o of i) s(o);
  };
  return s(a), { dice: e, ones: t };
}
function rn(a, e) {
  if (he(a, 0) !== 0) return !1;
  const { dice: t, ones: s } = xc(e);
  return t <= 0 ? !1 : s >= Math.ceil(t / 2);
}
function Fc(a, e, t = 4) {
  return !!(a && he(e, 0) >= he(t, 4));
}
function Za(a, e) {
  const t = he(e == null ? void 0 : e.successes, 0), s = an(a, 1), i = t >= s, r = t - s, n = Fc(i, r, 4), o = rn(t, e == null ? void 0 : e.raw), l = fa(a), c = l.maxPerRoll ?? 1, u = l.enabled && r >= l.rate ? (() => {
    const { amount: m, rate: h } = ha(r, { rate: l.rate, maxPerRoll: c }), g = Qs(a);
    return m > 0 ? { amount: m, pool: g, reason: "net4", details: { margin: r, rate: h } } : null;
  })() : null;
  return {
    rollType: "simple",
    passed: i,
    successes: t,
    difficulty: { dn: s },
    margin: r,
    criticalSuccess: n,
    criticalFailure: o,
    tier: n ? "criticalSuccess" : o ? "criticalFailure" : i ? "success" : "failure",
    edgeEarned: u
  };
}
function Bc(a, e, t) {
  var m, h;
  const s = he(e == null ? void 0 : e.successes, 0), i = he(t == null ? void 0 : t.successes, 0), r = !!((m = a == null ? void 0 : a.opposed) != null && m.net), n = String(((h = a == null ? void 0 : a.opposed) == null ? void 0 : h.dnTies) ?? "stalemate");
  let o = null, l = !1;
  r ? (o = s - i, o > 0 ? l = !0 : o < 0 ? l = !1 : n === "attackerWins" ? l = !0 : l = !1) : s > i ? l = !0 : s < i ? l = !1 : n === "attackerWins" ? l = !0 : l = !1;
  const c = fa(a), u = c.maxPerRoll ?? 1, d = c.enabled && r && typeof o == "number" && o >= c.rate ? (() => {
    const { amount: g, rate: b } = ha(o, { rate: c.rate, maxPerRoll: u }), p = Qs(a);
    return g > 0 ? { amount: g, pool: p, reason: "net4", details: { netHits: o, rate: b } } : null;
  })() : null;
  return {
    rollType: "opposed",
    passed: l,
    successes: s,
    opposed: {
      attacker: s,
      defender: i,
      netEnabled: r,
      netHits: r ? o : void 0,
      tiePolicy: n
    },
    edgeEarned: d
  };
}
function zc(a, e) {
  var b, p, f;
  const t = he(e == null ? void 0 : e.successes, 0), s = an(a, 1), i = t >= s, r = rn(t, e == null ? void 0 : e.raw), n = $c(t, s), o = ((b = a == null ? void 0 : a.net) == null ? void 0 : b.convert) ?? ((p = a == null ? void 0 : a.allocation) == null ? void 0 : p.convert) ?? 0, l = fa(a), c = l.rate, u = Lc({ convert: o, remainder: n, rate: c }), d = n - u, m = l.enabled && u >= c ? (() => {
    const { amount: w } = ha(u, { rate: c, maxPerRoll: l.maxPerRoll }), M = Qs(a);
    return w > 0 ? { amount: w, pool: M, reason: "convert4", details: { converted: u, rate: c } } : null;
  })() : null, h = r ? { amount: 1, pool: Qs(a), reason: "critFail", details: { onesRule: "halfOrMoreOnes" } } : null, g = [];
  return m && g.push(m), h && g.push(h), g.length === 0 || (g.length === 1 ? g[0] : (g.reduce((w, M) => w + (Number(M == null ? void 0 : M.amount) || 0), 0), (f = g[0]) == null || f.pool)), {
    rollType: "net",
    passed: i,
    successes: t,
    difficulty: { dn: s },
    criticalFailure: r,
    tier: r ? "criticalFailure" : i ? "success" : "failure",
    net: {
      remainder: n,
      convertRequested: he(o, 0),
      converted: u,
      value: d,
      // the actual net effect magnitude you apply (+net dice, etc.)
      rate: c,
      canConvert: n >= c
    },
    edgeEarned: m
  };
}
function Hc(a, e) {
  var o, l, c, u;
  const t = he(e == null ? void 0 : e.successes, 0), s = Pi((o = a == null ? void 0 : a.extended) == null ? void 0 : o.target, 1, 1e4), i = Pi((l = a == null ? void 0 : a.extended) == null ? void 0 : l.accumulated, 0, 1e4), r = Pi(i + t, 0, 1e4), n = r >= s;
  return {
    rollType: "extended",
    passed: n,
    successes: t,
    extended: {
      target: s,
      accumulated: i,
      nextAccumulated: r,
      remaining: Math.max(0, s - r),
      completed: n,
      interval: ((c = a == null ? void 0 : a.extended) == null ? void 0 : c.interval) ?? null,
      failureLimit: ((u = a == null ? void 0 : a.extended) == null ? void 0 : u.failureLimit) ?? null
    },
    // NOTE: Edge earn rules for extended are intentionally omitted per your earlier constraint.
    edgeEarned: null
  };
}
function Wc(a, e, t = null) {
  var i;
  switch (String((a == null ? void 0 : a.rollType) ?? "simple")) {
    case "simple":
      return Za(a, e);
    case "opposed":
      return Bc(a, e, t);
    case "net":
      return zc(a, e);
    case "extended":
      return Hc(a, e);
    default: {
      const r = {
        ...a,
        difficulty: { dn: Number(((i = a == null ? void 0 : a.difficulty) == null ? void 0 : i.dn) ?? 1) || 1 }
      };
      return Za(r, e);
    }
  }
}
const { ApplicationV2: Uc, HandlebarsApplicationMixin: jc } = foundry.applications.api;
function Vc(a, e = -3, t = 3) {
  const s = [], i = "../img/dice";
  for (let r = e; r <= t; r++) {
    const n = Math.abs(r), o = n === 0 ? `${i}/BlankDice.webp` : `${i}/D6_${n}.svg`;
    s.push({
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
  return s;
}
function er(a) {
  return (Array.isArray(a) ? a : []).map((t) => ({
    id: (t == null ? void 0 : t.id) ?? foundry.utils.randomID(),
    label: typeof (t == null ? void 0 : t.label) == "string" ? t.label : "Manual",
    value: Number((t == null ? void 0 : t.value) ?? 0)
  }));
}
function Ei(a, e) {
  const t = a == null ? void 0 : a.toggles;
  return t && typeof t == "object" && e in t ? !!t[e] : !!(a != null && a[e]);
}
function Gc(a, e) {
  a.useEdge = !!e.useEdge, a.takeRisks = !!e.takeRisks, a.opponentRoll = !!e.opponentRoll, a.toggles = a.toggles && typeof a.toggles == "object" ? a.toggles : {}, a.toggles.useEdge = !!e.useEdge, a.toggles.takeRisks = !!e.takeRisks, a.toggles.opponentRoll = !!e.opponentRoll;
}
function tr(a, e, t) {
  const s = String(t ?? "").trim(), i = s ? to(e, s) : "";
  if (s && i) {
    a.specializationKey = s, a.specializationLabel = i;
    return;
  }
  delete a.specializationKey, delete a.specializationLabel;
}
function qc(a) {
  const e = Array.isArray(a == null ? void 0 : a.breakdown) ? a.breakdown : [], t = (s) => {
    var i;
    return Number(((i = e.find((r) => (r == null ? void 0 : r.id) === s)) == null ? void 0 : i.value) ?? 0);
  };
  return {
    attribute: t("attribute"),
    skill: t("skill"),
    bonus: t("bonus"),
    specialization: t("specialization")
  };
}
var Fe;
const ye = class ye extends jc(Uc) {
  constructor({ actor: t, baseContext: s, initialState: i = null, options: r = {} }) {
    var c, u;
    super(r);
    Se(this, Fe, null);
    /** @type {{ baseContext: any, state: any }} */
    C(this, "_mwd", { baseContext: null, state: null });
    this.actor = t, this._mwd.baseContext = s ?? {};
    const n = foundry.utils.deepClone(this._mwd.baseContext.payload ?? {}), o = er(n.manualModifiers);
    this._mwd.state = foundry.utils.mergeObject(
      {
        payload: n,
        manual: o,
        toggles: {
          useEdge: Ei(n, "useEdge"),
          takeRisks: Ei(n, "takeRisks"),
          opponentRoll: Ei(n, "opponentRoll")
        }
      },
      i ?? {},
      { inplace: !1, insertKeys: !0, insertValues: !0, overwrite: !0 }
    );
    const l = String(((u = (c = n == null ? void 0 : n.edge) == null ? void 0 : c.pre) == null ? void 0 : u.poolKey) ?? "").trim() || null;
    this._mwd.state.edge = {
      prePoolKey: l
    };
  }
  async wait() {
    return new Promise((t) => {
      Ee(this, Fe, t), this.render(!0);
    });
  }
  async close(t = {}) {
    if (H(this, Fe)) {
      const s = H(this, Fe);
      Ee(this, Fe, null), s(null);
    }
    return super.close(t);
  }
  /* --------------------------- */
  /* Prepare Context             */
  /* --------------------------- */
  async _prepareContext(t) {
    var U, G, Y, D, Z, ue, ne, me, He, We, ct, ut, dt, mt, pt, ht, ft, gt, yt, bt, St, wt, At, Tt, kt, A, v, j, ie, pe, Te, ke, O, X, Le, Pe, xe;
    const s = this._mwd.baseContext ?? {}, i = this._mwd.state ?? {}, r = Number.isFinite(Number((U = i == null ? void 0 : i.payload) == null ? void 0 : U.dn)) ? Number(i.payload.dn) : Number.isFinite(Number(s == null ? void 0 : s.dn)) ? Number(s.dn) : Number.isFinite(Number((Y = (G = s == null ? void 0 : s.resolved) == null ? void 0 : G.difficulty) == null ? void 0 : Y.dn)) ? Number(s.resolved.difficulty.dn) : 1, n = (s == null ? void 0 : s.intent) ?? "skill";
    let o, l;
    const c = Array.isArray(i.manual) ? i.manual.reduce((z, ae) => z + Number((ae == null ? void 0 : ae.value) || 0), 0) : 0;
    if (n === "edge") {
      const z = (s == null ? void 0 : s.resolved) ?? {}, ae = Array.isArray(z.breakdown) ? z.breakdown : [], Mt = (It) => {
        var ls;
        return Number(((ls = ae.find((Rs) => Rs.id === It)) == null ? void 0 : ls.value) ?? 0);
      }, Pt = Number(((D = z == null ? void 0 : z.pool) == null ? void 0 : D.attribute) ?? 0);
      o = {
        pool: Pt,
        rating: Mt("rating"),
        cap: Mt("cap"),
        modifiers: Number(((Z = s == null ? void 0 : s.dice) == null ? void 0 : Z.modifiers) ?? 0)
      }, l = Math.max(0, Pt + o.modifiers + c);
    } else {
      o = {
        attribute: Number(((ue = s == null ? void 0 : s.dice) == null ? void 0 : ue.attribute) ?? 0),
        skill: Number(((ne = s == null ? void 0 : s.dice) == null ? void 0 : ne.skill) ?? 0),
        bonus: Number(((me = s == null ? void 0 : s.dice) == null ? void 0 : me.bonus) ?? 0),
        specialization: Number(((He = s == null ? void 0 : s.dice) == null ? void 0 : He.specialization) ?? 0),
        modifiers: Number(((We = s == null ? void 0 : s.dice) == null ? void 0 : We.modifiers) ?? 0)
      };
      const z = o.modifiers + c, ae = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, ae + z);
    }
    const u = Array.isArray((ct = s == null ? void 0 : s.resolved) == null ? void 0 : ct.domains) ? s.resolved.domains : [], d = u.includes("physical") ? "physical" : u.includes("mental") ? "mental" : u.includes("social") ? "social" : null, h = (d === "physical" ? ["grit", "chaos"] : d === "mental" ? ["insight", "rumor"] : d === "social" ? ["legend", "credibility"] : []).map((z) => {
      var ae, Mt, Pt, It;
      return {
        key: z,
        label: z.charAt(0).toUpperCase() + z.slice(1),
        available: Number(((Pt = (Mt = (ae = this.actor) == null ? void 0 : ae.getEdgePool) == null ? void 0 : Mt.call(ae, z)) == null ? void 0 : Pt.effectiveValue) ?? 0),
        selected: z === (((It = i.edge) == null ? void 0 : It.prePoolKey) ?? null)
      };
    }), g = h.find((z) => z.selected), b = (g == null ? void 0 : g.label) ?? null, p = ((ut = s == null ? void 0 : s.resolved) == null ? void 0 : ut.attack) ?? null, f = String(
      ((dt = p == null ? void 0 : p.skill) == null ? void 0 : dt.code) ?? ((pt = (mt = s == null ? void 0 : s.resolved) == null ? void 0 : mt.specialization) == null ? void 0 : pt.skillKey) ?? ((ft = (ht = s == null ? void 0 : s.resolved) == null ? void 0 : ht.data) == null ? void 0 : ft.skillKey) ?? ((gt = s == null ? void 0 : s.payload) == null ? void 0 : gt.key) ?? ""
    ).trim(), w = f ? Pr(((yt = this.actor) == null ? void 0 : yt.system) ?? {}, f) : [], M = String(((bt = i == null ? void 0 : i.payload) == null ? void 0 : bt.specializationKey) ?? "").trim(), k = w.find((z) => z.key === M) ?? null;
    if (n !== "edge") {
      o.specialization = k ? Number(((wt = (St = s == null ? void 0 : s.resolved) == null ? void 0 : St.specialization) == null ? void 0 : wt.value) ?? 2) : 0;
      const z = o.modifiers + c, ae = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, ae + z);
    }
    const R = Array.isArray((At = p == null ? void 0 : p.payloadState) == null ? void 0 : At.payloads) ? p.payloadState.payloads : [], F = String(((Tt = p == null ? void 0 : p.weapon) == null ? void 0 : Tt.category) ?? "").trim().toLowerCase() !== "melee" && R.length > 0, I = String(((kt = i == null ? void 0 : i.payload) == null ? void 0 : kt.payloadId) ?? ((A = p == null ? void 0 : p.payloadState) == null ? void 0 : A.activePayloadId) ?? "").trim(), W = R.find((z) => z.id === I) ?? null;
    return {
      header: {
        left: ((v = s == null ? void 0 : s.header) == null ? void 0 : v.left) ?? "Roll",
        right: ((j = s == null ? void 0 : s.header) == null ? void 0 : j.right) ?? ((ie = this.actor) == null ? void 0 : ie.name) ?? ""
      },
      formula: String((s == null ? void 0 : s.formula) ?? ((pe = s == null ? void 0 : s.resolved) == null ? void 0 : pe.formula) ?? "").trim(),
      dice: o,
      modifiers: Array.isArray(s.modifiers) ? s.modifiers : [],
      manual: (i.manual ?? []).map((z) => ({
        ...z,
        steps: Vc(Number(z.value ?? 0), -3, 3)
      })),
      edge: {
        domain: d,
        choices: h,
        selectedLabel: b
      },
      toggles: n === "edge" ? { useEdge: !1, takeRisks: !1, opponentRoll: !1 } : i.toggles,
      totalPool: l,
      intent: n,
      dn: r,
      specialization: w.length ? {
        skillCode: f,
        options: w.map((z) => ({
          key: z.key,
          label: z.label,
          selected: z.key === M
        })),
        selectedKey: M,
        selectedLabel: (k == null ? void 0 : k.label) ?? ""
      } : null,
      attack: p ? {
        weaponName: ((Te = p == null ? void 0 : p.weapon) == null ? void 0 : Te.name) ?? "Weapon",
        rangeBand: (p == null ? void 0 : p.rangeBand) ?? "",
        damageType: ((ke = W == null ? void 0 : W.modifies) == null ? void 0 : ke.damageType) || ((O = p == null ? void 0 : p.weapon) == null ? void 0 : O.damageTypeLabel) || ((X = p == null ? void 0 : p.weapon) == null ? void 0 : X.damageType) || "",
        usesPayloads: F,
        source: (p == null ? void 0 : p.sourceState) ?? null,
        payloads: R.map((z) => {
          var ae;
          return {
            id: z.id,
            name: z.label,
            damageType: (ae = z.modifies) == null ? void 0 : ae.damageType,
            selected: z.id === I
          };
        }),
        selectedPayloadId: I,
        selectedPayloadLabel: (W == null ? void 0 : W.label) ?? ((Le = p == null ? void 0 : p.payload) == null ? void 0 : Le.label) ?? ((Pe = p == null ? void 0 : p.weapon) == null ? void 0 : Pe.payloadLabel) ?? "",
        selectedSourceLabel: ((xe = p == null ? void 0 : p.sourceState) == null ? void 0 : xe.label) ?? ""
      } : null
    };
  }
  /* --------------------------- */
  /* Actions                     */
  /* --------------------------- */
  async _onCancel(t) {
    if (t == null || t.preventDefault(), H(this, Fe)) {
      const s = H(this, Fe);
      Ee(this, Fe, null), s(null);
    }
    return this.close();
  }
  async _onSubmit(t) {
    var i, r, n, o, l, c, u, d, m, h, g, b, p;
    t == null || t.preventDefault();
    const s = this._mwd.state;
    if (s.payload.manualModifiers = (s.manual ?? []).filter((f) => {
      var w;
      return f && (((w = f.label) == null ? void 0 : w.trim()) || Number(f.value));
    }).map((f) => {
      var w;
      return {
        id: f.id,
        label: ((w = f.label) == null ? void 0 : w.trim()) || "Manual",
        value: Number(f.value ?? 0)
      };
    }), Gc(s.payload, s.toggles ?? {}), tr(
      s.payload,
      ((i = s.payload) == null ? void 0 : i.intent) === "attack" ? ((r = s.payload) == null ? void 0 : r.skillKey) ?? ((c = (l = (o = (n = this._mwd.baseContext) == null ? void 0 : n.resolved) == null ? void 0 : o.attack) == null ? void 0 : l.skill) == null ? void 0 : c.code) : ((u = s.payload) == null ? void 0 : u.key) ?? ((h = (m = (d = this._mwd.baseContext) == null ? void 0 : d.resolved) == null ? void 0 : m.data) == null ? void 0 : h.skillKey),
      (g = s.payload) == null ? void 0 : g.specializationKey
    ), H(this, Fe)) {
      const f = H(this, Fe);
      Ee(this, Fe, null), f({ payload: s.payload });
    }
    if (s.payload.edge = s.payload.edge && typeof s.payload.edge == "object" ? s.payload.edge : {}, s.payload.edge.pre = s.payload.edge.pre && typeof s.payload.edge.pre == "object" ? s.payload.edge.pre : {}, (b = s.toggles) != null && b.useEdge) {
      const f = String(((p = s.edge) == null ? void 0 : p.prePoolKey) ?? "").trim() || null;
      s.payload.edge.pre.poolKey = f, s.payload.edge.pre.spent = f ? 1 : 0;
    } else
      s.payload.edge.pre.poolKey = null, s.payload.edge.pre.spent = 0;
    return this.close();
  }
  async _onAddManual(t) {
    return t == null || t.preventDefault(), this._mwd.state.manual.push({
      id: foundry.utils.randomID(),
      label: "Manual",
      value: 0
    }), this.render(!1);
  }
  async _onRemoveManual(t, s) {
    var r;
    t == null || t.preventDefault();
    const i = (r = s == null ? void 0 : s.dataset) == null ? void 0 : r.id;
    if (i)
      return this._mwd.state.manual = this._mwd.state.manual.filter((n) => n.id !== i), this.render(!1);
  }
  async _onSetManualValue(t, s) {
    var o, l;
    t == null || t.preventDefault();
    const i = (o = s == null ? void 0 : s.dataset) == null ? void 0 : o.id, r = (l = s == null ? void 0 : s.dataset) == null ? void 0 : l.field;
    if (!i || !r) return;
    const n = this._mwd.state.manual.find((c) => c.id === i);
    if (n)
      return r === "label" && (n.label = String(s.value ?? "")), r === "value" && (n.value = Number(s.value ?? 0)), this.render(!1);
  }
  async _onSetManualStepper(t, s) {
    var o, l;
    t == null || t.preventDefault();
    const i = (o = s == null ? void 0 : s.dataset) == null ? void 0 : o.id, r = Number((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.value);
    if (!i || Number.isNaN(r)) return;
    const n = this._mwd.state.manual.find((c) => c.id === i);
    if (n)
      return n.value = r, this.render(!1);
  }
  async _onSetEdgePrePool(t, s) {
    var r;
    t == null || t.preventDefault();
    const i = String(((r = s == null ? void 0 : s.dataset) == null ? void 0 : r.poolKey) ?? "").trim();
    if (i)
      return this._mwd.state.edge = this._mwd.state.edge ?? {}, this._mwd.state.edge.prePoolKey = i, this._mwd.state.toggles.useEdge = !0, this.render(!1);
  }
  async _onToggleCheckbox(t, s) {
    var r;
    t == null || t.preventDefault();
    const i = (r = s == null ? void 0 : s.dataset) == null ? void 0 : r.key;
    if (i)
      return this._mwd.state.toggles[i] = !!s.checked, this.render(!1);
  }
  async _onSetDn(t, s) {
    t == null || t.preventDefault();
    const i = String((s == null ? void 0 : s.value) ?? "").trim(), r = i === "" ? null : Number(i);
    return this._mwd.state.payload.dn = Number.isFinite(r) ? Math.max(0, Math.trunc(r)) : null, this.render(!1);
  }
  async _onSetPayload(t, s) {
    return t == null || t.preventDefault(), this._mwd.state.payload.payloadId = String((s == null ? void 0 : s.value) ?? "").trim(), this.render(!1);
  }
  async _onSetSpecialization(t, s) {
    var n;
    t == null || t.preventDefault();
    const i = String(((n = s == null ? void 0 : s.dataset) == null ? void 0 : n.skillCode) ?? "").trim(), r = String((s == null ? void 0 : s.value) ?? "").trim();
    if (i)
      return tr(this._mwd.state.payload, i, r), this.render(!1);
  }
  _onRender(t, s) {
    var r, n;
    (r = super._onRender) == null || r.call(this, t, s);
    const i = this.element instanceof HTMLElement ? this.element : (n = this.element) == null ? void 0 : n[0];
    i && (i.querySelectorAll("[data-action='setPayload']").forEach((o) => {
      o.addEventListener("change", (l) => {
        this._onSetPayload(l, l.currentTarget);
      });
    }), i.querySelectorAll("[data-action='setSpecialization']").forEach((o) => {
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
  static async prompt({ actor: t, basePayload: s, resolved: i, diceParts: r = null, mods: n = [], modTotal: o = 0 } = {}) {
    var b;
    const l = foundry.utils.deepClone(s ?? {});
    try {
      if (((i == null ? void 0 : i.rollType) ?? "simple") === "simple" && (l == null ? void 0 : l.dn) == null) {
        const f = Number(game.settings.get(game.system.id, "gmNextDn"));
        Number.isFinite(f) && (l.dn = Math.max(0, Math.trunc(f)));
      }
    } catch (p) {
      console.warn("MWD: failed to default DN from GM Gadget", p);
    }
    const c = {
      left: (i == null ? void 0 : i.title) ?? "Roll",
      right: (t == null ? void 0 : t.name) ?? ""
    }, u = r ?? qc(i), d = {
      attribute: Number((u == null ? void 0 : u.attribute) ?? 0),
      skill: Number((u == null ? void 0 : u.skill) ?? 0),
      bonus: Number((u == null ? void 0 : u.bonus) ?? 0),
      specialization: Number((u == null ? void 0 : u.specialization) ?? 0),
      modifiers: Number(o ?? 0)
    }, m = (Array.isArray(n) ? n : []).map((p) => ({
      label: p.label ?? "Modifier",
      source: p.source ?? "",
      value: Number(p.value ?? 0)
    }));
    l.manualModifiers = er(l.manualModifiers);
    const g = await new ye({
      actor: t,
      baseContext: {
        intent: (i == null ? void 0 : i.intent) ?? "skill",
        header: c,
        formula: String((i == null ? void 0 : i.formula) ?? "").trim(),
        dice: d,
        modifiers: m,
        payload: l,
        resolved: i,
        // keep full resolved for edge display
        dn: Number((l == null ? void 0 : l.dn) ?? ((b = i == null ? void 0 : i.difficulty) == null ? void 0 : b.dn) ?? 1)
      }
    }).wait();
    return (g == null ? void 0 : g.payload) ?? null;
  }
};
Fe = new WeakMap(), C(ye, "DEFAULT_OPTIONS", foundry.utils.mergeObject(
  Gt(ye, ye, "DEFAULT_OPTIONS"),
  {
    id: "mwd-roll-dialog",
    classes: [
      ...Gt(ye, ye, "DEFAULT_OPTIONS").classes ?? [],
      "mwd",
      "mwd-roll-dialog"
    ],
    window: { title: "Roll", resizable: !1 },
    position: { width: 520, height: "auto" },
    actions: {
      submit: ye.prototype._onSubmit,
      cancel: ye.prototype._onCancel,
      addManual: ye.prototype._onAddManual,
      removeManual: ye.prototype._onRemoveManual,
      setManualValue: ye.prototype._onSetManualValue,
      setManualStepper: ye.prototype._onSetManualStepper,
      setEdgePrePool: ye.prototype._onSetEdgePrePool,
      toggleCheckbox: ye.prototype._onToggleCheckbox,
      setDn: ye.prototype._onSetDn,
      setPayload: ye.prototype._onSetPayload,
      setSpecialization: ye.prototype._onSetSpecialization
    }
  },
  { inplace: !1 }
)), C(ye, "PARTS", {
  body: { template: "systems/mwd/templates/v2/roll/mwd-roll-dialog.hbs" }
});
let ea = ye;
const { ApplicationV2: Kc, HandlebarsApplicationMixin: Yc } = foundry.applications.api, Ts = class Ts extends Yc(Kc) {
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
    const s = {
      id: `select-item-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Ts.DEFAULT_OPTIONS.classes],
      window: { title: e }
    };
    return new Ts({ items: t }, s).wait();
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
    const s = $(t);
    s.find(".click-select-item").click((i) => this.onSelectItem(i)), s.find('[data-action="cancel"]').on("click", async () => {
      if (this._resolve) {
        const i = this._resolve;
        this._resolve = null, i(null);
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
    const t = $(e.currentTarget).attr("data-item-id"), s = this.items.find((i) => i.id === t) ?? null;
    if (this._selected = !0, this._resolve) {
      const i = this._resolve;
      this._resolve = null, i(s);
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
C(Ts, "PARTS", {
  body: {
    template: `${x}/dialog/select-item.hbs`
  }
});
let ta = Ts;
const sr = { execute: tu }, Jc = {
  physical: ["grit", "chaos"],
  mental: ["insight", "rumor"],
  social: ["legend", "credibility"]
};
function Qc(a, e) {
  var r;
  const t = Jc[e] ?? [];
  let s = null, i = -1;
  for (const n of t) {
    const o = (r = a.getEdgePool) == null ? void 0 : r.call(a, n), l = Number((o == null ? void 0 : o.rating) ?? 0), c = Number((o == null ? void 0 : o.value) ?? 0), u = Math.max(0, l - c);
    u > i && (i = u, s = n);
  }
  return s ?? t[0] ?? null;
}
function Xc(a) {
  const t = (Array.isArray(a == null ? void 0 : a.manualModifiers) ? a.manualModifiers : []).map((i) => ({
    id: i.id ?? foundry.utils.randomID(),
    label: (i.label ?? "Manual").trim() || "Manual",
    value: Number(i.value ?? 0),
    source: "Manual"
  })).filter((i) => Number.isFinite(i.value) && i.value !== 0), s = t.reduce((i, r) => i + r.value, 0);
  return { mods: t, total: s };
}
function ir(a = {}) {
  const e = a.toggles ?? {}, t = String((a == null ? void 0 : a.payloadId) ?? (a == null ? void 0 : a.ammoTypeId) ?? "").trim();
  return {
    ...a,
    ...t ? { payloadId: t } : {},
    toggles: {
      useEdge: !!e.useEdge,
      takeRisks: !!e.takeRisks,
      opponentRoll: !!e.opponentRoll
    },
    manualModifiers: eu(a.manualModifiers)
  };
}
async function Zc({ actor: a, payload: e } = {}) {
  var r, n, o, l, c, u, d, m, h, g, b, p;
  if ((e == null ? void 0 : e.intent) !== "attack") return e;
  const t = foundry.utils.deepClone(e ?? {}), s = ((r = a.getPersonalCombatLoadout) == null ? void 0 : r.call(a, { refresh: !0 })) ?? null, i = (f) => {
    var M, k, R, F, I;
    const w = ((k = (M = a.items) == null ? void 0 : M.get) == null ? void 0 : k.call(M, f)) ?? null;
    return !w || !(((R = w.isPersonalWeapon) == null ? void 0 : R.call(w)) ?? w.type === y.itemType.personalWeapon) || !((F = w.system) != null && F.equipped) ? null : ((I = w.getCombatProfile) == null ? void 0 : I.call(w, { payloadId: t == null ? void 0 : t.payloadId })) ?? null;
  };
  if (t.weaponId) {
    const f = i(t.weaponId);
    if (!f)
      throw new Error("Attack requires an owned equipped personal weapon.");
    return t.rangeBand = t.rangeBand ?? f.defaultRangeBand ?? "close", t.payloadId = t.payloadId ?? ((n = f == null ? void 0 : f.payloadState) == null ? void 0 : n.activePayloadId) ?? "", t;
  }
  if (t.mode === "auto") {
    if (s != null && s.weaponChoiceRequired) {
      const f = await ta.selectItem(
        "Choose Weapon",
        s.equippedWeapons ?? []
      );
      return f ? (t.weaponId = f.id, t.rangeBand = t.rangeBand ?? f.defaultRangeBand ?? "close", t.payloadId = t.payloadId ?? ((o = f == null ? void 0 : f.payloadState) == null ? void 0 : o.activePayloadId) ?? "", delete t.mode, t) : null;
    }
    if ((l = s == null ? void 0 : s.defaultWeapon) != null && l.isSynthetic || ((c = s == null ? void 0 : s.defaultWeapon) == null ? void 0 : c.id) === "unarmed")
      return t.syntheticWeapon = foundry.utils.deepClone(s.defaultWeapon ?? qe.DEFAULT_UNARMED), t.weaponId = t.syntheticWeapon.id, t.rangeBand = t.rangeBand ?? "close", t.payloadId = t.payloadId ?? ((d = (u = t.syntheticWeapon) == null ? void 0 : u.payloadState) == null ? void 0 : d.activePayloadId) ?? "", delete t.mode, t;
    if ((m = s == null ? void 0 : s.defaultWeapon) != null && m.id)
      return t.weaponId = s.defaultWeapon.id, t.rangeBand = t.rangeBand ?? s.defaultWeapon.defaultRangeBand ?? "close", t.payloadId = t.payloadId ?? ((g = (h = s.defaultWeapon) == null ? void 0 : h.payloadState) == null ? void 0 : g.activePayloadId) ?? "", delete t.mode, t;
  }
  if (t.fallback === "unarmed")
    return t.syntheticWeapon = foundry.utils.deepClone(qe.DEFAULT_UNARMED), t.weaponId = t.syntheticWeapon.id, t.rangeBand = t.rangeBand ?? "close", t.payloadId = t.payloadId ?? ((p = (b = t.syntheticWeapon) == null ? void 0 : b.payloadState) == null ? void 0 : p.activePayloadId) ?? "", delete t.mode, t;
  throw new Error("Attack could not resolve a usable weapon.");
}
function eu(a) {
  return Array.isArray(a) ? a.map((e) => ({
    id: (e == null ? void 0 : e.id) ?? foundry.utils.randomID(),
    label: typeof (e == null ? void 0 : e.label) == "string" ? e.label : "Manual",
    value: Number((e == null ? void 0 : e.value) ?? 0)
  })) : [];
}
async function tu({ actor: a, payload: e, event: t } = {}) {
  var W, U, G, Y, D, Z, ue, ne, me, He, We, ct, ut, dt, mt, pt, ht, ft, gt, yt, bt, St, wt, At, Tt, kt, A, v, j, ie, pe, Te, ke;
  if (a != null && a.actor && (a = a.actor), (W = a == null ? void 0 : a.document) != null && W.actor && (a = a.document.actor), !a) throw new Error("MWD.roll.execute requires actor");
  if (!(e != null && e.intent)) throw new Error("MWD.roll.execute requires payload.intent");
  if (e = ir(e), e = await Zc({ actor: a, payload: e }), !e) return null;
  let s = await Ya({ actor: a, payload: e, event: t }), i = await Ja({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: s.domains,
    payload: e,
    resolved: s,
    context: { event: t }
  });
  const r = await ea.prompt({
    actor: a,
    basePayload: e,
    resolved: s,
    diceParts: {
      attribute: ((U = s == null ? void 0 : s.pool) == null ? void 0 : U.attribute) ?? 0,
      skill: ((G = s == null ? void 0 : s.pool) == null ? void 0 : G.skill) ?? 0,
      bonus: ((Y = s == null ? void 0 : s.pool) == null ? void 0 : Y.bonus) ?? 0,
      specialization: ((D = s == null ? void 0 : s.pool) == null ? void 0 : D.specialization) ?? 0
    },
    mods: i.mods,
    modTotal: i.total,
    options: {
      allowEdge: e.intent !== "initiative"
    }
  });
  if (!r) return null;
  if (e = ir(r), s = await Ya({ actor: a, payload: e, event: t }), e.intent === "attack" && e.weaponId) {
    const O = ((ue = (Z = a.items) == null ? void 0 : Z.get) == null ? void 0 : ue.call(Z, e.weaponId)) ?? null;
    if ((ne = O == null ? void 0 : O.isPersonalWeapon) != null && ne.call(O)) {
      const X = String(e.payloadId ?? "").trim(), Le = String(((me = O.system) == null ? void 0 : me.selectedPayloadId) ?? "").trim();
      if (X && X !== Le && await ((He = O.setActivePayload) == null ? void 0 : He.call(O, X)), !((We = O.canConsumePayload) != null && We.call(O, { payloadId: X }))) {
        const Pe = (ct = O.getPayloadState) == null ? void 0 : ct.call(O, { payloadId: X }), xe = Pe != null && Pe.payloadLabel ? ` (${Pe.payloadLabel})` : "";
        return (ut = ui.notifications) == null || ut.warn(`Not enough payload${xe} for ${O.name}.`), null;
      }
    }
  }
  i = await Ja({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: s.domains,
    payload: e,
    resolved: s,
    context: { event: t }
  });
  const { mods: n, total: o } = i, { mods: l, total: c } = Xc(e), u = [...n, ...l], d = Number(o ?? 0) + Number(c ?? 0), m = Number(((dt = s == null ? void 0 : s.pool) == null ? void 0 : dt.attribute) ?? 0) + Number(((mt = s == null ? void 0 : s.pool) == null ? void 0 : mt.skill) ?? 0) + Number(((pt = s == null ? void 0 : s.pool) == null ? void 0 : pt.bonus) ?? 0) + Number(((ht = s == null ? void 0 : s.pool) == null ? void 0 : ht.specialization) ?? 0), h = Math.max(0, m + Number(d ?? 0)), g = e.intent !== "initiative", b = g ? su({ actor: a, ctx: s, payload: e }) : null, p = (ft = b == null ? void 0 : b.pre) != null && ft.spent ? 4 : Number(s.diceTarget ?? s.target ?? 5);
  g && ((gt = b == null ? void 0 : b.pre) != null && gt.spent) && ((yt = b == null ? void 0 : b.pre) != null && yt.poolKey) && await ((bt = a.spendEdge) == null ? void 0 : bt.call(a, b.pre.poolKey, 1));
  let f, w = 0, M = 0;
  if (s.rollType === "sum" && ((St = s.sum) != null && St.formula))
    f = await new Roll(s.sum.formula, s.sum.data ?? {}).evaluate({ async: !0 }), w = Number(f.total ?? 0) + Number(d ?? 0);
  else {
    f = await new Roll(`${h}d6cs>=${p}`).evaluate({ async: !0 });
    const O = (wt = f.dice) == null ? void 0 : wt[0];
    w = Array.isArray(O == null ? void 0 : O.results) ? O.results.filter((X) => X.success).length : 0, M = Array.isArray(O == null ? void 0 : O.results) ? O.results.filter((X) => X.result === 1).length : 0;
  }
  s.intent === "initiative" && (f == null ? void 0 : f.total) != null && await ru({ actor: a, total: f.total });
  const k = Wc(
    s,
    { successes: w, raw: (At = f == null ? void 0 : f.toJSON) == null ? void 0 : At.call(f) },
    null
    // opposed rolls can pass defender result later
  ), R = k == null ? void 0 : k.edgeEarned;
  if ((R == null ? void 0 : R.amount) > 0) {
    const O = (Tt = s == null ? void 0 : s.domains) != null && Tt.includes("physical") ? "physical" : (kt = s == null ? void 0 : s.domains) != null && kt.includes("mental") ? "mental" : (A = s == null ? void 0 : s.domains) != null && A.includes("social") ? "social" : null, X = Qc(a, O);
    await ((v = a.gainEdge) == null ? void 0 : v.call(a, X, R.amount)), k.edgeEarned.pool = X;
  }
  s.intent === "overload" && await nu({ actor: a, passed: k.passed });
  const F = Ec({
    actor: a,
    payload: e,
    ctx: s,
    roll: f,
    target: p,
    pool: h,
    mods: u,
    modTotal: d,
    hits: w,
    ones: M,
    edge: b,
    outcomeModel: k
  }), I = await sn({ resolved: F });
  if (e.intent === "attack" && e.weaponId) {
    const O = ((ie = (j = a.items) == null ? void 0 : j.get) == null ? void 0 : ie.call(j, e.weaponId)) ?? null;
    (pe = O == null ? void 0 : O.isPersonalWeapon) != null && pe.call(O) && (await ((Te = O.consumePayload) == null ? void 0 : Te.call(O, { payloadId: e.payloadId })) || (ke = ui.notifications) == null || ke.warn(`Payload could not be consumed for ${O.name}.`));
  }
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: a }),
    content: I,
    flags: {
      mwd: {
        payload: e,
        resolved: F
      }
    }
  });
}
function su({ actor: a, ctx: e, payload: t }) {
  var g, b, p, f, w, M, k;
  const s = iu(e == null ? void 0 : e.domains), i = au[s] ?? null, r = (i == null ? void 0 : i.a) ?? null, n = (i == null ? void 0 : i.b) ?? null, o = [r, n].filter(Boolean), l = !!((g = t == null ? void 0 : t.toggles) != null && g.useEdge) || !!(t != null && t.useEdge);
  let c = String(((p = (b = t == null ? void 0 : t.edge) == null ? void 0 : b.pre) == null ? void 0 : p.poolKey) ?? "").trim() || null;
  c && !o.includes(c) && (c = null);
  const u = l && c ? 1 : 0;
  let d = [...o];
  u && c && (d = d.filter((R) => R !== c));
  let m = String(((w = (f = t == null ? void 0 : t.edge) == null ? void 0 : f.post) == null ? void 0 : w.poolKey) ?? "").trim() || null;
  m && !d.includes(m) && (m = null);
  const h = Number(((k = (M = t == null ? void 0 : t.edge) == null ? void 0 : M.post) == null ? void 0 : k.spent) ?? 0) ? 1 : 0;
  return {
    domain: s,
    pools: i ? { a: r, b: n } : null,
    pre: { poolKey: c, spent: u },
    post: { poolKey: m, spent: h },
    allowed: { prePools: o, postPools: d }
  };
}
function iu(a) {
  return Array.isArray(a) ? a.includes("physical") ? "physical" : a.includes("mental") ? "mental" : a.includes("social") ? "social" : null : null;
}
const au = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};
async function ru({ actor: a, total: e }) {
  var o, l, c, u, d;
  const t = (l = (o = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : o.controlled) == null ? void 0 : l.find((m) => {
    var h;
    return ((h = m.actor) == null ? void 0 : h.id) === a.id;
  }), s = ((u = (c = a.getActiveTokens) == null ? void 0 : c.call(a, !0, !0)) == null ? void 0 : u[0]) ?? null, i = t ?? s;
  if (!i) {
    (d = ui.notifications) == null || d.warn("Initiative requires a token on the current scene.");
    return;
  }
  let r = game.combat;
  r || (r = await Combat.create({
    scene: canvas.scene.id,
    active: !0
  }));
  let n = r.combatants.find((m) => m.tokenId === i.id);
  if (!n) {
    const m = await r.createEmbeddedDocuments("Combatant", [{
      tokenId: i.id,
      actorId: a.id,
      sceneId: canvas.scene.id
    }]);
    n = m == null ? void 0 : m[0];
  }
  n && await n.update({ initiative: Number(e) });
}
async function nu({ actor: a, passed: e }) {
  e || await a.update({ "system.burn.overloaded": !0 });
}
const ou = /* @__PURE__ */ new Set(["physical", "mental", "social"]);
function lu(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function cu(a) {
  if (!a) return;
  const e = String(a).trim().toLowerCase();
  return ou.has(e) ? e : void 0;
}
class uu {
  constructor() {
    C(this, "id", "mwd.itemModifiers");
    C(this, "label", "Item Modifiers");
  }
  collect(e) {
    var i, r;
    const t = e == null ? void 0 : e.actor;
    if (!t) return [];
    const s = [];
    for (const n of t.items) {
      const o = (r = (i = n.flags) == null ? void 0 : i.mwd) == null ? void 0 : r.modifiers;
      if (!(!Array.isArray(o) || o.length === 0))
        for (const l of o) {
          if (!l) continue;
          const c = lu(l.value);
          if (c === null) {
            console.warn("MWD | Dropping item modifier with invalid value", {
              actor: t.name,
              item: n.name,
              modifier: l
            });
            continue;
          }
          s.push({
            label: l.label ?? n.name,
            value: c,
            source: n.name,
            domain: cu(l.domain)
          });
        }
    }
    return s;
  }
}
const Ci = {
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
class du {
  constructor() {
    C(this, "id", "mwd.statusEffects");
    C(this, "label", "Status Effects");
  }
  collect({ actor: e } = {}) {
    var i;
    const t = e == null ? void 0 : e.statuses;
    if (!e || !t) return [];
    const s = [];
    for (const r of t) {
      const n = Ci == null ? void 0 : Ci[r];
      if ((i = n == null ? void 0 : n.mods) != null && i.length)
        for (const o of n.mods) {
          const l = Array.isArray(o.domains) ? o.domains : [], c = o.value;
          if (l.length)
            for (const u of l)
              s.push({
                label: n.label ?? r,
                value: c,
                source: "Status",
                domain: u
              });
          else
            s.push({
              label: n.label ?? r,
              value: c,
              source: "Status"
            });
        }
    }
    return s;
  }
}
class mu {
  constructor() {
    C(this, "id", "mwd.baseRollModifiers");
    C(this, "label", "Roll (Base)");
  }
  collect({ payload: e } = {}) {
    var n, o, l;
    const t = [], s = (n = e == null ? void 0 : e.modifiers) == null ? void 0 : n.manual;
    if (Array.isArray(s) && s.length) {
      for (const c of s) {
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
    const i = ((o = e == null ? void 0 : e.dialog) == null ? void 0 : o.otherMods) ?? ((l = e == null ? void 0 : e.modifiers) == null ? void 0 : l.otherMods) ?? (e == null ? void 0 : e.otherMods) ?? 0, r = Number(i);
    return Number.isFinite(r) && r !== 0 && t.push({
      id: "otherMods",
      label: "Other modifiers",
      value: r,
      source: "Roll"
    }), t;
  }
}
class pu {
  constructor() {
    C(this, "id", "mwd.condition");
    C(this, "label", "Condition");
  }
  collect({ actor: e, rollType: t } = {}) {
    var o, l, c, u, d, m, h, g;
    if (!e) return [];
    if (t === "edge") return [];
    const s = ((o = e.system) == null ? void 0 : o.derived) ?? {}, i = Number(
      ((l = s == null ? void 0 : s.condition) == null ? void 0 : l.physicalPenalty) ?? ((u = (c = s == null ? void 0 : s.monitors) == null ? void 0 : c.physical) == null ? void 0 : u.penalty) ?? 0
    ), r = Number(
      ((d = s == null ? void 0 : s.condition) == null ? void 0 : d.fatiguePenalty) ?? ((h = (m = s == null ? void 0 : s.monitors) == null ? void 0 : m.fatigue) == null ? void 0 : h.penalty) ?? 0
    ), n = [];
    return Number.isFinite(i) && i !== 0 && n.push({
      id: "conditionPhysical",
      label: "Physical Penalty",
      value: i,
      source: "Physical Track"
      // domain: "physical" // optional; leave unset to apply to all domains
    }), Number.isFinite(r) && r !== 0 && n.push({
      id: "conditionFatigue",
      label: "Fatigue Penalty",
      value: r,
      source: "Fatigue Track"
      // domain: "physical" // optional
    }), console.log("MWD|condition derived snapshot", e.name, foundry.utils.deepClone((g = e.system) == null ? void 0 : g.derived)), n;
  }
}
const hu = {
  id: "burn",
  async collect(a) {
    var i, r;
    const e = a.actor;
    if (!e) return [];
    const t = Number(((r = (i = e.system) == null ? void 0 : i.burn) == null ? void 0 : r.value) ?? 0), s = Math.floor(t / 2);
    return s <= 0 ? [] : [{
      id: "burn",
      label: "Burn",
      value: -s,
      source: "Burn Track",
      domain: null
    }];
  }
};
function fu() {
  Hooks.on("renderChatMessageHTML", (a, e) => {
    e.addEventListener("click", (t) => {
      const s = t.target.closest("[data-mwd-action]");
      if (!s) return;
      const i = String(s.dataset.mwdAction || "").trim();
      i && i === "edgePostReroll" && gu(t, a);
    });
  });
}
async function gu(a, e) {
  var g, b, p, f, w, M, k, R, F, I, W, U, G, Y, D, Z, ue;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='edgePostReroll']"), s = String(((g = t == null ? void 0 : t.dataset) == null ? void 0 : g.poolKey) ?? "").trim();
  if (!s) return;
  const i = foundry.utils.deepClone((p = (b = e == null ? void 0 : e.flags) == null ? void 0 : b.mwd) == null ? void 0 : p.resolved);
  if (!i || Number(((w = (f = i == null ? void 0 : i.edge) == null ? void 0 : f.post) == null ? void 0 : w.spent) ?? 0) === 1) return;
  if (!(Array.isArray((k = (M = i == null ? void 0 : i.edge) == null ? void 0 : M.allowed) == null ? void 0 : k.postPools) ? i.edge.allowed.postPools : []).includes(s)) {
    (F = (R = ui.notifications) == null ? void 0 : R.warn) == null || F.call(R, `Post-spend pool not allowed: ${s}`);
    return;
  }
  const n = Array.isArray((I = i == null ? void 0 : i.roll) == null ? void 0 : I.failureDiceRefs) ? i.roll.failureDiceRefs : [];
  if (n.length <= 0) {
    (U = (W = ui.notifications) == null ? void 0 : W.info) == null || U.call(W, "No failures to reroll.");
    return;
  }
  const o = await fromUuid(i.actorUuid);
  if (!o) {
    (Y = (G = ui.notifications) == null ? void 0 : G.warn) == null || Y.call(G, "Actor not found for this roll.");
    return;
  }
  await ((D = o.spendEdge) == null ? void 0 : D.call(o, s, 1));
  const l = Number(((Z = i == null ? void 0 : i.roll) == null ? void 0 : Z.target) ?? 5), u = (ue = (await new Roll(`${n.length}d6cs>=${l}`).evaluate()).dice) == null ? void 0 : ue[0], d = Array.isArray(u == null ? void 0 : u.results) ? u.results : [], m = d.filter((ne) => ne.success).length;
  i.outcome = i.outcome ?? {}, i.outcome.hits = Number(i.outcome.hits ?? 0) + m, i.edge = i.edge ?? {}, i.edge.post = { poolKey: s, spent: 1 }, i.edge.availableActions = {
    ...i.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, i.roll = i.roll ?? {}, i.roll.diceGroups = Array.isArray(i.roll.diceGroups) ? i.roll.diceGroups : [], i.roll.diceGroups.push({
    id: "post",
    label: "Post Reroll",
    faces: 6,
    termIndex: null,
    dice: d.map((ne, me) => {
      const He = Number(ne.result), We = !!ne.success;
      return {
        ref: `post:${me}`,
        face: He,
        isSuccess: We,
        isFailure: !We,
        tooltip: We ? `Post die ${me + 1}: ${He} (Success vs TN ${l})` : `Post die ${me + 1}: ${He} (Failure vs TN ${l})`
      };
    })
  });
  const h = await sn({ resolved: i });
  await e.update({
    content: h,
    "flags.mwd.resolved": i,
    "flags.mwd.payload.edge.post": { poolKey: s, spent: 1 }
  });
}
function yu() {
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
function bu() {
  return {
    get(a) {
      return ot(a);
    },
    getSkills({ withKnowledge: a = !1 } = {}) {
      return qs();
    },
    list() {
      return qs();
    }
  };
}
class ga {
  static start() {
    const e = new ga();
    Hooks.once("init", () => e.onInit()), Hooks.once("ready", () => e.onReady());
  }
  async onInit() {
    console.log(te + "AnarchySystem.onInit"), game.system.mwd = this, game.system.anarchy = this, game.mwd ?? (game.mwd = {}), yu(), fu(), Cl("mwd"), game.mwd.roll = sr, game.mwd.personalCombat = le, game.mwd.harm = Xe, this.roll = sr, this.personalCombat = le, this.harm = Xe, this.skills = bu(), this.remoteCall = new Oi(), game.system.mwd.skills = this.skills, game.mwd.skills = this.skills, Q.init(), this.modifiers = new K(), xt.register(new uu()), xt.register(new du()), xt.register(new mu()), xt.register(new pu()), xt.register(hu), xt.register(new il()), Handlebars.registerHelper("mwdClassList", (e) => Array.isArray(e) ? e.join(" ") : typeof e == "string" ? e : ""), this.actorClasses = {
      character: Ba,
      npc: Ba,
      vehicle: Ir,
      battlemech: el
    }, this.hooks = new Ht(), this.styles = new Ao(), this.handlebarsManager = new ca(), le.init(), Ul.register(), console.log(te + "AnarchySystem.onInit | loading system"), CONFIG.ANARCHY = ce, CONFIG.Combat.initiative = { formula: "2d6" }, CONFIG.statusEffects.push({
      id: "overloaded",
      name: "Overloaded",
      icon: "systems/mwd/img/icons/status/surge.svg"
    }), CONFIG.Actor.documentClass = nc, CONFIG.Item.documentClass = as, as.init(), Kl(), Xl(), await tc(), console.log(te + "AnarchySystem.onInit | done");
  }
  async onReady() {
    if (console.log(te + "AnarchySystem.onReady"), await le.onReady(), !game.user.isGM) return;
    const e = game.settings.get(T, "enableGMGadget");
    if (!e) {
      console.log(`${te}GMManager render skipped (enableGMGadget=false)`);
      return;
    }
    game.mwd = game.mwd ?? {}, game.mwd.gmGadget = () => vl({ systemId: T }).render({ force: !0 }), e && game.mwd.gmGadget();
  }
}
ga.start();
//# sourceMappingURL=index.mjs.map
