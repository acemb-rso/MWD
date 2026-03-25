var Fi = Object.defineProperty;
var Gi = Object.getPrototypeOf;
var Ui = Reflect.get;
var Ds = (r) => {
  throw TypeError(r);
};
var Vi = (r, e, t) => e in r ? Fi(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var v = (r, e, t) => Vi(r, typeof e != "symbol" ? e + "" : e, t), Vt = (r, e, t) => e.has(r) || Ds("Cannot " + t);
var W = (r, e, t) => (Vt(r, e, "read from private field"), t ? t.call(r) : e.get(r)), fe = (r, e, t) => e.has(r) ? Ds("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), ye = (r, e, t, s) => (Vt(r, e, "write to private field"), s ? s.call(r, t) : e.set(r, t), t), _ = (r, e, t) => (Vt(r, e, "access private method"), t);
var st = (r, e, t) => Ui(Gi(r), t, e);
const se = {
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
    common: {
      inactive: "Inactive for actor"
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
}, b = se, S = "mwd", ji = "MechWarrior: Destiny", ts = `system.${S}`, qi = S, Et = `systems/${S}`, ri = `${Et}/style`, gt = `${Et}/third-party/style`, O = `systems/${S}/templates`, Ft = `${Et}/img/icons`, F = `${Ft}/skills`, Y = "MWD | ", zi = 2, Ki = 5, Yi = 4, ni = 8, ss = {
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
}, is = {
  autopilot: "autopilot",
  firewall: "firewall",
  knowledge: "knowledge"
}, ve = {
  grit: "grit",
  chaos: "chaos",
  insight: "insight",
  rumor: "rumor",
  legend: "legend",
  credibility: "credibility"
}, Ss = {
  physical: [ve.grit, ve.chaos],
  mental: [ve.insight, ve.rumor],
  social: [ve.legend, ve.credibility]
}, f = {
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
  actorAttributes: ss,
  itemAttributes: is,
  attributes: { ...ss, ...is },
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
    edgePools: ve,
    edgePoolGroups: Ss,
    physical: {
      grit: ve.grit,
      chaos: ve.chaos
    },
    mental: {
      insight: ve.insight,
      rumor: ve.rumor
    },
    social: {
      legend: ve.legend,
      credibility: ve.credibility
    },
    chaos: ve.chaos
  },
  area: {
    none: "none",
    shotgun: "shotgun",
    circle: "circle",
    cone: "cone",
    rect: "rect",
    ray: "ray"
  }
}, Qi = Object.freeze({
  physical: "physical",
  mental: "mental",
  social: "social"
});
Object.freeze(Object.values(Qi));
const lt = {
  [f.actorTypes.character]: [
    f.actorAttributes.strength,
    f.actorAttributes.reflexes,
    f.actorAttributes.willpower,
    f.actorAttributes.intelligence,
    f.actorAttributes.charisma,
    f.actorAttributes.edge
  ],
  [f.actorTypes.npc]: [
    f.actorAttributes.strength,
    f.actorAttributes.reflexes,
    f.actorAttributes.willpower,
    f.actorAttributes.intelligence,
    f.actorAttributes.charisma,
    f.actorAttributes.edge
  ],
  [f.actorTypes.vehicle]: [
    f.actorAttributes.handling,
    f.actorAttributes.system,
    f.actorAttributes.chassis,
    f.actorAttributes.condition
  ],
  [f.actorTypes.battlemech]: [
    f.actorAttributes.handling,
    f.actorAttributes.system,
    f.actorAttributes.chassis,
    f.actorAttributes.condition
  ]
}, jt = {
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
}, we = {
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
  SYSTEM_DESCRIPTION: ji,
  SYSTEM_SOCKET: ts,
  SYSTEM_SCOPE: qi,
  SYSTEM_PATH: Et,
  STYLE_PATH: ri,
  THIRD_PARTY_STYLE_PATH: gt,
  TEMPLATES_PATH: O,
  ICONS_PATH: Ft,
  ICONS_SKILLS_PATH: F,
  LOG_HEAD: Y,
  SPECIALIZATION_BONUS: zi,
  TARGET_SUCCESS: Ki,
  TARGET_SUCCESS_EDGE: Yi,
  BASE_MONITOR: ni,
  ACTOR_ATTRIBUTES: ss,
  ITEM_ATTRIBUTES: is,
  EDGE_POOL_GROUPS: Ss,
  TEMPLATE: f,
  ANARCHY_SYSTEM: we
};
const xe = class xe {
  static ascending(e = (t) => t) {
    return (t, s) => xe.sortingBy(e(t), e(s));
  }
  static descending(e = (t) => t) {
    return (t, s) => xe.sortingBy(e(s), e(t));
  }
  static sortingBy(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
  }
  static bySortedArray(e) {
    return (t) => e.indexOf(t);
  }
  static ascendingBySortedArray(e) {
    return xe.ascending(xe.bySortedArray(e));
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
    return e.map(t).filter((s) => s != null).reduce(xe.sum(), 0);
  }
  static divint(e, t) {
    return Math.floor(e / t);
  }
  static divup(e, t) {
    return Math.ceil(e / t);
  }
  static join(e, t = "") {
    return e.reduce(xe.joiner(t));
  }
  static joiner(e = "") {
    return (t, s) => t + e + s;
  }
  static classify(e, t = (s) => s.type) {
    let s = {};
    return xe.classifyInto(s, e, t), s;
  }
  static classifyFirst(e, t) {
    let s = {};
    for (const i of e) {
      const a = t(i);
      s[a] || (s[a] = i);
    }
    return s;
  }
  static classifyInto(e, t, s = (i) => i.type) {
    for (const i of t) {
      const a = s(i);
      let n = e[a];
      n || (n = [], e[a] = n), n.push(i);
    }
  }
  static showControlWhen(e, t) {
    t ? e.show() : e.hide();
  }
  static minmax(e, t, s) {
    return Math.max(t, Math.min(e, s));
  }
};
v(xe, "isString", (e) => typeof e == "string" || e instanceof String);
let B = xe;
const Ji = {
  keyword: "keywords",
  disposition: "dispositions",
  cue: "cues"
}, T = class T {
  /**
   * Initialize enum caches.
   * Call once during system init/setup after config/constants are available.
   */
  static init() {
    var t, s, i, a, n, o, l, c, u, d, m, p;
    T.hbsAttributes = T.mapObjectToKeyValue(b.attributes).filter((h) => h.value !== "knowledge" && h.value !== "noAttribute"), T.hbsItemTypes = T.mapObjectToKeyValue(b.itemType), T.hbsMonitors = T.mapObjectToKeyValue(b.monitor), T.hbsMonitorLetters = T.mapObjectToKeyValue(b.monitorLetter), T.hbsAssetModuleCategories = T.mapObjectToKeyValue(b.assetModuleCategory), (s = (t = b.item) == null ? void 0 : t.lifeModule) != null && s.type ? T.hbsLifeModuleTypes = T.mapObjectToKeyValue(b.item.lifeModule.type) : (console.warn("MWD | MWD.item.lifeModule.type is missing; life module enums disabled."), T.hbsLifeModuleTypes = []), T.hbsAreas = T.mapObjectToKeyValue(b.area), T.hbsRanges = T.mapObjectToKeyValue(b.range), T.hbsVehicleCategories = T.mapObjectToKeyValue(b.vehicleCategory), T.hbsMwdWeightClasses = T.mapObjectToKeyValue((i = b.mwd) == null ? void 0 : i.weightClass), T.hbsMwdHardpointTypes = T.mapObjectToKeyValue((a = b.mwd) == null ? void 0 : a.hardpointType), T.hbsMwdHardpointSizes = T.mapObjectToKeyValue((n = b.mwd) == null ? void 0 : n.hardpointSize), T.hbsMwdHardpointLocations = T.mapObjectToKeyValue((o = b.mwd) == null ? void 0 : o.hardpointLocation), T.hbsMwdPrimaryModes = T.mapObjectToKeyValue((l = b.mwd) == null ? void 0 : l.primarySlotMode), T.hbsMwdWeaponCategories = T.mapObjectToKeyValue((c = b.mwd) == null ? void 0 : c.weaponCategory), T.hbsMwdWeaponDamageTypes = T.mapObjectToKeyValue((u = b.mwd) == null ? void 0 : u.weaponDamageType), T.hbsPersonalWeaponDamageTypes = T.mapObjectToKeyValue((d = b.mwd) == null ? void 0 : d.personalDamageType), T.hbsPersonalWeaponDamageCategories = T.mapObjectToKeyValue((m = b.mwd) == null ? void 0 : m.personalDamageCategory), T.hbsMwdMeleeLocations = T.mapObjectToKeyValue((p = b.mwd) == null ? void 0 : p.meleeLocation), T.hbsDamageTypes = B.distinct(
      (T.hbsMwdWeaponDamageTypes ?? []).concat(T.hbsPersonalWeaponDamageTypes ?? []),
      (h) => h.value
    );
    const e = Object.values(lt).flat();
    T.sortedAttributeKeys = B.distinct(
      e.concat(Object.keys(b.attributes ?? {}))
    ), T.registerHandleBarHelpers(), T.ENUMS = T.getEnums();
  }
  static registerHandleBarHelpers() {
    typeof Handlebars > "u" || Handlebars.registerHelper("sortedAttributes", (e) => {
      if (!e || typeof e != "object") return [];
      const t = Object.keys(e), s = T.sortedAttributeKeys ?? [], i = new Map(s.map((a, n) => [a, n]));
      return t.sort((a, n) => {
        const o = i.has(a) ? i.get(a) : 9999, l = i.has(n) ? i.get(n) : 9999;
        return o !== l ? o - l : String(a).localeCompare(String(n));
      }), t.map((a) => {
        const n = e[a];
        return n && typeof n == "object" ? { key: a, ...n } : { key: a, value: n };
      });
    });
  }
  static getDamageTypes() {
    return T.hbsDamageTypes ?? [];
  }
  static getAttributes(e = () => !0) {
    return (T.hbsAttributes ?? []).filter((t) => e(t.value));
  }
  static getActorWordTypes() {
    return Ji;
  }
  static getMonitors() {
    return T.hbsMonitors ?? [];
  }
  /**
   * Returns a big blob of enums suitable for sheet contexts.
   * `withKnowledge` is passed through to the skills service.
   */
  static getEnums(e = () => !0, t = !1) {
    return {
      attributes: T.getAttributes(e),
      itemTypes: T.hbsItemTypes ?? [],
      monitors: T.hbsMonitors ?? [],
      monitorLetters: T.hbsMonitorLetters ?? [],
      assetModuleCategories: T.hbsAssetModuleCategories ?? [],
      lifeModuleTypes: T.hbsLifeModuleTypes ?? [],
      areas: T.hbsAreas ?? [],
      ranges: T.hbsRanges ?? [],
      vehicleCategories: T.hbsVehicleCategories ?? [],
      // Skills: now sourced from MWD namespace (with safe fallback)
      skills: T.getSkillsEnum({ withKnowledge: t }),
      // MWD enums
      mwdWeightClasses: T.hbsMwdWeightClasses ?? [],
      mwdHardpointTypes: T.hbsMwdHardpointTypes ?? [],
      mwdHardpointSizes: T.hbsMwdHardpointSizes ?? [],
      mwdHardpointLocations: T.hbsMwdHardpointLocations ?? [],
      mwdPrimaryModes: T.hbsMwdPrimaryModes ?? [],
      mwdWeaponCategories: T.hbsMwdWeaponCategories ?? [],
      mwdWeaponDamageTypes: T.hbsMwdWeaponDamageTypes ?? [],
      personalWeaponDamageTypes: T.hbsPersonalWeaponDamageTypes ?? [],
      personalWeaponDamageCategories: T.hbsPersonalWeaponDamageCategories ?? [],
      damageTypes: T.hbsDamageTypes ?? [],
      mwdMeleeLocations: T.hbsMwdMeleeLocations ?? []
    };
  }
  static getSkillsEnum({ withKnowledge: e = !1 } = {}) {
    var i, a, n, o, l;
    const t = ((a = (i = game == null ? void 0 : game.system) == null ? void 0 : i.mwd) == null ? void 0 : a.skills) ?? ((o = (n = game == null ? void 0 : game.system) == null ? void 0 : n.anarchy) == null ? void 0 : o.skills);
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
      const a = e[i];
      let n;
      return a && typeof a == "object" ? n = a.label ?? a.name ?? a.value ?? String(i) : a != null ? n = String(a) : n = String(i), {
        [t]: i,
        [s]: n
      };
    });
  }
  // Backwards-compat alias (the legacy file misspelled this)
  static mapObjetToKeyValue(e, t = "value", s = "label") {
    return T.mapObjectToKeyValue(e, t, s);
  }
};
v(T, "ENUMS"), // HBS-friendly arrays of { value, label } (or key/value depending on caller)
v(T, "hbsAttributes"), v(T, "hbsItemTypes"), v(T, "hbsMonitors"), v(T, "hbsMonitorLetters"), v(T, "hbsAssetModuleCategories"), v(T, "hbsLifeModuleTypes"), v(T, "hbsAreas"), v(T, "hbsRanges"), v(T, "hbsVehicleCategories"), // MWD-specific enum groups
v(T, "hbsMwdWeightClasses"), v(T, "hbsMwdHardpointTypes"), v(T, "hbsMwdHardpointSizes"), v(T, "hbsMwdHardpointLocations"), v(T, "hbsMwdPrimaryModes"), v(T, "hbsMwdWeaponCategories"), v(T, "hbsMwdWeaponDamageTypes"), v(T, "hbsPersonalWeaponDamageTypes"), v(T, "hbsPersonalWeaponDamageCategories"), v(T, "hbsDamageTypes"), v(T, "hbsMwdMeleeLocations"), v(T, "sortedAttributeKeys");
let j = T;
class Xi {
  static monitor(e) {
    return j.getFromList(j.getMonitors(), e) ?? "";
  }
  static letter(e) {
    return j.getFromList(j.getMonitorLetters(), e) ?? "";
  }
}
class Zi {
  static toLowerCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}
