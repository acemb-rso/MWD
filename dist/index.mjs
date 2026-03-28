var Lr = Object.defineProperty;
var xr = Object.getPrototypeOf;
var Br = Reflect.get;
var aa = (a) => {
  throw TypeError(a);
};
var Hr = (a, e, t) => e in a ? Lr(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var R = (a, e, t) => Hr(a, typeof e != "symbol" ? e + "" : e, t), qs = (a, e, t) => e.has(a) || aa("Cannot " + t);
var F = (a, e, t) => (qs(a, e, "read from private field"), t ? t.call(a) : e.get(a)), we = (a, e, t) => e.has(a) ? aa("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), Re = (a, e, t, s) => (qs(a, e, "write to private field"), s ? s.call(a, t) : e.set(a, t), t), E = (a, e, t) => (qs(a, e, "access private method"), t);
var Lt = (a, e, t) => Br(xr(a), t, e);
const oe = {
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
}, w = oe, S = "mwd", Wr = "MechWarrior: Destiny", hi = `system.${S}`, Fr = S, fs = `systems/${S}`, xa = `${fs}/style`, Xt = `${fs}/third-party/style`, B = `systems/${S}/templates`, Ws = `${fs}/img/icons`, U = `${Ws}/skills`, Z = "MWD | ", zr = 2, jr = 5, Vr = 4, Ba = 8, fi = {
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
}, gi = {
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
}, Wi = {
  physical: [_e.grit, _e.chaos],
  mental: [_e.insight, _e.rumor],
  social: [_e.legend, _e.credibility]
}, g = {
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
  actorAttributes: fi,
  itemAttributes: gi,
  attributes: { ...fi, ...gi },
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
    edgePoolGroups: Wi,
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
}, Ur = Object.freeze({
  physical: "physical",
  mental: "mental",
  social: "social"
});
Object.freeze(Object.values(Ur));
const Gt = {
  [g.actorTypes.character]: [
    g.actorAttributes.strength,
    g.actorAttributes.reflexes,
    g.actorAttributes.willpower,
    g.actorAttributes.intelligence,
    g.actorAttributes.charisma,
    g.actorAttributes.edge
  ],
  [g.actorTypes.npc]: [
    g.actorAttributes.strength,
    g.actorAttributes.reflexes,
    g.actorAttributes.willpower,
    g.actorAttributes.intelligence,
    g.actorAttributes.charisma,
    g.actorAttributes.edge
  ],
  [g.actorTypes.vehicle]: [
    g.actorAttributes.handling,
    g.actorAttributes.system,
    g.actorAttributes.chassis,
    g.actorAttributes.condition
  ],
  [g.actorTypes.battlemech]: [
    g.actorAttributes.handling,
    g.actorAttributes.system,
    g.actorAttributes.chassis,
    g.actorAttributes.condition
  ]
}, Ks = {
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
}, Ne = {
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
  SYSTEM_NAME: S,
  SYSTEM_DESCRIPTION: Wr,
  SYSTEM_SOCKET: hi,
  SYSTEM_SCOPE: Fr,
  SYSTEM_PATH: fs,
  STYLE_PATH: xa,
  THIRD_PARTY_STYLE_PATH: Xt,
  TEMPLATES_PATH: B,
  ICONS_PATH: Ws,
  ICONS_SKILLS_PATH: U,
  LOG_HEAD: Z,
  SPECIALIZATION_BONUS: zr,
  TARGET_SUCCESS: jr,
  TARGET_SUCCESS_EDGE: Vr,
  BASE_MONITOR: Ba,
  ACTOR_ATTRIBUTES: fi,
  ITEM_ATTRIBUTES: gi,
  EDGE_POOL_GROUPS: Wi,
  TEMPLATE: g,
  ANARCHY_SYSTEM: Ne
};
const Ye = class Ye {
  static ascending(e = (t) => t) {
    return (t, s) => Ye.sortingBy(e(t), e(s));
  }
  static descending(e = (t) => t) {
    return (t, s) => Ye.sortingBy(e(s), e(t));
  }
  static sortingBy(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
  }
  static bySortedArray(e) {
    return (t) => e.indexOf(t);
  }
  static ascendingBySortedArray(e) {
    return Ye.ascending(Ye.bySortedArray(e));
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
    return e.map(t).filter((s) => s != null).reduce(Ye.sum(), 0);
  }
  static divint(e, t) {
    return Math.floor(e / t);
  }
  static divup(e, t) {
    return Math.ceil(e / t);
  }
  static join(e, t = "") {
    return e.reduce(Ye.joiner(t));
  }
  static joiner(e = "") {
    return (t, s) => t + e + s;
  }
  static classify(e, t = (s) => s.type) {
    let s = {};
    return Ye.classifyInto(s, e, t), s;
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
R(Ye, "isString", (e) => typeof e == "string" || e instanceof String);
let j = Ye;
const Gr = {
  keyword: "keywords",
  disposition: "dispositions",
  cue: "cues"
}, v = class v {
  /**
   * Initialize enum caches.
   * Call once during system init/setup after config/constants are available.
   */
  static init() {
    var t, s, i, r, n, l, o, c, u, m, d, h;
    v.hbsAttributes = v.mapObjectToKeyValue(w.attributes).filter((p) => p.value !== "knowledge" && p.value !== "noAttribute"), v.hbsItemTypes = v.mapObjectToKeyValue(w.itemType), v.hbsMonitors = v.mapObjectToKeyValue(w.monitor), v.hbsMonitorLetters = v.mapObjectToKeyValue(w.monitorLetter), v.hbsAssetModuleCategories = v.mapObjectToKeyValue(w.assetModuleCategory), (s = (t = w.item) == null ? void 0 : t.lifeModule) != null && s.type ? v.hbsLifeModuleTypes = v.mapObjectToKeyValue(w.item.lifeModule.type) : (console.warn("MWD | MWD.item.lifeModule.type is missing; life module enums disabled."), v.hbsLifeModuleTypes = []), v.hbsAreas = v.mapObjectToKeyValue(w.area), v.hbsRanges = v.mapObjectToKeyValue(w.range), v.hbsVehicleCategories = v.mapObjectToKeyValue(w.vehicleCategory), v.hbsMwdWeightClasses = v.mapObjectToKeyValue((i = w.mwd) == null ? void 0 : i.weightClass), v.hbsMwdHardpointTypes = v.mapObjectToKeyValue((r = w.mwd) == null ? void 0 : r.hardpointType), v.hbsMwdHardpointSizes = v.mapObjectToKeyValue((n = w.mwd) == null ? void 0 : n.hardpointSize), v.hbsMwdHardpointLocations = v.mapObjectToKeyValue((l = w.mwd) == null ? void 0 : l.hardpointLocation), v.hbsMwdPrimaryModes = v.mapObjectToKeyValue((o = w.mwd) == null ? void 0 : o.primarySlotMode), v.hbsMwdWeaponCategories = v.mapObjectToKeyValue((c = w.mwd) == null ? void 0 : c.weaponCategory), v.hbsMwdWeaponDamageTypes = v.mapObjectToKeyValue((u = w.mwd) == null ? void 0 : u.weaponDamageType), v.hbsPersonalWeaponDamageTypes = v.mapObjectToKeyValue((m = w.mwd) == null ? void 0 : m.personalDamageType), v.hbsPersonalWeaponDamageCategories = v.mapObjectToKeyValue((d = w.mwd) == null ? void 0 : d.personalDamageCategory), v.hbsMwdMeleeLocations = v.mapObjectToKeyValue((h = w.mwd) == null ? void 0 : h.meleeLocation), v.hbsDamageTypes = j.distinct(
      (v.hbsMwdWeaponDamageTypes ?? []).concat(v.hbsPersonalWeaponDamageTypes ?? []),
      (p) => p.value
    );
    const e = Object.values(Gt).flat();
    v.sortedAttributeKeys = j.distinct(
      e.concat(Object.keys(w.attributes ?? {}))
    ), v.registerHandleBarHelpers(), v.ENUMS = v.getEnums();
  }
  static registerHandleBarHelpers() {
    typeof Handlebars > "u" || Handlebars.registerHelper("sortedAttributes", (e) => {
      if (!e || typeof e != "object") return [];
      const t = Object.keys(e), s = v.sortedAttributeKeys ?? [], i = new Map(s.map((r, n) => [r, n]));
      return t.sort((r, n) => {
        const l = i.has(r) ? i.get(r) : 9999, o = i.has(n) ? i.get(n) : 9999;
        return l !== o ? l - o : String(r).localeCompare(String(n));
      }), t.map((r) => {
        const n = e[r];
        return n && typeof n == "object" ? { key: r, ...n } : { key: r, value: n };
      });
    });
  }
  static getDamageTypes() {
    return v.hbsDamageTypes ?? [];
  }
  static getAttributes(e = () => !0) {
    return (v.hbsAttributes ?? []).filter((t) => e(t.value));
  }
  static getActorWordTypes() {
    return Gr;
  }
  static getMonitors() {
    return v.hbsMonitors ?? [];
  }
  /**
   * Returns a big blob of enums suitable for sheet contexts.
   * `withKnowledge` is passed through to the skills service.
   */
  static getEnums(e = () => !0, t = !1) {
    return {
      attributes: v.getAttributes(e),
      itemTypes: v.hbsItemTypes ?? [],
      monitors: v.hbsMonitors ?? [],
      monitorLetters: v.hbsMonitorLetters ?? [],
      assetModuleCategories: v.hbsAssetModuleCategories ?? [],
      lifeModuleTypes: v.hbsLifeModuleTypes ?? [],
      areas: v.hbsAreas ?? [],
      ranges: v.hbsRanges ?? [],
      vehicleCategories: v.hbsVehicleCategories ?? [],
      // Skills: now sourced from MWD namespace (with safe fallback)
      skills: v.getSkillsEnum({ withKnowledge: t }),
      // MWD enums
      mwdWeightClasses: v.hbsMwdWeightClasses ?? [],
      mwdHardpointTypes: v.hbsMwdHardpointTypes ?? [],
      mwdHardpointSizes: v.hbsMwdHardpointSizes ?? [],
      mwdHardpointLocations: v.hbsMwdHardpointLocations ?? [],
      mwdPrimaryModes: v.hbsMwdPrimaryModes ?? [],
      mwdWeaponCategories: v.hbsMwdWeaponCategories ?? [],
      mwdWeaponDamageTypes: v.hbsMwdWeaponDamageTypes ?? [],
      personalWeaponDamageTypes: v.hbsPersonalWeaponDamageTypes ?? [],
      personalWeaponDamageCategories: v.hbsPersonalWeaponDamageCategories ?? [],
      damageTypes: v.hbsDamageTypes ?? [],
      mwdMeleeLocations: v.hbsMwdMeleeLocations ?? []
    };
  }
  static getSkillsEnum({ withKnowledge: e = !1 } = {}) {
    var i, r, n, l, o;
    const t = ((r = (i = game == null ? void 0 : game.system) == null ? void 0 : i.mwd) == null ? void 0 : r.skills) ?? ((l = (n = game == null ? void 0 : game.system) == null ? void 0 : n.anarchy) == null ? void 0 : l.skills);
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
    return v.mapObjectToKeyValue(e, t, s);
  }
};
R(v, "ENUMS"), // HBS-friendly arrays of { value, label } (or key/value depending on caller)
R(v, "hbsAttributes"), R(v, "hbsItemTypes"), R(v, "hbsMonitors"), R(v, "hbsMonitorLetters"), R(v, "hbsAssetModuleCategories"), R(v, "hbsLifeModuleTypes"), R(v, "hbsAreas"), R(v, "hbsRanges"), R(v, "hbsVehicleCategories"), // MWD-specific enum groups
R(v, "hbsMwdWeightClasses"), R(v, "hbsMwdHardpointTypes"), R(v, "hbsMwdHardpointSizes"), R(v, "hbsMwdHardpointLocations"), R(v, "hbsMwdPrimaryModes"), R(v, "hbsMwdWeaponCategories"), R(v, "hbsMwdWeaponDamageTypes"), R(v, "hbsPersonalWeaponDamageTypes"), R(v, "hbsPersonalWeaponDamageCategories"), R(v, "hbsDamageTypes"), R(v, "hbsMwdMeleeLocations"), R(v, "sortedAttributeKeys");
let J = v;
class qr {
  static monitor(e) {
    return J.getFromList(J.getMonitors(), e) ?? "";
  }
  static letter(e) {
    return J.getFromList(J.getMonitorLetters(), e) ?? "";
  }
}
class Kr {
  static toLowerCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}
const Yr = [
  "fas fa-dice",
  "fas fa-dice-one",
  "fas fa-dice-two",
  "fas fa-dice-three",
  "fas fa-dice-four",
  "fas fa-dice-five",
  "fas fa-dice-six"
];
class L {
  static fontAwesome(e) {
    return `<i class="${e}"></i>`;
  }
  static iconSystemPath(e, t) {
    return L.iconPath(`${xa}/${e}`, t);
  }
  static iconPath(e, t) {
    return `<img class="${t}" src="${e}" />`;
  }
  static iconD6(e) {
    if (e < 0 || e > 6)
      throw `Dice ${e} is out of dice range [1..6] or 0 for multidice`;
    return L.fontAwesome(Yr[e]);
  }
}
globalThis.ANARCHY_ICONS = L;
const se = (a, e = {}) => a.replace(/\{(.*?)\}/g, (t, s) => e[s] ?? ""), Ha = Object.freeze({
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}), Os = Object.freeze(
  Object.entries(Ha).map(([a, e]) => ({ value: a, label: e }))
), Jr = Object.freeze({
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
}), Qr = Object.freeze(
  Os.map((a) => a.value)
), qt = Object.freeze({
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
}), Fs = Object.freeze({
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
}), Zr = Object.freeze(
  Object.values(qt).map((a) => ({
    value: a.key,
    label: a.label,
    rated: a.rated
  }))
), Xr = Object.freeze(
  Object.values(Fs).map((a) => ({
    value: a.key,
    label: a.label,
    rated: a.rated
  }))
), Wa = ja(qt), Fa = ja(Fs);
Object.freeze(
  Object.fromEntries(
    Object.values(qt).flatMap((a) => [a.key, ...a.aliases ?? []].map((t) => [String(t).trim().toLowerCase(), a.resolve]))
  )
);
function Fi(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => Fi(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function rt(a, e = "penetrating") {
  const t = String(a ?? "").trim().toLowerCase();
  return Jr[t] ?? e;
}
function en(a) {
  const e = String(a ?? "").trim();
  return e ? rt(e, "") : "";
}
function za(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return Qr.includes(e);
}
function kt(a) {
  const e = rt(a, "");
  return Ha[e] ?? String(a ?? "").trim();
}
function it(a) {
  const e = a ?? {}, t = Number(e.ballistic ?? 0) || 0, s = Number(e.melee ?? 0) || 0;
  return {
    penetrating: e.penetrating !== void 0 ? Number(e.penetrating ?? 0) || 0 : Math.max(t, s),
    concussive: e.concussive !== void 0 ? Number(e.concussive ?? 0) || 0 : Number(e.explosive ?? 0) || 0,
    energy: Number(e.energy ?? 0) || 0,
    thermal: Number(e.thermal ?? 0) || 0,
    electrical: Number(e.electrical ?? 0) || 0
  };
}
function Ms(a) {
  return Fi(a);
}
function nt(a) {
  return Fi(a);
}
function Is(a = "id") {
  var t, s;
  const e = (s = (t = globalThis.foundry) == null ? void 0 : t.utils) == null ? void 0 : s.randomID;
  return typeof e == "function" ? e() : `${a}-${Math.random().toString(36).slice(2, 10)}`;
}
function ja(a) {
  const e = {};
  return Object.values(a).forEach((t) => {
    [t.key, ...t.aliases ?? []].forEach((s) => {
      e[us(s)] = t.key;
    });
  }), Object.freeze(e);
}
function us(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function zi(a) {
  return Array.isArray(a) ? a : a && typeof a == "object" ? Object.values(a) : a == null || a === "" ? [] : [a];
}
function Va(a, e) {
  return zi(a).map((t) => tn(t, e)).filter(Boolean);
}
function tn(a, e) {
  if (typeof a == "string" || typeof a == "number") {
    const s = e[us(a)];
    return s ? { id: Is("trait"), key: s, rating: 1 } : null;
  }
  if (!a || typeof a != "object") return null;
  const t = e[us(a.key ?? a.value ?? a.name)];
  return t ? {
    id: String(a.id ?? "").trim() || Is("trait"),
    key: t,
    rating: Math.max(0, Number(a.rating ?? 0) || 0)
  } : null;
}
function Le(a) {
  return Va(a, Wa);
}
function et(a) {
  return Va(a, Fa);
}
function yi(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function sn(a = {}, e = {}) {
  const t = yi(a), s = yi(e);
  return {
    close: t.close + s.close,
    near: t.near + s.near,
    far: t.far + s.far,
    extreme: t.extreme + s.extreme
  };
}
function an(a, e) {
  var t;
  return ((t = e[a]) == null ? void 0 : t.label) ?? a;
}
function ji(a, e) {
  var i;
  const t = an(a == null ? void 0 : a.key, e), s = Math.max(0, Number((a == null ? void 0 : a.rating) ?? 0) || 0);
  return (i = e[a == null ? void 0 : a.key]) != null && i.rated && s > 0 ? `${t} ${s}` : t;
}
function Ua(a, e) {
  return zi(a).map((t) => {
    const s = t == null ? void 0 : t.key, i = e[s];
    return i != null && i.resolve ? {
      entry: t,
      effect: i.resolve(t),
      label: ji(t, e)
    } : null;
  }).filter(Boolean);
}
function rn(a, e) {
  const t = { ...a ?? {} };
  return Object.entries(e ?? {}).forEach(([s, i]) => {
    t[s] = (Number(t[s] ?? 0) || 0) + (Number(i ?? 0) || 0);
  }), t;
}
function nn(a = []) {
  const e = {}, t = /* @__PURE__ */ new Set();
  for (const s of a.filter(Boolean)) {
    s.accuracyMod !== void 0 && (e.accuracyMod = (Number(e.accuracyMod ?? 0) || 0) + (Number(s.accuracyMod ?? 0) || 0)), s.ap !== void 0 && (e.ap = (Number(e.ap ?? 0) || 0) + (Number(s.ap ?? 0) || 0)), s.addHeat !== void 0 && (e.addHeat = (Number(e.addHeat ?? 0) || 0) + (Number(s.addHeat ?? 0) || 0)), s.bonusVsArmorTag && (e.bonusVsArmorTag = rn(e.bonusVsArmorTag, s.bonusVsArmorTag));
    for (const i of s.flags ?? []) {
      const r = String(i ?? "").trim();
      r && t.add(r);
    }
  }
  return t.size > 0 && (e.flags = Array.from(t)), e;
}
function Ga(a = [], e = []) {
  const t = Array.isArray(a) || typeof a == "string" ? { traits: a, standardTraits: e } : a ?? {}, s = nt(t.traits), i = Le(t.standardTraits), r = Ua(i, qt), n = s.map((l) => {
    var u;
    const o = Wa[us(l)];
    if (!o) return null;
    const c = (u = qt[o]) == null ? void 0 : u.resolve;
    return typeof c == "function" ? c({ key: o, rating: 1 }) : null;
  });
  return nn([
    ...r.map((l) => l.effect),
    ...n
  ]);
}
function on({ traits: a = [], standardTraits: e = [] } = {}) {
  return [
    ...nt(a),
    ...Le(e).map((s) => ji(s, qt))
  ].filter(Boolean);
}
function ln(a) {
  const e = a ?? {};
  return {
    id: String(e.id ?? "").trim() || Is("ammo"),
    name: String(e.name ?? "").trim() || "Ammo",
    damageType: en(e.damageType),
    apMod: Number(e.apMod ?? e.ap ?? 0) || 0,
    attackRatingBandMod: yi(e.attackRatingBandMod ?? e.attackRatingBand),
    standardTraits: Le(e.standardTraits),
    traits: nt(e.traits)
  };
}
function Ht(a) {
  var o;
  const e = a ?? {}, t = Math.max(0, Number(e.max ?? 0) || 0), s = Number(e.current), i = Number.isFinite(s) ? Math.max(0, Math.min(s, t > 0 ? t : s)) : Math.max(0, t), r = zi(e.types).map(ln), n = String(e.activeTypeId ?? "").trim(), l = r.some((c) => c.id === n) ? n : ((o = r[0]) == null ? void 0 : o.id) ?? "";
  return {
    current: i,
    max: t,
    consumePerAttack: Math.max(1, Number(e.consumePerAttack ?? 1) || 1),
    activeTypeId: l,
    types: r
  };
}
function qa(a = {}, e = "") {
  const t = Ht(a), i = String(e ?? "").trim() || t.activeTypeId, r = t.types.find((n) => n.id === i) ?? null;
  return {
    ammo: t,
    activeType: r,
    activeTypeId: (r == null ? void 0 : r.id) ?? "",
    ammoLabel: (r == null ? void 0 : r.name) ?? "",
    isTracked: t.max > 0
  };
}
function cn({
  damageType: a = "penetrating",
  ap: e = 0,
  attackRatingBand: t = {},
  traits: s = [],
  standardTraits: i = [],
  ammo: r = {},
  ammoTypeId: n = ""
} = {}) {
  const l = qa(r, n), o = l.activeType, c = [
    ...Le(i),
    ...Le(o == null ? void 0 : o.standardTraits)
  ], u = [
    ...nt(s),
    ...nt(o == null ? void 0 : o.traits)
  ], m = Ga({
    traits: u,
    standardTraits: c
  });
  return {
    damageType: (o == null ? void 0 : o.damageType) || rt(a),
    ap: (Number(e ?? 0) || 0) + (Number((o == null ? void 0 : o.apMod) ?? 0) || 0),
    attackRatingBand: sn(
      t,
      (o == null ? void 0 : o.attackRatingBandMod) ?? {}
    ),
    effects: m,
    traits: on({
      traits: u,
      standardTraits: c
    }),
    standardTraits: c,
    ammoLabel: l.ammoLabel,
    ammoType: o ? foundry.utils.deepClone(o) : null,
    ammoState: {
      ...l.ammo,
      activeTypeId: l.activeTypeId,
      ammoLabel: l.ammoLabel,
      isTracked: l.isTracked
    }
  };
}
function Ka(a = {}, e = {}) {
  const t = it(a), s = it(e);
  return {
    penetrating: t.penetrating + s.penetrating,
    concussive: t.concussive + s.concussive,
    energy: t.energy + s.energy,
    thermal: t.thermal + s.thermal,
    electrical: t.electrical + s.electrical
  };
}
function Ys({ standardTraits: a = [], traits: e = [], traitState: t = {} } = {}) {
  var d, h;
  const s = et(a), r = nt(e).map((p) => {
    const b = Fa[us(p)];
    return b ? { id: Is("trait"), key: b, rating: b === "reinforced" ? 1 : 0 } : null;
  }).filter(Boolean), n = Ua(
    [...s, ...r],
    Fs
  ), l = n.reduce((p, b) => {
    var y;
    return Ka(p, ((y = b.effect) == null ? void 0 : y.mitigationByType) ?? {});
  }, it({})), o = n.reduce(
    (p, b) => {
      var y;
      return p + Math.max(0, Number(((y = b.effect) == null ? void 0 : y.reinforced) ?? 0) || 0);
    },
    0
  ), c = Number((d = t == null ? void 0 : t.reinforced) == null ? void 0 : d.current), u = Number((h = t == null ? void 0 : t.reinforced) == null ? void 0 : h.max), m = Number.isFinite(c) ? c : Number.isFinite(u) ? u : o;
  return {
    mitigationByType: l,
    reinforcedMax: o,
    traitState: {
      reinforced: {
        current: Math.min(o, Math.max(0, m || 0)),
        max: o
      }
    },
    labels: n.map((p) => p.label),
    standardTraits: s
  };
}
function un({ traits: a = [], standardTraits: e = [] } = {}) {
  return [
    ...nt(a),
    ...et(e).map((s) => ji(s, Fs))
  ].filter(Boolean);
}
function Vi(a) {
  const e = Math.max(0, Number(a ?? 0) || 0);
  return e <= 0 ? 0 : Math.ceil(e / 4);
}
function mn({
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
  const i = rt(t, "penetrating"), r = it(e), n = Vi(s), l = Number(r[i] ?? 0) || 0;
  return {
    currentArmorRating: s,
    baseMitigation: n,
    typeMitigationMod: l,
    totalMitigation: n + l,
    isDestroyed: !1
  };
}
function dn({ damageIncoming: a = 0, armorTags: e = [], effects: t = {} } = {}) {
  const s = new Set(Ms(e));
  let i = Number(a ?? 0) || 0;
  const r = [];
  return Object.entries((t == null ? void 0 : t.bonusVsArmorTag) ?? {}).forEach(([n, l]) => {
    if (!s.has(n)) return;
    const o = Number(l ?? 0) || 0;
    o && (i *= 1 + o, r.push({ tag: n, bonus: o }));
  }), {
    damageIncoming: i,
    applied: r
  };
}
class $t {
  static checkSufficient(e, t, s) {
    if (t > s) {
      const i = se(w.common.errors.insufficient, {
        resource: e,
        required: t,
        available: s
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkOutOfRange(e, t, s, i) {
    if (t < s || t > i) {
      const r = se(w.common.errors.outOfRange, {
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
      const e = w.common.errors.onlyGM;
      throw ui.notifications.error(e), e;
    }
  }
  static checkItemType(e, t) {
    if (e.type != t) {
      const s = se(w.common.errors.expectedType, {
        type: e.type ? w.itemType.singular[e.type] : e.type,
        expectedType: t
      });
      throw ui.notifications.error(s), s;
    }
  }
  static checkActorCanReceiveDamage(e, t, s) {
    if (!t) {
      const i = se(w.common.errors.actorCannotReceiveDamage, {
        actor: s.name,
        damageType: za(e) ? kt(e) : w.actor.monitors[e] ?? w.mwd.weaponDamageType[e] ?? w.mwd.personalDamageType[e] ?? e
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkWeaponDefense(e, t) {
    var i;
    const s = e.getDefense();
    if ((((i = e.isPersonalWeapon) == null ? void 0 : i.call(e)) ?? e.type === g.itemType.personalWeapon) && !s) {
      const r = se(w.common.errors.noDefenseOnWeapon, { actor: t.name, weapon: e.name });
      throw ui.notifications.error(r), r;
    }
  }
  static checkTargetsCount(e, t, s) {
    if (e > 0 && t.length > e) {
      const i = se(w.common.errors.maxTargetsExceedeed, {
        weapon: this.name,
        area: w.area[s],
        count: t.length,
        max: e
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkActorDefenseAction(e, t, s) {
    if (!e) {
      const i = se(w.common.errors.actorDoesNotHaveDefense, {
        actor: t.name,
        defense: s.labelkey,
        actorType: w.actorType[t.type]
      });
      throw ui.notifications.error(i), i;
    }
  }
}
function Ke(a, e, t, s, i, r = (n) => !0) {
  return {
    code: a,
    labelkey: w.attributeAction[a],
    label: w.attributeAction[a],
    attributeFunction1: e ?? ((n) => {
    }),
    attributeFunction2: t ?? ((n) => {
    }),
    icon: s,
    actorTypes: i,
    condition: r
  };
}
function bs(a, e) {
  return {
    code: a,
    labelkey: w.defense[a],
    label: w.defense[a],
    actionCode: e
  };
}
const he = g.actorAttributes, fe = g.actorTypes, Ie = Ne.actions, ws = Ne.defenses, Js = [
  Ke(Ie.defense, (a) => he.reflexes, (a) => he.intelligence, L.fontAwesome("fas fa-shield-alt"), [fe.character, fe.npc]),
  Ke(Ie.defense, (a) => he.handling, (a) => he.chassis, L.fontAwesome("fas fa-tachometer-alt"), [fe.vehicle, fe.battlemech]),
  Ke(Ie.resistTorture, (a) => he.strength, (a) => he.willpower, L.fontAwesome("fas fa-angry"), [fe.character, fe.npc]),
  Ke(Ie.perception, (a) => he.logic, (a) => he.willpower, L.fontAwesome("fas fa-eye"), [fe.character, fe.npc]),
  Ke(Ie.perception, (a) => he.system, (a) => he.handling, L.fontAwesome("fas fa-video"), [fe.vehicle, fe.battlemech]),
  Ke(Ie.composure, (a) => he.charisma, (a) => he.willpower, L.fontAwesome("fas fa-meh"), [fe.character, fe.npc]),
  Ke(Ie.judgeIntentions, (a) => he.charisma, (a) => he.charisma, L.fontAwesome("fas fa-theater-masks"), [fe.character, fe.npc]),
  Ke(Ie.memory, (a) => he.logic, (a) => he.logic, L.fontAwesome("fas fa-brain"), [fe.character, fe.npc]),
  Ke(Ie.catch, (a) => he.reflexes, (a) => he.reflexes, L.fontAwesome("fas fa-baseball-ball"), [fe.character, fe.npc]),
  Ke(Ie.lift, (a) => he.strength, (a) => he.strength, L.fontAwesome("fas fa-dumbbell"), [fe.character, fe.npc])
], As = [
  bs(ws.physicalDefense, Ie.defense),
  bs(ws.physicalResistance, Ie.resistTorture),
  bs(ws.socialDefense, Ie.composure),
  bs(ws.mentalResistance, Ie.perception)
];
class ue {
  static init() {
    Handlebars.registerHelper("fixedDefenseCode", (e) => ue.fixedDefenseCode(e));
  }
  static all(e = void 0) {
    return e ? Js.filter(e) : Js;
  }
  static getActorActions(e) {
    return Js.filter((t) => t.actorTypes.includes(e.type) && t.condition(e));
  }
  static fixedDefenseCode(e) {
    return Ne.fixedDefenseCode[e] ?? e;
  }
  static getActorDefenses(e) {
    return As.map((t) => {
      const s = ue.getActorAction(e, t.actionCode);
      return ue._convertToDefense(s, t);
    }).filter((t) => t == null ? void 0 : t.code);
  }
  static getDefenseAttributeAction(e) {
    var t;
    return (t = As.find((s) => s.code == e)) == null ? void 0 : t.actionCode;
  }
  static getActorAction(e, t) {
    return ue.getActorActions(e).find((s) => s.code == t);
  }
  static getActorDefense(e, t) {
    t = ue.fixedDefenseCode(t);
    const s = As.find((r) => r.code == t), i = ue.getActorAction(e, s.actionCode);
    return $t.checkActorDefenseAction(i, e, s), ue._convertToDefense(i, s);
  }
  static _convertToDefense(e, t) {
    return e ? foundry.utils.mergeObject(
      t,
      e ?? {},
      { overwrite: !1, inplace: !1 }
    ) : void 0;
  }
  static getDefenses() {
    return As;
  }
  static prepareShortcut(e, t) {
    const s = ue.getActorActions(e).find((i) => i.code == t);
    if (s)
      return {
        icon: s.icon,
        label: s.labelkey,
        callback: (i) => i.actor.rollAttributeAction(t)
      };
  }
}
class bi {
  constructor() {
    this.remoteCalls = {}, game.socket.on(hi, async (e) => this.onSocketMessage(e));
  }
  static async register(e, t) {
    game.system.anarchy.remoteCall._register(e, t);
  }
  async _register(e, t) {
    if (this.remoteCalls[e])
      throw `RemoteCall msg ${e} is already registered`;
    foundry.utils.mergeObject(t, {
      callback: (s) => {
        console.log(Z + "RemoteCall [", e, "] (", s, ")");
      },
      condition: (s) => !0,
      multiple: !1
      /* true if multiple users should handle the message */
    }, { overwrite: !1 }), this.remoteCalls[e] = t, console.log(Z + "RemoteCall registered", e);
  }
  static call(e, t) {
    return game.system.anarchy.remoteCall._remoteCall(e, t);
  }
  _remoteCall(e, t) {
    const s = this.remoteCalls[e];
    return !s || s.condition(game.user) || !s.multiple && Ve.isUniqueConnectedGM() ? !1 : (game.socket.emit(hi, { msg: e, data: t }), !0);
  }
  async onSocketMessage(e) {
    const t = this.remoteCalls[e.msg];
    if (t) {
      const s = t.condition(game.user), i = t.multiple, r = Ve.isUniqueConnectedGM();
      s && (i || r) ? t.callback(e.data) : console.log(Z + "RemoteCall.onSocketMessage(", e, ") ignored :", s, i, r);
    } else
      console.log(Z + "RemoteCall: No callback registered for", e);
  }
}
const ra = "Users.blindMessageToGM";
class Ve {
  static init() {
    bi.register(ra, {
      callback: (e) => Ve.blindMessageToGM(e),
      condition: (e) => e.isGM
    });
  }
  static blindMessageToGM(e) {
    bi.call(ra, e) || ChatMessage.create({
      user: e.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      blind: !0,
      content: se(w.chat.blindMessageToGM, {
        user: game.user.name,
        message: e.content
      })
    });
  }
  static getUsers(e = (t) => !0) {
    return (game.version ? game.users : game.users.entities).filter(e);
  }
  static firstConnectedGM() {
    return Ve.getUsers((e) => e.isGM && e.active).sort(j.ascending((e) => e.id)).at(0) ?? {};
  }
  /**
   * @returns true pour un seul utilisateur: le premier GM connecté par ordre d'id
   */
  static isUniqueConnectedGM(e = game.user) {
    return e.id == Ve.firstConnectedGM().id;
  }
  static firstResponsible(e) {
    if (!(e != null && e.testUserPermission))
      return;
    const t = Ve.getUsers(
      (s) => s.active && e.testUserPermission(s, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER)
    ).sort(j.ascending((s) => s.id)).at(0);
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
const xt = w.actor.monitors, Xe = w.actor.counters, Ya = {
  armor: {
    path: "system.monitors.armor.value",
    monitor: (a) => a.system.monitors.armor,
    iconChecked: L.fontAwesome("fas fa-shield-slash"),
    iconUnchecked: L.fontAwesome("fas fa-shield-alt"),
    iconHit: L.fontAwesome("fas fa-bahai"),
    resource: xt.armor
  },
  fatigue: {
    path: "system.monitors.fatigue.value",
    monitor: (a) => a.system.monitors.fatigue,
    iconChecked: L.fontAwesome("fas fa-grimace"),
    iconUnchecked: L.fontAwesome("far fa-smile"),
    iconHit: L.fontAwesome("fas fa-bahai"),
    resource: xt.fatigue,
    overflow: (a) => g.monitors.physical,
    useArmor: !0
  },
  physical: {
    path: "system.monitors.physical.value",
    monitor: (a) => a.system.monitors.physical,
    iconChecked: L.fontAwesome("fas fa-heartbeat"),
    iconUnchecked: L.fontAwesome("far fa-heart"),
    iconHit: L.fontAwesome("fas fa-bahai"),
    resource: xt.physical,
    useArmor: !0
  },
  structure: {
    path: "system.monitors.structure.value",
    monitor: (a) => a.system.monitors.structure,
    iconChecked: L.fontAwesome("fas fa-car-crash"),
    iconUnchecked: L.fontAwesome("fas fa-car-alt"),
    iconHit: L.fontAwesome("fas fa-bahai"),
    resource: xt.structure
  },
  heat: {
    path: "system.monitors.heat.value",
    monitor: (a) => a.system.monitors.heat,
    iconChecked: L.fontAwesome("fas fa-fire"),
    iconUnchecked: L.fontAwesome("far fa-sun"),
    iconHit: L.fontAwesome("fas fa-temperature-high"),
    resource: xt.heat
  },
  criticals: {
    path: "system.hybrid.criticals.value",
    monitor: (a) => {
      var e;
      return ((e = a.system.hybrid) == null ? void 0 : e.criticals) ?? { value: 0, max: 0 };
    },
    iconChecked: L.fontAwesome("fas fa-bolt"),
    iconUnchecked: L.fontAwesome("far fa-dot-circle"),
    iconHit: L.fontAwesome("fas fa-exclamation-triangle"),
    resource: xt.structure
  },
  anarchy: {
    path: "system.counters.anarchy.value",
    monitor: (a) => ({
      value: a.system.counters.anarchy.value,
      max: 6
    }),
    iconChecked: L.iconPath(`${Xt}/anarchy-point.webp`, "checkbar-img"),
    iconUnchecked: L.iconPath(`${Xt}/anarchy-point-off.webp`, "checkbar-img"),
    resource: Xe.anarchy
  },
  plot: {
    path: "system.counters.anarchy.value",
    monitor: (a) => {
      const e = a.system.counters.anarchy.value;
      return { value: e, max: e + 1 };
    },
    iconChecked: L.iconPath(`${Xt}/danger-point.webp`, "checkbar-img"),
    iconUnchecked: L.iconPath(`${Xt}/danger-point-off.webp`, "checkbar-img"),
    resource: Xe.anarchy
  },
  sceneAnarchy: {
    path: "system.counters.edgePools.chaos.value",
    monitor: (a) => {
      const e = a.getEdgePoolValue(g.counters.edgePools.chaos), t = a.getAttributeValue(g.actorAttributes.edge);
      return { value: e, max: t };
    },
    iconChecked: L.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    iconUnchecked: L.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    resource: Xe.edgePools.chaos
  },
  grit: {
    path: "system.counters.edgePools.grit.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(g.counters.edgePools.grit), max: a.getAttributeValue(g.actorAttributes.edge) }),
    iconChecked: L.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    iconUnchecked: L.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    resource: Xe.edgePools.grit
  },
  insight: {
    path: "system.counters.edgePools.insight.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(g.counters.edgePools.insight), max: a.getAttributeValue(g.actorAttributes.edge) }),
    iconChecked: L.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    iconUnchecked: L.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    resource: Xe.edgePools.insight
  },
  legend: {
    path: "system.counters.edgePools.legend.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(g.counters.edgePools.legend), max: a.getAttributeValue(g.actorAttributes.edge) }),
    iconChecked: L.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    iconUnchecked: L.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    resource: Xe.edgePools.legend
  },
  credibility: {
    path: "system.counters.edgePools.credibility.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(g.counters.edgePools.credibility), max: a.getAttributeValue(g.actorAttributes.edge) }),
    iconChecked: L.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    iconUnchecked: L.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    resource: Xe.edgePools.credibility
  },
  rumor: {
    path: "system.counters.edgePools.rumor.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(g.counters.edgePools.rumor), max: a.getAttributeValue(g.actorAttributes.edge) }),
    iconChecked: L.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    iconUnchecked: L.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    resource: Xe.edgePools.rumor
  }
}, Fe = foundry.utils.mergeObject(Ya, {});
class N {
  static init() {
    Handlebars.registerHelper("iconCheckbar", N.iconCheckbar), Handlebars.registerHelper("iconCheckbarHit", N.iconHit);
  }
  static hackCheckbars(e) {
    if (e) {
      const t = foundry.utils.mergeObject(Ya, {});
      foundry.utils.mergeObject(t, e, { recursive: !0 }), foundry.utils.mergeObject(Fe, t, { overwrite: !0 });
    }
  }
  static iconCheckbar(e, t) {
    return t ? N.iconChecked(e) : N.iconUnchecked(e);
  }
  static iconChecked(e) {
    var t;
    return (t = Fe[e]) == null ? void 0 : t.iconChecked;
  }
  static iconUnchecked(e) {
    var t;
    return (t = Fe[e]) == null ? void 0 : t.iconUnchecked;
  }
  static iconHit(e) {
    var t, s;
    return ((t = Fe[e]) == null ? void 0 : t.iconHit) ?? ((s = Fe[e]) == null ? void 0 : s.iconChecked);
  }
  static useArmor(e) {
    var t;
    return (t = Fe[e]) == null ? void 0 : t.useArmor;
  }
  static max(e, t) {
    var i;
    const s = (i = Fe[t]) == null ? void 0 : i.monitor(e);
    return ((s == null ? void 0 : s.max) ?? 0) + ((s == null ? void 0 : s.maxBonus) ?? 0);
  }
  static value(e, t) {
    var i;
    const s = (i = Fe[t]) == null ? void 0 : i.monitor(e);
    return (s == null ? void 0 : s.value) ?? 0;
  }
  static resistance(e, t, s = void 0) {
    return N.resistanceDetail(e, t, s).value;
  }
  static resistanceDetail(e, t, s = void 0) {
    var o, c;
    const i = (o = Fe[t]) == null ? void 0 : o.monitor(e), r = N._resolveResistance(i == null ? void 0 : i.resistance, s), n = N._resolveResistance(i == null ? void 0 : i.resistanceBonus, s), l = s === void 0 ? 0 : Number(((c = i == null ? void 0 : i.resistanceBonusByType) == null ? void 0 : c[s]) ?? 0);
    return {
      value: r.value + n.value + l,
      damageType: s,
      source: r.source,
      bonusSource: n.source,
      bonusByType: l,
      usedType: r.source === "type" || n.source === "type" || l !== 0
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
      case g.monitors.anarchy:
        return await N.setAnarchy(e, s);
      case g.monitors.sceneAnarchy:
        return await N.setSceneAnarchy(e, s);
    }
    return await N.setCheckbar(e, t, s);
  }
  static getCounterValue(e, t, s) {
    switch (t) {
      case g.monitors.anarchy:
        return N.getAnarchy(e, t);
    }
    return N.value(e, t);
  }
  static async setCheckbar(e, t, s) {
    if (s == N.getCounterValue(e, t))
      return;
    const i = Fe[t];
    if (i.path) {
      const r = N.max(e, t);
      if (r <= 0)
        return;
      await N._manageOverflow(i, e, t, s, r), s = Math.min(s, r), $t.checkOutOfRange(i.resource, s, 0, r), await e.setCheckbarValue(i.path, s);
    }
  }
  static async _manageOverflow(e, t, s, i, r) {
    if (i > r) {
      const n = e.overflow ? e.overflow(t) : void 0, l = e.recomputeOverflow ? e.recomputeOverflow(i - r) : i - r;
      n && l > 0 && (N._notifyOverflow(t, s, l, n), await N.addCounter(t, n, l));
    }
  }
  static _notifyOverflow(e, t, s, i) {
    const r = se(w.actor.monitors.overflow, {
      actor: e.name,
      monitor: w.actor.monitors[t],
      overflow: s,
      overflowMonitor: w.actor.monitors[i]
    });
    ui.notifications.warn(r);
  }
  static async _manageFatigueOverflow(e, t, s) {
    await N.addCounter(e, g.monitors.physical, t - s);
  }
  static async setAnarchy(e, t) {
    if (e.hasOwnAnarchy()) {
      if (e.hasGMAnarchy()) {
        await game.system.anarchy.gmAnarchy.setAnarchy(t), e.render();
        return;
      }
      await N._setAnarchyMonitor(e, g.monitors.anarchy, t);
    }
  }
  static async setSceneAnarchy(e, t) {
    await N._setAnarchyMonitor(e, g.monitors.sceneAnarchy, t);
  }
  static async _setAnarchyMonitor(e, t, s) {
    const i = N.value(e, t);
    await N.setCheckbar(e, t, s), game.user.isGM || N.notifyAnarchyChange(e, t, i, s);
  }
  static getAnarchy(e, t) {
    return !game.user.isGM && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) || t == Xe.anarchy && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) ? 0 : N.value(e, t);
  }
  static notifyAnarchyChange(e, t, s, i) {
    Ve.blindMessageToGM({
      from: game.user.id,
      content: se(
        w.gmManager.playerChangedAnarchy,
        {
          user: game.user.name,
          actor: e.name,
          monitor: w.actor.counters[t],
          from: s,
          to: i
        }
      )
    });
  }
}
const { loadTemplates: pn, renderTemplate: hn } = foundry.applications.handlebars, na = {
  highlighted: ["far fa-times-circle", "fas fa-dice-one", "fas fa-dice-two", "fas fa-dice-three", "fas fa-dice-four", "fas fa-dice-five", "fas fa-dice-six"],
  dimmed: ["far fa-times-circle", "far fa-dice-one", "far fa-dice-two", "far fa-dice-three", "far fa-dice-four", "far fa-dice-five", "far fa-dice-six"]
};
class tt {
  static init() {
    Hooks.once("ready", async () => await this.onReady()), Handlebars.registerHelper("dice-cursor-array", (e, t) => tt.array(e ?? 0, t ?? 5)), Handlebars.registerHelper("dice-cursor-fas", (e, t) => tt.fasClass(e, t)), Handlebars.registerHelper("dice-cursor-active", (e, t) => tt.activeClass(e, t)), Handlebars.registerHelper("dice-cursor-color", (e, t) => tt.colorClass(e, t));
  }
  static async onReady() {
    await pn([
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
    return tt.isActive(e, t) ? "active" : "inactive";
  }
  static fasClass(e, t) {
    const s = tt.isActive(e, t) ? na.highlighted : na.dimmed;
    return tt.$getFas(s, Math.abs(e));
  }
  static colorClass(e, t) {
    return e == 0 || !t ? e < 0 ? "fixed-dice-malus" : "fixed-dice-bonus" : e < 0 ? "variable-dice-malus" : "variable-dice-bonus";
  }
  static $getFas(e, t) {
    return e[t > 6 ? t % 6 : t];
  }
  static async diceCursor({ value: e, min: t, max: s, editable: i }) {
    return await hn("systems/mwd/templates/roll/parts/dice-cursor.hbs", {
      value: e,
      min: t,
      max: s,
      editable: i
    });
  }
}
const ye = {
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
}, oa = "anarchy-", Ja = `${S}.${ye.ANARCHY_HACK}`, wi = {
  id: S,
  name: "Standard Shadowrun Anarchy",
  hack: {
    checkbars: () => Fe
  }
};
globalThis.ANARCHY_HOOKS = ye;
globalThis.SETTING_KEY_ANARCHY_HACK = Ja;
globalThis.SHADOWRUN_ANARCHY_NO_HACK = wi;
class Ot {
  constructor() {
    this.hooks = [], this.hacks = {}, this.hackNames = {}, this.hookMethods = {}, this._register(ye.ANARCHY_HACK), Hooks.on(ye.ANARCHY_HACK, (e) => e(wi)), Hooks.on("updateSetting", async (e, t, s, i) => this.onUpdateSetting(e, t, s, i)), Hooks.once("ready", () => this.onReady()), Hooks.on("getSceneControlButtons", (e) => {
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
    Hooks.callAll(ye.ANARCHY_HACK, (e) => {
      this.hacks[e.id] = e, this.hackNames[e.id] = e.name;
    }), game.settings.register(S, ye.ANARCHY_HACK, {
      scope: "world",
      name: w.settings.anarchyHack.name,
      hint: w.settings.anarchyHack.hint,
      config: !0,
      default: wi.id,
      choices: this.hackNames,
      type: String
    }), this.applySelectedAnarchyHack();
  }
  async onUpdateSetting(e, t, s, i) {
    e.key == Ja && this.applySelectedAnarchyHack();
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
    return this.hacks[game.settings.get(S, ye.ANARCHY_HACK)];
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
    Ot.instance()._register(e);
  }
  _register(e) {
    if (console.log(Z + "HooksManager.register", e), !e.startsWith(oa))
      throw `For safety Anarchy Hooks names must be prefixed by '${oa}'`;
    this.hooks.push(e);
  }
}
const la = [
  g.itemType.assetModule,
  g.itemType.mechWeapon,
  g.itemType.personalWeapon,
  "weapon"
];
class G {
  constructor() {
    this.modifiers = {
      groups: J.mapObjetToKeyValue(w.modifier.group, "key", "label"),
      roll: G._buildGroupOptions("roll"),
      attribute: G._buildGroupOptions("attribute"),
      monitor: G._buildGroupOptions("monitor"),
      other: G._buildGroupOptions("other")
    }, Hooks.once("ready", () => this.onReady());
  }
  static _buildGroupOptions(e) {
    switch (e) {
      case "attribute":
        return {
          label: w.modifier.group[e],
          effects: J.hbsAttributes.map((t) => ({ key: t.value, label: t.labelkey })),
          categories: []
        };
    }
    return {
      label: w.modifier.group[e],
      effects: J.mapObjetToKeyValue(w.modifier[e].effect, "key", "label"),
      categories: J.mapObjetToKeyValue(w.modifier[e].category, "key", "label")
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
                return J.getDamageTypes().map((r) => ({ key: r.value, label: r.labelkey }));
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
        return J.getAttributes().map((s) => ({ key: s.value, label: s.labelkey }));
      case "skill":
        return game.system.anarchy.skills.getSkills().map((s) => ({ key: s.code, label: s.labelkey }));
      case "attributeAction":
        const t = ue.all().map((s) => ({ key: s.code, label: s.labelkey }));
        return j.distinct(t.map((s) => s.key)).map((s) => t.find((i) => i.key == s));
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
            return s.subCategory == e.attributeAction || s.subCategory == ue.getDefenseAttributeAction(e.defenseAction);
        }
      return !1;
    };
  }
  static computeRollModifiers(e, t, s) {
    const i = G.buildRollModifiersFilter(t, s), r = (c) => c.group == "roll" && c.effect == s && i(c), n = G._activeItems(e).map((c) => G.itemModifiers(c, r)).reduce((c, u) => c.concat(u), []).sort(j.descending((c) => c.modifier.value)), l = G.$sumAssetModuleModifiers(n.filter((c) => la.includes(c.item.type)).map((c) => c.modifier.value)), o = j.sumValues(n.filter((c) => !la.includes(c.item.type)).map((c) => c.modifier.value));
    return {
      value: l + o,
      sources: n
    };
  }
  static $sumAssetModuleModifiers(e) {
    const t = e.find((r) => r > 3) ?? 0, s = j.sumValues(e.filter((r) => r < 0)), i = Math.min(3, j.sumValues(e.filter((r) => r > 0 && r <= 3)));
    return s + Math.max(i, t);
  }
  static computeModifiers(e, t, s = void 0, i = void 0) {
    const r = G._createFilter(t, s, i), n = G._activeItems(e).map((o) => G.itemModifiers(o, r)).reduce((o, c) => o.concat(c), []);
    return {
      value: j.sumValues(n, (o) => o.modifier.value),
      sources: n
    };
  }
  static sumMonitorModifiers(e, t, s, i = void 0) {
    return G.sumModifiers(G._activeItems(e), "monitor", t, s, i);
  }
  static sumModifiers(e, t, s, i, r = void 0) {
    const n = G._createFilter(t, s, i, r), l = G._activeItems(e).map((o) => G.itemModifiers(o, n)).reduce((o, c) => o.concat(c), []);
    return j.sumValues(l, (o) => o.modifier.value);
  }
  static _createFilter(e, t, s, i = void 0) {
    return (r) => r.group == e && r.effect == (t ?? r.effect) && r.category == (s ?? r.category) && (i == null ? !0 : r.subCategory == i);
  }
  static countModifiers(e, t, s = void 0, i = void 0) {
    const r = G._createFilter(t, s, i);
    return G._activeItems(e).map((l) => G.itemModifiers(l, r)).reduce((l, o) => l.concat(o), []).count;
  }
  static itemModifiers(e, t) {
    return G._listItemModifiers(e, t).map((s) => G._itemModifier(e, s));
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
const { loadTemplates: Qs, renderTemplate: Cc } = foundry.applications.handlebars, Q = {
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
}, ca = 4, fn = [
  // attribute1
  {
    code: "attribute1",
    options: {
      order: 1,
      category: Q.pool,
      hbsTemplateRoll: `${B}/roll/parts/select-attribute.hbs`
    },
    condition: (a) => Object.values(Ne.rollType).includes(a.mode),
    isUsed: (a) => !0,
    factory: (a) => {
      var t;
      const e = a.attribute1 ?? ((t = a.skill) == null ? void 0 : t.system.attribute);
      return {
        labelkey: e ? w.attributes[e] : w.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: a.skill },
        selected: e,
        choices: J.getAttributes((s) => a.attributes.includes(s))
      };
    }
  },
  // attribute2
  {
    code: "attribute2",
    options: {
      order: 1,
      category: Q.pool,
      hbsTemplateRoll: `${B}/roll/parts/select-attribute.hbs`,
      hbsTemplateChat: `${B}/chat/parts/pool-attribute2.hbs`
    },
    condition: (a) => [Ne.rollType.attribute, Ne.rollType.attributeAction, Ne.rollType.defense].includes(a.mode),
    isUsed: (a) => a.used,
    onChecked: (a, e) => a.used = !!e,
    factory: (a) => {
      const e = a.attribute2;
      return {
        labelkey: e ? w.attributes[e] : w.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: Ne.rollType.attribute == a.mode },
        selected: e,
        choices: J.getAttributes((t) => a.attributes.includes(t))
      };
    }
  },
  // skill
  {
    code: "skill",
    options: {
      flags: {},
      order: 3,
      category: Q.pool,
      hbsTemplateRoll: `${B}/roll/parts/input-numeric.hbs`
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
      category: Q.pool,
      hbsTemplateRoll: `${B}/roll/parts/check-option.hbs`
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
      category: Q.pool,
      value: 0,
      labelkey: w.common.roll.modifiers.social.credibility,
      hbsTemplateRoll: `${B}/roll/parts/input-numeric.hbs`
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
      category: Q.pool,
      hbsTemplateRoll: `${B}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 4
    },
    factory: (a) => vt.computeRollModifiers(Q.pool, a)
  },
  // wounds
  {
    code: "wounds",
    options: {
      flags: { optional: !0 },
      order: 10,
      category: Q.pool,
      labelkey: w.common.roll.modifiers.wounds,
      hbsTemplateRoll: `${B}/roll/parts/input-numeric.hbs`
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
      category: Q.pool,
      value: 0,
      labelkey: w.common.roll.modifiers.other,
      hbsTemplateRoll: `${B}/roll/parts/input-numeric.hbs`,
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
      category: Q.glitch,
      value: 0,
      labelkey: w.common.roll.modifiers.glitch,
      hbsTemplateRoll: `${B}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${B}/chat/parts/glitch.hbs`,
      min: 0,
      max: 5
    },
    isUsed: (a) => a.value > 0,
    factory: (a) => {
      const e = a.actor.getWounds(), t = vt.computeRollModifiers(Q.glitch, a);
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
      category: Q.glitch,
      value: 0,
      labelkey: w.common.roll.modifiers.social.rumor,
      hbsTemplateRoll: `${B}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${B}/chat/parts/glitch.hbs`,
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
      category: Q.reroll,
      labelkey: w.common.roll.modifiers.reroll,
      hbsTemplateRoll: `${B}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: ca
    },
    factory: (a) => {
      const e = vt.computeRollModifiers(Q.reroll, a), t = vt.computeRollModifiers(Q.rerollMax, a);
      return foundry.utils.mergeObject(e, {
        max: ca + Math.max(0, t.value ?? 0)
      });
    }
  },
  // reduction from opponent
  {
    code: "reduced",
    options: {
      order: 29,
      category: Q.pool,
      labelkey: w.common.roll.modifiers.reduced,
      hbsTemplateRoll: `${B}/roll/parts/input-numeric.hbs`,
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
      category: Q.rerollForced,
      labelkey: w.common.roll.modifiers.rerollForced,
      hbsTemplateRoll: `${B}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 0
    },
    factory: (a) => {
      var t;
      const e = vt.computeRollModifiers(Q.successReroll, a);
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
      category: Q.pool,
      value: 0,
      min: 0,
      max: 3,
      labelkey: w.common.roll.modifiers.anarchyDisposition,
      hbsTemplateRoll: `${B}/roll/parts/check-option.hbs`
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
      category: Q.risk,
      value: 0,
      labelkey: w.common.roll.modifiers.anarchyRisk,
      hbsTemplateRoll: `${B}/roll/parts/check-option.hbs`,
      hbsTemplateChat: `${B}/chat/parts/anarchy-risk.hbs`
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
      category: Q.edge,
      labelkey: w.common.roll.modifiers.edge,
      hbsTemplateRoll: `${B}/roll/parts/check-option.hbs`
    },
    isUsed: (a) => a.used,
    condition: (a) => a.options.canUseEdge && a.actor.getRemainingEdge(),
    onChecked: (a, e) => {
      a.used = e, a.value = e ? 1 : 0;
    },
    factory: (a) => {
      var i;
      const t = [
        g.counters.edgePools.grit,
        g.counters.edgePools.chaos,
        g.counters.edgePools.insight,
        g.counters.edgePools.rumor,
        g.counters.edgePools.legend,
        g.counters.edgePools.credibility
      ].map((r) => {
        const n = a.actor.getEdgePoolValue(r);
        return {
          code: r,
          label: w.actor.counters.edgePools[r] ?? r,
          value: n
        };
      }), s = ((i = t.find((r) => r.value > 0)) == null ? void 0 : i.code) ?? g.counters.edgePools.grit;
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
      category: Q.opponentPool,
      labelkey: w.common.roll.modifiers.opponentPool,
      hbsTemplateRoll: `${B}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => vt.computeRollModifiers(Q.opponentPool, a),
    condition: (a) => !a.attributeAction
  },
  // force opponent rerolls
  {
    code: "opponentReroll",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: Q.opponentReroll,
      value: 0,
      labelkey: w.common.roll.modifiers.opponentReroll,
      hbsTemplateRoll: `${B}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => vt.computeRollModifiers(Q.opponentReroll, a),
    condition: (a) => !a.attributeAction
  }
];
class vt {
  constructor() {
    this.registeredParameters = {}, Ot.register(ye.REGISTER_ROLL_PARAMETERS), Ot.register(ye.MODIFY_ROLL_PARAMETER), Hooks.on(ye.MODIFY_ROLL_PARAMETER, (e) => this._validate(e)), Hooks.once(ye.REGISTER_ROLL_PARAMETERS, (e) => fn.forEach(
      (t) => e(t)
    )), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(ye.REGISTER_ROLL_PARAMETERS, async (t) => {
      Hooks.callAll(ye.MODIFY_ROLL_PARAMETER, t), t.ignore || await this._register(t);
    });
    const e = j.distinct([].concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateRoll)).concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateChat)).filter((t) => typeof t == "string" && t.length > 0));
    await Qs(j.distinct(e)), await Qs([`${B}/roll/parts/parameter-label.hbs`]);
  }
  _validate(e) {
    e.code || (console.error(`${Z} RollParameter does not have a code`, e), e.ignore = !0);
  }
  async _register(e) {
    if (this.registeredParameters[e.code]) {
      console.error(`${Z} RollParameter ${e.code} is already registered`, e);
      return;
    }
    e.onChecked || (e.onChecked = (t, s) => t.used = s), e.onValue = (t, s) => t.value = s, this.registeredParameters[e.code] = e;
  }
  async _optionalLoadTemplate(e) {
    e && await Qs([e]);
  }
  build(e) {
    return Object.values(this.registeredParameters).filter((t) => !t.condition || t.condition(e)).map((t) => this._computeParameter(t, e));
  }
  compute(e) {
    const t = e.filter((r) => this.isParameterUsed(r)), s = j.classify(t, (r) => r.category), i = {};
    return Object.values(s).forEach((r) => i[r[0].category] = j.sumValues(r, (n) => n.value ?? (n.optional ? 1 : 0))), i;
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
    return G.computeRollModifiers(i, t, e);
  }
}
const { ApplicationV2: gn, HandlebarsApplicationMixin: yn } = foundry.applications.api, { loadTemplates: bn, renderTemplate: wn } = foundry.applications.handlebars;
var Hs, Qa;
const Te = class Te extends yn(gn) {
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
    await bn([
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
    const s = foundry.utils.mergeObject(Te.prepareActorRoll(e), {
      mode: Ne.rollType.attribute,
      attribute1: t
    });
    await Te.create(s);
  }
  static async rollAttributeAction(e, t) {
    const s = foundry.utils.mergeObject(Te.prepareActorRoll(e), {
      mode: Ne.rollType.attributeAction,
      attributeAction: t.code,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e)
    });
    await Te.create(s);
  }
  static async rollSkill(e, t, s) {
    const i = foundry.utils.mergeObject(Te.prepareActorRoll(e), {
      mode: Ne.rollType.skill,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? g.actorAttributes.reflexes,
      specialization: s
    });
    await Te.create(i);
  }
  static async rollWeapon(e, t, s, i) {
    const r = foundry.utils.mergeObject(Te.prepareActorRoll(e), {
      mode: Ne.rollType.weapon,
      weapon: s,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? e.getPhysicalAgility(),
      specialization: void 0,
      targeting: i
    });
    await Te.create(r);
  }
  static async rollDefense(e, t, s) {
    const i = foundry.utils.mergeObject(Te.prepareActorRoll(e), {
      mode: Ne.rollType.defense,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e),
      defenseAction: t.code,
      attackRoll: s.attackRoll,
      tokenId: s.defenderTokenId,
      choiceChatMessageId: s.choiceChatMessageId
    });
    await Te.create(i);
  }
  static async itemAttributeRoll(e, t) {
    const s = foundry.utils.mergeObject(Te.prepareActorRoll(e.actor), {
      mode: Ne.rollType.attribute,
      item: e,
      attribute1: t,
      attributes: e.actor.getUsableAttributes(e)
    });
    await Te.create(s);
  }
  static async create(e) {
    var n;
    const t = E(n = Te, Hs, Qa).call(n, e), s = await wn(`${B}/roll/roll-dialog-title.hbs`, t), i = {
      id: `roll-dialog-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...Te.DEFAULT_OPTIONS.classes],
      window: { title: s }
    };
    return new Te({ roll: t }, i).render({ force: !0 });
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
      const i = this._getRollParameter(s), r = this._getEventItem(s, this.roll.actor), n = s.currentTarget.value, l = this.roll.actor.getAttributeValue(n, r);
      this.roll[i.code] = n, await this._setParameterSelectedOption(i, n, l);
    }), this.html.find(".check-optional").click(async (s) => {
      const i = this._getRollParameter(s);
      i.onChecked(i, s.currentTarget.checked), i.category == Q.pool && await this._updateParameterValue(i, i.value), i.code == "edge" && this.html.find(`.parameter[data-parameter-code='${i.code}'] .edge-pool-select`).prop("disabled", !i.used);
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
    return await tt.diceCursor({
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
Hs = new WeakSet(), Qa = function(e) {
  const t = game.system.anarchy.rollParameters.build(e).sort(j.ascending((s) => s.order ?? 200));
  return foundry.utils.mergeObject(e, {
    ENUMS: J.getEnums((s) => e.attributes.includes(s)),
    ANARCHY: w,
    parameters: t
  });
}, we(Te, Hs), R(Te, "PARTS", {
  body: {
    template: `${B}/roll/roll-dialog.hbs`
  }
});
let Je = Te;
const Ui = 2, Ai = "skillSpecializationCatalog", An = [
  { key: "running", label: "Running" },
  { key: "jumping", label: "Jumping" },
  { key: "swimming", label: "Swimming" },
  { key: "climbing", label: "Climbing" },
  { key: "acrobatics", label: "Acrobatics" }
], Za = /* @__PURE__ */ new Set(), Yt = [
  // Strength
  { code: "athletics", label: "Athletics", attribute: "strength", icon: `${U}/athletics.svg`, domains: ["physical"], specializations: An },
  { code: "heavyWeapons", label: "Heavy Weapons", attribute: "strength", icon: `${U}/heavy-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  // Reflexes
  { code: "escapeArtist", label: "Escape Artist", attribute: "reflexes", icon: `${U}/escape-artist.svg`, domains: ["physical"] },
  { code: "gunnery", label: "Gunnery", attribute: "reflexes", icon: `${U}/vehicle-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "meleeCombat", label: "Melee Combat", attribute: "reflexes", icon: `${U}/close-combat.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "piloting", label: "Piloting", attribute: "reflexes", icon: `${U}/piloting-ground-steering-wheel.svg`, domains: ["physical"] },
  { code: "projectileWeapons", label: "Projectile Weapons", attribute: "reflexes", icon: `${U}/projectile-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "firearms", label: "Firearms", attribute: "reflexes", icon: `${U}/firearms.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "stealth", label: "Stealth", attribute: "reflexes", icon: `${U}/stealth.svg`, domains: ["physical"] },
  { code: "zeroGOps", label: "Zero-G Operations", attribute: "reflexes", icon: `${U}/fly.svg`, domains: ["physical"] },
  // Intelligence
  { code: "art", label: "Art", attribute: "intelligence", icon: `${U}/art.svg`, domains: ["mental"] },
  { code: "artillery", label: "Artillery", attribute: "intelligence", icon: `${U}/artillery.svg`, domains: ["mental"] },
  { code: "systemOps", label: "System Operations", attribute: "intelligence", icon: `${U}/electronics.svg`, domains: ["mental"] },
  { code: "computers", label: "Computers", attribute: "intelligence", icon: `${U}/hacking.svg`, domains: ["mental"] },
  { code: "demolitions", label: "Demolitions", attribute: "intelligence", icon: `${U}/demolition.svg`, domains: ["mental"] },
  { code: "medTech", label: "Medtech", attribute: "intelligence", icon: `${U}/biotech.svg`, domains: ["mental"] },
  { code: "science", label: "Science", attribute: "intelligence", icon: `${U}/skills.svg`, domains: ["mental"] },
  { code: "perception", label: "Perception", attribute: "intelligence", icon: `${U}/skills.svg`, domains: ["mental"] },
  { code: "tactics", label: "Tactics", attribute: "intelligence", icon: `${U}/skills.svg`, domains: ["mental"] },
  { code: "technician", label: "Technician", attribute: "intelligence", icon: `${U}/engineering.svg`, domains: ["mental"] },
  { code: "tracking", label: "Tracking", attribute: "intelligence", icon: `${U}/tracking.svg`, domains: ["physical", "mental"] },
  { code: "navigation", label: "Navigation", attribute: "intelligence", icon: `${U}/piloting-other.svg`, domains: ["mental"] },
  // Guts
  { code: "administration", label: "Administration", attribute: "willpower", icon: `${U}/knowledge.svg`, domains: ["social", "mental"] },
  { code: "animalHandling", label: "Animal Handling", attribute: "willpower", icon: `${U}/animals.svg`, domains: ["physical", "mental"] },
  { code: "survival", label: "Survival", attribute: "willpower", icon: `${U}/survival.svg`, domains: ["physical", "mental"] },
  // Charisma
  { code: "acting", label: "Acting", attribute: "charisma", icon: `${U}/con-art.svg`, domains: ["social"] },
  { code: "disguise", label: "Disguise", attribute: "charisma", icon: `${U}/disguise.svg`, domains: ["social", "mental"] },
  { code: "leadership", label: "Leadership", attribute: "charisma", icon: `${U}/psychology.svg`, domains: ["social"] },
  { code: "negotiation", label: "Negotiation", attribute: "charisma", icon: `${U}/negotiation.svg`, domains: ["social"] },
  { code: "etiquette", label: "Etiquette", attribute: "charisma", icon: `${U}/etiquette.svg`, domains: ["social"] },
  { code: "streetwise", label: "Streetwise", attribute: "charisma", icon: `${U}/etiquette2.svg`, domains: ["social"] },
  { code: "intimidation", label: "Intimidation", attribute: "charisma", icon: `${U}/intimidation.svg`, domains: ["social", "mental"] }
].map(Tn);
for (const a of Yt)
  Za.add(a.code);
function Tn(a) {
  return {
    ...a,
    label: a.label ?? a.code,
    icon: a.icon ?? `${fs}/icons/skills/skills.svg`,
    specializations: qi(a.specializations)
  };
}
function Gi(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function qi(a = []) {
  const e = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((t) => {
    const s = Gi((t == null ? void 0 : t.key) ?? (t == null ? void 0 : t.label) ?? t);
    return !s || e.has(s) ? null : (e.add(s), {
      key: s,
      label: String((t == null ? void 0 : t.label) ?? (t == null ? void 0 : t.key) ?? t ?? s).trim() || s
    });
  }).filter(Boolean);
}
function Sn(a = []) {
  const e = new Error(a[0] ?? "Invalid skill specialization data.");
  return e.validationErrors = a, e;
}
function kn() {
  const a = {};
  for (const e of Yt) {
    const t = (Array.isArray(e.specializations) ? e.specializations : []).map((s) => String((s == null ? void 0 : s.label) ?? "").trim()).filter(Boolean);
    t.length && (a[e.code] = t);
  }
  return a;
}
const Mn = Object.freeze(kn());
function vn(a, e = [], { strict: t = !1, errors: s = [] } = {}) {
  var r, n;
  if (!Array.isArray(e)) {
    if (t) {
      const l = ((r = Ti(a)) == null ? void 0 : r.label) ?? a;
      s.push(`${l}: expected an array of specialization labels.`);
    }
    return [];
  }
  const i = [];
  for (const l of e) {
    const o = String(l ?? "").trim();
    if (!o) {
      if (t) {
        const c = ((n = Ti(a)) == null ? void 0 : n.label) ?? a;
        s.push(`${c}: specialization labels cannot be blank.`);
      }
      continue;
    }
    i.push(o);
  }
  return qi(i).map((l) => l.label);
}
function Ti(a) {
  return Yt.find((e) => e.code === a);
}
function Xa(a, { strict: e = !1 } = {}) {
  const t = a && typeof a == "object" && !Array.isArray(a) ? a : {}, s = [], i = {};
  for (const [r, n] of Object.entries(t)) {
    if (!Za.has(r)) {
      e && s.push(`Unknown skill code "${r}".`);
      continue;
    }
    const l = vn(r, n, { strict: e, errors: s });
    l.length && (i[r] = l);
  }
  if (e && s.length) throw Sn(s);
  return Object.fromEntries(
    Yt.map((r) => [r.code, i[r.code]]).filter(([, r]) => Array.isArray(r) && r.length)
  );
}
function En() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${S}.${Ai}`))
      return game.settings.get(S, Ai);
  } catch {
  }
  return sr();
}
function er() {
  const a = Xa(En(), { strict: !1 });
  return Object.fromEntries(
    Object.entries(a).map(([e, t]) => [
      e,
      qi(t)
    ])
  );
}
function tr(a = [], { allowedKeys: e = null } = {}) {
  const t = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((s) => Gi(s)).filter((s) => !s || t.has(s) || e && !e.has(s) ? !1 : (t.add(s), !0));
}
function at(a) {
  const e = Ti(a);
  if (e)
    return {
      ...e,
      specializations: It(e.code)
    };
}
function _s() {
  const a = er();
  return [...Yt].map((e) => ({
    ...e,
    specializations: [...a[e.code] ?? []]
  })).sort((e, t) => e.label.localeCompare(t.label));
}
function It(a) {
  return [...er()[a] ?? []];
}
function Ki(a, e) {
  const t = Gi(e);
  if (t)
    return It(a).find((s) => s.key === t);
}
function Rn(a, e) {
  var t;
  return ((t = Ki(a, e)) == null ? void 0 : t.label) ?? "";
}
function sr() {
  return foundry.utils.deepClone(Mn);
}
function zs(a, { strict: e = !1 } = {}) {
  return Xa(a, { strict: e });
}
function $s(a = []) {
  return tr(a);
}
function Cn(a, e = []) {
  const t = new Set(It(a).map((i) => i.key)), s = new Set(tr(e, { allowedKeys: t }));
  return It(a).filter((i) => s.has(i.key)).map((i) => i.key);
}
function Si(a, e) {
  var t, s;
  return $s(
    ((s = (t = a == null ? void 0 : a.skills) == null ? void 0 : t[e]) == null ? void 0 : s.specializations) ?? []
  );
}
function js(a, e) {
  return Cn(
    e,
    Si(a, e)
  );
}
function ir(a, e) {
  const t = new Set(js(a, e));
  return It(e).filter((s) => t.has(s.key));
}
function Nn(a) {
  const e = Math.ceil(a.length / 2);
  return { left: a.slice(0, e), right: a.slice(e) };
}
function Pn(a) {
  var e, t;
  a.skills ?? (a.skills = {});
  for (const s of Yt) {
    const i = (e = a.skills)[t = s.code] ?? (e[t] = {});
    i.rating == null && (i.rating = 0), i.bonus == null && (i.bonus = 0), i.specializations = $s(i.specializations);
  }
}
function Dn(a) {
  const e = _s(), { left: t, right: s } = Nn(e), i = (r) => {
    var p, b, y, f, A, M;
    const n = r.code, l = r.attribute, o = Number(((b = (p = a == null ? void 0 : a.skills) == null ? void 0 : p[n]) == null ? void 0 : b.rating) ?? 0), c = Number(((f = (y = a == null ? void 0 : a.attributes) == null ? void 0 : y[l]) == null ? void 0 : f.value) ?? 0), u = Number(((M = (A = a == null ? void 0 : a.skills) == null ? void 0 : A[n]) == null ? void 0 : M.bonus) ?? 0), m = ir(a, n), d = It(n).filter((k) => !m.some((P) => P.key === k.key)), h = c + o + u;
    return {
      code: n,
      label: r.label,
      icon: r.icon,
      attribute: l,
      attributeLabel: J != null && J.localizeAttribute ? J.localizeAttribute(l) : l,
      rating: o,
      base: c,
      bonus: u,
      total: h,
      rollPayload: JSON.stringify({ intent: "skill", key: n }),
      canAddSpecialization: d.length > 0,
      specializations: m.map((k) => ({
        ...k,
        bonus: Ui,
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
const ua = Object.freeze({
  weapon: g.itemType.personalWeapon,
  shadowamp: g.itemType.assetModule
}), ar = Object.freeze({
  contact: "systems/mwd/img/default/mystery-man.svg",
  gear: "systems/mwd/img/default/Default_Gear.svg",
  quality: "systems/mwd/img/default/card-joker.svg",
  assetModule: "systems/mwd/img/default/upgrade.svg",
  skill: "systems/mwd/img/default/Default_Skill.svg",
  lifeModule: "systems/mwd/img/default/book.svg",
  mechWeapon: "systems/mwd/img/default/Default_Weapon.svg",
  personalWeapon: "systems/mwd/img/colt-m1911.svg",
  armor: "systems/mwd/img/default/Default_Armor.svg"
}), _t = Object.freeze(["close", "near", "far", "extreme"]), ma = Object.freeze({
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
});
function Et(a) {
  return nt(a);
}
function rr(a) {
  return a === "long" ? "extreme" : a === "short" ? "close" : a === "medium" ? "near" : _t.includes(a) ? a : "near";
}
function Wt(a) {
  return {
    max: rr((a == null ? void 0 : a.max) ?? "near"),
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function Zs(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function On(a) {
  const e = _t.indexOf(a);
  return e >= 0 ? e : _t.indexOf("near");
}
function In(a = Wt({})) {
  const e = ["near", "close", "far", "extreme"], t = On(a.max);
  return e.find((s) => _t.indexOf(s) <= t) ?? "close";
}
function _n(a) {
  const e = rr(a == null ? void 0 : a.max), t = _t.indexOf(e);
  return _t.map((s, i) => ({
    key: s,
    allowed: t >= 0 ? i <= t : i === 0,
    value: (a == null ? void 0 : a[s]) ?? void 0,
    labelkey: J.getFromList(J.getEnums().ranges, s)
  }));
}
function $n(a, e, t, s) {
  let i = Number(e);
  if (t)
    if (s !== void 0)
      i += Math.ceil(Number(s) / 2);
    else
      return console.warn("Weapon not attached to an actor"), oe.item.personalWeapon.weaponWithoutActor;
  return i;
}
function Ln(a, e, t) {
  let s = "";
  return t && oe.attributes[t] && (s += oe.attributes[t].substring(0, 3).toUpperCase() + "/2 + "), s += String(e), s;
}
function xn(a, e) {
  return N.useArmor(a) ? e ? "noArmor" : "withArmor" : "";
}
function da(a) {
  const e = game.system.mwd.skills.get(a);
  if (!e)
    return {
      img: ar.skill,
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
function Bn(a) {
  const e = String(a ?? "").trim();
  return !!(!e || e.startsWith("icons/svg/") || e === "icons/mystery-man.svg");
}
var ds, Ge, ki, nr, vs;
const Ce = class Ce extends Item {
  static init() {
    F(this, ds) || (Re(this, ds, !0), Hooks.on("createItem", (e, t, s) => {
      var i, r;
      Promise.resolve((i = e.onCreateItem) == null ? void 0 : i.call(e, t, s)).catch((n) => {
        console.error(`${Z}Item create hook failed`, n);
      }), E(r = Ce, Ge, ki).call(r, e);
    }), Hooks.on("updateItem", (e) => {
      var t;
      E(t = Ce, Ge, ki).call(t, e);
    }), Hooks.on("deleteItem", (e) => {
      var t;
      E(t = Ce, Ge, nr).call(t, e);
    }), Hooks.on("createActiveEffect", (e) => {
      var t;
      E(t = Ce, Ge, vs).call(t, e);
    }), Hooks.on("updateActiveEffect", (e) => {
      var t;
      E(t = Ce, Ge, vs).call(t, e);
    }), Hooks.on("deleteActiveEffect", (e) => {
      var t;
      E(t = Ce, Ge, vs).call(t, e);
    }));
  }
  static canonicalType(e) {
    return ua[e] ?? e;
  }
  static defaultIconForType(e) {
    return ar[this.canonicalType(e)];
  }
  get canonicalType() {
    return this.constructor.canonicalType(this.type);
  }
  async onCreateItem(e, t) {
  }
  async _preCreate(e, t, s) {
    super._preCreate && await super._preCreate(e, t, s);
    const i = (e == null ? void 0 : e.type) ?? this.type, r = this.constructor.canonicalType(i), n = {};
    if (i !== r && ua[i] && (n.type = r), Bn((e == null ? void 0 : e.img) ?? this.img)) {
      const l = this.constructor.defaultIconForType(r);
      l && (n.img = l);
    }
    r === g.itemType.lifeModule && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (n.name = "MWD.itemType.singular.lifeModule"), Object.keys(n).length && this.updateSource(n);
  }
  async _preUpdate(e, t, s) {
    var o, c;
    super._preUpdate && await super._preUpdate(e, t, s);
    const i = e != null && e.system ? foundry.utils.mergeObject(foundry.utils.deepClone(this.system ?? {}), foundry.utils.deepClone(e.system), { inplace: !1 }) : null;
    if (i && this.isPersonalWeapon() && (e.system ?? (e.system = {}), e.system.standardTraits = Le(i.standardTraits), e.system.ammo = Ht(i.ammo), e.system.traits = Et(i.traits), e.system.attackRatingBand = Zs(i.attackRatingBand), e.system.range = Wt(i.range), e.system.damageType = rt(i.damageType)), i && this.isArmor() && (e.system ?? (e.system = {}), e.system.mitigationByType = it(i.mitigationByType ?? i.mitigation), e.system.tags = Ms(i.tags), e.system.traits = Et(i.traits), e.system.standardTraits = et(i.standardTraits), e.system.traitState = Ys({
      standardTraits: e.system.standardTraits,
      traits: e.system.traits,
      traitState: i.traitState
    }).traitState), !this.isSkill()) return;
    const r = (o = e == null ? void 0 : e.system) == null ? void 0 : o.code;
    if (r === void 0) return;
    const n = this.system.code;
    if (r === n) return;
    const l = da(r);
    l && ((c = l == null ? void 0 : l.system) == null || delete c.code, foundry.utils.mergeObject(e, l, { inplace: !0 }));
  }
  prepareBaseData() {
    super.prepareBaseData();
    const e = this.canonicalType;
    e === g.itemType.personalWeapon ? this._preparePersonalWeaponBaseData() : e === g.itemType.armor && this._prepareArmorBaseData();
  }
  _preparePersonalWeaponBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = rt(e.damageType), e.attackRatingBand = Zs(e.attackRatingBand), e.range = Wt(e.range), e.standardTraits = Le(e.standardTraits), e.ammo = Ht(e.ammo), e.traits = Et(e.traits), e.notes = String(e.notes ?? "").trim();
  }
  _prepareArmorBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.rating = Math.max(0, Number(e.rating ?? 0)), e.defenseBonus = Number(e.defenseBonus ?? 0) || 0, e.mitigationByType = it(e.mitigationByType ?? e.mitigation), delete e.mitigation, e.durability ?? (e.durability = {}), e.durability.max = Math.max(0, Number(e.durability.max ?? e.rating ?? 0)), e.durability.current = Math.min(
      e.durability.max,
      Math.max(0, Number(e.durability.current ?? e.durability.max ?? e.rating ?? 0))
    ), e.standardTraits = et(e.standardTraits), e.tags = Ms(e.tags), e.traits = Et(e.traits), e.traitState = Ys({
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
    return [g.itemType.mechWeapon, g.itemType.personalWeapon].includes(this.canonicalType);
  }
  isPersonalWeapon() {
    return this.canonicalType === g.itemType.personalWeapon;
  }
  isArmor() {
    return this.canonicalType === g.itemType.armor;
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
      const s = (r = (i = t.flags) == null ? void 0 : i[S]) == null ? void 0 : r[Ce.EQUIPPED_EFFECT_FLAG];
      return (s == null ? void 0 : s.sourceItemId) === this.id;
    }) : [];
  }
  async removeSyncedActorEffects({ actor: e = this.actor } = {}) {
    const t = this.getSyncedActorEffects({ actor: e });
    return !t.length || !e ? [] : e.deleteEmbeddedDocuments("ActiveEffect", t.map((s) => s.id));
  }
  async syncEquippedActorEffects({ actor: e = this.actor } = {}) {
    var d, h, p, b;
    if (!e || !this.supportsEquippedEffectSync()) return { created: [], updated: [], deleted: [] };
    const t = this.getSyncedActorEffects({ actor: e }), s = Array.from(((d = this.effects) == null ? void 0 : d.contents) ?? []);
    if (!this.shouldApplyEquippedEffects()) {
      if (!t.length) return { created: [], updated: [], deleted: [] };
      const y = await e.deleteEmbeddedDocuments("ActiveEffect", t.map((f) => f.id));
      return { created: [], updated: [], deleted: y };
    }
    const i = /* @__PURE__ */ new Map();
    for (const y of t) {
      const f = (b = (p = (h = y.flags) == null ? void 0 : h[S]) == null ? void 0 : p[Ce.EQUIPPED_EFFECT_FLAG]) == null ? void 0 : b.sourceEffectId;
      if (!f) continue;
      const A = i.get(f) ?? [];
      A.push(y), i.set(f, A);
    }
    const r = [], n = [], l = [], o = new Set(s.map((y) => y.id));
    for (const [y, f] of i.entries()) {
      if (!o.has(y)) {
        l.push(...f.map((A) => A.id));
        continue;
      }
      f.length > 1 && l.push(...f.slice(1).map((A) => A.id));
    }
    for (const y of s) {
      const A = (i.get(y.id) ?? [])[0] ?? null, M = this._prepareSyncedActorEffectData(y);
      A ? n.push({ _id: A.id, ...M }) : r.push(M);
    }
    const c = l.length ? await e.deleteEmbeddedDocuments("ActiveEffect", l) : [], u = n.length ? await e.updateEmbeddedDocuments("ActiveEffect", n) : [];
    return { created: r.length ? await e.createEmbeddedDocuments("ActiveEffect", r) : [], updated: u, deleted: c };
  }
  _prepareSyncedActorEffectData(e) {
    const t = e.toObject();
    delete t._id;
    const s = String(e.name ?? "Effect").trim() || "Effect", i = String(this.name ?? "Item").trim() || "Item", r = s.startsWith(i) ? s : `${i}: ${s}`;
    return t.name = r, t.transfer = !1, t.origin = e.uuid ?? this.uuid ?? t.origin ?? null, t.flags = foundry.utils.mergeObject(t.flags ?? {}, {
      [S]: {
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
    return this.canonicalType === g.itemType.skill;
  }
  async rollAttribute(e) {
    this.parent && await Je.itemAttributeRoll(this, e);
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
    j.reindexIds(t), await this.update({ "system.modifiers": t });
  }
  async _mutateWeaponStandardTraits(e = (t) => t) {
    var s;
    const t = e(foundry.utils.deepClone(Le((s = this.system) == null ? void 0 : s.standardTraits)));
    await this.update({ "system.standardTraits": Le(t) });
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
    const t = e(foundry.utils.deepClone(et((s = this.system) == null ? void 0 : s.standardTraits)));
    await this.update({ "system.standardTraits": et(t) });
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
  async _mutateAmmo(e = (t) => t) {
    var s;
    const t = e(foundry.utils.deepClone(Ht((s = this.system) == null ? void 0 : s.ammo)));
    await this.update({ "system.ammo": Ht(t) });
  }
  async updateAmmoField(e, t) {
    await this._mutateAmmo((s) => (e === "activeTypeId" ? s.activeTypeId = String(t ?? "").trim() : foundry.utils.setProperty(s, e, t), s));
  }
  async createAmmoType(e = {}) {
    await this._mutateAmmo((t) => {
      var s;
      return t.types.push({
        id: e.id ?? foundry.utils.randomID(),
        name: e.name ?? "Ammo",
        damageType: e.damageType ?? "",
        apMod: Number(e.apMod ?? 0) || 0,
        attackRatingBandMod: e.attackRatingBandMod ?? {},
        standardTraits: e.standardTraits ?? [],
        traits: e.traits ?? []
      }), t.activeTypeId = t.activeTypeId || ((s = t.types[t.types.length - 1]) == null ? void 0 : s.id) || "", t;
    });
  }
  async deleteAmmoType(e) {
    await this._mutateAmmo((t) => {
      var s;
      return t.types = t.types.filter((i) => i.id !== e), t.activeTypeId === e && (t.activeTypeId = ((s = t.types[0]) == null ? void 0 : s.id) ?? ""), t;
    });
  }
  async updateAmmoType(e, t, s) {
    await this._mutateAmmo((i) => (i.types = i.types.map((r) => {
      if (r.id !== e) return r;
      if (t === "traits")
        r.traits = s;
      else if (t === "damageType")
        r.damageType = s;
      else if (t === "apMod")
        r.apMod = Number(s ?? 0) || 0;
      else if (t.startsWith("attackRatingBandMod.")) {
        const n = t.split(".")[1];
        r.attackRatingBandMod ?? (r.attackRatingBandMod = {}), r.attackRatingBandMod[n] = Number(s ?? 0) || 0;
      } else
        r[t] = s;
      return r;
    }), i));
  }
  async createAmmoTypeStandardTrait(e, t = {}) {
    await this._mutateAmmo((s) => (s.types = s.types.map((i) => (i.id !== e || (i.standardTraits = Le(i.standardTraits).concat([{
      id: t.id ?? foundry.utils.randomID(),
      key: t.key ?? "armorPiercing",
      rating: Math.max(0, Number(t.rating ?? 0) || 0)
    }])), i)), s));
  }
  async deleteAmmoTypeStandardTrait(e, t) {
    await this._mutateAmmo((s) => (s.types = s.types.map((i) => (i.id !== e || (i.standardTraits = Le(i.standardTraits).filter((r) => r.id !== t)), i)), s));
  }
  async updateAmmoTypeStandardTrait(e, t, s, i) {
    await this._mutateAmmo((r) => (r.types = r.types.map((n) => (n.id !== e || (n.standardTraits = Le(n.standardTraits).map((l) => (l.id !== t || (s === "key" && (l.key = i), s === "rating" && (l.rating = Math.max(0, Number(i ?? 0) || 0))), l))), n)), r));
  }
  getAmmoState({ ammoTypeId: e = "" } = {}) {
    var t;
    return qa((t = this.system) == null ? void 0 : t.ammo, e);
  }
  async setActiveAmmoType(e) {
    await this.updateAmmoField("activeTypeId", e);
  }
  canConsumeAmmo({ ammoTypeId: e = "" } = {}) {
    var s, i;
    const t = this.getAmmoState({ ammoTypeId: e });
    return t != null && t.isTracked ? Number(((s = t == null ? void 0 : t.ammo) == null ? void 0 : s.current) ?? 0) >= Number(((i = t == null ? void 0 : t.ammo) == null ? void 0 : i.consumePerAttack) ?? 1) : !0;
  }
  async consumeAmmo({ ammoTypeId: e = "" } = {}) {
    var r, n;
    const t = this.getAmmoState({ ammoTypeId: e });
    if (!(t != null && t.isTracked)) return !0;
    const s = Math.max(1, Number(((r = t == null ? void 0 : t.ammo) == null ? void 0 : r.consumePerAttack) ?? 1) || 1), i = Math.max(0, Number(((n = t == null ? void 0 : t.ammo) == null ? void 0 : n.current) ?? 0) || 0);
    return i < s ? !1 : (await this._mutateAmmo((l) => (l.activeTypeId = t.activeTypeId || l.activeTypeId || "", l.current = Math.max(0, i - s), l)), !0);
  }
  getCombatProfile({ ammoTypeId: e = "" } = {}) {
    if (!this.isPersonalWeapon()) return null;
    const t = this.system ?? {}, s = Wt(t.range), i = String(t.skill ?? "").trim(), r = at(i), n = Number(t.damage ?? 0) || 0, l = String(t.category ?? t.weaponCategory ?? "ranged").trim() || "ranged", o = cn({
      damageType: t.damageType,
      ap: Number(t.ap ?? t.armorPiercing ?? 0) || 0,
      attackRatingBand: Zs(t.attackRatingBand),
      traits: Et(t.traits),
      standardTraits: Le(t.standardTraits),
      ammo: Ht(t.ammo),
      ammoTypeId: e
    });
    return {
      id: this.id ?? "weapon",
      uuid: this.uuid ?? null,
      name: this.name ?? "Weapon",
      img: this.img,
      item: this,
      type: this.canonicalType,
      equipped: !!t.equipped,
      isPrimary: !!t.isPrimary,
      category: l,
      skill: i || "firearms",
      skillDef: r,
      damage: n,
      ap: o.ap,
      damageType: o.damageType,
      damageTypeLabel: kt(o.damageType),
      attackRatingBand: o.attackRatingBand,
      range: s,
      defaultRangeBand: this.getDefaultRangeBand(s),
      traits: o.traits,
      standardTraits: o.standardTraits,
      effects: o.effects,
      ammoLabel: o.ammoLabel,
      ammoType: o.ammoType,
      ammoState: o.ammoState,
      notes: String(t.notes ?? t.description ?? "").trim()
    };
  }
  getArmorProfile({ actor: e = this.actor } = {}) {
    var u, m;
    if (!this.isArmor()) return null;
    const t = this.system ?? {}, s = Math.max(0, Number(t.rating ?? 0)), i = Math.max(0, Number(((u = t == null ? void 0 : t.durability) == null ? void 0 : u.max) ?? s)), r = Math.min(
      i,
      Math.max(0, Number(((m = t == null ? void 0 : t.durability) == null ? void 0 : m.current) ?? i))
    ), n = it((t == null ? void 0 : t.mitigationByType) ?? (t == null ? void 0 : t.mitigation)), l = Ys({
      standardTraits: et(t == null ? void 0 : t.standardTraits),
      traits: Et(t == null ? void 0 : t.traits),
      traitState: t == null ? void 0 : t.traitState
    }), o = Ms(t == null ? void 0 : t.tags), c = Vi(r);
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
      mitigationByType: Ka(n, l.mitigationByType),
      tags: o,
      isDestroyed: r <= 0,
      durability: {
        current: r,
        max: i
      },
      traitState: l.traitState,
      standardTraits: et(t.standardTraits),
      traits: un({
        traits: Et(t.traits),
        standardTraits: et(t.standardTraits)
      }),
      notes: String(t.notes ?? "").trim()
    };
  }
  getDefaultRangeBand(e = Wt(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    return In(e);
  }
  isWeaponSkill(e) {
    return ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === g.itemType.skill && e.system.code === this.system.skill;
  }
  getWeaponSkill() {
    var s;
    const e = (s = this.actor) == null ? void 0 : s.items.find((i) => this.isWeaponSkill(i));
    if (e) return e;
    const t = game.items.find((i) => this.isWeaponSkill(i));
    return t || da(this.system.skill);
  }
  getDefense() {
    if (!this.isPersonalWeapon())
      return this.system.defense ? ue.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return ue.fixedDefenseCode(this.system.defense);
    const e = at(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? ue.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent) return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0, s = this.isPersonalWeapon() ? this.getCombatProfile() : null;
    return {
      value: $n(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: (s == null ? void 0 : s.damageType) ?? this.system.damageType,
      damageTypeLabel: (s == null ? void 0 : s.damageTypeLabel) ?? this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: xn(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  getDamageCode() {
    return Ln(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  getDamageTypeLabel() {
    var t;
    if (this.isPersonalWeapon())
      return kt(((t = this.getCombatProfile()) == null ? void 0 : t.damageType) ?? this.system.damageType);
    const e = oe.mwd.weaponDamageType[this.system.damageType] ?? oe.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return _n(Wt(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  validateTargets(e) {
    var n;
    const t = (n = this.getDamage()) == null ? void 0 : n.monitor, s = Ve.getTargetTokens(game.user), i = s.filter((l) => {
      var o;
      return (o = l.actor) == null ? void 0 : o.canReceiveDamage(t);
    }), r = s.filter((l) => {
      var o;
      return !((o = l.actor) != null && o.canReceiveDamage(t));
    }).map((l) => l.name);
    if (r.length > 0) {
      const l = se(oe.common.errors.ignoredTargets, {
        targets: r.reduce(j.joiner(", "))
      });
      ui.notifications.info(l);
    }
    if (i.length === 0) {
      const l = se(oe.common.errors.noTargetSelected, {
        weapon: this.name ?? oe.itemType.singular.weapon
      });
      ui.notifications.info(l);
    } else
      this.checkWeaponTargetsCount(i);
    return i;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, s = ma[t] ?? {};
    $t.checkTargetsCount(s.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), s = ma[t] ?? {};
    return s.targets && s.adjust && e <= s.targets ? s.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area === "" ? g.area.none : this.system.area ?? g.area.none;
  }
  _getMonitor() {
    return this.isPersonalWeapon() ? g.monitors.physical : this.system.monitor || g.monitors.physical;
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
ds = new WeakMap(), Ge = new WeakSet(), ki = async function(e) {
  if (typeof (e == null ? void 0 : e.syncEquippedActorEffects) == "function")
    try {
      await e.syncEquippedActorEffects();
    } catch (t) {
      console.error(`${Z}Failed to sync equipped item effects`, { item: e, error: t });
    }
}, nr = async function(e) {
  if (typeof (e == null ? void 0 : e.removeSyncedActorEffects) == "function")
    try {
      await e.removeSyncedActorEffects({ actor: e.actor ?? e.parent ?? null });
    } catch (t) {
      console.error(`${Z}Failed to remove synced item effects`, { item: e, error: t });
    }
}, vs = async function(e) {
  const t = e == null ? void 0 : e.parent;
  if (typeof (t == null ? void 0 : t.syncEquippedActorEffects) == "function")
    try {
      await t.syncEquippedActorEffects();
    } catch (s) {
      console.error(`${Z}Failed to sync parent item effects`, { effect: e, error: s });
    }
}, we(Ce, Ge), we(Ce, ds, !1), R(Ce, "RANGE_ORDER", _t), R(Ce, "EQUIPPED_EFFECT_FLAG", "equippedItemSync"), R(Ce, "DEFAULT_UNARMED", Object.freeze({
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
  ammo: { current: 0, max: 0, consumePerAttack: 1, activeTypeId: "", types: [] },
  ammoState: { current: 0, max: 0, consumePerAttack: 1, activeTypeId: "", types: [], isTracked: !1, ammoLabel: "" },
  ammoLabel: "",
  traits: [],
  notes: ""
}));
let ms = Ce;
const pa = {
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
}, Hn = {
  code: "weapon-range",
  options: {
    flags: { editable: !0 },
    order: 20,
    category: Q.pool,
    labelkey: oe.common.roll.modifiers.weaponRange,
    hbsTemplateRoll: `${B}/roll/parts/select-option.hbs`,
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
}, Wn = {
  code: "weapon-area",
  options: {
    used: !0,
    order: 20,
    category: Q.pool,
    labelkey: oe.common.roll.modifiers.weaponArea,
    hbsTemplateRoll: `${B}/roll/parts/input-numeric.hbs`,
    hbsTemplateChat: void 0
    //``
  },
  isUsed: (a) => a.used,
  condition: (a) => a.weapon && a.weapon.getArea() != g.area.none,
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
}, X = class X extends ms {
  static init() {
    Hooks.once(ye.REGISTER_ROLL_PARAMETERS, (e) => {
      e(Wn), e(Hn);
    });
  }
  prepareBaseData() {
    if (super.prepareBaseData(), (this.canonicalType ?? this.type) !== g.itemType.personalWeapon) return;
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = rt(e.damageType), e.attackRatingBand = X.normalizeAttackRatingBand(e.attackRatingBand), e.range = X.normalizeRangeData(e.range), e.traits = X.normalizeTraits(e.traits), e.notes = String(e.notes ?? "").trim();
  }
  static maxIndex(e) {
    const t = X.RANGE_ORDER.indexOf(e);
    return t >= 0 ? t : X.RANGE_ORDER.indexOf("near");
  }
  /**
    * Compute UI-friendly range band data:
    * - cap: normalized max band
    * - bands: [{key, allowed, value}]
    * - optimalKey: highest value among allowed (tie -> closest)
    */
  static getRangeBands(e) {
    const t = e ?? {}, s = X.normalizeRangeKey(t.max ?? "near"), i = X.maxIndex(s), r = X.RANGE_ORDER.map((o, c) => ({
      key: o,
      allowed: c <= i,
      value: Number(t[o] ?? (o === "extreme" && t.long !== void 0 ? t.long : 0))
    }));
    let n = "close", l = -1 / 0;
    for (const o of r)
      o.allowed && o.value > l && (l = o.value, n = o.key);
    return { cap: s, bands: r, optimalKey: n };
  }
  static get defaultIcon() {
    return "systems/mwd/img/colt-m1911.svg";
  }
  static defaultIconForType(e) {
    return e === g.itemType.mechWeapon ? "systems/mwd/img/default/Default_Weapon.svg" : this.defaultIcon;
  }
  static normalizeTraits(e) {
    return nt(e);
  }
  static normalizeRangeData(e) {
    return {
      max: X.normalizeRangeKey((e == null ? void 0 : e.max) ?? "near"),
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
  getCombatProfile() {
    const e = this.system ?? {}, t = this.canonicalType ?? this.type, s = X.normalizeRangeData(e.range), i = String(e.skill ?? "").trim(), r = at(i), n = Number(e.damage ?? 0) || 0, l = Number(e.ap ?? e.armorPiercing ?? 0) || 0, o = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", c = X.normalizeTraits(e.traits), u = Ga(c);
    return {
      id: this.id ?? "weapon",
      uuid: this.uuid ?? null,
      name: this.name ?? "Weapon",
      img: this.img,
      item: this,
      type: t,
      equipped: !!e.equipped,
      isPrimary: !!e.isPrimary,
      category: o,
      skill: i || "firearms",
      skillDef: r,
      damage: n,
      ap: l,
      damageType: t === g.itemType.personalWeapon ? rt(e.damageType) : String(e.damageType ?? "kinetic").trim() || "kinetic",
      attackRatingBand: X.normalizeAttackRatingBand(e.attackRatingBand),
      range: s,
      defaultRangeBand: this.getDefaultRangeBand(s),
      traits: c,
      effects: t === g.itemType.personalWeapon ? u : {},
      notes: String(e.notes ?? e.description ?? "").trim()
    };
  }
  getDefaultRangeBand(e = X.normalizeRangeData(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    const s = ["near", "close", "far", "extreme"], i = X.maxIndex(e.max);
    return s.find((r) => X.RANGE_ORDER.indexOf(r) <= i) ?? "close";
  }
  getWeaponSkill() {
    var s;
    const e = (s = this.actor) == null ? void 0 : s.items.find(
      (i) => i.type === g.itemType.skill && i.system.code === this.system.skill
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
    if ((this.canonicalType ?? this.type) !== g.itemType.personalWeapon)
      return this.system.defense ? ue.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return ue.fixedDefenseCode(this.system.defense);
    const e = at(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? ue.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent)
      return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0;
    return {
      value: X.damageValue(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: this.system.damageType,
      damageTypeLabel: this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: X.armorMode(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  static damageValue(e, t, s, i) {
    if (t = Number(t), s)
      if (i !== void 0)
        t = t + Math.ceil(Number(i) / 2);
      else
        return console.warn("Weapon not attached to an actor"), oe.item.personalWeapon.weaponWithoutActor;
    return t;
  }
  getDamageCode() {
    return X.damageCode(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  static damageCode(e, t, s) {
    let i = "";
    return s && oe.attributes[s] && (i += oe.attributes[s].substring(0, 3).toUpperCase() + "/2 + "), i += String(t), i;
  }
  static armorMode(e, t) {
    return N.useArmor(e) ? t ? "noArmor" : "withArmor" : "";
  }
  getDamageTypeLabel() {
    if ((this.canonicalType ?? this.type) === g.itemType.personalWeapon)
      return kt(this.system.damageType);
    const e = oe.mwd.weaponDamageType[this.system.damageType] ?? oe.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return X.getRangeList(X.normalizeRangeData(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  _getRange(e) {
    return { value: this.system.range[e], labelkey: J.getFromList(J.getEnums().ranges, e) };
  }
  static getRangeList(e) {
    const t = X.normalizeRangeKey(e == null ? void 0 : e.max), s = X.RANGE_ORDER.indexOf(t);
    return X.RANGE_ORDER.map((i, r) => ({
      key: i,
      allowed: s >= 0 ? r <= s : r === 0,
      value: (e == null ? void 0 : e[i]) ?? (i === "extreme" && (e == null ? void 0 : e.long) !== void 0 ? e.long : void 0),
      labelkey: J.getFromList(J.getEnums().ranges, i)
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
    const t = (n = this.getDamage()) == null ? void 0 : n.monitor, s = Ve.getTargetTokens(game.user), i = s.filter((l) => {
      var o;
      return (o = l.actor) == null ? void 0 : o.canReceiveDamage(t);
    }), r = s.filter((l) => {
      var o;
      return !((o = l.actor) != null && o.canReceiveDamage(t));
    }).map((l) => l.name);
    if (r.length > 0) {
      const l = se(oe.common.errors.ignoredTargets, {
        targets: r.reduce(j.joiner(", "))
      });
      ui.notifications.info(l);
    }
    if (i.length == 0) {
      const l = se(oe.common.errors.noTargetSelected, {
        weapon: this.name ?? oe.itemType.singular.weapon
      });
      ui.notifications.info(l);
    } else
      this.checkWeaponTargetsCount(i);
    return i;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, s = pa[t] ?? {};
    $t.checkTargetsCount(s.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), s = pa[t] ?? {};
    return s.targets && s.adjust && e <= s.targets ? s.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area == "" ? g.area.none : this.system.area ?? g.area.none;
  }
  _getMonitor() {
    return (this.canonicalType ?? this.type) === g.itemType.personalWeapon ? g.monitors.physical : this.system.monitor || g.monitors.physical;
  }
};
R(X, "RANGE_ORDER", ["close", "near", "far", "extreme"]), R(X, "DEFAULT_UNARMED", Object.freeze({
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
  ammo: { current: 0, max: 0, consumePerAttack: 1, activeTypeId: "", types: [] },
  ammoState: { current: 0, max: 0, consumePerAttack: 1, activeTypeId: "", types: [], isTracked: !1, ammoLabel: "" },
  ammoLabel: "",
  traits: [],
  notes: ""
}));
let Ue = X;
function Fn(a) {
  const e = [];
  for (let [t, s] of Object.entries(a ?? {}))
    s !== void 0 && (t = t.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (i, r) => (r ? "-" : "") + i.toLowerCase()), e.push(`data-${t}="${Handlebars.escapeExpression(s)}"`));
  return new Handlebars.SafeString(e.join(" "));
}
function zn({ hash: a }) {
  return a;
}
function jn() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
class Yi {
  constructor() {
    this.registerHelpers(), Hooks.once("init", () => {
      this.registerHelpers(), console.log(`${Z}Handlebars helpers registered (init)`);
    }), console.log(`${Z}Handlebars helpers registered (ctor)`);
  }
  registerHelpers() {
    const e = jn(), t = {
      // Foundry utils
      getProperty: foundry.utils.getProperty,
      // DND5E-inspired utilities
      "mwd-dataset": Fn,
      "mwd-object": zn,
      // Simple comparisons
      eq: (s, i) => s === i,
      ne: (s, i) => s !== i,
      // Strings/arrays
      concat: (...s) => j.join(s.slice(0, -1)),
      join: (s, i = " ") => Array.isArray(s) ? s.join(i) : "",
      includes: (s, i) => s == null ? void 0 : s.includes(i),
      length: (s) => (s == null ? void 0 : s.length) || 0,
      substring: (s, i, r) => s == null ? void 0 : s.substring(i, r),
      toUpperCase: Kr.toUpperCaseNoAccent,
      // Math
      modulo: (s, i) => s % i,
      divint: j.divint,
      divup: j.divup,
      sum: (s, i) => s + i,
      diff: (s, i) => s - i,
      times: (s, i) => s * i,
      min: (s, i) => Math.min(s, i),
      max: (s, i) => Math.max(s, i),
      // Utility blocks
      for: Yi.hbsForLoop,
      // fixes “Missing helper: for”
      range: (s, i) => Array.from({ length: i - s + 1 }, (r, n) => s + n),
      ifGte: (s, i, r) => s >= i ? r.fn(this) : r.inverse(this),
      // Damage / weapons (legacy-compatible)
      weaponDamageLetter: qr.letter,
      weaponDamageCode: Ue.damageCode,
      weaponDamageValue: Ue.damageValue,
      weaponArmorMode: Ue.armorMode,
      weaponRangeList: Ue.getRangeList,
      // Icons
      iconFA: L.fontAwesome,
      iconSrc: L.iconSystemPath,
      iconPath: L.iconPath,
      iconD6: L.iconD6,
      // Enums
      localizeAttribute: J.localizeAttribute
    };
    e.registerHelper(t), e !== Handlebars && Handlebars.registerHelper(t);
  }
  static hbsForLoop(e, t, s) {
    let i = "";
    for (let r = e; r < t; ++r) i += s.fn(r);
    return i;
  }
}
const ha = "sheetTheme", Mi = "mwd-theme-default", Vn = "mwd-theme-sra", Un = [
  { name: "Default (CSB)", cssClass: Mi },
  { name: "SRA", cssClass: Vn }
];
class Gn {
  constructor() {
    this.availableStyles = {}, Ot.register(ye.REGISTER_STYLES), Hooks.once(ye.REGISTER_STYLES, (e) => Un.forEach((t) => e(t.cssClass, t.name))), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(ye.REGISTER_STYLES, (e, t) => this.availableStyles[e] = t), console.log(Z + "Loaded styles", this.availableStyles), game.settings.register(S, ha, {
      scope: "world",
      name: "Sheet Theme",
      hint: "Select the visual theme used by MWD sheets.",
      config: !0,
      default: Mi,
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
    const e = game.settings.get(S, ha);
    return this.availableStyles[e] ? e : Mi;
  }
}
const qn = /* @__PURE__ */ new Set(["overloaded"]);
function fa(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function Kn(a, e) {
  var s, i, r;
  if (!a) return null;
  const t = fa(e) ?? fa(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((r = (s = game.actors) == null ? void 0 : s.get) == null ? void 0 : r.call(s, ((i = t == null ? void 0 : t.baseActor) == null ? void 0 : i.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function or(a) {
  const e = String(a ?? "").trim();
  if (!e) return "Status";
  const i = (e.includes(".") ? e.split(".").at(-1) : e).replace(/^status/i, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return i ? i.replace(/\b\w/g, (r) => r.toUpperCase()) : e;
}
function Yn(a) {
  const e = String((a == null ? void 0 : a.name) ?? (a == null ? void 0 : a.label) ?? (a == null ? void 0 : a.id) ?? "Status").trim();
  return e ? or(e) : "Status";
}
function Jn(a) {
  const e = typeof (a == null ? void 0 : a.img) == "string" ? a.img.trim() : "";
  if (e) return e;
  const t = a ? Object.getOwnPropertyDescriptor(a, "icon") : null;
  return "value" in (t ?? {}) ? String(t.value ?? "").trim() : "";
}
function Ls(a, e) {
  var t, s, i, r, n, l;
  return e === "overloaded" ? !!((s = (t = a == null ? void 0 : a.system) == null ? void 0 : t.burn) != null && s.overloaded) || !!((r = (i = a == null ? void 0 : a.statuses) == null ? void 0 : i.has) != null && r.call(i, e)) : ((l = (n = a == null ? void 0 : a.statuses) == null ? void 0 : n.has) == null ? void 0 : l.call(n, e)) ?? !1;
}
function Ji(a) {
  const e = /* @__PURE__ */ new Set();
  return (CONFIG.statusEffects ?? []).filter((t) => {
    const s = String((t == null ? void 0 : t.id) ?? "").trim();
    return !s || e.has(s) ? !1 : (e.add(s), !0);
  }).map((t) => {
    const s = String(t.id).trim();
    return {
      id: s,
      label: Yn(t),
      icon: Jn(t),
      active: Ls(a, s),
      managed: qn.has(s)
    };
  }).sort((t, s) => t.active !== s.active ? t.active ? -1 : 1 : t.label.localeCompare(s.label));
}
function Qn(a) {
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
async function Zn({ actor: a, effects: e, selectedStatusIds: t }) {
  const s = new Set(t);
  for (const i of e) {
    const r = s.has(i.id);
    await lr({ actor: a, statusId: i.id, active: r });
  }
}
async function lr({ actor: a, statusId: e, active: t }) {
  if (!a || !e) return !1;
  const s = Ls(a, e);
  return !!t === s ? !1 : e === "overloaded" ? (await a.update({ "system.burn.overloaded": !!t }), !0) : (await a.toggleStatusEffect(e, { active: !!t, overlay: !1 }), !0);
}
async function Xn({ actor: a, token: e } = {}) {
  var i;
  if (!a || !e) return !1;
  const t = Kn(a, e), s = Ji(t);
  return s.length ? foundry.applications.api.DialogV2.wait({
    window: {
      title: `Token Statuses: ${e.name ?? a.name ?? "Token"}`
    },
    position: {
      width: 420
    },
    content: Qn(s),
    buttons: [
      {
        action: "apply",
        label: "Apply",
        icon: "fa-solid fa-check",
        default: !0,
        callback: async (r, n) => {
          var l, o;
          try {
            const c = Array.from(
              ((l = n.form) == null ? void 0 : l.querySelectorAll('input[name="status"]:checked')) ?? []
            ).map((u) => u.value);
            return await Zn({ actor: t, effects: s, selectedStatusIds: c }), !0;
          } catch (c) {
            return console.error("MWD | Failed to update token statuses", c), (o = ui.notifications) == null || o.error("Unable to update token statuses."), !1;
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
const Qt = "mwd", Zt = "personalCombat", Es = 3, eo = 1, to = 1;
function ga(a, e) {
  return !(a != null && a.activation) || !e ? !1 : a.activation.combatId === e.combatId && Number(a.activation.round ?? -1) === Number(e.round ?? -1) && Number(a.activation.turn ?? -1) === Number(e.turn ?? -1) && a.activation.combatantId === e.combatantId;
}
function vi(a = null) {
  return {
    saRemaining: Es,
    faRemaining: eo,
    raRemaining: to,
    saSpentThisActivation: 0,
    burnThisActivation: 0,
    attacksThisActivation: 0,
    actionLog: [],
    activation: a
  };
}
function ya(a, e = null) {
  return foundry.utils.mergeObject(
    vi(e),
    foundry.utils.deepClone(a ?? {}),
    { inplace: !1, overwrite: !0 }
  );
}
function Xs(a) {
  return Array.isArray(a) ? a.map((e) => {
    const t = String((e == null ? void 0 : e.label) ?? "").trim();
    return t ? {
      id: String((e == null ? void 0 : e.id) ?? "").trim(),
      label: t,
      costLabel: String((e == null ? void 0 : e.costLabel) ?? "").trim()
    } : null;
  }).filter(Boolean) : [];
}
function so(a) {
  const e = (CONFIG.statusEffects ?? []).find((s) => String((s == null ? void 0 : s.id) ?? "").trim() === a), t = String((e == null ? void 0 : e.name) ?? (e == null ? void 0 : e.label) ?? a ?? "").trim();
  return or(t);
}
function Bt(a) {
  const e = Number(a);
  return !Number.isFinite(e) || e === 0 ? "0" : e > 0 ? `+${e}` : String(e);
}
function io(a) {
  if (typeof a == "number") return Number.isFinite(a) ? a : 0;
  const e = String(a ?? "").trim().match(/[-+]?\d+(\.\d+)?/);
  return e ? Number(e[0]) : 0;
}
function ba(a) {
  var e;
  return (a == null ? void 0 : a.center) ?? ((e = a == null ? void 0 : a.object) == null ? void 0 : e.center) ?? null;
}
function ao(a, e = "") {
  if (!Number.isFinite(a)) return "";
  const t = Math.round(a * 10) / 10, s = Number.isInteger(t) ? String(t) : t.toFixed(1);
  return e ? `${s} ${e}` : s;
}
class de {
  static init() {
    Hooks.on("updateCombat", (e, t) => this._onUpdateCombat(e, t)), Hooks.on("updateCombatant", (e, t) => this._onUpdateCombatant(e, t)), Hooks.on("createCombatant", (e) => this._onCreateCombatant(e)), Hooks.on("deleteCombatant", (e) => this._onDeleteCombatant(e)), Hooks.on("deleteCombat", (e) => this._onDeleteCombat(e)), Hooks.on("targetToken", (e) => this._onTargetToken(e));
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
    var n, l, o, c, u;
    const i = String(e ?? "").trim();
    if (!i || !t) return null;
    const r = ((n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.id) === t ? canvas.scene : (o = (l = game.scenes) == null ? void 0 : l.get) == null ? void 0 : o.call(l, t);
    return ((u = (c = r == null ? void 0 : r.tokens) == null ? void 0 : c.get) == null ? void 0 : u.call(c, i)) ?? null;
  }
  static _collectActorIds(e, t = null) {
    var n, l;
    const s = /* @__PURE__ */ new Set(), i = (o) => {
      const c = String(o ?? "").trim();
      c && s.add(c);
    };
    i(e == null ? void 0 : e.id), i(e == null ? void 0 : e._id);
    const r = this._asTokenDocument(t) ?? this._asTokenDocument(e == null ? void 0 : e.token);
    return i((n = r == null ? void 0 : r.actor) == null ? void 0 : n.id), i((l = r == null ? void 0 : r.baseActor) == null ? void 0 : l.id), i(r == null ? void 0 : r.actorId), s;
  }
  static _tokenDocumentMatchesActor(e, t, s = null) {
    var n, l;
    const i = this._asTokenDocument(e);
    if (!i || !t) return !1;
    const r = s ?? this._collectActorIds(t, i);
    return [
      (n = i == null ? void 0 : i.actor) == null ? void 0 : n.id,
      (l = i == null ? void 0 : i.baseActor) == null ? void 0 : l.id,
      i == null ? void 0 : i.actorId
    ].some((o) => r.has(String(o ?? "").trim()));
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
    var p, b, y, f;
    const s = (p = canvas == null ? void 0 : canvas.scene) == null ? void 0 : p.id, i = this._asTokenDocument(t);
    if (this._getTokenSceneId(i) === s) return i;
    const r = String((i == null ? void 0 : i.id) ?? (t == null ? void 0 : t.id) ?? "").trim();
    if (r) {
      const A = this._getSceneTokenDocumentById(r, s);
      if (A) return A;
    }
    const n = this.getPreferredTokenDocument(e);
    if (this._getTokenSceneId(n) === s) return n;
    const l = String((n == null ? void 0 : n.id) ?? "").trim();
    if (l) {
      const A = this._getSceneTokenDocumentById(l, s);
      if (A) return A;
    }
    const c = ((y = (((b = e == null ? void 0 : e.getActiveTokens) == null ? void 0 : b.call(e, !0, !0)) ?? []).find((A) => {
      var M, k;
      return ((k = (M = A == null ? void 0 : A.document) == null ? void 0 : M.parent) == null ? void 0 : k.id) === s;
    })) == null ? void 0 : y.document) ?? null;
    if (c) return c;
    const u = Array.from(((f = canvas == null ? void 0 : canvas.scene) == null ? void 0 : f.tokens) ?? []), m = this._collectActorIds(e, n), d = u.filter((A) => this._tokenDocumentMatchesActor(A, e, m));
    return d.find((A) => {
      var M, k, P;
      return ((M = A == null ? void 0 : A.combatant) == null ? void 0 : M.id) === ((P = (k = game.combat) == null ? void 0 : k.combatant) == null ? void 0 : P.id);
    }) ?? null ?? d[0] ?? null;
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
    const s = canvas == null ? void 0 : canvas.grid, i = ba(e), r = ba(t), n = globalThis.Ray;
    if (!s || !i || !r) return null;
    if (typeof s.measureDistances == "function" && typeof n == "function")
      try {
        const l = s.measureDistances([{ ray: new n(i, r) }], { gridSpaces: !0 }), o = Number(Array.isArray(l) ? l[0] : NaN);
        if (Number.isFinite(o)) return o;
      } catch {
      }
    if (typeof s.measurePath == "function")
      try {
        const l = s.measurePath([i, r], { gridSpaces: !0 }), o = Number(
          (l == null ? void 0 : l.distance) ?? (l == null ? void 0 : l.cost) ?? (l == null ? void 0 : l.totalDistance) ?? (l == null ? void 0 : l.totalCost) ?? NaN
        );
        if (Number.isFinite(o)) return o;
      } catch {
        return null;
      }
    return null;
  }
  static getTargetingSnapshot(e = null) {
    var c, u, m, d, h, p, b, y, f;
    const t = Array.from(((c = game.user) == null ? void 0 : c.targets) ?? []).filter(Boolean), s = t.length;
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
    const i = t[0], r = this._measureTokenDistance(e, i), n = String(((m = (u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.grid) == null ? void 0 : m.units) ?? ((h = (d = game.system) == null ? void 0 : d.grid) == null ? void 0 : h.units) ?? "").trim(), l = ao(r, n), o = String((i == null ? void 0 : i.name) ?? ((p = i == null ? void 0 : i.actor) == null ? void 0 : p.name) ?? "Target").trim() || "Target";
    return {
      count: s,
      none: !1,
      single: !0,
      multiple: !1,
      heading: "Target",
      primaryLabel: o,
      detailRows: l ? [{ label: "Distance", value: l }] : [],
      target: {
        id: (i == null ? void 0 : i.id) ?? null,
        name: o,
        img: ((y = (b = i == null ? void 0 : i.document) == null ? void 0 : b.texture) == null ? void 0 : y.src) ?? ((f = i == null ? void 0 : i.texture) == null ? void 0 : f.src) ?? "",
        distance: Number.isFinite(r) ? r : null,
        distanceLabel: l
      }
    };
  }
  static getRollImpact(e = []) {
    const t = (Array.isArray(e) ? e : []).map((i) => {
      const r = io((i == null ? void 0 : i.numericValue) ?? (i == null ? void 0 : i.value) ?? 0);
      return {
        label: String((i == null ? void 0 : i.label) ?? "").trim() || "Modifier",
        numericValue: r,
        value: String((i == null ? void 0 : i.value) ?? Bt(r)).trim() || Bt(r)
      };
    }), s = t.reduce((i, r) => i + r.numericValue, 0);
    return {
      total: s,
      totalLabel: Bt(s),
      entries: t
    };
  }
  static getCombat(e, t = null) {
    var d, h, p, b;
    const s = (d = canvas == null ? void 0 : canvas.scene) == null ? void 0 : d.id, i = game.combat, r = this.getCurrentSceneTokenDocument(e, t), n = (r == null ? void 0 : r.object) ?? this._getSceneTokenById((r == null ? void 0 : r.id) ?? null);
    if (!i || ((h = i.scene) == null ? void 0 : h.id) !== s)
      return {
        combat: null,
        combatant: null,
        token: n,
        tokenDocument: r
      };
    let l = ((b = (p = r == null ? void 0 : r.combatant) == null ? void 0 : p.combat) == null ? void 0 : b.id) === i.id ? r.combatant : null;
    const o = Array.from(i.combatants ?? []);
    if (!l) {
      const y = this._collectActorIds(e, r), f = o.filter((k) => {
        const P = String((k == null ? void 0 : k.tokenId) ?? "").trim();
        if (r && P === String(r.id ?? "").trim() || y.has(String((k == null ? void 0 : k.actorId) ?? "").trim())) return !0;
        const W = this._asTokenDocument(k == null ? void 0 : k.token) ?? this._getSceneTokenDocumentById(P, s);
        return this._tokenDocumentMatchesActor(W, e, y);
      }), A = f.find((k) => {
        var P;
        return k.id === ((P = i == null ? void 0 : i.combatant) == null ? void 0 : P.id);
      }) ?? null, M = f.find(
        (k) => r && String((k == null ? void 0 : k.tokenId) ?? "").trim() === String(r.id ?? "").trim()
      ) ?? null;
      l = A ?? M ?? f[0] ?? null;
    }
    !l && o.length === 1 && (n || e) && (l = o[0]);
    const c = this._asTokenDocument(l == null ? void 0 : l.token) ?? this._getSceneTokenDocumentById((l == null ? void 0 : l.tokenId) ?? null, s), u = r ?? c ?? null, m = n ?? (c == null ? void 0 : c.object) ?? this._getSceneTokenById((l == null ? void 0 : l.tokenId) ?? null) ?? null;
    return {
      combat: i,
      combatant: l,
      token: m,
      tokenDocument: u
    };
  }
  static getSnapshot(e, { token: t = null } = {}) {
    var k, P, W, I, z;
    const {
      combat: s,
      combatant: i,
      token: r,
      tokenDocument: n
    } = this.getCombat(e, t), l = !!i && ((k = s == null ? void 0 : s.combatant) == null ? void 0 : k.id) === i.id, o = i ? this.getActivationIdentity(s, i) : null, c = i ? i.getFlag(Qt, Zt) : null, u = i && l && ga(c, o) ? ya(c, o) : vi(o);
    u.actionLog = Xs(u.actionLog);
    const m = Math.max(0, Number(((W = (P = e == null ? void 0 : e.system) == null ? void 0 : P.burn) == null ? void 0 : W.value) ?? 0)), d = Math.floor(m / 2), h = !!((z = (I = e == null ? void 0 : e.system) == null ? void 0 : I.burn) != null && z.overloaded), p = this.getActiveStatuses(e), b = p.filter((Y) => !(h && Y.id === "overloaded")), y = this.getModifierSummary(e, d), f = this.getRollImpact(y), A = Math.max(0, Number(u.burnThisActivation ?? 0)), M = i ? l ? "" : "Waiting for this combatant's activation." : "No combatant on the current scene.";
    return {
      token: r,
      tokenDocument: n,
      combat: s,
      combatant: i,
      hasCombatant: !!i,
      isCurrentTurn: l,
      overloaded: h,
      burn: {
        value: m,
        penalty: d,
        canOverloadCheck: m >= 6 && !h
      },
      state: u,
      targeting: this.getTargetingSnapshot(r),
      states: h ? [{ id: "overloaded", label: "Overloaded" }] : [],
      effects: b,
      statuses: p,
      rollImpact: f,
      summaryText: `SA: ${u.saRemaining} / ${Es}   FA: ${u.faRemaining}   RA: ${u.raRemaining}`,
      activation: {
        burnThisActivation: A,
        burnThisActivationLabel: `+${A}`,
        items: [
          { label: "SA", value: `${u.saRemaining}/${Es}` },
          { label: "FA", value: String(u.faRemaining) },
          { label: "RA", value: String(u.raRemaining) },
          { label: "Burn", value: `+${A}`, detail: "this activation" }
        ]
      },
      inactiveReason: M,
      modifierSummary: y
    };
  }
  static getModifierSummary(e, t = Math.floor(Number(((i) => (i = ((s) => (s = e == null ? void 0 : e.system) == null ? void 0 : s.burn)()) == null ? void 0 : i.value)() ?? 0) / 2)) {
    var c, u;
    const r = ((u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.derived) == null ? void 0 : u.condition) ?? {}, n = [];
    t > 0 && n.push({
      label: "Burn Penalty",
      numericValue: -t,
      value: Bt(-t)
    });
    const l = Number(r.fatiguePenalty ?? 0);
    l && n.push({
      label: "Fatigue",
      numericValue: l,
      value: Bt(l)
    });
    const o = Number(r.physicalPenalty ?? 0);
    return o && n.push({
      label: "Physical",
      numericValue: o,
      value: Bt(o)
    }), n.length || n.push({
      label: "Current Modifiers",
      numericValue: 0,
      value: "0"
    }), n;
  }
  static getActiveStatuses(e) {
    return Array.from((e == null ? void 0 : e.statuses) ?? []).map((s) => ({
      id: s,
      label: so(s)
    })).sort((s, i) => s.label.localeCompare(i.label));
  }
  static buildActionModel(e, t) {
    var h, p;
    const s = t.hasCombatant ? "" : "No current-scene combatant.", i = t.isCurrentTurn ? "" : "Only during your activation.", r = t.overloaded ? "Overloaded: only Burn recovery is allowed." : "", n = s || i || r, l = [
      { id: "move", label: "Move", resource: "sa", cost: 1, supported: !0 },
      { id: "aim", label: "Aim", resource: "sa", cost: 1, supported: !0 },
      { id: "reload", label: "Reload", resource: "sa", cost: 1, supported: !0 },
      { id: "assist", label: "Assist", resource: "sa", cost: 1, supported: !0 },
      { id: "stand", label: "Stand", resource: "sa", cost: 1, supported: !0 }
    ].map((b) => this._buildSpendAction(t, b, n)), o = s || i || r || (t.state.saRemaining < 2 ? "Need 2 SA remaining." : ""), c = [
      {
        id: "attack",
        label: "Attack",
        costLabel: "2 SA",
        handler: "combatAttack",
        disabled: !!o,
        reason: o,
        prominent: !0
      },
      { id: "firstAid", label: "First Aid", costLabel: "2 SA" },
      { id: "emergencyRepair", label: "Emergency Repair", costLabel: "2 SA" }
    ].map((b) => b.handler ? b : this._buildStubAction(b)), u = s || i || (t.state.saRemaining <= 0 ? "No SA remaining." : "") || (t.burn.value <= 0 ? "Burn is already at 0." : ""), m = s || i || (t.burn.canOverloadCheck ? "" : t.overloaded ? "Already Overloaded." : "Burn below 6."), d = s || i;
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
        }
      ],
      summaryPills: [
        { label: "SA", value: `${t.state.saRemaining}/${Es}` },
        { label: "FA", value: `${t.state.faRemaining}` },
        { label: "RA", value: `${t.state.raRemaining}` },
        { label: "Burn", value: `+${Math.max(0, Number(((h = t.state) == null ? void 0 : h.burnThisActivation) ?? 0))}` }
      ],
      activationLog: Xs((p = t.state) == null ? void 0 : p.actionLog).map((b, y) => ({
        ...b,
        index: y + 1
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
              disabled: !!u,
              reason: u,
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
            }, d),
            this._buildSpendAction(t, {
              id: "spendRA",
              label: "Spend RA",
              resource: "ra",
              cost: 1,
              supported: !0
            }, d)
          ]
        }
      ]
    };
  }
  static _buildSpendAction(e, t, s = "") {
    var o;
    const r = Number(((o = e.state) == null ? void 0 : o[`${t.resource}Remaining`]) ?? 0) < t.cost ? `No ${String(t.resource).toUpperCase()} remaining.` : "", n = s || r, l = this._formatCostLabel(t.resource, t.cost);
    return {
      id: t.id,
      label: t.label,
      costLabel: l,
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
    const n = Xs(e == null ? void 0 : e.actionLog);
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
    const s = this.getActivationIdentity(e, t), i = t.getFlag(Qt, Zt);
    ga(i, s) || await t.setFlag(Qt, Zt, vi(s));
  }
  static async spendResource(e, {
    token: t = null,
    resource: s = "sa",
    cost: i = 1,
    actionId: r = "",
    actionLabel: n = "",
    actionCostLabel: l = ""
  } = {}) {
    var d;
    const o = this.getSnapshot(e, { token: t });
    if (!o.hasCombatant)
      return { ok: !1, reason: "No combatant on the current scene." };
    if (!o.isCurrentTurn)
      return { ok: !1, reason: "Only available during your activation." };
    const c = `${s}Remaining`, u = Number(((d = o.state) == null ? void 0 : d[c]) ?? 0);
    if (u < i)
      return { ok: !1, reason: `No ${String(s).toUpperCase()} remaining.` };
    const m = ya(o.state, this.getActivationIdentity(o.combat, o.combatant));
    return m[c] = Math.max(0, u - i), s === "sa" && (m.saSpentThisActivation = Number(m.saSpentThisActivation ?? 0) + i, r === "attack" && (m.attacksThisActivation = Number(m.attacksThisActivation ?? 0) + 1)), this._appendActionLog(m, {
      id: r,
      label: n,
      costLabel: l || this._formatCostLabel(s, i)
    }), await o.combatant.setFlag(Qt, Zt, m), { ok: !0, snapshot: this.getSnapshot(e, { token: o.token }) };
  }
  static async reduceBurn(e, { token: t = null } = {}) {
    var l, o, c, u;
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
    const r = Math.max(0, Number(((o = (l = e.system) == null ? void 0 : l.burn) == null ? void 0 : o.value) ?? 0) - 1), n = { "system.burn.value": r };
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
    foundry.utils.hasProperty(t, `flags.${Qt}.${Zt}`) && this.renderOpenCharacterSheets((s = e == null ? void 0 : e.actor) == null ? void 0 : s.id);
  }
  static _onTargetToken(e) {
    var t;
    (e == null ? void 0 : e.id) === ((t = game.user) == null ? void 0 : t.id) && this.renderOpenCharacterSheets();
  }
  static renderOpenCharacterSheets(e = null) {
    var s;
    const t = Object.values(ui.windows ?? {}).filter((i) => {
      var r;
      return ((r = i == null ? void 0 : i.actor) == null ? void 0 : r.type) === "character";
    });
    for (const i of t)
      if (!(e && ((s = i.actor) == null ? void 0 : s.id) !== e)) {
        if (typeof i.requestCombatDashboardRefresh == "function") {
          i.requestCombatDashboardRefresh();
          continue;
        }
        i.render(!1);
      }
  }
}
function ns(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function ei(a, e) {
  var s, i, r;
  if (!a) return null;
  const t = ns(e) ?? ns(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((r = (s = game.actors) == null ? void 0 : s.get) == null ? void 0 : r.call(s, ((i = t == null ? void 0 : t.baseActor) == null ? void 0 : i.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function wa(a) {
  const e = Number(a ?? 0);
  return Number.isFinite(e) ? Math.trunc(e) : 0;
}
function Ts(a, e) {
  var t, s, i;
  return Math.max(0, Number(((i = (s = (t = a == null ? void 0 : a.system) == null ? void 0 : t.monitors) == null ? void 0 : s[e]) == null ? void 0 : i.value) ?? 0) || 0);
}
function Aa(a) {
  var e, t;
  return Math.max(0, Number(((t = (e = a == null ? void 0 : a.system) == null ? void 0 : e.burn) == null ? void 0 : t.value) ?? 0) || 0);
}
function es(a) {
  return a === g.monitors.physical ? "Physical" : a === g.monitors.fatigue ? "Fatigue" : String(a ?? "").trim() || "Track";
}
function ro(a, e) {
  var t;
  return ((t = Ji(e).find((s) => s.id === a)) == null ? void 0 : t.label) ?? a;
}
function no(a) {
  const e = foundry.utils.escapeHTML, t = [];
  if (a.mode === "attackDamage" || a.mode === "trackDelta") {
    const s = a.appliedDelta >= 0 ? "Applied" : "Recovered", i = Math.abs(Number(a.appliedDelta ?? 0)), r = i === 1 ? "point" : "points", n = a.usedArmor ? ` via armor-aware ${e(kt(a.damageType))}` : "";
    t.push(`<div><b>${s}:</b> ${i} ${r} to ${e(es(a.track))}${n}</div>`), a.usedArmor && a.mitigation && (t.push(
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
function oo(a) {
  var t, s;
  const e = (s = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : s.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
class Qe {
  static supportsActor(e) {
    return (e == null ? void 0 : e.type) === g.actorTypes.character;
  }
  static getActorOptions() {
    return Array.from(game.actors ?? []).filter((e) => this.supportsActor(e)).sort((e, t) => String(e.name ?? "").localeCompare(String(t.name ?? ""))).map((e) => ({
      id: e.id,
      name: e.name || "Character"
    }));
  }
  static getStatusOptions(e = null) {
    return Ji(e).map((t) => ({
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
      const r = ns(e[0]), n = ei((r == null ? void 0 : r.actor) ?? null, r);
      return this._resolveSceneTargetResult(n, r);
    }
    const t = Array.from(((i = game.user) == null ? void 0 : i.targets) ?? []);
    if (t.length > 1)
      return { actor: null, token: null, reason: "Target only one token." };
    if (t.length === 1) {
      const r = ns(t[0]), n = ei((r == null ? void 0 : r.actor) ?? null, r);
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
    var l, o;
    const r = ns(t);
    if (r) {
      const c = ei((r == null ? void 0 : r.actor) ?? e, r), u = this._resolveSceneTargetResult(c, r);
      if (u.actor) return { ...u, source: "token" };
    }
    if (i) {
      const c = this.getSceneTarget();
      if (c.actor) return { ...c, source: "scene" };
    }
    if (e && this.supportsActor(e))
      return { actor: e, token: r, reason: "", source: "actor" };
    const n = s ? ((o = (l = game.actors) == null ? void 0 : l.get) == null ? void 0 : o.call(l, s)) ?? null : null;
    return n && this.supportsActor(n) ? { actor: n, token: null, reason: "", source: "fallback" } : {
      actor: null,
      token: r,
      source: null,
      reason: i && this.getSceneTarget().reason || "Choose a supported character target."
    };
  }
  static async apply({ actor: e = null, token: t = null, payload: s = {}, options: i = {} } = {}) {
    var o;
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
    const l = {
      ok: !0,
      actor: r.actor,
      token: r.token,
      actorName: r.actor.name || "Character",
      sourceType: r.source,
      ...n
    };
    if (i.logToChat) {
      const c = no(l), u = oo({
        speaker: ChatMessage.getSpeaker({ actor: r.actor, token: r.token }),
        content: c
      });
      await ChatMessage.create(u);
    }
    return (o = de.renderOpenCharacterSheets) == null || o.call(de, r.actor.id), l;
  }
  static async _applyTrackDelta(e, t) {
    const s = (t == null ? void 0 : t.track) === g.monitors.fatigue ? g.monitors.fatigue : g.monitors.physical, i = wa((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0);
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
    const n = Ts(e, s);
    await N.addCounter(e, s, i);
    const l = Ts(e, s);
    return {
      mode: "trackDelta",
      track: s,
      requestedDelta: i,
      appliedDelta: l - n,
      usedArmor: !1,
      beforeLabel: `${es(s)} ${n}`,
      afterLabel: `${es(s)} ${l}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyBurnDelta(e, t) {
    var o, c;
    const s = wa((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0), i = Aa(e), r = Math.max(0, i + s), n = { "system.burn.value": r };
    r === 0 && ((c = (o = e.system) == null ? void 0 : o.burn) != null && c.overloaded) && (n["system.burn.overloaded"] = !1), await e.update(n);
    const l = Aa(e);
    return {
      mode: "burnDelta",
      requestedDelta: s,
      appliedDelta: l - i,
      beforeLabel: `Burn ${i}`,
      afterLabel: `Burn ${l}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyStatus(e, t) {
    const s = String((t == null ? void 0 : t.statusId) ?? (t == null ? void 0 : t.status) ?? "").trim();
    if (!s)
      return { mode: "status", statusId: "", active: !1, statusLabel: "Status", beforeLabel: "", afterLabel: "" };
    const i = Ls(e, s), r = !!(t != null && t.active);
    await lr({ actor: e, statusId: s, active: r });
    const n = Ls(e, s);
    return {
      mode: "status",
      statusId: s,
      statusLabel: ro(s, e),
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
      track: (t == null ? void 0 : t.track) ?? g.monitors.physical,
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
    var z, Y, K, ee, O, ie, le, ae;
    const s = (t == null ? void 0 : t.track) === g.monitors.fatigue ? g.monitors.fatigue : g.monitors.physical, i = Math.max(0, Number((t == null ? void 0 : t.damage) ?? 0) || 0), r = Math.max(0, Number((t == null ? void 0 : t.netHits) ?? 0) || 0), n = (t == null ? void 0 : t.effects) ?? {}, l = ((z = e.getPersonalCombatLoadout) == null ? void 0 : z.call(e, { refresh: !0 })) ?? null, o = (l == null ? void 0 : l.activeArmor) ?? null, c = Math.max(0, Number((o == null ? void 0 : o.currentArmorRating) ?? ((Y = o == null ? void 0 : o.durability) == null ? void 0 : Y.current) ?? 0) || 0), u = rt(t == null ? void 0 : t.damageType, "concussive"), m = Ts(e, s);
    let d = i + r;
    const h = c > 0 ? dn({
      damageIncoming: d,
      armorTags: (o == null ? void 0 : o.tags) ?? [],
      effects: n
    }) : { damageIncoming: d, applied: [] };
    d = h.damageIncoming;
    const p = mn({
      currentArmorRating: c,
      mitigationByType: (o == null ? void 0 : o.mitigationByType) ?? {},
      damageType: u
    }), b = Math.max(
      0,
      (Number((t == null ? void 0 : t.ap) ?? 0) || 0) + (Number((n == null ? void 0 : n.ap) ?? 0) || 0)
    ), y = p.isDestroyed ? 0 : Math.max(0, p.baseMitigation + p.typeMitigationMod - b), f = Math.max(0, Math.ceil(d - y));
    f > 0 && await N.addCounter(e, s, f);
    const A = Math.max(0, Number(((K = o == null ? void 0 : o.durability) == null ? void 0 : K.current) ?? 0) || 0);
    let M = A;
    const k = Math.max(0, Number(((O = (ee = o == null ? void 0 : o.traitState) == null ? void 0 : ee.reinforced) == null ? void 0 : O.current) ?? 0) || 0), P = Math.max(0, Number(((le = (ie = o == null ? void 0 : o.traitState) == null ? void 0 : ie.reinforced) == null ? void 0 : le.max) ?? 0) || 0);
    let W = k;
    if (i + r > 0 && ((ae = o == null ? void 0 : o.item) != null && ae.id)) {
      const me = {};
      k > 0 ? (W = Math.max(0, k - 1), W !== k && (me["system.traitState.reinforced.current"] = W)) : (M = Math.max(0, A - 1), M !== A && (me["system.durability.current"] = M)), Object.keys(me).length > 0 && await o.item.update(me);
    }
    const I = Ts(e, s);
    return {
      mode: (t == null ? void 0 : t.mode) ?? "attackDamage",
      track: s,
      requestedDelta: i + r,
      appliedDelta: I - m,
      usedArmor: !0,
      damageType: u,
      effectiveAp: b,
      mitigation: {
        ...p,
        netResistance: y,
        armorBefore: A,
        armorAfter: M,
        reinforcedBefore: k,
        reinforcedAfter: W,
        reinforcedMax: P
      },
      damageIncoming: d,
      adjustedIncoming: d,
      finalDamage: f,
      tagEffectResult: h,
      beforeLabel: `${es(s)} ${m}`,
      afterLabel: `${es(s)} ${I}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
}
R(Qe, "MODE_OPTIONS", Object.freeze([
  { value: g.monitors.physical, label: "Physical" },
  { value: g.monitors.fatigue, label: "Fatigue" },
  { value: "burn", label: "Burn" },
  { value: "status", label: "Status" }
]));
const lo = Os, Ei = "damage-mode", co = `${S}.${Ei}`, Ss = {}, ti = {};
class q {
  static init() {
    Ot.register(ye.PROVIDE_DAMAGE_MODE), Hooks.on("updateSetting", async (e, t, s, i) => q.onUpdateSetting(e, t, s, i)), Hooks.on(ye.PROVIDE_DAMAGE_MODE, (e) => {
      e("resistanceArmorMonitor", w.settings.damageMode.values.resistanceArmorMonitor, q.sufferDamageResistanceArmorMonitor), e("armorResistanceMonitor", w.settings.damageMode.values.armorResistanceMonitor, q.sufferDamageArmorResistanceMonitor), e("armorGivesResistance", w.settings.damageMode.values.armorGivesResistance, q.sufferDamageArmorAsResistance_Earthdawn), e("armorGiveResistanceHitsAvoid", w.settings.damageMode.values.armorGiveResistanceHitsAvoid, q.sufferDamageArmorAsResistance_Cyberpunk);
    }), Hooks.once("ready", () => q.onReady());
  }
  static onReady() {
    q._registerDamageModeSetting(), q._selectDamageMode();
  }
  static _registerDamageModeSetting() {
    Hooks.callAll(ye.PROVIDE_DAMAGE_MODE, (e, t, s) => {
      Ss[e] = t, ti[e] = s;
    }), game.settings.register(S, Ei, {
      scope: "world",
      name: w.settings.damageMode.name,
      hint: w.settings.damageMode.hint,
      config: !0,
      default: Object.keys(Ss)[0],
      choices: Ss,
      type: String
    });
  }
  static async onUpdateSetting(e, t, s, i) {
    e.key == co && q._selectDamageMode();
  }
  static _selectDamageMode() {
    let e = game.settings.get(S, Ei);
    ti[e] || (e = Object.keys(Ss)[0]), q.damageModeCode = e, q.damageModeMethod = ti[e];
  }
  static async sufferDamage(e, t, s, i, r, n, l) {
    const { monitor: o, damageType: c } = q._resolveDamageContext(e, t, l);
    if ($t.checkActorCanReceiveDamage(c ?? o, o, e), q._shouldUsePersonalDamageV2(e, o, l)) {
      await q.sufferPersonalDamageV2(e, o, c, s, i, r, n, l);
      return;
    }
    await (q.damageModeMethod ?? q.sufferDamageResistanceArmorMonitor)(e, o, c, s, i, r, n), await e.applyArmorDamage(o, c, G.sumModifiers([l], "other", "damageArmor"));
  }
  static _shouldUsePersonalDamageV2(e, t, s) {
    var i, r;
    return !((i = e == null ? void 0 : e.isCharacterLike) != null && i.call(e)) || ![g.monitors.physical, g.monitors.fatigue].includes(t) ? !1 : !!((r = s == null ? void 0 : s.isPersonalWeapon) != null && r.call(s) || (s == null ? void 0 : s.canonicalType) === g.itemType.personalWeapon || (s == null ? void 0 : s.type) === g.itemType.personalWeapon);
  }
  static async sufferPersonalDamageV2(e, t, s, i, r, n, l, o) {
    var m;
    const c = ((m = o == null ? void 0 : o.getCombatProfile) == null ? void 0 : m.call(o)) ?? o ?? null, u = await Qe.apply({
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
    u != null && u.ok && q._notifyPersonalArmorMitigation(e, {
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
    const s = t.armorMitigation ?? {}, i = q._localizeDamageType(t.damageType), r = s.isDestroyed ? "Armor destroyed" : `Base ${Number(s.baseMitigation ?? 0)} + Type ${Number(s.typeMitigationMod ?? 0)} - AP ${Number(t.effectiveAp ?? 0)}`, n = Number(t.adjustedIncoming ?? t.baseIncoming ?? 0), l = Number(t.finalDamage ?? 0), o = (((u = t.tagEffectResult) == null ? void 0 : u.applied) ?? []).map((m) => `${m.tag} +${Math.round((Number(m.bonus ?? 0) || 0) * 100)}%`).join(", "), c = o ? ` [${o}]` : "";
    ui.notifications.info(
      `${e.name} mitigated ${i}: ${r}${c}. Incoming ${n}, final ${l}.`
    );
  }
  static async sufferDamageResistanceArmorMonitor(e, t, s, i, r, n, l) {
    const o = N.resistanceDetail(e, t, s), c = o.value;
    let u = 0;
    if (n) {
      const m = Math.min(c, i), d = Math.min(c - m, r);
      u = i - m, N.useArmor(t) && (u -= await q.damageToArmor(e, s, u)), u += r - d;
    } else
      u = i + r - c, N.useArmor(t) && (u -= await q.damageToArmor(e, s, u));
    u > 0 && await N.addCounter(e, t, u), q._notifyResistanceUsage(e, t, s, o);
  }
  static async sufferDamageArmorResistanceMonitor(e, t, s, i, r, n, l) {
    let o = 0;
    N.useArmor(t) ? n ? (i -= await q.damageToArmor(e, s, i), o = r + i) : (o = r + i, o -= await q.damageToArmor(e, s, o)) : o = i + r;
    const c = N.resistanceDetail(e, t, s);
    return o -= c.value, o > 0 && await N.addCounter(e, t, o), q._notifyResistanceUsage(e, t, s, c), o;
  }
  static async sufferDamageArmorAsResistance_Cyberpunk(e, t, s, i, r, n, l) {
    let o = i + r;
    if (N.useArmor(t) && o > 0) {
      const u = n ? r : 0, m = Math.max(0, q._computeArmorResistance(e) - u);
      m > 0 && (await N.addCounter(e, "armor", 1), o -= m);
    }
    const c = N.resistanceDetail(e, t, s);
    return o -= c.value, o > 0 && await N.addCounter(e, t, o), q._notifyResistanceUsage(e, t, s, c), Math.max(o, 0);
  }
  static async sufferDamageArmorAsResistance_Earthdawn(e, t, s, i, r, n, l) {
    let o = i + r;
    if (N.useArmor(t) && !n && o > 0) {
      const u = q._computeArmorResistance(e);
      u > 0 && (await N.addCounter(e, "armor", 1), o -= u);
    }
    o -= q._computeStrengthResistance(e, t);
    const c = N.resistanceDetail(e, t, s);
    return o -= c.value, o > 0 && await N.addCounter(e, t, o), q._notifyResistanceUsage(e, t, s, c), o;
  }
  static async damageToArmor(e, t, s) {
    if (s > 0) {
      const i = N.max(e, g.monitors.armor), r = N.getCounterValue(e, g.monitors.armor), n = Math.min(i - r, s), l = N.resistance(e, g.monitors.armor, t), o = Math.max(0, n - l);
      return o > 0 && await N.addCounter(e, g.monitors.armor, o), n;
    } else
      return 0;
  }
  static _resolveDamageContext(e, t, s) {
    var l;
    const i = (typeof t == "object" ? (t == null ? void 0 : t.damageType) ?? (t == null ? void 0 : t.type) : t) ?? ((l = s == null ? void 0 : s.system) == null ? void 0 : l.damageType), r = typeof t == "object" ? (t == null ? void 0 : t.monitor) ?? i : i;
    return { monitor: e.getDamageMonitor(r), damageType: i };
  }
  static _notifyResistanceUsage(e, t, s, i) {
    var u;
    if (!i || t === void 0)
      return;
    const r = w.actor.monitors[t] ?? t, n = q._localizeDamageType(s) ?? r, l = i.usedType ? "type" : "default", o = ((u = w.actor.monitors.resistanceSources) == null ? void 0 : u[l]) ?? l, c = se(w.actor.monitors.resistanceApplied, {
      actor: e.name,
      monitor: r,
      damageType: n,
      value: i.value,
      source: o
    });
    ui.notifications.info(c);
  }
  static _localizeDamageType(e) {
    if (e)
      return za(e) ? kt(e) : w.mwd.weaponDamageType[e] ?? w.mwd.personalDamageType[e] ?? w.actor.monitors[e] ?? e;
  }
  static _computeArmorResistance(e) {
    const t = N.max(e, "armor"), s = N.getCounterValue(e, "armor"), i = Math.max(0, t - s);
    return Math.max(0, Math.ceil(i / 3));
  }
  static _computeStrengthResistance(e, t) {
    const s = e.getAttributeValue(g.actorAttributes.strength);
    return Math.max(0, Math.floor(s / 4));
  }
}
class xe extends Actor {
  static init() {
    Hooks.on("updateActor", (e, t, s, i) => {
      var r;
      return (r = Ve.firstResponsible(e)) == null ? void 0 : r.onUpdateActor(t, s);
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
      const l = e.getAttributeValue(s.system.attribute) + s.system.value, o = e.getAttributeValue(i.system.attribute) + i.system.value;
      return l > o ? -1 : l < o ? 1 : 0;
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
    return [g.actorTypes.vehicle, g.actorTypes.battlemech].includes(this.type);
  }
  prepareData() {
    super.prepareData(), this._prepareEdgePools(), this.cleanupFavorites();
  }
  prepareDerivedData() {
    if (this.system.modifiers = {
      initiative: G.sumModifiers(this.items, "other", "initiative")
    }, this.system.monitors) {
      const e = J.getDamageTypes();
      Object.entries(this.system.monitors).forEach((t) => {
        t[1].resistance = xe.normalizeResistance(t[1].resistance), t[1].maxBonus = G.sumMonitorModifiers(this.items, t[0], "max"), t[1].resistanceBonus = G.sumMonitorModifiers(this.items, t[0], "resistance"), t[1].resistanceBonusByType = Object.fromEntries(
          e.map((s) => [s.value, G.sumMonitorModifiers(this.items, t[0], "resistanceByType", s.value)]).filter(([, s]) => s)
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
    return Gt[this.type] ?? [];
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
    const e = this.getAttributeValue(g.actorAttributes.edge), t = foundry.utils.getProperty(this.system, "counters.edgePools") ?? {};
    Object.values(g.counters.edgePools).forEach((i) => {
      const r = t[i] ?? {}, n = r.value;
      r.value = n ?? e ?? 0, r.value = Math.min(r.value, e ?? r.value ?? 0), r.max = e ?? r.max ?? 0, t[i] = r;
    }), foundry.utils.setProperty(this.system, "counters.edgePools", t);
  }
  async setCheckbarValue(e, t) {
    return await this.update({ [e]: t });
  }
  _getMonitorMax(e) {
    const t = this.getAttributeValue(e);
    return t == 0 ? 0 : Ba + j.divup(t, 2);
  }
  getAttributeActions() {
    return ue.getActorActions(this);
  }
  getUsableAttributes(e = void 0) {
    const t = (e ? [e] : this.items).map((i) => i.getAttributes()).reduce((i, r) => i.concat(r), []), s = j.distinct(this.getAttributes().concat(t));
    return s.sort(j.ascendingBySortedArray(J.sortedAttributeKeys)), s;
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
      s += G.sumModifiers(this.items, "attribute", e);
    }
    return s;
  }
  resolveDamageType(e) {
    switch (e) {
      case "stun":
        return g.monitors.fatigue;
    }
    return e;
  }
  getDamageMonitor(e) {
    e = this.resolveDamageType(e);
  }
  async applyArmorDamage(e, t, s = 0) {
    switch (e = this.resolveDamageType(e), e) {
      case g.monitors.physical:
      case g.monitors.fatigue:
        await q.damageToArmor(this, t, s);
    }
  }
  async rollAttribute(e) {
    await Je.rollAttribute(this, e);
  }
  async rollAttributeAction(e) {
    const t = ue.getActorAction(this, e);
    await Je.rollAttributeAction(this, t);
  }
  async rollSkill(e, t) {
    await Je.rollSkill(this, e, t);
  }
  async rollWeapon(e) {
    var r, n, l;
    $t.checkWeaponDefense(e, this);
    const t = (r = e.validateTargets(this)) == null ? void 0 : r.map((o) => o.id), s = {
      attackerTokenId: (l = (n = game.scenes.current) == null ? void 0 : n.tokens.find((o) => {
        var c;
        return ((c = o.actor) == null ? void 0 : c.id) == this.id;
      })) == null ? void 0 : l.id,
      targetedTokenIds: t
    }, i = this.items.find((o) => e.isWeaponSkill(o));
    await Je.rollWeapon(this, i, e, s);
  }
  async rollDefense(e) {
    const t = e.attack.defense, s = ue.getActorDefense(this, t);
    await Je.rollDefense(this, s, e);
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
      case g.monitors.physical:
      case g.monitors.fatigue:
        return this.getDamageMonitor(e) != null;
    }
    return !1;
  }
  canReceiveDamage(e) {
    return this.canApplyDamage(e);
  }
  async onEnterCombat() {
    const e = G.sumModifiers(this.items, "other", "sceneAnarchy");
    e > 0 && await N.setCounter(this, g.monitors.sceneAnarchy, e);
  }
  async onLeaveCombat() {
    await N.setCounter(this, g.monitors.sceneAnarchy, 0);
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
    await this.spendEdgePool(g.counters.social.credibility, e);
  }
  async spendRumor(e) {
    await this.spendEdgePool(g.counters.mental.rumor, e);
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
    const t = this.getAttributeValue(g.actorAttributes.edge), i = ((n = (r = this.getEdgePools()) == null ? void 0 : r[e]) == null ? void 0 : n.value) ?? t ?? 0;
    return Math.min(i, t ?? i ?? 0);
  }
  getRemainingEdge(e = void 0) {
    return e ? this.getEdgePoolValue(e) : Math.max(0, ...Object.values(g.counters.edgePools).map((t) => this.getEdgePoolValue(t)));
  }
  canUseEdge() {
    return this.getAttributes().includes(g.actorAttributes.edge);
  }
  async spendEdgePool(e, t) {
    t != 0 && await N.addCounter(this, e, -t);
  }
  async spendEdge(e, t = g.counters.edgePools.grit) {
    if (e != 0) {
      if (!this.canUseEdge()) {
        const s = w.actorType[this.type] ?? this.type, i = `${this.name} (${s}) cannot use Edge`;
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
    const s = xe._prepareFavorite(e, t);
    return !!this.system.favorites.find((i) => xe._isSameFavorite(s, i));
  }
  static _prepareFavorite(e, t) {
    return { type: e, id: t };
  }
  static _isSameFavorite(e, t) {
    return e.id == t.id && e.type == t.type;
  }
  async switchFavorite(e, t, s) {
    const i = xe._prepareFavorite(t, s), r = this.system.favorites.filter((n) => !xe._isSameFavorite(i, n));
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
    const s = xe._prepareFavorite(e, t);
    if (e == "attributeAction") {
      const r = ue.prepareShortcut(this, t);
      if (r)
        return foundry.utils.mergeObject(r, s);
    } else if (Object.values(g.itemType).includes(e)) {
      const r = (i = this.items.get(t)) == null ? void 0 : i.prepareShortcut();
      if (r)
        return foundry.utils.mergeObject(r, s);
    }
    return s;
  }
  async _onSetManualStepper(e, t) {
    var n, l;
    e == null || e.preventDefault();
    const s = (n = t == null ? void 0 : t.dataset) == null ? void 0 : n.id, i = Number((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.value);
    if (!s || Number.isNaN(i)) return;
    const r = this._mwd.state.manual.find((o) => o.id === s);
    if (r)
      return r.value = i, this.render(!1);
  }
}
const { ApplicationV2: uo, HandlebarsApplicationMixin: mo } = foundry.applications.api, { renderTemplate: Ta } = foundry.applications.handlebars, po = `${B}/chat/celebrity-roll.hbs`, jt = class jt extends mo(uo) {
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
        G.computeModifiers(e.items, "other", "celebrity")
      ),
      other: {
        label: w.common.roll.modifiers.other,
        value: 0
      },
      ANARCHY: w
    }, s = await Ta(`${B}/dialog/roll-celebrite-title.hbs`, t), i = {
      id: `roll-celebrity-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...jt.DEFAULT_OPTIONS.classes],
      window: { title: s }
    };
    return new jt({ roll: t }, i).render({ force: !0 });
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
      await jt.doRoll(this.roll), await this.close();
    }), s.find('[data-action="cancel"]').on("click", async () => {
      await this.close();
    });
  }
  static async doRoll(e) {
    const t = [
      e.celebrity,
      e.modifiers,
      e.other
    ], s = j.sumValues(t, (l) => l.value), i = {
      actor: e.actor,
      parameters: t,
      pool: s,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      },
      ANARCHY: w
    }, r = new Roll(`${s}d6cs>=5`);
    await r.evaluate();
    const n = await Ta(po, i);
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
R(jt, "PARTS", {
  body: {
    template: `${B}/dialog/roll-celebrite.hbs`
  }
});
let Ri = jt;
const { renderTemplate: ho } = foundry.applications.handlebars, fo = `${B}/chat/actor-say-word.hbs`;
class Sa extends xe {
  static get initiative() {
    return xe.initiative + " + max(@attributes.reflexes.value, @attributes.intelligence.value)";
  }
  hasOwnAnarchy() {
    return this.hasPlayerOwner;
  }
  prepareDerivedData() {
    !this.system.monitors.fatigue && this.system.monitors.stun && (this.system.monitors.fatigue = foundry.utils.duplicate(this.system.monitors.stun)), this.system.monitors.physical.max = this._getMonitorMax(g.actorAttributes.strength), this.system.monitors.fatigue.max = this._getMonitorMax(g.actorAttributes.willpower), super.prepareDerivedData(), this.system.ignoreWounds = G.sumModifiers(this.items, "other", "ignoreWounds");
  }
  computePhysicalState() {
    var o, c;
    const e = Math.max(0, Number(((o = this.system.monitors.armor) == null ? void 0 : o.max) ?? 0)), t = Math.min(
      e,
      Math.max(0, Number(((c = this.system.monitors.armor) == null ? void 0 : c.value) ?? 0))
    ), s = Math.max(0, e - t), i = Math.max(this.system.monitors.physical.max, this.system.monitors.fatigue.max) + e, r = this.system.monitors.physical.value == this.system.monitors.physical.max, n = this.system.monitors.fatigue.max == this.system.monitors.fatigue.value, l = r || n ? i : Math.max(this.system.monitors.physical.value, this.system.monitors.fatigue.value) + s;
    return {
      max: i,
      value: i - l
    };
  }
  getAttributes() {
    return Gt[this.type] ?? Gt[g.actorTypes.character];
  }
  getPhysicalAgility() {
    return g.actorAttributes.reflexes;
  }
  getCorrespondingAttribute(e) {
    return g.itemAttributes.firewall == e ? g.itemAttributes.firewall : super.getCorrespondingAttribute(e);
  }
  getDamageMonitor(e) {
    switch (e = this.resolveDamageType(e), e) {
      case g.monitors.fatigue:
      case g.monitors.physical:
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
      content: await ho(
        fo,
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
    j.reindexIds(s), await this.update({ [`system.${e}`]: s });
  }
  getCelebrityValue() {
    return this.getEdgePoolValue(g.counters.social.legend);
  }
  getCredibilityValue() {
    return this.getEdgePoolValue(g.counters.social.credibility);
  }
  getRumorValue() {
    return this.getEdgePoolValue(g.counters.mental.rumor);
  }
  getAnarchy() {
    return this.hasOwnAnarchy() ? {
      value: this.system.counters.anarchy.value,
      max: this.system.counters.anarchy.max,
      scene: this.getAnarchyScene()
    } : super.getAnarchy();
  }
  getAnarchyScene() {
    return this.getEdgePoolValue(g.counters.edgePools.chaos);
  }
  async spendAnarchy(e) {
    if (e > 0) {
      const t = this.getAnarchyScene(), s = this.getAnarchyValue();
      $t.checkSufficient(w.actor.counters.anarchy, e, s + t);
      const i = Math.min(t, e), r = e - i;
      i > 0 && N.addCounter(this, g.monitors.sceneAnarchy, -i), this.hasPlayerOwner ? (await game.system.anarchy.gmAnarchy.actorGivesAnarchyToGM(this, e), N.addCounter(this, g.monitors.anarchy, -r)) : r > 0 && super.spendAnarchy(r);
    }
  }
  canUseEdge() {
    return !0;
  }
  getWounds() {
    const e = j.divint(this.system.monitors.fatigue.value, 3) + j.divint(this.system.monitors.physical.value, 3);
    return Math.max(0, e - this.system.ignoreWounds);
  }
  async rollCelebrity() {
    await Ri.create(this);
  }
}
class cr extends xe {
  prepareDerivedData() {
    this._prepareMwdAttributes(), this._prepareMwdMonitors(), this._prepareMwdItems(), super.prepareDerivedData();
  }
  static get defaultIcon() {
    return `${Ws}/default/Default_Vehicle.svg`;
  }
  static get initiative() {
    return xe.initiative + " + max(@attributes.system.value, @attributes.handling.value)";
  }
  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    };
  }
  getAttributes() {
    return Gt[this.type] ?? Gt[g.actorTypes.vehicle];
  }
  getPhysicalAgility() {
    return g.actorAttributes.handling;
  }
  getDamageMonitor(e) {
    switch (e = this.resolveDamageType(e), e) {
      case g.monitors.physical:
        return g.monitors.structure;
      case g.monitors.fatigue:
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
      [g.actorAttributes.handling]: { value: 0 },
      [g.actorAttributes.system]: { value: 0 },
      [g.actorAttributes.condition]: { value: 0 },
      [g.actorAttributes.chassis]: { value: 0 }
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
    var i, r, n, l, o, c, u, m;
    const e = this.system.mwd = this.system.mwd ?? {}, t = this.system.monitors = this.system.monitors ?? {}, s = {
      value: ((i = t.structure) == null ? void 0 : i.value) ?? 0,
      max: ((r = t.structure) == null ? void 0 : r.max) ?? (this.type === g.actorTypes.battlemech ? 18 : 15),
      resistance: xe.normalizeResistance((n = t.structure) == null ? void 0 : n.resistance)
    };
    if (t.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(s),
      t.structure ?? {},
      { inplace: !1, recursive: !0 }
    ), e.monitors = e.monitors ?? {}, e.monitors.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(s),
      e.monitors.structure ?? {},
      { inplace: !1, recursive: !0 }
    ), this.type === g.actorTypes.battlemech) {
      const d = {
        value: ((l = t.heat) == null ? void 0 : l.value) ?? ((o = e.heat) == null ? void 0 : o.current) ?? 0,
        max: ((c = t.heat) == null ? void 0 : c.max) ?? ((u = e.heat) == null ? void 0 : u.hardMax) ?? 4,
        resistance: xe.normalizeResistance((m = t.heat) == null ? void 0 : m.resistance)
      };
      t.heat = foundry.utils.mergeObject(
        foundry.utils.duplicate(d),
        t.heat ?? {},
        { inplace: !1, recursive: !0 }
      ), e.monitors.heat = foundry.utils.mergeObject(
        foundry.utils.duplicate(d),
        e.monitors.heat ?? {},
        { inplace: !1, recursive: !0 }
      );
    }
  }
  _prepareMwdItems() {
    const e = this.system.mwd = this.system.mwd ?? {}, t = {
      skills: ["skill"],
      traits: ["trait", g.itemType.quality],
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
const ka = {
  light: 4,
  medium: 5,
  heavy: 6,
  assault: 7
}, go = { mode: "normal", allowedWeaponIds: [], typeRestriction: "" }, yo = {
  baseProfile: { name: "Unarmed", damage: "", notes: "" },
  maxWeapons: 0,
  allowedLocations: []
};
class bo {
  constructor(e) {
    this.actor = e, this.mwd = e.system.mwd ?? {};
  }
  compute() {
    const e = this.mwd.weightClass ?? "medium", t = ka[e] ?? ka.medium, s = this._normalizeHardpoints(), i = this._normalizeWeaponGroups(), r = i.find((f) => f.isPrimary), n = i.filter((f) => f.isPrimary), l = this._primarySlot(), o = [], c = [];
    n.length > 1 && o.push(w.mwd.loadout.errors.multiplePrimary);
    const u = r ? t - 1 : t, m = i.length + (r ? 1 : 0);
    i.length > u && o.push(se(w.mwd.loadout.errors.mountPointsExceeded, {
      used: m,
      total: t
    }));
    const d = this._getWeapons((f) => (f.system.weaponCategory ?? "ranged") !== "melee"), h = new Map(d.map((f) => [f.id, f])), p = /* @__PURE__ */ new Set(), b = s.map((f) => ({ ...f, occupiedBy: null, occupiedByName: void 0 }));
    for (const f of i)
      for (const A of f.weaponIds ?? []) {
        const M = h.get(A);
        if (!M) {
          c.push(se(w.mwd.loadout.warnings.weaponMissing, { weapon: A }));
          continue;
        }
        const k = M.system.hardpointType ?? "energy", P = M.system.hardpointSize ?? "small";
        if (p.has(A)) {
          o.push(se(w.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: M.name }));
          continue;
        }
        if (p.add(A), f.isPrimary && this._validatePrimaryWeapon(M, k, P, l, o), (M.system.weaponCategory ?? "ranged") === "melee")
          continue;
        const W = b.find((I) => !I.occupiedBy && I.type === k && I.size === P);
        W ? (W.occupiedBy = f.id, W.occupiedByName = f.name) : o.push(se(w.mwd.loadout.errors.hardpointUnavailable, {
          weapon: M.name,
          type: w.mwd.hardpointType[k] ?? k,
          size: w.mwd.hardpointSize[P] ?? P
        }));
      }
    r && (!r.weaponIds || r.weaponIds.length === 0) && o.push(w.mwd.loadout.errors.primaryWithoutWeapon);
    const y = this._computeMeleeState(o);
    return {
      mountPoints: {
        total: t,
        used: m,
        remaining: Math.max(0, t - m)
      },
      weightClass: e,
      hardpoints: b,
      weaponGroups: i,
      primaryGroupId: r == null ? void 0 : r.id,
      errors: o,
      warnings: c,
      meleeProfiles: y.profiles,
      meleeLimit: y.limit
    };
  }
  _normalizeWeaponGroups() {
    return (this.mwd.weaponGroups ?? []).map((e, t) => ({
      id: e.id ?? `group-${t + 1}`,
      name: e.name || se(w.common.newName, { type: w.itemType.singular.weapon }),
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
    const e = foundry.utils.mergeObject(foundry.utils.duplicate(go), this.mwd.primarySlot ?? {});
    return e.allowedWeaponIds = this._asArray(e.allowedWeaponIds), e;
  }
  _computeMeleeState(e) {
    var l, o, c;
    const t = foundry.utils.mergeObject(foundry.utils.duplicate(yo), this.mwd.melee ?? {}), s = this._getWeapons((u) => (u.system.weaponCategory ?? "ranged") === "melee"), i = [], r = Number(t.maxWeapons ?? 0);
    s.length > r && e.push(se(w.mwd.loadout.errors.meleeLimitExceeded, {
      equipped: s.length,
      limit: r
    }));
    const n = this._asArray(t.allowedLocations);
    return i.push({
      name: ((l = t.baseProfile) == null ? void 0 : l.name) || w.mwd.melee.baseProfile,
      damage: ((o = t.baseProfile) == null ? void 0 : o.damage) ?? "",
      notes: ((c = t.baseProfile) == null ? void 0 : c.notes) ?? ""
    }), s.forEach((u) => {
      var m;
      n.length > 0 && u.system.mountLocation && !n.includes(u.system.mountLocation) && e.push(se(w.mwd.loadout.errors.meleeLocationRestricted, {
        weapon: u.name,
        location: w.mwd.meleeLocation[u.system.mountLocation] ?? u.system.mountLocation
      })), i.push({
        name: u.name,
        damage: u.getDamageCode(),
        notes: ((m = u.system.references) == null ? void 0 : m.description) ?? ""
      });
    }), { profiles: i, limit: r };
  }
  _validatePrimaryWeapon(e, t, s, i, r) {
    var n;
    i.mode === "converted" ? (((n = i.allowedWeaponIds) == null ? void 0 : n.length) > 0 && !i.allowedWeaponIds.includes(e.id) && r.push(se(w.mwd.loadout.errors.primaryNotAllowedWeapon, { weapon: e.name })), i.typeRestriction && t !== i.typeRestriction && r.push(se(w.mwd.loadout.errors.primaryTypeRestriction, {
      weapon: e.name,
      type: w.mwd.hardpointType[i.typeRestriction] ?? i.typeRestriction
    }))) : s !== "large" && r.push(se(w.mwd.loadout.errors.primaryNeedsLarge, { weapon: e.name }));
  }
  _getWeapons(e) {
    return this.actor.items.filter((t) => t.type === g.itemType.mechWeapon).filter((t) => {
      var s;
      return (s = t.isActive) == null ? void 0 : s.call(t);
    }).filter(e);
  }
  _asArray(e) {
    return Array.isArray(e) ? e : e == null || e === "" ? [] : [e];
  }
}
class wo extends cr {
  static get defaultIcon() {
    return `${Ws}/vehicles/apc.svg`;
  }
  prepareDerivedData() {
    var e;
    super.prepareDerivedData(), this.system.mwd = this.system.mwd ?? {}, this.system.mwd.chassis = this.system.mwd.chassis ?? "", this.system.mwd.tonnage = this.system.mwd.tonnage ?? 0, this.system.mwd.loadout = new bo(this).compute(), this.system.mwd.weaponGroupDetails = this._prepareConfiguredWeaponGroups(), this.system.mwd.heat = this._prepareHeatTrack(), this.system.mwd.primaryGroupName = ((e = this.system.mwd.weaponGroupDetails.find((t) => t.isPrimary)) == null ? void 0 : e.name) ?? "", this.system.skills = this._prepareSkillMap(), this.system.weaponGroups = this._prepareWeaponGroups(), this.system.meleeProfiles = this._prepareMeleeProfiles(), this.system.quickActions = {
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
    const s = t.weaponIds.map((i) => this.items.get(i)).filter((i) => i);
    await this._rollQuickSkill(this.system.skills.gunnery, {
      quickAction: {
        title: w.actor.vehicle.quickActions.rangedAttack,
        weaponGroup: this._serializeWeaponGroup(t, s)
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
    const e = [this.system.skills.perception, this.system.skills.technician].filter((s) => s);
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
    const e = this.system ?? {}, t = ((l = e.monitors) == null ? void 0 : l.heat) ?? { value: 0, max: 0 }, s = ((o = e.mwd) == null ? void 0 : o.heat) ?? {}, i = {
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
      label: w.actor.battlemech.heat.status[n] ?? n
    }, r;
  }
  _resolveHeatStatus(e, t, s) {
    return e >= ((t == null ? void 0 : t.shutdown) ?? s) ? "shutdown" : e >= ((t == null ? void 0 : t.overheated) ?? s) ? "overheated" : e >= ((t == null ? void 0 : t.runningHot) ?? 0) ? "runningHot" : "safe";
  }
  _prepareConfiguredWeaponGroups() {
    var s;
    const e = ((s = this.system.mwd) == null ? void 0 : s.weaponGroups) ?? [], t = new Map(this.items.map((i) => [i.id, i]));
    return e.map((i, r) => {
      const n = Array.isArray(i.weaponIds) ? i.weaponIds : i.weaponIds ? [i.weaponIds] : [], l = n.map((c) => t.get(c)).filter((c) => (c == null ? void 0 : c.type) === g.itemType.mechWeapon), o = n.filter((c) => !t.has(c));
      return {
        id: i.id ?? `group-${r + 1}`,
        index: r,
        name: i.name || se(w.common.newName, { type: w.itemType.singular.weapon }),
        weaponIds: n,
        isPrimary: i.isPrimary ?? !1,
        weapons: l,
        missingWeaponIds: o
      };
    });
  }
  _resolveSkill(e) {
    var i;
    const t = this.items.find((r) => r.type === g.itemType.skill && r.system.code === e);
    if (t)
      return t;
    const s = at(e);
    if (s)
      return {
        name: s.label ?? ((i = w.skill) == null ? void 0 : i[e]) ?? e,
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
        weaponIds: n.weapons.map((l) => l.id),
        isPrimary: n.isPrimary ?? !1
      }));
    const t = this.items.filter((n) => n.type === g.itemType.mechWeapon);
    if (t.length === 0)
      return [];
    const s = t.filter((n) => this.hasFavorite(g.itemType.mechWeapon, n.id)), i = [];
    return s.length > 0 && i.push({
      id: "favorite",
      name: w.actor.vehicle.quickActions.primaryWeapons,
      weaponIds: s.map((n) => n.id),
      isPrimary: !0
    }), i.push({
      id: "all",
      name: w.actor.vehicle.quickActions.allWeapons,
      weaponIds: t.map((n) => n.id),
      isPrimary: i.length === 0
    }), i;
  }
  _prepareMeleeProfiles() {
    const e = [{
      id: "unarmed",
      name: w.actor.vehicle.quickActions.unarmed,
      weaponId: null,
      damage: 1,
      notes: w.actor.vehicle.quickActions.unarmedNotes
    }], t = this.items.filter((s) => s.type === g.itemType.mechWeapon && s.system.skill === "meleeCombat");
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
    const s = ((r = e == null ? void 0 : e.system) == null ? void 0 : r.attribute) ?? this.getPhysicalAgility(), i = foundry.utils.mergeObject(Je.prepareActorRoll(this), {
      mode: Ne.rollType.skill,
      skill: e,
      attribute1: s,
      specialization: void 0
    });
    t.quickAction && (i.quickAction = t.quickAction), await Je.create(i);
  }
  async _promptWeaponGroup(e) {
    if (e.length === 1)
      return e[0];
    const t = e.find((r) => r.isPrimary) ?? e[0], s = `<form class="mwd-quick-select">${e.map((r) => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${r.id}" ${r.id === t.id ? "checked" : ""}>
        <span>${r.name}${r.isPrimary ? ` (${w.actor.vehicle.quickActions.primaryLabel})` : ""}</span>
      </label>`).join("")}</form>`, i = await Dialog.prompt({
      title: w.actor.vehicle.quickActions.selectWeaponGroup,
      content: s,
      label: w.common.roll.button,
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
      title: w.actor.vehicle.quickActions.selectMeleeProfile,
      content: s,
      label: w.common.roll.button,
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
      title: w.actor.vehicle.quickActions.selectSensorSkill,
      content: t,
      label: w.common.roll.button,
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
const { ApplicationV2: Ao, HandlebarsApplicationMixin: To } = foundry.applications.api, So = "mwd-gmgadget", ur = "gmDnPresets", Rs = "gmNextDn", ts = "gmDnAnnounceToChat", ko = Object.freeze([
  { label: "Standard", dn: 1 },
  { label: "Challenging", dn: 2 },
  { label: "Hard", dn: 3 },
  { label: "Extreme", dn: 4 }
]), Mo = "systems/mwd/templates/v2/mwd-gmgadget.hbs", ss = Object.freeze({
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
function vo(a = "") {
  return String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean).map((e) => {
    const [t, s] = e.split(":").map((n) => (n ?? "").trim()), i = t || "DN", r = Number.isFinite(Number(s)) ? Number(s) : Number(t);
    return {
      label: i,
      dn: Number.isFinite(r) ? Math.max(0, Math.trunc(r)) : null
    };
  }).filter((e) => Number.isFinite(e.dn));
}
function Eo(a = []) {
  const e = new Error(a[0] ?? "Invalid GM DN presets.");
  return e.validationErrors = Array.isArray(a) ? a.filter(Boolean) : [], e;
}
function Ro() {
  return foundry.utils.deepClone(ko);
}
function gs(a, { strict: e = !1 } = {}) {
  const t = typeof a == "string" ? vo(a) : Array.isArray(a) ? a : [], s = [], i = [], r = /* @__PURE__ */ new Set();
  if (t.forEach((n, l) => {
    const o = String((n == null ? void 0 : n.label) ?? "").trim(), c = n == null ? void 0 : n.dn, u = `Preset ${l + 1}`;
    if (!o) {
      e && i.push(`${u}: label cannot be blank.`);
      return;
    }
    const m = o.toLowerCase();
    if (r.has(m)) {
      e && i.push(`${u}: duplicate label "${o}".`);
      return;
    }
    const d = Number(c);
    if (!Number.isFinite(d)) {
      e && i.push(`${u}: DN must be numeric.`);
      return;
    }
    if (d < 0) {
      e && i.push(`${u}: DN cannot be negative.`);
      return;
    }
    r.add(m), s.push({
      label: o,
      dn: Math.trunc(d)
    });
  }), e && i.length) throw Eo(i);
  return s;
}
function si(a = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(ss),
    a ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function Co(a) {
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
function No(a) {
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
function Po(a) {
  return Qe.getStatusOptions(a);
}
function Do(a = "mwd") {
  game.settings.register(a, Rs, {
    scope: "client",
    config: !1,
    type: Number,
    default: 1
  }), game.settings.register(a, ts, {
    scope: "client",
    config: !0,
    name: "Announce GM DN changes to chat",
    hint: "If enabled, posts a small chat notice when you change the current DN preset.",
    type: Boolean,
    default: !1
  });
}
const ze = class ze extends To(Ao) {
  constructor({ systemId: e = "mwd", ...t } = {}) {
    super(t), this.systemId = e, this.activeTab = "difficulty", this.harmState = si();
  }
  async render(e = {}) {
    var t;
    return (t = game.user) != null && t.isGM ? super.render(e) : this;
  }
  async _prepareContext(e) {
    var d, h, p;
    const t = await super._prepareContext(e), s = gs(
      game.settings.get(this.systemId, ur),
      { strict: !1 }
    ), i = Number(game.settings.get(this.systemId, Rs) ?? 1), r = !!game.settings.get(this.systemId, ts), n = Qe.getActorOptions(), l = Qe.getSceneTarget(), o = this.harmState.actorId ? ((h = (d = game.actors) == null ? void 0 : d.get) == null ? void 0 : h.call(d, this.harmState.actorId)) ?? null : null, c = Qe.resolveTarget({
      actor: o,
      actorId: this.harmState.actorId,
      preferSceneTarget: !0
    }), u = Po(c.actor ?? o ?? null), m = si(this.harmState);
    return !m.statusId && u.length && (m.statusId = u[0].value, this.harmState.statusId = m.statusId), foundry.utils.mergeObject(t, {
      presets: s,
      currentDn: i,
      currentTab: this.activeTab,
      announce: r,
      isGM: ((p = game.user) == null ? void 0 : p.isGM) ?? !1,
      harm: {
        state: m,
        actorOptions: n,
        modes: Qe.MODE_OPTIONS,
        damageTypes: lo,
        statusOptions: u,
        sceneTarget: Co(l),
        effectiveTarget: No(c),
        canApply: !!c.actor,
        applyReason: c.reason || "",
        useArmorAvailable: m.mode === "physical" || m.mode === "fatigue",
        showDamageType: (m.mode === "physical" || m.mode === "fatigue") && m.useArmor,
        showStatusFields: m.mode === "status",
        showDeltaFields: m.mode !== "status"
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
    const s = (n, l = "") => {
      const o = t.querySelector(n);
      return o instanceof HTMLInputElement || o instanceof HTMLSelectElement || o instanceof HTMLTextAreaElement ? o.value : l;
    }, i = (n, l = !1) => {
      const o = t.querySelector(n);
      return o instanceof HTMLInputElement ? o.checked : l;
    };
    return this.harmState = si({
      actorId: s('[name="harm-actorId"]', this.harmState.actorId),
      mode: s('[name="harm-mode"]', this.harmState.mode),
      delta: Number(s('[name="harm-delta"]', this.harmState.delta)),
      useArmor: i('[name="harm-useArmor"]', this.harmState.useArmor),
      damageType: s('[name="harm-damageType"]', this.harmState.damageType),
      statusId: s('[name="harm-statusId"]', this.harmState.statusId),
      statusActive: s('[name="harm-statusActive"]', this.harmState.statusActive ? "add" : "remove") !== "remove",
      source: s('[name="harm-source"]', this.harmState.source),
      notes: s('[name="harm-notes"]', this.harmState.notes)
    }), Number.isFinite(Number(this.harmState.delta)) || (this.harmState.delta = ss.delta), this.harmState;
  }
  async _onSetDn(e, t) {
    var r, n, l;
    if (e.preventDefault(), e.stopPropagation(), !((r = game.user) != null && r.isGM)) return;
    const s = Math.max(0, Math.trunc(Number(((n = t == null ? void 0 : t.dataset) == null ? void 0 : n.dn) ?? NaN)));
    if (!Number.isFinite(s)) return;
    if (await game.settings.set(this.systemId, Rs, s), !!game.settings.get(this.systemId, ts)) {
      const o = String(((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.label) ?? `DN ${s}`);
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ user: game.user }),
        content: `<div class="mwd-gm-notice"><b>GM Difficulty:</b> ${foundry.utils.escapeHTML(o)} (DN ${s} hits)</div>`
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
      return await game.settings.set(this.systemId, Rs, 1), this.render({ parts: ["body"] });
  }
  async _onToggleAnnounce(e, t) {
    var i;
    if (e.preventDefault(), e.stopPropagation(), !((i = game.user) != null && i.isGM)) return;
    const s = !game.settings.get(this.systemId, ts);
    return await game.settings.set(this.systemId, ts, s), this.render({ parts: ["body"] });
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
    var n, l, o, c, u;
    if ((n = e == null ? void 0 : e.preventDefault) == null || n.call(e), (l = e == null ? void 0 : e.stopPropagation) == null || l.call(e), !((o = game.user) != null && o.isGM)) return;
    const s = this._captureHarmStateFromDom(t), i = this._buildHarmPayload(s);
    if (!i) {
      (c = ui.notifications) == null || c.warn("Choose a valid harm action before applying it.");
      return;
    }
    const r = await Qe.apply({
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
      delta: Ma(e == null ? void 0 : e.delta, ss.delta),
      source: t,
      notes: s
    } : i === "physical" || i === "fatigue" ? {
      mode: "trackDelta",
      track: i,
      delta: Ma(e == null ? void 0 : e.delta, ss.delta),
      useArmor: !!(e != null && e.useArmor),
      damageType: (e == null ? void 0 : e.damageType) ?? ss.damageType,
      source: t,
      notes: s
    } : null;
  }
};
R(ze, "DEFAULT_OPTIONS", {
  id: So,
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
    applyHarm: ze.prototype._onApplyHarm
  }
}), R(ze, "PARTS", {
  body: { template: Mo }
});
let Ci = ze;
function Ma(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
let ii = null;
function Oo({ systemId: a = "mwd" } = {}) {
  return ii || (ii = new Ci({ systemId: a })), ii;
}
const Io = `systems/${S}/templates/settings/collection-editor.hbs`, mr = /* @__PURE__ */ new Map(), ai = /* @__PURE__ */ new Map();
function Vs(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid settings data.");
  return t.validationErrors = e, t;
}
function dr(a) {
  $o(a), mr.set(a.id, a), game.settings.register(S, a.settingKey, {
    scope: "world",
    config: !1,
    type: a.settingType ?? Object,
    default: a.defaultData()
  }), game.settings.registerMenu(S, a.menuKey, {
    name: a.menu.name,
    label: a.menu.label,
    hint: a.menu.hint,
    icon: a.menu.icon,
    type: Lo(a.id),
    restricted: a.menu.restricted ?? !0
  });
}
function _o(a) {
  return mr.get(a) ?? null;
}
function $o(a) {
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
function Lo(a) {
  if (ai.has(a))
    return ai.get(a);
  class e extends pr {
  }
  return R(e, "definitionId", a), ai.set(a, e), e;
}
var H, hr, Ni, Cs, Ns, Ft, Pi, is, fr, gr, Pe;
class pr extends FormApplication {
  constructor(t = {}, s = {}) {
    super(t, s);
    we(this, H);
    const i = E(this, H, Ns).call(this);
    this.editorState = {
      tab: "rows",
      rows: this.definition.toRows(i),
      bulkText: this.definition.serializeBulk(i),
      errors: []
    };
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: `${S}-${this.definitionId}-editor`,
      classes: ["mwd", "mwd-settings-editor"],
      template: Io,
      width: 880,
      height: 760,
      resizable: !0,
      submitOnChange: !1,
      closeOnSubmit: !1
    }, { inplace: !1 });
  }
  get definition() {
    const t = _o(this.constructor.definitionId);
    if (!t)
      throw new Error(`Missing settings collection definition: ${this.constructor.definitionId}`);
    return t;
  }
  get title() {
    var t;
    return this.definition.title ?? ((t = this.definition.menu) == null ? void 0 : t.name) ?? "Settings Editor";
  }
  getData(t = {}) {
    const s = E(this, H, gr).call(this), i = this.editorState.rows.map((r, n, l) => ({
      index: n,
      fields: s.map((o) => E(this, H, fr).call(this, o, r, n)),
      canMoveUp: n > 0,
      canMoveDown: n < l.length - 1
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
        var o;
        const n = r.currentTarget, l = String(((o = n == null ? void 0 : n.dataset) == null ? void 0 : o.action) ?? "").trim();
        l && E(this, H, hr).call(this, l, r, n);
      });
    });
  }
  async _onSubmit(t, { updateData: s = null, preventClose: i = !0, preventRender: r = !0 } = {}) {
    return super._onSubmit(t, { updateData: s, preventClose: i, preventRender: r });
  }
  async _updateObject(t, s) {
    var i;
    E(this, H, Pe).call(this, []);
    try {
      const r = this.editorState.tab === "bulk" ? this.definition.parseBulk(E(this, H, is).call(this)) : this.definition.rowsToValue(E(this, H, Pi).call(this));
      await game.settings.set(S, this.definition.settingKey, r);
      const n = E(this, H, Ns).call(this);
      E(this, H, Cs).call(this, n), await this.close();
    } catch (r) {
      E(this, H, Pe).call(this, ks(r)), this.editorState.errors.length && ((i = ui.notifications) == null || i.error(this.editorState.errors[0])), this.render(!1);
    }
  }
}
H = new WeakSet(), hr = async function(t, s, i) {
  var r, n, l, o, c, u, m, d;
  switch (s.preventDefault(), s.stopPropagation(), t) {
    case "switchRows":
      E(this, H, is).call(this), this.editorState.tab = "rows", E(this, H, Pe).call(this, []), this.render(!1);
      return;
    case "switchBulk":
      E(this, H, Ft).call(this);
      try {
        const h = this.definition.rowsToValue(this.editorState.rows);
        this.editorState.bulkText = this.definition.serializeBulk(h), this.editorState.tab = "bulk", E(this, H, Pe).call(this, []);
      } catch (h) {
        E(this, H, Pe).call(this, ks(h)), this.editorState.errors.length && ((r = ui.notifications) == null || r.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "addRow":
      E(this, H, Ft).call(this), this.editorState.rows.push(((l = (n = this.definition).createEmptyRow) == null ? void 0 : l.call(n)) ?? {}), E(this, H, Pe).call(this, []), this.render(!1);
      return;
    case "removeRow":
      E(this, H, Ft).call(this), this.editorState.rows.splice(Number(((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.index) ?? -1), 1), E(this, H, Pe).call(this, []), this.render(!1);
      return;
    case "moveRowUp":
      E(this, H, Ft).call(this), E(this, H, Ni).call(this, Number(((c = i == null ? void 0 : i.dataset) == null ? void 0 : c.index) ?? -1), -1), E(this, H, Pe).call(this, []), this.render(!1);
      return;
    case "moveRowDown":
      E(this, H, Ft).call(this), E(this, H, Ni).call(this, Number(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.index) ?? -1), 1), E(this, H, Pe).call(this, []), this.render(!1);
      return;
    case "loadBulk":
      try {
        const h = this.definition.parseBulk(E(this, H, is).call(this));
        this.editorState.rows = this.definition.toRows(h), this.editorState.bulkText = this.definition.serializeBulk(h), this.editorState.tab = "rows", E(this, H, Pe).call(this, []);
      } catch (h) {
        E(this, H, Pe).call(this, ks(h)), this.editorState.errors.length && ((m = ui.notifications) == null || m.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "formatBulk":
      try {
        const h = this.definition.parseBulk(E(this, H, is).call(this));
        this.editorState.bulkText = this.definition.serializeBulk(h), E(this, H, Pe).call(this, []);
      } catch (h) {
        E(this, H, Pe).call(this, ks(h)), this.editorState.errors.length && ((d = ui.notifications) == null || d.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "resetSetting":
      E(this, H, Cs).call(this, E(this, H, Ns).call(this)), this.render(!1);
      return;
    case "restoreDefaults":
      E(this, H, Cs).call(this, this.definition.defaultData()), this.render(!1);
      return;
    case "cancel":
      await this.close();
      return;
    default:
      return;
  }
}, Ni = function(t, s) {
  if (!Number.isInteger(t)) return;
  const i = t + s;
  if (t < 0 || i < 0 || i >= this.editorState.rows.length) return;
  const r = [...this.editorState.rows], [n] = r.splice(t, 1);
  r.splice(i, 0, n), this.editorState.rows = r;
}, Cs = function(t) {
  this.editorState.rows = this.definition.toRows(t), this.editorState.bulkText = this.definition.serializeBulk(t), this.editorState.tab = "rows", E(this, H, Pe).call(this, []);
}, Ns = function() {
  const t = game.settings.get(S, this.definition.settingKey);
  return foundry.utils.deepClone(t ?? this.definition.defaultData());
}, Ft = function() {
  this.editorState.rows = E(this, H, Pi).call(this);
}, Pi = function() {
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
}, is = function() {
  var i;
  const t = this.form, s = (i = t == null ? void 0 : t.querySelector) == null ? void 0 : i.call(t, 'textarea[name="bulkText"]');
  return s instanceof HTMLTextAreaElement && (this.editorState.bulkText = s.value), this.editorState.bulkText ?? "";
}, fr = function(t, s, i) {
  const r = t.type ?? "text", n = String((s == null ? void 0 : s[t.key]) ?? t.default ?? ""), l = r === "select" ? xo(t).map((o) => ({
    value: String(o.value ?? ""),
    label: String(o.label ?? o.value ?? ""),
    selected: String(o.value ?? "") === n
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
    options: l
  };
}, gr = function() {
  return this.definition.rowSchema.map((t) => ({
    ...t,
    type: t.type ?? "text"
  }));
}, Pe = function(t = []) {
  this.editorState.errors = Array.isArray(t) ? t.filter(Boolean) : [];
}, R(pr, "definitionId", "");
function xo(a) {
  const e = typeof a.options == "function" ? a.options() : a.options;
  return Array.isArray(e) ? e : [];
}
function ks(a) {
  const e = Array.isArray(a == null ? void 0 : a.validationErrors) ? a.validationErrors.filter(Boolean) : [String((a == null ? void 0 : a.message) ?? "Unable to save settings.").trim()].filter(Boolean);
  return e.length ? e : ["Unable to save settings."];
}
const Bo = "gmDnPresetEditor";
function Ho(a = []) {
  const e = [], t = [], s = /* @__PURE__ */ new Set();
  if ((Array.isArray(a) ? a : []).forEach((i, r) => {
    const n = String((i == null ? void 0 : i.label) ?? "").trim(), l = String((i == null ? void 0 : i.dn) ?? "").trim(), o = `Row ${r + 1}`;
    if (!n) {
      t.push(`${o}: label cannot be blank.`);
      return;
    }
    if (s.has(n.toLowerCase())) {
      t.push(`${o}: duplicate label "${n}".`);
      return;
    }
    s.add(n.toLowerCase());
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
      label: n,
      dn: Math.trunc(c)
    });
  }), t.length) throw Vs(t);
  return gs(e, { strict: !0 });
}
function Wo(a = []) {
  return gs(a, { strict: !1 }).map((e) => ({
    label: e.label,
    dn: String(e.dn)
  }));
}
function Fo(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (s) {
    throw Vs([
      `Bulk JSON must be valid JSON: ${s.message}`
    ]);
  }
  return gs(t, { strict: !0 });
}
function zo(a = []) {
  return JSON.stringify(
    gs(a, { strict: !1 }),
    null,
    2
  );
}
const jo = {
  id: "gm-dn-presets",
  menuKey: Bo,
  settingKey: ur,
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
  defaultData: Ro,
  createEmptyRow: () => ({
    label: "",
    dn: "1"
  }),
  toRows: Wo,
  rowsToValue: Ho,
  parseBulk: Fo,
  serializeBulk: zo
};
function Vo() {
  dr(jo);
}
const Uo = "skillSpecializationEditor";
function Di() {
  return _s().map((a) => ({
    value: a.code,
    label: a.label
  }));
}
function Go(a = []) {
  const e = new Set(Di().map((i) => i.value)), t = {}, s = [];
  if ((Array.isArray(a) ? a : []).forEach((i, r) => {
    const n = String((i == null ? void 0 : i.skillCode) ?? "").trim(), l = String((i == null ? void 0 : i.label) ?? "").trim(), o = `Row ${r + 1}`;
    if (!n) {
      s.push(`${o}: choose a skill.`);
      return;
    }
    if (!e.has(n)) {
      s.push(`${o}: unknown skill code "${n}".`);
      return;
    }
    if (!l) {
      s.push(`${o}: specialization label cannot be blank.`);
      return;
    }
    (t[n] ?? (t[n] = [])).push(l);
  }), s.length) throw Vs(s);
  return zs(t, { strict: !0 });
}
function qo(a = {}) {
  const e = zs(a, { strict: !1 });
  return Object.entries(e).flatMap(
    ([t, s]) => s.map((i) => ({ skillCode: t, label: i }))
  );
}
function Ko(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return {};
  let t;
  try {
    t = JSON.parse(e);
  } catch (s) {
    throw Vs([
      `Bulk JSON must be valid JSON: ${s.message}`
    ]);
  }
  return zs(t, { strict: !0 });
}
function Yo(a = {}) {
  return JSON.stringify(
    zs(a, { strict: !1 }),
    null,
    2
  );
}
const Jo = {
  id: "skill-specializations",
  menuKey: Uo,
  settingKey: Ai,
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
      options: Di
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
  defaultData: sr,
  createEmptyRow: () => {
    var a;
    return {
      skillCode: ((a = Di()[0]) == null ? void 0 : a.value) ?? "",
      label: ""
    };
  },
  toRows: qo,
  rowsToValue: Go,
  parseBulk: Ko,
  serializeBulk: Yo
};
function Qo() {
  dr(Jo);
}
class Zo {
  static register() {
    Vo(), Qo(), game.settings.register(S, "useDestinyMechanics", {
      name: w.settings.useDestinyMechanics.name,
      hint: w.settings.useDestinyMechanics.hint,
      scope: "world",
      config: !0,
      type: Boolean,
      default: !0
    }), game.settings.register(S, "enableGMGadget", {
      name: "Enable GM Gadget",
      hint: "If enabled, renders the new AppV2 GM Gadget UI on startup.",
      scope: "world",
      config: !0,
      type: Boolean,
      default: !0
    });
  }
  static getSystemProperty(e, t) {
    return game.settings.get(S, e) ?? t;
  }
}
const { HandlebarsApplicationMixin: Xo } = foundry.applications.api;
var je, ps, hs, Oi;
const Oe = class Oe extends Xo(foundry.applications.sheets.ActorSheetV2) {
  constructor() {
    super(...arguments);
    we(this, hs);
    we(this, je, !1);
    /** Track active CSB tab per group across rerenders */
    we(this, ps, /* @__PURE__ */ new Map());
  }
  /** @override */
  _updatePosition(t) {
    const s = super._updatePosition(t), {
      MIN_WIDTH: i,
      MAX_WIDTH: r,
      MIN_HEIGHT: n,
      MAX_HEIGHT: l
    } = this.constructor;
    return typeof s.width == "number" && (s.width = Math.min(
      r,
      Math.max(i, s.width)
    )), typeof s.height == "number" && (s.height = Math.min(
      l,
      Math.max(n, s.height)
    )), s;
  }
  // Optional legacy shim if anything still reads defaultOptions
  static get defaultOptions() {
    return this.DEFAULT_OPTIONS;
  }
  /** Editing mode flag for templates */
  get editing() {
    return F(this, je);
  }
  toggleEditing() {
    if (this.isEditable) {
      if (F(this, je)) {
        this._commitEditsToActor().finally(() => {
          Re(this, je, !F(this, je)), this.render({ force: !0 });
        });
        return;
      }
      Re(this, je, !F(this, je)), this.render({ force: !0 });
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
    var l, o, c, u, m;
    t = super._initializeApplicationOptions(t), t.classes = Array.from(t.classes ?? []);
    const s = (t == null ? void 0 : t.document) ?? this.document, i = (s == null ? void 0 : s.type) ?? ((l = this.actor) == null ? void 0 : l.type);
    i && t.classes.push(String(i));
    const r = ((m = (u = (c = (o = game.system) == null ? void 0 : o.anarchy) == null ? void 0 : c.styles) == null ? void 0 : u.selectCssClass) == null ? void 0 : m.call(u)) ?? "mwd-theme-default", n = ["mwd-theme-default", "mwd-theme-sra"];
    for (let d = t.classes.length - 1; d >= 0; d--)
      n.includes(t.classes[d]) && t.classes.splice(d, 1);
    return t.classes.push(r), t;
  }
  /**
   * No localization: provide a concrete title so Foundry doesn't show "TYPES.Actor.<type>".
   * @override
   */
  get title() {
    var n, l;
    const t = ((n = this.actor) == null ? void 0 : n.type) ?? "actor", i = {
      character: "Character",
      npc: "NPC",
      battlemech: "BattleMech",
      vehicle: "Vehicle",
      device: "Device"
    }[t] ?? String(t).replace(/(^|[-_])([a-z])/g, (o, c, u) => (c ? " " : "") + u.toUpperCase());
    return `${((l = this.actor) == null ? void 0 : l.name) ?? "Actor"} — ${i}`;
  }
  /**
   * Window actions (header/menu). Centralize here and dedupe by action key.
   * @override
   */
  _getHeaderControls() {
    var n, l;
    let t = ((n = super._getHeaderControls) == null ? void 0 : n.call(this)) ?? [];
    const s = ((l = this.document) == null ? void 0 : l.isToken) ?? !1, i = /* @__PURE__ */ new Set();
    s ? (i.add("prototypeToken"), i.add("configurePrototypeToken")) : (i.add("token"), i.add("configureToken")), t = t.filter((o) => {
      const c = (o == null ? void 0 : o.action) ?? "", u = String((o == null ? void 0 : o.label) ?? "");
      return !(i.has(c) || s && u.includes("Prototype") || !s && u === "Token");
    });
    const r = /* @__PURE__ */ new Set();
    return t = t.filter((o) => {
      const c = o == null ? void 0 : o.action, u = c ? `a:${c}` : `il:${(o == null ? void 0 : o.icon) ?? ""}|${(o == null ? void 0 : o.label) ?? ""}`;
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
    var o, c, u;
    const i = ((o = s == null ? void 0 : s.closest) == null ? void 0 : o.call(s, ".csb-tab-link[data-tab]")) ?? ((u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, ".csb-tab-link[data-tab]"));
    if (!i) return;
    const r = i.dataset.tab, n = i.closest(".csb-tabs");
    if (!n || !r) return;
    const l = n.dataset.group || "default";
    F(this, ps).set(l, r), E(this, hs, Oi).call(this, n, r);
  }
  /**
   * Universal roll action: data-action="roll" + data-roll='{"intent":"skill","key":"gunnery"}'
   */
  async _onRollAction(t, s) {
    var c, u, m, d, h, p, b, y, f;
    (c = t == null ? void 0 : t.preventDefault) == null || c.call(t);
    const i = ((u = s == null ? void 0 : s.closest) == null ? void 0 : u.call(s, "[data-roll]")) ?? ((d = (m = t == null ? void 0 : t.target) == null ? void 0 : m.closest) == null ? void 0 : d.call(m, "[data-roll]")), r = (h = i == null ? void 0 : i.dataset) == null ? void 0 : h.roll;
    if (!r) return;
    let n;
    try {
      n = JSON.parse(r);
    } catch (A) {
      console.warn("MWD | Invalid data-roll JSON:", r, A);
      return;
    }
    const l = !!(t != null && t.shiftKey), o = ((p = game.mwd) == null ? void 0 : p.roll) ?? ((y = (b = game.system) == null ? void 0 : b.mwd) == null ? void 0 : y.roll);
    if (!(o != null && o.execute)) {
      (f = ui.notifications) == null || f.error("MWD roll system not initialized (game.mwd.roll.execute missing).");
      return;
    }
    return o.execute({ actor: this.actor, payload: n, event: t, quick: l });
  }
  async _onEditImage(t, s) {
    var n, l, o;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable || !this.editing) return;
    const i = foundry.applications.apps.FilePicker.implementation;
    new i({
      type: "image",
      current: ((o = this.actor) == null ? void 0 : o.img) ?? "",
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
    var r, n, l;
    (r = super._onRender) == null || r.call(this, t, s);
    const i = this._getRootElement();
    if (i) {
      for (const o of i.querySelectorAll(".csb-tabs")) {
        const c = o.dataset.group || "default", u = F(this, ps).get(c), m = o.dataset.default || ((n = o.querySelector(".csb-tab-link[data-tab]")) == null ? void 0 : n.dataset.tab), d = u || m;
        d && E(this, hs, Oi).call(this, o, d);
      }
      i.querySelectorAll(".csb-tabs").length && !i.querySelector(".csb-tab-panel.is-active") && console.warn(`${Z} CSB tabs present but no active tab applied. Check element root resolution and CSS .is-active selectors.`, {
        sheet: (l = this.constructor) == null ? void 0 : l.name
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
      let l;
      if (r instanceof HTMLInputElement)
        if (r.type === "checkbox") l = r.checked;
        else if (r.type === "radio") {
          if (!r.checked) continue;
          l = r.value;
        } else r.type === "number" ? l = Number(r.value) : l = r.value;
      else
        l = r.value;
      typeof l == "number" && Number.isNaN(l) && (l = 0), l = this._clampByPath(n, l), foundry.utils.getProperty(this.actor, n) !== l && (i[n] = l);
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
    var n, l, o, c, u, m, d, h, p, b, y;
    console.log(`${Z}BaseActorSheetV2._prepareContext:start`, {
      actorName: (n = this.actor) == null ? void 0 : n.name,
      actorType: (l = this.actor) == null ? void 0 : l.type
    });
    const s = await super._prepareContext(t), i = foundry.utils.deepClone((s == null ? void 0 : s.options) ?? {});
    i.classes = Array.from(((o = this.options) == null ? void 0 : o.classes) ?? []), i.cssClass = i.classes.join(" ");
    const r = foundry.utils.mergeObject(
      s,
      {
        actor: this.actor,
        system: (c = this.actor) == null ? void 0 : c.system,
        editable: this.isEditable,
        owner: ((u = this.document) == null ? void 0 : u.isOwner) ?? !1,
        limited: !(((m = this.document) == null ? void 0 : m.isOwner) ?? !1),
        editing: F(this, je),
        // Template contract
        data: this.actor,
        // legacy alias
        options: i,
        // safe, template-only
        cssClass: i.cssClass
      },
      { inplace: !1 }
    );
    return r.options.owner = r.owner, r.options.limited = r.limited, r.options.editable = r.editable, r.options.editing = r.editing, r.options.viewMode = !r.editing, r.skillsDisplay = Dn(((d = this.actor) == null ? void 0 : d.system) ?? {}), r.items ?? (r.items = {}), (h = this.actor) != null && h.items && typeof (j == null ? void 0 : j.classifyInto) == "function" && (j.classifyInto(r.items, this.actor.items), r.items.weapon = [
      ...r.items.mechWeapon ?? [],
      ...r.items.personalWeapon ?? []
    ]), r.npcItems = {
      traits: r.items.quality ?? [],
      weapons: r.items.weapon ?? [],
      assetModules: r.items.assetModule ?? [],
      inventory: r.items.gear ?? []
    }, console.log(`${Z}BaseActorSheetV2._prepareContext:done`, {
      actorType: (p = this.actor) == null ? void 0 : p.type,
      cssClass: r.cssClass,
      itemCount: ((y = (b = this.actor) == null ? void 0 : b.items) == null ? void 0 : y.size) ?? 0,
      editing: F(this, je)
    }), r;
  }
  /** Clamp certain actor system paths to valid ranges */
  _clampByPath(t, s) {
    return typeof s != "number" ? s : ((/^system\.skills\.[^.]+\.rating$/.test(t) || /^system\.attributes\.[^.]+\.value$/.test(t)) && (s = Math.trunc(s)), /^system\.skills\.[^.]+\.rating$/.test(t) ? Math.clamp(s, 0, 12) : /^system\.attributes\.[^.]+\.value$/.test(t) ? Math.clamp(s, 0, 10) : s);
  }
  /** Action handler: Condition Monitor set */
  async _onMonitorSet(t, s) {
    var h, p;
    if (t.preventDefault(), !this.isEditable) return;
    const i = String(((h = s == null ? void 0 : s.dataset) == null ? void 0 : h.monitor) ?? "").trim(), r = Number((p = s == null ? void 0 : s.dataset) == null ? void 0 : p.value);
    if (!i || !Number.isFinite(r)) return;
    const n = i === "burn" ? "system.burn.value" : `system.monitors.${i}.value`, l = Number(foundry.utils.getProperty(this.actor, n) ?? 0), o = i === "armor" ? r : l === r ? 0 : r, c = this.getPersistentActor() ?? this.actor;
    if (typeof (c == null ? void 0 : c.setMonitorValue) == "function")
      return c.setMonitorValue(i, o, { source: "sheet" });
    const u = `system.monitors.${i}`, m = Number(foundry.utils.getProperty(c, `${u}.max`)) || 0, d = Math.min(Math.max(0, o), Math.max(0, m));
    return c.update({ [`${u}.value`]: d });
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
je = new WeakMap(), ps = new WeakMap(), hs = new WeakSet(), /**
 * Apply active-state classes within a single .csb-tabs root.
 * Idempotent: safe to call every render.
 */
Oi = function(t, s) {
  t.querySelectorAll(".csb-tab-link").forEach((i) => {
    i.classList.toggle("is-active", i.dataset.tab === s);
  }), t.querySelectorAll(".csb-tab-panel").forEach((i) => {
    i.classList.toggle("is-active", i.dataset.tab === s);
  });
}, // ---- Hard minimum size (resize clamp) ----
R(Oe, "MIN_WIDTH", 800), R(Oe, "MAX_WIDTH", 950), R(Oe, "MIN_HEIGHT", 600), R(Oe, "MAX_HEIGHT", 1400), // group -> tabId
/** @override */
R(Oe, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Lt(Oe, Oe, "DEFAULT_OPTIONS"), {
  classes: ["sheet", "actor", S, "appv2", "mwd-sheet", "mwd-character-sheet"],
  position: { width: 760, height: 760 },
  window: { resizable: !0, minimizable: !0 },
  actions: {
    toggleViewMode: Oe.prototype._onToggleViewMode,
    tab: Oe.prototype._onClickTab,
    roll: Oe.prototype._onRollAction,
    monitorSet: Oe.prototype._onMonitorSet,
    editImage: Oe.prototype._onEditImage
  }
}, { inplace: !1 }));
let Kt = Oe;
var Vt, Mt, yr, br, wr;
const os = class os {
  static async get(e) {
    if (F(this, Vt).has(e)) return F(this, Vt).get(e);
    const t = E(this, Mt, yr).call(this, e);
    return F(this, Vt).set(e, t), t;
  }
};
Vt = new WeakMap(), Mt = new WeakSet(), yr = async function(e) {
  const t = `systems/${S}/templates/v2/layouts/${e}.layout.json`;
  let s;
  try {
    const i = await fetch(t);
    if (!i.ok) throw new Error(`HTTP ${i.status} for ${t}`);
    s = await i.json();
  } catch (i) {
    console.error(`${Z}LayoutRegistry.get FAILED`, { layoutId: e, url: t, e: i }), s = { id: e, version: 0, root: { type: "stack", children: [] } };
  }
  return E(this, Mt, br).call(this, s);
}, br = function(e) {
  const t = (s) => {
    var i;
    return !s || typeof s != "object" || (s.template ?? (s.template = E(i = os, Mt, wr).call(i, s)), s.children = Array.isArray(s.children) ? s.children : [], Array.isArray(s.classes) || (typeof s.classes == "string" ? s.classes = s.classes.split(/\s+/).filter(Boolean) : s.classes = []), s.children = s.children.map(t), s.type === "tabs" && Array.isArray(s.tabs) && (s.tabs = s.tabs.map((r) => ({
      ...r,
      children: (Array.isArray(r.children) ? r.children : []).map(t)
    })))), s;
  };
  return {
    ...e,
    root: t(e.root ?? { type: "stack", children: [] })
  };
}, wr = function(e) {
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
}, we(os, Mt), we(os, Vt, /* @__PURE__ */ new Map());
let xs = os;
function De(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function el(a) {
  return String(a ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function ri(a, e = 180) {
  const t = el(a);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function Rt(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function ni(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim(),
    emphasis: e.emphasis ?? ""
  }));
}
function oi(a = []) {
  return Rt(a).map((e) => ({ label: e }));
}
function li(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
function tl(a = {}, e = ["close", "near", "far", "extreme"]) {
  return e.map((t) => {
    const s = De(a == null ? void 0 : a[t], 0);
    return `${t.charAt(0).toUpperCase() + t.slice(1)} ${s}`;
  }).join(" | ");
}
function sl(a = "") {
  const e = String(a ?? "").trim().toLowerCase();
  return e ? e.charAt(0).toUpperCase() + e.slice(1) : "";
}
var We, St, Nt, st, x, Ar, _i, Ps, Tr, Sr, Ae, Ct, as, Ds;
const ne = class ne extends Kt {
  constructor() {
    super(...arguments);
    we(this, x);
    we(this, We, null);
    we(this, St, null);
    we(this, Nt, null);
    we(this, st, /* @__PURE__ */ new Set());
  }
  /** @override */
  async _prepareContext(t) {
    var K, ee, O, ie, le, ae, me, Be, He, ot, lt, ct, ut, mt, dt, pt, ht, ft, gt, yt, bt, wt, At, Tt;
    const s = await super._prepareContext(t), i = ((K = this.getSheetTokenDocument) == null ? void 0 : K.call(this)) ?? null;
    s._mwdThemeClass = game.system.mwd.styles.selectCssClass(), s.layout = await xs.get("character");
    const r = ((O = (ee = this.actor).getEdgeCap) == null ? void 0 : O.call(ee)) ?? Number(((ae = (le = (ie = this.actor.system) == null ? void 0 : ie.attributes) == null ? void 0 : le.edge) == null ? void 0 : ae.value) ?? 0), n = !!this.isEditable, l = { physical: "Physical", mental: "Mental", social: "Social" }, o = {
      grit: "Grit",
      insight: "Insight",
      legend: "Legend",
      chaos: "Chaos",
      rumor: "Rumor",
      credibility: "Credibility"
    }, c = this.actor.getEdgePoolSummary ? this.actor.getEdgePoolSummary({ groups: Wi }) : { groups: [] };
    s.edgeConsole = {
      cap: r,
      editable: n,
      capPips: Array.from({ length: Math.max(0, r) }, (T, C) => C + 1),
      groups: (c.groups ?? []).map((T) => ({
        id: T.id,
        label: l[T.id] ?? T.id,
        pools: (T.pools ?? []).map((C) => {
          const V = Number(C.effectiveValue ?? 0), te = Number(C.effectiveMax ?? 0), ce = Array.from({ length: Math.max(0, te) }, (Se, ve) => {
            const _ = ve + 1;
            return { n: _, filled: _ <= V };
          }), ke = String(C.key ?? "").split(".").pop();
          return {
            key: C.key,
            label: o[ke] ?? ke ?? C.key,
            value: V,
            max: te,
            rating: Number(C.rating ?? 0),
            isCapped: Number(C.rating ?? 0) > Number(C.cap ?? r),
            pips: ce,
            // Paths for edit-mode inputs
            pathRating: `system.counters.edgePools.${C.key}.rating`,
            pathValue: `system.counters.edgePools.${C.key}.value`,
            // Keep the roll payload if you want pool-name click to route through BaseActorSheetV2 roll handler
            roll: JSON.stringify({ intent: "edge", pool: C.key })
          };
        })
      }))
    };
    const u = ["grit", "insight", "legend", "chaos", "rumor", "credibility"], m = /* @__PURE__ */ new Map();
    for (const T of s.edgeConsole.groups ?? [])
      for (const C of T.pools ?? []) {
        const V = String(C.key ?? "").split(".").pop();
        V && m.set(V, C), C.domain = T.id;
      }
    s.edgeConsole.poolsOrdered = u.map((T) => m.get(T)).filter(Boolean);
    const d = this.actor.system ?? {}, h = d.monitors ?? {}, p = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue", label: "Fatigue", kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor", label: "Armor", kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ], b = (T, C, V = 0) => {
      const te = foundry.utils.getProperty(T, C), ce = Number(te);
      return Number.isFinite(ce) ? ce : V;
    };
    s.conditionMonitors = p.map((T) => {
      const C = (h == null ? void 0 : h[T.id]) ?? {}, V = Math.max(0, b(C, "max", 0)), te = Math.min(Math.max(0, b(C, "value", 0)), V);
      return {
        id: T.id,
        label: T.label,
        kind: T.kind,
        editable: !!this.isEditable,
        value: te,
        max: V,
        segments: Array.from({ length: V }, (ce, ke) => {
          const Se = ke + 1;
          return { value: Se, filled: Se <= te };
        }),
        status: T.status ? { label: T.status.label, value: b(C, T.status.path, 0) } : null
      };
    });
    const y = Number(((Be = (me = this.actor.system) == null ? void 0 : me.burn) == null ? void 0 : Be.value) ?? 0), f = 10, A = 6, M = Math.min(y, f);
    s.burnOverflow = Math.max(0, y - f), s.burnPenalty = Math.floor(y / 2), s.burnPips = Array.from({ length: f }, (T, C) => {
      const V = C + 1;
      return {
        pipValue: V,
        filled: V <= M,
        threshold: V === A
      };
    }), s.combat = {
      roll: {
        initiative: JSON.stringify({ intent: "initiative" }),
        overload: JSON.stringify({ intent: "overload" })
      }
    }, s.burn = {
      value: y,
      penalty: Math.floor(y / 2),
      overflow: Math.max(0, y - 10),
      canOverloadCheck: y >= 6,
      overloaded: !!((ot = (He = this.actor.system) == null ? void 0 : He.burn) != null && ot.overloaded)
    };
    const k = de.getSnapshot(this.actor, { token: i });
    s.combatDashboard = {
      targeting: k.targeting,
      rollImpact: k.rollImpact,
      states: k.states,
      effects: k.effects,
      activation: k.activation,
      inactiveReason: k.inactiveReason
    };
    const P = de.buildActionModel(this.actor, k), W = new Set((P.menus ?? []).map((T) => T.id));
    F(this, We) && !W.has(F(this, We)) && Re(this, We, null), s.combatActions = {
      ...P,
      menus: (P.menus ?? []).map((T) => ({
        ...T,
        isOpen: T.id === F(this, We)
      }))
    };
    const I = ((ct = (lt = this.actor).getPersonalCombatLoadout) == null ? void 0 : ct.call(lt)) ?? null;
    s.personalInventory = {
      warnings: [...(I == null ? void 0 : I.warnings) ?? []],
      weapons: ((I == null ? void 0 : I.weapons) ?? []).map((T) => {
        var Se, ve, _, D, re, be, Ee;
        const C = E(this, x, Ds).call(this, "weapons", T.id), V = !!((Se = T == null ? void 0 : T.ammoState) != null && Se.isTracked), te = T != null && T.ammoLabel ? `Loaded ${T.ammoLabel}` : "", ce = V ? `${De((ve = T == null ? void 0 : T.ammoState) == null ? void 0 : ve.current, 0)}/${De((_ = T == null ? void 0 : T.ammoState) == null ? void 0 : _.max, 0)}` : "", ke = li([
          { label: "Skill", value: ((D = T.skillDef) == null ? void 0 : D.label) ?? T.skill ?? "" },
          { label: "Category", value: T.category ?? "" },
          { label: "Max Range", value: sl(((re = T.range) == null ? void 0 : re.max) ?? T.defaultRangeBand ?? "") },
          { label: "Attack Rating", value: tl(T.attackRatingBand) },
          { label: "Ammo", value: V ? `${ce} tracked` : T.ammoLabel || "Untracked" },
          { label: "Traits", value: Rt(T.traits ?? []).join(", ") }
        ]);
        return {
          id: T.id,
          accordionId: C,
          isExpanded: F(this, st).has(C),
          name: T.name,
          img: T.img,
          subtitle: ((be = T.skillDef) == null ? void 0 : be.label) ?? T.category ?? "",
          summaryStats: ni([
            { label: "DV", value: De(T.damage, 0), emphasis: "strong" },
            { label: "AP", value: De(T.ap, 0) },
            { label: "Type", value: T.damageTypeLabel ?? T.damageType ?? "" },
            { label: "Ammo", value: V ? ce : T.ammoLabel || "--" }
          ]),
          detailTags: oi([
            T.equipped ? "Equipped" : "",
            T.isPrimary ? "Primary" : "",
            te,
            ...Rt(T.traits ?? [])
          ]),
          detailRows: ke,
          detailText: ri(T.notes),
          equipped: !!T.equipped,
          isPrimary: !!T.isPrimary,
          attackRoll: JSON.stringify({
            intent: "attack",
            weaponId: T.id,
            ammoTypeId: ((Ee = T == null ? void 0 : T.ammoState) == null ? void 0 : Ee.activeTypeId) ?? "",
            edge: { pool: "physical.grit", allowed: ["pre", "post"] },
            tags: ["combat", "attack"]
          })
        };
      }),
      armor: ((I == null ? void 0 : I.armor) ?? []).map((T) => {
        var Se, ve, _, D, re, be, Ee, qe, Jt, ys, ea, ta, sa, ia;
        const C = ((Se = I == null ? void 0 : I.activeArmor) == null ? void 0 : Se.id) === T.id ? I.activeArmor : null, V = E(this, x, Ds).call(this, "armor", T.id), te = De(((_ = (ve = C == null ? void 0 : C.traitState) == null ? void 0 : ve.reinforced) == null ? void 0 : _.max) ?? ((re = (D = T == null ? void 0 : T.traitState) == null ? void 0 : D.reinforced) == null ? void 0 : re.max), 0), ce = te > 0 ? `${De(((Ee = (be = C == null ? void 0 : C.traitState) == null ? void 0 : be.reinforced) == null ? void 0 : Ee.current) ?? ((Jt = (qe = T == null ? void 0 : T.traitState) == null ? void 0 : qe.reinforced) == null ? void 0 : Jt.current), 0)}/${te}` : "", ke = [
          Object.entries((C == null ? void 0 : C.mitigationByType) ?? (C == null ? void 0 : C.typedMitigation) ?? T.mitigationByType ?? {}).filter(([, Gs]) => Number(Gs) > 0).map(([Gs, $r]) => `${Gs} +${$r}`).join(", "),
          ce ? `Reinforced ${ce}` : ""
        ].filter(Boolean).join(" | ");
        return {
          id: T.id,
          accordionId: V,
          isExpanded: F(this, st).has(V),
          name: T.name,
          img: T.img,
          subtitle: (ys = T.tags) != null && ys.length ? T.tags.join(", ") : "Armor",
          summaryStats: ni([
            { label: "Rating", value: De((C == null ? void 0 : C.ratingCurrent) ?? T.rating, 0), emphasis: "strong" },
            { label: "Res", value: De((C == null ? void 0 : C.baseMitigation) ?? (C == null ? void 0 : C.baseResistance), 0) },
            { label: "Def", value: De(T.defenseBonus, 0) },
            { label: "Dur", value: `${De(((ea = C == null ? void 0 : C.durability) == null ? void 0 : ea.current) ?? ((ta = T.durability) == null ? void 0 : ta.current), 0)}/${De(((sa = C == null ? void 0 : C.durability) == null ? void 0 : sa.max) ?? ((ia = T.durability) == null ? void 0 : ia.max), 0)}` }
          ]),
          detailTags: oi([
            T.equipped ? "Equipped" : "",
            T.isPrimary ? "Primary" : "",
            ce ? `Reinforced ${ce}` : "",
            ...Rt(T.traits ?? [])
          ]),
          detailRows: li([
            { label: "Mitigation", value: ke },
            { label: "Defense Bonus", value: De(T.defenseBonus, 0) },
            { label: "Traits", value: Rt(T.traits ?? []).join(", ") },
            { label: "Tags", value: Rt(T.tags ?? []).join(", ") }
          ]),
          detailText: ri(T.notes),
          equipped: !!T.equipped,
          isPrimary: !!T.isPrimary
        };
      }),
      gear: (((ut = s.items) == null ? void 0 : ut.gear) ?? []).map((T) => {
        var ce, ke, Se, ve, _, D, re, be, Ee, qe;
        const C = E(this, x, Ds).call(this, "gear", T.id), V = De(((ce = T.system) == null ? void 0 : ce.quantity) ?? 1, 1) || 1, te = Rt(((ke = T.system) == null ? void 0 : ke.tags) ?? ((Se = T.system) == null ? void 0 : Se.traits) ?? []);
        return {
          id: T.id,
          accordionId: C,
          isExpanded: F(this, st).has(C),
          name: T.name,
          img: T.img,
          subtitle: ((ve = T.system) == null ? void 0 : ve.category) ?? T.type ?? "Gear",
          summaryStats: ni([
            { label: "Qty", value: V, emphasis: "strong" },
            { label: "State", value: (_ = T.system) != null && _.equipped ? "Readied" : "" }
          ]),
          detailTags: oi([
            (D = T.system) != null && D.equipped ? "Readied" : "",
            ...te
          ]),
          detailRows: li([
            { label: "Quantity", value: V },
            { label: "Source", value: ((re = T.system) == null ? void 0 : re.sourceReference) ?? "" },
            { label: "Tags", value: te.join(", ") }
          ]),
          detailText: ri(((be = T.system) == null ? void 0 : be.notes) ?? ((Ee = T.system) == null ? void 0 : Ee.description)),
          equipped: !!((qe = T.system) != null && qe.equipped)
        };
      })
    }, s.bio = {
      faction: ((mt = d.biography) == null ? void 0 : mt.faction) ?? "",
      age: ((dt = d.biography) == null ? void 0 : dt.age) ?? "",
      rank: ((pt = d.biography) == null ? void 0 : pt.rank) ?? "",
      height: ((ht = d.biography) == null ? void 0 : ht.height) ?? "",
      weight: ((ft = d.biography) == null ? void 0 : ft.weight) ?? "",
      xpTotal: ((yt = (gt = d.counters) == null ? void 0 : gt.xp) == null ? void 0 : yt.total) ?? 0,
      xpSpent: ((wt = (bt = d.counters) == null ? void 0 : bt.xp) == null ? void 0 : wt.value) ?? 0,
      experienceLevel: ((At = d.biography) == null ? void 0 : At.experienceLevel) ?? "green",
      enrichedHistory: await foundry.applications.ux.TextEditor.implementation.enrichHTML(
        ((Tt = d.biography) == null ? void 0 : Tt.history) ?? "",
        { async: !0, secrets: this.actor.isOwner, relativeTo: this.actor }
      )
    };
    const z = [
      { moduleType: "faction", label: "Faction" },
      { moduleType: "childhood", label: "Childhood" },
      { moduleType: "higherEducation", label: "Higher Education" },
      { moduleType: "realLife", label: "Real Life" }
    ], Y = (this.actor.items ?? []).filter((T) => T.type === "lifeModule");
    return s.lifeModules = z.map((T) => {
      const C = Y.find((V) => {
        var te;
        return ((te = V.system) == null ? void 0 : te.moduleType) === T.moduleType;
      }) ?? null;
      return {
        moduleType: T.moduleType,
        label: T.label,
        item: C ? { id: C.id, name: C.name, img: C.img } : null
      };
    }), s;
  }
  _onRender(t, s) {
    super._onRender(t, s), E(this, x, Ar).call(this), E(this, x, Sr).call(this);
  }
  async close(t = {}) {
    return E(this, x, _i).call(this), super.close(t);
  }
  requestCombatDashboardRefresh() {
    E(this, x, Ae).call(this, !1);
  }
  async _onEdgeSet(t, s) {
    var c, u, m;
    if (t.preventDefault(), t.stopPropagation(), !this.isEditable) return;
    const i = ((c = s == null ? void 0 : s.closest) == null ? void 0 : c.call(s, "[data-edge-pool][data-edge-value]")) ?? ((m = (u = t == null ? void 0 : t.target) == null ? void 0 : u.closest) == null ? void 0 : m.call(u, "[data-edge-pool][data-edge-value]"));
    if (!i) return;
    const r = String(i.dataset.edgePool ?? "").trim(), n = Number(i.dataset.edgeValue ?? NaN);
    if (!r || !Number.isFinite(n)) return;
    const l = this.actor.getEdgePool(r);
    if (!(l != null && l.hasPools)) return;
    let o = n;
    return n === l.effectiveValue && (o = n - 1), (t.button === 2 || t.type === "contextmenu") && (o = 0), t.altKey && (o = 0), t.shiftKey && (o = l.effectiveMax), this.actor.setEdgePoolValue(r, o);
  }
  async _onToggleCombatMenu(t, s) {
    var r, n, l, o, c, u, m;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const i = String(
      ((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.combatMenu) ?? ((m = (u = (c = (o = t == null ? void 0 : t.target) == null ? void 0 : o.closest) == null ? void 0 : c.call(o, "[data-combat-menu]")) == null ? void 0 : u.dataset) == null ? void 0 : m.combatMenu) ?? ""
    ).trim();
    i && (Re(this, We, F(this, We) === i ? null : i), E(this, x, Ae).call(this, !1));
  }
  async _onToggleStatuses(t) {
    var r, n, l, o, c, u, m, d;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t), !this.isEditable) return;
    const s = this.getPersistentActor() ?? this.actor, i = ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? ((c = de.getSnapshot(s, { token: ((o = this.getSheetTokenDocument) == null ? void 0 : o.call(this)) ?? null })) == null ? void 0 : c.tokenDocument) ?? ((m = de.getSnapshot(this.actor, { token: ((u = this.getSheetTokenDocument) == null ? void 0 : u.call(this)) ?? null })) == null ? void 0 : m.tokenDocument) ?? null;
    if (!i) {
      (d = ui.notifications) == null || d.warn("Statuses require a token for this actor on the current scene.");
      return;
    }
    return Xn({
      actor: s,
      token: i
    });
  }
  async _onCombatSpend(t, s) {
    var c, u, m, d, h, p, b, y, f, A;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const i = String(((m = s == null ? void 0 : s.dataset) == null ? void 0 : m.resource) ?? "").trim(), r = Math.max(0, Number(((d = s == null ? void 0 : s.dataset) == null ? void 0 : d.cost) ?? 0)), n = String(((h = s == null ? void 0 : s.dataset) == null ? void 0 : h.combatAction) ?? "").trim(), l = String(((p = s == null ? void 0 : s.dataset) == null ? void 0 : p.combatLabel) ?? "").trim(), o = String(((b = s == null ? void 0 : s.dataset) == null ? void 0 : b.combatCostLabel) ?? "").trim();
    if (!(!i || !r || !n))
      try {
        const M = this.getPersistentActor() ?? this.actor, k = await de.spendResource(M, {
          token: ((y = this.getSheetTokenDocument) == null ? void 0 : y.call(this)) ?? de.getCurrentSceneTokenDocument(M) ?? de.getCurrentSceneTokenDocument(this.actor),
          resource: i,
          cost: r,
          actionId: n,
          actionLabel: l,
          actionCostLabel: o
        });
        if (!(k != null && k.ok)) {
          (f = ui.notifications) == null || f.warn((k == null ? void 0 : k.reason) ?? "Unable to spend action.");
          return;
        }
        E(this, x, Ct).call(this, { rerender: !1 }), E(this, x, Ae).call(this, { force: !0 });
      } catch (M) {
        console.error("MWD | Failed to spend combat action", M), (A = ui.notifications) == null || A.error("Unable to spend action.");
      }
  }
  async _onCombatReduceBurn(t) {
    var s, i, r, n, l;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (i = t == null ? void 0 : t.stopPropagation) == null || i.call(t), !!this.isEditable)
      try {
        const o = this.getPersistentActor() ?? this.actor, c = await de.reduceBurn(o, {
          token: ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? de.getCurrentSceneTokenDocument(o) ?? de.getCurrentSceneTokenDocument(this.actor)
        });
        if (!(c != null && c.ok)) {
          (n = ui.notifications) == null || n.warn((c == null ? void 0 : c.reason) ?? "Unable to reduce Burn.");
          return;
        }
        E(this, x, Ct).call(this, { rerender: !1 }), E(this, x, Ae).call(this, { force: !0 });
      } catch (o) {
        console.error("MWD | Failed to reduce Burn", o), (l = ui.notifications) == null || l.error("Unable to reduce Burn.");
      }
  }
  async _onCombatOverloadCheck(t, s) {
    var n, l, o, c, u, m, d, h, p, b, y;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const i = ((o = s == null ? void 0 : s.dataset) == null ? void 0 : o.roll) ?? ((d = (m = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : m.dataset) == null ? void 0 : d.roll);
    if (!i) return;
    let r;
    try {
      r = JSON.parse(i);
    } catch (f) {
      console.warn("MWD | Invalid overload payload", i, f);
      return;
    }
    try {
      const f = this.getPersistentActor() ?? this.actor, A = await ((b = (p = (h = game.mwd) == null ? void 0 : h.roll) == null ? void 0 : p.execute) == null ? void 0 : b.call(p, { actor: f, payload: r, event: t }));
      if (E(this, x, Ct).call(this, { rerender: !1 }), !A) {
        E(this, x, Ae).call(this, !1);
        return;
      }
      E(this, x, Ae).call(this, { force: !0 });
    } catch (f) {
      console.error("MWD | Failed to launch overload check", f), (y = ui.notifications) == null || y.error("Unable to launch overload check.");
    }
  }
  async _onCombatAttack(t) {
    var l, o, c, u, m, d, h, p, b, y, f, A;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const s = this.getPersistentActor() ?? this.actor, i = ((c = this.getSheetTokenDocument) == null ? void 0 : c.call(this)) ?? de.getCurrentSceneTokenDocument(s) ?? de.getCurrentSceneTokenDocument(this.actor), r = de.getSnapshot(s, { token: i });
    if (!r.hasCombatant) {
      (u = ui.notifications) == null || u.warn("No combatant on the current scene.");
      return;
    }
    if (!r.isCurrentTurn) {
      (m = ui.notifications) == null || m.warn("Only available during your activation.");
      return;
    }
    if (r.overloaded) {
      (d = ui.notifications) == null || d.warn("Overloaded actors can only recover Burn.");
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
      const M = await ((y = (b = (p = game.mwd) == null ? void 0 : p.roll) == null ? void 0 : b.execute) == null ? void 0 : y.call(b, { actor: s, payload: n, event: t }));
      if (E(this, x, Ct).call(this, { rerender: !1 }), !M) {
        E(this, x, Ae).call(this, !1);
        return;
      }
      const k = await de.spendResource(s, {
        token: i,
        resource: "sa",
        cost: 2,
        actionId: "attack",
        actionLabel: "Attack",
        actionCostLabel: "2 SA"
      });
      k != null && k.ok || (f = ui.notifications) == null || f.warn((k == null ? void 0 : k.reason) ?? "Unable to spend attack action."), E(this, x, Ae).call(this, { force: !0 });
    } catch (M) {
      console.error("MWD | Failed to launch attack", M), (A = ui.notifications) == null || A.error((M == null ? void 0 : M.message) ?? "Unable to launch attack.");
    }
  }
  async _onAddSkillSpecialization(t, s) {
    var m, d, h, p;
    if ((m = t == null ? void 0 : t.preventDefault) == null || m.call(t), (d = t == null ? void 0 : t.stopPropagation) == null || d.call(t), !this.isEditable || !this.editing) return;
    const i = String(((h = s == null ? void 0 : s.dataset) == null ? void 0 : h.skillKey) ?? "").trim();
    if (!i) return;
    const r = this.getPersistentActor() ?? this.actor, n = Si(r.system ?? {}, i), l = js(r.system ?? {}, i), o = It(i).filter((b) => !l.includes(b.key));
    if (o.length === 0) return;
    let c = ((p = o[0]) == null ? void 0 : p.key) ?? "";
    if (o.length > 1) {
      const b = `<form class="mwd-quick-select"><div class="mwd-field"><label>Specialization</label><select name="specialization">${o.map((y) => `<option value="${y.key}">${y.label}</option>`).join("")}</select></div></form>`;
      c = await Dialog.prompt({
        title: "Add Skill Specialization",
        content: b,
        label: "Add",
        callback: (y) => {
          var f;
          return y.find('select[name="specialization"]').val() ?? ((f = o[0]) == null ? void 0 : f.key) ?? "";
        }
      });
    }
    const u = $s(
      n.concat([c])
    );
    await r.update({
      [`system.skills.${i}.specializations`]: u
    }), E(this, x, Ae).call(this, { force: !0 });
  }
  async _onRemoveSkillSpecialization(t, s) {
    var o, c, u, m;
    if ((o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable || !this.editing) return;
    const i = String(((u = s == null ? void 0 : s.dataset) == null ? void 0 : u.skillKey) ?? "").trim(), r = String(((m = s == null ? void 0 : s.dataset) == null ? void 0 : m.specializationKey) ?? "").trim();
    if (!i || !r) return;
    const n = this.getPersistentActor() ?? this.actor, l = $s(
      Si(n.system ?? {}, i).filter((d) => d !== r)
    );
    await n.update({
      [`system.skills.${i}.specializations`]: l
    }), E(this, x, Ae).call(this, { force: !0 });
  }
  async _onCreateLifeModuleItem(t, s) {
    var l, o, c;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
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
    }]), E(this, x, Ae).call(this, { force: !0 });
  }
  async _onCreateOwnedItem(t, s) {
    var o, c, u;
    if ((o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable) return;
    const i = String(((u = s == null ? void 0 : s.dataset) == null ? void 0 : u.itemType) ?? "").trim();
    if (!i) return;
    const r = this.getPersistentActor() ?? this.actor, n = r.items.filter((m) => m.type === i).length, l = i === "personalWeapon" ? "Personal Weapon" : i === "armor" ? "Armor" : i.charAt(0).toUpperCase() + i.slice(1);
    await r.createEmbeddedDocuments("Item", [{
      name: `${l} ${n + 1}`,
      type: i
    }]), E(this, x, Ae).call(this, { force: !0 });
  }
  async _onEditOwnedItem(t, s) {
    var r, n, l;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const i = E(this, x, as).call(this, s, t);
    (l = i == null ? void 0 : i.sheet) == null || l.render(!0);
  }
  async _onDeleteOwnedItem(t, s) {
    var n, l;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const i = E(this, x, as).call(this, s, t);
    if (!i) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [i.id]), E(this, x, Ae).call(this, { force: !0 });
  }
  async _onToggleInventoryAccordion(t, s) {
    var r, n, l, o, c, u, m, d, h, p;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const i = String(
      ((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.accordionId) ?? ((u = (c = (o = s == null ? void 0 : s.closest) == null ? void 0 : o.call(s, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((p = (h = (d = (m = t == null ? void 0 : t.target) == null ? void 0 : m.closest) == null ? void 0 : d.call(m, "[data-accordion-id]")) == null ? void 0 : h.dataset) == null ? void 0 : p.accordionId) ?? ""
    ).trim();
    i && (F(this, st).has(i) ? F(this, st).delete(i) : F(this, st).add(i), E(this, x, Ae).call(this, !1));
  }
  async _onToggleOwnedItemEquipped(t, s) {
    var n, l, o, c;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const i = E(this, x, as).call(this, s, t);
    if (!i) return;
    const r = this.getPersistentActor() ?? this.actor;
    await ((c = r.setOwnedItemEquipped) == null ? void 0 : c.call(r, i.id, !((o = i.system) != null && o.equipped))), E(this, x, Ae).call(this, { force: !0 });
  }
  async _onSetOwnedItemPrimary(t, s) {
    var n, l, o, c;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const i = E(this, x, as).call(this, s, t);
    if (!i) return;
    const r = this.getPersistentActor() ?? this.actor;
    await ((c = r.setOwnedItemPrimary) == null ? void 0 : c.call(r, i.id, !((o = i.system) != null && o.isPrimary))), E(this, x, Ae).call(this, { force: !0 });
  }
  async _onAttackWeapon(t, s) {
    var n, l, o, c, u, m, d, h, p, b, y;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t);
    const i = ((o = s == null ? void 0 : s.dataset) == null ? void 0 : o.roll) ?? ((d = (m = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : m.dataset) == null ? void 0 : d.roll);
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
      if (!await ((b = (p = (h = game.mwd) == null ? void 0 : h.roll) == null ? void 0 : p.execute) == null ? void 0 : b.call(p, { actor: f, payload: r, event: t }))) return;
      E(this, x, Ae).call(this, { force: !0 });
    } catch (f) {
      console.error("MWD | Failed to launch weapon attack", f), (y = ui.notifications) == null || y.error((f == null ? void 0 : f.message) ?? "Unable to attack with that weapon.");
    }
  }
};
We = new WeakMap(), St = new WeakMap(), Nt = new WeakMap(), st = new WeakMap(), x = new WeakSet(), Ar = function() {
  E(this, x, _i).call(this), F(this, We) && (Re(this, St, (t) => {
    var r;
    const s = this._getRootElement();
    if (!s) return;
    const i = t.target;
    if (i instanceof Node && !((r = i.closest) != null && r.call(i, ".mwd-combat-menu"))) {
      if (!s.contains(i)) {
        E(this, x, Ct).call(this);
        return;
      }
      E(this, x, Ct).call(this);
    }
  }), document.addEventListener("click", F(this, St)));
}, _i = function() {
  F(this, St) && (document.removeEventListener("click", F(this, St)), Re(this, St, null));
}, Ps = function() {
  const t = this._getRootElement();
  return t ? t.querySelector(".mwd-scroll-area") ?? t.querySelector(".csb-tab-panels") : null;
}, Tr = function() {
  const t = E(this, x, Ps).call(this);
  if (!(t instanceof HTMLElement)) {
    Re(this, Nt, null);
    return;
  }
  Re(this, Nt, {
    top: t.scrollTop,
    left: t.scrollLeft
  });
}, Sr = function() {
  const t = F(this, Nt);
  if (!t) return;
  const s = E(this, x, Ps).call(this);
  s instanceof HTMLElement && (s.scrollTop = t.top, s.scrollLeft = t.left, requestAnimationFrame(() => {
    const i = E(this, x, Ps).call(this);
    i instanceof HTMLElement && (i.scrollTop = t.top, i.scrollLeft = t.left);
  }), Re(this, Nt, null));
}, Ae = function(t = !1) {
  E(this, x, Tr).call(this), this.render(t);
}, Ct = function({ rerender: t = !0 } = {}) {
  F(this, We) && (Re(this, We, null), t && E(this, x, Ae).call(this, !1));
}, as = function(t, s) {
  var r, n, l, o, c, u, m, d;
  const i = String(
    ((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.itemId) ?? ((o = (l = (n = t == null ? void 0 : t.closest) == null ? void 0 : n.call(t, "[data-item-id]")) == null ? void 0 : l.dataset) == null ? void 0 : o.itemId) ?? ((d = (m = (u = (c = s == null ? void 0 : s.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : m.dataset) == null ? void 0 : d.itemId) ?? ""
  ).trim();
  return i ? this.actor.items.get(i) ?? null : null;
}, Ds = function(t, s) {
  return `${String(t ?? "").trim()}:${String(s ?? "").trim()}`;
}, R(ne, "PARTS", {
  sheet: {
    get template() {
      return `${B}/v2/actor/character-sheet.hbs`;
    }
  }
}), R(ne, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Lt(ne, ne, "DEFAULT_OPTIONS"), {
  classes: ["character-sheet", S, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
  window: { minWidth: 450, minHeight: 740, resizable: !0 },
  position: { width: 980, height: 900 },
  actions: {
    ...Lt(ne, ne, "DEFAULT_OPTIONS").actions,
    edgeSet: ne.prototype._onEdgeSet,
    toggleCombatMenu: ne.prototype._onToggleCombatMenu,
    toggleStatuses: ne.prototype._onToggleStatuses,
    combatSpend: ne.prototype._onCombatSpend,
    combatReduceBurn: ne.prototype._onCombatReduceBurn,
    combatOverloadCheck: ne.prototype._onCombatOverloadCheck,
    combatAttack: ne.prototype._onCombatAttack,
    createOwnedItem: ne.prototype._onCreateOwnedItem,
    addSkillSpecialization: ne.prototype._onAddSkillSpecialization,
    removeSkillSpecialization: ne.prototype._onRemoveSkillSpecialization,
    createLifeModuleItem: ne.prototype._onCreateLifeModuleItem,
    editOwnedItem: ne.prototype._onEditOwnedItem,
    deleteOwnedItem: ne.prototype._onDeleteOwnedItem,
    toggleInventoryAccordion: ne.prototype._onToggleInventoryAccordion,
    toggleOwnedItemEquipped: ne.prototype._onToggleOwnedItemEquipped,
    setOwnedItemPrimary: ne.prototype._onSetOwnedItemPrimary,
    attackWeapon: ne.prototype._onAttackWeapon
  }
}));
let Ii = ne;
class kr extends Kt {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["npc-sheet", S, "actor-sheet-v2"]
    });
  }
}
R(kr, "PARTS", {
  sheet: {
    get template() {
      return `${B}/actor/npc.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class Mr extends Kt {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["vehicle-sheet", S, "actor-sheet-v2"],
      position: { width: 860, height: 820 }
    });
  }
}
R(Mr, "PARTS", {
  sheet: {
    get template() {
      return `${B}/actor/vehicle.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class vr extends Kt {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["battlemech-sheet", S, "actor-sheet-v2"],
      position: { width: 900, height: 820 }
    });
  }
}
R(vr, "PARTS", {
  sheet: {
    get template() {
      return `${B}/actor/battlemech.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
function il() {
  console.log(`${Z}Registering Actor sheets (V2)`);
  const { Actors: a } = foundry.documents.collections;
  a.registerSheet(S, Ii, {
    types: ["character"],
    makeDefault: !0,
    label: "Character (V2)"
  }), a.registerSheet(S, kr, {
    types: ["npc"],
    makeDefault: !0,
    label: "NPC (V2)"
  }), a.registerSheet(S, Mr, {
    types: ["vehicle"],
    makeDefault: !0,
    label: "Vehicle (V2)"
  }), a.registerSheet(S, vr, {
    types: ["battlemech"],
    makeDefault: !0,
    label: "BattleMech (V2)"
  });
}
const { HandlebarsApplicationMixin: al } = foundry.applications.api;
var Pt, Dt, rs;
const Me = class Me extends al(foundry.applications.sheets.ItemSheetV2) {
  constructor() {
    super(...arguments);
    we(this, Dt);
    we(this, Pt, /* @__PURE__ */ new Map());
    /** @override */
    R(this, "tabGroups", {
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
      classes: ["sheet", "item", S, "appv2", "mwd-sheet", "item-sheet"],
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
    var n, l, o, c;
    t = super._initializeApplicationOptions(t), t.classes = Array.from(t.classes ?? []);
    const s = this._getCanonicalItemTypeFromOptions(t);
    s && t.classes.push(String(s));
    const i = ((c = (o = (l = (n = game.system) == null ? void 0 : n.mwd) == null ? void 0 : l.styles) == null ? void 0 : o.selectCssClass) == null ? void 0 : c.call(o)) ?? "mwd-theme-default", r = ["mwd-theme-default", "mwd-theme-sra"];
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
        [g.itemType.mechWeapon]: `${B}/v2/item/mech-weapon-root.hbs`,
        [g.itemType.armor]: `${B}/v2/item/armor.hbs`
      }[i] ?? `${B}/v2/item/${i}.hbs`;
    }
    return ((s = super._getPartTemplate) == null ? void 0 : s.call(this, t)) ?? "";
  }
  /**
   * Override title to show localized item type and name.
   * @override
   */
  get title() {
    const t = this._getCanonicalItemType();
    return `${oe.itemType.singular[t] ?? t}: ${this.item.name}`;
  }
  /**
   * Prepare context data for rendering.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The context object
   * @override
   */
  async _prepareContext(t) {
    var W, I, z, Y, K, ee;
    const s = await super._prepareContext(t), i = ((I = (W = game.system.mwd.modifiers) == null ? void 0 : W.getEnums) == null ? void 0 : I.call(W)) ?? {}, r = foundry.utils.deepClone((s == null ? void 0 : s.options) ?? {}), n = ((Y = (z = this.item.actor) == null ? void 0 : z.getAttributes) == null ? void 0 : Y.call(z, this.item)) ?? [], l = this._getCanonicalItemType(), o = !this.item.actor, c = !!this.item.actor, u = oe.itemType.singular[l] ?? l, m = this._getEffectEntries(), d = m.filter((O) => O.syncedCount > 0).length, h = this.constructor.LAYOUT_ID, p = this.item.actor ? (O) => n.includes(O) : (O) => !0, b = l === g.itemType.skill, f = ["mwd", "item-sheet", this.isEditable ? "editable" : "locked"], A = f.join(" ");
    r.classes = f, r.cssClass = A;
    const M = await foundry.applications.ux.TextEditor.implementation.enrichHTML(this.item.system.description ?? "", {
      async: !0,
      secrets: this.item.isOwner,
      relativeTo: this.item
    }), k = game.user.isGM && this.item.system.gmnotes ? await foundry.applications.ux.TextEditor.implementation.enrichHTML(this.item.system.gmnotes, {
      async: !0,
      secrets: !0,
      relativeTo: this.item
    }) : "", P = foundry.utils.mergeObject(s, {
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
        cssClass: A,
        viewMode: !1
        // Items don't have view mode like actors do
      },
      // Configuration data
      ENUMS: foundry.utils.mergeObject(
        J.getEnums(p, b),
        i
      ),
      MWD: oe,
      itemSheet: {
        canonicalType: l,
        typeLabel: u,
        isArmorSheet: l === g.itemType.armor,
        isStandalone: o,
        canUseActorControls: c,
        supportsEffectSync: !!((ee = (K = this.item).supportsEquippedEffectSync) != null && ee.call(K)),
        effectEntries: m,
        effectCount: m.length,
        syncedEffectCount: d,
        summaryChips: this._getSummaryChips(),
        stateChips: this._getStateChips(m)
      },
      // CSS class for form element
      cssClass: A,
      // Tab configuration
      tabs: this._getTabs()
    });
    return h && (P.layout = await xs.get(h)), P;
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
      tone: t.some((l) => l.syncedCount > 0) ? "active" : "muted"
    }), s;
  }
  _getEffectEntries() {
    var i, r, n, l, o, c;
    const t = /* @__PURE__ */ new Map(), s = ((r = (i = this.item).getSyncedActorEffects) == null ? void 0 : r.call(i)) ?? [];
    for (const u of s) {
      const m = (o = (l = (n = u.flags) == null ? void 0 : n[S]) == null ? void 0 : l.equippedItemSync) == null ? void 0 : o.sourceEffectId;
      if (!m) continue;
      const d = t.get(m) ?? [];
      d.push(u), t.set(m, d);
    }
    return Array.from(((c = this.item.effects) == null ? void 0 : c.contents) ?? []).map((u) => {
      var d, h, p, b, y, f, A;
      const m = t.get(u.id) ?? [];
      return {
        id: u.id,
        name: u.name || "New Effect",
        img: u.img || "icons/svg/aura.svg",
        disabled: !!u.disabled,
        transfer: !!u.transfer,
        changesCount: Array.isArray(u.changes) ? u.changes.length : 0,
        statusesCount: Number(((d = u.statuses) == null ? void 0 : d.size) ?? ((h = u.statuses) == null ? void 0 : h.length) ?? 0),
        durationLabel: (p = u.duration) != null && p.seconds ? `${u.duration.seconds}s` : (b = u.duration) != null && b.rounds ? `${u.duration.rounds} rounds` : "Passive",
        syncedCount: m.length,
        syncLabel: this.item.actor ? (f = (y = this.item).supportsEquippedEffectSync) != null && f.call(y) ? (A = this.item.system) != null && A.equipped ? m.length ? `Synced to actor (${m.length})` : "Pending sync" : "Applies when equipped" : "No equip sync" : "World item"
      };
    });
  }
  _getRootElement() {
    var t;
    return this.element instanceof HTMLElement ? this.element : (t = this.element) == null ? void 0 : t[0];
  }
  _onClickTab(t, s) {
    var o, c, u;
    const i = ((o = s == null ? void 0 : s.closest) == null ? void 0 : o.call(s, ".csb-tab-link[data-tab]")) ?? ((u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, ".csb-tab-link[data-tab]"));
    if (!i) return;
    const r = i.closest(".csb-tabs");
    if (!r) return;
    const n = r.dataset.group || "default", l = i.dataset.tab;
    l && (F(this, Pt).set(n, l), E(this, Dt, rs).call(this, this._getRootElement(), n, l));
  }
  _onRender(t, s) {
    var r, n, l, o;
    (r = super._onRender) == null || r.call(this, t, s), (n = this.window) != null && n.title && (this.window.title.textContent = this.title);
    const i = this._getRootElement();
    if (i) {
      for (const c of i.querySelectorAll(".sheet-tabs")) {
        const u = c.dataset.group || "default", m = Array.from(c.querySelectorAll("[data-tab]"));
        if (!m.length) continue;
        for (const b of m)
          b.addEventListener("click", (y) => {
            y.preventDefault(), y.stopPropagation();
            const f = b.dataset.tab;
            f && (F(this, Pt).set(u, f), E(this, Dt, rs).call(this, i, u, f));
          });
        const d = F(this, Pt).get(u), h = c.dataset.default || ((l = m[0]) == null ? void 0 : l.dataset.tab), p = d || h;
        p && E(this, Dt, rs).call(this, i, u, p);
      }
      for (const c of i.querySelectorAll(".csb-tabs")) {
        const u = c.dataset.group || "default", m = Array.from(c.querySelectorAll(".csb-tab-link[data-tab]"));
        if (!m.length) continue;
        const d = F(this, Pt).get(u), h = c.dataset.default || ((o = m[0]) == null ? void 0 : o.dataset.tab), p = d || h;
        p && E(this, Dt, rs).call(this, i, u, p);
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
    const n = r.dataset.monitorCode, l = Number.parseInt(s.dataset.index), o = s.dataset.checked === "true";
    await i.parent.switchMonitorCheck(n, l, o);
  }
  static async _onEditImage(t) {
    var r, n, l;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t), !this.isEditable) return;
    const s = foundry.applications.apps.FilePicker.implementation;
    new s({
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
    var r, n, l;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const [i] = await this.item.createEmbeddedDocuments("ActiveEffect", [{
      name: `${this.item.name} Effect`,
      img: this.item.img || "icons/svg/aura.svg",
      disabled: !1,
      transfer: !1,
      changes: []
    }]);
    (l = i == null ? void 0 : i.sheet) == null || l.render(!0);
  }
  static async _onEffectEdit(t, s) {
    var n, l, o, c, u, m, d;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t);
    const i = ((o = s == null ? void 0 : s.dataset) == null ? void 0 : o.effectId) ?? ((m = (u = (c = s == null ? void 0 : s.closest) == null ? void 0 : c.call(s, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : m.effectId);
    if (!i) return;
    const r = this.item.effects.get(i);
    (d = r == null ? void 0 : r.sheet) == null || d.render(!0);
  }
  static async _onEffectDelete(t, s) {
    var r, n, l, o, c, u;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const i = ((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.effectId) ?? ((u = (c = (o = s == null ? void 0 : s.closest) == null ? void 0 : o.call(s, "[data-effect-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.effectId);
    i && await this.item.deleteEmbeddedDocuments("ActiveEffect", [i]);
  }
  static async _onEffectToggleDisabled(t, s) {
    var n, l, o, c, u, m;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t);
    const i = ((o = s == null ? void 0 : s.dataset) == null ? void 0 : o.effectId) ?? ((m = (u = (c = s == null ? void 0 : s.closest) == null ? void 0 : c.call(s, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : m.effectId);
    if (!i) return;
    const r = this.item.effects.get(i);
    r && await r.update({ disabled: !r.disabled });
  }
};
Pt = new WeakMap(), Dt = new WeakSet(), rs = function(t, s, i) {
  t && (t.querySelectorAll(`.csb-tabs[data-group="${s}"] .csb-tab-link[data-tab]`).forEach((r) => {
    r.classList.toggle("is-active", r.dataset.tab === i);
  }), t.querySelectorAll(`.csb-tabs[data-group="${s}"] .csb-tab-panel[data-tab]`).forEach((r) => {
    r.classList.toggle("is-active", r.dataset.tab === i);
  }), t.querySelectorAll(".sheet-tabs [data-tab]").forEach((r) => {
    var l;
    (((l = r.closest(".sheet-tabs")) == null ? void 0 : l.dataset.group) || "default") === s && r.classList.toggle("active", r.dataset.tab === i);
  }), t.querySelectorAll(`.tab[data-group="${s}"]`).forEach((r) => {
    r.classList.toggle("active", r.dataset.tab === i);
  }));
}, R(Me, "LAYOUT_ID", null), /** @override */
R(Me, "PARTS", {
  sheet: {
    template: "",
    // Set dynamically in _getPartTemplate
    scrollable: [".sheet-body"]
  }
}), R(Me, "TABS", {
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
let Ze = Me;
class Er extends Ze {
}
R(Er, "PARTS", {
  sheet: {
    template: `${B}/v2/item/contact.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Rr extends Ze {
}
R(Rr, "PARTS", {
  sheet: {
    template: `${B}/v2/item/gear.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Cr extends Ze {
}
R(Cr, "PARTS", {
  sheet: {
    template: `${B}/v2/item/quality.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Nr extends Ze {
}
R(Nr, "PARTS", {
  sheet: {
    template: `${B}/v2/item/assetModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Pr extends Ze {
}
R(Pr, "PARTS", {
  sheet: {
    template: `${B}/v2/item/lifeModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Dr extends Ze {
}
R(Dr, "PARTS", {
  sheet: {
    template: `${B}/v2/item/skill.hbs`,
    scrollable: [".sheet-body"]
  }
});
const rl = Object.freeze([
  "firearms",
  "projectileWeapons",
  "heavyWeapons",
  "meleeCombat"
]), nl = Object.freeze([
  { value: "energy", label: "Energy" },
  { value: "kinetic", label: "Kinetic" },
  { value: "ballistic", label: "Ballistic" },
  { value: "explosive", label: "Explosive" },
  { value: "plasma", label: "Plasma" },
  { value: "electrical", label: "Electrical" },
  { value: "melee", label: "Melee" },
  { value: "none", label: "None" }
]);
function va(a, e, t) {
  const s = String(e ?? "").trim();
  return !s || a.some((i) => i.value === s) ? a : a.concat({ value: s, label: t(s) });
}
class Us extends Ze {
  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        weaponSkillChange: Us._onWeaponSkillChange
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
    var o, c, u, m, d, h;
    const t = await super._prepareContext(e), s = this._getCanonicalItemType();
    t.ENUMS = foundry.utils.mergeObject(
      { defenses: ue.getDefenses() },
      t.ENUMS
    );
    const i = Array.isArray((o = t.ENUMS) == null ? void 0 : o.skills) ? t.ENUMS.skills : [], r = (c = this.item.system) == null ? void 0 : c.skill, n = (u = this.item.system) == null ? void 0 : u.damageType, l = s === "personalWeapon" ? va(
      i.filter((p) => rl.includes(p.value)),
      r,
      (p) => {
        var b;
        return ((b = i.find((y) => y.value === p)) == null ? void 0 : b.label) ?? p;
      }
    ) : i;
    return t.weaponProfile = ((d = (m = this.item).getCombatProfile) == null ? void 0 : d.call(m)) ?? null, t.weaponEditor = {
      skills: l,
      categories: [
        { value: "melee", label: "Melee" },
        { value: "ranged", label: "Ranged" },
        { value: "thrown", label: "Thrown" },
        { value: "other", label: "Other" }
      ],
      damageTypes: va(
        s === "personalWeapon" ? [...Os] : [...nl],
        n,
        (p) => s === "personalWeapon" ? kt(p) : p
      ),
      ranges: Ue.RANGE_ORDER.map((p) => ({
        value: p,
        label: p.charAt(0).toUpperCase() + p.slice(1)
      })),
      standardTraits: [...Zr],
      ammoDamageTypes: [{ value: "", label: "Use Weapon Default" }, ...Os]
    }, t.itemSheet = foundry.utils.mergeObject(t.itemSheet ?? {}, {
      isCompactWeaponSheet: !0,
      weaponSheetVariant: s === "mechWeapon" ? "mech" : "personal"
    }), t.itemSheet.stateChips = (t.itemSheet.stateChips ?? []).filter(
      (p) => !["ownership", "equipment", "role"].includes(p.kind)
    ), t.itemSheet.currentAmmoLabel = ((h = t.weaponProfile) == null ? void 0 : h.ammoLabel) ?? "", t;
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
const ls = class ls extends Us {
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
        attackWeapon: ls._onAttackWeapon
      }
    }, { inplace: !1 });
  }
  async _prepareContext(e) {
    var r, n, l;
    const t = await super._prepareContext(e), s = this.item.actor ?? null, i = !!(s && typeof s.isCharacterLike == "function" && s.isCharacterLike() && ((n = (r = this.item).isPersonalWeapon) != null && n.call(r)));
    return t.itemSheet = foundry.utils.mergeObject(t.itemSheet ?? {}, {
      canAttack: i,
      attackDisabled: !i || !((l = this.item.system) != null && l.equipped)
    }), t.itemSheet.summaryChips = this._getSummaryChips(t.weaponProfile ?? null), t;
  }
  _getSummaryChips(e = ((t) => ((s) => (s = (t = this.item).getCombatProfile) == null ? void 0 : s.call(t))())() ?? null) {
    var i, r, n;
    return e ? [
      { label: "Category", value: String(e.category ?? "").trim() || "Ranged" },
      { label: "Skill", value: ((i = e.skillDef) == null ? void 0 : i.label) ?? e.skill ?? "Firearms" },
      { label: "DV", value: String(Number(e.damage ?? 0)) },
      { label: "AP", value: String(Number(e.ap ?? 0)) },
      { label: "Type", value: kt(e.damageType) || "Penetrating" },
      { label: "Range", value: String(((r = e.range) == null ? void 0 : r.max) ?? "near").trim() || "Near" },
      (n = e == null ? void 0 : e.ammoState) != null && n.isTracked ? { label: "Ammo", value: `${Number(e.ammoState.current ?? 0)}/${Number(e.ammoState.max ?? 0)}` } : { label: "Ammo", value: (e == null ? void 0 : e.ammoLabel) || "Untracked" }
    ] : [];
  }
  static async _onAttackWeapon(e) {
    var s, i, r, n, l, o;
    (s = e == null ? void 0 : e.preventDefault) == null || s.call(e), (i = e == null ? void 0 : e.stopPropagation) == null || i.call(e);
    const t = this.item.actor ?? null;
    !t || !((n = (r = this.item).isPersonalWeapon) != null && n.call(r)) || await game.mwd.roll.execute({
      actor: t,
      payload: {
        intent: "attack",
        weaponId: this.item.id,
        ammoTypeId: ((o = (l = this.item.system) == null ? void 0 : l.ammo) == null ? void 0 : o.activeTypeId) ?? "",
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
      n.addEventListener("click", (l) => {
        var o, c;
        l.preventDefault(), (c = (o = this.item).createWeaponStandardTrait) == null || c.call(o);
      });
    }), s.querySelectorAll(".mwd-standard-trait-delete").forEach((n) => {
      n.addEventListener("click", (l) => {
        var o, c;
        l.preventDefault(), (c = (o = this.item).deleteWeaponStandardTrait) == null || c.call(o, n.dataset.traitId);
      });
    }), s.querySelectorAll(".mwd-standard-trait-field").forEach((n) => {
      n.addEventListener("change", (l) => {
        var o, c;
        l.preventDefault(), (c = (o = this.item).updateWeaponStandardTrait) == null || c.call(
          o,
          n.dataset.traitId,
          n.dataset.field,
          n.value
        );
      });
    }), s.querySelectorAll(".mwd-ammo-type-add").forEach((n) => {
      n.addEventListener("click", (l) => {
        var o, c;
        l.preventDefault(), (c = (o = this.item).createAmmoType) == null || c.call(o);
      });
    }), s.querySelectorAll(".mwd-ammo-type-delete").forEach((n) => {
      n.addEventListener("click", (l) => {
        var o, c;
        l.preventDefault(), (c = (o = this.item).deleteAmmoType) == null || c.call(o, n.dataset.ammoTypeId);
      });
    }), s.querySelectorAll(".mwd-ammo-type-field").forEach((n) => {
      n.addEventListener("change", (l) => {
        var o, c;
        l.preventDefault(), (c = (o = this.item).updateAmmoType) == null || c.call(
          o,
          n.dataset.ammoTypeId,
          n.dataset.field,
          n.value
        );
      });
    }), s.querySelectorAll(".mwd-ammo-type-standard-trait-add").forEach((n) => {
      n.addEventListener("click", (l) => {
        var o, c;
        l.preventDefault(), (c = (o = this.item).createAmmoTypeStandardTrait) == null || c.call(o, n.dataset.ammoTypeId);
      });
    }), s.querySelectorAll(".mwd-ammo-type-standard-trait-delete").forEach((n) => {
      n.addEventListener("click", (l) => {
        var o, c;
        l.preventDefault(), (c = (o = this.item).deleteAmmoTypeStandardTrait) == null || c.call(o, n.dataset.ammoTypeId, n.dataset.traitId);
      });
    }), s.querySelectorAll(".mwd-ammo-type-standard-trait-field").forEach((n) => {
      n.addEventListener("change", (l) => {
        var o, c;
        l.preventDefault(), (c = (o = this.item).updateAmmoTypeStandardTrait) == null || c.call(
          o,
          n.dataset.ammoTypeId,
          n.dataset.traitId,
          n.dataset.field,
          n.value
        );
      });
    }));
  }
};
R(ls, "LAYOUT_ID", "personal-weapon"), R(ls, "PARTS", {
  sheet: {
    template: `${B}/v2/item/personal-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
let $i = ls;
class Li extends Us {
}
R(Li, "LAYOUT_ID", "mech-weapon"), R(Li, "PARTS", {
  sheet: {
    template: `${B}/v2/item/mech-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
class xi extends Ze {
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
    var o, c, u, m, d, h, p, b, y;
    const t = await super._prepareContext(e), s = this.item, i = s.actor ?? null, r = ((o = i == null ? void 0 : i.getPersonalCombatLoadout) == null ? void 0 : o.call(i)) ?? null, n = ((c = r == null ? void 0 : r.activeArmor) == null ? void 0 : c.id) ?? null, l = ((u = r == null ? void 0 : r.activeArmor) == null ? void 0 : u.id) === s.id ? r.activeArmor : null;
    return t.armorState = l, t.isActiveArmor = n === s.id, t.effectiveDurabilityCurrent = Number(
      ((m = l == null ? void 0 : l.durability) == null ? void 0 : m.current) ?? ((h = (d = s.system) == null ? void 0 : d.durability) == null ? void 0 : h.current) ?? ((b = (p = s.system) == null ? void 0 : p.durability) == null ? void 0 : b.max) ?? ((y = s.system) == null ? void 0 : y.rating) ?? 0
    ), t.itemSheet = foundry.utils.mergeObject(t.itemSheet ?? {}, {}), t.itemSheet.summaryChips = this._getSummaryChips(l), t.armorEditor = {
      standardTraits: [...Xr]
    }, t;
  }
  _getSummaryChips(e = null) {
    var r, n, l, o, c, u, m, d, h, p, b, y, f;
    const t = this.item.system ?? {}, s = [
      { label: "Rating", value: String(Number((e == null ? void 0 : e.ratingCurrent) ?? t.rating ?? 0)) },
      { label: "Defense", value: String(Number(t.defenseBonus ?? 0)) },
      {
        label: "Durability",
        value: `${Number(((r = e == null ? void 0 : e.durability) == null ? void 0 : r.current) ?? ((n = t.durability) == null ? void 0 : n.current) ?? ((l = t.durability) == null ? void 0 : l.max) ?? 0)}/${Number(((o = e == null ? void 0 : e.durability) == null ? void 0 : o.max) ?? ((c = t.durability) == null ? void 0 : c.max) ?? t.rating ?? 0)}`
      },
      {
        label: "Resist",
        value: String(Number((e == null ? void 0 : e.baseMitigation) ?? (e == null ? void 0 : e.baseResistance) ?? 0))
      }
    ], i = Number(((m = (u = e == null ? void 0 : e.traitState) == null ? void 0 : u.reinforced) == null ? void 0 : m.max) ?? ((h = (d = t == null ? void 0 : t.traitState) == null ? void 0 : d.reinforced) == null ? void 0 : h.max) ?? 0);
    return i > 0 && s.push({
      label: "Reinforced",
      value: `${Number(((b = (p = e == null ? void 0 : e.traitState) == null ? void 0 : p.reinforced) == null ? void 0 : b.current) ?? ((f = (y = t == null ? void 0 : t.traitState) == null ? void 0 : y.reinforced) == null ? void 0 : f.current) ?? 0)}/${i}`
    }), s;
  }
  _onRender(e, t) {
    var i, r;
    (i = super._onRender) == null || i.call(this, e, t);
    const s = (r = this._getRootElement) == null ? void 0 : r.call(this);
    s && (s.querySelectorAll(".mwd-armor-standard-trait-add").forEach((n) => {
      n.addEventListener("click", (l) => {
        var o, c;
        l.preventDefault(), (c = (o = this.item).createArmorStandardTrait) == null || c.call(o);
      });
    }), s.querySelectorAll(".mwd-armor-standard-trait-delete").forEach((n) => {
      n.addEventListener("click", (l) => {
        var o, c;
        l.preventDefault(), (c = (o = this.item).deleteArmorStandardTrait) == null || c.call(o, n.dataset.traitId);
      });
    }), s.querySelectorAll(".mwd-armor-standard-trait-field").forEach((n) => {
      n.addEventListener("change", (l) => {
        var o, c;
        l.preventDefault(), (c = (o = this.item).updateArmorStandardTrait) == null || c.call(
          o,
          n.dataset.traitId,
          n.dataset.field,
          n.value
        );
      });
    }));
  }
}
R(xi, "LAYOUT_ID", "armor"), R(xi, "PARTS", {
  sheet: {
    template: `${B}/v2/item/armor-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
function ol() {
  console.log(`${Z}Registering Item sheets (V2)`);
  const { Items: a } = foundry.documents.collections;
  a.registerSheet(S, Er, { types: ["contact"], makeDefault: !0, label: "Contact (V2)" }), a.registerSheet(S, Rr, { types: ["gear"], makeDefault: !0, label: "Gear (V2)" }), a.registerSheet(S, Cr, { types: ["quality"], makeDefault: !0, label: "Quality (V2)" }), a.registerSheet(S, Nr, { types: ["assetModule"], makeDefault: !0, label: "Asset Module (V2)" }), a.registerSheet(S, Pr, { types: ["lifeModule"], makeDefault: !0, label: "Life Module (V2)" }), a.registerSheet(S, Dr, { types: ["skill"], makeDefault: !0, label: "Skill (V2)" }), a.registerSheet(S, $i, { types: ["personalWeapon", "weapon"], makeDefault: !0, label: "Personal Weapon (V2)" }), a.registerSheet(S, Li, { types: ["mechWeapon"], makeDefault: !0, label: "Mech Weapon (V2)" }), a.registerSheet(S, xi, { types: ["armor"], makeDefault: !0, label: "Armor (V2)" });
}
const Ea = [
  // UI (CSB render entry point + node types)
  `systems/${S}/templates/v2/ui/layout-root.hbs`,
  `systems/${S}/templates/v2/ui/nodes/hexabox.hbs`,
  `systems/${S}/templates/v2/ui/nodes/stack.hbs`,
  `systems/${S}/templates/v2/ui/nodes/panel.hbs`,
  `systems/${S}/templates/v2/ui/nodes/include.hbs`,
  `systems/${S}/templates/v2/ui/nodes/tabs.hbs`,
  `systems/${S}/templates/v2/ui/nodes/unknown.hbs`,
  `systems/${S}/templates/common/view-mode.hbs`,
  `systems/${S}/templates/common/label.hbs`,
  `systems/${S}/templates/common/enum-value-label.hbs`,
  `systems/${S}/templates/common/damage-code.hbs`,
  `systems/${S}/templates/common/damage-armor.hbs`,
  `systems/${S}/templates/v2/ui/mod-stepper.hbs`,
  `systems/${S}/templates/v2/ui/condition-monitors.hbs`,
  `systems/${S}/templates/v2/roll/_mwd-roll-card.hbs`,
  `systems/${S}/templates/v2/components/checkbox.hbs`,
  `systems/${S}/templates/v2/components/radio.hbs`,
  // Character UI
  `systems/${S}/templates/v2/ui/character/attributes.hbs`,
  `systems/${S}/templates/v2/ui/character/combat-actions.hbs`,
  `systems/${S}/templates/v2/ui/character/skills-column.hbs`,
  `systems/${S}/templates/v2/ui/character/skill-row.hbs`,
  `systems/${S}/templates/v2/ui/character/edge-console.hbs`,
  `systems/${S}/templates/v2/ui/character/burn-monitor.hbs`,
  `systems/${S}/templates/v2/ui/character/status-dashboard.hbs`,
  `systems/${S}/templates/v2/ui/character/inventory-section.hbs`,
  `systems/${S}/templates/v2/ui/character/inventory-record.hbs`,
  `systems/${S}/templates/v2/ui/character/bio-identity.hbs`,
  `systems/${S}/templates/v2/ui/character/bio-history.hbs`,
  // Sheet wrapper
  `systems/${S}/templates/v2/actor/_sheet-root.hbs`,
  // Placeholders
  `systems/${S}/templates/v2/ui/placeholders/assigned-systems.hbs`,
  `systems/${S}/templates/v2/ui/placeholders/inventory-gear.hbs`,
  `systems/${S}/templates/v2/ui/placeholders/inventory-armor.hbs`,
  `systems/${S}/templates/v2/ui/placeholders/inventory-weapons.hbs`,
  `systems/${S}/templates/v2/ui/placeholders/bio-description.hbs`,
  `systems/${S}/templates/v2/ui/placeholders/bio-life-modules.hbs`,
  // V2 item partials
  `systems/${S}/templates/v2/item/_item-sheet-root.hbs`,
  `systems/${S}/templates/v2/item/personal-weapon-root.hbs`,
  `systems/${S}/templates/v2/item/mech-weapon-root.hbs`,
  `systems/${S}/templates/v2/item/armor-root.hbs`,
  `systems/${S}/templates/v2/item/parts/itemname.hbs`,
  `systems/${S}/templates/v2/item/parts/references.hbs`,
  `systems/${S}/templates/v2/item/parts/modifier.hbs`,
  `systems/${S}/templates/v2/item/parts/modifiers.hbs`,
  `systems/${S}/templates/v2/item/parts/weapon-main.hbs`,
  `systems/${S}/templates/v2/item/parts/weapon-compact-main.hbs`,
  `systems/${S}/templates/v2/item/parts/weapon-summary-hero.hbs`,
  `systems/${S}/templates/v2/item/parts/weapon-combat-essentials.hbs`,
  `systems/${S}/templates/v2/item/parts/weapon-usage-bands.hbs`,
  `systems/${S}/templates/v2/item/parts/weapon-standard-traits.hbs`,
  `systems/${S}/templates/v2/item/parts/weapon-ammo-profiles.hbs`,
  `systems/${S}/templates/v2/item/parts/weapon-notes-reference.hbs`,
  `systems/${S}/templates/v2/item/parts/armor-main.hbs`,
  `systems/${S}/templates/v2/item/parts/armor-summary-hero.hbs`,
  `systems/${S}/templates/v2/item/parts/armor-combat-essentials.hbs`,
  `systems/${S}/templates/v2/item/parts/armor-usage-protection.hbs`,
  `systems/${S}/templates/v2/item/parts/armor-identity-fields.hbs`,
  `systems/${S}/templates/v2/item/parts/armor-standard-traits.hbs`,
  `systems/${S}/templates/v2/item/parts/armor-notes-reference.hbs`,
  `systems/${S}/templates/v2/item/parts/item-effects.hbs`,
  // Actors
  `systems/${S}/templates/v2/actor/character-sheet.hbs`
];
function ll(a) {
  const e = String(a).replaceAll("\\", "/"), t = `systems/${S}/templates/`, s = e.indexOf(t);
  return `mwd.${(s >= 0 ? e.slice(s + t.length) : e).replace(/\.hbs$/i, "").split("/").filter(Boolean).map((l) => l.replace(/^_+/, "")).join(".")}`;
}
function cl() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
async function ul() {
  var e, t;
  const a = cl();
  try {
    const s = {};
    for (const r of Ea)
      s[ll(r)] = r, s[r] = r;
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
    console.log(`${Z}preloadTemplatesV2 OK`, { loaded: Ea.length });
  } catch (s) {
    throw console.error(`${Z}preloadTemplatesV2 FAILED`, s), s;
  }
}
function Ra(a) {
  const e = Math.max(0, Number(a) || 0);
  return -Math.floor(e / 3);
}
function ml(a) {
  const e = Math.max(0, Number(a) || 0);
  return e === 0 ? 0 : Math.ceil(e / 4);
}
function dl(a = {}) {
  const e = a.physical ?? {}, t = a.fatigue ?? {}, s = a.armor ?? {}, i = Number(e.value) || 0, r = Number(t.value) || 0, n = Math.max(Number(s.value) || 0, Number(s.max) || 0);
  return {
    physical: { penalty: Ra(i) },
    fatigue: { penalty: Ra(r) },
    armor: { resistance: ml(n) }
  };
}
const ci = {
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
function pl(a, e, t, s) {
  const i = a.system ?? {}, r = `monitors.${e}`, n = Number(foundry.utils.getProperty(i, `${r}.max`)) || 0, l = Number(foundry.utils.getProperty(i, `${r}.value`)) || 0;
  switch (t) {
    case "value":
      return s;
    case "armorPersonalBase":
      return s;
    case "mechArmorBase":
      return Math.max(s, n, l);
    case "vehicleArmorBase":
      return Math.max(s, n, l);
    default:
      return s;
  }
}
function hl(a = {}) {
  return Object.entries(it(a)).filter(([, e]) => Number(e) > 0).map(([e, t]) => `${e} +${t}`).join(", ");
}
class fl extends Actor {
  /* -------------------------------------------- */
  /* Base & Derived Data                           */
  /* -------------------------------------------- */
  /** @override */
  prepareBaseData() {
    var e, t;
    if (super.prepareBaseData(), this.isCharacterLike()) {
      const s = this.system ?? {};
      if (Pn(s), (e = s.skills) != null && e.skills && typeof s.skills.skills == "object") {
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
      for (const [n, l] of Object.entries(i)) {
        const o = Math.max(0, Number((l == null ? void 0 : l.rating) ?? 0)), c = Math.max(0, Number((l == null ? void 0 : l.value) ?? 0)), u = Math.min(o, e), m = Math.min(c, u);
        r[n] = {
          key: n,
          rating: o,
          value: c,
          cap: e,
          effectiveMax: u,
          effectiveValue: m,
          hasPools: !0,
          isEmpty: m <= 0,
          isCapped: o > e
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
      var p;
      return ((p = h.isPersonalWeapon) == null ? void 0 : p.call(h)) ?? h.type === g.itemType.personalWeapon;
    }).map((h) => {
      var p;
      return ((p = h.getCombatProfile) == null ? void 0 : p.call(h)) ?? null;
    }).filter(Boolean), s = this.items.filter((h) => {
      var p;
      return ((p = h.isArmor) == null ? void 0 : p.call(h)) ?? h.type === g.itemType.armor;
    }).map((h) => {
      var p;
      return ((p = h.getArmorProfile) == null ? void 0 : p.call(h, { actor: this })) ?? null;
    }).filter(Boolean), i = t.filter((h) => h.equipped), r = s.filter((h) => h.equipped), n = i.filter((h) => h.isPrimary), l = r.filter((h) => h.isPrimary);
    let o = null, c = null, u = !1;
    n.length === 1 ? (c = n[0], o = c) : n.length > 1 ? (e.push("Multiple equipped primary weapons found; attack selection requires a chooser."), u = !0) : i.length === 1 ? o = i[0] : i.length > 1 ? u = !0 : o = {
      ...Ue.DEFAULT_UNARMED,
      uuid: null,
      img: null,
      item: null,
      equipped: !0,
      isPrimary: !1,
      defaultRangeBand: "close",
      isSynthetic: !0
    };
    let m = null, d = null;
    return l.length === 1 ? (m = l[0], d = this._buildActiveArmorState(m)) : l.length > 1 ? (e.push("Multiple equipped primary armor items found; using the first equipped armor."), d = r[0] ? this._buildActiveArmorState(r[0]) : null) : r.length === 1 ? d = this._buildActiveArmorState(r[0]) : r.length > 1 && (e.push("Multiple equipped armor items found without a single primary; using the first equipped armor."), d = this._buildActiveArmorState(r[0])), {
      weapons: t,
      equippedWeapons: i,
      primaryWeapon: c,
      defaultWeapon: o,
      weaponChoiceRequired: u,
      armor: s,
      equippedArmor: r,
      primaryArmor: m,
      activeArmor: d,
      warnings: e
    };
  }
  _buildActiveArmorState(e) {
    var n, l;
    if (!e) return null;
    const t = Math.max(0, Number(((n = e == null ? void 0 : e.durability) == null ? void 0 : n.max) ?? (e == null ? void 0 : e.rating) ?? 0)), s = Math.min(
      t,
      Math.max(0, Number(((l = e == null ? void 0 : e.durability) == null ? void 0 : l.current) ?? (e == null ? void 0 : e.currentArmorRating) ?? t))
    ), i = it(e == null ? void 0 : e.mitigationByType), r = Vi(s);
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
    var n, l, o, c;
    const s = this.getOwnedItem(e);
    if (!s || !((n = s.isPersonalWeapon) != null && n.call(s) || (l = s.isArmor) != null && l.call(s))) return null;
    const i = [], r = !!t;
    if (r)
      for (const u of this.items.filter((m) => m.type === s.type && m.id !== s.id))
        (o = u.system) != null && o.isPrimary && i.push({ _id: u.id, "system.isPrimary": !1 });
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
    var c, u, m;
    const t = this.getEdgeCap();
    if (this.type === "npc" && !this.hasEdgePools()) {
      const d = t, h = t;
      return {
        key: e,
        value: h,
        rating: d,
        effectiveValue: h,
        effectiveMax: d,
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
    const s = (m = (u = (c = this._mwdDerived) == null ? void 0 : c.edgePools) == null ? void 0 : u.pools) == null ? void 0 : m[e];
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
    const i = this.getEdgePoolRaw(e), r = Math.max(0, Number((i == null ? void 0 : i.rating) ?? 0)), n = Math.max(0, Number((i == null ? void 0 : i.value) ?? 0)), l = Math.min(r, t), o = Math.min(n, l);
    return {
      key: e,
      value: n,
      rating: r,
      effectiveValue: o,
      effectiveMax: l,
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
    const s = this.getEdgeCap(), i = this.getEdgePoolRaw(e), r = Math.max(0, Number((i == null ? void 0 : i.rating) ?? 0)), n = Math.min(r, s), l = Number(t ?? 0), o = Math.max(0, Math.min(l, n));
    return this.update({
      [`system.counters.edgePools.${e}.value`]: o
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
    var o;
    if (!this.hasEdgePools()) return;
    const s = this.getEdgeCap(), i = Math.max(0, Number(t ?? 0)), r = Math.min(i, s), n = Math.max(0, Number(((o = this.getEdgePoolRaw(e)) == null ? void 0 : o.value) ?? 0)), l = Math.min(n, r);
    return this.update({
      [`system.counters.edgePools.${e}.rating`]: i,
      [`system.counters.edgePools.${e}.value`]: l
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
      const l = ((i = (s = this._mwdDerived) == null ? void 0 : s.edgePools) == null ? void 0 : i.pools) ?? {};
      if (e && typeof e == "object") {
        const c = Object.entries(e).map(([u, m]) => {
          const d = (m ?? []).map((h) => {
            const p = l[h] ?? this.getEdgePool(h);
            return {
              ...p,
              isEmpty: (p.effectiveValue ?? 0) <= 0,
              isCapped: (p.rating ?? 0) > (p.cap ?? t)
            };
          });
          return { id: u, pools: d };
        });
        return { cap: t, hasPools: !0, groups: c, pools: [] };
      }
      const o = Object.keys(((n = (r = this.system) == null ? void 0 : r.counters) == null ? void 0 : n.edgePools) ?? {}).map((c) => {
        const u = l[c] ?? this.getEdgePool(c);
        return {
          ...u,
          isEmpty: (u.effectiveValue ?? 0) <= 0,
          isCapped: (u.rating ?? 0) > (u.cap ?? t)
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
    var m, d, h, p, b, y;
    if (e === "burn") {
      const f = Math.max(0, Number(t) || 0);
      return this.update({ "system.burn.value": f });
    }
    if (e === "armor" && this.isCharacterLike()) {
      const f = this.getPersonalCombatLoadout({ refresh: !0 }), A = ((m = f == null ? void 0 : f.activeArmor) == null ? void 0 : m.armorId) ?? ((d = f == null ? void 0 : f.activeArmor) == null ? void 0 : d.id) ?? null, M = A ? this.items.get(A) : null;
      if (!(M != null && M.id)) return null;
      const k = Math.max(0, Number(((h = M.system) == null ? void 0 : h.rating) ?? 0) || 0), P = Math.max(0, Number(((b = (p = M.system) == null ? void 0 : p.durability) == null ? void 0 : b.max) ?? 0) || 0), W = P > 0 ? P : k, I = Math.min(Math.max(0, Number(t) || 0), W);
      return this.updateEmbeddedDocuments("Item", [{
        _id: M.id,
        "system.durability.max": W,
        "system.durability.current": I
      }]);
    }
    const i = `system.monitors.${e}`, r = Number(foundry.utils.getProperty(this, `${i}.max`)) || 0, n = Math.max(0, r), l = Math.min(Math.max(0, Number(t) || 0), n), o = { [`${i}.value`]: l }, c = this.type, u = (y = Ks == null ? void 0 : Ks[c]) == null ? void 0 : y[e];
    if (u != null && u.derived)
      for (const [f, A] of Object.entries(u.derived)) {
        const M = ci == null ? void 0 : ci[A.fn];
        if (typeof M != "function") continue;
        const k = pl(this, e, A.source, l);
        o[`${i}.derived.${f}`] = M(k);
      }
    return this.update(o);
  }
  _prepareMonitors() {
    var n, l, o, c;
    const e = this.system.monitors ?? {}, t = dl(e);
    (n = this.system).derived ?? (n.derived = {}), this.system.derived.monitors = t;
    const s = Number(((l = t == null ? void 0 : t.physical) == null ? void 0 : l.penalty) ?? 0), i = Number(((o = t == null ? void 0 : t.fatigue) == null ? void 0 : o.penalty) ?? 0), r = s + i;
    (c = this.system.derived).condition ?? (c.condition = {}), this.system.derived.condition.physicalPenalty = s, this.system.derived.condition.fatiguePenalty = i, this.system.derived.condition.totalPenalty = r, this.system.derived.conditionPenalty = r;
  }
  _preparePersonalCombatDerived() {
    var n, l, o, c, u, m;
    if (!this.isCharacterLike()) return;
    const e = this.getPersonalCombatLoadout({ refresh: !0 }), t = (l = (n = this.system) == null ? void 0 : n.monitors) == null ? void 0 : l.armor;
    if (!t) return;
    const s = e.activeArmor, i = Math.max(0, Number(((o = s == null ? void 0 : s.durability) == null ? void 0 : o.max) ?? 0)), r = Math.max(0, Number((s == null ? void 0 : s.currentArmorRating) ?? ((c = s == null ? void 0 : s.durability) == null ? void 0 : c.current) ?? 0));
    t.max = i, t.value = Math.min(i, r), t.resistance = {
      default: Number((s == null ? void 0 : s.baseMitigation) ?? (s == null ? void 0 : s.baseResistance) ?? 0),
      byType: {}
    }, t.resistanceBonusByType = s != null && s.isDestroyed ? {} : (s == null ? void 0 : s.mitigationByType) ?? (s == null ? void 0 : s.typedMitigation) ?? {}, t.derived ?? (t.derived = {}), t.derived.resistance = Number((s == null ? void 0 : s.baseMitigation) ?? (s == null ? void 0 : s.baseResistance) ?? 0), t.effect = s != null && s.isDestroyed ? "Destroyed" : s ? hl(s.mitigationByType ?? s.typedMitigation) : "", (u = this.system).derived ?? (u.derived = {}), this.system.derived.personalCombat = {
      defaultWeaponId: ((m = e.defaultWeapon) == null ? void 0 : m.id) ?? null,
      activeArmorId: (s == null ? void 0 : s.id) ?? null,
      warnings: [...e.warnings ?? []]
    };
  }
}
async function gl({ actor: a, payload: e } = {}) {
  var y, f, A, M, k, P;
  if (!a) throw new Error("resolveSkill requires actor");
  const t = String((e == null ? void 0 : e.key) ?? "").trim(), s = at(t);
  if (!s) throw new Error(`Unknown skill: ${t}`);
  const i = a.system ?? {}, r = String((e == null ? void 0 : e.attrKey) ?? s.attribute ?? "").trim();
  if (!r) throw new Error(`Skill ${t} missing attribute key`);
  const n = Number(((f = (y = i == null ? void 0 : i.attributes) == null ? void 0 : y[r]) == null ? void 0 : f.value) ?? 0), l = Number(((M = (A = i == null ? void 0 : i.skills) == null ? void 0 : A[t]) == null ? void 0 : M.rating) ?? 0), o = Number(((P = (k = i == null ? void 0 : i.skills) == null ? void 0 : k[t]) == null ? void 0 : P.bonus) ?? 0), c = new Set(js(i, t)), u = Ki(t, e == null ? void 0 : e.specializationKey), m = u && c.has(u.key) ? u : null, d = m ? Ui : 0, h = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : s.domains ?? [], p = Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : Number.isFinite(Number(e == null ? void 0 : e.target)) ? Number(e.target) : 5, b = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1;
  return {
    intent: "skill",
    rollType: "simple",
    title: `${s.label} (${r})`,
    subtitle: a.name ?? "Actor",
    domains: h,
    // Per-die threshold (cs>=X). Kept separate from dnHits.
    diceTarget: p,
    // DN = hits needed for success
    difficulty: { dn: b },
    edge: {
      earn: { enabled: !0, rate: 4, maxPerRoll: 1 }
    },
    pool: { attribute: n, skill: l, bonus: o, specialization: d },
    breakdown: [
      { id: "attribute", label: "Attribute", value: n },
      { id: "skill", label: "Skill", value: l },
      { id: "bonus", label: "Bonus", value: o },
      ...m ? [{
        id: "specialization",
        label: `Specialization (${m.label})`,
        value: d
      }] : []
    ],
    specialization: m ? {
      key: m.key,
      label: m.label,
      value: d,
      skillKey: t
    } : null,
    // optional extra metadata (safe to stash)
    data: {
      skillKey: t,
      attrKey: r,
      label: `${r}+${s.label}`,
      specializationKey: (m == null ? void 0 : m.key) ?? "",
      specializationLabel: (m == null ? void 0 : m.label) ?? ""
    }
  };
}
const yl = /* @__PURE__ */ new Set([
  "grit",
  "chaos",
  "insight",
  "rumor",
  "legend",
  "credibility"
]), bl = {
  grit: "physical",
  chaos: "physical",
  insight: "mental",
  rumor: "mental",
  legend: "social",
  credibility: "social"
};
async function wl({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveEdge requires actor");
  const t = String((e == null ? void 0 : e.pool) ?? "").trim();
  if (!yl.has(t)) throw new Error(`Invalid edge pool: ${t}`);
  const s = a.getEdgePool(t), i = Math.max(0, Number((s == null ? void 0 : s.effectiveValue) ?? 0));
  return {
    intent: "edge",
    title: `Edge — ${t}`,
    subtitle: a.name ?? "Actor",
    domains: [bl[t] ?? "unknown"],
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
async function Al({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Attribute",
    intent: "attribute",
    domainTags: ["general"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
function Tl() {
  var a;
  return Array.from(((a = game.user) == null ? void 0 : a.targets) ?? []);
}
function Sl(a) {
  var i, r, n, l;
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
      remainingDurability: Number(s.remainingDurability ?? ((l = s.durability) == null ? void 0 : l.current) ?? 0),
      baseMitigation: Number(s.baseMitigation ?? s.baseResistance ?? 0),
      baseResistance: Number(s.baseMitigation ?? s.baseResistance ?? 0),
      mitigationByType: { ...s.mitigationByType ?? s.typedMitigation ?? {} },
      tags: [...s.tags ?? []],
      isDestroyed: !!s.isDestroyed,
      defenseBonus: Number(s.defenseBonus ?? 0)
    } : null
  };
}
function kl(a, e) {
  var s, i, r, n, l, o;
  if (((s = e == null ? void 0 : e.syntheticWeapon) == null ? void 0 : s.id) === "unarmed")
    return {
      ...Ue.DEFAULT_UNARMED,
      ...e.syntheticWeapon,
      isSynthetic: !0,
      defaultRangeBand: "close"
    };
  const t = ((r = (i = a.items) == null ? void 0 : i.get) == null ? void 0 : r.call(i, (e == null ? void 0 : e.weaponId) ?? "")) ?? null;
  if (!t || !(((n = t.isPersonalWeapon) == null ? void 0 : n.call(t)) ?? t.type === "personalWeapon") || !((l = t.system) != null && l.equipped))
    throw new Error("Attack requires an equipped personal weapon.");
  return ((o = t.getCombatProfile) == null ? void 0 : o.call(t, { ammoTypeId: e == null ? void 0 : e.ammoTypeId })) ?? null;
}
async function Ml({ actor: a, payload: e } = {}) {
  var A, M, k, P, W, I, z, Y, K, ee, O, ie, le, ae;
  if (!a) throw new Error("resolveAttack requires actor");
  const t = kl(a, e);
  if (!t) throw new Error("Unable to resolve weapon profile.");
  const s = at(t.skill) ?? {
    code: t.skill,
    label: t.skill || "Attack",
    attribute: "reflexes",
    domains: ["physical"]
  }, i = String(s.attribute ?? "reflexes").trim() || "reflexes", r = ((A = a.getAttributeValue) == null ? void 0 : A.call(a, i)) ?? Number(((P = (k = (M = a.system) == null ? void 0 : M.attributes) == null ? void 0 : k[i]) == null ? void 0 : P.value) ?? 0), n = ((W = a.getSkillRating) == null ? void 0 : W.call(a, t.skill)) ?? Number(((Y = (z = (I = a.system) == null ? void 0 : I.skills) == null ? void 0 : z[t.skill]) == null ? void 0 : Y.rating) ?? 0), l = Number(((O = (ee = (K = a.system) == null ? void 0 : K.skills) == null ? void 0 : ee[t.skill]) == null ? void 0 : O.bonus) ?? 0), o = new Set(js(a.system ?? {}, t.skill)), c = Ki(t.skill, e == null ? void 0 : e.specializationKey), u = c && o.has(c.key) ? c : null, m = u ? Ui : 0, d = Number(((ie = t == null ? void 0 : t.effects) == null ? void 0 : ie.accuracyMod) ?? 0) || 0, h = l + d, p = String((e == null ? void 0 : e.rangeBand) ?? t.defaultRangeBand ?? "close").trim() || "close", b = Number(((le = t == null ? void 0 : t.attackRatingBand) == null ? void 0 : le[p]) ?? 0) || 0, y = Tl().map(Sl).filter(Boolean), f = Number(t.ap ?? 0) + Number(((ae = t == null ? void 0 : t.effects) == null ? void 0 : ae.ap) ?? 0);
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
    pool: { attribute: r, skill: n, bonus: h, specialization: m },
    breakdown: [
      { id: "attribute", label: "Attribute", value: r },
      { id: "skill", label: s.label, value: n },
      { id: "bonus", label: "Skill Bonus", value: l },
      ...u ? [{
        id: "specialization",
        label: `Specialization (${u.label})`,
        value: m
      }] : [],
      { id: "weaponAccuracy", label: "Weapon Accuracy", value: d },
      { id: "damage", label: "Damage", value: Number(t.damage ?? 0) || 0 },
      { id: "ap", label: "AP", value: f },
      { id: "attackRating", label: `Attack Rating (${p})`, value: b }
    ],
    attack: {
      rangeBand: p,
      weapon: t,
      skill: {
        code: s.code ?? t.skill,
        label: s.label ?? t.skill,
        attribute: i,
        specialization: u ? {
          key: u.key,
          label: u.label,
          value: m
        } : null
      },
      targets: y,
      ammo: (t == null ? void 0 : t.ammoState) ?? null,
      ammoLabel: (t == null ? void 0 : t.ammoLabel) ?? "",
      totalAp: f
    },
    specialization: u ? {
      key: u.key,
      label: u.label,
      value: m,
      skillKey: s.code ?? t.skill
    } : null
  };
}
async function vl({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Defense",
    intent: "defense",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function El({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Resistance",
    intent: "resistance",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function Rl({ actor: a } = {}) {
  var s, i, r, n, l, o;
  const e = Number(((r = (i = (s = a.system) == null ? void 0 : s.attributes) == null ? void 0 : i.reflexes) == null ? void 0 : r.value) ?? 0), t = Number(((o = (l = (n = a.system) == null ? void 0 : n.attributes) == null ? void 0 : l.edge) == null ? void 0 : o.value) ?? 0);
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
async function Cl({ actor: a }) {
  var s, i, r, n, l;
  const e = Number(((i = (s = a.system) == null ? void 0 : s.burn) == null ? void 0 : i.value) ?? 0);
  e < 6 && ui.notifications.warn("Overload check is only required at Burn 6+.");
  const t = Number(((l = (n = (r = a.system) == null ? void 0 : r.attributes) == null ? void 0 : n.willpower) == null ? void 0 : l.value) ?? 0);
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
const Nl = {
  skill: gl,
  edge: wl,
  attribute: Al,
  attack: Ml,
  defense: vl,
  resistance: El,
  initiative: Rl,
  overload: Cl
};
async function Ca({ actor: a, payload: e, event: t } = {}) {
  if (!a) throw new Error("resolveIntent requires actor");
  const s = String((e == null ? void 0 : e.intent) ?? "").trim();
  if (!s) throw new Error("resolveIntent requires payload.intent");
  const i = Nl[s];
  if (!i) throw new Error(`Unsupported roll intent: ${s}`);
  const r = await i({ actor: a, payload: e, event: t });
  return Pl(r, { intent: s });
}
function Pl(a, { intent: e } = {}) {
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
var Ut;
class Dl {
  constructor() {
    we(this, Ut, /* @__PURE__ */ new Map());
  }
  register(e) {
    if (!(e != null && e.id) || typeof e.collect != "function")
      throw new Error("Invalid ModifierProvider: missing id or collect()");
    F(this, Ut).has(e.id) || F(this, Ut).set(e.id, e);
  }
  async collectAll(e) {
    const t = [];
    for (const s of F(this, Ut).values()) {
      const i = await s.collect(e);
      if (console.log("MWD | provider", s.id, "returned", i), !!(i != null && i.length))
        for (const r of i)
          r && typeof r.label == "string" && typeof r.value == "number" && typeof r.source == "string" ? t.push(r) : console.warn("MWD | DROPPED MOD (bad shape)", s.id, r);
    }
    return t;
  }
}
Ut = new WeakMap();
const zt = new Dl();
function Ol(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function Il(a) {
  const e = Ol(a == null ? void 0 : a.value);
  return e === null ? null : { ...a, value: e };
}
async function Na({
  actor: a,
  rollType: e,
  skillId: t,
  domains: s,
  // NEW (optional)
  payload: i,
  resolved: r,
  context: n
} = {}) {
  const l = { actor: a, rollType: e, skillId: t, domains: s, payload: i, resolved: r, context: n }, o = await zt.collectAll(l);
  console.log("MWD|condition collect called", l.rollType);
  let c = [];
  for (const m of o ?? []) {
    const d = Il(m);
    if (!d) {
      console.warn("MWD | Dropping invalid modifier value", m);
      continue;
    }
    c.push(d);
  }
  Array.isArray(s) && s.length && (c = c.filter((m) => !m.domain || s.includes(m.domain)));
  const u = c.reduce((m, d) => m + d.value, 0);
  return { mods: c, total: u };
}
function _l({
  actor: a,
  payload: e,
  ctx: t,
  roll: s,
  target: i,
  pool: r,
  mods: n = [],
  modTotal: l = 0,
  hits: o = null,
  ones: c = null,
  edge: u = null,
  outcomeModel: m = null
} = {}) {
  var Y, K, ee;
  if (!a) throw new Error("buildResolved requires actor");
  if (!(e != null && e.intent)) throw new Error("buildResolved requires payload.intent");
  if (!s) throw new Error("buildResolved requires roll");
  const d = foundry.utils.randomID(), h = (Y = s.dice) == null ? void 0 : Y[0], b = (Array.isArray(h == null ? void 0 : h.results) ? h.results : []).map((O, ie) => {
    const le = `pool:${ie}`, ae = Number(O.result), me = !!O.success;
    return {
      ref: le,
      face: ae,
      isSuccess: me,
      isFailure: !me,
      tooltip: me ? `Die ${ie + 1}: ${ae} (Success vs TN ${Number(i ?? 5)})` : `Die ${ie + 1}: ${ae} (Failure vs TN ${Number(i ?? 5)})`
    };
  }), y = b.filter((O) => O.isFailure).map((O) => O.ref), f = [{
    id: "pool",
    label: "Pool",
    faces: 6,
    termIndex: 0,
    // informational only
    dice: b
  }], A = (Array.isArray(n) ? n : []).map((O, ie) => {
    const le = Number(O.value ?? 0), ae = `mod:${Ll(O.label ?? "mod")}:${ie}`;
    return {
      id: O.id ?? ae,
      label: O.label ?? "Modifier",
      value: le,
      domain: O.domain ?? null,
      source: O.source ?? null,
      tooltip: O.tooltip ?? `${O.label ?? "Modifier"} ${Pa(le)}`
    };
  }), M = A.map((O) => O.id), P = (Array.isArray(t == null ? void 0 : t.breakdown) ? t.breakdown : []).map((O) => ({
    id: `pool.${O.id ?? foundry.utils.randomID()}`,
    label: O.label ?? O.id ?? "Row",
    value: Number(O.value ?? 0),
    tooltip: `Contribution from ${O.label ?? O.id}: ${Number(O.value ?? 0)}`
  }));
  P.push({
    id: "mods.total",
    label: "Mods",
    value: Number(l ?? 0),
    modIds: M,
    tooltip: A.length ? A.map((O) => `${O.label}: ${Pa(O.value)}`).join(`
`) : "No roll-time modifiers."
  }), P.push({
    id: "pool.final",
    label: "Final Pool",
    value: Number(r ?? 0),
    tooltip: `Final dice pool rolled: ${Number(r ?? 0)}d6`
  });
  const W = Number.isFinite(Number(o)) ? Number(o) : b.filter((O) => O.isSuccess).length, I = Number.isFinite(Number(c)) ? Number(c) : b.filter((O) => O.face === 1).length, z = $l(u, { payload: e });
  return {
    version: 2,
    id: d,
    actorUuid: a.uuid,
    // Re-entry
    originPayload: e,
    // Render header
    title: (t == null ? void 0 : t.title) ?? "Roll",
    subtitle: (t == null ? void 0 : t.subtitle) ?? a.name ?? "Actor",
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
        pool: ((K = t == null ? void 0 : t.edge) == null ? void 0 : K.pool) ?? null,
        earn: ((ee = t == null ? void 0 : t.edge) == null ? void 0 : ee.earn) ?? null
      }
    },
    // Roll + dice
    roll: {
      json: s.toJSON(),
      formula: s.formula,
      target: Number(i ?? 5),
      pool: Number(r ?? 0),
      diceGroups: f,
      failureDiceRefs: y
    },
    // Outcome numbers
    outcome: {
      hits: W,
      ones: I
    },
    // New: engine-interpreted outcome (margin/net/converted/edgeEarned/etc
    outcomeModel: m,
    // Breakdown + modifiers
    breakdownRows: P,
    modifiers: {
      applied: A,
      total: Number(l ?? 0)
    },
    // Edge snapshot / affordances
    edge: z
  };
}
function $l(a, { payload: e } = {}) {
  var p, b, y, f, A, M, k, P, W, I, z, Y, K, ee;
  const t = !!((p = e == null ? void 0 : e.edge) != null && p.enabled), s = (a == null ? void 0 : a.domain) ?? null, i = (a == null ? void 0 : a.pools) ?? null, r = ((b = a == null ? void 0 : a.pre) == null ? void 0 : b.poolKey) ?? ((f = (y = e == null ? void 0 : e.edge) == null ? void 0 : y.pre) == null ? void 0 : f.poolKey) ?? (t ? ((A = e == null ? void 0 : e.edge) == null ? void 0 : A.poolKey) ?? null : null), n = Number(((M = a == null ? void 0 : a.pre) == null ? void 0 : M.spent) ?? ((P = (k = e == null ? void 0 : e.edge) == null ? void 0 : k.pre) == null ? void 0 : P.spent) ?? (t ? 1 : 0)) ? 1 : 0, l = ((W = a == null ? void 0 : a.post) == null ? void 0 : W.poolKey) ?? ((z = (I = e == null ? void 0 : e.edge) == null ? void 0 : I.post) == null ? void 0 : z.poolKey) ?? null, o = Number(((Y = a == null ? void 0 : a.post) == null ? void 0 : Y.spent) ?? ((ee = (K = e == null ? void 0 : e.edge) == null ? void 0 : K.post) == null ? void 0 : ee.spent) ?? 0) ? 1 : 0, c = (i == null ? void 0 : i.a) ?? null, u = (i == null ? void 0 : i.b) ?? null, m = [c, u].filter(Boolean);
  let d = [c, u].filter(Boolean);
  n && r && (d = d.filter((O) => O !== r));
  const h = {
    canSpendPre: m.length > 0 && !n,
    // spending pre after roll is not a thing
    canSpendPost: d.length > 0 && !o,
    canPostRerollFailures: d.length > 0 && !o
  };
  return {
    domain: s,
    pools: i ? { a: c, b: u } : null,
    pre: { poolKey: r, spent: n },
    post: { poolKey: l, spent: o },
    allowed: {
      prePools: m,
      postPools: d
    },
    availableActions: h
  };
}
function Pa(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function Ll(a) {
  return String(a).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function xl(a, e) {
  var c, u, m, d, h, p, b, y, f;
  const t = a ?? {}, s = Array.isArray((c = t == null ? void 0 : t.modifiers) == null ? void 0 : c.applied) ? t.modifiers.applied : [], i = Number(((u = t == null ? void 0 : t.modifiers) == null ? void 0 : u.total) ?? 0);
  if (s.length) {
    const A = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((M) => M.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${s.map((M) => `${M.label} ${Da(M.value)}`).join(", ")} (Total ${Da(i)})`,
      title: (A == null ? void 0 : A.tooltip) ?? ""
    });
  }
  const r = (t == null ? void 0 : t.edge) ?? null, n = Array.isArray((m = t == null ? void 0 : t.roll) == null ? void 0 : m.failureDiceRefs) ? t.roll.failureDiceRefs : [], l = !!((d = r == null ? void 0 : r.availableActions) != null && d.canPostRerollFailures), o = Array.isArray((h = r == null ? void 0 : r.allowed) == null ? void 0 : h.postPools) ? r.allowed.postPools : [];
  if (r != null && r.domain && (e.edge = {
    domain: r.domain,
    earned: ((p = t == null ? void 0 : t.outcomeModel) == null ? void 0 : p.edgeEarned) ?? null,
    preSpent: Number(((b = r == null ? void 0 : r.pre) == null ? void 0 : b.spent) ?? 0),
    postSpent: Number(((y = r == null ? void 0 : r.post) == null ? void 0 : y.spent) ?? 0),
    canPost: l && n.length > 0 && o.length > 0,
    failureCount: n.length,
    postPools: o
  }, e.metaRows.push({
    text: `Edge: ${r.domain} • pre ${e.edge.preSpent} • post ${e.edge.postSpent}`,
    title: ""
  })), (f = e.edge) != null && f.canPost) {
    e.footerRows.push({
      text: `Post-spend: Reroll ${e.edge.failureCount} failure${e.edge.failureCount === 1 ? "" : "s"}`
    });
    for (const A of e.edge.postPools)
      e.actions.push({
        action: "edgePostReroll",
        label: `Spend ${A}`,
        dataset: { "pool-key": A },
        cssClass: "mwd-edge-post"
      });
  }
}
function Da(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function Bl(a, e) {
  var c;
  const t = a ?? {}, s = (t == null ? void 0 : t.outcomeModel) ?? {}, i = (s == null ? void 0 : s.net) ?? null;
  if (!i) return;
  e.net = i;
  const r = Number((i == null ? void 0 : i.converted) ?? 0), n = Number((i == null ? void 0 : i.value) ?? 0), l = Number((i == null ? void 0 : i.rate) ?? 4);
  e.metaRows.push({
    text: `Net: ${n} • Converted: ${r} • Rate: ${l}`,
    title: ""
  });
  const o = ((c = s == null ? void 0 : s.edgeEarned) == null ? void 0 : c.amount) > 0 ? s.edgeEarned : null;
  o && e.footerRows.push({
    text: `Edge Earned: +${o.amount}${o.pool ? ` (${o.pool})` : ""}`,
    title: o.reason ?? ""
  });
}
function Hl(a, e) {
  var o, c, u, m;
  const t = a ?? {}, s = (t == null ? void 0 : t.outcomeModel) ?? {}, i = Number(((o = s == null ? void 0 : s.attacker) == null ? void 0 : o.successes) ?? (s == null ? void 0 : s.attackerHits) ?? NaN), r = Number(((c = s == null ? void 0 : s.defender) == null ? void 0 : c.successes) ?? (s == null ? void 0 : s.defenderHits) ?? NaN), n = Number((s == null ? void 0 : s.netHits) ?? (s == null ? void 0 : s.net) ?? NaN);
  Number.isFinite(i) && Number.isFinite(r) && e.metaRows.push({ text: `Opposed: Att ${i} vs Def ${r} • Net ${Number.isFinite(n) ? n : i - r}` }), (u = t == null ? void 0 : t.incoming) != null && u.label && (e.incoming = { label: t.incoming.label, value: t.incoming.value ?? "" }, e.footerRows.push({ text: `Incoming: ${e.incoming.label} ${e.incoming.value}` }));
  const l = ((m = s == null ? void 0 : s.edgeEarned) == null ? void 0 : m.amount) > 0 ? s.edgeEarned : null;
  l && e.footerRows.push({ text: `Edge Earned: +${l.amount}${l.pool ? ` (${l.pool})` : ""}` });
}
function Wl(a, e) {
  var c;
  const t = a ?? {}, s = (t == null ? void 0 : t.outcomeModel) ?? {}, i = (s == null ? void 0 : s.extended) ?? null;
  if (!i) return;
  e.extended = i;
  const r = Number((i == null ? void 0 : i.progress) ?? 0), n = Number((i == null ? void 0 : i.target) ?? 0), l = Number((i == null ? void 0 : i.remaining) ?? Math.max(0, n - r));
  e.metaRows.push({
    text: `Extended: ${r}/${n} (Remaining ${l})`,
    title: ""
  }), i != null && i.completed && e.footerRows.push({ text: `Completed in ${Number((i == null ? void 0 : i.rounds) ?? (i == null ? void 0 : i.attempts) ?? 0) || "?"} attempts.` });
  const o = ((c = s == null ? void 0 : s.edgeEarned) == null ? void 0 : c.amount) > 0 ? s.edgeEarned : null;
  o && e.footerRows.push({ text: `Edge Earned: +${o.amount}${o.pool ? ` (${o.pool})` : ""}` });
}
const Fl = {
  skill: xl,
  net: Bl,
  opposed: Hl,
  extended: Wl
  // defense: enhanceDefense,
  // edge: enhanceEdge,
};
async function Or({ resolved: a } = {}) {
  const e = a ?? {}, t = zl(e), s = Fl[t.intent];
  return typeof s == "function" && s(e, t), await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-roll-card",
    t
  );
}
function zl(a) {
  var h, p, b, y, f, A, M, k, P, W, I;
  const e = a ?? {}, t = Number(((h = e == null ? void 0 : e.roll) == null ? void 0 : h.target) ?? 5), s = Number(((b = (p = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : p.difficulty) == null ? void 0 : b.dn) ?? 0), i = Number(((y = e == null ? void 0 : e.roll) == null ? void 0 : y.pool) ?? 0), r = Number(((f = e == null ? void 0 : e.outcome) == null ? void 0 : f.hits) ?? 0), n = (e == null ? void 0 : e.outcomeModel) ?? {}, l = typeof n.passed == "boolean" ? n.passed : r >= s, o = Number.isFinite(Number(n.margin)) ? Number(n.margin) : r - s, c = n.tier ?? null, u = Array.isArray(e == null ? void 0 : e.breakdownRows) ? e.breakdownRows.map((z) => `${z.label}: ${z.value}`).join(`
`) : "", m = {
    header: { left: (e == null ? void 0 : e.title) ?? "Roll", right: (e == null ? void 0 : e.subtitle) ?? "" },
    intent: (e == null ? void 0 : e.intent) ?? "unknown",
    domains: Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [],
    tn: t,
    dn: s,
    pool: i,
    hits: r,
    passed: l,
    margin: o,
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
  }, d = (e == null ? void 0 : e.attack) ?? null;
  if ((A = e == null ? void 0 : e.specialization) != null && A.label && m.metaRows.push({
    text: `Specialization: ${e.specialization.label} (+${Number(e.specialization.value ?? 0)})`,
    title: ""
  }), (M = d == null ? void 0 : d.weapon) != null && M.name) {
    const z = String((d == null ? void 0 : d.rangeBand) ?? "").trim(), Y = String(((k = d == null ? void 0 : d.weapon) == null ? void 0 : k.damageTypeLabel) ?? ((P = d == null ? void 0 : d.weapon) == null ? void 0 : P.damageType) ?? "").trim(), K = String((d == null ? void 0 : d.ammoLabel) ?? ((W = d == null ? void 0 : d.weapon) == null ? void 0 : W.ammoLabel) ?? "").trim();
    m.metaRows.push({
      text: `Weapon: ${d.weapon.name}${z ? ` • Range: ${z}` : ""}${Y ? ` • Type: ${Y}` : ""}${K ? ` • Ammo: ${K}` : ""}`,
      title: ""
    }), (I = d == null ? void 0 : d.ammo) != null && I.isTracked && m.footerRows.push({
      text: `Ammo: ${Number(d.ammo.current ?? 0)}/${Number(d.ammo.max ?? 0)}`,
      title: ""
    });
  }
  return m;
}
function pe(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
function mi(a, e = 0, t = Number.POSITIVE_INFINITY) {
  const s = pe(a, e);
  return Math.max(e, Math.min(t, s));
}
function Ir(a, e = 1) {
  var s;
  const t = pe((s = a == null ? void 0 : a.difficulty) == null ? void 0 : s.dn, pe(e, 1));
  return Math.max(0, t);
}
function jl(a, e) {
  return Math.max(0, pe(a, 0) - pe(e, 0));
}
function Vl({ convert: a, remainder: e, rate: t = 4 } = {}) {
  const s = Math.max(0, pe(e, 0)), i = Math.max(1, pe(t, 4)), r = Math.max(0, pe(a, 0)), n = Math.floor(r / i) * i;
  return Math.min(s, n);
}
function Qi(a, { rate: e = 4, maxPerRoll: t = Number.POSITIVE_INFINITY } = {}) {
  const s = Math.max(1, pe(e, 4)), i = Math.floor(Math.max(0, pe(a, 0)) / s), r = Number.isFinite(t) ? Math.max(0, pe(t, 0)) : Number.POSITIVE_INFINITY;
  return { amount: Math.min(i, r), rate: s };
}
function Zi(a) {
  var s;
  const e = ((s = a == null ? void 0 : a.edge) == null ? void 0 : s.earn) ?? {};
  return {
    enabled: !!(e != null && e.enabled),
    rate: Math.max(1, pe(e == null ? void 0 : e.rate, 4)),
    maxPerRoll: (e == null ? void 0 : e.maxPerRoll) ?? Number.POSITIVE_INFINITY
  };
}
function Bs(a) {
  var t;
  const e = (t = a == null ? void 0 : a.edge) == null ? void 0 : t.pool;
  return e ? String(e) : null;
}
function Ul(a) {
  let e = 0, t = 0;
  const s = (i) => {
    if (!i) return;
    const r = i == null ? void 0 : i.results;
    if (Array.isArray(r))
      for (const l of r) {
        if ((l == null ? void 0 : l.active) === !1) continue;
        const o = Number(l == null ? void 0 : l.result);
        Number.isFinite(o) && (e += 1, o === 1 && (t += 1));
      }
    const n = i == null ? void 0 : i.terms;
    if (Array.isArray(n))
      for (const l of n) s(l);
    if (Array.isArray(i))
      for (const l of i) s(l);
  };
  return s(a), { dice: e, ones: t };
}
function _r(a, e) {
  if (pe(a, 0) !== 0) return !1;
  const { dice: t, ones: s } = Ul(e);
  return t <= 0 ? !1 : s >= Math.ceil(t / 2);
}
function Gl(a, e, t = 4) {
  return !!(a && pe(e, 0) >= pe(t, 4));
}
function Oa(a, e) {
  const t = pe(e == null ? void 0 : e.successes, 0), s = Ir(a, 1), i = t >= s, r = t - s, n = Gl(i, r, 4), l = _r(t, e == null ? void 0 : e.raw), o = Zi(a), c = o.maxPerRoll ?? 1, u = o.enabled && r >= o.rate ? (() => {
    const { amount: d, rate: h } = Qi(r, { rate: o.rate, maxPerRoll: c }), p = Bs(a);
    return d > 0 ? { amount: d, pool: p, reason: "net4", details: { margin: r, rate: h } } : null;
  })() : null;
  return {
    rollType: "simple",
    passed: i,
    successes: t,
    difficulty: { dn: s },
    margin: r,
    criticalSuccess: n,
    criticalFailure: l,
    tier: n ? "criticalSuccess" : l ? "criticalFailure" : i ? "success" : "failure",
    edgeEarned: u
  };
}
function ql(a, e, t) {
  var d, h;
  const s = pe(e == null ? void 0 : e.successes, 0), i = pe(t == null ? void 0 : t.successes, 0), r = !!((d = a == null ? void 0 : a.opposed) != null && d.net), n = String(((h = a == null ? void 0 : a.opposed) == null ? void 0 : h.dnTies) ?? "stalemate");
  let l = null, o = !1;
  r ? (l = s - i, l > 0 ? o = !0 : l < 0 ? o = !1 : n === "attackerWins" ? o = !0 : o = !1) : s > i ? o = !0 : s < i ? o = !1 : n === "attackerWins" ? o = !0 : o = !1;
  const c = Zi(a), u = c.maxPerRoll ?? 1, m = c.enabled && r && typeof l == "number" && l >= c.rate ? (() => {
    const { amount: p, rate: b } = Qi(l, { rate: c.rate, maxPerRoll: u }), y = Bs(a);
    return p > 0 ? { amount: p, pool: y, reason: "net4", details: { netHits: l, rate: b } } : null;
  })() : null;
  return {
    rollType: "opposed",
    passed: o,
    successes: s,
    opposed: {
      attacker: s,
      defender: i,
      netEnabled: r,
      netHits: r ? l : void 0,
      tiePolicy: n
    },
    edgeEarned: m
  };
}
function Kl(a, e) {
  var b, y, f;
  const t = pe(e == null ? void 0 : e.successes, 0), s = Ir(a, 1), i = t >= s, r = _r(t, e == null ? void 0 : e.raw), n = jl(t, s), l = ((b = a == null ? void 0 : a.net) == null ? void 0 : b.convert) ?? ((y = a == null ? void 0 : a.allocation) == null ? void 0 : y.convert) ?? 0, o = Zi(a), c = o.rate, u = Vl({ convert: l, remainder: n, rate: c }), m = n - u, d = o.enabled && u >= c ? (() => {
    const { amount: A } = Qi(u, { rate: c, maxPerRoll: o.maxPerRoll }), M = Bs(a);
    return A > 0 ? { amount: A, pool: M, reason: "convert4", details: { converted: u, rate: c } } : null;
  })() : null, h = r ? { amount: 1, pool: Bs(a), reason: "critFail", details: { onesRule: "halfOrMoreOnes" } } : null, p = [];
  return d && p.push(d), h && p.push(h), p.length === 0 || (p.length === 1 ? p[0] : (p.reduce((A, M) => A + (Number(M == null ? void 0 : M.amount) || 0), 0), (f = p[0]) == null || f.pool)), {
    rollType: "net",
    passed: i,
    successes: t,
    difficulty: { dn: s },
    criticalFailure: r,
    tier: r ? "criticalFailure" : i ? "success" : "failure",
    net: {
      remainder: n,
      convertRequested: pe(l, 0),
      converted: u,
      value: m,
      // the actual net effect magnitude you apply (+net dice, etc.)
      rate: c,
      canConvert: n >= c
    },
    edgeEarned: d
  };
}
function Yl(a, e) {
  var l, o, c, u;
  const t = pe(e == null ? void 0 : e.successes, 0), s = mi((l = a == null ? void 0 : a.extended) == null ? void 0 : l.target, 1, 1e4), i = mi((o = a == null ? void 0 : a.extended) == null ? void 0 : o.accumulated, 0, 1e4), r = mi(i + t, 0, 1e4), n = r >= s;
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
function Jl(a, e, t = null) {
  var i;
  switch (String((a == null ? void 0 : a.rollType) ?? "simple")) {
    case "simple":
      return Oa(a, e);
    case "opposed":
      return ql(a, e, t);
    case "net":
      return Kl(a, e);
    case "extended":
      return Yl(a, e);
    default: {
      const r = {
        ...a,
        difficulty: { dn: Number(((i = a == null ? void 0 : a.difficulty) == null ? void 0 : i.dn) ?? 1) || 1 }
      };
      return Oa(r, e);
    }
  }
}
const { ApplicationV2: Ql, HandlebarsApplicationMixin: Zl } = foundry.applications.api;
function Xl(a, e = -3, t = 3) {
  const s = [], i = "../img/dice";
  for (let r = e; r <= t; r++) {
    const n = Math.abs(r), l = n === 0 ? `${i}/BlankDice.webp` : `${i}/D6_${n}.svg`;
    s.push({
      value: r,
      abs: n,
      icon: l,
      active: r === a,
      neg: r < 0,
      pos: r > 0,
      zero: r === 0,
      title: r === 0 ? "0 (neutral)" : r < 0 ? `${r} penalty` : `+${r} bonus`
    });
  }
  return s;
}
function Ia(a) {
  return (Array.isArray(a) ? a : []).map((t) => ({
    id: (t == null ? void 0 : t.id) ?? foundry.utils.randomID(),
    label: typeof (t == null ? void 0 : t.label) == "string" ? t.label : "Manual",
    value: Number((t == null ? void 0 : t.value) ?? 0)
  }));
}
function di(a, e) {
  const t = a == null ? void 0 : a.toggles;
  return t && typeof t == "object" && e in t ? !!t[e] : !!(a != null && a[e]);
}
function ec(a, e) {
  a.useEdge = !!e.useEdge, a.takeRisks = !!e.takeRisks, a.opponentRoll = !!e.opponentRoll, a.toggles = a.toggles && typeof a.toggles == "object" ? a.toggles : {}, a.toggles.useEdge = !!e.useEdge, a.toggles.takeRisks = !!e.takeRisks, a.toggles.opponentRoll = !!e.opponentRoll;
}
function _a(a, e, t) {
  const s = String(t ?? "").trim(), i = s ? Rn(e, s) : "";
  if (s && i) {
    a.specializationKey = s, a.specializationLabel = i;
    return;
  }
  delete a.specializationKey, delete a.specializationLabel;
}
function tc(a) {
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
var $e;
const ge = class ge extends Zl(Ql) {
  constructor({ actor: t, baseContext: s, initialState: i = null, options: r = {} }) {
    var c, u;
    super(r);
    we(this, $e, null);
    /** @type {{ baseContext: any, state: any }} */
    R(this, "_mwd", { baseContext: null, state: null });
    this.actor = t, this._mwd.baseContext = s ?? {};
    const n = foundry.utils.deepClone(this._mwd.baseContext.payload ?? {}), l = Ia(n.manualModifiers);
    this._mwd.state = foundry.utils.mergeObject(
      {
        payload: n,
        manual: l,
        toggles: {
          useEdge: di(n, "useEdge"),
          takeRisks: di(n, "takeRisks"),
          opponentRoll: di(n, "opponentRoll")
        }
      },
      i ?? {},
      { inplace: !1, insertKeys: !0, insertValues: !0, overwrite: !0 }
    );
    const o = String(((u = (c = n == null ? void 0 : n.edge) == null ? void 0 : c.pre) == null ? void 0 : u.poolKey) ?? "").trim() || null;
    this._mwd.state.edge = {
      prePoolKey: o
    };
  }
  async wait() {
    return new Promise((t) => {
      Re(this, $e, t), this.render(!0);
    });
  }
  async close(t = {}) {
    if (F(this, $e)) {
      const s = F(this, $e);
      Re(this, $e, null), s(null);
    }
    return super.close(t);
  }
  /* --------------------------- */
  /* Prepare Context             */
  /* --------------------------- */
  async _prepareContext(t) {
    var z, Y, K, ee, O, ie, le, ae, me, Be, He, ot, lt, ct, ut, mt, dt, pt, ht, ft, gt, yt, bt, wt, At, Tt, T, C, V, te, ce, ke, Se, ve, _;
    const s = this._mwd.baseContext ?? {}, i = this._mwd.state ?? {}, r = Number.isFinite(Number((z = i == null ? void 0 : i.payload) == null ? void 0 : z.dn)) ? Number(i.payload.dn) : Number.isFinite(Number(s == null ? void 0 : s.dn)) ? Number(s.dn) : Number.isFinite(Number((K = (Y = s == null ? void 0 : s.resolved) == null ? void 0 : Y.difficulty) == null ? void 0 : K.dn)) ? Number(s.resolved.difficulty.dn) : 1, n = (s == null ? void 0 : s.intent) ?? "skill";
    let l, o;
    const c = Array.isArray(i.manual) ? i.manual.reduce((D, re) => D + Number((re == null ? void 0 : re.value) || 0), 0) : 0;
    if (n === "edge") {
      const D = (s == null ? void 0 : s.resolved) ?? {}, re = Array.isArray(D.breakdown) ? D.breakdown : [], be = (qe) => {
        var Jt;
        return Number(((Jt = re.find((ys) => ys.id === qe)) == null ? void 0 : Jt.value) ?? 0);
      }, Ee = Number(((ee = D == null ? void 0 : D.pool) == null ? void 0 : ee.attribute) ?? 0);
      l = {
        pool: Ee,
        rating: be("rating"),
        cap: be("cap"),
        modifiers: Number(((O = s == null ? void 0 : s.dice) == null ? void 0 : O.modifiers) ?? 0)
      }, o = Math.max(0, Ee + l.modifiers + c);
    } else {
      l = {
        attribute: Number(((ie = s == null ? void 0 : s.dice) == null ? void 0 : ie.attribute) ?? 0),
        skill: Number(((le = s == null ? void 0 : s.dice) == null ? void 0 : le.skill) ?? 0),
        bonus: Number(((ae = s == null ? void 0 : s.dice) == null ? void 0 : ae.bonus) ?? 0),
        specialization: Number(((me = s == null ? void 0 : s.dice) == null ? void 0 : me.specialization) ?? 0),
        modifiers: Number(((Be = s == null ? void 0 : s.dice) == null ? void 0 : Be.modifiers) ?? 0)
      };
      const D = l.modifiers + c, re = l.attribute + l.skill + l.bonus + l.specialization;
      o = Math.max(0, re + D);
    }
    const u = Array.isArray((He = s == null ? void 0 : s.resolved) == null ? void 0 : He.domains) ? s.resolved.domains : [], m = u.includes("physical") ? "physical" : u.includes("mental") ? "mental" : u.includes("social") ? "social" : null, h = (m === "physical" ? ["grit", "chaos"] : m === "mental" ? ["insight", "rumor"] : m === "social" ? ["legend", "credibility"] : []).map((D) => {
      var re, be, Ee, qe;
      return {
        key: D,
        label: D.charAt(0).toUpperCase() + D.slice(1),
        available: Number(((Ee = (be = (re = this.actor) == null ? void 0 : re.getEdgePool) == null ? void 0 : be.call(re, D)) == null ? void 0 : Ee.effectiveValue) ?? 0),
        selected: D === (((qe = i.edge) == null ? void 0 : qe.prePoolKey) ?? null)
      };
    }), p = h.find((D) => D.selected), b = (p == null ? void 0 : p.label) ?? null, y = ((ot = s == null ? void 0 : s.resolved) == null ? void 0 : ot.attack) ?? null, f = String(
      ((lt = y == null ? void 0 : y.skill) == null ? void 0 : lt.code) ?? ((ut = (ct = s == null ? void 0 : s.resolved) == null ? void 0 : ct.specialization) == null ? void 0 : ut.skillKey) ?? ((dt = (mt = s == null ? void 0 : s.resolved) == null ? void 0 : mt.data) == null ? void 0 : dt.skillKey) ?? ((pt = s == null ? void 0 : s.payload) == null ? void 0 : pt.key) ?? ""
    ).trim(), A = f ? ir(((ht = this.actor) == null ? void 0 : ht.system) ?? {}, f) : [], M = String(((ft = i == null ? void 0 : i.payload) == null ? void 0 : ft.specializationKey) ?? "").trim(), k = A.find((D) => D.key === M) ?? null;
    if (n !== "edge") {
      l.specialization = k ? Number(((yt = (gt = s == null ? void 0 : s.resolved) == null ? void 0 : gt.specialization) == null ? void 0 : yt.value) ?? 2) : 0;
      const D = l.modifiers + c, re = l.attribute + l.skill + l.bonus + l.specialization;
      o = Math.max(0, re + D);
    }
    const P = Array.isArray((wt = (bt = y == null ? void 0 : y.weapon) == null ? void 0 : bt.ammoState) == null ? void 0 : wt.types) ? y.weapon.ammoState.types : [], W = String(((At = i == null ? void 0 : i.payload) == null ? void 0 : At.ammoTypeId) ?? ((T = (Tt = y == null ? void 0 : y.weapon) == null ? void 0 : Tt.ammoState) == null ? void 0 : T.activeTypeId) ?? "").trim(), I = P.find((D) => D.id === W) ?? null;
    return {
      header: {
        left: ((C = s == null ? void 0 : s.header) == null ? void 0 : C.left) ?? "Roll",
        right: ((V = s == null ? void 0 : s.header) == null ? void 0 : V.right) ?? ((te = this.actor) == null ? void 0 : te.name) ?? ""
      },
      dice: l,
      modifiers: Array.isArray(s.modifiers) ? s.modifiers : [],
      manual: (i.manual ?? []).map((D) => ({
        ...D,
        steps: Xl(Number(D.value ?? 0), -3, 3)
      })),
      edge: {
        domain: m,
        choices: h,
        selectedLabel: b
      },
      toggles: n === "edge" ? { useEdge: !1, takeRisks: !1, opponentRoll: !1 } : i.toggles,
      totalPool: o,
      intent: n,
      dn: r,
      specialization: A.length ? {
        skillCode: f,
        options: A.map((D) => ({
          key: D.key,
          label: D.label,
          selected: D.key === M
        })),
        selectedKey: M,
        selectedLabel: (k == null ? void 0 : k.label) ?? ""
      } : null,
      attack: y ? {
        weaponName: ((ce = y == null ? void 0 : y.weapon) == null ? void 0 : ce.name) ?? "Weapon",
        rangeBand: (y == null ? void 0 : y.rangeBand) ?? "",
        damageType: (I == null ? void 0 : I.damageType) || ((ke = y == null ? void 0 : y.weapon) == null ? void 0 : ke.damageTypeLabel) || ((Se = y == null ? void 0 : y.weapon) == null ? void 0 : Se.damageType) || "",
        ammo: ((ve = y == null ? void 0 : y.weapon) == null ? void 0 : ve.ammoState) ?? null,
        ammoTypes: P.map((D) => ({
          id: D.id,
          name: D.name,
          damageType: D.damageType,
          selected: D.id === W
        })),
        selectedAmmoTypeId: W,
        selectedAmmoLabel: (I == null ? void 0 : I.name) ?? ((_ = y == null ? void 0 : y.weapon) == null ? void 0 : _.ammoLabel) ?? ""
      } : null
    };
  }
  /* --------------------------- */
  /* Actions                     */
  /* --------------------------- */
  async _onCancel(t) {
    if (t == null || t.preventDefault(), F(this, $e)) {
      const s = F(this, $e);
      Re(this, $e, null), s(null);
    }
    return this.close();
  }
  async _onSubmit(t) {
    var i, r, n, l, o, c, u, m, d, h, p, b, y;
    t == null || t.preventDefault();
    const s = this._mwd.state;
    if (s.payload.manualModifiers = (s.manual ?? []).filter((f) => {
      var A;
      return f && (((A = f.label) == null ? void 0 : A.trim()) || Number(f.value));
    }).map((f) => {
      var A;
      return {
        id: f.id,
        label: ((A = f.label) == null ? void 0 : A.trim()) || "Manual",
        value: Number(f.value ?? 0)
      };
    }), ec(s.payload, s.toggles ?? {}), _a(
      s.payload,
      ((i = s.payload) == null ? void 0 : i.intent) === "attack" ? ((r = s.payload) == null ? void 0 : r.skillKey) ?? ((c = (o = (l = (n = this._mwd.baseContext) == null ? void 0 : n.resolved) == null ? void 0 : l.attack) == null ? void 0 : o.skill) == null ? void 0 : c.code) : ((u = s.payload) == null ? void 0 : u.key) ?? ((h = (d = (m = this._mwd.baseContext) == null ? void 0 : m.resolved) == null ? void 0 : d.data) == null ? void 0 : h.skillKey),
      (p = s.payload) == null ? void 0 : p.specializationKey
    ), F(this, $e)) {
      const f = F(this, $e);
      Re(this, $e, null), f({ payload: s.payload });
    }
    if (s.payload.edge = s.payload.edge && typeof s.payload.edge == "object" ? s.payload.edge : {}, s.payload.edge.pre = s.payload.edge.pre && typeof s.payload.edge.pre == "object" ? s.payload.edge.pre : {}, (b = s.toggles) != null && b.useEdge) {
      const f = String(((y = s.edge) == null ? void 0 : y.prePoolKey) ?? "").trim() || null;
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
    var l, o;
    t == null || t.preventDefault();
    const i = (l = s == null ? void 0 : s.dataset) == null ? void 0 : l.id, r = (o = s == null ? void 0 : s.dataset) == null ? void 0 : o.field;
    if (!i || !r) return;
    const n = this._mwd.state.manual.find((c) => c.id === i);
    if (n)
      return r === "label" && (n.label = String(s.value ?? "")), r === "value" && (n.value = Number(s.value ?? 0)), this.render(!1);
  }
  async _onSetManualStepper(t, s) {
    var l, o;
    t == null || t.preventDefault();
    const i = (l = s == null ? void 0 : s.dataset) == null ? void 0 : l.id, r = Number((o = s == null ? void 0 : s.dataset) == null ? void 0 : o.value);
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
  async _onSetAmmoType(t, s) {
    return t == null || t.preventDefault(), this._mwd.state.payload.ammoTypeId = String((s == null ? void 0 : s.value) ?? "").trim(), this.render(!1);
  }
  async _onSetSpecialization(t, s) {
    var n;
    t == null || t.preventDefault();
    const i = String(((n = s == null ? void 0 : s.dataset) == null ? void 0 : n.skillCode) ?? "").trim(), r = String((s == null ? void 0 : s.value) ?? "").trim();
    if (i)
      return _a(this._mwd.state.payload, i, r), this.render(!1);
  }
  _onRender(t, s) {
    var r, n;
    (r = super._onRender) == null || r.call(this, t, s);
    const i = this.element instanceof HTMLElement ? this.element : (n = this.element) == null ? void 0 : n[0];
    i && (i.querySelectorAll("[data-action='setAmmoType']").forEach((l) => {
      l.addEventListener("change", (o) => {
        this._onSetAmmoType(o, o.currentTarget);
      });
    }), i.querySelectorAll("[data-action='setSpecialization']").forEach((l) => {
      l.addEventListener("change", (o) => {
        this._onSetSpecialization(o, o.currentTarget);
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
  static async prompt({ actor: t, basePayload: s, resolved: i, diceParts: r = null, mods: n = [], modTotal: l = 0 } = {}) {
    var b;
    const o = foundry.utils.deepClone(s ?? {});
    try {
      if (((i == null ? void 0 : i.rollType) ?? "simple") === "simple" && (o == null ? void 0 : o.dn) == null) {
        const f = Number(game.settings.get(game.system.id, "gmNextDn"));
        Number.isFinite(f) && (o.dn = Math.max(0, Math.trunc(f)));
      }
    } catch (y) {
      console.warn("MWD: failed to default DN from GM Gadget", y);
    }
    const c = {
      left: (i == null ? void 0 : i.title) ?? "Roll",
      right: (t == null ? void 0 : t.name) ?? ""
    }, u = r ?? tc(i), m = {
      attribute: Number((u == null ? void 0 : u.attribute) ?? 0),
      skill: Number((u == null ? void 0 : u.skill) ?? 0),
      bonus: Number((u == null ? void 0 : u.bonus) ?? 0),
      specialization: Number((u == null ? void 0 : u.specialization) ?? 0),
      modifiers: Number(l ?? 0)
    }, d = (Array.isArray(n) ? n : []).map((y) => ({
      label: y.label ?? "Modifier",
      source: y.source ?? "",
      value: Number(y.value ?? 0)
    }));
    o.manualModifiers = Ia(o.manualModifiers);
    const p = await new ge({
      actor: t,
      baseContext: {
        intent: (i == null ? void 0 : i.intent) ?? "skill",
        header: c,
        dice: m,
        modifiers: d,
        payload: o,
        resolved: i,
        // keep full resolved for edge display
        dn: Number((o == null ? void 0 : o.dn) ?? ((b = i == null ? void 0 : i.difficulty) == null ? void 0 : b.dn) ?? 1)
      }
    }).wait();
    return (p == null ? void 0 : p.payload) ?? null;
  }
};
$e = new WeakMap(), R(ge, "DEFAULT_OPTIONS", foundry.utils.mergeObject(
  Lt(ge, ge, "DEFAULT_OPTIONS"),
  {
    id: "mwd-roll-dialog",
    classes: [
      ...Lt(ge, ge, "DEFAULT_OPTIONS").classes ?? [],
      "mwd",
      "mwd-roll-dialog"
    ],
    window: { title: "Roll", resizable: !1 },
    position: { width: 520, height: "auto" },
    actions: {
      submit: ge.prototype._onSubmit,
      cancel: ge.prototype._onCancel,
      addManual: ge.prototype._onAddManual,
      removeManual: ge.prototype._onRemoveManual,
      setManualValue: ge.prototype._onSetManualValue,
      setManualStepper: ge.prototype._onSetManualStepper,
      setEdgePrePool: ge.prototype._onSetEdgePrePool,
      toggleCheckbox: ge.prototype._onToggleCheckbox,
      setDn: ge.prototype._onSetDn,
      setAmmoType: ge.prototype._onSetAmmoType,
      setSpecialization: ge.prototype._onSetSpecialization
    }
  },
  { inplace: !1 }
)), R(ge, "PARTS", {
  body: { template: "systems/mwd/templates/v2/roll/mwd-roll-dialog.hbs" }
});
let Bi = ge;
const { ApplicationV2: sc, HandlebarsApplicationMixin: ic } = foundry.applications.api, cs = class cs extends ic(sc) {
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
      classes: [game.system.anarchy.styles.selectCssClass(), ...cs.DEFAULT_OPTIONS.classes],
      window: { title: e }
    };
    return new cs({ items: t }, s).wait();
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
R(cs, "PARTS", {
  body: {
    template: `${B}/dialog/select-item.hbs`
  }
});
let Hi = cs;
const $a = { execute: cc }, ac = {
  physical: ["grit", "chaos"],
  mental: ["insight", "rumor"],
  social: ["legend", "credibility"]
};
function rc(a, e) {
  var r;
  const t = ac[e] ?? [];
  let s = null, i = -1;
  for (const n of t) {
    const l = (r = a.getEdgePool) == null ? void 0 : r.call(a, n), o = Number((l == null ? void 0 : l.rating) ?? 0), c = Number((l == null ? void 0 : l.value) ?? 0), u = Math.max(0, o - c);
    u > i && (i = u, s = n);
  }
  return s ?? t[0] ?? null;
}
function nc(a) {
  const t = (Array.isArray(a == null ? void 0 : a.manualModifiers) ? a.manualModifiers : []).map((i) => ({
    id: i.id ?? foundry.utils.randomID(),
    label: (i.label ?? "Manual").trim() || "Manual",
    value: Number(i.value ?? 0),
    source: "Manual"
  })).filter((i) => Number.isFinite(i.value) && i.value !== 0), s = t.reduce((i, r) => i + r.value, 0);
  return { mods: t, total: s };
}
function La(a = {}) {
  const e = a.toggles ?? {};
  return {
    ...a,
    toggles: {
      useEdge: !!e.useEdge,
      takeRisks: !!e.takeRisks,
      opponentRoll: !!e.opponentRoll
    },
    manualModifiers: lc(a.manualModifiers)
  };
}
async function oc({ actor: a, payload: e } = {}) {
  var r, n, l, o, c, u, m, d, h, p, b, y;
  if ((e == null ? void 0 : e.intent) !== "attack") return e;
  const t = foundry.utils.deepClone(e ?? {}), s = ((r = a.getPersonalCombatLoadout) == null ? void 0 : r.call(a, { refresh: !0 })) ?? null, i = (f) => {
    var M, k, P, W, I;
    const A = ((k = (M = a.items) == null ? void 0 : M.get) == null ? void 0 : k.call(M, f)) ?? null;
    return !A || !(((P = A.isPersonalWeapon) == null ? void 0 : P.call(A)) ?? A.type === g.itemType.personalWeapon) || !((W = A.system) != null && W.equipped) ? null : ((I = A.getCombatProfile) == null ? void 0 : I.call(A, { ammoTypeId: t == null ? void 0 : t.ammoTypeId })) ?? null;
  };
  if (t.weaponId) {
    const f = i(t.weaponId);
    if (!f)
      throw new Error("Attack requires an owned equipped personal weapon.");
    return t.rangeBand = t.rangeBand ?? f.defaultRangeBand ?? "close", t.ammoTypeId = t.ammoTypeId ?? ((n = f == null ? void 0 : f.ammoState) == null ? void 0 : n.activeTypeId) ?? "", t;
  }
  if (t.mode === "auto") {
    if (s != null && s.weaponChoiceRequired) {
      const f = await Hi.selectItem(
        "Choose Weapon",
        s.equippedWeapons ?? []
      );
      return f ? (t.weaponId = f.id, t.rangeBand = t.rangeBand ?? f.defaultRangeBand ?? "close", t.ammoTypeId = t.ammoTypeId ?? ((l = f == null ? void 0 : f.ammoState) == null ? void 0 : l.activeTypeId) ?? "", delete t.mode, t) : null;
    }
    if ((o = s == null ? void 0 : s.defaultWeapon) != null && o.isSynthetic || ((c = s == null ? void 0 : s.defaultWeapon) == null ? void 0 : c.id) === "unarmed")
      return t.syntheticWeapon = foundry.utils.deepClone(s.defaultWeapon ?? Ue.DEFAULT_UNARMED), t.weaponId = t.syntheticWeapon.id, t.rangeBand = t.rangeBand ?? "close", t.ammoTypeId = t.ammoTypeId ?? ((m = (u = t.syntheticWeapon) == null ? void 0 : u.ammoState) == null ? void 0 : m.activeTypeId) ?? "", delete t.mode, t;
    if ((d = s == null ? void 0 : s.defaultWeapon) != null && d.id)
      return t.weaponId = s.defaultWeapon.id, t.rangeBand = t.rangeBand ?? s.defaultWeapon.defaultRangeBand ?? "close", t.ammoTypeId = t.ammoTypeId ?? ((p = (h = s.defaultWeapon) == null ? void 0 : h.ammoState) == null ? void 0 : p.activeTypeId) ?? "", delete t.mode, t;
  }
  if (t.fallback === "unarmed")
    return t.syntheticWeapon = foundry.utils.deepClone(Ue.DEFAULT_UNARMED), t.weaponId = t.syntheticWeapon.id, t.rangeBand = t.rangeBand ?? "close", t.ammoTypeId = t.ammoTypeId ?? ((y = (b = t.syntheticWeapon) == null ? void 0 : b.ammoState) == null ? void 0 : y.activeTypeId) ?? "", delete t.mode, t;
  throw new Error("Attack could not resolve a usable weapon.");
}
function lc(a) {
  return Array.isArray(a) ? a.map((e) => ({
    id: (e == null ? void 0 : e.id) ?? foundry.utils.randomID(),
    label: typeof (e == null ? void 0 : e.label) == "string" ? e.label : "Manual",
    value: Number((e == null ? void 0 : e.value) ?? 0)
  })) : [];
}
async function cc({ actor: a, payload: e, event: t } = {}) {
  var z, Y, K, ee, O, ie, le, ae, me, Be, He, ot, lt, ct, ut, mt, dt, pt, ht, ft, gt, yt, bt, wt, At, Tt, T, C, V, te, ce, ke, Se, ve;
  if (a != null && a.actor && (a = a.actor), (z = a == null ? void 0 : a.document) != null && z.actor && (a = a.document.actor), !a) throw new Error("MWD.roll.execute requires actor");
  if (!(e != null && e.intent)) throw new Error("MWD.roll.execute requires payload.intent");
  if (e = La(e), e = await oc({ actor: a, payload: e }), !e) return null;
  let s = await Ca({ actor: a, payload: e, event: t }), i = await Na({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: s.domains,
    payload: e,
    resolved: s,
    context: { event: t }
  });
  const r = await Bi.prompt({
    actor: a,
    basePayload: e,
    resolved: s,
    diceParts: {
      attribute: ((Y = s == null ? void 0 : s.pool) == null ? void 0 : Y.attribute) ?? 0,
      skill: ((K = s == null ? void 0 : s.pool) == null ? void 0 : K.skill) ?? 0,
      bonus: ((ee = s == null ? void 0 : s.pool) == null ? void 0 : ee.bonus) ?? 0,
      specialization: ((O = s == null ? void 0 : s.pool) == null ? void 0 : O.specialization) ?? 0
    },
    mods: i.mods,
    modTotal: i.total,
    options: {
      allowEdge: e.intent !== "initiative"
    }
  });
  if (!r) return null;
  if (e = La(r), s = await Ca({ actor: a, payload: e, event: t }), e.intent === "attack" && e.weaponId) {
    const _ = ((le = (ie = a.items) == null ? void 0 : ie.get) == null ? void 0 : le.call(ie, e.weaponId)) ?? null;
    if ((ae = _ == null ? void 0 : _.isPersonalWeapon) != null && ae.call(_)) {
      const D = String(e.ammoTypeId ?? "").trim(), re = String(((Be = (me = _.system) == null ? void 0 : me.ammo) == null ? void 0 : Be.activeTypeId) ?? "").trim();
      if (D && D !== re && await ((He = _.setActiveAmmoType) == null ? void 0 : He.call(_, D)), !((ot = _.canConsumeAmmo) != null && ot.call(_, { ammoTypeId: D }))) {
        const be = (lt = _.getAmmoState) == null ? void 0 : lt.call(_, { ammoTypeId: D }), Ee = be != null && be.ammoLabel ? ` (${be.ammoLabel})` : "";
        return (ct = ui.notifications) == null || ct.warn(`Not enough ammo${Ee} for ${_.name}.`), null;
      }
    }
  }
  i = await Na({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: s.domains,
    payload: e,
    resolved: s,
    context: { event: t }
  });
  const { mods: n, total: l } = i, { mods: o, total: c } = nc(e), u = [...n, ...o], m = Number(l ?? 0) + Number(c ?? 0), d = Number(((ut = s == null ? void 0 : s.pool) == null ? void 0 : ut.attribute) ?? 0) + Number(((mt = s == null ? void 0 : s.pool) == null ? void 0 : mt.skill) ?? 0) + Number(((dt = s == null ? void 0 : s.pool) == null ? void 0 : dt.bonus) ?? 0) + Number(((pt = s == null ? void 0 : s.pool) == null ? void 0 : pt.specialization) ?? 0), h = Math.max(0, d + Number(m ?? 0)), p = e.intent !== "initiative", b = p ? uc({ actor: a, ctx: s, payload: e }) : null, y = (ht = b == null ? void 0 : b.pre) != null && ht.spent ? 4 : Number(s.diceTarget ?? s.target ?? 5);
  p && ((ft = b == null ? void 0 : b.pre) != null && ft.spent) && ((gt = b == null ? void 0 : b.pre) != null && gt.poolKey) && await ((yt = a.spendEdge) == null ? void 0 : yt.call(a, b.pre.poolKey, 1));
  let f, A = 0, M = 0;
  if (s.rollType === "sum" && ((bt = s.sum) != null && bt.formula))
    f = await new Roll(s.sum.formula, s.sum.data ?? {}).evaluate({ async: !0 }), A = Number(f.total ?? 0) + Number(m ?? 0);
  else {
    f = await new Roll(`${h}d6cs>=${y}`).evaluate({ async: !0 });
    const _ = (wt = f.dice) == null ? void 0 : wt[0];
    A = Array.isArray(_ == null ? void 0 : _.results) ? _.results.filter((D) => D.success).length : 0, M = Array.isArray(_ == null ? void 0 : _.results) ? _.results.filter((D) => D.result === 1).length : 0;
  }
  s.intent === "initiative" && (f == null ? void 0 : f.total) != null && await pc({ actor: a, total: f.total });
  const k = Jl(
    s,
    { successes: A, raw: (At = f == null ? void 0 : f.toJSON) == null ? void 0 : At.call(f) },
    null
    // opposed rolls can pass defender result later
  ), P = k == null ? void 0 : k.edgeEarned;
  if ((P == null ? void 0 : P.amount) > 0) {
    const _ = (Tt = s == null ? void 0 : s.domains) != null && Tt.includes("physical") ? "physical" : (T = s == null ? void 0 : s.domains) != null && T.includes("mental") ? "mental" : (C = s == null ? void 0 : s.domains) != null && C.includes("social") ? "social" : null, D = rc(a, _);
    await ((V = a.gainEdge) == null ? void 0 : V.call(a, D, P.amount)), k.edgeEarned.pool = D;
  }
  s.intent === "overload" && await hc({ actor: a, passed: k.passed });
  const W = _l({
    actor: a,
    payload: e,
    ctx: s,
    roll: f,
    target: y,
    pool: h,
    mods: u,
    modTotal: m,
    hits: A,
    ones: M,
    edge: b,
    outcomeModel: k
  }), I = await Or({ resolved: W });
  if (e.intent === "attack" && e.weaponId) {
    const _ = ((ce = (te = a.items) == null ? void 0 : te.get) == null ? void 0 : ce.call(te, e.weaponId)) ?? null;
    (ke = _ == null ? void 0 : _.isPersonalWeapon) != null && ke.call(_) && (await ((Se = _.consumeAmmo) == null ? void 0 : Se.call(_, { ammoTypeId: e.ammoTypeId })) || (ve = ui.notifications) == null || ve.warn(`Ammo could not be consumed for ${_.name}.`));
  }
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: a }),
    content: I,
    flags: {
      mwd: {
        payload: e,
        resolved: W
      }
    }
  });
}
function uc({ actor: a, ctx: e, payload: t }) {
  var p, b, y, f, A, M, k;
  const s = mc(e == null ? void 0 : e.domains), i = dc[s] ?? null, r = (i == null ? void 0 : i.a) ?? null, n = (i == null ? void 0 : i.b) ?? null, l = [r, n].filter(Boolean), o = !!((p = t == null ? void 0 : t.toggles) != null && p.useEdge) || !!(t != null && t.useEdge);
  let c = String(((y = (b = t == null ? void 0 : t.edge) == null ? void 0 : b.pre) == null ? void 0 : y.poolKey) ?? "").trim() || null;
  c && !l.includes(c) && (c = null);
  const u = o && c ? 1 : 0;
  let m = [...l];
  u && c && (m = m.filter((P) => P !== c));
  let d = String(((A = (f = t == null ? void 0 : t.edge) == null ? void 0 : f.post) == null ? void 0 : A.poolKey) ?? "").trim() || null;
  d && !m.includes(d) && (d = null);
  const h = Number(((k = (M = t == null ? void 0 : t.edge) == null ? void 0 : M.post) == null ? void 0 : k.spent) ?? 0) ? 1 : 0;
  return {
    domain: s,
    pools: i ? { a: r, b: n } : null,
    pre: { poolKey: c, spent: u },
    post: { poolKey: d, spent: h },
    allowed: { prePools: l, postPools: m }
  };
}
function mc(a) {
  return Array.isArray(a) ? a.includes("physical") ? "physical" : a.includes("mental") ? "mental" : a.includes("social") ? "social" : null : null;
}
const dc = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};
async function pc({ actor: a, total: e }) {
  var l, o, c, u, m;
  const t = (o = (l = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : l.controlled) == null ? void 0 : o.find((d) => {
    var h;
    return ((h = d.actor) == null ? void 0 : h.id) === a.id;
  }), s = ((u = (c = a.getActiveTokens) == null ? void 0 : c.call(a, !0, !0)) == null ? void 0 : u[0]) ?? null, i = t ?? s;
  if (!i) {
    (m = ui.notifications) == null || m.warn("Initiative requires a token on the current scene.");
    return;
  }
  let r = game.combat;
  r || (r = await Combat.create({
    scene: canvas.scene.id,
    active: !0
  }));
  let n = r.combatants.find((d) => d.tokenId === i.id);
  if (!n) {
    const d = await r.createEmbeddedDocuments("Combatant", [{
      tokenId: i.id,
      actorId: a.id,
      sceneId: canvas.scene.id
    }]);
    n = d == null ? void 0 : d[0];
  }
  n && await n.update({ initiative: Number(e) });
}
async function hc({ actor: a, passed: e }) {
  e || await a.update({ "system.burn.overloaded": !0 });
}
const fc = /* @__PURE__ */ new Set(["physical", "mental", "social"]);
function gc(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function yc(a) {
  if (!a) return;
  const e = String(a).trim().toLowerCase();
  return fc.has(e) ? e : void 0;
}
class bc {
  constructor() {
    R(this, "id", "mwd.itemModifiers");
    R(this, "label", "Item Modifiers");
  }
  collect(e) {
    var i, r;
    const t = e == null ? void 0 : e.actor;
    if (!t) return [];
    const s = [];
    for (const n of t.items) {
      const l = (r = (i = n.flags) == null ? void 0 : i.mwd) == null ? void 0 : r.modifiers;
      if (!(!Array.isArray(l) || l.length === 0))
        for (const o of l) {
          if (!o) continue;
          const c = gc(o.value);
          if (c === null) {
            console.warn("MWD | Dropping item modifier with invalid value", {
              actor: t.name,
              item: n.name,
              modifier: o
            });
            continue;
          }
          s.push({
            label: o.label ?? n.name,
            value: c,
            source: n.name,
            domain: yc(o.domain)
          });
        }
    }
    return s;
  }
}
const pi = {
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
class wc {
  constructor() {
    R(this, "id", "mwd.statusEffects");
    R(this, "label", "Status Effects");
  }
  collect({ actor: e } = {}) {
    var i;
    const t = e == null ? void 0 : e.statuses;
    if (!e || !t) return [];
    const s = [];
    for (const r of t) {
      const n = pi == null ? void 0 : pi[r];
      if ((i = n == null ? void 0 : n.mods) != null && i.length)
        for (const l of n.mods) {
          const o = Array.isArray(l.domains) ? l.domains : [], c = l.value;
          if (o.length)
            for (const u of o)
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
class Ac {
  constructor() {
    R(this, "id", "mwd.baseRollModifiers");
    R(this, "label", "Roll (Base)");
  }
  collect({ payload: e } = {}) {
    var n, l, o;
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
    const i = ((l = e == null ? void 0 : e.dialog) == null ? void 0 : l.otherMods) ?? ((o = e == null ? void 0 : e.modifiers) == null ? void 0 : o.otherMods) ?? (e == null ? void 0 : e.otherMods) ?? 0, r = Number(i);
    return Number.isFinite(r) && r !== 0 && t.push({
      id: "otherMods",
      label: "Other modifiers",
      value: r,
      source: "Roll"
    }), t;
  }
}
class Tc {
  constructor() {
    R(this, "id", "mwd.condition");
    R(this, "label", "Condition");
  }
  collect({ actor: e, rollType: t } = {}) {
    var l, o, c, u, m, d, h, p;
    if (!e) return [];
    if (t === "edge") return [];
    const s = ((l = e.system) == null ? void 0 : l.derived) ?? {}, i = Number(
      ((o = s == null ? void 0 : s.condition) == null ? void 0 : o.physicalPenalty) ?? ((u = (c = s == null ? void 0 : s.monitors) == null ? void 0 : c.physical) == null ? void 0 : u.penalty) ?? 0
    ), r = Number(
      ((m = s == null ? void 0 : s.condition) == null ? void 0 : m.fatiguePenalty) ?? ((h = (d = s == null ? void 0 : s.monitors) == null ? void 0 : d.fatigue) == null ? void 0 : h.penalty) ?? 0
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
    }), console.log("MWD|condition derived snapshot", e.name, foundry.utils.deepClone((p = e.system) == null ? void 0 : p.derived)), n;
  }
}
const Sc = {
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
function kc() {
  Hooks.on("renderChatMessageHTML", (a, e) => {
    e.addEventListener("click", (t) => {
      const s = t.target.closest("[data-mwd-action]");
      if (!s) return;
      const i = String(s.dataset.mwdAction || "").trim();
      i && i === "edgePostReroll" && Mc(t, a);
    });
  });
}
async function Mc(a, e) {
  var p, b, y, f, A, M, k, P, W, I, z, Y, K, ee, O, ie, le;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='edgePostReroll']"), s = String(((p = t == null ? void 0 : t.dataset) == null ? void 0 : p.poolKey) ?? "").trim();
  if (!s) return;
  const i = foundry.utils.deepClone((y = (b = e == null ? void 0 : e.flags) == null ? void 0 : b.mwd) == null ? void 0 : y.resolved);
  if (!i || Number(((A = (f = i == null ? void 0 : i.edge) == null ? void 0 : f.post) == null ? void 0 : A.spent) ?? 0) === 1) return;
  if (!(Array.isArray((k = (M = i == null ? void 0 : i.edge) == null ? void 0 : M.allowed) == null ? void 0 : k.postPools) ? i.edge.allowed.postPools : []).includes(s)) {
    (W = (P = ui.notifications) == null ? void 0 : P.warn) == null || W.call(P, `Post-spend pool not allowed: ${s}`);
    return;
  }
  const n = Array.isArray((I = i == null ? void 0 : i.roll) == null ? void 0 : I.failureDiceRefs) ? i.roll.failureDiceRefs : [];
  if (n.length <= 0) {
    (Y = (z = ui.notifications) == null ? void 0 : z.info) == null || Y.call(z, "No failures to reroll.");
    return;
  }
  const l = await fromUuid(i.actorUuid);
  if (!l) {
    (ee = (K = ui.notifications) == null ? void 0 : K.warn) == null || ee.call(K, "Actor not found for this roll.");
    return;
  }
  await ((O = l.spendEdge) == null ? void 0 : O.call(l, s, 1));
  const o = Number(((ie = i == null ? void 0 : i.roll) == null ? void 0 : ie.target) ?? 5), u = (le = (await new Roll(`${n.length}d6cs>=${o}`).evaluate()).dice) == null ? void 0 : le[0], m = Array.isArray(u == null ? void 0 : u.results) ? u.results : [], d = m.filter((ae) => ae.success).length;
  i.outcome = i.outcome ?? {}, i.outcome.hits = Number(i.outcome.hits ?? 0) + d, i.edge = i.edge ?? {}, i.edge.post = { poolKey: s, spent: 1 }, i.edge.availableActions = {
    ...i.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, i.roll = i.roll ?? {}, i.roll.diceGroups = Array.isArray(i.roll.diceGroups) ? i.roll.diceGroups : [], i.roll.diceGroups.push({
    id: "post",
    label: "Post Reroll",
    faces: 6,
    termIndex: null,
    dice: m.map((ae, me) => {
      const Be = Number(ae.result), He = !!ae.success;
      return {
        ref: `post:${me}`,
        face: Be,
        isSuccess: He,
        isFailure: !He,
        tooltip: He ? `Post die ${me + 1}: ${Be} (Success vs TN ${o})` : `Post die ${me + 1}: ${Be} (Failure vs TN ${o})`
      };
    })
  });
  const h = await Or({ resolved: i });
  await e.update({
    content: h,
    "flags.mwd.resolved": i,
    "flags.mwd.payload.edge.post": { poolKey: s, spent: 1 }
  });
}
function vc() {
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
function Ec() {
  return {
    get(a) {
      return at(a);
    },
    getSkills({ withKnowledge: a = !1 } = {}) {
      return _s();
    },
    list() {
      return _s();
    }
  };
}
class Xi {
  static start() {
    const e = new Xi();
    Hooks.once("init", () => e.onInit()), Hooks.once("ready", () => e.onReady());
  }
  async onInit() {
    console.log(Z + "AnarchySystem.onInit"), game.system.mwd = this, game.system.anarchy = this, game.mwd ?? (game.mwd = {}), vc(), kc(), Do("mwd"), game.mwd.roll = $a, game.mwd.personalCombat = de, game.mwd.harm = Qe, this.roll = $a, this.personalCombat = de, this.harm = Qe, this.skills = Ec(), this.remoteCall = new bi(), game.system.mwd.skills = this.skills, game.mwd.skills = this.skills, J.init(), this.modifiers = new G(), zt.register(new bc()), zt.register(new wc()), zt.register(new Ac()), zt.register(new Tc()), zt.register(Sc), Handlebars.registerHelper("mwdClassList", (e) => Array.isArray(e) ? e.join(" ") : typeof e == "string" ? e : ""), this.actorClasses = {
      character: Sa,
      npc: Sa,
      vehicle: cr,
      battlemech: wo
    }, this.hooks = new Ot(), this.styles = new Gn(), this.handlebarsManager = new Yi(), de.init(), Zo.register(), console.log(Z + "AnarchySystem.onInit | loading system"), CONFIG.ANARCHY = oe, CONFIG.Combat.initiative = { formula: "2d6" }, CONFIG.statusEffects.push({
      id: "overloaded",
      name: "Overloaded",
      icon: "systems/mwd/img/icons/status/surge.svg"
    }), CONFIG.Actor.documentClass = fl, CONFIG.Item.documentClass = ms, ms.init(), il(), ol(), await ul(), console.log(Z + "AnarchySystem.onInit | done");
  }
  async onReady() {
    if (console.log(Z + "AnarchySystem.onReady"), await de.onReady(), !game.user.isGM) return;
    const e = game.settings.get(S, "enableGMGadget");
    if (!e) {
      console.log(`${Z}GMManager render skipped (enableGMGadget=false)`);
      return;
    }
    game.mwd = game.mwd ?? {}, game.mwd.gmGadget = () => Oo({ systemId: S }).render({ force: !0 }), e && game.mwd.gmGadget();
  }
}
Xi.start();
//# sourceMappingURL=index.mjs.map
