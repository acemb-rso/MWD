var nd = Object.defineProperty;
var sd = Object.getPrototypeOf;
var rd = Reflect.get;
var Ro = (a) => {
  throw TypeError(a);
};
var od = (a, e, t) => e in a ? nd(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var _ = (a, e, t) => od(a, typeof e != "symbol" ? e + "" : e, t), bs = (a, e, t) => e.has(a) || Ro("Cannot " + t);
var H = (a, e, t) => (bs(a, e, "read from private field"), t ? t.call(a) : e.get(a)), Te = (a, e, t) => e.has(a) ? Ro("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), Ie = (a, e, t, i) => (bs(a, e, "write to private field"), i ? i.call(a, t) : e.set(a, t), t), v = (a, e, t) => (bs(a, e, "access private method"), t);
var Qi = (a, e, t) => rd(sd(a), t, e);
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
}, k = Pe, w = "mwd", ld = "MechWarrior: Destiny", js = `system.${w}`, cd = w, Va = `systems/${w}`, Kl = `${Va}/style`, Ca = `${Va}/third-party/style`, Q = `systems/${w}/templates`, Jn = `${Va}/img/icons`, le = `${Jn}/skills`, Se = "MWD | ", ud = 2, dd = 5, md = 4, Vl = 8, Si = {
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
}, Gs = {
  autopilot: "autopilot",
  firewall: "firewall",
  knowledge: "knowledge"
}, nt = {
  grit: "grit",
  chaos: "chaos",
  insight: "insight",
  rumor: "rumor",
  legend: "legend",
  credibility: "credibility"
}, Fr = {
  physical: [nt.grit, nt.chaos],
  mental: [nt.insight, nt.rumor],
  social: [nt.legend, nt.credibility]
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
  actorAttributes: Si,
  itemAttributes: Gs,
  attributes: { ...Si, ...Gs },
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
    edgePools: nt,
    edgePoolGroups: Fr,
    physical: {
      grit: nt.grit,
      chaos: nt.chaos
    },
    mental: {
      insight: nt.insight,
      rumor: nt.rumor
    },
    social: {
      legend: nt.legend,
      credibility: nt.credibility
    },
    chaos: nt.chaos
  },
  area: {
    none: "none",
    shotgun: "shotgun",
    circle: "circle",
    cone: "cone",
    rect: "rect",
    ray: "ray"
  }
}, fd = Object.freeze({
  physical: "physical",
  mental: "mental",
  social: "social"
});
Object.freeze(Object.values(fd));
const pa = {
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
}, Ss = {
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
  SYSTEM_NAME: w,
  SYSTEM_DESCRIPTION: ld,
  SYSTEM_SOCKET: js,
  SYSTEM_SCOPE: cd,
  SYSTEM_PATH: Va,
  STYLE_PATH: Kl,
  THIRD_PARTY_STYLE_PATH: Ca,
  TEMPLATES_PATH: Q,
  ICONS_PATH: Jn,
  ICONS_SKILLS_PATH: le,
  LOG_HEAD: Se,
  SPECIALIZATION_BONUS: ud,
  TARGET_SUCCESS: dd,
  TARGET_SUCCESS_EDGE: md,
  BASE_MONITOR: Vl,
  ACTOR_ATTRIBUTES: Si,
  ITEM_ATTRIBUTES: Gs,
  EDGE_POOL_GROUPS: Fr,
  TEMPLATE: A,
  ANARCHY_SYSTEM: Ye
};
const qt = class qt {
  static ascending(e = (t) => t) {
    return (t, i) => qt.sortingBy(e(t), e(i));
  }
  static descending(e = (t) => t) {
    return (t, i) => qt.sortingBy(e(i), e(t));
  }
  static sortingBy(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
  }
  static bySortedArray(e) {
    return (t) => e.indexOf(t);
  }
  static ascendingBySortedArray(e) {
    return qt.ascending(qt.bySortedArray(e));
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
    return e.map(t).filter((i) => i != null).reduce(qt.sum(), 0);
  }
  static divint(e, t) {
    return Math.floor(e / t);
  }
  static divup(e, t) {
    return Math.ceil(e / t);
  }
  static join(e, t = "") {
    return e.reduce(qt.joiner(t));
  }
  static joiner(e = "") {
    return (t, i) => t + e + i;
  }
  static classify(e, t = (i) => i.type) {
    let i = {};
    return qt.classifyInto(i, e, t), i;
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
_(qt, "isString", (e) => typeof e == "string" || e instanceof String);
let se = qt;
const pd = {
  keyword: "keywords",
  disposition: "dispositions",
  cue: "cues"
}, R = class R {
  /**
   * Initialize enum caches.
   * Call once during system init/setup after config/constants are available.
   */
  static init() {
    var t, i, n, s, r, o, l, c, u, d, m, f;
    R.hbsAttributes = R.mapObjectToKeyValue(k.attributes).filter((p) => p.value !== "knowledge" && p.value !== "noAttribute"), R.hbsItemTypes = R.mapObjectToKeyValue(k.itemType), R.hbsMonitors = R.mapObjectToKeyValue(k.monitor), R.hbsMonitorLetters = R.mapObjectToKeyValue(k.monitorLetter), R.hbsAssetModuleCategories = R.mapObjectToKeyValue(k.assetModuleCategory), (i = (t = k.item) == null ? void 0 : t.lifeModule) != null && i.type ? R.hbsLifeModuleTypes = R.mapObjectToKeyValue(k.item.lifeModule.type) : (console.warn("MWD | MWD.item.lifeModule.type is missing; life module enums disabled."), R.hbsLifeModuleTypes = []), R.hbsAreas = R.mapObjectToKeyValue(k.area), R.hbsRanges = R.mapObjectToKeyValue(k.range), R.hbsVehicleCategories = R.mapObjectToKeyValue(k.vehicleCategory), R.hbsMwdWeightClasses = R.mapObjectToKeyValue((n = k.mwd) == null ? void 0 : n.weightClass), R.hbsMwdHardpointTypes = R.mapObjectToKeyValue((s = k.mwd) == null ? void 0 : s.hardpointType), R.hbsMwdHardpointSizes = R.mapObjectToKeyValue((r = k.mwd) == null ? void 0 : r.hardpointSize), R.hbsMwdHardpointLocations = R.mapObjectToKeyValue((o = k.mwd) == null ? void 0 : o.hardpointLocation), R.hbsMwdPrimaryModes = R.mapObjectToKeyValue((l = k.mwd) == null ? void 0 : l.primarySlotMode), R.hbsMwdWeaponCategories = R.mapObjectToKeyValue((c = k.mwd) == null ? void 0 : c.weaponCategory), R.hbsMwdWeaponDamageTypes = R.mapObjectToKeyValue((u = k.mwd) == null ? void 0 : u.weaponDamageType), R.hbsPersonalWeaponDamageTypes = R.mapObjectToKeyValue((d = k.mwd) == null ? void 0 : d.personalDamageType), R.hbsPersonalWeaponDamageCategories = R.mapObjectToKeyValue((m = k.mwd) == null ? void 0 : m.personalDamageCategory), R.hbsMwdMeleeLocations = R.mapObjectToKeyValue((f = k.mwd) == null ? void 0 : f.meleeLocation), R.hbsDamageTypes = se.distinct(
      (R.hbsMwdWeaponDamageTypes ?? []).concat(R.hbsPersonalWeaponDamageTypes ?? []),
      (p) => p.value
    );
    const e = Object.values(pa).flat();
    R.sortedAttributeKeys = se.distinct(
      e.concat(Object.keys(k.attributes ?? {}))
    ), R.registerHandleBarHelpers(), R.ENUMS = R.getEnums();
  }
  static registerHandleBarHelpers() {
    typeof Handlebars > "u" || Handlebars.registerHelper("sortedAttributes", (e) => {
      if (!e || typeof e != "object") return [];
      const t = Object.keys(e), i = R.sortedAttributeKeys ?? [], n = new Map(i.map((s, r) => [s, r]));
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
    return R.hbsDamageTypes ?? [];
  }
  static getAttributes(e = () => !0) {
    return (R.hbsAttributes ?? []).filter((t) => e(t.value));
  }
  static getActorWordTypes() {
    return pd;
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
    return R.mapObjectToKeyValue(e, t, i);
  }
};
_(R, "ENUMS"), // HBS-friendly arrays of { value, label } (or key/value depending on caller)
_(R, "hbsAttributes"), _(R, "hbsItemTypes"), _(R, "hbsMonitors"), _(R, "hbsMonitorLetters"), _(R, "hbsAssetModuleCategories"), _(R, "hbsLifeModuleTypes"), _(R, "hbsAreas"), _(R, "hbsRanges"), _(R, "hbsVehicleCategories"), // MWD-specific enum groups
_(R, "hbsMwdWeightClasses"), _(R, "hbsMwdHardpointTypes"), _(R, "hbsMwdHardpointSizes"), _(R, "hbsMwdHardpointLocations"), _(R, "hbsMwdPrimaryModes"), _(R, "hbsMwdWeaponCategories"), _(R, "hbsMwdWeaponDamageTypes"), _(R, "hbsPersonalWeaponDamageTypes"), _(R, "hbsPersonalWeaponDamageCategories"), _(R, "hbsDamageTypes"), _(R, "hbsMwdMeleeLocations"), _(R, "sortedAttributeKeys");
let be = R;
class hd {
  static monitor(e) {
    return be.getFromList(be.getMonitors(), e) ?? "";
  }
  static letter(e) {
    return be.getFromList(be.getMonitorLetters(), e) ?? "";
  }
}
class gd {
  static toLowerCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}
const yd = [
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
    return q.iconPath(`${Kl}/${e}`, t);
  }
  static iconPath(e, t) {
    return `<img class="${t}" src="${e}" />`;
  }
  static iconD6(e) {
    if (e < 0 || e > 6)
      throw `Dice ${e} is out of dice range [1..6] or 0 for multidice`;
    return q.fontAwesome(yd[e]);
  }
}
globalThis.ANARCHY_ICONS = q;
const ve = (a, e = {}) => a.replace(/\{(.*?)\}/g, (t, i) => e[i] ?? "");
function Hr(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => Hr(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function Ba(a = []) {
  return Array.from(new Set(a.map((e) => String(e ?? "").trim()).filter(Boolean)));
}
function mn(a, e = "standard") {
  return String(a ?? "").trim() || e;
}
function bd(a, e = {}) {
  a && (a.movedToKeywords ?? (a.movedToKeywords = []), a.movedToKeywords.push(e));
}
function Sd(a, e, t = {}) {
  a && (a.errors ?? (a.errors = []), a.errors.push({ message: e, ...t }));
}
const Ur = Object.freeze(["templated"]), Ad = Object.freeze([
  "burstCapable",
  "fullAutoCapable",
  "salvoCapable"
]), wd = Object.freeze([
  "clustered",
  "mineLayer",
  "smoke",
  "incendiary",
  "emp"
]), Td = Object.freeze([
  { value: "burstCapable", label: "Burst Capable" },
  { value: "fullAutoCapable", label: "Full Auto Capable" },
  { value: "salvoCapable", label: "Salvo Capable" }
]), vd = Object.freeze([
  { value: "templated", label: "Templated" },
  { value: "clustered", label: "Clustered" },
  { value: "mineLayer", label: "Mine Layer" },
  { value: "smoke", label: "Smoke" },
  { value: "incendiary", label: "Incendiary" },
  { value: "emp", label: "EMP" }
]), Yl = Object.freeze([
  { value: "blast", label: "Blast" },
  { value: "cone", label: "Cone" },
  { value: "line", label: "Line" },
  { value: "cloud", label: "Cloud" },
  { value: "minefield", label: "Minefield" }
]), Ql = Object.freeze([
  { value: "targeted", label: "Targeted (start on target)" },
  { value: "origin", label: "Origin (start on attacker)" },
  { value: "placed", label: "Placed (start free)" }
]), kd = Object.freeze(["blast", "cone", "line"]);
new Set(Ur);
const Ed = /* @__PURE__ */ new Set([
  ...Ur,
  ...Ad
]), Md = /* @__PURE__ */ new Set([
  ...Ur,
  ...wd
]);
function Wr() {
  return {
    movedToKeywords: [],
    errors: []
  };
}
function _n(a) {
  return Ba(Hr(a));
}
function Jl({
  traits: a = [],
  keywords: e = [],
  recognized: t = /* @__PURE__ */ new Set(),
  report: i = null,
  owner: n = "weapon",
  path: s = ""
} = {}) {
  const r = Hr(a), o = _n(e), l = [], c = [...o];
  for (const u of r) {
    if (t.has(u)) {
      l.push(u);
      continue;
    }
    c.push(u), bd(i, {
      owner: n,
      from: s || "traits",
      to: s ? s.replace(/traits$/u, "keywords") : "keywords",
      value: u
    });
  }
  return {
    traits: Ba(l),
    keywords: Ba(c)
  };
}
function Xl({
  traits: a = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.traits"
} = {}) {
  return Jl({
    traits: a,
    keywords: e,
    recognized: Ed,
    report: t,
    owner: "weapon",
    path: i
  });
}
function Zl({
  traits: a = [],
  keywords: e = [],
  report: t = null,
  path: i = "system.payloads[].traits"
} = {}) {
  return Jl({
    traits: a,
    keywords: e,
    recognized: Md,
    report: t,
    owner: "payload",
    path: i
  });
}
function ec(a = {}, e = "standard") {
  const t = a ?? {}, i = mn(
    t.resolverKey ?? t.damageModel ?? t.resolver,
    e
  ), n = String(t.damageModel ?? "").trim(), s = t.onHitEffect;
  return {
    resolverKey: i,
    damageModel: n,
    onHitEffect: s === null ? null : String(s ?? "").trim() || null
  };
}
function As(a = {}) {
  const e = a ?? {}, t = !!e.enabled, i = e.shots, n = e.accuracyMod, s = e.addHeat, r = e.consumption;
  return {
    enabled: t,
    ...i !== void 0 ? { shots: Math.max(0, Number(i ?? 0) || 0) } : {},
    ...n !== void 0 ? { accuracyMod: Number(n ?? 0) || 0 } : {},
    ...s !== void 0 ? { addHeat: Number(s ?? 0) || 0 } : {},
    ...r !== void 0 ? { consumption: Math.max(0, Number(r ?? 0) || 0) } : {}
  };
}
function Cd(a = {}) {
  const e = a ?? {};
  return {
    single: As(e.single),
    burst: As(e.burst),
    fullAuto: As(e.fullAuto)
  };
}
function Pd(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return e === "circle" ? "blast" : e === "ray" ? "line" : Yl.some((t) => t.value === e) ? e : "";
}
function Nd(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return ["target", "targeted"].includes(e) ? "targeted" : Ql.some((t) => t.value === e) ? e : "";
}
function Rd(a = null) {
  const e = a ?? {}, t = Pd(e.shape ?? e.t ?? e.type), i = e.size ?? e.distance ?? e.radius ?? e.length, n = Nd(e.placement ?? e.origin ?? e.mode);
  return !t && i === void 0 && !n ? null : {
    shape: t,
    size: Math.max(0, Number(i ?? 0) || 0),
    placement: n || "targeted"
  };
}
function Id({
  weapon: a = {},
  payload: e = {},
  effectiveTraits: t = [],
  effectiveResolution: i = null,
  report: n = null
} = {}) {
  var g, y;
  const s = Ba((a == null ? void 0 : a.traits) ?? []), r = Ba((e == null ? void 0 : e.traits) ?? []), o = t.includes("templated"), l = s.includes("templated"), c = r.includes("templated"), u = (e == null ? void 0 : e.template) ?? null, d = (a == null ? void 0 : a.template) ?? null, m = mn((g = e == null ? void 0 : e.resolution) == null ? void 0 : g.resolverKey, ""), f = mn((y = a == null ? void 0 : a.resolution) == null ? void 0 : y.resolverKey, ""), p = mn(i == null ? void 0 : i.resolverKey, "standard"), h = [];
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
    Sd(n, b, { capability: "templated" });
  return {
    errors: h,
    liveCapabilities: ["templated"],
    template: u,
    resolverKey: p,
    isTemplated: !0
  };
}
const za = Object.freeze(["none", "minor", "major", "full"]), Dd = Object.freeze(["blast", "cone", "line", "rect"]), Od = Object.freeze({
  blast: "circle",
  cone: "cone",
  line: "ray",
  rect: "rect"
}), _d = Object.freeze({
  circle: "blast",
  cone: "cone",
  ray: "line",
  rect: "rect",
  rectangle: "rect"
}), te = Object.freeze({
  none: "none",
  minor: "minor",
  major: "major",
  full: "full"
}), xd = Object.freeze({
  none: 0,
  minor: 0.25,
  major: 0.5,
  full: 1
}), rt = Object.freeze({
  discrete: "discrete",
  persistent: "persistent"
});
function O(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Ld(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return ["true", "1", "yes", "y", "on"].includes(t) ? !0 : ["false", "0", "no", "n", "off"].includes(t) ? !1 : e;
}
function tc(a) {
  return foundry.utils.deepClone(a);
}
function De(a, e = te.none) {
  const t = String(a ?? "").trim().toLowerCase();
  return za.includes(t) ? t : e;
}
function qs(a) {
  return Number(xd[De(a)] ?? 0) || 0;
}
function ki(a) {
  return za.indexOf(De(a));
}
function Ks(a, e = 1) {
  const t = Math.max(0, ki(a)), i = Math.max(0, t - Math.max(0, Math.trunc(O(e, 1))));
  return za[i] ?? te.none;
}
function $d(a, e = 1) {
  const t = Math.max(0, ki(a)), i = Math.min(za.length - 1, t + Math.max(0, Math.trunc(O(e, 1))));
  return za[i] ?? te.full;
}
function kt(a) {
  return De(a).toUpperCase();
}
function jr(a = {}) {
  var n, s, r, o, l;
  const e = a ?? {}, t = Math.max(1, Math.trunc(O(
    ((n = e == null ? void 0 : e.escalation) == null ? void 0 : n.intervalTurns) ?? ((s = e == null ? void 0 : e.escalation) == null ? void 0 : s.interval) ?? 1,
    1
  ))), i = Math.max(0, Math.trunc(O(((r = e == null ? void 0 : e.escalation) == null ? void 0 : r.rate) ?? 1, 1)));
  return {
    startExposure: De(e.startExposure, te.minor),
    escalation: {
      rate: i,
      intervalTurns: t,
      max: De((o = e == null ? void 0 : e.escalation) == null ? void 0 : o.max, te.full)
    },
    onFull: {
      burnDelta: Math.max(0, Math.trunc(O(((l = e == null ? void 0 : e.onFull) == null ? void 0 : l.burnDelta) ?? 0, 0)))
    },
    clearOnExit: Ld(e.clearOnExit, !0)
  };
}
function di(a = {}) {
  const e = a ?? {}, t = String(e.kind ?? rt.discrete).trim().toLowerCase() === rt.persistent ? rt.persistent : rt.discrete;
  return {
    kind: t,
    hazard: t === rt.persistent ? jr(e.hazard ?? e) : null
  };
}
function Bd(a = {}) {
  return di(a).kind === rt.persistent;
}
function Wi(a, e) {
  return Math.max(0, Math.ceil(O(a, 0) * qs(e)));
}
function Xn(a, e = "") {
  const t = String(a ?? "").trim().toLowerCase();
  return Dd.includes(t) ? t : e;
}
function ic(a, e = "circle") {
  return Od[Xn(a)] ?? e;
}
function zd(a, e = "") {
  const t = String(a ?? "").trim().toLowerCase();
  return _d[t] ?? e;
}
function Gr(a) {
  let e = O(a, 0);
  for (; e < 0; ) e += 360;
  for (; e >= 360; ) e -= 360;
  return e;
}
function mi() {
  var a, e, t;
  return O(((e = (a = canvas == null ? void 0 : canvas.scene) == null ? void 0 : a.grid) == null ? void 0 : e.distance) ?? ((t = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : t.distance), 1) || 1;
}
function xn() {
  var a, e;
  return O(((a = canvas == null ? void 0 : canvas.grid) == null ? void 0 : a.size) ?? ((e = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : e.size), 100) || 100;
}
function Ze(a = 0) {
  return O(a, 0) * (xn() / mi());
}
function va(a = 0) {
  return O(a, 0) * (mi() / xn());
}
function Vs(a = {}, e = {}) {
  return Math.hypot(O(a.x, 0) - O(e.x, 0), O(a.y, 0) - O(e.y, 0));
}
function Ya(a) {
  return O(a, 0) * Math.PI / 180;
}
function Fd({ geometry: a = {}, tokenCenter: e = {} } = {}) {
  const t = O(e.x, 0) - O(a.x, 0), i = O(e.y, 0) - O(a.y, 0), n = Ya(a.direction ?? 0), s = Math.cos(n), r = Math.sin(n);
  return Math.max(0, t * s + i * r);
}
function ws(a = 0, e = 0) {
  if (!(e > 0)) return te.none;
  const t = Math.max(0, Math.min(1, a / e));
  return t <= 1 / 3 ? te.full : t <= 2 / 3 ? te.major : t <= 1 ? te.minor : te.none;
}
function Io({ template: a = {}, placement: e = {} } = {}) {
  var l, c;
  const t = Xn((e == null ? void 0 : e.shape) ?? (a == null ? void 0 : a.shape), "");
  if (!t) return null;
  const i = O(
    (e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size),
    0
  );
  if (!(i > 0)) return null;
  const n = t === "cone" ? O((e == null ? void 0 : e.angle) ?? 90, 90) : null, s = t === "line" ? O((e == null ? void 0 : e.width) ?? mi(), mi()) : null, r = t === "rect" ? O((e == null ? void 0 : e.width) ?? (a == null ? void 0 : a.width) ?? (e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size), 0) : null, o = t === "rect" ? O((e == null ? void 0 : e.height) ?? (a == null ? void 0 : a.height) ?? (e == null ? void 0 : e.distance) ?? (a == null ? void 0 : a.distance) ?? (a == null ? void 0 : a.size), 0) : null;
  return t === "rect" && (!(r > 0) || !(o > 0)) ? null : {
    shape: t,
    measuredTemplateType: ic(t),
    x: O((l = e == null ? void 0 : e.anchor) == null ? void 0 : l.x, 0),
    y: O((c = e == null ? void 0 : e.anchor) == null ? void 0 : c.y, 0),
    direction: Gr((e == null ? void 0 : e.direction) ?? 0),
    distance: t === "rect" ? Math.max(r, o) : i,
    angle: n,
    width: s,
    height: t === "rect" ? o : null,
    anchorX: t === "rect" ? O((e == null ? void 0 : e.anchorX) ?? (a == null ? void 0 : a.anchorX) ?? 0, 0) : null,
    anchorY: t === "rect" ? O((e == null ? void 0 : e.anchorY) ?? (a == null ? void 0 : a.anchorY) ?? 0, 0) : null,
    placementMode: String((a == null ? void 0 : a.placement) ?? (e == null ? void 0 : e.placementMode) ?? "").trim() || null
  };
}
function Ue(a = null, { template: e = null, placement: t = null } = {}) {
  var u, d, m, f;
  const i = a && typeof a == "object" ? a : {};
  if ((!i || !Object.keys(i).length) && (e || t))
    return Io({ template: e, placement: t });
  const n = String(
    i.measuredTemplateType ?? i.t ?? i.type ?? ""
  ).trim().toLowerCase(), s = Xn(
    i.shape ?? zd(n) ?? "",
    ""
  );
  if (!s)
    return e || t ? Io({ template: e, placement: t }) : null;
  const r = s === "rect" ? O(i.width ?? (t == null ? void 0 : t.width) ?? (e == null ? void 0 : e.width) ?? i.distance ?? i.size, 0) : 0, o = s === "rect" ? O(i.height ?? (t == null ? void 0 : t.height) ?? (e == null ? void 0 : e.height) ?? i.distance ?? i.size, 0) : 0, l = O(
    i.distance ?? i.size ?? i.templateDistance ?? (t == null ? void 0 : t.distance) ?? (e == null ? void 0 : e.distance) ?? (e == null ? void 0 : e.size),
    0
  );
  if (s === "rect") {
    if (!(r > 0) || !(o > 0)) return null;
  } else if (!(l > 0)) return null;
  return {
    shape: s,
    measuredTemplateType: n || ic(s),
    x: O(i.x ?? ((u = i.anchor) == null ? void 0 : u.x) ?? ((d = t == null ? void 0 : t.anchor) == null ? void 0 : d.x), 0),
    y: O(i.y ?? ((m = i.anchor) == null ? void 0 : m.y) ?? ((f = t == null ? void 0 : t.anchor) == null ? void 0 : f.y), 0),
    direction: Gr(i.direction ?? i.rotation ?? (t == null ? void 0 : t.direction) ?? 0),
    distance: s === "rect" ? Math.max(r, o) : l,
    angle: s === "cone" ? O(i.angle ?? (t == null ? void 0 : t.angle) ?? 90, 90) : null,
    width: s === "line" ? O(i.width ?? (t == null ? void 0 : t.width) ?? mi(), mi()) : s === "rect" ? r : null,
    height: s === "rect" ? o : null,
    anchorX: s === "rect" ? O(i.anchorX ?? (t == null ? void 0 : t.anchorX) ?? (e == null ? void 0 : e.anchorX) ?? 0, 0) : null,
    anchorY: s === "rect" ? O(i.anchorY ?? (t == null ? void 0 : t.anchorY) ?? (e == null ? void 0 : e.anchorY) ?? 0, 0) : null,
    placementMode: String(i.placementMode ?? (e == null ? void 0 : e.placement) ?? "").trim() || null
  };
}
function Hd(a = null) {
  return a ? typeof (a == null ? void 0 : a.toObject) == "function" ? a.toObject() : typeof (a == null ? void 0 : a.toJSON) == "function" ? a.toJSON() : a && typeof a == "object" ? tc(a) : null : null;
}
function Ud(a = []) {
  const e = [];
  for (const t of a) {
    const i = Number(t);
    i > 0 && (e.some((n) => Math.abs(n - i) < 1e-3) || e.push(i));
  }
  return e;
}
function Wd(a = null, { placementMode: e = "region", shapeHint: t = "" } = {}) {
  const i = Hd(a);
  if (!i || typeof i != "object") return null;
  const n = String(i.type ?? "").trim().toLowerCase(), s = Xn(t, "");
  if (n === "circle")
    return Ue({
      shape: s || "blast",
      measuredTemplateType: "circle",
      x: i.x,
      y: i.y,
      distance: va(i.radius),
      placementMode: e
    });
  if (n === "ellipse") {
    const r = O(i.radiusX, 0), o = O(i.radiusY, 0);
    return !(r > 0) || Math.abs(r - o) > 1e-3 ? null : Ue({
      shape: s || "blast",
      measuredTemplateType: "circle",
      x: O(i.x, 0) + r,
      y: O(i.y, 0) + o,
      distance: va(r),
      placementMode: e
    });
  }
  if (n === "cone")
    return Ue({
      shape: s || "cone",
      measuredTemplateType: "cone",
      x: i.x,
      y: i.y,
      direction: i.rotation ?? i.direction,
      distance: va(i.radius),
      angle: i.angle,
      placementMode: e
    });
  if (n === "line") {
    const r = Array.from((a == null ? void 0 : a.measuredSegments) ?? []), o = Ud(r.map((f) => f == null ? void 0 : f.distance)), l = Math.max(
      O(i.distance, 0),
      O(i.length, 0),
      O(i.radius, 0),
      ...o,
      0
    ), c = o.filter((f) => Math.abs(f - l) >= 1e-3), u = Math.max(
      0,
      O(i.width, 0),
      O(i.thickness, 0),
      c.length ? Math.min(...c) : 0
    ) || mi(), d = (a == null ? void 0 : a.origin) ?? i.origin ?? {}, m = r.reduce((f, p) => {
      const h = Number((p == null ? void 0 : p.distance) ?? 0), g = Number((f == null ? void 0 : f.distance) ?? 0);
      return h > g ? p : f;
    }, null);
    return Ue({
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
  return n === "rectangle" || n === "rect" ? Ue({
    shape: s || "rect",
    measuredTemplateType: "rect",
    x: i.x,
    y: i.y,
    direction: i.rotation ?? i.direction,
    width: va(i.width),
    height: va(i.height),
    anchorX: i.anchorX,
    anchorY: i.anchorY,
    placementMode: e
  }) : null;
}
function ac(a = null, { placementMode: e = "region", shapeHint: t = "" } = {}) {
  const i = (a == null ? void 0 : a.document) ?? a ?? null, n = Array.from((i == null ? void 0 : i.shapes) ?? []);
  return n.length !== 1 ? null : Wd(n[0], { placementMode: e, shapeHint: t });
}
function jd(a = null, e = null) {
  const t = Ue(a);
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
function nc(a) {
  var o, l, c, u, d, m, f, p, h;
  const e = (a == null ? void 0 : a.center) ?? ((o = a == null ? void 0 : a.object) == null ? void 0 : o.center) ?? null;
  if (e)
    return {
      x: O(e.x, 0),
      y: O(e.y, 0)
    };
  const t = O((a == null ? void 0 : a.x) ?? ((l = a == null ? void 0 : a.document) == null ? void 0 : l.x), 0), i = O((a == null ? void 0 : a.y) ?? ((c = a == null ? void 0 : a.document) == null ? void 0 : c.y), 0), n = O((a == null ? void 0 : a.w) ?? ((u = a == null ? void 0 : a.object) == null ? void 0 : u.w) ?? ((d = a == null ? void 0 : a.document) == null ? void 0 : d.width), 1), s = O((a == null ? void 0 : a.h) ?? ((m = a == null ? void 0 : a.object) == null ? void 0 : m.h) ?? ((f = a == null ? void 0 : a.document) == null ? void 0 : f.height), 1), r = O(((p = canvas == null ? void 0 : canvas.grid) == null ? void 0 : p.size) ?? ((h = canvas == null ? void 0 : canvas.dimensions) == null ? void 0 : h.size), 100);
  return {
    x: t + n * r / 2,
    y: i + s * r / 2
  };
}
function Gd(a) {
  var i, n, s, r;
  const e = O((a == null ? void 0 : a.w) ?? ((i = a == null ? void 0 : a.object) == null ? void 0 : i.w) ?? ((n = a == null ? void 0 : a.document) == null ? void 0 : n.width), 1) * xn(), t = O((a == null ? void 0 : a.h) ?? ((s = a == null ? void 0 : a.object) == null ? void 0 : s.h) ?? ((r = a == null ? void 0 : a.document) == null ? void 0 : r.height), 1) * xn();
  return Math.max(e, t) / 2;
}
function qd({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = Ze(a.distance);
  return Vs({ x: a.x, y: a.y }, e) <= i + t;
}
function Kd({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = Ze(a.distance), n = Ze(a.width ?? mi()), s = Ya(a.direction), r = e.x - a.x, o = e.y - a.y, l = Math.cos(s), c = Math.sin(s), u = r * l + o * c;
  if (u < -t || u > i + t) return !1;
  const d = Math.max(0, Math.min(i, u)), m = a.x + d * l, f = a.y + d * c;
  return Math.hypot(e.x - m, e.y - f) <= t + n / 2;
}
function Vd({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = Ze(a.distance), n = e.x - a.x, s = e.y - a.y, r = Math.hypot(n, s);
  if (r > i + t) return !1;
  if (r === 0) return !0;
  let l = Math.atan2(s, n) * 180 / Math.PI - a.direction;
  for (; l <= -180; ) l += 360;
  for (; l > 180; ) l -= 360;
  const c = O(a.angle, 90) / 2, u = Math.asin(Math.min(1, t / Math.max(r, 1))) * 180 / Math.PI;
  return Math.abs(l) <= c + u;
}
function Yd({ geometry: a, tokenCenter: e, tokenRadius: t }) {
  const i = Ze(O(a.width, 0)), n = Ze(O(a.height, 0));
  if (!(i > 0) || !(n > 0)) return !1;
  const s = O(a.anchorX, 0), r = O(a.anchorY, 0), o = O(a.x, 0), l = O(a.y, 0), c = o + i * (0.5 - s), u = l + n * (0.5 - r), d = -Ya(a.direction ?? 0), m = Math.cos(d), f = Math.sin(d), p = e.x - c, h = e.y - u, g = p * m - h * f, y = p * f + h * m;
  return Math.abs(g) <= i / 2 + t && Math.abs(y) <= n / 2 + t;
}
function qr(a = null, e = null) {
  const t = Ue(a);
  if (!t || !e) return !1;
  const i = nc(e), n = Gd(e);
  return t.shape === "blast" ? qd({ geometry: t, tokenCenter: i, tokenRadius: n }) : t.shape === "line" ? Kd({ geometry: t, tokenCenter: i, tokenRadius: n }) : t.shape === "cone" ? Vd({ geometry: t, tokenCenter: i, tokenRadius: n }) : t.shape === "rect" ? Yd({ geometry: t, tokenCenter: i, tokenRadius: n }) : !1;
}
function sc({ template: a = {}, placement: e = {}, geometry: t = null, token: i = null } = {}) {
  if (!i) return te.none;
  const n = Ue(t, { template: a, placement: e });
  if (!n || !qr(n, i))
    return te.none;
  const s = nc(i), r = Ze(n.distance);
  if (!(r > 0)) return te.none;
  if (n.shape === "line" || n.shape === "cone") {
    const l = Fd({ geometry: n, tokenCenter: s });
    return ws(l, r);
  }
  if (n.shape === "rect") {
    const l = {
      x: O(n.x, 0) + Ze(O(n.width, 0)) * (0.5 - O(n.anchorX, 0)),
      y: O(n.y, 0) + Ze(O(n.height, 0)) * (0.5 - O(n.anchorY, 0))
    }, c = Vs(l, s);
    return ws(c, r);
  }
  const o = Vs({ x: n.x, y: n.y }, s);
  return ws(o, r);
}
function Ri({ tier: a = te.none, appliedTier: e = null, evadeUsed: t = !1, evadeLocked: i = !1 } = {}) {
  const n = De(a, te.none), s = De(e ?? n, n);
  return {
    initialTier: n,
    initialLabel: kt(n),
    initialMultiplier: qs(n),
    finalTier: s,
    finalLabel: kt(s),
    finalMultiplier: qs(s),
    evadeUsed: !!t,
    evadeLocked: !!i
  };
}
function Kr(a = {}, { locked: e = !1, active: t = !1 } = {}) {
  const i = De((a == null ? void 0 : a.initialTier) ?? (a == null ? void 0 : a.tier), te.none);
  if (!t || e || i === te.none)
    return Ri({
      tier: i,
      appliedTier: i,
      evadeUsed: !1,
      evadeLocked: !!e
    });
  const n = Ks(i, 1);
  return Ri({
    tier: i,
    appliedTier: n,
    evadeUsed: i !== n,
    evadeLocked: !!e
  });
}
function rc(a = []) {
  return a.map((e) => ({
    x: Math.round(O(e.x, 0)),
    y: Math.round(O(e.y, 0))
  }));
}
function Qd(a = {}) {
  const e = Ze(O(a.distance, 0)), t = Ze(O(a.width, mi())) / 2, i = Ya(a.direction ?? 0), n = Math.cos(i), s = Math.sin(i), r = -s, o = n, l = {
    x: O(a.x, 0) + e * n,
    y: O(a.y, 0) + e * s
  };
  return {
    type: "polygon",
    points: rc([
      { x: a.x + r * t, y: a.y + o * t },
      { x: l.x + r * t, y: l.y + o * t },
      { x: l.x - r * t, y: l.y - o * t },
      { x: a.x - r * t, y: a.y - o * t }
    ])
  };
}
function Jd(a = {}) {
  const e = O(a.angle, 90), t = Ze(O(a.distance, 0)), i = O(a.direction, 0), n = e / 2, s = [{ x: a.x, y: a.y }];
  for (let r = 0; r <= 8; r += 1) {
    const o = -n + e / 8 * r, l = Ya(i + o);
    s.push({
      x: O(a.x, 0) + Math.cos(l) * t,
      y: O(a.y, 0) + Math.sin(l) * t
    });
  }
  return {
    type: "polygon",
    points: rc(s)
  };
}
function Xd(a = {}) {
  return {
    type: "rectangle",
    x: Math.round(O(a.x, 0)),
    y: Math.round(O(a.y, 0)),
    width: Math.round(Ze(O(a.width, 0))),
    height: Math.round(Ze(O(a.height, 0))),
    rotation: Gr(a.direction ?? 0),
    anchorX: O(a.anchorX, 0),
    anchorY: O(a.anchorY, 0)
  };
}
function Vr(a = null) {
  const e = Ue(a);
  if (!e) return [];
  if (e.shape === "blast") {
    const t = Ze(O(e.distance, 0));
    return [{
      type: "ellipse",
      x: Math.round(O(e.x, 0) - t),
      y: Math.round(O(e.y, 0) - t),
      radiusX: Math.round(t),
      radiusY: Math.round(t),
      rotation: 0
    }];
  }
  return e.shape === "line" ? [Qd(e)] : e.shape === "cone" ? [Jd(e)] : e.shape === "rect" ? [Xd(e)] : [];
}
function li(a = null) {
  const e = Ue(a);
  return e ? tc(e) : null;
}
const oc = Object.freeze({
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}), Ln = Object.freeze(
  Object.entries(oc).map(([a, e]) => ({ value: a, label: e }))
), Zd = Object.freeze({
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
}), em = Object.freeze(
  Ln.map((a) => a.value)
), Ys = Object.freeze({}), Zn = Object.freeze({
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
}), tm = Object.freeze(
  Object.values(Zn).map((a) => ({
    value: a.key,
    label: a.label,
    rated: a.rated
  }))
), lc = mc(Ys), cc = mc(Zn);
function es(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? Object.values(a).flatMap((e) => es(e)) : Array.isArray(a) ? a.map((e) => String(e ?? "").trim()).filter(Boolean) : String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean);
}
function Ut(a, e = "penetrating") {
  const t = String(a ?? "").trim().toLowerCase();
  return Zd[t] ?? e;
}
function uc(a) {
  const e = String(a ?? "").trim();
  return e ? Ut(e, "") : "";
}
function dc(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return em.includes(e);
}
function Wt(a) {
  const e = Ut(a, "");
  return oc[e] ?? String(a ?? "").trim();
}
function Qt(a) {
  const e = a ?? {}, t = Number(e.ballistic ?? 0) || 0, i = Number(e.melee ?? 0) || 0;
  return {
    penetrating: e.penetrating !== void 0 ? Number(e.penetrating ?? 0) || 0 : Math.max(t, i),
    concussive: e.concussive !== void 0 ? Number(e.concussive ?? 0) || 0 : Number(e.explosive ?? 0) || 0,
    energy: Number(e.energy ?? 0) || 0,
    thermal: Number(e.thermal ?? 0) || 0,
    electrical: Number(e.electrical ?? 0) || 0
  };
}
function fn(a) {
  return es(a);
}
function wa(a) {
  return es(a);
}
function im(a) {
  return _n(a);
}
function pn(a = {}, e = "standard") {
  return ec(a, e);
}
function hn(a = {}) {
  return Cd(a);
}
function am(a = null) {
  return Rd(a);
}
function ha(a = "id") {
  var t, i;
  const e = (i = (t = globalThis.foundry) == null ? void 0 : t.utils) == null ? void 0 : i.randomID;
  return typeof e == "function" ? e() : `${a}-${Math.random().toString(36).slice(2, 10)}`;
}
function mc(a) {
  const e = {};
  return Object.values(a).forEach((t) => {
    [t.key, ...t.aliases ?? []].forEach((i) => {
      e[Fa(i)] = t.key;
    });
  }), Object.freeze(e);
}
function Fa(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function Ta(a) {
  return Array.isArray(a) ? a : a && typeof a == "object" ? Object.values(a) : a == null || a === "" ? [] : [a];
}
function fc(a, e) {
  return Ta(a).map((t) => nm(t, e)).filter(Boolean);
}
function nm(a, e) {
  if (typeof a == "string" || typeof a == "number") {
    const i = e[Fa(a)];
    return i ? { id: ha("trait"), key: i, rating: 1 } : null;
  }
  if (!a || typeof a != "object") return null;
  const t = e[Fa(a.key ?? a.value ?? a.name)];
  return t ? {
    id: String(a.id ?? "").trim() || ha("trait"),
    key: t,
    rating: Math.max(0, Number(a.rating ?? 0) || 0)
  } : null;
}
function Li(a) {
  return fc(a, lc);
}
function ai(a) {
  return fc(a, cc);
}
function $n(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function sm(a = {}, e = {}) {
  const t = $n(a), i = $n(e);
  return {
    close: t.close + i.close,
    near: t.near + i.near,
    far: t.far + i.far,
    extreme: t.extreme + i.extreme
  };
}
function rm(a, e) {
  var t;
  return ((t = e[a]) == null ? void 0 : t.label) ?? a;
}
function pc(a, e) {
  var n;
  const t = rm(a == null ? void 0 : a.key, e), i = Math.max(0, Number((a == null ? void 0 : a.rating) ?? 0) || 0);
  return (n = e[a == null ? void 0 : a.key]) != null && n.rated && i > 0 ? `${t} ${i}` : t;
}
function hc(a, e) {
  return Ta(a).map((t) => {
    const i = t == null ? void 0 : t.key, n = e[i];
    return n != null && n.resolve ? {
      entry: t,
      effect: n.resolve(t),
      label: pc(t, e)
    } : null;
  }).filter(Boolean);
}
function om(a, e) {
  const t = { ...a ?? {} };
  return Object.entries(e ?? {}).forEach(([i, n]) => {
    t[i] = (Number(t[i] ?? 0) || 0) + (Number(n ?? 0) || 0);
  }), t;
}
function lm(a = []) {
  const e = {}, t = /* @__PURE__ */ new Set();
  for (const i of a.filter(Boolean)) {
    i.accuracyMod !== void 0 && (e.accuracyMod = (Number(e.accuracyMod ?? 0) || 0) + (Number(i.accuracyMod ?? 0) || 0)), i.ap !== void 0 && (e.ap = (Number(e.ap ?? 0) || 0) + (Number(i.ap ?? 0) || 0)), i.addHeat !== void 0 && (e.addHeat = (Number(e.addHeat ?? 0) || 0) + (Number(i.addHeat ?? 0) || 0)), i.bonusVsArmorTag && (e.bonusVsArmorTag = om(e.bonusVsArmorTag, i.bonusVsArmorTag));
    for (const n of i.flags ?? []) {
      const s = String(n ?? "").trim();
      s && t.add(s);
    }
  }
  return t.size > 0 && (e.flags = Array.from(t)), e;
}
function cm(a = [], e = []) {
  const t = Array.isArray(a) || typeof a == "string" ? { traits: a, standardTraits: e } : a ?? {}, i = wa(t.traits), n = Li(t.standardTraits), s = hc(n, Ys), r = i.map((o) => {
    var u;
    const l = lc[Fa(o)];
    if (!l) return null;
    const c = (u = Ys[l]) == null ? void 0 : u.resolve;
    return typeof c == "function" ? c({ key: l, rating: 1 }) : null;
  });
  return lm([
    ...s.map((o) => o.effect),
    ...r
  ]);
}
function um(a) {
  const e = a ?? {}, t = Wr(), i = Zl({
    traits: e.traits,
    keywords: e.keywords,
    report: t,
    path: "ammo.types[].traits"
  });
  return {
    id: String(e.id ?? "").trim() || ha("ammo"),
    name: String(e.name ?? "").trim() || "Ammo",
    damageType: uc(e.damageType),
    apMod: Number(e.apMod ?? e.ap ?? 0) || 0,
    attackRatingBandMod: $n(e.attackRatingBandMod ?? e.attackRatingBand),
    traits: i.traits,
    keywords: i.keywords,
    migration: t
  };
}
function dm(a) {
  var l;
  const e = a ?? {}, t = Math.max(0, Number(e.max ?? 0) || 0), i = Number(e.current), n = Number.isFinite(i) ? Math.max(0, Math.min(i, t > 0 ? t : i)) : Math.max(0, t), s = Ta(e.types).map(um), r = String(e.activeTypeId ?? "").trim(), o = s.some((c) => c.id === r) ? r : ((l = s[0]) == null ? void 0 : l.id) ?? "";
  return {
    current: n,
    max: t,
    consumePerAttack: Math.max(1, Number(e.consumePerAttack ?? 1) || 1),
    activeTypeId: o,
    types: s
  };
}
function mm(a, e = "untracked") {
  const t = String(a ?? "").trim();
  return t ? t === "linked" ? "internal" : t === "perAttack" ? e : ["untracked", "internal", "actorResource", "itemRef"].includes(t) ? t : e : e;
}
function Qs(a = {}) {
  const e = a ?? {};
  return {
    amount: Math.max(1, Number(e.amount ?? e.consumePerUse ?? e.consumePerAttack ?? 1) || 1),
    sourceId: String(e.sourceId ?? "").trim()
  };
}
function Do(a = {}) {
  const e = a ?? {};
  return {
    damageType: uc(e.damageType),
    ap: Number(e.ap ?? e.apMod ?? 0) || 0,
    attackRatingBand: $n(e.attackRatingBand ?? e.attackRatingBandMod)
  };
}
function Js(a = {}) {
  return ec(a, "standard");
}
function fm(a) {
  return String(a ?? "").trim().toLowerCase() === "unloaded";
}
function st(a, { report: e = null, path: t = "system.payloads[]" } = {}) {
  var l;
  const i = a ?? {}, n = String(i.id ?? "").trim() || ha("payload"), s = Zl({
    traits: i.traits ?? ((l = i.modifies) == null ? void 0 : l.traits),
    keywords: i.keywords,
    report: e,
    path: `${t}.traits`
  }), r = es(i.compatibleWith ?? i.compatible), o = am(i.template);
  return fm(n) ? {
    id: "unloaded",
    label: "Unloaded",
    compatibleWith: [],
    modifies: Do({}),
    traits: [],
    keywords: [],
    template: null,
    areaEffect: di({ kind: "discrete" }),
    resolution: Js({ resolverKey: "standard" }),
    consumption: Qs({ amount: 1, sourceId: "" })
  } : {
    id: n,
    label: String(i.label ?? i.name ?? "").trim() || "Payload",
    compatibleWith: r,
    modifies: Do(i.modifies ?? i),
    traits: s.traits,
    keywords: s.keywords,
    template: o,
    areaEffect: di(i.areaEffect ?? {}),
    resolution: Js(i.resolution ?? i),
    consumption: Qs(i.consumption ?? i)
  };
}
function Kt(a) {
  var o, l, c, u, d, m;
  const e = a ?? {}, t = mm(
    e.kind || e.type || ((o = e.link) != null && o.actorPath || e.actorPath ? "actorResource" : "") || ((l = e.link) != null && l.itemId || e.itemId || (c = e.link) != null && c.itemPath || e.itemPath ? "itemRef" : "") || (e.tracking || e.current !== void 0 || e.max !== void 0 ? "internal" : "") || "untracked",
    "untracked"
  ), i = e.tracking ?? e, n = Math.max(0, Number(i.max ?? 0) || 0), s = Number(i.current), r = Number.isFinite(s) ? Math.max(0, Math.min(s, n > 0 ? n : s)) : Math.max(0, n);
  return {
    id: String(e.id ?? "").trim() || ha("source"),
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
function gc({ report: a = null, path: e = "system.payloads" } = {}) {
  return {
    payloads: [st({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: a, path: `${e}[0]` })],
    selectedPayloadId: "unloaded",
    consumptionSources: [Kt({
      id: "untracked",
      label: "Untracked",
      kind: "untracked"
    })]
  };
}
function yc(a) {
  return String(a ?? "").trim().toLowerCase() === "melee";
}
function Xs(a = [], { report: e = null, path: t = "system.payloads" } = {}) {
  const i = Ta(a).map((n, s) => st(n, { report: e, path: `${t}[${s}]` })).filter(Boolean);
  return i.some((n) => n.id === "unloaded") ? i : [
    st({
      id: "unloaded",
      label: "Unloaded",
      resolution: { resolverKey: "standard" },
      consumption: { amount: 1, sourceId: "" }
    }, { report: e, path: `${t}[0]` }),
    ...i
  ];
}
function ts(a = {}, { report: e = null, path: t = "system.payloads" } = {}) {
  var d;
  const i = dm(a), n = Math.max(1, Number(i.consumePerAttack ?? 1) || 1), s = i.max > 0, r = s ? "internal-magazine" : "untracked", o = [Kt(s ? {
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
  })], l = i.types.length ? i.types.map((m, f) => st({
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
  }, { report: e, path: `${t}[${f}]` })) : [st({
    id: "unloaded",
    label: "Unloaded",
    resolution: { resolverKey: "standard" },
    consumption: {
      amount: n,
      sourceId: s ? r : ""
    }
  }, { report: e, path: `${t}[0]` })], c = Xs(l, { report: e, path: t }), u = c.some((m) => m.id === i.activeTypeId) ? i.activeTypeId : ((d = c[0]) == null ? void 0 : d.id) ?? "unloaded";
  return {
    payloads: c,
    selectedPayloadId: u,
    consumptionSources: o
  };
}
function ni(a, { legacyAmmo: e = null, category: t = "", report: i = null, path: n = "system.payloads" } = {}) {
  if (yc(t)) return [];
  const s = Ta(a).map((r, o) => st(r, { report: i, path: `${n}[${o}]` })).filter(Boolean);
  return s.length > 0 ? Xs(s, { report: i, path: n }) : e ? Xs(ts(e, { report: i, path: n }).payloads, { report: i, path: n }) : gc({ report: i, path: n }).payloads;
}
function Pa(a, { legacyAmmo: e = null } = {}) {
  const t = Ta(a).map(Kt).filter(Boolean);
  return t.length > 0 ? t : e ? ts(e).consumptionSources : gc().consumptionSources;
}
function ta(a, e = [], { legacyAmmo: t = null, category: i = "" } = {}) {
  var r;
  if (yc(i)) return "";
  const n = ni(e, { legacyAmmo: t, category: i }), s = String(a ?? "").trim();
  if (n.some((o) => o.id === s)) return s;
  if (t) {
    const o = ts(t).selectedPayloadId;
    if (n.some((l) => l.id === o)) return o;
  }
  return ((r = n[0]) == null ? void 0 : r.id) ?? "unloaded";
}
function Oo({ root: a = null, path: e = "", fallback: t = {} } = {}) {
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
function bc({ source: a = null, actor: e = null } = {}) {
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
    const u = Oo({
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
    const u = ((c = (l = e == null ? void 0 : e.items) == null ? void 0 : l.get) == null ? void 0 : c.call(l, t.itemId)) ?? null, d = Oo({
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
function pm({ source: a = null, actor: e = null } = {}) {
  return bc({ source: a, actor: e });
}
function Zs({
  payloads: a = [],
  selectedPayloadId: e = "",
  consumptionSources: t = [],
  actor: i = null,
  payloadId: n = "",
  category: s = ""
} = {}) {
  const r = ni(a, { category: s }), o = Pa(t), l = ta(n || e, r, { category: s }), c = r.find((f) => f.id === l) ?? r[0] ?? null, u = (c == null ? void 0 : c.consumption) ?? Qs(), d = u.sourceId ? o.find((f) => f.id === u.sourceId) ?? null : o.find((f) => f.kind === "untracked") ?? Kt({
    id: "untracked",
    label: "Untracked",
    kind: "untracked"
  }), m = bc({ source: d, actor: i });
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
function hm({
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
  var G, X, oe, ge, de;
  const g = Zs({
    payloads: l != null && l.length ? l : void 0,
    selectedPayloadId: c || p,
    consumptionSources: u,
    actor: m,
    payloadId: d || p,
    category: h
  }), b = ((!l || l.length === 0) && f ? Zs({
    ...ts(f),
    actor: m,
    payloadId: d || p,
    category: h
  }) : null) ?? g, S = b.activePayload, T = Xl({
    traits: i,
    keywords: n
  }), C = Array.from(/* @__PURE__ */ new Set([
    ...T.traits,
    ...wa(S == null ? void 0 : S.traits)
  ])), N = _n([
    ...T.keywords,
    ..._n(S == null ? void 0 : S.keywords)
  ]), P = pn(r, "standard"), F = (G = S == null ? void 0 : S.resolution) != null && G.resolverKey ? Js(S.resolution) : P, K = hn(o), Y = Wr(), W = Id({
    weapon: {
      traits: T.traits,
      resolution: P
    },
    payload: S,
    effectiveTraits: C,
    effectiveResolution: F,
    report: Y
  }), j = Li(s), x = cm({
    traits: [],
    standardTraits: j
  }), L = {
    ...b.sourceState
  };
  return delete L.sourceItem, {
    damageType: ((X = S == null ? void 0 : S.modifies) == null ? void 0 : X.damageType) || Ut(a),
    ap: (Number(e ?? 0) || 0) + (Number(((oe = S == null ? void 0 : S.modifies) == null ? void 0 : oe.ap) ?? 0) || 0),
    attackRatingBand: sm(
      t,
      ((ge = S == null ? void 0 : S.modifies) == null ? void 0 : ge.attackRatingBand) ?? {}
    ),
    effects: x,
    traits: C,
    keywords: N,
    standardTraits: j,
    payloadLabel: b.payloadLabel,
    payload: S ? foundry.utils.deepClone(S) : null,
    payloadState: {
      payloads: b.payloads.map((M) => foundry.utils.deepClone(M)),
      activePayloadId: b.activePayloadId,
      payloadLabel: b.payloadLabel,
      sourceId: ((de = b.source) == null ? void 0 : de.id) ?? "",
      sourceLabel: b.sourceState.label ?? "",
      sourceKind: b.sourceState.kind ?? "untracked",
      isTracked: b.sourceState.isTracked,
      current: b.sourceState.current,
      max: b.sourceState.max,
      consumePerUse: b.sourceState.consumePerUse
    },
    source: b.source ? foundry.utils.deepClone(b.source) : null,
    sourceState: foundry.utils.deepClone(L),
    template: W.template ? foundry.utils.deepClone(W.template) : null,
    areaEffect: di((S == null ? void 0 : S.areaEffect) ?? {}),
    resolution: foundry.utils.deepClone(F),
    resolverKey: String((F == null ? void 0 : F.resolverKey) ?? "standard").trim() || "standard",
    fireModes: foundry.utils.deepClone(K),
    capabilityReport: {
      ...Y,
      liveCapabilities: W.liveCapabilities,
      isTemplated: W.isTemplated,
      template: W.template ? foundry.utils.deepClone(W.template) : null,
      resolverKey: String((F == null ? void 0 : F.resolverKey) ?? "standard").trim() || "standard"
    },
    ammoLabel: b.payloadLabel,
    ammoType: S ? foundry.utils.deepClone(S) : null,
    ammoState: {
      current: L.current,
      max: L.max,
      consumePerAttack: L.consumePerUse,
      activeTypeId: b.activePayloadId,
      types: b.payloads.map((M) => {
        var V;
        return {
          id: M.id,
          name: M.label,
          damageType: ((V = M.modifies) == null ? void 0 : V.damageType) ?? "",
          traits: M.traits ?? [],
          keywords: M.keywords ?? []
        };
      }),
      isTracked: L.isTracked,
      ammoLabel: b.payloadLabel
    }
  };
}
function Sc(a = {}, e = {}) {
  const t = Qt(a), i = Qt(e);
  return {
    penetrating: t.penetrating + i.penetrating,
    concussive: t.concussive + i.concussive,
    energy: t.energy + i.energy,
    thermal: t.thermal + i.thermal,
    electrical: t.electrical + i.electrical
  };
}
function Ts({ standardTraits: a = [], traits: e = [], traitState: t = {} } = {}) {
  var m, f;
  const i = ai(a), s = wa(e).map((p) => {
    const h = cc[Fa(p)];
    return h ? { id: ha("trait"), key: h, rating: h === "reinforced" ? 1 : 0 } : null;
  }).filter(Boolean), r = hc(
    [...i, ...s],
    Zn
  ), o = r.reduce((p, h) => {
    var g;
    return Sc(p, ((g = h.effect) == null ? void 0 : g.mitigationByType) ?? {});
  }, Qt({})), l = r.reduce(
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
function gm({ traits: a = [], standardTraits: e = [] } = {}) {
  return [
    ...wa(a),
    ...ai(e).map((i) => pc(i, Zn))
  ].filter(Boolean);
}
function Yr(a) {
  const e = Math.max(0, Number(a ?? 0) || 0);
  return e <= 0 ? 0 : Math.ceil(e / 4);
}
function ym({
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
  const n = Ut(t, "penetrating"), s = Qt(e), r = Yr(i), o = Number(s[n] ?? 0) || 0;
  return {
    currentArmorRating: i,
    baseMitigation: r,
    typeMitigationMod: o,
    totalMitigation: r + o,
    isDestroyed: !1
  };
}
function bm({ damageIncoming: a = 0, armorTags: e = [], effects: t = {} } = {}) {
  const i = new Set(fn(e));
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
class Ki {
  static checkSufficient(e, t, i) {
    if (t > i) {
      const n = ve(k.common.errors.insufficient, {
        resource: e,
        required: t,
        available: i
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkOutOfRange(e, t, i, n) {
    if (t < i || t > n) {
      const s = ve(k.common.errors.outOfRange, {
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
      const e = k.common.errors.onlyGM;
      throw ui.notifications.error(e), e;
    }
  }
  static checkItemType(e, t) {
    if (e.type != t) {
      const i = ve(k.common.errors.expectedType, {
        type: e.type ? k.itemType.singular[e.type] : e.type,
        expectedType: t
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkActorCanReceiveDamage(e, t, i) {
    if (!t) {
      const n = ve(k.common.errors.actorCannotReceiveDamage, {
        actor: i.name,
        damageType: dc(e) ? Wt(e) : k.actor.monitors[e] ?? k.mwd.weaponDamageType[e] ?? k.mwd.personalDamageType[e] ?? e
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkWeaponDefense(e, t) {
    var n;
    const i = e.getDefense();
    if ((((n = e.isPersonalWeapon) == null ? void 0 : n.call(e)) ?? e.type === A.itemType.personalWeapon) && !i) {
      const s = ve(k.common.errors.noDefenseOnWeapon, { actor: t.name, weapon: e.name });
      throw ui.notifications.error(s), s;
    }
  }
  static checkTargetsCount(e, t, i) {
    if (e > 0 && t.length > e) {
      const n = ve(k.common.errors.maxTargetsExceedeed, {
        weapon: this.name,
        area: k.area[i],
        count: t.length,
        max: e
      });
      throw ui.notifications.error(n), n;
    }
  }
  static checkActorDefenseAction(e, t, i) {
    if (!e) {
      const n = ve(k.common.errors.actorDoesNotHaveDefense, {
        actor: t.name,
        defense: i.labelkey,
        actorType: k.actorType[t.type]
      });
      throw ui.notifications.error(n), n;
    }
  }
}
function Gt(a, e, t, i, n, s = (r) => !0) {
  return {
    code: a,
    labelkey: k.attributeAction[a],
    label: k.attributeAction[a],
    attributeFunction1: e ?? ((r) => {
    }),
    attributeFunction2: t ?? ((r) => {
    }),
    icon: i,
    actorTypes: n,
    condition: s
  };
}
function an(a, e) {
  return {
    code: a,
    labelkey: k.defense[a],
    label: k.defense[a],
    actionCode: e
  };
}
const _e = A.actorAttributes, xe = A.actorTypes, at = Ye.actions, nn = Ye.defenses, vs = [
  Gt(at.defense, (a) => _e.reflexes, (a) => _e.intelligence, q.fontAwesome("fas fa-shield-alt"), [xe.character, xe.npc]),
  Gt(at.defense, (a) => _e.handling, (a) => _e.chassis, q.fontAwesome("fas fa-tachometer-alt"), [xe.vehicle, xe.battlemech]),
  Gt(at.resistTorture, (a) => _e.strength, (a) => _e.willpower, q.fontAwesome("fas fa-angry"), [xe.character, xe.npc]),
  Gt(at.perception, (a) => _e.logic, (a) => _e.willpower, q.fontAwesome("fas fa-eye"), [xe.character, xe.npc]),
  Gt(at.perception, (a) => _e.system, (a) => _e.handling, q.fontAwesome("fas fa-video"), [xe.vehicle, xe.battlemech]),
  Gt(at.composure, (a) => _e.charisma, (a) => _e.willpower, q.fontAwesome("fas fa-meh"), [xe.character, xe.npc]),
  Gt(at.judgeIntentions, (a) => _e.charisma, (a) => _e.charisma, q.fontAwesome("fas fa-theater-masks"), [xe.character, xe.npc]),
  Gt(at.memory, (a) => _e.logic, (a) => _e.logic, q.fontAwesome("fas fa-brain"), [xe.character, xe.npc]),
  Gt(at.catch, (a) => _e.reflexes, (a) => _e.reflexes, q.fontAwesome("fas fa-baseball-ball"), [xe.character, xe.npc]),
  Gt(at.lift, (a) => _e.strength, (a) => _e.strength, q.fontAwesome("fas fa-dumbbell"), [xe.character, xe.npc])
], sn = [
  an(nn.physicalDefense, at.defense),
  an(nn.physicalResistance, at.resistTorture),
  an(nn.socialDefense, at.composure),
  an(nn.mentalResistance, at.perception)
];
class Ne {
  static init() {
    Handlebars.registerHelper("fixedDefenseCode", (e) => Ne.fixedDefenseCode(e));
  }
  static all(e = void 0) {
    return e ? vs.filter(e) : vs;
  }
  static getActorActions(e) {
    return vs.filter((t) => t.actorTypes.includes(e.type) && t.condition(e));
  }
  static fixedDefenseCode(e) {
    return Ye.fixedDefenseCode[e] ?? e;
  }
  static getActorDefenses(e) {
    return sn.map((t) => {
      const i = Ne.getActorAction(e, t.actionCode);
      return Ne._convertToDefense(i, t);
    }).filter((t) => t == null ? void 0 : t.code);
  }
  static getDefenseAttributeAction(e) {
    var t;
    return (t = sn.find((i) => i.code == e)) == null ? void 0 : t.actionCode;
  }
  static getActorAction(e, t) {
    return Ne.getActorActions(e).find((i) => i.code == t);
  }
  static getActorDefense(e, t) {
    t = Ne.fixedDefenseCode(t);
    const i = sn.find((s) => s.code == t), n = Ne.getActorAction(e, i.actionCode);
    return Ki.checkActorDefenseAction(n, e, i), Ne._convertToDefense(n, i);
  }
  static _convertToDefense(e, t) {
    return e ? foundry.utils.mergeObject(
      t,
      e ?? {},
      { overwrite: !1, inplace: !1 }
    ) : void 0;
  }
  static getDefenses() {
    return sn;
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
class er {
  constructor() {
    this.remoteCalls = {}, game.socket.on(js, async (e) => this.onSocketMessage(e));
  }
  static async register(e, t) {
    game.system.anarchy.remoteCall._register(e, t);
  }
  async _register(e, t) {
    if (this.remoteCalls[e])
      throw `RemoteCall msg ${e} is already registered`;
    foundry.utils.mergeObject(t, {
      callback: (i) => {
        console.log(Se + "RemoteCall [", e, "] (", i, ")");
      },
      condition: (i) => !0,
      multiple: !1
      /* true if multiple users should handle the message */
    }, { overwrite: !1 }), this.remoteCalls[e] = t, console.log(Se + "RemoteCall registered", e);
  }
  static call(e, t) {
    return game.system.anarchy.remoteCall._remoteCall(e, t);
  }
  _remoteCall(e, t) {
    const i = this.remoteCalls[e];
    return !i || i.condition(game.user) || !i.multiple && Bt.isUniqueConnectedGM() ? !1 : (game.socket.emit(js, { msg: e, data: t }), !0);
  }
  async onSocketMessage(e) {
    const t = this.remoteCalls[e.msg];
    if (t) {
      const i = t.condition(game.user), n = t.multiple, s = Bt.isUniqueConnectedGM();
      i && (n || s) ? t.callback(e.data) : console.log(Se + "RemoteCall.onSocketMessage(", e, ") ignored :", i, n, s);
    } else
      console.log(Se + "RemoteCall: No callback registered for", e);
  }
}
const _o = "Users.blindMessageToGM";
class Bt {
  static init() {
    er.register(_o, {
      callback: (e) => Bt.blindMessageToGM(e),
      condition: (e) => e.isGM
    });
  }
  static blindMessageToGM(e) {
    er.call(_o, e) || ChatMessage.create({
      user: e.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      blind: !0,
      content: ve(k.chat.blindMessageToGM, {
        user: game.user.name,
        message: e.content
      })
    });
  }
  static getUsers(e = (t) => !0) {
    return (game.version ? game.users : game.users.entities).filter(e);
  }
  static firstConnectedGM() {
    return Bt.getUsers((e) => e.isGM && e.active).sort(se.ascending((e) => e.id)).at(0) ?? {};
  }
  /**
   * @returns true pour un seul utilisateur: le premier GM connecté par ordre d'id
   */
  static isUniqueConnectedGM(e = game.user) {
    return e.id == Bt.firstConnectedGM().id;
  }
  static firstResponsible(e) {
    if (!(e != null && e.testUserPermission))
      return;
    const t = Bt.getUsers(
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
const Ji = k.actor.monitors, ti = k.actor.counters, Ac = {
  armor: {
    path: "system.monitors.armor.value",
    monitor: (a) => a.system.monitors.armor,
    iconChecked: q.fontAwesome("fas fa-shield-slash"),
    iconUnchecked: q.fontAwesome("fas fa-shield-alt"),
    iconHit: q.fontAwesome("fas fa-bahai"),
    resource: Ji.armor
  },
  fatigue: {
    path: "system.monitors.fatigue.value",
    monitor: (a) => a.system.monitors.fatigue,
    iconChecked: q.fontAwesome("fas fa-grimace"),
    iconUnchecked: q.fontAwesome("far fa-smile"),
    iconHit: q.fontAwesome("fas fa-bahai"),
    resource: Ji.fatigue,
    overflow: (a) => A.monitors.physical,
    useArmor: !0
  },
  physical: {
    path: "system.monitors.physical.value",
    monitor: (a) => a.system.monitors.physical,
    iconChecked: q.fontAwesome("fas fa-heartbeat"),
    iconUnchecked: q.fontAwesome("far fa-heart"),
    iconHit: q.fontAwesome("fas fa-bahai"),
    resource: Ji.physical,
    useArmor: !0
  },
  structure: {
    path: "system.monitors.structure.value",
    monitor: (a) => a.system.monitors.structure,
    iconChecked: q.fontAwesome("fas fa-car-crash"),
    iconUnchecked: q.fontAwesome("fas fa-car-alt"),
    iconHit: q.fontAwesome("fas fa-bahai"),
    resource: Ji.structure
  },
  heat: {
    path: "system.monitors.heat.value",
    monitor: (a) => a.system.monitors.heat,
    iconChecked: q.fontAwesome("fas fa-fire"),
    iconUnchecked: q.fontAwesome("far fa-sun"),
    iconHit: q.fontAwesome("fas fa-temperature-high"),
    resource: Ji.heat
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
    resource: Ji.structure
  },
  anarchy: {
    path: "system.counters.anarchy.value",
    monitor: (a) => ({
      value: a.system.counters.anarchy.value,
      max: 6
    }),
    iconChecked: q.iconPath(`${Ca}/anarchy-point.webp`, "checkbar-img"),
    iconUnchecked: q.iconPath(`${Ca}/anarchy-point-off.webp`, "checkbar-img"),
    resource: ti.anarchy
  },
  plot: {
    path: "system.counters.anarchy.value",
    monitor: (a) => {
      const e = a.system.counters.anarchy.value;
      return { value: e, max: e + 1 };
    },
    iconChecked: q.iconPath(`${Ca}/danger-point.webp`, "checkbar-img"),
    iconUnchecked: q.iconPath(`${Ca}/danger-point-off.webp`, "checkbar-img"),
    resource: ti.anarchy
  },
  sceneAnarchy: {
    path: "system.counters.edgePools.chaos.value",
    monitor: (a) => {
      const e = a.getEdgePoolValue(A.counters.edgePools.chaos), t = a.getAttributeValue(A.actorAttributes.edge);
      return { value: e, max: t };
    },
    iconChecked: q.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    iconUnchecked: q.iconPath("systems/mwd/icons/default/explosion.svg", "checkbar-img"),
    resource: ti.edgePools.chaos
  },
  grit: {
    path: "system.counters.edgePools.grit.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.grit), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: q.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    iconUnchecked: q.iconPath("systems/mwd/icons/default/shield.svg", "checkbar-img"),
    resource: ti.edgePools.grit
  },
  insight: {
    path: "system.counters.edgePools.insight.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.insight), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: q.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    iconUnchecked: q.iconPath("systems/mwd/icons/default/eye.svg", "checkbar-img"),
    resource: ti.edgePools.insight
  },
  legend: {
    path: "system.counters.edgePools.legend.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.legend), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: q.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    iconUnchecked: q.iconPath("systems/mwd/icons/default/tower-flag.svg", "checkbar-img"),
    resource: ti.edgePools.legend
  },
  credibility: {
    path: "system.counters.edgePools.credibility.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.credibility), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: q.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    iconUnchecked: q.iconPath("systems/mwd/icons/misc/hand.svg", "checkbar-img"),
    resource: ti.edgePools.credibility
  },
  rumor: {
    path: "system.counters.edgePools.rumor.value",
    monitor: (a) => ({ value: a.getEdgePoolValue(A.counters.edgePools.rumor), max: a.getAttributeValue(A.actorAttributes.edge) }),
    iconChecked: q.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    iconUnchecked: q.iconPath("systems/mwd/icons/default/mystery-man.svg", "checkbar-img"),
    resource: ti.edgePools.rumor
  }
}, Ot = foundry.utils.mergeObject(Ac, {});
class z {
  static init() {
    Handlebars.registerHelper("iconCheckbar", z.iconCheckbar), Handlebars.registerHelper("iconCheckbarHit", z.iconHit);
  }
  static hackCheckbars(e) {
    if (e) {
      const t = foundry.utils.mergeObject(Ac, {});
      foundry.utils.mergeObject(t, e, { recursive: !0 }), foundry.utils.mergeObject(Ot, t, { overwrite: !0 });
    }
  }
  static iconCheckbar(e, t) {
    return t ? z.iconChecked(e) : z.iconUnchecked(e);
  }
  static iconChecked(e) {
    var t;
    return (t = Ot[e]) == null ? void 0 : t.iconChecked;
  }
  static iconUnchecked(e) {
    var t;
    return (t = Ot[e]) == null ? void 0 : t.iconUnchecked;
  }
  static iconHit(e) {
    var t, i;
    return ((t = Ot[e]) == null ? void 0 : t.iconHit) ?? ((i = Ot[e]) == null ? void 0 : i.iconChecked);
  }
  static useArmor(e) {
    var t;
    return (t = Ot[e]) == null ? void 0 : t.useArmor;
  }
  static max(e, t) {
    var n;
    const i = (n = Ot[t]) == null ? void 0 : n.monitor(e);
    return ((i == null ? void 0 : i.max) ?? 0) + ((i == null ? void 0 : i.maxBonus) ?? 0);
  }
  static value(e, t) {
    var n;
    const i = (n = Ot[t]) == null ? void 0 : n.monitor(e);
    return (i == null ? void 0 : i.value) ?? 0;
  }
  static resistance(e, t, i = void 0) {
    return z.resistanceDetail(e, t, i).value;
  }
  static resistanceDetail(e, t, i = void 0) {
    var l, c;
    const n = (l = Ot[t]) == null ? void 0 : l.monitor(e), s = z._resolveResistance(n == null ? void 0 : n.resistance, i), r = z._resolveResistance(n == null ? void 0 : n.resistanceBonus, i), o = i === void 0 ? 0 : Number(((c = n == null ? void 0 : n.resistanceBonusByType) == null ? void 0 : c[i]) ?? 0);
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
    await z.setCounter(e, t, z.newValue(i, n), s, r);
  }
  static async addCounter(e, t, i, n = void 0) {
    if (i != 0) {
      const s = z.getCounterValue(e, t, n) ?? 0;
      await z.setCounter(e, t, s + i, n);
    }
  }
  static async setCounter(e, t, i, n = void 0, s = void 0) {
    switch (t) {
      case A.monitors.anarchy:
        return await z.setAnarchy(e, i);
      case A.monitors.sceneAnarchy:
        return await z.setSceneAnarchy(e, i);
    }
    return await z.setCheckbar(e, t, i);
  }
  static getCounterValue(e, t, i) {
    switch (t) {
      case A.monitors.anarchy:
        return z.getAnarchy(e, t);
    }
    return z.value(e, t);
  }
  static async setCheckbar(e, t, i) {
    if (i == z.getCounterValue(e, t))
      return;
    const n = Ot[t];
    if (n.path) {
      const s = z.max(e, t);
      if (s <= 0)
        return;
      await z._manageOverflow(n, e, t, i, s), i = Math.min(i, s), Ki.checkOutOfRange(n.resource, i, 0, s), await e.setCheckbarValue(n.path, i);
    }
  }
  static async _manageOverflow(e, t, i, n, s) {
    if (n > s) {
      const r = e.overflow ? e.overflow(t) : void 0, o = e.recomputeOverflow ? e.recomputeOverflow(n - s) : n - s;
      r && o > 0 && (z._notifyOverflow(t, i, o, r), await z.addCounter(t, r, o));
    }
  }
  static _notifyOverflow(e, t, i, n) {
    const s = ve(k.actor.monitors.overflow, {
      actor: e.name,
      monitor: k.actor.monitors[t],
      overflow: i,
      overflowMonitor: k.actor.monitors[n]
    });
    ui.notifications.warn(s);
  }
  static async _manageFatigueOverflow(e, t, i) {
    await z.addCounter(e, A.monitors.physical, t - i);
  }
  static async setAnarchy(e, t) {
    if (e.hasOwnAnarchy()) {
      if (e.hasGMAnarchy()) {
        await game.system.anarchy.gmAnarchy.setAnarchy(t), e.render();
        return;
      }
      await z._setAnarchyMonitor(e, A.monitors.anarchy, t);
    }
  }
  static async setSceneAnarchy(e, t) {
    await z._setAnarchyMonitor(e, A.monitors.sceneAnarchy, t);
  }
  static async _setAnarchyMonitor(e, t, i) {
    const n = z.value(e, t);
    await z.setCheckbar(e, t, i), game.user.isGM || z.notifyAnarchyChange(e, t, n, i);
  }
  static getAnarchy(e, t) {
    return !game.user.isGM && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) || t == ti.anarchy && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) ? 0 : z.value(e, t);
  }
  static notifyAnarchyChange(e, t, i, n) {
    Bt.blindMessageToGM({
      from: game.user.id,
      content: ve(
        k.gmManager.playerChangedAnarchy,
        {
          user: game.user.name,
          actor: e.name,
          monitor: k.actor.counters[t],
          from: i,
          to: n
        }
      )
    });
  }
}
const { loadTemplates: Sm, renderTemplate: Am } = foundry.applications.handlebars, xo = {
  highlighted: ["far fa-times-circle", "fas fa-dice-one", "fas fa-dice-two", "fas fa-dice-three", "fas fa-dice-four", "fas fa-dice-five", "fas fa-dice-six"],
  dimmed: ["far fa-times-circle", "far fa-dice-one", "far fa-dice-two", "far fa-dice-three", "far fa-dice-four", "far fa-dice-five", "far fa-dice-six"]
};
class si {
  static init() {
    Hooks.once("ready", async () => await this.onReady()), Handlebars.registerHelper("dice-cursor-array", (e, t) => si.array(e ?? 0, t ?? 5)), Handlebars.registerHelper("dice-cursor-fas", (e, t) => si.fasClass(e, t)), Handlebars.registerHelper("dice-cursor-active", (e, t) => si.activeClass(e, t)), Handlebars.registerHelper("dice-cursor-color", (e, t) => si.colorClass(e, t));
  }
  static async onReady() {
    await Sm([
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
    return si.isActive(e, t) ? "active" : "inactive";
  }
  static fasClass(e, t) {
    const i = si.isActive(e, t) ? xo.highlighted : xo.dimmed;
    return si.$getFas(i, Math.abs(e));
  }
  static colorClass(e, t) {
    return e == 0 || !t ? e < 0 ? "fixed-dice-malus" : "fixed-dice-bonus" : e < 0 ? "variable-dice-malus" : "variable-dice-bonus";
  }
  static $getFas(e, t) {
    return e[t > 6 ? t % 6 : t];
  }
  static async diceCursor({ value: e, min: t, max: i, editable: n }) {
    return await Am("systems/mwd/templates/roll/parts/dice-cursor.hbs", {
      value: e,
      min: t,
      max: i,
      editable: n
    });
  }
}
const Be = {
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
}, Lo = "anarchy-", wc = `${w}.${Be.ANARCHY_HACK}`, tr = {
  id: w,
  name: "Standard Shadowrun Anarchy",
  hack: {
    checkbars: () => Ot
  }
};
globalThis.ANARCHY_HOOKS = Be;
globalThis.SETTING_KEY_ANARCHY_HACK = wc;
globalThis.SHADOWRUN_ANARCHY_NO_HACK = tr;
class ji {
  constructor() {
    this.hooks = [], this.hacks = {}, this.hackNames = {}, this.hookMethods = {}, this._register(Be.ANARCHY_HACK), Hooks.on(Be.ANARCHY_HACK, (e) => e(tr)), Hooks.on("updateSetting", async (e, t, i, n) => this.onUpdateSetting(e, t, i, n)), Hooks.once("ready", () => this.onReady()), Hooks.on("getSceneControlButtons", (e) => {
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
    Hooks.callAll(Be.ANARCHY_HACK, (e) => {
      this.hacks[e.id] = e, this.hackNames[e.id] = e.name;
    }), game.settings.register(w, Be.ANARCHY_HACK, {
      scope: "world",
      name: k.settings.anarchyHack.name,
      hint: k.settings.anarchyHack.hint,
      config: !0,
      default: tr.id,
      choices: this.hackNames,
      type: String
    }), this.applySelectedAnarchyHack();
  }
  async onUpdateSetting(e, t, i, n) {
    e.key == wc && this.applySelectedAnarchyHack();
  }
  applySelectedAnarchyHack() {
    const e = this.getSelectedHack();
    e && z.hackCheckbars(e.hack.checkbars());
  }
  selectHookMethod(e, t) {
    Hooks.callAll(t, (i, n) => {
      i == e && (this.hookMethods[t] = n);
    });
  }
  getSelectedHack() {
    return this.hacks[game.settings.get(w, Be.ANARCHY_HACK)];
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
    ji.instance()._register(e);
  }
  _register(e) {
    if (console.log(Se + "HooksManager.register", e), !e.startsWith(Lo))
      throw `For safety Anarchy Hooks names must be prefixed by '${Lo}'`;
    this.hooks.push(e);
  }
}
const $o = [
  A.itemType.assetModule,
  A.itemType.mechWeapon,
  A.itemType.personalWeapon,
  "weapon"
];
class ce {
  constructor() {
    this.modifiers = {
      groups: be.mapObjetToKeyValue(k.modifier.group, "key", "label"),
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
          label: k.modifier.group[e],
          effects: be.hbsAttributes.map((t) => ({ key: t.value, label: t.labelkey })),
          categories: []
        };
    }
    return {
      label: k.modifier.group[e],
      effects: be.mapObjetToKeyValue(k.modifier[e].effect, "key", "label"),
      categories: be.mapObjetToKeyValue(k.modifier[e].category, "key", "label")
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
                return be.getDamageTypes().map((s) => ({ key: s.value, label: s.labelkey }));
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
        return be.getAttributes().map((i) => ({ key: i.value, label: i.labelkey }));
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
    const n = ce.buildRollModifiersFilter(t, i), s = (c) => c.group == "roll" && c.effect == i && n(c), r = ce._activeItems(e).map((c) => ce.itemModifiers(c, s)).reduce((c, u) => c.concat(u), []).sort(se.descending((c) => c.modifier.value)), o = ce.$sumAssetModuleModifiers(r.filter((c) => $o.includes(c.item.type)).map((c) => c.modifier.value)), l = se.sumValues(r.filter((c) => !$o.includes(c.item.type)).map((c) => c.modifier.value));
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
const { loadTemplates: ks, renderTemplate: NS } = foundry.applications.handlebars, ye = {
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
}, Bo = 4, wm = [
  // attribute1
  {
    code: "attribute1",
    options: {
      order: 1,
      category: ye.pool,
      hbsTemplateRoll: `${Q}/roll/parts/select-attribute.hbs`
    },
    condition: (a) => Object.values(Ye.rollType).includes(a.mode),
    isUsed: (a) => !0,
    factory: (a) => {
      var t;
      const e = a.attribute1 ?? ((t = a.skill) == null ? void 0 : t.system.attribute);
      return {
        labelkey: e ? k.attributes[e] : k.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: a.skill },
        selected: e,
        choices: be.getAttributes((i) => a.attributes.includes(i))
      };
    }
  },
  // attribute2
  {
    code: "attribute2",
    options: {
      order: 1,
      category: ye.pool,
      hbsTemplateRoll: `${Q}/roll/parts/select-attribute.hbs`,
      hbsTemplateChat: `${Q}/chat/parts/pool-attribute2.hbs`
    },
    condition: (a) => [Ye.rollType.attribute, Ye.rollType.attributeAction, Ye.rollType.defense].includes(a.mode),
    isUsed: (a) => a.used,
    onChecked: (a, e) => a.used = !!e,
    factory: (a) => {
      const e = a.attribute2;
      return {
        labelkey: e ? k.attributes[e] : k.attributes.noAttributes,
        value: a.actor.getAttributeValue(e, a.activeItem),
        flags: { editable: Ye.rollType.attribute == a.mode },
        selected: e,
        choices: be.getAttributes((t) => a.attributes.includes(t))
      };
    }
  },
  // skill
  {
    code: "skill",
    options: {
      flags: {},
      order: 3,
      category: ye.pool,
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
      category: ye.pool,
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
      category: ye.pool,
      value: 0,
      labelkey: k.common.roll.modifiers.social.credibility,
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
      labelkey: k.common.roll.modifiers.poolModifiers,
      order: 5,
      category: ye.pool,
      hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 4
    },
    factory: (a) => _i.computeRollModifiers(ye.pool, a)
  },
  // wounds
  {
    code: "wounds",
    options: {
      flags: { optional: !0 },
      order: 10,
      category: ye.pool,
      labelkey: k.common.roll.modifiers.wounds,
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
      category: ye.pool,
      value: 0,
      labelkey: k.common.roll.modifiers.other,
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
      category: ye.glitch,
      value: 0,
      labelkey: k.common.roll.modifiers.glitch,
      hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${Q}/chat/parts/glitch.hbs`,
      min: 0,
      max: 5
    },
    isUsed: (a) => a.value > 0,
    factory: (a) => {
      const e = a.actor.getWounds(), t = _i.computeRollModifiers(ye.glitch, a);
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
      category: ye.glitch,
      value: 0,
      labelkey: k.common.roll.modifiers.social.rumor,
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
      category: ye.reroll,
      labelkey: k.common.roll.modifiers.reroll,
      hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: Bo
    },
    factory: (a) => {
      const e = _i.computeRollModifiers(ye.reroll, a), t = _i.computeRollModifiers(ye.rerollMax, a);
      return foundry.utils.mergeObject(e, {
        max: Bo + Math.max(0, t.value ?? 0)
      });
    }
  },
  // reduction from opponent
  {
    code: "reduced",
    options: {
      order: 29,
      category: ye.pool,
      labelkey: k.common.roll.modifiers.reduced,
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
      category: ye.rerollForced,
      labelkey: k.common.roll.modifiers.rerollForced,
      hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 0
    },
    factory: (a) => {
      var t;
      const e = _i.computeRollModifiers(ye.successReroll, a);
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
      category: ye.pool,
      value: 0,
      min: 0,
      max: 3,
      labelkey: k.common.roll.modifiers.anarchyDisposition,
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
      category: ye.risk,
      value: 0,
      labelkey: k.common.roll.modifiers.anarchyRisk,
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
      category: ye.edge,
      labelkey: k.common.roll.modifiers.edge,
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
          label: k.actor.counters.edgePools[s] ?? s,
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
      category: ye.opponentPool,
      labelkey: k.common.roll.modifiers.opponentPool,
      hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => _i.computeRollModifiers(ye.opponentPool, a),
    condition: (a) => !a.attributeAction
  },
  // force opponent rerolls
  {
    code: "opponentReroll",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: ye.opponentReroll,
      value: 0,
      labelkey: k.common.roll.modifiers.opponentReroll,
      hbsTemplateRoll: `${Q}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (a) => _i.computeRollModifiers(ye.opponentReroll, a),
    condition: (a) => !a.attributeAction
  }
];
class _i {
  constructor() {
    this.registeredParameters = {}, ji.register(Be.REGISTER_ROLL_PARAMETERS), ji.register(Be.MODIFY_ROLL_PARAMETER), Hooks.on(Be.MODIFY_ROLL_PARAMETER, (e) => this._validate(e)), Hooks.once(Be.REGISTER_ROLL_PARAMETERS, (e) => wm.forEach(
      (t) => e(t)
    )), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(Be.REGISTER_ROLL_PARAMETERS, async (t) => {
      Hooks.callAll(Be.MODIFY_ROLL_PARAMETER, t), t.ignore || await this._register(t);
    });
    const e = se.distinct([].concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateRoll)).concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateChat)).filter((t) => typeof t == "string" && t.length > 0));
    await ks(se.distinct(e)), await ks([`${Q}/roll/parts/parameter-label.hbs`]);
  }
  _validate(e) {
    e.code || (console.error(`${Se} RollParameter does not have a code`, e), e.ignore = !0);
  }
  async _register(e) {
    if (this.registeredParameters[e.code]) {
      console.error(`${Se} RollParameter ${e.code} is already registered`, e);
      return;
    }
    e.onChecked || (e.onChecked = (t, i) => t.used = i), e.onValue = (t, i) => t.value = i, this.registeredParameters[e.code] = e;
  }
  async _optionalLoadTemplate(e) {
    e && await ks([e]);
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
const { ApplicationV2: Tm, HandlebarsApplicationMixin: vm } = foundry.applications.api, { loadTemplates: km, renderTemplate: Em } = foundry.applications.handlebars;
var Vn, Tc;
const ze = class ze extends vm(Tm) {
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
    await km([
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
    const i = foundry.utils.mergeObject(ze.prepareActorRoll(e), {
      mode: Ye.rollType.attribute,
      attribute1: t
    });
    await ze.create(i);
  }
  static async rollAttributeAction(e, t) {
    const i = foundry.utils.mergeObject(ze.prepareActorRoll(e), {
      mode: Ye.rollType.attributeAction,
      attributeAction: t.code,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e)
    });
    await ze.create(i);
  }
  static async rollSkill(e, t, i) {
    const n = foundry.utils.mergeObject(ze.prepareActorRoll(e), {
      mode: Ye.rollType.skill,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? A.actorAttributes.reflexes,
      specialization: i
    });
    await ze.create(n);
  }
  static async rollWeapon(e, t, i, n) {
    const s = foundry.utils.mergeObject(ze.prepareActorRoll(e), {
      mode: Ye.rollType.weapon,
      weapon: i,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? e.getPhysicalAgility(),
      specialization: void 0,
      targeting: n
    });
    await ze.create(s);
  }
  static async rollDefense(e, t, i) {
    const n = foundry.utils.mergeObject(ze.prepareActorRoll(e), {
      mode: Ye.rollType.defense,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e),
      defenseAction: t.code,
      attackRoll: i.attackRoll,
      tokenId: i.defenderTokenId,
      choiceChatMessageId: i.choiceChatMessageId
    });
    await ze.create(n);
  }
  static async itemAttributeRoll(e, t) {
    const i = foundry.utils.mergeObject(ze.prepareActorRoll(e.actor), {
      mode: Ye.rollType.attribute,
      item: e,
      attribute1: t,
      attributes: e.actor.getUsableAttributes(e)
    });
    await ze.create(i);
  }
  static async create(e) {
    var r;
    const t = v(r = ze, Vn, Tc).call(r, e), i = await Em(`${Q}/roll/roll-dialog-title.hbs`, t), n = {
      id: `roll-dialog-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...ze.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new ze({ roll: t }, n).render({ force: !0 });
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
      n.onChecked(n, i.currentTarget.checked), n.category == ye.pool && await this._updateParameterValue(n, n.value), n.code == "edge" && this.html.find(`.parameter[data-parameter-code='${n.code}'] .edge-pool-select`).prop("disabled", !n.used);
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
    return await si.diceCursor({
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
Vn = new WeakSet(), Tc = function(e) {
  const t = game.system.anarchy.rollParameters.build(e).sort(se.ascending((i) => i.order ?? 200));
  return foundry.utils.mergeObject(e, {
    ENUMS: be.getEnums((i) => e.attributes.includes(i)),
    ANARCHY: k,
    parameters: t
  });
}, Te(ze, Vn), _(ze, "PARTS", {
  body: {
    template: `${Q}/roll/roll-dialog.hbs`
  }
});
let At = ze;
const Qr = 2, ir = "skillSpecializationCatalog", Mm = [
  { key: "running", label: "Running" },
  { key: "jumping", label: "Jumping" },
  { key: "swimming", label: "Swimming" },
  { key: "climbing", label: "Climbing" },
  { key: "acrobatics", label: "Acrobatics" }
], vc = /* @__PURE__ */ new Set(), Zt = [
  // Strength
  { code: "athletics", label: "Athletics", attribute: "strength", icon: `${le}/athletics.svg`, domains: ["physical"], specializations: Mm },
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
].map(Cm);
for (const a of Zt)
  vc.add(a.code);
function Cm(a) {
  return {
    ...a,
    label: a.label ?? a.code,
    icon: a.icon ?? `${Va}/icons/skills/skills.svg`,
    specializations: Xr(a.specializations)
  };
}
function Jr(a) {
  return String(a ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function Xr(a = []) {
  const e = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((t) => {
    const i = Jr((t == null ? void 0 : t.key) ?? (t == null ? void 0 : t.label) ?? t);
    return !i || e.has(i) ? null : (e.add(i), {
      key: i,
      label: String((t == null ? void 0 : t.label) ?? (t == null ? void 0 : t.key) ?? t ?? i).trim() || i
    });
  }).filter(Boolean);
}
function Pm(a = []) {
  const e = new Error(a[0] ?? "Invalid skill specialization data.");
  return e.validationErrors = a, e;
}
function Nm() {
  const a = {};
  for (const e of Zt) {
    const t = (Array.isArray(e.specializations) ? e.specializations : []).map((i) => String((i == null ? void 0 : i.label) ?? "").trim()).filter(Boolean);
    t.length && (a[e.code] = t);
  }
  return a;
}
const Rm = Object.freeze(Nm());
function Im(a, e = [], { strict: t = !1, errors: i = [] } = {}) {
  var s, r;
  if (!Array.isArray(e)) {
    if (t) {
      const o = ((s = ar(a)) == null ? void 0 : s.label) ?? a;
      i.push(`${o}: expected an array of specialization labels.`);
    }
    return [];
  }
  const n = [];
  for (const o of e) {
    const l = String(o ?? "").trim();
    if (!l) {
      if (t) {
        const c = ((r = ar(a)) == null ? void 0 : r.label) ?? a;
        i.push(`${c}: specialization labels cannot be blank.`);
      }
      continue;
    }
    n.push(l);
  }
  return Xr(n).map((o) => o.label);
}
function ar(a) {
  return Zt.find((e) => e.code === a);
}
function kc(a, { strict: e = !1 } = {}) {
  const t = a && typeof a == "object" && !Array.isArray(a) ? a : {}, i = [], n = {};
  for (const [s, r] of Object.entries(t)) {
    if (!vc.has(s)) {
      e && i.push(`Unknown skill code "${s}".`);
      continue;
    }
    const o = Im(s, r, { strict: e, errors: i });
    o.length && (n[s] = o);
  }
  if (e && i.length) throw Pm(i);
  return Object.fromEntries(
    Zt.map((s) => [s.code, n[s.code]]).filter(([, s]) => Array.isArray(s) && s.length)
  );
}
function Dm() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${w}.${ir}`))
      return game.settings.get(w, ir);
  } catch {
  }
  return Cc();
}
function Ec() {
  const a = kc(Dm(), { strict: !1 });
  return Object.fromEntries(
    Object.entries(a).map(([e, t]) => [
      e,
      Xr(t)
    ])
  );
}
function Mc(a = [], { allowedKeys: e = null } = {}) {
  const t = /* @__PURE__ */ new Set();
  return (Array.isArray(a) ? a : []).map((i) => Jr(i)).filter((i) => !i || t.has(i) || e && !e.has(i) ? !1 : (t.add(i), !0));
}
function Et(a) {
  const e = ar(a);
  if (e)
    return {
      ...e,
      specializations: Gi(e.code)
    };
}
function Bn() {
  const a = Ec();
  return [...Zt].map((e) => ({
    ...e,
    specializations: [...a[e.code] ?? []]
  })).sort((e, t) => e.label.localeCompare(t.label));
}
function Gi(a) {
  return [...Ec()[a] ?? []];
}
function Zr(a, e) {
  const t = Jr(e);
  if (t)
    return Gi(a).find((i) => i.key === t);
}
function Om(a, e) {
  var t;
  return ((t = Zr(a, e)) == null ? void 0 : t.label) ?? "";
}
function Cc() {
  return foundry.utils.deepClone(Rm);
}
function is(a, { strict: e = !1 } = {}) {
  return kc(a, { strict: e });
}
function zn(a = []) {
  return Mc(a);
}
function _m(a, e = []) {
  const t = new Set(Gi(a).map((n) => n.key)), i = new Set(Mc(e, { allowedKeys: t }));
  return Gi(a).filter((n) => i.has(n.key)).map((n) => n.key);
}
function nr(a, e) {
  var t, i;
  return zn(
    ((i = (t = a == null ? void 0 : a.skills) == null ? void 0 : t[e]) == null ? void 0 : i.specializations) ?? []
  );
}
function as(a, e) {
  return _m(
    e,
    nr(a, e)
  );
}
function Pc(a, e) {
  const t = new Set(as(a, e));
  return Gi(e).filter((i) => t.has(i.key));
}
function xm(a) {
  const e = Math.ceil(a.length / 2);
  return { left: a.slice(0, e), right: a.slice(e) };
}
function Lm(a) {
  var e, t;
  a.skills ?? (a.skills = {});
  for (const i of Zt) {
    const n = (e = a.skills)[t = i.code] ?? (e[t] = {});
    n.rating == null && (n.rating = 0), n.bonus == null && (n.bonus = 0), n.specializations = zn(n.specializations);
  }
}
function Nc(a, { bonusBySkill: e = null } = {}) {
  const t = Bn(), { left: i, right: n } = xm(t), s = (r) => {
    var y, b, S, T, C, N;
    const o = r.code, l = r.attribute, c = Number(((b = (y = a == null ? void 0 : a.skills) == null ? void 0 : y[o]) == null ? void 0 : b.rating) ?? 0), u = Number(((T = (S = a == null ? void 0 : a.attributes) == null ? void 0 : S[l]) == null ? void 0 : T.value) ?? 0), d = Number(((N = (C = a == null ? void 0 : a.skills) == null ? void 0 : C[o]) == null ? void 0 : N.bonus) ?? 0), m = Number((e == null ? void 0 : e[o]) ?? 0), f = d + m, p = Pc(a, o), h = Gi(o).filter((P) => !p.some((F) => F.key === P.key)), g = u + c + f;
    return {
      code: o,
      label: r.label,
      icon: r.icon,
      attribute: l,
      attributeLabel: be != null && be.localizeAttribute ? be.localizeAttribute(l) : l,
      rating: c,
      base: u,
      bonus: f,
      total: g,
      rollPayload: JSON.stringify({ intent: "skill", key: o }),
      canAddSpecialization: h.length > 0,
      specializations: p.map((P) => ({
        ...P,
        bonus: Qr,
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
const $m = /* @__PURE__ */ new Set(["overloaded"]);
function zo(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function Bm(a, e) {
  var i, n, s;
  if (!a) return null;
  const t = zo(e) ?? zo(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((s = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : s.call(i, ((n = t == null ? void 0 : t.baseActor) == null ? void 0 : n.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function Rc(a) {
  const e = String(a ?? "").trim();
  if (!e) return "Status";
  const n = (e.includes(".") ? e.split(".").at(-1) : e).replace(/^status/i, "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return n ? n.replace(/\b\w/g, (s) => s.toUpperCase()) : e;
}
function zm(a) {
  const e = String((a == null ? void 0 : a.name) ?? (a == null ? void 0 : a.label) ?? (a == null ? void 0 : a.id) ?? "Status").trim();
  return e ? Rc(e) : "Status";
}
function Fm(a) {
  const e = typeof (a == null ? void 0 : a.img) == "string" ? a.img.trim() : "";
  if (e) return e;
  const t = a ? Object.getOwnPropertyDescriptor(a, "icon") : null;
  return "value" in (t ?? {}) ? String(t.value ?? "").trim() : "";
}
function Fn(a, e) {
  var t, i, n, s, r, o;
  return e === "overloaded" ? !!((i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.burn) != null && i.overloaded) || !!((s = (n = a == null ? void 0 : a.statuses) == null ? void 0 : n.has) != null && s.call(n, e)) : ((o = (r = a == null ? void 0 : a.statuses) == null ? void 0 : r.has) == null ? void 0 : o.call(r, e)) ?? !1;
}
function eo(a) {
  const e = /* @__PURE__ */ new Set();
  return (CONFIG.statusEffects ?? []).filter((t) => {
    const i = String((t == null ? void 0 : t.id) ?? "").trim();
    return !i || e.has(i) ? !1 : (e.add(i), !0);
  }).map((t) => {
    const i = String(t.id).trim();
    return {
      id: i,
      label: zm(t),
      icon: Fm(t),
      active: Fn(a, i),
      managed: $m.has(i)
    };
  }).sort((t, i) => t.active !== i.active ? t.active ? -1 : 1 : t.label.localeCompare(i.label));
}
function Hm(a) {
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
async function Um({ actor: a, effects: e, selectedStatusIds: t }) {
  const i = new Set(t);
  for (const n of e) {
    const s = i.has(n.id);
    await Ic({ actor: a, statusId: n.id, active: s });
  }
}
async function Ic({ actor: a, statusId: e, active: t }) {
  if (!a || !e) return !1;
  const i = Fn(a, e);
  return !!t === i ? !1 : e === "overloaded" ? (await a.update({ "system.burn.overloaded": !!t }), !0) : (await a.toggleStatusEffect(e, { active: !!t, overlay: !1 }), !0);
}
async function Wm({ actor: a, token: e } = {}) {
  var n;
  if (!a || !e) return !1;
  const t = Bm(a, e), i = eo(t);
  return i.length ? foundry.applications.api.DialogV2.wait({
    window: {
      title: `Token Statuses: ${e.name ?? a.name ?? "Token"}`
    },
    position: {
      width: 420
    },
    content: Hm(i),
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
            return await Um({ actor: t, effects: i, selectedStatusIds: c }), !0;
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
const jm = Object.freeze({
  STR: Si.strength,
  REF: Si.reflexes,
  WIL: Si.willpower,
  INT: Si.intelligence,
  CHA: Si.charisma
}), Gm = Object.freeze({
  STR: "Strength",
  REF: "Reflexes",
  WIL: "Willpower",
  INT: "Intelligence",
  CHA: "Charisma"
}), qm = Object.freeze({
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
function to(a) {
  const e = String(a ?? "").trim();
  return e ? qm[e] ?? null : null;
}
function Km(a) {
  const e = to(a);
  return e ? {
    intent: "common",
    id: e.id
  } : null;
}
function Vm(a) {
  return jm[String(a ?? "").trim().toUpperCase()] ?? null;
}
function Ym(a) {
  return Gm[String(a ?? "").trim().toUpperCase()] ?? String(a ?? "").trim().toUpperCase();
}
function Qm(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => String(e ?? "").trim().toUpperCase()).filter(Boolean).join(" + ");
}
const io = Object.freeze([
  { value: "positive", label: "Positive" },
  { value: "negative", label: "Negative" },
  { value: "narrative", label: "Narrative" }
]), ao = Object.freeze([
  { value: "minor", label: "Minor" },
  { value: "major", label: "Major" }
]), Dc = Object.freeze([
  { value: "passive", label: "Passive" },
  { value: "triggered", label: "Triggered" }
]), Oc = Object.freeze([
  { value: "rollMod", label: "Roll Modifier" },
  { value: "burnAdjust", label: "Burn Adjust" },
  { value: "actionCostMod", label: "Action Cost Mod" },
  { value: "initiativeMod", label: "Initiative Mod" },
  { value: "damageMod", label: "Damage Intake Mod" },
  { value: "edgeEvent", label: "Edge Event" }
]), _c = Object.freeze([
  { value: "onBuildRoll", label: "Build Roll" },
  { value: "onBeforeBurnApplied", label: "Before Burn Applied" },
  { value: "onBeforeActionCostFinalized", label: "Before Action Cost Finalized" },
  { value: "onInitiativeResolved", label: "Initiative Resolved" },
  { value: "onDamageResolved", label: "Damage Resolved" },
  { value: "onEndOfActivation", label: "End of Activation" },
  { value: "onEdgeSpend", label: "Edge Spend" },
  { value: "onEdgeGain", label: "Edge Gain" }
]), no = Object.freeze([
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
]), xc = Object.freeze([
  { value: "adjustAmount", label: "Adjust Amount" },
  { value: "grantPool", label: "Grant Pool" }
]), Jm = new Set(io.map((a) => a.value)), Xm = new Set(ao.map((a) => a.value)), Zm = new Set(Dc.map((a) => a.value)), ef = new Set(Oc.map((a) => a.value)), Lc = new Set(_c.map((a) => a.value)), tf = new Set(no.map((a) => a.value)), af = new Set(xc.map((a) => a.value));
function re(a, e = "") {
  return String(a ?? "").trim() || e;
}
function me(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Hn(a) {
  return foundry.utils.deepClone(a);
}
function $c(a = []) {
  return (Array.isArray(a) ? a : typeof a == "string" ? a.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function nf(a) {
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
function Es(a) {
  const e = Math.max(0, Math.trunc(me(a, 0)));
  return e > 0 ? e : 0;
}
function Ei(a = {}) {
  const e = a && typeof a == "object" ? a : {};
  return {
    perActivation: Es(e.perActivation),
    perRound: Es(e.perRound),
    perScene: Es(e.perScene)
  };
}
function sf(a = {}) {
  const e = a && typeof a == "object" ? a : {}, t = {
    id: re(e.id, foundry.utils.randomID()),
    fact: re(e.fact)
  }, i = no.find((s) => e[s.value] !== void 0 && e[s.value] !== null), n = (i == null ? void 0 : i.value) ?? (tf.has(String(e.comparator ?? "").trim()) ? String(e.comparator).trim() : "eq");
  return t.comparator = n, n !== "truthy" && n !== "falsy" && (t.value = nf(e[n] ?? e.value ?? "")), t;
}
function ri(a = []) {
  return (Array.isArray(a) ? a : []).map(sf);
}
function rf(a = {}) {
  const e = a && typeof a == "object" ? a : {}, t = ef.has(String(e.type ?? "").trim()) ? String(e.type).trim() : "rollMod", i = of(t), n = Lc.has(String(e.phase ?? "").trim()) ? String(e.phase).trim() : i, s = af.has(String(e.operation ?? "").trim()) ? String(e.operation).trim() : "adjustAmount";
  return {
    id: re(e.id, foundry.utils.randomID()),
    type: t,
    phase: n,
    selector: re(e.selector),
    skillKeys: $c(e.skillKeys),
    label: re(e.label),
    value: me(e.value, 0),
    min: e.min === void 0 || e.min === null || e.min === "" ? null : me(e.min, 0),
    max: e.max === void 0 || e.max === null || e.max === "" ? null : me(e.max, 0),
    pool: re(e.pool),
    operation: s,
    conditions: ri(e.conditions),
    limit: Ei(e.limit)
  };
}
function Bc(a = {}) {
  const e = re(a == null ? void 0 : a.selector);
  return e === "intent.skill" || e.startsWith("intent.skill.");
}
function xi(a = []) {
  return (Array.isArray(a) ? a : []).map(rf).filter((t) => t.phase && t.type);
}
function zt(a = {}) {
  const e = a && typeof a == "object" ? Hn(a) : {}, t = e.positive === !1 ? "negative" : "positive", i = Jm.has(String(e.category ?? "").trim()) ? String(e.category).trim() : t, n = Xm.has(String(e.tier ?? "").trim()) ? String(e.tier).trim() : "minor", s = Zm.has(String(e.activation ?? "").trim()) ? String(e.activation).trim() : "passive";
  return {
    ...e,
    positive: i === "positive",
    category: i,
    tier: n,
    activation: s,
    tags: $c(e.tags),
    effects: xi(e.effects),
    prerequisites: ri(e.prerequisites),
    limits: Ei(e.limits)
  };
}
function zc() {
  return {
    categories: [...io],
    tiers: [...ao],
    activations: [...Dc],
    effectTypes: [...Oc],
    phases: [..._c],
    comparators: [...no],
    edgeOperations: [...xc]
  };
}
function gn(a = "") {
  var e;
  return ((e = io.find((t) => t.value === a)) == null ? void 0 : e.label) ?? "Positive";
}
function yn(a = "") {
  var e;
  return ((e = ao.find((t) => t.value === a)) == null ? void 0 : e.label) ?? "Minor";
}
function of(a = "") {
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
function lf(a) {
  return Array.from((a == null ? void 0 : a.items) ?? []).filter((e) => ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === "quality").map((e) => ({
    item: e,
    system: zt(e.system ?? {})
  }));
}
function cf(a = {}, e = {}) {
  const t = Ei(a), i = Ei(e);
  return {
    perActivation: i.perActivation || t.perActivation,
    perRound: i.perRound || t.perRound,
    perScene: i.perScene || t.perScene
  };
}
function Fc(a = {}) {
  var n, s, r;
  const e = re(a.combatId ?? ((n = a.combat) == null ? void 0 : n.id)), t = Math.max(0, Math.trunc(me(a.round ?? ((s = a.combat) == null ? void 0 : s.round), 0))), i = re(a.sceneId ?? ((r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.id));
  return {
    activationKey: re(a.activationKey),
    roundKey: e ? `${e}:${t}` : "",
    sceneKey: i
  };
}
function uf(a, e = {}) {
  var s, r, o, l;
  const t = ((s = a == null ? void 0 : a.flags) == null ? void 0 : s[w]) ?? {}, i = ((r = t == null ? void 0 : t.traitUsage) == null ? void 0 : r.scene) ?? {}, n = e.state ?? {};
  return {
    activation: ((o = n == null ? void 0 : n.traitUsage) == null ? void 0 : o.activation) ?? {},
    round: ((l = n == null ? void 0 : n.traitUsage) == null ? void 0 : l.round) ?? {},
    scene: i
  };
}
function df(a, e, t, i) {
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
function mf(a, e, t, i) {
  const n = [];
  for (const s of ["perActivation", "perRound", "perScene"]) {
    const r = Math.max(0, Math.trunc(me(t == null ? void 0 : t[s], 0)));
    if (!r) continue;
    df(a, e, s, i) >= r && n.push(`${s} limit reached`);
  }
  return n;
}
function ff(a, e, t) {
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
function Fo(a, e) {
  if (!re(a == null ? void 0 : a.fact)) return !0;
  const t = foundry.utils.getProperty(e, a.fact);
  return ff(t, a.comparator, a.value);
}
function pf(a = "", e = {}) {
  const t = re(a);
  return t ? (Array.isArray(e == null ? void 0 : e.selectors) ? e.selectors : []).some(
    (n) => n === t || n.startsWith(`${t}.`)
  ) : !0;
}
function Hc(a, e) {
  return `${a.id}:${e.id}`;
}
function hf(a, e) {
  var t;
  return !!((t = a.system) != null && t.inactive) || !!(e != null && e.inactive);
}
function Ho(a = []) {
  return a.map((e) => e.fact).filter(Boolean).join(", ");
}
function Xi(a, e, t) {
  const i = me(a[e], 0);
  let n = i;
  return typeof t.value == "number" && (n += t.value), typeof t.min == "number" && (n = Math.max(t.min, n)), typeof t.max == "number" && (n = Math.min(t.max, n)), a[e] = n, n - i;
}
function pi(a, e, t, i, n) {
  i && a.push({
    id: `trait:${n}:${e.id}:${t.id}`,
    label: t.label || e.name,
    value: i,
    source: e.name,
    traitItemId: e.id,
    traitEffectId: t.id
  });
}
function gf({ item: a, effect: e, phase: t, packet: i, result: n }) {
  switch (e.type) {
    case "rollMod": {
      const s = me(e.value, 0);
      return pi(n.modifiers, a, e, s, t), s;
    }
    case "burnAdjust": {
      if (t === "onEndOfActivation") {
        const r = Xi(i, "burnDelta", e);
        return pi(n.modifiers, a, e, r, t), r;
      }
      const s = Xi(i, "amount", e);
      return pi(n.modifiers, a, e, s, t), s;
    }
    case "actionCostMod": {
      const s = Xi(i, "cost", e);
      return pi(n.modifiers, a, e, s, t), s;
    }
    case "initiativeMod": {
      const s = Xi(i, "total", e);
      return pi(n.modifiers, a, e, s, t), s;
    }
    case "damageMod": {
      const s = Xi(i, "amount", e);
      return pi(n.modifiers, a, e, s, t), s;
    }
    case "edgeEvent": {
      if (t === "onEndOfActivation" && e.operation === "grantPool" && e.pool)
        return i.edgeAdjustments ?? (i.edgeAdjustments = []), i.edgeAdjustments.push({
          poolKey: e.pool,
          amount: me(e.value, 0),
          label: e.label || a.name,
          source: a.name
        }), pi(n.modifiers, a, e, me(e.value, 0), t), me(e.value, 0);
      const s = Xi(i, "amount", e);
      return pi(n.modifiers, a, e, s, t), s;
    }
    default:
      return 0;
  }
}
function yf(a, e, t) {
  const i = Hc(a, e), n = [];
  return t.perActivation > 0 && n.push({ kind: "usage", scope: "perActivation", key: i, delta: 1 }), t.perRound > 0 && n.push({ kind: "usage", scope: "perRound", key: i, delta: 1 }), t.perScene > 0 && n.push({ kind: "usage", scope: "perScene", key: i, delta: 1 }), n;
}
function Uc(a = "") {
  const e = re(a);
  return e ? [`action.${e}`] : [];
}
function Vi(a, e = {}) {
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
function so({ actor: a, resolved: e, payload: t, runtime: i = {} } = {}) {
  var d, m, f, p, h, g, y, b, S, T, C, N;
  const n = Vi(a, i), s = re((e == null ? void 0 : e.intent) ?? (t == null ? void 0 : t.intent), "skill"), r = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : [], o = re(((d = e == null ? void 0 : e.attack) == null ? void 0 : d.rangeBand) ?? (t == null ? void 0 : t.rangeBand)), l = re(((f = (m = t == null ? void 0 : t.edge) == null ? void 0 : m.pre) == null ? void 0 : f.poolKey) ?? ((p = t == null ? void 0 : t.edge) == null ? void 0 : p.poolKey) ?? ""), c = re(
    ((h = e == null ? void 0 : e.data) == null ? void 0 : h.skillKey) ?? ((g = e == null ? void 0 : e.specialization) == null ? void 0 : g.skillKey) ?? (s === "skill" ? t == null ? void 0 : t.key : "")
  ), u = re(
    ((S = (b = (y = e == null ? void 0 : e.breakdown) == null ? void 0 : y.find) == null ? void 0 : b.call(y, (P) => (P == null ? void 0 : P.id) === "skill")) == null ? void 0 : S.label) ?? (e == null ? void 0 : e.title)
  );
  return n.intent = s, n.domains = r, n.rangeBand = o, n.skill = {
    key: c,
    label: u
  }, n.edge = {
    stage: (T = t == null ? void 0 : t.toggles) != null && T.useEdge ? "pre" : "",
    pool: l,
    spent: !!((C = t == null ? void 0 : t.toggles) != null && C.useEdge)
  }, n.selectors.push(`intent.${s}`), r.forEach((P) => n.selectors.push(`domain.${P}`)), o && n.selectors.push(`range.${o}`), s === "skill" && c && n.selectors.push(`skill.${c}`), (N = t == null ? void 0 : t.toggles) != null && N.useEdge && n.selectors.push("edge.pre"), n;
}
function Wc({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Vi(a, t);
  return i.action = {
    id: re(e.actionId),
    category: re(e.category),
    resource: re(e.resource),
    cost: me(e.cost, 0),
    effectiveCost: me(e.effectiveCost ?? e.cost, 0)
  }, i.selectors.push(...Uc(e.actionId)), i.action.category && i.selectors.push(`actionCategory.${i.action.category}`), i.action.resource && i.selectors.push(`actionResource.${i.action.resource}`), i;
}
function bn({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Vi(a, t);
  return i.action = {
    id: re(e.actionId),
    category: re(e.category),
    resource: re(e.resource)
  }, i.burn = {
    ...i.burn,
    amount: me(e.amount, 0),
    source: re(e.source)
  }, e.source === "extraSA" && e.extraSaIndex === 1 && i.selectors.push("activation.extraSA:first"), e.source && i.selectors.push(`burn.${e.source}`), i.action.id && i.selectors.push(...Uc(i.action.id)), i.action.category && i.selectors.push(`actionCategory.${i.action.category}`), i.action.category === "reaction" && i.selectors.push(`reaction.${i.action.id}`), i;
}
function jc({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Vi(a, t);
  return i.intent = "initiative", i.domains = ["combat"], i.initiative = {
    total: me(e.total, 0)
  }, i.selectors.push("intent.initiative"), i;
}
function Gc({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Vi(a, t);
  return i.damage = {
    amount: me(e.amount, 0),
    track: re(e.track),
    damageType: re(e.damageType)
  }, i.selectors.push("incoming"), i;
}
function sr({ actor: a, packet: e = {}, phase: t = "onEdgeGain", runtime: i = {} } = {}) {
  const n = Vi(a, i);
  return n.edge = {
    pool: re(e.poolKey),
    amount: me(e.amount, 0),
    eventKey: re(e.eventKey),
    source: re(e.source)
  }, n.selectors.push(t === "onEdgeSpend" ? "edge.spend" : "edge.gain"), n.edge.eventKey && n.selectors.push(`event.${n.edge.eventKey}`), n;
}
function qc({ actor: a, packet: e = {}, runtime: t = {} } = {}) {
  const i = Vi(a, t);
  return i.event = {
    phase: "endOfActivation"
  }, i.selectors.push("endOfActivation"), me(e.burnDelta, 0) !== 0 && i.selectors.push("burn.adjust"), i;
}
function wt({ actor: a, phase: e, facts: t = {}, packet: i = {}, options: n = {} } = {}) {
  var u;
  const s = {
    packet: Hn(i),
    modifiers: [],
    mutations: [],
    applied: [],
    skipped: []
  };
  if (!a || !Lc.has(String(e ?? "").trim()))
    return s;
  const r = n.runtime ?? {}, o = uf(a, r), l = Fc(r), c = lf(a);
  for (const { item: d, system: m } of c) {
    if (hf(d, m)) {
      s.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: "Trait is inactive"
      });
      continue;
    }
    const f = m.prerequisites.filter((p) => re(p == null ? void 0 : p.fact)).filter((p) => !Fo(p, t));
    if (f.length) {
      s.skipped.push({
        traitItemId: d.id,
        traitEffectId: "",
        label: d.name,
        reason: `Prerequisites not met: ${Ho(f)}`
      });
      continue;
    }
    for (const p of m.effects.filter((h) => h.phase === e)) {
      if (!pf(p.selector, t)) {
        s.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: `Selector did not match (${p.selector || "any"})`
        });
        continue;
      }
      if (Bc(p) && p.skillKeys.length) {
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
      const h = p.conditions.filter((T) => re(T == null ? void 0 : T.fact)).filter((T) => !Fo(T, t));
      if (h.length) {
        s.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: `Conditions not met: ${Ho(h)}`
        });
        continue;
      }
      const g = cf(m.limits, p.limit), y = Hc(d, p), b = mf(o, l, g, y);
      if (b.length) {
        s.skipped.push({
          traitItemId: d.id,
          traitEffectId: p.id,
          label: p.label || d.name,
          reason: b.join(", ")
        });
        continue;
      }
      const S = gf({
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
      }), n.consumeUsage && s.mutations.push(...yf(d, p, g));
    }
  }
  return s;
}
async function ci({ actor: a, mutations: e = [], runtime: t = {} } = {}) {
  var o, l, c, u, d, m, f, p, h;
  if (!a || !Array.isArray(e) || !e.length) return;
  const i = e.filter((g) => (g == null ? void 0 : g.kind) === "usage");
  if (!i.length) return;
  const n = Hn(((c = (l = (o = a.flags) == null ? void 0 : o[w]) == null ? void 0 : l.traitUsage) == null ? void 0 : c.scene) ?? {}), s = t.state ? Hn(t.state) : null, r = Fc(t);
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
  s && ((h = t.combatant) != null && h.id) && await t.combatant.setFlag(w, "personalCombat", s), await a.setFlag(w, "traitUsage", { scene: n });
}
const Kc = "personalActionCatalog", Ce = Object.freeze({
  standard: "standard",
  complex: "complex",
  free: "free",
  reaction: "reaction",
  recovery: "recovery"
}), rr = Object.freeze([
  { value: Ce.standard, label: "Standard" },
  { value: Ce.complex, label: "Complex" },
  { value: Ce.free, label: "Free" },
  { value: Ce.reaction, label: "Reaction" },
  { value: Ce.recovery, label: "Burn & Recovery" }
]), Vc = Object.freeze([
  { value: "", label: "Not Implemented / Placeholder" },
  { value: "combatAction", label: "Generic Action" },
  { value: "combatAttack", label: "Attack Pipeline" },
  { value: "combatEvade", label: "Evade" },
  { value: "combatAssist", label: "Assist" },
  { value: "combatInterrupt", label: "Interrupt" },
  { value: "combatReduceBurn", label: "Reduce Burn" },
  { value: "combatOverloadCheck", label: "Overload Check" }
]), Uo = new Set(rr.map((a) => a.value)), Wo = new Set(Vc.map((a) => a.value)), Yc = Object.freeze([
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
].map((a) => Object.freeze(ns(a)))), bf = new Map(Yc.map((a) => [a.id, a]));
function ns(a) {
  return JSON.parse(JSON.stringify(a ?? null));
}
function jo(a, e = !1) {
  if (typeof a == "boolean") return a;
  const t = String(a ?? "").trim().toLowerCase();
  return ["true", "1", "yes", "y", "on"].includes(t) ? !0 : ["false", "0", "no", "n", "off", ""].includes(t) ? !1 : e;
}
function Sf(a, e = null) {
  var i;
  const t = String((a == null ? void 0 : a.rollIntent) ?? ((i = a == null ? void 0 : a.roll) == null ? void 0 : i.intent) ?? (e == null ? void 0 : e.intent) ?? "").trim();
  return t ? { intent: t } : null;
}
function Af(a, { strict: e = !1, index: t = 0 } = {}) {
  const i = String((a == null ? void 0 : a.id) ?? "").trim(), n = bf.get(i) ?? {}, s = `Row ${t + 1}`, r = [];
  i || r.push(`${s}: id cannot be blank.`);
  const o = String((a == null ? void 0 : a.category) ?? n.category ?? "").trim();
  Uo.has(o) || r.push(`${s}: category must be one of ${Array.from(Uo).join(", ")}.`);
  const l = String((a == null ? void 0 : a.label) ?? n.label ?? "").trim();
  l || r.push(`${s}: label cannot be blank.`);
  const c = (a == null ? void 0 : a.cost) ?? n.cost ?? 0, u = Number(c);
  (!Number.isFinite(u) || u < 0) && r.push(`${s}: cost must be a non-negative number.`);
  const d = String((a == null ? void 0 : a.handler) ?? n.handler ?? "").trim();
  if (Wo.has(d) || r.push(`${s}: handler must be one of ${Array.from(Wo).map((p) => p || "(blank)").join(", ")}.`), r.length) {
    if (e) {
      const p = new Error(r[0]);
      throw p.validationErrors = r, p;
    }
    return null;
  }
  const m = {
    ...ns(n),
    id: i,
    label: l,
    category: o,
    cost: Math.trunc(u),
    handler: d,
    description: String((a == null ? void 0 : a.description) ?? n.description ?? "").trim(),
    reason: String((a == null ? void 0 : a.reason) ?? n.reason ?? "").trim(),
    prominent: jo(a == null ? void 0 : a.prominent, !!n.prominent),
    prominentWhenBurning: jo(a == null ? void 0 : a.prominentWhenBurning, !!n.prominentWhenBurning)
  };
  m.id === "opportunity" && !m.handler && (m.handler = "combatAttack", m.reason = ""), m.id === "opportunity" && m.handler === "combatAttack" && m.reason === "Opportunity attacks are not yet implemented." && (m.reason = ""), m.id === "assist" && !m.handler && (m.handler = "combatAssist", m.reason = ""), m.id === "assist" && m.handler === "combatAssist" && m.reason === "Reaction assist effects are not yet implemented." && (m.reason = ""), m.id === "interrupt" && !m.handler && (m.handler = "combatInterrupt", m.reason = ""), m.id === "interrupt" && m.handler === "combatInterrupt" && m.reason === "Prepared interrupt resolution is not yet implemented." && (m.reason = "");
  const f = Sf(a, n.roll ?? null);
  return f ? m.roll = f : delete m.roll, m.reason || delete m.reason, m.description || delete m.description, m.prominent || delete m.prominent, m.prominentWhenBurning || delete m.prominentWhenBurning, m;
}
function ro() {
  return ns(Yc);
}
function Qa(a, { strict: e = !1 } = {}) {
  if (!Array.isArray(a)) {
    if (e) {
      const s = new Error("Action catalog must be an array.");
      throw s.validationErrors = [s.message], s;
    }
    return ro();
  }
  const t = [], i = /* @__PURE__ */ new Set(), n = [];
  if (a.forEach((s, r) => {
    try {
      const o = Af(s, { strict: e, index: r });
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
function Qc() {
  var a, e;
  try {
    const t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.get) == null ? void 0 : e.call(a, w, Kc);
    return Qa(t, { strict: !1 });
  } catch {
    return ro();
  }
}
function Sn(a) {
  const e = String(a ?? "").trim();
  return Qc().find((t) => t.id === e) ?? null;
}
function wf(a) {
  return Qc().filter((e) => e.category === a).map((e) => Object.freeze(ns(e)));
}
const Ui = "hazard";
function Tf(a) {
  return a && typeof a == "object" ? a : {};
}
function Pi(a) {
  var n, s, r;
  const e = ((n = a == null ? void 0 : a.getFlag) == null ? void 0 : n.call(a, "mwd", Ui)) ?? ((r = (s = a == null ? void 0 : a.flags) == null ? void 0 : s.mwd) == null ? void 0 : r[Ui]) ?? null;
  if (!e || typeof e != "object") return null;
  const t = di(e.areaEffect ?? { kind: rt.persistent, hazard: e.hazardDef }), i = Ue(
    e.templateGeometry,
    {
      template: e.template,
      placement: e.templatePlacement
    }
  ) ?? null;
  return {
    ...foundry.utils.deepClone(Tf(e)),
    areaEffect: t,
    hazardDef: jr(e.hazardDef ?? t.hazard ?? {}),
    templateGeometry: i
  };
}
function vf(a) {
  return !!Pi(a);
}
async function Ms(a) {
  var i, n, s;
  const e = ((i = a == null ? void 0 : a.getFlag) == null ? void 0 : i.call(a, "mwd", Ui)) ?? ((s = (n = a == null ? void 0 : a.flags) == null ? void 0 : n.mwd) == null ? void 0 : s[Ui]) ?? null;
  if (!e || typeof e != "object") return null;
  if (e != null && e.templateGeometry) return Pi(a);
  const t = Pi(a);
  return !(t != null && t.templateGeometry) || !(a != null && a.setFlag) ? t : (await a.setFlag("mwd", Ui, {
    ...foundry.utils.deepClone(e),
    templateGeometry: li(t.templateGeometry)
  }), Pi(a));
}
async function kf({ attacker: a = null, attack: e = {}, targetResult: t = null } = {}) {
  var c, u, d, m, f, p, h, g, y, b, S, T;
  const i = (canvas == null ? void 0 : canvas.scene) ?? null;
  if (!i) return null;
  const n = Ue(
    e == null ? void 0 : e.templateGeometry,
    {
      template: e == null ? void 0 : e.template,
      placement: e == null ? void 0 : e.templatePlacement
    }
  ), s = di((e == null ? void 0 : e.areaEffect) ?? ((c = e == null ? void 0 : e.payload) == null ? void 0 : c.areaEffect) ?? {});
  if (s.kind !== rt.persistent || !n) return null;
  const r = Vr(n);
  if (!r.length) return null;
  const o = {
    sourceActorUuid: (a == null ? void 0 : a.uuid) ?? null,
    sourceItemUuid: ((u = e == null ? void 0 : e.weapon) == null ? void 0 : u.uuid) ?? null,
    payloadId: ((d = e == null ? void 0 : e.payloadState) == null ? void 0 : d.activePayloadId) ?? ((m = e == null ? void 0 : e.payload) == null ? void 0 : m.id) ?? "",
    templateGeometry: li(n),
    templatePlacement: foundry.utils.deepClone((e == null ? void 0 : e.templatePlacement) ?? null),
    template: foundry.utils.deepClone((e == null ? void 0 : e.template) ?? null),
    damage: Number(((f = t == null ? void 0 : t.damage) == null ? void 0 : f.effectiveWeaponDamage) ?? ((p = e == null ? void 0 : e.weapon) == null ? void 0 : p.damage) ?? 0) || 0,
    ap: Number((e == null ? void 0 : e.totalAp) ?? ((h = e == null ? void 0 : e.weapon) == null ? void 0 : h.ap) ?? 0) || 0,
    damageType: String(((g = t == null ? void 0 : t.damage) == null ? void 0 : g.damageType) ?? ((y = e == null ? void 0 : e.weapon) == null ? void 0 : y.damageType) ?? "concussive").trim() || "concussive",
    label: `${String(((b = e == null ? void 0 : e.weapon) == null ? void 0 : b.name) ?? "Hazard").trim() || "Hazard"} (${kt(((S = s.hazard) == null ? void 0 : S.startExposure) ?? "minor")})`,
    areaEffect: s,
    hazardDef: s.hazard
  }, [l] = await i.createEmbeddedDocuments("Region", [{
    name: o.label,
    color: ((T = game.user) == null ? void 0 : T.color) ?? "#d86a2c",
    shapes: r,
    flags: {
      mwd: {
        [Ui]: o
      }
    }
  }]);
  return l ?? null;
}
function Go(a = null) {
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
  return Array.from(t.regions ?? []).filter(vf).filter((c) => {
    var u, d, m;
    if ((d = (u = c == null ? void 0 : c.tokens) == null ? void 0 : u.has) != null && d.call(u, e)) return !0;
    try {
      return ((m = c == null ? void 0 : c.testPoint) == null ? void 0 : m.call(c, n)) ?? !1;
    } catch {
      return !1;
    }
  });
}
function hi(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Ef({ actor: a = null, token: e = null } = {}) {
  var s;
  const t = (e == null ? void 0 : e.document) ?? e ?? null, i = String(((s = t == null ? void 0 : t.texture) == null ? void 0 : s.src) ?? "").trim(), n = String((a == null ? void 0 : a.img) ?? "").trim();
  return i || n || "icons/svg/mystery-man.svg";
}
function Mf(a = []) {
  return Array.isArray(a) ? a.map((e) => ({
    key: String((e == null ? void 0 : e.key) ?? "").trim(),
    label: String((e == null ? void 0 : e.label) ?? (e == null ? void 0 : e.key) ?? "").trim(),
    value: hi(e == null ? void 0 : e.value, 0)
  })).filter((e) => e.key) : [];
}
function oo(a = {}) {
  var c, u, d;
  const e = (a == null ? void 0 : a.preview) ?? {}, t = De(((c = a == null ? void 0 : a.exposure) == null ? void 0 : c.initialTier) ?? (a == null ? void 0 : a.exposureTier) ?? (a == null ? void 0 : a.tier), "none"), i = De(
    ((u = a == null ? void 0 : a.exposure) == null ? void 0 : u.finalTier) ?? (e.evadeActive ? e.finalTier : t),
    t
  ), n = Ri({
    tier: t,
    appliedTier: i,
    evadeUsed: !!(e.evadeActive && t !== i),
    evadeLocked: !!((a == null ? void 0 : a.evadeLocked) ?? ((d = a == null ? void 0 : a.exposure) == null ? void 0 : d.evadeLocked))
  }), s = Math.max(0, hi(a == null ? void 0 : a.baseDamage, 0)), r = Math.max(0, hi(a == null ? void 0 : a.damageBefore, Wi(s, n.initialTier))), o = Math.max(0, hi(a == null ? void 0 : a.damageAfter, Wi(s, n.finalTier))), l = (e == null ? void 0 : e.reactionPreview) ?? {};
  return {
    kind: String((a == null ? void 0 : a.kind) ?? "hazard").trim() || "hazard",
    eventType: String((a == null ? void 0 : a.eventType) ?? "entry").trim() || "entry",
    regionId: String((a == null ? void 0 : a.regionId) ?? "").trim(),
    regionName: String((a == null ? void 0 : a.regionName) ?? (a == null ? void 0 : a.label) ?? "Hazard").trim() || "Hazard",
    actorUuid: String((a == null ? void 0 : a.actorUuid) ?? "").trim() || null,
    tokenUuid: String((a == null ? void 0 : a.tokenUuid) ?? "").trim() || null,
    actorName: String((a == null ? void 0 : a.actorName) ?? "Target").trim() || "Target",
    turnsExposed: Math.max(0, hi(a == null ? void 0 : a.turnsExposed, 0)),
    baseDamage: s,
    ap: Math.max(0, hi(a == null ? void 0 : a.ap, 0)),
    damageType: Ut(a == null ? void 0 : a.damageType, "concussive"),
    damageTypeLabel: Wt((a == null ? void 0 : a.damageType) ?? "concussive") || "Damage",
    source: String((a == null ? void 0 : a.source) ?? (a == null ? void 0 : a.regionName) ?? "Hazard").trim() || "Hazard",
    applied: !!(a != null && a.applied),
    applyReason: String((a == null ? void 0 : a.applyReason) ?? "").trim(),
    onFullBurnDelta: Math.max(0, hi(a == null ? void 0 : a.onFullBurnDelta, 0)),
    exposure: n,
    damageBefore: r,
    damageAfter: o,
    nextTier: De(a == null ? void 0 : a.nextTier, n.finalTier),
    nextLabel: kt((a == null ? void 0 : a.nextTier) ?? n.finalTier),
    preview: {
      evadeActive: !!e.evadeActive,
      edgePoolKey: String(e.edgePoolKey ?? "").trim() || null,
      finalTier: n.finalTier,
      burnDelta: hi(l == null ? void 0 : l.burnDelta, 0),
      canSpendEdge: !!(l != null && l.canSpendEdge),
      edgePools: Mf(l == null ? void 0 : l.edgePools)
    }
  };
}
function Cf(a = {}, { actor: e = null, token: t = null } = {}) {
  const i = oo(a), n = i.eventType === "tick" ? "Hazard Tick" : i.eventType === "exit" ? "Hazard Exit" : "Hazard Entry", s = i.exposure.initialLabel === i.exposure.finalLabel ? i.exposure.initialLabel : `${i.exposure.initialLabel} -> ${i.exposure.finalLabel}`, r = i.damageBefore === i.damageAfter ? String(i.damageAfter) : `${i.damageBefore} -> ${i.damageAfter}`;
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
      image: Ef({ actor: e, token: t })
    },
    rows: [
      { label: "Exposure", value: s },
      { label: "Damage", value: r },
      { label: "Next Tier", value: i.nextLabel },
      { label: "Turns Exposed", value: String(i.turnsExposed) }
    ],
    reactionHint: i.exposure.evadeLocked ? "Evade is locked for this hazard." : i.preview.evadeActive ? i.preview.edgePoolKey ? "Evade active. Reaction Burn canceled by Edge." : i.preview.burnDelta > 0 ? `Evade active. This reaction adds +${i.preview.burnDelta} Burn.` : "Evade active." : "",
    actions: i.applied ? [] : Pf(i)
  };
}
function Pf(a = {}) {
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
async function Jc(a = {}, { actor: e = null, token: t = null } = {}) {
  return foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-hazard-card",
    Cf(a, { actor: e, token: t })
  );
}
const qe = "mwd", Ke = "personalCombat", $i = "preparedInterrupt", Nf = "systems/mwd/img/icons/status/readied_action.svg", yi = 3, Rf = 1, If = 1;
function rn(a, e) {
  return !(a != null && a.activation) || !e ? !1 : a.activation.combatId === e.combatId && Number(a.activation.round ?? -1) === Number(e.round ?? -1) && Number(a.activation.turn ?? -1) === Number(e.turn ?? -1) && a.activation.combatantId === e.combatantId;
}
function lo(a = null) {
  return {
    saRemaining: yi,
    faRemaining: Rf,
    raRemaining: If,
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
function An(a, e = null) {
  return foundry.utils.mergeObject(
    lo(e),
    foundry.utils.deepClone(a ?? {}),
    { inplace: !1, overwrite: !0 }
  );
}
function Zi(a, e = null) {
  const t = An(a ?? {}, (a == null ? void 0 : a.activation) ?? e);
  return t.actionLog = xa(t.actionLog), t.hazards = Un(t.hazards), t.pendingReaction = wn(t.pendingReaction), t;
}
function Un(a) {
  return !a || typeof a != "object" ? {} : Object.fromEntries(
    Object.entries(a).map(([e, t]) => {
      const i = String(e ?? "").trim();
      return !i || !t || typeof t != "object" ? null : [i, {
        tier: De(t.tier, te.none),
        turnsExposed: Math.max(0, Number(t.turnsExposed ?? 0) || 0),
        evadeLocked: !!t.evadeLocked,
        lastProcessedRound: Number(t.lastProcessedRound ?? 0) || 0
      }];
    }).filter(Boolean)
  );
}
function wn(a) {
  if (!a || typeof a != "object") return null;
  const e = String(a.type ?? "").trim();
  return e ? {
    type: e,
    sourceKind: String(a.sourceKind ?? "").trim() || null,
    sourceId: String(a.sourceId ?? "").trim() || null,
    messageId: String(a.messageId ?? "").trim() || null,
    resultIndex: Number.isInteger(Number(a.resultIndex)) ? Number(a.resultIndex) : null,
    exposureBefore: De(a.exposureBefore, te.none),
    exposureAfterPreview: De(a.exposureAfterPreview, te.none),
    edgePoolKey: String(a.edgePoolKey ?? "").trim() || null,
    allowCurrentTurn: !!a.allowCurrentTurn
  } : null;
}
function xa(a) {
  return Array.isArray(a) ? a.map((e) => {
    const t = String((e == null ? void 0 : e.label) ?? "").trim();
    return t ? {
      id: String((e == null ? void 0 : e.id) ?? "").trim(),
      label: t,
      costLabel: String((e == null ? void 0 : e.costLabel) ?? "").trim()
    } : null;
  }).filter(Boolean) : [];
}
function Df(a = []) {
  return xa(a).filter((e) => {
    const t = Sn(e == null ? void 0 : e.id);
    return (t == null ? void 0 : t.category) === Ce.reaction;
  });
}
function qo(a = null, e = null) {
  const t = lo(e);
  return t.reactionBurnSinceLastActivation = Math.max(0, Number((a == null ? void 0 : a.reactionBurnSinceLastActivation) ?? 0) || 0), t.actionLog = Df(a == null ? void 0 : a.actionLog), t.hazards = Un(a == null ? void 0 : a.hazards), t;
}
function Of(a, e) {
  return a === "free" ? "Free" : a === "burn" ? `+${e} Burn` : `${e} ${String(a).toUpperCase()}`;
}
function _f(a = {}, e = "", { snapshot: t = null, metadata: i = {} } = {}) {
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
function ka(a = {}) {
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
function xf(a = null) {
  if (!a) return "";
  const e = [];
  return a.condition && e.push(`Trigger: ${a.condition}`), a.scope && e.push(`Scope: ${a.scope}`), e.join(" | ");
}
function Ko() {
  return (CONFIG.statusEffects ?? []).find((a) => String((a == null ? void 0 : a.id) ?? "").trim() === $i) ?? {
    id: $i,
    name: "Prepared",
    icon: Nf
  };
}
function Lf(a) {
  const e = (CONFIG.statusEffects ?? []).find((i) => String((i == null ? void 0 : i.id) ?? "").trim() === a), t = String((e == null ? void 0 : e.name) ?? (e == null ? void 0 : e.label) ?? a ?? "").trim();
  return Rc(t);
}
function ea(a) {
  const e = Number(a);
  return !Number.isFinite(e) || e === 0 ? "0" : e > 0 ? `+${e}` : String(e);
}
function $f(a) {
  if (typeof a == "number") return Number.isFinite(a) ? a : 0;
  const e = String(a ?? "").trim().match(/[-+]?\d+(\.\d+)?/);
  return e ? Number(e[0]) : 0;
}
function Vo(a) {
  var o;
  const e = (a == null ? void 0 : a.document) ?? a ?? null, t = (a == null ? void 0 : a.object) ?? (e == null ? void 0 : e.object) ?? a ?? null, i = String((e == null ? void 0 : e.id) ?? "").trim(), n = B._pendingTokenPositions.get(i) ?? null, s = Number((n == null ? void 0 : n.x) ?? (e == null ? void 0 : e.x)), r = Number((n == null ? void 0 : n.y) ?? (e == null ? void 0 : e.y));
  if (t && Number.isFinite(s) && Number.isFinite(r)) {
    if (typeof t.getCenterPoint == "function")
      return t.getCenterPoint({ x: s, y: r });
    if (typeof t.getCenter == "function")
      return t.getCenter(s, r);
  }
  return (t == null ? void 0 : t.center) ?? ((o = e == null ? void 0 : e.object) == null ? void 0 : o.center) ?? null;
}
function Bf(a, e = "") {
  if (!Number.isFinite(a)) return "";
  const t = Math.round(a * 10) / 10, i = Number.isInteger(t) ? String(t) : t.toFixed(1);
  return e ? `${i} ${e}` : i;
}
function Yo(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
function Cs(a) {
  return !!Pi(a);
}
function zf(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [];
  if (!e.length) return "";
  const t = e.slice().sort((n, s) => ki(s == null ? void 0 : s.tier) - ki(n == null ? void 0 : n.tier))[0] ?? null;
  if (!t) return "";
  const i = `HAZARD ${kt(t.tier)} (${Math.max(0, Number(t.turnsExposed ?? 0) || 0)})`;
  return t.evadeLocked ? `${i} LOCK` : i;
}
const oa = class oa {
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
      var S, T;
      return ((T = (S = b == null ? void 0 : b.document) == null ? void 0 : S.parent) == null ? void 0 : T.id) === i;
    })) == null ? void 0 : g.document) ?? null;
    if (c) return c;
    const u = Array.from(((y = canvas == null ? void 0 : canvas.scene) == null ? void 0 : y.tokens) ?? []), d = this._collectActorIds(e, r), m = u.filter((b) => this._tokenDocumentMatchesActor(b, e, d));
    return m.find((b) => {
      var S, T, C;
      return ((S = b == null ? void 0 : b.combatant) == null ? void 0 : S.id) === ((C = (T = game.combat) == null ? void 0 : T.combatant) == null ? void 0 : C.id);
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
    const i = canvas == null ? void 0 : canvas.grid, n = Vo(e), s = Vo(t);
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
    const s = i[0], r = this._measureTokenDistance(e, s), o = String(((d = (u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.grid) == null ? void 0 : d.units) ?? ((f = (m = game.system) == null ? void 0 : m.grid) == null ? void 0 : f.units) ?? "").trim(), l = Bf(r, o), c = String((s == null ? void 0 : s.name) ?? ((p = s == null ? void 0 : s.actor) == null ? void 0 : p.name) ?? "Target").trim() || "Target";
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
      const s = $f((n == null ? void 0 : n.numericValue) ?? (n == null ? void 0 : n.value) ?? 0);
      return {
        label: String((n == null ? void 0 : n.label) ?? "").trim() || "Modifier",
        numericValue: s,
        value: String((n == null ? void 0 : n.value) ?? ea(s)).trim() || ea(s)
      };
    }), i = t.reduce((n, s) => n + s.numericValue, 0);
    return {
      total: i,
      totalLabel: ea(i),
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
      const g = this._collectActorIds(e, l), y = String((l == null ? void 0 : l.id) ?? "").trim(), b = d.filter((C) => {
        const N = this._getCombatantTokenId(C), P = this._getCombatantTokenDocument(C, i), F = N || String((P == null ? void 0 : P.id) ?? "").trim();
        return o && y ? F === y : g.has(this._getCombatantActorId(C)) ? !0 : this._tokenDocumentMatchesActor(P, e, g);
      }), S = b.find((C) => {
        var N;
        return C.id === ((N = n == null ? void 0 : n.combatant) == null ? void 0 : N.id);
      }) ?? null;
      u = b.find(
        (C) => {
          var N;
          return y && (this._getCombatantTokenId(C) || String(((N = this._getCombatantTokenDocument(C, i)) == null ? void 0 : N.id) ?? "").trim()) === y;
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
    var P, F, K, Y, W;
    const {
      combat: i,
      combatant: n,
      token: s,
      tokenDocument: r
    } = this.getCombat(e, t), o = !!n && ((P = i == null ? void 0 : i.combatant) == null ? void 0 : P.id) === n.id, l = n ? this.getActivationIdentity(i, n) : null, c = n ? n.getFlag(qe, Ke) : null, u = n ? o ? rn(c, l) ? Zi(c, l) : qo(c, l) : Zi(c, l) : lo(l);
    u.actionLog = xa(u.actionLog);
    const d = Math.max(0, Number(((K = (F = e == null ? void 0 : e.system) == null ? void 0 : F.burn) == null ? void 0 : K.value) ?? 0)), m = Math.floor(d / 2), f = !!((W = (Y = e == null ? void 0 : e.system) == null ? void 0 : Y.burn) != null && W.overloaded), p = ka(u), h = this.getActiveStatuses(e), g = h.filter(
      (j) => !(f && j.id === "overloaded") && j.id !== $i
    ), y = this.getModifierSummary(e, m), b = this.getRollImpact(y), S = Math.max(0, Number(u.burnThisActivation ?? 0)), T = n ? o ? "" : "Waiting for this combatant's activation." : "No combatant on the current scene.", C = [];
    f && C.push({ id: "overloaded", label: "Overloaded" }), p && C.push({
      id: "preparedInterrupt",
      label: "Prepared",
      hint: xf(p)
    });
    const N = Object.entries(u.hazards ?? {});
    if (N.length) {
      const j = N.map(([, x]) => x).sort((x, L) => ki(L == null ? void 0 : L.tier) - ki(x == null ? void 0 : x.tier))[0] ?? null;
      j && C.push({
        id: "hazard",
        label: `Hazard ${kt(j.tier)}`,
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
      states: C,
      effects: g,
      statuses: h,
      rollImpact: b,
      summaryText: `SA: ${u.saRemaining} / ${yi}   FA: ${u.faRemaining}   RA: ${u.raRemaining}`,
      activation: {
        burnThisActivation: S,
        burnThisActivationLabel: `+${S}`,
        items: [
          { label: "SA", value: `${u.saRemaining}/${yi}` },
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
    actionCategory: s = Ce.reaction,
    logLabel: r = "",
    edgePoolKey: o = "",
    allowCurrentTurn: l = !1
  } = {}) {
    var h, g, y, b, S;
    const c = this.getReactionSpendPreview(e, { token: t, edgePoolKey: o }), u = c.snapshot;
    if (!u.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!l && u.isCurrentTurn) return { ok: !1, reason: "Only outside your activation." };
    const d = Zi(u.combatant.getFlag(qe, Ke), (h = u.state) == null ? void 0 : h.activation), m = {
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
      const T = c.edgePoolKey ? 0 : 2, C = wt({
        actor: e,
        phase: "onBeforeBurnApplied",
        facts: bn({
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
      m.pendingMutations = (m.pendingMutations ?? []).concat(C.mutations), f = Math.max(0, Number(C.packet.amount ?? T) || 0), c.edgePoolKey ? (await e.spendEdge(c.edgePoolKey, 1, { source: "reactionBurnCancel" }), p = c.edgePoolKey) : f > 0 && (d.reactionBurnSinceLastActivation = Math.max(
        0,
        Number(d.reactionBurnSinceLastActivation ?? 0) + f
      ));
    }
    return this._appendActionLog(d, {
      id: i,
      label: r || n,
      costLabel: c.costLabel
    }), (y = m.pendingMutations) != null && y.length ? await ci({ actor: e, mutations: m.pendingMutations, runtime: m }) : await u.combatant.setFlag(qe, Ke, d), f > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((S = (b = e.system) == null ? void 0 : b.burn) == null ? void 0 : S.value) ?? 0) + f) }), {
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
    const s = Zi(n.combatant.getFlag(qe, Ke), (o = n.state) == null ? void 0 : o.activation), r = typeof i == "function" ? i(s, n) ?? s : s;
    return await n.combatant.setFlag(qe, Ke, r), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) };
  }
  static async setPendingReaction(e, { token: t = null, pendingReaction: i = null } = {}) {
    return this.updateCombatantState(e, {
      token: t,
      mutate: (n) => (n.pendingReaction = wn(i), n)
    });
  }
  static async clearPendingReaction(e, { token: t = null } = {}) {
    return this.setPendingReaction(e, { token: t, pendingReaction: null });
  }
  static async setHazardState(e, { token: t = null, regionId: i = "", hazardState: n = null } = {}) {
    const s = String(i ?? "").trim();
    return s ? this.updateCombatantState(e, {
      token: t,
      mutate: (r) => (r.hazards ?? (r.hazards = {}), n ? r.hazards[s] = Un({ [s]: n })[s] : delete r.hazards[s], r)
    }) : { ok: !1, reason: "Hazard region id is required." };
  }
  static getModifierSummary(e, t = Math.floor(Number(((n) => (n = ((i) => (i = e == null ? void 0 : e.system) == null ? void 0 : i.burn)()) == null ? void 0 : n.value)() ?? 0) / 2)) {
    var c, u;
    const s = ((u = (c = e == null ? void 0 : e.system) == null ? void 0 : c.derived) == null ? void 0 : u.condition) ?? {}, r = [];
    t > 0 && r.push({
      label: "Burn Penalty",
      numericValue: -t,
      value: ea(-t)
    });
    const o = Number(s.fatiguePenalty ?? 0);
    o && r.push({
      label: "Fatigue",
      numericValue: o,
      value: ea(o)
    });
    const l = Number(s.physicalPenalty ?? 0);
    return l && r.push({
      label: "Physical",
      numericValue: l,
      value: ea(l)
    }), r.length || r.push({
      label: "Current Modifiers",
      numericValue: 0,
      value: "0"
    }), r;
  }
  static getActiveStatuses(e) {
    return Array.from((e == null ? void 0 : e.statuses) ?? []).map((i) => ({
      id: i,
      label: Lf(i)
    })).sort((i, n) => i.label.localeCompare(n.label));
  }
  static buildActionModel(e, t) {
    var o, l, c, u;
    const i = (d) => {
      const m = to(d), f = Km(d);
      return !f || !m ? null : {
        id: d,
        label: m.label,
        handler: "roll",
        roll: JSON.stringify(f),
        disabled: !1,
        reason: ""
      };
    }, n = (d) => {
      const m = wf(d).filter((f) => f.id !== "overloadCheck").filter((f) => !(d === Ce.recovery && f.id === "reduceBurn"));
      if (d === Ce.standard) {
        const f = Sn("reduceBurn");
        f && !m.some((p) => p.id === "reduceBurn") && m.push(f);
      }
      return m.map((f) => this._buildCatalogAction(e, t, f));
    }, s = (d) => {
      const m = Sn(d);
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
        { label: "SA", value: `${t.state.saRemaining}/${yi}` },
        { label: "Cap", value: `${Math.max(0, Number(((l = t.state) == null ? void 0 : l.saSpentThisActivation) ?? 0))}/${or(e)}` },
        { label: "FA", value: `${t.state.faRemaining}` },
        { label: "RA", value: `${t.state.raRemaining}` },
        {
          label: "Burn/Turn",
          value: `+${Math.max(0, Number(((c = t.state) == null ? void 0 : c.burnThisActivation) ?? 0))}`,
          action: r
        }
      ],
      activationLog: xa((u = t.state) == null ? void 0 : u.actionLog).map((d, m) => ({
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
    const n = t.hasCombatant ? "" : "No current-scene combatant.", s = t.isCurrentTurn ? "" : "Only during your activation.", r = t.overloaded ? "Overloaded actors can only recover Burn." : "", o = on(e, t), l = t.state ?? {}, c = i.category;
    let u = "sa", d = Number(i.cost ?? 0) || 0, m = Of(u, d), f = "";
    if (i.id === "reduceBurn")
      u = "sa", d = 1, m = "1 SA", f = n || s || (o <= 0 ? "Activation SA cap reached." : "") || (t.burn.value <= 0 ? "Burn is already at 0." : "");
    else if (i.id === "overloadCheck")
      u = "check", d = 0, m = "Check", f = n || s || (t.burn.canOverloadCheck ? "" : t.overloaded ? "Already Overloaded." : "Burn below 6.");
    else if (i.id === "interrupt") {
      const p = ka(l);
      u = Number(l.raRemaining ?? 0) > 0 ? "ra" : "burn", d = u === "ra" ? 1 : 2, m = u === "ra" ? "1 RA" : "+2 Burn", f = n || (t.isCurrentTurn ? "Only outside your activation." : "") || (p ? "" : "Prepare an interrupt first.");
    } else if (i.id === "evade") {
      const p = wn(l.pendingReaction), h = t.isCurrentTurn && !(p != null && p.allowCurrentTurn) ? "Only outside your activation." : "";
      u = Number(l.raRemaining ?? 0) > 0 ? "ra" : "burn", d = u === "ra" ? 1 : 2, m = u === "ra" ? "1 RA" : "+2 Burn", f = n || h || (p ? "" : "Use an area effect or hazard card to trigger Evade.");
    } else if (c === Ce.standard)
      f = n || s || r || (o < d ? "Activation SA cap reached." : "");
    else if (c === Ce.complex)
      f = n || s || r || (o < d ? "Activation SA cap reached." : "");
    else if (c === Ce.free) {
      const p = Number(l.faRemaining ?? 0) > 0;
      u = p ? "fa" : "sa", d = 1, m = p ? "Free" : "1 SA", f = n || s || !p && r || (!p && o < 1 ? "Activation SA cap reached." : "");
    } else if (c === Ce.reaction) {
      const p = Number(l.raRemaining ?? 0) > 0;
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
    const s = Sn(i);
    return s ? s.handler ? s.category === Ce.standard ? this._executeStandardAction(e, { token: t, action: s, metadata: n }) : s.category === Ce.free ? this._executeFreeAction(e, { token: t, action: s, metadata: n }) : s.category === Ce.reaction ? this._executeReactionAction(e, { token: t, action: s, metadata: n }) : { ok: !1, reason: s.reason || "That action is not implemented yet." } : { ok: !1, reason: s.reason || "That action is not implemented yet." } : { ok: !1, reason: "Unknown combat action." };
  }
  static async _executeStandardAction(e, { token: t = null, action: i, metadata: n = {} } = {}) {
    const s = this.getSnapshot(e, { token: t });
    if (!s.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!s.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (s.overloaded) return { ok: !1, reason: "Overloaded actors can only recover Burn." };
    if (on(e, s) < Number(i.cost ?? 1))
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
    if (!r && on(e, s) < 1)
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
    const r = wn((d = s.state) == null ? void 0 : d.pendingReaction), o = i.id === "evade" && (r == null ? void 0 : r.allowCurrentTurn);
    if (s.isCurrentTurn && !o) return { ok: !1, reason: "Only outside your activation." };
    if (i.id === "interrupt" && !ka(s.state))
      return { ok: !1, reason: "Prepare an interrupt first." };
    const l = i.id === "assist" && (n != null && n.targetName) ? `${i.label}: ${n.targetName}` : i.id === "interrupt" && (n != null && n.scope) ? `${i.label}: ${String(n.scope).trim()}` : i.label;
    let c = String((n == null ? void 0 : n.edgePoolKey) ?? "").trim();
    !c && Number(((m = s.state) == null ? void 0 : m.raRemaining) ?? 0) <= 0 && (c = await oa._promptSpendEdgeForReaction(e) ?? "");
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
    const o = _f(r.state, i, {
      snapshot: r,
      metadata: n
    });
    return await r.combatant.setFlag(qe, Ke, o), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) };
  }
  static async clearAim(e, { token: t = null } = {}) {
    var s;
    const i = this.getSnapshot(e, { token: t });
    if (!(i != null && i.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const n = Zi(i.combatant.getFlag(qe, Ke), (s = i.state) == null ? void 0 : s.activation);
    return n.actionState ?? (n.actionState = {}), n.actionState.aim ? (n.actionState.aim = null, await i.combatant.setFlag(qe, Ke, n), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : { ok: !0, snapshot: i };
  }
  static getPreparedInterrupt(e = null) {
    const t = (e == null ? void 0 : e.state) ?? e ?? {};
    return ka(t);
  }
  static async clearPreparedInterrupt(e, { token: t = null } = {}) {
    var s;
    const i = this.getSnapshot(e, { token: t });
    if (!(i != null && i.combatant)) return { ok: !1, reason: "No combatant on the current scene." };
    const n = Zi(i.combatant.getFlag(qe, Ke), (s = i.state) == null ? void 0 : s.activation);
    return n.actionState ?? (n.actionState = {}), n.actionState.preparedInterrupt ? (n.actionState.preparedInterrupt = null, await i.combatant.setFlag(qe, Ke, n), { ok: !0, snapshot: this.getSnapshot(e, { token: t }) }) : { ok: !0, snapshot: i };
  }
  static async _syncPreparedIndicatorForCombatant(e) {
    var u, d, m;
    if (!game.user.isGM || !e) return;
    const t = this._getCombatantSceneId(e) || ((u = canvas == null ? void 0 : canvas.scene) == null ? void 0 : u.id), i = this._getCombatantTokenDocument(e, t), n = (i == null ? void 0 : i.actor) ?? (e == null ? void 0 : e.actor) ?? null;
    if (!i || !n) return;
    const s = e.getFlag(qe, Ke), r = !!ka(s), o = Ko(), l = String((o == null ? void 0 : o.id) ?? $i).trim() || $i;
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
    const s = Ko(), r = String((s == null ? void 0 : s.id) ?? $i).trim() || $i;
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
    const r = xa(e == null ? void 0 : e.actionLog);
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
    const i = this.getActivationIdentity(e, t), n = t.getFlag(qe, Ke);
    rn(n, i) || await t.setFlag(qe, Ke, qo(n, i));
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
    var S, T, C, N, P, F, K;
    const c = this.getSnapshot(e, { token: t });
    if (!c.hasCombatant)
      return { ok: !1, reason: "No combatant on the current scene." };
    if (!c.isCurrentTurn)
      return { ok: !1, reason: "Only available during your activation." };
    const u = {
      combat: c.combat,
      combatant: c.combatant,
      state: An(c.state, this.getActivationIdentity(c.combat, c.combatant)),
      sceneId: ((S = canvas == null ? void 0 : canvas.scene) == null ? void 0 : S.id) ?? "",
      snapshot: c
    };
    let d = Math.max(0, Number(n ?? 0) || 0);
    const m = wt({
      actor: e,
      phase: "onBeforeActionCostFinalized",
      facts: Wc({
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
    const h = u.state, g = i === "sa" ? or(e) : 0, y = Math.max(0, Number(((C = c.state) == null ? void 0 : C.saSpentThisActivation) ?? 0) || 0);
    if (i === "sa" && y + d > g)
      return { ok: !1, reason: "Activation SA cap reached." };
    h[f] = Math.max(0, p - d), i === "sa" && (h.saSpentThisActivation = y + d, s === "attack" && (h.attacksThisActivation = Number(h.attacksThisActivation ?? 0) + 1)), this._appendActionLog(h, {
      id: s,
      label: r,
      costLabel: o || this._formatCostLabel(i, d)
    });
    let b = 0;
    if (i === "sa") {
      const Y = Math.max(0, y - yi), W = Math.max(0, h.saSpentThisActivation - yi), j = Math.max(0, Number(((N = c.state) == null ? void 0 : N.attacksThisActivation) ?? 0) || 0), x = Math.max(0, Number(h.attacksThisActivation ?? 0) || 0);
      for (let L = Y + 1; L <= W; L += 1) {
        const G = wt({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: bn({
            actor: e,
            packet: {
              actionId: s,
              category: l,
              resource: i,
              amount: 1,
              source: "extraSA",
              extraSaIndex: L
            },
            runtime: u
          }),
          packet: {
            actionId: s,
            category: l,
            resource: i,
            amount: 1,
            source: "extraSA",
            extraSaIndex: L
          },
          options: { runtime: u, consumeUsage: !0 }
        });
        u.pendingMutations = (u.pendingMutations ?? []).concat(G.mutations), b += Math.max(0, Number(G.packet.amount ?? 0) || 0);
      }
      for (let L = j + 1; L <= x; L += 1) {
        if (L <= 1) continue;
        const G = wt({
          actor: e,
          phase: "onBeforeBurnApplied",
          facts: bn({
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
            attackIndex: L
          },
          options: { runtime: u, consumeUsage: !0 }
        });
        u.pendingMutations = (u.pendingMutations ?? []).concat(G.mutations), b += Math.max(0, Number(G.packet.amount ?? 0) || 0);
      }
      h.burnThisActivation = Math.max(0, Number(h.burnThisActivation ?? 0) + b);
    }
    return (P = u.pendingMutations) != null && P.length ? await ci({
      actor: e,
      mutations: u.pendingMutations,
      runtime: {
        ...u,
        state: h
      }
    }) : await c.combatant.setFlag(qe, Ke, h), b > 0 && await e.update({ "system.burn.value": Math.max(0, Number(((K = (F = e.system) == null ? void 0 : F.burn) == null ? void 0 : K.value) ?? 0) + b) }), { ok: !0, snapshot: this.getSnapshot(e, { token: c.token }) };
  }
  static async reduceBurn(e, { token: t = null } = {}) {
    var o, l, c, u;
    const i = this.getSnapshot(e, { token: t });
    if (!i.hasCombatant) return { ok: !1, reason: "No combatant on the current scene." };
    if (!i.isCurrentTurn) return { ok: !1, reason: "Only available during your activation." };
    if (on(e, i) <= 0) return { ok: !1, reason: "Activation SA cap reached." };
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
    const s = Math.max(0, Number(((l = (o = e.system) == null ? void 0 : o.burn) == null ? void 0 : l.value) ?? 0) - 1), r = { "system.burn.value": s };
    return s === 0 && ((u = (c = e.system) == null ? void 0 : c.burn) != null && u.overloaded) && (r["system.burn.overloaded"] = !1), await e.update(r), { ok: !0, snapshot: this.getSnapshot(e, { token: i.token }) };
  }
  static async finalizeActivation(e, t) {
    var m, f, p, h, g, y, b, S;
    if (!game.user.isGM || !t || !e) return;
    const i = ((f = (m = e.combatants) == null ? void 0 : m.get) == null ? void 0 : f.call(m, t)) ?? null, n = (i == null ? void 0 : i.actor) ?? null;
    if (!i || !n) return;
    const s = i.getFlag(qe, Ke), r = rn(s, this.getActivationIdentity(e, i)) ? An(s, this.getActivationIdentity(e, i)) : An(s), l = {
      burnDelta: Number(r.saSpentThisActivation ?? 0) <= yi && Number(r.burnThisActivation ?? 0) <= 0 && Number(r.reactionBurnSinceLastActivation ?? 0) <= 0 ? -2 : 0,
      edgeAdjustments: []
    }, c = {
      combat: e,
      combatant: i,
      state: r,
      sceneId: ((p = e.scene) == null ? void 0 : p.id) ?? ((h = canvas == null ? void 0 : canvas.scene) == null ? void 0 : h.id) ?? ""
    }, u = wt({
      actor: n,
      phase: "onEndOfActivation",
      facts: qc({ actor: n, packet: l, runtime: c }),
      packet: l,
      options: { runtime: c, consumeUsage: !0 }
    });
    await ci({ actor: n, mutations: u.mutations, runtime: c });
    const d = Number(u.packet.burnDelta ?? l.burnDelta) || 0;
    if (d) {
      const T = Math.max(0, Number(((y = (g = n.system) == null ? void 0 : g.burn) == null ? void 0 : y.value) ?? 0) + d), C = { "system.burn.value": T };
      T === 0 && ((S = (b = n.system) == null ? void 0 : b.burn) != null && S.overloaded) && (C["system.burn.overloaded"] = !1), await n.update(C);
    }
    for (const T of u.packet.edgeAdjustments ?? []) {
      const C = Number((T == null ? void 0 : T.amount) ?? 0) || 0;
      !C || !(T != null && T.poolKey) || (C > 0 ? await n.gainEdge(T.poolKey, C, { skipTraitHooks: !0, source: "endOfActivationTrait" }) : await n.spendEdge(T.poolKey, Math.abs(C), { skipTraitHooks: !0, source: "endOfActivationTrait" }));
    }
  }
  static async _onUpdateCombat(e, t) {
    if (Object.prototype.hasOwnProperty.call(t ?? {}, "turn") || Object.prototype.hasOwnProperty.call(t ?? {}, "round")) {
      const n = this._lastActivationByCombat.get(e == null ? void 0 : e.id) ?? null, s = typeof n == "string" ? n : (n == null ? void 0 : n.combatantId) ?? null, r = this.getActivationIdentity(e, e == null ? void 0 : e.combatant), o = n && typeof n == "object" ? !rn(n, r) : s && s !== r.combatantId;
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
    if (foundry.utils.hasProperty(t, `flags.${qe}.${Ke}`)) {
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
    Cs(e) && (await Ms(e), await this._syncAllSceneHazards((e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null));
  }
  static async _onUpdateRegion(e) {
    Cs(e) && (await Ms(e), await this._syncAllSceneHazards((e == null ? void 0 : e.parent) ?? (canvas == null ? void 0 : canvas.scene) ?? null));
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
        Cs(t) && await Ms(t);
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
    Un(n.hazards);
    const s = Go(t), r = new Map(
      s.map((h) => {
        const g = Pi(h);
        return g ? [String(h.id ?? "").trim(), { region: h, flag: g }] : null;
      }).filter(Boolean)
    ), o = [], l = [];
    await this.updateCombatantState(i, {
      token: t,
      mutate: (h) => {
        var g, y, b, S, T;
        h.hazards ?? (h.hazards = {});
        for (const [C, { flag: N }] of r.entries()) {
          if (h.hazards[C]) continue;
          const P = {
            tier: De((g = N == null ? void 0 : N.hazardDef) == null ? void 0 : g.startExposure, te.minor),
            turnsExposed: 0,
            evadeLocked: !1,
            lastProcessedRound: 0
          };
          h.hazards[C] = P, o.push({ regionId: C, flag: N, hazardState: P });
        }
        for (const [C, N] of Object.entries(h.hazards ?? {})) {
          if (r.has(C)) continue;
          const P = Pi((S = (b = (y = canvas == null ? void 0 : canvas.scene) == null ? void 0 : y.regions) == null ? void 0 : b.get) == null ? void 0 : S.call(b, C)) ?? null;
          ((T = P == null ? void 0 : P.hazardDef) == null ? void 0 : T.clearOnExit) !== !1 && (delete h.hazards[C], l.push({ regionId: C, hazardState: N, flag: P }));
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
      await ChatMessage.create(Yo({
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
      Go(i).map((d) => {
        const m = Pi(d);
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
    if (!(s > 0 && (i + 1) % n === 0)) return De(e == null ? void 0 : e.tier, te.none);
    let o = De(e == null ? void 0 : e.tier, te.none);
    for (let m = 0; m < s; m += 1)
      if (o = $d(o, 1), ki(o) >= ki(((u = t == null ? void 0 : t.escalation) == null ? void 0 : u.max) ?? te.full)) {
        o = De((d = t == null ? void 0 : t.escalation) == null ? void 0 : d.max, te.full);
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
    const c = De(s == null ? void 0 : s.tier, te.none), u = De(o, c), d = l && c !== te.none && !(s != null && s.evadeLocked) ? this.getReactionSpendPreview(e, { token: t }) : null, m = {
      kind: "hazard",
      eventType: r,
      regionId: String((i == null ? void 0 : i.id) ?? "").trim(),
      regionName: String((n == null ? void 0 : n.label) ?? (i == null ? void 0 : i.name) ?? "Hazard").trim() || "Hazard",
      actorUuid: e.uuid,
      tokenUuid: (t == null ? void 0 : t.uuid) ?? ((h = t == null ? void 0 : t.document) == null ? void 0 : h.uuid) ?? null,
      actorName: e.name ?? "Target",
      turnsExposed: Math.max(0, Number((s == null ? void 0 : s.turnsExposed) ?? 0) || 0),
      baseDamage: Math.max(0, Number((n == null ? void 0 : n.damage) ?? 0) || 0),
      damageBefore: Wi(Number((n == null ? void 0 : n.damage) ?? 0) || 0, c),
      damageAfter: Wi(
        Number((n == null ? void 0 : n.damage) ?? 0) || 0,
        l && !(s != null && s.evadeLocked) ? Ks(c, 1) : c
      ),
      damageType: String((n == null ? void 0 : n.damageType) ?? "concussive").trim() || "concussive",
      ap: Math.max(0, Number((n == null ? void 0 : n.ap) ?? 0) || 0),
      onFullBurnDelta: Math.max(0, Number(((y = (g = n == null ? void 0 : n.hazardDef) == null ? void 0 : g.onFull) == null ? void 0 : y.burnDelta) ?? 0) || 0),
      source: String((n == null ? void 0 : n.label) ?? (i == null ? void 0 : i.name) ?? "Hazard").trim() || "Hazard",
      nextTier: u,
      exposure: {
        initialTier: c,
        finalTier: c,
        initialLabel: kt(c),
        finalLabel: kt(c),
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
    }, f = await Jc(m, { actor: e, token: t }), p = await ChatMessage.create(Yo({
      speaker: ChatMessage.getSpeaker({ actor: e, token: t }),
      content: f,
      flags: {
        mwd: {
          hazardCard: m
        }
      }
    }));
    return p && d && c !== te.none && !(s != null && s.evadeLocked) && await this.setPendingReaction(e, {
      token: t,
      pendingReaction: {
        type: "evade",
        sourceKind: "hazard",
        sourceId: String((i == null ? void 0 : i.id) ?? "").trim() || null,
        messageId: p.id,
        exposureBefore: c,
        exposureAfterPreview: Ks(c, 1),
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
    const n = (i == null ? void 0 : i.actor) ?? null, s = n ? this.getSnapshot(n, { token: i }) : null, r = Object.values((s == null ? void 0 : s.hazards) ?? {}), o = zf(r);
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
_(oa, "_targetRefreshTimeout", null), _(oa, "_pendingTokenPositions", /* @__PURE__ */ new Map()), _(oa, "_lastActivationByCombat", /* @__PURE__ */ new Map());
let B = oa;
function or(a) {
  var i, n, s, r, o, l;
  const e = Math.max(0, Number(((s = (n = (i = a == null ? void 0 : a.system) == null ? void 0 : i.attributes) == null ? void 0 : n.reflexes) == null ? void 0 : s.value) ?? 0) || 0), t = Math.max(0, Number(((l = (o = (r = a == null ? void 0 : a.system) == null ? void 0 : r.attributes) == null ? void 0 : o.willpower) == null ? void 0 : l.value) ?? 0) || 0);
  return yi + Math.floor((e + t) / 2);
}
function on(a, e) {
  var t;
  return Math.max(0, or(a) - Math.max(0, Number(((t = e == null ? void 0 : e.state) == null ? void 0 : t.saSpentThisActivation) ?? 0) || 0));
}
const lr = Object.freeze([
  Object.freeze({ key: "close", label: "Close", min: 0, max: 5, baseDn: 2 }),
  Object.freeze({ key: "near", label: "Near", min: 6, max: 26, baseDn: 3 }),
  Object.freeze({ key: "far", label: "Far", min: 27, max: 62, baseDn: 4 }),
  Object.freeze({ key: "extreme", label: "Extreme", min: 63, max: 120, baseDn: 5 })
]), Ff = new Map(lr.map((a) => [a.key, a]));
function ln(a, e) {
  const t = Number(a);
  return !Number.isFinite(t) || t <= 0 ? e : Math.max(0, Math.trunc(t));
}
function ss(a = "") {
  return Ff.get(String(a ?? "").trim().toLowerCase()) ?? null;
}
function Wn(a = "") {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return "Out of Range";
  const e = ss(a);
  return e ? `${e.label} ${e.min}-${e.max} m` : String(a ?? "").trim() || "Range";
}
function rs(a = "") {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return "Out of Range";
  const e = ss(a);
  return e ? e.label : String(a ?? "").trim() || "Range";
}
function Hf(a = "", e = 1) {
  if (String(a ?? "").trim().toLowerCase() === "outofrange") return 6;
  const t = ss(a);
  return Number.isFinite(Number(t == null ? void 0 : t.baseDn)) ? Number(t.baseDn) : e;
}
function co(a = {}) {
  return {
    max: String((a == null ? void 0 : a.max) ?? "").trim().toLowerCase() || "extreme",
    close: ln((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short), 5),
    near: ln((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium), 26),
    far: ln((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long), 62),
    extreme: ln(a == null ? void 0 : a.extreme, 120)
  };
}
function Uf(a, e = {}, t = "close") {
  var u;
  const i = Number(a);
  if (!Number.isFinite(i) || i < 0)
    return String(t ?? "close").trim().toLowerCase() || "close";
  const n = co(e), s = ((u = ss(n.max)) == null ? void 0 : u.key) ?? "extreme", r = lr.findIndex((d) => d.key === s), o = Number((n == null ? void 0 : n[s]) ?? NaN);
  if (Number.isFinite(o) && i > o)
    return "outOfRange";
  let l = "extreme";
  i <= n.close ? l = "close" : i <= n.near ? l = "near" : i <= n.far && (l = "far");
  const c = lr.findIndex((d) => d.key === l);
  return r >= 0 && c > r ? s : l;
}
const ua = "lifeModuleCatalog", os = Object.freeze([
  { moduleType: "faction", label: "Faction" },
  { moduleType: "childhood", label: "Childhood" },
  { moduleType: "higherEducation", label: "Higher Education" },
  { moduleType: "realLife", label: "Real Life" }
]), Wf = Object.freeze(
  Object.fromEntries(os.map((a) => [a.moduleType, a.label]))
), jf = new Set(os.map((a) => a.moduleType)), Gf = /* @__PURE__ */ new Set(["skill", "edgePool"]), uo = Object.freeze({
  grit: "Grit",
  chaos: "Chaos",
  insight: "Insight",
  rumor: "Rumor",
  legend: "Legend",
  credibility: "Credibility"
}), Xc = Object.freeze(Object.keys(uo)), qf = Object.freeze({
  skill: "Skill",
  edgePool: "Edge Pool"
}), Kf = Object.freeze(Zf()), Vf = Object.freeze(ep()), Yf = /* @__PURE__ */ new Set(["artillery", "gunnery", "piloting", "heavyWeapons"]), Qf = /* @__PURE__ */ new Set([
  "artillery",
  "gunnery",
  "heavyWeapons",
  "meleeCombat",
  "piloting",
  "projectileWeapons",
  "firearms"
]), Jf = Object.freeze(
  Zt.map((a) => a.code).filter((a) => !Qf.has(a))
), Xf = Object.freeze(Yi([
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
        ...Jf.map((a) => ({ type: "skill", value: a })),
        ...Xc.map((a) => ({ type: "edgePool", value: a }))
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
    skillChoices: Zt.map((a) => a.code).filter((a) => !Yf.has(a)),
    excludesAny: [
      "higher-education-military-enlistment",
      "higher-education-military-academy",
      "higher-education-family-training",
      "higher-education-officer-candidate-school"
    ]
  }
], { strict: !1 }));
function Zf() {
  const a = /* @__PURE__ */ new Map();
  for (const e of Zt) {
    const t = String(e.code ?? "").trim(), i = String(e.label ?? "").trim();
    t && (a.set(t.toLowerCase(), t), i && a.set(i.toLowerCase(), t));
  }
  return a;
}
function ep() {
  const a = /* @__PURE__ */ new Map();
  for (const [e, t] of Object.entries(uo))
    a.set(e.toLowerCase(), e), a.set(t.toLowerCase(), e), a.set(`${t.toLowerCase()} pool`, e);
  return a;
}
function tp(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid life module data.");
  return t.validationErrors = e, t;
}
function Zc(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
function Ja(a) {
  return String(a ?? "").trim().toLowerCase().replace(/['\u2019]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function ls(a) {
  const e = String(a ?? "").trim();
  return jf.has(e) ? e : "";
}
function cs(a) {
  const e = String(a ?? "").trim();
  return e ? Kf.get(e.toLowerCase()) ?? "" : "";
}
function ip(a) {
  const e = String(a ?? "").trim();
  return e ? Vf.get(e.toLowerCase()) ?? "" : "";
}
function ap(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const r of Zc(a)) {
    const o = cs(r);
    if (!o) {
      e && t.push(`${i}: unknown skill "${r}".`);
      continue;
    }
    n.has(o) || (n.add(o), s.push(o));
  }
  return s;
}
function Qo(a) {
  const e = /* @__PURE__ */ new Set();
  return Zc(a).map(Ja).filter((t) => !t || e.has(t) ? !1 : (e.add(t), !0));
}
function Jo(a = [], e = /* @__PURE__ */ new Map()) {
  return a.map((t) => {
    var i;
    return ((i = e.get(t)) == null ? void 0 : i.label) ?? t;
  });
}
function ga(a = {}) {
  return `${a.type}:${a.value}`;
}
function np(a) {
  var e;
  return ((e = Et(a)) == null ? void 0 : e.label) ?? a;
}
function eu(a) {
  return uo[a] ?? a;
}
function sp(a) {
  return qf[a] ?? a;
}
function rp(a = {}, { includeTypePrefix: e = !1 } = {}) {
  const t = String((a == null ? void 0 : a.type) ?? "").trim(), i = String((a == null ? void 0 : a.value) ?? "").trim();
  if (!t || !i) return "";
  const n = t === "skill" ? np(i) : `${eu(i)} Pool`;
  return e ? `${sp(t)}: ${n}` : n;
}
function Ha(a = {}, { includeBonusText: e = !1, includeTypePrefix: t = !1 } = {}) {
  const i = rp(a, { includeTypePrefix: t });
  return i ? e ? a.type === "skill" ? `+1 ${i} rolls` : `+1 ${i}` : i : "";
}
function op(a) {
  const e = String(a ?? "").trim(), t = e.indexOf(":");
  return t < 0 ? null : {
    type: e.slice(0, t).trim(),
    value: e.slice(t + 1).trim()
  };
}
function lp(a, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: n = "Bonus" } = {}) {
  const s = typeof a == "string" ? op(a) : a, r = String((s == null ? void 0 : s.type) ?? "").trim(), o = String((s == null ? void 0 : s.value) ?? "").trim();
  if (!Gf.has(r))
    return e && t.push(`${i} ${n}: unknown bonus type "${r || a}".`), null;
  const l = r === "skill" ? cs(o) : ip(o);
  return l ? {
    type: r,
    value: l
  } : (e && t.push(`${i} ${n}: unknown ${r === "skill" ? "skill" : "edge pool"} "${o}".`), null);
}
function cr(a, { strict: e = !1, errors: t = [], prefix: i = "Entry", grantLabel: n = "Bonus" } = {}) {
  const s = /* @__PURE__ */ new Set(), r = [], o = Array.isArray(a) ? a : [];
  for (const l of o) {
    const c = lp(l, { strict: e, errors: t, prefix: i, grantLabel: n });
    if (!c) continue;
    const u = ga(c);
    s.has(u) || (s.add(u), r.push(c));
  }
  return r;
}
function tu(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = ap(a, { strict: e, errors: t, prefix: i });
  return n.length ? [{
    id: "skill",
    label: "",
    choices: n.map((s) => ({ type: "skill", value: s }))
  }] : [];
}
function cp(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  const n = String(a ?? "").trim();
  return n ? n.split(";").map((r) => r.trim()).filter(Boolean).map((r, o) => {
    const l = `Bonus ${o + 1}`, c = cr(
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
function iu(a, e = "grant") {
  return Ja(a) || e;
}
function up(a, e, { strict: t = !1, errors: i = [], prefix: n = "Entry" } = {}) {
  const s = `grant-${e + 1}`, r = `Bonus ${e + 1}`;
  if (typeof a == "string") {
    const u = cr(
      a.split("|").map((d) => d.trim()).filter(Boolean),
      { strict: t, errors: i, prefix: n, grantLabel: r }
    );
    return u.length ? { id: s, label: "", choices: u } : null;
  }
  const o = iu(a == null ? void 0 : a.id, s), l = String((a == null ? void 0 : a.label) ?? "").trim(), c = cr(a == null ? void 0 : a.choices, { strict: t, errors: i, prefix: n, grantLabel: r });
  return c.length ? { id: o, label: l, choices: c } : (t && i.push(`${n} ${r}: define at least one bonus choice.`), null);
}
function dp(a, { strict: e = !1, errors: t = [], prefix: i = "Entry" } = {}) {
  if (Array.isArray(a)) {
    if (a.every((s) => typeof s == "string" && !String(s).includes(":")))
      return tu(a, { strict: e, errors: t, prefix: i });
    const n = /* @__PURE__ */ new Set();
    return a.map((s, r) => up(s, r, { strict: e, errors: t, prefix: i })).filter((s) => s ? n.has(s.id) ? (e && t.push(`${i}: duplicate bonus id "${s.id}".`), !1) : (n.add(s.id), !0) : !1);
  }
  return typeof a == "string" ? cp(a, { strict: e, errors: t, prefix: i }) : [];
}
function mp(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => (Array.isArray(e == null ? void 0 : e.choices) ? e.choices : []).map((i) => `${i.type}:${i.value}`).join("|")).filter(Boolean).join("; ");
}
function mo() {
  return foundry.utils.deepClone(Xf);
}
function ya(a) {
  return Wf[a] ?? (String(a ?? "").trim() || "Life Module");
}
function au() {
  return os.map((a) => ({
    value: a.moduleType,
    label: a.label
  }));
}
function Yi(a = [], { strict: e = !1 } = {}) {
  const t = Array.isArray(a) ? a : [], i = [], n = /* @__PURE__ */ new Set(), s = t.map((o, l) => {
    const c = `Entry ${l + 1}`, u = String((o == null ? void 0 : o.label) ?? "").trim(), d = Ja((o == null ? void 0 : o.id) ?? u), m = ls(o == null ? void 0 : o.moduleType), f = (o == null ? void 0 : o.grants) != null ? dp(o.grants, { strict: e, errors: i, prefix: c }) : tu(o == null ? void 0 : o.skillChoices, { strict: e, errors: i, prefix: c }), p = Qo(o == null ? void 0 : o.requiresAny), h = Qo(o == null ? void 0 : o.excludesAny);
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
  if (e && i.length) throw tp(i);
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
function nu(a = []) {
  const e = new Map(mo().map((s) => [s.id, s])), t = Yi(a, { strict: !1 }), i = [...t], n = new Set(t.map((s) => s.id));
  for (const [s, r] of e.entries())
    n.has(s) || i.push(foundry.utils.deepClone(r));
  return i;
}
async function fp() {
  var a, e, t;
  try {
    if (!((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${w}.${ua}`))) return;
    const i = game.settings.get(w, ua), n = nu(i);
    JSON.stringify(i) !== JSON.stringify(n) && await game.settings.set(w, ua, n);
  } catch {
  }
}
function pp() {
  var a, e, t;
  try {
    if ((t = (e = (a = game == null ? void 0 : game.settings) == null ? void 0 : a.settings) == null ? void 0 : e.has) != null && t.call(e, `${w}.${ua}`))
      return nu(game.settings.get(w, ua));
  } catch {
  }
  return mo();
}
function us() {
  return Yi(pp(), { strict: !1 });
}
function Mi(a) {
  const e = Ja(a);
  return e ? us().find((t) => t.id === e) ?? null : null;
}
function fo(a) {
  const e = ls(a);
  return us().filter((t) => t.moduleType === e);
}
function su(a) {
  return !a || typeof a != "object" || Array.isArray(a) ? {} : Object.fromEntries(
    Object.entries(a).map(([e, t]) => [iu(e, ""), String(t ?? "").trim()]).filter(([e]) => !!e)
  );
}
function ru(a, e = "", { legacySelectedSkill: t = "" } = {}) {
  const i = new Set((Array.isArray(a == null ? void 0 : a.choices) ? a.choices : []).map(ga)), n = String(e ?? "").trim();
  if (i.has(n)) return n;
  if (t) {
    const s = cs(t), r = s ? `skill:${s}` : "";
    if (r && i.has(r)) return r;
  }
  return i.size === 1 ? Array.from(i)[0] : "";
}
function ou(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(a == null ? void 0 : a.grants) ? a.grants : [], n = su(e);
  return Object.fromEntries(
    i.map((s) => [
      s.id,
      ru(s, n[s.id], { legacySelectedSkill: t })
    ])
  );
}
function ds(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  const i = Array.isArray(a == null ? void 0 : a.grants) ? a.grants : [], n = ou(a, e, { legacySelectedSkill: t });
  return i.map((s, r) => {
    const o = ru(s, n[s.id], { legacySelectedSkill: t }), l = (Array.isArray(s.choices) ? s.choices : []).find((c) => ga(c) === o) ?? null;
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
function hp(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  var i;
  return ((i = ds(a, e, { legacySelectedSkill: t }).map((n) => n.choice).find((n) => (n == null ? void 0 : n.type) === "skill")) == null ? void 0 : i.value) ?? "";
}
function Ua(a = {}) {
  const e = foundry.utils.deepClone(a ?? {}), t = Ja(e.catalogId), i = t ? Mi(t) : null, n = ls(e.moduleType || (i == null ? void 0 : i.moduleType)), s = i ? ou(i, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }) : su(e.selectedGrants);
  return e.moduleType = n, e.catalogId = t, e.selectedGrants = s, e.selectedSkill = i ? hp(i, s, { legacySelectedSkill: e.selectedSkill }) : cs(e.selectedSkill), e;
}
function lu(a, e = {}, { legacySelectedSkill: t = "" } = {}) {
  return ds(a, e, { legacySelectedSkill: t }).map((i) => {
    var l, c;
    const n = Array.isArray((c = (l = a == null ? void 0 : a.grants) == null ? void 0 : l[i.index]) == null ? void 0 : c.choices) ? a.grants[i.index].choices : [], s = new Set(n.map((u) => u.type)).size > 1, r = n.map((u) => ({
      value: ga(u),
      label: Ha(u, { includeTypePrefix: s }),
      selected: ga(u) === i.selectedKey
    })), o = r.length === 1 ? {
      value: r[0].value,
      label: r[0].label,
      displayLabel: Ha(n[0], { includeBonusText: !0 })
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
function gp(a, e) {
  return a.isDuplicate ? `Duplicate ${ya(a.moduleType)} slot item.` : a.catalog ? a.unresolvedGrantCount > 0 ? "Choose valid bonus options." : a.excludedBy.length ? `Blocked by ${Jo(a.excludedBy, e).join(", ")}.` : a.requiresAny.length && !a.matchedRequirementIds.length ? `Requires ${Jo(a.requiresAny, e).join(" or ")}.` : "" : "Catalog entry is missing or unlinked.";
}
function yp(a, e = [], t = {}) {
  var n, s, r;
  if (!a || !Array.isArray(e) || !e.length) return [];
  const i = Math.max(0, Number(((r = (s = (n = a.system) == null ? void 0 : n.attributes) == null ? void 0 : s.edge) == null ? void 0 : r.value) ?? 0));
  return e.filter((o) => (o == null ? void 0 : o.type) === "edgePool").map((o) => {
    var p, h, g, y;
    const l = String(o.value ?? "").trim(), c = eu(l), u = Math.max(0, Number(((y = (g = (h = (p = a.system) == null ? void 0 : p.counters) == null ? void 0 : h.edgePools) == null ? void 0 : g[l]) == null ? void 0 : y.rating) ?? 0)), d = Math.max(0, Number((t == null ? void 0 : t[l]) ?? 0)), m = Math.max(0, u + d - i);
    return m ? `${c} Pool bonus loses ${m} ${m === 1 ? "point" : "points"} to the Edge cap.` : "";
  }).filter(Boolean);
}
function Ni(a) {
  var m;
  const e = us(), t = new Map(e.map((f) => [f.id, f])), i = Array.from((a == null ? void 0 : a.items) ?? []).filter((f) => f.type === A.itemType.lifeModule), n = /* @__PURE__ */ new Map();
  for (const f of i) {
    const p = ls((m = f.system) == null ? void 0 : m.moduleType);
    !p || n.has(p) || n.set(p, f.id);
  }
  const s = i.map((f) => {
    var C;
    const p = Ua(f.system ?? {}), h = t.get(p.catalogId) ?? null, g = p.moduleType || (h == null ? void 0 : h.moduleType) || "", y = h ? ds(h, p.selectedGrants, { legacySelectedSkill: p.selectedSkill }) : [], b = y.map((N) => N.choice).filter(Boolean), S = ((C = b.find((N) => N.type === "skill")) == null ? void 0 : C.value) ?? "", T = S ? Et(S) : null;
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
      selectedChoiceLabels: b.map((N) => Ha(N, { includeBonusText: !0 })),
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
  const l = Object.fromEntries(Zt.map((f) => [f.code, 0])), c = Object.fromEntries(Xc.map((f) => [f, 0])), u = /* @__PURE__ */ new Map();
  for (const f of s) {
    const p = f.isActive ? f.selectedChoices : [], h = p.filter((y) => y.type === "skill"), g = p.filter((y) => y.type === "edgePool");
    f.bonus = h.length;
    for (const y of h)
      l[y.value] = Number(l[y.value] ?? 0) + 1;
    for (const y of g)
      c[y.value] = Number(c[y.value] ?? 0) + 1;
    f.inactiveReason = f.isActive ? "" : gp(f, t), u.set(f.itemId, f);
  }
  for (const f of s)
    f.warningLabels = f.isActive ? yp(a, f.selectedChoices, c) : [];
  const d = os.map((f) => {
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
function bp(a = {}) {
  var t, i, n;
  const e = String((a == null ? void 0 : a.intent) ?? "").trim();
  return e === "skill" ? String(((t = a == null ? void 0 : a.data) == null ? void 0 : t.skillKey) ?? "").trim() : e === "attack" ? String(((n = (i = a == null ? void 0 : a.attack) == null ? void 0 : i.skill) == null ? void 0 : n.code) ?? "").trim() : "";
}
function Sp({ actor: a, resolved: e } = {}) {
  const t = bp(e);
  return !a || !t ? [] : Ni(a).states.flatMap(
    (i) => i.isActive ? i.selectedChoices.filter((n) => n.type === "skill" && n.value === t).map((n) => ({
      id: `life-module:${i.itemId}:${ga(n)}`,
      label: i.label,
      value: 1,
      source: "Life Module",
      tooltip: `${i.label}: +1 to ${Ha(n)} rolls`
    })) : []
  );
}
const Ap = {
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
}, wp = {
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
}, ms = {
  Actor: Ap,
  Item: wp
}, Xo = Object.freeze({
  Actor: /* @__PURE__ */ new Set(["prototypeToken"]),
  Item: /* @__PURE__ */ new Set()
});
function Wa(a) {
  return !!a && typeof a == "object" && !Array.isArray(a);
}
function ba(a) {
  return typeof structuredClone == "function" ? structuredClone(a) : JSON.parse(JSON.stringify(a));
}
function ja(a = {}, e = {}) {
  const t = ba(a);
  for (const [i, n] of Object.entries(e ?? {})) {
    if (Wa(n) && Wa(t[i])) {
      t[i] = ja(t[i], n);
      continue;
    }
    t[i] = ba(n);
  }
  return t;
}
function cu(a = "", e = ms) {
  const t = e == null ? void 0 : e[a];
  return Wa(t) ? t : {};
}
function uu(a = ms, e = "", t = "", i = /* @__PURE__ */ new Set()) {
  var c;
  const n = String(t ?? "").trim();
  if (!n || i.has(n)) return {};
  const s = cu(e, a), r = (c = s == null ? void 0 : s.templates) == null ? void 0 : c[n];
  if (!Wa(r)) return {};
  i.add(n);
  let o = {};
  for (const u of Array.from(r.templates ?? []))
    o = ja(
      o,
      uu(a, e, u, i)
    );
  const l = ba(r);
  return delete l.templates, ja(o, l);
}
function Tp(a = ms, e = "", t = "") {
  const i = String(t ?? "").trim();
  if (!i) return {};
  const n = cu(e, a), s = n == null ? void 0 : n[i];
  if (!Wa(s)) return {};
  let r = {};
  for (const l of Array.from(s.templates ?? []))
    r = ja(
      r,
      uu(a, e, l)
    );
  const o = ba(s);
  return delete o.templates, ja(r, o);
}
function vp(a = "", e = "", t = ms) {
  const i = Tp(t, a, e), n = Xo[a] ?? Xo.Item, s = { system: {} };
  for (const [r, o] of Object.entries(i))
    n.has(r) ? s[r] = ba(o) : s.system[r] = ba(o);
  return s;
}
async function du(a = "", e = "") {
  return vp(a, e);
}
const mu = Object.freeze({
  weapon: A.itemType.personalWeapon,
  shadowamp: A.itemType.assetModule
}), kp = Object.freeze({
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
function fu(a) {
  return mu[a] ?? a;
}
function Ep(a) {
  return kp[fu(a)];
}
function Mp(a) {
  return Object.prototype.hasOwnProperty.call(mu, a);
}
const qi = Object.freeze(["close", "near", "far", "extreme"]), Zo = Object.freeze({
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
});
function Ea() {
  return foundry.data.operators.ForcedDeletion;
}
function Cp(a, e) {
  const t = String(e ?? "").split(".").map((n) => n.trim()).filter(Boolean);
  if (!a || typeof a != "object" || t.length < 2) return a;
  let i = a;
  for (let n = 0; n < t.length - 1; n += 1) {
    const s = t[n], r = i == null ? void 0 : i[s];
    (!r || typeof r != "object" || Array.isArray(r)) && (i[s] = {}), i = i[s];
  }
  return a;
}
function Pp(a, e) {
  const t = String(e ?? "").trim();
  if (!a || typeof a != "object" || !t) return !1;
  if (t.startsWith("areaEffect.hazard.")) {
    (!a.areaEffect || typeof a.areaEffect != "object" || Array.isArray(a.areaEffect)) && (a.areaEffect = {});
    const i = String(a.areaEffect.kind ?? "").trim().toLowerCase();
    if (i && i !== "persistent")
      return !1;
    a.areaEffect.kind = "persistent";
  }
  return Cp(a, t), !0;
}
function Ma(a) {
  return wa(a);
}
function el(a = {}) {
  const e = Xl({
    traits: a.traits,
    keywords: a.keywords,
    report: Wr(),
    path: "system.traits"
  });
  return {
    traits: e.traits,
    keywords: e.keywords
  };
}
function pu(a) {
  return a === "long" ? "extreme" : a === "short" ? "close" : a === "medium" ? "near" : qi.includes(a) ? a : "near";
}
function ia(a) {
  const e = co(a);
  return e.max = pu(e.max ?? (a == null ? void 0 : a.max) ?? "extreme"), e;
}
function Ps(a) {
  return {
    close: Number((a == null ? void 0 : a.close) ?? (a == null ? void 0 : a.short) ?? 0) || 0,
    near: Number((a == null ? void 0 : a.near) ?? (a == null ? void 0 : a.medium) ?? 0) || 0,
    far: Number((a == null ? void 0 : a.far) ?? (a == null ? void 0 : a.long) ?? 0) || 0,
    extreme: Number((a == null ? void 0 : a.extreme) ?? 0) || 0
  };
}
function tl(a, e = 1) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function il(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.max(0, Math.trunc(t)) : Math.max(0, Math.trunc(Number(e) || 0));
}
function al(a) {
  return String(a ?? "").trim();
}
function nl(a) {
  return (Array.isArray(a) ? a : typeof a == "string" ? a.split(",") : []).map((t) => String(t ?? "").trim()).filter(Boolean);
}
function Np(a) {
  const e = qi.indexOf(a);
  return e >= 0 ? e : qi.indexOf("near");
}
function Rp(a = ia({})) {
  const e = ["near", "close", "far", "extreme"], t = Np(a.max);
  return e.find((i) => qi.indexOf(i) <= t) ?? "close";
}
function Ip(a) {
  const e = pu(a == null ? void 0 : a.max), t = qi.indexOf(e);
  return qi.map((i, n) => ({
    key: i,
    allowed: t >= 0 ? n <= t : n === 0,
    value: (a == null ? void 0 : a[i]) ?? void 0,
    labelkey: Wn(i)
  }));
}
function Dp(a, e, t, i) {
  let n = Number(e);
  if (t)
    if (i !== void 0)
      n += Math.ceil(Number(i) / 2);
    else
      return console.warn("Weapon not attached to an actor"), Pe.item.personalWeapon.weaponWithoutActor;
  return n;
}
function Op(a, e, t) {
  let i = "";
  return t && Pe.attributes[t] && (i += Pe.attributes[t].substring(0, 3).toUpperCase() + "/2 + "), i += String(e), i;
}
function _p(a, e) {
  return z.useArmor(a) ? e ? "noArmor" : "withArmor" : "";
}
function sl(a) {
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
function Ns(a = {}) {
  const e = Ua(a), t = Mi(e.catalogId);
  return {
    system: e,
    ...t ? { name: t.label } : {}
  };
}
function xp(a) {
  const e = String(a ?? "").trim();
  return !!(!e || e.startsWith("icons/svg/") || e === "icons/mystery-man.svg");
}
var qa, Ft, ur, hu, Tn;
const Ve = class Ve extends Item {
  static init() {
    H(this, qa) || (Ie(this, qa, !0), Hooks.on("createItem", (e, t, i) => {
      var n, s;
      Promise.resolve((n = e.onCreateItem) == null ? void 0 : n.call(e, t, i)).catch((r) => {
        console.error(`${Se}Item create hook failed`, r);
      }), v(s = Ve, Ft, ur).call(s, e);
    }), Hooks.on("updateItem", (e) => {
      var t;
      v(t = Ve, Ft, ur).call(t, e);
    }), Hooks.on("deleteItem", (e) => {
      var t;
      v(t = Ve, Ft, hu).call(t, e);
    }), Hooks.on("createActiveEffect", (e) => {
      var t;
      v(t = Ve, Ft, Tn).call(t, e);
    }), Hooks.on("updateActiveEffect", (e) => {
      var t;
      v(t = Ve, Ft, Tn).call(t, e);
    }), Hooks.on("deleteActiveEffect", (e) => {
      var t;
      v(t = Ve, Ft, Tn).call(t, e);
    }));
  }
  static canonicalType(e) {
    return fu(e);
  }
  static defaultIconForType(e) {
    return Ep(e);
  }
  get canonicalType() {
    return this.constructor.canonicalType(this.type);
  }
  async onCreateItem(e, t) {
  }
  async _preCreate(e, t, i) {
    super._preCreate && await super._preCreate(e, t, i);
    const n = (e == null ? void 0 : e.type) ?? this.type, s = this.constructor.canonicalType(n), r = {}, o = await du("Item", s);
    if (o.system && Object.keys(o.system).length && (r.system = foundry.utils.mergeObject(
      foundry.utils.deepClone(o.system),
      foundry.utils.deepClone((e == null ? void 0 : e.system) ?? this.system ?? {}),
      { inplace: !1, recursive: !0, overwrite: !0 }
    )), n !== s && Mp(n) && (r.type = s), xp((e == null ? void 0 : e.img) ?? this.img)) {
      const l = this.constructor.defaultIconForType(s);
      l && (r.img = l);
    }
    if (s === A.itemType.lifeModule && (!(e != null && e.name) || e.name === "DOCUMENT.Item") && (r.name = "MWD.itemType.singular.lifeModule"), s === A.itemType.lifeModule) {
      const l = Ns(r.system ?? (e == null ? void 0 : e.system) ?? this.system ?? {});
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
      const u = n.ammo, d = el(n);
      e.system.standardTraits = [], e.system.payloads = ni(n.payloads, { legacyAmmo: u, category: n.category }), e.system.consumptionSources = Pa(n.consumptionSources, { legacyAmmo: u }), e.system.selectedPayloadId = ta(
        n.selectedPayloadId,
        e.system.payloads,
        { legacyAmmo: u, category: n.category }
      ), e.system.traits = d.traits, e.system.keywords = d.keywords, e.system.resolution = pn(n.resolution, "standard"), e.system.fireModes = hn(n.fireModes), e.system.attackRatingBand = Ps(n.attackRatingBand), e.system.range = ia(n.range), e.system.damageType = Ut(n.damageType), e.system.ammo = Ea();
    }
    if (n && this.isArmor() && (e.system ?? (e.system = {}), e.system.mitigationByType = Qt(n.mitigationByType ?? n.mitigation), e.system.tags = fn(n.tags), e.system.traits = Ma(n.traits), e.system.standardTraits = ai(n.standardTraits), e.system.traitState = Ts({
      standardTraits: e.system.standardTraits,
      traits: e.system.traits,
      traitState: n.traitState
    }).traitState), n && this.isLifeModule()) {
      const u = Ns(n);
      e.system ?? (e.system = {}), foundry.utils.mergeObject(e.system, u.system, { inplace: !0, overwrite: !0 }), u.name && (e.name = u.name);
      return;
    }
    if (n && this.isQuality()) {
      e.system ?? (e.system = {});
      const u = zt(n);
      foundry.utils.mergeObject(e.system, u, { inplace: !0, overwrite: !0 });
      return;
    }
    if (n && this.isQuantityTrackedInventoryItem()) {
      e.system ?? (e.system = {}), e.system.quantity = tl(n.quantity, 1), e.system.rating = il(n.rating, 0), e.system.category = al(n.category), e.system.tags = nl(n.tags);
      return;
    }
    if (!this.isSkill()) return;
    const s = (l = e == null ? void 0 : e.system) == null ? void 0 : l.code;
    if (s === void 0) return;
    const r = this.system.code;
    if (s === r) return;
    const o = sl(s);
    o && ((c = o == null ? void 0 : o.system) == null || delete c.code, foundry.utils.mergeObject(e, o, { inplace: !0 }));
  }
  prepareBaseData() {
    super.prepareBaseData();
    const e = this.canonicalType;
    e === A.itemType.personalWeapon ? this._preparePersonalWeaponBaseData() : e === A.itemType.armor ? this._prepareArmorBaseData() : e === A.itemType.lifeModule ? this._prepareLifeModuleBaseData() : e === A.itemType.quality ? this._prepareQualityBaseData() : [A.itemType.gear, A.itemType.consumable].includes(e) && this._prepareGearBaseData();
  }
  _preparePersonalWeaponBaseData() {
    const e = this.system ?? {}, t = e.ammo;
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = Ut(e.damageType), e.attackRatingBand = Ps(e.attackRatingBand), e.range = ia(e.range);
    const i = el(e);
    e.standardTraits = [], e.traits = i.traits, e.keywords = i.keywords, e.resolution = pn(e.resolution, "standard"), e.fireModes = hn(e.fireModes), e.payloads = ni(e.payloads, { legacyAmmo: t, category: e.category }), e.consumptionSources = Pa(e.consumptionSources, { legacyAmmo: t }), e.selectedPayloadId = ta(e.selectedPayloadId, e.payloads, { legacyAmmo: t, category: e.category }), delete e.ammo, e.notes = String(e.notes ?? "").trim();
  }
  _prepareArmorBaseData() {
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.rating = Math.max(0, Number(e.rating ?? 0)), e.defenseBonus = Number(e.defenseBonus ?? 0) || 0, e.mitigationByType = Qt(e.mitigationByType ?? e.mitigation), delete e.mitigation, e.durability ?? (e.durability = {}), e.durability.max = Math.max(0, Number(e.durability.max ?? e.rating ?? 0)), e.durability.current = Math.min(
      e.durability.max,
      Math.max(0, Number(e.durability.current ?? e.durability.max ?? e.rating ?? 0))
    ), e.standardTraits = ai(e.standardTraits), e.tags = fn(e.tags), e.traits = Ma(e.traits), e.traitState = Ts({
      standardTraits: e.standardTraits,
      traits: e.traits,
      traitState: e.traitState
    }).traitState, e.notes = String(e.notes ?? "").trim();
  }
  _prepareLifeModuleBaseData() {
    const e = Ns(this.system ?? {});
    foundry.utils.mergeObject(this.system, e.system, { inplace: !0, overwrite: !0 });
  }
  _prepareQualityBaseData() {
    const e = zt(this.system ?? {});
    foundry.utils.mergeObject(this.system, e, { inplace: !0, overwrite: !0 });
  }
  _prepareGearBaseData() {
    const e = this.system ?? {};
    e.quantity = tl(e.quantity, 1), e.rating = il(e.rating, 0), e.category = al(e.category), e.tags = nl(e.tags);
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
      const i = (s = (n = t.flags) == null ? void 0 : n[w]) == null ? void 0 : s[Ve.EQUIPPED_EFFECT_FLAG];
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
      const y = (h = (p = (f = g.flags) == null ? void 0 : f[w]) == null ? void 0 : p[Ve.EQUIPPED_EFFECT_FLAG]) == null ? void 0 : h.sourceEffectId;
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
    this.parent && await At.itemAttributeRoll(this, e);
  }
  async switchMonitorCheck(e, t, i, n = void 0) {
    await z.switchMonitorCheck(this.parent, e, t, i, n, this);
  }
  async setCounter(e, t) {
    await z.setCounter(this, e, t);
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
    const t = e(foundry.utils.deepClone(zt(this.system ?? {})));
    await this.update({ system: zt(t) });
  }
  async createQualityPrerequisite(e = {}) {
    await this._mutateQualitySystem((t) => (t.prerequisites = ri(t.prerequisites).concat([{
      id: e.id ?? foundry.utils.randomID(),
      fact: e.fact ?? "",
      comparator: e.comparator ?? "eq",
      value: e.value ?? ""
    }]), t));
  }
  async deleteQualityPrerequisite(e) {
    await this._mutateQualitySystem((t) => (t.prerequisites = ri(t.prerequisites).filter((i) => i.id !== e), t));
  }
  async updateQualityPrerequisite(e, t, i) {
    await this._mutateQualitySystem((n) => (n.prerequisites = ri(n.prerequisites).map((s) => (s.id !== e || (t === "fact" && (s.fact = i), t === "comparator" && (s.comparator = i), t === "value" && (s.value = i)), s)), n));
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
      conditions: ri(e.conditions ?? []),
      limit: Ei(e.limit ?? {})
    }]), t));
  }
  async deleteQualityEffect(e) {
    await this._mutateQualitySystem((t) => (t.effects = xi(t.effects).filter((i) => i.id !== e), t));
  }
  async updateQualityEffect(e, t, i) {
    await this._mutateQualitySystem((n) => (n.effects = xi(n.effects).map((s) => (s.id !== e || (t === "type" && (s.type = i), t === "phase" && (s.phase = i), t === "selector" && (s.selector = i), t === "skillKeys" && (s.skillKeys = Array.isArray(i) ? i : []), t === "label" && (s.label = i), t === "value" && (s.value = Number(i ?? 0) || 0), t === "min" && (s.min = i === "" ? null : Number(i ?? 0)), t === "max" && (s.max = i === "" ? null : Number(i ?? 0)), t === "pool" && (s.pool = i), t === "operation" && (s.operation = i), t === "limit.perActivation" && (s.limit = Ei({ ...s.limit ?? {}, perActivation: i })), t === "limit.perRound" && (s.limit = Ei({ ...s.limit ?? {}, perRound: i })), t === "limit.perScene" && (s.limit = Ei({ ...s.limit ?? {}, perScene: i }))), s)), n));
  }
  async createQualityEffectCondition(e, t = {}) {
    await this._mutateQualitySystem((i) => (i.effects = xi(i.effects).map((n) => (n.id !== e || (n.conditions = ri(n.conditions).concat([{
      id: t.id ?? foundry.utils.randomID(),
      fact: t.fact ?? "",
      comparator: t.comparator ?? "eq",
      value: t.value ?? ""
    }])), n)), i));
  }
  async deleteQualityEffectCondition(e, t) {
    await this._mutateQualitySystem((i) => (i.effects = xi(i.effects).map((n) => (n.id !== e || (n.conditions = ri(n.conditions).filter((s) => s.id !== t)), n)), i));
  }
  async updateQualityEffectCondition(e, t, i, n) {
    await this._mutateQualitySystem((s) => (s.effects = xi(s.effects).map((r) => (r.id !== e || (r.conditions = ri(r.conditions).map((o) => (o.id !== t || (i === "fact" && (o.fact = n), i === "comparator" && (o.comparator = n), i === "value" && (o.value = n)), o))), r)), s));
  }
  async _mutateWeaponStandardTraits(e = (t) => t) {
    var i;
    const t = e(foundry.utils.deepClone(Li((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": Li(t) });
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
    const t = e(foundry.utils.deepClone(ai((i = this.system) == null ? void 0 : i.standardTraits)));
    await this.update({ "system.standardTraits": ai(t) });
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
      ni((n = this.system) == null ? void 0 : n.payloads, {
        legacyAmmo: (s = this.system) == null ? void 0 : s.ammo,
        category: ((r = this.system) == null ? void 0 : r.category) ?? ((o = this.system) == null ? void 0 : o.weaponCategory)
      })
    )).map(st), i = ta((l = this.system) == null ? void 0 : l.selectedPayloadId, t, {
      category: ((c = this.system) == null ? void 0 : c.category) ?? ((u = this.system) == null ? void 0 : u.weaponCategory)
    });
    await this.update({
      "system.payloads": t,
      "system.selectedPayloadId": i,
      "system.ammo": Ea()
    });
  }
  async _mutateConsumptionSources(e = (t) => t) {
    var i, n;
    const t = e(foundry.utils.deepClone(
      Pa((i = this.system) == null ? void 0 : i.consumptionSources, { legacyAmmo: (n = this.system) == null ? void 0 : n.ammo })
    )).map(Kt);
    await this.update({
      "system.consumptionSources": t,
      "system.ammo": Ea()
    });
  }
  async updatePayloadField(e, t, i) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((n) => n.map((s) => s.id !== e ? s : (Pp(s, t) && foundry.utils.setProperty(s, t, i), st(s))));
  }
  async createPayload(e = {}) {
    await this._mutatePayloads((t) => t.concat([st({
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
    const t = ((s = this.system) == null ? void 0 : s.category) ?? ((r = this.system) == null ? void 0 : r.weaponCategory), i = ni((o = this.system) == null ? void 0 : o.payloads, {
      legacyAmmo: (l = this.system) == null ? void 0 : l.ammo,
      category: t
    }).filter((u) => u.id !== e), n = ((c = i[0]) == null ? void 0 : c.id) ?? "unloaded";
    await this.update({
      "system.payloads": i.length ? i : ni([], { category: t }),
      "system.selectedPayloadId": i.some((u) => {
        var d;
        return u.id === ((d = this.system) == null ? void 0 : d.selectedPayloadId);
      }) ? this.system.selectedPayloadId : i.length ? n : "",
      "system.ammo": Ea()
    });
  }
  async createPayloadStandardTrait(e, t = {}) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((n) => n.id !== e ? n : (n.modifies ?? (n.modifies = {}), n.modifies.standardTraits = Li(n.modifies.standardTraits).concat([{
      id: t.id ?? foundry.utils.randomID(),
      key: t.key ?? "armorPiercing",
      rating: Math.max(0, Number(t.rating ?? 0) || 0)
    }]), st(n))));
  }
  async deletePayloadStandardTrait(e, t) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((i) => i.map((n) => n.id !== e ? n : (n.modifies ?? (n.modifies = {}), n.modifies.standardTraits = Li(n.modifies.standardTraits).filter((s) => s.id !== t), st(n))));
  }
  async updatePayloadStandardTrait(e, t, i, n) {
    String(e ?? "").trim() !== "unloaded" && await this._mutatePayloads((s) => s.map((r) => r.id !== e ? r : (r.modifies ?? (r.modifies = {}), r.modifies.standardTraits = Li(r.modifies.standardTraits).map((o) => (o.id !== t || (i === "key" && (o.key = n), i === "rating" && (o.rating = Math.max(0, Number(n ?? 0) || 0))), o)), st(r))));
  }
  async createConsumptionSource(e = {}) {
    await this._mutateConsumptionSources((t) => t.concat([Kt({
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
      return ((n = i == null ? void 0 : i.consumption) == null ? void 0 : n.sourceId) !== e ? i : (i.consumption.sourceId = "", st(i));
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
      return Kt(s);
    }));
  }
  getPayloadState({ payloadId: e = "", ammoTypeId: t = "" } = {}) {
    var i, n, s, r, o;
    return Zs({
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
    const r = this.getPayloadState({ payloadId: e || t }), o = (r == null ? void 0 : r.sourceState) ?? null, l = (r == null ? void 0 : r.source) ?? null, c = String((r == null ? void 0 : r.activePayloadId) ?? "").trim(), u = String((r == null ? void 0 : r.payloadLabel) ?? "").trim() || "Unloaded", d = Math.max(0, Number((o == null ? void 0 : o.current) ?? 0) || 0), m = Math.max(0, Number((o == null ? void 0 : o.max) ?? 0) || 0), f = !!((g = B.getCombat(this.actor)) != null && g.combatant);
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
      return r.id !== i.source.id ? r : (r.tracking ?? (r.tracking = {}), r.tracking.max = Math.max(0, Number(((o = r.tracking) == null ? void 0 : o.max) ?? i.max) || i.max), r.tracking.current = i.max, Kt(r));
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
    const t = ta(
      e,
      ni((i = this.system) == null ? void 0 : i.payloads, {
        legacyAmmo: (n = this.system) == null ? void 0 : n.ammo,
        category: ((s = this.system) == null ? void 0 : s.category) ?? ((r = this.system) == null ? void 0 : r.weaponCategory)
      }),
      {
        category: ((o = this.system) == null ? void 0 : o.category) ?? ((l = this.system) == null ? void 0 : l.weaponCategory)
      }
    );
    await this.update({
      "system.selectedPayloadId": t,
      "system.ammo": Ea()
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
      return l.id !== ((c = i.source) == null ? void 0 : c.id) ? l : (l.tracking ?? (l.tracking = {}), l.tracking.current = Math.max(0, s - n), Kt(l));
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
    const i = this.system ?? {}, n = ia(i.range), s = String(i.skill ?? "").trim(), r = Et(s), o = Number(i.damage ?? 0) || 0, l = String(i.category ?? i.weaponCategory ?? "ranged").trim() || "ranged", c = hm({
      damageType: i.damageType,
      ap: Number(i.ap ?? i.armorPiercing ?? 0) || 0,
      attackRatingBand: Ps(i.attackRatingBand),
      traits: Ma(i.traits),
      keywords: im(i.keywords),
      standardTraits: [],
      resolution: pn(i.resolution, "standard"),
      fireModes: hn(i.fireModes),
      payloads: ni(i.payloads, { legacyAmmo: i.ammo, category: l }),
      selectedPayloadId: ta(i.selectedPayloadId, i.payloads, { legacyAmmo: i.ammo, category: l }),
      consumptionSources: Pa(i.consumptionSources, { legacyAmmo: i.ammo }),
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
      damageTypeLabel: Wt(c.damageType),
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
    ), r = Math.min(i, s), o = Qt((t == null ? void 0 : t.mitigationByType) ?? (t == null ? void 0 : t.mitigation)), l = Ts({
      standardTraits: ai(t == null ? void 0 : t.standardTraits),
      traits: Ma(t == null ? void 0 : t.traits),
      traitState: t == null ? void 0 : t.traitState
    }), c = fn(t == null ? void 0 : t.tags), u = Yr(r);
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
      mitigationByType: Sc(o, l.mitigationByType),
      tags: c,
      isDestroyed: s <= 0,
      durability: {
        current: s,
        max: n
      },
      traitState: l.traitState,
      standardTraits: ai(t.standardTraits),
      traits: gm({
        traits: Ma(t.traits),
        standardTraits: ai(t.standardTraits)
      }),
      notes: String(t.notes ?? "").trim()
    };
  }
  getDefaultRangeBand(e = ia(((t) => (t = this.system) == null ? void 0 : t.range)())) {
    return Rp(e);
  }
  isWeaponSkill(e) {
    return ((e == null ? void 0 : e.canonicalType) ?? (e == null ? void 0 : e.type)) === A.itemType.skill && e.system.code === this.system.skill;
  }
  getWeaponSkill() {
    var i;
    const e = (i = this.actor) == null ? void 0 : i.items.find((n) => this.isWeaponSkill(n));
    if (e) return e;
    const t = game.items.find((n) => this.isWeaponSkill(n));
    return t || sl(this.system.skill);
  }
  getDefense() {
    if (!this.isPersonalWeapon())
      return this.system.defense ? Ne.fixedDefenseCode(this.system.defense) : void 0;
    if (this.system.defense)
      return Ne.fixedDefenseCode(this.system.defense);
    const e = Et(String(this.system.skill ?? "").trim());
    return e != null && e.defense ? Ne.fixedDefenseCode(e.defense) : void 0;
  }
  getDamage() {
    if (!this.parent) return;
    const e = this._getMonitor(), t = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0, i = this.isPersonalWeapon() ? this.getCombatProfile() : null;
    return {
      value: Dp(
        e,
        this.system.damage,
        this.system.damageAttribute,
        t
      ),
      monitor: e,
      damageType: (i == null ? void 0 : i.damageType) ?? this.system.damageType,
      damageTypeLabel: (i == null ? void 0 : i.damageTypeLabel) ?? this.getDamageTypeLabel(),
      noArmor: this.system.noArmor ?? this.system.armorAvoidance,
      armorMode: _p(e, this.system.noArmor ?? this.system.armorAvoidance)
    };
  }
  getDamageCode() {
    return Op(
      this._getMonitor(),
      this.system.damage,
      this.system.damageAttribute
    );
  }
  getDamageTypeLabel() {
    var t;
    if (this.isPersonalWeapon())
      return Wt(((t = this.getCombatProfile()) == null ? void 0 : t.damageType) ?? this.system.damageType);
    const e = Pe.mwd.weaponDamageType[this.system.damageType] ?? Pe.mwd.personalDamageType[this.system.damageType];
    return e || this.system.damageType;
  }
  getRanges() {
    return Ip(ia(this.system.range)).filter((e) => e.allowed).map((e) => ({ value: e.value, labelkey: e.labelkey }));
  }
  validateTargets(e) {
    var r;
    const t = (r = this.getDamage()) == null ? void 0 : r.monitor, i = Bt.getTargetTokens(game.user), n = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), s = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (s.length > 0) {
      const o = ve(Pe.common.errors.ignoredTargets, {
        targets: s.reduce(se.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (n.length === 0) {
      const o = ve(Pe.common.errors.noTargetSelected, {
        weapon: this.name ?? Pe.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(n);
    return n;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = Zo[t] ?? {};
    Ki.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = Zo[t] ?? {};
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
qa = new WeakMap(), Ft = new WeakSet(), ur = async function(e) {
  if (typeof (e == null ? void 0 : e.syncEquippedActorEffects) == "function")
    try {
      await e.syncEquippedActorEffects();
    } catch (t) {
      console.error(`${Se}Failed to sync equipped item effects`, { item: e, error: t });
    }
}, hu = async function(e) {
  if (typeof (e == null ? void 0 : e.removeSyncedActorEffects) == "function")
    try {
      await e.removeSyncedActorEffects({ actor: e.actor ?? e.parent ?? null });
    } catch (t) {
      console.error(`${Se}Failed to remove synced item effects`, { item: e, error: t });
    }
}, Tn = async function(e) {
  const t = e == null ? void 0 : e.parent;
  if (typeof (t == null ? void 0 : t.syncEquippedActorEffects) == "function")
    try {
      await t.syncEquippedActorEffects();
    } catch (i) {
      console.error(`${Se}Failed to sync parent item effects`, { effect: e, error: i });
    }
}, Te(Ve, Ft), Te(Ve, qa, !1), _(Ve, "RANGE_ORDER", qi), _(Ve, "EQUIPPED_EFFECT_FLAG", "equippedItemSync"), _(Ve, "DEFAULT_UNARMED", Object.freeze({
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
let Sa = Ve;
const rl = {
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
}, Lp = {
  code: "weapon-range",
  options: {
    flags: { editable: !0 },
    order: 20,
    category: ye.pool,
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
}, $p = {
  code: "weapon-area",
  options: {
    used: !0,
    order: 20,
    category: ye.pool,
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
}, pe = class pe extends Sa {
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
    Hooks.once(Be.REGISTER_ROLL_PARAMETERS, (e) => {
      e($p), e(Lp);
    });
  }
  prepareBaseData() {
    if (super.prepareBaseData(), (this.canonicalType ?? this.type) !== A.itemType.personalWeapon) return;
    const e = this.system ?? {};
    e.equipped = !!e.equipped, e.isPrimary = !!e.isPrimary, e.category = String(e.category ?? e.weaponCategory ?? "ranged").trim() || "ranged", e.skill = String(e.skill ?? "firearms").trim() || "firearms", e.ap = Number(e.ap ?? e.armorPiercing ?? 0) || 0, e.damage = Number(e.damage ?? 0) || 0, e.damageType = Ut(e.damageType), e.attackRatingBand = pe.normalizeAttackRatingBand(e.attackRatingBand), e.range = pe.normalizePersonalRangeData(e.range), e.traits = pe.normalizeTraits(e.traits), e.notes = String(e.notes ?? "").trim();
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
    return wa(e);
  }
  static normalizePersonalRangeData(e) {
    const t = co(e);
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
    const t = this.system ?? {}, i = this.canonicalType ?? this.type, n = i === A.itemType.personalWeapon ? pe.normalizePersonalRangeData(t.range) : pe.normalizeRangeData(t.range), s = String(t.skill ?? "").trim(), r = Et(s), o = Number(t.damage ?? 0) || 0, l = Number(t.ap ?? t.armorPiercing ?? 0) || 0, c = String(t.category ?? t.weaponCategory ?? "ranged").trim() || "ranged", u = pe.normalizeTraits(t.traits);
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
      damageType: i === A.itemType.personalWeapon ? Ut(t.damageType) : String(t.damageType ?? "kinetic").trim() || "kinetic",
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
    const t = Et(String(this.system.skill ?? "").trim());
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
    const e = Et(String(this.system.skill ?? "").trim());
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
    return z.useArmor(e) ? t ? "noArmor" : "withArmor" : "";
  }
  getDamageTypeLabel() {
    if ((this.canonicalType ?? this.type) === A.itemType.personalWeapon)
      return Wt(this.system.damageType);
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
    return { value: this.system.range[e], labelkey: be.getFromList(be.getEnums().ranges, e) };
  }
  static getRangeList(e, { personalScale: t = !1 } = {}) {
    const i = pe.normalizeRangeKey(e == null ? void 0 : e.max), n = pe.RANGE_ORDER.indexOf(i);
    return pe.RANGE_ORDER.map((s, r) => ({
      key: s,
      allowed: n >= 0 ? r <= n : r === 0,
      value: (e == null ? void 0 : e[s]) ?? (s === "extreme" && (e == null ? void 0 : e.long) !== void 0 ? e.long : void 0),
      labelkey: t ? Wn(s) : be.getFromList(be.getEnums().ranges, s)
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
    const t = (r = this.getDamage()) == null ? void 0 : r.monitor, i = Bt.getTargetTokens(game.user), n = i.filter((o) => {
      var l;
      return (l = o.actor) == null ? void 0 : l.canReceiveDamage(t);
    }), s = i.filter((o) => {
      var l;
      return !((l = o.actor) != null && l.canReceiveDamage(t));
    }).map((o) => o.name);
    if (s.length > 0) {
      const o = ve(Pe.common.errors.ignoredTargets, {
        targets: s.reduce(se.joiner(", "))
      });
      ui.notifications.info(o);
    }
    if (n.length == 0) {
      const o = ve(Pe.common.errors.noTargetSelected, {
        weapon: this.name ?? Pe.itemType.singular.weapon
      });
      ui.notifications.info(o);
    } else
      this.checkWeaponTargetsCount(n);
    return n;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, i = rl[t] ?? {};
    Ki.checkTargetsCount(i.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), i = rl[t] ?? {};
    return i.targets && i.adjust && e <= i.targets ? i.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area == "" ? A.area.none : this.system.area ?? A.area.none;
  }
  _getMonitor() {
    return (this.canonicalType ?? this.type) === A.itemType.personalWeapon ? A.monitors.physical : this.system.monitor || A.monitors.physical;
  }
};
_(pe, "RANGE_ORDER", ["close", "near", "far", "extreme"]), _(pe, "DEFAULT_UNARMED", Sa.DEFAULT_UNARMED);
let vt = pe;
function Bp(a) {
  const e = [];
  for (let [t, i] of Object.entries(a ?? {}))
    i !== void 0 && (t = t.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (n, s) => (s ? "-" : "") + n.toLowerCase()), e.push(`data-${t}="${Handlebars.escapeExpression(i)}"`));
  return new Handlebars.SafeString(e.join(" "));
}
function zp({ hash: a }) {
  return a;
}
function Fp() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
class po {
  constructor() {
    this.registerHelpers(), Hooks.once("init", () => {
      this.registerHelpers(), console.log(`${Se}Handlebars helpers registered (init)`);
    }), console.log(`${Se}Handlebars helpers registered (ctor)`);
  }
  registerHelpers() {
    const e = Fp(), t = {
      // Foundry utils
      getProperty: foundry.utils.getProperty,
      // DND5E-inspired utilities
      "mwd-dataset": Bp,
      "mwd-object": zp,
      // Simple comparisons
      eq: (i, n) => i === n,
      ne: (i, n) => i !== n,
      // Strings/arrays
      concat: (...i) => se.join(i.slice(0, -1)),
      join: (i, n = " ") => Array.isArray(i) ? i.join(n) : "",
      includes: (i, n) => i == null ? void 0 : i.includes(n),
      length: (i) => (i == null ? void 0 : i.length) || 0,
      substring: (i, n, s) => i == null ? void 0 : i.substring(n, s),
      toUpperCase: gd.toUpperCaseNoAccent,
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
      for: po.hbsForLoop,
      // fixes “Missing helper: for”
      range: (i, n) => Array.from({ length: n - i + 1 }, (s, r) => i + r),
      ifGte: (i, n, s) => i >= n ? s.fn(this) : s.inverse(this),
      // Damage / weapons (legacy-compatible)
      weaponDamageLetter: hd.letter,
      weaponDamageCode: vt.damageCode,
      weaponDamageValue: vt.damageValue,
      weaponArmorMode: vt.armorMode,
      weaponRangeList: vt.getRangeList,
      // Icons
      iconFA: q.fontAwesome,
      iconSrc: q.iconSystemPath,
      iconPath: q.iconPath,
      iconD6: q.iconD6,
      // Enums
      localizeAttribute: be.localizeAttribute
    };
    e.registerHelper(t), e !== Handlebars && Handlebars.registerHelper(t);
  }
  static hbsForLoop(e, t, i) {
    let n = "";
    for (let s = e; s < t; ++s) n += i.fn(s);
    return n;
  }
}
const ol = "sheetTheme", dr = "mwd-theme-default", Hp = "mwd-theme-sra", Up = [
  { name: "Default (CSB)", cssClass: dr },
  { name: "SRA", cssClass: Hp }
];
class Wp {
  constructor() {
    this.availableStyles = {}, ji.register(Be.REGISTER_STYLES), Hooks.once(Be.REGISTER_STYLES, (e) => Up.forEach((t) => e(t.cssClass, t.name))), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(Be.REGISTER_STYLES, (e, t) => this.availableStyles[e] = t), console.log(Se + "Loaded styles", this.availableStyles), game.settings.register(w, ol, {
      scope: "world",
      name: "Sheet Theme",
      hint: "Select the visual theme used by MWD sheets.",
      config: !0,
      default: dr,
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
    const e = game.settings.get(w, ol);
    return this.availableStyles[e] ? e : dr;
  }
}
function ll(a) {
  const e = Number(a ?? 0);
  return Number.isFinite(e) ? Math.trunc(e) : 0;
}
function Na(a) {
  return a === A.monitors.physical ? "Physical" : a === A.monitors.fatigue ? "Fatigue" : String(a ?? "").trim() || "Track";
}
function jp({
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
function La(a) {
  return a ? (a == null ? void 0 : a.document) ?? a : null;
}
function Rs(a, e) {
  var i, n, s;
  if (!a) return null;
  const t = La(e) ?? La(a == null ? void 0 : a.token);
  return t ? t.isLinked ? t.baseActor ?? ((s = (i = game.actors) == null ? void 0 : i.get) == null ? void 0 : s.call(i, ((n = t == null ? void 0 : t.baseActor) == null ? void 0 : n.id) ?? "")) ?? t.actor ?? a : t.actor ?? a : a;
}
function cn(a, e) {
  var t, i, n;
  return Math.max(0, Number(((n = (i = (t = a == null ? void 0 : a.system) == null ? void 0 : t.monitors) == null ? void 0 : i[e]) == null ? void 0 : n.value) ?? 0) || 0);
}
function cl(a) {
  var e, t;
  return Math.max(0, Number(((t = (e = a == null ? void 0 : a.system) == null ? void 0 : e.burn) == null ? void 0 : t.value) ?? 0) || 0);
}
function Gp(a, e) {
  var t;
  return ((t = eo(e).find((i) => i.id === a)) == null ? void 0 : t.label) ?? a;
}
function qp(a) {
  const e = foundry.utils.escapeHTML, t = [];
  if (a.mode === "attackDamage" || a.mode === "trackDelta") {
    const i = a.appliedDelta >= 0 ? "Applied" : "Recovered", n = Math.abs(Number(a.appliedDelta ?? 0)), s = n === 1 ? "point" : "points", r = a.usedArmor ? ` via armor-aware ${e(Wt(a.damageType))}` : "";
    t.push(`<div><b>${i}:</b> ${n} ${s} to ${e(Na(a.track))}${r}</div>`), a.usedArmor && a.mitigation && (t.push(
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
function Kp(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
class pt {
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
    return eo(e).map((t) => ({
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
      const s = La(e[0]), r = Rs((s == null ? void 0 : s.actor) ?? null, s);
      return this._resolveSceneTargetResult(r, s);
    }
    const t = Array.from(((n = game.user) == null ? void 0 : n.targets) ?? []);
    if (t.length > 1)
      return { actor: null, token: null, reason: "Target only one token." };
    if (t.length === 1) {
      const s = La(t[0]), r = Rs((s == null ? void 0 : s.actor) ?? null, s);
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
    const s = La(t);
    if (s) {
      const c = Rs((s == null ? void 0 : s.actor) ?? e, s), u = this._resolveSceneTargetResult(c, s);
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
      const c = qp(o), u = Kp({
        speaker: ChatMessage.getSpeaker({ actor: s.actor, token: s.token }),
        content: c
      });
      await ChatMessage.create(u);
    }
    return n.dryRun || (l = B.renderOpenCharacterSheets) == null || l.call(B, s.actor.id), o;
  }
  static async _applyTrackDelta(e, t, i = {}) {
    const n = (t == null ? void 0 : t.track) === A.monitors.fatigue ? A.monitors.fatigue : A.monitors.physical, s = ll((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0);
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
    const o = cn(e, n);
    i.dryRun || await z.addCounter(e, n, s);
    const l = i.dryRun ? Math.max(0, o + s) : cn(e, n);
    return {
      mode: "trackDelta",
      track: n,
      requestedDelta: s,
      appliedDelta: l - o,
      usedArmor: !1,
      beforeLabel: `${Na(n)} ${o}`,
      afterLabel: `${Na(n)} ${l}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
  static async _applyBurnDelta(e, t) {
    var l, c;
    const i = ll((t == null ? void 0 : t.delta) ?? (t == null ? void 0 : t.amount) ?? 0), n = cl(e), s = Math.max(0, n + i), r = { "system.burn.value": s };
    s === 0 && ((c = (l = e.system) == null ? void 0 : l.burn) != null && c.overloaded) && (r["system.burn.overloaded"] = !1), await e.update(r);
    const o = cl(e);
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
    const n = Fn(e, i), s = !!(t != null && t.active);
    await Ic({ actor: e, statusId: i, active: s });
    const r = Fn(e, i);
    return {
      mode: "status",
      statusId: i,
      statusLabel: Gp(i, e),
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
    var F, K, Y, W, j, x, L, G, X;
    const n = !!i.dryRun, s = (t == null ? void 0 : t.track) === A.monitors.fatigue ? A.monitors.fatigue : A.monitors.physical, r = Math.max(0, Number((t == null ? void 0 : t.damage) ?? 0) || 0), o = Math.max(0, Number((t == null ? void 0 : t.netHits) ?? 0) || 0), l = (t == null ? void 0 : t.effects) ?? {}, c = ((F = e.getPersonalCombatLoadout) == null ? void 0 : F.call(e, { refresh: !0 })) ?? null, u = (c == null ? void 0 : c.activeArmor) ?? null, d = Math.max(0, Number((u == null ? void 0 : u.currentArmorRating) ?? ((K = u == null ? void 0 : u.durability) == null ? void 0 : K.current) ?? 0) || 0), m = Ut(t == null ? void 0 : t.damageType, "concussive"), f = cn(e, s);
    let p = r + o;
    const h = d > 0 ? bm({
      damageIncoming: p,
      armorTags: (u == null ? void 0 : u.tags) ?? [],
      effects: l
    }) : { damageIncoming: p, applied: [] };
    p = h.damageIncoming;
    const g = ym({
      currentArmorRating: d,
      mitigationByType: (u == null ? void 0 : u.mitigationByType) ?? {},
      damageType: m
    }), y = Math.max(
      0,
      (Number((t == null ? void 0 : t.ap) ?? 0) || 0) + (Number((l == null ? void 0 : l.ap) ?? 0) || 0)
    ), b = g.isDestroyed ? 0 : Math.max(0, g.baseMitigation + g.typeMitigationMod - y);
    let S = Math.max(0, Math.ceil(p - b));
    const T = {
      snapshot: ((Y = B.getSnapshot) == null ? void 0 : Y.call(B, e)) ?? null
    }, C = wt({
      actor: e,
      phase: "onDamageResolved",
      facts: Gc({
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
    n || await ci({ actor: e, mutations: C.mutations, runtime: T }), S = Math.max(0, Number(C.packet.amount ?? S) || 0), !n && S > 0 && await z.addCounter(e, s, S);
    const N = jp({
      incomingDamage: r + o,
      armorBefore: ((W = u == null ? void 0 : u.durability) == null ? void 0 : W.current) ?? 0,
      reinforcedBefore: ((x = (j = u == null ? void 0 : u.traitState) == null ? void 0 : j.reinforced) == null ? void 0 : x.current) ?? 0,
      reinforcedMax: ((G = (L = u == null ? void 0 : u.traitState) == null ? void 0 : L.reinforced) == null ? void 0 : G.max) ?? 0,
      hasArmorItem: !!((X = u == null ? void 0 : u.item) != null && X.id)
    });
    !n && Object.keys(N.update).length > 0 && await u.item.update(N.update);
    const P = n ? Math.max(0, f + S) : cn(e, s);
    return {
      mode: (t == null ? void 0 : t.mode) ?? "attackDamage",
      track: s,
      requestedDelta: r + o,
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
      beforeLabel: `${Na(s)} ${f}`,
      afterLabel: `${Na(s)} ${P}`,
      source: String((t == null ? void 0 : t.source) ?? "").trim(),
      notes: String((t == null ? void 0 : t.notes) ?? "").trim()
    };
  }
}
_(pt, "MODE_OPTIONS", Object.freeze([
  { value: A.monitors.physical, label: "Physical" },
  { value: A.monitors.fatigue, label: "Fatigue" },
  { value: "burn", label: "Burn" },
  { value: "status", label: "Status" }
]));
const ul = Ln, mr = "damage-mode", Vp = `${w}.${mr}`, un = {}, Is = {};
class ue {
  static init() {
    ji.register(Be.PROVIDE_DAMAGE_MODE), Hooks.on("updateSetting", async (e, t, i, n) => ue.onUpdateSetting(e, t, i, n)), Hooks.on(Be.PROVIDE_DAMAGE_MODE, (e) => {
      e("resistanceArmorMonitor", k.settings.damageMode.values.resistanceArmorMonitor, ue.sufferDamageResistanceArmorMonitor), e("armorResistanceMonitor", k.settings.damageMode.values.armorResistanceMonitor, ue.sufferDamageArmorResistanceMonitor), e("armorGivesResistance", k.settings.damageMode.values.armorGivesResistance, ue.sufferDamageArmorAsResistance_Earthdawn), e("armorGiveResistanceHitsAvoid", k.settings.damageMode.values.armorGiveResistanceHitsAvoid, ue.sufferDamageArmorAsResistance_Cyberpunk);
    }), Hooks.once("ready", () => ue.onReady());
  }
  static onReady() {
    ue._registerDamageModeSetting(), ue._selectDamageMode();
  }
  static _registerDamageModeSetting() {
    Hooks.callAll(Be.PROVIDE_DAMAGE_MODE, (e, t, i) => {
      un[e] = t, Is[e] = i;
    }), game.settings.register(w, mr, {
      scope: "world",
      name: k.settings.damageMode.name,
      hint: k.settings.damageMode.hint,
      config: !0,
      default: Object.keys(un)[0],
      choices: un,
      type: String
    });
  }
  static async onUpdateSetting(e, t, i, n) {
    e.key == Vp && ue._selectDamageMode();
  }
  static _selectDamageMode() {
    let e = game.settings.get(w, mr);
    Is[e] || (e = Object.keys(un)[0]), ue.damageModeCode = e, ue.damageModeMethod = Is[e];
  }
  static async sufferDamage(e, t, i, n, s, r, o) {
    const { monitor: l, damageType: c } = ue._resolveDamageContext(e, t, o);
    if (Ki.checkActorCanReceiveDamage(c ?? l, l, e), ue._shouldUsePersonalDamageV2(e, l, o)) {
      await ue.sufferPersonalDamageV2(e, l, c, i, n, s, r, o);
      return;
    }
    await (ue.damageModeMethod ?? ue.sufferDamageResistanceArmorMonitor)(e, l, c, i, n, s, r), await e.applyArmorDamage(l, c, ce.sumModifiers([o], "other", "damageArmor"));
  }
  static _shouldUsePersonalDamageV2(e, t, i) {
    var n, s;
    return !((n = e == null ? void 0 : e.isCharacterLike) != null && n.call(e)) || ![A.monitors.physical, A.monitors.fatigue].includes(t) ? !1 : !!((s = i == null ? void 0 : i.isPersonalWeapon) != null && s.call(i) || (i == null ? void 0 : i.canonicalType) === A.itemType.personalWeapon || (i == null ? void 0 : i.type) === A.itemType.personalWeapon);
  }
  static async sufferPersonalDamageV2(e, t, i, n, s, r, o, l) {
    var d;
    const c = ((d = l == null ? void 0 : l.getCombatProfile) == null ? void 0 : d.call(l)) ?? l ?? null, u = await pt.apply({
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
    u != null && u.ok && ue._notifyPersonalArmorMitigation(e, {
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
    const i = t.armorMitigation ?? {}, n = ue._localizeDamageType(t.damageType), s = i.isDestroyed ? "Armor destroyed" : `Base ${Number(i.baseMitigation ?? 0)} + Type ${Number(i.typeMitigationMod ?? 0)} - AP ${Number(t.effectiveAp ?? 0)}`, r = Number(t.adjustedIncoming ?? t.baseIncoming ?? 0), o = Number(t.finalDamage ?? 0), l = (((u = t.tagEffectResult) == null ? void 0 : u.applied) ?? []).map((d) => `${d.tag} +${Math.round((Number(d.bonus ?? 0) || 0) * 100)}%`).join(", "), c = l ? ` [${l}]` : "";
    ui.notifications.info(
      `${e.name} mitigated ${n}: ${s}${c}. Incoming ${r}, final ${o}.`
    );
  }
  static async sufferDamageResistanceArmorMonitor(e, t, i, n, s, r, o) {
    const l = z.resistanceDetail(e, t, i), c = l.value;
    let u = 0;
    if (r) {
      const d = Math.min(c, n), m = Math.min(c - d, s);
      u = n - d, z.useArmor(t) && (u -= await ue.damageToArmor(e, i, u)), u += s - m;
    } else
      u = n + s - c, z.useArmor(t) && (u -= await ue.damageToArmor(e, i, u));
    u > 0 && await z.addCounter(e, t, u), ue._notifyResistanceUsage(e, t, i, l);
  }
  static async sufferDamageArmorResistanceMonitor(e, t, i, n, s, r, o) {
    let l = 0;
    z.useArmor(t) ? r ? (n -= await ue.damageToArmor(e, i, n), l = s + n) : (l = s + n, l -= await ue.damageToArmor(e, i, l)) : l = n + s;
    const c = z.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await z.addCounter(e, t, l), ue._notifyResistanceUsage(e, t, i, c), l;
  }
  static async sufferDamageArmorAsResistance_Cyberpunk(e, t, i, n, s, r, o) {
    let l = n + s;
    if (z.useArmor(t) && l > 0) {
      const u = r ? s : 0, d = Math.max(0, ue._computeArmorResistance(e) - u);
      d > 0 && (await z.addCounter(e, "armor", 1), l -= d);
    }
    const c = z.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await z.addCounter(e, t, l), ue._notifyResistanceUsage(e, t, i, c), Math.max(l, 0);
  }
  static async sufferDamageArmorAsResistance_Earthdawn(e, t, i, n, s, r, o) {
    let l = n + s;
    if (z.useArmor(t) && !r && l > 0) {
      const u = ue._computeArmorResistance(e);
      u > 0 && (await z.addCounter(e, "armor", 1), l -= u);
    }
    l -= ue._computeStrengthResistance(e, t);
    const c = z.resistanceDetail(e, t, i);
    return l -= c.value, l > 0 && await z.addCounter(e, t, l), ue._notifyResistanceUsage(e, t, i, c), l;
  }
  static async damageToArmor(e, t, i) {
    if (i > 0) {
      const n = z.max(e, A.monitors.armor), s = z.getCounterValue(e, A.monitors.armor), r = Math.min(n - s, i), o = z.resistance(e, A.monitors.armor, t), l = Math.max(0, r - o);
      return l > 0 && await z.addCounter(e, A.monitors.armor, l), r;
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
    const s = k.actor.monitors[t] ?? t, r = ue._localizeDamageType(i) ?? s, o = n.usedType ? "type" : "default", l = ((u = k.actor.monitors.resistanceSources) == null ? void 0 : u[o]) ?? o, c = ve(k.actor.monitors.resistanceApplied, {
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
      return dc(e) ? Wt(e) : k.mwd.weaponDamageType[e] ?? k.mwd.personalDamageType[e] ?? k.actor.monitors[e] ?? e;
  }
  static _computeArmorResistance(e) {
    const t = z.max(e, "armor"), i = z.getCounterValue(e, "armor"), n = Math.max(0, t - i);
    return Math.max(0, Math.ceil(n / 3));
  }
  static _computeStrengthResistance(e, t) {
    const i = e.getAttributeValue(A.actorAttributes.strength);
    return Math.max(0, Math.floor(i / 4));
  }
}
class ft extends Actor {
  static init() {
    Hooks.on("updateActor", (e, t, i, n) => {
      var s;
      return (s = Bt.firstResponsible(e)) == null ? void 0 : s.onUpdateActor(t, i);
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
      const e = be.getDamageTypes();
      Object.entries(this.system.monitors).forEach((t) => {
        t[1].resistance = ft.normalizeResistance(t[1].resistance), t[1].maxBonus = ce.sumMonitorModifiers(this.items, t[0], "max"), t[1].resistanceBonus = ce.sumMonitorModifiers(this.items, t[0], "resistance"), t[1].resistanceBonusByType = Object.fromEntries(
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
    return pa[this.type] ?? [];
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
    return t == 0 ? 0 : Vl + se.divup(t, 2);
  }
  getAttributeActions() {
    return Ne.getActorActions(this);
  }
  getUsableAttributes(e = void 0) {
    const t = (e ? [e] : this.items).map((n) => n.getAttributes()).reduce((n, s) => n.concat(s), []), i = se.distinct(this.getAttributes().concat(t));
    return i.sort(se.ascendingBySortedArray(be.sortedAttributeKeys)), i;
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
        await ue.damageToArmor(this, t, i);
    }
  }
  async rollAttribute(e) {
    await At.rollAttribute(this, e);
  }
  async rollAttributeAction(e) {
    const t = Ne.getActorAction(this, e);
    await At.rollAttributeAction(this, t);
  }
  async rollSkill(e, t) {
    await At.rollSkill(this, e, t);
  }
  async rollWeapon(e) {
    var s, r, o;
    Ki.checkWeaponDefense(e, this);
    const t = (s = e.validateTargets(this)) == null ? void 0 : s.map((l) => l.id), i = {
      attackerTokenId: (o = (r = game.scenes.current) == null ? void 0 : r.tokens.find((l) => {
        var c;
        return ((c = l.actor) == null ? void 0 : c.id) == this.id;
      })) == null ? void 0 : o.id,
      targetedTokenIds: t
    }, n = this.items.find((l) => e.isWeaponSkill(l));
    await At.rollWeapon(this, n, e, i);
  }
  async rollDefense(e) {
    const t = e.attack.defense, i = Ne.getActorDefense(this, t);
    await At.rollDefense(this, i, e);
  }
  async switchMonitorCheck(e, t, i, n = void 0) {
    await z.switchMonitorCheck(this, e, t, i, n);
  }
  async addCounter(e, t, i = void 0) {
    await z.addCounter(this, e, t, i);
  }
  async setCounter(e, t, i = void 0) {
    await z.setCounter(this, e, t, i);
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
    e > 0 && await z.setCounter(this, A.monitors.sceneAnarchy, e);
  }
  async onLeaveCombat() {
    await z.setCounter(this, A.monitors.sceneAnarchy, 0);
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
    t != 0 && await z.addCounter(this, e, -t);
  }
  async spendEdge(e, t = A.counters.edgePools.grit) {
    if (e != 0) {
      if (!this.canUseEdge()) {
        const i = k.actorType[this.type] ?? this.type, n = `${this.name} (${i}) cannot use Edge`;
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
    const i = ft._prepareFavorite(e, t);
    return !!this.system.favorites.find((n) => ft._isSameFavorite(i, n));
  }
  static _prepareFavorite(e, t) {
    return { type: e, id: t };
  }
  static _isSameFavorite(e, t) {
    return e.id == t.id && e.type == t.type;
  }
  async switchFavorite(e, t, i) {
    const n = ft._prepareFavorite(t, i), s = this.system.favorites.filter((r) => !ft._isSameFavorite(n, r));
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
    const i = ft._prepareFavorite(e, t);
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
const { ApplicationV2: Yp, HandlebarsApplicationMixin: Qp } = foundry.applications.api, { renderTemplate: dl } = foundry.applications.handlebars, Jp = `${Q}/chat/celebrity-roll.hbs`, la = class la extends Qp(Yp) {
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
        ce.computeModifiers(e.items, "other", "celebrity")
      ),
      other: {
        label: k.common.roll.modifiers.other,
        value: 0
      },
      ANARCHY: k
    }, i = await dl(`${Q}/dialog/roll-celebrite-title.hbs`, t), n = {
      id: `roll-celebrity-${foundry.utils.randomID()}`,
      classes: [game.system.anarchy.styles.selectCssClass(), ...la.DEFAULT_OPTIONS.classes],
      window: { title: i }
    };
    return new la({ roll: t }, n).render({ force: !0 });
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
      await la.doRoll(this.roll), await this.close();
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
      ANARCHY: k
    }, s = new Roll(`${i}d6cs>=5`);
    await s.evaluate();
    const r = await dl(Jp, n);
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
_(la, "PARTS", {
  body: {
    template: `${Q}/dialog/roll-celebrite.hbs`
  }
});
let fr = la;
const { renderTemplate: Xp } = foundry.applications.handlebars, Zp = `${Q}/chat/actor-say-word.hbs`;
class ml extends ft {
  static get initiative() {
    return ft.initiative + " + max(@attributes.reflexes.value, @attributes.intelligence.value)";
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
    return pa[this.type] ?? pa[A.actorTypes.character];
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
      content: await Xp(
        Zp,
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
      Ki.checkSufficient(k.actor.counters.anarchy, e, i + t);
      const n = Math.min(t, e), s = e - n;
      n > 0 && z.addCounter(this, A.monitors.sceneAnarchy, -n), this.hasPlayerOwner ? (await game.system.anarchy.gmAnarchy.actorGivesAnarchyToGM(this, e), z.addCounter(this, A.monitors.anarchy, -s)) : s > 0 && super.spendAnarchy(s);
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
    await fr.create(this);
  }
}
function eh() {
  return foundry.data.operators.ForcedDeletion;
}
class gu extends ft {
  prepareDerivedData() {
    this._prepareMwdAttributes(), this._prepareMwdMonitors(), this._prepareMwdItems(), super.prepareDerivedData();
  }
  static get defaultIcon() {
    return `${Jn}/default/Default_Vehicle.svg`;
  }
  static get initiative() {
    return ft.initiative + " + max(@attributes.system.value, @attributes.handling.value)";
  }
  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    };
  }
  getAttributes() {
    return pa[this.type] ?? pa[A.actorTypes.vehicle];
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
      "system.handling": eh(),
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
      resistance: ft.normalizeResistance((r = t.structure) == null ? void 0 : r.resistance)
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
        resistance: ft.normalizeResistance((d = t.heat) == null ? void 0 : d.resistance)
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
const fl = {
  light: 4,
  medium: 5,
  heavy: 6,
  assault: 7
}, th = { mode: "normal", allowedWeaponIds: [], typeRestriction: "" }, ih = {
  baseProfile: { name: "Unarmed", damage: "", notes: "" },
  maxWeapons: 0,
  allowedLocations: []
};
class yu {
  constructor(e) {
    this.actor = e, this.mwd = e.system.mwd ?? {};
  }
  compute() {
    const e = this.mwd.weightClass ?? "medium", t = fl[e] ?? fl.medium, i = this._normalizeHardpoints(), n = this._normalizeWeaponGroups(), s = n.find((y) => y.isPrimary), r = n.filter((y) => y.isPrimary), o = this._primarySlot(), l = [], c = [];
    r.length > 1 && l.push(k.mwd.loadout.errors.multiplePrimary);
    const u = s ? t - 1 : t, d = n.length + (s ? 1 : 0);
    n.length > u && l.push(ve(k.mwd.loadout.errors.mountPointsExceeded, {
      used: d,
      total: t
    }));
    const m = this._getWeapons((y) => (y.system.weaponCategory ?? "ranged") !== "melee"), f = new Map(m.map((y) => [y.id, y])), p = /* @__PURE__ */ new Set(), h = i.map((y) => ({ ...y, occupiedBy: null, occupiedByName: void 0 }));
    for (const y of n)
      for (const b of y.weaponIds ?? []) {
        const S = f.get(b);
        if (!S) {
          c.push(ve(k.mwd.loadout.warnings.weaponMissing, { weapon: b }));
          continue;
        }
        const T = S.system.hardpointType ?? "energy", C = S.system.hardpointSize ?? "small";
        if (p.has(b)) {
          l.push(ve(k.mwd.loadout.errors.weaponAlreadyGrouped, { weapon: S.name }));
          continue;
        }
        if (p.add(b), y.isPrimary && this._validatePrimaryWeapon(S, T, C, o, l), (S.system.weaponCategory ?? "ranged") === "melee")
          continue;
        const N = h.find((P) => !P.occupiedBy && P.type === T && P.size === C);
        N ? (N.occupiedBy = y.id, N.occupiedByName = y.name) : l.push(ve(k.mwd.loadout.errors.hardpointUnavailable, {
          weapon: S.name,
          type: k.mwd.hardpointType[T] ?? T,
          size: k.mwd.hardpointSize[C] ?? C
        }));
      }
    s && (!s.weaponIds || s.weaponIds.length === 0) && l.push(k.mwd.loadout.errors.primaryWithoutWeapon);
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
      name: e.name || ve(k.common.newName, { type: k.itemType.singular.weapon }),
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
    const e = foundry.utils.mergeObject(foundry.utils.duplicate(th), this.mwd.primarySlot ?? {});
    return e.allowedWeaponIds = this._asArray(e.allowedWeaponIds), e;
  }
  _computeMeleeState(e) {
    var o, l, c;
    const t = foundry.utils.mergeObject(foundry.utils.duplicate(ih), this.mwd.melee ?? {}), i = this._getWeapons((u) => (u.system.weaponCategory ?? "ranged") === "melee"), n = [], s = Number(t.maxWeapons ?? 0);
    i.length > s && e.push(ve(k.mwd.loadout.errors.meleeLimitExceeded, {
      equipped: i.length,
      limit: s
    }));
    const r = this._asArray(t.allowedLocations);
    return n.push({
      name: ((o = t.baseProfile) == null ? void 0 : o.name) || k.mwd.melee.baseProfile,
      damage: ((l = t.baseProfile) == null ? void 0 : l.damage) ?? "",
      notes: ((c = t.baseProfile) == null ? void 0 : c.notes) ?? ""
    }), i.forEach((u) => {
      var d;
      r.length > 0 && u.system.mountLocation && !r.includes(u.system.mountLocation) && e.push(ve(k.mwd.loadout.errors.meleeLocationRestricted, {
        weapon: u.name,
        location: k.mwd.meleeLocation[u.system.mountLocation] ?? u.system.mountLocation
      })), n.push({
        name: u.name,
        damage: u.getDamageCode(),
        notes: ((d = u.system.references) == null ? void 0 : d.description) ?? ""
      });
    }), { profiles: n, limit: s };
  }
  _validatePrimaryWeapon(e, t, i, n, s) {
    var r;
    n.mode === "converted" ? (((r = n.allowedWeaponIds) == null ? void 0 : r.length) > 0 && !n.allowedWeaponIds.includes(e.id) && s.push(ve(k.mwd.loadout.errors.primaryNotAllowedWeapon, { weapon: e.name })), n.typeRestriction && t !== n.typeRestriction && s.push(ve(k.mwd.loadout.errors.primaryTypeRestriction, {
      weapon: e.name,
      type: k.mwd.hardpointType[n.typeRestriction] ?? n.typeRestriction
    }))) : i !== "large" && s.push(ve(k.mwd.loadout.errors.primaryNeedsLarge, { weapon: e.name }));
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
class ah extends gu {
  static get defaultIcon() {
    return `${Jn}/vehicles/apc.svg`;
  }
  prepareDerivedData() {
    var e;
    super.prepareDerivedData(), this.system.mwd = this.system.mwd ?? {}, this.system.mwd.chassis = this.system.mwd.chassis ?? "", this.system.mwd.tonnage = this.system.mwd.tonnage ?? 0, this.system.mwd.loadout = new yu(this).compute(), this.system.mwd.weaponGroupDetails = this._prepareConfiguredWeaponGroups(), this.system.mwd.heat = this._prepareHeatTrack(), this.system.mwd.primaryGroupName = ((e = this.system.mwd.weaponGroupDetails.find((t) => t.isPrimary)) == null ? void 0 : e.name) ?? "", this.system.skills = this._prepareSkillMap(), this.system.weaponGroups = this._prepareWeaponGroups(), this.system.meleeProfiles = this._prepareMeleeProfiles(), this.system.quickActions = {
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
    const i = t.weaponIds.map((n) => this.items.get(n)).filter((n) => n);
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
      label: k.actor.battlemech.heat.status[r] ?? r
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
        name: n.name || ve(k.common.newName, { type: k.itemType.singular.weapon }),
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
    const i = Et(e);
    if (i)
      return {
        name: i.label ?? ((n = k.skill) == null ? void 0 : n[e]) ?? e,
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
      name: k.actor.vehicle.quickActions.primaryWeapons,
      weaponIds: i.map((r) => r.id),
      isPrimary: !0
    }), n.push({
      id: "all",
      name: k.actor.vehicle.quickActions.allWeapons,
      weaponIds: t.map((r) => r.id),
      isPrimary: n.length === 0
    }), n;
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
    const i = ((s = e == null ? void 0 : e.system) == null ? void 0 : s.attribute) ?? this.getPhysicalAgility(), n = foundry.utils.mergeObject(At.prepareActorRoll(this), {
      mode: Ye.rollType.skill,
      skill: e,
      attribute1: i,
      specialization: void 0
    });
    t.quickAction && (n.quickAction = t.quickAction), await At.create(n);
  }
  async _promptWeaponGroup(e) {
    if (e.length === 1)
      return e[0];
    const t = e.find((s) => s.isPrimary) ?? e[0], i = `<form class="mwd-quick-select">${e.map((s) => `
      <label class="quick-select-option">
        <input type="radio" name="weapon-group" value="${s.id}" ${s.id === t.id ? "checked" : ""}>
        <span>${s.name}${s.isPrimary ? ` (${k.actor.vehicle.quickActions.primaryLabel})` : ""}</span>
      </label>`).join("")}</form>`, n = await Dialog.prompt({
      title: k.actor.vehicle.quickActions.selectWeaponGroup,
      content: i,
      label: k.common.roll.button,
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
      title: k.actor.vehicle.quickActions.selectMeleeProfile,
      content: i,
      label: k.common.roll.button,
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
      title: k.actor.vehicle.quickActions.selectSensorSkill,
      content: t,
      label: k.common.roll.button,
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
const vn = "activeModifiers", ho = [
  { value: "", label: "All Attributes" },
  { value: "reflexes", label: "Reflexes" },
  { value: "strength", label: "Strength" },
  { value: "willpower", label: "Willpower" },
  { value: "charisma", label: "Charisma" },
  { value: "intelligence", label: "Intelligence" },
  { value: "edge", label: "Edge" }
], go = [
  { value: "", label: "All Intents" },
  { value: "skill", label: "Skill" },
  { value: "attack", label: "Attack" },
  { value: "defense", label: "Defense" },
  { value: "common", label: "Common" },
  { value: "attribute", label: "Attribute" },
  { value: "edge", label: "Edge" },
  { value: "initiative", label: "Initiative" }
];
function pl(a) {
  const e = String(a ?? "").trim();
  return e === "" ? null : e;
}
function nh(a) {
  return String((a == null ? void 0 : a.intent) ?? "").trim() || null;
}
function sh(a) {
  var e, t, i;
  return ((e = a == null ? void 0 : a.data) == null ? void 0 : e.attrKey) ?? // skill rolls
  ((i = (t = a == null ? void 0 : a.attack) == null ? void 0 : t.skill) == null ? void 0 : i.attribute) ?? // attack rolls
  null;
}
function hl(a, e) {
  return a ? e ? a === e : !1 : !0;
}
function bu(a) {
  return {
    id: String((a == null ? void 0 : a.id) ?? ""),
    label: String((a == null ? void 0 : a.label) ?? "").trim(),
    value: Math.trunc(Number((a == null ? void 0 : a.value) ?? 0)) || 0,
    enabled: (a == null ? void 0 : a.enabled) !== !1,
    attributeFilter: pl(a == null ? void 0 : a.attributeFilter),
    intentFilter: pl(a == null ? void 0 : a.intentFilter),
    source: (a == null ? void 0 : a.source) === "preset" ? "preset" : "adhoc"
  };
}
class rh {
  constructor() {
    _(this, "id", "mwd.sceneModifiers");
  }
  collect({ resolved: e } = {}) {
    var r;
    const t = (r = canvas == null ? void 0 : canvas.scene) == null ? void 0 : r.getFlag("mwd", vn);
    if (!Array.isArray(t) || !t.length) return [];
    const i = nh(e), n = sh(e), s = [];
    for (const o of t) {
      const l = bu(o);
      l.enabled && hl(l.intentFilter, i) && hl(l.attributeFilter, n) && s.push({
        id: l.id || `scene:${l.label}`,
        label: l.label,
        value: l.value,
        source: "Scene"
      });
    }
    return s;
  }
}
const oh = `systems/${w}/templates/settings/collection-editor.hbs`, Su = /* @__PURE__ */ new Map(), Ds = /* @__PURE__ */ new Map();
function Jt(a = []) {
  const e = Array.isArray(a) ? a.filter(Boolean) : [String(a ?? "").trim()].filter(Boolean), t = new Error(e[0] ?? "Invalid settings data.");
  return t.validationErrors = e, t;
}
function Xa(a) {
  ch(a), Su.set(a.id, a), game.settings.register(w, a.settingKey, {
    scope: "world",
    config: !1,
    type: a.settingType ?? Object,
    default: a.defaultData()
  }), game.settings.registerMenu(w, a.menuKey, {
    name: a.menu.name,
    label: a.menu.label,
    hint: a.menu.hint,
    icon: a.menu.icon,
    type: uh(a.id),
    restricted: a.menu.restricted ?? !0
  });
}
function lh(a) {
  return Su.get(a) ?? null;
}
function ch(a) {
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
function uh(a) {
  if (Ds.has(a))
    return Ds.get(a);
  class e extends Au {
  }
  return _(e, "definitionId", a), Ds.set(a, e), e;
}
var J, wu, pr, kn, En, aa, hr, Ra, Tu, vu, Je;
class Au extends FormApplication {
  constructor(t = {}, i = {}) {
    super(t, i);
    Te(this, J);
    const n = v(this, J, En).call(this);
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
      template: oh,
      width: 880,
      height: 760,
      resizable: !0,
      submitOnChange: !1,
      closeOnSubmit: !1
    }, { inplace: !1 });
  }
  get definition() {
    const t = lh(this.constructor.definitionId);
    if (!t)
      throw new Error(`Missing settings collection definition: ${this.constructor.definitionId}`);
    return t;
  }
  get title() {
    var t;
    return this.definition.title ?? ((t = this.definition.menu) == null ? void 0 : t.name) ?? "Settings Editor";
  }
  getData(t = {}) {
    const i = v(this, J, vu).call(this), n = this.editorState.rows.map((s, r, o) => ({
      index: r,
      fields: i.map((l) => v(this, J, Tu).call(this, l, s, r)),
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
        o && v(this, J, wu).call(this, o, s, r);
      });
    });
  }
  async _onSubmit(t, { updateData: i = null, preventClose: n = !0, preventRender: s = !0 } = {}) {
    return super._onSubmit(t, { updateData: i, preventClose: n, preventRender: s });
  }
  async _updateObject(t, i) {
    var n;
    v(this, J, Je).call(this, []);
    try {
      const s = this.editorState.tab === "bulk" ? this.definition.parseBulk(v(this, J, Ra).call(this)) : this.definition.rowsToValue(v(this, J, hr).call(this));
      await game.settings.set(w, this.definition.settingKey, s);
      const r = v(this, J, En).call(this);
      v(this, J, kn).call(this, r), await this.close();
    } catch (s) {
      v(this, J, Je).call(this, dn(s)), this.editorState.errors.length && ((n = ui.notifications) == null || n.error(this.editorState.errors[0])), this.render(!1);
    }
  }
}
J = new WeakSet(), wu = async function(t, i, n) {
  var s, r, o, l, c, u, d, m;
  switch (i.preventDefault(), i.stopPropagation(), t) {
    case "switchRows":
      v(this, J, Ra).call(this), this.editorState.tab = "rows", v(this, J, Je).call(this, []), this.render(!1);
      return;
    case "switchBulk":
      v(this, J, aa).call(this);
      try {
        const f = this.definition.rowsToValue(this.editorState.rows);
        this.editorState.bulkText = this.definition.serializeBulk(f), this.editorState.tab = "bulk", v(this, J, Je).call(this, []);
      } catch (f) {
        v(this, J, Je).call(this, dn(f)), this.editorState.errors.length && ((s = ui.notifications) == null || s.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "addRow":
      v(this, J, aa).call(this), this.editorState.rows.push(((o = (r = this.definition).createEmptyRow) == null ? void 0 : o.call(r)) ?? {}), v(this, J, Je).call(this, []), this.render(!1);
      return;
    case "removeRow":
      v(this, J, aa).call(this), this.editorState.rows.splice(Number(((l = n == null ? void 0 : n.dataset) == null ? void 0 : l.index) ?? -1), 1), v(this, J, Je).call(this, []), this.render(!1);
      return;
    case "moveRowUp":
      v(this, J, aa).call(this), v(this, J, pr).call(this, Number(((c = n == null ? void 0 : n.dataset) == null ? void 0 : c.index) ?? -1), -1), v(this, J, Je).call(this, []), this.render(!1);
      return;
    case "moveRowDown":
      v(this, J, aa).call(this), v(this, J, pr).call(this, Number(((u = n == null ? void 0 : n.dataset) == null ? void 0 : u.index) ?? -1), 1), v(this, J, Je).call(this, []), this.render(!1);
      return;
    case "loadBulk":
      try {
        const f = this.definition.parseBulk(v(this, J, Ra).call(this));
        this.editorState.rows = this.definition.toRows(f), this.editorState.bulkText = this.definition.serializeBulk(f), this.editorState.tab = "rows", v(this, J, Je).call(this, []);
      } catch (f) {
        v(this, J, Je).call(this, dn(f)), this.editorState.errors.length && ((d = ui.notifications) == null || d.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "formatBulk":
      try {
        const f = this.definition.parseBulk(v(this, J, Ra).call(this));
        this.editorState.bulkText = this.definition.serializeBulk(f), v(this, J, Je).call(this, []);
      } catch (f) {
        v(this, J, Je).call(this, dn(f)), this.editorState.errors.length && ((m = ui.notifications) == null || m.warn(this.editorState.errors[0]));
      }
      this.render(!1);
      return;
    case "resetSetting":
      v(this, J, kn).call(this, v(this, J, En).call(this)), this.render(!1);
      return;
    case "restoreDefaults":
      v(this, J, kn).call(this, this.definition.defaultData()), this.render(!1);
      return;
    case "cancel":
      await this.close();
      return;
    default:
      return;
  }
}, pr = function(t, i) {
  if (!Number.isInteger(t)) return;
  const n = t + i;
  if (t < 0 || n < 0 || n >= this.editorState.rows.length) return;
  const s = [...this.editorState.rows], [r] = s.splice(t, 1);
  s.splice(n, 0, r), this.editorState.rows = s;
}, kn = function(t) {
  this.editorState.rows = this.definition.toRows(t), this.editorState.bulkText = this.definition.serializeBulk(t), this.editorState.tab = "rows", v(this, J, Je).call(this, []);
}, En = function() {
  const t = game.settings.get(w, this.definition.settingKey);
  return foundry.utils.deepClone(t ?? this.definition.defaultData());
}, aa = function() {
  this.editorState.rows = v(this, J, hr).call(this);
}, hr = function() {
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
}, Ra = function() {
  var n;
  const t = this.form, i = (n = t == null ? void 0 : t.querySelector) == null ? void 0 : n.call(t, 'textarea[name="bulkText"]');
  return i instanceof HTMLTextAreaElement && (this.editorState.bulkText = i.value), this.editorState.bulkText ?? "";
}, Tu = function(t, i, n) {
  const s = t.type ?? "text", r = String((i == null ? void 0 : i[t.key]) ?? t.default ?? ""), o = s === "select" ? dh(t).map((l) => ({
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
}, vu = function() {
  return this.definition.rowSchema.map((t) => ({
    ...t,
    type: t.type ?? "text"
  }));
}, Je = function(t = []) {
  this.editorState.errors = Array.isArray(t) ? t.filter(Boolean) : [];
}, _(Au, "definitionId", "");
function dh(a) {
  const e = typeof a.options == "function" ? a.options() : a.options;
  return Array.isArray(e) ? e : [];
}
function dn(a) {
  const e = Array.isArray(a == null ? void 0 : a.validationErrors) ? a.validationErrors.filter(Boolean) : [String((a == null ? void 0 : a.message) ?? "Unable to save settings.").trim()].filter(Boolean);
  return e.length ? e : ["Unable to save settings."];
}
const gr = "sceneModifierTemplates", mh = "sceneModifierTemplateEditor", fh = Object.freeze([]);
function Ii(a) {
  const e = String(a ?? "").trim();
  return e === "" ? "" : e;
}
function ku(a = []) {
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
      attributeFilter: Ii(n == null ? void 0 : n.attributeFilter),
      intentFilter: Ii(n == null ? void 0 : n.intentFilter)
    });
  }), t.length) throw Jt(t);
  return e;
}
function ph(a = []) {
  return (Array.isArray(a) ? a : []).map((e) => ({
    label: String((e == null ? void 0 : e.label) ?? ""),
    value: String((e == null ? void 0 : e.value) ?? "0"),
    attributeFilter: Ii(e == null ? void 0 : e.attributeFilter),
    intentFilter: Ii(e == null ? void 0 : e.intentFilter)
  }));
}
function hh(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw Jt([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  if (!Array.isArray(t))
    throw Jt(["Bulk JSON must be an array."]);
  return ku(t.map((i) => ({
    label: String((i == null ? void 0 : i.label) ?? ""),
    value: String((i == null ? void 0 : i.value) ?? "0"),
    attributeFilter: Ii(i == null ? void 0 : i.attributeFilter),
    intentFilter: Ii(i == null ? void 0 : i.intentFilter)
  })));
}
function gh(a = []) {
  return JSON.stringify(
    (Array.isArray(a) ? a : []).map((e) => ({
      label: String((e == null ? void 0 : e.label) ?? ""),
      value: Number((e == null ? void 0 : e.value) ?? 0),
      attributeFilter: Ii(e == null ? void 0 : e.attributeFilter),
      intentFilter: Ii(e == null ? void 0 : e.intentFilter)
    })),
    null,
    2
  );
}
const yh = {
  id: "scene-modifier-templates",
  menuKey: mh,
  settingKey: gr,
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
      options: ho
    },
    {
      key: "intentFilter",
      label: "Intent Filter",
      type: "select",
      options: go
    }
  ],
  menu: {
    name: "Scene Modifier Templates",
    label: "Configure",
    hint: "Edit the preset scene modifier templates available in the GM Gadget.",
    icon: "fas fa-cloud",
    restricted: !0
  },
  defaultData: () => foundry.utils.deepClone(fh),
  createEmptyRow: () => ({
    label: "",
    value: "0",
    attributeFilter: "",
    intentFilter: ""
  }),
  toRows: ph,
  rowsToValue: ku,
  parseBulk: hh,
  serializeBulk: gh
};
function bh() {
  Xa(yh);
}
const { ApplicationV2: Sh, HandlebarsApplicationMixin: Ah } = foundry.applications.api, wh = "mwd-gmgadget", Eu = "gmDnPresets", Mn = "gmNextDn", Ia = "gmDnAnnounceToChat", Th = Object.freeze([
  { label: "Standard", dn: 1 },
  { label: "Challenging", dn: 2 },
  { label: "Hard", dn: 3 },
  { label: "Extreme", dn: 4 }
]), vh = "systems/mwd/templates/v2/mwd-gmgadget.hbs", Da = Object.freeze({
  actorId: "",
  mode: "physical",
  delta: 1,
  useArmor: !1,
  damageType: "concussive",
  statusId: "",
  statusActive: !0,
  source: "",
  notes: ""
}), kh = Object.freeze({
  label: "Hazard Zone",
  startExposure: te.minor,
  escalationRate: 1,
  escalationIntervalTurns: 1,
  escalationMax: te.full,
  onFullBurnDelta: 0,
  clearOnExit: !0,
  damage: 6,
  ap: 0,
  damageType: "thermal",
  color: "#d86a2c"
});
function Eh(a = "") {
  return String(a ?? "").split(",").map((e) => e.trim()).filter(Boolean).map((e) => {
    const [t, i] = e.split(":").map((r) => (r ?? "").trim()), n = t || "DN", s = Number.isFinite(Number(i)) ? Number(i) : Number(t);
    return {
      label: n,
      dn: Number.isFinite(s) ? Math.max(0, Math.trunc(s)) : null
    };
  }).filter((e) => Number.isFinite(e.dn));
}
function Mh(a = []) {
  const e = new Error(a[0] ?? "Invalid GM DN presets.");
  return e.validationErrors = Array.isArray(a) ? a.filter(Boolean) : [], e;
}
function Ch() {
  return foundry.utils.deepClone(Th);
}
function Za(a, { strict: e = !1 } = {}) {
  const t = typeof a == "string" ? Eh(a) : Array.isArray(a) ? a : [], i = [], n = [], s = /* @__PURE__ */ new Set();
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
  }), e && n.length) throw Mh(n);
  return i;
}
function Os(a = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(Da),
    a ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function _s(a = {}) {
  return foundry.utils.mergeObject(
    foundry.utils.deepClone(kh),
    a ?? {},
    { inplace: !1, overwrite: !0 }
  );
}
function Mu(a = null) {
  const e = (a == null ? void 0 : a.document) ?? a ?? null, t = Array.from((e == null ? void 0 : e.shapes) ?? []);
  if (t.length !== 1) return t.length > 1 ? "multiple" : "";
  const i = t[0], n = typeof (i == null ? void 0 : i.toObject) == "function" ? i.toObject() : i && typeof i == "object" ? i : null;
  return String((n == null ? void 0 : n.type) ?? "").trim().toLowerCase();
}
function gl(a = null) {
  return !!Mu(a);
}
function yl() {
  var i, n;
  const a = Array.from(((i = canvas == null ? void 0 : canvas.regions) == null ? void 0 : i.controlled) ?? []).map((s) => (s == null ? void 0 : s.document) ?? s ?? null).find(gl);
  if (a) return a;
  const e = ((n = canvas == null ? void 0 : canvas.regions) == null ? void 0 : n.hover) ?? null, t = (e == null ? void 0 : e.document) ?? e ?? null;
  return gl(t) ? t : null;
}
function Ph(a = null) {
  var o, l;
  const e = (a == null ? void 0 : a.document) ?? a ?? null;
  if (!e)
    return {
      label: "No region selected",
      reason: "Select a Region created in Measured Template Mode on the current scene to turn it into a hazard.",
      supported: !1
    };
  const t = Mu(e), i = ac(e);
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
function Nh(a) {
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
function Rh(a) {
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
function Ih(a) {
  return pt.getStatusOptions(a);
}
function Dh(a = "mwd") {
  game.settings.register(a, Mn, {
    scope: "client",
    config: !1,
    type: Number,
    default: 1
  }), game.settings.register(a, Ia, {
    scope: "client",
    config: !0,
    name: "Announce GM DN changes to chat",
    hint: "If enabled, posts a small chat notice when you change the current DN preset.",
    type: Boolean,
    default: !1
  });
}
const Fe = class Fe extends Ah(Sh) {
  constructor({ systemId: e = "mwd", ...t } = {}) {
    super(t), this.systemId = e, this.activeTab = "difficulty", this.harmState = Os(), this.hazardState = _s();
  }
  async render(e = {}) {
    var t;
    return (t = game.user) != null && t.isGM ? super.render(e) : this;
  }
  async _prepareContext(e) {
    var y, b, S, T;
    const t = await super._prepareContext(e), i = Za(
      game.settings.get(this.systemId, Eu),
      { strict: !1 }
    ), n = Number(game.settings.get(this.systemId, Mn) ?? 1), s = !!game.settings.get(this.systemId, Ia), r = pt.getActorOptions(), o = pt.getSceneTarget(), l = this.harmState.actorId ? ((b = (y = game.actors) == null ? void 0 : y.get) == null ? void 0 : b.call(y, this.harmState.actorId)) ?? null : null, c = pt.resolveTarget({
      actor: l,
      actorId: this.harmState.actorId,
      preferSceneTarget: !0
    }), u = Ih(c.actor ?? l ?? null), d = Os(this.harmState);
    !d.statusId && u.length && (d.statusId = u[0].value, this.harmState.statusId = d.statusId);
    const m = bl(
      game.settings.get(this.systemId, gr)
    ), f = Sl(
      (S = canvas == null ? void 0 : canvas.scene) == null ? void 0 : S.getFlag("mwd", vn)
    ), p = yl(), h = Ph(p), g = _s(this.hazardState);
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
        attributeFilterOptions: ho,
        intentFilterOptions: go
      },
      harm: {
        state: d,
        actorOptions: r,
        modes: pt.MODE_OPTIONS,
        damageTypes: ul,
        statusOptions: u,
        sceneTarget: Nh(o),
        effectiveTarget: Rh(c),
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
          { value: te.minor, label: "Minor" },
          { value: te.major, label: "Major" },
          { value: te.full, label: "Full" }
        ],
        damageTypes: ul,
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
    return this.harmState = Os({
      actorId: i('[name="harm-actorId"]', this.harmState.actorId),
      mode: i('[name="harm-mode"]', this.harmState.mode),
      delta: Number(i('[name="harm-delta"]', this.harmState.delta)),
      useArmor: n('[name="harm-useArmor"]', this.harmState.useArmor),
      damageType: i('[name="harm-damageType"]', this.harmState.damageType),
      statusId: i('[name="harm-statusId"]', this.harmState.statusId),
      statusActive: i('[name="harm-statusActive"]', this.harmState.statusActive ? "add" : "remove") !== "remove",
      source: i('[name="harm-source"]', this.harmState.source),
      notes: i('[name="harm-notes"]', this.harmState.notes)
    }), Number.isFinite(Number(this.harmState.delta)) || (this.harmState.delta = Da.delta), this.harmState;
  }
  async _onSetDn(e, t) {
    var s, r, o;
    if (e.preventDefault(), e.stopPropagation(), !((s = game.user) != null && s.isGM)) return;
    const i = Math.max(0, Math.trunc(Number(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.dn) ?? NaN)));
    if (!Number.isFinite(i)) return;
    if (await game.settings.set(this.systemId, Mn, i), !!game.settings.get(this.systemId, Ia)) {
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
      return await game.settings.set(this.systemId, Mn, 1), this.render({ parts: ["body"] });
  }
  async _onToggleAnnounce(e, t) {
    var n;
    if (e.preventDefault(), e.stopPropagation(), !((n = game.user) != null && n.isGM)) return;
    const i = !game.settings.get(this.systemId, Ia);
    return await game.settings.set(this.systemId, Ia, i), this.render({ parts: ["body"] });
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
    const s = await pt.apply({
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
    return this.hazardState = _s({
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
    const i = this._captureHazardStateFromDom(t), n = yl(), s = ac(n);
    if (!(canvas != null && canvas.scene) || !s) {
      (m = ui.notifications) == null || m.warn("Select a supported Region in Measured Template Mode before creating a hazard.");
      return;
    }
    const r = jr({
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
    }), o = Vr(s);
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
          [Ui]: {
            sourceActorUuid: null,
            sourceItemUuid: null,
            payloadId: "gm-hazard",
            templateGeometry: li(s),
            damage: Math.max(0, Number(i.damage ?? 0) || 0),
            ap: Math.max(0, Number(i.ap ?? 0) || 0),
            damageType: String(i.damageType ?? "thermal").trim() || "thermal",
            label: `${String(i.label ?? "Hazard Zone").trim() || "Hazard Zone"} (${kt(r.startExposure)})`,
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
      delta: Al(e == null ? void 0 : e.delta, Da.delta),
      source: t,
      notes: i
    } : n === "physical" || n === "fatigue" ? {
      mode: "trackDelta",
      track: n,
      delta: Al(e == null ? void 0 : e.delta, Da.delta),
      useArmor: !!(e != null && e.useArmor),
      damageType: (e == null ? void 0 : e.damageType) ?? Da.damageType,
      source: t,
      notes: i
    } : null;
  }
  // ---- Scene modifier actions ----
  async _onAddSceneModifierFromPreset(e, t) {
    var l, c, u, d;
    if ((l = e == null ? void 0 : e.preventDefault) == null || l.call(e), (c = e == null ? void 0 : e.stopPropagation) == null || c.call(e), !((u = game.user) != null && u.isGM)) return;
    const i = ((d = t == null ? void 0 : t.closest) == null ? void 0 : d.call(t, ".mwd-gmgadget__root")) ?? this._getRootElement(), n = i instanceof HTMLElement ? i.querySelector('select[name="scene-preset-index"]') : null, s = n instanceof HTMLSelectElement ? Number(n.value) : NaN, r = bl(
      game.settings.get(this.systemId, gr)
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
    const i = Sl(t.getFlag("mwd", vn)), n = await e(i);
    return await t.setFlag("mwd", vn, n), this.render({ parts: ["body"] });
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
_(Fe, "DEFAULT_OPTIONS", {
  id: wh,
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
    hazardInputChange: Fe.prototype._onHazardInputChange,
    refreshHazardTemplate: Fe.prototype._onRefreshHazardTemplate,
    createHazard: Fe.prototype._onCreateHazard,
    addSceneModifierFromPreset: Fe.prototype._onAddSceneModifierFromPreset,
    addSceneModifierAdhoc: Fe.prototype._onAddSceneModifierAdhoc,
    toggleSceneModifier: Fe.prototype._onToggleSceneModifier,
    removeSceneModifier: Fe.prototype._onRemoveSceneModifier,
    clearSceneModifiers: Fe.prototype._onClearSceneModifiers
  }
}), _(Fe, "PARTS", {
  body: { template: vh }
});
let yr = Fe;
function bl(a) {
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
function Sl(a) {
  return Array.isArray(a) ? a.map((e) => {
    var s, r;
    const t = bu(e), i = ((s = ho.find((o) => o.value === (t.attributeFilter ?? ""))) == null ? void 0 : s.label) ?? null, n = ((r = go.find((o) => o.value === (t.intentFilter ?? ""))) == null ? void 0 : r.label) ?? null;
    return {
      ...t,
      attributeFilterLabel: t.attributeFilter ? i : null,
      intentFilterLabel: t.intentFilter ? n : null,
      signedValue: t.value >= 0 ? `+${t.value}` : String(t.value),
      isPositive: t.value > 0
    };
  }) : [];
}
function Al(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
let xs = null;
function Oh({ systemId: a = "mwd" } = {}) {
  return xs || (xs = new yr({ systemId: a })), xs;
}
const _h = "gmDnPresetEditor";
function xh(a = []) {
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
  }), t.length) throw Jt(t);
  return Za(e, { strict: !0 });
}
function Lh(a = []) {
  return Za(a, { strict: !1 }).map((e) => ({
    label: e.label,
    dn: String(e.dn)
  }));
}
function $h(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw Jt([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return Za(t, { strict: !0 });
}
function Bh(a = []) {
  return JSON.stringify(
    Za(a, { strict: !1 }),
    null,
    2
  );
}
const zh = {
  id: "gm-dn-presets",
  menuKey: _h,
  settingKey: Eu,
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
  defaultData: Ch,
  createEmptyRow: () => ({
    label: "",
    dn: "1"
  }),
  toRows: Lh,
  rowsToValue: xh,
  parseBulk: $h,
  serializeBulk: Bh
};
function Fh() {
  Xa(zh);
}
const Hh = "lifeModuleCatalogEditor";
function Uh(a = []) {
  return Yi((Array.isArray(a) ? a : []).map((e) => ({
    id: String((e == null ? void 0 : e.id) ?? ""),
    moduleType: String((e == null ? void 0 : e.moduleType) ?? ""),
    label: String((e == null ? void 0 : e.label) ?? ""),
    grants: String((e == null ? void 0 : e.grants) ?? ""),
    requiresAny: String((e == null ? void 0 : e.requiresAny) ?? ""),
    excludesAny: String((e == null ? void 0 : e.excludesAny) ?? "")
  })), { strict: !0 });
}
function Wh(a = []) {
  return Yi(a, { strict: !1 }).map((e) => ({
    id: e.id,
    moduleType: e.moduleType,
    label: e.label,
    grants: mp(e.grants),
    requiresAny: e.requiresAny.join(", "),
    excludesAny: e.excludesAny.join(", ")
  }));
}
function jh(a = "") {
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
  return Yi(t, { strict: !0 });
}
function Gh(a = []) {
  return JSON.stringify(
    Yi(a, { strict: !1 }),
    null,
    2
  );
}
const qh = {
  id: "life-module-catalog",
  menuKey: Hh,
  settingKey: ua,
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
      options: au
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
  defaultData: mo,
  createEmptyRow: () => ({
    id: "",
    moduleType: "childhood",
    label: "",
    grants: "",
    requiresAny: "",
    excludesAny: ""
  }),
  toRows: Wh,
  rowsToValue: Uh,
  parseBulk: jh,
  serializeBulk: Gh
};
function Kh() {
  Xa(qh);
}
const Vh = "personalActionCatalogEditor", wl = Object.freeze([
  { value: "false", label: "No" },
  { value: "true", label: "Yes" }
]);
function Yh(a = []) {
  try {
    return Qa((Array.isArray(a) ? a : []).map((e) => ({
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
    throw Jt(
      Array.isArray(e.validationErrors) ? e.validationErrors : [e.message]
    );
  }
}
function Qh(a = []) {
  return Qa(a, { strict: !1 }).map((e) => {
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
function Jh(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return [];
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw Jt([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  try {
    return Qa(t, { strict: !0 });
  } catch (i) {
    throw Jt(
      Array.isArray(i.validationErrors) ? i.validationErrors : [i.message]
    );
  }
}
function Xh(a = []) {
  return JSON.stringify(
    Qa(a, { strict: !1 }),
    null,
    2
  );
}
const Zh = {
  id: "personal-action-catalog",
  menuKey: Vh,
  settingKey: Kc,
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
      options: () => rr
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
      options: () => Vc
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
      options: () => wl
    },
    {
      key: "prominentWhenBurning",
      label: "Burn Highlight",
      type: "select",
      options: () => wl
    }
  ],
  menu: {
    name: "Personal Action Catalog",
    label: "Configure",
    hint: "Edit the personal combat action menus and first-pass action handlers.",
    icon: "fas fa-list-check",
    restricted: !0
  },
  defaultData: ro,
  createEmptyRow: () => {
    var a;
    return {
      id: "",
      label: "",
      category: ((a = rr[0]) == null ? void 0 : a.value) ?? "standard",
      cost: "1",
      handler: "combatAction",
      reason: "",
      rollIntent: "",
      prominent: "false",
      prominentWhenBurning: "false"
    };
  },
  toRows: Qh,
  rowsToValue: Yh,
  parseBulk: Jh,
  serializeBulk: Xh
};
function eg() {
  Xa(Zh);
}
const tg = "skillSpecializationEditor";
function br() {
  return Bn().map((a) => ({
    value: a.code,
    label: a.label
  }));
}
function ig(a = []) {
  const e = new Set(br().map((n) => n.value)), t = {}, i = [];
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
  }), i.length) throw Jt(i);
  return is(t, { strict: !0 });
}
function ag(a = {}) {
  const e = is(a, { strict: !1 });
  return Object.entries(e).flatMap(
    ([t, i]) => i.map((n) => ({ skillCode: t, label: n }))
  );
}
function ng(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return {};
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw Jt([
      `Bulk JSON must be valid JSON: ${i.message}`
    ]);
  }
  return is(t, { strict: !0 });
}
function sg(a = {}) {
  return JSON.stringify(
    is(a, { strict: !1 }),
    null,
    2
  );
}
const rg = {
  id: "skill-specializations",
  menuKey: tg,
  settingKey: ir,
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
      options: br
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
  defaultData: Cc,
  createEmptyRow: () => {
    var a;
    return {
      skillCode: ((a = br()[0]) == null ? void 0 : a.value) ?? "",
      label: ""
    };
  },
  toRows: ag,
  rowsToValue: ig,
  parseBulk: ng,
  serializeBulk: sg
};
function og() {
  Xa(rg);
}
class lg {
  static register() {
    Fh(), Kh(), eg(), og(), bh(), game.settings.register(w, "useDestinyMechanics", {
      name: k.settings.useDestinyMechanics.name,
      hint: k.settings.useDestinyMechanics.hint,
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
class cg extends Error {
  constructor(e, { severity: t = "error" } = {}) {
    super(e), this.name = "UserFacingRollError", this.userFacing = !0, this.severity = t === "warn" ? "warn" : "error";
  }
}
function Bi(a, e = {}) {
  return new cg(a, e);
}
function yo(a, e = "Unable to execute roll.") {
  var i, n;
  const t = a != null && a.userFacing && (a == null ? void 0 : a.severity) === "warn" ? "warn" : "error";
  (n = (i = ui.notifications) == null ? void 0 : i[t]) == null || n.call(i, (a == null ? void 0 : a.message) ?? e);
}
const jn = Symbol("SKIP_FIELD");
function Cu(a) {
  return a instanceof HTMLInputElement || a instanceof HTMLSelectElement || a instanceof HTMLTextAreaElement;
}
function ug({
  elementKind: a = "input",
  inputType: e = "",
  dtype: t = "",
  value: i = "",
  checked: n = !1
} = {}) {
  const s = String(a ?? "").trim().toLowerCase(), r = String(e ?? "").trim().toLowerCase(), o = String(t ?? "").trim().toLowerCase();
  if (!["input", "select", "textarea"].includes(s))
    return jn;
  if (s === "input") {
    if (r === "radio")
      return n ? i : jn;
    if (r === "checkbox")
      return !!n;
  }
  if (o === "number" || s === "input" && r === "number") {
    const l = Number(i);
    return Number.isFinite(l) ? l : 0;
  }
  return o === "boolean" ? i === !0 || i === "true" : i;
}
function dg(a) {
  var e;
  return Cu(a) ? ug({
    elementKind: a instanceof HTMLSelectElement ? "select" : a instanceof HTMLTextAreaElement ? "textarea" : "input",
    inputType: a instanceof HTMLInputElement ? a.type : "",
    dtype: String(((e = a.dataset) == null ? void 0 : e.dtype) ?? ""),
    value: a.value,
    checked: a instanceof HTMLInputElement ? a.checked : !1
  }) : jn;
}
function mg({
  root: a,
  document: e,
  selector: t = "input[name], select[name], textarea[name]",
  clampByPath: i = null,
  skipNames: n = []
} = {}) {
  if (!(a instanceof HTMLElement)) return {};
  const s = new Set(Array.isArray(n) ? n : [n]), r = {};
  for (const o of a.querySelectorAll(t)) {
    if (!Cu(o) || o.closest("prose-mirror") || o.disabled) continue;
    const l = String(o.getAttribute("name") ?? o.name ?? "").trim();
    if (!l || s.has(l)) continue;
    let c = dg(o);
    c === jn || (typeof i == "function" && (c = i(l, c)), (e ? foundry.utils.getProperty(e, l) : void 0) === c) || (r[l] = c);
  }
  return r;
}
const { HandlebarsApplicationMixin: fg } = foundry.applications.api, { HTMLField: pg } = foundry.data.fields;
function hg(a) {
  const e = new pg({ required: !1, blank: !0, initial: "" });
  return e.name = a, e;
}
var Lt, Ka, Ai, Oi, Sr, Ar;
const Le = class Le extends fg(foundry.applications.sheets.ActorSheetV2) {
  constructor() {
    super(...arguments);
    Te(this, Oi);
    Te(this, Lt, !1);
    /** Track active CSB tab per group across rerenders */
    Te(this, Ka, /* @__PURE__ */ new Map());
    // group -> tabId
    Te(this, Ai, /* @__PURE__ */ new Map());
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
    return H(this, Lt);
  }
  toggleEditing() {
    if (this.isEditable) {
      if (H(this, Lt)) {
        this._commitEditsToActor().finally(() => {
          Ie(this, Lt, !H(this, Lt)), this.render({ force: !0 });
        });
        return;
      }
      Ie(this, Lt, !H(this, Lt)), this.render({ force: !0 });
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
    H(this, Ka).set(o, s), v(this, Oi, Sr).call(this, r, s);
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const n = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!n) return;
    const s = n.dataset.section, r = n.closest(".csb-accordion");
    if (!r || !s) return;
    const o = r.dataset.group || "default", c = (H(this, Ai).has(o) ? H(this, Ai).get(o) : r.dataset.default || null) === s ? null : s;
    H(this, Ai).set(o, c), v(this, Oi, Ar).call(this, r, c);
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
      return console.error("MWD | Failed to execute roll action", b), yo(b, "Unable to execute that roll."), null;
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
        const c = l.dataset.group || "default", u = H(this, Ka).get(c), d = l.dataset.default || ((r = l.querySelector(".csb-tab-link[data-tab]")) == null ? void 0 : r.dataset.tab), m = u || d;
        m && v(this, Oi, Sr).call(this, l, m);
      }
      for (const l of n.querySelectorAll(".csb-accordion")) {
        const c = l.dataset.group || "default", u = H(this, Ai).has(c) ? H(this, Ai).get(c) : l.dataset.default || null;
        v(this, Oi, Ar).call(this, l, u);
      }
      n.querySelectorAll(".csb-tabs").length && !n.querySelector(".csb-tab-panel.is-active") && console.warn(`${Se} CSB tabs present but no active tab applied. Check element root resolution and CSS .is-active selectors.`, {
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
    const i = mg({
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
    console.log(`${Se}BaseActorSheetV2._prepareContext:start`, {
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
        editing: H(this, Lt),
        data: this.actor,
        options: n,
        cssClass: n.cssClass
      },
      { inplace: !1 }
    );
    return s.options.owner = s.owner, s.options.limited = s.limited, s.options.editable = s.editable, s.options.editing = s.editing, s.options.viewMode = !s.editing, s.skillsDisplay = Nc(((m = this.actor) == null ? void 0 : m.system) ?? {}), s.bio = {
      ...s.bio ?? {},
      fields: {
        history: hg("system.biography.history")
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
    }, console.log(`${Se}BaseActorSheetV2._prepareContext:done`, {
      actorType: (p = this.actor) == null ? void 0 : p.type,
      cssClass: s.cssClass,
      itemCount: ((g = (h = this.actor) == null ? void 0 : h.items) == null ? void 0 : g.size) ?? 0,
      editing: H(this, Lt)
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
Lt = new WeakMap(), Ka = new WeakMap(), Ai = new WeakMap(), Oi = new WeakSet(), /**
 * Apply active-state classes within a single .csb-tabs root.
 * Idempotent: safe to call every render.
 */
Sr = function(t, i) {
  t.querySelectorAll(".csb-tab-link").forEach((n) => {
    n.classList.toggle("is-active", n.dataset.tab === i);
  }), t.querySelectorAll(".csb-tab-panel").forEach((n) => {
    n.classList.toggle("is-active", n.dataset.tab === i);
  });
}, Ar = function(t, i) {
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
_(Le, "MIN_WIDTH", 800), _(Le, "MAX_WIDTH", 950), _(Le, "MIN_HEIGHT", 600), _(Le, "MAX_HEIGHT", 1400), // group -> sectionId|null
/** @override */
_(Le, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Qi(Le, Le, "DEFAULT_OPTIONS"), {
  classes: ["sheet", "actor", w, "appv2", "mwd-sheet", "mwd-character-sheet"],
  position: { width: 760, height: 760 },
  window: { resizable: !0, minimizable: !0 },
  actions: {
    toggleViewMode: Le.prototype._onToggleViewMode,
    tab: Le.prototype._onClickTab,
    accordion: Le.prototype._onClickAccordion,
    roll: Le.prototype._onRollAction,
    monitorSet: Le.prototype._onMonitorSet,
    editImage: Le.prototype._onEditImage,
    createOwnedItem: Le.prototype._onCreateOwnedItem,
    editOwnedItem: Le.prototype._onEditOwnedItem,
    deleteOwnedItem: Le.prototype._onDeleteOwnedItem,
    toggleOwnedItemEquipped: Le.prototype._onToggleOwnedItemEquipped,
    setOwnedItemPrimary: Le.prototype._onSetOwnedItemPrimary
  }
}, { inplace: !1 }));
let Aa = Le;
function gg(a = {}) {
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
function yg(a) {
  return Array.isArray(a) ? a : typeof a == "string" ? a.split(/\s+/).filter(Boolean) : [];
}
function Cn(a) {
  if (!a || typeof a != "object") return a;
  const e = {
    ...a,
    template: a.template ?? gg(a),
    classes: yg(a.classes),
    children: Array.isArray(a.children) ? a.children.map(Cn) : []
  };
  return a.type === "tabs" && (e.tabs = Array.isArray(a.tabs) ? a.tabs.map((t) => ({
    ...t,
    children: Array.isArray(t.children) ? t.children.map(Cn) : []
  })) : []), a.type === "accordion" && (e.sections = Array.isArray(a.sections) ? a.sections.map((t) => ({
    ...t,
    children: Array.isArray(t.children) ? t.children.map(Cn) : []
  })) : []), e;
}
function Tl(a = {}) {
  return {
    ...a,
    root: Cn(a.root ?? { type: "stack", children: [] })
  };
}
var wi, Yn, Pu;
class Di {
  static async get(e) {
    if (H(this, wi).has(e)) {
      const n = await H(this, wi).get(e);
      if (Number((n == null ? void 0 : n.version) ?? 0) > 0) return n;
      H(this, wi).delete(e);
    }
    const t = v(this, Yn, Pu).call(this, e);
    H(this, wi).set(e, t);
    const i = await t;
    return Number((i == null ? void 0 : i.version) ?? 0) <= 0 && H(this, wi).delete(e), i;
  }
}
wi = new WeakMap(), Yn = new WeakSet(), Pu = async function(e) {
  const t = `systems/${w}/templates/v2/layouts/${e}.layout.json`;
  try {
    const i = await fetch(t);
    if (!i.ok) throw new Error(`HTTP ${i.status} for ${t}`);
    return Tl(await i.json());
  } catch (i) {
    return console.error(`${Se}LayoutRegistry.get FAILED`, { layoutId: e, url: t, error: i }), Tl({
      id: e,
      version: 0,
      root: { type: "stack", children: [] }
    });
  }
}, Te(Di, Yn), Te(Di, wi, /* @__PURE__ */ new Map());
function fs(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function bg(a = {}) {
  var i, n, s, r;
  const e = Array.isArray((i = a == null ? void 0 : a.attack) == null ? void 0 : i.targets) ? a.attack.targets : [], t = di(((n = a == null ? void 0 : a.attack) == null ? void 0 : n.areaEffect) ?? ((r = (s = a == null ? void 0 : a.attack) == null ? void 0 : s.payload) == null ? void 0 : r.areaEffect) ?? {});
  if (!e.length && t.kind !== rt.persistent)
    throw new Error("Attack requires at least one target.");
  return e;
}
async function Sg(a = {}) {
  if (!(a != null && a.actorUuid)) return null;
  try {
    return await fromUuid(a.actorUuid);
  } catch (e) {
    return console.warn("MWD | Unable to resolve attack target actor for CQ", a, e), null;
  }
}
function Ag(a = {}, e = null, t = "") {
  var i, n, s, r, o;
  return Math.max(0, fs(
    ((i = a == null ? void 0 : a.attributes) == null ? void 0 : i[t]) ?? ((n = e == null ? void 0 : e.getAttributeValue) == null ? void 0 : n.call(e, t)) ?? ((o = (r = (s = e == null ? void 0 : e.system) == null ? void 0 : s.attributes) == null ? void 0 : r[t]) == null ? void 0 : o.value),
    0
  ));
}
function wg(a = {}, e = null, t = "") {
  var i, n, s, r, o, l;
  return Math.max(0, fs(
    ((n = (i = a == null ? void 0 : a.skills) == null ? void 0 : i[t]) == null ? void 0 : n.rating) ?? ((s = e == null ? void 0 : e.getSkillRating) == null ? void 0 : s.call(e, t)) ?? ((l = (o = (r = e == null ? void 0 : e.system) == null ? void 0 : r.skills) == null ? void 0 : o[t]) == null ? void 0 : l.rating),
    0
  ));
}
function vl(a = []) {
  return a.reduce((e, t) => e + fs(t == null ? void 0 : t.value, 0), 0);
}
async function Tg({ attacker: a = null, ctx: e = {}, target: t = {} } = {}) {
  var T, C, N, P, F, K, Y, W, j, x, L, G, X, oe, ge, de, M, V, ne, ie, Me, Ge;
  const i = await Sg(t), n = Math.max(0, Number(((P = (C = (T = e == null ? void 0 : e.attack) == null ? void 0 : T.weapon) == null ? void 0 : C.attackRatingBand) == null ? void 0 : P[(N = e == null ? void 0 : e.attack) == null ? void 0 : N.rangeBand]) ?? 0) || 0), s = Ag(t, i, "reflexes"), r = s + s, o = String(((K = (F = e == null ? void 0 : e.attack) == null ? void 0 : F.skill) == null ? void 0 : K.code) ?? ((W = (Y = e == null ? void 0 : e.attack) == null ? void 0 : Y.weapon) == null ? void 0 : W.skill) ?? "").trim(), l = String(((x = (j = e == null ? void 0 : e.attack) == null ? void 0 : j.skill) == null ? void 0 : x.label) ?? o ?? "Attack Skill").trim() || "Attack Skill", c = o ? Math.max(0, fs(((L = a == null ? void 0 : a.getSkillRating) == null ? void 0 : L.call(a, o)) ?? ((oe = (X = (G = a == null ? void 0 : a.system) == null ? void 0 : G.skills) == null ? void 0 : X[o]) == null ? void 0 : oe.rating), 0)) : 0, u = wg(t, i, "tactics"), d = c - u, m = Math.abs(d), f = Math.max(0, Number(((ge = t == null ? void 0 : t.activeArmor) == null ? void 0 : ge.defenseBonus) ?? 0) || 0), p = String(((de = e == null ? void 0 : e.attack) == null ? void 0 : de.rangeBand) ?? "").trim() || "range", g = [{
    id: "weapon.attackRating",
    label: `Weapon AR (${((V = (M = e == null ? void 0 : e.attack) == null ? void 0 : M.weapon) == null ? void 0 : V.type) === "personalWeapon" || (ie = (ne = e == null ? void 0 : e.attack) == null ? void 0 : ne.weapon) != null && ie.isSynthetic ? rs(p) : p})`,
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
  }), (Ge = (Me = e == null ? void 0 : e.attack) == null ? void 0 : Me.aim) != null && Ge.eligible && g.push({
    id: "state.aim",
    label: `Aim (${l})`,
    value: c
  }), y.push({
    id: "target.armorDefense",
    label: "Armor Defense",
    value: f
  });
  const b = vl(g), S = vl(y);
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
function vg(a = {}, e = {}) {
  var m, f, p, h, g, y, b, S;
  const t = (a == null ? void 0 : a.attack) ?? {}, i = String(((f = (m = t == null ? void 0 : t.payload) == null ? void 0 : m.modifies) == null ? void 0 : f.damageType) ?? "").trim(), n = Math.max(0, Number(((p = t == null ? void 0 : t.weapon) == null ? void 0 : p.damage) ?? 0) || 0), s = Ut(i || ((h = t == null ? void 0 : t.weapon) == null ? void 0 : h.damageType), "concussive"), r = Math.max(0, Number((t == null ? void 0 : t.totalAp) ?? ((g = t == null ? void 0 : t.weapon) == null ? void 0 : g.ap) ?? 0) || 0), o = e.outcome === "graze" ? n / 2 : e.outcome === "hit" ? n : 0, l = o + Number(e.netHits ?? 0), c = Kr((t == null ? void 0 : t.currentExposure) ?? Ri({
    tier: ((y = t == null ? void 0 : t.currentExposure) == null ? void 0 : y.initialTier) ?? ((b = t == null ? void 0 : t.currentExposure) == null ? void 0 : b.tier) ?? "none"
  }), {
    active: !!(t != null && t.evadeActive),
    locked: !!(t != null && t.evadeLocked)
  }), u = di((t == null ? void 0 : t.areaEffect) ?? ((S = t == null ? void 0 : t.payload) == null ? void 0 : S.areaEffect) ?? {}), d = u.kind === rt.persistent ? l : Wi(l, c.finalTier);
  return {
    baseDamage: n,
    effectiveWeaponDamage: o,
    netHits: Number(e.netHits ?? 0),
    incoming: l,
    scaledIncoming: d,
    ap: r,
    damageType: s,
    damageTypeLabel: Wt(s),
    exposure: c,
    areaEffect: u
  };
}
function kg(a = {}) {
  return String((a == null ? void 0 : a.tokenUuid) ?? (a == null ? void 0 : a.actorUuid) ?? (a == null ? void 0 : a.tokenId) ?? (a == null ? void 0 : a.actorId) ?? (a == null ? void 0 : a.name) ?? foundry.utils.randomID()).trim();
}
function Eg({ attacker: a, ctx: e, damage: t } = {}) {
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
    notes: (o = t == null ? void 0 : t.exposure) != null && o.initialTier ? `Exposure ${kt(t.exposure.initialTier)}${t.exposure.evadeUsed ? ` -> ${kt(t.exposure.finalTier)}` : ""}` : ""
  };
}
function Oa(a, e = {}, t = {}, { queued: i = !1, applied: n = !1, skipped: s = !1, reason: r = "" } = {}) {
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
async function Mg({ attacker: a, ctx: e, target: t, outcome: i, damage: n } = {}) {
  var c;
  if ((i == null ? void 0 : i.outcome) === "miss")
    return Oa(null, t, n, { skipped: !0, reason: "Missed target." });
  if (((c = n == null ? void 0 : n.areaEffect) == null ? void 0 : c.kind) === rt.persistent)
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
    return console.warn("MWD | Unable to resolve target for queued attack damage", t, u), Oa(null, t, n, { reason: "Unable to resolve attack target." });
  }
  const o = Eg({ attacker: a, ctx: e, damage: n }), l = await pt.apply({
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
    const u = Oa(l, t, n, { queued: !0, applied: !1 });
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
  return Oa(l, t, n, { reason: "Unable to preview attack damage." });
}
async function Cg({ attacker: a, ctx: e, outcomeModel: t, target: i, previewState: n = {} } = {}) {
  var y, b;
  const s = await Tg({ attacker: a, ctx: e, target: i }), r = Number((t == null ? void 0 : t.margin) ?? 0), o = Number(s.value ?? 0), l = r;
  let c = o > 0 ? r >= 1 ? "hit" : r === 0 ? "graze" : "miss" : o < 0 ? r >= 2 ? "hit" : r === 1 ? "graze" : "miss" : r >= 1 ? "hit" : "miss";
  String(((y = e == null ? void 0 : e.attack) == null ? void 0 : y.rangeBand) ?? "").trim().toLowerCase() === "outofrange" && c === "hit" && (c = "graze");
  const u = c === "hit" ? Math.max(0, l) : 0, d = (e == null ? void 0 : e.attack) ?? {}, m = kg(i), f = (n == null ? void 0 : n[m]) ?? {}, p = (i == null ? void 0 : i.exposure) ?? Ri({ tier: "none" }), h = vg({
    ...e,
    attack: {
      ...d,
      currentExposure: p,
      areaEffect: (d == null ? void 0 : d.areaEffect) ?? ((b = d == null ? void 0 : d.payload) == null ? void 0 : b.areaEffect) ?? null,
      evadeActive: !!(f != null && f.evadeActive),
      evadeLocked: !!(p != null && p.evadeLocked)
    }
  }, { outcome: c, netHits: u }), g = await Mg({
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
function Pg(a = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of a)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
async function Nu({ attacker: a, ctx: e, outcomeModel: t, previewState: i = {}, existingAttackResult: n = null } = {}) {
  var c, u, d, m, f, p;
  const s = bg(e), r = [];
  for (const h of s)
    r.push(await Cg({ attacker: a, ctx: e, outcomeModel: t, target: h, previewState: i }));
  const o = di(((c = e == null ? void 0 : e.attack) == null ? void 0 : c.areaEffect) ?? ((d = (u = e == null ? void 0 : e.attack) == null ? void 0 : u.payload) == null ? void 0 : d.areaEffect) ?? {});
  let l = String((n == null ? void 0 : n.persistentRegionUuid) ?? "").trim() || null;
  if (o.kind === rt.persistent && !l) {
    const h = await kf({
      attacker: a,
      attack: (e == null ? void 0 : e.attack) ?? {},
      targetResult: r[0] ?? null
    });
    l = (h == null ? void 0 : h.uuid) ?? null;
  }
  return {
    targetCount: s.length,
    results: r,
    summary: Pg(r),
    areaEffect: o,
    templateGeometry: li(Ue(
      (m = e == null ? void 0 : e.attack) == null ? void 0 : m.templateGeometry,
      {
        template: (f = e == null ? void 0 : e.attack) == null ? void 0 : f.template,
        placement: (p = e == null ? void 0 : e.attack) == null ? void 0 : p.templatePlacement
      }
    )),
    persistentRegionUuid: l
  };
}
function Oe(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? Math.trunc(t) : e;
}
function Ls(a, e = 0, t = Number.POSITIVE_INFINITY) {
  const i = Oe(a, e);
  return Math.max(e, Math.min(t, i));
}
function Ru(a, e = 1) {
  var i;
  const t = Oe((i = a == null ? void 0 : a.difficulty) == null ? void 0 : i.dn, Oe(e, 1));
  return Math.max(0, t);
}
function Ng(a, e) {
  return Math.max(0, Oe(a, 0) - Oe(e, 0));
}
function Rg({ convert: a, remainder: e, rate: t = 4 } = {}) {
  const i = Math.max(0, Oe(e, 0)), n = Math.max(1, Oe(t, 4)), s = Math.max(0, Oe(a, 0)), r = Math.floor(s / n) * n;
  return Math.min(i, r);
}
function bo(a, { rate: e = 4, maxPerRoll: t = Number.POSITIVE_INFINITY } = {}) {
  const i = Math.max(1, Oe(e, 4)), n = Math.floor(Math.max(0, Oe(a, 0)) / i), s = Number.isFinite(t) ? Math.max(0, Oe(t, 0)) : Number.POSITIVE_INFINITY;
  return { amount: Math.min(n, s), rate: i };
}
function So(a) {
  var i;
  const e = ((i = a == null ? void 0 : a.edge) == null ? void 0 : i.earn) ?? {};
  return {
    enabled: !!(e != null && e.enabled),
    rate: Math.max(1, Oe(e == null ? void 0 : e.rate, 4)),
    maxPerRoll: (e == null ? void 0 : e.maxPerRoll) ?? Number.POSITIVE_INFINITY
  };
}
function Gn(a) {
  var t;
  const e = (t = a == null ? void 0 : a.edge) == null ? void 0 : t.pool;
  return e ? String(e) : null;
}
function Ig(a) {
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
function Iu(a, e) {
  if (Oe(a, 0) !== 0) return !1;
  const { dice: t, ones: i } = Ig(e);
  return t <= 0 ? !1 : i >= Math.ceil(t / 2);
}
function Dg(a, e, t = 4) {
  return !!(a && Oe(e, 0) >= Oe(t, 4));
}
function kl(a, e) {
  const t = Oe(e == null ? void 0 : e.successes, 0), i = Ru(a, 1), n = t >= i, s = t - i, r = Dg(n, s, 4), o = Iu(t, e == null ? void 0 : e.raw), l = So(a), c = l.maxPerRoll ?? 1, u = l.enabled && s >= l.rate ? (() => {
    const { amount: m, rate: f } = bo(s, { rate: l.rate, maxPerRoll: c }), p = Gn(a);
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
function Og(a, e, t) {
  var m, f;
  const i = Oe(e == null ? void 0 : e.successes, 0), n = Oe(t == null ? void 0 : t.successes, 0), s = !!((m = a == null ? void 0 : a.opposed) != null && m.net), r = String(((f = a == null ? void 0 : a.opposed) == null ? void 0 : f.dnTies) ?? "stalemate");
  let o = null, l = !1;
  s ? (o = i - n, o > 0 ? l = !0 : o < 0 ? l = !1 : r === "attackerWins" ? l = !0 : l = !1) : i > n ? l = !0 : i < n ? l = !1 : r === "attackerWins" ? l = !0 : l = !1;
  const c = So(a), u = c.maxPerRoll ?? 1, d = c.enabled && s && typeof o == "number" && o >= c.rate ? (() => {
    const { amount: p, rate: h } = bo(o, { rate: c.rate, maxPerRoll: u }), g = Gn(a);
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
function _g(a, e) {
  var h, g, y;
  const t = Oe(e == null ? void 0 : e.successes, 0), i = Ru(a, 1), n = t >= i, s = Iu(t, e == null ? void 0 : e.raw), r = Ng(t, i), o = ((h = a == null ? void 0 : a.net) == null ? void 0 : h.convert) ?? ((g = a == null ? void 0 : a.allocation) == null ? void 0 : g.convert) ?? 0, l = So(a), c = l.rate, u = Rg({ convert: o, remainder: r, rate: c }), d = r - u, m = l.enabled && u >= c ? (() => {
    const { amount: b } = bo(u, { rate: c, maxPerRoll: l.maxPerRoll }), S = Gn(a);
    return b > 0 ? { amount: b, pool: S, reason: "convert4", details: { converted: u, rate: c } } : null;
  })() : null, f = s ? { amount: 1, pool: Gn(a), reason: "critFail", details: { onesRule: "halfOrMoreOnes" } } : null, p = [];
  return m && p.push(m), f && p.push(f), p.length === 0 || (p.length === 1 ? p[0] : (p.reduce((b, S) => b + (Number(S == null ? void 0 : S.amount) || 0), 0), (y = p[0]) == null || y.pool)), {
    rollType: "net",
    passed: n,
    successes: t,
    difficulty: { dn: i },
    criticalFailure: s,
    tier: s ? "criticalFailure" : n ? "success" : "failure",
    net: {
      remainder: r,
      convertRequested: Oe(o, 0),
      converted: u,
      value: d,
      // the actual net effect magnitude you apply (+net dice, etc.)
      rate: c,
      canConvert: r >= c
    },
    edgeEarned: m
  };
}
function xg(a, e) {
  var o, l, c, u;
  const t = Oe(e == null ? void 0 : e.successes, 0), i = Ls((o = a == null ? void 0 : a.extended) == null ? void 0 : o.target, 1, 1e4), n = Ls((l = a == null ? void 0 : a.extended) == null ? void 0 : l.accumulated, 0, 1e4), s = Ls(n + t, 0, 1e4), r = s >= i;
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
function Du(a, e, t = null) {
  var n;
  switch (String((a == null ? void 0 : a.rollType) ?? "simple")) {
    case "simple":
      return kl(a, e);
    case "opposed":
      return Og(a, e, t);
    case "net":
      return _g(a, e);
    case "extended":
      return xg(a, e);
    default: {
      const s = {
        ...a,
        difficulty: { dn: Number(((n = a == null ? void 0 : a.difficulty) == null ? void 0 : n.dn) ?? 1) || 1 }
      };
      return kl(s, e);
    }
  }
}
function Lg(a, e) {
  var c, u, d, m, f, p, h, g, y;
  const t = a ?? {}, i = Array.isArray((c = t == null ? void 0 : t.modifiers) == null ? void 0 : c.applied) ? t.modifiers.applied : [], n = Number(((u = t == null ? void 0 : t.modifiers) == null ? void 0 : u.total) ?? 0);
  if (i.length) {
    const b = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((S) => S.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${i.map((S) => `${S.label} ${El(S.value)}`).join(", ")} (Total ${El(n)})`,
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
function El(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function $g(a, e) {
  var g, y, b, S, T, C, N, P, F, K, Y, W, j, x, L, G, X, oe, ge, de;
  const t = a ?? {}, i = (t == null ? void 0 : t.attackResult) ?? null;
  if (!i) return;
  const n = Array.isArray(i == null ? void 0 : i.results) ? i.results : [], s = (i == null ? void 0 : i.summary) ?? zg(n), r = n.some((M) => {
    var V;
    return !!((V = M == null ? void 0 : M.queuedMutation) != null && V.applied);
  }), o = n.filter(
    (M) => (M == null ? void 0 : M.queuedMutation) && !M.queuedMutation.applied
  ), l = !!((y = (g = t == null ? void 0 : t.attack) == null ? void 0 : g.capabilityReport) != null && y.isTemplated), c = Array.isArray((b = t == null ? void 0 : t.modifiers) == null ? void 0 : b.applied) ? t.modifiers.applied : [], u = Number(((S = t == null ? void 0 : t.modifiers) == null ? void 0 : S.total) ?? 0);
  if (c.length) {
    const M = Array.isArray(t == null ? void 0 : t.breakdownRows) ? t.breakdownRows.find((V) => V.id === "mods.total") : null;
    e.metaRows.push({
      text: `Mods: ${c.map((V) => `${V.label} ${ra(V.value)}`).join(", ")} (Total ${ra(u)})`,
      title: (M == null ? void 0 : M.tooltip) ?? ""
    });
  }
  const d = (t == null ? void 0 : t.edge) ?? null, m = Array.isArray((T = t == null ? void 0 : t.roll) == null ? void 0 : T.failureDiceRefs) ? t.roll.failureDiceRefs : [], f = !!((C = d == null ? void 0 : d.availableActions) != null && C.canPostRerollFailures) && !r, p = Array.isArray((N = d == null ? void 0 : d.allowed) == null ? void 0 : N.postPools) ? d.allowed.postPools : [];
  if (d != null && d.domain && (e.edge = {
    domain: d.domain,
    earned: ((P = t == null ? void 0 : t.outcomeModel) == null ? void 0 : P.edgeEarned) ?? null,
    preSpent: Number(((F = d == null ? void 0 : d.pre) == null ? void 0 : F.spent) ?? 0),
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
    for (const M of e.edge.postPools)
      e.actions.push({
        action: "edgePostReroll",
        label: `Spend ${M}`,
        dataset: { "pool-key": M },
        cssClass: "mwd-edge-post"
      });
  }
  const h = String((s == null ? void 0 : s.overallOutcome) ?? "").trim();
  if (e.outcomeText = n.length > 1 ? `ATTACK ${s.hits} HIT / ${s.grazes} GRAZE / ${s.misses} MISS` : h === "hit" ? "HIT!" : h === "graze" ? "GRAZE!" : "MISS!", e.metaRows.push({
    text: `Targets: ${n.length || 0}`,
    title: ""
  }), l && (e.targetRows = n.map((M, V) => {
    var Mt, Ct, Pt, Nt, Rt, It, ct, Dt;
    const ne = ((Mt = t == null ? void 0 : t.areaEffectPreviewState) == null ? void 0 : Mt[M == null ? void 0 : M.previewKey]) ?? {}, ie = ((Ct = M == null ? void 0 : M.damage) == null ? void 0 : Ct.exposure) ?? (M == null ? void 0 : M.exposure) ?? null, Me = String((ie == null ? void 0 : ie.initialLabel) ?? "NONE").trim() || "NONE", Ge = String((ie == null ? void 0 : ie.finalLabel) ?? Me).trim() || Me, ht = Number(((Pt = M == null ? void 0 : M.damage) == null ? void 0 : Pt.incoming) ?? 0), gt = Number(((Nt = M == null ? void 0 : M.damage) == null ? void 0 : Nt.scaledIncoming) ?? ht), ot = (M == null ? void 0 : M.queuedMutation) ?? null, yt = !!(ot != null && ot.applied || (Rt = M == null ? void 0 : M.damageResult) != null && Rt.applied), We = (ne == null ? void 0 : ne.reactionPreview) ?? null, lt = [];
    if (!yt && Me !== "NONE" && ((It = M == null ? void 0 : M.damageResult) != null && It.ok) && !((ct = M == null ? void 0 : M.damageResult) != null && ct.skipped) && lt.push({
      action: "toggleEvade",
      label: M != null && M.evadeActive ? "Clear Evade" : "Use Reaction",
      dataset: { "preview-key": M.previewKey },
      cssClass: `mwd-target-row__action ${M != null && M.evadeActive ? "is-active" : ""}`
    }), M != null && M.evadeActive && (We != null && We.canSpendEdge) && Array.isArray(We.edgePools))
      for (const E of We.edgePools)
        lt.push({
          action: "toggleEvadeEdge",
          label: (ne == null ? void 0 : ne.edgePoolKey) === E.key ? `Edge: ${E.key}` : `Use ${E.key}`,
          dataset: {
            "preview-key": M.previewKey,
            "pool-key": E.key
          },
          cssClass: `mwd-target-row__action ${(ne == null ? void 0 : ne.edgePoolKey) === E.key ? "is-active" : ""}`
        });
    return ot && !yt && lt.push({
      action: "applyAttackDamage",
      label: "Apply Damage",
      dataset: { "result-index": String(V) },
      cssClass: "mwd-target-row__action mwd-apply-attack-damage"
    }), {
      targetName: ((Dt = M == null ? void 0 : M.target) == null ? void 0 : Dt.name) ?? "Target",
      applied: yt,
      outcomeLabel: String((M == null ? void 0 : M.outcome) ?? "miss").toUpperCase(),
      exposureLabel: Me === Ge ? Me : `${Me} -> ${Ge}`,
      damageLabel: ht === gt ? String(gt) : `${ht} -> ${gt}`,
      reactionHint: M != null && M.evadeActive ? ne != null && ne.edgePoolKey ? "Evade active. Reaction Burn canceled by Edge." : (We == null ? void 0 : We.burnDelta) > 0 ? `Evade active. This reaction adds +${We.burnDelta} Burn.` : "Evade active." : "",
      rowActions: lt
    };
  })), n.length > 1 && o.length > 1 && e.actions.push({
    action: "applyAllAttackDamage",
    label: `Apply All Damage (${o.length})`,
    cssClass: "mwd-apply-all-attack-damage"
  }), !l)
    for (const M of n) {
      const V = Number(((j = (W = M == null ? void 0 : M.cq) == null ? void 0 : W.ar) == null ? void 0 : j.total) ?? 0), ne = Number(((L = (x = M == null ? void 0 : M.cq) == null ? void 0 : x.dr) == null ? void 0 : L.total) ?? 0);
      e.metaRows.push({
        text: `${((G = M == null ? void 0 : M.target) == null ? void 0 : G.name) ?? "Target"}: ${String((M == null ? void 0 : M.outcome) ?? "miss").toUpperCase()} | CQ ${ra(((X = M == null ? void 0 : M.cq) == null ? void 0 : X.value) ?? 0)} (AR ${V} - DR ${ne}) | Net ${Number((M == null ? void 0 : M.netHits) ?? 0)}`,
        title: Bg(M == null ? void 0 : M.cq)
      });
    }
  if (!l)
    for (const [M, V] of n.entries()) {
      const ne = (V == null ? void 0 : V.damage) ?? null;
      ne && (V == null ? void 0 : V.outcome) !== "miss" && e.footerRows.push({
        text: `${((oe = V == null ? void 0 : V.target) == null ? void 0 : oe.name) ?? "Target"}: ${ne.damageTypeLabel} ${ra(ne.effectiveWeaponDamage)} weapon${ne.netHits ? ` + ${ne.netHits} net` : ""}`,
        title: ""
      });
      const ie = (V == null ? void 0 : V.damageResult) ?? null;
      if (ie != null && ie.ok && !(ie != null && ie.skipped)) {
        const Me = (V == null ? void 0 : V.queuedMutation) ?? (ie == null ? void 0 : ie.queuedMutation) ?? null, Ge = !!(Me != null && Me.applied || ie != null && ie.applied);
        Me && !Ge && e.actions.push({
          action: "applyAttackDamage",
          label: `Apply Damage: ${ie.actorName ?? ((ge = V == null ? void 0 : V.target) == null ? void 0 : ge.name) ?? "Target"}`,
          dataset: { "result-index": String(M) },
          cssClass: "mwd-apply-attack-damage"
        });
      } else ie != null && ie.reason && e.footerRows.push({
        text: `${((de = V == null ? void 0 : V.target) == null ? void 0 : de.name) ?? "Target"}: ${ie.reason}`,
        title: ""
      });
    }
}
function Bg(a = {}) {
  var i, n;
  const e = Array.isArray((i = a == null ? void 0 : a.ar) == null ? void 0 : i.parts) ? a.ar.parts : [], t = Array.isArray((n = a == null ? void 0 : a.dr) == null ? void 0 : n.parts) ? a.dr.parts : [];
  return [
    ...e.map((s) => `AR - ${s.label}: ${ra(s.value)}`),
    ...t.map((s) => `DR - ${s.label}: ${ra(s.value)}`)
  ].join(`
`);
}
function zg(a = []) {
  const e = { hits: 0, grazes: 0, misses: 0 };
  for (const t of a)
    (t == null ? void 0 : t.outcome) === "hit" ? e.hits += 1 : (t == null ? void 0 : t.outcome) === "graze" ? e.grazes += 1 : e.misses += 1;
  return {
    ...e,
    overallOutcome: e.hits > 0 ? "hit" : e.grazes > 0 ? "graze" : "miss"
  };
}
function ra(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function Fg(a, e) {
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
function Hg(a, e) {
  var l, c, u, d;
  const t = a ?? {}, i = (t == null ? void 0 : t.outcomeModel) ?? {}, n = Number(((l = i == null ? void 0 : i.attacker) == null ? void 0 : l.successes) ?? (i == null ? void 0 : i.attackerHits) ?? NaN), s = Number(((c = i == null ? void 0 : i.defender) == null ? void 0 : c.successes) ?? (i == null ? void 0 : i.defenderHits) ?? NaN), r = Number((i == null ? void 0 : i.netHits) ?? (i == null ? void 0 : i.net) ?? NaN);
  Number.isFinite(n) && Number.isFinite(s) && e.metaRows.push({ text: `Opposed: Att ${n} vs Def ${s} • Net ${Number.isFinite(r) ? r : n - s}` }), (u = t == null ? void 0 : t.incoming) != null && u.label && (e.incoming = { label: t.incoming.label, value: t.incoming.value ?? "" }, e.footerRows.push({ text: `Incoming: ${e.incoming.label} ${e.incoming.value}` }));
  const o = ((d = i == null ? void 0 : i.edgeEarned) == null ? void 0 : d.amount) > 0 ? i.edgeEarned : null;
  o && e.footerRows.push({ text: `Edge Earned: +${o.amount}${o.pool ? ` (${o.pool})` : ""}` });
}
function Ug(a, e) {
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
const Wg = {
  skill: Lg,
  attack: $g,
  net: Fg,
  opposed: Hg,
  extended: Ug
  // defense: enhanceDefense,
  // edge: enhanceEdge,
};
async function en({ resolved: a } = {}) {
  const e = a ?? {}, t = jg(e), i = Wg[t.intent];
  return typeof i == "function" && i(e, t), await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-roll-card",
    t
  );
}
function jg(a) {
  var f, p, h, g, y, b, S, T, C, N, P, F, K, Y, W, j, x;
  const e = a ?? {}, t = Number(((f = e == null ? void 0 : e.roll) == null ? void 0 : f.target) ?? 5), i = Number(((p = e == null ? void 0 : e.dn) == null ? void 0 : p.total) ?? ((g = (h = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : h.dn) == null ? void 0 : g.total) ?? ((b = (y = e == null ? void 0 : e.ctxSnapshot) == null ? void 0 : y.difficulty) == null ? void 0 : b.dn) ?? 0), n = Number(((S = e == null ? void 0 : e.roll) == null ? void 0 : S.pool) ?? 0), s = Number(((T = e == null ? void 0 : e.outcome) == null ? void 0 : T.hits) ?? 0), r = (e == null ? void 0 : e.outcomeModel) ?? {}, o = typeof r.passed == "boolean" ? r.passed : s >= i, l = Number.isFinite(Number(r.margin)) ? Number(r.margin) : s - i, c = r.tier ?? null, u = Array.isArray(e == null ? void 0 : e.breakdownRows) ? e.breakdownRows.map((L) => `${L.label}: ${L.value}`).join(`
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
  if ((C = e == null ? void 0 : e.specialization) != null && C.label && d.metaRows.push({
    text: `Specialization: ${e.specialization.label} (+${Number(e.specialization.value ?? 0)})`,
    title: ""
  }), (N = m == null ? void 0 : m.weapon) != null && N.name) {
    const L = ((P = m == null ? void 0 : m.weapon) == null ? void 0 : P.type) === "personalWeapon" || (F = m == null ? void 0 : m.weapon) != null && F.isSynthetic ? rs((m == null ? void 0 : m.rangeBand) ?? "") : String((m == null ? void 0 : m.rangeBand) ?? "").trim(), G = String(((K = m == null ? void 0 : m.weapon) == null ? void 0 : K.damageTypeLabel) ?? ((Y = m == null ? void 0 : m.weapon) == null ? void 0 : Y.damageType) ?? "").trim(), X = String(((W = m == null ? void 0 : m.payload) == null ? void 0 : W.label) ?? ((j = m == null ? void 0 : m.weapon) == null ? void 0 : j.payloadLabel) ?? "").trim();
    d.metaRows.push({
      text: `Weapon: ${m.weapon.name}${L ? ` • Range: ${L}` : ""}${G ? ` • Type: ${G}` : ""}${X ? ` • Payload: ${X}` : ""}`,
      title: ""
    }), (x = m == null ? void 0 : m.sourceState) != null && x.isTracked && d.footerRows.push({
      text: `Source: ${Number(m.sourceState.current ?? 0)}/${Number(m.sourceState.max ?? 0)}`,
      title: ""
    });
  }
  return d;
}
const Gg = 90, Ga = /* @__PURE__ */ new Map();
function qn() {
  var a, e;
  return Number(((a = canvas.grid) == null ? void 0 : a.size) ?? ((e = canvas.dimensions) == null ? void 0 : e.size) ?? 100) || 100;
}
function qg(a = {}) {
  return Math.max(0, Number((a == null ? void 0 : a.size) ?? 0) || 0);
}
function tn(a) {
  var t, i, n, s;
  return ((i = (t = canvas.tokens) == null ? void 0 : t.controlled) == null ? void 0 : i.find((r) => {
    var o;
    return ((o = r.actor) == null ? void 0 : o.id) === (a == null ? void 0 : a.id);
  })) ?? null ?? ((s = (n = a == null ? void 0 : a.getActiveTokens) == null ? void 0 : n.call(a, !0, !0)) == null ? void 0 : s[0]) ?? null;
}
function Kn(a) {
  var r, o, l, c, u;
  const e = (a == null ? void 0 : a.center) ?? ((r = a == null ? void 0 : a.object) == null ? void 0 : r.center);
  if (e) return { x: Number(e.x ?? 0), y: Number(e.y ?? 0) };
  const t = Number((a == null ? void 0 : a.x) ?? ((o = a == null ? void 0 : a.document) == null ? void 0 : o.x) ?? 0), i = Number((a == null ? void 0 : a.y) ?? ((l = a == null ? void 0 : a.document) == null ? void 0 : l.y) ?? 0), n = Number((a == null ? void 0 : a.w) ?? (a == null ? void 0 : a.width) ?? ((c = a == null ? void 0 : a.document) == null ? void 0 : c.width) ?? 1) * qn(), s = Number((a == null ? void 0 : a.h) ?? (a == null ? void 0 : a.height) ?? ((u = a == null ? void 0 : a.document) == null ? void 0 : u.height) ?? 1) * qn();
  return { x: t + n / 2, y: i + s / 2 };
}
function Kg(a) {
  var i, n, s, r;
  const e = Number((a == null ? void 0 : a.w) ?? ((i = a == null ? void 0 : a.object) == null ? void 0 : i.w) ?? 0) || Number(((n = a == null ? void 0 : a.document) == null ? void 0 : n.width) ?? 1) * qn(), t = Number((a == null ? void 0 : a.h) ?? ((s = a == null ? void 0 : a.object) == null ? void 0 : s.h) ?? 0) || Number(((r = a == null ? void 0 : a.document) == null ? void 0 : r.height) ?? 1) * qn();
  return Math.max(e, t) / 2;
}
function Vg() {
  var t;
  const a = ((t = canvas == null ? void 0 : canvas.stage) == null ? void 0 : t.pivot) ?? null, e = (canvas == null ? void 0 : canvas.dimensions) ?? {};
  return {
    x: Number((a == null ? void 0 : a.x) ?? e.width / 2 ?? 0) || 0,
    y: Number((a == null ? void 0 : a.y) ?? e.height / 2 ?? 0) || 0
  };
}
function Yg() {
  var a;
  return Array.from(((a = game.user) == null ? void 0 : a.targets) ?? []).find((e) => e == null ? void 0 : e.actor) ?? null;
}
function Qg(a, e) {
  return {
    x: (Number((a == null ? void 0 : a.x) ?? 0) + Number((e == null ? void 0 : e.x) ?? 0)) / 2,
    y: (Number((a == null ? void 0 : a.y) ?? 0) + Number((e == null ? void 0 : e.y) ?? 0)) / 2
  };
}
function Jg({ template: a = {}, actor: e = null } = {}) {
  const t = String((a == null ? void 0 : a.placement) ?? "").trim().toLowerCase(), i = tn(e), n = Yg(), s = i ? Kn(i) : null, r = n ? Kn(n) : null;
  return t === "origin" && s ? s : t === "targeted" && r ? r : t === "placed" && s && r ? Qg(s, r) : Vg();
}
function Xg({ attack: a = {}, actor: e = null } = {}) {
  const t = (a == null ? void 0 : a.template) ?? null, i = String((t == null ? void 0 : t.shape) ?? "").trim().toLowerCase();
  if (!i) return null;
  const n = Jg({ template: t, actor: e });
  return Ue({
    shape: i,
    x: n.x,
    y: n.y,
    direction: 0,
    distance: qg(t),
    angle: i === "cone" ? Gg : null,
    width: i === "line" ? 1 : null,
    placementMode: (t == null ? void 0 : t.placement) ?? null
  });
}
function Zg() {
  var e, t;
  const a = new PIXI.Container();
  return a.eventMode = "none", a.sortableChildren = !0, (t = (e = canvas.stage) == null ? void 0 : e.addChild) == null || t.call(e, a), a;
}
function ey(a) {
  var e;
  a != null && a.parent && a.parent.removeChild(a), (e = a == null ? void 0 : a.destroy) == null || e.call(a, { children: !0 });
}
function ty() {
  const a = Zg(), e = new PIXI.Container();
  e.eventMode = "none", e.zIndex = 5;
  const t = new PIXI.Container();
  return t.eventMode = "none", t.zIndex = 10, a.addChild(e), a.addChild(t), { root: a, templateLayer: e, markerLayer: t };
}
function iy(a) {
  ey((a == null ? void 0 : a.root) ?? a);
}
function ay() {
  var t;
  const a = String(((t = game.user) == null ? void 0 : t.color) ?? "#ff6400").replace("#", "").trim(), e = Number.parseInt(a, 16);
  return Number.isFinite(e) ? e : 16737280;
}
function Ou(a) {
  var e;
  (e = a == null ? void 0 : a.removeChildren) == null || e.call(a).forEach((t) => {
    var i;
    return (i = t.destroy) == null ? void 0 : i.call(t, { children: !0 });
  });
}
function ny(a) {
  var o;
  const e = ((o = canvas == null ? void 0 : canvas.app) == null ? void 0 : o.view) ?? null, t = (canvas == null ? void 0 : canvas.stage) ?? null;
  if (!e || !t) return null;
  const i = e.getBoundingClientRect(), n = Number((a == null ? void 0 : a.clientX) ?? NaN), s = Number((a == null ? void 0 : a.clientY) ?? NaN);
  if (!Number.isFinite(n) || !Number.isFinite(s) || n < i.left || n > i.right || s < i.top || s > i.bottom) return null;
  const r = t.toLocal(new PIXI.Point(
    n - i.left,
    s - i.top
  ));
  return {
    x: Number((r == null ? void 0 : r.x) ?? 0) || 0,
    y: Number((r == null ? void 0 : r.y) ?? 0) || 0
  };
}
function sy(a, e) {
  const t = Number((e == null ? void 0 : e.x) ?? 0) - Number((a == null ? void 0 : a.x) ?? 0), i = Number((e == null ? void 0 : e.y) ?? 0) - Number((a == null ? void 0 : a.y) ?? 0);
  return t === 0 && i === 0 ? 0 : Math.atan2(i, t) * 180 / Math.PI;
}
function $s(a = 0) {
  var i, n, s, r, o;
  const e = Number(((i = canvas.grid) == null ? void 0 : i.size) ?? ((n = canvas.dimensions) == null ? void 0 : n.size) ?? 100) || 100, t = Number(((r = (s = canvas.scene) == null ? void 0 : s.grid) == null ? void 0 : r.distance) ?? ((o = canvas.dimensions) == null ? void 0 : o.distance) ?? 1) || 1;
  return Number(a ?? 0) * (e / t);
}
function ry({ geometry: a = null, pointer: e = null, attack: t = {}, actor: i = null } = {}) {
  var l;
  const n = Ue(a);
  if (!n) return null;
  const s = li(n) ?? null;
  if (!s || !e) return s;
  const o = String(((l = t == null ? void 0 : t.template) == null ? void 0 : l.placement) ?? s.placementMode ?? "").trim().toLowerCase() !== "origin";
  if (o && (s.x = e.x, s.y = e.y), ["line", "cone", "rect"].includes(String(s.shape ?? "").trim().toLowerCase())) {
    const c = tn(i), u = c ? Kn(c) : null, d = o ? u ?? { x: Number(n.x ?? 0), y: Number(n.y ?? 0) } : { x: Number(s.x ?? 0), y: Number(s.y ?? 0) };
    s.direction = sy(d, e);
  }
  return Ue(s);
}
function Ml(a, e = null) {
  if (!a) return;
  Ou(a);
  const t = Ue(e);
  if (!t) return;
  const i = ay(), n = new PIXI.Graphics();
  switch (n.lineStyle(3, i, 0.95), n.beginFill(i, 0.18), String(t.shape ?? "").trim().toLowerCase()) {
    case "blast": {
      n.drawCircle(
        Number(t.x ?? 0),
        Number(t.y ?? 0),
        $s(t.distance ?? 0)
      );
      break;
    }
    case "rect": {
      const s = $s(t.width ?? 0), r = $s(t.height ?? 0);
      n.position.set(Number(t.x ?? 0), Number(t.y ?? 0)), n.rotation = Number(t.direction ?? 0) * Math.PI / 180, n.drawRect(
        -(Number(t.anchorX ?? 0) || 0) * s,
        -(Number(t.anchorY ?? 0) || 0) * r,
        s,
        r
      );
      break;
    }
    default: {
      const [s] = Vr(t);
      (s == null ? void 0 : s.type) === "polygon" && Array.isArray(s.points) && s.points.length >= 3 && n.drawPolygon(s.points.flatMap((r) => [Number((r == null ? void 0 : r.x) ?? 0), Number((r == null ? void 0 : r.y) ?? 0)]));
      break;
    }
  }
  n.endFill(), a.addChild(n);
}
function oy(a = te.none) {
  return a === te.full ? 14042437 : a === te.major ? 15174447 : a === te.minor ? 15782993 : 10134706;
}
function Cl(a, e = []) {
  if (a) {
    Ou(a);
    for (const t of e) {
      const i = Kn(t.token), n = Math.max(20, Kg(t.token) + 12), s = oy(t.exposureTier), r = new PIXI.Graphics();
      r.lineStyle(4, s, 0.95), r.beginFill(s, 0.14), r.drawCircle(i.x, i.y, n), r.endFill(), r.zIndex = 10;
      const o = new PIXI.Text(kt(t.exposureTier), {
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
function _u(a, e = {}) {
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
    exposure: Ri({
      tier: ((h = e == null ? void 0 : e.exposure) == null ? void 0 : h.initialTier) ?? ((g = e == null ? void 0 : e.exposure) == null ? void 0 : g.tier) ?? (e == null ? void 0 : e.exposureTier) ?? te.none,
      appliedTier: ((y = e == null ? void 0 : e.exposure) == null ? void 0 : y.finalTier) ?? ((b = e == null ? void 0 : e.exposure) == null ? void 0 : b.appliedTier) ?? (e == null ? void 0 : e.exposureTier) ?? te.none,
      evadeUsed: !!((S = e == null ? void 0 : e.exposure) != null && S.evadeUsed),
      evadeLocked: !!((T = e == null ? void 0 : e.exposure) != null && T.evadeLocked)
    }),
    areaEffect: e != null && e.areaEffect ? foundry.utils.deepClone(e.areaEffect) : null
  };
}
function ly({ attack: a = {}, geometry: e = null, attacker: t = null } = {}) {
  var o;
  const i = (a == null ? void 0 : a.template) ?? null, n = Ue(e);
  if (!i || !n) return [];
  const s = tn(t), r = (s == null ? void 0 : s.id) ?? null;
  return (((o = canvas.tokens) == null ? void 0 : o.placeables) ?? []).filter((l) => l == null ? void 0 : l.actor).filter((l) => l.id !== r || (i == null ? void 0 : i.placement) === "origin").filter((l) => qr(n, l)).map((l) => {
    const c = sc({ geometry: n, token: l });
    return _u(l, {
      exposureTier: c,
      areaEffect: {
        templateShape: (i == null ? void 0 : i.shape) ?? "",
        templatePlacement: (i == null ? void 0 : i.placement) ?? "",
        templateGeometry: li(n)
      }
    });
  }).filter(Boolean);
}
function Pl({ attack: a = {}, geometry: e = null, attacker: t = null } = {}) {
  var o;
  const i = (a == null ? void 0 : a.template) ?? null, n = tn(t), s = (n == null ? void 0 : n.id) ?? null, r = Ue(e);
  return !i || !r ? [] : (((o = canvas.tokens) == null ? void 0 : o.placeables) ?? []).filter((l) => l == null ? void 0 : l.actor).filter((l) => l.id !== s || (i == null ? void 0 : i.placement) === "origin").filter((l) => qr(r, l)).map((l) => ({
    token: l,
    exposureTier: sc({ geometry: r, token: l })
  }));
}
function cy({ attack: a = {}, requestId: e = "" } = {}) {
  var n;
  const t = String(((n = a == null ? void 0 : a.template) == null ? void 0 : n.shape) ?? "template").trim().toLowerCase(), i = t ? `${t.slice(0, 1).toUpperCase()}${t.slice(1)}` : "Template";
  return `
    <div class="mwd-template-placement-card">
      <p style="margin: 0 0 0.65rem;">${foundry.utils.escapeHTML(i)} placement: Move the cursor on the canvas, then <strong>Confirm</strong> or <strong>Cancel</strong> the attack.</p>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button type="button" data-mwd-action="templatePlacementConfirm" data-request-id="${foundry.utils.escapeHTML(e)}">Confirm</button>
        <button type="button" data-mwd-action="templatePlacementCancel" data-request-id="${foundry.utils.escapeHTML(e)}">Cancel</button>
      </div>
    </div>
  `;
}
function uy({ requestId: a = "", resolve: e = null, messageId: t = "" } = {}) {
  !a || typeof e != "function" || Ga.set(a, {
    resolve: e,
    messageId: String(t ?? "").trim()
  });
}
function dy(a, e = !1) {
  const t = String(a ?? "").trim();
  if (!t) return !1;
  const i = Ga.get(t);
  return i ? (Ga.delete(t), i.resolve(!!e), !0) : !1;
}
async function my({ actor: a = null, attack: e = {}, requestId: t = "" } = {}) {
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: a }),
    whisper: [game.user.id],
    content: cy({ attack: e, requestId: t }),
    flags: {
      mwd: {
        templatePlacementRequest: {
          requestId: t
        }
      }
    }
  });
}
async function fy({ attack: a = {} } = {}) {
  var n;
  const e = foundry.utils.randomID(), t = await my({
    actor: (a == null ? void 0 : a.actor) ?? ((n = a == null ? void 0 : a.weapon) == null ? void 0 : n.actor) ?? null,
    attack: a,
    requestId: e
  }), i = await new Promise((s) => {
    uy({
      requestId: e,
      resolve: s,
      messageId: (t == null ? void 0 : t.id) ?? ""
    });
  });
  try {
    t != null && t.id && await t.delete();
  } catch {
  }
  return !!i;
}
function py(a, e = !1) {
  return dy(a, e);
}
function hy(a = "") {
  const e = String(a ?? "").trim();
  if (!e) return !1;
  for (const [t, i] of Ga.entries())
    if ((i == null ? void 0 : i.messageId) === e)
      return Ga.delete(t), i.resolve(!1), !0;
  return !1;
}
async function gy({ actor: a, attack: e } = {}) {
  if (!(canvas != null && canvas.scene))
    throw Bi("Templated attacks require an active scene canvas.", { severity: "warn" });
  const t = (e == null ? void 0 : e.template) ?? null;
  if (!(t != null && t.shape) || !(Number(t == null ? void 0 : t.size) > 0))
    throw Bi("Templated attack is missing valid template configuration.", { severity: "warn" });
  if (!kd.includes(t.shape))
    throw Bi(`Template shape "${t.shape}" is normalized but not supported in v1.`, { severity: "warn" });
  const i = tn(a);
  if (t.placement === "origin" && !i)
    throw Bi("Origin-placed templated attacks require the attacker to have a token on the current scene.", { severity: "warn" });
  const n = Xg({ attack: e, actor: a });
  if (!n)
    throw Bi("Unable to initialize template placement for this attack.", { severity: "warn" });
  let s = li(n);
  const r = ty(), o = (l) => {
    const c = ny(l), u = ry({
      geometry: s,
      pointer: c,
      attack: e,
      actor: a
    });
    u && (s = u, Ml(r.templateLayer, s), Cl(r.markerLayer, Pl({ attack: e, geometry: s, attacker: a })));
  };
  try {
    if (Ml(r.templateLayer, s), Cl(r.markerLayer, Pl({ attack: e, geometry: s, attacker: a })), window.addEventListener("pointermove", o), !await fy({ attack: e })) return null;
    const c = li(s);
    if (!c) return null;
    const u = jd(c, t), d = ly({
      attack: e,
      geometry: c,
      attacker: a
    });
    return {
      templateGeometry: li(c),
      placement: (u == null ? void 0 : u.placement) ?? null,
      targetSnapshots: d
    };
  } finally {
    window.removeEventListener("pointermove", o), iy(r);
  }
}
function yy() {
  Hooks.on("renderChatMessageHTML", (a, e) => {
    e.addEventListener("click", (t) => {
      const i = t.target.closest("[data-mwd-action]");
      if (!i) return;
      const n = String(i.dataset.mwdAction || "").trim();
      n && (n === "edgePostReroll" && xy(t, a), n === "toggleEvade" && Py(t, a), n === "toggleEvadeEdge" && Ny(t, a), n === "toggleHazardEvade" && Iy(t, a), n === "toggleHazardEvadeEdge" && Dy(t, a), n === "applyHazardTick" && Oy(t, a), n === "applyAttackDamage" && My(t, a), n === "applyAllAttackDamage" && Ry(t, a), n === "templatePlacementConfirm" && Nl(t, !0), n === "templatePlacementCancel" && Nl(t, !1));
    });
  }), Hooks.on("deleteChatMessage", (a) => {
    hy((a == null ? void 0 : a.id) ?? "");
  });
}
function Nl(a, e = !1) {
  var n;
  a.preventDefault();
  const t = a.target.closest("[data-request-id]"), i = String(((n = t == null ? void 0 : t.dataset) == null ? void 0 : n.requestId) ?? "").trim();
  i && py(i, e);
}
function by(a = {}) {
  var t;
  return (Array.isArray((t = a == null ? void 0 : a.attackResult) == null ? void 0 : t.results) ? a.attackResult.results : []).some((i) => {
    var n;
    return !!((n = i == null ? void 0 : i.queuedMutation) != null && n.applied);
  });
}
function Sy(a) {
  return a === A.monitors.physical ? "Physical" : a === A.monitors.fatigue ? "Fatigue" : String(a ?? "").trim() || "Track";
}
function Ay(a) {
  const e = String(a ?? "").trim().toLowerCase();
  return e === "penetrating" ? "is-penetrating" : e === "energy" ? "is-energy" : e === "thermal" ? "is-thermal" : e === "electrical" ? "is-electrical" : "is-concussive";
}
function wy(a) {
  const e = Math.max(0, Number(a ?? 0) || 0);
  return e <= 0 ? { key: "is-none", label: "No Penetration" } : e <= 2 ? { key: "is-light", label: "Light Damage" } : e <= 4 ? { key: "is-medium", label: "Moderate Damage" } : e <= 7 ? { key: "is-heavy", label: "Heavy Damage" } : { key: "is-critical", label: "Critical Damage" };
}
function Ty({ actor: a = null, token: e = null } = {}) {
  var s;
  const t = (e == null ? void 0 : e.document) ?? e ?? null, i = String(((s = t == null ? void 0 : t.texture) == null ? void 0 : s.src) ?? "").trim(), n = String((a == null ? void 0 : a.img) ?? "").trim();
  return i || n || "icons/svg/mystery-man.svg";
}
function vy(a) {
  var t, i;
  const e = (i = (t = game.settings) == null ? void 0 : t.get) == null ? void 0 : i.call(t, "core", "rollMode");
  return typeof ChatMessage.applyRollMode == "function" && ChatMessage.applyRollMode(a, e), a;
}
function ky({ summary: a = {}, actor: e = null, token: t = null } = {}) {
  const i = String((a == null ? void 0 : a.damageType) ?? "").trim(), n = Wt(i || "concussive") || "Damage", s = Sy(a == null ? void 0 : a.track), r = Math.max(0, Number((a == null ? void 0 : a.finalDamage) ?? (a == null ? void 0 : a.appliedDelta) ?? 0) || 0), o = wy(r), l = r === 1 ? "1 point" : `${r} points`, c = String((a == null ? void 0 : a.actorName) ?? (e == null ? void 0 : e.name) ?? "Target").trim() || "Target", u = [];
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
    classes: ["mwd-damage-card", Ay(i), o.key].join(" "),
    header: {
      left: "Damage Applied",
      right: s
    },
    target: {
      name: c,
      image: Ty({ actor: e, token: t })
    },
    damageTypeLabel: n,
    severityLabel: o.label,
    impactValue: r,
    impactText: r > 0 ? `${n} damage applied to ${s}.` : `${n} damage did not penetrate.`,
    rows: u
  };
}
async function Ao({ summary: a = {}, actor: e = null, token: t = null } = {}) {
  const i = await foundry.applications.handlebars.renderTemplate(
    "mwd.v2.roll.mwd-damage-application-card",
    ky({ summary: a, actor: e, token: t })
  ), n = vy({
    speaker: ChatMessage.getSpeaker({ actor: e, token: t }),
    content: i
  });
  return ChatMessage.create(n);
}
function Ey(a = {}) {
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
async function xu(a = {}, e = null) {
  var s, r, o;
  const t = Ey(a), i = Number(((s = a == null ? void 0 : a.outcome) == null ? void 0 : s.hits) ?? 0) || 0, n = ((r = a == null ? void 0 : a.outcomeModel) == null ? void 0 : r.edgeEarned) ?? null;
  return a.outcomeModel = Du(t, { successes: i, raw: (o = a == null ? void 0 : a.roll) == null ? void 0 : o.json }, null), a.outcomeModel.edgeEarned = n, t.intent === "attack" && e && t.attack && (a.attackResult = await Nu({
    attacker: e,
    ctx: t,
    outcomeModel: a.outcomeModel,
    previewState: a.areaEffectPreviewState ?? {},
    existingAttackResult: a.attackResult ?? null
  })), a;
}
async function My(a, e) {
  var o, l, c, u, d, m, f;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='applyAttackDamage']"), i = Number((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.resultIndex);
  if (!Number.isInteger(i) || i < 0) return;
  const n = foundry.utils.deepClone((c = (l = e == null ? void 0 : e.flags) == null ? void 0 : l.mwd) == null ? void 0 : c.resolved);
  if (!n) return;
  const s = await Lu(n, i);
  if (!s.ok) {
    (d = (u = ui.notifications) == null ? void 0 : u.warn) == null || d.call(u, s.reason ?? "Unable to apply attack damage.");
    return;
  }
  if (s.skipped) {
    (f = (m = ui.notifications) == null ? void 0 : m.info) == null || f.call(m, s.reason ?? "That attack damage has already been applied.");
    return;
  }
  const r = await en({ resolved: n });
  await e.update({
    content: r,
    "flags.mwd.resolved": n
  }), await Ao({
    summary: s.summary,
    actor: s.targetActor,
    token: s.targetToken
  });
}
async function wo(a = {}) {
  var i, n;
  const e = (i = a == null ? void 0 : a.target) != null && i.actorUuid ? await fromUuid(a.target.actorUuid) : null, t = (n = a == null ? void 0 : a.target) != null && n.tokenUuid ? await fromUuid(a.target.tokenUuid) : null;
  return ps({
    actor: e,
    token: t,
    edgePoolKey: (a == null ? void 0 : a.evadeEdgePoolKey) ?? ""
  });
}
function Cy(a = "") {
  var e, t;
  return ((t = (e = game.messages) == null ? void 0 : e.get) == null ? void 0 : t.call(e, String(a ?? "").trim())) ?? null;
}
async function ps({ actor: a = null, token: e = null, actorUuid: t = "", tokenUuid: i = "", edgePoolKey: n = "" } = {}) {
  const s = a ?? (t ? await fromUuid(t) : null), r = e ?? (i ? await fromUuid(i) : null);
  return s ? {
    ...B.getReactionSpendPreview(s, { token: r, edgePoolKey: n }) ?? {},
    actor: s,
    token: r
  } : null;
}
async function To(a, e) {
  var s, r;
  const t = foundry.utils.deepClone((r = (s = a == null ? void 0 : a.flags) == null ? void 0 : s.mwd) == null ? void 0 : r.resolved);
  if (!t) return;
  await e(t);
  const i = await fromUuid(t.actorUuid);
  if (!i) return;
  await xu(t, i);
  const n = await en({ resolved: t });
  return await a.update({
    content: n,
    "flags.mwd.resolved": t
  }), t;
}
async function vo(a, e, { active: t = !1, edgePoolKey: i = "" } = {}) {
  var r, o, l, c, u, d, m, f;
  const n = (r = e == null ? void 0 : e.target) != null && r.actorUuid ? await fromUuid(e.target.actorUuid) : null, s = (o = e == null ? void 0 : e.target) != null && o.tokenUuid ? await fromUuid(e.target.tokenUuid) : null;
  if (n) {
    if (!t) {
      const p = B.getSnapshot(n, { token: s }), h = (p == null ? void 0 : p.pendingReaction) ?? null;
      (h == null ? void 0 : h.sourceKind) === "attack" && (h == null ? void 0 : h.messageId) === a.id && (h == null ? void 0 : h.sourceId) === (e == null ? void 0 : e.previewKey) && await B.clearPendingReaction(n, { token: s });
      return;
    }
    await B.setPendingReaction(n, {
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
async function Py(a, e) {
  var r, o;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleEvade']"), i = String(((r = t == null ? void 0 : t.dataset) == null ? void 0 : r.previewKey) ?? "").trim();
  if (!i) return;
  const n = await To(e, async (l) => {
    var f;
    if (l.areaEffectPreviewState ?? (l.areaEffectPreviewState = {}), !!(l.areaEffectPreviewState[i] ?? {}).evadeActive) {
      delete l.areaEffectPreviewState[i];
      return;
    }
    l.areaEffectPreviewState[i] = {
      evadeActive: !0,
      edgePoolKey: null
    };
    const d = (Array.isArray((f = l == null ? void 0 : l.attackResult) == null ? void 0 : f.results) ? l.attackResult.results : []).find((p) => (p == null ? void 0 : p.previewKey) === i) ?? null, m = d ? await wo({ ...d, evadeEdgePoolKey: null }) : null;
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
  n && s && await vo(e, s, {
    active: !!(s != null && s.evadeActive),
    edgePoolKey: String((s == null ? void 0 : s.evadeEdgePoolKey) ?? "").trim()
  });
}
async function Ny(a, e) {
  var o, l, c;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleEvadeEdge']"), i = String(((o = t == null ? void 0 : t.dataset) == null ? void 0 : o.previewKey) ?? "").trim(), n = String(((l = t == null ? void 0 : t.dataset) == null ? void 0 : l.poolKey) ?? "").trim();
  if (!i) return;
  const s = await To(e, async (u) => {
    var h;
    u.areaEffectPreviewState ?? (u.areaEffectPreviewState = {});
    const d = u.areaEffectPreviewState[i] ?? {}, m = d.edgePoolKey === n ? null : n;
    u.areaEffectPreviewState[i] = {
      ...d,
      evadeActive: !0,
      edgePoolKey: m
    };
    const f = (Array.isArray((h = u == null ? void 0 : u.attackResult) == null ? void 0 : h.results) ? u.attackResult.results : []).find((g) => (g == null ? void 0 : g.previewKey) === i) ?? null, p = f ? await wo({ ...f, evadeEdgePoolKey: m }) : null;
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
  s && r && await vo(e, r, {
    active: !!(r != null && r.evadeActive),
    edgePoolKey: String((r == null ? void 0 : r.evadeEdgePoolKey) ?? "").trim()
  });
}
async function Ry(a, e) {
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
    const S = await Lu(t, b);
    S.ok && S.applied ? (s += 1, o.push(S)) : S.ok || r.push(S.reason ?? `Target ${b + 1} failed.`);
  }
  if (s <= 0) {
    (h = (p = ui.notifications) == null ? void 0 : p.warn) == null || h.call(p, r[0] ?? "Unable to apply queued attack damage.");
    return;
  }
  const l = await en({ resolved: t });
  await e.update({
    content: l,
    "flags.mwd.resolved": t
  });
  for (const b of o)
    await Ao({
      summary: b.summary,
      actor: b.targetActor,
      token: b.targetToken
    });
  r.length && ((y = (g = ui.notifications) == null ? void 0 : g.warn) == null || y.call(g, `Applied ${s} queued damage result${s === 1 ? "" : "s"}; ${r.length} failed.`));
}
async function Lu(a, e) {
  var l, c, u, d, m, f;
  const t = ((c = (l = a == null ? void 0 : a.attackResult) == null ? void 0 : l.results) == null ? void 0 : c[e]) ?? null, i = (t == null ? void 0 : t.queuedMutation) ?? null;
  if (!i)
    return { ok: !1, reason: "No queued attack damage to apply." };
  if (i.applied)
    return { ok: !0, skipped: !0, reason: "That attack damage has already been applied." };
  let n = null, s = null, r = null;
  try {
    if (s = (u = i.target) != null && u.actorUuid ? await fromUuid(i.target.actorUuid) : null, r = (d = i.target) != null && d.tokenUuid ? await fromUuid(i.target.tokenUuid) : null, t != null && t.evadeActive && s) {
      const p = await B.commitReactionSpend(s, {
        token: r,
        actionId: "evade",
        actionLabel: "Evade",
        actionCategory: "reaction",
        logLabel: `Evade: ${((m = i.target) == null ? void 0 : m.name) ?? ((f = t == null ? void 0 : t.target) == null ? void 0 : f.name) ?? "Target"}`,
        edgePoolKey: String((t == null ? void 0 : t.evadeEdgePoolKey) ?? "").trim()
      });
      if (!(p != null && p.ok))
        return { ok: !1, reason: (p == null ? void 0 : p.reason) ?? "Unable to spend the Evade reaction." };
      await B.clearPendingReaction(s, { token: r });
    }
    n = await pt.apply({
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
  const o = Oa(
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
async function $u(a, e) {
  const t = e != null && e.actorUuid ? await fromUuid(e.actorUuid) : null, i = e != null && e.tokenUuid ? await fromUuid(e.tokenUuid) : null, n = await Jc(e, { actor: t, token: i });
  return await a.update({
    content: n,
    "flags.mwd.hazardCard": e
  }), e;
}
async function ko(a, e) {
  var i, n;
  const t = oo(foundry.utils.deepClone(((n = (i = a == null ? void 0 : a.flags) == null ? void 0 : i.mwd) == null ? void 0 : n.hazardCard) ?? {}));
  return t != null && t.actorUuid ? (await e(t), await $u(a, t), t) : null;
}
async function Eo(a, e, { active: t = !1, edgePoolKey: i = "" } = {}) {
  var r, o, l;
  const n = e != null && e.actorUuid ? await fromUuid(e.actorUuid) : null, s = e != null && e.tokenUuid ? await fromUuid(e.tokenUuid) : null;
  if (n) {
    if (!t) {
      const c = B.getSnapshot(n, { token: s }), u = (c == null ? void 0 : c.pendingReaction) ?? null;
      (u == null ? void 0 : u.sourceKind) === "hazard" && (u == null ? void 0 : u.messageId) === a.id && (u == null ? void 0 : u.sourceId) === (e == null ? void 0 : e.regionId) && await B.clearPendingReaction(n, { token: s });
      return;
    }
    await B.setPendingReaction(n, {
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
async function Iy(a, e) {
  var i, n;
  a.preventDefault();
  const t = await ko(e, async (s) => {
    var l, c, u;
    const r = !((l = s == null ? void 0 : s.preview) != null && l.evadeActive), o = Kr(Ri({
      tier: ((c = s == null ? void 0 : s.exposure) == null ? void 0 : c.initialTier) ?? "none"
    }), {
      active: r,
      locked: !!((u = s == null ? void 0 : s.exposure) != null && u.evadeLocked)
    });
    if (s.preview ?? (s.preview = {}), s.preview.evadeActive = r, s.preview.edgePoolKey = null, s.preview.finalTier = o.finalTier, s.damageAfter = Wi(s.baseDamage ?? 0, o.finalTier), r) {
      const d = await ps({
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
  t && await Eo(e, t, {
    active: !!((i = t == null ? void 0 : t.preview) != null && i.evadeActive),
    edgePoolKey: String(((n = t == null ? void 0 : t.preview) == null ? void 0 : n.edgePoolKey) ?? "").trim()
  });
}
async function Dy(a, e) {
  var s, r, o;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='toggleHazardEvadeEdge']"), i = String(((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.poolKey) ?? "").trim(), n = await ko(e, async (l) => {
    l.preview ?? (l.preview = {}), l.preview.evadeActive = !0, l.preview.edgePoolKey = l.preview.edgePoolKey === i ? null : i;
    const c = await ps({
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
  n && await Eo(e, n, {
    active: !!((r = n == null ? void 0 : n.preview) != null && r.evadeActive),
    edgePoolKey: String(((o = n == null ? void 0 : n.preview) == null ? void 0 : o.edgePoolKey) ?? "").trim()
  });
}
async function Oy(a, e) {
  var u, d, m, f, p, h, g, y, b, S, T, C, N, P, F, K, Y, W, j, x, L;
  a.preventDefault();
  const t = oo(foundry.utils.deepClone(((d = (u = e == null ? void 0 : e.flags) == null ? void 0 : u.mwd) == null ? void 0 : d.hazardCard) ?? {}));
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
    const G = await B.commitReactionSpend(i, {
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
    notes: `Hazard exposure ${t.exposure.initialLabel}${(T = t.preview) != null && T.evadeActive ? ` -> ${String(t.preview.finalTier ?? t.exposure.initialTier).toUpperCase()}` : ""}`.trim()
  }, r = await pt.apply({
    actor: i,
    token: n,
    payload: s,
    options: {
      actorId: i.id,
      logToChat: !1
    }
  });
  if (!(r != null && r.ok)) {
    (N = (C = ui.notifications) == null ? void 0 : C.warn) == null || N.call(C, (r == null ? void 0 : r.reason) ?? "Unable to apply hazard damage.");
    return;
  }
  const o = B.getSnapshot(i, { token: n }), l = ((P = o == null ? void 0 : o.hazards) == null ? void 0 : P[t.regionId]) ?? {}, c = De(t.nextTier, t.exposure.finalTier);
  await B.setHazardState(i, {
    token: n,
    regionId: t.regionId,
    hazardState: {
      ...l,
      tier: c,
      turnsExposed: Math.max(Number((l == null ? void 0 : l.turnsExposed) ?? 0), Number(t.turnsExposed ?? 0)) + 1,
      lastProcessedRound: Number(((F = o == null ? void 0 : o.combat) == null ? void 0 : F.round) ?? 0) || 0,
      evadeLocked: !!(l != null && l.evadeLocked) || !!(((K = t.exposure) == null ? void 0 : K.initialTier) === "full" && ((Y = t.preview) == null ? void 0 : Y.finalTier) === "major" && ((W = t.preview) != null && W.evadeActive))
    }
  }), c === "full" && Number((t == null ? void 0 : t.onFullBurnDelta) ?? 0) > 0 && await i.update({
    "system.burn.value": Math.max(0, Number(((x = (j = i.system) == null ? void 0 : j.burn) == null ? void 0 : x.value) ?? 0) + Number(t.onFullBurnDelta ?? 0))
  }), await B.clearPendingReaction(i, { token: n }), t.applied = !0, t.applyReason = "Applied", await $u(e, t), await Ao({
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
      notes: `Hazard exposure ${t.exposure.initialLabel}${(L = t.preview) != null && L.evadeActive ? ` -> ${String(t.preview.finalTier ?? "").toUpperCase()}` : ""}`
    },
    actor: i,
    token: n
  });
}
async function _y(a, { token: e = null } = {}) {
  var s, r;
  const t = B.getSnapshot(a, { token: e }), i = (t == null ? void 0 : t.pendingReaction) ?? null;
  if (!(i != null && i.messageId))
    return { ok: !1, reason: "Use an area effect or hazard card to trigger Evade." };
  const n = Cy(i.messageId);
  if (!n)
    return await B.clearPendingReaction(a, { token: e }), { ok: !1, reason: "The pending Evade card is no longer available." };
  if (i.sourceKind === "attack") {
    const o = String(i.sourceId ?? "").trim();
    if (!o) return { ok: !1, reason: "Pending Evade target is missing." };
    const l = await To(n, async (u) => {
      var f;
      u.areaEffectPreviewState ?? (u.areaEffectPreviewState = {}), u.areaEffectPreviewState[o] = {
        ...u.areaEffectPreviewState[o] ?? {},
        evadeActive: !0,
        edgePoolKey: i.edgePoolKey ?? null
      };
      const d = (Array.isArray((f = u == null ? void 0 : u.attackResult) == null ? void 0 : f.results) ? u.attackResult.results : []).find((p) => (p == null ? void 0 : p.previewKey) === o) ?? null, m = d ? await wo({ ...d, evadeEdgePoolKey: i.edgePoolKey ?? "" }) : null;
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
    return c && await vo(n, c, {
      active: !0,
      edgePoolKey: String((c == null ? void 0 : c.evadeEdgePoolKey) ?? i.edgePoolKey ?? "").trim()
    }), { ok: !0 };
  }
  if (i.sourceKind === "hazard") {
    const o = await ko(n, async (l) => {
      var d, m;
      const c = Kr(Ri({
        tier: ((d = l == null ? void 0 : l.exposure) == null ? void 0 : d.initialTier) ?? "none"
      }), {
        active: !0,
        locked: !!((m = l == null ? void 0 : l.exposure) != null && m.evadeLocked)
      });
      l.preview ?? (l.preview = {}), l.preview.evadeActive = !0, l.preview.edgePoolKey = l.preview.edgePoolKey ?? i.edgePoolKey ?? null, l.preview.finalTier = c.finalTier, l.damageAfter = Wi(l.baseDamage ?? 0, c.finalTier);
      const u = await ps({
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
    return o && await Eo(n, o, {
      active: !0,
      edgePoolKey: String(((r = o == null ? void 0 : o.preview) == null ? void 0 : r.edgePoolKey) ?? i.edgePoolKey ?? "").trim()
    }), { ok: !0 };
  }
  return { ok: !1, reason: "That Evade source is not supported." };
}
async function xy(a, e) {
  var p, h, g, y, b, S, T, C, N, P, F, K, Y, W, j, x, L, G, X;
  a.preventDefault();
  const t = a.target.closest("[data-mwd-action='edgePostReroll']"), i = String(((p = t == null ? void 0 : t.dataset) == null ? void 0 : p.poolKey) ?? "").trim();
  if (!i) return;
  const n = foundry.utils.deepClone((g = (h = e == null ? void 0 : e.flags) == null ? void 0 : h.mwd) == null ? void 0 : g.resolved);
  if (!n) return;
  if (by(n)) {
    (b = (y = ui.notifications) == null ? void 0 : y.warn) == null || b.call(y, "Post-roll Edge is disabled after attack damage has been applied.");
    return;
  }
  if (Number(((T = (S = n == null ? void 0 : n.edge) == null ? void 0 : S.post) == null ? void 0 : T.spent) ?? 0) === 1) return;
  if (!(Array.isArray((N = (C = n == null ? void 0 : n.edge) == null ? void 0 : C.allowed) == null ? void 0 : N.postPools) ? n.edge.allowed.postPools : []).includes(i)) {
    (F = (P = ui.notifications) == null ? void 0 : P.warn) == null || F.call(P, `Post-spend pool not allowed: ${i}`);
    return;
  }
  const r = Array.isArray((K = n == null ? void 0 : n.roll) == null ? void 0 : K.failureDiceRefs) ? n.roll.failureDiceRefs : [];
  if (r.length <= 0) {
    (W = (Y = ui.notifications) == null ? void 0 : Y.info) == null || W.call(Y, "No failures to reroll.");
    return;
  }
  const o = await fromUuid(n.actorUuid);
  if (!o) {
    (x = (j = ui.notifications) == null ? void 0 : j.warn) == null || x.call(j, "Actor not found for this roll.");
    return;
  }
  await ((L = o.spendEdge) == null ? void 0 : L.call(o, i, 1));
  const l = Number(((G = n == null ? void 0 : n.roll) == null ? void 0 : G.target) ?? 5), u = (X = (await new Roll(`${r.length}d6cs>=${l}`).evaluate()).dice) == null ? void 0 : X[0], d = Array.isArray(u == null ? void 0 : u.results) ? u.results : [], m = d.filter((oe) => oe.success).length;
  n.outcome = n.outcome ?? {}, n.outcome.hits = Number(n.outcome.hits ?? 0) + m, n.edge = n.edge ?? {}, n.edge.post = { poolKey: i, spent: 1 }, n.edge.availableActions = {
    ...n.edge.availableActions ?? {},
    canSpendPost: !1,
    canPostRerollFailures: !1
  }, n.roll = n.roll ?? {}, n.roll.diceGroups = Array.isArray(n.roll.diceGroups) ? n.roll.diceGroups : [], n.roll.diceGroups.push({
    id: "post",
    label: "Post Reroll",
    faces: 6,
    termIndex: null,
    dice: d.map((oe, ge) => {
      const de = Number(oe.result), M = !!oe.success;
      return {
        ref: `post:${ge}`,
        face: de,
        isSuccess: M,
        isFailure: !M,
        tooltip: M ? `Post die ${ge + 1}: ${de} (Success vs TN ${l})` : `Post die ${ge + 1}: ${de} (Failure vs TN ${l})`
      };
    })
  }), await xu(n, o);
  const f = await en({ resolved: n });
  await e.update({
    content: f,
    "flags.mwd.resolved": n,
    "flags.mwd.payload.edge.post": { poolKey: i, spent: 1 }
  });
}
const Mo = `${w}.ownedWeaponAttack`;
let Rl = !1;
function Ly(a, e = null) {
  var r, o, l;
  const t = (a == null ? void 0 : a.actor) ?? null, i = {
    intent: "attack",
    weaponId: (a == null ? void 0 : a.id) ?? "",
    payloadId: ((r = a == null ? void 0 : a.system) == null ? void 0 : r.selectedPayloadId) ?? "",
    edge: { pool: "physical.grit", allowed: ["pre", "post"] },
    tags: ["combat", "attack"],
    sourceTokenId: (e == null ? void 0 : e.id) ?? null
  }, n = t ? B.getSnapshot(t, { token: e }) : null, s = !!((l = (o = n == null ? void 0 : n.state) == null ? void 0 : o.actionState) != null && l.aim);
  return s && (i.aim = { active: !0 }), { payload: i, hasAim: s };
}
function $y(a, e = null) {
  return e ?? (a == null ? void 0 : a.token) ?? B.getCurrentSceneTokenDocument(a) ?? null;
}
function Bu(a) {
  const e = String((a == null ? void 0 : a.uuid) ?? "").trim();
  return e ? {
    type: Mo,
    uuid: e,
    name: String((a == null ? void 0 : a.name) ?? "Weapon").trim() || "Weapon",
    img: (a == null ? void 0 : a.img) ?? "icons/svg/sword.svg"
  } : null;
}
async function hs({ weapon: a, event: e = null, token: t = null } = {}) {
  var i, n, s, r;
  try {
    if (!((i = a == null ? void 0 : a.isPersonalWeapon) != null && i.call(a)))
      throw new Error("Attack requires an owned personal weapon.");
    const o = a.actor ?? null;
    if (!o)
      throw new Error("Attack requires an owned personal weapon.");
    const l = $y(o, t), { payload: c, hasAim: u } = Ly(a, l), d = ((n = game.mwd) == null ? void 0 : n.roll) ?? ((r = (s = game.system) == null ? void 0 : s.mwd) == null ? void 0 : r.roll);
    if (!(d != null && d.execute))
      throw new Error("MWD roll system not initialized.");
    const m = await d.execute({ actor: o, payload: c, event: e });
    return m && u && await B.clearAim(o, { token: l }), m;
  } catch (o) {
    return console.error("MWD | Failed to launch weapon attack", o), yo(o, "Unable to attack with that weapon."), null;
  }
}
async function By(a, { event: e = null } = {}) {
  var n, s;
  const t = String(a ?? "").trim();
  if (!t)
    return (n = ui.notifications) == null || n.warn("That weapon shortcut is missing its item reference."), null;
  const i = await fromUuid(t);
  return i ? hs({ weapon: i, event: e }) : ((s = ui.notifications) == null || s.warn("That weapon shortcut could not find its source item."), null);
}
function zy(a) {
  return `(async () => {
  const attacks = game.mwd?.attacks;
  if (!attacks?.attackWeaponByUuid) {
    return ui.notifications?.error("MWD attack shortcuts are not available right now.");
  }
  await attacks.attackWeaponByUuid(${JSON.stringify(String(a ?? "").trim())});
})();`;
}
async function Fy(a, e) {
  var r, o, l, c;
  const t = String((a == null ? void 0 : a.uuid) ?? "").trim();
  if (!t) return;
  const i = String((a == null ? void 0 : a.name) ?? "Weapon Attack").trim() || "Weapon Attack", n = zy(t);
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
function zu(a, e, t) {
  return (e == null ? void 0 : e.type) !== Mo ? !0 : (Fy(e, t), !1);
}
function Fu() {
  Rl || (Rl = !0, Hooks.on("hotbarDrop", zu));
}
const Il = {
  HOTBAR_ATTACK_TYPE: Mo,
  getOwnedWeaponAttackDragData: Bu,
  launchOwnedWeaponAttack: hs,
  attackWeaponByUuid: By,
  handleWeaponAttackHotbarDrop: zu,
  registerWeaponAttackHotbarHook: Fu
};
function Xe(a, e = 0) {
  const t = Number(a);
  return Number.isFinite(t) ? t : e;
}
function Hy(a) {
  return String(a ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function Pn(a, e = 180) {
  const t = Hy(a);
  return t ? t.length <= e ? t : `${t.slice(0, Math.max(0, e - 3)).trim()}...` : "";
}
function bi(a = []) {
  return a.map((e) => String(e ?? "").trim()).filter(Boolean);
}
function Nn(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim(),
    emphasis: e.emphasis ?? ""
  }));
}
function Rn(a = []) {
  return bi(a).map((e) => ({ label: e }));
}
function In(a = []) {
  return a.filter((e) => e && e.value !== void 0 && e.value !== null && String(e.value).trim() !== "").map((e) => ({
    label: String(e.label ?? "").trim(),
    value: String(e.value ?? "").trim()
  }));
}
const Uy = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
}, Wy = {
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
}, jy = {
  ammo: "Ammunition",
  explosive: "Explosive",
  medical: "Medical",
  repair: "Repair",
  fuel: "Fuel / Power Cell",
  utility: "Utility"
};
function Dl(a) {
  const e = Number(a ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function Ol({
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
  const c = Math.max(0, Math.trunc(Xe(((p = a == null ? void 0 : a.system) == null ? void 0 : p.quantity) ?? 1, 1))), u = Math.max(0, Math.trunc(Xe(((h = a == null ? void 0 : a.system) == null ? void 0 : h.rating) ?? 0, 0))), d = bi(((g = a == null ? void 0 : a.system) == null ? void 0 : g.tags) ?? []), m = String(((y = a == null ? void 0 : a.system) == null ? void 0 : y.category) ?? "").trim(), f = n[m] ?? m;
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
    summaryStats: Nn([
      { label: "Qty", value: c, emphasis: "strong" },
      { label: s, value: u }
    ]),
    detailTags: Rn([
      r,
      ...d,
      (b = a == null ? void 0 : a.system) != null && b.inactive ? "Inactive" : ""
    ]),
    detailRows: In([
      { label: "Quantity", value: c },
      { label: s, value: u },
      { label: "Source", value: ((S = a == null ? void 0 : a.system) == null ? void 0 : S.sourceReference) ?? "" },
      { label: "Category", value: f },
      { label: "Tags", value: d.join(", ") }
    ]),
    detailText: Pn((T = a == null ? void 0 : a.system) == null ? void 0 : T.description),
    quantity: c,
    canAdjustQuantity: o
  };
}
function Gy({ defenseBonus: a = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(a ?? 0) || 0;
  i !== 0 && t.push(`Defense ${Dl(i)}`);
  for (const [n, s] of Object.entries(Uy)) {
    const r = Number((e == null ? void 0 : e[n]) ?? 0) || 0;
    r !== 0 && t.push(`${s} ${Dl(r)}`);
  }
  return t.join(" | ");
}
function qy(a = {}, e = ["close", "near", "far", "extreme"]) {
  return e.map((t) => {
    const i = Xe(a == null ? void 0 : a[t], 0);
    return `${t.charAt(0).toUpperCase() + t.slice(1)} ${i}`;
  }).join(" | ");
}
function Ky(a = {}) {
  return ["close", "near", "far", "extreme"].map((e) => `${e.charAt(0).toUpperCase()}${Xe(a == null ? void 0 : a[e], 0)}`).join(" ");
}
function Vy(a = "") {
  const e = String(a ?? "").trim().toLowerCase();
  return e ? e.charAt(0).toUpperCase() + e.slice(1) : "";
}
function it(a) {
  return String(a ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function _l({ title: a, label: e, options: t = [], confirmLabel: i = "Select" } = {}) {
  const n = Array.isArray(t) ? t.filter((r) => r == null ? void 0 : r.value) : [];
  if (!n.length) return "";
  if (n.length === 1) return String(n[0].value ?? "").trim();
  const s = `<form class="mwd-quick-select"><div class="mwd-field"><label>${it(e)}</label><select name="selection">${n.map((r) => `<option value="${it(r.value)}">${it(r.label ?? r.value)}</option>`).join("")}</select></div></form>`;
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
var St, Ti, zi, $t, da, D, Hu, Tr, Dn, Uu, Wu, Ee, _t, gi, ju, vr, Gu, qu, Ku, Vu, Yu, Qu, Ju, xt, na;
const he = class he extends Aa {
  constructor() {
    super(...arguments);
    Te(this, D);
    Te(this, St, null);
    Te(this, Ti, null);
    Te(this, zi, null);
    Te(this, $t, /* @__PURE__ */ new Set());
    Te(this, da, null);
  }
  /** @override */
  async _prepareContext(t) {
    var j, x, L, G, X, oe, ge, de, M, V, ne, ie, Me, Ge, ht, gt, ot, yt, We, lt, Mt, Ct, Pt, Nt, Rt, It, ct, Dt;
    const i = await super._prepareContext(t), n = ((j = this.getSheetTokenDocument) == null ? void 0 : j.call(this)) ?? null;
    i._mwdThemeClass = game.system.mwd.styles.selectCssClass(), i.layout = await Di.get("character");
    const s = ((L = (x = this.actor).getEdgeCap) == null ? void 0 : L.call(x)) ?? Number(((oe = (X = (G = this.actor.system) == null ? void 0 : G.attributes) == null ? void 0 : X.edge) == null ? void 0 : oe.value) ?? 0), r = !!this.isEditable, o = { physical: "Physical", mental: "Mental", social: "Social" }, l = {
      grit: "Grit",
      insight: "Insight",
      legend: "Legend",
      chaos: "Chaos",
      rumor: "Rumor",
      credibility: "Credibility"
    }, c = this.actor.getEdgePoolSummary ? this.actor.getEdgePoolSummary({ groups: Fr }) : { groups: [] };
    i.edgeConsole = {
      cap: s,
      editable: r,
      capPips: Array.from({ length: Math.max(0, s) }, (E, I) => I + 1),
      groups: (c.groups ?? []).map((E) => ({
        id: E.id,
        label: o[E.id] ?? E.id,
        pools: (E.pools ?? []).map((I) => {
          const Z = Number(I.effectiveValue ?? 0), Ae = Number(I.effectiveMax ?? 0), ke = Array.from({ length: Math.max(0, Ae) }, (je, Qe) => {
            const ut = Qe + 1;
            return { n: ut, filled: ut <= Z };
          }), Re = String(I.key ?? "").split(".").pop();
          return {
            key: I.key,
            label: l[Re] ?? Re ?? I.key,
            value: Z,
            max: Ae,
            rating: Number(I.rating ?? 0),
            ratingBonus: Number(I.ratingBonus ?? 0),
            effectiveRating: Number(I.effectiveRating ?? I.rating ?? 0),
            isCapped: Number(I.effectiveRating ?? I.rating ?? 0) > Number(I.cap ?? s),
            pips: ke,
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
    for (const E of i.edgeConsole.groups ?? [])
      for (const I of E.pools ?? []) {
        const Z = String(I.key ?? "").split(".").pop();
        Z && d.set(Z, I), I.domain = E.id;
      }
    i.edgeConsole.poolsOrdered = u.map((E) => d.get(E)).filter(Boolean);
    const m = this.actor.system ?? {}, f = m.monitors ?? {}, p = [
      { id: "physical", label: "Physical", kind: "wound", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "fatigue", label: "Fatigue", kind: "fatigue", status: { label: "Penalty", path: "derived.penalty" } },
      { id: "armor", label: "Armor", kind: "armor-personal", status: { label: "Resist", path: "derived.resistance" } }
    ], h = (E, I, Z = 0) => {
      const Ae = foundry.utils.getProperty(E, I), ke = Number(Ae);
      return Number.isFinite(ke) ? ke : Z;
    };
    i.conditionMonitors = p.map((E) => {
      const I = (f == null ? void 0 : f[E.id]) ?? {}, Z = Math.max(0, h(I, "max", 0)), Ae = Math.min(Math.max(0, h(I, "value", 0)), Z);
      return {
        id: E.id,
        label: E.label,
        kind: E.kind,
        editable: !!this.isEditable,
        value: Ae,
        max: Z,
        segments: Array.from({ length: Z }, (ke, Re) => {
          const je = Re + 1;
          return { value: je, filled: je <= Ae };
        }),
        status: E.status ? { label: E.status.label, value: h(I, E.status.path, 0) } : null
      };
    });
    const g = Number(((de = (ge = this.actor.system) == null ? void 0 : ge.burn) == null ? void 0 : de.value) ?? 0), y = 10, b = 6, S = Math.min(g, y);
    i.burnOverflow = Math.max(0, g - y), i.burnPenalty = Math.floor(g / 2), i.burnPips = Array.from({ length: y }, (E, I) => {
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
      overloaded: !!((V = (M = this.actor.system) == null ? void 0 : M.burn) != null && V.overloaded)
    };
    const T = B.getSnapshot(this.actor, { token: n });
    i.combatDashboard = {
      targeting: T.targeting,
      rollImpact: T.rollImpact,
      states: T.states,
      effects: T.effects,
      activation: T.activation,
      inactiveReason: T.inactiveReason
    };
    const C = B.buildActionModel(this.actor, T), N = new Set((C.menus ?? []).map((E) => E.id));
    H(this, St) && !N.has(H(this, St)) && Ie(this, St, null), i.combatActions = {
      ...C,
      menus: (C.menus ?? []).map((E) => ({
        ...E,
        isOpen: E.id === H(this, St)
      }))
    };
    const P = ((ie = (ne = this.actor).getPersonalCombatLoadout) == null ? void 0 : ie.call(ne)) ?? null;
    i.personalInventory = {
      warnings: [...(P == null ? void 0 : P.warnings) ?? []],
      weapons: ((P == null ? void 0 : P.weapons) ?? []).map((E) => {
        var we, et, tt, dt, U, fe, ei;
        const I = v(this, D, na).call(this, "weapons", E.id), Z = String((E == null ? void 0 : E.category) ?? "").trim().toLowerCase() !== "melee", Ae = !!((we = E == null ? void 0 : E.sourceState) != null && we.isTracked), ke = String((E == null ? void 0 : E.payloadLabel) ?? "").trim() || "Unloaded", Re = Z && Ae ? `${Xe((et = E == null ? void 0 : E.sourceState) == null ? void 0 : et.current, 0)}/${Xe((tt = E == null ? void 0 : E.sourceState) == null ? void 0 : tt.max, 0)}` : "", je = Z ? Ae ? `${ke} ${Re}` : ke : "", Qe = Z ? Ae ? `Payload ${Re}` : `Payload ${ke}` : "", ut = qy(E.attackRatingBand), jt = Ky(E.attackRatingBand), ee = In([
          { label: "Skill", value: ((dt = E.skillDef) == null ? void 0 : dt.label) ?? E.skill ?? "" },
          { label: "Category", value: E.category ?? "" },
          { label: "Damage Type", value: E.damageTypeLabel ?? E.damageType ?? "" },
          { label: "Max Range", value: Vy(((U = E.range) == null ? void 0 : U.max) ?? E.defaultRangeBand ?? "") },
          { label: "CQ Bands", value: ut },
          { label: "Payload", value: je },
          { label: "Traits", value: bi(E.traits ?? []).join(", ") }
        ]);
        return {
          id: E.id,
          accordionId: I,
          isExpanded: H(this, $t).has(I),
          name: E.name,
          img: E.img,
          subtitle: ((fe = E.skillDef) == null ? void 0 : fe.label) ?? E.category ?? "",
          summaryStats: Nn([
            { label: "DV", value: Xe(E.damage, 0), emphasis: "strong" },
            { label: "AP", value: Xe(E.ap, 0) },
            { label: "Type", value: E.damageTypeLabel ?? E.damageType ?? "" },
            { label: "CQ", value: jt }
          ]),
          detailTags: Rn([
            E.equipped ? "Equipped" : "",
            E.isPrimary ? "Primary" : "",
            Qe,
            ...bi(E.traits ?? [])
          ]),
          detailRows: ee,
          detailText: Pn(E.notes),
          equipped: !!E.equipped,
          isPrimary: !!E.isPrimary,
          attackUuid: E.uuid ?? "",
          attackRoll: JSON.stringify({
            intent: "attack",
            weaponId: E.id,
            payloadId: ((ei = E == null ? void 0 : E.payloadState) == null ? void 0 : ei.activePayloadId) ?? "",
            edge: { pool: "physical.grit", allowed: ["pre", "post"] },
            tags: ["combat", "attack"]
          })
        };
      }),
      armor: ((P == null ? void 0 : P.armor) ?? []).map((E) => {
        var je, Qe, ut, jt, ee, we, et, tt, dt, U, fe, ei, bt, fi;
        const I = ((je = P == null ? void 0 : P.activeArmor) == null ? void 0 : je.id) === E.id ? P.activeArmor : null, Z = v(this, D, na).call(this, "armor", E.id), Ae = Xe(((ut = (Qe = I == null ? void 0 : I.traitState) == null ? void 0 : Qe.reinforced) == null ? void 0 : ut.max) ?? ((ee = (jt = E == null ? void 0 : E.traitState) == null ? void 0 : jt.reinforced) == null ? void 0 : ee.max), 0), ke = Ae > 0 ? `${Xe(((et = (we = I == null ? void 0 : I.traitState) == null ? void 0 : we.reinforced) == null ? void 0 : et.current) ?? ((dt = (tt = E == null ? void 0 : E.traitState) == null ? void 0 : tt.reinforced) == null ? void 0 : dt.current), 0)}/${Ae}` : "", Re = Gy({
          defenseBonus: E.defenseBonus,
          mitigationByType: (I == null ? void 0 : I.mitigationByType) ?? (I == null ? void 0 : I.typedMitigation) ?? E.mitigationByType ?? {}
        });
        return {
          id: E.id,
          accordionId: Z,
          isExpanded: H(this, $t).has(Z),
          name: E.name,
          img: E.img,
          subtitle: (U = E.tags) != null && U.length ? E.tags.join(", ") : "Armor",
          summaryStats: Nn([
            { label: "Rating", value: Xe((I == null ? void 0 : I.ratingCurrent) ?? E.rating, 0), emphasis: "strong" },
            { label: "Res", value: Xe((I == null ? void 0 : I.baseMitigation) ?? (I == null ? void 0 : I.baseResistance), 0) },
            { label: "Def", value: Xe(E.defenseBonus, 0) },
            { label: "Dur", value: `${Xe(((fe = I == null ? void 0 : I.durability) == null ? void 0 : fe.current) ?? ((ei = E.durability) == null ? void 0 : ei.current), 0)}/${Xe(((bt = I == null ? void 0 : I.durability) == null ? void 0 : bt.max) ?? ((fi = E.durability) == null ? void 0 : fi.max), 0)}` }
          ]),
          detailTags: Rn([
            E.equipped ? "Equipped" : "",
            E.isPrimary ? "Primary" : "",
            ke ? `Reinforced ${ke}` : "",
            ...bi(E.traits ?? [])
          ]),
          detailRows: In([
            { label: "Modifiers", value: Re },
            { label: "Traits", value: bi(E.traits ?? []).join(", ") },
            { label: "Tags", value: bi(E.tags ?? []).join(", ") }
          ]),
          detailText: Pn(E.notes),
          equipped: !!E.equipped,
          isPrimary: !!E.isPrimary
        };
      }),
      gear: (((Me = i.items) == null ? void 0 : Me.gear) ?? []).map((E) => {
        const I = v(this, D, na).call(this, "gear", E.id);
        return Ol({
          item: E,
          accordionId: I,
          itemType: "gear",
          defaultSubtitle: "Gear",
          categoryLabels: Wy,
          ratingLabel: "Rating",
          isEditable: this.isEditable,
          isExpanded: H(this, $t).has(I)
        });
      }),
      // Consumables deliberately share the same quantity-tracked record model as
      // gear so stock editing and linked-source authoring stay transferable.
      consumables: (((Ge = i.items) == null ? void 0 : Ge.consumable) ?? []).map((E) => {
        const I = v(this, D, na).call(this, "consumables", E.id);
        return Ol({
          item: E,
          accordionId: I,
          itemType: "consumable",
          defaultSubtitle: "Consumable",
          categoryLabels: jy,
          ratingLabel: "Potency",
          typeLabel: "Consumable",
          isEditable: this.isEditable,
          isExpanded: H(this, $t).has(I)
        });
      })
    }, i.bio = {
      fields: ((ht = i.bio) == null ? void 0 : ht.fields) ?? {},
      faction: ((gt = m.biography) == null ? void 0 : gt.faction) ?? "",
      age: ((ot = m.biography) == null ? void 0 : ot.age) ?? "",
      rank: ((yt = m.biography) == null ? void 0 : yt.rank) ?? "",
      height: ((We = m.biography) == null ? void 0 : We.height) ?? "",
      weight: ((lt = m.biography) == null ? void 0 : lt.weight) ?? "",
      xpTotal: ((Ct = (Mt = m.counters) == null ? void 0 : Mt.xp) == null ? void 0 : Ct.total) ?? 0,
      xpSpent: ((Nt = (Pt = m.counters) == null ? void 0 : Pt.xp) == null ? void 0 : Nt.value) ?? 0,
      experienceLevel: ((Rt = m.biography) == null ? void 0 : Rt.experienceLevel) ?? "green",
      enrichedHistory: await foundry.applications.ux.TextEditor.implementation.enrichHTML(
        ((It = m.biography) == null ? void 0 : It.history) ?? "",
        { async: !0, secrets: this.actor.isOwner, relativeTo: this.actor }
      )
    };
    const F = Ni(this.actor);
    i.skillsDisplay = Nc(((ct = this.actor) == null ? void 0 : ct.system) ?? {}, {
      bonusBySkill: F.bonusBySkill
    }), i.lifeModules = F.slotStates.map((E) => {
      const I = E.state;
      return {
        moduleType: E.moduleType,
        label: E.label,
        hasCatalogEntries: E.availableEntries.length > 0,
        emptyState: E.availableEntries.length > 0 ? `Add ${E.label}` : `No ${E.label} catalog entries configured`,
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
    const K = ["positive", "negative", "narrative"], Y = ["major", "minor"], W = [...((Dt = i.items) == null ? void 0 : Dt.quality) ?? []].sort((E, I) => {
      const Z = zt(E.system ?? {}), Ae = zt(I.system ?? {}), ke = K.indexOf(Z.category) - K.indexOf(Ae.category);
      if (ke !== 0) return ke;
      const Re = Y.indexOf(Z.tier) - Y.indexOf(Ae.tier);
      return Re !== 0 ? Re : String(E.name ?? "").localeCompare(String(I.name ?? ""));
    });
    return i.qualityGroups = K.map((E) => ({
      id: E,
      label: gn(E),
      records: W.filter((I) => zt(I.system ?? {}).category === E).map((I) => {
        var ke, Re, je, Qe;
        const Z = zt(I.system ?? {}), Ae = v(this, D, na).call(this, "quality", I.id);
        return {
          id: I.id,
          accordionId: Ae,
          isExpanded: H(this, $t).has(Ae),
          name: I.name,
          img: I.img,
          subtitle: `${yn(Z.tier)} ${gn(Z.category)}`,
          summaryStats: Nn([
            { label: "Tier", value: yn(Z.tier), emphasis: "strong" },
            { label: "Activation", value: Z.activation || "passive" },
            { label: "Effects", value: String(((ke = Z.effects) == null ? void 0 : ke.length) ?? 0) }
          ]),
          detailTags: Rn([
            Z.inactive ? "Inactive" : "",
            ...Z.tags ?? []
          ]),
          detailRows: In([
            { label: "Category", value: gn(Z.category) },
            { label: "Tier", value: yn(Z.tier) },
            { label: "Activation", value: Z.activation || "passive" },
            { label: "Prerequisites", value: String(((Re = Z.prerequisites) == null ? void 0 : Re.length) ?? 0) },
            { label: "Effects", value: String(((je = Z.effects) == null ? void 0 : je.length) ?? 0) },
            { label: "Tags", value: bi(Z.tags ?? []).join(", ") }
          ]),
          detailText: Pn((Qe = I.system) == null ? void 0 : Qe.description)
        };
      })
    })), i;
  }
  _onRender(t, i) {
    super._onRender(t, i), v(this, D, Hu).call(this), v(this, D, Wu).call(this), v(this, D, ju).call(this);
  }
  async close(t = {}) {
    return v(this, D, Tr).call(this), v(this, D, vr).call(this), super.close(t);
  }
  requestCombatDashboardRefresh() {
    v(this, D, Ee).call(this, { force: !0 });
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
    n && (Ie(this, St, H(this, St) === n ? null : n), v(this, D, Ee).call(this, !1));
  }
  async _onToggleStatuses(t, i) {
    var r, o, l, c, u, d, m, f;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), v(this, D, xt).call(this, i, t, "Statuses are not available right now.") || !this.isEditable) return;
    const n = this.getPersistentActor() ?? this.actor, s = ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? ((u = B.getSnapshot(n, { token: ((c = this.getSheetTokenDocument) == null ? void 0 : c.call(this)) ?? null })) == null ? void 0 : u.tokenDocument) ?? ((m = B.getSnapshot(this.actor, { token: ((d = this.getSheetTokenDocument) == null ? void 0 : d.call(this)) ?? null })) == null ? void 0 : m.tokenDocument) ?? null;
    if (!s) {
      (f = ui.notifications) == null || f.warn("Statuses require a token for this actor on the current scene.");
      return;
    }
    return Wm({
      actor: n,
      token: s
    });
  }
  async _onCombatSpend(t, i) {
    var c, u, d, m, f, p, h, g, y, b;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), v(this, D, xt).call(this, i, t, "That combat action is not available right now.") || !this.isEditable) return;
    const n = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.resource) ?? "").trim(), s = Math.max(0, Number(((m = i == null ? void 0 : i.dataset) == null ? void 0 : m.cost) ?? 0)), r = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.combatAction) ?? "").trim(), o = String(((p = i == null ? void 0 : i.dataset) == null ? void 0 : p.combatLabel) ?? "").trim(), l = String(((h = i == null ? void 0 : i.dataset) == null ? void 0 : h.combatCostLabel) ?? "").trim();
    if (!(!n || !s || !r))
      try {
        const S = this.getPersistentActor() ?? this.actor, T = await B.spendResource(S, {
          token: ((g = this.getSheetTokenDocument) == null ? void 0 : g.call(this)) ?? B.getCurrentSceneTokenDocument(S) ?? B.getCurrentSceneTokenDocument(this.actor),
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
        v(this, D, _t).call(this, { rerender: !1 }), v(this, D, Ee).call(this, { force: !0 });
      } catch (S) {
        console.error("MWD | Failed to spend combat action", S), (b = ui.notifications) == null || b.error("Unable to spend action.");
      }
  }
  async _onCombatAction(t, i) {
    var s, r, o, l, c, u;
    if ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t), v(this, D, xt).call(this, i, t, "That combat action is not available right now.") || !this.isEditable) return;
    const n = String(((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.combatAction) ?? "").trim();
    if (n)
      try {
        const d = this.getPersistentActor() ?? this.actor, m = await v(this, D, Gu).call(this, n);
        if (!m) return;
        const f = await B.executeAction(d, {
          token: ((l = this.getSheetTokenDocument) == null ? void 0 : l.call(this)) ?? B.getCurrentSceneTokenDocument(d) ?? B.getCurrentSceneTokenDocument(this.actor),
          actionId: n,
          metadata: m
        });
        if (!(f != null && f.ok)) {
          (c = ui.notifications) == null || c.warn((f == null ? void 0 : f.reason) ?? "Unable to perform action.");
          return;
        }
        v(this, D, _t).call(this, { rerender: !1 }), v(this, D, Ee).call(this, { force: !0 });
      } catch (d) {
        console.error("MWD | Failed to perform combat action", d), (u = ui.notifications) == null || u.error("Unable to perform action.");
      }
  }
  async _onCombatReduceBurn(t, i) {
    var n, s, r, o, l;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !v(this, D, xt).call(this, i, t, "Burn recovery is not available right now.") && this.isEditable)
      try {
        const c = this.getPersistentActor() ?? this.actor, u = await B.reduceBurn(c, {
          token: ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? B.getCurrentSceneTokenDocument(c) ?? B.getCurrentSceneTokenDocument(this.actor)
        });
        if (!(u != null && u.ok)) {
          (o = ui.notifications) == null || o.warn((u == null ? void 0 : u.reason) ?? "Unable to reduce Burn.");
          return;
        }
        v(this, D, _t).call(this, { rerender: !1 }), v(this, D, Ee).call(this, { force: !0 });
      } catch (c) {
        console.error("MWD | Failed to reduce Burn", c), (l = ui.notifications) == null || l.error("Unable to reduce Burn.");
      }
  }
  async _onCombatAssist(t, i) {
    var n, s, r, o, l, c, u;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !v(this, D, xt).call(this, i, t, "Assist is not available right now.") && this.isEditable)
      try {
        const d = this.getPersistentActor() ?? this.actor, m = ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? B.getCurrentSceneTokenDocument(d) ?? B.getCurrentSceneTokenDocument(this.actor), f = B.getSnapshot(d, { token: m });
        if (!f.hasCombatant) {
          (o = ui.notifications) == null || o.warn("No combatant on the current scene.");
          return;
        }
        if (f.isCurrentTurn) {
          (l = ui.notifications) == null || l.warn("Only outside your activation.");
          return;
        }
        const p = await v(this, D, Yu).call(this, f);
        if (!p) return;
        const h = await B.executeAction(d, {
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
        await v(this, D, Qu).call(this, {
          actor: d,
          token: m,
          target: p,
          costLabel: h.costLabel
        }), v(this, D, _t).call(this, { rerender: !1 }), v(this, D, Ee).call(this, { force: !0 });
      } catch (d) {
        console.error("MWD | Failed to assist", d), (u = ui.notifications) == null || u.error("Unable to assist.");
      }
  }
  async _onCombatEvade(t, i) {
    var n, s, r, o, l;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !v(this, D, xt).call(this, i, t, "Evade is not available right now.") && this.isEditable)
      try {
        const c = this.getPersistentActor() ?? this.actor, u = ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? B.getCurrentSceneTokenDocument(c) ?? B.getCurrentSceneTokenDocument(this.actor), d = await _y(c, { token: u });
        if (!(d != null && d.ok)) {
          (o = ui.notifications) == null || o.warn((d == null ? void 0 : d.reason) ?? "Unable to activate Evade.");
          return;
        }
        v(this, D, _t).call(this, { rerender: !1 }), v(this, D, Ee).call(this, { force: !0 });
      } catch (c) {
        console.error("MWD | Failed to activate Evade", c), (l = ui.notifications) == null || l.error("Unable to activate Evade.");
      }
  }
  async _onCombatInterrupt(t, i) {
    var n, s, r, o, l, c, u, d;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !v(this, D, xt).call(this, i, t, "Interrupt is not available right now.") && this.isEditable)
      try {
        const m = this.getPersistentActor() ?? this.actor, f = ((r = this.getSheetTokenDocument) == null ? void 0 : r.call(this)) ?? B.getCurrentSceneTokenDocument(m) ?? B.getCurrentSceneTokenDocument(this.actor), p = B.getSnapshot(m, { token: f }), h = B.getPreparedInterrupt(p);
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
        if (!await v(this, D, qu).call(this, h)) return;
        const y = await B.executeAction(m, {
          token: f,
          actionId: "interrupt",
          metadata: h
        });
        if (!(y != null && y.ok)) {
          (u = ui.notifications) == null || u.warn((y == null ? void 0 : y.reason) ?? "Unable to interrupt.");
          return;
        }
        await B.clearPreparedInterrupt(m, { token: f }), await v(this, D, Ju).call(this, {
          actor: m,
          token: f,
          preparedInterrupt: h,
          costLabel: y.costLabel
        }), v(this, D, _t).call(this, { rerender: !1 }), v(this, D, Ee).call(this, { force: !0 });
      } catch (m) {
        console.error("MWD | Failed to interrupt", m), (d = ui.notifications) == null || d.error("Unable to interrupt.");
      }
  }
  async _onCombatOverloadCheck(t, i) {
    var r, o, l, c, u, d, m, f, p, h, g;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), v(this, D, xt).call(this, i, t, "Overload check is not available right now.") || !this.isEditable) return;
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
      if (v(this, D, _t).call(this, { rerender: !1 }), !b) {
        v(this, D, Ee).call(this, !1);
        return;
      }
      v(this, D, Ee).call(this, { force: !0 });
    } catch (y) {
      console.error("MWD | Failed to launch overload check", y), (g = ui.notifications) == null || g.error("Unable to launch overload check.");
    }
  }
  async _onCombatAttack(t, i) {
    var m, f, p, h, g, y, b, S, T, C, N, P, F, K, Y, W, j, x, L, G, X, oe, ge;
    if ((m = t == null ? void 0 : t.preventDefault) == null || m.call(t), (f = t == null ? void 0 : t.stopPropagation) == null || f.call(t), v(this, D, xt).call(this, i, t, "Attack is not available right now.") || !this.isEditable) return;
    const n = this.getPersistentActor() ?? this.actor, s = ((p = this.getSheetTokenDocument) == null ? void 0 : p.call(this)) ?? B.getCurrentSceneTokenDocument(n) ?? B.getCurrentSceneTokenDocument(this.actor), r = String(((h = i == null ? void 0 : i.dataset) == null ? void 0 : h.combatAction) ?? "attack").trim() || "attack", o = String(((g = i == null ? void 0 : i.dataset) == null ? void 0 : g.combatLabel) ?? (r === "opportunity" ? "Opportunity" : "Attack")).trim() || "Attack", l = r === "opportunity", c = B.getSnapshot(n, { token: s }), u = !!((b = (y = c.state) == null ? void 0 : y.actionState) != null && b.aim);
    if (!c.hasCombatant) {
      (S = ui.notifications) == null || S.warn("No combatant on the current scene.");
      return;
    }
    if (l && c.isCurrentTurn) {
      (T = ui.notifications) == null || T.warn("Only outside your activation.");
      return;
    }
    if (!l && !c.isCurrentTurn) {
      (C = ui.notifications) == null || C.warn("Only available during your activation.");
      return;
    }
    if (!l && c.overloaded) {
      (N = ui.notifications) == null || N.warn("Overloaded actors can only recover Burn.");
      return;
    }
    if (!l) {
      const de = 3 + Math.floor((Math.max(0, Number(((K = (F = (P = n.system) == null ? void 0 : P.attributes) == null ? void 0 : F.reflexes) == null ? void 0 : K.value) ?? 0)) + Math.max(0, Number(((j = (W = (Y = n.system) == null ? void 0 : Y.attributes) == null ? void 0 : W.willpower) == null ? void 0 : j.value) ?? 0))) / 2);
      if (Math.max(0, de - Math.max(0, Number(((x = c.state) == null ? void 0 : x.saSpentThisActivation) ?? 0))) < 2) {
        (L = ui.notifications) == null || L.warn("Activation SA cap reached.");
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
      const de = await ((oe = (X = (G = game.mwd) == null ? void 0 : G.roll) == null ? void 0 : X.execute) == null ? void 0 : oe.call(X, { actor: n, payload: d, event: t }));
      if (v(this, D, _t).call(this, { rerender: !1 }), !de) {
        v(this, D, Ee).call(this, !1);
        return;
      }
      u && await B.clearAim(n, { token: s });
      const M = l ? await B.executeAction(n, {
        token: s,
        actionId: "opportunity"
      }) : await B.spendResource(n, {
        token: s,
        resource: "sa",
        cost: 2,
        actionId: "attack",
        actionLabel: "Attack",
        actionCostLabel: "2 SA",
        actionCategory: "complex"
      });
      M != null && M.ok || (ge = ui.notifications) == null || ge.warn((M == null ? void 0 : M.reason) ?? `Unable to spend ${o} action.`), v(this, D, Ee).call(this, { force: !0 });
    } catch (de) {
      console.error(`MWD | Failed to launch ${o}`, de), yo(de, `Unable to launch ${o}.`);
    }
  }
  async _onAddSkillSpecialization(t, i) {
    var d, m, f, p;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable || !this.editing) return;
    const n = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.skillKey) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = nr(s.system ?? {}, n), o = as(s.system ?? {}, n), l = Gi(n).filter((h) => !o.includes(h.key));
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
    const u = zn(
      r.concat([c])
    );
    await s.update({
      [`system.skills.${n}.specializations`]: u
    }), v(this, D, Ee).call(this, { force: !0 });
  }
  async _onRemoveSkillSpecialization(t, i) {
    var l, c, u, d;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), !this.isEditable || !this.editing) return;
    const n = String(((u = i == null ? void 0 : i.dataset) == null ? void 0 : u.skillKey) ?? "").trim(), s = String(((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.specializationKey) ?? "").trim();
    if (!n || !s) return;
    const r = this.getPersistentActor() ?? this.actor, o = zn(
      nr(r.system ?? {}, n).filter((m) => m !== s)
    );
    await r.update({
      [`system.skills.${n}.specializations`]: o
    }), v(this, D, Ee).call(this, { force: !0 });
  }
  async _onCreateLifeModuleItem(t, i) {
    var d, m, f, p, h;
    if ((d = t == null ? void 0 : t.preventDefault) == null || d.call(t), (m = t == null ? void 0 : t.stopPropagation) == null || m.call(t), !this.isEditable) return;
    const n = String(((f = i == null ? void 0 : i.dataset) == null ? void 0 : f.moduleType) ?? "").trim();
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor, r = fo(n);
    if (!r.length) {
      (p = ui.notifications) == null || p.warn(`No ${ya(n)} life modules are configured in game settings.`);
      return;
    }
    const o = await _l({
      title: `Choose ${ya(n)} Life Module`,
      label: "Life Module",
      confirmLabel: "Create",
      options: r.map((g) => ({
        value: g.id,
        label: g.label
      }))
    });
    if (!o) return;
    const l = Mi(o);
    if (!l) {
      (h = ui.notifications) == null || h.warn("That life module catalog entry no longer exists.");
      return;
    }
    const c = lu(l, {}), u = {};
    for (const g of c.filter((y) => y.hasMultipleChoices)) {
      const y = await _l({
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
      system: Ua({
        moduleType: n,
        catalogId: l.id,
        selectedGrants: u
      })
    }]), v(this, D, Ee).call(this, { force: !0 });
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
    }]), v(this, D, Ee).call(this, { force: !0 });
  }
  async _onEditOwnedItem(t, i) {
    var s, r, o;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = v(this, D, gi).call(this, i, t);
    (o = n == null ? void 0 : n.sheet) == null || o.render(!0);
  }
  async _onDeleteOwnedItem(t, i) {
    var r, o;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = v(this, D, gi).call(this, i, t);
    if (!n) return;
    await (this.getPersistentActor() ?? this.actor).deleteEmbeddedDocuments("Item", [n.id]), v(this, D, Ee).call(this, { force: !0 });
  }
  async _onToggleInventoryAccordion(t, i) {
    var s, r, o, l, c, u, d, m, f, p;
    (s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t);
    const n = String(
      ((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.accordionId) ?? ((u = (c = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, "[data-accordion-id]")) == null ? void 0 : c.dataset) == null ? void 0 : u.accordionId) ?? ((p = (f = (m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-accordion-id]")) == null ? void 0 : f.dataset) == null ? void 0 : p.accordionId) ?? ""
    ).trim();
    n && (H(this, $t).has(n) ? H(this, $t).delete(n) : H(this, $t).add(n), v(this, D, Ee).call(this, !1));
  }
  async _onToggleOwnedItemEquipped(t, i) {
    var r, o, l, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = v(this, D, gi).call(this, i, t);
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor;
    await ((c = s.setOwnedItemEquipped) == null ? void 0 : c.call(s, n.id, !((l = n.system) != null && l.equipped))), v(this, D, Ee).call(this, { force: !0 });
  }
  async _onSetOwnedItemPrimary(t, i) {
    var r, o, l, c;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable) return;
    const n = v(this, D, gi).call(this, i, t);
    if (!n) return;
    const s = this.getPersistentActor() ?? this.actor;
    await ((c = s.setOwnedItemPrimary) == null ? void 0 : c.call(s, n.id, !((l = n.system) != null && l.isPrimary))), v(this, D, Ee).call(this, { force: !0 });
  }
  async _onAdjustGearQuantity(t, i) {
    var c, u, d, m, f, p, h, g, y, b, S;
    if ((c = t == null ? void 0 : t.preventDefault) == null || c.call(t), (u = t == null ? void 0 : t.stopPropagation) == null || u.call(t), !this.isEditable) return;
    const n = v(this, D, gi).call(this, i, t);
    if (!n || !["gear", "consumable"].includes(String(n.canonicalType ?? n.type ?? "").trim())) return;
    const s = Math.trunc(Number(
      ((d = i == null ? void 0 : i.dataset) == null ? void 0 : d.delta) ?? ((p = (f = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, "[data-delta]")) == null ? void 0 : f.dataset) == null ? void 0 : p.delta) ?? ((b = (y = (g = (h = t == null ? void 0 : t.target) == null ? void 0 : h.closest) == null ? void 0 : g.call(h, "[data-delta]")) == null ? void 0 : y.dataset) == null ? void 0 : b.delta) ?? 0
    ) || 0);
    if (!s) return;
    const o = (this.getPersistentActor() ?? this.actor).items.get(n.id) ?? n, l = Math.max(0, Math.trunc(Number(((S = o.system) == null ? void 0 : S.quantity) ?? 1) || 0) + s);
    await o.update({ "system.quantity": l }), v(this, D, Ee).call(this, { force: !0 });
  }
  async _onAttackWeapon(t, i) {
    var l, c, u, d;
    if ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (c = t == null ? void 0 : t.stopPropagation) == null || c.call(t), v(this, D, xt).call(this, i, t, "Equip that weapon before attacking.")) return;
    const n = v(this, D, gi).call(this, i, t);
    if (!((u = n == null ? void 0 : n.isPersonalWeapon) != null && u.call(n))) return;
    const s = this.getPersistentActor() ?? this.actor, r = ((d = this.getSheetTokenDocument) == null ? void 0 : d.call(this)) ?? B.getCurrentSceneTokenDocument(s) ?? B.getCurrentSceneTokenDocument(this.actor);
    await hs({ weapon: n, event: t, token: r }) && v(this, D, Ee).call(this, { force: !0 });
  }
};
St = new WeakMap(), Ti = new WeakMap(), zi = new WeakMap(), $t = new WeakMap(), da = new WeakMap(), D = new WeakSet(), Hu = function() {
  v(this, D, Tr).call(this), H(this, St) && (Ie(this, Ti, (t) => {
    var s;
    const i = this._getRootElement();
    if (!i) return;
    const n = t.target;
    if (n instanceof Node && !((s = n.closest) != null && s.call(n, ".mwd-combat-menu"))) {
      if (!i.contains(n)) {
        v(this, D, _t).call(this);
        return;
      }
      v(this, D, _t).call(this);
    }
  }), document.addEventListener("click", H(this, Ti)));
}, Tr = function() {
  H(this, Ti) && (document.removeEventListener("click", H(this, Ti)), Ie(this, Ti, null));
}, Dn = function() {
  const t = this._getRootElement();
  return t ? t.querySelector(".mwd-scroll-area") ?? t.querySelector(".csb-tab-panels") : null;
}, Uu = function() {
  const t = v(this, D, Dn).call(this);
  if (!(t instanceof HTMLElement)) {
    Ie(this, zi, null);
    return;
  }
  Ie(this, zi, {
    top: t.scrollTop,
    left: t.scrollLeft
  });
}, Wu = function() {
  const t = H(this, zi);
  if (!t) return;
  const i = v(this, D, Dn).call(this);
  i instanceof HTMLElement && (i.scrollTop = t.top, i.scrollLeft = t.left, requestAnimationFrame(() => {
    const n = v(this, D, Dn).call(this);
    n instanceof HTMLElement && (n.scrollTop = t.top, n.scrollLeft = t.left);
  }), Ie(this, zi, null));
}, Ee = function(t = !1) {
  v(this, D, Uu).call(this), this.render(t);
}, _t = function({ rerender: t = !0 } = {}) {
  H(this, St) && (Ie(this, St, null), t && v(this, D, Ee).call(this, !1));
}, gi = function(t, i) {
  var s, r, o, l, c, u, d, m;
  const n = String(
    ((s = t == null ? void 0 : t.dataset) == null ? void 0 : s.itemId) ?? ((l = (o = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, "[data-item-id]")) == null ? void 0 : o.dataset) == null ? void 0 : l.itemId) ?? ((m = (d = (u = (c = i == null ? void 0 : i.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-item-id]")) == null ? void 0 : d.dataset) == null ? void 0 : m.itemId) ?? ""
  ).trim();
  return n ? this.actor.items.get(n) ?? null : null;
}, ju = function() {
  var n;
  const t = (n = this._getRootElement) == null ? void 0 : n.call(this);
  if (!t) return;
  v(this, D, vr).call(this);
  const i = new AbortController();
  Ie(this, da, i), t.addEventListener("dragstart", (s) => {
    var c, u, d;
    const r = (u = (c = s.target) == null ? void 0 : c.closest) == null ? void 0 : u.call(c, "[data-weapon-attack-uuid]");
    if (!r || !t.contains(r)) return;
    const o = v(this, D, gi).call(this, r, s), l = o ? Bu(o) : null;
    if (!l) {
      s.preventDefault();
      return;
    }
    s.stopPropagation(), (d = s.dataTransfer) == null || d.setData("text/plain", JSON.stringify(l)), s.dataTransfer && (s.dataTransfer.effectAllowed = "copy");
  }, { signal: i.signal });
}, vr = function() {
  var t;
  (t = H(this, da)) == null || t.abort(), Ie(this, da, null);
}, Gu = async function(t) {
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
}, qu = async function(t = {}) {
  const i = String((t == null ? void 0 : t.condition) ?? "").trim(), n = String((t == null ? void 0 : t.scope) ?? "").trim(), s = `
    <div class="mwd-quick-select">
      <p><strong>Trigger:</strong> ${it(i || "Unspecified trigger")}</p>
      <p><strong>Scope:</strong> ${it(n || "Unspecified response")}</p>
    </div>`;
  return !!await Dialog.confirm({
    title: "Resolve Interrupt",
    content: s,
    yes: () => !0,
    no: () => !1
  });
}, Ku = function(t) {
  return t != null && t.combatants ? typeof t.combatants.values == "function" ? Array.from(t.combatants.values()) : Array.from(t.combatants ?? []) : [];
}, Vu = function(t) {
  var n;
  const i = String(((n = t == null ? void 0 : t.combatant) == null ? void 0 : n.id) ?? "").trim();
  return v(this, D, Ku).call(this, t == null ? void 0 : t.combat).filter((s) => s && String(s.id ?? "").trim() !== i).map((s) => {
    var c;
    const r = ((c = s.token) == null ? void 0 : c.document) ?? s.token ?? null, o = s.actor ?? (r == null ? void 0 : r.actor) ?? null, l = String(s.name ?? (r == null ? void 0 : r.name) ?? (o == null ? void 0 : o.name) ?? "Combatant").trim() || "Combatant";
    return {
      combatantId: String(s.id ?? "").trim(),
      actorUuid: (o == null ? void 0 : o.uuid) ?? null,
      tokenUuid: (r == null ? void 0 : r.uuid) ?? null,
      name: l
    };
  }).filter((s) => s.combatantId && s.name).sort((s, r) => s.name.localeCompare(r.name));
}, Yu = async function(t) {
  var r;
  const i = v(this, D, Vu).call(this, t);
  if (!i.length)
    return (r = ui.notifications) == null || r.warn("No other combatants are available to assist."), null;
  const n = `
    <form class="mwd-quick-select">
      <div class="mwd-field">
        <label>Assist</label>
        <select name="combatant">
          ${i.map((o) => `<option value="${it(o.combatantId)}">${it(o.name)}</option>`).join("")}
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
}, Qu = async function({ actor: t, token: i = null, target: n = null, costLabel: s = "" } = {}) {
  const r = String((t == null ? void 0 : t.name) ?? "Ally").trim() || "Ally", o = String((n == null ? void 0 : n.name) ?? "an ally").trim() || "an ally", l = String(s ?? "").trim(), c = `
    <div class="mwd-chat-card mwd-chat-card--assist">
      <h3>Assist</h3>
      <p><strong>${it(r)}</strong> assists <strong>${it(o)}</strong>.</p>
      ${l ? `<p><small>Cost: ${it(l)}</small></p>` : ""}
    </div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: t, token: (i == null ? void 0 : i.object) ?? i }),
    content: c
  });
}, Ju = async function({ actor: t, token: i = null, preparedInterrupt: n = null, costLabel: s = "" } = {}) {
  const r = String((t == null ? void 0 : t.name) ?? "Combatant").trim() || "Combatant", o = String((n == null ? void 0 : n.condition) ?? "").trim(), l = String((n == null ? void 0 : n.scope) ?? "").trim(), c = String(s ?? "").trim(), u = `
    <div class="mwd-chat-card mwd-chat-card--interrupt">
      <h3>Interrupt</h3>
      <p><strong>${it(r)}</strong> resolves a prepared interrupt.</p>
      ${o ? `<p><strong>Trigger:</strong> ${it(o)}</p>` : ""}
      ${l ? `<p><strong>Scope:</strong> ${it(l)}</p>` : ""}
      ${c ? `<p><small>Cost: ${it(c)}</small></p>` : ""}
    </div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: t, token: (i == null ? void 0 : i.object) ?? i }),
    content: u
  });
}, xt = function(t, i, n = "That action is not available right now.") {
  var o, l, c, u, d;
  const s = ((o = t == null ? void 0 : t.closest) == null ? void 0 : o.call(t, "[data-action-disabled='true']")) ?? ((c = (l = i == null ? void 0 : i.target) == null ? void 0 : l.closest) == null ? void 0 : c.call(l, "[data-action-disabled='true']"));
  if (!s) return !1;
  const r = String(((u = s.dataset) == null ? void 0 : u.actionReason) ?? n).trim() || n;
  return (d = ui.notifications) == null || d.warn(r), !0;
}, na = function(t, i) {
  return `${String(t ?? "").trim()}:${String(i ?? "").trim()}`;
}, _(he, "PARTS", {
  sheet: {
    get template() {
      return `${Q}/v2/actor/character-sheet.hbs`;
    }
  }
}), _(he, "DEFAULT_OPTIONS", foundry.utils.mergeObject(Qi(he, he, "DEFAULT_OPTIONS"), {
  classes: ["character-sheet", w, "actor-sheet-v2", "mwd-character-sheet", "mwd-sheet"],
  window: { minWidth: 450, minHeight: 740, resizable: !0 },
  position: { width: 980, height: 900 },
  actions: {
    ...Qi(he, he, "DEFAULT_OPTIONS").actions,
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
let wr = he;
function Xu(a, e, t = "") {
  const i = foundry.utils.getProperty(a, e);
  return i === void 0 ? t : i;
}
function gs(a, e, t = {}) {
  const {
    document: i = null,
    type: n = "text",
    value: s = Xu(i, a, n === "number" ? 0 : ""),
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
function Vt(a, e, t, i = {}) {
  return gs(e, t, { ...i, document: a, type: "text" });
}
function ae(a, e, t, i = {}) {
  return gs(e, t, { ...i, document: a, type: "number" });
}
function Yy(a, e, t, i = [], n = {}) {
  var o;
  const s = n.value ?? Xu(a, e, ""), r = i.map((l) => ({
    ...l,
    selected: l.value === s
  }));
  return gs(e, t, {
    ...n,
    document: a,
    type: "select",
    value: s,
    displayValue: ((o = r.find((l) => l.selected)) == null ? void 0 : o.label) ?? s,
    options: r
  });
}
function Co(a, e, t, i = {}) {
  return gs(e, t, { ...i, document: a, type: "textarea" });
}
function Po(a, e = []) {
  return e.map(
    (t) => ae(
      a,
      `system.attributes.${t.key}.value`,
      t.label
    )
  );
}
function Ci(a, {
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
class Zu extends Aa {
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["npc-sheet", w, "actor-sheet-v2"],
      position: { width: 920, height: 860 }
    });
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), i = this.actor;
    return t.layout = await Di.get("npc"), t.actorSheet = {
      profileFields: [
        Vt(i, "system.role", "Role / Archetype")
      ],
      attributeFields: Po(i, [
        { key: "strength", label: "Strength" },
        { key: "reflexes", label: "Reflexes" },
        { key: "intelligence", label: "Intelligence" },
        { key: "willpower", label: "Willpower" },
        { key: "charisma", label: "Charisma" },
        { key: "edge", label: "Edge" }
      ]),
      monitorFields: [
        ae(i, "system.monitors.physical.value", "Physical"),
        ae(i, "system.monitors.physical.max", "Physical Max"),
        ae(i, "system.monitors.fatigue.value", "Fatigue"),
        ae(i, "system.monitors.fatigue.max", "Fatigue Max"),
        ae(i, "system.monitors.armor.value", "Armor"),
        Vt(i, "system.monitors.armor.effect", "Armor Effect")
      ],
      itemCollections: {
        traits: Ci(i, {
          types: ["quality"],
          describe: (n) => {
            var s;
            return ((s = n.system) == null ? void 0 : s.category) ?? "";
          }
        }),
        weapons: Ci(i, {
          types: ["personalWeapon"],
          supportsEquip: !0,
          supportsPrimary: !0,
          describe: (n) => {
            var s, r;
            return `${((s = n.system) == null ? void 0 : s.category) ?? "ranged"} | DV ${Number(((r = n.system) == null ? void 0 : r.damage) ?? 0)}`;
          }
        }),
        assetModules: Ci(i, {
          types: ["assetModule"],
          describe: (n) => {
            var s;
            return `Level ${Number(((s = n.system) == null ? void 0 : s.level) ?? 1)}`;
          }
        }),
        inventory: Ci(i, {
          // Consumables share the same quantity-driven row contract as gear on
          // lightweight actor sheets, so we present them in one inventory list.
          types: ["gear", "consumable"],
          describe: (n) => {
            var s, r;
            return `Qty ${Number(((s = n.system) == null ? void 0 : s.quantity) ?? 1)} | Rating ${Number(((r = n.system) == null ? void 0 : r.rating) ?? 0)}`;
          }
        })
      },
      notesField: Co(i, "system.biography", "Notes", { rows: 12 })
    }, t;
  }
}
_(Zu, "PARTS", {
  sheet: {
    template: `${Q}/v2/actor/npc-sheet.hbs`,
    scrollable: [".sheet-body"]
  }
});
function Qy({ name: a, attribute: e, value: t }) {
  return {
    name: a,
    system: {
      attribute: e,
      value: Math.max(0, Number(t ?? 0) || 0)
    }
  };
}
var Ht, Er, On, ed;
const Qn = class Qn extends Aa {
  constructor() {
    super(...arguments);
    Te(this, Ht);
  }
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["vehicle-sheet", w, "actor-sheet-v2"],
      position: { width: 940, height: 880 },
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        rollVehicleQuickAction: Qn.prototype._onRollVehicleQuickAction
      }
    });
  }
  async _prepareContext(t) {
    const i = await super._prepareContext(t), n = this.actor, s = v(this, Ht, Er).call(this);
    return i.layout = await Di.get("vehicle"), i.actorSheet = {
      profileFields: [
        Vt(n, "system.category", "Category"),
        ae(n, "system.moves", "Move")
      ],
      attributeFields: Po(n, [
        { key: "handling", label: "Handling" },
        { key: "system", label: "System" },
        { key: "condition", label: "Condition" },
        { key: "chassis", label: "Chassis" }
      ]),
      monitorFields: [
        ae(n, "system.monitors.structure.value", "Structure"),
        ae(n, "system.monitors.structure.max", "Structure Max"),
        ae(n, "system.monitors.armor.value", "Armor"),
        ae(n, "system.monitors.armor.max", "Armor Max"),
        Vt(n, "system.mwd.status.state", "Status"),
        ae(n, "system.attacks", "Attacks")
      ],
      crewFields: [
        ae(n, "system.mwd.crew.count", "Crew"),
        ae(n, "system.mwd.crew.effectiveCount", "Effective Crew"),
        ae(n, "system.mwd.crew.injuryLevel", "Crew Injury"),
        Vt(n, "system.crew", "Crew Notes")
      ],
      snapshotFields: [
        Vt(n, "system.mwd.driverSnapshot.name", "Primary Driver", { value: s.name }),
        ae(n, "system.mwd.driverSnapshot.gunnery", "Gunnery", { value: s.gunnery }),
        ae(n, "system.mwd.driverSnapshot.piloting", "Piloting", { value: s.piloting }),
        ae(n, "system.mwd.driverSnapshot.perception", "Perception", { value: s.perception }),
        ae(n, "system.mwd.driverSnapshot.stealth", "Stealth", { value: s.stealth }),
        ae(n, "system.mwd.driverSnapshot.reflexes", "Reflexes", { value: s.reflexes }),
        ae(n, "system.mwd.driverSnapshot.intelligence", "Intelligence", { value: s.intelligence })
      ],
      quickActions: [
        { label: "Defense", dataAction: "rollVehicleQuickAction", mode: "defense" },
        { label: "Sensors", dataAction: "rollVehicleQuickAction", mode: "sensors" },
        { label: "Stealth", dataAction: "rollVehicleQuickAction", mode: "stealth" },
        { label: "Initiative", dataAction: "rollVehicleQuickAction", mode: "initiative" }
      ],
      itemCollections: {
        skills: Ci(n, {
          types: ["skill"],
          describe: (r) => {
            var o, l, c;
            return `${((o = r.system) == null ? void 0 : o.code) ?? "skill"} | ${((l = r.system) == null ? void 0 : l.attribute) ?? ""} ${Number(((c = r.system) == null ? void 0 : c.value) ?? 0)}`;
          }
        }),
        weapons: Ci(n, {
          types: ["mechWeapon", "personalWeapon"],
          describe: (r) => {
            var o, l;
            return `DV ${Number(((o = r.system) == null ? void 0 : o.damage) ?? 0)} | ${((l = r.system) == null ? void 0 : l.damageType) ?? ""}`;
          }
        }),
        gear: Ci(n, {
          // Vehicles do not need a separate consumable panel yet, but their
          // shared inventory list should still surface owned expendables.
          types: ["gear", "consumable", "assetModule"],
          describe: (r) => {
            var o;
            return ((o = r.system) == null ? void 0 : o.category) ?? r.type;
          }
        })
      },
      notesField: Co(n, "system.description", "Description", { rows: 12 })
    }, i;
  }
  async _onRollVehicleQuickAction(t, i) {
    var r, o, l;
    (r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t);
    const n = String(((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.mode) ?? "").trim(), s = v(this, Ht, Er).call(this);
    switch (n) {
      case "defense":
        return v(this, Ht, On).call(this, {
          title: "Vehicle Defense",
          attribute: "handling",
          rating: s.piloting
        });
      case "sensors":
        return v(this, Ht, On).call(this, {
          title: "Vehicle Sensors",
          attribute: "system",
          rating: s.perception
        });
      case "stealth":
        return v(this, Ht, On).call(this, {
          title: "Vehicle Stealth",
          attribute: "handling",
          rating: s.stealth
        });
      case "initiative":
        return v(this, Ht, ed).call(this, s);
      default:
        return null;
    }
  }
};
Ht = new WeakSet(), Er = function() {
  var i, n;
  const t = ((n = (i = this.actor.system) == null ? void 0 : i.mwd) == null ? void 0 : n.driverSnapshot) ?? {};
  return {
    name: String(t.name ?? "").trim(),
    gunnery: Number(t.gunnery ?? 0) || 0,
    piloting: Number(t.piloting ?? 0) || 0,
    perception: Number(t.perception ?? 0) || 0,
    stealth: Number(t.stealth ?? 0) || 0,
    reflexes: Number(t.reflexes ?? 0) || 0,
    intelligence: Number(t.intelligence ?? 0) || 0
  };
}, On = async function({ title: t, attribute: i, rating: n }) {
  const s = Qy({ name: t, attribute: i, value: n });
  await At.rollSkill(this.actor, s);
}, ed = async function(t) {
  var n;
  await (await new Roll("2d6 + @ref + @int", {
    ref: t.reflexes,
    int: t.intelligence
  }).evaluate({ async: !0 })).toMessage({
    speaker: ChatMessage.getSpeaker({ actor: this.actor, token: ((n = this.getSheetTokenDocument()) == null ? void 0 : n.object) ?? this.getSheetTokenDocument() }),
    flavor: "Vehicle Initiative"
  });
}, _(Qn, "PARTS", {
  sheet: {
    template: `${Q}/v2/actor/vehicle-sheet.hbs`,
    scrollable: [".sheet-body"]
  }
});
let kr = Qn;
const Jy = [
  { value: "light", label: "Light" },
  { value: "medium", label: "Medium" },
  { value: "heavy", label: "Heavy" },
  { value: "assault", label: "Assault" }
];
function Xy(a) {
  const e = Et(a);
  return {
    name: (e == null ? void 0 : e.label) ?? a,
    system: {
      code: a,
      attribute: (e == null ? void 0 : e.attribute) ?? "handling",
      value: 0
    }
  };
}
var Tt, td, id, sa;
const oi = class oi extends Aa {
  constructor() {
    super(...arguments);
    Te(this, Tt);
  }
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      classes: ["battlemech-sheet", w, "actor-sheet-v2"],
      position: { width: 980, height: 900 },
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        rollBattlemechQuickAction: oi.prototype._onRollBattlemechQuickAction,
        addHardpoint: oi.prototype._onAddHardpoint,
        deleteHardpoint: oi.prototype._onDeleteHardpoint,
        addWeaponGroup: oi.prototype._onAddWeaponGroup,
        deleteWeaponGroup: oi.prototype._onDeleteWeaponGroup,
        togglePrimaryWeaponGroup: oi.prototype._onTogglePrimaryWeaponGroup
      }
    });
  }
  async _prepareContext(t) {
    const i = await super._prepareContext(t), n = this.actor, s = new yu(n).compute(), r = v(this, Tt, td).call(this);
    return i.layout = await Di.get("battlemech"), i.actorSheet = {
      profileFields: [
        Yy(n, "system.mwd.weightClass", "Weight Class", Jy),
        ae(n, "system.mwd.tonnage", "Tonnage"),
        Vt(n, "system.mwd.chassis", "Chassis")
      ],
      attributeFields: Po(n, [
        { key: "handling", label: "Handling" },
        { key: "system", label: "System" },
        { key: "condition", label: "Condition" },
        { key: "chassis", label: "Chassis" }
      ]),
      monitorFields: [
        ae(n, "system.monitors.structure.value", "Structure"),
        ae(n, "system.monitors.structure.max", "Structure Max"),
        ae(n, "system.monitors.heat.value", "Heat"),
        ae(n, "system.monitors.heat.max", "Heat Max"),
        ae(n, "system.mwd.heat.thresholds.runningHot", "Running Hot"),
        ae(n, "system.mwd.heat.thresholds.shutdown", "Shutdown")
      ],
      mountFields: [
        Vt(n, "system.mwd.primarySlot.mode", "Primary Slot Mode"),
        ae(n, "system.mwd.melee.maxWeapons", "Melee Limit"),
        Vt(n, "system.mwd.primarySlot.typeRestriction", "Primary Type Restriction"),
        ae(n, "system.mwd.loadout.mountPoints.total", "Mount Points", { value: s.mountPoints.total, readOnly: !0, displayValue: s.mountPoints.total }),
        ae(n, "system.mwd.loadout.mountPoints.used", "Used", { value: s.mountPoints.used, readOnly: !0, displayValue: s.mountPoints.used }),
        ae(n, "system.mwd.loadout.mountPoints.remaining", "Remaining", { value: s.mountPoints.remaining, readOnly: !0, displayValue: s.mountPoints.remaining })
      ],
      snapshotFields: [
        Vt(n, "system.mwd.pilotSnapshot.name", "Operator Name", { value: r.name }),
        ae(n, "system.mwd.pilotSnapshot.gunnery", "Gunnery", { value: r.gunnery }),
        ae(n, "system.mwd.pilotSnapshot.piloting", "Piloting", { value: r.piloting }),
        ae(n, "system.mwd.pilotSnapshot.perception", "Perception", { value: r.perception }),
        ae(n, "system.mwd.pilotSnapshot.stealth", "Stealth", { value: r.stealth }),
        ae(n, "system.mwd.pilotSnapshot.reflexes", "Reflexes", { value: r.reflexes }),
        ae(n, "system.mwd.pilotSnapshot.intelligence", "Intelligence", { value: r.intelligence })
      ],
      quickActions: [
        { label: "Ranged Attack", dataAction: "rollBattlemechQuickAction", mode: "ranged" },
        { label: "Melee Attack", dataAction: "rollBattlemechQuickAction", mode: "melee" },
        { label: "Dodge", dataAction: "rollBattlemechQuickAction", mode: "dodge" },
        { label: "Piloting", dataAction: "rollBattlemechQuickAction", mode: "piloting" },
        { label: "Sensors", dataAction: "rollBattlemechQuickAction", mode: "sensors" },
        { label: "Repair", dataAction: "rollBattlemechQuickAction", mode: "repair" }
      ],
      itemCollections: {
        weapons: Ci(n, {
          types: ["mechWeapon"],
          describe: (o) => {
            var l, c, u;
            return `${((l = o.system) == null ? void 0 : l.hardpointType) ?? "energy"} ${((c = o.system) == null ? void 0 : c.hardpointSize) ?? "small"} | DV ${Number(((u = o.system) == null ? void 0 : u.damage) ?? 0)}`;
          }
        })
      },
      notesField: Co(n, "system.description", "Description", { rows: 12 })
    }, i.battlemechSheet = {
      loadout: s,
      hardpoints: (s.hardpoints ?? []).map((o, l) => ({
        ...o,
        index: l,
        occupiedByName: o.occupiedByName ?? "Free"
      })),
      weaponGroups: (s.weaponGroups ?? []).map((o, l) => ({
        ...o,
        index: l,
        weaponIdsText: Array.isArray(o.weaponIds) ? o.weaponIds.join(", ") : ""
      }))
    }, i;
  }
  _onRender(t, i) {
    var s, r;
    (s = super._onRender) == null || s.call(this, t, i);
    const n = (r = this._getRootElement) == null ? void 0 : r.call(this);
    !n || !this.editing || n.querySelectorAll("[data-weapon-group-input='weaponIds']").forEach((o) => {
      o.addEventListener("change", (l) => {
        var m;
        const c = l.currentTarget, u = Number(((m = c == null ? void 0 : c.dataset) == null ? void 0 : m.groupIndex) ?? -1);
        if (!Number.isInteger(u) || u < 0) return;
        const d = String(c.value ?? "").split(",").map((f) => f.trim()).filter(Boolean);
        this.actor.update({
          [`system.mwd.weaponGroups.${u}.weaponIds`]: d
        });
      });
    });
  }
  async _onRollBattlemechQuickAction(t, i) {
    var s, r, o;
    switch ((s = t == null ? void 0 : t.preventDefault) == null || s.call(t), (r = t == null ? void 0 : t.stopPropagation) == null || r.call(t), String(((o = i == null ? void 0 : i.dataset) == null ? void 0 : o.mode) ?? "").trim()) {
      case "ranged":
        return v(this, Tt, sa).call(this, "gunnery");
      case "melee":
        return v(this, Tt, sa).call(this, "meleeCombat");
      case "dodge":
      case "piloting":
        return v(this, Tt, sa).call(this, "piloting");
      case "sensors":
        return v(this, Tt, sa).call(this, "perception");
      case "repair":
        return v(this, Tt, sa).call(this, "technician");
      default:
        return null;
    }
  }
  async _onAddHardpoint(t) {
    var n, s, r, o;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !this.isEditable || !this.editing) return;
    const i = foundry.utils.deepClone(((o = (r = this.actor.system) == null ? void 0 : r.mwd) == null ? void 0 : o.hardpoints) ?? []);
    i.push({
      id: foundry.utils.randomID(),
      type: "energy",
      size: "small",
      location: "arm"
    }), await this.actor.update({ "system.mwd.hardpoints": i }), this.render({ force: !0 });
  }
  async _onDeleteHardpoint(t, i) {
    var r, o, l, c, u;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable || !this.editing) return;
    const n = Number(((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.hardpointIndex) ?? -1);
    if (!Number.isInteger(n) || n < 0) return;
    const s = foundry.utils.deepClone(((u = (c = this.actor.system) == null ? void 0 : c.mwd) == null ? void 0 : u.hardpoints) ?? []);
    s.splice(n, 1), await this.actor.update({ "system.mwd.hardpoints": s }), this.render({ force: !0 });
  }
  async _onAddWeaponGroup(t) {
    var n, s, r, o;
    if ((n = t == null ? void 0 : t.preventDefault) == null || n.call(t), (s = t == null ? void 0 : t.stopPropagation) == null || s.call(t), !this.isEditable || !this.editing) return;
    const i = foundry.utils.deepClone(((o = (r = this.actor.system) == null ? void 0 : r.mwd) == null ? void 0 : o.weaponGroups) ?? []);
    i.push({
      id: foundry.utils.randomID(),
      name: `Weapon Group ${i.length + 1}`,
      weaponIds: [],
      isPrimary: i.length === 0
    }), await this.actor.update({ "system.mwd.weaponGroups": i }), this.render({ force: !0 });
  }
  async _onDeleteWeaponGroup(t, i) {
    var r, o, l, c, u;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable || !this.editing) return;
    const n = Number(((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.groupIndex) ?? -1);
    if (!Number.isInteger(n) || n < 0) return;
    const s = foundry.utils.deepClone(((u = (c = this.actor.system) == null ? void 0 : c.mwd) == null ? void 0 : u.weaponGroups) ?? []);
    s.splice(n, 1), await this.actor.update({ "system.mwd.weaponGroups": s }), this.render({ force: !0 });
  }
  async _onTogglePrimaryWeaponGroup(t, i) {
    var r, o, l, c, u;
    if ((r = t == null ? void 0 : t.preventDefault) == null || r.call(t), (o = t == null ? void 0 : t.stopPropagation) == null || o.call(t), !this.isEditable || !this.editing) return;
    const n = Number(((l = i == null ? void 0 : i.dataset) == null ? void 0 : l.groupIndex) ?? -1);
    if (!Number.isInteger(n) || n < 0) return;
    const s = foundry.utils.deepClone(((u = (c = this.actor.system) == null ? void 0 : c.mwd) == null ? void 0 : u.weaponGroups) ?? []);
    s.forEach((d, m) => {
      d.isPrimary = m === n;
    }), await this.actor.update({ "system.mwd.weaponGroups": s }), this.render({ force: !0 });
  }
};
Tt = new WeakSet(), td = function() {
  var i, n;
  const t = ((n = (i = this.actor.system) == null ? void 0 : i.mwd) == null ? void 0 : n.pilotSnapshot) ?? {};
  return {
    name: String(t.name ?? "").trim(),
    gunnery: Number(t.gunnery ?? 0) || 0,
    piloting: Number(t.piloting ?? 0) || 0,
    perception: Number(t.perception ?? 0) || 0,
    stealth: Number(t.stealth ?? 0) || 0,
    reflexes: Number(t.reflexes ?? 0) || 0,
    intelligence: Number(t.intelligence ?? 0) || 0
  };
}, id = function(t) {
  return this.actor.items.find((i) => {
    var n;
    return (i.canonicalType ?? i.type) === "skill" && ((n = i.system) == null ? void 0 : n.code) === t;
  }) ?? Xy(t);
}, sa = async function(t) {
  await At.rollSkill(this.actor, v(this, Tt, id).call(this, t));
}, _(oi, "PARTS", {
  sheet: {
    template: `${Q}/v2/actor/battlemech-sheet.hbs`,
    scrollable: [".sheet-body"]
  }
});
let Mr = oi;
function Zy() {
  console.log(`${Se}Registering Actor sheets (V2)`);
  const { Actors: a } = foundry.documents.collections;
  a.registerSheet(w, wr, {
    types: ["character"],
    makeDefault: !0,
    label: "Character (V2)"
  }), a.registerSheet(w, Zu, {
    types: ["npc"],
    makeDefault: !0,
    label: "NPC (V2)"
  }), a.registerSheet(w, kr, {
    types: ["vehicle"],
    makeDefault: !0,
    label: "Vehicle (V2)"
  }), a.registerSheet(w, Mr, {
    types: ["battlemech"],
    makeDefault: !0,
    label: "BattleMech (V2)"
  });
}
const { HandlebarsApplicationMixin: eb } = foundry.applications.api, { HTMLField: xl, StringField: tb } = foundry.data.fields, Bs = /* @__PURE__ */ new Set(["system.notes", "system.description"]), ib = /* @__PURE__ */ new Set(["name"]), ab = Object.freeze({
  [A.itemType.personalWeapon]: `${Q}/v2/item/personal-weapon-root.hbs`,
  [A.itemType.mechWeapon]: `${Q}/v2/item/mech-weapon-root.hbs`,
  [A.itemType.armor]: `${Q}/v2/item/armor-root.hbs`
});
function zs(a, e) {
  const t = new a({ required: !1, blank: !0, initial: "" });
  return t.name = e, t;
}
function nb(a = {}) {
  return {
    ...a,
    sourceReference: a.sourceReference ?? zs(tb, "system.sourceReference"),
    notes: a.notes ?? zs(xl, "system.notes"),
    description: a.description ?? zs(xl, "system.description")
  };
}
function sb(a = {}) {
  return Object.fromEntries(
    Object.entries(a ?? {}).filter(([, e]) => e !== void 0)
  );
}
var Fi, vi, Hi, ma, Yt, _a, Cr;
const He = class He extends eb(foundry.applications.sheets.ItemSheetV2) {
  constructor() {
    super(...arguments);
    Te(this, Yt);
    Te(this, Fi, /* @__PURE__ */ new Map());
    Te(this, vi, /* @__PURE__ */ new Map());
    Te(this, Hi, null);
    Te(this, ma, /* @__PURE__ */ new Map());
    /** @override */
    _(this, "tabGroups", {
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
        submitOnChange: !1,
        closeOnSubmit: !1,
        handler: He.prototype._onSubmitForm
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
      return ab[n] ?? `${Q}/v2/item/${n}.hbs`;
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
    var P, F, K, Y, W, j, x, L, G;
    const i = await super._prepareContext(t), n = ((F = (P = game.system.mwd.modifiers) == null ? void 0 : P.getEnums) == null ? void 0 : F.call(P)) ?? {}, s = foundry.utils.deepClone((i == null ? void 0 : i.options) ?? {}), r = nb((i == null ? void 0 : i.fields) ?? ((Y = (K = this.item.system) == null ? void 0 : K.schema) == null ? void 0 : Y.fields) ?? {}), o = ((j = (W = this.item.actor) == null ? void 0 : W.getAttributes) == null ? void 0 : j.call(W, this.item)) ?? [], l = this._getCanonicalItemType(), c = !this.item.actor, u = !!this.item.actor, d = Pe.itemType.singular[l] ?? l, m = this._getEffectEntries(), f = m.filter((X) => X.syncedCount > 0).length, p = this.constructor.LAYOUT_ID, h = this.item.actor ? (X) => o.includes(X) : (X) => !0, g = l === A.itemType.skill, b = ["mwd", "item-sheet", this.isEditable ? "editable" : "locked"], S = b.join(" ");
    s.classes = b, s.cssClass = S;
    const T = async (X, { secrets: oe = this.item.isOwner } = {}) => foundry.applications.ux.TextEditor.implementation.enrichHTML(X ?? "", {
      async: !0,
      secrets: oe,
      relativeTo: this.item
    }), C = foundry.utils.expandObject({
      "system.notes": await T(this.item.system.notes ?? ""),
      "system.description": await T(this.item.system.description ?? "")
    }), N = {
      ...i,
      item: this.item,
      data: this.item,
      system: this.item.system,
      // AppV2 prose editors need both raw field definitions and pre-enriched
      // HTML. Keeping both here avoids template-specific enrichment branches.
      fields: r,
      enriched: C,
      enrichedDescription: ((x = C == null ? void 0 : C.system) == null ? void 0 : x.description) ?? "",
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
        ...be.getEnums(h, g),
        ...n
      },
      MWD: Pe,
      itemSheet: {
        canonicalType: l,
        typeLabel: d,
        isArmorSheet: l === A.itemType.armor,
        isStandalone: c,
        canUseActorControls: u,
        supportsEffectSync: !!((G = (L = this.item).supportsEquippedEffectSync) != null && G.call(L)),
        effectEntries: m,
        effectCount: m.length,
        syncedEffectCount: f,
        summaryChips: this._getSummaryChips(),
        stateChips: this._getStateChips(m)
      },
      cssClass: S,
      tabs: this._getTabs()
    };
    return p && (N.layout = await Di.get(p)), N;
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
    o && (H(this, Fi).set(r, o), v(this, Yt, _a).call(this, this._getRootElement(), r, o));
  }
  _onClickAccordion(t, i) {
    var u, d, m;
    const n = ((u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".csb-accordion__trigger[data-section]")) ?? ((m = (d = t == null ? void 0 : t.target) == null ? void 0 : d.closest) == null ? void 0 : m.call(d, ".csb-accordion__trigger[data-section]"));
    if (!n) return;
    const s = n.dataset.section, r = n.closest(".csb-accordion");
    if (!r || !s) return;
    const o = r.dataset.group || "default", c = (H(this, vi).has(o) ? H(this, vi).get(o) : r.dataset.default || null) === s ? null : s;
    H(this, vi).set(o, c), v(this, Yt, Cr).call(this, r, c);
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
          b && (H(this, Fi).set(d, b), v(this, Yt, _a).call(this, n, d, b));
        });
      const f = H(this, Fi).get(d), p = u.dataset.default || ((l = m[0]) == null ? void 0 : l.dataset.tab), h = f || p;
      h && v(this, Yt, _a).call(this, n, d, h);
    }
    for (const u of n.querySelectorAll(".csb-tabs")) {
      const d = u.dataset.group || "default", m = Array.from(u.querySelectorAll(".csb-tab-link[data-tab]"));
      if (!m.length) continue;
      const f = H(this, Fi).get(d), p = u.dataset.default || ((c = m[0]) == null ? void 0 : c.dataset.tab), h = f || p;
      h && v(this, Yt, _a).call(this, n, d, h);
    }
    for (const u of n.querySelectorAll(".csb-accordion")) {
      const d = u.dataset.group || "default", m = H(this, vi).has(d) ? H(this, vi).get(d) : u.dataset.default || null;
      v(this, Yt, Cr).call(this, u, m);
    }
    for (const u of n.querySelectorAll("prose-mirror[name]")) {
      const d = u.getAttribute("name") ?? "";
      Bs.has(d) && u.addEventListener("change", (m) => {
        m.preventDefault(), m.stopPropagation(), this._updateRichTextField(u);
      });
    }
    if (this.isEditable)
      for (const u of n.querySelectorAll("input[name], select[name], textarea[name]")) {
        if (u.closest("prose-mirror") || u.hasAttribute("data-action") || !(u instanceof HTMLElement)) continue;
        const d = String(u.getAttribute("name") ?? "").trim();
        u instanceof HTMLInputElement && !ib.has(d) && !["checkbox", "radio"].includes(u.type) ? u.addEventListener("input", (m) => {
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
    if (!this.isEditable || !Bs.has(i)) return;
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
    const n = String(((o = t == null ? void 0 : t.getAttribute) == null ? void 0 : o.call(t, "name")) ?? "").trim() || foundry.utils.randomID(), s = H(this, ma).get(n);
    s && clearTimeout(s);
    const r = setTimeout(() => {
      H(this, ma).delete(n), this._syncNamedField(t, i);
    }, 180);
    H(this, ma).set(n, r);
  }
  _getNamedFieldUpdate(t) {
    var s, r;
    if (!(t instanceof HTMLElement)) return null;
    const i = String(((s = t.getAttribute) == null ? void 0 : s.call(t, "name")) ?? "").trim();
    if (!i || Bs.has(i)) return null;
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
    const n = this._getNamedFieldUpdate(t), s = sb({
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
      Ie(this, Hi, null);
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
    Ie(this, Hi, i.length ? i : null);
  }
  _restoreScrollPositions() {
    const t = H(this, Hi);
    if (!(t != null && t.length)) return;
    const i = () => {
      const n = this._getRootElement();
      if (n)
        for (const s of t) {
          const r = n.querySelectorAll(s.selector).item(s.index);
          r instanceof HTMLElement && (r.scrollTop = s.top, r.scrollLeft = s.left);
        }
    };
    i(), requestAnimationFrame(i), Ie(this, Hi, null);
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
Fi = new WeakMap(), vi = new WeakMap(), Hi = new WeakMap(), ma = new WeakMap(), Yt = new WeakSet(), _a = function(t, i, n) {
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
}, Cr = function(t, i) {
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
}, _(He, "LAYOUT_ID", null), /** @override */
_(He, "PARTS", {
  sheet: {
    template: "",
    // Set dynamically in _getPartTemplate
    scrollable: [".sheet-body"]
  }
}), _(He, "TABS", {
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
let Xt = He;
class Pr extends Xt {
}
_(Pr, "LAYOUT_ID", "contact"), _(Pr, "PARTS", {
  sheet: {
    template: `${Q}/v2/item/contact.hbs`,
    scrollable: [".sheet-body"]
  }
});
const rb = Object.freeze([
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
]), ob = Object.freeze([
  { value: "ammo", label: "Ammunition" },
  { value: "explosive", label: "Explosive" },
  { value: "medical", label: "Medical" },
  { value: "repair", label: "Repair" },
  { value: "fuel", label: "Fuel / Power Cell" },
  { value: "utility", label: "Utility" }
]);
function lb(a) {
  return a === "consumable" ? ob : rb;
}
class Nr extends Xt {
  async _prepareContext(e) {
    var r;
    const t = await super._prepareContext(e), i = this._getCanonicalItemType(), n = this.item.system ?? {}, s = lb(i);
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
    }, t.layout = await Di.get(i === "consumable" ? "consumable" : "gear"), t;
  }
}
// One sheet class intentionally backs both gear and consumables so quantity,
// rating, and reference editing never drift into parallel implementations.
_(Nr, "LAYOUT_ID", null), _(Nr, "PARTS", {
  sheet: {
    template: `${Q}/v2/item/gear.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Rr extends Xt {
  async _prepareContext(e) {
    var r, o;
    const t = await super._prepareContext(e), i = zt(this.item.system ?? {}), n = zc(), s = Array.isArray((r = t.ENUMS) == null ? void 0 : r.skills) ? t.ENUMS.skills.map((l) => ({
      value: String((l == null ? void 0 : l.value) ?? "").trim(),
      label: String((l == null ? void 0 : l.label) ?? (l == null ? void 0 : l.value) ?? "").trim()
    })).filter((l) => l.value) : [];
    return t.system = {
      ...i,
      effects: (Array.isArray(i.effects) ? i.effects : []).map((l) => ({
        ...l,
        showSkillPicker: Bc(l) || Array.isArray(l.skillKeys) && l.skillKeys.length > 0,
        isEdgeEvent: l.type === "edgeEvent"
      }))
    }, t.traitEditor = {
      ...n,
      skills: s
    }, t.itemSheet = {
      ...t.itemSheet ?? {},
      sheetClass: "mwd-item-sheet--quality",
      summaryChips: [
        { label: "Category", value: gn(i.category) },
        { label: "Tier", value: yn(i.tier) },
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
_(Rr, "LAYOUT_ID", "quality"), _(Rr, "PARTS", {
  sheet: {
    template: `${Q}/v2/item/quality.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Ir extends Xt {
}
_(Ir, "LAYOUT_ID", "asset-module"), _(Ir, "PARTS", {
  sheet: {
    template: `${Q}/v2/item/assetModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Dr extends Xt {
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
    const e = Ua(this.item.system ?? {}), t = Mi(e.catalogId), n = ds(t, e.selectedGrants, { legacySelectedSkill: e.selectedSkill }).map((r) => r.choice).filter(Boolean).map((r) => Ha(r, { includeBonusText: !0 })).join(", "), s = this.item.actor ? Ni(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return [
      { label: "Slot", value: ya(e.moduleType) },
      { label: "Module", value: (t == null ? void 0 : t.label) ?? "Unlinked" },
      { label: "Bonuses", value: n || "Pending choice" },
      s ? { label: "Status", value: s.isActive ? "Active" : "Inactive" } : null
    ].filter(Boolean);
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), i = Ua(this.item.system ?? {}), n = i.moduleType, s = Mi(i.catalogId), r = n ? fo(n) : [], o = lu(s, i.selectedGrants, { legacySelectedSkill: i.selectedSkill }), l = this.item.actor ? Ni(this.item.actor).stateByItemId.get(this.item.id) ?? null : null;
    return t.lifeModuleEditor = {
      moduleType: n,
      moduleTypeLabel: ya(n),
      moduleTypes: au().map((c) => ({
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
        return ((u = Mi(c)) == null ? void 0 : u.label) ?? c;
      }),
      excludesAnyLabels: ((s == null ? void 0 : s.excludesAny) ?? []).map((c) => {
        var u;
        return ((u = Mi(c)) == null ? void 0 : u.label) ?? c;
      }),
      actorState: l,
      warningLabels: [...(l == null ? void 0 : l.warningLabels) ?? []],
      isOwned: !!this.item.actor,
      statusLabel: l ? l.isActive ? "Active" : "Inactive" : s ? "Configured" : "Unlinked",
      statusReason: (l == null ? void 0 : l.inactiveReason) ?? ""
    }, t;
  }
}
_(Dr, "LAYOUT_ID", "life-module"), _(Dr, "PARTS", {
  sheet: {
    template: `${Q}/v2/item/lifeModule.hbs`,
    scrollable: [".sheet-body"]
  }
});
class Or extends Xt {
}
_(Or, "LAYOUT_ID", "skill"), _(Or, "PARTS", {
  sheet: {
    template: `${Q}/v2/item/skill.hbs`,
    scrollable: [".sheet-body"]
  }
});
const cb = Object.freeze([
  "firearms",
  "projectileWeapons",
  "heavyWeapons",
  "meleeCombat"
]), ub = Object.freeze([
  { value: "energy", label: "Energy" },
  { value: "kinetic", label: "Kinetic" },
  { value: "ballistic", label: "Ballistic" },
  { value: "explosive", label: "Explosive" },
  { value: "plasma", label: "Plasma" },
  { value: "electrical", label: "Electrical" },
  { value: "melee", label: "Melee" },
  { value: "none", label: "None" }
]), Ll = Object.freeze([
  { value: "quantity", label: "Quantity" },
  { value: "durability.current", label: "Durability" },
  { value: "", label: "Custom Path" }
]), db = "consumable";
function mb(a) {
  return String((a == null ? void 0 : a.canonicalType) ?? (a == null ? void 0 : a.type) ?? "item").trim().replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (t) => t.toUpperCase());
}
function ad(a) {
  return String((a == null ? void 0 : a.canonicalType) ?? (a == null ? void 0 : a.type) ?? "").trim() === db;
}
function fb(a, e = "") {
  var i;
  const t = String(e ?? "").trim();
  return Array.from(((i = a == null ? void 0 : a.actor) == null ? void 0 : i.items) ?? []).filter((n) => {
    const s = String((n == null ? void 0 : n.id) ?? "").trim();
    return !s || s === (a == null ? void 0 : a.id) ? !1 : s === t || ad(n);
  }).sort((n, s) => String((n == null ? void 0 : n.name) ?? "").localeCompare(String((s == null ? void 0 : s.name) ?? ""))).map((n) => ({
    value: n.id,
    label: `${n.name || "Unnamed Item"} (${mb(n)})`
  }));
}
function _r(a, e, t) {
  const i = String(e ?? "").trim();
  return !i || a.some((n) => n.value === i) ? a : a.concat({ value: i, label: t(i) });
}
function pb(a, e) {
  var d, m, f, p, h, g, y;
  const t = Kt(e), i = fb(a, (d = t.link) == null ? void 0 : d.itemId), n = pm({
    source: t,
    actor: (a == null ? void 0 : a.actor) ?? null
  }), s = ((h = (f = (m = a == null ? void 0 : a.actor) == null ? void 0 : m.items) == null ? void 0 : f.get) == null ? void 0 : h.call(f, ((p = t.link) == null ? void 0 : p.itemId) ?? "")) ?? null, r = _r(
    [...Ll],
    (g = t.link) == null ? void 0 : g.itemPath,
    (b) => `Custom (${b})`
  ), o = new Set(Ll.map((b) => String(b.value ?? "").trim())), l = String(((y = t.link) == null ? void 0 : y.itemPath) ?? "").trim(), c = !!(a != null && a.actor);
  let u = "";
  return t.kind === "itemRef" && (c ? i.length ? s ? ad(s) ? l ? u = n.isTracked ? `Linked to ${s.name} | Available ${Number(n.current ?? 0)}` : `Linked to ${s.name} | Path not resolving to a tracked value yet.` : u = `Linked to ${s.name}. Pick which field should be consumed.` : u = `Linked to ${s.name} | Legacy non-consumable source. Repoint this to a Consumable item when convenient.` : u = "Pick an owned Consumable item to consume from." : u = "Add an owned Consumable item to the actor, then link this weapon to it." : u = "Embed this weapon in an actor to link it to owned inventory."), {
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
class ys extends Xt {
  /** @override */
  static get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      actions: {
        ...super.DEFAULT_OPTIONS.actions,
        weaponSkillChange: ys._onWeaponSkillChange
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
      defenses: Ne.getDefenses()
    };
    const n = Array.isArray((l = t.ENUMS) == null ? void 0 : l.skills) ? t.ENUMS.skills : [], s = (c = this.item.system) == null ? void 0 : c.skill, r = (u = this.item.system) == null ? void 0 : u.damageType, o = i === "personalWeapon" ? _r(
      n.filter((h) => cb.includes(h.value)),
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
      damageTypes: _r(
        i === "personalWeapon" ? [...Ln] : [...ub],
        r,
        (h) => i === "personalWeapon" ? Wt(h) : h
      ),
      ranges: vt.RANGE_ORDER.map((h) => ({
        value: h,
        label: i === "personalWeapon" ? Wn(h) : h.charAt(0).toUpperCase() + h.slice(1)
      })),
      rangeBandLabels: Object.fromEntries(vt.RANGE_ORDER.map((h) => [
        h,
        i === "personalWeapon" ? Wn(h) : h.charAt(0).toUpperCase() + h.slice(1)
      ])),
      weaponCapabilityOptions: Td,
      payloadCapabilityOptions: vd,
      ammoDamageTypes: [{ value: "", label: "Use Weapon Default" }, ...Ln],
      payloadTemplateShapes: Yl,
      payloadTemplatePlacements: Ql,
      areaEffectKinds: [
        { value: rt.discrete, label: "Discrete" },
        { value: rt.persistent, label: "Persistent Hazard" }
      ],
      exposureTiers: [
        { value: te.minor, label: "Minor" },
        { value: te.major, label: "Major" },
        { value: te.full, label: "Full" }
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
      consumptionSources: Array.isArray((f = this.item.system) == null ? void 0 : f.consumptionSources) ? this.item.system.consumptionSources.map((h) => pb(this.item, h)) : []
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
const ca = class ca extends ys {
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
        attackWeapon: ca._onAttackWeapon,
        reloadWeaponPayload: ca._onReloadWeaponPayload
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
      { label: "Type", value: Wt(e.damageType) || "Penetrating" },
      { label: "Range", value: String(((r = e.range) == null ? void 0 : r.max) ?? "near").trim() || "Near" }
    ];
    return String(e.category ?? "").trim().toLowerCase() !== "melee" && n.push((o = e == null ? void 0 : e.sourceState) != null && o.isTracked ? { label: "Payload", value: `${(e == null ? void 0 : e.payloadLabel) || "Unloaded"} (${Number(e.sourceState.current ?? 0)}/${Number(e.sourceState.max ?? 0)})` } : { label: "Payload", value: (e == null ? void 0 : e.payloadLabel) || "Unloaded" }), n;
  }
  static async _onAttackWeapon(e) {
    var i, n, s, r;
    (i = e == null ? void 0 : e.preventDefault) == null || i.call(e), (n = e == null ? void 0 : e.stopPropagation) == null || n.call(e), !(!(this.item.actor ?? null) || !((r = (s = this.item).isPersonalWeapon) != null && r.call(s))) && await hs({ weapon: this.item, event: e });
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
_(ca, "LAYOUT_ID", "personal-weapon"), _(ca, "PARTS", {
  sheet: {
    template: `${Q}/v2/item/personal-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
let xr = ca;
class Lr extends ys {
}
_(Lr, "LAYOUT_ID", "mech-weapon"), _(Lr, "PARTS", {
  sheet: {
    template: `${Q}/v2/item/mech-weapon-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
const hb = {
  penetrating: "Penetrating",
  concussive: "Concussive",
  energy: "Energy",
  thermal: "Thermal",
  electrical: "Electrical"
};
function $l(a) {
  const e = Number(a ?? 0) || 0;
  return e > 0 ? `+${e}` : `${e}`;
}
function gb({ defenseBonus: a = 0, mitigationByType: e = {} } = {}) {
  const t = [], i = Number(a ?? 0) || 0;
  i !== 0 && t.push(`Defense ${$l(i)}`);
  const n = Qt(e);
  for (const [s, r] of Object.entries(hb)) {
    const o = Number((n == null ? void 0 : n[s]) ?? 0) || 0;
    o !== 0 && t.push(`${r} ${$l(o)}`);
  }
  return t.join(" | ");
}
class $r extends Xt {
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
    var l, c, u, d, m, f, p, h, g, y, b, S, T, C, N, P;
    const t = await super._prepareContext(e), i = this.item, n = i.actor ?? null, s = ((l = n == null ? void 0 : n.getPersonalCombatLoadout) == null ? void 0 : l.call(n)) ?? null, r = ((c = s == null ? void 0 : s.activeArmor) == null ? void 0 : c.id) ?? null, o = ((u = s == null ? void 0 : s.activeArmor) == null ? void 0 : u.id) === i.id ? s.activeArmor : (d = i.getArmorProfile) == null ? void 0 : d.call(i, { actor: n });
    return t.armorState = o, t.isActiveArmor = r === i.id, t.effectiveDurabilityCurrent = Number(
      ((m = o == null ? void 0 : o.durability) == null ? void 0 : m.current) ?? ((p = (f = i.system) == null ? void 0 : f.durability) == null ? void 0 : p.current) ?? ((g = (h = i.system) == null ? void 0 : h.durability) == null ? void 0 : g.max) ?? ((y = i.system) == null ? void 0 : y.rating) ?? 0
    ), t.effectiveArmorRating = Number(
      (o == null ? void 0 : o.currentArmorRating) ?? (o == null ? void 0 : o.ratingCurrent) ?? Math.min(
        Number(((b = i.system) == null ? void 0 : b.rating) ?? 0),
        Number(((T = (S = i.system) == null ? void 0 : S.durability) == null ? void 0 : T.current) ?? ((N = (C = i.system) == null ? void 0 : C.durability) == null ? void 0 : N.max) ?? ((P = i.system) == null ? void 0 : P.rating) ?? 0)
      )
    ), t.effectiveArmorResist = Number(
      (o == null ? void 0 : o.baseMitigation) ?? (o == null ? void 0 : o.baseResistance) ?? 0
    ), t.armorModifierSummary = this._getArmorModifierSummary(o), t.itemSheet = { ...t.itemSheet ?? {} }, t.itemSheet.summaryChips = this._getSummaryChips(o), t.armorEditor = {
      standardTraits: [...tm]
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
    return gb({
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
_($r, "LAYOUT_ID", "armor"), _($r, "PARTS", {
  sheet: {
    template: `${Q}/v2/item/armor-root.hbs`,
    scrollable: [".sheet-body"]
  }
});
function yb() {
  console.log(`${Se}Registering Item sheets (V2)`);
  const { Items: a } = foundry.documents.collections;
  a.registerSheet(w, Pr, { types: ["contact"], makeDefault: !0, label: "Contact (V2)" }), a.registerSheet(w, Nr, { types: ["gear", "consumable"], makeDefault: !0, label: "Gear / Consumable (V2)" }), a.registerSheet(w, Rr, { types: ["quality"], makeDefault: !0, label: "Quality (V2)" }), a.registerSheet(w, Ir, { types: ["assetModule"], makeDefault: !0, label: "Asset Module (V2)" }), a.registerSheet(w, Dr, { types: ["lifeModule"], makeDefault: !0, label: "Life Module (V2)" }), a.registerSheet(w, Or, { types: ["skill"], makeDefault: !0, label: "Skill (V2)" }), a.registerSheet(w, xr, { types: ["personalWeapon", "weapon"], makeDefault: !0, label: "Personal Weapon (V2)" }), a.registerSheet(w, Lr, { types: ["mechWeapon"], makeDefault: !0, label: "Mech Weapon (V2)" }), a.registerSheet(w, $r, { types: ["armor"], makeDefault: !0, label: "Armor (V2)" });
}
const Bl = [
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
  `systems/${w}/templates/v2/actor/character-sheet.hbs`
];
function bb(a) {
  const e = String(a).replaceAll("\\", "/"), t = `systems/${w}/templates/`, i = e.indexOf(t);
  return `mwd.${(i >= 0 ? e.slice(i + t.length) : e).replace(/\.hbs$/i, "").split("/").filter(Boolean).map((o) => o.replace(/^_+/, "")).join(".")}`;
}
function Sb() {
  var a, e;
  return ((e = (a = foundry == null ? void 0 : foundry.applications) == null ? void 0 : a.handlebars) == null ? void 0 : e.Handlebars) ?? Handlebars;
}
async function Ab() {
  var e, t;
  const a = Sb();
  try {
    const i = {};
    for (const s of Bl)
      i[bb(s)] = s, i[s] = s;
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
    console.log(`${Se}preloadTemplatesV2 OK`, { loaded: Bl.length });
  } catch (i) {
    throw console.error(`${Se}preloadTemplatesV2 FAILED`, i), i;
  }
}
function zl(a) {
  const e = Math.max(0, Number(a) || 0);
  return -Math.floor(e / 3);
}
function wb(a) {
  const e = Math.max(0, Number(a) || 0);
  return e === 0 ? 0 : Math.ceil(e / 4);
}
function Tb(a = {}) {
  const e = a.physical ?? {}, t = a.fatigue ?? {}, i = a.armor ?? {}, n = Number(e.value) || 0, s = Number(t.value) || 0, r = Math.max(Number(i.value) || 0, Number(i.max) || 0);
  return {
    physical: { penalty: zl(n) },
    fatigue: { penalty: zl(s) },
    armor: { resistance: wb(r) }
  };
}
const Fs = {
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
function vb(a, e, t, i) {
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
function kb(a = {}) {
  return Object.entries(Qt(a)).filter(([, e]) => Number(e) > 0).map(([e, t]) => `${e} +${t}`).join(", ");
}
class Eb extends Actor {
  /** @override */
  async _preCreate(e, t, i) {
    super._preCreate && await super._preCreate(e, t, i);
    const n = await du("Actor", (e == null ? void 0 : e.type) ?? this.type), s = {};
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
      if (Lm(i), i.speed = Math.max(0, Math.trunc(Number(i.speed ?? 12) || 12)), (e = i.skills) != null && e.skills && typeof i.skills.skills == "object") {
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
    const e = this.getEdgeCap(), t = this.type === "character" ? Ni(this).bonusByEdgePool ?? {} : {};
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
    r.length === 1 ? (c = r[0], l = c) : r.length > 1 ? (e.push("Multiple equipped primary weapons found; attack selection requires a chooser."), u = !0) : n.length === 1 ? l = n[0] : n.length > 1 ? u = !0 : l = vt.buildDefaultUnarmedProfile(this);
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
    ), n = Math.max(0, Number((e == null ? void 0 : e.rating) ?? 0)), s = Math.min(n, i), r = Qt(e == null ? void 0 : e.mitigationByType), o = Yr(s);
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
    const n = this.getEdgePoolRaw(e), s = Math.max(0, Number((n == null ? void 0 : n.rating) ?? 0)), r = Math.max(0, Number((n == null ? void 0 : n.value) ?? 0)), o = Math.max(0, Number(((p = Ni(this).bonusByEdgePool) == null ? void 0 : p[e]) ?? 0)), l = s + o, c = Math.min(l, t), u = Math.min(r, c);
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
    const i = this.getEdgeCap(), n = Math.max(0, Number(t ?? 0)), s = Math.max(0, Number(((c = Ni(this).bonusByEdgePool) == null ? void 0 : c[e]) ?? 0)), r = Math.min(n + s, i), o = Math.max(0, Number(((u = this.getEdgePoolRaw(e)) == null ? void 0 : u.value) ?? 0)), l = Math.min(o, r);
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
      }, c = wt({
        actor: this,
        phase: "onEdgeSpend",
        facts: sr({ actor: this, packet: l, phase: "onEdgeSpend", runtime: o }),
        packet: l,
        options: { runtime: o, consumeUsage: !0 }
      });
      await ci({ actor: this, mutations: c.mutations, runtime: o }), s = Math.max(0, Number(c.packet.amount ?? n) || 0);
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
      }, l = wt({
        actor: this,
        phase: "onEdgeGain",
        facts: sr({ actor: this, packet: o, phase: "onEdgeGain", runtime: r }),
        packet: o,
        options: { runtime: r, consumeUsage: !0 }
      });
      await ci({ actor: this, mutations: l.mutations, runtime: r }), s = Number(l.packet.amount ?? n) || 0;
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
      const T = Math.max(0, Number(((f = S.system) == null ? void 0 : f.rating) ?? 0) || 0), C = Math.max(0, Number(((h = (p = S.system) == null ? void 0 : p.durability) == null ? void 0 : h.max) ?? 0) || 0), N = C > 0 ? C : T, P = Math.min(Math.max(0, Number(t) || 0), N);
      return this.updateEmbeddedDocuments("Item", [{
        _id: S.id,
        "system.durability.max": N,
        "system.durability.current": P
      }]);
    }
    const n = `system.monitors.${e}`, s = Number(foundry.utils.getProperty(this, `${n}.max`)) || 0, r = Math.max(0, s), o = Math.min(Math.max(0, Number(t) || 0), r), l = { [`${n}.value`]: o }, c = this.type, u = (g = Ss == null ? void 0 : Ss[c]) == null ? void 0 : g[e];
    if (u != null && u.derived)
      for (const [y, b] of Object.entries(u.derived)) {
        const S = Fs == null ? void 0 : Fs[b.fn];
        if (typeof S != "function") continue;
        const T = vb(this, e, b.source, o);
        l[`${n}.derived.${y}`] = S(T);
      }
    return this.update(l);
  }
  _prepareMonitors() {
    var o, l, c, u, d, m, f, p;
    const e = this.system.monitors ?? {}, t = Tb(e);
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
    }, t.resistanceBonusByType = i != null && i.isDestroyed ? {} : (i == null ? void 0 : i.mitigationByType) ?? (i == null ? void 0 : i.typedMitigation) ?? {}, t.derived ?? (t.derived = {}), t.derived.resistance = Number((i == null ? void 0 : i.baseMitigation) ?? (i == null ? void 0 : i.baseResistance) ?? 0), t.effect = i != null && i.isDestroyed ? "Destroyed" : i ? kb(i.mitigationByType ?? i.typedMitigation) : "", (u = this.system).derived ?? (u.derived = {}), this.system.derived.personalCombat = {
      defaultWeaponId: ((d = e.defaultWeapon) == null ? void 0 : d.id) ?? null,
      activeArmorId: (i == null ? void 0 : i.id) ?? null,
      warnings: [...e.warnings ?? []]
    };
  }
}
async function Mb({ actor: a, payload: e } = {}) {
  var g, y, b, S, T, C;
  if (!a) throw new Error("resolveSkill requires actor");
  const t = String((e == null ? void 0 : e.key) ?? "").trim(), i = Et(t);
  if (!i) throw new Error(`Unknown skill: ${t}`);
  const n = a.system ?? {}, s = String((e == null ? void 0 : e.attrKey) ?? i.attribute ?? "").trim();
  if (!s) throw new Error(`Skill ${t} missing attribute key`);
  const r = Number(((y = (g = n == null ? void 0 : n.attributes) == null ? void 0 : g[s]) == null ? void 0 : y.value) ?? 0), o = Number(((S = (b = n == null ? void 0 : n.skills) == null ? void 0 : b[t]) == null ? void 0 : S.rating) ?? 0), l = Number(((C = (T = n == null ? void 0 : n.skills) == null ? void 0 : T[t]) == null ? void 0 : C.bonus) ?? 0), c = new Set(as(n, t)), u = Zr(t, e == null ? void 0 : e.specializationKey), d = u && c.has(u.key) ? u : null, m = d ? Qr : 0, f = Array.isArray(e == null ? void 0 : e.domains) ? e.domains : i.domains ?? [], p = Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : Number.isFinite(Number(e == null ? void 0 : e.target)) ? Number(e.target) : 5, h = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : 1;
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
const Cb = /* @__PURE__ */ new Set([
  "grit",
  "chaos",
  "insight",
  "rumor",
  "legend",
  "credibility"
]), Pb = {
  grit: "physical",
  chaos: "physical",
  insight: "mental",
  rumor: "mental",
  legend: "social",
  credibility: "social"
};
async function Nb({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveEdge requires actor");
  const t = String((e == null ? void 0 : e.pool) ?? "").trim();
  if (!Cb.has(t)) throw new Error(`Invalid edge pool: ${t}`);
  const i = a.getEdgePool(t), n = Math.max(0, Number((i == null ? void 0 : i.effectiveValue) ?? 0));
  return {
    intent: "edge",
    title: `Edge — ${t}`,
    subtitle: a.name ?? "Actor",
    domains: [Pb[t] ?? "unknown"],
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
async function Rb({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Attribute",
    intent: "attribute",
    domainTags: ["general"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function Ib({ actor: a, payload: e } = {}) {
  if (!a) throw new Error("resolveCommon requires actor");
  const t = String((e == null ? void 0 : e.id) ?? "").trim();
  if (!t) throw new Error("Common rolls require payload.id");
  const i = to(t);
  if (!i) throw new Error(`Unknown common check: ${t}`);
  const n = Array.isArray(i.formula) ? i.formula : [];
  if (n.length !== 2)
    throw new Error(`Common check ${t} must define exactly two attributes.`);
  const s = n.map((c) => {
    var d, m, f;
    const u = Vm(c);
    if (!u) throw new Error(`Common check ${t} uses unsupported attribute code: ${c}`);
    return {
      code: String(c).trim().toUpperCase(),
      key: u,
      label: Ym(c),
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
    formula: Qm(n),
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
function Db(a = {}) {
  var e;
  return Array.isArray(a == null ? void 0 : a.targetSnapshots) ? a.targetSnapshots : Array.from(((e = game.user) == null ? void 0 : e.targets) ?? []).map(_u).filter(Boolean);
}
function Ob(a, e = {}) {
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
function _b(a = {}) {
  var t, i, n, s, r;
  const e = String((a == null ? void 0 : a.tokenId) ?? "").trim();
  return e ? ((i = (t = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : t.get) == null ? void 0 : i.call(t, e)) ?? ((r = (s = (n = canvas == null ? void 0 : canvas.tokens) == null ? void 0 : n.placeables) == null ? void 0 : s.find) == null ? void 0 : r.call(s, (o) => (o == null ? void 0 : o.id) === e)) ?? null : null;
}
function xb(a, e) {
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
function Lb({ actor: a, payload: e, weapon: t, targets: i = [] } = {}) {
  const n = String((e == null ? void 0 : e.rangeBand) ?? "").trim().toLowerCase();
  if (!(((t == null ? void 0 : t.type) === "personalWeapon" || (t == null ? void 0 : t.isSynthetic)) && i.length === 1))
    return n || String((t == null ? void 0 : t.defaultRangeBand) ?? "close").trim() || "close";
  const r = Ob(a, e), o = _b(i[0]), l = xb(r, o), c = Uf(l, (t == null ? void 0 : t.range) ?? {}, (t == null ? void 0 : t.defaultRangeBand) ?? "close");
  return c === "outOfRange" ? c : n || ((t == null ? void 0 : t.type) !== "personalWeapon" && !(t != null && t.isSynthetic) || i.length !== 1 ? String((t == null ? void 0 : t.defaultRangeBand) ?? "close").trim() || "close" : c);
}
function $b(a, e) {
  var i, n, s, r, o, l, c;
  if (((i = e == null ? void 0 : e.syntheticWeapon) == null ? void 0 : i.id) === "unarmed") {
    const u = vt.buildDefaultUnarmedProfile(a);
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
async function Bb({ actor: a, payload: e } = {}) {
  var N, P, F, K, Y, W, j, x, L, G, X, oe, ge, de, M, V, ne, ie;
  if (!a) throw new Error("resolveAttack requires actor");
  const t = $b(a, e);
  if (!t) throw new Error("Unable to resolve weapon profile.");
  if (Array.isArray((N = t == null ? void 0 : t.capabilityReport) == null ? void 0 : N.errors) && t.capabilityReport.errors.length > 0)
    throw Bi(
      ((P = t.capabilityReport.errors[0]) == null ? void 0 : P.message) ?? "Weapon capability data is invalid for this attack.",
      { severity: "warn" }
    );
  const i = Et(t.skill) ?? {
    code: t.skill,
    label: t.skill || "Attack",
    attribute: "reflexes",
    domains: ["physical"]
  }, n = String(i.attribute ?? "reflexes").trim() || "reflexes", s = ((F = a.getAttributeValue) == null ? void 0 : F.call(a, n)) ?? Number(((W = (Y = (K = a.system) == null ? void 0 : K.attributes) == null ? void 0 : Y[n]) == null ? void 0 : W.value) ?? 0), r = ((j = a.getSkillRating) == null ? void 0 : j.call(a, t.skill)) ?? Number(((G = (L = (x = a.system) == null ? void 0 : x.skills) == null ? void 0 : L[t.skill]) == null ? void 0 : G.rating) ?? 0), o = Number(((ge = (oe = (X = a.system) == null ? void 0 : X.skills) == null ? void 0 : oe[t.skill]) == null ? void 0 : ge.bonus) ?? 0), l = new Set(as(a.system ?? {}, t.skill)), c = Zr(t.skill, e == null ? void 0 : e.specializationKey), u = c && l.has(c.key) ? c : null, d = u ? Qr : 0, m = Number(((de = t == null ? void 0 : t.effects) == null ? void 0 : de.accuracyMod) ?? 0) || 0, f = o + m, p = Db(e), h = Lb({ actor: a, payload: e, weapon: t, targets: p }), g = (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? rs(h) : h, y = Number(((M = t == null ? void 0 : t.attackRatingBand) == null ? void 0 : M[h]) ?? 0) || 0, b = !!((V = t == null ? void 0 : t.capabilityReport) != null && V.isTemplated), S = (ne = e == null ? void 0 : e.aim) != null && ne.active ? {
    active: !0,
    eligible: !b && p.length === 1,
    ineligibleReason: b ? "Aim cannot apply to template attacks." : p.length !== 1 ? "Aim cannot apply to multi-target attacks." : "",
    skillCode: t.skill,
    skillLabel: i.label ?? t.skill ?? "Attack Skill"
  } : null;
  if (!b && p.length === 0)
    throw Bi("Target at least one token to attack.", { severity: "warn" });
  const T = Number(t.ap ?? 0) + Number(((ie = t == null ? void 0 : t.effects) == null ? void 0 : ie.ap) ?? 0), C = Number.isFinite(Number(e == null ? void 0 : e.dn)) ? Number(e.dn) : (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? Hf(h, 1) : 1;
  return {
    intent: "attack",
    rollType: "simple",
    title: `${t.name} Attack`,
    subtitle: a.name ?? "Actor",
    domains: Array.isArray(i.domains) && i.domains.length ? i.domains : ["physical"],
    domainTags: ["combat", "attack"],
    diceTarget: Number.isFinite(Number(e == null ? void 0 : e.diceTarget)) ? Number(e.diceTarget) : 5,
    difficulty: { dn: C },
    dn: {
      parts: [{
        id: "difficulty.current",
        label: (t == null ? void 0 : t.type) === "personalWeapon" || t != null && t.isSynthetic ? `Base DN (${g})` : "DN",
        value: C,
        tags: ["manual"]
      }],
      total: C
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
async function zb({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Defense",
    intent: "defense",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function Fb({ actor: a, payload: e, event: t } = {}) {
  return {
    title: "Resistance",
    intent: "resistance",
    domainTags: ["combat"],
    pool: { attribute: 0, skill: 0, bonus: 0 },
    breakdown: [],
    mods: []
  };
}
async function Hb({ actor: a } = {}) {
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
async function Ub({ actor: a }) {
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
const Wb = {
  skill: Mb,
  edge: Nb,
  attribute: Rb,
  common: Ib,
  attack: Bb,
  defense: zb,
  resistance: Fb,
  initiative: Hb,
  overload: Ub
};
async function Hs({ actor: a, payload: e, event: t } = {}) {
  if (!a) throw new Error("resolveIntent requires actor");
  const i = String((e == null ? void 0 : e.intent) ?? "").trim();
  if (!i) throw new Error("resolveIntent requires payload.intent");
  const n = Wb[i];
  if (!n) throw new Error(`Unsupported roll intent: ${i}`);
  const s = await n({ actor: a, payload: e, event: t });
  return jb(s, { intent: i });
}
function jb(a, { intent: e } = {}) {
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
var fa;
class Gb {
  constructor() {
    Te(this, fa, /* @__PURE__ */ new Map());
  }
  register(e) {
    if (!(e != null && e.id) || typeof e.collect != "function")
      throw new Error("Invalid ModifierProvider: missing id or collect()");
    H(this, fa).has(e.id) || H(this, fa).set(e.id, e);
  }
  async collectAll(e) {
    const t = [];
    for (const i of H(this, fa).values()) {
      const n = await i.collect(e);
      if (console.log("MWD | provider", i.id, "returned", n), !!(n != null && n.length))
        for (const s of n)
          s && typeof s.label == "string" && typeof s.value == "number" && typeof s.source == "string" ? t.push(s) : console.warn("MWD | DROPPED MOD (bad shape)", i.id, s);
    }
    return t;
  }
}
fa = new WeakMap();
const ii = new Gb();
function qb(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function Kb(a) {
  const e = qb(a == null ? void 0 : a.value);
  return e === null ? null : { ...a, value: e };
}
async function Fl({
  actor: a,
  rollType: e,
  skillId: t,
  domains: i,
  // NEW (optional)
  payload: n,
  resolved: s,
  context: r
} = {}) {
  const o = { actor: a, rollType: e, skillId: t, domains: i, payload: n, resolved: s, context: r }, l = await ii.collectAll(o);
  console.log("MWD|condition collect called", o.rollType);
  let c = [];
  for (const d of l ?? []) {
    const m = Kb(d);
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
function Vb({
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
  var K, Y, W, j;
  if (!a) throw new Error("buildResolved requires actor");
  if (!(e != null && e.intent)) throw new Error("buildResolved requires payload.intent");
  if (!i) throw new Error("buildResolved requires roll");
  const m = foundry.utils.randomID(), f = (K = i.dice) == null ? void 0 : K[0], h = (Array.isArray(f == null ? void 0 : f.results) ? f.results : []).map((x, L) => {
    const G = `pool:${L}`, X = Number(x.result), oe = !!x.success;
    return {
      ref: G,
      face: X,
      isSuccess: oe,
      isFailure: !oe,
      tooltip: oe ? `Die ${L + 1}: ${X} (Success vs TN ${Number(n ?? 5)})` : `Die ${L + 1}: ${X} (Failure vs TN ${Number(n ?? 5)})`
    };
  }), g = h.filter((x) => x.isFailure).map((x) => x.ref), y = [{
    id: "pool",
    label: "Pool",
    faces: 6,
    termIndex: 0,
    // informational only
    dice: h
  }], b = (Array.isArray(r) ? r : []).map((x, L) => {
    const G = Number(x.value ?? 0), X = `mod:${Qb(x.label ?? "mod")}:${L}`;
    return {
      id: x.id ?? X,
      label: x.label ?? "Modifier",
      value: G,
      domain: x.domain ?? null,
      source: x.source ?? null,
      tooltip: x.tooltip ?? `${x.label ?? "Modifier"} ${Hl(G)}`
    };
  }), S = b.map((x) => x.id), C = (Array.isArray(t == null ? void 0 : t.breakdown) ? t.breakdown : []).map((x) => ({
    id: `pool.${x.id ?? foundry.utils.randomID()}`,
    label: x.label ?? x.id ?? "Row",
    value: Number(x.value ?? 0),
    tooltip: `Contribution from ${x.label ?? x.id}: ${Number(x.value ?? 0)}`
  }));
  C.push({
    id: "mods.total",
    label: "Mods",
    value: Number(o ?? 0),
    modIds: S,
    tooltip: b.length ? b.map((x) => `${x.label}: ${Hl(x.value)}`).join(`
`) : "No roll-time modifiers."
  }), C.push({
    id: "pool.final",
    label: "Final Pool",
    value: Number(s ?? 0),
    tooltip: `Final dice pool rolled: ${Number(s ?? 0)}d6`
  });
  const N = Number.isFinite(Number(l)) ? Number(l) : h.filter((x) => x.isSuccess).length, P = Number.isFinite(Number(c)) ? Number(c) : h.filter((x) => x.face === 1).length, F = Yb(u, { payload: e });
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
    breakdownRows: C,
    modifiers: {
      applied: b,
      total: Number(o ?? 0)
    },
    areaEffectPreviewState: foundry.utils.deepClone((e == null ? void 0 : e.areaEffectPreviewState) ?? {}),
    // Edge snapshot / affordances
    edge: F
  };
}
function Yb(a, { payload: e } = {}) {
  var p, h, g, y, b, S, T, C, N, P, F, K, Y, W;
  const t = !!((p = e == null ? void 0 : e.edge) != null && p.enabled), i = (a == null ? void 0 : a.domain) ?? null, n = (a == null ? void 0 : a.pools) ?? null, s = ((h = a == null ? void 0 : a.pre) == null ? void 0 : h.poolKey) ?? ((y = (g = e == null ? void 0 : e.edge) == null ? void 0 : g.pre) == null ? void 0 : y.poolKey) ?? (t ? ((b = e == null ? void 0 : e.edge) == null ? void 0 : b.poolKey) ?? null : null), r = Number(((S = a == null ? void 0 : a.pre) == null ? void 0 : S.spent) ?? ((C = (T = e == null ? void 0 : e.edge) == null ? void 0 : T.pre) == null ? void 0 : C.spent) ?? (t ? 1 : 0)) ? 1 : 0, o = ((N = a == null ? void 0 : a.post) == null ? void 0 : N.poolKey) ?? ((F = (P = e == null ? void 0 : e.edge) == null ? void 0 : P.post) == null ? void 0 : F.poolKey) ?? null, l = Number(((K = a == null ? void 0 : a.post) == null ? void 0 : K.spent) ?? ((W = (Y = e == null ? void 0 : e.edge) == null ? void 0 : Y.post) == null ? void 0 : W.spent) ?? 0) ? 1 : 0, c = (n == null ? void 0 : n.a) ?? null, u = (n == null ? void 0 : n.b) ?? null, d = [c, u].filter(Boolean);
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
function Hl(a) {
  const e = Number(a ?? 0);
  return e >= 0 ? `+${e}` : `${e}`;
}
function Qb(a) {
  return String(a).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
const { ApplicationV2: Jb, HandlebarsApplicationMixin: Xb } = foundry.applications.api;
function Zb(a, e = -3, t = 3) {
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
function Ul(a) {
  return (Array.isArray(a) ? a : []).map((t) => ({
    id: (t == null ? void 0 : t.id) ?? foundry.utils.randomID(),
    label: typeof (t == null ? void 0 : t.label) == "string" ? t.label : "Manual",
    value: Number((t == null ? void 0 : t.value) ?? 0)
  }));
}
function Us(a, e) {
  const t = a == null ? void 0 : a.toggles;
  return t && typeof t == "object" && e in t ? !!t[e] : !!(a != null && a[e]);
}
function eS(a, e) {
  a.useEdge = !!e.useEdge, a.takeRisks = !!e.takeRisks, a.opponentRoll = !!e.opponentRoll, a.toggles = a.toggles && typeof a.toggles == "object" ? a.toggles : {}, a.toggles.useEdge = !!e.useEdge, a.toggles.takeRisks = !!e.takeRisks, a.toggles.opponentRoll = !!e.opponentRoll;
}
function Wl(a, e, t) {
  const i = String(t ?? "").trim(), n = i ? Om(e, i) : "";
  if (i && n) {
    a.specializationKey = i, a.specializationLabel = n;
    return;
  }
  delete a.specializationKey, delete a.specializationLabel;
}
function tS(a) {
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
var mt;
const $e = class $e extends Xb(Jb) {
  constructor({ actor: t, baseContext: i, initialState: n = null, options: s = {} }) {
    var c, u;
    super(s);
    Te(this, mt, null);
    /** @type {{ baseContext: any, state: any }} */
    _(this, "_mwd", { baseContext: null, state: null });
    this.actor = t, this._mwd.baseContext = i ?? {};
    const r = foundry.utils.deepClone(this._mwd.baseContext.payload ?? {}), o = Ul(r.manualModifiers);
    this._mwd.state = foundry.utils.mergeObject(
      {
        payload: r,
        manual: o,
        toggles: {
          useEdge: Us(r, "useEdge"),
          takeRisks: Us(r, "takeRisks"),
          opponentRoll: Us(r, "opponentRoll")
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
      Ie(this, mt, t), this.render(!0);
    });
  }
  async close(t = {}) {
    if (H(this, mt)) {
      const i = H(this, mt);
      Ie(this, mt, null), i(null);
    }
    return super.close(t);
  }
  /* --------------------------- */
  /* Prepare Context             */
  /* --------------------------- */
  async _prepareContext(t) {
    var K, Y, W, j, x, L, G, X, oe, ge, de, M, V, ne, ie, Me, Ge, ht, gt, ot, yt, We, lt, Mt, Ct, Pt, Nt, Rt, It, ct, Dt, E, I, Z, Ae, ke, Re, je, Qe, ut, jt;
    const i = this._mwd.baseContext ?? {}, n = this._mwd.state ?? {}, s = Number.isFinite(Number((K = n == null ? void 0 : n.payload) == null ? void 0 : K.dn)) ? Number(n.payload.dn) : Number.isFinite(Number((W = (Y = i == null ? void 0 : i.resolved) == null ? void 0 : Y.dn) == null ? void 0 : W.total)) ? Number(i.resolved.dn.total) : Number.isFinite(Number(i == null ? void 0 : i.dn)) ? Number(i.dn) : Number.isFinite(Number((x = (j = i == null ? void 0 : i.resolved) == null ? void 0 : j.difficulty) == null ? void 0 : x.dn)) ? Number(i.resolved.difficulty.dn) : 1, r = (i == null ? void 0 : i.intent) ?? "skill";
    let o, l;
    const c = Array.isArray(n.manual) ? n.manual.reduce((ee, we) => ee + Number((we == null ? void 0 : we.value) || 0), 0) : 0;
    if (r === "edge") {
      const ee = (i == null ? void 0 : i.resolved) ?? {}, we = Array.isArray(ee.breakdown) ? ee.breakdown : [], et = (dt) => {
        var U;
        return Number(((U = we.find((fe) => fe.id === dt)) == null ? void 0 : U.value) ?? 0);
      }, tt = Number(((L = ee == null ? void 0 : ee.pool) == null ? void 0 : L.attribute) ?? 0);
      o = {
        pool: tt,
        rating: et("rating"),
        cap: et("cap"),
        modifiers: Number(((G = i == null ? void 0 : i.dice) == null ? void 0 : G.modifiers) ?? 0)
      }, l = Math.max(0, tt + o.modifiers + c);
    } else {
      o = {
        attribute: Number(((X = i == null ? void 0 : i.dice) == null ? void 0 : X.attribute) ?? 0),
        skill: Number(((oe = i == null ? void 0 : i.dice) == null ? void 0 : oe.skill) ?? 0),
        bonus: Number(((ge = i == null ? void 0 : i.dice) == null ? void 0 : ge.bonus) ?? 0),
        specialization: Number(((de = i == null ? void 0 : i.dice) == null ? void 0 : de.specialization) ?? 0),
        modifiers: Number(((M = i == null ? void 0 : i.dice) == null ? void 0 : M.modifiers) ?? 0)
      };
      const ee = o.modifiers + c, we = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, we + ee);
    }
    const u = Array.isArray((V = i == null ? void 0 : i.resolved) == null ? void 0 : V.domains) ? i.resolved.domains : [], d = u.includes("physical") ? "physical" : u.includes("mental") ? "mental" : u.includes("social") ? "social" : null, f = (d === "physical" ? ["grit", "chaos"] : d === "mental" ? ["insight", "rumor"] : d === "social" ? ["legend", "credibility"] : []).map((ee) => {
      var we, et, tt, dt;
      return {
        key: ee,
        label: ee.charAt(0).toUpperCase() + ee.slice(1),
        available: Number(((tt = (et = (we = this.actor) == null ? void 0 : we.getEdgePool) == null ? void 0 : et.call(we, ee)) == null ? void 0 : tt.effectiveValue) ?? 0),
        selected: ee === (((dt = n.edge) == null ? void 0 : dt.prePoolKey) ?? null)
      };
    }), p = f.find((ee) => ee.selected), h = (p == null ? void 0 : p.label) ?? null, g = ((ne = i == null ? void 0 : i.resolved) == null ? void 0 : ne.attack) ?? null, y = String(
      ((ie = g == null ? void 0 : g.skill) == null ? void 0 : ie.code) ?? ((Ge = (Me = i == null ? void 0 : i.resolved) == null ? void 0 : Me.specialization) == null ? void 0 : Ge.skillKey) ?? ((gt = (ht = i == null ? void 0 : i.resolved) == null ? void 0 : ht.data) == null ? void 0 : gt.skillKey) ?? ((ot = i == null ? void 0 : i.payload) == null ? void 0 : ot.key) ?? ""
    ).trim(), b = y ? Pc(((yt = this.actor) == null ? void 0 : yt.system) ?? {}, y) : [], S = String(((We = n == null ? void 0 : n.payload) == null ? void 0 : We.specializationKey) ?? "").trim(), T = b.find((ee) => ee.key === S) ?? null;
    if (r !== "edge") {
      o.specialization = T ? Number(((Mt = (lt = i == null ? void 0 : i.resolved) == null ? void 0 : lt.specialization) == null ? void 0 : Mt.value) ?? 2) : 0;
      const ee = o.modifiers + c, we = o.attribute + o.skill + o.bonus + o.specialization;
      l = Math.max(0, we + ee);
    }
    const C = Array.isArray((Ct = g == null ? void 0 : g.payloadState) == null ? void 0 : Ct.payloads) ? g.payloadState.payloads : [], N = String(((Pt = g == null ? void 0 : g.weapon) == null ? void 0 : Pt.category) ?? "").trim().toLowerCase() !== "melee" && C.length > 0, P = String(((Nt = n == null ? void 0 : n.payload) == null ? void 0 : Nt.payloadId) ?? ((Rt = g == null ? void 0 : g.payloadState) == null ? void 0 : Rt.activePayloadId) ?? "").trim(), F = C.find((ee) => ee.id === P) ?? null;
    return {
      header: {
        left: ((It = i == null ? void 0 : i.header) == null ? void 0 : It.left) ?? "Roll",
        right: ((ct = i == null ? void 0 : i.header) == null ? void 0 : ct.right) ?? ((Dt = this.actor) == null ? void 0 : Dt.name) ?? ""
      },
      formula: String((i == null ? void 0 : i.formula) ?? ((E = i == null ? void 0 : i.resolved) == null ? void 0 : E.formula) ?? "").trim(),
      dice: o,
      modifiers: Array.isArray(i.modifiers) ? i.modifiers : [],
      manual: (n.manual ?? []).map((ee) => ({
        ...ee,
        steps: Zb(Number(ee.value ?? 0), -3, 3)
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
        options: b.map((ee) => ({
          key: ee.key,
          label: ee.label,
          selected: ee.key === S
        })),
        selectedKey: S,
        selectedLabel: (T == null ? void 0 : T.label) ?? ""
      } : null,
      attack: g ? {
        weaponName: ((I = g == null ? void 0 : g.weapon) == null ? void 0 : I.name) ?? "Weapon",
        rangeBand: ((Z = g == null ? void 0 : g.weapon) == null ? void 0 : Z.type) === "personalWeapon" || (Ae = g == null ? void 0 : g.weapon) != null && Ae.isSynthetic ? rs((g == null ? void 0 : g.rangeBand) ?? "") : (g == null ? void 0 : g.rangeBand) ?? "",
        damageType: ((ke = F == null ? void 0 : F.modifies) == null ? void 0 : ke.damageType) || ((Re = g == null ? void 0 : g.weapon) == null ? void 0 : Re.damageTypeLabel) || ((je = g == null ? void 0 : g.weapon) == null ? void 0 : je.damageType) || "",
        usesPayloads: N,
        source: (g == null ? void 0 : g.sourceState) ?? null,
        payloads: C.map((ee) => {
          var we;
          return {
            id: ee.id,
            name: ee.label,
            damageType: (we = ee.modifies) == null ? void 0 : we.damageType,
            selected: ee.id === P
          };
        }),
        selectedPayloadId: P,
        selectedPayloadLabel: (F == null ? void 0 : F.label) ?? ((Qe = g == null ? void 0 : g.payload) == null ? void 0 : Qe.label) ?? ((ut = g == null ? void 0 : g.weapon) == null ? void 0 : ut.payloadLabel) ?? "",
        selectedSourceLabel: ((jt = g == null ? void 0 : g.sourceState) == null ? void 0 : jt.label) ?? ""
      } : null
    };
  }
  /* --------------------------- */
  /* Actions                     */
  /* --------------------------- */
  async _onCancel(t) {
    if (t == null || t.preventDefault(), H(this, mt)) {
      const i = H(this, mt);
      Ie(this, mt, null), i(null);
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
    }), eS(i.payload, i.toggles ?? {}), Wl(
      i.payload,
      ((n = i.payload) == null ? void 0 : n.intent) === "attack" ? ((s = i.payload) == null ? void 0 : s.skillKey) ?? ((c = (l = (o = (r = this._mwd.baseContext) == null ? void 0 : r.resolved) == null ? void 0 : o.attack) == null ? void 0 : l.skill) == null ? void 0 : c.code) : ((u = i.payload) == null ? void 0 : u.key) ?? ((f = (m = (d = this._mwd.baseContext) == null ? void 0 : d.resolved) == null ? void 0 : m.data) == null ? void 0 : f.skillKey),
      (p = i.payload) == null ? void 0 : p.specializationKey
    ), H(this, mt)) {
      const y = H(this, mt);
      Ie(this, mt, null), y({ payload: i.payload });
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
      return Wl(this._mwd.state.payload, n, s), this.render(!1);
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
    }, u = s ?? tS(n), d = {
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
    l.manualModifiers = Ul(l.manualModifiers);
    const p = await new $e({
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
mt = new WeakMap(), _($e, "DEFAULT_OPTIONS", foundry.utils.mergeObject(
  Qi($e, $e, "DEFAULT_OPTIONS"),
  {
    id: "mwd-roll-dialog",
    classes: [
      ...Qi($e, $e, "DEFAULT_OPTIONS").classes ?? [],
      "mwd",
      "mwd-roll-dialog"
    ],
    window: { title: "Roll", resizable: !1 },
    position: { width: 520, height: "auto" },
    actions: {
      submit: $e.prototype._onSubmit,
      cancel: $e.prototype._onCancel,
      addManual: $e.prototype._onAddManual,
      removeManual: $e.prototype._onRemoveManual,
      setManualValue: $e.prototype._onSetManualValue,
      setManualStepper: $e.prototype._onSetManualStepper,
      setEdgePrePool: $e.prototype._onSetEdgePrePool,
      toggleCheckbox: $e.prototype._onToggleCheckbox,
      setDn: $e.prototype._onSetDn,
      setPayload: $e.prototype._onSetPayload,
      setSpecialization: $e.prototype._onSetSpecialization
    }
  },
  { inplace: !1 }
)), _($e, "PARTS", {
  body: { template: "systems/mwd/templates/v2/roll/mwd-roll-dialog.hbs" }
});
let Br = $e;
const { ApplicationV2: iS, HandlebarsApplicationMixin: aS } = foundry.applications.api, $a = class $a extends aS(iS) {
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
      classes: [game.system.anarchy.styles.selectCssClass(), ...$a.DEFAULT_OPTIONS.classes],
      window: { title: e }
    };
    return new $a({ items: t }, i).wait();
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
_($a, "PARTS", {
  body: {
    template: `${Q}/dialog/select-item.hbs`
  }
});
let zr = $a;
const jl = { execute: cS }, nS = {
  physical: ["grit", "chaos"],
  mental: ["insight", "rumor"],
  social: ["legend", "credibility"]
};
function sS(a, e) {
  var s;
  const t = nS[e] ?? [];
  let i = null, n = -1;
  for (const r of t) {
    const o = (s = a.getEdgePool) == null ? void 0 : s.call(a, r), l = Number((o == null ? void 0 : o.rating) ?? 0), c = Number((o == null ? void 0 : o.value) ?? 0), u = Math.max(0, l - c);
    u > n && (n = u, i = r);
  }
  return i ?? t[0] ?? null;
}
function rS(a) {
  const t = (Array.isArray(a == null ? void 0 : a.manualModifiers) ? a.manualModifiers : []).map((n) => ({
    id: n.id ?? foundry.utils.randomID(),
    label: (n.label ?? "Manual").trim() || "Manual",
    value: Number(n.value ?? 0),
    source: "Manual"
  })).filter((n) => Number.isFinite(n.value) && n.value !== 0), i = t.reduce((n, s) => n + s.value, 0);
  return { mods: t, total: i };
}
function Gl(a = {}) {
  const e = a.toggles ?? {}, t = String((a == null ? void 0 : a.payloadId) ?? (a == null ? void 0 : a.ammoTypeId) ?? "").trim();
  return {
    ...a,
    ...t ? { payloadId: t } : {},
    toggles: {
      useEdge: !!e.useEdge,
      takeRisks: !!e.takeRisks,
      opponentRoll: !!e.opponentRoll
    },
    manualModifiers: lS(a.manualModifiers)
  };
}
async function oS({ actor: a, payload: e } = {}) {
  var s, r, o, l, c, u, d, m, f, p, h, g;
  if ((e == null ? void 0 : e.intent) !== "attack") return e;
  const t = foundry.utils.deepClone(e ?? {}), i = ((s = a.getPersonalCombatLoadout) == null ? void 0 : s.call(a, { refresh: !0 })) ?? null, n = (y) => {
    var S, T, C, N, P;
    const b = ((T = (S = a.items) == null ? void 0 : S.get) == null ? void 0 : T.call(S, y)) ?? null;
    return !b || !(((C = b.isPersonalWeapon) == null ? void 0 : C.call(b)) ?? b.type === A.itemType.personalWeapon) || !((N = b.system) != null && N.equipped) ? null : ((P = b.getCombatProfile) == null ? void 0 : P.call(b, { payloadId: t == null ? void 0 : t.payloadId })) ?? null;
  };
  if (t.weaponId) {
    const y = n(t.weaponId);
    if (!y)
      throw new Error("Attack requires an owned equipped personal weapon.");
    return t.payloadId = t.payloadId ?? ((r = y == null ? void 0 : y.payloadState) == null ? void 0 : r.activePayloadId) ?? "", t;
  }
  if (t.mode === "auto") {
    if (i != null && i.weaponChoiceRequired) {
      const y = await zr.selectItem(
        "Choose Weapon",
        i.equippedWeapons ?? []
      );
      return y ? (t.weaponId = y.id, t.payloadId = t.payloadId ?? ((o = y == null ? void 0 : y.payloadState) == null ? void 0 : o.activePayloadId) ?? "", delete t.mode, t) : null;
    }
    if ((l = i == null ? void 0 : i.defaultWeapon) != null && l.isSynthetic || ((c = i == null ? void 0 : i.defaultWeapon) == null ? void 0 : c.id) === "unarmed")
      return t.syntheticWeapon = foundry.utils.deepClone(i.defaultWeapon ?? vt.buildDefaultUnarmedProfile(a)), t.weaponId = t.syntheticWeapon.id, t.payloadId = t.payloadId ?? ((d = (u = t.syntheticWeapon) == null ? void 0 : u.payloadState) == null ? void 0 : d.activePayloadId) ?? "", delete t.mode, t;
    if ((m = i == null ? void 0 : i.defaultWeapon) != null && m.id)
      return t.weaponId = i.defaultWeapon.id, t.payloadId = t.payloadId ?? ((p = (f = i.defaultWeapon) == null ? void 0 : f.payloadState) == null ? void 0 : p.activePayloadId) ?? "", delete t.mode, t;
  }
  if (t.fallback === "unarmed")
    return t.syntheticWeapon = foundry.utils.deepClone(vt.buildDefaultUnarmedProfile(a)), t.weaponId = t.syntheticWeapon.id, t.payloadId = t.payloadId ?? ((g = (h = t.syntheticWeapon) == null ? void 0 : h.payloadState) == null ? void 0 : g.activePayloadId) ?? "", delete t.mode, t;
  throw new Error("Attack could not resolve a usable weapon.");
}
function lS(a) {
  return Array.isArray(a) ? a.map((e) => ({
    id: (e == null ? void 0 : e.id) ?? foundry.utils.randomID(),
    label: typeof (e == null ? void 0 : e.label) == "string" ? e.label : "Manual",
    value: Number((e == null ? void 0 : e.value) ?? 0)
  })) : [];
}
async function cS({ actor: a, payload: e, event: t } = {}) {
  var W, j, x, L, G, X, oe, ge, de, M, V, ne, ie, Me, Ge, ht, gt, ot, yt, We, lt, Mt, Ct, Pt, Nt, Rt, It, ct, Dt, E, I, Z, Ae, ke, Re, je, Qe, ut, jt, ee, we, et, tt, dt;
  if (a != null && a.actor && (a = a.actor), (W = a == null ? void 0 : a.document) != null && W.actor && (a = a.document.actor), !a) throw new Error("MWD.roll.execute requires actor");
  if (!(e != null && e.intent)) throw new Error("MWD.roll.execute requires payload.intent");
  if (e = Gl(e), e = await oS({ actor: a, payload: e }), !e) return null;
  let i = await Hs({ actor: a, payload: e, event: t }), n = await Fl({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const s = await Br.prompt({
    actor: a,
    basePayload: e,
    resolved: i,
    diceParts: {
      attribute: ((j = i == null ? void 0 : i.pool) == null ? void 0 : j.attribute) ?? 0,
      skill: ((x = i == null ? void 0 : i.pool) == null ? void 0 : x.skill) ?? 0,
      bonus: ((L = i == null ? void 0 : i.pool) == null ? void 0 : L.bonus) ?? 0,
      specialization: ((G = i == null ? void 0 : i.pool) == null ? void 0 : G.specialization) ?? 0
    },
    mods: n.mods,
    modTotal: n.total,
    options: {
      allowEdge: e.intent !== "initiative"
    }
  });
  if (!s) return null;
  if (e = Gl(s), i = await Hs({ actor: a, payload: e, event: t }), e.intent === "attack" && !((oe = (X = i == null ? void 0 : i.attack) == null ? void 0 : X.capabilityReport) != null && oe.isTemplated) && (delete e.targetSnapshots, delete e.templatePlacement, delete e.templateGeometry), e.intent === "attack" && e.weaponId) {
    const U = ((de = (ge = a.items) == null ? void 0 : ge.get) == null ? void 0 : de.call(ge, e.weaponId)) ?? null;
    if ((M = U == null ? void 0 : U.isPersonalWeapon) != null && M.call(U)) {
      const fe = String(e.payloadId ?? "").trim(), ei = String(((V = U.system) == null ? void 0 : V.selectedPayloadId) ?? "").trim();
      if (fe && fe !== ei && await ((ne = U.setActivePayload) == null ? void 0 : ne.call(U, fe)), !((ie = U.canConsumePayload) != null && ie.call(U, { payloadId: fe }))) {
        const bt = (Me = U.getPayloadState) == null ? void 0 : Me.call(U, { payloadId: fe }), fi = bt != null && bt.payloadLabel ? ` (${bt.payloadLabel})` : "";
        return (Ge = ui.notifications) == null || Ge.warn(`Not enough payload${fi} for ${U.name}.`), null;
      }
    }
  }
  if (e.intent === "attack" && ((gt = (ht = i == null ? void 0 : i.attack) == null ? void 0 : ht.capabilityReport) != null && gt.isTemplated)) {
    const U = await gy({
      actor: a,
      attack: i.attack
    });
    if (!U) return null;
    if (!Bd(((ot = i == null ? void 0 : i.attack) == null ? void 0 : ot.areaEffect) ?? ((We = (yt = i == null ? void 0 : i.attack) == null ? void 0 : yt.payload) == null ? void 0 : We.areaEffect) ?? {}) && (!Array.isArray(U.targetSnapshots) || U.targetSnapshots.length === 0))
      return (lt = ui.notifications) == null || lt.warn("Template placement did not affect any targets."), null;
    e.targetSnapshots = Array.isArray(U.targetSnapshots) ? U.targetSnapshots : [], e.templateGeometry = U.templateGeometry ?? null, e.templatePlacement = U.placement, i = await Hs({ actor: a, payload: e, event: t });
  }
  n = await Fl({
    actor: a,
    rollType: e.intent,
    skillId: e.key,
    domains: i.domains,
    payload: e,
    resolved: i,
    context: { event: t }
  });
  const { mods: r, total: o } = n, { mods: l, total: c } = rS(e);
  let u = [...r, ...l], d = Number(o ?? 0) + Number(c ?? 0);
  const m = Number(((Mt = i == null ? void 0 : i.pool) == null ? void 0 : Mt.attribute) ?? 0) + Number(((Ct = i == null ? void 0 : i.pool) == null ? void 0 : Ct.skill) ?? 0) + Number(((Pt = i == null ? void 0 : i.pool) == null ? void 0 : Pt.bonus) ?? 0) + Number(((Nt = i == null ? void 0 : i.pool) == null ? void 0 : Nt.specialization) ?? 0), f = Math.max(0, m + Number(d ?? 0)), p = e.intent !== "initiative", h = p ? uS({ actor: a, ctx: i, payload: e }) : null, g = (Rt = h == null ? void 0 : h.pre) != null && Rt.spent ? 4 : Number(i.diceTarget ?? i.target ?? 5), y = {
    snapshot: ((Dt = (ct = (It = game.mwd) == null ? void 0 : It.personalCombat) == null ? void 0 : ct.getSnapshot) == null ? void 0 : Dt.call(ct, a)) ?? null
  }, b = wt({
    actor: a,
    phase: "onBuildRoll",
    facts: so({ actor: a, resolved: i, payload: e, runtime: y }),
    packet: {},
    options: { runtime: y, consumeUsage: !0 }
  });
  await ci({ actor: a, mutations: b.mutations, runtime: y }), p && ((E = h == null ? void 0 : h.pre) != null && E.spent) && ((I = h == null ? void 0 : h.pre) != null && I.poolKey) && await ((Z = a.spendEdge) == null ? void 0 : Z.call(a, h.pre.poolKey, 1));
  let S, T = 0, C = 0;
  if (i.rollType === "sum" && ((Ae = i.sum) != null && Ae.formula))
    S = await new Roll(i.sum.formula, i.sum.data ?? {}).evaluate(), T = Number(S.total ?? 0) + Number(d ?? 0);
  else {
    S = await new Roll(`${f}d6cs>=${g}`).evaluate();
    const U = (ke = S.dice) == null ? void 0 : ke[0];
    T = Array.isArray(U == null ? void 0 : U.results) ? U.results.filter((fe) => fe.success).length : 0, C = Array.isArray(U == null ? void 0 : U.results) ? U.results.filter((fe) => fe.result === 1).length : 0;
  }
  if (i.intent === "initiative" && (S == null ? void 0 : S.total) != null) {
    const U = { total: Number(S.total ?? 0) + Number(d ?? 0) }, fe = wt({
      actor: a,
      phase: "onInitiativeResolved",
      facts: jc({ actor: a, packet: U, runtime: y }),
      packet: U,
      options: { runtime: y, consumeUsage: !0 }
    });
    if (await ci({ actor: a, mutations: fe.mutations, runtime: y }), fe.modifiers.length) {
      const ei = fe.modifiers.reduce((bt, fi) => bt + Number(fi.value ?? 0), 0);
      u = u.concat(fe.modifiers), d += ei, T = Number(fe.packet.total ?? 0), await ql({ actor: a, total: fe.packet.total ?? S.total }), i.breakdown = (i.breakdown ?? []).concat(fe.modifiers.map((bt, fi) => ({
        id: `traitInitiative${fi + 1}`,
        label: bt.label,
        value: Number(bt.value ?? 0)
      })));
    } else
      T = Number(U.total ?? 0), await ql({ actor: a, total: U.total });
  }
  const N = Du(
    i,
    { successes: T, raw: (Re = S == null ? void 0 : S.toJSON) == null ? void 0 : Re.call(S) },
    null
    // opposed rolls can pass defender result later
  ), P = N == null ? void 0 : N.edgeEarned;
  if ((P == null ? void 0 : P.amount) > 0) {
    const U = (je = i == null ? void 0 : i.domains) != null && je.includes("physical") ? "physical" : (Qe = i == null ? void 0 : i.domains) != null && Qe.includes("mental") ? "mental" : (ut = i == null ? void 0 : i.domains) != null && ut.includes("social") ? "social" : null, fe = sS(a, U);
    await ((jt = a.gainEdge) == null ? void 0 : jt.call(a, fe, P.amount)), N.edgeEarned.pool = fe;
  }
  i.intent === "overload" && await fS({ actor: a, passed: N.passed });
  let F = null;
  i.intent === "attack" && (F = await Nu({
    attacker: a,
    ctx: i,
    outcomeModel: N
  }));
  const K = Vb({
    actor: a,
    payload: e,
    ctx: i,
    roll: S,
    target: g,
    pool: f,
    mods: u,
    modTotal: d,
    hits: T,
    ones: C,
    edge: h,
    outcomeModel: N
  });
  F && (K.attackResult = F);
  const Y = await en({ resolved: K });
  if (e.intent === "attack" && e.weaponId) {
    const U = ((we = (ee = a.items) == null ? void 0 : ee.get) == null ? void 0 : we.call(ee, e.weaponId)) ?? null;
    (et = U == null ? void 0 : U.isPersonalWeapon) != null && et.call(U) && (await ((tt = U.consumePayload) == null ? void 0 : tt.call(U, { payloadId: e.payloadId })) || (dt = ui.notifications) == null || dt.warn(`Payload could not be consumed for ${U.name}.`));
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
function uS({ actor: a, ctx: e, payload: t }) {
  var p, h, g, y, b, S, T;
  const i = dS(e == null ? void 0 : e.domains), n = mS[i] ?? null, s = (n == null ? void 0 : n.a) ?? null, r = (n == null ? void 0 : n.b) ?? null, o = [s, r].filter(Boolean), l = !!((p = t == null ? void 0 : t.toggles) != null && p.useEdge) || !!(t != null && t.useEdge);
  let c = String(((g = (h = t == null ? void 0 : t.edge) == null ? void 0 : h.pre) == null ? void 0 : g.poolKey) ?? "").trim() || null;
  c && !o.includes(c) && (c = null);
  const u = l && c ? 1 : 0;
  let d = [...o];
  u && c && (d = d.filter((C) => C !== c));
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
function dS(a) {
  return Array.isArray(a) ? a.includes("physical") ? "physical" : a.includes("mental") ? "mental" : a.includes("social") ? "social" : null : null;
}
const mS = {
  physical: { a: "grit", b: "chaos" },
  mental: { a: "insight", b: "rumor" },
  social: { a: "legend", b: "credibility" }
};
async function ql({ actor: a, total: e }) {
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
async function fS({ actor: a, passed: e }) {
  e || await a.update({ "system.burn.overloaded": !0 });
}
const pS = /* @__PURE__ */ new Set(["physical", "mental", "social"]);
function hS(a) {
  if (a == null || a === "" || a === "—" || a === "–") return 0;
  const e = Number(a);
  return Number.isFinite(e) ? e : null;
}
function gS(a) {
  if (!a) return;
  const e = String(a).trim().toLowerCase();
  return pS.has(e) ? e : void 0;
}
class yS {
  constructor() {
    _(this, "id", "mwd.itemModifiers");
    _(this, "label", "Item Modifiers");
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
          const c = hS(l.value);
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
            domain: gS(l.domain)
          });
        }
    }
    return i;
  }
}
const Ws = {
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
class bS {
  constructor() {
    _(this, "id", "mwd.statusEffects");
    _(this, "label", "Status Effects");
  }
  collect({ actor: e } = {}) {
    var n;
    const t = e == null ? void 0 : e.statuses;
    if (!e || !t) return [];
    const i = [];
    for (const s of t) {
      const r = Ws == null ? void 0 : Ws[s];
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
class SS {
  constructor() {
    _(this, "id", "mwd.baseRollModifiers");
    _(this, "label", "Roll (Base)");
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
class AS {
  constructor() {
    _(this, "id", "mwd.condition");
    _(this, "label", "Condition");
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
const wS = {
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
class TS {
  constructor() {
    _(this, "id", "mwd.lifeModules");
    _(this, "label", "Life Modules");
  }
  collect({ actor: e, resolved: t } = {}) {
    return Sp({ actor: e, resolved: t });
  }
}
class vS {
  constructor() {
    _(this, "id", "mwd.traits");
    _(this, "label", "Traits");
  }
  collect({ actor: e, resolved: t, payload: i } = {}) {
    var s, r, o;
    if (!e) return [];
    const n = {
      snapshot: ((o = (r = (s = game.mwd) == null ? void 0 : s.personalCombat) == null ? void 0 : r.getSnapshot) == null ? void 0 : o.call(r, e)) ?? null
    };
    return wt({
      actor: e,
      phase: "onBuildRoll",
      facts: so({ actor: e, resolved: t, payload: i, runtime: n }),
      packet: {},
      options: { runtime: n, consumeUsage: !1 }
    }).modifiers;
  }
}
function kS() {
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
function ES() {
  return {
    get(a) {
      return Et(a);
    },
    getSkills({ withKnowledge: a = !1 } = {}) {
      return Bn();
    },
    list() {
      return Bn();
    }
  };
}
function MS() {
  return {
    get(a) {
      return Mi(a);
    },
    list() {
      return us();
    },
    listByType(a) {
      return fo(a);
    },
    getTypeLabel(a) {
      return ya(a);
    },
    evaluate(a) {
      return Ni(a);
    }
  };
}
function CS() {
  return {
    normalizeQualitySystem(a) {
      return zt(a);
    },
    getEditorConfig() {
      return zc();
    },
    evaluatePhase(a) {
      return wt(a);
    },
    applyMutations(a) {
      return ci(a);
    },
    buildRollFacts(a) {
      return so(a);
    },
    buildActionCostFacts(a) {
      return Wc(a);
    },
    buildBurnFacts(a) {
      return bn(a);
    },
    buildInitiativeFacts(a) {
      return jc(a);
    },
    buildDamageFacts(a) {
      return Gc(a);
    },
    buildEdgeFacts(a) {
      return sr(a);
    },
    buildEndOfActivationFacts(a) {
      return qc(a);
    }
  };
}
class No {
  static start() {
    const e = new No();
    Hooks.once("init", () => e.onInit()), Hooks.once("ready", () => e.onReady());
  }
  async onInit() {
    console.log(Se + "AnarchySystem.onInit"), game.system.mwd = this, game.system.anarchy = this, game.mwd ?? (game.mwd = {}), kS(), yy(), Dh("mwd"), game.mwd.roll = jl, game.mwd.attacks = Il, game.mwd.personalCombat = B, game.mwd.harm = pt, this.roll = jl, this.attacks = Il, this.personalCombat = B, this.harm = pt, this.skills = ES(), this.lifeModules = MS(), this.traits = CS(), this.remoteCall = new er(), game.system.mwd.skills = this.skills, game.system.mwd.lifeModules = this.lifeModules, game.system.mwd.traits = this.traits, game.mwd.skills = this.skills, game.mwd.lifeModules = this.lifeModules, game.mwd.traits = this.traits, be.init(), this.modifiers = new ce(), ii.register(new yS()), ii.register(new bS()), ii.register(new SS()), ii.register(new AS()), ii.register(wS), ii.register(new TS()), ii.register(new vS()), ii.register(new rh()), Handlebars.registerHelper("mwdClassList", (e) => Array.isArray(e) ? e.join(" ") : typeof e == "string" ? e : ""), this.actorClasses = {
      character: ml,
      npc: ml,
      vehicle: gu,
      battlemech: ah
    }, this.hooks = new ji(), this.styles = new Wp(), this.handlebarsManager = new po(), B.init(), lg.register(), console.log(Se + "AnarchySystem.onInit | loading system"), CONFIG.ANARCHY = Pe, CONFIG.Combat.initiative = { formula: "2d6" }, (CONFIG.statusEffects ?? []).some((e) => (e == null ? void 0 : e.id) === "overloaded") || CONFIG.statusEffects.push({
      id: "overloaded",
      name: "Overloaded",
      icon: "systems/mwd/img/icons/status/surge.svg"
    }), (CONFIG.statusEffects ?? []).some((e) => (e == null ? void 0 : e.id) === "preparedInterrupt") || CONFIG.statusEffects.push({
      id: "preparedInterrupt",
      name: "Prepared",
      icon: "systems/mwd/img/icons/status/readied_action.svg"
    }), CONFIG.Actor.documentClass = Eb, CONFIG.Item.documentClass = Sa, Sa.init(), Fu(), Zy(), yb(), await Ab(), console.log(Se + "AnarchySystem.onInit | done");
  }
  async onReady() {
    if (console.log(Se + "AnarchySystem.onReady"), await B.onReady(), !game.user.isGM) return;
    await fp();
    const e = game.settings.get(w, "enableGMGadget");
    if (!e) {
      console.log(`${Se}GMManager render skipped (enableGMGadget=false)`);
      return;
    }
    game.mwd = game.mwd ?? {}, game.mwd.gmGadget = () => Oh({ systemId: w }).render({ force: !0 }), e && game.mwd.gmGadget();
  }
}
No.start();
//# sourceMappingURL=index.mjs.map