const ea = [
  "fas fa-dice",
  "fas fa-dice-one",
  "fas fa-dice-two",
  "fas fa-dice-three",
  "fas fa-dice-four",
  "fas fa-dice-five",
  "fas fa-dice-six"
];
class N {
  static fontAwesome(e) {
    return `<i class="${e}"></i>`;
  }
  static iconSystemPath(e, t) {
    return N.iconPath(`${ri}/${e}`, t);
  }
  static iconPath(e, t) {
    return `<img class="${t}" src="${e}" />`;
  }
  static iconD6(e) {
    if (e < 0 || e > 6)
      throw `Dice ${e} is out of dice range [1..6] or 0 for multidice`;
    return N.fontAwesome(ea[e]);
  }
}
globalThis.ANARCHY_ICONS = N;
const Z = (r, e = {}) => r.replace(/\{(.*?)\}/g, (t, s) => e[s] ?? ""), oi = Object.freeze({
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}), li = Object.freeze(
  Object.entries(oi).map(([r, e]) => ({ value: r, label: e }))
), ta = Object.freeze({
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
}), sa = Object.freeze(
  li.map((r) => r.value)
), ia = Object.freeze({
  "armor piercing": () => ({ ap: 2 }),
  "anti-ferro": () => ({ bonusVsArmorTag: { ferroFibrous: 0.33 } }),
  blast: () => ({ flags: ["blast", "area"] }),
  corrosive: () => ({ flags: ["corrosive"] }),
  emp: () => ({ flags: ["emp"] }),
  inaccurate: () => ({ accuracyMod: -1 })
});
function ci(r) {
  return Array.isArray(r) ? r.map((e) => String(e ?? "").trim()).filter(Boolean) : String(r ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function Je(r, e = "penetrating") {
  const t = String(r ?? "").trim().toLowerCase();
  return ta[t] ?? e;
}
function di(r) {
  const e = String(r ?? "").trim().toLowerCase();
  return sa.includes(e);
}
function dt(r) {
  const e = Je(r, "");
  return oi[e] ?? String(r ?? "").trim();
}
function Mt(r) {
  const e = r ?? {}, t = Number(e.ballistic ?? 0) || 0, s = Number(e.melee ?? 0) || 0;
  return {
    penetrating: e.penetrating !== void 0 ? Number(e.penetrating ?? 0) || 0 : Math.max(t, s),
    concussive: e.concussive !== void 0 ? Number(e.concussive ?? 0) || 0 : Number(e.explosive ?? 0) || 0,
    energy: Number(e.energy ?? 0) || 0,
    thermal: Number(e.thermal ?? 0) || 0,
    electrical: Number(e.electrical ?? 0) || 0
  };
}
function as(r) {
  return ci(r);
}
function Ms(r) {
  return ci(r);
}
function aa(r, e) {
  const t = { ...r ?? {} };
  return Object.entries(e ?? {}).forEach(([s, i]) => {
    t[s] = (Number(t[s] ?? 0) || 0) + (Number(i ?? 0) || 0);
  }), t;
}
function ra(r = []) {
  const e = {}, t = /* @__PURE__ */ new Set();
  for (const s of r.filter(Boolean)) {
    s.accuracyMod !== void 0 && (e.accuracyMod = (Number(e.accuracyMod ?? 0) || 0) + (Number(s.accuracyMod ?? 0) || 0)), s.ap !== void 0 && (e.ap = (Number(e.ap ?? 0) || 0) + (Number(s.ap ?? 0) || 0)), s.addHeat !== void 0 && (e.addHeat = (Number(e.addHeat ?? 0) || 0) + (Number(s.addHeat ?? 0) || 0)), s.bonusVsArmorTag && (e.bonusVsArmorTag = aa(e.bonusVsArmorTag, s.bonusVsArmorTag));
    for (const i of s.flags ?? []) {
      const a = String(i ?? "").trim();
      a && t.add(a);
    }
  }
  return t.size > 0 && (e.flags = Array.from(t)), e;
}
function mi(r = []) {
  return ra(
    Ms(r).map((e) => {
      const t = ia[String(e).trim().toLowerCase()];
      return typeof t == "function" ? t() : null;
    })
  );
}
function vs(r) {
  const e = Math.max(0, Number(r ?? 0) || 0);
  return e <= 0 ? 0 : Math.ceil(e / 4);
}
function na({
  currentArmorRating: r = 0,
  mitigationByType: e = {},
  damageType: t
} = {}) {
  const s = Math.max(0, Number(r ?? 0) || 0);
  if (s <= 0)
    return {
      currentArmorRating: 0,
      baseMitigation: 0,
      typeMitigationMod: 0,
      totalMitigation: 0,
      isDestroyed: !0
    };
  const i = Je(t, "penetrating"), a = Mt(e), n = vs(s), o = Number(a[i] ?? 0) || 0;
  return {
    currentArmorRating: s,
    baseMitigation: n,
    typeMitigationMod: o,
    totalMitigation: n + o,
    isDestroyed: !1
  };
}
function oa({ damageIncoming: r = 0, armorTags: e = [], effects: t = {} } = {}) {
  const s = new Set(as(e));
  let i = Number(r ?? 0) || 0;
  const a = [];
  return Object.entries((t == null ? void 0 : t.bonusVsArmorTag) ?? {}).forEach(([n, o]) => {
    if (!s.has(n)) return;
    const l = Number(o ?? 0) || 0;
    l && (i *= 1 + l, a.push({ tag: n, bonus: l }));
  }), {
    damageIncoming: i,
    applied: a
  };
}
class tt {
  static checkSufficient(e, t, s) {
    if (t > s) {
      const i = Z(b.common.errors.insufficient, {
        resource: e,
        required: t,
        available: s
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkOutOfRange(e, t, s, i) {
    if (t < s || t > i) {
      const a = Z(b.common.errors.outOfRange, {
        resource: e,
        value: t,
        min: s,
        max: i
      });
      throw ui.notifications.error(a), a;
    }
  }
  static checkUserGM() {
    if (!game.user.isGM) {
      const e = b.common.errors.onlyGM;
      throw ui.notifications.error(e), e;
    }
  }
  static checkItemType(e, t) {
    if (e.type != t) {
      const s = Z(b.common.errors.expectedType, {
        type: e.type ? b.itemType.singular[e.type] : e.type,
        expectedType: t
      });
      throw ui.notifications.error(s), s;
    }
  }
  static checkActorCanReceiveDamage(e, t, s) {
    if (!t) {
      const i = Z(b.common.errors.actorCannotReceiveDamage, {
        actor: s.name,
        damageType: di(e) ? dt(e) : b.actor.monitors[e] ?? b.mwd.weaponDamageType[e] ?? b.mwd.personalDamageType[e] ?? e
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkWeaponDefense(e, t) {
    var i;
    const s = e.getDefense();
    if ((((i = e.isPersonalWeapon) == null ? void 0 : i.call(e)) ?? e.type === f.itemType.personalWeapon) && !s) {
      const a = Z(b.common.errors.noDefenseOnWeapon, { actor: t.name, weapon: e.name });
      throw ui.notifications.error(a), a;
    }
  }
  static checkTargetsCount(e, t, s) {
    if (e > 0 && t.length > e) {
      const i = Z(b.common.errors.maxTargetsExceedeed, {
        weapon: this.name,
        area: b.area[s],
        count: t.length,
        max: e
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkActorDefenseAction(e, t, s) {
    if (!e) {
      const i = Z(b.common.errors.actorDoesNotHaveDefense, {
        actor: t.name,
        defense: s.labelkey,
        actorType: b.actorType[t.type]
      });
      throw ui.notifications.error(i), i;
    }
  }
}
function Le(r, e, t, s, i, a = (n) => !0) {
  return {
    code: r,
    labelkey: b.attributeAction[r],
    label: b.attributeAction[r],
    attributeFunction1: e ?? ((n) => {
    }),
    attributeFunction2: t ?? ((n) => {
    }),
    icon: s,
    actorTypes: i,
    condition: a
  };
}
function Nt(r, e) {
  return {
    code: r,
    labelkey: b.defense[r],
    label: b.defense[r],
    actionCode: e
  };
}
const oe = f.actorAttributes, le = f.actorTypes, Me = we.actions, Dt = we.defenses, qt = [
  Le(Me.defense, (r) => oe.reflexes, (r) => oe.intelligence, N.fontAwesome("fas fa-shield-alt"), [le.character, le.npc]),
  Le(Me.defense, (r) => oe.handling, (r) => oe.chassis, N.fontAwesome("fas fa-tachometer-alt"), [le.vehicle, le.battlemech]),
  Le(Me.resistTorture, (r) => oe.strength, (r) => oe.willpower, N.fontAwesome("fas fa-angry"), [le.character, le.npc]),
  Le(Me.perception, (r) => oe.logic, (r) => oe.willpower, N.fontAwesome("fas fa-eye"), [le.character, le.npc]),
  Le(Me.perception, (r) => oe.system, (r) => oe.handling, N.fontAwesome("fas fa-video"), [le.vehicle, le.battlemech]),
  Le(Me.composure, (r) => oe.charisma, (r) => oe.willpower, N.fontAwesome("fas fa-meh"), [le.character, le.npc]),
  Le(Me.judgeIntentions, (r) => oe.charisma, (r) => oe.charisma, N.fontAwesome("fas fa-theater-masks"), [le.character, le.npc]),
  Le(Me.memory, (r) => oe.logic, (r) => oe.logic, N.fontAwesome("fas fa-brain"), [le.character, le.npc]),
  Le(Me.catch, (r) => oe.reflexes, (r) => oe.reflexes, N.fontAwesome("fas fa-baseball-ball"), [le.character, le.npc]),
  Le(Me.lift, (r) => oe.strength, (r) => oe.strength, N.fontAwesome("fas fa-dumbbell"), [le.character, le.npc])
], Ot = [
  Nt(Dt.physicalDefense, Me.defense),
  Nt(Dt.physicalResistance, Me.resistTorture),
  Nt(Dt.socialDefense, Me.composure),
  Nt(Dt.mentalResistance, Me.perception)
];
class ae {
  static init() {
    Handlebars.registerHelper("fixedDefenseCode", (e) => ae.fixedDefenseCode(e));
  }
  static all(e = void 0) {
    return e ? qt.filter(e) : qt;
  }
  static getActorActions(e) {
    return qt.filter((t) => t.actorTypes.includes(e.type) && t.condition(e));
  }
  static fixedDefenseCode(e) {
    return we.fixedDefenseCode[e] ?? e;
  }
  static getActorDefenses(e) {
    return Ot.map((t) => {
      const s = ae.getActorAction(e, t.actionCode);
      return ae._convertToDefense(s, t);
    }).filter((t) => t == null ? void 0 : t.code);
  }
  static getDefenseAttributeAction(e) {
    var t;
    return (t = Ot.find((s) => s.code == e)) == null ? void 0 : t.actionCode;
  }
  static getActorAction(e, t) {
    return ae.getActorActions(e).find((s) => s.code == t);
  }
  static getActorDefense(e, t) {
    t = ae.fixedDefenseCode(t);
    const s = Ot.find((a) => a.code == t), i = ae.getActorAction(e, s.actionCode);
    return tt.checkActorDefenseAction(i, e, s), ae._convertToDefense(i, s);
  }
  static _convertToDefense(e, t) {
    return e ? foundry.utils.mergeObject(
      t,
      e ?? {},
      { overwrite: !1, inplace: !1 }
    ) : void 0;
  }
  static getDefenses() {
    return Ot;
  }
  static prepareShortcut(e, t) {
    const s = ae.getActorActions(e).find((i) => i.code == t);
    if (s)
      return {
        icon: s.icon,
        label: s.labelkey,
        callback: (i) => i.actor.rollAttributeAction(t)
      };
  }
}
class rs {
  constructor() {
    this.remoteCalls = {}, game.socket.on(ts, async (e) => this.onSocketMessage(e));
  }
  static async register(e, t) {
    game.system.anarchy.remoteCall._register(e, t);
  }
  async _register(e, t) {
    if (this.remoteCalls[e])
      throw `RemoteCall msg ${e} is already registered`;
    foundry.utils.mergeObject(t, {
      callback: (s) => {
        console.log(Y + "RemoteCall [", e, "] (", s, ")");
      },
      condition: (s) => !0,
      multiple: !1
      /* true if multiple users should handle the message */
    }, { overwrite: !1 }), this.remoteCalls[e] = t, console.log(Y + "RemoteCall registered", e);
  }
  static call(e, t) {
    return game.system.anarchy.remoteCall._remoteCall(e, t);
  }
  _remoteCall(e, t) {
    const s = this.remoteCalls[e];
    return !s || s.condition(game.user) || !s.multiple && _e.isUniqueConnectedGM() ? !1 : (game.socket.emit(ts, { msg: e, data: t }), !0);
  }
  async onSocketMessage(e) {
    const t = this.remoteCalls[e.msg];
    if (t) {
      const s = t.condition(game.user), i = t.multiple, a = _e.isUniqueConnectedGM();
      s && (i || a) ? t.callback(e.data) : console.log(Y + "RemoteCall.onSocketMessage(", e, ") ignored :", s, i, a);
    } else
      console.log(Y + "RemoteCall: No callback registered for", e);
  }
}
const Os = "Users.blindMessageToGM";
class _e {
  static init() {
    rs.register(Os, {
      callback: (e) => _e.blindMessageToGM(e),
      condition: (e) => e.isGM
    });
  }
  static blindMessageToGM(e) {
    rs.call(Os, e) || ChatMessage.create({
      user: e.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      blind: !0,
      content: Z(b.chat.blindMessageToGM, {
        user: game.user.name,
        message: e.content
      })
    });
  }
  static getUsers(e = (t) => !0) {
    return (game.version ? game.users : game.users.entities).filter(e);
  }
  static firstConnectedGM() {
    return _e.getUsers((e) => e.isGM && e.active).sort(B.ascending((e) => e.id)).at(0) ?? {};
  }
  /**
   * @returns true pour un seul utilisateur: le premier GM connecté par ordre d'id
   */
  static isUniqueConnectedGM(e = game.user) {
    return e.id == _e.firstConnectedGM().id;
  }
  static firstResponsible(e) {
    if (!(e != null && e.testUserPermission))
      return;
    const t = _e.getUsers(
      (s) => s.active && e.testUserPermission(s, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER)
    ).sort(B.ascending((s) => s.id)).at(0);
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
const it = b.actor.monitors, Be = b.actor.counters, pi = {
  armor: {
    path: "system.monitors.armor.value",
    monitor: (r) => r.system.monitors.armor,
    iconChecked: N.fontAwesome("fas fa-shield-slash"),
    iconUnchecked: N.fontAwesome("fas fa-shield-alt"),
    iconHit: N.fontAwesome("fas fa-bahai"),
    resource: it.armor
  },
  fatigue: {
    path: "system.monitors.fatigue.value",
    monitor: (r) => r.system.monitors.fatigue,
    iconChecked: N.fontAwesome("fas fa-grimace"),
    iconUnchecked: N.fontAwesome("far fa-smile"),
    iconHit: N.fontAwesome("fas fa-bahai"),
    resource: it.fatigue,
    overflow: (r) => f.monitors.physical,
    useArmor: !0
  },
  physical: {
    path: "system.monitors.physical.value",
    monitor: (r) => r.system.monitors.physical,
    iconChecked: N.fontAwesome("fas fa-heartbeat"),
    iconUnchecked: N.fontAwesome("far fa-heart"),
    iconHit: N.fontAwesome("fas fa-bahai"),
    resource: it.physical,
    useArmor: !0
  },
  structure: {
    path: "system.monitors.structure.value",
    monitor: (r) => r.system.monitors.structure,
    iconChecked: N.fontAwesome("fas fa-car-crash"),
    iconUnchecked: N.fontAwesome("fas fa-car-alt"),
    iconHit: N.fontAwesome("fas fa-bahai"),
    resource: it.structure
  },
  heat: {
    path: "system.monitors.heat.value",
    monitor: (r) => r.system.monitors.heat,
    iconChecked: N.fontAwesome("fas fa-fire"),
    iconUnchecked: N.fontAwesome("far fa-sun"),
    iconHit: N.fontAwesome("fas fa-temperature-high"),
    resource: it.heat
  },
  criticals: {
    path: "system.hybrid.criticals.value",
    monitor: (r) => {
      var e;
      return ((e = r.system.hybrid) == null ? void 0 : e.criticals) ?? { value: 0, max: 0 };
    },
    iconChecked: N.fontAwesome("fas fa-bolt"),
    iconUnchecked: N.fontAwesome("far fa-dot-circle"),
    iconHit: N.fontAwesome("fas fa-exclamation-triangle"),
    resource: it.structure
  },
  anarchy: {
    path: "system.counters.anarchy.value",
    monitor: (r) => ({
      value: r.system.counters.anarchy.value,
      max: 6
    }),
    iconChecked: N.iconPath(`${gt}/anarchy-point.webp`, "checkbar-img"),
    iconUnchecked: N.iconPath(`${gt}/anarchy-point-off.webp`, "checkbar-img"),
    resource: Be.anarchy
  },
  plot: {
    path: "system.counters.anarchy.value",
    monitor: (r) => {
      const e = r.system.counters.anarchy.value;
      return { value: e, max: e + 1 };
    },
    iconChecked: N.iconPath(`${gt}/danger-point.webp`, "checkbar-img"),
    iconUnchecked: N.iconPath(`${gt}/danger-point-off.webp`, "checkbar-img"),
    resource: Be.anarchy
  },
  sceneAnarchy: {
    path: "system.counters.edgePools.chaos.value",
    monitor: (r) => {
      const e = r.getEdgePoolValue(f.counters.edgePools.chaos), t = r.getAttributeValue(f.actorAttributes.edge);
      return { value: e, max: t };
    },
    iconChecked: N.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    iconUnchecked: N.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    resource: Be.edgePools.chaos
  },
  grit: {
    path: "system.counters.edgePools.grit.value",
    monitor: (r) => ({ value: r.getEdgePoolValue(f.counters.edgePools.grit), max: r.getAttributeValue(f.actorAttributes.edge) }),
    iconChecked: N.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    iconUnchecked: N.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    resource: Be.edgePools.grit
  },
  insight: {
    path: "system.counters.edgePools.insight.value",
    monitor: (r) => ({ value: r.getEdgePoolValue(f.counters.edgePools.insight), max: r.getAttributeValue(f.actorAttributes.edge) }),
    iconChecked: N.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    iconUnchecked: N.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    resource: Be.edgePools.insight
  },
  legend: {
    path: "system.counters.edgePools.legend.value",
    monitor: (r) => ({ value: r.getEdgePoolValue(f.counters.edgePools.legend), max: r.getAttributeValue(f.actorAttributes.edge) }),
    iconChecked: N.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    iconUnchecked: N.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    resource: Be.edgePools.legend
  },
  credibility: {
    path: "system.counters.edgePools.credibility.value",
    monitor: (r) => ({ value: r.getEdgePoolValue(f.counters.edgePools.credibility), max: r.getAttributeValue(f.actorAttributes.edge) }),
    iconChecked: N.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    iconUnchecked: N.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    resource: Be.edgePools.credibility
  },
  rumor: {
    path: "system.counters.edgePools.rumor.value",
    monitor: (r) => ({ value: r.getEdgePoolValue(f.counters.edgePools.rumor), max: r.getAttributeValue(f.actorAttributes.edge) }),
    iconChecked: N.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    iconUnchecked: N.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    resource: Be.edgePools.rumor
  }
}, De = foundry.utils.mergeObject(pi, {});
class C {
  static init() {
    Handlebars.registerHelper("iconCheckbar", C.iconCheckbar), Handlebars.registerHelper("iconCheckbarHit", C.iconHit);
  }
  static hackCheckbars(e) {
    if (e) {
      const t = foundry.utils.mergeObject(pi, {});
      foundry.utils.mergeObject(t, e, { recursive: !0 }), foundry.utils.mergeObject(De, t, { overwrite: !0 });
    }
  }
  static iconCheckbar(e, t) {
    return t ? C.iconChecked(e) : C.iconUnchecked(e);
  }
  static iconChecked(e) {
    var t;
    return (t = De[e]) == null ? void 0 : t.iconChecked;
  }
  static iconUnchecked(e) {
    var t;
    return (t = De[e]) == null ? void 0 : t.iconUnchecked;
  }
  static iconHit(e) {
    var t, s;
    return ((t = De[e]) == null ? void 0 : t.iconHit) ?? ((s = De[e]) == null ? void 0 : s.iconChecked);
  }
  static useArmor(e) {
    var t;
    return (t = De[e]) == null ? void 0 : t.useArmor;
  }
  static max(e, t) {
    var i;
    const s = (i = De[t]) == null ? void 0 : i.monitor(e);
    return ((s == null ? void 0 : s.max) ?? 0) + ((s == null ? void 0 : s.maxBonus) ?? 0);
  }
  static value(e, t) {
    var i;
    const s = (i = De[t]) == null ? void 0 : i.monitor(e);
    return (s == null ? void 0 : s.value) ?? 0;
  }
  static resistance(e, t, s = void 0) {
    return C.resistanceDetail(e, t, s).value;
  }
  static resistanceDetail(e, t, s = void 0) {
    var l, c;
    const i = (l = De[t]) == null ? void 0 : l.monitor(e), a = C._resolveResistance(i == null ? void 0 : i.resistance, s), n = C._resolveResistance(i == null ? void 0 : i.resistanceBonus, s), o = s === void 0 ? 0 : Number(((c = i == null ? void 0 : i.resistanceBonusByType) == null ? void 0 : c[s]) ?? 0);
    return {
      value: a.value + n.value + o,
      damageType: s,
      source: a.source,
      bonusSource: n.source,
      bonusByType: o,
      usedType: a.source === "type" || n.source === "type" || o !== 0
    };
  }
  static _resolveResistance(e, t = void 0) {
    var a;
    if (typeof e == "number")
      return { value: e ?? 0, source: "legacy" };
    const s = t !== void 0 ? (a = e == null ? void 0 : e.byType) == null ? void 0 : a[t] : void 0;
    return s !== void 0 ? { value: Number(s) || 0, source: "type" } : { value: Number((e == null ? void 0 : e.default) ?? 0) || 0, source: "default" };
  }
  static newValue(e, t) {
    return e + (t ? 0 : 1);
  }
  static async switchMonitorCheck(e, t, s, i, a = void 0, n = void 0) {
    await C.setCounter(e, t, C.newValue(s, i), a, n);
  }
  static async addCounter(e, t, s, i = void 0) {
    if (s != 0) {
      const a = C.getCounterValue(e, t, i) ?? 0;
      await C.setCounter(e, t, a + s, i);
    }
  }
  static async setCounter(e, t, s, i = void 0, a = void 0) {
    switch (t) {
      case f.monitors.anarchy:
        return await C.setAnarchy(e, s);
      case f.monitors.sceneAnarchy:
        return await C.setSceneAnarchy(e, s);
    }
    return await C.setCheckbar(e, t, s);
  }
  static getCounterValue(e, t, s) {
    switch (t) {
      case f.monitors.anarchy:
        return C.getAnarchy(e, t);
    }
    return C.value(e, t);
  }
  static async setCheckbar(e, t, s) {
    if (s == C.getCounterValue(e, t))
      return;
    const i = De[t];
    if (i.path) {
      const a = C.max(e, t);
      if (a <= 0)
        return;
      await C._manageOverflow(i, e, t, s, a), s = Math.min(s, a), tt.checkOutOfRange(i.resource, s, 0, a), await e.setCheckbarValue(i.path, s);
    }
  }
  static async _manageOverflow(e, t, s, i, a) {
    if (i > a) {
      const n = e.overflow ? e.overflow(t) : void 0, o = e.recomputeOverflow ? e.recomputeOverflow(i - a) : i - a;
      n && o > 0 && (C._notifyOverflow(t, s, o, n), await C.addCounter(t, n, o));
    }
  }
  static _notifyOverflow(e, t, s, i) {
    const a = Z(b.actor.monitors.overflow, {
      actor: e.name,
      monitor: b.actor.monitors[t],
      overflow: s,
      overflowMonitor: b.actor.monitors[i]
    });
    ui.notifications.warn(a);
  }
  static async _manageFatigueOverflow(e, t, s) {
    await C.addCounter(e, f.monitors.physical, t - s);
  }
  static async setAnarchy(e, t) {
    if (e.hasOwnAnarchy()) {
      if (e.hasGMAnarchy()) {
        await game.system.anarchy.gmAnarchy.setAnarchy(t), e.render();
        return;
      }
      await C._setAnarchyMonitor(e, f.monitors.anarchy, t);
    }
  }
  static async setSceneAnarchy(e, t) {
    await C._setAnarchyMonitor(e, f.monitors.sceneAnarchy, t);
  }
  static async _setAnarchyMonitor(e, t, s) {
    const i = C.value(e, t);
    await C.setCheckbar(e, t, s), game.user.isGM || C.notifyAnarchyChange(e, t, i, s);
  }
  static getAnarchy(e, t) {
    return !game.user.isGM && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) || t == Be.anarchy && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) ? 0 : C.value(e, t);
  }
  static notifyAnarchyChange(e, t, s, i) {
    _e.blindMessageToGM({
      from: game.user.id,
      content: Z(
        b.gmManager.playerChangedAnarchy,
        {
          user: game.user.name,
          actor: e.name,
          monitor: b.actor.counters[t],
          from: s,
          to: i
        }
      )
    });
  }
}
const { loadTemplates: la, renderTemplate: ca } = foundry.applications.handlebars, _s = {
  highlighted: ["far fa-times-circle", "fas fa-dice-one", "fas fa-dice-two", "fas fa-dice-three", "fas fa-dice-four", "fas fa-dice-five", "fas fa-dice-six"],
  dimmed: ["far fa-times-circle", "far fa-dice-one", "far fa-dice-two", "far fa-dice-three", "far fa-dice-four", "far fa-dice-five", "far fa-dice-six"]
};
class Fe {
  static init() {
    Hooks.once("ready", async () => await this.onReady()), Handlebars.registerHelper("dice-cursor-array", (e, t) => Fe.array(e ?? 0, t ?? 5)), Handlebars.registerHelper("dice-cursor-fas", (e, t) => Fe.fasClass(e, t)), Handlebars.registerHelper("dice-cursor-active", (e, t) => Fe.activeClass(e, t)), Handlebars.registerHelper("dice-cursor-color", (e, t) => Fe.colorClass(e, t));
  }
  static async onReady() {
    await la([
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
    return Fe.isActive(e, t) ? "active" : "inactive";
  }
  static fasClass(e, t) {
    const s = Fe.isActive(e, t) ? _s.highlighted : _s.dimmed;
    return Fe.$getFas(s, Math.abs(e));
  }
  static colorClass(e, t) {
    return e == 0 || !t ? e < 0 ? "fixed-dice-malus" : "fixed-dice-bonus" : e < 0 ? "variable-dice-malus" : "variable-dice-bonus";
  }
  static $getFas(e, t) {
    return e[t > 6 ? t % 6 : t];
  }
  static async diceCursor({ value: e, min: t, max: s, editable: i }) {
    return await ca("systems/mwd/templates/roll/parts/dice-cursor.hbs", {
      value: e,
      min: t,
      max: s,
      editable: i
    });
  }
}
const ce = {
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
}, Is = "anarchy-", hi = `${S}.${ce.ANARCHY_HACK}`, ns = {
  id: S,
  name: "Standard Shadowrun Anarchy",
  hack: {
    checkbars: () => De
  }
};
globalThis.ANARCHY_HOOKS = ce;
globalThis.SETTING_KEY_ANARCHY_HACK = hi;
globalThis.SHADOWRUN_ANARCHY_NO_HACK = ns;
class Xe {
  constructor() {
    this.hooks = [], this.hacks = {}, this.hackNames = {}, this.hookMethods = {}, this._register(ce.ANARCHY_HACK), Hooks.on(ce.ANARCHY_HACK, (e) => e(ns)), Hooks.on("updateSetting", async (e, t, s, i) => this.onUpdateSetting(e, t, s, i)), Hooks.once("ready", () => this.onReady()), Hooks.on("getSceneControlButtons", (e) => {
      var s;
      if (!((s = game.user) != null && s.isGM)) return;
      const t = Array.isArray(e) ? e.find((i) => i.name === "notes") : e == null ? void 0 : e.notes;
      if (!t) {
        const i = Array.isArray(e) ? e.map((a) => a.name) : Object.keys(e ?? {});
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
          var i, a;
          return (a = (i = game.mwd) == null ? void 0 : i.gmGadget) == null ? void 0 : a.call(i);
        }
      });
    });
  }
  async onReady() {
    Hooks.callAll(ce.ANARCHY_HACK, (e) => {
      this.hacks[e.id] = e, this.hackNames[e.id] = e.name;
    }), game.settings.register(S, ce.ANARCHY_HACK, {
      scope: "world",
      name: b.settings.anarchyHack.name,
      hint: b.settings.anarchyHack.hint,
      config: !0,
      default: ns.id,
      choices: this.hackNames,
      type: String
    }), this.applySelectedAnarchyHack();
  }
  async onUpdateSetting(e, t, s, i) {
    e.key == hi && this.applySelectedAnarchyHack();
  }
  applySelectedAnarchyHack() {
    const e = this.getSelectedHack();
    e && C.hackCheckbars(e.hack.checkbars());
  }
  selectHookMethod(e, t) {
    Hooks.callAll(t, (s, i) => {
      s == e && (this.hookMethods[t] = i);
    });
  }
  getSelectedHack() {
    return this.hacks[game.settings.get(S, ce.ANARCHY_HACK)];
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
    Xe.instance()._register(e);
  }
  _register(e) {
    if (console.log(Y + "HooksManager.register", e), !e.startsWith(Is))
      throw `For safety Anarchy Hooks names must be prefixed by '${Is}'`;
    this.hooks.push(e);
  }
}
const $s = [
  f.itemType.assetModule,
  f.itemType.mechWeapon,
  f.itemType.personalWeapon,
  "weapon"
];
class U {
  constructor() {
    this.modifiers = {
      groups: j.mapObjetToKeyValue(b.modifier.group, "key", "label"),
      roll: U._buildGroupOptions("roll"),
      attribute: U._buildGroupOptions("attribute"),
      monitor: U._buildGroupOptions("monitor"),
      other: U._buildGroupOptions("other")
    }, Hooks.once("ready", () => this.onReady());
  }
  static _buildGroupOptions(e) {
    switch (e) {
      case "attribute":
        return {
          label: b.modifier.group[e],
          effects: j.hbsAttributes.map((t) => ({ key: t.value, label: t.labelkey })),
          categories: []
        };
    }
    return {
      label: b.modifier.group[e],
      effects: j.mapObjetToKeyValue(b.modifier[e].effect, "key", "label"),
      categories: j.mapObjetToKeyValue(b.modifier[e].category, "key", "label")
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
                return j.getDamageTypes().map((a) => ({ key: a.value, label: a.labelkey }));
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
        return j.getAttributes().map((s) => ({ key: s.value, label: s.labelkey }));
      case "skill":
        return game.system.anarchy.skills.getSkills().map((s) => ({ key: s.code, label: s.labelkey }));
      case "attributeAction":
        const t = ae.all().map((s) => ({ key: s.code, label: s.labelkey }));
        return B.distinct(t.map((s) => s.key)).map((s) => t.find((i) => i.key == s));
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
            return s.subCategory == e.attributeAction || s.subCategory == ae.getDefenseAttributeAction(e.defenseAction);
        }
      return !1;
    };
  }
  static computeRollModifiers(e, t, s) {
    const i = U.buildRollModifiersFilter(t, s), a = (c) => c.group == "roll" && c.effect == s && i(c), n = U._activeItems(e).map((c) => U.itemModifiers(c, a)).reduce((c, u) => c.concat(u), []).sort(B.descending((c) => c.modifier.value)), o = U.$sumAssetModuleModifiers(n.filter((c) => $s.includes(c.item.type)).map((c) => c.modifier.value)), l = B.sumValues(n.filter((c) => !$s.includes(c.item.type)).map((c) => c.modifier.value));
    return {
      value: o + l,
      sources: n
    };
  }
  static $sumAssetModuleModifiers(e) {
    const t = e.find((a) => a > 3) ?? 0, s = B.sumValues(e.filter((a) => a < 0)), i = Math.min(3, B.sumValues(e.filter((a) => a > 0 && a <= 3)));
    return s + Math.max(i, t);
  }
  static computeModifiers(e, t, s = void 0, i = void 0) {
    const a = U._createFilter(t, s, i), n = U._activeItems(e).map((l) => U.itemModifiers(l, a)).reduce((l, c) => l.concat(c), []);
    return {
      value: B.sumValues(n, (l) => l.modifier.value),
      sources: n
    };
  }
  static sumMonitorModifiers(e, t, s, i = void 0) {
    return U.sumModifiers(U._activeItems(e), "monitor", t, s, i);
  }
  static sumModifiers(e, t, s, i, a = void 0) {
    const n = U._createFilter(t, s, i, a), o = U._activeItems(e).map((l) => U.itemModifiers(l, n)).reduce((l, c) => l.concat(c), []);
    return B.sumValues(o, (l) => l.modifier.value);
  }
  static _createFilter(e, t, s, i = void 0) {
    return (a) => a.group == e && a.effect == (t ?? a.effect) && a.category == (s ?? a.category) && (i == null ? !0 : a.subCategory == i);
  }
  static countModifiers(e, t, s = void 0, i = void 0) {
    const a = U._createFilter(t, s, i);
    return U._activeItems(e).map((o) => U.itemModifiers(o, a)).reduce((o, l) => o.concat(l), []).count;
  }
  static itemModifiers(e, t) {
    return U._listItemModifiers(e, t).map((s) => U._itemModifier(e, s));
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
    return e.filter((t) => t.isActive());
  }
}
const { loadTemplates: zt, renderTemplate: Ln } = foundry.applications.handlebars, K = {
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
}, Ls = 4, ua = [
  // attribute1
  {
    code: "attribute1",
    options: {
      order: 1,
      category: K.pool,
      hbsTemplateRoll: `${O}/roll/parts/select-attribute.hbs`
    },
    condition: (r) => Object.values(we.rollType).includes(r.mode),
    isUsed: (r) => !0,
    factory: (r) => {
      var t;
      const e = r.attribute1 ?? ((t = r.skill) == null ? void 0 : t.system.attribute);
      return {
        labelkey: e ? b.attributes[e] : b.attributes.noAttributes,
        value: r.actor.getAttributeValue(e, r.activeItem),
        flags: { editable: r.skill },
        selected: e,
        choices: j.getAttributes((s) => r.attributes.includes(s))
      };
    }
  },
  // attribute2
  {
    code: "attribute2",
    options: {
      order: 1,
      category: K.pool,
      hbsTemplateRoll: `${O}/roll/parts/select-attribute.hbs`,
      hbsTemplateChat: `${O}/chat/parts/pool-attribute2.hbs`
    },
    condition: (r) => [we.rollType.attribute, we.rollType.attributeAction, we.rollType.defense].includes(r.mode),
    isUsed: (r) => r.used,
    onChecked: (r, e) => r.used = !!e,
    factory: (r) => {
      const e = r.attribute2;
      return {
        labelkey: e ? b.attributes[e] : b.attributes.noAttributes,
        value: r.actor.getAttributeValue(e, r.activeItem),
        flags: { editable: we.rollType.attribute == r.mode },
        selected: e,
        choices: j.getAttributes((t) => r.attributes.includes(t))
      };
    }
  },
  // skill
  {
    code: "skill",
    options: {
      flags: {},
      order: 3,
      category: K.pool,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`
    },
    condition: (r) => ["skill", "weapon"].includes(r.mode),
    factory: (r) => {
      var t, s, i, a;
      const e = (t = r.actor) != null && t.getSkillRating ? r.actor.getSkillRating(r.skill) : ((i = (s = r.skill) == null ? void 0 : s.system) == null ? void 0 : i.value) ?? 0;
      return {
        label: (a = r.skill) == null ? void 0 : a.name,
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
      category: K.pool,
      hbsTemplateRoll: `${O}/roll/parts/check-option.hbs`
    },
    isUsed: (r) => r.used,
    condition: (r) => {
      var e;
      return r.mode == "skill" && r.specialization || r.mode == "weapon" && ((e = r.skill) == null ? void 0 : e.system.specialization);
    },
    onChecked: (r, e) => {
      r.used = e, r.value = e ? 2 : 0;
    },
    factory: (r) => ({
      label: r.specialization ?? r.skill.system.specialization,
      used: r.specialization != null,
      value: 2
    })
  },
  // credibility usage
  {
    code: "credibility",
    options: {
      flags: { editDice: !0, editable: !0 },
      order: 5,
      category: K.pool,
      value: 0,
      labelkey: b.common.roll.modifiers.social.credibility,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`
    },
    condition: (r) => {
      var e;
      return ((e = r.skill) == null ? void 0 : e.system.isSocial) && r.actor.getCredibilityValue() > 0;
    },
    factory: (r) => ({
      min: 0,
      max: r.actor.getCredibilityValue()
    })
  },
  // modifiers bonus
  {
    code: "poolModifiers",
    options: {
      flags: { editDice: !0, editable: !0 },
      labelkey: b.common.roll.modifiers.poolModifiers,
      order: 5,
      category: K.pool,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 4
    },
    factory: (r) => je.computeRollModifiers(K.pool, r)
  },
  // wounds
  {
    code: "wounds",
    options: {
      flags: { optional: !0 },
      order: 10,
      category: K.pool,
      labelkey: b.common.roll.modifiers.wounds,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`
    },
    isUsed: (r) => r.used,
    condition: (r) => r.actor.getWounds(),
    onChecked: (r, e) => {
      r.used = e, r.value = e ? -r.wounds : 0;
    },
    factory: (r) => {
      const e = r.actor.getWounds();
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
      category: K.pool,
      value: 0,
      labelkey: b.common.roll.modifiers.other,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
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
      category: K.glitch,
      value: 0,
      labelkey: b.common.roll.modifiers.glitch,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${O}/chat/parts/glitch.hbs`,
      min: 0,
      max: 5
    },
    isUsed: (r) => r.value > 0,
    factory: (r) => {
      const e = r.actor.getWounds(), t = je.computeRollModifiers(K.glitch, r);
      return {
        value: (e == 0 ? 0 : 1) + (r.glitch ?? 0) + t.value
      };
    }
  },
  // social rumor
  {
    code: "rumor",
    options: {
      flags: { editDice: !0, editable: !0 },
      order: 50,
      category: K.glitch,
      value: 0,
      labelkey: b.common.roll.modifiers.social.rumor,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${O}/chat/parts/glitch.hbs`,
      min: 0,
      max: 1
    },
    condition: (r) => {
      var e;
      return ((e = r.skill) == null ? void 0 : e.system.isSocial) && r.actor.getRumorValue() > 0;
    },
    factory: (r) => ({
      max: r.actor.getRumorValue()
    })
  },
  // rerolls
  {
    code: "reroll",
    options: {
      flags: { editDice: !0, editable: !0 },
      order: 30,
      category: K.reroll,
      labelkey: b.common.roll.modifiers.reroll,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: Ls
    },
    factory: (r) => {
      const e = je.computeRollModifiers(K.reroll, r), t = je.computeRollModifiers(K.rerollMax, r);
      return foundry.utils.mergeObject(e, {
        max: Ls + Math.max(0, t.value ?? 0)
      });
    }
  },
  // reduction from opponent
  {
    code: "reduced",
    options: {
      order: 29,
      category: K.pool,
      labelkey: b.common.roll.modifiers.reduced,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 0
    },
    condition: (r) => {
      var e;
      return (((e = r.attackRoll) == null ? void 0 : e.param.opponentPool) ?? 0) != 0;
    },
    factory: (r) => {
      var t;
      const e = -(((t = r.attackRoll) == null ? void 0 : t.param.opponentPool) ?? 0);
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
      category: K.rerollForced,
      labelkey: b.common.roll.modifiers.rerollForced,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 0
    },
    factory: (r) => {
      var t;
      const e = je.computeRollModifiers(K.successReroll, r);
      return e.value = -e.value - (((t = r.attackRoll) == null ? void 0 : t.param.opponentReroll) ?? 0), foundry.utils.mergeObject(e, {
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
      category: K.pool,
      value: 0,
      min: 0,
      max: 3,
      labelkey: b.common.roll.modifiers.anarchyDisposition,
      hbsTemplateRoll: `${O}/roll/parts/check-option.hbs`
    },
    isUsed: (r) => r.used,
    condition: (r) => r.actor.getAnarchyValue() > 0,
    onChecked: (r, e) => {
      r.used = e, r.value = e ? 3 : 0;
    }
  },
  // anarchy take risks
  {
    code: "anarchyRisk",
    options: {
      flags: { optional: !0, isAnarchy: !0, forceDisplay: !0 },
      order: 70,
      category: K.risk,
      value: 0,
      labelkey: b.common.roll.modifiers.anarchyRisk,
      hbsTemplateRoll: `${O}/roll/parts/check-option.hbs`,
      hbsTemplateChat: `${O}/chat/parts/anarchy-risk.hbs`
    },
    isUsed: (r) => r.used,
    condition: (r) => r.actor.getAnarchyValue() > 0,
    onChecked: (r, e) => {
      r.used = e, r.value = e ? 1 : 0;
    }
  },
  // edge
  {
    code: "edge",
    options: {
      flags: { optional: !0, forceDisplay: !0 },
      value: 0,
      order: 70,
      category: K.edge,
      labelkey: b.common.roll.modifiers.edge,
      hbsTemplateRoll: `${O}/roll/parts/check-option.hbs`
    },
    isUsed: (r) => r.used,
    condition: (r) => r.options.canUseEdge && r.actor.getRemainingEdge(),
    onChecked: (r, e) => {
      r.used = e, r.value = e ? 1 : 0;
    },
    factory: (r) => {
      var i;
      const t = [
        f.counters.edgePools.grit,
        f.counters.edgePools.chaos,
        f.counters.edgePools.insight,
        f.counters.edgePools.rumor,
        f.counters.edgePools.legend,
        f.counters.edgePools.credibility
      ].map((a) => {
        const n = r.actor.getEdgePoolValue(a);
        return {
          code: a,
          label: b.actor.counters.edgePools[a] ?? a,
          value: n
        };
      }), s = ((i = t.find((a) => a.value > 0)) == null ? void 0 : i.code) ?? f.counters.edgePools.grit;
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
      category: K.opponentPool,
      labelkey: b.common.roll.modifiers.opponentPool,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (r) => je.computeRollModifiers(K.opponentPool, r),
    condition: (r) => !r.attributeAction
  },
  // force opponent rerolls
  {
    code: "opponentReroll",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: K.opponentReroll,
      value: 0,
      labelkey: b.common.roll.modifiers.opponentReroll,
      hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (r) => je.computeRollModifiers(K.opponentReroll, r),
    condition: (r) => !r.attributeAction
  }
];
class je {
  constructor() {
    this.registeredParameters = {}, Xe.register(ce.REGISTER_ROLL_PARAMETERS), Xe.register(ce.MODIFY_ROLL_PARAMETER), Hooks.on(ce.MODIFY_ROLL_PARAMETER, (e) => this._validate(e)), Hooks.once(ce.REGISTER_ROLL_PARAMETERS, (e) => ua.forEach(
      (t) => e(t)
    )), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(ce.REGISTER_ROLL_PARAMETERS, async (t) => {
      Hooks.callAll(ce.MODIFY_ROLL_PARAMETER, t), t.ignore || await this._register(t);
    });
    const e = B.distinct([].concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateRoll)).concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateChat)).filter((t) => typeof t == "string" && t.length > 0));
    await zt(B.distinct(e)), await zt([`${O}/roll/parts/parameter-label.hbs`]);
  }
  _validate(e) {
    e.code || (console.error(`${Y} RollParameter does not have a code`, e), e.ignore = !0);
  }
  async _register(e) {
    if (this.registeredParameters[e.code]) {
      console.error(`${Y} RollParameter ${e.code} is already registered`, e);
      return;
    }
    e.onChecked || (e.onChecked = (t, s) => t.used = s), e.onValue = (t, s) => t.value = s, this.registeredParameters[e.code] = e;
  }
  async _optionalLoadTemplate(e) {
    e && await zt([e]);
  }
  build(e) {
    return Object.values(this.registeredParameters).filter((t) => !t.condition || t.condition(e)).map((t) => this._computeParameter(t, e));
  }
  compute(e) {
    const t = e.filter((a) => this.isParameterUsed(a)), s = B.classify(t, (a) => a.category), i = {};
    return Object.values(s).forEach((a) => i[a[0].category] = B.sumValues(a, (n) => n.value ?? (n.optional ? 1 : 0))), i;
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
    const s = (a) => {
      var n;
      return !((n = a.isWeapon) != null && n.call(a)) || t.weapon && a.id == t.weapon.id;
    }, i = t.actor.items.filter(s);
    return U.computeRollModifiers(i, t, e);
  }
}
const { ApplicationV2: da, HandlebarsApplicationMixin: ma } = foundry.applications.api, { loadTemplates: pa, renderTemplate: ha } = foundry.applications.handlebars;
var Bt, fi;
const de = class de extends ma(da) {
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
    await pa([
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
    const s = foundry.utils.mergeObject(de.prepareActorRoll(e), {
      mode: we.rollType.attribute,
      attribute1: t
    });
    await de.create(s);
  }
  static async rollAttributeAction(e, t) {
    const s = foundry.utils.mergeObject(de.prepareActorRoll(e), {
      mode: we.rollType.attributeAction,
      attributeAction: t.code,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e)
    });
    await de.create(s);
  }
  static async rollSkill(e, t, s) {
    const i = foundry.utils.mergeObject(de.prepareActorRoll(e), {
      mode: we.rollType.skill,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? f.actorAttributes.reflexes,
      specialization: s
    });
    await de.create(i);
  }
  static async rollWeapon(e, t, s, i) {
    const a = foundry.utils.mergeObject(de.prepareActorRoll(e), {
      mode: we.rollType.weapon,
      weapon: s,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? e.getPhysicalAgility(),
      specialization: t == null ? void 0 : t.system.specialization,
      targeting: i
    });
    await de.create(a);
  }
  static async rollDefense(e, t, s) {
    const i = foundry.utils.mergeObject(de.prepareActorRoll(e), {
      mode: we.rollType.defense,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e),
      defenseAction: t.code,
      attackRoll: s.attackRoll,
      tokenId: s.defenderTokenId,
      choiceChatMessageId: s.choiceChatMessageId
    });
    await de.create(i);
  }
  static async itemAttributeRoll(e, t) {
    const s = foundry.utils.mergeObject(de.prepareActorRoll(e.actor), {
      mode: we.rollType.attribute,
      item: e,
      attribute1: t,
      attributes: e.actor.getUsableAttributes(e)
    });
    await de.create(s);
  }
  static async create(e) {
    var n;
    const t = _(n = de, Bt, fi).call(n, e), s = await ha(`${O}/roll/roll-dialog-title.hbs`, t), i = {
      id: `roll-dialog-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...de.DEFAULT_OPTIONS.classes],
      window: { title: s }
    };
    return new de({ roll: t }, i).render({ force: !0 });
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
      const i = this._getRollParameter(s), a = this._getEventItem(s, this.roll.actor), n = s.currentTarget.value, o = this.roll.actor.getAttributeValue(n, a);
      this.roll[i.code] = n, await this._setParameterSelectedOption(i, n, o);
    }), this.html.find(".check-optional").click(async (s) => {
      const i = this._getRollParameter(s);
      i.onChecked(i, s.currentTarget.checked), i.category == K.pool && await this._updateParameterValue(i, i.value), i.code == "edge" && this.html.find(`.parameter[data-parameter-code='${i.code}'] .edge-pool-select`).prop("disabled", !i.used);
    }), this.activateDiceParameterClick(), this.html.find("input.parameter-value:not(:disabled)").on("input", async (s) => {
      const i = this._getRollParameter(s), a = Number.parseInt(s.currentTarget.value) ?? 0;
      await this._updateParameterValue(i, a);
    }), this.html.find(".select-option-parameter").change(async (s) => {
      const i = this._getRollParameter(s), a = s.currentTarget.value, n = Number.parseInt(a);
      await this._setParameterSelectedOption(i, a, n);
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
        const i = Number.parseInt(this.html.find(e.currentTarget).attr("data-dice")) ?? 0, a = t.value != i || i == 0 ? i : i > 0 ? i - 1 : i + 1;
        await this._updateParameterValue(t, a);
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
    return await Fe.diceCursor({
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
Bt = new WeakSet(), fi = function(e) {
  const t = game.system.anarchy.rollParameters.build(e).sort(B.ascending((s) => s.order ?? 200));
  return foundry.utils.mergeObject(e, {
    ENUMS: j.getEnums((s) => e.attributes.includes(s)),
    ANARCHY: b,
    parameters: t
  });
}, fe(de, Bt), v(de, "PARTS", {
  body: {
    template: `${O}/roll/roll-dialog.hbs`
  }
});
let We = de;
const Cs = [
  // Strength
  { code: "athletics", label: "Athletics", attribute: "strength", icon: `${F}/athletics.svg`, domains: ["physical"] },
  { code: "heavyWeapons", label: "Heavy Weapons", attribute: "strength", icon: `${F}/heavy-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  // Reflexes
  { code: "escapeArtist", label: "Escape Artist", attribute: "reflexes", icon: `${F}/escape-artist.svg`, domains: ["physical"] },
  { code: "gunnery", label: "Gunnery", attribute: "reflexes", icon: `${F}/vehicle-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "meleeCombat", label: "Melee Combat", attribute: "reflexes", icon: `${F}/close-combat.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "piloting", label: "Piloting", attribute: "reflexes", icon: `${F}/piloting-ground-steering-wheel.svg`, domains: ["physical"] },
  { code: "projectileWeapons", label: "Projectile Weapons", attribute: "reflexes", icon: `${F}/projectile-weapons.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "firearms", label: "Firearms", attribute: "reflexes", icon: `${F}/firearms.svg`, defense: "physicalDefense", domains: ["physical"] },
  { code: "stealth", label: "Stealth", attribute: "reflexes", icon: `${F}/stealth.svg`, domains: ["physical"] },
  { code: "zeroGOps", label: "Zero-G Operations", attribute: "reflexes", icon: `${F}/fly.svg`, domains: ["physical"] },
  // Intelligence
  { code: "art", label: "Art", attribute: "intelligence", icon: `${F}/art.svg`, domains: ["mental"] },
  { code: "artillery", label: "Artillery", attribute: "intelligence", icon: `${F}/artillery.svg`, domains: ["mental"] },
  { code: "systemOps", label: "System Operations", attribute: "intelligence", icon: `${F}/electronics.svg`, domains: ["mental"] },
  { code: "computers", label: "Computers", attribute: "intelligence", icon: `${F}/hacking.svg`, domains: ["mental"] },
  { code: "demolitions", label: "Demolitions", attribute: "intelligence", icon: `${F}/demolition.svg`, domains: ["mental"] },
  { code: "medTech", label: "Medtech", attribute: "intelligence", icon: `${F}/biotech.svg`, domains: ["mental"] },
  { code: "science", label: "Science", attribute: "intelligence", icon: `${F}/skills.svg`, domains: ["mental"] },
  { code: "perception", label: "Perception", attribute: "intelligence", icon: `${F}/skills.svg`, domains: ["mental"] },
  { code: "tactics", label: "Tactics", attribute: "intelligence", icon: `${F}/skills.svg`, domains: ["mental"] },
  { code: "technician", label: "Technician", attribute: "intelligence", icon: `${F}/engineering.svg`, domains: ["mental"] },
  { code: "tracking", label: "Tracking", attribute: "intelligence", icon: `${F}/tracking.svg`, domains: ["physical", "mental"] },
  { code: "navigation", label: "Navigation", attribute: "intelligence", icon: `${F}/piloting-other.svg`, domains: ["mental"] },
  // Guts
  { code: "administration", label: "Administration", attribute: "willpower", icon: `${F}/knowledge.svg`, domains: ["social", "mental"] },
  { code: "animalHandling", label: "Animal Handling", attribute: "willpower", icon: `${F}/animals.svg`, domains: ["physical", "mental"] },
  { code: "survival", label: "Survival", attribute: "willpower", icon: `${F}/survival.svg`, domains: ["physical", "mental"] },
  // Charisma
  { code: "acting", label: "Acting", attribute: "charisma", icon: `${F}/con-art.svg`, domains: ["social"] },
  { code: "disguise", label: "Disguise", attribute: "charisma", icon: `${F}/disguise.svg`, domains: ["social", "mental"] },
  { code: "leadership", label: "Leadership", attribute: "charisma", icon: `${F}/psychology.svg`, domains: ["social"] },
  { code: "negotiation", label: "Negotiation", attribute: "charisma", icon: `${F}/negotiation.svg`, domains: ["social"] },
  { code: "etiquette", label: "Etiquette", attribute: "charisma", icon: `${F}/etiquette.svg`, domains: ["social"] },
  { code: "streetwise", label: "Streetwise", attribute: "charisma", icon: `${F}/etiquette2.svg`, domains: ["social"] },
  { code: "intimidation", label: "Intimidation", attribute: "charisma", icon: `${F}/intimidation.svg`, domains: ["social", "mental"] }
].map(fa);
function fa(r) {
  return {
    ...r,
    label: r.label ?? r.code,
    icon: r.icon ?? `${Et}/icons/skills/skills.svg`
  };
}
function Ze(r) {
  return Cs.find((e) => e.code === r);
}
function os() {
  return [...Cs].sort((r, e) => r.label.localeCompare(e.label));
}
function ga(r) {
  const e = Math.ceil(r.length / 2);
  return { left: r.slice(0, e), right: r.slice(e) };
}
function ya(r) {
  var e, t;
  r.skills ?? (r.skills = {});
  for (const s of Cs) {
    const i = (e = r.skills)[t = s.code] ?? (e[t] = {});
    i.rating == null && (i.rating = 0);
  }
}
function ba(r) {
  const e = os(), { left: t, right: s } = ga(e), i = (a) => {
    var m, p, h, y, w, g;
    const n = a.code, o = a.attribute, l = Number(((p = (m = r == null ? void 0 : r.skills) == null ? void 0 : m[n]) == null ? void 0 : p.rating) ?? 0), c = Number(((y = (h = r == null ? void 0 : r.attributes) == null ? void 0 : h[o]) == null ? void 0 : y.value) ?? 0), u = Number(((g = (w = r == null ? void 0 : r.skills) == null ? void 0 : w[n]) == null ? void 0 : g.bonus) ?? 0), d = c + l + u;
    return {
      code: n,
      label: a.label,
      icon: a.icon,
      attribute: o,
      attributeLabel: j != null && j.localizeAttribute ? j.localizeAttribute(o) : o,
      rating: l,
      base: c,
      bonus: u,
      total: d,
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
const xs = Object.freeze({
  weapon: f.itemType.personalWeapon,
  shadowamp: f.itemType.assetModule
}), gi = Object.freeze({
  contact: "systems/mwd/img/default/mystery-man.svg",
  gear: "systems/mwd/img/default/Default_Gear.svg",
  quality: "systems/mwd/img/default/card-joker.svg",
  assetModule: "systems/mwd/img/default/upgrade.svg",
  skill: "systems/mwd/img/default/Default_Skill.svg",
  lifeModule: "systems/mwd/img/default/book.svg",
  mechWeapon: "systems/mwd/img/default/Default_Weapon.svg",
  personalWeapon: "systems/mwd/img/colt-m1911.svg",
  armor: "systems/mwd/img/default/Default_Armor.svg"
}), et = Object.freeze(["close", "near", "far", "extreme"]), Ws = Object.freeze({
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
});
function _t(r) {
  return Ms(r);
}
function yi(r) {
  return r === "long" ? "extreme" : r === "short" ? "close" : r === "medium" ? "near" : et.includes(r) ? r : "near";
}
function yt(r) {
  return {
    max: yi((r == null ? void 0 : r.max) ?? "near"),
    close: Number((r == null ? void 0 : r.close) ?? (r == null ? void 0 : r.short) ?? 0) || 0,
    near: Number((r == null ? void 0 : r.near) ?? (r == null ? void 0 : r.medium) ?? 0) || 0,
    far: Number((r == null ? void 0 : r.far) ?? (r == null ? void 0 : r.long) ?? 0) || 0,
    extreme: Number((r == null ? void 0 : r.extreme) ?? 0) || 0
  };
}
function Hs(r) {
  return {
    close: Number((r == null ? void 0 : r.close) ?? (r == null ? void 0 : r.short) ?? 0) || 0,
    near: Number((r == null ? void 0 : r.near) ?? (r == null ? void 0 : r.medium) ?? 0) || 0,
    far: Number((r == null ? void 0 : r.far) ?? (r == null ? void 0 : r.long) ?? 0) || 0,
    extreme: Number((r == null ? void 0 : r.extreme) ?? 0) || 0
  };
}
function wa(r) {
  const e = et.indexOf(r);
  return e >= 0 ? e : et.indexOf("near");
}
function Aa(r = yt({})) {
  const e = ["near", "close", "far", "extreme"], t = wa(r.max);
  return e.find((s) => et.indexOf(s) <= t) ?? "close";
}
function Ta(r) {
  const e = yi(r == null ? void 0 : r.max), t = et.indexOf(e);
  return et.map((s, i) => ({
    key: s,
    allowed: t >= 0 ? i <= t : i === 0,
    value: (r == null ? void 0 : r[s]) ?? void 0,
    labelkey: j.getFromList(j.getEnums().ranges, s)
  }));
}
function ka(r, e, t, s) {
  let i = Number(e);
  if (t)
    if (s !== void 0)
      i += Math.ceil(Number(s) / 2);
    else
      return console.warn("Weapon not attached to an actor"), se.item.personalWeapon.weaponWithoutActor;
  return i;
}
function Sa(r, e, t) {
  let s = "";
  return t && se.attributes[t] && (s += se.attributes[t].substring(0, 3).toUpperCase() + "/2 + "), s += String(e), s;
}
function Ma(r, e) {
  return C.useArmor(r) ? e ? "noArmor" : "withArmor" : "";
}
function Bs(r) {
  const e = game.system.mwd.skills.get(r);
  if (!e)
    return {
      img: gi.skill,
      system: {
        code: r,
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
function va(r) {
  const e = String(r ?? "").trim();
  return !!(!e || e.startsWith("icons/svg/") || e === "icons/mystery-man.svg");
}
var vt, $e, ls, bi, $t;
const be = class be extends Item {
  static init() {
    W(this, vt) || (ye(this, vt, !0), Hooks.on("createItem", (e, t, s) => {
      var i, a;
      Promise.resolve((i = e.onCreateItem) == null ? void 0 : i.call(e, t, s)).catch((n) => {
        console.error(`${Y}Item create hook failed`, n);
      }), _(a = be, $e, ls).call(a, e);
    }), Hooks.on("updateItem", (e) => {
      var t;
      _(t = be, $e, ls).call(t, e);
    }), Hooks.on("deleteItem", (e) => {
      var t;
      _(t = be, $e, bi).call(t, e);
    }), Hooks.on("createActiveEffect", (e) => {
      var t;
      _(t = be, $e, $t).call(t, e);
    }), Hooks.on("updateActiveEffect", (e) => {
      var t;
      _(t = be, $e, $t).call(t, e);
    }), Hooks.on("deleteActiveEffect", (e) => {
      var t;
      _(t = be, $e, $t).call(t, e);
    }));
  }
  static canonicalType(e) {
    return xs[e] ?? e;
  }
  static defaultIconForType(e) {
    return gi[this.canonicalType(e)];
  }
  get canonicalType() {
    return this.constructor.canonicalType(this.type);
  }
  async onCreateItem(e, t) {
  }
  async _preCreate(e, t, s) {
    super._preCreate && await super._preCreate(e, t, s);
    const i = (e == null ? void 0 : e.type) ?? this.type, a = this.constructor.canonicalType(i), n = {};
    if (i !== a && xs[i] && (n.type = a), va((e == null ? void 0 : e.img) ?? this.img)) {
      const o = this.constructor.defaultIconForType(a);
      o && (n.img = o);
    }
    a === f.itemType.lifeModule && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (n.name = "MWD.itemType.singular.lifeModule"), Object.keys(n).length && this.updateSource(n);
  }
  async _preUpdate(e, t, s) {
    var o, l;
    if (super._preUpdate && await super._preUpdate(e, t, s), !this.isSkill()) return;
    const i = (o = e == null ? void 0 : e.system) == null ? void 0 : o.code;
    if (i === void 0) return;
    const a = this.system.code;
    if (i === a) return;
    const n = Bs(i);
    n && ((l = n == null ? void 0 : n.system) == null || delete l.code, foundry.utils.mergeObject(e, n, { inplace: !0 }));
  }
  prepareBaseData() {
    super.prepareBaseData();
    const e = this.canonicalType;
    e === f.itemType.personalWeapon ? this._preparePersonalWeaponBaseData() : e === f.itemType.armor && this._prepareArmorBaseData();
  }
  _preparePersonalWeaponBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = Je(e.damageType), e.attackRatingBand = Hs(e.attackRatingBand), e.range = yt(e.range), e.traits = _t(e.traits), e.notes = String(e.notes ?? "").trim();
  }
  _prepareArmorBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.rating = Math.max(0, Number(e.rating ?? 0)), e.defenseBonus = Number(e.defenseBonus ?? 0) || 0, e.mitigationByType = Mt(e.mitigationByType ?? e.mitigation), delete e.mitigation, e.durability ?? (e.durability = {}), e.durability.max = Math.max(0, Number(e.durability.max ?? e.rating ?? 0)), e.durability.current = Math.min(
      e.durability.max,
      Math.max(0, Number(e.durability.current ?? e.durability.max ?? e.rating ?? 0))
    ), e.tags = as(e.tags), e.traits = _t(e.traits), e.notes = String(e.notes ?? "").trim();
  }
  getAttributes() {
    return [];
  }
  getUsableAttributes() {
    return this.isActive() ? this.getAttributes() : [];
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
    return [f.itemType.mechWeapon, f.itemType.personalWeapon].includes(this.canonicalType);
  }
  isPersonalWeapon() {
    return this.canonicalType === f.itemType.personalWeapon;
  }
  isArmor() {
    return this.canonicalType === f.itemType.armor;
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
      var i, a;
      const s = (a = (i = t.flags) == null ? void 0 : i[S]) == null ? void 0 : a[be.EQUIPPED_EFFECT_FLAG];
      return (s == null ? void 0 : s.sourceItemId) === this.id;
    }) : [];
  }
  async removeSyncedActorEffects({ actor: e = this.actor } = {}) {
    const t = this.getSyncedActorEffects({ actor: e });
    return !t.length || !e ? [] : e.deleteEmbeddedDocuments("ActiveEffect", t.map((s) => s.id));
  }
  async syncEquippedActorEffects({ actor: e = this.actor } = {}) {
    var m, p, h, y;
    if (!e || !this.supportsEquippedEffectSync()) return { created: [], updated: [], deleted: [] };
    const t = this.getSyncedActorEffects({ actor: e }), s = Array.from(((m = this.effects) == null ? void 0 : m.contents) ?? []);
    if (!this.shouldApplyEquippedEffects()) {
      if (!t.length) return { created: [], updated: [], deleted: [] };
      const w = await e.deleteEmbeddedDocuments("ActiveEffect", t.map((g) => g.id));
      return { created: [], updated: [], deleted: w };
    }
    const i = /* @__PURE__ */ new Map();
    for (const w of t) {
      const g = (y = (h = (p = w.flags) == null ? void 0 : p[S]) == null ? void 0 : h[be.EQUIPPED_EFFECT_FLAG]) == null ? void 0 : y.sourceEffectId;
      if (!g) continue;
      const A = i.get(g) ?? [];
      A.push(w), i.set(g, A);
    }
    const a = [], n = [], o = [], l = new Set(s.map((w) => w.id));
    for (const [w, g] of i.entries()) {
      if (!l.has(w)) {
        o.push(...g.map((A) => A.id));
        continue;
      }
      g.length > 1 && o.push(...g.slice(1).map((A) => A.id));
    }
    for (const w of s) {
      const A = (i.get(w.id) ?? [])[0] ?? null, M = this._prepareSyncedActorEffectData(w);
      A ? n.push({ _id: A.id, ...M }) : a.push(M);
    }
    const c = o.length ? await e.deleteEmbeddedDocuments("ActiveEffect", o) : [], u = n.length ? await e.updateEmbeddedDocuments("ActiveEffect", n) : [];
    return { created: a.length ? await e.createEmbeddedDocuments("ActiveEffect", a) : [], updated: u, deleted: c };
  }
  _prepareSyncedActorEffectData(e) {
    const t = e.toObject();
    delete t._id;
    const s = String(e.name ?? "Effect").trim() || "Effect", i = String(this.name ?? "Item").trim() || "Item", a = s.startsWith(i) ? s : `${i}: ${s}`;
    return t.name = a, t.transfer = !1, t.origin = e.uuid ?? this.uuid ?? t.origin ?? null, t.flags = foundry.utils.mergeObject(t.flags ?? {}, {
      [S]: {
        [be.EQUIPPED_EFFECT_FLAG]: {
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
    return this.canonicalType === f.itemType.skill;
  }
  isActive() {
    return !this.system.inactive;
  }
  async rollAttribute(e) {
    this.parent && await We.itemAttributeRoll(this, e);
  }
  async switchMonitorCheck(e, t, s, i = void 0) {
    await C.switchMonitorCheck(this.parent, e, t, s, i, this);
  }
  async setCounter(e, t) {
    await C.setCounter(this, e, t);
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
    B.reindexIds(t), await this.update({ "system.modifiers": t });
  }
  getCombatProfile() {
    if (!this.isPersonalWeapon()) return null;
    const e = this.system ?? {}, t = yt(e.range), s = String(e.skill ?? "").trim(), i = Ze(s), a = Number(e.damage ?? 0) || 0, n = Number(e.ap ?? e.armorPiercing ?? 0) || 0, o = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", l = _t(e.traits), c = mi(l);
    return {
      id: this.id ?? "weapon",
      uuid: this.uuid ?? null,
      name: this.name ?? "Weapon",
      img: this.img,
      item: this,
      type: this.canonicalType,
      equipped: !!e.equipped,
      isPrimary: !!e.isPrimary,
      category: o,
      skill: s || "firearms",
      skillDef: i,
      damage: a,
      ap: n,
      damageType: Je(e.damageType),
      attackRatingBand: Hs(e.attackRatingBand),
      range: t,
      defaultRangeBand: this.getDefaultRangeBand(t),
      traits: l,
      effects: c,
      notes: String(e.notes ?? e.description ?? "").trim()
    };
  }
  getArmorProfile({ actor: e = this.actor } = {}) {
    var c, u;
    if (!this.isArmor()) return null;
    const t = this.system ?? {}, s = Math.max(0, Number(t.rating ?? 0)), i = Math.max(0, Number(((c = t == null ? void 0 : t.durability) == null ? void 0 : c.max) ?? s)), a = Math.min(
      i,
      Math.max(0, Number(((u = t == null ? void 0 : t.durability) == null ? void 0 : u.current) ?? i))
    ), n = Mt((t == null ? void 0 : t.mitigationByType) ?? (t == null ? void 0 : t.mitigation)), o = as(t == null ? void 0 : t.tags), l = vs(a);
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
      currentArmorRating: a,
      baseMitigation: l,
      baseResistance: l,
      mitigationByType: n,
      tags: o,
      isDestroyed: a <= 0,
      durability: {
        current: a,
        max: i
      },
      traits: _t(t.traits),
      notes: String(t.notes ?? "").trim()
    };
  }
  getDefaultRangeBand(e = yt(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    return Aa(e);
  }
  isWeaponSkill(e) {
    return ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === f.itemType.skill && e.system.code === this.system.skill;
  }
  getWeaponSkill() {
    var s;
    const e = (s = this.actor) == null ? void 0 : s.items.find((i) => this.isWeaponSkill(i));
    if (e) return e;
    const t = game.items.find((i) => this.isWeaponSkill(i));
    return t || Bs(this.system.skill);
  }
  getDefense() {
    if (!this.isPersonalWeapon())
      return this.system.defense ? ae.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return ae.fixedDefenseCode(this.system.defense);
    const e = Ze(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? ae.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent) return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0;
    return {
      value: ka(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: this.system.damageType,
      damageTypeLabel: this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: Ma(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  getDamageCode() {
    return Sa(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  getDamageTypeLabel() {
    if (this.isPersonalWeapon())
      return dt(this.system.damageType);
    const e = se.mwd.weaponDamageType[this.system.damageType] ?? se.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return Ta(yt(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  validateTargets(e) {
    var n;
    const t = (n = this.getDamage()) == null ? void 0 : n.monitor, s = _e.getTargetTokens(game.user), i = s.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), a = s.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (a.length > 0) {
      const o = Z(se.common.errors.ignoredTargets, {
        targets: a.reduce(B.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (i.length === 0) {
      const o = Z(se.common.errors.noTargetSelected, {
        weapon: this.name ?? se.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(i);
    return i;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, s = Ws[t] ?? {};
    tt.checkTargetsCount(s.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), s = Ws[t] ?? {};
    return s.targets && s.adjust && e <= s.targets ? s.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area === "" ? f.area.none : this.system.area ?? f.area.none;
  }
  _getMonitor() {
    return this.isPersonalWeapon() ? f.monitors.physical : this.system.monitor || f.monitors.physical;
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
        label: this.system.specialization ? `${this.name}: ${this.system.specialization}` : this.name,
        callback: (e) => e.actor.rollSkill(this, this.system.specialization)
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
vt = new WeakMap(), $e = new WeakSet(), ls = async function(e) {
  if (typeof (e == null ? void 0 : e.syncEquippedActorEffects) == "function")
    try {
      await e.syncEquippedActorEffects();
    } catch (t) {
      console.error(`${Y}Failed to sync equipped item effects`, { item: e, error: t });
    }
}, bi = async function(e) {
  if (typeof (e == null ? void 0 : e.removeSyncedActorEffects) == "function")
    try {
      await e.removeSyncedActorEffects({ actor: e.actor ?? e.parent ?? null });
    } catch (t) {
      console.error(`${Y}Failed to remove synced item effects`, { item: e, error: t });
    }
}, $t = async function(e) {
  const t = e == null ? void 0 : e.parent;
  if (typeof (t == null ? void 0 : t.syncEquippedActorEffects) == "function")
    try {
      await t.syncEquippedActorEffects();
    } catch (s) {
      console.error(`${Y}Failed to sync parent item effects`, { effect: e, error: s });
    }
}, fe(be, $e), fe(be, vt, !1), v(be, "RANGE_ORDER", et), v(be, "EQUIPPED_EFFECT_FLAG", "equippedItemSync"), v(be, "DEFAULT_UNARMED", Object.freeze({
  id: "unarmed",
  name: "Unarmed",
  category: "melee",
  skill: "meleeCombat",
  damage: 1,
  ap: 0,
  damageType: "concussive",
  attackRatingBand: { close: 0, near: 0, far: 0, extreme: 0 },
  range: { max: "close", close: 0, near: 0, far: 0, extreme: 0 },
  traits: [],
  notes: ""
}));
let ct = be;
class Gt extends ct {
  static get defaultIcon() {
    return "systems/mwd/img/default/Default_Skill.svg";
  }
  static prepareSkill(e) {
    const t = game.system.mwd.skills.get(e);
    if (!t)
      return {
        img: this.defaultIcon,
        system: {
          code: e,
          attribute: ""
          // keep only what Destiny uses
        }
      };
    const s = {
      img: t.icon,
      system: {
        code: t.code,
        attribute: t.attribute
      }
    };
    return t.code !== "knowledge" && (s.name = t.label), s;
  }
  isKnowledgeSkill() {
    return this.system.code == "knowledge";
  }
  isGeneralSkill() {
    return this.system.code != "knowledge";
  }
  prepareShortcut() {
    return {
      img: this.img,
      label: this.system.specialization ? `${this.name}: ${this.system.specialization}` : this.name,
      callback: (e) => e.actor.rollSkill(this, this.system.specialization)
    };
  }
  /** @override */
  async _preUpdate(e, t, s) {
    var o, l, c;
    await ((o = super._preUpdate) == null ? void 0 : o.call(this, e, t, s));
    const i = (l = e == null ? void 0 : e.system) == null ? void 0 : l.code;
    if (i === void 0) return;
    const a = this.system.code;
    if (i === a) return;
    const n = Gt.prepareSkill(i);
    n && ((c = n == null ? void 0 : n.system) == null || delete c.code, foundry.utils.mergeObject(e, n, { inplace: !0 }));
  }
}
const Fs = {
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
}, Ca = {
  code: "weapon-range",
  options: {
    flags: { editable: !0 },
    order: 20,
    category: K.pool,
    labelkey: se.common.roll.modifiers.weaponRange,
    hbsTemplateRoll: `${O}/roll/parts/select-option.hbs`,
    hbsTemplateChat: void 0
    //``
  },
  isUsed: (r) => !0,
  condition: (r) => r.weapon,
  factory: (r) => {
    const e = r.weapon.getRanges(), t = e.map((s) => s.value);
    return {
      value: e[0].value,
      min: Math.min(...t),
      max: Math.max(...t),
      choices: e,
      selected: e[0].labelkey
    };
  }
}, Pa = {
  code: "weapon-area",
  options: {
    used: !0,
    order: 20,
    category: K.pool,
    labelkey: se.common.roll.modifiers.weaponArea,
    hbsTemplateRoll: `${O}/roll/parts/input-numeric.hbs`,
    hbsTemplateChat: void 0
    //``
  },
  isUsed: (r) => r.used,
  condition: (r) => r.weapon && r.weapon.getArea() != f.area.none,
  factory: (r) => {
    var s;
    const e = ((s = r.targeting.targetedTokenIds) == null ? void 0 : s.length) ?? 1, t = r.weapon.getAreaModifier(e);
    return {
      value: t,
      min: Math.min(0, t),
      max: Math.max(0, t),
      used: e > 1
    };
  }
}, Q = class Q extends ct {
  static init() {
    Hooks.once(ce.REGISTER_ROLL_PARAMETERS, (e) => {
      e(Pa), e(Ca);
    });
  }
  prepareBaseData() {
    if (super.prepareBaseData(), (this.canonicalType ?? this.type) !== f.itemType.personalWeapon) return;
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = Je(e.damageType), e.attackRatingBand = Q.normalizeAttackRatingBand(e.attackRatingBand), e.range = Q.normalizeRangeData(e.range), e.traits = Q.normalizeTraits(e.traits), e.notes = String(e.notes ?? "").trim();
  }
  static maxIndex(e) {
    const t = Q.RANGE_ORDER.indexOf(e);
    return t >= 0 ? t : Q.RANGE_ORDER.indexOf("near");
  }
  /**
    * Compute UI-friendly range band data:
    * - cap: normalized max band
    * - bands: [{key, allowed, value}]
    * - optimalKey: highest value among allowed (tie -> closest)
    */
  static getRangeBands(e) {
    const t = e ?? {}, s = Q.normalizeRangeKey(t.max ?? "near"), i = Q.maxIndex(s), a = Q.RANGE_ORDER.map((l, c) => ({
      key: l,
      allowed: c <= i,
      value: Number(t[l] ?? (l === "extreme" && t.long !== void 0 ? t.long : 0))
    }));
    let n = "close", o = -1 / 0;
    for (const l of a)
      l.allowed && l.value > o && (o = l.value, n = l.key);
    return { cap: s, bands: a, optimalKey: n };
  }
  static get defaultIcon() {
    return "systems/mwd/img/colt-m1911.svg";
  }
  static defaultIconForType(e) {
    return e === f.itemType.mechWeapon ? "systems/mwd/img/default/Default_Weapon.svg" : this.defaultIcon;
  }
  static normalizeTraits(e) {
    return Ms(e);
  }
  static normalizeRangeData(e) {
    return {
      max: Q.normalizeRangeKey((e == null ? void 0 : e.max) ?? "near"),
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
    const e = this.system ?? {}, t = this.canonicalType ?? this.type, s = Q.normalizeRangeData(e.range), i = String(e.skill ?? "").trim(), a = Ze(i), n = Number(e.damage ?? 0) || 0, o = Number(e.ap ?? e.armorPiercing ?? 0) || 0, l = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", c = Q.normalizeTraits(e.traits), u = mi(c);
    return {
      id: this.id ?? "weapon",
      uuid: this.uuid ?? null,
      name: this.name ?? "Weapon",
      img: this.img,
      item: this,
      type: t,
      equipped: !!e.equipped,
      isPrimary: !!e.isPrimary,
      category: l,
      skill: i || "firearms",
      skillDef: a,
      damage: n,
      ap: o,
      damageType: t === f.itemType.personalWeapon ? Je(e.damageType) : String(e.damageType ?? "kinetic").trim() || "kinetic",
      attackRatingBand: Q.normalizeAttackRatingBand(e.attackRatingBand),
      range: s,
      defaultRangeBand: this.getDefaultRangeBand(s),
      traits: c,
      effects: t === f.itemType.personalWeapon ? u : {},
      notes: String(e.notes ?? e.description ?? "").trim()
    };
  }
  getDefaultRangeBand(e = Q.normalizeRangeData(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    const s = ["near", "close", "far", "extreme"], i = Q.maxIndex(e.max);
    return s.find((a) => Q.RANGE_ORDER.indexOf(a) <= i) ?? "close";
  }
  isWeaponSkill(e) {
    return e.type == "skill" && e.system.code === this.system.skill;
  }
  getWeaponSkill() {
    var s;
    const e = (s = this.actor) == null ? void 0 : s.items.find((i) => this.isWeaponSkill(i));
    if (e)
      return e;
    const t = game.items.find((i) => this.isWeaponSkill(i));
    return t || Gt.prepareSkill(this.system.skill);
  }
  getDefense() {
    if ((this.canonicalType ?? this.type) !== f.itemType.personalWeapon)
      return this.system.defense ? ae.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return ae.fixedDefenseCode(this.system.defense);
    const e = Ze(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? ae.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent)
      return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0;
    return {
      value: Q.damageValue(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: this.system.damageType,
      damageTypeLabel: this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: Q.armorMode(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  static damageValue(e, t, s, i) {
    if (t = Number(t), s)
      if (i !== void 0)
        t = t + Math.ceil(Number(i) / 2);
      else
        return console.warn("Weapon not attached to an actor"), se.item.personalWeapon.weaponWithoutActor;
    return t;
  }
  getDamageCode() {
    return Q.damageCode(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  static damageCode(e, t, s) {
    let i = "";
    return s && se.attributes[s] && (i += se.attributes[s].substring(0, 3).toUpperCase() + "/2 + "), i += String(t), i;
  }
  static armorMode(e, t) {
    return C.useArmor(e) ? t ? "noArmor" : "withArmor" : "";
  }
  getDamageTypeLabel() {
    if ((this.canonicalType ?? this.type) === f.itemType.personalWeapon)
      return dt(this.system.damageType);
    const e = se.mwd.weaponDamageType[this.system.damageType] ?? se.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return Q.getRangeList(Q.normalizeRangeData(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  _getRange(e) {
    return { value: this.system.range[e], labelkey: j.getFromList(j.getEnums().ranges, e) };
  }
  static getRangeList(e) {
    const t = Q.normalizeRangeKey(e == null ? void 0 : e.max), s = Q.RANGE_ORDER.indexOf(t);
    return Q.RANGE_ORDER.map((i, a) => ({
      key: i,
      allowed: s >= 0 ? a <= s : a === 0,
      value: (e == null ? void 0 : e[i]) ?? (i === "extreme" && (e == null ? void 0 : e.long) !== void 0 ? e.long : void 0),
      labelkey: j.getFromList(j.getEnums().ranges, i)
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
    const t = (n = this.getDamage()) == null ? void 0 : n.monitor, s = _e.getTargetTokens(game.user), i = s.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), a = s.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (a.length > 0) {
      const o = Z(se.common.errors.ignoredTargets, {
        targets: a.reduce(B.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (i.length == 0) {
      const o = Z(se.common.errors.noTargetSelected, {
        weapon: this.name ?? se.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(i);
    return i;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, s = Fs[t] ?? {};
    tt.checkTargetsCount(s.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), s = Fs[t] ?? {};
    return s.targets && s.adjust && e <= s.targets ? s.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area == "" ? f.area.none : this.system.area ?? f.area.none;
  }
  _getMonitor() {
    return (this.canonicalType ?? this.type) === f.itemType.personalWeapon ? f.monitors.physical : this.system.monitor || f.monitors.physical;
  }
};
v(Q, "RANGE_ORDER", ["close", "near", "far", "extreme"]), v(Q, "DEFAULT_UNARMED", Object.freeze({
  id: "unarmed",
  name: "Unarmed",
  category: "melee",
  skill: "meleeCombat",
  damage: 1,
  ap: 0,
  damageType: "concussive",
  attackRatingBand: { close: 0, near: 0, far: 0, extreme: 0 },
  range: { max: "close", close: 0, near: 0, far: 0, extreme: 0 },
  traits: [],
  notes: ""
}));
let Ie = Q;
function Ea(r) {
  const e = [];
  for (let [t, s] of Object.entries(r ?? {}))
    s !== void 0 && (t = t.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (i, a) => (a ? "-" : "") + i.toLowerCase()), e.push(`data-${t}="${Handlebars.escapeExpression(s)}"`));
  return new Handlebars.SafeString(e.join(" "));
}
function Ra({ hash: r }) {
  return r;
}
function Na() {
  var r, e;
  return ((e = (r = foundry == null ? void 0 : foundry.applications) == null ? void 0 : r.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
class Ps {
  constructor() {
    this.registerHelpers(), Hooks.once("init", () => {
      this.registerHelpers(), console.log(`${Y}Handlebars helpers registered (init)`);
    }), console.log(`${Y}Handlebars helpers registered (ctor)`);
  }
  registerHelpers() {
    const e = Na(), t = {
      // Foundry utils
      getProperty: foundry.utils.getProperty,
      // DND5E-inspired utilities
      "mwd-dataset": Ea,
      "mwd-object": Ra,
      // Simple comparisons
      eq: (s, i) => s === i,
      ne: (s, i) => s !== i,
      // Strings/arrays
      concat: (...s) => B.join(s.slice(0, -1)),
      join: (s, i = " ") => Array.isArray(s) ? s.join(i) : "",
      includes: (s, i) => s == null ? void 0 : s.includes(i),
      length: (s) => (s == null ? void 0 : s.length) || 0,
      substring: (s, i, a) => s == null ? void 0 : s.substring(i, a),
      toUpperCase: Zi.toUpperCaseNoAccent,
      // Math
      modulo: (s, i) => s % i,
      divint: B.divint,
      divup: B.divup,
      sum: (s, i) => s + i,
      diff: (s, i) => s - i,
      times: (s, i) => s * i,
      min: (s, i) => Math.min(s, i),
      max: (s, i) => Math.max(s, i),
      // Utility blocks
      for: Ps.hbsForLoop,
      // fixes “Missing helper: for”
      range: (s, i) => Array.from({ length: i - s + 1 }, (a, n) => s + n),
      ifGte: (s, i, a) => s >= i ? a.fn(this) : a.inverse(this),
      // Damage / weapons (legacy-compatible)
      weaponDamageLetter: Xi.letter,
      weaponDamageCode: Ie.damageCode,
      weaponDamageValue: Ie.damageValue,
      weaponArmorMode: Ie.armorMode,
      weaponRangeList: Ie.getRangeList,
      // Icons
      iconFA: N.fontAwesome,
      iconSrc: N.iconSystemPath,
      iconPath: N.iconPath,
      iconD6: N.iconD6,
      // Enums
      localizeAttribute: j.localizeAttribute
    };
    e.registerHelper(t), e !== Handlebars && Handlebars.registerHelper(t);
  }
  static hbsForLoop(e, t, s) {
    let i = "";
    for (let a = e; a < t; ++a) i += s.fn(a);
    return i;
  }
}
const Gs = "sheetTheme", cs = "mwd-theme-default", Da = "mwd-theme-sra", Oa = [
  { name: "Default (CSB)", cssClass: cs },
  { name: "SRA", cssClass: Da }
];
class _a {
  constructor() {
    this.availableStyles = {}, Xe.register(ce.REGISTER_STYLES), Hooks.once(ce.REGISTER_STYLES, (e) => Oa.forEach((t) => e(t.cssClass, t.name))), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(ce.REGISTER_STYLES, (e, t) => this.availableStyles[e] = t), console.log(Y + "Loaded styles", this.availableStyles), game.settings.register(S, Gs, {
      scope: "world",
      name: "Sheet Theme",
      hint: "Select the visual theme used by MWD sheets.",
      config: !0,
      default: cs,
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
    const e = game.settings.get(S, Gs);
    return this.availableStyles[e] ? e : cs;
  }
}
const us = "damage-mode", Ia = `${S}.${us}`, It = {}, Kt = {};
class G {
  static init() {
    Xe.register(ce.PROVIDE_DAMAGE_MODE), Hooks.on("updateSetting", async (e, t, s, i) => G.onUpdateSetting(e, t, s, i)), Hooks.on(ce.PROVIDE_DAMAGE_MODE, (e) => {
      e("resistanceArmorMonitor", b.settings.damageMode.values.resistanceArmorMonitor, G.sufferDamageResistanceArmorMonitor), e("armorResistanceMonitor", b.settings.damageMode.values.armorResistanceMonitor, G.sufferDamageArmorResistanceMonitor), e("armorGivesResistance", b.settings.damageMode.values.armorGivesResistance, G.sufferDamageArmorAsResistance_Earthdawn), e("armorGiveResistanceHitsAvoid", b.settings.damageMode.values.armorGiveResistanceHitsAvoid, G.sufferDamageArmorAsResistance_Cyberpunk);
    }), Hooks.once("ready", () => G.onReady());
  }
  static onReady() {
    G._registerDamageModeSetting(), G._selectDamageMode();
  }
  static _registerDamageModeSetting() {
    Hooks.callAll(ce.PROVIDE_DAMAGE_MODE, (e, t, s) => {
      It[e] = t, Kt[e] = s;
    }), game.settings.register(S, us, {
      scope: "world",
      name: b.settings.damageMode.name,
      hint: b.settings.damageMode.hint,
      config: !0,
      default: Object.keys(It)[0],
      choices: It,
      type: String
    });
  }
  static async onUpdateSetting(e, t, s, i) {
    e.key == Ia && G._selectDamageMode();
  }
  static _selectDamageMode() {
    let e = game.settings.get(S, us);
    Kt[e] || (e = Object.keys(It)[0]), G.damageModeCode = e, G.damageModeMethod = Kt[e];
  }
  static async sufferDamage(e, t, s, i, a, n, o) {
    const { monitor: l, damageType: c } = G._resolveDamageContext(e, t, o);
    if (tt.checkActorCanReceiveDamage(c ?? l, l, e), G._shouldUsePersonalDamageV2(e, l, o)) {
      await G.sufferPersonalDamageV2(e, l, c, s, i, a, n, o);
      return;
    }
    await (G.damageModeMethod ?? G.sufferDamageResistanceArmorMonitor)(e, l, c, s, i, a, n), await e.applyArmorDamage(l, c, U.sumModifiers([o], "other", "damageArmor"));
  }
  static _shouldUsePersonalDamageV2(e, t, s) {
    var i, a;
    return !((i = e == null ? void 0 : e.isCharacterLike) != null && i.call(e)) || ![f.monitors.physical, f.monitors.fatigue].includes(t) ? !1 : !!((a = s == null ? void 0 : s.isPersonalWeapon) != null && a.call(s) || (s == null ? void 0 : s.canonicalType) === f.itemType.personalWeapon || (s == null ? void 0 : s.type) === f.itemType.personalWeapon);
  }
  static async sufferPersonalDamageV2(e, t, s, i, a, n, o, l) {
    var J, z, X;
    const c = ((J = l == null ? void 0 : l.getCombatProfile) == null ? void 0 : J.call(l)) ?? l ?? null, u = Je(s ?? (c == null ? void 0 : c.damageType)), d = Math.max(0, Number(i ?? (c == null ? void 0 : c.damage) ?? 0) || 0), m = Math.max(0, Number(a ?? 0) || 0), p = (c == null ? void 0 : c.effects) ?? {}, h = ((z = e.getPersonalCombatLoadout) == null ? void 0 : z.call(e, { refresh: !0 })) ?? null, y = (h == null ? void 0 : h.activeArmor) ?? null, w = Math.max(0, Number((y == null ? void 0 : y.currentArmorRating) ?? ((X = y == null ? void 0 : y.durability) == null ? void 0 : X.current) ?? 0) || 0);
    let g = d + m;
    const A = g, M = w > 0 ? oa({
      damageIncoming: g,
      armorTags: (y == null ? void 0 : y.tags) ?? [],
      effects: p
    }) : { damageIncoming: g, applied: [] };
    g = M.damageIncoming;
    const k = na({
      currentArmorRating: w,
      mitigationByType: (y == null ? void 0 : y.mitigationByType) ?? {},
      damageType: u
    }), D = 0, H = Math.max(
      0,
      (Number((c == null ? void 0 : c.ap) ?? 0) || 0) + (Number((p == null ? void 0 : p.ap) ?? 0) || 0)
    ), L = k.isDestroyed ? 0 : Math.max(0, k.baseMitigation + k.typeMitigationMod + D - H), V = Math.max(0, Math.ceil(g - L));
    V > 0 && await C.addCounter(e, t, V), await G._degradePersonalArmorOnHit(e, y), G._notifyPersonalArmorMitigation(e, {
      damageType: u,
      baseIncoming: A,
      adjustedIncoming: g,
      finalDamage: V,
      armorMitigation: k,
      effectiveAp: H,
      tagEffectResult: M
    });
  }
  static async _degradePersonalArmorOnHit(e, t) {
    var n, o, l, c;
    const s = (t == null ? void 0 : t.item) ?? ((o = (n = e == null ? void 0 : e.items) == null ? void 0 : n.get) == null ? void 0 : o.call(n, (t == null ? void 0 : t.id) ?? ""));
    if (!(s != null && s.id)) return;
    const i = Math.max(0, Number(((c = (l = s.system) == null ? void 0 : l.durability) == null ? void 0 : c.current) ?? 0) || 0), a = Math.max(0, i - 1);
    a !== i && await s.update({ "system.durability.current": a });
  }
  static _notifyPersonalArmorMitigation(e, t = {}) {
    var u;
    const s = t.armorMitigation ?? {}, i = G._localizeDamageType(t.damageType), a = s.isDestroyed ? "Armor destroyed" : `Base ${Number(s.baseMitigation ?? 0)} + Type ${Number(s.typeMitigationMod ?? 0)} - AP ${Number(t.effectiveAp ?? 0)}`, n = Number(t.adjustedIncoming ?? t.baseIncoming ?? 0), o = Number(t.finalDamage ?? 0), l = (((u = t.tagEffectResult) == null ? void 0 : u.applied) ?? []).map((d) => `${d.tag} +${Math.round((Number(d.bonus ?? 0) || 0) * 100)}%`).join(", "), c = l ? ` [${l}]` : "";
    ui.notifications.info(
      `${e.name} mitigated ${i}: ${a}${c}. Incoming ${n}, final ${o}.`
    );
  }
  static async sufferDamageResistanceArmorMonitor(e, t, s, i, a, n, o) {
    const l = C.resistanceDetail(e, t, s), c = l.value;
    let u = 0;
    if (n) {
      const d = Math.min(c, i), m = Math.min(c - d, a);
      u = i - d, C.useArmor(t) && (u -= await G.damageToArmor(e, s, u)), u += a - m;
    } else
      u = i + a - c, C.useArmor(t) && (u -= await G.damageToArmor(e, s, u));
    u > 0 && await C.addCounter(e, t, u), G._notifyResistanceUsage(e, t, s, l);
  }
  static async sufferDamageArmorResistanceMonitor(e, t, s, i, a, n, o) {
    let l = 0;
    C.useArmor(t) ? n ? (i -= await G.damageToArmor(e, s, i), l = a + i) : (l = a + i, l -= await G.damageToArmor(e, s, l)) : l = i + a;
    const c = C.resistanceDetail(e, t, s);
    return l -= c.value, l > 0 && await C.addCounter(e, t, l), G._notifyResistanceUsage(e, t, s, c), l;
  }
  static async sufferDamageArmorAsResistance_Cyberpunk(e, t, s, i, a, n, o) {
    let l = i + a;
    if (C.useArmor(t) && l > 0) {
      const u = n ? a : 0, d = Math.max(0, G._computeArmorResistance(e) - u);
      d > 0 && (await C.addCounter(e, "armor", 1), l -= d);
    }
    const c = C.resistanceDetail(e, t, s);
    return l -= c.value, l > 0 && await C.addCounter(e, t, l), G._notifyResistanceUsage(e, t, s, c), Math.max(l, 0);
  }
  static async sufferDamageArmorAsResistance_Earthdawn(e, t, s, i, a, n, o) {
    let l = i + a;
    if (C.useArmor(t) && !n && l > 0) {
      const u = G._computeArmorResistance(e);
      u > 0 && (await C.addCounter(e, "armor", 1), l -= u);
    }
    l -= G._computeStrengthResistance(e, t);
    const c = C.resistanceDetail(e, t, s);
    return l -= c.value, l > 0 && await C.addCounter(e, t, l), G._notifyResistanceUsage(e, t, s, c), l;
  }
  static async damageToArmor(e, t, s) {
    if (s > 0) {
      const i = C.max(e, f.monitors.armor), a = C.getCounterValue(e, f.monitors.armor), n = Math.min(i - a, s), o = C.resistance(e, f.monitors.armor, t), l = Math.max(0, n - o);
      return l > 0 && await C.addCounter(e, f.monitors.armor, l), n;
    } else
      return 0;
  }
  static _resolveDamageContext(e, t, s) {
    var o;
    const i = (typeof t == "object" ? (t == null ? void 0 : t.damageType) ?? (t == null ? void 0 : t.type) : t) ?? ((o = s == null ? void 0 : s.system) == null ? void 0 : o.damageType), a = typeof t == "object" ? (t == null ? void 0 : t.monitor) ?? i : i;
    return { monitor: e.getDamageMonitor(a), damageType: i };
  }
  static _notifyResistanceUsage(e, t, s, i) {
    var u;
    if (!i || t === void 0)
      return;
    const a = b.actor.monitors[t] ?? t, n = G._localizeDamageType(s) ?? a, o = i.usedType ? "type" : "default", l = ((u = b.actor.monitors.resistanceSources) == null ? void 0 : u[o]) ?? o, c = Z(b.actor.monitors.resistanceApplied, {
      actor: e.name,
      monitor: a,
      damageType: n,
      value: i.value,
      source: l
    });
    ui.notifications.info(c);
  }
  static _localizeDamageType(e) {
    if (e)
      return di(e) ? dt(e) : b.mwd.weaponDamageType[e] ?? b.mwd.personalDamageType[e] ?? b.actor.monitors[e] ?? e;
  }
  static _computeArmorResistance(e) {
    const t = C.max(e, "armor"), s = C.getCounterValue(e, "armor"), i = Math.max(0, t - s);
    return Math.max(0, Math.ceil(i / 3));
  }
  static _computeStrengthResistance(e, t) {
    const s = e.getAttributeValue(f.actorAttributes.strength);
    return Math.max(0, Math.floor(s / 4));
  }
}
class Ee extends Actor {
  static init() {
    Hooks.on("updateActor", (e, t, s, i) => {
      var a;
      return (a = _e.firstResponsible(e)) == null ? void 0 : a.onUpdateActor(t, s);
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
      const a = s.system.code === "knowledge" || s.system.attribute === "knowledge", n = i.system.code === "knowledge" || i.system.attribute === "knowledge";
      if (a && !n) return 1;
      if (!n && a) return -1;
      if (a && n)
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
    return [f.actorTypes.vehicle, f.actorTypes.battlemech].includes(this.type);
  }
  prepareData() {
    super.prepareData(), this._prepareEdgePools(), this.cleanupFavorites();
  }
  prepareDerivedData() {
    if (this.system.modifiers = {
      initiative: U.sumModifiers(this.items, "other", "initiative")
    }, this.system.monitors) {
      const e = j.getDamageTypes();
      Object.entries(this.system.monitors).forEach((t) => {
        t[1].resistance = Ee.normalizeResistance(t[1].resistance), t[1].maxBonus = U.sumMonitorModifiers(this.items, t[0], "max"), t[1].resistanceBonus = U.sumMonitorModifiers(this.items, t[0], "resistance"), t[1].resistanceBonusByType = Object.fromEntries(
          e.map((s) => [s.value, U.sumMonitorModifiers(this.items, t[0], "resistanceByType", s.value)]).filter(([, s]) => s)
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
    return lt[this.type] ?? [];
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
    const e = this.getAttributeValue(f.actorAttributes.edge), t = foundry.utils.getProperty(this.system, "counters.edgePools") ?? {};
    Object.values(f.counters.edgePools).forEach((i) => {
      const a = t[i] ?? {}, n = a.value;
      a.value = n ?? e ?? 0, a.value = Math.min(a.value, e ?? a.value ?? 0), a.max = e ?? a.max ?? 0, t[i] = a;
    }), foundry.utils.setProperty(this.system, "counters.edgePools", t);
  }
  async setCheckbarValue(e, t) {
    return await this.update({ [e]: t });
  }
  _getMonitorMax(e) {
    const t = this.getAttributeValue(e);
    return t == 0 ? 0 : ni + B.divup(t, 2);
  }
  getAttributeActions() {
    return ae.getActorActions(this);
  }
  getUsableAttributes(e = void 0) {
    const t = (e ? [e] : this.items).map((i) => i.getUsableAttributes()).reduce((i, a) => i.concat(a), []), s = B.distinct(this.getAttributes().concat(t));
    return s.sort(B.ascendingBySortedArray(j.sortedAttributeKeys)), s;
  }
  getAttributeValue(e, t = void 0) {
    let s = 0;
    if (e = this.getCorrespondingAttribute(e), e) {
      if (this.getAttributes().includes(e))
        s = this.system.attributes[e].value;
      else if (t)
        s = (t == null ? void 0 : t.getAttributeValue(e)) ?? 0;
      else {
        const i = this.items.filter((a) => a.isActive() && a.getAttributes().includes(e));
        if (i.length > 0) {
          const a = i.map((n) => n.getAttributeValue(e) ?? 0);
          s = Math.max(...a);
        }
      }
      s += U.sumModifiers(this.items, "attribute", e);
    }
    return s;
  }
  resolveDamageType(e) {
    switch (e) {
      case "stun":
        return f.monitors.fatigue;
    }
    return e;
  }
  getDamageMonitor(e) {
    e = this.resolveDamageType(e);
  }
  async applyArmorDamage(e, t, s = 0) {
    switch (e = this.resolveDamageType(e), e) {
      case f.monitors.physical:
      case f.monitors.fatigue:
        await G.damageToArmor(this, t, s);
    }
  }
  async rollAttribute(e) {
    await We.rollAttribute(this, e);
  }
  async rollAttributeAction(e) {
    const t = ae.getActorAction(this, e);
    await We.rollAttributeAction(this, t);
  }
  async rollSkill(e, t) {
    await We.rollSkill(this, e, t);
  }
  async rollWeapon(e) {
    var a, n, o;
    tt.checkWeaponDefense(e, this);
    const t = (a = e.validateTargets(this)) == null ? void 0 : a.map((l) => l.id), s = {
      attackerTokenId: (o = (n = game.scenes.current) == null ? void 0 : n.tokens.find((l) => {
        var c;
        return ((c = l.actor) == null ? void 0 : c.id) == this.id;
      })) == null ? void 0 : o.id,
      targetedTokenIds: t
    }, i = this.items.find((l) => e.isWeaponSkill(l));
    await We.rollWeapon(this, i, e, s);
  }
  async rollDefense(e) {
    const t = e.attack.defense, s = ae.getActorDefense(this, t);
    await We.rollDefense(this, s, e);
  }
  async switchMonitorCheck(e, t, s, i = void 0) {
    await C.switchMonitorCheck(this, e, t, s, i);
  }
  async addCounter(e, t, s = void 0) {
    await C.addCounter(this, e, t, s);
  }
  async setCounter(e, t, s = void 0) {
    await C.setCounter(this, e, t, s);
  }
  canSetMarks() {
    return !1;
  }
  getCyberdeck() {
  }
  canApplyDamage(e) {
    switch (e) {
      case f.monitors.physical:
      case f.monitors.fatigue:
        return this.getDamageMonitor(e) != null;
    }
    return !1;
  }
  canReceiveDamage(e) {
    return this.canApplyDamage(e);
  }
  async onEnterCombat() {
    const e = U.sumModifiers(this.items, "other", "sceneAnarchy");
    e > 0 && await C.setCounter(this, f.monitors.sceneAnarchy, e);
  }
  async onLeaveCombat() {
    await C.setCounter(this, f.monitors.sceneAnarchy, 0);
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
    var i, a;
    const e = this.hasGMAnarchy(), t = (a = (i = game.system) == null ? void 0 : i.anarchy) == null ? void 0 : a.gmAnarchy, s = e && t && typeof t.getAnarchy == "function" ? t.getAnarchy() : {
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
    await this.spendEdgePool(f.counters.social.credibility, e);
  }
  async spendRumor(e) {
    await this.spendEdgePool(f.counters.mental.rumor, e);
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
    var a, n;
    const t = this.getAttributeValue(f.actorAttributes.edge), i = ((n = (a = this.getEdgePools()) == null ? void 0 : a[e]) == null ? void 0 : n.value) ?? t ?? 0;
    return Math.min(i, t ?? i ?? 0);
  }
  getRemainingEdge(e = void 0) {
    return e ? this.getEdgePoolValue(e) : Math.max(0, ...Object.values(f.counters.edgePools).map((t) => this.getEdgePoolValue(t)));
  }
  canUseEdge() {
    return this.getAttributes().includes(f.actorAttributes.edge);
  }
  async spendEdgePool(e, t) {
    t != 0 && await C.addCounter(this, e, -t);
  }
  async spendEdge(e, t = f.counters.edgePools.grit) {
    if (e != 0) {
      if (!this.canUseEdge()) {
        const s = b.actorType[this.type] ?? this.type, i = `${this.name} (${s}) cannot use Edge`;
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
    return this.getSkillRating(s) + i + (t && s.system.specialization ? 2 : 0);
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
    const s = Ee._prepareFavorite(e, t);
    return !!this.system.favorites.find((i) => Ee._isSameFavorite(s, i));
  }
  static _prepareFavorite(e, t) {
    return { type: e, id: t };
  }
  static _isSameFavorite(e, t) {
    return e.id == t.id && e.type == t.type;
  }
  async switchFavorite(e, t, s) {
    const i = Ee._prepareFavorite(t, s), a = this.system.favorites.filter((n) => !Ee._isSameFavorite(i, n));
    e && a.push(i), this.update({ "system.favorites": a });
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
    const s = Ee._prepareFavorite(e, t);
    if (e == "attributeAction") {
      const a = ae.prepareShortcut(this, t);
      if (a)
        return foundry.utils.mergeObject(a, s);
    } else if (Object.values(f.itemType).includes(e)) {
      const a = (i = this.items.get(t)) == null ? void 0 : i.prepareShortcut();
      if (a)
        return foundry.utils.mergeObject(a, s);
    }
    return s;
  }
  async _onSetManualStepper(e, t) {
    var n, o;
    e == null || e.preventDefault();
    const s = (n = t == null ? void 0 : t.dataset) == null ? void 0 : n.id, i = Number((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.value);
    if (!s || Number.isNaN(i)) return;
    const a = this._mwd.state.manual.find((l) => l.id === s);
    if (a)
      return a.value = i, this.render(!1);
  }
}
const { ApplicationV2: $a, HandlebarsApplicationMixin: La } = foundry.applications.api, { renderTemplate: Us } = foundry.applications.handlebars, xa = `${O}/chat/celebrity-roll.hbs`, rt = class rt extends La($a) {
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
        label: b.actor.counters.edgePools.legend,
        value: e.getCelebrityValue()
      },
      modifiers: foundry.utils.mergeObject(
        { label: b.item.tabs.modifiers },
        U.computeModifiers(e.items, "other", "celebrity")
      ),
      other: {
        label: b.common.roll.modifiers.other,
        value: 0
      },
      ANARCHY: b
    }, s = await Us(`${O}/dialog/roll-celebrite-title.hbs`, t), i = {
      id: `roll-celebrity-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...rt.DEFAULT_OPTIONS.classes],
      window: { title: s }
    };
    return new rt({ roll: t }, i).render({ force: !0 });
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
      await rt.doRoll(this.roll), await this.close();
    }), s.find('[data-action="cancel"]').on("click", async () => {
      await this.close();
    });
  }
  static async doRoll(e) {
    const t = [
      e.celebrity,
      e.modifiers,
      e.other
    ], s = B.sumValues(t, (o) => o.value), i = {
      actor: e.actor,
      parameters: t,
      pool: s,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      },
      ANARCHY: b
    }, a = new Roll(`${s}d6cs>=5`);
    await a.evaluate();
    const n = await Us(xa, i);
    await a.toMessage({ flavor: n });
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
v(rt, "PARTS", {
  body: {
    template: `${O}/dialog/roll-celebrite.hbs`
  }
});
let ds = rt;
const { renderTemplate: Wa } = foundry.applications.handlebars, Ha = `${O}/chat/actor-say-word.hbs`;
class Vs extends Ee {
  static get initiative() {
    return Ee.initiative + " + max(@attributes.reflexes.value, @attributes.intelligence.value)";
  }
  hasOwnAnarchy() {
    return this.hasPlayerOwner;
  }
  prepareDerivedData() {
    !this.system.monitors.fatigue && this.system.monitors.stun && (this.system.monitors.fatigue = foundry.utils.duplicate(this.system.monitors.stun)), this.system.monitors.physical.max = this._getMonitorMax(f.actorAttributes.strength), this.system.monitors.fatigue.max = this._getMonitorMax(f.actorAttributes.willpower), super.prepareDerivedData(), this.system.ignoreWounds = U.sumModifiers(this.items, "other", "ignoreWounds");
  }
  computePhysicalState() {
    var l, c;
    const e = Math.max(0, Number(((l = this.system.monitors.armor) == null ? void 0 : l.max) ?? 0)), t = Math.min(
      e,
      Math.max(0, Number(((c = this.system.monitors.armor) == null ? void 0 : c.value) ?? 0))
    ), s = Math.max(0, e - t), i = Math.max(this.system.monitors.physical.max, this.system.monitors.fatigue.max) + e, a = this.system.monitors.physical.value == this.system.monitors.physical.max, n = this.system.monitors.fatigue.max == this.system.monitors.fatigue.value, o = a || n ? i : Math.max(this.system.monitors.physical.value, this.system.monitors.fatigue.value) + s;
    return {
      max: i,
      value: i - o
    };
  }
  getAttributes() {
    return lt[this.type] ?? lt[f.actorTypes.character];
  }
  getPhysicalAgility() {
    return f.actorAttributes.reflexes;
  }
  getCorrespondingAttribute(e) {
    return f.itemAttributes.firewall == e ? f.itemAttributes.firewall : super.getCorrespondingAttribute(e);
  }
  getDamageMonitor(e) {
    switch (e = this.resolveDamageType(e), e) {
      case f.monitors.fatigue:
      case f.monitors.physical:
        return e;
    }
    return super.getDamageMonitor(e);
  }
  async createWord(e, t) {
    this._mutateWords(e, (s) => s.concat([{ word: t, audio: "" }]));
  }
  async sayWord(e, t) {
    var i, a;
    const s = (i = this.getWord(e, t)) == null ? void 0 : i.word;
    s && ChatMessage.create({
      speaker: { alias: ((a = this.token) == null ? void 0 : a.name) ?? this.name },
      content: await Wa(
        Ha,
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
    this._mutateWords(e, (i) => i.map((a) => (a.id == t && s(a), a)));
  }
  async deleteWord(e, t) {
    this._mutateWords(e, (s) => s.filter((i) => i.id != t));
  }
  async _mutateWords(e, t = (s) => s) {
    if (!e)
      return;
    let s = t(this.system[e]);
    B.reindexIds(s), await this.update({ [`system.${e}`]: s });
  }
  getCelebrityValue() {
    return this.getEdgePoolValue(f.counters.social.legend);
  }
  getCredibilityValue() {
    return this.getEdgePoolValue(f.counters.social.credibility);
  }
  getRumorValue() {
    return this.getEdgePoolValue(f.counters.mental.rumor);
  }
  getAnarchy() {
    return this.hasOwnAnarchy() ? {
      value: this.system.counters.anarchy.value,
      max: this.system.counters.anarchy.max,
      scene: this.getAnarchyScene()
    } : super.getAnarchy();
  }
  getAnarchyScene() {
    return this.getEdgePoolValue(f.counters.edgePools.chaos);
  }
  async spendAnarchy(e) {
    if (e > 0) {
      const t = this.getAnarchyScene(), s = this.getAnarchyValue();
      tt.checkSufficient(b.actor.counters.anarchy, e, s + t);
      const i = Math.min(t, e), a = e - i;
      i > 0 && C.addCounter(this, f.monitors.sceneAnarchy, -i), this.hasPlayerOwner ? (await game.system.anarchy.gmAnarchy.actorGivesAnarchyToGM(this, e), C.addCounter(this, f.monitors.anarchy, -a)) : a > 0 && super.spendAnarchy(a);
    }
  }
  canUseEdge() {
    return !0;
  }
  getWounds() {
    const e = B.divint(this.system.monitors.fatigue.value, 3) + B.divint(this.system.monitors.physical.value, 3);
    return Math.max(0, e - this.system.ignoreWounds);
  }
  async rollCelebrity() {
    await ds.create(this);
  }
}
class wi extends Ee {
  prepareDerivedData() {
    this._prepareMwdAttributes(), this._prepareMwdMonitors(), this._prepareMwdItems(), super.prepareDerivedData();
  }
  static get defaultIcon() {
    return `${Ft}/default/Default_Vehicle.svg`;
  }
  static get initiative() {
    return Ee.initiative + " + max(@attributes.system.value, @attributes.handling.value)";
  }
  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    };
  }
  getAttributes() {
    return lt[this.type] ?? lt[f.actorTypes.vehicle];
  }
  getPhysicalAgility() {
    return f.actorAttributes.handling;
  }
  getDamageMonitor(e) {
    switch (e = this.resolveDamageType(e), e) {
      case f.monitors.physical:
        return f.monitors.structure;
      case f.monitors.fatigue:
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
      [f.actorAttributes.handling]: { value: 0 },
      [f.actorAttributes.system]: { value: 0 },
      [f.actorAttributes.condition]: { value: 0 },
      [f.actorAttributes.chassis]: { value: 0 }
    }, s = foundry.utils.mergeObject(
      foundry.utils.duplicate(t),
      this.system.attributes ?? {},
      { inplace: !1, recursive: !0 }
    );
    this.system.attributes = s, e.attributes = foundry.utils.mergeObject(
      foundry.utils.duplicate(t),
      e.attributes ?? {},
      { inplace: !1, recursive: !0 }
    ), Object.entries(e.attributes).forEach(([i, a]) => {
      var n;
      ((n = s[i]) == null ? void 0 : n.value) === void 0 && (s[i] = s[i] ?? {}, s[i].value = (a == null ? void 0 : a.value) ?? 0);
    });
  }
  _prepareMwdMonitors() {
    var i, a, n, o, l, c, u, d;
    const e = this.system.mwd = this.system.mwd ?? {}, t = this.system.monitors = this.system.monitors ?? {}, s = {
      value: ((i = t.structure) == null ? void 0 : i.value) ?? 0,
      max: ((a = t.structure) == null ? void 0 : a.max) ?? (this.type === f.actorTypes.battlemech ? 18 : 15),
      resistance: Ee.normalizeResistance((n = t.structure) == null ? void 0 : n.resistance)
    };
    if (t.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(s),
      t.structure ?? {},
      { inplace: !1, recursive: !0 }
    ), e.monitors = e.monitors ?? {}, e.monitors.structure = foundry.utils.mergeObject(
      foundry.utils.duplicate(s),
      e.monitors.structure ?? {},
      { inplace: !1, recursive: !0 }
    ), this.type === f.actorTypes.battlemech) {
      const m = {
        value: ((o = t.heat) == null ? void 0 : o.value) ?? ((l = e.heat) == null ? void 0 : l.current) ?? 0,
        max: ((c = t.heat) == null ? void 0 : c.max) ?? ((u = e.heat) == null ? void 0 : u.hardMax) ?? 4,
        resistance: Ee.normalizeResistance((d = t.heat) == null ? void 0 : d.resistance)
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
      traits: ["trait", f.itemType.quality],
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
        this.items.filter((a) => i.includes(a.type))
      ])
    );
  }
}
const js = {
  light: 4,
  medium: 5,
  heavy: 6,
  assault: 7
}, Ba = { mode: "normal", allowedWeaponIds: [], typeRestriction: "" }, Fa = {
  baseProfile: { name: "Unarmed", damage: "", notes: "" },
  maxWeapons: 0,
  allowedLocations: []
};
class Ga {
  constructor(e) {
    this.actor = e, this.mwd = e.system.mwd ?? {};
  }
  compute() {
    const e = this.mwd.weightClass ?? "medium", t = js[e] ?? js.medium, s = this._normalizeHardpoints(), i = this._normalizeWeaponGroups(), a = i.find((g) => g.isPrimary), n = i.filter((g) => g.isPrimary), o = this._primarySlot(), l = [], c = [];
    n.length > 1 && l.push(b.mwd.loadout.errors.multiplePrimary);
    const u = a ? t - 1 : t, d = i.length + (a ? 1 : 0);
    i.length > u && l.push(Z(b.mwd.loadout.errors.mountPointsExceeded, {
      used: d,
      total: t
    }));
    const m = this._getWeapons((g) => (g.system.weaponCategory ?? "ranged") !== "melee"), p = new Map(m.map((g) => [g.id, g])), h = /* @__PURE__ */ new Set(), y = s.map((g) => ({ ...g, occupiedBy: null, occupiedByName: void 0 }));
    for (const g of i)
      for (const A of g.weaponIds ?? []) {
        const M = p.get(A);
        if (!M) {
          c.push(Z(b.mwd.loadout.warnings.weaponMissing, { weapon: A }));
          continue;
        }
        const k = M.system.hardpointType ?? "energy", D = M.system.hardpointSize ?? "small";
        if (h.has(A)) {
          l.push(Z(b.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: M.name }));
          continue;
        }
        if (h.add(A), g.isPrimary && this._validatePrimaryWeapon(M, k, D, o, l), (M.system.weaponCategory ?? "ranged") === "melee")
          continue;
        const H = y.find((L) => !L.occupiedBy && L.type === k && L.size === D);
        H ? (H.occupiedBy = g.id, H.occupiedByName = g.name) : l.push(Z(b.mwd.loadout.errors.hardpointUnavailable, {
          weapon: M.name,
          type: b.mwd.hardpointType[k] ?? k,
          size: b.mwd.hardpointSize[D] ?? D
        }));
      }
    a && (!a.weaponIds || a.weaponIds.length === 0) && l.push(b.mwd.loadout.errors.primaryWithoutWeapon);
    const w = this._computeMeleeState(l);
    return {
      mountPoints: {
        total: t,
        used: d,
        remaining: Math.max(0, t - d)
      },
      weightClass: e,
      hardpoints: y,
      weaponGroups: i,
      primaryGroupId: a == null ? void 0 : a.id,
      errors: l,
      warnings: c,
      meleeProfiles: w.profiles,
      meleeLimit: w.limit
    };
  }
  _normalizeWeaponGroups() {
    return (this.mwd.weaponGroups ?? []).map((e, t) => ({
      id: e.id ?? `group-${t + 1}`,
      name: e.name || Z(b.common.newName, { type: b.itemType.singular.weapon }),
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
    const e = foundry.utils.mergeObject(foundry.utils.duplicate(Ba), this.mwd.primarySlot ?? {});
    return e.allowedWeaponIds = this._asArray(e.allowedWeaponIds), e;
  }
  _computeMeleeState(e) {
    var o, l, c;
    const t = foundry.utils.mergeObject(foundry.utils.duplicate(Fa), this.mwd.melee ?? {}), s = this._getWeapons((u) => (u.system.weaponCategory ?? "ranged") === "melee"), i = [], a = Number(t.maxWeapons ?? 0);
    s.length > a && e.push(Z(b.mwd.loadout.errors.meleeLimitExceeded, {
      equipped: s.length,
      limit: a
    }));
    const n = this._asArray(t.allowedLocations);
    return i.push({
      name: ((o = t.baseProfile) == null ? void 0 : o.name) || b.mwd.melee.baseProfile,
      damage: ((l = t.baseProfile) == null ? void 0 : l.damage) ?? "",
      notes: ((c = t.baseProfile) == null ? void 0 : c.notes) ?? ""
    }), s.forEach((u) => {
      var d;
      n.length > 0 && u.system.mountLocation && !n.includes(u.system.mountLocation) && e.push(Z(b.mwd.loadout.errors.meleeLocationRestricted, {
        weapon: u.name,
        location: b.mwd.meleeLocation[u.system.mountLocation] ?? u.system.mountLocation
      })), i.push({
        name: u.name,
        damage: u.getDamageCode(),
        notes: ((d = u.system.references) == null ? void 0 : d.description) ?? ""
      });
    }), { profiles: i, limit: a };
  }
  _validatePrimaryWeapon(e, t, s, i, a) {
    var n;
    i.mode === "converted" ? (((n = i.allowedWeaponIds) == null ? void 0 : n.length) > 0 && !i.allowedWeaponIds.includes(e.id) && a.push(Z(b.mwd.loadout.errors.primaryNotAllowedWeapon, { weapon: e.name })), i.typeRestriction && t !== i.typeRestriction && a.push(Z(b.mwd.loadout.errors.primaryTypeRestriction, {
      weapon: e.name,
      type: b.mwd.hardpointType[i.typeRestriction] ?? i.typeRestriction
    }))) : s !== "large" && a.push(Z(b.mwd.loadout.errors.primaryNeedsLarge, { weapon: e.name }));
  }
  _getWeapons(e) {
    return this.actor.items.filter((t) => t.type === f.itemType.mechWeapon).filter((t) => {
      var s;
      return (s = t.isActive) == null ? void 0 : s.call(t);
    }).filter(e);
  }
  _asArray(e) {
    return Array.isArray(e) ? e : e == null || e === "" ? [] : [e];
  }
}
class Ua extends wi {
  static get defaultIcon() {
    return `${Ft}/vehicles/apc.svg`;
  }
  prepareDerivedData() {
    var e;
    super.prepareDerivedData(), this.system.mwd = this.system.mwd ?? {}, this.system.mwd.chassis = this.system.mwd.chassis ?? "", this.system.mwd.tonnage = this.system.mwd.tonnage ?? 0, this.system.mwd.loadout = new Ga(this).compute(), this.system.mwd.weaponGroupDetails = this._prepareConfiguredWeaponGroups(), this.system.mwd.heat = this._prepareHeatTrack(), this.system.mwd.primaryGroupName = ((e = this.system.mwd.weaponGroupDetails.find((t) => t.isPrimary)) == null ? void 0 : e.name) ?? "", this.system.skills = this._prepareSkillMap(), this.system.weaponGroups = this._prepareWeaponGroups(), this.system.meleeProfiles = this._prepareMeleeProfiles(), this.system.quickActions = {
      primaryWeaponGroup: this.system.weaponGroups.find((t) => t.isPrimary),
      hasSensorSweep: !!(this.system.skills.perception || this.system.skills.technician)
    };
  }
  async rollRangedAttack() {
    const e = this.system.weaponGroups ?? [];
    if (e.length === 0) {
      ui.notifications.warn(b.actor.vehicle.quickActions.errors.noRanged);
      return;
    }
    const t = await this._promptWeaponGroup(e);
    if (!t)
      return;
    const s = t.weaponIds.map((i) => this.items.get(i)).filter((i) => i);
    await this._rollQuickSkill(this.system.skills.gunnery, {
      quickAction: {
        title: b.actor.vehicle.quickActions.rangedAttack,
        weaponGroup: this._serializeWeaponGroup(t, s)
      }
    });
  }
  async rollMeleeAttack() {
    const e = this.system.meleeProfiles ?? [];
    if (e.length === 0) {
      ui.notifications.warn(b.actor.vehicle.quickActions.errors.noMelee);
      return;
    }
    const t = await this._promptMeleeProfile(e);
    t && await this._rollQuickSkill(this.system.skills.melee, {
      quickAction: {
        title: b.actor.vehicle.quickActions.meleeAttack,
        meleeProfile: t
      }
    });
  }
  async rollDodge() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: b.actor.vehicle.quickActions.dodgeCheck }
    });
  }
  async rollPilotingCheck() {
    await this._rollQuickSkill(this.system.skills.piloting, {
      quickAction: { title: b.actor.vehicle.quickActions.pilotingCheck }
    });
  }
  async rollSensorSweep() {
    const e = [this.system.skills.perception, this.system.skills.technician].filter((s) => s);
    if (e.length === 0) {
      ui.notifications.warn(b.actor.vehicle.quickActions.errors.noSensorSweep);
      return;
    }
    const t = await this._promptSensorSweepSkill(e);
    t && await this._rollQuickSkill(t, {
      quickAction: {
        title: b.actor.vehicle.quickActions.sensorSweep,
        skillName: t.name
      }
    });
  }
  async rollEmergencyRepair() {
    await this._rollQuickSkill(this.system.skills.technician, {
      quickAction: { title: b.actor.vehicle.quickActions.emergencyRepair }
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
    }, a = foundry.utils.mergeObject(i, s, { inplace: !1 });
    a.thresholds = foundry.utils.mergeObject(i.thresholds, s.thresholds ?? {}, { inplace: !1 }), a.current = t.value ?? a.current, a.max = t.max ?? a.max;
    const n = this._resolveHeatStatus(a.current, a.thresholds, a.max);
    return this.system.mwd.heatStatus = {
      code: n,
      label: b.actor.battlemech.heat.status[n] ?? n
    }, a;
  }
  _resolveHeatStatus(e, t, s) {
    return e >= ((t == null ? void 0 : t.shutdown) ?? s) ? "shutdown" : e >= ((t == null ? void 0 : t.overheated) ?? s) ? "overheated" : e >= ((t == null ? void 0 : t.runningHot) ?? 0) ? "runningHot" : "safe";
  }
  _prepareConfiguredWeaponGroups() {
    var s;
    const e = ((s = this.system.mwd) == null ? void 0 : s.weaponGroups) ?? [], t = new Map(this.items.map((i) => [i.id, i]));
    return e.map((i, a) => {
      const n = Array.isArray(i.weaponIds) ? i.weaponIds : i.weaponIds ? [i.weaponIds] : [], o = n.map((c) => t.get(c)).filter((c) => (c == null ? void 0 : c.type) === f.itemType.mechWeapon), l = n.filter((c) => !t.has(c));
      return {
        id: i.id ?? `group-${a + 1}`,
        index: a,
        name: i.name || Z(b.common.newName, { type: b.itemType.singular.weapon }),
        weaponIds: n,
        isPrimary: i.isPrimary ?? !1,
        weapons: o,
        missingWeaponIds: l
      };
    });
  }
  _resolveSkill(e) {
    var i, a;
    const t = this.items.find((n) => n.type === f.itemType.skill && n.system.code === e);
    if (t)
      return t;
    const s = Gt.prepareSkill(e);
    if (s) {
      const n = (i = b.skill) == null ? void 0 : i[e];
      return {
        name: s.name ?? (n || e),
        system: foundry.utils.mergeObject({
          code: e,
          attribute: (a = s.system) == null ? void 0 : a.attribute,
          value: 0
        }, s.system ?? {})
      };
    }
  }
  _prepareWeaponGroups() {
    var a;
    const e = (((a = this.system.mwd) == null ? void 0 : a.weaponGroupDetails) ?? []).map((n) => ({
      ...n,
      weapons: (n.weapons ?? []).filter((o) => {
        var l;
        return (l = o == null ? void 0 : o.isActive) == null ? void 0 : l.call(o);
      })
    })).filter((n) => n.weapons.length > 0);
    if (e.length > 0)
      return e.map((n) => ({
        id: n.id,
        name: n.name,
        weaponIds: n.weapons.map((o) => o.id),
        isPrimary: n.isPrimary ?? !1
      }));
    const t = this.items.filter((n) => n.type === f.itemType.mechWeapon && n.isActive());
    if (t.length === 0)
      return [];
    const s = t.filter((n) => this.hasFavorite(f.itemType.mechWeapon, n.id)), i = [];
    return s.length > 0 && i.push({
      id: "favorite",
      name: b.actor.vehicle.quickActions.primaryWeapons,
      weaponIds: s.map((n) => n.id),
      isPrimary: !0
    }), i.push({
      id: "all",
      name: b.actor.vehicle.quickActions.allWeapons,
      weaponIds: t.map((n) => n.id),
      isPrimary: i.length === 0
    }), i;
  }
  _prepareMeleeProfiles() {
    const e = [{
      id: "unarmed",
      name: b.actor.vehicle.quickActions.unarmed,
      weaponId: null,
      damage: 1,
      notes: b.actor.vehicle.quickActions.unarmedNotes
    }], t = this.items.filter((s) => s.type === f.itemType.mechWeapon && s.isActive() && s.system.skill === "meleeCombat");
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
    var a, n;
    const s = ((a = e == null ? void 0 : e.system) == null ? void 0 : a.attribute) ?? this.getPhysicalAgility(), i = foundry.utils.mergeObject(We.prepareActorRoll(this), {
      mode: we.rollType.skill,
      skill: e,
      attribute1: s,
      specialization: (n = e == null ? void 0 : e.system) == null ? void 0 : n.specialization
    });
    t.quickAction && (i.quickAction = t.quickAction), await We.create(i);
  }
  async _promptWeaponGroup(e) {
    if (e.length === 1)
      return e[0];
    const t = e.find((a) => a.isPrimary) ?? e[0], s = `<form class="mwd-quick-select">${e.map((a) => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${a.id}" ${a.id === t.id ? "checked" : ""}>
        <span>${a.name}${a.isPrimary ? ` (${b.actor.vehicle.quickActions.primaryLabel})` : ""}</span>
      </label>`).join("")}</form>`, i = await Dialog.prompt({
      title: b.actor.vehicle.quickActions.selectWeaponGroup,
      content: s,
      label: b.common.roll.button,
      callback: (a) => a.find('input[name="weapon-group"]:checked').val() ?? t.id
    });
    return e.find((a) => a.id === i) ?? t;
  }
  async _promptMeleeProfile(e) {
    if (e.length === 1)
      return e[0];
    const t = e[0], s = `<form class="mwd-quick-select">${e.map((a) => `
      <label class="quick-select-option">
        <input type="radio" name="melee-profile" value="${a.id}" ${a.id === t.id ? "checked" : ""}>
        <span>${a.name}</span>
      </label>`).join("")}</form>`, i = await Dialog.prompt({
      title: b.actor.vehicle.quickActions.selectMeleeProfile,
      content: s,
      label: b.common.roll.button,
      callback: (a) => a.find('input[name="melee-profile"]:checked').val() ?? t.id
    });
    return e.find((a) => a.id === i) ?? t;
  }
  async _promptSensorSweepSkill(e) {
    if (e.length === 1)
      return e[0];
    const t = `<form class="mwd-quick-select">${e.map((i) => `
      <label class="quick-select-option">
        <input type="radio" name="sensor-skill" value="${i.system.code}">
        <span>${i.name}</span>
      </label>`).join("")}</form>`, s = await Dialog.prompt({
      title: b.actor.vehicle.quickActions.selectSensorSkill,
      content: t,
      label: b.common.roll.button,
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
class Va {
  static register() {
    game.settings.register(S, "useDestinyMechanics", {
      name: b.settings.useDestinyMechanics.name,
      hint: b.settings.useDestinyMechanics.hint,
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
const { HandlebarsApplicationMixin: ja } = foundry.applications.api;
var Oe, Ct, Pt, ms;
const Se = class Se extends ja(foundry.applications.sheets.ActorSheetV2) {
  constructor() {
    super(...arguments);
    fe(this, Pt);
    fe(this, Oe, !1);
    /** Track active CSB tab per group across rerenders */
    fe(this, Ct, /* @__PURE__ */ new Map());
  }
  /** @override */
  _updatePosition(t) {
    const s = super._updatePosition(t), {
      MIN_WIDTH: i,
      MAX_WIDTH: a,
      MIN_HEIGHT: n,
      MAX_HEIGHT: o
    } = this.constructor;
    return typeof s.width == "number" && (s.width = Math.min(
      a,
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
    return W(this, Oe);
  }
  toggleEditing() {
    if (this.isEditable) {
      if (W(this, Oe)) {
        this._commitEditsToActor().finally(() => {
          ye(this, Oe, !W(this, Oe)), this.render({ force: !0 });
        });
        return;
      }
      ye(this, Oe, !W(this, Oe)), this.render({ force: !0 });
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
    var a, n;
    const t = this.actor ?? this.document ?? null, s = (t == null ? void 0 : t.token) ?? null, i = (a = this.document) != null && a.isToken ? ((n = this.document) == null ? void 0 : n.token) ?? s ?? null : s;
    return i ? (i == null ? void 0 : i.document) ?? i : null;
  }
  /**
   * Resolve the document that should persist actor-backed state.
   * Linked token sheets should write to the base actor document so state survives scene changes.
   */
  getPersistentActor() {
    var i, a, n;
    const t = this.actor ?? this.document ?? null;
    if (!t) return null;
    const s = this.getSheetTokenDocument();
    return s != null && s.isLinked ? s.baseActor ?? ((n = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : n.call(i, ((a = s == null ? void 0 : s.baseActor) == null ? void 0 : a.id) ?? "")) ?? s.actor ?? t : t;
  }
  /** @override */
  _initializeApplicationOptions(t) {
    var o, l, c, u, d;
    t = super._initializeApplicationOptions(t), t.classes = Array.from(t.classes ?? []);
    const s = (t == null ? void 0 : t.document) ?? this.document, i = (s == null ? void 0 : s.type) ?? ((o = this.actor) == null ? void 0 : o.type);
    i && t.classes.push(String(i));
    const a = ((d = (u = (c = (l = game.system) == null ? void 0 : l.anarchy) == null ? void 0 : c.styles) == null ? void 0 : u.selectCssClass) == null ? void 0 : d.call(u)) ?? "mwd-theme-default", n = ["mwd-theme-default", "mwd-theme-sra"];
    for (let m = t.classes.length - 1; m >= 0; m--)
      n.includes(t.classes[m]) && t.classes.splice(m, 1);
    return t.classes.push(a), t;
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
    const a = /* @__PURE__ */ new Set();
    return t = t.filter((l) => {
      const c = l == null ? void 0 : l.action, u = c ? `a:${c}` : `il:${(l == null ? void 0 : l.icon) ?? ""}|${(l == null ? void 0 : l.label) ?? ""}`;
      return a.has(u) ? !1 : (a.add(u), !0);
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
    const a = i.dataset.tab, n = i.closest(".csb-tabs");
    if (!n || !a) return;
    const o = n.dataset.group || "default";
    W(this, Ct).set(o, a), _(this, Pt, ms).call(this, n, a);
  }
  /**
   * Universal roll action: data-action="roll" + data-roll='{"intent":"skill","key":"gunnery"}'
   */
  async _onRollAction(t, s) {
    var c, u, d, m, p, h, y, w, g;
    (c = t == null ? void 0 : t.preventDefault) == null || c.call(t);
    const i = ((u = s == null ? void 0 : s.closest) == null ? void 0 : u.call(s, "[data-roll]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-roll]")), a = (p = i == null ? void 0 : i.dataset) == null ? void 0 : p.roll;
    if (!a) return;
    let n;
    try {
      n = JSON.parse(a);
    } catch (A) {
      console.warn("MWD | Invalid data-roll JSON:", a, A);
      return;
    }
    const o = !!(t != null && t.shiftKey), l = ((h = game.mwd) == null ? void 0 : h.roll) ?? ((w = (y = game.system) == null ? void 0 : y.mwd) == null ? void 0 : w.roll);
    if (!(l != null && l.execute)) {
      (g = ui.notifications) == null || g.error("MWD roll system not initialized (game.mwd.roll.execute missing).");
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
    var a, n, o;
    (a = super._onRender) == null || a.call(this, t, s);
    const i = this._getRootElement();
    if (i) {
      for (const l of i.querySelectorAll(".csb-tabs")) {
        const c = l.dataset.group || "default", u = W(this, Ct).get(c), d = l.dataset.default || ((n = l.querySelector(".csb-tab-link[data-tab]")) == null ? void 0 : n.dataset.tab), m = u || d;
        m && _(this, Pt, ms).call(this, l, m);
      }
      i.querySelectorAll(".csb-tabs").length && !i.querySelector(".csb-tab-panel.is-active") && console.warn(`${Y} CSB tabs present but no active tab applied. Check element root resolution and CSS .is-active selectors.`, {
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
    for (const a of s) {
      const n = a.getAttribute("name");
      if (!n || a.disabled) continue;
      let o;
      a instanceof HTMLInputElement ? a.type === "checkbox" ? o = a.checked : a.type === "number" ? o = Number(a.value) : o = a.value : o = a.value, typeof o == "number" && Number.isNaN(o) && (o = 0), o = this._clampByPath(n, o), foundry.utils.getProperty(this.actor, n) !== o && (i[n] = o);
    }
    if (Object.keys(i).length)
      try {
        await (this.getPersistentActor() ?? this.actor).update(i);
      } catch (a) {
        console.warn("MWD | Commit failed (permissions or validation):", a);
      }
  }
  /** @override */
  async _prepareContext(t) {
    var n, o, l, c, u, d, m, p, h, y, w;
    console.log(`${Y}BaseActorSheetV2._prepareContext:start`, {
      actorName: (n = this.actor) == null ? void 0 : n.name,
      actorType: (o = this.actor) == null ? void 0 : o.type
    });
    const s = await super._prepareContext(t), i = foundry.utils.deepClone((s == null ? void 0 : s.options) ?? {});
    i.classes = Array.from(((l = this.options) == null ? void 0 : l.classes) ?? []), i.cssClass = i.classes.join(" ");
    const a = foundry.utils.mergeObject(
      s,
      {
        actor: this.actor,
        system: (c = this.actor) == null ? void 0 : c.system,
        editable: this.isEditable,
        owner: ((u = this.document) == null ? void 0 : u.isOwner) ?? !1,
        limited: !(((d = this.document) == null ? void 0 : d.isOwner) ?? !1),
        editing: W(this, Oe),
        // Template contract
        data: this.actor,
        // legacy alias
        options: i,
        // safe, template-only
        cssClass: i.cssClass
      },
      { inplace: !1 }
    );
    return a.options.owner = a.owner, a.options.limited = a.limited, a.options.editable = a.editable, a.options.editing = a.editing, a.options.viewMode = !a.editing, a.skillsDisplay = ba(((m = this.actor) == null ? void 0 : m.system) ?? {}), a.items ?? (a.items = {}), (p = this.actor) != null && p.items && typeof (B == null ? void 0 : B.classifyInto) == "function" && (B.classifyInto(a.items, this.actor.items), a.items.weapon = [
      ...a.items.mechWeapon ?? [],
      ...a.items.personalWeapon ?? []
    ]), a.npcItems = {
      traits: a.items.quality ?? [],
      weapons: a.items.weapon ?? [],
      assetModules: a.items.assetModule ?? [],
      inventory: a.items.gear ?? []
    }, console.log(`${Y}BaseActorSheetV2._prepareContext:done`, {
      actorType: (h = this.actor) == null ? void 0 : h.type,
      cssClass: a.cssClass,
      itemCount: ((w = (y = this.actor) == null ? void 0 : y.items) == null ? void 0 : w.size) ?? 0,
      editing: W(this, Oe)
    }), a;
  }
  /** Clamp certain actor system paths to valid ranges */
  _clampByPath(t, s) {
    return typeof s != "number" ? s : ((/^system\.skills\.[^.]+\.rating$/.test(t) || /^system\.attributes\.[^.]+\.value$/.test(t)) && (s = Math.trunc(s)), /^system\.skills\.[^.]+\.rating$/.test(t) ? Math.clamp(s, 0, 12) : /^system\.attributes\.[^.]+\.value$/.test(t) ? Math.clamp(s, 0, 10) : s);
  }
  /** Action handler: Condition Monitor set */
  async _onMonitorSet(t, s) {
    var p, h;
    if (t.preventDefault(), !this.isEditable) return;
    const i = String(((p = s == null ? void 0 : s.dataset) == null ? void 0 : p.monitor) ?? "").trim(), a = Number((h = s == null ? void 0 : s.dataset) == null ? void 0 : h.value);
    if (!i || !Number.isFinite(a)) return;
    const n = i === "burn" ? "system.burn.value" : `system.monitors.${i}.value`, o = Number(foundry.utils.getProperty(this.actor, n) ?? 0), l = i === "armor" ? a : o === a ? 0 : a, c = this.getPersistentActor() ?? this.actor;
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
Oe = new WeakMap(), Ct = new WeakMap(), Pt = new WeakSet(), /**
 * Apply active-state classes within a single .csb-tabs root.
 * Idempotent: safe to call every render.
 */
ms = function(t, s) {
  t.querySelectorAll(".csb-tab-link").forEach((i) => {
    i.classList.toggle("is-active", i.dataset.tab === s);
  }), t.querySelectorAll(".csb-tab-panel").forEach((i) => {
    i.classList.toggle("is-active", i.dataset.tab === s);
  });
}, // ---- Hard minimum size (resize clamp) ----
v(Se, "MIN_WIDTH", 800), v(Se, "MAX_WIDTH", 950), v(Se, "MIN_HEIGHT", 600), v(Se, "MAX_HEIGHT", 1400), // group -> tabId
/** @override */
v(Se, "DEFAULT_OPTIONS", foundry.utils.mergeObject(st(Se, Se, "DEFAULT_OPTIONS"), {
  classes: ["sheet", "actor", S, "appv2", "mwd-sheet", "mwd-character-sheet"],
  position: { width: 760, height: 760 },
  window: { resizable: !0, minimizable: !0 },
  actions: {
    toggleViewMode: Se.prototype._onToggleViewMode,
    tab: Se.prototype._onClickTab,
    roll: Se.prototype._onRollAction,
    monitorSet: Se.prototype._onMonitorSet,
    editImage: Se.prototype._onEditImage
  }
}, { inplace: !1 }));
let ut = Se;
var nt, Ue, Ai, Ti, ki;
const Tt = class Tt {
  static async get(e) {
    if (W(this, nt).has(e)) return W(this, nt).get(e);
    const t = _(this, Ue, Ai).call(this, e);
    return W(this, nt).set(e, t), t;
  }
};
nt = new WeakMap(), Ue = new WeakSet(), Ai = async function(e) {
  const t = `systems/${S}/templates/v2/layouts/${e}.layout.json`;
  let s;
  try {
    const i = await fetch(t);
    if (!i.ok) throw new Error(`HTTP ${i.status} for ${t}`);
    s = await i.json();
  } catch (i) {
    console.error(`${Y}LayoutRegistry.get FAILED`, { layoutId: e, url: t, e: i }), s = { id: e, version: 0, root: { type: "stack", children: [] } };
  }
  return _(this, Ue, Ti).call(this, s);
}, Ti = function(e) {
  const t = (s) => {
    var i;
    return !s || typeof s != "object" || (s.template ?? (s.template = _(i = Tt, Ue, ki).call(i, s)), s.children = Array.isArray(s.children) ? s.children : [], Array.isArray(s.classes) || (typeof s.classes == "string" ? s.classes = s.classes.split(/\s+/).filter(Boolean) : s.classes = []), s.children = s.children.map(t), s.type === "tabs" && Array.isArray(s.tabs) && (s.tabs = s.tabs.map((a) => ({
      ...a,
      children: (Array.isArray(a.children) ? a.children : []).map(t)
    })))), s;
  };
  return {
    ...e,
    root: t(e.root ?? { type: "stack", children: [] })
  };
}, ki = function(e) {
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
}, fe(Tt, Ue), fe(Tt, nt, /* @__PURE__ */ new Map());
let Wt = Tt;
const qa = /* @__PURE__ */ new Set(["overloaded"]);
function qs(r) {
  return r ? (r == null ? void 0 : r.document) ?? r : null;
}
function za(r, e) {
  var s, i, a;
  if (!r) return null;
  const t = qs(e) ?? qs(r == null ? void 0 : r.token);
  return t ? t.isLinked ? t.baseActor ?? ((a = (s = game.actors) == null ? void 0 : s.get) == null ? void 0 : a.call(s, ((i = t == null ? void 0 : t.baseActor) == null ? void 0 : i.id) ?? "")) ?? t.actor ?? r : t.actor ?? r : r;
}
function Si(r) {
  const e = String(r ?? "").trim();
  if (!e) return "Status";
  const i = (e.includes(".") ? e.split(".").at(-1) : e).replace(/^status/i, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return i ? i.replace(/\b\w/g, (a) => a.toUpperCase()) : e;
}
function Ka(r) {
  const e = String((r == null ? void 0 : r.name) ?? (r == null ? void 0 : r.label) ?? (r == null ? void 0 : r.id) ?? "Status").trim();
  return e ? Si(e) : "Status";
}
function Ya(r) {
  return String((r == null ? void 0 : r.icon) ?? (r == null ? void 0 : r.img) ?? "").trim();
}
function Mi(r, e) {
  var t, s, i, a, n, o;
  return e === "overloaded" ? !!((s = (t = r == null ? void 0 : r.system) == null ? void 0 : t.burn) != null && s.overloaded) || !!((a = (i = r == null ? void 0 : r.statuses) == null ? void 0 : i.has) != null && a.call(i, e)) : ((o = (n = r == null ? void 0 : r.statuses) == null ? void 0 : n.has) == null ? void 0 : o.call(n, e)) ?? !1;
}
function Qa(r) {
  const e = /* @__PURE__ */ new Set();
  return (CONFIG.statusEffects ?? []).filter((t) => {
    const s = String((t == null ? void 0 : t.id) ?? "").trim();
    return !s || e.has(s) ? !1 : (e.add(s), !0);
  }).map((t) => {
    const s = String(t.id).trim();
    return {
      id: s,
      label: Ka(t),
      icon: Ya(t),
      active: Mi(r, s),
      managed: qa.has(s)
    };
  }).sort((t, s) => t.active !== s.active ? t.active ? -1 : 1 : t.label.localeCompare(s.label));
}
function Ja(r) {
  if (!r.length)
    return "<p>No token statuses are configured.</p>";
  const e = foundry.utils.escapeHTML;
  return `
    <form class="mwd-token-status-dialog">
      <p style="margin-top: 0;">Toggle the statuses shown on this token.</p>
      <div style="display: grid; gap: 0.2rem; max-height: 20rem; overflow-y: auto; padding-right: 0.25rem;">
        ${r.map((s) => {
    const i = s.active ? "checked" : "", a = s.icon ? `<img src="${e(s.icon)}" alt="" width="20" height="20" style="flex: 0 0 20px; border: 0;" />` : "", n = s.managed ? '<small style="opacity: 0.7;">Managed by system state</small>' : "";
    return `
      <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.2rem 0;">
        <input type="checkbox" name="status" value="${e(s.id)}" ${i} />
        ${a}
        <span style="flex: 1 1 auto;">${e(s.label)}</span>
        ${n}
      </label>
    `;
  }).join("")}
      </div>
    </form>
  `;
}
async function Xa({ actor: r, effects: e, selectedStatusIds: t }) {
  const s = new Set(t), i = {}, a = [];
  for (const n of e) {
    const o = s.has(n.id), l = Mi(r, n.id);
    if (o !== l) {
      if (n.id === "overloaded") {
        i["system.burn.overloaded"] = o;
        continue;
      }
      a.push(r.toggleStatusEffect(n.id, { active: o, overlay: !1 }));
    }
  }
  Object.keys(i).length && await r.update(i), a.length && await Promise.all(a);
}
async function Za({ actor: r, token: e } = {}) {
  var i;
  if (!r || !e) return !1;
  const t = za(r, e), s = Qa(t);
  return s.length ? new Promise((a) => {
    let n = !1;
    new Dialog({
      title: `Token Statuses: ${e.name ?? r.name ?? "Token"}`,
      content: Ja(s),
      buttons: {
        apply: {
          label: "Apply",
          callback: async (o) => {
            var l;
            n = !0;
            try {
              const c = o.find('input[name="status"]:checked').map((u, d) => d.value).get();
              await Xa({ actor: t, effects: s, selectedStatusIds: c }), a(!0);
            } catch (c) {
              console.error("MWD | Failed to update token statuses", c), (l = ui.notifications) == null || l.error("Unable to update token statuses."), a(!1);
            }
          }
        },
        cancel: {
          label: "Cancel",
          callback: () => {
            n = !0, a(!1);
          }
        }
      },
      default: "apply",
      close: () => {
        n || a(!1);
      }
    }).render(!0);
  }) : ((i = ui.notifications) == null || i.warn("No token statuses are configured."), !1);
}
const ht = "mwd", ft = "personalCombat", ps = 3, er = 1, tr = 1;
function zs(r, e) {
  return !(r != null && r.activation) || !e ? !1 : r.activation.combatId === e.combatId && Number(r.activation.round ?? -1) === Number(e.round ?? -1) && Number(r.activation.turn ?? -1) === Number(e.turn ?? -1) && r.activation.combatantId === e.combatantId;
}
function hs(r = null) {
  return {
    saRemaining: ps,
    faRemaining: er,
    raRemaining: tr,
    saSpentThisActivation: 0,
    burnThisActivation: 0,
    attacksThisActivation: 0,
    actionLog: [],
    activation: r
  };
}
function Ks(r, e = null) {
  return foundry.utils.mergeObject(
    hs(e),
    foundry.utils.deepClone(r ?? {}),
    { inplace: !1, overwrite: !0 }
  );
}
function Yt(r) {
  return Array.isArray(r) ? r.map((e) => {
    const t = String((e == null ? void 0 : e.label) ?? "").trim();
    return t ? {
      id: String((e == null ? void 0 : e.id) ?? "").trim(),
      label: t,
      costLabel: String((e == null ? void 0 : e.costLabel) ?? "").trim()
    } : null;
  }).filter(Boolean) : [];
}
function sr(r) {
  const e = (CONFIG.statusEffects ?? []).find((s) => String((s == null ? void 0 : s.id) ?? "").trim() === r), t = String((e == null ? void 0 : e.name) ?? (e == null ? void 0 : e.label) ?? r ?? "").trim();
  return Si(t);
}
class pe {
  static init() {
    Hooks.on("updateCombat", (e, t) => this._onUpdateCombat(e, t)), Hooks.on("updateCombatant", (e, t) => this._onUpdateCombatant(e, t)), Hooks.on("createCombatant", (e) => this._onCreateCombatant(e)), Hooks.on("deleteCombatant", (e) => this._onDeleteCombatant(e)), Hooks.on("deleteCombat", (e) => this._onDeleteCombat(e));
  }
  static async onReady() {
    await this.ensureCurrentCombatantState(), this.renderOpenCharacterSheets();
  }
  static _asTokenDocument(e) {
    return e ? (e == null ? void 0 : e.document) ?? e : null;
  }
  static _getTokenSceneId(e) {
    var s, i, a, n;
    const t = this._asTokenDocument(e);
    return ((s = t == null ? void 0 : t.parent) == null ? void 0 : s.id) ?? ((i = t == null ? void 0 : t.scene) == null ? void 0 : i.id) ?? ((n = (a = t == null ? void 0 : t.object) == null ? void 0 : a.scene) == null ? void 0 : n.id) ?? null;
  }
  static _getSceneTokenDocumentById(e, t = ((s) => (s = canvas == null ? void 0 : canvas.scene) == null ? void 0 : s.id)()) {
    var n, o, l, c, u;
    const i = String(e ?? "").trim();
    if (!i || !t) return null;
    const a = ((n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.id) === t ? canvas.scene : (l = (o = game.scenes) == null ? void 0 : o.get) == null ? void 0 : l.call(o, t);
    return ((u = (c = a == null ? void 0 : a.tokens) == null ? void 0 : c.get) == null ? void 0 : u.call(c, i)) ?? null;
  }
  static _collectActorIds(e, t = null) {
    var n, o;
    const s = /* @__PURE__ */ new Set(), i = (l) => {
      const c = String(l ?? "").trim();
      c && s.add(c);
    };
    i(e == null ? void 0 : e.id), i(e == null ? void 0 : e._id);
    const a = this._asTokenDocument(t) ?? this._asTokenDocument(e == null ? void 0 : e.token);
    return i((n = a == null ? void 0 : a.actor) == null ? void 0 : n.id), i((o = a == null ? void 0 : a.baseActor) == null ? void 0 : o.id), i(a == null ? void 0 : a.actorId), s;
  }
  static _tokenDocumentMatchesActor(e, t, s = null) {
    var n, o;
    const i = this._asTokenDocument(e);
    if (!i || !t) return !1;
    const a = s ?? this._collectActorIds(t, i);
    return [
      (n = i == null ? void 0 : i.actor) == null ? void 0 : n.id,
      (o = i == null ? void 0 : i.baseActor) == null ? void 0 : o.id,
      i == null ? void 0 : i.actorId
    ].some((l) => a.has(String(l ?? "").trim()));
  }
  static getPreferredTokenDocument(e) {
    var i, a;
    if (!e) return null;
    const t = this._asTokenDocument(e == null ? void 0 : e.token);
    return t || (((a = (((i = e.getActiveTokens) == null ? void 0 : i.call(e, !0, !0)) ?? [])[0]) == null ? void 0 : a.document) ?? null);
  }
  static getPreferredToken(e) {
    const t = this.getPreferredTokenDocument(e);
    return t ? t.object ?? this._getSceneTokenById(t.id) : null;
  }
  static getCurrentSceneTokenDocument(e, t = null) {
    var h, y, w, g;
    const s = (h = canvas == null ? void 0 : canvas.scene) == null ? void 0 : h.id, i = this._asTokenDocument(t);
    if (this._getTokenSceneId(i) === s) return i;
    const a = String((i == null ? void 0 : i.id) ?? (t == null ? void 0 : t.id) ?? "").trim();
    if (a) {
      const A = this._getSceneTokenDocumentById(a, s);
      if (A) return A;
    }
    const n = this.getPreferredTokenDocument(e);
    if (this._getTokenSceneId(n) === s) return n;
    const o = String((n == null ? void 0 : n.id) ?? "").trim();
    if (o) {
      const A = this._getSceneTokenDocumentById(o, s);
      if (A) return A;
    }
    const c = ((w = (((y = e == null ? void 0 : e.getActiveTokens) == null ? void 0 : y.call(e, !0, !0)) ?? []).find((A) => {
      var M, k;
      return ((k = (M = A == null ? void 0 : A.document) == null ? void 0 : M.parent) == null ? void 0 : k.id) === s;
    })) == null ? void 0 : w.document) ?? null;
    if (c) return c;
    const u = Array.from(((g = canvas == null ? void 0 : canvas.scene) == null ? void 0 : g.tokens) ?? []), d = this._collectActorIds(e, n), m = u.filter((A) => this._tokenDocumentMatchesActor(A, e, d));
    return m.find((A) => {
      var M, k, D;
      return ((M = A == null ? void 0 : A.combatant) == null ? void 0 : M.id) === ((D = (k = game.combat) == null ? void 0 : k.combatant) == null ? void 0 : D.id);
    }) ?? null ?? m[0] ?? null;
  }
  static getCurrentSceneToken(e, t = null) {
    const s = this.getCurrentSceneTokenDocument(e, t);
    return s ? s.object ?? this._getSceneTokenById(s.id) : null;
  }
  static _getSceneTokenById(e) {
    var t, s, i, a;
    return e ? ((s = (t = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : t.get) == null ? void 0 : s.call(t, e)) ?? ((a = (i = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : i.placeables) == null ? void 0 : a.find((n) => n.id === e)) ?? null : null;
  }
  static getCombat(e, t = null) {
    var m, p, h, y;
    const s = (m = canvas == null ? void 0 : canvas.scene) == null ? void 0 : m.id, i = game.combat, a = this.getCurrentSceneTokenDocument(e, t), n = (a == null ? void 0 : a.object) ?? this._getSceneTokenById((a == null ? void 0 : a.id) ?? null);
    if (!i || ((p = i.scene) == null ? void 0 : p.id) !== s)
      return {
        combat: null,
        combatant: null,
        token: n,
        tokenDocument: a
      };
    let o = ((y = (h = a == null ? void 0 : a.combatant) == null ? void 0 : h.combat) == null ? void 0 : y.id) === i.id ? a.combatant : null;
    const l = Array.from(i.combatants ?? []);
    if (!o) {
      const w = this._collectActorIds(e, a), g = l.filter((k) => {
        const D = String((k == null ? void 0 : k.tokenId) ?? "").trim();
        if (a && D === String(a.id ?? "").trim() || w.has(String((k == null ? void 0 : k.actorId) ?? "").trim())) return !0;
        const H = this._asTokenDocument(k == null ? void 0 : k.token) ?? this._getSceneTokenDocumentById(D, s);
        return this._tokenDocumentMatchesActor(H, e, w);
      }), A = g.find((k) => {
        var D;
        return k.id === ((D = i == null ? void 0 : i.combatant) == null ? void 0 : D.id);
      }) ?? null, M = g.find(
        (k) => a && String((k == null ? void 0 : k.tokenId) ?? "").trim() === String(a.id ?? "").trim()
      ) ?? null;
      o = A ?? M ?? g[0] ?? null;
    }
    !o && l.length === 1 && (n || e) && (o = l[0]);
    const c = this._asTokenDocument(o == null ? void 0 : o.token) ?? this._getSceneTokenDocumentById((o == null ? void 0 : o.tokenId) ?? null, s), u = a ?? c ?? null, d = n ?? (c == null ? void 0 : c.object) ?? this._getSceneTokenById((o == null ? void 0 : o.tokenId) ?? null) ?? null;
    return {
      combat: i,
      combatant: o,
      token: d,
      tokenDocument: u
    };
  }
  static getSnapshot(e, { token: t = null } = {}) {
    var w, g, A, M, k;
    const {
      combat: s,
      combatant: i,
      token: a,
      tokenDocument: n
    } = this.getCombat(e, t), o = !!i && ((w = s == null ? void 0 : s.combatant) == null ? void 0 : w.id) === i.id, l = i ? this.getActivationIdentity(s, i) : null, c = i ? i.getFlag(ht, ft) : null, u = i && o && zs(c, l) ? Ks(c, l) : hs(l);
    u.actionLog = Yt(u.actionLog);
    const d = Math.max(0, Number(((A = (g = e == null ? void 0 : e.system) == null ? void 0 : g.burn) == null ? void 0 : A.value) ?? 0)), m = Math.floor(d / 2), p = !!((k = (M = e == null ? void 0 : e.system) == null ? void 0 : M.burn) != null && k.overloaded), h = this.getActiveStatuses(e), y = i ? o ? "" : "Waiting for this combatant's activation." : "No combatant on the current scene.";
    return {
      token: a,
      tokenDocument: n,
      combat: s,
      combatant: i,
      hasCombatant: !!i,
      isCurrentTurn: o,
      overloaded: p,
      burn: {
        value: d,
        penalty: m,
        canOverloadCheck: d >= 6 && !p
      },
      state: u,
      statuses: h,
      summaryText: `SA: ${u.saRemaining} / ${ps}   FA: ${u.faRemaining}   RA: ${u.raRemaining}`,
      inactiveReason: y,
      modifierSummary: this.getModifierSummary(e, m)
    };
  }
  static getModifierSummary(e, t = Math.floor(Number(((i) => (i = ((s) => (s = e == null ? void 0 : e.system) == null ? void 0 : s.burn)()) == null ? void 0 : i.value)() ?? 0) / 2)) {
    var c, u;
    const a = ((u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.derived) == null ? void 0 : u.condition) ?? {}, n = [];
    n.push({
      label: "Burn Penalty",
      value: t > 0 ? `-${t}` : "0"
    });
    const o = Number(a.fatiguePenalty ?? 0);
    o && n.push({ label: "Fatigue", value: `${o}` });
    const l = Number(a.physicalPenalty ?? 0);
    return l && n.push({ label: "Physical", value: `${l}` }), n.length || n.push({ label: "Modifiers", value: "0" }), n;
  }
  static getActiveStatuses(e) {
    return Array.from((e == null ? void 0 : e.statuses) ?? []).map((s) => ({
      id: s,
      label: sr(s)
    })).sort((s, i) => s.label.localeCompare(i.label));
  }
  static buildActionModel(e, t) {
    var p;
    const s = t.hasCombatant ? "" : "No current-scene combatant.", i = t.isCurrentTurn ? "" : "Only during your activation.", a = t.overloaded ? "Overloaded: only Burn recovery is allowed." : "", n = s || i || a, o = [
      { id: "move", label: "Move", resource: "sa", cost: 1, supported: !0 },
      { id: "aim", label: "Aim", resource: "sa", cost: 1, supported: !0 },
      { id: "reload", label: "Reload", resource: "sa", cost: 1, supported: !0 },
      { id: "assist", label: "Assist", resource: "sa", cost: 1, supported: !0 },
      { id: "stand", label: "Stand", resource: "sa", cost: 1, supported: !0 }
    ].map((h) => this._buildSpendAction(t, h, n)), l = s || i || a || (t.state.saRemaining < 2 ? "Need 2 SA remaining." : ""), c = [
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
    ].map((h) => h.handler ? h : this._buildStubAction(h)), u = s || i || (t.state.saRemaining <= 0 ? "No SA remaining." : "") || (t.burn.value <= 0 ? "Burn is already at 0." : ""), d = s || i || (t.burn.canOverloadCheck ? "" : t.overloaded ? "Already Overloaded." : "Burn below 6."), m = s || i;
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
        { label: "SA", value: `${t.state.saRemaining}/${ps}` },
        { label: "FA", value: `${t.state.faRemaining}` },
        { label: "RA", value: `${t.state.raRemaining}` }
      ],
      activationLog: Yt((p = t.state) == null ? void 0 : p.actionLog).map((h, y) => ({
        ...h,
        index: y + 1
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
    const a = Number(((l = e.state) == null ? void 0 : l[`${t.resource}Remaining`]) ?? 0) < t.cost ? `No ${String(t.resource).toUpperCase()} remaining.` : "", n = s || a, o = this._formatCostLabel(t.resource, t.cost);
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
    const a = String(s ?? "").trim();
    if (!a) return;
    const n = Yt(e == null ? void 0 : e.actionLog);
    n.push({
      id: String(t ?? "").trim(),
      label: a,
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
    var a, n;
    if (!game.user.isGM) return;
    const e = game.combat, t = e == null ? void 0 : e.combatant;
    if (!e || !t || ((a = e.scene) == null ? void 0 : a.id) !== ((n = canvas == null ? void 0 : canvas.scene) == null ? void 0 : n.id)) return;
    const s = this.getActivationIdentity(e, t), i = t.getFlag(ht, ft);
    zs(i, s) || await t.setFlag(ht, ft, hs(s));
  }
  static async spendResource(e, {
    token: t = null,
    resource: s = "sa",
    cost: i = 1,
    actionId: a = "",
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
    const d = Ks(l.state, this.getActivationIdentity(l.combat, l.combatant));
    return d[c] = Math.max(0, u - i), s === "sa" && (d.saSpentThisActivation = Number(d.saSpentThisActivation ?? 0) + i, a === "attack" && (d.attacksThisActivation = Number(d.attacksThisActivation ?? 0) + 1)), this._appendActionLog(d, {
      id: a,
      label: n,
      costLabel: o || this._formatCostLabel(s, i)
    }), await l.combatant.setFlag(ht, ft, d), { ok: !0, snapshot: this.getSnapshot(e, { token: l.token }) };
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
    const a = Math.max(0, Number(((l = (o = e.system) == null ? void 0 : o.burn) == null ? void 0 : l.value) ?? 0) - 1), n = { "system.burn.value": a };
    return a === 0 && ((u = (c = e.system) == null ? void 0 : c.burn) != null && u.overloaded) && (n["system.burn.overloaded"] = !1), await e.update(n), { ok: !0, snapshot: this.getSnapshot(e, { token: s.token }) };
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
    foundry.utils.hasProperty(t, `flags.${ht}.${ft}`) && this.renderOpenCharacterSheets((s = e == null ? void 0 : e.actor) == null ? void 0 : s.id);
  }
  static renderOpenCharacterSheets(e = null) {
    var s;
    const t = Object.values(ui.windows ?? {}).filter((i) => {
      var a;
      return ((a = i == null ? void 0 : i.actor) == null ? void 0 : a.type) === "character";
    });
    for (const i of t)
      e && ((s = i.actor) == null ? void 0 : s.id) !== e || i.render(!1);
  }
}
var Re, Ge, Ke, I, vi, gs, Lt, Ci, Pi, ke, qe, bt;
const re = class re extends ut {
  constructor() {
    super(...arguments);
    fe(this, I);
    fe(this, Re, null);
    fe(this, Ge, null);
    fe(this, Ke, null);
  }
  /** @override */
  async _prepareContext(t) {
    var V, J, z, X, E, x, q, ee, ie, he, Ae, Ve, mt;
    const s = await super._prepareContext(t), i = ((V = this.getSheetTokenDocument) == null ? void 0 : V.call(this)) ?? null;
    s._mwdThemeClass = game.system.mwd.styles.selectCssClass(), s.layout = await Wt.get("character");
    const a = ((z = (J = this.actor).getEdgeCap) == null ? void 0 : z.call(J)) ?? Number(((x = (E = (X = this.actor.system) == null ? void 0 : X.attributes) == null ? void 0 : E.edge) == null ? void 0 : x.value) ?? 0), n = !!this.isEditable, o = { physical: "Physical", mental: "Mental", social: "Social" }, l = {
      grit: "Grit",
      insight: "Insight",
      legend: "Legend",
      chaos: "Chaos",
      rumor: "Rumor",
      credibility: "Credibility"
    }, c = this.actor.getEdgePoolSummary ? this.actor.getEdgePoolSummary({ groups: Ss }) : { groups: [] };
    s.edgeConsole = {
      cap: a,
      editable: n,
      capPips: Array.from({ length: Math.max(0, a) }, (P, R) => R + 1),
      groups: (c.groups ?? []).map((P) => ({
        id: P.id,
        label: o[P.id] ?? P.id,
        pools: (P.pools ?? []).map((R) => {
          const te = Number(R.effectiveValue ?? 0), Ce = Number(R.effectiveMax ?? 0), Ne = Array.from({ length: Math.max(0, Ce) }, (Te, pt) => {
            const Rt = pt + 1;
            return { n: Rt, filled: Rt <= te };
          }), ue = String(R.key ?? "").split(".").pop();
          return {
            key: R.key,
            label: l[ue] ?? ue ?? R.key,
            value: te,
            max: Ce,
            rating: Number(R.rating ?? 0),
            isCapped: Number(R.rating ?? 0) > Number(R.cap ?? a),
            pips: Ne,
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
    for (const P of s.edgeConsole.groups ?? [])
      for (const R of P.pools ?? []) {
        const te = String(R.key ?? "").split(".").pop();
        te && d.set(te, R), R.domain = P.id;
      }
    s.edgeConsole.poolsOrdered = u.map((P) => d.get(P)).filter(Boolean);
    const p = (this.actor.system ?? {}).monitors ?? {}, h = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue", label: "Fatigue", kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor", label: "Armor", kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ], y = (P, R, te = 0) => {
      const Ce = foundry.utils.getProperty(P, R), Ne = Number(Ce);
      return Number.isFinite(Ne) ? Ne : te;
    };
    s.conditionMonitors = h.map((P) => {
      const R = (p == null ? void 0 : p[P.id]) ?? {}, te = Math.max(0, y(R, "max", 0)), Ce = Math.min(Math.max(0, y(R, "value", 0)), te);
      return {
        id: P.id,
        label: P.label,
        kind: P.kind,
        editable: !!this.isEditable,
        value: Ce,
        max: te,
        segments: Array.from({ length: te }, (Ne, ue) => {
          const Te = ue + 1;
          return { value: Te, filled: Te <= Ce };
        }),
        status: P.status ? { label: P.status.label, value: y(R, P.status.path, 0) } : null
      };
    });
    const w = Number(((ee = (q = this.actor.system) == null ? void 0 : q.burn) == null ? void 0 : ee.value) ?? 0), g = 10, A = 6, M = Math.min(w, g);
    s.burnOverflow = Math.max(0, w - g), s.burnPenalty = Math.floor(w / 2), s.burnPips = Array.from({ length: g }, (P, R) => {
      const te = R + 1;
      return {
        pipValue: te,
        filled: te <= M,
        threshold: te === A
      };
    }), s.combat = {
      roll: {
        initiative: JSON.stringify({ intent: "initiative" }),
        overload: JSON.stringify({ intent: "overload" })
      }
    }, s.burn = {
      value: w,
      penalty: Math.floor(w / 2),
      overflow: Math.max(0, w - 10),
      canOverloadCheck: w >= 6,
      overloaded: !!((he = (ie = this.actor.system) == null ? void 0 : ie.burn) != null && he.overloaded)
    };
    const k = pe.getSnapshot(this.actor, { token: i });
    s.combatDashboard = {
      overloadedLabel: k.overloaded ? "Yes" : "No",
      burnLabel: String(k.burn.value),
      burnPenaltyLabel: k.burn.penalty > 0 ? `-${k.burn.penalty}` : "0",
      actionSummary: k.summaryText,
      burnThisActivationLabel: `+${Math.max(0, Number(k.state.burnThisActivation ?? 0))}`,
      statuses: k.statuses,
      modifiers: k.modifierSummary,
      inactiveReason: k.inactiveReason
    };
    const D = pe.buildActionModel(this.actor, k), H = new Set((D.menus ?? []).map((P) => P.id));
    W(this, Re) && !H.has(W(this, Re)) && ye(this, Re, null), s.combatActions = {
      ...D,
      menus: (D.menus ?? []).map((P) => ({
        ...P,
        isOpen: P.id === W(this, Re)
      }))
    };
    const L = ((Ve = (Ae = this.actor).getPersonalCombatLoadout) == null ? void 0 : Ve.call(Ae)) ?? null;
    return s.personalInventory = {
      warnings: [...(L == null ? void 0 : L.warnings) ?? []],
      weapons: ((L == null ? void 0 : L.weapons) ?? []).map((P) => ({
        id: P.id,
        name: P.name,
        img: P.img,
        category: P.category,
        skill: P.skill,
        damage: P.damage,
        ap: P.ap,
        damageType: P.damageType,
        equipped: !!P.equipped,
        isPrimary: !!P.isPrimary,
        traitsLabel: (P.traits ?? []).join(", "),
        attackRoll: JSON.stringify({
          intent: "attack",
          weaponId: P.id,
          edge: { pool: "physical.grit", allowed: ["pre", "post"] },
          tags: ["combat", "attack"]
        })
      })),
      armor: ((L == null ? void 0 : L.armor) ?? []).map((P) => {
        var te, Ce, Ne, ue, Te;
        const R = ((te = L == null ? void 0 : L.activeArmor) == null ? void 0 : te.id) === P.id ? L.activeArmor : null;
        return {
          id: P.id,
          name: P.name,
          img: P.img,
          rating: Number((R == null ? void 0 : R.ratingCurrent) ?? P.rating ?? 0),
          baseResistance: Number((R == null ? void 0 : R.baseMitigation) ?? (R == null ? void 0 : R.baseResistance) ?? 0),
          defenseBonus: Number(P.defenseBonus ?? 0),
          equipped: !!P.equipped,
          isPrimary: !!P.isPrimary,
          durability: `${Number(((Ce = R == null ? void 0 : R.durability) == null ? void 0 : Ce.current) ?? ((Ne = P.durability) == null ? void 0 : Ne.current) ?? 0)}/${Number(((ue = R == null ? void 0 : R.durability) == null ? void 0 : ue.max) ?? ((Te = P.durability) == null ? void 0 : Te.max) ?? 0)}`,
          mitigationLabel: Object.entries((R == null ? void 0 : R.mitigationByType) ?? (R == null ? void 0 : R.typedMitigation) ?? P.mitigationByType ?? {}).filter(([, pt]) => Number(pt) > 0).map(([pt, Rt]) => `${pt} +${Rt}`).join(", ")
        };
      }),
      gear: (((mt = s.items) == null ? void 0 : mt.gear) ?? []).map((P) => {
        var R, te;
        return {
          id: P.id,
          name: P.name,
          img: P.img,
          quantity: Number(((R = P.system) == null ? void 0 : R.quantity) ?? 1) || 1,
          equipped: !!((te = P.system) != null && te.equipped)
        };
      })
    }, s;
  }
  _onRender(t, s) {
    super._onRender(t, s), _(this, I, vi).call(this), _(this, I, Pi).call(this);
  }
  async close(t = {}) {
    return _(this, I, gs).call(this), super.close(t);
  }
  async _onEdgeSet(t, s) {
    var c, u, d;
    if (t.preventDefault(), t.stopPropagation(), !this.isEditable) return;
    const i = ((c = s == null ? void 0 : s.closest) == null ? void 0 : c.call(s, "[data-edge-pool][data-edge-value]")) ?? ((d = (u = t == null ? void 0 : t.target) == null ? void 0 : u.closest) == null ? void 0 : d.call(u, "[data-edge-pool][data-edge-value]"));
    if (!i) return;
    const a = String(i.dataset.edgePool ?? "").trim(), n = Number(i.dataset.edgeValue ?? NaN);
    if (!a || !Number.isFinite(n)) return;
    const o = this.actor.getEdgePool(a);
    if (!(o != null && o.hasPools)) return;
    let l = n;
    return n === o.effectiveValue && (l = n - 1), (t.button === 2 || t.type === "contextmenu") && (l = 0), t.altKey && (l = 0), t.shiftKey && (l = o.effectiveMax), this.actor.setEdgePoolValue(a, l);
  }
  async _onToggleCombatMenu(t, s) {
    var a, n, o, l, c, u, d;
    (a = t == null ? void 0 : t.preventDefault) == null || a.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const i = String(
      ((o = s == null ? void 0 : s.dataset) == null ? void 0 : o.combatMenu) ?? ((d = (u = (c = (l = t == null ? void 0 : t.target) == null ? void 0 : l.closest) == null ? void 0 : c.call(l, "[data-combat-menu]")) == null ? void 0 : u.dataset) == null ? void 0 : d.combatMenu) ?? ""
    ).trim();
    i && (ye(this, Re, W(this, Re) === i ? null : i), _(this, I, ke).call(this, !1));
  }
  async _onToggleStatuses(t) {
    var a, n, o, l, c, u, d, m;
    if ((a = t == null ? void 0 : t.preventDefault) == null || a.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t), !this.isEditable) return;
    const s = this.getPersistentActor() ?? this.actor, i = ((o = this.getSheetTokenDocument) == null ? void 0 : o.call(this)) ?? ((c = pe.getSnapshot(s, { token: ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? null })) == null ? void 0 : c.tokenDocument) ?? ((d = pe.getSnapshot(this.actor, { token: ((u = this.getSheetTokenDocument) == null ? void 0 : u.call(this)) ?? null })) == null ? void 0 : d.tokenDocument) ?? null;
    if (!i) {
      (m = ui.notifications) == null || m.warn("Statuses require a token for this actor on the current scene.");
      return;
    }
    return Za({
      actor: s,
      token: i
    });
  }
  async _onCombatSpend(t, s) {
    var c, u, d, m, p, h, y, w, g, A;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const i = String(((d = s == null ? void 0 : s.dataset) == null ? void 0 : d.resource) ?? "").trim(), a = Math.max(0, Number(((m = s == null ? void 0 : s.dataset) == null ? void 0 : m.cost) ?? 0)), n = String(((p = s == null ? void 0 : s.dataset) == null ? void 0 : p.combatAction) ?? "").trim(), o = String(((h = s == null ? void 0 : s.dataset) == null ? void 0 : h.combatLabel) ?? "").trim(), l = String(((y = s == null ? void 0 : s.dataset) == null ? void 0 : y.combatCostLabel) ?? "").trim();
    if (!(!i || !a || !n))
      try {
        const M = this.getPersistentActor() ?? this.actor, k = await pe.spendResource(M, {
          token: ((w = this.getSheetTokenDocument) == null ? void 0 : w.call(this)) ?? pe.getCurrentSceneTokenDocument(M) ?? pe.getCurrentSceneTokenDocument(this.actor),
          resource: i,
          cost: a,
          actionId: n,
          actionLabel: o,
          actionCostLabel: l
        });
        if (!(k != null && k.ok)) {
          (g = ui.notifications) == null || g.warn((k == null ? void 0 : k.reason) ?? "Unable to spend action.");
          return;
        }
        _(this, I, qe).call(this, { rerender: !1 }), _(this, I, ke).call(this, { force: !0 });
      } catch (M) {
        console.error("MWD | Failed to spend combat action", M), (A = ui.notifications) == null || A.error("Unable to spend action.");
      }
  }
  async _onCombatReduceBurn(t) {
    var s, i, a, n, o;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (i = t == null ? void 0 : t.stopPropagation) == null || i.call(t), !!this.isEditable)
      try {
        const l = this.getPersistentActor() ?? this.actor, c = await pe.reduceBurn(l, {
          token: ((a = this.getSheetTokenDocument) == null ? void 0 : a.call(this)) ?? pe.getCurrentSceneTokenDocument(l) ?? pe.getCurrentSceneTokenDocument(this.actor)
        });
        if (!(c != null && c.ok)) {
          (n = ui.notifications) == null || n.warn((c == null ? void 0 : c.reason) ?? "Unable to reduce Burn.");
          return;
        }
        _(this, I, qe).call(this, { rerender: !1 }), _(this, I, ke).call(this, { force: !0 });
      } catch (l) {
        console.error("MWD | Failed to reduce Burn", l), (o = ui.notifications) == null || o.error("Unable to reduce Burn.");
      }
  }
  async _onCombatOverloadCheck(t, s) {
    var n, o, l, c, u, d, m, p, h, y, w;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const i = ((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.roll) ?? ((m = (d = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : d.dataset) == null ? void 0 : m.roll);
    if (!i) return;
    let a;
    try {
      a = JSON.parse(i);
    } catch (g) {
      console.warn("MWD | Invalid overload payload", i, g);
      return;
    }
    try {
      const g = this.getPersistentActor() ?? this.actor, A = await ((y = (h = (p = game.mwd) == null ? void 0 : p.roll) == null ? void 0 : h.execute) == null ? void 0 : y.call(h, { actor: g, payload: a, event: t }));
      if (_(this, I, qe).call(this, { rerender: !1 }), !A) {
        _(this, I, ke).call(this, !1);
        return;
      }
      _(this, I, ke).call(this, { force: !0 });
    } catch (g) {
      console.error("MWD | Failed to launch overload check", g), (w = ui.notifications) == null || w.error("Unable to launch overload check.");
    }
  }
  async _onCombatAttack(t) {
    var o, l, c, u, d, m, p, h, y, w, g, A;
    if ((o = t == null ? void 0 : t.preventDefault) == null || o.call(t), (l = t == null ? void 0 : t.stopPropagation) == null || l.call(t), !this.isEditable) return;
    const s = this.getPersistentActor() ?? this.actor, i = ((c = this.getSheetTokenDocument) == null ? void 0 : c.call(this)) ?? pe.getCurrentSceneTokenDocument(s) ?? pe.getCurrentSceneTokenDocument(this.actor), a = pe.getSnapshot(s, { token: i });
    if (!a.hasCombatant) {
      (u = ui.notifications) == null || u.warn("No combatant on the current scene.");
      return;
    }
    if (!a.isCurrentTurn) {
      (d = ui.notifications) == null || d.warn("Only available during your activation.");
      return;
    }
    if (a.overloaded) {
      (m = ui.notifications) == null || m.warn("Overloaded actors can only recover Burn.");
      return;
    }
    if (a.state.saRemaining < 2) {
      (p = ui.notifications) == null || p.warn("Need 2 SA remaining to attack.");
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
      const M = await ((w = (y = (h = game.mwd) == null ? void 0 : h.roll) == null ? void 0 : y.execute) == null ? void 0 : w.call(y, { actor: s, payload: n, event: t }));
      if (_(this, I, qe).call(this, { rerender: !1 }), !M) {
        _(this, I, ke).call(this, !1);
        return;
      }
      const k = await pe.spendResource(s, {
        token: i,
        resource: "sa",
        cost: 2,
        actionId: "attack",
        actionLabel: "Attack",
        actionCostLabel: "2 SA"
      });
      k != null && k.ok || (g = ui.notifications) == null || g.warn((k == null ? void 0 : k.reason) ?? "Unable to spend attack action."), _(this, I, ke).call(this, { force: !0 });
    } catch (M) {
      console.error("MWD | Failed to launch attack", M), (A = ui.notifications) == null || A.error((M == null ? void 0 : M.message) ?? "Unable to launch attack.");
    }
  }
  async _onCreateOwnedItem(t, s) {
    var l, c, u;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable) return;
    const i = String(((u = s == null ? void 0 : s.dataset) == null ? void 0 : u.itemType) ?? "").trim();
    if (!i) return;
    const a = this.getPersistentActor() ?? this.actor, n = a.items.filter((d) => d.type === i).length, o = i === "personalWeapon" ? "Personal Weapon" : i === "armor" ? "Armor" : i.charAt(0).toUpperCase() + i.slice(1);
    await a.createEmbeddedDocuments("Item", [{
      name: `${o} ${n + 1}`,
      type: i
    }]), _(this, I, ke).call(this, { force: !0 });
  }
  async _onEditOwnedItem(t, s) {
    var a, n, o;
    (a = t == null ? void 0 : t.preventDefault) == null || a.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const i = _(this, I, bt).call(this, s, t);
    (o = i == null ? void 0 : i.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, s) {
    var n, o;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const i = _(this, I, bt).call(this, s, t);
    if (!i) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [i.id]), _(this, I, ke).call(this, { force: !0 });
  }
  async _onToggleOwnedItemEquipped(t, s) {
    var n, o, l, c;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const i = _(this, I, bt).call(this, s, t);
    if (!i) return;
    const a = this.getPersistentActor() ?? this.actor;
    await ((c = a.setOwnedItemEquipped) == null ? void 0 : c.call(a, i.id, !((l = i.system) != null && l.equipped))), _(this, I, ke).call(this, { force: !0 });
  }
  async _onSetOwnedItemPrimary(t, s) {
    var n, o, l, c;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const i = _(this, I, bt).call(this, s, t);
    if (!i) return;
    const a = this.getPersistentActor() ?? this.actor;
    await ((c = a.setOwnedItemPrimary) == null ? void 0 : c.call(a, i.id, !((l = i.system) != null && l.isPrimary))), _(this, I, ke).call(this, { force: !0 });
  }
  async _onAttackWeapon(t, s) {
    var n, o, l, c, u, d, m, p, h, y, w;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const i = ((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.roll) ?? ((m = (d = (u = (c = t == null ? void 0 : t.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-roll]")) == null ? void 0 : d.dataset) == null ? void 0 : m.roll);
    if (!i) return;
    let a;
    try {
      a = JSON.parse(i);
    } catch (g) {
      console.warn("MWD | Invalid attack payload", i, g);
      return;
    }
    try {
      const g = this.getPersistentActor() ?? this.actor;
      if (!await ((y = (h = (p = game.mwd) == null ? void 0 : p.roll) == null ? void 0 : h.execute) == null ? void 0 : y.call(h, { actor: g, payload: a, event: t }))) return;
      _(this, I, ke).call(this, { force: !0 });
    } catch (g) {
      console.error("MWD | Failed to launch weapon attack", g), (w = ui.notifications) == null || w.error((g == null ? void 0 : g.message) ?? "Unable to attack with that weapon.");
    }
  }
};
Re = new WeakMap(), Ge = new WeakMap(), Ke = new WeakMap(), I = new WeakSet(), vi = function() {
  _(this, I, gs).call(this), W(this, Re) && (ye(this, Ge, (t) => {
    var a;
    const s = this._getRootElement();
    if (!s) return;
    const i = t.target;
    if (i instanceof Node && !((a = i.closest) != null && a.call(i, ".mwd-combat-menu"))) {
      if (!s.contains(i)) {
        _(this, I, qe).call(this);
        return;
      }
      _(this, I, qe).call(this);
    }
  }), document.addEventListener("click", W(this, Ge)));
}, gs = function() {
  W(this, Ge) && (document.removeEventListener("click", W(this, Ge)), ye(this, Ge, null));
}, Lt = function() {
  const t = this._getRootElement();
  return t ? t.querySelector(".mwd-scroll-area") ?? t.querySelector(".csb-tab-panels") : null;
}, Ci = function() {
  const t = _(this, I, Lt).call(this);
  if (!(t instanceof HTMLElement)) {
    ye(this, Ke, null);
    return;
  }
  ye(this, Ke, {
    top: t.scrollTop,
    left: t.scrollLeft
  });
}, Pi = function() {
  const t = W(this, Ke);
  if (!t) return;
  const s = _(this, I, Lt).call(this);
  s instanceof HTMLElement && (s.scrollTop = t.top, s.scrollLeft = t.left, requestAnimationFrame(() => {
    const i = _(this, I, Lt).call(this);
    i instanceof HTMLElement && (i.scrollTop = t.top, i.scrollLeft = t.left);
  }), ye(this, Ke, null));
}, ke = function(t = !1) {
  _(this, I, Ci).call(this), this.render(t);
}, qe = function({ rerender: t = !0 } = {}) {
  W(this, Re) && (ye(this, Re, null), t && _(this, I, ke).call(this, !1));
}, bt = function(t, s) {
  var a, n, o, l, c, u, d, m;
  const i = String(
    ((a = t == null ? void 0 : t.dataset) == null ? void 0 : a.itemId) ?? ((l = (o = (n = t == null ? void 0 : t.closest) == null ? void 0 : n.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((m = (d = (u = (c = s == null ? void 0 : s.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
  ).trim();
  return i ? this.actor.items.get(i) ?? null : null;
}, v(re, "PARTS", {
  sheet: {
    get template() {
      return `${O}/v2/actor/character-sheet.hbs`;
    }
  }
}), v(re, "DEFAULT_OPTIONS", foundry.utils.mergeObject(st(re, re, "DEFAULT_OPTIONS"), {
  classes: ["character-sheet", S, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
  window: { minWidth: 450, minHeight: 740, resizable: !0 },
  position: { width: 980, height: 900 },
  actions: {
    ...st(re, re, "DEFAULT_OPTIONS").actions,
    edgeSet: re.prototype._onEdgeSet,
    toggleCombatMenu: re.prototype._onToggleCombatMenu,
    toggleStatuses: re.prototype._onToggleStatuses,
    combatSpend: re.prototype._onCombatSpend,
    combatReduceBurn: re.prototype._onCombatReduceBurn,
    combatOverloadCheck: re.prototype._onCombatOverloadCheck,
    combatAttack: re.prototype._onCombatAttack,
    createOwnedItem: re.prototype._onCreateOwnedItem,
    editOwnedItem: re.prototype._onEditOwnedItem,
    deleteOwnedItem: re.prototype._onDeleteOwnedItem,
    toggleOwnedItemEquipped: re.prototype._onToggleOwnedItemEquipped,
    setOwnedItemPrimary: re.prototype._onSetOwnedItemPrimary,
    attackWeapon: re.prototype._onAttackWeapon
  }
}));
let fs = re;
class Ei extends ut {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["npc-sheet", S, "actor-sheet-v2"]
    });
  }
}
v(Ei, "PARTS", {
  sheet: {
    get template() {
      return `${O}/actor/npc.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class Ri extends ut {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["vehicle-sheet", S, "actor-sheet-v2"],
      position: { width: 860, height: 820 }
    });
  }
}
v(Ri, "PARTS", {
  sheet: {
    get template() {
      return `${O}/actor/vehicle.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
class Ni extends ut {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["battlemech-sheet", S, "actor-sheet-v2"],
      position: { width: 900, height: 820 }
    });
  }
}
v(Ni, "PARTS", {
  sheet: {
    get template() {
      return `${O}/actor/battlemech.hbs`;
    },
    scrollable: [".sheet-body"]
  }
});
function ir() {
  console.log(`${Y}Registering Actor sheets (V2)`);
  const { Actors: r } = foundry.documents.collections;
  r.registerSheet(S, fs, {
    types: ["character"],
    makeDefault: !0,
    label: "Character (V2)"
  }), r.registerSheet(S, Ei, {
    types: ["npc"],
    makeDefault: !0,
    label: "NPC (V2)"
  }), r.registerSheet(S, Ri, {
    types: ["vehicle"],
    makeDefault: !0,
    label: "Vehicle (V2)"
  }), r.registerSheet(S, Ni, {
    types: ["battlemech"],
    makeDefault: !0,
    label: "BattleMech (V2)"
  });
}
const { HandlebarsApplicationMixin: ar } = foundry.applications.api;
var Ye, Qe, wt;
const ge = class ge extends ar(foundry.applications.sheets.ItemSheetV2) {
  constructor() {
    super(...arguments);
    fe(this, Qe);
    fe(this, Ye, /* @__PURE__ */ new Map());
    /** @override */
    v(this, "tabGroups", {
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
        editImage: ge._onEditImage,
        tab: ge.prototype._onClickTab,
        checkbarElement: ge._onClickCheckbar,
        modifierAdd: ge._onModifierAdd,
        modifierDelete: ge._onModifierDelete,
        modifierValueChange: ge._onModifierValueChange,
        modifierConditionChange: ge._onModifierConditionChange,
        modifierSelectionChange: ge._onModifierSelectionChange,
        effectCreate: ge._onEffectCreate,
        effectEdit: ge._onEffectEdit,
        effectDelete: ge._onEffectDelete,
        effectToggleDisabled: ge._onEffectToggleDisabled
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
    const i = ((c = (l = (o = (n = game.system) == null ? void 0 : n.mwd) == null ? void 0 : o.styles) == null ? void 0 : l.selectCssClass) == null ? void 0 : c.call(l)) ?? "mwd-theme-default", a = ["mwd-theme-default", "mwd-theme-sra"];
    return t.classes = t.classes.filter((u) => !a.includes(u)), t.classes.push(i), t;
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
        [f.itemType.mechWeapon]: `${O}/v2/item/mech-weapon-root.hbs`,
        [f.itemType.armor]: `${O}/v2/item/armor.hbs`
      }[i] ?? `${O}/v2/item/${i}.hbs`;
    }
    return ((s = super._getPartTemplate) == null ? void 0 : s.call(this, t)) ?? "";
  }
  /**
   * Override title to show localized item type and name.
   * @override
   */
  get title() {
    const t = this._getCanonicalItemType();
    return `${se.itemType.singular[t] ?? t}: ${this.item.name}`;
  }
  /**
   * Prepare context data for rendering.
   * @param {object} options - Rendering options
   * @returns {Promise<object>} The context object
   * @override
   */
  async _prepareContext(t) {
    var H, L, V, J, z, X;
    const s = await super._prepareContext(t), i = ((L = (H = game.system.mwd.modifiers) == null ? void 0 : H.getEnums) == null ? void 0 : L.call(H)) ?? {}, a = foundry.utils.deepClone((s == null ? void 0 : s.options) ?? {}), n = ((J = (V = this.item.actor) == null ? void 0 : V.getAttributes) == null ? void 0 : J.call(V, this.item)) ?? [], o = this._getCanonicalItemType(), l = !this.item.actor, c = !!this.item.actor, u = se.itemType.singular[o] ?? o, d = this._getEffectEntries(), m = d.filter((E) => E.syncedCount > 0).length, p = this.constructor.LAYOUT_ID, h = this.item.actor ? (E) => n.includes(E) : (E) => !0, y = o === f.itemType.skill, g = ["mwd", "item-sheet", this.isEditable ? "editable" : "locked"], A = g.join(" ");
    a.classes = g, a.cssClass = A;
    const M = await foundry.applications.ux.TextEditor.implementation.enrichHTML(this.item.system.description ?? "", {
      async: !0,
      secrets: this.item.isOwner,
      relativeTo: this.item
    }), k = game.user.isGM && this.item.system.gmnotes ? await foundry.applications.ux.TextEditor.implementation.enrichHTML(this.item.system.gmnotes, {
      async: !0,
      secrets: !0,
      relativeTo: this.item
    }) : "", D = foundry.utils.mergeObject(s, {
      // Item data
      item: this.item,
      data: this.item,
      system: this.item.system,
      // Enriched content
      enrichedDescription: M,
      enrichedGMNotes: k,
      // Options for templates
      options: {
        ...a,
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
        j.getEnums(h, y),
        i
      ),
      MWD: se,
      itemSheet: {
        canonicalType: o,
        typeLabel: u,
        isStandalone: l,
        canUseActorControls: c,
        supportsEffectSync: !!((X = (z = this.item).supportsEquippedEffectSync) != null && X.call(z)),
        effectEntries: d,
        effectCount: d.length,
        syncedEffectCount: m,
        summaryChips: this._getSummaryChips(),
        stateChips: this._getStateChips(d)
      },
      // CSS class for form element
      cssClass: A,
      // Tab configuration
      tabs: this._getTabs()
    });
    return p && (D.layout = await Wt.get(p)), D;
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
    var i, a, n;
    const s = [];
    return s.push({ kind: "ownership", label: this.item.actor ? "Owned Item" : "World Item" }), Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "equipped") && s.push({
      kind: "equipment",
      label: (i = this.item.system) != null && i.equipped ? "Equipped" : "Unequipped",
      tone: (a = this.item.system) != null && a.equipped ? "active" : "muted"
    }), Object.prototype.hasOwnProperty.call(this.item.system ?? {}, "isPrimary") && ((n = this.item.system) != null && n.isPrimary) && s.push({ kind: "role", label: "Primary", tone: "accent" }), t.length && s.push({
      kind: "effects",
      label: `${t.length} Effect${t.length === 1 ? "" : "s"}`,
      tone: t.some((o) => o.syncedCount > 0) ? "active" : "muted"
    }), s;
  }
  _getEffectEntries() {
    var i, a, n, o, l, c;
    const t = /* @__PURE__ */ new Map(), s = ((a = (i = this.item).getSyncedActorEffects) == null ? void 0 : a.call(i)) ?? [];
    for (const u of s) {
      const d = (l = (o = (n = u.flags) == null ? void 0 : n[S]) == null ? void 0 : o.equippedItemSync) == null ? void 0 : l.sourceEffectId;
      if (!d) continue;
      const m = t.get(d) ?? [];
      m.push(u), t.set(d, m);
    }
    return Array.from(((c = this.item.effects) == null ? void 0 : c.contents) ?? []).map((u) => {
      var m, p, h, y, w, g, A;
      const d = t.get(u.id) ?? [];
      return {
        id: u.id,
        name: u.name || "New Effect",
        img: u.img || "icons/svg/aura.svg",
        disabled: !!u.disabled,
        transfer: !!u.transfer,
        changesCount: Array.isArray(u.changes) ? u.changes.length : 0,
        statusesCount: Number(((m = u.statuses) == null ? void 0 : m.size) ?? ((p = u.statuses) == null ? void 0 : p.length) ?? 0),
        durationLabel: (h = u.duration) != null && h.seconds ? `${u.duration.seconds}s` : (y = u.duration) != null && y.rounds ? `${u.duration.rounds} rounds` : "Passive",
        syncedCount: d.length,
        syncLabel: this.item.actor ? (g = (w = this.item).supportsEquippedEffectSync) != null && g.call(w) ? (A = this.item.system) != null && A.equipped ? d.length ? `Synced to actor (${d.length})` : "Pending sync" : "Applies when equipped" : "No equip sync" : "World item"
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
    const a = i.closest(".csb-tabs");
    if (!a) return;
    const n = a.dataset.group || "default", o = i.dataset.tab;
    o && (W(this, Ye).set(n, o), _(this, Qe, wt).call(this, this._getRootElement(), n, o));
  }
  _onRender(t, s) {
    var a, n, o, l;
    (a = super._onRender) == null || a.call(this, t, s), (n = this.window) != null && n.title && (this.window.title.textContent = this.title);
    const i = this._getRootElement();
    if (i) {
      for (const c of i.querySelectorAll(".sheet-tabs")) {
        const u = c.dataset.group || "default", d = Array.from(c.querySelectorAll("[data-tab]"));
        if (!d.length) continue;
        for (const y of d)
          y.addEventListener("click", (w) => {
            w.preventDefault(), w.stopPropagation();
            const g = y.dataset.tab;
            g && (W(this, Ye).set(u, g), _(this, Qe, wt).call(this, i, u, g));
          });
        const m = W(this, Ye).get(u), p = c.dataset.default || ((o = d[0]) == null ? void 0 : o.dataset.tab), h = m || p;
        h && _(this, Qe, wt).call(this, i, u, h);
      }
      for (const c of i.querySelectorAll(".csb-tabs")) {
        const u = c.dataset.group || "default", d = Array.from(c.querySelectorAll(".csb-tab-link[data-tab]"));
        if (!d.length) continue;
        const m = W(this, Ye).get(u), p = c.dataset.default || ((l = d[0]) == null ? void 0 : l.dataset.tab), h = m || p;
        h && _(this, Qe, wt).call(this, i, u, h);
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
    const a = s.closest(".checkbar-root");
    if (!a) return;
    const n = a.dataset.monitorCode, o = Number.parseInt(s.dataset.index), l = s.dataset.checked === "true";
    await i.parent.switchMonitorCheck(n, o, l);
  }
  static async _onEditImage(t) {
    var a, n, o;
    if ((a = t == null ? void 0 : t.preventDefault) == null || a.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t), !this.isEditable) return;
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
    const a = i.dataset.modifierId;
    a && await this.item.deleteModifier(a);
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
    const a = i.dataset.modifierId;
    a && await this.item.changeModifierValue(a, s.value);
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
    const a = i.dataset.modifierId;
    a && await this.item.changeModifierCondition(a, s.value);
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
    const a = i.dataset.modifierId, n = s.dataset.modifierSelect;
    a && n && await this.item.changeModifierSelection(a, n, s.value);
  }
  static async _onEffectCreate(t, s) {
    var a, n, o;
    (a = t == null ? void 0 : t.preventDefault) == null || a.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
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
    const a = this.item.effects.get(i);
    (m = a == null ? void 0 : a.sheet) == null || m.render(!0);
  }
  static async _onEffectDelete(t, s) {
    var a, n, o, l, c, u;
    (a = t == null ? void 0 : t.preventDefault) == null || a.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t);
    const i = ((o = s == null ? void 0 : s.dataset) == null ? void 0 : o.effectId) ?? ((u = (c = (l = s == null ? void 0 : s.closest) == null ? void 0 : l.call(s, "[data-effect-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.effectId);
    i && await this.item.deleteEmbeddedDocuments("ActiveEffect", [i]);
  }
  static async _onEffectToggleDisabled(t, s) {
    var n, o, l, c, u, d;
    (n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const i = ((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.effectId) ?? ((d = (u = (c = s == null ? void 0 : s.closest) == null ? void 0 : c.call(s, "[data-effect-id]")) == null ? void 0 : u.dataset) == null ? void 0 : d.effectId);
    if (!i) return;
    const a = this.item.effects.get(i);
    a && await a.update({ disabled: !a.disabled });
  }
};
Ye = new WeakMap(), Qe = new WeakSet(), wt = function(t, s, i) {
  t && (t.querySelectorAll(`.csb-tabs[data-group="${s}"] .csb-tab-link[data-tab]`).forEach((a) => {
    a.classList.toggle("is-active", a.dataset.tab === i);
  }), t.querySelectorAll(`.csb-tabs[data-group="${s}"] .csb-tab-panel[data-tab]`).forEach((a) => {
    a.classList.toggle("is-active", a.dataset.tab === i);
  }), t.querySelectorAll(".sheet-tabs [data-tab]").forEach((a) => {
    var o;
    (((o = a.closest(".sheet-tabs")) == null ? void 0 : o.dataset.group) || "default") === s && a.classList.toggle("active", a.dataset.tab === i);
  }), t.querySelectorAll(`.tab[data-group="${s}"]`).forEach((a) => {
    a.classList.toggle("active", a.dataset.tab === i);
  }));
}, v(ge, "LAYOUT_ID", null), /** @override */
v(ge, "PARTS", {
  sheet: {
    template: "",
    // Set dynamically in _getPartTemplate
    scrollable: [".sheet-body"]
  }
}), v(ge, "TABS", {
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
let He = ge;
class Di extends He {
}
v(Di, "PARTS", {
  sheet: {
    template: `${O}/v2/item/contact.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Oi extends He {
}
v(Oi, "PARTS", {
  sheet: {
    template: `${O}/v2/item/gear.hbs`,
    scrollable: [".sheet-body"]
  }
});
class _i extends He {
}
v(_i, "PARTS", {
  sheet: {
    template: `${O}/v2/item/quality.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Ii extends He {
}
v(Ii, "PARTS", {
  sheet: {
    template: `${O}/v2/item/assetModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class $i extends He {
}
v($i, "PARTS", {
  sheet: {
    template: `${O}/v2/item/lifeModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Li extends He {
}
v(Li, "PARTS", {
  sheet: {
    template: `${O}/v2/item/skill.hbs`,
    scrollable: [".sheet-body"]
  }
});
const rr = Object.freeze([
  "firearms",
  "projectileWeapons",
  "heavyWeapons",
  "meleeCombat"
]), nr = Object.freeze([
  { value: "energy", label: "Energy" },
  { value: "kinetic", label: "Kinetic" },
  { value: "ballistic", label: "Ballistic" },
  { value: "explosive", label: "Explosive" },
  { value: "plasma", label: "Plasma" },
  { value: "electrical", label: "Electrical" },
  { value: "melee", label: "Melee" },
  { value: "none", label: "None" }
]);
function Ys(r, e, t) {
  const s = String(e ?? "").trim();
  return !s || r.some((i) => i.value === s) ? r : r.concat({ value: s, label: t(s) });
}
class Ut extends He {
  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        weaponSkillChange: Ut._onWeaponSkillChange
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
    var l, c, u, d, m;
    const t = await super._prepareContext(e), s = this._getCanonicalItemType();
    t.ENUMS = foundry.utils.mergeObject(
      { defenses: ae.getDefenses() },
      t.ENUMS
    );
    const i = Array.isArray((l = t.ENUMS) == null ? void 0 : l.skills) ? t.ENUMS.skills : [], a = (c = this.item.system) == null ? void 0 : c.skill, n = (u = this.item.system) == null ? void 0 : u.damageType, o = s === "personalWeapon" ? Ys(
      i.filter((p) => rr.includes(p.value)),
      a,
      (p) => {
        var h;
        return ((h = i.find((y) => y.value === p)) == null ? void 0 : h.label) ?? p;
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
      damageTypes: Ys(
        s === "personalWeapon" ? [...li] : [...nr],
        n,
        (p) => s === "personalWeapon" ? dt(p) : p
      ),
      ranges: Ie.RANGE_ORDER.map((p) => ({
        value: p,
        label: p.charAt(0).toUpperCase() + p.slice(1)
      }))
    }, t.itemSheet = foundry.utils.mergeObject(t.itemSheet ?? {}, {
      isCompactWeaponSheet: !0,
      weaponSheetVariant: s === "mechWeapon" ? "mech" : "personal"
    }), t.itemSheet.stateChips = (t.itemSheet.stateChips ?? []).filter((p) => p.kind !== "ownership"), t;
  }
  /**
   * Handle changing the weapon skill, which updates the defense attribute.
   * @param {Event} event - The triggering event
   * @param {HTMLElement} target - The changed select element
   * @static
   * @async
   */
  static async _onWeaponSkillChange(e, t) {
    var a, n;
    const s = t.value, i = (n = (a = game.system.mwd.skills) == null ? void 0 : a.get) == null ? void 0 : n.call(a, s);
    i != null && i.defense && await this.item.update({ "system.defense": i.defense }, { render: !1 });
  }
}
const kt = class kt extends Ut {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      position: {
        width: 680,
        height: 720
      },
      window: {
        ...super.DEFAULT_OPTIONS.window,
        minWidth: 480,
        minHeight: 480,
        maxWidth: 960
      },
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        attackWeapon: kt._onAttackWeapon
      }
    }, { inplace: !1 });
  }
  async _prepareContext(e) {
    var a, n, o;
    const t = await super._prepareContext(e), s = this.item.actor ?? null, i = !!(s && typeof s.isCharacterLike == "function" && s.isCharacterLike() && ((n = (a = this.item).isPersonalWeapon) != null && n.call(a)));
    return t.itemSheet = foundry.utils.mergeObject(t.itemSheet ?? {}, {
      canAttack: i,
      attackDisabled: !i || !((o = this.item.system) != null && o.equipped)
    }), t.itemSheet.summaryChips = this._getSummaryChips(t.weaponProfile ?? null), t;
  }
  _getSummaryChips(e = ((t) => ((s) => (s = (t = this.item).getCombatProfile) == null ? void 0 : s.call(t))())() ?? null) {
    var i, a;
    return e ? [
      { label: "Category", value: String(e.category ?? "").trim() || "Ranged" },
      { label: "Skill", value: ((i = e.skillDef) == null ? void 0 : i.label) ?? e.skill ?? "Firearms" },
      { label: "DV", value: String(Number(e.damage ?? 0)) },
      { label: "AP", value: String(Number(e.ap ?? 0)) },
      { label: "Type", value: dt(e.damageType) || "Penetrating" },
      { label: "Range", value: String(((a = e.range) == null ? void 0 : a.max) ?? "near").trim() || "Near" }
    ] : [];
  }
  static async _onAttackWeapon(e) {
    var s, i, a, n;
    (s = e == null ? void 0 : e.preventDefault) == null || s.call(e), (i = e == null ? void 0 : e.stopPropagation) == null || i.call(e);
    const t = this.item.actor ?? null;
    !t || !((n = (a = this.item).isPersonalWeapon) != null && n.call(a)) || await game.mwd.roll.execute({
      actor: t,
      payload: {
        intent: "attack",
        weaponId: this.item.id,
        edge: { pool: "physical.grit", allowed: ["pre", "post"] },
        tags: ["combat", "attack"]
      },
      event: e
    });
  }
};
v(kt, "LAYOUT_ID", "personal-weapon"), v(kt, "PARTS", {
  sheet: {
    template: `${O}/v2/item/personal-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
let ys = kt;
class bs extends Ut {
}
v(bs, "LAYOUT_ID", "mech-weapon"), v(bs, "PARTS", {
  sheet: {
    template: `${O}/v2/item/mech-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
class ws extends He {
  async _prepareContext(e) {
    var l, c, u, d, m, p, h, y, w;
    const t = await super._prepareContext(e), s = this.item, i = s.actor ?? null, a = ((l = i == null ? void 0 : i.getPersonalCombatLoadout) == null ? void 0 : l.call(i)) ?? null, n = ((c = a == null ? void 0 : a.activeArmor) == null ? void 0 : c.id) ?? null, o = ((u = a == null ? void 0 : a.activeArmor) == null ? void 0 : u.id) === s.id ? a.activeArmor : null;
    return t.armorState = o, t.isActiveArmor = n === s.id, t.effectiveDurabilityCurrent = Number(
      ((d = o == null ? void 0 : o.durability) == null ? void 0 : d.current) ?? ((p = (m = s.system) == null ? void 0 : m.durability) == null ? void 0 : p.current) ?? ((y = (h = s.system) == null ? void 0 : h.durability) == null ? void 0 : y.max) ?? ((w = s.system) == null ? void 0 : w.rating) ?? 0
    ), t.itemSheet = foundry.utils.mergeObject(t.itemSheet ?? {}, {}), t.itemSheet.summaryChips = this._getSummaryChips(o), t;
  }
  _getSummaryChips(e = null) {
    var s, i, a, n, o;
    const t = this.item.system ?? {};
    return [
      { label: "Rating", value: String(Number((e == null ? void 0 : e.ratingCurrent) ?? t.rating ?? 0)) },
      { label: "Defense", value: String(Number(t.defenseBonus ?? 0)) },
      {
        label: "Durability",
        value: `${Number(((s = e == null ? void 0 : e.durability) == null ? void 0 : s.current) ?? ((i = t.durability) == null ? void 0 : i.current) ?? ((a = t.durability) == null ? void 0 : a.max) ?? 0)}/${Number(((n = e == null ? void 0 : e.durability) == null ? void 0 : n.max) ?? ((o = t.durability) == null ? void 0 : o.max) ?? t.rating ?? 0)}`
      },
      {
        label: "Resist",
        value: String(Number((e == null ? void 0 : e.baseMitigation) ?? (e == null ? void 0 : e.baseResistance) ?? 0))
      }
    ];
  }
}
v(ws, "LAYOUT_ID", "armor"), v(ws, "PARTS", {
  sheet: {
    template: `${O}/v2/item/armor-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
function or() {
  console.log(`${Y}Registering Item sheets (V2)`);
  const { Items: r } = foundry.documents.collections;
  r.registerSheet(S, Di, { types: ["contact"], makeDefault: !0, label: "Contact (V2)" }), r.registerSheet(S, Oi, { types: ["gear"], makeDefault: !0, label: "Gear (V2)" }), r.registerSheet(S, _i, { types: ["quality"], makeDefault: !0, label: "Quality (V2)" }), r.registerSheet(S, Ii, { types: ["assetModule"], makeDefault: !0, label: "Asset Module (V2)" }), r.registerSheet(S, $i, { types: ["lifeModule"], makeDefault: !0, label: "Life Module (V2)" }), r.registerSheet(S, Li, { types: ["skill"], makeDefault: !0, label: "Skill (V2)" }), r.registerSheet(S, ys, { types: ["personalWeapon", "weapon"], makeDefault: !0, label: "Personal Weapon (V2)" }), r.registerSheet(S, bs, { types: ["mechWeapon"], makeDefault: !0, label: "Mech Weapon (V2)" }), r.registerSheet(S, ws, { types: ["armor"], makeDefault: !0, label: "Armor (V2)" });
}
const Qs = [
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
  // Character UI
  `systems/${S}/templates/v2/ui/character/attributes.hbs`,
  `systems/${S}/templates/v2/ui/character/combat-actions.hbs`,
  `systems/${S}/templates/v2/ui/character/skills-column.hbs`,
  `systems/${S}/templates/v2/ui/character/skill-row.hbs`,
  `systems/${S}/templates/v2/ui/character/edge-console.hbs`,
  `systems/${S}/templates/v2/ui/character/burn-monitor.hbs`,
  `systems/${S}/templates/v2/ui/character/status-dashboard.hbs`,
  // Sheet wrapper
  `systems/${S}/templates/v2/actor/_sheet-root.hbs`,
  // Placeholders
  `systems/${S}/templates/v2/ui/placeholders/assigned-systems.hbs`,
  `systems/${S}/templates/v2/ui/placeholders/inventory-gear.hbs`,
  `systems/${S}/templates/v2/ui/placeholders/inventory-armor.hbs`,
  `systems/${S}/templates/v2/ui/placeholders/inventory-weapons.hbs`,
  `systems/${S}/templates/v2/ui/placeholders/bio-description.hbs`,
  // V2 item partials
  `systems/${S}/templates/v2/item/_item-sheet-root.hbs`,
  `systems/${S}/templates/v2/item/personal-weapon-root.hbs`,
  `systems/${S}/templates/v2/item/mech-weapon-root.hbs`,
  `systems/${S}/templates/v2/item/armor-root.hbs`,
  `systems/${S}/templates/v2/item/parts/itemname.hbs`,
  `systems/${S}/templates/v2/item/parts/inactive.hbs`,
  `systems/${S}/templates/v2/item/parts/references.hbs`,
  `systems/${S}/templates/v2/item/parts/modifier.hbs`,
  `systems/${S}/templates/v2/item/parts/modifiers.hbs`,
  `systems/${S}/templates/v2/item/parts/weapon-main.hbs`,
  `systems/${S}/templates/v2/item/parts/weapon-compact-main.hbs`,
  `systems/${S}/templates/v2/item/parts/armor-main.hbs`,
  `systems/${S}/templates/v2/item/parts/item-effects.hbs`,
  // Actors
  `systems/${S}/templates/v2/actor/character-sheet.hbs`
];
function lr(r) {
  const e = String(r).replaceAll("\\", "/"), t = `systems/${S}/templates/`, s = e.indexOf(t);
  return `mwd.${(s >= 0 ? e.slice(s + t.length) : e).replace(/\.hbs$/i, "").split("/").filter(Boolean).map((o) => o.replace(/^_+/, "")).join(".")}`;
}
function cr() {
  var r, e;
  return ((e = (r = foundry == null ? void 0 : foundry.applications) == null ? void 0 : r.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
async function ur() {
  var e, t;
  const r = cr();
  try {
    const s = {};
    for (const a of Qs)
      s[lr(a)] = a, s[a] = a;
    await foundry.applications.handlebars.loadTemplates(s);
    const i = "mwd.v2.ui.layout-root";
    if (!((e = Handlebars.partials) != null && e[i])) {
      const a = Object.keys(Handlebars.partials ?? {});
      throw console.error("Missing required partial:", i), console.error("Closest matches:", a.filter((n) => n.includes("layout-root"))), new Error(`Template preload failed: ${i} not registered`);
    }
    if (r !== Handlebars) {
      for (const [a, n] of Object.entries(r.partials ?? {}))
        if (!((t = Handlebars.partials) != null && t[a]))
          try {
            Handlebars.registerPartial(a, n);
          } catch {
          }
    }
    console.log(`${Y}preloadTemplatesV2 OK`, { loaded: Qs.length });
  } catch (s) {
    throw console.error(`${Y}preloadTemplatesV2 FAILED`, s), s;
  }
}
function Js(r) {
  const e = Math.max(0, Number(r) || 0);
  return -Math.floor(e / 3);
}
function dr(r) {
  const e = Math.max(0, Number(r) || 0);
  return e === 0 ? 0 : Math.ceil(e / 4);
}
function mr(r = {}) {
  const e = r.physical ?? {}, t = r.fatigue ?? {}, s = r.armor ?? {}, i = Number(e.value) || 0, a = Number(t.value) || 0, n = Math.max(Number(s.value) || 0, Number(s.max) || 0);
  return {
    physical: { penalty: Js(i) },
    fatigue: { penalty: Js(a) },
    armor: { resistance: dr(n) }
  };
}
const Qt = {
  penaltyPer3Damage: (r) => {
    const e = Math.max(0, Number(r) || 0);
    return -Math.floor(e / 3);
  },
  resistancePerQuarter: (r) => {
    const e = Math.max(0, Number(r) || 0);
    return e === 0 ? 0 : Math.ceil(e / 4);
  }
  // heatPenaltyCurve: ...
};
function pr(r, e, t, s) {
  const i = r.system ?? {}, a = `monitors.${e}`, n = Number(foundry.utils.getProperty(i, `${a}.max`)) || 0, o = Number(foundry.utils.getProperty(i, `${a}.value`)) || 0;
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
function hr(r = {}) {
  return Object.entries(Mt(r)).filter(([, e]) => Number(e) > 0).map(([e, t]) => `${e} +${t}`).join(", ");
}
class fr extends Actor {
  /* -------------------------------------------- */
  /* Base & Derived Data                           */
  /* -------------------------------------------- */
  /** @override */
  prepareBaseData() {
    var e, t;
    if (super.prepareBaseData(), this.isCharacterLike()) {
      const s = this.system ?? {};
      if (ya(s), (e = s.skills) != null && e.skills && typeof s.skills.skills == "object") {
        for (const [i, a] of Object.entries(s.skills.skills))
          (t = s.skills)[i] ?? (t[i] = a);
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
        const a = Object.prototype.hasOwnProperty.call(i, "value"), n = Number(i.value);
        (!a || !Number.isFinite(n)) && (i.value = i.rating), "max" in i && delete i.max;
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
      const i = ((s = (t = this.system) == null ? void 0 : t.counters) == null ? void 0 : s.edgePools) ?? {}, a = {};
      for (const [n, o] of Object.entries(i)) {
        const l = Math.max(0, Number((o == null ? void 0 : o.rating) ?? 0)), c = Math.max(0, Number((o == null ? void 0 : o.value) ?? 0)), u = Math.min(l, e), d = Math.min(c, u);
        a[n] = {
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
      this._mwdDerived.edgePools = { cap: e, pools: a };
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
    const e = [], t = this.items.filter((p) => {
      var h;
      return ((h = p.isPersonalWeapon) == null ? void 0 : h.call(p)) ?? p.type === f.itemType.personalWeapon;
    }).map((p) => {
      var h;
      return ((h = p.getCombatProfile) == null ? void 0 : h.call(p)) ?? null;
    }).filter(Boolean), s = this.items.filter((p) => {
      var h;
      return ((h = p.isArmor) == null ? void 0 : h.call(p)) ?? p.type === f.itemType.armor;
    }).map((p) => {
      var h;
      return ((h = p.getArmorProfile) == null ? void 0 : h.call(p, { actor: this })) ?? null;
    }).filter(Boolean), i = t.filter((p) => p.equipped), a = s.filter((p) => p.equipped), n = i.filter((p) => p.isPrimary), o = a.filter((p) => p.isPrimary);
    let l = null, c = null, u = !1;
    n.length === 1 ? (c = n[0], l = c) : n.length > 1 ? (e.push("Multiple equipped primary weapons found; attack selection requires a chooser."), u = !0) : i.length === 1 ? l = i[0] : i.length > 1 ? u = !0 : l = {
      ...Ie.DEFAULT_UNARMED,
      uuid: null,
      img: null,
      item: null,
      equipped: !0,
      isPrimary: !1,
      defaultRangeBand: "close",
      isSynthetic: !0
    };
    let d = null, m = null;
    return o.length === 1 ? (d = o[0], m = this._buildActiveArmorState(d)) : o.length > 1 ? (e.push("Multiple equipped primary armor items found; using the first equipped armor."), m = a[0] ? this._buildActiveArmorState(a[0]) : null) : a.length === 1 ? m = this._buildActiveArmorState(a[0]) : a.length > 1 && (e.push("Multiple equipped armor items found without a single primary; using the first equipped armor."), m = this._buildActiveArmorState(a[0])), {
      weapons: t,
      equippedWeapons: i,
      primaryWeapon: c,
      defaultWeapon: l,
      weaponChoiceRequired: u,
      armor: s,
      equippedArmor: a,
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
    ), i = Mt(e == null ? void 0 : e.mitigationByType), a = vs(s);
    return {
      ...e,
      armorId: e.id,
      remainingDurability: s,
      currentArmorRating: s,
      baseMitigation: a,
      baseResistance: a,
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
    var i, a, n;
    const s = this.getOwnedItem(e);
    return !s || !((i = s.isPersonalWeapon) != null && i.call(s) || (a = s.isArmor) != null && a.call(s)) ? null : this.updateEmbeddedDocuments("Item", [{
      _id: s.id,
      "system.equipped": !!t,
      "system.isPrimary": t ? !!((n = s.system) != null && n.isPrimary) : !1
    }]);
  }
  async setOwnedItemPrimary(e, t) {
    var n, o, l, c;
    const s = this.getOwnedItem(e);
    if (!s || !((n = s.isPersonalWeapon) != null && n.call(s) || (o = s.isArmor) != null && o.call(s))) return null;
    const i = [], a = !!t;
    if (a)
      for (const u of this.items.filter((d) => d.type === s.type && d.id !== s.id))
        (l = u.system) != null && l.isPrimary && i.push({ _id: u.id, "system.isPrimary": !1 });
    return i.push({
      _id: s.id,
      "system.isPrimary": a,
      "system.equipped": a ? !0 : !!((c = s.system) != null && c.equipped)
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
      const m = t, p = t;
      return {
        key: e,
        value: p,
        rating: m,
        effectiveValue: p,
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
    const i = this.getEdgePoolRaw(e), a = Math.max(0, Number((i == null ? void 0 : i.rating) ?? 0)), n = Math.max(0, Number((i == null ? void 0 : i.value) ?? 0)), o = Math.min(a, t), l = Math.min(n, o);
    return {
      key: e,
      value: n,
      rating: a,
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
    const s = this.getEdgeCap(), i = this.getEdgePoolRaw(e), a = Math.max(0, Number((i == null ? void 0 : i.rating) ?? 0)), n = Math.min(a, s), o = Number(t ?? 0), l = Math.max(0, Math.min(o, n));
    return this.update({
      [`system.counters.edgePools.${e}.value`]: l
    });
  }
  /**
   * Convenience: adjust CURRENT value by delta (e.g., spend -1, award +1).
   */
  async adjustEdgePoolValue(e, t) {
    var a;
    if (!this.hasEdgePools()) return;
    const s = Math.max(0, Number(((a = this.getEdgePoolRaw(e)) == null ? void 0 : a.value) ?? 0)), i = Number(t ?? 0);
    return this.setEdgePoolValue(e, s + i);
  }
  /**
   * Set the RATING (advancement ceiling) for a pool.
   * Stores true rating (not cap-clamped), then clamps current value to new effective max.
   */
  async setEdgePoolRating(e, t) {
    var l;
    if (!this.hasEdgePools()) return;
    const s = this.getEdgeCap(), i = Math.max(0, Number(t ?? 0)), a = Math.min(i, s), n = Math.max(0, Number(((l = this.getEdgePoolRaw(e)) == null ? void 0 : l.value) ?? 0)), o = Math.min(n, a);
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
    var s, i, a, n;
    const t = this.getEdgeCap();
    if (this.hasEdgePools()) {
      const o = ((i = (s = this._mwdDerived) == null ? void 0 : s.edgePools) == null ? void 0 : i.pools) ?? {};
      if (e && typeof e == "object") {
        const c = Object.entries(e).map(([u, d]) => {
          const m = (d ?? []).map((p) => {
            const h = o[p] ?? this.getEdgePool(p);
            return {
              ...h,
              isEmpty: (h.effectiveValue ?? 0) <= 0,
              isCapped: (h.rating ?? 0) > (h.cap ?? t)
            };
          });
          return { id: u, pools: m };
        });
        return { cap: t, hasPools: !0, groups: c, pools: [] };
      }
      const l = Object.keys(((n = (a = this.system) == null ? void 0 : a.counters) == null ? void 0 : n.edgePools) ?? {}).map((c) => {
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
  _onCreateDescendantDocuments(e, t, s, i, a, n) {
    super._onCreateDescendantDocuments(e, t, s, i, a, n), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  _onUpdateDescendantDocuments(e, t, s, i, a, n) {
    super._onUpdateDescendantDocuments(e, t, s, i, a, n), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  _onDeleteDescendantDocuments(e, t, s, i, a, n) {
    super._onDeleteDescendantDocuments(e, t, s, i, a, n), t === "effects" && this._syncOverloadedFieldFromEffects();
  }
  async _syncOverloadedEffect(e) {
    await this.toggleStatusEffect("overloaded", { active: e, overlay: !1 });
  }
  async _syncOverloadedFieldFromEffects() {
    var s, i, a, n;
    const e = ((i = (s = this.statuses) == null ? void 0 : s.has) == null ? void 0 : i.call(s, "overloaded")) ?? !1, t = !!((n = (a = this.system) == null ? void 0 : a.burn) != null && n.overloaded);
    e !== t && await this.update(
      { "system.burn.overloaded": e },
      { mwdSyncOverloadedFromEffect: !0 }
    );
  }
  /* -------------------------------------------- */
  /* Condition Monitors                            */
  /* -------------------------------------------- */
  async setMonitorValue(e, t, { source: s = "unknown" } = {}) {
    var d, m, p, h, y, w;
    if (e === "burn") {
      const g = Math.max(0, Number(t) || 0);
      return this.update({ "system.burn.value": g });
    }
    if (e === "armor" && this.isCharacterLike()) {
      const g = this.getPersonalCombatLoadout({ refresh: !0 }), A = ((d = g == null ? void 0 : g.activeArmor) == null ? void 0 : d.armorId) ?? ((m = g == null ? void 0 : g.activeArmor) == null ? void 0 : m.id) ?? null, M = A ? this.items.get(A) : null;
      if (!(M != null && M.id)) return null;
      const k = Math.max(0, Number(((p = M.system) == null ? void 0 : p.rating) ?? 0) || 0), D = Math.max(0, Number(((y = (h = M.system) == null ? void 0 : h.durability) == null ? void 0 : y.max) ?? 0) || 0), H = D > 0 ? D : k, L = Math.min(Math.max(0, Number(t) || 0), H);
      return this.updateEmbeddedDocuments("Item", [{
        _id: M.id,
        "system.durability.max": H,
        "system.durability.current": L
      }]);
    }
    const i = `system.monitors.${e}`, a = Number(foundry.utils.getProperty(this, `${i}.max`)) || 0, n = Math.max(0, a), o = Math.min(Math.max(0, Number(t) || 0), n), l = { [`${i}.value`]: o }, c = this.type, u = (w = jt == null ? void 0 : jt[c]) == null ? void 0 : w[e];
    if (u != null && u.derived)
      for (const [g, A] of Object.entries(u.derived)) {
        const M = Qt == null ? void 0 : Qt[A.fn];
        if (typeof M != "function") continue;
        const k = pr(this, e, A.source, o);
        l[`${i}.derived.${g}`] = M(k);
      }
    return this.update(l);
  }
  _prepareMonitors() {
    var n, o, l, c;
    const e = this.system.monitors ?? {}, t = mr(e);
    (n = this.system).derived ?? (n.derived = {}), this.system.derived.monitors = t;
    const s = Number(((o = t == null ? void 0 : t.physical) == null ? void 0 : o.penalty) ?? 0), i = Number(((l = t == null ? void 0 : t.fatigue) == null ? void 0 : l.penalty) ?? 0), a = s + i;
    (c = this.system.derived).condition ?? (c.condition = {}), this.system.derived.condition.physicalPenalty = s, this.system.derived.condition.fatiguePenalty = i, this.system.derived.condition.totalPenalty = a, this.system.derived.conditionPenalty = a;
  }
  _preparePersonalCombatDerived() {
    var n, o, l, c, u, d;
    if (!this.isCharacterLike()) return;
    const e = this.getPersonalCombatLoadout({ refresh: !0 }), t = (o = (n = this.system) == null ? void 0 : n.monitors) == null ? void 0 : o.armor;
    if (!t) return;
    const s = e.activeArmor, i = Math.max(0, Number(((l = s == null ? void 0 : s.durability) == null ? void 0 : l.max) ?? 0)), a = Math.max(0, Number((s == null ? void 0 : s.currentArmorRating) ?? ((c = s == null ? void 0 : s.durability) == null ? void 0 : c.current) ?? 0));
    t.max = i, t.value = Math.min(i, a), t.resistance = {
      default: Number((s == null ? void 0 : s.baseMitigation) ?? (s == null ? void 0 : s.baseResistance) ?? 0),
      byType: {}
    }, t.resistanceBonusByType = s != null && s.isDestroyed ? {} : (s == null ? void 0 : s.mitigationByType) ?? (s == null ? void 0 : s.typedMitigation) ?? {}, t.derived ?? (t.derived = {}), t.derived.resistance = Number((s == null ? void 0 : s.baseMitigation) ?? (s == null ? void 0 : s.baseResistance) ?? 0), t.effect = s != null && s.isDestroyed ? "Destroyed" : s ? hr(s.mitigationByType ?? s.typedMitigation) : "", (u = this.system).derived ?? (u.derived = {}), this.system.derived.personalCombat = {
      defaultWeaponId: ((d = e.defaultWeapon) == null ? void 0 : d.id) ?? null,
      activeArmorId: (s == null ? void 0 : s.id) ?? null,
      warnings: [...e.warnings ?? []]
    };
  }
}
async function gr({ actor: r, payload: e } = {}) {
  var m, p, h, y, w, g;
  if (!r) throw new Error("resolveSkill requires actor");
  const t = String((e == null ? void 0 : e.key) ?? "").trim(), s = Ze(t);
  if (!s) throw new Error(`Unknown skill: ${t}`);
  const i = r.system ?? {}, a = String((e == null ? void 0 : e.attrKey) ?? s.attribute ?? "").trim();
  if (!a) throw new Error(`Skill ${t} missing attribute key`);
  const n = Number(((p = (m = i == null ? void 0 : i.attributes) == null ? void 0 : m[a]) == null ? void 0 : p.value) ?? 0), o = Number(((y = (h = i == null ? void 0 : i.skills) == null ? void 0 : h[t]) == null ? void 0 : y.rating) ?? 0), l = Number(((g = (w = i == null ? void 0 : i.skills) == null ? void 0 : w[t]) == null ? void 0 : g.bonus) ?? 0), c = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : s.domains ?? [], u = Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : Number.isFinite(Number(e == null ? void 0 : e.target)) ? Number(e.target) : 5, d = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1;
  return {
    intent: "skill",
    rollType: "simple",
    title: `${s.label} (${a})`,
    subtitle: r.name ?? "Actor",
    domains: c,
    // Per-die threshold (cs>=X). Kept separate from dnHits.
    diceTarget: u,
    // DN = hits needed for success
    difficulty: { dn: d },
    edge: {
      earn: { enabled: !0, rate: 4, maxPerRoll: 1 }
    },
    pool: { attribute: n, skill: o, bonus: l },
    breakdown: [
      { id: "attribute", label: "Attribute", value: n },
      { id: "skill", label: "Skill", value: o },
      { id: "bonus", label: "Bonus", value: l }
    ],
    // optional extra metadata (safe to stash)
    data: {
      skillKey: t,
      attrKey: a,
      label: `${a}+${s.label}`
    }
  };
}
const yr = /* @__PURE__ */ new Set([
  "grit",
  "chaos",
  "insight",
  "rumor",
  "legend",
  "credibility"
]), br = {
  grit: "physical",
  chaos: "physical",
  insight: "mental",
  rumor: "mental",
  legend: "social",
  credibility: "social"
};
async function wr({ actor: r, payload: e } = {}) {
  if (!r) throw new Error("resolveEdge requires actor");
  const t = String((e == null ? void 0 : e.pool) ?? "").trim();
  if (!yr.has(t)) throw new Error(`Invalid edge pool: ${t}`);
  const s = r.getEdgePool(t), i = Math.max(0, Number((s == null ? void 0 : s.effectiveValue) ?? 0));
  return {
    intent: "edge",
    title: `Edge — ${t}`,
    subtitle: r.name ?? "Actor",
    domains: [br[t] ?? "unknown"],
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
async function Ar({ actor: r, payload: e, event: t } = {}) {
  return {
    title: "Attribute",
    intent: "attribute",
    domainTags: ["general"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
function Tr() {
  var e;
  const r = Array.from(((e = game.user) == null ? void 0 : e.targets) ?? []);
  if (r.length !== 1)
    throw new Error("Personal attacks require exactly one targeted token.");
  return r[0];
}
function kr(r, e) {
  var s, i, a, n, o, l;
  if (((s = e == null ? void 0 : e.syntheticWeapon) == null ? void 0 : s.id) === "unarmed")
    return {
      ...Ie.DEFAULT_UNARMED,
      ...e.syntheticWeapon,
      isSynthetic: !0,
      defaultRangeBand: "close"
    };
  const t = ((a = (i = r.items) == null ? void 0 : i.get) == null ? void 0 : a.call(i, (e == null ? void 0 : e.weaponId) ?? "")) ?? null;
  if (!t || !(((n = t.isPersonalWeapon) == null ? void 0 : n.call(t)) ?? t.type === "personalWeapon") || !((o = t.system) != null && o.equipped))
    throw new Error("Attack requires an equipped personal weapon.");
  return ((l = t.getCombatProfile) == null ? void 0 : l.call(t)) ?? null;
}
async function Sr({ actor: r, payload: e } = {}) {
  var g, A, M, k, D, H, L, V, J, z, X, E, x, q, ee, ie, he, Ae;
  if (!r) throw new Error("resolveAttack requires actor");
  const t = kr(r, e);
  if (!t) throw new Error("Unable to resolve weapon profile.");
  const s = Ze(t.skill) ?? {
    code: t.skill,
    label: t.skill || "Attack",
    attribute: "reflexes",
    domains: ["physical"]
  }, i = String(s.attribute ?? "reflexes").trim() || "reflexes", a = ((g = r.getAttributeValue) == null ? void 0 : g.call(r, i)) ?? Number(((k = (M = (A = r.system) == null ? void 0 : A.attributes) == null ? void 0 : M[i]) == null ? void 0 : k.value) ?? 0), n = ((D = r.getSkillRating) == null ? void 0 : D.call(r, t.skill)) ?? Number(((V = (L = (H = r.system) == null ? void 0 : H.skills) == null ? void 0 : L[t.skill]) == null ? void 0 : V.rating) ?? 0), o = Number(((X = (z = (J = r.system) == null ? void 0 : J.skills) == null ? void 0 : z[t.skill]) == null ? void 0 : X.bonus) ?? 0), l = Number(((E = t == null ? void 0 : t.effects) == null ? void 0 : E.accuracyMod) ?? 0) || 0, c = o + l, u = String((e == null ? void 0 : e.rangeBand) ?? t.defaultRangeBand ?? "close").trim() || "close", d = Number(((x = t == null ? void 0 : t.attackRatingBand) == null ? void 0 : x[u]) ?? 0) || 0, m = Tr(), p = (m == null ? void 0 : m.actor) ?? null, h = ((q = p == null ? void 0 : p.getPersonalCombatLoadout) == null ? void 0 : q.call(p)) ?? null, y = (h == null ? void 0 : h.activeArmor) ?? null, w = p ? {
    tokenId: (m == null ? void 0 : m.id) ?? null,
    tokenUuid: ((ee = m == null ? void 0 : m.document) == null ? void 0 : ee.uuid) ?? null,
    actorId: p.id,
    actorUuid: p.uuid,
    name: p.name ?? (m == null ? void 0 : m.name) ?? "Target",
    activeArmor: y ? {
      armorId: y.id,
      rating: Number(y.ratingCurrent ?? y.rating ?? 0),
      currentArmorRating: Number(y.currentArmorRating ?? ((ie = y.durability) == null ? void 0 : ie.current) ?? 0),
      remainingDurability: Number(y.remainingDurability ?? ((he = y.durability) == null ? void 0 : he.current) ?? 0),
      baseMitigation: Number(y.baseMitigation ?? y.baseResistance ?? 0),
      baseResistance: Number(y.baseMitigation ?? y.baseResistance ?? 0),
      mitigationByType: { ...y.mitigationByType ?? y.typedMitigation ?? {} },
      tags: [...y.tags ?? []],
      isDestroyed: !!y.isDestroyed,
      defenseBonus: Number(y.defenseBonus ?? 0)
    } : null
  } : null;
  return {
    intent: "attack",
    rollType: "simple",
    title: `${t.name} Attack`,
    subtitle: r.name ?? "Actor",
    domains: Array.isArray(s.domains) && s.domains.length ? s.domains : ["physical"],
    domainTags: ["combat", "attack"],
    diceTarget: Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : 5,
    difficulty: { dn: Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1 },
    edge: {
      earn: { enabled: !0, rate: 4, maxPerRoll: 1 }
    },
    pool: { attribute: a, skill: n, bonus: c },
    breakdown: [
      { id: "attribute", label: "Attribute", value: a },
      { id: "skill", label: s.label, value: n },
      { id: "bonus", label: "Skill Bonus", value: o },
      { id: "weaponAccuracy", label: "Weapon Accuracy", value: l },
      { id: "damage", label: "Damage", value: Number(t.damage ?? 0) || 0 },
      { id: "ap", label: "AP", value: Number(t.ap ?? 0) + Number(((Ae = t == null ? void 0 : t.effects) == null ? void 0 : Ae.ap) ?? 0) },
      { id: "attackRating", label: `Attack Rating (${u})`, value: d }
    ],
    attack: {
      rangeBand: u,
      weapon: t,
      skill: {
        code: s.code ?? t.skill,
        label: s.label ?? t.skill,
        attribute: i
      },
      target: w
    }
  };
}
async function Mr({ actor: r, payload: e, event: t } = {}) {
  return {
    title: "Defense",
    intent: "defense",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function vr({ actor: r, payload: e, event: t } = {}) {
  return {
    title: "Resistance",
    intent: "resistance",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function Cr({ actor: r } = {}) {
  var s, i, a, n, o, l;
  const e = Number(((a = (i = (s = r.system) == null ? void 0 : s.attributes) == null ? void 0 : i.reflexes) == null ? void 0 : a.value) ?? 0), t = Number(((l = (o = (n = r.system) == null ? void 0 : n.attributes) == null ? void 0 : o.edge) == null ? void 0 : l.value) ?? 0);
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
async function Pr({ actor: r }) {
  var s, i, a, n, o;
  const e = Number(((i = (s = r.system) == null ? void 0 : s.burn) == null ? void 0 : i.value) ?? 0);
  e < 6 && ui.notifications.warn("Overload check is only required at Burn 6+.");
  const t = Number(((o = (n = (a = r.system) == null ? void 0 : a.attributes) == null ? void 0 : n.willpower) == null ? void 0 : o.value) ?? 0);
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
const Er = {
  skill: gr,
  edge: wr,
  attribute: Ar,
  attack: Sr,
  defense: Mr,
  resistance: vr,
  initiative: Cr,
  overload: Pr
};
async function Rr({ actor: r, payload: e, event: t } = {}) {
  if (!r) throw new Error("resolveIntent requires actor");
  const s = String((e == null ? void 0 : e.intent) ?? "").trim();
  if (!s) throw new Error("resolveIntent requires payload.intent");
  const i = Er[s];
  if (!i) throw new Error(`Unsupported roll intent: ${s}`);
  const a = await i({ actor: r, payload: e, event: t });
  return Nr(a, { intent: s });
}
function Nr(r, { intent: e } = {}) {
  (!r || typeof r != "object") && (r = {}), r.intent = r.intent ?? e ?? "unknown", r.title = String(r.title ?? "Roll"), r.domains = Array.isArray(r.domains) ? r.domains : [], r.breakdown = Array.isArray(r.breakdown) ? r.breakdown : [], r.mods = Array.isArray(r.mods) ? r.mods : [];
  const t = r.pool && typeof r.pool == "object" ? r.pool : {}, s = Number(t.attribute ?? t.base ?? 0), i = Number(t.skill ?? t.rating ?? 0), a = Number(t.bonus ?? 0);
  if (![s, i, a].every(Number.isFinite))
    throw console.error("MWD | Invalid pool parts after intent resolution", { intent: e, ctx: r }), new Error("MWD.roll: pool parts must be numeric (attribute/skill/bonus).");
  return r.pool = {
    attribute: s,
    skill: i,
    bonus: a,
    totalBase: s + i + a
  }, r.rollType = r.rollType ?? "simple", r.diceTarget = Number.isFinite(r.diceTarget) ? r.diceTarget : Number(r.target ?? 5), r.difficulty && typeof r.difficulty == "object" ? r.difficulty.dn = Number(r.difficulty.dn ?? 0) : Number.isFinite(r.dn) && (r.difficulty = { dn: Number(r.dn) }), r.breakdown.length || (r.breakdown = [
    { id: "attribute", label: "Attribute", value: s },
    { id: "skill", label: "Skill", value: i },
    { id: "bonus", label: "Bonus", value: a }
  ]), r;
}
var ot;
class Dr {
  constructor() {
    fe(this, ot, /* @__PURE__ */ new Map());
  }
  register(e) {
    if (!(e != null && e.id) || typeof e.collect != "function")
      throw new Error("Invalid ModifierProvider: missing id or collect()");
    W(this, ot).has(e.id) || W(this, ot).set(e.id, e);
  }
  async collectAll(e) {
    const t = [];
    for (const s of W(this, ot).values()) {
      const i = await s.collect(e);
      if (console.log("MWD | provider", s.id, "returned", i), !!(i != null && i.length))
        for (const a of i)
          a && typeof a.label == "string" && typeof a.value == "number" && typeof a.source == "string" ? t.push(a) : console.warn("MWD | DROPPED MOD (bad shape)", s.id, a);
    }
    return t;
  }
}
ot = new WeakMap();
const at = new Dr();
function Or(r) {
  if (r == null || r === "" || r === "—" || r === "–") return 0;
  const e = Number(r);
  return Number.isFinite(e) ? e : null;
}
function _r(r) {
  const e = Or(r == null ? void 0 : r.value);
  return e === null ? null : { ...r, value: e };
}
async function Xs({
  actor: r,
  rollType: e,
  skillId: t,
  domains: s,
  // NEW (optional)
  payload: i,
  resolved: a,
  context: n
} = {}) {
  const o = { actor: r, rollType: e, skillId: t, domains: s, payload: i, resolved: a, context: n }, l = await at.collectAll(o);
  console.log("MWD|condition collect called", o.rollType);
  let c = [];
  for (const d of l ?? []) {
    const m = _r(d);
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
function Ir({
  actor: r,
  payload: e,
  ctx: t,
  roll: s,
  target: i,
  pool: a,
  mods: n = [],
  modTotal: o = 0,
  hits: l = null,
  ones: c = null,
  edge: u = null,
  outcomeModel: d = null
} = {}) {
  var J, z, X;
  if (!r) throw new Error("buildResolved requires actor");
  if (!(e != null && e.intent)) throw new Error("buildResolved requires payload.intent");
  if (!s) throw new Error("buildResolved requires roll");
  const m = foundry.utils.randomID(), p = (J = s.dice) == null ? void 0 : J[0], y = (Array.isArray(p == null ? void 0 : p.results) ? p.results : []).map((E, x) => {
    const q = `pool:${x}`, ee = Number(E.result), ie = !!E.success;
    return {
      ref: q,
      face: ee,
      isSuccess: ie,
      isFailure: !ie,
      tooltip: ie ? `Die ${x + 1}: ${ee} (Success vs TN ${Number(i ?? 5)})` : `Die ${x + 1}: ${ee} (Failure vs TN ${Number(i ?? 5)})`
    };
  }), w = y.filter((E) => E.isFailure).map((E) => E.ref), g = [{
    id: "pool",
    label: "Pool",
    faces: 6,
    termIndex: 0,
    // informational only
    dice: y
  }], A = (Array.isArray(n) ? n : []).map((E, x) => {
    const q = Number(E.value ?? 0), ee = `mod:${Lr(E.label ?? "mod")}:${x}`;
    return {
      id: E.id ?? ee,
      label: E.label ?? "Modifier",
      value: q,
      domain: E.domain ?? null,
      source: E.source ?? null,
      tooltip: E.tooltip ?? `${E.label ?? "Modifier"} ${Zs(q)}`
    };
  }), M = A.map((E) => E.id), D = (Array.isArray(t == null ? void 0 : t.breakdown) ? t.breakdown : []).map((E) => ({
    id: `pool.${E.id ?? foundry.utils.randomID()}`,
    label: E.label ?? E.id ?? "Row",
    value: Number(E.value ?? 0),
    tooltip: `Contribution from ${E.label ?? E.id}: ${Number(E.value ?? 0)}`
  }));
  D.push({
    id: "mods.total",
    label: "Mods",
    value: Number(o ?? 0),
    modIds: M,
    tooltip: A.length ? A.map((E) => `${E.label}: ${Zs(E.value)}`).join(`
`) : "No roll-time modifiers."
  }), D.push({
    id: "pool.final",
    label: "Final Pool",
    value: Number(a ?? 0),
    tooltip: `Final dice pool rolled: ${Number(a ?? 0)}d6`
  });
  const H = Number.isFinite(Number(l)) ? Number(l) : y.filter((E) => E.isSuccess).length, L = Number.isFinite(Number(c)) ? Number(c) : y.filter((E) => E.face === 1).length, V = $r(u, { payload: e });
  return {
    version: 2,
    id: m,
    actorUuid: r.uuid,
    // Re-entry
    originPayload: e,
    // Render header
    title: (t == null ? void 0 : t.title) ?? "Roll",
    subtitle: (t == null ? void 0 : t.subtitle) ?? r.name ?? "Actor",
    intent: (t == null ? void 0 : t.intent) ?? e.intent,
    domains: Array.isArray(t == null ? void 0 : t.domains) ? t.domains : [],
    // Minimal context snapshot so chat-actions can recompute interpretation
    // after post-spend rerolls mutate hits.
    ctxSnapshot: {
      rollType: (t == null ? void 0 : t.rollType) ?? "simple",
      difficulty: (t == null ? void 0 : t.difficulty) ?? null,
      opposed: (t == null ? void 0 : t.opposed) ?? null,
      net: (t == null ? void 0 : t.net) ?? null,
      edge: {
        pool: ((z = t == null ? void 0 : t.edge) == null ? void 0 : z.pool) ?? null,
        earn: ((X = t == null ? void 0 : t.edge) == null ? void 0 : X.earn) ?? null
      }
    },
    // Roll + dice
    roll: {
      json: s.toJSON(),
      formula: s.formula,
      target: Number(i ?? 5),
      pool: Number(a ?? 0),
      diceGroups: g,
      failureDiceRefs: w
    },
    // Outcome numbers
    outcome: {
      hits: H,
      ones: L
    },
    // New: engine-interpreted outcome (margin/net/converted/edgeEarned/etc
    outcomeModel: d,
    // Breakdown + modifiers
    breakdownRows: D,
    modifiers: {
      applied: A,
      total: Number(o ?? 0)
    },
    // Edge snapshot / affordances
    edge: V
  };
}
function $r(r, { payload: e } = {}) {
  var h, y, w, g, A, M, k, D, H, L, V, J, z, X;
  const t = !!((h = e == null ? void 0 : e.edge) != null && h.enabled), s = (r == null ? void 0 : r.domain) ?? null, i = (r == null ? void 0 : r.pools) ?? null, a = ((y = r == null ? void 0 : r.pre) == null ? void 0 : y.poolKey) ?? ((g = (w = e == null ? void 0 : e.edge) == null ? void 0 : w.pre) == null ? void 0 : g.poolKey) ?? (t ? ((A = e == null ? void 0 : e.edge) == null ? void 0 : A.poolKey) ?? null : null), n = Number(((M = r == null ? void 0 : r.pre) == null ? void 0 : M.spent) ?? ((D = (k = e == null ? void 0 : e.edge) == null ? void 0 : k.pre) == null ? void 0 : D.spent) ?? (t ? 1 : 0)) ? 1 : 0, o = ((H = r == null ? void 0 : r.post) == null ? void 0 : H.poolKey) ?? ((V = (L = e == null ? void 0 : e.edge) == null ? void 0 : L.post) == null ? void 0 : V.poolKey) ?? null, l = Number(((J = r == null ? void 0 : r.post) == null ? void 0 : J.spent) ?? ((X = (z = e == null ? void 0 : e.edge) == null ? void 0 : z.post) == null ? void 0 : X.spent) ?? 0) ? 1 : 0, c = (i == null ? void 0 : i.a) ?? null, u = (i == null ? void 0 : i.b) ?? null, d = [c, u].filter(Boolean);
  let m = [c, u].filter(Boolean);
  n && a && (m = m.filter((E) => E !== a));
  const p = {
    canSpendPre: d.length > 0 && !n,
    // spending pre after roll is not a thing
    canSpendPost: m.length > 0 && !l,
    canPostRerollFailures: m.length > 0 && !l
  };
  return {
    domain: s,
    pools: i ? { a: c, b: u } : null,
    pre: { poolKey: a, spent: n },
    post: { poolKey: o, spent: l },
    allowed: {
      prePools: d,
      postPools: m
    },
    availableActions: p
  };
}
function Zs(r) {
  const e = Number(r ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function Lr(r) {
  return String(r).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function xr(r, e) {
  var c, u, d, m, p, h, y, w, g;
  const t = r ?? {}, s = Array.isArray((c = t == null ? void 0 : t.modifiers) == null ? void 0 : c.applied) ? t.modifiers.applied : [], i = Number(((u = t == null ? void 0 : t.modifiers) == null ? void 0 : u.total) ?? 0);
  if (s.length) {
    const A = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((M) => M.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${s.map((M) => `${M.label} ${ei(M.value)}`).join(", ")} (Total ${ei(i)})`,
      title: (A == null ? void 0 : A.tooltip) ?? ""
    });
  }
  const a = (t == null ? void 0 : t.edge) ?? null, n = Array.isArray((d = t == null ? void 0 : t.roll) == null ? void 0 : d.failureDiceRefs) ? t.roll.failureDiceRefs : [], o = !!((m = a == null ? void 0 : a.availableActions) != null && m.canPostRerollFailures), l = Array.isArray((p = a == null ? void 0 : a.allowed) == null ? void 0 : p.postPools) ? a.allowed.postPools : [];
  if (a != null && a.domain && (e.edge = {
    domain: a.domain,
    earned: ((h = t == null ? void 0 : t.outcomeModel) == null ? void 0 : h.edgeEarned) ?? null,
    preSpent: Number(((y = a == null ? void 0 : a.pre) == null ? void 0 : y.spent) ?? 0),
    postSpent: Number(((w = a == null ? void 0 : a.post) == null ? void 0 : w.spent) ?? 0),
    canPost: o && n.length > 0 && l.length > 0,
    failureCount: n.length,
    postPools: l
  }, e.metaRows.push({
    text: `Edge: ${a.domain} • pre ${e.edge.preSpent} • post ${e.edge.postSpent}`,
    title: ""
  })), (g = e.edge) != null && g.canPost) {
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
function ei(r) {
  const e = Number(r ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function Wr(r, e) {
  var c;
  const t = r ?? {}, s = (t == null ? void 0 : t.outcomeModel) ?? {}, i = (s == null ? void 0 : s.net) ?? null;
  if (!i) return;
  e.net = i;
  const a = Number((i == null ? void 0 : i.converted) ?? 0), n = Number((i == null ? void 0 : i.value) ?? 0), o = Number((i == null ? void 0 : i.rate) ?? 4);
  e.metaRows.push({
    text: `Net: ${n} • Converted: ${a} • Rate: ${o}`,
    title: ""
  });
  const l = ((c = s == null ? void 0 : s.edgeEarned) == null ? void 0 : c.amount) > 0 ? s.edgeEarned : null;
  l && e.footerRows.push({
    text: `Edge Earned: +${l.amount}${l.pool ? ` (${l.pool})` : ""}`,
    title: l.reason ?? ""
  });
}
function Hr(r, e) {
  var l, c, u, d;
  const t = r ?? {}, s = (t == null ? void 0 : t.outcomeModel) ?? {}, i = Number(((l = s == null ? void 0 : s.attacker) == null ? void 0 : l.successes) ?? (s == null ? void 0 : s.attackerHits) ?? NaN), a = Number(((c = s == null ? void 0 : s.defender) == null ? void 0 : c.successes) ?? (s == null ? void 0 : s.defenderHits) ?? NaN), n = Number((s == null ? void 0 : s.netHits) ?? (s == null ? void 0 : s.net) ?? NaN);
  Number.isFinite(i) && Number.isFinite(a) && e.metaRows.push({ text: `Opposed: Att ${i} vs Def ${a} • Net ${Number.isFinite(n) ? n : i - a}` }), (u = t == null ? void 0 : t.incoming) != null && u.label && (e.incoming = { label: t.incoming.label, value: t.incoming.value ?? "" }, e.footerRows.push({ text: `Incoming: ${e.incoming.label} ${e.incoming.value}` }));
  const o = ((d = s == null ? void 0 : s.edgeEarned) == null ? void 0 : d.amount) > 0 ? s.edgeEarned : null;
  o && e.footerRows.push({ text: `Edge Earned: +${o.amount}${o.pool ? ` (${o.pool})` : ""}` });
}
function Br(r, e) {
  var c;
  const t = r ?? {}, s = (t == null ? void 0 : t.outcomeModel) ?? {}, i = (s == null ? void 0 : s.extended) ?? null;
  if (!i) return;
  e.extended = i;
  const a = Number((i == null ? void 0 : i.progress) ?? 0), n = Number((i == null ? void 0 : i.target) ?? 0), o = Number((i == null ? void 0 : i.remaining) ?? Math.max(0, n - a));
  e.metaRows.push({
    text: `Extended: ${a}/${n} (Remaining ${o})`,
    title: ""
  }), i != null && i.completed && e.footerRows.push({ text: `Completed in ${Number((i == null ? void 0 : i.rounds) ?? (i == null ? void 0 : i.attempts) ?? 0) || "?"} attempts.` });
  const l = ((c = s == null ? void 0 : s.edgeEarned) == null ? void 0 : c.amount) > 0 ? s.edgeEarned : null;
  l && e.footerRows.push({ text: `Edge Earned: +${l.amount}${l.pool ? ` (${l.pool})` : ""}` });
}
const Fr = {
  skill: xr,
  net: Wr,
  opposed: Hr,
  extended: Br
  // defense: enhanceDefense,
  // edge: enhanceEdge,
};
async function xi({ resolved: r } = {}) {
  const e = r ?? {}, t = Gr(e), s = Fr[t.intent];
  return typeof s == "function" && s(e, t), await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-roll-card",
    t
  );
}
function Gr(r) {
  var d, m, p, h, y;
  const e = r ?? {}, t = Number(((d = e == null ? void 0 : e.roll) == null ? void 0 : d.target) ?? 5), s = Number(((p = (m = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : m.difficulty) == null ? void 0 : p.dn) ?? 0), i = Number(((h = e == null ? void 0 : e.roll) == null ? void 0 : h.pool) ?? 0), a = Number(((y = e == null ? void 0 : e.outcome) == null ? void 0 : y.hits) ?? 0), n = (e == null ? void 0 : e.outcomeModel) ?? {}, o = typeof n.passed == "boolean" ? n.passed : a >= s, l = Number.isFinite(Number(n.margin)) ? Number(n.margin) : a - s, c = n.tier ?? null, u = Array.isArray(e == null ? void 0 : e.breakdownRows) ? e.breakdownRows.map((w) => `${w.label}: ${w.value}`).join(`
`) : "";
  return {
    header: { left: (e == null ? void 0 : e.title) ?? "Roll", right: (e == null ? void 0 : e.subtitle) ?? "" },
    intent: (e == null ? void 0 : e.intent) ?? "unknown",
    domains: Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [],
    tn: t,
    dn: s,
    pool: i,
    hits: a,
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
  };
}
const { ApplicationV2: Ur, HandlebarsApplicationMixin: Vr } = foundry.applications.api;
function jr(r, e = -3, t = 3) {
  const s = [], i = "../img/dice";
  for (let a = e; a <= t; a++) {
    const n = Math.abs(a), o = n === 0 ? `${i}/BlankDice.webp` : `${i}/D6_${n}.svg`;
    s.push({
      value: a,
      abs: n,
      icon: o,
      active: a === r,
      neg: a < 0,
      pos: a > 0,
      zero: a === 0,
      title: a === 0 ? "0 (neutral)" : a < 0 ? `${a} penalty` : `+${a} bonus`
    });
  }
  return s;
}
function ti(r) {
  return (Array.isArray(r) ? r : []).map((t) => ({
    id: (t == null ? void 0 : t.id) ?? foundry.utils.randomID(),
    label: typeof (t == null ? void 0 : t.label) == "string" ? t.label : "Manual",
    value: Number((t == null ? void 0 : t.value) ?? 0)
  }));
}
function Jt(r, e) {
  const t = r == null ? void 0 : r.toggles;
  return t && typeof t == "object" && e in t ? !!t[e] : !!(r != null && r[e]);
}
function qr(r, e) {
  r.useEdge = !!e.useEdge, r.takeRisks = !!e.takeRisks, r.opponentRoll = !!e.opponentRoll, r.toggles = r.toggles && typeof r.toggles == "object" ? r.toggles : {}, r.toggles.useEdge = !!e.useEdge, r.toggles.takeRisks = !!e.takeRisks, r.toggles.opponentRoll = !!e.opponentRoll;
}
function zr(r) {
  const e = Array.isArray(r == null ? void 0 : r.breakdown) ? r.breakdown : [], t = (s) => {
    var i;
    return Number(((i = e.find((a) => (a == null ? void 0 : a.id) === s)) == null ? void 0 : i.value) ?? 0);
  };
  return {
    attribute: t("attribute"),
    skill: t("skill"),
    bonus: t("bonus")
  };
}
var Pe;
const me = class me extends Vr(Ur) {
  constructor({ actor: t, baseContext: s, initialState: i = null, options: a = {} }) {
    var c, u;
    super(a);
    fe(this, Pe, null);
    /** @type {{ baseContext: any, state: any }} */
    v(this, "_mwd", { baseContext: null, state: null });
    this.actor = t, this._mwd.baseContext = s ?? {};
    const n = foundry.utils.deepClone(this._mwd.baseContext.payload ?? {}), o = ti(n.manualModifiers);
    this._mwd.state = foundry.utils.mergeObject(
      {
        payload: n,
        manual: o,
        toggles: {
          useEdge: Jt(n, "useEdge"),
          takeRisks: Jt(n, "takeRisks"),
          opponentRoll: Jt(n, "opponentRoll")
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
      ye(this, Pe, t), this.render(!0);
    });
  }
  async close(t = {}) {
    if (W(this, Pe)) {
      const s = W(this, Pe);
      ye(this, Pe, null), s(null);
    }
    return super.close(t);
  }
  /* --------------------------- */
  /* Prepare Context             */
  /* --------------------------- */
  async _prepareContext(t) {
    var w, g, A, M, k, D, H, L, V, J, z, X, E;
    const s = this._mwd.baseContext ?? {}, i = this._mwd.state ?? {}, a = Number.isFinite(Number((w = i == null ? void 0 : i.payload) == null ? void 0 : w.dn)) ? Number(i.payload.dn) : Number.isFinite(Number(s == null ? void 0 : s.dn)) ? Number(s.dn) : Number.isFinite(Number((A = (g = s == null ? void 0 : s.resolved) == null ? void 0 : g.difficulty) == null ? void 0 : A.dn)) ? Number(s.resolved.difficulty.dn) : 1, n = (s == null ? void 0 : s.intent) ?? "skill";
    let o, l;
    const c = Array.isArray(i.manual) ? i.manual.reduce((x, q) => x + Number((q == null ? void 0 : q.value) || 0), 0) : 0;
    if (n === "edge") {
      const x = (s == null ? void 0 : s.resolved) ?? {}, q = Array.isArray(x.breakdown) ? x.breakdown : [], ee = (he) => {
        var Ae;
        return Number(((Ae = q.find((Ve) => Ve.id === he)) == null ? void 0 : Ae.value) ?? 0);
      }, ie = Number(((M = x == null ? void 0 : x.pool) == null ? void 0 : M.attribute) ?? 0);
      o = {
        pool: ie,
        rating: ee("rating"),
        cap: ee("cap"),
        modifiers: Number(((k = s == null ? void 0 : s.dice) == null ? void 0 : k.modifiers) ?? 0)
      }, l = Math.max(0, ie + o.modifiers + c);
    } else {
      o = {
        attribute: Number(((D = s == null ? void 0 : s.dice) == null ? void 0 : D.attribute) ?? 0),
        skill: Number(((H = s == null ? void 0 : s.dice) == null ? void 0 : H.skill) ?? 0),
        bonus: Number(((L = s == null ? void 0 : s.dice) == null ? void 0 : L.bonus) ?? 0),
        modifiers: Number(((V = s == null ? void 0 : s.dice) == null ? void 0 : V.modifiers) ?? 0)
      };
      const x = o.modifiers + c, q = o.attribute + o.skill + o.bonus;
      l = Math.max(0, q + x);
    }
    const u = Array.isArray((J = s == null ? void 0 : s.resolved) == null ? void 0 : J.domains) ? s.resolved.domains : [], d = u.includes("physical") ? "physical" : u.includes("mental") ? "mental" : u.includes("social") ? "social" : null, p = (d === "physical" ? ["grit", "chaos"] : d === "mental" ? ["insight", "rumor"] : d === "social" ? ["legend", "credibility"] : []).map((x) => {
      var q, ee, ie, he;
      return {
        key: x,
        label: x.charAt(0).toUpperCase() + x.slice(1),
        available: Number(((ie = (ee = (q = this.actor) == null ? void 0 : q.getEdgePool) == null ? void 0 : ee.call(q, x)) == null ? void 0 : ie.effectiveValue) ?? 0),
        selected: x === (((he = i.edge) == null ? void 0 : he.prePoolKey) ?? null)
      };
    }), h = p.find((x) => x.selected), y = (h == null ? void 0 : h.label) ?? null;
    return {
      header: {
        left: ((z = s == null ? void 0 : s.header) == null ? void 0 : z.left) ?? "Roll",
        right: ((X = s == null ? void 0 : s.header) == null ? void 0 : X.right) ?? ((E = this.actor) == null ? void 0 : E.name) ?? ""
      },
      dice: o,
      modifiers: Array.isArray(s.modifiers) ? s.modifiers : [],
      manual: (i.manual ?? []).map((x) => ({
        ...x,
        steps: jr(Number(x.value ?? 0), -3, 3)
      })),
      edge: {
        domain: d,
        choices: p,
        selectedLabel: y
      },
      toggles: n === "edge" ? { useEdge: !1, takeRisks: !1, opponentRoll: !1 } : i.toggles,
      totalPool: l,
      intent: n,
      dn: a
    };
  }
  /* --------------------------- */
  /* Actions                     */
  /* --------------------------- */
  async _onCancel(t) {
    if (t == null || t.preventDefault(), W(this, Pe)) {
      const s = W(this, Pe);
      ye(this, Pe, null), s(null);
    }
    return this.close();
  }
  async _onSubmit(t) {
    var i, a;
    t == null || t.preventDefault();
    const s = this._mwd.state;
    if (s.payload.manualModifiers = (s.manual ?? []).filter((n) => {
      var o;
      return n && (((o = n.label) == null ? void 0 : o.trim()) || Number(n.value));
    }).map((n) => {
      var o;
      return {
        id: n.id,
        label: ((o = n.label) == null ? void 0 : o.trim()) || "Manual",
        value: Number(n.value ?? 0)
      };
    }), qr(s.payload, s.toggles ?? {}), W(this, Pe)) {
      const n = W(this, Pe);
      ye(this, Pe, null), n({ payload: s.payload });
    }
    if (s.payload.edge = s.payload.edge && typeof s.payload.edge == "object" ? s.payload.edge : {}, s.payload.edge.pre = s.payload.edge.pre && typeof s.payload.edge.pre == "object" ? s.payload.edge.pre : {}, (i = s.toggles) != null && i.useEdge) {
      const n = String(((a = s.edge) == null ? void 0 : a.prePoolKey) ?? "").trim() || null;
      s.payload.edge.pre.poolKey = n, s.payload.edge.pre.spent = n ? 1 : 0;
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
    var a;
    t == null || t.preventDefault();
    const i = (a = s == null ? void 0 : s.dataset) == null ? void 0 : a.id;
    if (i)
      return this._mwd.state.manual = this._mwd.state.manual.filter((n) => n.id !== i), this.render(!1);
  }
  async _onSetManualValue(t, s) {
    var o, l;
    t == null || t.preventDefault();
    const i = (o = s == null ? void 0 : s.dataset) == null ? void 0 : o.id, a = (l = s == null ? void 0 : s.dataset) == null ? void 0 : l.field;
    if (!i || !a) return;
    const n = this._mwd.state.manual.find((c) => c.id === i);
    if (n)
      return a === "label" && (n.label = String(s.value ?? "")), a === "value" && (n.value = Number(s.value ?? 0)), this.render(!1);
  }
  async _onSetManualStepper(t, s) {
    var o, l;
    t == null || t.preventDefault();
    const i = (o = s == null ? void 0 : s.dataset) == null ? void 0 : o.id, a = Number((l = s == null ? void 0 : s.dataset) == null ? void 0 : l.value);
    if (!i || Number.isNaN(a)) return;
    const n = this._mwd.state.manual.find((c) => c.id === i);
    if (n)
      return n.value = a, this.render(!1);
  }
  async _onSetEdgePrePool(t, s) {
    var a;
    t == null || t.preventDefault();
    const i = String(((a = s == null ? void 0 : s.dataset) == null ? void 0 : a.poolKey) ?? "").trim();
    if (i)
      return this._mwd.state.edge = this._mwd.state.edge ?? {}, this._mwd.state.edge.prePoolKey = i, this._mwd.state.toggles.useEdge = !0, this.render(!1);
  }
  async _onToggleCheckbox(t, s) {
    var a;
    t == null || t.preventDefault();
    const i = (a = s == null ? void 0 : s.dataset) == null ? void 0 : a.key;
    if (i)
      return this._mwd.state.toggles[i] = !!s.checked, this.render(!1);
  }
  async _onSetDn(t, s) {
    t == null || t.preventDefault();
    const i = String((s == null ? void 0 : s.value) ?? "").trim(), a = i === "" ? null : Number(i);
    return this._mwd.state.payload.dn = Number.isFinite(a) ? Math.max(0, Math.trunc(a)) : null, this.render(!1);
  }
  /**
   * Open the roll dialog as a payload editor and return an updated payload.
   * Cancel returns null.
   *
   * IMPORTANT:
   *  - Prefer passing explicit dice parts via args.diceParts (attribute/skill/bonus).
   *  - This avoids scraping resolved.breakdown.
   */
  static async prompt({ actor: t, basePayload: s, resolved: i, diceParts: a = null, mods: n = [], modTotal: o = 0 } = {}) {
    var y;
    const l = foundry.utils.deepClone(s ?? {});
    try {
      if (((i == null ? void 0 : i.rollType) ?? "simple") === "simple" && (l == null ? void 0 : l.dn) == null) {
        const g = Number(game.settings.get(game.system.id, "gmNextDn"));
        Number.isFinite(g) && (l.dn = Math.max(0, Math.trunc(g)));
      }
    } catch (w) {
      console.warn("MWD: failed to default DN from GM Gadget", w);
    }
    const c = {
      left: (i == null ? void 0 : i.title) ?? "Roll",
      right: (t == null ? void 0 : t.name) ?? ""
    }, u = a ?? zr(i), d = {
      attribute: Number((u == null ? void 0 : u.attribute) ?? 0),
      skill: Number((u == null ? void 0 : u.skill) ?? 0),
      bonus: Number((u == null ? void 0 : u.bonus) ?? 0),
      modifiers: Number(o ?? 0)
    }, m = (Array.isArray(n) ? n : []).map((w) => ({
      label: w.label ?? "Modifier",
      source: w.source ?? "",
      value: Number(w.value ?? 0)
    }));
    l.manualModifiers = ti(l.manualModifiers);
    const h = await new me({
      actor: t,
      baseContext: {
        intent: (i == null ? void 0 : i.intent) ?? "skill",
        header: c,
        dice: d,
        modifiers: m,
        payload: l,
        resolved: i,
        // keep full resolved for edge display
        dn: Number((l == null ? void 0 : l.dn) ?? ((y = i == null ? void 0 : i.difficulty) == null ? void 0 : y.dn) ?? 1)
      }
    }).wait();
    return (h == null ? void 0 : h.payload) ?? null;
  }
};
Pe = new WeakMap(), v(me, "DEFAULT_OPTIONS", foundry.utils.mergeObject(
  st(me, me, "DEFAULT_OPTIONS"),
  {
    id: "mwd-roll-dialog",
    classes: [
      ...st(me, me, "DEFAULT_OPTIONS").classes ?? [],
      "mwd",
      "mwd-roll-dialog"
    ],
    window: { title: "Roll", resizable: !1 },
    position: { width: 520, height: "auto" },
    actions: {
      submit: me.prototype._onSubmit,
      cancel: me.prototype._onCancel,
      addManual: me.prototype._onAddManual,
      removeManual: me.prototype._onRemoveManual,
      setManualValue: me.prototype._onSetManualValue,
      setManualStepper: me.prototype._onSetManualStepper,
      setEdgePrePool: me.prototype._onSetEdgePrePool,
      toggleCheckbox: me.prototype._onToggleCheckbox,
      setDn: me.prototype._onSetDn
    }
  },
  { inplace: !1 }
)), v(me, "PARTS", {
  body: { template: "systems/mwd/templates/v2/roll/mwd-roll-dialog.hbs" }
});
let As = me;
function ne(r, e = 0) {
  const t = Number(r);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
function Xt(r, e = 0, t = Number.POSITIVE_INFINITY) {
  const s = ne(r, e);
  return Math.max(e, Math.min(t, s));
}
function Wi(r, e = 1) {
  var s;
  const t = ne((s = r == null ? void 0 : r.difficulty) == null ? void 0 : s.dn, ne(e, 1));
  return Math.max(0, t);
}
function Kr(r, e) {
  return Math.max(0, ne(r, 0) - ne(e, 0));
}
function Yr({ convert: r, remainder: e, rate: t = 4 } = {}) {
  const s = Math.max(0, ne(e, 0)), i = Math.max(1, ne(t, 4)), a = Math.max(0, ne(r, 0)), n = Math.floor(a / i) * i;
  return Math.min(s, n);
}
function Es(r, { rate: e = 4, maxPerRoll: t = Number.POSITIVE_INFINITY } = {}) {
  const s = Math.max(1, ne(e, 4)), i = Math.floor(Math.max(0, ne(r, 0)) / s), a = Number.isFinite(t) ? Math.max(0, ne(t, 0)) : Number.POSITIVE_INFINITY;
  return { amount: Math.min(i, a), rate: s };
}
function Rs(r) {
  var s;
  const e = ((s = r == null ? void 0 : r.edge) == null ? void 0 : s.earn) ?? {};
  return {
    enabled: !!(e != null && e.enabled),
    rate: Math.max(1, ne(e == null ? void 0 : e.rate, 4)),
    maxPerRoll: (e == null ? void 0 : e.maxPerRoll) ?? Number.POSITIVE_INFINITY
  };
}
function Ht(r) {
  var t;
  const e = (t = r == null ? void 0 : r.edge) == null ? void 0 : t.pool;
  return e ? String(e) : null;
}
function Qr(r) {
  let e = 0, t = 0;
  const s = (i) => {
    if (!i) return;
    const a = i == null ? void 0 : i.results;
    if (Array.isArray(a))
      for (const o of a) {
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
  return s(r), { dice: e, ones: t };
}
function Hi(r, e) {
  if (ne(r, 0) !== 0) return !1;
  const { dice: t, ones: s } = Qr(e);
  return t <= 0 ? !1 : s >= Math.ceil(t / 2);
}
function Jr(r, e, t = 4) {
  return !!(r && ne(e, 0) >= ne(t, 4));
}
function si(r, e) {
  const t = ne(e == null ? void 0 : e.successes, 0), s = Wi(r, 1), i = t >= s, a = t - s, n = Jr(i, a, 4), o = Hi(t, e == null ? void 0 : e.raw), l = Rs(r), c = l.maxPerRoll ?? 1, u = l.enabled && a >= l.rate ? (() => {
    const { amount: m, rate: p } = Es(a, { rate: l.rate, maxPerRoll: c }), h = Ht(r);
    return m > 0 ? { amount: m, pool: h, reason: "net4", details: { margin: a, rate: p } } : null;
  })() : null;
  return {
    rollType: "simple",
    passed: i,
    successes: t,
    difficulty: { dn: s },
    margin: a,
    criticalSuccess: n,
    criticalFailure: o,
    tier: n ? "criticalSuccess" : o ? "criticalFailure" : i ? "success" : "failure",
    edgeEarned: u
  };
}
function Xr(r, e, t) {
  var m, p;
  const s = ne(e == null ? void 0 : e.successes, 0), i = ne(t == null ? void 0 : t.successes, 0), a = !!((m = r == null ? void 0 : r.opposed) != null && m.net), n = String(((p = r == null ? void 0 : r.opposed) == null ? void 0 : p.dnTies) ?? "stalemate");
  let o = null, l = !1;
  a ? (o = s - i, o > 0 ? l = !0 : o < 0 ? l = !1 : n === "attackerWins" ? l = !0 : l = !1) : s > i ? l = !0 : s < i ? l = !1 : n === "attackerWins" ? l = !0 : l = !1;
  const c = Rs(r), u = c.maxPerRoll ?? 1, d = c.enabled && a && typeof o == "number" && o >= c.rate ? (() => {
    const { amount: h, rate: y } = Es(o, { rate: c.rate, maxPerRoll: u }), w = Ht(r);
    return h > 0 ? { amount: h, pool: w, reason: "net4", details: { netHits: o, rate: y } } : null;
  })() : null;
  return {
    rollType: "opposed",
    passed: l,
    successes: s,
    opposed: {
      attacker: s,
      defender: i,
      netEnabled: a,
      netHits: a ? o : void 0,
      tiePolicy: n
    },
    edgeEarned: d
  };
}
function Zr(r, e) {
  var y, w, g;
  const t = ne(e == null ? void 0 : e.successes, 0), s = Wi(r, 1), i = t >= s, a = Hi(t, e == null ? void 0 : e.raw), n = Kr(t, s), o = ((y = r == null ? void 0 : r.net) == null ? void 0 : y.convert) ?? ((w = r == null ? void 0 : r.allocation) == null ? void 0 : w.convert) ?? 0, l = Rs(r), c = l.rate, u = Yr({ convert: o, remainder: n, rate: c }), d = n - u, m = l.enabled && u >= c ? (() => {
    const { amount: A } = Es(u, { rate: c, maxPerRoll: l.maxPerRoll }), M = Ht(r);
    return A > 0 ? { amount: A, pool: M, reason: "convert4", details: { converted: u, rate: c } } : null;
  })() : null, p = a ? { amount: 1, pool: Ht(r), reason: "critFail", details: { onesRule: "halfOrMoreOnes" } } : null, h = [];
  return m && h.push(m), p && h.push(p), h.length === 0 || (h.length === 1 ? h[0] : (h.reduce((A, M) => A + (Number(M == null ? void 0 : M.amount) || 0), 0), (g = h[0]) == null || g.pool)), {
    rollType: "net",
    passed: i,
    successes: t,
    difficulty: { dn: s },
    criticalFailure: a,
    tier: a ? "criticalFailure" : i ? "success" : "failure",
    net: {
      remainder: n,
      convertRequested: ne(o, 0),
      converted: u,
      value: d,
      // the actual net effect magnitude you apply (+net dice, etc.)
      rate: c,
      canConvert: n >= c
    },
    edgeEarned: m
  };
}
function en(r, e) {
  var o, l, c, u;
  const t = ne(e == null ? void 0 : e.successes, 0), s = Xt((o = r == null ? void 0 : r.extended) == null ? void 0 : o.target, 1, 1e4), i = Xt((l = r == null ? void 0 : r.extended) == null ? void 0 : l.accumulated, 0, 1e4), a = Xt(i + t, 0, 1e4), n = a >= s;
  return {
    rollType: "extended",
    passed: n,
    successes: t,
    extended: {
      target: s,
      accumulated: i,
      nextAccumulated: a,
      remaining: Math.max(0, s - a),
      completed: n,
      interval: ((c = r == null ? void 0 : r.extended) == null ? void 0 : c.interval) ?? null,
      failureLimit: ((u = r == null ? void 0 : r.extended) == null ? void 0 : u.failureLimit) ?? null
    },
    // NOTE: Edge earn rules for extended are intentionally omitted per your earlier constraint.
    edgeEarned: null
  };
}
function tn(r, e, t = null) {
  var i;
  switch (String((r == null ? void 0 : r.rollType) ?? "simple")) {
    case "simple":
      return si(r, e);
    case "opposed":
      return Xr(r, e, t);
    case "net":
      return Zr(r, e);
    case "extended":
      return en(r, e);
    default: {
      const a = {
        ...r,
        difficulty: { dn: Number(((i = r == null ? void 0 : r.difficulty) == null ? void 0 : i.dn) ?? 1) || 1 }
      };
      return si(a, e);
    }
  }
}
const { ApplicationV2: sn, HandlebarsApplicationMixin: an } = foundry.applications.api, St = class St extends an(sn) {
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
      classes: [game.system.anarchy.styles.selectCssClass(), ...St.DEFAULT_OPTIONS.classes],
      window: { title: e }
    };
    return new St({ items: t }, s).wait();
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
v(St, "PARTS", {
  body: {
    template: `${O}/dialog/select-item.hbs`
  }
});
let Ts = St;
const ii = { execute: un }, rn = {
  physical: ["grit", "chaos"],
  mental: ["insight", "rumor"],
  social: ["legend", "credibility"]
};
function nn(r, e) {
  var a;
  const t = rn[e] ?? [];
  let s = null, i = -1;
  for (const n of t) {
    const o = (a = r.getEdgePool) == null ? void 0 : a.call(r, n), l = Number((o == null ? void 0 : o.rating) ?? 0), c = Number((o == null ? void 0 : o.value) ?? 0), u = Math.max(0, l - c);
    u > i && (i = u, s = n);
  }
  return s ?? t[0] ?? null;
}
function on(r) {
  const t = (Array.isArray(r == null ? void 0 : r.manualModifiers) ? r.manualModifiers : []).map((i) => ({
    id: i.id ?? foundry.utils.randomID(),
    label: (i.label ?? "Manual").trim() || "Manual",
    value: Number(i.value ?? 0),
    source: "Manual"
  })).filter((i) => Number.isFinite(i.value) && i.value !== 0), s = t.reduce((i, a) => i + a.value, 0);
  return { mods: t, total: s };
}
function ai(r = {}) {
  const e = r.toggles ?? {};
  return {
    ...r,
    toggles: {
      useEdge: !!e.useEdge,
      takeRisks: !!e.takeRisks,
      opponentRoll: !!e.opponentRoll
    },
    manualModifiers: cn(r.manualModifiers)
  };
}
async function ln({ actor: r, payload: e } = {}) {
  var a, n, o, l;
  if ((e == null ? void 0 : e.intent) !== "attack") return e;
  const t = foundry.utils.deepClone(e ?? {}), s = ((a = r.getPersonalCombatLoadout) == null ? void 0 : a.call(r, { refresh: !0 })) ?? null, i = (c) => {
    var d, m, p, h, y;
    const u = ((m = (d = r.items) == null ? void 0 : d.get) == null ? void 0 : m.call(d, c)) ?? null;
    return !u || !(((p = u.isPersonalWeapon) == null ? void 0 : p.call(u)) ?? u.type === f.itemType.personalWeapon) || !((h = u.system) != null && h.equipped) ? null : ((y = u.getCombatProfile) == null ? void 0 : y.call(u)) ?? null;
  };
  if (t.weaponId) {
    const c = i(t.weaponId);
    if (!c)
      throw new Error("Attack requires an owned equipped personal weapon.");
    return t.rangeBand = t.rangeBand ?? c.defaultRangeBand ?? "close", t;
  }
  if (t.mode === "auto") {
    if (s != null && s.weaponChoiceRequired) {
      const c = await Ts.selectItem(
        "Choose Weapon",
        s.equippedWeapons ?? []
      );
      return c ? (t.weaponId = c.id, t.rangeBand = t.rangeBand ?? c.defaultRangeBand ?? "close", delete t.mode, t) : null;
    }
    if ((n = s == null ? void 0 : s.defaultWeapon) != null && n.isSynthetic || ((o = s == null ? void 0 : s.defaultWeapon) == null ? void 0 : o.id) === "unarmed")
      return t.syntheticWeapon = foundry.utils.deepClone(s.defaultWeapon ?? Ie.DEFAULT_UNARMED), t.weaponId = t.syntheticWeapon.id, t.rangeBand = t.rangeBand ?? "close", delete t.mode, t;
    if ((l = s == null ? void 0 : s.defaultWeapon) != null && l.id)
      return t.weaponId = s.defaultWeapon.id, t.rangeBand = t.rangeBand ?? s.defaultWeapon.defaultRangeBand ?? "close", delete t.mode, t;
  }
  if (t.fallback === "unarmed")
    return t.syntheticWeapon = foundry.utils.deepClone(Ie.DEFAULT_UNARMED), t.weaponId = t.syntheticWeapon.id, t.rangeBand = t.rangeBand ?? "close", delete t.mode, t;
  throw new Error("Attack could not resolve a usable weapon.");
}
function cn(r) {
  return Array.isArray(r) ? r.map((e) => ({
    id: (e == null ? void 0 : e.id) ?? foundry.utils.randomID(),
    label: typeof (e == null ? void 0 : e.label) == "string" ? e.label : "Manual",
    value: Number((e == null ? void 0 : e.value) ?? 0)
  })) : [];
}
async function un({ actor: r, payload: e, event: t } = {}) {
  var V, J, z, X, E, x, q, ee, ie, he, Ae, Ve, mt, P, R, te, Ce, Ne;
  if (r != null && r.actor && (r = r.actor), (V = r == null ? void 0 : r.document) != null && V.actor && (r = r.document.actor), !r) throw new Error("MWD.roll.execute requires actor");
  if (!(e != null && e.intent)) throw new Error("MWD.roll.execute requires payload.intent");
  if (e = ai(e), e = await ln({ actor: r, payload: e }), !e) return null;
  const s = await Rr({ actor: r, payload: e, event: t });
  let i = await Xs({
    actor: r,
    rollType: e.intent,
    skillId: e.key,
    domains: s.domains,
    payload: e,
    resolved: s,
    context: { event: t }
  });
  const a = await As.prompt({
    actor: r,
    basePayload: e,
    resolved: s,
    diceParts: {
      attribute: ((J = s == null ? void 0 : s.pool) == null ? void 0 : J.attribute) ?? 0,
      skill: ((z = s == null ? void 0 : s.pool) == null ? void 0 : z.skill) ?? 0,
      bonus: ((X = s == null ? void 0 : s.pool) == null ? void 0 : X.bonus) ?? 0
    },
    mods: i.mods,
    modTotal: i.total,
    options: {
      allowEdge: e.intent !== "initiative"
    }
  });
  if (!a) return null;
  e = ai(a), i = await Xs({
    actor: r,
    rollType: e.intent,
    skillId: e.key,
    domains: s.domains,
    payload: e,
    resolved: s,
    context: { event: t }
  });
  const { mods: n, total: o } = i, { mods: l, total: c } = on(e), u = [...n, ...l], d = Number(o ?? 0) + Number(c ?? 0), m = Number(((E = s == null ? void 0 : s.pool) == null ? void 0 : E.attribute) ?? 0) + Number(((x = s == null ? void 0 : s.pool) == null ? void 0 : x.skill) ?? 0) + Number(((q = s == null ? void 0 : s.pool) == null ? void 0 : q.bonus) ?? 0), p = Math.max(0, m + Number(d ?? 0)), h = e.intent !== "initiative", y = h ? dn({ actor: r, ctx: s, payload: e }) : null, w = (ee = y == null ? void 0 : y.pre) != null && ee.spent ? 4 : Number(s.diceTarget ?? s.target ?? 5);
  h && ((ie = y == null ? void 0 : y.pre) != null && ie.spent) && ((he = y == null ? void 0 : y.pre) != null && he.poolKey) && await ((Ae = r.spendEdge) == null ? void 0 : Ae.call(r, y.pre.poolKey, 1));
  let g, A = 0, M = 0;
  if (s.rollType === "sum" && ((Ve = s.sum) != null && Ve.formula))
    g = await new Roll(s.sum.formula, s.sum.data ?? {}).evaluate({ async: !0 }), A = Number(g.total ?? 0) + Number(d ?? 0);
  else {
    g = await new Roll(`${p}d6cs>=${w}`).evaluate({ async: !0 });
    const ue = (mt = g.dice) == null ? void 0 : mt[0];
    A = Array.isArray(ue == null ? void 0 : ue.results) ? ue.results.filter((Te) => Te.success).length : 0, M = Array.isArray(ue == null ? void 0 : ue.results) ? ue.results.filter((Te) => Te.result === 1).length : 0;
  }
  s.intent === "initiative" && (g == null ? void 0 : g.total) != null && await hn({ actor: r, total: g.total });
  const k = tn(
    s,
    { successes: A, raw: (P = g == null ? void 0 : g.toJSON) == null ? void 0 : P.call(g) },
    null
    // opposed rolls can pass defender result later
  ), D = k == null ? void 0 : k.edgeEarned;
  if ((D == null ? void 0 : D.amount) > 0) {
    const ue = (R = s == null ? void 0 : s.domains) != null && R.includes("physical") ? "physical" : (te = s == null ? void 0 : s.domains) != null && te.includes("mental") ? "mental" : (Ce = s == null ? void 0 : s.domains) != null && Ce.includes("social") ? "social" : null, Te = nn(r, ue);
    await ((Ne = r.gainEdge) == null ? void 0 : Ne.call(r, Te, D.amount)), k.edgeEarned.pool = Te;
  }
  s.intent === "overload" && await fn({ actor: r, passed: k.passed });
  const H = Ir({
    actor: r,
    payload: e,
    ctx: s,
    roll: g,
    target: w,
    pool: p,
    mods: u,
    modTotal: d,
    hits: A,
    ones: M,
    edge: y,
    outcomeModel: k
  }), L = await xi({ resolved: H });
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: r }),
    content: L,
    flags: {
      mwd: {
        payload: e,
        resolved: H
      }
    }
  });
}
function dn({ actor: r, ctx: e, payload: t }) {
  var h, y, w, g, A, M, k;
  const s = mn(e == null ? void 0 : e.domains), i = pn[s] ?? null, a = (i == null ? void 0 : i.a) ?? null, n = (i == null ? void 0 : i.b) ?? null, o = [a, n].filter(Boolean), l = !!((h = t == null ? void 0 : t.toggles) != null && h.useEdge) || !!(t != null && t.useEdge);
  let c = String(((w = (y = t == null ? void 0 : t.edge) == null ? void 0 : y.pre) == null ? void 0 : w.poolKey) ?? "").trim() || null;
  c && !o.includes(c) && (c = null);
  const u = l && c ? 1 : 0;
  let d = [...o];
  u && c && (d = d.filter((D) => D !== c));
  let m = String(((A = (g = t == null ? void 0 : t.edge) == null ? void 0 : g.post) == null ? void 0 : A.poolKey) ?? "").trim() || null;
  m && !d.includes(m) && (m = null);
  const p = Number(((k = (M = t == null ? void 0 : t.edge) == null ? void 0 : M.post) == null ? void 0 : k.spent) ?? 0) ? 1 : 0;
  return {
    domain: s,
    pools: i ? { a, b: n } : null,
    pre: { poolKey: c, spent: u },
    post: { poolKey: m, spent: p },
    allowed: { prePools: o, postPools: d }
  };
}
function mn(r) {
  return Array.isArray(r) ? r.includes("physical") ? "physical" : r.includes("mental") ? "mental" : r.includes("social") ? "social" : null : null;
}
const pn = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};
async function hn({ actor: r, total: e }) {
  var o, l, c, u, d;
  const t = (l = (o = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : o.controlled) == null ? void 0 : l.find((m) => {
    var p;
    return ((p = m.actor) == null ? void 0 : p.id) === r.id;
  }), s = ((u = (c = r.getActiveTokens) == null ? void 0 : c.call(r, !0, !0)) == null ? void 0 : u[0]) ?? null, i = t ?? s;
  if (!i) {
    (d = ui.notifications) == null || d.warn("Initiative requires a token on the current scene.");
    return;
  }
  let a = game.combat;
  a || (a = await Combat.create({
    scene: canvas.scene.id,
    active: !0
  }));
  let n = a.combatants.find((m) => m.tokenId === i.id);
  if (!n) {
    const m = await a.createEmbeddedDocuments("Combatant", [{
      tokenId: i.id,
      actorId: r.id,
      sceneId: canvas.scene.id
    }]);
    n = m == null ? void 0 : m[0];
  }
  n && await n.update({ initiative: Number(e) });
}
async function fn({ actor: r, passed: e }) {
  e || await r.update({ "system.burn.overloaded": !0 });
}
const gn = /* @__PURE__ */ new Set(["physical", "mental", "social"]);
function yn(r) {
  if (r == null || r === "" || r === "—" || r === "–") return 0;
  const e = Number(r);
  return Number.isFinite(e) ? e : null;
}
function bn(r) {
  if (!r) return;
  const e = String(r).trim().toLowerCase();
  return gn.has(e) ? e : void 0;
}
class wn {
  constructor() {
    v(this, "id", "mwd.itemModifiers");
    v(this, "label", "Item Modifiers");
  }
  collect(e) {
    var i, a;
    const t = e == null ? void 0 : e.actor;
    if (!t) return [];
    const s = [];
    for (const n of t.items) {
      const o = (a = (i = n.flags) == null ? void 0 : i.mwd) == null ? void 0 : a.modifiers;
      if (!(!Array.isArray(o) || o.length === 0))
        for (const l of o) {
          if (!l) continue;
          const c = yn(l.value);
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
            domain: bn(l.domain)
          });
        }
    }
    return s;
  }
}
const Zt = {
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
class An {
  constructor() {
    v(this, "id", "mwd.statusEffects");
    v(this, "label", "Status Effects");
  }
  collect({ actor: e } = {}) {
    var i;
    const t = e == null ? void 0 : e.statuses;
    if (!e || !t) return [];
    const s = [];
    for (const a of t) {
      const n = Zt == null ? void 0 : Zt[a];
      if ((i = n == null ? void 0 : n.mods) != null && i.length)
        for (const o of n.mods) {
          const l = Array.isArray(o.domains) ? o.domains : [], c = o.value;
          if (l.length)
            for (const u of l)
              s.push({
                label: n.label ?? a,
                value: c,
                source: "Status",
                domain: u
              });
          else
            s.push({
              label: n.label ?? a,
              value: c,
              source: "Status"
            });
        }
    }
    return s;
  }
}
class Tn {
  constructor() {
    v(this, "id", "mwd.baseRollModifiers");
    v(this, "label", "Roll (Base)");
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
    const i = ((o = e == null ? void 0 : e.dialog) == null ? void 0 : o.otherMods) ?? ((l = e == null ? void 0 : e.modifiers) == null ? void 0 : l.otherMods) ?? (e == null ? void 0 : e.otherMods) ?? 0, a = Number(i);
    return Number.isFinite(a) && a !== 0 && t.push({
      id: "otherMods",
      label: "Other modifiers",
      value: a,
      source: "Roll"
    }), t;
  }
}
class kn {
  constructor() {
    v(this, "id", "mwd.condition");
    v(this, "label", "Condition");
  }
  collect({ actor: e, rollType: t } = {}) {
    var o, l, c, u, d, m, p, h;
    if (!e) return [];
    if (t === "edge") return [];
    const s = ((o = e.system) == null ? void 0 : o.derived) ?? {}, i = Number(
      ((l = s == null ? void 0 : s.condition) == null ? void 0 : l.physicalPenalty) ?? ((u = (c = s == null ? void 0 : s.monitors) == null ? void 0 : c.physical) == null ? void 0 : u.penalty) ?? 0
    ), a = Number(
      ((d = s == null ? void 0 : s.condition) == null ? void 0 : d.fatiguePenalty) ?? ((p = (m = s == null ? void 0 : s.monitors) == null ? void 0 : m.fatigue) == null ? void 0 : p.penalty) ?? 0
    ), n = [];
    return Number.isFinite(i) && i !== 0 && n.push({
      id: "conditionPhysical",
      label: "Physical Penalty",
      value: i,
      source: "Physical Track"
      // domain: "physical" // optional; leave unset to apply to all domains
    }), Number.isFinite(a) && a !== 0 && n.push({
      id: "conditionFatigue",
      label: "Fatigue Penalty",
      value: a,
      source: "Fatigue Track"
      // domain: "physical" // optional
    }), console.log("MWD|condition derived snapshot", e.name, foundry.utils.deepClone((h = e.system) == null ? void 0 : h.derived)), n;
  }
}
const Sn = {
  id: "burn",
  async collect(r) {
    var i, a;
    const e = r.actor;
    if (!e) return [];
    const t = Number(((a = (i = e.system) == null ? void 0 : i.burn) == null ? void 0 : a.value) ?? 0), s = Math.floor(t / 2);
    return s <= 0 ? [] : [{
      id: "burn",
      label: "Burn",
      value: -s,
      source: "Burn Track",
      domain: null
    }];
  }
};
function Mn() {
  Hooks.on("renderChatMessageHTML", (r, e) => {
    e.addEventListener("click", (t) => {
      const s = t.target.closest("[data-mwd-action]");
      if (!s) return;
      const i = String(s.dataset.mwdAction || "").trim();
      i && i === "edgePostReroll" && vn(t, r);
    });
  });
}
async function vn(r, e) {
  var h, y, w, g, A, M, k, D, H, L, V, J, z, X, E, x, q;
  r.preventDefault();
  const t = r.target.closest("[data-mwd-action='edgePostReroll']"), s = String(((h = t == null ? void 0 : t.dataset) == null ? void 0 : h.poolKey) ?? "").trim();
  if (!s) return;
  const i = foundry.utils.deepClone((w = (y = e == null ? void 0 : e.flags) == null ? void 0 : y.mwd) == null ? void 0 : w.resolved);
  if (!i || Number(((A = (g = i == null ? void 0 : i.edge) == null ? void 0 : g.post) == null ? void 0 : A.spent) ?? 0) === 1) return;
  if (!(Array.isArray((k = (M = i == null ? void 0 : i.edge) == null ? void 0 : M.allowed) == null ? void 0 : k.postPools) ? i.edge.allowed.postPools : []).includes(s)) {
    (H = (D = ui.notifications) == null ? void 0 : D.warn) == null || H.call(D, `Post-spend pool not allowed: ${s}`);
    return;
  }
  const n = Array.isArray((L = i == null ? void 0 : i.roll) == null ? void 0 : L.failureDiceRefs) ? i.roll.failureDiceRefs : [];
  if (n.length <= 0) {
    (J = (V = ui.notifications) == null ? void 0 : V.info) == null || J.call(V, "No failures to reroll.");
    return;
  }
  const o = await fromUuid(i.actorUuid);
  if (!o) {
    (X = (z = ui.notifications) == null ? void 0 : z.warn) == null || X.call(z, "Actor not found for this roll.");
    return;
  }
  await ((E = o.spendEdge) == null ? void 0 : E.call(o, s, 1));
  const l = Number(((x = i == null ? void 0 : i.roll) == null ? void 0 : x.target) ?? 5), u = (q = (await new Roll(`${n.length}d6cs>=${l}`).evaluate()).dice) == null ? void 0 : q[0], d = Array.isArray(u == null ? void 0 : u.results) ? u.results : [], m = d.filter((ee) => ee.success).length;
  i.outcome = i.outcome ?? {}, i.outcome.hits = Number(i.outcome.hits ?? 0) + m, i.edge = i.edge ?? {}, i.edge.post = { poolKey: s, spent: 1 }, i.edge.availableActions = {
    ...i.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, i.roll = i.roll ?? {}, i.roll.diceGroups = Array.isArray(i.roll.diceGroups) ? i.roll.diceGroups : [], i.roll.diceGroups.push({
    id: "post",
    label: "Post Reroll",
    faces: 6,
    termIndex: null,
    dice: d.map((ee, ie) => {
      const he = Number(ee.result), Ae = !!ee.success;
      return {
        ref: `post:${ie}`,
        face: he,
        isSuccess: Ae,
        isFailure: !Ae,
        tooltip: Ae ? `Post die ${ie + 1}: ${he} (Success vs TN ${l})` : `Post die ${ie + 1}: ${he} (Failure vs TN ${l})`
      };
    })
  });
  const p = await xi({ resolved: i });
  await e.update({
    content: p,
    "flags.mwd.resolved": i,
    "flags.mwd.payload.edge.post": { poolKey: s, spent: 1 }
  });
}
const { ApplicationV2: Cn, HandlebarsApplicationMixin: Pn } = foundry.applications.api, En = "mwd-gmgadget", Bi = "gmDnPresets", xt = "gmNextDn", At = "gmDnAnnounceToChat", Rn = "systems/mwd/templates/v2/mwd-gmgadget.hbs";
function Nn(r) {
  return (typeof r == "string" ? r : "").split(",").map((t) => t.trim()).filter(Boolean).map((t) => {
    const [s, i] = t.split(":").map((o) => (o ?? "").trim()), a = s || "DN", n = Number.isFinite(Number(i)) ? Number(i) : Number(s);
    return {
      label: a,
      dn: Number.isFinite(n) ? Math.max(0, Math.trunc(n)) : null
    };
  }).filter((t) => Number.isFinite(t.dn));
}
function Dn(r = "mwd") {
  game.settings.register(r, Bi, {
    scope: "world",
    config: !0,
    name: "GM Difficulty Presets (DN hits)",
    hint: "Comma-separated list like: Standard:1,Challenging:2,Hard:3,Extreme:4",
    type: String,
    default: "Standard:1,Challenging:2,Hard:3,Extreme:4"
  }), game.settings.register(r, xt, {
    scope: "client",
    config: !1,
    type: Number,
    default: 1
  }), game.settings.register(r, At, {
    scope: "client",
    config: !0,
    name: "Announce GM DN changes to chat",
    hint: "If enabled, posts a small chat notice when you change the current DN preset.",
    type: Boolean,
    default: !1
  });
}
const ze = class ze extends Pn(Cn) {
  constructor({ systemId: e = "mwd", ...t } = {}) {
    super(t), this.systemId = e;
  }
  async render(e = {}) {
    var t;
    return (t = game.user) != null && t.isGM ? super.render(e) : this;
  }
  async _prepareContext(e) {
    var o;
    const t = await super._prepareContext(e), s = game.settings.get(this.systemId, Bi), i = Nn(s), a = Number(game.settings.get(this.systemId, xt) ?? 1), n = !!game.settings.get(this.systemId, At);
    return foundry.utils.mergeObject(t, {
      presets: i,
      currentDn: a,
      announce: n,
      isGM: ((o = game.user) == null ? void 0 : o.isGM) ?? !1
    });
  }
  /**
   * data-action="setDn" data-dn="2" data-label="Hard"
   */
  async _onSetDn(e, t) {
    var a, n, o;
    if (e.preventDefault(), e.stopPropagation(), !((a = game.user) != null && a.isGM)) return;
    const s = Math.max(0, Math.trunc(Number(((n = t == null ? void 0 : t.dataset) == null ? void 0 : n.dn) ?? NaN)));
    if (!Number.isFinite(s)) return;
    if (await game.settings.set(this.systemId, xt, s), !!game.settings.get(this.systemId, At)) {
      const l = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.label) ?? `DN ${s}`);
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ user: game.user }),
        content: `<div class="mwd-gm-notice"><b>GM Difficulty:</b> ${foundry.utils.escapeHTML(l)} (DN ${s} hits)</div>`
      });
    }
    return this.render({ parts: ["body"] });
  }
  /**
   * Clears "next DN" back to 1.
   */
  async _onClearDn(e, t) {
    var s;
    if (e.preventDefault(), e.stopPropagation(), !!((s = game.user) != null && s.isGM))
      return await game.settings.set(this.systemId, xt, 1), this.render({ parts: ["body"] });
  }
  async _onToggleAnnounce(e, t) {
    var i;
    if (e.preventDefault(), e.stopPropagation(), !((i = game.user) != null && i.isGM)) return;
    const s = !game.settings.get(this.systemId, At);
    return await game.settings.set(this.systemId, At, s), this.render({ parts: ["body"] });
  }
};
v(ze, "DEFAULT_OPTIONS", {
  id: En,
  classes: ["mwd-gmgadget"],
  window: {
    title: "MWD GM Gadget",
    popOut: !0,
    resizable: !1
  },
  position: {
    width: 360,
    height: "auto"
  },
  actions: {
    setDn: ze.prototype._onSetDn,
    clearDn: ze.prototype._onClearDn,
    toggleAnnounce: ze.prototype._onToggleAnnounce
  }
}), v(ze, "PARTS", {
  body: { template: Rn }
});
let ks = ze, es = null;
function On({ systemId: r = "mwd" } = {}) {
  return es || (es = new ks({ systemId: r })), es;
}
function _n() {
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
function In() {
  return {
    get(r) {
      return Ze(r);
    },
    getSkills({ withKnowledge: r = !1 } = {}) {
      return os();
    },
    list() {
      return os();
    }
  };
}
class Ns {
  static start() {
    const e = new Ns();
    Hooks.once("init", () => e.onInit()), Hooks.once("ready", () => e.onReady());
  }
  async onInit() {
    console.log(Y + "AnarchySystem.onInit"), game.system.mwd = this, game.system.anarchy = this, game.mwd ?? (game.mwd = {}), _n(), Mn(), Dn("mwd"), game.mwd.roll = ii, game.mwd.personalCombat = pe, this.roll = ii, this.personalCombat = pe, this.skills = In(), this.remoteCall = new rs(), game.system.mwd.skills = this.skills, game.mwd.skills = this.skills, j.init(), this.modifiers = new U(), at.register(new wn()), at.register(new An()), at.register(new Tn()), at.register(new kn()), at.register(Sn), Handlebars.registerHelper("mwdClassList", (e) => Array.isArray(e) ? e.join(" ") : typeof e == "string" ? e : ""), this.actorClasses = {
      character: Vs,
      npc: Vs,
      vehicle: wi,
      battlemech: Ua
    }, this.hooks = new Xe(), this.styles = new _a(), this.handlebarsManager = new Ps(), pe.init(), Va.register(), console.log(Y + "AnarchySystem.onInit | loading system"), CONFIG.ANARCHY = se, CONFIG.Combat.initiative = { formula: "2d6" }, CONFIG.statusEffects.push({
      id: "overloaded",
      name: "Overloaded",
      icon: "systems/mwd/img/icons/status/surge.svg"
    }), CONFIG.Actor.documentClass = fr, CONFIG.Item.documentClass = ct, ct.init(), ir(), or(), await ur(), console.log(Y + "AnarchySystem.onInit | done");
  }
  async onReady() {
    if (console.log(Y + "AnarchySystem.onReady"), await pe.onReady(), !game.user.isGM) return;
    const e = game.settings.get(S, "enableGMGadget");
    if (!e) {
      console.log(`${Y}GMManager render skipped (enableGMGadget=false)`);
      return;
    }
    game.mwd = game.mwd ?? {}, game.mwd.gmGadget = () => On({ systemId: S }).render({ force: !0 }), e && game.mwd.gmGadget();
  }
}
Ns.start();
//# sourceMappingURL=index.mjs.map
